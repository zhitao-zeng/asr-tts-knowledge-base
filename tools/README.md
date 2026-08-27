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
