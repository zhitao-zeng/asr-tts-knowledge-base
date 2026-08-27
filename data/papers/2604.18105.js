// 自动生成：2604.18105 全文双语精读数据（由 tools/compile_paper.js 装配）
// 结构/原文来自 .cache/papers/2604.18105.json（tools/extract_paper.py）；
// 翻译与讲解来自 .cache/papers/zh/2604.18105/（LLM agent 撰写）。
// 改翻译请改片段后重新装配；勿手改本文件的结构与 original 字段。
globalThis.PAPER_2604_18105 = {
 "paper_id": "2604.18105",
 "model_id": "nim4_asr",
 "title": {
  "original": "NIM4-ASR: Towards Efficient, Robust, and Customizable Real-Time LLM-Based ASR",
  "zh": "NIM4-ASR：迈向高效、鲁棒、可定制的实时 LLM 语音识别"
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
       "original": "Yuan Xie∗, Jiaqi Song∗, Guang Qiu, Xianliang Wang, Kai Qiao, Junfeng Yuan Shengqing Liu, Yi Zhang, Bowen Chen, Ming Lei, Jie Gao, Jie Wu Advanced Intelligent Systems Group, NIO {ryan.xie2, jiaqi.song2}@nio.com Project page: https://yuanx9.github.io/NIM4-ASR/"
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
       "original": "Integrating large language models (LLMs) into automatic speech recognition (ASR) has become a mainstream paradigm in recent years.",
       "zh": "将大语言模型（LLM）引入自动语音识别（ASR）已成为近年来的主流范式。"
      },
      {
       "id": "s-abstract-1-2",
       "original": "Although existing LLM-based ASR models demonstrate impressive performance on public benchmarks, their training remains predominantly data-driven, leaving key practical challenges insufficiently addressed—particularly limited downward scalability in resource-constrained deployments and hallucinations under acoustically challenging conditions.",
       "zh": "尽管现有 LLM 语音模型在公开基准上表现出色，但其训练仍主要依赖数据驱动，若干关键工程挑战尚未被充分解决——尤其是资源受限部署下较小的向下扩展能力，以及在声学条件恶劣时出现的幻觉问题。"
      },
      {
       "id": "s-abstract-1-3",
       "original": "To address these issues, we present NIM4-ASR, a productionoriented LLM-based ASR framework optimized for both efficiency and robustness.",
       "zh": "针对这些问题，我们提出 NIM4-ASR：一个面向生产环境、同时优化效率与鲁棒性的 LLM 语音识别框架。"
      },
      {
       "id": "s-abstract-1-4",
       "original": "Grounded in a principled delineation of functional roles between the encoder and the LLM, we redesign the multi-stage training paradigm to align each module with its intended capability boundary.",
       "zh": "我们在方法上为编码器与 LLM 划分清晰的功能边界，并据此重新设计多阶段训练范式，使每个模块与其应有的能力边界对齐。"
      },
      {
       "id": "s-abstract-1-5",
       "original": "Specifically, we reformulate the pre-training architecture and objective to mitigate the modality gap and improve parameter efficiency; introduce an iterative asynchronous SFT stage to preserve acoustic fidelity and constrain representation drift; and design an ASR-specialized reinforcement learning stage to further enhance recognition quality and robustness.",
       "zh": "具体而言，我们重构了预训练架构与目标，以缩小模态鸿沟并提升参数效率；引入迭代异步 SFT 阶段来保持声学保真度并抑制表征漂移；并设计面向 ASR 的强化学习阶段，进一步提升识别质量与鲁棒性。"
      },
      {
       "id": "s-abstract-1-6",
       "original": "We additionally incorporate a suite of production-oriented optimizations, including robustness under noisy and silent conditions, real-time streaming inference, and hotword customization via retrieval-augmented generation (RAG).",
       "zh": "我们还加入了一整套面向生产的优化，包括噪声与静音条件下的鲁棒性、实时流式推理，以及基于检索增强生成（RAG）的热词定制。"
      },
      {
       "id": "s-abstract-1-7",
       "original": "Experiments show that NIM4-ASR achieves state-of-the-art performance on multiple public benchmarks with merely 2.3B parameters, while substantially outperforming larger-scale competitors on internal benchmarks—particularly in entity-intensive real-world scenarios.",
       "zh": "实验表明，NIM4-ASR 仅用 2.3B 参数就在多个公开基准上达到 SOTA，并在内部基准上显著超过更大规模的竞争者——尤其是在实体密集的真实场景中。"
      },
      {
       "id": "s-abstract-1-8",
       "original": "NIM4-ASR further supports million-scale hotword customization via RAG with sub-millisecond retrieval latency, enabling efficient adaptation to emerging entities and personalized user requirements.",
       "zh": "NIM4-ASR 还通过 RAG 支持百万级热词定制，检索延迟低于毫秒级，可以高效适配新出现的实体和个性化用户需求。"
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
    "zh": "引言"
   },
   "blocks": [
    {
     "id": "p-1-1",
     "type": "paragraph",
     "page": 1,
     "sentences": [
      {
       "id": "s-1-1-1",
       "original": "With the rapid advancement of large language models (LLMs), the prevailing paradigm of automatic speech recognition (ASR) is undergoing a transition from classical architectures (Graves et al., 2006; Chorowski et al., 2015; Chan et al., 2016; Graves, 2012) to the encoder–adaptor–LLM framework (Bai et al., 2024a; An et al., 2025).",
       "zh": "随着大语言模型（LLM）的快速发展，自动语音识别（ASR）的主流范式正从经典架构（Graves et al., 2006; Chorowski et al., 2015; Chan et al., 2016; Graves, 2012）向「编码器–适配器–LLM」框架（Bai et al., 2024a; An et al., 2025）过渡。"
      },
      {
       "id": "s-1-1-2",
       "original": "Over the past two years, a series of LLM-based ASR models, including Seed-ASR (Bai et al., 2024a), Fun-ASR (An et al., 2025), FireRedASR series (Xu et al., 2025b, 2026), Voxtral (Liu et al., 2025), Index-ASR (Song et al., 2025), and Qwen3-ASR (Shi et al., 2026), have achieved promising performance on public ASR benchmarks.",
       "zh": "过去两年间，一系列基于 LLM 的语音模型——包括 Seed-ASR（Bai et al., 2024a）、Fun-ASR（An et al., 2025）、FireRedASR 系列（Xu et al., 2025b, 2026）、Voxtral（Liu et al., 2025）、Index-ASR（Song et al., 2025）以及 Qwen3-ASR（Shi et al., 2026）——在公开 ASR 基准上都取得了不错的成绩。"
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
       "original": "Compared with classical ASR models that are primarily optimized for acoustic-to-lexical transduction, LLM-based ASR benefits from the rich linguistic priors and contextual modeling capacity inherited from large-scale language model pretraining (Fathullah et al., 2024).",
       "zh": "与主要围绕声学到词面转换进行优化的经典 ASR 模型相比，LLM 语音模型受益于大规模语言模型预训练带来的丰富语言先验和上下文建模能力（Fathullah et al., 2024）。"
      },
      {
       "id": "s-1-2-2",
       "original": "The LLM’s strong language *Equal Contribution. modeling capacity and contextual coherence modeling help resolve acoustic and lexical ambiguities, yielding transcriptions that are more fluent and semantically coherent.",
       "zh": "LLM 强大的语言建模能力与上下文连贯性建模能力有助于消解声学与词法上的歧义，从而生成更流畅、语义更连贯的转写结果。"
      },
      {
       "id": "s-1-2-3",
       "original": "Furthermore, LLMs encode extensive world knowledge during large-scale pretraining, substantially improving the recognition of rare named entities, technical terminology, and domain-specific expressions that classical ASR models frequently misrecognize (Wang et al., 2025).",
       "zh": "此外，LLM 在大规模预训练中编码了广泛的世界知识，显著改善了对罕见命名实体、专业术语以及领域特定表达的识别——这些内容恰恰是经典 ASR 模型经常认错的对象（Wang et al., 2025）。"
      },
      {
       "id": "s-1-2-4",
       "original": "Overall, incorporating LLMs helps bridge acoustic modeling with semantic understanding (An et al., 2025; Hono et al., 2024), leading to enhanced robustness to acoustically ambiguous inputs such as noise and accent variations, as well as improved cross-domain generalization.",
       "zh": "总体而言，引入 LLM 有助于弥合声学建模与语义理解之间的裂缝（An et al., 2025; Hono et al., 2024），从而增强对噪声、口音变化等声学模糊输入的鲁棒性，并提升跨域泛化能力。"
      },
      {
       "id": "s-1-2-5",
       "original": "Despite these advantages, LLM-based ASR still faces several key limitations in real-world scenarios.",
       "zh": "尽管有这些优势，LLM 语音模型在真实场景中仍面临若干关键局限。"
      }
     ]
    },
    {
     "id": "p-1-3",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-1-3-1",
       "original": "1.",
       "zh": "1."
      },
      {
       "id": "s-1-3-2",
       "original": "Limited downward scalability.",
       "zh": "向下扩展能力有限。"
      },
      {
       "id": "s-1-3-3",
       "original": "In deployment, particularly for real-time speech interfaces, lightweight ASR models are favored for their lower inference latency and computational cost.",
       "zh": "在部署中、尤其是实时语音交互场景，因为推理延迟低、算力开销小，轻量级 ASR 模型更受青睐。"
      },
      {
       "id": "s-1-3-4",
       "original": "However, the downward scalability of LLM-based ASR appears disappointing: lightweight variants such as Qwen3-ASR-0.6B and Fun-ASR-nano exhibit substantial performance gaps relative to their full-scale counterparts.",
       "zh": "然而 LLM 语音模型的向下扩展表现令人失望：像 Qwen3-ASR-0.6B 和 Fun-ASR-nano 这样的轻量变体，与它们的完整版之间存在明显的性能差距。"
      },
      {
       "id": "s-1-3-5",
       "original": "Beyond the degradation ordinarily expected from model downscaling, LLM- based ASR models carry an additional structural cost from the modality tax (Aghajanyan et al., 2023; Zhang et al., 2026): a non-trivial number of parameters are devoted to cross-modal alignment rather than the ASR task itself.",
       "zh": "除了模型缩小本身带来的常规退化之外，LLM 语音模型还背负一层额外的结构性成本——即「模态税（modality tax）」（Aghajanyan et al., 2023; Zhang et al., 2026）：相当数量的参数被用来做跨模态对齐，而非服务于 ASR 任务本身。"
      },
      {
       "id": "s-1-3-6",
       "original": "This overhead leaves lightweight LLMs with less effective capacity, imposing a disproportionate performance degradation (Endo and Yeung-Levy, 2025).",
       "zh": "这部分开销让轻量级 LLM 实际可用的模型容量进一步缩水，带来的性能退化远超过参数减少本身应有的幅度（Endo and Yeung-Levy, 2025）。"
      }
     ]
    },
    {
     "id": "p-1-4",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-1-4-1",
       "original": "2.",
       "zh": "2."
      },
      {
       "id": "s-1-4-2",
       "original": "Hallucination.",
       "zh": "幻觉。"
      },
      {
       "id": "s-1-4-3",
       "original": "Beyond the intrinsic hallucination tendencies of autoregressive LLMs, the encoder– adaptor–LLM joint-training paradigm introduces additional risks (Bai et al., 2024b; Zhou et al., 2024; Xie et al., 2026).",
       "zh": "除了自回归 LLM 固有的幻觉倾向之外，「编码器–适配器–LLM」的联合训练范式还引入了额外风险（Bai et al., 2024b; Zhou et al., 2024; Xie et al., 2026）。"
      },
      {
       "id": "s-1-4-4",
       "original": "During joint optimization, the encoder is progressively pulled toward the LLM’s optimization objective under the influence of its stronger gradients and linguistic priors, causing its representations to gradually shift toward the LLM’s text feature space (i.e., representation drift).",
       "zh": "在联合优化过程中，编码器在 LLM 更强梯度与语言先验的牵引下，会逐渐被拉向 LLM 的优化目标，其表征也逐步向 LLM 的文本特征空间偏移——也就是所谓的「表征漂移（representation drift）」。"
      },
      {
       "id": "s-1-4-5",
       "original": "As a result, the encoder may increasingly rely on linguistic shortcuts at the expense of fine-grained acoustic fidelity, exacerbating hallucinations under acoustically ambiguous conditions (Park et al., 2025).",
       "zh": "其结果之一是，编码器可能越来越依赖语言捷径，而牺牲细粒度的声学保真度，在声学含糊的输入上更容易诱发幻觉（Park et al., 2025）。"
      },
      {
       "id": "s-1-4-6",
       "original": "In task-oriented in-vehicle speech interaction scenarios, hallucinations can cascade through the downstream pipeline and trigger unintended actions (Tay et al., 2026).",
       "zh": "在车载任务型语音交互场景中，幻觉会沿下游流水线级联放大，触发意料之外的操作（Tay et al., 2026）。"
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
       "original": "3.",
       "zh": "3."
      },
      {
       "id": "s-1-5-2",
       "original": "Lack of production-ready hotword customization.",
       "zh": "缺乏生产级热词定制能力。"
      },
      {
       "id": "s-1-5-3",
       "original": "Existing LLM-based ASR systems lack mature hotword customization solutions comparable to N-gram language model rescoring methods (Song et al., 2019; Kuo and Chen, 2022) widely adopted in classical ASR systems.",
       "zh": "现有 LLM 语音模型还没有成熟的热词定制方案，无法与经典 ASR 系统中广泛采用的 N-gram 语言模型重打分方法（Song et al., 2019; Kuo and Chen, 2022）相提并论。"
      },
      {
       "id": "s-1-5-4",
       "original": "Such customization support is indispensable for accurately transcribing personalized entities with similar pronunciations (An et al., 2025; Lei et al., 2025), including homophonous location names, media titles, and emerging proper nouns that often reside in the long tail of LLMs’ pretraining distribution.",
       "zh": "这类定制支持对于准确转写「发音相近的个性实体」不可或缺（An et al., 2025; Lei et al., 2025），比如同音的地名、媒体标题，以及往往落在 LLM 预训练分布长尾中的新兴专有名词。"
      }
     ]
    },
    {
     "id": "p-1-6",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-1-6-1",
       "original": "To address the aforementioned limitations, we propose NIM4-ASR (NOMI Intelligence Model 4.0-ASR), a production-oriented LLM-based ASR framework optimized for both efficiency and robustness.",
       "zh": "针对上述局限，我们提出 NIM4-ASR（NOMI Intelligence Model 4.0-ASR）——一个面向生产、同时优化效率与鲁棒性的 LLM 语音框架。"
      },
      {
       "id": "s-1-6-2",
       "original": "NIM4-ASR adopts a redesigned multi-stage training paradigm that reduces the modality gap between speech and text while explicitly delineating the functional roles of the encoder and the LLM (Xie et al., 2026).",
       "zh": "NIM4-ASR 采用重新设计的多阶段训练范式，在缩小语音与文本之间模态鸿沟的同时，显式划分编码器与 LLM 各自的功能边界（Xie et al., 2026）。"
      },
      {
       "id": "s-1-6-3",
       "original": "Specifically, we redesign a module-aware pre-training scheme that aligns training objectives with the intrinsic characteristics of each component.",
       "zh": "具体而言，我们重新设计了一种「模块感知」的预训练方案，使训练目标与每个组件的内在特性对齐。"
      },
      {
       "id": "s-1-6-4",
       "original": "This encourages the encoder to produce low-entropy, peaky representations that narrow the modality gap, reducing the LLM capacity required for cross-modal alignment and improving parameter efficiency.",
       "zh": "这会促使编码器产出低熵、尖锐的表征，从而缩小模态鸿沟，减少 LLM 需要用于跨模态对齐的容量，最终提升参数效率。"
      },
      {
       "id": "s-1-6-5",
       "original": "We then develop an Iterative Asynchronous SFT (IA-SFT) stage between alignment and joint SFT, which strengthens cross-modal alignment while preserving functional decoupling across modules, thereby mitigating representation drift and suppressing hallucinations.",
       "zh": "我们在对齐阶段与联合 SFT 之间又设计了一个「迭代异步 SFT（IA-SFT）」阶段：它在加强跨模态对齐的同时，保持模块间功能解耦，进而抑制表征漂移并压制幻觉。"
      },
      {
       "id": "s-1-6-6",
       "original": "Additionally, we incorporate an ASR-specialized reinforcement learning (RL) strategy to further enhance recognition quality and robustness.",
       "zh": "此外，我们引入面向 ASR 的强化学习（RL）策略，进一步提升识别质量与鲁棒性。"
      },
      {
       "id": "s-1-6-7",
       "original": "Beyond the training-side design, NIM4-ASR also incorporates a series of production-oriented enhancements for practical deployment, including robustness under noisy and silent conditions, real-time streaming inference, and scalable hotword customization via retrieval-augmented generation (RAG).",
       "zh": "在训练侧的设计之外，NIM4-ASR 还集成了一系列面向生产部署的增强，包括噪声与静音条件下的鲁棒性、实时流式推理，以及基于检索增强生成（RAG）的可扩展热词定制。"
      },
      {
       "id": "s-1-6-8",
       "original": "Finally, we conduct extensive evaluations on diverse Mandarin and English benchmarks, demonstrating that NIM4-ASR achieves state-of-the-art (SOTA) performance on several benchmarks with only 2.3B parameters.",
       "zh": "最后，我们在覆盖普通话与英语的多个基准上进行了大规模评测——NIM4-ASR 仅用 2.3B 参数就在多个基准上达到 SOTA。"
      },
      {
       "id": "s-1-6-9",
       "original": "Our key contributions are summarized as follows:",
       "zh": "我们的主要贡献总结如下："
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
       "original": "• Principled multi-stage training paradigm.",
       "zh": "• 有原则的多阶段训练范式。"
      },
      {
       "id": "s-1-7-2",
       "original": "We propose a principled multi-stage training paradigm that reduces the modality gap and preserves module-specific functional specialization for improved efficiency and robustness.",
       "zh": "我们提出一套有原则的多阶段训练范式，在缩小模态鸿沟的同时保留各模块的功能专精，从而提升效率与鲁棒性。"
      },
      {
       "id": "s-1-7-3",
       "original": "We further introduce an ASR-specialized RL stage, which brings additional gains in recognition accuracy and hallucination mitigation.",
       "zh": "我们还引入了面向 ASR 的 RL 阶段，为识别准确率与幻觉抑制带来额外收益。"
      }
     ]
    },
    {
     "id": "p-1-8",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-1-8-1",
       "original": "• Optimized streaming support.",
       "zh": "• 优化的流式支持。"
      },
      {
       "id": "s-1-8-2",
       "original": "We cultivate the encoder’s native streaming capability from pre-training and introduce a decoupled streaming inference strategy that separates encoder and LLM execution, enabling both responsive real-time transcription and stable final outputs. • Phoneme-level RAG for hotword customization.",
       "zh": "我们从预训练起就培养编码器的原生流式能力，并引入一个将编码器与 LLM 执行解耦的流式推理策略，既能给出低延迟的实时中间转写，也能输出稳定的最终结果。 • 用于热词定制的音素级 RAG。"
      },
      {
       "id": "s-1-8-3",
       "original": "Building on Fun-ASR, we improve the phoneme-level retrieval algorithm with an emphasis on retrieval precision and latency, enabling million-scale hotword customization with sub-millisecond retrieval latency while preserving high retrieval precision. • Comprehensive evaluation.",
       "zh": "在 Fun-ASR 的基础上，我们改进了音素级检索算法，重点提升检索精度与延迟，在保持高检索精度的同时支持百万级热词、亚毫秒级检索延迟。 • 全面的评测。"
      },
      {
       "id": "s-1-8-4",
       "original": "We conduct comprehensive evaluations across 25 benchmarks (15 public and 10 internal), showing that NIM4-ASR can achieve SOTA performance on multiple benchmarks with only 2.3B parameters, validating its parameter efficiency and strong robustness.",
       "zh": "我们在 25 个基准（15 个公开 + 10 个内部）上做了全面评测，证明 NIM4-ASR 仅用 2.3B 参数就能在多个基准上达到 SOTA，验证了其参数效率与极强的鲁棒性。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-2",
   "num": "2",
   "level": 1,
   "page": 3,
   "title": {
    "original": "Methodology",
    "zh": "方法"
   },
   "blocks": []
  },
  {
   "id": "sec-2-1",
   "num": "2.1",
   "level": 2,
   "page": 3,
   "title": {
    "original": "Architecture",
    "zh": "架构"
   },
   "blocks": [
    {
     "id": "p-2-1-1",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-2-1-1-1",
       "original": "Transcript: Give me your top picks for delicious lattes at NIO House Give … NIO House <eos> Large Language Model <bos> Give … NIO House Transcribe the speech into text.",
       "zh": "（图中 prompt 示例）Transcript: “Give me your top picks for delicious lattes at NIO House” → LLM 依据 <bos>…<eos> 之间的上下文与「Transcribe the speech into text.」指令完成转写。"
      }
     ]
    },
    {
     "id": "p-2-1-2",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-2-1-2-1",
       "original": "Contextual hints:",
       "zh": "上下文提示（Contextual hints）："
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
       "original": "Speech embeddings Speech adaptor “Give me your top picks for delicious lattes at NIO House” Speech Encoder NIO House Retrieval Phoneme hypos Phoneme head Hotword database Encoder representations",
       "zh": "（图示意）原始语音进入语音编码器得到编码器表征；一路经语音适配器产出语音嵌入注入 LLM，另一路经音素头产出生成的音素假设，再从热词库中检索出「NIO House」，作为上下文提示拼入 LLM 的 prompt。"
      }
     ]
    },
    {
     "id": "fig-2-1-1",
     "type": "figure_caption",
     "page": 3,
     "original": "Figure 1: The overall architecture of NIM4-ASR.",
     "zh": "图 1：NIM4-ASR 的整体架构。"
    },
    {
     "id": "p-2-1-4",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-2-1-4-1",
       "original": "As shown in Figure 1, NIM4-ASR follows a modular encoder–adaptor–LLM architecture comprising four components.",
       "zh": "如图 1 所示，NIM4-ASR 采用模块化的「编码器–适配器–LLM」架构，由四个组件构成。"
      },
      {
       "id": "s-2-1-4-2",
       "original": "Before being fed into the model, raw speech is first converted into 80-dimensional log-Mel spectrograms using a 25 ms window with a 10 ms frame shift, followed by global mean and variance normalization.",
       "zh": "在进入模型之前，原始语音先被转换成 80 维 log-Mel 频谱图：25 ms 窗长、10 ms 帧移，再做全局均值方差归一化。"
      },
      {
       "id": "s-2-1-4-3",
       "original": "The details of the four main components are described below:",
       "zh": "下面分别介绍这四个主要组件。"
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
       "original": "• Streaming speech encoder.",
       "zh": "• 流式语音编码器。"
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
       "original": "Our encoder adopts the Conformer encoder architecture from FireRedASR-AED (Xu et al., 2025b), consisting of a 4x downsampling convolutional module followed by a stack of Conformer blocks (Gulati et al., 2020), with approximately 600 M parameters in total.",
       "zh": "我们的编码器沿用 FireRedASR-AED（Xu et al., 2025b）的 Conformer 编码器结构：一个 4x 下采样卷积模块，后接一叠 Conformer block（Gulati et al., 2020），总参数约 600M。"
      },
      {
       "id": "s-2-1-6-2",
       "original": "The encoder converts acoustic features into continuous representations at a frame rate of 25 Hz (40 ms temporal resolution).",
       "zh": "编码器把声学特征转成 25 Hz 帧率（40 ms 时间分辨率）的连续表征。"
      },
      {
       "id": "s-2-1-6-3",
       "original": "To support low-latency online decoding, we convert it into a chunk-based streaming encoder by simulating streaming constraints during training. • Speech adaptor.",
       "zh": "为了支持低延迟在线解码，我们在训练中模拟流式约束，把它改造成基于 chunk 的流式编码器。 • 语音适配器。"
      },
      {
       "id": "s-2-1-6-4",
       "original": "The speech adaptor consists of a two-layer MLP that maps the encoder representations into the LLM’s input embedding space.",
       "zh": "语音适配器由一个两层 MLP 构成，作用是把编码器表征映射到 LLM 的输入嵌入空间。"
      },
      {
       "id": "s-2-1-6-5",
       "original": "Before projection, we apply a 4x downsampling by concatenating four consecutive frames along the feature dimension to shorten the sequence length.",
       "zh": "在投影之前，我们先做一次 4x 下采样：把连续 4 帧沿特征维拼接，以缩短序列长度。"
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
       "original": "After downsampling, the frame rate is reduced to 6.25 Hz, corresponding to a temporal resolution of 160 ms per token. • Phoneme-level CTC head and RAG module.",
       "zh": "下采样之后帧率降到 6.25 Hz，对应每个 token 160 ms 的时间分辨率。 • 音素级 CTC 头与 RAG 模块。"
      },
      {
       "id": "s-2-1-7-2",
       "original": "The phoneme-level CTC head (hereafter referred to as the CTC head or phoneme head) serves as the acoustic front-end of the RAG module, comprising a three-layer MLP.",
       "zh": "音素级 CTC 头（下文简称 CTC 头或音素头）是 RAG 模块的声学前端，由一个三层 MLP 构成。"
      },
      {
       "id": "s-2-1-7-3",
       "original": "It decodes encoder representations into phoneme hypotheses via greedy decoding.",
       "zh": "它通过贪心解码把编码器表征转成音素假设。"
      },
      {
       "id": "s-2-1-7-4",
       "original": "Based on these hypotheses, our retrieval algorithm searches the hotword database to retrieve matching entries, which are then injected into the prompt as contextual hints for the LLM.",
       "zh": "基于这些音素假设，我们的检索算法在热词库中查找匹配条目，把结果作为上下文提示注入 LLM 的 prompt。"
      },
      {
       "id": "s-2-1-7-5",
       "original": "Further details of the RAG module are provided in Section 2.4.2. • LLM decoder.",
       "zh": "RAG 模块的更多细节见 Section 2.4.2。 • LLM 解码器。"
      },
      {
       "id": "s-2-1-7-6",
       "original": "The decoder is initialized from Qwen3-1.7B (Yang et al., 2025) and generates the final transcription conditioned on both speech embeddings and optional retrieved hotword hints.",
       "zh": "解码器用 Qwen3-1.7B（Yang et al., 2025）初始化，在语音嵌入与可选的检索热词提示的条件下生成最终转写。"
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
    "original": "Training Recipe",
    "zh": "训练方案"
   },
   "blocks": [
    {
     "id": "p-2-2-1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-2-2-1-1",
       "original": "In contrast to most prior work driven primarily by empirical fine-tuning, we begin with a principled analysis of the practical limitations of current LLM-based ASR systems and their underlying causes (Xie et al., 2026), revealing that the cross-modal gap and representation drift remain insufficiently addressed.",
       "zh": "与多数以经验微调为主线的先前工作不同，我们先从对当前 LLM 语音系统实际局限及其成因的原理性分析入手（Xie et al., 2026），发现跨模态鸿沟和表征漂移这两个问题仍未被充分解决。"
      },
      {
       "id": "s-2-2-1-2",
       "original": "Based on these insights, we comprehensively redesign the training pipeline.",
       "zh": "基于这些洞察，我们系统性地重构了训练流水线。"
      },
      {
       "id": "s-2-2-1-3",
       "original": "As illustrated in Figure 2, the methodological advances of NIM4-ASR center on four core training stages: encoder pretraining, alignment, IA-SFT, and late joint SFT.",
       "zh": "如图 2 所示，NIM4-ASR 的方法学创新集中在四个核心训练阶段：编码器预训练、对齐、IA-SFT 和后期联合 SFT。"
      },
      {
       "id": "s-2-2-1-4",
       "original": "Beyond this four-stage pipeline, context SFT and RL are further incorporated after late joint SFT to strengthen contextual modeling and robustness.",
       "zh": "在这四阶段流水线之后，还会接入 context SFT 与 RL，用于进一步增强上下文建模与鲁棒性。"
      },
      {
       "id": "s-2-2-1-5",
       "original": "The detailed procedures are described below.",
       "zh": "下面详细说明各步骤。"
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
       "original": "Conventional LLM-based ASR Stage 2: Alignment Stage 1: Pre-training ❄ LLM 🔥 Decoder Stage 3: SFT 🔥  EncoderFinal 🔥 Encoder ❄/ 🔥 EncoderFinal",
       "zh": "（图中示意）传统 LLM 语音模型：Stage 1 预训练（冻结/微调 LLM 解码器）→ Stage 2 对齐 → Stage 3 SFT（编码器与 LLM 一起微调）。"
      }
     ]
    },
    {
     "id": "eq-2-2-1",
     "type": "equation",
     "page": 4,
     "original": "---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------"
    },
    {
     "id": "p-2-2-3",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-2-2-3-1",
       "original": "NIM4-ASR Stage 2: Alignment ❄ LLM ❄ Frozen 🔥 Trainable ❄ Encoderinit ❄ Encoderinit Stage 3: IA-SFT w/ iterative updates Stage 4: Late joint SFT 🔥 EncoderFinal ❄ Encodermid ❄ EncoderFinal Update Stage 1: Pre-training Update Fine-tune for RAG module 🔥 Phoneme head CKA-Triggered Final update CKA-Triggered 🔥 Encoder 🔥 Encoderinit 🔥 Encodermid 🔥 EncoderFinal ❄ Encoder",
       "zh": "（图中示意）NIM4-ASR：Stage 1 预训练；Stage 2 对齐（LLM 与 Encoder 均冻结，仅训练适配器）；Stage 3 伴随异步预训练的 IA-SFT，由 CKA 触发周期性热替换编码器快照；Stage 4 后期联合 SFT（编码器/适配器/LLM 一起微调）；最后为 RAG 模块单独微调音素头。图例：❄ 表示冻结，🔥 表示可训练。"
      }
     ]
    },
    {
     "id": "fig-2-2-1",
     "type": "figure_caption",
     "page": 4,
     "original": "Figure 2: Comparison of training pipelines from encoder pretraining to joint SFT for conventional LLM-based ASR and our NIM4-ASR.",
     "zh": "图 2：传统 LLM 语音模型与 NIM4-ASR 从编码器预训练到联合 SFT 的训练流水线对比。"
    }
   ]
  },
  {
   "id": "sec-2-2-1",
   "num": "2.2.1",
   "level": 2,
   "page": 4,
   "title": {
    "original": "Stage 1: Encoder Pre-training",
    "zh": "阶段 1：编码器预训练"
   },
   "blocks": [
    {
     "id": "p-2-2-1-1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-2-2-1-1-1",
       "original": "To reduce the modality gap between encoder representations and the LLM embedding space, we adopt an improved variant of Connectionist Temporal Classification (CTC) (Graves et al., 2006)—namely CR-CTC (Yao et al., 2024)—as the pretraining objective.",
       "zh": "为了缩小编码器表征与 LLM 嵌入空间之间的模态鸿沟，我们采用 CTC（Connectionist Temporal Classification）（Graves et al., 2006）的一种改进变体——CR-CTC（Yao et al., 2024）——作为预训练目标。"
      },
      {
       "id": "s-2-2-1-1-2",
       "original": "As illustrated in Figure 2, the model architecture during pretraining consists of the encoder paired with a CTC head.",
       "zh": "如图 2 所示，预训练阶段的模型由「编码器 + CTC 头」构成。"
      },
      {
       "id": "s-2-2-1-1-3",
       "original": "In contrast to the Attention-based Encoder-Decoder (AED) commonly used in prior work (Xu et al., 2025b, 2026), CTC encourages the encoder to produce low-entropy, phoneme-discriminative representations that align more naturally with the LLM’s embedding space, thereby reducing cross-modal alignment overhead and reserving more model capacity for the ASR task.",
       "zh": "与先前工作常用的基于注意力的编码器-解码器（AED）（Xu et al., 2025b, 2026）不同，CTC 会促使编码器产出低熵、在音素上更具判别性的表征，与 LLM 的嵌入空间天然更接近，从而降低跨模态对齐开销，把更多模型容量留给 ASR 任务本身。"
      }
     ]
    },
    {
     "id": "p-2-2-1-2",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-2-2-1-2-1",
       "original": "Furthermore, we shift the supervision labels from character level to phoneme level (Yusuyin et al., 2025), explicitly dedicating the encoder’s capacity to acoustic-to-phoneme mapping rather than premature semantic anchoring, while encouraging the LLM to focus more on semantic reasoning.",
       "zh": "更进一步，我们将监督标签从字符级迁移到音素级（Yusuyin et al., 2025）：把编码器的能力显式限定在「声学到音素」的映射，而不是过早做语义锚定，同时让 LLM 更专注于语义推理。"
      },
      {
       "id": "s-2-2-1-2-2",
       "original": "This design achieves a cleaner decoupling of acoustic modeling from semantic reasoning, improving role specialization of both modules.",
       "zh": "这一设计让声学建模与语义推理实现更干净的解耦，提升两个模块的角色专精度。"
      },
      {
       "id": "s-2-2-1-2-3",
       "original": "Moreover, adopting phoneme prediction as the pretraining objective encourages the encoder to learn low-level acoustic representations with weak language dependence, offering greater potential for extending to new languages and dialects.",
       "zh": "此外，把音素预测作为预训练目标能引导编码器学到对语言依赖较弱的低层声学表征，为扩展到新语言和方言提供更大空间。"
      }
     ]
    },
    {
     "id": "p-2-2-1-3",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-2-2-1-3-1",
       "original": "To endow the encoder with native streaming capability, we incorporate the dynamic-chunk mechanism during pretraining (Zhang et al., 2020).",
       "zh": "为了让编码器具备原生流式能力，我们在预训练中引入了动态片段机制（Zhang et al., 2020）。"
      },
      {
       "id": "s-2-2-1-3-2",
       "original": "Specifically, the encoder processes full utterances under chunk-wise streaming constraints, where the chunk size and the number of visible left-context chunks are dynamically sampled for each batch.",
       "zh": "具体来说，编码器在片段级流式约束下处理整句语音：每个 batch 的片段大小与可见的左侧上下文片段数都动态采样。"
      },
      {
       "id": "s-2-2-1-3-3",
       "original": "This exposes the encoder to a wide range of streaming configurations, enabling flexible operation that accommodates varying latency budgets across different deployment scenarios.",
       "zh": "这样编码器在训练中就见过各种各样的流式配置，可以灵活适配不同部署场景下的延迟预算。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-2-2-2",
   "num": "2.2.2",
   "level": 2,
   "page": 5,
   "title": {
    "original": "Stage 2: Alignment & Stage 3: IA-SFT",
    "zh": "阶段 2：对齐 & 阶段 3：IA-SFT"
   },
   "blocks": [
    {
     "id": "p-2-2-2-1",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-2-2-2-1-1",
       "original": "In conventional training paradigms, alignment and joint SFT are performed sequentially after pretraining fully completes.",
       "zh": "在传统训练范式中，对齐和联合 SFT 都发生在预训练完全结束之后。"
      },
      {
       "id": "s-2-2-2-1-2",
       "original": "As shown in Figure 2, we propose an encoder iteration mechanism for NIM4-ASR that allows alignment to begin before pretraining completes, while IA-SFT is launched upon alignment completion and proceeds asynchronously alongside the remaining pretraining process.",
       "zh": "如图 2 所示，我们为 NIM4-ASR 提出一种「编码器迭代机制」：对齐可以在预训练尚未完成时就开始；对齐完成后启动 IA-SFT，与剩余的预训练进程异步并行推进。"
      },
      {
       "id": "s-2-2-2-1-3",
       "original": "To decide when to initialize or update the encoder used by alignment and IA-SFT, we track encoder representation dynamics using Centered Kernel Alignment (CKA) (Kornblith et al., 2019), which compares the evolving encoder against the reference checkpoint that is initialized and periodically updated throughout pretraining.",
       "zh": "为了决定何时初始化或更新对齐与 IA-SFT 所用的编码器，我们用 CKA（Centered Kernel Alignment，Kornblith et al., 2019）跟踪编码器表征的动态变化——CKA 会把当前正在演化的编码器与参考 checkpoint 做比较，而参考 checkpoint 在预训练过程中会被初始化并按周期更新。"
      },
      {
       "id": "s-2-2-2-1-4",
       "original": "Given two sets of encoder representations E(a), E(b) extracted from the same evaluation set, CKA is defined as",
       "zh": "给定两组来自同一评估集的编码器表征 E(a)、E(b)，CKA 定义为："
      }
     ]
    },
    {
     "id": "eq-2-2-2-1",
     "type": "equation",
     "page": 5,
     "original": "CKA(E(a), E(b)) = ⟨˜K(a), ˜K(b)⟩F q"
    },
    {
     "id": "p-2-2-2-2",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-2-2-2-2-1",
       "original": "⟨˜K(a), ˜K(a)⟩F · ⟨˜K(b), ˜K(b)⟩F , where ˜K(a) and ˜K(b) are centered Gram matrices calculated via ˜K(x) = CE(x)E(x)⊤C.",
       "zh": "⟨K̃(a), K̃(a)⟩F · ⟨K̃(b), K̃(b)⟩F，其中 K̃(a) 与 K̃(b) 是由 K̃(x) = C E(x) E(x)ᵀ C 计算得到的中心化 Gram 矩阵。"
      },
      {
       "id": "s-2-2-2-2-2",
       "original": "The centering matrix is defined as C = IL −1 LJL, where IL is the identity matrix and JL is the all-ones matrix.",
       "zh": "中心化矩阵定义为 C = I_L − (1/L) J_L，其中 I_L 是单位矩阵，J_L 是全 1 矩阵。"
      },
      {
       "id": "s-2-2-2-2-3",
       "original": "CKA measures the geometric consistency of representation spaces, invariant to orthogonal transformation and isotropic scaling.",
       "zh": "CKA 度量表征空间的几何一致性，对正交变换和各向同性缩放不变。"
      }
     ]
    },
    {
     "id": "p-2-2-2-3",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-2-2-2-3-1",
       "original": "Stage 2: Alignment.",
       "zh": "阶段 2：对齐。"
      },
      {
       "id": "s-2-2-2-3-2",
       "original": "We start monitoring the encoder after pretraining reaches 500k steps, at which point the encoder begins to exhibit a relatively stable optimization trend.",
       "zh": "我们在预训练达到 500k 步时开始监控编码器——此时编码器的优化趋势开始相对稳定。"
      },
      {
       "id": "s-2-2-2-3-3",
       "original": "The encoder at 500k steps is snapshotted as the initial reference checkpoint, and CKA is evaluated every 10k pretraining steps thereafter.",
       "zh": "500k 步处的编码器会被快照为初始参考 checkpoint，此后每 10k 预训练步评估一次 CKA。"
      },
      {
       "id": "s-2-2-2-3-4",
       "original": "When the CKA score between the evolving encoder and the current reference checkpoint first falls below the predefined threshold1, we snapshot the corresponding encoder to initialize alignment and simultaneously update the reference checkpoint.",
       "zh": "当演化中的编码器与当前参考 checkpoint 之间的 CKA 分数首次跌破预设阈值（脚注 1）时，就快照对应的编码器用于初始化对齐阶段，同时更新参考 checkpoint。"
      },
      {
       "id": "s-2-2-2-3-5",
       "original": "During alignment, both the encoder and LLM are frozen, and only the adaptor is trained.",
       "zh": "在对齐阶段，编码器和 LLM 都冻结，只训练适配器。"
      },
      {
       "id": "s-2-2-2-3-6",
       "original": "In our setup, this first trigger occurs at approximately 1.01M pretraining steps, and the alignment stage runs for 1.3M steps.",
       "zh": "在我们的设置中，首个触发点大约在 1.01M 预训练步；对齐阶段共训练 1.3M 步。"
      }
     ]
    },
    {
     "id": "p-2-2-2-4",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-2-2-2-4-1",
       "original": "Stage 3: IA-SFT.",
       "zh": "阶段 3：IA-SFT。"
      },
      {
       "id": "s-2-2-2-4-2",
       "original": "After alignment completes, we perform IA-SFT as an intermediate stage before joint SFT.",
       "zh": "对齐完成后、联合 SFT 之前，我们先进行 IA-SFT 作为中间阶段。"
      },
      {
       "id": "s-2-2-2-4-3",
       "original": "IA-SFT keeps the encoder frozen and trains the adaptor–LLM stack across a sequence of encoder snapshots produced by the asynchronous pretraining process.",
       "zh": "IA-SFT 保持编码器冻结，但会在由异步预训练过程产出的一系列编码器快照上，依次训练「适配器–LLM」这一子栈。"
      },
      {
       "id": "s-2-2-2-4-4",
       "original": "The procedure is as follows:",
       "zh": "具体流程如下："
      }
     ]
    },
    {
     "id": "p-2-2-2-5",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-2-2-2-5-1",
       "original": "• (i) Initialization & monitoring.",
       "zh": "• (i) 初始化与监控。"
      },
      {
       "id": "s-2-2-2-5-2",
       "original": "IA-SFT begins after alignment completes, training for 1M steps with the encoder inherited from alignment, while encoder pretraining continues in parallel.",
       "zh": "IA-SFT 在对齐完成后启动：用从对齐阶段继承的编码器训练 1M 步，与此同时编码器预训练继续并行。"
      },
      {
       "id": "s-2-2-2-5-3",
       "original": "The CKA evaluation resumes from the previously updated reference checkpoint and continues every 10k pretraining steps, monitoring the representation shift. • (ii) CKA-triggered update.",
       "zh": "CKA 评估从之前更新过的参考 checkpoint 继续，每 10k 预训练步做一次，持续监控表征漂移。 • (ii) CKA 触发的更新。"
      },
      {
       "id": "s-2-2-2-5-4",
       "original": "Whenever the CKA score drops below the predefined threshold, the snapshot of the current pretraining encoder is hot-swapped into the IA-SFT branch, and the reference checkpoint is updated accordingly. • (iii) Final update.",
       "zh": "每当 CKA 分数跌破预设阈值，就把当前预训练编码器的快照热替换到 IA-SFT 分支中，并同步更新参考 checkpoint。 • (iii) 最终更新。"
      },
      {
       "id": "s-2-2-2-5-5",
       "original": "The update cycle (ii) repeats until pretraining reaches its 2M-step maximum.",
       "zh": "重复上述 (ii) 的更新循环，直到预训练达到 2M 步的上限。"
      }
     ]
    },
    {
     "id": "p-2-2-2-6",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-2-2-2-6-1",
       "original": "When pretraining completes, a final encoder update is applied regardless of the CKA score, and IA-SFT runs for the final 2M steps.",
       "zh": "预训练结束时，无论 CKA 分数如何，都会做一次最终的编码器更新；随后 IA-SFT 再训练 2M 步。"
      }
     ]
    },
    {
     "id": "p-2-2-2-7",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-2-2-2-7-1",
       "original": "In our implementation, IA-SFT trains for 1M steps using the encoder checkpoint at 1.01M pretraining steps, another 1M steps using the encoder checkpoint at 1.32M pretraining steps, and a final 2M steps using the fully pretrained encoder—totaling 4M steps across three encoder versions.",
       "zh": "在我们的实现中，IA-SFT 先使用 1.01M 步的编码器 checkpoint 训练 1M 步，再使用 1.32M 步的编码器 checkpoint 训练 1M 步，最后用完全预训练好的编码器训练 2M 步——跨三个编码器版本共 4M 步。"
      },
      {
       "id": "s-2-2-2-7-2",
       "original": "During IA-SFT, the encoder remains frozen but is periodically updated from the asynchronous pretraining process, thus maintaining acoustic grounding.",
       "zh": "在 IA-SFT 期间，编码器保持冻结但会周期性地被异步预训练流程替换，因此始终保持对底层的声学锚定。"
      },
      {
       "id": "s-2-2-2-7-3",
       "original": "This allows the model to deepen cross-modal alignment without the risk of representation drift.",
       "zh": "这样模型可以在规避表征漂移风险的同时加深跨模态对齐。"
      },
      {
       "id": "s-2-2-2-7-4",
       "original": "From a curriculum learning perspective, IA-SFT progressively exposes the LLM to refined encoder representations, allowing it to learn invariant patterns and achieve greater robustness to acoustic perturbations.",
       "zh": "从课程学习的角度看，IA-SFT 让 LLM 逐渐接触越来越精细的编码器表征，从而学到不变性特征，对声学扰动更鲁棒。"
      },
      {
       "id": "s-2-2-2-7-5",
       "original": "Furthermore, since alignment and IA-SFT run asynchronously alongside pretraining, the overall training pipeline remains time-efficient.",
       "zh": "此外，由于对齐和 IA-SFT 与预训练异步并行，整体训练流水线在时间上仍然高效。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-2-2-3",
   "num": "2.2.3",
   "level": 2,
   "page": 5,
   "title": {
    "original": "Stage 4: Late Joint SFT",
    "zh": "阶段 4：后期联合 SFT"
   },
   "blocks": [
    {
     "id": "p-2-2-3-1",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-2-2-3-1-1",
       "original": "After the completion of both encoder pretraining and IA-SFT, a robust initial cross-modal mapping between speech representations and the LLM embedding space has been established.",
       "zh": "编码器预训练与 IA-SFT 都完成之后，语音表征与 LLM 嵌入空间之间已经建立起一个稳健的初始跨模态映射。"
      },
      {
       "id": "s-2-2-3-1-2",
       "original": "We then 1In this work, we empirically set this threshold to 0.975 based on global CKA dynamics during pretraining, balancing meaningful representation changes against disruptive representation shifts. perform late joint SFT, in which the encoder, adaptor, and LLM are jointly optimized in an end-to-end manner.",
       "zh": "此时我们再做后期联合 SFT（脚注 1：本文基于预训练中观测到的全局 CKA 动态，经验性地将该阈值设为 0.975，在「有意义的表征变化」与「破坏性表征偏移」之间取得平衡）——编码器、适配器和 LLM 以端到端方式联合优化。"
      },
      {
       "id": "s-2-2-3-1-3",
       "original": "Compared with conventional joint training, the risk of representation drift induced by LLM gradients is substantially reduced, as the preceding stages have already minimized the modality gap.",
       "zh": "与传统联合训练相比，由 LLM 梯度引发的表征漂移风险被大幅降低，因为前面几个阶段已经把模态鸿沟压缩到很小。"
      },
      {
       "id": "s-2-2-3-1-4",
       "original": "Consequently, these gradients serve primarily as fine-tuning signals that seamlessly refine acoustic-to-phoneme mapping and phoneme-to-semantic grounding.",
       "zh": "因此，这些梯度主要扮演微调信号的角色：平滑地雕琢「声学到音素」的映射以及「音素到语义」的锚定关系。"
      },
      {
       "id": "s-2-2-3-1-5",
       "original": "From a geometric perspective, the preceding alignment stages have established a stable cross-modal manifold, placing subsequent optimization in a low-curvature region of the loss landscape.",
       "zh": "从几何角度看，前面的对齐阶段已经建立起一个稳定的跨模态流形，让后续优化落在损失曲面的低曲率区域。"
      },
      {
       "id": "s-2-2-3-1-6",
       "original": "Within this regime, gradient updates act as local refinements to decision boundaries and manifold geometry rather than inducing large-scale topological restructuring.",
       "zh": "在这种状态下，梯度更新起到的是对决策边界和流形几何做局部精修的作用，而不会诱发大尺度的拓扑重构。"
      }
     ]
    },
    {
     "id": "p-2-2-3-2",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-2-2-3-2-1",
       "original": "Following late joint SFT, all subsequent training stages, including context SFT and RL, are conducted in a fully end-to-end manner.",
       "zh": "在后期联合 SFT 之后，所有后续训练阶段（包括 context SFT 和 RL）都以完全端到端的方式进行。"
      },
      {
       "id": "s-2-2-3-2-2",
       "original": "With modality alignment concerns largely resolved in prior stages, the model can devote its full capacity to refining complex cross-modal reasoning and long-context interaction, progressively deepening the integration of acoustic perception and semantic modeling.",
       "zh": "模态对齐问题在前面阶段已基本解决，模型可以把全部容量用于雕琢更复杂的跨模态推理和长上下文交互，逐步加深声学感知与语义建模的融合。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-2-2-4",
   "num": "2.2.4",
   "level": 2,
   "page": 6,
   "title": {
    "original": "Stage 5: Context SFT",
    "zh": "阶段 5：Context SFT"
   },
   "blocks": [
    {
     "id": "p-2-2-4-1",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-2-2-4-1-1",
       "original": "Following joint SFT, we introduce a context SFT stage (Bai et al., 2024a; An et al., 2025; Song et al., 2025) to strengthen the model’s ability to leverage contextual information—a capability essential for hotword customization in LLM-based ASR systems.",
       "zh": "在联合 SFT 之后，我们引入一个 context SFT 阶段（Bai et al., 2024a; An et al., 2025; Song et al., 2025），加强模型利用上下文信息的能力——这是 LLM 语音系统实现热词定制的关键。"
      },
      {
       "id": "s-2-2-4-1-2",
       "original": "In this stage, we first construct a keyword set S from the training corpus.",
       "zh": "该阶段中，我们首先从训练语料中构建一个关键词集合 S。"
      },
      {
       "id": "s-2-2-4-1-3",
       "original": "All transcripts are parsed to extract candidate phrases, which are then filtered by Qwen3-30B-A3B-Instruct (Yang et al., 2025) to retain named entities such as personal names, POI (points of interest), media names and proper nouns.",
       "zh": "先对所有转写文本做候选短语抽取，再用 Qwen3-30B-A3B-Instruct（Yang et al., 2025）过滤，只保留人名、POI（兴趣点）、媒体名、专有名词等命名实体。"
      },
      {
       "id": "s-2-2-4-1-4",
       "original": "During training, we increase the sampling ratio of long-duration utterances and probabilistically inject keywords sampled from S into the prompt as contextual hints, following the template below:",
       "zh": "训练时，我们提高长时长语音的采样比例，并按概率把从 S 中抽到的关键词注入 prompt，作为上下文提示（模板如下）："
      }
     ]
    },
    {
     "id": "p-2-2-4-2",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-2-2-4-2-1",
       "original": "NIM4-ASR Prompt Template <|im_start|>system You are a Multilingual Speech Recognition Model.<|im_end|> <|im_start|>user Transcribe the speech into text <speech>.",
       "zh": "NIM4-ASR 的 prompt 模板为：<|im_start|>system You are a Multilingual Speech Recognition Model.<|im_end|> <|im_start|>user Transcribe the speech into text <speech>."
      },
      {
       "id": "s-2-2-4-2-2",
       "original": "Contextual hints: {context}.<|im_end|> <|im_start|>assistant <transcription><|im_end|> For each training instance, we first retrieve relevant keywords from S present in the transcript.",
       "zh": "Contextual hints: {context}.<|im_end|> <|im_start|>assistant <transcription><|im_end|> 对每个训练样本，我们先从 S 中检索出真正出现在转写文本里的相关关键词。"
      },
      {
       "id": "s-2-2-4-2-3",
       "original": "Additionally, for each keyword, we retrieve another keyword from S with identical or highly similar pronunciation to serve as a distractor context with a certain probability.",
       "zh": "此外，对每个关键词，我们再按一定概率从 S 中检索一个「发音相同或极为相近」的另一个关键词，作为干扰项上下文。"
      },
      {
       "id": "s-2-2-4-2-4",
       "original": "Both relevant keywords and distractors are concatenated and then added to the {context} field.",
       "zh": "把相关关键词与干扰关键词拼接后一起填入 {context} 字段。"
      },
      {
       "id": "s-2-2-4-2-5",
       "original": "The inclusion of distractors discourages the LLM from over-relying on contextual cues at the expense of semantic plausibility.",
       "zh": "加入干扰项的目的是抑制 LLM 过度依赖上下文提示、牺牲语义合理性的倾向。"
      },
      {
       "id": "s-2-2-4-2-6",
       "original": "During this stage, the encoder, adaptor and the LLM are jointly trained.",
       "zh": "该阶段中，编码器、适配器和 LLM 是联合训练的。"
      }
     ]
    },
    {
     "id": "p-2-2-4-3",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-2-2-4-3-1",
       "original": "It is worth noting that our context SFT focuses on phrase-level contextual cues (An et al., 2025; Shi et al., 2026) rather than the sentence- or dialogue-level context (Bai et al., 2024a), as this stage is designed specifically for hotword customization rather than cross-turn dialogue consistency.",
       "zh": "值得注意的是，我们的 context SFT 关注的是短语级（phrase-level）上下文线索（An et al., 2025; Shi et al., 2026），而非句子级或对话级上下文（Bai et al., 2024a）——因为该阶段专为热词定制而设计，而不是为了跨轮对话一致性。"
      },
      {
       "id": "s-2-2-4-3-2",
       "original": "For multi-turn scenarios, keywords extracted from dialogue history can also be appended to the current prompt.",
       "zh": "在多轮场景中，也可以把从对话历史中抽取的关键词追加进当前 prompt。"
      },
      {
       "id": "s-2-2-4-3-3",
       "original": "This strategy preserves critical contextual information in a compact form, while maintaining lower inference latency than sentence-level alternatives.",
       "zh": "这一策略以紧凑的形式保留关键上下文信息，同时保持比句子级方案更低的推理延迟。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-2-2-5",
   "num": "2.2.5",
   "level": 2,
   "page": 6,
   "title": {
    "original": "Stage 6: ASR Specialized RL",
    "zh": "阶段 6：面向 ASR 的强化学习"
   },
   "blocks": [
    {
     "id": "p-2-2-5-1",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-2-2-5-1-1",
       "original": "To further improve transcription quality, we introduce an ASR-specialized RL stage based on Group Relative Policy Optimization (GRPO) (Shao et al., 2024) that directly optimizes sequence-level transcription behavior using verifiable rewards.",
       "zh": "为了进一步提升转写质量，我们基于 GRPO（Group Relative Policy Optimization，Shao et al., 2024）引入一个面向 ASR 的 RL 阶段，用可验证的奖励直接优化序列级转写行为。"
      },
      {
       "id": "s-2-2-5-1-2",
       "original": "In contrast to supervised objectives that rely on token-level teacher-forcing, RL evaluates complete hypotheses and directly optimizes sequencelevel transcription behavior, improving recognition accuracy, hallucination robustness, and contextsensitive keyword recognition.",
       "zh": "与依赖 token 级 teacher-forcing 的监督目标不同，RL 评估的是完整假设，直接优化序列级转写行为，从而提升识别准确率、幻觉鲁棒性，以及上下文敏感的关键词识别能力。"
      }
     ]
    },
    {
     "id": "p-2-2-5-2",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-2-2-5-2-1",
       "original": "Given an input audio q with ground truth y, the policy model independently samples a group of K candidate hypotheses {τ1, . . . , τK} ∼πθ(· | q), while each hypothesis is evaluated using a set of ASR-specific reward functions.",
       "zh": "给定输入音频 q 和参考文本 y，策略模型会独立采样一组 K 个候选假设 {τ1, …, τK} ∼ πθ(· | q)，每个假设都用一组面向 ASR 的奖励函数打分。"
      }
     ]
    },
    {
     "id": "p-2-2-5-3",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-2-2-5-3-1",
       "original": "• Accuracy reward: We apply a unified text normalization pipeline to both the generated hypotheses and the ground truth, and then compute the character error rate (CER) of each hypothesis.",
       "zh": "• 准确率奖励：我们对生成的假设和参考文本使用同一套文本归一化流水线，再计算每条假设的字错误率（CER）。"
      },
      {
       "id": "s-2-2-5-3-2",
       "original": "The reward function is defined as Racc(τ, y) = exp(−α · CER(τ, y)), where α is set to 2.0 in our experiments.",
       "zh": "奖励函数定义为 R_acc(τ, y) = exp(−α · CER(τ, y))，实验中 α 取 2.0。"
      },
      {
       "id": "s-2-2-5-3-3",
       "original": "This reward is bounded within (0, 1], and its exponential form amplifies the differences among low-CER hypotheses, encouraging fine-grained optimization on near-correct transcriptions.",
       "zh": "该奖励被限制在 (0, 1] 区间，其指数形式放大了低 CER 假设之间的差异，鼓励模型在「接近正确」的转写上做细粒度优化。"
      }
     ]
    },
    {
     "id": "p-2-2-5-4",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-2-2-5-4-1",
       "original": "For high-CER regions (e.g., CER > 1.0), the function requires no clipping and still preserves monotonic reward ordering, which is essential for computing within-group advantages in GRPO. • Hallucination reward: We apply mixed-granularity tokenization (character-level for Chinese, word-level for English) to both hypothesis and ground truth, then compute their lengths.",
       "zh": "在高 CER 区间（例如 CER > 1.0），该函数无需截断，仍然保持单调的奖励排序——这对在 GRPO 中计算组内相对优势至关重要。 • 幻觉奖励：对假设和参考文本都采用混合粒度分词（中文按字、英文按词），再计算其长度。"
      },
      {
       "id": "s-2-2-5-4-2",
       "original": "The hallucination reward Rhallu(τ, y) = −1 if the hypothesis length exceeds 2× or falls below 0.5× the ground truth length; otherwise Rhallu(τ, y) = 0. • Context reward: For each training sample, we use Qwen3-30B-A3B-Instruct to annotate 0–2 entity keywords per sample.",
       "zh": "幻觉奖励 R_hallu(τ, y) = −1，当假设长度超过参考长度的 2× 或低于 0.5× 时；否则 R_hallu(τ, y) = 0。 • 上下文奖励：对每个训练样本，我们用 Qwen3-30B-A3B-Instruct 标注 0–2 个实体关键词。"
      },
      {
       "id": "s-2-2-5-4-3",
       "original": "During training, each sample randomly selects a subset of keywords and injects them into the prompt as contextual hints.",
       "zh": "训练时，每个样本随机抽取部分关键词注入 prompt，作为上下文提示。"
      },
      {
       "id": "s-2-2-5-4-4",
       "original": "For each selected keyword, we check whether it appears in the hypothesis: a hit yields a reward of +0.5, while a miss incurs a penalty of −0.5.",
       "zh": "对每个被选中的关键词，检查它是否出现在假设中：命中得 +0.5，未命中罚 −0.5。"
      }
     ]
    },
    {
     "id": "p-2-2-5-5",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-2-2-5-5-1",
       "original": "The cumulative score across all valid contexts is then averaged to obtain the sample-level context reward Rcontext(τ, y).",
       "zh": "所有有效上下文上的累计得分会被平均，得到样本级上下文奖励 R_context(τ, y)。"
      },
      {
       "id": "s-2-2-5-5-2",
       "original": "Notably, we also define a list of important keywords.",
       "zh": "值得一提的是，我们还额外定义了一个「重要关键词」列表。"
      },
      {
       "id": "s-2-2-5-5-3",
       "original": "Whenever a sample contains any important keyword, that keyword is included in the reward computation, regardless of whether it is provided in the prompt.",
       "zh": "只要样本里包含任意重要关键词，无论该词是否出现在 prompt 中，都纳入奖励计算。"
      }
     ]
    },
    {
     "id": "p-2-2-5-6",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-2-2-5-6-1",
       "original": "Finally, the total reward is given by:",
       "zh": "最终的总奖励为："
      }
     ]
    },
    {
     "id": "p-2-2-5-7",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-2-2-5-7-1",
       "original": "R(τ, y) = Racc(τ, y) + 0.5Rhallu(τ, y) + 0.5Rcontext(τ, y).",
       "zh": "R(τ, y) = R_acc(τ, y) + 0.5·R_hallu(τ, y) + 0.5·R_context(τ, y)。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-reinforcement-learning-algorithm",
   "num": null,
   "level": 2,
   "page": 7,
   "title": {
    "original": "Reinforcement learning algorithm.",
    "zh": "强化学习算法"
   },
   "blocks": [
    {
     "id": "p-reinforcement-learning-algorithm-1",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-reinforcement-learning-algorithm-1-1",
       "original": "Following GRPO, we compute the group-normalized advantage ˆAi,t = R(τi, y) −mean({R(τj, y)}K j=1) std({R(τj, y)}K j=1) + ϵ . where ϵ is a small constant for numerical stability.",
       "zh": "沿用 GRPO，我们计算组内归一化优势 Â_{i,t} = (R(τ_i, y) − mean({R(τ_j, y)}^K_{j=1})) / (std({R(τ_j, y)}^K_{j=1}) + ε)，其中 ε 是用于数值稳定的小常数。"
      },
      {
       "id": "s-reinforcement-learning-algorithm-1-2",
       "original": "Denote θold as the policy parameters at the beginning of each optimization step, ε as the clipping range, and β as the KL penalty coefficient.",
       "zh": "记 θ_old 为每个优化步开始时的策略参数，ε_clip 为裁剪范围，β 为 KL 惩罚系数。"
      },
      {
       "id": "s-reinforcement-learning-algorithm-1-3",
       "original": "The GRPO objective is defined as",
       "zh": "GRPO 的目标函数定义为："
      }
     ]
    },
    {
     "id": "eq-reinforcement-learning-algorithm-1",
     "type": "equation",
     "page": 7,
     "original": "JGRPO = 1"
    },
    {
     "id": "eq-reinforcement-learning-algorithm-2",
     "type": "equation",
     "page": 7,
     "original": "K"
    },
    {
     "id": "eq-reinforcement-learning-algorithm-3",
     "type": "equation",
     "page": 7,
     "original": "K X"
    },
    {
     "id": "eq-reinforcement-learning-algorithm-4",
     "type": "equation",
     "page": 7,
     "original": "i=1"
    },
    {
     "id": "eq-reinforcement-learning-algorithm-5",
     "type": "equation",
     "page": 7,
     "original": "1 |τi|"
    },
    {
     "id": "eq-reinforcement-learning-algorithm-6",
     "type": "equation",
     "page": 7,
     "original": "|τi| X"
    },
    {
     "id": "p-reinforcement-learning-algorithm-2",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-reinforcement-learning-algorithm-2-1",
       "original": "t=1 min ri,t(θ) ˆAi,t, clip ri,t(θ), 1 −ε, 1 + ε ˆAi,t −β DKL(πθ∥πref), where ri,t(θ) = πθ(τi,t | q, τi,<t) πθold(τi,t | q, τi,<t).",
       "zh": "（公式见原文）对每个 token t 取 min{r_{i,t}(θ)·Â_{i,t}, clip(r_{i,t}(θ), 1−ε, 1+ε)·Â_{i,t}}，再减去 β·D_KL(π_θ ∥ π_ref)，其中 r_{i,t}(θ) = π_θ(τ_{i,t} | q, τ_{i,<t}) / π_θ_old(τ_{i,t} | q, τ_{i,<t})。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-rl-training-framework",
   "num": null,
   "level": 2,
   "page": 7,
   "title": {
    "original": "RL training framework.",
    "zh": "RL 训练框架"
   },
   "blocks": [
    {
     "id": "p-rl-training-framework-1",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-rl-training-framework-1-1",
       "original": "We implement an RL training pipeline tailored for LLM-based ASR.",
       "zh": "我们实现了一套为 LLM 语音模型量身打造的 RL 训练流水线。"
      },
      {
       "id": "s-rl-training-framework-1-2",
       "original": "For each training batch, the policy model encodes input utterances into speech embeddings, which are reused across both rollout generation and policy model log-probability computation to avoid redundant computation.",
       "zh": "对每个训练 batch，策略模型会把输入语音编码成语音嵌入，这些嵌入在 rollout 生成和策略模型 log-probability 计算两处复用，以避免冗余计算。"
      },
      {
       "id": "s-rl-training-framework-1-3",
       "original": "During policy rollout, we leverage vLLM (Kwon et al., 2023) to efficiently sample K hypotheses conditioned on the speech embeddings and the instruction prompt.",
       "zh": "在策略 rollout 阶段，我们用 vLLM（Kwon et al., 2023）在语音嵌入与指令 prompt 的条件下高效采样出 K 个假设。"
      },
      {
       "id": "s-rl-training-framework-1-4",
       "original": "The sampled hypotheses are then scored by the reward functions described above.",
       "zh": "采样得到的假设随后由上述奖励函数打分。"
      },
      {
       "id": "s-rl-training-framework-1-5",
       "original": "Policy optimization is conducted in a DeepSpeed ZeRO (Rajbhandari et al., 2020) distributed training setup, where token-level logprobabilities are computed under both the policy model and the reference model.",
       "zh": "策略优化在 DeepSpeed ZeRO（Rajbhandari et al., 2020）分布式训练框架下进行，分别在策略模型与参考模型下计算 token 级 log-probability。"
      },
      {
       "id": "s-rl-training-framework-1-6",
       "original": "The reference model remains frozen throughout training, providing a stable anchor for KL regularization and preventing excessive policy drift.",
       "zh": "参考模型在整个训练过程中保持冻结，为 KL 正则提供稳定锚点，防止策略漂移过度。"
      },
      {
       "id": "s-rl-training-framework-1-7",
       "original": "After each optimization step, the updated policy weights are synchronized to the vLLM rollout engine, ensuring that hypothesis sampling remains on-policy.",
       "zh": "每个优化步结束后，更新后的策略权重会同步到 vLLM rollout 引擎，确保下一轮假设采样保持 on-policy。"
      }
     ]
    },
    {
     "id": "p-rl-training-framework-2",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-rl-training-framework-2-1",
       "original": "Considering that ASR models typically employ deterministic decoding at inference time, we adopt a cosine-annealed temperature schedule for rollout sampling, gradually decaying from 1.0 to 0.7.",
       "zh": "考虑到 ASR 模型在推理时通常使用确定性解码，我们在 rollout 采样中采用余弦退火的温度调度，从 1.0 逐渐降到 0.7。"
      },
      {
       "id": "s-rl-training-framework-2-2",
       "original": "In the early stages of RL training, the high temperature encourages diverse hypothesis generation, allowing the reward signal to explore a broader range of transcription behaviors.",
       "zh": "在 RL 训练早期，较高的温度鼓励生成多样化的假设，让奖励信号能探索更宽的转写行为空间。"
      },
      {
       "id": "s-rl-training-framework-2-3",
       "original": "As training progresses, the temperature is smoothly reduced, progressively reinforcing top-1 path quality to ensure strong performance under deterministic decoding at inference.",
       "zh": "随着训练推进，温度被平滑下调，逐步强化 top-1 路径的质量，保证推理时确定性解码下的表现。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-2-2-6",
   "num": "2.2.6",
   "level": 2,
   "page": 8,
   "title": {
    "original": "Additional Stage: Phoneme Head Training for RAG",
    "zh": "附加阶段：为 RAG 训练音素头"
   },
   "blocks": [
    {
     "id": "p-2-2-6-1",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-2-2-6-1-1",
       "original": "After completing the RL stage, the main training pipeline is concluded.",
       "zh": "完成 RL 阶段后，主训练流水线就结束了。"
      },
      {
       "id": "s-2-2-6-1-2",
       "original": "We then introduce an additional stage to train the phoneme head required by the RAG module illustrated in Figure 1.",
       "zh": "接下来我们引入一个附加阶段：训练 RAG 模块所需的音素头（见图 1）。"
      },
      {
       "id": "s-2-2-6-1-3",
       "original": "In this stage, the encoder inherits its structure and weights from the post-RL checkpoint and remains frozen, while the phoneme head is initialized from the pretrained CTC head and remains trainable (see Figure 2).",
       "zh": "该阶段中，编码器继承自 RL 之后的 checkpoint，结构与权重都保持不变并冻结；音素头则用预训练的 CTC 头做初始化并保持可训练（见图 2）。"
      },
      {
       "id": "s-2-2-6-1-4",
       "original": "The training objective and configuration are consistent with those used in pretraining.",
       "zh": "训练目标与配置与预训练阶段保持一致。"
      },
      {
       "id": "s-2-2-6-1-5",
       "original": "After fine-tuning, the phoneme head can convert encoder representations into phoneme hypotheses for the subsequent retrieval module.",
       "zh": "微调完成后，音素头就能把编码器表征转成音素假设，供下游检索模块使用。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-2-3",
   "num": "2.3",
   "level": 2,
   "page": 8,
   "title": {
    "original": "Training Setup",
    "zh": "训练细节"
   },
   "blocks": [
    {
     "id": "p-2-3-1",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-2-3-1-1",
       "original": "This section presents additional implementation details, including training tricks and settings.",
       "zh": "本节补充一些实现细节，包括训练技巧与超参设置。"
      }
     ]
    },
    {
     "id": "p-2-3-2",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-2-3-2-1",
       "original": "Robustness enhancement under noisy and silent conditions.",
       "zh": "噪声与静音条件下的鲁棒性增强。"
      },
      {
       "id": "s-2-3-2-2",
       "original": "In the first five training stages, we apply several data augmentation tricks to improve model robustness.",
       "zh": "在前五个训练阶段，我们采用了几种数据增强技巧来提升模型鲁棒性。"
      },
      {
       "id": "s-2-3-2-3",
       "original": "In addition to standard SpecAugmentation (Park et al., 2019) and speed perturbation, we randomly inject realistic acoustic disturbances, such as babble noise, vehicle noise, and background music, into 20% of clean training samples to simulate challenging real-world environments.",
       "zh": "除了标准的 SpecAugment（Park et al., 2019）与速度扰动之外，我们还向 20% 的干净训练样本中随机注入真实声学扰动（人群噪声、车辆噪声、背景音乐等），以模拟恶劣的真实环境。"
      },
      {
       "id": "s-2-3-2-4",
       "original": "The Signal-to-Noise Ratio (SNR) for these noise injections is randomly sampled from a normal distribution with mean 10 dB and standard deviation 5 dB.",
       "zh": "这些噪声注入的信噪比（SNR）从一个均值为 10 dB、标准差为 5 dB 的正态分布中随机采样。"
      }
     ]
    },
    {
     "id": "p-2-3-3",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-2-3-3-1",
       "original": "Furthermore, to improve the model’s robustness to silence, we adopt a padding-before-noise strategy (An et al., 2025).",
       "zh": "此外，为了提升模型对静音的鲁棒性，我们采用了「先补静音再加噪」（padding-before-noise）策略（An et al., 2025）。"
      },
      {
       "id": "s-2-3-3-2",
       "original": "Specifically, for the 20% training samples chosen for noise augmentation, we prepend and append short silence segments to the utterance prior to noise injection, where the duration of each silence segment is sampled from 0 to 1 second using a skewed Beta(1, 3) distribution.",
       "zh": "具体来说，对那 20% 被选中做噪声增强的训练样本，我们在注入噪声之前，先在语音前后各拼接一段短暂静音；每段静音的时长从偏态的 Beta(1, 3) 分布中采样，范围为 0 到 1 秒。"
      },
      {
       "id": "s-2-3-3-3",
       "original": "This strategy helps mitigate hallucinations in both offline and streaming inference.",
       "zh": "这一策略有助于同时缓解离线与流式推理中的幻觉问题。"
      },
      {
       "id": "s-2-3-3-4",
       "original": "It is particularly beneficial for streaming scenarios, where pauses between words or phrases may cause individual chunks to contain a non-negligible proportion of non-speech frames that can trigger erroneous outputs.",
       "zh": "它对流式场景尤其有益：词或短语之间的停顿可能让某些 chunk 含有相当高比例的非语音帧，容易触发错误输出。"
      },
      {
       "id": "s-2-3-3-5",
       "original": "By explicitly exposing the model to such cases during training, it learns to better distinguish speech from non-speech content, thereby reducing the risk of hallucinations.",
       "zh": "通过在训练中显式让模型接触这类样本，模型会学会更好地区分语音与非语音内容，从而降低幻觉风险。"
      }
     ]
    },
    {
     "id": "p-2-3-4",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-2-3-4-1",
       "original": "Training settings.",
       "zh": "训练设置。"
      },
      {
       "id": "s-2-3-4-2",
       "original": "The model is trained using the Adam optimizer (Kingma, 2014) with cosine annealing and a 10k-step warm-up (except for RL).",
       "zh": "模型使用 Adam 优化器（Kingma, 2014）训练，配合余弦退火与 10k 步的 warm-up（RL 阶段除外）。"
      },
      {
       "id": "s-2-3-4-3",
       "original": "Our training corpus consists exclusively of Mandarin, Chinese dialects, English, and code-switched Mandarin–English speech data.",
       "zh": "训练语料仅包含普通话、中文方言、英语以及中英混合的 code-switch 语音数据。"
      },
      {
       "id": "s-2-3-4-4",
       "original": "Table 1 details the training data scale and maximum learning rate for each stage.",
       "zh": "各阶段的训练数据规模与最大学习率详见 Table 1。"
      }
     ]
    },
    {
     "id": "tab-2-3-1",
     "type": "table_caption",
     "page": 8,
     "original": "Table 1: Training details for all stages.",
     "zh": "Table 1：各训练阶段的训练细节。"
    }
   ]
  },
  {
   "id": "sec-stage",
   "num": null,
   "level": 2,
   "page": 8,
   "title": {
    "original": "Stage",
    "zh": "训练阶段表"
   },
   "blocks": [
    {
     "id": "p-stage-1",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-stage-1-1",
       "original": "Training Data Maximum Learning Rate Stage 1 Encoder pretraining Stage 2 Alignment Stage 3 IA-SFT Stage 4 Late joint SFT Stage 5 Context SFT Stage 6 RL 20k samples",
       "zh": "Table 1 的表体（抽取为文本碎块）：各阶段的训练数据与最大学习率——Stage 1 编码器预训练、Stage 2 对齐、Stage 3 IA-SFT、Stage 4 后期联合 SFT、Stage 5 上下文 SFT、Stage 6 RL（20k 样本）。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-2-4",
   "num": "2.4",
   "level": 2,
   "page": 8,
   "title": {
    "original": "Inference",
    "zh": "推理"
   },
   "blocks": []
  },
  {
   "id": "sec-2-4-1",
   "num": "2.4.1",
   "level": 2,
   "page": 8,
   "title": {
    "original": "Optimized Streaming Inference Pipeline",
    "zh": "优化的流式推理流水线"
   },
   "blocks": [
    {
     "id": "p-2-4-1-1",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-2-4-1-1-1",
       "original": "To achieve low-latency and high-throughput deployment in real-world streaming scenarios, NIM4- ASR adopts a decoupled inference architecture, allowing different modules to be deployed on separate accelerators to better utilize heterogeneous computing resources.",
       "zh": "为了在真实流式场景中实现低延迟、高吞吐的部署，NIM4-ASR 采用解耦的推理架构：不同模块可以部署在不同的加速器上，以更好地利用异构算力。"
      },
      {
       "id": "s-2-4-1-1-2",
       "original": "The speech encoder is deployed on Triton Inference Server2, enabling dynamic batching across concurrent audio streams and significantly improving GPU utilization under high request concurrency.",
       "zh": "语音编码器部署在 Triton Inference Server（脚注 2）上，支持对并发音频流做动态批处理，在高并发下显著提高 GPU 利用率。"
      },
      {
       "id": "s-2-4-1-1-3",
       "original": "The adaptor and LLM decoder are served using a vLLM-based inference engine3 that provides efficient KV-cache management.",
       "zh": "适配器和 LLM 解码器则由基于 vLLM 的推理引擎（脚注 3）托管，提供高效的 KV-cache 管理。"
      },
      {
       "id": "s-2-4-1-1-4",
       "original": "During inference, the encoder continuously processes incoming audio and transmits speech representations to the vLLM server, where they are projected into speech embeddings and appended to the LLM context.",
       "zh": "推理时，编码器持续处理输入音频，并把语音表征传给 vLLM 服务器；在 vLLM 端它们被投影成语音嵌入并追加到 LLM 的上下文中。"
      },
      {
       "id": "s-2-4-1-1-5",
       "original": "In addition, both the phoneme-level CTC head and the RAG module run on the CPU, where the CTC head produces phoneme hypotheses that are used for hotword retrieval.",
       "zh": "此外，音素级 CTC 头和 RAG 模块都跑在 CPU 上：CTC 头产出的音素假设将用于热词检索。"
      }
     ]
    },
    {
     "id": "p-2-4-1-2",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-2-4-1-2-1",
       "original": "To make the decoding pipeline more streaming-friendly, the prompt structure follows a fixed ordering.",
       "zh": "为了让解码流水线更适合流式，prompt 的结构按固定顺序组织。"
      },
      {
       "id": "s-2-4-1-2-2",
       "original": "A static instruction prefix (e.g., system prompts and task instructions) is placed at the beginning of the context and can therefore be pre-computed and cached in the KV-cache before inference begins.",
       "zh": "静态指令前缀（如 system prompt 与任务指令）放在上下文的最前面，因此可以在推理开始前预先计算并缓存在 KV-cache 中。"
      },
      {
       "id": "s-2-4-1-2-3",
       "original": "Streaming speech embeddings are then appended incrementally as audio chunks arrive.",
       "zh": "流式语音嵌入随后按音频 chunk 到来顺序逐步追加。"
      },
      {
       "id": "s-2-4-1-2-4",
       "original": "Contextual information, including the instruction associated with the current decoding stage and hotwords retrieved by the RAG module, is appended after the speech embeddings.",
       "zh": "上下文信息——包括当前解码阶段对应的指令、以及 RAG 模块检索到的热词——追加在语音嵌入之后。"
      },
      {
       "id": "s-2-4-1-2-5",
       "original": "This ordering allows the static prefix to be cached once, while the speech embeddings are continuously prefetched during speech input.",
       "zh": "这种顺序让静态前缀只需缓存一次，而语音嵌入可以在语音输入期间持续预取。"
      },
      {
       "id": "s-2-4-1-2-6",
       "original": "In the streaming output mode, intermediate decoding can be performed after each newly prefetched speech chunk.",
       "zh": "在流式输出模式下，每预取一段新的语音 chunk，就可以做一次中间解码。"
      },
      {
       "id": "s-2-4-1-2-7",
       "original": "At the end of speech, all speech chunks have already been prefetched, and only the final instruction and accumulated hotword context need to be appended before final decoding, substantially reducing redundant KV-cache computation.",
       "zh": "语音结束时，所有语音 chunk 都已经预取完毕，最终解码前只需追加最终指令和累计的热词上下文，大幅减少了 KV-cache 的冗余计算。"
      }
     ]
    },
    {
     "id": "p-2-4-1-3",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-2-4-1-3-1",
       "original": "NIM4-ASR performs streaming recognition through incremental speech prefill and hypothesis refresh.",
       "zh": "NIM4-ASR 通过「增量语音预取 + 假设刷新」实现流式识别。"
      },
      {
       "id": "s-2-4-1-3-2",
       "original": "The streaming encoder processes incoming speech with a chunk size of 640 ms. Each chunk is encoded immediately, and the resulting speech representations are appended to the LLM context through streaming chunked prefill.",
       "zh": "流式编码器以 640 ms 的 chunk 大小处理输入语音：每个 chunk 立即被编码，得到的语音表征通过流式分块预取追加到 LLM 的上下文中。"
      },
      {
       "id": "s-2-4-1-3-3",
       "original": "During inference, the encoder caches representations from the previous 4 chunks, allowing the current chunk to attend to a limited left context while avoiding redundant computation over earlier audio segments.",
       "zh": "推理期间，编码器会缓存前 4 个 chunk 的表征，让当前 chunk 能 attend 到有限的左侧上下文，同时避免对更早音频做冗余计算。"
      },
      {
       "id": "s-2-4-1-3-4",
       "original": "This design follows a cache-aware streaming strategy in which intermediate representations are reused across chunks rather than recomputed (Noroozi et al., 2024).",
       "zh": "这一设计遵循「缓存感知」的流式策略：中间表征在 chunk 之间复用，而不是重复计算（Noroozi et al., 2024）。"
      },
      {
       "id": "s-2-4-1-3-5",
       "original": "Meanwhile, the speech embeddings are incrementally accumulated in the LLM KV cache, enabling transcription hypotheses to be refreshed without re-prefilling the complete audio history.",
       "zh": "与此同时，语音嵌入在 LLM 的 KV cache 中增量累积，转写假设无需重新预取完整音频历史就能被刷新。"
      }
     ]
    },
    {
     "id": "p-2-4-1-4",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-2-4-1-4-1",
       "original": "For streaming output, the LLM updates the partial transcription after every 640 ms speech chunk.",
       "zh": "在流式输出时，LLM 会每收到一个 640 ms 的语音 chunk 就更新一次部分转写。"
      },
      {
       "id": "s-2-4-1-4-2",
       "original": "Previously generated text is retained as a prefix, while the most recent 5 tokens can be rolled back and regenerated to correct unstable predictions near the speech chunk boundary.",
       "zh": "已生成的文本会保留为前缀，仅最近的 5 个 token 可以被回滚并重新生成，以修正语音 chunk 边界附近不稳定的预测。"
      },
      {
       "id": "s-2-4-1-4-3",
       "original": "In addition, the hypotheses generated from the first two speech chunks are treated as unstable and can be revised more aggressively, mitigating errors caused by insufficient acoustic context at the beginning of an utterance.",
       "zh": "此外，前两个语音 chunk 产生的假设被视为不稳定、可以更激进地修改——这是为了缓解句首声学上下文不足带来的错误。"
      },
      {
       "id": "s-2-4-1-4-4",
       "original": "The phoneme-level CTC head and RAG module also operate continuously during streaming inference, with newly retrieved hotwords accumulated and deduplicated throughout the utterance.",
       "zh": "流式推理期间，音素级 CTC 头和 RAG 模块也持续运行：新检索出的热词会在整句范围内累积并去重。"
      },
      {
       "id": "s-2-4-1-4-5",
       "original": "When the VAD module detects the end of speech, NIM4-ASR performs a second-pass final decoding to generate a stable final transcription.",
       "zh": "当 VAD 模块检测到语音结束时，NIM4-ASR 会执行一次 second-pass 终解，生成稳定的最终转写。"
      },
      {
       "id": "s-2-4-1-4-6",
       "original": "At this point, all speech embeddings have already been prefetched and retained in the LLM KV cache.",
       "zh": "此时所有语音嵌入都已预取并保存在 LLM 的 KV cache 中。"
      },
      {
       "id": "s-2-4-1-4-7",
       "original": "Therefore, only the complete decoding instruction and the accumulated hotword context need to be appended before final decoding, allowing the second pass to start immediately with minimal additional prefill overhead.",
       "zh": "因此终解前只需追加完整的解码指令和累计的热词上下文，的第二次解码几乎无需额外预取即可立即开始。"
      },
      {
       "id": "s-2-4-1-4-8",
       "original": "This design enables a low time-to-first-token (TTFT) through streaming hypothesis refresh while also reducing tail latency in second-pass final decoding, thereby ensuring both responsive streaming output and a stable final transcription.",
       "zh": "这一设计通过流式假设刷新压低了 TTFT（首 token 时间），同时降低了 second-pass 终解的尾延迟，从而兼顾「响应快的流式输出」与「稳定的最终转写」。"
      },
      {
       "id": "s-2-4-1-4-9",
       "original": "For offline inference, the complete audio is processed once by the encoder using the maximum chunk size, followed by a single-pass LLM decoding.",
       "zh": "对离线推理而言，完整音频会以最大 chunk 大小被编码器一次性处理，之后由单次 LLM 解码完成。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-2-4-2",
   "num": "2.4.2",
   "level": 2,
   "page": 9,
   "title": {
    "original": "Phoneme-based RAG for Hotword Customization",
    "zh": "基于音素的 RAG 热词定制"
   },
   "blocks": [
    {
     "id": "p-2-4-2-1",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-2-4-2-1-1",
       "original": "To enable efficient hotword customization, NIM4-ASR builds a phoneme-based hotword database with a corresponding retrieval algorithm, as illustrated in Figure 1.",
       "zh": "为了支持高效的热词定制，NIM4-ASR 构建了一个基于音素的热词库及配套检索算法（如图 1 所示）。"
      },
      {
       "id": "s-2-4-2-1-2",
       "original": "Following prior work (An et al., 2025), we preconvert each hotword text into a phoneme-token sequence and store it as a key-value pair, where the key is the phoneme sequence and the value is the corresponding hotword text.",
       "zh": "沿用先前工作（An et al., 2025），我们将每个热词文本预先转成音素 token 序列，并以「键-值对」存储：键是音素序列，值是对应的热词文本。"
      },
      {
       "id": "s-2-4-2-1-3",
       "original": "These phoneme sequences are first converted into discrete indices based on the phoneme vocabulary, and then restructured into a trie augmented with failure links using the Aho-Corasick automaton (Aho and Corasick, 1975) algorithm.",
       "zh": "这些音素序列首先按音素词表转成离散索引，再通过 Aho-Corasick 自动机（Aho and Corasick, 1975）重构成带失败链的 trie。"
      },
      {
       "id": "s-2-4-2-1-4",
       "original": "During streaming inference, the phoneme head attached to the encoder continuously generates phoneme hypotheses from newly arrived audio chunks.",
       "zh": "流式推理时，挂在编码器上的音素头持续从新到来的音频 chunk 产出音素假设。"
      },
      {
       "id": "s-2-4-2-1-5",
       "original": "The hypotheses are converted into index sequences and scanned by the automaton incrementally, while newly retrieved 2https://github.com/triton-inference-server/server 3https://github.com/vllm-project/vllm hotwords are accumulated throughout the utterance and made available to subsequent decoding steps.",
       "zh": "这些假设被转成索引序列，由自动机增量扫描；新检索到的热词（脚注 2、3 分别对应 Triton Inference Server 与 vLLM 的开源地址）会在整句范围内累积，供后续解码步骤使用。"
      },
      {
       "id": "s-2-4-2-1-6",
       "original": "For offline inference, the same retrieval procedure is applied once to the phoneme hypothesis of the complete utterance.",
       "zh": "离线推理时，对整句的音素假设执行一次同样的检索流程即可。"
      },
      {
       "id": "s-2-4-2-1-7",
       "original": "When a partial match cannot be extended, the automaton follows the failure link to the longest valid suffix state instead of restarting the search from scratch, enabling all candidate hotwords to be retrieved with linear-time complexity in the hypothesis length.",
       "zh": "当部分匹配无法继续延伸时，自动机会沿失败链跳到「最长有效后缀状态」，而不是从头重新开始搜索——这让所有候选热词都能以关于假设长度的线性时间复杂度被检索出来。"
      }
     ]
    },
    {
     "id": "p-2-4-2-2",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-2-4-2-2-1",
       "original": "To reduce redundant contextual hints, we apply a longest-match filtering strategy: shorter matches fully covered by longer spans are discarded, retaining only the longest entity.",
       "zh": "为了减少冗余的上下文提示，我们采用「最长匹配过滤」策略：完全被更长区间覆盖的较短匹配会被丢弃，只保留最长实体。"
      },
      {
       "id": "s-2-4-2-2-2",
       "original": "For example, if both the hotwords “NIO” and “NIO House” are matched in the same hypothesis, only “NIO House” is retained.",
       "zh": "举例：如果同一假设中同时命中热词「NIO」和「NIO House」，则只保留「NIO House」。"
      },
      {
       "id": "s-2-4-2-2-3",
       "original": "The retrieved hotword texts are then concatenated and injected into the LLM prompt as contextual hints together with the speech embeddings, providing context-aware biasing for decoding.",
       "zh": "检索出的热词文本会被拼接，并随语音嵌入一起注入 LLM 的 prompt，为解码提供上下文偏置。"
      },
      {
       "id": "s-2-4-2-2-4",
       "original": "Owing to the storage efficiency of index-level mapping and the linear-time complexity of the Aho-Corasick automaton that depends only on query length rather than database size, the hotword database can easily scale to millions of entries while maintaining sub-millisecond retrieval latency per query.",
       "zh": "得益于索引级映射的存储效率，以及 Aho-Corasick 自动机仅依赖查询长度、与库大小无关的线性时间复杂度，热词库可以轻松扩展到百万级，同时保持亚毫秒级的单次检索延迟。"
      }
     ]
    },
    {
     "id": "p-2-4-2-3",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-2-4-2-3-1",
       "original": "It is worth noting that our hotword customization is designed to optimize the recognition of named entities such as location names and media titles, where the hotword database can be large and may contain numerous phonetically similar or even homophonous entries.",
       "zh": "值得注意的是，我们的热词定制专门用于优化命名实体（如地名、媒体标题等）的识别——在这类场景里，热词库可能很大，且会包含大量发音相近甚至同音的条目。"
      },
      {
       "id": "s-2-4-2-3-2",
       "original": "To ensure retrieval precision under such large-scale settings, we adopt a hard-matching strategy in the RAG module, retrieving only exact phoneme-sequence matches rather than approximate ones or those with minimal edit distance.",
       "zh": "为了在这种大规模场景下保证检索精度，我们在 RAG 模块中采用硬匹配策略：只检索音素序列完全一致的条目，不做近似匹配或最小编辑距离匹配。"
      },
      {
       "id": "s-2-4-2-3-3",
       "original": "Empirically, retrieval misses are often less harmful than retrieval errors, since the LLM can still recover the correct entity from internal linguistic knowledge and context.",
       "zh": "经验上，检索漏掉的危害往往小于检索错误的危害——因为在没有命中热词时，LLM 仍能凭借自身的语言知识和上下文恢复出正确实体。"
      },
      {
       "id": "s-2-4-2-3-4",
       "original": "By contrast, soft matching is more prone to introducing similar but incorrect hotwords, which can interfere with decoding even if the model is robust to noisy contextual hints to some extent.",
       "zh": "相比之下，软匹配更容易引入「相似但不正确」的热词，即使模型对带噪上下文提示有一定鲁棒性，这类错误提示仍可能干扰解码。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-3",
   "num": "3",
   "level": 1,
   "page": 10,
   "title": {
    "original": "Evaluation",
    "zh": "评测"
   },
   "blocks": []
  },
  {
   "id": "sec-3-1",
   "num": "3.1",
   "level": 2,
   "page": 10,
   "title": {
    "original": "Evaluation Setup",
    "zh": "评测设置"
   },
   "blocks": [
    {
     "id": "p-3-1-1",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-3-1-1-1",
       "original": "We evaluate NIM4-ASR on both public benchmarks and internal benchmarks to assess its performance across diverse domains.",
       "zh": "我们在公开基准和内部基准上同时评估 NIM4-ASR，检验其在不同领域的表现。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-baseline-systems",
   "num": null,
   "level": 2,
   "page": 10,
   "title": {
    "original": "Baseline Systems.",
    "zh": "基线系统"
   },
   "blocks": [
    {
     "id": "p-baseline-systems-1",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-baseline-systems-1-1",
       "original": "We compare NIM4-ASR with several recent representative open-source LLM- based ASR models, including Fun-ASR-Nano (An et al., 2025), GLM-ASR-Nano4, Qwen3-ASR- 1.7B (Shi et al., 2026), and FireRedASR2S-LLM (Xu et al., 2026).",
       "zh": "我们将 NIM4-ASR 与几个近期有代表性的开源 LLM 语音模型对比：Fun-ASR-Nano（An et al., 2025）、GLM-ASR-Nano（脚注 4）、Qwen3-ASR-1.7B（Shi et al., 2026）以及 FireRedASR2S-LLM（Xu et al., 2026）。"
      },
      {
       "id": "s-baseline-systems-1-2",
       "original": "In addition, we also compare NIM4-ASR against large audio language models (LALMs) and multimodal LLMs with strong ASR capabilities, including Step-Audio2-Mini (Wu et al., 2025) and Qwen3-Omni-Instruct (Xu et al., 2025a).",
       "zh": "此外，我们还对比了具备较强 ASR 能力的大型音频语言模型（LALM）和多模态 LLM，包括 Step-Audio2-Mini（Wu et al., 2025）与 Qwen3-Omni-Instruct（Xu et al., 2025a）。（原文 Step-Audio2-Mini 后的「2025a」实为 PDF 脚注 4 编号被抽取器并入正文所致。）"
      },
      {
       "id": "s-baseline-systems-1-3",
       "original": "While Fun-ASR, Qwen3-ASR and Qwen3-Omni support streaming inference, all baselines are evaluated in the offline setting for fair comparison.",
       "zh": "虽然 Fun-ASR、Qwen3-ASR 和 Qwen3-Omni 都支持流式推理，但为了公平比较，所有基线都在离线设置下评测。"
      },
      {
       "id": "s-baseline-systems-1-4",
       "original": "For NIM4-ASR, we report results under both offline and streaming inference settings.",
       "zh": "对 NIM4-ASR，我们同时报告离线和流式两种设置下的结果。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-evaluation-metrics",
   "num": null,
   "level": 2,
   "page": 10,
   "title": {
    "original": "Evaluation Metrics.",
    "zh": "评测指标"
   },
   "blocks": [
    {
     "id": "p-evaluation-metrics-1",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-evaluation-metrics-1-1",
       "original": "We report Word Error Rate (WER) for English benchmarks, and Character Error Rate (CER) for Mandarin, Chinese dialect, lyrics, and code-switched Chinese-English benchmarks.",
       "zh": "英文基准报告词错误率（WER）；普通话、中文方言、歌词以及中英混合的基准报告字错误率（CER）。"
      },
      {
       "id": "s-evaluation-metrics-1-2",
       "original": "As our internal benchmarks mainly consist of Mandarin speech, we use CER by default for internal evaluation.",
       "zh": "由于内部基准主要是普通话语音，内部评测默认使用 CER。"
      },
      {
       "id": "s-evaluation-metrics-1-3",
       "original": "To minimize the influence of surface-level variation such as numeric expression formats and filler-word usage on evaluation statistics, we apply WeTextProcessing5, a WFST-based toolkit for text normalization.",
       "zh": "为尽量减少数字格式、填充词等表层差异对评测统计的影响，我们使用基于 WFST 的文本归一化工具 WeTextProcessing（脚注 5）。"
      },
      {
       "id": "s-evaluation-metrics-1-4",
       "original": "This process may result in relatively lower absolute error rates across models, but it enables a fairer comparison of their intrinsic recognition capabilities.",
       "zh": "这一处理可能让各模型的绝对错误率整体略低，但能更公平地比较模型本身的识别能力。"
      },
      {
       "id": "s-evaluation-metrics-1-5",
       "original": "All baselines are reproduced following the official guidelines, and all transcriptions are normalized with the same pipeline to ensure consistent cross-system evaluation.",
       "zh": "所有基线均按其官方指南复现，所有转写也都走同一条归一化流水线，以保证跨系统评测的一致性。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-public-benchmarks",
   "num": null,
   "level": 2,
   "page": 10,
   "title": {
    "original": "Public Benchmarks.",
    "zh": "公开基准"
   },
   "blocks": [
    {
     "id": "p-public-benchmarks-1",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-public-benchmarks-1-1",
       "original": "Public evaluation datasets cover a wide range of speech recognition scenarios.",
       "zh": "公开评测集覆盖了广泛的语音识别场景。"
      },
      {
       "id": "s-public-benchmarks-1-2",
       "original": "English benchmarks include LibriSpeech (Panayotov et al., 2015), VoxPopuli (Wang et al., 2021), and MLS-English (Pratap et al., 2020).",
       "zh": "英文基准包括 LibriSpeech（Panayotov et al., 2015）、VoxPopuli（Wang et al., 2021）和 MLS-English（Pratap et al., 2020）。"
      },
      {
       "id": "s-public-benchmarks-1-3",
       "original": "Mandarin benchmarks include AISHELL-1 (Bu et al., 2017), AISHELL-2 (Du et al., 2018), AISHELL-2021-Eval6, WeNetSpeech (Zhang et al., 4https://huggingface.co/zai-org/GLM-ASR-Nano-2512 5https://github.com/wenet-e2e/WeTextProcessing 6https://aishelltech.com/aishell_2021_eval 2022a), and SpeechIO7.",
       "zh": "普通话基准包括 AISHELL-1（Bu et al., 2017）、AISHELL-2（Du et al., 2018）、AISHELL-2021-Eval、WeNetSpeech（Zhang et al., 2022a）和 SpeechIO。（此处原文嵌入了脚注 4：https://huggingface.co/zai-org/GLM-ASR-Nano-2512、脚注 5：https://github.com/wenet-e2e/WeTextProcessing、脚注 6：https://aishelltech.com/aishell_2021_eval；另有脚注 7 标注 SpeechIO 的榜单地址。）"
      },
      {
       "id": "s-public-benchmarks-1-4",
       "original": "Chinese dialect evaluation includes WeNetSpeech-Chuan (Dai et al., 2025), WeNetSpeech-Yue (Li et al., 2025), and KeSpeech (Tang et al., 2021).",
       "zh": "中文方言评测包括 WeNetSpeech-Chuan（Dai et al., 2025）、WeNetSpeech-Yue（Li et al., 2025）和 KeSpeech（Tang et al., 2021）。"
      },
      {
       "id": "s-public-benchmarks-1-5",
       "original": "Additional challenging benchmarks include Mandarin-English code-switching speech from CS-Dialogue (Zhou et al., 2025) and ASCEND (Lovenia et al., 2022), as well as lyric transcription on M4Singer (Zhang et al., 2022b).",
       "zh": "其他更具挑战性的基准包括 CS-Dialogue（Zhou et al., 2025）和 ASCEND（Lovenia et al., 2022）的中英混合语音，以及 M4Singer（Zhang et al., 2022b）的歌词转写。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-internal-benchmarks",
   "num": null,
   "level": 2,
   "page": 11,
   "title": {
    "original": "Internal Benchmarks.",
    "zh": "内部基准"
   },
   "blocks": [
    {
     "id": "p-internal-benchmarks-1",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-internal-benchmarks-1-1",
       "original": "We further evaluate on a collection of internal benchmarks focused on realistic in-car spontaneous speech scenarios—a setting that differs markedly from conventional read-speech or conference-style corpora.",
       "zh": "我们还在一组内部基准上做了评估，主要面向真实的车载自发语音场景——这一设定与传统朗读式或会议风格的语料有显著差别。"
      },
      {
       "id": "s-internal-benchmarks-1-2",
       "original": "These benchmarks mainly comprise instructional and conversational utterances that reflect real-world user interaction patterns, offering a more practical measure of ASR reliability in diverse in-car scenarios.",
       "zh": "这些基准主要由指令式与对话式语句构成，反映真实用户的交互模式，能更实际地衡量 ASR 在多样车载场景中的可靠性。"
      },
      {
       "id": "s-internal-benchmarks-1-3",
       "original": "All data were created by designing utterances grounded in real-world cockpit scenarios, and then collected through crowdsourced speaker recording.",
       "zh": "所有数据的构造方式是：先基于真实座舱场景设计语句，再通过众包说话人录音采集。"
      }
     ]
    },
    {
     "id": "p-internal-benchmarks-2",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-internal-benchmarks-2-1",
       "original": "• Point of Interest (POI) data contains city-level POIs, which are derived from location names across different cities. • Media data involves media-related entities, including music titles, video titles, and radio program names. • Device Control data contains in-car control commands, such as vehicle setting adjustments and cockpit operation instructions. • Conversational data includes two categories of conversational interactions: (1) Vehicle-domain chat data focuses on vehicle-related conversations such as in-car knowledge queries and assistant interactions; (2) Multi-domain chat data covers open-domain conversational queries across diverse domains including media, sports, healthcare, history, arts, literature, ecology, tourism, technology, science, culture, education, finance and entertainment.",
       "zh": "• POI（兴趣点）数据包含城市级 POI，来源于不同城市的地名。 • Media 数据涉及媒体相关实体，包括音乐、视频、广播节目名称。 • Device Control 数据包含车内控制指令，如车辆设置调整、座舱操作。 • Conversational 数据分两类：(1) 车域闲聊数据，聚焦车载知识问答、语音助手交互；(2) 多领域闲聊数据，覆盖媒体、体育、医疗、历史、艺术、文学、生态、旅游、科技、科学、文化、教育、金融和娱乐等开放领域的对话查询。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-3-2",
   "num": "3.2",
   "level": 2,
   "page": 11,
   "title": {
    "original": "Evaluation Results",
    "zh": "评测结果"
   },
   "blocks": []
  },
  {
   "id": "sec-3-2-1",
   "num": "3.2.1",
   "level": 2,
   "page": 11,
   "title": {
    "original": "Public Benchmarks",
    "zh": "公开基准结果"
   },
   "blocks": [
    {
     "id": "tab-3-2-1-1",
     "type": "table_caption",
     "page": 11,
     "original": "Table 2 reports the comparison results on public benchmarks. For NIM4-ASR, we report both offline and streaming inference results. The offline setting reflects the upper-bound performance when full acoustic context is available, while the streaming setting evaluates real-time recognition.",
     "zh": "Table 2 报告了公开基准上的对比结果。对 NIM4-ASR，我们同时汇报离线和流式两种推理设置：离线代表在有完整声学上下文时的性能上限，流式则反映实时识别能力。"
    },
    {
     "id": "p-3-2-1-1",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-3-2-1-1-1",
       "original": "Overall, NIM4-ASR shows strong competitiveness in the offline setting.",
       "zh": "总体而言，NIM4-ASR 在离线设置下表现非常有竞争力。"
      },
      {
       "id": "s-3-2-1-1-2",
       "original": "It consistently outperforms baselines with smaller model sizes and achieves comparable or superior results against systems with more than 8B parameters.",
       "zh": "它稳定优于同等或更小规模的基线，并且在与参数量超过 8B 的系统对比时也能取得可比甚至更优的结果。"
      },
      {
       "id": "s-3-2-1-1-3",
       "original": "Across open-source benchmarks, NIM4-ASR delivers robust performance on Mandarin, dialectal speech, English, and code-switching.",
       "zh": "在开源基准上，NIM4-ASR 在普通话、方言、英文和中英混合上都有稳健表现。"
      },
      {
       "id": "s-3-2-1-1-4",
       "original": "The main exception is meeting-style benchmarks, such as WeNetSpeech Meeting, where it performs slightly worse than competing models.",
       "zh": "主要的例外是会议类基准，例如 WeNetSpeech Meeting，在这些集合上它略逊于部分竞品。"
      },
      {
       "id": "s-3-2-1-1-5",
       "original": "This behavior is expected because NIM4-ASR is primarily optimized for streaming speech interaction scenarios that require low-latency responses to short and medium-length utterances.",
       "zh": "这符合预期：NIM4-ASR 的主要优化目标是流式语音交互场景——对短到中等长度的语句做低延迟响应。"
      },
      {
       "id": "s-3-2-1-1-6",
       "original": "In contrast, longform meeting transcription lies outside the primary design scope of the system and is correspondingly less represented in the training data.",
       "zh": "相比之下，长音频会议转写本就不在系统的主设计目标之内，在训练数据中的占比也相应较低。"
      }
     ]
    },
    {
     "id": "p-3-2-1-2",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-3-2-1-2-1",
       "original": "Beyond the offline comparison, we find that NIM4-ASR also achieves satisfactory performance in the streaming mode, with only limited degradation relative to offline decoding.",
       "zh": "除离线对比外，我们还发现 NIM4-ASR 在流式模式下也能达到令人满意的表现，与离线解码相比退化有限。"
      },
      {
       "id": "s-3-2-1-2-2",
       "original": "This can be attributed to two factors: first, the strict local alignment induced by CTC helps maintain stable acoustic representations under chunk-wise streaming inference; second, our dynamic chunk size and context length streaming training strategy enables the model to make robust predictions even with constrained acoustic context.",
       "zh": "这可以归因于两个因素：第一，CTC 带来的严格局部对齐让分块流式推理下的声学表征保持稳定；第二，我们的动态 chunk 大小与上下文长度流式训练策略，让模型在声学上下文受限时仍能做出稳健预测。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-3-2-2",
   "num": "3.2.2",
   "level": 2,
   "page": 11,
   "title": {
    "original": "Internal Benchmarks",
    "zh": "内部基准结果"
   },
   "blocks": [
    {
     "id": "tab-3-2-2-1",
     "type": "table_caption",
     "page": 11,
     "original": "Table 3 reports results on our internal benchmarks. Two benchmarks, POI and Media, are entityintensive, comprising dense location names and media-related entities respectively. A key challenge in these domains is that many entities share similar or identical pronunciations, requiring the model to simultaneously resolve subtle acoustic differences and leverage contextual semantics to disambiguate competing candidates. NIM4-ASR achieves particularly strong performance on these benchmarks, driven primarily by comprehensive in-domain training data coverage, but also indicating that our",
     "zh": "Table 3 报告内部基准上的结果。POI 与 Media 两个基准属于实体密集型，分别包含密集的地名和媒体相关实体。这些领域的关键挑战是许多实体发音相近甚至相同，模型需要同时分辨细微的声学差异并利用上下文语义来消解候选竞争。NIM4-ASR 在这两个基准上表现尤为突出，这主要得益于其充分的 in-domain 训练数据覆盖，但同时也表明我们的……（转下页）"
    },
    {
     "id": "p-3-2-2-1",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-3-2-2-1-1",
       "original": "7https://github.com/SpeechColab/Leaderboard",
       "zh": "（脚注 7：SpeechIO 榜单项目地址）"
      }
     ]
    },
    {
     "id": "tab-3-2-2-2",
     "type": "table_caption",
     "page": 12,
     "original": "Table 2: Comparison with recent advanced baselines on public benchmarks. All baseline systems are evaluated in offline mode. “N/A” denotes that a reliable result cannot be obtained under the official inference interface.",
     "zh": "Table 2：与近期先进基线在公开基准上的对比。所有基线均在离线模式下评测。「N/A」表示在官方推理接口下无法得到可靠结果。"
    },
    {
     "id": "p-3-2-2-2",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-3-2-2-2-1",
       "original": "Fun-ASR GLM-ASR Qwen3-ASR FireRedASR2S Step-Audio2 Qwen3-Omni NIM4-ASR LLM Mini Instruct Stream Model Size 30B-A3B Mandarin AISHELL-1 dev | test AISHELL-2-ios dev | test AISHELL-2021-Eval A | C | D WeNetSpeech meeting | net SpeechIO 2.78 3.17 2.55 2.20 3.41 2.33 2.61 2.84 Chinese Dialect WeNetSpeech-Chuan easy | hard WeNetSpeech-Yue short | long KeSpeech 7.18 9.59 4.98 3.05 3.98 6.00 4.40 5.08 English LibriSpeech-dev clean | other LibriSpeech-test clean | other VoxPopuli dev | test MLS-English 6.80 5.32 4.93 4.71 4.37 4.04 4.77 5.04 Mandarin-English Code-switch CS-Dialogue 5.37 6.15 5.44 4.63 9.46 8.51 4.70 4.91 ASCEND 11.91 12.29 10.87 10.22 13.50 18.68 11.46 11.85 Lyrics M4Singer 5.25 18.45 5.72 N/A 9.68 8.40 6.39 6.94 NIM4-ASR offline vs. Baselines Win : Lose - -",
       "zh": "（Table 2 数据碎块，列依次为 Fun-ASR、GLM-ASR、Qwen3-ASR、FireRedASR2S、Step-Audio2-Mini、Qwen3-Omni-Instruct 与 NIM4-ASR；模型规模一栏含 30B-A3B。）普通话：AISHELL-1 dev|test、AISHELL-2-ios dev|test、AISHELL-2021-Eval A|C|D、WeNetSpeech meeting|net、SpeechIO 各列数值为 2.78、3.17、2.55、2.20、3.41、2.33、2.61、2.84；中文方言：WeNetSpeech-Chuan easy|hard、WeNetSpeech-Yue short|long、KeSpeech 为 7.18、9.59、4.98、3.05、3.98、6.00、4.40、5.08；英文：LibriSpeech-dev clean|other、LibriSpeech-test clean|other、VoxPopuli dev|test、MLS-English 为 6.80、5.32、4.93、4.71、4.37、4.04、4.77、5.04；中英混合：CS-Dialogue 为 5.37、6.15、5.44、4.63、9.46、8.51、4.70、4.91，ASCEND 为 11.91、12.29、10.87、10.22、13.50、18.68、11.46、11.85；歌词：M4Singer 为 5.25、18.45、5.72、N/A、9.68、8.40、6.39、6.94；表末为 NIM4-ASR 离线模式相对各基线的 Win : Lose 统计（- -）。"
      }
     ]
    },
    {
     "id": "tab-3-2-2-3",
     "type": "table_caption",
     "page": 12,
     "original": "Table 3: Comparison with recent advanced baselines on internal benchmarks. All baseline systems are evaluated in offline mode. NIM4-ASR demonstrates consistent performance advantages on most internal benchmarks, as the evaluated content largely consists of long-tail named entities that open-source models rarely encounter during training.",
     "zh": "Table 3：与近期先进基线在内部基准上的对比。所有基线均在离线模式下评测。NIM4-ASR 在多数内部基准上展现出一致的性能优势，因为评测内容大量由开源模型在训练中几乎见不到的长尾命名实体构成。"
    },
    {
     "id": "p-3-2-2-3",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-3-2-2-3-1",
       "original": "Fun-ASR GLM-ASR Qwen3-ASR FireRedASR2S Step-Audio2 Qwen3-Omni NIM4-ASR LLM Mini Instruct Stream Model Size 30B-A3B Point of Interest (POI) City A 7.07 14.68 9.14 8.54 9.41 9.67 3.86 3.85 City B 8.50 15.75 10.59 10.43 11.67 11.73 4.86 4.94 City C 7.60 17.55 10.01 10.17 11.35 12.18 3.77 3.81 City D 7.42 17.91 9.77 9.51 11.55 10.86 4.10 4.17 Media Music 12.60 24.25 12.67 12.13 14.94 15.89 5.75 5.78 Video 8.27 20.35 9.69 9.38 12.30 15.33 2.99 3.03 Radio 13.69 19.82 10.51 11.84 14.21 17.91 1.21 1.17 Device Control Vehicle control 4.74 8.78 5.31 4.52 4.97 4.18 1.88 1.78 Conversational Vehicle-domain chat easy | hard Multi-domain chat 1.65 1.89 1.33 1.27 1.49 5.34 1.55 1.75 training strategy effectively preserves both the encoder’s fine-grained acoustic discriminability and the LLM’s capacity for context-driven entity resolution.",
       "zh": "（Table 3 数据碎块，列依次为 Fun-ASR、GLM-ASR、Qwen3-ASR、FireRedASR2S、Step-Audio2-Mini、Qwen3-Omni-Instruct 与 NIM4-ASR；模型规模一栏含 30B-A3B。）POI：City A 为 7.07、14.68、9.14、8.54、9.41、9.67、3.86、3.85，City B 为 8.50、15.75、10.59、10.43、11.67、11.73、4.86、4.94，City C 为 7.60、17.55、10.01、10.17、11.35、12.18、3.77、3.81，City D 为 7.42、17.91、9.77、9.51、11.55、10.86、4.10、4.17；Media：Music 为 12.60、24.25、12.67、12.13、14.94、15.89、5.75、5.78，Video 为 8.27、20.35、9.69、9.38、12.30、15.33、2.99、3.03（碎块中混入了正文残句「……有效保持了编码器的细粒度声学判别……」），Radio 为 13.69、19.82、10.51、11.84、14.21、17.91、1.21、1.17；Device Control：车控为 4.74、8.78、5.31、4.52、4.97、4.18、1.88、1.78；Conversational：车域闲聊 easy|hard 与多域闲聊为 1.65、1.89、1.33、1.27、1.49、5.34、1.55、1.75。上述训练策略有效保住了编码器的细粒度声学判别能力和 LLM 的上下文实体消解能力。"
      }
     ]
    },
    {
     "id": "p-3-2-2-4",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-3-2-2-4-1",
       "original": "Furthermore, NIM4-ASR also delivers clear improvements on both the vehicle control and vehicledomain chat benchmarks.",
       "zh": "此外，NIM4-ASR 在车控与车域闲聊两个基准上也都带来了显著提升。"
      },
      {
       "id": "s-3-2-2-4-2",
       "original": "We attribute this gap primarily to the long-tailed nature of domain knowledge and terminology in general-purpose foundation models.",
       "zh": "我们认为这一差距主要来自通用基础模型在领域知识和术语上的长尾短板。"
      },
      {
       "id": "s-3-2-2-4-3",
       "original": "By substantially increasing indomain data coverage, NIM4-ASR achieves more reliable recognition of vehicle control commands and in-car assistant knowledge, thereby delivering a superior interaction experience within the vehicle cockpit.",
       "zh": "通过显著提升 in-domain 数据覆盖，NIM4-ASR 在车控指令和车载助手知识上做到了更可靠的识别，进而在座舱交互中提供更优体验。"
      },
      {
       "id": "s-3-2-2-4-4",
       "original": "By contrast, on the multi-domain chat benchmark, spanning open-domain topics without vehicle-specific content, NIM4-ASR no longer leads but remains competitive.",
       "zh": "相比之下，在跨开放领域、无车控内容的多领域闲聊基准上，NIM4-ASR 不再领先，但仍保持竞争力。"
      },
      {
       "id": "s-3-2-2-4-5",
       "original": "This demonstrates the model’s strong generalization ability: despite limited training data coverage in domains such as sports, healthcare, and finance, NIM4-ASR still maintains robust performance, indicating that its gains are not solely driven by domain-specific data expansion.",
       "zh": "这反映了模型较强的泛化能力：尽管在体育、医疗、金融等领域训练数据覆盖有限，NIM4-ASR 仍保持了稳健表现——说明它的收益并非单纯来自领域数据扩充。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-3-2-3",
   "num": "3.2.3",
   "level": 2,
   "page": 13,
   "title": {
    "original": "Effectiveness of Hotword Customization",
    "zh": "热词定制的有效性"
   },
   "blocks": [
    {
     "id": "tab-3-2-3-1",
     "type": "table_caption",
     "page": 13,
     "original": "Table 4: Effectiveness of phoneme-based hotword RAG on internal entity-intensive POI benchmarks. Recall here refers to the proportion of POI entities correctly recognized in the transcription output.",
     "zh": "Table 4：基于音素的热词 RAG 在内部实体密集型 POI 基准上的有效性。Recall 指转写输出中被正确识别的 POI 实体所占比例。"
    },
    {
     "id": "p-3-2-3-1",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-3-2-3-1-1",
       "original": "Streaming+RAG CER / Recall CER / Recall City A POI City B POI Beyond its strong fundamental recognition capability, NIM4-ASR also provides an effective hotword customization mechanism.",
       "zh": "（Table 4 数据碎块）流式 + RAG 设置在 City A 与 City B 内部 POI 基准上的 CER / Recall 对比。除了强大的基础识别能力之外，NIM4-ASR 还提供了一套有效的热词定制机制。"
      },
      {
       "id": "s-3-2-3-1-2",
       "original": "Through contextual hotword conditioning, NIM4-ASR can improve recognition accuracy for acoustically similar entity names, domain-specific terminology, and newly emerging expressions.",
       "zh": "通过上下文热词条件化，NIM4-ASR 能提升对「声学相近的实体名、领域术语、新兴表达」的识别准确率。"
      },
      {
       "id": "s-3-2-3-1-3",
       "original": "To evaluate the effectiveness of the proposed hotword RAG mechanism, we focus on entity-intensive POI recognition scenarios, selecting benchmarks from two major cities and constructing city-specific retrieval databases, each comprising millions of location name–phoneme pairs.",
       "zh": "为评估所提热词 RAG 机制的有效性，我们选择实体密集的 POI 识别场景：从两个主要城市抽取基准，并为每个城市构建各自的城市级检索库——每个库包含数百万条「地名–音素」对。"
      },
      {
       "id": "s-3-2-3-1-4",
       "original": "As shown in Table 4, incorporating hotword context consistently improves streaming performance, demonstrating the effectiveness of our phoneme-based RAG retrieval mechanism and its practical benefit in entity-intensive recognition scenarios.",
       "zh": "如 Table 4 所示，引入热词上下文能稳定提升流式性能，验证了基于音素的 RAG 检索机制的有效性，及其在实体密集识别场景中的实际价值。"
      }
     ]
    },
    {
     "id": "p-3-2-3-2",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-3-2-3-2-1",
       "original": "It is worth noting that, unlike previous work, we adopt exact matching rather than edit distance for retrieval.",
       "zh": "值得注意的是，与先前工作不同，我们在检索时采用完全匹配而非编辑距离。"
      },
      {
       "id": "s-3-2-3-2-2",
       "original": "We argue that for the RAG module in LLM-based ASR systems, retrieval precision is more critical than recall, as the model’s strong inherent recognition capability already serves as a reliable fallback when no hotword is retrieved.",
       "zh": "我们认为，对 LLM 语音模型中的 RAG 模块而言，检索精度比召回更关键——因为在没有热词命中时，模型本身的强识别能力足以作为可靠的兜底。"
      },
      {
       "id": "s-3-2-3-2-3",
       "original": "Moreover, pairing exact matching with the Aho-Corasick algorithm allows the hotword database to scale to millions of entries without additional retrieval overhead, avoiding the latency and precision degradation that typically follows vocabulary expansion.",
       "zh": "此外，将完全匹配与 Aho-Corasick 算法结合，可以让热词库扩展到百万级而不引入额外检索开销，避免词表扩张通常带来的延迟上升与精度下降。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-3-2-4",
   "num": "3.2.4",
   "level": 2,
   "page": 13,
   "title": {
    "original": "Effectiveness on Hallucination Mitigation",
    "zh": "幻觉抑制的效果"
   },
   "blocks": [
    {
     "id": "tab-3-2-4-1",
     "type": "table_caption",
     "page": 13,
     "original": "Table 5: Hallucination rate on different benchmark scenarios. “w/o RL” and “w/ RL” denote model after joint SFT and after the subsequent RL stage, respectively. For fair comparison, reported results for NIM4-ASR are obtained under offline inference.",
     "zh": "Table 5：不同基准场景下的幻觉率。「w/o RL」与「w/ RL」分别指联合 SFT 之后的模型、以及再经过 RL 阶段之后的模型。为公平比较，NIM4-ASR 的报告结果均为离线推理获得。"
    },
    {
     "id": "p-3-2-4-1",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-3-2-4-1-1",
       "original": "Model Mandarin Dialect English Code-switch Lyrics Fun-ASR-nano GLM-ASR-nano Qwen3-ASR-1.7B FireRedASR2S-LLM Step-Audio2-mini Qwen3-Omni-Inst NIM4-ASR (offline w/o RL) NIM4-ASR (offline w/ RL) Beyond recognition performance, NIM4-ASR demonstrates strong hallucination suppression.",
       "zh": "（Table 5 数据碎块）按行分别给出 Fun-ASR-nano、GLM-ASR-nano、Qwen3-ASR-1.7B、FireRedASR2S-LLM、Step-Audio2-mini、Qwen3-Omni-Inst、NIM4-ASR（offline w/o RL）、NIM4-ASR（offline w/ RL）在普通话、方言、英文、中英混合、歌词五个场景上的幻觉率。除识别性能之外，NIM4-ASR 也展现出很强的幻觉抑制能力。"
      },
      {
       "id": "s-3-2-4-1-2",
       "original": "We compare all baseline models and NIM4-ASR in terms of hallucination rate across five distinct scenarios, where the rate for each scenario is defined as the ratio of hallucinated samples to total samples aggregated over all benchmarks within that scenario.",
       "zh": "我们在五个不同场景下比较了所有基线模型和 NIM4-ASR 的幻觉率；每个场景的幻觉率定义为该场景下所有基准中「幻觉样本数 / 总样本数」的比值。"
      },
      {
       "id": "s-3-2-4-1-3",
       "original": "Specifically, a sample is classified as hallucinated if its transcription exceeds the ground-truth length by over 50% with negligible lexical overlap.",
       "zh": "具体来说，一个样本若转写长度超过参考文本 50% 以上且几乎没有词面重叠，就被判定为幻觉样本。"
      },
      {
       "id": "s-3-2-4-1-4",
       "original": "Notably, we exclude three benchmarks: WeNetSpeech Meeting, SpeechIO, and MLS-English from this evaluation, as no hallucinated samples are observed across any model; we additionally exclude WeNetSpeech Net, as its prevalence of unreliably annotated short samples inflates hallucination rates across all models.",
       "zh": "值得一提的是，我们剔除了三个基准：WeNetSpeech Meeting、SpeechIO 和 MLS-English——因为所有模型在这三个基准上都没有出现幻觉样本；此外我们还剔除了 WeNetSpeech Net，因为其中大量短样本的标注不可靠，会让所有模型的幻觉率被普遍抬高。"
      }
     ]
    },
    {
     "id": "p-3-2-4-2",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-3-2-4-2-1",
       "original": "As shown in Table 5, NIM4-ASR achieves substantially lower hallucination rates compared to all baseline models.",
       "zh": "如 Table 5 所示，与所有基线模型相比，NIM4-ASR 的幻觉率明显更低。"
      },
      {
       "id": "s-3-2-4-2-2",
       "original": "Attributed to our training paradigm design and noise data augmentation, the model after joint SFT already exhibits a low hallucination rate: only marginally above the bestperforming baseline on Dialect and Lyrics benchmarks.",
       "zh": "得益于我们的训练范式设计与噪声数据增强，仅经过联合 SFT 的模型幻觉率就已经很低：在方言和歌词基准上仅略高于表现最好的基线。"
      },
      {
       "id": "s-3-2-4-2-3",
       "original": "After the RL stage, the hallucination rate is further reduced, achieving the lowest average across all five scenarios; most notably, on Mandarin benchmarks, NIM4-ASR attains a hallucination rate of 0.002%, substantially below all baselines.",
       "zh": "经过 RL 阶段后，幻觉率进一步下降，在五个场景的平均值最低；最值得注意的是，在普通话基准上 NIM4-ASR 的幻觉率达到 0.002%，远低于所有基线。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-3-2-5",
   "num": "3.2.5",
   "level": 2,
   "page": 14,
   "title": {
    "original": "Effectiveness of RL",
    "zh": "RL 阶段的收益"
   },
   "blocks": [
    {
     "id": "tab-3-2-5-1",
     "type": "table_caption",
     "page": 14,
     "original": "Table 6: Effectiveness of the RL stage under different inference settings. “w/o RL” and “w/ RL” correspond to the model after joint SFT and after the RL stage, respectively.",
     "zh": "Table 6：不同推理设置下 RL 阶段的收益。「w/o RL」与「w/ RL」分别对应联合 SFT 之后与 RL 阶段之后的模型。"
    },
    {
     "id": "p-3-2-5-1",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-3-2-5-1-1",
       "original": "w/o RL w/ RL RL Gain (+/-) Open-source Mandarin Avg.",
       "zh": "（Table 6 列头）w/o RL、w/ RL、RL Gain (+/-)；开源普通话平均。"
      }
     ]
    },
    {
     "id": "p-3-2-5-2",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-3-2-5-2-1",
       "original": "2.71 2.80 2.44 2.65 Open-source English Avg.",
       "zh": "开源英文平均：w/o RL 2.71 / w/ RL 2.80（离线），2.44 / 2.65（流式）等数值（见 Table 6）。"
      }
     ]
    },
    {
     "id": "p-3-2-5-3",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-3-2-5-3-1",
       "original": "3.55 3.76 3.48 3.68 Mandarin–English Code-switch Avg.",
       "zh": "中英混合平均：3.55 / 3.76（离线），3.48 / 3.68（流式）等（见 Table 6）。"
      }
     ]
    },
    {
     "id": "p-3-2-5-4",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-3-2-5-4-1",
       "original": "8.39 8.62 8.08 8.38 Internal Mandarin Avg.",
       "zh": "内部普通话平均：8.39 / 8.62（一类），8.08 / 8.38（另一类）（见 Table 6）。"
      }
     ]
    },
    {
     "id": "p-3-2-5-5",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-3-2-5-5-1",
       "original": "3.57 3.69 3.41 3.44 We further ablate the RL stage to assess its contribution.",
       "zh": "3.57 / 3.69 / 3.41 / 3.44。我们还对 RL 阶段做了消融，以评估它的贡献。"
      },
      {
       "id": "s-3-2-5-5-2",
       "original": "As shown in Table 6, incorporating RL yields consistent improvements under both offline and streaming settings, with the most substantial gains observed on Mandarin and code-switching benchmarks.",
       "zh": "如 Table 6 所示，引入 RL 在离线和流式两种设置下都带来一致的改进，其中提升最显著的是普通话和中英混合基准。"
      },
      {
       "id": "s-3-2-5-5-3",
       "original": "A key contributing factor is the high prevalence of homophone and near-homophone confusions in these scenarios, which token-level teacher-forcing does not directly penalize effectively.",
       "zh": "一个关键原因是这些场景中同音、近音混淆非常普遍，而 token 级 teacher-forcing 并不能直接有效地惩罚这类错误。"
      },
      {
       "id": "s-3-2-5-5-4",
       "original": "By contrast, RL optimizes sequence-level rewards over complete decoding trajectories, explicitly penalizing sentence-level error propagation induced by phonetic confusion, reinforcing entity and phrase-level consistency, and mitigating exposure bias (Chen et al., 2025).",
       "zh": "相比之下，RL 在完整解码轨迹上优化序列级奖励，可以显式惩罚由发音混淆引发的句级错误传播，强化实体与短语级一致性，并缓解曝光偏差（Chen et al., 2025）。"
      },
      {
       "id": "s-3-2-5-5-5",
       "original": "In code-switching scenarios, acoustic ambiguity at languageswitch boundaries and cross-lingual entity competition are particularly pronounced; sequence-level feedback from RL can more effectively suppress erroneous language continuation and improve overall transcription consistency under mixed Mandarin–English conditions.",
       "zh": "在中英混合场景中，语言切换边界处的声学歧义和跨语言实体竞争尤为突出；RL 提供的序列级反馈可以更有效地抑制「错语言继续」，在中英混合条件下提升整体转写一致性。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-4",
   "num": "4",
   "level": 1,
   "page": 14,
   "title": {
    "original": "Conclusion",
    "zh": "结论"
   },
   "blocks": [
    {
     "id": "p-4-1",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-4-1-1",
       "original": "In this work, we revisit LLM-based ASR from a deployment-oriented perspective and identify three obstacles that continue to hinder practical adoption: limited downward scalability arising from crossmodal alignment overhead, hallucination induced by representation drift during joint optimization, and the lack of production-ready mechanisms for hotword customization.",
       "zh": "本文从部署导向的视角重新审视 LLM 语音模型，识别出三个仍在阻碍实际落地的障碍：跨模态对齐开销带来的向下扩展能力受限、联合优化中表征漂移引发的幻觉，以及缺乏生产级热词定制机制。"
      },
      {
       "id": "s-4-1-2",
       "original": "NIM4-ASR addresses these challenges through targeted architectural design and a multi-stage training paradigm.",
       "zh": "NIM4-ASR 通过有针对性的架构设计和一套多阶段训练范式来应对这些挑战。"
      },
      {
       "id": "s-4-1-3",
       "original": "By explicitly anchoring each training stage to the functional boundaries of its constituent modules, NIM4-ASR improves parameter utilization efficiency and mitigates hallucinations under acoustically ambiguous conditions, thus building a more stable foundation for LLM-based streaming speech recognition.",
       "zh": "通过把每个训练阶段显式锚定到对应模块的功能边界上，NIM4-ASR 提升了参数利用效率，并在声学含糊的条件下抑制了幻觉，从而为 LLM 流式语音识别打下了更稳定的基础。"
      },
      {
       "id": "s-4-1-4",
       "original": "Building on this principle, NIM4-ASR further incorporates a real-time streaming inference pipeline and phoneme-level RAG to enable million-scale hotword customization.",
       "zh": "在这一原则之上，NIM4-ASR 进一步集成了实时流式推理流水线与音素级 RAG，实现了百万级热词定制。"
      },
      {
       "id": "s-4-1-5",
       "original": "Extensive evaluation on 25 benchmarks demonstrates that NIM4-ASR achieves SOTA performance on several benchmarks with only 2.3B parameters, while maintaining low-latency streaming capability and clear advantages in entity-intensive scenarios.",
       "zh": "在 25 个基准上的大规模评测表明，NIM4-ASR 仅用 2.3B 参数就在多个基准上达到 SOTA，同时保持低延迟的流式能力，并在实体密集场景中保持明显优势。"
      },
      {
       "id": "s-4-1-6",
       "original": "Overall, these results suggest that advancing LLM-based ASR relies not only on scaling model capacity, but more importantly on co-designing model architecture, training objectives, and inference strategies.",
       "zh": "总的来说，这些结果表明：推动 LLM 语音模型进步的路径并不只是堆大模型容量，更重要的是协同设计模型架构、训练目标与推理策略。"
      },
      {
       "id": "s-4-1-7",
       "original": "NIM4-ASR thus provides a practical solution for building efficient, robust, and customizable LLM-based ASR systems for real-time speech interaction.",
       "zh": "因此，NIM4-ASR 为构建面向实时语音交互的高效、鲁棒、可定制的 LLM 语音系统提供了一套可落地的方案。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-5",
   "num": "5",
   "level": 1,
   "page": 14,
   "title": {
    "original": "Limitations and Future Work",
    "zh": "局限与未来工作"
   },
   "blocks": [
    {
     "id": "p-5-1",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-5-1-1",
       "original": "Although NIM4-ASR has demonstrated strong recognition performance and practical effectiveness, several key issues remain to be addressed in the next stage of system iteration.",
       "zh": "尽管 NIM4-ASR 已经展现出很强的识别性能和实用效果，但下一阶段系统迭代仍有若干关键问题需要解决。"
      },
      {
       "id": "s-5-1-2",
       "original": "First, the current model supports only Mandarin, English, and a limited set of Chinese dialects, leaving broader multilingual and dialectal coverage as an important direction for future work.",
       "zh": "第一，当前模型只支持普通话、英语和有限的几种中文方言；扩展到更多语言与方言仍是重要的未来方向。"
      },
      {
       "id": "s-5-1-3",
       "original": "Second, the current model uses only retrieved hotwords as contextual input and does not yet incorporate conversation history, leaving room for improvement in cross-turn transcription consistency in multi-turn interaction scenarios.",
       "zh": "第二，当前模型只把检索到的热词作为上下文输入，未引入对话历史，因此在多轮交互中的跨轮转写一致性上还有提升空间。"
      },
      {
       "id": "s-5-1-4",
       "original": "In addition, the gains brought by RL are not yet sufficiently stable, suggesting that further optimization is needed in both algorithm design and reward formulation.",
       "zh": "此外，RL 带来的收益尚不够稳定，说明在算法设计与奖励形式两方面都还需要进一步优化。"
      },
      {
       "id": "s-5-1-5",
       "original": "In future work, we plan to focus on the following directions:",
       "zh": "未来工作我们计划重点投入以下方向："
      }
     ]
    },
    {
     "id": "p-5-2",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-5-2-1",
       "original": "• (1) Expanding support for more languages and Chinese dialects, and developing more adaptive hotword customization mechanisms for dialectal and accented speech. • (2) Incorporating conversation history as additional contextual information to improve cross-turn transcription consistency in multi-turn interaction scenarios. • (3) Further improving streaming inference efficiency and enabling scalable RAG acceleration under high-concurrency deployment settings. • (4) Refining the RL algorithm and reward design to further improve system robustness and reduce hallucinations.",
       "zh": "• (1) 扩展对更多语言与中文方言的支持，针对方言与口音语音开发更具适应性的热词定制机制。 • (2) 把对话历史作为附加上下文纳入，提升多轮交互中的跨轮转写一致性。 • (3) 进一步提升流式推理效率，在高并发部署下实现可扩展的 RAG 加速。 • (4) 改进 RL 算法与奖励设计，进一步提升系统鲁棒性并降低幻觉。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-references",
   "num": null,
   "level": 1,
   "page": 15,
   "title": {
    "original": "References",
    "zh": "References"
   },
   "blocks": [
    {
     "id": "p-references-1",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-1-1",
       "original": "Armen Aghajanyan, Lili Yu, Alexis Conneau, Wei-Ning Hsu, Karen Hambardzumyan, Susan Zhang, Stephen Roller, Naman Goyal, Omer Levy, and Luke Zettlemoyer."
      },
      {
       "id": "s-references-1-2",
       "original": "Scaling laws for generative mixed-modal language models."
      },
      {
       "id": "s-references-1-3",
       "original": "In International Conference on Machine Learning, pages 265–279."
      }
     ]
    },
    {
     "id": "p-references-2",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-2-1",
       "original": "PMLR, 2023."
      }
     ]
    },
    {
     "id": "p-references-3",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-3-1",
       "original": "Alfred V."
      },
      {
       "id": "s-references-3-2",
       "original": "Aho and Margaret J."
      },
      {
       "id": "s-references-3-3",
       "original": "Corasick."
      },
      {
       "id": "s-references-3-4",
       "original": "Efficient string matching: an aid to bibliographic search."
      }
     ]
    },
    {
     "id": "p-references-4",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-4-1",
       "original": "Communications of the ACM, 18(6):333–340, 1975."
      }
     ]
    },
    {
     "id": "p-references-5",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-5-1",
       "original": "Keyu An, Yanni Chen, Zhigao Chen, Chong Deng, Zhihao Du, Changfeng Gao, Zhifu Gao, Bo Gong, Xiangang Li, Yabin Li, et al. Fun-asr technical report. arXiv preprint arXiv:2509.12508, 2025."
      }
     ]
    },
    {
     "id": "p-references-6",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-6-1",
       "original": "Ye Bai, Jingping Chen, Jitong Chen, Wei Chen, Zhuo Chen, Chuang Ding, Linhao Dong, Qianqian Dong, Yujiao Du, Kepan Gao, et al. Seed-asr: Understanding diverse speech and contexts with llm-based speech recognition. arXiv preprint arXiv:2407.04675, 2024a."
      }
     ]
    },
    {
     "id": "p-references-7",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-7-1",
       "original": "Zechen Bai, Pichao Wang, Tianjun Xiao, Tong He, Zongbo Han, Zheng Zhang, and Mike Zheng Shou."
      }
     ]
    },
    {
     "id": "p-references-8",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-8-1",
       "original": "Hallucination of multimodal large language models: A survey. arXiv preprint arXiv:2404.18930, 2024b."
      }
     ]
    },
    {
     "id": "p-references-9",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-9-1",
       "original": "Hui Bu, Jiayu Du, Xingyu Na, Bengu Wu, and Hao Zheng."
      },
      {
       "id": "s-references-9-2",
       "original": "Aishell-1: An open-source mandarin speech corpus and a speech recognition baseline."
      },
      {
       "id": "s-references-9-3",
       "original": "In 2017 20th conference of the oriental chapter of the international coordinating committee on speech databases and speech I/O systems and assessment (O-COCOSDA), pages 1–5."
      },
      {
       "id": "s-references-9-4",
       "original": "IEEE, 2017."
      }
     ]
    },
    {
     "id": "p-references-10",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-10-1",
       "original": "William Chan, Navdeep Jaitly, Quoc Le, and Oriol Vinyals."
      },
      {
       "id": "s-references-10-2",
       "original": "Listen, attend and spell: A neural network for large vocabulary conversational speech recognition."
      },
      {
       "id": "s-references-10-3",
       "original": "In 2016 IEEE international conference on acoustics, speech and signal processing (ICASSP), pages 4960–4964."
      },
      {
       "id": "s-references-10-4",
       "original": "IEEE, 2016."
      }
     ]
    },
    {
     "id": "p-references-11",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-11-1",
       "original": "Chen Chen, Ke Hu, Chao-Han Huck Yang, Ankita Pasad, Edresson Casanova, Weiqing Wang, Szu-Wei Fu, Jason Li, Zhehuai Chen, Jagadeesh Balam, et al. Reinforcement learning enhanced full-duplex spoken dialogue language models for conversational interactions."
      },
      {
       "id": "s-references-11-2",
       "original": "In Second Conference on Language Modeling, 2025."
      }
     ]
    },
    {
     "id": "p-references-12",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-12-1",
       "original": "Jan K Chorowski, Dzmitry Bahdanau, Dmitriy Serdyuk, Kyunghyun Cho, and Yoshua Bengio."
      }
     ]
    },
    {
     "id": "p-references-13",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-13-1",
       "original": "Attention-based models for speech recognition."
      },
      {
       "id": "s-references-13-2",
       "original": "Advances in neural information processing systems, 28, 2015."
      }
     ]
    },
    {
     "id": "p-references-14",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-14-1",
       "original": "Yuhang Dai, Ziyu Zhang, Shuai Wang, Longhao Li, Zhao Guo, Tianlun Zuo, Shuiyuan Wang, Hongfei Xue, Chengyou Wang, Qing Wang, et al. Wenetspeech-chuan: A large-scale sichuanese corpus with rich annotation for dialectal speech processing. arXiv preprint arXiv:2509.18004, 2025."
      }
     ]
    },
    {
     "id": "p-references-15",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-15-1",
       "original": "Jiayu Du, Xingyu Na, Xuechen Liu, and Hui Bu."
      },
      {
       "id": "s-references-15-2",
       "original": "Aishell-2: Transforming mandarin asr research into industrial scale. arXiv preprint arXiv:1808.10583, 2018."
      }
     ]
    },
    {
     "id": "p-references-16",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-16-1",
       "original": "Mark Endo and Serena Yeung-Levy."
      },
      {
       "id": "s-references-16-2",
       "original": "Downscaling intelligence: Exploring perception and reasoning bottlenecks in small multimodal models. arXiv preprint arXiv:2511.17487, 2025."
      }
     ]
    },
    {
     "id": "p-references-17",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-17-1",
       "original": "Yassir Fathullah, Chunyang Wu, Egor Lakomkin, Junteng Jia, Yuan Shangguan, Ke Li, Jinxi Guo, Wenhan Xiong, Jay Mahadeokar, Ozlem Kalinli, et al. Prompting large language models with speech recognition abilities."
      },
      {
       "id": "s-references-17-2",
       "original": "In ICASSP 2024-2024 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP), pages 13351–13355."
      },
      {
       "id": "s-references-17-3",
       "original": "IEEE, 2024."
      }
     ]
    },
    {
     "id": "p-references-18",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-18-1",
       "original": "Alex Graves."
      },
      {
       "id": "s-references-18-2",
       "original": "Sequence transduction with recurrent neural networks. arXiv preprint arXiv:1211.3711, 2012."
      }
     ]
    },
    {
     "id": "p-references-19",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-19-1",
       "original": "Alex Graves, Santiago Fernández, Faustino Gomez, and Jürgen Schmidhuber."
      },
      {
       "id": "s-references-19-2",
       "original": "Connectionist temporal classification: labelling unsegmented sequence data with recurrent neural networks."
      },
      {
       "id": "s-references-19-3",
       "original": "In Proceedings of the 23rd international conference on Machine learning, pages 369–376, 2006."
      }
     ]
    },
    {
     "id": "p-references-20",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-20-1",
       "original": "Anmol Gulati, James Qin, Chung-Cheng Chiu, Niki Parmar, Yu Zhang, Jiahui Yu, Wei Han, Shibo Wang, Zhengdong Zhang, Yonghui Wu, et al. Conformer: Convolution-augmented transformer for speech recognition. arXiv preprint arXiv:2005.08100, 2020."
      }
     ]
    },
    {
     "id": "p-references-21",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-21-1",
       "original": "Yukiya Hono, Koh Mitsuda, Tianyu Zhao, Kentaro Mitsui, Toshiaki Wakatsuki, and Kei Sawada."
      }
     ]
    },
    {
     "id": "p-references-22",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-22-1",
       "original": "Integrating pre-trained speech and language models for end-to-end speech recognition."
      },
      {
       "id": "s-references-22-2",
       "original": "In Findings of the Association for Computational Linguistics: ACL 2024, pages 13289–13305, 2024."
      }
     ]
    },
    {
     "id": "p-references-23",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-23-1",
       "original": "Diederik P Kingma."
      },
      {
       "id": "s-references-23-2",
       "original": "Adam: A method for stochastic optimization. arXiv preprint arXiv:1412.6980, 2014."
      }
     ]
    },
    {
     "id": "p-references-24",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-24-1",
       "original": "Simon Kornblith, Mohammad Norouzi, Honglak Lee, and Geoffrey Hinton."
      },
      {
       "id": "s-references-24-2",
       "original": "Similarity of neural network representations revisited."
      },
      {
       "id": "s-references-24-3",
       "original": "In International conference on machine learning, pages 3519– 3529."
      },
      {
       "id": "s-references-24-4",
       "original": "PMlR, 2019."
      }
     ]
    },
    {
     "id": "p-references-25",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-25-1",
       "original": "Chin-Hung Kuo and Kuan-Yu Chen."
      },
      {
       "id": "s-references-25-2",
       "original": "Correcting, rescoring and matching: An n-best list selection framework for speech recognition."
      },
      {
       "id": "s-references-25-3",
       "original": "In 2022 Asia-Pacific Signal and Information Processing Association Annual Summit and Conference (APSIPA ASC), pages 729–734."
      },
      {
       "id": "s-references-25-4",
       "original": "IEEE, 2022."
      }
     ]
    },
    {
     "id": "p-references-26",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-26-1",
       "original": "Woosuk Kwon, Zhuohan Li, Siyuan Zhuang, Ying Sheng, Lianmin Zheng, Cody Hao Yu, Joseph Gonzalez, Hao Zhang, and Ion Stoica."
      },
      {
       "id": "s-references-26-2",
       "original": "Efficient memory management for large language model serving with pagedattention."
      },
      {
       "id": "s-references-26-3",
       "original": "In Proceedings of the 29th symposium on operating systems principles, pages 611–626, 2023."
      }
     ]
    },
    {
     "id": "p-references-27",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-27-1",
       "original": "Zhihong Lei, Xingyu Na, Mingbin Xu, Ernest Pusateri, Christophe Van Gysel, Yuanyuan Zhang, Shiyi Han, and Zhen Huang."
      },
      {
       "id": "s-references-27-2",
       "original": "Contextualization of asr with llm using phonetic retrieval-based augmentation."
      },
      {
       "id": "s-references-27-3",
       "original": "In ICASSP 2025-2025 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP), pages 1–5."
      },
      {
       "id": "s-references-27-4",
       "original": "IEEE, 2025."
      }
     ]
    },
    {
     "id": "p-references-28",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-28-1",
       "original": "Longhao Li, Zhao Guo, Hongjie Chen, Yuhang Dai, Ziyu Zhang, Hongfei Xue, Tianlun Zuo, Chengyou Wang, Shuiyuan Wang, Jie Li, et al. Wenetspeech-yue: A large-scale cantonese speech corpus with multi-dimensional annotation. arXiv preprint arXiv:2509.03959, 2025."
      }
     ]
    },
    {
     "id": "p-references-29",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-29-1",
       "original": "Alexander H Liu, Andy Ehrenberg, Andy Lo, Clément Denoix, Corentin Barreau, Guillaume Lample, Jean-Malo Delignon, Khyathi Raghavi Chandu, Patrick von Platen, Pavankumar Reddy Muddireddy, et al. Voxtral. arXiv preprint arXiv:2507.13264, 2025."
      }
     ]
    },
    {
     "id": "p-references-30",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-30-1",
       "original": "Holy Lovenia, Samuel Cahyawijaya, Genta Indra Winata, Peng Xu, Xu Yan, Zihan Liu, Rita Frieske, Tiezheng Yu, Wenliang Dai, Elham J Barezi, et al. Ascend: A spontaneous chinese-english dataset for code-switching in multi-turn conversation."
      },
      {
       "id": "s-references-30-2",
       "original": "In Proceedings of the 13th Language Resources and Evaluation Conference (LREC), 2022."
      }
     ]
    },
    {
     "id": "p-references-31",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-31-1",
       "original": "Vahid Noroozi, Somshubra Majumdar, Ankur Kumar, Jagadeesh Balam, and Boris Ginsburg."
      },
      {
       "id": "s-references-31-2",
       "original": "Stateful conformer with cache-based inference for streaming automatic speech recognition."
      },
      {
       "id": "s-references-31-3",
       "original": "In ICASSP 2024-2024 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP), pages 12041–12045."
      },
      {
       "id": "s-references-31-4",
       "original": "IEEE, 2024."
      }
     ]
    },
    {
     "id": "p-references-32",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-32-1",
       "original": "Vassil Panayotov, Guoguo Chen, Daniel Povey, and Sanjeev Khudanpur."
      },
      {
       "id": "s-references-32-2",
       "original": "Librispeech: an asr corpus based on public domain audio books."
      },
      {
       "id": "s-references-32-3",
       "original": "In 2015 IEEE international conference on acoustics, speech and signal processing (ICASSP), pages 5206–5210."
      },
      {
       "id": "s-references-32-4",
       "original": "IEEE, 2015."
      }
     ]
    },
    {
     "id": "p-references-33",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-33-1",
       "original": "Daniel S Park, William Chan, Yu Zhang, Chung-Cheng Chiu, Barret Zoph, Ekin D Cubuk, and Quoc V Le."
      },
      {
       "id": "s-references-33-2",
       "original": "Specaugment: A simple data augmentation method for automatic speech recognition."
      }
     ]
    },
    {
     "id": "p-references-34",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-34-1",
       "original": "arXiv preprint arXiv:1904.08779, 2019."
      }
     ]
    },
    {
     "id": "p-references-35",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-35-1",
       "original": "Hansol Park, Hoseong Ahn, Junwon Moon, Yejin Lee, and Kyuhong Shim."
      },
      {
       "id": "s-references-35-2",
       "original": "Evaluating hallucinations in multimodal llms with spoken queries under diverse acoustic conditions. arXiv preprint arXiv:2510.08581, 2025."
      }
     ]
    },
    {
     "id": "p-references-36",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-36-1",
       "original": "Vineel Pratap, Qiantong Xu, Anuroop Sriram, Gabriel Synnaeve, and Ronan Collobert."
      },
      {
       "id": "s-references-36-2",
       "original": "Mls: A large-scale multilingual dataset for speech research. arXiv preprint arXiv:2012.03411, 2020."
      }
     ]
    },
    {
     "id": "p-references-37",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-37-1",
       "original": "Samyam Rajbhandari, Jeff Rasley, Olatunji Ruwase, and Yuxiong He."
      },
      {
       "id": "s-references-37-2",
       "original": "Zero: Memory optimizations toward training trillion parameter models."
      },
      {
       "id": "s-references-37-3",
       "original": "In SC20: international conference for high performance computing, networking, storage and analysis, pages 1–16."
      },
      {
       "id": "s-references-37-4",
       "original": "IEEE, 2020."
      }
     ]
    },
    {
     "id": "p-references-38",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-38-1",
       "original": "Zhihong Shao, Peiyi Wang, Qihao Zhu, Runxin Xu, Junxiao Song, Xiao Bi, Haowei Zhang, Mingchuan Zhang, YK Li, Yang Wu, et al. Deepseekmath: Pushing the limits of mathematical reasoning in open language models. arXiv preprint arXiv:2402.03300, 2024."
      }
     ]
    },
    {
     "id": "p-references-39",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-39-1",
       "original": "Xian Shi, Xiong Wang, Zhifang Guo, Yongqi Wang, Pei Zhang, Xinyu Zhang, Zishan Guo, Hongkun Hao, Yu Xi, Baosong Yang, et al. Qwen3-asr technical report. arXiv preprint arXiv:2601.21337, 2026."
      }
     ]
    },
    {
     "id": "p-references-40",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-40-1",
       "original": "Yuanfeng Song, Di Jiang, Xuefang Zhao, Qian Xu, Raymond Chi-Wing Wong, Lixin Fan, and Qiang Yang."
      },
      {
       "id": "s-references-40-2",
       "original": "L2rs: a learning-to-rescore mechanism for automatic speech recognition. arXiv preprint arXiv:1910.11496, 2019."
      }
     ]
    },
    {
     "id": "p-references-41",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-41-1",
       "original": "Zheshu Song, Lu Wang, Wei Deng, Zhuo Yang, Yong Wu, and Bin Xia."
      },
      {
       "id": "s-references-41-2",
       "original": "Index-asr technical report."
      }
     ]
    },
    {
     "id": "p-references-42",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-42-1",
       "original": "arXiv preprint arXiv:2601.00890, 2025."
      }
     ]
    },
    {
     "id": "p-references-43",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-43-1",
       "original": "Zhiyuan Tang, Dong Wang, Yanguang Xu, Jianwei Sun, Xiaoning Lei, Shuaijiang Zhao, Cheng Wen, Xingjun Tan, Chuandong Xie, Shuran Zhou, et al. Kespeech: An open source speech dataset of mandarin and its eight subdialects."
      },
      {
       "id": "s-references-43-2",
       "original": "In Thirty-fifth Conference on Neural Information Processing Systems Datasets and Benchmarks Track (Round 2), 2021."
      }
     ]
    },
    {
     "id": "p-references-44",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-44-1",
       "original": "Geeyang Tay, Wentao Ma, Jaewon Lee, Yuzhi Tang, Daniel Lee, Weisu Yin, Dongming Shen, Silin Meng, Yi Zhu, Mu Li, et al. Back to basics: Revisiting asr in the age of voice agents. arXiv preprint arXiv:2603.25727, 2026."
      }
     ]
    },
    {
     "id": "p-references-45",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-45-1",
       "original": "Changhan Wang, Morgane Riviere, Ann Lee, Anne Wu, Chaitanya Talnikar, Daniel Haziza, Mary Williamson, Juan Pino, and Emmanuel Dupoux."
      },
      {
       "id": "s-references-45-2",
       "original": "Voxpopuli: A large-scale multilingual speech corpus for representation learning, semi-supervised learning and interpretation."
      },
      {
       "id": "s-references-45-3",
       "original": "In Proceedings of the 59th Annual Meeting of the Association for Computational Linguistics and the 11th International Joint Conference on Natural Language Processing (Volume 1: Long Papers), pages 993–1003, 2021."
      }
     ]
    },
    {
     "id": "p-references-46",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-46-1",
       "original": "He Wang, Linhan Ma, Dake Guo, Xiong Wang, Lei Xie, Jin Xu, and Junyang Lin."
      },
      {
       "id": "s-references-46-2",
       "original": "Contextasr-bench: A massive contextual speech recognition benchmark. arXiv preprint arXiv:2507.05727, 2025."
      }
     ]
    },
    {
     "id": "p-references-47",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-47-1",
       "original": "Boyong Wu, Chao Yan, Chen Hu, Cheng Yi, Chengli Feng, Fei Tian, Feiyu Shen, Gang Yu, Haoyang Zhang, Jingbei Li, et al. Step-audio 2 technical report. arXiv preprint arXiv:2507.16632, 2025."
      }
     ]
    },
    {
     "id": "p-references-48",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-48-1",
       "original": "Yuan Xie, Jiaqi Song, Guang Qiu, Xianliang Wang, Ming Lei, Jie Gao, and Jie Wu."
      },
      {
       "id": "s-references-48-2",
       "original": "Rethinking entropy allocation in llm-based asr: Understanding the dynamics between speech encoders and llms. arXiv preprint arXiv:2604.08003, 2026."
      }
     ]
    },
    {
     "id": "p-references-49",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-49-1",
       "original": "Jin Xu, Zhifang Guo, Hangrui Hu, Yunfei Chu, Xiong Wang, Jinzheng He, Yuxuan Wang, Xian Shi, Ting He, Xinfa Zhu, et al. Qwen3-omni technical report. arXiv preprint arXiv:2509.17765, 2025a."
      }
     ]
    },
    {
     "id": "p-references-50",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-50-1",
       "original": "Kai-Tuo Xu, Feng-Long Xie, Xu Tang, and Yao Hu."
      },
      {
       "id": "s-references-50-2",
       "original": "Fireredasr: Open-source industrial-grade mandarin speech recognition models from encoder-decoder to llm integration. arXiv preprint arXiv:2501.14350, 2025b."
      }
     ]
    },
    {
     "id": "p-references-51",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-51-1",
       "original": "Kaituo Xu, Yan Jia, Kai Huang, Junjie Chen, Wenpeng Li, Kun Liu, Feng-Long Xie, Xu Tang, and Yao Hu."
      },
      {
       "id": "s-references-51-2",
       "original": "Fireredasr2s: A state-of-the-art industrial-grade all-in-one automatic speech recognition system. arXiv preprint arXiv:2603.10420, 2026."
      }
     ]
    },
    {
     "id": "p-references-52",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-52-1",
       "original": "An Yang, Anfeng Li, Baosong Yang, Beichen Zhang, Binyuan Hui, Bo Zheng, Bowen Yu, Chang Gao, Chengen Huang, Chenxu Lv, et al. Qwen3 technical report. arXiv preprint arXiv:2505.09388, 2025."
      }
     ]
    },
    {
     "id": "p-references-53",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-53-1",
       "original": "Zengwei Yao, Wei Kang, Xiaoyu Yang, Fangjun Kuang, Liyong Guo, Han Zhu, Zengrui Jin, Zhaoqing Li, Long Lin, and Daniel Povey."
      },
      {
       "id": "s-references-53-2",
       "original": "Cr-ctc: Consistency regularization on ctc for improved speech recognition. arXiv preprint arXiv:2410.05101, 2024."
      }
     ]
    },
    {
     "id": "p-references-54",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-54-1",
       "original": "Saierdaer Yusuyin, Te Ma, Hao Huang, Wenbo Zhao, and Zhijian Ou."
      },
      {
       "id": "s-references-54-2",
       "original": "Whistle: Data-efficient multilingual and crosslingual speech recognition via weakly phonetic supervision."
      },
      {
       "id": "s-references-54-3",
       "original": "IEEE Transactions on Audio, Speech and Language Processing, 2025."
      }
     ]
    },
    {
     "id": "p-references-55",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-55-1",
       "original": "Binbin Zhang, Di Wu, Zhuoyuan Yao, Xiong Wang, Fan Yu, Chao Yang, Liyong Guo, Yaguang Hu, Lei Xie, and Xin Lei."
      },
      {
       "id": "s-references-55-2",
       "original": "Unified streaming and non-streaming two-pass end-to-end model for speech recognition. arXiv preprint arXiv:2012.05481, 2020."
      }
     ]
    },
    {
     "id": "p-references-56",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-56-1",
       "original": "Binbin Zhang, Hang Lv, Pengcheng Guo, Qijie Shao, Chao Yang, Lei Xie, Xin Xu, Hui Bu, Xiaoyu Chen, Chenchen Zeng, et al. Wenetspeech: A 10000+ hours multi-domain mandarin corpus for speech recognition."
      },
      {
       "id": "s-references-56-2",
       "original": "In ICASSP 2022-2022 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP), pages 6182–6186."
      },
      {
       "id": "s-references-56-3",
       "original": "IEEE, 2022a."
      }
     ]
    },
    {
     "id": "p-references-57",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-57-1",
       "original": "Lichao Zhang, Ruiqi Li, Shoutong Wang, Liqun Deng, Jinglin Liu, Yi Ren, Jinzheng He, Rongjie Huang, Jieming Zhu, Xiao Chen, and Zhou Zhao."
      },
      {
       "id": "s-references-57-2",
       "original": "M4singer: A multi-style, multi-singer and musical score provided mandarin singing corpus."
      }
     ]
    },
    {
     "id": "p-references-58",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-58-1",
       "original": "In S."
      },
      {
       "id": "s-references-58-2",
       "original": "Koyejo, S."
      },
      {
       "id": "s-references-58-3",
       "original": "Mohamed, A."
      },
      {
       "id": "s-references-58-4",
       "original": "Agarwal, D."
      },
      {
       "id": "s-references-58-5",
       "original": "Belgrave, K."
      },
      {
       "id": "s-references-58-6",
       "original": "Cho, and A."
      },
      {
       "id": "s-references-58-7",
       "original": "Oh, editors, Advances in Neural Information Processing Systems, volume 35, pages 6914–6926."
      },
      {
       "id": "s-references-58-8",
       "original": "Curran Associates, Inc., 2022b."
      }
     ]
    },
    {
     "id": "p-references-59",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-59-1",
       "original": "Yu Zhang, Mufan Xu, Xuefeng Bai, Pengfei Zhang, Yang Xiang, Min Zhang, et al. Instruction anchors: Dissecting the causal dynamics of modality arbitration. arXiv preprint arXiv:2602.03677, 2026."
      }
     ]
    },
    {
     "id": "p-references-60",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-60-1",
       "original": "Guanyu Zhou, Yibo Yan, Xin Zou, Kun Wang, Aiwei Liu, and Xuming Hu."
      },
      {
       "id": "s-references-60-2",
       "original": "Mitigating modality priorinduced hallucinations in multimodal large language models via deciphering attention causality."
      }
     ]
    },
    {
     "id": "p-references-61",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-61-1",
       "original": "arXiv preprint arXiv:2410.04780, 2024."
      }
     ]
    },
    {
     "id": "p-references-62",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-62-1",
       "original": "Jiaming Zhou, Yujie Guo, Shiwan Zhao, Haoqin Sun, Hui Wang, Jiabei He, Aobo Kong, Shiyao Wang, Xi Yang, Yequan Wang, et al. Cs-dialogue: A 104-hour dataset of spontaneous mandarin-english code-switching dialogues for speech recognition. arXiv preprint arXiv:2502.18913, 2025."
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
    "sentence_id": "s-1-3-5",
    "quote": "modality tax (Aghajanyan et al., 2023; Zhang et al., 2026): a non-trivial number of parameters are devoted to cross-modal alignment rather than the ASR task itself"
   },
   "kind": "concept",
   "title": "什么是模态税",
   "explanation": "「模态税」指 LLM-based ASR 里一部分参数被用于把语音嵌入对齐到 LLM 文本空间，而非直接服务于识别任务。NIM4 整篇的核心动机就是减税：编码器预训练时用 CR-CTC 把声学表征压成低熵、音素判别的形态，让它天然更接近 LLM 的嵌入空间，于是 LLM 就不必浪费容量做对齐。对 2.3B 这种小模型，这部分省出来的容量非常关键——这也是它敢跟 8B+ 模型叫板的根本逻辑。",
   "featured": true
  },
  {
   "id": "ann-002",
   "anchor": {
    "sentence_id": "s-1-4-4",
    "quote": "causing its representations to gradually shift toward the LLM’s text feature space (i.e., representation drift)"
   },
   "kind": "concept",
   "title": "表征漂移机制",
   "explanation": "联合训练时 LLM 的梯度信号比编码器任务本身更强，会把编码器表征拉向文本空间，短期内指标可能上升，但编码器会逐渐失去对声学细节的敏感度——这就是「表征漂移」。它是 LLM-ASR 在噪声/口音等声学模糊场景下更容易幻觉的根因之一：编码器开始依赖语言先验而不是声学证据。NIM4 的 IA-SFT 阶段正是针对这一点，把编码器冻结并周期性替换快照，从机制上阻断漂移。",
   "featured": true
  },
  {
   "id": "ann-003",
   "anchor": {
    "sentence_id": "s-1-4-6",
    "quote": "In task-oriented in-vehicle speech interaction scenarios, hallucinations can cascade through the downstream pipeline and trigger unintended actions (Tay et al., 2026)"
   },
   "kind": "motivation",
   "title": "为什么盯车载场景",
   "explanation": "这句话暴露了 NIM4 的产品定位：NIO 的车载语音助手 NOMI。车控场景里幻觉不是「多一个错字」的问题——识别错了可能直接触发误操作，比如把闲聊误判成「打开车窗」。所以 NIM4 在 RL 阶段专门引入幻觉奖励、在数据上做静音/噪声增强，并在内部基准里加入大量座舱域测试。它的设计取舍都围绕「宁可识别保守，也不能幻觉操作」展开，这跟追求榜单数字的学术模型不太一样。",
   "featured": false
  },
  {
   "id": "ann-004",
   "anchor": {
    "sentence_id": "s-2-1-6-1",
    "quote": "with approximately 600 M parameters in total"
   },
   "kind": "number",
   "title": "编码器只占 600M",
   "explanation": "NIM4 总参数 2.3B，其中编码器约 600M，LLM 是 Qwen3-1.7B——也就是说声学侧只占了约四分之一的容量，绝大部分参数给了语言模型。这是典型的「LLM 主导」配比，跟传统端到端 ASR（编码器常常占大头）刚好反过来。背后的判断是：声学建模在小参数量下就能做好，但语义消歧、实体理解这些「上游智能」必须靠足够大的语言模型。这个配比能不能再压，是未来压缩工作的关键观察点。",
   "featured": false
  },
  {
   "id": "ann-005",
   "anchor": {
    "sentence_id": "s-2-1-7-1",
    "quote": "the frame rate is reduced to 6.25 Hz, corresponding to a temporal resolution of 160 ms per token"
   },
   "kind": "engineering",
   "title": "160ms 一个 token 的代价",
   "explanation": "编码器 4x 下采样 + 适配器再 4x 下采样，把 25Hz 帧率压到 6.25Hz——LLM 每处理一个语音 token 相当于 160ms 音频。这大幅减轻了 LLM 的序列负担，但也设定了流式响应的物理下限：任何首包延迟都不可能低于 160ms 量级。论文中 chunk 取 640ms（4 个 token），实际是延迟与精度的工程权衡。对端侧/低延迟场景，这个 160ms 是硬约束，很难绕开。",
   "featured": true
  },
  {
   "id": "ann-006",
   "anchor": {
    "sentence_id": "s-2-2-1-1-3",
    "quote": "CTC encourages the encoder to produce low-entropy, phoneme-discriminative representations that align more naturally with the LLM’s embedding space"
   },
   "kind": "comparison",
   "title": "CTC 为什么比 AED 更配 LLM",
   "explanation": "传统 FireRedASR-AED 用注意力编码器-解码器做预训练，encoder 学的是「为注意力解码服务」的表征；而 CTC 的帧级独立预测会迫使编码器输出尖锐、低熵的音素判别表征。这种表征的信息结构跟 LLM 的离散 token 嵌入天然更像，跨模态鸿沟因此缩小。这个观察（编码器输出熵越低、越好对齐）是作者另一篇论文（Xie et al., 2026）的核心论点，NIM4 把它落到了具体训练目标上。",
   "featured": true
  },
  {
   "id": "ann-007",
   "anchor": {
    "sentence_id": "s-2-2-1-2-1",
    "quote": "we shift the supervision labels from character level to phoneme level"
   },
   "kind": "motivation",
   "title": "音素而非字符的考量",
   "explanation": "把预训练标签从字符换成音素，是「功能解耦」最具体的一步：字符已经带语义/拼写信息，会诱导编码器过早做语言建模；音素是纯声学单元的离散化，编码器只需关心「这段声音是什么音」。剩下的「音素序列 → 哪个词」交给 LLM 去解决——这正好发挥 LLM 的语言先验优势。副产品是跨语言扩展更容易：音素集远比字符集通用，这也是论文说「对新语言和方言有更大潜力」的依据。",
   "featured": false
  },
  {
   "id": "ann-008",
   "anchor": {
    "sentence_id": "s-2-2-2-1-2",
    "quote": "allows alignment to begin before pretraining completes, while IA-SFT is launched upon alignment completion and proceeds asynchronously alongside the remaining pretraining process"
   },
   "kind": "engineering",
   "title": "异步流水线省时但有风险",
   "explanation": "IA-SFT 与预训练并行跑，能把端到端训练时长显著压缩，这是工程上的真优化。但代价是 IA-SFT 看到的编码器是「未收敛的中间态」——作者用 CKA 监控漂移、阈值触发快照热替换来兜底。这个设计依赖一个未明言的假设：CKA 相似度能真正代表「表征够用」。CKA 只是几何一致性度量，对任务相关性的判别力有限；论文阈值 0.975 是经验值，没有给出灵敏度分析，复现时这是最容易踩坑的地方。",
   "featured": true
  },
  {
   "id": "ann-009",
   "anchor": {
    "sentence_id": "s-2-2-2-7-1",
    "quote": "totaling 4M steps across three encoder versions"
   },
   "kind": "number",
   "title": "4M 步 + 3 版编码器",
   "explanation": "IA-SFT 实际跑了 4M 步、横跨 3 个编码器快照（1.01M / 1.32M / 2.0M 预训练步）。这个量级的训练成本不低——仅 IA-SFT 一个阶段就超过很多模型的完整 SFT。它的隐含逻辑是：与其让 LLM 一次适应最终编码器，不如让它见多个「逐渐变强」的版本，从而学到对编码器版本不变性。从课程学习角度看确实合理，但也意味着这套流程对小团队几乎不可复制——这是 NIM4 没明说的隐性门槛。",
   "featured": false
  },
  {
   "id": "ann-010",
   "anchor": {
    "sentence_id": "s-2-2-3-1-5",
    "quote": "the preceding alignment stages have established a stable cross-modal manifold, placing subsequent optimization in a low-curvature region of the loss landscape"
   },
   "kind": "critique",
   "title": "几何视角只是修辞",
   "explanation": "「稳定跨模态流形」「低曲率区域」听起来很美，但论文没给出任何曲率或 Hessian 的实证——这本质是为「后期联合 SFT 风险小」找的一个事后解释。真实支撑其实来自前一句更朴素的事实：前面阶段已经把模态鸿沟压小了，LLM 梯度对编码器的扰动自然变小。读这类论文时，要警惕「几何/流形」话术被用作掩盖缺乏消融证据的修辞。真正的证据在 Table 5/6 的幻觉率对比里，而不是这段几何描述。",
   "featured": true
  },
  {
   "id": "ann-011",
   "anchor": {
    "sentence_id": "s-2-2-4-2-5",
    "quote": "The inclusion of distractors discourages the LLM from over-relying on contextual cues at the expense of semantic plausibility"
   },
   "kind": "engineering",
   "title": "干扰热词防过信任",
   "explanation": "这是个细节但很关键的设计：训练时随机混入发音相近的干扰热词，逼 LLM 学会「上下文提示不一定对」，必须结合声学和语义自己判断。如果不加干扰项，模型容易学成「prompt 里给什么就抄什么」——线上一旦热词库有脏数据或 RAG 误检，幻觉会更严重。这跟我们做 RAG 检索的经验一致：检索器的错误是无法完全消除的，模型必须对上下文保持「有限信任」。这个 trick 几乎零成本，值得所有做 hotword/contextual ASR 的人借鉴。",
   "featured": true
  },
  {
   "id": "ann-012",
   "anchor": {
    "sentence_id": "s-2-2-5-3-2",
    "quote": "Racc(τ, y) = exp(−α · CER(τ, y)), where α is set to 2.0"
   },
   "kind": "number",
   "title": "α=2.0 的指数形状",
   "explanation": "exp(-2·CER) 意味着 CER 从 0% 涨到 50% 时奖励从 1 降到约 0.37，涨得越多惩罚越陡。这个 α=2.0 的取值让 GRPO 在低 CER 区间有很强的区分度（鼓励「接近正确」的假设继续微调），在高 CER 区间则趋近于 0、梯度信号弱。问题是：α 这个超参对最终行为的影响很大，但论文没给灵敏度分析——α 太小则低 CER 区分不开，太大则高 CER 样本得不到有效学习信号。复现时这是需要调的。",
   "featured": false
  },
  {
   "id": "ann-013",
   "anchor": {
    "sentence_id": "s-2-2-5-5-3",
    "quote": "Whenever a sample contains any important keyword, that keyword is included in the reward computation, regardless of whether it is provided in the prompt"
   },
   "kind": "critique",
   "title": "重要词的暗含先验",
   "explanation": "「重要关键词」无论是否在 prompt 里都纳入奖励——这意味着模型只要漏识别这些词就会被罚，即使上下文里根本没提示。这实际上是在用 RL 把一组人工挑选的词表硬编码进模型偏好里，跟「上下文 RAG」的精神有点背离。短期能提升榜单上这些词的召回，但代价是 LLM 可能学会「过度生成这些词」，特别是发音相近时。论文没披露这个词表的规模和挑选标准，是个值得追问的黑盒。",
   "featured": true
  },
  {
   "id": "ann-014",
   "anchor": {
    "sentence_id": "s-rl-training-framework-2-1",
    "quote": "we adopt a cosine-annealed temperature schedule for rollout sampling, gradually decaying from 1.0 to 0.7"
   },
   "kind": "engineering",
   "title": "温度退火连接训练与推理",
   "explanation": "RL rollout 用温度采样是为了多样性，但 ASR 推理时是确定性（贪心/beam search）解码——两者的分布不一致会让 RL 学到的策略在部署时打折扣。温度从 1.0 余弦退火到 0.7 的设计，是让训练后期 rollout 分布逐渐向推理时的低温度靠拢，缓解 train/test mismatch。这个细节常被忽略，但对最终上线效果影响很大。如果你的 RL-ASR 在验证集上好看、上线就掉点，先检查这个温度调度。",
   "featured": false
  },
  {
   "id": "ann-015",
   "anchor": {
    "sentence_id": "s-2-3-3-2",
    "quote": "we prepend and append short silence segments to the utterance prior to noise injection, where the duration of each silence segment is sampled from 0 to 1 second using a skewed Beta(1, 3) distribution"
   },
   "kind": "engineering",
   "title": "静音增强的分布选择",
   "explanation": "Beta(1, 3) 偏态分布意味着大多数静音段落在 0–0.3s 之间，少数接近 1s——这符合真实场景中「词间停顿远多于长静音」的分布。为什么不均匀采样？因为均匀分布会让模型见过过多长静音，反而浪费训练容量。这个增强对抑制幻觉至关重要：流式 chunk 中经常包含纯非语音帧，模型若没见过这种样本，就会在静音上编造文本。我们在 aireport 类短语音评测里也验证过类似现象——VAD 在预切分音频上反而有害，本质上就是静音处理的问题。",
   "featured": true
  },
  {
   "id": "ann-016",
   "anchor": {
    "sentence_id": "s-2-4-1-3-2",
    "quote": "The streaming encoder processes incoming speech with a chunk size of 640 ms"
   },
   "kind": "number",
   "title": "640ms chunk 的取舍",
   "explanation": "640ms 的 chunk 大小是流式延迟的核心参数：太小则声学上下文不足、识别不准；太大则首包延迟和假设刷新粒度变粗。NIM4 选 640ms 搭配缓存前 4 个 chunk 的左上下文（约 2.56s 上下文窗口），属于比较保守的选择。对比 Whisper.cpp 等端侧方案常用的 30s 窗口，以及千问、豆包等线上服务的 200–320ms chunk，NIM4 更偏向「准确率优先、延迟可接受」的路线——这跟车载场景的产品定位一致。",
   "featured": false
  },
  {
   "id": "ann-017",
   "anchor": {
    "sentence_id": "s-2-4-2-1-3",
    "quote": "restructured into a trie augmented with failure links using the Aho-Corasick automaton"
   },
   "kind": "comparison",
   "title": "为什么用 AC 自动机",
   "explanation": "热词检索的候选算法不少：N-gram 重打分、向量检索、编辑距离匹配、AC 自动机。NIM4 选 AC 自动机是因为它的检索复杂度只依赖查询长度、跟库大小无关——这正好匹配「百万级热词 + 亚毫秒延迟」的需求。向量检索在精度上更灵活但延迟不可控，编辑距离适合小词表但扩展性差，AC 自动机在「精确匹配」这个特定场景下是最优工程解。代价是完全无法容忍音素假设的任何错误——这是它配合「硬匹配策略」必须承担的风险。",
   "featured": false
  },
  {
   "id": "ann-018",
   "anchor": {
    "sentence_id": "s-2-4-2-3-3",
    "quote": "retrieval misses are often less harmful than retrieval errors, since the LLM can still recover the correct entity from internal linguistic knowledge and context"
   },
   "kind": "motivation",
   "title": "漏检好过错检",
   "explanation": "这句话是整个热词系统的设计哲学。传统检索追求高召回，但 NIM4 反着来：硬匹配、宁漏勿错。理由是 LLM 本身就有很强的实体识别能力，RAG 只是「锦上添花」，而不是「不可或缺」——漏检时模型退化为普通 LLM-ASR，效果仍然可用；但错检会把一个发音相近的错误实体强塞进 prompt，可能直接污染输出。这个判断的前提是底层模型足够强，对弱模型并不成立——这也是为什么 NIM4 的方案不能简单照搬到小模型上。",
   "featured": true
  },
  {
   "id": "ann-019",
   "anchor": {
    "sentence_id": "s-3-2-2-4-3",
    "quote": "By substantially increasing indomain data coverage, NIM4-ASR achieves more reliable recognition of vehicle control commands and in-car assistant knowledge"
   },
   "kind": "critique",
   "title": "优势有多少来自数据",
   "explanation": "作者自己承认了关键点：在车控、POI、媒体等基准上的巨大优势，「主要得益于充分的 in-domain 训练数据覆盖」。换句话说，Table 3 里那些压倒性数字（很多项目 CER 砍半甚至更多）很大程度上是数据优势，而非方法优势。这并不贬低工程价值——能把 in-domain 数据组织好并训出稳定模型本身就是硬功夫——但对读者的启示是：不要把这些数字当作「NIM4 方法比 Fun-ASR/Qwen3-ASR 强多少」的公平对比，真正的公平对比应该看 Table 2 公开基准。",
   "featured": true
  },
  {
   "id": "ann-020",
   "anchor": {
    "sentence_id": "s-3-2-4-2-3",
    "quote": "on Mandarin benchmarks, NIM4-ASR attains a hallucination rate of 0.002%, substantially below all baselines"
   },
   "kind": "number",
   "title": "0.002% 幻觉率的边界",
   "explanation": "0.002% 意味着 5 万个样本里只允许 1 个幻觉——这是个极低的数字。需要注意两点：第一，幻觉判定依赖「长度超参考 50% 且词面重叠极低」这个启发式阈值，阈值选择对数字影响很大；第二，作者主动剔除了 WeNetSpeech Net 等「短样本标注不可靠」的集合，理由是它们会抬高幻觉率——这个剔除合理但偏向有利方向。真实生产环境的幻觉率通常会高于论文报告值，部署前仍需自建压力测试集复核。",
   "featured": false
  },
  {
   "id": "ann-021",
   "anchor": {
    "sentence_id": "s-3-2-1-1-4",
    "quote": "The main exception is meeting-style benchmarks, such as WeNetSpeech Meeting, where it performs slightly worse than competing models"
   },
   "kind": "critique",
   "title": "会议场景的真实短板",
   "explanation": "作者把会议场景的落后归因于「不在主设计目标内」，这话没错，但有点避重就轻。真正的原因可能更深：NIM4 用 640ms chunk + 缓存前 4 chunk 的有限左上下文，本质上对长程声学依赖建模不足；同时它的上下文 SFT 是短语级而非对话级，长会议里的说话人跟踪、跨句一致性都做不好。这暴露的是「流式优先」架构在长音频上的结构性短板，不是简单补点数据就能解决的。如果业务需要会议转写，NIM4 不是合适选择。",
   "featured": false
  },
  {
   "id": "ann-022",
   "anchor": {
    "sentence_id": "s-5-1-4",
    "quote": "the gains brought by RL are not yet sufficiently stable"
   },
   "kind": "critique",
   "title": "RL 不稳定的潜台词",
   "explanation": "作者在局限里主动承认 RL 收益不稳定——这是非常诚实的披露。GRPO 在 ASR 上本来就不如数学/代码场景稳定：奖励是 CER 等连续值，方差大；K 个采样假设的多样性有限；KL 惩罚系数难调。这句话的潜台词是：论文里 Table 6 的 RL 收益可能是多次跑里挑的较好结果，迭代回归时波动会比较大。生产系统想复现这套 RL，需要做好奖励 shaping、多次重启、回滚机制——作者其实给了一个隐含的使用警告。",
   "featured": true
  }
 ]
};
