# 论文全文双语精读 · 数据规范（PAPER_DATA_SPEC）

每篇论文一个数据文件 `data/papers/<arxiv_id>.js`，是全文翻译层 + 句子讲解层的唯一事实来源。
生成阅读页：`node tools/build_paper.js`；质检门禁：`node tools/validate_paper.js`。

## 文件骨架

```js
// data/papers/2212.04356.js —— 全局变量名 = PAPER_ + arXiv 编号（点换下划线）
globalThis.PAPER_2212_04356 = {
  paper_id: "2212.04356",
  model_id: "whisper",              // 关联 data/kb.js 里 KB.models 的 id
  title: {
    original: "Robust Speech Recognition via Large-Scale Weak Supervision",
    zh: "基于大规模弱监督的鲁棒语音识别"
  },
  sections: [ ... ],
  annotations: [ ... ]
};
```

## sections[].blocks

`sections` 的顺序、block 的 `id`、`type`、`page`、句子的 `id` 和 `original` **全部来自**
`.cache/papers/<arxiv_id>.json`（由 `tools/extract_paper.py` 生成），**不得改写、增删、调序**。
翻译 agent 的工作只是给每个句子/块**填 `zh` 字段**，以及新写 `annotations` 数组。

```js
{
  id: "sec-3-8", num: "3.8", level: 2, page: 12,
  title: { original: "Long-form Transcription", zh: "长音频转录" },
  blocks: [
    // 段落：句子级翻译
    {
      id: "p-3-8-1", type: "paragraph", page: 12,
      sentences: [
        {
          id: "s-3-8-1-1",
          original: "Whisper models are trained on 30-second audio chunks ...",
          zh: "Whisper 模型在 30 秒音频片段上训练……"
        }
      ]
    },
    // 图/表标题：块级翻译
    { id: "fig-2-3-1", type: "figure_caption", page: 3, original: "Figure 1. ...", zh: "图 1. ……" },
    // 公式：不翻译（无 zh 字段）
    { id: "eq-2-2-1", type: "equation", page: 3, original: "WER = (S+D+I)/N  (1)" },
    // 表格主体（附录数值表碎块）：zh 可选，写一句说明即可
    { id: "tb-D-1-1", type: "table_body", page: 22, original: "...", zh: "原始性能数值表，数字与原文一致。" }
  ]
}
```

## 翻译层规则（接近 100% 覆盖）

1. **每个 `paragraph` 的每个 sentence 都必须有 `zh`**；`figure_caption` / `table_caption` 必须有 `zh`。
2. 例外（不需要 `zh`）：`equation`、`table_body`（可写一句说明性 `zh`）、
   `sec-references`（参考文献列表）与 `sec-front`（作者/单位）两个 section 的全部 block。
3. 模型名、数据集名、指标名（WER/CER）、公式、变量、引用编号 `[12]`、`Table 3`、`Figure 2` 保持原样。
4. 数字必须与原文逐一对应（门禁会校验）；**数字一律保留阿拉伯原形**（"680,000 hours" 译作
   "680,000 小时" 或 "680000 小时"，不要写成 "68 万小时"，否则数字门禁判丢失）。
5. 术语遵守 `tools/glossary.json`；首次出现可写「流匹配（flow matching）」，之后统一。
6. 按段落整体意译后切回句子，不要逐句孤立直译导致术语漂移；不擅自补充原文没有的结论。
7. 抽取残留（断词、个别乱码字符）可在 `zh` 里按上下文自然译出，但 `original` 字段保持不动。

## annotations（句子讲解层，稀疏）

每篇 15–25 条。只锚定真正值得讲的句子：新概念首现、核心架构选择、设计动机、
与上代方法区别、实验数字解读、消融含义、结论是否过头、工程代价、部署/训练启发。

```js
{
  id: "ann-001",
  anchor: {
    sentence_id: "s-3-8-1-1",                    // 必须真实存在
    quote: "trained on 30-second audio chunks"   // 必须是该句 original 的子串（逐字符）
  },
  kind: "engineering",        // 枚举：concept | motivation | comparison | number | engineering | critique | connection
  title: "为什么重要",          // 4–12 字，页面上显示为小标题
  explanation: "这里限制的是模型的原生上下文窗口，而不是产品层面能否处理长音频……（技术版，80–250 字）",
  explanation_plain: "可选：白话版，给快速阅读者。没有就省略该字段。",
  featured: true              // 可选。「精选」密度下只显示 featured=true 的；每篇建议 8–12 条
}
```

- 一个句子可以挂多条讲解（默认展示第一条，其余折叠）。
- `kind` 页面标签对照：concept→概念 / motivation→为什么这样设计 / comparison→和以前有什么区别 /
  number→数字怎么理解 / engineering→工程启发 / critique→值得质疑 / connection→延伸阅读。
- 讲解是编辑分析，不是原文内容；语气参考现有 `INSIGHTS`（直接、具体、敢说局限）。

## 质检门禁（validate_paper.js）

- 结构：block/sentence id 与 `.cache/papers/<id>.json` 完全一致（不多不少）
- 覆盖：规则 1–2
- 锚点：sentence_id 存在、quote 是原句子串
- 数字一致：original 中的数字 token 必须全部出现在 zh 中
- 引用保护：`[n]`、`Figure/Table n` 引用在 zh 中不丢失
- 枚举合法：kind/depth 字段取值
- 密度：15–25 条（允许 12–30，超出报错）
