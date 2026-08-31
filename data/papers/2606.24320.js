// 自动生成：2606.24320 全文双语精读数据（由 tools/compile_paper.js 装配）
// 结构/原文来自 .cache/papers/2606.24320.json（tools/extract_paper.py）；
// 翻译与讲解来自 .cache/papers/zh/2606.24320/（LLM agent 撰写）。
// 改翻译请改片段后重新装配；勿手改本文件的结构与 original 字段。
globalThis.PAPER_2606_24320 = {
 "paper_id": "2606.24320",
 "model_id": "zonos2",
 "title": {
  "original": "ZONOS2 Technical Report",
  "zh": "ZONOS2 技术报告"
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
       "original": "Gabriel Clark*, Sofian Mejjoute, Mohamed Osman, George Close, Beren Millidge*",
       "zh": "，"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-zyphra",
   "num": null,
   "level": 2,
   "page": 1,
   "title": {
    "original": "Zyphra",
    "zh": "Zyphra"
   },
   "blocks": [
    {
     "id": "p-zyphra-1",
     "type": "paragraph",
     "page": 1,
     "sentences": [
      {
       "id": "s-zyphra-1-1",
       "original": "San Francisco, CA *Corresponding authors: gabriel@zyphra.com, beren@zyphra.com",
       "zh": "美国加州旧金山。*通讯作者：gabriel@zyphra.com、beren@zyphra.com。"
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
       "original": "We present ZONOS2 8B, our latest Text",
       "zh": "我们发布 ZONOS2 8B，这是我们最新的文本转语音"
      }
     ]
    },
    {
     "id": "p-abstract-2",
     "type": "paragraph",
     "page": 1,
     "sentences": [
      {
       "id": "s-abstract-2-1",
       "original": "To Speech (TTS) model, which achieves state-of-theart naturalness, prosody, and voice cloning fidelity.",
       "zh": "（TTS）模型，在自然度、韵律和声音克隆保真度上达到业界领先水平。"
      },
      {
       "id": "s-abstract-2-2",
       "original": "We improve upon Zonos-v0.1 in scale, data, and training recipe.",
       "zh": "相比 Zonos-v0.1，我们在规模、数据和训练配方上做了改进。"
      },
      {
       "id": "s-abstract-2-3",
       "original": "We scale the model from 1.6B to 8B total parameters (900M active) with a novel mixture-ofexperts (MoE) backbone, improving inference latency and throughput.",
       "zh": "我们用一种新颖的混合专家（MoE）主干，将模型从 1.6B 扩展到 8B 总参数（900M 激活参数），改善了推理延迟与吞吐。"
      },
      {
       "id": "s-abstract-2-4",
       "original": "We expand our training corpus from 200K to over 6M hours using a new data processing pipeline, and we simplify our post-training and conditioning recipes to improve naturalness and voice cloning fidelity.",
       "zh": "借助新的数据处理管线，我们把训练语料从 200K 小时扩展到 6M 小时以上，并简化了后训练与条件化配方，以提升自然度和声音克隆保真度。"
      },
      {
       "id": "s-abstract-2-5",
       "original": "We evaluate ZONOS2 8B on quality, speaker similarity, WER, and ZTTS1-Eval, our novel TTS benchmark, where it performs competitively with state-of-the-art systems while maintaining good streaming latency.",
       "zh": "我们在质量、说话人相似度、WER 以及我们提出的新 TTS 基准 ZTTS1-Eval 上评估了 ZONOS2 8B；它在保持流式延迟良好的同时，与业界领先系统表现相当。"
      },
      {
       "id": "s-abstract-2-6",
       "original": "We release our model weights and example inference code under an Apache 2.0 license on GitHub∗and Hugging Face†, as well as the ZTTS1-Eval benchmark‡.",
       "zh": "我们以 Apache 2.0 许可证在 GitHub 和 Hugging Face 上开源了模型权重与示例推理代码，并同步发布了 ZTTS1-Eval 基准。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-I",
   "num": "I",
   "level": 1,
   "page": 1,
   "title": {
    "original": "Introduction",
    "zh": "引言"
   },
   "blocks": [
    {
     "id": "p-I-1",
     "type": "paragraph",
     "page": 1,
     "sentences": [
      {
       "id": "s-I-1-1",
       "original": "The core quality measures of a TTS system are generation stability, naturalness, controllability, multilinguality, and inference performance.",
       "zh": "一个 TTS 系统的核心质量指标包括生成稳定性、自然度、可控性、多语种能力和推理性能。"
      },
      {
       "id": "s-I-1-2",
       "original": "Recent works in this domain tend to focus on one of these properties to the detriment of the others.",
       "zh": "该领域的近期工作往往只聚焦其中某一项，而牺牲了其余指标。"
      },
      {
       "id": "s-I-1-3",
       "original": "For instance, some systems produce highquality output but offer limited control, while inferenceeﬀicient systems support only one or a few languages.",
       "zh": "例如，有的系统输出质量高但可控性有限，而推理高效的系统又只支持一种或少数几种语言。"
      },
      {
       "id": "s-I-1-4",
       "original": "With ZONOS2, our aim is to design a TTS system that is strong in every aspect, focusing especially on naturalness and voice cloning fidelity.",
       "zh": "ZONOS2 的目标是设计一个在各个方面都强的 TTS 系统，尤其聚焦自然度和声音克隆保真度。"
      }
     ]
    },
    {
     "id": "p-I-2",
     "type": "paragraph",
     "page": 1,
     "sentences": [
      {
       "id": "s-I-2-1",
       "original": "The ZONOS2 architecture uses a decoder-only transformer backbone which takes text and audio tokens as input and outputs audio tokens, where the audio tokens are represented using a Residual Vector Quantization (RVQ)-based audio codec.",
       "zh": "ZONOS2 架构采用 decoder-only 的 Transformer 主干，输入文本与音频 token、输出音频 token，其中音频 token 由基于残差向量量化（RVQ）的音频 codec 表示。"
      },
      {
       "id": "s-I-2-2",
       "original": "Our architectural novelty stems from introducing Mixture of Experts (MoE) architectures into open-source TTS, which we use to scale the model’s parameter count and capability while maintaining inference speeds necessary for real-time audio streaming.",
       "zh": "我们的架构创新在于将混合专家（MoE）架构引入开源 TTS，用它扩大模型参数量与能力，同时维持实时音频流式合成所需的推理速度。"
      },
      {
       "id": "s-I-2-3",
       "original": "We combine architecture advancements from recent LLMs, including the ZAYA1-8B (Washbourne, Iyer, & Figliolia et al., 2026) router design.",
       "zh": "我们吸收了近期 LLM 的架构进展，包括 ZAYA1-8B（Washbourne, Iyer, & Figliolia et al., 2026）的路由器设计。"
      },
      {
       "id": "s-I-2-4",
       "original": "To maximize the quality of the generated audio, a high fidelity and high sample ∗https://github.com/Zyphra/ZONOS2/ †https://huggingface.co/Zyphra/ZONOS2 ‡https://github.com/Zyphra/ZTTS1-Eval rate codec (Kumar, Seetharaman, & Luebs et al., 2023) Descript Audio Codec (DAC) is used.",
       "zh": "为最大化生成音频的质量，我们采用高保真、高采样率的 codec（Kumar, Seetharaman, & Luebs et al., 2023），即 Descript Audio Codec（DAC）。（原文此处混入三个脚注链接，如实保留：∗https://github.com/Zyphra/ZONOS2/ †https://huggingface.co/Zyphra/ZONOS2 ‡https://github.com/Zyphra/ZTTS1-Eval）"
      },
      {
       "id": "s-I-2-5",
       "original": "To provide controllability, we implement several user-facing conditioning options, including high accuracy voice cloning from prompt audio, speaking-rate selection, and an optional ‘Quality Mode’.",
       "zh": "为提供可控性，我们实现了若干面向用户的条件化选项，包括基于提示音频的高精度声音克隆、语速选择，以及一个可选的「质量模式」（Quality Mode）。"
      },
      {
       "id": "s-I-2-6",
       "original": "Our voice cloning approach is zero-shot, does not require speaker labels during pretraining, supports unbounded speaker utterance lengths, and does not require transcription of the clone target audio at inference time.",
       "zh": "我们的声音克隆方法是零样本的：预训练时不需要说话人标签，支持不限长度的说话人音频，推理时也不需要克隆目标音频的转写文本。"
      }
     ]
    },
    {
     "id": "p-I-3",
     "type": "paragraph",
     "page": 1,
     "sentences": [
      {
       "id": "s-I-3-1",
       "original": "For seamless multilingual performance and robustness to phonemization errors, we adopt raw byte tokenization for the text input.",
       "zh": "为了实现无缝的多语种表现并对音素化错误保持鲁棒，文本输入采用原始字节级分词。"
      },
      {
       "id": "s-I-3-2",
       "original": "We increased the linguistic diversity of our training set, focusing heavily on broadening support for European and Asian languages.",
       "zh": "我们提升了训练集的语言多样性，重点扩大对欧洲和亚洲语言的支持。"
      },
      {
       "id": "s-I-3-3",
       "original": "To achieve low latency, we use a delay pattern (Copet, Kreuk, & Gat et al., 2024) approach to codebook generation which generates multiple codebook tokens in parallel by overlapping the generation of different codebooks of different timesteps.",
       "zh": "为降低延迟，我们采用延迟模式（delay pattern）（Copet, Kreuk, & Gat et al., 2024）来生成码本：把不同时间步的不同码本的生成重叠起来，从而并行生成多个码本 token。"
      },
      {
       "id": "s-I-3-4",
       "original": "Moreover, our MoE architecture significantly improves inference latency due to its small forward pass footprint.",
       "zh": "此外，由于前向计算占用小，我们的 MoE 架构显著改善了推理延迟。"
      }
     ]
    },
    {
     "id": "p-I-4",
     "type": "paragraph",
     "page": 1,
     "sentences": [
      {
       "id": "s-I-4-1",
       "original": "Finally, motivated by the limitations of existing TTS evaluation benchmarks, we also introduce a new benchmark, ZTTS1-Eval.",
       "zh": "最后，受现有 TTS 评测基准局限性的驱使，我们还提出了一个新基准 ZTTS1-Eval。"
      },
      {
       "id": "s-I-4-2",
       "original": "The most widely adopted TTS benchmark, Seed-TTS-Eval (Anastassiou, Chen, & Chen et al., 2024), covers only English and Chinese, scores intelligibility and speaker similarity with now-dated models, and uses only read speech.",
       "zh": "目前采用最广的 TTS 基准 Seed-TTS-Eval（Anastassiou, Chen, & Chen et al., 2024）只覆盖英语和中文，用已经过时的模型来评估可懂度与说话人相似度，而且只使用朗读语音。"
      },
      {
       "id": "s-I-4-3",
       "original": "Later efforts such as CV3- Eval (Du, Gao, & Wang et al., 2025) broaden language and task coverage but keep the same scoring stack and a largely prepared-speech setting.",
       "zh": "后续工作如 CV3-Eval（Du, Gao, & Wang et al., 2025）虽然拓宽了语言与任务覆盖，但仍沿用同一套评分栈，且大体上仍以有准备的朗读语音为主。"
      },
      {
       "id": "s-I-4-4",
       "original": "As modern systems now approach human intelligibility, Word Error Rate (WER) alone no longer separates the strongest systems, and no widely used zero-shot benchmark measures whether generated speech reproduces the prosody of real speech.",
       "zh": "随着现代系统的可懂度逼近人类，单凭词错误率（WER）已无法区分最强的系统，而常用的零样本基准中，没有一个能衡量生成语音是否复现了真实语音的韵律。"
      },
      {
       "id": "s-I-4-5",
       "original": "ZTTS1-Eval addresses this.",
       "zh": "ZTTS1-Eval 正是为解决这一问题而生。"
      },
      {
       "id": "s-I-4-6",
       "original": "It pairs a clean read-speech set of 9 languages with an in-the-wild spontaneous set of 17 languages, scores content, speaker, and quality with current models (Qwen3-ASR (Shi, Wang, & Guo et al., 2026), ReDimNet (Yakovlev, Makarov, & Balykin et al., 2024), and MSR-UTMOS (Nishikawa, Nakata, & Saito et al., 2025)), and adds a distributional prosody and generation-diversity layer (TTSDS2 (Minixhofer, Klejch & Bell, 2025) and Discretized Speech Weighted Edit Distance (DS-WED) (Yang, Han, & Wang et al., 2026)).",
       "zh": "它将一个覆盖 9 种语言的干净朗读语音集与一个覆盖 17 种语言的野外自发语音集配对，用当前较新的模型为内容、说话人与质量打分（Qwen3-ASR（Shi, Wang, & Guo et al., 2026）、ReDimNet（Yakovlev, Makarov, & Balykin et al., 2024）与 MSR-UTMOS（Nishikawa, Nakata, & Saito et al., 2025）），并增加了分布式的韵律与生成多样性维度（TTSDS2（Minixhofer, Klejch & Bell, 2025）与离散语音加权编辑距离 DS-WED（Yang, Han, & Wang et al., 2026））。"
      },
      {
       "id": "s-I-4-7",
       "original": "We",
       "zh": "我们"
      }
     ]
    },
    {
     "id": "fig-I-1",
     "type": "figure_caption",
     "page": 2,
     "original": "Fig. 1: Overview of ZONOS2 inference pipeline, showing the text and conditioning inputs as well as the delay pattern approach to audio codec token generation.",
     "zh": "图 1：ZONOS2 推理管线概览，展示文本与条件化输入，以及音频 codec token 生成所采用的延迟模式。"
    },
    {
     "id": "p-I-5",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-I-5-1",
       "original": "describe the full details of our ZTTS1-Eval benchmark in Section V.",
       "zh": "在第五节介绍 ZTTS1-Eval 基准的全部细节。"
      }
     ]
    },
    {
     "id": "p-I-6",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-I-6-1",
       "original": "Overall, our key contributions are:",
       "zh": "总体而言，我们的主要贡献如下："
      }
     ]
    },
    {
     "id": "p-I-7",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-I-7-1",
       "original": "• We release ZONOS2, an open-source, permissively licensed TTS model with high-fidelity natural-sounding voice cloning.",
       "zh": "我们发布 ZONOS2——一个采用宽松许可证开源、具有高保真自然声音克隆能力的 TTS 模型。"
      }
     ]
    },
    {
     "id": "p-I-8",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-I-8-1",
       "original": "• We pioneer the use of MoE models in the opensource TTS space, building upon the ZAYA1 architecture (Washbourne, Iyer, & Figliolia et al., 2026).",
       "zh": "我们在 ZAYA1 架构（Washbourne, Iyer, & Figliolia et al., 2026）的基础上，率先将 MoE 模型引入开源 TTS 领域。"
      }
     ]
    },
    {
     "id": "p-I-9",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-I-9-1",
       "original": "• We introduce a new method for post-training high fidelity voice conditioning without labeled speaker pairs.",
       "zh": "我们提出了一种无需标注说话人对即可后训练高保真声音条件化的新方法。"
      }
     ]
    },
    {
     "id": "p-I-10",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-I-10-1",
       "original": "• We detail our novel data curation pipeline for webscale data, which enables several inference conditioning settings and multilingual generation.",
       "zh": "我们详细介绍了面向网络规模数据的新型数据整编管线，它支撑了多种推理条件化设置与多语种生成。"
      }
     ]
    },
    {
     "id": "p-I-11",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-I-11-1",
       "original": "• We release a new TTS benchmark, ZTTS1-Eval, spanning 9 read and 17 in-the-wild languages with measures for prosody, speaker similarity, and generation quality.",
       "zh": "我们发布了新的 TTS 基准 ZTTS1-Eval，覆盖 9 种朗读语言与 17 种野外语言，并提供韵律、说话人相似度与生成质量的度量。"
      }
     ]
    },
    {
     "id": "p-I-12",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-I-12-1",
       "original": "The remainder of this technical report is organized as follows.",
       "zh": "本技术报告其余部分组织如下。"
      },
      {
       "id": "s-I-12-2",
       "original": "In Section II, we give an overview of the ZONOS2 model.",
       "zh": "第二节概述 ZONOS2 模型。"
      },
      {
       "id": "s-I-12-3",
       "original": "Section III describes the training data pipeline.",
       "zh": "第三节介绍训练数据管线。"
      },
      {
       "id": "s-I-12-4",
       "original": "Section IV describes the model training setup.",
       "zh": "第四节介绍模型训练设置。"
      },
      {
       "id": "s-I-12-5",
       "original": "Section V details our newly proposed benchmark.",
       "zh": "第五节详细介绍我们新提出的基准。"
      },
      {
       "id": "s-I-12-6",
       "original": "Section VI presents the performance of the ZONOS2 model relative to other state-of-the-art TTS systems on several TTS evaluation sets, including ZTTS1-Eval.",
       "zh": "第六节给出 ZONOS2 在包括 ZTTS1-Eval 在内的多个 TTS 评测集上相对于其他业界领先 TTS 系统的表现。"
      },
      {
       "id": "s-I-12-7",
       "original": "Section VII discusses the challenges we faced during the training of ZONOS2 and our future research directions.",
       "zh": "第七节讨论我们在训练 ZONOS2 过程中遇到的挑战与未来的研究方向。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-II",
   "num": "II",
   "level": 1,
   "page": 2,
   "title": {
    "original": "Model Overview",
    "zh": "模型概览"
   },
   "blocks": [
    {
     "id": "p-II-1",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-II-1-1",
       "original": "ZONOS2 is built on a transformer MoE backbone with 900M active parameters and 8B total parameters.",
       "zh": "ZONOS2 构建于一个 Transformer MoE 主干之上，激活参数 900M、总参数 8B。"
      },
      {
       "id": "s-II-1-2",
       "original": "It uses standard autoregressive language modeling of RVQ-based audio tokens.",
       "zh": "它对基于 RVQ 的音频 token 做标准的自回归语言建模。"
      },
      {
       "id": "s-II-1-3",
       "original": "Figure 1 provides an inference overview of ZONOS2.",
       "zh": "图 1 给出了 ZONOS2 的推理概览。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-II-A",
   "num": "A",
   "level": 2,
   "page": 2,
   "title": {
    "original": "Audio Tokenization",
    "zh": "音频分词"
   },
   "blocks": [
    {
     "id": "p-II-A-1",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-II-A-1-1",
       "original": "To maximize the fidelity of the generated audio, ZONOS2 uses DAC (Kumar, Seetharaman, & Luebs et al., 2023) as the neural audio tokenizer.",
       "zh": "为最大化生成音频的保真度，ZONOS2 使用 DAC（Kumar, Seetharaman, & Luebs et al., 2023）作为神经音频分词器。"
      },
      {
       "id": "s-II-A-1-2",
       "original": "DAC follows an autoencoder structure, where the encoder maps raw waveforms x to latent representations which are quantized into N codebooks using a RVQ (Zeghidour, Luebs, & Omran et al., 2021) strategy.",
       "zh": "DAC 采用自编码器结构：编码器把原始波形 x 映射为潜在表示，再通过 RVQ（Zeghidour, Luebs, & Omran et al., 2021）策略量化为 N 个码本。"
      },
      {
       "id": "s-II-A-1-3",
       "original": "The decoder then outputs the reconstructed audio from the quantized codebook sequence.",
       "zh": "随后解码器从量化后的码本序列重建音频。"
      },
      {
       "id": "s-II-A-1-4",
       "original": "ZONOS2 models these quantized codebooks using a delay pattern which is depicted in Figure 1 and described here.",
       "zh": "ZONOS2 用延迟模式来建模这些量化码本，如图 1 所示，具体描述如下。"
      },
      {
       "id": "s-II-A-1-5",
       "original": "Let X[t, j] denote the aligned DAC token for audio frame t and codebook j, where 0 ≤j < N and N = 9 in this work.",
       "zh": "记 X[t, j] 为音频帧 t、码本 j 对应的对齐 DAC token，其中 0 ≤ j < N，本文取 N = 9。"
      },
      {
       "id": "s-II-A-1-6",
       "original": "The delay pattern is built by a shearing operation:",
       "zh": "延迟模式通过一个剪切操作构建："
      }
     ]
    },
    {
     "id": "eq-II-A-1",
     "type": "equation",
     "page": 2,
     "original": "{"
    },
    {
     "id": "eq-II-A-2",
     "type": "equation",
     "page": 2,
     "original": "X[t −j, j] if t ≥j, p otherwise,"
    },
    {
     "id": "eq-II-A-3",
     "type": "equation",
     "page": 2,
     "original": "(1)"
    },
    {
     "id": "eq-II-A-4",
     "type": "equation",
     "page": 2,
     "original": "Y [t, j] ="
    },
    {
     "id": "p-II-A-2",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-II-A-2-1",
       "original": "where p is the ID of a special audio padding token.",
       "zh": "其中 p 是一个特殊的音频填充 token 的 ID。"
      },
      {
       "id": "s-II-A-2-2",
       "original": "Thus, codebook j is delayed by j frames.",
       "zh": "也就是说，码本 j 被延迟了 j 帧。"
      },
      {
       "id": "s-II-A-2-3",
       "original": "The delay pattern turns the within-frame dependency among RVQ codebooks into an autoregressive dependency over sequence positions: the token for codebook j + 1 at audio frame t is generated immediately after the token for codebook j at the same frame.",
       "zh": "延迟模式把同一帧内 RVQ 各码本之间的依赖，转化为序列位置上的自回归依赖：音频帧 t 上码本 j + 1 的 token，紧跟在同一帧码本 j 的 token 之后生成。"
      },
      {
       "id": "s-II-A-2-4",
       "original": "As a result, the model can predict each codebook token while conditioning on preceding codebooks for that frame, rather than treating the codebooks as conditionally independent.",
       "zh": "由此，模型在预测每个码本 token 时，能够以该帧之前的码本为条件，而不是把这些码本当作条件独立。"
      },
      {
       "id": "s-II-A-2-5",
       "original": "Before DAC decoding, the shearing operation is inverted:",
       "zh": "在 DAC 解码之前，剪切操作被逆变换："
      }
     ]
    },
    {
     "id": "eq-II-A-5",
     "type": "equation",
     "page": 3,
     "original": "ˆX[t, j] = Y [t + j, j]. (2)"
    },
    {
     "id": "p-II-A-3",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-II-A-3-1",
       "original": "As a result, streaming decoding requires a lookahead buffer of N −1 generated frames before all codebooks for an aligned audio frame are available and the tokens from that frame can be passed to the DAC decoder.",
       "zh": "因此，流式解码需要一个 N − 1 帧的前瞻缓冲：在凑齐某个对齐音频帧的全部码本、并把该帧 token 送入 DAC 解码器之前，必须先多生成 N − 1 帧。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-II-B",
   "num": "B",
   "level": 2,
   "page": 3,
   "title": {
    "original": "Text Tokenization",
    "zh": "文本分词"
   },
   "blocks": [
    {
     "id": "p-II-B-1",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-II-B-1-1",
       "original": "ZONOS2 tokenizes text with a byte-level tokenizer.",
       "zh": "ZONOS2 用字节级分词器对文本分词。"
      },
      {
       "id": "s-II-B-1-2",
       "original": "An input string is encoded as a sequence of UTF-8 bytes (b1, . . . , bL), with each bi ∈[0, 255].",
       "zh": "输入字符串被编码为一个 UTF-8 字节序列 (b1, …, bL)，每个 bi ∈ [0, 255]。"
      },
      {
       "id": "s-II-B-1-3",
       "original": "This representation lets the model consume arbitrary Unicode input without language-specific Grapheme to Phoneme (G2P) conversion or an out-of-vocabulary mechanism.",
       "zh": "这种表示让模型可以直接消费任意 Unicode 输入，无需针对具体语言的 grapheme 到音素（G2P）转换，也不需要词表外处理机制。"
      },
      {
       "id": "s-II-B-1-4",
       "original": "Our previous system, Zonos-v0.1, operated on phonemes since phonemization injects a strong inductive bias that accelerates convergence early in training.",
       "zh": "我们的上一代系统 Zonos-v0.1 在音素上建模，因为音素化注入了强归纳偏置，能在训练早期加速收敛。"
      },
      {
       "id": "s-II-B-1-5",
       "original": "However, this inductive bias originates from a G2P phonemization pipeline for which coverage and accuracy deteriorate for lower-resource languages, for code-switched (i.e., containing words from multiple languages) utterances, and for rare or technical vocabulary.",
       "zh": "然而，这种归纳偏置来自 G2P 音素化管线，而对低资源语言、语码混合（code-switch，即同一句话含多种语言的词）的语句、以及罕见或技术性词汇，该管线的覆盖度和准确度都会下降。"
      },
      {
       "id": "s-II-B-1-6",
       "original": "With ZONOS2 and our increased data scale, we found that removing the crutch of this inductive bias proved helpful overall, especially improving the model’s multilingual capabilities and general robustness.",
       "zh": "在 ZONOS2 上，随着数据规模扩大，我们发现去掉这根归纳偏置的「拐杖」总体上是有益的，尤其改善了模型的多语种能力与整体鲁棒性。"
      }
     ]
    },
    {
     "id": "p-II-B-2",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-II-B-2-1",
       "original": "Table I shows three representative G2P failures with different failure modes.",
       "zh": "表 I 展示了三种具有代表性的 G2P 失败案例，各自的失败模式不同。"
      },
      {
       "id": "s-II-B-2-2",
       "original": "In the code-switched Chinese-English example, the Chinese span appears in text tagged as English.",
       "zh": "在中英语码混合的例子中，中文片段出现在被标注为英语的文本里。"
      },
      {
       "id": "s-II-B-2-3",
       "original": "Rather than invoking a Mandarin-aware frontend with segmentation, tone handling, and lexicon lookup, the pipeline falls back to generic character labels before processing the English words.",
       "zh": "管线并没有调用具备分词、声调处理和词典查询的普通话感知前端，而是在处理英文单词之前退回到通用的字符标签。"
      },
      {
       "id": "s-II-B-2-4",
       "original": "In the second example, an overgeneralized substring or morphology rule incorrectly matches the sequence retro inside alpharetrovirus, producing the spurious form retroretrovirus.",
       "zh": "第二个例子中，一条过度泛化的子串或形态规则把 alpharetrovirus 中的 retro 序列错误匹配，产生了无中生有的 retroretrovirus。"
      },
      {
       "id": "s-II-B-2-5",
       "original": "In the Spanish example, the proper noun Satoshi is processed under the Spanish language tag and constrained to the Spanish phoneme inventory used by the G2P phonemizer.",
       "zh": "西班牙语的例子中，专有名词 Satoshi 在西班牙语标签下被处理，并受限于该 G2P 音素器所使用的西班牙语音素清单。"
      },
      {
       "id": "s-II-B-2-6",
       "original": "Because that inventory lacks a fricative corresponding to the romanized sequence sh in shi, the sequence is mapped to s, yielding Satosi and losing the intended source-pronunciation cue.",
       "zh": "由于该清单中没有对应罗马字序列 sh 的擦音，这个序列被映射为 s，得到 Satosi，丢失了原预期的源语言发音线索。"
      },
      {
       "id": "s-II-B-2-7",
       "original": "All three failures are silent.",
       "zh": "这三种失败都是静默发生的。"
      },
      {
       "id": "s-II-B-2-8",
       "original": "The downstream model receives a corrupted transcription with no indication that preprocessing has failed, making this kind of error especially harmful in low-resource and codeswitched settings.",
       "zh": "下游模型收到的是被污染的转写，却没有任何迹象表明预处理已经失败，这使得这类错误在低资源和语码混合场景下危害尤其大。"
      }
     ]
    },
    {
     "id": "p-II-B-3",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-II-B-3-1",
       "original": "Early experimentation revealed that the value of the inductive bias that phonemization provides diminishes with scale.",
       "zh": "早期实验表明，音素化所提供的归纳偏置的价值会随规模扩大而递减。"
      },
      {
       "id": "s-II-B-3-2",
       "original": "As data and model size are increased, the model learns the mapping from raw bytes to pronunciation on its Input G2P pipeline output en: 电脑is computer en:Chinese letter Chinese letter is computer en:alpharetrovirus en:retroretrovirus es:Satoshi es:Satosi TABLE I: Representative silent failures in the G2P preprocessing pipeline.",
       "zh": "随着数据与模型规模的增加，模型会自行学会从原始字节到发音的映射。（以下为抽取层混入正文的表 I 内容，逐词译为中文标签：As data and model size are increased, the model learns the mapping from raw bytes to pronunciation on its 输入 G2P 管线输出 en: 电脑is computer en:汉字 汉字 is computer en:alpharetrovirus en:retroretrovirus es:Satoshi es:Satosi  表 I：G2P 预处理管线中具有代表性的静默失败。）"
      },
      {
       "id": "s-II-B-3-3",
       "original": "The first row shows a Chinese span processed under an English tag; the second shows an overmatched substring or morphology rule; the third shows loss of source-pronunciation information when a proper noun is constrained to the Spanish G2P inventory. own.",
       "zh": "表 I 注：第一行展示中文片段在英语标签下被处理；第二行展示过度匹配的子串或形态规则；第三行展示专有名词受限于西班牙语 G2P 音素清单而丢失源发音信息。"
      },
      {
       "id": "s-II-B-3-4",
       "original": "A byte-level variant first matches and then surpasses its phoneme-based counterpart while avoiding the failure modes of G2P entirely.",
       "zh": "字节级变体先追平、随后超过基于音素的对应模型，同时完全避开了 G2P 的失败模式。"
      },
      {
       "id": "s-II-B-3-5",
       "original": "Bytes are adopted as the simplest representation that is both fully general across languages and free of an error-prone preprocessing stage.",
       "zh": "字节被采用，是因为它是既在所有语言上完全通用、又不依赖易错预处理环节的最简表示。"
      },
      {
       "id": "s-II-B-3-6",
       "original": "During inference, text normalization is applied in several cases to allow for consistent pronunciation of equations, numbers, addresses, etc.",
       "zh": "推理时在若干场景下会应用文本规范化，以保证公式、数字、地址等的发音一致。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-II-C",
   "num": "C",
   "level": 2,
   "page": 3,
   "title": {
    "original": "Speaker Embeddings",
    "zh": "说话人嵌入"
   },
   "blocks": [
    {
     "id": "p-II-C-1",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-II-C-1-1",
       "original": "Speaker identity information is necessary for zero-shot speaker cloning.",
       "zh": "说话人身份信息是零样本说话人克隆的必要条件。"
      },
      {
       "id": "s-II-C-1-2",
       "original": "For ZONOS2, we condition on ECAPA- TDNN speaker embeddings (Desplanques, Thienpondt & Demuynck, 2020), using the pre-trained module of Hu, Zhu, & He et al. (2026) to extract a 2048-dimensional embedding ex from a given utterance x.",
       "zh": "ZONOS2 以 ECAPA-TDNN 说话人嵌入（Desplanques, Thienpondt & Demuynck, 2020）为条件，使用 Hu, Zhu, & He et al.（2026）的预训练模块，从给定语句 x 中提取 2048 维嵌入 ex。"
      }
     ]
    },
    {
     "id": "p-II-C-2",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-II-C-2-1",
       "original": "Conditioning on this single embedding vector, rather than on the reference waveform or its token sequence, is attractive for two reasons.",
       "zh": "以这单个嵌入向量、而不是以参考波形或其 token 序列为条件，有两点吸引力。"
      },
      {
       "id": "s-II-C-2-2",
       "original": "First, the speaker representation occupies a single position at the start of the sequence, so it adds negligible cost to the prefix and does not grow the context the decoder must attend over, regardless of how long the reference recording is.",
       "zh": "第一，说话人表示只占据序列开头的一个位置，因此它给前缀带来的开销可以忽略；无论参考录音有多长，都不会增加解码器需要关注的上下文长度。"
      },
      {
       "id": "s-II-C-2-3",
       "original": "This avoids the problem of long clone target utterances consuming context which would otherwise be used for generation, as well as reliance on a transcription of the speech in the target clone utterance.",
       "zh": "这既避免了长克隆目标语句占用本应用于生成的上下文，也避免了对目标克隆语句转写文本的依赖。"
      },
      {
       "id": "s-II-C-2-4",
       "original": "Second, the embedding is highbandwidth; a single 2048-dimensional vector can capture nearly all of the desired speaker characteristics, so little identity information is lost relative to conditioning on the full utterance.",
       "zh": "第二，该嵌入是高带宽的：单个 2048 维向量几乎能捕捉所有期望的说话人特征，因此相比以整条语句为条件，身份信息的损失很小。"
      }
     ]
    },
    {
     "id": "p-II-C-3",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-II-C-3-1",
       "original": "Increasing the speaker embedding bandwidth means that the embedding also encodes a great deal of undesired information.",
       "zh": "提高说话人嵌入的带宽，意味着嵌入同时也编码了大量不期望的信息。"
      },
      {
       "id": "s-II-C-3-2",
       "original": "The duration of the reference utterance, non-speech acoustic properties such as background noise and recording conditions, the exact words spoken in the prompt, and the placement of pauses are all present in ex.",
       "zh": "参考语句的时长、背景噪声与录音条件等非语音声学属性、提示中所说的具体词句，以及停顿的位置，都存在于 ex 之中。"
      },
      {
       "id": "s-II-C-3-3",
       "original": "Importantly, none of these should be carried into the generated speech which we expect to be different along these axes.",
       "zh": "重要的是，这些都不应被带进生成语音——我们期望生成语音在这些维度上有所不同。"
      },
      {
       "id": "s-II-C-3-4",
       "original": "To reduce this kind of unintentional leakage, the embedding is projected through an Linear Discriminant Analysis (LDA) transform to a 1024-dimensional vector ˆex.",
       "zh": "为减少这类无意的泄漏，嵌入会经过一个线性判别分析（LDA）变换，投影为 1024 维向量 êx。"
      },
      {
       "id": "s-II-C-3-5",
       "original": "Because the LDA is estimated from speakerlabeled data to maximize between-speaker variance relative to within-speaker variance, it retains the directions that separate one speaker from another while attenuating the factors that vary across different recordings of the same speaker such as duration, noise, lexical content, and pause structure noted above.",
       "zh": "由于 LDA 是在带说话人标签的数据上估计的、目标是最大化说话人间方差相对于说话人内方差，它保留了区分不同说话人的方向，同时衰减了同一说话人不同录音之间变化的因素——例如上文提到的时长、噪声、词汇内容与停顿结构。"
      }
     ]
    },
    {
     "id": "p-II-C-4",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-II-C-4-1",
       "original": "To condition the autoregressive TTS model on this representation, a learned projection of the speaker embedding is placed at the beginning of the sequence:",
       "zh": "为让自回归 TTS 模型以该表示为条件，把说话人嵌入的学习投影放在序列开头：hspk = Wspk êx + bspk，其中 Wspk ∈ Rdmodel×1024 将说话人嵌入映射到 Transformer 的隐藏维度。"
      }
     ]
    },
    {
     "id": "eq-II-C-1",
     "type": "equation",
     "page": 4,
     "original": "hspk = Wspkˆex + bspk, (3)"
    },
    {
     "id": "p-II-C-5",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-II-C-5-1",
       "original": "where Wspk ∈Rdmodel×1024 maps the speaker embedding into the transformer hidden dimension.",
       "zh": "为让自回归 TTS 模型以该表示为条件，把说话人嵌入的学习投影放在序列开头：hspk = Wspk êx + bspk，其中 Wspk ∈ Rdmodel×1024 将说话人嵌入映射到 Transformer 的隐藏维度。"
      }
     ]
    },
    {
     "id": "p-II-C-6",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-II-C-6-1",
       "original": "Beyond discarding nuisance factors, the LDA projection helps mitigate a core problem with the speaker embeddings.",
       "zh": "除了丢弃干扰因素，LDA 投影还有助于缓解说话人嵌入的一个核心问题。"
      },
      {
       "id": "s-II-C-6-2",
       "original": "There is a tradeoff between how much information an embedding carries about its source utterance and how long the model can be trained on embeddings drawn from that utterance before overfitting starts to occur.",
       "zh": "嵌入携带其源语句的信息量，与模型能在来自该语句的嵌入上训练多久才会过拟合，二者之间存在权衡。"
      },
      {
       "id": "s-II-C-6-3",
       "original": "Because the embedding is computed from the groundtruth recording of the target utterance, any utterancespecific information it leaks, such as lexical content and pause timing, offers the model a shortcut.",
       "zh": "因为嵌入是从目标语句的真实录音计算的，它泄漏的任何语句特定信息（如词汇内容与停顿时机）都给模型提供了一条捷径。"
      },
      {
       "id": "s-II-C-6-4",
       "original": "It can reduce its training loss by reading these specifics out of the speaker embedding instead of learning a solution that generalizes to text, emotion, or pauses not present in the reference clip.",
       "zh": "模型可以直接从说话人嵌入中读出这些细节来降低训练损失，而不去学一个能泛化到参考片段之外的文本、情感或停顿的解。"
      },
      {
       "id": "s-II-C-6-5",
       "original": "The more information about the target the embedding exposes, the sooner this shortcut comes to dominate and the fewer useful training steps remain.",
       "zh": "嵌入暴露的目标信息越多，这条捷径就越快占据主导，剩余的有效训练步数就越少。"
      },
      {
       "id": "s-II-C-6-6",
       "original": "Without the LDA transformation, we found we could not take enough training steps with the speaker embedding to learn high-quality voice cloning before overfitting occurred.",
       "zh": "我们发现，若不做 LDA 变换，用说话人嵌入训练时还没学到高质量的声音克隆，模型就已经过拟合了。"
      },
      {
       "id": "s-II-C-6-7",
       "original": "The LDA projection is necessary to extend the usable training horizon of the embedding.",
       "zh": "LDA 投影是延长嵌入可用训练时程的必要手段。"
      }
     ]
    },
    {
     "id": "p-II-C-7",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-II-C-7-1",
       "original": "Even with the LDA projection, the extent to which the model can be safely trained using embeddings extracted from the target utterance remains limited.",
       "zh": "即便有了 LDA 投影，用从目标语句提取的嵌入能安全训练的限度仍然有限。"
      },
      {
       "id": "s-II-C-7-2",
       "original": "The training horizon is extended with a two-phase scheme for speaker conditioning, described in Section IV-C, which is ultimately what yielded the final ZONOS2 model.",
       "zh": "第 IV-C 节所述的两阶段说话人条件化方案进一步延长了训练时程，最终产出 ZONOS2 的正是这一方案。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-II-D",
   "num": "D",
   "level": 2,
   "page": 4,
   "title": {
    "original": "Speaking-Rate Conditioning",
    "zh": "语速条件化"
   },
   "blocks": [
    {
     "id": "p-II-D-1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-II-D-1-1",
       "original": "To enable finer-grained control over speech generation, speaking-rate conditioning is introduced.",
       "zh": "为对语音生成实现更细粒度的控制，我们引入了语速条件化。"
      },
      {
       "id": "s-II-D-1-2",
       "original": "For each training utterance, symbols, annotations, whitespace, and punctuation are first stripped from the text, and the speaking rate is computed as the number of UTF-8 bytes in the remaining text divided by the utterance duration in seconds.",
       "zh": "对每条训练语句，先从文本中剥离符号、标注、空白与标点，然后将语速计算为剩余文本的 UTF-8 字节数除以语句时长（秒）。"
      },
      {
       "id": "s-II-D-1-3",
       "original": "This rate is quantized into a discrete bucket and a token representing the bucket is prepended to the utterance’s text tokens in the packed sequence.",
       "zh": "该速率被量化为一个离散桶，代表该桶的 token 被前置到打包序列中该语句的文本 token 之前。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-II-E",
   "num": "E",
   "level": 2,
   "page": 4,
   "title": {
    "original": "Quality Conditioning",
    "zh": "质量条件化"
   },
   "blocks": [
    {
     "id": "p-II-E-1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-II-E-1-1",
       "original": "During initial testing, the model was found to be highly sensitive to the acoustic content of the speaker-cloning audio which degraded the quality of generations from low",
       "zh": "在初期测试中我们发现，模型对声音克隆音频的声学内容高度敏感，这会降低低质量说话人样本的生成"
      }
     ]
    },
    {
     "id": "fig-II-E-1",
     "type": "figure_caption",
     "page": 4,
     "original": "Fig. 2: Schematic of the ZONOS2 transformer MoE architecture.",
     "zh": "图 2：ZONOS2 Transformer MoE 架构示意图。"
    },
    {
     "id": "p-II-E-2",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-II-E-2-1",
       "original": "quality speaker samples.",
       "zh": "质量。"
      },
      {
       "id": "s-II-E-2-2",
       "original": "To produce consistently highquality generations regardless of the acoustic properties of the clone audio, two forms of quality conditioning are introduced.",
       "zh": "为让生成质量不随克隆音频的声学属性波动而始终保持高水平，我们引入了两种形式的质量条件化。"
      }
     ]
    },
    {
     "id": "p-II-E-3",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-II-E-3-1",
       "original": "First, during training, various acoustic augmentations are applied to the clone audio before the speaker embedding is computed.",
       "zh": "第一，训练时在计算说话人嵌入之前，对克隆音频施加各种声学增强。"
      },
      {
       "id": "s-II-E-3-2",
       "original": "These augmentations include mixing in background noise or music, applying audio-codec compression, and simulating environmental reverberation.",
       "zh": "这些增强包括混入背景噪声或音乐、施加音频 codec 压缩，以及模拟环境混响。"
      },
      {
       "id": "s-II-E-3-3",
       "original": "The target DAC tokens are computed from the clean, unaugmented audio, so that the model learns to be robust to these augmentations in the clone audio.",
       "zh": "目标 DAC token 由干净的、未增强的音频计算，因此模型学会对克隆音频中的这些增强保持鲁棒。"
      },
      {
       "id": "s-II-E-3-4",
       "original": "This augmentation is applied with probability αAUG during annealing, and only to utterances whose metadata indicates the source audio is clean.",
       "zh": "该增强在退火阶段以概率 αAUG 施加，且仅施加于元数据表明源音频干净的语句。"
      },
      {
       "id": "s-II-E-3-5",
       "original": "When applied, an additional ‘Augmented Embedding’ token is appended to the sequence.",
       "zh": "施加增强时，会在序列后追加一个额外的「增强嵌入」（Augmented Embedding）token。"
      }
     ]
    },
    {
     "id": "p-II-E-4",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-II-E-4-1",
       "original": "Second, additional conditioning information, such as generation bandwidth, volume, leading and trailing silent frames, and estimated Signal to Noise Ratio (SNR), is also introduced as synthetic text tokens, following the same approach used for the speaking-rate conditioning described above.",
       "zh": "第二，额外的条件信息——如生成带宽、音量、首尾静音帧数以及估计的信噪比（SNR）——也以合成文本 token 的形式引入，做法与上文所述的语速条件化相同。"
      },
      {
       "id": "s-II-E-4-2",
       "original": "This enables fine-grained control over the acoustic properties of the generated audio at inference time.",
       "zh": "这使得推理时能对生成音频的声学属性做细粒度控制。"
      },
      {
       "id": "s-II-E-4-3",
       "original": "During the final annealing stage, a high-quality subset of the training corpora is paired with a ‘Quality Mode’ token.",
       "zh": "在最后的退火阶段，训练语料中的一个高质量子集会被配上「质量模式」（Quality Mode）token。"
      },
      {
       "id": "s-II-E-4-4",
       "original": "At inference, this allows the user to select high intelligibility at the cost of speaker-cloning capability.",
       "zh": "推理时，用户可借此选择以牺牲声音克隆能力为代价换取高可懂度。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-II-F",
   "num": "F",
   "level": 2,
   "page": 4,
   "title": {
    "original": "MoE Transformer",
    "zh": "MoE Transformer"
   },
   "blocks": [
    {
     "id": "p-II-F-1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-II-F-1-1",
       "original": "The backbone is a 28-layer transformer with hidden dimension 2048 (Figure 2).",
       "zh": "主干是一个 28 层、隐藏维度 2048 的 Transformer（图 2）。"
      },
      {
       "id": "s-II-F-1-2",
       "original": "The first three layers and the final layer are dense; the rest follow the MoE transformer and use top-1 routing, except the final routed layer, which uses top-2.",
       "zh": "前三层与最后一层是稠密层；其余层采用 MoE Transformer 并使用 top-1 路由，只有最后一个路由层使用 top-2。"
      },
      {
       "id": "s-II-F-1-3",
       "original": "The router design closely follows (Washbourne, Iyer, & Figliolia et al., 2026), and attention uses Grouped Query Attention (GQA) (Ainslie, Lee-Thorp, & de Jong et al., 2023) with Qwen gating (Qiu, Wang, & Zheng et al., 2025) in the headwise location.",
       "zh": "路由器设计紧密沿用（Washbourne, Iyer, & Figliolia et al., 2026），注意力采用分组查询注意力（GQA）（Ainslie, Lee-Thorp, & de Jong et al., 2023），并在逐头（headwise）位置施加 Qwen 门控（Qiu, Wang, & Zheng et al., 2025）。"
      },
      {
       "id": "s-II-F-1-4",
       "original": "The input representation is formed by embedding each delayed audio-codebook frame with its own embedding table and summing the resulting vectors; when speaker conditioning is used, the projected embedding is placed at the start of this sequence, which is then normalized with RMSNorm (Zhang & Sennrich, 2019) before being passed to the transformer stack.",
       "zh": "输入表示的构造方式是：每个延迟后的音频码本帧使用各自独立的嵌入表嵌入，再把得到的向量求和；使用说话人条件化时，投影后的嵌入被放在该序列的开头，随后经 RMSNorm（Zhang & Sennrich, 2019）归一化再送入 Transformer 堆叠。"
      }
     ]
    },
    {
     "id": "p-II-F-2",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-II-F-2-1",
       "original": "The router’s network structure is shown on the left of Figure 2.",
       "zh": "路由器的网络结构见图 2 左侧。"
      },
      {
       "id": "s-II-F-2-2",
       "original": "A down projection feeds an Exponential Depth Averaging (EDA) stage (Pagliardini, Mohtashami, & Fleuret et al., 2024; Washbourne, Iyer, & Figliolia et al., 2026), which blends the previous layer’s router states with the current layer’s via a learned scaling parameter.",
       "zh": "一个下投影之后接指数深度平均（EDA）阶段（Pagliardini, Mohtashami, & Fleuret et al., 2024; Washbourne, Iyer, & Figliolia et al., 2026），它通过一个学习到的缩放参数，把上一层的路由器状态与当前层的融合。"
      },
      {
       "id": "s-II-F-2-3",
       "original": "The result passes through RMSNorm and a three-layer Multi Layer Perceptron (MLP) with Gaussian Error Linear Units (GELU) activations (Hendrycks & Gimpel, 2023) to produce the final router scores.",
       "zh": "其结果再经过 RMSNorm 和一个以高斯误差线性单元（GELU）为激活（Hendrycks & Gimpel, 2023）的三层多层感知机（MLP），产生最终的路由分数。"
      },
      {
       "id": "s-II-F-2-4",
       "original": "For a full configuration breakdown see Table V; for full model details see Section C.",
       "zh": "完整的配置明细见表 V；完整的模型细节见附录 C。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-II-G",
   "num": "G",
   "level": 2,
   "page": 5,
   "title": {
    "original": "Training Objective",
    "zh": "训练目标"
   },
   "blocks": [
    {
     "id": "p-II-G-1",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-II-G-1-1",
       "original": "The model is trained as a standard autoregressive conditional language model, outputting DAC tokens.",
       "zh": "模型按标准的自回归条件语言模型训练，输出 DAC token。"
      },
      {
       "id": "s-II-G-1-2",
       "original": "Let s denote the complete packed training sequence, consisting of the optional speaker-conditioning and speakingrate frames, the byte-tokenized text prompt, and the delayed audio-token frames.",
       "zh": "记 s 为完整的打包训练序列，由可选的说话人条件化与语速帧、字节分词后的文本提示、以及延迟音频 token 帧构成。"
      },
      {
       "id": "s-II-G-1-3",
       "original": "Given the causal hidden state ht = fθ(s<t), the model predicts the next delayed audiocodebook frame:",
       "zh": "给定因果隐状态 ht = fθ(s<t)，模型预测下一个延迟音频码本帧：pθ(Y[t + 1, n] = v | s<t) = softmax(ℓ̃t,n)v。"
      }
     ]
    },
    {
     "id": "eq-II-G-1",
     "type": "equation",
     "page": 5,
     "original": "pθ(Y [t + 1, n] = v | s<t) = softmax(˜ℓt,n)v. (4)"
    },
    {
     "id": "p-II-G-2",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-II-G-2-1",
       "original": "For numerical stability, logits are soft-capped before the softmax (Google, 2024):",
       "zh": "为数值稳定，logits 在 softmax 之前被软截断（Google, 2024）："
      }
     ]
    },
    {
     "id": "eq-II-G-2",
     "type": "equation",
     "page": 5,
     "original": "˜ℓt,j = τ tanh (ℓt,j"
    },
    {
     "id": "eq-II-G-3",
     "type": "equation",
     "page": 5,
     "original": ") ,"
    },
    {
     "id": "eq-II-G-4",
     "type": "equation",
     "page": 5,
     "original": "τ"
    },
    {
     "id": "p-II-G-3",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-II-G-3-1",
       "original": "with τ = 15 in our training runs.",
       "zh": "我们的训练运行中取 τ = 15。"
      },
      {
       "id": "s-II-G-3-2",
       "original": "The per-codebook predictive distribution is then",
       "zh": "每个码本的预测分布即为 pθ(Yt,j = v | s<t) = softmax(ℓ̃t,j)v。"
      }
     ]
    },
    {
     "id": "eq-II-G-5",
     "type": "equation",
     "page": 5,
     "original": "pθ(Yt,j = v | s<t) = softmax(˜ℓt,j)v. (5)"
    },
    {
     "id": "p-II-G-4",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-II-G-4-1",
       "original": "The main training loss is the masked negative loglikelihood over non-padding audio targets:",
       "zh": "主训练损失是对非填充音频目标计算的掩码负对数似然："
      }
     ]
    },
    {
     "id": "eq-II-G-6",
     "type": "equation",
     "page": 5,
     "original": "∑"
    },
    {
     "id": "p-II-G-5",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-II-G-5-1",
       "original": "LNLL = −",
       "zh": "LNLL = − (1/Maud) Σt,j mt,j log pθ(Y[t + 1, j] | s<t)，其中 mt,j = 1 当且仅当目标 yt,j 不是 p，且 Maud = Σt,j mt,j。"
      }
     ]
    },
    {
     "id": "eq-II-G-7",
     "type": "equation",
     "page": 5,
     "original": "1"
    },
    {
     "id": "p-II-G-6",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-II-G-6-1",
       "original": "Maud",
       "zh": "LNLL = − (1/Maud) Σt,j mt,j log pθ(Y[t + 1, j] | s<t)，其中 mt,j = 1 当且仅当目标 yt,j 不是 p，且 Maud = Σt,j mt,j。"
      }
     ]
    },
    {
     "id": "eq-II-G-8",
     "type": "equation",
     "page": 5,
     "original": "t,j mt,j log pθ(Y [t + 1, j] | s<t), (6)"
    },
    {
     "id": "p-II-G-7",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-II-G-7-1",
       "original": "where mt,j",
       "zh": "（公式片段：……其中 m_{t,j} = 1 仅当目标 y_{t,j} 不是 p 时，M_aud = Σ_{t,j} m_{t,j}。）"
      }
     ]
    },
    {
     "id": "eq-II-G-9",
     "type": "equation",
     "page": 5,
     "original": "="
    },
    {
     "id": "p-II-G-8",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-II-G-8-1",
       "original": "1 only when the target yt,j is not p, and Maud",
       "zh": "（公式片段：……其中 m_{t,j} = 1 仅当目标 y_{t,j} 不是 p 时，M_aud = Σ_{t,j} m_{t,j}。）"
      }
     ]
    },
    {
     "id": "eq-II-G-10",
     "type": "equation",
     "page": 5,
     "original": "= ∑"
    },
    {
     "id": "p-II-G-9",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-II-G-9-1",
       "original": "t,j mt,j.",
       "zh": "（公式片段：……其中 m_{t,j} = 1 仅当目标 y_{t,j} 不是 p 时，M_aud = Σ_{t,j} m_{t,j}。）"
      },
      {
       "id": "s-II-G-9-2",
       "original": "Text tokens and optional speaker-conditioning, speaking-rate and quality positions are therefore used as context but are not reconstructed as targets.",
       "zh": "因此，文本 token 以及可选的说话人条件化、语速与质量位置都被用作上下文，但不作为被重建的目标。"
      }
     ]
    },
    {
     "id": "fig-II-G-1",
     "type": "figure_caption",
     "page": 5,
     "original": "Fig. 3: A breakdown of the training dataset for ZONOS2 by language.",
     "zh": "图 3：ZONOS2 训练数据集按语言的构成拆分。"
    },
    {
     "id": "p-II-G-10",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-II-G-10-1",
       "original": "For mixture-of-experts layers, a router balancing objective is used during training.",
       "zh": "对混合专家层，训练时使用一个路由均衡目标。"
      },
      {
       "id": "s-II-G-10-2",
       "original": "Let uℓ,e be the empirical fraction of routed tokens assigned to expert e in MoE layer ℓ, and let ¯ue = 1/E be the uniform expert usage for E experts (Wang, Gao, & Zhao et al., 2024).",
       "zh": "记 uℓ,e 为 MoE 层 ℓ 中被路由到专家 e 的 token 的经验占比，记 ūe = 1/E 为 E 个专家下的均匀使用率（Wang, Gao, & Zhao et al., 2024）。"
      },
      {
       "id": "s-II-G-10-3",
       "original": "Each MoE layer maintains a zero-mean balancing bias vector bℓ.",
       "zh": "每个 MoE 层维护一个零均值的均衡偏置向量 bℓ。"
      },
      {
       "id": "s-II-G-10-4",
       "original": "The auxiliary loss is",
       "zh": "辅助损失为"
      }
     ]
    },
    {
     "id": "eq-II-G-11",
     "type": "equation",
     "page": 5,
     "original": "Lbal = ∑"
    },
    {
     "id": "eq-II-G-12",
     "type": "equation",
     "page": 5,
     "original": "ℓ∈M b⊤ ℓsg(uℓ−¯u), (7)"
    },
    {
     "id": "p-II-G-11",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-II-G-11-1",
       "original": "where sg(·) denotes stop-gradient.",
       "zh": "bℓ⊤ sg(uℓ − ū)，其中 sg(·) 表示停止梯度。"
      },
      {
       "id": "s-II-G-11-2",
       "original": "Minimizing this term decreases the routing bias for overused experts and increases it for underused experts.",
       "zh": "最小化该项会降低被过度使用专家的路由偏置、提高使用不足专家的偏置。"
      }
     ]
    },
    {
     "id": "p-II-G-12",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-II-G-12-1",
       "original": "A separate AdamW (Loshchilov & Hutter, 2019) optimizer is used to learn the bias vectors.",
       "zh": "偏置向量由一个独立的 AdamW（Loshchilov & Hutter, 2019）优化器学习。"
      }
     ]
    },
    {
     "id": "p-II-G-13",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-II-G-13-1",
       "original": "The total objective minimized during training is simply the sum of these terms:",
       "zh": "训练中最小化的总目标就是这些项的简单求和："
      }
     ]
    },
    {
     "id": "eq-II-G-13",
     "type": "equation",
     "page": 5,
     "original": "L = LNLL + Lbal. (8)"
    }
   ]
  },
  {
   "id": "sec-III",
   "num": "III",
   "level": 1,
   "page": 5,
   "title": {
    "original": "Data Pipeline",
    "zh": "数据管线"
   },
   "blocks": [
    {
     "id": "p-III-1",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-III-1-1",
       "original": "The key to high-quality TTS training data is strong alignment between audio and its transcription.",
       "zh": "高质量 TTS 训练数据的关键在于音频与其转写之间的强对齐。"
      },
      {
       "id": "s-III-1-2",
       "original": "To this end, we implemented a two-stage data processing pipeline.",
       "zh": "为此，我们实现了一个两阶段的数据处理管线。"
      },
      {
       "id": "s-III-1-3",
       "original": "For the first stage, we applied a Voice Activity Detection (VAD) system to all raw audio, producing utterance-level",
       "zh": "第一阶段，我们对所有原始音频应用语音活动检测（VAD）系统，产出语句级"
      }
     ]
    },
    {
     "id": "fig-III-1",
     "type": "figure_caption",
     "page": 6,
     "original": "Fig. 4: Learning rate and MoE router entropy over each stage of training.",
     "zh": "图 4：训练各阶段的学习率与 MoE 路由器熵。"
    },
    {
     "id": "p-III-2",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-III-2-1",
       "original": "segments.",
       "zh": "片段。"
      },
      {
       "id": "s-III-2-2",
       "original": "In the second stage, we used multiple Automatic Speech Recognition (ASR) systems to independently transcribe each utterance (Koluguri, Sekoyan, & Zelenfroynd et al., 2025).",
       "zh": "第二阶段，我们用多个自动语音识别（ASR）系统独立转写每条语句（Koluguri, Sekoyan, & Zelenfroynd et al., 2025）。"
      }
     ]
    },
    {
     "id": "p-III-3",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-III-3-1",
       "original": "This ensemble approach to transcript generation has several advantages.",
       "zh": "这种转写生成的集成做法有几个优点。"
      },
      {
       "id": "s-III-3-2",
       "original": "During training, we measured interASR-system agreement via the pairwise WER between ASR transcripts, where a lower WER indicates closer agreement.",
       "zh": "训练期间，我们用 ASR 转写之间的两两 WER 来度量不同 ASR 系统的一致性，WER 越低表示一致性越高。"
      },
      {
       "id": "s-III-3-3",
       "original": "We discarded utterances where the pairwise error exceeded a minimum threshold, removing low-quality samples on which the ASR systems disagree.",
       "zh": "我们丢弃两两错误超过最低阈值的语句，从而剔除各 ASR 系统意见不一的低质量样本。"
      },
      {
       "id": "s-III-3-4",
       "original": "We then adjusted the threshold to the specific needs of different training stages.",
       "zh": "随后我们根据不同训练阶段的具体需求调整该阈值。"
      },
      {
       "id": "s-III-3-5",
       "original": "It was set low during pre-training, where data variety matters most, and raised during annealing where the character of the final model is formed.",
       "zh": "预训练阶段阈值设得低——此时数据多样性最重要；退火阶段阈值抬高——此时最终模型的品性正在成形。"
      },
      {
       "id": "s-III-3-6",
       "original": "The ensemble also allowed different transcripts to be selected as the input text for the same utterance across training, preventing the TTS model from overfitting to a particular style of transcription.",
       "zh": "集成做法还允许在训练过程中为同一语句选用不同的转写作为输入文本，防止 TTS 模型过拟合到某一种特定的转写风格。"
      }
     ]
    },
    {
     "id": "p-III-4",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-III-4-1",
       "original": "Our full dataset combines public speech corpora, podcasts, public-domain audiobooks, conversational datasets, multilingual web-scale speech data, and expressive or character-driven voice datasets.",
       "zh": "我们的完整数据集结合了公开语音语料、播客、公有领域有声书、对话数据集、多语种网络规模语音数据，以及富有表现力或角色驱动的语音数据集。"
      },
      {
       "id": "s-III-4-2",
       "original": "Data loading was configured so that specific sub-datasets can be up-weighted during training.",
       "zh": "数据加载被配置为可在训练中对特定子数据集上调权重。"
      },
      {
       "id": "s-III-4-3",
       "original": "In Figure 3, we break down our entire 6.2- million-hour dataset by language.",
       "zh": "图 3 将我们整个 6.2 百万小时的数据集按语言拆分。"
      },
      {
       "id": "s-III-4-4",
       "original": "While English forms the majority of the training data, the final model generalizes well across all languages tested, including those which represent only a fraction of the overall training data.",
       "zh": "虽然英语构成训练数据的主体，但最终模型在所有受测语言上都泛化良好，包括在整体训练数据中只占很小比例的语言。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-IV",
   "num": "IV",
   "level": 1,
   "page": 6,
   "title": {
    "original": "Training Overview",
    "zh": "训练概览"
   },
   "blocks": [
    {
     "id": "p-IV-1",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-IV-1-1",
       "original": "The training process consisted of four stages.",
       "zh": "训练过程由四个阶段组成。"
      },
      {
       "id": "s-IV-1-2",
       "original": "The first was a large-scale pre-training stage without conditioning.",
       "zh": "第一阶段是不带条件化的大规模预训练。"
      }
     ]
    },
    {
     "id": "p-IV-2",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-IV-2-1",
       "original": "This was followed by a shorter mid-training stage with stricter transcript agreement filtering and sub-dataset selection.",
       "zh": "随后是较短的中间训练阶段，采用更严格的转写一致性过滤与子数据集筛选。"
      },
      {
       "id": "s-IV-2-2",
       "original": "An initial annealing stage introduced conditioning signals like the speaker embedding, speaking-rate tokens, and quality conditioning.",
       "zh": "首个退火阶段引入说话人嵌入、语速 token 与质量条件化等条件化信号。"
      },
      {
       "id": "s-IV-2-3",
       "original": "The first annealing stage also embedded only segments of the target audio with the speaker embedding and masked the loss for those segments to prevent causal leakage.",
       "zh": "首个退火阶段还只对目标音频的片段计算说话人嵌入，并对这些片段掩码损失，以防止因果泄漏。"
      },
      {
       "id": "s-IV-2-4",
       "original": "This was followed by a final annealing stage in which the ‘Quality Mode’ conditioning was introduced, speaker embeddings cover the entire target segment, and loss masking was dropped for the embedded speaker segment.",
       "zh": "之后是最后的退火阶段：引入「质量模式」（Quality Mode）条件化，说话人嵌入覆盖整个目标片段，并且不再对被嵌入的说话人片段做损失掩码。"
      },
      {
       "id": "s-IV-2-5",
       "original": "Figure 4 shows the overall learning rate as well as MoE router entropy for the most unstable layers of the model during each stage of training.",
       "zh": "图 4 展示了各训练阶段的总体学习率，以及模型中最不稳定层的 MoE 路由器熵。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-IV-A",
   "num": "A",
   "level": 2,
   "page": 6,
   "title": {
    "original": "Pre-training",
    "zh": "预训练"
   },
   "blocks": [
    {
     "id": "p-IV-A-1",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-IV-A-1-1",
       "original": "The model was pre-trained for 77,500 optimizer steps or 2.9T tokens.",
       "zh": "模型预训练了 77,500 个优化器步，约 2.9T token。"
      },
      {
       "id": "s-IV-A-1-2",
       "original": "This stage used the base TTS objective without speaker embeddings or quality conditioning.",
       "zh": "该阶段使用基础 TTS 目标，不含说话人嵌入与质量条件化。"
      },
      {
       "id": "s-IV-A-1-3",
       "original": "Text was tokenized as bytes, and audio was represented as discrete multi-codebook audio tokens, as described above.",
       "zh": "文本按字节分词，音频如前文所述表示为离散的多码本音频 token。"
      }
     ]
    },
    {
     "id": "p-IV-A-2",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-IV-A-2-1",
       "original": "We trained at a maximum sequence length of 6144 frames and sequences were packed together with document masking to create global batches of 37.7 million DAC frames or 121.8 hours of audio.",
       "zh": "我们以最大序列长度 6144 帧训练，序列通过文档掩码打包在一起，组成 37.7 百万 DAC 帧（即 121.8 小时音频）的全局批次。"
      },
      {
       "id": "s-IV-A-2-2",
       "original": "Data sources were sampled with dataset-specific weights to increase the frequency of underrepresented and high quality audio types such as expressive speech, acted speech, and dialogue-style data relative to larger generic speech corpora.",
       "zh": "数据源按数据集特定的权重采样，以相对更大规模的通用语音语料，提高占比不足、高质量的音频类型——如富有表现力的语音、表演式语音与对话式数据——的出现频率。"
      }
     ]
    },
    {
     "id": "p-IV-A-3",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-IV-A-3-1",
       "original": "We trained with the Muon optimizer (Jordan, Jin, & Boza et al., 2024; Liu, Su, & Yao et al., 2025) with a base learning rate of 5×10−4, a Muon learning rate of 5×10−3, Seed-TTS-Eval CV3-Eval MiniMax-ML ZTTS1-Eval Languages up to 17 Audio read read/expressive read read and ITW spontaneous Duration",
       "zh": "我们\n我们使用 Muon 优化器（Jordan, Jin, & Boza et al., 2024; Liu, Su, & Yao et al., 2025）进行训练，基础学习率为 5×10−4，Muon 学习率为 5×10−3，Seed-TTS-Eval CV3-Eval MiniMax-ML ZTTS1-Eval 语言 最多 17 种 音频 朗读 朗读/表现力朗读 朗读及 ITW 自发 时长"
      }
     ]
    },
    {
     "id": "eq-IV-A-1",
     "type": "equation",
     "page": 6,
     "original": "–†"
    },
    {
     "id": "p-IV-A-4",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-IV-A-4-1",
       "original": "Prosody / div.",
       "zh": "我们使用 Muon 优化器（Jordan, Jin, & Boza et al., 2024; Liu, Su, & Yao et al., 2025），基础学习率 5×10^−4，Muon 学习率 5×10^−3，（以下为抽取层混入正文的表 II 栏名残片，逐词译为中文标签：Seed-TTS-Eval CV3-Eval MiniMax-ML ZTTS1-Eval 语言 up to 17 音频 read read/expressive read read 与 ITW spontaneous 时长 –† 韵律 / 多样性。）"
      }
     ]
    },
    {
     "id": "eq-IV-A-2",
     "type": "equation",
     "page": 7,
     "original": "–"
    },
    {
     "id": "eq-IV-A-3",
     "type": "equation",
     "page": 7,
     "original": "task specific"
    },
    {
     "id": "eq-IV-A-4",
     "type": "equation",
     "page": 7,
     "original": "–"
    },
    {
     "id": "p-IV-A-5",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-IV-A-5-1",
       "original": "TTSDS2 + DS-WED ASR scorer Whisper-L / Paraformer Whisper-L / Paraformer Whisper-L / Paraformer Qwen3-ASR Speaker scorer WavLM ERes2Net WavLM ReDimNet Quality scorer",
       "zh": "（表 II：Seed-TTS-Eval、CV3-Eval、MiniMax 多语测试集（MiniMax-ML）与本文 ZTTS1-Eval 的对比——任务特定性：task specific / TTSDS2 + DS-WED；ASR scorer：Whisper-L / Paraformer（三者）与 Qwen3-ASR；Speaker scorer：WavLM / ERes2Net / WavLM / ReDimNet；Quality scorer：– / DNSMOS / – / MSR-UTMOS。表注 †：MiniMax-ML 每语言 100 句、每语 2 条参考语音。训练配置：weight decay 0.1、梯度裁剪 0.5、100 步 warmup、余弦学习率衰减。）"
      }
     ]
    },
    {
     "id": "eq-IV-A-5",
     "type": "equation",
     "page": 7,
     "original": "–"
    },
    {
     "id": "eq-IV-A-6",
     "type": "equation",
     "page": 7,
     "original": "DNSMOS"
    },
    {
     "id": "eq-IV-A-7",
     "type": "equation",
     "page": 7,
     "original": "–"
    },
    {
     "id": "p-IV-A-6",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-IV-A-6-1",
       "original": "MSR-UTMOS TABLE II: Comparison of Seed-TTS-Eval, CV3-Eval, the MiniMax multilingual test set (MiniMax-ML), and the proposed ZTTS1-Eval. †: MiniMax-ML contains 100 sentences and two reference utterances per language. weight decay of 0.1, gradient clipping at 0.5, a 100-step warmup, and cosine learning-rate decay.",
       "zh": "（表 II：Seed-TTS-Eval、CV3-Eval、MiniMax 多语测试集（MiniMax-ML）与本文 ZTTS1-Eval 的对比——任务特定性：task specific / TTSDS2 + DS-WED；ASR scorer：Whisper-L / Paraformer（三者）与 Qwen3-ASR；Speaker scorer：WavLM / ERes2Net / WavLM / ReDimNet；Quality scorer：– / DNSMOS / – / MSR-UTMOS。表注 †：MiniMax-ML 每语言 100 句、每语 2 条参考语音。训练配置：weight decay 0.1、梯度裁剪 0.5、100 步 warmup、余弦学习率衰减。）"
      }
     ]
    },
    {
     "id": "p-IV-A-7",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-IV-A-7-1",
       "original": "During the pre-training stage, we found that the expert routing was highly unstable and the normalized entropy of several layers periodically collapsed to as low as 0.6 and remained there without intervention.",
       "zh": "预训练阶段，我们发现专家路由高度不稳定，若干层的归一化熵会周期性塌缩到最低 0.6，且不经干预就一直停留在那里。"
      },
      {
       "id": "s-IV-A-7-2",
       "original": "Normalized entropy for unbalanced layers is visible in Figure 4.",
       "zh": "不均衡层的归一化熵可见于图 4。"
      },
      {
       "id": "s-IV-A-7-3",
       "original": "To mitigate this instability, we set the first three layers and the final layer to be dense transformer blocks, and the last MoE block to use top-2 routing.",
       "zh": "为缓解这种不稳定，我们把前三层与最后一层设为稠密 Transformer 块，并令最后一个 MoE 块使用 top-2 路由。"
      },
      {
       "id": "s-IV-A-7-4",
       "original": "In addition, the balancing-bias and router learning rates were adjusted manually in response to the different types of expert collapse encountered during training.",
       "zh": "此外，针对训练中遇到的不同类型的专家塌缩，我们手动调整了均衡偏置与路由器的学习率。"
      },
      {
       "id": "s-IV-A-7-5",
       "original": "We found that MoE balancing on audio data is substantially harder than on text data, for reasons we do not fully understand.",
       "zh": "我们发现，在音频数据上做 MoE 均衡比在文本数据上难得多，原因我们并未完全理解。"
      },
      {
       "id": "s-IV-A-7-6",
       "original": "We speculate that this could be due to the intrinsic diﬀiculty and noisiness of delayed DAC tokens, the unique challenge of aligning high frame rate audio with low frame rate text tokens, or other statistical properties of audio data.",
       "zh": "我们推测，这可能源于延迟 DAC token 本身的困难与噪声、高帧率音频与低帧率文本 token 对齐的独特挑战，或音频数据的其他统计特性。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-IV-B",
   "num": "B",
   "level": 2,
   "page": 7,
   "title": {
    "original": "Mid-training",
    "zh": "中间训练"
   },
   "blocks": [
    {
     "id": "p-IV-B-1",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-IV-B-1-1",
       "original": "This stage was largely the same as pre-training except that inter-ASR system transcript agreement was increased compared to pre-training.",
       "zh": "该阶段与预训练大致相同，只是 ASR 系统间的转写一致性要求比预训练更高。"
      },
      {
       "id": "s-IV-B-1-2",
       "original": "Mid-training was run for 15,000 optimizer steps or approximately 560B tokens.",
       "zh": "中间训练运行了 15,000 个优化器步，约 560B token。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-IV-C",
   "num": "C",
   "level": 2,
   "page": 7,
   "title": {
    "original": "Conditioning Fine-Tuning",
    "zh": "条件化微调"
   },
   "blocks": [
    {
     "id": "p-IV-C-1",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-IV-C-1-1",
       "original": "After pre-training and mid-training, the model was adapted in two shorter annealing stages of 10,000 steps each.",
       "zh": "预训练与中间训练之后，模型再经两个较短的退火阶段适配，每个阶段 10,000 步。"
      },
      {
       "id": "s-IV-C-1-2",
       "original": "Both stages introduced the non-text conditioning mechanisms used at inference, removed datasets with undesirable characteristics, and increased inter-transcript agreement relative to mid-training.",
       "zh": "两个阶段都引入了推理时使用的非文本条件化机制，剔除了具有不良特性的数据集，并相对中间训练提高了转写间一致性要求。"
      },
      {
       "id": "s-IV-C-1-3",
       "original": "During training, the post-LDA speaker embedding ˆex for each utterance was passed through a learned projection and inserted before the text sequence.",
       "zh": "训练中，每条语句的 LDA 后说话人嵌入 êx 经过一个学习投影，插入到文本序列之前。"
      },
      {
       "id": "s-IV-C-1-4",
       "original": "Because this embedding is highbandwidth and carries information about the target audio, it can overwrite the same properties that the quality and speaking-rate conditioning are meant to control.",
       "zh": "由于该嵌入是高带宽的、携带目标音频的信息，它可能覆盖质量与语速条件化本要控制的同一批属性。"
      },
      {
       "id": "s-IV-C-1-5",
       "original": "The association between the embedding and these properties must be broken to ensure low-bandwidth conditioning is not overridden by the higher-bandwidth embedding.",
       "zh": "必须打破嵌入与这些属性之间的关联，才能确保低带宽条件化不被更高带宽的嵌入所覆盖。"
      }
     ]
    },
    {
     "id": "p-IV-C-2",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-IV-C-2-1",
       "original": "This decorrelation was achieved by augmenting the source audio before the embedding was computed.",
       "zh": "这种去相关通过在计算嵌入之前对源音频做增强来实现。"
      },
      {
       "id": "s-IV-C-2-2",
       "original": "The augmentations include environmental noise or music, frequency filters, audio compression artifacts, and reverberation.",
       "zh": "增强包括环境噪声或音乐、频率滤波、音频压缩失真与混响。"
      },
      {
       "id": "s-IV-C-2-3",
       "original": "These were applied with a fixed probability αAUG.",
       "zh": "它们以固定概率 αAUG 施加。"
      },
      {
       "id": "s-IV-C-2-4",
       "original": "To extend the training horizon of the speaker cloning stage we embedded a random crop of the target audio during the first annealing stage and masked the loss over the tokens in this crop.",
       "zh": "为延长声音克隆阶段的训练时程，第一个退火阶段只对目标音频的一个随机裁剪段计算嵌入，并对该裁剪段内的 token 掩码损失。"
      },
      {
       "id": "s-IV-C-2-5",
       "original": "This reduces the incentive for the model to ‘cheat’ using the shortcut, since it removes the loss on the specific segment of the audio the speaker embedding is computed on.",
       "zh": "由于去掉了对计算说话人嵌入所依据的那段音频的损失，这降低了模型利用捷径「作弊」的动机。"
      }
     ]
    },
    {
     "id": "p-IV-C-3",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-IV-C-3-1",
       "original": "Quality conditioning is also introduced in the first annealing stage.",
       "zh": "质量条件化同样在第一个退火阶段引入。"
      },
      {
       "id": "s-IV-C-3-2",
       "original": "Acoustic properties of the training audio, such as estimated SNR, loudness, and signal bandwidth, are encoded as tokens using the same bucketing scheme as the speech rate.",
       "zh": "训练音频的声学属性——如估计 SNR、响度与信号带宽——用与语速相同的分桶方案编码为 token。"
      },
      {
       "id": "s-IV-C-3-3",
       "original": "The speaking-rate and quality tokens are independently dropped with probabilities 0.4 and 0.25, respectively, so that the model learns both conditional and unconditional generation.",
       "zh": "语速与质量 token 分别以 0.4 和 0.25 的概率被独立丢弃，使模型同时学会条件生成与无条件生成。"
      }
     ]
    },
    {
     "id": "p-IV-C-4",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-IV-C-4-1",
       "original": "In the second annealing stage, the speaker embedding is computed from the entire target sequence rather than from a cropped portion of it.",
       "zh": "在第二个退火阶段，说话人嵌入从整个目标序列、而非从裁剪段计算。"
      },
      {
       "id": "s-IV-C-4-2",
       "original": "This ties the entire generated clip to the conditioning speaker and prevents the model from producing other speakers in the output.",
       "zh": "这把整段生成音频与条件说话人绑定在一起，防止模型在输出中产生其他说话人。"
      },
      {
       "id": "s-IV-C-4-3",
       "original": "Because the embedding now spans the full clip, the loss masking described above is removed, as applying it would mask the entire clip and leave no frames to train on.",
       "zh": "由于此时嵌入覆盖整段音频，前述损失掩码被移除——若继续施加，会掩掉整段音频而不剩可训练的帧。"
      },
      {
       "id": "s-IV-C-4-4",
       "original": "Finally, a ‘Quality Mode’ token is added when training on the highest-quality subset of the training data.",
       "zh": "最后，在训练数据的最高质量子集上训练时，会添加一个「质量模式」（Quality Mode）token。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-V",
   "num": "V",
   "level": 1,
   "page": 7,
   "title": {
    "original": "ZTTS1-Eval",
    "zh": "ZTTS1-Eval"
   },
   "blocks": [
    {
     "id": "p-V-1",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-V-1-1",
       "original": "Alongside the ZONOS2 model, we propose a new evaluation dataset and pipeline for expressive, voice-cloningenabled TTS systems, ZTTS1-Eval.",
       "zh": "随 ZONOS2 模型一道，我们提出了一个新的评测数据集与管线 ZTTS1-Eval，面向具表现力的、支持声音克隆的 TTS 系统。"
      }
     ]
    },
    {
     "id": "p-V-2",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-V-2-1",
       "original": "The design of ZTTS1-Eval is based on the widely used Seed-TTS-Eval (Anastassiou, Chen, & Chen et al., 2024).",
       "zh": "ZTTS1-Eval 的设计以广泛使用的 Seed-TTS-Eval（Anastassiou, Chen, & Chen et al., 2024）为基础。"
      },
      {
       "id": "s-V-2-2",
       "original": "We observe that Seed-TTS-Eval has three primary issues.",
       "zh": "我们观察到 Seed-TTS-Eval 有三个主要问题。"
      },
      {
       "id": "s-V-2-3",
       "original": "First, it consists of only Chinese and English speech, limiting its usefulness for the assessment of multilingual systems.",
       "zh": "第一，它只含中文和英语语音，限制了它评估多语种系统的用途。"
      },
      {
       "id": "s-V-2-4",
       "original": "Second, it relies on outdated models to compute its assessment metrics such as Whisper Large (Radford, Kim, & Xu et al., 2022) and Paraformer (Gao, Zhang, & McLoughlin et al., 2023) for WER accuracy and WavLM (Chen, Wang, & Chen et al., 2022) for speaker similarity.",
       "zh": "第二，它依赖过时的模型来计算评测指标，例如用 Whisper Large（Radford, Kim, & Xu et al., 2022）与 Paraformer（Gao, Zhang, & McLoughlin et al., 2023）测 WER 准确度，用 WavLM（Chen, Wang, & Chen et al., 2022）测说话人相似度。"
      },
      {
       "id": "s-V-2-5",
       "original": "Third, audio is sourced from Common Voice (Ardila, Branson, & Davis et al., 2020) for English (a) Clean set.",
       "zh": "第三，英语音频来自 Common Voice（Ardila, Branson, & Davis et al., 2020）(a) 干净集。"
      },
      {
       "id": "s-V-2-6",
       "original": "(b) ITW set.",
       "zh": "(b) ITW 集。"
      }
     ]
    },
    {
     "id": "fig-V-1",
     "type": "figure_caption",
     "page": 8,
     "original": "Fig. 5: Mean Text-to-Speech Distribution Score 2 (TTSDS2) prosody for the English portions of both ZTTS1-Eval sets.",
     "zh": "图 5：ZTTS1-Eval 两个集合英文部分的平均 Text-to-Speech Distribution Score 2（TTSDS2）韵律。"
    },
    {
     "id": "p-V-3",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-V-3-1",
       "original": "and DiDiSpeech (Guo, Wen, & Jiang et al., 2021) for Chinese, both of which consist of read speech with varied recording environments which are generally not representative of the use-case of modern TTS systems.",
       "zh": "中文音频来自 DiDiSpeech（Guo, Wen, & Jiang et al., 2021），两者都由朗读语音构成，录音环境各异，总体上不能代表现代 TTS 系统的使用场景。"
      }
     ]
    },
    {
     "id": "p-V-4",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-V-4-1",
       "original": "Two subsequent benchmarks each extend Seed-TTS- Eval along a single axis.",
       "zh": "后来的两个基准各自沿单一轴扩展了 Seed-TTS-Eval。"
      },
      {
       "id": "s-V-4-2",
       "original": "CV3-Eval (Du, Gao, & Wang et al., 2025), released with CosyVoice 3, broadens coverage to nine languages and adds task variety, with objective subsets for multilingual, cross-lingual, and emotion cloning and subjective subsets for expressive and accented speech.",
       "zh": "随 CosyVoice 3 发布的 CV3-Eval（Du, Gao, & Wang et al., 2025）把覆盖拓宽到 9 种语言并增加了任务多样性——包括多语种、跨语言与情感克隆的客观子集，以及富有表现力与带口音语音的主观子集。"
      },
      {
       "id": "s-V-4-3",
       "original": "It nonetheless retains the Seed-TTS-Eval scoring stack (Whisper-Large and Paraformer for content, ERes2Net for speaker similarity, DNSMOS for quality) and consists of largely prepared speech.",
       "zh": "但它仍沿用 Seed-TTS-Eval 的评分栈（内容用 Whisper Large 与 Paraformer、说话人相似度用 ERes2Net、质量用 DNSMOS），且大体由有准备的朗读语音构成。"
      },
      {
       "id": "s-V-4-4",
       "original": "The MiniMax multilingual test set (MiniMax et al., 2025) extends language coverage furthest, to 24 languages, but provides only two read Common Voice reference prompts per language and defers scoring to the Seed-TTS-Eval protocol, reporting WER and speaker similarity alone.",
       "zh": "MiniMax 多语种测试集（MiniMax et al., 2025）把语言覆盖扩得最远，达 24 种语言，但每种语言只提供 2 条 Common Voice 朗读参考提示，评分沿用 Seed-TTS-Eval 协议，只报告 WER 与说话人相似度。"
      },
      {
       "id": "s-V-4-5",
       "original": "Neither benchmark updates the scoring models, includes spontaneous in-the-wild speech, or quantifies prosodic distribution or generation diversity.",
       "zh": "这两个基准都没有更新评分模型、没有包含野外自发语音，也没有量化韵律分布或生成多样性。"
      }
     ]
    },
    {
     "id": "p-V-5",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-V-5-1",
       "original": "ZTTS1-Eval is built to close each of these gaps.",
       "zh": "ZTTS1-Eval 旨在逐一补上这些缺口。"
      },
      {
       "id": "s-V-5-2",
       "original": "We extend coverage from the two languages of Seed-TTS-Eval to as many as 17, pairing a clean read-speech set of 9 languages with a spontaneous in-the-wild set of 17 so that both prepared and conversational speech are represented.",
       "zh": "我们把覆盖从 Seed-TTS-Eval 的 2 种语言扩展到多达 17 种：一个 9 种语言的干净朗读语音集，搭配一个 17 种语言的野外自发语音集，使有准备的语音与对话式语音都被代表。"
      },
      {
       "id": "s-V-5-3",
       "original": "We replace the dated scoring stack end to end, scoring content with Qwen3-ASR, speaker similarity with ReD- imNet, and quality with MSR-UTMOS.",
       "zh": "我们端到端地替换了过时的评分栈：内容用 Qwen3-ASR、说话人相似度用 ReDimNet、质量用 MSR-UTMOS 打分。"
      },
      {
       "id": "s-V-5-4",
       "original": "Finally, we add a prosodic-distribution and generation-diversity dimension that prior benchmarks lack, measured with TTSDS2 and DS-WED.",
       "zh": "最后，我们增加了先前基准所缺的韵律分布与生成多样性维度，分别以 TTSDS2 与 DS-WED 度量。"
      },
      {
       "id": "s-V-5-5",
       "original": "Table II sets ZTTS1-Eval against Seed-TTS- Eval, CV3-Eval, and MiniMax-ML.",
       "zh": "表 II 将 ZTTS1-Eval 与 Seed-TTS-Eval、CV3-Eval 和 MiniMax-ML 对照。"
      }
     ]
    },
    {
     "id": "p-V-6",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-V-6-1",
       "original": "The ZTTS1-Eval ‘Clean’ set totals 13 hours, comprising 500 utterances drawn from FLEURS-R (Ma, Koizumi, & Karita et al., 2024) for each of 9 languages: English, Chinese, German, Spanish, French, Italian, Japanese, Korean, and Russian.",
       "zh": "ZTTS1-Eval 的「干净」（Clean）集共 13 小时，由 9 种语言（英语、中文、德语、西班牙语、法语、意大利语、日语、韩语、俄语）各取 500 条 FLEURS-R（Ma, Koizumi, & Karita et al., 2024）语句组成。"
      },
      {
       "id": "s-V-6-2",
       "original": "The text in this set is structured ‘read-aloud’ prepared speech; ‘hard’ portions are also provided for particularly complex English and Chinese utterances.",
       "zh": "该集文本是结构化的「朗读式」有准备语音；对特别复杂的英语与中文语句还提供了「困难」（hard）部分。"
      },
      {
       "id": "s-V-6-3",
       "original": "The ‘in-the-wild’ (ITW) set comprises 1,618 utterances from VoxBlink2 (Lin, Cheng, & Zhang et al., 2024) totaling roughly 3 hours across 17 languages; see Table VI for a full breakdown.",
       "zh": "「野外」（in-the-wild，ITW）集包含来自 VoxBlink2（Lin, Cheng, & Zhang et al., 2024）的 1,618 条语句，覆盖 17 种语言，共约 3 小时；完整拆分见表 VI。"
      },
      {
       "id": "s-V-6-4",
       "original": "The content in the ITW set is conversational and natural, representing ‘spontaneous’ speech.",
       "zh": "ITW 集的内容是对话式、自然的，代表自发语音。"
      }
     ]
    },
    {
     "id": "p-V-7",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-V-7-1",
       "original": "ASR for WER calculation is performed by the multilingual Qwen3-ASR (Shi, Wang, & Guo et al., 2026) system.",
       "zh": "WER 计算所用的 ASR 由多语种的 Qwen3-ASR（Shi, Wang, & Guo et al., 2026）系统完成。"
      },
      {
       "id": "s-V-7-2",
       "original": "We compute quality scores for the audio samples using MSR-UTokyo-SaruLab Mean Opinion Score (UTMOS) (Nishikawa, Nakata, & Saito et al., 2025).",
       "zh": "我们用 MSR-UTokyo-SaruLab 平均意见分（UTMOS）（Nishikawa, Nakata, & Saito et al., 2025）计算音频样本的质量分数。"
      },
      {
       "id": "s-V-7-3",
       "original": "Speaker similarity between the source clone audio and the generated audio is computed using ReDimNet (Yakovlev, Makarov, & Balykin et al., 2024).",
       "zh": "源克隆音频与生成音频之间的说话人相似度用 ReDimNet（Yakovlev, Makarov, & Balykin et al., 2024）计算。"
      },
      {
       "id": "s-V-7-4",
       "original": "DS-WED (Yang, Han, & Wang et al., 2026) is used to assess prosodic variation between pairs of generations from the same source clone audio, and TTSDS2-Prosody (Minixhofer, Klejch & Bell, 2025) is used to assess general prosody.",
       "zh": "DS-WED（Yang, Han, & Wang et al., 2026）用于评估同一源克隆音频生成的成对样本之间的韵律变化，TTSDS2-Prosody（Minixhofer, Klejch & Bell, 2025）用于评估总体韵律。"
      }
     ]
    },
    {
     "id": "p-V-8",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-V-8-1",
       "original": "Note that ZONOS2 is deliberately not trained on any of the audio in ZTTS1-Eval.",
       "zh": "需要说明的是，ZONOS2 刻意不在 ZTTS1-Eval 的任何音频上训练。"
      },
      {
       "id": "s-V-8-2",
       "original": "We cannot speak to whether any of the comparable models without public training sets are trained on data used by ZTTS1-Eval.",
       "zh": "对那些训练集未公开的可比模型是否在 ZTTS1-Eval 所用数据上训练过，我们无法置评。"
      },
      {
       "id": "s-V-8-3",
       "original": "ZTTS1-Eval is available on GitHub§.",
       "zh": "ZTTS1-Eval 已在 GitHub 上公开。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-VI",
   "num": "VI",
   "level": 1,
   "page": 8,
   "title": {
    "original": "Results",
    "zh": "实验结果"
   },
   "blocks": [
    {
     "id": "p-VI-1",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-VI-1-1",
       "original": "Tables III and IV show results for the ZTTS1-Eval sets for ZONOS2 as well as a number of open-source and closed-source baselines.",
       "zh": "表 III 与表 IV 给出 ZONOS2 以及若干开源与闭源基线在 ZTTS1-Eval 各集合上的结果。"
      },
      {
       "id": "s-VI-1-2",
       "original": "Results are presented for ZONOS2 with and without the ‘Quality Mode’ token set.",
       "zh": "ZONOS2 的结果分别给出设置与不设置「质量模式」（Quality Mode）token 两种情形。"
      },
      {
       "id": "s-VI-1-3",
       "original": "For both sets, the ‘Ground Truth’ row shows the performance of the ASR system on the clone target audio; for the ITW set, speaker similarity represents the similarity between two utterances from the same speaker.",
       "zh": "两个集合中，「Ground Truth」行展示 ASR 系统在克隆目标音频上的表现；对 ITW 集，说话人相似度指同一说话人两条语句之间的相似度。"
      }
     ]
    },
    {
     "id": "p-VI-2",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-VI-2-1",
       "original": "On the Clean subset, shown in Table III, ZONOS2 shows competitive performance in terms of cloning accuracy §https://github.com/Zyphra/ZTTS1-Eval Model Metric en hard_en zh hard_zh de es fr it ja ko ru Reference Ground truth WER ↓",
       "zh": "在 Clean 子集上（表 III），ZONOS2 在克隆准确率上具有竞争力（脚注 §：https://github.com/Zyphra/ZTTS1-Eval）。（表头：Model / Metric × en / hard_en / zh / hard_zh / de / es / fr / it / ja / ko / ru——Reference / Ground truth；WER ↓。）"
      }
     ]
    },
    {
     "id": "eq-VI-1",
     "type": "equation",
     "page": 8,
     "original": "3.53 1.04 2.83 1.28 4.68 3.23 3.03 5.09 4.06 2.88 6.12"
    },
    {
     "id": "eq-VI-2",
     "type": "equation",
     "page": 8,
     "original": "UTMOS ↑"
    },
    {
     "id": "eq-VI-3",
     "type": "equation",
     "page": 8,
     "original": "3.66 2.73 3.26 2.63 3.33 3.20 3.47 3.07 3.47 3.29 3.30"
    },
    {
     "id": "eq-VI-4",
     "type": "equation",
     "page": 8,
     "original": "Spk. sim. ↑"
    },
    {
     "id": "eq-VI-5",
     "type": "equation",
     "page": 8,
     "original": "– – – – – – – – – – –"
    },
    {
     "id": "eq-VI-6",
     "type": "equation",
     "page": 8,
     "original": "Open-source models ZONOS2 8B WER ↓"
    },
    {
     "id": "eq-VI-7",
     "type": "equation",
     "page": 8,
     "original": "2.76 15.04 15.62 26.23 5.67 4.78 13.18 6.53 8.27 18.96 8.26"
    },
    {
     "id": "eq-VI-8",
     "type": "equation",
     "page": 8,
     "original": "UTMOS ↑"
    },
    {
     "id": "eq-VI-9",
     "type": "equation",
     "page": 8,
     "original": "3.40 2.57 3.10 2.29 3.23 2.96 3.27 2.89 3.23 3.13 2.97"
    },
    {
     "id": "eq-VI-10",
     "type": "equation",
     "page": 8,
     "original": "Spk. sim. ↑"
    },
    {
     "id": "eq-VI-11",
     "type": "equation",
     "page": 8,
     "original": "78.6 62.1 73.3 74.6 78.3 79.4 70.0 77.7 81.3 73.3 80.2"
    },
    {
     "id": "eq-VI-12",
     "type": "equation",
     "page": 8,
     "original": "ZONOS2 8B Quality Mode WER ↓"
    },
    {
     "id": "eq-VI-13",
     "type": "equation",
     "page": 8,
     "original": "3.99 2.68 6.73 14.41 3.74 3.25 4.30 3.52 7.67 4.14 6.99"
    },
    {
     "id": "eq-VI-14",
     "type": "equation",
     "page": 8,
     "original": "UTMOS ↑"
    },
    {
     "id": "eq-VI-15",
     "type": "equation",
     "page": 8,
     "original": "3.47 2.94 3.21 2.65 3.36 2.94 3.31 2.92 3.31 3.18 3.02"
    },
    {
     "id": "eq-VI-16",
     "type": "equation",
     "page": 8,
     "original": "Spk. sim. ↑"
    },
    {
     "id": "eq-VI-17",
     "type": "equation",
     "page": 8,
     "original": "74.4 58.2 81.1 73.4 76.2 79.0 75.9 78.0 82.0 83.0 79.4"
    },
    {
     "id": "eq-VI-18",
     "type": "equation",
     "page": 8,
     "original": "WER ↓"
    },
    {
     "id": "eq-VI-19",
     "type": "equation",
     "page": 8,
     "original": "1.94 1.26 2.91 6.04 2.78 1.98 3.08 2.19 3.78 2.85 4.25"
    },
    {
     "id": "eq-VI-20",
     "type": "equation",
     "page": 8,
     "original": "UTMOS ↑"
    },
    {
     "id": "eq-VI-21",
     "type": "equation",
     "page": 8,
     "original": "3.86 3.33 3.71 3.16 3.72 3.43 3.64 3.38 3.71 3.53 3.49"
    },
    {
     "id": "eq-VI-22",
     "type": "equation",
     "page": 8,
     "original": "Spk. sim. ↑"
    },
    {
     "id": "eq-VI-23",
     "type": "equation",
     "page": 8,
     "original": "68.3 60.2 79.7 75.8 69.7 69.2 72.0 75.2 81.0 79.3 74.1"
    },
    {
     "id": "p-VI-3",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-VI-3-1",
       "original": "Qwen 3 TTS 1.7B (Hu, Zhu, & He et al., 2026) WER ↓",
       "zh": "（表格行）Qwen 3 TTS 1.7B (Hu, Zhu, & He et al., 2026)；指标 WER ↓。"
      }
     ]
    },
    {
     "id": "eq-VI-24",
     "type": "equation",
     "page": 8,
     "original": "3.60 5.00 4.33 7.95 3.04 3.73 5.90 4.17 4.20 3.92 7.74"
    },
    {
     "id": "eq-VI-25",
     "type": "equation",
     "page": 8,
     "original": "UTMOS ↑"
    },
    {
     "id": "eq-VI-26",
     "type": "equation",
     "page": 8,
     "original": "3.47 3.06 3.23 3.00 3.26 3.01 3.22 3.02 3.37 3.18 3.09"
    },
    {
     "id": "eq-VI-27",
     "type": "equation",
     "page": 8,
     "original": "Spk. sim. ↑"
    },
    {
     "id": "eq-VI-28",
     "type": "equation",
     "page": 8,
     "original": "76.9 64.7 82.9 76.0 78.5 82.8 78.0 79.3 85.4 83.9 80.6"
    },
    {
     "id": "p-VI-4",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-VI-4-1",
       "original": "Fish S2 Pro (Liao, Wang, & Liu et al., 2026) WER ↓",
       "zh": "（表格行）Fish S2 Pro (Liao, Wang, & Liu et al., 2026)；指标 WER ↓。"
      }
     ]
    },
    {
     "id": "eq-VI-29",
     "type": "equation",
     "page": 8,
     "original": "4.23 0.94 5.01 5.21 4.84 4.44 5.10 5.80 4.92 3.99 7.43"
    },
    {
     "id": "eq-VI-30",
     "type": "equation",
     "page": 8,
     "original": "UTMOS ↑"
    },
    {
     "id": "eq-VI-31",
     "type": "equation",
     "page": 8,
     "original": "3.51 2.82 3.12 2.55 3.07 2.85 3.25 2.71 3.23 3.04 2.83"
    },
    {
     "id": "eq-VI-32",
     "type": "equation",
     "page": 8,
     "original": "Spk. sim. ↑"
    },
    {
     "id": "eq-VI-33",
     "type": "equation",
     "page": 8,
     "original": "65.2 66.8 77.3 77.5 79.7 75.4 75.8 80.8 83.3 83.1 80.4"
    },
    {
     "id": "p-VI-5",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-VI-5-1",
       "original": "VoxCPM 2 (Zhou, Zeng, & Liu et al., 2026) Closed-source models WER ↓",
       "zh": "（表格行）VoxCPM 2 (Zhou, Zeng, & Liu et al., 2026)；闭源模型（Closed-source models）；指标 WER ↓。"
      }
     ]
    },
    {
     "id": "eq-VI-34",
     "type": "equation",
     "page": 8,
     "original": "2.56 0.86 4.53 7.66 3.14 3.21 3.41 3.05 3.65 3.24 6.01"
    },
    {
     "id": "eq-VI-35",
     "type": "equation",
     "page": 8,
     "original": "UTMOS ↑"
    },
    {
     "id": "eq-VI-36",
     "type": "equation",
     "page": 8,
     "original": "3.62 3.19 3.17 3.01 3.18 2.97 3.29 2.90 3.36 3.11 3.05"
    },
    {
     "id": "eq-VI-37",
     "type": "equation",
     "page": 8,
     "original": "Spk. sim. ↑"
    },
    {
     "id": "eq-VI-38",
     "type": "equation",
     "page": 8,
     "original": "79.9 67.1 85.4 80.0 82.8 85.9 83.1 83.4 87.5 86.4 84.2"
    },
    {
     "id": "eq-VI-39",
     "type": "equation",
     "page": 8,
     "original": "Cartesia Sonic 3.5 (Cartesia, 2026) WER ↓"
    },
    {
     "id": "eq-VI-40",
     "type": "equation",
     "page": 8,
     "original": "2.35 0.75 4.20 8.31 3.79 3.24 3.62 2.70 4.26 4.57 5.63"
    },
    {
     "id": "eq-VI-41",
     "type": "equation",
     "page": 8,
     "original": "UTMOS ↑"
    },
    {
     "id": "eq-VI-42",
     "type": "equation",
     "page": 8,
     "original": "3.59 3.53 3.31 3.37 3.54 3.25 3.29 3.19 3.45 3.36 3.15"
    },
    {
     "id": "eq-VI-43",
     "type": "equation",
     "page": 8,
     "original": "Spk. sim.* ↑"
    },
    {
     "id": "eq-VI-44",
     "type": "equation",
     "page": 8,
     "original": "7.2 6.8 36.9 29.4 17.1 18.0 21.9 21.9 36.3 38.6 25.4"
    },
    {
     "id": "eq-VI-45",
     "type": "equation",
     "page": 8,
     "original": "Eleven Labs V3 (ElevenLabs, 2026) WER ↓"
    },
    {
     "id": "eq-VI-46",
     "type": "equation",
     "page": 8,
     "original": "2.50 0.80 4.09 5.63 3.61 4.41 4.77 3.24 3.79 3.06 6.58"
    },
    {
     "id": "eq-VI-47",
     "type": "equation",
     "page": 8,
     "original": "UTMOS ↑"
    },
    {
     "id": "eq-VI-48",
     "type": "equation",
     "page": 8,
     "original": "3.87 3.79 3.54 3.37 3.71 3.43 3.52 3.39 3.65 3.51 3.37"
    },
    {
     "id": "eq-VI-49",
     "type": "equation",
     "page": 8,
     "original": "Spk. sim.* ↑"
    },
    {
     "id": "eq-VI-50",
     "type": "equation",
     "page": 8,
     "original": "12.7 9.8 36.6 28.6 17.7 19.5 20.9 20.4 33.6 36.2 23.5"
    },
    {
     "id": "eq-VI-51",
     "type": "equation",
     "page": 8,
     "original": "Gemini 3.1 Flash (Google DeepMind, 2026) WER ↓"
    },
    {
     "id": "eq-VI-52",
     "type": "equation",
     "page": 8,
     "original": "3.14 1.96 4.04 7.86 4.05 4.38 4.95 3.98 5.63 3.13 7.08"
    },
    {
     "id": "eq-VI-53",
     "type": "equation",
     "page": 8,
     "original": "UTMOS ↑"
    },
    {
     "id": "eq-VI-54",
     "type": "equation",
     "page": 8,
     "original": "3.53 3.15 3.14 2.94 3.27 3.05 3.33 2.95 3.27 3.11 3.01"
    },
    {
     "id": "eq-VI-55",
     "type": "equation",
     "page": 8,
     "original": "Spk. sim. ↑"
    },
    {
     "id": "eq-VI-56",
     "type": "equation",
     "page": 8,
     "original": "65.8 54.8 74.8 67.1 68.4 73.0 68.5 70.4 77.7 78.3 69.8"
    },
    {
     "id": "p-VI-6",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-VI-6-1",
       "original": "Inworld TTS 2 (Inworld AI, 2026) TABLE III: ZTTS1-Eval Clean zero-shot results across WER, MSR-UTMOS and speaker similarity, segmented by open-source and closed-source models.",
       "zh": "（表格行）Inworld TTS 2 (Inworld AI, 2026)。表 III：ZTTS1-Eval Clean 零样本结果，按开源/闭源模型分段的 WER、MSR-UTMOS 与说话人相似度。"
      },
      {
       "id": "s-VI-6-2",
       "original": "Best result per language and metric is shown in bold; second-best is underlined.",
       "zh": "每种语言、每项指标的最优结果加粗显示，次优加下划线。"
      },
      {
       "id": "s-VI-6-3",
       "original": "Ground-truth reference results are shown for context and excluded from the ranking. * denotes models which do not support zero-shot voice cloning. as measured by speaker similarity, achieving the best open-source and the second best overall speaker similarity for English (en).",
       "zh": "真实参考结果仅供对照、不参与排名。"
      },
      {
       "id": "s-VI-6-4",
       "original": "The gain in intelligibility here, as measured by WER via use of the ‘Quality Mode’ token, is somewhat uneven.",
       "zh": "以「Quality Mode」token 测得的可懂度（WER）增益在不同语种间并不均匀。"
      },
      {
       "id": "s-VI-6-5",
       "original": "We observe degraded WER scores for English but improvements for all other languages.",
       "zh": "我们"
      },
      {
       "id": "s-VI-6-6",
       "original": "Quality Mode drastically improves intelligibility for some languages such as Mandarin (zh) from 15.62% to 6.73%, while also improving speaker similarity.",
       "zh": "Quality Mode 大幅提升了部分语言的可懂度，例如普通话（zh）从 15.62% 降至 6.73%，同时还提升了说话人相似度。"
      },
      {
       "id": "s-VI-6-7",
       "original": "Quality Mode also improves the acoustic quality of the generated audio as measured by UTMOS.",
       "zh": "Quality Mode 也提升了以 UTMOS 衡量的生成音频声学质量。"
      }
     ]
    },
    {
     "id": "p-VI-7",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-VI-7-1",
       "original": "On the ITW subset, shown in Table IV, ZONOS2 performs well in terms of WER and speaker similarity; here the positive effect of Quality Mode is most apparent, where it shows improved WER and UTMOS across all languages versus the base setting.",
       "zh": "在表 IV 所示的 ITW 子集上，ZONOS2 在 WER 与说话人相似度上表现良好；质量模式的正面效果在这里最为明显——相对基础设置，它在所有语言上都改善了 WER 与 UTMOS。"
      },
      {
       "id": "s-VI-7-2",
       "original": "The use of Quality Mode has a negative effect on speaker similarity but raises intelligibility and quality metrics.",
       "zh": "使用质量模式对说话人相似度有负面影响，但提升了可懂度与质量指标。"
      }
     ]
    },
    {
     "id": "p-VI-8",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-VI-8-1",
       "original": "Figures 5a and 5b show the mean TTSDS2 prosody for the English portions of the Clean and ITW eval sets, respectively.",
       "zh": "图 5a 与图 5b 分别给出干净集与 ITW 集英文部分的平均 TTSDS2 韵律。"
      },
      {
       "id": "s-VI-8-2",
       "original": "On the ITW set, ZONOS2 is the best performing model for this metric.",
       "zh": "在 ITW 集上，ZONOS2 是该指标上表现最好的模型。"
      },
      {
       "id": "s-VI-8-3",
       "original": "The performance of ZONOS2 on the Clean set is weaker, but remains competitive with the top performing models.",
       "zh": "ZONOS2 在干净集上的表现较弱，但仍与头部模型具有竞争力。"
      },
      {
       "id": "s-VI-8-4",
       "original": "These results demonstrate the ability of ZONOS2 to retain prosody information as well as identity from the source clone audio.",
       "zh": "这些结果表明 ZONOS2 能够从源克隆音频中同时保留韵律信息与身份信息。"
      },
      {
       "id": "s-VI-8-5",
       "original": "Figure 6 further illustrates this, depicting the DS-WED scores for the English subsets of ZTTS1-Eval.",
       "zh": "图 6 进一步说明了这一点，展示了 ZTTS1-Eval 英文子集的 DS-WED 分数。"
      },
      {
       "id": "s-VI-8-6",
       "original": "ZONOS2 demonstrates significantly higher prosodic variation in its generations relative to all other models across both eval sets.",
       "zh": "在两个评测集上，ZONOS2 生成结果的韵律多样性都显著高于所有其他模型。"
      },
      {
       "id": "s-VI-8-7",
       "original": "Figure 7 shows the distribution of the prosodic content relative to the source audio measured as Allosaurus (Li, Dalmia, & Li et al., 2020) SR distance; ZONOS2 has a clear advantage here, showing a much closer distribution to that of the source.",
       "zh": "图 7 展示了以 Allosaurus（Li, Dalmia, & Li et al., 2020）SR 距离衡量的、相对源音频的韵律内容分布；ZONOS2 在这里优势明显，其分布与源音频接近得多。"
      },
      {
       "id": "s-VI-8-8",
       "original": "See Table VII for ZONOS2 performance on the CosyVoice 3 and Seed-TTS evaluation sets.",
       "zh": "ZONOS2 在 CosyVoice 3 与 Seed-TTS 评测集上的表现见表 VII。"
      }
     ]
    },
    {
     "id": "p-VI-9",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-VI-9-1",
       "original": "Model Metric en zh ar de es fr hi id it ja ko pl pt ru th tl tr Reference Ground truth WER ↓",
       "zh": "表头：Model × Metric × en/zh/ar/de/es/fr/hi/id/it/ja/ko/pl/pt/ru/th/tl/tr 各语种——参考行 Ground truth，指标 WER↓。"
      }
     ]
    },
    {
     "id": "eq-VI-57",
     "type": "equation",
     "page": 10,
     "original": "21.05 6.77 7.34 8.08 14.20 17.23 6.94 9.18 8.86 14.10 7.56 12.38 86.41"
    },
    {
     "id": "eq-VI-58",
     "type": "equation",
     "page": 10,
     "original": "UTMOS ↑"
    },
    {
     "id": "eq-VI-59",
     "type": "equation",
     "page": 10,
     "original": "2.22 2.52 2.22 2.27 2.22 2.23 2.40 2.24 2.27"
    },
    {
     "id": "eq-VI-60",
     "type": "equation",
     "page": 10,
     "original": "Spk. sim. ↑"
    },
    {
     "id": "eq-VI-61",
     "type": "equation",
     "page": 10,
     "original": "75.9 82.1 81.0 78.5 78.0 77.6 78.7 80.0 78.7 82.3 79.7 82.5 79.5 79.2 82.5 78.9 80.8"
    },
    {
     "id": "eq-VI-62",
     "type": "equation",
     "page": 10,
     "original": "Open-source models ZONOS2 8B WER ↓"
    },
    {
     "id": "eq-VI-63",
     "type": "equation",
     "page": 10,
     "original": "4.70 3.19 21.43 5.84 5.38 4.56 15.50 11.84 5.61 10.18 7.45 10.16 6.73 7.80 12.87 23.49 10.46"
    },
    {
     "id": "eq-VI-64",
     "type": "equation",
     "page": 10,
     "original": "UTMOS ↑"
    },
    {
     "id": "eq-VI-65",
     "type": "equation",
     "page": 10,
     "original": "2.44 2.43 2.22 2.52 2.42 2.37 2.47 2.25 2.32 2.34 2.55 2.48 2.33 2.30 2.43 2.52 2.41"
    },
    {
     "id": "eq-VI-66",
     "type": "equation",
     "page": 10,
     "original": "Spk. sim. ↑"
    },
    {
     "id": "eq-VI-67",
     "type": "equation",
     "page": 10,
     "original": "67.0 74.3 67.4 69.4 69.4 67.7 66.3 71.9 69.2 70.9 72.1 72.9 70.4 70.9 68.4 68.5 72.1"
    },
    {
     "id": "eq-VI-68",
     "type": "equation",
     "page": 10,
     "original": "ZONOS2 8B Quality Mode WER ↓"
    },
    {
     "id": "eq-VI-69",
     "type": "equation",
     "page": 10,
     "original": "2.21 2.77 13.94 3.37 2.10 2.79 9.04 6.48 2.51 8.70 4.59 5.85 2.94 4.32 5.93 16.05 7.47"
    },
    {
     "id": "eq-VI-70",
     "type": "equation",
     "page": 10,
     "original": "UTMOS ↑"
    },
    {
     "id": "eq-VI-71",
     "type": "equation",
     "page": 10,
     "original": "2.99 2.68 2.51 2.92 2.72 2.74 2.73 2.66 2.63 2.69 2.78 2.76 2.75 2.62 2.74 2.88 2.64"
    },
    {
     "id": "eq-VI-72",
     "type": "equation",
     "page": 10,
     "original": "Spk. sim. ↑"
    },
    {
     "id": "eq-VI-73",
     "type": "equation",
     "page": 10,
     "original": "56.9 70.6 63.8 63.1 63.3 61.2 62.3 67.6 63.8 70.0 67.3 69.0 63.8 67.7 68.3 65.0 67.7"
    },
    {
     "id": "eq-VI-74",
     "type": "equation",
     "page": 10,
     "original": "WER ↓"
    },
    {
     "id": "eq-VI-75",
     "type": "equation",
     "page": 10,
     "original": "1.05 0.99 – 2.11 1.77 2.62 – 12.46 2.85 2.32 2.80 82.04 2.20 3.88 9.61 18.04 83.20"
    },
    {
     "id": "eq-VI-76",
     "type": "equation",
     "page": 10,
     "original": "UTMOS ↑"
    },
    {
     "id": "eq-VI-77",
     "type": "equation",
     "page": 10,
     "original": "3.20 2.90 – 3.12 2.87 2.84 – 2.94 2.76 2.86 2.97 2.92 2.85 2.74 2.93 3.13 2.70"
    },
    {
     "id": "eq-VI-78",
     "type": "equation",
     "page": 10,
     "original": "Spk. sim. ↑"
    },
    {
     "id": "eq-VI-79",
     "type": "equation",
     "page": 10,
     "original": "61.5 75.3 – 68.3 65.8 67.1 – 67.4 71.9 75.2 73.7 62.7 69.4 72.8 73.1 60.5 62.1"
    },
    {
     "id": "p-VI-10",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-VI-10-1",
       "original": "Qwen 3 TTS 1.7B (Hu, Zhu, & He et al., 2026) WER ↓",
       "zh": "（表格行）Qwen 3 TTS 1.7B (Hu, Zhu, & He et al., 2026)；指标 WER ↓。"
      }
     ]
    },
    {
     "id": "eq-VI-80",
     "type": "equation",
     "page": 10,
     "original": "2.09 1.26 15.59 2.65 2.97 3.45 11.69 11.02 2.79 2.17 3.48 8.25 2.86 5.28 74.12 19.13 7.64"
    },
    {
     "id": "eq-VI-81",
     "type": "equation",
     "page": 10,
     "original": "UTMOS ↑"
    },
    {
     "id": "eq-VI-82",
     "type": "equation",
     "page": 10,
     "original": "2.92 2.73 2.58 2.90 2.69 2.67 2.69 2.72 2.54 2.73 2.76 2.67 2.57 2.56 2.75 2.89 2.58"
    },
    {
     "id": "eq-VI-83",
     "type": "equation",
     "page": 10,
     "original": "Spk. sim. ↑"
    },
    {
     "id": "eq-VI-84",
     "type": "equation",
     "page": 10,
     "original": "65.0 75.5 72.0 69.4 68.2 68.3 69.9 71.4 70.4 75.0 72.8 73.5 71.8 72.4 75.5 64.9 74.2"
    },
    {
     "id": "p-VI-11",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-VI-11-1",
       "original": "Fish S2 Pro (Liao, Wang, & Liu et al., 2026) WER ↓",
       "zh": "（表格行）Fish S2 Pro (Liao, Wang, & Liu et al., 2026)；指标 WER ↓。"
      }
     ]
    },
    {
     "id": "eq-VI-85",
     "type": "equation",
     "page": 10,
     "original": "1.69 1.44 12.18 2.84 3.19 4.54 7.13 6.43 3.50 4.56 4.89 7.28 4.09 5.37 4.74 15.70 6.26"
    },
    {
     "id": "eq-VI-86",
     "type": "equation",
     "page": 10,
     "original": "UTMOS ↑"
    },
    {
     "id": "eq-VI-87",
     "type": "equation",
     "page": 10,
     "original": "2.51 2.40 2.25 2.60 2.39 2.36 2.41 2.30 2.26 2.30 2.51 2.35 2.32 2.30 2.39 2.51 2.32"
    },
    {
     "id": "eq-VI-88",
     "type": "equation",
     "page": 10,
     "original": "Spk. sim. ↑"
    },
    {
     "id": "eq-VI-89",
     "type": "equation",
     "page": 10,
     "original": "68.1 78.7 74.7 72.8 70.4 72.2 73.4 76.9 74.5 77.1 74.8 78.0 73.5 75.9 78.6 73.0 76.9"
    },
    {
     "id": "p-VI-12",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-VI-12-1",
       "original": "VoxCPM 2 (Zhou, Zeng, & Liu et al., 2026) Closed-source models WER ↓",
       "zh": "（表格行）VoxCPM 2 (Zhou, Zeng, & Liu et al., 2026)；闭源模型；指标 WER ↓。"
      }
     ]
    },
    {
     "id": "eq-VI-90",
     "type": "equation",
     "page": 10,
     "original": "1.40 1.17 – 3.00 2.37 2.52 7.87 – 2.40 3.63 3.38 5.30 2.10 3.75 – – 4.84"
    },
    {
     "id": "eq-VI-91",
     "type": "equation",
     "page": 10,
     "original": "UTMOS ↑"
    },
    {
     "id": "eq-VI-92",
     "type": "equation",
     "page": 10,
     "original": "3.05 2.76 – 2.98 2.71 2.69 2.71 – 2.60 2.69 2.86 2.73 2.68 2.64 – – 2.57"
    },
    {
     "id": "eq-VI-93",
     "type": "equation",
     "page": 10,
     "original": "Spk. sim. ↑"
    },
    {
     "id": "eq-VI-94",
     "type": "equation",
     "page": 10,
     "original": "70.2 79.1 – 76.7 75.4 75.5 76.1 – 77.2 78.4 77.8 79.5 77.6 78.2 – – 78.5"
    },
    {
     "id": "eq-VI-95",
     "type": "equation",
     "page": 10,
     "original": "Cartesia Sonic 3.5 (Cartesia, 2026) WER ↓"
    },
    {
     "id": "eq-VI-96",
     "type": "equation",
     "page": 10,
     "original": "1.35 1.22 12.19 2.50 1.58 2.17 7.36 5.98 2.36 2.84 3.93 4.66 2.06 4.28 3.84 17.76 7.78"
    },
    {
     "id": "eq-VI-97",
     "type": "equation",
     "page": 10,
     "original": "UTMOS ↑"
    },
    {
     "id": "eq-VI-98",
     "type": "equation",
     "page": 10,
     "original": "3.61 3.36 3.41 3.57 3.34 3.28 3.47 3.34 3.21 3.49 3.40 3.37 3.39 3.26 3.48 3.51 3.44"
    },
    {
     "id": "eq-VI-99",
     "type": "equation",
     "page": 10,
     "original": "Spk. sim.* ↑"
    },
    {
     "id": "eq-VI-100",
     "type": "equation",
     "page": 10,
     "original": "6.3 29.7 24.4 15.3 16.4 13.6 16.3 26.2 19.6 28.6 28.7 23.6 22.1 19.7 33.9 13.1 26.4"
    },
    {
     "id": "eq-VI-101",
     "type": "equation",
     "page": 10,
     "original": "Eleven Labs V3 (ElevenLabs, 2026) WER ↓"
    },
    {
     "id": "eq-VI-102",
     "type": "equation",
     "page": 10,
     "original": "2.12 1.45 10.51 2.40 1.94 3.56 8.73 – 2.08 2.72 2.27 5.33 3.21 3.77 – – 6.92"
    },
    {
     "id": "eq-VI-103",
     "type": "equation",
     "page": 10,
     "original": "UTMOS ↑"
    },
    {
     "id": "eq-VI-104",
     "type": "equation",
     "page": 10,
     "original": "3.78 3.55 3.40 3.67 3.41 3.45 3.60 – 3.45 3.56 3.45 3.47 3.43 3.36 – – 3.66"
    },
    {
     "id": "eq-VI-105",
     "type": "equation",
     "page": 10,
     "original": "Spk. sim.* ↑10.2 29.9"
    },
    {
     "id": "eq-VI-106",
     "type": "equation",
     "page": 10,
     "original": "26.3 17.5 20.5 15.0 18.1 – 19.1 28.3 29.2 26.2 24.1 20.9 – – 26.7"
    },
    {
     "id": "eq-VI-107",
     "type": "equation",
     "page": 10,
     "original": "Gemini 3.1 Flash (Google DeepMind, 2026) WER ↓"
    },
    {
     "id": "eq-VI-108",
     "type": "equation",
     "page": 10,
     "original": "1.89 1.42 14.85 3.54 2.67 4.40 10.14 – 3.46 6.93 4.16 7.65 3.87 5.32 – 19.56 –"
    },
    {
     "id": "eq-VI-109",
     "type": "equation",
     "page": 10,
     "original": "UTMOS ↑"
    },
    {
     "id": "eq-VI-110",
     "type": "equation",
     "page": 10,
     "original": "3.02 2.71 2.70 3.03 2.83 2.76 2.65 – 2.71 2.81 2.86 2.80 2.70 2.66 – 2.99 –"
    },
    {
     "id": "eq-VI-111",
     "type": "equation",
     "page": 10,
     "original": "Spk. sim. ↑"
    },
    {
     "id": "eq-VI-112",
     "type": "equation",
     "page": 10,
     "original": "53.0 66.4 60.5 58.7 56.2 54.9 60.5 – 56.0 63.3 62.6 60.6 61.4 61.8 – 59.5 –"
    },
    {
     "id": "p-VI-13",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-VI-13-1",
       "original": "Inworld TTS 2 (Inworld AI, 2026) TABLE IV: ZTTS1-Eval In-the-wild zero-shot results across WER, MSR-UTMOS, and speaker similarity segmented by open-source and closed-source models.",
       "zh": "（表格行）60.5/–/56.0/63.3/62.6/60.6/61.4/61.8/–/59.5/–；Inworld TTS 2（Inworld AI, 2026）。表 IV：ZTTS1-Eval 实景（in-the-wild）零样本结果，按开源/闭源模型分段的 WER、MSR-UTMOS 与说话人相似度。"
      },
      {
       "id": "s-VI-13-2",
       "original": "Best result per language and metric is shown in bold; second-best is underlined.",
       "zh": "每种语言、每项指标的最优结果加粗显示，次优加下划线。"
      },
      {
       "id": "s-VI-13-3",
       "original": "Ground-truth reference results are shown for context and excluded from the ranking.",
       "zh": "真实参考结果仅供对照、不参与排名。"
      },
      {
       "id": "s-VI-13-4",
       "original": "Note that some languages are unsupported by the baseline models. * denotes models which do not support zero-shot voice cloning.",
       "zh": "注意部分语言不被某些基线模型支持；* 表示不支持零样本声音克隆的模型。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-VII",
   "num": "VII",
   "level": 1,
   "page": 10,
   "title": {
    "original": "Discussion",
    "zh": "讨论"
   },
   "blocks": []
  },
  {
   "id": "sec-VII-A",
   "num": "A",
   "level": 2,
   "page": 10,
   "title": {
    "original": "Attention-Mechanism Selection",
    "zh": "注意力机制的选择"
   },
   "blocks": [
    {
     "id": "p-VII-A-1",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-VII-A-1-1",
       "original": "During early ablations with both fully dense and MoE backbones, it was found that Multi-Head Attention (MHA) was significantly more stable than GQA for our data and architecture, and produced higher-quality outputs.",
       "zh": "在早期对全稠密与 MoE 主干的消融中，我们发现对我们的数据与架构而言，多头注意力（MHA）显著比 GQA 更稳定，且输出质量更高。"
      },
      {
       "id": "s-VII-A-1-2",
       "original": "However, in the interest of inference speed, we selected GQA.",
       "zh": "然而，出于推理速度的考虑，我们选择了 GQA。"
      },
      {
       "id": "s-VII-A-1-3",
       "original": "We believe aligning high frame rate audio with low frame rate text has different demands on attention compared to next token prediction for text.",
       "zh": "我们认为，把高帧率音频与低帧率文本对齐，对注意力的要求不同于文本上的下一 token 预测。"
      },
      {
       "id": "s-VII-A-1-4",
       "original": "Future work will explore the relative importance and function of attention in high frame rate TTS models and how it compares to LLMs.",
       "zh": "未来工作将研究高帧率 TTS 模型中注意力的相对重要性与功能，以及它与 LLM 的对比。"
      }
     ]
    },
    {
     "id": "p-VII-A-2",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-VII-A-2-1",
       "original": "Experiments on all Qwen gating (Qiu, Wang, & Zheng et al., 2025) variants showed headwise gating to be most effective, with minimal impact on training or inference overhead.",
       "zh": "对所有 Qwen 门控（Qiu, Wang, & Zheng et al., 2025）变体的实验表明，逐头（headwise）门控最有效，且对训练或推理开销的影响最小。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-VII-B",
   "num": "B",
   "level": 2,
   "page": 10,
   "title": {
    "original": "MoE Balancing Problems and Solutions",
    "zh": "MoE 均衡问题与对策"
   },
   "blocks": [
    {
     "id": "p-VII-B-1",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-VII-B-1-1",
       "original": "The integration of DAC token prediction with the delay pattern in an MoE backbone proved particularly challenging.",
       "zh": "事实证明，在 MoE 主干中把 DAC token 预测与延迟模式结合起来尤其困难。"
      },
      {
       "id": "s-VII-B-1-2",
       "original": "When comparing to large language models of similar sizes with similar hyperparameters, balancing on delayed DAC tokens was significantly more unstable than on pure text.",
       "zh": "与规模相近、超参数相似的大语言模型相比，在延迟 DAC token 上做均衡比在纯文本上明显更不稳定。"
      },
      {
       "id": "s-VII-B-1-3",
       "original": "The configuration of 3 initial and 1 final dense layers was found to be the most stable during initial testing, when combined with top-2 selection for the final MoE layer.",
       "zh": "初期测试发现，前 3 层加最后 1 层为稠密层、且最后一个 MoE 层采用 top-2 选择的配置最为稳定。"
      },
      {
       "id": "s-VII-B-1-4",
       "original": "A large portion of the instability in the final ZONOS2 model can be attributed to the inherent diﬀiculty of delayed DAC token prediction.",
       "zh": "最终的 ZONOS2 模型中的大部分不稳定，都可归因于延迟 DAC token 预测本身的困难。"
      },
      {
       "id": "s-VII-B-1-5",
       "original": "Future work will explore the use of alternative audio codecs to stabilize training, improve generation robustness and inference eﬀiciency.",
       "zh": "未来工作将探索使用替代音频 codec，以稳定训练、改善生成鲁棒性与推理效率。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-VII-C",
   "num": "C",
   "level": 2,
   "page": 10,
   "title": {
    "original": "Speaker Embedding Overfitting",
    "zh": "说话人嵌入的过拟合"
   },
   "blocks": [
    {
     "id": "p-VII-C-1",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-VII-C-1-1",
       "original": "During implementation of the speaker cloning conditioning, we observed causal leakage of information regarding the length, lexical content, and pause distribution of the source clone audio which caused inference instability characterized by either silent output or ‘glossolalia’ babble output.",
       "zh": "在实现声音克隆条件化时，我们观察到关于源克隆音频的长度、词汇内容与停顿分布的信息发生因果泄漏，导致推理不稳定，表现为输出全静音或「胡言乱语」（glossolalia）式的含混音频。"
      },
      {
       "id": "s-VII-C-1-2",
       "original": "Several interventions were made to attempt to mitigate this, including an inference time regression probe of the embedding, as well as a number of training time changes.",
       "zh": "为缓解该问题，我们尝试了若干干预，包括对嵌入做推理时的回归探针，以及一系列训练时的改动。"
      },
      {
       "id": "s-VII-C-1-3",
       "original": "The most effective of these was the LDA dimensionality reduction in combination with a two-stage anneal used in the final implementation.",
       "zh": "其中最有效的是最终实现中的 LDA 降维与两阶段退火的组合。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-VIII",
   "num": "VIII",
   "level": 1,
   "page": 11,
   "title": {
    "original": "Conclusion",
    "zh": "结论"
   },
   "blocks": [
    {
     "id": "p-VIII-1",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-VIII-1-1",
       "original": "This work presents ZONOS2, a state-of-the-art TTS system based on an MoE transformer backbone.",
       "zh": "本工作提出了 ZONOS2，一个基于 MoE Transformer 主干的业界领先 TTS 系统。"
      },
      {
       "id": "s-VIII-1-2",
       "original": "A complementary new benchmark for the assessment of similar systems, ZTTS1-Eval, is presented.",
       "zh": "同时提出了一个用于评估同类系统的配套新基准 ZTTS1-Eval。"
      },
      {
       "id": "s-VIII-1-3",
       "original": "On ZTTS1-Eval and other standard open-source TTS evaluation benchmarks, ZONOS2 shows comparable performance to both openand closed-source systems and exceptional voice cloning capability.",
       "zh": "在 ZTTS1-Eval 与其他标准开源 TTS 评测基准上，ZONOS2 的表现与开源及闭源系统相当，并展现出色的声音克隆能力。"
      },
      {
       "id": "s-VIII-1-4",
       "original": "Future work will investigate the use of different audio codecs, backbone designs, and post-training strategies.",
       "zh": "未来工作将研究不同音频 codec、主干设计与后训练策略的使用。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-acknowledgements",
   "num": null,
   "level": 1,
   "page": 11,
   "title": {
    "original": "Acknowledgements",
    "zh": "致谢"
   },
   "blocks": [
    {
     "id": "p-acknowledgements-1",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-acknowledgements-1-1",
       "original": "We would like to thank Rishi Iyer for the discussions on MoE implementation and training dynamics, Nathan Kolbas for assistance in setting up and maintaining the ZONOS2 model endpoint on Zyphra Cloud, and Paul White and Danny Martinelli for assistance with the release and distribution of the ZONOS2 model.",
       "zh": "感谢 Rishi Iyer 关于 MoE 实现与训练动态的讨论，感谢 Nathan Kolbas 协助在 Zyphra Cloud 上搭建并维护 ZONOS2 模型端点，感谢 Paul White 与 Danny Martinelli 协助 ZONOS2 模型的发布与分发。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-references",
   "num": null,
   "level": 1,
   "page": 11,
   "title": {
    "original": "References",
    "zh": "References"
   },
   "blocks": [
    {
     "id": "p-references-1",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-1-1",
       "original": "Joshua Ainslie, James Lee-Thorp.",
       "zh": "，"
      },
      {
       "id": "s-references-1-2",
       "original": "Gqa: Training generalized multi-query transformer models from multi-head checkpoints, 2023.",
       "zh": "，"
      }
     ]
    },
    {
     "id": "p-references-2",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-2-1",
       "original": "URL https://arxiv.org/abs/2305."
      }
     ]
    },
    {
     "id": "eq-references-1",
     "type": "equation",
     "page": 11,
     "original": "13245."
    },
    {
     "id": "p-references-3",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-3-1",
       "original": "Philip Anastassiou, Jiawei Chen et al. Seed-tts: A family of high-quality versatile speech generation models, 2024.",
       "zh": "，"
      }
     ]
    },
    {
     "id": "p-references-4",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-4-1",
       "original": "URL https://arxiv.org/abs/2406.02430."
      },
      {
       "id": "s-references-4-2",
       "original": "Rosana Ardila, Megan Branson et al. Common voice: A massively-multilingual speech corpus, 2020.",
       "zh": "，"
      },
      {
       "id": "s-references-4-3",
       "original": "URL https: //arxiv.org/abs/1912.06670."
      },
      {
       "id": "s-references-4-4",
       "original": "Cartesia."
      },
      {
       "id": "s-references-4-5",
       "original": "Sonic 3.5: Real-time text-to-speech api with ai laughter and emotion."
      }
     ]
    },
    {
     "id": "p-references-5",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-5-1",
       "original": "https://www.cartesia.ai/sonic, 2026.",
       "zh": "，"
      },
      {
       "id": "s-references-5-2",
       "original": "Accessed: 2026-06-03."
      },
      {
       "id": "s-references-5-3",
       "original": "Sanyuan Chen, Chengyi Wang et al.",
       "zh": "，"
      }
     ]
    },
    {
     "id": "p-references-6",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-6-1",
       "original": "Wavlm: Largescale self-supervised pre-training for full stack speech processing."
      },
      {
       "id": "s-references-6-2",
       "original": "IEEE Journal of Selected Topics in Signal Processing, 16(6):1505–1518, October 2022.",
       "zh": "，"
      },
      {
       "id": "s-references-6-3",
       "original": "ISSN 1941- 0484. doi:10.1109/jstsp.2022.3188113."
      },
      {
       "id": "s-references-6-4",
       "original": "URL http://dx. doi.org/10.1109/JSTSP.2022.3188113."
      },
      {
       "id": "s-references-6-5",
       "original": "Jade Copet, Felix Kreuk.",
       "zh": "，"
      }
     ]
    },
    {
     "id": "p-references-7",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-7-1",
       "original": "Simple and controllable music generation, 2024.",
       "zh": "，"
      },
      {
       "id": "s-references-7-2",
       "original": "URL https://arxiv.org/abs/2306."
      }
     ]
    },
    {
     "id": "eq-references-2",
     "type": "equation",
     "page": 11,
     "original": "05284."
    },
    {
     "id": "p-references-8",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-8-1",
       "original": "Tri Dao, Daniel Y.",
       "zh": "，"
      },
      {
       "id": "s-references-8-2",
       "original": "Fu."
      },
      {
       "id": "s-references-8-3",
       "original": "Flashattention: Fast and memoryeﬀicient exact attention with io-awareness, 2022.",
       "zh": "，"
      },
      {
       "id": "s-references-8-4",
       "original": "URL https://arxiv.org/abs/2205.14135."
      }
     ]
    },
    {
     "id": "p-references-9",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-9-1",
       "original": "Brecht Desplanques, Jenthe Thienpondt.",
       "zh": "，"
      }
     ]
    },
    {
     "id": "p-references-10",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-10-1",
       "original": "ECAPA- TDNN: Emphasized channel attention, propagation and aggregation in TDNN based speaker verification.",
       "zh": "，"
      },
      {
       "id": "s-references-10-2",
       "original": "In Interspeech 2020, pp. 3830–3834.",
       "zh": "，"
      },
      {
       "id": "s-references-10-3",
       "original": "ISCA, 2020. doi:10.21437/Interspeech.2020-2650.",
       "zh": "，"
      },
      {
       "id": "s-references-10-4",
       "original": "Zhihao Du, Changfeng Gao et al. Cosyvoice 3: Towards in-the-wild speech generation via scaling-up and posttraining. arXiv preprint arXiv:2505.17589, 2025.",
       "zh": "，"
      },
      {
       "id": "s-references-10-5",
       "original": "ElevenLabs."
      },
      {
       "id": "s-references-10-6",
       "original": "Eleven v3: Most expressive ai voice model. https://elevenlabs.io/v3, 2026.",
       "zh": "，"
      },
      {
       "id": "s-references-10-7",
       "original": "Accessed: 2026-06-03."
      },
      {
       "id": "s-references-10-8",
       "original": "Zhifu Gao, Shiliang Zhang.",
       "zh": "，"
      },
      {
       "id": "s-references-10-9",
       "original": "Paraformer: Fast and accurate parallel transformer for non-autoregressive end-to-end speech recognition, 2023.",
       "zh": "，"
      },
      {
       "id": "s-references-10-10",
       "original": "URL https://arxiv.org/abs/"
      }
     ]
    },
    {
     "id": "eq-references-3",
     "type": "equation",
     "page": 11,
     "original": "2206.08317."
    },
    {
     "id": "p-references-11",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-11-1",
       "original": "Google."
      },
      {
       "id": "s-references-11-2",
       "original": "Gemma 2: Improving open language models at a practical size, 2024.",
       "zh": "，"
      },
      {
       "id": "s-references-11-3",
       "original": "URL https://arxiv.org/abs/2408."
      }
     ]
    },
    {
     "id": "eq-references-4",
     "type": "equation",
     "page": 11,
     "original": "00118."
    },
    {
     "id": "p-references-12",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-12-1",
       "original": "Google DeepMind."
      }
     ]
    },
    {
     "id": "p-references-13",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-13-1",
       "original": "Gemini 3.1 Flash Audio: Model card."
      }
     ]
    },
    {
     "id": "p-references-14",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-14-1",
       "original": "https://deepmind.google/models/model-cards/ gemini-3-1-flash-audio/, 2026.",
       "zh": "，"
      },
      {
       "id": "s-references-14-2",
       "original": "Published: March 2026; updated: April 2026."
      },
      {
       "id": "s-references-14-3",
       "original": "Accessed: 2026-06-03."
      },
      {
       "id": "s-references-14-4",
       "original": "Tingwei Guo, Cheng Wen et al. Didispeech: A large scale mandarin speech corpus, 2021.",
       "zh": "我们"
      },
      {
       "id": "s-references-14-5",
       "original": "URL https://arxiv.org/ abs/2010.09275."
      },
      {
       "id": "s-references-14-6",
       "original": "Dan Hendrycks, Kevin Gimpel.",
       "zh": "，"
      },
      {
       "id": "s-references-14-7",
       "original": "Gaussian error linear units (gelus), 2023.",
       "zh": "，"
      },
      {
       "id": "s-references-14-8",
       "original": "URL https://arxiv.org/abs/1606.08415."
      },
      {
       "id": "s-references-14-9",
       "original": "Alex Henry, Prudhvi Raj Dachapally.",
       "zh": "，"
      }
     ]
    },
    {
     "id": "p-references-15",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-15-1",
       "original": "Query-key normalization for transformers."
      }
     ]
    },
    {
     "id": "p-references-16",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-16-1",
       "original": "In Trevor Cohn, Yulan He (eds.), Findings of the Association for Computational Linguistics: EMNLP 2020, pp. 4246–4253, Online, November 2020.",
       "zh": "，"
      },
      {
       "id": "s-references-16-2",
       "original": "Association for Computational Linguistics."
      }
     ]
    },
    {
     "id": "p-references-17",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-17-1",
       "original": "doi:10.18653/v1/2020.findings-emnlp.379."
      }
     ]
    },
    {
     "id": "p-references-18",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-18-1",
       "original": "URL https://aclanthology.org/2020.findings-emnlp.379/."
      },
      {
       "id": "s-references-18-2",
       "original": "Hangrui Hu, Xinfa Zhu et al. Qwen3-tts technical report, 2026.",
       "zh": "，"
      },
      {
       "id": "s-references-18-3",
       "original": "URL https://arxiv.org/abs/2601.15621."
      },
      {
       "id": "s-references-18-4",
       "original": "Inworld AI."
      },
      {
       "id": "s-references-18-5",
       "original": "Realtime TTS-2: A new frontier voice model that feels as human as it sounds. https://inworld.ai/ blog/realtime-tts-2, May 2026.",
       "zh": "，"
      },
      {
       "id": "s-references-18-6",
       "original": "Accessed: 2026-06-03."
      },
      {
       "id": "s-references-18-7",
       "original": "Keller Jordan, Yuchen Jin.",
       "zh": "，"
      }
     ]
    },
    {
     "id": "p-references-19",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-19-1",
       "original": "Muon: An optimizer for hidden layers in neural networks, 2024.",
       "zh": "，"
      }
     ]
    },
    {
     "id": "p-references-20",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-20-1",
       "original": "URL https://kellerjordan. github. io/posts/muon, 6, 2024.",
       "zh": "，"
      },
      {
       "id": "s-references-20-2",
       "original": "Nithin Rao Koluguri, Monica Sekoyan et al.",
       "zh": "，"
      }
     ]
    },
    {
     "id": "p-references-21",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-21-1",
       "original": "Granary: Speech recognition and translation dataset in 25 european languages, 2025.",
       "zh": "，"
      },
      {
       "id": "s-references-21-2",
       "original": "URL https://arxiv.org/abs/2505."
      }
     ]
    },
    {
     "id": "eq-references-5",
     "type": "equation",
     "page": 11,
     "original": "13404."
    },
    {
     "id": "p-references-22",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-22-1",
       "original": "Rithesh Kumar, Prem Seetharaman.",
       "zh": "，"
      },
      {
       "id": "s-references-22-2",
       "original": "High-fidelity audio compression with improved rvqgan, 2023.",
       "zh": "，"
      },
      {
       "id": "s-references-22-3",
       "original": "URL https: //arxiv.org/abs/2306.06546."
      },
      {
       "id": "s-references-22-4",
       "original": "Xinjian Li, Siddharth Dalmia et al.",
       "zh": "，"
      }
     ]
    },
    {
     "id": "p-references-23",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-23-1",
       "original": "Universal phone recognition with a multilingual allophone system."
      }
     ]
    },
    {
     "id": "p-references-24",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-24-1",
       "original": "In ICASSP 2020-2020 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP), pp. 8249–8253.",
       "zh": "，"
      },
      {
       "id": "s-references-24-2",
       "original": "IEEE, 2020.",
       "zh": "，"
      },
      {
       "id": "s-references-24-3",
       "original": "Shijia Liao, Yuxuan Wang et al. Fish audio s2 technical report, 2026.",
       "zh": "，"
      },
      {
       "id": "s-references-24-4",
       "original": "URL https://arxiv.org/abs/2603.08823."
      },
      {
       "id": "s-references-24-5",
       "original": "Yuke Lin, Ming Cheng.",
       "zh": "，"
      },
      {
       "id": "s-references-24-6",
       "original": "Voxblink2: A 100k+ speaker recognition corpus and the open-set speaker-identification benchmark, 2024.",
       "zh": "，"
      }
     ]
    },
    {
     "id": "p-references-25",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-25-1",
       "original": "URL https://arxiv.org/abs/2407."
      }
     ]
    },
    {
     "id": "eq-references-6",
     "type": "equation",
     "page": 12,
     "original": "11510."
    },
    {
     "id": "p-references-26",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-26-1",
       "original": "Jingyuan Liu, Jianlin Su et al. Muon is scalable for llm training. arXiv preprint arXiv:2502.16982, 2025.",
       "zh": "，"
      },
      {
       "id": "s-references-26-2",
       "original": "Ilya Loshchilov, Frank Hutter.",
       "zh": "，"
      }
     ]
    },
    {
     "id": "p-references-27",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-27-1",
       "original": "Decoupled weight decay regularization."
      },
      {
       "id": "s-references-27-2",
       "original": "In International Conference on Learning Representations, 2019.",
       "zh": "，"
      }
     ]
    },
    {
     "id": "p-references-28",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-28-1",
       "original": "URL https://openreview.net/ forum?id=Bkg6RiCqY7."
      },
      {
       "id": "s-references-28-2",
       "original": "Min Ma, Yuma Koizumi.",
       "zh": "，"
      },
      {
       "id": "s-references-28-3",
       "original": "Fleurs-r: A restored multilingual speech corpus for generation tasks, 2024.",
       "zh": "，"
      },
      {
       "id": "s-references-28-4",
       "original": "URL https: //arxiv.org/abs/2408.06227."
      },
      {
       "id": "s-references-28-5",
       "original": "MiniMax, others.",
       "zh": "，"
      }
     ]
    },
    {
     "id": "p-references-29",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-29-1",
       "original": "MiniMax-Speech: Intrinsic zero-shot text-to-speech with a learnable speaker encoder. arXiv preprint arXiv:2505.07916, 2025.",
       "zh": "，"
      },
      {
       "id": "s-references-29-2",
       "original": "Christoph Minixhofer, Ondřej Klejch.",
       "zh": "，"
      },
      {
       "id": "s-references-29-3",
       "original": "Ttsds2: Resources and benchmark for evaluating human-quality text to speech systems, 2025.",
       "zh": "，"
      },
      {
       "id": "s-references-29-4",
       "original": "URL https://arxiv.org/abs/2506."
      }
     ]
    },
    {
     "id": "eq-references-7",
     "type": "equation",
     "page": 12,
     "original": "19441."
    },
    {
     "id": "p-references-30",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-30-1",
       "original": "Go Nishikawa, Wataru Nakata.",
       "zh": "，"
      },
      {
       "id": "s-references-30-2",
       "original": "Multi-sampling-frequency naturalness mos prediction using self-supervised learning model with sampling-frequency-independent layer, 2025.",
       "zh": "，"
      },
      {
       "id": "s-references-30-3",
       "original": "URL https://arxiv.org/abs/2507.14647."
      },
      {
       "id": "s-references-30-4",
       "original": "Matteo Pagliardini, Amirkeivan Mohtashami.",
       "zh": "，"
      }
     ]
    },
    {
     "id": "p-references-31",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-31-1",
       "original": "Denseformer: Enhancing information flow in transformers via depth weighted averaging, 2024.",
       "zh": "，"
      }
     ]
    },
    {
     "id": "p-references-32",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-32-1",
       "original": "URL https://arxiv. org/abs/2402.02622."
      },
      {
       "id": "s-references-32-2",
       "original": "Zihan Qiu, Zekun Wang et al. Gated attention for large language models: Non-linearity, sparsity, and attentionsink-free, 2025.",
       "zh": "，"
      },
      {
       "id": "s-references-32-3",
       "original": "URL https://arxiv.org/abs/2505.06708."
      },
      {
       "id": "s-references-32-4",
       "original": "Alec Radford, Jong Wook Kim.",
       "zh": "，"
      },
      {
       "id": "s-references-32-5",
       "original": "Robust speech recognition via large-scale weak supervision, 2022.",
       "zh": "，"
      }
     ]
    },
    {
     "id": "p-references-33",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-33-1",
       "original": "URL https:// arxiv.org/abs/2212.04356."
      },
      {
       "id": "s-references-33-2",
       "original": "Noam Shazeer."
      },
      {
       "id": "s-references-33-3",
       "original": "Glu variants improve transformer, 2020.",
       "zh": "，"
      }
     ]
    },
    {
     "id": "p-references-34",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-34-1",
       "original": "URL https://arxiv.org/abs/2002.05202."
      },
      {
       "id": "s-references-34-2",
       "original": "Xian Shi, Xiong Wang et al. Qwen3-asr technical report.",
       "zh": "，"
      }
     ]
    },
    {
     "id": "p-references-35",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-35-1",
       "original": "arXiv preprint arXiv:2601.21337, 2026.",
       "zh": "，"
      },
      {
       "id": "s-references-35-2",
       "original": "Jianlin Su, Murtadha Ahmed.",
       "zh": "，"
      }
     ]
    },
    {
     "id": "p-references-36",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-36-1",
       "original": "Roformer: Enhanced transformer with rotary position embedding."
      },
      {
       "id": "s-references-36-2",
       "original": "Neurocomputing, 568:127063, 2024.",
       "zh": "，"
      }
     ]
    },
    {
     "id": "p-references-37",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-37-1",
       "original": "ISSN 0925-2312. doi:https://doi.org/10.1016/j.neucom.2023.127063."
      },
      {
       "id": "s-references-37-2",
       "original": "URL https://www.sciencedirect.com/science/article/ pii/S0925231223011864."
      },
      {
       "id": "s-references-37-3",
       "original": "Lean Wang, Huazuo Gao.",
       "zh": "，"
      }
     ]
    },
    {
     "id": "p-references-38",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-38-1",
       "original": "Auxiliary-loss-free load balancing strategy for mixture-of-experts, 2024.",
       "zh": "，"
      }
     ]
    },
    {
     "id": "p-references-39",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-39-1",
       "original": "URL https://arxiv.org/abs/2408.15664."
      },
      {
       "id": "s-references-39-2",
       "original": "Robert Washbourne, Rishi Iyer et al. Zaya1-8b technical report, 2026.",
       "zh": "，"
      },
      {
       "id": "s-references-39-3",
       "original": "URL https://arxiv.org/abs/2605.05365."
      },
      {
       "id": "s-references-39-4",
       "original": "Ivan Yakovlev, Rostislav Makarov.",
       "zh": "，"
      },
      {
       "id": "s-references-39-5",
       "original": "Reshape dimensions network for speaker recognition."
      }
     ]
    },
    {
     "id": "p-references-40",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-40-1",
       "original": "In Interspeech 2024, interspeech-2024, pp. 3235––3239.",
       "zh": "，"
      },
      {
       "id": "s-references-40-2",
       "original": "ISCA, 2024.",
       "zh": "，"
      },
      {
       "id": "s-references-40-3",
       "original": "Yifan Yang, Bing Han.",
       "zh": "，"
      }
     ]
    },
    {
     "id": "p-references-41",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-41-1",
       "original": "Measuring prosody diversity in zero-shot tts: A new metric, benchmark, and exploration.",
       "zh": "，"
      },
      {
       "id": "s-references-41-2",
       "original": "In Proc."
      },
      {
       "id": "s-references-41-3",
       "original": "ICASSP, Barcelona, 2026.",
       "zh": "，"
      },
      {
       "id": "s-references-41-4",
       "original": "Neil Zeghidour, Alejandro Luebs.",
       "zh": "，"
      },
      {
       "id": "s-references-41-5",
       "original": "Soundstream: An endto-end neural audio codec, 2021.",
       "zh": "，"
      }
     ]
    },
    {
     "id": "p-references-42",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-42-1",
       "original": "URL https://arxiv. org/abs/2107.03312."
      }
     ]
    },
    {
     "id": "p-references-43",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-43-1",
       "original": "Biao Zhang, Rico Sennrich.",
       "zh": "，"
      }
     ]
    },
    {
     "id": "p-references-44",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-44-1",
       "original": "Root mean square layer normalization, 2019.",
       "zh": "，"
      },
      {
       "id": "s-references-44-2",
       "original": "URL https://arxiv.org/abs/1910."
      }
     ]
    },
    {
     "id": "eq-references-8",
     "type": "equation",
     "page": 12,
     "original": "07467."
    },
    {
     "id": "p-references-45",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-45-1",
       "original": "Yixuan Zhou, Guoyang Zeng et al.",
       "zh": "，"
      }
     ]
    },
    {
     "id": "p-references-46",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-46-1",
       "original": "Voxcpm2 technical report, 2026.",
       "zh": "，"
      },
      {
       "id": "s-references-46-2",
       "original": "URL https://arxiv.org/abs/2606.06928."
      }
     ]
    }
   ]
  },
  {
   "id": "sec-A",
   "num": "A",
   "level": 1,
   "page": 12,
   "title": {
    "original": "Model configuration",
    "zh": "模型配置"
   },
   "blocks": [
    {
     "id": "p-A-1",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-A-1-1",
       "original": "Property ZONOS2 8B Configuration Architecture Decoder-only MoE transformer Active Parameters 900M Total Parameters 8B Transformer Layers",
       "zh": "表 V：ZONOS2 8B 配置。属性取值——架构：decoder-only MoE Transformer；激活参数 900M；总参数 8B；Transformer 层数 28；隐藏维度 2048；GQA 查询头数 16；KV 头数 4；头维度 128；注意力变体：GQA（4× 分组）；每个 MoE 层专家数 16；路由：top-1（最后一个 MoE 层为 top-2）；专家 FFN 宽度 3072；Qwen 门控位置：逐头（headwise）；路由器潜在维度 128；路由器配置：EDA；位置嵌入：RoPE；分词器：字节级。"
      }
     ]
    },
    {
     "id": "eq-A-1",
     "type": "equation",
     "page": 12,
     "original": "28"
    },
    {
     "id": "eq-A-2",
     "type": "equation",
     "page": 12,
     "original": "Hidden Dimension"
    },
    {
     "id": "eq-A-3",
     "type": "equation",
     "page": 12,
     "original": "2048"
    },
    {
     "id": "eq-A-4",
     "type": "equation",
     "page": 12,
     "original": "GQA Query Heads"
    },
    {
     "id": "eq-A-5",
     "type": "equation",
     "page": 12,
     "original": "16"
    },
    {
     "id": "eq-A-6",
     "type": "equation",
     "page": 12,
     "original": "KV Heads"
    },
    {
     "id": "eq-A-7",
     "type": "equation",
     "page": 12,
     "original": "4"
    },
    {
     "id": "eq-A-8",
     "type": "equation",
     "page": 12,
     "original": "Head dimension"
    },
    {
     "id": "eq-A-9",
     "type": "equation",
     "page": 12,
     "original": "128"
    },
    {
     "id": "p-A-2",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-A-2-1",
       "original": "Attention variant GQA (4× grouping) Experts per MoE layer",
       "zh": "表 V：ZONOS2 8B 配置。属性取值——架构：decoder-only MoE Transformer；激活参数 900M；总参数 8B；Transformer 层数 28；隐藏维度 2048；GQA 查询头数 16；KV 头数 4；头维度 128；注意力变体：GQA（4× 分组）；每个 MoE 层专家数 16；路由：top-1（最后一个 MoE 层为 top-2）；专家 FFN 宽度 3072；Qwen 门控位置：逐头（headwise）；路由器潜在维度 128；路由器配置：EDA；位置嵌入：RoPE；分词器：字节级。"
      }
     ]
    },
    {
     "id": "eq-A-10",
     "type": "equation",
     "page": 12,
     "original": "16"
    },
    {
     "id": "p-A-3",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-A-3-1",
       "original": "Routing top-1, top-2 for final MoE Expert FFN width",
       "zh": "表 V：ZONOS2 8B 配置。属性取值——架构：decoder-only MoE Transformer；激活参数 900M；总参数 8B；Transformer 层数 28；隐藏维度 2048；GQA 查询头数 16；KV 头数 4；头维度 128；注意力变体：GQA（4× 分组）；每个 MoE 层专家数 16；路由：top-1（最后一个 MoE 层为 top-2）；专家 FFN 宽度 3072；Qwen 门控位置：逐头（headwise）；路由器潜在维度 128；路由器配置：EDA；位置嵌入：RoPE；分词器：字节级。"
      }
     ]
    },
    {
     "id": "eq-A-11",
     "type": "equation",
     "page": 12,
     "original": "3072"
    },
    {
     "id": "eq-A-12",
     "type": "equation",
     "page": 12,
     "original": "Qwen gating location headwise Router latent dimension"
    },
    {
     "id": "eq-A-13",
     "type": "equation",
     "page": 12,
     "original": "128"
    },
    {
     "id": "p-A-4",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-A-4-1",
       "original": "Router configuration EDA Positional embeddings RoPE Tokenizer Byte level TABLE V: ZONOS2 8B Configuration.",
       "zh": "表 V：ZONOS2 8B 配置。属性取值——架构：decoder-only MoE Transformer；激活参数 900M；总参数 8B；Transformer 层数 28；隐藏维度 2048；GQA 查询头数 16；KV 头数 4；头维度 128；注意力变体：GQA（4× 分组）；每个 MoE 层专家数 16；路由：top-1（最后一个 MoE 层为 top-2）；专家 FFN 宽度 3072；Qwen 门控位置：逐头（headwise）；路由器潜在维度 128；路由器配置：EDA；位置嵌入：RoPE；分词器：字节级。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-B",
   "num": "B",
   "level": 1,
   "page": 12,
   "title": {
    "original": "ITW set language breakdown",
    "zh": "ITW 集语言拆分"
   },
   "blocks": []
  },
  {
   "id": "sec-language",
   "num": null,
   "level": 2,
   "page": 12,
   "title": {
    "original": "Language",
    "zh": "按语言统计"
   },
   "blocks": [
    {
     "id": "p-language-1",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-language-1-1",
       "original": "Utterances Hours en",
       "zh": "表头：Utterances / Hours——en（后续照原文）。"
      }
     ]
    },
    {
     "id": "eq-language-1",
     "type": "equation",
     "page": 12,
     "original": "120 0.22"
    },
    {
     "id": "eq-language-2",
     "type": "equation",
     "page": 12,
     "original": "zh"
    },
    {
     "id": "eq-language-3",
     "type": "equation",
     "page": 12,
     "original": "92 0.14"
    },
    {
     "id": "eq-language-4",
     "type": "equation",
     "page": 12,
     "original": "de"
    },
    {
     "id": "eq-language-5",
     "type": "equation",
     "page": 12,
     "original": "104 0.20"
    },
    {
     "id": "eq-language-6",
     "type": "equation",
     "page": 12,
     "original": "es"
    },
    {
     "id": "eq-language-7",
     "type": "equation",
     "page": 12,
     "original": "95 0.17"
    },
    {
     "id": "eq-language-8",
     "type": "equation",
     "page": 12,
     "original": "fr"
    },
    {
     "id": "eq-language-9",
     "type": "equation",
     "page": 12,
     "original": "92 0.18"
    },
    {
     "id": "eq-language-10",
     "type": "equation",
     "page": 12,
     "original": "it"
    },
    {
     "id": "eq-language-11",
     "type": "equation",
     "page": 12,
     "original": "97 0.18"
    },
    {
     "id": "eq-language-12",
     "type": "equation",
     "page": 12,
     "original": "ja"
    },
    {
     "id": "eq-language-13",
     "type": "equation",
     "page": 12,
     "original": "91 0.14"
    },
    {
     "id": "eq-language-14",
     "type": "equation",
     "page": 12,
     "original": "ko"
    },
    {
     "id": "eq-language-15",
     "type": "equation",
     "page": 12,
     "original": "93 0.13"
    },
    {
     "id": "eq-language-16",
     "type": "equation",
     "page": 12,
     "original": "ru"
    },
    {
     "id": "eq-language-17",
     "type": "equation",
     "page": 12,
     "original": "101 0.19"
    },
    {
     "id": "eq-language-18",
     "type": "equation",
     "page": 12,
     "original": "pt"
    },
    {
     "id": "eq-language-19",
     "type": "equation",
     "page": 12,
     "original": "93 0.19"
    },
    {
     "id": "eq-language-20",
     "type": "equation",
     "page": 12,
     "original": "ar"
    },
    {
     "id": "eq-language-21",
     "type": "equation",
     "page": 12,
     "original": "90 0.15"
    },
    {
     "id": "eq-language-22",
     "type": "equation",
     "page": 12,
     "original": "hi"
    },
    {
     "id": "eq-language-23",
     "type": "equation",
     "page": 12,
     "original": "86 0.14"
    },
    {
     "id": "eq-language-24",
     "type": "equation",
     "page": 12,
     "original": "id"
    },
    {
     "id": "eq-language-25",
     "type": "equation",
     "page": 12,
     "original": "84 0.16"
    },
    {
     "id": "eq-language-26",
     "type": "equation",
     "page": 12,
     "original": "tr"
    },
    {
     "id": "eq-language-27",
     "type": "equation",
     "page": 12,
     "original": "93 0.17"
    },
    {
     "id": "eq-language-28",
     "type": "equation",
     "page": 12,
     "original": "tl"
    },
    {
     "id": "eq-language-29",
     "type": "equation",
     "page": 12,
     "original": "89 0.14"
    },
    {
     "id": "eq-language-30",
     "type": "equation",
     "page": 12,
     "original": "pl"
    },
    {
     "id": "eq-language-31",
     "type": "equation",
     "page": 12,
     "original": "105 0.21"
    },
    {
     "id": "eq-language-32",
     "type": "equation",
     "page": 12,
     "original": "th"
    },
    {
     "id": "eq-language-33",
     "type": "equation",
     "page": 12,
     "original": "93 0.14"
    }
   ]
  },
  {
   "id": "sec-total",
   "num": null,
   "level": 2,
   "page": 12,
   "title": {
    "original": "Total",
    "zh": "合计"
   },
   "blocks": [
    {
     "id": "eq-total-1",
     "type": "equation",
     "page": 12,
     "original": "1618 2.86"
    },
    {
     "id": "p-total-1",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-total-1-1",
       "original": "TABLE VI: ZTTS1-Eval ITW language coverage statistics.",
       "zh": "合计 1618 条语句、2.86 小时。表 VI：ZTTS1-Eval ITW 语言覆盖统计。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-C",
   "num": "C",
   "level": 1,
   "page": 13,
   "title": {
    "original": "Model Details",
    "zh": "模型细节"
   },
   "blocks": [
    {
     "id": "p-C-1",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-C-1-1",
       "original": "Each transformer layer follows a pre-normalization residual structure.",
       "zh": "每个 Transformer 层都遵循预归一化的残差结构。"
      },
      {
       "id": "s-C-1-2",
       "original": "For layer ℓ, with input hidden state hℓ t, the following is computed:",
       "zh": "对第 ℓ 层、输入隐状态 hℓt，计算如下："
      }
     ]
    },
    {
     "id": "eq-C-1",
     "type": "equation",
     "page": 13,
     "original": "¯hℓ t = RMSNormattn(hℓ t), (9)"
    },
    {
     "id": "p-C-2",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-C-2-1",
       "original": "rℓ t = hℓ t + Attnℓ(¯hℓ ≤t),",
       "zh": "（公式：r^ℓ_t = h^ℓ_t + Attn^ℓ(h̄^ℓ_{≤t})（式 10）；h^{ℓ+1}_t = r^ℓ_t + FFN^ℓ(RMSNorm_ffn(r^ℓ_t))。）"
      }
     ]
    },
    {
     "id": "eq-C-2",
     "type": "equation",
     "page": 13,
     "original": "(10)"
    },
    {
     "id": "p-C-3",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-C-3-1",
       "original": "hℓ+1 t = rℓ t + FFNℓ( RMSNormffn(rℓ t)",
       "zh": "（公式：r^ℓ_t = h^ℓ_t + Attn^ℓ(h̄^ℓ_{≤t})（式 10）；h^{ℓ+1}_t = r^ℓ_t + FFN^ℓ(RMSNorm_ffn(r^ℓ_t))。）"
      }
     ]
    },
    {
     "id": "eq-C-3",
     "type": "equation",
     "page": 13,
     "original": ") ."
    },
    {
     "id": "eq-C-4",
     "type": "equation",
     "page": 13,
     "original": "(11)"
    },
    {
     "id": "p-C-4",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-C-4-1",
       "original": "The attention module uses GQA.",
       "zh": "（式 11）注意力模块使用 GQA。"
      },
      {
       "id": "s-C-4-2",
       "original": "Queries are projected into H query heads, while keys and values are projected into Hkv heads, with Hkv ≤H.",
       "zh": "查询被投影为 H 个查询头，键与值被投影为 Hkv 个头，且 Hkv ≤ H。"
      },
      {
       "id": "s-C-4-3",
       "original": "Rotary Positional Embeddings (RoPE) (Su, Ahmed, & Lu et al., 2024) are applied to queries and keys before attention.",
       "zh": "注意力之前，对查询与键施加旋转位置嵌入（RoPE）（Su, Ahmed, & Lu et al., 2024）。"
      },
      {
       "id": "s-C-4-4",
       "original": "Query-key normalization is applied (Henry, Dachapally, & Pawar et al., 2020):",
       "zh": "同时施加查询-键归一化（Henry, Dachapally, & Pawar et al., 2020）："
      }
     ]
    },
    {
     "id": "eq-C-5",
     "type": "equation",
     "page": 13,
     "original": "qt,h ←αh qt,h RMS(qt,h), (12)"
    },
    {
     "id": "eq-C-6",
     "type": "equation",
     "page": 13,
     "original": "kt,h ← kt,h RMS(kt,h), (13)"
    },
    {
     "id": "p-C-5",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-C-5-1",
       "original": "where αh is a learned positive per-head scale.",
       "zh": "kt,h/RMS(kt,h)，其中 αh 是每个头学习到的正的缩放系数。"
      },
      {
       "id": "s-C-5-2",
       "original": "Attention is then computed using FlashAttention (Dao, Fu, & Ermon et al., 2022) over packed variable-length sequences:",
       "zh": "随后在打包的变长序列上用 FlashAttention（Dao, Fu, & Ermon et al., 2022）计算注意力："
      }
     ]
    },
    {
     "id": "eq-C-7",
     "type": "equation",
     "page": 13,
     "original": ")"
    },
    {
     "id": "eq-C-8",
     "type": "equation",
     "page": 13,
     "original": "( q⊤ t,hkτ,h √dh"
    },
    {
     "id": "eq-C-9",
     "type": "equation",
     "page": 13,
     "original": "ot,h = ∑"
    },
    {
     "id": "eq-C-10",
     "type": "equation",
     "page": 13,
     "original": "vτ,h. (14)"
    },
    {
     "id": "p-C-6",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-C-6-1",
       "original": "τ≤t softmaxτ The attention output is modulated with a learned headwise gate (Qiu, Wang, & Zheng et al., 2025):",
       "zh": "（公式片段：softmax_{τ≤t}。注意力输出用按头学习的门控调制（Qiu, Wang, & Zheng et al., 2025）：）"
      }
     ]
    },
    {
     "id": "eq-C-11",
     "type": "equation",
     "page": 13,
     "original": "gt = σ(Wg¯hℓ t), ˜ot,h = gt,hot,h. (15)"
    },
    {
     "id": "p-C-7",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-C-7-1",
       "original": "The gated attention output is then projected back to the model dimension.",
       "zh": "门控后的注意力输出再被投影回模型维度。"
      },
      {
       "id": "s-C-7-2",
       "original": "The feed-forward sublayer is either a dense SwiGLU (Shazeer, 2020) MLP in the initial and final non-MoE blocks or the routed MoE MLP shown in the center of Figure 2.",
       "zh": "前馈子层有两种形态：在首尾的少数非 MoE 块中是稠密 SwiGLU（Shazeer, 2020）MLP，在其余块中是图 2 中部所示的路由 MoE MLP。"
      },
      {
       "id": "s-C-7-3",
       "original": "The dense form is",
       "zh": "稠密形式为 FFN(x) = Wout (Win,1 x ⊙ SiLU(Win,2 x))。"
      }
     ]
    },
    {
     "id": "eq-C-12",
     "type": "equation",
     "page": 13,
     "original": "FFN(x) = Wout (Win,1x ⊙SiLU(Win,2x)) . (16)"
    },
    {
     "id": "p-C-8",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-C-8-1",
       "original": "For routed layers, a router produces expert probabilities",
       "zh": "，"
      }
     ]
    },
    {
     "id": "eq-C-13",
     "type": "equation",
     "page": 13,
     "original": "πt = softmax(R(xt)), (17)"
    },
    {
     "id": "p-C-9",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-C-9-1",
       "original": "selects the top-k experts and combines their outputs, weighted by the corresponding router probabilities.",
       "zh": "，"
      },
      {
       "id": "s-C-9-2",
       "original": "Routed layers use E = 16 experts with top-1 routing, except the last MoE block, which uses top-2.",
       "zh": "路由层使用 E = 16 个专家、top-1 路由，最后一个 MoE 块除外——它使用 top-2。"
      },
      {
       "id": "s-C-9-3",
       "original": "The MoE layers begin after the first 3 dense layers, and the final layer is also dense.",
       "zh": "MoE 层从前 3 个稠密层之后开始，最后一层同样是稠密层。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-D",
   "num": "D",
   "level": 1,
   "page": 13,
   "title": {
    "original": "Additional Result Plots",
    "zh": "附加结果图表"
   },
   "blocks": [
    {
     "id": "p-D-1",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-D-1-1",
       "original": "This appendix collects the supplementary prosody and generation-diversity plots referenced in Section VI.",
       "zh": "本附录收录第六节引用的补充韵律与生成多样性图。"
      }
     ]
    },
    {
     "id": "p-D-2",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-D-2-1",
       "original": "Task Set Spk. sim. ↑ DNSMOS ↑ WER % ↓ Emo. acc. % ↑",
       "zh": "表头：Task Set × Spk. sim.↑ × DNSMOS↑ × WER%↓ × Emo. acc.%↑。"
      }
     ]
    },
    {
     "id": "eq-D-1",
     "type": "equation",
     "page": 14,
     "original": "ZONOS2"
    },
    {
     "id": "p-D-3",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-D-3-1",
       "original": "CosyVoice 3 Eval en",
       "zh": "（表格行）CosyVoice 3 Eval / en（后续照原文）。"
      }
     ]
    },
    {
     "id": "eq-D-2",
     "type": "equation",
     "page": 14,
     "original": "49.66 3.901 4.48 –"
    },
    {
     "id": "eq-D-3",
     "type": "equation",
     "page": 14,
     "original": "hard_en"
    },
    {
     "id": "eq-D-4",
     "type": "equation",
     "page": 14,
     "original": "49.58 4.020 5.23 –"
    },
    {
     "id": "eq-D-5",
     "type": "equation",
     "page": 14,
     "original": "zh"
    },
    {
     "id": "eq-D-6",
     "type": "equation",
     "page": 14,
     "original": "56.93 3.710 12.08 –"
    },
    {
     "id": "eq-D-7",
     "type": "equation",
     "page": 14,
     "original": "hard_zh"
    },
    {
     "id": "eq-D-8",
     "type": "equation",
     "page": 14,
     "original": "50.64 3.614 25.55 –"
    },
    {
     "id": "eq-D-9",
     "type": "equation",
     "page": 14,
     "original": "ja"
    },
    {
     "id": "eq-D-10",
     "type": "equation",
     "page": 14,
     "original": "53.15 3.846 8.60 –"
    },
    {
     "id": "eq-D-11",
     "type": "equation",
     "page": 14,
     "original": "ko"
    },
    {
     "id": "eq-D-12",
     "type": "equation",
     "page": 14,
     "original": "58.75 3.945 6.03 –"
    },
    {
     "id": "eq-D-13",
     "type": "equation",
     "page": 14,
     "original": "Zero-shot to_en"
    },
    {
     "id": "eq-D-14",
     "type": "equation",
     "page": 14,
     "original": "46.66 3.896 4.94 –"
    },
    {
     "id": "eq-D-15",
     "type": "equation",
     "page": 14,
     "original": "to_hard_en"
    },
    {
     "id": "eq-D-16",
     "type": "equation",
     "page": 14,
     "original": "45.93 4.007 9.13 –"
    },
    {
     "id": "eq-D-17",
     "type": "equation",
     "page": 14,
     "original": "to_zh"
    },
    {
     "id": "eq-D-18",
     "type": "equation",
     "page": 14,
     "original": "47.00 3.701 18.72 –"
    },
    {
     "id": "eq-D-19",
     "type": "equation",
     "page": 14,
     "original": "to_hard_zh"
    },
    {
     "id": "eq-D-20",
     "type": "equation",
     "page": 14,
     "original": "47.60 3.665 23.27 –"
    },
    {
     "id": "eq-D-21",
     "type": "equation",
     "page": 14,
     "original": "to_ja"
    },
    {
     "id": "eq-D-22",
     "type": "equation",
     "page": 14,
     "original": "48.13 3.866 15.12 –"
    },
    {
     "id": "eq-D-23",
     "type": "equation",
     "page": 14,
     "original": "to_ko"
    },
    {
     "id": "eq-D-24",
     "type": "equation",
     "page": 14,
     "original": "50.40 3.918 6.82 –"
    },
    {
     "id": "eq-D-25",
     "type": "equation",
     "page": 14,
     "original": "Cross-lingual zero-shot Emotion zero-shot en"
    },
    {
     "id": "eq-D-26",
     "type": "equation",
     "page": 14,
     "original": "39.12 3.837 4.71 37.3"
    },
    {
     "id": "eq-D-27",
     "type": "equation",
     "page": 14,
     "original": "zh"
    },
    {
     "id": "eq-D-28",
     "type": "equation",
     "page": 14,
     "original": "58.48 3.610 7.57 36.7"
    },
    {
     "id": "eq-D-29",
     "type": "equation",
     "page": 14,
     "original": "emotion"
    },
    {
     "id": "eq-D-30",
     "type": "equation",
     "page": 14,
     "original": "48.16 3.743 – –"
    },
    {
     "id": "eq-D-31",
     "type": "equation",
     "page": 14,
     "original": "rhyme"
    },
    {
     "id": "eq-D-32",
     "type": "equation",
     "page": 14,
     "original": "42.00 3.547 – –"
    },
    {
     "id": "eq-D-33",
     "type": "equation",
     "page": 14,
     "original": "speed"
    },
    {
     "id": "eq-D-34",
     "type": "equation",
     "page": 14,
     "original": "45.25 3.768 – –"
    },
    {
     "id": "eq-D-35",
     "type": "equation",
     "page": 14,
     "original": "volume"
    },
    {
     "id": "eq-D-36",
     "type": "equation",
     "page": 14,
     "original": "44.54 3.777 – –"
    },
    {
     "id": "eq-D-37",
     "type": "equation",
     "page": 14,
     "original": "Subjective continuation Subjective zero-shot all"
    },
    {
     "id": "eq-D-38",
     "type": "equation",
     "page": 14,
     "original": "53.32 3.791 – –"
    },
    {
     "id": "eq-D-39",
     "type": "equation",
     "page": 14,
     "original": "Seed-TTS-Eval Zero-shot Test-EN"
    },
    {
     "id": "eq-D-40",
     "type": "equation",
     "page": 14,
     "original": "47.60 – 2.05 –"
    },
    {
     "id": "eq-D-41",
     "type": "equation",
     "page": 14,
     "original": "Test-ZH"
    },
    {
     "id": "eq-D-42",
     "type": "equation",
     "page": 14,
     "original": "58.20 – 2.55 –"
    },
    {
     "id": "eq-D-43",
     "type": "equation",
     "page": 14,
     "original": "Test-ZH-Hard"
    },
    {
     "id": "eq-D-44",
     "type": "equation",
     "page": 14,
     "original": "56.2 – 11.15 –"
    },
    {
     "id": "p-D-4",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-D-4-1",
       "original": "TABLE VII: ZONOS2 evaluation results across speaker similarity, DNSMOS, WER, and emotion accuracy on the CosyVoice 3 Eval and Seed-TTS-Eval benchmarks, grouped by task.",
       "zh": "表 VII：ZONOS2 在 CosyVoice 3 Eval 与 Seed-TTS-Eval 基准上按任务分组的说话人相似度、DNSMOS、WER 与情绪准确率评测结果。"
      },
      {
       "id": "s-D-4-2",
       "original": "Emotion accuracy is only reported for the emotion zero-shot task.",
       "zh": "情绪准确率仅在情绪零样本任务上报告。"
      }
     ]
    },
    {
     "id": "fig-D-1",
     "type": "figure_caption",
     "page": 14,
     "original": "Fig. 6: Violin plots of DS-WED scores for the English portions of both ZTTS1-Eval sets.",
     "zh": "图 6：ZTTS1-Eval 两个集合英文部分 DS-WED 分数的小提琴图。"
    },
    {
     "id": "fig-D-2",
     "type": "figure_caption",
     "page": 15,
     "original": "Fig. 7: Allosaurus SR distributions for the English portions of both ZTTS1-Eval sets.",
     "zh": "图 7：ZTTS1-Eval 两个集合英文部分的 Allosaurus SR 分布。"
    }
   ]
  }
 ],
 "annotations": [
  {
   "id": "ann-001",
   "anchor": {
    "sentence_id": "s-abstract-2-3",
    "quote": "1.6B to 8B total parameters (900M active)"
   },
   "kind": "number",
   "title": "8B 总参只激活 900M",
   "explanation": "这组数字是全文的核心权衡：8B 总参数提供容量，900M 激活参数决定每次前向的实际算力与延迟。MoE 的价值正在于把这两个数字解耦——稠密 8B 模型做流式 TTS 基本不可行，而 900M 激活量级已接近很多端侧可部署模型。但要注意，8B 总参仍要全部加载进显存，省的是 FLOPs 不是内存，「推理友好」仅限于算力维度。",
   "explanation_plain": "模型有 8B 个参数但每次只用 900M，所以推理不算贵，但显存占用仍按 8B 算。",
   "featured": true
  },
  {
   "id": "ann-002",
   "anchor": {
    "sentence_id": "s-abstract-2-4",
    "quote": "200K to over 6M hours"
   },
   "kind": "number",
   "title": "30 倍数据扩张",
   "explanation": "从上代 200K 小时到 6M+ 小时，约 30 倍扩张，相当于 700 年音频。这个量级已经超出任何精标方案，只能靠第三节的多 ASR 集成自动清洗撑起来——也就是说，数据规模、数据管线、最终质量三者是绑定的：没有 ASR 一致性过滤，6M 小时里的大量错对齐音频会直接毒化模型。评估这个「规模故事」时要意识到，真正的贡献有一半在数据工程而非模型本身。",
   "featured": true
  },
  {
   "id": "ann-003",
   "anchor": {
    "sentence_id": "s-I-3-1",
    "quote": "raw byte tokenization"
   },
   "kind": "motivation",
   "title": "为什么扔掉音素",
   "explanation": "上代 Zonos-v0.1 用音素输入，音素化是强归纳偏置，小数据时加速收敛；但 G2P 管线对低资源语言、语码混合、罕见词覆盖差，且出错是静默的——下游模型拿到错的音素序列却毫不知情。换成 UTF-8 字节后表示完全通用、无预处理失败点，代价是序列变长、模型要自己学字节到发音的映射。论文的判断是：规模够大时，归纳偏置从助力变成天花板。这个判断与 Whisper 用 BPE 取代音素、ASR 界普遍去音素化的趋势一致。",
   "featured": true
  },
  {
   "id": "ann-004",
   "anchor": {
    "sentence_id": "s-II-B-2-7",
    "quote": "silent"
   },
   "kind": "critique",
   "title": "静默失败最危险",
   "explanation": "表 I 的三个 G2P 失败案例——中文片段被按英语规则处理、retro 被形态规则错配成 retroretrovirus、Satoshi 被西班牙语音素清单压成 Satosi——共同点是「静默」：管线不报错，错误直接混进训练数据。这比显性 bug 难发现得多，因为你无法在损失曲线上看到它。这段话实际是在为字节级输入做论证：任何前置的、不可微的、按语言分叉的预处理管线都是故障源，端到端吃掉原始字节反而把故障域收敛到模型内部。",
   "explanation_plain": "G2P 出错不报警，错误悄悄进训练集；不如让模型直接读字节，省掉这层会偷偷出错的预处理。"
  },
  {
   "id": "ann-005",
   "anchor": {
    "sentence_id": "s-II-B-3-1",
    "quote": "diminishes with scale"
   },
   "kind": "concept",
   "title": "归纳偏置随规模贬值",
   "explanation": "这句是整个文本分词节的立论：音素化这类人工先验在小模型小数据时是「拐杖」，加速早期收敛；但随数据与模型规模增长，模型自己学映射的能力超过了先验能提供的增益，先验反而因覆盖不全、静默失败成为上限。这与语音识别从音素建模转向端到端字素/BPE 建模的历史完全同构——规模扩大到一定程度，「去掉领域知识」本身就是最强的领域知识。论文给了对照：字节级变体先追平、后超过音素基线。",
   "featured": true
  },
  {
   "id": "ann-006",
   "anchor": {
    "sentence_id": "s-II-A-2-3",
    "quote": "j + 1 at audio frame t is generated immediately after the token for codebook j at the same frame"
   },
   "kind": "concept",
   "title": "延迟模式一箭双雕",
   "explanation": "RVQ 的 9 个码本同帧存在依赖（粗到精），朴素做法是每帧串行预测 9 次，延迟直接乘 9。MusicGen 提出的延迟模式把码本 j 右移 j 帧，把「帧内码本依赖」转成「序列位置依赖」，同一帧的码本 token 在序列上相邻生成，既保依赖又可并行。这是 ZONOS2 流式延迟可接受的结构性前提，但注意它把码本预测与延迟模式耦合死了——第七节自陈的大量训练不稳定正源于此。",
   "featured": true
  },
  {
   "id": "ann-007",
   "anchor": {
    "sentence_id": "s-II-A-3-1",
    "quote": "lookahead buffer of N −1 generated frames"
   },
   "kind": "engineering",
   "title": "流式延迟的隐藏项",
   "explanation": "延迟模式不是免费的：码本 j 右移 j 帧，意味着要等 N−1=8 帧之后，某个对齐帧的 9 个码本才凑齐、才能送 DAC 解码出波形。按 DAC 44.1kHz 的帧率换算，这是固定在管线里的约百毫秒级前瞻延迟，与模型大小、硬件快慢无关，换 GPU 也压不掉。评估「流式延迟良好」的宣称时，要把这个结构下限与 MoE 带来的计算加速分开看——前者是架构决定的硬底。",
   "explanation_plain": "为了并行生成 9 层码本，必须多等 8 帧才能出声，这段延迟是结构写死的。"
  },
  {
   "id": "ann-008",
   "anchor": {
    "sentence_id": "s-II-C-2-4",
    "quote": "single 2048-dimensional vector can capture nearly all of the desired speaker characteristics"
   },
   "kind": "concept",
   "title": "高带宽是双刃剑",
   "explanation": "2048 维说话人嵌入的好处与麻烦是同一枚硬币：带宽高，所以几乎无损地刻画说话人，零样本克隆保真度高；但也正因为带宽高，参考音频的时长、噪声、词汇内容、停顿位置全被编码进去，模型照单全收。这一节后面三段的 LDA 降维、两阶段退火、随机裁剪，全是在给这个「信息太多」的原始设计打补丁。选型时的教训：条件表示不是越rich越好，与训练目标匹配的信息量才是关键。",
   "featured": true
  },
  {
   "id": "ann-009",
   "anchor": {
    "sentence_id": "s-II-C-6-3",
    "quote": "offers the model a shortcut"
   },
   "kind": "critique",
   "title": "说话人嵌入成了作弊通道",
   "explanation": "这是本文最诚实的失败分析之一：说话人嵌入从目标语句的真实录音算出，里面的词汇内容与停顿时机是「答案泄漏」——模型直接读嵌入就能降低损失，不必学文本到语音的映射，于是迅速过拟合，推理时出现静音或「胡言乱语」。这类捷径学习在任何「以目标为条件」的生成任务里都普遍存在（TTS、语音转换、甚至图像修复），识别捷径存在往往比设计对策更难。本文的对策（LDA + 随机裁剪 + 损失掩码）值得借镜。",
   "featured": true
  },
  {
   "id": "ann-010",
   "anchor": {
    "sentence_id": "s-II-C-6-6",
    "quote": "could not take enough training steps"
   },
   "kind": "motivation",
   "title": "为什么必须做 LDA",
   "explanation": "这句话给出了 LDA 投影的真实动机，而不是教科书式的「降维去噪」：不做 LDA，模型还没来得及学会克隆就过拟合了，可用训练步数被嵌入泄漏的信息量直接锁死。LDA 用说话人标签数据估计，保留说话人间方差、衰减说话人内方差（时长/噪声/停顿），等于把嵌入的带宽从 2048 压到 1024 的同时做了一次「信息提纯」，从而延长了安全训练时程。这是「用线性代数换取训练稳定性」的干净案例。",
   "featured": true
  },
  {
   "id": "ann-011",
   "anchor": {
    "sentence_id": "s-II-F-1-2",
    "quote": "top-1 routing, except the final routed layer, which uses top-2"
   },
   "kind": "engineering",
   "title": "非对称路由的稳定性直觉",
   "explanation": "前三层与最后一层用稠密、最后一个 MoE 层用 top-2，这不是理论推导出来的最优结构，而是第四节自陈的「逐案灭火」产物：熵塌缩反复出现后试出来的最稳配置。直觉上首尾层承担输入对齐与输出校准，负载波动最大，交给稠密层更稳；top-1 省算力但加剧赢者通吃，最后一层放宽到 top-2 提供冗余。这提醒我们：MoE 的稳定性配方目前是经验性的，复现时别指望一次调对。",
   "explanation_plain": "哪层稠密、哪层 top-2，是作者被训练崩溃逼出来试出来的，不是算出来的。"
  },
  {
   "id": "ann-012",
   "anchor": {
    "sentence_id": "s-III-3-5",
    "quote": "set low during pre-training"
   },
   "kind": "engineering",
   "title": "过滤阈值随阶段收紧",
   "explanation": "多 ASR 集成的精髓不在「多模型投票更准」，而在阈值可调：预训练期阈值放低，保数据多样性，让模型见多识广；退火期阈值收紧，只用高一致性数据塑形最终品性。这与课程学习的精神一致——先杂后精。工程上的关键细节是同一 utterance 在不同时期可换用不同 ASR 的转写，防止模型过拟合到单一转写风格。整套机制复用价值高：任何用「机器打标 + 质量分阶段收紧」的语音训练管线都可照搬。",
   "featured": true
  },
  {
   "id": "ann-013",
   "anchor": {
    "sentence_id": "s-IV-A-7-1",
    "quote": "collapsed to as low as 0.6"
   },
   "kind": "number",
   "title": "熵塌缩到 0.6 意味着什么",
   "explanation": "16 个专家的均匀路由归一化熵为 1，0.6 意味着路由分布严重偏斜——大部分 token 涌向少数专家，其余专家接近闲置，等效激活容量远低于名义 900M，而且「不经干预就一直停在那里」，说明负载均衡损失本身拉不回来，作者被迫手动调路由器与偏置的学习率。这暴露了 MoE 训练最现实的一面：理论上优雅的条件计算，实践中要配上持续的熵监控与人工干预，自动化程度远低于稠密训练。",
   "explanation_plain": "16 个专家本该轮流干活，熵掉到 0.6 说明几个专家包办了所有 token，模型白长了参数。"
  },
  {
   "id": "ann-014",
   "anchor": {
    "sentence_id": "s-IV-A-7-5",
    "quote": "substantially harder than on text data, for reasons we do not fully understand"
   },
   "kind": "critique",
   "title": "坦白背后的研究空白",
   "explanation": "作者直接承认不知道为什么音频 MoE 比文本 MoE 难均衡，并给出三个猜测：延迟 DAC token 的固有难度、高帧率音频与低帧率文本的对齐压力、音频数据的统计特性。这种坦白在工业技术报告里少见且有价值——它点出一个真实的研究空白：LLM 时代积累的 MoE 工程经验（均衡损失、路由器设计）迁移到音频 token 时并不直接成立。对复现者，这句话是预警：别把文本 MoE 的超参直觉带过来。",
   "featured": true
  },
  {
   "id": "ann-015",
   "anchor": {
    "sentence_id": "s-IV-C-2-4",
    "quote": "random crop of the target audio"
   },
   "kind": "engineering",
   "title": "随机裁剪切断捷径",
   "explanation": "第一阶段退火只对目标音频的随机裁剪段算嵌入、并对该段掩码损失——既然嵌入信息来自哪段音频是随机的、且该段不产生损失，模型「从嵌入读答案」的激励就被拆掉了。第二阶段再让嵌入覆盖整段、去掉掩码，把整段输出绑定到条件说话人。两阶段配合是「先防作弊、再学绑定」的次序设计，背后是清晰的因果链：可用训练时程 ← 泄漏信息量 ← 嵌入计算范围。这个小技巧对任何条件生成模型的防过拟合都有参考价值。",
   "featured": true
  },
  {
   "id": "ann-016",
   "anchor": {
    "sentence_id": "s-V-4-4",
    "quote": "to 24 languages"
   },
   "kind": "comparison",
   "title": "语言数不是唯一维度",
   "explanation": "MiniMax-ML 覆盖 24 种语言，数字上超过 ZTTS1-Eval 的 17 种，但作者指出的差距在别处：每语言只有 2 条参考提示、只报 WER 与说话人相似度、无自发语音、评分栈照旧。基准的质量取决于「测什么、用什么打分、音频是否代表现实」，而非语言计数。这一节实质是在论证：TTS 评测的瓶颈已从覆盖度转向测量学（metrics）——模型可懂度逼近人类后，WER 失去区分度，韵律分布与生成多样性才是新的分水岭。",
   "explanation_plain": "别被「24 种语言」唬住：提示只有 2 条、只测 WER，测不出新一代 TTS 的真实差距。"
  },
  {
   "id": "ann-017",
   "anchor": {
    "sentence_id": "s-V-8-2",
    "quote": "We cannot speak to whether any of the comparable models"
   },
   "kind": "critique",
   "title": "无法排除的训练污染",
   "explanation": "作者声明 ZONOS2 刻意不在 ZTTS1-Eval 的音频上训练，但同时承认无法核实闭源对手是否训过这些数据——而 ZTTS1-Eval 的 Clean 集来自公开语料 FLEURS-R，ITW 集来自公开的 VoxBlink2，被商用系统吃进训练集是完全可能的。这意味着表 III/IV 的横向对比存在系统性不确定：对手若训过评测集，其数字虚高。厂商自建基准的固有困境正在于此——诚实声明值得肯定，但「干净对照」只有作者自己一方成立，所有跨模型排名都应打折阅读。",
   "featured": true
  },
  {
   "id": "ann-019",
   "anchor": {
    "sentence_id": "s-VII-A-1-1",
    "quote": "Multi-Head Attention (MHA) was significantly more stable than GQA"
   },
   "kind": "comparison",
   "title": "质量向速度低头",
   "explanation": "消融显示 MHA 明显比 GQA 更稳、输出质量更高，但最终选了 GQA——纯粹的推理速度考量。这与「MoE 均衡更难」「延迟 DAC 不稳定」共同构成全文的潜台词：ZONOS2 的多个关键架构选择都是质量-速度帕累托上的妥协点，而非质量最优点。作者的猜想也值得注意：高帧率音频与低帧率文本的对齐对注意力的需求不同于文本 NTP——如果成立，LLM 里「GQA 几乎无损」的经验在音频模型上不成立，KV cache 压缩技术在音频侧都要重新验证。",
   "featured": true
  },
  {
   "id": "ann-020",
   "anchor": {
    "sentence_id": "s-VII-B-1-4",
    "quote": "inherent diﬀiculty of delayed DAC token prediction"
   },
   "kind": "critique",
   "title": "不稳定根源的自我指认",
   "explanation": "作者把最终模型的大部分不稳定归因于「延迟 DAC token 预测本身的困难」——也就是说，为压低流式延迟而选的 delay pattern（第二节的一箭双雕）与为保音质而选的高码率 DAC（44.1kHz、9 码本），叠加后成了训练不稳定的主要来源。架构收益与训练代价来自同一个设计选择，这是论文最有信息量的自我批评。「换 codec 稳训练」被列为未来工作，等于承认当前方案的天花板：在更合适的离散音频表示出现前，MoE TTS 的稳定性只能靠稠密头尾层、top-2 收尾这类补丁维持。",
   "featured": true
  },
  {
   "id": "ann-021",
   "anchor": {
    "sentence_id": "s-VII-C-1-1",
    "quote": "glossolalia"
   },
   "kind": "concept",
   "title": "失败模式长什么样",
   "explanation": "说话人嵌入因果泄漏的推理症状非常具体：要么全静音，要么「胡言乱语」式的含混 babble——模型生成的不再是任何语言，只是像语音的声音。这与 ASR 里 Whisper 的幻觉/重复循环是同类现象：自回归模型一旦依赖了训练期的捷径特征，推理时条件分布失配就会以「看似合理实则崩坏」的方式爆发，而不是优雅降级。对部署方：TTS 系统的健康监控不能只看是否出声，还要对输出做 ASR 回验（WER 探测），才能抓住 glossolalia 这类静默崩坏。",
   "explanation_plain": "模型学歪了不会报错，而是输出「像人话的噪音」，必须拿 ASR 回听才能发现。"
  }
 ]
};
