// 自动生成：2604.00688 全文双语精读数据（由 tools/compile_paper.js 装配）
// 结构/原文来自 .cache/papers/2604.00688.json（tools/extract_paper.py）；
// 翻译与讲解来自 .cache/papers/zh/2604.00688/（LLM agent 撰写）。
// 改翻译请改片段后重新装配；勿手改本文件的结构与 original 字段。
globalThis.PAPER_2604_00688 = {
 "paper_id": "2604.00688",
 "model_id": "omnivoice",
 "title": {
  "original": "OmniVoice: Towards Omnilingual Zero-Shot Text-to-Speech with Diffusion Language Models",
  "zh": "OmniVoice：用扩散语言模型实现覆盖全语种的零样本文本转语音"
 },
 "sections": [
  {
   "id": "sec-front",
   "num": null,
   "level": 1,
   "page": 1,
   "title": {
    "original": "Front Matter",
    "zh": "Front Matter"
   },
   "blocks": [
    {
     "id": "p-front-1",
     "type": "paragraph",
     "page": 1,
     "sentences": [
      {
       "id": "s-front-1-1",
       "original": "Han Zhu, Lingxuan Ye, Wei Kang, Zengwei Yao, Liyong Guo, Fangjun Kuang Zhifeng Han, Weiji Zhuang, Long Lin, Daniel Povey Xiaomi Corp., China {zhuhan3,dpovey}@xiaomi.com"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-abstract",
   "num": null,
   "level": 1,
   "page": 1,
   "title": {
    "original": "Abstract",
    "zh": "摘要"
   },
   "blocks": [
    {
     "id": "p-abstract-1",
     "type": "paragraph",
     "page": 1,
     "sentences": [
      {
       "id": "s-abstract-1-1",
       "original": "We present OmniVoice, a massively multilingual zero-shot text-to-speech (TTS) model that scales to over 600 languages.",
       "zh": "我们提出 OmniVoice，一个大规模多语种的零样本文本转语音（TTS）模型，语言覆盖规模超过 600 种。"
      },
      {
       "id": "s-abstract-1-2",
       "original": "At its core is a novel diffusion language model-style discrete non-autoregressive (NAR) architecture.",
       "zh": "其核心是一种新颖的扩散语言模型风格的离散非自回归（NAR）架构。"
      },
      {
       "id": "s-abstract-1-3",
       "original": "Unlike conventional discrete NAR models that suffer from performance bottlenecks in complex twostage (text-to-semantic-to-acoustic) pipelines, OmniVoice directly maps text to multi-codebook acoustic tokens.",
       "zh": "传统的离散 NAR 模型在复杂的两阶段（文本到语义再到声学）流水线中存在性能瓶颈，与之不同，OmniVoice 直接将文本映射到多码本声学 token。"
      },
      {
       "id": "s-abstract-1-4",
       "original": "This simplified approach is facilitated by two key technical innovations: (1) a full-codebook random masking strategy for efficient training, and (2) initialization from a pre-trained LLM to ensure superior intelligibility.",
       "zh": "这一简化的方案得益于两项关键技术创新：(1) 用于高效训练的全码本随机掩码策略；(2) 从预训练 LLM 初始化，以确保出色的可懂度。"
      },
      {
       "id": "s-abstract-1-5",
       "original": "By leveraging a 581k-hour multilingual dataset curated entirely from open-source data, OmniVoice achieves the broadest language coverage to date and delivers state-of-the-art performance across Chinese, English, and diverse multilingual benchmarks.",
       "zh": "凭借一个完全来自开源数据的 581k 小时多语数据集，OmniVoice 实现了迄今最广的语言覆盖，并在中文、英文以及多样化的多语种基准上取得了 SOTA 表现。"
      },
      {
       "id": "s-abstract-1-6",
       "original": "Our code and pre-trained models are publicly available1.",
       "zh": "我们的代码和预训练模型已公开 [1]。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-1",
   "num": "1",
   "level": 1,
   "page": 1,
   "title": {
    "original": "Introduction",
    "zh": "1 引言"
   },
   "blocks": [
    {
     "id": "p-1-1",
     "type": "paragraph",
     "page": 1,
     "sentences": [
      {
       "id": "s-1-1-1",
       "original": "Zero-shot text-to-speech (TTS) models trained on large-scale datasets have demonstrated a remarkable ability to generate high-quality speech conditioned on only a few seconds of reference audio [1, 2].",
       "zh": "在大规模数据集上训练的零样本文本转语音（TTS）模型，已展现出仅凭几秒钟参考音频即可生成高质量语音的出色能力 [1, 2]。"
      },
      {
       "id": "s-1-1-2",
       "original": "Despite these advances, most existing models support only a limited set of languages, often leaving hundreds of low-resource languages behind.",
       "zh": "尽管取得了这些进展，现有的大多数模型只支持有限的几种语言，往往把数百种低资源语言落在了后面。"
      },
      {
       "id": "s-1-1-3",
       "original": "Expanding language coverage is not merely a technical challenge but also a crucial step toward extending speech technologies to languages across the globe.",
       "zh": "扩大语言覆盖不仅是一个技术挑战，更是把语音技术推广到全球各种语言的关键一步。"
      },
      {
       "id": "s-1-1-4",
       "original": "To address this gap, we aim to develop a massively multilingual zero-shot TTS model supporting hundreds of languages.",
       "zh": "为弥补这一缺口，我们的目标是开发一个支持数百种语言的大规模多语种零样本 TTS 模型。"
      },
      {
       "id": "s-1-1-5",
       "original": "Realizing such extensive scaling requires a TTS architecture with exceptional capacity and robustness to handle diverse linguistic patterns.",
       "zh": "要实现如此大规模的扩展，需要一个具备出色容量与鲁棒性的 TTS 架构，以应对多样的语言模式。"
      }
     ]
    },
    {
     "id": "p-1-2",
     "type": "paragraph",
     "page": 1,
     "sentences": [
      {
       "id": "s-1-2-1",
       "original": "In the pursuit of such scalable and high-quality TTS, current research primarily adheres to two paradigms: autoregressive (AR) [3, 4, 5, 6, 7, 8, 9, 10, 11] and non-autoregressive (NAR) models [12, 13, 14].",
       "zh": "在追求这种可扩展、高质量 TTS 的过程中，当前研究主要遵循两种范式：自回归（AR）模型 [3, 4, 5, 6, 7, 8, 9, 10, 11] 与非自回归（NAR）模型 [12, 13, 14]。"
      },
      {
       "id": "s-1-2-2",
       "original": "NAR models offer advantages in both inference speed (via parallel decoding) and robustness (owing to bidirectional context) [12, 14, 15].",
       "zh": "NAR 模型在推理速度（通过并行解码）和鲁棒性（得益于双向上下文）两方面都有优势 [12, 14, 15]。"
      },
      {
       "id": "s-1-2-3",
       "original": "Within NAR frameworks, models can be broadly categorized into continuous-latent-based [14, 16, 17, 18] and discrete-token-based [19].",
       "zh": "在 NAR 框架内部，模型大体可以分为基于连续隐空间的 [14, 16, 17, 18] 和基于离散 token 的 [19] 两类。"
      },
      {
       "id": "s-1-2-4",
       "original": "The latter was shown to yield superior prosodic diversity [20].",
       "zh": "后者已被证明能带来更丰富的韵律多样性 [20]。"
      }
     ]
    },
    {
     "id": "p-1-3",
     "type": "paragraph",
     "page": 1,
     "sentences": [
      {
       "id": "s-1-3-1",
       "original": "However, state-of-the-art (SOTA) discrete-token NAR systems [19] typically rely on complex twostage cascaded pipelines (text-to-semantic followed by semantic-to-acoustic).",
       "zh": "然而，最先进的离散 token NAR 系统 [19] 通常依赖复杂的两阶段级联流水线（先文本到语义，再语义到声学）。"
      },
      {
       "id": "s-1-3-2",
       "original": "While such decoupling simplifies the training of individual modules, it also introduces significant drawbacks: (1) error propagation, where inaccuracies in semantic prediction degrade the final audio quality; and (2) information bottlenecks, where low-bitrate semantic representations sacrifice fine-grained acoustic details.",
       "zh": "这种解耦虽然简化了各模块的训练，但也带来了明显的缺陷：(1) 误差传播，语义预测的偏差会降低最终音频质量；(2) 信息瓶颈，低比特率的语义表示会牺牲细粒度的声学细节。"
      },
      {
       "id": "s-1-3-3",
       "original": "While single-stage alternatives [21] attempt to bypass these issues, they have historically lagged behind two-stage systems in terms of speech intelligibility.",
       "zh": "虽然单阶段方案 [21] 试图绕过这些问题，但历史上它们在语音可懂度上一直落后于两阶段系统。"
      }
     ]
    },
    {
     "id": "p-1-4",
     "type": "paragraph",
     "page": 1,
     "sentences": [
      {
       "id": "s-1-4-1",
       "original": "1https://github.com/k2-fsa/OmniVoice Preprint.",
       "zh": "[1] https://github.com/k2-fsa/OmniVoice 预印本。"
      },
      {
       "id": "s-1-4-2",
       "original": "Under review.",
       "zh": "审稿中。"
      }
     ]
    },
    {
     "id": "p-1-5",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-1-5-1",
       "original": "Text Tokens Acoustic Tokens Predicted Target Bidirectional Transformer Instruct Transcript Prompt Segment Target Masked Segment",
       "zh": "文本 token、声学 token、预测目标、双向 Transformer、指令、转写文本、提示段、目标掩码段。"
      }
     ]
    },
    {
     "id": "fig-1-1",
     "type": "figure_caption",
     "page": 2,
     "original": "Figure 1: Illustration of OmniVoice architecture.",
     "zh": "图 1：OmniVoice 架构示意图。"
    },
    {
     "id": "p-1-6",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-1-6-1",
       "original": "To bridge this gap, we introduce OmniVoice, an architecturally streamlined yet highly effective discrete NAR TTS framework.",
       "zh": "为弥合这一差距，我们提出 OmniVoice——一个架构精简但高度有效的离散 NAR TTS 框架。"
      },
      {
       "id": "s-1-6-2",
       "original": "OmniVoice employs a discrete masked diffusion objective [22] with a bidirectional Transformer [23] to directly map text to multi-codebook acoustic tokens, thereby bypassing the complexity and limitations of cascaded pipelines.",
       "zh": "OmniVoice 采用离散掩码扩散目标 [22]，配合双向 Transformer [23]，直接将文本映射到多码本声学 token，从而绕开级联流水线的复杂性与固有局限。"
      },
      {
       "id": "s-1-6-3",
       "original": "Its core modeling philosophy extends the success of diffusion language models [24, 25] to the speech domain.",
       "zh": "其建模理念的核心，是把扩散语言模型 [24, 25] 的成功经验延伸到语音领域。"
      },
      {
       "id": "s-1-6-4",
       "original": "We demonstrate that the potential of this minimalist architecture can be fully unleashed through two technical innovations: (1) Full-Codebook Random Masking: Conventional multi-codebook acoustic prediction methods adopt \"per-layer\" masking schedules [26, 19], suffering from inefficient convergence.",
       "zh": "我们证明，通过两项技术创新可以充分释放这种极简架构的潜力：(1) 全码本随机掩码：传统的多码本声学预测方法采用「逐层」掩码调度 [26, 19]，收敛效率低下。"
      },
      {
       "id": "s-1-6-5",
       "original": "We propose a fully stochastic masking strategy across all codebooks that significantly enhances training efficiency and generative quality.",
       "zh": "我们提出一种跨全部码本的完全随机掩码策略，显著提升了训练效率与生成质量。"
      },
      {
       "id": "s-1-6-6",
       "original": "(2) LLM Initialization: To resolve the intelligibility issues in single-stage discrete NAR models, we initialize our backbone with pre-trained AR LLM weights to inherit linguistic knowledge, making OmniVoice the first NAR TTS model to successfully benefit from LLM initialization [3].",
       "zh": "(2) LLM 初始化：为解决单阶段离散 NAR 模型的可懂度问题，我们用预训练 AR LLM 的权重初始化骨干网络以继承语言知识，使 OmniVoice 成为首个成功受益于 LLM 初始化的 NAR TTS 模型 [3]。"
      }
     ]
    },
    {
     "id": "p-1-7",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-1-7-1",
       "original": "The architectural advantage of OmniVoice makes it uniquely suited for scaling across diverse linguistic contexts.",
       "zh": "OmniVoice 的架构优势使其特别适合在多样的语言环境中规模化扩展。"
      },
      {
       "id": "s-1-7-2",
       "original": "We curated a 581k-hour multilingual dataset encompassing more than 600 languages, derived exclusively from open-source resources.",
       "zh": "我们构建了一个 581k 小时的多语数据集，覆盖超过 600 种语言，且完全来自开源资源。"
      },
      {
       "id": "s-1-7-3",
       "original": "Training on this dataset allows OmniVoice to achieve the most extensive language coverage reported to date, bridging the gap for hundreds of previously under-served low-resource languages.",
       "zh": "在该数据集上训练使 OmniVoice 取得了迄今报道过的最广语言覆盖，为数百种此前缺乏服务的低资源语言弥合了鸿沟。"
      }
     ]
    },
    {
     "id": "p-1-8",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-1-8-1",
       "original": "Beyond its extensive language coverage, OmniVoice supports multi-dimensional controllability, including prompt denoising [27, 28], speaker attribute-based voice design [29], and fine-grained paralinguistic and phonetic control [30, 31].",
       "zh": "除广泛的语言覆盖外，OmniVoice 还支持多维度的可控性，包括提示去噪 [27, 28]、基于说话人属性的声音设计 [29]，以及细粒度的副语言与语音学控制 [30, 31]。"
      },
      {
       "id": "s-1-8-2",
       "original": "These features significantly enhance its versatility, making OmniVoice well-suited for a wide range of real-world applications.",
       "zh": "这些特性显著增强了模型的通用性，使 OmniVoice 适用于广泛的实际应用场景。"
      }
     ]
    },
    {
     "id": "p-1-9",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-1-9-1",
       "original": "Comprehensive experimental evaluations across Chinese, English, and massively multilingual benchmarks (covering up to 102 languages) validate that OmniVoice delivers SOTA performance in intelligibility, speaker similarity and naturalness, setting a new frontier for high-quality, highcoverage multilingual TTS.",
       "zh": "在中文、英文以及大规模多语种基准（覆盖多达 102 种语言）上的综合实验评估表明，OmniVoice 在可懂度、说话人相似度和自然度上均达到 SOTA 表现，为高质量、高覆盖的多语种 TTS 树立了新的前沿。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-2",
   "num": "2",
   "level": 1,
   "page": 2,
   "title": {
    "original": "Proposed Method",
    "zh": "2 提出的方法"
   },
   "blocks": [
    {
     "id": "p-2-1",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-2-1-1",
       "original": "This section elaborates the design of OmniVoice.",
       "zh": "本节详细阐述 OmniVoice 的设计。"
      },
      {
       "id": "s-2-1-2",
       "original": "We first introduce the streamlined single-stage architecture that serves as the high-performance backbone for massively multilingual modeling, followed by two core technical optimizations to boost model training efficiency and speech intelligibility.",
       "zh": "我们首先介绍作为大规模多语种建模高性能骨干的精简单阶段架构，随后给出两项核心技术优化，以提升模型的训练效率与语音可懂度。"
      },
      {
       "id": "s-2-1-3",
       "original": "On this basis, we further present the large-scale multilingual data construction and balancing strategies to realize extensive language coverage, and finally equip the model with multi-dimensional controllability for practical deployment.",
       "zh": "在此基础上，我们进一步介绍大规模多语数据的构建与均衡策略，以实现广泛的语言覆盖，最后为模型配备多维度的可控性，便于实际部署。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-2-1",
   "num": "2.1",
   "level": 2,
   "page": 2,
   "title": {
    "original": "Architecture",
    "zh": "2.1 架构"
   },
   "blocks": [
    {
     "id": "p-2-1-1",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-2-1-1-1",
       "original": "OmniVoice is a single-stage NAR TTS model with a diffusion language model-style architecture [24, 25].",
       "zh": "OmniVoice 是一个单阶段 NAR TTS 模型，采用扩散语言模型风格的架构 [24, 25]。"
      },
      {
       "id": "s-2-1-1-2",
       "original": "Specifically, the model is trained with discrete diffusion objective and adopts a bidirectional Transformer backbone.",
       "zh": "具体而言，模型以离散扩散目标进行训练，并采用双向 Transformer 骨干。"
      },
      {
       "id": "s-2-1-1-3",
       "original": "OmniVoice directly maps text to multi-codebook acoustic tokens, (a) Per-layer masking (b) Full-codebook random masking",
       "zh": "OmniVoice 直接将文本映射到多码本声学 token，(a) 逐层掩码 (b) 全码本随机掩码。"
      }
     ]
    },
    {
     "id": "fig-2-1-1",
     "type": "figure_caption",
     "page": 3,
     "original": "Figure 2: Comparison of per-layer masking and full-codebook random masking. The x-axis denotes the time dimension, the y-axis the codebook dimension, and white blocks indicate masked tokens.",
     "zh": "图 2：逐层掩码与全码本随机掩码的对比。横轴为时间维度，纵轴为码本维度，白色方块表示被掩码的 token。"
    },
    {
     "id": "p-2-1-2",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-2-1-2-1",
       "original": "eliminating the error propagation and information bottlenecks issues in conventional two-stage cascaded pipelines.",
       "zh": "从而消除了传统两阶段级联流水线中的误差传播与信息瓶颈问题。"
      },
      {
       "id": "s-2-1-2-2",
       "original": "This end-to-end streamlined architecture lays the foundation for large-scale multilingual modeling, with targeted optimizations and scaling strategies detailed in the subsequent sections.",
       "zh": "这种端到端的精简架构为大规模多语种建模奠定了基础，后续章节将详细介绍针对性的优化与规模化策略。"
      }
     ]
    },
    {
     "id": "p-2-1-3",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-2-1-3-1",
       "original": "The architecture of OmniVoice is illustrated in Fig. 1.",
       "zh": "OmniVoice 的架构如图 1 所示。"
      },
      {
       "id": "s-2-1-3-2",
       "original": "The input of OmniVoice comprises:",
       "zh": "OmniVoice 的输入包括："
      }
     ]
    },
    {
     "id": "p-2-1-4",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-2-1-4-1",
       "original": "• Text token sequence (Y ): A concatenated sequence of instruct and transcript tokens, providing the linguistic and task-oriented guidance. • Acoustic token matrix (X): A multi-codebook matrix X ∈RT ×C, where T is the number of time steps and C is the number of codebooks.",
       "zh": "• 文本 token 序列（Y）：由指令 token 与转写文本 token 拼接而成，提供语言层面与任务层面的引导。• 声学 token 矩阵（X）：一个多码本矩阵 X ∈ R^{T×C}，其中 T 是时间步数，C 是码本数。"
      }
     ]
    },
    {
     "id": "p-2-1-5",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-2-1-5-1",
       "original": "The acoustic matrix X is partitioned along the temporal dimension into two segments: the prompt segment Xprompt, which contains the prefix acoustic context, and the target masked segment Xtarget, where tokens are randomly replaced with a special mask token [M].",
       "zh": "声学矩阵 X 沿时间维度被划分为两段：提示段 Xprompt（包含前缀声学上下文）与目标掩码段 Xtarget（其中的 token 被随机替换为特殊的掩码 token [M]）。"
      },
      {
       "id": "s-2-1-5-2",
       "original": "The model is designed to leverage the text conditions Y , the prompt Xprompt and unmasked tokens in Xtarget to recover the original tokens in the masked position in Xtarget.",
       "zh": "模型的设计目标是利用文本条件 Y、提示段 Xprompt 以及 Xtarget 中未被掩码的 token，恢复 Xtarget 中掩码位置的原始 token。"
      }
     ]
    },
    {
     "id": "p-2-1-6",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-2-1-6-1",
       "original": "The text tokens are embedded via a text embedding layer, and the acoustic tokens are embedded via codebook-specific embedding layers.",
       "zh": "文本 token 经由文本嵌入层进行嵌入，声学 token 则经由各码本专属的嵌入层进行嵌入。"
      },
      {
       "id": "s-2-1-6-2",
       "original": "The embeddings of all C codebooks at the same temporal position are summed to form a unified embedding, which is then fed into a bidirectional Transformer.",
       "zh": "同一时间位置上全部 C 个码本的嵌入被相加，形成统一嵌入，随后送入双向 Transformer。"
      },
      {
       "id": "s-2-1-6-3",
       "original": "On the output side, to reconstruct the multi-codebook tokens, OmniVoice employs C independent, codebook-specific prediction heads.",
       "zh": "在输出侧，为重建多码本 token，OmniVoice 采用 C 个相互独立、码本专属的预测头。"
      },
      {
       "id": "s-2-1-6-4",
       "original": "Each head projects the final hidden states to output a probability distribution over the vocabulary of its corresponding codebook.",
       "zh": "每个预测头将最终隐状态投影为对应码本词表上的概率分布。"
      }
     ]
    },
    {
     "id": "p-2-1-7",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-2-1-7-1",
       "original": "The training loss is computed on the masked acoustic token positions, aiming to optimize the model for accurate token recovery.",
       "zh": "训练损失在被掩码的声学 token 位置上计算，目标是优化模型准确恢复 token 的能力。"
      },
      {
       "id": "s-2-1-7-2",
       "original": "Let M denote the set of indices (t, c) corresponding to masked positions within the target segment, where t ∈{Tp + 1, . . . , T} and c ∈{1, . . . , C}.",
       "zh": "记 M 为目标段内被掩码位置的索引集合 (t, c)，其中 t ∈ {Tp + 1, . . . , T}，c ∈ {1, . . . , C}。"
      },
      {
       "id": "s-2-1-7-3",
       "original": "The training loss L is formulated as:",
       "zh": "训练损失 L 定义为："
      }
     ]
    },
    {
     "id": "eq-2-1-1",
     "type": "equation",
     "page": 3,
     "original": "L = − X"
    },
    {
     "id": "eq-2-1-2",
     "type": "equation",
     "page": 3,
     "original": "(t,c)∈M log P(xt,c | X, Y ; θ) (1)"
    },
    {
     "id": "p-2-1-8",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-2-1-8-1",
       "original": "where xt,c is the ground-truth acoustic token at time step t and codebook index c, and P(xt,c | . . . ; θ) is the probability distribution predicted by the model parameterized by θ.",
       "zh": "其中 xt,c 是时间步 t、码本索引 c 处的真实声学 token，P(xt,c | . . . ; θ) 是由参数 θ 化的模型所预测的概率分布。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-2-1-1",
   "num": "2.1.1",
   "level": 2,
   "page": 3,
   "title": {
    "original": "Full-Codebook Random Masking for Training Efficiency",
    "zh": "2.1.1 面向训练效率的全码本随机掩码"
   },
   "blocks": [
    {
     "id": "p-2-1-1-1",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-2-1-1-1-1",
       "original": "Masking design is critical for OmniVoice, as it directly determines the training pattern and loss function.",
       "zh": "掩码设计对 OmniVoice 至关重要，因为它直接决定了训练模式与损失函数。"
      },
      {
       "id": "s-2-1-1-1-2",
       "original": "Previous methods for multi-codebook acoustic token prediction typically employ a \"perlayer\" masking schedule [26, 19], which randomly masks within a single codebook layer c per sample and computes the loss exclusively for that layer.",
       "zh": "以往的多码本声学 token 预测方法通常采用「逐层」掩码调度 [26, 19]，即每个样本只在某一个码本层 c 内随机掩码，并且只对该层计算损失。"
      },
      {
       "id": "s-2-1-1-1-3",
       "original": "Tokens in layers above the selected layer are fully masked but excluded from loss computation.",
       "zh": "高于所选层的各层中的 token 虽然被全部掩码，但不参与损失计算。"
      },
      {
       "id": "s-2-1-1-1-4",
       "original": "Such masking strategy is designed to align with the layer-wise inference.",
       "zh": "这种掩码策略是为了与逐层推理方式对齐而设计的。"
      },
      {
       "id": "s-2-1-1-1-5",
       "original": "However, it optimizes only a sparse subset of the token matrix at each iteration, leading to suboptimal training efficiency.",
       "zh": "然而，它每次迭代只优化 token 矩阵的一个稀疏子集，导致训练效率欠佳。"
      }
     ]
    },
    {
     "id": "p-2-1-1-2",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-2-1-1-2-1",
       "original": "To circumvent this limitation, OmniVoice adopts a fully stochastic masking strategy across all codebook layers.",
       "zh": "为绕过这一限制，OmniVoice 在所有码本层上采用完全随机的掩码策略。"
      },
      {
       "id": "s-2-1-1-2-2",
       "original": "Specifically, we independently sample a binary mask mi,j ∼Bernoulli(pt) for every entry in the T × C token matrix, where the masking ratio pt is drawn from a uniform distribution pt ∼U(0, 1) for each training instance.",
       "zh": "具体地，我们为 T × C token 矩阵的每个元素独立采样二值掩码 m_{i,j} ∼ Bernoulli(p_t)，其中掩码率 p_t 对每个训练样本从均匀分布 p_t ∼ U(0, 1) 中抽取。"
      },
      {
       "id": "s-2-1-1-2-3",
       "original": "Consequently, on average, 50% of the tokens are used for 100K 10K Duration (Hours) 1K",
       "zh": "因此平均有 50% 的 token 被用于（图横轴：时长 Duration (Hours)，刻度 1K / 10K / 100K。）"
      }
     ]
    },
    {
     "id": "eq-2-1-1-1",
     "type": "equation",
     "page": 3,
     "original": "100 10 1 0.1"
    },
    {
     "id": "p-2-1-1-3",
     "type": "table_body",
     "page": 3,
     "original": "100K hours: 2 10K hours: 10 1K hours: 33 100 hours: 76 10 hours: 381 1 hours: 635",
     "cells": 18
    },
    {
     "id": "eq-2-1-1-2",
     "type": "equation",
     "page": 3,
     "original": "1 100 200 300 400 500 600 646"
    },
    {
     "id": "eq-2-1-1-3",
     "type": "equation",
     "page": 3,
     "original": "Language Rank"
    },
    {
     "id": "eq-2-1-1-4",
     "type": "equation",
     "page": 3,
     "original": "0.01"
    },
    {
     "id": "fig-2-1-1-1",
     "type": "figure_caption",
     "page": 4,
     "original": "Figure 3: Statistics of the multilingual training dataset.",
     "zh": "图 3：多语训练数据集的统计信息。"
    },
    {
     "id": "p-2-1-1-4",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-2-1-1-4-1",
       "original": "loss computation, C times more than per-layer masking strategy, significantly accelerating convergence and boosting generative quality.",
       "zh": "损失计算的 token 数约为逐层掩码策略的 C 倍，显著加速了收敛并提升了生成质量。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-2-1-2",
   "num": "2.1.2",
   "level": 2,
   "page": 4,
   "title": {
    "original": "LLM Initialization for Intelligibility",
    "zh": "2.1.2 面向可懂度的 LLM 初始化"
   },
   "blocks": [
    {
     "id": "p-2-1-2-1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-2-1-2-1-1",
       "original": "Existing discrete NAR TTS models [19, 21], particularly single-stage architectures [21], often exhibit suboptimal intelligibility compared to their counterparts.",
       "zh": "现有的离散 NAR TTS 模型 [19, 21]——尤其是单阶段架构 [21]——与其他类型的模型相比，往往表现出欠佳的可懂度。"
      },
      {
       "id": "s-2-1-2-1-2",
       "original": "To address this, we propose a simple yet effective strategy: initializing the model backbone with pre-trained AR large language models (LLMs) [32].",
       "zh": "为解决这一问题，我们提出一个简单却有效的策略：用预训练 AR 大语言模型（LLM）[32] 初始化模型骨干。"
      },
      {
       "id": "s-2-1-2-1-3",
       "original": "While LLM-based initialization has been successfully integrated into recent AR-TTS frameworks [3, 33], OmniVoice is the first NAR TTS model that successfully leverages LLM initialization to achieve notable intelligibility gains.",
       "zh": "虽然基于 LLM 的初始化已被成功引入近期的 AR-TTS 框架 [3, 33]，但 OmniVoice 是首个成功利用 LLM 初始化并获得显著可懂度提升的 NAR TTS 模型。"
      },
      {
       "id": "s-2-1-2-1-4",
       "original": "Our backbone is structurally identical to standard AR LLMs, facilitating direct weight transfer.",
       "zh": "我们的骨干在结构上与标准 AR LLM 完全一致，因此可以直接迁移权重。"
      },
      {
       "id": "s-2-1-2-1-5",
       "original": "While these LLMs are originally trained with a causal mask, we empirically find that their pre-trained knowledge translates well to our bidirectional architecture.",
       "zh": "尽管这些 LLM 最初是用因果掩码训练的，但我们凭经验发现，其预训练知识可以很好地迁移到我们的双向架构中。"
      },
      {
       "id": "s-2-1-2-1-6",
       "original": "This initialization allows OmniVoice to repurpose LLM’s linguistic capacity as a strong prior for text-to-speech mapping, significantly enhancing the intelligibility of the generated speech.",
       "zh": "这种初始化让 OmniVoice 能够把 LLM 的语言能力重新用作文本到语音映射的强先验，显著提升生成语音的可懂度。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-2-2",
   "num": "2.2",
   "level": 2,
   "page": 4,
   "title": {
    "original": "Multilingual Scaling",
    "zh": "2.2 多语种规模化"
   },
   "blocks": [
    {
     "id": "p-2-2-1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-2-2-1-1",
       "original": "A core objective of this work is to extend language support to over 600 languages, including hundreds of low-resource languages that are rarely supported in mainstream TTS systems.",
       "zh": "本工作的核心目标之一，是把语言支持扩展到 600 种以上，其中包括数百种主流 TTS 系统很少支持的低资源语言。"
      },
      {
       "id": "s-2-2-1-2",
       "original": "OmniVoice’s streamlined end-to-end architecture is inherently well-suited for such large-scale multilingual scaling.",
       "zh": "OmniVoice 精简的端到端架构天然适合这种大规模的多语种扩展。"
      }
     ]
    },
    {
     "id": "p-2-2-2",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-2-2-2-1",
       "original": "Expanding language coverage of TTS is a long-standing challenge [34, 35, 36, 37, 38].",
       "zh": "扩大 TTS 的语言覆盖是一个长期存在的挑战 [34, 35, 36, 37, 38]。"
      },
      {
       "id": "s-2-2-2-2",
       "original": "While MMS [39] scales to more than 1,000 languages, yet lacks zero-shot voice cloning capabilities and relies on language-specific modeling.",
       "zh": "MMS [39] 虽然扩展到超过 1,000 种语言，但不具备零样本声音克隆能力，且依赖特定于语言的建模。"
      },
      {
       "id": "s-2-2-2-3",
       "original": "Conversely, current multilingual zero-shot TTS models remain limited to narrow linguistic scopes, covering only a few dozen languages [40, 41, 36, 42, 33, 43, 38].",
       "zh": "反过来看，当前的多语零样本 TTS 模型仍局限于狭窄的语言范围，只覆盖几十种语言 [40, 41, 36, 42, 33, 43, 38]。"
      },
      {
       "id": "s-2-2-2-4",
       "original": "To bridge this gap, we introduce the first massively multilingual zero-shot TTS model capable of generalizing across hundreds of diverse languages within a single, unified model.",
       "zh": "为弥合这一差距，我们提出首个大规模多语种零样本 TTS 模型，能够在单一统一模型内泛化到数百种差异巨大的语言。"
      }
     ]
    },
    {
     "id": "p-2-2-3",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-2-2-3-1",
       "original": "Data acquisition remains one of the primary bottlenecks for large-scale multilingual expansion.",
       "zh": "数据获取仍是大规模多语种扩展的主要瓶颈之一。"
      },
      {
       "id": "s-2-2-3-2",
       "original": "To address this, we aggregated 50 datasets by leveraging open-source community efforts (see Appendix A for the complete list).",
       "zh": "为此，我们借助开源社区的成果，聚合了 50 个数据集（完整清单见附录 A）。"
      },
      {
       "id": "s-2-2-3-3",
       "original": "Given the heterogeneous quality of these sources (many of which were not originally designed for TTS and contain noisy audio or transcriptions), we employed a speech restoration model [44] to enhance degraded speech and applied rule-based filtering [17] to exclude invalid transcriptions.",
       "zh": "考虑到这些数据源质量参差不齐（许多并非为 TTS 设计，含有噪声音频或错误转写），我们使用语音修复模型 [44] 增强受损语音，并采用基于规则的过滤 [17] 剔除无效转写。"
      },
      {
       "id": "s-2-2-3-4",
       "original": "The resulting corpus comprises 581k hours of audio spanning more than 600 languages (detailed statistics in Fig. 3).",
       "zh": "最终得到的语料包含 581k 小时音频，覆盖超过 600 种语言（详细统计见图 3）。"
      },
      {
       "id": "s-2-2-3-5",
       "original": "Training on this unprecedented dataset empowers OmniVoice to achieve the broadest language coverage reported to date, significantly advancing the SOTA in multilingual TTS.",
       "zh": "在这个前所未有的数据集上训练，使 OmniVoice 取得了迄今报道过的最广语言覆盖，显著推进了多语种 TTS 的 SOTA。"
      }
     ]
    },
    {
     "id": "p-2-2-4",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-2-2-4-1",
       "original": "To mitigate the severe data imbalance inherent in massively multilingual datasets, where highresource languages vastly outnumber low-resource ones, we apply a language-level data resampling strategy.",
       "zh": "大规模多语数据集中固有的数据失衡问题十分严重——高资源语言的数据量远超低资源语言；为缓解这一点，我们采用语言级数据重采样策略。"
      },
      {
       "id": "s-2-2-4-2",
       "original": "Specifically, we upsample the training data of low-resource languages by assigning a repetition factor, ri, to each language i.",
       "zh": "具体而言，我们为每种语言 i 赋予一个重复因子 ri，对低资源语言的训练数据进行上采样。"
      },
      {
       "id": "s-2-2-4-3",
       "original": "Let Di denote the total audio duration for language i, and Dmax represent the maximum duration across all languages.",
       "zh": "记 Di 为语言 i 的总音频时长，Dmax 为所有语言中的最大时长。"
      },
      {
       "id": "s-2-2-4-4",
       "original": "The repetition factor is formulated as:",
       "zh": "重复因子定义为："
      }
     ]
    },
    {
     "id": "eq-2-2-1",
     "type": "equation",
     "page": 5,
     "original": "ri = max"
    },
    {
     "id": "p-2-2-5",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-2-2-5-1",
       "original": "1, round",
       "zh": "1，四舍五入（为公式 (2) 的抽取残留片段）。"
      }
     ]
    },
    {
     "id": "eq-2-2-2",
     "type": "equation",
     "page": 5,
     "original": "Dmax"
    },
    {
     "id": "eq-2-2-3",
     "type": "equation",
     "page": 5,
     "original": "1−β!!"
    },
    {
     "id": "eq-2-2-4",
     "type": "equation",
     "page": 5,
     "original": "(2)"
    },
    {
     "id": "eq-2-2-5",
     "type": "equation",
     "page": 5,
     "original": "Di"
    },
    {
     "id": "p-2-2-6",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-2-2-6-1",
       "original": "where β ∈[0, 1] is a hyperparameter controlling the degree of smoothing.",
       "zh": "其中 β ∈ [0, 1] 是控制平滑程度的超参数。"
      },
      {
       "id": "s-2-2-6-2",
       "original": "Setting β = 1.0 retains the natural long-tail distribution of the dataset, whereas β = 0.0 yields a uniform distribution across all languages.",
       "zh": "设 β = 1.0 时保留数据集天然的长尾分布，而 β = 0.0 则得到所有语言上的均匀分布。"
      },
      {
       "id": "s-2-2-6-3",
       "original": "In our implementation, we empirically set β = 0.8 to keep the performance of highresource languages while ensuring adequate model exposure to low-resource languages.",
       "zh": "在我们的实现中，经验性地取 β = 0.8，在保持高资源语言性能的同时，确保模型对低资源语言有充分的接触。"
      }
     ]
    },
    {
     "id": "p-2-2-7",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-2-2-7-1",
       "original": "For multilingual text processing, we employ the subword tokenizer of pre-trained LLMs, eliminating cumbersome grapheme-to-phoneme conversion and language-specific text normalization.",
       "zh": "在多语文本处理方面，我们直接采用预训练 LLM 的子词分词器，避免了繁琐的字位到音素转换和特定语言的文本规范化。"
      },
      {
       "id": "s-2-2-7-2",
       "original": "This strategy also allows the LLM backbone to inherit and leverage its pre-trained knowledge efficiently.",
       "zh": "这一策略也让 LLM 骨干能够高效地继承并利用其预训练知识。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-2-3",
   "num": "2.3",
   "level": 2,
   "page": 5,
   "title": {
    "original": "Multi-Dimensional Controllability",
    "zh": "2.3 多维度可控性"
   },
   "blocks": [
    {
     "id": "p-2-3-1",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-2-3-1-1",
       "original": "Beyond its extensive multilingual coverage, we further equip OmniVoice with multi-dimensional controllability across acoustic, identity, and linguistic aspects.",
       "zh": "除广泛的多语种覆盖外，我们还为 OmniVoice 配备了声学、身份与语言三个方面的多维度可控性。"
      },
      {
       "id": "s-2-3-1-2",
       "original": "This comprehensive control mechanism significantly improves the model’s practicality for complex, real-world applications.",
       "zh": "这套完整的控制机制显著提升了模型在复杂的真实应用场景中的实用性。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-2-3-1",
   "num": "2.3.1",
   "level": 2,
   "page": 5,
   "title": {
    "original": "Acoustic Control: Prompt Denoising",
    "zh": "2.3.1 声学控制：提示去噪"
   },
   "blocks": [
    {
     "id": "p-2-3-1-1",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-2-3-1-1-1",
       "original": "In practical scenarios, audio prompts are often recorded in non-ideal conditions, potentially compromised by environmental noise or reverberation.",
       "zh": "在实际场景中，音频提示往往在非理想条件下录制，可能受到环境噪声或混响的影响。"
      },
      {
       "id": "s-2-3-1-1-2",
       "original": "To prevent the model from replicating these unwanted artifacts, we implement a prompt denoising task [27, 28].",
       "zh": "为防止模型复现这些不想要的瑕疵，我们实现了提示去噪任务 [27, 28]。"
      },
      {
       "id": "s-2-3-1-1-3",
       "original": "During training, we augment a subset of the data by injecting synthetic noise and reverberation into the prompt segments.",
       "zh": "训练时，我们对部分数据进行增强，向提示段注入合成噪声与混响。"
      },
      {
       "id": "s-2-3-1-1-4",
       "original": "These samples are paired with a specific instruction token, <|denoise|>.",
       "zh": "这些样本与一个特定的指令 token <|denoise|> 配对。"
      },
      {
       "id": "s-2-3-1-1-5",
       "original": "This mechanism compels the model to disentangle the speaker’s intrinsic voice identity from the acoustic environment, enabling the synthesis of clean, high-fidelity speech even when conditioned on degraded prompts.",
       "zh": "这一机制迫使模型把说话人内在的音色身份与声学环境解耦，使得即使在退化的提示条件下，也能合成干净、高保真的语音。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-2-3-2",
   "num": "2.3.2",
   "level": 2,
   "page": 5,
   "title": {
    "original": "Identity Control: Speaker-Attribute-Based Voice Design",
    "zh": "2.3.2 身份控制：基于说话人属性的声音设计"
   },
   "blocks": [
    {
     "id": "p-2-3-2-1",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-2-3-2-1-1",
       "original": "To enable flexible TTS in the absence of an audio prompt, OmniVoice supports speaker-attributebased voice design [29, 42].",
       "zh": "为在没有音频提示的情况下也能灵活合成语音，OmniVoice 支持基于说话人属性的声音设计 [29, 42]。"
      },
      {
       "id": "s-2-3-2-1-2",
       "original": "By incorporating specific speaker attributes (e.g., gender, age, pitch, and accent/dialect) into the training instruction sequence, the model can synthesize highly customized voices on demand.",
       "zh": "通过把具体的说话人属性（如性别、年龄、音高以及口音/方言）纳入训练指令序列，模型可以按需合成高度定制化的声音。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-2-3-3",
   "num": "2.3.3",
   "level": 2,
   "page": 5,
   "title": {
    "original": "Linguistic Control: Paralinguistics and Phonetics",
    "zh": "2.3.3 语言控制：副语言与语音学"
   },
   "blocks": [
    {
     "id": "p-2-3-3-1",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-2-3-3-1-1",
       "original": "To bridge the gap between basic intelligibility and human-like expressiveness, we incorporate paralinguistic control (e.g., laughter) by training on datasets enriched with affective cues [30, 45].",
       "zh": "为弥合基础可懂度与类人表现力之间的差距，我们引入副语言控制（如笑声），通过在富含情感线索的数据集 [30, 45] 上训练来实现。"
      }
     ]
    },
    {
     "id": "p-2-3-3-2",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-2-3-3-2-1",
       "original": "Furthermore, recognizing that models may occasionally encounter challenges with the pronunciation of linguistic corner cases, such as Chinese polyphonic characters or specialized English terminology, we adopt a hybrid text input format [31] to provide users with explicit phonetic override capabilities.",
       "zh": "此外，考虑到模型偶尔会在一些语言学的边角案例上遇到发音困难——例如中文多音字或专业英文术语，我们采用混合文本输入格式 [31]，为用户提供显式的发音覆盖能力。"
      },
      {
       "id": "s-2-3-3-2-2",
       "original": "During training, we stochastically replace characters or words with their corresponding phonetic transcriptions, specifically Pinyin for Chinese and phonemes from the CMU pronunciation dictionary for English.",
       "zh": "训练时，我们随机地把字符或单词替换为对应的语音转写——中文用拼音，英文用 CMU 发音词典的音素。"
      },
      {
       "id": "s-2-3-3-2-3",
       "original": "This mechanism allows for deterministic control over pronunciation during inference, enabling the model to handle complex linguistic scenarios with high precision.",
       "zh": "该机制使得推理时可以确定性地控制发音，让模型能够以高精度处理复杂的语言场景。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-3",
   "num": "3",
   "level": 1,
   "page": 5,
   "title": {
    "original": "Experimental Setup",
    "zh": "3 实验设置"
   },
   "blocks": [
    {
     "id": "p-3-1",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-3-1-1",
       "original": "This section details the training datasets, model configurations, training and inference protocols, evaluation benchmarks, and evaluation metrics of our experiments.",
       "zh": "本节详细介绍实验所用的训练数据集、模型配置、训练与推理协议、评估基准以及评估指标。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-3-1",
   "num": "3.1",
   "level": 2,
   "page": 6,
   "title": {
    "original": "Training Datasets",
    "zh": "3.1 训练数据集"
   },
   "blocks": [
    {
     "id": "p-3-1-1",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-3-1-1-1",
       "original": "We train OmniVoice under two distinct data configurations.",
       "zh": "我们在两种不同的数据配置下训练 OmniVoice。"
      },
      {
       "id": "s-3-1-1-2",
       "original": "First, a bilingual variant is trained on the Chinese and English subsets of the Emilia dataset [46], enabling fair comparison with existing SOTA zero-shot TTS models trained on the same data.",
       "zh": "第一种是双语变体，在 Emilia 数据集 [46] 的中英文子集上训练，以便与在相同数据上训练的现有 SOTA 零样本 TTS 模型进行公平对比。"
      },
      {
       "id": "s-3-1-1-3",
       "original": "Prompt denoising is omitted in this variant to isolate its impact and highlight the inherent advantages of our architecture.",
       "zh": "该变体中不使用提示去噪，以隔离其影响、凸显我们架构的固有优势。"
      },
      {
       "id": "s-3-1-1-4",
       "original": "Second, a multilingual variant is trained on a self-built 581k-hour multilingual dataset spanning 600+ languages.",
       "zh": "第二种是多语变体，在自建的 581k 小时多语数据集上训练，覆盖 600+ 种语言。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-3-2",
   "num": "3.2",
   "level": 2,
   "page": 6,
   "title": {
    "original": "Model Details",
    "zh": "3.2 模型细节"
   },
   "blocks": [
    {
     "id": "p-3-2-1",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-3-2-1-1",
       "original": "OmniVoice is built on a bidirectional Transformer backbone, which is initialized with the pre-trained LLM weights of Qwen3-0.6B [32].",
       "zh": "OmniVoice 构建在双向 Transformer 骨干之上，以 Qwen3-0.6B [32] 的预训练 LLM 权重进行初始化。"
      },
      {
       "id": "s-3-2-1-2",
       "original": "The Higgs-audio tokenizer [47] is adopted to extract 8-codebook acoustic tokens and reconstruct audio from these tokens.",
       "zh": "我们采用 Higgs-audio 分词器 [47] 提取 8 码本声学 token，并由这些 token 重建音频。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-3-3",
   "num": "3.3",
   "level": 2,
   "page": 6,
   "title": {
    "original": "Training",
    "zh": "3.3 训练"
   },
   "blocks": [
    {
     "id": "p-3-3-1",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-3-3-1-1",
       "original": "The AdamW optimizer [48] is used, with a peak learning rate of 1e −4 and a cosine learning rate schedule that includes 3% of total training steps as warmup.",
       "zh": "优化器采用 AdamW [48]，峰值学习率为 1e-4，使用余弦学习率调度，其中总训练步数的 3% 用于预热。"
      },
      {
       "id": "s-3-3-1-2",
       "original": "Mixed precision (BF16) and sequence packing (8192 tokens per GPU) are employed during training to improve efficiency.",
       "zh": "训练中采用混合精度（BF16）与序列打包（每 GPU 8192 个 token）以提升效率。"
      },
      {
       "id": "s-3-3-1-3",
       "original": "Using 8 H800 GPUs, the multilingual variant (2M training updates) and the bilingual Emilia variant (300k training updates) were trained in 9.66 days and 1.33 days, respectively.",
       "zh": "使用 8 张 H800 GPU，多语变体（2M，即 200 万次训练更新）与双语 Emilia 变体（300k，即 30 万次训练更新）分别训练了 9.66 天和 1.33 天。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-3-4",
   "num": "3.4",
   "level": 2,
   "page": 6,
   "title": {
    "original": "Inference",
    "zh": "3.4 推理"
   },
   "blocks": [
    {
     "id": "p-3-4-1",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-3-4-1-1",
       "original": "During inference, we perform a 32-steps iterative unmasking process.",
       "zh": "推理时，我们执行 32 步的迭代式去掩码过程。"
      },
      {
       "id": "s-3-4-1-2",
       "original": "The cumulative proportion of unmasked tokens at step n, denoted as rn, follows a time-shifted schedule that was originally used in [16]:",
       "zh": "第 n 步已去掩码 token 的累计比例记为 rn，遵循 [16] 最初使用的时移调度："
      }
     ]
    },
    {
     "id": "eq-3-4-1",
     "type": "equation",
     "page": 6,
     "original": "rn = τ · (n/N) 1 + (τ −1) · (n/N) (3)"
    },
    {
     "id": "p-3-4-2",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-3-4-2-1",
       "original": "where N = 32 is the total number of steps, and τ = 0.1 is the shift parameter.",
       "zh": "其中 N = 32 为总步数，τ = 0.1 为位移参数。"
      },
      {
       "id": "s-3-4-2-2",
       "original": "The proportion of tokens to be newly unmasked at each step n is given by kn = rn −rn−1, where r0 = 0.",
       "zh": "第 n 步新去掩码 token 的比例为 kn = rn − rn−1，其中 r0 = 0。"
      }
     ]
    },
    {
     "id": "p-3-4-3",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-3-4-3-1",
       "original": "The selection of unmasking positions and token identities is handled as follows:",
       "zh": "去掩码位置的选择与 token 的取值按如下方式处理："
      }
     ]
    },
    {
     "id": "p-3-4-4",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-3-4-4-1",
       "original": "• Position Selection: At each step, we identify kn positions to be unmasked by sampling from the confidence scores in the log-softmax space.",
       "zh": "• 位置选择：每一步，我们从 log-softmax 空间中的置信度分数里采样，选出 kn 个待去掩码的位置。"
      },
      {
       "id": "s-3-4-4-2",
       "original": "To introduce beneficial stochasticity and avoid local optima, we apply a temperature T = 5 to the confidence scores before sampling the indices.",
       "zh": "为引入有益的随机性并避免局部最优，我们在采样位置索引前对置信度分数施加温度 T = 5。"
      }
     ]
    },
    {
     "id": "p-3-4-5",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-3-4-5-1",
       "original": "• Token Assignment: Once the positions are selected, the specific token class for each position is determined deterministically by taking the argmax of the predicted probability distribution.",
       "zh": "• token 赋值：位置选定后，每个位置的具体 token 类别通过对预测概率分布取 argmax 确定性地决定。"
      }
     ]
    },
    {
     "id": "p-3-4-6",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-3-4-6-1",
       "original": "We also apply a layer penalty on the confidence scores to encourage unmasking lower-layer tokens first.",
       "zh": "我们还在置信度分数上施加层惩罚，以鼓励先去掩码低层 token。"
      },
      {
       "id": "s-3-4-6-2",
       "original": "Furthermore, classifier-free guidance [49] is utilized in the log-softmax space with a guidance scale of 2.",
       "zh": "此外，我们在 log-softmax 空间中使用无分类器引导 [49]，引导强度为 2。"
      },
      {
       "id": "s-3-4-6-3",
       "original": "All aforementioned strategies are verified to effectively improve model performance and generation stability.",
       "zh": "上述所有策略均被验证能有效提升模型性能与生成稳定性。"
      }
     ]
    },
    {
     "id": "p-3-4-7",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-3-4-7-1",
       "original": "During inference, each character is assigned a script-dependent duration weight w(c) to reflect intrinsic duration differences across writing systems (e.g., CJK, Latin).",
       "zh": "推理时，每个字符被赋予一个依书写体系而异的时长权重 w(c)，以反映不同文字系统（如 CJK、拉丁字母）固有的时长差异。"
      },
      {
       "id": "s-3-4-7-2",
       "original": "Given the prompt audio duration Dprompt, the target duration Dtarget is estimated by scaling with the ratio of total character weights:",
       "zh": "给定提示音频时长 Dprompt，目标时长 Dtarget 通过字符总权重之比进行缩放估计："
      }
     ]
    },
    {
     "id": "eq-3-4-2",
     "type": "equation",
     "page": 6,
     "original": "Dtarget = Dprompt · Wtarget"
    },
    {
     "id": "eq-3-4-3",
     "type": "equation",
     "page": 6,
     "original": "Wprompt (4)"
    },
    {
     "id": "eq-3-4-4",
     "type": "equation",
     "page": 6,
     "original": "where Wtarget = P c∈Target w(c) and Wprompt = P c∈Prompt w(c)."
    }
   ]
  },
  {
   "id": "sec-3-4-1",
   "num": "3.4.1",
   "level": 2,
   "page": 6,
   "title": {
    "original": "Evaluation Benchmarks",
    "zh": "3.4.1 评估基准"
   },
   "blocks": [
    {
     "id": "p-3-4-1-1",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-3-4-1-1-1",
       "original": "We evaluate OmniVoice on four benchmarks covering standard Chinese/English settings and massively multilingual scenarios:",
       "zh": "我们在四个基准上评估 OmniVoice，覆盖标准的中英文场景与大规模多语种场景："
      }
     ]
    },
    {
     "id": "p-3-4-1-2",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-3-4-1-2-1",
       "original": "• LibriSpeech-PC [50, 14]: A standard English zero-shot TTS benchmark.",
       "zh": "• LibriSpeech-PC [50, 14]：标准的英文零样本 TTS 基准。"
      }
     ]
    },
    {
     "id": "p-3-4-1-3",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-3-4-1-3-1",
       "original": "• Seed-TTS [2]: A bilingual (Chinese/English) zero-shot benchmark.",
       "zh": "• Seed-TTS [2]：双语（中/英文）零样本基准。"
      }
     ]
    },
    {
     "id": "p-3-4-1-4",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-3-4-1-4-1",
       "original": "• MiniMax-Multilingual-24[51]: A multilingual benchmark covering 24 languages.",
       "zh": "• MiniMax-Multilingual-24 [51]：覆盖 24 种语言的多语基准。"
      }
     ]
    },
    {
     "id": "p-3-4-1-5",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-3-4-1-5-1",
       "original": "• FLEURS-Multilingual-102: A 102-language multilingual benchmark constructed from the dev/test splits of the FLEURS dataset [52] to further evaluate OmniVoice’s multilingual capability.",
       "zh": "• FLEURS-Multilingual-102：由 FLEURS 数据集 [52] 的 dev/test 划分构建的 102 语种多语基准，用于进一步评估 OmniVoice 的多语种能力。"
      },
      {
       "id": "s-3-4-1-5-2",
       "original": "It is the zero-shot TTS evaluation benchmark with the widest language coverage to date.",
       "zh": "它是迄今语言覆盖最广的零样本 TTS 评估基准。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-3-5",
   "num": "3.5",
   "level": 2,
   "page": 7,
   "title": {
    "original": "Evaluation Metrics",
    "zh": "3.5 评估指标"
   },
   "blocks": [
    {
     "id": "p-3-5-1",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-3-5-1-1",
       "original": "Our evaluation combines several objective and subjective metrics.",
       "zh": "我们的评估结合了多项客观与主观指标。"
      },
      {
       "id": "s-3-5-1-2",
       "original": "For speaker similarity evaluation, we use SIM-o [12] with a WavLM-based [53] ECAPA-TDNN model [54].",
       "zh": "说话人相似度评估采用 SIM-o [12]，使用基于 WavLM [53] 的 ECAPA-TDNN 模型 [54]。"
      },
      {
       "id": "s-3-5-1-3",
       "original": "Intelligibility is measured using word error rate (WER) or character error rate (CER) across different languages.",
       "zh": "可懂度按不同语言用词错误率（WER）或字错误率（CER）衡量。"
      },
      {
       "id": "s-3-5-1-4",
       "original": "For brevity and consistency, we refer to both WER and CER as WER for datasets using both metrics (SeedTTS and MiniMax-Multilingual-24), while evaluating each language with its appropriate metric.",
       "zh": "为简洁与一致起见，对同时使用两种指标的数据集（SeedTTS 与 MiniMax-Multilingual-24），我们把 WER 和 CER 统称为 WER，但对每种语言使用与其相适应的指标。"
      },
      {
       "id": "s-3-5-1-5",
       "original": "Specifically, we use the Hubert-based ASR model [55] for LibriSpeech-PC test-clean, Paraformerzh [56] for Chinese, the Omnilingual ASR model [57] for the FLEURS benchmark, and Whisperlarge-v3 [58] for the remaining datasets.",
       "zh": "具体而言，LibriSpeech-PC test-clean 使用基于 Hubert 的 ASR 模型 [55]，中文使用 Paraformer-zh [56]，FLEURS 基准使用 Omnilingual ASR 模型 [57]，其余数据集使用 Whisper large-v3 [58]。"
      },
      {
       "id": "s-3-5-1-6",
       "original": "We also adopt UTMOS [59] to assess objective speech naturalness.",
       "zh": "我们还采用 UTMOS [59] 评估客观的语音自然度。"
      }
     ]
    },
    {
     "id": "p-3-5-2",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-3-5-2-1",
       "original": "These objective metrics are supplemented with subjective evaluations, including comparative mean opinion score (CMOS, [−3, 3]) and similarity mean opinion score (SMOS, [0, 5]), which measure human opinions on relative speech quality and absolute speaker similarity to the prompt audio.",
       "zh": "这些客观指标之外，还辅以主观评估，包括比较平均意见分（CMOS，[−3, 3]）与相似度平均意见分（SMOS，[0, 5]），分别衡量人类对相对语音质量的评价，以及与提示音频的绝对说话人相似度。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-4",
   "num": "4",
   "level": 1,
   "page": 7,
   "title": {
    "original": "Experimental Results",
    "zh": "4 实验结果"
   },
   "blocks": []
  },
  {
   "id": "sec-4-1",
   "num": "4.1",
   "level": 2,
   "page": 7,
   "title": {
    "original": "Evaluation on English and Chinese",
    "zh": "4.1 英文与中文评估"
   },
   "blocks": [
    {
     "id": "tab-4-1-1",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "tab-4-1-1-s1",
       "original": "Table 1 and Table 2 summarize the Chinese and English performance of OmniVoice in comparison with SOTA AR/NAR TTS models.",
       "zh": "表 1 与表 2 汇总了 OmniVoice 与 SOTA AR/NAR TTS 模型在中文和英文上的性能对比。"
      }
     ]
    },
    {
     "id": "p-4-1-1",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-4-1-1-1",
       "original": "OmniVoice-Emilia surpasses all NAR baselines (F5-TTS [14], ZipVoice [16], MaskGCT [19]) trained on the same Emilia corpus, verifying the effectiveness of our proposed architecture.",
       "zh": "OmniVoice-Emilia 超越了所有同样在 Emilia 语料上训练的 NAR 基线（F5-TTS [14]、ZipVoice [16]、MaskGCT [19]），验证了我们所提架构的有效性。"
      }
     ]
    },
    {
     "id": "p-4-1-2",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-4-1-2-1",
       "original": "The final multilingual version OmniVoice model yields competitive overall performance across all benchmarks against baselines trained on unconstrained datasets (IndexTTS2 [5], CosyVoice3 [33], VoxCPM [10], Qwen3-TTS [42]), with particular advantages in speaker similarity and intelligibility.",
       "zh": "最终的多语版 OmniVoice 模型，与在无约束数据集上训练的基线（IndexTTS2 [5]、CosyVoice3 [33]、VoxCPM [10]、Qwen3-TTS [42]）相比，在所有基准上都取得了有竞争力的整体表现，并在说话人相似度与可懂度上具有明显优势。"
      },
      {
       "id": "s-4-1-2-2",
       "original": "This demonstrates OmniVoice’s strong capability on the two most high-resource languages.",
       "zh": "这展示了 OmniVoice 在两种资源最丰富语言上的强大能力。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-4-2",
   "num": "4.2",
   "level": 2,
   "page": 7,
   "title": {
    "original": "Evaluation on Multilingual Benchmarks",
    "zh": "4.2 多语基准评估"
   },
   "blocks": [
    {
     "id": "p-4-2-1",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-4-2-1-1",
       "original": "We validate OmniVoice’s multilingual capability on the 24-language MiniMax-Multilingual-24 benchmark and the 102-language FLEURS-Multilingual-102 benchmark.",
       "zh": "我们在 24 语种的 MiniMax-Multilingual-24 基准与 102 语种的 FLEURS-Multilingual-102 基准上验证 OmniVoice 的多语种能力。"
      }
     ]
    },
    {
     "id": "p-4-2-2",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-4-2-2-1",
       "original": "As shown in Table 3, despite being trained exclusively on open-source datasets, OmniVoice clearly outperforms leading commercial systems (ElevenLabs Multilingual v2 and MiniMax-Speech) in both average SIM-o and WER, demonstrating that OmniVoice achieves commercial-grade multilingual TTS performance.",
       "zh": "如表 3 所示，尽管完全在开源数据集上训练，OmniVoice 在平均 SIM-o 与 WER 两项上都明显优于领先的商业系统（ElevenLabs Multilingual v2 与 MiniMax-Speech），表明 OmniVoice 达到了商业级的多语 TTS 性能。"
      },
      {
       "id": "s-4-2-2-2",
       "original": "While Cantonese shows a higher WER in the table, our analysis reveals that this is due to limitations in the Whisper ASR model rather than the quality of the generated speech.",
       "zh": "虽然表中粤语的 WER 偏高，但我们的分析表明，这是 Whisper ASR 模型的局限所致，而非生成语音质量的问题。"
      },
      {
       "id": "s-4-2-2-3",
       "original": "When evaluated with the SenseVoice-Small ASR model [60], the WER for Cantonese decreases to 2.273%.",
       "zh": "改用 SenseVoice-Small ASR 模型 [60] 评估时，粤语的 WER 降至 2.273%。"
      },
      {
       "id": "s-4-2-2-4",
       "original": "However, to maintain consistency with the benchmarks in [51], we retain the Whisper-based results in our report.",
       "zh": "不过，为与 [51] 中的基准保持一致，我们在报告中仍保留基于 Whisper 的结果。"
      }
     ]
    },
    {
     "id": "p-4-2-3",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-4-2-3-1",
       "original": "Next, we evaluate OmniVoice on our self-built FLEURS-Multilingual-102 benchmark.",
       "zh": "接下来，我们在自建的 FLEURS-Multilingual-102 基准上评估 OmniVoice。"
      },
      {
       "id": "s-4-2-3-2",
       "original": "We report the average SIM-o, average CER, and the number of languages below specific CER thresholds in Table 4.",
       "zh": "我们在表 4 中报告平均 SIM-o、平均 CER，以及 CER 低于特定阈值的语言数量。"
      },
      {
       "id": "s-4-2-3-3",
       "original": "We observe that OmniVoice achieves an average CER of 4.00%, which is comparable to that of the ground truth.",
       "zh": "我们观察到 OmniVoice 的平均 CER 为 4.00%，与真实语音的水平相当。"
      },
      {
       "id": "s-4-2-3-4",
       "original": "Per-language CER results are provided in Appendix C.",
       "zh": "逐语言的 CER 结果见附录 C。"
      }
     ]
    },
    {
     "id": "p-4-2-4",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-4-2-4-1",
       "original": "To better understand OmniVoice’s performance, we plot a figure illustrating the relationship between per-language CER and training data duration in Fig. 4.",
       "zh": "为更好地理解 OmniVoice 的表现，我们在图 4 中绘制了逐语言 CER 与训练数据时长之间的关系。"
      },
      {
       "id": "s-4-2-4-2",
       "original": "It can be seen that OmniVoice maintains high",
       "zh": "可以看到，OmniVoice 保持了较高的（句意延续到后文）。"
      }
     ]
    },
    {
     "id": "tab-4-2-1",
     "type": "table_caption",
     "page": 8,
     "original": "Table 1: Objective evaluation results on Chinese and English test sets. Baseline results are obtained using official checkpoints. Params. (Parameters) denotes the total parameter size of voice cloning TTS systems (including audio tokenizer, vocoder, and other related components). Best results are highlighted in bold. Top: Results on LibriSpeech-PC. Bottom: Results on Seed-TTS test sets.",
     "zh": "表 1：中英文测试集上的客观评估结果。基线结果使用官方 checkpoint 获得。Params.（参数）表示声音克隆 TTS 系统的总参数规模（包括音频分词器、声码器及其他相关组件）。最优结果以粗体标出。上：LibriSpeech-PC 上的结果。下：Seed-TTS 测试集上的结果。"
    }
   ]
  },
  {
   "id": "sec-model",
   "num": null,
   "level": 2,
   "page": 8,
   "title": {
    "original": "Model",
    "zh": "Model"
   },
   "blocks": [
    {
     "id": "p-model-1",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-model-1-1",
       "original": "Params.",
       "zh": "参数量。"
      }
     ]
    },
    {
     "id": "p-model-2",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-model-2-1",
       "original": "Training Data (hours) LibriSpeech-PC test-clean SIM-o ↑ WER ↓ UTMOS ↑",
       "zh": "表头：训练数据（小时）× LibriSpeech-PC test-clean（SIM-o↑ / WER↓ / UTMOS↑）。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-ground-truth",
   "num": null,
   "level": 2,
   "page": 8,
   "title": {
    "original": "Ground-truth",
    "zh": "Ground-truth"
   },
   "blocks": [
    {
     "id": "eq-ground-truth-1",
     "type": "equation",
     "page": 8,
     "original": "- - 0.690 1.87 4.10"
    }
   ]
  },
  {
   "id": "sec-ar-models",
   "num": null,
   "level": 2,
   "page": 8,
   "title": {
    "original": "AR Models",
    "zh": "AR 模型"
   },
   "blocks": [
    {
     "id": "p-ar-models-1",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-ar-models-1-1",
       "original": "IndexTTS2 1.7B 55k Multi.",
       "zh": "（表格行）IndexTTS2 1.7B、55k 小时、Multi.。"
      }
     ]
    },
    {
     "id": "eq-ar-models-1",
     "type": "equation",
     "page": 8,
     "original": "0.700 2.35 4.06"
    },
    {
     "id": "p-ar-models-2",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-ar-models-2-1",
       "original": "CosyVoice3 1.1B 1000k Multi.",
       "zh": "（表格行）CosyVoice3 1.1B、1000k 小时、Multi.。"
      }
     ]
    },
    {
     "id": "eq-ar-models-2",
     "type": "equation",
     "page": 8,
     "original": "0.694 1.59 4.28"
    },
    {
     "id": "p-ar-models-3",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-ar-models-3-1",
       "original": "VoxCPM 0.7B 1800k Multi.",
       "zh": "（表格行）VoxCPM 0.7B、1800k 小时、Multi.。"
      }
     ]
    },
    {
     "id": "eq-ar-models-3",
     "type": "equation",
     "page": 8,
     "original": "0.717 1.74 4.18"
    },
    {
     "id": "p-ar-models-4",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-ar-models-4-1",
       "original": "Qwen3-TTS 1.1B 5000k Multi.",
       "zh": "（表格行）Qwen3-TTS 1.1B、5000k 小时、Multi.。"
      }
     ]
    },
    {
     "id": "eq-ar-models-4",
     "type": "equation",
     "page": 8,
     "original": "0.704 1.60"
    }
   ]
  },
  {
   "id": "sec-4-41",
   "num": "4.41",
   "level": 2,
   "page": 8,
   "title": {
    "original": "NAR Models",
    "zh": "3.46 NAR 模型"
   },
   "blocks": [
    {
     "id": "p-4-41-1",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-4-41-1-1",
       "original": "F5-TTS 0.4B 100K Emilia",
       "zh": "（表格行）F5-TTS 0.4B、100K 小时、Emilia。"
      }
     ]
    },
    {
     "id": "eq-4-41-1",
     "type": "equation",
     "page": 8,
     "original": "0.655 1.89 3.89"
    },
    {
     "id": "eq-4-41-2",
     "type": "equation",
     "page": 8,
     "original": "ZipVoice 0.1B 100k Emilia"
    },
    {
     "id": "eq-4-41-3",
     "type": "equation",
     "page": 8,
     "original": "0.668 1.64 3.98"
    },
    {
     "id": "eq-4-41-4",
     "type": "equation",
     "page": 8,
     "original": "MaskGCT 2.2B 100K Emilia"
    },
    {
     "id": "eq-4-41-5",
     "type": "equation",
     "page": 8,
     "original": "0.691 2.26 3.91"
    },
    {
     "id": "eq-4-41-6",
     "type": "equation",
     "page": 8,
     "original": "OmniVoice-Emilia 0.8B 100k Emilia"
    },
    {
     "id": "eq-4-41-7",
     "type": "equation",
     "page": 8,
     "original": "0.697 1.57 4.23"
    },
    {
     "id": "p-4-41-2",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-4-41-2-1",
       "original": "OmniVoice 0.8B 581k Multi.",
       "zh": "（表格行）OmniVoice 0.8B、581k 小时、Multi.。"
      }
     ]
    },
    {
     "id": "eq-4-41-8",
     "type": "equation",
     "page": 8,
     "original": "0.729 1.30 4.28"
    }
   ]
  },
  {
   "id": "sec-model-2",
   "num": null,
   "level": 2,
   "page": 8,
   "title": {
    "original": "Model",
    "zh": "Model"
   },
   "blocks": [
    {
     "id": "p-model-2-1",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-model-2-1-1",
       "original": "Seed-TTS test-en Seed-TTS test-zh SIM-o ↑ WER ↓ UTMOS ↑ SIM-o ↑ WER ↓ UTMOS ↑",
       "zh": "表头：Seed-TTS test-en（SIM-o↑ / WER↓ / UTMOS↑）× Seed-TTS test-zh（SIM-o↑ / WER↓ / UTMOS↑）。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-ground-truth-2",
   "num": null,
   "level": 2,
   "page": 8,
   "title": {
    "original": "Ground-truth",
    "zh": "Ground-truth"
   },
   "blocks": [
    {
     "id": "eq-ground-truth-2-1",
     "type": "equation",
     "page": 8,
     "original": "0.734 2.14 3.52 0.755 1.25 2.78"
    }
   ]
  },
  {
   "id": "sec-ar-models-2",
   "num": null,
   "level": 2,
   "page": 8,
   "title": {
    "original": "AR Models",
    "zh": "AR 模型"
   },
   "blocks": [
    {
     "id": "p-ar-models-2-1",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-ar-models-2-1-1",
       "original": "IndexTTS2",
       "zh": "最终的多语版 OmniVoice 模型，与在无约束数据集上训练的基线（IndexTTS2 [5]、CosyVoice3 [33]、VoxCPM [10]、Qwen3-TTS [42]）相比，在所有基准上都取得了有竞争力的整体表现，并在说话人相似度与可懂度上具有明显优势。"
      }
     ]
    },
    {
     "id": "eq-ar-models-2-1",
     "type": "equation",
     "page": 8,
     "original": "0.706 2.33 3.65 0.764 1.05 3.00"
    },
    {
     "id": "eq-ar-models-2-2",
     "type": "equation",
     "page": 8,
     "original": "CosyVoice3"
    },
    {
     "id": "eq-ar-models-2-3",
     "type": "equation",
     "page": 8,
     "original": "0.696 2.17 3.96 0.778 1.14 3.32"
    },
    {
     "id": "eq-ar-models-2-4",
     "type": "equation",
     "page": 8,
     "original": "VoxCPM"
    },
    {
     "id": "eq-ar-models-2-5",
     "type": "equation",
     "page": 8,
     "original": "0.731 1.92 3.77 0.772 0.99 2.94"
    },
    {
     "id": "eq-ar-models-2-6",
     "type": "equation",
     "page": 8,
     "original": "Qwen3-TTS"
    },
    {
     "id": "eq-ar-models-2-7",
     "type": "equation",
     "page": 8,
     "original": "0.708 1.54 4.16 0.766 1.15"
    }
   ]
  },
  {
   "id": "sec-3-46",
   "num": "3.46",
   "level": 2,
   "page": 8,
   "title": {
    "original": "NAR Models",
    "zh": "3.46 NAR 模型"
   },
   "blocks": [
    {
     "id": "p-3-46-1",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-3-46-1-1",
       "original": "F5-TTS",
       "zh": "OmniVoice-Emilia 超越了所有同样在 Emilia 语料上训练的 NAR 基线（F5-TTS [14]、ZipVoice [16]、MaskGCT [19]），验证了我们所提架构的有效性。"
      }
     ]
    },
    {
     "id": "eq-3-46-1",
     "type": "equation",
     "page": 8,
     "original": "0.664 1.85 3.72 0.750 1.53 2.93"
    },
    {
     "id": "eq-3-46-2",
     "type": "equation",
     "page": 8,
     "original": "ZipVoice"
    },
    {
     "id": "eq-3-46-3",
     "type": "equation",
     "page": 8,
     "original": "0.697 1.70 3.82 0.751 1.40 3.15"
    },
    {
     "id": "eq-3-46-4",
     "type": "equation",
     "page": 8,
     "original": "MaskGCT"
    },
    {
     "id": "eq-3-46-5",
     "type": "equation",
     "page": 8,
     "original": "0.713 2.88 3.55 0.773 2.40 2.63"
    },
    {
     "id": "eq-3-46-6",
     "type": "equation",
     "page": 8,
     "original": "OmniVoice-Emilia"
    },
    {
     "id": "eq-3-46-7",
     "type": "equation",
     "page": 8,
     "original": "0.717 1.72 3.88 0.765 0.89 3.05"
    },
    {
     "id": "eq-3-46-8",
     "type": "equation",
     "page": 8,
     "original": "OmniVoice"
    },
    {
     "id": "eq-3-46-9",
     "type": "equation",
     "page": 8,
     "original": "0.741 1.60 3.91 0.777 0.84 3.11"
    },
    {
     "id": "tab-3-46-1",
     "type": "table_caption",
     "page": 8,
     "original": "Table 2: Subjective evaluation results on Chinese and English test sets. CMOS and SMOS are used for evaluation. Best results are highlighted in bold.",
     "zh": "表 2：中英文测试集上的主观评估结果。采用 CMOS 与 SMOS 进行评估。最优结果以粗体标出。"
    }
   ]
  },
  {
   "id": "sec-model-3",
   "num": null,
   "level": 2,
   "page": 8,
   "title": {
    "original": "Model",
    "zh": "Model"
   },
   "blocks": [
    {
     "id": "p-model-3-1",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-model-3-1-1",
       "original": "CMOS ↑ SMOS ↑ Ground-truth",
       "zh": "（表格：CMOS↑/SMOS↑——Ground-truth 0.00/3.02±0.20；Qwen3-TTS 0.40±0.16/3.65±0.18；ZipVoice -0.30±0.16/3.35±0.19；MaskGCT -0.38±0.17/3.20±0.18；OmniVoice-Emilia 0.42±0.15/3.58±0.18；OmniVoice 0.44±0.16/3.80±0.17。）即使许多语言训练数据不足 10 小时，仍保持高可懂度（CER < 5%），展现了对低资源语言的强泛化能力。"
      }
     ]
    },
    {
     "id": "eq-model-3-1",
     "type": "equation",
     "page": 8,
     "original": "0.00 3.02±0.20"
    },
    {
     "id": "eq-model-3-2",
     "type": "equation",
     "page": 8,
     "original": "Qwen3-TTS"
    },
    {
     "id": "eq-model-3-3",
     "type": "equation",
     "page": 8,
     "original": "0.40± 0.16 3.65 ± 0.18"
    },
    {
     "id": "eq-model-3-4",
     "type": "equation",
     "page": 8,
     "original": "ZipVoice"
    },
    {
     "id": "eq-model-3-5",
     "type": "equation",
     "page": 8,
     "original": "-0.30± 0.16 3.35± 0.19"
    },
    {
     "id": "eq-model-3-6",
     "type": "equation",
     "page": 8,
     "original": "MaskGCT"
    },
    {
     "id": "eq-model-3-7",
     "type": "equation",
     "page": 8,
     "original": "-0.38± 0.17 3.20± 0.18"
    },
    {
     "id": "eq-model-3-8",
     "type": "equation",
     "page": 8,
     "original": "OmniVoice-Emilia"
    },
    {
     "id": "eq-model-3-9",
     "type": "equation",
     "page": 8,
     "original": "0.42± 0.15 3.58± 0.18"
    },
    {
     "id": "eq-model-3-10",
     "type": "equation",
     "page": 8,
     "original": "OmniVoice"
    },
    {
     "id": "eq-model-3-11",
     "type": "equation",
     "page": 8,
     "original": "0.44± 0.16 3.80± 0.17"
    },
    {
     "id": "p-model-3-2",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-model-3-2-1",
       "original": "intelligibility (CER < 5%) even for many languages with less than 10 hours of training data, demonstrating strong generalization capability on low-resource languages.",
       "zh": "（表格：CMOS↑/SMOS↑——Ground-truth 0.00/3.02±0.20；Qwen3-TTS 0.40±0.16/3.65±0.18；ZipVoice -0.30±0.16/3.35±0.19；MaskGCT -0.38±0.17/3.20±0.18；OmniVoice-Emilia 0.42±0.15/3.58±0.18；OmniVoice 0.44±0.16/3.80±0.17。）即使许多语言训练数据不足 10 小时，仍保持高可懂度（CER < 5%），展现了对低资源语言的强泛化能力。"
      },
      {
       "id": "s-model-3-2-2",
       "original": "Note that we do not claim OmniVoice can generate speech of better quality than the ground truth for all languages.",
       "zh": "需要说明的是，我们并不声称 OmniVoice 在所有语言上都能生成比真实语音质量更好的语音。"
      },
      {
       "id": "s-model-3-2-3",
       "original": "However, OmniVoice’s performance has exceeded the measurement capability of existing ASR models.",
       "zh": "然而，OmniVoice 的表现已经超出现有 ASR 模型的测量能力。"
      }
     ]
    },
    {
     "id": "tab-model-3-1",
     "type": "table_caption",
     "page": 9,
     "original": "Table 3: Evaluation on the MiniMax-Multilingual-24 test set.",
     "zh": "表 3：MiniMax-Multilingual-24 测试集上的评估结果。"
    },
    {
     "id": "p-model-3-3",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-model-3-3-1",
       "original": "Language WER ↓ SIM-o ↑ OmniVoice MiniMax ElevenLabs OmniVoice MiniMax ElevenLabs Arabic",
       "zh": "表头：Language × WER ↓ / SIM-o ↑（OmniVoice / MiniMax / ElevenLabs 两组）——Arabic（后续照原文）。"
      }
     ]
    },
    {
     "id": "eq-model-3-12",
     "type": "equation",
     "page": 9,
     "original": "1.392 1.665 1.666 0.776 0.736 0.706"
    },
    {
     "id": "eq-model-3-13",
     "type": "equation",
     "page": 9,
     "original": "Cantonese"
    },
    {
     "id": "eq-model-3-14",
     "type": "equation",
     "page": 9,
     "original": "17.709* 34.111 51.513 0.838 0.778 0.670"
    },
    {
     "id": "eq-model-3-15",
     "type": "equation",
     "page": 9,
     "original": "Chinese"
    },
    {
     "id": "eq-model-3-16",
     "type": "equation",
     "page": 9,
     "original": "1.008 2.252 16.026 0.821 0.780 0.677"
    },
    {
     "id": "eq-model-3-17",
     "type": "equation",
     "page": 9,
     "original": "Czech"
    },
    {
     "id": "eq-model-3-18",
     "type": "equation",
     "page": 9,
     "original": "2.856 3.875 2.108 0.837 0.796 0.685"
    },
    {
     "id": "eq-model-3-19",
     "type": "equation",
     "page": 9,
     "original": "Dutch"
    },
    {
     "id": "eq-model-3-20",
     "type": "equation",
     "page": 9,
     "original": "1.358 1.143 0.803 0.813 0.738 0.680"
    },
    {
     "id": "eq-model-3-21",
     "type": "equation",
     "page": 9,
     "original": "English"
    },
    {
     "id": "eq-model-3-22",
     "type": "equation",
     "page": 9,
     "original": "1.560 2.164 2.339 0.884 0.756 0.613"
    },
    {
     "id": "eq-model-3-23",
     "type": "equation",
     "page": 9,
     "original": "Finnish"
    },
    {
     "id": "eq-model-3-24",
     "type": "equation",
     "page": 9,
     "original": "3.750 4.666 2.964 0.864 0.835 0.759"
    },
    {
     "id": "eq-model-3-25",
     "type": "equation",
     "page": 9,
     "original": "French"
    },
    {
     "id": "eq-model-3-26",
     "type": "equation",
     "page": 9,
     "original": "3.347 4.099 5.216 0.801 0.628 0.535"
    },
    {
     "id": "eq-model-3-27",
     "type": "equation",
     "page": 9,
     "original": "German"
    },
    {
     "id": "eq-model-3-28",
     "type": "equation",
     "page": 9,
     "original": "0.964 1.906 0.572 0.812 0.733 0.614"
    },
    {
     "id": "eq-model-3-29",
     "type": "equation",
     "page": 9,
     "original": "Greek"
    },
    {
     "id": "eq-model-3-30",
     "type": "equation",
     "page": 9,
     "original": "1.057 2.016 0.991 0.867 0.826 0.733"
    },
    {
     "id": "eq-model-3-31",
     "type": "equation",
     "page": 9,
     "original": "Hindi"
    },
    {
     "id": "eq-model-3-32",
     "type": "equation",
     "page": 9,
     "original": "4.330 6.962 5.827 0.863 0.818 0.730"
    },
    {
     "id": "eq-model-3-33",
     "type": "equation",
     "page": 9,
     "original": "Indonesian"
    },
    {
     "id": "eq-model-3-34",
     "type": "equation",
     "page": 9,
     "original": "1.973 1.237 1.059 0.805 0.729 0.660"
    },
    {
     "id": "eq-model-3-35",
     "type": "equation",
     "page": 9,
     "original": "Italian"
    },
    {
     "id": "eq-model-3-36",
     "type": "equation",
     "page": 9,
     "original": "2.070 1.543 1.743 0.812 0.699 0.579"
    },
    {
     "id": "eq-model-3-37",
     "type": "equation",
     "page": 9,
     "original": "Japanese"
    },
    {
     "id": "eq-model-3-38",
     "type": "equation",
     "page": 9,
     "original": "4.027 3.519 10.646 0.828 0.776 0.738"
    },
    {
     "id": "eq-model-3-39",
     "type": "equation",
     "page": 9,
     "original": "Korean"
    },
    {
     "id": "eq-model-3-40",
     "type": "equation",
     "page": 9,
     "original": "2.651 1.747 1.865 0.828 0.776 0.700"
    },
    {
     "id": "eq-model-3-41",
     "type": "equation",
     "page": 9,
     "original": "Polish"
    },
    {
     "id": "eq-model-3-42",
     "type": "equation",
     "page": 9,
     "original": "0.874 1.415 0.766 0.877 0.802 0.729"
    },
    {
     "id": "eq-model-3-43",
     "type": "equation",
     "page": 9,
     "original": "Portuguese"
    },
    {
     "id": "eq-model-3-44",
     "type": "equation",
     "page": 9,
     "original": "2.511 1.877 1.331 0.859 0.805 0.711"
    },
    {
     "id": "eq-model-3-45",
     "type": "equation",
     "page": 9,
     "original": "Romanian"
    },
    {
     "id": "eq-model-3-46",
     "type": "equation",
     "page": 9,
     "original": "2.424 2.878 1.347 0.836 0.809 0.699"
    },
    {
     "id": "eq-model-3-47",
     "type": "equation",
     "page": 9,
     "original": "Russian"
    },
    {
     "id": "eq-model-3-48",
     "type": "equation",
     "page": 9,
     "original": "2.233 4.281 3.878 0.783 0.761 0.676"
    },
    {
     "id": "eq-model-3-49",
     "type": "equation",
     "page": 9,
     "original": "Spanish"
    },
    {
     "id": "eq-model-3-50",
     "type": "equation",
     "page": 9,
     "original": "1.026 1.029 1.084 0.804 0.762 0.615"
    },
    {
     "id": "eq-model-3-51",
     "type": "equation",
     "page": 9,
     "original": "Thai"
    },
    {
     "id": "eq-model-3-52",
     "type": "equation",
     "page": 9,
     "original": "3.978 2.701 73.936 0.841 0.800 0.588"
    },
    {
     "id": "eq-model-3-53",
     "type": "equation",
     "page": 9,
     "original": "Turkish"
    },
    {
     "id": "eq-model-3-54",
     "type": "equation",
     "page": 9,
     "original": "2.166 1.520 0.699 0.851 0.779 0.596"
    },
    {
     "id": "eq-model-3-55",
     "type": "equation",
     "page": 9,
     "original": "Ukrainian"
    },
    {
     "id": "eq-model-3-56",
     "type": "equation",
     "page": 9,
     "original": "1.774 1.082 0.997 0.810 0.730 0.647"
    },
    {
     "id": "eq-model-3-57",
     "type": "equation",
     "page": 9,
     "original": "Vietnamese"
    },
    {
     "id": "eq-model-3-58",
     "type": "equation",
     "page": 9,
     "original": "1.373 0.880 73.415 0.804 0.743 0.369"
    }
   ]
  },
  {
   "id": "sec-average",
   "num": null,
   "level": 2,
   "page": 9,
   "title": {
    "original": "Average",
    "zh": "平均值"
   },
   "blocks": [
    {
     "id": "eq-average-1",
     "type": "equation",
     "page": 9,
     "original": "2.850 3.774 10.950 0.830 0.766 0.655"
    },
    {
     "id": "p-average-1",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-average-1-1",
       "original": "* Cantonese WER is 2.273% when evaluated with the SenseVoice-Small ASR model. ur",
       "zh": "（表注：* 粤语（Cantonese）用 SenseVoice-Small ASR 模型评测时 WER 为 2.273%。）（表格行）ur。"
      }
     ]
    },
    {
     "id": "eq-average-2",
     "type": "equation",
     "page": 9,
     "original": "80 40"
    },
    {
     "id": "eq-average-3",
     "type": "equation",
     "page": 9,
     "original": "lo ur yo lo"
    },
    {
     "id": "eq-average-4",
     "type": "equation",
     "page": 9,
     "original": "20"
    },
    {
     "id": "p-average-2",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-average-2-1",
       "original": "yo oc Ground-Truth OmniVoice (CER higher than GT) OmniVoice (CER lower than GT) yue yue ja ny zh ja ny zh CER (%)",
       "zh": "（图例：Ground-Truth / OmniVoice (CER higher than GT) / OmniVoice (CER lower than GT)；语种：yue / ja / ny / zh；纵轴 CER (%)；yo / oc。）"
      }
     ]
    },
    {
     "id": "eq-average-5",
     "type": "equation",
     "page": 9,
     "original": "10"
    },
    {
     "id": "eq-average-6",
     "type": "equation",
     "page": 9,
     "original": "oc"
    },
    {
     "id": "eq-average-7",
     "type": "equation",
     "page": 9,
     "original": "5"
    },
    {
     "id": "eq-average-8",
     "type": "equation",
     "page": 9,
     "original": "af fr hi hu hi af"
    },
    {
     "id": "eq-average-9",
     "type": "equation",
     "page": 9,
     "original": "2"
    },
    {
     "id": "eq-average-10",
     "type": "equation",
     "page": 9,
     "original": "hu"
    },
    {
     "id": "eq-average-11",
     "type": "equation",
     "page": 9,
     "original": "1"
    },
    {
     "id": "p-average-3",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-average-3-1",
       "original": "en sl en fr sl pl ca es et et ca es pl",
       "zh": "（图内语种标签：en / sl / en / fr / sl / pl / ca / es / et / et / ca / es / pl。）"
      }
     ]
    },
    {
     "id": "eq-average-12",
     "type": "equation",
     "page": 9,
     "original": "2 10 100"
    },
    {
     "id": "eq-average-13",
     "type": "equation",
     "page": 9,
     "original": "1K 10K 100K Duration (Hours)"
    },
    {
     "id": "eq-average-14",
     "type": "equation",
     "page": 9,
     "original": "0.5"
    },
    {
     "id": "fig-average-1",
     "type": "figure_caption",
     "page": 9,
     "original": "Figure 4: CERs of OmniVoice vs. ground truth across languages with varying training data durations on FLEURS-Multilingual-102. Hollow circles indicate languages where OmniVoice achieves lower CER than ground-truth, Filled circles indicate higher CER.",
     "zh": "图 4：在 FLEURS-Multilingual-102 上，不同训练数据时长下 OmniVoice 与真实语音的逐语言 CER 对比。空心圆表示 OmniVoice 的 CER 低于真实语音的语言，实心圆表示 CER 更高的语言。"
    },
    {
     "id": "tab-average-1",
     "type": "table_caption",
     "page": 10,
     "original": "Table 4: Evaluation on the FLEURS-Multilingual-102 test set.",
     "zh": "表 4：FLEURS-Multilingual-102 测试集上的评估结果。"
    }
   ]
  },
  {
   "id": "sec-model-4",
   "num": null,
   "level": 2,
   "page": 10,
   "title": {
    "original": "Model",
    "zh": "Model"
   },
   "blocks": [
    {
     "id": "p-model-4-1",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-model-4-1-1",
       "original": "FLEURS-Multilingual-102 Avg SIM-o ↑ Avg CER ↓ Languages with CER ≤",
       "zh": "FLEURS-Multilingual-102：平均 SIM-o ↑、平均 CER ↓、CER ≤ 某阈值的语言数量（表头）。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-5",
   "num": null,
   "level": 2,
   "page": 10,
   "title": {
    "original": "5%",
    "zh": "5%（表格碎块小节）"
   },
   "blocks": [
    {
     "id": "eq-5-1",
     "type": "equation",
     "page": 10,
     "original": "10%"
    },
    {
     "id": "eq-5-2",
     "type": "equation",
     "page": 10,
     "original": "Ground-truth"
    },
    {
     "id": "eq-5-3",
     "type": "equation",
     "page": 10,
     "original": "- 5.11 75 92"
    },
    {
     "id": "eq-5-4",
     "type": "equation",
     "page": 10,
     "original": "OmniVoice"
    },
    {
     "id": "eq-5-5",
     "type": "equation",
     "page": 10,
     "original": "0.788 4.00 82 95"
    }
   ]
  },
  {
   "id": "sec-4-3",
   "num": "4.3",
   "level": 2,
   "page": 10,
   "title": {
    "original": "Effectiveness of Key Designs",
    "zh": "4.3 关键设计的有效性"
   },
   "blocks": [
    {
     "id": "p-4-3-1",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-4-3-1-1",
       "original": "To validate the effectiveness of our core designs, we conduct ablation experiments on the Emilia dataset.",
       "zh": "为验证核心设计的有效性，我们在 Emilia 数据集上进行了消融实验。"
      },
      {
       "id": "s-4-3-1-2",
       "original": "All models are trained for 300k updates with the same hyperparameters, with prompt denoising disabled unless otherwise specified.",
       "zh": "所有模型均以相同超参数训练 300k 次更新，除特别说明外均关闭提示去噪。"
      }
     ]
    },
    {
     "id": "tab-4-3-1",
     "type": "table_caption",
     "page": 10,
     "original": "Table 5: Impact of different masking strategies.",
     "zh": "表 5：不同掩码策略的影响。"
    }
   ]
  },
  {
   "id": "sec-masking-strategy",
   "num": null,
   "level": 2,
   "page": 10,
   "title": {
    "original": "Masking Strategy",
    "zh": "掩码策略"
   },
   "blocks": [
    {
     "id": "p-masking-strategy-1",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-masking-strategy-1-1",
       "original": "Librispeech-PC test-clean SIM-o ↑ WER ↓ UTMOS ↑ SoundStorm-style mask",
       "zh": "（表格：Librispeech-PC test-clean × SIM-o↑/WER↓/UTMOS↑——SoundStorm 式掩码 0.661/3.00/4.12；MaskGCT 式掩码 0.660/2.04/4.17；全码本随机掩码 0.697/1.57/4.23；- 单码本计算损失 0.648/2.85/4.22。）首先比较不同掩码策略，验证所提全码本随机掩码策略的有效性。"
      }
     ]
    },
    {
     "id": "eq-masking-strategy-1",
     "type": "equation",
     "page": 10,
     "original": "0.661 3.00 4.12"
    },
    {
     "id": "eq-masking-strategy-2",
     "type": "equation",
     "page": 10,
     "original": "MaskGCT-style mask"
    },
    {
     "id": "eq-masking-strategy-3",
     "type": "equation",
     "page": 10,
     "original": "0.660 2.04 4.17"
    },
    {
     "id": "eq-masking-strategy-4",
     "type": "equation",
     "page": 10,
     "original": "Full-codebook random mask"
    },
    {
     "id": "eq-masking-strategy-5",
     "type": "equation",
     "page": 10,
     "original": "0.697 1.57 4.23"
    },
    {
     "id": "eq-masking-strategy-6",
     "type": "equation",
     "page": 10,
     "original": "- compute loss on a single codebook"
    },
    {
     "id": "eq-masking-strategy-7",
     "type": "equation",
     "page": 10,
     "original": "0.648 2.85 4.22"
    },
    {
     "id": "p-masking-strategy-2",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-masking-strategy-2-1",
       "original": "Firstly, we compare different masking strategies to validate the effectiveness of our proposed fullcodebook random masking strategy.",
       "zh": "（表格：Librispeech-PC test-clean × SIM-o↑/WER↓/UTMOS↑——SoundStorm 式掩码 0.661/3.00/4.12；MaskGCT 式掩码 0.660/2.04/4.17；全码本随机掩码 0.697/1.57/4.23；- 单码本计算损失 0.648/2.85/4.22。）首先比较不同掩码策略，验证所提全码本随机掩码策略的有效性。"
      },
      {
       "id": "s-masking-strategy-2-2",
       "original": "SoundStorm-style masking is a variant of the per-layer masking strategy, which samples layers for loss computation from a uniform distribution and selects the masking ratio according to a cosine function.",
       "zh": "SoundStorm 式掩码是逐层掩码策略的一种变体，它从均匀分布中采样参与损失计算的层，并按余弦函数选择掩码比例。"
      },
      {
       "id": "s-masking-strategy-2-3",
       "original": "MaskGCT-style masking further samples layers based on a linear distribution, where lower layers are selected with higher probability.",
       "zh": "MaskGCT 式掩码进一步按线性分布采样层，低层被选中的概率更高。"
      }
     ]
    },
    {
     "id": "p-masking-strategy-3",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-masking-strategy-3-1",
       "original": "As shown in Table 5, full-codebook random masking consistently outperforms the single-codebook masking strategies adopted by MaskGCT and SoundStorm.",
       "zh": "如表 5 所示，全码本随机掩码一致优于 MaskGCT 与 SoundStorm 所采用的单码本掩码策略。"
      },
      {
       "id": "s-masking-strategy-3-2",
       "original": "Furthermore, we conduct an experiment where the loss is calculated only on a single codebook, which also results in significant performance degradation, confirming the advantages of the proposed dense loss computation.",
       "zh": "此外，我们还进行了一个只在单码本上计算损失的实验，结果同样出现显著的性能下降，证实了所提密集损失计算的优势。"
      }
     ]
    },
    {
     "id": "tab-masking-strategy-1",
     "type": "table_caption",
     "page": 10,
     "original": "Table 6: Impact of LLM initialization on WER across datasets. Abbreviations: Libri = LibrispeechPC test-clean, Seed-en = Seed-TTS test-en, Seed-zh = Seed-TTS test-zh.",
     "zh": "表 6：LLM 初始化对各数据集 WER 的影响。缩写：Libri = LibriSpeech-PC test-clean，Seed-en = Seed-TTS test-en，Seed-zh = Seed-TTS test-zh。"
    }
   ]
  },
  {
   "id": "sec-model-5",
   "num": null,
   "level": 2,
   "page": 10,
   "title": {
    "original": "Model",
    "zh": "Model"
   },
   "blocks": [
    {
     "id": "p-model-5-1",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-model-5-1-1",
       "original": "Learning Rate WER ↓",
       "zh": "学习率。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-libri",
   "num": null,
   "level": 2,
   "page": 10,
   "title": {
    "original": "Libri",
    "zh": "Libri（表格碎块小节）"
   },
   "blocks": [
    {
     "id": "p-libri-1",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-libri-1-1",
       "original": "Seed-en Seed-zh LLM initialization 1e-4",
       "zh": "（表格：Seed-en/Seed-zh × LLM 初始化——1e-4：1.57/1.72/0.89；1e-4：2.79/2.34/1.11；2e-4：2.52/2.43/1.01；5e-4：2.56/2.07/1.01；1e-3：2.72/2.29/1.02；随机初始化（对照）。）我们用表 6 说明 LLM 初始化对高可懂度（低 WER）的重要性。"
      }
     ]
    },
    {
     "id": "eq-libri-1",
     "type": "equation",
     "page": 10,
     "original": "1.57 1.72 0.89"
    },
    {
     "id": "eq-libri-2",
     "type": "equation",
     "page": 10,
     "original": "1e-4"
    },
    {
     "id": "eq-libri-3",
     "type": "equation",
     "page": 10,
     "original": "2.79 2.34 1.11"
    },
    {
     "id": "eq-libri-4",
     "type": "equation",
     "page": 10,
     "original": "2e-4"
    },
    {
     "id": "eq-libri-5",
     "type": "equation",
     "page": 10,
     "original": "2.52 2.43 1.01"
    },
    {
     "id": "eq-libri-6",
     "type": "equation",
     "page": 10,
     "original": "5e-4"
    },
    {
     "id": "eq-libri-7",
     "type": "equation",
     "page": 10,
     "original": "2.56 2.07 1.01"
    },
    {
     "id": "eq-libri-8",
     "type": "equation",
     "page": 10,
     "original": "1e-3"
    },
    {
     "id": "eq-libri-9",
     "type": "equation",
     "page": 10,
     "original": "2.72 2.29 1.02"
    },
    {
     "id": "p-libri-2",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-libri-2-1",
       "original": "Random initialization We illustrate the importance of LLM initialization for high intelligibility (i.e., low WER) in Table 6.",
       "zh": "（表格：Seed-en/Seed-zh × LLM 初始化——1e-4：1.57/1.72/0.89；1e-4：2.79/2.34/1.11；2e-4：2.52/2.43/1.01；5e-4：2.56/2.07/1.01；1e-3：2.72/2.29/1.02；随机初始化（对照）。）我们用表 6 说明 LLM 初始化对高可懂度（低 WER）的重要性。"
      },
      {
       "id": "s-libri-2-2",
       "original": "It can be observed that even after extensive learning rate tuning, the WERs of models without LLM initialization are still consistently higher than those of the model with LLM initialization, highlighting the importance of inheriting linguistic knowledge from pre-trained LLMs.",
       "zh": "可以观察到，即使经过充分的学习率调参，没有 LLM 初始化的模型 WER 仍一致高于有 LLM 初始化的模型，凸显了从预训练 LLM 继承语言知识的重要性。"
      }
     ]
    },
    {
     "id": "p-libri-3",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-libri-3-1",
       "original": "We illustrate the impact of prompt denoising in Table 7.",
       "zh": "我们在表 7 中展示提示去噪的影响。"
      },
      {
       "id": "s-libri-3-2",
       "original": "When prompt denoising is enabled, UTMOS improves from 4.23 to 4.32 because the model generates cleaner speech, while SIM-o decreases slightly (0.697 →0.668) because the generated speech is more standardized than the noisy prompt, which aligns with our design objective of generating high-quality speech from degraded prompts.",
       "zh": "启用提示去噪后，UTMOS 从 4.23 提升到 4.32，因为模型生成的语音更干净；同时 SIM-o 略有下降（0.697 → 0.668），因为生成的语音比带噪提示更「标准化」——这与我们「从退化提示生成高质量语音」的设计目标一致。"
      }
     ]
    },
    {
     "id": "tab-libri-1",
     "type": "table_caption",
     "page": 11,
     "original": "Table 7: Impact of prompt denoising task.",
     "zh": "表 7：提示去噪任务的影响。"
    }
   ]
  },
  {
   "id": "sec-model-6",
   "num": null,
   "level": 2,
   "page": 11,
   "title": {
    "original": "Model",
    "zh": "Model"
   },
   "blocks": [
    {
     "id": "p-model-6-1",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-model-6-1-1",
       "original": "Librispeech-PC test-clean SIM-o ↑ WER ↓ UTMOS ↑ w/o prompt denoise",
       "zh": "表头：Librispeech-PC test-clean × SIM-o ↑ / WER ↓ / UTMOS ↑——w/o prompt denoise（后续照原文）。"
      }
     ]
    },
    {
     "id": "eq-model-6-1",
     "type": "equation",
     "page": 11,
     "original": "0.697 1.57 4.23"
    },
    {
     "id": "eq-model-6-2",
     "type": "equation",
     "page": 11,
     "original": "w/ prompt denoise"
    },
    {
     "id": "eq-model-6-3",
     "type": "equation",
     "page": 11,
     "original": "0.668 1.56 4.32"
    }
   ]
  },
  {
   "id": "sec-4-3-1",
   "num": "4.3.1",
   "level": 2,
   "page": 11,
   "title": {
    "original": "Inference Speed",
    "zh": "4.3.1 推理速度"
   },
   "blocks": [
    {
     "id": "p-4-3-1-1",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-4-3-1-1-1",
       "original": "We evaluate the inference speed of OmniVoice on an H20 GPU using PyTorch as the inference framework.",
       "zh": "我们在 H20 GPU 上、以 PyTorch 作为推理框架评估 OmniVoice 的推理速度。"
      },
      {
       "id": "s-4-3-1-1-2",
       "original": "Following the identical experimental setup in [16, 14], we use a 3-second audio prompt to generate 10-second audio clips, and report the real-time factor (RTF) across different batch sizes and inference steps.",
       "zh": "遵循与 [16, 14] 完全相同的实验设置，我们使用 3 秒音频提示生成 10 秒音频片段，并报告不同批大小与推理步数下的实时因子（RTF）。"
      },
      {
       "id": "s-4-3-1-1-3",
       "original": "As shown in Table 8, OmniVoice achieves an RTF of 0.0319 with 16 inference steps and a batch size of 1, outperforming the corresponding results of ZipVoice (0.0557) with the same inference step configuration.",
       "zh": "如表 8 所示，OmniVoice 在 16 步推理、批大小为 1 时取得 0.0319 的 RTF，优于相同推理步数配置下 ZipVoice 的对应结果（0.0557）。"
      },
      {
       "id": "s-4-3-1-1-4",
       "original": "Notably, OmniVoice also yields better generation quality in the same 16-step setting (shown in Appendix B).",
       "zh": "值得注意的是，在相同的 16 步设置下，OmniVoice 还取得了更好的生成质量（见附录 B）。"
      },
      {
       "id": "s-4-3-1-1-5",
       "original": "When batch inference is employed, OmniVoice attains an even lower RTF of 0.022.",
       "zh": "采用批量推理时，OmniVoice 的 RTF 可进一步低至 0.022。"
      },
      {
       "id": "s-4-3-1-1-6",
       "original": "In addition, its inference efficiency can be further improved with acceleration techniques such as TensorRT.",
       "zh": "此外，其推理效率还可以通过 TensorRT 等加速技术进一步提升。"
      },
      {
       "id": "s-4-3-1-1-7",
       "original": "These results demonstrate the high inference efficiency of OmniVoice.",
       "zh": "这些结果展示了 OmniVoice 的高推理效率。"
      }
     ]
    },
    {
     "id": "tab-4-3-1-1",
     "type": "table_caption",
     "page": 11,
     "original": "Table 8: RTF with different inference steps and batch sizes.",
     "zh": "表 8：不同推理步数与批大小下的 RTF。"
    }
   ]
  },
  {
   "id": "sec-inference-steps",
   "num": null,
   "level": 2,
   "page": 11,
   "title": {
    "original": "Inference Steps",
    "zh": "推理步数"
   },
   "blocks": [
    {
     "id": "p-inference-steps-1",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-inference-steps-1-1",
       "original": "Batch Size",
       "zh": "（图横轴：Batch Size（批大小）。）"
      }
     ]
    },
    {
     "id": "eq-inference-steps-1",
     "type": "equation",
     "page": 11,
     "original": "1 2 4 8 16 0.0319 0.0263 0.0235 0.0224 32 0.0598 0.0486 0.0436 0.0414"
    }
   ]
  },
  {
   "id": "sec-5-2",
   "num": "5",
   "level": 1,
   "page": 11,
   "title": {
    "original": "Conclusions",
    "zh": "5 结论"
   },
   "blocks": [
    {
     "id": "p-5-2-1",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-5-2-1-1",
       "original": "In this work, we introduce OmniVoice, a massively multilingual zero-shot TTS model supporting over 600 languages with SOTA performance, addressing the critical limitation of narrow language coverage in existing zero-shot TTS systems.",
       "zh": "本工作提出 OmniVoice——一个支持超过 600 种语言、性能达到 SOTA 的大规模多语种零样本 TTS 模型，解决了现有零样本 TTS 系统语言覆盖狭窄这一关键局限。"
      },
      {
       "id": "s-5-2-1-2",
       "original": "The core of OmniVoice is a novel diffusion language model-style single-stage discrete-token NAR framework, which directly maps text to multicodebook acoustic tokens to circumvent the inherent limitations of conventional two-stage models.",
       "zh": "OmniVoice 的核心是一个新颖的扩散语言模型风格的单阶段离散 token NAR 框架，它将文本直接映射到多码本声学 token，绕开了传统两阶段模型的固有局限。"
      },
      {
       "id": "s-5-2-1-3",
       "original": "To unlock the full potential of this streamlined architecture, we propose a full-codebook random masking strategy to enhance training efficiency and LLM weight initialization to resolve the intelligibility challenge.",
       "zh": "为释放这一精简架构的全部潜力，我们提出全码本随机掩码策略以提升训练效率，并提出 LLM 权重初始化以解决可懂度难题。"
      },
      {
       "id": "s-5-2-1-4",
       "original": "Trained on a 581k-hour multilingual dataset curated exclusively from opensource resources, OmniVoice achieves the broadest language coverage of zero-shot TTS models to date, delivers SOTA performance on Chinese, English and diverse multilingual benchmarks, exhibits exceptional generalization to low-resource languages, and is equipped with multi-dimensional controllability and high inference efficiency, marking a significant advance in expanding high-quality TTS capabilities to a broad spectrum of the world’s languages.",
       "zh": "在完全由开源资源构建的 581k 小时多语数据集上训练后，OmniVoice 取得了迄今零样本 TTS 模型中最广的语言覆盖，在中文、英文及多样化的多语种基准上达到 SOTA 表现，展现出对低资源语言的出色泛化能力，并具备多维度可控性与高推理效率，标志着把高质量 TTS 能力推广到世界广泛语言的重要进展。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-references",
   "num": null,
   "level": 1,
   "page": 12,
   "title": {
    "original": "References",
    "zh": "References"
   },
   "blocks": [
    {
     "id": "p-references-1",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-1-1",
       "original": "[1] Sanyuan Chen, Chengyi Wang, Yu Wu, Ziqiang Zhang, Long Zhou, Shujie Liu, Zhuo Chen, Yanqing Liu, Huaming Wang, Jinyu Li, et al. Neural codec language models are zero-shot text to speech synthesizers."
      },
      {
       "id": "s-references-1-2",
       "original": "IEEE Transactions on Audio, Speech and Language Processing, 2025."
      }
     ]
    },
    {
     "id": "p-references-2",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-2-1",
       "original": "[2] Philip Anastassiou, Jiawei Chen, Jitong Chen, Yuanzhe Chen, Zhuo Chen, Ziyi Chen, Jian Cong, Lelai Deng, Chuang Ding, Lu Gao, et al. Seed-tts: A family of high-quality versatile speech generation models. arXiv preprint arXiv:2406.02430, 2024."
      }
     ]
    },
    {
     "id": "p-references-3",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-3-1",
       "original": "[3] Zhihao Du, Yuxuan Wang, Qian Chen, Xian Shi, Xiang Lv, Tianyu Zhao, Zhifu Gao, Yexin Yang, Changfeng Gao, Hui Wang, et al. Cosyvoice 2: Scalable streaming speech synthesis with large language models. arXiv preprint arXiv:2412.10117, 2024."
      }
     ]
    },
    {
     "id": "p-references-4",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-4-1",
       "original": "[4] Hao-Han Guo, Yao Hu, Kun Liu, Fei-Yu Shen, Xu Tang, Yi-Chen Wu, Feng-Long Xie, Kun Xie, and Kai-Tuo Xu."
      },
      {
       "id": "s-references-4-2",
       "original": "Fireredtts: A foundation text-to-speech framework for industry-level generative speech applications. arXiv preprint arXiv:2409.03283, 2024."
      }
     ]
    },
    {
     "id": "p-references-5",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-5-1",
       "original": "[5] Siyi Zhou, Yiquan Zhou, Yi He, Xun Zhou, Jinchao Wang, Wei Deng, and Jingchen Shu."
      }
     ]
    },
    {
     "id": "p-references-6",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-6-1",
       "original": "Indextts2: A breakthrough in emotionally expressive and duration-controlled auto-regressive zero-shot text-to-speech. arXiv preprint arXiv:2506.21619, 2025."
      }
     ]
    },
    {
     "id": "p-references-7",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-7-1",
       "original": "[6] Dongya Jia, Zhuo Chen, Jiawei Chen, Chenpeng Du, Jian Wu, Jian Cong, Xiaobin Zhuang, Chumin Li, Zhen Wei, Yuping Wang, et al. Ditar: Diffusion transformer autoregressive modeling for speech generation."
      },
      {
       "id": "s-references-7-2",
       "original": "In International Conference on Machine Learning, pages 27255– 27270."
      },
      {
       "id": "s-references-7-3",
       "original": "PMLR, 2025."
      }
     ]
    },
    {
     "id": "p-references-8",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-8-1",
       "original": "[7] Xinsheng Wang, Mingqi Jiang, Ziyang Ma, Ziyu Zhang, Songxiang Liu, Linqin Li, Zheng Liang, Qixi Zheng, Rui Wang, Xiaoqin Feng, et al. Spark-tts: An efficient llm-based text-tospeech model with single-stream decoupled speech tokens. arXiv preprint arXiv:2503.01710,"
      }
     ]
    },
    {
     "id": "eq-references-1",
     "type": "equation",
     "page": 12,
     "original": "2025."
    },
    {
     "id": "p-references-9",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-9-1",
       "original": "[8] Zhen Ye, Xinfa Zhu, Chi-Min Chan, Xinsheng Wang, Xu Tan, Jiahe Lei, Yi Peng, Haohe Liu, Yizhu Jin, Zheqi Dai, et al. Llasa: Scaling train-time and inference-time compute for llama-based speech synthesis. arXiv preprint arXiv:2502.04128, 2025."
      }
     ]
    },
    {
     "id": "p-references-10",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-10-1",
       "original": "[9] Yakun Song, Xiaobin Zhuang, Jiawei Chen, Zhikang Niu, Guanrou Yang, Chenpeng Du, Dongya Jia, Zhuo Chen, Yuping Wang, Yuxuan Wang, et al. Distar: Diffusion over a scalable token autoregressive representation for speech generation. arXiv preprint arXiv:2510.12210,"
      }
     ]
    },
    {
     "id": "eq-references-2",
     "type": "equation",
     "page": 12,
     "original": "2025."
    },
    {
     "id": "p-references-11",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-11-1",
       "original": "[10] Yixuan Zhou, Guoyang Zeng, Xin Liu, Xiang Li, Renjie Yu, Ziyang Wang, Runchuan Ye, Weiyue Sun, Jiancheng Gui, Kehan Li, et al. Voxcpm: Tokenizer-free tts for context-aware speech generation and true-to-life voice cloning. arXiv preprint arXiv:2509.24650, 2025."
      }
     ]
    },
    {
     "id": "p-references-12",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-12-1",
       "original": "[11] Jiayan Cui, Zhihan Yang, Naihan Li, Jiankun Tian, Xingyu Ma, Yi Zhang, Guangyu Chen, Runxuan Yang, Yuqing Cheng, Yizhi Zhou, et al. Glm-tts technical report. arXiv preprint arXiv:2512.14291, 2025."
      }
     ]
    },
    {
     "id": "p-references-13",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-13-1",
       "original": "[12] Matthew Le, Apoorv Vyas, Bowen Shi, Brian Karrer, Leda Sari, Rashel Moritz, Mary Williamson, Vimal Manohar, Yossi Adi, Jay Mahadeokar, et al. Voicebox: Text-guided multilingual universal speech generation at scale."
      },
      {
       "id": "s-references-13-2",
       "original": "Advances in neural information processing systems, 36:14005–14034, 2023."
      }
     ]
    },
    {
     "id": "p-references-14",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-14-1",
       "original": "[13] Sefik Emre Eskimez, Xiaofei Wang, Manthan Thakker, Canrun Li, Chung-Hsien Tsai, Zhen Xiao, Hemin Yang, Zirun Zhu, Min Tang, Xu Tan, et al. E2 tts: Embarrassingly easy fully non-autoregressive zero-shot tts."
      },
      {
       "id": "s-references-14-2",
       "original": "In 2024 IEEE Spoken Language Technology Workshop (SLT), pages 682–689."
      },
      {
       "id": "s-references-14-3",
       "original": "IEEE, 2024."
      }
     ]
    },
    {
     "id": "p-references-15",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-15-1",
       "original": "[14] Yushen Chen, Zhikang Niu, Ziyang Ma, Keqi Deng, Chunhui Wang, Jian Zhao, Kai Yu, and Xie Chen."
      },
      {
       "id": "s-references-15-2",
       "original": "F5-tts: A fairytaler that fakes fluent and faithful speech with flow matching. arXiv preprint arXiv:2410.06885, 2024."
      }
     ]
    },
    {
     "id": "p-references-16",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-references-16-1",
       "original": "[15] Yifan Yang, Shujie Liu, Jinyu Li, Yuxuan Hu, Haibin Wu, Hui Wang, Jianwei Yu, Lingwei Meng, Haiyang Sun, Yanqing Liu, et al. Pseudo-autoregressive neural codec language models for efficient zero-shot text-to-speech synthesis."
      },
      {
       "id": "s-references-16-2",
       "original": "In Proceedings of the 33rd ACM International Conference on Multimedia, pages 9316–9325, 2025."
      }
     ]
    },
    {
     "id": "p-references-17",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-references-17-1",
       "original": "[16] Han Zhu, Wei Kang, Zengwei Yao, Liyong Guo, Fangjun Kuang, Zhaoqing Li, Weiji Zhuang, Long Lin, and Daniel Povey."
      },
      {
       "id": "s-references-17-2",
       "original": "Zipvoice: Fast and high-quality zero-shot text-to-speech with flow matching. arXiv preprint arXiv:2506.13053, 2025."
      }
     ]
    },
    {
     "id": "p-references-18",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-references-18-1",
       "original": "[17] Han Zhu, Wei Kang, Liyong Guo, Zengwei Yao, Fangjun Kuang, Weiji Zhuang, Zhaoqing Li, Zhifeng Han, Dong Zhang, Xin Zhang, et al. Zipvoice-dialog: Non-autoregressive spoken dialogue generation with flow matching. arXiv preprint arXiv:2507.09318, 2025."
      }
     ]
    },
    {
     "id": "p-references-19",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-references-19-1",
       "original": "[18] Ziyue Jiang, Yi Ren, Ruiqi Li, Shengpeng Ji, Boyang Zhang, Zhenhui Ye, Chen Zhang, Bai Jionghao, Xiaoda Yang, Jialong Zuo, et al."
      }
     ]
    },
    {
     "id": "p-references-20",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-references-20-1",
       "original": "Megatts 3: Sparse alignment enhanced latent diffusion transformer for zero-shot speech synthesis. arXiv preprint arXiv:2502.18924, 2025."
      }
     ]
    },
    {
     "id": "p-references-21",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-references-21-1",
       "original": "[19] Yuancheng Wang, Haoyue Zhan, Liwei Liu, Ruihong Zeng, Haotian Guo, Jiachen Zheng, Qiang Zhang, Xueyao Zhang, Shunsi Zhang, and Zhizheng Wu."
      },
      {
       "id": "s-references-21-2",
       "original": "MaskGCT: Zero-shot text-tospeech with masked generative codec transformer."
      },
      {
       "id": "s-references-21-3",
       "original": "In The Thirteenth International Conference on Learning Representations, 2025."
      }
     ]
    },
    {
     "id": "p-references-22",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-references-22-1",
       "original": "[20] Yifan Yang, Bing Han, Hui Wang, Long Zhou, Wei Wang, Mingyu Cui, Xu Tan, and Xie Chen."
      }
     ]
    },
    {
     "id": "p-references-23",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-references-23-1",
       "original": "Measuring prosody diversity in zero-shot tts: A new metric, benchmark, and exploration. arXiv preprint arXiv:2509.19928, 2025."
      }
     ]
    },
    {
     "id": "p-references-24",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-references-24-1",
       "original": "[21] Gerard I Gállego, Roy Fejgin, Chunghsin Yeh, Xiaoyu Liu, and Gautam Bhattacharya."
      }
     ]
    },
    {
     "id": "p-references-25",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-references-25-1",
       "original": "Single-stage tts with masked audio token modeling and semantic knowledge distillation."
      },
      {
       "id": "s-references-25-2",
       "original": "In ICASSP 2025-2025 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP), pages 1–5."
      },
      {
       "id": "s-references-25-3",
       "original": "IEEE, 2025."
      }
     ]
    },
    {
     "id": "p-references-26",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-references-26-1",
       "original": "[22] Subham Sahoo, Marianne Arriola, Yair Schiff, Aaron Gokaslan, Edgar Marroquin, Justin Chiu, Alexander Rush, and Volodymyr Kuleshov."
      },
      {
       "id": "s-references-26-2",
       "original": "Simple and effective masked diffusion language models."
      },
      {
       "id": "s-references-26-3",
       "original": "Advances in Neural Information Processing Systems, 37:130136–130184, 2024."
      }
     ]
    },
    {
     "id": "p-references-27",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-references-27-1",
       "original": "[23] Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N Gomez, Łukasz Kaiser, and Illia Polosukhin."
      },
      {
       "id": "s-references-27-2",
       "original": "Attention is all you need."
      },
      {
       "id": "s-references-27-3",
       "original": "Advances in neural information processing systems, 30, 2017."
      }
     ]
    },
    {
     "id": "p-references-28",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-references-28-1",
       "original": "[24] Shen Nie, Fengqi Zhu, Zebin You, Xiaolu Zhang, Jingyang Ou, Jun Hu, JUN ZHOU, Yankai Lin, Ji-Rong Wen, and Chongxuan Li."
      },
      {
       "id": "s-references-28-2",
       "original": "Large language diffusion models."
      },
      {
       "id": "s-references-28-3",
       "original": "In The Thirty-ninth Annual Conference on Neural Information Processing Systems, 2025."
      }
     ]
    },
    {
     "id": "p-references-29",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-references-29-1",
       "original": "[25] Jiacheng Ye, Zhihui Xie, Lin Zheng, Jiahui Gao, Zirui Wu, Xin Jiang, Zhenguo Li, and Lingpeng Kong."
      },
      {
       "id": "s-references-29-2",
       "original": "Dream 7b: Diffusion large language models. arXiv preprint arXiv:2508.15487,"
      }
     ]
    },
    {
     "id": "eq-references-3",
     "type": "equation",
     "page": 13,
     "original": "2025."
    },
    {
     "id": "p-references-30",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-references-30-1",
       "original": "[26] Zalán Borsos, Matt Sharifi, Damien Vincent, Eugene Kharitonov, Neil Zeghidour, and Marco Tagliasacchi."
      }
     ]
    },
    {
     "id": "p-references-31",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-references-31-1",
       "original": "Soundstorm: Efficient parallel audio generation."
      }
     ]
    },
    {
     "id": "p-references-32",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-references-32-1",
       "original": "arXiv preprint arXiv:2305.09636, 2023."
      }
     ]
    },
    {
     "id": "p-references-33",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-references-33-1",
       "original": "[27] Leying Zhang, Wangyou Zhang, Zhengyang Chen, and Yanmin Qian."
      },
      {
       "id": "s-references-33-2",
       "original": "Advanced zero-shot text-to-speech for background removal and preservation with controllable masked speech prediction."
      },
      {
       "id": "s-references-33-3",
       "original": "In ICASSP 2025-2025 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP), pages 1–5."
      },
      {
       "id": "s-references-33-4",
       "original": "IEEE, 2025."
      }
     ]
    },
    {
     "id": "p-references-34",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-references-34-1",
       "original": "[28] Xiaofei Wang, Sefik Emre Eskimez, Manthan Thakker, Hemin Yang, Zirun Zhu, Min Tang, Yufei Xia, Jinzhu Li, Sheng Zhao, Jinyu Li, et al. An investigation of noise robustness for flow-matching-based zero-shot tts. arXiv preprint arXiv:2406.05699, 2024."
      }
     ]
    },
    {
     "id": "p-references-35",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-references-35-1",
       "original": "[29] Jingbin Hu, Huakang Chen, Linhan Ma, Dake Guo, Qirui Zhan, Wenhao Li, Haoyu Zhang, Kangxiang Xia, Ziyu Zhang, Wenjie Tian, et al. Voicesculptor: Your voice, designed by you."
      }
     ]
    },
    {
     "id": "p-references-36",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-references-36-1",
       "original": "arXiv preprint arXiv:2601.10629, 2026."
      }
     ]
    },
    {
     "id": "p-references-37",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-37-1",
       "original": "[30] Huan Liao, Qinke Ni, Yuancheng Wang, Yiheng Lu, Haoyue Zhan, Pengyuan Xie, Qiang Zhang, and Zhizheng Wu."
      },
      {
       "id": "s-references-37-2",
       "original": "Nvspeech: An integrated and scalable pipeline for human-like speech modeling with paralinguistic vocalizations. arXiv preprint arXiv:2508.04195, 2025."
      }
     ]
    },
    {
     "id": "p-references-38",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-38-1",
       "original": "[31] Wei Deng, Siyi Zhou, Jingchen Shu, Jinchao Wang, and Lu Wang."
      },
      {
       "id": "s-references-38-2",
       "original": "Indextts: An industrial-level controllable and efficient zero-shot text-to-speech system. arXiv preprint arXiv:2502.05512,"
      }
     ]
    },
    {
     "id": "eq-references-4",
     "type": "equation",
     "page": 14,
     "original": "2025."
    },
    {
     "id": "p-references-39",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-39-1",
       "original": "[32] An Yang, Anfeng Li, Baosong Yang, Beichen Zhang, Binyuan Hui, Bo Zheng, Bowen Yu, Chang Gao, Chengen Huang, Chenxu Lv, et al."
      }
     ]
    },
    {
     "id": "p-references-40",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-40-1",
       "original": "Qwen3 technical report."
      }
     ]
    },
    {
     "id": "p-references-41",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-41-1",
       "original": "arXiv preprint arXiv:2505.09388, 2025."
      }
     ]
    },
    {
     "id": "p-references-42",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-42-1",
       "original": "[33] Zhihao Du, Changfeng Gao, Yuxuan Wang, Fan Yu, Tianyu Zhao, Hao Wang, Xiang Lv, Hui Wang, Chongjia Ni, Xian Shi, et al. Cosyvoice 3: Towards in-the-wild speech generation via scaling-up and post-training. arXiv preprint arXiv:2505.17589, 2025."
      }
     ]
    },
    {
     "id": "p-references-43",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-43-1",
       "original": "[34] Edresson Casanova, Julian Weber, Christopher D Shulby, Arnaldo Candido Junior, Eren Gölge, and Moacir A Ponti."
      },
      {
       "id": "s-references-43-2",
       "original": "Yourtts: Towards zero-shot multi-speaker tts and zero-shot voice conversion for everyone."
      },
      {
       "id": "s-references-43-3",
       "original": "In International conference on machine learning, pages 2709–2720."
      },
      {
       "id": "s-references-43-4",
       "original": "PMLR,"
      }
     ]
    },
    {
     "id": "eq-references-5",
     "type": "equation",
     "page": 14,
     "original": "2022."
    },
    {
     "id": "p-references-44",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-44-1",
       "original": "[35] Edresson Casanova, Kelly Davis, Eren Gölge, Görkem Göknar, Iulian Gulea, Logan Hart, Aya Aljafari, Joshua Meyer, Reuben Morais, Samuel Olayemi, et al. Xtts: a massively multilingual zero-shot text-to-speech model."
      },
      {
       "id": "s-references-44-2",
       "original": "In Proc."
      },
      {
       "id": "s-references-44-3",
       "original": "Interspeech 2024, pages 4978–4982, 2024."
      }
     ]
    },
    {
     "id": "p-references-45",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-45-1",
       "original": "[36] Zhisheng Zheng, Puyuan Peng, Anuj Diwan, Cong Phuoc Huynh, Xiaohang Sun, Zhu Liu, Vimal Bhat, and David Harwath."
      },
      {
       "id": "s-references-45-2",
       "original": "Voicecraft-x: Unifying multilingual, voice-cloning speech synthesis and speech editing."
      },
      {
       "id": "s-references-45-3",
       "original": "In Proceedings of the 2025 Conference on Empirical Methods in Natural Language Processing, pages 2737–2756, 2025."
      }
     ]
    },
    {
     "id": "p-references-46",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-46-1",
       "original": "[37] Yushen Chen, Junzhe Liu, Yujie Tu, Zhikang Niu, Yuzhe Liang, Kai Yu, Chunyu Qiang, Chen Zhang, and Xie Chen."
      },
      {
       "id": "s-references-46-2",
       "original": "Habibi: Laying the open-source foundation of unified-dialectal arabic speech synthesis. arXiv preprint arXiv:2601.13802, 2026."
      }
     ]
    },
    {
     "id": "p-references-47",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-47-1",
       "original": "[38] Zhiyuan Zhao, Lijian Lin, Ye Zhu, Kai Xie, Yunfei Liu, and Yu Li."
      },
      {
       "id": "s-references-47-2",
       "original": "Lemas: Large a 150k-hour large-scale extensible multilingual audio suite with generative speech models. arXiv preprint arXiv:2601.04233, 2026."
      }
     ]
    },
    {
     "id": "p-references-48",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-48-1",
       "original": "[39] Vineel Pratap, Andros Tjandra, Bowen Shi, Paden Tomasello, Arun Babu, Sayani Kundu, Ali Elkahky, Zhaoheng Ni, Apoorv Vyas, Maryam Fazel-Zarandi, et al. Scaling speech technology to 1,000+ languages."
      },
      {
       "id": "s-references-48-2",
       "original": "Journal of Machine Learning Research, 25(97):1–52, 2024."
      }
     ]
    },
    {
     "id": "p-references-49",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-49-1",
       "original": "[40] Resemble AI."
      },
      {
       "id": "s-references-49-2",
       "original": "Chatterbox-TTS. https://github.com/resemble-ai/chatterbox, 2025."
      }
     ]
    },
    {
     "id": "p-references-50",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-50-1",
       "original": "GitHub repository."
      }
     ]
    },
    {
     "id": "p-references-51",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-51-1",
       "original": "[41] Shijia Liao, Yuxuan Wang, Tianyu Li, Yifan Cheng, Ruoyi Zhang, Rongzhi Zhou, and Yijin Xing."
      },
      {
       "id": "s-references-51-2",
       "original": "Fish-speech: Leveraging large language models for advanced multilingual text-tospeech synthesis. arXiv preprint arXiv:2411.01156, 2024."
      }
     ]
    },
    {
     "id": "p-references-52",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-52-1",
       "original": "[42] Hangrui Hu, Xinfa Zhu, Ting He, Dake Guo, Bin Zhang, Xiong Wang, Zhifang Guo, Ziyue Jiang, Hongkun Hao, Zishan Guo, et al. Qwen3-tts technical report. arXiv preprint arXiv:2601.15621, 2026."
      }
     ]
    },
    {
     "id": "p-references-53",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-53-1",
       "original": "[43] Yunpei Li, Xun Zhou, Jinchao Wang, Lu Wang, Yong Wu, Siyi Zhou, Yiquan Zhou, and Jingchen Shu."
      },
      {
       "id": "s-references-53-2",
       "original": "Indextts 2.5 technical report. arXiv preprint arXiv:2601.03888, 2026."
      }
     ]
    },
    {
     "id": "p-references-54",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-54-1",
       "original": "[44] Wataru Nakata, Yuki Saito, Yota Ueda, and Hiroshi Saruwatari."
      }
     ]
    },
    {
     "id": "p-references-55",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-55-1",
       "original": "Sidon: Fast and robust open-source multilingual speech restoration for large-scale dataset cleansing. arXiv preprint arXiv:2509.17052, 2025."
      }
     ]
    },
    {
     "id": "p-references-56",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-56-1",
       "original": "[45] Runchuan Ye, Yixuan Zhou, Renjie Yu, Zijian Lin, Kehan Li, Xiang Li, Xin Liu, Guoyang Zeng, and Zhiyong Wu."
      },
      {
       "id": "s-references-56-2",
       "original": "A scalable pipeline for enabling non-verbal speech generation and understanding. arXiv preprint arXiv:2508.05385, 2025."
      }
     ]
    },
    {
     "id": "p-references-57",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-57-1",
       "original": "[46] Haorui He, Zengqiang Shang, Chaoren Wang, Xuyuan Li, Yicheng Gu, Hua Hua, Liwei Liu, Chen Yang, Jiaqi Li, Peiyang Shi, et al. Emilia: A large-scale, extensive, multilingual, and diverse dataset for speech generation."
      },
      {
       "id": "s-references-57-2",
       "original": "IEEE Transactions on Audio, Speech and Language Processing, 2025."
      }
     ]
    },
    {
     "id": "p-references-58",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-58-1",
       "original": "[47] Boson AI."
      },
      {
       "id": "s-references-58-2",
       "original": "Higgs Audio V2: Redefining Expressiveness in Audio Generation. https:// github.com/boson-ai/higgs-audio, 2025."
      },
      {
       "id": "s-references-58-3",
       "original": "GitHub repository."
      },
      {
       "id": "s-references-58-4",
       "original": "Release blog available at https://www.boson.ai/blog/higgs-audio-v2."
      }
     ]
    },
    {
     "id": "p-references-59",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-59-1",
       "original": "[48] Ilya Loshchilov and Frank Hutter."
      },
      {
       "id": "s-references-59-2",
       "original": "Decoupled weight decay regularization. arXiv preprint arXiv:1711.05101, 2017."
      }
     ]
    },
    {
     "id": "p-references-60",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-60-1",
       "original": "[49] Jonathan Ho and Tim Salimans."
      },
      {
       "id": "s-references-60-2",
       "original": "Classifier-free diffusion guidance."
      },
      {
       "id": "s-references-60-3",
       "original": "In NeurIPS 2021 Workshop on Deep Generative Models and Downstream Applications, 2021."
      }
     ]
    },
    {
     "id": "p-references-61",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-61-1",
       "original": "[50] Aleksandr Meister, Matvei Novikov, Nikolay Karpov, Evelina Bakhturina, Vitaly Lavrukhin, and Boris Ginsburg."
      },
      {
       "id": "s-references-61-2",
       "original": "Librispeech-pc: Benchmark for evaluation of punctuation and capitalization capabilities of end-to-end asr models."
      },
      {
       "id": "s-references-61-3",
       "original": "In 2023 IEEE automatic speech recognition and understanding workshop (ASRU), pages 1–7."
      },
      {
       "id": "s-references-61-4",
       "original": "IEEE, 2023."
      }
     ]
    },
    {
     "id": "p-references-62",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-62-1",
       "original": "[51] Bowen Zhang, Congchao Guo, Geng Yang, Hang Yu, Haozhe Zhang, Heidi Lei, Jialong Mai, Junjie Yan, Kaiyue Yang, Mingqi Yang, et al. Minimax-speech: Intrinsic zero-shot text-tospeech with a learnable speaker encoder. arXiv preprint arXiv:2505.07916, 2025."
      }
     ]
    },
    {
     "id": "p-references-63",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-63-1",
       "original": "[52] Alexis Conneau, Min Ma, Simran Khanuja, Yu Zhang, Vera Axelrod, Siddharth Dalmia, Jason Riesa, Clara Rivera, and Ankur Bapna."
      },
      {
       "id": "s-references-63-2",
       "original": "Fleurs: Few-shot learning evaluation of universal representations of speech."
      },
      {
       "id": "s-references-63-3",
       "original": "In 2022 IEEE Spoken Language Technology Workshop (SLT), pages 798–805."
      },
      {
       "id": "s-references-63-4",
       "original": "IEEE, 2023."
      }
     ]
    },
    {
     "id": "p-references-64",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-64-1",
       "original": "[53] Sanyuan Chen, Chengyi Wang, Zhengyang Chen, Yu Wu, Shujie Liu, Zhuo Chen, Jinyu Li, Naoyuki Kanda, Takuya Yoshioka, Xiong Xiao, et al. Wavlm: Large-scale self-supervised pretraining for full stack speech processing."
      },
      {
       "id": "s-references-64-2",
       "original": "IEEE Journal of Selected Topics in Signal Processing,"
      }
     ]
    },
    {
     "id": "eq-references-6",
     "type": "equation",
     "page": 15,
     "original": "16(6):1505–1518, 2022."
    },
    {
     "id": "p-references-65",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-65-1",
       "original": "[54] Brecht Desplanques, Jenthe Thienpondt, and Kris Demuynck."
      },
      {
       "id": "s-references-65-2",
       "original": "Ecapa-tdnn: Emphasized channel attention, propagation and aggregation in tdnn based speaker verification."
      },
      {
       "id": "s-references-65-3",
       "original": "In Proc."
      },
      {
       "id": "s-references-65-4",
       "original": "Interspeech 2020, pages 3830–3834, 2020."
      }
     ]
    },
    {
     "id": "p-references-66",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-66-1",
       "original": "[55] Wei-Ning Hsu, Benjamin Bolte, Yao-Hung Hubert Tsai, Kushal Lakhotia, Ruslan Salakhutdinov, and Abdelrahman Mohamed."
      },
      {
       "id": "s-references-66-2",
       "original": "Hubert: Self-supervised speech representation learning by masked prediction of hidden units."
      },
      {
       "id": "s-references-66-3",
       "original": "IEEE/ACM transactions on audio, speech, and language processing, 29:3451–3460, 2021."
      }
     ]
    },
    {
     "id": "p-references-67",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-67-1",
       "original": "[56] Zhifu Gao, ShiLiang Zhang, Ian McLoughlin, and Zhijie Yan."
      },
      {
       "id": "s-references-67-2",
       "original": "Paraformer: Fast and accurate parallel transformer for non-autoregressive end-to-end speech recognition."
      },
      {
       "id": "s-references-67-3",
       "original": "In Proc."
      },
      {
       "id": "s-references-67-4",
       "original": "Interspeech 2022, pages 2063–2067, 2022."
      }
     ]
    },
    {
     "id": "p-references-68",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-68-1",
       "original": "[57] ASR Omnilingual, Gil Keren, Artyom Kozhevnikov, Yen Meng, Christophe Ropers, Matthew Setzler, Skyler Wang, Ife Adebara, Michael Auli, Can Balioglu, et al. Omnilingual asr: Opensource multilingual speech recognition for 1600+ languages. arXiv preprint arXiv:2511.09690,"
      }
     ]
    },
    {
     "id": "eq-references-7",
     "type": "equation",
     "page": 15,
     "original": "2025."
    },
    {
     "id": "p-references-69",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-69-1",
       "original": "[58] Alec Radford, Jong Wook Kim, Tao Xu, Greg Brockman, Christine McLeavey, and Ilya Sutskever."
      },
      {
       "id": "s-references-69-2",
       "original": "Robust speech recognition via large-scale weak supervision."
      },
      {
       "id": "s-references-69-3",
       "original": "In International conference on machine learning, pages 28492–28518."
      },
      {
       "id": "s-references-69-4",
       "original": "PMLR, 2023."
      }
     ]
    },
    {
     "id": "p-references-70",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-70-1",
       "original": "[59] Takaaki Saeki, Detai Xin, Wataru Nakata, Tomoki Koriyama, Shinnosuke Takamichi, and Hiroshi Saruwatari."
      },
      {
       "id": "s-references-70-2",
       "original": "Utmos: Utokyo-sarulab system for voicemos challenge 2022."
      },
      {
       "id": "s-references-70-3",
       "original": "Interspeech"
      }
     ]
    },
    {
     "id": "eq-references-8",
     "type": "equation",
     "page": 15,
     "original": "2022, 2022."
    },
    {
     "id": "p-references-71",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-71-1",
       "original": "[60] Keyu An, Qian Chen, Chong Deng, Zhihao Du, Changfeng Gao, Zhifu Gao, Yue Gu, Ting He, Hangrui Hu, Kai Hu, et al. Funaudiollm: Voice understanding and generation foundation models for natural interaction between humans and llms. arXiv preprint arXiv:2407.04051,"
      }
     ]
    },
    {
     "id": "eq-references-9",
     "type": "equation",
     "page": 15,
     "original": "2024."
    },
    {
     "id": "p-references-72",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-72-1",
       "original": "[61] Heiga Zen, Viet Dang, Rob Clark, Yu Zhang, Ron J Weiss, Ye Jia, Zhifeng Chen, and Yonghui Wu."
      },
      {
       "id": "s-references-72-2",
       "original": "Libritts: A corpus derived from librispeech for text-to-speech."
      },
      {
       "id": "s-references-72-3",
       "original": "In Proc."
      },
      {
       "id": "s-references-72-4",
       "original": "Interspeech 2019, pages 1526–1530, 2019."
      }
     ]
    },
    {
     "id": "p-references-73",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-73-1",
       "original": "[62] Rosana Ardila, Megan Branson, Kelly Davis, Michael Kohler, Josh Meyer, Michael Henretty, Reuben Morais, Lindsay Saunders, Francis Tyers, and Gregor Weber."
      }
     ]
    },
    {
     "id": "p-references-74",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-74-1",
       "original": "Common voice: A massively-multilingual speech corpus."
      },
      {
       "id": "s-references-74-2",
       "original": "In Proceedings of the Twelfth Language Resources and Evaluation Conference, pages 4218–4222, 2020."
      }
     ]
    },
    {
     "id": "p-references-75",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-75-1",
       "original": "[63] Yifan Yang, Zheshu Song, Jianheng Zhuo, Mingyu Cui, Jinpeng Li, Bo Yang, Yexing Du, Ziyang Ma, Xunying Liu, Ziyuan Wang, et al. Gigaspeech 2: An evolving, large-scale and multi-domain asr corpus for low-resource languages with automated crawling, transcription and refinement."
      },
      {
       "id": "s-references-75-2",
       "original": "In Proceedings of the 63rd Annual Meeting of the Association for Computational Linguistics (Volume 1: Long Papers), pages 2673–2686, 2025."
      }
     ]
    },
    {
     "id": "p-references-76",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-76-1",
       "original": "[64] Nithin Rao Koluguri, Monica Sekoyan, George Zelenfroynd, Sasha Meister, Shuoyang Ding, Sofia Kostandian, He Huang, Nikolay Karpov, Jagadeesh Balam, Vitaly Lavrukhin, et al. Granary: Speech recognition and translation dataset in 25 european languages. arXiv preprint arXiv:2505.13404, 2025."
      }
     ]
    },
    {
     "id": "p-references-77",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-77-1",
       "original": "[65] Samuel Pfisterer, Florian Grötschla, Luca A Lanzendörfer, Florian Yan, and Roger Wattenhofer."
      },
      {
       "id": "s-references-77-2",
       "original": "Eurospeech: A multilingual speech corpus. arXiv preprint arXiv:2510.00514, 2025."
      }
     ]
    },
    {
     "id": "p-references-78",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-78-1",
       "original": "[66] Ashwin Sankar, Srija Anand, Praveen Varadhan, Sherry Thomas, Mehak Singal, Shridhar Kumar, Deovrat Mehendale, Aditi Krishana, Giri Raju, and Mitesh Khapra."
      },
      {
       "id": "s-references-78-2",
       "original": "Indicvoices-r: Unlocking a massive multilingual multi-speaker speech corpus for scaling indian tts."
      },
      {
       "id": "s-references-78-3",
       "original": "Advances in Neural Information Processing Systems, 37:68161–68182, 2024."
      }
     ]
    },
    {
     "id": "p-references-79",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-79-1",
       "original": "[67] Gokul Karthik Kumar, SV Praveen, Pratyush Kumar, Mitesh M Khapra, and Karthik Nandakumar."
      },
      {
       "id": "s-references-79-2",
       "original": "Towards building text-to-speech systems for the next billion users."
      },
      {
       "id": "s-references-79-3",
       "original": "In Icassp 2023-2023 ieee international conference on acoustics, speech and signal processing (icassp), pages 1–5."
      }
     ]
    },
    {
     "id": "p-references-80",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-80-1",
       "original": "IEEE, 2023."
      }
     ]
    },
    {
     "id": "p-references-81",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-81-1",
       "original": "[68] Praveen Srinivasa Varadhan, Ashwin Sankar, Giri Raju, and Mitesh M Khapra."
      },
      {
       "id": "s-references-81-2",
       "original": "Rasa: Building expressive speech synthesis systems for indian languages in low-resource settings."
      },
      {
       "id": "s-references-81-3",
       "original": "In Proc."
      }
     ]
    },
    {
     "id": "p-references-82",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-82-1",
       "original": "Interspeech 2024, pages 1830–1834, 2024."
      }
     ]
    },
    {
     "id": "p-references-83",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-83-1",
       "original": "[69] Thi Vu, Linh The Nguyen, and Dat Quoc Nguyen."
      },
      {
       "id": "s-references-83-2",
       "original": "Zero-shot text-to-speech for vietnamese."
      },
      {
       "id": "s-references-83-3",
       "original": "In Proceedings of ACL, 2025."
      }
     ]
    },
    {
     "id": "p-references-84",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-84-1",
       "original": "[70] Frederico S Oliveira, Edresson Casanova, Arnaldo Candido Junior, Anderson S Soares, and Arlindo R Galvão Filho."
      },
      {
       "id": "s-references-84-2",
       "original": "Cml-tts: A multilingual dataset for speech synthesis in low-resource languages."
      },
      {
       "id": "s-references-84-3",
       "original": "In International Conference on Text, Speech, and Dialogue, pages 188–199."
      },
      {
       "id": "s-references-84-4",
       "original": "Springer,"
      }
     ]
    },
    {
     "id": "eq-references-10",
     "type": "equation",
     "page": 16,
     "original": "2023."
    },
    {
     "id": "p-references-85",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-85-1",
       "original": "[71] Longhao Li, Zhao Guo, Hongjie Chen, Yuhang Dai, Ziyu Zhang, Hongfei Xue, Tianlun Zuo, Chengyou Wang, Shuiyuan Wang, Jie Li, et al. Wenetspeech-yue: A large-scale cantonese speech corpus with multi-dimensional annotation. arXiv preprint arXiv:2509.03959, 2025."
      }
     ]
    },
    {
     "id": "p-references-86",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-86-1",
       "original": "[72] Yuhang Dai, Ziyu Zhang, Shuai Wang, Longhao Li, Zhao Guo, Tianlun Zuo, Shuiyuan Wang, Hongfei Xue, Chengyou Wang, Qing Wang, et al."
      }
     ]
    },
    {
     "id": "p-references-87",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-87-1",
       "original": "Wenetspeech-chuan: A largescale sichuanese corpus with rich annotation for dialectal speech processing. arXiv preprint arXiv:2509.18004, 2025."
      }
     ]
    },
    {
     "id": "p-references-88",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-88-1",
       "original": "[73] Zhiyuan Tang, Dong Wang, Yanguang Xu, Jianwei Sun, Xiaoning Lei, Shuaijiang Zhao, Cheng Wen, Xingjun Tan, Chuandong Xie, Shuran Zhou, et al. Kespeech: An open source speech dataset of mandarin and its eight subdialects."
      },
      {
       "id": "s-references-88-2",
       "original": "In Thirty-fifth conference on neural information processing systems datasets and benchmarks track (Round 2), 2021."
      }
     ]
    },
    {
     "id": "p-references-89",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-89-1",
       "original": "[74] Xian Shi, Fan Yu, Yizhou Lu, Yuhao Liang, Qiangze Feng, Daliang Wang, Yanmin Qian, and Lei Xie."
      },
      {
       "id": "s-references-89-2",
       "original": "The accented english speech recognition challenge 2020: open datasets, tracks, baselines, results and methods."
      },
      {
       "id": "s-references-89-3",
       "original": "In ICASSP 2021-2021 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP), pages 6918–6922."
      },
      {
       "id": "s-references-89-4",
       "original": "IEEE, 2021."
      }
     ]
    },
    {
     "id": "p-references-90",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-90-1",
       "original": "[75] Jeong-Uk Bang, Seung Yun, Seung-Hi Kim, Mu-Yeol Choi, Min-Kyu Lee, Yeo-Jeong Kim, Dong-Hyun Kim, Jun Park, Young-Jik Lee, and Sang-Hun Kim."
      },
      {
       "id": "s-references-90-2",
       "original": "Ksponspeech: Korean spontaneous speech corpus for automatic speech recognition."
      },
      {
       "id": "s-references-90-3",
       "original": "Applied Sciences, 10(19):6936, 2020."
      }
     ]
    },
    {
     "id": "p-references-91",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-91-1",
       "original": "[76] YYDMS Fujimoto."
      },
      {
       "id": "s-references-91-2",
       "original": "Reazonspeech: A free and massive corpus for japanese asr, 2016."
      }
     ]
    },
    {
     "id": "p-references-92",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-92-1",
       "original": "[77] Cancan Li, Fei Su, Juan Liu, Hui Bu, Yulong Wan, Hongbin Suo, and Ming Li."
      },
      {
       "id": "s-references-92-2",
       "original": "Aishell6- whisper: A chinese mandarin audio-visual whisper speech dataset with speech recognition baselines. arXiv preprint arXiv:2509.23833, 2025."
      }
     ]
    },
    {
     "id": "p-references-93",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-93-1",
       "original": "[78] Anuj Diwan, Zhisheng Zheng, David Harwath, and Eunsol Choi."
      },
      {
       "id": "s-references-93-2",
       "original": "Scaling rich style-prompted text-to-speech datasets."
      },
      {
       "id": "s-references-93-3",
       "original": "In Proceedings of the 2025 Conference on Empirical Methods in Natural Language Processing, pages 3639–3659, 2025."
      }
     ]
    },
    {
     "id": "p-references-94",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-94-1",
       "original": "[79] Yang Chen, Hui Wang, Shiyao Wang, Junyang Chen, Jiabei He, Jiaming Zhou, Xi Yang, Yequan Wang, Yonghua Lin, and Yong Qin."
      },
      {
       "id": "s-references-94-2",
       "original": "Seniortalk: A chinese conversation dataset with rich annotations for super-aged seniors, 2025."
      }
     ]
    },
    {
     "id": "p-references-95",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-95-1",
       "original": "[80] Jiaming Zhou, Shiyao Wang, Shiwan Zhao, Jiabei He, Haoqin Sun, Hui Wang, Cheng Liu, Aobo Kong, Yujie Guo, and Yong Qin."
      },
      {
       "id": "s-references-95-2",
       "original": "Childmandarin: A comprehensive mandarin speech dataset for young children aged 3-5. arXiv preprint arXiv:2409.18584, 2024."
      }
     ]
    },
    {
     "id": "p-references-96",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-96-1",
       "original": "[81] Saida Mussakhojayeva, Yerbolat Khassanov, and Huseyin Atakan Varol."
      },
      {
       "id": "s-references-96-2",
       "original": "Ksc2: An industrialscale open-source kazakh speech corpus."
      },
      {
       "id": "s-references-96-3",
       "original": "In Interspeech 2022, pages 1367–1371, 2022."
      }
     ]
    },
    {
     "id": "p-references-97",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-97-1",
       "original": "[82] Ajinkya Kulkarni, Atharva Kulkarni, Sara Abedalmon’em Mohammad Shatnawi, and Hanan Aldarmaki."
      },
      {
       "id": "s-references-97-2",
       "original": "Clartts: An open-source classical arabic text-to-speech corpus."
      },
      {
       "id": "s-references-97-3",
       "original": "In Proc."
      },
      {
       "id": "s-references-97-4",
       "original": "Interspeech 2023, pages 5511–5515, 2023."
      }
     ]
    },
    {
     "id": "p-references-98",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-98-1",
       "original": "[83] Hawau Toyin, Rufael Marew, Humaid Alblooshi, Samar M Magdy, and Hanan Aldarmaki."
      }
     ]
    },
    {
     "id": "p-references-99",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-99-1",
       "original": "Arvoice: A multi-speaker dataset for arabic speech synthesis."
      }
     ]
    },
    {
     "id": "p-references-100",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-100-1",
       "original": "In Proc."
      },
      {
       "id": "s-references-100-2",
       "original": "Interspeech 2025, pages 4808–4812, 2025."
      }
     ]
    },
    {
     "id": "p-references-101",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-101-1",
       "original": "[84] Saida Mussakhojayeva, Yerbolat Khassanov, and Huseyin Atakan Varol."
      },
      {
       "id": "s-references-101-2",
       "original": "Kazakhtts2: Extending the open-source kazakh tts corpus with more data, speakers, and topics."
      },
      {
       "id": "s-references-101-3",
       "original": "In Proceedings of the Thirteenth Language Resources and Evaluation Conference, pages 5404–5411, 2022."
      }
     ]
    },
    {
     "id": "p-references-102",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-102-1",
       "original": "[85] Zhiqiang Liu, Zhiqiang Ma, Xiaoxu Zhang, Caijilahu Bao, Xiulan Xie, and Fangyuan Zhu."
      }
     ]
    },
    {
     "id": "p-references-103",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-103-1",
       "original": "Imut-mc: A speech corpus for mongolian speech recognition."
      },
      {
       "id": "s-references-103-2",
       "original": "China Sci."
      },
      {
       "id": "s-references-103-3",
       "original": "Data, 7:13, 2022."
      }
     ]
    },
    {
     "id": "p-references-104",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-104-1",
       "original": "[86] Ahmed Ali, Peter Bell, James Glass, Yacine Messaoui, Hamdy Mubarak, Steve Renals, and Yifan Zhang."
      },
      {
       "id": "s-references-104-2",
       "original": "The mgb-2 challenge: Arabic multi-dialect broadcast media recognition."
      },
      {
       "id": "s-references-104-3",
       "original": "In 2016 IEEE Spoken Language Technology Workshop (SLT), pages 279–284."
      },
      {
       "id": "s-references-104-4",
       "original": "IEEE, 2016."
      }
     ]
    },
    {
     "id": "p-references-105",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-105-1",
       "original": "[87] Ahmed Ali, Stephan Vogel, and Steve Renals."
      },
      {
       "id": "s-references-105-2",
       "original": "Speech recognition challenge in the wild: Arabic mgb-3."
      },
      {
       "id": "s-references-105-3",
       "original": "In 2017 IEEE Automatic Speech Recognition and Understanding Workshop (ASRU), pages 316–322."
      },
      {
       "id": "s-references-105-4",
       "original": "IEEE, 2017."
      }
     ]
    },
    {
     "id": "p-references-106",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-106-1",
       "original": "[88] Ahmed Ali, Suwon Shon, Younes Samih, Hamdy Mubarak, Ahmed Abdelali, James Glass, Steve Renals, and Khalid Choukri."
      },
      {
       "id": "s-references-106-2",
       "original": "The mgb-5 challenge: Recognition and dialect identification of dialectal arabic speech."
      },
      {
       "id": "s-references-106-3",
       "original": "In 2019 IEEE Automatic Speech Recognition and Understanding Workshop (ASRU), pages 1026–1033."
      },
      {
       "id": "s-references-106-4",
       "original": "IEEE, 2019."
      }
     ]
    },
    {
     "id": "p-references-107",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-107-1",
       "original": "[89] Sadeen Alharbi, Areeb Alowisheq, Zoltán Tüske, Kareem Darwish, Abdullah Alrajeh, Abdulmajeed Alrowithi, Aljawharah Bin Tamran, Asma Ibrahim, Raghad Aloraini, Raneem Alnajim, et al. Sada: Saudi audio dataset for arabic."
      },
      {
       "id": "s-references-107-2",
       "original": "In ICASSP 2024-2024 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP), pages 10286–10290."
      },
      {
       "id": "s-references-107-3",
       "original": "IEEE,"
      }
     ]
    },
    {
     "id": "eq-references-11",
     "type": "equation",
     "page": 17,
     "original": "2024."
    },
    {
     "id": "p-references-108",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-108-1",
       "original": "[90] Mohammad Al-Fetyani, Muhammad Al-Barham, Gheith Abandah, Adham Alsharkawi, and Maha Dawas."
      },
      {
       "id": "s-references-108-2",
       "original": "Masc: Massive arabic speech corpus."
      },
      {
       "id": "s-references-108-3",
       "original": "In 2022 IEEE Spoken Language Technology Workshop (SLT), pages 1006–1013."
      },
      {
       "id": "s-references-108-4",
       "original": "IEEE, 2023."
      }
     ]
    },
    {
     "id": "p-references-109",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-109-1",
       "original": "[91] Maryam Khalifa Al Ali and Hanan Aldarmaki."
      },
      {
       "id": "s-references-109-2",
       "original": "Mixat: A data set of bilingual emirati-english speech."
      },
      {
       "id": "s-references-109-3",
       "original": "In Proceedings of the 3rd Annual Meeting of the Special Interest Group on Underresourced Languages@ LREC-COLING 2024, pages 222–226, 2024."
      }
     ]
    },
    {
     "id": "p-references-110",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-110-1",
       "original": "[92] Kak Soky, Zhuo Gong, and Sheng Li."
      },
      {
       "id": "s-references-110-2",
       "original": "NICT-Tib1: A Public Speech Corpus of Lhasa Dialect for Benchmarking Tibetan Language Speech Recognition Systems."
      },
      {
       "id": "s-references-110-3",
       "original": "In Proc."
      },
      {
       "id": "s-references-110-4",
       "original": "O-COCOSDA, pages 1–5, 2022."
      }
     ]
    },
    {
     "id": "p-references-111",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-111-1",
       "original": "[93] Yue Zhao, Xiaona Xu, Jianjian Yue, Wei Song, Xiali Li, Licheng Wu, and Qiang Ji."
      },
      {
       "id": "s-references-111-2",
       "original": "An open speech resource for tibetan multi-dialect and multitask recognition."
      },
      {
       "id": "s-references-111-3",
       "original": "International Journal of Computational Science and Engineering, 22(2/3):297–304, 2020."
      }
     ]
    },
    {
     "id": "p-references-112",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-112-1",
       "original": "[94] Senyan Li, Guanyu Li, and Jiewen Ning."
      },
      {
       "id": "s-references-112-2",
       "original": "Xbmu-amdo31: An open source of amdo tibetan speech database and speech recognition baseline system."
      },
      {
       "id": "s-references-112-3",
       "original": "In National Conference on ManMachine Speech Communication, NCMMSC2022, 2022."
      }
     ]
    },
    {
     "id": "p-references-113",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-113-1",
       "original": "[95] Linfei Lu, Jiaxin Pang, Stansencuo, Buwonglam, and Linting Huang."
      },
      {
       "id": "s-references-113-2",
       "original": "Tibetan greetings. http: //www.openslr.org/149/."
      }
     ]
    }
   ]
  },
  {
   "id": "sec-A",
   "num": "A",
   "level": 1,
   "page": 18,
   "title": {
    "original": "Complete List of Multilingual Training Data",
    "zh": "附录 A 多语训练数据完整清单"
   },
   "blocks": [
    {
     "id": "p-A-1",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-A-1-1",
       "original": "We used the following datasets to train OmniVoice:",
       "zh": "我们使用以下数据集训练 OmniVoice："
      }
     ]
    },
    {
     "id": "p-A-2",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-A-2-1",
       "original": "Emilia [46], Emilia-YODAS [46], LibriTTS [61], Common Voice [62], VoxBox [7], Meta Omnilingual ASR Corpus [57], FLEURS [52], GigaSpeech 2 [63], YODAS-Granary [64], EuroSpeech [65], IndicVoices-R [66], IndicTTS [67], Rasa [68], PhoAudiobook [69], viVoice2, CML- TTS [70], Wenetspeech-yue [71], Wenetspeech-chuan [72], Kespeech [73], AESRC [74], Ksponspeech [75], Reazonspeech [76], AISHELL6-whisper [77], ParaSpeechCaps [78], Nvspeech [30], NonVerbalSpeech-38K [45], SeniorTalk [79], ChildMandarin [80], KSC2 [81], ClArTTS [82], ArVoice [83], KazakhTTS2 [84], RuLS3, IMUT-MC [85], HUI-Audio-Corpus-German4, MGB- 2 [86], MGB-3 [87], MGB-5 [88], SADA [89], MASC [90], Mixat [91], Arabic datasets found from [37] (darija speech to text5, DarijaTTS-clean6, Jordan-Audio7, UAE 100K8), NICT-Tib1 [92], TIBMD@MUC [93], XBMU-AMDO3 [94], Tibetan-Greetings [95].",
       "zh": "Emilia [46]、Emilia-YODAS [46]、LibriTTS [61]、Common Voice [62]、VoxBox [7]、Meta Omnilingual ASR Corpus [57]、FLEURS [52]、GigaSpeech 2 [63]、YODAS-Granary [64]、EuroSpeech [65]、IndicVoices-R [66]、IndicTTS [67]、Rasa [68]、PhoAudiobook [69]、viVoice2、CML-TTS [70]、Wenetspeech-yue [71]、Wenetspeech-chuan [72]、Kespeech [73]、AESRC [74]、Ksponspeech [75]、Reazonspeech [76]、AISHELL6-whisper [77]、ParaSpeechCaps [78]、Nvspeech [30]、NonVerbalSpeech-38K [45]、SeniorTalk [79]、ChildMandarin [80]、KSC2 [81]、ClArTTS [82]、ArVoice [83]、KazakhTTS2 [84]、RuLS3、IMUT-MC [85]、HUI-Audio-Corpus-German4、MGB-2 [86]、MGB-3 [87]、MGB-5 [88]、SADA [89]、MASC [90]、Mixat [91]、来自 [37] 的阿拉伯语数据集（darija speech to text5、DarijaTTS-clean6、Jordan-Audio7、UAE 100K8）、NICT-Tib1 [92]、TIBMD@MUC [93]、XBMU-AMDO3 [94]、Tibetan-Greetings [95]。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-B",
   "num": "B",
   "level": 1,
   "page": 18,
   "title": {
    "original": "Results of Different Inference Steps",
    "zh": "附录 B 不同推理步数的结果"
   },
   "blocks": [
    {
     "id": "p-B-1",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-B-1-1",
       "original": "In Table 9, we evaluate the multilingual version OmniVoice model with different inference steps on English and Chinese benchmarks.",
       "zh": "在表 9 中，我们在中英文基准上评估了多语版 OmniVoice 模型在不同推理步数下的表现。"
      }
     ]
    },
    {
     "id": "tab-B-1",
     "type": "table_caption",
     "page": 18,
     "original": "Table 9: Objective evaluation results of OmniVoice with different inference steps.",
     "zh": "表 9：OmniVoice 在不同推理步数下的客观评估结果。"
    },
    {
     "id": "p-B-2",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-B-2-1",
       "original": "LibriSpeech-PC test-clean Seed-TTS test-en Seed-TTS test-zh Steps SIM-o ↑ WER ↓ UTMOS ↑ SIM-o ↑ WER ↓ UTMOS ↑ SIM-o ↑ WER ↓ UTMOS ↑",
       "zh": "表头：LibriSpeech-PC test-clean / Seed-TTS test-en / Seed-TTS test-zh × Steps（SIM-o ↑ / WER ↓ / UTMOS ↑ 各组）。"
      }
     ]
    },
    {
     "id": "eq-B-1",
     "type": "equation",
     "page": 18,
     "original": "64 0.729 1.28 4.30 0.742 1.60 3.92 0.777 0.81 3.13 32 0.729 1.30 4.28 0.741 1.53 3.91 0.777 0.84 3.11 16 0.728 1.50 4.23 0.735 1.72 3.92 0.773 0.99 3.00 8 0.713 2.02 4.02 0.716 1.94 3.59 0.756 1.58 2.72"
    },
    {
     "id": "p-B-3",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-B-3-1",
       "original": "2https://huggingface.co/datasets/capleaf/viVoice 3https://www.openslr.org/96/ 4https://huggingface.co/datasets/Paradoxia/opendata-iisys-hui 5https://huggingface.co/datasets/adiren7/darija_speech_to_text 6https://huggingface.co/datasets/KandirResearch/DarijaTTS-clean 7https://huggingface.co/datasets/nadsoft/Jordan-Audio 8https://huggingface.co/datasets/AhmedBadawy11/UAE_100K",
       "zh": "（脚注 2：https://huggingface.co/datasets/capleaf/viVoice；3：https://www.openslr.org/96/；4：https://huggingface.co/datasets/Paradoxia/opendata-iisys-hui；5：https://huggingface.co/datasets/adiren7/darija_speech_to_text；6：https://huggingface.co/datasets/KandirResearch/DarijaTTS-clean；7：https://huggingface.co/datasets/nadsoft/Jordan-Audio；8：https://huggingface.co/datasets/AhmedBadawy11/UAE_100K）"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-C",
   "num": "C",
   "level": 1,
   "page": 19,
   "title": {
    "original": "Detailed Results on FLEURS-Multilingual-102",
    "zh": "附录 C FLEURS-Multilingual-102 详细结果"
   },
   "blocks": [
    {
     "id": "p-C-1",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-C-1-1",
       "original": "Per-language CERs of of ground-truth and OmniVoice on FLEURS-Multilingual-102 is shown in Fig. 4.",
       "zh": "真实语音与 OmniVoice 在 FLEURS-Multilingual-102 上的逐语言 CER 如图 4 所示。"
      }
     ]
    },
    {
     "id": "tab-C-1",
     "type": "table_caption",
     "page": 19,
     "original": "Table 10: Per-language CERs of ground-truth and OmniVoice on FLEURS-Multilingual-102",
     "zh": "表 10：真实语音与 OmniVoice 在 FLEURS-Multilingual-102 上的逐语言 CER。"
    }
   ]
  },
  {
   "id": "sec-language",
   "num": null,
   "level": 2,
   "page": 19,
   "title": {
    "original": "Language",
    "zh": "Language"
   },
   "blocks": [
    {
     "id": "p-language-1",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-language-1-1",
       "original": "Ground-truth OmniVoice Language Ground-truth OmniVoice Afrikaans",
       "zh": "表头：Ground-truth / OmniVoice × Language——Afrikaans（后续照原文）。"
      }
     ]
    },
    {
     "id": "eq-language-1",
     "type": "equation",
     "page": 19,
     "original": "3.54 3.08"
    },
    {
     "id": "eq-language-2",
     "type": "equation",
     "page": 19,
     "original": "Amharic"
    },
    {
     "id": "eq-language-3",
     "type": "equation",
     "page": 19,
     "original": "4.98 7.30"
    },
    {
     "id": "eq-language-4",
     "type": "equation",
     "page": 19,
     "original": "Armenian"
    },
    {
     "id": "eq-language-5",
     "type": "equation",
     "page": 19,
     "original": "1.38 1.45"
    },
    {
     "id": "eq-language-6",
     "type": "equation",
     "page": 19,
     "original": "Assamese"
    },
    {
     "id": "eq-language-7",
     "type": "equation",
     "page": 19,
     "original": "5.29 3.92"
    },
    {
     "id": "eq-language-8",
     "type": "equation",
     "page": 19,
     "original": "Asturian"
    },
    {
     "id": "eq-language-9",
     "type": "equation",
     "page": 19,
     "original": "3.79 2.07"
    },
    {
     "id": "eq-language-10",
     "type": "equation",
     "page": 19,
     "original": "Azerbaijani"
    },
    {
     "id": "eq-language-11",
     "type": "equation",
     "page": 19,
     "original": "2.60 3.20"
    },
    {
     "id": "eq-language-12",
     "type": "equation",
     "page": 19,
     "original": "Belarusian"
    },
    {
     "id": "eq-language-13",
     "type": "equation",
     "page": 19,
     "original": "1.80 1.00"
    },
    {
     "id": "eq-language-14",
     "type": "equation",
     "page": 19,
     "original": "Bengali"
    },
    {
     "id": "eq-language-15",
     "type": "equation",
     "page": 19,
     "original": "4.10 3.08"
    },
    {
     "id": "eq-language-16",
     "type": "equation",
     "page": 19,
     "original": "Bosnian"
    },
    {
     "id": "eq-language-17",
     "type": "equation",
     "page": 19,
     "original": "1.61 0.66"
    },
    {
     "id": "eq-language-18",
     "type": "equation",
     "page": 19,
     "original": "Bulgarian"
    },
    {
     "id": "eq-language-19",
     "type": "equation",
     "page": 19,
     "original": "1.66 0.87"
    },
    {
     "id": "eq-language-20",
     "type": "equation",
     "page": 19,
     "original": "Burmese"
    },
    {
     "id": "eq-language-21",
     "type": "equation",
     "page": 19,
     "original": "6.77 12.20"
    },
    {
     "id": "eq-language-22",
     "type": "equation",
     "page": 19,
     "original": "Cantonese"
    },
    {
     "id": "eq-language-23",
     "type": "equation",
     "page": 19,
     "original": "11.01 21.92"
    },
    {
     "id": "eq-language-24",
     "type": "equation",
     "page": 19,
     "original": "Catalan"
    },
    {
     "id": "eq-language-25",
     "type": "equation",
     "page": 19,
     "original": "1.17 0.86"
    },
    {
     "id": "eq-language-26",
     "type": "equation",
     "page": 19,
     "original": "Cebuano"
    },
    {
     "id": "eq-language-27",
     "type": "equation",
     "page": 19,
     "original": "1.74 1.81"
    },
    {
     "id": "eq-language-28",
     "type": "equation",
     "page": 19,
     "original": "Central Kurdish"
    },
    {
     "id": "eq-language-29",
     "type": "equation",
     "page": 19,
     "original": "3.92 2.97"
    },
    {
     "id": "eq-language-30",
     "type": "equation",
     "page": 19,
     "original": "Chichewa"
    },
    {
     "id": "eq-language-31",
     "type": "equation",
     "page": 19,
     "original": "4.63 3.32"
    },
    {
     "id": "eq-language-32",
     "type": "equation",
     "page": 19,
     "original": "Chinese"
    },
    {
     "id": "eq-language-33",
     "type": "equation",
     "page": 19,
     "original": "5.54 3.16"
    },
    {
     "id": "eq-language-34",
     "type": "equation",
     "page": 19,
     "original": "Croatian"
    },
    {
     "id": "eq-language-35",
     "type": "equation",
     "page": 19,
     "original": "4.64 0.93"
    },
    {
     "id": "eq-language-36",
     "type": "equation",
     "page": 19,
     "original": "Czech"
    },
    {
     "id": "eq-language-37",
     "type": "equation",
     "page": 19,
     "original": "2.19 1.21"
    },
    {
     "id": "eq-language-38",
     "type": "equation",
     "page": 19,
     "original": "Danish"
    },
    {
     "id": "eq-language-39",
     "type": "equation",
     "page": 19,
     "original": "2.86 1.79"
    },
    {
     "id": "eq-language-40",
     "type": "equation",
     "page": 19,
     "original": "Dutch"
    },
    {
     "id": "eq-language-41",
     "type": "equation",
     "page": 19,
     "original": "2.01 1.87"
    },
    {
     "id": "eq-language-42",
     "type": "equation",
     "page": 19,
     "original": "English"
    },
    {
     "id": "eq-language-43",
     "type": "equation",
     "page": 19,
     "original": "2.63 1.67"
    },
    {
     "id": "eq-language-44",
     "type": "equation",
     "page": 19,
     "original": "Estonian"
    },
    {
     "id": "eq-language-45",
     "type": "equation",
     "page": 19,
     "original": "0.97 1.03"
    },
    {
     "id": "eq-language-46",
     "type": "equation",
     "page": 19,
     "original": "Filipino"
    },
    {
     "id": "eq-language-47",
     "type": "equation",
     "page": 19,
     "original": "2.34 1.24"
    },
    {
     "id": "eq-language-48",
     "type": "equation",
     "page": 19,
     "original": "Finnish"
    },
    {
     "id": "eq-language-49",
     "type": "equation",
     "page": 19,
     "original": "1.60 1.46"
    },
    {
     "id": "eq-language-50",
     "type": "equation",
     "page": 19,
     "original": "French"
    },
    {
     "id": "eq-language-51",
     "type": "equation",
     "page": 19,
     "original": "2.13 1.95"
    },
    {
     "id": "eq-language-52",
     "type": "equation",
     "page": 19,
     "original": "Fulah"
    },
    {
     "id": "eq-language-53",
     "type": "equation",
     "page": 19,
     "original": "12.33 7.70"
    },
    {
     "id": "eq-language-54",
     "type": "equation",
     "page": 19,
     "original": "Galician"
    },
    {
     "id": "eq-language-55",
     "type": "equation",
     "page": 19,
     "original": "1.52 1.03"
    },
    {
     "id": "eq-language-56",
     "type": "equation",
     "page": 19,
     "original": "Ganda"
    },
    {
     "id": "eq-language-57",
     "type": "equation",
     "page": 19,
     "original": "7.87 6.60"
    },
    {
     "id": "eq-language-58",
     "type": "equation",
     "page": 19,
     "original": "Georgian"
    },
    {
     "id": "eq-language-59",
     "type": "equation",
     "page": 19,
     "original": "1.78 1.83"
    },
    {
     "id": "eq-language-60",
     "type": "equation",
     "page": 19,
     "original": "German"
    },
    {
     "id": "eq-language-61",
     "type": "equation",
     "page": 19,
     "original": "2.22 1.35"
    },
    {
     "id": "eq-language-62",
     "type": "equation",
     "page": 19,
     "original": "Greek"
    },
    {
     "id": "eq-language-63",
     "type": "equation",
     "page": 19,
     "original": "2.31 1.57"
    },
    {
     "id": "eq-language-64",
     "type": "equation",
     "page": 19,
     "original": "Gujarati"
    },
    {
     "id": "eq-language-65",
     "type": "equation",
     "page": 19,
     "original": "3.06 2.74"
    },
    {
     "id": "eq-language-66",
     "type": "equation",
     "page": 19,
     "original": "Hausa"
    },
    {
     "id": "eq-language-67",
     "type": "equation",
     "page": 19,
     "original": "5.14 3.03"
    },
    {
     "id": "eq-language-68",
     "type": "equation",
     "page": 19,
     "original": "Hebrew"
    },
    {
     "id": "eq-language-69",
     "type": "equation",
     "page": 19,
     "original": "4.91 9.75"
    },
    {
     "id": "eq-language-70",
     "type": "equation",
     "page": 19,
     "original": "Hindi"
    },
    {
     "id": "eq-language-71",
     "type": "equation",
     "page": 19,
     "original": "2.54 2.64"
    },
    {
     "id": "eq-language-72",
     "type": "equation",
     "page": 19,
     "original": "Hungarian"
    },
    {
     "id": "eq-language-73",
     "type": "equation",
     "page": 19,
     "original": "1.75 1.04"
    },
    {
     "id": "eq-language-74",
     "type": "equation",
     "page": 19,
     "original": "Icelandic"
    },
    {
     "id": "eq-language-75",
     "type": "equation",
     "page": 19,
     "original": "2.82 3.77"
    },
    {
     "id": "eq-language-76",
     "type": "equation",
     "page": 19,
     "original": "Igbo"
    },
    {
     "id": "eq-language-77",
     "type": "equation",
     "page": 19,
     "original": "7.75 7.40"
    },
    {
     "id": "eq-language-78",
     "type": "equation",
     "page": 19,
     "original": "Indonesian"
    },
    {
     "id": "eq-language-79",
     "type": "equation",
     "page": 19,
     "original": "1.87 2.95"
    },
    {
     "id": "eq-language-80",
     "type": "equation",
     "page": 19,
     "original": "Irish"
    },
    {
     "id": "eq-language-81",
     "type": "equation",
     "page": 19,
     "original": "17.56 8.52"
    },
    {
     "id": "eq-language-82",
     "type": "equation",
     "page": 19,
     "original": "Italian"
    },
    {
     "id": "eq-language-83",
     "type": "equation",
     "page": 19,
     "original": "1.27 1.56"
    },
    {
     "id": "eq-language-84",
     "type": "equation",
     "page": 19,
     "original": "Japanese"
    },
    {
     "id": "eq-language-85",
     "type": "equation",
     "page": 19,
     "original": "7.70 5.96"
    },
    {
     "id": "eq-language-86",
     "type": "equation",
     "page": 19,
     "original": "Javanese"
    },
    {
     "id": "eq-language-87",
     "type": "equation",
     "page": 19,
     "original": "3.17 2.80"
    },
    {
     "id": "eq-language-88",
     "type": "equation",
     "page": 19,
     "original": "Kabuverdianu"
    },
    {
     "id": "eq-language-89",
     "type": "equation",
     "page": 19,
     "original": "3.29 2.10"
    },
    {
     "id": "eq-language-90",
     "type": "equation",
     "page": 19,
     "original": "Kamba"
    },
    {
     "id": "eq-language-91",
     "type": "equation",
     "page": 19,
     "original": "8.81 10.42"
    },
    {
     "id": "eq-language-92",
     "type": "equation",
     "page": 19,
     "original": "Kannada"
    },
    {
     "id": "eq-language-93",
     "type": "equation",
     "page": 19,
     "original": "2.84 2.70"
    },
    {
     "id": "eq-language-94",
     "type": "equation",
     "page": 19,
     "original": "Kazakh"
    },
    {
     "id": "eq-language-95",
     "type": "equation",
     "page": 19,
     "original": "2.01 3.11"
    },
    {
     "id": "eq-language-96",
     "type": "equation",
     "page": 19,
     "original": "Khmer"
    },
    {
     "id": "eq-language-97",
     "type": "equation",
     "page": 19,
     "original": "6.20 11.48"
    },
    {
     "id": "eq-language-98",
     "type": "equation",
     "page": 19,
     "original": "Kirghiz"
    },
    {
     "id": "eq-language-99",
     "type": "equation",
     "page": 19,
     "original": "2.33 1.80"
    },
    {
     "id": "eq-language-100",
     "type": "equation",
     "page": 19,
     "original": "Korean"
    },
    {
     "id": "eq-language-101",
     "type": "equation",
     "page": 19,
     "original": "3.72 3.78"
    },
    {
     "id": "eq-language-102",
     "type": "equation",
     "page": 19,
     "original": "Lao"
    },
    {
     "id": "eq-language-103",
     "type": "equation",
     "page": 19,
     "original": "22.87 25.51"
    },
    {
     "id": "eq-language-104",
     "type": "equation",
     "page": 19,
     "original": "Latvian"
    },
    {
     "id": "eq-language-105",
     "type": "equation",
     "page": 19,
     "original": "1.87 1.55"
    },
    {
     "id": "eq-language-106",
     "type": "equation",
     "page": 19,
     "original": "Lingala"
    },
    {
     "id": "eq-language-107",
     "type": "equation",
     "page": 19,
     "original": "2.36 1.68"
    },
    {
     "id": "eq-language-108",
     "type": "equation",
     "page": 19,
     "original": "Lithuanian"
    },
    {
     "id": "eq-language-109",
     "type": "equation",
     "page": 19,
     "original": "2.98 2.05"
    },
    {
     "id": "eq-language-110",
     "type": "equation",
     "page": 19,
     "original": "Luo"
    },
    {
     "id": "eq-language-111",
     "type": "equation",
     "page": 19,
     "original": "3.58 3.37"
    },
    {
     "id": "eq-language-112",
     "type": "equation",
     "page": 19,
     "original": "Luxembourgish"
    },
    {
     "id": "eq-language-113",
     "type": "equation",
     "page": 19,
     "original": "5.48 4.52"
    },
    {
     "id": "eq-language-114",
     "type": "equation",
     "page": 19,
     "original": "Macedonian"
    },
    {
     "id": "eq-language-115",
     "type": "equation",
     "page": 19,
     "original": "1.05 0.89"
    },
    {
     "id": "eq-language-116",
     "type": "equation",
     "page": 19,
     "original": "Malay"
    },
    {
     "id": "eq-language-117",
     "type": "equation",
     "page": 19,
     "original": "1.59 1.19"
    },
    {
     "id": "eq-language-118",
     "type": "equation",
     "page": 19,
     "original": "Malayalam"
    },
    {
     "id": "eq-language-119",
     "type": "equation",
     "page": 19,
     "original": "2.99 3.40"
    },
    {
     "id": "eq-language-120",
     "type": "equation",
     "page": 19,
     "original": "Maltese"
    },
    {
     "id": "eq-language-121",
     "type": "equation",
     "page": 19,
     "original": "2.01 3.65"
    },
    {
     "id": "eq-language-122",
     "type": "equation",
     "page": 19,
     "original": "Maori"
    },
    {
     "id": "eq-language-123",
     "type": "equation",
     "page": 19,
     "original": "4.90 1.98"
    },
    {
     "id": "eq-language-124",
     "type": "equation",
     "page": 19,
     "original": "Marathi"
    },
    {
     "id": "eq-language-125",
     "type": "equation",
     "page": 19,
     "original": "5.02 2.76"
    },
    {
     "id": "eq-language-126",
     "type": "equation",
     "page": 19,
     "original": "Mongolian"
    },
    {
     "id": "eq-language-127",
     "type": "equation",
     "page": 19,
     "original": "4.78 4.26"
    },
    {
     "id": "eq-language-128",
     "type": "equation",
     "page": 19,
     "original": "Nepali"
    },
    {
     "id": "eq-language-129",
     "type": "equation",
     "page": 19,
     "original": "4.76 3.43"
    },
    {
     "id": "eq-language-130",
     "type": "equation",
     "page": 19,
     "original": "Norwegian Bokmål"
    },
    {
     "id": "eq-language-131",
     "type": "equation",
     "page": 19,
     "original": "1.50 1.14"
    },
    {
     "id": "eq-language-132",
     "type": "equation",
     "page": 19,
     "original": "Occitan"
    },
    {
     "id": "eq-language-133",
     "type": "equation",
     "page": 19,
     "original": "9.63 6.99"
    },
    {
     "id": "eq-language-134",
     "type": "equation",
     "page": 19,
     "original": "Odia"
    },
    {
     "id": "eq-language-135",
     "type": "equation",
     "page": 19,
     "original": "5.77 5.53"
    },
    {
     "id": "eq-language-136",
     "type": "equation",
     "page": 19,
     "original": "Oromo"
    },
    {
     "id": "eq-language-137",
     "type": "equation",
     "page": 19,
     "original": "12.50 4.97"
    },
    {
     "id": "eq-language-138",
     "type": "equation",
     "page": 19,
     "original": "Panjabi"
    },
    {
     "id": "eq-language-139",
     "type": "equation",
     "page": 19,
     "original": "5.76 2.95"
    },
    {
     "id": "eq-language-140",
     "type": "equation",
     "page": 19,
     "original": "Pedi"
    },
    {
     "id": "eq-language-141",
     "type": "equation",
     "page": 19,
     "original": "4.88 4.44"
    },
    {
     "id": "eq-language-142",
     "type": "equation",
     "page": 19,
     "original": "Persian"
    },
    {
     "id": "eq-language-143",
     "type": "equation",
     "page": 19,
     "original": "1.57 1.90"
    },
    {
     "id": "eq-language-144",
     "type": "equation",
     "page": 19,
     "original": "Polish"
    },
    {
     "id": "eq-language-145",
     "type": "equation",
     "page": 19,
     "original": "1.14 0.61"
    },
    {
     "id": "eq-language-146",
     "type": "equation",
     "page": 19,
     "original": "Portuguese"
    },
    {
     "id": "eq-language-147",
     "type": "equation",
     "page": 19,
     "original": "1.45 1.22"
    },
    {
     "id": "eq-language-148",
     "type": "equation",
     "page": 19,
     "original": "Pushto"
    },
    {
     "id": "eq-language-149",
     "type": "equation",
     "page": 19,
     "original": "11.42 5.53"
    },
    {
     "id": "eq-language-150",
     "type": "equation",
     "page": 19,
     "original": "Romanian"
    },
    {
     "id": "eq-language-151",
     "type": "equation",
     "page": 19,
     "original": "2.15 0.94"
    },
    {
     "id": "eq-language-152",
     "type": "equation",
     "page": 19,
     "original": "Russian"
    },
    {
     "id": "eq-language-153",
     "type": "equation",
     "page": 19,
     "original": "1.68 1.10"
    },
    {
     "id": "eq-language-154",
     "type": "equation",
     "page": 19,
     "original": "Serbian"
    },
    {
     "id": "eq-language-155",
     "type": "equation",
     "page": 19,
     "original": "1.36 0.82"
    },
    {
     "id": "eq-language-156",
     "type": "equation",
     "page": 19,
     "original": "Shona"
    },
    {
     "id": "eq-language-157",
     "type": "equation",
     "page": 19,
     "original": "4.07 1.80"
    },
    {
     "id": "eq-language-158",
     "type": "equation",
     "page": 19,
     "original": "Sindhi"
    },
    {
     "id": "eq-language-159",
     "type": "equation",
     "page": 19,
     "original": "5.51 3.26"
    },
    {
     "id": "eq-language-160",
     "type": "equation",
     "page": 19,
     "original": "Slovak"
    },
    {
     "id": "eq-language-161",
     "type": "equation",
     "page": 19,
     "original": "2.76 0.85"
    },
    {
     "id": "eq-language-162",
     "type": "equation",
     "page": 19,
     "original": "Slovenian"
    },
    {
     "id": "eq-language-163",
     "type": "equation",
     "page": 19,
     "original": "2.40 1.20"
    },
    {
     "id": "eq-language-164",
     "type": "equation",
     "page": 19,
     "original": "Somali"
    },
    {
     "id": "eq-language-165",
     "type": "equation",
     "page": 19,
     "original": "10.13 4.86"
    },
    {
     "id": "eq-language-166",
     "type": "equation",
     "page": 19,
     "original": "Spanish"
    },
    {
     "id": "eq-language-167",
     "type": "equation",
     "page": 19,
     "original": "1.08 0.77"
    },
    {
     "id": "eq-language-168",
     "type": "equation",
     "page": 19,
     "original": "Standard Arabic"
    },
    {
     "id": "eq-language-169",
     "type": "equation",
     "page": 19,
     "original": "2.58 1.92"
    },
    {
     "id": "eq-language-170",
     "type": "equation",
     "page": 19,
     "original": "Swahili"
    },
    {
     "id": "eq-language-171",
     "type": "equation",
     "page": 19,
     "original": "2.41 1.37"
    },
    {
     "id": "eq-language-172",
     "type": "equation",
     "page": 19,
     "original": "Swedish"
    },
    {
     "id": "eq-language-173",
     "type": "equation",
     "page": 19,
     "original": "2.14 1.43"
    },
    {
     "id": "eq-language-174",
     "type": "equation",
     "page": 19,
     "original": "Tajik"
    },
    {
     "id": "eq-language-175",
     "type": "equation",
     "page": 19,
     "original": "3.17 2.36"
    },
    {
     "id": "eq-language-176",
     "type": "equation",
     "page": 19,
     "original": "Tamil"
    },
    {
     "id": "eq-language-177",
     "type": "equation",
     "page": 19,
     "original": "4.00 3.77"
    },
    {
     "id": "eq-language-178",
     "type": "equation",
     "page": 19,
     "original": "Telugu"
    },
    {
     "id": "eq-language-179",
     "type": "equation",
     "page": 19,
     "original": "4.51 3.77"
    },
    {
     "id": "eq-language-180",
     "type": "equation",
     "page": 19,
     "original": "Thai"
    },
    {
     "id": "eq-language-181",
     "type": "equation",
     "page": 19,
     "original": "6.98 7.71"
    },
    {
     "id": "eq-language-182",
     "type": "equation",
     "page": 19,
     "original": "Turkish"
    },
    {
     "id": "eq-language-183",
     "type": "equation",
     "page": 19,
     "original": "1.94 2.71"
    },
    {
     "id": "eq-language-184",
     "type": "equation",
     "page": 19,
     "original": "Ukrainian"
    },
    {
     "id": "eq-language-185",
     "type": "equation",
     "page": 19,
     "original": "1.45 1.23"
    },
    {
     "id": "eq-language-186",
     "type": "equation",
     "page": 19,
     "original": "Umbundu"
    },
    {
     "id": "eq-language-187",
     "type": "equation",
     "page": 19,
     "original": "6.97 5.44"
    },
    {
     "id": "eq-language-188",
     "type": "equation",
     "page": 19,
     "original": "Urdu"
    },
    {
     "id": "eq-language-189",
     "type": "equation",
     "page": 19,
     "original": "80.27 28.73"
    },
    {
     "id": "eq-language-190",
     "type": "equation",
     "page": 19,
     "original": "Uzbek"
    },
    {
     "id": "eq-language-191",
     "type": "equation",
     "page": 19,
     "original": "3.31 2.23"
    },
    {
     "id": "eq-language-192",
     "type": "equation",
     "page": 19,
     "original": "Vietnamese"
    },
    {
     "id": "eq-language-193",
     "type": "equation",
     "page": 19,
     "original": "3.49 2.63"
    },
    {
     "id": "eq-language-194",
     "type": "equation",
     "page": 19,
     "original": "Welsh"
    },
    {
     "id": "eq-language-195",
     "type": "equation",
     "page": 19,
     "original": "3.91 3.37"
    },
    {
     "id": "eq-language-196",
     "type": "equation",
     "page": 19,
     "original": "Wolof"
    },
    {
     "id": "eq-language-197",
     "type": "equation",
     "page": 19,
     "original": "12.17 6.87"
    },
    {
     "id": "eq-language-198",
     "type": "equation",
     "page": 19,
     "original": "Xhosa"
    },
    {
     "id": "eq-language-199",
     "type": "equation",
     "page": 19,
     "original": "3.62 3.83"
    },
    {
     "id": "eq-language-200",
     "type": "equation",
     "page": 19,
     "original": "Yoruba"
    },
    {
     "id": "eq-language-201",
     "type": "equation",
     "page": 19,
     "original": "17.97 21.37"
    },
    {
     "id": "eq-language-202",
     "type": "equation",
     "page": 19,
     "original": "Zulu"
    },
    {
     "id": "eq-language-203",
     "type": "equation",
     "page": 19,
     "original": "3.33 2.03"
    }
   ]
  },
  {
   "id": "sec-D",
   "num": "D",
   "level": 1,
   "page": 20,
   "title": {
    "original": "Supported Languages of OmniVoice",
    "zh": "附录 D OmniVoice 支持的语言"
   },
   "blocks": [
    {
     "id": "p-D-1",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-D-1-1",
       "original": "OmniVoice supports 646 languages with a total of 581k hours of training data.",
       "zh": "OmniVoice 支持 646 种语言，训练数据总量为 581k 小时。"
      },
      {
       "id": "s-D-1-2",
       "original": "Detailed language, along with its OmniVoice language ID, ISO 639-3 code, and training data duration are shown in Table 11.",
       "zh": "每种语言的详细信息——包括其 OmniVoice 语言 ID、ISO 639-3 代码与训练数据时长——见表 11。"
      }
     ]
    },
    {
     "id": "tab-D-1",
     "type": "table_caption",
     "page": 20,
     "original": "Table 11: Supported languages of OmniVoice along with its OmniVoice language ID, ISO 639-3 code, and training data duration (hours).",
     "zh": "表 11：OmniVoice 支持的语言，附其 OmniVoice 语言 ID、ISO 639-3 代码与训练数据时长（小时）。"
    },
    {
     "id": "p-D-2",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-D-2-1",
       "original": "Language ID ISO Hours Language ID ISO Hours Language ID ISO Hours Abadi kbt kbt",
       "zh": "表头：Language / ID / ISO / Hours（三列组）——Abadi kbt kbt（后续照原文）。"
      }
     ]
    },
    {
     "id": "eq-D-1",
     "type": "equation",
     "page": 20,
     "original": "9.73"
    },
    {
     "id": "eq-D-2",
     "type": "equation",
     "page": 20,
     "original": "Abkhazian ab abk"
    },
    {
     "id": "eq-D-3",
     "type": "equation",
     "page": 20,
     "original": "57.27"
    },
    {
     "id": "eq-D-4",
     "type": "equation",
     "page": 20,
     "original": "Abron abr abr"
    },
    {
     "id": "eq-D-5",
     "type": "equation",
     "page": 20,
     "original": "9.22"
    },
    {
     "id": "eq-D-6",
     "type": "equation",
     "page": 20,
     "original": "Abua abn abn"
    },
    {
     "id": "eq-D-7",
     "type": "equation",
     "page": 20,
     "original": "10.27"
    },
    {
     "id": "eq-D-8",
     "type": "equation",
     "page": 20,
     "original": "Adamawa Fulfulde fub fub"
    },
    {
     "id": "eq-D-9",
     "type": "equation",
     "page": 20,
     "original": "13.12"
    },
    {
     "id": "eq-D-10",
     "type": "equation",
     "page": 20,
     "original": "Adyghe ady ady"
    },
    {
     "id": "eq-D-11",
     "type": "equation",
     "page": 20,
     "original": "32.6"
    },
    {
     "id": "eq-D-12",
     "type": "equation",
     "page": 20,
     "original": "Afade aal aal"
    },
    {
     "id": "eq-D-13",
     "type": "equation",
     "page": 20,
     "original": "10.19"
    },
    {
     "id": "eq-D-14",
     "type": "equation",
     "page": 20,
     "original": "Afrikaans af afr"
    },
    {
     "id": "eq-D-15",
     "type": "equation",
     "page": 20,
     "original": "4.4"
    },
    {
     "id": "eq-D-16",
     "type": "equation",
     "page": 20,
     "original": "Agwagwune yay yay"
    },
    {
     "id": "eq-D-17",
     "type": "equation",
     "page": 20,
     "original": "8.26"
    },
    {
     "id": "eq-D-18",
     "type": "equation",
     "page": 20,
     "original": "Aja (Benin) ajg ajg"
    },
    {
     "id": "eq-D-19",
     "type": "equation",
     "page": 20,
     "original": "5.63"
    },
    {
     "id": "eq-D-20",
     "type": "equation",
     "page": 20,
     "original": "Akebu keu keu"
    },
    {
     "id": "eq-D-21",
     "type": "equation",
     "page": 20,
     "original": "9.1"
    },
    {
     "id": "eq-D-22",
     "type": "equation",
     "page": 20,
     "original": "Alago ala ala"
    },
    {
     "id": "eq-D-23",
     "type": "equation",
     "page": 20,
     "original": "11.04"
    },
    {
     "id": "eq-D-24",
     "type": "equation",
     "page": 20,
     "original": "Albanian sq sqi"
    },
    {
     "id": "eq-D-25",
     "type": "equation",
     "page": 20,
     "original": "8.59"
    },
    {
     "id": "eq-D-26",
     "type": "equation",
     "page": 20,
     "original": "Algerian Arabic arq arq"
    },
    {
     "id": "eq-D-27",
     "type": "equation",
     "page": 20,
     "original": "9.64"
    },
    {
     "id": "eq-D-28",
     "type": "equation",
     "page": 20,
     "original": "Algerian Saharan Arabic aao aao"
    },
    {
     "id": "eq-D-29",
     "type": "equation",
     "page": 20,
     "original": "2.02"
    },
    {
     "id": "eq-D-30",
     "type": "equation",
     "page": 20,
     "original": "Ambo-Pasco Quechua qva qva"
    },
    {
     "id": "eq-D-31",
     "type": "equation",
     "page": 20,
     "original": "9.59"
    },
    {
     "id": "eq-D-32",
     "type": "equation",
     "page": 20,
     "original": "Ambonese Malay abs abs"
    },
    {
     "id": "eq-D-33",
     "type": "equation",
     "page": 20,
     "original": "10.03"
    },
    {
     "id": "eq-D-34",
     "type": "equation",
     "page": 20,
     "original": "Amdo Tibetan adx adx"
    },
    {
     "id": "eq-D-35",
     "type": "equation",
     "page": 20,
     "original": "56.94"
    },
    {
     "id": "eq-D-36",
     "type": "equation",
     "page": 20,
     "original": "Amharic am amh"
    },
    {
     "id": "eq-D-37",
     "type": "equation",
     "page": 20,
     "original": "12.83"
    },
    {
     "id": "eq-D-38",
     "type": "equation",
     "page": 20,
     "original": "Anaang anw anw"
    },
    {
     "id": "eq-D-39",
     "type": "equation",
     "page": 20,
     "original": "9.65"
    },
    {
     "id": "eq-D-40",
     "type": "equation",
     "page": 20,
     "original": "Angika anp anp"
    },
    {
     "id": "eq-D-41",
     "type": "equation",
     "page": 20,
     "original": "10.65"
    },
    {
     "id": "eq-D-42",
     "type": "equation",
     "page": 20,
     "original": "Antankarana Malagasy xmv xmv"
    },
    {
     "id": "eq-D-43",
     "type": "equation",
     "page": 20,
     "original": "17.9"
    },
    {
     "id": "eq-D-44",
     "type": "equation",
     "page": 20,
     "original": "Aragonese an arg"
    },
    {
     "id": "eq-D-45",
     "type": "equation",
     "page": 20,
     "original": "16.4"
    },
    {
     "id": "eq-D-46",
     "type": "equation",
     "page": 20,
     "original": "Arbëreshë Albanian aae aae"
    },
    {
     "id": "eq-D-47",
     "type": "equation",
     "page": 20,
     "original": "6.11"
    },
    {
     "id": "eq-D-48",
     "type": "equation",
     "page": 20,
     "original": "Arequipa-La Unión Quechua qxu qxu"
    },
    {
     "id": "eq-D-49",
     "type": "equation",
     "page": 20,
     "original": "10.12"
    },
    {
     "id": "eq-D-50",
     "type": "equation",
     "page": 20,
     "original": "Armenian hy hye"
    },
    {
     "id": "eq-D-51",
     "type": "equation",
     "page": 20,
     "original": "42.15"
    },
    {
     "id": "eq-D-52",
     "type": "equation",
     "page": 20,
     "original": "Ashe ahs ahs"
    },
    {
     "id": "eq-D-53",
     "type": "equation",
     "page": 20,
     "original": "10.62"
    },
    {
     "id": "eq-D-54",
     "type": "equation",
     "page": 20,
     "original": "Ashéninka Perenë prq prq"
    },
    {
     "id": "eq-D-55",
     "type": "equation",
     "page": 20,
     "original": "7.16"
    },
    {
     "id": "eq-D-56",
     "type": "equation",
     "page": 20,
     "original": "Askopan eiv eiv"
    },
    {
     "id": "eq-D-57",
     "type": "equation",
     "page": 20,
     "original": "10.44"
    },
    {
     "id": "eq-D-58",
     "type": "equation",
     "page": 20,
     "original": "Assamese as asm"
    },
    {
     "id": "eq-D-59",
     "type": "equation",
     "page": 20,
     "original": "270.85"
    },
    {
     "id": "eq-D-60",
     "type": "equation",
     "page": 20,
     "original": "Asturian ast ast"
    },
    {
     "id": "eq-D-61",
     "type": "equation",
     "page": 20,
     "original": "8.48"
    },
    {
     "id": "eq-D-62",
     "type": "equation",
     "page": 20,
     "original": "Atayal tay tay"
    },
    {
     "id": "eq-D-63",
     "type": "equation",
     "page": 20,
     "original": "7.02"
    },
    {
     "id": "eq-D-64",
     "type": "equation",
     "page": 20,
     "original": "Awak awo awo"
    },
    {
     "id": "eq-D-65",
     "type": "equation",
     "page": 20,
     "original": "10.22"
    },
    {
     "id": "eq-D-66",
     "type": "equation",
     "page": 20,
     "original": "Ayacucho Quechua quy quy"
    },
    {
     "id": "eq-D-67",
     "type": "equation",
     "page": 20,
     "original": "0.05"
    },
    {
     "id": "eq-D-68",
     "type": "equation",
     "page": 20,
     "original": "Azerbaijani az aze"
    },
    {
     "id": "eq-D-69",
     "type": "equation",
     "page": 20,
     "original": "9.84"
    },
    {
     "id": "eq-D-70",
     "type": "equation",
     "page": 20,
     "original": "Baatonum bba bba"
    },
    {
     "id": "eq-D-71",
     "type": "equation",
     "page": 20,
     "original": "10.53"
    },
    {
     "id": "eq-D-72",
     "type": "equation",
     "page": 20,
     "original": "Bacama bcy bcy"
    },
    {
     "id": "eq-D-73",
     "type": "equation",
     "page": 20,
     "original": "9.94"
    },
    {
     "id": "eq-D-74",
     "type": "equation",
     "page": 20,
     "original": "Bade bde bde"
    },
    {
     "id": "eq-D-75",
     "type": "equation",
     "page": 20,
     "original": "9.89"
    },
    {
     "id": "eq-D-76",
     "type": "equation",
     "page": 20,
     "original": "Bafia ksf ksf"
    },
    {
     "id": "eq-D-77",
     "type": "equation",
     "page": 20,
     "original": "16.43"
    },
    {
     "id": "eq-D-78",
     "type": "equation",
     "page": 20,
     "original": "Bafut bfd bfd"
    },
    {
     "id": "eq-D-79",
     "type": "equation",
     "page": 20,
     "original": "9.03"
    },
    {
     "id": "eq-D-80",
     "type": "equation",
     "page": 20,
     "original": "Bagirmi Fulfulde fui fui"
    },
    {
     "id": "eq-D-81",
     "type": "equation",
     "page": 20,
     "original": "15.04"
    },
    {
     "id": "eq-D-82",
     "type": "equation",
     "page": 20,
     "original": "Bago-Kusuntu bqg bqg"
    },
    {
     "id": "eq-D-83",
     "type": "equation",
     "page": 20,
     "original": "8.86"
    },
    {
     "id": "eq-D-84",
     "type": "equation",
     "page": 20,
     "original": "Baharna Arabic abv abv"
    },
    {
     "id": "eq-D-85",
     "type": "equation",
     "page": 20,
     "original": "10.41"
    },
    {
     "id": "eq-D-86",
     "type": "equation",
     "page": 20,
     "original": "Bakoko bkh bkh"
    },
    {
     "id": "eq-D-87",
     "type": "equation",
     "page": 20,
     "original": "6.0"
    },
    {
     "id": "eq-D-88",
     "type": "equation",
     "page": 20,
     "original": "Balanta-Ganja bjt bjt"
    },
    {
     "id": "eq-D-89",
     "type": "equation",
     "page": 20,
     "original": "9.41"
    },
    {
     "id": "eq-D-90",
     "type": "equation",
     "page": 20,
     "original": "Balti bft bft"
    },
    {
     "id": "eq-D-91",
     "type": "equation",
     "page": 20,
     "original": "16.28"
    },
    {
     "id": "eq-D-92",
     "type": "equation",
     "page": 20,
     "original": "Bamenyam bce bce"
    },
    {
     "id": "eq-D-93",
     "type": "equation",
     "page": 20,
     "original": "9.9"
    },
    {
     "id": "eq-D-94",
     "type": "equation",
     "page": 20,
     "original": "Bamun bax bax"
    },
    {
     "id": "eq-D-95",
     "type": "equation",
     "page": 20,
     "original": "10.24"
    },
    {
     "id": "eq-D-96",
     "type": "equation",
     "page": 20,
     "original": "Bangwinji bsj bsj"
    },
    {
     "id": "eq-D-97",
     "type": "equation",
     "page": 20,
     "original": "10.0"
    },
    {
     "id": "eq-D-98",
     "type": "equation",
     "page": 20,
     "original": "Banjar bjn bjn"
    },
    {
     "id": "eq-D-99",
     "type": "equation",
     "page": 20,
     "original": "11.68"
    },
    {
     "id": "eq-D-100",
     "type": "equation",
     "page": 20,
     "original": "Bankon abb abb"
    },
    {
     "id": "eq-D-101",
     "type": "equation",
     "page": 20,
     "original": "11.2"
    },
    {
     "id": "eq-D-102",
     "type": "equation",
     "page": 20,
     "original": "Baoulé bci bci"
    },
    {
     "id": "eq-D-103",
     "type": "equation",
     "page": 20,
     "original": "10.21"
    },
    {
     "id": "eq-D-104",
     "type": "equation",
     "page": 20,
     "original": "Bara Malagasy bhr bhr"
    },
    {
     "id": "eq-D-105",
     "type": "equation",
     "page": 20,
     "original": "12.14"
    },
    {
     "id": "eq-D-106",
     "type": "equation",
     "page": 20,
     "original": "Barok bjk bjk"
    },
    {
     "id": "eq-D-107",
     "type": "equation",
     "page": 20,
     "original": "10.16"
    },
    {
     "id": "eq-D-108",
     "type": "equation",
     "page": 20,
     "original": "Basa (Cameroon) bas bas"
    },
    {
     "id": "eq-D-109",
     "type": "equation",
     "page": 20,
     "original": "10.66"
    },
    {
     "id": "eq-D-110",
     "type": "equation",
     "page": 20,
     "original": "Basa (Nigeria) bzw bzw"
    },
    {
     "id": "eq-D-111",
     "type": "equation",
     "page": 20,
     "original": "10.27"
    },
    {
     "id": "eq-D-112",
     "type": "equation",
     "page": 20,
     "original": "Bashkir ba bak"
    },
    {
     "id": "eq-D-113",
     "type": "equation",
     "page": 20,
     "original": "249.1"
    },
    {
     "id": "eq-D-114",
     "type": "equation",
     "page": 20,
     "original": "Basque eu eus"
    },
    {
     "id": "eq-D-115",
     "type": "equation",
     "page": 20,
     "original": "479.86"
    },
    {
     "id": "eq-D-116",
     "type": "equation",
     "page": 20,
     "original": "Batak Mandailing btm btm"
    },
    {
     "id": "eq-D-117",
     "type": "equation",
     "page": 20,
     "original": "11.09"
    },
    {
     "id": "eq-D-118",
     "type": "equation",
     "page": 20,
     "original": "Batanga bnm bnm"
    },
    {
     "id": "eq-D-119",
     "type": "equation",
     "page": 20,
     "original": "15.01"
    },
    {
     "id": "eq-D-120",
     "type": "equation",
     "page": 20,
     "original": "Bateri btv btv"
    },
    {
     "id": "eq-D-121",
     "type": "equation",
     "page": 20,
     "original": "9.8"
    },
    {
     "id": "eq-D-122",
     "type": "equation",
     "page": 20,
     "original": "Bats bbl bbl"
    },
    {
     "id": "eq-D-123",
     "type": "equation",
     "page": 20,
     "original": "11.22"
    },
    {
     "id": "eq-D-124",
     "type": "equation",
     "page": 20,
     "original": "Bayot bda bda"
    },
    {
     "id": "eq-D-125",
     "type": "equation",
     "page": 20,
     "original": "9.47"
    },
    {
     "id": "eq-D-126",
     "type": "equation",
     "page": 20,
     "original": "Bebele beb beb"
    },
    {
     "id": "eq-D-127",
     "type": "equation",
     "page": 20,
     "original": "7.52"
    },
    {
     "id": "eq-D-128",
     "type": "equation",
     "page": 20,
     "original": "Belarusian be bel"
    },
    {
     "id": "eq-D-129",
     "type": "equation",
     "page": 20,
     "original": "1809.43"
    },
    {
     "id": "eq-D-130",
     "type": "equation",
     "page": 20,
     "original": "Bengali bn ben"
    },
    {
     "id": "eq-D-131",
     "type": "equation",
     "page": 20,
     "original": "271.76"
    },
    {
     "id": "eq-D-132",
     "type": "equation",
     "page": 20,
     "original": "Betawi bew bew"
    },
    {
     "id": "eq-D-133",
     "type": "equation",
     "page": 20,
     "original": "11.15"
    },
    {
     "id": "eq-D-134",
     "type": "equation",
     "page": 20,
     "original": "Bhili bhb bhb"
    },
    {
     "id": "eq-D-135",
     "type": "equation",
     "page": 20,
     "original": "9.98"
    },
    {
     "id": "eq-D-136",
     "type": "equation",
     "page": 20,
     "original": "Bhojpuri bho bho"
    },
    {
     "id": "eq-D-137",
     "type": "equation",
     "page": 20,
     "original": "10.05"
    },
    {
     "id": "eq-D-138",
     "type": "equation",
     "page": 20,
     "original": "Bilur bxf bxf"
    },
    {
     "id": "eq-D-139",
     "type": "equation",
     "page": 20,
     "original": "10.84"
    },
    {
     "id": "eq-D-140",
     "type": "equation",
     "page": 20,
     "original": "Bima bhp bhp"
    },
    {
     "id": "eq-D-141",
     "type": "equation",
     "page": 20,
     "original": "10.67"
    },
    {
     "id": "eq-D-142",
     "type": "equation",
     "page": 20,
     "original": "Bodo brx brx"
    },
    {
     "id": "eq-D-143",
     "type": "equation",
     "page": 20,
     "original": "231.57"
    },
    {
     "id": "eq-D-144",
     "type": "equation",
     "page": 20,
     "original": "Boghom bux bux"
    },
    {
     "id": "eq-D-145",
     "type": "equation",
     "page": 20,
     "original": "10.48"
    },
    {
     "id": "eq-D-146",
     "type": "equation",
     "page": 20,
     "original": "Bokyi bky bky"
    },
    {
     "id": "eq-D-147",
     "type": "equation",
     "page": 20,
     "original": "9.85"
    },
    {
     "id": "eq-D-148",
     "type": "equation",
     "page": 20,
     "original": "Bomu bmq bmq"
    },
    {
     "id": "eq-D-149",
     "type": "equation",
     "page": 20,
     "original": "10.68"
    },
    {
     "id": "eq-D-150",
     "type": "equation",
     "page": 20,
     "original": "Bondei bou bou"
    },
    {
     "id": "eq-D-151",
     "type": "equation",
     "page": 20,
     "original": "9.98"
    },
    {
     "id": "eq-D-152",
     "type": "equation",
     "page": 20,
     "original": "Borgu Fulfulde fue fue"
    },
    {
     "id": "eq-D-153",
     "type": "equation",
     "page": 20,
     "original": "20.1"
    },
    {
     "id": "eq-D-154",
     "type": "equation",
     "page": 20,
     "original": "Bosnian bs bos"
    },
    {
     "id": "eq-D-155",
     "type": "equation",
     "page": 20,
     "original": "690.73"
    },
    {
     "id": "eq-D-156",
     "type": "equation",
     "page": 20,
     "original": "Brahui brh brh"
    },
    {
     "id": "eq-D-157",
     "type": "equation",
     "page": 20,
     "original": "19.89"
    },
    {
     "id": "eq-D-158",
     "type": "equation",
     "page": 20,
     "original": "Braj bra bra"
    },
    {
     "id": "eq-D-159",
     "type": "equation",
     "page": 20,
     "original": "10.68"
    },
    {
     "id": "eq-D-160",
     "type": "equation",
     "page": 20,
     "original": "Breton br bre"
    },
    {
     "id": "eq-D-161",
     "type": "equation",
     "page": 20,
     "original": "25.48"
    },
    {
     "id": "eq-D-162",
     "type": "equation",
     "page": 20,
     "original": "Buduma bdm bdm"
    },
    {
     "id": "eq-D-163",
     "type": "equation",
     "page": 20,
     "original": "10.17"
    },
    {
     "id": "eq-D-164",
     "type": "equation",
     "page": 20,
     "original": "Buginese bug bug"
    },
    {
     "id": "eq-D-165",
     "type": "equation",
     "page": 20,
     "original": "11.09"
    },
    {
     "id": "eq-D-166",
     "type": "equation",
     "page": 20,
     "original": "Bukharic bhh bhh"
    },
    {
     "id": "eq-D-167",
     "type": "equation",
     "page": 20,
     "original": "11.38"
    },
    {
     "id": "eq-D-168",
     "type": "equation",
     "page": 20,
     "original": "Bulgarian bg bul"
    },
    {
     "id": "eq-D-169",
     "type": "equation",
     "page": 20,
     "original": "2190.76"
    },
    {
     "id": "eq-D-170",
     "type": "equation",
     "page": 20,
     "original": "Bulu (Cameroon) bum bum"
    },
    {
     "id": "eq-D-171",
     "type": "equation",
     "page": 20,
     "original": "9.06"
    },
    {
     "id": "eq-D-172",
     "type": "equation",
     "page": 20,
     "original": "Bundeli bns bns"
    },
    {
     "id": "eq-D-173",
     "type": "equation",
     "page": 20,
     "original": "10.88"
    },
    {
     "id": "eq-D-174",
     "type": "equation",
     "page": 20,
     "original": "Bunun bnn bnn"
    },
    {
     "id": "eq-D-175",
     "type": "equation",
     "page": 20,
     "original": "9.26"
    },
    {
     "id": "eq-D-176",
     "type": "equation",
     "page": 20,
     "original": "Bura-Pabir bwr bwr"
    },
    {
     "id": "eq-D-177",
     "type": "equation",
     "page": 20,
     "original": "10.4"
    },
    {
     "id": "eq-D-178",
     "type": "equation",
     "page": 20,
     "original": "Burak bys bys"
    },
    {
     "id": "eq-D-179",
     "type": "equation",
     "page": 20,
     "original": "9.92"
    },
    {
     "id": "eq-D-180",
     "type": "equation",
     "page": 20,
     "original": "Burmese my mya"
    },
    {
     "id": "eq-D-181",
     "type": "equation",
     "page": 20,
     "original": "12.14"
    },
    {
     "id": "eq-D-182",
     "type": "equation",
     "page": 20,
     "original": "Burushaski bsk bsk"
    },
    {
     "id": "eq-D-183",
     "type": "equation",
     "page": 20,
     "original": "9.14"
    },
    {
     "id": "eq-D-184",
     "type": "equation",
     "page": 20,
     "original": "Cacaloxtepec Mixtec miu miu"
    },
    {
     "id": "eq-D-185",
     "type": "equation",
     "page": 20,
     "original": "9.18"
    },
    {
     "id": "eq-D-186",
     "type": "equation",
     "page": 20,
     "original": "Cajatambo North Lima Quechua qvl qvl"
    },
    {
     "id": "eq-D-187",
     "type": "equation",
     "page": 20,
     "original": "9.95"
    },
    {
     "id": "eq-D-188",
     "type": "equation",
     "page": 20,
     "original": "Cakfem-Mushere cky cky"
    },
    {
     "id": "eq-D-189",
     "type": "equation",
     "page": 20,
     "original": "8.96"
    },
    {
     "id": "eq-D-190",
     "type": "equation",
     "page": 20,
     "original": "Cameroon Pidgin wes wes"
    },
    {
     "id": "eq-D-191",
     "type": "equation",
     "page": 20,
     "original": "10.06"
    },
    {
     "id": "eq-D-192",
     "type": "equation",
     "page": 20,
     "original": "Campidanese Sardinian sro sro"
    },
    {
     "id": "eq-D-193",
     "type": "equation",
     "page": 20,
     "original": "10.16"
    },
    {
     "id": "eq-D-194",
     "type": "equation",
     "page": 20,
     "original": "Cantonese yue yue 13302.38 Catalan ca cat"
    },
    {
     "id": "eq-D-195",
     "type": "equation",
     "page": 20,
     "original": "3358.6"
    },
    {
     "id": "eq-D-196",
     "type": "equation",
     "page": 20,
     "original": "Cebuano ceb ceb"
    },
    {
     "id": "eq-D-197",
     "type": "equation",
     "page": 20,
     "original": "12.17"
    },
    {
     "id": "eq-D-198",
     "type": "equation",
     "page": 20,
     "original": "Cen cen cen"
    },
    {
     "id": "eq-D-199",
     "type": "equation",
     "page": 20,
     "original": "9.85"
    },
    {
     "id": "eq-D-200",
     "type": "equation",
     "page": 20,
     "original": "Central Kurdish ckb ckb"
    },
    {
     "id": "eq-D-201",
     "type": "equation",
     "page": 20,
     "original": "137.52"
    },
    {
     "id": "eq-D-202",
     "type": "equation",
     "page": 20,
     "original": "Central Nahuatl nhn nhn"
    },
    {
     "id": "eq-D-203",
     "type": "equation",
     "page": 20,
     "original": "9.51"
    },
    {
     "id": "eq-D-204",
     "type": "equation",
     "page": 20,
     "original": "Central Pame pbs pbs"
    },
    {
     "id": "eq-D-205",
     "type": "equation",
     "page": 20,
     "original": "9.69"
    },
    {
     "id": "eq-D-206",
     "type": "equation",
     "page": 20,
     "original": "Central Pashto pst pst"
    },
    {
     "id": "eq-D-207",
     "type": "equation",
     "page": 20,
     "original": "11.4"
    },
    {
     "id": "eq-D-208",
     "type": "equation",
     "page": 20,
     "original": "Central Puebla Nahuatl ncx ncx"
    },
    {
     "id": "eq-D-209",
     "type": "equation",
     "page": 20,
     "original": "9.86"
    },
    {
     "id": "eq-D-210",
     "type": "equation",
     "page": 20,
     "original": "Central Tarahumara tar tar"
    },
    {
     "id": "eq-D-211",
     "type": "equation",
     "page": 20,
     "original": "9.73"
    },
    {
     "id": "eq-D-212",
     "type": "equation",
     "page": 20,
     "original": "Central Yupik esu esu"
    },
    {
     "id": "eq-D-213",
     "type": "equation",
     "page": 20,
     "original": "2.18"
    },
    {
     "id": "eq-D-214",
     "type": "equation",
     "page": 20,
     "original": "Central-Eastern Niger Fulfulde fuq fuq"
    },
    {
     "id": "eq-D-215",
     "type": "equation",
     "page": 20,
     "original": "9.28"
    },
    {
     "id": "eq-D-216",
     "type": "equation",
     "page": 20,
     "original": "Chadian Arabic shu shu"
    },
    {
     "id": "eq-D-217",
     "type": "equation",
     "page": 20,
     "original": "2.29"
    },
    {
     "id": "eq-D-218",
     "type": "equation",
     "page": 20,
     "original": "Chichewa ny nya"
    },
    {
     "id": "eq-D-219",
     "type": "equation",
     "page": 20,
     "original": "10.8"
    },
    {
     "id": "eq-D-220",
     "type": "equation",
     "page": 20,
     "original": "Chichicapan Zapotec zpv zpv"
    },
    {
     "id": "eq-D-221",
     "type": "equation",
     "page": 20,
     "original": "9.85"
    },
    {
     "id": "eq-D-222",
     "type": "equation",
     "page": 20,
     "original": "Chiga cgg cgg"
    },
    {
     "id": "eq-D-223",
     "type": "equation",
     "page": 20,
     "original": "10.84"
    },
    {
     "id": "eq-D-224",
     "type": "equation",
     "page": 20,
     "original": "Chimalapa Zoque zoh zoh"
    },
    {
     "id": "eq-D-225",
     "type": "equation",
     "page": 20,
     "original": "9.35"
    },
    {
     "id": "eq-D-226",
     "type": "equation",
     "page": 20,
     "original": "Chimborazo Highland Quichua qug qug"
    },
    {
     "id": "eq-D-227",
     "type": "equation",
     "page": 20,
     "original": "10.12"
    },
    {
     "id": "p-D-3",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-D-3-1",
       "original": "Chinese zh cmn 111343.3 Chiquián Ancash Quechua qxa qxa",
       "zh": "（表格行）Chinese zh cmn 111343.3；Chiquián Ancash Quechua qxa qxa（后续照原文）。"
      }
     ]
    },
    {
     "id": "eq-D-228",
     "type": "equation",
     "page": 20,
     "original": "9.99"
    },
    {
     "id": "eq-D-229",
     "type": "equation",
     "page": 20,
     "original": "Chitwania Tharu the the"
    },
    {
     "id": "eq-D-230",
     "type": "equation",
     "page": 20,
     "original": "10.06"
    },
    {
     "id": "eq-D-231",
     "type": "equation",
     "page": 20,
     "original": "Chokwe cjk cjk"
    },
    {
     "id": "eq-D-232",
     "type": "equation",
     "page": 20,
     "original": "11.01"
    },
    {
     "id": "eq-D-233",
     "type": "equation",
     "page": 20,
     "original": "Chuvash cv chv"
    },
    {
     "id": "eq-D-234",
     "type": "equation",
     "page": 20,
     "original": "23.96"
    },
    {
     "id": "eq-D-235",
     "type": "equation",
     "page": 20,
     "original": "Cibak ckl ckl"
    },
    {
     "id": "eq-D-236",
     "type": "equation",
     "page": 20,
     "original": "10.91"
    },
    {
     "id": "eq-D-237",
     "type": "equation",
     "page": 20,
     "original": "Coastal Konjo kjc kjc"
    },
    {
     "id": "eq-D-238",
     "type": "equation",
     "page": 20,
     "original": "10.18"
    },
    {
     "id": "eq-D-239",
     "type": "equation",
     "page": 20,
     "original": "Copainalá Zoque zoc zoc"
    },
    {
     "id": "eq-D-240",
     "type": "equation",
     "page": 20,
     "original": "10.07"
    },
    {
     "id": "eq-D-241",
     "type": "equation",
     "page": 20,
     "original": "Cornish kw cor"
    },
    {
     "id": "eq-D-242",
     "type": "equation",
     "page": 20,
     "original": "12.15"
    },
    {
     "id": "eq-D-243",
     "type": "equation",
     "page": 20,
     "original": "Corongo Ancash Quechua qwa qwa"
    },
    {
     "id": "eq-D-244",
     "type": "equation",
     "page": 20,
     "original": "9.72"
    },
    {
     "id": "eq-D-245",
     "type": "equation",
     "page": 20,
     "original": "Croatian hr hrv"
    },
    {
     "id": "eq-D-246",
     "type": "equation",
     "page": 20,
     "original": "2795.31"
    },
    {
     "id": "eq-D-247",
     "type": "equation",
     "page": 20,
     "original": "Cross River Mbembe mfn mfn"
    },
    {
     "id": "eq-D-248",
     "type": "equation",
     "page": 20,
     "original": "10.03"
    },
    {
     "id": "eq-D-249",
     "type": "equation",
     "page": 20,
     "original": "Cuyamecalco Mixtec xtu xtu"
    },
    {
     "id": "eq-D-250",
     "type": "equation",
     "page": 20,
     "original": "9.4"
    },
    {
     "id": "eq-D-251",
     "type": "equation",
     "page": 20,
     "original": "Czech cs ces"
    },
    {
     "id": "eq-D-252",
     "type": "equation",
     "page": 20,
     "original": "148.13"
    },
    {
     "id": "eq-D-253",
     "type": "equation",
     "page": 20,
     "original": "Dadiya dbd dbd"
    },
    {
     "id": "eq-D-254",
     "type": "equation",
     "page": 20,
     "original": "9.61"
    },
    {
     "id": "eq-D-255",
     "type": "equation",
     "page": 20,
     "original": "Dagbani dag dag"
    },
    {
     "id": "eq-D-256",
     "type": "equation",
     "page": 20,
     "original": "10.14"
    },
    {
     "id": "eq-D-257",
     "type": "equation",
     "page": 20,
     "original": "Dameli dml dml"
    },
    {
     "id": "eq-D-258",
     "type": "equation",
     "page": 20,
     "original": "9.18"
    },
    {
     "id": "eq-D-259",
     "type": "equation",
     "page": 20,
     "original": "Danish da dan"
    },
    {
     "id": "eq-D-260",
     "type": "equation",
     "page": 20,
     "original": "1665.98"
    },
    {
     "id": "eq-D-261",
     "type": "equation",
     "page": 20,
     "original": "Dargwa dar dar"
    },
    {
     "id": "eq-D-262",
     "type": "equation",
     "page": 20,
     "original": "1.22"
    },
    {
     "id": "eq-D-263",
     "type": "equation",
     "page": 20,
     "original": "Dazaga dzg dzg"
    },
    {
     "id": "eq-D-264",
     "type": "equation",
     "page": 20,
     "original": "9.96"
    },
    {
     "id": "eq-D-265",
     "type": "equation",
     "page": 20,
     "original": "Deccan dcc dcc"
    },
    {
     "id": "eq-D-266",
     "type": "equation",
     "page": 20,
     "original": "10.38"
    },
    {
     "id": "eq-D-267",
     "type": "equation",
     "page": 20,
     "original": "Degema deg deg"
    },
    {
     "id": "eq-D-268",
     "type": "equation",
     "page": 20,
     "original": "11.07"
    },
    {
     "id": "eq-D-269",
     "type": "equation",
     "page": 20,
     "original": "Dera (Nigeria) kna kna"
    },
    {
     "id": "eq-D-270",
     "type": "equation",
     "page": 20,
     "original": "11.91"
    },
    {
     "id": "eq-D-271",
     "type": "equation",
     "page": 20,
     "original": "Dghwede dgh dgh"
    },
    {
     "id": "eq-D-272",
     "type": "equation",
     "page": 20,
     "original": "9.95"
    },
    {
     "id": "eq-D-273",
     "type": "equation",
     "page": 20,
     "original": "Dhatki mki mki"
    },
    {
     "id": "eq-D-274",
     "type": "equation",
     "page": 20,
     "original": "8.83"
    },
    {
     "id": "eq-D-275",
     "type": "equation",
     "page": 20,
     "original": "Dhivehi dv div"
    },
    {
     "id": "eq-D-276",
     "type": "equation",
     "page": 20,
     "original": "38.61"
    },
    {
     "id": "eq-D-277",
     "type": "equation",
     "page": 20,
     "original": "Dhofari Arabic adf adf"
    },
    {
     "id": "eq-D-278",
     "type": "equation",
     "page": 20,
     "original": "0.31"
    },
    {
     "id": "eq-D-279",
     "type": "equation",
     "page": 20,
     "original": "Dijim-Bwilim cfa cfa"
    },
    {
     "id": "eq-D-280",
     "type": "equation",
     "page": 20,
     "original": "10.32"
    },
    {
     "id": "eq-D-281",
     "type": "equation",
     "page": 20,
     "original": "Dogri dgo dgo"
    },
    {
     "id": "eq-D-282",
     "type": "equation",
     "page": 20,
     "original": "117.04"
    },
    {
     "id": "eq-D-283",
     "type": "equation",
     "page": 20,
     "original": "Domaaki dmk dmk"
    },
    {
     "id": "eq-D-284",
     "type": "equation",
     "page": 20,
     "original": "6.38"
    },
    {
     "id": "eq-D-285",
     "type": "equation",
     "page": 20,
     "original": "Dotyali dty dty"
    },
    {
     "id": "eq-D-286",
     "type": "equation",
     "page": 20,
     "original": "10.85"
    },
    {
     "id": "eq-D-287",
     "type": "equation",
     "page": 20,
     "original": "Duala dua dua"
    },
    {
     "id": "eq-D-288",
     "type": "equation",
     "page": 20,
     "original": "12.13"
    },
    {
     "id": "eq-D-289",
     "type": "equation",
     "page": 20,
     "original": "Dutch nl nld"
    },
    {
     "id": "eq-D-290",
     "type": "equation",
     "page": 20,
     "original": "2264.13"
    },
    {
     "id": "eq-D-291",
     "type": "equation",
     "page": 20,
     "original": "D˜uya ldb ldb"
    },
    {
     "id": "eq-D-292",
     "type": "equation",
     "page": 20,
     "original": "11.31"
    },
    {
     "id": "eq-D-293",
     "type": "equation",
     "page": 20,
     "original": "Dyula dyu dyu"
    },
    {
     "id": "eq-D-294",
     "type": "equation",
     "page": 20,
     "original": "0.34"
    },
    {
     "id": "eq-D-295",
     "type": "equation",
     "page": 20,
     "original": "Eastern Balochi bgp bgp"
    },
    {
     "id": "eq-D-296",
     "type": "equation",
     "page": 20,
     "original": "10.98"
    },
    {
     "id": "eq-D-297",
     "type": "equation",
     "page": 20,
     "original": "Eastern Bolivian Guaraní gui gui"
    },
    {
     "id": "eq-D-298",
     "type": "equation",
     "page": 20,
     "original": "22.72"
    },
    {
     "id": "eq-D-299",
     "type": "equation",
     "page": 20,
     "original": "Eastern Egyptian Bedawi Arabic avl avl"
    },
    {
     "id": "eq-D-300",
     "type": "equation",
     "page": 20,
     "original": "1.86"
    },
    {
     "id": "eq-D-301",
     "type": "equation",
     "page": 20,
     "original": "Eastern Krahn kqo kqo"
    },
    {
     "id": "eq-D-302",
     "type": "equation",
     "page": 20,
     "original": "9.28"
    },
    {
     "id": "eq-D-303",
     "type": "equation",
     "page": 20,
     "original": "Eastern Mari mhr mhr"
    },
    {
     "id": "eq-D-304",
     "type": "equation",
     "page": 20,
     "original": "272.31"
    },
    {
     "id": "eq-D-305",
     "type": "equation",
     "page": 20,
     "original": "Eastern Yiddish ydd ydd"
    },
    {
     "id": "eq-D-306",
     "type": "equation",
     "page": 20,
     "original": "18.43"
    },
    {
     "id": "eq-D-307",
     "type": "equation",
     "page": 20,
     "original": "Ebrié ebr ebr"
    },
    {
     "id": "eq-D-308",
     "type": "equation",
     "page": 20,
     "original": "1.5"
    },
    {
     "id": "eq-D-309",
     "type": "equation",
     "page": 20,
     "original": "Eggon ego ego"
    },
    {
     "id": "eq-D-310",
     "type": "equation",
     "page": 20,
     "original": "9.95"
    },
    {
     "id": "eq-D-311",
     "type": "equation",
     "page": 20,
     "original": "Egyptian Arabic arz arz"
    },
    {
     "id": "eq-D-312",
     "type": "equation",
     "page": 20,
     "original": "23.23"
    },
    {
     "id": "eq-D-313",
     "type": "equation",
     "page": 20,
     "original": "Ejagham etu etu"
    },
    {
     "id": "eq-D-314",
     "type": "equation",
     "page": 20,
     "original": "10.3"
    },
    {
     "id": "eq-D-315",
     "type": "equation",
     "page": 20,
     "original": "Eleme elm elm"
    },
    {
     "id": "eq-D-316",
     "type": "equation",
     "page": 20,
     "original": "11.27"
    },
    {
     "id": "eq-D-317",
     "type": "equation",
     "page": 20,
     "original": "Eloyi afo afo"
    },
    {
     "id": "eq-D-318",
     "type": "equation",
     "page": 20,
     "original": "11.21"
    },
    {
     "id": "eq-D-319",
     "type": "equation",
     "page": 20,
     "original": "Embu ebu ebu"
    },
    {
     "id": "eq-D-320",
     "type": "equation",
     "page": 20,
     "original": "9.81"
    },
    {
     "id": "eq-D-321",
     "type": "equation",
     "page": 20,
     "original": "English en eng 206061.1 Erzya myv myv"
    },
    {
     "id": "eq-D-322",
     "type": "equation",
     "page": 20,
     "original": "3.1"
    },
    {
     "id": "eq-D-323",
     "type": "equation",
     "page": 20,
     "original": "Esan ish ish"
    },
    {
     "id": "eq-D-324",
     "type": "equation",
     "page": 20,
     "original": "10.05"
    },
    {
     "id": "eq-D-325",
     "type": "equation",
     "page": 20,
     "original": "Esperanto eo epo"
    },
    {
     "id": "eq-D-326",
     "type": "equation",
     "page": 20,
     "original": "1396.64"
    },
    {
     "id": "eq-D-327",
     "type": "equation",
     "page": 20,
     "original": "Estonian et est"
    },
    {
     "id": "eq-D-328",
     "type": "equation",
     "page": 20,
     "original": "960.37"
    },
    {
     "id": "eq-D-329",
     "type": "equation",
     "page": 20,
     "original": "Eton (Cameroon) eto eto"
    },
    {
     "id": "eq-D-330",
     "type": "equation",
     "page": 20,
     "original": "7.43"
    },
    {
     "id": "eq-D-331",
     "type": "equation",
     "page": 20,
     "original": "Ewondo ewo ewo"
    },
    {
     "id": "eq-D-332",
     "type": "equation",
     "page": 20,
     "original": "12.71"
    },
    {
     "id": "eq-D-333",
     "type": "equation",
     "page": 20,
     "original": "Extremaduran ext ext"
    },
    {
     "id": "eq-D-334",
     "type": "equation",
     "page": 20,
     "original": "13.59"
    },
    {
     "id": "eq-D-335",
     "type": "equation",
     "page": 20,
     "original": "Fang (Equatorial Guinea) fan fan"
    },
    {
     "id": "eq-D-336",
     "type": "equation",
     "page": 20,
     "original": "3.51"
    },
    {
     "id": "eq-D-337",
     "type": "equation",
     "page": 20,
     "original": "Fanti fat fat"
    },
    {
     "id": "eq-D-338",
     "type": "equation",
     "page": 20,
     "original": "11.38"
    },
    {
     "id": "eq-D-339",
     "type": "equation",
     "page": 20,
     "original": "Farefare gur gur"
    },
    {
     "id": "eq-D-340",
     "type": "equation",
     "page": 20,
     "original": "9.24"
    },
    {
     "id": "eq-D-341",
     "type": "equation",
     "page": 20,
     "original": "Fe’fe’ fmp fmp"
    },
    {
     "id": "eq-D-342",
     "type": "equation",
     "page": 20,
     "original": "9.86"
    },
    {
     "id": "eq-D-343",
     "type": "equation",
     "page": 20,
     "original": "Filipino fil fil"
    },
    {
     "id": "eq-D-344",
     "type": "equation",
     "page": 20,
     "original": "7.71"
    },
    {
     "id": "eq-D-345",
     "type": "equation",
     "page": 20,
     "original": "Filomena Mata-Coahuitlán Totonac tlp tlp"
    },
    {
     "id": "eq-D-346",
     "type": "equation",
     "page": 20,
     "original": "11.35"
    },
    {
     "id": "eq-D-347",
     "type": "equation",
     "page": 20,
     "original": "Finnish fi fin"
    },
    {
     "id": "eq-D-348",
     "type": "equation",
     "page": 20,
     "original": "468.62"
    },
    {
     "id": "eq-D-349",
     "type": "equation",
     "page": 20,
     "original": "Fipa fip fip"
    },
    {
     "id": "eq-D-350",
     "type": "equation",
     "page": 20,
     "original": "10.55"
    },
    {
     "id": "eq-D-351",
     "type": "equation",
     "page": 20,
     "original": "French fr fra"
    },
    {
     "id": "eq-D-352",
     "type": "equation",
     "page": 20,
     "original": "23675.32"
    },
    {
     "id": "eq-D-353",
     "type": "equation",
     "page": 20,
     "original": "Fulah ff ful"
    },
    {
     "id": "eq-D-354",
     "type": "equation",
     "page": 20,
     "original": "13.84"
    },
    {
     "id": "eq-D-355",
     "type": "equation",
     "page": 20,
     "original": "Galician gl glg"
    },
    {
     "id": "eq-D-356",
     "type": "equation",
     "page": 20,
     "original": "208.81"
    },
    {
     "id": "eq-D-357",
     "type": "equation",
     "page": 20,
     "original": "Gambian Wolof wof wof"
    },
    {
     "id": "eq-D-358",
     "type": "equation",
     "page": 20,
     "original": "9.46"
    },
    {
     "id": "eq-D-359",
     "type": "equation",
     "page": 20,
     "original": "Ganda lg lug"
    },
    {
     "id": "eq-D-360",
     "type": "equation",
     "page": 20,
     "original": "447.82"
    },
    {
     "id": "eq-D-361",
     "type": "equation",
     "page": 20,
     "original": "Garhwali gbm gbm"
    },
    {
     "id": "eq-D-362",
     "type": "equation",
     "page": 20,
     "original": "19.14"
    },
    {
     "id": "eq-D-363",
     "type": "equation",
     "page": 20,
     "original": "Gawar-Bati gwt gwt"
    },
    {
     "id": "eq-D-364",
     "type": "equation",
     "page": 20,
     "original": "12.16"
    },
    {
     "id": "eq-D-365",
     "type": "equation",
     "page": 20,
     "original": "Gawri gwc gwc"
    },
    {
     "id": "eq-D-366",
     "type": "equation",
     "page": 20,
     "original": "10.83"
    },
    {
     "id": "eq-D-367",
     "type": "equation",
     "page": 20,
     "original": "Gbagyi gbr gbr"
    },
    {
     "id": "eq-D-368",
     "type": "equation",
     "page": 20,
     "original": "12.12"
    },
    {
     "id": "eq-D-369",
     "type": "equation",
     "page": 20,
     "original": "Gbari gby gby"
    },
    {
     "id": "eq-D-370",
     "type": "equation",
     "page": 20,
     "original": "12.59"
    },
    {
     "id": "eq-D-371",
     "type": "equation",
     "page": 20,
     "original": "Geji gyz gyz"
    },
    {
     "id": "eq-D-372",
     "type": "equation",
     "page": 20,
     "original": "10.49"
    },
    {
     "id": "eq-D-373",
     "type": "equation",
     "page": 20,
     "original": "Gen gej gej"
    },
    {
     "id": "eq-D-374",
     "type": "equation",
     "page": 20,
     "original": "5.39"
    },
    {
     "id": "eq-D-375",
     "type": "equation",
     "page": 20,
     "original": "Georgian ka kat"
    },
    {
     "id": "eq-D-376",
     "type": "equation",
     "page": 20,
     "original": "156.96"
    },
    {
     "id": "eq-D-377",
     "type": "equation",
     "page": 20,
     "original": "German de deu 21927.13 Geser-Gorom ges ges"
    },
    {
     "id": "eq-D-378",
     "type": "equation",
     "page": 20,
     "original": "10.08"
    },
    {
     "id": "eq-D-379",
     "type": "equation",
     "page": 20,
     "original": "Gheg Albanian aln aln"
    },
    {
     "id": "eq-D-380",
     "type": "equation",
     "page": 20,
     "original": "3.92"
    },
    {
     "id": "eq-D-381",
     "type": "equation",
     "page": 20,
     "original": "Ghomálá’ bbj bbj"
    },
    {
     "id": "eq-D-382",
     "type": "equation",
     "page": 20,
     "original": "7.32"
    },
    {
     "id": "eq-D-383",
     "type": "equation",
     "page": 20,
     "original": "Gidar gid gid"
    },
    {
     "id": "eq-D-384",
     "type": "equation",
     "page": 20,
     "original": "10.06"
    },
    {
     "id": "eq-D-385",
     "type": "equation",
     "page": 20,
     "original": "Glavda glw glw"
    },
    {
     "id": "eq-D-386",
     "type": "equation",
     "page": 20,
     "original": "10.51"
    },
    {
     "id": "eq-D-387",
     "type": "equation",
     "page": 20,
     "original": "Goan Konkani gom gom"
    },
    {
     "id": "eq-D-388",
     "type": "equation",
     "page": 20,
     "original": "9.82"
    },
    {
     "id": "eq-D-389",
     "type": "equation",
     "page": 20,
     "original": "Goaria gig gig"
    },
    {
     "id": "eq-D-390",
     "type": "equation",
     "page": 20,
     "original": "9.41"
    },
    {
     "id": "eq-D-391",
     "type": "equation",
     "page": 20,
     "original": "Goemai ank ank"
    },
    {
     "id": "eq-D-392",
     "type": "equation",
     "page": 20,
     "original": "10.0"
    },
    {
     "id": "eq-D-393",
     "type": "equation",
     "page": 20,
     "original": "Gola gol gol"
    },
    {
     "id": "eq-D-394",
     "type": "equation",
     "page": 20,
     "original": "9.26"
    },
    {
     "id": "eq-D-395",
     "type": "equation",
     "page": 20,
     "original": "Greek el ell"
    },
    {
     "id": "eq-D-396",
     "type": "equation",
     "page": 20,
     "original": "2412.54"
    },
    {
     "id": "eq-D-397",
     "type": "equation",
     "page": 20,
     "original": "Guarani gn grn"
    },
    {
     "id": "eq-D-398",
     "type": "equation",
     "page": 20,
     "original": "4.06"
    },
    {
     "id": "eq-D-399",
     "type": "equation",
     "page": 20,
     "original": "Guduf-Gava gdf gdf"
    },
    {
     "id": "eq-D-400",
     "type": "equation",
     "page": 20,
     "original": "12.21"
    },
    {
     "id": "eq-D-401",
     "type": "equation",
     "page": 20,
     "original": "Guerrero Amuzgo amu amu"
    },
    {
     "id": "eq-D-402",
     "type": "equation",
     "page": 20,
     "original": "10.1"
    },
    {
     "id": "eq-D-403",
     "type": "equation",
     "page": 20,
     "original": "Gujarati gu guj"
    },
    {
     "id": "eq-D-404",
     "type": "equation",
     "page": 20,
     "original": "91.18"
    },
    {
     "id": "eq-D-405",
     "type": "equation",
     "page": 20,
     "original": "Gujari gju gju"
    },
    {
     "id": "eq-D-406",
     "type": "equation",
     "page": 20,
     "original": "8.66"
    },
    {
     "id": "eq-D-407",
     "type": "equation",
     "page": 20,
     "original": "Gulf Arabic afb afb"
    },
    {
     "id": "eq-D-408",
     "type": "equation",
     "page": 20,
     "original": "98.55"
    },
    {
     "id": "eq-D-409",
     "type": "equation",
     "page": 20,
     "original": "Gurgula ggg ggg"
    },
    {
     "id": "eq-D-410",
     "type": "equation",
     "page": 20,
     "original": "7.12"
    },
    {
     "id": "eq-D-411",
     "type": "equation",
     "page": 20,
     "original": "Gusii guz guz"
    },
    {
     "id": "eq-D-412",
     "type": "equation",
     "page": 20,
     "original": "9.5"
    },
    {
     "id": "eq-D-413",
     "type": "equation",
     "page": 20,
     "original": "Gusilay gsl gsl"
    },
    {
     "id": "eq-D-414",
     "type": "equation",
     "page": 20,
     "original": "10.0"
    },
    {
     "id": "eq-D-415",
     "type": "equation",
     "page": 20,
     "original": "Gweno gwe gwe"
    },
    {
     "id": "eq-D-416",
     "type": "equation",
     "page": 20,
     "original": "8.87"
    },
    {
     "id": "eq-D-417",
     "type": "equation",
     "page": 20,
     "original": "Güilá Zapotec ztu ztu"
    },
    {
     "id": "eq-D-418",
     "type": "equation",
     "page": 20,
     "original": "9.17"
    },
    {
     "id": "eq-D-419",
     "type": "equation",
     "page": 20,
     "original": "Hadothi hoj hoj"
    },
    {
     "id": "eq-D-420",
     "type": "equation",
     "page": 20,
     "original": "10.08"
    },
    {
     "id": "eq-D-421",
     "type": "equation",
     "page": 20,
     "original": "Hahon hah hah"
    },
    {
     "id": "eq-D-422",
     "type": "equation",
     "page": 20,
     "original": "9.64"
    },
    {
     "id": "eq-D-423",
     "type": "equation",
     "page": 20,
     "original": "Haitian ht hat"
    },
    {
     "id": "eq-D-424",
     "type": "equation",
     "page": 20,
     "original": "0.04"
    },
    {
     "id": "eq-D-425",
     "type": "equation",
     "page": 20,
     "original": "Hakha Chin cnh cnh"
    },
    {
     "id": "eq-D-426",
     "type": "equation",
     "page": 20,
     "original": "2.24"
    },
    {
     "id": "eq-D-427",
     "type": "equation",
     "page": 20,
     "original": "Hakö hao hao"
    },
    {
     "id": "eq-D-428",
     "type": "equation",
     "page": 20,
     "original": "8.56"
    },
    {
     "id": "eq-D-429",
     "type": "equation",
     "page": 20,
     "original": "Halia hla hla"
    },
    {
     "id": "eq-D-430",
     "type": "equation",
     "page": 20,
     "original": "9.86"
    },
    {
     "id": "eq-D-431",
     "type": "equation",
     "page": 20,
     "original": "Hausa ha hau"
    },
    {
     "id": "eq-D-432",
     "type": "equation",
     "page": 20,
     "original": "17.75"
    },
    {
     "id": "eq-D-433",
     "type": "equation",
     "page": 20,
     "original": "Hawaiian haw haw"
    },
    {
     "id": "eq-D-434",
     "type": "equation",
     "page": 20,
     "original": "11.79"
    },
    {
     "id": "eq-D-435",
     "type": "equation",
     "page": 20,
     "original": "Hazaragi haz haz"
    },
    {
     "id": "eq-D-436",
     "type": "equation",
     "page": 20,
     "original": "9.69"
    },
    {
     "id": "eq-D-437",
     "type": "equation",
     "page": 20,
     "original": "Hebrew he heb"
    },
    {
     "id": "eq-D-438",
     "type": "equation",
     "page": 20,
     "original": "13.4"
    },
    {
     "id": "eq-D-439",
     "type": "equation",
     "page": 20,
     "original": "Hemba hem hem"
    },
    {
     "id": "eq-D-440",
     "type": "equation",
     "page": 20,
     "original": "9.53"
    },
    {
     "id": "eq-D-441",
     "type": "equation",
     "page": 20,
     "original": "Herero hz her"
    },
    {
     "id": "eq-D-442",
     "type": "equation",
     "page": 20,
     "original": "9.59"
    },
    {
     "id": "eq-D-443",
     "type": "equation",
     "page": 20,
     "original": "Highland Konjo kjk kjk"
    },
    {
     "id": "eq-D-444",
     "type": "equation",
     "page": 20,
     "original": "10.21"
    },
    {
     "id": "eq-D-445",
     "type": "equation",
     "page": 20,
     "original": "Hijazi Arabic acw acw"
    },
    {
     "id": "eq-D-446",
     "type": "equation",
     "page": 20,
     "original": "22.32"
    },
    {
     "id": "eq-D-447",
     "type": "equation",
     "page": 20,
     "original": "Hindi hi hin"
    },
    {
     "id": "eq-D-448",
     "type": "equation",
     "page": 20,
     "original": "117.17"
    },
    {
     "id": "eq-D-449",
     "type": "equation",
     "page": 20,
     "original": "Huarijio var var"
    },
    {
     "id": "eq-D-450",
     "type": "equation",
     "page": 20,
     "original": "9.28"
    },
    {
     "id": "eq-D-451",
     "type": "equation",
     "page": 20,
     "original": "Huautla Mazatec mau mau"
    },
    {
     "id": "eq-D-452",
     "type": "equation",
     "page": 20,
     "original": "6.39"
    },
    {
     "id": "eq-D-453",
     "type": "equation",
     "page": 20,
     "original": "Huaxcaleca Nahuatl nhq nhq"
    },
    {
     "id": "eq-D-454",
     "type": "equation",
     "page": 20,
     "original": "5.07"
    },
    {
     "id": "eq-D-455",
     "type": "equation",
     "page": 20,
     "original": "Huba hbb hbb"
    },
    {
     "id": "eq-D-456",
     "type": "equation",
     "page": 20,
     "original": "10.7"
    },
    {
     "id": "eq-D-457",
     "type": "equation",
     "page": 20,
     "original": "Huitepec Mixtec mxs mxs"
    },
    {
     "id": "eq-D-458",
     "type": "equation",
     "page": 20,
     "original": "9.64"
    },
    {
     "id": "eq-D-459",
     "type": "equation",
     "page": 20,
     "original": "Hula hul hul"
    },
    {
     "id": "eq-D-460",
     "type": "equation",
     "page": 20,
     "original": "10.33"
    },
    {
     "id": "eq-D-461",
     "type": "equation",
     "page": 20,
     "original": "Hungarian hu hun"
    },
    {
     "id": "eq-D-462",
     "type": "equation",
     "page": 20,
     "original": "255.83"
    },
    {
     "id": "eq-D-463",
     "type": "equation",
     "page": 20,
     "original": "Hunjara-Kaina Ke hkk hkk"
    },
    {
     "id": "eq-D-464",
     "type": "equation",
     "page": 20,
     "original": "8.69"
    },
    {
     "id": "eq-D-465",
     "type": "equation",
     "page": 20,
     "original": "Hwana hwo hwo"
    },
    {
     "id": "eq-D-466",
     "type": "equation",
     "page": 20,
     "original": "11.23"
    },
    {
     "id": "eq-D-467",
     "type": "equation",
     "page": 20,
     "original": "Ibibio ibb ibb"
    },
    {
     "id": "eq-D-468",
     "type": "equation",
     "page": 20,
     "original": "7.38"
    },
    {
     "id": "eq-D-469",
     "type": "equation",
     "page": 20,
     "original": "Icelandic is isl"
    },
    {
     "id": "eq-D-470",
     "type": "equation",
     "page": 20,
     "original": "647.29"
    },
    {
     "id": "eq-D-471",
     "type": "equation",
     "page": 20,
     "original": "Idakho-Isukha-Tiriki ida ida"
    },
    {
     "id": "eq-D-472",
     "type": "equation",
     "page": 20,
     "original": "9.31"
    },
    {
     "id": "eq-D-473",
     "type": "equation",
     "page": 20,
     "original": "Idoma idu idu"
    },
    {
     "id": "eq-D-474",
     "type": "equation",
     "page": 20,
     "original": "11.16"
    },
    {
     "id": "eq-D-475",
     "type": "equation",
     "page": 20,
     "original": "Igbo ig ibo"
    },
    {
     "id": "eq-D-476",
     "type": "equation",
     "page": 20,
     "original": "13.69"
    },
    {
     "id": "eq-D-477",
     "type": "equation",
     "page": 20,
     "original": "Igo ahl ahl"
    },
    {
     "id": "eq-D-478",
     "type": "equation",
     "page": 20,
     "original": "9.22"
    },
    {
     "id": "eq-D-479",
     "type": "equation",
     "page": 20,
     "original": "Ikposo kpo kpo"
    },
    {
     "id": "eq-D-480",
     "type": "equation",
     "page": 20,
     "original": "7.83"
    },
    {
     "id": "eq-D-481",
     "type": "equation",
     "page": 20,
     "original": "Ikwere ikw ikw"
    },
    {
     "id": "eq-D-482",
     "type": "equation",
     "page": 20,
     "original": "10.0"
    },
    {
     "id": "eq-D-483",
     "type": "equation",
     "page": 20,
     "original": "Imbabura Highland Quichua qvi qvi"
    },
    {
     "id": "eq-D-484",
     "type": "equation",
     "page": 20,
     "original": "11.0"
    },
    {
     "id": "eq-D-485",
     "type": "equation",
     "page": 20,
     "original": "Indonesian id ind"
    },
    {
     "id": "eq-D-486",
     "type": "equation",
     "page": 20,
     "original": "6327.87"
    },
    {
     "id": "eq-D-487",
     "type": "equation",
     "page": 20,
     "original": "Indus Kohistani mvy mvy"
    },
    {
     "id": "eq-D-488",
     "type": "equation",
     "page": 20,
     "original": "21.64"
    },
    {
     "id": "eq-D-489",
     "type": "equation",
     "page": 20,
     "original": "Interlingua ia ina"
    },
    {
     "id": "eq-D-490",
     "type": "equation",
     "page": 20,
     "original": "13.48"
    },
    {
     "id": "eq-D-491",
     "type": "equation",
     "page": 20,
     "original": "Inupiaq ik ipk"
    },
    {
     "id": "eq-D-492",
     "type": "equation",
     "page": 20,
     "original": "2.11"
    },
    {
     "id": "eq-D-493",
     "type": "equation",
     "page": 20,
     "original": "Irish ga gle"
    },
    {
     "id": "eq-D-494",
     "type": "equation",
     "page": 20,
     "original": "21.4"
    },
    {
     "id": "eq-D-495",
     "type": "equation",
     "page": 20,
     "original": "Iron Ossetic os oss"
    },
    {
     "id": "eq-D-496",
     "type": "equation",
     "page": 20,
     "original": "1.38"
    },
    {
     "id": "eq-D-497",
     "type": "equation",
     "page": 20,
     "original": "Isekiri its its"
    },
    {
     "id": "eq-D-498",
     "type": "equation",
     "page": 20,
     "original": "11.85"
    },
    {
     "id": "eq-D-499",
     "type": "equation",
     "page": 20,
     "original": "Isoko iso iso"
    },
    {
     "id": "eq-D-500",
     "type": "equation",
     "page": 20,
     "original": "10.33"
    },
    {
     "id": "eq-D-501",
     "type": "equation",
     "page": 20,
     "original": "Italian it ita"
    },
    {
     "id": "eq-D-502",
     "type": "equation",
     "page": 20,
     "original": "9402.46"
    },
    {
     "id": "eq-D-503",
     "type": "equation",
     "page": 20,
     "original": "Ito itw itw"
    },
    {
     "id": "eq-D-504",
     "type": "equation",
     "page": 20,
     "original": "9.19"
    },
    {
     "id": "eq-D-505",
     "type": "equation",
     "page": 20,
     "original": "Itzá itz itz"
    },
    {
     "id": "eq-D-506",
     "type": "equation",
     "page": 20,
     "original": "7.08"
    },
    {
     "id": "eq-D-507",
     "type": "equation",
     "page": 20,
     "original": "Ixtayutla Mixtec vmj vmj"
    },
    {
     "id": "eq-D-508",
     "type": "equation",
     "page": 20,
     "original": "10.17"
    },
    {
     "id": "eq-D-509",
     "type": "equation",
     "page": 20,
     "original": "Izon ijc ijc"
    },
    {
     "id": "eq-D-510",
     "type": "equation",
     "page": 20,
     "original": "9.95"
    },
    {
     "id": "eq-D-511",
     "type": "equation",
     "page": 20,
     "original": "Jambi Malay jax jax"
    },
    {
     "id": "eq-D-512",
     "type": "equation",
     "page": 20,
     "original": "10.29"
    },
    {
     "id": "eq-D-513",
     "type": "equation",
     "page": 20,
     "original": "Japanese ja jpn"
    },
    {
     "id": "eq-D-514",
     "type": "equation",
     "page": 20,
     "original": "36914.4"
    },
    {
     "id": "eq-D-515",
     "type": "equation",
     "page": 20,
     "original": "Jaqaru jqr jqr"
    },
    {
     "id": "eq-D-516",
     "type": "equation",
     "page": 20,
     "original": "9.32"
    },
    {
     "id": "eq-D-517",
     "type": "equation",
     "page": 20,
     "original": "Jauja Wanca Quechua qxw qxw"
    },
    {
     "id": "eq-D-518",
     "type": "equation",
     "page": 20,
     "original": "11.42"
    },
    {
     "id": "eq-D-519",
     "type": "equation",
     "page": 20,
     "original": "Jaunsari jns jns"
    },
    {
     "id": "eq-D-520",
     "type": "equation",
     "page": 20,
     "original": "11.25"
    },
    {
     "id": "eq-D-521",
     "type": "equation",
     "page": 20,
     "original": "Javanese jv jav"
    },
    {
     "id": "eq-D-522",
     "type": "equation",
     "page": 20,
     "original": "11.19"
    },
    {
     "id": "eq-D-523",
     "type": "equation",
     "page": 20,
     "original": "Jiba juo juo"
    },
    {
     "id": "eq-D-524",
     "type": "equation",
     "page": 20,
     "original": "10.43"
    },
    {
     "id": "eq-D-525",
     "type": "equation",
     "page": 20,
     "original": "Jju kaj kaj"
    },
    {
     "id": "eq-D-526",
     "type": "equation",
     "page": 20,
     "original": "10.16"
    },
    {
     "id": "eq-D-527",
     "type": "equation",
     "page": 20,
     "original": "Judeo-Moroccan Arabic aju aju"
    },
    {
     "id": "eq-D-528",
     "type": "equation",
     "page": 20,
     "original": "7.21"
    },
    {
     "id": "eq-D-529",
     "type": "equation",
     "page": 20,
     "original": "Juxtlahuaca Mixtec vmc vmc"
    },
    {
     "id": "eq-D-530",
     "type": "equation",
     "page": 20,
     "original": "9.43"
    },
    {
     "id": "eq-D-531",
     "type": "equation",
     "page": 20,
     "original": "Kabardian kbd kbd"
    },
    {
     "id": "eq-D-532",
     "type": "equation",
     "page": 20,
     "original": "108.35"
    },
    {
     "id": "eq-D-533",
     "type": "equation",
     "page": 20,
     "original": "Kabras lkb lkb"
    },
    {
     "id": "eq-D-534",
     "type": "equation",
     "page": 20,
     "original": "9.99"
    },
    {
     "id": "eq-D-535",
     "type": "equation",
     "page": 20,
     "original": "Kabuverdianu kea kea"
    },
    {
     "id": "eq-D-536",
     "type": "equation",
     "page": 20,
     "original": "10.51"
    },
    {
     "id": "eq-D-537",
     "type": "equation",
     "page": 20,
     "original": "Kabyle kab kab"
    },
    {
     "id": "eq-D-538",
     "type": "equation",
     "page": 20,
     "original": "529.52"
    },
    {
     "id": "eq-D-539",
     "type": "equation",
     "page": 20,
     "original": "Kachi Koli gjk gjk"
    },
    {
     "id": "eq-D-540",
     "type": "equation",
     "page": 20,
     "original": "20.83"
    },
    {
     "id": "eq-D-541",
     "type": "equation",
     "page": 20,
     "original": "Kairak ckr ckr"
    },
    {
     "id": "eq-D-542",
     "type": "equation",
     "page": 20,
     "original": "10.51"
    },
    {
     "id": "eq-D-543",
     "type": "equation",
     "page": 20,
     "original": "Kalabari ijn ijn"
    },
    {
     "id": "eq-D-544",
     "type": "equation",
     "page": 20,
     "original": "11.04"
    },
    {
     "id": "eq-D-545",
     "type": "equation",
     "page": 20,
     "original": "Kalasha kls kls"
    },
    {
     "id": "eq-D-546",
     "type": "equation",
     "page": 20,
     "original": "9.11"
    },
    {
     "id": "eq-D-547",
     "type": "equation",
     "page": 20,
     "original": "Kalenjin kln kln"
    },
    {
     "id": "eq-D-548",
     "type": "equation",
     "page": 20,
     "original": "40.42"
    },
    {
     "id": "eq-D-549",
     "type": "equation",
     "page": 20,
     "original": "Kalkoti xka xka"
    },
    {
     "id": "eq-D-550",
     "type": "equation",
     "page": 20,
     "original": "8.0"
    },
    {
     "id": "eq-D-551",
     "type": "equation",
     "page": 20,
     "original": "Kamba kam kam"
    },
    {
     "id": "eq-D-552",
     "type": "equation",
     "page": 20,
     "original": "14.72"
    },
    {
     "id": "eq-D-553",
     "type": "equation",
     "page": 20,
     "original": "Kamo kcq kcq"
    },
    {
     "id": "eq-D-554",
     "type": "equation",
     "page": 20,
     "original": "10.49"
    },
    {
     "id": "eq-D-555",
     "type": "equation",
     "page": 20,
     "original": "Kanauji bjj bjj"
    },
    {
     "id": "eq-D-556",
     "type": "equation",
     "page": 20,
     "original": "11.01"
    },
    {
     "id": "eq-D-557",
     "type": "equation",
     "page": 20,
     "original": "Kanembu kbl kbl"
    },
    {
     "id": "eq-D-558",
     "type": "equation",
     "page": 20,
     "original": "10.19"
    },
    {
     "id": "eq-D-559",
     "type": "equation",
     "page": 20,
     "original": "Kannada kn kan"
    },
    {
     "id": "eq-D-560",
     "type": "equation",
     "page": 20,
     "original": "128.06"
    },
    {
     "id": "eq-D-561",
     "type": "equation",
     "page": 20,
     "original": "Karekare kai kai"
    },
    {
     "id": "eq-D-562",
     "type": "equation",
     "page": 20,
     "original": "10.52"
    },
    {
     "id": "eq-D-563",
     "type": "equation",
     "page": 20,
     "original": "Kashmiri ks kas"
    },
    {
     "id": "eq-D-564",
     "type": "equation",
     "page": 20,
     "original": "110.42"
    },
    {
     "id": "eq-D-565",
     "type": "equation",
     "page": 20,
     "original": "Kathoriya Tharu tkt tkt"
    },
    {
     "id": "eq-D-566",
     "type": "equation",
     "page": 20,
     "original": "10.64"
    },
    {
     "id": "eq-D-567",
     "type": "equation",
     "page": 20,
     "original": "Kati bsh bsh"
    },
    {
     "id": "eq-D-568",
     "type": "equation",
     "page": 20,
     "original": "8.77"
    },
    {
     "id": "eq-D-569",
     "type": "equation",
     "page": 20,
     "original": "Kazakh kk kaz"
    },
    {
     "id": "eq-D-570",
     "type": "equation",
     "page": 20,
     "original": "1537.29"
    },
    {
     "id": "eq-D-571",
     "type": "equation",
     "page": 20,
     "original": "Keiyo eyo eyo"
    },
    {
     "id": "eq-D-572",
     "type": "equation",
     "page": 20,
     "original": "9.24"
    },
    {
     "id": "eq-D-573",
     "type": "equation",
     "page": 20,
     "original": "Khams Tibetan khg khg"
    },
    {
     "id": "eq-D-574",
     "type": "equation",
     "page": 20,
     "original": "6.38"
    },
    {
     "id": "eq-D-575",
     "type": "equation",
     "page": 20,
     "original": "Khana ogo ogo"
    },
    {
     "id": "eq-D-576",
     "type": "equation",
     "page": 20,
     "original": "10.51"
    },
    {
     "id": "eq-D-577",
     "type": "equation",
     "page": 20,
     "original": "Khetrani xhe xhe"
    },
    {
     "id": "eq-D-578",
     "type": "equation",
     "page": 20,
     "original": "9.4"
    },
    {
     "id": "eq-D-579",
     "type": "equation",
     "page": 20,
     "original": "Khmer km khm"
    },
    {
     "id": "eq-D-580",
     "type": "equation",
     "page": 20,
     "original": "7.1"
    },
    {
     "id": "eq-D-581",
     "type": "equation",
     "page": 20,
     "original": "Khowar khw khw"
    },
    {
     "id": "eq-D-582",
     "type": "equation",
     "page": 20,
     "original": "15.55"
    },
    {
     "id": "eq-D-583",
     "type": "equation",
     "page": 20,
     "original": "Kinga zga zga"
    },
    {
     "id": "eq-D-584",
     "type": "equation",
     "page": 20,
     "original": "9.5"
    },
    {
     "id": "eq-D-585",
     "type": "equation",
     "page": 20,
     "original": "Kinnauri kfk kfk"
    },
    {
     "id": "eq-D-586",
     "type": "equation",
     "page": 20,
     "original": "10.32"
    },
    {
     "id": "eq-D-587",
     "type": "equation",
     "page": 20,
     "original": "Kinyarwanda rw kin"
    },
    {
     "id": "eq-D-588",
     "type": "equation",
     "page": 20,
     "original": "2021.66"
    },
    {
     "id": "eq-D-589",
     "type": "equation",
     "page": 20,
     "original": "Kirghiz ky kir"
    },
    {
     "id": "eq-D-590",
     "type": "equation",
     "page": 20,
     "original": "46.63"
    },
    {
     "id": "eq-D-591",
     "type": "equation",
     "page": 20,
     "original": "Kirya-Konzäl fkk fkk"
    },
    {
     "id": "eq-D-592",
     "type": "equation",
     "page": 20,
     "original": "9.98"
    },
    {
     "id": "eq-D-593",
     "type": "equation",
     "page": 20,
     "original": "Kochila Tharu thq thq"
    },
    {
     "id": "eq-D-594",
     "type": "equation",
     "page": 20,
     "original": "10.28"
    },
    {
     "id": "eq-D-595",
     "type": "equation",
     "page": 20,
     "original": "Kohistani Shina plk plk"
    },
    {
     "id": "eq-D-596",
     "type": "equation",
     "page": 20,
     "original": "12.75"
    },
    {
     "id": "eq-D-597",
     "type": "equation",
     "page": 20,
     "original": "Kohumono bcs bcs"
    },
    {
     "id": "eq-D-598",
     "type": "equation",
     "page": 20,
     "original": "10.45"
    },
    {
     "id": "eq-D-599",
     "type": "equation",
     "page": 20,
     "original": "Kok Borok trp trp"
    },
    {
     "id": "eq-D-600",
     "type": "equation",
     "page": 20,
     "original": "10.74"
    },
    {
     "id": "eq-D-601",
     "type": "equation",
     "page": 20,
     "original": "Kol (Papua New Guinea) kol kol"
    },
    {
     "id": "eq-D-602",
     "type": "equation",
     "page": 20,
     "original": "9.95"
    },
    {
     "id": "eq-D-603",
     "type": "equation",
     "page": 20,
     "original": "Kom (Cameroon) bkm bkm"
    },
    {
     "id": "eq-D-604",
     "type": "equation",
     "page": 20,
     "original": "10.76"
    },
    {
     "id": "eq-D-605",
     "type": "equation",
     "page": 20,
     "original": "Koma kmy kmy"
    },
    {
     "id": "eq-D-606",
     "type": "equation",
     "page": 20,
     "original": "10.28"
    },
    {
     "id": "eq-D-607",
     "type": "equation",
     "page": 20,
     "original": "Konkani knn knn"
    },
    {
     "id": "eq-D-608",
     "type": "equation",
     "page": 20,
     "original": "112.83"
    },
    {
     "id": "eq-D-609",
     "type": "equation",
     "page": 20,
     "original": "Konzo koo koo"
    },
    {
     "id": "eq-D-610",
     "type": "equation",
     "page": 20,
     "original": "13.23"
    },
    {
     "id": "eq-D-611",
     "type": "equation",
     "page": 20,
     "original": "Korean ko kor"
    },
    {
     "id": "eq-D-612",
     "type": "equation",
     "page": 20,
     "original": "8609.28"
    },
    {
     "id": "eq-D-613",
     "type": "equation",
     "page": 20,
     "original": "Korwa kfp kfp"
    },
    {
     "id": "eq-D-614",
     "type": "equation",
     "page": 20,
     "original": "11.87"
    },
    {
     "id": "eq-D-615",
     "type": "equation",
     "page": 20,
     "original": "Kota (India) kfe kfe"
    },
    {
     "id": "eq-D-616",
     "type": "equation",
     "page": 20,
     "original": "10.25"
    },
    {
     "id": "eq-D-617",
     "type": "equation",
     "page": 20,
     "original": "Koti eko eko"
    },
    {
     "id": "eq-D-618",
     "type": "equation",
     "page": 20,
     "original": "8.15"
    },
    {
     "id": "eq-D-619",
     "type": "equation",
     "page": 20,
     "original": "Kuanua ksd ksd"
    },
    {
     "id": "eq-D-620",
     "type": "equation",
     "page": 20,
     "original": "9.91"
    },
    {
     "id": "eq-D-621",
     "type": "equation",
     "page": 20,
     "original": "Kuanyama kj kua"
    },
    {
     "id": "eq-D-622",
     "type": "equation",
     "page": 20,
     "original": "9.88"
    },
    {
     "id": "eq-D-623",
     "type": "equation",
     "page": 20,
     "original": "Kui (India) uki uki"
    },
    {
     "id": "eq-D-624",
     "type": "equation",
     "page": 20,
     "original": "10.77"
    },
    {
     "id": "eq-D-625",
     "type": "equation",
     "page": 20,
     "original": "Kulung (Nigeria) bbu bbu"
    },
    {
     "id": "eq-D-626",
     "type": "equation",
     "page": 20,
     "original": "10.39"
    },
    {
     "id": "eq-D-627",
     "type": "equation",
     "page": 20,
     "original": "Kuot kto kto"
    },
    {
     "id": "eq-D-628",
     "type": "equation",
     "page": 20,
     "original": "9.77"
    },
    {
     "id": "eq-D-629",
     "type": "equation",
     "page": 20,
     "original": "Kushi kuh kuh"
    },
    {
     "id": "eq-D-630",
     "type": "equation",
     "page": 20,
     "original": "10.35"
    },
    {
     "id": "eq-D-631",
     "type": "equation",
     "page": 20,
     "original": "Kwambi kwm kwm"
    },
    {
     "id": "eq-D-632",
     "type": "equation",
     "page": 20,
     "original": "9.9"
    },
    {
     "id": "eq-D-633",
     "type": "equation",
     "page": 20,
     "original": "Kwasio nmg nmg"
    },
    {
     "id": "eq-D-634",
     "type": "equation",
     "page": 20,
     "original": "10.39"
    },
    {
     "id": "eq-D-635",
     "type": "equation",
     "page": 20,
     "original": "Lala-Roba lla lla"
    },
    {
     "id": "eq-D-636",
     "type": "equation",
     "page": 20,
     "original": "10.38"
    },
    {
     "id": "eq-D-637",
     "type": "equation",
     "page": 20,
     "original": "Lamang hia hia"
    },
    {
     "id": "eq-D-638",
     "type": "equation",
     "page": 20,
     "original": "11.07"
    },
    {
     "id": "eq-D-639",
     "type": "equation",
     "page": 20,
     "original": "Lao lo lao"
    },
    {
     "id": "eq-D-640",
     "type": "equation",
     "page": 20,
     "original": "7.63"
    },
    {
     "id": "eq-D-641",
     "type": "equation",
     "page": 20,
     "original": "Larike-Wakasihu alo alo"
    },
    {
     "id": "eq-D-642",
     "type": "equation",
     "page": 20,
     "original": "9.97"
    },
    {
     "id": "eq-D-643",
     "type": "equation",
     "page": 20,
     "original": "Lasi lss lss"
    },
    {
     "id": "eq-D-644",
     "type": "equation",
     "page": 20,
     "original": "6.53"
    },
    {
     "id": "eq-D-645",
     "type": "equation",
     "page": 20,
     "original": "Latgalian ltg ltg"
    },
    {
     "id": "eq-D-646",
     "type": "equation",
     "page": 20,
     "original": "27.23"
    },
    {
     "id": "eq-D-647",
     "type": "equation",
     "page": 20,
     "original": "Latvian lv lav"
    },
    {
     "id": "eq-D-648",
     "type": "equation",
     "page": 20,
     "original": "1441.58"
    },
    {
     "id": "eq-D-649",
     "type": "equation",
     "page": 20,
     "original": "Levantine Arabic apc apc"
    },
    {
     "id": "eq-D-650",
     "type": "equation",
     "page": 20,
     "original": "15.65"
    },
    {
     "id": "eq-D-651",
     "type": "equation",
     "page": 20,
     "original": "Liana-Seti ste ste"
    },
    {
     "id": "eq-D-652",
     "type": "equation",
     "page": 20,
     "original": "10.43"
    },
    {
     "id": "eq-D-653",
     "type": "equation",
     "page": 20,
     "original": "Liberia Kpelle xpe xpe"
    },
    {
     "id": "eq-D-654",
     "type": "equation",
     "page": 20,
     "original": "9.5"
    },
    {
     "id": "eq-D-655",
     "type": "equation",
     "page": 20,
     "original": "Liberian English lir lir"
    },
    {
     "id": "eq-D-656",
     "type": "equation",
     "page": 20,
     "original": "10.26"
    },
    {
     "id": "eq-D-657",
     "type": "equation",
     "page": 20,
     "original": "Libyan Arabic ayl ayl"
    },
    {
     "id": "eq-D-658",
     "type": "equation",
     "page": 20,
     "original": "20.13"
    },
    {
     "id": "eq-D-659",
     "type": "equation",
     "page": 20,
     "original": "Ligurian lij lij"
    },
    {
     "id": "eq-D-660",
     "type": "equation",
     "page": 20,
     "original": "15.97"
    },
    {
     "id": "eq-D-661",
     "type": "equation",
     "page": 20,
     "original": "Lijili mgi mgi"
    },
    {
     "id": "eq-D-662",
     "type": "equation",
     "page": 20,
     "original": "10.89"
    },
    {
     "id": "eq-D-663",
     "type": "equation",
     "page": 20,
     "original": "Lingala ln lin"
    },
    {
     "id": "eq-D-664",
     "type": "equation",
     "page": 20,
     "original": "17.99"
    },
    {
     "id": "eq-D-665",
     "type": "equation",
     "page": 20,
     "original": "Lithuanian lt lit"
    },
    {
     "id": "eq-D-666",
     "type": "equation",
     "page": 20,
     "original": "2629.45"
    },
    {
     "id": "eq-D-667",
     "type": "equation",
     "page": 20,
     "original": "Loarki lrk lrk"
    },
    {
     "id": "eq-D-668",
     "type": "equation",
     "page": 20,
     "original": "10.5"
    },
    {
     "id": "eq-D-669",
     "type": "equation",
     "page": 20,
     "original": "Logooli rag rag"
    },
    {
     "id": "eq-D-670",
     "type": "equation",
     "page": 20,
     "original": "9.39"
    },
    {
     "id": "eq-D-671",
     "type": "equation",
     "page": 20,
     "original": "Logudorese Sardinian src src"
    },
    {
     "id": "eq-D-672",
     "type": "equation",
     "page": 20,
     "original": "10.67"
    },
    {
     "id": "eq-D-673",
     "type": "equation",
     "page": 20,
     "original": "Loja Highland Quichua qvj qvj"
    },
    {
     "id": "eq-D-674",
     "type": "equation",
     "page": 20,
     "original": "10.59"
    },
    {
     "id": "eq-D-675",
     "type": "equation",
     "page": 20,
     "original": "Loloda loa loa"
    },
    {
     "id": "eq-D-676",
     "type": "equation",
     "page": 20,
     "original": "9.31"
    },
    {
     "id": "eq-D-677",
     "type": "equation",
     "page": 20,
     "original": "Longuda lnu lnu"
    },
    {
     "id": "eq-D-678",
     "type": "equation",
     "page": 20,
     "original": "10.46"
    },
    {
     "id": "eq-D-679",
     "type": "equation",
     "page": 20,
     "original": "Loxicha Zapotec ztp ztp"
    },
    {
     "id": "eq-D-680",
     "type": "equation",
     "page": 20,
     "original": "9.62"
    },
    {
     "id": "eq-D-681",
     "type": "equation",
     "page": 20,
     "original": "Luba-Lulua lua lua"
    },
    {
     "id": "eq-D-682",
     "type": "equation",
     "page": 20,
     "original": "8.47"
    },
    {
     "id": "eq-D-683",
     "type": "equation",
     "page": 20,
     "original": "Luo luo luo"
    },
    {
     "id": "eq-D-684",
     "type": "equation",
     "page": 20,
     "original": "36.17"
    },
    {
     "id": "eq-D-685",
     "type": "equation",
     "page": 20,
     "original": "Lushai lus lus"
    },
    {
     "id": "eq-D-686",
     "type": "equation",
     "page": 20,
     "original": "20.24"
    },
    {
     "id": "eq-D-687",
     "type": "equation",
     "page": 20,
     "original": "Luxembourgish lb ltz"
    },
    {
     "id": "eq-D-688",
     "type": "equation",
     "page": 20,
     "original": "8.46"
    },
    {
     "id": "eq-D-689",
     "type": "equation",
     "page": 20,
     "original": "Maasina Fulfulde ffm ffm"
    },
    {
     "id": "eq-D-690",
     "type": "equation",
     "page": 20,
     "original": "10.46"
    },
    {
     "id": "eq-D-691",
     "type": "equation",
     "page": 20,
     "original": "Maba (Chad) mde mde"
    },
    {
     "id": "eq-D-692",
     "type": "equation",
     "page": 20,
     "original": "9.5"
    },
    {
     "id": "eq-D-693",
     "type": "equation",
     "page": 20,
     "original": "Macedo-Romanian rup rup"
    },
    {
     "id": "eq-D-694",
     "type": "equation",
     "page": 20,
     "original": "0.02"
    },
    {
     "id": "eq-D-695",
     "type": "equation",
     "page": 20,
     "original": "Macedonian mk mkd"
    },
    {
     "id": "eq-D-696",
     "type": "equation",
     "page": 20,
     "original": "27.21"
    },
    {
     "id": "eq-D-697",
     "type": "equation",
     "page": 20,
     "original": "Mada (Cameroon) mxu mxu"
    },
    {
     "id": "eq-D-698",
     "type": "equation",
     "page": 20,
     "original": "12.0"
    },
    {
     "id": "eq-D-699",
     "type": "equation",
     "page": 20,
     "original": "Mafa maf maf"
    },
    {
     "id": "eq-D-700",
     "type": "equation",
     "page": 20,
     "original": "9.97"
    },
    {
     "id": "eq-D-701",
     "type": "equation",
     "page": 20,
     "original": "Maithili mai mai"
    },
    {
     "id": "eq-D-702",
     "type": "equation",
     "page": 20,
     "original": "131.37"
    },
    {
     "id": "eq-D-703",
     "type": "equation",
     "page": 20,
     "original": "Malay ms msa"
    },
    {
     "id": "eq-D-704",
     "type": "equation",
     "page": 20,
     "original": "9.57"
    },
    {
     "id": "eq-D-705",
     "type": "equation",
     "page": 20,
     "original": "Malayalam ml mal"
    },
    {
     "id": "eq-D-706",
     "type": "equation",
     "page": 20,
     "original": "166.57"
    },
    {
     "id": "eq-D-707",
     "type": "equation",
     "page": 20,
     "original": "Mali gcc gcc"
    },
    {
     "id": "eq-D-708",
     "type": "equation",
     "page": 20,
     "original": "9.87"
    },
    {
     "id": "eq-D-709",
     "type": "equation",
     "page": 20,
     "original": "Malinaltepec Me’phaa tcf tcf"
    },
    {
     "id": "eq-D-710",
     "type": "equation",
     "page": 20,
     "original": "9.04"
    },
    {
     "id": "eq-D-711",
     "type": "equation",
     "page": 20,
     "original": "Maltese mt mlt"
    },
    {
     "id": "eq-D-712",
     "type": "equation",
     "page": 20,
     "original": "630.29"
    },
    {
     "id": "eq-D-713",
     "type": "equation",
     "page": 20,
     "original": "Mandara tbf tbf"
    },
    {
     "id": "eq-D-714",
     "type": "equation",
     "page": 20,
     "original": "10.01"
    },
    {
     "id": "eq-D-715",
     "type": "equation",
     "page": 20,
     "original": "Mandjak mfv mfv"
    },
    {
     "id": "eq-D-716",
     "type": "equation",
     "page": 20,
     "original": "9.55"
    },
    {
     "id": "eq-D-717",
     "type": "equation",
     "page": 20,
     "original": "Manggarai mqy mqy"
    },
    {
     "id": "eq-D-718",
     "type": "equation",
     "page": 20,
     "original": "10.5"
    },
    {
     "id": "eq-D-719",
     "type": "equation",
     "page": 20,
     "original": "Manipuri mni mni"
    },
    {
     "id": "eq-D-720",
     "type": "equation",
     "page": 20,
     "original": "44.46"
    },
    {
     "id": "eq-D-721",
     "type": "equation",
     "page": 20,
     "original": "Mansoanka msw msw"
    },
    {
     "id": "eq-D-722",
     "type": "equation",
     "page": 20,
     "original": "9.32"
    },
    {
     "id": "eq-D-723",
     "type": "equation",
     "page": 20,
     "original": "Manx gv glv"
    },
    {
     "id": "eq-D-724",
     "type": "equation",
     "page": 20,
     "original": "10.07"
    },
    {
     "id": "eq-D-725",
     "type": "equation",
     "page": 20,
     "original": "Maori mi mri"
    },
    {
     "id": "eq-D-726",
     "type": "equation",
     "page": 20,
     "original": "18.02"
    },
    {
     "id": "eq-D-727",
     "type": "equation",
     "page": 20,
     "original": "Marathi mr mar"
    },
    {
     "id": "eq-D-728",
     "type": "equation",
     "page": 20,
     "original": "156.71"
    },
    {
     "id": "eq-D-729",
     "type": "equation",
     "page": 20,
     "original": "Marghi Central mrt mrt"
    },
    {
     "id": "eq-D-730",
     "type": "equation",
     "page": 20,
     "original": "10.36"
    },
    {
     "id": "eq-D-731",
     "type": "equation",
     "page": 20,
     "original": "Marghi South mfm mfm"
    },
    {
     "id": "eq-D-732",
     "type": "equation",
     "page": 20,
     "original": "10.05"
    },
    {
     "id": "eq-D-733",
     "type": "equation",
     "page": 20,
     "original": "Maria (India) mrr mrr"
    },
    {
     "id": "eq-D-734",
     "type": "equation",
     "page": 20,
     "original": "11.0"
    },
    {
     "id": "eq-D-735",
     "type": "equation",
     "page": 20,
     "original": "Marwari (Pakistan) mve mve"
    },
    {
     "id": "eq-D-736",
     "type": "equation",
     "page": 20,
     "original": "9.96"
    },
    {
     "id": "eq-D-737",
     "type": "equation",
     "page": 20,
     "original": "Masana mcn mcn"
    },
    {
     "id": "eq-D-738",
     "type": "equation",
     "page": 20,
     "original": "10.09"
    },
    {
     "id": "eq-D-739",
     "type": "equation",
     "page": 20,
     "original": "Masikoro Malagasy msh msh"
    },
    {
     "id": "eq-D-740",
     "type": "equation",
     "page": 20,
     "original": "14.16"
    },
    {
     "id": "eq-D-741",
     "type": "equation",
     "page": 20,
     "original": "Matsés mcf mcf"
    },
    {
     "id": "eq-D-742",
     "type": "equation",
     "page": 20,
     "original": "9.61"
    },
    {
     "id": "eq-D-743",
     "type": "equation",
     "page": 20,
     "original": "Mazaltepec Zapotec zpy zpy"
    },
    {
     "id": "eq-D-744",
     "type": "equation",
     "page": 20,
     "original": "9.47"
    },
    {
     "id": "eq-D-745",
     "type": "equation",
     "page": 20,
     "original": "Mazatlán Mazatec vmz vmz"
    },
    {
     "id": "eq-D-746",
     "type": "equation",
     "page": 20,
     "original": "9.82"
    },
    {
     "id": "eq-D-747",
     "type": "equation",
     "page": 20,
     "original": "Mazatlán Mixe mzl mzl"
    },
    {
     "id": "eq-D-748",
     "type": "equation",
     "page": 20,
     "original": "10.05"
    },
    {
     "id": "eq-D-749",
     "type": "equation",
     "page": 20,
     "original": "Mbe mfo mfo"
    },
    {
     "id": "eq-D-750",
     "type": "equation",
     "page": 20,
     "original": "10.24"
    },
    {
     "id": "eq-D-751",
     "type": "equation",
     "page": 20,
     "original": "Mbo (Cameroon) mbo mbo"
    },
    {
     "id": "eq-D-752",
     "type": "equation",
     "page": 20,
     "original": "9.51"
    },
    {
     "id": "eq-D-753",
     "type": "equation",
     "page": 20,
     "original": "Mbum mdd mdd"
    },
    {
     "id": "eq-D-754",
     "type": "equation",
     "page": 20,
     "original": "9.82"
    },
    {
     "id": "eq-D-755",
     "type": "equation",
     "page": 20,
     "original": "Medumba byv byv"
    },
    {
     "id": "eq-D-756",
     "type": "equation",
     "page": 20,
     "original": "10.95"
    },
    {
     "id": "eq-D-757",
     "type": "equation",
     "page": 20,
     "original": "Mekeo mek mek"
    },
    {
     "id": "eq-D-758",
     "type": "equation",
     "page": 20,
     "original": "9.18"
    },
    {
     "id": "eq-D-759",
     "type": "equation",
     "page": 20,
     "original": "Meru mer mer"
    },
    {
     "id": "eq-D-760",
     "type": "equation",
     "page": 20,
     "original": "9.89"
    },
    {
     "id": "eq-D-761",
     "type": "equation",
     "page": 20,
     "original": "Mesopotamian Arabic acm acm"
    },
    {
     "id": "eq-D-762",
     "type": "equation",
     "page": 20,
     "original": "3.78"
    },
    {
     "id": "eq-D-763",
     "type": "equation",
     "page": 20,
     "original": "Mewari mtr mtr"
    },
    {
     "id": "eq-D-764",
     "type": "equation",
     "page": 20,
     "original": "10.58"
    },
    {
     "id": "eq-D-765",
     "type": "equation",
     "page": 20,
     "original": "Min Nan Chinese nan nan"
    },
    {
     "id": "eq-D-766",
     "type": "equation",
     "page": 20,
     "original": "17.55"
    },
    {
     "id": "eq-D-767",
     "type": "equation",
     "page": 20,
     "original": "Mingrelian xmf xmf"
    },
    {
     "id": "eq-D-768",
     "type": "equation",
     "page": 20,
     "original": "11.47"
    },
    {
     "id": "eq-D-769",
     "type": "equation",
     "page": 20,
     "original": "Mitlatongo Mixtec vmm vmm"
    },
    {
     "id": "eq-D-770",
     "type": "equation",
     "page": 20,
     "original": "9.95"
    },
    {
     "id": "eq-D-771",
     "type": "equation",
     "page": 20,
     "original": "Miya mkf mkf"
    },
    {
     "id": "eq-D-772",
     "type": "equation",
     "page": 20,
     "original": "10.16"
    },
    {
     "id": "eq-D-773",
     "type": "equation",
     "page": 20,
     "original": "Mokpwe bri bri"
    },
    {
     "id": "eq-D-774",
     "type": "equation",
     "page": 20,
     "original": "7.53"
    },
    {
     "id": "eq-D-775",
     "type": "equation",
     "page": 20,
     "original": "Moksha mdf mdf"
    },
    {
     "id": "eq-D-776",
     "type": "equation",
     "page": 20,
     "original": "0.47"
    },
    {
     "id": "eq-D-777",
     "type": "equation",
     "page": 20,
     "original": "Mom Jango ver ver"
    },
    {
     "id": "eq-D-778",
     "type": "equation",
     "page": 20,
     "original": "10.93"
    },
    {
     "id": "eq-D-779",
     "type": "equation",
     "page": 20,
     "original": "Mongolian mn mon"
    },
    {
     "id": "eq-D-780",
     "type": "equation",
     "page": 20,
     "original": "269.08"
    },
    {
     "id": "eq-D-781",
     "type": "equation",
     "page": 20,
     "original": "Moroccan Arabic ary ary"
    },
    {
     "id": "eq-D-782",
     "type": "equation",
     "page": 20,
     "original": "104.67"
    },
    {
     "id": "eq-D-783",
     "type": "equation",
     "page": 20,
     "original": "Motu meu meu"
    },
    {
     "id": "eq-D-784",
     "type": "equation",
     "page": 20,
     "original": "9.88"
    },
    {
     "id": "eq-D-785",
     "type": "equation",
     "page": 20,
     "original": "Mpiemo mcx mcx"
    },
    {
     "id": "eq-D-786",
     "type": "equation",
     "page": 20,
     "original": "9.88"
    },
    {
     "id": "eq-D-787",
     "type": "equation",
     "page": 20,
     "original": "Mpumpong mgg mgg"
    },
    {
     "id": "eq-D-788",
     "type": "equation",
     "page": 20,
     "original": "4.94"
    },
    {
     "id": "eq-D-789",
     "type": "equation",
     "page": 20,
     "original": "Mundang mua mua"
    },
    {
     "id": "eq-D-790",
     "type": "equation",
     "page": 20,
     "original": "9.2"
    },
    {
     "id": "eq-D-791",
     "type": "equation",
     "page": 20,
     "original": "Mungaka mhk mhk"
    },
    {
     "id": "eq-D-792",
     "type": "equation",
     "page": 20,
     "original": "7.53"
    },
    {
     "id": "eq-D-793",
     "type": "equation",
     "page": 20,
     "original": "Musey mse mse"
    },
    {
     "id": "eq-D-794",
     "type": "equation",
     "page": 20,
     "original": "7.21"
    },
    {
     "id": "eq-D-795",
     "type": "equation",
     "page": 20,
     "original": "Musgu mug mug"
    },
    {
     "id": "eq-D-796",
     "type": "equation",
     "page": 20,
     "original": "4.74"
    },
    {
     "id": "eq-D-797",
     "type": "equation",
     "page": 20,
     "original": "Musi mui mui"
    },
    {
     "id": "eq-D-798",
     "type": "equation",
     "page": 20,
     "original": "10.52"
    },
    {
     "id": "eq-D-799",
     "type": "equation",
     "page": 20,
     "original": "Naba mne mne"
    },
    {
     "id": "eq-D-800",
     "type": "equation",
     "page": 20,
     "original": "10.37"
    },
    {
     "id": "eq-D-801",
     "type": "equation",
     "page": 20,
     "original": "Najdi Arabic ars ars"
    },
    {
     "id": "eq-D-802",
     "type": "equation",
     "page": 20,
     "original": "203.54"
    },
    {
     "id": "eq-D-803",
     "type": "equation",
     "page": 20,
     "original": "Nalik nal nal"
    },
    {
     "id": "eq-D-804",
     "type": "equation",
     "page": 20,
     "original": "10.33"
    },
    {
     "id": "eq-D-805",
     "type": "equation",
     "page": 20,
     "original": "Nawdm nmz nmz"
    },
    {
     "id": "eq-D-806",
     "type": "equation",
     "page": 20,
     "original": "6.3"
    },
    {
     "id": "eq-D-807",
     "type": "equation",
     "page": 20,
     "original": "Ndonga ng ndo"
    },
    {
     "id": "eq-D-808",
     "type": "equation",
     "page": 20,
     "original": "9.08"
    },
    {
     "id": "eq-D-809",
     "type": "equation",
     "page": 20,
     "original": "Neapolitan nap nap"
    },
    {
     "id": "eq-D-810",
     "type": "equation",
     "page": 20,
     "original": "9.97"
    },
    {
     "id": "eq-D-811",
     "type": "equation",
     "page": 20,
     "original": "Nepali npi npi"
    },
    {
     "id": "eq-D-812",
     "type": "equation",
     "page": 20,
     "original": "171.5"
    },
    {
     "id": "eq-D-813",
     "type": "equation",
     "page": 20,
     "original": "Ngamo nbh nbh"
    },
    {
     "id": "eq-D-814",
     "type": "equation",
     "page": 20,
     "original": "10.04"
    },
    {
     "id": "eq-D-815",
     "type": "equation",
     "page": 20,
     "original": "Ngas anc anc"
    },
    {
     "id": "eq-D-816",
     "type": "equation",
     "page": 20,
     "original": "10.14"
    },
    {
     "id": "eq-D-817",
     "type": "equation",
     "page": 20,
     "original": "Ngiemboon nnh nnh"
    },
    {
     "id": "eq-D-818",
     "type": "equation",
     "page": 20,
     "original": "16.15"
    },
    {
     "id": "eq-D-819",
     "type": "equation",
     "page": 20,
     "original": "Ngizim ngi ngi"
    },
    {
     "id": "eq-D-820",
     "type": "equation",
     "page": 20,
     "original": "10.06"
    },
    {
     "id": "eq-D-821",
     "type": "equation",
     "page": 20,
     "original": "Ngomba jgo jgo"
    },
    {
     "id": "eq-D-822",
     "type": "equation",
     "page": 20,
     "original": "10.15"
    },
    {
     "id": "eq-D-823",
     "type": "equation",
     "page": 20,
     "original": "Ngombale nla nla"
    },
    {
     "id": "eq-D-824",
     "type": "equation",
     "page": 20,
     "original": "8.79"
    },
    {
     "id": "eq-D-825",
     "type": "equation",
     "page": 20,
     "original": "Nigerian Fulfulde fuv fuv"
    },
    {
     "id": "eq-D-826",
     "type": "equation",
     "page": 20,
     "original": "9.97"
    },
    {
     "id": "eq-D-827",
     "type": "equation",
     "page": 20,
     "original": "Nigerian Pidgin pcm pcm"
    },
    {
     "id": "eq-D-828",
     "type": "equation",
     "page": 20,
     "original": "11.04"
    },
    {
     "id": "eq-D-829",
     "type": "equation",
     "page": 20,
     "original": "Nimadi noe noe"
    },
    {
     "id": "eq-D-830",
     "type": "equation",
     "page": 20,
     "original": "11.12"
    },
    {
     "id": "eq-D-831",
     "type": "equation",
     "page": 20,
     "original": "Nobiin fia fia"
    },
    {
     "id": "eq-D-832",
     "type": "equation",
     "page": 20,
     "original": "9.96"
    },
    {
     "id": "eq-D-833",
     "type": "equation",
     "page": 20,
     "original": "North Mesopotamian Arabic ayp ayp"
    },
    {
     "id": "eq-D-834",
     "type": "equation",
     "page": 20,
     "original": "10.92"
    },
    {
     "id": "eq-D-835",
     "type": "equation",
     "page": 20,
     "original": "North Moluccan Malay max max"
    },
    {
     "id": "eq-D-836",
     "type": "equation",
     "page": 20,
     "original": "9.43"
    },
    {
     "id": "eq-D-837",
     "type": "equation",
     "page": 20,
     "original": "Northern Betsimisaraka Malagasy bmm bmm"
    },
    {
     "id": "eq-D-838",
     "type": "equation",
     "page": 20,
     "original": "19.12"
    },
    {
     "id": "eq-D-839",
     "type": "equation",
     "page": 20,
     "original": "Northern Hindko hno hno"
    },
    {
     "id": "eq-D-840",
     "type": "equation",
     "page": 20,
     "original": "20.04"
    },
    {
     "id": "eq-D-841",
     "type": "equation",
     "page": 20,
     "original": "Northern Kurdish kmr kmr"
    },
    {
     "id": "eq-D-842",
     "type": "equation",
     "page": 20,
     "original": "69.59"
    },
    {
     "id": "eq-D-843",
     "type": "equation",
     "page": 20,
     "original": "Northern Pame pmq pmq"
    },
    {
     "id": "eq-D-844",
     "type": "equation",
     "page": 20,
     "original": "10.24"
    },
    {
     "id": "eq-D-845",
     "type": "equation",
     "page": 20,
     "original": "Northern Pashto pbu pbu"
    },
    {
     "id": "eq-D-846",
     "type": "equation",
     "page": 20,
     "original": "11.03"
    },
    {
     "id": "eq-D-847",
     "type": "equation",
     "page": 20,
     "original": "Northern Uzbek uzn uzn"
    },
    {
     "id": "eq-D-848",
     "type": "equation",
     "page": 20,
     "original": "15.23"
    },
    {
     "id": "eq-D-849",
     "type": "equation",
     "page": 20,
     "original": "Northwest Gbaya gya gya"
    },
    {
     "id": "eq-D-850",
     "type": "equation",
     "page": 20,
     "original": "8.45"
    },
    {
     "id": "eq-D-851",
     "type": "equation",
     "page": 20,
     "original": "Norwegian no nor"
    },
    {
     "id": "eq-D-852",
     "type": "equation",
     "page": 20,
     "original": "3849.8"
    },
    {
     "id": "eq-D-853",
     "type": "equation",
     "page": 20,
     "original": "Norwegian Bokmål nb nob"
    },
    {
     "id": "eq-D-854",
     "type": "equation",
     "page": 20,
     "original": "12.7"
    },
    {
     "id": "eq-D-855",
     "type": "equation",
     "page": 20,
     "original": "Norwegian Nynorsk nn nno"
    },
    {
     "id": "eq-D-856",
     "type": "equation",
     "page": 20,
     "original": "1.54"
    },
    {
     "id": "eq-D-857",
     "type": "equation",
     "page": 20,
     "original": "Notsi ncf ncf"
    },
    {
     "id": "eq-D-858",
     "type": "equation",
     "page": 20,
     "original": "9.84"
    },
    {
     "id": "eq-D-859",
     "type": "equation",
     "page": 20,
     "original": "Nyankpa yes yes"
    },
    {
     "id": "eq-D-860",
     "type": "equation",
     "page": 20,
     "original": "10.26"
    },
    {
     "id": "eq-D-861",
     "type": "equation",
     "page": 20,
     "original": "Nyungwe nyu nyu"
    },
    {
     "id": "eq-D-862",
     "type": "equation",
     "page": 20,
     "original": "8.98"
    },
    {
     "id": "eq-D-863",
     "type": "equation",
     "page": 20,
     "original": "Nzanyi nja nja"
    },
    {
     "id": "eq-D-864",
     "type": "equation",
     "page": 20,
     "original": "10.02"
    },
    {
     "id": "eq-D-865",
     "type": "equation",
     "page": 20,
     "original": "Nüpode Huitoto hux hux"
    },
    {
     "id": "eq-D-866",
     "type": "equation",
     "page": 20,
     "original": "9.04"
    },
    {
     "id": "eq-D-867",
     "type": "equation",
     "page": 20,
     "original": "Occitan oc oci"
    },
    {
     "id": "eq-D-868",
     "type": "equation",
     "page": 20,
     "original": "16.8"
    },
    {
     "id": "eq-D-869",
     "type": "equation",
     "page": 20,
     "original": "Od odk odk"
    },
    {
     "id": "eq-D-870",
     "type": "equation",
     "page": 20,
     "original": "20.26"
    },
    {
     "id": "eq-D-871",
     "type": "equation",
     "page": 20,
     "original": "Odia ory ory"
    },
    {
     "id": "eq-D-872",
     "type": "equation",
     "page": 20,
     "original": "144.81"
    },
    {
     "id": "eq-D-873",
     "type": "equation",
     "page": 20,
     "original": "Odual odu odu"
    },
    {
     "id": "eq-D-874",
     "type": "equation",
     "page": 20,
     "original": "10.57"
    },
    {
     "id": "eq-D-875",
     "type": "equation",
     "page": 20,
     "original": "Omani Arabic acx acx"
    },
    {
     "id": "eq-D-876",
     "type": "equation",
     "page": 20,
     "original": "22.03"
    },
    {
     "id": "eq-D-877",
     "type": "equation",
     "page": 20,
     "original": "Orizaba Nahuatl nlv nlv"
    },
    {
     "id": "eq-D-878",
     "type": "equation",
     "page": 20,
     "original": "11.42"
    },
    {
     "id": "eq-D-879",
     "type": "equation",
     "page": 20,
     "original": "Orma orc orc"
    },
    {
     "id": "eq-D-880",
     "type": "equation",
     "page": 20,
     "original": "22.01"
    },
    {
     "id": "eq-D-881",
     "type": "equation",
     "page": 20,
     "original": "Ormuri oru oru"
    },
    {
     "id": "eq-D-882",
     "type": "equation",
     "page": 20,
     "original": "16.74"
    },
    {
     "id": "eq-D-883",
     "type": "equation",
     "page": 20,
     "original": "Oromo om orm"
    },
    {
     "id": "eq-D-884",
     "type": "equation",
     "page": 20,
     "original": "6.6"
    },
    {
     "id": "eq-D-885",
     "type": "equation",
     "page": 20,
     "original": "Pahari-Potwari phr phr"
    },
    {
     "id": "eq-D-886",
     "type": "equation",
     "page": 20,
     "original": "24.03"
    },
    {
     "id": "eq-D-887",
     "type": "equation",
     "page": 20,
     "original": "Paiwan pwn pwn"
    },
    {
     "id": "eq-D-888",
     "type": "equation",
     "page": 20,
     "original": "13.76"
    },
    {
     "id": "eq-D-889",
     "type": "equation",
     "page": 20,
     "original": "Panjabi pa pan"
    },
    {
     "id": "eq-D-890",
     "type": "equation",
     "page": 20,
     "original": "147.37"
    },
    {
     "id": "eq-D-891",
     "type": "equation",
     "page": 20,
     "original": "Papuan Malay pmy pmy"
    },
    {
     "id": "eq-D-892",
     "type": "equation",
     "page": 20,
     "original": "10.17"
    },
    {
     "id": "eq-D-893",
     "type": "equation",
     "page": 20,
     "original": "Parkari Koli kvx kvx"
    },
    {
     "id": "eq-D-894",
     "type": "equation",
     "page": 20,
     "original": "11.04"
    },
    {
     "id": "eq-D-895",
     "type": "equation",
     "page": 20,
     "original": "Pedi nso nso"
    },
    {
     "id": "eq-D-896",
     "type": "equation",
     "page": 20,
     "original": "12.64"
    },
    {
     "id": "eq-D-897",
     "type": "equation",
     "page": 20,
     "original": "Pero pip pip"
    },
    {
     "id": "eq-D-898",
     "type": "equation",
     "page": 20,
     "original": "9.85"
    },
    {
     "id": "eq-D-899",
     "type": "equation",
     "page": 20,
     "original": "Persian fa fas"
    },
    {
     "id": "eq-D-900",
     "type": "equation",
     "page": 20,
     "original": "366.07"
    },
    {
     "id": "eq-D-901",
     "type": "equation",
     "page": 20,
     "original": "Petats pex pex"
    },
    {
     "id": "eq-D-902",
     "type": "equation",
     "page": 20,
     "original": "10.2"
    },
    {
     "id": "eq-D-903",
     "type": "equation",
     "page": 20,
     "original": "Phalura phl phl"
    },
    {
     "id": "eq-D-904",
     "type": "equation",
     "page": 20,
     "original": "20.69"
    },
    {
     "id": "eq-D-905",
     "type": "equation",
     "page": 20,
     "original": "Piemontese pms pms"
    },
    {
     "id": "eq-D-906",
     "type": "equation",
     "page": 20,
     "original": "16.01"
    },
    {
     "id": "eq-D-907",
     "type": "equation",
     "page": 20,
     "original": "Piya-Kwonci piy piy"
    },
    {
     "id": "eq-D-908",
     "type": "equation",
     "page": 20,
     "original": "10.38"
    },
    {
     "id": "eq-D-909",
     "type": "equation",
     "page": 20,
     "original": "Plateau Malagasy plt plt"
    },
    {
     "id": "eq-D-910",
     "type": "equation",
     "page": 20,
     "original": "19.39"
    },
    {
     "id": "eq-D-911",
     "type": "equation",
     "page": 20,
     "original": "Polish pl pol"
    },
    {
     "id": "eq-D-912",
     "type": "equation",
     "page": 20,
     "original": "911.68"
    },
    {
     "id": "eq-D-913",
     "type": "equation",
     "page": 20,
     "original": "Poqomam poc poc"
    },
    {
     "id": "eq-D-914",
     "type": "equation",
     "page": 20,
     "original": "9.63"
    },
    {
     "id": "eq-D-915",
     "type": "equation",
     "page": 20,
     "original": "Portuguese pt por 16855.05 Pulaar fuc fuc"
    },
    {
     "id": "eq-D-916",
     "type": "equation",
     "page": 20,
     "original": "14.77"
    },
    {
     "id": "eq-D-917",
     "type": "equation",
     "page": 20,
     "original": "Pular fuf fuf"
    },
    {
     "id": "eq-D-918",
     "type": "equation",
     "page": 20,
     "original": "13.77"
    },
    {
     "id": "eq-D-919",
     "type": "equation",
     "page": 20,
     "original": "Puno Quechua qxp qxp"
    },
    {
     "id": "eq-D-920",
     "type": "equation",
     "page": 20,
     "original": "9.81"
    },
    {
     "id": "eq-D-921",
     "type": "equation",
     "page": 20,
     "original": "Pushto ps pus"
    },
    {
     "id": "eq-D-922",
     "type": "equation",
     "page": 20,
     "original": "88.62"
    },
    {
     "id": "eq-D-923",
     "type": "equation",
     "page": 20,
     "original": "Pökoot pko pko"
    },
    {
     "id": "eq-D-924",
     "type": "equation",
     "page": 20,
     "original": "10.4"
    },
    {
     "id": "eq-D-925",
     "type": "equation",
     "page": 20,
     "original": "Qaqet byx byx"
    },
    {
     "id": "eq-D-926",
     "type": "equation",
     "page": 20,
     "original": "9.79"
    },
    {
     "id": "eq-D-927",
     "type": "equation",
     "page": 20,
     "original": "Quiotepec Chinantec chq chq"
    },
    {
     "id": "eq-D-928",
     "type": "equation",
     "page": 20,
     "original": "9.76"
    },
    {
     "id": "eq-D-929",
     "type": "equation",
     "page": 20,
     "original": "Rana Tharu thr thr"
    },
    {
     "id": "eq-D-930",
     "type": "equation",
     "page": 20,
     "original": "9.99"
    },
    {
     "id": "eq-D-931",
     "type": "equation",
     "page": 20,
     "original": "Rangi lag lag"
    },
    {
     "id": "eq-D-932",
     "type": "equation",
     "page": 20,
     "original": "9.47"
    },
    {
     "id": "eq-D-933",
     "type": "equation",
     "page": 20,
     "original": "Rapoisi kyx kyx"
    },
    {
     "id": "eq-D-934",
     "type": "equation",
     "page": 20,
     "original": "9.17"
    },
    {
     "id": "eq-D-935",
     "type": "equation",
     "page": 20,
     "original": "Ratahan rth rth"
    },
    {
     "id": "eq-D-936",
     "type": "equation",
     "page": 20,
     "original": "9.34"
    },
    {
     "id": "eq-D-937",
     "type": "equation",
     "page": 20,
     "original": "Rayón Zoque zor zor"
    },
    {
     "id": "eq-D-938",
     "type": "equation",
     "page": 20,
     "original": "9.04"
    },
    {
     "id": "eq-D-939",
     "type": "equation",
     "page": 20,
     "original": "Romanian ro ron"
    },
    {
     "id": "eq-D-940",
     "type": "equation",
     "page": 20,
     "original": "70.23"
    },
    {
     "id": "eq-D-941",
     "type": "equation",
     "page": 20,
     "original": "Romansh rm roh"
    },
    {
     "id": "eq-D-942",
     "type": "equation",
     "page": 20,
     "original": "9.21"
    },
    {
     "id": "eq-D-943",
     "type": "equation",
     "page": 20,
     "original": "Rombo rof rof"
    },
    {
     "id": "eq-D-944",
     "type": "equation",
     "page": 20,
     "original": "18.9"
    },
    {
     "id": "eq-D-945",
     "type": "equation",
     "page": 20,
     "original": "Rotokas roo roo"
    },
    {
     "id": "eq-D-946",
     "type": "equation",
     "page": 20,
     "original": "9.07"
    },
    {
     "id": "eq-D-947",
     "type": "equation",
     "page": 20,
     "original": "Rukai dru dru"
    },
    {
     "id": "eq-D-948",
     "type": "equation",
     "page": 20,
     "original": "9.26"
    },
    {
     "id": "eq-D-949",
     "type": "equation",
     "page": 20,
     "original": "Russian ru rus"
    },
    {
     "id": "eq-D-950",
     "type": "equation",
     "page": 20,
     "original": "20338.5"
    },
    {
     "id": "eq-D-951",
     "type": "equation",
     "page": 20,
     "original": "Sacapulteco quv quv"
    },
    {
     "id": "eq-D-952",
     "type": "equation",
     "page": 20,
     "original": "8.9"
    },
    {
     "id": "eq-D-953",
     "type": "equation",
     "page": 20,
     "original": "Saidi Arabic aec aec"
    },
    {
     "id": "eq-D-954",
     "type": "equation",
     "page": 20,
     "original": "9.28"
    },
    {
     "id": "eq-D-955",
     "type": "equation",
     "page": 20,
     "original": "Sakalava Malagasy skg skg"
    },
    {
     "id": "eq-D-956",
     "type": "equation",
     "page": 20,
     "original": "9.02"
    },
    {
     "id": "eq-D-957",
     "type": "equation",
     "page": 20,
     "original": "Sakizaya szy szy"
    },
    {
     "id": "eq-D-958",
     "type": "equation",
     "page": 20,
     "original": "11.47"
    },
    {
     "id": "eq-D-959",
     "type": "equation",
     "page": 20,
     "original": "Saleman sau sau"
    },
    {
     "id": "eq-D-960",
     "type": "equation",
     "page": 20,
     "original": "10.53"
    },
    {
     "id": "eq-D-961",
     "type": "equation",
     "page": 20,
     "original": "Samba Daka ccg ccg"
    },
    {
     "id": "eq-D-962",
     "type": "equation",
     "page": 20,
     "original": "10.11"
    },
    {
     "id": "eq-D-963",
     "type": "equation",
     "page": 20,
     "original": "Samba Leko ndi ndi"
    },
    {
     "id": "eq-D-964",
     "type": "equation",
     "page": 20,
     "original": "11.27"
    },
    {
     "id": "eq-D-965",
     "type": "equation",
     "page": 20,
     "original": "San Felipe Otlaltepec Popoloca pow pow"
    },
    {
     "id": "eq-D-966",
     "type": "equation",
     "page": 20,
     "original": "8.84"
    },
    {
     "id": "eq-D-967",
     "type": "equation",
     "page": 20,
     "original": "San Francisco Del Mar Huave hue hue"
    },
    {
     "id": "eq-D-968",
     "type": "equation",
     "page": 20,
     "original": "9.45"
    },
    {
     "id": "eq-D-969",
     "type": "equation",
     "page": 20,
     "original": "San Juan Atzingo Popoloca poe poe"
    },
    {
     "id": "eq-D-970",
     "type": "equation",
     "page": 20,
     "original": "10.01"
    },
    {
     "id": "eq-D-971",
     "type": "equation",
     "page": 20,
     "original": "San Martín Itunyoso Triqui trq trq"
    },
    {
     "id": "eq-D-972",
     "type": "equation",
     "page": 20,
     "original": "8.29"
    },
    {
     "id": "eq-D-973",
     "type": "equation",
     "page": 20,
     "original": "San Miguel El Grande Mixtec mig mig"
    },
    {
     "id": "eq-D-974",
     "type": "equation",
     "page": 20,
     "original": "9.66"
    },
    {
     "id": "eq-D-975",
     "type": "equation",
     "page": 20,
     "original": "Sansi ssi ssi"
    },
    {
     "id": "eq-D-976",
     "type": "equation",
     "page": 20,
     "original": "10.47"
    },
    {
     "id": "eq-D-977",
     "type": "equation",
     "page": 20,
     "original": "Sanskrit sa san"
    },
    {
     "id": "eq-D-978",
     "type": "equation",
     "page": 20,
     "original": "84.44"
    },
    {
     "id": "eq-D-979",
     "type": "equation",
     "page": 20,
     "original": "Santa Ana de Tusi Pasco Quechua qxt qxt"
    },
    {
     "id": "eq-D-980",
     "type": "equation",
     "page": 20,
     "original": "10.05"
    },
    {
     "id": "eq-D-981",
     "type": "equation",
     "page": 20,
     "original": "Santa Catarina Albarradas Zapotec ztn ztn"
    },
    {
     "id": "eq-D-982",
     "type": "equation",
     "page": 20,
     "original": "10.02"
    },
    {
     "id": "eq-D-983",
     "type": "equation",
     "page": 20,
     "original": "Santali sat sat"
    },
    {
     "id": "eq-D-984",
     "type": "equation",
     "page": 20,
     "original": "98.37"
    },
    {
     "id": "eq-D-985",
     "type": "equation",
     "page": 20,
     "original": "Santiago del Estero Quichua qus qus"
    },
    {
     "id": "eq-D-986",
     "type": "equation",
     "page": 20,
     "original": "9.55"
    },
    {
     "id": "eq-D-987",
     "type": "equation",
     "page": 20,
     "original": "Saposa sps sps"
    },
    {
     "id": "eq-D-988",
     "type": "equation",
     "page": 20,
     "original": "9.81"
    },
    {
     "id": "eq-D-989",
     "type": "equation",
     "page": 20,
     "original": "Saraiki skr skr"
    },
    {
     "id": "eq-D-990",
     "type": "equation",
     "page": 20,
     "original": "4.13"
    },
    {
     "id": "eq-D-991",
     "type": "equation",
     "page": 20,
     "original": "Sardinian sc srd"
    },
    {
     "id": "eq-D-992",
     "type": "equation",
     "page": 20,
     "original": "2.77"
    },
    {
     "id": "eq-D-993",
     "type": "equation",
     "page": 20,
     "original": "Saya say say"
    },
    {
     "id": "eq-D-994",
     "type": "equation",
     "page": 20,
     "original": "10.02"
    },
    {
     "id": "eq-D-995",
     "type": "equation",
     "page": 20,
     "original": "Sediq trv trv"
    },
    {
     "id": "eq-D-996",
     "type": "equation",
     "page": 20,
     "original": "7.77"
    },
    {
     "id": "eq-D-997",
     "type": "equation",
     "page": 20,
     "original": "Serbian sr srp"
    },
    {
     "id": "eq-D-998",
     "type": "equation",
     "page": 20,
     "original": "1855.33"
    },
    {
     "id": "eq-D-999",
     "type": "equation",
     "page": 20,
     "original": "Seri sei sei"
    },
    {
     "id": "eq-D-1000",
     "type": "equation",
     "page": 20,
     "original": "9.81"
    },
    {
     "id": "eq-D-1001",
     "type": "equation",
     "page": 20,
     "original": "Shina scl scl"
    },
    {
     "id": "eq-D-1002",
     "type": "equation",
     "page": 20,
     "original": "9.84"
    },
    {
     "id": "eq-D-1003",
     "type": "equation",
     "page": 20,
     "original": "Shona sn sna"
    },
    {
     "id": "eq-D-1004",
     "type": "equation",
     "page": 20,
     "original": "9.96"
    },
    {
     "id": "eq-D-1005",
     "type": "equation",
     "page": 20,
     "original": "Siar-Lak sjr sjr"
    },
    {
     "id": "eq-D-1006",
     "type": "equation",
     "page": 20,
     "original": "9.87"
    },
    {
     "id": "eq-D-1007",
     "type": "equation",
     "page": 20,
     "original": "Sibe nco nco"
    },
    {
     "id": "eq-D-1008",
     "type": "equation",
     "page": 20,
     "original": "9.96"
    },
    {
     "id": "eq-D-1009",
     "type": "equation",
     "page": 20,
     "original": "Sicilian scn scn"
    },
    {
     "id": "eq-D-1010",
     "type": "equation",
     "page": 20,
     "original": "13.35"
    },
    {
     "id": "eq-D-1011",
     "type": "equation",
     "page": 20,
     "original": "Sihuas Ancash Quechua qws qws"
    },
    {
     "id": "eq-D-1012",
     "type": "equation",
     "page": 20,
     "original": "10.18"
    },
    {
     "id": "eq-D-1013",
     "type": "equation",
     "page": 20,
     "original": "Sikkimese sip sip"
    },
    {
     "id": "eq-D-1014",
     "type": "equation",
     "page": 20,
     "original": "10.07"
    },
    {
     "id": "eq-D-1015",
     "type": "equation",
     "page": 20,
     "original": "Sinaugoro snc snc"
    },
    {
     "id": "eq-D-1016",
     "type": "equation",
     "page": 20,
     "original": "10.38"
    },
    {
     "id": "eq-D-1017",
     "type": "equation",
     "page": 20,
     "original": "Sindhi sd snd"
    },
    {
     "id": "eq-D-1018",
     "type": "equation",
     "page": 20,
     "original": "46.27"
    },
    {
     "id": "eq-D-1019",
     "type": "equation",
     "page": 20,
     "original": "Sindhi Bhil sbn sbn"
    },
    {
     "id": "eq-D-1020",
     "type": "equation",
     "page": 20,
     "original": "10.53"
    },
    {
     "id": "eq-D-1021",
     "type": "equation",
     "page": 20,
     "original": "Sinhala si sin"
    },
    {
     "id": "eq-D-1022",
     "type": "equation",
     "page": 20,
     "original": "11.98"
    },
    {
     "id": "eq-D-1023",
     "type": "equation",
     "page": 20,
     "original": "Sinicahua Mixtec xti xti"
    },
    {
     "id": "eq-D-1024",
     "type": "equation",
     "page": 20,
     "original": "9.5"
    },
    {
     "id": "eq-D-1025",
     "type": "equation",
     "page": 20,
     "original": "Sipacapense qum qum"
    },
    {
     "id": "eq-D-1026",
     "type": "equation",
     "page": 20,
     "original": "9.37"
    },
    {
     "id": "eq-D-1027",
     "type": "equation",
     "page": 20,
     "original": "Siwai siw siw"
    },
    {
     "id": "eq-D-1028",
     "type": "equation",
     "page": 20,
     "original": "10.47"
    },
    {
     "id": "eq-D-1029",
     "type": "equation",
     "page": 20,
     "original": "Slovak sk slk"
    },
    {
     "id": "eq-D-1030",
     "type": "equation",
     "page": 20,
     "original": "2478.46"
    },
    {
     "id": "eq-D-1031",
     "type": "equation",
     "page": 20,
     "original": "Slovenian sl slv"
    },
    {
     "id": "eq-D-1032",
     "type": "equation",
     "page": 20,
     "original": "1172.61"
    },
    {
     "id": "eq-D-1033",
     "type": "equation",
     "page": 20,
     "original": "Solos sol sol"
    },
    {
     "id": "eq-D-1034",
     "type": "equation",
     "page": 20,
     "original": "9.95"
    },
    {
     "id": "eq-D-1035",
     "type": "equation",
     "page": 20,
     "original": "Somali so som"
    },
    {
     "id": "eq-D-1036",
     "type": "equation",
     "page": 20,
     "original": "13.22"
    },
    {
     "id": "eq-D-1037",
     "type": "equation",
     "page": 20,
     "original": "Soninke snk snk"
    },
    {
     "id": "eq-D-1038",
     "type": "equation",
     "page": 20,
     "original": "10.04"
    },
    {
     "id": "eq-D-1039",
     "type": "equation",
     "page": 20,
     "original": "South Giziga giz giz"
    },
    {
     "id": "eq-D-1040",
     "type": "equation",
     "page": 20,
     "original": "10.03"
    },
    {
     "id": "eq-D-1041",
     "type": "equation",
     "page": 20,
     "original": "South Ucayali Ashéninka cpy cpy"
    },
    {
     "id": "eq-D-1042",
     "type": "equation",
     "page": 20,
     "original": "9.15"
    },
    {
     "id": "eq-D-1043",
     "type": "equation",
     "page": 20,
     "original": "Southeastern Nochixtlán Mixtec mxy mxy"
    },
    {
     "id": "eq-D-1044",
     "type": "equation",
     "page": 20,
     "original": "9.48"
    },
    {
     "id": "eq-D-1045",
     "type": "equation",
     "page": 20,
     "original": "Southern Betsimisaraka Malagasy bzc bzc"
    },
    {
     "id": "eq-D-1046",
     "type": "equation",
     "page": 20,
     "original": "17.45"
    },
    {
     "id": "eq-D-1047",
     "type": "equation",
     "page": 20,
     "original": "Southern Pashto pbt pbt"
    },
    {
     "id": "eq-D-1048",
     "type": "equation",
     "page": 20,
     "original": "11.6"
    },
    {
     "id": "eq-D-1049",
     "type": "equation",
     "page": 20,
     "original": "Southern Pastaza Quechua qup qup"
    },
    {
     "id": "eq-D-1050",
     "type": "equation",
     "page": 20,
     "original": "11.13"
    },
    {
     "id": "eq-D-1051",
     "type": "equation",
     "page": 20,
     "original": "Soyaltepec Mazatec vmp vmp"
    },
    {
     "id": "eq-D-1052",
     "type": "equation",
     "page": 20,
     "original": "10.17"
    },
    {
     "id": "eq-D-1053",
     "type": "equation",
     "page": 20,
     "original": "Spanish es spa 27559.74 Standard Arabic arb arb"
    },
    {
     "id": "eq-D-1054",
     "type": "equation",
     "page": 20,
     "original": "1483.53"
    },
    {
     "id": "eq-D-1055",
     "type": "equation",
     "page": 20,
     "original": "Standard Moroccan Tamazight zgh zgh"
    },
    {
     "id": "eq-D-1056",
     "type": "equation",
     "page": 20,
     "original": "1.19"
    },
    {
     "id": "eq-D-1057",
     "type": "equation",
     "page": 20,
     "original": "Sudanese Arabic apd apd"
    },
    {
     "id": "eq-D-1058",
     "type": "equation",
     "page": 20,
     "original": "9.93"
    },
    {
     "id": "eq-D-1059",
     "type": "equation",
     "page": 20,
     "original": "Sulka sua sua"
    },
    {
     "id": "eq-D-1060",
     "type": "equation",
     "page": 20,
     "original": "10.12"
    },
    {
     "id": "eq-D-1061",
     "type": "equation",
     "page": 20,
     "original": "Svan sva sva"
    },
    {
     "id": "eq-D-1062",
     "type": "equation",
     "page": 20,
     "original": "15.11"
    },
    {
     "id": "eq-D-1063",
     "type": "equation",
     "page": 20,
     "original": "Swahili sw swa"
    },
    {
     "id": "eq-D-1064",
     "type": "equation",
     "page": 20,
     "original": "418.41"
    },
    {
     "id": "eq-D-1065",
     "type": "equation",
     "page": 20,
     "original": "Swedish sv swe"
    },
    {
     "id": "eq-D-1066",
     "type": "equation",
     "page": 20,
     "original": "2453.14"
    },
    {
     "id": "eq-D-1067",
     "type": "equation",
     "page": 20,
     "original": "Tae’ rob rob"
    },
    {
     "id": "eq-D-1068",
     "type": "equation",
     "page": 20,
     "original": "9.02"
    },
    {
     "id": "eq-D-1069",
     "type": "equation",
     "page": 20,
     "original": "Tahaggart Tamahaq thv thv"
    },
    {
     "id": "eq-D-1070",
     "type": "equation",
     "page": 20,
     "original": "4.25"
    },
    {
     "id": "eq-D-1071",
     "type": "equation",
     "page": 20,
     "original": "Taita dav dav"
    },
    {
     "id": "eq-D-1072",
     "type": "equation",
     "page": 20,
     "original": "9.12"
    },
    {
     "id": "eq-D-1073",
     "type": "equation",
     "page": 20,
     "original": "Tajik tg tgk"
    },
    {
     "id": "eq-D-1074",
     "type": "equation",
     "page": 20,
     "original": "9.23"
    },
    {
     "id": "eq-D-1075",
     "type": "equation",
     "page": 20,
     "original": "Tamil ta tam"
    },
    {
     "id": "eq-D-1076",
     "type": "equation",
     "page": 20,
     "original": "423.09"
    },
    {
     "id": "eq-D-1077",
     "type": "equation",
     "page": 20,
     "original": "Tandroy-Mahafaly Malagasy tdx tdx"
    },
    {
     "id": "eq-D-1078",
     "type": "equation",
     "page": 20,
     "original": "3.81"
    },
    {
     "id": "eq-D-1079",
     "type": "equation",
     "page": 20,
     "original": "Tangale tan tan"
    },
    {
     "id": "eq-D-1080",
     "type": "equation",
     "page": 20,
     "original": "10.14"
    },
    {
     "id": "eq-D-1081",
     "type": "equation",
     "page": 20,
     "original": "Tanosy Malagasy txy txy"
    },
    {
     "id": "eq-D-1082",
     "type": "equation",
     "page": 20,
     "original": "12.07"
    },
    {
     "id": "eq-D-1083",
     "type": "equation",
     "page": 20,
     "original": "Tarok yer yer"
    },
    {
     "id": "eq-D-1084",
     "type": "equation",
     "page": 20,
     "original": "10.08"
    },
    {
     "id": "eq-D-1085",
     "type": "equation",
     "page": 20,
     "original": "Tatar tt tat"
    },
    {
     "id": "eq-D-1086",
     "type": "equation",
     "page": 20,
     "original": "30.03"
    },
    {
     "id": "eq-D-1087",
     "type": "equation",
     "page": 20,
     "original": "Tedaga tuq tuq"
    },
    {
     "id": "eq-D-1088",
     "type": "equation",
     "page": 20,
     "original": "10.0"
    },
    {
     "id": "eq-D-1089",
     "type": "equation",
     "page": 20,
     "original": "Telugu te tel"
    },
    {
     "id": "eq-D-1090",
     "type": "equation",
     "page": 20,
     "original": "230.21"
    },
    {
     "id": "eq-D-1091",
     "type": "equation",
     "page": 20,
     "original": "Tem kdh kdh"
    },
    {
     "id": "eq-D-1092",
     "type": "equation",
     "page": 20,
     "original": "4.07"
    },
    {
     "id": "eq-D-1093",
     "type": "equation",
     "page": 20,
     "original": "Teop tio tio"
    },
    {
     "id": "eq-D-1094",
     "type": "equation",
     "page": 20,
     "original": "9.85"
    },
    {
     "id": "eq-D-1095",
     "type": "equation",
     "page": 20,
     "original": "Tepeuxila Cuicatec cux cux"
    },
    {
     "id": "eq-D-1096",
     "type": "equation",
     "page": 20,
     "original": "7.83"
    },
    {
     "id": "eq-D-1097",
     "type": "equation",
     "page": 20,
     "original": "Tepinapa Chinantec cte cte"
    },
    {
     "id": "eq-D-1098",
     "type": "equation",
     "page": 20,
     "original": "9.54"
    },
    {
     "id": "eq-D-1099",
     "type": "equation",
     "page": 20,
     "original": "Tera ttr ttr"
    },
    {
     "id": "eq-D-1100",
     "type": "equation",
     "page": 20,
     "original": "9.89"
    },
    {
     "id": "eq-D-1101",
     "type": "equation",
     "page": 20,
     "original": "Terei buo buo"
    },
    {
     "id": "eq-D-1102",
     "type": "equation",
     "page": 20,
     "original": "9.48"
    },
    {
     "id": "eq-D-1103",
     "type": "equation",
     "page": 20,
     "original": "Termanu twu twu"
    },
    {
     "id": "eq-D-1104",
     "type": "equation",
     "page": 20,
     "original": "11.45"
    },
    {
     "id": "eq-D-1105",
     "type": "equation",
     "page": 20,
     "original": "Tesaka Malagasy tkg tkg"
    },
    {
     "id": "eq-D-1106",
     "type": "equation",
     "page": 20,
     "original": "17.86"
    },
    {
     "id": "eq-D-1107",
     "type": "equation",
     "page": 20,
     "original": "Tetelcingo Nahuatl nhg nhg"
    },
    {
     "id": "eq-D-1108",
     "type": "equation",
     "page": 20,
     "original": "8.92"
    },
    {
     "id": "eq-D-1109",
     "type": "equation",
     "page": 20,
     "original": "Teutila Cuicatec cut cut"
    },
    {
     "id": "eq-D-1110",
     "type": "equation",
     "page": 20,
     "original": "8.04"
    },
    {
     "id": "eq-D-1111",
     "type": "equation",
     "page": 20,
     "original": "Thai th tha 10499.77 Tibetan bo bod"
    },
    {
     "id": "eq-D-1112",
     "type": "equation",
     "page": 20,
     "original": "82.27"
    },
    {
     "id": "eq-D-1113",
     "type": "equation",
     "page": 20,
     "original": "Tidaá Mixtec mtx mtx"
    },
    {
     "id": "eq-D-1114",
     "type": "equation",
     "page": 20,
     "original": "9.09"
    },
    {
     "id": "eq-D-1115",
     "type": "equation",
     "page": 20,
     "original": "Tidore tvo tvo"
    },
    {
     "id": "eq-D-1116",
     "type": "equation",
     "page": 20,
     "original": "10.31"
    },
    {
     "id": "eq-D-1117",
     "type": "equation",
     "page": 20,
     "original": "Tigak tgc tgc"
    },
    {
     "id": "eq-D-1118",
     "type": "equation",
     "page": 20,
     "original": "9.71"
    },
    {
     "id": "eq-D-1119",
     "type": "equation",
     "page": 20,
     "original": "Tigre tig tig"
    },
    {
     "id": "eq-D-1120",
     "type": "equation",
     "page": 20,
     "original": "7.49"
    },
    {
     "id": "eq-D-1121",
     "type": "equation",
     "page": 20,
     "original": "Tigrinya ti tir"
    },
    {
     "id": "eq-D-1122",
     "type": "equation",
     "page": 20,
     "original": "0.08"
    },
    {
     "id": "eq-D-1123",
     "type": "equation",
     "page": 20,
     "original": "Tilquiapan Zapotec zts zts"
    },
    {
     "id": "eq-D-1124",
     "type": "equation",
     "page": 20,
     "original": "9.33"
    },
    {
     "id": "eq-D-1125",
     "type": "equation",
     "page": 20,
     "original": "Tinputz tpz tpz"
    },
    {
     "id": "eq-D-1126",
     "type": "equation",
     "page": 20,
     "original": "9.33"
    },
    {
     "id": "eq-D-1127",
     "type": "equation",
     "page": 20,
     "original": "Tlacoapa Me’phaa tpl tpl"
    },
    {
     "id": "eq-D-1128",
     "type": "equation",
     "page": 20,
     "original": "9.28"
    },
    {
     "id": "eq-D-1129",
     "type": "equation",
     "page": 20,
     "original": "Tlacoatzintepec Chinantec ctl ctl"
    },
    {
     "id": "eq-D-1130",
     "type": "equation",
     "page": 20,
     "original": "10.04"
    },
    {
     "id": "eq-D-1131",
     "type": "equation",
     "page": 20,
     "original": "Tlingit tli tli"
    },
    {
     "id": "eq-D-1132",
     "type": "equation",
     "page": 20,
     "original": "0.41"
    },
    {
     "id": "eq-D-1133",
     "type": "equation",
     "page": 20,
     "original": "Toki Pona tok tok"
    },
    {
     "id": "eq-D-1134",
     "type": "equation",
     "page": 20,
     "original": "13.51"
    },
    {
     "id": "eq-D-1135",
     "type": "equation",
     "page": 20,
     "original": "Tomoip tqp tqp"
    },
    {
     "id": "eq-D-1136",
     "type": "equation",
     "page": 20,
     "original": "10.1"
    },
    {
     "id": "eq-D-1137",
     "type": "equation",
     "page": 20,
     "original": "Tondano tdn tdn"
    },
    {
     "id": "eq-D-1138",
     "type": "equation",
     "page": 20,
     "original": "9.14"
    },
    {
     "id": "eq-D-1139",
     "type": "equation",
     "page": 20,
     "original": "Tonsea txs txs"
    },
    {
     "id": "eq-D-1140",
     "type": "equation",
     "page": 20,
     "original": "9.32"
    },
    {
     "id": "eq-D-1141",
     "type": "equation",
     "page": 20,
     "original": "Tooro ttj ttj"
    },
    {
     "id": "eq-D-1142",
     "type": "equation",
     "page": 20,
     "original": "10.31"
    },
    {
     "id": "eq-D-1143",
     "type": "equation",
     "page": 20,
     "original": "Torau ttu ttu"
    },
    {
     "id": "eq-D-1144",
     "type": "equation",
     "page": 20,
     "original": "9.87"
    },
    {
     "id": "eq-D-1145",
     "type": "equation",
     "page": 20,
     "original": "Torwali trw trw"
    },
    {
     "id": "eq-D-1146",
     "type": "equation",
     "page": 20,
     "original": "14.98"
    },
    {
     "id": "eq-D-1147",
     "type": "equation",
     "page": 20,
     "original": "Tsimihety Malagasy xmw xmw"
    },
    {
     "id": "eq-D-1148",
     "type": "equation",
     "page": 20,
     "original": "11.53"
    },
    {
     "id": "eq-D-1149",
     "type": "equation",
     "page": 20,
     "original": "Tsotso lto lto"
    },
    {
     "id": "eq-D-1150",
     "type": "equation",
     "page": 20,
     "original": "9.77"
    },
    {
     "id": "eq-D-1151",
     "type": "equation",
     "page": 20,
     "original": "Tswana tn tsn"
    },
    {
     "id": "eq-D-1152",
     "type": "equation",
     "page": 20,
     "original": "4.24"
    },
    {
     "id": "eq-D-1153",
     "type": "equation",
     "page": 20,
     "original": "Tugen tuy tuy"
    },
    {
     "id": "eq-D-1154",
     "type": "equation",
     "page": 20,
     "original": "8.79"
    },
    {
     "id": "eq-D-1155",
     "type": "equation",
     "page": 20,
     "original": "Tuki bag bag"
    },
    {
     "id": "eq-D-1156",
     "type": "equation",
     "page": 20,
     "original": "10.97"
    },
    {
     "id": "eq-D-1157",
     "type": "equation",
     "page": 20,
     "original": "Tula tul tul"
    },
    {
     "id": "eq-D-1158",
     "type": "equation",
     "page": 20,
     "original": "9.79"
    },
    {
     "id": "eq-D-1159",
     "type": "equation",
     "page": 20,
     "original": "Tulu tcy tcy"
    },
    {
     "id": "eq-D-1160",
     "type": "equation",
     "page": 20,
     "original": "11.72"
    },
    {
     "id": "eq-D-1161",
     "type": "equation",
     "page": 20,
     "original": "Tunen tvu tvu"
    },
    {
     "id": "eq-D-1162",
     "type": "equation",
     "page": 20,
     "original": "9.85"
    },
    {
     "id": "eq-D-1163",
     "type": "equation",
     "page": 20,
     "original": "Tungag lcm lcm"
    },
    {
     "id": "eq-D-1164",
     "type": "equation",
     "page": 20,
     "original": "9.77"
    },
    {
     "id": "eq-D-1165",
     "type": "equation",
     "page": 20,
     "original": "Tunisian Arabic aeb aeb"
    },
    {
     "id": "eq-D-1166",
     "type": "equation",
     "page": 20,
     "original": "21.63"
    },
    {
     "id": "eq-D-1167",
     "type": "equation",
     "page": 20,
     "original": "Tupuri tui tui"
    },
    {
     "id": "eq-D-1168",
     "type": "equation",
     "page": 20,
     "original": "9.26"
    },
    {
     "id": "eq-D-1169",
     "type": "equation",
     "page": 20,
     "original": "Turkana tuv tuv"
    },
    {
     "id": "eq-D-1170",
     "type": "equation",
     "page": 20,
     "original": "10.17"
    },
    {
     "id": "eq-D-1171",
     "type": "equation",
     "page": 20,
     "original": "Turkish tr tur"
    },
    {
     "id": "eq-D-1172",
     "type": "equation",
     "page": 20,
     "original": "125.36"
    },
    {
     "id": "eq-D-1173",
     "type": "equation",
     "page": 20,
     "original": "Turkmen tk tuk"
    },
    {
     "id": "eq-D-1174",
     "type": "equation",
     "page": 20,
     "original": "2.86"
    },
    {
     "id": "eq-D-1175",
     "type": "equation",
     "page": 20,
     "original": "Tututepec Mixtec mtu mtu"
    },
    {
     "id": "eq-D-1176",
     "type": "equation",
     "page": 20,
     "original": "10.13"
    },
    {
     "id": "eq-D-1177",
     "type": "equation",
     "page": 20,
     "original": "Twi tw twi"
    },
    {
     "id": "eq-D-1178",
     "type": "equation",
     "page": 20,
     "original": "0.25"
    },
    {
     "id": "eq-D-1179",
     "type": "equation",
     "page": 20,
     "original": "Ubaghara byc byc"
    },
    {
     "id": "eq-D-1180",
     "type": "equation",
     "page": 20,
     "original": "11.11"
    },
    {
     "id": "eq-D-1181",
     "type": "equation",
     "page": 20,
     "original": "Uighur ug uig"
    },
    {
     "id": "eq-D-1182",
     "type": "equation",
     "page": 20,
     "original": "428.77"
    },
    {
     "id": "eq-D-1183",
     "type": "equation",
     "page": 20,
     "original": "Ukrainian uk ukr"
    },
    {
     "id": "eq-D-1184",
     "type": "equation",
     "page": 20,
     "original": "1851.97"
    },
    {
     "id": "eq-D-1185",
     "type": "equation",
     "page": 20,
     "original": "Umbundu umb umb"
    },
    {
     "id": "eq-D-1186",
     "type": "equation",
     "page": 20,
     "original": "10.59"
    },
    {
     "id": "eq-D-1187",
     "type": "equation",
     "page": 20,
     "original": "Upper Sorbian hsb hsb"
    },
    {
     "id": "eq-D-1188",
     "type": "equation",
     "page": 20,
     "original": "2.71"
    },
    {
     "id": "eq-D-1189",
     "type": "equation",
     "page": 20,
     "original": "Urdu ur urd"
    },
    {
     "id": "eq-D-1190",
     "type": "equation",
     "page": 20,
     "original": "211.27"
    },
    {
     "id": "eq-D-1191",
     "type": "equation",
     "page": 20,
     "original": "Ushojo ush ush"
    },
    {
     "id": "eq-D-1192",
     "type": "equation",
     "page": 20,
     "original": "6.36"
    },
    {
     "id": "eq-D-1193",
     "type": "equation",
     "page": 20,
     "original": "Uzbek uz uzb"
    },
    {
     "id": "eq-D-1194",
     "type": "equation",
     "page": 20,
     "original": "115.28"
    },
    {
     "id": "eq-D-1195",
     "type": "equation",
     "page": 20,
     "original": "Vai vai vai"
    },
    {
     "id": "eq-D-1196",
     "type": "equation",
     "page": 20,
     "original": "8.76"
    },
    {
     "id": "eq-D-1197",
     "type": "equation",
     "page": 20,
     "original": "Vietnamese vi vie"
    },
    {
     "id": "eq-D-1198",
     "type": "equation",
     "page": 20,
     "original": "8481.98"
    },
    {
     "id": "eq-D-1199",
     "type": "equation",
     "page": 20,
     "original": "Votic vot vot"
    },
    {
     "id": "eq-D-1200",
     "type": "equation",
     "page": 20,
     "original": "0.1"
    },
    {
     "id": "eq-D-1201",
     "type": "equation",
     "page": 20,
     "original": "Vöro vro vro"
    },
    {
     "id": "eq-D-1202",
     "type": "equation",
     "page": 20,
     "original": "15.66"
    },
    {
     "id": "eq-D-1203",
     "type": "equation",
     "page": 20,
     "original": "Waci Gbe wci wci"
    },
    {
     "id": "eq-D-1204",
     "type": "equation",
     "page": 20,
     "original": "8.02"
    },
    {
     "id": "eq-D-1205",
     "type": "equation",
     "page": 20,
     "original": "Wadiyara Koli kxp kxp"
    },
    {
     "id": "eq-D-1206",
     "type": "equation",
     "page": 20,
     "original": "20.0"
    },
    {
     "id": "eq-D-1207",
     "type": "equation",
     "page": 20,
     "original": "Waja wja wja"
    },
    {
     "id": "eq-D-1208",
     "type": "equation",
     "page": 20,
     "original": "10.22"
    },
    {
     "id": "eq-D-1209",
     "type": "equation",
     "page": 20,
     "original": "Wakhi wbl wbl"
    },
    {
     "id": "eq-D-1210",
     "type": "equation",
     "page": 20,
     "original": "11.67"
    },
    {
     "id": "eq-D-1211",
     "type": "equation",
     "page": 20,
     "original": "Wanga lwg lwg"
    },
    {
     "id": "eq-D-1212",
     "type": "equation",
     "page": 20,
     "original": "9.36"
    },
    {
     "id": "eq-D-1213",
     "type": "equation",
     "page": 20,
     "original": "Wapan juk juk"
    },
    {
     "id": "eq-D-1214",
     "type": "equation",
     "page": 20,
     "original": "10.22"
    },
    {
     "id": "eq-D-1215",
     "type": "equation",
     "page": 20,
     "original": "Warji wji wji"
    },
    {
     "id": "eq-D-1216",
     "type": "equation",
     "page": 20,
     "original": "11.39"
    },
    {
     "id": "eq-D-1217",
     "type": "equation",
     "page": 20,
     "original": "Welsh cy cym"
    },
    {
     "id": "eq-D-1218",
     "type": "equation",
     "page": 20,
     "original": "131.21"
    },
    {
     "id": "eq-D-1219",
     "type": "equation",
     "page": 20,
     "original": "Wemale weo weo"
    },
    {
     "id": "eq-D-1220",
     "type": "equation",
     "page": 20,
     "original": "9.09"
    },
    {
     "id": "eq-D-1221",
     "type": "equation",
     "page": 20,
     "original": "Western Frisian fy fry"
    },
    {
     "id": "eq-D-1222",
     "type": "equation",
     "page": 20,
     "original": "70.41"
    },
    {
     "id": "eq-D-1223",
     "type": "equation",
     "page": 20,
     "original": "Western Highland Purepecha pua pua"
    },
    {
     "id": "eq-D-1224",
     "type": "equation",
     "page": 20,
     "original": "10.17"
    },
    {
     "id": "eq-D-1225",
     "type": "equation",
     "page": 20,
     "original": "Western Juxtlahuaca Mixtec jmx jmx"
    },
    {
     "id": "eq-D-1226",
     "type": "equation",
     "page": 20,
     "original": "10.01"
    },
    {
     "id": "eq-D-1227",
     "type": "equation",
     "page": 20,
     "original": "Western Maninkakan mlq mlq"
    },
    {
     "id": "eq-D-1228",
     "type": "equation",
     "page": 20,
     "original": "9.83"
    },
    {
     "id": "eq-D-1229",
     "type": "equation",
     "page": 20,
     "original": "Western Mari mrj mrj"
    },
    {
     "id": "eq-D-1230",
     "type": "equation",
     "page": 20,
     "original": "32.26"
    },
    {
     "id": "eq-D-1231",
     "type": "equation",
     "page": 20,
     "original": "Western Niger Fulfulde fuh fuh"
    },
    {
     "id": "eq-D-1232",
     "type": "equation",
     "page": 20,
     "original": "9.69"
    },
    {
     "id": "eq-D-1233",
     "type": "equation",
     "page": 20,
     "original": "Western Panjabi pnb pnb"
    },
    {
     "id": "eq-D-1234",
     "type": "equation",
     "page": 20,
     "original": "10.0"
    },
    {
     "id": "eq-D-1235",
     "type": "equation",
     "page": 20,
     "original": "Wolof wo wol"
    },
    {
     "id": "eq-D-1236",
     "type": "equation",
     "page": 20,
     "original": "8.71"
    },
    {
     "id": "eq-D-1237",
     "type": "equation",
     "page": 20,
     "original": "Wuzlam udl udl"
    },
    {
     "id": "eq-D-1238",
     "type": "equation",
     "page": 20,
     "original": "9.23"
    },
    {
     "id": "eq-D-1239",
     "type": "equation",
     "page": 20,
     "original": "Xanaguía Zapotec ztg ztg"
    },
    {
     "id": "eq-D-1240",
     "type": "equation",
     "page": 20,
     "original": "9.86"
    },
    {
     "id": "eq-D-1241",
     "type": "equation",
     "page": 20,
     "original": "Xhosa xh xho"
    },
    {
     "id": "eq-D-1242",
     "type": "equation",
     "page": 20,
     "original": "13.35"
    },
    {
     "id": "eq-D-1243",
     "type": "equation",
     "page": 20,
     "original": "Yace ekr ekr"
    },
    {
     "id": "eq-D-1244",
     "type": "equation",
     "page": 20,
     "original": "10.76"
    },
    {
     "id": "eq-D-1245",
     "type": "equation",
     "page": 20,
     "original": "Yakut sah sah"
    },
    {
     "id": "eq-D-1246",
     "type": "equation",
     "page": 20,
     "original": "16.08"
    },
    {
     "id": "eq-D-1247",
     "type": "equation",
     "page": 20,
     "original": "Yalahatan jal jal"
    },
    {
     "id": "eq-D-1248",
     "type": "equation",
     "page": 20,
     "original": "11.18"
    },
    {
     "id": "eq-D-1249",
     "type": "equation",
     "page": 20,
     "original": "Yanahuanca Pasco Quechua qur qur"
    },
    {
     "id": "eq-D-1250",
     "type": "equation",
     "page": 20,
     "original": "9.95"
    },
    {
     "id": "eq-D-1251",
     "type": "equation",
     "page": 20,
     "original": "Yangben yav yav"
    },
    {
     "id": "eq-D-1252",
     "type": "equation",
     "page": 20,
     "original": "8.7"
    },
    {
     "id": "eq-D-1253",
     "type": "equation",
     "page": 20,
     "original": "Yaqui yaq yaq"
    },
    {
     "id": "eq-D-1254",
     "type": "equation",
     "page": 20,
     "original": "9.93"
    },
    {
     "id": "eq-D-1255",
     "type": "equation",
     "page": 20,
     "original": "Yauyos Quechua qux qux"
    },
    {
     "id": "eq-D-1256",
     "type": "equation",
     "page": 20,
     "original": "9.35"
    },
    {
     "id": "eq-D-1257",
     "type": "equation",
     "page": 20,
     "original": "Yekhee ets ets"
    },
    {
     "id": "eq-D-1258",
     "type": "equation",
     "page": 20,
     "original": "10.11"
    },
    {
     "id": "eq-D-1259",
     "type": "equation",
     "page": 20,
     "original": "Yiddish yi yid"
    },
    {
     "id": "eq-D-1260",
     "type": "equation",
     "page": 20,
     "original": "1.81"
    },
    {
     "id": "eq-D-1261",
     "type": "equation",
     "page": 20,
     "original": "Yidgha ydg ydg"
    },
    {
     "id": "eq-D-1262",
     "type": "equation",
     "page": 20,
     "original": "9.89"
    },
    {
     "id": "eq-D-1263",
     "type": "equation",
     "page": 20,
     "original": "Yoruba yo yor"
    },
    {
     "id": "eq-D-1264",
     "type": "equation",
     "page": 20,
     "original": "15.66"
    },
    {
     "id": "eq-D-1265",
     "type": "equation",
     "page": 20,
     "original": "Yutanduchi Mixtec mab mab"
    },
    {
     "id": "eq-D-1266",
     "type": "equation",
     "page": 20,
     "original": "9.26"
    },
    {
     "id": "eq-D-1267",
     "type": "equation",
     "page": 20,
     "original": "Zacatlán-Ahuacatlán-Tepetzintla Nahuatl nhi nhi"
    },
    {
     "id": "eq-D-1268",
     "type": "equation",
     "page": 20,
     "original": "0.05"
    },
    {
     "id": "eq-D-1269",
     "type": "equation",
     "page": 20,
     "original": "Zarma dje dje"
    },
    {
     "id": "eq-D-1270",
     "type": "equation",
     "page": 20,
     "original": "10.72"
    },
    {
     "id": "eq-D-1271",
     "type": "equation",
     "page": 20,
     "original": "Zaza zza zza"
    },
    {
     "id": "eq-D-1272",
     "type": "equation",
     "page": 20,
     "original": "1.52"
    },
    {
     "id": "eq-D-1273",
     "type": "equation",
     "page": 20,
     "original": "Zulu zu zul"
    },
    {
     "id": "eq-D-1274",
     "type": "equation",
     "page": 20,
     "original": "14.83"
    },
    {
     "id": "eq-D-1275",
     "type": "equation",
     "page": 20,
     "original": "Ömie aom aom"
    },
    {
     "id": "eq-D-1276",
     "type": "equation",
     "page": 20,
     "original": "8.19"
    }
   ]
  },
  {
   "id": "sec-E",
   "num": "E",
   "level": 1,
   "page": 22,
   "title": {
    "original": "Limitations and Future Works",
    "zh": "附录 E 局限与未来工作"
   },
   "blocks": [
    {
     "id": "p-E-1",
     "type": "paragraph",
     "page": 22,
     "sentences": [
      {
       "id": "s-E-1-1",
       "original": "OmniVoice is currently trained solely on publicly available open-source datasets.",
       "zh": "OmniVoice 目前完全在公开的开源数据集上训练。"
      },
      {
       "id": "s-E-1-2",
       "original": "Due to inconsistent annotation quality and uneven acoustic quality across these sources, substantial room remains for performance improvement when trained on more curated, high-quality data.",
       "zh": "由于这些数据源之间标注质量不一、声学质量参差，若在更精心整理的高质量数据上训练，仍有很大的性能提升空间。"
      },
      {
       "id": "s-E-1-3",
       "original": "Likewise, the scope and flexibility of the model’s instruction-following capacity are constrained by the diversity and quality of existing instruction-tuning data.",
       "zh": "同样，模型指令跟随能力的范围与灵活性，也受限于现有指令微调数据的多样性与质量。"
      },
      {
       "id": "s-E-1-4",
       "original": "Constructing high-quality instruction datasets would therefore notably enhance the model’s voice design and customization capabilities.",
       "zh": "因此，构建高质量的指令数据集将明显增强模型的声音设计与定制能力。"
      },
      {
       "id": "s-E-1-5",
       "original": "Furthermore, OmniVoice has not yet been optimized for processing complex numeric sequences or mathematical patterns.",
       "zh": "此外，OmniVoice 尚未针对复杂数字序列或数学模式的处理进行优化。"
      },
      {
       "id": "s-E-1-6",
       "original": "Integrating an external text-normalization front-end would effectively strengthen the model’s performance in such scenarios.",
       "zh": "集成一个外部的文本规范化前端，将有效增强模型在这类场景下的表现。"
      },
      {
       "id": "s-E-1-7",
       "original": "Additionally, unlike continuous-space NAR TTS models, where inference steps can be drastically reduced via techniques such as flow distillation [16], no existing approach enables comparable inference acceleration for discrete-space NAR TTS models.",
       "zh": "另外，连续空间 NAR TTS 模型的推理步数可以通过流蒸馏 [16] 等技术大幅减少，而离散空间 NAR TTS 模型目前尚不存在能实现同等推理加速的方法。"
      },
      {
       "id": "s-E-1-8",
       "original": "Exploring optimization strategies to decrease inference steps for this branch of models thus constitutes a promising direction for future work.",
       "zh": "因此，探索减少这一类模型推理步数的优化策略，是未来工作中一个有前景的方向。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-F",
   "num": "F",
   "level": 1,
   "page": 22,
   "title": {
    "original": "Ethics Statements",
    "zh": "附录 F 伦理声明"
   },
   "blocks": [
    {
     "id": "p-F-1",
     "type": "paragraph",
     "page": 22,
     "sentences": [
      {
       "id": "s-F-1-1",
       "original": "This work is intended only for academic research purposes.",
       "zh": "本工作仅用于学术研究目的。"
      },
      {
       "id": "s-F-1-2",
       "original": "The proposed TTS model is not used for commercial purposes by the authors’ affiliated institutions.",
       "zh": "所提出的 TTS 模型未被作者所属机构用于商业目的。"
      },
      {
       "id": "s-F-1-3",
       "original": "Given its ability to synthesize speech with high speaker similarity, it carries potential risks of misuse.",
       "zh": "鉴于其合成高说话人相似度语音的能力，该模型存在被滥用的潜在风险。"
      },
      {
       "id": "s-F-1-4",
       "original": "Any illegal use of this model is strictly prohibited.",
       "zh": "严禁任何对本模型的非法使用。"
      }
     ]
    }
   ]
  }
 ],
 "annotations": [
  {
   "id": "ann-001",
   "anchor": {
    "sentence_id": "s-abstract-1-5",
    "quote": "a 581k-hour multilingual dataset curated entirely from open-source data"
   },
   "kind": "number",
   "title": "581k 小时什么量级",
   "explanation": "581k 小时（约 66 年不间断音频）是本文真正的护城河：它不是闭源堆出来的，而是聚合 50 个开源数据集（附录 A）清洗而来。相比 Whisper 的 680k 小时、MMS 的约 50 万小时级语料，这个量级处在同一梯队，但全部开源可复现——这在 600+ 语种 TTS 里是第一次。需要注意：开源数据声学质量参差，作者在附录 E 也承认这是上限所在。",
   "featured": true
  },
  {
   "id": "ann-002",
   "anchor": {
    "sentence_id": "s-abstract-1-4",
    "quote": "initialization from a pre-trained LLM"
   },
   "kind": "concept",
   "title": "LLM 初始化是什么",
   "explanation": "指直接用预训练大语言模型（Qwen3-0.6B）的权重初始化双向 Transformer 主干，让模型'天生'具备语言学先验。这一手在 AR-TTS（如 CosyVoice 系）已是常规操作，但 NAR TTS 此前没人成功过——因为 NAR 的双向注意力与 LLM 的因果掩码训练方式矛盾，作者声称首次把它做成了。这是全文最值得记住的贡献点之一。",
   "featured": true
  },
  {
   "id": "ann-003",
   "anchor": {
    "sentence_id": "s-1-3-2",
    "quote": "error propagation, where inaccuracies in semantic prediction degrade the final audio quality"
   },
   "kind": "motivation",
   "title": "为什么抛弃两阶段",
   "explanation": "SOTA 离散 NAR 系统（如 MaskGCT）走 text-to-semantic + semantic-to-acoustic 两级管线：语义预测错一点，声学阶段只能错上加错；且语义 token 码率低，韵律细节天然丢失。OmniVoice 的回应很激进——干脆删掉语义层，单阶段直接从文本到声学码本。代价是单阶段模型历来可懂度差，这正是后面 LLM 初始化要补的窟窿。",
   "featured": true
  },
  {
   "id": "ann-004",
   "anchor": {
    "sentence_id": "s-1-6-6",
    "quote": "the first NAR TTS model to successfully benefit from LLM initialization"
   },
   "kind": "comparison",
   "title": "首个吃到 LLM 红利的 NAR",
   "explanation": "AR-TTS 借 LLM 初始化提升可懂度早已是公开配方（VALL-E 系、CosyVoice、Qwen3-TTS 均如此），但 NAR 方向此前照搬即失败。本文表 6 的消融给出了直接证据：同数据同超参下，无 LLM 初始化的模型即便反复调学习率，WER 仍全面高于初始化版本。'first' 的声明是消融撑着的，不是修辞。",
   "featured": true
  },
  {
   "id": "ann-005",
   "anchor": {
    "sentence_id": "s-2-1-1-4-1",
    "quote": "C times more than per-layer masking strategy"
   },
   "kind": "concept",
   "title": "全码本随机掩码",
   "explanation": "传统 per-layer 掩码每个样本只在某一个码本层内随机掩码、只算该层损失；OmniVoice 对 T×C 个 token 位置逐点独立伯努利采样，掩码率 pt 再从 U(0,1) 均匀抽取。平均每次迭代约 50% 的 token 参与损失，是单层的 C 倍（C=8 即 8 倍监督密度）。监督信号密度的提升直接换来收敛速度和生成质量，这是扩散 LM 式训练相对层序生成的结构性优势。",
   "featured": true
  },
  {
   "id": "ann-007",
   "anchor": {
    "sentence_id": "s-2-1-2-1-5",
    "quote": "their pre-trained knowledge translates well to our bidirectional architecture"
   },
   "kind": "critique",
   "title": "因果到双向为何能迁",
   "explanation": "LLM 是用因果掩码训练的，搬来做双向注意力理论上存在分布失配，作者只用 'empirically find' 一句带过，未给出机制解释。可能的原因是底层句法/词法表示对掩码方向不敏感，且语音目标提供了足够强的下游监督。但读者应注意：这是一个工程上成立、理论上未解释的关键假设，换成更大或不同架构的 LLM 未必同样顺利。",
   "featured": true
  },
  {
   "id": "ann-008",
   "anchor": {
    "sentence_id": "s-2-2-6-3",
    "quote": "we empirically set β = 0.8"
   },
   "kind": "number",
   "title": "重采样 β=0.8 的取舍",
   "explanation": "β 控制语言重采样的平滑程度：β=1.0 保留自然长尾分布（高资源语言占绝对主导），β=0.0 所有语言等频。取 0.8 意味着向低资源语言大幅倾斜但不彻底拉平——英语 206k 小时和仅 0.02 小时的濒危语言差距依然悬殊，只是低资源语言获得了最低限度的曝光。这是多语种训练的经典配方（mT5、MMS 同款思路），数值本身是经验调出来的，论文没有给 β 扫描的消融。",
   "featured": false
  },
  {
   "id": "ann-009",
   "anchor": {
    "sentence_id": "s-2-2-7-1",
    "quote": "eliminating cumbersome grapheme-to-phoneme conversion and language-specific text normalization"
   },
   "kind": "motivation",
   "title": "为什么不做 G2P",
   "explanation": "600+ 语种逐一配字位转音素（G2P）和文本规范化规则是不现实的工程负担，直接用 LLM 子词 tokenizer 把文本处理'外包'给语言模型的预训练知识，是规模化覆盖的必然选择。但这也是把双刃剑：附录 E 承认复杂数字序列和数学表达的处理因此受限，需要外部文本规范化前端补齐——绕开的问题最终会以另一种形式回来。",
   "featured": false
  },
  {
   "id": "ann-010",
   "anchor": {
    "sentence_id": "s-2-3-1-1-4",
    "quote": "These samples are paired with a specific instruction token, <|denoise|>."
   },
   "kind": "engineering",
   "title": "提示去噪的实现",
   "explanation": "做法朴素有效：训练时给一部分样本的提示段注入合成噪声/混响，同时在指令位加 <|denoise|> token，强迫模型把说话人身份与声学环境解耦——条件可以脏，目标必须干净。推理时只需在带噪提示前加该 token 即得干净输出。表 7 显示代价是 SIM-o 从 0.697 微降到 0.668（输出比噪声提示'更标准'所致），作者认为这笔交易划算。",
   "featured": false
  },
  {
   "id": "ann-011",
   "anchor": {
    "sentence_id": "s-3-3-1-3",
    "quote": "were trained in 9.66 days and 1.33 days"
   },
   "kind": "number",
   "title": "训练成本并不夸张",
   "explanation": "多语版 2M 步、8 张 H800 跑 9.66 天，约 1855 GPU·天；双语版 300k 步仅 1.33 天。以 646 语种、581k 小时的规模看，这个成本相当克制——得益于 BF16 混合精度、8192 token 序列打包，以及全码本掩码带来的高监督密度。相比之下，同级别 AR 大模型 TTS 的训练账单通常更高。这也让'全开源复现'在算力门槛上可信。",
   "featured": true
  },
  {
   "id": "ann-012",
   "anchor": {
    "sentence_id": "s-3-4-1-1",
    "quote": "we perform a 32-steps iterative unmasking process"
   },
   "kind": "concept",
   "title": "32 步迭代去掩码",
   "explanation": "推理从全掩码序列出发，每步按置信度选 kn 个位置揭开并填 token，32 步填满。步数是质量与速度的主旋钮：附录 B 显示从 64 步降到 16 步指标几乎不掉（test-clean WER 0.729→0.728），降到 8 步才开始劣化（0.713，UTMOS 明显下滑）。默认 32 步是保守选择，实际部署 16 步即可兼得质量与 RTF 0.0319。",
   "featured": false
  },
  {
   "id": "ann-013",
   "anchor": {
    "sentence_id": "s-3-4-4-2",
    "quote": "we apply a temperature T = 5 to the confidence scores before sampling"
   },
   "kind": "engineering",
   "title": "温度 5 防局部最优",
   "explanation": "每步揭开哪些位置不是纯取 top-k 置信度，而是先给置信度加 T=5 的高温再采样——高温度拉平分布，让低置信度位置也有机会提前揭开，注入随机性以避免'先易后难'的贪心轨迹锁死在次优解。这与 MaskGIT 的置信度调度思路一致，属于推理期零成本的稳定性技巧，作者称所有这组策略（温度、层惩罚、CFG=2）都经消融验证有效。",
   "featured": false
  },
  {
   "id": "ann-014",
   "anchor": {
    "sentence_id": "s-4-2-2-2",
    "quote": "this is due to limitations in the Whisper ASR model rather than the quality of the generated speech"
   },
   "kind": "critique",
   "title": "WER 指标的测量陷阱",
   "explanation": "粤语 WER 用 Whisper-large-v3 测得 21.92，换 SenseVoice-Small 立刻降到 2.273%——差距近十倍，说明瓶颈在 ASR 评测器而非生成质量。这暴露了整个'用 ASR 测 TTS'范式的系统性风险：当 TTS 逼近甚至超过评测 ASR 的能力边界时，WER/CER 数字失去意义。作者保留了 Whisper 口径以示可比，是诚实的处理，但读者看任何 TTS 的 WER 都该先问用的哪个 ASR。",
   "featured": true
  },
  {
   "id": "ann-015",
   "anchor": {
    "sentence_id": "s-4-2-3-3",
    "quote": "an average CER of 4.00%, which is comparable to that of the ground truth"
   },
   "kind": "number",
   "title": "4.00% 与真实语音打平",
   "explanation": "在 102 语种 FLEURS 基准上平均 CER 4.00%，与真实语音录音的 2.850%（不同 ASR 口径）处在同一量级——即合成语音的可懂度已经逼近真实录音被 ASR 识别的水平。更值得注意的是图 4：约半数语言 OmniVoice 的 CER 低于真实语音，因为训练数据里很多真实录音本身含噪或转写不准。'打平真实语音'在两年前是不可想象的里程碑。",
   "featured": true
  },
  {
   "id": "ann-016",
   "anchor": {
    "sentence_id": "s-model-3-2-3",
    "quote": "exceeded the measurement capability of existing ASR models"
   },
   "kind": "critique",
   "title": "超出评测器能力之后",
   "explanation": "作者罕见地自我拆台：既然模型已超过 ASR 评测器的测量能力，论文里所有 CER/WER 数字本质上都是下界估计而非精确值，'优于真实语音'的结论也要打上问号。这是 TTS 评测走向成熟的标志性困境——客观指标的天花板先于生成质量的天花板到来。下一步只能靠更可靠的主观评测或更强的裁判模型，论文在这点上保持了难得的克制。",
   "featured": true
  },
  {
   "id": "ann-017",
   "anchor": {
    "sentence_id": "s-libri-2-2",
    "quote": "even after extensive learning rate tuning, the WERs of models without LLM initialization are still consistently higher"
   },
   "kind": "comparison",
   "title": "消融：LLM 初始化见效",
   "explanation": "表 6 的对照设计干净：同样 300k 步、同样超参，唯一变量是有无 LLM 初始化，且对照组做过充分的学习率扫描排除了'没调好'的借口。结果无初始化组 WER 全面更高，直接坐实'可懂度收益来自语言学先验而非偶然'。这是全文因果链最扎实的一组实验，也是'first NAR + LLM init'声明的实证地基。",
   "featured": true
  },
  {
   "id": "ann-018",
   "anchor": {
    "sentence_id": "s-libri-3-2",
    "quote": "SIM-o decreases slightly (0.697 →0.668)"
   },
   "kind": "number",
   "title": "去噪的相似度代价",
   "explanation": "开启提示去噪后 UTMOS 从 4.23 升到 4.32（语音更干净），但 SIM-o 从 0.697 降到 0.668。作者的解释自洽：生成的语音比带噪提示'更标准'，说话人相似度模型会因声学环境差异而扣分。这提醒读者 SIM 类指标混合了'像不像这个人'和'像不像这段录音的声学环境'两个因素——去噪场景下 SIM 轻微下降是指标盲区，不是模型退化。",
   "featured": false
  },
  {
   "id": "ann-019",
   "anchor": {
    "sentence_id": "s-4-3-1-1-3",
    "quote": "an RTF of 0.0319 with 16 inference steps"
   },
   "kind": "number",
   "title": "RTF 0.0319 的含义",
   "explanation": "RTF 0.0319 意味着生成 10 秒音频只需约 0.32 秒（H20、PyTorch、batch=1），比同步数的 ZipVoice（0.0557）快约 43%；批量推理还能压到 0.022。离散 NAR 并行解码的速度优势在此兑现。但注意测试条件是消费级之外的 H20 + 纯 PyTorch，且 16 步是质量不掉线的下限——端侧部署和更少步数仍有距离，附录 E 也承认缺离散版的流蒸馏加速手段。",
   "featured": true
  },
  {
   "id": "ann-020",
   "anchor": {
    "sentence_id": "s-4-2-2-1",
    "quote": "clearly outperforms leading commercial systems (ElevenLabs Multilingual v2 and MiniMax-Speech)"
   },
   "kind": "comparison",
   "title": "开源打赢商业系统",
   "explanation": "MiniMax-Multilingual-24 基准上，纯开源数据训练的 OmniVoice 在平均 SIM-o 和 WER 上同时超过 ElevenLabs Multilingual v2 与 MiniMax-Speech 两个头部商业系统。商业系统的训练数据量和质量理论上占优，这个结果说明架构效率（单阶段 + 全码本掩码 + LLM 初始化）可以补偿数据劣势。不过商业系统版本会迭代，此对比是快照而非终局。",
   "featured": false
  },
  {
   "id": "ann-021",
   "anchor": {
    "sentence_id": "s-E-1-7",
    "quote": "no existing approach enables comparable inference acceleration for discrete-space NAR TTS models"
   },
   "kind": "connection",
   "title": "离散 NAR 的加速空白",
   "explanation": "连续空间 NAR（如 ZipVoice 之流匹配模型）可用流蒸馏把推理步数砍到个位数甚至 1–2 步，而离散空间没有等价技术——概率质量分布在离散 token 上，连续空间的 ODE 蒸馏工具箱用不上。作者把'离散 NAR 步数压缩'点名为开放问题，这实际上是给后续研究者留的明确坑位：谁先做出离散扩散 TTS 的蒸馏方案，谁就能补上这条线的最后短板。",
   "featured": true
  },
  {
   "id": "ann-022",
   "anchor": {
    "sentence_id": "s-E-1-2",
    "quote": "substantial room remains for performance improvement when trained on more curated, high-quality data"
   },
   "kind": "critique",
   "title": "开源数据的天花板",
   "explanation": "这句自我局限值得放大读：581k 小时全部来自开源数据，标注与声学质量参差，作者直言换用精修高质量数据还有很大提升空间。换言之，当前成绩是'数据质量受限下的下限'而非模型上限。这给复现者和竞品都留了空间——同样的架构喂更好的数据理应更强，'全开源'既是卖点也是封印。",
   "featured": false
  }
 ]
};
