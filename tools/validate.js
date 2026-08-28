#!/usr/bin/env node
/**
 * validate.js — 语音模型知识库质检门禁
 *
 * 在浏览器之外对 index.html 的 insight 数据做回归校验，防止出现
 * "insight 退化"（q 是参考文献 / 小标题、闭源 q 缺规定的推导前缀、
 * 每篇条目数漂移、缺字段）等问题。
 *
 * 用法：
 *   node tools/validate.js                # 校验仓库根目录的 index.html
 *   node tools/validate.js path/to.html   # 校验指定文件
 *
 * 退出码：0 = 通过；1 = 发现问题（并打印违规清单）。
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const target = process.argv[2] || path.join(__dirname, "..", "index.html");
if (!fs.existsSync(target)) {
  console.error("文件不存在:", target);
  process.exit(1);
}

const html = fs.readFileSync(target, "utf8");

// 1) 提取最大 <script> 块（主逻辑脚本）
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
const js = scripts.reduce((a, b) => (b.length > a.length ? b : a), "");
if (!js) {
  console.error("未找到 <script> 主逻辑块");
  process.exit(1);
}

// 2) 用最轻量的 DOM 桩在沙箱里 eval，拿到 INSIGHTS / KB
const stubEl = () => ({
  style: {},
  appendChild() {},
  addEventListener() {},
  setAttribute() {},
  innerHTML: "",
  textContent: "",
  querySelector: () => stubEl(),
  querySelectorAll: () => [],
});
const appStub = stubEl();
const sandbox = {
  window: { addEventListener() {}, location: { hash: "#/" } },
  document: {
    getElementById: () => appStub,
    querySelector: () => appStub,
    querySelectorAll: () => [],
    addEventListener() {},
    createElement: stubEl,
    body: appStub,
  },
  location: { hash: "#/" },
  localStorage: { getItem: () => null, setItem() {} },
  addEventListener() {},
  console,
};
sandbox.globalThis = sandbox;
vm.createContext(sandbox);
// 重构后：先加载 data/kb.js（定义 globalThis.KB/DEEP/INSIGHTS/BENCHMARKS），再跑主逻辑
const kbPath = path.join(__dirname, "..", "data", "kb.js");
if (!fs.existsSync(kbPath)) { console.error("data/kb.js 不存在（请先运行 tools/split_data.js）"); process.exit(1); }
const kbJs = fs.readFileSync(kbPath, "utf8");
const exportHook = "\n;try{globalThis.__KB=KB;globalThis.__DEEP=DEEP;globalThis.__INSIGHTS=INSIGHTS;globalThis.__BENCHMARKS=BENCHMARKS;}catch(e){}\n";
try {
  vm.runInContext(kbJs, sandbox, { timeout: 8000 });
  vm.runInContext(js + exportHook, sandbox, { timeout: 8000 });
} catch (e) {
  console.error("脚本执行失败（语法/运行错误）:", e.message);
  process.exit(1);
}

const INSIGHTS = sandbox.__INSIGHTS;
const KB = sandbox.__KB;
const problems = [];
const ok = (cond, msg) => { if (!cond) problems.push(msg); };

// 渲染冒烟测试：主逻辑顶层会按 location.hash 渲染首页到 #app，验证数据/逻辑引用未断裂
{
  const rendered = String(appStub.innerHTML || "");
  ok(rendered.length > 200, "[渲染] #app 未渲染出内容（疑似数据/逻辑引用断裂）");
  if (rendered.length > 200) console.log(`渲染冒烟：#app 输出 ${rendered.length} 字节`);
}

if (!KB || !Array.isArray(KB.models)) {
  console.error("未找到 KB.models");
  process.exit(1);
}
if (!INSIGHTS || typeof INSIGHTS !== "object") {
  console.error("未找到 INSIGHTS");
  process.exit(1);
}

const REQUIRED_PREFIX = "据公开信息/架构可知的推导论点：";
const DERIVED_RE = /推导|推测/;
const REF_RE = /^\s*(arXiv:|\d+\.|Reference|ref\.|\[)/i;

// 3) 逐模型逐条校验
const CAP_KEYS = ["stream", "long", "multi", "clone", "emot"];
let total = 0;
for (const m of KB.models) {
  const id = m.id;
  const arr = INSIGHTS[id];
  if (!arr) { problems.push(`[缺失] ${id} 在 INSIGHTS 中无条目`); continue; }
  if (arr.length !== 3) problems.push(`[条数] ${id} 应有 3 条，实际 ${arr.length}`);
  total += arr.length;
  // P1-9 回归守护：每个模型必须有显式 caps 字段且 5 个维度均为布尔
  if (!m.caps || typeof m.caps !== "object") { problems.push(`[能力矩阵] ${id} 缺少显式 caps 字段`); }
  else { for (const k of CAP_KEYS) if (typeof m.caps[k] !== "boolean") problems.push(`[能力矩阵] ${id}.caps.${k} 应为布尔，实为 ${typeof m.caps[k]}`); }
  arr.forEach((it, i) => {
    const label = `${id}#${i + 1}`;
    ok(it && typeof it.q === "string" && it.q.trim(), `[空字段] ${label} q 为空`);
    ok(it && typeof it.src === "string" && it.src.trim(), `[空字段] ${label} src 为空`);
    ok(it && typeof it.insight === "string" && it.insight.trim(), `[空字段] ${label} insight 为空`);
    if (it && it.q) {
      ok(!it.q.includes("**"), `[退化] ${label} q 含 **（应清理为纯文本/由 mdInline 渲染）`);
      ok(!REF_RE.test(it.q), `[退化] ${label} q 疑似参考文献/章节号: "${it.q.slice(0, 50)}"`);
      const isDerived = DERIVED_RE.test(it.src || "");
      if (isDerived) {
        ok(
          it.q.startsWith(REQUIRED_PREFIX),
          `[闭源前缀] ${label} 闭源推导注 q 未以"${REQUIRED_PREFIX}"开头: "${it.q.slice(0, 50)}"`
        );
      }
    }
  });
}

// 4) 反向：INSIGHTS 里有没有 KB 不存在的孤儿 key
const orphan = Object.keys(INSIGHTS).filter((k) => !KB.models.some((m) => m.id === k));
orphan.forEach((k) => problems.push(`[孤儿] INSIGHTS 含 KB 不存在的模型 ${k}`));

// 6) Benchmark 条目 id 必须能在 KB.models 解析（防四源漂移 / 笔误）
const modelIds = new Set(KB.models.map((m) => m.id));
let benchRows = 0;
for (const b of sandbox.__BENCHMARKS || []) {
  for (const e of b.entries || []) {
    benchRows++;
    ok(modelIds.has(e.id), `[基准漂移] 数据集 "${b.id}" 引用了不存在的模型 id: ${e.id}`);
    if (!modelIds.has(e.id)) continue;
    const m = KB.models.find((x) => x.id === e.id);
    // 领域一致性：Benchmark 引用的模型必须与榜单领域相同（防止 ASR/TTS 混排）。
    // 注：CER/WER 同时被 ASR 与 TTS 榜单使用（TTS 输出也按 CER/WER 评测，如 Seed-TTS-Eval），
    //     故以榜单声明的 domain 为准，而非指标名。
    ok(m.domain === b.domain, `[Benchmark 领域错误] ${b.id}(${b.domain}) 引用了 ${e.id}(${m.domain})`);
  }
}

// 7) 已核实事实的回归守护（防本次 P0 纠错再次漂移）
const CANONICAL = {
  cohere_transcribe: { date: "2026-03", domain: "ASR", licenseRe: /Apache/i },
  fireredasr2:       { domain: "ASR", orgRe: /小红书/ },
  voxtral_mini:      { date: "2026-02", domain: "ASR", paperRe: /2602\.11298/, latency_ms: 480 },
  fishaudio_s2:      { date: "2026-03", domain: "TTS", has_arxiv: true, paperRe: /2603\.08823/ },
  nim4_asr:          { domain: "ASR", orgRe: /NIO|蔚来/, stream: true }, // P0-1 纠错回归守护
};
for (const [id, rule] of Object.entries(CANONICAL)) {
  const m = KB.models.find((x) => x.id === id);
  ok(m, `[守护] 缺失已核实模型 ${id}`);
  if (!m) continue;
  if (rule.date !== undefined) ok(m.date === rule.date, `[守护] ${id} date 应为 ${rule.date}，实为 ${m.date}`);
  if (rule.domain !== undefined) ok(m.domain === rule.domain, `[守护] ${id} domain 应为 ${rule.domain}，实为 ${m.domain}`);
  if (rule.licenseRe) ok(rule.licenseRe.test(m.license || ""), `[守护] ${id} license 应匹配 ${rule.licenseRe}，实为 "${m.license}"`);
  if (rule.orgRe) ok(rule.orgRe.test(m.org || ""), `[守护] ${id} org 应匹配 ${rule.orgRe}，实为 "${m.org}"`);
  if (rule.paperRe) ok(rule.paperRe.test(m.paper_url || ""), `[守护] ${id} paper_url 应匹配 ${rule.paperRe}，实为 "${m.paper_url}"`);
  if (rule.latency_ms !== undefined) ok(m.metrics && m.metrics.latency_ms === rule.latency_ms, `[守护] ${id} metrics.latency_ms 应为 ${rule.latency_ms}，实为 ${m.metrics && m.metrics.latency_ms}`);
  if (rule.has_arxiv !== undefined) ok(m.has_arxiv === rule.has_arxiv, `[守护] ${id} has_arxiv 应为 ${rule.has_arxiv}，实为 ${m.has_arxiv}`);
  if (rule.stream !== undefined) ok(m.caps && m.caps.stream === rule.stream, `[守护] ${id} caps.stream 应为 ${rule.stream}，实为 ${m.caps && m.caps.stream}`);
}

// 5) 汇总
console.log(`模型总数: ${KB.models.length}`);
console.log(`INSIGHTS 条目数: ${total} (期望 ${KB.models.length * 3})`);
console.log(`每篇 3 条达成: ${KB.models.every((m) => (INSIGHTS[m.id] || []).length === 3)}`);
console.log(`Benchmark 条目数: ${benchRows}（均能在 KB.models 解析）`);
if (orphan.length) console.log(`孤儿 key: ${orphan.length}`);

if (problems.length) {
  console.error(`\n❌ 校验未通过，发现 ${problems.length} 个问题:`);
  problems.forEach((p) => console.error("  - " + p));
  process.exit(1);
} else {
  console.log(`\n✅ 校验通过：${KB.models.length} 模型全覆盖、每篇恰好 3 条、无退化条目、闭源前缀合规、基准无漂移、已核实事实守护通过。`);
  process.exit(0);
}
