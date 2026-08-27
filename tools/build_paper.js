#!/usr/bin/env node
/**
 * build_paper.js — 由 data/papers/<arxiv_id>.js 生成全文双语精读静态页
 *
 * 产物（全部自包含、无构建步骤、file:// 可直接打开）：
 *   papers-read/<arxiv_id>/index.html   单篇阅读页（预渲染全文，SEO 可爬）
 *   papers-read/index.html              论文精读索引页
 *
 * 阅读页功能：
 *   三种阅读模式：中英对照 / 仅中文 / 仅原文（body class 切换，localStorage 记忆）
 *   讲解密度：关闭 / 精选（featured）/ 全部
 *   讲解深度：白话 / 技术（有 explanation_plain 时切换）
 *   讲解锚定到句子：句尾 [解] 标记，桌面端右侧浮动面板、移动端段内展开
 *
 * 用法：node tools/build_paper.js [arxiv_id ...]   （无参数时构建全部）
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const BASE = "https://zhitao-zeng.github.io/asr-tts-knowledge-base/";

// 数据层（纯 globalThis 赋值，Node 直接 require）
require(path.join(ROOT, "data", "kb.js"));
const KB = globalThis.KB, INSIGHTS = globalThis.INSIGHTS || {};

const KIND_LABEL = {
  concept: "概念", motivation: "为什么这样设计", comparison: "和以前有什么区别",
  number: "数字怎么理解", engineering: "工程启发", critique: "值得质疑", connection: "延伸阅读",
};

function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
/* 与主站 mdInline 一致：先转义，再解析 **粗体** */
function md(s) { return esc(s).replace(/\*\*([^*]+?)\*\*/g, "<strong>$1</strong>"); }

