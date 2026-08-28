#!/usr/bin/env node
// gen_model_pages.js — 从 data/kb.js（单一事实来源）为每个模型生成静态详情页：
//   models/<id>/index.html  （无需 JS 即可阅读，含架构/训练/实验/局限/创新/基准/来源 + JSON-LD TechArticle）
// 这些页面与 index.html(models.html/sitemap.xml/robots.txt) 一并被 tools/gen_seo.js 重新生成，
// 并被纳入 sitemap.xml，供搜索引擎单独索引（解决「哈希路由深链不可被独立索引」的 SEO 缺口）。
// 运行：node tools/gen_model_pages.js   或经 node tools/gen_seo.js 自动调用。
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const KB_JS = path.join(ROOT, "data", "kb.js");
const MODELS_DIR = path.join(ROOT, "models");
const BASE = "https://zhitao-zeng.github.io/asr-tts-knowledge-base/";
const UP = "../../"; // models/<id>/ → 仓库根

require(KB_JS);
const KB = globalThis.KB;
const DEEP = globalThis.DEEP || {};
const INSIGHTS = globalThis.INSIGHTS || {};
const BENCHMARKS = globalThis.BENCHMARKS || [];
const models = KB.models || [];
if (!models.length) { console.error("✗ 未从 data/kb.js 读取到 models"); process.exit(1); }

const linById = {};
for (const l of (KB.lineages || [])) linById[l.id] = l;

function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function trunc(s, n) {
  s = String(s || "");
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}
function mdInline(s) {
  let h = esc(s == null ? "" : s);
  h = h.replace(/\*\*([^*]+?)\*\*/g, "<strong>$1</strong>");
  return h;
}
// mini-markdown：## 子标题 / - 要点 / 空行分段 / **粗体**
function mdToHtml(t) {
  if (!t) return "";
  const lines = String(t).split("\n");
  let html = "", inUl = false;
  const closeUl = () => { if (inUl) { html += "</ul>"; inUl = false; } };
  for (let raw of lines) {
    const line = raw.replace(/\s+$/, "");
    if (line === "") { closeUl(); continue; }
    if (line.startsWith("## ")) { closeUl(); html += `<h3>${mdInline(line.slice(3))}</h3>`; continue; }
    if (line.startsWith("- ")) { if (!inUl) { html += '<ul class="ml">'; inUl = true; } html += `<li>${mdInline(line.slice(2))}</li>`; continue; }
    closeUl(); html += `<p>${mdInline(line)}</p>`;
  }
  closeUl();
  return html;
}

function benchmarksFor(id) {
  return BENCHMARKS.filter(b => (b.entries || []).some(e => e.id === id));
}
function benchHtml(m) {
  const bs = benchmarksFor(m.id);
  if (!bs.length) return '<p class="muted">本模型暂未纳入统一基准对比表。</p>';
  let rows = "";
  for (const b of bs) {
    const e = (b.entries || []).find(x => x.id === m.id);
    if (!e) continue;
    rows += `<tr><td>${esc(b.name)}</td><td>${esc(b.metric)}${b.unit ? " (" + esc(b.unit) + ")" : ""}</td><td class="v">${esc(String(e.v))}</td><td>${esc(e.note || "")}</td></tr>`;
  }
  if (!rows) return '<p class="muted">本模型暂未纳入统一基准对比表。</p>';
  return `<table class="bench"><thead><tr><th>基准</th><th>指标</th><th>数值</th><th>说明</th></tr></thead><tbody>${rows}</tbody></table>`;
}

function insightsHtml(id) {
  const arr = INSIGHTS[id] || [];
  if (!arr.length) return '<p class="muted">本模型暂无逐句解读旁注。</p>';
  return arr.map(it => `
    <div class="ins">
      <blockquote>${mdInline(it.q)}</blockquote>
      <div class="src">— ${esc(it.src || "")}</div>
      <p>${mdInline(it.insight)}</p>
    </div>`).join("");
}

function sourcesHtml(m) {
  let out = "";
  if (m.pdf_local) {
    out += `<p><a class="link" href="${esc(UP + m.pdf_local)}" target="_blank" rel="noopener">📄 打开已下载的本地 PDF</a></p>
      <p class="muted" style="font-size:12px">文件已随本知识库保存于 <code>papers/</code> 目录，断网也可直接打开；PDF 已随仓库直接托管（非 LFS），克隆即离线可读。</p>`;
  }
  if (m.paper_url) {
    out += `<p><a class="link" href="${esc(m.paper_url)}" target="_blank" rel="noopener">🔗 在线来源${/arxiv/.test(m.paper_url) ? "（arXiv 摘要页）" : ""}</a></p>`;
    if (!m.pdf_local) out += `<p class="muted" style="font-size:12px">仅在线链接，PDF 未随仓库托管；可前往来源页查看原文。</p>`;
  }
  if (!out) out = '<p class="muted">本模型未附公开论文链接（闭源或仅发布页）。</p>';
  return out;
}

