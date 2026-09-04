# tools/ — 知识库构建与质检流水线

本目录把"从论文 PDF 到高质量 insight"的构建流程固化下来，避免重蹈
**临时数据丢失 → 推倒重做**的覆辙。改了 `index.html` 里的 insight 后，
跑一遍 `validate.js` 即可挡住退化类回归。

---

## 1. 质检门禁（必跑，无依赖）

```bash
node tools/validate.js            # 校验仓库根目录的 index.html
node tools/validate.js path/x.html
```

校验项：

| 检查 | 含义 |
|------|------|
| 全覆盖 | `KB.models` 每个模型在 `INSIGHTS` 中都有条目 |
| 每篇 3 条 | 每个模型恰好 3 条 insight（核心创新 / 关键方法 / 主要局限） |
| 无空字段 | 每条的 `q` / `src` / `insight` 都非空 |
| q 无 `**` | 加粗标记应交给 `mdInline` 渲染，不应残留在 `q` 里 |
| q 非参考文献 | `q` 不得以 `arXiv:` / 数字序号 / `Reference` / `[` 开头（防止 voxtral_mini 式退化） |
| 闭源前缀合规 | `src` 含"推导/推测"的条目，`q` 必须以 `据公开信息/架构可知的推导论点：` 开头 |
| 无孤儿 key | `INSIGHTS` 不含 `KB.models` 之外的模型 |

退出码 `0` = 通过，`1` = 打印违规清单。CI（`.github/workflows/validate.yml`）即调用它。

---

## 2. 论文重建流水线（insight 大版本升级时用）

> 这套脚本产出 **agent 重写所需的输入工件**（`.cache/`），最终的"每篇 3 条
> insight"仍由 LLM 子代理基于这些工件撰写——这是需要判断力的步骤，无法纯脚本化。

### 2.1 依赖

```bash
pip install pypdf          # 仅 extract.py 需要
```

### 2.2 步骤

```bash
python3 tools/extract.py        # papers/*.pdf → .cache/full/<论文编号>.txt（全文）
python3 tools/build_excerpts.py # 排除 References，按模型产出 .cache/full_ex/<model_id>.txt
python3 tools/build_derived.py  # 闭源模型 DEEP 文本 → .cache/src_derived/<model_id>.txt
```

产物：

- `.cache/full/` —— 31 篇 PDF 全文（一个 PDF 一个文件，按 arXiv 编号命名）
- `.cache/full_ex/` —— 每模型一份**已排除参考文献**的正文摘要（重写 agent 阅读它）
- `.cache/src_derived/` —— 闭源模型的论据锚点（重写 agent 写"推导注"的唯一来源）

### 2.3 为什么排除参考文献（经验教训）

历史上 `voxtral_mini` 的 insight 退化：双栏论文按章节截取时误把
**References** 当成正文，导致 `q` 全是参考文献条目。修复点在
`build_excerpts.py` 的 `strip_references()`：**大小写不敏感**地检测行首的
`References / Bibliography` 章节边界并截断。任何全文重抽都必须保留这个修复。

### 2.4 重写 agent 派发约定

把 56 模型拆分为 7 组，分别产出 `INSIGHTS_PART_R1..R4`（论文模型，q 取论文
真实原句）与 `INSIGHTS_PART_S1..S3`（闭源模型，写推导注，q 带规定前缀），
每组约 8 个模型 × 3 条。每个 agent 必须用 Write 写**绝对路径**文件并跑
`node --check` 验证，避免并发派发导致文件未落盘。

合并时把 7 个 PART 文件拼接进 `index.html`，并替换 `Object.assign` 合并行：

```js
const INSIGHTS = Object.assign({},
  INSIGHTS_PART_R1, INSIGHTS_PART_R2, INSIGHTS_PART_R3, INSIGHTS_PART_R4,
  INSIGHTS_PART_S1, INSIGHTS_PART_S2, INSIGHTS_PART_S3);
```

**注意**：从 agent 文件合并后，务必删除任何 `module.exports` 行——浏览器环境
没有 `module`，残留会导致整页 JS 报错。最后跑 `node tools/validate.js`。

