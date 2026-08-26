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

## 3. 目录说明

```
tools/
├── validate.js          # 质检门禁（Node，无依赖，CI 调用）
├── extract.py           # PDF 全文抽取
├── build_excerpts.py    # 排除参考文献的结构化摘要
├── build_derived.py     # 闭源模型派生锚点
└── README.md            # 本文
```
