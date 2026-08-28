// 自动生成：2604.14493 全文双语精读数据（由 tools/compile_paper.js 装配）
// 结构/原文来自 .cache/papers/2604.14493.json（tools/extract_paper.py）；
// 翻译与讲解来自 .cache/papers/zh/2604.14493/（LLM agent 撰写）。
// 改翻译请改片段后重新装配；勿手改本文件的结构与 original 字段。
globalThis.PAPER_2604_14493 = {
 "paper_id": "2604.14493",
 "model_id": "on_device",
 "title": {
  "original": "Pushing the Limits of On-Device Streaming ASR: A Compact, High-Accuracy English Model for Low-Latency Inference",
  "zh": "端侧流式 ASR 的极限探索：面向低延迟推理的紧凑高精度英文模型"
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
       "original": "Nenad Banfic, David Fan, Kunal Vaishnavi, Sam Kemp, Sunghoon Choi, Rui Ren, Sayan Shaw, Meng Tang CoreAI, Microsoft April 2026"
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
       "original": "Deploying high-quality automatic speech recognition (ASR) on edge devices requires models that jointly optimize accuracy, latency, and memory footprint while operating entirely on CPU without GPU acceleration.",
       "zh": "在边缘设备上部署高质量的自动语音识别（ASR），要求模型同时优化准确率、延迟和内存占用，并且完全在 CPU 上运行、不依赖 GPU 加速。"
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
       "original": "We conduct a systematic empirical study of state-of-the-art ASR architectures, encompassing encoder–decoder, transducer, and LLM- based paradigms, evaluated across batch, chunked, and streaming inference modes.",
       "zh": "我们对最先进的 ASR 架构做了一项系统的实证研究，覆盖编码器-解码器、Transducer 和基于 LLM 三大范式，并在批处理、分块（chunked）与流式三种推理模式下评测。"
      },
      {
       "id": "s-abstract-2-2",
       "original": "Through a comprehensive benchmark of over 50 configurations spanning OpenAI Whisper, NVIDIA Nemotron, Parakeet TDT, Canary, Conformer Transducer, and Qwen3-ASR, we identify NVIDIA’s Nemotron Speech Streaming as the strongest candidate for real-time English streaming on resource-constrained hardware.",
       "zh": "通过对 50 多个配置的全面基准测试（涵盖 OpenAI Whisper、NVIDIA Nemotron、Parakeet TDT、Canary、Conformer Transducer 和 Qwen3-ASR），我们认定 NVIDIA 的 Nemotron Speech Streaming 是在资源受限硬件上进行实时英文流式识别的最强候选。"
      },
      {
       "id": "s-abstract-2-3",
       "original": "We then re-implement the complete streaming inference pipeline in ONNX Runtime and conduct a controlled evaluation of multiple posttraining quantization strategies, including importance-weighted k-quant, mixed-precision schemes, and round-to-nearest quantization, combined with graph-level operator fusion.",
       "zh": "随后，我们在 ONNX Runtime 中重新实现了完整的流式推理管线，并对多种训练后量化策略做了受控评测，包括重要性加权的 k-quant、混合精度方案以及最近舍入（round-to-nearest）量化，并结合图级算子融合。"
      },
      {
       "id": "s-abstract-2-4",
       "original": "These optimizations reduce the model from 2.47 GB to as little as 0.67 GB while maintaining word error rate (WER) within 1% absolute of the full-precision PyTorch baseline.",
       "zh": "这些优化把模型从 2.47 GB 压缩到最小 0.67 GB，同时词错误率（WER）与全精度 PyTorch 基线相比保持在 1% 的绝对差以内。"
      },
      {
       "id": "s-abstract-2-5",
       "original": "Our recommended configuration, the int4 k-quant variant, achieves 8.20% average streaming WER across eight standard benchmarks, running comfortably faster than real-time on CPU with 0.56 s algorithmic latency, establishing a new quality–efficiency Pareto point for on-device streaming ASR.",
       "zh": "我们推荐的配置是 int4 k-quant 变体：在 8 个标准基准上取得 8.20% 的平均流式 WER，在 CPU 上以明显快于实时的速度运行，算法延迟仅 0.56 s，为端侧流式 ASR 确立了一个新的质量-效率帕累托点。"
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
       "original": "In this report, we present a streaming ASR system optimized for on-device deployment via ONNX Runtime.",
       "zh": "在本报告中，我们提出一套经 ONNX Runtime 优化、面向端侧部署的流式 ASR 系统。"
      },
      {
       "id": "s-1-1-2",
       "original": "Built on NVIDIA’s Nemotron Speech and optimized through quantization and operator fusion, it achieves competitive results on standard English benchmarks while fitting under 1 GB and running faster than real-time on CPU with sub-second latency.",
       "zh": "该系统构建于 NVIDIA 的 Nemotron Speech 之上，通过量化与算子融合加以优化，在标准英文基准上取得了有竞争力的结果，同时模型体积控制在 1 GB 以内、在 CPU 上快于实时运行且延迟低于 1 秒。"
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
       "original": "Automatic Speech Recognition has undergone rapid improvements in recent years, with largescale models such as OpenAI Whisper [1], NVIDIA NeMo models [2], and Qwen3-ASR [3] pushing the boundaries of accuracy on standard English benchmarks.",
       "zh": "近年来自动语音识别进展迅速，OpenAI Whisper [1]、NVIDIA NeMo 系列模型 [2] 以及 Qwen3-ASR [3] 等大规模模型不断刷新标准英文基准上的准确率上限。"
      },
      {
       "id": "s-1-2-2",
       "original": "However, the best-performing models—Qwen3-ASR-1.7B at 5.90% WER, Parakeet TDT-0.6B-v3 at 6.32%, and Canary-1B- v2 at 7.15%—are all primarily batch-oriented architectures requiring 2–7 GB of memory and GPU inference.",
       "zh": "然而，表现最好的模型——Qwen3-ASR-1.7B 的 WER 为 5.90%，Parakeet TDT-0.6B-v3 为 6.32%，Canary-1B-v2 为 7.15%——都是以批处理为主的架构，需要 2–7 GB 内存和 GPU 推理。"
      },
      {
       "id": "s-1-2-3",
       "original": "Deploying high-quality ASR in edge scenarios, where compute is limited to CPUs, latency must be minimal, and memory budgets are tight, remains a significant challenge.",
       "zh": "在边缘场景部署高质量 ASR——算力仅限 CPU、延迟必须尽量低、存储预算紧张——仍然是一个重大挑战。"
      },
      {
       "id": "s-1-2-4",
       "original": "Prior work has studied strong ASR architectures, streaming inference strategies, and low-bit quantization, but these directions are often evaluated in isolation.",
       "zh": "已有工作分别研究过强 ASR 架构、流式推理策略和低比特量化，但这些方向往往被孤立地评测。"
      },
      {
       "id": "s-1-2-5",
       "original": "This report focuses on their intersection: identifying a strong streaming architecture under a controlled public benchmark suite and compressing it for practical edge deployment.",
       "zh": "本报告聚焦它们的交叉点：在一套受控的公开基准下识别出最强的流式架构，并将其压缩到可实际用于边缘部署的程度。"
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
       "original": "Our primary objective was to identify a high-quality English streaming ASR model that operates under the lowest possible resource utilization—minimizing model size, memory consumption, CPU load, and algorithmic latency without sacrificing transcription quality—enabling speech recognition directly on user devices without reliance on cloud infrastructure.",
       "zh": "我们的首要目标是找到一个高质量的英文流式 ASR 模型，在尽可能低的资源占用下运行——在不牺牲转写质量的前提下，最小化模型体积、内存消耗、CPU 负载和算法延迟——从而不依赖云基础设施、直接在用户设备上完成语音识别。"
      },
      {
       "id": "s-1-3-2",
       "original": "This translates to four concrete constraints:",
       "zh": "这可以转写为四条具体约束："
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
       "original": "1.",
       "zh": "1."
      },
      {
       "id": "s-1-4-2",
       "original": "Streaming capability: The model must produce transcriptions with sub-second latency, processing audio in small chunks rather than requiring the full utterance.",
       "zh": "流式能力：模型必须以亚秒级延迟产出转录，按小片段处理音频，而不是要求拿到整段语音再处理。"
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
       "original": "2.",
       "zh": "2."
      },
      {
       "id": "s-1-5-2",
       "original": "High accuracy: Word error rates must be competitive across diverse English domains (meetings, earnings calls, broadcast, read speech, spontaneous speech).",
       "zh": "高准确率：词错误率必须在多样的英文场景（会议、财报电话会、广播、朗读、自发言语）中都具有竞争力。"
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
       "original": "3.",
       "zh": "3."
      },
      {
       "id": "s-1-6-2",
       "original": "Minimal resource utilization: The model must fit within the memory and storage constraints of consumer hardware, ideally under 1 GB, while running comfortably faster than real-time on CPU alone.",
       "zh": "极低的资源占用：模型必须能装进消费级硬件的内存与存储约束内，理想情况下小于 1 GB，同时仅凭 CPU 就能以明显快于实时的速度运行。"
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
       "original": "4.",
       "zh": "4."
      },
      {
       "id": "s-1-7-2",
       "original": "CPU-only inference: The model must not require a GPU, enabling deployment on the widest range of edge hardware.",
       "zh": "仅 CPU 推理：模型不得依赖 GPU，以便部署到最广泛的边缘硬件上。"
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
       "original": "To arrive at this model, we conducted a comprehensive evaluation of six model families across eight English benchmark datasets, testing over 50 distinct configurations of architecture, precision, chunking strategy, and quantization level.",
       "zh": "为得到这个模型，我们在 8 个英文基准数据集上对 6 个模型族做了全面评测，测试了架构、精度、分块策略与量化级别的 50 多种不同配置。"
      },
      {
       "id": "s-1-8-2",
       "original": "This report documents our methodology, comparative findings, and the optimization pipeline that produced the final on-device streaming ASR model.",
       "zh": "本报告记录了我们的方法论、对比结论，以及产出最终端侧流式 ASR 模型的优化管线。"
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
    "original": "Evaluated Model Families",
    "zh": "被评测的模型族"
   },
   "blocks": [
    {
     "id": "p-2-1",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-2-1-1",
       "original": "We evaluated the following model families, covering the major paradigms in modern ASR:",
       "zh": "我们评测了以下模型族，覆盖现代 ASR 的主要范式："
      }
     ]
    },
    {
     "id": "tab-2-1",
     "type": "table_caption",
     "page": 2,
     "original": "Table 1: Overview of evaluated model families.",
     "zh": "表 1：被评测模型族概览。"
    }
   ]
  },
  {
   "id": "sec-model",
   "num": null,
   "level": 2,
   "page": 2,
   "title": {
    "original": "Model",
    "zh": "Model"
   },
   "blocks": [
    {
     "id": "p-model-1",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-model-1-1",
       "original": "Architecture Modes Size Whisper Large-v3-Turbo Encoder–Decoder Batch 1.62 GB Whisper Small Encoder–Decoder Chunk/Batch 0.97 GB Nemotron-0.6B Cache-aware Transducer Stream/Batch 2.47 GB Parakeet TDT-0.6B-v3 TDT Transducer Chunk/Batch 2.51 GB Canary-1B-v2 AED + AlignAtt Chunk/Batch 6.36 GB Conformer Trans.",
       "zh": "（表 1 模型清单：Architecture × Modes × Size——Whisper Large-v3-Turbo（编码器-解码器，Batch，1.62 GB）；Whisper Small（编码器-解码器，Chunk/Batch，0.97 GB）；Nemotron-0.6B（Cache-aware Transducer，Stream/Batch，2.47 GB）；Parakeet TDT-0.6B-v3（TDT Transducer，Chunk/Batch，2.51 GB）；Canary-1B-v2（AED + AlignAtt，Chunk/Batch，6.36 GB）；Conformer Trans.（后续照原文）。）"
      },
      {
       "id": "s-model-1-2",
       "original": "XL Conformer Transducer Chunk 2.58 GB Qwen3-ASR-1.7B LLM-based ASR Batch/Chunk 4.70 GB Qwen3-ASR-0.6B LLM-based ASR Batch/Chunk 1.88 GB",
       "zh": "（表 1 续：XL Conformer Transducer（Chunk，2.58 GB）；Qwen3-ASR-1.7B（LLM-based ASR，Batch/Chunk，4.70 GB）；Qwen3-ASR-0.6B（LLM-based ASR，Batch/Chunk，1.88 GB）。）"
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
    "original": "Whisper Models",
    "zh": "Whisper 模型"
   },
   "blocks": [
    {
     "id": "p-2-1-1",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-2-1-1-1",
       "original": "OpenAI’s Whisper models use an encoder–decoder architecture with cross-attention.",
       "zh": "OpenAI 的 Whisper 模型使用带交叉注意力的编码器-解码器架构。"
      }
     ]
    },
    {
     "id": "p-2-1-2",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-2-1-2-1",
       "original": "While highly accurate in batch mode, they are not natively designed for streaming.",
       "zh": "虽然它们在批处理模式下精度很高，但原生并不是为流式设计的。"
      },
      {
       "id": "s-2-1-2-2",
       "original": "We also evaluated an ORT CUDA FP16 variant optimized with Olive [4], and chunked Whisper Small inference via Faster-Whisper [5] using a sliding-window approach with overlapping segments.",
       "zh": "我们还评测了一个经 Olive [4] 优化的 ORT CUDA FP16 变体，以及通过 Faster-Whisper [5] 实现的分块 Whisper Small 推理——后者采用带重叠片段的滑动窗口方法。"
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
    "original": "Parakeet TDT and Conformer Transducer",
    "zh": "Parakeet TDT 与 Conformer Transducer"
   },
   "blocks": [
    {
     "id": "p-2-2-1",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-2-2-1-1",
       "original": "We group these two models together as both are transducer-based architectures.",
       "zh": "我们把这两个模型归为一组，因为它们都是基于 Transducer 的架构。"
      }
     ]
    },
    {
     "id": "p-2-2-2",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-2-2-2-1",
       "original": "NVIDIA’s Parakeet TDT-0.6B-v3 [6] uses a Token-and-Duration Transducer architecture with multilingual support, making it a strong candidate for future language expansion if chunked streaming proves viable.",
       "zh": "NVIDIA 的 Parakeet TDT-0.6B-v3 [6] 使用 Token-and-Duration Transducer（TDT）架构并支持多语言，如果分块流式被证明可行，它是未来扩展语种的强候选。"
      },
      {
       "id": "s-2-2-2-2",
       "original": "We tested it extensively across 15+ chunking configurations to characterize the relationship between chunk size, context length, and WER on English benchmarks.",
       "zh": "我们在 15 种以上的分块配置下对它做了广泛测试，以刻画块大小、上下文长度与英文基准 WER 之间的关系。"
      },
      {
       "id": "s-2-2-2-3",
       "original": "The Conformer Transducer XL [7] is a larger English-only conformer transducer model also evaluated in chunked mode.",
       "zh": "Conformer Transducer XL [7] 是一个更大的、仅英文的 Conformer Transducer 模型，同样在分块模式下评测。"
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
    "original": "Qwen3-ASR",
    "zh": "Qwen3-ASR"
   },
   "blocks": [
    {
     "id": "p-2-3-1",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-2-3-1-1",
       "original": "Qwen3-ASR represents the emerging LLM-based approach to ASR, where a language model backbone is adapted for speech.",
       "zh": "Qwen3-ASR 代表了新兴的基于 LLM 的 ASR 路线，即把语言模型主干改造用于语音。"
      },
      {
       "id": "s-2-3-1-2",
       "original": "We evaluated both the 1.7B and 0.6B variants in batch and chunked modes with varying stride lengths on English benchmarks.",
       "zh": "我们在英文基准上评测了其 1.7B 和 0.6B 两个变体，覆盖批处理与分块两种模式，并变化步长（stride）长度。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-2-4",
   "num": "2.4",
   "level": 2,
   "page": 3,
   "title": {
    "original": "NVIDIA Nemotron Speech Streaming",
    "zh": "NVIDIA Nemotron Speech Streaming"
   },
   "blocks": [
    {
     "id": "p-2-4-1",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-2-4-1-1",
       "original": "NVIDIA’s Nemotron Speech Streaming [8] is a cache-aware streaming conformer transducer with approximately 600 million parameters.",
       "zh": "NVIDIA 的 Nemotron Speech Streaming [8] 是一个 cache-aware 的流式 Conformer Transducer，约有 600 million（6 亿）参数。"
      },
      {
       "id": "s-2-4-1-2",
       "original": "Unlike the batch-only models above, it is purpose-built for real-time streaming: the encoder uses a chunked attention mechanism that caches prior context across chunks, enabling flexible latency–accuracy trade-offs by adjusting the streaming configuration at inference time without retraining.",
       "zh": "与上面那些只支持批处理的模型不同，它是为实时流式而专门构建的：编码器使用分块注意力机制，跨片段缓存历史上下文，因此无需重新训练、只需在推理时调整流式配置，就能灵活权衡延迟与准确率。"
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
    "original": "Evaluation Methodology",
    "zh": "评测方法论"
   },
   "blocks": []
  },
  {
   "id": "sec-3-1",
   "num": "3.1",
   "level": 2,
   "page": 3,
   "title": {
    "original": "Benchmark Datasets",
    "zh": "基准数据集"
   },
   "blocks": [
    {
     "id": "p-3-1-1",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-3-1-1-1",
       "original": "All models were evaluated on eight standard English ASR benchmarks from the ESB (End-to-end Speech Benchmark) suite, spanning diverse acoustic conditions and speaking styles.",
       "zh": "所有模型都在 ESB（End-to-end Speech Benchmark）套件的 8 个标准英文 ASR 基准上评测，覆盖多样的声学条件与说话风格。"
      },
      {
       "id": "s-3-1-1-2",
       "original": "For batchmode evaluation, we use the Open ASR Leaderboard [9] framework.",
       "zh": "批处理模式评测使用 Open ASR Leaderboard [9] 框架。"
      },
      {
       "id": "s-3-1-1-3",
       "original": "To support streaming and chunked evaluation, we extended this framework to measure streaming WER by feeding audio in chunks and assembling the final transcript from chunk-level outputs.",
       "zh": "为支持流式与分块评测，我们扩展了该框架：把音频按片段喂入模型、再把各片段的输出拼接成最终转录，从而测量流式 WER。"
      },
      {
       "id": "s-3-1-1-4",
       "original": "Our extended evaluation code is publicly available.1",
       "zh": "我们扩展后的评测代码已公开（脚注 1）。"
      }
     ]
    },
    {
     "id": "tab-3-1-1",
     "type": "table_caption",
     "page": 3,
     "original": "Table 2: Evaluation benchmark datasets.",
     "zh": "表 2：评测基准数据集。"
    }
   ]
  },
  {
   "id": "sec-dataset",
   "num": null,
   "level": 2,
   "page": 3,
   "title": {
    "original": "Dataset",
    "zh": "数据集"
   },
   "blocks": [
    {
     "id": "p-dataset-1",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-dataset-1-1",
       "original": "Domain Characteristics AMI Meeting transcription Overlapping speech, far-field Earnings22 Financial earnings calls Domain-specific terminology GigaSpeech Internet audio Diverse topics and acoustics LibriSpeech Clean Audiobook (clean) Read speech, studio quality LibriSpeech Other Audiobook (other) Read speech, noisier conditions SPGISpeech Financial transcription Professional dictation TED-LIUM TED talks Prepared speech, varied topics VoxPopuli European Parliament Spontaneous speech, accented",
       "zh": "（表 1 评测集：AMI——会议转写，重叠语音、远场；Earnings22——财报电话会，领域术语；GigaSpeech——互联网音频，主题与声学多样；LibriSpeech Clean——有声书（干净），朗读、录音棚质量；LibriSpeech Other——有声书（其他），更嘈杂；SPGISpeech——财经转写，专业口述；TED-LIUM——TED 演讲，有准备的演讲、主题多样；VoxPopuli——欧洲议会，即兴发言、带口音。）"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-3-2",
   "num": "3.2",
   "level": 2,
   "page": 3,
   "title": {
    "original": "Metrics",
    "zh": "评测指标"
   },
   "blocks": [
    {
     "id": "p-3-2-1",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-3-2-1-1",
       "original": "• Word Error Rate (WER): Standard metric computed per dataset.",
       "zh": "• 词错误率（WER）：按数据集计算的标准指标。"
      },
      {
       "id": "s-3-2-1-2",
       "original": "We report individual WERs and the unweighted average across all eight datasets.",
       "zh": "我们同时报告各数据集的单独 WER 和 8 个数据集的未加权平均。"
      },
      {
       "id": "s-3-2-1-3",
       "original": "In batch mode, 1https://github.com/nenad1002/open_asr_leaderboard the full utterance is processed at once and the WER is computed on the final output.",
       "zh": "在批处理模式下（脚注 1：https://github.com/nenad1002/open_asr_leaderboard），整段语音一次性处理完毕，对最终输出计算 WER。"
      }
     ]
    },
    {
     "id": "p-3-2-2",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-2-2-1",
       "original": "In streaming and chunked modes, we report the streaming WER: the transcription is assembled from all chunk outputs after the entire audio has been processed, and WER is computed on the concatenated result.",
       "zh": "在流式与分块模式下，我们报告流式 WER：整段音频处理完之后，把所有片段的输出拼成转录，对拼接结果计算 WER。"
      }
     ]
    },
    {
     "id": "p-3-2-3",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-2-3-1",
       "original": "• Real-Time Factor (RTFx): Defined as:",
       "zh": "• 实时因子（RTFx）：定义为："
      }
     ]
    },
    {
     "id": "p-3-2-4",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-2-4-1",
       "original": "RTFx = audio duration wall-clock processing time where processing time includes all stages of the inference pipeline (audio preprocessing, mel extraction, encoder, decoder, and joiner inference).",
       "zh": "RTFx = 音频时长 / 实际墙钟处理时间，其中处理时间包含推理管线的全部阶段（音频预处理、mel 特征提取、编码器、解码器与 joiner 推理）。"
      },
      {
       "id": "s-3-2-4-2",
       "original": "An RTFx of 5× means the model processes audio five times faster than real-time.",
       "zh": "RTFx 为 5× 表示模型处理音频的速度是实时的 5 倍。"
      },
      {
       "id": "s-3-2-4-3",
       "original": "RTFx is hardware-dependent; we report it at batch_size=1 as the utterance-level average, with the specific hardware noted in the section below.",
       "zh": "RTFx 依赖硬件；我们在 batch_size=1 下报告按语句平均的值，具体硬件在下一节注明。"
      },
      {
       "id": "s-3-2-4-4",
       "original": "For streaming deployment, the critical requirement is that per-chunk RTFx consistently exceeds 1.0× to avoid audio dropout.",
       "zh": "对于流式部署，关键要求是每个片段的 RTFx 持续大于 1.0×，以避免音频丢帧。"
      },
      {
       "id": "s-3-2-4-5",
       "original": "Since absolute RTFx values are hardware-dependent, RTFx should be compared relative to the baseline configuration on the same hardware rather than interpreted in isolation.",
       "zh": "由于 RTFx 的绝对值随硬件变化，应把它与同一硬件上的基线配置做相对比较，而不是孤立解读。"
      }
     ]
    },
    {
     "id": "p-3-2-5",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-2-5-1",
       "original": "• Latency (Delay): The algorithmic delay introduced by the chunking/streaming configuration, determined by the chunk size and right context.",
       "zh": "• 延迟（Delay）：由分块/流式配置引入的算法延迟，取决于块大小与右上下文长度。"
      },
      {
       "id": "s-3-2-5-2",
       "original": "For streaming ASR, we can also define the effective latency, bounded by the algorithmic delay plus the compute time for a single chunk: effective latency ≈delay+ chunk duration RTFx .",
       "zh": "对流式 ASR 还可定义有效延迟，其上界为算法延迟加上单 chunk 计算时间：effective latency ≈ delay + chunk duration / RTFx。"
      },
      {
       "id": "s-3-2-5-3",
       "original": "When the algorithmic delay equals the chunk duration (as in all Nemotron configurations we evaluate), this simplifies to effective latency ≈delay ·",
       "zh": "当算法延迟等于 chunk 时长时（我们评测的所有 Nemotron 配置均如此），简化为 effective latency ≈ delay · (1 + 1/RTFx)。"
      }
     ]
    },
    {
     "id": "eq-3-2-1",
     "type": "equation",
     "page": 4,
     "original": "1 + 1"
    },
    {
     "id": "eq-3-2-2",
     "type": "equation",
     "page": 4,
     "original": "RTFx"
    },
    {
     "id": "eq-3-2-3",
     "type": "equation",
     "page": 4,
     "original": "."
    },
    {
     "id": "p-3-2-6",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-2-6-1",
       "original": "• Model Size: On-disk size of the model weights.",
       "zh": "• 模型体积：模型权重的磁盘占用大小。"
      }
     ]
    },
    {
     "id": "p-3-2-7",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-2-7-1",
       "original": "• Batch-to-Stream Factor (BSF): The ratio of streaming WER to batch WER for the same model: BSF = Streaming WER Batch WER A BSF of 1.0 indicates no accuracy loss from streaming; values above 1.0 quantify how much a model degrades when moving from batch to real-time operation.",
       "zh": "• 批-流退化因子（BSF）：同一模型的流式 WER 与批处理 WER 之比，即 BSF = 流式 WER / 批处理 WER。BSF 为 1.0 表示流式化没有带来精度损失；大于 1.0 的值量化了模型从批处理切换到实时运行时的退化程度。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-3-3",
   "num": "3.3",
   "level": 2,
   "page": 4,
   "title": {
    "original": "Hardware",
    "zh": "硬件"
   },
   "blocks": [
    {
     "id": "p-3-3-1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-3-1-1",
       "original": "All CPU measurements use an AMD EPYC 7V12 64-Core Processor (AVX2, 2.45 GHz), with inference pinned to 32 cores to ensure consistent and reproducible results across runs.",
       "zh": "所有 CPU 测量均在 AMD EPYC 7V12 64 核处理器（AVX2，2.45 GHz）上进行，推理固定使用 32 个核，以保证各次运行结果一致、可复现。"
      },
      {
       "id": "s-3-3-1-2",
       "original": "GPU measurements use an NVIDIA H100 (CUDA).",
       "zh": "GPU 测量使用 NVIDIA H100（CUDA）。"
      },
      {
       "id": "s-3-3-1-3",
       "original": "The specific hardware and batch size are noted in each table caption in the appendix, where appropriate.",
       "zh": "具体硬件与批大小在附录相应表格的标题中注明。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-4",
   "num": "4",
   "level": 1,
   "page": 4,
   "title": {
    "original": "Batch-Mode Comparison",
    "zh": "批处理模式对比"
   },
   "blocks": [
    {
     "id": "p-4-1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-4-1-1",
       "original": "We first evaluated all models in batch (offline) mode to establish accuracy upper bounds.",
       "zh": "我们首先把所有模型放在批处理（离线）模式下评测，以确定各模型的准确率上限。"
      },
      {
       "id": "s-4-1-2",
       "original": "All results reported in this section reflect our own evaluation under the controlled setup described in Section 3; reported values may differ from officially published numbers due to differences in hardware, text normalization, or evaluation methodology.",
       "zh": "本节报告的所有结果都来自我们在第 3 节所述受控设置下的自有评测；由于硬件、文本规整化或评测方法的差异，报告数值可能与官方公布数字不同。"
      },
      {
       "id": "s-4-1-3",
       "original": "Table 3 shows the results.",
       "zh": "Table 3 给出了结果。"
      }
     ]
    },
    {
     "id": "tab-4-1",
     "type": "table_caption",
     "page": 5,
     "original": "Table 3: Batch-mode WER (%) comparison across models.",
     "zh": "表 3：各模型批处理模式 WER（%）对比。"
    }
   ]
  },
  {
   "id": "sec-model-2",
   "num": null,
   "level": 2,
   "page": 5,
   "title": {
    "original": "Model",
    "zh": "Model"
   },
   "blocks": [
    {
     "id": "p-model-2-1",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-model-2-1-1",
       "original": "Avg AMI Earn.",
       "zh": "表头：Avg（平均）｜AMI｜Earn.（Earnings22，后同）。"
      }
     ]
    },
    {
     "id": "p-model-2-2",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-model-2-2-1",
       "original": "Giga LS-c LS-o SPGI TED VoxP.",
       "zh": "表头续：Giga（GigaSpeech）｜LS-c（LibriSpeech clean）｜LS-o（LibriSpeech other）｜SPGI（SPGISpeech）｜TED（TED-LIUM）｜VoxP.（VoxPopuli）。"
      }
     ]
    },
    {
     "id": "p-model-2-3",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-model-2-3-1",
       "original": "Qwen3-ASR-1.7B",
       "zh": "然而，表现最好的模型——Qwen3-ASR-1.7B 的 WER 为 5.90%，Parakeet TDT-0.6B-v3 为 6.32%，Canary-1B-v2 为 7.15%——都是以批处理为主的架构，需要 2–7 GB 内存和 GPU 推理。"
      }
     ]
    },
    {
     "id": "eq-model-2-1",
     "type": "equation",
     "page": 5,
     "original": "5.90 11.76 10.26 8.75 1.60 3.41 2.83 2.28 6.34"
    },
    {
     "id": "eq-model-2-2",
     "type": "equation",
     "page": 5,
     "original": "Qwen3-ASR-0.6B"
    },
    {
     "id": "eq-model-2-3",
     "type": "equation",
     "page": 5,
     "original": "6.69 13.77 11.03 9.16 2.12 4.47 3.04 2.83 7.09"
    },
    {
     "id": "eq-model-2-4",
     "type": "equation",
     "page": 5,
     "original": "Parakeet TDT-0.6B-v3"
    },
    {
     "id": "eq-model-2-5",
     "type": "equation",
     "page": 5,
     "original": "6.32 11.39 11.19 9.57 1.92 3.59 3.98 2.80 6.09"
    },
    {
     "id": "eq-model-2-6",
     "type": "equation",
     "page": 5,
     "original": "Canary-1B-v2"
    },
    {
     "id": "eq-model-2-7",
     "type": "equation",
     "page": 5,
     "original": "7.15 16.01 11.79 10.82 2.18 3.56 2.28 4.29 6.25"
    },
    {
     "id": "eq-model-2-8",
     "type": "equation",
     "page": 5,
     "original": "Nemotron-0.6B"
    },
    {
     "id": "eq-model-2-9",
     "type": "equation",
     "page": 5,
     "original": "7.07 11.16 12.38 11.35 2.28 4.83 2.63 4.42 7.48"
    },
    {
     "id": "eq-model-2-10",
     "type": "equation",
     "page": 5,
     "original": "Whisper-v3-Turbo"
    },
    {
     "id": "eq-model-2-11",
     "type": "equation",
     "page": 5,
     "original": "7.83 16.13 11.63 10.14 2.10 4.24 2.97 3.57 11.87"
    },
    {
     "id": "eq-model-2-12",
     "type": "equation",
     "page": 5,
     "original": "Whisper-v3-Turbo (ORT)"
    },
    {
     "id": "eq-model-2-13",
     "type": "equation",
     "page": 5,
     "original": "7.52 16.36 11.38 10.13 2.17 4.24 2.93 3.62 9.30"
    },
    {
     "id": "eq-model-2-14",
     "type": "equation",
     "page": 5,
     "original": "Whisper Small.en"
    },
    {
     "id": "eq-model-2-15",
     "type": "equation",
     "page": 5,
     "original": "8.59 17.93 12.97 11.35 3.05 7.25 3.60 4.07 8.50"
    },
    {
     "id": "p-model-2-4",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-model-2-4-1",
       "original": "Earn. = Earnings22, Giga = GigaSpeech, LS-c/o = LibriSpeech Clean/Other, SPGI = SPGISpeech, TED = TED-LIUM, VoxP. = VoxPopuli.",
       "zh": "（表格行+表注）Giga｜LS-c｜LS-o｜SPGI｜TED｜VoxP.；int4 k-quant ONNX 0.67 GB CPU：8.89/2.87/19.92/14.02/11.08/2.99/6.59/3.76/3.94/8.84。表注：Earn. = Earnings22，Giga = GigaSpeech，LS-c/o = LibriSpeech Clean/Other，SPGI = SPGISpeech，TED = TED-LIUM，VoxP. = VoxPopuli。"
      }
     ]
    },
    {
     "id": "p-model-2-5",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-model-2-5-1",
       "original": "Qwen3-ASR-1.7B achieves the best batch WER among the evaluated models, however, its size of 4.70 GB exceeds our size requirements by far.",
       "zh": "Qwen3-ASR-1.7B 在被评测模型中取得了最好的批处理 WER，但其 4.70 GB 的体积远超我们的体积要求。"
      },
      {
       "id": "s-model-2-5-2",
       "original": "Qwen3-ASR-0.6B, Parakeet TDT-0.6B- v3, and Nemotron-0.6B are all promising, so we next evaluate them in streaming and chunked settings.",
       "zh": "Qwen3-ASR-0.6B、Parakeet TDT-0.6B-v3 和 Nemotron-0.6B 都很有潜力，因此我们接下来在流式与分块设置下评测它们。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-5",
   "num": "5",
   "level": 1,
   "page": 5,
   "title": {
    "original": "Streaming and Chunked Mode Analysis",
    "zh": "流式与分块模式分析"
   },
   "blocks": []
  },
  {
   "id": "sec-5-1",
   "num": "5.1",
   "level": 2,
   "page": 5,
   "title": {
    "original": "Parakeet TDT Chunking Analysis",
    "zh": "Parakeet TDT 分块分析"
   },
   "blocks": [
    {
     "id": "p-5-1-1",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-5-1-1-1",
       "original": "We first investigated whether batch-oriented transducer models can be adapted to chunked streaming.",
       "zh": "我们首先研究了面向批处理的 Transducer 模型能否被改造成分块流式使用。"
      },
      {
       "id": "s-5-1-1-2",
       "original": "We conducted an extensive search over chunking configurations for Parakeet TDT- 0.6B-v3, testing various total context and history lengths while keeping the chunk size (delay) at 2.4 s, to understand the sensitivity of transducer models to chunk boundaries.",
       "zh": "我们对 Parakeet TDT-0.6B-v3 的分块配置做了大范围搜索：把块大小（延迟）固定在 2.4 s，变化总上下文与历史长度，以理解 Transducer 模型对块边界的敏感性。"
      },
      {
       "id": "s-5-1-1-3",
       "original": "Figure 1 visualizes the results.",
       "zh": "Figure 1 可视化了结果。"
      }
     ]
    },
    {
     "id": "eq-5-1-1",
     "type": "equation",
     "page": 5,
     "original": "35 32.2%"
    },
    {
     "id": "eq-5-1-2",
     "type": "equation",
     "page": 5,
     "original": "(4s ctx)"
    },
    {
     "id": "eq-5-1-3",
     "type": "equation",
     "page": 5,
     "original": "30 25"
    },
    {
     "id": "eq-5-1-4",
     "type": "equation",
     "page": 5,
     "original": "Average WER (%)"
    },
    {
     "id": "eq-5-1-5",
     "type": "equation",
     "page": 5,
     "original": "20 15 10"
    },
    {
     "id": "eq-5-1-6",
     "type": "equation",
     "page": 5,
     "original": "Parakeet TDT configs Parakeet batch: 6.32%"
    },
    {
     "id": "eq-5-1-7",
     "type": "equation",
     "page": 5,
     "original": "5 10 15 20 25 30 35"
    },
    {
     "id": "eq-5-1-8",
     "type": "equation",
     "page": 5,
     "original": "Total Context Window (seconds)"
    },
    {
     "id": "eq-5-1-9",
     "type": "equation",
     "page": 5,
     "original": "5"
    },
    {
     "id": "fig-5-1-1",
     "type": "figure_caption",
     "page": 5,
     "original": "Figure 1: Parakeet TDT-0.6B-v3: WER vs. total context window across 18 chunking configurations. Even the best chunked configuration (9.22%) degrades substantially from the 6.32% batch baseline.",
     "zh": "图 1：Parakeet TDT-0.6B-v3：在 18 种分块配置下 WER 随总上下文窗口的变化。即使是最好的分块配置（9.22%），相比 6.32% 的批处理基线也有明显退化。"
    },
    {
     "id": "p-5-1-2",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-5-1-2-1",
       "original": "The best Parakeet chunked configuration achieves 9.22% WER, a 46% relative increase over its 6.32% batch WER.",
       "zh": "最好的 Parakeet 分块配置取得 9.22% 的 WER，相对其 6.32% 的批处理 WER 上升了 46%。"
      },
      {
       "id": "s-5-1-2-2",
       "original": "This analysis confirms that models not specifically designed for streaming incur substantial penalties when adapted to chunked operation, motivating our focus on natively streaming architectures.",
       "zh": "这一分析证实：未针对流式专门设计的模型在被改造为分块运行时会付出很大代价，这也促使我们把重点转向原生流式架构。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-5-2",
   "num": "5.2",
   "level": 2,
   "page": 6,
   "title": {
    "original": "Nemotron Streaming Configurations",
    "zh": "Nemotron 流式配置"
   },
   "blocks": [
    {
     "id": "p-5-2-1",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-5-2-1-1",
       "original": "The Nemotron streaming configuration is specified as (chunk_size, left_context, shift_size) in units of 80 ms. For example, the configuration (7, 10, 7) corresponds to a 560 ms chunk, 800 ms of cached history per chunk, and a 5.6 s effective history window.",
       "zh": "Nemotron 的流式配置记作 (chunk_size, left_context, shift_size)，单位是 80 ms。例如配置 (7, 10, 7) 对应 560 ms 的块、每块 800 ms 的缓存历史，以及 5.6 s 的有效历史窗口。"
      },
      {
       "id": "s-5-2-1-2",
       "original": "A key advantage of this architecture is the ability to tune latency–accuracy trade-offs by adjusting these parameters at inference time without retraining.",
       "zh": "该架构的一个关键优势是：无需重新训练，只要在推理时调整这些参数，就能调节延迟与准确率之间的权衡。"
      },
      {
       "id": "s-5-2-1-3",
       "original": "Table 4 summarizes results across several configurations.",
       "zh": "Table 4 汇总了若干配置下的结果。"
      }
     ]
    },
    {
     "id": "tab-5-2-1",
     "type": "table_caption",
     "page": 6,
     "original": "Table 4: Nemotron-0.6B streaming configurations.",
     "zh": "表 4：Nemotron-0.6B 流式配置。"
    },
    {
     "id": "p-5-2-2",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-5-2-2-1",
       "original": "Config Delay History Avg AMI Earn.",
       "zh": "表头：Config（配置）｜Delay（延迟）｜History（历史）｜Avg｜AMI｜Earn.。"
      }
     ]
    },
    {
     "id": "p-5-2-3",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-5-2-3-1",
       "original": "Giga LS-c LS-o SPGI TED VoxP.",
       "zh": "表头续：Giga｜LS-c｜LS-o｜SPGI｜TED｜VoxP.。"
      }
     ]
    },
    {
     "id": "p-5-2-4",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-5-2-4-1",
       "original": "Batch (offline)",
       "zh": "（表头行）Batch (offline)（离线批处理）。"
      }
     ]
    },
    {
     "id": "eq-5-2-1",
     "type": "equation",
     "page": 6,
     "original": "– – 7.07 11.16 12.38 11.35 2.28 4.83 2.63 4.42 7.48 (70, 2, 70)"
    },
    {
     "id": "eq-5-2-2",
     "type": "equation",
     "page": 6,
     "original": "5.6 s 11.2 s"
    },
    {
     "id": "eq-5-2-3",
     "type": "equation",
     "page": 6,
     "original": "7.10 11.31 12.46 11.39 2.28 4.84 2.64 4.42 7.47 (14, 2, 14)"
    },
    {
     "id": "eq-5-2-4",
     "type": "equation",
     "page": 6,
     "original": "1.12 s 2.24 s"
    },
    {
     "id": "eq-5-2-5",
     "type": "equation",
     "page": 6,
     "original": "7.46 11.38 12.49 11.39 2.41 5.07 2.71 4.50 9.75 (7, 10, 7)"
    },
    {
     "id": "eq-5-2-6",
     "type": "equation",
     "page": 6,
     "original": "0.56 s 5.6 s"
    },
    {
     "id": "eq-5-2-7",
     "type": "equation",
     "page": 6,
     "original": "7.28 11.80 12.64 11.50 2.33 5.08 2.72 4.46 7.69 (7, 2, 7)"
    },
    {
     "id": "eq-5-2-8",
     "type": "equation",
     "page": 6,
     "original": "0.56 s 1.12 s"
    },
    {
     "id": "eq-5-2-9",
     "type": "equation",
     "page": 6,
     "original": "8.51 11.93 13.93 11.76 3.43 6.00 3.47 5.11 12.49 (2, 35, 2)"
    },
    {
     "id": "eq-5-2-10",
     "type": "equation",
     "page": 6,
     "original": "0.16 s 5.6 s"
    },
    {
     "id": "eq-5-2-11",
     "type": "equation",
     "page": 6,
     "original": "8.04 14.82 13.66 12.44 2.49 5.52 2.90 4.72 7.79 (1, 70, 1)"
    },
    {
     "id": "eq-5-2-12",
     "type": "equation",
     "page": 6,
     "original": "0.08 s 5.6 s"
    },
    {
     "id": "eq-5-2-13",
     "type": "equation",
     "page": 6,
     "original": "8.91 17.76 14.64 13.33 2.61 5.93 3.73 5.06 8.24 9.0 (7,2,7) 8.5"
    },
    {
     "id": "eq-5-2-14",
     "type": "equation",
     "page": 6,
     "original": "Average WER (%)"
    },
    {
     "id": "eq-5-2-15",
     "type": "equation",
     "page": 6,
     "original": "8.0 (2,35,2) (14,2,14) 7.5 (7,10,7) 7.0"
    },
    {
     "id": "eq-5-2-16",
     "type": "equation",
     "page": 6,
     "original": "Configurations Selected: (7,10,7)"
    },
    {
     "id": "eq-5-2-17",
     "type": "equation",
     "page": 6,
     "original": "(70,2,70) 0 1 2 3 4 5 6"
    },
    {
     "id": "eq-5-2-18",
     "type": "equation",
     "page": 6,
     "original": "Algorithmic Delay (seconds)"
    },
    {
     "id": "eq-5-2-19",
     "type": "equation",
     "page": 6,
     "original": "6.5"
    },
    {
     "id": "fig-5-2-1",
     "type": "figure_caption",
     "page": 6,
     "original": "Figure 2: Nemotron-0.6B: Delay vs. WER trade-off across streaming configurations. The configuration (7,10,7) with 0.56 s delay and 5.6 s history achieves the best balance, reaching 7.28% WER, only 0.21% above the batch baseline.",
     "zh": "图 2：Nemotron-0.6B：不同流式配置下延迟与 WER 的权衡。配置 (7,10,7) 以 0.56 s 延迟和 5.6 s 历史取得最佳平衡，WER 达 7.28%，仅比批处理基线高 0.21%。"
    },
    {
     "id": "p-5-2-5",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-5-2-5-1",
       "original": "The configuration (7, 10, 7) emerges as the optimal operating point: it provides only 0.56 s of algorithmic delay while achieving 7.28% average WER, merely 0.21% absolute above the offline batch baseline.",
       "zh": "配置 (7, 10, 7) 成为最优工作点：算法延迟仅 0.56 s，同时平均 WER 为 7.28%，只比离线批处理基线高 0.21%（绝对值）。"
      },
      {
       "id": "s-5-2-5-2",
       "original": "In contrast, the best Parakeet chunked result (9.22%) is 1.94 percentage points worse at 4× higher latency.",
       "zh": "相比之下，Parakeet 最好的分块结果（9.22%）要差 1.94 个百分点，且延迟是其 4×。"
      },
      {
       "id": "s-5-2-5-3",
       "original": "The key insight is that sufficient history context (5.6 s via 10 left chunks) is critical.",
       "zh": "关键洞察在于：充足的历史上下文（通过 10 个左侧块提供 5.6 s 历史）至关重要。"
      },
      {
       "id": "s-5-2-5-4",
       "original": "It’s interesting to compare (7, 10, 7) at 7.28% WER with (7, 2, 7) at 8.51% WER, where the only difference is reduced history.",
       "zh": "有趣的是，把 (7, 10, 7) 的 7.28% WER 与 (7, 2, 7) 的 8.51% WER 对比，二者唯一的差别就是历史被缩短了。"
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
    "original": "Comparison with Other Streaming/Chunked Models",
    "zh": "与其他流式/分块模型的对比"
   },
   "blocks": [
    {
     "id": "p-5-3-1",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-5-3-1-1",
       "original": "To validate that Nemotron is indeed the strongest streaming candidate, we compared the best streaming or low-latency configuration from each model family using the Batch-to-Stream Factor (BSF) defined in Section 3.",
       "zh": "为验证 Nemotron 确实是最强的流式候选，我们取每个模型族最好的流式或低延迟配置，用第 3 节定义的批-流退化因子（BSF）进行比较。"
      },
      {
       "id": "s-5-3-1-2",
       "original": "Table 5 reports the results.",
       "zh": "Table 5 报告了结果。"
      }
     ]
    },
    {
     "id": "tab-5-3-1",
     "type": "table_caption",
     "page": 7,
     "original": "Table 5: Cross-model streaming comparison (batch_size=1, CPU).",
     "zh": "表 5：跨模型流式对比（batch_size=1，CPU）。"
    },
    {
     "id": "p-5-3-2",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-5-3-2-1",
       "original": "Model Size Delay Avg BSF RTFx AMI Earn.",
       "zh": "表头：Model｜Size｜Delay｜Avg｜BSF｜RTFx｜AMI｜Earn.。"
      }
     ]
    },
    {
     "id": "p-5-3-3",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-5-3-3-1",
       "original": "Giga LS-c LS-o SPGI TED VoxP.",
       "zh": "表头续：Giga｜LS-c｜LS-o｜SPGI｜TED｜VoxP.。"
      }
     ]
    },
    {
     "id": "p-5-3-4",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-5-3-4-1",
       "original": "Nemotron-0.6B 2.47 GB 0.56 s",
       "zh": "2.\n（原始数据照录）\nNemotron-0.6B 2.47 GB 0.56 s"
      }
     ]
    },
    {
     "id": "eq-5-3-1",
     "type": "equation",
     "page": 7,
     "original": "7.28 1.03 2.46 11.80 12.64 11.50 2.33 5.08 2.72 4.46 7.69"
    },
    {
     "id": "eq-5-3-2",
     "type": "equation",
     "page": 7,
     "original": "Qwen3-ASR-1.7B 4.70 GB 2.4 s"
    },
    {
     "id": "eq-5-3-3",
     "type": "equation",
     "page": 7,
     "original": "10.45 1.77 0.49 16.97 16.92 12.29 4.95 7.69 6.70 6.34 11.75"
    },
    {
     "id": "eq-5-3-4",
     "type": "equation",
     "page": 7,
     "original": "Parakeet TDT-0.6B-v3 2.51 GB 2.4 s"
    },
    {
     "id": "eq-5-3-5",
     "type": "equation",
     "page": 7,
     "original": "12.83 2.03 1.38 16.73 19.81 15.27 6.63 8.25 17.82 9.95 8.19"
    },
    {
     "id": "eq-5-3-6",
     "type": "equation",
     "page": 7,
     "original": "Conformer Trans. XL 2.58 GB 2.4 s"
    },
    {
     "id": "eq-5-3-7",
     "type": "equation",
     "page": 7,
     "original": "11.06 – 1.27 22.57 24.44 14.05 2.11 3.83 7.95 5.36 8.18"
    },
    {
     "id": "eq-5-3-8",
     "type": "equation",
     "page": 7,
     "original": "Canary-1B-v2 6.36 GB 4.8 s"
    },
    {
     "id": "eq-5-3-9",
     "type": "equation",
     "page": 7,
     "original": "12.45 1.74 2.93 22.10 22.04 14.60 4.87 5.96 4.42 7.64 17.98"
    },
    {
     "id": "p-5-3-5",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-5-3-5-1",
       "original": "Key observations:",
       "zh": "（小标题）关键观察（Key observations）："
      }
     ]
    },
    {
     "id": "p-5-3-6",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-5-3-6-1",
       "original": "• Nemotron-0.6B achieves the best streaming WER (7.28%) among all models tested, while also having the lowest latency at 0.56 s and a BSF of 1.03, essentially no degradation from batch mode.",
       "zh": "• Nemotron-0.6B 在所有被测模型中取得最好的流式 WER（7.28%），延迟也最低（0.56 s），BSF 为 1.03，相对批处理模式几乎没有退化。"
      }
     ]
    },
    {
     "id": "p-5-3-7",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-5-3-7-1",
       "original": "• Qwen3-ASR-1.7B, despite being the best batch model among the tested models, degrades significantly in chunked mode (BSF = 1.77) and runs below real-time on CPU (RTFx = 0.49), making it unsuitable for edge deployment.",
       "zh": "• Qwen3-ASR-1.7B 虽然是被测模型中批处理最强的模型，但在分块模式下退化显著（BSF = 1.77），且在 CPU 上跑不过实时（RTFx = 0.49），不适合边缘部署。"
      },
      {
       "id": "s-5-3-7-2",
       "original": "The Qwen3-ASR-0.6B model showed similar results, as shown in the appendix.",
       "zh": "Qwen3-ASR-0.6B 模型也呈现类似结果，见附录。"
      }
     ]
    },
    {
     "id": "p-5-3-8",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-5-3-8-1",
       "original": "• Parakeet TDT and Canary show substantial streaming degradation (BSF ≥1.74), with WER almost doubling despite operating at 4× higher latency than Nemotron.",
       "zh": "• Parakeet TDT 和 Canary 出现明显的流式退化（BSF ≥1.74），尽管运行延迟是 Nemotron 的 4×，WER 仍几乎翻倍。"
      }
     ]
    },
    {
     "id": "p-5-3-9",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-5-3-9-1",
       "original": "• While Parakeet TDT achieves higher RTFx than Nemotron on GPU (see Table 9 in the appendix), it is notably slower on CPU (RTFx 1.38 vs. 2.46).",
       "zh": "• 虽然 Parakeet TDT 在 GPU 上的 RTFx 高于 Nemotron（见附录 Table 9），但在 CPU 上明显更慢（RTFx 1.38 对 2.46）。"
      },
      {
       "id": "s-5-3-9-2",
       "original": "We hypothesize that Parakeet’s larger chunks benefit from GPU parallelism over wide tensors, whereas on CPU, where parallelism is limited, Nemotron’s smaller, cache-efficient chunks incur less per-step compute and better exploit the CPU memory hierarchy.",
       "zh": "我们的假设是：Parakeet 较大的块能从 GPU 对宽张量的并行处理中获益；而在并行度受限的 CPU 上，Nemotron 更小、缓存效率更高的块每步计算量更低，也更能利用 CPU 的存储层级。"
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
    "original": "ONNX Runtime Integration and Model Optimization",
    "zh": "ONNX Runtime 集成与模型优化"
   },
   "blocks": [
    {
     "id": "p-6-1",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-6-1-1",
       "original": "Having identified Nemotron-0.6B with the (7, 10, 7) configuration as our base model, we built a complete end-to-end streaming inference pipeline and applied ONNX Runtime quantization to optimize it for CPU-only edge deployment.",
       "zh": "在确定以 (7, 10, 7) 配置的 Nemotron-0.6B 作为基座模型后，我们搭建了一条完整的端到端流式推理管线，并应用 ONNX Runtime 量化，将其优化到可在纯 CPU 的边缘设备上部署。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-6-1",
   "num": "6.1",
   "level": 2,
   "page": 7,
   "title": {
    "original": "Streaming Inference Architecture",
    "zh": "流式推理架构"
   },
   "blocks": [
    {
     "id": "p-6-1-1",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-6-1-1-1",
       "original": "The original Nemotron model relies on NVIDIA’s NeMo framework and PyTorch for inference— neither of which is suitable for lightweight edge deployment.",
       "zh": "原始 Nemotron 模型依赖 NVIDIA 的 NeMo 框架和 PyTorch 做推理——这两者都不适合轻量化的边缘部署。"
      },
      {
       "id": "s-6-1-1-2",
       "original": "To enable efficient CPU inference, we re-implemented the full streaming ASR pipeline natively in ONNX Runtime [10] for efficient cross-platform deployment.",
       "zh": "为实现高效的 CPU 推理，我们把完整的流式 ASR 管线在 ONNX Runtime [10] 中原生重新实现，以便高效地跨平台部署。"
      }
     ]
    },
    {
     "id": "p-6-1-2",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-6-1-2-1",
       "original": "The key inference-level design decisions were:",
       "zh": "推理层面的关键设计决策如下："
      }
     ]
    },
    {
     "id": "p-6-1-3",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-6-1-3-1",
       "original": "1.",
       "zh": "1."
      },
      {
       "id": "s-6-1-3-2",
       "original": "Three-graph decomposition.",
       "zh": "三图分解。"
      },
      {
       "id": "s-6-1-3-3",
       "original": "Rather than exporting a single monolithic ONNX graph, we decompose the model into three independently optimizable ONNX sessions: the encoder (cache-aware FastConformer), the decoder (LSTM prediction network), and the joiner.",
       "zh": "我们没有导出单一的大 ONNX 图，而是把模型拆成三个可独立优化的 ONNX 会话：编码器（cache-aware FastConformer）、解码器（LSTM 预测网络）和 joiner。"
      },
      {
       "id": "s-6-1-3-4",
       "original": "This enables per-component quantization—for example, quantizing the encoder more aggressively than the decoder—and allows ONNX Runtime to apply graph-level optimizations independently to each component.",
       "zh": "这使得按组件量化成为可能——例如对编码器比对解码器更激进地量化——也让 ONNX Runtime 能对每个组件独立应用图级优化。"
      },
      {
       "id": "s-6-1-3-5",
       "original": "In particular, fusing multi-head attention into a single kernel yielded significant speedups for the encoder, which dominates inference time.",
       "zh": "特别是，把多头注意力融合为单个 kernel 给编码器带来了显著加速，而编码器正是推理时间的主要消耗者。"
      }
     ]
    },
    {
     "id": "p-6-1-4",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-6-1-4-1",
       "original": "2.",
       "zh": "2."
      },
      {
       "id": "s-6-1-4-2",
       "original": "Stateful streaming with zero-copy cache management.",
       "zh": "有状态流式推理与零拷贝缓存管理。"
      }
     ]
    },
    {
     "id": "p-6-1-5",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-6-1-5-1",
       "original": "The encoder maintains rolling cache tensors across chunks for channel and temporal context, while the decoder preserves LSTM hidden and cell states between decoding steps.",
       "zh": "编码器跨片段维护滚动缓存张量以保留通道与时间上下文，解码器则在解码步之间保存 LSTM 的隐状态与细胞状态。"
      },
      {
       "id": "s-6-1-5-2",
       "original": "We designed the inference loop to update these caches in-place between chunks, avoiding redundant memory allocations and copies that would otherwise dominate CPU inference latency for short audio segments.",
       "zh": "我们把推理循环设计为在片段之间就地更新这些缓存，避免冗余的内存分配与拷贝——对短音频片段而言，这些开销否则会主导 CPU 推理延迟。"
      }
     ]
    },
    {
     "id": "p-6-1-6",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-6-1-6-1",
       "original": "3.",
       "zh": "3."
      },
      {
       "id": "s-6-1-6-2",
       "original": "Native mel spectrogram extraction.",
       "zh": "原生 mel 频谱图提取。"
      },
      {
       "id": "s-6-1-6-3",
       "original": "Rather than depending on Python-based audio preprocessing, we implemented NeMo-compatible log-mel feature extraction directly in the inference runtime.",
       "zh": "我们没有依赖基于 Python 的音频预处理，而是直接在推理运行时内实现了与 NeMo 兼容的 log-mel 特征提取。"
      },
      {
       "id": "s-6-1-6-4",
       "original": "This includes a ring-buffer pre-encode cache that carries overlapping mel frames between chunks, ensuring acoustic continuity at chunk boundaries without recomputing features.",
       "zh": "其中包括一个环形缓冲的编码前缓存，在片段之间携带重叠的 mel 帧，保证块边界处的声学连续性而无需重算特征。"
      }
     ]
    },
    {
     "id": "p-6-1-7",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-6-1-7-1",
       "original": "4.",
       "zh": "4."
      },
      {
       "id": "s-6-1-7-2",
       "original": "RNNT greedy decoding.",
       "zh": "RNNT 贪心解码。"
      },
      {
       "id": "s-6-1-7-3",
       "original": "The inference loop implements RNNT greedy decoding as a state machine that iterates over encoder time steps, querying the joiner at each step until a blank token is emitted or a per-step symbol limit is reached.",
       "zh": "推理循环把 RNNT 贪心解码实现为一个状态机：遍历编码器时间步，每一步查询 joiner，直到输出空白（blank）token 或达到每步符号数上限。"
      },
      {
       "id": "s-6-1-7-4",
       "original": "This avoids the overhead of beam search while maintaining accuracy for streaming scenarios.",
       "zh": "这避免了束搜索的开销，同时在流式场景下保持精度。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-6-2",
   "num": "6.2",
   "level": 2,
   "page": 8,
   "title": {
    "original": "Quantization Methods",
    "zh": "量化方法"
   },
   "blocks": [
    {
     "id": "p-6-2-1",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-6-2-1-1",
       "original": "Post-training quantization methods can be broadly divided into calibration-based approaches, which use representative input data to guide quantization decisions, and calibration-free approaches, which determine quantization parameters entirely from weight statistics.",
       "zh": "训练后量化方法大体可分为两类：基于校准的方法，用有代表性的输入数据来指导量化决策；以及免校准的方法，完全依据权重统计量来确定量化参数。"
      },
      {
       "id": "s-6-2-1-2",
       "original": "Calibrationbased methods such as AWQ [11] and GPTQ [12] are most commonly studied in autoregressive LLM settings, where representative calibration data is naturally defined in terms of text prompts.",
       "zh": "AWQ [11] 和 GPTQ [12] 等基于校准的方法主要在自回归 LLM 场景中被研究，因为那里有以文本提示（prompt）形式天然定义好的代表性校准数据。"
      },
      {
       "id": "s-6-2-1-3",
       "original": "Prior ASR work has also explored low-bit quantization-aware training, including 2-bit QAT for Conformer models on LibriSpeech and large-scale internal data [13], though such approaches require retraining.",
       "zh": "此前的 ASR 工作也探索过低比特量化感知训练，包括在 LibriSpeech 和大规模内部数据上对 Conformer 模型做 2-bit QAT [13]，但这类方法需要重新训练。"
      },
      {
       "id": "s-6-2-1-4",
       "original": "For a stateful streaming transducer operating on audio input, defining representative calibration data and chunk-level execution conditions is less straightforward, so in this work we focus on calibration-free post-training strategies that require no additional training or calibration data.",
       "zh": "对于一个在音频输入上运行的有状态流式 Transducer，定义有代表性的校准数据和片段级执行条件并不直接，因此本工作聚焦于不需要额外训练或校准数据的免校准训练后量化策略。"
      }
     ]
    },
    {
     "id": "p-6-2-2",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-6-2-2-1",
       "original": "All quantization variants use weight-only block quantization: each weight matrix W is partitioned into contiguous blocks of b elements (block size b = 32 in our experiments), and each block is independently mapped to n-bit integers (n ∈{4, 8}) with a per-block scale s and zeropoint z.",
       "zh": "所有量化变体都使用仅权重分块量化：每个权重矩阵 W 被切分为 b 个连续元素组成的块（本实验中块大小 b = 32），每个块被独立映射为 n-bit 整数（n ∈ {4, 8}），并带有每块的缩放因子 s 和零点 z。"
      },
      {
       "id": "s-6-2-2-2",
       "original": "Activations remain in FP32 at inference time; the quantized weights are consumed by the fused ONNX MatMulNBits operator, which combines linear dequantization with matrix multiplication.",
       "zh": "推理时激活保持 FP32；量化后的权重由 ONNX 的融合算子 MatMulNBits 消费，该算子把线性反量化与矩阵乘法合并在一起。"
      },
      {
       "id": "s-6-2-2-3",
       "original": "We evaluate two calibration-free quantization algorithms that differ in how s and z are computed:",
       "zh": "我们评测了两种免校准量化算法，它们的区别在于 s 和 z 的计算方式："
      }
     ]
    }
   ]
  },
  {
   "id": "sec-round-to-nearest-rtn",
   "num": null,
   "level": 2,
   "page": 8,
   "title": {
    "original": "Round-To-Nearest (RTN).",
    "zh": "最近舍入（RTN）"
   },
   "blocks": [
    {
     "id": "p-round-to-nearest-rtn-1",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-round-to-nearest-rtn-1-1",
       "original": "For each block with weights {wj}b j=1, RTN computes scale and zero-point directly from the weight range:",
       "zh": "对每个包含权重 {wj}（j = 1…b）的块，RTN 直接由权重的取值范围计算缩放因子和零点：s = (wmax − wmin) / (2n − 1)，z = round(−wmin / s)。"
      }
     ]
    },
    {
     "id": "eq-round-to-nearest-rtn-1",
     "type": "equation",
     "page": 8,
     "original": "2n −1 , z = round −wmin"
    },
    {
     "id": "eq-round-to-nearest-rtn-2",
     "type": "equation",
     "page": 8,
     "original": "s = wmax −wmin"
    },
    {
     "id": "p-round-to-nearest-rtn-2",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-round-to-nearest-rtn-2-1",
       "original": "Each weight is then quantized in a single pass:",
       "zh": "然后每个权重经单次扫描完成量化："
      }
     ]
    },
    {
     "id": "eq-round-to-nearest-rtn-3",
     "type": "equation",
     "page": 8,
     "original": "qj = clamp round wj s"
    },
    {
     "id": "p-round-to-nearest-rtn-3",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-round-to-nearest-rtn-3-1",
       "original": "s + z",
       "zh": "（公式片段：……s + z（RTN 量化公式，见原文）。）"
      }
     ]
    },
    {
     "id": "eq-round-to-nearest-rtn-4",
     "type": "equation",
     "page": 8,
     "original": ", 0, 2n −1"
    },
    {
     "id": "p-round-to-nearest-rtn-4",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-round-to-nearest-rtn-4-1",
       "original": "RTN is one of the fastest quantization methods, but provides no mechanism to minimize the resulting quantization error.",
       "zh": "qj = clamp(round(wj / s) + z, 0, 2n − 1)。RTN 是最快的量化方法之一，但它没有任何机制来最小化由此产生的量化误差。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-k-quant",
   "num": null,
   "level": 2,
   "page": 9,
   "title": {
    "original": "K-quant.",
    "zh": "K-quant"
   },
   "blocks": [
    {
     "id": "p-k-quant-1",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-k-quant-1-1",
       "original": "K-quant improves upon RTN by optimizing the scale and offset per block to minimize reconstruction error, with greater emphasis on preserving large-magnitude weights.",
       "zh": "K-quant 在 RTN 的基础上做了改进：按块优化缩放因子与偏移，以最小化重建误差，并更强调保留大幅值权重。"
      },
      {
       "id": "s-k-quant-1-2",
       "original": "To our knowledge, this quantization scheme has limited formal description in prior literature, so we summarize the procedure used in our implementation.",
       "zh": "据我们所知，这一量化方案在既有文献中缺少正式描述，因此我们在本文中概述了自己实现所用的流程。"
      }
     ]
    },
    {
     "id": "p-k-quant-2",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-k-quant-2-1",
       "original": "Each weight wj in a block is assigned an importance weight αj that combines the block’s root-mean-square with the element’s own magnitude:",
       "zh": "块中每个权重 wj 被赋予一个重要性权重 αj，它结合了该块的均方根（RMS）与该元素自身的幅值：αj = sqrt((1/b) · Σ_{k=1..b} w²ₖ) + |wj|。"
      }
     ]
    },
    {
     "id": "eq-k-quant-1",
     "type": "equation",
     "page": 9,
     "original": "v u u t1"
    },
    {
     "id": "eq-k-quant-2",
     "type": "equation",
     "page": 9,
     "original": "αj ="
    },
    {
     "id": "eq-k-quant-3",
     "type": "equation",
     "page": 9,
     "original": "b"
    },
    {
     "id": "eq-k-quant-4",
     "type": "equation",
     "page": 9,
     "original": "b X"
    },
    {
     "id": "eq-k-quant-5",
     "type": "equation",
     "page": 9,
     "original": "k=1 w2 k"
    },
    {
     "id": "eq-k-quant-6",
     "type": "equation",
     "page": 9,
     "original": "+ |wj|"
    },
    {
     "id": "eq-k-quant-7",
     "type": "equation",
     "page": 9,
     "original": "|"
    },
    {
     "id": "eq-k-quant-8",
     "type": "equation",
     "page": 9,
     "original": "{z"
    },
    {
     "id": "eq-k-quant-9",
     "type": "equation",
     "page": 9,
     "original": "}"
    },
    {
     "id": "p-k-quant-3",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-k-quant-3-1",
       "original": "block RMS (constant) Given fixed quantized integers qj (obtained from an initial RTN-like pass), k-quant then solves for the optimal affine mapping (s∗, m∗) such that the dequantized weights ˆwj = s∗·qj +m∗ are as close as possible to the original weights wj:",
       "zh": "其中第一项是块级 RMS（对块内所有元素为常数）。在固定量化整数 qj（由一次初始的类 RTN 扫描得到）后，k-quant 求解最优仿射映射 (s∗, m∗)，使反量化权重 ŵj = s∗·qj + m∗ 尽可能接近原始权重 wj：即最小化 Σ_j αj·(s∗·qj + m∗ − wj)²。"
      }
     ]
    },
    {
     "id": "eq-k-quant-10",
     "type": "equation",
     "page": 9,
     "original": ""
    },
    {
     "id": "eq-k-quant-11",
     "type": "equation",
     "page": 9,
     "original": "2"
    },
    {
     "id": "eq-k-quant-12",
     "type": "equation",
     "page": 9,
     "original": ""
    },
    {
     "id": "eq-k-quant-13",
     "type": "equation",
     "page": 9,
     "original": ""
    },
    {
     "id": "eq-k-quant-14",
     "type": "equation",
     "page": 9,
     "original": "s∗· qj + m∗"
    },
    {
     "id": "eq-k-quant-15",
     "type": "equation",
     "page": 9,
     "original": "|"
    },
    {
     "id": "eq-k-quant-16",
     "type": "equation",
     "page": 9,
     "original": "{z"
    },
    {
     "id": "eq-k-quant-17",
     "type": "equation",
     "page": 9,
     "original": "}"
    },
    {
     "id": "p-k-quant-4",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-k-quant-4-1",
       "original": "ˆwj (reconstructed)",
       "zh": "上式中 s∗·qj + m∗ 即重建权重 ŵj。"
      }
     ]
    },
    {
     "id": "eq-k-quant-18",
     "type": "equation",
     "page": 9,
     "original": "b X"
    },
    {
     "id": "eq-k-quant-19",
     "type": "equation",
     "page": 9,
     "original": "min s∗, m∗"
    },
    {
     "id": "eq-k-quant-20",
     "type": "equation",
     "page": 9,
     "original": "j=1 αj"
    },
    {
     "id": "eq-k-quant-21",
     "type": "equation",
     "page": 9,
     "original": "−wj"
    },
    {
     "id": "eq-k-quant-22",
     "type": "equation",
     "page": 9,
     "original": " "
    },
    {
     "id": "p-k-quant-5",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-k-quant-5-1",
       "original": "This is a two-variable weighted least-squares problem with a closed-form solution.",
       "zh": "这是一个带权两变量最小二乘问题，有闭式解。"
      },
      {
       "id": "s-k-quant-5-2",
       "original": "The block RMS provides a scale-adaptive baseline importance for all elements, while |wj| ensures that larger weights receive proportionally more attention during optimization.",
       "zh": "块 RMS 为所有元素提供了一个随尺度自适应的基线重要性，而 |wj| 保证较大的权重在优化中获得成比例的更多关注。"
      },
      {
       "id": "s-k-quant-5-3",
       "original": "The RMS term is necessary because using |wj| alone would assign near-zero importance to near-zero weights, allowing the optimizer to introduce arbitrary error on them.",
       "zh": "RMS 项是必要的：如果只用 |wj|，接近零的权重会被赋予接近零的重要性，优化器就可以在它们身上引入任意大的误差。"
      },
      {
       "id": "s-k-quant-5-4",
       "original": "Since even a small weight encodes meaningful information (e.g., suppressing a particular output dimension), this would degrade model quality.",
       "zh": "由于即使是很小的权重也编码着有意义的信息（例如抑制某个输出维度），这样做会损害模型质量。"
      },
      {
       "id": "s-k-quant-5-5",
       "original": "The RMS term sets a minimum importance floor that adapts to the block’s overall magnitude scale, preventing any weight from being completely ignored.",
       "zh": "RMS 项设定了一条随块整体幅值尺度自适应的最低重要性底线，防止任何权重被完全忽略。"
      }
     ]
    },
    {
     "id": "p-k-quant-6",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-k-quant-6-1",
       "original": "To explore beyond the initial quantization, our k-quant evaluates 20 candidate scale factors, uniformly spaced in a narrow range around the initial RTN scale, each producing different integer assignments qj.",
       "zh": "为在初始量化之外进一步探索，我们的 k-quant 在初始 RTN 缩放因子附近的窄区间内均匀取 20 个候选缩放因子，每个候选产生不同的整数分配 qj。"
      },
      {
       "id": "s-k-quant-6-2",
       "original": "For each candidate, the optimal (s∗, m∗) is recomputed in closed form, and the candidate with the lowest weighted error is kept.",
       "zh": "对每个候选，都以闭式解重新计算最优的 (s∗, m∗)，并保留加权误差最低的那个候选。"
      }
     ]
    },
    {
     "id": "p-k-quant-7",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-k-quant-7-1",
       "original": "Quantization is applied only to the encoder, which accounts for over 95% of model parameters.",
       "zh": "量化只应用于编码器，它占模型参数的 95% 以上。"
      },
      {
       "id": "s-k-quant-7-2",
       "original": "The decoder (LSTM prediction network) and joiner remain in FP32: their combined size is under 35 MB, so quantizing them would yield negligible size savings while risking degradation in the RNNT decoding loop, where the joiner is invoked at every encoder time step.",
       "zh": "解码器（LSTM 预测网络）和 joiner 保持 FP32：二者合计不足 35 MB，量化它们带来的体积收益可以忽略，反而可能在 RNNT 解码循环中造成退化——joiner 在每个编码器时间步都会被调用。"
      },
      {
       "id": "s-k-quant-7-3",
       "original": "Similarly, the streaming cache tensors (channel and temporal context) are maintained in FP32 to preserve numerical stability across chunk boundaries.",
       "zh": "同样，流式缓存张量（通道与时间上下文）也保持 FP32，以保证跨片段边界的数值稳定性。"
      }
     ]
    },
    {
     "id": "p-k-quant-8",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-k-quant-8-1",
       "original": "We evaluated the following quantization configurations:",
       "zh": "我们评测了以下量化配置："
      }
     ]
    },
    {
     "id": "p-k-quant-9",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-k-quant-9-1",
       "original": "• int4 RTN: 4-bit RTN quantization.",
       "zh": "• int4 RTN：4-bit RTN 量化。"
      },
      {
       "id": "s-k-quant-9-2",
       "original": "The simplest and fastest method, serving as a lower bound on quantization quality.",
       "zh": "最简单也最快的方法，作为量化质量的下界。"
      }
     ]
    },
    {
     "id": "p-k-quant-10",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-k-quant-10-1",
       "original": "• int8 k-quant: 8-bit k-quant quantization applied to all quantizable layers.",
       "zh": "• int8 k-quant：对所有可量化层应用 8-bit k-quant 量化。"
      }
     ]
    },
    {
     "id": "p-k-quant-11",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-k-quant-11-1",
       "original": "• int4 k-quant: Uniform 4-bit k-quant applied to all quantizable layers.",
       "zh": "• int4 k-quant：对所有可量化层统一应用 4-bit k-quant。"
      }
     ]
    },
    {
     "id": "p-k-quant-12",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-k-quant-12-1",
       "original": "• int4-mixed k-quant: Mixed-precision k-quant where most linear layers use int4, but layers identified as accuracy-sensitive (e.g., attention Q/K/V/O projections in all encoder layers, and the first and last encoder layers) retain int8 precision.",
       "zh": "• int4-mixed k-quant：混合精度 k-quant——大多数线性层用 int4，但被识别为对精度敏感的层（例如所有编码器层中的注意力 Q/K/V/O 投影，以及第一个和最后一个编码器层）保留 int8 精度。"
      }
     ]
    },
    {
     "id": "p-k-quant-13",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-k-quant-13-1",
       "original": "• int4 k-quant + ConvInteger/MatMulInteger: int4 k-quant with additional graphlevel optimization that replaces floating-point Conv and MatMul operators with their integer-arithmetic counterparts (ConvInteger, MatMulInteger).",
       "zh": "• int4 k-quant + ConvInteger/MatMulInteger：在 int4 k-quant 基础上再做图级优化，把浮点 Conv 和 MatMul 算子替换为整数运算版本（ConvInteger、MatMulInteger）。"
      },
      {
       "id": "s-k-quant-13-2",
       "original": "While this can improve throughput on certain hardware, it performs the entire computation in integer arithmetic rather than dequantizing back to floating point, accumulating rounding errors through the network.",
       "zh": "尽管这能在某些硬件上提升吞吐，但它让整个计算都在整数算术中完成、而不是反量化回浮点，舍入误差会在网络中层层累积。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-7",
   "num": "7",
   "level": 1,
   "page": 10,
   "title": {
    "original": "Results",
    "zh": "结果"
   },
   "blocks": []
  },
  {
   "id": "sec-7-1",
   "num": "7.1",
   "level": 2,
   "page": 10,
   "title": {
    "original": "Quantization Results",
    "zh": "量化结果"
   },
   "blocks": [
    {
     "id": "tab-7-1-1",
     "type": "table_caption",
     "page": 10,
     "original": "Table 6 reports the full evaluation results across all quantization variants.",
     "zh": "Table 6 报告了所有量化变体的完整评测结果。"
    },
    {
     "id": "tab-7-1-2",
     "type": "table_caption",
     "page": 10,
     "original": "Table 6: Nemotron-0.6B quantization results. Streaming config: (7,10,7), 0.56 s delay, 5.6 s history. CPU inference, batch_size=1.",
     "zh": "表 6：Nemotron-0.6B 量化结果。流式配置：(7,10,7)，0.56 s 延迟，5.6 s 历史。CPU 推理，batch_size=1。"
    },
    {
     "id": "p-7-1-1",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-7-1-1-1",
       "original": "Variant Format Size Device Avg RTFx AMI Earn.",
       "zh": "表头：Variant（变体）｜Format（格式）｜Size（体积）｜Device（设备）｜Avg｜RTFx｜AMI｜Earn.。"
      }
     ]
    },
    {
     "id": "p-7-1-2",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-7-1-2-1",
       "original": "Giga LS-c LS-o SPGI TED VoxP.",
       "zh": "表头续：Giga｜LS-c｜LS-o｜SPGI｜TED｜VoxP.。"
      }
     ]
    },
    {
     "id": "p-7-1-3",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-7-1-3-1",
       "original": "Baseline (PyTorch) PyTorch 2.47 GB CUDA",
       "zh": "2.\n（原始数据照录）\nBaseline (PyTorch) PyTorch 2.47 GB CUDA"
      }
     ]
    },
    {
     "id": "eq-7-1-1",
     "type": "equation",
     "page": 10,
     "original": "7.28 – 11.80 12.64 11.50 2.33 5.08 2.72 4.46 7.69"
    },
    {
     "id": "eq-7-1-2",
     "type": "equation",
     "page": 10,
     "original": "FP32 ONNX 2.47 GB CPU"
    },
    {
     "id": "eq-7-1-3",
     "type": "equation",
     "page": 10,
     "original": "8.03 6.73 16.40 13.32 12.00 2.35 5.01 2.61 4.66 7.90"
    },
    {
     "id": "eq-7-1-4",
     "type": "equation",
     "page": 10,
     "original": "int8 k-quant ONNX 1.28 GB CPU"
    },
    {
     "id": "eq-7-1-5",
     "type": "equation",
     "page": 10,
     "original": "8.01 7.25 16.37 13.35 11.97 2.36 4.97 2.52 4.62 7.92"
    },
    {
     "id": "eq-7-1-6",
     "type": "equation",
     "page": 10,
     "original": "int4-mixed k-quant ONNX 0.73 GB CPU"
    },
    {
     "id": "eq-7-1-7",
     "type": "equation",
     "page": 10,
     "original": "8.12 7.15 16.72 13.52 12.08 2.36 5.02 2.64 4.70 7.88"
    },
    {
     "id": "eq-7-1-8",
     "type": "equation",
     "page": 10,
     "original": "int4 k-quant ONNX 0.67 GB CPU"
    },
    {
     "id": "eq-7-1-9",
     "type": "equation",
     "page": 10,
     "original": "8.20 7.20 17.05 13.60 12.10 2.38 5.04 2.83 4.65 7.98"
    },
    {
     "id": "eq-7-1-10",
     "type": "equation",
     "page": 10,
     "original": "int4 k-quant w/ ConvInt ONNX 0.67 GB CPU"
    },
    {
     "id": "eq-7-1-11",
     "type": "equation",
     "page": 10,
     "original": "10.14 8.00 20.55 11.68 14.73 5.32 10.14 3.05 5.64 9.98"
    },
    {
     "id": "eq-7-1-12",
     "type": "equation",
     "page": 10,
     "original": "int4 RTN ONNX 0.66 GB CPU"
    },
    {
     "id": "eq-7-1-13",
     "type": "equation",
     "page": 10,
     "original": "8.46 7.30 18.94 13.52 12.12 2.42 5.10 2.85 4.72 8.05 9.00 8.75"
    },
    {
     "id": "eq-7-1-14",
     "type": "equation",
     "page": 10,
     "original": "int4 RTN"
    },
    {
     "id": "eq-7-1-15",
     "type": "equation",
     "page": 10,
     "original": "8.50"
    },
    {
     "id": "eq-7-1-16",
     "type": "equation",
     "page": 10,
     "original": "int4 k-quant Average WER (%) int4-mix k-quant"
    },
    {
     "id": "eq-7-1-17",
     "type": "equation",
     "page": 10,
     "original": "8.25 8.00 7.75 7.50 7.25"
    },
    {
     "id": "eq-7-1-18",
     "type": "equation",
     "page": 10,
     "original": "ONNX Variants PyTorch Baseline FP32 int8 k-quant Baseline"
    },
    {
     "id": "eq-7-1-19",
     "type": "equation",
     "page": 10,
     "original": "0.0 0.5 1.0 1.5 2.0 2.5"
    },
    {
     "id": "eq-7-1-20",
     "type": "equation",
     "page": 10,
     "original": "Model Size (GB)"
    },
    {
     "id": "eq-7-1-21",
     "type": "equation",
     "page": 10,
     "original": "7.00"
    },
    {
     "id": "fig-7-1-1",
     "type": "figure_caption",
     "page": 10,
     "original": "Figure 3: Model size vs. WER for Nemotron quantization variants. The int4 k-quant variant achieves 8.20% WER at 0.67 GB, within 0.17% of the ONNX FP32 baseline (8.03%).",
     "zh": "图 3：Nemotron 各量化变体的模型体积与 WER 关系。int4 k-quant 变体在 0.67 GB 体积下取得 8.20% WER，与 ONNX FP32 基线（8.03%）的差距在 0.17% 以内。"
    },
    {
     "id": "eq-7-1-22",
     "type": "equation",
     "page": 11,
     "original": "9.0 8.8 8.6"
    },
    {
     "id": "eq-7-1-23",
     "type": "equation",
     "page": 11,
     "original": "Average WER (%)"
    },
    {
     "id": "eq-7-1-24",
     "type": "equation",
     "page": 11,
     "original": "8.4"
    },
    {
     "id": "eq-7-1-25",
     "type": "equation",
     "page": 11,
     "original": "int4-mix k-quant"
    },
    {
     "id": "eq-7-1-26",
     "type": "equation",
     "page": 11,
     "original": "8.2"
    },
    {
     "id": "eq-7-1-27",
     "type": "equation",
     "page": 11,
     "original": "FP32"
    },
    {
     "id": "eq-7-1-28",
     "type": "equation",
     "page": 11,
     "original": "8.0 7.8"
    },
    {
     "id": "eq-7-1-29",
     "type": "equation",
     "page": 11,
     "original": "ONNX Variants int4 RTN int4 k-quant int8 k-quant"
    },
    {
     "id": "eq-7-1-30",
     "type": "equation",
     "page": 11,
     "original": "6.4 6.6 6.8 7.0 7.2 7.4 7.6"
    },
    {
     "id": "p-7-1-4",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-7-1-4-1",
       "original": "CPU RTFx (batch_size=1)",
       "zh": "（图注行）CPU RTFx (batch_size=1)。"
      }
     ]
    },
    {
     "id": "fig-7-1-2",
     "type": "figure_caption",
     "page": 11,
     "original": "Figure 4: CPU RTFx vs. WER. All ONNX variants achieve RTFx > 6× real-time on CPU, with quantized variants slightly faster than FP32.",
     "zh": "图 4：CPU RTFx 与 WER 的关系。所有 ONNX 变体在 CPU 上都达到 RTFx > 6× 实时，量化变体略快于 FP32。"
    }
   ]
  },
  {
   "id": "sec-7-2",
   "num": "7.2",
   "level": 2,
   "page": 11,
   "title": {
    "original": "Key Findings",
    "zh": "关键发现"
   },
   "blocks": [
    {
     "id": "p-7-2-1",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-7-2-1-1",
       "original": "1.",
       "zh": "1."
      },
      {
       "id": "s-7-2-1-2",
       "original": "Quantization preserves accuracy remarkably well.",
       "zh": "量化对精度的保持好得惊人。"
      },
      {
       "id": "s-7-2-1-3",
       "original": "The int8 k-quant variant achieves 8.01% average WER, essentially matching the ONNX FP32 baseline (8.03%), with a 48% reduction in model size.",
       "zh": "int8 k-quant 变体的平均 WER 为 8.01%，与 ONNX FP32 基线（8.03%）基本持平，同时模型体积缩小了 48%。"
      },
      {
       "id": "s-7-2-1-4",
       "original": "Even at int4 precision with a model size of just 0.67 GB (73% smaller), the WER degrades by only 0.17% absolute (2.1% relative), demonstrating that aggressive 4-bit compression is viable for streaming ASR.",
       "zh": "即使在 int4 精度、模型体积仅 0.67 GB（缩小 73%）的情况下，WER 也只退化了 0.17%（绝对值，相对退化 2.1%），说明激进的 4-bit 压缩对流式 ASR 是可行的。"
      }
     ]
    },
    {
     "id": "p-7-2-2",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-7-2-2-1",
       "original": "2.",
       "zh": "2."
      },
      {
       "id": "s-7-2-2-2",
       "original": "CPU inference is practical.",
       "zh": "CPU 推理是切实可行的。"
      },
      {
       "id": "s-7-2-2-3",
       "original": "All ONNX variants achieve RTFx > 6× on CPU, meaning they can process audio more than 6 times faster than real-time—well within the requirements for streaming applications.",
       "zh": "所有 ONNX 变体在 CPU 上都达到 RTFx > 6×，即处理音频的速度超过实时的 6 倍——远高于流式应用的要求。"
      },
      {
       "id": "s-7-2-2-4",
       "original": "With the selected (7, 10, 7) streaming configuration (0.56 s algorithmic delay), this yields an effective time-to-first-token well under 0.7 s, dominated by audio accumulation rather than inference compute.",
       "zh": "在选定的 (7, 10, 7) 流式配置（0.56 s 算法延迟）下，首 token 有效时间远低于 0.7 s，且主要由音频累积而非推理计算决定。"
      }
     ]
    },
    {
     "id": "p-7-2-3",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-7-2-3-1",
       "original": "3.",
       "zh": "3."
      },
      {
       "id": "s-7-2-3-2",
       "original": "Quantization accelerates inference.",
       "zh": "量化能加速推理。"
      },
      {
       "id": "s-7-2-3-3",
       "original": "The quantized variants (int8, int4-mixed, int4) all achieve slightly higher RTFx than FP32 ONNX (7.15–7.30× vs. 6.7×), showing that reduced precision translates to faster throughput on CPU.",
       "zh": "量化变体（int8、int4-mixed、int4）的 RTFx 都略高于 FP32 ONNX（7.15–7.30× 对 6.7×），说明降低精度在 CPU 上能转化为更高的吞吐。"
      }
     ]
    },
    {
     "id": "p-7-2-4",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-7-2-4-1",
       "original": "4.",
       "zh": "4."
      },
      {
       "id": "s-7-2-4-2",
       "original": "ONNX FP32 vs. PyTorch baseline gap.",
       "zh": "ONNX FP32 与 PyTorch 基线之间的差距。"
      },
      {
       "id": "s-7-2-4-3",
       "original": "The ONNX FP32 variant shows a 0.75% absolute WER increase over the PyTorch CUDA baseline (8.03% vs. 7.28%).",
       "zh": "ONNX FP32 变体相比 PyTorch CUDA 基线出现了 0.75% 的绝对 WER 上升（8.03% 对 7.28%）。"
      },
      {
       "id": "s-7-2-4-4",
       "original": "We suspect that this discrepancy is not caused by the ONNX export itself, since the graph is numerically equivalent, but rather by differences in kernel implementations that may compound through 24 conformer layers.",
       "zh": "我们怀疑这一差异并非来自 ONNX 导出本身——因为计算图在数值上是等价的——而是来自 kernel 实现的差异，这些差异可能在 24 层 Conformer 中累积放大。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-7-3",
   "num": "7.3",
   "level": 2,
   "page": 11,
   "title": {
    "original": "Trade-off of Algorithmic Delay and Effective Latency",
    "zh": "算法延迟与有效延迟的权衡"
   },
   "blocks": [
    {
     "id": "p-7-3-1",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-7-3-1-1",
       "original": "RTFx varies significantly with the streaming configuration.",
       "zh": "RTFx 随流式配置的变化很显著。"
      },
      {
       "id": "s-7-3-1-2",
       "original": "Smaller chunk sizes reduce algorithmic delay but also reduce per-chunk compute efficiency, as fixed per-invocation overhead (session invoke, tensor binding, cache management) is amortized over less audio.",
       "zh": "更小的块虽然降低算法延迟，但也降低每块的计算效率，因为固定的单次调用开销（会话调用、张量绑定、缓存管理）被摊到更少的音频上。"
      },
      {
       "id": "s-7-3-1-3",
       "original": "Figure 5 illustrates this trade-off using measured RTFx values from the int4 k-quant model across three streaming configurations (0.16 s, 0.56 s, and 1.12 s algorithmic delay): the effective latency (algorithmic delay plus compute time) diverges from the ideal as chunk size decreases.",
       "zh": "Figure 5 用 int4 k-quant 模型在三种流式配置（算法延迟 0.16 s、0.56 s 和 1.12 s）下的实测 RTFx 展示了这一权衡：随着块变小，有效延迟（算法延迟加计算时间）会偏离理想值。"
      },
      {
       "id": "s-7-3-1-4",
       "original": "Extrapolating from the measured trend suggests that configurations near ∼50 ms algorithmic delay may still be feasible on our server CPU (32 cores), though we did not evaluate such settings directly.",
       "zh": "由实测趋势外推，在我们的服务器 CPU（32 核）上，算法延迟接近 ~50 ms 的配置可能仍然可行，但我们没有直接评测这样的设置。"
      },
      {
       "id": "s-7-3-1-5",
       "original": "On weaker consumer hardware, the margin is expected to shrink.",
       "zh": "在更弱的消费级硬件上，余量预计会缩小。"
      },
      {
       "id": "s-7-3-1-6",
       "original": "For example, under an illustrative assumption of roughly 2× lower throughput than our server, the 0.16 s configuration would operate at approximately RTFx ≈1.3×, leaving limited headroom for background load, while substantially smaller chunk sizes could risk audio dropout.",
       "zh": "举例说，假设吞吐约为我们服务器的 1/2（2× 更低），0.16 s 配置大约只能跑到 RTFx ≈ 1.3×，留给后台负载的余量很有限；而更小的块则可能有音频丢帧的风险。"
      }
     ]
    },
    {
     "id": "p-7-3-2",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-7-3-2-1",
       "original": "The 0.16 s configuration achieves 8.89% average WER with the ONNX int4 k-quant model on CPU (see Table 16 in the appendix), only 0.69% above the 0.56 s result, while reducing algorithmic delay by more than 3×.",
       "zh": "0.16 s 配置下，ONNX int4 k-quant 模型在 CPU 上的平均 WER 为 8.89%（见附录 Table 16），只比 0.56 s 的结果高 0.69%，而算法延迟降低了 3× 以上。"
      },
      {
       "id": "s-7-3-2-2",
       "original": "These results suggest that further latency reduction beyond our recommended 0.56 s configuration is feasible for applications that prioritize responsiveness, provided the target hardware offers sufficient compute headroom.",
       "zh": "这些结果表明：对于更看重响应速度的应用，只要目标硬件有足够的算力余量，在推荐的 0.56 s 配置基础上进一步压低延迟是可行的。"
      }
     ]
    },
    {
     "id": "eq-7-3-1",
     "type": "equation",
     "page": 12,
     "original": "1400 1200"
    },
    {
     "id": "eq-7-3-2",
     "type": "equation",
     "page": 12,
     "original": "Effective Latency (ms)"
    },
    {
     "id": "eq-7-3-3",
     "type": "equation",
     "page": 12,
     "original": "1000"
    },
    {
     "id": "eq-7-3-4",
     "type": "equation",
     "page": 12,
     "original": "~130ms"
    },
    {
     "id": "eq-7-3-5",
     "type": "equation",
     "page": 12,
     "original": "800 600"
    },
    {
     "id": "eq-7-3-6",
     "type": "equation",
     "page": 12,
     "original": "~50ms"
    },
    {
     "id": "eq-7-3-7",
     "type": "equation",
     "page": 12,
     "original": "400 200"
    },
    {
     "id": "eq-7-3-8",
     "type": "equation",
     "page": 12,
     "original": "Ideal (RTFx ="
    },
    {
     "id": "eq-7-3-9",
     "type": "equation",
     "page": 12,
     "original": ")"
    },
    {
     "id": "p-7-3-3",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-7-3-3-1",
       "original": "Extrapolated (est.)",
       "zh": "（图例行）Extrapolated (est.)（外推估计）。"
      }
     ]
    },
    {
     "id": "p-7-3-4",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-7-3-4-1",
       "original": "Server CPU (32 cores) Consumer CPU (RTFx/2, est.) RTFx < 1 (audio dropout)",
       "zh": "（图例行）Server CPU (32 cores) / Consumer CPU (RTFx/2, est.) / RTFx < 1（音频欠载）。"
      }
     ]
    },
    {
     "id": "eq-7-3-10",
     "type": "equation",
     "page": 12,
     "original": "0.0 0.2 0.4 0.6 0.8 1.0 1.2"
    },
    {
     "id": "eq-7-3-11",
     "type": "equation",
     "page": 12,
     "original": "Algorithmic Delay (s)"
    },
    {
     "id": "eq-7-3-12",
     "type": "equation",
     "page": 12,
     "original": "0"
    },
    {
     "id": "fig-7-3-1",
     "type": "figure_caption",
     "page": 12,
     "original": "Figure 5: Effective latency vs. algorithmic delay for Nemotron-0.6B int4 k-quant on CPU. The red shaded region indicates where RTFx drops below 1× (audio dropout).",
     "zh": "图 5：Nemotron-0.6B int4 k-quant 在 CPU 上有效延迟与算法延迟的关系。红色阴影区域表示 RTFx 跌破 1×（音频丢帧）的位置。"
    }
   ]
  },
  {
   "id": "sec-8",
   "num": "8",
   "level": 1,
   "page": 12,
   "title": {
    "original": "Recommendation and Selected Configuration",
    "zh": "推荐与选定配置"
   },
   "blocks": [
    {
     "id": "p-8-1",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-8-1-1",
       "original": "Based on our evaluation, we selected the Nemotron-0.6B int4 k-quant variant with the (7, 10, 7) streaming configuration and 0.56 s algorithmic delay as our recommended on-device streaming ASR model.",
       "zh": "基于本次评测，我们选定采用 (7, 10, 7) 流式配置、算法延迟 0.56 s 的 Nemotron-0.6B int4 k-quant 变体，作为推荐的端侧流式 ASR 模型。"
      },
      {
       "id": "s-8-1-2",
       "original": "The optimized model is available through Microsoft’s Foundry Local platform, with streaming inference support across C#, Python, JavaScript, C++, and Rust via the ONNX Runtime GenAI SDK.",
       "zh": "优化后的模型已通过微软的 Foundry Local 平台提供，流式推理可通过 ONNX Runtime GenAI SDK 以 C#、Python、JavaScript、C++ 和 Rust 调用。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-9",
   "num": "9",
   "level": 1,
   "page": 12,
   "title": {
    "original": "Discussion",
    "zh": "讨论"
   },
   "blocks": [
    {
     "id": "p-9-1",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-9-1-1",
       "original": "Our evaluation of over 50 configurations across six model families reveals several noteworthy patterns worth discussing.",
       "zh": "我们对 6 个模型族、50 多个配置的评测揭示了几个值得讨论的明显规律。"
      },
      {
       "id": "s-9-1-2",
       "original": "First, there is a clear architectural divide between models designed for batch processing and those designed for streaming.",
       "zh": "第一，为批处理设计的模型与为流式设计的模型之间存在清晰的架构分野。"
      },
      {
       "id": "s-9-1-3",
       "original": "Batch-oriented models such as Qwen3- ASR-1.7B and Whisper achieve strong offline WERs but degrade substantially when adapted to chunked or streaming operation.",
       "zh": "Qwen3-ASR-1.7B 和 Whisper 等批处理导向的模型能取得很强的离线 WER，但被改造为分块或流式运行时退化明显。"
      },
      {
       "id": "s-9-1-4",
       "original": "Qwen3-ASR-1.7B, for example, jumps from 5.90% to 10.45% WER when chunked at 2.4 s stride.",
       "zh": "例如 Qwen3-ASR-1.7B 在 2.4 s 步长分块时，WER 从 5.90% 跳到 10.45%。"
      }
     ]
    },
    {
     "id": "p-9-2",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-9-2-1",
       "original": "In contrast, Nemotron-0.6B’s cache-aware architecture, purpose-built for streaming, loses only 0.21% absolute when moving from batch to its optimal streaming configuration.",
       "zh": "相比之下，Nemotron-0.6B 的 cache-aware 架构是专为流式打造的，从批处理切换到最优流式配置时仅损失 0.21%（绝对值）。"
      },
      {
       "id": "s-9-2-2",
       "original": "More broadly, our results suggest that offline ASR quality is a poor proxy for low-latency streaming quality: despite strong batch WER, several modern models exhibit substantial degradation when constrained to practical streaming settings.",
       "zh": "更一般地说，我们的结果表明：离线 ASR 质量是低延迟流式质量的一个糟糕的代理指标——好几个现代模型尽管批处理 WER 很强，在被约束到实际可用的流式设置后都出现了明显退化。"
      }
     ]
    },
    {
     "id": "p-9-3",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-9-3-1",
       "original": "The sensitivity to history context is also striking.",
       "zh": "对历史上下文的敏感性同样惊人。"
      },
      {
       "id": "s-9-3-2",
       "original": "Comparing the (7, 10, 7) and (7, 2, 7) configurations—identical except for left context—shows a 1.23% WER gap (7.28% vs. 8.51%), underscoring that streaming models need sufficient lookback to maintain accuracy.",
       "zh": "对比 (7, 10, 7) 与 (7, 2, 7) 两个配置——除了左上下文之外完全相同——WER 相差 1.23%（7.28% 对 8.51%），凸显了流式模型需要足够的回看窗口才能保持精度。"
      },
      {
       "id": "s-9-3-3",
       "original": "This has direct implications for memory budgeting on edge devices: the 5.6 s history window required by the optimal configuration is a modest but non-negligible cost.",
       "zh": "这对边缘设备的内存预算有直接影响：最优配置所需的 5.6 s 历史窗口是一笔不大但不可忽略的开销。"
      }
     ]
    },
    {
     "id": "p-9-4",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-9-4-1",
       "original": "Quantization preserves accuracy remarkably well.",
       "zh": "量化对精度的保持好得惊人。"
      },
      {
       "id": "s-9-4-2",
       "original": "On the full evaluation sets, the int4 kquant variant achieves 8.20% average WER compared to the 8.03% ONNX FP32 baseline, a degradation of only 0.17% absolute despite a 73% reduction in model size (from 2.47 GB to 0.67 GB).",
       "zh": "在完整评测集上，int4 k-quant 变体的平均 WER 为 8.20%，而 ONNX FP32 基线为 8.03%——尽管模型体积缩小了 73%（从 2.47 GB 到 0.67 GB），绝对退化只有 0.17%。"
      },
      {
       "id": "s-9-4-3",
       "original": "The degradation is distributed across most datasets, with the largest increases on AMI (+0.65%) and SPGISpeech (+0.22%), while TED-LIUM actually shows no degradation (4.65% vs. 4.66%).",
       "zh": "退化分布在大多数数据集上，增幅最大的是 AMI（+0.65%）和 SPGISpeech（+0.22%），而 TED-LIUM 实际上没有退化（4.65% 对 4.66%）。"
      }
     ]
    },
    {
     "id": "p-9-5",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-9-5-1",
       "original": "The int8 variant at 1.28 GB essentially matches FP32 accuracy (8.01% vs. 8.03%), confirming that 8-bit quantization is effectively lossless for this architecture.",
       "zh": "1.28 GB 的 int8 变体与 FP32 精度基本持平（8.01% 对 8.03%），证实 8-bit 量化对该架构实际上是无损的。"
      },
      {
       "id": "s-9-5-2",
       "original": "One notable negative result is the ConvInteger/MatMulInteger variant, which degrades to 10.14% WER despite using the same int4 k-quant weights.",
       "zh": "一个值得注意的负面结果是 ConvInteger/MatMulInteger 变体：尽管使用同样的 int4 k-quant 权重，WER 却退化到 10.14%。"
      },
      {
       "id": "s-9-5-3",
       "original": "Unlike standard quantized operators that dequantize inputs back to floating point before computing, ConvInteger and MatMulInteger perform the entire computation in integer arithmetic, accumulating rounding errors through the encoder’s 24 conformer layers of interleaved convolutions and attention.",
       "zh": "与先把输入反量化回浮点再计算的标准量化算子不同，ConvInteger 和 MatMulInteger 让全部计算都在整数算术中完成，舍入误差在编码器 24 层卷积与注意力交错的 Conformer 层中累积。"
      }
     ]
    },
    {
     "id": "p-9-6",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-9-6-1",
       "original": "From a resource utilization perspective, the ONNX Nemotron variants occupy a compelling position: all variants achieve RTFx > 6× on CPU, running over 6× faster than real-time.",
       "zh": "从资源占用的角度看，ONNX 版 Nemotron 变体占据了一个很有吸引力的位置：所有变体在 CPU 上都达到 RTFx > 6×，运行速度超过实时的 6 倍。"
      },
      {
       "id": "s-9-6-2",
       "original": "Other evaluated architectures exhibited higher WER or latency under the tested streaming configurations.",
       "zh": "其他被评测的架构在所测试的流式配置下，WER 或延迟都更高。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-9-1",
   "num": "9.1",
   "level": 2,
   "page": 13,
   "title": {
    "original": "Practical Scope and Positioning",
    "zh": "实际适用范围与定位"
   },
   "blocks": [
    {
     "id": "p-9-1-1",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-9-1-1-1",
       "original": "The results in this report show that compact on-device ASR can achieve strong core transcription quality on standard English benchmarks while operating with low latency and no GPU requirement.",
       "zh": "本报告的结果表明：紧凑的端侧 ASR 能在标准英文基准上取得很强的核心转写质量，同时以低延迟运行且不需要 GPU。"
      },
      {
       "id": "s-9-1-1-2",
       "original": "More broadly, the observed ESB performance suggests that compact on-device streaming ASR is narrowing the historical quality gap to production systems on core transcription benchmarks.",
       "zh": "更一般地说，观察到的 ESB 结果表明：在核心转写基准上，紧凑的端侧流式 ASR 正在缩小与生产系统之间历史性的质量差距。"
      },
      {
       "id": "s-9-1-1-3",
       "original": "However, these results should not be over-interpreted.",
       "zh": "然而，这些结果不应被过度解读。"
      },
      {
       "id": "s-9-1-1-4",
       "original": "While the ESB suite covers several challenging domains, including far-field meetings (AMI) and telephony-quality financial calls (Earnings22), it represents only a limited subset of real-world speech recognition use cases.",
       "zh": "虽然 ESB 套件覆盖了若干困难场景，包括远场会议（AMI）和电话音质的金融电话会（Earnings22），但它只代表真实世界语音识别用例的一个有限子集。"
      },
      {
       "id": "s-9-1-1-5",
       "original": "Our evaluation focuses on core transcription accuracy and does not cover several important system-level capabilities often required in production settings, such as robust inverse text normalization (numbers, dates, currencies), speaker diarization, code-switching, custom vocabulary adaptation, or broader internal evaluation suites designed to reflect customer usage.",
       "zh": "我们的评测聚焦核心转写准确率，没有覆盖生产环境常需的若干系统级能力，例如鲁棒的逆文本规整化（数字、日期、货币）、说话人分离、语码混合（code-switch）、自定义词表适配，以及为反映客户使用而设计的更广泛的内部评测套件。"
      },
      {
       "id": "s-9-1-1-6",
       "original": "The ESB results should therefore be understood as measuring core recognition quality across a representative but limited set of domains, rather than as a comprehensive assessment of end-toend speech recognition system quality.",
       "zh": "因此，ESB 结果应被理解为：在一组有代表性但有限的领域上衡量核心识别质量，而不是对端到端语音识别系统质量的全面评估。"
      },
      {
       "id": "s-9-1-1-7",
       "original": "In this context, compact on-device ASR is best viewed as a strong option for privacy-preserving, offline, and latency-sensitive scenarios.",
       "zh": "在这个前提下，紧凑的端侧 ASR 最适合被看作是隐私保护、离线和延迟敏感场景下的一个强选项。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-9-2",
   "num": "9.2",
   "level": 2,
   "page": 13,
   "title": {
    "original": "Concurrent Work",
    "zh": "同期工作"
   },
   "blocks": [
    {
     "id": "p-9-2-1",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-9-2-1-1",
       "original": "We note that concurrent to this work, Mistral released Voxtral Mini [14], a multimodal model with strong ASR capabilities including streaming support.",
       "zh": "我们注意到，与本工作同期，Mistral 发布了 Voxtral Mini [14]，这是一个具备强 ASR 能力（包括流式支持）的多模态模型。"
      }
     ]
    },
    {
     "id": "p-9-2-2",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-9-2-2-1",
       "original": "While promising, its model size (∼4 GB) exceeds the sub-1 GB target for our edge deployment scenario.",
       "zh": "尽管很有潜力，但它的模型体积（~4 GB）超出了我们边缘部署场景的小于 1 GB 目标。"
      },
      {
       "id": "s-9-2-2-2",
       "original": "Similarly, Useful Sensors released Moonshine v2 [15], a lightweight encoder-decoder model with sliding-window attention designed for on-device streaming.",
       "zh": "类似地，Useful Sensors 发布了 Moonshine v2 [15]，这是一个面向端侧流式、使用滑动窗口注意力的轻量编码器-解码器模型。"
      },
      {
       "id": "s-9-2-2-3",
       "original": "Although its model variants fit comfortably within our size constraints, its autoregressive design introduces a different latency profile from the transducerbased system studied here, with output latency that can grow with transcript length even when time-to-first-token is low.",
       "zh": "虽然它的模型变体轻松满足我们的体积约束，但其自回归设计带来了与本文研究的 Transducer 系统不同的延迟特性：即使首 token 时间很低，输出延迟仍可能随转录长度增长。"
      },
      {
       "id": "s-9-2-2-4",
       "original": "In addition, as with other sequence-to-sequence ASR models, it may be more susceptible to repetitions or hallucination-like behaviors in challenging conditions.",
       "zh": "此外，与其他序列到序列 ASR 模型一样，它在困难条件下可能更容易出现重复或类幻觉行为。"
      },
      {
       "id": "s-9-2-2-5",
       "original": "A comprehensive empirical comparison with these models is left for future work.",
       "zh": "与这些模型的全面实证对比留待未来工作。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-9-3",
   "num": "9.3",
   "level": 2,
   "page": 14,
   "title": {
    "original": "Future Work",
    "zh": "未来工作"
   },
   "blocks": [
    {
     "id": "p-9-3-1",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-9-3-1-1",
       "original": "The current release focuses on English-only streaming ASR.",
       "zh": "当前发布的版本只聚焦英文流式 ASR。"
      },
      {
       "id": "s-9-3-1-2",
       "original": "We plan to extend this work along two key axes:",
       "zh": "我们计划沿两个关键方向扩展这项工作："
      }
     ]
    },
    {
     "id": "p-9-3-2",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-9-3-2-1",
       "original": "• Multilingual support.",
       "zh": "• 多语言支持。"
      },
      {
       "id": "s-9-3-2-2",
       "original": "Expanding beyond English to additional languages, leveraging multilingual base models and language-specific quantization calibration to maintain quality across diverse languages while preserving the compact edge deployment profile.",
       "zh": "在英文之外扩展更多语种，利用多语言基座模型和针对具体语种的量化校准，在保持紧凑边缘部署形态的同时维持各语种的质量。"
      }
     ]
    },
    {
     "id": "p-9-3-3",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-9-3-3-1",
       "original": "• Broader model support.",
       "zh": "• 更广泛的模型支持。"
      },
      {
       "id": "s-9-3-3-2",
       "original": "Integrating additional ASR architectures, enabling users to select models based on their specific accuracy, latency, and resource requirements.",
       "zh": "集成更多 ASR 架构，让用户能按自己的准确率、延迟和资源要求选择模型。"
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
       "original": "[1] A."
      },
      {
       "id": "s-references-1-2",
       "original": "Radford, J."
      },
      {
       "id": "s-references-1-3",
       "original": "W."
      },
      {
       "id": "s-references-1-4",
       "original": "Kim, T."
      },
      {
       "id": "s-references-1-5",
       "original": "Xu, G."
      },
      {
       "id": "s-references-1-6",
       "original": "Brockman, C."
      },
      {
       "id": "s-references-1-7",
       "original": "McLeavey, and I."
      },
      {
       "id": "s-references-1-8",
       "original": "Sutskever, “Robust speech recognition via large-scale weak supervision,” in Proc."
      },
      {
       "id": "s-references-1-9",
       "original": "ICML, https://arxiv.org/ abs/2212.04356, 2023.",
       "zh": "2."
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
       "original": "[2] NVIDIA NeMo, “NVIDIA NeMo: a toolkit for building new AI models,” https://github."
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
       "original": "com/NVIDIA/NeMo, 2024.",
       "zh": "4."
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
       "original": "[3] Qwen Team, “Qwen3-ASR Technical Report,” https://arxiv.org/abs/2601.21337, 2026.",
       "zh": "1."
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
       "original": "[4] Microsoft, “Olive: a hardware-aware model optimization tool for ONNX models,” https: //github.com/microsoft/Olive, 2024.",
       "zh": "4."
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
       "original": "[5] SYSTRAN, “Faster-Whisper: faster inference for OpenAI’s Whisper using CTranslate2,” https://github.com/SYSTRAN/faster-whisper, 2024.",
       "zh": "4."
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
       "original": "[6] NVIDIA, “Parakeet TDT-0.6B-v3,” https://huggingface.co/nvidia/parakeet-tdt-0."
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
       "original": "6b-v3, 2025."
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
       "original": "[7] NVIDIA, “Conformer Transducer XL,” https://huggingface.co/nvidia/stt_en_ conformer_transducer_xlarge, 2022.",
       "zh": "2."
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
       "original": "[8] NVIDIA, “Nemotron Speech Streaming,” https://huggingface.co/nvidia/ nemotron-speech-streaming-en-0.6b, 2025."
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
       "original": "[9] Hugging Face, “Open ASR Leaderboard”, https://huggingface.co/spaces/hf-audio/ open_asr_leaderboard, 2024.",
       "zh": "4."
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
       "original": "[10] ONNX Runtime Contributors, “ONNX Runtime: cross-platform, high performance ML inferencing and training accelerator,” https://onnxruntime.ai/, 2024.",
       "zh": "4."
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
       "original": "[11] J."
      },
      {
       "id": "s-references-13-2",
       "original": "Lin, J."
      },
      {
       "id": "s-references-13-3",
       "original": "Tang, H."
      },
      {
       "id": "s-references-13-4",
       "original": "Tang, S."
      },
      {
       "id": "s-references-13-5",
       "original": "Yang, X."
      },
      {
       "id": "s-references-13-6",
       "original": "Dang, and S."
      },
      {
       "id": "s-references-13-7",
       "original": "Han, “AWQ: Activation-aware Weight Quantization for LLM Compression and Acceleration,” https://arxiv.org/abs/",
       "zh": "3."
      }
     ]
    },
    {
     "id": "eq-references-1",
     "type": "equation",
     "page": 15,
     "original": "2306.00978, 2023."
    },
    {
     "id": "p-references-14",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-14-1",
       "original": "[12] E."
      },
      {
       "id": "s-references-14-2",
       "original": "Frantar, S."
      },
      {
       "id": "s-references-14-3",
       "original": "Ashkboos, T."
      },
      {
       "id": "s-references-14-4",
       "original": "Hoefler, and D."
      },
      {
       "id": "s-references-14-5",
       "original": "Alistarh, “GPTQ: Accurate Post-Training Quantization for Generative Pre-trained Transformers,” https://arxiv.org/abs/2210."
      }
     ]
    },
    {
     "id": "eq-references-2",
     "type": "equation",
     "page": 15,
     "original": "17323, 2022."
    },
    {
     "id": "p-references-15",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-15-1",
       "original": "[13] J."
      },
      {
       "id": "s-references-15-2",
       "original": "Yu, Y."
      },
      {
       "id": "s-references-15-3",
       "original": "Park, and S."
      },
      {
       "id": "s-references-15-4",
       "original": "Watanabe, “2-bit Conformer Quantization for Automatic Speech Recognition,” https://arxiv.org/abs/2305.16619, 2023.",
       "zh": "3."
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
       "original": "[14] Mistral AI Team, “Voxtral,” https://arxiv.org/abs/2507.13264, 2025."
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
       "original": "[15] M."
      },
      {
       "id": "s-references-17-2",
       "original": "Kudlur, E."
      },
      {
       "id": "s-references-17-3",
       "original": "King, J."
      },
      {
       "id": "s-references-17-4",
       "original": "Wang, and P."
      },
      {
       "id": "s-references-17-5",
       "original": "Warden, “Moonshine v2: Ergodic Streaming Encoder ASR for Latency-Critical Speech Applications,” https://arxiv.org/abs/2602.",
       "zh": "2."
      }
     ]
    },
    {
     "id": "eq-references-3",
     "type": "equation",
     "page": 15,
     "original": "12241, 2026."
    }
   ]
  },
  {
   "id": "sec-A",
   "num": "A",
   "level": 1,
   "page": 16,
   "title": {
    "original": "Complete Evaluation Results",
    "zh": "附录 A：完整评测结果"
   },
   "blocks": [
    {
     "id": "p-A-1",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-A-1-1",
       "original": "This appendix reports all configurations evaluated during this study, including incomplete runs and configurations not featured in the main text.",
       "zh": "本附录报告本研究期间评测过的所有配置，包括未跑完的运行和正文未收录的配置。"
      },
      {
       "id": "s-A-1-2",
       "original": "All WER values are in percent (%).",
       "zh": "所有 WER 数值均以百分数（%）表示。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-A-1",
   "num": "A.1",
   "level": 2,
   "page": 16,
   "title": {
    "original": "Whisper — All Configurations",
    "zh": "Whisper — All Configurations"
   },
   "blocks": [
    {
     "id": "tab-A-1-1",
     "type": "table_caption",
     "page": 16,
     "original": "Table 7: All Whisper configurations evaluated.",
     "zh": "表 7：评测过的全部 Whisper 配置。"
    },
    {
     "id": "p-A-1-1",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-A-1-1-1",
       "original": "Model Format Mode Size Avg AMI Earn.",
       "zh": "表头：Model｜Format｜Mode（模式）｜Size｜Avg｜AMI｜Earn.。"
      }
     ]
    },
    {
     "id": "p-A-1-2",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-A-1-2-1",
       "original": "Giga LS-c LS-o SPGI TED VoxP. whisper-large-v3-turbo PyTorch Batch 1.62 GB",
       "zh": "1.\n（原始数据照录）\nGiga LS-c LS-o SPGI TED VoxP. whisper-large-v3-turbo PyTorch Batch 1.62 GB"
      }
     ]
    },
    {
     "id": "eq-A-1-1",
     "type": "equation",
     "page": 16,
     "original": "7.83 16.13 11.63 10.14 2.10 4.24 2.97 3.57 11.87"
    },
    {
     "id": "eq-A-1-2",
     "type": "equation",
     "page": 16,
     "original": "whisper-large-v3-turbo ORT FP16 Batch 1.75 GB"
    },
    {
     "id": "eq-A-1-3",
     "type": "equation",
     "page": 16,
     "original": "7.52 16.36 11.38 10.13 2.17 4.24 2.93 3.62 9.30"
    },
    {
     "id": "eq-A-1-4",
     "type": "equation",
     "page": 16,
     "original": "whisper-small.en PyTorch Batch 0.97 GB"
    },
    {
     "id": "eq-A-1-5",
     "type": "equation",
     "page": 16,
     "original": "(8.59) 17.93 12.97 11.35 3.05 7.25 3.60 4.07 8.50"
    },
    {
     "id": "eq-A-1-6",
     "type": "equation",
     "page": 16,
     "original": "faster-whisper (small) PyTorch Chunk (3 s) 0.97 GB"
    },
    {
     "id": "eq-A-1-7",
     "type": "equation",
     "page": 16,
     "original": "24.74 32.90 32.59 – 17.23 22.72 19.81 – 23.18"
    }
   ]
  },
  {
   "id": "sec-A-2",
   "num": "A.2",
   "level": 2,
   "page": 16,
   "title": {
    "original": "Nemotron-0.6B — All Streaming Configurations",
    "zh": "Nemotron-0.6B — All Streaming Configurations"
   },
   "blocks": [
    {
     "id": "tab-A-2-1",
     "type": "table_caption",
     "page": 16,
     "original": "Table 8: All Nemotron-0.6B streaming configurations (PyTorch, CUDA, batch_size=16).",
     "zh": "表 8：全部 Nemotron-0.6B 流式配置（PyTorch，CUDA，batch_size=16）。"
    },
    {
     "id": "p-A-2-1",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-A-2-1-1",
       "original": "Config Delay History Avg RTFx AMI Earn.",
       "zh": "表头：Config｜Delay｜History｜Avg｜RTFx｜AMI｜Earn.。"
      }
     ]
    },
    {
     "id": "p-A-2-2",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-A-2-2-1",
       "original": "Giga LS-c LS-o SPGI TED VoxP.",
       "zh": "表头续：Giga｜LS-c｜LS-o｜SPGI｜TED｜VoxP.。"
      }
     ]
    },
    {
     "id": "p-A-2-3",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-A-2-3-1",
       "original": "Batch (offline)",
       "zh": "（表头行）Batch (offline)（离线批处理）。"
      }
     ]
    },
    {
     "id": "eq-A-2-1",
     "type": "equation",
     "page": 16,
     "original": "– – 7.07 990.48 11.16 12.38 11.35 2.28 4.83 2.63 4.42 7.48 (70, 2, 70)"
    },
    {
     "id": "eq-A-2-2",
     "type": "equation",
     "page": 16,
     "original": "5.6 s 11.2 s"
    },
    {
     "id": "eq-A-2-3",
     "type": "equation",
     "page": 16,
     "original": "7.10 268.39 11.31 12.46 11.39 2.28 4.84 2.64 4.42 7.47 (14, 2, 14)"
    },
    {
     "id": "eq-A-2-4",
     "type": "equation",
     "page": 16,
     "original": "1.12 s 2.24 s"
    },
    {
     "id": "eq-A-2-5",
     "type": "equation",
     "page": 16,
     "original": "7.46 260.05 11.38 12.49 11.39 2.41 5.07 2.71 4.50 9.75 (7, 10, 7)"
    },
    {
     "id": "eq-A-2-6",
     "type": "equation",
     "page": 16,
     "original": "0.56 s 5.6 s"
    },
    {
     "id": "eq-A-2-7",
     "type": "equation",
     "page": 16,
     "original": "7.28 145.16 11.80 12.64 11.50 2.33 5.08 2.72 4.46 7.69 (7, 2, 7)"
    },
    {
     "id": "eq-A-2-8",
     "type": "equation",
     "page": 16,
     "original": "0.56 s 1.12 s"
    },
    {
     "id": "eq-A-2-9",
     "type": "equation",
     "page": 16,
     "original": "8.51 144.71 11.93 13.93 11.76 3.43 6.00 3.47 5.11 12.49 (2, 35, 2)"
    },
    {
     "id": "eq-A-2-10",
     "type": "equation",
     "page": 16,
     "original": "0.16 s 5.6 s"
    },
    {
     "id": "eq-A-2-11",
     "type": "equation",
     "page": 16,
     "original": "8.04 45.05 14.82 13.66 12.44 2.49 5.52 2.90 4.72 7.79 (2, 2, 2)"
    },
    {
     "id": "eq-A-2-12",
     "type": "equation",
     "page": 16,
     "original": "0.16 s 0.32 s"
    },
    {
     "id": "eq-A-2-13",
     "type": "equation",
     "page": 16,
     "original": "– – 19.75 26.36 19.46 11.86 17.88 – 13.32 32.42 (1, 70, 1)"
    },
    {
     "id": "eq-A-2-14",
     "type": "equation",
     "page": 16,
     "original": "0.08 s 5.6 s"
    },
    {
     "id": "eq-A-2-15",
     "type": "equation",
     "page": 16,
     "original": "8.91 – 17.76 14.64 13.33 2.61 5.93 3.73 5.06 8.24"
    }
   ]
  },
  {
   "id": "sec-A-3",
   "num": "A.3",
   "level": 2,
   "page": 16,
   "title": {
    "original": "Parakeet TDT-0.6B-v3 — All Chunking Configurations",
    "zh": "Parakeet TDT-0.6B-v3 — All Chunking Configurations"
   },
   "blocks": [
    {
     "id": "tab-A-3-1",
     "type": "table_caption",
     "page": 16,
     "original": "Table 9: All Parakeet TDT-0.6B-v3 configurations. Batch and chunked modes (CUDA, batch_size=16). Config format: delay (left-current-right = total context).",
     "zh": "表 9：全部 Parakeet TDT-0.6B-v3 配置。批处理与分块模式（CUDA，batch_size=16）。配置格式：延迟（左-当前-右 = 总上下文）。"
    },
    {
     "id": "p-A-3-1",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-A-3-1-1",
       "original": "Config Precision Avg RTFx AMI Earn.",
       "zh": "表头：Config｜Precision（精度）｜Avg｜RTFx｜AMI｜Earn.。"
      }
     ]
    },
    {
     "id": "p-A-3-2",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-A-3-2-1",
       "original": "Giga LS-c LS-o SPGI TED VoxP.",
       "zh": "表头续：Giga｜LS-c｜LS-o｜SPGI｜TED｜VoxP.。"
      }
     ]
    },
    {
     "id": "p-A-3-3",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-A-3-3-1",
       "original": "Batch",
       "zh": "（表 1 模型清单：Architecture × Modes × Size——Whisper Large-v3-Turbo（编码器-解码器，Batch，1.62 GB）；Whisper Small（编码器-解码器，Chunk/Batch，0.97 GB）；Nemotron-0.6B（Cache-aware Transducer，Stream/Batch，2.47 GB）；Parakeet TDT-0.6B-v3（TDT Transducer，Chunk/Batch，2.51 GB）；Canary-1B-v2（AED + AlignAtt，Chunk/Batch，6.36 GB）；Conformer Trans.（后续照原文）。）"
      }
     ]
    },
    {
     "id": "eq-A-3-1",
     "type": "equation",
     "page": 16,
     "original": "– (6.32) (3332.74) (11.39) (11.19) (9.57) (1.92) (3.59) (3.98) (2.80) (6.09)"
    },
    {
     "id": "eq-A-3-2",
     "type": "equation",
     "page": 16,
     "original": "28.8 s (7.2-21.6-7.2=36) bf16"
    },
    {
     "id": "eq-A-3-3",
     "type": "equation",
     "page": 16,
     "original": "16.94 211.45 41.64 32.38 20.56 3.69 6.10 8.63 10.73 11.75"
    },
    {
     "id": "eq-A-3-4",
     "type": "equation",
     "page": 16,
     "original": "13.2 s (8.4-11.6-1.6=21.6) bf16"
    },
    {
     "id": "eq-A-3-5",
     "type": "equation",
     "page": 16,
     "original": "9.24 272.39 15.96 17.37 12.10 2.52 4.34 7.40 5.65 8.59"
    },
    {
     "id": "eq-A-3-6",
     "type": "equation",
     "page": 16,
     "original": "11.6 s (8.4-10.4-1.2=20) bf16"
    },
    {
     "id": "eq-A-3-7",
     "type": "equation",
     "page": 16,
     "original": "12.13 358.98 22.25 22.61 18.23 3.76 4.82 8.41 8.36 8.62"
    },
    {
     "id": "eq-A-3-8",
     "type": "equation",
     "page": 16,
     "original": "10.8 s (8.4-10-0.8=19.2) bf16"
    },
    {
     "id": "eq-A-3-9",
     "type": "equation",
     "page": 16,
     "original": "16.10 307.51 37.21 30.55 21.74 4.17 5.32 9.14 10.40 10.32"
    },
    {
     "id": "eq-A-3-10",
     "type": "equation",
     "page": 16,
     "original": "12.8 s (3.2-9.6-3.2=16) bf16"
    },
    {
     "id": "eq-A-3-11",
     "type": "equation",
     "page": 16,
     "original": "9.66 257.87 15.56 17.80 12.39 3.69 5.17 7.86 6.16 8.66"
    },
    {
     "id": "eq-A-3-12",
     "type": "equation",
     "page": 16,
     "original": "10.4 s (5.6-8.8-1.6=16) bf16"
    },
    {
     "id": "eq-A-3-13",
     "type": "equation",
     "page": 16,
     "original": "9.22 250.41 15.35 17.12 12.02 3.44 5.27 7.23 5.32 8.01"
    },
    {
     "id": "eq-A-3-14",
     "type": "equation",
     "page": 16,
     "original": "9.6 s (5.6-8-1.6=15.2) bf16"
    },
    {
     "id": "eq-A-3-15",
     "type": "equation",
     "page": 16,
     "original": "9.33 361.64 15.26 17.36 12.15 3.59 5.12 7.41 5.65 8.10"
    },
    {
     "id": "eq-A-3-16",
     "type": "equation",
     "page": 16,
     "original": "9.6 s (5.6-8-1.6=15.2) fp16"
    },
    {
     "id": "eq-A-3-17",
     "type": "equation",
     "page": 16,
     "original": "9.59 219.76 15.27 19.44 12.16 3.47 5.26 7.41 5.61 8.07"
    },
    {
     "id": "eq-A-3-18",
     "type": "equation",
     "page": 16,
     "original": "9.2 s (5.6-7.6-1.6=14.8) bf16"
    },
    {
     "id": "eq-A-3-19",
     "type": "equation",
     "page": 16,
     "original": "11.61 402.68 21.72 21.74 17.68 3.35 4.88 7.97 7.36 8.14"
    },
    {
     "id": "eq-A-3-20",
     "type": "equation",
     "page": 16,
     "original": "8.8 s (5.6-8-0.8=14.4) bf16"
    },
    {
     "id": "eq-A-3-21",
     "type": "equation",
     "page": 16,
     "original": "15.83 257.07 35.91 29.09 20.56 6.06 6.84 8.63 9.56 9.95"
    },
    {
     "id": "eq-A-3-22",
     "type": "equation",
     "page": 16,
     "original": "8.8 s (5.6-7.6-1.2=14.4) bf16"
    },
    {
     "id": "eq-A-3-23",
     "type": "equation",
     "page": 16,
     "original": "15.99 204.10 36.08 29.15 21.49 5.07 6.94 8.66 10.56 9.98"
    },
    {
     "id": "eq-A-3-24",
     "type": "equation",
     "page": 16,
     "original": "8 s (5.6-7.2-0.8=13.6) bf16"
    },
    {
     "id": "eq-A-3-25",
     "type": "equation",
     "page": 16,
     "original": "15.97 404.98 35.48 29.27 21.84 5.69 6.39 8.89 10.15 10.04"
    },
    {
     "id": "eq-A-3-26",
     "type": "equation",
     "page": 16,
     "original": "9.6 s (2.4-7.2-2.4=12) fp16"
    },
    {
     "id": "eq-A-3-27",
     "type": "equation",
     "page": 16,
     "original": "12.55 323.81 21.65 21.53 18.32 6.43 7.37 8.46 7.95 8.71"
    },
    {
     "id": "eq-A-3-28",
     "type": "equation",
     "page": 16,
     "original": "9.6 s (2.4-7.2-2.4=12) bf16"
    },
    {
     "id": "eq-A-3-29",
     "type": "equation",
     "page": 16,
     "original": "16.46 361.34 35.60 29.04 21.92 7.45 8.09 8.92 10.45 10.22"
    },
    {
     "id": "eq-A-3-30",
     "type": "equation",
     "page": 16,
     "original": "2.4 s (9.6-0.8-1.6=12) bf16"
    },
    {
     "id": "eq-A-3-31",
     "type": "equation",
     "page": 16,
     "original": "12.83 83.68 16.73 19.81 15.27 6.63 8.25 17.82 9.95 8.19"
    },
    {
     "id": "eq-A-3-32",
     "type": "equation",
     "page": 16,
     "original": "6.4 s (1.6-4.8-1.6=8) fp16"
    },
    {
     "id": "eq-A-3-33",
     "type": "equation",
     "page": 16,
     "original": "11.54 228.68 15.51 18.91 13.45 9.27 9.73 9.39 7.20 8.82"
    },
    {
     "id": "eq-A-3-34",
     "type": "equation",
     "page": 16,
     "original": "6.4 s (1.6-4.8-1.6=8) bf16"
    },
    {
     "id": "eq-A-3-35",
     "type": "equation",
     "page": 16,
     "original": "11.52 – 15.52 18.91 13.44 9.34 9.57 9.33 7.26 8.79"
    },
    {
     "id": "eq-A-3-36",
     "type": "equation",
     "page": 16,
     "original": "3.2 s (0.8-2.4-0.8=4) bf16"
    },
    {
     "id": "eq-A-3-37",
     "type": "equation",
     "page": 16,
     "original": "32.17 209.69 43.08 38.13 35.66 35.62 30.13 31.28 30.93 12.55"
    }
   ]
  },
  {
   "id": "sec-A-4",
   "num": "A.4",
   "level": 2,
   "page": 17,
   "title": {
    "original": "Parakeet TDT-0.6B-v3 — ONNX Quantization",
    "zh": "Parakeet TDT-0.6B-v3 — ONNX Quantization"
   },
   "blocks": [
    {
     "id": "tab-A-4-1",
     "type": "table_caption",
     "page": 17,
     "original": "Table 10: Parakeet TDT-0.6B-v3 ONNX quantization variants (batch mode, CUDA, batch_size=16).",
     "zh": "表 10：Parakeet TDT-0.6B-v3 ONNX 量化变体（批处理模式，CUDA，batch_size=16）。"
    }
   ]
  },
  {
   "id": "sec-format",
   "num": null,
   "level": 2,
   "page": 17,
   "title": {
    "original": "Format",
    "zh": "Format"
   },
   "blocks": [
    {
     "id": "p-format-1",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-format-1-1",
       "original": "Size Avg RTFx AMI Earn.",
       "zh": "表头：Size｜Avg｜RTFx｜AMI｜Earn.。"
      }
     ]
    },
    {
     "id": "p-format-2",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-format-2-1",
       "original": "Giga LS-c LS-o SPGI TED VoxP.",
       "zh": "表头续：Giga｜LS-c｜LS-o｜SPGI｜TED｜VoxP.。"
      }
     ]
    },
    {
     "id": "p-format-3",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-format-3-1",
       "original": "ONNX fp16 1.30 GB",
       "zh": "1.\n（原始数据照录）\nONNX fp16 1.30 GB"
      }
     ]
    },
    {
     "id": "eq-format-1",
     "type": "equation",
     "page": 17,
     "original": "– – 21.46 – – 2.21 3.96 – – 6.82"
    },
    {
     "id": "eq-format-2",
     "type": "equation",
     "page": 17,
     "original": "ONNX int8 1.02 GB"
    },
    {
     "id": "eq-format-3",
     "type": "equation",
     "page": 17,
     "original": "9.92 97.10 18.82 21.19 12.92 2.18 4.25 7.17 5.79 7.07"
    },
    {
     "id": "eq-format-4",
     "type": "equation",
     "page": 17,
     "original": "ONNX int4 0.74 GB"
    },
    {
     "id": "eq-format-5",
     "type": "equation",
     "page": 17,
     "original": "11.50 112.94 21.22 26.34 14.39 2.16 4.02 8.97 8.17 6.77"
    }
   ]
  },
  {
   "id": "sec-A-5",
   "num": "A.5",
   "level": 2,
   "page": 17,
   "title": {
    "original": "Canary-1B-v2 — All Configurations",
    "zh": "Canary-1B-v2 — All Configurations"
   },
   "blocks": [
    {
     "id": "tab-A-5-1",
     "type": "table_caption",
     "page": 17,
     "original": "Table 11: Canary-1B-v2 configurations (PyTorch bf16, CUDA, batch_size=16).",
     "zh": "表 11：Canary-1B-v2 配置（PyTorch bf16，CUDA，batch_size=16）。"
    },
    {
     "id": "p-A-5-1",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-A-5-1-1",
       "original": "Model Config Size Avg RTFx AMI Earn.",
       "zh": "表头：Model｜Config｜Size｜Avg｜RTFx｜AMI｜Earn.。"
      }
     ]
    },
    {
     "id": "p-A-5-2",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-A-5-2-1",
       "original": "Giga LS-c LS-o SPGI TED VoxP.",
       "zh": "表头续：Giga｜LS-c｜LS-o｜SPGI｜TED｜VoxP.。"
      }
     ]
    },
    {
     "id": "p-A-5-3",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-A-5-3-1",
       "original": "Canary-1B-v2 Batch 6.36 GB",
       "zh": "（表格行）Canary-1B-v2 / Batch / 6.36 GB。"
      }
     ]
    },
    {
     "id": "eq-A-5-1",
     "type": "equation",
     "page": 17,
     "original": "(7.15) (749) (16.01) (11.79) (10.82) (2.18) (3.56) (2.28) (4.29) (6.25)"
    },
    {
     "id": "eq-A-5-2",
     "type": "equation",
     "page": 17,
     "original": "Canary-1B-v2 Chunk 4.8 s 6.36 GB"
    },
    {
     "id": "eq-A-5-3",
     "type": "equation",
     "page": 17,
     "original": "12.45 – 22.10 22.04 14.60 4.87 5.96 4.42 7.64 17.98"
    },
    {
     "id": "p-A-5-4",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-A-5-4-1",
       "original": "Chunked config: (10.0-2.4-2.4=14.8) with AlignAtt streaming policy.",
       "zh": "2.\n（原始数据照录）\nChunked config: (10.0-2.4-2.4=14.8) with AlignAtt streaming policy."
      }
     ]
    }
   ]
  },
  {
   "id": "sec-A-6",
   "num": "A.6",
   "level": 2,
   "page": 17,
   "title": {
    "original": "Conformer Transducer XL — All Configurations",
    "zh": "Conformer Transducer XL — All Configurations"
   },
   "blocks": [
    {
     "id": "tab-A-6-1",
     "type": "table_caption",
     "page": 17,
     "original": "Table 12: Conformer Transducer XL chunked configurations (PyTorch bf16, CUDA, batch_size=16). Config: delay (left-current-right = total context).",
     "zh": "表 12：Conformer Transducer XL 分块配置（PyTorch bf16，CUDA，batch_size=16）。配置：延迟（左-当前-右 = 总上下文）。"
    }
   ]
  },
  {
   "id": "sec-config",
   "num": null,
   "level": 2,
   "page": 17,
   "title": {
    "original": "Config",
    "zh": "Config"
   },
   "blocks": [
    {
     "id": "p-config-1",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-config-1-1",
       "original": "Avg RTFx AMI Earn.",
       "zh": "表头：Avg｜RTFx｜AMI｜Earn.。"
      }
     ]
    },
    {
     "id": "p-config-2",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-config-2-1",
       "original": "Giga LS-c LS-o SPGI TED VoxP.",
       "zh": "表头续：Giga｜LS-c｜LS-o｜SPGI｜TED｜VoxP.。"
      }
     ]
    },
    {
     "id": "p-config-3",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-config-3-1",
       "original": "6.4 s (1.6-4.8-1.6=8)",
       "zh": "1.\n（原始数据照录）\n6.4 s (1.6-4.8-1.6=8)"
      }
     ]
    },
    {
     "id": "eq-config-1",
     "type": "equation",
     "page": 17,
     "original": "10.78 222.90 22.07 23.47 14.21 2.22 4.10 7.93 5.48 6.80"
    },
    {
     "id": "eq-config-2",
     "type": "equation",
     "page": 17,
     "original": "3.2 s (4.8-1.6-1.6=8)"
    },
    {
     "id": "eq-config-3",
     "type": "equation",
     "page": 17,
     "original": "10.96 133.69 22.31 24.22 13.99 2.04 3.78 7.86 5.40 8.05"
    },
    {
     "id": "eq-config-4",
     "type": "equation",
     "page": 17,
     "original": "2.4 s (5.6-0.8-1.6=8)"
    },
    {
     "id": "eq-config-5",
     "type": "equation",
     "page": 17,
     "original": "11.06 82.03 22.57 24.44 14.05 2.11 3.83 7.95 5.36 8.18"
    },
    {
     "id": "eq-config-6",
     "type": "equation",
     "page": 17,
     "original": "2.4 s (9.6-0.8-1.6=12)"
    },
    {
     "id": "eq-config-7",
     "type": "equation",
     "page": 17,
     "original": "11.02 44.28 22.69 24.47 13.97 1.93 3.46 7.86 5.26 8.49"
    }
   ]
  },
  {
   "id": "sec-A-7",
   "num": "A.7",
   "level": 2,
   "page": 17,
   "title": {
    "original": "Qwen3-ASR — All Configurations",
    "zh": "Qwen3-ASR — All Configurations"
   },
   "blocks": [
    {
     "id": "tab-A-7-1",
     "type": "table_caption",
     "page": 17,
     "original": "Table 13: Qwen3-ASR configurations (PyTorch, CUDA, batch_size=32).",
     "zh": "表 13：Qwen3-ASR 配置（PyTorch，CUDA，batch_size=32）。"
    },
    {
     "id": "p-A-7-1",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-A-7-1-1",
       "original": "Model Config Avg RTFx AMI Earn.",
       "zh": "表头：Model｜Config｜Avg｜RTFx｜AMI｜Earn.。"
      }
     ]
    },
    {
     "id": "p-A-7-2",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-A-7-2-1",
       "original": "Giga LS-c LS-o SPGI TED VoxP.",
       "zh": "表头续：Giga｜LS-c｜LS-o｜SPGI｜TED｜VoxP.。"
      }
     ]
    },
    {
     "id": "p-A-7-3",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-A-7-3-1",
       "original": "Qwen3-ASR-1.7B Batch",
       "zh": "1.\n（原始数据照录）\nQwen3-ASR-1.7B Batch"
      }
     ]
    },
    {
     "id": "eq-A-7-1",
     "type": "equation",
     "page": 17,
     "original": "5.90 187.91 11.76 10.26 8.75 1.60 3.41 2.83 2.28 6.34"
    },
    {
     "id": "eq-A-7-2",
     "type": "equation",
     "page": 17,
     "original": "Qwen3-ASR-0.6B Batch"
    },
    {
     "id": "eq-A-7-3",
     "type": "equation",
     "page": 17,
     "original": "6.69 194.71 13.77 11.03 9.16 2.12 4.47 3.04 2.83 7.09"
    },
    {
     "id": "eq-A-7-4",
     "type": "equation",
     "page": 17,
     "original": "Qwen3-ASR-1.7B Chunk 3 s (1 s stride)"
    },
    {
     "id": "eq-A-7-5",
     "type": "equation",
     "page": 17,
     "original": "9.69 61.70 15.54 14.94 11.28 3.58 5.99 5.26 5.03 9.90"
    },
    {
     "id": "eq-A-7-6",
     "type": "equation",
     "page": 17,
     "original": "Qwen3-ASR-0.6B Chunk 3 s (1 s stride)"
    },
    {
     "id": "eq-A-7-7",
     "type": "equation",
     "page": 17,
     "original": "9.81 64.11 17.47 15.05 11.37 3.94 7.02 5.22 5.02 13.41"
    },
    {
     "id": "eq-A-7-8",
     "type": "equation",
     "page": 17,
     "original": "Qwen3-ASR-1.7B Chunk 2.4 s (1.2 s stride)"
    },
    {
     "id": "eq-A-7-9",
     "type": "equation",
     "page": 17,
     "original": "10.45 42.76 16.97 16.92 12.29 4.95 7.69 6.70 6.34 11.75"
    },
    {
     "id": "eq-A-7-10",
     "type": "equation",
     "page": 17,
     "original": "Qwen3-ASR-0.6B Chunk 2.4 s (1.2 s stride)"
    },
    {
     "id": "eq-A-7-11",
     "type": "equation",
     "page": 17,
     "original": "10.41 46.32 18.55 16.60 12.00 4.97 8.31 6.13 5.75 10.99"
    }
   ]
  },
  {
   "id": "sec-A-8",
   "num": "A.8",
   "level": 2,
   "page": 18,
   "title": {
    "original": "Cross-Model Streaming Comparison (CPU)",
    "zh": "Cross-Model Streaming Comparison (CPU)"
   },
   "blocks": [
    {
     "id": "tab-A-8-1",
     "type": "table_caption",
     "page": 18,
     "original": "Table 14: Cross-model streaming comparison (CPU, batch_size=1). Best streaming or lowlatency configuration per model.",
     "zh": "表 14：跨模型流式对比（CPU，batch_size=1）。取每个模型最好的流式或低延迟配置。"
    },
    {
     "id": "p-A-8-1",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-A-8-1-1",
       "original": "Model Size Delay Avg BSF RTFx AMI Earn.",
       "zh": "表头：Model｜Size｜Delay｜Avg｜BSF｜RTFx｜AMI｜Earn.。"
      }
     ]
    },
    {
     "id": "p-A-8-2",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-A-8-2-1",
       "original": "Giga LS-c LS-o SPGI TED VoxP.",
       "zh": "表头续：Giga｜LS-c｜LS-o｜SPGI｜TED｜VoxP.。"
      }
     ]
    },
    {
     "id": "p-A-8-3",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-A-8-3-1",
       "original": "Nemotron-0.6B 2.47 GB 0.56 s",
       "zh": "2.\n（原始数据照录）\nNemotron-0.6B 2.47 GB 0.56 s"
      }
     ]
    },
    {
     "id": "eq-A-8-1",
     "type": "equation",
     "page": 18,
     "original": "7.28 1.03 2.46 11.80 12.64 11.50 2.33 5.08 2.72 4.46 7.69"
    },
    {
     "id": "eq-A-8-2",
     "type": "equation",
     "page": 18,
     "original": "Qwen3-ASR-1.7B 4.70 GB 2.4 s"
    },
    {
     "id": "eq-A-8-3",
     "type": "equation",
     "page": 18,
     "original": "10.45 1.77 0.49 16.97 16.92 12.29 4.95 7.69 6.70 6.34 11.75"
    },
    {
     "id": "eq-A-8-4",
     "type": "equation",
     "page": 18,
     "original": "Parakeet TDT-0.6B-v3 2.51 GB 2.4 s"
    },
    {
     "id": "eq-A-8-5",
     "type": "equation",
     "page": 18,
     "original": "12.83 2.03 1.38 16.73 19.81 15.27 6.63 8.25 17.82 9.95 8.19"
    },
    {
     "id": "eq-A-8-6",
     "type": "equation",
     "page": 18,
     "original": "Conformer Trans. XL 2.58 GB 2.4 s"
    },
    {
     "id": "eq-A-8-7",
     "type": "equation",
     "page": 18,
     "original": "11.06 – 1.27 22.57 24.44 14.05 2.11 3.83 7.95 5.36 8.18"
    },
    {
     "id": "eq-A-8-8",
     "type": "equation",
     "page": 18,
     "original": "Canary-1B-v2 6.36 GB 4.8 s"
    },
    {
     "id": "eq-A-8-9",
     "type": "equation",
     "page": 18,
     "original": "12.45 1.74 2.93 22.10 22.04 14.60 4.87 5.96 4.42 7.64 17.98"
    }
   ]
  },
  {
   "id": "sec-A-9",
   "num": "A.9",
   "level": 2,
   "page": 18,
   "title": {
    "original": "Nemotron-0.6B — ONNX Quantization Results",
    "zh": "Nemotron-0.6B — ONNX Quantization Results"
   },
   "blocks": [
    {
     "id": "tab-A-9-1",
     "type": "table_caption",
     "page": 18,
     "original": "Table 15: Nemotron-0.6B ONNX quantization results. Config: (7,10,7), 0.56 s delay, 5.6 s history. CPU inference, batch_size=1.",
     "zh": "表 15：Nemotron-0.6B ONNX 量化结果。配置：(7,10,7)，0.56 s 延迟，5.6 s 历史。CPU 推理，batch_size=1。"
    },
    {
     "id": "p-A-9-1",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-A-9-1-1",
       "original": "Variant Format Size Device Avg RTFx AMI Earn.",
       "zh": "表头：Variant｜Format｜Size｜Device｜Avg｜RTFx｜AMI｜Earn.。"
      }
     ]
    },
    {
     "id": "p-A-9-2",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-A-9-2-1",
       "original": "Giga LS-c LS-o SPGI TED VoxP.",
       "zh": "表头续：Giga｜LS-c｜LS-o｜SPGI｜TED｜VoxP.。"
      }
     ]
    },
    {
     "id": "p-A-9-3",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-A-9-3-1",
       "original": "Baseline (PyTorch) PyTorch 2.47 GB CUDA",
       "zh": "2.\n（原始数据照录）\nBaseline (PyTorch) PyTorch 2.47 GB CUDA"
      }
     ]
    },
    {
     "id": "eq-A-9-1",
     "type": "equation",
     "page": 18,
     "original": "7.28 – 11.80 12.64 11.50 2.33 5.08 2.72 4.46 7.69"
    },
    {
     "id": "eq-A-9-2",
     "type": "equation",
     "page": 18,
     "original": "FP32 ONNX 2.47 GB CPU"
    },
    {
     "id": "eq-A-9-3",
     "type": "equation",
     "page": 18,
     "original": "8.03 6.73 16.40 13.32 12.00 2.35 5.01 2.61 4.66 7.90"
    },
    {
     "id": "eq-A-9-4",
     "type": "equation",
     "page": 18,
     "original": "int8 k-quant ONNX 1.28 GB CPU"
    },
    {
     "id": "eq-A-9-5",
     "type": "equation",
     "page": 18,
     "original": "8.01 7.25 16.37 13.35 11.97 2.36 4.97 2.52 4.62 7.92"
    },
    {
     "id": "eq-A-9-6",
     "type": "equation",
     "page": 18,
     "original": "int4-mixed k-quant ONNX 0.73 GB CPU"
    },
    {
     "id": "eq-A-9-7",
     "type": "equation",
     "page": 18,
     "original": "8.12 7.15 16.72 13.52 12.08 2.36 5.02 2.64 4.70 7.88"
    },
    {
     "id": "eq-A-9-8",
     "type": "equation",
     "page": 18,
     "original": "int4 k-quant ONNX 0.67 GB CPU"
    },
    {
     "id": "eq-A-9-9",
     "type": "equation",
     "page": 18,
     "original": "8.20 7.20 17.05 13.60 12.10 2.38 5.04 2.83 4.65 7.98"
    },
    {
     "id": "eq-A-9-10",
     "type": "equation",
     "page": 18,
     "original": "int4 k-quant + ConvInt ONNX 0.67 GB CPU"
    },
    {
     "id": "eq-A-9-11",
     "type": "equation",
     "page": 18,
     "original": "10.14 8.00 20.55 11.68 14.73 5.32 10.14 3.05 5.64 9.98"
    },
    {
     "id": "eq-A-9-12",
     "type": "equation",
     "page": 18,
     "original": "int4 RTN ONNX 0.66 GB CPU"
    },
    {
     "id": "eq-A-9-13",
     "type": "equation",
     "page": 18,
     "original": "8.46 7.30 18.94 13.52 12.12 2.42 5.10 2.85 4.72 8.05"
    }
   ]
  },
  {
   "id": "sec-A-10",
   "num": "A.10",
   "level": 2,
   "page": 18,
   "title": {
    "original": "Nemotron-0.6B — ONNX int4 k-quant at 0.16s Delay",
    "zh": "Nemotron-0.6B — ONNX int4 k-quant at 0.16s Delay"
   },
   "blocks": [
    {
     "id": "tab-A-10-1",
     "type": "table_caption",
     "page": 18,
     "original": "Table 16: Nemotron-0.6B int4 k-quant at 0.16 s algorithmic delay. Config: (2,20,2), 3.2 s history. CPU inference, batch_size=1.",
     "zh": "表 16：Nemotron-0.6B int4 k-quant 在 0.16 s 算法延迟下的结果。配置：(2,20,2)，3.2 s 历史。CPU 推理，batch_size=1。"
    },
    {
     "id": "p-A-10-1",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-A-10-1-1",
       "original": "Variant Format Size Device Avg RTFx AMI Earn.",
       "zh": "表头：Variant｜Format｜Size｜Device｜Avg｜RTFx｜AMI｜Earn.。"
      }
     ]
    },
    {
     "id": "p-A-10-2",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-A-10-2-1",
       "original": "Giga LS-c LS-o SPGI TED VoxP. int4 k-quant ONNX 0.67 GB CPU",
       "zh": "表头续：Giga｜LS-c｜LS-o｜SPGI｜TED｜VoxP.。\n（原始数据照录）\nGiga LS-c LS-o SPGI TED VoxP. int4 k-quant ONNX 0.67 GB CPU"
      }
     ]
    },
    {
     "id": "eq-A-10-1",
     "type": "equation",
     "page": 18,
     "original": "8.89 2.87 19.92 14.02 11.08 2.99 6.59 3.76 3.94 8.84"
    },
    {
     "id": "p-A-10-3",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-A-10-3-1",
       "original": "Earn. = Earnings22, Giga = GigaSpeech, LS-c/o = LibriSpeech Clean/Other, SPGI = SPGISpeech, TED = TED-LIUM, VoxP. = VoxPopuli.",
       "zh": "（表格行+表注）Giga｜LS-c｜LS-o｜SPGI｜TED｜VoxP.；int4 k-quant ONNX 0.67 GB CPU：8.89/2.87/19.92/14.02/11.08/2.99/6.59/3.76/3.94/8.84。表注：Earn. = Earnings22，Giga = GigaSpeech，LS-c/o = LibriSpeech Clean/Other，SPGI = SPGISpeech，TED = TED-LIUM，VoxP. = VoxPopuli。"
      }
     ]
    },
    {
     "id": "p-A-10-4",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-A-10-4-1",
       "original": "Parenthesized values are reported by original authors.",
       "zh": "括号内的数值为原作者报告的数字。"
      },
      {
       "id": "s-A-10-4-2",
       "original": "A dash (–) indicates the configuration was not evaluated or results were incomplete.",
       "zh": "破折号（–）表示该配置未被评测或结果不完整。"
      }
     ]
    },
    {
     "id": "p-A-10-5",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-A-10-5-1",
       "original": "CoreAI, Microsoft Corporation.",
       "zh": "CoreAI，微软公司。"
      }
     ]
    },
    {
     "id": "p-A-10-6",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-A-10-6-1",
       "original": "April 2026.",
       "zh": "2026 年 4 月。"
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
    "sentence_id": "s-1-2-2",
    "quote": "are all primarily batch-oriented architectures requiring 2–7 GB of memory and GPU inference"
   },
   "kind": "motivation",
   "title": "为什么批处理 SOTA 上不了端",
   "explanation": "这句话点出整篇报告的张力：当前 WER 最强的三个模型都是批处理架构，要 2–7 GB 内存加 GPU。批处理模型能看完整段音频、用双向注意力，天然占便宜；但端侧场景要的是边听边出字、纯 CPU、1 GB 以内。所以本报告的问题不是「谁的 WER 最低」，而是「在四条硬约束下谁还能用」。读后面所有数字时都要带着这个前提。",
   "explanation_plain": "最强的识别模型都得在 GPU 上整段处理音频，手机和消费设备跑不动，本文就是要在这种限制下找出能用的最好方案。",
   "featured": true
  },
  {
   "id": "ann-002",
   "anchor": {
    "sentence_id": "s-2-4-1-2",
    "quote": "the encoder uses a chunked attention mechanism that caches prior context across chunks"
   },
   "kind": "concept",
   "title": "cache-aware 是什么",
   "explanation": "所谓 cache-aware streaming，核心是编码器在处理每个音频块时，会把之前块的注意力上下文以张量形式缓存下来、供后续块复用，而不是每块都从零算起。这带来两个实际好处：一是精度接近全上下文批处理，二是延迟-精度权衡可以在推理时调参实现、无需重训。这也是后文三图分解要显式管理这些缓存的原因。",
   "featured": true
  },
  {
   "id": "ann-003",
   "anchor": {
    "sentence_id": "s-3-2-7-1",
    "quote": "BSF = Streaming WER Batch WER A BSF of 1.0 indicates no accuracy loss from streaming"
   },
   "kind": "concept",
   "title": "BSF：一个诚实的指标",
   "explanation": "BSF（批-流退化因子）= 流式 WER / 批处理 WER，是本文自己定义的小工具，但很实用：它把「模型本身强」和「流式化后损失多少」解耦开。一个批处理 WER 很低但 BSF 很大的模型（如 Qwen3-ASR-1.7B，1.77），说明它只是被硬塞进流式流程，并非原生流式设计。做端侧选型时，BSF 比绝对 WER 更能暴露架构的流式适配度。",
   "featured": false
  },
  {
   "id": "ann-004",
   "anchor": {
    "sentence_id": "s-4-1-2",
    "quote": "reported values may differ from officially published numbers due to differences in hardware, text normalization, or evaluation methodology"
   },
   "kind": "critique",
   "title": "自测数字与官方数字的差距",
   "explanation": "作者声明所有数字来自自己的受控复测，可能与官方发布值不同——这是诚实且必要的，因为文本规整化方式就能让 WER 浮动零点几个百分点。但反过来也要警惕：既然都是自测，挑选「每族最好配置」时是否存在对自家管线的隐性偏向？横向对比论文结论时，最好以同框架复测为准，而不是直接引用本文表格。",
   "featured": false
  },
  {
   "id": "ann-005",
   "anchor": {
    "sentence_id": "s-5-1-2-1",
    "quote": "achieves 9.22% WER, a 46% relative increase over its 6.32% batch WER"
   },
   "kind": "number",
   "title": "46% 退化说明了什么",
   "explanation": "Parakeet TDT 在批处理下 6.32% WER、其实不差，但最优分块配置只能到 9.22%，相对退化 46%——而且这是在 2.4 s 延迟、远宽松于 Nemotron 0.56 s 的条件下取得的。这个数字是全文最有说服力的论据之一：批处理模型靠滑窗+拼接「模拟」流式，块边界处的上下文断裂会造成系统性损失，不是靠调参能救回来的。架构是否原生流式，比参数量大小更决定流式精度。",
   "explanation_plain": "把批处理模型切成小块跑，错误率暴涨近一半，说明流式能力必须在设计阶段就内置，事后改造代价很大。",
   "featured": true
  },
  {
   "id": "ann-006",
   "anchor": {
    "sentence_id": "s-5-2-1-2",
    "quote": "tune latency–accuracy trade-offs by adjusting these parameters at inference time without retraining"
   },
   "kind": "engineering",
   "title": "免重训调延迟的价值",
   "explanation": "「推理时调参即可权衡延迟与精度」听起来像小事，实际是很大的工程红利：同一套权重可以服务延迟敏感的实时字幕（小块、短历史）和精度优先的会议记录（大块、长历史），不用为每个场景训一份模型。这背后是 cache-aware 架构把「看多少历史」从训练超参变成了运行期参数。对比 Whisper 类模型，想改流式行为基本只能换后处理策略，灵活性完全不在一个层面。",
   "featured": true
  },
  {
   "id": "ann-007",
   "anchor": {
    "sentence_id": "s-5-2-5-4",
    "quote": "(7, 10, 7) at 7.28% WER with (7, 2, 7) at 8.51% WER, where the only difference is reduced history"
   },
   "kind": "number",
   "title": "1.23% 差距全是历史长度",
   "explanation": "这组对照干净得少见：(7,10,7) 与 (7,2,7) 只差左上下文块数（10 vs 2），WER 就差出 1.23 个百分点。这说明对 cache-aware 流式模型，「能回看多久」几乎是一阶因素——5.6 s 历史对消歧、代词指代、数字听写都至关重要。工程含义：端侧内存预算要优先留给上下文缓存，而不是先砍历史来省内存；砍历史省的是小头，掉的是实打实的精度。",
   "featured": true
  },
  {
   "id": "ann-008",
   "anchor": {
    "sentence_id": "s-5-3-7-1",
    "quote": "degrades significantly in chunked mode (BSF = 1.77) and runs below real-time on CPU (RTFx = 0.49)"
   },
   "kind": "comparison",
   "title": "LLM-ASR 的端侧短板",
   "explanation": "Qwen3-ASR-1.7B 批处理 WER 全场最低（5.90%），但分块后 BSF 冲到 1.77、CPU 上 RTFx 只有 0.49——连实时都跑不到。这暴露了 LLM 路线做端侧流式的双重短板：自回归解码的逐 token 开销在 CPU 上无法摊薄，而音频分块又破坏了 LLM 擅长的全局上下文建模。不是 LLM-ASR 不行，而是它当前的强项（离线高精度、指令遵循）与端侧流式的约束几乎正交。",
   "featured": true
  },
  {
   "id": "ann-009",
   "anchor": {
    "sentence_id": "s-5-3-9-2",
    "quote": "Parakeet’s larger chunks benefit from GPU parallelism over wide tensors, whereas on CPU, where parallelism is limited, Nemotron’s smaller, cache-efficient chunks incur less per-step compute"
   },
   "kind": "engineering",
   "title": "GPU 结论不能直接搬到 CPU",
   "explanation": "同一个模型在 GPU 上 RTFx 更高、到 CPU 上反而更慢，原因是计算粒度：大块+宽张量天然适配 GPU 的大规模并行，小核 CPU 则更喜欢小块+低单步算力+高缓存复用。这是端侧推理选型的通用教训——评估模型效率时必须在与部署目标同构的硬件上测，GPU 上的吞吐排名对 CPU 部署几乎没有参考价值。作者的假设虽未做算子级 profiling 验证，但方向符合经验。",
   "featured": false
  },
  {
   "id": "ann-010",
   "anchor": {
    "sentence_id": "s-6-1-3-3",
    "quote": "we decompose the model into three independently optimizable ONNX sessions: the encoder (cache-aware FastConformer), the decoder (LSTM prediction network), and the joiner"
   },
   "kind": "engineering",
   "title": "三图分解的工程红利",
   "explanation": "把 Transducer 拆成 encoder/decoder/joiner 三个独立 ONNX 会话，而不是导出一整张图，是这套部署方案的关键工程决策。好处有三：按组件定量化策略（编码器激进、解码器保守）；ONNX Runtime 可对各图独立做图级优化（如注意力融合）；出问题时能按组件定位数值差异。代价是会话间张量传递的管理复杂度上升，因此才有后面零拷贝缓存的设计。这是「模块边界即优化边界」的典型应用。",
   "explanation_plain": "把模型拆成三块分别优化，想压哪块压哪块，还能让推理引擎各自做加速，比导成一整个大文件灵活得多。",
   "featured": true
  },
  {
   "id": "ann-011",
   "anchor": {
    "sentence_id": "s-6-1-5-2",
    "quote": "avoiding redundant memory allocations and copies that would otherwise dominate CPU inference latency for short audio segments"
   },
   "kind": "engineering",
   "title": "小块推理的真正瓶颈是拷贝",
   "explanation": "很多人以为 CPU 推理慢在矩阵乘，但对 560 ms 这种短块，每次调用的固定开销——会话 invoke、张量绑定、缓存的分配与拷贝——占比会随块变小迅速上升。作者用就地更新缓存（in-place）把这部分开销压下去，是实测导向的优化。这解释了后文为什么 0.16 s 配置的有效延迟会显著偏离理想值：块越小，固定开销摊得越薄不了。做端侧流式，先 profile 内存拷贝再谈算子优化。",
   "featured": false
  },
  {
   "id": "ann-012",
   "anchor": {
    "sentence_id": "s-6-1-6-3",
    "quote": "implemented NeMo-compatible log-mel feature extraction directly in the inference runtime"
   },
   "kind": "engineering",
   "title": "特征提取也得端侧化",
   "explanation": "把 log-mel 提取从 Python 预处理搬进推理运行时，看似杂活，实则决定部署形态：依赖 Python 前处理意味着端上要拖一个 Python 栈，内存和启动开销都不可接受；而与 NeMo 逐位兼容的特征实现，是 ONNX 输出能对齐 PyTorch 基线的前提之一。环形缓冲携带块间重叠 mel 帧这一点尤其容易被忽略——特征在块边界断掉，会产生系统性识别错误，且很难从 WER 数字里定位。",
   "featured": false
  },
  {
   "id": "ann-013",
   "anchor": {
    "sentence_id": "s-6-2-1-4",
    "quote": "defining representative calibration data and chunk-level execution conditions is less straightforward, so in this work we focus on calibration-free post-training strategies"
   },
   "kind": "critique",
   "title": "免校准是理由还是妥协",
   "explanation": "作者以「有状态流式 Transducer 难以定义代表性校准数据」为由放弃 AWQ/GPTQ 类校准方法。这个理由成立一半：流式模型的激活确实依赖缓存状态，静态校准集难覆盖；但另一半是省事——用逐数据集录音走一遍流式推理收集激活统计，工程上并非不可行。考虑到 int4 RTN 与 int4 k-quant 的差距主要来自 scale 优化而非数据，免校准在这里或许够用，但「校准对流式 ASR 到底能帮多少」仍是本文留下的开放问题。",
   "featured": false
  },
  {
   "id": "ann-014",
   "anchor": {
    "sentence_id": "s-k-quant-5-3",
    "quote": "using |wj| alone would assign near-zero importance to near-zero weights, allowing the optimizer to introduce arbitrary error on them"
   },
   "kind": "concept",
   "title": "小权重为什么也要保护",
   "explanation": "k-quant 的重要性权重 αj = 块 RMS + |wj|，这个设计纠正了一个直觉陷阱：只按幅值加权会让接近零的权重无人保护，量化器可以在它们身上随意犯错。但 ASR 网络里小权重常常承担「抑制」功能（比如压住某个输出维度），把它们量化坏了一样掉精度。RMS 项相当于给全块设定一个随尺度自适应的最低保护水位。这个细节也解释了为什么朴素的 magnitude-only 重要性加权在实践里经常翻车。",
   "featured": false
  },
  {
   "id": "ann-015",
   "anchor": {
    "sentence_id": "s-k-quant-7-2",
    "quote": "their combined size is under 35 MB, so quantizing them would yield negligible size savings while risking degradation in the RNNT decoding loop"
   },
   "kind": "engineering",
   "title": "量化要算账，不是越低越好",
   "explanation": "解码器+joiner 合计不到 35 MB，量化省不下几个 MB，却要在每个编码器时间步都被调用的 RNNT 循环里承担数值风险——这是典型的「收益-风险不对称就不做」。工程上更值得学的是作者的决策顺序：先量化占参数 95% 以上的编码器，小部件维持 FP32，缓存张量也维持 FP32。压缩率的主要矛盾在最大的那个组件，把小零件也 int4 化只会引入 bug 不会有收益。",
   "featured": false
  },
  {
   "id": "ann-016",
   "anchor": {
    "sentence_id": "s-7-2-1-4",
    "quote": "Even at int4 precision with a model size of just 0.67 GB (73% smaller), the WER degrades by only 0.17% absolute (2.1% relative)"
   },
   "kind": "number",
   "title": "73% 压缩换 0.17% 退化",
   "explanation": "2.47 GB → 0.67 GB 体积缩 73%，WER 只涨 0.17% 绝对值，这个交换比相当夸张，原因是 ASR 编码器权重冗余度高、且 k-quant 的按块 scale 优化恰好保护了大幅值权重。但要注意参照系是 ONNX FP32 基线（8.03%），而非 PyTorch 基线（7.28%）；相对真正的全精度基线，总退化是 0.92%。另外这是英文 8 基准均值，换语种、换域未必同样平稳。",
   "explanation_plain": "模型压到四分之一大小，识别错误率几乎没变，说明这类模型权重里冗余很多，4-bit 量化很划算。",
   "featured": true
  },
  {
   "id": "ann-017",
   "anchor": {
    "sentence_id": "s-7-2-4-4",
    "quote": "not caused by the ONNX export itself, since the graph is numerically equivalent, but rather by differences in kernel implementations that may compound through 24 conformer layers"
   },
   "kind": "critique",
   "title": "0.75% 差距的解释站得住吗",
   "explanation": "ONNX FP32 比 PyTorch 基线高 0.75%，作者归因于 kernel 实现差异在 24 层 Conformer 中累积。「计算图数值等价」这个前提其实很强：逐位等价才对，而实际上跨框架的浮点求和顺序、卷积算法选择都不同，称不上严格等价。更稳妥的做法是逐层 dump 中间张量定位发散层，或者至少在 CPU 上跑 PyTorch 作对照，把「框架差异」与「CPU 指令集路径差异」分开。目前这个解释更像合理猜测，不宜直接采信。",
   "featured": true
  },
  {
   "id": "ann-018",
   "anchor": {
    "sentence_id": "s-7-3-1-6",
    "quote": "under an illustrative assumption of roughly 2× lower throughput than our server, the 0.16 s configuration would operate at approximately RTFx ≈1.3×"
   },
   "kind": "critique",
   "title": "消费级硬件只有 2× 差距吗",
   "explanation": "作者用「吞吐减半」作为消费级硬件的示意假设，推算 0.16 s 配置还剩 RTFx≈1.3×。这个假设很可能偏乐观：测试机是 64 核 EPYC 服务器，固定 32 核跑推理；真实手机/笔记本的 AVX2 实现、内存带宽、功耗墙限制下，差距常见 3–5× 甚至更多，更别说很多 ARM 设备根本没有 AVX2。1.3× 的余量在后台负载下也偏紧。建议把 0.16 s 配置视为服务器级能力，端侧落地仍以 0.56 s 为稳妥起点。",
   "featured": false
  },
  {
   "id": "ann-019",
   "anchor": {
    "sentence_id": "s-9-2-2",
    "quote": "offline ASR quality is a poor proxy for low-latency streaming quality"
   },
   "kind": "critique",
   "title": "全文最重要的一句话",
   "explanation": "「离线 ASR 质量是低延迟流式质量的糟糕代理」是本文最有迁移价值的结论：批处理榜单排名（Qwen3-ASR > Parakeet > Nemotron）在流式约束下几乎完全翻转（Nemotron 最优）。含义是双重的——选型时别看离线榜单做端侧决策；做评测时，只报批处理 WER 的模型卡对流式场景几乎没有信息量。这也解释了为什么端侧 ASR 需要独立的评测与优化管线，而不是从离线 SOTA 出发「改造」。",
   "explanation_plain": "离线排行榜上最强的模型，拿到实时流式场景可能表现很差，选端侧模型必须在流式条件下重新测。",
   "featured": true
  },
  {
   "id": "ann-020",
   "anchor": {
    "sentence_id": "s-9-4-3",
    "quote": "the largest increases on AMI (+0.65%) and SPGISpeech (+0.22%), while TED-LIUM actually shows no degradation (4.65% vs. 4.66%)"
   },
   "kind": "number",
   "title": "量化损失不均匀分布",
   "explanation": "int4 量化的损失不是均匀摊在 8 个数据集上：远场重叠语音的 AMI 涨 0.65%，专业口述的 SPGISpeech 涨 0.22%，而 TED-LIUM 反而略降。模式很清楚——声学条件越难、越依赖精细频谱区分的数据集，对权重精度损失越敏感；干净朗读语音几乎无感。这提示：评估量化方案时只看平均 WER 会掩盖困难域的退化，端侧产品若主打会议场景，AMI 这类指标应该加权看待。",
   "featured": false
  },
  {
   "id": "ann-021",
   "anchor": {
    "sentence_id": "s-9-5-3",
    "quote": "ConvInteger and MatMulInteger perform the entire computation in integer arithmetic, accumulating rounding errors through the encoder’s 24 conformer layers"
   },
   "kind": "comparison",
   "title": "算子选型比 bit 数更致命",
   "explanation": "同样一套 int4 权重，走 MatMulNBits（先反量化回浮点再算）WER 是 8.05–8.46%，走 ConvInteger/MatMulInteger（全程整数运算）直接崩到 10.14%。差别不在量化比特数，而在误差累积路径：整数算子把每层的舍入误差带进下一层，24 层卷积+注意力交错后误差被放大到不可接受。反直觉的教训：全程整数运算未必比「反量化-浮点乘」快多少，但精度代价可以大得多。选量化算子前先在目标网络上验证端到端精度。",
   "featured": true
  },
  {
   "id": "ann-022",
   "anchor": {
    "sentence_id": "s-9-1-1-5",
    "quote": "does not cover several important system-level capabilities often required in production settings, such as robust inverse text normalization"
   },
   "kind": "critique",
   "title": "作者的自我划线很诚实",
   "explanation": "作者主动列明未覆盖项：逆文本规整化、说话人分离、语码混合、热词适配、内部真实流量评测。这些恰是生产系统与论文基准差距最大的地方——ESB 的 8.20% 不等价于「生产可用 8.20%」。这种自我划线值得肯定，但读者要据此调整预期：该模型是「核心转写引擎」级别的交付，之上还需要 ITN、标点、说话人分离等一整层系统组件，才能变成面向用户的产品。",
   "featured": true
  },
  {
   "id": "ann-023",
   "anchor": {
    "sentence_id": "s-9-2-2-3",
    "quote": "its autoregressive design introduces a different latency profile from the transducerbased system studied here, with output latency that can grow with transcript length"
   },
   "kind": "comparison",
   "title": "自回归 vs Transducer 的延迟形态",
   "explanation": "Moonshine v2 这类自回归编码器-解码器即使首 token 很快，输出延迟仍会随转录长度增长——因为每多出一个 token 都要多走一步解码；而 Transducer 按音频帧单调推进，延迟与文本长度解耦。对「一直开着听」的端侧场景（字幕、语音助手），这个差别是结构性的：自回归方案在长句尾部会出现可感知的滞后累积，Transducer 不会。选型时「首 token 延迟」指标会掩盖这一点，要看的是稳态输出延迟。",
   "featured": false
  },
  {
   "id": "ann-024",
   "anchor": {
    "sentence_id": "s-8-1-2",
    "quote": "available through Microsoft’s Foundry Local platform, with streaming inference support across C#, Python, JavaScript, C++, and Rust"
   },
   "kind": "connection",
   "title": "从论文到产品的落地路径",
   "explanation": "这篇报告本质是微软把 NVIDIA 基座模型产品化的工程记录：ONNX Runtime 重写推理、量化压缩、再通过 Foundry Local + ONNX Runtime GenAI SDK 以五种语言分发。值得注意的分工——NVIDIA 出架构与权重，微软出部署管线与分发渠道。对想复用这套方法的团队，真正的可迁移资产不是 0.67 GB 这个模型本身，而是「三图分解 + 免校准 k-quant + 图级融合」这条流水线，它理论上可套用到任何 cache-aware Transducer。",
   "featured": true
  }
 ]
};
