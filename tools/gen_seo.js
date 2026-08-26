#!/usr/bin/env node
// gen_seo.js — 从 data/kb.js（单一事实来源）生成 SEO 产物：
//   1) 注入 JSON-LD 结构化数据（WebSite + ItemList）到 index.html 的标记之间
//   2) 生成静态可爬取页面 models.html（无需 JS，含全部模型名称/机构/摘要/链接）
//   3) 生成 sitemap.xml 与 robots.txt
// 运行：node tools/gen_seo.js   （改动数据后重新运行即可同步）
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const KB_JS = path.join(ROOT, "data", "kb.js");
const INDEX = path.join(ROOT, "index.html");
const MODELS_HTML = path.join(ROOT, "models.html");
const SITEMAP = path.join(ROOT, "sitemap.xml");
const ROBOTS = path.join(ROOT, "robots.txt");

const BASE = "https://zhitao-zeng.github.io/asr-tts-knowledge-base/";

// 加载单一事实来源（data/kb.js 仅给 globalThis 赋值，纯数据，Node 可直接 require）
require(KB_JS);
const KB = globalThis.KB;
const models = KB.models || [];
if (!models.length) { console.error("✗ 未从 data/kb.js 读取到 models"); process.exit(1); }

function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function trunc(s, n) {
  s = String(s || "");
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}

/* ---------- 1) JSON-LD ---------- */
const itemListElements = models.map((m, i) => ({
  "@type": "ListItem",
  "position": i + 1,
  "item": {
    "@type": "SoftwareApplication",
    "name": m.name,
    "applicationCategory": "AI/ML Model",
    "operatingSystem": "Web",
    "description": trunc(m.summary || `${m.org} 的 ${m.domain} 模型`, 160),
    "url": BASE + "#/model/" + m.id,
    "provider": { "@type": "Organization", "name": m.org }
  }
}));

const jsonld = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": BASE + "#website",
      "url": BASE,
      "name": "ASR / TTS 知识库 · 论文精读版",
      "description": "面向论文精读的 ASR 与 TTS 语音模型知识库，覆盖 56 个开源/闭源模型的架构解读、能力矩阵、基准对比与逐句论文精读。",
      "inLanguage": "zh-CN",
      "publisher": { "@type": "Organization", "name": "Zhitao Zeng" }
    },
    {
      "@type": "ItemList",
      "@id": BASE + "#modellist",
      "name": "ASR / TTS 模型清单",
      "numberOfItems": models.length,
      "itemListElement": itemListElements
    }
  ]
};
const jsonldBlock = `<script type="application/ld+json">\n${JSON.stringify(jsonld, null, 2)}\n</script>`;

// 注入到 index.html 的标记之间
const START = "<!--SEO_JSONLD_START-->";
const END = "<!--SEO_JSONLD_END-->";
let html = fs.readFileSync(INDEX, "utf8");
if (!html.includes(START) || !html.includes(END)) {
  console.error(`✗ index.html 缺少 ${START} / ${END} 标记`); process.exit(1);
}
const re = new RegExp(START + "[\\s\\S]*?" + END);
html = html.replace(re, `${START}\n${jsonldBlock}\n${END}`);
fs.writeFileSync(INDEX, html, "utf8");
console.log(`✔ JSON-LD 已注入 index.html（ItemList ${models.length} 项）`);

/* ---------- 2) 静态可爬取 models.html ---------- */
const byDomain = { ASR: [], TTS: [], "ASR+TTS": [] };
for (const m of models) {
  const key = byDomain[m.domain] ? m.domain : "ASR+TTS";
  (byDomain[key] || (byDomain["ASR+TTS"] = [])).push(m);
}
function modelCard(m) {
  return `      <li class="mc">
        <a class="mn" href="${esc(BASE + "#/model/" + m.id)}">${esc(m.name)}</a>
        <span class="mo">${esc(m.org)}</span>
        <span class="md">${esc(m.domain)}</span>
        <span class="ml">${esc(m.license || "")}</span>
        <p class="ms">${esc(trunc(m.summary || "", 200))}</p>
      </li>`;
}
let sections = "";
for (const dom of ["ASR", "TTS", "ASR+TTS"]) {
  const list = byDomain[dom] || [];
  if (!list.length) continue;
  sections += `    <section class="sec">
      <h2>${esc(dom)} · ${list.length} 个模型</h2>
      <ul class="mlist">\n${list.map(modelCard).join("\n")}\n      </ul>
    </section>\n`;
}
const modelsPage = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ASR / TTS 模型静态清单（无需 JavaScript）· 知识库</title>
<meta name="description" content="56 个 ASR / TTS 语音模型的名称、机构、许可证与一句话摘要静态清单，供搜索引擎与无 JS 环境浏览。">
<meta name="robots" content="index,follow">
<link rel="canonical" href="${esc(BASE + "models.html")}">
</head>
<body>
<header><a href="${esc(BASE)}">← 返回交互知识库（需 JavaScript）</a></header>
<h1>ASR / TTS 模型静态清单</h1>
<p>共 ${models.length} 个模型。点击模型名可在交互版中打开精读卡片（需 JavaScript）。</p>
${sections}
<footer><p class="mut">本页为 SEO / 无障碍静态镜像，由 tools/gen_seo.js 自动生成，数据来源 data/kb.js。</p></footer>
<style>
  body{font-family:"PingFang SC","Microsoft YaHei",system-ui,sans-serif;max-width:980px;margin:0 auto;padding:24px 18px 60px;color:#1f2937;line-height:1.6;background:#f6f8fb}
  header{margin-bottom:10px}a{color:#2563eb;text-decoration:none}a:hover{text-decoration:underline}
  h1{font-size:24px;margin:6px 0 4px}h2{font-size:18px;margin:22px 0 10px;color:#3730a3}
  .sec{border-top:1px solid #e5e7eb;padding-top:8px}
  .mlist{list-style:none;padding:0;display:grid;gap:10px}
  .mc{background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:12px 14px}
  .mn{font-weight:700;font-size:16px}.mo{color:#6b7280;margin-left:8px;font-size:13px}
  .md{display:inline-block;font-size:11px;padding:1px 7px;border-radius:6px;background:#dbeafe;color:#1e40af;margin-left:6px}
  .ml{display:inline-block;font-size:11px;padding:1px 7px;border-radius:6px;background:#f1f5f9;color:#475569;margin-left:6px}
  .ms{margin:6px 0 0;font-size:13.5px;color:#374151}
  .mut{color:#9ca3af;font-size:12px}
</style>
</body>
</html>
`;
fs.writeFileSync(MODELS_HTML, modelsPage, "utf8");
console.log(`✔ models.html 已生成（静态可爬取，${models.length} 个模型）`);

/* ---------- 3) sitemap.xml + robots.txt ---------- */
const urls = [BASE, BASE + "models.html"];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${esc(u)}</loc><changefreq>weekly</changefreq><priority>${u === BASE ? "1.0" : "0.8"}</priority></url>`).join("\n")}
</urlset>
`;
fs.writeFileSync(SITEMAP, sitemap, "utf8");
fs.writeFileSync(ROBOTS, `User-agent: *\nAllow: /\nSitemap: ${BASE}sitemap.xml\n`, "utf8");
console.log(`✔ sitemap.xml / robots.txt 已生成`);
console.log("完成。");
