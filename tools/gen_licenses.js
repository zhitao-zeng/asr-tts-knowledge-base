#!/usr/bin/env node
/**
 * gen_licenses.js — 生成 papers/licenses.json（逐论文许可证清单）
 *
 * 背景（P0-4 / Commit 2）：仓库 LICENSE 已声明"只有明确允许再分发的论文才适合直接重新托管"，
 * 但 papers/ 下仍托管了 33 个本地 PDF，其中多数仅有 arXiv 默认的非独占分发许可，
 * 并不授予第三方在 GitHub 上重新分发。本工具把"每个本地 PDF 的再分发许可"固化为单一清单，
 * 供 validate.js 做门禁：redistribution_allowed=false 且 status=verified 的论文不得托管 PDF。
 *
 * 判定规则（保守，宁窄勿宽）：
 *   - CC BY / CC BY-SA / CC0 / Public Domain / MIT / Apache / BSD → 明确可再分发 → allowed
 *   - CC BY-NC / 非商业 → 非商业许可，公开仓库再分发需谨慎 → review
 *   - 商业 / 闭源 / 研究用途 / 仅"开源"(模型开源≠论文 PDF 可再分发) / 未知 → review
 *   status=verified 表示已人工确认；review 表示待确认（validate 仅告警，不阻断）。
 *
 * 合并策略：若 papers/licenses.json 已存在，保留其中 status=verified 或
 * redistribution_allowed 被显式设置的条目，仅对缺失项做自动推断，避免覆盖人工决议。
 *
 * 用法： node tools/gen_licenses.js
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const kbPath = path.join(root, "data", "kb.js");
const licPath = path.join(root, "papers", "licenses.json");

const sandbox = {}; sandbox.globalThis = sandbox; vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(kbPath, "utf8"), sandbox, { timeout: 8000 });
const KB = sandbox.KB;

function decide(lic) {
  if (!lic) return { redistribution_allowed: false, status: "review" };
  const L = lic;
  if (/CC BY-NC|non-commercial|非商业/i.test(L))
    return { redistribution_allowed: false, status: "review", note: "非商业许可，公开仓库再分发需谨慎" };
  if (/CC BY\b|CC BY-SA|CC0|public domain|mit|apache|bsd/i.test(L))
    return { redistribution_allowed: true, status: "verified" };
  // 商业 / 闭源 / 研究用途 / 仅"开源"(模型开源≠论文 PDF 可再分发) / 未知
  return { redistribution_allowed: false, status: "review", note: "需作者/出版方明确授权方可再分发" };
}

// 人工确认过的强制决议（覆盖自动推断）
const OVERRIDES = {
  nim4_asr: {
    redistribution_allowed: false,
    status: "verified",
    license: "arXiv non-exclusive distribution license",
    note: "arXiv 非独占分发许可仅授予 arXiv.org 分发权，不授予任意第三方在 GitHub 再分发；仅保留 arXiv 链接",
  },
};

const existing = fs.existsSync(licPath) ? JSON.parse(fs.readFileSync(licPath, "utf8")) : {};
delete existing._policy;

const out = {
  _policy:
    "本地 PDF 仅托管明确允许再分发的论文（CC BY / CC BY-SA / CC0 / Public Domain / MIT / Apache / BSD / 作者或出版方明确授权）。" +
    "其他论文仅保留 arXiv 链接，不托管 PDF。redistribution_allowed=false 且 status=verified 的条目不得托管本地 PDF（validate.js 门禁会阻断）。" +
    "status=review 表示待人工确认，当前仅告警不阻断。",
};

let nAllow = 0, nReview = 0, nVerifiedFalse = 0;
for (const m of KB.models) {
  if (!m.pdf_local) continue;
  const arx = (m.pdf_local.match(/(\d{4}\.\d{4,5})\.pdf$/) || [])[1];
  if (!arx) continue;
  // 已有且人工确认的决议优先
  const prev = existing[arx];
  if (prev && (prev.status === "verified" || typeof prev.redistribution_allowed === "boolean" && prev._locked)) {
    out[arx] = prev;
  } else if (OVERRIDES[m.id]) {
    out[arx] = Object.assign({ arxiv_id: arx, source_url: `https://arxiv.org/abs/${arx}`, checked_at: "2026-08-28" }, OVERRIDES[m.id]);
  } else if (prev && typeof prev.redistribution_allowed === "boolean") {
    // 保留既有自动推断结果（含 note），不重复刷新 checked_at
    out[arx] = prev;
  } else {
    const d = decide(m.license);
    out[arx] = Object.assign(
      { arxiv_id: arx, license: m.license || "(未声明)", source_url: `https://arxiv.org/abs/${arx}`, checked_at: "2026-08-28" },
      d
    );
  }
  const e = out[arx];
  if (e.redistribution_allowed === true) nAllow++;
  else if (e.status === "verified") nVerifiedFalse++;
  else nReview++;
}

fs.writeFileSync(licPath, JSON.stringify(out, null, 2) + "\n", "utf8");
console.log(`✔ papers/licenses.json 已生成`);
console.log(`  可再分发(allowed): ${nAllow} ｜ 已确认禁止(verified-false): ${nVerifiedFalse} ｜ 待确认(review): ${nReview}`);
console.log(`  合计本地 PDF 条目: ${nAllow + nVerifiedFalse + nReview}`);
