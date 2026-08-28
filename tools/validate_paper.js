#!/usr/bin/env node
/**
 * validate_paper.js — 论文全文双语精读数据的质检门禁
 *
 * 校验 data/papers/<arxiv_id>.js 与 .cache/papers/<arxiv_id>.json（抽取层）的一致性：
 *   结构一致  block/sentence id 与抽取层完全对齐（不多不少、顺序一致）
 *   全文覆盖  paragraph 每个句子都有 zh；figure/table caption 有 zh；
 *             equation / table_body / sec-references / sec-front 豁免
 *   锚点有效  annotation.anchor.sentence_id 存在
 *   原文一致  anchor.quote 是锚定句 original 的子串
 *   数字一致  original 的数字 token 全部出现在 zh（防翻译丢数/改数）
 *   引用保护  [n] 引用编号在 zh 中不丢失
 *   枚举合法  kind ∈ concept/motivation/comparison/number/engineering/critique/connection
 *   密度合理  每篇 12–30 条（规范 15–25）
 *
 * 用法：node tools/validate_paper.js [arxiv_id ...]   （无参数时校验 data/papers/ 全部）
 * 退出码：0 = 通过；1 = 发现问题。
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const KINDS = new Set(["concept", "motivation", "comparison", "number", "engineering", "critique", "connection"]);
const EXEMPT_SECTIONS = new Set(["sec-references", "sec-front"]); // 参考文献/作者块不强制翻译
const NUM_RE = /\d+(?:\.\d+)?%?/g;
const CITE_RE = /\[\d+(?:[,\-–]\s*\d+)*\]/g;
// 千分位归一化："680,000" → "680000"，避免译文写 680000 时误判丢数字
const normNum = (s) => String(s).replace(/(\d),(\d{3})/g, "$1$2");
// 数字 token 归一化：去掉尾随 %（"50" 与 "50%" 视为同一数值，% 的有无不算数字篡改）
const numTokens = (s) => (normNum(s).match(NUM_RE) || []).map(t => t.replace(/%$/, ""));

function loadPaper(id) {
  const f = path.join(ROOT, "data", "papers", id + ".js");
  if (!fs.existsSync(f)) return { err: `数据文件不存在: data/papers/${id}.js` };
  const src = fs.readFileSync(f, "utf8");
  const g = {};
  try {
    new Function("globalThis", src)(g);
  } catch (e) {
    return { err: `执行失败（语法错误）: ${e.message}` };
  }
  const key = "PAPER_" + id.replace(/\./g, "_");
  if (!g[key]) return { err: `未定义 globalThis.${key}` };
  return { paper: g[key] };
}

function validateOne(id) {
  const problems = [];
  const ok = (cond, msg) => { if (!cond) problems.push(msg); };

  const { paper, err } = loadPaper(id);
  if (err) return [err];

  const cachePath = path.join(ROOT, ".cache", "papers", id + ".json");
  let extracted = null;
  if (fs.existsSync(cachePath)) {
    extracted = JSON.parse(fs.readFileSync(cachePath, "utf8"));
  } else {
    // CI 上没有 .cache（gitignored）：退化为数据文件自洽校验（覆盖/锚点/数字仍有效）
    console.log(`  （无抽取层 .cache/papers/${id}.json，跳过结构一致性校验）`);
  }

  // ---------- 结构一致 + 覆盖 ----------
  const sentById = new Map();
  let nSent = 0, nTranslated = 0, nCaption = 0, nCaptionZh = 0;
  ok(paper.title && paper.title.original && paper.title.zh, "[标题] title.original/zh 缺失");
  ok(typeof paper.model_id === "string" && paper.model_id, "[关联] model_id 缺失");

  const extSecs = extracted ? extracted.sections : [];
  const datSecs = paper.sections || [];
  if (extracted) {
    ok(datSecs.length === extSecs.length,
      `[结构] sections 数量不一致：数据 ${datSecs.length} vs 抽取 ${extSecs.length}`);
  }
  const n = Math.min(datSecs.length, extSecs.length);
  for (let si = 0; si < (extracted ? n : datSecs.length); si++) {
    const ds = datSecs[si], es = extSecs[si];
    if (extracted) {
      ok(ds.id === es.id, `[结构] section[${si}] id 不一致：${ds.id} vs ${es.id}`);
      ok((ds.blocks || []).length === es.blocks.length,
        `[结构] ${ds.id} blocks 数量不一致：${(ds.blocks || []).length} vs ${es.blocks.length}`);
    }
    ok(ds.title && ds.title.original && (EXEMPT_SECTIONS.has(ds.id) || ds.title.zh),
      `[标题] ${ds.id} 缺 title.original 或 title.zh`);
    const nB = Math.min((ds.blocks || []).length, extracted ? es.blocks.length : Infinity);
    for (let bi = 0; bi < nB; bi++) {
      const db = ds.blocks[bi], eb = extracted ? es.blocks[bi] : null;
      const label = `${ds.id}/${db.id}`;
      if (eb) {
        ok(db.id === eb.id, `[结构] block id 不一致：${db.id} vs ${eb.id}`);
        ok(db.type === eb.type, `[结构] ${db.id} type 不一致：${db.type} vs ${eb.type}`);
      }
      const exempt = EXEMPT_SECTIONS.has(ds.id);
      if (db.type === "paragraph") {
        const esents = eb ? eb.sentences : db.sentences;
        ok(db.sentences.length === esents.length,
          `[结构] ${label} 句子数不一致：${db.sentences.length} vs ${esents.length}`);
        for (let ki = 0; ki < db.sentences.length; ki++) {
          const dsent = db.sentences[ki];
          const esent = eb ? eb.sentences[ki] : dsent;
          nSent++;
          if (eb) {
            ok(dsent.id === esent.id, `[结构] ${label} 句子 id 不一致：${dsent.id} vs ${esent.id}`);
            ok(dsent.original === esent.text,
              `[原文] ${dsent.id} original 与抽取层不一致（不得改写原文）`);
          }
          sentById.set(dsent.id, dsent);
          if (!exempt) {
            if (typeof dsent.zh === "string" && dsent.zh.trim()) {
              nTranslated++;
              // 数字一致（千分位/百分号归一化后比较）
              const on = numTokens(dsent.original).sort();
              const zn = numTokens(dsent.zh).sort();
              const missing = on.filter(x => !zn.includes(x));
              ok(missing.length === 0, `[数字] ${dsent.id} 原文数字在译文丢失: ${missing.join(", ")}`);
              // 引用保护
              const oc = (dsent.original.match(CITE_RE) || []);
              const zc = (dsent.zh.match(CITE_RE)) || [];
              const missC = oc.filter(x => !zc.includes(x));
              ok(missC.length === 0, `[引用] ${dsent.id} 引用编号在译文丢失: ${missC.join(", ")}`);
            } else {
              problems.push(`[覆盖] ${dsent.id} 缺 zh 翻译`);
            }
          }
        }
      } else if (db.type === "figure_caption" || db.type === "table_caption") {
        nCaption++;
        if (eb) ok(db.original === eb.text, `[原文] ${db.id} original 与抽取层不一致`);
        if (!exempt) {
          if (typeof db.zh === "string" && db.zh.trim()) nCaptionZh++;
          else problems.push(`[覆盖] ${db.id} (${db.type}) 缺 zh 翻译`);
        }
      } else if (db.type === "equation" || db.type === "table_body") {
        if (eb) ok(db.original === eb.text, `[原文] ${db.id} original 与抽取层不一致`);
      } else {
        problems.push(`[类型] ${label} 未知 block type: ${db.type}`);
      }
    }
  }

  // ---------- annotations ----------
  const anns = paper.annotations || [];
  const ids = new Set();
  let featured = 0;
  anns.forEach((a, i) => {
    const label = `${id}#ann-${i + 1}`;
    ok(a.id && !ids.has(a.id), `[讲解] ${label} id 缺失或重复: ${a.id}`);
    ids.add(a.id);
    ok(KINDS.has(a.kind), `[讲解] ${label} kind 非法: ${a.kind}`);
    ok(typeof a.title === "string" && a.title.trim(), `[讲解] ${label} title 为空`);
    ok(typeof a.explanation === "string" && a.explanation.trim().length >= 30,
      `[讲解] ${label} explanation 为空或过短（<30 字）`);
    if (a.featured) featured++;
    const sid = a.anchor && a.anchor.sentence_id;
    const sent = sid && sentById.get(sid);
    ok(sent, `[锚点] ${label} sentence_id 不存在: ${sid}`);
    if (sent) {
      const q = a.anchor.quote || "";
      ok(q && sent.original.includes(q),
        `[原文一致] ${label} quote 不是 ${sid} 原句子串: "${String(q).slice(0, 60)}"`);
    }
  });
  ok(anns.length >= 12 && anns.length <= 30,
    `[密度] 讲解条数 ${anns.length} 超出 12–30 区间（规范 15–25）`);
  ok(featured >= 6 || anns.length < 12, `[精选] featured 条数 ${featured} 过少（建议 8–12）`);

  return problems;
}

/* ---------- main ---------- */
let ids = process.argv.slice(2);
if (!ids.length) {
  const dir = path.join(ROOT, "data", "papers");
  if (!fs.existsSync(dir)) { console.log("data/papers/ 不存在，无论文精读数据。"); process.exit(0); }
  ids = fs.readdirSync(dir).filter(f => f.endsWith(".js")).map(f => f.replace(/\.js$/, ""));
}
if (!ids.length) { console.log("data/papers/ 为空，无论文精读数据。"); process.exit(0); }

let fail = 0;
for (const id of ids) {
  const problems = validateOne(id);
  if (problems.length) {
    fail++;
    console.error(`\n❌ ${id}: ${problems.length} 个问题`);
    problems.slice(0, 40).forEach(p => console.error("  - " + p));
    if (problems.length > 40) console.error(`  …（其余 ${problems.length - 40} 条省略）`);
  } else {
    console.log(`✅ ${id} 校验通过`);
  }
}
process.exit(fail ? 1 : 0);
