# CHANGELOG

本知识库为**滚动更新**的快照式个人研究库，不严格遵循 SemVer。版本号按
「内容里程碑」标记。每次发布前跑 `node tools/validate.js` 做回归校验。

---

## [2026-08-27] 审查修复 · 正确性 / 许可证 / UX-SEO 三提交

- **Commit 1 correctness**：NIM4-ASR 纠错（机构=NIO/蔚来、600M 流式 Conformer + Qwen3-1.7B、六阶段训练、音素 RAG 热词、流式/多语 caps）；ASR 与 TTS 语种覆盖榜拆分（meta_omni / omnivoice / voxcpm2）；Cohere「从零监督训练」、Fish「4B Dual-AR + RVQ codec」谱系文案修正；全量人工复核 caps（wav2vec2 / HuBERT 多语回退 false 等）；Benchmark 加领域一致性校验。
- **Commit 2 license-and-build-gates**：新增 `tools/gen_licenses.js` 与 `papers/licenses.json`（33 条目：9 allowed / 1 verified-false(NIM4) / 23 review）；`validate.js` §8 许可证门禁（verified 且不允许即阻断，其余 warn）；移除无明确再分发许可的 NIM4 本地 PDF（保留 `reader_paper` 入口）；CI 加 SEO 产物重生成 + `git diff --exit-code` 门禁。
- **Commit 3 ux-and-seo**：修内部搜索框丢焦点（renderModels 重建输入，保存/恢复光标位置）；修 renderDeep 二次转义（`&` 不再双重编码为 `&amp;amp;`）；修 PDF 提示条件（「随仓库托管」仅当 `pdf_local` 存在时显示）；生成 56 个模型静态详情页 `models/<id>/index.html`（无需 JS + 每页 JSON-LD `TechArticle`）并纳入 sitemap；JSON-LD 由 `SoftwareApplication` 改为 `TechArticle`；统一 README / 汇总页 / 首页日期为「截至 2026-08」；`LICENSE` 保留纯 MIT，PDF 合规声明移至 `THIRD_PARTY_NOTICES.md`。

## [2026-08-27] 全文双语精读 · 全量 32 篇

- **精读覆盖扩至全部 32 篇本地论文**（在 3 篇原型基础上新增 29 篇）：wav2vec 2.0、
  HuBERT、VALL-E、Google USM、MMS、Voicebox、SeamlessM4T、Audiobox、NaturalSpeech 3、
  Seed-TTS、E2-TTS、Qwen2-Audio、Mini-Omni、MaskGCT、F5-TTS、MegaTTS 3、IndexTTS2、
  VibeVoice ASR、Voxtral TTS、LongCat-AudioDiT、OmniVoice、On-Device ASR、NIM4-ASR、
  StepAudio 2.5、WavTTS、VoxCPM2、ZONOS2、Qwen-Audio-3.0-TTS、Luna-TTS。
- 每篇 15–26 条句子级讲解（kind 七类，featured 8–12），翻译与讲解由外部模型按
  `tools/README.md` 3.1 节派发模板撰写，全部通过 `validate_paper.js` 门禁。
- **抽取器批量适配**：双栏重排、IEEEtran（罗马数字/斜体/small-caps 标题）、
  AAAI 无编号加粗标题、目录页跳过、首行缩进分段、NUL 清洗、自适应字号阈值。
- 翻译派发模板固化在 `tools/README.md` 3.1 节，arXiv 编号单参数即可派发新论文。

## [2026-08-26] 全文双语精读（Annotated Bilingual Paper Reader）

- **新产品层**：在「每篇 3 条 insight」之上增加**全文原文 + 全文中文翻译 + 句子级锚定讲解**，
  首批 3 篇原型：Whisper（2212.04356）、FireRedASR2S（2603.10420）、Fish Audio S2（2603.08823）。
- **静态阅读页** `papers-read/<arxiv_id>/`：中英对照 / 仅中文 / 仅原文三种模式，
  讲解密度（关闭/精选/全部）与深度（白话/技术）开关；讲解锚定到具体句子，
  桌面端右侧浮动面板、移动端段内展开；预渲染全文，SEO 可爬，file:// 可离线打开。
- **流水线**：`extract_paper.py`（PyMuPDF 结构化抽取，稳定 block/sentence ID、
  页眉页脚过滤、附录字母标题、表格碎块合并）→ 翻译片段（LLM agent）→
  `compile_paper.js`（机械装配，结构只信抽取层）→ `validate_paper.js`
  （覆盖/锚点/quote/数字/引用/枚举/密度门禁，已入 CI）→ `build_paper.js`（静态页）。
- **数据规范**：`tools/PAPER_DATA_SPEC.md` + `tools/glossary.json`（术语表）。
- **主站集成**：模型详情页与逐句解读页新增「全文双语精读」入口（`reader_paper` 字段驱动），
  导航与首页加入口，sitemap 收录 papers-read/ 路径。
- **论文 PDF**：补录 Fish Audio S2（2603.08823）原文 PDF 至 `papers/`。

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
