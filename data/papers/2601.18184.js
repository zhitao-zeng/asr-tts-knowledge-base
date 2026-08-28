// 自动生成：2601.18184 全文双语精读数据（由 tools/compile_paper.js 装配）
// 结构/原文来自 .cache/papers/2601.18184.json（tools/extract_paper.py）；
// 翻译与讲解来自 .cache/papers/zh/2601.18184/（LLM agent 撰写）。
// 改翻译请改片段后重新装配；勿手改本文件的结构与 original 字段。
globalThis.PAPER_2601_18184 = {
 "paper_id": "2601.18184",
 "model_id": "vibevoice_asr",
 "title": {
  "original": "VIBEVOICE-ASR Technical Report",
  "zh": "VibeVoice-ASR 技术报告"
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
       "original": "Zhiliang Peng∗, Jianwei Yu∗, Yaoyao Chang∗, Zilong Wang∗, Li Dong∗ Yingbo Hao, Yujie Tu, Chenyu Yang, Wenhui Wang, Songchen Xu, Yutao Sun Hangbo Bao, Weijiang Xu, Yi Zhu, Zehua Wang, Ting Song, Yan Xia, Zewen Chi Shaohan Huang, Liang Wang, Chuang Ding, Shuai Wang, Xie Chen, Furu Wei⋄ Microsoft Research https://aka.ms/GeneralAI This report presents VIBEVOICE-ASR, a general-purpose speech understanding framework built upon VIBEVOICE [PYW+25], designed to address the persistent challenges of context fragmentation and multi-speaker complexity in long-form audio (e.g., meetings, podcasts) that remain despite recent advancements in short-form speech recognition."
      },
      {
       "id": "s-front-1-2",
       "original": "Unlike traditional pipelined approaches that rely on audio chunking, VIBEVOICE-ASR supports single-pass processing for up to 60 minutes of audio."
      },
      {
       "id": "s-front-1-3",
       "original": "It unifies Automatic Speech Recognition, Speaker Diarization, and Timestamping into a single end-to-end generation task."
      },
      {
       "id": "s-front-1-4",
       "original": "In addition, VIBEVOICE-ASR supports over 50 languages, requires no explicit language setting, and natively handles code-switching within and across utterances."
      },
      {
       "id": "s-front-1-5",
       "original": "Furthermore, we introduce a prompt-based context injection mechanism that allows users to supply customized conetxt, significantly improving accuracy on domain-specific terminology and polyphonic character disambiguation."
      }
     ]
    },
    {
     "id": "p-front-2",
     "type": "paragraph",
     "page": 1,
     "sentences": [
      {
       "id": "s-front-2-1",
       "original": "Code: github.com/microsoft/VibeVoice Demo: aka.ms/VibeVoice-ASR HuggingFace Models Transformers Release Microsoft Foundry DER (Diarization Error Rate) ↓ VibeVoice-ASR Gemini-2.5-Pro Gemini-3-Pro"
      }
     ]
    },
    {
     "id": "eq-front-1",
     "type": "equation",
     "page": 1,
     "original": "50 46.23 43.04 45 38.75 40 32.96 35 31.6 30 23.54 23.79 22.03 25 20 16.29 15.32 11.92 13.43 15 10.92 6.77 10 3.42 5 0"
    },
    {
     "id": "p-front-3",
     "type": "paragraph",
     "page": 1,
     "sentences": [
      {
       "id": "s-front-3-1",
       "original": "AISHELL4 AMI_IHM AMI_SDM AliMeeting MLC tcpWER (Time-Constrained Permutation WER)↓ VibeVoice-ASR Gemini-2.5-Pro Gemini-3-Pro"
      }
     ]
    },
    {
     "id": "eq-front-2",
     "type": "equation",
     "page": 1,
     "original": "70 63.65 64.86 65.61 58.81 60 54.17 53.49 50 35.96 38.35 41.39 40 29.8 29.51 28.9 30 25.35 20.82 15.66 20 10 0"
    },
    {
     "id": "p-front-4",
     "type": "paragraph",
     "page": 1,
     "sentences": [
      {
       "id": "s-front-4-1",
       "original": "AISHELL4 AMI_IHM AMI_SDM AliMeeting MLC"
      }
     ]
    },
    {
     "id": "fig-front-1",
     "type": "figure_caption",
     "page": 1,
     "original": "Figure 1: VIBEVOICE-ASR sets a new state-of-the-art for long-form speech understanding, consistently outperforming strong closed-source multimodal models (Gemini-2.5/3-Pro) across five public benchmarks. The results demonstrate superior accuracy in both speaker attribution (DER) and time-aligned transcription (tcpWER), particularly in complex multi-speaker environments."
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
       "original": "Recent years have witnessed a paradigm shift in speech processing, driven by the integration of Large Language Models (LLMs) with acoustic encoders [CXZ+23].",
       "zh": "近年来，大语言模型（LLM）与声学编码器的结合 [CXZ+23] 推动了语音处理的一次范式转变。"
      },
      {
       "id": "s-1-1-2",
       "original": "While these large audio models ∗Core contributors. ⋄Contact person: fuwei@microsoft.com.",
       "zh": "尽管这些大规模音频模型 ∗核心贡献者。⋄通讯作者：fuwei@microsoft.com。"
      }
     ]
    },
    {
     "id": "p-1-2",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-1-2-1",
       "original": "A S Rich Transcription Who When What Welcome to Vibe…",
       "zh": "S 富转录（Rich Transcription） 谁 何时 说了什么 欢迎来到 Vibe…"
      }
     ]
    },
    {
     "id": "eq-1-1",
     "type": "equation",
     "page": 2,
     "original": "Speaker 1, 0 ~ 10.25, Speaker 2, 10.3 ~ 33.33,"
    },
    {
     "id": "p-1-3",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-1-3-1",
       "original": "Nice to meet…",
       "zh": "…"
      }
     ]
    },
    {
     "id": "eq-1-2",
     "type": "equation",
     "page": 2,
     "original": "…"
    },
    {
     "id": "p-1-4",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-1-4-1",
       "original": "Speaker N, 3575.5 ~ 3600, Let’s …",
       "zh": "说话人 N，3575.5 ~ 3600，让我们…"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-vibevoice-asr",
   "num": null,
   "level": 1,
   "page": 2,
   "title": {
    "original": "VibeVoice - ASR",
    "zh": "VibeVoice - ASR"
   },
   "blocks": [
    {
     "id": "eq-vibevoice-asr-1",
     "type": "equation",
     "page": 2,
     "original": "+"
    },
    {
     "id": "p-vibevoice-asr-1",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-vibevoice-asr-1-1",
       "original": "A S Optional Context 60-minute Long-form Audio <begin>",
       "zh": "（图 1 标签：+ A / S；可选上下文（Optional Context）；60 分钟长音频（60-minute Long-form Audio）；<begin>。）"
      }
     ]
    },
    {
     "id": "fig-vibevoice-asr-1",
     "type": "figure_caption",
     "page": 2,
     "original": "Figure 2: The architectural overview of VIBEVOICE-ASR. VIBEVOICE-ASR processes 60-minute long-form audio in a single pass by ingesting continuous latents from dual-tokenizers alongside optional user-provided context. The output is a generated stream of Rich Transcription, explicitly interleaving Speaker ID (Who), Timestamps (When), and Content (What)",
     "zh": "图 2：VIBEVOICE-ASR 的架构总览。VIBEVOICE-ASR 通过同时摄入双分词器输出的连续潜向量与用户可选提供的上下文，在单趟内处理 60 分钟的长音频。输出是一条生成的富转录（Rich Transcription）流，显式地交错排列说话人 ID（谁）、时间戳（何时）与内容（什么）。"
    },
    {
     "id": "p-vibevoice-asr-2",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-vibevoice-asr-2-1",
       "original": "have achieved remarkable success in short-form speech recognition, transcribing and analyzing longform audio—such as hour-long meetings, podcasts, and academic lectures—remains a formidable challenge.",
       "zh": "尽管这批模型在短音频语音识别上取得了显著成功，转写和分析长音频——例如一小时长的会议、播客和学术讲座——仍然是一项艰巨的挑战。"
      }
     ]
    },
    {
     "id": "p-vibevoice-asr-3",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-vibevoice-asr-3-1",
       "original": "The prevailing approach to long-form audio involves cascaded pipelines that segment continuous speech into short clips (typically < 30 seconds) for independent processing [HSW+24, BHHZ23, BYC+20].",
       "zh": "目前处理长音频的主流做法是级联流水线：先把连续语音切成短片段（通常不足 30 秒），再分别独立处理 [HSW+24, BHHZ23, BYC+20]。"
      },
      {
       "id": "s-vibevoice-asr-3-2",
       "original": "While practical, this \"divide-and-conquer\" strategy suffers from two fundamental limitations: Context Fragmentation and Pipeline Complexity.",
       "zh": "这种「分而治之」策略虽然实用，但存在两个根本性缺陷：上下文碎片化与流水线复杂性。"
      },
      {
       "id": "s-vibevoice-asr-3-3",
       "original": "First, independently processing segments severs global semantic dependencies, causing the model to lose track of cross-sentence context, which is fatal for disambiguating homophones or resolving coreferences in extended dialogue.",
       "zh": "其一，各片段独立处理切断了全局语义依赖，模型无法追踪跨句子的上下文，而这对消歧同音词或消解长对话中的指代是致命的。"
      },
      {
       "id": "s-vibevoice-asr-3-4",
       "original": "Second, traditional systems treat Automatic Speech Recognition (ASR), Speaker Diarization, and Timestamping as separate tasks managed by disjoint models.",
       "zh": "其二，传统系统把自动语音识别（ASR）、说话人分离（diarization）和时间戳预测当作三个彼此独立的任务，分别由不同模型负责。"
      },
      {
       "id": "s-vibevoice-asr-3-5",
       "original": "Reconciling their outputs often requires complex heuristics, leading to error propagation where a failure in segmentation or diarization corrupts the final transcript.",
       "zh": "对齐这些模块的输出往往需要复杂的启发式规则，从而导致误差传播——分段或说话人分离中的一次失败就会污染最终转录稿。"
      }
     ]
    },
    {
     "id": "p-vibevoice-asr-4",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-vibevoice-asr-4-1",
       "original": "To bridge this gap, we introduce VIBEVOICE-ASR, a unified, general-purpose framework designed for high-fidelity long-form speech understanding.",
       "zh": "为了弥合这一差距，我们提出 VIBEVOICE-ASR：一个面向高保真长音频语音理解的统一、通用框架。"
      },
      {
       "id": "s-vibevoice-asr-4-2",
       "original": "Built upon the VibeVoice architecture [PYW+25], our system fundamentally abandons the sliding-window paradigm in favor of a single-pass approach.",
       "zh": "该系统基于 VibeVoice 架构 [PYW+25] 构建，从根本上抛弃了滑动窗口范式，转而采用单趟（single-pass）处理。"
      },
      {
       "id": "s-vibevoice-asr-4-3",
       "original": "By leveraging an ultra-low frame rate tokenizer (7.5 Hz), VIBEVOICE-ASR compresses an hour of audio into a sequence length that fits comfortably within the context window of modern LLMs.",
       "zh": "借助一种超低帧率的分词器（7.5 Hz），VIBEVOICE-ASR 把一小时的音频压缩成一段可以轻松放入现代 LLM 上下文窗口的序列。"
      },
      {
       "id": "s-vibevoice-asr-4-4",
       "original": "This allows the model to attend to the entire global context of a 60-minute session simultaneously, ensuring semantic coherence and consistent speaker tracking without the need for external clustering algorithms.",
       "zh": "这使模型能够同时关注一场 60 分钟会话的全部全局上下文，保证语义连贯与一致的说话人追踪，而无需任何外部聚类算法。"
      },
      {
       "id": "s-vibevoice-asr-4-5",
       "original": "Concurrent with the development of VIBEVOICE-ASR, a number of related research efforts have emerged [HSZ26, YCD+25, SXF+25, YLY+26].",
       "zh": "在 VIBEVOICE-ASR 研发的同时，也涌现出一批相关研究工作 [HSZ26, YCD+25, SXF+25, YLY+26]。"
      },
      {
       "id": "s-vibevoice-asr-4-6",
       "original": "Nevertheless, the majority of these works have not made their models publicly available.",
       "zh": "不过，这些工作中的大多数并未公开其模型。"
      }
     ]
    },
    {
     "id": "p-vibevoice-asr-5",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-vibevoice-asr-5-1",
       "original": "VIBEVOICE-ASR reformulates long-form transcription as an end-to-end generation task, as shown in Figure 2.",
       "zh": "如 Figure 2 所示，VIBEVOICE-ASR 把长音频转录重新表述为一个端到端的生成任务。"
      },
      {
       "id": "s-vibevoice-asr-5-2",
       "original": "Instead of outputting plain text, it generates a structured Rich Transcription stream that explicitly interleaves speaker identities (“Who\"), precise timestamps (“When\"), and speech content (“What\").",
       "zh": "它不输出纯文本，而是生成一条结构化的富转录（Rich Transcription）流，显式地交错编码说话人身份（「谁」）、精确时间戳（「何时」）和语音内容（「什么」）。"
      },
      {
       "id": "s-vibevoice-asr-5-3",
       "original": "Furthermore, acknowledging the diverse needs of real-world applications, we introduce a prompt-based context injection mechanism.",
       "zh": "此外，考虑到真实应用中的多样化需求，我们引入了一种基于提示（prompt）的上下文注入机制。"
      },
      {
       "id": "s-vibevoice-asr-5-4",
       "original": "This allows users to supply customized context—ranging from hotword lists to background descriptions—significantly enhancing the model’s ability to recognize domain-specific terminology and handle complex code-switching scenarios.",
       "zh": "它允许用户提供自定义上下文——从热词列表到背景描述——显著增强模型识别领域专有术语以及处理复杂语码混合（code-switch）场景的能力。"
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
    "original": "Method",
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
    "original": "Overview",
    "zh": "概览"
   },
   "blocks": [
    {
     "id": "fig-2-1-1",
     "type": "figure_caption",
     "page": 3,
     "original": "Figure 2 presents the architectural overview of VIBEVOICE-ASR. We formulate long-form speech understanding as a language modeling task. The model takes a sequence of continuous audio embeddings, encoded from from the pre-trained Acoustic and Semantic encoders, as its primary input. To enable context-aware capabilities, optional text prompts (e.g., hotwords or background information) can be prepended to the audio sequence.",
     "zh": "Figure 2 展示了 VIBEVOICE-ASR 的架构总览。我们把长音频语音理解表述为一个语言建模任务。模型以一串连续音频嵌入作为主要输入，这些嵌入由预训练的声学（Acoustic）与语义（Semantic）编码器编码得到。为获得上下文感知能力，可在音频序列之前拼接可选的文本提示（例如热词或背景信息）。"
    },
    {
     "id": "p-2-1-1",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-2-1-1-1",
       "original": "These inputs are processed by a decoder-only Large Language Model backbone (e.g., Qwen 2.5 [YYZ+24]) to autoregressively generate the target sequence.",
       "zh": "这些输入由一个仅解码器（decoder-only）的大语言模型骨干（如 Qwen 2.5 [YYZ+24]）处理，以自回归方式生成目标序列。"
      },
      {
       "id": "s-2-1-1-2",
       "original": "Distinct from conventional ASR models that output plain text, VIBEVOICE-ASR is designed to produce a Rich Transcription.",
       "zh": "与输出纯文本的传统 ASR 模型不同，VIBEVOICE-ASR 被设计为产出富转录（Rich Transcription）。"
      },
      {
       "id": "s-2-1-1-3",
       "original": "As illustrated in the output stream of Figure 2, the model generates a structured sequence that explicitly interleaves speaker identity (“Who”), temporal boundaries (“When”), and speech content (“What”), enabling simultaneous recognition, diarization, and timestamping in a single pass.",
       "zh": "如 Figure 2 输出流所示，模型生成的结构化序列显式地交错排列说话人身份（「谁」）、时间边界（「何时」）与语音内容（「什么」），从而在单趟内同时完成识别、说话人分离与时间戳预测。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-2-2",
   "num": "2.2",
   "level": 2,
   "page": 3,
   "title": {
    "original": "Speech Tokenizer",
    "zh": "语音分词器"
   },
   "blocks": [
    {
     "id": "p-2-2-1",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-2-2-1-1",
       "original": "In this work, we directly employ the pre-trained dual-tokenizers from VIBEVOICE [PYW+25], which integrates an Acoustic Tokenizer for spectral fidelity and a Semantic Tokenizer for linguistic alignment.",
       "zh": "本工作直接复用来自 VIBEVOICE [PYW+25] 的预训练双分词器：一个声学分词器（Acoustic Tokenizer）负责频谱保真，一个语义分词器（Semantic Tokenizer）负责语言对齐。"
      },
      {
       "id": "s-2-2-1-2",
       "original": "The Acoustic tokenizer, inspired by σ-VAE [SBW+24], applies a hierarchical design with a cumulative 3200× downsampling rate to the 24 kHz input, yielding an extremely compact representation of approximately 7.5 tokens per second.",
       "zh": "声学分词器受 σ-VAE [SBW+24] 启发，采用层级化设计，对 24 kHz 输入施加累计 3200× 的下采样率，得到每秒约 7.5 个 token 的极致紧凑表示。"
      },
      {
       "id": "s-2-2-1-3",
       "original": "Meanwhile, the Semantic module extracts deterministic content features aligned with textual semantics.",
       "zh": "同时，语义模块提取与文本语义对齐的确定性内容特征。"
      },
      {
       "id": "s-2-2-1-4",
       "original": "Note we only use tokenizer encoders here.",
       "zh": "注意，这里只使用两个分词器的编码器部分。"
      },
      {
       "id": "s-2-2-1-5",
       "original": "This ultra-low frame rate is pivotal, as a one-hour continuous audio session translates to:",
       "zh": "这一超低帧率是关键所在：一段一小时的连续音频会话会被换算为："
      }
     ]
    },
    {
     "id": "eq-2-2-1",
     "type": "equation",
     "page": 3,
     "original": "3600 seconds × 7.5 tokens/sec = 27, 000 tokens, (1)"
    },
    {
     "id": "p-2-2-2",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-2-2-2-1",
       "original": "which fits comfortably within the single-pass context window of modern LLMs.",
       "zh": "这个长度可以从容地放进现代 LLM 的单趟上下文窗口之内。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-2-3",
   "num": "2.3",
   "level": 2,
   "page": 3,
   "title": {
    "original": "VIBEVOICE-ASR",
    "zh": "VIBEVOICE-ASR"
   },
   "blocks": []
  },
  {
   "id": "sec-2-3-1",
   "num": "2.3.1",
   "level": 2,
   "page": 3,
   "title": {
    "original": "Pre-training",
    "zh": "预训练"
   },
   "blocks": [
    {
     "id": "p-2-3-1-1",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-2-3-1-1-1",
       "original": "We use the data processing pipeline proposed in VIBEVOICE [PYW+25, YCB+24] to obtain the initial data corpus.",
       "zh": "我们采用 VIBEVOICE [PYW+25, YCB+24] 提出的数据处理流水线来构建初始数据语料。"
      },
      {
       "id": "s-2-3-1-1-2",
       "original": "The pre-training data distribution can be found in Figure 3.",
       "zh": "预训练数据的分布见 Figure 3。"
      },
      {
       "id": "s-2-3-1-1-3",
       "original": "The pipeline consists of three stages: segmentation and transcription, diarization, and quality filtering.",
       "zh": "该流水线包含三个阶段：分段与转录、说话人分离，以及质量过滤。"
      },
      {
       "id": "s-2-3-1-1-4",
       "original": "Long recordings are first segmented using Silero voice activity detection (VAD) into clips of up to 30 seconds, followed by transcription with Whisper-large-v3-turbo [RKX+23] to obtain punctuated text and word-level timestamps; segment boundaries are further refined by splitting at punctuation end timestamps (e.g., [.?!]) to better align with speaker turns.",
       "zh": "长录音首先用 Silero 语音活动检测（VAD）切成最长 30 秒的片段，随后用 Whisper-large-v3-turbo [RKX+23] 转录，得到带标点的文本和词级时间戳；片段边界再按标点结束时间戳（如 [.?!]）做切分精修，以更好地对齐说话人轮换。"
      },
      {
       "id": "s-2-3-1-1-5",
       "original": "Speech diarization is then performed using the vblinkp model from the WeSpeaker toolkit [WLW+23], where speaker embeddings are extracted from overlapping frames (1.5 s window, 0.75 s hop), clustered with HDBSCAN [CMS13], and refined by merging clusters whose centroids have a cosine similarity greater than 0.67, yielding final speaker turn annotations.",
       "zh": "随后用 WeSpeaker 工具包 [WLW+23] 中的 vblinkp 模型做说话人分离：从重叠帧（1.5 秒窗口、0.75 秒步长）中提取说话人嵌入，用 HDBSCAN [CMS13] 聚类，再合并质心余弦相似度大于 0.67 的簇，得到最终的说话人轮换标注。"
      },
      {
       "id": "s-2-3-1-1-6",
       "original": "Finally, to ensure annotation reliability, segments are re-transcribed using a secondary ASR model [XJM+23], and recordings are discarded if more than 30% of segments have a WER exceeding 20%, if speech accounts for less than 60% of the total duration.",
       "zh": "最后，为保证标注可靠性，用第二个 ASR 模型 [XJM+23] 对所有片段做复读转录：若某条录音中超过 30% 的片段 WER 超过 20%，或语音占比低于总时长的 60%，则丢弃该录音。"
      }
     ]
    },
    {
     "id": "p-2-3-1-2",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-2-3-1-2-1",
       "original": "To ensure the effectiveness of the data processing pipeline, we conducted a comparative study between our pipeline and two widely adopted audio processing pipelines, WhisperX [BHHZ23] and Emilia [HSW+24].",
       "zh": "为验证该数据处理流水线的有效性，我们把它与两条被广泛采用的音频处理流水线——WhisperX [BHHZ23] 和 Emilia [HSW+24]——做了对比研究。"
      },
      {
       "id": "s-2-3-1-2-2",
       "original": "The evaluation is performed on three commonly used public multi-speaker meeting datasets—AMI [CAB+05], AliMeeting [YZF+22], and AISHELL-4 [FCL+21]—and reports both diarization error rate (DER) and diarization invariant word error rate (WER).",
       "zh": "评测在三个常用的公开多说话人会议数据集——AMI [CAB+05]、AliMeeting [YZF+22] 和 AISHELL-4 [FCL+21]——上进行，同时报告说话人分离错误率（DER）与说话人分离不变词错误率（WER）。"
      },
      {
       "id": "s-2-3-1-2-3",
       "original": "For a fair comparison, we disable the data-filtering module in Emilia, as its default configuration removes a substantial portion of the audio samples.",
       "zh": "为公平比较，我们关闭了 Emilia 的数据过滤模块，因为其默认配置会移除相当一部分音频样本。"
      }
     ]
    },
    {
     "id": "p-2-3-1-3",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-2-3-1-3-1",
       "original": "As shown in Table 1, the proposed data pipeline consistently achieves lower DER and WER than both baseline systems across the majority of evaluated datasets.",
       "zh": "如 Table 1 所示，我们提出的数据流水线在绝大多数评测数据集上都取得了比两条基线更低的 DER 和 WER。"
      },
      {
       "id": "s-2-3-1-3-2",
       "original": "These results indicate that our pipeline provides more robust segmentation, diarization, and transcription performance under diverse acoustic conditions.",
       "zh": "这些结果表明，在多样的声学条件下，我们的流水线提供了更鲁棒的分段、说话人分离与转录性能。"
      }
     ]
    },
    {
     "id": "tab-2-3-1-1",
     "type": "table_caption",
     "page": 4,
     "original": "Table 1: DER and WER comparison across different data pipelines. Model AISHELL4 AMI-IHM AMI-SDM AliMeeting DER WER DER WER DER WER DER WER",
     "zh": "表 1：不同数据管线下的 DER 与 WER 对比。表头：Model × AISHELL4（DER/WER）× AMI-IHM（DER/WER）× AMI-SDM（DER/WER）× AliMeeting（DER/WER）。"
    },
    {
     "id": "p-2-3-1-4",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-2-3-1-4-1",
       "original": "WhisperX",
       "zh": "为验证该数据处理流水线的有效性，我们把它与两条被广泛采用的音频处理流水线——WhisperX [BHHZ23] 和 Emilia [HSW+24]——做了对比研究。"
      }
     ]
    },
    {
     "id": "eq-2-3-1-1",
     "type": "equation",
     "page": 4,
     "original": "14.55 29.69 18.27 24.12 23.05 39.65 35.53 36.62"
    },
    {
     "id": "eq-2-3-1-2",
     "type": "equation",
     "page": 4,
     "original": "Emilia"
    },
    {
     "id": "eq-2-3-1-3",
     "type": "equation",
     "page": 4,
     "original": "16.58 49.40 35.44 47.85 46.55 61.70 25.57 54.27"
    },
    {
     "id": "eq-2-3-1-4",
     "type": "equation",
     "page": 4,
     "original": "Ours pipeline"
    },
    {
     "id": "eq-2-3-1-5",
     "type": "equation",
     "page": 4,
     "original": "16.93 18.99 15.46 23.22 17.78 28.40 25.34 30.82"
    },
    {
     "id": "p-2-3-1-5",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-2-3-1-5-1",
       "original": "We employed a curriculum learning strategy for the LLM input sequence length, progressively increasing from 8,192 to 65,536 tokens.",
       "zh": "我们对 LLM 输入序列长度采用课程学习策略，从 8,192 逐步增加到 65,536 个 token。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-2-3-2",
   "num": "2.3.2",
   "level": 2,
   "page": 4,
   "title": {
    "original": "Supervised Fine-Tuning (SFT)",
    "zh": "监督微调（SFT）"
   },
   "blocks": [
    {
     "id": "p-2-3-2-1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-2-3-2-1-1",
       "original": "Since the pre-training stage predominantly relies on pseudo-labeled data, the SFT phase is critical for aligning the model with precise instruction-following behaviors.",
       "zh": "由于预训练阶段主要依赖伪标注数据，SFT（监督微调）阶段对于让模型对齐精确的指令遵循行为至关重要。"
      },
      {
       "id": "s-2-3-2-1-2",
       "original": "We carefully curate a high-quality dataset composition strategy, categorized into three distinct sources:",
       "zh": "我们精心设计了一套高质量数据集配比策略，分为三个不同来源："
      }
     ]
    }
   ]
  },
  {
   "id": "sec-high-quality-speech-and-music-be",
   "num": null,
   "level": 2,
   "page": 4,
   "title": {
    "original": "High-Quality Speech and Music Benchmarks.",
    "zh": "高质量语音与音乐基准。"
   },
   "blocks": [
    {
     "id": "p-high-quality-speech-and-music-be-1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-high-quality-speech-and-music-be-1-1",
       "original": "To establish a robust baseline for conversational speech recognition and speaker diarization, we utilize established datasets including the training splits of MLC-SLM [MGS+25] and Fisher [CMW04].",
       "zh": "为会话语音识别与说话人分离建立坚实的基线，我们使用了一批成熟数据集，包括 MLC-SLM [MGS+25] 与 Fisher [CMW04] 的训练集划分。"
      },
      {
       "id": "s-high-quality-speech-and-music-be-1-2",
       "original": "These provide high quality labels for multi-speaker interactions.",
       "zh": "这些数据集为多说话人交互提供了高质量的标注。"
      },
      {
       "id": "s-high-quality-speech-and-music-be-1-3",
       "original": "Additionally, we incorporate the open-source synthesized music dataset Muse [JCX+26] as an independent subset.",
       "zh": "此外，我们还引入开源合成音乐数据集 Muse [JCX+26] 作为一个独立子集。"
      },
      {
       "id": "s-high-quality-speech-and-music-be-1-4",
       "original": "The inclusion of this music data allows the model to learn music-specific acoustic features, explicitly optimizing its performance and robustness when handling musical segments.",
       "zh": "音乐数据的加入让模型能够学习音乐特有的声学特征，显式优化其在处理音乐片段时的性能与鲁棒性。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-context-aware-synthetic-data-pip",
   "num": null,
   "level": 2,
   "page": 4,
   "title": {
    "original": "Context-Aware Synthetic Data Pipeline.",
    "zh": "上下文感知的合成数据流水线。"
   },
   "blocks": [
    {
     "id": "p-context-aware-synthetic-data-pip-1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-context-aware-synthetic-data-pip-1-1",
       "original": "A key capability of VIBEVOICE-ASR is utilizing user-provided Contextual Information—ranging from specific entities to complete sentences and background descriptions—to guide recognition.",
       "zh": "VIBEVOICE-ASR 的一项关键能力，是利用用户提供的上下文信息——从特定实体到完整句子乃至背景描述——来引导识别。"
      },
      {
       "id": "s-context-aware-synthetic-data-pip-1-2",
       "original": "To bridge the lack of such paired data in real-world scenarios, we constructed a synthetic pipeline:",
       "zh": "为弥补真实场景中此类配对数据的匮乏，我们构建了一条合成数据流水线："
      }
     ]
    },
    {
     "id": "p-context-aware-synthetic-data-pip-2",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-context-aware-synthetic-data-pip-2-1",
       "original": "• Context-Driven Script Generation: We employ GPT-5 [SFP+25] to generate complex dialogue scripts containing specific entities, technical terms, and cross-lingual content (English, Chinese, and intra-sentential code-switching).",
       "zh": "• 上下文驱动的脚本生成：我们使用 GPT-5 [SFP+25] 生成包含特定实体、技术术语和跨语言内容（英语、中文，以及句内语码混合）的复杂对话脚本。"
      },
      {
       "id": "s-context-aware-synthetic-data-pip-2-2",
       "original": "Crucially, GPT-5 simultaneously generates the corresponding contextual reference text (e.g., keyword lists, related sentences, or background paragraphs) used to prompt the ASR model. • Audio Synthesis: We leverage the VIBEVOICE engine to synthesize high-fidelity multispeaker audio.",
       "zh": "关键在于，GPT-5 会同时生成对应的上下文参考文本（如关键词列表、相关句子或背景段落），作为 ASR 模型的提示。• 音频合成：我们利用 VIBEVOICE 引擎合成高保真多说话人音频。"
      },
      {
       "id": "s-context-aware-synthetic-data-pip-2-3",
       "original": "The synthesis predominantly targets Chinese, English, and complex EnglishChinese code-switching scenarios, fully exploiting VIBEVOICE’s superior capabilities in modeling these specific linguistic distributions and transitions. • Quality Filtering: We perform a closed-loop verification where the synthesized speech is transcribed back; samples exceeding a WER threshold are discarded to prevent noise injection.",
       "zh": "合成主要面向中文、英文以及复杂的中英语码混合场景，充分利用 VIBEVOICE 在刻画这些特定语言分布与语言切换上的优势。• 质量过滤：我们执行闭环校验——把合成语音再转录回来，丢弃 WER 超过阈值的样本，以防注入噪声。"
      },
      {
       "id": "s-context-aware-synthetic-data-pip-2-4",
       "original": "After that, we obtains about 6,000 hours synthesized audio.",
       "zh": "此后，我们获得了约 6,000 小时的合成音频。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-long-form-transcription-restorat",
   "num": null,
   "level": 2,
   "page": 4,
   "title": {
    "original": "Long-Form Transcription Restoration.",
    "zh": "长音频转录修复。"
   },
   "blocks": [
    {
     "id": "p-long-form-transcription-restorat-1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-long-form-transcription-restorat-1-1",
       "original": "Existing high-quality datasets are predominantly short (<30 minutes), creating a distribution shift for long-form applications.",
       "zh": "现有高质量数据集大多偏短（不足 30 分钟），这对长音频应用造成了分布偏移。"
      },
      {
       "id": "s-long-form-transcription-restorat-1-2",
       "original": "While we recall long-duration samples (>50 minutes) from our pre-training corpus, their original transcriptions—derived from our chunk-wise pipelines—also suffer from context fragmentation.",
       "zh": "虽然我们从预训练语料中召回了长时长样本（超过 50 分钟），但其原始转录来自分段流水线，同样受到上下文碎片化的影响。"
      },
      {
       "id": "s-long-form-transcription-restorat-1-3",
       "original": "To address this, we employ GPT-5 as a text refiner to rewrite and merge disjointed transcriptions into coherent, globally consistent long texts (\"Global Semantic Rectification\").",
       "zh": "为此，我们使用 GPT-5 作为文本精修器，把零散割裂的转录改写并合并为连贯、全局一致的长文本（「全局语义修复」）。"
      }
     ]
    },
    {
     "id": "p-long-form-transcription-restorat-2",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-long-form-transcription-restorat-2-1",
       "original": "Furthermore, to handle the non-speech intervals inherent in long-duration recordings, we utilize GPT-Audio2 to automatically annotate these segments with general acoustic tags.",
       "zh": "此外，为处理长录音中固有的非语音间隔，我们利用 GPT-Audio2 自动为这类片段标注通用声学标签。"
      },
      {
       "id": "s-long-form-transcription-restorat-2-2",
       "original": "Specifically, we label events such as [Unintelligible Speech], [Music], [Human Sounds], [Environmental Sounds], [Noise], and [Silence].",
       "zh": "具体标注的事件包括 [Unintelligible Speech]（不可懂语音）、[Music]（音乐）、[Human Sounds]（人声）、[Environmental Sounds]（环境声）、[Noise]（噪声）与 [Silence]（静音）。"
      },
      {
       "id": "s-long-form-transcription-restorat-2-3",
       "original": "This explicit tagging strategy provides direct supervision for non-speech intervals, designed to prevent the model from hallucinating text during silence or background noise.",
       "zh": "这一显式标注策略为非语音区间提供了直接监督，旨在防止模型在静音或背景噪声期间凭空幻读出文字。"
      }
     ]
    },
    {
     "id": "p-long-form-transcription-restorat-3",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-long-form-transcription-restorat-3-1",
       "original": "2https://platform.openai.com/docs/models/gpt-4o-audio-preview To balance the VIBEVOICE-ASR’s capabilities across standard recognition, music robustness, context awareness, and long-form coherence, we apply a strategic data mixing ratio.",
       "zh": "2https://platform.openai.com/docs/models/gpt-4o-audio-preview 为在标准识别、音乐鲁棒性、上下文感知与长文本连贯性之间取得平衡，我们采用了战略性的数据混合配比。"
      },
      {
       "id": "s-long-form-transcription-restorat-3-2",
       "original": "Specifically, the sampling weights for Standard Benchmarks, Music Data, Synthetic Data, and Refined Long-Form Data are set",
       "zh": "具体而言，标准基准、音乐数据、合成数据与精修长文本数据的采样权重分别设为 0.5 : 0.1 : 0.1 : 0.3。"
      }
     ]
    },
    {
     "id": "eq-long-form-transcription-restorat-1",
     "type": "equation",
     "page": 4,
     "original": "to 0.5 : 0.1 : 0.1 : 0.3, respectively."
    }
   ]
  },
  {
   "id": "sec-3",
   "num": "3",
   "level": 1,
   "page": 5,
   "title": {
    "original": "Results",
    "zh": "实验结果"
   },
   "blocks": [
    {
     "id": "p-3-1",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-3-1-1",
       "original": "We follow the MeetEval3 evaluation protocol and report four complementary metrics that capture different aspects of multi-speaker transcription quality.",
       "zh": "我们遵循 MeetEval3 评测协议，报告四个互补的指标，分别刻画多说话人转写质量的不同侧面。"
      }
     ]
    },
    {
     "id": "p-3-2",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-3-2-1",
       "original": "Diarization Error Rate (DER) measures the accuracy of speaker attribution by accounting for speaker confusion, missed speech, and false alarm speech, and thus directly evaluates the model’s ability to answer who speaks when.",
       "zh": "说话人分离错误率（DER）通过统计说话人混淆、漏检语音与虚警语音来衡量说话人归属的准确度，因此直接评估模型回答「谁在何时说话」的能力。"
      }
     ]
    },
    {
     "id": "p-3-3",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-3-3-1",
       "original": "Word Error Rate (WER) ignores speaker labels and timing information and computes the standard word-level error rate over the entire transcription, serving as a measure of pure speech recognition accuracy (what) independent of diarization performance.",
       "zh": "词错误率（WER）忽略说话人标签与时间信息，对整段转录计算标准的词级错误率，用来衡量与说话人分离无关的纯语音识别精度（「说了什么」）。"
      }
     ]
    },
    {
     "id": "p-3-4",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-3-4-1",
       "original": "Concatenated minimum-Permutation WER (cpWER) evaluates transcription accuracy under speaker permutation invariance by concatenating all utterances belonging to the same speaker and computing the minimum WER over all possible speaker permutations; this metric jointly reflects content recognition accuracy and speaker consistency, while being insensitive to local time alignment errors.",
       "zh": "拼接最小置换词错误率（cpWER）在说话人置换不变的条件下评估转录准确率：把同一说话人的所有语句拼接起来，在所有可能的说话人置换上取最小 WER；该指标同时反映内容识别精度与说话人一致性，但对局部时间对齐误差不敏感。"
      }
     ]
    },
    {
     "id": "p-3-5",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-3-5-1",
       "original": "Time-Constrained minimum-Permutation WER (tcpWER) further extends cpWER by enforcing temporal alignment constraints, such that words are only matched if they occur within a predefined temporal collar, making tcpWER sensitive to both speaker attribution and word-level timing accuracy and thus jointly evaluating who, what, and when.",
       "zh": "时间约束最小置换词错误率（tcpWER）在 cpWER 基础上进一步施加时间对齐约束：只有当词语出现在预定义的时间容差窗口内时才参与匹配，因此 tcpWER 同时对说话人归属和词级时间精度敏感，从而联合评估「谁、什么、何时」。"
      }
     ]
    },
    {
     "id": "p-3-6",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-3-6-1",
       "original": "We select Gemini-2.5-Pro and Gemini-3-Pro as comparison baselines, as they represent state-of-theart large-scale multimodal foundation models capable of jointly predicting timestamps, speaker labels, and transcription content.",
       "zh": "我们选择 Gemini-2.5-Pro 和 Gemini-3-Pro 作为对比基线，因为它们代表了当前最先进的大规模多模态基础模型，能够联合预测时间戳、说话人标签与转录内容。"
      },
      {
       "id": "s-3-6-2",
       "original": "During our experiments, we observe that Gemini models exhibit substantial timestamp inaccuracies and occasional content hallucinations when processing long-form audio inputs.",
       "zh": "实验中我们观察到，Gemini 模型在处理长音频输入时会出现明显的时间戳不准与偶发的内容幻觉。"
      },
      {
       "id": "s-3-6-3",
       "original": "To ensure a fair and stable comparison, we therefore segment the test audio into 240-second chunks before feeding them to the Gemini models.",
       "zh": "为保证公平且稳定的比较，我们因此在把测试音频喂给 Gemini 模型之前，先把它们切成 240 秒的片段。"
      },
      {
       "id": "s-3-6-4",
       "original": "In contrast, VIBEVOICE-ASR processes the entire audio recording in a single pass, without requiring chunk-wise inference.",
       "zh": "相比之下，VIBEVOICE-ASR 单趟处理整段录音，无需任何分段推理。"
      }
     ]
    },
    {
     "id": "tab-3-1",
     "type": "table_caption",
     "page": 5,
     "original": "Table 2: Overall diarization and ASR results across datasets and languages.",
     "zh": "表 2：跨数据集与跨语言的总体说话人分离与 ASR 结果。表内数值抽取到随后的正文段落中（见 s-3-7-1 上方）。"
    },
    {
     "id": "p-3-7",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-3-7-1",
       "original": "Gemini-2.5-Pro Gemini-3-Pro VIBEVOICE-ASR Dataset Language DER cpWER tcpWER WER DER cpWER tcpWER WER DER cpWER tcpWER WER AISHELL-4 Chinese",
       "zh": "（表 2 表头：Gemini-2.5-Pro / Gemini-3-Pro / VIBEVOICE-ASR × Dataset / Language × DER / cpWER / tcpWER / WER——AISHELL-4 Chinese，后续照原文。）"
      }
     ]
    },
    {
     "id": "eq-3-1",
     "type": "equation",
     "page": 5,
     "original": "15.32 31.59 35.96 22.42 22.03 27.43 54.17 22.75 6.77 24.99 25.35 21.40"
    },
    {
     "id": "eq-3-2",
     "type": "equation",
     "page": 5,
     "original": "AMI-IHM English"
    },
    {
     "id": "eq-3-3",
     "type": "equation",
     "page": 5,
     "original": "23.54 29.57 38.35 18.48 46.23 22.34 63.65 17.61 11.92 20.41 20.82 18.81"
    },
    {
     "id": "eq-3-4",
     "type": "equation",
     "page": 5,
     "original": "AMI-SDM English"
    },
    {
     "id": "eq-3-5",
     "type": "equation",
     "page": 5,
     "original": "23.79 34.78 41.39 22.35 43.04 26.91 64.86 22.09 13.43 28.82 29.80 24.65"
    },
    {
     "id": "eq-3-6",
     "type": "equation",
     "page": 5,
     "original": "AliMeeting Chinese"
    },
    {
     "id": "eq-3-7",
     "type": "equation",
     "page": 5,
     "original": "31.60 41.64 53.49 27.43 38.75 32.84 65.61 26.75 10.92 29.33 29.51 27.40"
    },
    {
     "id": "eq-3-8",
     "type": "equation",
     "page": 5,
     "original": "MLC-Challenge English"
    },
    {
     "id": "eq-3-9",
     "type": "equation",
     "page": 5,
     "original": "20.67 16.23 26.72 9.76 30.88 12.85 57.64 10.19 4.28 11.48 13.02 7.99"
    },
    {
     "id": "eq-3-10",
     "type": "equation",
     "page": 5,
     "original": "French"
    },
    {
     "id": "eq-3-11",
     "type": "equation",
     "page": 5,
     "original": "7.66 23.06 24.60 17.17 40.82 22.02 71.11 18.71 3.80 18.80 19.64 15.21"
    },
    {
     "id": "eq-3-12",
     "type": "equation",
     "page": 5,
     "original": "German"
    },
    {
     "id": "eq-3-13",
     "type": "equation",
     "page": 5,
     "original": "18.19 30.36 39.43 17.76 42.14 23.56 73.86 19.39 1.04 17.10 17.26 16.30"
    },
    {
     "id": "eq-3-14",
     "type": "equation",
     "page": 5,
     "original": "Italian"
    },
    {
     "id": "eq-3-15",
     "type": "equation",
     "page": 5,
     "original": "12.55 16.88 25.20 12.87 23.45 15.59 49.89 13.32 2.08 15.76 15.91 13.91"
    },
    {
     "id": "eq-3-16",
     "type": "equation",
     "page": 5,
     "original": "Japanese"
    },
    {
     "id": "eq-3-17",
     "type": "equation",
     "page": 5,
     "original": "20.40 30.41 37.36 16.58 59.68 21.96 81.41 18.47 0.82 15.33 15.41 14.69"
    },
    {
     "id": "eq-3-18",
     "type": "equation",
     "page": 5,
     "original": "Korean"
    },
    {
     "id": "eq-3-19",
     "type": "equation",
     "page": 5,
     "original": "17.57 19.23 29.81 10.18 39.28 19.39 57.33 11.21 4.52 15.35 16.07 9.65"
    },
    {
     "id": "eq-3-20",
     "type": "equation",
     "page": 5,
     "original": "Portuguese"
    },
    {
     "id": "eq-3-21",
     "type": "equation",
     "page": 5,
     "original": "20.86 30.03 40.20 20.15 39.17 23.29 85.44 20.10 7.98 29.91 31.65 21.54"
    },
    {
     "id": "eq-3-22",
     "type": "equation",
     "page": 5,
     "original": "Russian"
    },
    {
     "id": "eq-3-23",
     "type": "equation",
     "page": 5,
     "original": "5.35 14.26 16.59 10.74 22.76 13.05 51.89 10.31 0.90 12.94 12.98 12.40"
    },
    {
     "id": "eq-3-24",
     "type": "equation",
     "page": 5,
     "original": "Spanish"
    },
    {
     "id": "eq-3-25",
     "type": "equation",
     "page": 5,
     "original": "9.10 13.82 17.49 9.09 25.54 12.11 43.72 9.36 2.67 10.51 11.71 8.04"
    },
    {
     "id": "eq-3-26",
     "type": "equation",
     "page": 5,
     "original": "Thai"
    },
    {
     "id": "eq-3-27",
     "type": "equation",
     "page": 5,
     "original": "15.54 20.84 30.28 14.84 22.09 14.59 39.54 12.03 4.09 14.91 15.57 13.61"
    },
    {
     "id": "eq-3-28",
     "type": "equation",
     "page": 5,
     "original": "Vietnamese"
    },
    {
     "id": "eq-3-29",
     "type": "equation",
     "page": 5,
     "original": "14.65 16.71 27.28 12.33 32.24 13.15 60.43 11.53 0.16 14.57 14.57 14.43"
    },
    {
     "id": "eq-3-30",
     "type": "equation",
     "page": 5,
     "original": "AVERAGE"
    },
    {
     "id": "eq-3-31",
     "type": "equation",
     "page": 5,
     "original": "16.29 20.37 28.90 13.05 32.96 16.38 58.81 13.11 3.42 14.81 15.66 12.07"
    },
    {
     "id": "p-3-8",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-3-8-1",
       "original": "As shown in Table 2, VIBEVOICE-ASR consistently outperforms Gemini-2.5-Pro and Gemini3-Pro in terms of DER and tcpWER across all evaluated datasets, demonstrating substantially stronger speaker modeling and more accurate alignment of speaker turns over time.",
       "zh": "如表 2 所示，VIBEVOICE-ASR 在所有评测数据集上的 DER 与 tcpWER 均持续优于 Gemini-2.5-Pro 与 Gemini-3-Pro，展现出强得多的说话人建模能力和更精确的说话人轮换时间对齐。"
      },
      {
       "id": "s-3-8-2",
       "original": "On the cpWER metric, which more directly reflects the model’s ability to maintain speaker consistency, our model 3https://github.com/fgnt/meeteval achieves the best performance on 11 out of 16 evaluation settings, significantly outperforming both Gemini variants and indicating more reliable speaker differentiation in multi-speaker conditions.",
       "zh": "在 cpWER 这一更直接反映模型保持说话人一致性能力的指标上，我们的模型（脚注 3：https://github.com/fgnt/meeteval）在 16 个评测设置中的 11 个上取得最佳性能，显著优于两个 Gemini 变体，说明其在多说话人条件下有更可靠的说话人区分能力。"
      },
      {
       "id": "s-3-8-3",
       "original": "Regarding WER, our model attains the lowest error rate on 8 out of 16 settings, while exhibiting only marginal degradation on the remaining datasets.",
       "zh": "WER 方面，我们的模型在 16 个设置中的 8 个上取得最低错误率，在其余数据集上仅有轻微退化。"
      },
      {
       "id": "s-3-8-4",
       "original": "Overall, these results indicate that VIBEVOICE- ASR achieves a better balance between content recognition accuracy and robust speaker-aware transcription, with particularly strong advantages in speaker attribution, temporal consistency, and multilingual generalization.",
       "zh": "总体而言，这些结果表明 VIBEVOICE-ASR 在内容识别准确率与鲁棒的说话人感知转写之间取得了更好的平衡，在说话人归属、时间一致性与多语种泛化上优势尤其明显。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-4",
   "num": "4",
   "level": 1,
   "page": 6,
   "title": {
    "original": "Conclusion and Limitations",
    "zh": "结论与局限"
   },
   "blocks": [
    {
     "id": "p-4-1",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-4-1-1",
       "original": "In this report, we presented VIBEVOICE-ASR, a unified single-pass framework that effectively solves context fragmentation in long-form speech understanding.",
       "zh": "在本报告中，我们提出了 VIBEVOICE-ASR，一个统一的单趟处理框架，有效解决了长音频语音理解中的上下文碎片化问题。"
      },
      {
       "id": "s-4-1-2",
       "original": "Beyond technical contributions, we commit to comprehensive open-sourcing, releasing the model weights, fine-tuning pipelines, and high-performance inference code (e.g., vLLM [KLZ+23] support).",
       "zh": "除技术贡献外，我们承诺全面开源，发布模型权重、微调流水线与高性能推理代码（例如对 vLLM [KLZ+23] 的支持）。"
      },
      {
       "id": "s-4-1-3",
       "original": "By democratizing access to these tools, we aim to empower the research community to address the SFT gaps in low-resource languages and adapt the framework to diverse downstream applications, ultimately fostering a more inclusive and advanced speech ecosystem.",
       "zh": "通过普及这些工具的获取，我们希望赋能研究社区去弥合低资源语言上的 SFT 差距，并把该框架适配到多样的下游应用中，最终培育一个更具包容性、更先进的语音生态。"
      }
     ]
    },
    {
     "id": "p-4-2",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-4-2-1",
       "original": "Despite these advancements, VIBEVOICE-ASR has several limitations that guide future research:",
       "zh": "尽管取得了这些进展，VIBEVOICE-ASR 仍存在若干局限，它们指引着未来的研究方向："
      }
     ]
    },
    {
     "id": "p-4-3",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-4-3-1",
       "original": "• Multilingual Forgetting in SFT: While our pre-training covered over 50 languages, the SFT phase predominantly focused on English, Chinese, and code-switching data.",
       "zh": "• SFT 中的多语言遗忘：虽然我们的预训练覆盖了 50 多种语言，但 SFT 阶段主要聚焦于英语、中文与语码混合数据。"
      },
      {
       "id": "s-4-3-2",
       "original": "Consequently, the model may experience performance degradation on low-resource languages absent from the instruction tuning stage.",
       "zh": "因此，模型在那些未进入指令微调阶段的低资源语言上可能出现性能退化。"
      },
      {
       "id": "s-4-3-3",
       "original": "We hope our open-source fine-tuning code will encourage the community to bridge this gap.",
       "zh": "我们希望开源的微调代码能鼓励社区弥合这一差距。"
      }
     ]
    },
    {
     "id": "p-4-4",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-4-4-1",
       "original": "• Overlapping Speech: The current architecture generates a serialized output stream and does not explicitly handle overlapping speech (the \"cocktail party problem\").",
       "zh": "• 重叠语音：当前架构生成的是串行输出流，并不显式处理重叠语音（即「鸡尾酒会问题」）。"
      },
      {
       "id": "s-4-4-2",
       "original": "In scenarios where multiple speakers talk simultaneously, the model tends to transcribe the dominant speaker, potentially missing secondary information.",
       "zh": "在多人同时说话的场景下，模型倾向于只转写占主导的说话人，可能漏掉次要信息。"
      },
      {
       "id": "s-4-4-3",
       "original": "Future iterations will explore separation-aware modeling to address this challenge.",
       "zh": "未来版本将探索具备分离感知能力的建模来应对这一挑战。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-acknowledge",
   "num": null,
   "level": 1,
   "page": 6,
   "title": {
    "original": "Acknowledge",
    "zh": "致谢"
   },
   "blocks": [
    {
     "id": "p-acknowledge-1",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-acknowledge-1-1",
       "original": "We thank Ruibin Yuan, Tao Zhang and Zhengwei Huang for their in-depth discussions during the research and development of VIBEVOICE-ASR.",
       "zh": "感谢 Ruibin Yuan、Tao Zhang 和 Zhengwei Huang 在 VIBEVOICE-ASR 研发过程中提供的深入讨论。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-references",
   "num": null,
   "level": 1,
   "page": 6,
   "title": {
    "original": "References",
    "zh": "References"
   },
   "blocks": [
    {
     "id": "p-references-1",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-references-1-1",
       "original": "[BHHZ23] Max Bain, Jaesung Huh, Tengda Han, and Andrew Zisserman."
      },
      {
       "id": "s-references-1-2",
       "original": "Whisperx: Time-accurate speech transcription of long-form audio. arXiv preprint arXiv:2303.00747, 2023."
      }
     ]
    },
    {
     "id": "p-references-2",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-references-2-1",
       "original": "[BYC+20] Hervé Bredin, Ruiqing Yin, Juan Manuel Coria, Gregory Gelly, Pavel Korshunov, Marvin Lavechin, Diego Fustes, Hadrien Titeux, Wassim Bouaziz, and Marie-Philippe Gill."
      },
      {
       "id": "s-references-2-2",
       "original": "Pyannote. audio: neural building blocks for speaker diarization."
      },
      {
       "id": "s-references-2-3",
       "original": "In ICASSP 2020-2020 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP), pages 7124–7128."
      },
      {
       "id": "s-references-2-4",
       "original": "IEEE, 2020."
      }
     ]
    },
    {
     "id": "p-references-3",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-references-3-1",
       "original": "[CAB+05] Jean Carletta, Simone Ashby, Sebastien Bourban, Mike Flynn, Mael Guillemot, Thomas Hain, Jaroslav Kadlec, Vasilis Karaiskos, Wessel Kraaij, Melissa Kronenthal, et al. The ami meeting corpus: A pre-announcement."
      },
      {
       "id": "s-references-3-2",
       "original": "In International workshop on machine learning for multimodal interaction, pages 28–39."
      },
      {
       "id": "s-references-3-3",
       "original": "Springer, 2005."
      }
     ]
    },
    {
     "id": "p-references-4",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-references-4-1",
       "original": "[CMS13] Ricardo JGB Campello, Davoud Moulavi, and Jörg Sander."
      },
      {
       "id": "s-references-4-2",
       "original": "Density-based clustering based on hierarchical density estimates."
      },
      {
       "id": "s-references-4-3",
       "original": "In Pacific-Asia conference on knowledge discovery and data mining, pages 160–172."
      },
      {
       "id": "s-references-4-4",
       "original": "Springer, 2013."
      }
     ]
    },
    {
     "id": "p-references-5",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-references-5-1",
       "original": "[CMW04] Christopher Cieri, David Miller, and Kevin Walker."
      },
      {
       "id": "s-references-5-2",
       "original": "The fisher corpus: A resource for the next generations of speech-to-text."
      },
      {
       "id": "s-references-5-3",
       "original": "In LREC, volume 4, pages 69–71, 2004."
      }
     ]
    },
    {
     "id": "p-references-6",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-references-6-1",
       "original": "[CXZ+23] Yunfei Chu, Jin Xu, Xiaohuan Zhou, Qian Yang, Shiliang Zhang, Zhijie Yan, Chang Zhou, and Jingren Zhou."
      },
      {
       "id": "s-references-6-2",
       "original": "Qwen-audio: Advancing universal audio understanding via unified large-scale audio-language models. arXiv preprint arXiv:2311.07919, 2023."
      }
     ]
    },
    {
     "id": "p-references-7",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-references-7-1",
       "original": "[FCL+21] Yihui Fu, Luyao Cheng, Shubo Lv, Yukai Jv, Yuxiang Kong, Zhuo Chen, Yanxin Hu, Lei Xie, Jian Wu, Hui Bu, et al. Aishell-4: An open source dataset for speech enhancement, separation, recognition and speaker diarization in conference scenario. arXiv preprint arXiv:2104.03603, 2021."
      }
     ]
    },
    {
     "id": "p-references-8",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-references-8-1",
       "original": "[HSW+24] Haorui He, Zengqiang Shang, Chaoren Wang, Xuyuan Li, Yicheng Gu, Hua Hua, Liwei Liu, Chen Yang, Jiaqi Li, Peiyang Shi, et al. Emilia: An extensive, multilingual, and diverse speech dataset for large-scale speech generation."
      },
      {
       "id": "s-references-8-2",
       "original": "In 2024 IEEE Spoken Language Technology Workshop (SLT), pages 885–890."
      },
      {
       "id": "s-references-8-3",
       "original": "IEEE, 2024."
      }
     ]
    },
    {
     "id": "p-references-9",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-references-9-1",
       "original": "[HSZ26] Mingyue Huo, Yiwen Shao, and Yuheng Zhang."
      }
     ]
    },
    {
     "id": "p-references-10",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-references-10-1",
       "original": "Tagspeech: End-to-end multispeaker asr and diarization with fine-grained temporal grounding."
      }
     ]
    },
    {
     "id": "p-references-11",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-references-11-1",
       "original": "arXiv preprint arXiv:2601.06896, 2026."
      }
     ]
    },
    {
     "id": "p-references-12",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-references-12-1",
       "original": "[JCX+26] Changhao Jiang, Jiahao Chen, Zhenghao Xiang, Zhixiong Yang, Hanchen Wang, Jiabao Zhuang, Xinmeng Che, Jiajun Sun, Hui Li, Yifei Cao, et al. Muse: Towards reproducible long-form song generation with fine-grained style control. arXiv preprint arXiv:2601.03973, 2026."
      }
     ]
    },
    {
     "id": "p-references-13",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-references-13-1",
       "original": "[KLZ+23] Woosuk Kwon, Zhuohan Li, Siyuan Zhuang, Ying Sheng, Lianmin Zheng, Cody Hao Yu, Joseph E."
      },
      {
       "id": "s-references-13-2",
       "original": "Gonzalez, Hao Zhang, and Ion Stoica."
      },
      {
       "id": "s-references-13-3",
       "original": "Efficient memory management for large language model serving with pagedattention."
      },
      {
       "id": "s-references-13-4",
       "original": "In Proceedings of the ACM SIGOPS 29th Symposium on Operating Systems Principles, 2023."
      }
     ]
    },
    {
     "id": "p-references-14",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-references-14-1",
       "original": "[MGS+25] Bingshen Mu, Pengcheng Guo, Zhaokai Sun, Shuai Wang, Hexin Liu, Mingchen Shao, Lei Xie, Eng Siong Chng, Longshuai Xiao, Qiangze Feng, et al. Summary on the multilingual conversational speech language model challenge: Datasets, tasks, baselines, and methods. arXiv preprint arXiv:2509.13785, 2025."
      }
     ]
    },
    {
     "id": "p-references-15",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-references-15-1",
       "original": "[PYW+25] Zhiliang Peng, Jianwei Yu, Wenhui Wang, Yaoyao Chang, Yutao Sun, Li Dong, Yi Zhu, Weijiang Xu, Hangbo Bao, Zehua Wang, et al. Vibevoice technical report. arXiv preprint arXiv:2508.19205, 2025."
      }
     ]
    },
    {
     "id": "p-references-16",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-references-16-1",
       "original": "[RKX+23] Alec Radford, Jong Wook Kim, Tao Xu, Greg Brockman, Christine McLeavey, and Ilya Sutskever."
      },
      {
       "id": "s-references-16-2",
       "original": "Robust speech recognition via large-scale weak supervision."
      },
      {
       "id": "s-references-16-3",
       "original": "In International conference on machine learning, pages 28492–28518."
      },
      {
       "id": "s-references-16-4",
       "original": "PMLR, 2023."
      }
     ]
    },
    {
     "id": "p-references-17",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-references-17-1",
       "original": "[SBW+24] Yutao Sun, Hangbo Bao, Wenhui Wang, Zhiliang Peng, Li Dong, Shaohan Huang, Jianyong Wang, and Furu Wei."
      },
      {
       "id": "s-references-17-2",
       "original": "Multimodal latent language modeling with next-token diffusion. arXiv preprint arXiv:2412.08635, 2024."
      }
     ]
    },
    {
     "id": "p-references-18",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-references-18-1",
       "original": "[SFP+25] Aaditya Singh, Adam Fry, Adam Perelman, Adam Tart, Adi Ganesh, Ahmed El-Kishky, Aidan McLaughlin, Aiden Low, AJ Ostrow, Akhila Ananthram, et al. Openai gpt-5 system card. arXiv preprint arXiv:2601.03267, 2025."
      }
     ]
    },
    {
     "id": "p-references-19",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-references-19-1",
       "original": "[SXF+25] Mohan Shi, Xiong Xiao, Ruchao Fan, Shaoshi Ling, and Jinyu Li."
      },
      {
       "id": "s-references-19-2",
       "original": "Train short, infer long: Speech-llm enables zero-shot streamable joint asr and diarization on long audio."
      }
     ]
    },
    {
     "id": "p-references-20",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-references-20-1",
       "original": "arXiv preprint arXiv:2511.16046, 2025."
      }
     ]
    },
    {
     "id": "p-references-21",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-references-21-1",
       "original": "[WLW+23] Hongji Wang, Chengdong Liang, Shuai Wang, Zhengyang Chen, Binbin Zhang, Xu Xiang, Yanlei Deng, and Yanmin Qian."
      },
      {
       "id": "s-references-21-2",
       "original": "Wespeaker: A research and production oriented speaker embedding learning toolkit."
      },
      {
       "id": "s-references-21-3",
       "original": "In ICASSP 2023-2023 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP), pages 1–5."
      },
      {
       "id": "s-references-21-4",
       "original": "IEEE, 2023."
      }
     ]
    },
    {
     "id": "p-references-22",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-references-22-1",
       "original": "[XJM+23] Hainan Xu, Fei Jia, Somshubra Majumdar, He Huang, Shinji Watanabe, and Boris Ginsburg."
      },
      {
       "id": "s-references-22-2",
       "original": "Efficient sequence transduction by jointly predicting tokens and durations."
      },
      {
       "id": "s-references-22-3",
       "original": "In International Conference on Machine Learning, pages 38462–38484."
      },
      {
       "id": "s-references-22-4",
       "original": "PMLR, 2023."
      }
     ]
    },
    {
     "id": "p-references-23",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-references-23-1",
       "original": "[YCB+24] Jianwei Yu, Hangting Chen, Yanyao Bian, Xiang Li, Yi Luo, Jinchuan Tian, Mengyang Liu, Jiayi Jiang, and Shuai Wang."
      },
      {
       "id": "s-references-23-2",
       "original": "Autoprep: An automatic preprocessing framework for in-the-wild speech data."
      },
      {
       "id": "s-references-23-3",
       "original": "In ICASSP 2024-2024 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP), pages 1136–1140."
      },
      {
       "id": "s-references-23-4",
       "original": "IEEE, 2024."
      }
     ]
    },
    {
     "id": "p-references-24",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-references-24-1",
       "original": "[YCD+25] Han Yin, Yafeng Chen, Chong Deng, Luyao Cheng, Hui Wang, Chao-Hong Tan, Qian Chen, Wen Wang, and Xiangang Li."
      },
      {
       "id": "s-references-24-2",
       "original": "Speakerlm: End-to-end versatile speaker diarization and recognition with multimodal large language models. arXiv preprint arXiv:2508.06372, 2025."
      }
     ]
    },
    {
     "id": "p-references-25",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-references-25-1",
       "original": "[YLY+26] Donghua Yu, Zhengyuan Lin, Chen Yang, Yiyang Zhang, Zhaoye Fei, Hanfu Chen, Jingqi Chen, Ke Chen, Qinyuan Cheng, Liwei Fan, et al. Moss transcribe diarize: Accurate transcription with speaker diarization. arXiv preprint arXiv:2601.01554, 2026."
      }
     ]
    },
    {
     "id": "p-references-26",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-references-26-1",
       "original": "[YYZ+24] An Yang, Baosong Yang, Beichen Zhang, Binyuan Hui, Bo Zheng, Bowen Yu, Chengyuan Li, Dayiheng Liu, Fei Huang, Haoran Wei, et al. Qwen2. 5 technical report. arXiv preprint arXiv:2412.15115, 2024."
      }
     ]
    },
    {
     "id": "p-references-27",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-references-27-1",
       "original": "[YZF+22] Fan Yu, Shiliang Zhang, Yihui Fu, Lei Xie, Siqi Zheng, Zhihao Du, Weilong Huang, Pengcheng Guo, Zhijie Yan, Bin Ma, et al. M2met: The icassp 2022 multi-channel multi-party meeting transcription challenge."
      },
      {
       "id": "s-references-27-2",
       "original": "In ICASSP 2022-2022 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP), pages 6167–6171."
      }
     ]
    },
    {
     "id": "p-references-28",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-references-28-1",
       "original": "IEEE, 2022."
      }
     ]
    }
   ]
  },
  {
   "id": "sec-A",
   "num": "A",
   "level": 1,
   "page": 9,
   "title": {
    "original": "Language Distribution of Training Data",
    "zh": "Language Distribution of Training Data"
   },
   "blocks": [
    {
     "id": "p-A-1",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-A-1-1",
       "original": "English Chinese Spanish Portuguese German Japanese Korean French Russian Indonesian Swedish Italian Hebrew Dutch Polish Norwegian Turkish Thai Arabic",
       "zh": "（附录 A 语种清单：English / Chinese / Spanish / Portuguese / German / Japanese / Korean / French / Russian / Indonesian / Swedish / Italian / Hebrew / Dutch / Polish / Norwegian / Turkish / Thai / Arabic（占比降序，完整清单与数值见下表）。）"
      }
     ]
    },
    {
     "id": "eq-A-1",
     "type": "equation",
     "page": 9,
     "original": "0.181721%"
    },
    {
     "id": "eq-A-2",
     "type": "equation",
     "page": 9,
     "original": "Hungarian"
    },
    {
     "id": "eq-A-3",
     "type": "equation",
     "page": 9,
     "original": "0.175694%"
    },
    {
     "id": "eq-A-4",
     "type": "equation",
     "page": 9,
     "original": "Catalan"
    },
    {
     "id": "eq-A-5",
     "type": "equation",
     "page": 9,
     "original": "0.144024%"
    },
    {
     "id": "eq-A-6",
     "type": "equation",
     "page": 9,
     "original": "Czech"
    },
    {
     "id": "eq-A-7",
     "type": "equation",
     "page": 9,
     "original": "0.135779%"
    },
    {
     "id": "eq-A-8",
     "type": "equation",
     "page": 9,
     "original": "Danish"
    },
    {
     "id": "eq-A-9",
     "type": "equation",
     "page": 9,
     "original": "0.115226%"
    },
    {
     "id": "eq-A-10",
     "type": "equation",
     "page": 9,
     "original": "Persian"
    },
    {
     "id": "eq-A-11",
     "type": "equation",
     "page": 9,
     "original": "0.100209%"
    },
    {
     "id": "eq-A-12",
     "type": "equation",
     "page": 9,
     "original": "Afrikaans"
    },
    {
     "id": "eq-A-13",
     "type": "equation",
     "page": 9,
     "original": "0.098980%"
    },
    {
     "id": "eq-A-14",
     "type": "equation",
     "page": 9,
     "original": "Hindi"
    },
    {
     "id": "eq-A-15",
     "type": "equation",
     "page": 9,
     "original": "0.093302%"
    },
    {
     "id": "eq-A-16",
     "type": "equation",
     "page": 9,
     "original": "Finnish"
    },
    {
     "id": "eq-A-17",
     "type": "equation",
     "page": 9,
     "original": "0.065677%"
    },
    {
     "id": "eq-A-18",
     "type": "equation",
     "page": 9,
     "original": "Estonian"
    },
    {
     "id": "eq-A-19",
     "type": "equation",
     "page": 9,
     "original": "0.065011%"
    },
    {
     "id": "eq-A-20",
     "type": "equation",
     "page": 9,
     "original": "Afar"
    },
    {
     "id": "eq-A-21",
     "type": "equation",
     "page": 9,
     "original": "0.063801%"
    },
    {
     "id": "eq-A-22",
     "type": "equation",
     "page": 9,
     "original": "Greek"
    },
    {
     "id": "eq-A-23",
     "type": "equation",
     "page": 9,
     "original": "0.063136%"
    },
    {
     "id": "eq-A-24",
     "type": "equation",
     "page": 9,
     "original": "Romanian"
    },
    {
     "id": "eq-A-25",
     "type": "equation",
     "page": 9,
     "original": "0.056151%"
    },
    {
     "id": "eq-A-26",
     "type": "equation",
     "page": 9,
     "original": "Vietnamese"
    },
    {
     "id": "eq-A-27",
     "type": "equation",
     "page": 9,
     "original": "0.056144%"
    },
    {
     "id": "eq-A-28",
     "type": "equation",
     "page": 9,
     "original": "Bulgarian"
    },
    {
     "id": "eq-A-29",
     "type": "equation",
     "page": 9,
     "original": "0.044601%"
    },
    {
     "id": "eq-A-30",
     "type": "equation",
     "page": 9,
     "original": "Icelandic"
    },
    {
     "id": "eq-A-31",
     "type": "equation",
     "page": 9,
     "original": "0.042502%"
    },
    {
     "id": "eq-A-32",
     "type": "equation",
     "page": 9,
     "original": "Slovenian"
    },
    {
     "id": "eq-A-33",
     "type": "equation",
     "page": 9,
     "original": "0.040306%"
    },
    {
     "id": "eq-A-34",
     "type": "equation",
     "page": 9,
     "original": "Slovak"
    },
    {
     "id": "eq-A-35",
     "type": "equation",
     "page": 9,
     "original": "0.039944%"
    },
    {
     "id": "eq-A-36",
     "type": "equation",
     "page": 9,
     "original": "Lithuanian"
    },
    {
     "id": "eq-A-37",
     "type": "equation",
     "page": 9,
     "original": "0.025635%"
    },
    {
     "id": "eq-A-38",
     "type": "equation",
     "page": 9,
     "original": "Swahili"
    },
    {
     "id": "eq-A-39",
     "type": "equation",
     "page": 9,
     "original": "0.023807%"
    },
    {
     "id": "eq-A-40",
     "type": "equation",
     "page": 9,
     "original": "Ukrainian"
    },
    {
     "id": "eq-A-41",
     "type": "equation",
     "page": 9,
     "original": "0.015401%"
    },
    {
     "id": "eq-A-42",
     "type": "equation",
     "page": 9,
     "original": "Kalaallisut"
    },
    {
     "id": "eq-A-43",
     "type": "equation",
     "page": 9,
     "original": "0.012667%"
    },
    {
     "id": "eq-A-44",
     "type": "equation",
     "page": 9,
     "original": "Latvian"
    },
    {
     "id": "eq-A-45",
     "type": "equation",
     "page": 9,
     "original": "0.012208%"
    },
    {
     "id": "eq-A-46",
     "type": "equation",
     "page": 9,
     "original": "Croatian"
    },
    {
     "id": "eq-A-47",
     "type": "equation",
     "page": 9,
     "original": "0.011705%"
    },
    {
     "id": "eq-A-48",
     "type": "equation",
     "page": 9,
     "original": "Nepali"
    },
    {
     "id": "eq-A-49",
     "type": "equation",
     "page": 9,
     "original": "0.010376%"
    },
    {
     "id": "eq-A-50",
     "type": "equation",
     "page": 9,
     "original": "Serbian"
    },
    {
     "id": "eq-A-51",
     "type": "equation",
     "page": 9,
     "original": "0.009273%"
    },
    {
     "id": "eq-A-52",
     "type": "equation",
     "page": 9,
     "original": "Filipino"
    },
    {
     "id": "eq-A-53",
     "type": "equation",
     "page": 9,
     "original": "0.008435%"
    },
    {
     "id": "eq-A-54",
     "type": "equation",
     "page": 9,
     "original": "Yiddish"
    },
    {
     "id": "eq-A-55",
     "type": "equation",
     "page": 9,
     "original": "0.007840%"
    },
    {
     "id": "eq-A-56",
     "type": "equation",
     "page": 9,
     "original": "Malay"
    },
    {
     "id": "eq-A-57",
     "type": "equation",
     "page": 9,
     "original": "0.005445%"
    },
    {
     "id": "eq-A-58",
     "type": "equation",
     "page": 9,
     "original": "Urdu"
    },
    {
     "id": "eq-A-59",
     "type": "equation",
     "page": 9,
     "original": "0.004618%"
    },
    {
     "id": "eq-A-60",
     "type": "equation",
     "page": 9,
     "original": "Mongolian"
    },
    {
     "id": "eq-A-61",
     "type": "equation",
     "page": 9,
     "original": "0.003093%"
    },
    {
     "id": "eq-A-62",
     "type": "equation",
     "page": 9,
     "original": "Armenian"
    },
    {
     "id": "eq-A-63",
     "type": "equation",
     "page": 9,
     "original": "0.002467%"
    },
    {
     "id": "eq-A-64",
     "type": "equation",
     "page": 9,
     "original": "Javanese"
    },
    {
     "id": "eq-A-65",
     "type": "equation",
     "page": 9,
     "original": "66.651067% 14.388077% 6.281633% 2.377301% 1.852176% 0.953292% 0.912063% 0.898955% 0.691947% 0.575294% 0.508351% 0.447609% 0.391830% 0.275293% 0.254292% 0.210149% 0.206286% 0.197261% 0.191945% 10 2 10 1 100 101 102"
    },
    {
     "id": "p-A-2",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-A-2-1",
       "original": "Percentage (%)",
       "zh": "（图 3 纵轴：占比 Percentage (%)。）"
      }
     ]
    },
    {
     "id": "fig-A-1",
     "type": "figure_caption",
     "page": 9,
     "original": "Figure 3: Language distribution in the training data.",
     "zh": "图 3：训练数据的语种分布。"
    }
   ]
  }
 ],
 "annotations": [
  {
   "id": "ann-001",
   "anchor": {
    "sentence_id": "s-front-1-2",
    "quote": "single-pass processing for up to 60 minutes of audio"
   },
   "kind": "engineering",
   "title": "单趟 60 分钟的含义",
   "explanation": "「单趟」是这篇论文的立身之本：一整小时音频不切分、不滑窗，直接进 LLM 上下文做端到端生成。它消除了分段流水线中跨段说话人错乱与上下文断裂的根因，但代价是推理时显存与延迟随序列长度线性（注意力层面近似平方）上涨，实际部署对 GPU 显存要求很高。这也决定了它面向离线批处理（会议/播客转写），而非实时流式场景。",
   "featured": true
  },
  {
   "id": "ann-002",
   "anchor": {
    "sentence_id": "s-front-1-3",
    "quote": "unifies Automatic Speech Recognition, Speaker Diarization, and Timestamping into a single end-to-end generation task"
   },
   "kind": "concept",
   "title": "三任务合一的富转录",
   "explanation": "传统方案里 ASR、说话人分离、时间戳是三个独立模型，靠后处理启发式对齐，误差逐级传播。VIBEVOICE-ASR 把三者统一为一条文本生成目标：输出流里显式交错「谁、何时、什么」。一旦说话人归属和时间边界与文字在同一解码过程里产生，跨模块不一致（ASR 段边界对不上 diarization 聚类）这种经典级联病就从架构上被消除了。",
   "featured": true
  },
  {
   "id": "ann-003",
   "anchor": {
    "sentence_id": "s-vibevoice-asr-3-3",
    "quote": "severs global semantic dependencies"
   },
   "kind": "motivation",
   "title": "为什么 30 秒切片是硬伤",
   "explanation": "论文点出分段方案的致命处不在精度而在结构：切到 30 秒以内的片段各自独立识别，跨句的同音词消歧和指代消解失去依据。中文场景尤其明显——「她/他/它」、人名地名的前后呼应都需要长上下文。这句话实际是在为后文 7.5Hz tokenizer 的超长上下文路线立论：问题不是模型不够好，而是输入被切碎了。",
   "featured": true
  },
  {
   "id": "ann-004",
   "anchor": {
    "sentence_id": "s-vibevoice-asr-4-6",
    "quote": "the majority of these works have not made their models publicly available"
   },
   "kind": "critique",
   "title": "开源是真差异点",
   "explanation": "作者顺带点名同期工作 [HSZ26, YCD+25, SXF+25, YLY+26] 大多不开源，这是竞争格局陈述也是自我定位：VIBEVOICE-ASR 的权重、微调代码、推理栈（含 vLLM 支持）全部放出。对工程团队而言，这意味着可以在自有会议数据上继续 SFT，而不必依赖闭源 API 的数据出境与按量计费。但也要看到，全开源对微软是生态卡位，不只是情怀。",
   "featured": true
  },
  {
   "id": "ann-005",
   "anchor": {
    "sentence_id": "s-2-2-1-2",
    "quote": "cumulative 3200× downsampling rate to the 24 kHz input, yielding an extremely compact representation of approximately 7.5 tokens per second"
   },
   "kind": "number",
   "title": "3200 倍下采样换上下文",
   "explanation": "24 kHz 采样率下 3200× 下采样等于每秒只留 7.5 个声学 token，一小时音频压到约 27,000 token，这是 60 分钟能塞进 64K 窗口的算术基础。代价同样明确：7.5Hz 不可能保留细粒度音素边界与韵律细节，靠双 tokenizer 里的语义分支补内容信息。这个压缩率是全文最激进的工程赌注——它赌 LLM 的长上下文能力比声学帧率更重要。",
   "featured": true
  },
  {
   "id": "ann-006",
   "anchor": {
    "sentence_id": "s-2-2-1-4",
    "quote": "we only use tokenizer encoders here"
   },
   "kind": "engineering",
   "title": "只借编码器一半",
   "explanation": "VIBEVOICE 原本是为 TTS 设计的双 tokenizer（编码器+解码器成对存在，用于语音合成）。ASR 这里只取两个编码器：声学编码器产连续潜向量、语义编码器产对齐文本的特征，解码器部分（用于重建波形）整个丢弃。这解释了为什么这套 ASR 复用成本低——底座训练的资产被最大化复用，只有 LLM 骨干和映射层是新增负担。",
   "featured": true
  },
  {
   "id": "ann-007",
   "anchor": {
    "sentence_id": "s-2-3-1-1-4",
    "quote": "transcription with Whisper-large-v3-turbo [RKX+23] to obtain punctuated text and word-level timestamps"
   },
   "kind": "engineering",
   "title": "训练数据靠 Whisper 伪标",
   "explanation": "预训练语料的文本来自 Whisper-large-v3-turbo 自动转录，即整套长音频理解能力的初始监督是机器伪标。再用第二个 ASR 模型复读做交叉校验（WER>20% 的片段过多就整条丢弃）。这套「模型教模型」的路线决定了底座质量上限受限于 Whisper 系能力，也说明为什么 SFT 阶段必须引入高质量人工数据集来纠偏。",
   "featured": true
  },
  {
   "id": "ann-008",
   "anchor": {
    "sentence_id": "s-2-3-1-1-5",
    "quote": "clustered with HDBSCAN [CMS13], and refined by merging clusters whose centroids have a cosine similarity greater than 0.67"
   },
   "kind": "engineering",
   "title": "说话人标签的传统配方",
   "explanation": "预训练的说话人标签并非端到端学出来的，而是经典流水线：WeSpeaker 提嵌入（1.5 秒窗、0.75 秒步长）、HDBSCAN 聚类、按质心余弦相似度 0.67 合并簇。这些阈值都是经验值，换一批语言或录音条件可能要重调。它再次印证：预训练标签质量上限由外部工具链决定，VIBEVOICE-ASR 的创新在于推理时摆脱了这套聚类，但训练时仍深度依赖它。",
   "featured": false
  },
  {
   "id": "ann-009",
   "anchor": {
    "sentence_id": "s-2-3-1-1-6",
    "quote": "recordings are discarded if more than 30% of segments have a WER exceeding 20%"
   },
   "kind": "number",
   "title": "30%/20% 的双重门槛",
   "explanation": "过滤规则是双阈值：片段级 WER 超 20% 视为不可信，整条录音里这类片段超过 30% 就整条丢弃；另加语音占比需达 60%。这种「按录音整条丢弃」比按片段丢弃更激进，好处是保证进入预训练的每条数据整体可靠，坏处是大量部分可用的长录音被浪费。两个阈值怎么定的文中没有消融，属于典型的工程经验值。",
   "featured": false
  },
  {
   "id": "ann-010",
   "anchor": {
    "sentence_id": "s-2-3-1-2-3",
    "quote": "we disable the data-filtering module in Emilia, as its default configuration removes a substantial portion of the audio samples"
   },
   "kind": "critique",
   "title": "公平性说法可推敲",
   "explanation": "为了让对比「公平」，作者关掉了 Emilia 的数据过滤模块，理由是它默认会删掉大量样本。但过滤正是 Emilia 流水线质量保障的核心环节，关掉它再比 DER/WER，等于拿对手的非完整形态上场。Table 1 显示自家管线在 AMI-SDM 上把 DER 从 Emilia 的 49.40 压到 18.99，这个量级差距很可能部分来自被禁用的过滤。读者应把 Table 1 理解为「我们的分段/聚类更好」，而非整体流水线完胜。",
   "featured": true
  },
  {
   "id": "ann-012",
   "anchor": {
    "sentence_id": "s-context-aware-synthetic-data-pip-2-1",
    "quote": "We employ GPT-5 [SFP+25] to generate complex dialogue scripts containing specific entities, technical terms, and cross-lingual content"
   },
   "kind": "engineering",
   "title": "上下文能力靠合成",
   "explanation": "「上下文注入」是卖点，但真实世界里几乎不存在「音频+配套热词表/背景段落」的成对训练数据，所以干脆用 GPT-5 编剧本、同时编出对应的参考上下文，再用 VIBEVOICE 合成音频、闭环回录校验 WER 后留样。这条 GPT-5 写稿、VIBEVOICE 朗读、ASR 回验的自产流水线造了约 6,000 小时数据，是该能力真正可训练的原因，也意味着热词能力的上限被剧本多样性锁死。",
   "featured": true
  },
  {
   "id": "ann-013",
   "anchor": {
    "sentence_id": "s-long-form-transcription-restorat-2-3",
    "quote": "prevent the model from hallucinating text during silence or background noise"
   },
   "kind": "motivation",
   "title": "用标签治幻觉",
   "explanation": "长音频里静音、音乐、环境噪声段落是生成式 ASR 幻觉的高发区（Whisper 在静音段编歌词是知名案例）。这里的对策很朴素：让 GPT-Audio 给非语音段打上 [Music]、[Silence] 等标签，把这些标签作为监督目标直接训进去，模型学到「没话就输出标签而不是编字」。这比解码期加 no-speech 阈值更干净，但效果取决于自动声学事件标注本身的准确率。",
   "featured": true
  },
  {
   "id": "ann-015",
   "anchor": {
    "sentence_id": "s-3-5-1",
    "quote": "words are only matched if they occur within a predefined temporal collar"
   },
   "kind": "concept",
   "title": "tcpWER 评的是时序",
   "explanation": "cpWER 允许说话人任意置换后拼接再算 WER，对时间误差完全不敏感；tcpWER 加上时间容差窗口，词必须在正确的时间段出现才算对。所以 tcpWER 是唯一同时考「谁、什么、何时」的指标，也是这篇论文主打指标。VIBEVOICE-ASR 平均 tcpWER 14.81% 对 Gemini-3-Pro 的 15.66%，差距没有 DER 那么夸张，说明其内容识别优势有限，真正的拉开差在说话人归属上。",
   "featured": true
  },
  {
   "id": "ann-016",
   "anchor": {
    "sentence_id": "s-3-6-2",
    "quote": "Gemini models exhibit substantial timestamp inaccuracies and occasional content hallucinations when processing long-form audio inputs"
   },
   "kind": "critique",
   "title": "基线被切 240 秒",
   "explanation": "作者观察到 Gemini 直接吃长音频会时间戳漂移、产生幻觉，于是把测试音频切成 240 秒片段再喂给基线，而自家模型单趟跑全程。这被描述为「公平且稳定」，但实质是把 Gemini 降级成一个分段模型再对比——恰恰复现了本文批判的级联病。DER 16.29% 对 3.42% 的悬殊差距里，有多少是模型能力、多少是评测协议造成的，读者需自行掂量。",
   "featured": true
  },
  {
   "id": "ann-018",
   "anchor": {
    "sentence_id": "s-4-3-1",
    "quote": "the SFT phase predominantly focused on English, Chinese, and code-switching data"
   },
   "kind": "critique",
   "title": "50+ 语言名不副实",
   "explanation": "摘要宣称支持 50+ 语言、无需显式语言设置，但这里承认 SFT 只重点做了中英与语码混合，低资源语言的性能靠预训练底子泛化、可能退化。Table 2 里法语 WER 3.80、日语 0.82 这类亮眼数字要警惕——这些单语言测试集很可能与预训练分布接近。对越南语、泰语等真实长尾语言，论文自己都没有给出 SFT 后对照，「50+ 语言」更多是底座继承的能力而非本工作的验证结论。",
   "featured": true
  },
  {
   "id": "ann-019",
   "anchor": {
    "sentence_id": "s-4-4-2",
    "quote": "the model tends to transcribe the dominant speaker, potentially missing secondary information"
   },
   "kind": "critique",
   "title": "串行输出压不住重叠",
   "explanation": "串行文本流一次只能出一个说话人，这是架构性局限而非调参能解决的：重叠语音段只能保主导说话人，次要说话人的话直接丢失。对会议转写这是硬伤——激烈讨论段恰恰是重叠高发区。文中说未来用 separation-aware 建模解决，但那意味着输出格式要支持多流并行，几乎等于重做富转录的序列化设计。选型时若目标场景重叠率高（圆桌辩论、多人抢话），需额外前端分离模块兜底。",
   "featured": true
  },
  {
   "id": "ann-020",
   "anchor": {
    "sentence_id": "s-front-1-5",
    "quote": "prompt-based context injection mechanism that allows users to supply customized conetxt"
   },
   "kind": "concept",
   "title": "热词注入即 prompt",
   "explanation": "上下文注入本质是把热词列表、背景段落当文本 prompt 拼在音频序列前面，让 LLM 的条件分布偏向这些实体——和 Whisper 的 previous-text 提示、以及中文 ASR 里的热词增强是同一思路，只是借长上下文窗口做到了段落级背景注入。对多音字消歧（如中文「重庆」vs 人名读法）是实用功能。原文 conetxt 是 context 的拼写错误，抽取层原样保留，译文按正确含义处理。",
   "featured": false
  },
  {
   "id": "ann-021",
   "anchor": {
    "sentence_id": "s-vibevoice-asr-4-4",
    "quote": "ensuring semantic coherence and consistent speaker tracking without the need for external clustering algorithms"
   },
   "kind": "comparison",
   "title": "扔掉聚类算法",
   "explanation": "传统 diarization 的最后一步必是嵌入聚类（HDBSCAN、谱聚类），聚类数、相似度阈值都需按场景调。VIBEVOICE-ASR 让说话人表征隐式存在 LLM 的 token 上下文里，说话人标签随文本一起被生成出来，省掉整套外部聚类。讽刺的是，其预训练标签恰恰来自 2.3.1 节那条 HDBSCAN 聚类流水线——模型学到的是聚类结果的行为克隆，只是推理时把这条链内化了。",
   "featured": false
  },
  {
   "id": "ann-022",
   "anchor": {
    "sentence_id": "s-4-1-2",
    "quote": "releasing the model weights, fine-tuning pipelines, and high-performance inference code (e.g., vLLM [KLZ+23] support)"
   },
   "kind": "engineering",
   "title": "vLLM 支持的分量",
   "explanation": "开源清单里专门点名 vLLM 支持，这比放权重实际得多：64K 长上下文加自回归生成，没有 PagedAttention 级别的 KV cache 管理，单卡跑一小时音频的显存根本扛不住，批量服务更是无从谈起。微调代码一并放出意味着企业可以在自有会议数据上继续 SFT。对一个 9B 级模型而言，推理栈的成熟度往往比纸面指标更决定它能否进生产。",
   "featured": false
  }
 ]
};
