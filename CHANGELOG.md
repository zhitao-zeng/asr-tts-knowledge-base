# CHANGELOG

本知识库为**滚动更新**的快照式个人研究库，不严格遵循 SemVer。版本号按
「内容里程碑」标记。每次发布前跑 `node tools/validate.js` 做回归校验。

---

## [2026-08-25] 优化与工程化

- **构建流水线入库**：新增 `tools/`（extract.py / build_excerpts.py /
  build_derived.py / validate.js / README.md），把「PDF 抽取 → 结构化摘要 →
  闭源派生锚点 → insight 重写 → 校验」固化下来，避免临时数据丢失导致重做。
- **质检门禁**：`tools/validate.js` 校验 56 模型全覆盖、每篇恰好 3 条、q 无
  `**`/无参考文献残留、闭源推导注带规定前缀；并接入 GitHub Actions CI。
- **index.html 增强**：
  - 论文链接 **arXiv 兜底**：克隆未 `git lfs pull` 时本地 PDF 缺失，自动提供在线链接。
  - **筛选增强**：模型库新增「开放状态（开源/闭源）」「论文（本地PDF/在线/无）」过滤。
  - **能力维度矩阵**新视图（`#/matrix`）：按流派/开放状态/论文字段 + 摘要关键词自动推导的
    粗粒度速览，精确能力标注待补 `caps` 字段。
- **闭源 benchmark 补强（可验证部分）**：为 `Fun-Realtime-TTS` 补入已核实的
  Artificial Analysis TTS Elo=1190（国产第一）；`Hy ASR 3.0`、`Fun-Realtime-ASR`
  的公开 WER 已在前版落表。其余闭源模型无公开统一数字，未编造。
- **合规**：新增 `LICENSE`（代码 MIT，papers/ 第三方版权声明）；`README` 补充
  公开仓版权风险与缓解说明；本 `CHANGELOG` 建立更新机制。

## [2026-08-24] 质量升级（insight 重写）

- 56 模型 insight 重写为**每篇精选 3 条**（核心创新 / 关键方法 / 主要局限）。
- 开源 33 模型 q 取自论文**真实原句**；闭源 23 模型写**推导注**（q 以
  「据公开信息/架构可知的推导论点：」开头，标注推断性质）。
- 修复 `voxtral_mini` 退化（q 误取参考文献），根因为双栏论文 References 漏切，
  已在 `tools/build_excerpts.py` 做大小写不敏感章节截断。
- 提交 `zhitao-zeng/asr-tts-knowledge-base`（public，Git LFS 托管 31 PDF）。

## [2026-08-19] 初始版本

- 56 模型卡片 + 31 篇 2026 H1 论文逐句 Insight 旁注，单文件 HTML。
- 框架谱系（9 条主线）、横评 Benchmark（按数据集）、论文汇总视图。

---

### 更新机制（如何增补模型/论文）

1. 把新论文 PDF 放进 `papers/`，在 `index.html` 的 `KB.models` 中加模型对象
   （含 `pdf_local` / `paper_url` / `has_arxiv` / `license` 等字段）。
2. 跑 `tools/extract.py` → `build_excerpts.py` → `build_derived.py` 生成重写输入。
3. 派发重写 agent（见 `tools/README.md`），产出 `INSIGHTS_PART_*` 并注入
   `index.html`，删除残留 `module.exports`。
4. `node tools/validate.js` 通过 → commit → push（CI 会再跑一遍）。
