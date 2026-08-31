// 自动生成：2607.23938 全文双语精读数据（由 tools/compile_paper.js 装配）
// 结构/原文来自 .cache/papers/2607.23938.json（tools/extract_paper.py）；
// 翻译与讲解来自 .cache/papers/zh/2607.23938/（LLM agent 撰写）。
// 改翻译请改片段后重新装配；勿手改本文件的结构与 original 字段。
globalThis.PAPER_2607_23938 = {
 "paper_id": "2607.23938",
 "model_id": "qwen_audio_tts",
 "title": {
  "original": "Qwen-Audio-3.0-TTS: Freely Controllable and Highly Robust Speech Synthesis with Multi-Stage Training Paradigm",
  "zh": "Qwen-Audio-3.0-TTS：基于多阶段训练范式的自由可控、高鲁棒语音合成"
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
       "original": "(Equal contribution; alphabetical by given name.) Bajian Xiang, Cheng Wen, Han Zhao, Hao Wang, Haoxu Wang, Jiawei Jin, Jiayan Cui, Jie Chen, Mengxi Nie, Tianyu Zhao, Weiqin Li, Xiang Lv, Xiangang Li, Yang Xiang, Yang Zhou"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-alibaba-token-foundry",
   "num": null,
   "level": 2,
   "page": 1,
   "title": {
    "original": "Alibaba Token Foundry",
    "zh": "阿里巴巴 Token Foundry"
   },
   "blocks": [
    {
     "id": "p-alibaba-token-foundry-1",
     "type": "paragraph",
     "page": 1,
     "sentences": [
      {
       "id": "s-alibaba-token-foundry-1-1",
       "original": "Ð Demo Page",
       "zh": "Ð Demo 展示页面（原文首字符为 PDF 抽取残留的乱码符号）。"
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
       "original": "In this report, we present Qwen-Audio-3.0-TTS, a production-oriented speech synthesis system that jointly advances content consistency, speaker similarity, prosodic naturalness, audio quality, controllability, multilingual coverage, efficiency, and robustness.",
       "zh": "在本报告中，我们提出 Qwen-Audio-3.0-TTS，一个面向生产环境的语音合成系统，它在内容一致性、说话人相似度、韵律自然度、音频质量、可控性、多语言覆盖、效率与鲁棒性上协同推进。"
      },
      {
       "id": "s-abstract-1-2",
       "original": "It combines a 12.5 Hz low-frame-rate speech tokenizer for reduced inference latency with a five-stage progressive training paradigm for coordinated language model (LM) and flow-matching model (FM) optimization.",
       "zh": "它将 12.5 Hz 低帧率语音分词器（用于降低推理延迟）与五阶段渐进训练范式（用于协调语言模型 LM 与流匹配模型 FM 的优化）结合在一起。"
      },
      {
       "id": "s-abstract-1-3",
       "original": "The model provides production-level control through free-style natural-language instructions and fine-grained inline tags, while supporting 16 languages, 20 Chinese dialect regions, one-pass long-form synthesis up to 3 minutes, and robust generation from noisy, reverberant, or unclear reference speech.",
       "zh": "该模型通过自由形式的自然语言指令和细粒度行内标签提供生产级控制能力，同时支持 16 种语言、20 个汉语方言区、最长 3 分钟的单次长音频合成，以及从含噪、带混响或不清晰的参考语音中稳健生成。"
      },
      {
       "id": "s-abstract-1-4",
       "original": "Across SEED- TTS-Eval, CV3-Eval, instruction-following, long-form, and acoustic-robustness evaluations, Qwen-Audio-3.0-TTS achieves state-of-the-art performance on many reported dimensions or the strongest aggregate results.",
       "zh": "在 SEED-TTS-Eval、CV3-Eval、指令跟随、长音频与声学鲁棒性等多项评测中，Qwen-Audio-3.0-TTS 在所报告的大多数维度上达到 SOTA，或取得最强的综合结果。"
      },
      {
       "id": "s-abstract-1-5",
       "original": "It also ranks first on the independent Artificial Analysis Text-to-Speech Leaderboard.",
       "zh": "它还在独立的 Artificial Analysis 文本转语音榜单上排名第一。"
      },
      {
       "id": "s-abstract-1-6",
       "original": "These results establish Qwen-Audio-3.0-TTS as a strong foundation for production-level speech synthesis.",
       "zh": "这些结果表明，Qwen-Audio-3.0-TTS 是生产级语音合成的坚实基础。"
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
       "original": "Recent advances in large language models (LLMs), neural speech codecs, and diffusion/flow-based generative modeling have fundamentally reshaped text-to-speech (TTS) synthesis.",
       "zh": "大语言模型（LLM）、神经语音 codec 以及扩散/流式生成建模的最新进展，从根本上重塑了文本转语音（TTS）合成。"
      },
      {
       "id": "s-1-1-2",
       "original": "Modern zeroshot systems learn from large-scale multi-speaker corpora and can reproduce the timbre and speaking characteristics of an unseen reference speaker without target-speaker fine-tuning [1–4].",
       "zh": "现代零样本（zero-shot）系统从大规模多说话人语料中学习，无需针对目标说话人微调，就能复现未见过的参考说话人的音色与说话特征 [1–4]。"
      },
      {
       "id": "s-1-1-3",
       "original": "The field has consequently moved beyond basic intelligibility toward robust multilingual and crosslingual synthesis, fine-grained control of acoustic attributes, stable long-form generation, lowlatency streaming, and resilience to adverse prompt conditions.",
       "zh": "因此，该领域已经超越基本的可懂度，转向鲁棒的多语言与跨语言合成、声学属性的细粒度控制、稳定的长音频生成、低延迟流式合成，以及对恶劣提示条件的抵抗力。"
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
       "original": "The modern in-context TTS landscape can be summarized by four overlapping paradigms.",
       "zh": "现代上下文内（in-context）TTS 的格局可以归纳为四种相互重叠的范式。"
      },
      {
       "id": "s-1-2-2",
       "original": "Autoregressive discrete-token systems, established by VALL-E and subsequently developed by Spark-TTS and Qwen3-TTS, integrate naturally with language modeling and enable low-latency causal generation, but quantization can discard fine acoustic information and decoding cost grows with token rate [1, 5, 6].",
       "zh": "自回归离散 token 系统由 VALL-E 开创，随后被 Spark-TTS 和 Qwen3-TTS 发展，它们与语言建模天然契合、支持低延迟的因果生成，但量化可能丢失细粒度声学信息，且解码成本随 token 帧率增长 [1, 5, 6]。"
      },
      {
       "id": "s-1-2-3",
       "original": "Non-autoregressive continuous systems such as Voicebox, E2 TTS, and F5-TTS instead synthesize continuous acoustic representations through parallel diffusion or flow matching, providing high fidelity at the cost of iterative utterance-level sampling that can complicate streaming [3,7,8].",
       "zh": "以 Voicebox、E2 TTS 和 F5-TTS 为代表的非自回归（NAR）连续系统，则通过并行扩散或流匹配合成连续声学表征，以高保真度为代价，需要逐句迭代采样，这可能给流式合成带来麻烦 [3,7,8]。"
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
       "original": "Preprint.",
       "zh": "预印本。"
      }
     ]
    },
    {
     "id": "fig-1-1",
     "type": "figure_caption",
     "page": 2,
     "original": "Figure 1: Artificial Analysis Text-to-Speech Leaderboard snapshot on July 16, 2026.",
     "zh": "图 1：2026 年 7 月 16 日的 Artificial Analysis 文本转语音榜单快照。"
    },
    {
     "id": "p-1-4",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-1-4-1",
       "original": "Hybrid systems then combined autoregressive semantic planning with continuous acoustic generation.",
       "zh": "混合系统随后将自回归的语义规划与连续声学生成结合起来。"
      },
      {
       "id": "s-1-4-2",
       "original": "Seed-TTS is an early representative, while CosyVoice introduced a supervised semantic speech tokenizer; CosyVoice2 improved codebook utilization and unified streaming and non-streaming synthesis, and CosyVoice3 strengthened in-the-wild generation through multi-task supervision, scaling, and post-training [2,4,9,10].",
       "zh": "Seed-TTS 是早期代表，CosyVoice 引入了有监督的语义语音分词器；CosyVoice2 改进了码本利用率并统一了流式与非流式合成，CosyVoice3 则通过多任务监督、规模化与后训练强化了野外（in-the-wild）生成能力 [2,4,9,10]。"
      },
      {
       "id": "s-1-4-3",
       "original": "This design separates linguistic planning from detailed rendering, but a discrete single-codebook interface remains an information and optimization bottleneck.",
       "zh": "这种设计将语言规划与细节渲染分离，但离散的单码本接口仍然是信息与优化的瓶颈。"
      },
      {
       "id": "s-1-4-4",
       "original": "More recently, continuous-autoregressive systems such as DiTAR, Dots.TTS, and VoxCPM2 have modeled continuous latents patch by patch without an external speech tokenizer [11–13].",
       "zh": "更近的连续自回归系统，如 DiTAR、Dots.TTS 和 VoxCPM2，不依赖外部语音分词器，逐块（patch）对连续潜变量建模 [11–13]。"
      },
      {
       "id": "s-1-4-5",
       "original": "They avoid quantization loss, but high-dimensional next-step generation, iterative local sampling, and error propagation can make synthesis stability and long-form consistency more sensitive to model and sampling design.",
       "zh": "它们避免了量化损失，但高维的下一步生成、迭代式局部采样与误差传播，会使合成稳定性与长音频一致性对模型和采样设计更加敏感。"
      },
      {
       "id": "s-1-4-6",
       "original": "These paradigms therefore offer complementary trade-offs rather than a single universally dominant solution.",
       "zh": "因此，这些范式提供的是互补的权衡，而不是一个普遍占优的单一方案。"
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
       "original": "The remaining challenge is to deliver these strengths simultaneously in a production-grade system.",
       "zh": "剩下的挑战是：如何在一个生产级系统中同时交付这些优势。"
      },
      {
       "id": "s-1-5-2",
       "original": "A practical TTS model must preserve content and speaker identity, generate clean, expressive, and natural audio, follow flexible control requests, cover diverse languages and dialects, stream with low latency, and remain stable with noisy, reverberant, or bandwidth-limited prompts.",
       "zh": "一个实用的 TTS 模型必须保留内容与说话人身份，生成干净、富有表现力且自然的音频，遵循灵活的控制请求，覆盖多样的语言与方言，以低延迟流式输出，并在含噪、带混响或带宽受限的提示下保持稳定。"
      },
      {
       "id": "s-1-5-3",
       "original": "Standard shortform clean-speech benchmarks capture only part of these requirements and can obscure failures in multilingual, dialectal, long-form, and adverse acoustic conditions.",
       "zh": "标准的短音频干净语音基准只覆盖其中一部分需求，还可能掩盖多语言、方言、长音频与恶劣声学条件下的失败。"
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
       "original": "Qwen-Audio-3.0-TTS targets this complete quality–control–efficiency frontier in a single system.",
       "zh": "Qwen-Audio-3.0-TTS 的目标是在单一系统中同时触及这条完整的质量—控制—效率前沿。"
      },
      {
       "id": "s-1-6-2",
       "original": "Building on CosyVoice2 and CosyVoice3, it retains efficient semantic planning while conditioning the flow-matching acoustic renderer on continuous LM hidden states and jointly optimizing the LM and FM, thereby alleviating the information bottleneck of a token-only interface.",
       "zh": "在 CosyVoice2 和 CosyVoice3 的基础上，它保留了高效的语义规划，同时让流匹配声学渲染器以 LM 的连续隐状态为条件，并联合优化 LM 与 FM，从而缓解纯 token 接口的信息瓶颈。"
      },
      {
       "id": "s-1-6-3",
       "original": "A 12.5 Hz tokenizer reduces autoregressive decoding cost, while high-quality data annealing, robustness training, and LM/FM reinforcement learning address content accuracy, prosodic naturalness, voice fidelity, perceptual quality, and adverse-prompt robustness.",
       "zh": "12.5 Hz 分词器降低了自回归解码成本，而高质量数据退火、鲁棒性训练与 LM/FM 强化学习则分别解决内容准确性、韵律自然度、声音保真度、感知质量与恶劣提示鲁棒性。"
      },
      {
       "id": "s-1-6-4",
       "original": "The resulting model combines production-level control and broad linguistic coverage with efficient, stable generation.",
       "zh": "最终得到的模型把生产级可控性与广泛的语言覆盖结合在高效、稳定的生成之中。"
      },
      {
       "id": "s-1-6-5",
       "original": "Its key contributions are:",
       "zh": "其主要贡献如下："
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
       "original": "• Low-frame-rate speech tokenizer: A 12.5 Hz supervised speech tokenizer reduces autoregressive decoding cost while retaining content and speaker information.",
       "zh": "• 低帧率语音分词器：12.5 Hz 有监督语音分词器在保留内容与说话人信息的同时，降低了自回归解码成本。"
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
       "original": "• Progressive training paradigm: The training pipeline combines independent LM and FM pretraining, joint training with high-quality data annealing, LM reinforcement learning, FM robustness training, and FM reinforcement learning to improve content consistency, prosodic naturalness, voice fidelity, perceptual quality, and robustness.",
       "zh": "• 渐进训练范式：训练流水线结合了独立的 LM 与 FM 预训练、带高质量数据退火的联合训练、LM 强化学习、FM 鲁棒性训练与 FM 强化学习，以提升内容一致性、韵律自然度、声音保真度、感知质量与鲁棒性。"
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
       "original": "• Production-grade controllability: The model interprets free-style natural-language instructions describing role, emotion, speaking style, rate, timbre, and accent.",
       "zh": "• 生产级可控性：模型能理解描述角色、情感、说话风格、语速、音色与口音的自由形式自然语言指令。"
      },
      {
       "id": "s-1-9-2",
       "original": "In parallel, 86 newly added fine-grained inline tags enable localized control at phrase and word level, inzh en tl",
       "zh": "同时新增 86 个细粒度内联标签，支持短语级与词级的局部控制。（图 1：(a) 内容一致性（Content Consistency）与 (b) 说话人相似度（Speaker Similarity）——zh/en/tl/ja/ms/ko/vi/de/th/es/pt/fr/id/it/ar/ru 各语种对比 MiniMax-Speech-2.8-HD、ElevenLabs-v3、Dots.TTS-2B (SOAR)、VoxCPM2、Qwen3-TTS-12Hz-1.7B-Base 与 Qwen-Audio-3.0-TTS（本模型，两图均含，3.0/3.0）；刻度 1.45/4/8/12/16 与 90.76/80/70/60。）"
      }
     ]
    },
    {
     "id": "eq-1-1",
     "type": "equation",
     "page": 2,
     "original": "1.45 4"
    },
    {
     "id": "eq-1-2",
     "type": "equation",
     "page": 2,
     "original": "ja ms"
    },
    {
     "id": "eq-1-3",
     "type": "equation",
     "page": 2,
     "original": "8"
    },
    {
     "id": "eq-1-4",
     "type": "equation",
     "page": 2,
     "original": "ko vi"
    },
    {
     "id": "eq-1-5",
     "type": "equation",
     "page": 2,
     "original": "12 16"
    },
    {
     "id": "p-1-10",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-1-10-1",
       "original": "de th es pt fr id it ar ru MiniMax-Speech-2.8-HD ElevenLabs-v3 Dots.TTS-2B (SOAR) VoxCPM2 Qwen3-TTS-12Hz-1.7B-Base Qwen-Audio-3.0-TTS (a) Content Consistency. zh en tl",
       "zh": "同时新增 86 个细粒度内联标签，支持短语级与词级的局部控制。（图 1：(a) 内容一致性（Content Consistency）与 (b) 说话人相似度（Speaker Similarity）——zh/en/tl/ja/ms/ko/vi/de/th/es/pt/fr/id/it/ar/ru 各语种对比 MiniMax-Speech-2.8-HD、ElevenLabs-v3、Dots.TTS-2B (SOAR)、VoxCPM2、Qwen3-TTS-12Hz-1.7B-Base 与 Qwen-Audio-3.0-TTS（本模型，两图均含，3.0/3.0）；刻度 1.45/4/8/12/16 与 90.76/80/70/60。）"
      }
     ]
    },
    {
     "id": "eq-1-6",
     "type": "equation",
     "page": 2,
     "original": "90.76"
    },
    {
     "id": "eq-1-7",
     "type": "equation",
     "page": 2,
     "original": "ja ms"
    },
    {
     "id": "eq-1-8",
     "type": "equation",
     "page": 2,
     "original": "80 70"
    },
    {
     "id": "eq-1-9",
     "type": "equation",
     "page": 2,
     "original": "ko vi"
    },
    {
     "id": "eq-1-10",
     "type": "equation",
     "page": 2,
     "original": "60"
    },
    {
     "id": "p-1-11",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-1-11-1",
       "original": "de th es pt fr id it ar ru MiniMax-Speech-2.8-HD ElevenLabs-v3 Dots.TTS-2B (SOAR) VoxCPM2 Qwen3-TTS-12Hz-1.7B-Base Qwen-Audio-3.0-TTS (b) Speaker Similarity.",
       "zh": "同时新增 86 个细粒度内联标签，支持短语级与词级的局部控制。（图 1：(a) 内容一致性（Content Consistency）与 (b) 说话人相似度（Speaker Similarity）——zh/en/tl/ja/ms/ko/vi/de/th/es/pt/fr/id/it/ar/ru 各语种对比 MiniMax-Speech-2.8-HD、ElevenLabs-v3、Dots.TTS-2B (SOAR)、VoxCPM2、Qwen3-TTS-12Hz-1.7B-Base 与 Qwen-Audio-3.0-TTS（本模型，两图均含，3.0/3.0）；刻度 1.45/4/8/12/16 与 90.76/80/70/60。）"
      }
     ]
    },
    {
     "id": "fig-1-2",
     "type": "figure_caption",
     "page": 3,
     "original": "Figure 2: Multilingual comparison on the 16-language CV3-Eval benchmark. In both panels, farther from the center indicates better performance.",
     "zh": "图 2：16 语言 CV3-Eval 基准上的多语言对比。两个子图中，离中心越远表示性能越好。"
    },
    {
     "id": "p-1-12",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-1-12-1",
       "original": "cluding expressive transitions and non-verbal events such as laughter, breathing, coughing, and sighing.",
       "zh": "（接上句）包括表现力过渡以及笑声、呼吸、咳嗽、叹气等非语言事件。"
      }
     ]
    },
    {
     "id": "p-1-13",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-1-13-1",
       "original": "• Broad and robust deployment coverage: The model supports 16 languages, seven of them newly added, and 20 Chinese dialect regions; it handles hard text-normalization cases, one-pass synthesis up to 3 minutes, and degraded prompts without an explicit denoising mode.",
       "zh": "• 广泛而鲁棒的部署覆盖：模型支持 16 种语言（其中 7 种为新增）与 20 个汉语方言区；能处理困难的文本规整（text normalization）案例、最长 3 分钟的单次合成，以及无需显式去噪模式的退化提示。"
      },
      {
       "id": "s-1-13-2",
       "original": "A two-stage speaker-adaptation protocol and vocoder super-resolution further support target-voice adaptation and 48 kHz output.",
       "zh": "两阶段的说话人适配协议与声码器超分辨率进一步支持目标音色适配和 48 kHz 输出。"
      }
     ]
    },
    {
     "id": "p-1-14",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-1-14-1",
       "original": "• Comprehensive evaluation: We evaluate zero-shot voice cloning, multilingual and crosslingual synthesis, free-style instruction following, fine-grained control, text normalization, long-form generation, adverse-prompt robustness, and 20-dialect synthesis through objective benchmarks and arena-style human evaluation.",
       "zh": "• 全面评测：我们通过客观基准与竞技场式人工评测，评估零样本声音克隆、多语言与跨语言合成、自由形式指令跟随、细粒度控制、文本规整、长音频生成、恶劣提示鲁棒性与 20 种方言合成。"
      }
     ]
    },
    {
     "id": "fig-1-3",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "fig-1-3-s1",
       "original": "Figure 1 provides the snapshot of Artificial Analysis Text-to-Speech Arena leaderboard1 on July 16, 2026, which evaluates provider-native voices through blind pairwise preference tests with comparable gender and accent. The provider label Qwen-Audio-3.0-TTS-Plus corresponds to the model reported as Qwen-Audio-3.0-TTS in this paper. Qwen-Audio-3.0-TTS-Plus ranks first with an Elo score of 1,237 from 1,427 samples. It has a displayed rank range of 1–2, and its 95% confidence interval overlaps that of Simba 3.2; the leaderboard therefore places Qwen-Audio-3.0-TTS-Plus first by point estimate and within the statistically leading group.",
       "zh": "图 1 提供了 2026 年 7 月 16 日 Artificial Analysis 文本转语音竞技场榜单（见脚注 1）的快照，该榜单通过性别与口音可比的盲测成对偏好测试评估各提供商的原生音色。提供商标签 Qwen-Audio-3.0-TTS-Plus 对应本文所称的 Qwen-Audio-3.0-TTS 模型。Qwen-Audio-3.0-TTS-Plus 以 1,237 的 Elo 分数排名第一（样本量 1,427），显示名次区间为 1–2，其 95% 置信区间与 Simba 3.2 存在重叠；因此榜单按点估计将其列为第一，且它处于统计上的领先集团之内。"
      }
     ]
    },
    {
     "id": "p-1-15",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-1-15-1",
       "original": "In addition, extensive experiments demonstrate that Qwen-Audio-3.0-TTS has a favorable balance between content consistency, speaker similarity, prosodic naturalness, audio quality, and controllability.",
       "zh": "此外，大量实验表明 Qwen-Audio-3.0-TTS 在内容一致性、说话人相似度、韵律自然度、音频质量与可控性之间取得了良好的平衡。"
      },
      {
       "id": "s-1-15-2",
       "original": "It achieves the best or highly competitive aggregate results on SEED-TTS-Eval, CV3-Eval, instruction-following, long-form synthesis, and adverse-prompt evaluation.",
       "zh": "它在 SEED-TTS-Eval、CV3-Eval、指令跟随、长音频合成与恶劣提示评测上取得了最佳或极具竞争力的综合结果。"
      },
      {
       "id": "s-1-15-3",
       "original": "It obtains the best aggregate free-style instruction-following scores in both Chinese and English, while standard-mode inference remains competitive with systems using explicit denoising.",
       "zh": "它在中文和英文上都取得了最佳的自由形式指令跟随综合得分，同时其标准模式推理仍能与使用显式去噪的系统竞争。"
      },
      {
       "id": "s-1-15-4",
       "original": "Figure 2 visualizes the perlanguage CV3-Eval comparison among several competitive providers, with content consistency in Figure 2a and speaker similarity in Figure 2b.",
       "zh": "Figure 2 可视化了若干有竞争力的提供商在 CV3-Eval 上的逐语言对比，其中 Figure 2a 为内容一致性，Figure 2b 为说话人相似度。"
      }
     ]
    },
    {
     "id": "p-1-16",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-1-16-1",
       "original": "1https://artificialanalysis.ai/text-to-speech/leaderboard/provider-voice?tab=leaderboard",
       "zh": "1https://artificialanalysis.ai/text-to-speech/leaderboard/provider-voice?tab=leaderboard"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-2",
   "num": "2",
   "level": 1,
   "page": 4,
   "title": {
    "original": "Qwen-Audio-3.0-TTS",
    "zh": "Qwen-Audio-3.0-TTS"
   },
   "blocks": [
    {
     "id": "p-2-1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-2-1-1",
       "original": "Streaming Vocoder Legend Text / Instruction Token Mel Spectrogram DiT Flow-Matching Audio-Semantic (Codec) Token LM Hidden / Content Latent Channel Concatenation Noised Mel xₜ Prompt Mel Speaker Embedding Model / Module",
       "zh": "（图 2 架构标签：流式声码器（Streaming Vocoder）；图例：文本/指令 token、Mel 频谱、DiT Flow-Matching、音频-语义（Codec）token、LM Hidden/内容潜变量、通道拼接、Noised Mel xₜ、Prompt Mel、说话人嵌入、模型/模块。）"
      }
     ]
    },
    {
     "id": "eq-2-1",
     "type": "equation",
     "page": 4,
     "original": "…"
    },
    {
     "id": "p-2-2",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-2-2-1",
       "original": "Speaker Embedding (Broadcast)",
       "zh": "（图 2 标签：Speaker Embedding（广播）。）"
      }
     ]
    },
    {
     "id": "eq-2-2",
     "type": "equation",
     "page": 4,
     "original": "…"
    },
    {
     "id": "p-2-3",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-2-3-1",
       "original": "Prompt Mel (Partial)",
       "zh": "（图 2 标签：Prompt Mel（局部）。）"
      }
     ]
    },
    {
     "id": "eq-2-3",
     "type": "equation",
     "page": 4,
     "original": "…"
    },
    {
     "id": "p-2-4",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-2-4-1",
       "original": "Noised Mel xₜ",
       "zh": "（图 2 架构标签：流式声码器（Streaming Vocoder）；图例：文本/指令 token、Mel 频谱、DiT Flow-Matching、音频-语义（Codec）token、LM Hidden/内容潜变量、通道拼接、Noised Mel xₜ、Prompt Mel、说话人嵌入、模型/模块。）"
      }
     ]
    },
    {
     "id": "eq-2-4",
     "type": "equation",
     "page": 4,
     "original": "…"
    },
    {
     "id": "p-2-5",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-2-5-1",
       "original": "Upsampled Content Latent Latent Upsampling  (×r) Special Token (S / T / E) Qwen LM S",
       "zh": "（图 2 标签：上采样内容潜变量（Latent Upsampling ×r）；特殊 token（S/T/E）；Qwen LM；S ……）"
      }
     ]
    },
    {
     "id": "eq-2-5",
     "type": "equation",
     "page": 4,
     "original": "…"
    },
    {
     "id": "p-2-6",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-2-6-1",
       "original": "T",
       "zh": "在本报告中，我们提出 Qwen-Audio-3.0-TTS，一个面向生产环境的语音合成系统，它在内容一致性、说话人相似度、韵律自然度、音频质量、可控性、多语言覆盖、效率与鲁棒性上协同推进。"
      }
     ]
    },
    {
     "id": "eq-2-6",
     "type": "equation",
     "page": 4,
     "original": "…"
    },
    {
     "id": "eq-2-7",
     "type": "equation",
     "page": 4,
     "original": "…"
    },
    {
     "id": "p-2-7",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-2-7-1",
       "original": "E Autoregressive Codec Prediction",
       "zh": "（图 2 标签：E；自回归 Codec 预测（Autoregressive Codec Prediction）。）"
      }
     ]
    },
    {
     "id": "eq-2-8",
     "type": "equation",
     "page": 4,
     "original": "…"
    },
    {
     "id": "p-2-8",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-2-8-1",
       "original": "Instruction + Text Tokens Audio-Semantic (Codec) Tokens",
       "zh": "（此句为 Figure 3 架构图的图内文字抽取残留：流式声码器、文本/指令 token、Mel 频谱图、DiT 流匹配、音频-语义（codec）token、LM 隐状态/内容潜变量、通道拼接、加噪 Mel xₜ、提示 Mel、说话人嵌入等模块名与连接关系，以及 Qwen LM 自回归 codec 预测与特殊 token（S/T/E）的布局。）"
      }
     ]
    },
    {
     "id": "fig-2-1",
     "type": "figure_caption",
     "page": 4,
     "original": "Figure 3: Overall architecture of Qwen-Audio-3.0-TTS, comprising the language model, flowmatching model, and vocoder.",
     "zh": "图 3：Qwen-Audio-3.0-TTS 的整体架构，由语言模型、流匹配模型与声码器组成。"
    },
    {
     "id": "p-2-9",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-2-9-1",
       "original": "As shown in Figure 3, Qwen-Audio-3.0-TTS is built on a three-component synthesis architecture comprising a language model (LM) for semantic token prediction, a flow-matching model (FM) for acoustic feature reconstruction, and a causal BigVGAN vocoder [14] for waveform synthesis.",
       "zh": "如 Figure 3 所示，Qwen-Audio-3.0-TTS 建立在一个三组件合成架构之上：负责语义 token 预测的语言模型（LM）、负责声学特征重建的流匹配模型（FM），以及负责波形合成的因果 BigVGAN 声码器 [14]。"
      },
      {
       "id": "s-2-9-2",
       "original": "A 12.5 Hz low-frame-rate speech tokenizer reduces autoregressive decoding cost, while the progressive LM–FM training paradigm improves linguistic accuracy, acoustic fidelity, controllability, and robustness.",
       "zh": "12.5 Hz 低帧率语音分词器降低了自回归解码成本，而渐进式 LM–FM 训练范式则提升了语言准确性、声学保真度、可控性与鲁棒性。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-2-1",
   "num": "2.1",
   "level": 2,
   "page": 4,
   "title": {
    "original": "Low-Frame-Rate Speech Tokenizer",
    "zh": "2.1 低帧率语音分词器"
   },
   "blocks": [
    {
     "id": "p-2-1-1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-2-1-1-1",
       "original": "As shown in Figure 4, the tokenizer follows the supervised design of CosyVoice3 [4]: a causal SenseVoice encoder [15] and Finite Scalar Quantization (FSQ) [16] are integrated into a multi-task voice-encoder pipeline inspired by MinMo [17].",
       "zh": "如 Figure 4 所示，分词器沿用 CosyVoice3 [4] 的有监督设计：因果 SenseVoice 编码器 [15] 与有限标量量化（FSQ）[16] 被整合进一条受 MinMo [17] 启发的多任务语音编码器流水线。"
      },
      {
       "id": "s-2-1-1-2",
       "original": "It maps Mel features to 12.5 Hz discrete tokens and learns the representation through supervised ASR, language, emotion, audio-event, speaker, and general audio-analysis tasks.",
       "zh": "它将 Mel 特征映射为 12.5 Hz 离散 token，并通过有监督的 ASR、语言、情感、音频事件、说话人与通用音频分析任务来学习表征。"
      }
     ]
    },
    {
     "id": "p-2-1-2",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-2-1-2-1",
       "original": "The encoder progressively downsamples the Mel sequence before quantization, and a corresponding decoder reconstructs an intermediate representation for multi-task supervision.",
       "zh": "编码器在量化之前对 Mel 序列逐步下采样，对应的解码器则重建一个中间表征用于多任务监督。"
      },
      {
       "id": "s-2-1-2-2",
       "original": "This supervised bottleneck encourages the discrete tokens to retain linguistic content together with speaker, emotion, and acoustic-event information useful for speech generation.",
       "zh": "这种有监督瓶颈促使离散 token 同时保留语言内容，以及对语音生成有用的说话人、情感与声学事件信息。"
      },
      {
       "id": "s-2-1-2-3",
       "original": "Training follows a continuousto-quantized curriculum: the model first learns a stable continuous representation and subsequently activates FSQ to obtain discrete tokens.",
       "zh": "训练遵循「先连续后量化」的课程：模型先学习稳定的连续表征，随后再激活 FSQ 以获得离散 token。"
      }
     ]
    },
    {
     "id": "p-2-1-3",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-2-1-3-1",
       "original": "Relative to CosyVoice3, we reduce the token rate from 25 to 12.5 Hz, substantially shortening the autoregressive sequence.",
       "zh": "相对 CosyVoice3，我们将 token 帧率从 25 降至 12.5 Hz，大幅缩短了自回归序列长度。"
      },
      {
       "id": "s-2-1-3-2",
       "original": "A higher-capacity quantization space and broader audio-analysis supervision compensate for the stronger temporal compression, balancing generation efficiency with representation capacity.",
       "zh": "更高容量的量化空间与更广泛的音频分析监督弥补了更强的时间压缩，在生成效率与表征容量之间取得平衡。"
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
    "original": "Multi-Stage Progressive Training Paradigm",
    "zh": "2.2 多阶段渐进训练范式"
   },
   "blocks": [
    {
     "id": "p-2-2-1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-2-2-1-1",
       "original": "Qwen-Audio-3.0-TTS uses five progressive stages: independent LM and FM pretraining, joint LM– FM training with high-quality data annealing, LM reinforcement learning, FM robustness training, 12.5 Hz 12.5 Hz Quantizer Encoder 25 Hz Voice Encoder-1 100 Hz FSQ Quantizer Decoder 25 Hz Voice Encoder-2 MinMo LLM ASR LID SER AED SA AA",
       "zh": "Qwen-Audio-3.0-TTS 采用五个渐进阶段：独立的 LM 与 FM 预训练、带高质量数据退火的 LM–FM 联合训练、LM 强化学习、FM 鲁棒性训练（句末穿插的 12.5 Hz、25 Hz、100 Hz、Encoder-1、Encoder-2 及 FSQ、MinMo LLM、ASR、LID、SER、AED、SA、AA 等字样为 Figure 4 分词器结构图的抽取残留），"
      }
     ]
    },
    {
     "id": "fig-2-2-1",
     "type": "figure_caption",
     "page": 5,
     "original": "Figure 4: Architecture of the proposed supervised speech tokenizer. The tokenizer is optimized using a multi-task supervised learning objective encompassing automatic speech recognition (ASR), language identification (LID), speech emotion recognition (SER), audio event detection (AED), speaker analysis (SA), and broader audio analysis (AA) tasks.",
     "zh": "图 4：所提出的有监督语音分词器架构。分词器以多任务监督学习目标进行优化，涵盖自动语音识别（ASR）、语种识别（LID）、语音情感识别（SER）、音频事件检测（AED）、说话人分析（SA）与更广义的音频分析（AA）任务。"
    },
    {
     "id": "p-2-2-2",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-2-2-2-1",
       "original": "and FM reinforcement learning.",
       "zh": "以及 FM 强化学习。"
      },
      {
       "id": "s-2-2-2-2",
       "original": "Each stage starts from the preceding checkpoint and targets the capabilities most directly controlled by the corresponding module.",
       "zh": "每个阶段都从前一阶段的检查点出发，针对由相应模块最直接控制的能力进行优化。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-2-2-1",
   "num": "2.2.1",
   "level": 2,
   "page": 5,
   "title": {
    "original": "Independent Pretraining of LM and FM",
    "zh": "2.2.1 LM 与 FM 的独立预训练"
   },
   "blocks": [
    {
     "id": "p-2-2-1-1",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-2-2-1-1-1",
       "original": "The first stage follows the same decoupled LM–FM training recipe as our previous work, CosyVoice2 [10] and CosyVoice3 [4].",
       "zh": "第一阶段沿用我们此前工作 CosyVoice2 [10] 与 CosyVoice3 [4] 中相同的 LM–FM 解耦训练方案。"
      },
      {
       "id": "s-2-2-1-1-2",
       "original": "The bi-streaming language model and the chunk-based flowmatching model are pretrained independently on large-scale, diverse speech data.",
       "zh": "双流式语言模型与基于片段（chunk）的流匹配模型在大规模、多样化的语音数据上独立预训练。"
      },
      {
       "id": "s-2-2-1-1-3",
       "original": "The LM learns to predict the discrete semantic tokens produced by the speech tokenizer from the text and prompt context, thereby establishing robust content modeling and semantic planning capabilities.",
       "zh": "LM 学习根据文本与提示上下文预测语音分词器产生的离散语义 token，从而建立稳健的内容建模与语义规划能力。"
      },
      {
       "id": "s-2-2-1-1-4",
       "original": "In parallel, the FM learns to reconstruct continuous acoustic features from tokenizer-derived discrete tokens, establishing a reliable mapping from quantized semantic representations to mel-spectrograms.",
       "zh": "与此同时，FM 学习从分词器导出的离散 token 重建连续声学特征，建立从量化语义表征到 Mel 频谱图的可靠映射。"
      }
     ]
    },
    {
     "id": "p-2-2-1-2",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-2-2-1-2-1",
       "original": "This independent pretraining provides a stable initialization for both components before they are coupled.",
       "zh": "这种独立预训练在两个组件耦合之前为它们提供了稳定的初始化。"
      },
      {
       "id": "s-2-2-1-2-2",
       "original": "It also preserves the modularity of the Cascade system: the LM can be scaled to improve linguistic and semantic modeling, while the FM can focus on acoustic fidelity and speaker reconstruction.",
       "zh": "它还保留了级联（Cascade）系统的模块化：LM 可以规模化以提升语言与语义建模，FM 则专注于声学保真度与说话人重建。"
      },
      {
       "id": "s-2-2-1-2-3",
       "original": "The training data covers general speech, multilingual and dialect speech, and instructionfollowing data, providing broad coverage of languages, speakers, and speaking styles.",
       "zh": "训练数据覆盖通用语音、多语言与方言语音以及指令跟随数据，提供了语言、说话人与说话风格的广泛覆盖。"
      },
      {
       "id": "s-2-2-1-2-4",
       "original": "The resulting LM and FM checkpoints together form the first-stage Cascade model and are used to initialize the joint-training stage described below.",
       "zh": "得到的 LM 与 FM 检查点共同构成第一阶段的级联模型，并用于初始化下文所述的联合训练阶段。"
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
    "original": "Joint LM-FM Training with High-Quality Data Annealing",
    "zh": "2.2.2 带高质量数据退火的 LM–FM 联合训练"
   },
   "blocks": [
    {
     "id": "p-2-2-2-1",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-2-2-2-1-1",
       "original": "The second stage starts from the first-stage Cascade checkpoint and couples the pretrained LM and FM for end-to-end optimization.",
       "zh": "第二阶段从第一阶段的级联检查点出发，将预训练的 LM 与 FM 耦合进行端到端优化。"
      },
      {
       "id": "s-2-2-2-1-2",
       "original": "In alignment with the methodology of JoyVoice [18], we condition the FM on continuous hidden states produced by the LM instead of discrete token embeddings.",
       "zh": "与 JoyVoice [18] 的方法一致，我们让 FM 以 LM 产生的连续隐状态为条件，而不是离散 token 嵌入。"
      },
      {
       "id": "s-2-2-2-1-3",
       "original": "The semantic-token prediction path is retained, while the LM token-prediction objective and the FM flow-matching objective are optimized jointly.",
       "zh": "语义 token 预测路径被保留，LM 的 token 预测目标与 FM 的流匹配目标被联合优化。"
      },
      {
       "id": "s-2-2-2-1-4",
       "original": "Consequently, the FM reconstruction loss can also shape the upstream LM representations through the shared hidden-state path.",
       "zh": "因此，FM 的重建损失也能通过共享的隐状态路径反向塑造上游 LM 的表征。"
      }
     ]
    },
    {
     "id": "p-2-2-2-2",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-2-2-2-2-1",
       "original": "This design reduces the information bottleneck introduced by discrete token quantization and mitigates the optimization mismatch between independently trained components.",
       "zh": "这一设计减少了离散 token 量化带来的信息瓶颈，并缓解了独立训练组件之间的优化错配。"
      },
      {
       "id": "s-2-2-2-2-2",
       "original": "Compared with token IDs alone, the continuous LM hidden states preserve richer context that is useful for content realization, prosody, speaker characteristics, and instruction following.",
       "zh": "与单独的 token ID 相比，连续的 LM 隐状态保留了更丰富的上下文，对内容呈现、韵律、说话人特征与指令跟随都很有用。"
      },
      {
       "id": "s-2-2-2-2-3",
       "original": "The FM can therefore exploit information that may not be fully represented by the discrete code sequence, while the token-prediction objective continues to provide a stable semantic learning signal.",
       "zh": "因此 FM 能利用离散码序列可能无法完整表示的信息，而 token 预测目标继续提供稳定的语义学习信号。"
      },
      {
       "id": "s-2-2-2-2-4",
       "original": "Instead of treating joint optimization as an isolated training setup in JoyVoice, our training schedule is progressive: it explicitly initializes joint training from the independently pretrained Cascade model.",
       "zh": "与 JoyVoice 将联合优化作为一个独立训练设置不同，我们的训练日程是渐进式的：它显式地从独立预训练的级联模型初始化联合训练。"
      }
     ]
    },
    {
     "id": "p-2-2-2-3",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-2-2-2-3-1",
       "original": "Joint training first uses the broad-coverage data mixture to establish LM–FM alignment across languages, speakers, and styles.",
       "zh": "联合训练首先使用广覆盖的数据混合，在语言、说话人与风格之间建立 LM–FM 对齐。"
      },
      {
       "id": "s-2-2-2-3-2",
       "original": "After this alignment has stabilized, training is annealed to a carefully curated high-quality subset containing cleaner and more expressive speech.",
       "zh": "在对齐稳定之后，训练退火到一个精心筛选的高质量子集，其中包含更干净、更具表现力的语音。"
      },
      {
       "id": "s-2-2-2-3-3",
       "original": "Introducing this narrower distribution only in the later phase allows the model to retain the coverage learned from large-scale data while placing greater emphasis on acoustic fidelity, naturalness, expressiveness, and reliable instruction realization.",
       "zh": "只在后期引入这一更窄的分布，使模型既能保留从大规模数据中学到的覆盖面，又能把更多权重放在声学保真度、自然度、表现力与可靠的指令实现上。"
      },
      {
       "id": "s-2-2-2-3-4",
       "original": "Together, hidden-state conditioning and high-quality data annealing improve content consistency, prosodic detail, and end-to-end controllability.",
       "zh": "隐状态条件化与高质量数据退火共同提升了内容一致性、韵律细节与端到端可控性。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-2-2-3",
   "num": "2.2.3",
   "level": 2,
   "page": 6,
   "title": {
    "original": "Language Model Reinforcement Learning",
    "zh": "2.2.3 语言模型强化学习"
   },
   "blocks": [
    {
     "id": "p-2-2-3-1",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-2-2-3-1-1",
       "original": "Starting from the jointly trained checkpoint, we optimize the autoregressive text-to-token LM while freezing the downstream FM and vocoder.",
       "zh": "从联合训练的检查点出发，我们优化自回归的文本到 token LM，同时冻结下游的 FM 与声码器。"
      },
      {
       "id": "s-2-2-3-1-2",
       "original": "Online Group Relative Policy Optimization (GRPO) [19], regularized by a KL penalty to a frozen reference policy, compares groups of token rollouts under a composite reward that balances content consistency, duration robustness, generation diversity, and prosodic naturalness:",
       "zh": "在线组相对策略优化（GRPO）[19] 以针对冻结参考策略的 KL 惩罚为正则，在一个平衡内容一致性、时长鲁棒性、生成多样性与韵律自然度的复合奖励下，比较成组的 token 采样结果："
      }
     ]
    },
    {
     "id": "eq-2-2-3-1",
     "type": "equation",
     "page": 6,
     "original": "Rbase,i = λcontentRcontent,i + λdurRdur,i + λdivRdiv,i + λprosodyRprosody,i. (1)"
    },
    {
     "id": "p-2-2-3-2",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-2-2-3-2-1",
       "original": "The content term is obtained from token-domain ASR; the duration term suppresses length outliers; the diversity term discourages mechanical collapse; and the prosody term rewards plausible alignment progression and pause timing.",
       "zh": "内容项来自 token 域的 ASR；时长项抑制时长异常值；多样性项抑制机械性塌缩；韵律项奖励合理的对齐推进与停顿时机。"
      },
      {
       "id": "s-2-2-3-2-2",
       "original": "All rewards are computed before FM and vocoder inference, enabling efficient token-only rollouts.",
       "zh": "所有奖励都在 FM 与声码器推理之前计算，从而实现高效的纯 token 采样。"
      }
     ]
    },
    {
     "id": "p-2-2-3-3",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-2-2-3-3-1",
       "original": "We additionally use a differentiable DiffRO branch [4] based on Gumbel–Softmax [20].",
       "zh": "我们还额外使用了一个基于 Gumbel–Softmax [20] 的可微 DiffRO 分支 [4]。"
      },
      {
       "id": "s-2-2-3-3-2",
       "original": "To stabilize optimization, extreme anomalous rollouts, such as repetitions or missing stop tokens, are excluded from GRPO updates; DiffRO is further restricted to candidates with non-negative group-relative advantages: LRL = LGRPO + λdiffL+ DiffRO.",
       "zh": "为稳定优化，诸如重复或缺失结束 token 等极端异常样本被排除在 GRPO 更新之外；DiffRO 进一步被限制在组相对优势非负的候选上：LRL = LGRPO + λdiffL+ DiffRO。"
      }
     ]
    },
    {
     "id": "eq-2-2-3-2",
     "type": "equation",
     "page": 6,
     "original": "(2)"
    },
    {
     "id": "p-2-2-3-4",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-2-2-3-4-1",
       "original": "GRPO supplies sequence-level relative preference, whereas DiffRO supplies selected token-level corrective gradients.",
       "zh": "（式 2）GRPO 提供序列级相对偏好，而 DiffRO 提供选定 token 级的矫正梯度。"
      },
      {
       "id": "s-2-2-3-4-2",
       "original": "LM reinforcement learning follows a two-phase curriculum: general generation optimization first excludes instruction-following, fine-grained-control, and dialect samples to avoid optimizing attributes not captured by the base reward; subsequent multi-task alignment adds dialect-classification correctness as an attribute reward, improving dialect authenticity while preserving the general synthesis robustness acquired during the first phase.",
       "zh": "LM 强化学习遵循两阶段课程：通用生成优化先排除指令跟随、细粒度控制与方言样本，以避免优化基础奖励未能刻画的属性；随后的多任务对齐加入方言分类正确性作为属性奖励，在保留第一阶段获得的通用合成鲁棒性的同时提升方言真实度。"
      },
      {
       "id": "s-2-2-3-4-3",
       "original": "With suitable attribute supervision, the same framework can be extended to instruction following and fine-grained control.",
       "zh": "配合合适的属性监督，同一框架可以扩展到指令跟随与细粒度控制。"
      },
      {
       "id": "s-2-2-3-4-4",
       "original": "The resulting curriculum goes beyond WER-only optimization and balances accuracy, naturalness, and controllability.",
       "zh": "最终的课程超越了只优化 WER 的做法，平衡了准确性、自然度与可控性。"
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
    "original": "Acoustic Robustness Training with Frozen LM",
    "zh": "2.2.4 冻结 LM 的声学鲁棒性训练"
   },
   "blocks": [
    {
     "id": "p-2-2-4-1",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-2-2-4-1-1",
       "original": "Real-world prompts may be noisy, reverberant, bandwidth-limited, or recorded by low-quality devices.",
       "zh": "真实世界的提示语音可能是含噪的、带混响的、带宽受限的，或由低质量设备录制的。"
      },
      {
       "id": "s-2-2-4-1-2",
       "original": "During the fourth stage, the LM is frozen and the FM is trained to recover clean, high-quality speech from degraded prompts while preserving timbre.",
       "zh": "在第四阶段，LM 被冻结，FM 被训练为从退化的提示中恢复干净、高质量的语音，同时保留音色。"
      },
      {
       "id": "s-2-2-4-1-3",
       "original": "The augmentation pool includes additive noise and reverberation; phone, Bluetooth, and laptop-microphone responses; far-field recording; physical blockage such as masks or hands over the microphone; codec, DAC, and amplifier artifacts; packet loss; strong echo; and compound settings such as noisy far-field meeting rooms or noise mixed with electronic distortion.",
       "zh": "增广池包括加性噪声与混响；电话、蓝牙与笔记本麦克风响应；远场录音；口罩或手遮挡麦克风等物理阻挡；codec、DAC 与放大器伪影；丢包；强回声；以及噪声远场会议室、噪声混合电子失真等复合场景。"
      },
      {
       "id": "s-2-2-4-1-4",
       "original": "Sampling these conditions during training integrates prompt enhancement into the cloning path rather than relying on a separate inference-time denoiser.",
       "zh": "在训练中采样这些条件，把提示增强整合进克隆路径内部，而不是依赖一个独立的推理时去噪器。"
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
    "original": "Flow-Matching Reinforcement Learning",
    "zh": "2.2.5 流匹配强化学习"
   },
   "blocks": [
    {
     "id": "p-2-2-5-1",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-2-2-5-1-1",
       "original": "The fifth stage applies FlowTTS-GRPO [21–23] to the FM, targeting speaker similarity and perceptual quality while the LM remains fixed.",
       "zh": "第五阶段对 FM 应用 FlowTTS-GRPO [21–23]，在 LM 保持固定的情况下优化说话人相似度与感知质量。"
      },
      {
       "id": "s-2-2-5-1-2",
       "original": "We convert deterministic ODE sampling xt+∆t = xt + vθ(xt, t)∆t into a marginal-preserving SDE sampler for on-policy exploration:",
       "zh": "我们将确定性 ODE 采样 xt+∆t = xt + vθ(xt, t)∆t 转换为一个保持边缘分布的 SDE 采样器，以进行在策略（on-policy）探索："
      }
     ]
    },
    {
     "id": "eq-2-2-5-1",
     "type": "equation",
     "page": 6,
     "original": "r"
    },
    {
     "id": "eq-2-2-5-2",
     "type": "equation",
     "page": 6,
     "original": "∆t ϵ, σt = a"
    },
    {
     "id": "eq-2-2-5-3",
     "type": "equation",
     "page": 6,
     "original": "xt+∆t = xt,mean + σt √"
    },
    {
     "id": "eq-2-2-5-4",
     "type": "equation",
     "page": 6,
     "original": "1 −t"
    },
    {
     "id": "eq-2-2-5-5",
     "type": "equation",
     "page": 6,
     "original": "t , ϵ ∼N(0, I), (3)"
    },
    {
     "id": "p-2-2-5-2",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-2-2-5-2-1",
       "original": "xt,mean = xt + vθ(xt, t) +",
       "zh": "（公式：x_{t,mean} = x_t + [v_θ(x_t, t) + σ²_t/(2(1 −t))·(−x_t + t·v_θ(x_t, t))]·∆t（式 4），其中 v_θ 为以 LM 隐藏态、提示 mel 特征与说话人嵌入为条件的速度场，a 控制探索强度。）"
      }
     ]
    },
    {
     "id": "eq-2-2-5-6",
     "type": "equation",
     "page": 6,
     "original": "σ2"
    },
    {
     "id": "p-2-2-5-3",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-2-2-5-3-1",
       "original": "t 2(1 −t) (−xt + t vθ(xt, t)) ∆t,",
       "zh": "（公式：x_{t,mean} = x_t + [v_θ(x_t, t) + σ²_t/(2(1 −t))·(−x_t + t·v_θ(x_t, t))]·∆t（式 4），其中 v_θ 为以 LM 隐藏态、提示 mel 特征与说话人嵌入为条件的速度场，a 控制探索强度。）"
      }
     ]
    },
    {
     "id": "eq-2-2-5-7",
     "type": "equation",
     "page": 6,
     "original": "(4)"
    },
    {
     "id": "p-2-2-5-4",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-2-2-5-4-1",
       "original": "where vθ is the velocity field conditioned on LM hidden states, prompt mel features, and the speaker embedding, and a controls exploration intensity.",
       "zh": "（公式：x_{t,mean} = x_t + [v_θ(x_t, t) + σ²_t/(2(1 −t))·(−x_t + t·v_θ(x_t, t))]·∆t（式 4），其中 v_θ 为以 LM 隐藏态、提示 mel 特征与说话人嵌入为条件的速度场，a 控制探索强度。）"
      },
      {
       "id": "s-2-2-5-4-2",
       "original": "For each prompt, G waveforms are sampled and the reward is normalized within the group:",
       "zh": "对每个提示，采样 G 条波形，奖励在组内归一化："
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
       "original": "ˆAi = R(ˆxi 1, c) −mean{R(ˆxj 1, c)}G j=1 std{R(ˆxj 1, c)}G j=1",
       "zh": "ˆAi = R(ˆxi 1, c) −mean{R(ˆxj 1, c)}G j=1 std{R(ˆxj 1, c)}G j=1。其中 ˆxi 1 是第 i 条终止波形，c 包含其条件输入。"
      }
     ]
    },
    {
     "id": "eq-2-2-5-8",
     "type": "equation",
     "page": 7,
     "original": "."
    },
    {
     "id": "eq-2-2-5-9",
     "type": "equation",
     "page": 7,
     "original": "(5)"
    },
    {
     "id": "p-2-2-5-6",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-2-2-5-6-1",
       "original": "where ˆxi 1 is the i-th terminal waveform and c contains its conditioning inputs.",
       "zh": "（公式片段，式 5：……其中 x̂^i_1 为第 i 个终端波形，c 包含其条件输入。）"
      },
      {
       "id": "s-2-2-5-6-2",
       "original": "The reward combines speaker-verification similarity (SS), ASR intelligibility, and DNSMOS quality, each standardized by its per-batch standard deviation:",
       "zh": "奖励结合了说话人验证相似度（SS）、ASR 可懂度与 DNSMOS 质量，每一项都按其批内标准差标准化："
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
       "original": "R = λ1 RSS std(RSS) + λ2 RASR std(RASR) + λ3 RMOS std(RMOS),",
       "zh": "（公式：R = λ1·R_SS/std(R_SS) + λ2·R_ASR/std(R_ASR) + λ3·R_MOS/std(R_MOS)（式 6），使 λ1、λ2、λ3 表达预期的目标配比而非原始奖励方差。）"
      }
     ]
    },
    {
     "id": "eq-2-2-5-10",
     "type": "equation",
     "page": 7,
     "original": "(6)"
    },
    {
     "id": "p-2-2-5-8",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-2-2-5-8-1",
       "original": "so that λ1, λ2, and λ3 express the intended objective balance rather than raw reward variance.",
       "zh": "（公式：R = λ1·R_SS/std(R_SS) + λ2·R_ASR/std(R_ASR) + λ3·R_MOS/std(R_MOS)（式 6），使 λ1、λ2、λ3 表达预期的目标配比而非原始奖励方差。）"
      },
      {
       "id": "s-2-2-5-8-2",
       "original": "SDE exploration and policy optimization are restricted to an early-step window while later steps revert to the ODE, and classifier-free guidance [24] is omitted during training rollouts to widen exploration.",
       "zh": "SDE 探索与策略优化被限制在早期步窗口内，后续步回到 ODE；训练采样期间省略无分类器引导（classifier-free guidance）[24] 以扩大探索范围。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-2-3",
   "num": "2.3",
   "level": 2,
   "page": 7,
   "title": {
    "original": "Speaker Adaptation",
    "zh": "2.3 说话人适配"
   },
   "blocks": [
    {
     "id": "p-2-3-1",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-2-3-1-1",
       "original": "Speaker adaptation follows a two-stage supervised fine-tuning (SFT) procedure.",
       "zh": "说话人适配遵循两阶段的监督微调（SFT）流程。"
      },
      {
       "id": "s-2-3-1-2",
       "original": "Stage 1 jointly fine-tunes the LM and FM through chained adaptation rounds.",
       "zh": "第 1 阶段（Stage 1）通过链式适配轮次联合微调 LM 与 FM。"
      },
      {
       "id": "s-2-3-1-3",
       "original": "In each round, the complete targetspeaker set is paired with a refreshed replay subset matched by effective audio duration, maintaining broad linguistic and expressive coverage during adaptation.",
       "zh": "在每一轮中，完整的目标说话人集合与一个按有效音频时长匹配、不断刷新的回放（replay）子集配对，以在适配期间维持广泛的语言与表现力覆盖。"
      },
      {
       "id": "s-2-3-1-4",
       "original": "Stage 2 freezes the LM and refines the FM using target-speaker speech only, focusing the final update on speaker characteristics and local prosody.",
       "zh": "第 2 阶段（Stage 2）冻结 LM，只用目标说话人语音精炼 FM，把最后的更新聚焦在说话人特征与局部韵律上。"
      }
     ]
    },
    {
     "id": "p-2-3-2",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-2-3-2-1",
       "original": "A SFT-oriented super-resolution vocoder is trained to generate 48 kHz waveforms for richer harmonic detail and timbral expression.",
       "zh": "一个面向 SFT 的超分辨率声码器被训练用于生成 48 kHz 波形，以获得更丰富的谐波细节与音色表现力。"
      }
     ]
    },
    {
     "id": "p-2-3-3",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-2-3-3-1",
       "original": "A multi-scale short-time Fourier transform discriminator supplies adversarial supervision at several time–frequency resolutions and reduces stripe-like highfrequency artifacts.",
       "zh": "多尺度短时傅里叶变换判别器在多个时间–频率分辨率上提供对抗监督，并减少条状高频伪影。"
      },
      {
       "id": "s-2-3-3-2",
       "original": "Noise injected during training exposes the vocoder to imperfect upstream acoustic features and reduces the mismatch between ground-truth features used in training and predicted features encountered at inference.",
       "zh": "训练期间注入的噪声让声码器见到不完美的上游声学特征，减少训练所用真值特征与推理时遇到的预测特征之间的失配。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-3",
   "num": "3",
   "level": 1,
   "page": 7,
   "title": {
    "original": "Experimental Settings",
    "zh": "3 实验设置"
   },
   "blocks": []
  },
  {
   "id": "sec-3-1",
   "num": "3.1",
   "level": 2,
   "page": 7,
   "title": {
    "original": "Speech Tokenizer",
    "zh": "3.1 语音分词器"
   },
   "blocks": [
    {
     "id": "p-3-1-1",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-3-1-1-1",
       "original": "The tokenizer follows the architecture in Section 2.1.",
       "zh": "分词器遵循 2.1 节的架构。"
      },
      {
       "id": "s-3-1-1-2",
       "original": "It consumes 16 kHz audio through a Whisperstyle frontend with 128 Mel-frequency bins, producing features at 100 Hz.",
       "zh": "它通过 Whisper 风格的前端处理 16 kHz 音频，使用 128 个 Mel 频带，产生 100 Hz 的特征。"
      },
      {
       "id": "s-3-1-1-3",
       "original": "Its causal SenseVoice encoder contains 32 Transformer layers with 1280 hidden dimensions and 20 attention heads.",
       "zh": "其因果 SenseVoice 编码器包含 32 层 Transformer，隐藏维度 1280，注意力头数 20。"
      },
      {
       "id": "s-3-1-1-4",
       "original": "The initial 12-layer Voice Encoder-1 uses rotary positional embeddings (RoPE) [25] and downsamples the sequence to a 25 Hz representation H1.",
       "zh": "前 12 层的 Voice Encoder-1 使用旋转位置嵌入（RoPE）[25]，将序列下采样为 25 Hz 表征 H1。"
      },
      {
       "id": "s-3-1-1-5",
       "original": "A Quantizer Encoder then reduces both temporal and feature resolution to obtain Hen at 12.5 Hz.",
       "zh": "随后 Quantizer Encoder 同时降低时间与特征分辨率，得到 12.5 Hz 的 Hen。"
      }
     ]
    },
    {
     "id": "p-3-1-2",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-3-1-2-1",
       "original": "A 10-dimensional FSQ bottleneck, inserted after encoder layer 11, uses three levels per dimension and produces tokens Ht from a codebook of 310 = 59,049 entries.",
       "zh": "一个 10 维 FSQ 瓶颈插在编码器第 11 层之后，每维 3 个级别，从大小为 310（即 3^10）= 59,049 的码本中产生 token Ht。"
      },
      {
       "id": "s-3-1-2-2",
       "original": "On the decoder side, a Quantizer Decoder upsamples the tokens to a 25 Hz representation H2, which is processed by Voice Encoder2 before entering the MinMo LLM.",
       "zh": "在解码器一侧，Quantizer Decoder 将 token 上采样为 25 Hz 表征 H2，由 Voice Encoder-2 处理后送入 MinMo LLM。"
      },
      {
       "id": "s-3-1-2-3",
       "original": "The language-model backbone used for supervised tokenizer training is initialized from Qwen2.5-7B-Instruct [26].",
       "zh": "用于有监督分词器训练的语言模型骨干初始化自 Qwen2.5-7B-Instruct [26]。"
      }
     ]
    },
    {
     "id": "p-3-1-3",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-3-1-3-1",
       "original": "During continuous training, FSQ is bypassed; the tokenizer components are updated directly, while the language model is adapted with LoRA [27].",
       "zh": "在连续训练阶段，FSQ 被绕过；分词器组件直接更新，语言模型则用 LoRA [27] 适配。"
      },
      {
       "id": "s-3-1-3-2",
       "original": "During quantization training, FSQ is activated and the language-model weights are frozen.",
       "zh": "在量化训练阶段，FSQ 被激活，语言模型权重被冻结。"
      },
      {
       "id": "s-3-1-3-3",
       "original": "Both stages use cross-entropy objectives derived from the supervised tasks.",
       "zh": "两个阶段都使用来自监督任务的交叉熵目标。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-3-2",
   "num": "3.2",
   "level": 2,
   "page": 7,
   "title": {
    "original": "Training Data of Qwen-Audio-3.0-TTS",
    "zh": "3.2 Qwen-Audio-3.0-TTS 的训练数据"
   },
   "blocks": [
    {
     "id": "p-3-2-1",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-3-2-1-1",
       "original": "Qwen-Audio-3.0-TTS scales training data along five capability axes: multilingual and dialect coverage, free-style instruction following, fine-grained inline tags, long-form speech generation, and hardcase robustness.",
       "zh": "Qwen-Audio-3.0-TTS 沿五个能力轴扩展训练数据：多语言与方言覆盖、自由形式指令跟随、细粒度行内标签、长音频语音生成与困难案例鲁棒性。"
      },
      {
       "id": "s-3-2-1-2",
       "original": "The model supports 16 languages, adding Malay, Tagalog, Arabic, Portuguese, Indonesian, Thai, and Vietnamese upon its predecessor CosyVoice3, and covers 20 Chinese dialect regions at finer geographic granularity.",
       "zh": "模型支持 16 种语言，在前代 CosyVoice3 基础上新增马来语、塔加洛语、阿拉伯语、葡萄牙语、印尼语、泰语与越南语，并以更细的地理粒度覆盖 20 个汉语方言区。"
      }
     ]
    },
    {
     "id": "p-3-2-2",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-3-2-2-1",
       "original": "Free-style instruction data covers speaker role, emotion, speaking style, rate, timbre, and accent.",
       "zh": "自由形式指令数据覆盖说话人角色、情感、说话风格、语速、音色与口音。"
      },
      {
       "id": "s-3-2-2-2",
       "original": "Fine-grained tags include localized controls for emotion, style, and speed as well as non-verbal events such as laughter, coughing, breathing, and sighing.",
       "zh": "细粒度标签包括情感、风格与语速的局部控制，以及笑声、咳嗽、呼吸、叹气等非语言事件。"
      },
      {
       "id": "s-3-2-2-3",
       "original": "Long-form speech is collected from narration-like settings and supports single-pass synthesis up to 3 minutes.",
       "zh": "长音频语音采集自类旁白场景，支持最长 3 分钟的单次合成。"
      },
      {
       "id": "s-3-2-2-4",
       "original": "Hard-case data covers polyphonic characters, rare and archaic characters, text-normalization numbers and symbols, and LaTeX mathematical expressions.",
       "zh": "困难案例数据覆盖多音字、生僻字与古字、文本规整中的数字与符号，以及 LaTeX 数学表达式。"
      },
      {
       "id": "s-3-2-2-5",
       "original": "During high-quality annealing, clean and expressive samples are emphasized.",
       "zh": "在高质量退火期间，干净且富有表现力的样本被重点强调。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-3-3",
   "num": "3.3",
   "level": 2,
   "page": 8,
   "title": {
    "original": "Evaluation Methods",
    "zh": "3.3 评测方法"
   },
   "blocks": [
    {
     "id": "p-3-3-1",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-3-3-1-1",
       "original": "For evaluating Qwen-Audio-3.0-TTS’s zero-shot speech generation capabilities, we focus on three key aspects: content consistency, speaker similarity, and audio quality.",
       "zh": "为评测 Qwen-Audio-3.0-TTS 的零样本语音生成能力，我们关注三个关键方面：内容一致性、说话人相似度与音频质量。"
      },
      {
       "id": "s-3-3-1-2",
       "original": "For content consistency, we measure the Character Error Rate (CER) or Word Error Rate (WER) of the ASR transcription against the given text, using Whisper-large V3 [28] for English ASR and Paraformer [29, 30] for Chinese ASR.",
       "zh": "内容一致性方面，我们衡量 ASR 转录相对给定文本的字错误率（CER）或词错误率（WER），英语 ASR 使用 Whisper-large V3 [28]，中文 ASR 使用 Paraformer [29, 30]。"
      },
      {
       "id": "s-3-3-1-3",
       "original": "To assess speaker similarity, we extract speaker embeddings from the generated speech using the ERes2Net speaker verification model [31] and calculate the cosine similarity with the embedding of the reference speech.",
       "zh": "说话人相似度方面，我们使用 ERes2Net 说话人验证模型 [31] 从生成语音中提取说话人嵌入，并计算其与参考语音嵌入的余弦相似度。"
      },
      {
       "id": "s-3-3-1-4",
       "original": "For audio quality, we score the generated speech using the DNSMOS network [32], the scores of which show high correlations with human auditory perception.",
       "zh": "音频质量方面，我们用 DNSMOS 网络 [32] 为生成语音打分，其分数与人类听觉感知高度相关。"
      }
     ]
    },
    {
     "id": "p-3-3-2",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-3-3-2-1",
       "original": "Our core evaluations use SEED-TTS-Eval [2] and an extended CV3-Eval [4] covering seven additional languages.",
       "zh": "我们的核心评测使用 SEED-TTS-Eval [2] 和扩展版 CV3-Eval [4]（额外覆盖 7 种语言）。"
      },
      {
       "id": "s-3-3-2-2",
       "original": "SEED-TTS-Eval reports both ERes2Net and WavLM similarity for comparison with prior work [33].",
       "zh": "SEED-TTS-Eval 同时报告 ERes2Net 与 WavLM 相似度，以便与此前工作 [33] 比较。"
      }
     ]
    },
    {
     "id": "p-3-3-3",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-3-3-3-1",
       "original": "We compare Qwen-Audio-3.0-TTS with widely used or competitive speech generation models.",
       "zh": "我们将 Qwen-Audio-3.0-TTS 与广泛使用或有竞争力的语音生成模型进行比较。"
      },
      {
       "id": "s-3-3-3-2",
       "original": "Non-autoregressive (NAR) baselines include F5-TTS [8], F5R-TTS [34], and LongCat-AudioDiT [35].",
       "zh": "非自回归（NAR）基线包括 F5-TTS [8]、F5R-TTS [34] 与 LongCat-AudioDiT [35]。"
      },
      {
       "id": "s-3-3-3-3",
       "original": "Autoregressive (AR) baselines include Seed-TTS [2], FireRedTTS-2 [36], IndexTTS2 [37], Qwen2.5-Omni [38], Qwen3.5-Omni [39], Qwen3-TTS [6], Minimax-Speech [40], CosyVoice3 [4], Dots.TTS [12], and VoxCPM2 [13].",
       "zh": "自回归（AR）基线包括 Seed-TTS [2]、FireRedTTS-2 [36]、IndexTTS2 [37]、Qwen2.5-Omni [38]、Qwen3.5-Omni [39]、Qwen3-TTS [6]、Minimax-Speech [40]、CosyVoice3 [4]、Dots.TTS [12] 与 VoxCPM2 [13]。"
      }
     ]
    },
    {
     "id": "p-3-3-4",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-3-3-4-1",
       "original": "Beyond these test sets, we introduce Qwen-Audio-TTS-Eval, a diagnostic benchmark for deployment-oriented speech generation, consisting of the following evaluation dimensions:",
       "zh": "在这些测试集之外，我们引入 Qwen-Audio-TTS-Eval，一个面向部署的语音生成诊断基准，由以下评测维度构成："
      }
     ]
    },
    {
     "id": "p-3-3-5",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-3-3-5-1",
       "original": "• Text Normalization: 1,375 Chinese and English cases containing non-standard words, including numbers, dates, currencies, abbreviations, codes, formulas, and symbols, testing whether models can verbalize them correctly. • Long-form Speech Generation: 200 paragraph-level Chinese and English cases, typically producing utterances of 1.5–3 minutes, evaluating content consistency, speaker consistency, and prosodic stability in one-pass generation.",
       "zh": "• 文本规整：1,375 个中英文案例，包含数字、日期、货币、缩写、代码、公式与符号等非标准词，测试模型能否正确读出它们。• 长音频语音生成：200 个段落级中英文案例，通常产生 1.5–3 分钟的语音，评估单次生成中的内容一致性、说话人一致性与韵律稳定性。"
      },
      {
       "id": "s-3-3-5-2",
       "original": "English cases are adapted from [41] with same-speaker reference utterances, while Chinese cases are curated in-house. • Acoustic Robustness: 894 Chinese and English cases with noisy, reverberant, and unclear prompt speech, testing robustness to degraded enrollment audio. • Instruction Following under Zero-shot Voice Cloning: 440 cases covering single-attribute control of emotion, speech rate, and volume, as well as multi-attribute instructions expressed in natural language or structured key-value formats.",
       "zh": "英文案例改编自 [41] 并配同说话人参考语音，中文案例为内部整理。• 声学鲁棒性：894 个中英文案例，提示语音含噪、带混响或不清晰，测试对退化注册音频的鲁棒性。• 零样本声音克隆下的指令跟随：440 个案例，覆盖情感、语速、音量的单属性控制，以及以自然语言或结构化键值格式表达的多属性指令。"
      }
     ]
    },
    {
     "id": "p-3-3-6",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-3-3-6-1",
       "original": "We also evaluate transfer from the pretrained model to speaker-fine-tuned models.",
       "zh": "我们还评估了从预训练模型到说话人微调模型的迁移。"
      },
      {
       "id": "s-3-3-6-2",
       "original": "Task-specific benchmark, calibration, and annotation protocols are reported alongside the corresponding results below.",
       "zh": "各任务的基准、校准与标注协议与相应结果一起在下文报告。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-4",
   "num": "4",
   "level": 1,
   "page": 8,
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
   "page": 8,
   "title": {
    "original": "Ablation of the Speech Tokenizer",
    "zh": "4.1 语音分词器的消融"
   },
   "blocks": [
    {
     "id": "p-4-1-1",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-4-1-1-1",
       "original": "We investigate the impact of frame rate and codebook size on the tokenizer across automatic speech recognition (ASR) and downstream text-to-speech (TTS) tasks.",
       "zh": "我们在自动语音识别（ASR）与下游文本转语音（TTS）任务上考察帧率与码本大小对分词器的影响。"
      }
     ]
    },
    {
     "id": "p-4-1-2",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-4-1-2-1",
       "original": "Intrinsic ASR results on Common Voice [42] and FLEURS [43], reported in Table 1, show that increasing the codebook size recovers the performance loss caused by reducing the frame rate.",
       "zh": "Table 1 报告的 Common Voice [42] 与 FLEURS [43] 内在 ASR 结果表明，增大码本规模可以弥补降低帧率带来的性能损失。"
      },
      {
       "id": "s-4-1-2-2",
       "original": "Table 2 shows the same trend: reducing the frame rate from 25 to 12.5 Hz with the same 6,561-code vocabulary degrades content consistency and speaker similarity, whereas codebook scaling recovers the loss.",
       "zh": "Table 2 展示了同样的趋势：在相同的 6,561 码词表下把帧率从 25 降到 12.5 Hz 会损害内容一致性与说话人相似度，而扩大码本可以挽回损失。"
      },
      {
       "id": "s-4-1-2-3",
       "original": "Among the 12.5 Hz variants, the 59,049-code configuration achieves the best content consistency, while the 19,683-code configuration retains marginally higher speaker similarity, motivating the final accuracy–similarity–rate trade-off.",
       "zh": "在 12.5 Hz 变体中，59,049 码配置取得最佳内容一致性，而 19,683 码配置保留了略高的说话人相似度，这为最终的准确率–相似度–帧率权衡提供了依据。"
      }
     ]
    },
    {
     "id": "tab-4-1-1",
     "type": "table_caption",
     "page": 9,
     "original": "Table 1: ASR error rates (%) on Common Voice (CV) and FLEURS. CER is used for Chinese, Japanese, and Korean; WER is used for English. The best 12.5 Hz result is bold.",
     "zh": "表 1：Common Voice（CV）与 FLEURS 上的 ASR 错误率（%）。中文、日文、韩文用 CER，英文用 WER。最佳 12.5 Hz 结果加粗。"
    },
    {
     "id": "p-4-1-3",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-4-1-3-1",
       "original": "Tokenizer Codebook Rate CV-zh CV-en CV-ja CV-ko FLEURS-zh FLEURS-en CosyVoice3",
       "zh": "表头：Tokenizer / Codebook Rate × CV-zh / CV-en / CV-ja / CV-ko / FLEURS-zh / FLEURS-en——CosyVoice3（后续照原文）。"
      }
     ]
    },
    {
     "id": "eq-4-1-1",
     "type": "equation",
     "page": 9,
     "original": "6,561"
    },
    {
     "id": "eq-4-1-2",
     "type": "equation",
     "page": 9,
     "original": "25 Hz"
    },
    {
     "id": "eq-4-1-3",
     "type": "equation",
     "page": 9,
     "original": "10.63 13.07 15.61 11.35 3.77 5.43"
    },
    {
     "id": "eq-4-1-4",
     "type": "equation",
     "page": 9,
     "original": "Qwen-Audio-3.0-TTS"
    },
    {
     "id": "eq-4-1-5",
     "type": "equation",
     "page": 9,
     "original": "6,561"
    },
    {
     "id": "eq-4-1-6",
     "type": "equation",
     "page": 9,
     "original": "12.5 Hz"
    },
    {
     "id": "eq-4-1-7",
     "type": "equation",
     "page": 9,
     "original": "11.23 15.40 18.68 13.22 4.18 5.33"
    },
    {
     "id": "eq-4-1-8",
     "type": "equation",
     "page": 9,
     "original": "Qwen-Audio-3.0-TTS"
    },
    {
     "id": "eq-4-1-9",
     "type": "equation",
     "page": 9,
     "original": "19,683"
    },
    {
     "id": "eq-4-1-10",
     "type": "equation",
     "page": 9,
     "original": "12.5 Hz"
    },
    {
     "id": "eq-4-1-11",
     "type": "equation",
     "page": 9,
     "original": "10.79 13.39 16.63 11.45 4.00 4.91"
    },
    {
     "id": "eq-4-1-12",
     "type": "equation",
     "page": 9,
     "original": "Qwen-Audio-3.0-TTS"
    },
    {
     "id": "eq-4-1-13",
     "type": "equation",
     "page": 9,
     "original": "59,049"
    },
    {
     "id": "eq-4-1-14",
     "type": "equation",
     "page": 9,
     "original": "12.5 Hz"
    },
    {
     "id": "eq-4-1-15",
     "type": "equation",
     "page": 9,
     "original": "10.24 12.52 15.21 11.70 3.85 4.69"
    },
    {
     "id": "tab-4-1-2",
     "type": "table_caption",
     "page": 9,
     "original": "Table 2: Zero-shot TTS performance of different tokenizers on SEED-TTS-Eval. Content consistency is measured by CER/WER, and speaker similarity (SIM) is measured by ERes2Net and reported as a percentage. The best 12.5 Hz result in each column is shown in bold.",
     "zh": "表 2：不同分词器在 SEED-TTS-Eval 上的零样本 TTS 性能。内容一致性以 CER/WER 衡量，说话人相似度（SIM）以 ERes2Net 衡量并以百分比报告。每列最佳 12.5 Hz 结果加粗。"
    },
    {
     "id": "p-4-1-4",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-4-1-4-1",
       "original": "Tokenizer Codebook Frame Rate test-zh test-en test-hard Size CER (%) ↓ SIM (%) ↑ WER (%) ↓ SIM (%) ↑ CER (%) ↓ SIM (%) ↑ CosyVoice3",
       "zh": "表头：Tokenizer / Codebook / Frame Rate / Size × test-zh（CER (%) ↓ / SIM (%) ↑）/ test-en（WER (%) ↓ / SIM (%) ↑）/ test-hard（CER (%) ↓ / SIM (%) ↑）——CosyVoice3（后续照原文）。"
      }
     ]
    },
    {
     "id": "eq-4-1-16",
     "type": "equation",
     "page": 9,
     "original": "6,561"
    },
    {
     "id": "eq-4-1-17",
     "type": "equation",
     "page": 9,
     "original": "25 Hz"
    },
    {
     "id": "eq-4-1-18",
     "type": "equation",
     "page": 9,
     "original": "1.45 80.60 2.57 73.60 6.83 77.60"
    },
    {
     "id": "eq-4-1-19",
     "type": "equation",
     "page": 9,
     "original": "Qwen-Audio-3.0-TTS"
    },
    {
     "id": "eq-4-1-20",
     "type": "equation",
     "page": 9,
     "original": "6,561"
    },
    {
     "id": "eq-4-1-21",
     "type": "equation",
     "page": 9,
     "original": "12.5 Hz"
    },
    {
     "id": "eq-4-1-22",
     "type": "equation",
     "page": 9,
     "original": "2.59 72.44 3.21 61.64 7.94 69.78"
    },
    {
     "id": "eq-4-1-23",
     "type": "equation",
     "page": 9,
     "original": "Qwen-Audio-3.0-TTS"
    },
    {
     "id": "eq-4-1-24",
     "type": "equation",
     "page": 9,
     "original": "19,683"
    },
    {
     "id": "eq-4-1-25",
     "type": "equation",
     "page": 9,
     "original": "12.5 Hz"
    },
    {
     "id": "eq-4-1-26",
     "type": "equation",
     "page": 9,
     "original": "1.48 83.25 2.56 77.58 6.70 80.85"
    },
    {
     "id": "eq-4-1-27",
     "type": "equation",
     "page": 9,
     "original": "Qwen-Audio-3.0-TTS"
    },
    {
     "id": "eq-4-1-28",
     "type": "equation",
     "page": 9,
     "original": "59,049"
    },
    {
     "id": "eq-4-1-29",
     "type": "equation",
     "page": 9,
     "original": "12.5 Hz"
    },
    {
     "id": "eq-4-1-30",
     "type": "equation",
     "page": 9,
     "original": "1.23 83.09 2.37 77.49 6.68 80.61"
    }
   ]
  },
  {
   "id": "sec-4-2",
   "num": "4.2",
   "level": 2,
   "page": 9,
   "title": {
    "original": "Objective TTS Results on SEED-TTS-Eval",
    "zh": "4.2 SEED-TTS-Eval 上的客观 TTS 结果"
   },
   "blocks": [
    {
     "id": "tab-4-2-1",
     "type": "table_caption",
     "page": 9,
     "original": "Table 3: Zero-shot TTS performance on SEED-TTS-Eval. Content consistency is measured by CER/WER, and speaker similarity (SIM) is reported as a cosine score. Values outside parentheses use WavLM and values inside parentheses use ERes2Net. Bold and underlined values denote the best and second-best results in each column, respectively. † ERes2Net SIM scores were computed by us using the publicly released models. Before reporting these scores, we verified that our reproduced CER/WER and WavLM SIM results closely matched those reported in the corresponding papers.",
     "zh": "表 3：SEED-TTS-Eval 上的零样本 TTS 性能。内容一致性以 CER/WER 衡量，说话人相似度（SIM）以余弦分数报告。括号外数值用 WavLM，括号内数值用 ERes2Net。加粗与下划线分别表示每列最佳与次佳结果。† 标注的 ERes2Net SIM 分数由我们使用公开发布的模型计算；报告前我们验证了复现的 CER/WER 与 WavLM SIM 结果与对应论文报告值高度吻合。"
    },
    {
     "id": "p-4-2-1",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-4-2-1-1",
       "original": "Model test-zh test-en test-hard CER (%) ↓ SIM ↑ WER (%) ↓ SIM ↑ CER (%) ↓ SIM ↑ Human",
       "zh": "表头：Model × test-zh（CER(%)↓/SIM↑）× test-en（WER(%)↓/SIM↑）× test-hard（CER(%)↓/SIM↑）——Human 1.26/0.755(0.775)、2.14/0.734(0.742)、-/-；Vocoder Resyn.（后续照原文）。"
      }
     ]
    },
    {
     "id": "eq-4-2-1",
     "type": "equation",
     "page": 9,
     "original": "1.26 0.755 (0.775) 2.14 0.734 (0.742) - -"
    },
    {
     "id": "p-4-2-2",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-4-2-2-1",
       "original": "Vocoder Resyn.",
       "zh": "表头：Model × test-zh（CER(%)↓/SIM↑）× test-en（WER(%)↓/SIM↑）× test-hard（CER(%)↓/SIM↑）——Human 1.26/0.755(0.775)、2.14/0.734(0.742)、-/-；Vocoder Resyn.（后续照原文）。"
      }
     ]
    },
    {
     "id": "eq-4-2-2",
     "type": "equation",
     "page": 9,
     "original": "1.27 0.720 2.17 0.700 - -"
    },
    {
     "id": "eq-4-2-3",
     "type": "equation",
     "page": 9,
     "original": "Non-autoregressive Models F5-TTS (32 NFE) [8]"
    },
    {
     "id": "eq-4-2-4",
     "type": "equation",
     "page": 9,
     "original": "1.56 0.741 (0.794) 1.83 0.647 (0.742) 8.67 0.713 (0.762)"
    },
    {
     "id": "eq-4-2-5",
     "type": "equation",
     "page": 9,
     "original": "F5R-TTS [34]"
    },
    {
     "id": "eq-4-2-6",
     "type": "equation",
     "page": 9,
     "original": "1.37 0.754 - - 8.79 0.718"
    },
    {
     "id": "eq-4-2-7",
     "type": "equation",
     "page": 9,
     "original": "LongCat-AudioDiT-3.5B [35]"
    },
    {
     "id": "eq-4-2-8",
     "type": "equation",
     "page": 9,
     "original": "1.09 0.818 (0.806)† 1.50 0.786 (0.771)† 6.04 0.797 (0.781)†"
    },
    {
     "id": "eq-4-2-9",
     "type": "equation",
     "page": 9,
     "original": "Autoregressive Models Seed-TTS [2]"
    },
    {
     "id": "eq-4-2-10",
     "type": "equation",
     "page": 9,
     "original": "1.12 0.796 2.25 0.762 7.59 0.776"
    },
    {
     "id": "eq-4-2-11",
     "type": "equation",
     "page": 9,
     "original": "FireRedTTS-2 [36]"
    },
    {
     "id": "eq-4-2-12",
     "type": "equation",
     "page": 9,
     "original": "1.14 0.736 1.95 0.665 - -"
    },
    {
     "id": "eq-4-2-13",
     "type": "equation",
     "page": 9,
     "original": "Qwen2.5-Omni-7B [38]"
    },
    {
     "id": "eq-4-2-14",
     "type": "equation",
     "page": 9,
     "original": "1.70 0.752 2.72 0.632 7.97 0.747"
    },
    {
     "id": "eq-4-2-15",
     "type": "equation",
     "page": 9,
     "original": "Qwen3.5-Omni-Plus [39]"
    },
    {
     "id": "eq-4-2-16",
     "type": "equation",
     "page": 9,
     "original": "0.99 - 1.26 - - -"
    },
    {
     "id": "eq-4-2-17",
     "type": "equation",
     "page": 9,
     "original": "Qwen3-TTS-12Hz-1.7B-Base [6]"
    },
    {
     "id": "eq-4-2-18",
     "type": "equation",
     "page": 9,
     "original": "0.77 - 1.24 - - -"
    },
    {
     "id": "eq-4-2-19",
     "type": "equation",
     "page": 9,
     "original": "MiniMax-Speech [40]"
    },
    {
     "id": "eq-4-2-20",
     "type": "equation",
     "page": 9,
     "original": "0.99 0.799 1.90 0.738 - -"
    },
    {
     "id": "eq-4-2-21",
     "type": "equation",
     "page": 9,
     "original": "VoxCPM2 [13]"
    },
    {
     "id": "eq-4-2-22",
     "type": "equation",
     "page": 9,
     "original": "0.97 0.795 (0.756)† 1.84 0.753 (0.725)† 8.13 0.753 (0.704)†"
    },
    {
     "id": "eq-4-2-23",
     "type": "equation",
     "page": 9,
     "original": "Dots.TTS-2B (SOAR) [12]"
    },
    {
     "id": "eq-4-2-24",
     "type": "equation",
     "page": 9,
     "original": "0.94 0.810 (0.818)† 1.30 0.771 (0.792)† 6.60 0.795 (0.800)†"
    },
    {
     "id": "eq-4-2-25",
     "type": "equation",
     "page": 9,
     "original": "CosyVoice3-1.5B [4]"
    },
    {
     "id": "eq-4-2-26",
     "type": "equation",
     "page": 9,
     "original": "1.12 0.781 (0.837) 2.21 0.720 (0.789) 5.83 0.758 (0.816)"
    },
    {
     "id": "eq-4-2-27",
     "type": "equation",
     "page": 9,
     "original": "Qwen-Audio-3.0-TTS"
    },
    {
     "id": "eq-4-2-28",
     "type": "equation",
     "page": 9,
     "original": "0.84 0.792 (0.847) 1.54 0.762 (0.815) 7.00 0.768 (0.824)"
    },
    {
     "id": "tab-4-2-2",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "tab-4-2-2-s1",
       "original": "Table 3 compares Qwen-Audio-3.0-TTS with recent state-of-the-art zero-shot TTS models. Content consistency is evaluated using CER/WER, and speaker similarity is measured by WavLM and ERes2Net. For methods marked with †, we compute the ERes2Net scores using their publicly released models after verifying that the reproduced CER/WER and WavLM results closely match those reported in the original papers.",
       "zh": "表 3 将 Qwen-Audio-3.0-TTS 与近期的 SOTA 零样本 TTS 模型进行了比较。内容一致性用 CER/WER 评估，说话人相似度用 WavLM 与 ERes2Net 衡量。对标有 † 的方法，我们在验证复现的 CER/WER 与 WavLM 结果与原论文报告值高度吻合后，使用其公开发布的模型计算 ERes2Net 分数。"
      }
     ]
    },
    {
     "id": "p-4-2-3",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-4-2-3-1",
       "original": "Overall, Qwen-Audio-3.0-TTS achieves a strong balance between content accuracy and speaker similarity.",
       "zh": "总体而言，Qwen-Audio-3.0-TTS 在内容准确性与说话人相似度之间取得了很强的平衡。"
      },
      {
       "id": "s-4-2-3-2",
       "original": "It ranks second in CER on test-zh while remaining competitive on test-en and test-hard.",
       "zh": "它在 test-zh 上 CER 排名第二，同时在 test-en 与 test-hard 上保持竞争力。"
      }
     ]
    },
    {
     "id": "tab-4-2-3",
     "type": "table_caption",
     "page": 10,
     "original": "Table 4: CER(%) and WER(%) on the CV3-Eval Multilingual Voice Cloning subset. MiniMaxSpeech-2.8-HD and ElevenLabs-v3 are evaluated through their public APIs, while all other comparison systems use publicly released open-source models. Best scores are in bold, and second-best scores are underlined. – means the language is unsupported.",
     "zh": "表 4：CV3-Eval 多语言声音克隆子集上的 CER(%) 与 WER(%)。MiniMaxSpeech-2.8-HD 与 ElevenLabs-v3 通过其公开 API 评测，其余对比系统均使用公开发布的开源模型。最佳分数加粗，次佳加下划线。「–」表示该语言不受支持。"
    },
    {
     "id": "p-4-2-4",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-4-2-4-1",
       "original": "Model zh en ja ko de es fr it ru ar id pt th vi ms tl Commercial API Models MiniMax-Speech-2.8-HD",
       "zh": "表头：Model × zh/en/ja/ko/de/es/fr/it/ru/ar/id/pt/th/vi/ms/tl 各语种——商业 API 模型：MiniMax-Speech-2.8-HD（后续照原文）。"
      }
     ]
    },
    {
     "id": "eq-4-2-29",
     "type": "equation",
     "page": 10,
     "original": "3.42 3.45 6.29 7.49 3.30 2.79 8.74 3.67 5.39 3.38 1.46 1.86 1.65 1.64 3.10 6.35"
    },
    {
     "id": "eq-4-2-30",
     "type": "equation",
     "page": 10,
     "original": "ElevenLabs-v3"
    },
    {
     "id": "eq-4-2-31",
     "type": "equation",
     "page": 10,
     "original": "4.46 3.61 5.71 5.46 3.64 3.92 9.31 4.68 5.38 5.51 2.85 2.33 3.44 4.08 4.41 12.8"
    },
    {
     "id": "eq-4-2-32",
     "type": "equation",
     "page": 10,
     "original": "Open-source Models"
    },
    {
     "id": "eq-4-2-33",
     "type": "equation",
     "page": 10,
     "original": "Qwen3-TTS-12Hz-1.7B-Base 3.09 3.67 6.48 5.64 3.31 3.22 9.05 4.01 7.40 – – 2.71 – – – –"
    },
    {
     "id": "eq-4-2-34",
     "type": "equation",
     "page": 10,
     "original": "Dots.TTS-2B (SOAR)"
    },
    {
     "id": "eq-4-2-35",
     "type": "equation",
     "page": 10,
     "original": "3.58 4.70 8.23 10.1 5.97 8.04 35.7 5.34 14.0 – 5.01 11.1 7.71 12.3 5.57 8.84"
    },
    {
     "id": "eq-4-2-36",
     "type": "equation",
     "page": 10,
     "original": "VoxCPM2"
    },
    {
     "id": "eq-4-2-37",
     "type": "equation",
     "page": 10,
     "original": "3.55 6.21 5.88 9.95 5.48 4.17 10.3 4.42 5.97 4.44 3.10 2.63 1.86 4.97 5.47 7.08"
    },
    {
     "id": "eq-4-2-38",
     "type": "equation",
     "page": 10,
     "original": "CosyVoice3-0.5B"
    },
    {
     "id": "eq-4-2-39",
     "type": "equation",
     "page": 10,
     "original": "3.89 5.24 10.4 12.8 7.41 4.25 12.9 6.68 6.77 – – – – – – –"
    },
    {
     "id": "eq-4-2-40",
     "type": "equation",
     "page": 10,
     "original": "CosyVoice3-1.5B"
    },
    {
     "id": "eq-4-2-41",
     "type": "equation",
     "page": 10,
     "original": "3.91 4.99 7.57 5.69 6.43 4.47 11.8 10.5 6.64 – – – – – – –"
    },
    {
     "id": "eq-4-2-42",
     "type": "equation",
     "page": 10,
     "original": "Qwen-Audio-3.0-TTS"
    },
    {
     "id": "eq-4-2-43",
     "type": "equation",
     "page": 10,
     "original": "3.35 4.25 4.78 4.30 4.00 3.08 9.77 3.82 4.68 3.36 2.35 1.99 1.45 3.17 2.62 6.43"
    },
    {
     "id": "p-4-2-5",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-4-2-5-1",
       "original": "We find that pushing CER/WER lower through more aggressive optimization consistently comes at the expense of speech naturalness and expressiveness.",
       "zh": "（此句主体为 Table 4 数值的抽取残留：de/es/fr/it/ru/ar/id/pt/th/vi/ms/tl 各语言列下 MiniMax-Speech-2.8-HD、ElevenLabs-v3、Dots.TTS-2B、VoxCPM2、Qwen3-TTS-12Hz-1.7B-Base 与 Qwen-Audio-3.0-TTS 的 CER/WER 数值，含 3.42、3.45、6.29、7.49、3.30、2.79、8.74、3.67、5.39、3.38、1.46、1.86、1.65、1.64、3.10、6.35、4.46、3.61、5.71、5.46、3.64、3.92、9.31、4.68、5.38、5.51、2.85、2.33、3.44、4.08、4.41、12.8、3.09、3.67、6.48、5.64、3.31、3.22、9.05、4.01、7.40、2.71、3.58、4.70、8.23、10.1、5.97、8.04、35.7、5.34、14.0、5.01、11.1、7.71、12.3、5.57、8.84、3.55、6.21、5.88、9.95、5.48、4.17、10.3、4.42、5.97、4.44、3.10、2.63、1.86、4.97、5.47、7.08、3.89、5.24、10.4、12.8、7.41、4.25、12.9、6.68、6.77、3.91、4.99、7.57、5.69、6.43、4.47、11.8、10.5、6.64、3.35、4.25、4.78、4.30、4.00、3.08、9.77、3.82、4.68、3.36、2.35、1.99、1.45、3.17、2.62、6.43。）句末为正文：我们发现，通过更激进的优化压低 CER/WER，总会以牺牲语音自然度与表现力为代价。"
      },
      {
       "id": "s-4-2-5-2",
       "original": "Our model therefore targets a better overall trade-off instead of optimizing specifically for the lowest CER/WER.",
       "zh": "因此，我们的模型以更好的整体权衡为目标，而不是专门针对最低 CER/WER 优化。"
      },
      {
       "id": "s-4-2-5-3",
       "original": "For speaker similarity, QwenAudio-3.0-TTS remains competitive under WavLM and achieves the highest ERes2Net scores across all three test sets.",
       "zh": "在说话人相似度上，Qwen-Audio-3.0-TTS 在 WavLM 下保持竞争力，并在全部三个测试集上取得最高的 ERes2Net 分数。"
      },
      {
       "id": "s-4-2-5-4",
       "original": "We also observe that WavLM and ERes2Net often produce different system rankings, suggesting that the two metrics capture complementary aspects of speaker similarity.",
       "zh": "我们还观察到 WavLM 与 ERes2Net 常常给出不同的系统排名，说明这两个指标刻画了说话人相似度互补的侧面。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-4-3",
   "num": "4.3",
   "level": 2,
   "page": 10,
   "title": {
    "original": "Objective Evaluation on Multilingual Benchmark CV3-Eval",
    "zh": "4.3 多语言基准 CV3-Eval 上的客观评测"
   },
   "blocks": []
  },
  {
   "id": "sec-4-3-1",
   "num": "4.3.1",
   "level": 2,
   "page": 10,
   "title": {
    "original": "Results of Multilingual Voice Cloning",
    "zh": "4.3.1 多语言声音克隆结果"
   },
   "blocks": [
    {
     "id": "p-4-3-1-1",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-4-3-1-1-1",
       "original": "We evaluate Qwen-Audio-3.0-TTS on the Multilingual Voice Cloning subset of CV3-Eval.",
       "zh": "我们在 CV3-Eval 的多语言声音克隆子集上评测 Qwen-Audio-3.0-TTS。"
      },
      {
       "id": "s-4-3-1-1-2",
       "original": "Following the original CV3-Eval protocol, we extend the evaluation to several less commonly benchmarked languages, including Arabic (ar), Indonesian (id), Portuguese (pt), Thai (th), Vietnamese (vi), Malay (ms), and Tagalog (tl).",
       "zh": "遵循原始 CV3-Eval 协议，我们把评测扩展到几种较少进入基准的语言，包括阿拉伯语（ar）、印尼语（id）、葡萄牙语（pt）、泰语（th）、越南语（vi）、马来语（ms）与塔加洛语（tl）。"
      },
      {
       "id": "s-4-3-1-1-3",
       "original": "We additionally compare against recent multilingual systems, including MiniMax-Speech-2.8-HD2 and ElevenLabs-v33 through their public APIs, as well as Dots.TTS-2B (SOAR), VoxCPM2, and Qwen3-TTS-12Hz-1.7B-Base using their publicly released open-source models.",
       "zh": "我们还通过公开 API 对比了近期的多语言系统 MiniMax-Speech-2.8-HD2 与 ElevenLabs-v33（原文模型名后的 2、33 为脚注编号残留），并用其公开发布的开源模型对比了 Dots.TTS-2B (SOAR)、VoxCPM2 与 Qwen3-TTS-12Hz-1.7B-Base。"
      },
      {
       "id": "s-4-3-1-1-4",
       "original": "All systems are evaluated using the same CV3-Eval methodology.",
       "zh": "所有系统都使用相同的 CV3-Eval 方法评测。"
      },
      {
       "id": "s-4-3-1-1-5",
       "original": "Table 4 reports CER for Chinese, Japanese, and Korean, and WER for all other languages.",
       "zh": "Table 4 报告了中文、日文、韩文的 CER 与其余所有语言的 WER。"
      }
     ]
    },
    {
     "id": "p-4-3-1-2",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-4-3-1-2-1",
       "original": "As shown in Table 4, Qwen-Audio-3.0-TTS achieves the best results in a broad range of languages, including Japanese, Korean, Russian, Arabic, Malay, and Thai, while remaining highly competitive on the others.",
       "zh": "如 Table 4 所示，Qwen-Audio-3.0-TTS 在日语、韩语、俄语、阿拉伯语、马来语、泰语等广泛语言上取得最佳结果，在其余语言上也极具竞争力。"
      },
      {
       "id": "s-4-3-1-2-2",
       "original": "Overall, the model demonstrates strong multilingual voice cloning performance across all 16 evaluated languages.",
       "zh": "总体而言，该模型在全部 16 种被评语言上展现了强大的多语言声音克隆性能。"
      }
     ]
    },
    {
     "id": "p-4-3-1-3",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-4-3-1-3-1",
       "original": "For the hard-zh and hard-en subsets in Table 5, we additionally include LongCat-AudioDiT as a bilingual Chinese–English baseline.",
       "zh": "对于 Table 5 的 hard-zh 与 hard-en 子集，我们额外纳入 LongCat-AudioDiT 作为中英双语基线。"
      },
      {
       "id": "s-4-3-1-3-2",
       "original": "Under this challenging evaluation setting, Qwen-Audio-3.0- TTS achieves the best speaker similarity and DNSMOS on both subsets, while maintaining highly competitive WER performance.",
       "zh": "在这一更具挑战性的评测设置下，Qwen-Audio-3.0-TTS 在两个子集上都取得最佳的说话人相似度与 DNSMOS，同时保持高度竞争力的 WER 表现。"
      },
      {
       "id": "s-4-3-1-3-3",
       "original": "These results demonstrate its strong balance among intelligibility, speaker preservation, and perceptual quality.",
       "zh": "这些结果表明它在可懂度、说话人保留与感知质量之间取得了很强的平衡。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-4-3-2",
   "num": "4.3.2",
   "level": 2,
   "page": 10,
   "title": {
    "original": "Results of Cross-lingual Voice Cloning",
    "zh": "4.3.2 跨语言声音克隆结果"
   },
   "blocks": [
    {
     "id": "tab-4-3-2-1",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "tab-4-3-2-1-s1",
       "original": "Table 6 reports the WER/CER results on the CV3-Eval Cross-lingual Voice Cloning subset, comparing recent commercial API systems and open-source models. For readability, a few substantially higher results are omitted and denoted by “-” in the table. Across all 12 transfer directions, QwenAudio-3.0-TTS achieves the best result in eight and the second-best result in the remaining four, consistently ranking among the strongest systems across all evaluated language pairs. It also outperforms CosyVoice3-1.5B in every direction and reduces the average error from 10.09% to 4.05%, a relative reduction of approximately 60%, demonstrating strong cross-lingual stability across diverse source and target languages.",
       "zh": "表 6 报告了 CV3-Eval 跨语言声音克隆子集上的 WER/CER 结果，对比了近期商业 API 系统与开源模型。为可读性，少数显著偏高的结果被省略并以「-」标注。在全部 12 个迁移方向上，Qwen-Audio-3.0-TTS 在 8 个方向上取得最佳、在其余 4 个方向上取得次佳，稳定地位居所有被评语言对中的最强系统之列。它还在每个方向上都优于 CosyVoice3-1.5B，把平均错误率从 10.09% 降到 4.05%，相对降低约 60%，展现了跨源语言与目标语言的强大跨语言稳定性。"
      }
     ]
    },
    {
     "id": "p-4-3-2-1",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-4-3-2-1-1",
       "original": "2https://platform.minimax.io/docs/guides/models-intro 3https://elevenlabs.io/docs/overview/models",
       "zh": "2https://platform.minimax.io/docs/guides/models-intro 3https://elevenlabs.io/docs/overview/models"
      }
     ]
    },
    {
     "id": "tab-4-3-2-2",
     "type": "table_caption",
     "page": 11,
     "original": "Table 5: WER/CER, ERes2Net speaker similarity (SIM), and DNSMOS on the hard-zh and hard-en subsets of CV3-Eval. The best result in each column is shown in bold, and the second-best result is underlined.",
     "zh": "表 5：CV3-Eval hard-zh 与 hard-en 子集上的 WER/CER、ERes2Net 说话人相似度（SIM）与 DNSMOS。每列最佳结果加粗，次佳加下划线。"
    },
    {
     "id": "p-4-3-2-2",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-4-3-2-2-1",
       "original": "Model hard-zh hard-en CER (%) ↓ SIM (%) ↑ DNSMOS ↑ WER (%) ↓ SIM (%) ↑ DNSMOS ↑ Commercial API Models MiniMax-Speech-2.8-HD",
       "zh": "表头：Model × hard-zh / hard-en（CER (%) ↓ / SIM (%) ↑ / DNSMOS ↑）/（WER (%) ↓ / SIM (%) ↑ / DNSMOS ↑）——商业 API 模型：MiniMax-Speech-2.8-HD（后续照原文）。"
      }
     ]
    },
    {
     "id": "eq-4-3-2-1",
     "type": "equation",
     "page": 11,
     "original": "7.42 74.6 3.74 7.37 72.1 3.80"
    },
    {
     "id": "eq-4-3-2-2",
     "type": "equation",
     "page": 11,
     "original": "ElevenLabs-v3"
    },
    {
     "id": "eq-4-3-2-3",
     "type": "equation",
     "page": 11,
     "original": "10.66 50.3 3.81 5.84 48.9 3.92"
    },
    {
     "id": "eq-4-3-2-4",
     "type": "equation",
     "page": 11,
     "original": "Open-source Models Qwen3-TTS-12Hz-1.7B-Base"
    },
    {
     "id": "eq-4-3-2-5",
     "type": "equation",
     "page": 11,
     "original": "11.24 69.1 3.79 6.53 66.1 3.88"
    },
    {
     "id": "eq-4-3-2-6",
     "type": "equation",
     "page": 11,
     "original": "LongCat-AudioDiT-3.5B"
    },
    {
     "id": "eq-4-3-2-7",
     "type": "equation",
     "page": 11,
     "original": "9.24 72.8 3.75 8.50 73.9 3.84"
    },
    {
     "id": "eq-4-3-2-8",
     "type": "equation",
     "page": 11,
     "original": "Dots.TTS-2B (SOAR)"
    },
    {
     "id": "eq-4-3-2-9",
     "type": "equation",
     "page": 11,
     "original": "11.75 77.5 3.65 11.69 76.0 3.72"
    },
    {
     "id": "eq-4-3-2-10",
     "type": "equation",
     "page": 11,
     "original": "VoxCPM2"
    },
    {
     "id": "eq-4-3-2-11",
     "type": "equation",
     "page": 11,
     "original": "8.10 69.9 3.63 7.48 67.0 3.73"
    },
    {
     "id": "eq-4-3-2-12",
     "type": "equation",
     "page": 11,
     "original": "CosyVoice3-1.5B"
    },
    {
     "id": "eq-4-3-2-13",
     "type": "equation",
     "page": 11,
     "original": "9.77 78.5 3.79 10.55 76.1 3.95"
    },
    {
     "id": "eq-4-3-2-14",
     "type": "equation",
     "page": 11,
     "original": "Qwen-Audio-3.0-TTS"
    },
    {
     "id": "eq-4-3-2-15",
     "type": "equation",
     "page": 11,
     "original": "7.44 78.7 3.93 6.71 76.6 4.04"
    },
    {
     "id": "tab-4-3-2-3",
     "type": "table_caption",
     "page": 11,
     "original": "Table 6: WER/CER (%, ↓) on the CV3-Eval Cross-lingual Voice Cloning subset. Top-level headers denote target languages and second-level headers denote source languages. Bold and underlined values indicate the best and second-best results in each transfer direction. For readability, entries with substantially higher WER/CER are omitted and denoted by “–”.",
     "zh": "表 6：CV3-Eval 跨语言声音克隆子集上的 WER/CER（%，越低越好）。顶层表头为目标语言，二级表头为源语言。加粗与下划线分别表示每个迁移方向的最佳与次佳结果。为可读性，WER/CER 显著偏高的条目被省略并以「–」标注。"
    },
    {
     "id": "p-4-3-2-3",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-4-3-2-3-1",
       "original": "Model to-zh to-en to-ja to-ko en ja ko zh ja ko zh en ko zh en ja Commercial API Models MiniMax-Speech-2.8-HD",
       "zh": "表头：Model × to-zh / to-en / to-ja / to-ko 与 en / ja / ko / zh 各方向——商业 API 模型：MiniMax-Speech-2.8-HD（后续照原文）。"
      }
     ]
    },
    {
     "id": "eq-4-3-2-16",
     "type": "equation",
     "page": 11,
     "original": "9.96 6.07 3.63 3.59 5.79 4.28 30.7 13.7 6.39 6.45 6.78 11.3"
    },
    {
     "id": "eq-4-3-2-17",
     "type": "equation",
     "page": 11,
     "original": "ElevenLabs-v3"
    },
    {
     "id": "eq-4-3-2-18",
     "type": "equation",
     "page": 11,
     "original": "7.15 6.17 2.82 4.86 5.30 4.88 10.7 12.4 6.00 6.26 5.48 8.01"
    },
    {
     "id": "eq-4-3-2-19",
     "type": "equation",
     "page": 11,
     "original": "Open-source Models Qwen3-TTS-12Hz-1.7B-Base"
    },
    {
     "id": "eq-4-3-2-20",
     "type": "equation",
     "page": 11,
     "original": "4.77 3.43 1.08 2.77 3.04 3.09 8.40 7.21 3.67 4.82 5.14 5.59"
    },
    {
     "id": "eq-4-3-2-21",
     "type": "equation",
     "page": 11,
     "original": "Dots.TTS-2B (SOAR)"
    },
    {
     "id": "eq-4-3-2-22",
     "type": "equation",
     "page": 11,
     "original": "8.07 – 2.61 4.31 8.02 4.74 16.1 – – 12.4 18.6 13.5"
    },
    {
     "id": "eq-4-3-2-23",
     "type": "equation",
     "page": 11,
     "original": "VoxCPM2"
    },
    {
     "id": "eq-4-3-2-24",
     "type": "equation",
     "page": 11,
     "original": "7.76 – 3.42 5.26 6.22 7.15 – – – 5.73 10.4 10.6"
    },
    {
     "id": "eq-4-3-2-25",
     "type": "equation",
     "page": 11,
     "original": "CosyVoice3-1.5B"
    },
    {
     "id": "eq-4-3-2-26",
     "type": "equation",
     "page": 11,
     "original": "8.01 6.78 3.30 4.32 5.39 5.94 13.7 13.4 4.19 31.6 14.0 10.5"
    },
    {
     "id": "eq-4-3-2-27",
     "type": "equation",
     "page": 11,
     "original": "Qwen-Audio-3.0-TTS"
    },
    {
     "id": "eq-4-3-2-28",
     "type": "equation",
     "page": 11,
     "original": "5.23 3.29 1.09 2.40 3.15 3.54 6.53 6.66 2.98 4.27 4.34 5.15"
    }
   ]
  },
  {
   "id": "sec-4-4",
   "num": "4.4",
   "level": 2,
   "page": 11,
   "title": {
    "original": "Objective TTS Results on Qwen-Audio-TTS-Eval",
    "zh": "4.4 Qwen-Audio-TTS-Eval 上的客观 TTS 结果"
   },
   "blocks": []
  },
  {
   "id": "sec-4-4-1",
   "num": "4.4.1",
   "level": 2,
   "page": 11,
   "title": {
    "original": "Results of Text Normalization Ability",
    "zh": "4.4.1 文本规整能力结果"
   },
   "blocks": [
    {
     "id": "p-4-4-1-1",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-4-4-1-1-1",
       "original": "The benchmark contains five categories.",
       "zh": "该基准包含五个类别。"
      },
      {
       "id": "s-4-4-1-1-2",
       "original": "Num. covers numbers, dates, and times (for example, “2023-12-01” and “VII”); Fin. covers monetary and financial expressions (“C99.99” and “$4.8M”); Acr. covers abbreviations, acronyms, and mixed readings (“U-lock” and “CRISPR”); Code covers serial numbers, codes, and addresses (“V3.2.1” and “sales-2024@ali.com”); and Expr. covers formulas, units, and symbols, including Pt/Pr and ∆G = ∆H −T∆S.",
       "zh": "Num. 覆盖数字、日期与时间（例如 “2023-12-01” 和 “VII”）；Fin. 覆盖货币与金融表达（“C99.99” 和 “$4.8M”）；Acr. 覆盖缩写、首字母缩略词与混合读法（“U-lock” 和 “CRISPR”）；Code 覆盖序列号、代码与地址（“V3.2.1” 和 “sales-2024@ali.com”）；Expr. 覆盖公式、单位与符号，包括 Pt/Pr 和 ∆G = ∆H −T∆S。"
      }
     ]
    },
    {
     "id": "p-4-4-1-2",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-4-4-1-2-1",
       "original": "Gemini-2.5-Pro [44] receives the original text, the synthesized-audio ASR transcript, a humanauthored list of acceptable verbalizations, and the category-specific evaluation focus.",
       "zh": "Gemini-2.5-Pro [44] 接收原始文本、合成音频的 ASR 转录、人工撰写的可接受读法清单，以及该类别特有的评测重点。"
      },
      {
       "id": "s-4-4-1-2-2",
       "original": "It assigns a binary score to the target expression while disregarding ASR errors and discrepancies outside that focus.",
       "zh": "它对目标表达给出二元评分，同时忽略该重点之外的 ASR 错误与偏差。"
      },
      {
       "id": "s-4-4-1-2-3",
       "original": "Scores are averaged within categories and over the complete benchmark.",
       "zh": "分数在类别内及整个基准上取平均。"
      }
     ]
    },
    {
     "id": "tab-4-4-1-1",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "tab-4-4-1-1-s1",
       "original": "Table 7 summarizes the overall and category-level results. Qwen-Audio-3.0-TTS achieves the best overall accuracy on both Chinese (68.7%) and English (65.7%) evaluation sets. It also shows competitive performance across different categories, demonstrating its ability to handle diverse text normalization scenarios.",
       "zh": "表 7 汇总了整体与各类别的结果。Qwen-Audio-3.0-TTS 在中文（68.7%）与英文（65.7%）评测集上都取得最佳整体准确率。它在不同类别上也表现出有竞争力的性能，展示了处理多样文本规整场景的能力。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-4-4-2",
   "num": "4.4.2",
   "level": 2,
   "page": 11,
   "title": {
    "original": "Results of Long-form Speech Generation",
    "zh": "4.4.2 长音频语音生成结果"
   },
   "blocks": [
    {
     "id": "p-4-4-2-1",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-4-4-2-1-1",
       "original": "We evaluate one-pass synthesis without external segmentation or audio stitching.",
       "zh": "我们评测单次合成，不做外部分段或音频拼接。"
      },
      {
       "id": "s-4-4-2-1-2",
       "original": "Content fidelity is measured by CER/WER, P-SIM measures similarity to the prompt, and S-SIM measures consistency among segments of the same generated utterance.",
       "zh": "内容保真度以 CER/WER 衡量，P-SIM 衡量与提示的相似度，S-SIM 衡量同一条生成语音内部各段之间的一致性。"
      }
     ]
    },
    {
     "id": "tab-4-4-2-1",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "tab-4-4-2-1-s1",
       "original": "Table 8 shows that Qwen-Audio-3.0-TTS maintains competitive content accuracy and strong speaker consistency in both Chinese and English during one-pass long-form synthesis. It substantially",
       "zh": "表 8 显示，Qwen-Audio-3.0-TTS 在中英文单次长音频合成中都保持了有竞争力的内容准确性与很强的说话人一致性。它大幅（接 Table 8 标题块的下一段续文）。"
      }
     ]
    },
    {
     "id": "tab-4-4-2-2",
     "type": "table_caption",
     "page": 12,
     "original": "Table 7: Complete category-level text-normalization accuracy. Higher is better; bold and underline denote the best and second-best results.",
     "zh": "表 7：完整的类别级文本规整准确率。越高越好；加粗与下划线分别表示最佳与次佳结果。"
    },
    {
     "id": "p-4-4-2-2",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-4-4-2-2-1",
       "original": "Model Overall Num.",
       "zh": "（此句为 Table 7 表头的抽取残留：Overall 与 Num. 两列。）"
      }
     ]
    },
    {
     "id": "p-4-4-2-3",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-4-4-2-3-1",
       "original": "Fin.",
       "zh": "（此句为 Table 7 表头的抽取残留：Fin. 列。）"
      }
     ]
    },
    {
     "id": "p-4-4-2-4",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-4-4-2-4-1",
       "original": "Acr.",
       "zh": "（此句为 Table 7 表头的抽取残留：Acr. 列。）"
      }
     ]
    },
    {
     "id": "p-4-4-2-5",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-4-4-2-5-1",
       "original": "Code Expr. zh en zh en zh en zh en zh en zh en Qwen3-TTS-12Hz-1.7B-Base",
       "zh": "（表格行：Code / Expr. × zh / en（六组）——Qwen3-TTS-12Hz-1.7B-Base，后续照原文。）"
      }
     ]
    },
    {
     "id": "eq-4-4-2-1",
     "type": "equation",
     "page": 12,
     "original": "57.0 60.5 74.2 78.7 40.5 63.0 41.5 63.3 73.9 47.1 24.8 44.1"
    },
    {
     "id": "eq-4-4-2-2",
     "type": "equation",
     "page": 12,
     "original": "LongCat-AudioDiT-3.5B"
    },
    {
     "id": "eq-4-4-2-3",
     "type": "equation",
     "page": 12,
     "original": "2.0 7.4 2.7 3.6 0.0 10.0 4.9 27.3 0.8 0.0 1.0 2.8"
    },
    {
     "id": "eq-4-4-2-4",
     "type": "equation",
     "page": 12,
     "original": "Dots.TTS-2B (SOAR)"
    },
    {
     "id": "eq-4-4-2-5",
     "type": "equation",
     "page": 12,
     "original": "38.6 46.9 40.6 67.7 28.4 49.5 38.3 52.0 72.3 31.0 3.8 27.5"
    },
    {
     "id": "eq-4-4-2-6",
     "type": "equation",
     "page": 12,
     "original": "VoxCPM2"
    },
    {
     "id": "eq-4-4-2-7",
     "type": "equation",
     "page": 12,
     "original": "55.4 48.6 72.9 61.8 33.8 51.0 39.0 58.6 82.4 42.0 15.2 25.2"
    },
    {
     "id": "eq-4-4-2-8",
     "type": "equation",
     "page": 12,
     "original": "CosyVoice3-1.5B"
    },
    {
     "id": "eq-4-4-2-9",
     "type": "equation",
     "page": 12,
     "original": "59.3 54.2 81.3 70.2 40.5 77.0 45.1 55.5 80.7 37.4 12.4 32.2"
    },
    {
     "id": "eq-4-4-2-10",
     "type": "equation",
     "page": 12,
     "original": "Qwen-Audio-3.0-TTS"
    },
    {
     "id": "eq-4-4-2-11",
     "type": "equation",
     "page": 12,
     "original": "68.7 65.7 84.2 78.2 43.7 82.8 50.6 59.4 89.7 61.5 43.8 45.1"
    },
    {
     "id": "tab-4-4-2-3",
     "type": "table_caption",
     "page": 12,
     "original": "Table 8: Complete one-pass long-form comparison by input-length bucket. Length is measured in characters for Chinese and words for English; duration is estimated from the Qwen-Audio-3.0-TTS outputs. “–” indicates a metric that is not applicable, while “–†” denotes omitted CER/WER values that fall substantially outside the effective comparison range under our evaluation setting.",
     "zh": "表 8：按输入长度分桶的完整单次长音频对比。中文长度以字符计、英文以词计；时长由 Qwen-Audio-3.0-TTS 的输出估计。「–」表示该指标不适用，「–†」表示在我们的评测设置下显著超出有效比较范围而被省略的 CER/WER 数值。"
    },
    {
     "id": "p-4-4-2-6",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-4-4-2-6-1",
       "original": "Model zh CER (%) ↓ zh SIM ↑ en WER (%) ↓ en SIM ↑ short mid long all P-SIM S-SIM short mid long all P-SIM S-SIM Text length (µ ± σ)",
       "zh": "表头：Model × zh CER(%)↓ × zh SIM↑ × en WER(%)↓ × en SIM↑（short/mid/long/all，P-SIM/S-SIM）；文本长度（µ ± σ）。"
      }
     ]
    },
    {
     "id": "eq-4-4-2-12",
     "type": "equation",
     "page": 12,
     "original": "496±19 634±26 735±24 630±99 – – 248±26 345±31 451±29 358±88 – –"
    },
    {
     "id": "eq-4-4-2-13",
     "type": "equation",
     "page": 12,
     "original": "Audio duration (µ ± σ, s)"
    },
    {
     "id": "eq-4-4-2-14",
     "type": "equation",
     "page": 12,
     "original": "116±9 146±11 161±23 142±24 – – 86±14 115±18 163±27 125±38 – –"
    },
    {
     "id": "eq-4-4-2-15",
     "type": "equation",
     "page": 12,
     "original": "N samples"
    },
    {
     "id": "eq-4-4-2-16",
     "type": "equation",
     "page": 12,
     "original": "29 35 36 100 100 100 29 32 39 100 100 100"
    },
    {
     "id": "eq-4-4-2-17",
     "type": "equation",
     "page": 12,
     "original": "Qwen3-TTS-12Hz-1.7B-Base"
    },
    {
     "id": "eq-4-4-2-18",
     "type": "equation",
     "page": 12,
     "original": "0.34 1.89 5.79 2.84 63.11 88.98 3.04 4.25 6.57 4.81 68.56 90.49"
    },
    {
     "id": "eq-4-4-2-19",
     "type": "equation",
     "page": 12,
     "original": "LongCat-AudioDiT-3.5B"
    },
    {
     "id": "eq-4-4-2-20",
     "type": "equation",
     "page": 12,
     "original": "–† –† –† –† 70.15 87.10 –† –† –† –† 71.07 88.24"
    },
    {
     "id": "eq-4-4-2-21",
     "type": "equation",
     "page": 12,
     "original": "Dots.TTS-2B (SOAR)"
    },
    {
     "id": "eq-4-4-2-22",
     "type": "equation",
     "page": 12,
     "original": "16.66 36.03 47.31 34.47 78.47 89.74 13.42 20.67 47.85 29.17 81.80 91.48"
    },
    {
     "id": "eq-4-4-2-23",
     "type": "equation",
     "page": 12,
     "original": "VoxCPM2"
    },
    {
     "id": "eq-4-4-2-24",
     "type": "equation",
     "page": 12,
     "original": "0.54 0.58 0.49 0.54 61.73 86.80 2.33 4.25 2.98 3.20 68.95 90.39"
    },
    {
     "id": "eq-4-4-2-25",
     "type": "equation",
     "page": 12,
     "original": "CosyVoice3-1.5B"
    },
    {
     "id": "eq-4-4-2-26",
     "type": "equation",
     "page": 12,
     "original": "14.03 26.73 33.29 25.41 80.44 93.88 7.45 18.59 38.78 23.24 84.52 94.90"
    },
    {
     "id": "eq-4-4-2-27",
     "type": "equation",
     "page": 12,
     "original": "Qwen-Audio-3.0-TTS"
    },
    {
     "id": "eq-4-4-2-28",
     "type": "equation",
     "page": 12,
     "original": "0.30 0.31 5.62 2.22 78.85 93.16 3.30 6.72 4.85 5.00 82.35 93.45"
    },
    {
     "id": "p-4-4-2-7",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-4-4-2-7-1",
       "original": "improves content fidelity over CosyVoice3-1.5B while retaining high prompt and segment-level speaker similarity.",
       "zh": "（正文残句）……相对 CosyVoice3-1.5B 提升了内容保真度，同时保持高提示与段级说话人相似度。"
      },
      {
       "id": "s-4-4-2-7-2",
       "original": "The Chinese and English test sets each contain 100 paragraph-level inputs.",
       "zh": "中文与英文测试集各含 100 个段落级输入。"
      },
      {
       "id": "s-4-4-2-7-3",
       "original": "Samples are divided into short, mid, and long buckets by input length.",
       "zh": "样本按输入长度分为 short、mid、long 三档。"
      },
      {
       "id": "s-4-4-2-7-4",
       "original": "P-SIM is the average similarity between prompt and generated segments, while S-SIM is the average pairwise similarity among overlapping segments within a generated utterance.",
       "zh": "P-SIM 为提示与生成片段之间的平均相似度，S-SIM 为生成语音内部重叠片段之间的平均两两相似度。"
      },
      {
       "id": "s-4-4-2-7-5",
       "original": "Table 8 reports the complete bucket-level breakdown.",
       "zh": "表 8 给出完整的分档明细。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-4-4-3",
   "num": "4.4.3",
   "level": 2,
   "page": 12,
   "title": {
    "original": "Results of Acoustic Robustness",
    "zh": "4.4.3 声学鲁棒性结果"
   },
   "blocks": [
    {
     "id": "p-4-4-3-1",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-4-4-3-1-1",
       "original": "This benchmark evaluates voice-clone robustness using real-world noisy, reverberant, and unclear enrollment speech.",
       "zh": "该基准使用真实世界中含噪、带混响与不清晰的注册语音来评估声音克隆的鲁棒性。"
      },
      {
       "id": "s-4-4-3-1-2",
       "original": "The three subsets respectively cover background interference, far-field or room reverberation, and predominantly telephone-like narrow-band speech with audible distortion.",
       "zh": "三个子集分别覆盖背景干扰、远场或房间混响，以及以类电话窄带语音为主、带有可闻失真的场景。"
      },
      {
       "id": "s-4-4-3-1-3",
       "original": "Unlike benchmarks based on synthetic corruption, these recordings have no paired clean references.",
       "zh": "与基于合成退化的基准不同，这些录音没有配对的干净参考。"
      },
      {
       "id": "s-4-4-3-1-4",
       "original": "Speaker similarity should therefore be viewed as an auxiliary measure of how well speaker cues are retained from degraded prompts, rather than as an absolute estimate.",
       "zh": "因此，说话人相似度应被视为衡量退化提示中说话人线索保留程度的辅助指标，而不是绝对估计。"
      }
     ]
    },
    {
     "id": "p-4-4-3-2",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-4-4-3-2-1",
       "original": "Qwen-Audio-3.0-TTS is designed with built-in robustness to degraded enrollment speech, without relying on a dedicated inference-time denoising mode.",
       "zh": "Qwen-Audio-3.0-TTS 在设计上内置了对退化注册语音的鲁棒性，不依赖专门的推理时去噪模式。"
      },
      {
       "id": "s-4-4-3-2-2",
       "original": "As shown in Table 9, this capability leads to strong results across all three conditions.",
       "zh": "如 Table 9 所示，这一能力在全部三种条件下都带来了很强的结果。"
      },
      {
       "id": "s-4-4-3-2-3",
       "original": "We evaluate both standard and denoising modes for MiniMax-Speech-2.8-HD and ElevenLabs-v3.",
       "zh": "我们对 MiniMax-Speech-2.8-HD 与 ElevenLabs-v3 都评测了标准模式与去噪模式。"
      },
      {
       "id": "s-4-4-3-2-4",
       "original": "Enabling denoising raises MiniMax’s DNSMOS",
       "zh": "开启去噪后，MiniMax 在 Noisy 上的 DNSMOS 从 3.464 升至 3.728、在 Reverb 上从 3.065 升至 3.343，但 SIM 分别从 66.72 降到 63.83、从 61.56 降到 56.53。"
      }
     ]
    },
    {
     "id": "eq-4-4-3-1",
     "type": "equation",
     "page": 12,
     "original": "from 3.464 to 3.728 on Noisy and from 3.065 to 3.343 on Reverb, but reduces SIM from 66.72 to"
    },
    {
     "id": "p-4-4-3-3",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-4-4-3-3-1",
       "original": "63.83 and from 61.56 to 56.53, respectively.",
       "zh": "开启去噪后，MiniMax 在 Noisy 上的 DNSMOS 从 3.464 升至 3.728、在 Reverb 上从 3.065 升至 3.343，但 SIM 分别从 66.72 降到 63.83、从 61.56 降到 56.53。"
      },
      {
       "id": "s-4-4-3-3-2",
       "original": "A similar trade-off appears for ElevenLabs-v3, whose denoising mode improves Reverb DNSMOS from 3.090 to 4.025 and WER from 1.75% to 0.58%, while its SIM remains low at 44.39%.",
       "zh": "ElevenLabs-v3 出现类似的权衡：其去噪模式把 Reverb 上的 DNSMOS 从 3.090 提升到 4.025、WER 从 1.75% 降到 0.58%，但其 SIM 仍低至 44.39%。"
      },
      {
       "id": "s-4-4-3-3-3",
       "original": "By comparison, Qwen-Audio-3.0-TTS reaches DNSMOS scores of 3.962 and 3.925 on Noisy and Reverb, close to ElevenLabs-v3·Denoise, while achieving much higher SIM scores of 76.14% and 74.12%.",
       "zh": "相比之下，Qwen-Audio-3.0-TTS 在 Noisy 与 Reverb 上达到 3.962 与 3.925 的 DNSMOS，接近 ElevenLabs-v3·Denoise，同时取得高得多的 SIM——76.14% 与 74.12%。"
      },
      {
       "id": "s-4-4-3-3-4",
       "original": "On Reverb, it further obtains the best SIM together with the second-best WER and DNSMOS, showing a strong balance among denoising quality, intelligibility, and speaker preservation.",
       "zh": "在 Reverb 上，它还取得最佳 SIM，WER 与 DNSMOS 均为次佳，在去噪质量、可懂度与说话人保留之间展现出很强的平衡。"
      }
     ]
    },
    {
     "id": "tab-4-4-3-1",
     "type": "table_caption",
     "page": 13,
     "original": "Table 9: Objective zero-shot TTS results under noisy, reverberant, and unclear prompt conditions. Models marked with “Denoise” use their inference-time denoising mode. Content error, ERes2Net speaker similarity (SIM), and DNSMOS are reported. Bold and underlined values denote the best and second-best results in each column.",
     "zh": "表 9：含噪、混响与不清晰提示条件下的客观零样本 TTS 结果。标有「Denoise」的模型使用其推理时去噪模式。报告内容错误、ERes2Net 说话人相似度（SIM）与 DNSMOS。加粗与下划线分别表示每列最佳与次佳结果。"
    },
    {
     "id": "p-4-4-3-4",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-4-4-3-4-1",
       "original": "Model Noisy Reverb Unclear WER (%) ↓SIM (%) ↑DNSMOS ↑WER (%) ↓SIM (%) ↑DNSMOS ↑WER (%) ↓SIM (%) ↑DNSMOS ↑ Commercial API Models MiniMax-Speech-2.8-HD",
       "zh": "表头：Model × Noisy / Reverb / Unclear（WER (%) ↓ / SIM (%) ↑ / DNSMOS ↑ 各组）——商业 API 模型：MiniMax-Speech-2.8-HD（后续照原文）。"
      }
     ]
    },
    {
     "id": "eq-4-4-3-2",
     "type": "equation",
     "page": 13,
     "original": "0.85 66.72 3.464 0.83 61.56 3.065 1.28 68.33 3.174"
    },
    {
     "id": "eq-4-4-3-3",
     "type": "equation",
     "page": 13,
     "original": "MiniMax-Speech-2.8-HD·Denoise"
    },
    {
     "id": "eq-4-4-3-4",
     "type": "equation",
     "page": 13,
     "original": "0.83 63.83 3.728 0.87 56.53 3.343 1.58 67.84 3.241"
    },
    {
     "id": "eq-4-4-3-5",
     "type": "equation",
     "page": 13,
     "original": "ElevenLabs-v3"
    },
    {
     "id": "eq-4-4-3-6",
     "type": "equation",
     "page": 13,
     "original": "1.17 46.91 3.779 1.75 41.46 3.090 1.67 47.12 3.304"
    },
    {
     "id": "eq-4-4-3-7",
     "type": "equation",
     "page": 13,
     "original": "ElevenLabs-v3·Denoise"
    },
    {
     "id": "eq-4-4-3-8",
     "type": "equation",
     "page": 13,
     "original": "1.19 46.07 3.981 0.58 44.39 4.025 1.38 43.90 3.496"
    },
    {
     "id": "eq-4-4-3-9",
     "type": "equation",
     "page": 13,
     "original": "Open-source Models Qwen3-TTS-12Hz-1.7B-Base"
    },
    {
     "id": "eq-4-4-3-10",
     "type": "equation",
     "page": 13,
     "original": "2.01 65.61 3.595 2.11 63.42 2.887 2.85 70.62 3.050"
    },
    {
     "id": "eq-4-4-3-11",
     "type": "equation",
     "page": 13,
     "original": "LongCat-AudioDiT-3.5B"
    },
    {
     "id": "eq-4-4-3-12",
     "type": "equation",
     "page": 13,
     "original": "3.44 58.70 3.777 1.05 56.91 3.169 3.12 73.54 3.262"
    },
    {
     "id": "eq-4-4-3-13",
     "type": "equation",
     "page": 13,
     "original": "Dots.TTS-2B (SOAR)"
    },
    {
     "id": "eq-4-4-3-14",
     "type": "equation",
     "page": 13,
     "original": "2.90 76.69 3.221 2.12 72.38 2.888 2.16 76.69 3.070"
    },
    {
     "id": "eq-4-4-3-15",
     "type": "equation",
     "page": 13,
     "original": "VoxCPM2·Denoise"
    },
    {
     "id": "eq-4-4-3-16",
     "type": "equation",
     "page": 13,
     "original": "4.36 65.31 3.678 10.07 51.05 2.830 6.71 68.81 3.051"
    },
    {
     "id": "eq-4-4-3-17",
     "type": "equation",
     "page": 13,
     "original": "CosyVoice3-1.5B"
    },
    {
     "id": "eq-4-4-3-18",
     "type": "equation",
     "page": 13,
     "original": "1.56 75.40 3.301 1.78 71.91 3.021 2.39 72.06 3.113"
    },
    {
     "id": "eq-4-4-3-19",
     "type": "equation",
     "page": 13,
     "original": "Qwen-Audio-3.0-TTS"
    },
    {
     "id": "eq-4-4-3-20",
     "type": "equation",
     "page": 13,
     "original": "1.18 76.14 3.962 0.69 74.12 3.925 1.61 76.53 3.305"
    },
    {
     "id": "tab-4-4-3-2",
     "type": "table_caption",
     "page": 13,
     "original": "Table 10: Instruction-following performance and speaker similarity (%) on the bilingual benchmark. SA, NL, and ST denote single-attribute, natural-language multi-attribute, and structured-attribute instructions, respectively. Speaker similarity is measured by the ERes2Net cosine similarity between each synthesized utterance and its reference utterance. Overall is computed by averaging over all evaluation instances pooled across subsets. Bold and underlined values indicate the best and secondbest results in each column, respectively.",
     "zh": "表 10：双语基准上的指令跟随性能与说话人相似度（%）。SA、NL、ST 分别表示单属性、自然语言多属性与结构化属性指令。说话人相似度以每条合成语音与其参考语音之间的 ERes2Net 余弦相似度衡量。Overall 为跨子集汇集的所有评测实例上的平均值。加粗与下划线分别表示每列最佳与次佳结果。"
    },
    {
     "id": "p-4-4-3-5",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-4-4-3-5-1",
       "original": "Model Instruction Following (zh) Instruction Following (en) Speaker Similarity SA NL ST Overall SA NL ST Overall zh en IndexTTS2",
       "zh": "表头：Model × Instruction Following (zh) / Instruction Following (en)（SA / NL / ST / Overall）× Speaker Similarity（zh / en）——IndexTTS2（后续照原文）。"
      }
     ]
    },
    {
     "id": "eq-4-4-3-21",
     "type": "equation",
     "page": 13,
     "original": "65.00 42.67 40.67 54.39 67.50 37.33 62.00 59.39 64.97 66.25"
    },
    {
     "id": "eq-4-4-3-22",
     "type": "equation",
     "page": 13,
     "original": "CosyVoice3-1.5B"
    },
    {
     "id": "eq-4-4-3-23",
     "type": "equation",
     "page": 13,
     "original": "82.50 67.33 68.67 75.91 63.33 56.00 74.00 64.09 75.60 68.45"
    },
    {
     "id": "eq-4-4-3-24",
     "type": "equation",
     "page": 13,
     "original": "Qwen-Audio-3.0-TTS"
    },
    {
     "id": "eq-4-4-3-25",
     "type": "equation",
     "page": 13,
     "original": "87.50 72.00 65.33 78.94 83.33 76.00 78.00 80.45 73.27 66.66"
    }
   ]
  },
  {
   "id": "sec-4-4-4",
   "num": "4.4.4",
   "level": 2,
   "page": 13,
   "title": {
    "original": "Results of Instruction Following under Zero-shot Voice Cloning",
    "zh": "4.4.4 零样本声音克隆下的指令跟随结果"
   },
   "blocks": [
    {
     "id": "p-4-4-4-1",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-4-4-4-1-1",
       "original": "The benchmark contains 440 zero-shot voice-cloning cases, evenly split between Chinese and English, with single-attribute and natural-language or structured multi-attribute instructions.",
       "zh": "该基准包含 440 个零样本声音克隆案例，中英文各占一半，配有单属性指令以及自然语言或结构化的多属性指令。"
      },
      {
       "id": "s-4-4-4-1-2",
       "original": "For speaker preservation, ERes2Net cosine similarity is computed between the prompt and synthesized utterance.",
       "zh": "说话人保留方面，计算提示与合成语音之间的 ERes2Net 余弦相似度。"
      },
      {
       "id": "s-4-4-4-1-3",
       "original": "Gemini-2.5-Pro [44] is instructed to judge only how the utterance is spoken.",
       "zh": "Gemini-2.5-Pro [44] 被要求只判断语音是如何被说出来的。"
      },
      {
       "id": "s-4-4-4-1-4",
       "original": "Singleattribute cases receive a binary score.",
       "zh": "单属性案例给出二元评分。"
      },
      {
       "id": "s-4-4-4-1-5",
       "original": "Complex instructions are decomposed into affect, rate, volume, clarity, rhythm, and intonation; an LLM selects the three most important dimensions for each instruction and instantiates audible criteria before any system is evaluated.",
       "zh": "复杂指令被分解为情感、语速、音量、清晰度、节奏与语调；在任何系统被评测之前，由 LLM 为每条指令选出最重要的三个维度并实例化可听判据。"
      },
      {
       "id": "s-4-4-4-1-6",
       "original": "Each criterion is binary, giving a score from 0 to 3, and the criteria remain fixed across systems.",
       "zh": "每个判据都是二元的，得分从 0 到 3，且判据在各系统间保持固定。"
      }
     ]
    },
    {
     "id": "p-4-4-4-2",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-4-4-4-2-1",
       "original": "On a stratified calibration subset, Gemini reaches 70.0% agreement with human judgments for single-attribute instructions, with 92.3% precision, 64.9% recall, and 76.2% F1.",
       "zh": "在分层校准子集上，Gemini 在单属性指令上与人类判断的一致率为 70.0%，精确率 92.3%、召回率 64.9%、F1 为 76.2%。"
      },
      {
       "id": "s-4-4-4-2-2",
       "original": "Its lower positive rate indicates conservative judging (McNemar’s test, p = 0.007).",
       "zh": "其较低的阳性率表明它判得偏保守（McNemar 检验，p = 0.007）。"
      },
      {
       "id": "s-4-4-4-2-3",
       "original": "For complex instructions, criterion-level agreement is 56.7%, 72.0% of final scores differ by at most one point, and mean scores are 1.46 for humans and 1.48 for Gemini.",
       "zh": "对复杂指令，判据级一致率为 56.7%，72.0% 的最终得分相差至多 1 分，人类均分 1.46、Gemini 均分 1.48。"
      },
      {
       "id": "s-4-4-4-2-4",
       "original": "Blind review finds 35.4% of disputed criteria inherently ambiguous, with both judgments defensible.",
       "zh": "盲审发现 35.4% 的争议判据本质上就是模糊的，两种判断都说得通。"
      }
     ]
    },
    {
     "id": "p-4-4-4-3",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-4-4-4-3-1",
       "original": "We compare Qwen-Audio-3.0-TTS with IndexTTS2 [37] and CosyVoice3-1.5B, two recent systems that support style-controlled synthesis conditioned on a reference utterance.",
       "zh": "我们将 Qwen-Audio-3.0-TTS 与 IndexTTS2 [37] 和 CosyVoice3-1.5B 比较，这两个近期系统都支持以参考语音为条件的风格控制合成。"
      },
      {
       "id": "s-4-4-4-3-2",
       "original": "As shown in Table 10, Qwen-Audio-3.0-TTS obtains the best overall instruction-following results in both zh and en, with scores of 78.94 and 80.45, respectively.",
       "zh": "如 Table 10 所示，Qwen-Audio-3.0-TTS 在中英文上都取得最佳的整体指令跟随结果，得分分别为 78.94 与 80.45。"
      },
      {
       "id": "s-4-4-4-3-3",
       "original": "Its advantage is especially clear for natural-language instructions, suggesting a stronger ability to interpret flexible descriptions and translate multiple style requirements into audible speech characteristics.",
       "zh": "它在自然语言指令上的优势尤其明显，说明其解读灵活描述、并把多个风格要求转化为可听语音特征的能力更强。"
      },
      {
       "id": "s-4-4-4-3-4",
       "original": "Compared with CosyVoice3-1.5B, it improves bilingual instruction following while maintaining competitive speaker similarity, demonstrating stronger style control without substantially compromising prompt-voice preservation.",
       "zh": "与 CosyVoice3-1.5B 相比，它在保持有竞争力的说话人相似度的同时提升了双语指令跟随，展示了更强的风格控制而基本不牺牲提示音色的保留。"
      }
     ]
    },
    {
     "id": "p-4-4-4-4",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-4-4-4-4-1",
       "original": "CosyVoice3 Spk A CosyVoice3 Spk B",
       "zh": "（图例：CosyVoice3 Spk A / CosyVoice3 Spk B。）"
      }
     ]
    },
    {
     "id": "eq-4-4-4-1",
     "type": "equation",
     "page": 14,
     "original": "2.5"
    },
    {
     "id": "eq-4-4-4-2",
     "type": "equation",
     "page": 14,
     "original": "Qwen-Audio-3.0-TTS Spk A Qwen-Audio-3.0-TTS Spk B"
    },
    {
     "id": "eq-4-4-4-3",
     "type": "equation",
     "page": 14,
     "original": "2"
    },
    {
     "id": "eq-4-4-4-4",
     "type": "equation",
     "page": 14,
     "original": "CER / WER (%)"
    },
    {
     "id": "eq-4-4-4-5",
     "type": "equation",
     "page": 14,
     "original": "1.5 1.25 1.23 1.22 1.14 1.07 0.99 0.95 1 0.9"
    },
    {
     "id": "p-4-4-4-5",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-4-4-4-5-1",
       "original": "CosyVoice3 Spk C CosyVoice3 Spk D Qwen-Audio-3.0-TTS Spk C Qwen-Audio-3.0-TTS Spk D",
       "zh": "（图例：CosyVoice3 Spk C / CosyVoice3 Spk D / Qwen-Audio-3.0-TTS Spk C / Qwen-Audio-3.0-TTS Spk D。）"
      }
     ]
    },
    {
     "id": "eq-4-4-4-6",
     "type": "equation",
     "page": 14,
     "original": "2.07 2.04 2.02 1.96 1.79 1.69 1.6 1.51"
    },
    {
     "id": "p-4-4-4-6",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-4-4-4-6-1",
       "original": "test-zh test-en",
       "zh": "表头：Model × test-zh（CER(%)↓/SIM↑）× test-en（WER(%)↓/SIM↑）× test-hard（CER(%)↓/SIM↑）——Human 1.26/0.755(0.775)、2.14/0.734(0.742)、-/-；Vocoder Resyn.（后续照原文）。"
      }
     ]
    },
    {
     "id": "fig-4-4-4-1",
     "type": "figure_caption",
     "page": 14,
     "original": "Figure 5: Content-consistency results for speaker-adapted CosyVoice3 and Qwen-Audio-3.0-TTS models on four anonymized speakers. Lower CER/WER is better.",
     "zh": "图 5：说话人适配后的 CosyVoice3 与 Qwen-Audio-3.0-TTS 在四位匿名说话人上的内容一致性结果。CER/WER 越低越好。"
    }
   ]
  },
  {
   "id": "sec-4-5",
   "num": "4.5",
   "level": 2,
   "page": 14,
   "title": {
    "original": "Objective Results on Speaker-Adapted Models",
    "zh": "4.5 说话人适配模型的客观结果"
   },
   "blocks": [
    {
     "id": "p-4-5-1",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-4-5-1-1",
       "original": "We compare speaker-adapted versions of CosyVoice3 and Qwen-Audio-3.0-TTS on the standard SEED-TTS-Eval test-zh and test-en sets for four anonymized target speakers.",
       "zh": "我们在标准 SEED-TTS-Eval 的 test-zh 与 test-en 集上，比较了四位匿名目标说话人上经说话人适配的 CosyVoice3 与 Qwen-Audio-3.0-TTS。"
      },
      {
       "id": "s-4-5-1-2",
       "original": "As shown in Figure 5, Qwen-Audio-3.0-TTS consistently improves content consistency across all four speakers.",
       "zh": "如 Figure 5 所示，Qwen-Audio-3.0-TTS 在全部四位说话人上都持续改善内容一致性。"
      },
      {
       "id": "s-4-5-1-3",
       "original": "On test-",
       "zh": "在 test-en 上，WER 分别从 2.02% 降到 1.79%、从 1.96% 降到 1.60%、从 2.07% 降到 1.69%、从 2.04% 降到 1.51%。"
      }
     ]
    },
    {
     "id": "eq-4-5-1",
     "type": "equation",
     "page": 14,
     "original": "zh, CER decreases from 1.25% to 1.07% for Speaker A, from 1.23% to 0.99% for Speaker B, from 1.22% to 0.95% for Speaker C, and from 1.14% to 0.90% for Speaker D. On test-en, WER decreases from 2.02% to 1.79%, from 1.96% to 1.60%, from 2.07% to 1.69%, and from 2.04% to"
    },
    {
     "id": "p-4-5-2",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-4-5-2-1",
       "original": "1.51%, respectively.",
       "zh": "（正文残句）……分别为 1.51%。"
      }
     ]
    },
    {
     "id": "p-4-5-3",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-4-5-3-1",
       "original": "These CER/WER metrics measure content consistency and help detect intelligibility and pronunciation regressions.",
       "zh": "这些 CER/WER 指标衡量内容一致性，有助于发现可懂度与发音上的回退。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-4-6",
   "num": "4.6",
   "level": 2,
   "page": 14,
   "title": {
    "original": "Subjective Evaluation Results",
    "zh": "4.6 主观评测结果"
   },
   "blocks": []
  },
  {
   "id": "sec-4-6-1",
   "num": "4.6.1",
   "level": 2,
   "page": 14,
   "title": {
    "original": "Subjective Evaluation on Dialect Speech Synthesis",
    "zh": "4.6.1 方言语音合成的主观评测"
   },
   "blocks": [
    {
     "id": "p-4-6-1-1",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-4-6-1-1-1",
       "original": "We conduct a native-speaker subjective evaluation covering 20 Chinese dialects with 50 prompts per dialect.",
       "zh": "我们进行了母语者主观评测，覆盖 20 种汉语方言，每种方言 50 条提示。"
      },
      {
       "id": "s-4-6-1-1-2",
       "original": "Three native speakers independently annotate every utterance.",
       "zh": "每句语音由三位母语者独立标注。"
      },
      {
       "id": "s-4-6-1-1-3",
       "original": "Dialect Authenticity measures whether speech achieves the requested regional variety without drifting toward Mandarin or another dialect.",
       "zh": "方言真实度衡量语音是否达到了所要求的地域变体，而不漂向普通话或其他方言。"
      },
      {
       "id": "s-4-6-1-1-4",
       "original": "Pronunciation accuracy penalizes missing, substituted, and inserted characters.",
       "zh": "发音准确率惩罚缺字、替字与插入字。"
      },
      {
       "id": "s-4-6-1-1-5",
       "original": "Prosodic naturalness assesses pace, pause placement, and intonation against native habits.",
       "zh": "韵律自然度对照母语习惯评估语速、停顿位置与语调。"
      },
      {
       "id": "s-4-6-1-1-6",
       "original": "Annotators use four severity levels—Perfect, P2, P1, and P0—mapped to scores from 4 to 1, plus diagnostic error tags.",
       "zh": "标注者使用四级严重度——Perfect、P2、P1、P0——映射为 4 到 1 分，并附诊断性错误标签。"
      }
     ]
    },
    {
     "id": "p-4-6-1-2",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-4-6-1-2-1",
       "original": "For aggregate analysis, we map the four severity levels to numeric scores: Perfect=4, P2=3, P1=2, and P0=1.",
       "zh": "汇总分析时，我们将四级严重度映射为数值分数：Perfect=4、P2=3、P1=2、P0=1。"
      },
      {
       "id": "s-4-6-1-2-2",
       "original": "The mean score is then used as a dimension-level perceptual quality indicator, where a higher score indicates better subjective quality.",
       "zh": "均分随后被用作维度级的感知质量指标，分数越高表示主观质量越好。"
      }
     ]
    },
    {
     "id": "p-4-6-1-3",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-4-6-1-3-1",
       "original": "As shown in Table 11, Qwen-Audio-3.0-TTS achieves strong overall intelligibility and perceptual quality in multi-dialect speech synthesis.",
       "zh": "如 Table 11 所示，Qwen-Audio-3.0-TTS 在多方言语音合成中取得了很强的整体可懂度与感知质量。"
      },
      {
       "id": "s-4-6-1-3-2",
       "original": "Pronunciation accuracy is the most stable dimension, with 93.5% Perfect labels and no P1/P0 cases, suggesting reliable character-level content preservation across dialects.",
       "zh": "发音准确率是最稳定的维度，93.5% 为 Perfect 标签且无 P1/P0 案例，说明跨方言的字级内容保留很可靠。"
      },
      {
       "id": "s-4-6-1-3-3",
       "original": "Dialect authenticity and prosodic naturalness obtain 66.7% and 68.1% Perfect while most remaining cases are mild P2 errors.",
       "zh": "方言真实度与韵律自然度分别获得 66.7% 与 68.1% 的 Perfect，其余案例大多为轻度 P2 错误。"
      }
     ]
    },
    {
     "id": "tab-4-6-1-1",
     "type": "table_caption",
     "page": 15,
     "original": "Table 11: Subjective evaluation results of Qwen-Audio-3.0-TTS on multi-dialect speech synthesis. Each dimension is rated with four severity levels, where Perfect, P2, P1, and P0 are mapped to scores of 4, 3, 2, and 1, respectively.",
     "zh": "表 11：Qwen-Audio-3.0-TTS 在多方言语音合成上的主观评测结果。每个维度按四级严重度评分，Perfect、P2、P1、P0 分别映射为 4、3、2、1 分。"
    }
   ]
  },
  {
   "id": "sec-dimension",
   "num": null,
   "level": 2,
   "page": 15,
   "title": {
    "original": "Dimension",
    "zh": "维度"
   },
   "blocks": [
    {
     "id": "p-dimension-1",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-dimension-1-1",
       "original": "Perfect P2 P1 P0 Mean Score",
       "zh": "Perfect、P2、P1、P0、均分（此句为 Table 11 表头的抽取残留）。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-dialect-authenticity",
   "num": null,
   "level": 2,
   "page": 15,
   "title": {
    "original": "Dialect Authenticity",
    "zh": "方言真实度"
   },
   "blocks": [
    {
     "id": "eq-dialect-authenticity-1",
     "type": "equation",
     "page": 15,
     "original": "66.7% 31.5% 0.8% 1.0% 3.639"
    },
    {
     "id": "eq-dialect-authenticity-2",
     "type": "equation",
     "page": 15,
     "original": "Pronunciation Accuracy"
    },
    {
     "id": "eq-dialect-authenticity-3",
     "type": "equation",
     "page": 15,
     "original": "93.5% 6.5% 0.0% 0.0% 3.935"
    },
    {
     "id": "eq-dialect-authenticity-4",
     "type": "equation",
     "page": 15,
     "original": "Prosodic Naturalness"
    },
    {
     "id": "eq-dialect-authenticity-5",
     "type": "equation",
     "page": 15,
     "original": "68.1% 31.9% 0.0% 0.0% 3.680"
    }
   ]
  },
  {
   "id": "sec-4-6-2",
   "num": "4.6.2",
   "level": 2,
   "page": 15,
   "title": {
    "original": "Subjective Evaluation of Instruction Following Capabilities",
    "zh": "4.6.2 指令跟随能力的主观评测"
   },
   "blocks": [
    {
     "id": "p-4-6-2-1",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-4-6-2-1-1",
       "original": "We conduct Arena-based human evaluation to assess the instruction-controlled speech synthesis capability of Qwen-Audio-3.0-TTS.",
       "zh": "我们进行了竞技场式（Arena）人工评测，以评估 Qwen-Audio-3.0-TTS 的指令控制语音合成能力。"
      },
      {
       "id": "s-4-6-2-1-2",
       "original": "The evaluation considers two independently rated dimensions: Instruction Following and Prosodic Naturalness.",
       "zh": "评测考虑两个独立评分的维度：指令跟随与韵律自然度。"
      },
      {
       "id": "s-4-6-2-1-3",
       "original": "Instruction Following measures whether the synthesized speech accurately follows the specified control instructions, including emotion, speaking rate, role, and speaking style.",
       "zh": "指令跟随衡量合成语音是否准确遵循指定的控制指令，包括情感、语速、角色与说话风格。"
      },
      {
       "id": "s-4-6-2-1-4",
       "original": "Prosodic Naturalness evaluates whether the generated prosody sounds natural and human-like, regardless of whether the target instruction is correctly satisfied.",
       "zh": "韵律自然度评估生成的韵律是否自然、像真人，而不管目标指令是否被正确满足。"
      },
      {
       "id": "s-4-6-2-1-5",
       "original": "This separation allows us to distinguish instruction controllability from perceptual naturalness.",
       "zh": "这种分离让我们能把指令可控性与感知自然度区分开来。"
      }
     ]
    },
    {
     "id": "p-4-6-2-2",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-4-6-2-2-1",
       "original": "The evaluation results are shown in Table 12.",
       "zh": "评测结果见 Table 12。"
      },
      {
       "id": "s-4-6-2-2-2",
       "original": "Qwen-Audio-3.0-TTS achieves win rates of 44.8% and 55.6% on the two dimensions, clearly improving over the previous-generation baseline.",
       "zh": "Qwen-Audio-3.0-TTS 在两个维度上的胜率分别为 44.8% 与 55.6%，明显优于上一代基线。"
      }
     ]
    },
    {
     "id": "tab-4-6-2-1",
     "type": "table_caption",
     "page": 15,
     "original": "Table 12: Arena-based human evaluation of instruction-controlled synthesis. Win rates are reported in percentage; higher is better, and the best result in each column is shown in bold.",
     "zh": "表 12：指令控制合成的竞技场式人工评测。胜率以百分比报告，越高越好，每列最佳结果加粗。"
    }
   ]
  },
  {
   "id": "sec-system",
   "num": null,
   "level": 2,
   "page": 15,
   "title": {
    "original": "System",
    "zh": "系统"
   },
   "blocks": [
    {
     "id": "p-system-1",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-system-1-1",
       "original": "Instruction Following Prosodic Naturalness Previous-Gen Baseline",
       "zh": "（表格：指令遵循（Instruction Following）× 韵律自然度（Prosodic Naturalness）——上一代基线 30.9/42.9；Qwen-Audio-3.0-TTS 44.8/55.6。）"
      }
     ]
    },
    {
     "id": "eq-system-1",
     "type": "equation",
     "page": 15,
     "original": "30.9 42.9"
    },
    {
     "id": "eq-system-2",
     "type": "equation",
     "page": 15,
     "original": "Qwen-Audio-3.0-TTS"
    },
    {
     "id": "eq-system-3",
     "type": "equation",
     "page": 15,
     "original": "44.8 55.6"
    }
   ]
  },
  {
   "id": "sec-5",
   "num": "5",
   "level": 1,
   "page": 15,
   "title": {
    "original": "Conclusion",
    "zh": "5 结论"
   },
   "blocks": [
    {
     "id": "p-5-1",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-5-1-1",
       "original": "In this report, we present Qwen-Audio-3.0-TTS, a multilingual, freely controllable and highly robust speech synthesis system oriented towards production deployment.",
       "zh": "在本报告中，我们提出 Qwen-Audio-3.0-TTS，一个面向生产部署的多语言、自由可控且高度鲁棒的语音合成系统。"
      },
      {
       "id": "s-5-1-2",
       "original": "Its 12.5 Hz speech tokenizer, together with chunk-based flow-matching and causal vocoder, reduces end-to-end latency.",
       "zh": "其 12.5 Hz 语音分词器与基于片段的流匹配、因果声码器一起降低了端到端延迟。"
      },
      {
       "id": "s-5-1-3",
       "original": "Joint LM–FM training and LM reinforcement learning deliver a strong balance of content consistency and naturalness.",
       "zh": "LM–FM 联合训练与 LM 强化学习在内容一致性与自然度之间取得了很强的平衡。"
      },
      {
       "id": "s-5-1-4",
       "original": "Acoustic robustness training and FM reinforcement learning progressively improve speaker similarity, audio fidelity and robustness.",
       "zh": "声学鲁棒性训练与 FM 强化学习逐步提升了说话人相似度、音频保真度与鲁棒性。"
      },
      {
       "id": "s-5-1-5",
       "original": "Qwen-Audio-3.0-TTS achieves state-of-the-art performance on many reported dimensions or the strongest aggregate scores across SEED-TTS- Eval, CV3-Eval, instruction-following, long-form, and adverse-prompt evaluations.",
       "zh": "Qwen-Audio-3.0-TTS 在 SEED-TTS-Eval、CV3-Eval、指令跟随、长音频与恶劣提示评测中，在所报告的大多数维度上达到 SOTA 或取得最强综合得分。"
      },
      {
       "id": "s-5-1-6",
       "original": "It also ranks first on the independent Artificial Analysis Text-to-Speech Arena leaderboard released on July 16,",
       "zh": "它还在 2026 年 7 月 16 日发布的独立 Artificial Analysis 文本转语音竞技场榜单上排名第一。"
      }
     ]
    },
    {
     "id": "eq-5-1",
     "type": "equation",
     "page": 15,
     "original": "2026."
    },
    {
     "id": "p-5-2",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-5-2-1",
       "original": "Beyond individual benchmark gains, Qwen-Audio-3.0-TTS advances TTS toward a unified and practical speech-generation system.",
       "zh": "超越单个基准的提升，Qwen-Audio-3.0-TTS 把 TTS 向统一而实用的语音生成系统推进了一步。"
      },
      {
       "id": "s-5-2-2",
       "original": "A single model integrates multilingual and multi-dialect synthesis, zero-shot voice cloning, free-style instruction following, fine-grained inline control, one-pass long-form generation and robustness to degraded real-world prompts.",
       "zh": "单一模型集成了多语言与多方言合成、零样本声音克隆、自由形式指令跟随、细粒度行内控制、单次长音频生成，以及对真实世界退化提示的鲁棒性。"
      },
      {
       "id": "s-5-2-3",
       "original": "In addition, we propose a scalable speaker adaptation protocol based on Qwen-Audio-3.0-TTS.",
       "zh": "此外，我们还提出了基于 Qwen-Audio-3.0-TTS 的可扩展说话人适配协议。"
      },
      {
       "id": "s-5-2-4",
       "original": "We believe this provides a practical foundation for the next generation of general-purpose, controllable, and deployment-ready TTS systems.",
       "zh": "我们相信，这为下一代通用、可控、可部署的 TTS 系统提供了实用的基础。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-acknowledgements",
   "num": null,
   "level": 1,
   "page": 15,
   "title": {
    "original": "Acknowledgements",
    "zh": "致谢"
   },
   "blocks": [
    {
     "id": "p-acknowledgements-1",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-acknowledgements-1-1",
       "original": "We thank Bangduo Chen, Biao Tian, Bin Ma, Bin Yuan, Binbin Zhang, Chaohong Tan, Chen Ding, Chong Deng, Chongde Zhang, Gang Qiao, Hongzhi Cai, Jianwei Yu, Jiaqi Shi, Jiaqing Liu, Jixing Yu, Junhao Xu, Lingyun Zuo, Menglin Wu, Qian Chen, Sitong Zhao, Xian Yang, Yajie Wen, Yang Bai, Yiping Peng, Yuting Teng, Ze Xu, Zhenglin Wang, Zhifu Gao, Ziyi Cheng for their valuable contributions to data curation, system development, evaluation, and infrastructure support.",
       "zh": "我们感谢 Bangduo Chen、Biao Tian、Bin Ma、Bin Yuan、Binbin Zhang、Chaohong Tan、Chen Ding、Chong Deng、Chongde Zhang、Gang Qiao、Hongzhi Cai、Jianwei Yu、Jiaqi Shi、Jiaqing Liu、Jixing Yu、Junhao Xu、Lingyun Zuo、Menglin Wu、Qian Chen、Sitong Zhao、Xian Yang、Yajie Wen、Yang Bai、Yiping Peng、Yuting Teng、Ze Xu、Zhenglin Wang、Zhifu Gao、Ziyi Cheng 在数据整理、系统开发、评测与基础设施支持方面的宝贵贡献。"
      },
      {
       "id": "s-acknowledgements-1-2",
       "original": "Names are listed alphabetically by given name.",
       "zh": "姓名按名字字母序排列。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-references",
   "num": null,
   "level": 1,
   "page": 17,
   "title": {
    "original": "References",
    "zh": "References"
   },
   "blocks": [
    {
     "id": "p-references-1",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-1-1",
       "original": "[1] Chengyi Wang, Sanyuan Chen, Yu Wu, Ziqiang Zhang, Long Zhou, Shujie Liu, Zhuo Chen, Yanqing Liu, Huaming Wang, Jinyu Li, Lei He, Sheng Zhao, and Furu Wei."
      },
      {
       "id": "s-references-1-2",
       "original": "Neural codec language models are zero-shot text to speech synthesizers."
      },
      {
       "id": "s-references-1-3",
       "original": "CoRR, abs/2301.02111, 2023."
      }
     ]
    },
    {
     "id": "p-references-2",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-2-1",
       "original": "[2] Philip Anastassiou, Jiawei Chen, Jitong Chen, Yuanzhe Chen, Zhuo Chen, Ziyi Chen, Jian Cong, Lelai Deng, Chuang Ding, Lu Gao, Mingqing Gong, Peisong Huang, Qingqing Huang, Zhiying Huang, Yuanyuan Huo, Dongya Jia, Chumin Li, Feiya Li, Hui Li, Jiaxin Li, Xiaoyang Li, Xingxing Li, Lin Liu, Shouda Liu, Sichao Liu, Xudong Liu, Yuchen Liu, Zhengxi Liu, Lu Lu, Junjie Pan, Xin Wang, Yuping Wang, Yuxuan Wang, Zhen Wei, Jian Wu, Chao Yao, Yifeng Yang, Yuanhao Yi, Junteng Zhang, Qidi Zhang, Shuo Zhang, Wenjie Zhang, Yang Zhang, Zilin Zhao, Dejian Zhong, and Xiaobin Zhuang."
      },
      {
       "id": "s-references-2-2",
       "original": "Seed-tts: A family of high-quality versatile speech generation models."
      },
      {
       "id": "s-references-2-3",
       "original": "CoRR, abs/2406.02430, 2024."
      }
     ]
    },
    {
     "id": "p-references-3",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-3-1",
       "original": "[3] Matthew Le, Apoorv Vyas, Bowen Shi, Brian Karrer, Leda Sari, Rashel Moritz, Mary Williamson, Vimal Manohar, Yossi Adi, Jay Mahadeokar, and Wei-Ning Hsu."
      },
      {
       "id": "s-references-3-2",
       "original": "Voicebox: Textguided multilingual universal speech generation at scale."
      },
      {
       "id": "s-references-3-3",
       "original": "In NeurIPS, 2023."
      }
     ]
    },
    {
     "id": "p-references-4",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-4-1",
       "original": "[4] Zhihao Du, Changfeng Gao, Yuxuan Wang, Fan Yu, Tianyu Zhao, Hao Wang, Xiang Lv, Hui Wang, Chongjia Ni, Xian Shi, Keyu An, Guanrou Yang, Yabin Li, Yanni Chen, Zhifu Gao, Qian Chen, Yue Gu, Mengzhe Chen, Yafeng Chen, Shiliang Zhang, Wen Wang, and Jieping Ye."
      },
      {
       "id": "s-references-4-2",
       "original": "Cosyvoice 3: Towards in-the-wild speech generation via scaling-up and post-training,"
      }
     ]
    },
    {
     "id": "eq-references-1",
     "type": "equation",
     "page": 17,
     "original": "2025."
    },
    {
     "id": "p-references-5",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-5-1",
       "original": "[5] Xinsheng Wang, Mingqi Jiang, Ziyang Ma, Ziyu Zhang, Songxiang Liu, Linqin Li, Zheng Liang, Qixi Zheng, Rui Wang, Xiaoqin Feng, et al. Spark-tts: An efficient llm-based text-tospeech model with single-stream decoupled speech tokens. arXiv preprint arXiv:2503.01710,"
      }
     ]
    },
    {
     "id": "eq-references-2",
     "type": "equation",
     "page": 17,
     "original": "2025."
    },
    {
     "id": "p-references-6",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-6-1",
       "original": "[6] Hangrui Hu, Xinfa Zhu, Ting He, Dake Guo, Bin Zhang, Xiong Wang, Zhifang Guo, Ziyue Jiang, Hongkun Hao, Zishan Guo, Xinyu Zhang, Pei Zhang, Baosong Yang, Jin Xu, Jingren Zhou, and Junyang Lin."
      },
      {
       "id": "s-references-6-2",
       "original": "Qwen3-tts technical report, 2026."
      }
     ]
    },
    {
     "id": "p-references-7",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-7-1",
       "original": "[7] Sefik Emre Eskimez, Xiaofei Wang, Manthan Thakker, Canrun Li, Chung-Hsien Tsai, Zhen Xiao, Hemin Yang, Zirun Zhu, Min Tang, Xu Tan, Yanqing Liu, Sheng Zhao, and Naoyuki Kanda."
      }
     ]
    },
    {
     "id": "p-references-8",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-8-1",
       "original": "E2 TTS: embarrassingly easy fully non-autoregressive zero-shot TTS."
      }
     ]
    },
    {
     "id": "p-references-9",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-9-1",
       "original": "CoRR, abs/2406.18009, 2024."
      }
     ]
    },
    {
     "id": "p-references-10",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-10-1",
       "original": "[8] Yushen Chen, Zhikang Niu, Ziyang Ma, Keqi Deng, Chunhui Wang, Jian Zhao, Kai Yu, and Xie Chen."
      },
      {
       "id": "s-references-10-2",
       "original": "F5-TTS: A fairytaler that fakes fluent and faithful speech with flow matching."
      }
     ]
    },
    {
     "id": "p-references-11",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-11-1",
       "original": "CoRR, abs/2410.06885, 2024."
      }
     ]
    },
    {
     "id": "p-references-12",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-12-1",
       "original": "[9] Zhihao Du, Qian Chen, Shiliang Zhang, Kai Hu, Heng Lu, Yexin Yang, Hangrui Hu, Siqi Zheng, Yue Gu, Ziyang Ma, Zhifu Gao, and Zhijie Yan."
      }
     ]
    },
    {
     "id": "p-references-13",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-13-1",
       "original": "Cosyvoice: A scalable multilingual zero-shot text-to-speech synthesizer based on supervised semantic tokens."
      }
     ]
    },
    {
     "id": "p-references-14",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-14-1",
       "original": "CoRR, abs/2407.05407, 2024."
      }
     ]
    },
    {
     "id": "p-references-15",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-15-1",
       "original": "[10] Zhihao Du, Yuxuan Wang, Qian Chen, Xian Shi, Xiang Lv, Tianyu Zhao, Zhifu Gao, Yexin Yang, Changfeng Gao, Hui Wang, et al. Cosyvoice 2: Scalable streaming speech synthesis with large language models. arXiv preprint arXiv:2412.10117, 2024."
      }
     ]
    },
    {
     "id": "p-references-16",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-16-1",
       "original": "[11] Dongya Jia, Zhuo Chen, Jiawei Chen, Chenpeng Du, Jian Wu, Jian Cong, Xiaobin Zhuang, Chumin Li, Zhen Wei, Yuping Wang, et al. Ditar: Diffusion transformer autoregressive modeling for speech generation. arXiv preprint arXiv:2502.03930, 2025."
      }
     ]
    },
    {
     "id": "p-references-17",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-17-1",
       "original": "[12] Shi Lian, Changtao Li, Bohan Li, Hankun Wang, Da Zheng, Junfeng Tian, Yufeng Ma, Colin Zhang, and Kai Yu. dots.tts technical report, 2026."
      }
     ]
    },
    {
     "id": "p-references-18",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-18-1",
       "original": "[13] Yixuan Zhou, Guoyang Zeng, Xin Liu, Xiang Li, Renjie Yu, Jiancheng Gui, Jiaheng Wu, Ziyang Wang, Xudong Shen, Runchuan Ye, Zhisheng Zhang, Jiuyang Zhou, Bingsong Bai, Weiyue Sun, Mengyuan Deng, Qundong Shi, Zhiyong Wu, and Zhiyuan Liu."
      },
      {
       "id": "s-references-18-2",
       "original": "Voxcpm2 technical report, 2026."
      }
     ]
    },
    {
     "id": "p-references-19",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-19-1",
       "original": "[14] Sang gil Lee, Wei Ping, Boris Ginsburg, Bryan Catanzaro, and Sungroh Yoon."
      },
      {
       "id": "s-references-19-2",
       "original": "Bigvgan: A universal neural vocoder with large-scale training."
      },
      {
       "id": "s-references-19-3",
       "original": "In The Eleventh International Conference on Learning Representations, 2023."
      }
     ]
    },
    {
     "id": "p-references-20",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-20-1",
       "original": "[15] Keyu An, Qian Chen, Chong Deng, Zhihao Du, Changfeng Gao, Zhifu Gao, Yue Gu, Ting He, Hangrui Hu, Kai Hu, Shengpeng Ji, Yabin Li, Zerui Li, Heng Lu, Haoneng Luo, Xiang Lv, Bin Ma, Ziyang Ma, Chongjia Ni, Changhe Song, Jiaqi Shi, Xian Shi, Hao Wang, Wen Wang, Yuxuan Wang, Zhangyu Xiao, Zhijie Yan, Yexin Yang, Bin Zhang, Qinglin Zhang, Shiliang Zhang, Nan Zhao, and Siqi Zheng."
      },
      {
       "id": "s-references-20-2",
       "original": "Funaudiollm: Voice understanding and generation foundation models for natural interaction between humans and llms, 2024."
      }
     ]
    },
    {
     "id": "p-references-21",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-21-1",
       "original": "[16] Fabian Mentzer, David Minnen, Eirikur Agustsson, and Michael Tschannen."
      },
      {
       "id": "s-references-21-2",
       "original": "Finite scalar quantization: VQ-VAE made simple."
      },
      {
       "id": "s-references-21-3",
       "original": "In ICLR."
      },
      {
       "id": "s-references-21-4",
       "original": "OpenReview.net, 2024."
      }
     ]
    },
    {
     "id": "p-references-22",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-22-1",
       "original": "[17] Qian Chen, Yafeng Chen, Yanni Chen, Mengzhe Chen, Yingda Chen, Chong Deng, Zhihao Du, Ruize Gao, Changfeng Gao, Zhifu Gao, et al. MinMo: A multimodal large language model for seamless voice interaction. arXiv preprint arXiv:2501.06282, 2025."
      }
     ]
    },
    {
     "id": "p-references-23",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-23-1",
       "original": "[18] Fan Yu, Tao Wang, You Wu, Lin Zhu, Wei Deng, Weisheng Han, Wenchao Wang, Lin Hu, Xiangyu Liang, Xiaodong He, Yankun Huang, Yu Gu, Yuan Liu, Yuxuan Wang, Zhangyu Xiao, Ziteng Wang, Boya Dong, Feng Dang, Jinming Chen, Jingdong Li, Jun Wang, Yechen Jin, Yuan Zhang, Zhengyan Sheng, and Xin Wang."
      },
      {
       "id": "s-references-23-2",
       "original": "Joyvoice: Long-context conditioning for anthropomorphic multi-speaker conversational synthesis, 2025."
      }
     ]
    },
    {
     "id": "p-references-24",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-24-1",
       "original": "[19] Zhihong Shao, Peiyi Wang, Qihao Zhu, Runxin Xu, Junxiao Song, Xiao Bi, Haowei Zhang, Mingchuan Zhang, Y."
      },
      {
       "id": "s-references-24-2",
       "original": "K."
      },
      {
       "id": "s-references-24-3",
       "original": "Li, Y."
      },
      {
       "id": "s-references-24-4",
       "original": "Wu, and Daya Guo."
      },
      {
       "id": "s-references-24-5",
       "original": "Deepseekmath: Pushing the limits of mathematical reasoning in open language models, 2024."
      }
     ]
    },
    {
     "id": "p-references-25",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-25-1",
       "original": "[20] Eric Jang, Shixiang Gu, and Ben Poole."
      },
      {
       "id": "s-references-25-2",
       "original": "Categorical reparameterization with gumbel-softmax."
      }
     ]
    },
    {
     "id": "p-references-26",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-26-1",
       "original": "In International Conference on Learning Representations, 2017."
      }
     ]
    },
    {
     "id": "p-references-27",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-27-1",
       "original": "[21] Haoxu Wang, Biao Tian, Weiqin Li, Xiang Lv, Han Zhao, and Xiangang Li."
      },
      {
       "id": "s-references-27-2",
       "original": "Flowtts-grpo: Online reinforcement learning with multi-objective reward optimization for flow-matching based text-to-speech, 2026."
      }
     ]
    },
    {
     "id": "p-references-28",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-28-1",
       "original": "[22] Haoxu Wang, Biao Tian, Yiheng Jiang, Zexu Pan, Shengkui Zhao, Bin Ma, Daren Chen, and Xiangang Li."
      },
      {
       "id": "s-references-28-2",
       "original": "Flowse-grpo: Training flow matching speech enhancement via online reinforcement learning."
      },
      {
       "id": "s-references-28-3",
       "original": "In ICASSP 2026 - 2026 IEEE International Conference on Acoustics, Speech and Signal Processing, pages 16182–16186, 2026."
      }
     ]
    },
    {
     "id": "p-references-29",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-29-1",
       "original": "[23] Jie Liu, Gongye Liu, Jiajun Liang, Yangguang Li, Jiaheng Liu, Xintao Wang, Pengfei Wan, Di Zhang, and Wanli Ouyang."
      },
      {
       "id": "s-references-29-2",
       "original": "Flow-grpo: Training flow matching models via online rl. arXiv preprint arXiv:2505.05470, 2025."
      }
     ]
    },
    {
     "id": "p-references-30",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-30-1",
       "original": "[24] Jonathan Ho and Tim Salimans."
      },
      {
       "id": "s-references-30-2",
       "original": "Classifier-free diffusion guidance."
      },
      {
       "id": "s-references-30-3",
       "original": "CoRR, abs/2207.12598,"
      }
     ]
    },
    {
     "id": "eq-references-3",
     "type": "equation",
     "page": 18,
     "original": "2022."
    },
    {
     "id": "p-references-31",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-31-1",
       "original": "[25] Jianlin Su, Murtadha H."
      },
      {
       "id": "s-references-31-2",
       "original": "M.",
       "zh": "在解码器一侧，Quantizer Decoder 将 token 上采样为 25 Hz 表征 H2，由 Voice Encoder-2 处理后送入 MinMo LLM。"
      },
      {
       "id": "s-references-31-3",
       "original": "Ahmed, Yu Lu, Shengfeng Pan, Wen Bo, and Yunfeng Liu."
      },
      {
       "id": "s-references-31-4",
       "original": "Roformer: Enhanced transformer with rotary position embedding."
      },
      {
       "id": "s-references-31-5",
       "original": "Neurocomputing, 568:127063,"
      }
     ]
    },
    {
     "id": "eq-references-4",
     "type": "equation",
     "page": 18,
     "original": "2024."
    },
    {
     "id": "p-references-32",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-32-1",
       "original": "[26] Qwen Team."
      },
      {
       "id": "s-references-32-2",
       "original": "Qwen2.5: A party of foundation models, September 2024."
      }
     ]
    },
    {
     "id": "p-references-33",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-33-1",
       "original": "[27] Edward J."
      },
      {
       "id": "s-references-33-2",
       "original": "Hu, Yelong Shen, Phillip Wallis, Zeyuan Allen-Zhu, Yuanzhi Li, Shean Wang, Lu Wang, and Weizhu Chen."
      },
      {
       "id": "s-references-33-3",
       "original": "LoRA: Low-rank adaptation of large language models."
      },
      {
       "id": "s-references-33-4",
       "original": "In International Conference on Learning Representations, 2022."
      }
     ]
    },
    {
     "id": "p-references-34",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-34-1",
       "original": "[28] Alec Radford, Jong Wook Kim, Tao Xu, Greg Brockman, Christine McLeavey, and Ilya Sutskever."
      },
      {
       "id": "s-references-34-2",
       "original": "Robust speech recognition via large-scale weak supervision."
      },
      {
       "id": "s-references-34-3",
       "original": "In Andreas Krause, Emma Brunskill, Kyunghyun Cho, Barbara Engelhardt, Sivan Sabato, and Jonathan Scarlett, editors, International Conference on Machine Learning, ICML 2023, 23-29 July 2023, Honolulu, Hawaii, USA, volume 202 of Proceedings of Machine Learning Research, pages 28492– 28518."
      },
      {
       "id": "s-references-34-4",
       "original": "PMLR, 2023."
      }
     ]
    },
    {
     "id": "p-references-35",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-35-1",
       "original": "[29] Zhifu Gao, Shiliang Zhang, Ian McLoughlin, and Zhijie Yan."
      },
      {
       "id": "s-references-35-2",
       "original": "Paraformer: Fast and accurate parallel transformer for non-autoregressive end-to-end speech recognition."
      }
     ]
    },
    {
     "id": "p-references-36",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-36-1",
       "original": "In Interspeech, pages 2063–2067."
      },
      {
       "id": "s-references-36-2",
       "original": "ISCA, 2022."
      }
     ]
    },
    {
     "id": "p-references-37",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-37-1",
       "original": "[30] Zhifu Gao, Zerui Li, Jiaming Wang, Haoneng Luo, Xian Shi, Mengzhe Chen, Yabin Li, Lingyun Zuo, Zhihao Du, Zhangyu Xiao, et al. Funasr: A fundamental end-to-end speech recognition toolkit. arXiv preprint arXiv:2305.11013, 2023."
      }
     ]
    },
    {
     "id": "p-references-38",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-references-38-1",
       "original": "[31] Yafeng Chen, Siqi Zheng, Hui Wang, Luyao Cheng, Qian Chen, and Jiajun Qi."
      }
     ]
    },
    {
     "id": "p-references-39",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-references-39-1",
       "original": "An enhanced res2net with local and global feature fusion for speaker verification. arXiv preprint arXiv:2305.12838, 2023."
      },
      {
       "id": "s-references-39-2",
       "original": "[32] Chandan K."
      },
      {
       "id": "s-references-39-3",
       "original": "A."
      },
      {
       "id": "s-references-39-4",
       "original": "Reddy, Vishak Gopal, and Ross Cutler."
      },
      {
       "id": "s-references-39-5",
       "original": "Dnsmos P.835: A non-intrusive perceptual objective speech quality metric to evaluate noise suppressors."
      },
      {
       "id": "s-references-39-6",
       "original": "In ICASSP, pages 886–890."
      }
     ]
    },
    {
     "id": "p-references-40",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-references-40-1",
       "original": "IEEE, 2022."
      },
      {
       "id": "s-references-40-2",
       "original": "[33] Zhengyang Chen, Sanyuan Chen, Yu Wu, Yao Qian, Chengyi Wang, Shujie Liu, Yanmin Qian, and Michael Zeng."
      },
      {
       "id": "s-references-40-3",
       "original": "Large-scale self-supervised speech representation learning for automatic speaker verification."
      }
     ]
    },
    {
     "id": "p-references-41",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-references-41-1",
       "original": "In ICASSP 2022-2022 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP), pages 6147–6151."
      },
      {
       "id": "s-references-41-2",
       "original": "IEEE, 2022."
      },
      {
       "id": "s-references-41-3",
       "original": "[34] Xiaohui Sun, Ruitong Xiao, Jianye Mo, Bowen Wu, Qun Yu, and Baoxun Wang."
      },
      {
       "id": "s-references-41-4",
       "original": "F5r-tts: Improving flow matching based text-to-speech with group relative policy optimization. arXiv preprint arXiv:2504.02407, 2025."
      },
      {
       "id": "s-references-41-5",
       "original": "[35] Detai Xin, Shujie Hu, Chengzuo Yang, Chen Huang, Guoqiao Yu, Guanglu Wan, and Xunliang Cai."
      },
      {
       "id": "s-references-41-6",
       "original": "Longcat-audiodit: High-fidelity diffusion text-to-speech in the waveform latent space,"
      }
     ]
    },
    {
     "id": "eq-references-5",
     "type": "equation",
     "page": 19,
     "original": "2026."
    },
    {
     "id": "p-references-42",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-references-42-1",
       "original": "[36] Kun Xie, Feiyu Shen, Junjie Li, Fenglong Xie, Xu Tang, and Yao Hu."
      },
      {
       "id": "s-references-42-2",
       "original": "Fireredtts-2: Towards long conversational speech generation for podcast and chatbot, 2025."
      },
      {
       "id": "s-references-42-3",
       "original": "[37] Siyi Zhou, Yiquan Zhou, Yi He, Xun Zhou, Jinchao Wang, Wei Deng, and Jingchen Shu."
      }
     ]
    },
    {
     "id": "p-references-43",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-references-43-1",
       "original": "Indextts2: A breakthrough in emotionally expressive and duration-controlled auto-regressive zero-shot text-to-speech, 2025."
      },
      {
       "id": "s-references-43-2",
       "original": "[38] Jin Xu, Zhifang Guo, Jinzheng He, Hangrui Hu, Ting He, Shuai Bai, Keqin Chen, Jialin Wang, Yang Fan, Kai Dang, et al. Qwen2.5-omni technical report. arXiv preprint arXiv:2503.20215,"
      }
     ]
    },
    {
     "id": "eq-references-6",
     "type": "equation",
     "page": 19,
     "original": "2025."
    },
    {
     "id": "p-references-44",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-references-44-1",
       "original": "[39] Qwen Team."
      },
      {
       "id": "s-references-44-2",
       "original": "Qwen3.5-omni technical report, 2026."
      },
      {
       "id": "s-references-44-3",
       "original": "[40] Bowen Zhang, Congchao Guo, Geng Yang, Hang Yu, Haozhe Zhang, Heidi Lei, Jialong Mai, Junjie Yan, Kaiyue Yang, Mingqi Yang, Peikai Huang, Ruiyang Jin, Sitan Jiang, Weihua Cheng, Yawei Li, Yichen Xiao, Yiying Zhou, Yongmao Zhang, Yuan Lu, and Yucen He."
      }
     ]
    },
    {
     "id": "p-references-45",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-references-45-1",
       "original": "Minimax-speech: Intrinsic zero-shot text-to-speech with a learnable speaker encoder, 2025."
      },
      {
       "id": "s-references-45-2",
       "original": "[41] Se Jin Park, Julian Salazar, Aren Jansen, Keisuke Kinoshita, Yong Man Ro, and R."
      },
      {
       "id": "s-references-45-3",
       "original": "J."
      },
      {
       "id": "s-references-45-4",
       "original": "SkerryRyan."
      },
      {
       "id": "s-references-45-5",
       "original": "Long-form speech generation with spoken language models."
      },
      {
       "id": "s-references-45-6",
       "original": "CoRR, abs/2412.18603,"
      }
     ]
    },
    {
     "id": "eq-references-7",
     "type": "equation",
     "page": 19,
     "original": "2024."
    },
    {
     "id": "p-references-46",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-references-46-1",
       "original": "[42] Rosana Ardila, Megan Branson, Kelly Davis, Michael Henretty, Michael Kohler, Josh Meyer, Reuben Morais, Lindsay Saunders, Francis M Tyers, and Gregor Weber."
      },
      {
       "id": "s-references-46-2",
       "original": "Common voice: A massively-multilingual speech corpus. arXiv preprint arXiv:1912.06670, 2019."
      },
      {
       "id": "s-references-46-3",
       "original": "[43] Alexis Conneau, Min Ma, Simran Khanuja, Yu Zhang, Vera Axelrod, Siddharth Dalmia, Jason Riesa, Clara Rivera, and Ankur Bapna."
      },
      {
       "id": "s-references-46-4",
       "original": "Fleurs: Few-shot learning evaluation of universal representations of speech."
      },
      {
       "id": "s-references-46-5",
       "original": "In 2022 IEEE Spoken Language Technology Workshop (SLT), pages 798–805."
      },
      {
       "id": "s-references-46-6",
       "original": "IEEE, 2023."
      },
      {
       "id": "s-references-46-7",
       "original": "[44] Gheorghe Comanici et al. Gemini 2.5: Pushing the frontier with advanced reasoning, multimodality, long context, and next generation agentic capabilities, 2025."
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
    "sentence_id": "s-1-7-1",
    "quote": "A 12.5 Hz supervised speech tokenizer reduces autoregressive decoding cost while retaining content and speaker information."
   },
   "kind": "concept",
   "title": "12.5 Hz 分词器",
   "explanation": "帧率从 CosyVoice3 的 25 Hz 砍到 12.5 Hz，自回归序列长度减半，是低延迟的核心杠杆。代价是每个 token 要承载两倍信息量，所以用 10 维 × 3 级的 FSQ（码本 3^10=59,049）补偿容量。Table 1/2 的消融显示这条路可行，但 SIM 略有下降——帧率与保真度的权衡并未消失，只是被码本规模对冲了。",
   "featured": true
  },
  {
   "id": "ann-002",
   "anchor": {
    "sentence_id": "s-1-2-2",
    "quote": "quantization can discard fine acoustic information and decoding cost grows with token rate"
   },
   "kind": "motivation",
   "title": "离散化的两难",
   "explanation": "这句话点明了全文要解决的核心矛盾：离散 token 接口与语言模型天然契合、支持因果流式生成，但量化丢声学细节，且解码成本随帧率线性增长。后文所有设计——低帧率 FSQ、连续隐状态条件、LM–FM 联合训练——都是在为「既要离散接口的可控性、又要连续表示的保真度」这个两难找折中。",
   "featured": false
  },
  {
   "id": "ann-003",
   "anchor": {
    "sentence_id": "s-1-4-3",
    "quote": "a discrete single-codebook interface remains an information and optimization bottleneck"
   },
   "kind": "critique",
   "title": "单码本瓶颈",
   "explanation": "作者对自家上一代 Qwen3-TTS 的直白批评：单一离散码本把 LM 的全部输出压成一个低维通道，既是信息瓶颈（细节丢了）也是优化瓶颈（LM 拿不到声学层面的梯度信号）。这为 2.2 节引入连续隐状态条件 + 联合训练埋下伏笔——本质上是从「硬接口」退回「软接口」，和 Mini-Omni、Moshi 等全双工模型的思路一致。",
   "featured": true
  },
  {
   "id": "ann-004",
   "anchor": {
    "sentence_id": "s-1-5-3",
    "quote": "Standard shortform clean-speech benchmarks capture only part of these requirements and can obscure failures in multilingual, dialectal, long-form, and adverse acoustic conditions."
   },
   "kind": "motivation",
   "title": "为何要自建评测",
   "explanation": "作者论证自建 Qwen-Audio-TTS-Eval 的合理性：SEED-TTS-Eval 这类短句干净语音基准会掩盖多语言、方言、长音频、恶劣声学提示下的失败。这是常见但容易被滥用的动机——自建评测既能暴露真实问题，也可能设计成对自家有利。好在本报告同时报告了 SEED-TTS-Eval 和第三方 Artificial Analysis 榜单，交叉验证了一部分结论。",
   "featured": false
  },
  {
   "id": "ann-005",
   "anchor": {
    "sentence_id": "s-1-6-2",
    "quote": "conditioning the flow-matching acoustic renderer on continuous LM hidden states and jointly optimizing the LM and FM"
   },
   "kind": "comparison",
   "title": "连续条件 vs 离散条件",
   "explanation": "与 CosyVoice2/3 把离散 token 喂给 FM 不同，这里 FM 直接吃 LM 的连续隐状态（hidden states），再联合优化两端。这避免了量化接口的信息瓶颈，等于把 LM 学到的韵律、语气、说话人意图以全精度传给声学端。思路类似 JoyVoice，代价是 LM 与 FM 耦合更深，工程上更难单独替换或升级某一端。",
   "featured": true
  },
  {
   "id": "ann-006",
   "anchor": {
    "sentence_id": "s-1-9-2",
    "quote": "86 newly added fine-grained inline tags enable localized control at phrase and word level"
   },
   "kind": "engineering",
   "title": "86 个行内控制标签",
   "explanation": "86 个短语/词级行内标签（如停顿、强调、换气）把指令控制从「整句一种风格」推进到「句内局部编辑」，是有声书、配音等生产场景的刚需。注意这句后半截是 Figure 5 图表文字的抽取残留（intl 1.45 4 ms …），原文是各语言内容一致性与说话人相似度的散点图，翻译时已按残留如实标注。",
   "featured": false
  },
  {
   "id": "ann-007",
   "anchor": {
    "sentence_id": "s-2-1-2-3",
    "quote": "the model first learns a stable continuous representation and subsequently activates FSQ to obtain discrete tokens"
   },
   "kind": "engineering",
   "title": "先连续后量化的课程",
   "explanation": "连续到量化的两段式课程：先让编码器在没有量化约束的情况下学到稳定表示，再打开 FSQ 得到离散 token。这是 FSQ/VQ 训练的常见技巧，能显著缓解码本坍塌（codebook collapse）——直接从头量化容易导致大部分码字闲置。对复现者而言，这个训练顺序比 FSQ 本身的参数（10 维 3 级）更值得关注。",
   "featured": false
  },
  {
   "id": "ann-008",
   "anchor": {
    "sentence_id": "s-2-2-2-1-4",
    "quote": "the FM reconstruction loss can also shape the upstream LM representations through the shared hidden-state path"
   },
   "kind": "concept",
   "title": "FM 梯度反哺 LM",
   "explanation": "联合训练的关键机制：FM 的重构损失沿共享隐状态路径反传回 LM，迫使 LM 的隐状态同时编码语义规划与声学细节。这是「端到端」的真实含义——不是简单串联，而是梯度互通。风险在于 FM 的声学目标可能污染 LM 的语义表示，所以后续阶段才需要冻结 LM 做声学鲁棒性训练和 FM 端 RL。",
   "featured": true
  },
  {
   "id": "ann-009",
   "anchor": {
    "sentence_id": "s-2-2-2-3-3",
    "quote": "retain the coverage learned from large-scale data while placing greater emphasis on acoustic fidelity, naturalness, expressiveness, and reliable instruction realization."
   },
   "kind": "engineering",
   "title": "高质量数据退火",
   "explanation": "退火（annealing）策略：训练后期才引入窄分布的高质量数据，保留大规模数据学到的覆盖面，同时把模型往保真度、自然度、表现力、指令跟随上「精修」。这与 LLM 训练的 annealing 实践同构——先用烂数据学广度，再用好数据调质量。注意这里没有给出退火数据的具体配比和时长，复现时是个自由度不小的旋钮。",
   "featured": false
  },
  {
   "id": "ann-010",
   "anchor": {
    "sentence_id": "s-2-2-3-2-2",
    "quote": "All rewards are computed before FM and vocoder inference, enabling efficient token-only rollouts."
   },
   "kind": "engineering",
   "title": "纯 token 级 RL  rollout",
   "explanation": "LM 端 GRPO 的所有奖励（内容一致性、时长、多样性、韵律）都在 token 层面计算，无需跑 FM 和声码器，rollout 成本大幅下降。这是强化学习落地 TTS 的关键工程决策：音频级奖励（如 MOS 模型）要渲染波形，每个 rollout 贵几个数量级。DiffRO 分支用 Gumbel-Softmax 把离散采样可微化，是这条路的配套技术。",
   "featured": true
  },
  {
   "id": "ann-011",
   "anchor": {
    "sentence_id": "s-2-2-4-1-3",
    "quote": "The augmentation pool includes additive noise and reverberation; phone, Bluetooth, and laptop-microphone responses; far-field recording; physical blockage such as masks or hands over the microphone; codec, DAC, and amplifier artifacts; packet loss; strong echo; and compound settings"
   },
   "kind": "engineering",
   "title": "提示退化增广池",
   "explanation": "这个增广池覆盖了近十种真实退化：噪声、混响、电话/蓝牙/笔记本麦克风频响、远场、口罩/手遮挡、编解码/DAC/功放失真、丢包、强回声，以及会议室远场+噪声等复合场景。对做声音克隆产品的团队，这份清单本身就是一份「用户上传提示音频质量分布」的实操先验，比具体训练超参更有迁移价值。",
   "featured": true
  },
  {
   "id": "ann-012",
   "anchor": {
    "sentence_id": "s-2-2-4-1-4",
    "quote": "integrates prompt enhancement into the cloning path rather than relying on a separate inference-time denoiser"
   },
   "kind": "comparison",
   "title": "免独立降噪器的克隆",
   "explanation": "训练时随机采样退化条件，让 FM 自己学会从脏提示中提取干净声学表征，而不是像 MiniMax 那样在推理时外挂一个降噪器。Table 9 的对比显示外挂降噪是把双刃剑（DNSMOS 升、SIM 降），而内生化方案兼顾两者。架构上更简洁，但代价是训练复杂度上升，且对训练集外的退化类型泛化能力未知。",
   "featured": true
  },
  {
   "id": "ann-013",
   "anchor": {
    "sentence_id": "s-2-2-5-8-1",
    "quote": "express the intended objective balance rather than raw reward variance"
   },
   "kind": "concept",
   "title": "奖励标准化求平衡",
   "explanation": "FlowTTS-GRPO 把说话人相似度、ASR、MOS 三类奖励各自标准化后再加权，让 λ 反映的是设计者的目标权重而非各奖励原始的方差尺度。这是多目标 RL 的标准做法，但常被忽略——不做标准化时，方差大的奖励会主导梯度，λ 形同虚设。细节虽小，却是多目标 RL 能否按预期配比收敛的前提。",
   "featured": false
  },
  {
   "id": "ann-014",
   "anchor": {
    "sentence_id": "s-2-3-3-2",
    "quote": "reduces the mismatch between ground-truth features used in training and predicted features encountered at inference"
   },
   "kind": "engineering",
   "title": "声码器暴露偏差修正",
   "explanation": "声码器训练时注入噪声，缓解经典的暴露偏差（exposure bias）：训练用真实声学特征、推理用 FM 预测特征，分布不一致导致级联失真放大。做法相当于 scheduled sampling 在声学端的类比。对两段式 TTS（声学模型+声码器）这是低成本高收益的通用技巧，与具体模型无关，值得直接抄走。",
   "featured": false
  },
  {
   "id": "ann-015",
   "anchor": {
    "sentence_id": "s-4-1-2-3",
    "quote": "the 59,049-code configuration achieves the best content consistency, while the 19,683-code configuration retains marginally higher speaker similarity"
   },
   "kind": "number",
   "title": "码本规模的权衡",
   "explanation": "59,049 码（10 维全开）内容一致性最好，19,683 码 SIM 略高——码本并非越大越好。更大码本给了内容表达更多自由度，但每维可分的声学细节反而摊薄。最终选 59,049 说明作者优先保内容正确性（CER/WER 是硬指标），相似度损失靠后续 FM 端 RL 补。读消融表时要意识到这个选择是「目标函数驱动」而非「绝对最优」。",
   "featured": true
  },
  {
   "id": "ann-016",
   "anchor": {
    "sentence_id": "s-4-2-5-1",
    "quote": "pushing CER/WER lower through more aggressive optimization consistently comes at the expense of speech naturalness and expressiveness."
   },
   "kind": "critique",
   "title": "CER 与自然度的拉锯",
   "explanation": "作者罕见地承认：更激进地压 CER/WER 会持续牺牲自然度和表现力。这暴露了当前 TTS 评测的结构性问题——内容一致性可自动测、优化目标明确，自然度却依赖主观评价且易被「安全但平淡」的输出拉高。报告选择不退让自然度，意味着其 CER/WER 数字可能不是极限值，跨论文对比时应留意各家的权衡点不同。",
   "featured": true
  },
  {
   "id": "ann-018",
   "anchor": {
    "sentence_id": "s-4-4-3-3-3",
    "quote": "Qwen-Audio-3.0-TTS reaches DNSMOS scores of 3.962 and 3.925 on Noisy and Reverb, close to ElevenLabs-v3·Denoise, while achieving much higher SIM scores of 76.14% and 74.12%."
   },
   "kind": "number",
   "title": "恶劣提示下的领先幅度",
   "explanation": "Qwen-Audio-3.0-TTS 在 Noisy/Reverb 上 DNSMOS 3.962/3.925，逼近 ElevenLabs-v3 开降噪的水平，SIM 76.14%/74.12% 则明显更高。这组数字支撑了第四阶段声学鲁棒性训练的有效性。注意 DNSMOS 是无参考客观分，对「像不像真人」的刻画有限，SIM 也依赖 ERes2Net 这类说话人验证模型的判别力，两者都有天花板效应。",
   "featured": false
  },
  {
   "id": "ann-019",
   "anchor": {
    "sentence_id": "s-4-4-4-2-1",
    "quote": "Gemini reaches 70.0% agreement with human judgments for single-attribute instructions, with 92.3% precision, 64.9% recall, and 76.2% F1."
   },
   "kind": "critique",
   "title": "LLM 评委的可信度",
   "explanation": "指令跟随评测用 Gemini-2.5-Pro 当裁判，单属性指令上与人类判断只有 70.0% 一致率（P 92.3% / R 64.9% / F1 76.2%）。92.3% 的精度说明模型说「对」时基本可信，但 64.9% 的召回意味着大量人类认为正确的样本被判错——指令跟随的绝对分数可能被系统性低估，不同模型间的相对排名仍有一定参考价值。",
   "featured": true
  },
  {
   "id": "ann-020",
   "anchor": {
    "sentence_id": "s-4-4-4-2-4",
    "quote": "Blind review finds 35.4% of disputed criteria inherently ambiguous, with both judgments defensible."
   },
   "kind": "critique",
   "title": "35.4% 标准本就模糊",
   "explanation": "盲审发现 35.4% 的争议标准本质上模棱两可、两种判断都站得住脚。这是对 LLM-as-judge 范式更深一层的诚实披露：分歧不全是评委能力问题，而是评测标准本身不可判定。这提示指令跟随类评测存在约三分之一的天花板噪声，读 Table 11 这类细粒度分数时应把 ±几个百分点视为同档。",
   "featured": false
  },
  {
   "id": "ann-021",
   "anchor": {
    "sentence_id": "s-4-6-1-3-2",
    "quote": "93.5% Perfect labels and no P1/P0 cases"
   },
   "kind": "number",
   "title": "方言发音 93.5% 满分",
   "explanation": "方言合成中发音准确率是最稳的维度：93.5% 样本拿 Perfect 且无 P1/P0 严重错误，说明字级内容保留在方言间很可靠。反过来看，方言真实度（3.639）和韵律自然度（3.680）明显低于发音（3.935），瓶颈在「说得像不像当地人」而非「说得对不对」——这是所有方言 TTS 的共性难点，数据层面很难速成。",
   "featured": false
  },
  {
   "id": "ann-022",
   "anchor": {
    "sentence_id": "s-4-6-2-2-2",
    "quote": "win rates of 44.8% and 55.6% on the two dimensions, clearly improving over the previous-generation baseline."
   },
   "kind": "number",
   "title": "竞技场胜率解读",
   "explanation": "指令跟随 44.8%、韵律自然度 55.6% 的胜率要对照上一代基线的 30.9%/42.9% 来读（三人对战时三项之和为 100%）。提升是实打实的，但 44.8% 意味着过半对局仍未获胜，指令跟随离「可靠」还有距离。且竞技场人评成本高、样本量有限，胜率的置信区间未报告，不宜把小数位差异当结论。",
   "featured": true
  }
 ]
};
