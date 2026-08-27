#!/usr/bin/env node
/**
 * compile_paper.js — 把翻译片段装配成 data/papers/<arxiv_id>.js
 *
 * 设计动机（与 tools/README 2.4 同一哲学）：翻译/讲解由 LLM agent 撰写，
 * 但结构（section/block/sentence 的 id、original 原文、顺序）必须机械地来自
 * 抽取层 .cache/papers/<id>.json，agent 只提供纯文本映射，杜绝重打原文导致的漂移。
 *
 * 输入（agent 产物）：
 *   .cache/papers/zh/<id>/meta.json        { "model_id": "...", "title_zh": "..." }
 *   .cache/papers/zh/<id>/<sec_id>.json    { "title_zh": "...", "sentences": {sid: zh},
 *                                            "blocks": {bid: zh} }
 *   .cache/papers/zh/<id>/annotations.json [ { id, anchor:{sentence_id,quote}, kind, title,
 *                                            explanation, explanation_plain?, featured? } ]
 * 输出：
 *   data/papers/<id>.js                    globalThis.PAPER_<id_点转下划线> = {...}
 *
 * 用法：node tools/compile_paper.js <arxiv_id>
 * 退出码 1 = 有缺失（并打印缺哪些句子的翻译）。
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const id = process.argv[2];
if (!id) { console.error("用法: node tools/compile_paper.js <arxiv_id>"); process.exit(1); }

const extPath = path.join(ROOT, ".cache", "papers", id + ".json");
const zhDir = path.join(ROOT, ".cache", "papers", "zh", id);
if (!fs.existsSync(extPath)) { console.error("缺少抽取层，先跑 tools/extract_paper.py:", extPath); process.exit(1); }
const metaPath = path.join(zhDir, "meta.json");
if (!fs.existsSync(metaPath)) { console.error("缺少 meta.json（model_id / title_zh）:", metaPath); process.exit(1); }

const ext = JSON.parse(fs.readFileSync(extPath, "utf8"));
const meta = JSON.parse(fs.readFileSync(metaPath, "utf8"));
const annPath = path.join(zhDir, "annotations.json");
const annotations = fs.existsSync(annPath) ? JSON.parse(fs.readFileSync(annPath, "utf8")) : [];

const missing = [];
const sections = ext.sections.map(sec => {
  const fragPath = path.join(zhDir, sec.id + ".json");
  const frag = fs.existsSync(fragPath) ? JSON.parse(fs.readFileSync(fragPath, "utf8")) : null;
  const exempt = (sec.id === "sec-references" || sec.id === "sec-front");
  if (!frag && !exempt) missing.push(`整个 section 缺翻译片段: ${sec.id}`);
  const blocks = sec.blocks.map(b => {
    if (b.type === "paragraph") {
      return {
        id: b.id, type: b.type, page: b.page,
        sentences: b.sentences.map(s => {
          const zh = frag && frag.sentences ? frag.sentences[s.id] : undefined;
          if (!exempt && (typeof zh !== "string" || !zh.trim())) missing.push(`句子缺 zh: ${s.id}`);
          const out = { id: s.id, original: s.text };
          if (typeof zh === "string") out.zh = zh;
          return out;
        }),
      };
    }
    // caption / equation / table_body：块级
    const out = { id: b.id, type: b.type, page: b.page, original: b.text };
    if (b.type === "table_body") out.cells = b.cells;
    const zh = frag && frag.blocks ? frag.blocks[b.id] : undefined;
    const needsZh = (b.type === "figure_caption" || b.type === "table_caption") && !exempt;
    if (needsZh && (typeof zh !== "string" || !zh.trim())) missing.push(`标题块缺 zh: ${b.id} (${b.type})`);
    if (typeof zh === "string" && zh.trim()) out.zh = zh;
    return out;
  });
  return {
    id: sec.id, num: sec.num, level: sec.level, page: sec.page,
    title: { original: sec.title, zh: frag && frag.title_zh ? frag.title_zh : sec.title },
    blocks,
  };
});

if (missing.length) {
  console.error(`✗ ${id} 翻译覆盖不完整（${missing.length} 处缺失）:`);
  missing.slice(0, 30).forEach(m => console.error("  - " + m));
  if (missing.length > 30) console.error(`  …（其余 ${missing.length - 30} 处省略）`);
  process.exit(1);
}

const globalName = "PAPER_" + id.replace(/\./g, "_");
const data = {
  paper_id: id,
  model_id: meta.model_id,
  title: { original: ext.title_original, zh: meta.title_zh },
  sections,
  annotations,
};
const out = `// 自动生成：${id} 全文双语精读数据（由 tools/compile_paper.js 装配）
// 结构/原文来自 .cache/papers/${id}.json（tools/extract_paper.py）；
// 翻译与讲解来自 .cache/papers/zh/${id}/（LLM agent 撰写）。
// 改翻译请改片段后重新装配；勿手改本文件的结构与 original 字段。
globalThis.${globalName} = ${JSON.stringify(data, null, 1)};
`;
const outDir = path.join(ROOT, "data", "papers");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, id + ".js"), out, "utf8");
console.log(`✔ data/papers/${id}.js 装配完成：${sections.length} sections，讲解 ${annotations.length} 条`);