function renderModelPage(m) {
  const id = m.id;
  const deepArch = (DEEP[id] && DEEP[id].architecture) || m.architecture || "";
  const deepTrain = (DEEP[id] && DEEP[id].training) || m.training || "";
  const deepAbl = (DEEP[id] && DEEP[id].ablation) || m.ablation || "";
  const deepLim = (DEEP[id] && DEEP[id].limitation) || m.limitation || "";
  const lineageTags = (m.framework_lines || []).map(l => {
    const n = linById[l] ? linById[l].name : l;
    return `<span class="tag">${esc(n)}</span>`;
  }).join(" ");
  const innovation = (m.innovation || []).map(i => `<li>${esc(i)}</li>`).join("");
  const results = (m.results || []).map(r =>
    `<tr><td>${esc(r.dataset)}</td><td>${esc(r.metric)}</td><td class="v">${esc(String(r.value))}</td><td>${esc(r.note || "")}</td></tr>`
  ).join("");
  const resultsHtml = results
    ? `<table class="bench"><thead><tr><th>数据集</th><th>指标</th><th>数值</th><th>说明</th></tr></thead><tbody>${results}</tbody></table>`
    : '<p class="muted">论文未给出结构化实验结果表。</p>';
  const diffHtml = (m.diff_vs || []).map(d =>
    `<div class="diff"><span class="vs">vs ${esc(d.vs)}</span><p>${esc(d.note)}</p></div>`
  ).join("");
  const refHtml = (m.references || []).map(r =>
    `<li><a class="link" href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.title)}</a></li>`
  ).join("");
  const readerHtml = m.reader_paper
    ? `<div class="sec"><div class="h acc">全文双语精读 <span class="badge-new">新</span></div>
        <p><a class="link" href="${esc(UP + "papers-read/" + m.reader_paper + "/")}">📖 阅读全文翻译与逐句讲解 →</a>（中英对照 / 仅中文 / 仅原文三种模式，讲解锚定到具体句子，可离线打开）</p></div>`
    : "";
  const insightsSec = (INSIGHTS[id] && INSIGHTS[id].length)
    ? `<div class="sec"><div class="h">论文逐句解读 · Insight 旁注</div>${insightsHtml(id)}</div>`
    : "";

  const desc = trunc(m.summary || `${m.org} 的 ${m.domain} 模型`, 200);
  const jsonld = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": `${esc(m.name)} · ${esc(m.org)}`,
    "about": { "@type": "Thing", "name": m.name, "alternateName": `${m.org} 的 ${m.domain} 模型` },
    "author": { "@type": "Organization", "name": m.org },
    "publisher": { "@type": "Organization", "name": "Zhitao Zeng" },
    "inLanguage": "zh-CN",
    "datePublished": String(m.date || "2026"),
    "description": desc,
    "mainEntityOfPage": BASE + "models/" + id + "/",
    "articleBody": (m.summary || "") + "\n\n" + (deepArch || "")
  };
  const jsonldBlock = `<script type="application/ld+json">\n${JSON.stringify(jsonld, null, 2)}\n</script>`;

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(m.name)} · ${esc(m.org)} ｜ ASR/TTS 知识库</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="index,follow">
<link rel="canonical" href="${esc(BASE + "models/" + id + "/")}">
${jsonldBlock}
</head>
<body>
<header class="top"><a href="${esc(BASE)}">← 返回交互知识库（需 JavaScript）</a> · <a href="${esc(UP + "models.html")}">静态清单</a></header>
<main>
  <div class="hd">
    <h1>${esc(m.name)}</h1>
    <div class="meta">${esc(m.org)} · ${esc(m.date)} · 领域 ${esc(m.domain)} · 参数量 ${esc(m.params || "—")} · 许可 ${esc(m.license || "—")}</div>
  </div>
  <div class="sec"><div class="h">一句话</div><p>${esc(m.summary || "")}</p></div>
  <div class="sec"><div class="h">所属主线</div><div class="tags">${lineageTags || '<span class="muted">—</span>'}${m.architectures ? '<span class="tag warn">多架构模型</span>' : ""}</div></div>
  <div class="sec"><div class="h">关键指标（统一基准）</div>${benchHtml(m)}</div>
  <div class="sec"><div class="h acc">架构细节 · 设计动机与机制</div>${mdToHtml(deepArch)}</div>
  <div class="sec"><div class="h acc">训练数据与目标 · 配方</div>${mdToHtml(deepTrain)}</div>
  <div class="sec"><div class="h">关键实验结果</div>${resultsHtml}</div>
  <div class="sec"><div class="h warnc">消融与关键发现</div>${mdToHtml(deepAbl)}</div>
  <div class="sec"><div class="h warnc">局限与开放问题 · 批判评估</div>${mdToHtml(deepLim)}</div>
  ${innovation ? `<div class="sec"><div class="h">创新点</div><ul class="tight">${innovation}</ul></div>` : ""}
  <div class="sec"><div class="h">与别家技术差异</div>${diffHtml || '<p class="muted">—</p>'}</div>
  ${refHtml ? `<div class="sec"><div class="h">参考来源</div><ul class="tight">${refHtml}</ul></div>` : ""}
  <div class="sec"><div class="h">论文 / 来源</div>${sourcesHtml(m)}</div>
  ${insightsSec}
  ${readerHtml}
  <div class="sec"><div class="h">交互版</div><p><a class="link" href="${esc(UP + "#/model/" + id)}">在交互知识库中打开 ${esc(m.name)} 卡片 →</a>（含能力矩阵、谱系图与筛选）</p></div>
