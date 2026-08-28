#!/usr/bin/env node
/**
 * migrate_zh.js — 抽取器重跑后，把旧译文/讲解按原文文本对齐迁移到新结构
 *
 * 背景：修复抽取器缺陷（如页眉过滤误杀、续接规则）后重跑会改变 block/sentence 编号。
 * 本脚本读取【旧成品】data/papers/<id>.js（含每句 id+original+zh 与 annotations），
 * 对照【新抽取层】.cache/papers/<id>.json，按原文文本把 zh 对齐到新 id：
 *   SAME    id 与原文都一致 → 直接复用
 *   MOVED   原文一致但 id 变了 → 复用（改挂新 id）
 *   MERGED  旧句被合并进新句（子串关系）→ 复用最近的 zh，标 review（可能只覆盖部分）
 *   NEW     新抽取出的内容（旧版被误杀的行）→ 留空待翻，列入报告
 * annotations 的 anchor 按 quote 在新句子中重定位；找不到记 ORPHAN 并丢弃。
 *
 * 用法：node tools/migrate_zh.js [arxiv_id ...]   （无参数时迁移全部）
 * 输出：覆写 .cache/papers/zh/<id>/ 片段 + annotations.json；打印迁移报告。
 * 之后跑 node tools/compile_paper.js <id>（NEW 句会列为缺失，补翻后再跑）。
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const EXEMPT = new Set(["sec-references", "sec-front"]);

function loadOld(id) {
  const f = path.join(ROOT, "data", "papers", id + ".js");
  if (!fs.existsSync(f)) return null;
  const g = {};
  new Function("globalThis", fs.readFileSync(f, "utf8"))(g);
  return g["PAPER_" + id.replace(/\./g, "_")];
}

function migrateOne(id) {
  const oldP = loadOld(id);
  const extPath = path.join(ROOT, ".cache", "papers", id + ".json");
  if (!fs.existsSync(extPath)) return { id, error: "无新抽取层" };
  const ext = JSON.parse(fs.readFileSync(extPath, "utf8"));
  if (!oldP) return { id, error: "无旧成品 data/papers/" + id + ".js" };

  // ---- 旧数据索引 ----
  const oldSentByText = new Map();  // text -> {id, zh}
  const oldSentById = new Map();
  const oldBlockZhByText = new Map(); // caption/table_body: text -> zh
  const oldTitleZh = new Map();       // section title original -> title_zh
  for (const sec of oldP.sections || []) {
    if (sec.title && sec.title.original) oldTitleZh.set(sec.title.original, sec.title.zh);
    for (const b of sec.blocks || []) {
      if (b.type === "paragraph") {
        for (const s of b.sentences || []) {
          oldSentById.set(s.id, s);
          if (s.zh) oldSentByText.set(s.original, { id: s.id, zh: s.zh });
        }
      } else if (b.zh) {
        oldBlockZhByText.set(b.original, b.zh);
      }
    }
  }

  const stats = { SAME: 0, MOVED: 0, MERGED: 0, NEW: 0, TITLE_NEW: 0 };
  const newItems = [], reviewItems = [];
  const zhDir = path.join(ROOT, ".cache", "papers", "zh", id);
  fs.mkdirSync(zhDir, { recursive: true });

  // meta.json：保留旧的 title_zh
  const metaPath = path.join(zhDir, "meta.json");
  const meta = fs.existsSync(metaPath) ? JSON.parse(fs.readFileSync(metaPath, "utf8")) : {};
  meta.model_id = oldP.model_id || meta.model_id;
  meta.title_zh = (oldP.title && oldP.title.zh) || meta.title_zh;
  fs.writeFileSync(metaPath, JSON.stringify(meta, null, 1) + "\n");

  // ---- 逐 section 生成新片段 ----
  const newSentIndex = []; // {sec_id, sent_id, text} 供 annotations 重定位
  for (const sec of ext.sections) {
    const frag = { title_zh: oldTitleZh.get(sec.title) || null, sentences: {}, blocks: {} };
    if (!frag.title_zh) { stats.TITLE_NEW++; if (!EXEMPT.has(sec.id)) newItems.push(`[标题] ${sec.id}: ${sec.title.slice(0, 60)}`); }
    for (const b of sec.blocks) {
      if (b.type === "paragraph") {
        for (const s of b.sentences) {
          newSentIndex.push({ sec_id: sec.id, sent_id: s.id, text: s.text });
          const oldSame = oldSentById.get(s.id);
          if (oldSame && oldSame.original === s.text && oldSame.zh) {
            frag.sentences[s.id] = oldSame.zh; stats.SAME++; continue;
          }
          const moved = oldSentByText.get(s.text);
          if (moved) { frag.sentences[s.id] = moved.zh; stats.MOVED++; continue; }
          // MERGED：旧句原文是新句子串，或新句是旧句子串
          let cand = null;
          for (const [ot, oz] of oldSentByText) {
            if (s.text.includes(ot) || ot.includes(s.text)) { cand = { ot, ...oz }; break; }
          }
          if (cand) {
            frag.sentences[s.id] = cand.zh; stats.MERGED++;
            reviewItems.push(`${s.id} ←(部分匹配) 旧句 "${cand.ot.slice(0, 50)}"`);
            continue;
          }
          stats.NEW++;
          if (!EXEMPT.has(sec.id)) newItems.push(`${s.id}: ${s.text.slice(0, 110)}`);
        }
      } else {
        const zh = oldBlockZhByText.get(b.text);
        if (zh) { frag.blocks[b.id] = zh; continue; }
        if (b.type === "table_body") {
          // 旧 blob 句的 zh（含译者注）可作为表格说明挂到块上
          let note = null;
          for (const [ot, oz] of oldSentByText) {
            if (b.text.includes(ot)) { note = oz.zh; break; }
          }
          if (note) frag.blocks[b.id] = note;
          continue;  // table_body 豁免翻译，不计 NEW
        }
        if ((b.type === "figure_caption" || b.type === "table_caption") && !EXEMPT.has(sec.id)) {
          stats.NEW++; newItems.push(`[${b.type}] ${b.id}: ${b.text.slice(0, 100)}`);
        }
      }
    }
    fs.writeFileSync(path.join(zhDir, sec.id + ".json"), JSON.stringify(frag, null, 1) + "\n");
  }

  // ---- annotations 重定位 ----
  const anns = [];
  const orphans = [];
  for (const a of oldP.annotations || []) {
    const q = a.anchor && a.anchor.quote;
    // 优先同 id+同 quote
    let hit = newSentIndex.find(x => x.sent_id === a.anchor.sentence_id && x.text.includes(q));
    if (!hit) hit = newSentIndex.find(x => x.text.includes(q));
    if (hit) {
      const na = { ...a, anchor: { sentence_id: hit.sent_id, quote: q } };
      anns.push(na);
    } else {
      orphans.push(`${a.id} "${String(q).slice(0, 60)}"`);
    }
  }
  fs.writeFileSync(path.join(zhDir, "annotations.json"), JSON.stringify(anns, null, 1) + "\n");

  return { id, stats, newItems, reviewItems, orphans, annKept: anns.length };
}

/* ---- main ---- */
let ids = process.argv.slice(2);
if (!ids.length) {
  ids = fs.readdirSync(path.join(ROOT, "data", "papers")).filter(f => f.endsWith(".js")).map(f => f.replace(/\.js$/, ""));
}
for (const id of ids) {
  const r = migrateOne(id);
  if (r.error) { console.log(`✗ ${id}: ${r.error}`); continue; }
  const s = r.stats;
  console.log(`\n== ${id}: SAME=${s.SAME} MOVED=${s.MOVED} MERGED=${s.MERGED} NEW=${s.NEW} | 讲解保留 ${r.annKept}${r.orphans.length ? ` 丢失${r.orphans.length}` : ""}`);
  if (r.newItems.length) {
    console.log(`  待翻 NEW（前 12 条）:`);
    r.newItems.slice(0, 12).forEach(x => console.log("   + " + x));
    if (r.newItems.length > 12) console.log(`   …共 ${r.newItems.length} 条`);
  }
  if (r.reviewItems.length > 0 && r.reviewItems.length <= 6) r.reviewItems.forEach(x => console.log("   ~ " + x));
  if (r.orphans.length) r.orphans.slice(0, 5).forEach(x => console.log("   ✗ orphan " + x));
}
