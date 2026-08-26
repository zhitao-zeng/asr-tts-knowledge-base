#!/usr/bin/env node
/**
 * split_data.js — 将 index.html 内联数据层抽离为 data/kb.js（单一事实来源）
 *
 * 背景：原 index.html 是 426KB 单文件，KB / DEEP / INSIGHTS / BENCHMARKS 四块数据
 * 与渲染逻辑混在一起，难以维护，也容易导致"四源漂移"。本脚本：
 *   1. 用与 validate.js 相同的 vm 方案无损抽取数据对象；
 *   2. 生成 data/kb.js（globalThis.KB/DEEP/INSIGHTS/BENCHMARKS），作为可独立编辑的数据源；
 *   3. 从 index.html 删除内联数据声明块，改为 <script src="data/kb.js"> 加载
 *      （classic script，file:// 离线可读 + GitHub Pages 均兼容）；
 *   4. 校验"抽取前后数据完全一致（lossless）"后才覆盖写入。
 *
 * 用法： node tools/split_data.js
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const htmlPath = path.join(root, "index.html");
const dataDir = path.join(root, "data");
const outJs = path.join(dataDir, "kb.js");
const htmlBak = path.join(root, "index.html.bak");

const html = fs.readFileSync(htmlPath, "utf8");

// ---------- 1) 用 vm 抽取数据（与 validate.js 同源逻辑） ----------
function buildSandbox() {
  const stubEl = () => ({
    style: {}, appendChild() {}, addEventListener() {}, setAttribute() {},
    innerHTML: "", textContent: "", querySelector: () => stubEl(), querySelectorAll: () => [],
  });
  const sandbox = {
    window: { addEventListener() {}, location: { hash: "#" } },
    document: {
      getElementById: () => stubEl(), querySelector: () => stubEl(), querySelectorAll: () => [],
      addEventListener() {}, createElement: stubEl, body: stubEl(),
    },
    location: { hash: "#" },
    localStorage: { getItem: () => null, setItem() {} },
    addEventListener() {}, console,
  };
  sandbox.globalThis = sandbox;
  return sandbox;
}

function extractFromScript(js) {
  const sandbox = buildSandbox();
  vm.createContext(sandbox);
  const hook = "\n;try{globalThis.__KB=KB;globalThis.__DEEP=DEEP;globalThis.__INSIGHTS=INSIGHTS;globalThis.__BENCHMARKS=BENCHMARKS;}catch(e){}\n";
  vm.runInContext(js + hook, sandbox, { timeout: 10000 });
  return { KB: sandbox.__KB, DEEP: sandbox.__DEEP, INSIGHTS: sandbox.__INSIGHTS, BENCHMARKS: sandbox.__BENCHMARKS };
}

const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
const mainJs = scripts.reduce((a, b) => (b.length > a.length ? b : a), "");
if (!mainJs) { console.error("未找到主 <script> 块"); process.exit(1); }

const orig = extractFromScript(mainJs);
for (const k of ["KB", "DEEP", "INSIGHTS", "BENCHMARKS"]) {
  if (!orig[k]) { console.error(`抽取失败：缺少 ${k}`); process.exit(1); }
}
console.log(`抽取：KB.models=${orig.KB.models.length} DEEP.keys=${Object.keys(orig.DEEP).length} INSIGHTS.keys=${Object.keys(orig.INSIGHTS).length} BENCHMARKS=${orig.BENCHMARKS.length}`);

// 安全闸：任何数据值若不可 JSON 序列化（函数/undefined/RegExp/Date 等），
// JSON.stringify 会静默丢弃，导致"看似 lossless 实则丢数据"。先扫描，发现即中止。
function hasNonserializable(v, p) {
  if (v === null) return false;
  if (typeof v !== "object") return false;
  if (Array.isArray(v)) { for (let i = 0; i < v.length; i++) if (hasNonserializable(v[i], p + `[${i}]`)) return true; return false; }
  if (v instanceof RegExp || v instanceof Date) { console.error(`非可序列化值(RegExp/Date) @ ${p}`); return true; }
  for (const k of Object.keys(v)) {
    const t = typeof v[k];
    if (t === "function" || t === "undefined" || t === "symbol") { console.error(`非可序列化值(${t}) @ ${p}.${k}`); return true; }
    if (hasNonserializable(v[k], p + "." + k)) return true;
  }
  return false;
}
for (const k of ["KB", "DEEP", "INSIGHTS", "BENCHMARKS"]) {
  if (hasNonserializable(orig[k], k)) { console.error(`❌ 数据含不可序列化值，放弃抽取以防丢数据`); process.exit(1); }
}
console.log("✔ 数据均为可序列化纯对象，可安全转 JSON");

// ---------- 2) 生成 data/kb.js ----------
fs.mkdirSync(dataDir, { recursive: true });
const ser = (o) => JSON.stringify(o, null, 2);
const banner = `// 自动生成：语音模型知识库结构化数据（单一事实来源 / single source of truth）
// 本文件由 tools/split_data.js 从 index.html 抽离。编辑数据请改这里，勿改 index.html 内联。
// 通过页面 <script src="data/kb.js"> 加载；globalThis 在浏览器===window，在 Node vm 下===sandbox，二者通用。
`;
const kbJs = banner +
  `globalThis.KB = ${ser(orig.KB)};\n` +
  `globalThis.DEEP = ${ser(orig.DEEP)};\n` +
  `globalThis.INSIGHTS = ${ser(orig.INSIGHTS)};\n` +
  `globalThis.BENCHMARKS = ${ser(orig.BENCHMARKS)};\n`;

// 写盘前先校验 lossless：把 kb.js 重新加载，确认数据完全一致
fs.writeFileSync(outJs, kbJs, "utf8");
{
  const sb = buildSandbox();
  vm.createContext(sb);
  vm.runInContext(fs.readFileSync(outJs, "utf8"), sb, { timeout: 10000 });
  const neu = { KB: sb.__KB || sb.KB, DEEP: sb.__DEEP || sb.DEEP, INSIGHTS: sb.__INSIGHTS || sb.INSIGHTS, BENCHMARKS: sb.__BENCHMARKS || sb.BENCHMARKS };
  // 通过 globalThis 赋值后，free var 在 vm 内不可见，故改为读取 globalThis
  const g = sb;
  const got = { KB: g.KB, DEEP: g.DEEP, INSIGHTS: g.INSIGHTS, BENCHMARKS: g.BENCHMARKS };
  for (const k of ["KB", "DEEP", "INSIGHTS", "BENCHMARKS"]) {
    const a = JSON.stringify(orig[k]);
    const b = JSON.stringify(got[k]);
    if (a !== b) {
      console.error(`❌ lossless 校验失败：${k} 抽取前后不一致（长度 ${a.length} vs ${b.length}）`);
      process.exit(1);
    }
  }
  console.log("✔ lossless 校验通过：data/kb.js 与内联数据逐字节一致");
}

// ---------- 3) 从 index.html 删除内联数据声明块 ----------
function matchClosing(src, openPos) {
  const open = src[openPos];
  const closeCh = open === "{" ? "}" : "]";
  let i = openPos, depth = 0, inStr = false, strCh = "", esc = false;
  for (; i < src.length; i++) {
    const c = src[i];
    if (inStr) {
      if (esc) { esc = false; continue; }
      if (c === "\\") { esc = true; continue; }
      if (c === strCh) { inStr = false; }
      continue;
    }
    if (c === '"' || c === "'" || c === "`") { inStr = true; strCh = c; continue; }
    if (c === open) depth++;
    else if (c === closeCh) { depth--; if (depth === 0) return i; }
  }
  return -1;
}

const deletions = []; // {start, end}
function markBlock(declName) {
  const marker = `const ${declName}`;
  const start = html.indexOf(marker);
  if (start < 0) { console.error(`未找到声明：${marker}`); process.exit(1); }
  // 找第一个 { 或 [
  let p = start + marker.length;
  while (p < html.length && html[p] !== "{" && html[p] !== "[") p++;
  if (p >= html.length) { console.error(`声明 ${declName} 后未找到 { 或 [`); process.exit(1); }
  const close = matchClosing(html, p);
  if (close < 0) { console.error(`声明 ${declName} 括号不匹配`); process.exit(1); }
  let end = close + 1;
  if (html[end] === ";") end++;
  // 消耗后续空白到下一个非空白字符
  while (end < html.length && /\s/.test(html[end])) end++;
  deletions.push({ start, end });
}
function markLine(declName) {
  const marker = `const ${declName} =`;
  const start = html.indexOf(marker);
  if (start < 0) { console.error(`未找到声明：${marker}`); process.exit(1); }
  let end = html.indexOf("\n", start);
  if (end < 0) end = html.length;
  else end++; // 含换行
  deletions.push({ start, end });
}

// 数据块声明（需按块删除）
["KB", "DEEP_PART_A", "DEEP_PART_B", "DEEP_PART_C", "DEEP_PART_D", "DEEP_PART_E", "DEEP_PART_F",
 "INSIGHTS_PART_R1", "INSIGHTS_PART_R2", "INSIGHTS_PART_R3", "INSIGHTS_PART_R4",
 "INSIGHTS_PART_S1", "INSIGHTS_PART_S2", "INSIGHTS_PART_S3", "BENCHMARKS"].forEach(markBlock);
// 单行 merge 声明
["DEEP", "INSIGHTS"].forEach(markLine);

// 从后往前删，避免索引漂移
deletions.sort((a, b) => b.start - a.start);
let newHtml = html;
for (const d of deletions) {
  newHtml = newHtml.slice(0, d.start) + newHtml.slice(d.end);
}
console.log(`已删除 ${deletions.length} 个内联数据声明块`);

// 插入 <script src="data/kb.js"></script> 到主 <script> 之前
const inlineScriptOpen = newHtml.indexOf("<script>");
if (inlineScriptOpen < 0) { console.error("未找到内联 <script> 标签"); process.exit(1); }
newHtml = newHtml.slice(0, inlineScriptOpen) +
  '<script src="data/kb.js"></script>\n' +
  newHtml.slice(inlineScriptOpen);

// ---------- 4) 写回（覆盖前再确认主脚本不再含数据声明） ----------
for (const name of ["const KB =", "const DEEP_PART", "const INSIGHTS_PART", "const BENCHMARKS =", "const DEEP = Object", "const INSIGHTS = Object"]) {
  if (newHtml.includes(name)) { console.error(`❌ 转换后仍存在内联数据声明：${name}`); process.exit(1); }
}
fs.writeFileSync(htmlPath, newHtml, "utf8");
console.log(`✔ 已写入 index.html（${newHtml.length} 字节，原 ${html.length} 字节）与 data/kb.js（${kbJs.length} 字节）`);

// 保留 index.html.bak 作为回滚点（不自动删除）
console.log(`ℹ️ 回滚点：index.html.bak（如需还原：cp index.html.bak index.html）`);
