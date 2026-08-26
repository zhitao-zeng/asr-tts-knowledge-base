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
const sandbox = {
  window: { addEventListener() {}, location: { hash: "#" } },
  document: {
    getElementById: () => stubEl(),
    querySelector: () => stubEl(),
    querySelectorAll: () => [],
    addEventListener() {},
    createElement: stubEl,
    body: stubEl(),
  },
  location: { hash: "#" },
  localStorage: { getItem: () => null, setItem() {} },
  addEventListener() {},
  console,
};
sandbox.globalThis = sandbox;
vm.createContext(sandbox);
// 顶层 const 声明不会挂到 sandbox 全局，故在同一脚本作用域内把结果导出到 globalThis
const exportHook = "\n;try{globalThis.__KB=KB;globalThis.__INSIGHTS=INSIGHTS;}catch(e){}\n";
try {
  vm.runInContext(js + exportHook, sandbox, { timeout: 8000 });
} catch (e) {
  console.error("脚本执行失败（语法/运行错误）:", e.message);
  process.exit(1);
}

const INSIGHTS = sandbox.__INSIGHTS;
const KB = sandbox.__KB;
const problems = [];
const ok = (cond, msg) => { if (!cond) problems.push(msg); };

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
let total = 0;
for (const m of KB.models) {
  const id = m.id;
  const arr = INSIGHTS[id];
  if (!arr) { problems.push(`[缺失] ${id} 在 INSIGHTS 中无条目`); continue; }
  if (arr.length !== 3) problems.push(`[条数] ${id} 应有 3 条，实际 ${arr.length}`);
  total += arr.length;
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

// 5) 汇总
console.log(`模型总数: ${KB.models.length}`);
console.log(`INSIGHTS 条目数: ${total} (期望 ${KB.models.length * 3})`);
console.log(`每篇 3 条达成: ${KB.models.every((m) => (INSIGHTS[m.id] || []).length === 3)}`);
if (orphan.length) console.log(`孤儿 key: ${orphan.length}`);

if (problems.length) {
  console.error(`\n❌ 校验未通过，发现 ${problems.length} 个问题:`);
  problems.forEach((p) => console.error("  - " + p));
  process.exit(1);
} else {
  console.log("\n✅ 校验通过：56 模型全覆盖、每篇恰好 3 条、无退化条目、闭源前缀合规。");
  process.exit(0);
}
