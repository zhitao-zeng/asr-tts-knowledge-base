# ASR / TTS 知识库 · 2026 H1（论文精读版）

一个**单文件、零依赖**的交互式语音模型知识库，覆盖 ASR（自动语音识别）与 TTS（语音合成）方向 **56 个模型 / 系统**，并附带 **31 篇 2026 上半年论文**的本地全文与逐句 Insight 旁注。

## 内容

- `index.html` — 主交付物。直接在浏览器打开即可使用（哈希路由、内联 JS/CSS、无需服务器）。
  - **模型库**：56 个 ASR/TTS 模型卡片，含架构、定位、关键能力与局限。
  - **论文逐句解读**：31 篇论文的全文本地化 + Insight 旁注，可在线检索、定位原文段落。
- `ASR_TTS_2026H1_论文汇总.html` — 论文汇总视图（含 arXiv 链接、主题归类）。
- `papers/` — 31 篇论文 PDF 原文，通过 **Git LFS** 托管（首次克隆后需 `git lfs pull` 才能看到实际文件）。

## 本地运行

```bash
# 克隆（含 LFS 论文）
git clone https://github.com/zhitao-zeng/asr-tts-knowledge-base.git
cd asr-tts-knowledge-base
git lfs pull          # 拉取实际 PDF（首次克隆后建议执行）

# 直接打开
open index.html       # macOS
# 或任意浏览器打开 index.html
```

> 提示：仅 `git clone` 而不执行 `git lfs pull` 时，`papers/*.pdf` 会是 LFS 指针文件，论文内链将打不开。

## 数据说明

- 模型与论文信息均来自公开 arXiv 论文与官方发布，部分未开源模型的条目为「基于公开信息的推导注」，已在库内明确标注。
- 论文 PDF 受原作者版权保护，本仓库仅作个人研究备份，请遵守原许可、勿作商业使用（详见 `LICENSE` 末尾说明）。

## 版权与合规（公开仓库提示）

本仓库当前为 **public** 且通过 Git LFS 托管了 31 篇论文 PDF。这意味着论文原文
也随仓库**公开再分发**，存在被原作者/出版方要求下架的潜在风险。已采取的缓解：

- 在 `LICENSE` 与本文档明确声明 `papers/` 为第三方版权作品、仅作个人研究备份；
- `index.html` 的论文链接已加 **arXiv 摘要页兜底**——克隆后若未执行
  `git lfs pull` 导致本地 PDF 缺失，仍能通过在线链接阅读。

如需进一步降低风险，可选：① 将仓库转为 **private** 并保留 PDF；② 移除
`papers/` 的 LFS 托管、仅保留 arXiv 链接（仓库更小、无版权再分发）。

## 更新与版本

- 版本与变更记录见 `CHANGELOG.md`。
- 模型/论文的增补、insight 重写的复现流程见 `tools/README.md`；每次改动后跑
  `node tools/validate.js` 做质检门禁。

## 技术

单文件 HTML：哈希路由 + 内联 JS 渲染，无构建步骤、无外部依赖、可离线打开。
