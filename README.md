# ASR / TTS 知识库 · 更新至 2026-08（论文精读版）

一个**零依赖、可离线打开**的交互式语音模型知识库，覆盖 ASR（自动语音识别）与 TTS（语音合成）方向 **56 个模型 / 系统**，并附带 **31 篇 2026 上半年论文**的本地全文与逐句 Insight 旁注。

🌐 **在线演示（GitHub Pages）**：https://zhitao-zeng.github.io/asr-tts-knowledge-base/

## 内容

- `index.html` + `data/kb.js` — 主交付物。直接在浏览器打开 `index.html` 即可使用（哈希路由、渲染逻辑内联于 index.html、结构化数据抽离至 `data/kb.js`、无需服务器、可离线以 `file://` 直接打开）。
  - **模型库**：56 个 ASR/TTS 模型卡片，含架构、定位、关键能力与局限。
  - **论文逐句解读**：31 篇论文的全文本地化 + Insight 旁注，可在线检索、定位原文段落。
- `ASR_TTS_2026H1_论文汇总.html` — 论文汇总视图（含 arXiv 链接、主题归类）。
- `papers/` — 31 篇论文 PDF 原文，直接随仓库托管（普通文件，克隆即得，无需 LFS / `git lfs pull`）。

## 本地运行

```bash
# 克隆（PDF 已直接随仓库，克隆即得）
git clone https://github.com/zhitao-zeng/asr-tts-knowledge-base.git
cd asr-tts-knowledge-base

# 直接打开
open index.html       # macOS
# 或任意浏览器打开 index.html
```

> 提示：`papers/` 已直接随仓库托管（普通文件），克隆即得真实 PDF，无需 `git lfs pull`。

## SEO / 可发现性

本站为客户端渲染（CSR）+ 哈希路由的单页应用，为使搜索引擎与无 JS 环境也能获取内容，额外提供了：

- `index.html` 内 `<head>` 的 Open Graph / Twitter Card / canonical / description 元标签，以及由 `tools/gen_seo.js` 自动注入的 **JSON-LD 结构化数据**（`WebSite` + 含全部 56 个模型的 `ItemList`）。
- `models.html` — 由同一脚本生成的**静态可爬取镜像**，列出全部模型的名称、机构、许可证与一句话摘要（无需 JavaScript 即可阅读，所有内容真实可见）。
- `sitemap.xml` + `robots.txt` — 供爬虫发现主站与静态镜像。

> 哈希路由在 GitHub Pages 这类静态托管下反而更稳健（深链不会 404）；若要进一步让每个模型被单独索引，需要预渲染/构建步骤，目前以 JSON-LD + 静态镜像覆盖主要 SEO 需求。数据更新后运行 `node tools/gen_seo.js` 即可同步上述全部产物。

## 数据说明

- 模型与论文信息均来自公开 arXiv 论文与官方发布，部分未开源模型的条目为「基于公开信息的推导注」，已在库内明确标注。
- 论文 PDF 受原作者版权保护，本仓库仅作个人研究备份，请遵守原许可、勿作商业使用（详见 `LICENSE` 末尾说明）。

## 版权与合规（公开仓库提示）

本仓库为 **public**，且 `papers/` 中 31 篇论文 PDF 已随仓库直接公开再分发（非 LFS，克隆即得）。
这些 PDF **均来自 arXiv 提交**：版权归原作者，各篇具体许可（CC BY / CC0 / CC BY-NC / 保留权利等）逐篇不同，
公开再分发风险显著低于出版社网关 PDF。已采取的合规措施：

- 在 `LICENSE` 与本文档明确声明 `papers/` 为第三方版权作品，版权归原作者 / arXiv，
  本仓库仅作研究聚合托管，请遵守原许可、勿作商业使用；
- `index.html` 每个模型均保留 **arXiv 摘要页在线链接**，与本地 PDF 并列，便于溯源与原文核对。

如需进一步降低风险，可将仓库转为 **private**（PDF 仅自留），或将 `papers/` 移除、仅保留 arXiv 链接。

## 更新与版本

- 版本与变更记录见 `CHANGELOG.md`。
- 模型/论文的增补、insight 重写的复现流程见 `tools/README.md`；每次改动后跑
  `node tools/validate.js` 做质检门禁。

## 技术

零依赖 HTML：哈希路由 + 内联渲染逻辑（结构化数据抽离至 `data/kb.js`），无构建步骤、无外部依赖、可离线打开（`file://` 直接打开或任意静态服务器均可）。
