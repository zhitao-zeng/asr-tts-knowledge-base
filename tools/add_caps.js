#!/usr/bin/env node
/**
 * add_caps.js — 为 56 个模型生成显式能力标注 caps 字段，写入 data/kb.js
 *
 * 背景（P1-9）：原 capsOf 在渲染时靠"摘要/流派关键词"实时猜测 5 个能力维度，易误判。
 * 改为把能力标注固化为每个模型卡的显式 caps 字段（单一事实来源 data/kb.js），
 * 渲染层只读 m.caps，不再猜测；后续人工修订只需改 data/kb.js。
 *
 * 用法： node tools/add_caps.js            # 生成/补全 caps 并打印矩阵
 *       node tools/add_caps.js --apply    # 写回 data/kb.js（默认只预览）
 *
 * 策略：以"改进的启发式"作为基线（修复原 multi 误匹配 1600、long 过窄等问题），
 *       然后叠加 OVERRIDES 人工修正。已存在且未被 override 的 caps 会被保留（幂等，不覆盖人工修订）。
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const kbPath = path.join(root, "data", "kb.js");
const sandbox = {}; sandbox.globalThis = sandbox; vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(kbPath, "utf8"), sandbox, { timeout: 10000 });
const KB = sandbox.KB;

// ---- 改进版基线启发式（仅作基线，最终以显式字段为准） ----
function baseline(m) {
  const s = (m.summary || "").toLowerCase();
  const fw = (m.framework_lines || []).join(" ").toLowerCase();
  const arch = (m.architecture || "").toLowerCase();
  const t = `${s} ${fw} ${arch}`;
  return {
    stream: /stream/.test(fw) || /流式|实时|低延迟|streaming|首包|realtime/.test(t),
    long:   /asr_long/.test(fw) || /长音频|60\s*分钟|long audio|超长|长文本|long-?form|小时级/.test(t),
    multi:  /多语|multilingual|语种|跨语|方言/.test(t),
    clone:  m.domain === "TTS" && /零样本|zero.?shot|克隆|clone|voice cloning/.test(t),
    emot:   /情感|emotion|表现力|expressive|韵律|情绪|prosody/.test(t),
  };
}

// ---- 人工修正（key=模型id，值=对基线逐维度覆盖；true/false 显式指定） ----
// 这些是被基线启发式明显误判、且经事实核对需显式固定的项；其余维持基线（可在 data/kb.js 继续人工精修）。
const OVERRIDES = {
  cohere_transcribe: { multi: true },            // 官方明确 14 种语言
  whisper:           { multi: true },            // 100+ 语言，语音领域事实标准
  meta_mms:          { multi: true },            // MMS 覆盖 1000+ 语言
  qwen_audio_tts:    { stream: false },          // Qwen-Audio 为音频理解模型，非流式 TTS
  // —— 以下为本次人工复核后确认的精确能力（覆盖启发式）——
  nim4_asr:          { stream: true, multi: true }, // 原生流式 + 中英/方言/code-switch
  fishaudio_s2:      { multi: true, clone: true },  // 80+ 语言；Fish 为克隆向模型
  minimax28:         { multi: true },               // 40+ 语言
  // 原始 wav2vec 2.0 / HuBERT 为英语(LibriSpeech)基线；多语版本为 XLSR / mHuBERT 等派生模型，故不强标 multi
};

const CAP_KEYS = ["stream", "long", "multi", "clone", "emot"];
function resolve(m) {
  const base = baseline(m);
  const ov = OVERRIDES[m.id] || {};
  const out = {};
  for (const k of CAP_KEYS) out[k] = (k in ov) ? ov[k] : base[k];
  return out;
}

// 幂等：保留已有且未被 override 的 caps
for (const m of KB.models) {
  const computed = resolve(m);
  if (m.caps && typeof m.caps === "object") {
    for (const k of CAP_KEYS) if (!(k in (OVERRIDES[m.id] || {}))) computed[k] = m.caps[k];
  }
  m.caps = computed;
}

// ---- 打印矩阵供复核 ----
const header = ["id", "领域", "流式", "长音频", "多语种", "克隆", "情感"];
console.log(header.join("\t"));
for (const m of KB.models) {
  const c = m.caps;
  console.log([
    m.id, m.domain === "ASR" ? "ASR" : "TTS",
    c.stream ? "✓" : "—", c.long ? "✓" : "—", c.multi ? "✓" : "—",
    c.clone ? "✓" : "—", c.emot ? "✓" : "—",
  ].join("\t"));
}
const tally = {};
for (const m of KB.models) for (const k of CAP_KEYS) tally[k] = (tally[k] || 0) + (m.caps[k] ? 1 : 0);
console.log("\n维度计数:", JSON.stringify(tally));

// ---- 写回 ----
if (process.argv.includes("--apply")) {
  const ser = (o) => JSON.stringify(o, null, 2);
  const banner = `// 自动生成：语音模型知识库结构化数据（单一事实来源 / single source of truth）
// 本文件由 tools/split_data.js 从 index.html 抽离，caps 字段由 tools/add_caps.js 生成/补全。
// 编辑数据请改这里，勿改 index.html 内联。通过页面 <script src="data/kb.js"> 加载。
`;
  const kbJs = banner +
    `globalThis.KB = ${ser(KB)};\n` +
    `globalThis.DEEP = ${ser(sandbox.DEEP)};\n` +
    `globalThis.INSIGHTS = ${ser(sandbox.INSIGHTS)};\n` +
    `globalThis.BENCHMARKS = ${ser(sandbox.BENCHMARKS)};\n`;
  fs.writeFileSync(kbPath, kbJs, "utf8");
  console.log(`\n✔ 已写回 data/kb.js（含 ${KB.models.length} 个模型的显式 caps）`);
} else {
  console.log("\n（预览模式）加 --apply 才会写回 data/kb.js");
}