/* ---------------- 阅读页 ---------------- */
function renderPaper(paper) {
  const model = (KB.models || []).find(m => m.id === paper.model_id) || {};
  const annBySid = new Map();
  for (const a of paper.annotations || []) {
    const sid = a.anchor && a.anchor.sentence_id;
    if (!sid) continue;
    if (!annBySid.has(sid)) annBySid.set(sid, []);
    annBySid.get(sid).push(a);
  }
  const nFeat = (paper.annotations || []).filter(a => a.featured).length;

  /* --- 讲解面板（每句一组；多条时第一条展开、其余折叠） --- */
  function annPanels(sid) {
    const list = annBySid.get(sid) || [];
    if (!list.length) return "";
    const card = (a) => `
      <div class="ann-card kind-${esc(a.kind)}">
        <div class="ann-kind">${esc(KIND_LABEL[a.kind] || a.kind)}</div>
        <div class="ann-title">${esc(a.title)}</div>
        <div class="ann-quote">${esc(a.anchor.quote)}</div>
        <div class="exp exp-tech">${md(a.explanation)}</div>
        ${a.explanation_plain ? `<div class="exp exp-plain">${md(a.explanation_plain)}</div>` : ""}
      </div>`;
    const first = card(list[0]);
    const rest = list.length > 1
      ? `<details class="ann-more"><summary>本句还有 ${list.length - 1} 条讲解</summary>${list.slice(1).map(card).join("")}</details>`
      : "";
    return `<div class="ann-panel" data-sid="${esc(sid)}">${first}${rest}</div>`;
  }
  /* --- 句尾 [解] 标记 --- */
  function marker(sid) {
    const list = annBySid.get(sid);
    if (!list) return "";
    const feat = list[0].featured ? " feat" : "";
    const n = list.length > 1 ? `<i>${list.length}</i>` : "";
    return `<button class="mk${feat}" data-sid="${esc(sid)}" title="查看讲解">解${n}</button>`;
  }

  const secHtml = (paper.sections || []).map(sec => {
    const exempt = (sec.id === "sec-references" || sec.id === "sec-front");
    const hTag = sec.level === 1 ? "h2" : "h3";
    const secNum = sec.num ? `<span class="secnum">${esc(sec.num)}</span> ` : "";
    const secTitle = sec.id === "sec-front" ? "" : `
      <${hTag} class="sech lv${sec.level}" id="${esc(sec.id)}">${secNum}<span class="t-zh">${esc(sec.title.zh || sec.title.original)}</span><span class="t-en">${esc(sec.title.original)}</span></${hTag}>`;
    const blocks = (sec.blocks || []).map(b => {
      if (b.type === "paragraph") {
        if (exempt) {
          // 参考文献 / 作者块：仅原文，小字
          return `<div class="pblk plain" id="${esc(b.id)}"><p class="refline">${esc(b.sentences.map(s => s.original).join(" "))}</p></div>`;
        }
        const en = b.sentences.map(s =>
          `<span class="sent" data-sid="${esc(s.id)}"><span class="en">${esc(s.original)}</span>${marker(s.id)}</span>`).join(" ");
        const zh = b.sentences.map(s =>
          `<span class="sent" data-sid="${esc(s.id)}"><span class="zh">${esc(s.zh || "")}</span>${marker(s.id)}</span>`).join("");
        const panels = b.sentences.map(s => annPanels(s.id)).join("");
        return `<div class="pblk" id="${esc(b.id)}">
          <p class="en-lines">${en}</p>
          <p class="zh-lines">${zh}</p>
          ${panels ? `<div class="ann-zone">${panels}</div>` : ""}
        </div>`;
      }
      if (b.type === "figure_caption" || b.type === "table_caption") {
        const kind = b.type === "figure_caption" ? "图" : "表";
        return `<div class="cap" id="${esc(b.id)}"><span class="cap-k">${kind}</span><p class="en">${esc(b.original)}</p>${b.zh ? `<p class="zh">${esc(b.zh)}</p>` : ""}</div>`;
      }
      if (b.type === "equation") {
        return `<div class="eq" id="${esc(b.id)}"><code>${esc(b.original)}</code></div>`;
      }
      if (b.type === "table_body") {
        return `<div class="tbwrap" id="${esc(b.id)}">${b.zh ? `<p class="zh tb-note">${esc(b.zh)}</p>` : ""}
          <details class="tb"><summary>原始表格文本（${b.cells || "?"} 个单元格，PDF 抽取顺序，数字与原文一致；精确排版见原文 PDF）</summary><pre>${esc(b.original)}</pre></details></div>`;
      }
      return "";
    }).join("\n");
    return `<section>${secTitle}${blocks}</section>`;
  }).join("\n");

  /* --- 三分钟看懂（复用 INSIGHTS 三条论文级摘要） --- */
  const ins = (INSIGHTS[paper.model_id] || []);
  const tldr = ins.length ? `
  <section class="tldr card">
    <h2>三分钟看懂这篇论文</h2>
    ${ins.map(it => `
      <div class="insight-block">
        <div class="ins-src">${esc(it.src || "")}</div>
        <div class="ins-quote">${md(it.q)}</div>
        <div class="ins-body">${md(it.insight)}</div>
      </div>`).join("")}
    <p class="muted" style="font-size:12.5px">以上为论文级三条摘要；下面进入全文双语精读，讲解锚定在具体句子旁。</p>
  </section>` : "";

  /* --- 目录 --- */
  const toc = (paper.sections || []).filter(s => s.id !== "sec-front").map(s =>
    `<a class="lv${s.level}" href="#${esc(s.id)}">${s.num ? esc(s.num) + " " : ""}${esc(s.title.zh || s.title.original)}</a>`).join("");

  const desc = `${paper.title.zh}（${paper.title.original}）全文中文翻译 + ${(paper.annotations || []).length} 条句子级讲解 · ASR/TTS 知识库论文精读`;
  const jsonld = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    "headline": paper.title.original,
    "alternateName": paper.title.zh,
    "url": BASE + "papers-read/" + paper.paper_id + "/",
    "isBasedOn": "https://arxiv.org/abs/" + paper.paper_id,
    "inLanguage": ["en", "zh-CN"],
    "isAccessibleForFree": true,
    "publisher": { "@type": "Organization", "name": "Zhitao Zeng" },
  };

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(paper.title.zh)} · 全文双语精读 | ASR/TTS 知识库</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="index,follow">
<link rel="canonical" href="${BASE}papers-read/${esc(paper.paper_id)}/">
<meta property="og:type" content="article">
<meta property="og:title" content="${esc(paper.title.zh)} · 全文双语精读">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${BASE}papers-read/${esc(paper.paper_id)}/">
<script type="application/ld+json">${JSON.stringify(jsonld)}</script>
<style>
:root{--brand:#2563eb;--brand2:#4338ca;--accent:#0f766e;--warn:#b45309;--bg:#f6f8fb;--panel:#fff;--line:#e5e7eb;--muted:#64748b;--ink:#1f2937;--chip:#eef2f7}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font-family:"PingFang SC","Microsoft YaHei",system-ui,sans-serif;line-height:1.75}
a{color:var(--brand);text-decoration:none}a:hover{text-decoration:underline}
header.top{background:var(--panel);border-bottom:1px solid var(--line);position:sticky;top:0;z-index:50}
.nav{max-width:1180px;margin:0 auto;display:flex;gap:6px;align-items:center;padding:10px 18px;font-size:14px;flex-wrap:wrap}
.nav .brand{font-weight:800;margin-right:8px}
.nav .spacer{flex:1}
main{max-width:1180px;margin:0 auto;padding:20px 18px 80px;display:grid;grid-template-columns:220px 1fr;gap:24px}
.card{background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:18px 22px;box-shadow:0 1px 2px rgba(15,23,42,.04)}
.muted{color:var(--muted)}
/* 头部 */
.phead{grid-column:1/-1}
.phead h1{font-size:24px;margin:8px 0 2px}
.phead .en-title{font-size:15px;color:var(--muted);font-style:italic}
.phead .meta{font-size:13.5px;color:var(--muted);margin-top:8px}
.phead .meta a{margin:0 6px}
/* 控制条 */
.controls{grid-column:1/-1;display:flex;gap:18px;flex-wrap:wrap;align-items:center;background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:10px 16px;font-size:13.5px;position:sticky;top:52px;z-index:40}
.controls .grp{display:flex;gap:6px;align-items:center}
.controls label{color:var(--muted);font-weight:600;font-size:12.5px}
.seg{display:inline-flex;border:1px solid var(--line);border-radius:9px;overflow:hidden}
.seg button{border:0;background:#fff;padding:5px 11px;font-size:13px;cursor:pointer;color:var(--muted);font-weight:600}
.seg button.on{background:var(--brand);color:#fff}
/* 目录 */
.toc{position:sticky;top:118px;align-self:start;max-height:calc(100vh - 140px);overflow:auto;font-size:13px;padding:8px 0}
.toc a{display:block;color:var(--muted);padding:3px 10px;border-radius:7px;line-height:1.45}
.toc a:hover{background:var(--chip);color:var(--brand);text-decoration:none}
.toc a.lv2{padding-left:24px;font-size:12.5px}
/* 正文 */
.reader{min-width:0}
section{margin-bottom:8px}
.sech{scroll-margin-top:120px}
.sech .secnum{color:var(--brand2)}
h2.sech{font-size:21px;margin:26px 0 10px;border-bottom:1px solid var(--line);padding-bottom:6px}
h3.sech{font-size:16.5px;margin:20px 0 8px}
.sech .t-en{display:block;font-size:12.5px;color:var(--muted);font-weight:400;font-style:italic;margin-top:1px}
/* 段落：双语 */
.pblk{margin:10px 0;position:relative}
.en-lines{color:#334155;font-size:14px;line-height:1.7;margin:4px 0}
.zh-lines{font-size:15.5px;line-height:1.85;margin:4px 0}
.sent{position:relative}
/* 阅读模式切换 */
body.mode-en .zh-lines,body.mode-en .cap .zh,body.mode-en .sech .t-zh{display:none}
body.mode-zh .en-lines,body.mode-zh .cap .en,body.mode-zh .sech .t-en{display:none}
body.mode-bi .en-lines{border-left:3px solid var(--chip);padding-left:10px}
/* [解] 标记 */
.mk{display:inline-block;vertical-align:super;font-size:10.5px;line-height:1.4;margin-left:2px;padding:1px 5px;border-radius:5px;border:1px solid #c7d2fe;background:#eef2ff;color:#4338ca;cursor:pointer;font-weight:700}
.mk:hover{background:#e0e7ff}
.mk i{font-style:normal;margin-left:2px;color:#7c3aed}
.mk.open{background:var(--brand2);color:#fff}
body.dens-off .mk{display:none}
body.dens-feat .mk:not(.feat){display:none}
/* 讲解面板 */
.ann-panel{display:none;margin:8px 0 14px;max-width:520px}
.ann-panel.open{display:block}
.ann-card{background:#fbfaff;border:1px solid #ddd6fe;border-left:4px solid var(--brand2);border-radius:10px;padding:11px 14px;font-size:14px}
.ann-kind{display:inline-block;font-size:11px;font-weight:700;color:#4338ca;background:#ede9fe;border-radius:999px;padding:1px 9px;margin-bottom:5px}
.kind-critique .ann-kind{color:#991b1b;background:#fee2e2}
.kind-critique{border-left-color:#dc2626;background:#fffbeb;border-color:#fde68a}
.kind-engineering .ann-kind{color:#166534;background:#dcfce7}
.kind-engineering{border-left-color:#16a34a}
.ann-title{font-weight:800;margin:2px 0 4px}
.ann-quote{font-size:12px;color:var(--muted);font-style:italic;border-left:2px solid var(--line);padding-left:8px;margin-bottom:6px}
.exp{font-size:13.5px;line-height:1.7;color:#334155}
body.depth-tech .exp-plain{display:none}
body.depth-plain .exp-tech{display:none}
body.depth-plain .exp-tech:only-child,body.depth-plain .ann-card:not(:has(.exp-plain)) .exp-tech{display:block}
.ann-more{margin-top:8px}
.ann-more summary{font-size:12.5px;color:var(--brand2);cursor:pointer}
/* 桌面端：讲解面板浮动到右侧 */
@media(min-width:1180px){
  .ann-zone{position:absolute;right:-315px;width:300px;top:0}
  .ann-panel{position:absolute;margin:0;max-width:300px}
  .reader{position:relative;margin-right:315px}
  main{grid-template-columns:210px 1fr}
}
/* 图/表标题、公式、表格主体 */
.cap{background:#f8fafc;border:1px solid var(--line);border-radius:10px;padding:9px 13px;margin:12px 0;font-size:13px}
.cap-k{display:inline-block;font-size:11px;font-weight:700;color:#0f766e;background:#ccfbf1;border-radius:6px;padding:1px 7px;margin-right:6px}
.cap p{margin:3px 0;display:inline}
.cap .zh{display:block;color:#0f172a}
.cap .en{color:var(--muted);display:block;font-size:12.5px}
.eq{text-align:center;margin:12px 0;padding:8px;background:#fff;border:1px dashed var(--line);border-radius:10px;overflow:auto}
.eq code{background:none;font-size:14px}
.tbwrap{margin:10px 0}
.tb-note{font-size:13px;color:var(--muted);margin:4px 0}
.tb summary{font-size:12.5px;color:var(--muted);cursor:pointer}
.tb pre{font-size:11.5px;line-height:1.5;background:#f8fafc;border:1px solid var(--line);border-radius:8px;padding:10px;overflow:auto;max-height:320px;white-space:pre-wrap}
.refline{font-size:12px;color:var(--muted);line-height:1.6;margin:3px 0;word-break:break-word}
/* 三分钟摘要 */
.tldr{grid-column:1/-1;border-left:4px solid var(--brand2)}
.tldr h2{margin:0 0 10px;font-size:18px}
.insight-block{border:1px solid #e6e0f3;border-radius:10px;padding:10px 14px;margin:10px 0;background:#fbfaff}
.ins-src{display:inline-block;font-size:11px;color:#4338ca;background:#ede9fe;border-radius:999px;padding:1px 9px;margin-bottom:6px}
.ins-quote{font-style:italic;color:#1e1b4b;font-size:13.5px;margin-bottom:6px}
.ins-body{font-size:14px;line-height:1.75;color:#334155}
footer.foot{grid-column:1/-1;color:var(--muted);font-size:12.5px;border-top:1px solid var(--line);padding-top:14px;margin-top:20px}
@media(max-width:900px){
  main{grid-template-columns:1fr}
  .toc{display:none}
  .controls{position:static}
}
</style>
</head>
<body class="mode-bi dens-feat depth-tech">
<header class="top"><nav class="nav">
  <span class="brand">ASR/TTS 知识库<span style="color:var(--brand)">.</span> 论文精读</span>
  <a href="../../index.html">交互知识库</a>
  <a href="../">精读列表</a>
  ${paper.model_id ? `<a href="../../index.html#/model/${esc(paper.model_id)}">${esc(model.name || paper.model_id)} 模型卡</a>` : ""}
  <span class="spacer"></span>
  <a href="https://arxiv.org/abs/${esc(paper.paper_id)}" target="_blank" rel="noopener">arXiv:${esc(paper.paper_id)}</a>
  <a href="../../papers/${esc(paper.paper_id)}.pdf" target="_blank" rel="noopener">本地 PDF</a>
</nav></header>
<main>
  <div class="phead card">
    <h1>${esc(paper.title.zh)}</h1>
    <div class="en-title">${esc(paper.title.original)}</div>
    <div class="meta">
      ${model.name ? `关联模型：<a href="../../index.html#/model/${esc(paper.model_id)}">${esc(model.name)}</a>（${esc(model.org || "")} · ${esc(model.date || "")}） ·` : ""}
      全文 ${paper.sections.reduce((n, s) => n + s.blocks.length, 0)} 个语块 · 讲解 ${(paper.annotations || []).length} 条（精选 ${nFeat} 条）
    </div>
  </div>
  <div class="controls">
    <div class="grp"><label>阅读模式</label><span class="seg" id="segMode">
      <button data-v="bi" class="on">中英对照</button><button data-v="zh">仅中文</button><button data-v="en">仅原文</button></span></div>
    <div class="grp"><label>讲解密度</label><span class="seg" id="segDens">
      <button data-v="off">关闭</button><button data-v="feat" class="on">精选</button><button data-v="all">全部</button></span></div>
    <div class="grp"><label>讲解深度</label><span class="seg" id="segDepth">
      <button data-v="plain">白话</button><button data-v="tech" class="on">技术</button></span></div>
  </div>
  ${tldr}
  <nav class="toc">${toc}</nav>
  <article class="reader">${secHtml}</article>
  <footer class="foot">
    原文来自 arXiv:${esc(paper.paper_id)}（版权归原作者 / arXiv，本页仅作研究学习用途）；中文翻译与句旁讲解为知识库编辑加工，如有出入以原文为准。
    本地 PDF：<a href="../../papers/${esc(paper.paper_id)}.pdf">papers/${esc(paper.paper_id)}.pdf</a>。
    页面由 tools/build_paper.js 自动生成，数据来源 data/papers/${esc(paper.paper_id)}.js。
  </footer>
</main>
<script>
(function(){
  var body=document.body;
  function seg(id,cls,key){
    var el=document.getElementById(id);
    el.addEventListener("click",function(e){
      var b=e.target.closest("button");if(!b)return;
      el.querySelectorAll("button").forEach(function(x){x.classList.remove("on")});
      b.classList.add("on");
      body.className=body.className.replace(new RegExp(cls+"-\\w+"),"").trim();
      body.classList.add(cls+"-"+b.dataset.v);
      try{localStorage.setItem(key,b.dataset.v)}catch(_){}
      closeAll();
    });
    try{var v=localStorage.getItem(key);if(v){var btn=el.querySelector('[data-v="'+v+'"]');if(btn)btn.click();}}catch(_){}
  }
  seg("segMode","mode","pr_mode");
  seg("segDens","dens","pr_dens");
  seg("segDepth","depth","pr_depth");

  var article=document.querySelector(".reader");
  function closeAll(){
    document.querySelectorAll(".ann-panel.open").forEach(function(p){p.classList.remove("open")});
    document.querySelectorAll(".mk.open").forEach(function(m){m.classList.remove("open")});
  }
  document.addEventListener("click",function(e){
    var mk=e.target.closest(".mk");
    if(!mk)return;
    var sid=mk.dataset.sid;
    var blk=mk.closest(".pblk");
    var panel=blk?blk.querySelector('.ann-panel[data-sid="'+sid+'"]'):null;
    if(!panel)return;
    var was=panel.classList.contains("open");
    closeAll();
    if(!was){
      panel.classList.add("open");
      document.querySelectorAll('.mk[data-sid="'+sid+'"]').forEach(function(m){m.classList.add("open")});
      if(window.innerWidth>=1180){
        // 面板绝对定位于 .ann-zone（其顶对齐 .pblk 顶），top = 标记相对 .pblk 的纵向偏移
        var top=0,el=mk;
        while(el&&el!==blk){top+=el.offsetTop||0;el=el.offsetParent;}
        panel.style.top=Math.max(0,top-4)+"px";
      }
    }
  });
  document.addEventListener("keydown",function(e){if(e.key==="Escape")closeAll();});
})();
</script>
</body>
</html>
`;
}

/* ---------------- 索引页 ---------------- */
function renderIndex(papers) {
  const rows = papers.map(p => {
    const model = (KB.models || []).find(m => m.id === p.model_id) || {};
    const nSent = p.sections.reduce((n, s) => n + s.blocks.reduce((k, b) => k + (b.sentences ? b.sentences.length : 0), 0), 0);
    return `<li class="pc">
      <div>
        <a class="pt" href="./${esc(p.paper_id)}/">${esc(p.title.zh)}</a>
        <div class="pe">${esc(p.title.original)}</div>
        <div class="pm">
          ${model.name ? `<a href="../index.html#/model/${esc(p.model_id)}">${esc(model.name)}</a> · ` : ""}
          <a href="https://arxiv.org/abs/${esc(p.paper_id)}" target="_blank" rel="noopener">arXiv:${esc(p.paper_id)}</a> ·
          <a href="../papers/${esc(p.paper_id)}.pdf">本地 PDF</a> ·
          ${nSent} 句 · ${(p.annotations || []).length} 条句旁讲解
        </div>
      </div>
    </li>`;
  }).join("\n");
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>论文全文双语精读 · ASR/TTS 知识库</title>
<meta name="description" content="ASR / TTS 旗舰论文的全文中文翻译 + 句子级锚定讲解：中英对照、仅中文、仅原文三种阅读模式。">
<meta name="robots" content="index,follow">
<link rel="canonical" href="${BASE}papers-read/">
<style>
body{margin:0;background:#f6f8fb;color:#1f2937;font-family:"PingFang SC","Microsoft YaHei",system-ui,sans-serif;line-height:1.7}
main{max-width:880px;margin:0 auto;padding:28px 18px 60px}
a{color:#2563eb;text-decoration:none}a:hover{text-decoration:underline}
h1{font-size:24px}
.mut{color:#64748b;font-size:13.5px}
ul{list-style:none;padding:0;display:grid;gap:12px;margin-top:18px}
.pc{background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:14px 18px}
.pt{font-weight:800;font-size:16.5px}
.pe{color:#64748b;font-size:13px;font-style:italic;margin-top:2px}
.pm{font-size:12.5px;color:#64748b;margin-top:6px}
</style>
</head>
<body>
<main>
  <p class="mut"><a href="../index.html">← 返回交互知识库</a></p>
  <h1>论文全文双语精读</h1>
  <p class="mut">全文原文 + 全文中文翻译 + 句子级锚定讲解。每篇支持 <b>中英对照 / 仅中文 / 仅原文</b> 三种模式，
  讲解默认显示「精选」，可切换「全部」。页面均为静态 HTML，可离线打开、可被搜索引擎索引。</p>
  <ul>${rows}</ul>
  <p class="mut">原文版权归原作者 / arXiv；翻译与讲解为知识库编辑加工。由 tools/build_paper.js 生成。</p>
</main>
</body>
</html>
`;
}

/* ---------------- main ---------------- */
let ids = process.argv.slice(2);
const dir = path.join(ROOT, "data", "papers");
if (!ids.length) {
  if (!fs.existsSync(dir)) { console.log("data/papers/ 不存在"); process.exit(0); }
  ids = fs.readdirSync(dir).filter(f => f.endsWith(".js")).map(f => f.replace(/\.js$/, ""));
}
const papers = [];
for (const id of ids) {
  const f = path.join(dir, id + ".js");
  if (!fs.existsSync(f)) { console.error("✗ 缺少 " + f); process.exitCode = 1; continue; }
  const g = {};
  new Function("globalThis", fs.readFileSync(f, "utf8"))(g);
  const paper = g["PAPER_" + id.replace(/\./g, "_")];
  if (!paper) { console.error("✗ " + f + " 未定义 PAPER_ 全局变量"); process.exitCode = 1; continue; }
  papers.push(paper);
  const outDir = path.join(ROOT, "papers-read", id);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.html"), renderPaper(paper), "utf8");
  console.log(`✔ papers-read/${id}/index.html（${(paper.annotations || []).length} 条讲解）`);
}
if (papers.length) {
  const idxDir = path.join(ROOT, "papers-read");
  fs.mkdirSync(idxDir, { recursive: true });
  fs.writeFileSync(path.join(idxDir, "index.html"), renderIndex(papers), "utf8");
  console.log(`✔ papers-read/index.html（${papers.length} 篇）`);
}
