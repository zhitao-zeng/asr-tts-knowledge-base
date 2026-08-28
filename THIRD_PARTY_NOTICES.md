# 第三方版权作品说明（THIRD_PARTY_NOTICES）

本仓库代码、HTML、文档等由作者创作的部分适用根目录 `LICENSE`（MIT）。
但 `papers/` 目录下的论文 PDF 属于**第三方学术出版物**，版权归各自原作者 / 出版方所有，**不在 MIT 许可范围内**。

## papers/ 目录（第三方版权作品）

- 这些 PDF 均来自 **arXiv 提交**。arXiv 默认仅取得作者的「非独占分发许可」，版权仍归原作者；
  各篇论文采用的具体许可（如 CC BY、CC0、CC BY-NC 或保留所有权利）**逐篇不同，不能一概而论**。
  本仓库通过 GitHub Pages 公开提供访问，仅作为研究与教育用途的**聚合入口 / 索引**，版权仍归原作者 / arXiv。
- 仅当某篇论文明确以 **CC BY / CC0 / 公共领域** 等可再分发许可发布时，方可依据该许可再分发；
  其余论文请通过 arXiv 官方链接获取原件，本仓库不主张再托管权。
- 逐篇许可证判定清单见 **`papers/licenses.json`**（由 `tools/gen_licenses.js` 生成）：
  - `redistribution_allowed === true`：明确可再分发（CC BY / CC0 / 公共领域 / MIT / Apache / BSD 等）。
  - `status === "verified"` 且不允许：已核实不可再分发，**本仓库已移除其本地 PDF**（例如 NIM4-ASR / arXiv 2604.18105，仅保留 `reader_paper` 双语精读入口与 arXiv 链接）。
  - `status === "review"`：许可未明确，待人工确认；默认**不作本地再托管**，请以 arXiv 原文为准。
- 使用、引用、转载请遵守原论文**各自的**许可协议与学术规范，并注明出处。
- 若原作者或出版方要求撤下，将配合立即移除。

## 合规要点

- 每个模型页面（`models/<id>/index.html` 与交互版 `index.html`）均保留 **arXiv 摘要页在线链接**，与本地 PDF 并列，便于溯源与原文核对。
- 如需进一步降低风险，可将仓库转为 **private**（PDF 仅自留），或移除 `papers/`、仅保留 arXiv 链接。