---

## 3. 论文全文双语精读流水线（papers-read/）

在「每篇 3 条 insight」之上的第二层交付：**全文原文 + 全文中文翻译 + 句子级锚定讲解**，
产出 `papers-read/<arxiv_id>/index.html` 静态阅读页（三种阅读模式、讲解密度/深度开关，
可 file:// 离线打开，SEO 可爬）。数据规范详见 `tools/PAPER_DATA_SPEC.md`。

```bash
# 1) PDF → 结构化正文（PyMuPDF；保留页码/标题层级/句子/图表标题/公式，稳定 ID）
python3 tools/extract_paper.py papers/<arxiv_id>.pdf
#    产物：.cache/papers/<id>.json（结构层）+ .cache/papers/<id>.txt（通读视图）

# 2) 翻译 agent 撰写片段（LLM 判断步骤，无法纯脚本化）：
#    .cache/papers/zh/<id>/meta.json            model_id + 标题译名
#    .cache/papers/zh/<id>/<sec_id>.json      每 section 的句子/标题翻译映射
#    .cache/papers/zh/<id>/annotations.json   15–25 条句子级讲解（锚定 sentence_id + quote）

# 3) 装配 + 质检（机械步骤，agent 不得手改 data/papers/*.js 的结构与原文）
node tools/compile_paper.js <arxiv_id>     # 片段 + 抽取层 → data/papers/<id>.js
node tools/validate_paper.js [id ...]      # 覆盖/锚点/quote/数字/引用/枚举/密度门禁

# 4) 生成静态阅读页
node tools/build_paper.js [id ...]         # → papers-read/<id>/index.html + 索引页
node tools/gen_seo.js                      # 同步 sitemap（含 papers-read/ 路径）
```

要点：

- **结构只信抽取层**：id / original / 顺序由 `extract_paper.py` 产出，agent 只填 `zh` 文本映射，
  从机制上杜绝重打原文导致的漂移。
- **豁免区**：`sec-references` / `sec-front` 不强制翻译；`equation` 不翻译；`table_body`
  （大附录数值表的 PDF 碎块）只写一句说明。
- **关联主站**：模型条目加 `reader_paper: "<arxiv_id>"` 字段后，模型详情页 / 逐句解读页
  自动出现「全文双语精读」入口，sitemap 自动收录。
- `validate_paper.js` 已接入 CI（`.github/workflows/validate.yml`）；CI 无 `.cache`，
  自动退化为数据自洽校验。
- **防重跑**：对已有 `data/papers/*.js` 成品的论文不要再跑 `extract_paper.py`
  （会改变 block/sentence 编号使结构校验失败）；确需重跑必须同步迁移 `.cache/papers/zh/<id>/` 片段的 key。

### 3.1 翻译 agent 派发模板（通用 prompt，把 `<ID>` 换成 arXiv 编号）

