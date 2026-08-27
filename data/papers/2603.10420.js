// 自动生成：2603.10420 全文双语精读数据（由 tools/compile_paper.js 装配）
// 结构/原文来自 .cache/papers/2603.10420.json（tools/extract_paper.py）；
// 翻译与讲解来自 .cache/papers/zh/2603.10420/（LLM agent 撰写）。
// 改翻译请改片段后重新装配；勿手改本文件的结构与 original 字段。
globalThis.PAPER_2603_10420 = {
 "paper_id": "2603.10420",
 "model_id": "fireredasr2",
 "title": {
  "original": "FireRedASR2S: A State-of-the-Art Industrial-Grade All-in-One Automatic Speech Recognition System",
  "zh": "FireRedASR2S：业界领先的工业级一体化自动语音识别系统"
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
       "original": "Kaituo Xu, Yan Jia, Kai Huang, Junjie Chen, Wenpeng Li, Kun Liu Feng-Long Xie, Xu Tang, Yao Hu Super Intelligence Team, Xiaohongshu Inc."
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
       "original": "We present FireRedASR2S, a state-of-the-art industrial-grade all-in-one automatic speech recognition (ASR) system.",
       "zh": "我们推出 FireRedASR2S，一套业界领先（SOTA）的工业级一体化自动语音识别（ASR）系统。"
      },
      {
       "id": "s-abstract-1-2",
       "original": "It integrates four modules in a unified pipeline: ASR, Voice Activity Detection (VAD), Spoken Language Identification (LID), and Punctuation Prediction (Punc).",
       "zh": "它将四个模块整合进一条统一的流水线：ASR、语音活动检测（VAD）、口语语种识别（LID）和标点预测（Punc）。"
      },
      {
       "id": "s-abstract-1-3",
       "original": "All modules achieve SOTA performance on the evaluated benchmarks: FireRedASR2: An ASR module with two variants, FireRedASR2-LLM (8B+ parameters) and FireRedASR2-AED (1B+ parameters), supporting speech and singing transcription for Mandarin, Chinese dialects and accents, English, and codeswitching.",
       "zh": "所有模块在所评测的基准上都达到了 SOTA 性能。FireRedASR2：ASR 模块，包含两个变体 FireRedASR2-LLM（8B+ 参数）与 FireRedASR2-AED（1B+ 参数），支持普通话、中文方言与口音、英语以及语码混合（code-switching）场景下的语音与歌声转写。"
      },
      {
       "id": "s-abstract-1-4",
       "original": "Compared to FireRedASR, FireRedASR2 delivers improved recognition accuracy and broader dialect and accent coverage.",
       "zh": "与 FireRedASR 相比，FireRedASR2 的识别精度更高，方言与口音覆盖更广。"
      },
      {
       "id": "s-abstract-1-5",
       "original": "FireRedASR2-LLM achieves 2.89% average CER on 4 public Mandarin benchmarks and 11.55% on 19 public Chinese dialects and accents benchmarks, outperforming competitive baselines including Doubao-ASR, Qwen3-ASR, and Fun-ASR.",
       "zh": "FireRedASR2-LLM 在 4 个公开普通话基准上取得 2.89% 的平均 CER，在 19 个公开中文方言与口音基准上取得 11.55% 的平均 CER，优于 Doubao-ASR、Qwen3-ASR 和 Fun-ASR 等强竞争基线。"
      },
      {
       "id": "s-abstract-1-6",
       "original": "FireRedVAD: An ultra-lightweight module (0.6M parameters) based on the Deep Feedforward Sequential Memory Network (DFSMN), supporting streaming VAD, non-streaming VAD, and multi-label VAD (mVAD).",
       "zh": "FireRedVAD：一个基于深度前馈序列记忆网络（DFSMN）的超轻量模块（0.6M 参数），支持流式 VAD、非流式 VAD 和多标签 VAD（mVAD）。"
      },
      {
       "id": "s-abstract-1-7",
       "original": "On the FLEURS-VAD-102 benchmark, it achieves 97.57% frame-level F1 and 99.60% AUC-ROC, outperforming Silero-VAD, TEN-VAD, FunASR-VAD, and WebRTC-VAD.",
       "zh": "在 FLEURS-VAD-102 基准上，它取得 97.57% 的帧级 F1 和 99.60% 的 AUC-ROC，优于 Silero-VAD、TEN-VAD、FunASR-VAD 和 WebRTC-VAD。"
      },
      {
       "id": "s-abstract-1-8",
       "original": "FireRedLID: An Encoder-Decoder LID module supporting 100+ languages and 20+ Chinese dialects and accents.",
       "zh": "FireRedLID：一个基于编码器-解码器的 LID 模块，支持 100+ 语种和 20+ 中文方言与口音。"
      },
      {
       "id": "s-abstract-1-9",
       "original": "On FLEURS (82 languages), it achieves 97.18% utterance-level accuracy, outperforming Whisper and SpeechBrain.",
       "zh": "在 FLEURS（82 种语言）上，它取得 97.18% 的句级准确率，优于 Whisper 和 SpeechBrain。"
      },
      {
       "id": "s-abstract-1-10",
       "original": "FireRedPunc: A BERT-style punctuation prediction module for Chinese and English.",
       "zh": "FireRedPunc：一个面向中文和英文的 BERT 式标点预测模块。"
      },
      {
       "id": "s-abstract-1-11",
       "original": "On multi-domain benchmarks, it achieves 78.90% average F1, outperforming FunASR-Punc (62.77%).",
       "zh": "在多领域基准上，它取得 78.90% 的平均 F1，优于 FunASR-Punc（62.77%）。"
      },
      {
       "id": "s-abstract-1-12",
       "original": "To advance research in speech processing, we release model weights and code at https://github.com/FireRedTeam/FireRedASR2S.",
       "zh": "为推动语音处理研究，我们在 https://github.com/FireRedTeam/FireRedASR2S 开放了模型权重与代码。"
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
       "original": "Automatic speech recognition (ASR) has advanced rapidly with end-to-end modeling, large-scale training, and the integration of large language models (LLMs) [1–19].",
       "zh": "随着端到端建模、大规模训练以及大语言模型（LLM）的引入 [1–19]，自动语音识别（ASR）发展迅速。"
      },
      {
       "id": "s-1-1-2",
       "original": "However, practical deployment in real-world applications typically requires more than a standalone ASR model.",
       "zh": "然而，真实应用中的实际部署所需的往往不只是一个孤立的 ASR 模型。"
      },
      {
       "id": "s-1-1-3",
       "original": "Real-world audio often contains long-form recordings, silence and non-speech regions, background music, singing, multilingual speech, and Chinese dialects and accents (hereafter referred to as dialects for brevity).",
       "zh": "真实音频常常包含长时录音、静音与非语音区段、背景音乐、歌声、多语种语音，以及中文方言与口音（为简洁起见，下文统称方言）。"
      },
      {
       "id": "s-1-1-4",
       "original": "To deliver reliable transcription in such conditions, a complete pipeline is needed, including voice activity detection (VAD) for segmentation, spoken language identification (LID) for routing and tagging, and punctuation prediction (Punc) for readable outputs.",
       "zh": "为了在这类条件下产出可靠的转写，需要一条完整的流水线，包括用于切分的语音活动检测（VAD）、用于路由与打标的口语语种识别（LID），以及用于提升输出可读性的标点预测（Punc）。"
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
       "original": "In practice, many systems are built by assembling modules from heterogeneous sources (e.g., separate VAD/LID/ASR/Punc toolkits or cloud services).",
       "zh": "在实践中，许多系统是通过拼装来自异构来源的模块搭建的（例如各自独立的 VAD/LID/ASR/Punc 工具包或云服务）。"
      },
      {
       "id": "s-1-2-2",
       "original": "Such pipelines frequently suffer from inconsistent interfaces, limited reproducibility, and complex error propagation.",
       "zh": "这类流水线经常面临接口不一致、可复现性有限以及复杂的误差传播问题。"
      },
      {
       "id": "s-1-2-3",
       "original": "Moreover, some components",
       "zh": "此外，一些组件"
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
       "original": "rely on weak or indirect supervision (e.g., VAD trained from ASR forced alignment), which may degrade robustness under challenging acoustic conditions.",
       "zh": "依赖弱监督或间接监督信号（例如用 ASR 强制对齐来训练 VAD），在复杂声学条件下可能损害鲁棒性。"
      },
      {
       "id": "s-1-3-2",
       "original": "These limitations motivate an opensource, industrial-grade all-in-one ASR system with strong performance, clear modularization, and comprehensive evaluation.",
       "zh": "这些局限促使我们构建一个开源的、工业级的一体化 ASR 系统，具备强性能、清晰的模块化划分和全面的评测。"
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
       "original": "In this technical report, we present FireRedASR2S, a state-of-the-art (SOTA), all-in-one ASR system integrating four modules: FireRedASR2 for ASR, FireRedVAD for VAD and multi-label VAD (mVAD), FireRedLID for multilingual and dialect LID, and FireRedPunc for punctuation prediction.",
       "zh": "在这份技术报告中，我们提出 FireRedASR2S——一套业界领先（SOTA）的一体化 ASR 系统，整合了四个模块：负责 ASR 的 FireRedASR2、负责 VAD 与多标签 VAD（mVAD）的 FireRedVAD、负责多语种与方言 LID 的 FireRedLID，以及负责标点预测的 FireRedPunc。"
      },
      {
       "id": "s-1-4-2",
       "original": "The suffix 2S denotes the 2nd-generation FireRedASR, expanded into an all-in-one ASR System.",
       "zh": "后缀 2S 表示第二代 FireRedASR，并扩展为一体化 ASR 系统（System）。"
      },
      {
       "id": "s-1-4-3",
       "original": "FireRedASR2S provides a unified pipeline from waveform to structured transcription outputs, while allowing each module to be deployed independently.",
       "zh": "FireRedASR2S 提供从波形到结构化转写输出的统一流水线，同时允许每个模块独立部署。"
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
       "original": "FireRedASR2 builds upon our previous FireRedASR [1] models with minimal architectural changes.",
       "zh": "FireRedASR2 在我们此前的 FireRedASR [1] 模型基础上构建，架构改动很小。"
      },
      {
       "id": "s-1-5-2",
       "original": "Compared to FireRedASR, FireRedASR2 improves recognition accuracy and expands coverage to a broader range of Chinese dialects, primarily by scaling supervised training data to approximately 200k hours with broader domain, language, and dialect diversity.",
       "zh": "与 FireRedASR 相比，FireRedASR2 提升了识别精度并将覆盖范围扩展到更广的中文方言，其主要手段是把监督训练数据扩展到约 200k 小时，并覆盖更丰富的领域、语种与方言多样性。"
      },
      {
       "id": "s-1-5-3",
       "original": "FireRedVAD is trained on thousands of hours of high-quality human-annotated acoustic event data, providing reliable segmentation under diverse acoustic conditions.",
       "zh": "FireRedVAD 在数千小时高质量人工标注的声学事件数据上训练，能够在多样声学条件下提供可靠的切分。"
      },
      {
       "id": "s-1-5-4",
       "original": "FireRedLID is implemented as an Encoder-Decoder-based [20, 21] model initialized from the FireRedASR2-AED encoder and performs hierarchical language and dialect prediction.",
       "zh": "FireRedLID 实现为一个基于编码器-解码器 [20, 21] 的模型，以 FireRedASR2-AED 的编码器初始化，并执行分层级的语种与方言预测。"
      },
      {
       "id": "s-1-5-5",
       "original": "FireRedPunc adopts a BERT-style encoder [22] initialized from LERT [23] and is trained on large-scale multi-domain Chinese and English corpora.",
       "zh": "FireRedPunc 采用 BERT 式编码器 [22]，以 LERT [23] 初始化，并在大规模多领域中文与英文语料上训练。"
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
       "original": "Our main contributions are:",
       "zh": "我们的主要贡献如下："
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
       "original": "• All-in-one open-source system: We release an integrated ASR pipeline with unified interfaces and modular deployment.",
       "zh": "• 一体化开源系统：我们发布了一条具有统一接口和模块化部署能力的集成 ASR 流水线。"
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
       "original": "• Improved ASR accuracy and broader dialect coverage: Building upon FireRedASR, FireRedASR2 improves recognition accuracy and expands support for Chinese dialects, achieving strong results on 24 public test sets.",
       "zh": "• 更高的 ASR 精度与更广的方言覆盖：在 FireRedASR 基础上，FireRedASR2 提升了识别精度并扩展了对中文方言的支持，在 24 个公开测试集上取得了强结果。"
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
       "original": "• Robust segmentation from human-labeled events: FireRedVAD provides strong multilingual VAD performance and is trained using high-quality human-annotated event data rather than forced-alignment-derived supervision.",
       "zh": "• 来自人工标注事件的鲁棒切分：FireRedVAD 提供了强多语种 VAD 性能，其训练使用高质量人工标注的事件数据，而非由强制对齐导出的监督信号。"
      }
     ]
    },
    {
     "id": "p-1-10",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-1-10-1",
       "original": "• Hierarchical multilingual and dialect LID: FireRedLID supports 100+ languages and 20+ Chinese dialects with a compact two-token decoding formulation.",
       "zh": "• 分层级的多语种与方言 LID：FireRedLID 以紧凑的两 token 解码形式支持 100+ 语种和 20+ 中文方言。"
      }
     ]
    },
    {
     "id": "p-1-11",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-1-11-1",
       "original": "• Effective punctuation prediction: FireRedPunc achieves strong results on multi-domain Chinese and English punctuation benchmarks.",
       "zh": "• 有效的标点预测：FireRedPunc 在多领域中文与英文标点基准上取得强结果。"
      }
     ]
    },
    {
     "id": "p-1-12",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-1-12-1",
       "original": "The remainder of this report is organized as follows.",
       "zh": "本报告其余部分组织如下。"
      },
      {
       "id": "s-1-12-2",
       "original": "Section 2 presents the system overview.",
       "zh": "第 2 节给出系统概览。"
      },
      {
       "id": "s-1-12-3",
       "original": "Sections 3 to 6 describe each module.",
       "zh": "第 3 至 6 节分别描述各模块。"
      },
      {
       "id": "s-1-12-4",
       "original": "Section 7 reports evaluation results.",
       "zh": "第 7 节报告评测结果。"
      },
      {
       "id": "s-1-12-5",
       "original": "Section 8 discusses key design choices and limitations, and Section 9 concludes the report.",
       "zh": "第 8 节讨论关键设计选择与局限，第 9 节总结全文。"
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
    "original": "FireRedASR2S: System Overview",
    "zh": "2 FireRedASR2S：系统概览"
   },
   "blocks": [
    {
     "id": "p-2-1",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-2-1-1",
       "original": "FireRedASR2S is an industrial-grade, all-in-one ASR system that integrates four modules— FireRedVAD (Section 4), FireRedLID (Section 5), FireRedASR2 (Section 3), and FireRedPunc (Section 6)—into a unified pipeline.",
       "zh": "FireRedASR2S 是一套工业级一体化 ASR 系统，将四个模块——FireRedVAD（第 4 节）、FireRedLID（第 5 节）、FireRedASR2（第 3 节）和 FireRedPunc（第 6 节）——整合进一条统一的流水线。"
      },
      {
       "id": "s-2-1-2",
       "original": "The system is designed in a modular manner: each component can be used independently, while the default configuration forms an end-to-end transcription pipeline that handles diverse acoustic conditions (speech, singing, music, and non-speech) as well as multilingual and Chinese dialect scenarios, and produces structured outputs including punctuated text, timestamps, confidence scores, and language labels.",
       "zh": "系统采用模块化设计：每个组件都可独立使用，而默认配置构成一条端到端转写流水线，既能处理多样声学条件（语音、歌声、音乐与非语音），也能处理多语种与中文方言场景，并产出包含带标点文本、时间戳、置信度分数和语种标签的结构化输出。"
      }
     ]
    },
    {
     "id": "p-2-2",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-2-2-1",
       "original": "Pipeline: As illustrated in Figure 1, FireRedASR2S processes an input waveform through four stages.",
       "zh": "流水线：如 Figure 1 所示，FireRedASR2S 将输入波形依次经过四个阶段处理。"
      },
      {
       "id": "s-2-2-2",
       "original": "First, FireRedVAD detects voice segments on the original audio timeline and filters out non-voice regions to improve robustness on long-form audio.",
       "zh": "首先，FireRedVAD 在原始音频时间轴上检测语音段并滤除非语音区段，以提升长音频上的鲁棒性。"
      },
      {
       "id": "s-2-2-3",
       "original": "Second, FireRedLID predicts an utterance-level language label for each detected segment and, when applicable, a Chinese dialect label.",
       "zh": "其次，FireRedLID 为每个检测到的语音段预测一个句级语种标签，并在适用时预测一个中文方言标签。"
      },
      {
       "id": "s-2-2-4",
       "original": "Third, FireRedASR2 transcribes each segment into text and returns an ASR confidence score; when using FireRedASR2-AED, it additionally provides token- and word-level timestamps.",
       "zh": "第三，FireRedASR2 将每个语音段转写为文本并返回一个 ASR 置信度分数；使用 FireRedASR2-AED 时，还会额外提供 token 级与词级时间戳。"
      },
      {
       "id": "s-2-2-5",
       "original": "Finally, FireRedPunc restores punctuation for the ASR output to improve readability and downstream usability.",
       "zh": "最后，FireRedPunc 为 ASR 输出恢复标点，以提升可读性与下游可用性。"
      }
     ]
    },
    {
     "id": "tb-2-3",
     "type": "table_body",
     "page": 3,
     "original": "VAD FireRedVAD\nLID FireRedLID\nASR FireRedASR2\nPunc FireRedPunc",
     "cells": 4,
     "zh": "流水线四模块对应表：VAD→FireRedVAD、LID→FireRedLID、ASR→FireRedASR2、Punc→FireRedPunc。"
    },
    {
     "id": "p-2-7",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-2-7-1",
       "original": "ASR Text w/ Punc: Hello World!",
       "zh": "ASR 带标点文本：Hello World!"
      },
      {
       "id": "s-2-7-2",
       "original": "ASR Timestamps: [0.2,0.6][0.7,1.2] ASR Confidence: 0.99 VAD & AED Info: [0.1, 1.4] speech LID Info: English/0.98",
       "zh": "ASR 时间戳：[0.2,0.6][0.7,1.2] ASR 置信度：0.99 VAD 与 AED 信息：[0.1, 1.4] speech LID 信息：English/0.98"
      }
     ]
    },
    {
     "id": "fig-2-1",
     "type": "figure_caption",
     "page": 3,
     "original": "Figure 1: Overview of FireRedASR2S. The input waveform is processed sequentially by FireRedVAD (VAD), FireRedLID (LID), FireRedASR2 (ASR), and FireRedPunc (Punc) to produce structured transcription outputs, including punctuated text, timestamps, confidence scores, and language labels.",
     "zh": "Figure 1：FireRedASR2S 概览。输入波形依次经过 FireRedVAD（VAD）、FireRedLID（LID）、FireRedASR2（ASR）和 FireRedPunc（Punc）处理，产出结构化转写输出，包括带标点文本、时间戳、置信度分数和语种标签。"
    },
    {
     "id": "p-2-8",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-2-8-1",
       "original": "Structured outputs: FireRedASR2S returns structured outputs containing (1) the final transcription text, (2) a list of sentence-level segments with start/end timestamps, recognized text, ASR confidence, and optional language labels with confidence, and (3) VAD segmentation results.",
       "zh": "结构化输出：FireRedASR2S 返回的结构化输出包含（1）最终转写文本，（2）句级分段列表（含起止时间戳、识别文本、ASR 置信度，以及可选的带置信度语种标签），以及（3）VAD 切分结果。"
      },
      {
       "id": "s-2-8-2",
       "original": "When ASR timestamping is enabled, the system can further derive sentence-level timestamps by leveraging punctuation prediction.",
       "zh": "当启用 ASR 时间戳时，系统还可以借助标点预测进一步导出句级时间戳。"
      },
      {
       "id": "s-2-8-3",
       "original": "All timestamps are reported on the original waveform timeline.",
       "zh": "所有时间戳都在原始波形时间轴上报告。"
      }
     ]
    },
    {
     "id": "p-2-9",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-2-9-1",
       "original": "Modularity: Although FireRedASR2S is designed as an end-to-end pipeline, each module can be deployed as a standalone component (e.g., VAD-only segmentation, LID-only routing, ASR on pre-segmented audio, or punctuation on plain text).",
       "zh": "模块化：尽管 FireRedASR2S 被设计为端到端流水线，每个模块都可以作为独立组件部署（例如仅做 VAD 切分、仅做 LID 路由、对已切分音频做 ASR，或对纯文本做标点恢复）。"
      },
      {
       "id": "s-2-9-2",
       "original": "This modular design enables flexible deployment and independent iteration of each component.",
       "zh": "这种模块化设计支持灵活部署与各组件的独立迭代。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-3",
   "num": "3",
   "level": 1,
   "page": 3,
   "title": {
    "original": "FireRedASR2: Automatic Speech Recognition",
    "zh": "3 FireRedASR2：自动语音识别"
   },
   "blocks": [
    {
     "id": "p-3-1",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-3-1-1",
       "original": "We summarize the key components of FireRedASR2 here and highlight the incremental updates.",
       "zh": "我们在此概述 FireRedASR2 的关键组件，并重点说明增量更新。"
      },
      {
       "id": "s-3-1-2",
       "original": "For detailed specifications of the Conformer and Transformer blocks, the Encoder-Adapter-LLM training procedure, and the optimization strategies, we refer readers to the FireRedASR technical report [1].",
       "zh": "关于 Conformer 与 Transformer 模块、Encoder-Adapter-LLM 训练流程以及优化策略的详细规格，请读者参阅 FireRedASR 技术报告 [1]。"
      }
     ]
    },
    {
     "id": "p-3-2",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-3-2-1",
       "original": "FireRedASR2 comprises two variants: FireRedASR2-AED and FireRedASR2-LLM.",
       "zh": "FireRedASR2 包含两个变体：FireRedASR2-AED 与 FireRedASR2-LLM。"
      },
      {
       "id": "s-3-2-2",
       "original": "FireRedASR2- AED follows the conventional Attention-based Encoder-Decoder architecture [20, 21], whereas FireRedASR2-LLM is built on the Encoder-Adapter-LLM architecture [1–4, 10, 18, 19] that leverages the power of LLM for ASR.",
       "zh": "FireRedASR2-AED 遵循传统的基于注意力的编码器-解码器（AED）架构 [20, 21]，而 FireRedASR2-LLM 构建在 Encoder-Adapter-LLM 架构 [1–4, 10, 18, 19] 之上，借助 LLM 的能力做 ASR。"
      },
      {
       "id": "s-3-2-3",
       "original": "Both models share similar input feature processing and acoustic encoding strategies but differ in their approaches to token sequence modeling.",
       "zh": "两个模型共享相似的输入特征处理与声学编码策略，但在 token 序列建模方式上不同。"
      },
      {
       "id": "s-3-2-4",
       "original": "FireRedASR2-AED additionally supports token-level timestamps and utterance-level confidence scores.",
       "zh": "FireRedASR2-AED 额外支持 token 级时间戳与句级置信度分数。"
      },
      {
       "id": "s-3-2-5",
       "original": "Word-level timestamps are obtained by post-processing token timestamps (e.g., merging English subword units into words).",
       "zh": "词级时间戳通过对 token 时间戳做后处理获得（例如把英文子词单元合并成词）。"
      }
     ]
    },
    {
     "id": "tb-3-3",
     "type": "table_body",
     "page": 3,
     "original": "Conformer\nEncoder\nAdapter\nLarge Language Model\nInitialize\nLoRA\nSpeech\nPrompt\nHello World <sos>\nTranscript Speech Representation\nWorld <eos> Hello\nTo Text\nConformer\nEncoder\n<sos> Hello World\nTransformer\nDecoder\nAttention\nAdapter\nFrame Splice\nLinear + ReLU\nLinear\nHello World <eos>\nTrainable Parameter\nFixed Parameter\nHidden vector\nSpeech\nCTC\nTimestamps",
     "cells": 29,
     "zh": "架构示意元素：Conformer 编码器、Adapter、大语言模型、LoRA、CTC 时间戳等，展示两个变体的结构与可训练/固定参数划分。"
    },
    {
     "id": "fig-3-1",
     "type": "figure_caption",
     "page": 3,
     "original": "Figure 2: Architecture of FireRedASR2-AED (bottom left), FireRedASR2-LLM (right), and Adapter.",
     "zh": "Figure 2：FireRedASR2-AED（左下）、FireRedASR2-LLM（右）与 Adapter 的架构。"
    }
   ]
  },
  {
   "id": "sec-3-1",
   "num": "3.1",
   "level": 2,
   "page": 4,
   "title": {
    "original": "FireRedASR2-AED: Attention-based Encoder-Decoder ASR model",
    "zh": "3.1 FireRedASR2-AED：基于注意力的编码器-解码器 ASR 模型"
   },
   "blocks": [
    {
     "id": "p-3-1-1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-1-1-1",
       "original": "The overall architecture of FireRedASR2-AED is illustrated in Figure 2 (bottom left).",
       "zh": "FireRedASR2-AED 的整体架构如 Figure 2（左下）所示。"
      }
     ]
    },
    {
     "id": "p-3-1-2",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-1-2-1",
       "original": "Architecture: FireRedASR2-AED adopts an end-to-end ASR architecture that follows the Conformerbased Encoder and Transformer-based Decoder design of FireRedASR-AED [1, 24, 25].",
       "zh": "架构：FireRedASR2-AED 采用端到端 ASR 架构，沿用 FireRedASR-AED [1, 24, 25] 的 Conformer 编码器加 Transformer 解码器设计。"
      },
      {
       "id": "s-3-1-2-2",
       "original": "The Encoder begins with convolutional subsampling to reduce frame rate and is followed by stacked Conformer blocks.",
       "zh": "编码器以卷积下采样开头以降低帧率，随后堆叠 Conformer 模块。"
      },
      {
       "id": "s-3-1-2-3",
       "original": "The Decoder is a standard Transformer-based Decoder attending to the Encoder states to generate token sequences with a cross-entropy objective.",
       "zh": "解码器是标准的 Transformer 解码器，关注编码器状态并以交叉熵目标生成 token 序列。"
      },
      {
       "id": "s-3-1-2-4",
       "original": "Unless otherwise specified, architectural hyperparameters and training recipes follow FireRedASR-AED (model size L) [1].",
       "zh": "除非另有说明，架构超参与训练配方沿用 FireRedASR-AED（模型尺寸 L）[1]。"
      }
     ]
    },
    {
     "id": "p-3-1-3",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-1-3-1",
       "original": "Training Data: Compared to FireRedASR, the primary update of FireRedASR2 is the expansion of supervised training data from 70k hours to approximately 200k hours.",
       "zh": "训练数据：与 FireRedASR 相比，FireRedASR2 的主要更新是把监督训练数据从 70k 小时扩展到约 200k 小时。"
      },
      {
       "id": "s-3-1-3-2",
       "original": "The corpus covers Mandarin, English, Chinese dialects, code-switching, speech and singing, as well as non-speech audio.",
       "zh": "语料覆盖普通话、英语、中文方言、语码混合、语音与歌声，以及非语音音频。"
      },
      {
       "id": "s-3-1-3-3",
       "original": "We attribute the performance gains and improved generalization of FireRedASR2 primarily to this larger and more diverse training corpus.",
       "zh": "我们将 FireRedASR2 的性能提升与泛化能力改善主要归功于这个更大、更多样的训练语料。"
      }
     ]
    },
    {
     "id": "p-3-1-4",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-1-4-1",
       "original": "Input Features: We use 80-dimensional log Mel filterbank (FBank) features extracted from 25ms windows and 10ms frame shifts, followed by global mean and variance normalization (CMVN).",
       "zh": "输入特征：我们使用从 25ms 窗、10ms 帧移提取的 80 维 log Mel 滤波器组（FBank）特征，随后做全局均值方差归一化（CMVN）。"
      }
     ]
    },
    {
     "id": "p-3-1-5",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-1-5-1",
       "original": "Tokenization: FireRedASR2-AED adopts a mixed tokenization strategy: Chinese characters for Chinese text and token-level byte-pair encoding (BPE) [26] tokens for English text.",
       "zh": "分词：FireRedASR2-AED 采用混合分词策略：中文文本用汉字，英文文本用 token 级 BPE 分词 [26] 子词。"
      },
      {
       "id": "s-3-1-5-2",
       "original": "Compared to FireRedASR-AED, FireRedASR2-AED uses an updated vocabulary size of 8,667 to better cover multilingual and dialect scenarios.",
       "zh": "与 FireRedASR-AED 相比，FireRedASR2-AED 使用更新后的词表大小 8,667，以更好覆盖多语种与方言场景。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-3-1-1",
   "num": "3.1.1",
   "level": 2,
   "page": 4,
   "title": {
    "original": "Confidence estimation from decoder probabilities",
    "zh": "3.1.1 来自解码器概率的置信度估计"
   },
   "blocks": [
    {
     "id": "p-3-1-1-1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-1-1-1-1",
       "original": "FireRedASR2-AED returns an utterance-level confidence score to indicate the reliability of the transcription.",
       "zh": "FireRedASR2-AED 返回一个句级置信度分数，用于指示转写结果的可靠程度。"
      },
      {
       "id": "s-3-1-1-1-2",
       "original": "This score is derived from the decoder’s token probabilities.",
       "zh": "该分数由解码器的 token 概率导出。"
      },
      {
       "id": "s-3-1-1-1-3",
       "original": "Specifically, we extract the per-token posterior probabilities (i.e., softmax outputs) along the 1-best hypothesis produced by beam search, excluding special tokens.",
       "zh": "具体而言，我们沿束搜索产生的最优（1-best）假设提取每个 token 的后验概率（即 softmax 输出），并排除特殊 token。"
      },
      {
       "id": "s-3-1-1-1-4",
       "original": "These token-level probabilities are then aggregated into a single sequence-level score, typically formulated as the geometric mean of the valid tokens.",
       "zh": "这些 token 级概率随后被聚合为单一的序列级分数，通常取有效 token 的几何平均。"
      },
      {
       "id": "s-3-1-1-1-5",
       "original": "To improve reliability in practical deployments, this raw aggregated score can be further refined using heuristic strategies (e.g., filtering out statistical outliers or applying confidence clipping).",
       "zh": "为了在实际部署中提升可靠性，这一原始聚合分数还可以用启发式策略进一步修正（例如滤除统计离群值或做置信度截断）。"
      },
      {
       "id": "s-3-1-1-1-6",
       "original": "Finally, this sequence-level score can be used for downstream filtering, ranking, or UI display.",
       "zh": "最终，这个序列级分数可用于下游过滤、排序或界面展示。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-3-1-2",
   "num": "3.1.2",
   "level": 2,
   "page": 4,
   "title": {
    "original": "Post-hoc CTC branch for timestamps",
    "zh": "3.1.2 用于时间戳的事后 CTC 分支"
   },
   "blocks": [
    {
     "id": "p-3-1-2-1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-1-2-1-1",
       "original": "A key update in FireRedASR2-AED is the support of timestamps via an additional CTC [27] branch attached to the encoder.",
       "zh": "FireRedASR2-AED 的一项关键更新，是通过挂在编码器上的额外 CTC [27] 分支来支持时间戳。"
      },
      {
       "id": "s-3-1-2-1-2",
       "original": "After the base AED model (Conformer encoder + Transformer decoder) is fully trained, we add a lightweight CTC projection head on top of the encoder outputs and train it post-hoc by freezing the encoder and decoder and optimizing only the CTC branch with the standard CTC objective.",
       "zh": "在基础 AED 模型（Conformer 编码器 + Transformer 解码器）训练完成后，我们在编码器输出之上添加一个轻量的 CTC 投影头，以事后（post-hoc）方式训练它：冻结编码器与解码器，只用标准 CTC 目标优化该分支。"
      },
      {
       "id": "s-3-1-2-1-3",
       "original": "The CTC head is implemented as a linear projection from encoder hidden states to logits, and the CTC vocabulary is identical to the AED vocabulary to enable forced alignment between CTC posteriors and AED-decoded tokens.",
       "zh": "CTC 头实现为从编码器隐状态到 logits 的线性投影，且 CTC 词表与 AED 词表完全一致，以便在 CTC 后验与 AED 解码出的 token 之间做强制对齐。"
      },
      {
       "id": "s-3-1-2-1-4",
       "original": "This design preserves the recognition accuracy of the base AED model while enabling alignment-based timestamp prediction.",
       "zh": "这一设计在保持基础 AED 模型识别精度的同时，实现了基于对齐的时间戳预测。"
      }
     ]
    },
    {
     "id": "p-3-1-2-2",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-1-2-2-1",
       "original": "During inference, we first decode the token sequence using the AED decoder (beam search).",
       "zh": "推理时，我们先用 AED 解码器（束搜索）解码出 token 序列。"
      },
      {
       "id": "s-3-1-2-2-2",
       "original": "We then compute frame-level CTC logits from encoder states and perform CTC forced alignment between the CTC logits and the AED-decoded token sequence (with blank id set to 0).",
       "zh": "然后由编码器状态计算帧级 CTC logits，并在 CTC logits 与 AED 解码出的 token 序列之间执行 CTC 强制对齐（blank id 设为 0）。"
      },
      {
       "id": "s-3-1-2-2-3",
       "original": "The frame-level alignment is converted into token-level start/end times according to the encoder subsampling rate.",
       "zh": "帧级对齐结果再按编码器下采样率换算成 token 级的起止时间。"
      }
     ]
    },
    {
     "id": "p-3-1-2-3",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-1-2-3-1",
       "original": "For the final system output, we provide word-level timestamps by post-processing token timestamps.",
       "zh": "对于最终系统输出，我们通过对 token 时间戳做后处理来提供词级时间戳。"
      },
      {
       "id": "s-3-1-2-3-2",
       "original": "Specifically, we merge timestamps of subword units into words by grouping the corresponding BPE tokens and taking the minimum start time and maximum end time within each merged word.",
       "zh": "具体而言，我们把子词单元的时间戳合并为词：对相应的 BPE token 分组，取每个合并词内的最小开始时间与最大结束时间。"
      },
      {
       "id": "s-3-1-2-3-3",
       "original": "For Chinese, we treat each character token as a word unit.",
       "zh": "对中文，我们把每个汉字 token 视为一个词单元。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-3-2",
   "num": "3.2",
   "level": 2,
   "page": 4,
   "title": {
    "original": "FireRedASR2-LLM: Encoder-Adapter-LLM-based ASR model",
    "zh": "3.2 FireRedASR2-LLM：基于 Encoder-Adapter-LLM 的 ASR 模型"
   },
   "blocks": [
    {
     "id": "p-3-2-1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-2-1-1",
       "original": "FireRedASR2-LLM is also an end-to-end ASR model and follows the Encoder-Adapter-LLM framework of FireRedASR-LLM [1].",
       "zh": "FireRedASR2-LLM 同样是端到端 ASR 模型，遵循 FireRedASR-LLM [1] 的 Encoder-Adapter-LLM 框架。"
      },
      {
       "id": "s-3-2-1-2",
       "original": "The model consists of: (1) a Conformer-based audio Encoder that transforms acoustic features into high-level representations, (2) a lightweight Adapter that maps encoder outputs into the embedding space of a pretrained text LLM [28], and (3) an autoregressive",
       "zh": "该模型由三部分组成：（1）一个基于 Conformer 的音频编码器，把声学特征变换为高层表示；（2）一个轻量 Adapter，把编码器输出映射到预训练文本 LLM [28] 的嵌入空间；（3）一个自回归的"
      }
     ]
    },
    {
     "id": "p-3-2-2",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-3-2-2-1",
       "original": "LLM that performs next-token prediction to generate the transcript.",
       "zh": "LLM，通过下一 token 预测生成转写文本。"
      },
      {
       "id": "s-3-2-2-2",
       "original": "The overall architecture of FireRedASR2-LLM is illustrated in Figure 2 (right).",
       "zh": "FireRedASR2-LLM 的整体架构如 Figure 2（右）所示。"
      }
     ]
    },
    {
     "id": "p-3-2-3",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-3-2-3-1",
       "original": "FireRedASR2-LLM employs the same training data, input features and processing methods as FireRedASR2-AED.",
       "zh": "FireRedASR2-LLM 采用与 FireRedASR2-AED 相同的训练数据、输入特征与处理方法。"
      },
      {
       "id": "s-3-2-3-2",
       "original": "The encoder of FireRedASR2-LLM is initialized with pre-trained weights from the encoder of FireRedASR2-AED.",
       "zh": "FireRedASR2-LLM 的编码器用 FireRedASR2-AED 编码器的预训练权重初始化。"
      }
     ]
    },
    {
     "id": "p-3-2-4",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-3-2-4-1",
       "original": "The key change from FireRedASR-LLM to FireRedASR2-LLM is the expanded 200k hours supervised training corpus described in Section 3.1.",
       "zh": "从 FireRedASR-LLM 到 FireRedASR2-LLM 的关键变化，是第 3.1 节所述扩展到 200k 小时的监督训练语料。"
      },
      {
       "id": "s-3-2-4-2",
       "original": "The architecture and the training strategy otherwise remain the same as FireRedASR-LLM.",
       "zh": "除此之外，架构与训练策略与 FireRedASR-LLM 保持一致。"
      },
      {
       "id": "s-3-2-4-3",
       "original": "We refer readers to [1] for details such as prompt formatting, parameter-efficient LLM adaptation, and decoding configurations.",
       "zh": "关于提示（prompt）格式、参数高效的 LLM 适配以及解码配置等细节，请读者参阅 [1]。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-3-3",
   "num": "3.3",
   "level": 2,
   "page": 5,
   "title": {
    "original": "Summary of differences from FireRedASR",
    "zh": "3.3 与 FireRedASR 的差异小结"
   },
   "blocks": [
    {
     "id": "tab-3-3-1",
     "type": "table_caption",
     "page": 5,
     "original": "Table 1 summarizes the major differences between FireRedASR2 and FireRedASR. Overall, FireRedASR2 retains the proven model designs in FireRedASR, while improving generalization via a larger and more diverse training corpus and enabling timestamp generation via a post-hoc CTC branch in the AED variant.",
     "zh": "Table 1 汇总了 FireRedASR2 与 FireRedASR 之间的主要差异。总体而言，FireRedASR2 保留了 FireRedASR 中经过验证的模型设计，同时通过更大、更多样的训练语料提升泛化能力，并在 AED 变体中通过事后 CTC 分支实现时间戳生成。"
    },
    {
     "id": "tab-3-3-2",
     "type": "table_caption",
     "page": 5,
     "original": "Table 1: Key updates from FireRedASR to FireRedASR2.",
     "zh": "Table 1：从 FireRedASR 到 FireRedASR2 的关键更新。"
    },
    {
     "id": "p-3-3-1",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-3-3-1-1",
       "original": "Item FireRedASR FireRedASR2",
       "zh": "对比项 FireRedASR FireRedASR2"
      }
     ]
    },
    {
     "id": "p-3-3-2",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-3-3-2-1",
       "original": "Training data ~70k hours ~200k hours Vocab size (AED) 7,832 8,667 Timestamps (AED) Not Supported Supported",
       "zh": "训练数据 约 70k 小时 约 200k 小时 词表大小（AED）7,832 8,667 时间戳（AED）不支持 支持"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-4",
   "num": "4",
   "level": 1,
   "page": 5,
   "title": {
    "original": "FireRedVAD: Voice Activity Detection",
    "zh": "4 FireRedVAD：语音活动检测"
   },
   "blocks": [
    {
     "id": "p-4-1",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-4-1-1",
       "original": "FireRedVAD provides robust segmentation for downstream ASR in real-world audio, where speech may co-exist with singing, background music, and various non-speech acoustic events.",
       "zh": "FireRedVAD 为真实音频中的下游 ASR 提供鲁棒切分，在这类音频中，语音可能与歌声、背景音乐以及各种非语音声学事件共存。"
      },
      {
       "id": "s-4-1-2",
       "original": "Unlike many industrial VAD solutions that rely on ASR forced-alignment signals and are trained primarily on ASR corpora, FireRedVAD is trained on high-quality human-annotated acoustic event data, enabling more reliable detection under complex acoustic conditions.",
       "zh": "与许多依赖 ASR 强制对齐信号、并主要在 ASR 语料上训练的工业界 VAD 方案不同，FireRedVAD 在高质量人工标注的声学事件数据上训练，从而在复杂声学条件下实现更可靠的检测。"
      }
     ]
    },
    {
     "id": "p-4-2",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-4-2-1",
       "original": "FireRedVAD includes three DFSMN-based models: (1) a non-streaming VAD model for offline segmentation, (2) a streaming VAD model for low-latency online segmentation, and (3) a nonstreaming multi-label VAD (mVAD) model for acoustic event recognition.",
       "zh": "FireRedVAD 包含三个基于 DFSMN 的模型：（1）用于离线切分的非流式 VAD 模型；（2）用于低延迟在线切分的流式 VAD 模型；（3）用于声学事件识别的非流式多标签 VAD（mVAD）模型。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-4-1",
   "num": "4.1",
   "level": 2,
   "page": 5,
   "title": {
    "original": "Tasks and label definitions",
    "zh": "4.1 任务与标签定义"
   },
   "blocks": [
    {
     "id": "p-4-1-1",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-4-1-1-1",
       "original": "Multi-label VAD (mVAD): mVAD is formulated as a frame-level multi-label classification task over three event posteriors: speech, singing, and music.",
       "zh": "多标签 VAD（mVAD）：mVAD 被形式化为帧级多标签分类任务，输出三类事件的后验：语音、歌声和音乐。"
      },
      {
       "id": "s-4-1-1-2",
       "original": "The mVAD model outputs an independent posterior probability for each event, and event segments are obtained via event-wise post-processing.",
       "zh": "mVAD 模型为每个事件输出独立的后验概率，事件区段通过按事件分别后处理得到。"
      }
     ]
    },
    {
     "id": "p-4-1-2",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-4-1-2-1",
       "original": "Voice Activity Detection (VAD): VAD is formulated as a frame-level binary classification task to predict voice versus non-voice.",
       "zh": "语音活动检测（VAD）：VAD 被形式化为帧级二分类任务，预测有声（voice）还是无声（non-voice）。"
      },
      {
       "id": "s-4-1-2-2",
       "original": "We define voice as the union of speech and singing, and non-voice as music, silence, and noise.",
       "zh": "我们把有声定义为语音与歌声的并集，把无声定义为音乐、静音和噪声。"
      },
      {
       "id": "s-4-1-2-3",
       "original": "This definition matches typical ASR usage in user-generated-content (UGC) scenarios, where singing segments are often processed similarly to speech.",
       "zh": "这一定义契合用户生成内容（UGC）场景下 ASR 的典型用法——歌声片段通常按与语音类似的方式处理。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-4-2",
   "num": "4.2",
   "level": 2,
   "page": 5,
   "title": {
    "original": "Training data",
    "zh": "4.2 训练数据"
   },
   "blocks": [
    {
     "id": "p-4-2-1",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-4-2-1-1",
       "original": "Human-annotated event corpus: We train FireRedVAD using thousands of hours of humanannotated acoustic event data.",
       "zh": "人工标注事件语料：我们使用数千小时人工标注的声学事件数据训练 FireRedVAD。"
      },
      {
       "id": "s-4-2-1-2",
       "original": "Each utterance is annotated with time boundaries for speech, singing, and music.",
       "zh": "每条音频都标注了语音、歌声和音乐的时间边界。"
      },
      {
       "id": "s-4-2-1-3",
       "original": "Unlike common practice of deriving VAD supervision from ASR forced alignment or weak segmentation heuristics, FireRedVAD uses direct human annotations.",
       "zh": "与常见的从 ASR 强制对齐或弱切分启发式规则导出 VAD 监督信号的做法不同，FireRedVAD 直接使用人工标注。"
      }
     ]
    },
    {
     "id": "p-4-2-2",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-4-2-2-1",
       "original": "Supervision for mVAD and VAD: The mVAD model uses the original three-class labels directly.",
       "zh": "mVAD 与 VAD 的监督信号：mVAD 模型直接使用原始的三类标签。"
      },
      {
       "id": "s-4-2-2-2",
       "original": "The VAD models use binary labels derived from the same annotation space by mapping speech and singing to the positive class and mapping music, silence, and noise to the negative class.",
       "zh": "VAD 模型使用从同一标注空间导出的二值标签：语音与歌声映射为正类，音乐、静音和噪声映射为负类。"
      },
      {
       "id": "s-4-2-2-3",
       "original": "Although",
       "zh": "尽管"
      }
     ]
    },
    {
     "id": "p-4-2-3",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-4-2-3-1",
       "original": "the tasks share a related ontology, mVAD and VAD are trained as separate models with task-specific objectives and post-processing criteria.",
       "zh": "这些任务共享一套相关的事件本体，mVAD 和 VAD 仍作为独立模型分别训练，各自采用任务特定的目标函数与后处理准则。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-4-3",
   "num": "4.3",
   "level": 2,
   "page": 6,
   "title": {
    "original": "Model architecture",
    "zh": "4.3 模型架构"
   },
   "blocks": [
    {
     "id": "p-4-3-1",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-4-3-1-1",
       "original": "Input features: FireRedVAD uses the same acoustic features as FireRedASR2 (Section 3).",
       "zh": "输入特征：FireRedVAD 使用与 FireRedASR2 相同的声学特征（第 3 节）。"
      }
     ]
    },
    {
     "id": "p-4-3-2",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-4-3-2-1",
       "original": "DFSMN backbone: All FireRedVAD models adopt a Deep Feedforward Sequential Memory Network (DFSMN) [29, 30], which is effective and efficient for frame-level acoustic classification.",
       "zh": "DFSMN 骨干：所有 FireRedVAD 模型都采用深度前馈序列记忆网络（DFSMN）[29, 30]，它对帧级声学分类任务既有效又高效。"
      },
      {
       "id": "s-4-3-2-2",
       "original": "We implement FSMN [31] memory blocks using depthwise 1-D convolutions with dilation to model temporal context, together with residual connections for stable optimization.",
       "zh": "我们用带膨胀系数的深度可分离 1-D 卷积实现 FSMN [31] 记忆模块来建模时序上下文，并配合残差连接以保证优化稳定。"
      }
     ]
    },
    {
     "id": "p-4-3-3",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-4-3-3-1",
       "original": "Network configuration: We use 8 DFSMN blocks followed by one additional feed-forward layer.",
       "zh": "网络配置：我们使用 8 个 DFSMN 模块，后接一个额外的前馈层。"
      },
      {
       "id": "s-4-3-3-2",
       "original": "The hidden size is 256 and the projection size is 128.",
       "zh": "隐层大小为 256，投影大小为 128。"
      },
      {
       "id": "s-4-3-3-3",
       "original": "For temporal context, we use look-back order 20 with stride 1.",
       "zh": "时序上下文方面，回看阶数（look-back order）取 20，步长为 1。"
      },
      {
       "id": "s-4-3-3-4",
       "original": "For non-streaming VAD and mVAD, we use look-ahead order 20 with stride 1 to utilize future context for improved offline segmentation.",
       "zh": "对非流式 VAD 和 mVAD，前瞻阶数（look-ahead order）取 20、步长 1，以利用未来上下文改善离线切分。"
      },
      {
       "id": "s-4-3-3-5",
       "original": "For streaming VAD, we use look-ahead order 0 to ensure causal inference.",
       "zh": "对流式 VAD，前瞻阶数取 0，以保证因果推理。"
      },
      {
       "id": "s-4-3-3-6",
       "original": "We apply dropout with rate 0.05.",
       "zh": "我们施加丢弃率 0.05 的 dropout。"
      }
     ]
    },
    {
     "id": "p-4-3-4",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-4-3-4-1",
       "original": "Model size: Thanks to the compact design, all three FireRedVAD models are extremely lightweight, each containing only ∼0.6M parameters (approximately 2.2 MB in float32 format).",
       "zh": "模型大小：得益于紧凑的设计，三个 FireRedVAD 模型都极为轻量，每个仅含约 0.6M 参数（float32 格式下约 2.2 MB）。"
      },
      {
       "id": "s-4-3-4-2",
       "original": "This ultralightweight footprint ensures minimal memory and computational overhead, making them highly suitable for massive concurrent processing on cloud servers as well as low-resource edge deployment.",
       "zh": "这种超轻量的体量确保了极小的内存与计算开销，使其非常适合云端服务器的大规模并发处理以及低资源端侧部署。"
      }
     ]
    },
    {
     "id": "p-4-3-5",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-4-3-5-1",
       "original": "Output layer: The final classifier is a linear projection from DFSMN states to logits.",
       "zh": "输出层：最终分类器是从 DFSMN 状态到 logits 的线性投影。"
      },
      {
       "id": "s-4-3-5-2",
       "original": "VAD uses a one-dimensional output (voice vs. non-voice), while mVAD uses a three-dimensional output (speech, singing, and music).",
       "zh": "VAD 使用一维输出（有声对无声），mVAD 使用三维输出（语音、歌声、音乐）。"
      },
      {
       "id": "s-4-3-5-3",
       "original": "We apply sigmoid activations to obtain posterior probabilities.",
       "zh": "我们施加 sigmoid 激活得到后验概率。"
      }
     ]
    },
    {
     "id": "p-4-3-6",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-4-3-6-1",
       "original": "Streaming inference: To support online VAD, the streaming model maintains a small per-layer cache that stores a fixed-length history required by the FSMN look-back memory.",
       "zh": "流式推理：为支持在线 VAD，流式模型维护一个小的逐层缓存，存放 FSMN 回看记忆所需的定长历史。"
      },
      {
       "id": "s-4-3-6-2",
       "original": "During inference, the model updates caches incrementally and outputs frame posteriors without reprocessing past audio, enabling low-latency and bounded-memory streaming.",
       "zh": "推理时，模型增量更新缓存并输出帧级后验，无需重算历史音频，从而实现低延迟、内存有界的流式处理。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-4-4",
   "num": "4.4",
   "level": 2,
   "page": 6,
   "title": {
    "original": "Post-processing and segmentation",
    "zh": "4.4 后处理与切分"
   },
   "blocks": [
    {
     "id": "p-4-4-1",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-4-4-1-1",
       "original": "The DFSMN models produce frame-level posterior probabilities, which are converted into time segments via a deterministic post-processing pipeline.",
       "zh": "DFSMN 模型输出帧级后验概率，再经一条确定性的后处理流水线转换为时间段。"
      },
      {
       "id": "s-4-4-1-2",
       "original": "We first apply a moving-average filter to smooth the posterior sequence, followed by a probability threshold to obtain frame-level decisions.",
       "zh": "我们首先对后验序列施加滑动平均滤波做平滑，随后按概率阈值得到帧级判定。"
      },
      {
       "id": "s-4-4-1-3",
       "original": "To suppress spurious toggling caused by local acoustic fluctuations, a finite-state postprocessor enforces minimum voice and silence duration constraints, improving stability for both offline and streaming settings.",
       "zh": "为抑制局部声学波动引起的抖动误判，一个有限状态后处理器强制执行最短有声时长与最短静音时长约束，从而提升离线与流式两种场景下的稳定性。"
      },
      {
       "id": "s-4-4-1-4",
       "original": "Segments are optionally refined by merging short gaps, extending boundaries, and splitting overly long voice segments, which improves robustness for long-form audio and downstream ASR.",
       "zh": "切分段可选地经过合并短空隙、延伸边界、切分过长有声段等精修，以提升长音频与下游 ASR 的鲁棒性。"
      }
     ]
    },
    {
     "id": "p-4-4-2",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-4-4-2-1",
       "original": "For mVAD, the same pipeline is applied independently to each event posterior stream (speech, singing, and music) with event-specific thresholds, yielding per-event timestamp segments.",
       "zh": "对 mVAD，同一条流水线以事件特定阈值独立作用于每一路事件后验流（语音、歌声、音乐），得到逐事件的时间戳区段。"
      },
      {
       "id": "s-4-4-2-2",
       "original": "Non-streaming VAD outputs a set of voice segments with start/end timestamps; streaming VAD outputs incremental frame-level decisions and voice start/end events; mVAD outputs per-event timestamps for speech, singing, and music, enabling event-aware downstream processing.",
       "zh": "非流式 VAD 输出一组带起止时间戳的有声区段；流式 VAD 输出增量的帧级判定与有声开始/结束事件；mVAD 输出语音、歌声、音乐的逐事件时间戳，支持事件感知的下游处理。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-5",
   "num": "5",
   "level": 1,
   "page": 6,
   "title": {
    "original": "FireRedLID: Hierarchical Spoken Language and Dialect Identification",
    "zh": "5 FireRedLID：分层级口语语种与方言识别"
   },
   "blocks": [
    {
     "id": "p-5-1",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-5-1-1",
       "original": "Spoken language identification (LID) [32–35] is a key component for multilingual and Chinese dialect speech processing in an all-in-one ASR system.",
       "zh": "口语语种识别（LID）[32–35] 是一体化 ASR 系统中处理多语种与中文方言语音的关键组件。"
      },
      {
       "id": "s-5-1-2",
       "original": "In practical deployments, LID is often used to route utterances to language-specific downstream processing, and errors in LID may propagate to subsequent modules such as ASR decoding and punctuation prediction.",
       "zh": "在实际部署中，LID 常用于把语句路由到特定语种的下游处理，LID 的错误可能传播到 ASR 解码、标点预测等后续模块。"
      },
      {
       "id": "s-5-1-3",
       "original": "FireRedLID is designed to be robust under diverse acoustic conditions and to support both multilingual language identification and fine-grained Chinese dialect identification.",
       "zh": "FireRedLID 的设计目标是在多样声学条件下保持鲁棒，并同时支持多语种种类识别与细粒度中文方言识别。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-5-1",
   "num": "5.1",
   "level": 2,
   "page": 6,
   "title": {
    "original": "Model and training",
    "zh": "5.1 模型与训练"
   },
   "blocks": [
    {
     "id": "p-5-1-1",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-5-1-1-1",
       "original": "Architecture: FireRedLID adopts an Encoder-Decoder-based architecture with a Conformer Encoder and a Transformer Decoder, following the implementation style of our AED ASR models.",
       "zh": "架构：FireRedLID 采用基于编码器-解码器的架构，由 Conformer 编码器和 Transformer 解码器组成，实现风格沿用我们的 AED ASR 模型。"
      },
      {
       "id": "s-5-1-1-2",
       "original": "Given an",
       "zh": "给定一段"
      }
     ]
    },
    {
     "id": "p-5-1-2",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-5-1-2-1",
       "original": "input utterance, the Encoder produces acoustic representations, and the Decoder generates a short token sequence that represents the LID result.",
       "zh": "输入语句，编码器产出声学表示，解码器生成一个代表 LID 结果的短 token 序列。"
      }
     ]
    },
    {
     "id": "p-5-1-3",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-5-1-3-1",
       "original": "Initialization: The Conformer Encoder is initialized from the pre-trained FireRedASR2-AED Encoder (Section 3.1) to leverage its large-scale ASR representation learning.",
       "zh": "初始化：Conformer 编码器以预训练的 FireRedASR2-AED 编码器（第 3.1 节）初始化，以利用其大规模 ASR 表示学习的成果。"
      },
      {
       "id": "s-5-1-3-2",
       "original": "The LID Decoder is randomly initialized and trained from scratch.",
       "zh": "LID 解码器则随机初始化并从头训练。"
      }
     ]
    },
    {
     "id": "p-5-1-4",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-5-1-4-1",
       "original": "Input features: FireRedLID uses the same acoustic features as FireRedASR2 (Section 3).",
       "zh": "输入特征：FireRedLID 使用与 FireRedASR2 相同的声学特征（第 3 节）。"
      }
     ]
    },
    {
     "id": "p-5-1-5",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-5-1-5-1",
       "original": "Training data: FireRedLID is trained on approximately 200k hours of multilingual speech covering 100+ languages, including Mandarin and 20+ Chinese dialects.",
       "zh": "训练数据：FireRedLID 在约 200k 小时的多语种语音上训练，覆盖 100+ 语种，包括普通话和 20+ 中文方言。"
      },
      {
       "id": "s-5-1-5-2",
       "original": "The data is curated to include diverse domains and acoustic conditions to improve generalization.",
       "zh": "数据经过筛选以涵盖多样领域与声学条件，从而改善泛化能力。"
      }
     ]
    },
    {
     "id": "p-5-1-6",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-5-1-6-1",
       "original": "Training objective: FireRedLID is trained with a standard sequence-to-sequence cross-entropy objective using teacher forcing.",
       "zh": "训练目标：FireRedLID 采用标准的序列到序列交叉熵目标、以教师强制（teacher forcing）方式训练。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-5-2",
   "num": "5.2",
   "level": 2,
   "page": 7,
   "title": {
    "original": "Hierarchical label space and decoding",
    "zh": "5.2 分层级标签空间与解码"
   },
   "blocks": [
    {
     "id": "p-5-2-1",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-5-2-1-1",
       "original": "Two-level labels: FireRedLID models LID as a two-level hierarchy.",
       "zh": "两级标签：FireRedLID 把 LID 建模为一个两级层级结构。"
      },
      {
       "id": "s-5-2-1-2",
       "original": "The first level predicts the language (e.g., zh, en, ja, ko, etc.).",
       "zh": "第一级预测语种（如 zh、en、ja、ko 等）。"
      },
      {
       "id": "s-5-2-1-3",
       "original": "When the predicted language is Chinese (zh), the model additionally predicts a Chinese dialect label (e.g., mandarin, yue, wu, min, xiang, etc.).",
       "zh": "当预测语种为中文（zh）时，模型额外预测一个中文方言标签（如 mandarin、yue、wu、min、xiang 等）。"
      },
      {
       "id": "s-5-2-1-4",
       "original": "This design reflects the natural label structure and improves stability for dialect identification by conditioning dialect prediction on the coarse language decision.",
       "zh": "这一设计贴合标签的天然结构，并通过把方言预测条件化在粗粒度语种判定之上，提升了方言识别的稳定性。"
      }
     ]
    },
    {
     "id": "p-5-2-2",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-5-2-2-1",
       "original": "Short-sequence token prediction: We formulate hierarchical LID as a short sequence generation task with a maximum decoding length of 2.",
       "zh": "短序列 token 预测：我们把分层级 LID 形式化为一个最大解码长度为 2 的短序列生成任务。"
      },
      {
       "id": "s-5-2-2-2",
       "original": "In practice, the model emits a language token first and typically emits a second token for Chinese dialect before generating <eos>.",
       "zh": "实际中，模型先发出一个语种 token，对中文通常再发出第二个方言 token，然后生成 <eos>。"
      },
      {
       "id": "s-5-2-2-3",
       "original": "For non-Chinese utterances, the decoder usually terminates after predicting the language token by emitting <eos>.",
       "zh": "对非中文语句，解码器通常在预测完语种 token 后就以 <eos> 终止。"
      },
      {
       "id": "s-5-2-2-4",
       "original": "This formulation keeps the label sequence compact and reduces ambiguity compared with a flat label space.",
       "zh": "相比扁平标签空间，这一形式化让标签序列保持紧凑，并减少了歧义。"
      }
     ]
    },
    {
     "id": "p-5-2-3",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-5-2-3-1",
       "original": "Decoding and confidence: During inference, we apply beam search to decode the label token sequence.",
       "zh": "解码与置信度：推理时我们用束搜索解码标签 token 序列。"
      },
      {
       "id": "s-5-2-3-2",
       "original": "Since the output length is at most 2 tokens, decoding overhead is negligible.",
       "zh": "由于输出长度最多为 2 个 token，解码开销可以忽略。"
      },
      {
       "id": "s-5-2-3-3",
       "original": "We report the best hypothesis and compute an utterance-level confidence as the mean posterior probability of the decoded label tokens (excluding special tokens such as <sos> and <eos>).",
       "zh": "我们报告最优假设，并以解码出的标签 token 的平均后验概率（排除 <sos>、<eos> 等特殊 token）作为句级置信度。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-5-3",
   "num": "5.3",
   "level": 2,
   "page": 7,
   "title": {
    "original": "Supported languages and dialects",
    "zh": "5.3 支持的语种与方言"
   },
   "blocks": [
    {
     "id": "p-5-3-1",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-5-3-1-1",
       "original": "Label coverage: FireRedLID supports 100+ languages and 20+ Chinese dialects.",
       "zh": "标签覆盖：FireRedLID 支持 100+ 语种和 20+ 中文方言。"
      },
      {
       "id": "s-5-3-1-2",
       "original": "We represent languages using compact language codes (e.g., zh, en, ja, ko) and group the 20+ Chinese dialects into 8 distinct geographical or linguistic dialect clusters (e.g., mandarin, yue, wu, min, etc.).",
       "zh": "我们用紧凑的语种代码表示语种（如 zh、en、ja、ko），并把 20+ 中文方言归为 8 个不同的地理或语言学方言簇（如 mandarin、yue、wu、min 等）。"
      },
      {
       "id": "s-5-3-1-3",
       "original": "The complete lists of supported languages and dialects are provided in Appendix B.",
       "zh": "支持的语种与方言的完整列表见附录 B。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-6",
   "num": "6",
   "level": 1,
   "page": 7,
   "title": {
    "original": "FireRedPunc: Punctuation Prediction",
    "zh": "6 FireRedPunc：标点预测"
   },
   "blocks": [
    {
     "id": "p-6-1",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-6-1-1",
       "original": "FireRedPunc predicts punctuation for ASR transcripts to improve readability and downstream usability (e.g., subtitle display and machine translation).",
       "zh": "FireRedPunc 为 ASR 转写文本预测标点，以提升可读性与下游可用性（例如字幕展示和机器翻译）。"
      },
      {
       "id": "s-6-1-2",
       "original": "It targets Chinese and English punctuation prediction for open-domain ASR outputs.",
       "zh": "它面向开放域 ASR 输出，处理中文和英文的标点预测。"
      }
     ]
    },
    {
     "id": "p-6-2",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-6-2-1",
       "original": "Architecture: FireRedPunc adopts a BERT-style encoder [22] with a token-level classification head.",
       "zh": "架构：FireRedPunc 采用 BERT 式编码器 [22]，配一个 token 级分类头。"
      },
      {
       "id": "s-6-2-2",
       "original": "Given an input token sequence, the model predicts a punctuation tag for each token, indicating the punctuation mark to be inserted after the token.",
       "zh": "给定输入 token 序列，模型为每个 token 预测一个标点标签，表示应插入在该 token 之后的标点符号。"
      },
      {
       "id": "s-6-2-3",
       "original": "We initialize the encoder from a pre-trained LERT checkpoint [23], a linguistically-motivated BERT variant, and fine-tune it for punctuation prediction.",
       "zh": "我们用预训练的 LERT 检查点 [23]——一种融入语言学先验的 BERT 变体——初始化编码器，并为标点预测任务做微调。"
      }
     ]
    },
    {
     "id": "p-6-3",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-6-3-1",
       "original": "Punctuation set: We use a compact 5-way punctuation set corresponding to no-punctuation and the four marks , . ? !.",
       "zh": "标点集合：我们使用紧凑的 5 类标点集合，对应无标点以及 , . ? ! 四个符号。"
      },
      {
       "id": "s-6-3-2",
       "original": "In our implementation, we use the Chinese full-width punctuation marks for Chinese text.",
       "zh": "在实现中，中文文本使用中文全角标点符号。"
      },
      {
       "id": "s-6-3-3",
       "original": "This design covers the most frequent punctuation marks in ASR applications while keeping the classifier simple and stable.",
       "zh": "这一设计覆盖了 ASR 应用中最高频的标点，同时让分类器保持简单稳定。"
      }
     ]
    },
    {
     "id": "p-6-4",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-6-4-1",
       "original": "Training data: FireRedPunc is trained on large-scale multi-domain text corpora with punctuation annotations.",
       "zh": "训练数据：FireRedPunc 在带标点标注的大规模多领域文本语料上训练。"
      },
      {
       "id": "s-6-4-2",
       "original": "The training data contains approximately 18.57B Chinese characters and 2.20B English words, covering diverse domains and writing styles to improve generalization to ASR-like inputs.",
       "zh": "训练数据包含约 18.57B 个中文字符和 2.20B 个英文单词，覆盖多样领域与写作风格，以改善对 ASR 风格输入的泛化。"
      }
     ]
    },
    {
     "id": "p-6-5",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-6-5-1",
       "original": "Training objective: We train FireRedPunc with a standard token-level cross-entropy objective.",
       "zh": "训练目标：我们采用标准的 token 级交叉熵目标训练 FireRedPunc。"
      }
     ]
    },
    {
     "id": "p-6-6",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-6-6-1",
       "original": "Inference: At inference time, we tokenize ASR outputs using the same tokenizer as the pre-trained LERT encoder and apply the model to obtain token-level punctuation tags.",
       "zh": "推理：推理时，我们用与预训练 LERT 编码器相同的分词器对 ASR 输出分词，再应用模型得到 token 级标点标签。"
      },
      {
       "id": "s-6-6-2",
       "original": "The final punctuated text is generated by inserting predicted punctuation marks into the original text sequence.",
       "zh": "最终带标点的文本通过把预测出的标点符号插入原始文本序列生成。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-7",
   "num": "7",
   "level": 1,
   "page": 8,
   "title": {
    "original": "Evaluation",
    "zh": "7 评测"
   },
   "blocks": [
    {
     "id": "p-7-1",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-7-1-1",
       "original": "In this section, we evaluate FireRedASR2S on public benchmarks by reporting module-level results for ASR, VAD, LID, and punctuation prediction.",
       "zh": "本节我们在公开基准上评测 FireRedASR2S，分别报告 ASR、VAD、LID 和标点预测的模块级结果。"
      },
      {
       "id": "s-7-1-2",
       "original": "Each module is evaluated independently to avoid confounding effects introduced by upstream or downstream components.",
       "zh": "每个模块独立评测，以避免上下游组件引入的混杂影响。"
      },
      {
       "id": "s-7-1-3",
       "original": "Unless otherwise stated, all results are obtained in non-streaming settings.",
       "zh": "除非另有说明，所有结果均在非流式设定下取得。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-7-1",
   "num": "7.1",
   "level": 2,
   "page": 8,
   "title": {
    "original": "Evaluation of FireRedASR2",
    "zh": "7.1 FireRedASR2 评测"
   },
   "blocks": [
    {
     "id": "p-7-1-1",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-7-1-1-1",
       "original": "We evaluate FireRedASR2 on 24 public test sets covering Mandarin, Chinese dialects, and singing lyrics recognition.",
       "zh": "我们在 24 个覆盖普通话、中文方言与歌声歌词识别的公开测试集上评测 FireRedASR2。"
      },
      {
       "id": "s-7-1-1-2",
       "original": "FireRedASR2 includes two variants: FireRedASR2-LLM (8B+ parameters) and FireRedASR2-AED (1B+ parameters), representing different points on the accuracy-efficiency trade-off.",
       "zh": "FireRedASR2 包含两个变体：FireRedASR2-LLM（8B+ 参数）与 FireRedASR2-AED（1B+ 参数），代表精度-效率权衡上的不同取点。"
      }
     ]
    },
    {
     "id": "p-7-1-2",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-7-1-2-1",
       "original": "Metric: We use Character Error Rate (CER, %) for Chinese.",
       "zh": "指标：中文使用字错误率（CER，%）。"
      },
      {
       "id": "s-7-1-2-2",
       "original": "Lower is better.",
       "zh": "越低越好。"
      },
      {
       "id": "s-7-1-2-3",
       "original": "For aggregated results, we report: (1) Avg-All-24: average CER across all 24 test sets, (2) Avg-Mandarin-4: average CER across 4 Mandarin test sets, (3) Avg-Dialect-19: average CER across 19 Chinese dialect test sets, (4) Sing-1: CER on the singing lyrics test set (opencpop).",
       "zh": "聚合结果方面，我们报告：（1）Avg-All-24：全部 24 个测试集上的平均 CER；（2）Avg-Mandarin-4：4 个普通话测试集上的平均 CER；（3）Avg-Dialect-19：19 个中文方言测试集上的平均 CER；（4）Sing-1：歌声歌词测试集（opencpop）上的 CER。"
      },
      {
       "id": "s-7-1-2-4",
       "original": "All averaged CERs are macro-averaged over test sets (equal weight per test set).",
       "zh": "所有平均 CER 均按测试集做宏平均（每个测试集等权重）。"
      }
     ]
    },
    {
     "id": "p-7-1-3",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-7-1-3-1",
       "original": "Test sets: Avg-Mandarin-4 includes AISHELL-1 test set [36] (aishell1), AISHELL-2 iOS test set[37] (aishell2), and WenetSpeech [38] Internet/Meeting domains (ws-net/ws-meeting).",
       "zh": "测试集：Avg-Mandarin-4 包括 AISHELL-1 测试集 [36]（aishell1）、AISHELL-2 iOS 测试集 [37]（aishell2），以及 WenetSpeech [38] 的互联网/会议域（ws-net/ws-meeting）。"
      },
      {
       "id": "s-7-1-3-2",
       "original": "Avg-Dialect-19 includes KeSpeech [39] as well as dialect test sets curated from WenetSpeech-Yue [40], WenetSpeechChuan [41], and MagicData [42] (see Appendix A for the full list).",
       "zh": "Avg-Dialect-19 包括 KeSpeech [39]，以及从 WenetSpeech-Yue [40]、WenetSpeechChuan [41] 和 MagicData [42] 整理的方言测试集（完整列表见附录 A）。"
      },
      {
       "id": "s-7-1-3-3",
       "original": "Sing-1 uses opencpop [43] for singing lyrics recognition.",
       "zh": "Sing-1 使用 opencpop [43] 做歌声歌词识别。"
      }
     ]
    },
    {
     "id": "p-7-1-4",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-7-1-4-1",
       "original": "Baselines: We compare with strong commercial and open-source baselines: (1) Doubao-ASR (commercial API) [4, 44], (2) Qwen3-ASR (open-source checkpoint) [2], (3) Fun-ASR (commercial API) [3, 45], (4) Fun-ASR-Nano (open-source checkpoint; worse than Fun-ASR API; reported in Appendix) [3].",
       "zh": "基线：我们与强商业与开源基线对比：（1）Doubao-ASR（商业 API）[4, 44]；（2）Qwen3-ASR（开源检查点）[2]；（3）Fun-ASR（商业 API）[3, 45]；（4）Fun-ASR-Nano（开源检查点，弱于 Fun-ASR API，结果见附录）[3]。"
      },
      {
       "id": "s-7-1-4-2",
       "original": "We emphasize that API-based baselines may change over time due to server-side updates and may include proprietary system-level components.",
       "zh": "需要强调的是，基于 API 的基线可能因服务端更新而随时间变化，且可能包含私有的系统级组件。"
      },
      {
       "id": "s-7-1-4-3",
       "original": "We report their results as a practical reference point rather than a strictly reproducible baseline.",
       "zh": "我们把它们的结果作为实用的参考点，而非严格可复现的基线。"
      },
      {
       "id": "s-7-1-4-4",
       "original": "Full per-test-set results are provided in Appendix A.",
       "zh": "完整的逐测试集结果见附录 A。"
      }
     ]
    },
    {
     "id": "tab-7-1-1",
     "type": "table_caption",
     "page": 8,
     "original": "Table 2: Comparison of Character Error Rate (CER%) for FireRedASR2-LLM (FRASR2-LLM), FireRedASR2-AED (FRASR2-AED), and other large ASR baselines on public ASR test sets.",
     "zh": "Table 2：FireRedASR2-LLM（FRASR2-LLM）、FireRedASR2-AED（FRASR2-AED）与其他大型 ASR 基线在公开 ASR 测试集上的字错误率（CER%）对比。"
    },
    {
     "id": "p-7-1-5",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-7-1-5-1",
       "original": "FRASR2-LLM FRASR2-AED Doubao-ASR Qwen3-ASR Fun-ASR",
       "zh": "FRASR2-LLM FRASR2-AED Doubao-ASR Qwen3-ASR Fun-ASR"
      }
     ]
    },
    {
     "id": "p-7-1-6",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-7-1-6-1",
       "original": "Avg-All-24 9.67 9.80 12.98 10.12 10.92 Avg-Mandarin-4 2.89 3.05 3.69 3.76 4.16 Avg-Dialect-19 11.55 11.67 15.39 11.85 12.76 Sing-1 1.12 1.17 4.36 2.57 3.05 0.64 0.57 1.52 1.48 1.64 2.15 2.51 2.77 2.71 2.38 ws-net 4.44 4.57 5.73 4.97 6.85 ws-meeting 4.32 4.53 4.74 5.88 5.78",
       "zh": "Avg-All-24 9.67 9.80 12.98 10.12 10.92 Avg-Mandarin-4 2.89 3.05 3.69 3.76 4.16 Avg-Dialect-19 11.55 11.67 15.39 11.85 12.76 Sing-1 1.12 1.17 4.36 2.57 3.05 0.64 0.57 1.52 1.48 1.64 2.15 2.51 2.77 2.71 2.38 ws-net 4.44 4.57 5.73 4.97 6.85 ws-meeting 4.32 4.53 4.74 5.88 5.78（以上各数值与原文一致，依次为五个模型在各聚合指标与单测试集上的 CER%）"
      }
     ]
    },
    {
     "id": "p-7-1-7",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-7-1-7-1",
       "original": "API baselines: Doubao-ASR (volc.seedasr.auc) was evaluated in early February 2026, and Fun-ASR was evaluated in late November 2025.",
       "zh": "API 基线：Doubao-ASR（volc.seedasr.auc）于 2026 年 2 月初评测，Fun-ASR 于 2025 年 11 月底评测。"
      },
      {
       "id": "s-7-1-7-2",
       "original": "API results may change over time due to server-side updates and may include proprietary components.",
       "zh": "API 结果可能因服务端更新而随时间变化，且可能包含私有组件。"
      },
      {
       "id": "s-7-1-7-3",
       "original": "To ensure a fair comparison, we disabled ITN and punctuation in the API outputs whenever such options were available, and used the default VAD configuration provided by each API.",
       "zh": "为保证公平对比，凡 API 提供相应选项，我们都关闭了输出中的 ITN 与标点，并使用各 API 默认的 VAD 配置。"
      }
     ]
    },
    {
     "id": "p-7-1-8",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-7-1-8-1",
       "original": "Data overlap: Our ASR training data does not include any Chinese dialect or accented speech data from MagicData; all MagicData dialect datasets are used for evaluation only.",
       "zh": "数据重叠：我们的 ASR 训练数据不包含任何来自 MagicData 的中文方言或口音语音数据；所有 MagicData 方言数据集仅用于评测。"
      }
     ]
    },
    {
     "id": "p-7-1-9",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-7-1-9-1",
       "original": "Results and analysis: Table 2 summarizes the main results.",
       "zh": "结果与分析：Table 2 汇总了主要结果。"
      },
      {
       "id": "s-7-1-9-2",
       "original": "FireRedASR2-LLM achieves the best overall accuracy across all aggregated metrics, reaching 2.89% average CER on Mandarin (AvgMandarin-4), 11.55% on Chinese dialect (Avg-Dialect-19), and 9.67% on Avg-All-24.",
       "zh": "FireRedASR2-LLM 在所有聚合指标上都取得最佳整体精度：普通话（Avg-Mandarin-4）平均 CER 2.89%，中文方言（Avg-Dialect-19）11.55%，Avg-All-24 为 9.67%。"
      },
      {
       "id": "s-7-1-9-3",
       "original": "FireRedASR2 also performs strongly on singing lyrics recognition: on opencpop, FireRedASR2-LLM achieves 1.12% CER.",
       "zh": "FireRedASR2 在歌声歌词识别上同样表现强劲：在 opencpop 上，FireRedASR2-LLM 取得 1.12% CER。"
      },
      {
       "id": "s-7-1-9-4",
       "original": "FireRedASR2-AED achieves competitive accuracy with a smaller model size, providing a more balanced option for practical deployment.",
       "zh": "FireRedASR2-AED 以更小的模型尺寸取得有竞争力的精度，为实际部署提供了更均衡的选择。"
      },
      {
       "id": "s-7-1-9-5",
       "original": "Detailed per-test-set results are provided in Appendix A.",
       "zh": "详细的逐测试集结果见附录 A。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-7-2",
   "num": "7.2",
   "level": 2,
   "page": 9,
   "title": {
    "original": "Evaluation of FireRedVAD",
    "zh": "7.2 FireRedVAD 评测"
   },
   "blocks": [
    {
     "id": "p-7-2-1",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-7-2-1-1",
       "original": "Task and label definition: We evaluate FireRedVAD on a binary speech activity detection task (voice vs. non-voice).",
       "zh": "任务与标签定义：我们在二分类语音活动检测任务（有声对无声）上评测 FireRedVAD。"
      },
      {
       "id": "s-7-2-1-2",
       "original": "This evaluation focuses on speech presence/absence and is aligned with typical VAD usage for ASR segmentation.",
       "zh": "该评测聚焦语音的存在与否，与 ASR 切分中 VAD 的典型用法一致。"
      }
     ]
    },
    {
     "id": "p-7-2-2",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-7-2-2-1",
       "original": "Metrics: We report AUC-ROC, F1 score, False Alarm Rate (FAR), and Miss Rate (MR).",
       "zh": "指标：我们报告 AUC-ROC、F1 分数、误报率（FAR）和漏检率（MR）。"
      },
      {
       "id": "s-7-2-2-2",
       "original": "AUC-ROC is threshold-independent.",
       "zh": "AUC-ROC 与阈值无关。"
      },
      {
       "id": "s-7-2-2-3",
       "original": "F1/FAR/MR depend on the decision threshold.",
       "zh": "F1/FAR/MR 依赖判定阈值。"
      }
     ]
    },
    {
     "id": "p-7-2-3",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-7-2-3-1",
       "original": "Test set: We evaluate on FLEURS-VAD-102, a multilingual VAD benchmark covering 102 languages.",
       "zh": "测试集：我们在 FLEURS-VAD-102 上评测，这是一个覆盖 102 种语言的多语种 VAD 基准。"
      },
      {
       "id": "s-7-2-3-2",
       "original": "It is constructed by sampling approximately 100 audio files per language from the FLEURS test set and manually annotating binary VAD labels, resulting in 9,443 audio files in total.",
       "zh": "它的构建方式是从 FLEURS 测试集为每种语言抽样约 100 条音频并人工标注二值 VAD 标签，共计 9,443 条音频。"
      },
      {
       "id": "s-7-2-3-3",
       "original": "We will release FLEURS-VAD-102 and its annotation protocol to facilitate reproducible research.",
       "zh": "我们将发布 FLEURS-VAD-102 及其标注规范，以促进可复现研究。"
      }
     ]
    },
    {
     "id": "p-7-2-4",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-7-2-4-1",
       "original": "Frame setup: All VAD metrics are computed at the frame level.",
       "zh": "帧设定：所有 VAD 指标都在帧级计算。"
      },
      {
       "id": "s-7-2-4-2",
       "original": "We use 25ms analysis windows with a 10ms frame shift, consistent with the feature extraction setup used in FireRedASR2.",
       "zh": "我们使用 25ms 分析窗与 10ms 帧移，与 FireRedASR2 的特征提取设定一致。"
      }
     ]
    },
    {
     "id": "p-7-2-5",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-7-2-5-1",
       "original": "Baselines and operating point: We compare with widely used open-source VAD systems, including Silero-VAD [46], TEN-VAD [47], FunASR-VAD [30], and WebRTC-VAD [48].",
       "zh": "基线与工作点：我们与广泛使用的开源 VAD 系统对比，包括 Silero-VAD [46]、TEN-VAD [47]、FunASR-VAD [30] 和 WebRTC-VAD [48]。"
      },
      {
       "id": "s-7-2-5-2",
       "original": "For thresholddependent metrics (F1/FAR/MR), we use a fixed posterior threshold of 0.5 for all neural VAD models to provide a consistent operating point; tuning thresholds on a development set may further improve F1 for individual systems.",
       "zh": "对依赖阈值的指标（F1/FAR/MR），我们为所有神经 VAD 模型统一使用固定的后验阈值 0.5，以提供一致的工作点；在开发集上调阈值可能进一步提升单个系统的 F1。"
      }
     ]
    },
    {
     "id": "tab-7-2-1",
     "type": "table_caption",
     "page": 9,
     "original": "Table 3: Frame-level VAD performance on FLEURS-VAD-102. Higher is better for AUC-ROC and F1; lower is better for FAR and MR.",
     "zh": "Table 3：FLEURS-VAD-102 上的帧级 VAD 性能。AUC-ROC 与 F1 越高越好，FAR 与 MR 越低越好。"
    },
    {
     "id": "p-7-2-6",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-7-2-6-1",
       "original": "Metric \\ Model FireRedVAD Silero-VAD TEN-VAD FunASR-VAD WebRTC-VAD",
       "zh": "指标＼模型 FireRedVAD Silero-VAD TEN-VAD FunASR-VAD WebRTC-VAD"
      }
     ]
    },
    {
     "id": "p-7-2-7",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-7-2-7-1",
       "original": "AUC-ROC (%) ↑ 99.60 97.99 97.81 F1 (%) ↑ 97.57 95.95 95.19 90.91 52.30 FAR (%) ↓ 2.69 9.41 15.47 44.03 2.83 MR (%) ↓ 3.62 3.95 2.95 0.42 64.15",
       "zh": "AUC-ROC（%）↑ 99.60 97.99 97.81 F1（%）↑ 97.57 95.95 95.19 90.91 52.30 FAR（%）↓ 2.69 9.41 15.47 44.03 2.83 MR（%）↓ 3.62 3.95 2.95 0.42 64.15（数值与原文一致，FunASR-VAD 与 WebRTC-VAD 未报告 AUC-ROC）"
      }
     ]
    },
    {
     "id": "p-7-2-8",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-7-2-8-1",
       "original": "AUC-ROC is not reported for FunASR-VAD and WebRTC-VAD, as these systems do not output continuous posterior probabilities required for threshold-independent evaluation.",
       "zh": "FunASR-VAD 与 WebRTC-VAD 未报告 AUC-ROC，因为这两个系统不输出阈值无关评测所需的连续后验概率。"
      }
     ]
    },
    {
     "id": "p-7-2-9",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-7-2-9-1",
       "original": "Results and analysis: As shown in Table 3, FireRedVAD achieves strong multilingual VAD performance with 99.60% AUC-ROC and 97.57% F1, outperforming all compared baselines.",
       "zh": "结果与分析：如 Table 3 所示，FireRedVAD 以 99.60% AUC-ROC 和 97.57% F1 取得强多语种 VAD 性能，优于所有参与对比的基线。"
      },
      {
       "id": "s-7-2-9-2",
       "original": "Notably, FireRedVAD achieves this SOTA performance with an exceptionally small parameter size (∼0.6M), demonstrating a strong balance between accuracy and efficiency for practical industrial pipelines.",
       "zh": "值得注意的是，FireRedVAD 以极小的参数量（约 0.6M）达成这一 SOTA 性能，在精度与效率之间展现出面向工业实用流水线的强平衡。"
      },
      {
       "id": "s-7-2-9-3",
       "original": "FireRedVAD maintains a low false alarm rate (2.69%) while keeping a low miss rate (3.62%), indicating a balanced operating point for downstream segmentation.",
       "zh": "FireRedVAD 保持低误报率（2.69%）的同时维持低漏检率（3.62%），表明其工作点对下游切分较为均衡。"
      },
      {
       "id": "s-7-2-9-4",
       "original": "We note that some baselines (e.g., FunASR-VAD) achieve a very low miss rate but at the cost of a substantially higher false alarm rate, which may lead to excessive segmentation and unnecessary downstream ASR computation in practical deployments.",
       "zh": "我们注意到，一些基线（如 FunASR-VAD）实现了极低的漏检率，但代价是显著更高的误报率，这在实际部署中可能导致过度切分和不必要的下游 ASR 计算。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-7-3",
   "num": "7.3",
   "level": 2,
   "page": 9,
   "title": {
    "original": "Evaluation of FireRedLID",
    "zh": "7.3 FireRedLID 评测"
   },
   "blocks": [
    {
     "id": "p-7-3-1",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-7-3-1-1",
       "original": "Test sets: We evaluate FireRedLID on multilingual and Chinese dialect LID benchmarks.",
       "zh": "测试集：我们在多语种与中文方言 LID 基准上评测 FireRedLID。"
      },
      {
       "id": "s-7-3-1-2",
       "original": "For multilingual LID, we report results on the FLEURS [49] test set (82 languages) and CommonVoice [50] test set (74 languages).",
       "zh": "多语种 LID 方面，我们报告 FLEURS [49] 测试集（82 种语言）和 CommonVoice [50] 测试集（74 种语言）上的结果。"
      },
      {
       "id": "s-7-3-1-3",
       "original": "For Chinese dialect identification, we evaluate on a combined benchmark by directly merging test samples from KeSpeech and MagicData, covering 10+ Chinese dialects.",
       "zh": "中文方言识别方面，我们在一个合并基准上评测——直接合并来自 KeSpeech 和 MagicData 的测试样本，覆盖 10+ 种中文方言。"
      }
     ]
    },
    {
     "id": "p-7-3-2",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-7-3-2-1",
       "original": "Metric: We report utterance-level LID accuracy (%).",
       "zh": "指标：我们报告句级 LID 准确率（%）。"
      },
      {
       "id": "s-7-3-2-2",
       "original": "Higher is better.",
       "zh": "越高越好。"
      }
     ]
    },
    {
     "id": "p-7-3-3",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-7-3-3-1",
       "original": "Baselines: We compare with Whisper [51] language identification, SpeechBrain LID model [52], and Dolphin [53].",
       "zh": "基线：我们与 Whisper [51] 的语种识别、SpeechBrain LID 模型 [52] 以及 Dolphin [53] 对比。"
      }
     ]
    },
    {
     "id": "tab-7-3-1",
     "type": "table_caption",
     "page": 10,
     "original": "Table 4: Utterance-level LID accuracy (%) on public test sets. Higher is better.",
     "zh": "Table 4：公开测试集上的句级 LID 准确率（%）。越高越好。"
    },
    {
     "id": "p-7-3-4",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-7-3-4-1",
       "original": "FireRedLID Whisper SpeechBrain Dolphin",
       "zh": "FireRedLID Whisper SpeechBrain Dolphin"
      }
     ]
    },
    {
     "id": "p-7-3-5",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-7-3-5-1",
       "original": "FLEURS test 97.18 79.41 92.91 CommonVoice test 92.07 80.81 78.75 Chinese dialects 88.47 69.01",
       "zh": "FLEURS 测试集 97.18 79.41 92.91 CommonVoice 测试集 92.07 80.81 78.75 中文方言 88.47 69.01（数值与原文一致，部分单元格原文留空）"
      }
     ]
    },
    {
     "id": "p-7-3-6",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-7-3-6-1",
       "original": "Results and analysis: Table 4 shows that FireRedLID achieves strong performance on both multilingual and Chinese dialect LID tasks.",
       "zh": "结果与分析：Table 4 显示 FireRedLID 在多语种与中文方言 LID 任务上都取得强性能。"
      },
      {
       "id": "s-7-3-6-2",
       "original": "On FLEURS, FireRedLID reaches 97.18% accuracy, substantially outperforming Whisper and improving over SpeechBrain.",
       "zh": "在 FLEURS 上，FireRedLID 达到 97.18% 准确率，大幅超越 Whisper，并优于 SpeechBrain。"
      },
      {
       "id": "s-7-3-6-3",
       "original": "On CommonVoice, FireRedLID also achieves the best accuracy among compared systems.",
       "zh": "在 CommonVoice 上，FireRedLID 同样在参与对比的系统中取得最佳准确率。"
      },
      {
       "id": "s-7-3-6-4",
       "original": "On the combined Chinese dialect benchmark, FireRedLID achieves 88.47% accuracy, demonstrating the effectiveness of our hierarchical label modeling for fine-grained Chinese dialect identification.",
       "zh": "在合并的中文方言基准上，FireRedLID 取得 88.47% 准确率，展示了我们的分层级标签建模在细粒度中文方言识别上的有效性。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-7-4",
   "num": "7.4",
   "level": 2,
   "page": 10,
   "title": {
    "original": "Evaluation of FireRedPunc",
    "zh": "7.4 FireRedPunc 评测"
   },
   "blocks": [
    {
     "id": "p-7-4-1",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-7-4-1-1",
       "original": "Test sets: We evaluate FireRedPunc on internal multi-domain Chinese and English punctuation prediction benchmarks.",
       "zh": "测试集：我们在内部多领域中文与英文标点预测基准上评测 FireRedPunc。"
      },
      {
       "id": "s-7-4-1-2",
       "original": "The Chinese benchmark contains 88,644 sentences, and the English benchmark contains 28,641 sentences.",
       "zh": "中文基准包含 88,644 个句子，英文基准包含 28,641 个句子。"
      },
      {
       "id": "s-7-4-1-3",
       "original": "We will release the Chinese and English punctuation benchmarks to facilitate reproducible research.",
       "zh": "我们将发布中英文标点基准，以促进可复现研究。"
      }
     ]
    },
    {
     "id": "p-7-4-2",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-7-4-2-1",
       "original": "Label set and metric: FireRedPunc predicts punctuation tags from a compact set (space/nopunctuation, comma, period, question mark, and exclamation mark; see Section 6).",
       "zh": "标签集与指标：FireRedPunc 从一个紧凑的标签集合中预测标点标签（空格/无标点、逗号、句号、问号、感叹号；见第 6 节）。"
      },
      {
       "id": "s-7-4-2-2",
       "original": "For evaluation, we report Precision/Recall/F1 (%) computed on punctuation labels.",
       "zh": "评测时，我们报告在标点标签上计算的精确率/召回率/F1（%）。"
      },
      {
       "id": "s-7-4-2-3",
       "original": "According to our evaluation protocol, the Overall score is computed as micro-averaged Precision/Recall/F1 over all non-space punctuation labels.",
       "zh": "按我们的评测协议，Overall 分数是对所有非空格标点标签做微平均得到的精确率/召回率/F1。"
      },
      {
       "id": "s-7-4-2-4",
       "original": "Due to its extremely low frequency in the evaluation data, we exclude the exclamation mark from the reported Overall score.",
       "zh": "由于感叹号在评测数据中频率极低，我们把它从报告的 Overall 分数中排除。"
      }
     ]
    },
    {
     "id": "p-7-4-3",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-7-4-3-1",
       "original": "Baseline: We compare with a widely used punctuation model, FunASR-Punc (CT-Transformer) [30].",
       "zh": "基线：我们与广泛使用的标点模型 FunASR-Punc（CT-Transformer）[30] 对比。"
      }
     ]
    },
    {
     "id": "tab-7-4-1",
     "type": "table_caption",
     "page": 10,
     "original": "Table 5: Punctuation prediction results on internal test sets (Precision/Recall/F1 in %). Higher is better.",
     "zh": "Table 5：内部测试集上的标点预测结果（精确率/召回率/F1，单位 %）。越高越好。"
    },
    {
     "id": "p-7-4-4",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-7-4-4-1",
       "original": "FireRedPunc FunASR-Punc",
       "zh": "FireRedPunc FunASR-Punc"
      }
     ]
    },
    {
     "id": "p-7-4-5",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-7-4-5-1",
       "original": "Multi-domain Chinese Multi-domain English Average F1 78.90 62.77",
       "zh": "多领域中文 多领域英文 平均 F1 78.90 62.77（数值与原文一致）"
      }
     ]
    },
    {
     "id": "p-7-4-6",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-7-4-6-1",
       "original": "Results and analysis: As shown in Table 5, FireRedPunc consistently outperforms the baseline on both Chinese and English benchmarks.",
       "zh": "结果与分析：如 Table 5 所示，FireRedPunc 在中文与英文基准上都稳定优于基线。"
      },
      {
       "id": "s-7-4-6-2",
       "original": "In particular, FireRedPunc achieves 82.96% F1 on Chinese and 74.83% F1 on English, resulting in a 78.90% average F1.",
       "zh": "具体而言，FireRedPunc 在中文上取得 82.96% F1、在英文上取得 74.83% F1，平均 F1 为 78.90%。"
      },
      {
       "id": "s-7-4-6-3",
       "original": "The large gain on English suggests that our LERT-initialized BERT-style encoder and large-scale multi-domain training data are effective for punctuation prediction on ASR-like text.",
       "zh": "英文上的大幅领先说明，我们以 LERT 初始化的 BERT 式编码器与大规模多领域训练数据对 ASR 风格文本的标点预测是有效的。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-8",
   "num": "8",
   "level": 1,
   "page": 10,
   "title": {
    "original": "Discussion",
    "zh": "8 讨论"
   },
   "blocks": [
    {
     "id": "p-8-1",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-8-1-1",
       "original": "We discuss key design choices and practical considerations of FireRedASR2S.",
       "zh": "我们讨论 FireRedASR2S 的关键设计选择与工程实践考量。"
      }
     ]
    },
    {
     "id": "p-8-2",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-8-2-1",
       "original": "System design: modularity with consistent interfaces: FireRedASR2S is designed as a modular pipeline consisting of VAD, LID, ASR, and punctuation prediction.",
       "zh": "系统设计：接口一致的模块化：FireRedASR2S 被设计为由 VAD、LID、ASR 和标点预测组成的模块化流水线。"
      },
      {
       "id": "s-8-2-2",
       "original": "This design simplifies deployment and maintenance, allows independent iteration of each component, and improves reproducibility compared with ad-hoc integration of heterogeneous modules.",
       "zh": "这一设计简化了部署与维护，允许各组件独立迭代，相比异构模块的临时拼装也改善了可复现性。"
      }
     ]
    },
    {
     "id": "p-8-3",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-8-3-1",
       "original": "Improved ASR accuracy and dialect coverage via data scaling: FireRedASR2 largely preserves the proven model architectures in FireRedASR and focuses on scaling supervised training data to approximately 200k hours with broader coverage.",
       "zh": "通过数据扩量提升 ASR 精度与方言覆盖：FireRedASR2 基本保留了 FireRedASR 中经过验证的模型架构，重点是把监督训练数据扩展到约 200k 小时并拓宽覆盖面。"
      },
      {
       "id": "s-8-3-2",
       "original": "The consistent improvements on Mandarin",
       "zh": "普通话"
      }
     ]
    },
    {
     "id": "p-8-4",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-8-4-1",
       "original": "benchmarks and the strong performance on dialect test sets suggest that expanding supervised data diversity is a major driver for both recognition accuracy and generalization to diverse Chinese dialect scenarios.",
       "zh": "基准上的一致提升以及方言测试集上的强表现表明，扩大监督数据的多样性是识别精度与对多样中文方言场景泛化能力的主要驱动力。"
      }
     ]
    },
    {
     "id": "p-8-5",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-8-5-1",
       "original": "Human-labeled event supervision for segmentation: Compared to VAD models trained from ASR forced-alignment-derived supervision, FireRedVAD is trained on thousands of hours of humanannotated acoustic event data.",
       "zh": "面向切分的人工标注事件监督：与从 ASR 强制对齐导出监督信号训练的 VAD 模型相比，FireRedVAD 在数千小时人工标注的声学事件数据上训练。"
      },
      {
       "id": "s-8-5-2",
       "original": "This explicit event supervision improves robustness under diverse acoustic conditions and supports both VAD and mVAD use cases.",
       "zh": "这种显式的事件监督提升了多样声学条件下的鲁棒性，并同时支撑 VAD 与 mVAD 两类用法。"
      }
     ]
    },
    {
     "id": "p-8-6",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-8-6-1",
       "original": "Hierarchical LID for languages and Chinese dialects: FireRedLID models LID as a short sequence generation task with hierarchical labels, predicting language first and dialect conditioned on Chinese.",
       "zh": "面向语种与中文方言的分层级 LID：FireRedLID 把 LID 建模为带分层级标签的短序列生成任务，先预测语种，再以中文为条件预测方言。"
      },
      {
       "id": "s-8-6-2",
       "original": "This formulation better matches the label structure and reduces ambiguity compared with a flat label space, while keeping inference efficient.",
       "zh": "相比扁平标签空间，这一形式化更贴合标签结构、减少歧义，同时保持推理高效。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-9",
   "num": "9",
   "level": 1,
   "page": 11,
   "title": {
    "original": "Conclusion",
    "zh": "9 结论"
   },
   "blocks": [
    {
     "id": "p-9-1",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-9-1-1",
       "original": "We presented FireRedASR2S, a state-of-the-art industrial-grade all-in-one speech recognition system integrating ASR, VAD, LID, and punctuation prediction modules.",
       "zh": "我们提出了 FireRedASR2S，一套业界领先的工业级一体化语音识别系统，整合了 ASR、VAD、LID 和标点预测模块。"
      },
      {
       "id": "s-9-1-2",
       "original": "Building upon FireRedASR, FireRedASR2 improves recognition accuracy and expands coverage to a broader range of Chinese dialects, and provides two variants: an LLM-based model (8B+ parameters) for maximum accuracy and an AED-based model (1B+ parameters) for a balanced accuracy-efficiency trade-off.",
       "zh": "在 FireRedASR 基础上，FireRedASR2 提升了识别精度并把覆盖扩展到更广的中文方言，同时提供两个变体：追求最高精度的 LLM 变体（8B+ 参数），以及在精度-效率之间取得均衡的 AED 变体（1B+ 参数）。"
      },
      {
       "id": "s-9-1-3",
       "original": "FireRedVAD provides robust segmentation and achieves strong multilingual VAD performance.",
       "zh": "FireRedVAD 提供鲁棒的切分，并取得强多语种 VAD 性能。"
      },
      {
       "id": "s-9-1-4",
       "original": "FireRedLID performs hierarchical language and Chinese dialect identification with strong accuracy.",
       "zh": "FireRedLID 以高准确率执行分层级的语种与中文方言识别。"
      },
      {
       "id": "s-9-1-5",
       "original": "FireRedPunc restores punctuation for Chinese and English and achieves strong performance on multi-domain benchmarks.",
       "zh": "FireRedPunc 为中文和英文恢复标点，并在多领域基准上取得强性能。"
      },
      {
       "id": "s-9-1-6",
       "original": "We release model weights and code to facilitate research and practical deployment.",
       "zh": "我们开放模型权重与代码，以促进研究与实际部署。"
      },
      {
       "id": "s-9-1-7",
       "original": "Future work will focus on further improving performance and expanding support for more languages.",
       "zh": "未来工作将聚焦于进一步提升性能并扩展对更多语种的支持。"
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
       "original": "[1] Kai-Tuo Xu, Feng-Long Xie, Xu Tang, and Yao Hu."
      },
      {
       "id": "s-references-1-2",
       "original": "Fireredasr: Open-source industrial-grade mandarin speech recognition models from encoder-decoder to llm integration. arXiv preprint"
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
       "original": "[2] Xian Shi, Xiong Wang, Zhifang Guo, Yongqi Wang, Pei Zhang, Xinyu Zhang, Zishan Guo, Hongkun Hao, Yu Xi, Baosong Yang, et al. Qwen3-asr technical report. arXiv preprint"
      }
     ]
    },
    {
     "id": "p-references-3",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-3-1",
       "original": "[3] Keyu An, Yanni Chen, Zhigao Chen, Chong Deng, Zhihao Du, Changfeng Gao, Zhifu Gao, Bo Gong, Xiangang Li, Yabin Li, et al. Fun-asr technical report. arXiv preprint"
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
       "original": "[4] Seed-ASR (2024)."
      },
      {
       "id": "s-references-4-2",
       "original": "Seed-asr: Understanding diverse speech and contexts with llm-based speech recognition. arXiv preprint arXiv:2407.04675, 2024."
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
       "original": "[5] Wenjie Tian, Bingshen Mu, Guobin Ma, Xuelong Geng, Zhixian Zhao, and Lei Xie. dllm-asr: A faster diffusion llm-based framework for speech recognition. arXiv preprint arXiv:2601.17902, 2026."
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
       "original": "[6] Bingshen Mu, Yiwen Shao, Kun Wei, Dong Yu, and Lei Xie."
      },
      {
       "id": "s-references-6-2",
       "original": "Efficient scaling for llm-based asr. arXiv preprint arXiv:2508.04096, 2025."
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
       "original": "[7] Keyu An, Qian Chen, Chong Deng, Zhihao Du, Changfeng Gao, Zhifu Gao, Yue Gu, Ting He, Hangrui Hu, Kai Hu, et al. Funaudiollm: Voice understanding and generation foundation models for natural interaction between humans and llms. arXiv preprint arXiv:2407.04051, 2024."
      }
     ]
    },
    {
     "id": "p-references-8",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-8-1",
       "original": "[8] Yunfei Chu, Jin Xu, Qian Yang, Haojie Wei, Xipin Wei, Zhifang Guo, Yichong Leng, Yuanjun Lv, Jinzheng He, Junyang Lin, et al. Qwen2-audio technical report. arXiv preprint"
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
       "original": "[9] Yunfei Chu, Jin Xu, Xiaohuan Zhou, Qian Yang, Shiliang Zhang, Zhijie Yan, Chang Zhou, and Jingren Zhou."
      },
      {
       "id": "s-references-9-2",
       "original": "Qwen-audio: Advancing universal audio understanding via unified large-scale audio-language models. arXiv preprint arXiv:2311.07919, 2023."
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
       "original": "[10] Jian Wu, Yashesh Gaur, Zhuo Chen, Long Zhou, Yimeng Zhu, Tianrui Wang, Jinyu Li, Shujie Liu, Bo Ren, Linquan Liu, et al. On decoder-only architecture for speech-to-text and large language model integration."
      },
      {
       "id": "s-references-10-2",
       "original": "In Automatic Speech Recognition and Understanding Workshop (ASRU), pages 1–8."
      },
      {
       "id": "s-references-10-3",
       "original": "IEEE, 2023."
      }
     ]
    },
    {
     "id": "p-references-11",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-11-1",
       "original": "[11] Paul K Rubenstein, Chulayuth Asawaroengchai, Duc Dung Nguyen, Ankur Bapna, Zalán Borsos, Félix de Chaumont Quitry, Peter Chen, Dalia El Badawy, Wei Han, Eugene Kharitonov, et al. Audiopalm: A large language model that can speak and listen. arXiv preprint arXiv:2306.12925, 2023."
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
       "original": "[12] Yuang Li, Yu Wu, Jinyu Li, and Shujie Liu."
      },
      {
       "id": "s-references-12-2",
       "original": "Prompting large language models for zero-shot domain adaptation in speech recognition."
      },
      {
       "id": "s-references-12-3",
       "original": "In Automatic Speech Recognition and Understanding Workshop (ASRU), pages 1–8."
      },
      {
       "id": "s-references-12-4",
       "original": "IEEE, 2023."
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
       "original": "[13] Mingqiu Wang, Wei Han, Izhak Shafran, Zelin Wu, Chung-Cheng Chiu, Yuan Cao, Nanxin Chen, Yu Zhang, Hagen Soltau, Paul K Rubenstein, et al. Slm: Bridge the thin gap between speech and text foundation models."
      },
      {
       "id": "s-references-13-2",
       "original": "In Automatic Speech Recognition and Understanding Workshop (ASRU), pages 1–8."
      },
      {
       "id": "s-references-13-3",
       "original": "IEEE, 2023."
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
       "original": "[14] Jing Pan, Jian Wu, Yashesh Gaur, Sunit Sivasankaran, Zhuo Chen, Shujie Liu, and Jinyu Li."
      },
      {
       "id": "s-references-14-2",
       "original": "Cosmic: Data efficient instruction-tuning for speech in-context learning. arXiv preprint"
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
       "original": "[15] Wenyi Yu, Changli Tang, Guangzhi Sun, Xianzhao Chen, Tian Tan, Wei Li, Lu Lu, Zejun Ma, and Chao Zhang."
      },
      {
       "id": "s-references-15-2",
       "original": "Connecting speech encoder and large language model for asr."
      },
      {
       "id": "s-references-15-3",
       "original": "In International Conference on Acoustics, Speech and Signal Processing (ICASSP), pages 12637–12641."
      },
      {
       "id": "s-references-15-4",
       "original": "IEEE, 2024."
      }
     ]
    },
    {
     "id": "p-references-16",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-16-1",
       "original": "[16] Zhehuai Chen, He Huang, Andrei Andrusenko, Oleksii Hrinchuk, Krishna C Puvvada, Jason Li, Subhankar Ghosh, Jagadeesh Balam, and Boris Ginsburg."
      },
      {
       "id": "s-references-16-2",
       "original": "Salm: Speech-augmented language model with in-context learning for speech recognition and translation."
      },
      {
       "id": "s-references-16-3",
       "original": "In International Conference on Acoustics, Speech and Signal Processing (ICASSP), pages 13521–13525."
      },
      {
       "id": "s-references-16-4",
       "original": "IEEE, 2024."
      }
     ]
    },
    {
     "id": "p-references-17",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-17-1",
       "original": "[17] Egor Lakomkin, Chunyang Wu, Yassir Fathullah, Ozlem Kalinli, Michael L Seltzer, and Christian Fuegen."
      },
      {
       "id": "s-references-17-2",
       "original": "End-to-end speech recognition contextualization with large language models."
      },
      {
       "id": "s-references-17-3",
       "original": "In International Conference on Acoustics, Speech and Signal Processing (ICASSP), pages 12406–12410."
      },
      {
       "id": "s-references-17-4",
       "original": "IEEE, 2024."
      }
     ]
    },
    {
     "id": "p-references-18",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-18-1",
       "original": "[18] Xuelong Geng, Tianyi Xu, Kun Wei, Bingshen Mu, Hongfei Xue, He Wang, Yangze Li, Pengcheng Guo, Yuhang Dai, Longhao Li, et al. Unveiling the potential of llm-based asr on chinese open-source datasets."
      },
      {
       "id": "s-references-18-2",
       "original": "In 14th International Symposium on Chinese Spoken Language Processing (ISCSLP), pages 26–30."
      },
      {
       "id": "s-references-18-3",
       "original": "IEEE, 2024."
      }
     ]
    },
    {
     "id": "p-references-19",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-19-1",
       "original": "[19] Ziyang Ma, Guanrou Yang, Yifan Yang, Zhifu Gao, Jiaming Wang, Zhihao Du, Fan Yu, Qian Chen, Siqi Zheng, Shiliang Zhang, et al. An embarrassingly simple approach for llm with strong asr capacity. arXiv preprint arXiv:2402.08846, 2024."
      }
     ]
    },
    {
     "id": "p-references-20",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-20-1",
       "original": "[20] Dzmitry Bahdanau, Jan Chorowski, Dmitriy Serdyuk, Philemon Brakel, and Yoshua Bengio."
      },
      {
       "id": "s-references-20-2",
       "original": "End-to-end attention-based large vocabulary speech recognition."
      },
      {
       "id": "s-references-20-3",
       "original": "In International Conference on Acoustics, Speech and Signal Processing (ICASSP), pages 4945–4949."
      },
      {
       "id": "s-references-20-4",
       "original": "IEEE, 2016."
      }
     ]
    },
    {
     "id": "p-references-21",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-21-1",
       "original": "[21] William Chan, Navdeep Jaitly, Quoc Le, and Oriol Vinyals."
      },
      {
       "id": "s-references-21-2",
       "original": "Listen, attend and spell: A neural network for large vocabulary conversational speech recognition."
      },
      {
       "id": "s-references-21-3",
       "original": "In International Conference on Acoustics, Speech and Signal Processing (ICASSP), pages 4960–4964."
      },
      {
       "id": "s-references-21-4",
       "original": "IEEE, 2016."
      }
     ]
    },
    {
     "id": "p-references-22",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-22-1",
       "original": "[22] Jacob Devlin, Ming-Wei Chang, Kenton Lee, and Kristina Toutanova."
      },
      {
       "id": "s-references-22-2",
       "original": "Bert: Pre-training of deep bidirectional transformers for language understanding."
      },
      {
       "id": "s-references-22-3",
       "original": "In Proceedings of the 2019 Conference of the North American Chapter of the Association for Computational Linguistics: Human Language Technologies (NAACL-HLT), pages 4171–4186."
      },
      {
       "id": "s-references-22-4",
       "original": "Association for Computational Linguistics, 2019."
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
       "original": "[23] Yiming Cui, Wanxiang Che, Shijin Wang, and Ting Liu."
      },
      {
       "id": "s-references-23-2",
       "original": "Lert: A linguistically-motivated pre-trained language model. arXiv preprint arXiv:2211.05344, 2022."
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
       "original": "[24] Anmol Gulati, James Qin, Chung-Cheng Chiu, Niki Parmar, Yu Zhang, Jiahui Yu, Wei Han, Shibo Wang, Zhengdong Zhang, Yonghui Wu, et al. Conformer: Convolution-augmented transformer for speech recognition. arXiv preprint arXiv:2005.08100, 2020."
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
       "original": "[25] A Vaswani."
      },
      {
       "id": "s-references-25-2",
       "original": "Attention is all you need."
      },
      {
       "id": "s-references-25-3",
       "original": "Advances in Neural Information Processing Systems, 2017."
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
       "original": "[26] Rico Sennrich."
      },
      {
       "id": "s-references-26-2",
       "original": "Neural machine translation of rare words with subword units. arXiv preprint"
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
       "original": "[27] Alex Graves, Santiago Fernández, Faustino Gomez, and Jürgen Schmidhuber."
      },
      {
       "id": "s-references-27-2",
       "original": "Connectionist temporal classification: labelling unsegmented sequence data with recurrent neural networks."
      },
      {
       "id": "s-references-27-3",
       "original": "In Proceedings of the 23rd international conference on Machine learning, pages 369–376, 2006."
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
       "original": "[28] Qwen team."
      },
      {
       "id": "s-references-28-2",
       "original": "Qwen2 technical report. arXiv preprint arXiv:2407.10671, 2024."
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
       "original": "[29] Shiliang Zhang, Ming Lei, Zhijie Yan, and Lirong Dai."
      },
      {
       "id": "s-references-29-2",
       "original": "Deep-fsmn for large vocabulary continuous speech recognition."
      },
      {
       "id": "s-references-29-3",
       "original": "In International Conference on Acoustics, Speech and Signal Processing (ICASSP), pages 5869–5873."
      },
      {
       "id": "s-references-29-4",
       "original": "IEEE, 2018."
      }
     ]
    },
    {
     "id": "p-references-30",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-references-30-1",
       "original": "[30] Zhifu Gao, Zerui Li, Jiaming Wang, Haoneng Luo, Xian Shi, Mengzhe Chen, Yabin Li, Lingyun Zuo, Zhihao Du, Zhangyu Xiao, and Shiliang Zhang."
      },
      {
       "id": "s-references-30-2",
       "original": "Funasr: A fundamental end-to-end speech recognition toolkit."
      },
      {
       "id": "s-references-30-3",
       "original": "In INTERSPEECH, 2023."
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
       "original": "[31] Shiliang Zhang, Hui Jiang, Shifu Xiong, Si Wei, and Li-Rong Dai."
      },
      {
       "id": "s-references-31-2",
       "original": "Compact feedforward sequential memory networks for large vocabulary continuous speech recognition."
      },
      {
       "id": "s-references-31-3",
       "original": "In Interspeech, pages 3389–3393, 2016."
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
       "original": "[32] Jörgen Valk and Tanel Alumäe."
      },
      {
       "id": "s-references-32-2",
       "original": "Voxlingua107: a dataset for spoken language recognition."
      },
      {
       "id": "s-references-32-3",
       "original": "In 2021 IEEE Spoken Language Technology Workshop (SLT), pages 652–658."
      },
      {
       "id": "s-references-32-4",
       "original": "IEEE, 2021."
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
       "original": "[33] Irshad Ahmad Thukroo, Rumaan Bashir, and Kaiser J Giri."
      },
      {
       "id": "s-references-33-2",
       "original": "A review into deep learning techniques for spoken language identification."
      },
      {
       "id": "s-references-33-3",
       "original": "Multimedia tools and applications, 81(22):32593– 32624, 2022."
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
       "original": "[34] Adal A Alashban, Mustafa A Qamhan, Ali H Meftah, and Yousef A Alotaibi."
      },
      {
       "id": "s-references-34-2",
       "original": "Spoken language identification system using convolutional recurrent neural network."
      },
      {
       "id": "s-references-34-3",
       "original": "Applied Sciences, 12(18):9181, 2022."
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
       "original": "[35] Douglas O’Shaughnessy."
      },
      {
       "id": "s-references-35-2",
       "original": "Spoken language identification: An overview of past and present research trends."
      },
      {
       "id": "s-references-35-3",
       "original": "Speech Communication, 167:103167, 2025."
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
       "original": "[36] Hui Bu, Jiayu Du, Xingyu Na, Bengu Wu, and Hao Zheng."
      },
      {
       "id": "s-references-36-2",
       "original": "Aishell-1: An open-source mandarin speech corpus and a speech recognition baseline."
      },
      {
       "id": "s-references-36-3",
       "original": "In 20th conference of the oriental chapter of the international coordinating committee on speech databases and speech I/O systems and assessment (O-COCOSDA), pages 1–5."
      },
      {
       "id": "s-references-36-4",
       "original": "IEEE, 2017."
      }
     ]
    },
    {
     "id": "p-references-37",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-references-37-1",
       "original": "[37] Jiayu Du, Xingyu Na, Xuechen Liu, and Hui Bu."
      },
      {
       "id": "s-references-37-2",
       "original": "Aishell-2: Transforming mandarin asr research into industrial scale. arXiv preprint arXiv:1808.10583, 2018."
      }
     ]
    },
    {
     "id": "p-references-38",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-references-38-1",
       "original": "[38] Binbin Zhang, Hang Lv, Pengcheng Guo, Qijie Shao, Chao Yang, Lei Xie, Xin Xu, Hui Bu, Xiaoyu Chen, Chenchen Zeng, et al. Wenetspeech: A 10000+ hours multi-domain mandarin corpus for speech recognition."
      },
      {
       "id": "s-references-38-2",
       "original": "In International Conference on Acoustics, Speech and Signal Processing (ICASSP), pages 6182–6186."
      },
      {
       "id": "s-references-38-3",
       "original": "IEEE, 2022."
      }
     ]
    },
    {
     "id": "p-references-39",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-references-39-1",
       "original": "[39] Zhiyuan Tang, Dong Wang, Yanguang Xu, Jianwei Sun, Xiaoning Lei, Shuaijiang Zhao, Cheng Wen, Xingjun Tan, Chuandong Xie, Shuran Zhou, et al. Kespeech: An open source speech dataset of mandarin and its eight subdialects."
      },
      {
       "id": "s-references-39-2",
       "original": "In Thirty-fifth Conference on Neural Information Processing Systems Datasets and Benchmarks Track (Round 2), 2021."
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
       "original": "[40] Longhao Li, Zhao Guo, Hongjie Chen, Yuhang Dai, Ziyu Zhang, Hongfei Xue, Tianlun Zuo, Chengyou Wang, Shuiyuan Wang, Jie Li, et al. Wenetspeech-yue: A large-scale cantonese speech corpus with multi-dimensional annotation. arXiv preprint arXiv:2509.03959, 2025."
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
       "original": "[41] Yuhang Dai, Ziyu Zhang, Shuai Wang, Longhao Li, Zhao Guo, Tianlun Zuo, Shuiyuan Wang, Hongfei Xue, Chengyou Wang, Qing Wang, et al. Wenetspeech-chuan: A large-scale sichuanese corpus with rich annotation for dialectal speech processing. arXiv preprint arXiv:2509.18004, 2025."
      }
     ]
    },
    {
     "id": "eq-references-1",
     "type": "equation",
     "page": 14,
     "original": "[42] Magic Data. Open source asr corpus. https://magichub.com/datasets, 2026."
    },
    {
     "id": "p-references-42",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-42-1",
       "original": "[43] Yu Wang, Xinsheng Wang, Pengcheng Zhu, Jie Wu, Hanzhao Li, Heyang Xue, Yongmao Zhang, Lei Xie, and Mengxiao Bi."
      },
      {
       "id": "s-references-42-2",
       "original": "Opencpop: A high-quality open source chinese popular song corpus for singing voice synthesis. arXiv preprint arXiv:2201.07429, 2022."
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
       "original": "[44] VolcanoEngine."
      },
      {
       "id": "s-references-43-2",
       "original": "Doubao-asr. https://www.volcengine.com/docs/6561/ 1354868, 2026."
      }
     ]
    },
    {
     "id": "p-references-44",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-44-1",
       "original": "[45] Alibaba Cloud."
      },
      {
       "id": "s-references-44-2",
       "original": "Fun-asr. https://help.aliyun.com/zh/model-studio/ recording-file-recognition, 2026."
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
       "original": "[46] Silero Team."
      },
      {
       "id": "s-references-45-2",
       "original": "Silero vad: pre-trained enterprise-grade voice activity detector (vad), number detector and language classifier. https://github.com/snakers4/silero-vad, 2024."
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
       "original": "[47] TEN Team."
      },
      {
       "id": "s-references-46-2",
       "original": "Ten vad: A low-latency, lightweight and high-performance streaming voice activity detector (vad). https://github.com/TEN-framework/ten-vad.git, 2025."
      }
     ]
    },
    {
     "id": "eq-references-2",
     "type": "equation",
     "page": 14,
     "original": "[48] Google. webrtc: Real-time communication for the web. https://webrtc.org, 2026."
    },
    {
     "id": "p-references-47",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-47-1",
       "original": "[49] Alexis Conneau, Min Ma, Simran Khanuja, Yu Zhang, Vera Axelrod, Siddharth Dalmia, Jason Riesa, Clara Rivera, and Ankur Bapna."
      },
      {
       "id": "s-references-47-2",
       "original": "Fleurs: Few-shot learning evaluation of universal representations of speech. arXiv preprint arXiv:2205.12446, 2022."
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
       "original": "[50] Rosana Ardila, Megan Branson, Kelly Davis, Michael Kohler, Josh Meyer, Michael Henretty, Reuben Morais, Lindsay Saunders, Francis Tyers, and Gregor Weber."
      },
      {
       "id": "s-references-48-2",
       "original": "Common voice: A massively-multilingual speech corpus."
      },
      {
       "id": "s-references-48-3",
       "original": "In Proceedings of the twelfth language resources and evaluation conference, pages 4218–4222, 2020."
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
       "original": "[51] Alec Radford, Jong Wook Kim, Tao Xu, Greg Brockman, Christine McLeavey, and Ilya Sutskever."
      },
      {
       "id": "s-references-49-2",
       "original": "Robust speech recognition via large-scale weak supervision."
      },
      {
       "id": "s-references-49-3",
       "original": "In International conference on machine learning, pages 28492–28518."
      },
      {
       "id": "s-references-49-4",
       "original": "PMLR, 2023."
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
       "original": "[52] Mirco Ravanelli, Titouan Parcollet, Peter Plantinga, Aku Rouhe, Samuele Cornell, Loren Lugosch, Cem Subakan, Nauman Dawalatabad, Abdelwahab Heba, Jianyuan Zhong, Ju-Chieh Chou, Sung-Lin Yeh, Szu-Wei Fu, Chien-Feng Liao, Elena Rastorgueva, François Grondin, William Aris, Hwidong Na, Yan Gao, Renato De Mori, and Yoshua Bengio."
      },
      {
       "id": "s-references-50-2",
       "original": "SpeechBrain: A general-purpose speech toolkit, 2021. arXiv:2106.04624."
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
       "original": "[53] Yangyang Meng, Jinpeng Li, Guodong Lin, Yu Pu, Guanbo Wang, Hu Du, Zhiming Shao, Yukai Huang, Ke Li, and Wei-Qiang Zhang."
      },
      {
       "id": "s-references-51-2",
       "original": "Dolphin: A large-scale automatic speech recognition model for eastern languages. arXiv preprint arXiv:2503.20212, 2025."
      }
     ]
    }
   ]
  },
  {
   "id": "sec-appendix",
   "num": null,
   "level": 1,
   "page": 15,
   "title": {
    "original": "Appendix",
    "zh": "附录"
   },
   "blocks": []
  },
  {
   "id": "sec-A",
   "num": "A",
   "level": 1,
   "page": 15,
   "title": {
    "original": "Detailed ASR Results on Public Test Sets",
    "zh": "附录 A 公开测试集上的详细 ASR 结果"
   },
   "blocks": [
    {
     "id": "p-A-1",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-A-1-1",
       "original": "This appendix reports per-test-set CER(%) on all 24 public test sets used in Section 7.1.",
       "zh": "本附录报告第 7.1 节所用全部 24 个公开测试集上的逐测试集 CER（%）。"
      },
      {
       "id": "s-A-1-2",
       "original": "For completeness, we include Fun-ASR-Nano, which is the open-source checkpoint released by FunAudioLLM.",
       "zh": "为完整起见，我们还纳入了 Fun-ASR-Nano，即 FunAudioLLM 发布的开源检查点。"
      }
     ]
    },
    {
     "id": "tab-A-1",
     "type": "table_caption",
     "page": 15,
     "original": "Table 6: Comparison of Character Error Rate (CER%) for FireRedASR2-LLM (FRASR2-LLM), FireRedASR2-AED (FRASR2-AED), and other large ASR baselines on public ASR test sets.",
     "zh": "Table 6：FireRedASR2-LLM（FRASR2-LLM）、FireRedASR2-AED（FRASR2-AED）与其他大型 ASR 基线在公开 ASR 测试集上的字错误率（CER%）对比。"
    },
    {
     "id": "p-A-2",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-A-2-1",
       "original": "FRASR2-LLM FRASR2-AED Doubao-ASR Qwen3-ASR Fun-ASR Fun-Nano",
       "zh": "FRASR2-LLM FRASR2-AED Doubao-ASR Qwen3-ASR Fun-ASR Fun-Nano"
      }
     ]
    },
    {
     "id": "p-A-3",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-A-3-1",
       "original": "Avg-Mandarin-4 2.89 3.05 3.69 3.76 4.16 4.55 Avg-Dialect-19 11.55 11.67 15.39 11.85 12.76 15.07 Avg-All-24 9.67 9.80 12.98 10.12 10.92 12.81 0.64 0.57 1.52 1.48 1.64 1.96 2.15 2.51 2.77 2.71 2.38 3.02 ws-net 4.44 4.57 5.73 4.97 6.85 6.93 ws-meeting 4.32 4.53 4.74 5.88 5.78 6.29",
       "zh": "Avg-Mandarin-4 2.89 3.05 3.69 3.76 4.16 4.55 Avg-Dialect-19 11.55 11.67 15.39 11.85 12.76 15.07 Avg-All-24 9.67 9.80 12.98 10.12 10.92 12.81 0.64 0.57 1.52 1.48 1.64 1.96 2.15 2.51 2.77 2.71 2.38 3.02 ws-net 4.44 4.57 5.73 4.97 6.85 6.93 ws-meeting 4.32 4.53 4.74 5.88 5.78 6.29（数值与原文一致，依次为六个模型在各聚合指标与普通话测试集上的 CER%）"
      }
     ]
    },
    {
     "id": "p-A-4",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-A-4-1",
       "original": "kespeech 3.08 3.60 5.38 5.10 5.36 7.66 ws-yue-short 5.14 5.15 10.51 5.82 7.34 8.82 ws-yue-long 8.71 8.54 11.39 8.85 10.14 11.36 ws-chuan-easy 10.90 10.60 11.33 11.99 12.46 14.05 ws-chuan-hard 20.71 21.35 20.77 21.63 22.49 25.32 md-heavy 7.42 7.43 7.69 8.02 9.13 9.97 md-yue-conv 12.23 11.66 26.25 9.76 33.71 15.68 md-yue-daily 3.61 3.35 12.82 3.66 2.69 5.67 md-yue-vehicle 4.50 4.83 8.66 4.28 6.00 7.04 md-chuan-conv 13.18 13.07 11.77 14.35 14.01 17.11 md-chuan-daily 4.90 5.17 3.90 4.93 3.98 5.95 md-shanghai-conv 28.70 27.02 45.15 29.77 25.49 37.08 md-shanghai-daily 24.94 24.18 44.06 23.93 12.55 28.77 md-wu 7.15 7.14 7.70 7.57 10.63 10.56 md-zheng-conv 10.20 10.65 9.83 9.55 10.85 13.09 md-zheng-daily 5.80 6.26 5.77 5.88 6.29 8.18 md-wuhan 9.60 10.81 9.94 10.22 4.34 8.70 md-tianjin 15.45 15.30 15.79 16.16 19.27 22.03 md-changsha 23.18 25.64 23.76 23.70 25.66 29.23",
       "zh": "kespeech 3.08 3.60 5.38 5.10 5.36 7.66 ws-yue-short 5.14 5.15 10.51 5.82 7.34 8.82 ws-yue-long 8.71 8.54 11.39 8.85 10.14 11.36 ws-chuan-easy 10.90 10.60 11.33 11.99 12.46 14.05 ws-chuan-hard 20.71 21.35 20.77 21.63 22.49 25.32 md-heavy 7.42 7.43 7.69 8.02 9.13 9.97 md-yue-conv 12.23 11.66 26.25 9.76 33.71 15.68 md-yue-daily 3.61 3.35 12.82 3.66 2.69 5.67 md-yue-vehicle 4.50 4.83 8.66 4.28 6.00 7.04 md-chuan-conv 13.18 13.07 11.77 14.35 14.01 17.11 md-chuan-daily 4.90 5.17 3.90 4.93 3.98 5.95 md-shanghai-conv 28.70 27.02 45.15 29.77 25.49 37.08 md-shanghai-daily 24.94 24.18 44.06 23.93 12.55 28.77 md-wu 7.15 7.14 7.70 7.57 10.63 10.56 md-zheng-conv 10.20 10.65 9.83 9.55 10.85 13.09 md-zheng-daily 5.80 6.26 5.77 5.88 6.29 8.18 md-wuhan 9.60 10.81 9.94 10.22 4.34 8.70 md-tianjin 15.45 15.30 15.79 16.16 19.27 22.03 md-changsha 23.18 25.64 23.76 23.70 25.66 29.23（19 个方言测试集的逐集 CER%，数值与原文一致）"
      }
     ]
    },
    {
     "id": "p-A-5",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-A-5-1",
       "original": "opencpop 1.12 1.17 4.36 2.57 3.05 2.95",
       "zh": "opencpop 1.12 1.17 4.36 2.57 3.05 2.95（歌声歌词测试集 CER%，数值与原文一致）"
      }
     ]
    },
    {
     "id": "p-A-6",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-A-6-1",
       "original": "Abbreviations: ws denotes WenetSpeech; md denotes MagicData; conv denotes Conversational; daily denotes Daily-use; Fun-Nano denotes Fun-ASR-Nano-2512.",
       "zh": "缩写说明：ws 表示 WenetSpeech；md 表示 MagicData；conv 表示对话（Conversational）；daily 表示日常用语（Daily-use）；Fun-Nano 表示 Fun-ASR-Nano-2512。"
      }
     ]
    },
    {
     "id": "p-A-7",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-A-7-1",
       "original": "API baselines: Doubao-ASR (volc.seedasr.auc) was evaluated in early February 2026, and Fun-ASR was evaluated in late November 2025.",
       "zh": "API 基线：Doubao-ASR（volc.seedasr.auc）于 2026 年 2 月初评测，Fun-ASR 于 2025 年 11 月底评测。"
      },
      {
       "id": "s-A-7-2",
       "original": "API results may change over time due to server-side updates and may include proprietary components.",
       "zh": "API 结果可能因服务端更新而随时间变化，且可能包含私有组件。"
      },
      {
       "id": "s-A-7-3",
       "original": "To ensure a fair comparison, we disabled ITN and punctuation in the API outputs whenever such options were available, and used the default VAD configuration provided by each API.",
       "zh": "为保证公平对比，凡 API 提供相应选项，我们都关闭了输出中的 ITN 与标点，并使用各 API 默认的 VAD 配置。"
      }
     ]
    },
    {
     "id": "p-A-8",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-A-8-1",
       "original": "Data overlap: Our ASR training data does not include any Chinese dialect or accented speech data from MagicData; all MagicData dialect datasets are used for evaluation only.",
       "zh": "数据重叠：我们的 ASR 训练数据不包含任何来自 MagicData 的中文方言或口音语音数据；所有 MagicData 方言数据集仅用于评测。"
      },
      {
       "id": "s-A-8-2",
       "original": "The Fun-ASR API may benefit from proprietary training data, which could explain its advantage on certain dialect subsets (e.g., MagicData Shanghai and Wuhan dialect test sets).",
       "zh": "Fun-ASR API 可能受益于其私有训练数据，这可以解释它在某些方言子集上的优势（例如 MagicData 上海话与武汉话测试集）。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-B",
   "num": "B",
   "level": 1,
   "page": 15,
   "title": {
    "original": "FireRedLID Label Lists",
    "zh": "附录 B FireRedLID 标签列表"
   },
   "blocks": []
  },
  {
   "id": "sec-B-1",
   "num": "B.1",
   "level": 2,
   "page": 15,
   "title": {
    "original": "Full list of language codes",
    "zh": "B.1 语种代码完整列表"
   },
   "blocks": []
  },
  {
   "id": "sec-B-2",
   "num": "B.2",
   "level": 2,
   "page": 15,
   "title": {
    "original": "Full list of Chinese dialect codes",
    "zh": "B.2 中文方言代码完整列表"
   },
   "blocks": [
    {
     "id": "tab-B-2-1",
     "type": "table_caption",
     "page": 16,
     "original": "Table 7: Full list of language codes supported by FireRedLID.",
     "zh": "Table 7：FireRedLID 支持的语种代码完整列表。"
    },
    {
     "id": "p-B-2-1",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-B-2-1-1",
       "original": "Code English Name Chinese Name Code English Name Chinese Name",
       "zh": "代码 英文名 中文名 代码 英文名 中文名"
      }
     ]
    },
    {
     "id": "p-B-2-2",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-B-2-2-1",
       "original": "zh Chinese 中文 en English 英语 es Spanish 西班牙语 fr French 法语 ja Japanese 日语 ko Korean 韩语 ru Russian 俄语 de German 德语 pt Portuguese 葡萄牙语 ar Arabic 阿拉伯语 ab Abkhazian 阿布哈兹语 af Afrikaans 南非荷兰语 am Amharic 阿姆哈拉语 as Assamese 阿萨姆语 az Azerbaijani 阿塞拜疆语 ba Bashkir 巴什基尔语 be Belarusian 白俄罗斯语 bg Bulgarian 保加利亚语 bn Bengali 孟加拉语 br Breton 布列塔尼语 bs Bosnian 波斯尼亚语 ca Catalan 加泰罗尼亚语 ceb Cebuano 宿务语 cs Czech 捷克语 cy Welsh 威尔士语 da Danish 丹麦语 el Greek 希腊语 eo Esperanto 世界语 et Estonian 爱沙尼亚语 eu Basque 巴斯克语 fa Persian 波斯语 fi Finnish 芬兰语 fo Faroese 法罗语 gl Galician 加利西亚语 gn Guarani 瓜拉尼语 gu Gujarati 古吉拉特语 gv Manx 马恩语 ha Hausa 豪萨语 haw Hawaiian 夏威夷语 hi Hindi 印地语 hr Croatian 克罗地亚语 ht Haitian Creole 海地克里奥尔语 hu Hungarian 匈牙利语 hy Armenian 亚美尼亚语 ia Interlingua 国际语 id Indonesian 印度尼西亚语 is Icelandic 冰岛语 it Italian 意大利语 iw Hebrew 希伯来语 jw Javanese 爪哇语 ka Georgian 格鲁吉亚语 kk Kazakh 哈萨克语 km Khmer 高棉语 kn Kannada 卡纳达语 la Latin 拉丁语 lb Luxembourgish 卢森堡语 ln Lingala 林加拉语 lo Lao 老挝语 lt Lithuanian 立陶宛语 lv Latvian 拉脱维亚语 mg Malagasy 马尔加什语 mi M¯aori 毛利语 mk Macedonian 马其顿语 ml Malayalam 马拉雅拉姆语 mn Mongolian 蒙古语 mr Marathi 马拉地语 ms Malay 马来语 mt Maltese 马耳他语 my Burmese 缅甸语 ne Nepali 尼泊尔语 nl Dutch 荷兰语 no Norwegian 挪威语 oc Occitan 奥克语 pa Punjabi 旁遮普语 pl Polish 波兰语 ps Pashto 普什图语 ro Romanian 罗马尼亚语 sd Sindhi 信德语 si Sinhala 僧伽罗语 sk Slovak 斯洛伐克语 sl Slovenian 斯洛文尼亚语 so Somali 索马里语 sq Albanian 阿尔巴尼亚语 sr Serbian 塞尔维亚语 sv Swedish 瑞典语 sw Swahili 斯瓦希里语 ta Tamil 泰米尔语 te Telugu 泰卢固语 th Thai 泰语 tr Turkish 土耳其语 uk Ukrainian 乌克兰语 ur Urdu 乌尔都语 uz Uzbek 乌兹别克语 vi Vietnamese 越南语 yi Yiddish 意第绪语 yo Yoruba 约鲁巴语",
       "zh": "zh Chinese 中文 en English 英语 es Spanish 西班牙语 fr French 法语 ja Japanese 日语 ko Korean 韩语 ru Russian 俄语 de German 德语 pt Portuguese 葡萄牙语 ar Arabic 阿拉伯语 ab Abkhazian 阿布哈兹语 af Afrikaans 南非荷兰语 am Amharic 阿姆哈拉语 as Assamese 阿萨姆语 az Azerbaijani 阿塞拜疆语 ba Bashkir 巴什基尔语 be Belarusian 白俄罗斯语 bg Bulgarian 保加利亚语 bn Bengali 孟加拉语 br Breton 布列塔尼语 bs Bosnian 波斯尼亚语 ca Catalan 加泰罗尼亚语 ceb Cebuano 宿务语 cs Czech 捷克语 cy Welsh 威尔士语 da Danish 丹麦语 el Greek 希腊语 eo Esperanto 世界语 et Estonian 爱沙尼亚语 eu Basque 巴斯克语 fa Persian 波斯语 fi Finnish 芬兰语 fo Faroese 法罗语 gl Galician 加利西亚语 gn Guarani 瓜拉尼语 gu Gujarati 古吉拉特语 gv Manx 马恩语 ha Hausa 豪萨语 haw Hawaiian 夏威夷语 hi Hindi 印地语 hr Croatian 克罗地亚语 ht Haitian Creole 海地克里奥尔语 hu Hungarian 匈牙利语 hy Armenian 亚美尼亚语 ia Interlingua 国际语 id Indonesian 印度尼西亚语 is Icelandic 冰岛语 it Italian 意大利语 iw Hebrew 希伯来语 jw Javanese 爪哇语 ka Georgian 格鲁吉亚语 kk Kazakh 哈萨克语 km Khmer 高棉语 kn Kannada 卡纳达语 la Latin 拉丁语 lb Luxembourgish 卢森堡语 ln Lingala 林加拉语 lo Lao 老挝语 lt Lithuanian 立陶宛语 lv Latvian 拉脱维亚语 mg Malagasy 马尔加什语 mi Maori 毛利语 mk Macedonian 马其顿语 ml Malayalam 马拉雅拉姆语 mn Mongolian 蒙古语 mr Marathi 马拉地语 ms Malay 马来语 mt Maltese 马耳他语 my Burmese 缅甸语 ne Nepali 尼泊尔语 nl Dutch 荷兰语 no Norwegian 挪威语 oc Occitan 奥克语 pa Punjabi 旁遮普语 pl Polish 波兰语 ps Pashto 普什图语 ro Romanian 罗马尼亚语 sd Sindhi 信德语 si Sinhala 僧伽罗语 sk Slovak 斯洛伐克语 sl Slovenian 斯洛文尼亚语 so Somali 索马里语 sq Albanian 阿尔巴尼亚语 sr Serbian 塞尔维亚语 sv Swedish 瑞典语 sw Swahili 斯瓦希里语 ta Tamil 泰米尔语 te Telugu 泰卢固语 th Thai 泰语 tr Turkish 土耳其语 uk Ukrainian 乌克兰语 ur Urdu 乌尔都语 uz Uzbek 乌兹别克语 vi Vietnamese 越南语 yi Yiddish 意第绪语 yo Yoruba 约鲁巴语"
      }
     ]
    },
    {
     "id": "tab-B-2-2",
     "type": "table_caption",
     "page": 17,
     "original": "Table 8: Full list of Chinese dialect codes supported by FireRedLID.",
     "zh": "Table 8：FireRedLID 支持的中文方言代码完整列表。"
    },
    {
     "id": "p-B-2-3",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-B-2-3-1",
       "original": "Code English Name Chinese Name",
       "zh": "代码 英文名 中文名"
      }
     ]
    },
    {
     "id": "p-B-2-4",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-B-2-4-1",
       "original": "mandarin Chinese (Mandarin) 中文(普通话) yue Chinese (Yue: Guangdong/Hong Kong) 中文(粤语：广东/香港) wu Chinese (Wu: Shanghai/Wu) 中文(吴语：上海/吴语片区) min Chinese (Min: Fujian) 中文(闽语：福建) north Chinese (Mandarin-North: Shandong/Gansu/N- ingxia/Hebei/Shanxi/Liaoning/Shaanxi)",
       "zh": "mandarin 中文（普通话） yue 中文（粤语：广东/香港） wu 中文（吴语：上海/吴语片区） min 中文（闽语：福建） north 中文（官话-北方：山东/甘肃/宁夏/河北/山西/辽宁/陕西）"
      }
     ]
    },
    {
     "id": "p-B-2-5",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-B-2-5-1",
       "original": "中文(官话-北方：山东/甘肃/宁夏/河 北/山西/辽宁/陕西) xinan Chinese (Mandarin-Southwest: Sichuan/Yunnan/Guizhou/Hubei/Chongqing)",
       "zh": "（接上）xinan 中文（官话-西南：四川/云南/贵州/湖北/重庆）"
      }
     ]
    },
    {
     "id": "p-B-2-6",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-B-2-6-1",
       "original": "中文(官话-西南：四川/云南/贵州/湖 北/重庆) xiang Chinese (Xiang: Hunan) 中文(湘语：湖南) bo Tibetan (in Chinese context) 中文(藏语)",
       "zh": "（接上）xiang 中文（湘语：湖南） bo 中文（藏语，中文语境下的藏语）"
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
    "sentence_id": "s-1-3-1",
    "quote": "VAD trained from ASR forced alignment"
   },
   "kind": "motivation",
   "title": "为什么点名弱监督 VAD",
   "explanation": "工业界大量 VAD 是拿 ASR 模型对语料做强制对齐、把对齐结果当帧级标签训出来的，标注成本几乎为零，但标签质量被 ASR 本身的切分能力锁死，遇到歌声、强噪声、重叠语音就容易系统性切错。FireRedVAD 反其道而行，直接用人工标注的声学事件边界训练，等于花钱买标注换鲁棒性。这句话是全系统「工业级」叙事的立论起点，后面 VAD 打榜的 F1 优势都被归因到这里。",
   "featured": true
  },
  {
   "id": "ann-002",
   "anchor": {
    "sentence_id": "s-1-5-2",
    "quote": "scaling supervised training data to approximately 200k hours"
   },
   "kind": "engineering",
   "title": "架构不动，数据扩三倍",
   "explanation": "这句话坦率得少见：作者明说 FireRedASR2 相对 FireRedASR 的架构改动 minimal，精度增益主要靠监督数据从约 70k 小时扩到约 200k 小时、并加宽领域与方言覆盖。这对工程团队的启发是务实的——在已有验证过的 Conformer/AED 架构上，数据规模和多样性仍是性价比最高的改进路径；同时也意味着论文的 SOTA 声明本质上建立在未公开的数据资产上，外部很难复现。",
   "featured": true
  },
  {
   "id": "ann-003",
   "anchor": {
    "sentence_id": "s-5-1-2",
    "quote": "errors in LID may propagate to subsequent modules such as ASR decoding and punctuation prediction"
   },
   "kind": "critique",
   "title": "级联误差传播没量化",
   "explanation": "作者自己点出了级联流水线的要害：VAD 切错、LID 判错，错误会一路传到 ASR 和标点。但全文第 7 节的评测是每个模块独立打榜，恰恰回避了端到端口径——没有任何一个实验回答「完整流水线跑一段真实长音频，最终转写错误里有多少来自上游模块」。对一套主打 all-in-one 的系统，这个空白比单模块的 0.x 个百分点的差距更影响实际体验，引用其 SOTA 结论时要意识到这一点。",
   "featured": true
  },
  {
   "id": "ann-004",
   "anchor": {
    "sentence_id": "s-3-2-2",
    "quote": "Encoder-Adapter-LLM architecture [1–4, 10, 18, 19] that leverages the power of LLM for ASR"
   },
   "kind": "concept",
   "title": "两条 ASR 技术路线",
   "explanation": "FireRedASR2 同时押注两代范式：AED 变体是经典的注意力编码器-解码器，解码器从零学一个小的输出空间；LLM 变体把语音编码器的输出经 Adapter 映射进预训练文本 LLM 的嵌入空间，让 LLM 做下一 token 预测。后者把语言建模能力「白嫖」自 LLM，对长尾表述、混码文本更稳，代价是 8B+ 的推理体量。两变体共享前端与训练数据，便于公平比较范式差异。"
  },
  {
   "id": "ann-005",
   "anchor": {
    "sentence_id": "s-3-1-3-1",
    "quote": "expansion of supervised training data from 70k hours to approximately 200k hours"
   },
   "kind": "number",
   "title": "70k 到 200k 小时",
   "explanation": "监督数据扩了约 2.9 倍。作为参照，Whisper 用了 680k 小时弱监督数据，而这里是监督（有标注）口径，200k 小时监督数据在中文工业界属于第一梯队。要注意两点：一是数据构成（普通话/方言/英文/歌声各自占比）全文未披露；二是方言基准的提升幅度无法从总量数字推出——低资源方言是否分到了足够数据，只能从附录 A 的逐集结果间接判断。"
  },
  {
   "id": "ann-006",
   "anchor": {
    "sentence_id": "s-3-1-1-1-5",
    "quote": "filtering out statistical outliers or applying confidence clipping"
   },
   "kind": "critique",
   "title": "置信度离校准有多远",
   "explanation": "置信度由解码器 softmax 概率聚合成几何平均，再叠加启发式修正（滤离群值、置信度截断）。这类分数本质上是模型自评的流畅度，不是经过校准的错误概率：模型对重复、幻觉文本常常同样自信。论文没有给出任何校准指标（如 ECE）或置信度-错误率相关性实验，却建议拿它做下游过滤和 UI 展示。工程上可用作粗粒度排序信号，但别当成「这句有 99% 概率正确」来用。",
   "featured": true
  },
  {
   "id": "ann-007",
   "anchor": {
    "sentence_id": "s-3-1-2-1-2",
    "quote": "train it post-hoc by freezing the encoder and decoder and optimizing only the CTC branch"
   },
   "kind": "engineering",
   "title": "事后挂 CTC 的巧劲",
   "explanation": "时间戳不是从头联合训出来的，而是主模型训完后冻结全部参数、只训一个线性 CTC 投影头。这几乎零风险地给存量模型加了能力：不碰已验证的识别精度，训练成本也只是全量训练的零头。能这么做的前提是 CTC 词表与 AED 词表完全一致，这样强制对齐直接落在 AED 解码出的 token 序列上。任何想给线上 ASR 补时间戳能力的团队都可以抄这个套路。",
   "featured": true
  },
  {
   "id": "ann-008",
   "anchor": {
    "sentence_id": "s-3-1-2-2-3",
    "quote": "converted into token-level start/end times according to the encoder subsampling rate"
   },
   "kind": "critique",
   "title": "时间戳的精度上限",
   "explanation": "帧级 CTC 对齐按编码器下采样率换算成时间，意味着时间戳的粒度天然受限于下采样后的帧步长（Conformer 常见 4 倍下采样对应 40ms 一格）。论文没有报告时间戳误差（如相对人工标注的 AAS/中位偏移），只给了功能存在性结论。做字幕切分、跳播定位够用，但若要音素级对齐或歌词条级精准打点，需要自行验证边界误差。",
   "explanation_plain": "时间戳是一格一格（几十毫秒）对齐出来的，不是无限精确；论文没给误差数据。"
  },
  {
   "id": "ann-009",
   "anchor": {
    "sentence_id": "s-4-1-2",
    "quote": "rely on ASR forced-alignment signals and are trained primarily on ASR corpora"
   },
   "kind": "comparison",
   "title": "和常见工业 VAD 的区别",
   "explanation": "主流做法（包括不少开源 VAD）是从 ASR 对齐信号反推帧级语音标签，数据量大且免费，但标签继承 ASR 的切分偏好——对歌声、音乐穿插、低 SNR 语音的边界判断系统性偏弱。FireRedVAD 用数千小时人工标注的语音/歌声/音乐事件边界直接监督，标签语义清晰且可控。取舍很明确：人工标注贵且规模有限，换来的是复杂声学条件下更稳的检测，以及支撑 mVAD 多标签输出的能力。",
   "featured": true
  },
  {
   "id": "ann-010",
   "anchor": {
    "sentence_id": "s-4-1-2-2",
    "quote": "We define voice as the union of speech and singing, and non-voice as music, silence, and noise"
   },
   "kind": "concept",
   "title": "歌声也算语音",
   "explanation": "VAD 把「有声」定义为语音+歌声的并集，这个看似细小的标签决策其实是产品决策：UGC 视频里大量内容边唱边说，若 VAD 把歌声当噪声滤掉，ASR 会整段丢内容。这也解释了为什么 ASR 模块要专门支持歌声歌词识别（Sing-1 基准），以及为什么需要 mVAD 单独把音乐分出来——三个模块的标签体系是自洽设计的，不是各自为政。"
  },
  {
   "id": "ann-011",
   "anchor": {
    "sentence_id": "s-4-3-4-1",
    "quote": "each containing only ∼0.6M parameters (approximately 2.2 MB in float32 format)"
   },
   "kind": "number",
   "title": "0.6M 参数 2.2 MB",
   "explanation": "三个 VAD 模型各 0.6M 参数、float32 约 2.2 MB，比 Silero-VAD（约 1.5M+）还小一个身位。这个体量意味着单核 CPU 就能跑多路并发，云端海量音频预处理的成本几乎可以忽略，端侧嵌入也无压力。值得注意轻量不是白来的：DFSMN 是纯前馈结构、无注意力，用回看/前瞻阶数换时序建模能力，适合帧级分类，但不具备理解长上下文语义的能力——对 VAD 任务这是对的取舍。"
  },
  {
   "id": "ann-012",
   "anchor": {
    "sentence_id": "s-5-2-1-4",
    "quote": "conditioning dialect prediction on the coarse language decision"
   },
   "kind": "motivation",
   "title": "为什么方言要分层",
   "explanation": "把 100+ 语种和 20+ 方言拍平成一个多分类，方言之间（如粤语 vs 吴语）的混淆会和跨语种混淆在同一层竞争，标签空间既大又平。分层设计让模型先在粗粒度上判「是不是中文」，只有判中 zh 才进入方言细分类——每步决策空间小、歧义少，还符合语言学的天然层级。代价是级联式错误：第一级判错语种，第二级方言预测连机会都没有。"
  },
  {
   "id": "ann-013",
   "anchor": {
    "sentence_id": "s-5-2-2-1",
    "quote": "short sequence generation task with a maximum decoding length of 2"
   },
   "kind": "engineering",
   "title": "两 token 解码的巧思",
   "explanation": "LID 传统上是一个分类问题，这里却复用 AED 的序列生成框架：解码器最多吐 2 个 token（语种 + 可选方言）再加 <eos> 就收工。好处是整套训练/推理栈与 ASR 完全复用，编码器还能直接从 ASR 预训练模型继承，工程上几乎零新增组件；解码开销因长度上限为 2 而可忽略，却天然支持分层标签和句级置信度。这是「用生成框架做分类」的一个干净范例。",
   "featured": true
  },
  {
   "id": "ann-014",
   "anchor": {
    "sentence_id": "s-5-1-3-1",
    "quote": "initialized from the pre-trained FireRedASR2-AED Encoder"
   },
   "kind": "connection",
   "title": "ASR 编码器一鱼多吃",
   "explanation": "FireRedLID 的编码器直接初始化自 FireRedASR2-AED 的编码器——200k 小时 ASR 监督学出的声学表示，白送给 LID 任务用。这解释了为什么 LID 能用相对轻的成本做到 97.18% 的 FLEURS 准确率：语种判别所需的音系、韵律线索本就是 ASR 表示的副产品。同样的思路贯穿全文（LLM 变体编码器也初始化自 AED），是这套系统「一体化」红利的真正来源。"
  },
  {
   "id": "ann-015",
   "anchor": {
    "sentence_id": "s-6-4-2",
    "quote": "approximately 18.57B Chinese characters and 2.20B English words"
   },
   "kind": "number",
   "title": "标点模块的数据规模",
   "explanation": "18.57B 个中文字符加 2.20B 个英文单词，对标点预测这种 token 级分类任务而言是极大规模。但注意这是纯文本语料，不是 ASR 输出——ASR 转写文本无标点、有识别错误、口语化强，与书面语料存在分布差。论文称用多领域覆盖来弥合，但评测基准也是内部构造的（88,644 / 28,641 句），且承诺发布而尚未发布，78.90% 的平均 F1 目前无法第三方验证。"
  },
  {
   "id": "ann-016",
   "anchor": {
    "sentence_id": "s-7-1-2",
    "quote": "evaluated independently to avoid confounding effects introduced by upstream or downstream components"
   },
   "kind": "critique",
   "title": "逐模块评测回避了什么",
   "explanation": "「独立评测以避免混杂影响」在方法论上没错，但对一套主打一体化的系统是选择性汇报：真实用户跑的是整条级联，VAD 把一句话切成两半、LID 把粤语判成普通话，这些上游错误对最终 CER 的贡献在逐模块口径下完全不可见。论文没有给出任何端到端评测（如整段长音频的完整转写质量），因此 Table 2 的数字应理解为「理想切分+理想路由下的 ASR 上限」，而非系统级承诺。",
   "featured": true
  },
  {
   "id": "ann-017",
   "anchor": {
    "sentence_id": "s-7-1-2-4",
    "quote": "macro-averaged over test sets (equal weight per test set)"
   },
   "kind": "number",
   "title": "11.55% 平均值怎么读",
   "explanation": "Avg-Dialect-19 是 19 个方言测试集的等权宏平均，不是按样本量加权。从附录 A 看单集差异极大：md-yue-daily 低至 3.61%，md-shanghai-conv 高达 28.70%，ws-chuan-hard 也有 20.71%。平均值 11.55% 掩盖了近一个数量级的集间方差，而且等权设计对小测试集更敏感。落地选型时务必查附录 A 的目标方言单集数字，不要用均值做预期；低资源方言的真实体验可能远差于 11.55%。",
   "featured": true
  },
  {
   "id": "ann-018",
   "anchor": {
    "sentence_id": "s-7-1-4-2",
    "quote": "API-based baselines may change over time due to server-side updates"
   },
   "kind": "critique",
   "title": "API 基线的时效陷阱",
   "explanation": "作者自己承认 Doubao-ASR 是 2026 年 2 月初、Fun-ASR 是 2025 年 11 月底测的，两家 API 随时会热更新。这意味着 Table 2 的对比是一张有时效的快照，不是可复现的科学对照——你今年再调同一个 API，排名可能就变了。真正可复现的对比只有 Qwen3-ASR 和 Fun-ASR-Nano 两个开源检查点。论文把话说在明处是诚实的，但宣传口径引用这些数字时应带上评测日期。"
  },
  {
   "id": "ann-019",
   "anchor": {
    "sentence_id": "s-7-1-8-1",
    "quote": "does not include any Chinese dialect or accented speech data from MagicData"
   },
   "kind": "engineering",
   "title": "MagicData 只评不训",
   "explanation": "作者特别声明训练数据不含 MagicData 的方言/口音数据，全部 MagicData 集仅用于评测——这是必要的评测卫生声明，因为工业级数据规模下训练集污染公开测试集是真实风险，一句话声明能显著增强结果可信度。但它仍是单方声明：200k 小时语料没有公开清单，外部无法独立核验重叠情况。附录 A 还顺带指出 Fun-ASR 在上海话/武汉话子集上的反常优势可能来自其私有训练数据，暗示对手那边反而可能有污染。"
  },
  {
   "id": "ann-020",
   "anchor": {
    "sentence_id": "s-7-2-5-2",
    "quote": "a fixed posterior threshold of 0.5 for all neural VAD models"
   },
   "kind": "critique",
   "title": "统一 0.5 阈值的口径",
   "explanation": "F1/FAR/MR 都依赖阈值，论文对所有神经 VAD 统一用 0.5 以保证工作点一致——这比各自调最优阈值公平，但仍要留意两点：一是各模型后验分布的校准程度不同，0.5 对某个模型可能恰好是甜点位；二是作者也承认开发集调阈还能再提 F1，所以 Table 3 的 F1 差距（97.57 vs 95.95）不宜读成模型能力的纯粹差距。真正阈值无关的只有 AUC-ROC 一项，而它也只差 1.6 个点左右。"
  },
  {
   "id": "ann-021",
   "anchor": {
    "sentence_id": "s-7-2-9-4",
    "quote": "achieve a very low miss rate but at the cost of a substantially higher false alarm rate"
   },
   "kind": "comparison",
   "title": "低漏检率的代价",
   "explanation": "Table 3 里 FunASR-VAD 的漏检率低至 0.42%，看似亮眼，但误报率高达 44.03%——它把大量非语音也判成语音送下去。对级联系统这是坏工作点：每多一段误报，下游 ASR 就多跑一段无效推理，云端海量并发下直接换算成钱，还可能产出幻觉文本污染结果。FireRedVAD 的 2.69% FAR / 3.62% MR 均衡点是为流水线全局成本选的，这正是「工业级」三个字在评测层面的体现。"
  },
  {
   "id": "ann-022",
   "anchor": {
    "sentence_id": "s-7-3-6-4",
    "quote": "FireRedLID achieves 88.47% accuracy"
   },
   "kind": "number",
   "title": "方言 LID 才是真瓶颈",
   "explanation": "多语种 LID 已到 97.18%（FLEURS），但中文方言识别只有 88.47%——每 8 条方言语音就有约 1 条被判错方言簇。放在级联里看更刺眼：判错方言本身不致命（ASR 模型是多方言统一的），但如果路由逻辑按方言标签选择后处理或热词策略，错误就会放大。方言识别的难度本质是方言簇之间边界模糊（如西南官话 vs 普通话），88.47% 已是合并 KeSpeech+MagicData 混合基准上的最好成绩，但离「够用」还有距离。",
   "featured": true
  },
  {
   "id": "ann-023",
   "anchor": {
    "sentence_id": "s-7-1-1-2",
    "quote": "representing different points on the accuracy-efficiency trade-off"
   },
   "kind": "comparison",
   "title": "8B+ 与 1B+ 的取舍",
   "explanation": "两个变体的差距在 Table 2 里精确可见：LLM 变体平均 CER 2.89%，AED 变体 3.05%，只差 0.16 个点，但参数量是 8B+ 对 1B+，推理成本差近一个数量级；且只有 AED 变体提供 token/词级时间戳。选型逻辑因此很清晰：云端追求极致精度且不差算力选 LLM，要时间戳、要高并发、要端侧就选 AED——后者用 5% 的相对精度换回部署自由度和时间戳能力，多数业务场景下是更划算的取点。",
   "featured": true
  },
  {
   "id": "ann-024",
   "anchor": {
    "sentence_id": "s-9-1-6",
    "quote": "We release model weights and code to facilitate research and practical deployment"
   },
   "kind": "critique",
   "title": "开源到什么程度",
   "explanation": "开放的是推理权重和推理代码；200k 小时训练语料、各模块训练脚本与数据配比均未随论文公开（FLEURS-VAD-102 基准和标点基准也只是承诺「将发布」）。这决定了「开源」的实际含义：你可以部署、可以做二次推理集成，但无法复现训练、无法在其数据配方上继续做研究。对工业用户够用，对研究者则更接近一份能力展示报告——引用其 SOTA 结论时，这个不对称要心里有数。",
   "explanation_plain": "权重能下、能跑，但训练数据和训练代码没放出来，复现不了。"
  }
 ]
};