</main>
<footer><p class="mut">本页为 SEO / 无障碍静态详情页，由 tools/gen_seo.js 自动生成，数据来源 data/kb.js。返回 <a href="${esc(BASE)}">知识库首页</a>。</p></footer>
<style>
  body{font-family:"PingFang SC","Microsoft YaHei",system-ui,sans-serif;max-width:920px;margin:0 auto;padding:20px 18px 60px;color:#1f2937;line-height:1.65;background:#f6f8fb}
  .top{margin-bottom:14px;font-size:13px}a{color:#2563eb;text-decoration:none}a:hover{text-decoration:underline}
  h1{font-size:26px;margin:4px 0 6px}
  .hd{border-bottom:2px solid #e5e7eb;padding-bottom:10px;margin-bottom:6px}
  .meta{color:#6b7280;font-size:14px}
  .sec{border-top:1px solid #e5e7eb;padding:16px 0}
  .h{font-size:17px;font-weight:700;margin:0 0 8px;color:#3730a3}
  .h.acc{color:#0e7490}.h.warnc{color:#b45309}
  .badge-new{font-size:11px;background:#dcfce7;color:#166534;padding:1px 7px;border-radius:6px;vertical-align:middle}
  .tag{display:inline-block;font-size:12px;padding:2px 9px;border-radius:6px;background:#dbeafe;color:#1e40af;margin:2px}
  .tag.warn{background:#fef3c7;color:#92400e}
  .tags{display:flex;flex-wrap:wrap;gap:4px}
  .tight{margin:6px 0;padding-left:20px}ul.ml{margin:6px 0;padding-left:20px}
  .ml li,.tight li{margin:3px 0}
  .muted{color:#9ca3af;font-size:13px}
  .link{font-weight:600}
  table.bench{border-collapse:collapse;width:100%;font-size:13.5px;margin-top:4px}
  table.bench th,table.bench td{border:1px solid #e5e7eb;padding:6px 9px;text-align:left;vertical-align:top}
  table.bench th{background:#eef2ff;color:#3730a3}
  table.bench td.v{font-weight:700;white-space:nowrap}
  .ins{border-left:3px solid #c7d2fe;background:#fff;padding:8px 14px;margin:10px 0;border-radius:0 8px 8px 0}
  .ins blockquote{margin:0 0 4px;color:#4338ca;font-style:italic}
  .ins .src{font-size:12px;color:#6b7280;margin-bottom:4px}
  .diff{border:1px solid #e5e7eb;background:#fff;border-radius:8px;padding:8px 12px;margin:8px 0}
  .diff .vs{font-weight:700;color:#3730a3}
  .diff p{margin:4px 0 0}
  h3{font-size:15px;color:#1e3a8a;margin:12px 0 4px}
  code{background:#e5e7eb;padding:1px 5px;border-radius:4px;font-size:12.5px}
  footer{margin-top:24px;border-top:1px solid #e5e7eb;padding-top:10px}
  .mut{color:#9ca3af;font-size:12px}
</style>
</body>
</html>
`;
}

function generateModelPages() {
  const urls = [];
  for (const m of models) {
    const html = renderModelPage(m);
    const dir = path.join(MODELS_DIR, m.id);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), html, "utf8");
    urls.push(BASE + "models/" + m.id + "/");
  }
  console.log(`✔ 生成 ${urls.length} 个模型静态详情页 models/<id>/index.html`);
  return urls;
}

module.exports = generateModelPages;
if (require.main === module) generateModelPages();