```text
你在 /mnt/disk1/zengzhitao/asr-tts-knowledge-base 仓库工作。任务：为论文 arXiv:<ID> 撰写「全文中文翻译 + 句子级讲解」数据，供双语精读静态页使用。只允许创建/修改 .cache/papers/zh/<ID>/ 下的文件，仓库其他文件一律不碰。

一、先读（按顺序）
1. tools/PAPER_DATA_SPEC.md —— 数据规范，必须严格遵守
2. tools/glossary.json —— 术语表
3. .cache/papers/<ID>.txt —— 抽取层全文，含全部 section/block/sentence id 与英文原文（大文件分段读完；若不存在先跑 python3 tools/extract_paper.py papers/<ID>.pdf）
4. 校准讲解语气，运行：
   node -e "require('/mnt/disk1/zengzhitao/asr-tts-knowledge-base/data/kb.js'); const map=require('/mnt/disk1/zengzhitao/asr-tts-knowledge-base/.cache/model_map.json'); const mid=map['<ID>'].model_id; console.log('model_id:', mid); console.log(JSON.stringify({deep:(globalThis.DEEP||{})[mid], insights:(globalThis.INSIGHTS||{})[mid]}, null, 1))"
   这是该模型已有的知识卡分析，讲解的深度、具体性和「敢质疑」的语气向它看齐；可呼应但不得照抄。
5. 质量范例（可选）：data/papers/2212.04356.js（已完成的 Whisper 精读数据）

二、产出（目录 .cache/papers/zh/<ID>/）
1. meta.json：{"model_id": "<从 .cache/model_map.json 查得>", "title_zh": "<论文标题的中文译名>"}
2. 每个非豁免 section 一个片段 <sec_id>.json：
   {"title_zh": "该节标题译名", "sentences": {"<sid>": "译文。", ...}, "blocks": {"<图表标题id>": "译文", "<table_body id>": "一句说明（可选）"}}
   - 豁免、不用写片段：sec-references、sec-front
   - key 必须与抽取层 id 完全一致，覆盖该 section 全部句子与全部 figure_caption/table_caption
3. annotations.json：15–25 条句子级讲解（schema 见 SPEC）

三、翻译要求
- 按段落通读后逐句意译；术语遵守 glossary（首次出现「中文（English）」，之后统一）
- 数字保留阿拉伯原形（"680,000 小时" 不要写成 "68 万小时"）；模型/数据集/指标名不译；[12]、Table 3、Figure 2 等引用编号必须原样保留
- 抽取残留（断词、连字 ﬁ/ﬂ、乱码、版权页脚行）按上下文自然译出或如实标注，不臆造原文没有的内容
- 中文通顺、不翻译腔，每句以中文标点结尾

四、讲解要求
- 15–25 条；选句覆盖方法/实验/局限多个 section，不要挤在 Introduction
- 每条 80–250 字，直接、具体、敢质疑
- kind 枚举：concept/motivation/comparison/number/engineering/critique/connection；featured 标 8–12 条；一句最多挂 1 条
- anchor.quote 必须从 .txt 抽取文本里复制粘贴（保留 ﬁ 等连字），不得手打；sentence_id 必须真实存在

五、表格语义标注（顺手做）
- 对每个「结果/评测/对比」类的 table_caption，在该 section 片段 JSON 里加 table_meta：
  {"tab-x": {"dataset": "<榜单id或俗名>", "metric": "CER|WER|SIM|F1|RTF...", "col": "<该指标的表头列名>", "rows": "models"}}
  （行=数据集、列=模型的横向表用 {"row": "<数据集行名>", "cols": "models"}）
- 消融/配置/超参表不标；不确定就不标（缺标退回关键词规则，标错更糟）

六、自检（必须全绿）
cd /mnt/disk1/zengzhitao/asr-tts-knowledge-base
node tools/compile_paper.js <ID> && node tools/validate_paper.js <ID>
报错就修（常见：漏句子、quote 不是子串、数字丢失、引用丢失），直到退出码 0。

七、最终回复只汇报
覆盖 section 数/句子总数、讲解条数与 kind 分布、validate 是否通过、存疑的点（若有）。
```

---

## 4. 目录说明

```
tools/
├── validate.js          # 质检门禁（Node，无依赖，CI 调用）
├── validate_paper.js    # 论文精读数据门禁（CI 调用）
├── compile_paper.js     # 翻译片段 → data/papers/<id>.js 装配器
├── build_paper.js       # data/papers/<id>.js → papers-read/ 静态阅读页
├── extract_paper.py     # PDF → 结构化 JSON（PyMuPDF，稳定 ID）
├── glossary.json        # ASR/TTS 术语表（翻译一致性）
├── PAPER_DATA_SPEC.md   # 精读数据规范（schema + 翻译/讲解规则）
├── extract.py           # PDF 全文抽取（insight 流水线用）
├── build_excerpts.py    # 排除参考文献的结构化摘要
├── build_derived.py     # 闭源模型派生锚点
├── gen_seo.js           # JSON-LD / models.html / sitemap / robots
├── split_data.js        # index.html ↔ data/kb.js 数据抽离
├── add_caps.js          # 能力矩阵 caps 字段
└── README.md            # 本文
```
