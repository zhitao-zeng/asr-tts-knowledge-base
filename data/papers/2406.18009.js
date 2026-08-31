// 自动生成：2406.18009 全文双语精读数据（由 tools/compile_paper.js 装配）
// 结构/原文来自 .cache/papers/2406.18009.json（tools/extract_paper.py）；
// 翻译与讲解来自 .cache/papers/zh/2406.18009/（LLM agent 撰写）。
// 改翻译请改片段后重新装配；勿手改本文件的结构与 original 字段。
globalThis.PAPER_2406_18009 = {
 "paper_id": "2406.18009",
 "model_id": "e2_tts",
 "title": {
  "original": "E2 TTS: EMBARRASSINGLY EASY FULLY NON-AUTOREGRESSIVE ZERO-SHOT TTS Sefik Emre Eskimez, Xiaofei Wang, Manthan Thakker, Canrun Li, Chung-Hsien Tsai, Zhen Xiao,",
  "zh": "E2 TTS：简单到令人不好意思的全非自回归零样本 TTS"
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
       "original": "Hemin Yang, Zirun Zhu, Min Tang, Xu Tan, Yanqing Liu, Sheng Zhao, Naoyuki Kanda Microsoft Corporation, USA"
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
    "original": "ABSTRACT",
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
       "original": "This paper introduces Embarrassingly Easy Text-to-Speech (E2 TTS), a fully non-autoregressive zero-shot text-to-speech system that offers human-level naturalness and state-of-the-art speaker similarity and intelligibility.",
       "zh": "本文介绍 Embarrassingly Easy Text-to-Speech（E2 TTS），一个完全非自回归（NAR）的零样本文本转语音系统，它达到了人类水平的自然度以及最先进的说话人相似度和可懂度。"
      },
      {
       "id": "s-abstract-1-2",
       "original": "In the E2 TTS framework, the text input is converted into a character sequence with filler tokens.",
       "zh": "在 E2 TTS 框架中，文本输入被转换成带有填充 token 的字符序列。"
      },
      {
       "id": "s-abstract-1-3",
       "original": "The flowmatching-based mel spectrogram generator is then trained based on the audio infilling task.",
       "zh": "基于流匹配（flow matching）的 mel 频谱图生成器随后在音频填充（audio infilling）任务上训练。"
      },
      {
       "id": "s-abstract-1-4",
       "original": "Unlike many previous works, it does not require additional components (e.g., duration model, graphemeto-phoneme) or complex techniques (e.g., monotonic alignment search).",
       "zh": "与许多先前工作不同，它不需要额外的组件（例如时长模型、字位到音素转换器）或复杂的技术（例如单调对齐搜索）。"
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
       "original": "Despite its simplicity, E2 TTS achieves state-of-the-art zero-shot TTS capabilities that are comparable to or surpass previous works, including Voicebox and NaturalSpeech 3.",
       "zh": "尽管结构极简，E2 TTS 达到了最先进的零样本 TTS 能力，可与 Voicebox、NaturalSpeech 3 等先前工作相媲美甚至超越它们。"
      },
      {
       "id": "s-abstract-2-2",
       "original": "The simplicity of E2 TTS also allows for flexibility in the input representation.",
       "zh": "E2 TTS 的简洁性还带来了输入表示上的灵活性。"
      },
      {
       "id": "s-abstract-2-3",
       "original": "We propose several variants of E2 TTS to improve usability during inference.",
       "zh": "我们提出了 E2 TTS 的若干变体，以提升推理时的易用性。"
      },
      {
       "id": "s-abstract-2-4",
       "original": "See https://aka.ms/e2tts/ for demo samples.",
       "zh": "演示样例见 https://aka.ms/e2tts/。"
      }
     ]
    },
    {
     "id": "p-abstract-3",
     "type": "paragraph",
     "page": 1,
     "sentences": [
      {
       "id": "s-abstract-3-1",
       "original": "Index Terms— zero-shot text-to-speech, flow-matching",
       "zh": "关键词——零样本文本转语音、流匹配。"
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
    "original": "INTRODUCTION",
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
       "original": "In recent years, text-to-speech (TTS) systems have seen significant improvements [1, 2, 3, 4], achieving a level of naturalness that is indistinguishable from human speech [5].",
       "zh": "近年来，文本转语音（TTS）系统取得了显著进步 [1, 2, 3, 4]，其自然度已达到与人类语音难以区分的水平 [5]。"
      },
      {
       "id": "s-1-1-2",
       "original": "This advancement has further led to research efforts to generate natural speech for any speaker from a short audio sample, often referred to as an audio prompt.",
       "zh": "这一进步进一步推动了相关研究：仅凭一小段音频样本（通常称为音频提示）为任意说话人生成自然的语音。"
      },
      {
       "id": "s-1-1-3",
       "original": "Early studies of zero-shot TTS used speaker embedding to condition the TTS system [6, 7].",
       "zh": "早期的零样本 TTS 研究使用说话人嵌入来对 TTS 系统进行条件化 [6, 7]。"
      },
      {
       "id": "s-1-1-4",
       "original": "More recently, VALL-E [8] proposed formulating the zero-shot TTS problem as a language modeling problem in the neural codec domain, achieving significantly improved speaker similarity while maintaining a simplistic model architecture.",
       "zh": "最近，VALL-E [8] 提出将零样本 TTS 问题表述为神经 codec 域中的语言建模问题，在保持模型架构简洁的同时显著提升了说话人相似度。"
      },
      {
       "id": "s-1-1-5",
       "original": "Various extensions were proposed to improve stability [9, 10, 11], and VALL-E 2 [12] recently achieved human-level zero-shot TTS with techniques including repetition-aware sampling and grouped code modeling.",
       "zh": "各种扩展被提出以提升稳定性 [9, 10, 11]，而 VALL-E 2 [12] 最近借助重复感知采样、分组码建模等技术实现了人类水平的零样本 TTS。"
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
       "original": "While the neural codec language model-based zero-shot TTS achieved promising results, there are still a few limitations based on its auto-regressive (AR) model-based architecture.",
       "zh": "尽管基于神经 codec 语言模型的零样本 TTS 取得了很有前景的结果，其自回归（AR）模型架构仍存在一些局限。"
      },
      {
       "id": "s-1-2-2",
       "original": "Firstly, because the codec token needs to be sampled sequentially, it inevitably increases the inference latency.",
       "zh": "首先，由于 codec token 需要逐个顺序采样，推理延迟不可避免地增加。"
      },
      {
       "id": "s-1-2-3",
       "original": "Secondly, a dedicated effort to figure out the best tokenizer (both for text tokens and audio tokens) is necessary to achieve the best quality [9].",
       "zh": "其次，为了达到最佳质量，需要专门投入精力寻找最优的分词器（包括文本 token 和音频 token）[9]。"
      },
      {
       "id": "s-1-2-4",
       "original": "Thirdly, it is required to use some tricks to stably handle long sequences of audio codecs, such as the combination of AR and non-autoregressive (NAR) modeling [8, 12], multi-scale transformer [13], grouped code modeling [12].",
       "zh": "第三，需要借助一些技巧才能稳定地处理长音频 codec 序列，例如 AR 与非自回归（NAR）建模的组合 [8, 12]、多尺度 Transformer [13]、分组码建模 [12]。"
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
       "original": "Meanwhile, several fully NAR zero-shot TTS models have been proposed with promising results.",
       "zh": "与此同时，若干完全 NAR 的零样本 TTS 模型也被提出并取得了有前景的结果。"
      },
      {
       "id": "s-1-3-2",
       "original": "Unlike AR-based models, fully NAR models enjoy fast inference based on parallel processing.",
       "zh": "与基于 AR 的模型不同，完全 NAR 模型基于并行处理享有快速推理的优势。"
      },
      {
       "id": "s-1-3-3",
       "original": "NaturalSpeech 2 [14] and NaturalSpeech 3 [15] estimate the latent vectors of a neural audio codec based on diffusion models [16, 17].",
       "zh": "NaturalSpeech 2 [14] 和 NaturalSpeech 3 [15] 基于扩散模型 [16, 17] 来估计神经音频 codec 的隐向量。"
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
       "original": "Voicebox [18] and Matcha-TTS [19] used a flow-matching model [20] conditioned by an input text.",
       "zh": "Voicebox [18] 和 Matcha-TTS [19] 使用了以输入文本为条件的流匹配模型 [20]。"
      },
      {
       "id": "s-1-4-2",
       "original": "However, one notable challenge for such NAR models is how to obtain the alignment between the input text and the output audio, whose length is significantly different.",
       "zh": "然而，这类 NAR 模型面临的一个显著挑战是：输入文本与输出音频的长度差异很大，如何获得二者之间的对齐。"
      },
      {
       "id": "s-1-4-3",
       "original": "NaturalSpeech 2, NaturalSpeech 3, and Voicebox used a framewise phoneme alignment for training the model.",
       "zh": "NaturalSpeech 2、NaturalSpeech 3 和 Voicebox 都使用帧级音素对齐来训练模型。"
      },
      {
       "id": "s-1-4-4",
       "original": "Matcha-TTS, on the other hand, used monotonic alignment search (MAS) [21, 3] to automatically find the alignment between input and output.",
       "zh": "Matcha-TTS 则使用单调对齐搜索（MAS）[21, 3] 来自动寻找输入与输出之间的对齐。"
      },
      {
       "id": "s-1-4-5",
       "original": "While MAS could alleviate the necessity of the frame-wise phoneme aligner, it still requires an independent duration model to estimate the duration of each phoneme during inference.",
       "zh": "虽然 MAS 可以省去对帧级音素对齐器的需求，但推理时仍需要一个独立的时长模型来估计每个音素的时长。"
      },
      {
       "id": "s-1-4-6",
       "original": "More recently, E3 TTS [22] proposed using cross-attention from the input sequence, which required a carefully designed U-Net architecture [23].",
       "zh": "更近期地，E3 TTS [22] 提出使用来自输入序列的交叉注意力，但这需要一个精心设计的 U-Net 架构 [23]。"
      },
      {
       "id": "s-1-4-7",
       "original": "As such, fully NAR zero-shot TTS models require either an explicit duration model or a carefully designed architecture.",
       "zh": "因此，完全 NAR 的零样本 TTS 模型要么需要显式的时长模型，要么需要精心设计的架构。"
      },
      {
       "id": "s-1-4-8",
       "original": "One of our findings in this paper is that such techniques are not necessary to achieve high-quality zeroshot TTS, and they are sometimes even harmful to naturalness.1 Another complexity in TTS systems is the choice of the text tokenizer.",
       "zh": "本文的一个发现是：实现高质量的零样本 TTS 并不需要这些技术，它们有时甚至对自然度有害。TTS 系统的另一个复杂性在于文本分词器的选择。1"
      },
      {
       "id": "s-1-4-9",
       "original": "As discussed above, the AR-model-based system requires a careful selection of tokenizer to achieve the best result.",
       "zh": "如上所述，基于 AR 模型的系统需要精心选择分词器才能获得最佳结果。"
      },
      {
       "id": "s-1-4-10",
       "original": "On the other hand, most fully NAR models assume a monotonic alignment between text and output, with the exception of E3 TTS, which uses cross-attention.",
       "zh": "另一方面，大多数完全 NAR 模型假设文本与输出之间存在单调对齐，唯一的例外是使用交叉注意力的 E3 TTS。"
      },
      {
       "id": "s-1-4-11",
       "original": "These models impose constraints on the input format and often require a text normalizer to avoid invalid input formats.",
       "zh": "这些模型对输入格式施加了约束，往往需要文本规范化器来避免非法输入格式。"
      },
      {
       "id": "s-1-4-12",
       "original": "When the model is trained based on phonemes, a graphemeto-phoneme converter is additionally required.",
       "zh": "当模型基于音素训练时，还需要额外的字位到音素转换器。"
      }
     ]
    },
    {
     "id": "p-1-5",
     "type": "paragraph",
     "page": 1,
     "sentences": [
      {
       "id": "s-1-5-1",
       "original": "In this paper, we propose Embarrassingly Easy TTS (E2 TTS), a fully NAR zero-shot TTS system with a surprisingly simple architecture.",
       "zh": "本文提出 Embarrassingly Easy TTS（E2 TTS），一个架构简单到令人惊讶的完全 NAR 零样本 TTS 系统。"
      },
      {
       "id": "s-1-5-2",
       "original": "E2 TTS consists of only two modules: a flow-matchingbased mel spectrogram generator and a vocoder.",
       "zh": "E2 TTS 只由两个模块组成：一个基于流匹配的 mel 频谱图生成器和一个声码器。"
      },
      {
       "id": "s-1-5-3",
       "original": "The text input is converted into a character sequence with filler tokens to match the length of the input character sequence and the output mel-filterbank sequence.",
       "zh": "文本输入被转换为带填充 token 的字符序列，使输入字符序列与输出 mel 滤波器组序列的长度相匹配。"
      },
      {
       "id": "s-1-5-4",
       "original": "The mel spectrogram generator, composed of a vanilla Transformer with U-Net style skip connections, is trained using a speech-infilling task [18].",
       "zh": "mel 频谱图生成器由带 U-Net 风格跳跃连接的原版 Transformer 构成，通过语音填充任务 [18] 进行训练。"
      },
      {
       "id": "s-1-5-5",
       "original": "Despite its simplicity, E2 TTS achieves state-of-the-art zero-shot TTS capabilities that are comparable to, or surpass, previous works, including Voicebox and NaturalSpeech 3.",
       "zh": "尽管结构极简，E2 TTS 达到了最先进的零样本 TTS 能力，可与包括 Voicebox 和 NaturalSpeech 3 在内的先前工作相媲美甚至超越它们。"
      },
      {
       "id": "s-1-5-6",
       "original": "The simplicity of E2 TTS also allows for flexibility in the input representation.",
       "zh": "E2 TTS 的简洁性还带来了输入表示上的灵活性。"
      },
      {
       "id": "s-1-5-7",
       "original": "We propose several variants of E2 TTS to improve usability during inference.",
       "zh": "我们提出了 E2 TTS 的若干变体，以提升推理时的易用性。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-2",
   "num": "2",
   "level": 1,
   "page": 1,
   "title": {
    "original": "E2 TTS",
    "zh": "2 E2 TTS"
   },
   "blocks": []
  },
  {
   "id": "sec-2-1",
   "num": "2.1",
   "level": 2,
   "page": 1,
   "title": {
    "original": "Training",
    "zh": "2.1 训练"
   },
   "blocks": [
    {
     "id": "p-2-1-1",
     "type": "paragraph",
     "page": 1,
     "sentences": [
      {
       "id": "s-2-1-1-1",
       "original": "Fig. 1 (a) provides an overview of E2 TTS training.",
       "zh": "Fig. 1 (a) 给出了 E2 TTS 训练的总览。"
      },
      {
       "id": "s-2-1-1-2",
       "original": "Suppose we have a training audio sample s with transcription y = (c1, c2, ..., cM), 1Concurrent with our work, Seed-TTS [24] proposed a diffusion modelbased zero-shot TTS, named Seed-TTSDiT.",
       "zh": "假设我们有一个训练音频样本 s，其转录为 y = (c1, c2, ..., cM)，1与本文工作同期，Seed-TTS [24] 提出了一个基于扩散模型的零样本 TTS，名为 Seed-TTSDiT。"
      },
      {
       "id": "s-2-1-1-3",
       "original": "Although it appears to share many similarities with our approach, the authors did not elaborate on the details of their model, making it challenging to compare with our work.",
       "zh": "尽管它看起来与我们的方法有许多相似之处，但作者没有详细阐述其模型细节，因此难以与我们的工作进行比较。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-e2-tts-training",
   "num": null,
   "level": 1,
   "page": 2,
   "title": {
    "original": "E2 TTS - Training",
    "zh": "E2 TTS - 训练"
   },
   "blocks": [
    {
     "id": "p-e2-tts-training-1",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-e2-tts-training-1-1",
       "original": "Training target Masked Masked",
       "zh": "训练目标。"
      }
     ]
    },
    {
     "id": "eq-e2-tts-training-1",
     "type": "equation",
     "page": 2,
     "original": "𝑚⨀Ƹ𝑠"
    }
   ]
  },
  {
   "id": "sec-flow-matching-transformer",
   "num": null,
   "level": 2,
   "page": 2,
   "title": {
    "original": "Flow-matching Transformer",
    "zh": "Flow-matching Transformer"
   },
   "blocks": [
    {
     "id": "p-flow-matching-transformer-1",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-flow-matching-transformer-1-1",
       "original": "(Mel spectrogram generator) Model input Masked",
       "zh": "模型输入。"
      }
     ]
    },
    {
     "id": "eq-flow-matching-transformer-1",
     "type": "equation",
     "page": 2,
     "original": "(1 −𝑚)⨀Ƹ𝑠"
    },
    {
     "id": "eq-flow-matching-transformer-2",
     "type": "equation",
     "page": 2,
     "original": "ො𝑦"
    },
    {
     "id": "p-flow-matching-transformer-2",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-flow-matching-transformer-2-1",
       "original": "H i",
       "zh": "（图内字符序列示意：H i !）"
      }
     ]
    },
    {
     "id": "eq-flow-matching-transformer-3",
     "type": "equation",
     "page": 2,
     "original": "!"
    },
    {
     "id": "p-flow-matching-transformer-3",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-flow-matching-transformer-3-1",
       "original": "H o w a r e y o u",
       "zh": "（图内字符序列示意：H o w a r e y o u ?）"
      }
     ]
    },
    {
     "id": "eq-flow-matching-transformer-4",
     "type": "equation",
     "page": 2,
     "original": "?"
    },
    {
     "id": "p-flow-matching-transformer-4",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-flow-matching-transformer-4-1",
       "original": "<F> <F> <F> <F> <F> <F> <F> <F> <F> <F> Filler tokens Audio mel spectrogram Ƹ𝑠 Transcription of the audio 𝑦 Hi!",
       "zh": "（图 1(a) 标签：⟨F⟩×10 填充 token（Filler tokens）；音频 mel 频谱图 ŝ；音频转写文本 y「Hi!」。）"
      },
      {
       "id": "s-flow-matching-transformer-4-2",
       "original": "How are you?",
       "zh": "\"How are you?\"（图示示例转录文字。）"
      }
     ]
    },
    {
     "id": "p-flow-matching-transformer-5",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-flow-matching-transformer-5-1",
       "original": "Training data It’s a good day!",
       "zh": "训练数据。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-e2-tts-inference",
   "num": null,
   "level": 1,
   "page": 2,
   "title": {
    "original": "E2 TTS - Inference",
    "zh": "E2 TTS - 推理"
   },
   "blocks": [
    {
     "id": "p-e2-tts-inference-1",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-e2-tts-inference-1-1",
       "original": "2 sec",
       "zh": "（图内时长标注：2 sec。）"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-vocoder",
   "num": null,
   "level": 2,
   "page": 2,
   "title": {
    "original": "Vocoder",
    "zh": "声码器"
   },
   "blocks": [
    {
     "id": "p-vocoder-1",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-vocoder-1-1",
       "original": "Discarded",
       "zh": "丢弃。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-flow-matching-transformer-2",
   "num": null,
   "level": 2,
   "page": 2,
   "title": {
    "original": "Flow-matching Transformer",
    "zh": "Flow-matching Transformer"
   },
   "blocks": [
    {
     "id": "p-flow-matching-transformer-2-1",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-flow-matching-transformer-2-1-1",
       "original": "(Mel spectrogram generator)",
       "zh": "（图内模块标签：Mel 频谱生成器。）"
      }
     ]
    },
    {
     "id": "eq-flow-matching-transformer-2-1",
     "type": "equation",
     "page": 2,
     "original": "𝑧gen"
    },
    {
     "id": "eq-flow-matching-transformer-2-2",
     "type": "equation",
     "page": 2,
     "original": "ො𝑦′"
    },
    {
     "id": "p-flow-matching-transformer-2-2",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-flow-matching-transformer-2-2-1",
       "original": "H e l l o",
       "zh": "（图内字符序列示意：H e l l o !）"
      }
     ]
    },
    {
     "id": "eq-flow-matching-transformer-2-3",
     "type": "equation",
     "page": 2,
     "original": "!"
    },
    {
     "id": "p-flow-matching-transformer-2-3",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-flow-matching-transformer-2-3-1",
       "original": "I t",
       "zh": "（图内字符序列示意：I t ‘ s a g o o d d a y !）"
      }
     ]
    },
    {
     "id": "eq-flow-matching-transformer-2-4",
     "type": "equation",
     "page": 2,
     "original": "‘"
    },
    {
     "id": "p-flow-matching-transformer-2-4",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-flow-matching-transformer-2-4-1",
       "original": "s a g o o d d a y",
       "zh": "（图内字符序列示意：I t ‘ s a g o o d d a y !）"
      }
     ]
    },
    {
     "id": "eq-flow-matching-transformer-2-5",
     "type": "equation",
     "page": 2,
     "original": "!"
    },
    {
     "id": "p-flow-matching-transformer-2-5",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-flow-matching-transformer-2-5-1",
       "original": "<F> <F> <F> Filler tokens Audio mel spectrogram Ƹ𝑠aud Transcription of the audio 𝑦aud Hello!",
       "zh": "（图内标签：⟨F⟩×3 填充 token；音频 mel 频谱图 ŝ_aud；音频转写 y_aud「Hello!」。）"
      }
     ]
    },
    {
     "id": "p-flow-matching-transformer-2-6",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-flow-matching-transformer-2-6-1",
       "original": "It’s a good day!",
       "zh": "（图内文本：It's a good day!）"
      }
     ]
    },
    {
     "id": "p-flow-matching-transformer-2-7",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-flow-matching-transformer-2-7-1",
       "original": "2 sec Audio prompt Text prompt 𝑦text Duration",
       "zh": "（图内标签：2 sec；Audio prompt；Text prompt y_text；Duration。）"
      }
     ]
    },
    {
     "id": "fig-flow-matching-transformer-2-1",
     "type": "figure_caption",
     "page": 2,
     "original": "Fig. 1. An overview of the training (left) and the inference (right) processes of E2 TTS.",
     "zh": "图 1. E2 TTS 训练（左）与推理（右）过程总览。"
    },
    {
     "id": "p-flow-matching-transformer-2-8",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-flow-matching-transformer-2-8-1",
       "original": "where ci represents the i-th character of the transcription.2 First, we extract its mel-filterbank features ˆs ∈RD×T , where D denotes the feature dimension and T represents the sequence length.",
       "zh": "其中 ci 表示转录中的第 i 个字符。2 首先，我们提取其 mel 滤波器组特征 ŝ ∈ R^(D×T)，其中 D 表示特征维度，T 表示序列长度。"
      },
      {
       "id": "s-flow-matching-transformer-2-8-2",
       "original": "We then create an extended character sequence ˆy, where a special filler token ⟨F⟩is appended to y to make the length of ˆy equal to T.3 ˆy = (c1, c2, . . . , cM, ⟨F⟩, . . . , ⟨F⟩",
       "zh": "随后构造扩展字符序列 ŷ：在 y 后追加特殊填充 token ⟨F⟩，使 ŷ 长度等于 T（脚注 3：ŷ = (c1, c2, …, cM, ⟨F⟩, …, ⟨F⟩)，其中填充段共 (T −M) 个）。"
      }
     ]
    },
    {
     "id": "eq-flow-matching-transformer-2-6",
     "type": "equation",
     "page": 2,
     "original": "|"
    },
    {
     "id": "eq-flow-matching-transformer-2-7",
     "type": "equation",
     "page": 2,
     "original": "{z"
    },
    {
     "id": "eq-flow-matching-transformer-2-8",
     "type": "equation",
     "page": 2,
     "original": "}"
    },
    {
     "id": "p-flow-matching-transformer-2-9",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-flow-matching-transformer-2-9-1",
       "original": "(T −M) times",
       "zh": "随后构造扩展字符序列 ŷ：在 y 后追加特殊填充 token ⟨F⟩，使 ŷ 长度等于 T（脚注 3：ŷ = (c1, c2, …, cM, ⟨F⟩, …, ⟨F⟩)，其中填充段共 (T −M) 个）。"
      }
     ]
    },
    {
     "id": "eq-flow-matching-transformer-2-9",
     "type": "equation",
     "page": 2,
     "original": "). (1)"
    },
    {
     "id": "p-flow-matching-transformer-2-10",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-flow-matching-transformer-2-10-1",
       "original": "A spectrogram generator, consisting of a vanilla Transformer [26] with U-net [23] style skip connection, is then trained based on the speech infilling task [18].",
       "zh": "随后，一个由带 U-net [23] 风格跳跃连接的原版 Transformer [26] 构成的频谱图生成器，基于语音填充任务 [18] 进行训练。"
      }
     ]
    },
    {
     "id": "p-flow-matching-transformer-2-11",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-flow-matching-transformer-2-11-1",
       "original": "More specifically, the model is trained to learn the distribution P(m ⊙ˆs|(1 −m) ⊙ˆs, ˆy), where m ∈{0, 1}D×T represents a binary temporal mask, and ⊙is the Hadamard product.",
       "zh": "更具体地说，模型被训练来学习分布 P(m ⊙ ŝ | (1 − m) ⊙ ŝ, ŷ)，其中 m ∈ {0,1}^(D×T) 表示一个二元时间掩码，⊙ 是 Hadamard 积。"
      },
      {
       "id": "s-flow-matching-transformer-2-11-2",
       "original": "E2 TTS uses the conditional flow-matching [20] to learn such distribution.",
       "zh": "E2 TTS 使用条件流匹配 [20] 来学习该分布。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-2-2",
   "num": "2.2",
   "level": 2,
   "page": 2,
   "title": {
    "original": "Inference",
    "zh": "2.2 推理"
   },
   "blocks": [
    {
     "id": "fig-2-2-1",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "fig-2-2-1-s1",
       "original": "Fig. 1 (b) provides an overview of the inference with E2 TTS. Suppose we have an audio prompt saud and its transcription yaud = (c′ 1, c′ 2, ..., c′ Maud) to mimic the speaker characteristics. We also suppose a text prompt ytext = (c′′ 1, c′′ 2, ..., c′′ Mtext). In the E2 TTS framework, we also require the target duration of the speech that we want to generate, which may be determined arbitrarily. The target duration is internally represented by the frame length T gen. First, we extract the mel-filterbank features ˆsaud ∈RD×T aud",
       "zh": "图 1(b) 给出 E2 TTS 推理过程概览。设有音频提示 s_aud 及其转写 y_aud = (c′1, c′2, …, c′M_aud) 用于模仿说话人特征；另有文本提示 y_text = (c′′1, c′′2, …, c′′M_text)。E2 TTS 框架还需指定目标语音时长，可任意给定，内部以帧长 T_gen 表示。首先从 s_aud 提取 mel 滤波组特征 ŝ_aud ∈ R^{D×T_aud}（式见原文）。"
      }
     ]
    },
    {
     "id": "p-2-2-1",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-2-2-1-1",
       "original": "from saud.",
       "zh": "（公式续行：从 s_aud 提取。）"
      },
      {
       "id": "s-2-2-1-2",
       "original": "We then create an extended character sequence ˆy′ by concatenating yaud, ytext, and repeated ⟨F⟩, as follows:",
       "zh": "将 yaud、ytext 与重复的 ⟨F⟩ 拼接，如下所示："
      }
     ]
    },
    {
     "id": "p-2-2-2",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-2-2-2-1",
       "original": "ˆy′ = (c′ 1, c′",
       "zh": "（公式片段：ŷ′ = (c′1, c′2, …（见原文）。）"
      }
     ]
    },
    {
     "id": "eq-2-2-1",
     "type": "equation",
     "page": 2,
     "original": "2, . . . , c′"
    },
    {
     "id": "eq-2-2-2",
     "type": "equation",
     "page": 2,
     "original": "Maud, c′′ 1, c′′"
    },
    {
     "id": "eq-2-2-3",
     "type": "equation",
     "page": 2,
     "original": "2, . . . , c′′"
    },
    {
     "id": "eq-2-2-4",
     "type": "equation",
     "page": 2,
     "original": "Mtext, ⟨F⟩, . . . , ⟨F⟩"
    },
    {
     "id": "eq-2-2-5",
     "type": "equation",
     "page": 2,
     "original": "|"
    },
    {
     "id": "eq-2-2-6",
     "type": "equation",
     "page": 2,
     "original": "{z"
    },
    {
     "id": "eq-2-2-7",
     "type": "equation",
     "page": 2,
     "original": "}"
    },
    {
     "id": "p-2-2-3",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-2-2-3-1",
       "original": "T times",
       "zh": "（公式片段：M_text 个字符后接 ⟨F⟩×T 填充。）"
      }
     ]
    },
    {
     "id": "eq-2-2-8",
     "type": "equation",
     "page": 2,
     "original": "), (2)"
    },
    {
     "id": "p-2-2-4",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-2-2-4-1",
       "original": "where T = T aud+T gen−M aud−M text, which ensures the length of ˆy′ is equal to T aud + T gen.4 2Alternatively, we can represent y as a sequence of Unicode bytes [25].",
       "zh": "ŷ′ = (c′1, c′2, ..., c′Maud, c′′2, ..., c′′Mtext, ⟨F⟩, ..., ⟨F⟩（T 次）)，其中 T = Taud + Tgen − Maud − Mtext，这保证了 ŷ′ 的长度等于 Taud + Tgen。4 2或者，我们也可以将 y 表示为 Unicode 字节序列 [25]。"
      }
     ]
    },
    {
     "id": "p-2-2-5",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-2-2-5-1",
       "original": "3We assume M ≤T, which is almost always valid. 4To ensure T ≥0, T gen needs to satisfy T gen ≥Maud + Mtext − T aud, which is almost always valid in the TTS scenario.",
       "zh": "3我们假设 M ≤ T，这在实际中几乎总是成立。4为保证 T ≥ 0，Tgen 需满足 Tgen ≥ Maud + Mtext − Taud，这在 TTS 场景下几乎总是成立。"
      }
     ]
    },
    {
     "id": "p-2-2-6",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-2-2-6-1",
       "original": "The mel spectrogram generator then generates mel-filterbank features ˜s based on the learned distribution of P(˜s|[ˆsaud; zgen], ˆy′), where zgen is an all-zero matrix with a shape of D × T gen, and [; ] is a concatenation operation in the dimension of T ∗.",
       "zh": "mel 频谱图生成器随后基于学习到的分布 P(s̃ | [ŝaud; zgen], ŷ′) 生成 mel 滤波器组特征 s̃，其中 zgen 是形状为 D × Tgen 的全零矩阵，[; ] 表示在 T 维度上的拼接操作。"
      },
      {
       "id": "s-2-2-6-2",
       "original": "The generated part of ˜s are then converted to the speech signal based on the vocoder.",
       "zh": "s̃ 中生成的部分随后由声码器转换为语音信号。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-2-3",
   "num": "2.3",
   "level": 2,
   "page": 2,
   "title": {
    "original": "Flow-matching-based mel spectrogram generator",
    "zh": "2.3 基于流匹配的 mel 频谱图生成器"
   },
   "blocks": [
    {
     "id": "p-2-3-1",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-2-3-1-1",
       "original": "E2 TTS leverages conditional flow-matching [20], which incorporates the principles of continuous normalizing flows [27].",
       "zh": "E2 TTS 采用条件流匹配（conditional flow matching）[20]，它融合了连续正则化流（continuous normalizing flows）[27] 的原理。"
      },
      {
       "id": "s-2-3-1-2",
       "original": "This model operates by transforming a simple initial distribution p0 into a complex target distribution p1 that characterizes the data.",
       "zh": "该模型的工作方式是将一个简单的初始分布 p0 变换为刻画数据的复杂目标分布 p1。"
      },
      {
       "id": "s-2-3-1-3",
       "original": "The transformation process is facilitated by a neural network, parameterized by θ, which is trained to estimate a time-dependent vector field, denoted as vt(x; θ), for t ∈[0, 1].",
       "zh": "这一变换过程由一个以 θ 为参数的神经网络实现，它被训练来估计一个随时间变化的向量场，记为 vt(x; θ)，其中 t ∈ [0, 1]。"
      },
      {
       "id": "s-2-3-1-4",
       "original": "From this vector field, we derive a flow, ϕt, which effectively transitions p0 into p1.",
       "zh": "从该向量场出发，我们推导出一个流 ϕt，它有效地将 p0 过渡为 p1。"
      },
      {
       "id": "s-2-3-1-5",
       "original": "The neural network’s training is driven by the conditional flow matching objective:",
       "zh": "该神经网络的训练由条件流匹配目标驱动："
      }
     ]
    },
    {
     "id": "eq-2-3-1",
     "type": "equation",
     "page": 2,
     "original": "LCFM(θ) = Et,q(x1),pt(x|x1) ∥ut(x|x1) −vt(x; θ)∥2 , (3)"
    },
    {
     "id": "p-2-3-2",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-2-3-2-1",
       "original": "where pt is the probability path at time t, ut is the designated vector field for pt, x1 symbolizes the random variable corresponding to the training data, and q is the distribution of the training data.",
       "zh": "LCFM(θ) = E_{t,q(x1),pt(x|x1)} ‖ut(x|x1) − vt(x; θ)‖^2，其中 pt 是时刻 t 的概率路径，ut 是为 pt 指定的向量场，x1 表示训练数据对应的随机变量，q 是训练数据的分布。"
      },
      {
       "id": "s-2-3-2-2",
       "original": "In the training phase, we construct both a probability path and a vector field from the training data, utilizing an optimal transport path: pt(x|x1) = N(x|tx1, (1 −(1 −σmin)t)2I) and ut(x|x1) = (x1 −(1 −σmin)x)/(1 −(1 −σmin)t).",
       "zh": "在训练阶段，我们利用最优传输路径从训练数据构造概率路径和向量场：pt(x|x1) = N(x|tx1, (1 − (1 − σmin)t)^2 · I)，ut(x|x1) = (x1 − (1 − σmin)x)/(1 − (1 − σmin)t)。"
      },
      {
       "id": "s-2-3-2-3",
       "original": "For inference, we apply an ordinary differential equation (ODE) solver [27] to generate the log mel-filterbank features starting from the initial distribution p0.",
       "zh": "推理时，我们应用常微分方程（ODE）求解器 [27]，从初始分布 p0 出发生成 log mel 滤波器组特征。"
      }
     ]
    },
    {
     "id": "p-2-3-3",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-2-3-3-1",
       "original": "We adopt the same model architecture with the audio model of Voicebox (Fig. 2 of [18]) except that the frame-wise phoneme sequence is replaced into ˆy.",
       "zh": "我们采用与 Voicebox 音频模型（[18] 中的 Fig. 2）相同的模型架构，只是将帧级音素序列替换为 ŷ。"
      },
      {
       "id": "s-2-3-3-2",
       "original": "Specifically, Transformer with U-Net style skip connection [18] is used as a backbone.",
       "zh": "具体来说，使用带 U-Net 风格跳跃连接 [18] 的 Transformer 作为骨干网络。"
      },
      {
       "id": "s-2-3-3-3",
       "original": "The input to the mel spectrogram generator is (1 −m) ⊙ˆs, ˆy, the flow step t, and noisy speech st.",
       "zh": "mel 频谱图生成器的输入为 (1 − m) ⊙ ŝ、ŷ、流步 t 和带噪语音 st。"
      }
     ]
    },
    {
     "id": "p-2-3-4",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-2-3-4-1",
       "original": "ˆy is first converted to character embedding sequence ˜y ∈RE×T .",
       "zh": "ŷ 首先被转换为字符嵌入序列 ỹ ∈ R^(E×T)。"
      },
      {
       "id": "s-2-3-4-2",
       "original": "Then, (1 −m) ⊙ˆs, st, ˜y are all stacked to form a tensor with a shape of (2 · D + E) × T, followed by a linear layer to output a tensor with a shape of D × T.",
       "zh": "然后，(1 − m) ⊙ ŝ、st、ỹ 被堆叠成一个形状为 (2·D + E) × T 的张量，再经过一个线性层输出形状为 D × T 的张量。"
      },
      {
       "id": "s-2-3-4-3",
       "original": "Finally, an embedding representation, ˆt ∈RD, of t is appended to form the input tensor with a shape of RD×(T +1) to the Transformer.",
       "zh": "最后，将 t 的嵌入表示 t̂ ∈ R^D 追加进去，形成形状为 R^(D×(T+1)) 的输入张量送入 Transformer。"
      },
      {
       "id": "s-2-3-4-4",
       "original": "The Transformer is",
       "zh": "该 Transformer 被"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-e2-tts-x1-training",
   "num": null,
   "level": 1,
   "page": 3,
   "title": {
    "original": "E2 TTS X1 - Training",
    "zh": "声码器"
   },
   "blocks": [
    {
     "id": "p-e2-tts-x1-training-1",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-e2-tts-x1-training-1-1",
       "original": "E2 TTS X1 - Inference Training target Masked",
       "zh": "（图内标签：E2 TTS X1 - Inference；Training target；Masked。）"
      }
     ]
    },
    {
     "id": "eq-e2-tts-x1-training-1",
     "type": "equation",
     "page": 3,
     "original": "𝑚⨀Ƹ𝑠"
    }
   ]
  },
  {
   "id": "sec-flow-matching-transformer-3",
   "num": null,
   "level": 2,
   "page": 3,
   "title": {
    "original": "Flow-matching Transformer",
    "zh": "Flow-matching Transformer"
   },
   "blocks": [
    {
     "id": "p-flow-matching-transformer-3-1",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-flow-matching-transformer-3-1-1",
       "original": "(Mel spectrogram generator) Model input Masked",
       "zh": "模型输入。"
      }
     ]
    },
    {
     "id": "eq-flow-matching-transformer-3-1",
     "type": "equation",
     "page": 3,
     "original": "(1 −𝑚)⨀Ƹ𝑠"
    },
    {
     "id": "p-flow-matching-transformer-3-2",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-flow-matching-transformer-3-2-1",
       "original": "It’s a good day!",
       "zh": "（图内文本：It's a good day!）"
      }
     ]
    },
    {
     "id": "p-flow-matching-transformer-3-3",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-flow-matching-transformer-3-3-1",
       "original": "2 sec",
       "zh": "（图内时长标注：2 sec。）"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-vocoder-2",
   "num": null,
   "level": 2,
   "page": 3,
   "title": {
    "original": "Vocoder",
    "zh": "声码器"
   },
   "blocks": [
    {
     "id": "p-vocoder-2-1",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-vocoder-2-1-1",
       "original": "Discarded",
       "zh": "丢弃。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-flow-matching-transformer-4",
   "num": null,
   "level": 2,
   "page": 3,
   "title": {
    "original": "Flow-matching Transformer",
    "zh": "Flow-matching Transformer"
   },
   "blocks": [
    {
     "id": "p-flow-matching-transformer-4-1",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-flow-matching-transformer-4-1-1",
       "original": "(Mel spectrogram generator)",
       "zh": "（图内模块标签：Mel 频谱生成器。）"
      }
     ]
    },
    {
     "id": "eq-flow-matching-transformer-4-1",
     "type": "equation",
     "page": 3,
     "original": "𝑧gen"
    },
    {
     "id": "eq-flow-matching-transformer-4-2",
     "type": "equation",
     "page": 3,
     "original": "ො𝑦′"
    },
    {
     "id": "p-flow-matching-transformer-4-2",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-flow-matching-transformer-4-2-1",
       "original": "H o w a r e y o u",
       "zh": "（图内字符序列示意：H o w a r e y o u ?）"
      }
     ]
    },
    {
     "id": "eq-flow-matching-transformer-4-3",
     "type": "equation",
     "page": 3,
     "original": "?"
    },
    {
     "id": "p-flow-matching-transformer-4-3",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-flow-matching-transformer-4-3-1",
       "original": "<F> <F> <F> <F> <F> <F> <F> <F> <F> <F> <F> <F> <F> <F>",
       "zh": "<F> <F> <F> <F> <F> <F> <F> <F> <F> <F> <F> <F> <F> <F>（图示填充 token 行。）"
      }
     ]
    },
    {
     "id": "eq-flow-matching-transformer-4-4",
     "type": "equation",
     "page": 3,
     "original": "ො𝑦"
    },
    {
     "id": "p-flow-matching-transformer-4-4",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-flow-matching-transformer-4-4-1",
       "original": "Filler tokens Audio mel spectrogram Ƹ𝑠 Transcription of the masked region of the audio 𝑦 How are you?",
       "zh": "\"How are you?\"（图示示例转录文字。）"
      }
     ]
    },
    {
     "id": "p-flow-matching-transformer-4-5",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-flow-matching-transformer-4-5-1",
       "original": "Training data I t",
       "zh": "训练数据。"
      }
     ]
    },
    {
     "id": "eq-flow-matching-transformer-4-5",
     "type": "equation",
     "page": 3,
     "original": "‘"
    },
    {
     "id": "p-flow-matching-transformer-4-6",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-flow-matching-transformer-4-6-1",
       "original": "s a g o o d d a y",
       "zh": "（图内字符序列示意：I t ‘ s a g o o d d a y !）"
      }
     ]
    },
    {
     "id": "eq-flow-matching-transformer-4-6",
     "type": "equation",
     "page": 3,
     "original": "!"
    },
    {
     "id": "p-flow-matching-transformer-4-7",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-flow-matching-transformer-4-7-1",
       "original": "<F> <F> <F> <F> <F> <F> <F> <F> <F> <F> Filler tokens Audio mel spectrogram Ƹ𝑠aud It’s a good day!",
       "zh": "（图内标签：⟨F⟩×10 填充 token；音频 mel 频谱图 ŝ_aud；「It's a good day!」。）"
      }
     ]
    },
    {
     "id": "p-flow-matching-transformer-4-8",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-flow-matching-transformer-4-8-1",
       "original": "2 sec Audio prompt Text prompt 𝑦text Duration",
       "zh": "（图内标签：2 sec；Audio prompt；Text prompt y_text；Duration。）"
      }
     ]
    },
    {
     "id": "fig-flow-matching-transformer-4-1",
     "type": "figure_caption",
     "page": 3,
     "original": "Fig. 2. An overview of the training (left) and the inference (right) processes of E2 TTS X1.",
     "zh": "图 2. E2 TTS X1 训练（左）与推理（右）过程总览。"
    },
    {
     "id": "p-flow-matching-transformer-4-9",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-flow-matching-transformer-4-9-1",
       "original": "I enjoyed a day in Besiktas, Istanbul.",
       "zh": "\"I enjoyed a day in Besiktas, Istanbul.\"（示例原文，意为\"我在伊斯坦布尔的贝西克塔斯度过了愉快的一天\"。）"
      }
     ]
    },
    {
     "id": "p-flow-matching-transformer-4-10",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-flow-matching-transformer-4-10-1",
       "original": "I enjoyed a day in (B EH1 SH IH0 K T AA0 SH), (IH0 S T AA1 N B UH0 L).",
       "zh": "\"I enjoyed a day in (B EH1 SH IH0 K T AA0 SH), (IH0 S T AA1 N B UH0 L).\"（其中括号内为音素序列。）"
      }
     ]
    },
    {
     "id": "fig-flow-matching-transformer-4-2",
     "type": "figure_caption",
     "page": 3,
     "original": "Fig. 3. Example of the transcription for E2 TTS X2 where words are replaced with phoneme sequences enclosed in parentheses.",
     "zh": "图 3. E2 TTS X2 的转录示例：单词被替换为括号包裹的音素序列。"
    },
    {
     "id": "p-flow-matching-transformer-4-11",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-flow-matching-transformer-4-11-1",
       "original": "trained to output a vector field vt with the conditional flow-matching objective LCFM.",
       "zh": "被训练为以条件流匹配目标 LCFM 输出向量场 vt。"
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
    "original": "Relationship to Voicebox",
    "zh": "2.4 与 Voicebox 的关系"
   },
   "blocks": [
    {
     "id": "p-2-4-1",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-2-4-1-1",
       "original": "E2 TTS has a close relationship with the Voicebox.",
       "zh": "E2 TTS 与 Voicebox 有着密切的关系。"
      },
      {
       "id": "s-2-4-1-2",
       "original": "From the perspective of the Voicebox, E2 TTS replaces a frame-wise phoneme sequence used in conditioning with a character sequence that includes a filler token.",
       "zh": "从 Voicebox 的视角看，E2 TTS 将其条件信息中的帧级音素序列替换为包含填充 token 的字符序列。"
      },
      {
       "id": "s-2-4-1-3",
       "original": "This change significantly simplifies the model by eliminating the need for a grapheme-to-phoneme converter, a phoneme aligner, and a phoneme duration model.",
       "zh": "这一改动显著简化了模型：不再需要字位到音素转换器、音素对齐器和音素时长模型。"
      },
      {
       "id": "s-2-4-1-4",
       "original": "From another viewpoint, the mel spectrogram generator of E2 TTS can be viewed as a joint model of the grapheme-to-phoneme converter, the phoneme duration model, and the audio model of the Voicebox.",
       "zh": "换个视角，E2 TTS 的 mel 频谱图生成器可以看作 Voicebox 的字位到音素转换器、音素时长模型和音频模型的联合模型。"
      },
      {
       "id": "s-2-4-1-5",
       "original": "This joint modeling significantly improves naturalness while maintaining speaker similarity and intelligibility, as will be demonstrated in our experiments.",
       "zh": "这种联合建模显著提升了自然度，同时保持了说话人相似度和可懂度，我们的实验将证明这一点。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-2-5",
   "num": "2.5",
   "level": 2,
   "page": 3,
   "title": {
    "original": "Extension of E2 TTS",
    "zh": "2.5 E2 TTS 的扩展"
   },
   "blocks": [
    {
     "id": "p-2-5-1",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-2-5-1-1",
       "original": "2.5.1.",
       "zh": "2.5.1."
      },
      {
       "id": "s-2-5-1-2",
       "original": "Extension 1: Eliminating the need for transcription of audio prompts in inference In certain application contexts, obtaining the transcription of the audio prompt can be challenging.",
       "zh": "扩展 1：消除推理时对音频提示转录的需求。在某些应用场景中，获取音频提示的转录可能比较困难。"
      },
      {
       "id": "s-2-5-1-3",
       "original": "To eliminate the requirement of the transcription of the audio prompt during inference, we introduce an extension, illustrated in Fig. 2.",
       "zh": "为了消除推理时对音频提示转录的需求，我们引入了一个扩展，如 Fig. 2 所示。"
      },
      {
       "id": "s-2-5-1-4",
       "original": "This extension, referred to as E2 TTS X1, assumes that we have access to the transcription of the masked region of the audio, which we use for y.",
       "zh": "这个被称为 E2 TTS X1 的扩展假设我们可以获取音频中被掩码区域的转录，并将其用作 y。"
      },
      {
       "id": "s-2-5-1-5",
       "original": "During inference, the extended character sequence ˆy′ is formed without yaud, namely, ˆy′ = (c′′ 1, c′′",
       "zh": "推理时不含 y_aud，直接构造扩展字符序列 ŷ′，即 ŷ′ = (c′′1, c′′2, …,（后接填充）。"
      }
     ]
    },
    {
     "id": "eq-2-5-1",
     "type": "equation",
     "page": 3,
     "original": "2, . . . , c′′"
    },
    {
     "id": "eq-2-5-2",
     "type": "equation",
     "page": 3,
     "original": "Mtext, ⟨F⟩, . . . , ⟨F⟩"
    },
    {
     "id": "eq-2-5-3",
     "type": "equation",
     "page": 3,
     "original": "|"
    },
    {
     "id": "eq-2-5-4",
     "type": "equation",
     "page": 3,
     "original": "{z"
    },
    {
     "id": "eq-2-5-5",
     "type": "equation",
     "page": 3,
     "original": "}"
    },
    {
     "id": "p-2-5-2",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-2-5-2-1",
       "original": "T times",
       "zh": "（公式片段：M_text 个字符后接 ⟨F⟩×T 填充。）"
      }
     ]
    },
    {
     "id": "eq-2-5-6",
     "type": "equation",
     "page": 3,
     "original": "). (4)"
    },
    {
     "id": "p-2-5-3",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-2-5-3-1",
       "original": "The rest of the procedure remains the same as in the basic E2 TTS.",
       "zh": "其余流程与基础版 E2 TTS 保持一致。"
      }
     ]
    },
    {
     "id": "p-2-5-4",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-2-5-4-1",
       "original": "The transcription of the masked region of the training audio can be obtained in several ways.",
       "zh": "训练音频被掩码区域的转录可以通过几种方式获得。"
      },
      {
       "id": "s-2-5-4-2",
       "original": "One method is to simply apply automatic speech recognition (ASR) to the masked region during training, which is straightforward but costly.",
       "zh": "一种方法是在训练时对被掩码区域直接应用自动语音识别（ASR），这很直接但成本较高。"
      },
      {
       "id": "s-2-5-4-3",
       "original": "In our experiment, we employed the Montreal Forced Aligner [28] to determine the start and end times of words within each training data sample.",
       "zh": "在我们的实验中，我们使用 Montreal Forced Aligner [28] 来确定每个训练数据样本中各单词的起止时间。"
      },
      {
       "id": "s-2-5-4-4",
       "original": "The masked region was determined in such a way that we ensured not to cut the word in the middle.",
       "zh": "掩码区域的选取保证不会把单词从中间切断。"
      }
     ]
    },
    {
     "id": "p-2-5-5",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-2-5-5-1",
       "original": "2.5.2.",
       "zh": "2.5.2."
      },
      {
       "id": "s-2-5-5-2",
       "original": "Extension 2: Enabling explicit indication of pronunciation for parts of words in a sentence In certain scenarios, users want to specify the pronunciation of a specific word such as unique foreign names.",
       "zh": "扩展 2：支持显式指定句中部分单词的发音。在某些场景中，用户希望指定特定单词（例如罕见的外国人名）的发音。"
      },
      {
       "id": "s-2-5-5-3",
       "original": "Retraining the model to accommodate such new words is both expensive and time-consuming.",
       "zh": "为适配这类新词而重新训练模型既昂贵又耗时。"
      }
     ]
    },
    {
     "id": "p-2-5-6",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-2-5-6-1",
       "original": "To tackle this challenge, we introduce another extension that enables us to indicate the pronunciation of a word during inference.",
       "zh": "为应对这一挑战，我们引入了另一个扩展，使我们能够在推理时指定单词的发音。"
      },
      {
       "id": "s-2-5-6-2",
       "original": "In this extension, referred to as E2 TTS X2, we occasionally substitute a word in y with a phoneme sequence enclosed in parentheses during training, as depicted in Fig. 3.",
       "zh": "在这个被称为 E2 TTS X2 的扩展中，我们在训练时偶尔将 y 中的某个单词替换为括号包裹的音素序列，如 Fig. 3 所示。"
      },
      {
       "id": "s-2-5-6-3",
       "original": "In our implementation, we replaced the word in y with the phoneme sequence from the CMU pronouncing dictionary [29] with a 15% probability.",
       "zh": "在我们的实现中，我们以 15% 的概率将 y 中的单词替换为来自 CMU 发音词典 [29] 的音素序列。"
      },
      {
       "id": "s-2-5-6-4",
       "original": "During inference, we simply replace the target word with phoneme sequences enclosed in parentheses.",
       "zh": "推理时，我们只需将目标单词替换为括号包裹的音素序列即可。"
      }
     ]
    },
    {
     "id": "p-2-5-7",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-2-5-7-1",
       "original": "It’s important to note that y is still a simple sequence of characters, and whether the character represents a word or a phoneme is solely determined by the existence of parentheses and their content.",
       "zh": "需要注意的是，y 仍然是一个简单的字符序列，某个字符表示的是单词还是音素，完全由括号是否存在及其内容决定。"
      },
      {
       "id": "s-2-5-7-2",
       "original": "It’s also noteworthy that punctuation marks surrounding the word are retained during replacement, which allows the model to utilize these punctuation marks even when the word is replaced with phoneme sequences.",
       "zh": "同样值得注意的是，替换时单词周围的标点符号会被保留，这使得即使单词被替换为音素序列，模型仍然能利用这些标点符号。"
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
    "original": "EXPERIMENTS",
    "zh": "3 实验"
   },
   "blocks": []
  },
  {
   "id": "sec-3-1",
   "num": "3.1",
   "level": 2,
   "page": 3,
   "title": {
    "original": "Training data",
    "zh": "3.1 训练数据"
   },
   "blocks": [
    {
     "id": "p-3-1-1",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-3-1-1-1",
       "original": "We utilized the Libriheavy dataset [30] to train our models.",
       "zh": "我们使用 Libriheavy 数据集 [30] 训练模型。"
      },
      {
       "id": "s-3-1-1-2",
       "original": "The Libriheavy dataset comprises 50,000 hours of read English speech from 6,736 speakers, accompanied by transcriptions that preserve case and punctuation marks.",
       "zh": "Libriheavy 数据集包含来自 6,736 位说话人的 50,000 小时朗读英语语音，其转录保留了大小写和标点符号。"
      },
      {
       "id": "s-3-1-1-3",
       "original": "It is derived from the Librilight [31] dataset contains 60,000 hours of read English speech from over 7,000 speakers.",
       "zh": "它源自 Librilight [31] 数据集，后者包含来自 7,000 多位说话人的 60,000 小时朗读英语语音。"
      },
      {
       "id": "s-3-1-1-4",
       "original": "For E2 TTS training, we used the case and punctuated transcription without any pre-processing.",
       "zh": "在 E2 TTS 训练中，我们直接使用带大小写和标点的转录，不做任何预处理。"
      },
      {
       "id": "s-3-1-1-5",
       "original": "We also used a proprietary 200,000 hours of training data to investigate the scalability of the E2 TTS model.",
       "zh": "我们还使用了 200,000 小时的专有训练数据，以考察 E2 TTS 模型的可扩展性。"
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
    "original": "Model configurations",
    "zh": "3.2 模型配置"
   },
   "blocks": [
    {
     "id": "p-3-2-1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-2-1-1",
       "original": "We constructed our proposed E2 TTS models using a Transformer architecture.",
       "zh": "我们基于 Transformer 架构构建了所提出的 E2 TTS 模型。"
      },
      {
       "id": "s-3-2-1-2",
       "original": "The architecture incorporated U-Net [23] style skip connections, 24 layers, 16 attention heads, an embedding dimension of 1024, a linear layer dimension of 4096.",
       "zh": "该架构包含 U-Net [23] 风格的跳跃连接、24 层、16 个注意力头、嵌入维度 1024、线性层维度 4096。"
      },
      {
       "id": "s-3-2-1-3",
       "original": "The character embedding vocabulary size was 399.5 The total number of parameters amounted to 335 million.",
       "zh": "字符嵌入词表大小为 399.5（抽取残留，原文如此：词表 399 + 脚注标记 5）。总参数量为 3.35 亿（335 million）。"
      },
      {
       "id": "s-3-2-1-4",
       "original": "We modeled the 100-dimensional log mel-filterbank features, extracted every 10.7 milliseconds from audio samples with a 24 kHz sampling rate.",
       "zh": "我们对 100 维 log mel 滤波器组特征建模，音频采样率为 24 kHz，每 10.7 毫秒提取一帧特征。"
      },
      {
       "id": "s-3-2-1-5",
       "original": "A BigVGAN [32]-based vocoder was employed to convert the log mel-filterbank features into waveforms.",
       "zh": "采用基于 BigVGAN [32] 的声码器将 log mel 滤波器组特征转换为波形。"
      },
      {
       "id": "s-3-2-1-6",
       "original": "The masking length was randomly determined to be between 70% and 100% of the log mel-filterbank feature length during training.",
       "zh": "训练时，掩码长度随机确定为 log mel 滤波器组特征长度的 70% 到 100% 之间。"
      },
      {
       "id": "s-3-2-1-7",
       "original": "In addition, we randomly dropped all the conditioning information with a 20% probability for classifier-free guidance (CFG) [33].",
       "zh": "此外，我们以 20% 的概率随机丢弃所有条件信息，用于无分类器引导（CFG）[33]。"
      },
      {
       "id": "s-3-2-1-8",
       "original": "All models were trained for 800,000 mini-batch updates with an effective mini-batch size of 307,200 audio frames.",
       "zh": "所有模型训练了 800,000 次 mini-batch 更新，有效 mini-batch 大小为 307,200 个音频帧。"
      },
      {
       "id": "s-3-2-1-9",
       "original": "We utilized a linear decay learning rate schedule with a peak learning rate of 7.5 × 10−5 and incorporated a warm-up phase for the initial 20,000 updates.",
       "zh": "我们使用线性衰减学习率调度，峰值学习率为 7.5 × 10−5，并在最初的 20,000 次更新中加入预热阶段。"
      },
      {
       "id": "s-3-2-1-10",
       "original": "We discarded the training samples that exceeded 4,000 frames.",
       "zh": "我们丢弃了超过 4,000 帧的训练样本。"
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
       "original": "In a subset of our experiments, we initialized E2 TTS models using a pre-trained model in an unsupervised manner.",
       "zh": "在部分实验中，我们以无监督方式使用预训练模型初始化 E2 TTS 模型。"
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
       "original": "This pretraining was conducted on an anonymized dataset, which consisted of 200,000 hours of unlabeled data.",
       "zh": "该预训练在一个匿名数据集上进行，包含 200,000 小时无标注数据。"
      },
      {
       "id": "s-3-2-3-2",
       "original": "The pre-training protocol, which involved 800,000 mini-batch updates, followed the scheme outlined in [34].",
       "zh": "预训练遵循 [34] 中概述的方案，包含 800,000 次 mini-batch 更新。"
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
       "original": "In addition, we trained a regression-based duration model by following that of Voicebox [18].",
       "zh": "此外，我们仿照 Voicebox [18] 训练了一个基于回归的时长模型。"
      },
      {
       "id": "s-3-2-4-2",
       "original": "It is based on a Transformer architecture, consisting of 8 layers, 8 attention heads, an embedding dimension of 512, a linear layer dimension of 2048.",
       "zh": "它基于 Transformer 架构，包含 8 层、8 个注意力头、嵌入维度 512、线性层维度 2048。"
      },
      {
       "id": "s-3-2-4-3",
       "original": "The training process involved 75,000 mini-batch updates with 120,000 frames.",
       "zh": "训练过程包含 75,000 次 mini-batch 更新，共 120,000 帧。"
      },
      {
       "id": "s-3-2-4-4",
       "original": "We used this duration model to estimate the target duration for a fair comparison with the Voicebox baseline.",
       "zh": "我们使用该时长模型来估计目标时长，以便与 Voicebox 基线进行公平比较。"
      },
      {
       "id": "s-3-2-4-5",
       "original": "Note that we will also show that E2 TTS is robust for different target duration in Section 3.6.",
       "zh": "请注意，我们还将在 Section 3.6 中展示 E2 TTS 对不同的目标时长具有鲁棒性。"
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
    "original": "Evaluation data and metrics",
    "zh": "3.3 评测数据与指标"
   },
   "blocks": [
    {
     "id": "p-3-3-1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-3-1-1",
       "original": "In order to assess our models, we utilized the test-clean subset of the LibriSpeech-PC dataset [35], which is an extension of LibriSpeech [36] that includes additional punctuation marks and casing.",
       "zh": "为了评估我们的模型，我们使用了 LibriSpeech-PC 数据集 [35] 的 test-clean 子集，该数据集是 LibriSpeech [36] 的扩展，包含了额外的标点符号和大小写。"
      }
     ]
    },
    {
     "id": "p-3-3-2",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-3-2-1",
       "original": "We specifically filtered the samples to retain only those with a duration between 4 and 10 seconds.",
       "zh": "我们专门筛选了样本，只保留时长在 4 到 10 秒之间的样本。"
      },
      {
       "id": "s-3-3-2-2",
       "original": "Since LibriSpeech-PC lacks some of the utterances from LibriSpeech, the total number of samples was reduced to 1,132, sourced from 39 speakers.",
       "zh": "由于 LibriSpeech-PC 缺少 LibriSpeech 中的部分语句，样本总数减少至 1,132 条，来自 39 位说话人。"
      },
      {
       "id": "s-3-3-2-3",
       "original": "For the audio prompt, we extracted the last three seconds from a randomly sampled speech file from the same speaker for each evaluation sample.6 We carried out both objective and subjective evaluations.",
       "zh": "对于每个评测样本的音频提示，我们从同一说话人的随机采样语音文件中提取最后 3 秒。6 我们进行了客观评测和主观评测。"
      },
      {
       "id": "s-3-3-2-4",
       "original": "For the objective evaluations, we generated samples using three random seeds, computed the objective metrics for each, and then calculated their average.",
       "zh": "在客观评测中，我们用 3 个随机种子生成样本，分别计算客观指标，然后取平均。"
      },
      {
       "id": "s-3-3-2-5",
       "original": "We computed the word error rate (WER) and speaker similarity (SIM-o).",
       "zh": "我们计算了词错误率（WER）和说话人相似度（SIM-o）。"
      },
      {
       "id": "s-3-3-2-6",
       "original": "The WER is indicative of the intelligibility of the generated samples, and for its calculation, we utilized a Hubert-large-based [37] ASR system.",
       "zh": "WER 反映生成样本的可懂度，计算时我们使用了基于 Hubert-large [37] 的 ASR 系统。"
      },
      {
       "id": "s-3-3-2-7",
       "original": "The SIM-o represents the speaker similarity between the audio prompt and the generated sample, which is estimated by computing the cosine similarity between the speaker embeddings of both.",
       "zh": "SIM-o 表示音频提示与生成样本之间的说话人相似度，通过计算两者说话人嵌入的余弦相似度来估计。"
      },
      {
       "id": "s-3-3-2-8",
       "original": "For the calculation of SIM-o, we used a WavLM-large-based [38] speaker verification model.",
       "zh": "在计算 SIM-o 时，我们使用了基于 WavLM-large [38] 的说话人验证模型。"
      }
     ]
    },
    {
     "id": "p-3-3-3",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-3-3-1",
       "original": "5We used all characters and symbols that we found in the training data without filtering.",
       "zh": "5我们使用的是训练数据中出现的所有字符和符号，不做任何过滤。"
      }
     ]
    },
    {
     "id": "p-3-3-4",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-3-4-1",
       "original": "6The test set used in our experiments can be accessed at: https:// github.com/microsoft/e2tts-test-suite.",
       "zh": "6我们实验中使用的测试集可在以下地址获取：https://github.com/microsoft/e2tts-test-suite。"
      }
     ]
    },
    {
     "id": "tab-3-3-1",
     "type": "table_caption",
     "page": 4,
     "original": "Table 1. Objective results for LibriSpeech-PC test-clean evaluation set. WER is expressed in percentage. † Our reproduction. LL, LH, and PP stand for Librilight, Libriheavy, and Proprietary, respectively.",
     "zh": "Table 1. LibriSpeech-PC test-clean 评测集的客观结果。WER 以百分比表示。† 我们的复现。LL、LH、PP 分别表示 Librilight、Libriheavy 和专有数据（Proprietary）。"
    }
   ]
  },
  {
   "id": "sec-id",
   "num": null,
   "level": 2,
   "page": 4,
   "title": {
    "original": "ID",
    "zh": "ID"
   },
   "blocks": [
    {
     "id": "p-id-1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-id-1-1",
       "original": "Model Data (hours) Init WER↓SIM-o↑ (GT) Ground Truth",
       "zh": "表头：Model / Data (hours) / Init / WER↓ / SIM-o↑——(GT) Ground Truth（后续照原文）。"
      }
     ]
    },
    {
     "id": "eq-id-1",
     "type": "equation",
     "page": 4,
     "original": "- - 2.0 0.695"
    },
    {
     "id": "eq-id-2",
     "type": "equation",
     "page": 4,
     "original": "(B1) VALL-E [8] LL (60K) Random"
    },
    {
     "id": "eq-id-3",
     "type": "equation",
     "page": 4,
     "original": "4.9 0.500"
    },
    {
     "id": "eq-id-4",
     "type": "equation",
     "page": 4,
     "original": "(B2) NaturalSpeech 3 [15] LL (60K) Random"
    },
    {
     "id": "eq-id-5",
     "type": "equation",
     "page": 4,
     "original": "2.6 0.632"
    },
    {
     "id": "eq-id-6",
     "type": "equation",
     "page": 4,
     "original": "(B3) Voicebox [18]† LL (60K) Random"
    },
    {
     "id": "eq-id-7",
     "type": "equation",
     "page": 4,
     "original": "2.1 0.658"
    },
    {
     "id": "eq-id-8",
     "type": "equation",
     "page": 4,
     "original": "(B4) Voicebox [18]† LH (50K) Random"
    },
    {
     "id": "eq-id-9",
     "type": "equation",
     "page": 4,
     "original": "2.2 0.667"
    },
    {
     "id": "eq-id-10",
     "type": "equation",
     "page": 4,
     "original": "(B5) Voicebox [18]† LH (50K) Pretrain [34]"
    },
    {
     "id": "eq-id-11",
     "type": "equation",
     "page": 4,
     "original": "2.2 0.695"
    },
    {
     "id": "eq-id-12",
     "type": "equation",
     "page": 4,
     "original": "(P1) E2 TTS LH (50K) Random"
    },
    {
     "id": "eq-id-13",
     "type": "equation",
     "page": 4,
     "original": "2.0 0.675"
    },
    {
     "id": "eq-id-14",
     "type": "equation",
     "page": 4,
     "original": "(P2) E2 TTS LH (50K) Pretrain [34]"
    },
    {
     "id": "eq-id-15",
     "type": "equation",
     "page": 4,
     "original": "1.9 0.708"
    },
    {
     "id": "eq-id-16",
     "type": "equation",
     "page": 4,
     "original": "(P3) E2 TTS PP (200K) Random"
    },
    {
     "id": "eq-id-17",
     "type": "equation",
     "page": 4,
     "original": "1.9 0.707"
    },
    {
     "id": "tab-id-1",
     "type": "table_caption",
     "page": 4,
     "original": "Table 2. Subjective results for LibriSpeech-PC test-clean evaluation set. † Our reproduction.",
     "zh": "Table 2. LibriSpeech-PC test-clean 评测集的主观结果。† 我们的复现。"
    }
   ]
  },
  {
   "id": "sec-id-2",
   "num": null,
   "level": 2,
   "page": 4,
   "title": {
    "original": "ID",
    "zh": "ID"
   },
   "blocks": [
    {
     "id": "p-id-2-1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-id-2-1-1",
       "original": "Model CMOS↑ SMOS↑ (GT) Ground Truth",
       "zh": "（表：Model × CMOS↑ × SMOS↑——(GT) Ground Truth 0.00/3.91±0.13；(B2) NaturalSpeech 3 [15] -0.98/4.76±0.06；(B4) Voicebox [18]† -0.78/4.73±0.06；(P1) E2 TTS -0.14/4.66±0.07；(P2) E2 TTS -0.05/4.65±0.08；(P3) E2 TTS -0.18/4.64±0.08。）主观评测包含两项：比较平均意见分（CMOS）与说话人相似度平均意见分（SMOS）。"
      }
     ]
    },
    {
     "id": "eq-id-2-1",
     "type": "equation",
     "page": 4,
     "original": "0.00 3.91±0.13"
    },
    {
     "id": "eq-id-2-2",
     "type": "equation",
     "page": 4,
     "original": "(B2) NaturalSpeech 3 [15]"
    },
    {
     "id": "eq-id-2-3",
     "type": "equation",
     "page": 4,
     "original": "-0.98 4.76±0.06"
    },
    {
     "id": "eq-id-2-4",
     "type": "equation",
     "page": 4,
     "original": "(B4) Voicebox [18]†"
    },
    {
     "id": "eq-id-2-5",
     "type": "equation",
     "page": 4,
     "original": "-0.78 4.73±0.06"
    },
    {
     "id": "eq-id-2-6",
     "type": "equation",
     "page": 4,
     "original": "(P1) E2 TTS"
    },
    {
     "id": "eq-id-2-7",
     "type": "equation",
     "page": 4,
     "original": "-0.14 4.66±0.07"
    },
    {
     "id": "eq-id-2-8",
     "type": "equation",
     "page": 4,
     "original": "(P2) E2 TTS"
    },
    {
     "id": "eq-id-2-9",
     "type": "equation",
     "page": 4,
     "original": "-0.05 4.65±0.08"
    },
    {
     "id": "eq-id-2-10",
     "type": "equation",
     "page": 4,
     "original": "(P3) E2 TTS"
    },
    {
     "id": "eq-id-2-11",
     "type": "equation",
     "page": 4,
     "original": "-0.18 4.64±0.08"
    },
    {
     "id": "p-id-2-2",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-id-2-2-1",
       "original": "For the subjective assessments, we conducted two tests: the Comparative Mean Opinion Score (CMOS) and the Speaker Similarity Mean Opinion Score (SMOS).",
       "zh": "（表：Model × CMOS↑ × SMOS↑——(GT) Ground Truth 0.00/3.91±0.13；(B2) NaturalSpeech 3 [15] -0.98/4.76±0.06；(B4) Voicebox [18]† -0.78/4.73±0.06；(P1) E2 TTS -0.14/4.66±0.07；(P2) E2 TTS -0.05/4.65±0.08；(P3) E2 TTS -0.18/4.64±0.08。）主观评测包含两项：比较平均意见分（CMOS）与说话人相似度平均意见分（SMOS）。"
      },
      {
       "id": "s-id-2-2-2",
       "original": "We evaluated 39 samples for both tests, with one sample per speaker from our test-clean set.",
       "zh": "两项测试各评测 39 个样本，每个样本来自我们 test-clean 集中的一位说话人。"
      },
      {
       "id": "s-id-2-2-3",
       "original": "Each sample was assessed by 12 Native English evaluators.",
       "zh": "每个样本由 12 位以英语为母语的评测者评分。"
      },
      {
       "id": "s-id-2-2-4",
       "original": "In the CMOS test [15], evaluators were shown the ground-truth sample and the generated sample side-by-side without knowing which was the ground-truth, and were asked to rate the naturalness on a 7-point scale (from -3 to 3), where a negative value indicates a preference for the ground-truth and a positive value indicates the opposite.",
       "zh": "在 CMOS 测试 [15] 中，评测者并排看到真实样本与生成样本，但不知道哪个是真实样本，并被要求在 7 分制（-3 到 3）上评价自然度，负值表示偏好真实样本，正值表示相反。"
      },
      {
       "id": "s-id-2-2-5",
       "original": "In the SMOS test, evaluators were presented with the audio prompt and the generated sample, and asked to rate the speaker similarity on a scale of 1 (not similar at all) to 5 (identical), with increments of 1.",
       "zh": "在 SMOS 测试中，评测者看到音频提示和生成样本，并被要求按 1（完全不相似）到 5（完全相同）的尺度评价说话人相似度，步长为 1。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-3-4",
   "num": "3.4",
   "level": 2,
   "page": 4,
   "title": {
    "original": "Main results",
    "zh": "3.4 主要结果"
   },
   "blocks": [
    {
     "id": "p-3-4-1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-4-1-1",
       "original": "In our experiments, we conducted a comparison between our E2 TTS models and three other models: Voicebox [18], VALL-E [8], and NaturalSpeech 3 [15].",
       "zh": "在实验中，我们将 E2 TTS 模型与另外三个模型进行了比较：Voicebox [18]、VALL-E [8] 和 NaturalSpeech 3 [15]。"
      },
      {
       "id": "s-3-4-1-2",
       "original": "We utilized our own reimplementation of the Voicebox model, which was based on the same model configuration with E2 TTS except that the Vicebox model is trained with frame-wise phoneme alignment.",
       "zh": "我们使用了我们自己重新实现的 Voicebox 模型，它与 E2 TTS 采用相同的模型配置，只是 Voicebox 模型使用帧级音素对齐进行训练。"
      },
      {
       "id": "s-3-4-1-3",
       "original": "During the inference, we used CFG with a guidance strength of 1.0 for both E2 TTS and Voicebox.",
       "zh": "推理时，我们对 E2 TTS 和 Voicebox 都使用 CFG，引导强度为 1.0。"
      },
      {
       "id": "s-3-4-1-4",
       "original": "We employed the midpoint ODE solver with a number of function evaluations of 32.",
       "zh": "我们采用中点 ODE 求解器，函数评估次数（NFE）为 32。"
      }
     ]
    },
    {
     "id": "p-3-4-2",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-4-2-1",
       "original": "Table 1 presents the objective evaluation results for the baseline and E2 TTS models across various configurations.",
       "zh": "表 1 给出基线与 E2 TTS 模型在多种配置下的客观评测结果。"
      },
      {
       "id": "s-3-4-2-2",
       "original": "By comparing the (B4) and (P1) systems, we observe that the E2 TTS model achieved better WER and SIM-o than the Voicebox model when both were trained on the Libriheavy dataset.",
       "zh": "对比 (B4) 与 (P1) 系统可见，同样在 Libriheavy 数据集上训练时，E2 TTS 的 WER 与 SIM-o 优于 Voicebox。"
      },
      {
       "id": "s-3-4-2-3",
       "original": "This trend holds even when we initialize the model with unsupervised pre-training [34] ((B5) vs. (P2)), where the (P2) system achieved the best WER (1.9%) and SIM-o (0.708) which are better than those of the ground-truth audio.",
       "zh": "即使用无监督预训练初始化 [34]（(B5) vs. (P2)），这一趋势依然成立：(P2) 系统取得最佳 WER (1.9%) 与 SIM-o (0.708)，甚至优于真实音频。"
      },
      {
       "id": "s-3-4-2-4",
       "original": "Finally, by using larger training data (P3), E2 TTS achieved the same best WER (1.9%) and the second best SIM-o (0.707) even when the model is trained from scratch, showcasing the scalability of E2 TTS.",
       "zh": "最后，使用更大训练数据 (P3) 时，即使从头训练，E2 TTS 也取得相同的最佳 WER (1.9%) 与第二好的 SIM-o (0.707)，展示了其可扩展性。"
      },
      {
       "id": "s-3-4-2-5",
       "original": "(B4) - Voicebox (P1) - E2 TTS",
       "zh": "（图例：(B4) - Voicebox / (P1) - E2 TTS。）"
      }
     ]
    },
    {
     "id": "eq-3-4-1",
     "type": "equation",
     "page": 4,
     "original": "16% 12%"
    },
    {
     "id": "eq-3-4-2",
     "type": "equation",
     "page": 4,
     "original": "WER"
    },
    {
     "id": "eq-3-4-3",
     "type": "equation",
     "page": 4,
     "original": "8% 4% 0% 10% 20% 30% 40% 50% 60% 70% 80% 90% 100%"
    },
    {
     "id": "eq-3-4-4",
     "type": "equation",
     "page": 4,
     "original": "Training Progress"
    },
    {
     "id": "eq-3-4-5",
     "type": "equation",
     "page": 4,
     "original": "0.74 0.70 0.66"
    },
    {
     "id": "eq-3-4-6",
     "type": "equation",
     "page": 4,
     "original": "SIM-o"
    },
    {
     "id": "eq-3-4-7",
     "type": "equation",
     "page": 4,
     "original": "0.62"
    },
    {
     "id": "eq-3-4-8",
     "type": "equation",
     "page": 4,
     "original": "(B4) - Voicebox (P1) - E2 TTS"
    },
    {
     "id": "eq-3-4-9",
     "type": "equation",
     "page": 4,
     "original": "0.58 0.54 10% 20% 30% 40% 50% 60% 70% 80% 90% 100%"
    },
    {
     "id": "p-3-4-3",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-4-3-1",
       "original": "Training Progress (B5) - Voicebox (P2) - E2 TTS",
       "zh": "（图横轴：Training Progress（训练进度）；图例：(B5) - Voicebox / (P2) - E2 TTS。）"
      }
     ]
    },
    {
     "id": "eq-3-4-10",
     "type": "equation",
     "page": 4,
     "original": "16% 12%"
    },
    {
     "id": "eq-3-4-11",
     "type": "equation",
     "page": 4,
     "original": "WER"
    },
    {
     "id": "eq-3-4-12",
     "type": "equation",
     "page": 4,
     "original": "8% 4% 0% 10% 20% 30% 40% 50% 60% 70% 80% 90% 100%"
    },
    {
     "id": "eq-3-4-13",
     "type": "equation",
     "page": 4,
     "original": "Training Progress"
    },
    {
     "id": "eq-3-4-14",
     "type": "equation",
     "page": 4,
     "original": "0.74 0.70 0.66"
    },
    {
     "id": "eq-3-4-15",
     "type": "equation",
     "page": 4,
     "original": "SIM-o"
    },
    {
     "id": "eq-3-4-16",
     "type": "equation",
     "page": 4,
     "original": "0.62"
    },
    {
     "id": "eq-3-4-17",
     "type": "equation",
     "page": 4,
     "original": "(B5) - Voicebox (P2) - E2 TTS"
    },
    {
     "id": "eq-3-4-18",
     "type": "equation",
     "page": 4,
     "original": "0.58 0.54 10% 20% 30% 40% 50% 60% 70% 80% 90% 100%"
    },
    {
     "id": "p-3-4-4",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-4-4-1",
       "original": "Training Progress",
       "zh": "（图横轴：Training Progress（训练进度）。）"
      }
     ]
    },
    {
     "id": "fig-3-4-1",
     "type": "figure_caption",
     "page": 5,
     "original": "Fig. 4. The training progress of Voicebox and E2TTS models. The top row shows WER and the bottom row shows SIM progressions.",
     "zh": "图 4. Voicebox 和 E2 TTS 模型的训练过程。上排为 WER，下排为 SIM 的变化曲线。"
    },
    {
     "id": "tab-3-4-1",
     "type": "table_caption",
     "page": 5,
     "original": "Table 3. Comparison between the basic E2 TTS and E2 TTS X1. While the basic E2 TTS requires the transcription of the audio prompt during inference, E2 TTS X1 does not require it. WER is expressed in percentage.",
     "zh": "Table 3. 基础版 E2 TTS 与 E2 TTS X1 的比较。基础版 E2 TTS 在推理时需要音频提示的转录，E2 TTS X1 则不需要。WER 以百分比表示。"
    }
   ]
  },
  {
   "id": "sec-id-3",
   "num": null,
   "level": 2,
   "page": 5,
   "title": {
    "original": "ID",
    "zh": "ID"
   },
   "blocks": [
    {
     "id": "p-id-3-1",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-id-3-1-1",
       "original": "Model Init WER↓ SIM-o↑ (P1) E2 TTS Random",
       "zh": "（表：Model × Init × WER↓ × SIM-o↑——(P1) E2 TTS 随机初始化 2.0/0.675；(P2) E2 TTS 预训练 [34] 1.9/0.708；(P1-X1) E2 TTS X1 随机 2.0/0.664；(P2-X1) E2 TTS X1 预训练 [34] 2.0/0.705。）值得注意的是，尽管框架极其简单，E2 TTS 仍超过了 VALL-E、NaturalSpeech 3、Voicebox 等所有强基线。"
      }
     ]
    },
    {
     "id": "eq-id-3-1",
     "type": "equation",
     "page": 5,
     "original": "2.0 0.675"
    },
    {
     "id": "eq-id-3-2",
     "type": "equation",
     "page": 5,
     "original": "(P2) E2 TTS Pre-trained [34]"
    },
    {
     "id": "eq-id-3-3",
     "type": "equation",
     "page": 5,
     "original": "1.9 0.708"
    },
    {
     "id": "eq-id-3-4",
     "type": "equation",
     "page": 5,
     "original": "(P1-X1) E2 TTS X1 Random"
    },
    {
     "id": "eq-id-3-5",
     "type": "equation",
     "page": 5,
     "original": "2.0 0.664"
    },
    {
     "id": "eq-id-3-6",
     "type": "equation",
     "page": 5,
     "original": "(P2-X1) E2 TTS X1 Pre-trained [34]"
    },
    {
     "id": "eq-id-3-7",
     "type": "equation",
     "page": 5,
     "original": "2.0 0.705"
    },
    {
     "id": "p-id-3-2",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-id-3-2-1",
       "original": "It is noteworthy that E2 TTS achieved superior performance compared to all strong baselines, including VALL-E, NaturalSpeech 3, and Voicebox, despite its extremely simple framework.",
       "zh": "（表：Model × Init × WER↓ × SIM-o↑——(P1) E2 TTS 随机初始化 2.0/0.675；(P2) E2 TTS 预训练 [34] 1.9/0.708；(P1-X1) E2 TTS X1 随机 2.0/0.664；(P2-X1) E2 TTS X1 预训练 [34] 2.0/0.705。）值得注意的是，尽管框架极其简单，E2 TTS 仍超过了 VALL-E、NaturalSpeech 3、Voicebox 等所有强基线。"
      }
     ]
    },
    {
     "id": "p-id-3-3",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-id-3-3-1",
       "original": "Table 2 illustrated the subjective evaluation results for NaturalSpeech 3, Voicebox, and E2 TTS.",
       "zh": "Table 2 展示了 NaturalSpeech 3、Voicebox 和 E2 TTS 的主观评测结果。"
      },
      {
       "id": "s-id-3-3-2",
       "original": "Firstly, all variants of E2 TTS, from (P1) to (P3), showed a better CMOS score compared to NaturalSpeech 3 and Voicebox.",
       "zh": "首先，E2 TTS 的所有变体（从 (P1) 到 (P3)）的 CMOS 分数都优于 NaturalSpeech 3 和 Voicebox。"
      },
      {
       "id": "s-id-3-3-3",
       "original": "In particular, the (P2) model achieved a CMOS score of -0.05, which is considered to have a level of naturalness indistinguishable from the ground truth [15, 24].7 The comparison between (B4) and (P1) suggests that the use of phoneme alignment was the major bottleneck in achieving better naturalness.",
       "zh": "特别是，(P2) 模型取得了 -0.05 的 CMOS 分数，这被认为达到了与真实样本难以区分的自然度水平 [15, 24]。7 (B4) 与 (P1) 的比较表明，使用音素对齐是实现更高自然度的主要瓶颈。"
      },
      {
       "id": "s-id-3-3-4",
       "original": "Regarding speaker similarity, all the models we tested showed a better SMOS compared to the ground truth, a phenomenon also observed in NaturalSpeech 3 [15].8 Among the tested systems, E2 TTS achieved a comparable SMOS to Voicebox and NaturalSpeech 3.",
       "zh": "关于说话人相似度，我们测试的所有模型的 SMOS 都优于真实样本，NaturalSpeech 3 [15] 中也观察到了这一现象。8 在所测系统中，E2 TTS 取得了与 Voicebox 和 NaturalSpeech 3 相当的 SMOS。"
      }
     ]
    },
    {
     "id": "p-id-3-4",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-id-3-4-1",
       "original": "Overall, E2 TTS demonstrated a robust zero-shot TTS capability that is either superior or comparable to strong baselines, including Voicebox and NaturalSpeech 3.",
       "zh": "总体而言，E2 TTS 展示了鲁棒的零样本 TTS 能力，优于或可比于 Voicebox、NaturalSpeech 3 等强基线。"
      },
      {
       "id": "s-id-3-4-2",
       "original": "The comparison between Voicebox and E2 TTS revealed that the use of phoneme alignment was the primary obstacle in achieving natural-sounding audio.",
       "zh": "Voicebox 与 E2 TTS 的比较表明，使用音素对齐是实现自然听感音频的主要障碍。"
      },
      {
       "id": "s-id-3-4-3",
       "original": "With a simple training scheme, E2 TTS can be easily scaled up to accommodate large training data.",
       "zh": "凭借简单的训练方案，E2 TTS 可以轻松扩展以适配大规模训练数据。"
      },
      {
       "id": "s-id-3-4-4",
       "original": "This resulted in human-level speaker similarity, intelligibility, and a level of naturalness that is indistinguishable from a human’s voice in the zero-shot TTS setting, despite the framework’s extreme simplicity.",
       "zh": "这使得在零样本 TTS 设定下达到了人类水平的说话人相似度、可懂度，以及与人类语音难以区分的自然度——尽管该框架极其简单。"
      }
     ]
    },
    {
     "id": "p-id-3-5",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-id-3-5-1",
       "original": "7In the evaluation, E2 TTS was judged to be better in 33% of samples, while the ground truth was better in another 33% of samples.",
       "zh": "7在评测中，E2 TTS 在 33% 的样本上被评为更好，真实样本在另外 33% 的样本上被评为更好。"
      },
      {
       "id": "s-id-3-5-2",
       "original": "The remaining samples were judged to be of equal quality.",
       "zh": "其余样本被评为质量相当。"
      }
     ]
    },
    {
     "id": "p-id-3-6",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-id-3-6-1",
       "original": "8In LibriSpeech, some speakers utilized varying voice characteristics for different characters in the book, leading to a low SMOS for the ground truth.",
       "zh": "8在 LibriSpeech 中，一些说话人为书中的不同角色使用了不同的声音特征，导致真实样本的 SMOS 偏低。"
      }
     ]
    },
    {
     "id": "tab-id-3-1",
     "type": "table_caption",
     "page": 5,
     "original": "Table 4. The WER (%) and SIM-o of E2 TTS X2 where a word is randomly replaced with the phoneme sequence during inference. Even when we replaced 50% of words into phoneme sequences, E2 TTS X2 worked reasonably well. This indicates that we can specify the pronunciation of a new term without retraining.",
     "zh": "Table 4. E2 TTS X2 的 WER（%）与 SIM-o：推理时随机将单词替换为音素序列。即使我们把 50% 的单词替换为音素序列，E2 TTS X2 仍能正常工作。这表明我们可以在不重新训练的情况下指定新术语的发音。"
    }
   ]
  },
  {
   "id": "sec-id-4",
   "num": null,
   "level": 2,
   "page": 5,
   "title": {
    "original": "ID",
    "zh": "ID"
   },
   "blocks": [
    {
     "id": "p-id-4-1",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-id-4-1-1",
       "original": "Model Init Phoneme % WER↓ SIM-o↑ (P1) E2 TTS Random",
       "zh": "表头：Model / Init / Phoneme % / WER↓ / SIM-o↑——(P1) E2 TTS Random（后续照原文）。"
      }
     ]
    },
    {
     "id": "eq-id-4-1",
     "type": "equation",
     "page": 5,
     "original": "0% 2.0 0.675"
    },
    {
     "id": "eq-id-4-2",
     "type": "equation",
     "page": 5,
     "original": "(P1-X2) E2 TTS X2 Random"
    },
    {
     "id": "eq-id-4-3",
     "type": "equation",
     "page": 5,
     "original": "0% 2.0 0.679 25% 2.0 0.678 50% 2.1 0.679"
    },
    {
     "id": "eq-id-4-4",
     "type": "equation",
     "page": 5,
     "original": "(P2) E2 TTS Pre-trained [34]"
    },
    {
     "id": "eq-id-4-5",
     "type": "equation",
     "page": 5,
     "original": "0% 1.9 0.708"
    },
    {
     "id": "eq-id-4-6",
     "type": "equation",
     "page": 5,
     "original": "(P2-X2) E2 TTS X2 Pre-trained [34]"
    },
    {
     "id": "eq-id-4-7",
     "type": "equation",
     "page": 5,
     "original": "0% 1.9 0.708 25% 2.0 0.708 50% 2.1 0.707"
    }
   ]
  },
  {
   "id": "sec-3-5",
   "num": "3.5",
   "level": 2,
   "page": 5,
   "title": {
    "original": "Evaluation of E2 TTS extensions",
    "zh": "3.5 E2 TTS 扩展的评测"
   },
   "blocks": [
    {
     "id": "p-3-5-1",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-3-5-1-1",
       "original": "3.5.1.",
       "zh": "3.5.1."
      },
      {
       "id": "s-3-5-1-2",
       "original": "Evaluation of the extension 1 The results for the E2 TTS X1 models are shown in Table 3.",
       "zh": "扩展 1 的评测。E2 TTS X1 模型的结果见 Table 3。"
      },
      {
       "id": "s-3-5-1-3",
       "original": "These results indicate that the E2 TTS X1 model has achieved results nearly identical to those of the E2 TTS model, especially when the model was initialized by unsupervised pre-training [34].",
       "zh": "这些结果表明，E2 TTS X1 模型取得了与 E2 TTS 模型几乎相同的结果，尤其是在模型由无监督预训练 [34] 初始化时。"
      },
      {
       "id": "s-3-5-1-4",
       "original": "E2 TTS X1 does not require the transcription of the audio prompt, which greatly enhances its usability.",
       "zh": "E2 TTS X1 不需要音频提示的转录，这极大地增强了其易用性。"
      }
     ]
    },
    {
     "id": "p-3-5-2",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-3-5-2-1",
       "original": "3.5.2.",
       "zh": "3.5.2."
      },
      {
       "id": "s-3-5-2-2",
       "original": "Evaluation of the extension 2 In this experiment, we trained the E2 TTS X2 models with a phoneme replacement rate of 15%.",
       "zh": "扩展 2 的评测。在本实验中，我们以 15% 的音素替换率训练 E2 TTS X2 模型。"
      },
      {
       "id": "s-3-5-2-3",
       "original": "During inference, we randomly replaced words in the test-clean dataset with phoneme sequences, with a probability ranging from 0% to 50%.",
       "zh": "推理时，我们以 0% 到 50% 的概率随机将 test-clean 数据集中的单词替换为音素序列。"
      }
     ]
    },
    {
     "id": "p-3-5-3",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-3-5-3-1",
       "original": "Table 4 shows the result.",
       "zh": "Table 4 展示了结果。"
      },
      {
       "id": "s-3-5-3-2",
       "original": "We first observed that E2 TTS X2 achieved parity results when no words were replaced with phoneme sequences.",
       "zh": "我们首先观察到，当没有单词被替换为音素序列时，E2 TTS X2 取得了与基础版持平的结果。"
      },
      {
       "id": "s-3-5-3-3",
       "original": "This shows that we can introduce extension 2 without any drawbacks.",
       "zh": "这表明我们可以在不带来任何损失的情况下引入扩展 2。"
      },
      {
       "id": "s-3-5-3-4",
       "original": "We also observed that the E2 TTS X2 model showed only marginal degradation of WER, even when we replaced 50% of words with phoneme sequences.",
       "zh": "我们还观察到，即使将 50% 的单词替换为音素序列，E2 TTS X2 模型的 WER 也只有轻微下降。"
      },
      {
       "id": "s-3-5-3-5",
       "original": "This result indicates that we can specify the pronunciation of a new term without retraining the E2 TTS model.",
       "zh": "该结果表明，我们可以在不重新训练 E2 TTS 模型的情况下指定新术语的发音。"
      }
     ]
    },
    {
     "id": "eq-3-5-1",
     "type": "equation",
     "page": 6,
     "original": "0.850"
    },
    {
     "id": "eq-3-5-2",
     "type": "equation",
     "page": 6,
     "original": "SIM-o SIM-o"
    },
    {
     "id": "eq-3-5-3",
     "type": "equation",
     "page": 6,
     "original": "0.825 4% 0.800 4%"
    },
    {
     "id": "eq-3-5-4",
     "type": "equation",
     "page": 6,
     "original": "SIM-o WER WER"
    },
    {
     "id": "eq-3-5-5",
     "type": "equation",
     "page": 6,
     "original": "3% 0.775 3% 2% 0.750 2% 1% 0.725 1% 0.850 0.850"
    },
    {
     "id": "eq-3-5-6",
     "type": "equation",
     "page": 6,
     "original": "SIM-o"
    },
    {
     "id": "eq-3-5-7",
     "type": "equation",
     "page": 6,
     "original": "0.825 0.825 0.800 4% 0.800"
    },
    {
     "id": "eq-3-5-8",
     "type": "equation",
     "page": 6,
     "original": "SIM-o SIM-o WER"
    },
    {
     "id": "eq-3-5-9",
     "type": "equation",
     "page": 6,
     "original": "0.775 3% 0.775 0.750 2% 0.750 0.725 1% 0.725 [4, 5) [5, 6) [6, 7) [7, 8) [8, 9) [9, 10]"
    },
    {
     "id": "eq-3-5-10",
     "type": "equation",
     "page": 6,
     "original": "Audio Prompt Length (s)"
    },
    {
     "id": "eq-3-5-11",
     "type": "equation",
     "page": 6,
     "original": "0% 0.700 0% [4, 5) [5, 6) [6, 7) [7, 8) [8, 9) [9, 10]"
    },
    {
     "id": "eq-3-5-12",
     "type": "equation",
     "page": 6,
     "original": "Audio Prompt Length (s)"
    },
    {
     "id": "eq-3-5-13",
     "type": "equation",
     "page": 6,
     "original": "0.700 0% 0.700 [4, 5) [5, 6) [6, 7) [7, 8) [8, 9) [9, 10]"
    },
    {
     "id": "p-3-5-4",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-3-5-4-1",
       "original": "Audio Prompt Length (s) (P2) E2 TTS (P1) E2 TTS (P3) E2 TTS",
       "zh": "（图横轴：Audio Prompt Length (s)；图例：(P2) E2 TTS / (P1) E2 TTS / (P3) E2 TTS。）"
      }
     ]
    },
    {
     "id": "fig-3-5-1",
     "type": "figure_caption",
     "page": 6,
     "original": "Fig. 5. The results of WER and SIM, shown in buckets according to the audio prompt length. The left, middle, and right plots show E2 TTS with (P1), (P2), and (P3) configurations, respectively.",
     "zh": "图 5. 按音频提示长度分桶展示的 WER 和 SIM 结果。左、中、右图分别为 (P1)、(P2)、(P3) 配置下的 E2 TTS。"
    },
    {
     "id": "eq-3-5-14",
     "type": "equation",
     "page": 6,
     "original": "5%"
    },
    {
     "id": "p-3-5-5",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-3-5-5-1",
       "original": "(P1) - E2 TTS (P2) - E2 TTS (P3) - E2 TTS",
       "zh": "（图例：(P1) - E2 TTS / (P2) - E2 TTS / (P3) - E2 TTS。）"
      }
     ]
    },
    {
     "id": "eq-3-5-15",
     "type": "equation",
     "page": 6,
     "original": "4%"
    },
    {
     "id": "eq-3-5-16",
     "type": "equation",
     "page": 6,
     "original": "WER"
    },
    {
     "id": "eq-3-5-17",
     "type": "equation",
     "page": 6,
     "original": "3% 2% 1% 0.7 0.8 0.9 1.0 1.1 1.2 1.3"
    },
    {
     "id": "eq-3-5-18",
     "type": "equation",
     "page": 6,
     "original": "Speech Rate"
    },
    {
     "id": "eq-3-5-19",
     "type": "equation",
     "page": 6,
     "original": "0.72 0.70 0.68"
    },
    {
     "id": "eq-3-5-20",
     "type": "equation",
     "page": 6,
     "original": "SIM-o"
    },
    {
     "id": "eq-3-5-21",
     "type": "equation",
     "page": 6,
     "original": "0.66"
    },
    {
     "id": "p-3-5-6",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-3-5-6-1",
       "original": "(P1) - E2 TTS (P2) - E2 TTS (P3) - E2 TTS",
       "zh": "（图例：(P1) - E2 TTS / (P2) - E2 TTS / (P3) - E2 TTS。）"
      }
     ]
    },
    {
     "id": "eq-3-5-22",
     "type": "equation",
     "page": 6,
     "original": "0.64 0.62 0.60 0.7 0.8 0.9 1.0 1.1 1.2 1.3"
    },
    {
     "id": "p-3-5-7",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-3-5-7-1",
       "original": "Speech Rate",
       "zh": "（图纵轴：Speech Rate（语速）。）"
      }
     ]
    },
    {
     "id": "fig-3-5-2",
     "type": "figure_caption",
     "page": 6,
     "original": "Fig. 6. WER and SIM-o of different speech rates between 0.7 to 1.3 for E2TTS with (P1), (P2), and (P3) configurations.",
     "zh": "图 6. 在 (P1)、(P2)、(P3) 配置下，语速在 0.7 到 1.3 之间变化时 E2 TTS 的 WER 和 SIM-o。"
    }
   ]
  },
  {
   "id": "sec-3-6",
   "num": "3.6",
   "level": 2,
   "page": 6,
   "title": {
    "original": "Analysis of the system behavior",
    "zh": "3.6 系统行为分析"
   },
   "blocks": [
    {
     "id": "p-3-6-1",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-3-6-1-1",
       "original": "3.6.1.",
       "zh": "3.6.1."
      },
      {
       "id": "s-3-6-1-2",
       "original": "Training progress",
       "zh": "训练过程。"
      }
     ]
    },
    {
     "id": "fig-3-6-1",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "fig-3-6-1-s1",
       "original": "Fig. 4 illustrates the training progress of the (B4)-Voicebox, (B5)- Voicebox, (P1)-E2 TTS, and (P2)-E2 TTS models. The upper graphs represent the training progress as measured by WER, while the lower graphs depict the progress as measured by SIM-o. We present a comparison between (B4)-Voicebox and (P1)-E2 TTS, as well as between (B5)-Voicebox and (P2)-E2 TTS. The former pair was trained from scratch, while the latter was initialized by unsupervised pretraining [34]. From the WER graphs, we observe that the Voicebox models demonstrated a good WER even at the 10% training point, owing to the use of frame-wise phoneme alignment. On the other hand, E2 TTS required significantly more training to converge. Interestingly, E2 TTS achieved a better WER at the end of the training. We speculate this is because the E2 TTS model learned a more effective grapheme-to-phoneme mapping based on the large training data, compared to what was used for Voicebox. From the SIM-o graphs, we also observed that E2 TTS required more training iteration, but it ultimately achieved a better result at the end of the training. We believe this suggests the superiority of E2 TTS, where the audio model and duration model are jointly learned as a single flow-matching Transformer.",
       "zh": "图 4 展示了 (B4)-Voicebox、(B5)-Voicebox、(P1)-E2 TTS 和 (P2)-E2 TTS 模型的训练过程。上方图表以 WER 衡量训练进程，下方图表以 SIM-o 衡量。我们比较了 (B4)-Voicebox 与 (P1)-E2 TTS，以及 (B5)-Voicebox 与 (P2)-E2 TTS。前一对从头训练，后一对由无监督预训练 [34] 初始化。从 WER 图可见，得益于帧级音素对齐，Voicebox 模型在训练到 10% 时就已表现出良好的 WER。另一方面，E2 TTS 需要明显更多的训练才能收敛。有趣的是，E2 TTS 在训练结束时取得了更好的 WER。我们推测这是因为 E2 TTS 模型基于大规模训练数据学到了比 Voicebox 所用方式更有效的字位到音素映射。从 SIM-o 图也观察到，E2 TTS 需要更多训练迭代，但最终取得了更好的结果。我们认为这表明 E2 TTS 的优越性：音频模型和时长模型以单一流匹配 Transformer 的形式联合学习。"
      }
     ]
    },
    {
     "id": "p-3-6-2",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-3-6-2-1",
       "original": "3.6.2.",
       "zh": "3.6.2."
      },
      {
       "id": "s-3-6-2-2",
       "original": "Impact of audio prompt length During the inference of E2 TTS, the model needs to automatically identify the boundary of yaud and ytext in ˆy based on the audio prompt ˆsaud.",
       "zh": "音频提示长度的影响。在 E2 TTS 推理过程中，模型需要基于音频提示 ŝaud 自动识别 ŷ 中 yaud 与 ytext 的边界。"
      },
      {
       "id": "s-3-6-2-3",
       "original": "Otherwise, the generated audio may either contain a part of yaud or miss a part of ytext.",
       "zh": "否则，生成的音频可能会包含 yaud 的一部分，或者缺少 ytext 的一部分。"
      },
      {
       "id": "s-3-6-2-4",
       "original": "This is not a trivial problem, and E2 TTS could show a deteriorated result when the length of the audio prompt ˆsaud is long.",
       "zh": "这不是一个简单的问题，当音频提示 ŝaud 较长时，E2 TTS 的结果可能会变差。"
      }
     ]
    },
    {
     "id": "p-3-6-3",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-3-6-3-1",
       "original": "To examine the capability of E2 TTS, we evaluated the WER and SIM-o with different audio prompt lengths.",
       "zh": "为了考察 E2 TTS 的能力，我们在不同音频提示长度下评测了 WER 和 SIM-o。"
      },
      {
       "id": "s-3-6-3-2",
       "original": "The result is shown in Fig. 5.",
       "zh": "结果见 Fig. 5。"
      },
      {
       "id": "s-3-6-3-3",
       "original": "In this experiment, we utilized the entire audio prompts instead of using the last 3 seconds, and categorized the result based on the length of the audio prompts.",
       "zh": "在本实验中，我们使用完整的音频提示而不是最后 3 秒，并按音频提示长度对结果分类。"
      },
      {
       "id": "s-3-6-3-4",
       "original": "As shown in the figure, we did not observe any obvious pattern between the WER and the length of the audio prompt.",
       "zh": "如图所示，我们没有观察到 WER 与音频提示长度之间有任何明显的规律。"
      },
      {
       "id": "s-3-6-3-5",
       "original": "This suggests that E2 TTS works reasonably well even when the prompt length is as long as 10 seconds.",
       "zh": "这表明即使提示长度达到 10 秒，E2 TTS 也能正常工作。"
      },
      {
       "id": "s-3-6-3-6",
       "original": "On the other hand, SIM-o significantly improved when the audio prompt length increased, which suggests the scalability of E2 TTS with respect to the audio prompt length.",
       "zh": "另一方面，当音频提示长度增加时，SIM-o 显著提升，这说明 E2 TTS 在音频提示长度上具有可扩展性。"
      }
     ]
    },
    {
     "id": "p-3-6-4",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-3-6-4-1",
       "original": "3.6.3.",
       "zh": "3.6.3."
      },
      {
       "id": "s-3-6-4-2",
       "original": "Impact of changing the speech rate We further examined the model’s ability to produce suitable content when altering the total duration input.",
       "zh": "改变语速的影响。我们进一步考察了模型在改变总时长输入时生成合适内容的能力。"
      },
      {
       "id": "s-3-6-4-3",
       "original": "In this experiment, we adjusted the total duration by multiplying it by",
       "zh": "在本实验中，我们通过将总时长乘以 1/sr 来调整它，其中 sr 表示语速。"
      }
     ]
    },
    {
     "id": "eq-3-6-1",
     "type": "equation",
     "page": 6,
     "original": "1"
    },
    {
     "id": "p-3-6-5",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-3-6-5-1",
       "original": "sr , where sr represents the speech rate.",
       "zh": "在本实验中，我们通过将总时长乘以 1/sr 来调整它，其中 sr 表示语速。"
      },
      {
       "id": "s-3-6-5-2",
       "original": "The results are shown in Fig. 6.",
       "zh": "结果见 Fig. 6。"
      },
      {
       "id": "s-3-6-5-3",
       "original": "As depicted in the graphs, the E2 TTS model exhibited only a moderate increase in WER while maintaining a high SIM-o, even in the challenging cases of sr = 0.7 and sr = 1.3.",
       "zh": "如图所示，即使在 sr = 0.7 和 sr = 1.3 这样有挑战性的情况下，E2 TTS 模型的 WER 也只是适度上升，同时保持了较高的 SIM-o。"
      },
      {
       "id": "s-3-6-5-4",
       "original": "This result suggests the robustness of E2 TTS with respect to the total duration input.",
       "zh": "该结果表明 E2 TTS 对总时长输入具有鲁棒性。"
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
    "original": "CONCLUSIONS",
    "zh": "4 结论"
   },
   "blocks": [
    {
     "id": "p-4-1",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-4-1-1",
       "original": "We introduced E2 TTS, a novel fully NAR zero-shot TTS.",
       "zh": "我们提出了 E2 TTS，一个新颖的完全 NAR 零样本 TTS。"
      },
      {
       "id": "s-4-1-2",
       "original": "In the E2 TTS framework, the text input is converted into a character sequence with filler tokens to match the length of the input character sequence and the output mel-filterbank sequence.",
       "zh": "在 E2 TTS 框架中，文本输入被转换为带填充 token 的字符序列，使输入字符序列与输出 mel 滤波器组序列的长度相匹配。"
      },
      {
       "id": "s-4-1-3",
       "original": "The flow-matching-based mel spectrogram generator is then trained based on the audio infilling task.",
       "zh": "基于流匹配的 mel 频谱图生成器随后在音频填充任务上训练。"
      },
      {
       "id": "s-4-1-4",
       "original": "Despite its simplicity, E2 TTS achieved state-of-the-art zero-shot TTS capabilities that were comparable to or surpass previous works, including Voicebox and NaturalSpeech 3.",
       "zh": "尽管结构简单，E2 TTS 达到了最先进的零样本 TTS 能力，可与包括 Voicebox 和 NaturalSpeech 3 在内的先前工作相媲美甚至超越它们。"
      },
      {
       "id": "s-4-1-5",
       "original": "The simplicity of E2 TTS also allowed for flexibility in the input representation.",
       "zh": "E2 TTS 的简洁性还带来了输入表示上的灵活性。"
      },
      {
       "id": "s-4-1-6",
       "original": "We proposed several variants of E2 TTS to improve usability during inference.",
       "zh": "我们提出了 E2 TTS 的若干变体，以提升推理时的易用性。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-5",
   "num": "5",
   "level": 1,
   "page": 7,
   "title": {
    "original": "REFERENCES",
    "zh": "5 参考文献"
   },
   "blocks": [
    {
     "id": "p-5-1",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-5-1-1",
       "original": "[1] Yi Ren, Yangjun Ruan, Xu Tan, Tao Qin, Sheng Zhao, Zhou Zhao, and Tie-Yan Liu, “FastSpeech: Fast, robust and controllable text to speech,” Proc.",
       "zh": "[1] Yi Ren, Yangjun Ruan, Xu Tan, Tao Qin, Sheng Zhao, Zhou Zhao, and Tie-Yan Liu, “FastSpeech: Fast, robust and controllable text to speech,” Proc."
      },
      {
       "id": "s-5-1-2",
       "original": "NeurIPS, vol. 32, 2019.",
       "zh": "NeurIPS, vol. 32, 2019."
      }
     ]
    },
    {
     "id": "p-5-2",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-5-2-1",
       "original": "[2] Yi Ren, Chenxu Hu, Xu Tan, Tao Qin, Sheng Zhao, Zhou Zhao, and Tie-Yan Liu, “FastSpeech 2: Fast and high-quality end-toend text to speech,” in Proc.",
       "zh": "[2] Yi Ren, Chenxu Hu, Xu Tan, Tao Qin, Sheng Zhao, Zhou Zhao, and Tie-Yan Liu, “FastSpeech 2: Fast and high-quality end-toend text to speech,” in Proc."
      },
      {
       "id": "s-5-2-2",
       "original": "ICLR, 2021.",
       "zh": "ICLR, 2021."
      }
     ]
    },
    {
     "id": "p-5-3",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-5-3-1",
       "original": "[3] Jaehyeon Kim, Sungwon Kim, Jungil Kong, and Sungroh Yoon, “Glow-TTS: A generative flow for text-to-speech via monotonic alignment search,” Proc.",
       "zh": "[3] Jaehyeon Kim, Sungwon Kim, Jungil Kong, and Sungroh Yoon, “Glow-TTS: A generative flow for text-to-speech via monotonic alignment search,” Proc."
      },
      {
       "id": "s-5-3-2",
       "original": "NeurIPS, vol. 33, pp.",
       "zh": "NeurIPS, vol. 33, pp."
      }
     ]
    },
    {
     "id": "eq-5-1",
     "type": "equation",
     "page": 7,
     "original": "8067–8077, 2020."
    },
    {
     "id": "p-5-4",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-5-4-1",
       "original": "[4] Jungil Kong, Jaehyeon Kim, and Jaekyoung Bae, “HiFi-GAN: Generative adversarial networks for efficient and high fidelity speech synthesis,” Proc.",
       "zh": "[4] Jungil Kong, Jaehyeon Kim, and Jaekyoung Bae, “HiFi-GAN: Generative adversarial networks for efficient and high fidelity speech synthesis,” Proc."
      },
      {
       "id": "s-5-4-2",
       "original": "NeurIPS, vol. 33, pp. 17022–17033,",
       "zh": "NeurIPS, vol. 33, pp.\nNeurIPS, vol. 33, pp. 17022–17033,"
      }
     ]
    },
    {
     "id": "eq-5-2",
     "type": "equation",
     "page": 7,
     "original": "2020."
    },
    {
     "id": "p-5-5",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-5-5-1",
       "original": "[5] Xu Tan, Jiawei Chen, Haohe Liu, Jian Cong, Chen Zhang, Yanqing Liu, Xi Wang, Yichong Leng, Yuanhao Yi, Lei He, et al., “Naturalspeech: End-to-end text-to-speech synthesis with human-level quality,” IEEE Transactions on Pattern Analysis and Machine Intelligence, 2024.",
       "zh": "[5] Xu Tan, Jiawei Chen, Haohe Liu, Jian Cong, Chen Zhang, Yanqing Liu, Xi Wang, Yichong Leng, Yuanhao Yi, Lei He, et al., “Naturalspeech: End-to-end text-to-speech synthesis with human-level quality,” IEEE Transactions on Pattern Analysis and Machine Intelligence, 2024."
      }
     ]
    },
    {
     "id": "p-5-6",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-5-6-1",
       "original": "[6] Sercan Arik, Jitong Chen, Kainan Peng, Wei Ping, and Yanqi Zhou, “Neural voice cloning with a few samples,” Proc.",
       "zh": "[6] Sercan Arik, Jitong Chen, Kainan Peng, Wei Ping, and Yanqi Zhou, “Neural voice cloning with a few samples,” Proc."
      }
     ]
    },
    {
     "id": "p-5-7",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-5-7-1",
       "original": "NeurIPS, vol. 31, 2018.",
       "zh": "NeurIPS, vol. 31, 2018."
      }
     ]
    },
    {
     "id": "p-5-8",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-5-8-1",
       "original": "[7] Ye Jia, Yu Zhang, Ron Weiss, Quan Wang, Jonathan Shen, Fei Ren, Patrick Nguyen, Ruoming Pang, Ignacio Lopez Moreno, Yonghui Wu, et al., “Transfer learning from speaker verification to multispeaker text-to-speech synthesis,” Proc.",
       "zh": "[7] Ye Jia, Yu Zhang, Ron Weiss, Quan Wang, Jonathan Shen, Fei Ren, Patrick Nguyen, Ruoming Pang, Ignacio Lopez Moreno, Yonghui Wu, et al., “Transfer learning from speaker verification to multispeaker text-to-speech synthesis,” Proc."
      },
      {
       "id": "s-5-8-2",
       "original": "NeurIPS, vol. 31, 2018.",
       "zh": "NeurIPS, vol. 31, 2018."
      }
     ]
    },
    {
     "id": "p-5-9",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-5-9-1",
       "original": "[8] Chengyi Wang, Sanyuan Chen, Yu Wu, Ziqiang Zhang, Long Zhou, Shujie Liu, Zhuo Chen, Yanqing Liu, Huaming Wang, Jinyu Li, et al., “Neural codec language models are zero-shot text to speech synthesizers,” arXiv preprint arXiv:2301.02111,",
       "zh": "[8] Chengyi Wang, Sanyuan Chen, Yu Wu, Ziqiang Zhang, Long Zhou, Shujie Liu, Zhuo Chen, Yanqing Liu, Huaming Wang, Jinyu Li, et al., “Neural codec language models are zero-shot text to speech synthesizers,” arXiv preprint arXiv:2301.02111, 2023."
      }
     ]
    },
    {
     "id": "eq-5-3",
     "type": "equation",
     "page": 7,
     "original": "2023."
    },
    {
     "id": "p-5-10",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-5-10-1",
       "original": "[9] Xiaofei Wang, Manthan Thakker, Zhuo Chen, Naoyuki Kanda, Sefik Emre Eskimez, Sanyuan Chen, Min Tang, Shujie Liu, Jinyu Li, and Takuya Yoshioka, “Speechx: Neural codec language model as a versatile speech transformer,” arXiv preprint arXiv:2308.06873, 2023.",
       "zh": "[9] Xiaofei Wang 等，「SpeechX: Neural codec language model as a versatile speech transformer」，arXiv:2308.06873，2023。（参考文献，照录）"
      }
     ]
    },
    {
     "id": "p-5-11",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-5-11-1",
       "original": "[10] Chenpeng Du, Yiwei Guo, Hankun Wang, Yifan Yang, Zhikang Niu, Shuai Wang, Hui Zhang, Xie Chen, and Kai Yu, “Vall-t: Decoder-only generative transducer for robust and decoding-controllable text-to-speech,” arXiv preprint arXiv:2401.14321, 2024.",
       "zh": "[10] Chenpeng Du 等，「VALL-T: Decoder-only generative transducer for robust and decoding-controllable text-to-speech」，arXiv:2401.14321，2024。（参考文献，照录）"
      }
     ]
    },
    {
     "id": "p-5-12",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-5-12-1",
       "original": "[11] Detai Xin, Xu Tan, Kai Shen, Zeqian Ju, Dongchao Yang, Yuancheng Wang, Shinnosuke Takamichi, Hiroshi Saruwatari, Shujie Liu, Jinyu Li, et al., “RALL-E: Robust codec language modeling with chain-of-thought prompting for text-to-speech synthesis,” arXiv preprint arXiv:2404.03204, 2024.",
       "zh": "[9] Xiaofei Wang, Manthan Thakker, Zhuo Chen, Naoyuki Kanda, Sefik Emre Eskimez, Sanyuan Chen, Min Tang, Shujie Liu, Jinyu Li, and Takuya Yoshioka, “Speechx: Neural codec language model as a versatile speech transformer,” arXiv preprint [10] Chenpeng Du, Yiwei Guo, Hankun Wang, Yifan Yang, Zhikang Niu, Shuai Wang, Hui Zhang, Xie Chen, and Kai Yu, “Vall-t: Decoder-only generative transducer for robust and decoding-controllable text-to-speech,” arXiv preprint [11] Detai Xin, Xu Tan, Kai Shen, Zeqian Ju, Dongchao Yang, Yuancheng Wang, Shinnosuke Takamichi, Hiroshi Saruwatari, Shujie Liu, Jinyu Li, et al., “RALL-E: Robust codec language modeling with chain-of-thought prompting for text-to-speech synthesis,” arXiv preprint arXiv:2404.03204, 2024."
      }
     ]
    },
    {
     "id": "p-5-13",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-5-13-1",
       "original": "[12] Sanyuan Chen, Shujie Liu, Long Zhou, Yanqing Liu, Xu Tan, Jinyu Li, Sheng Zhao, Yao Qian, and Furu Wei, “VALL- E 2: Neural Codec Language Models are Human Parity Zero-Shot Text to Speech Synthesizers,” arXiv preprint arXiv:2402.07383, 2024.",
       "zh": "[12] Sanyuan Chen 等，「VALL-E 2: Neural Codec Language Models are Human Parity Zero-Shot Text to Speech Synthesizers」，arXiv:2402.07383，2024。（参考文献，照录）"
      },
      {
       "id": "s-5-13-2",
       "original": "[13] Dongchao Yang, Jinchuan Tian, Xu Tan, Rongjie Huang, Songxiang Liu, Xuankai Chang, Jiatong Shi, Sheng Zhao, Jiang Bian, Xixin Wu, et al., “Uniaudio: An audio foundation model toward universal audio generation,” arXiv preprint arXiv:2310.00704, 2023.",
       "zh": "[13] Dongchao Yang 等，「UniAudio: An audio foundation model toward universal audio generation」，arXiv:2310.00704，2023。（参考文献，照录）"
      }
     ]
    },
    {
     "id": "p-5-14",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-5-14-1",
       "original": "[14] Kai Shen, Zeqian Ju, Xu Tan, Yanqing Liu, Yichong Leng, Lei He, Tao Qin, Sheng Zhao, and Jiang Bian, “NaturalSpeech 2: Latent diffusion models are natural and zero-shot speech and singing synthesizers,” arXiv preprint arXiv:2304.09116, 2023.",
       "zh": "[12] Sanyuan Chen, Shujie Liu, Long Zhou, Yanqing Liu, Xu Tan, Jinyu Li, Sheng Zhao, Yao Qian, and Furu Wei, “VALL- E 2: Neural Codec Language Models are Human Parity Zero-Shot Text to Speech Synthesizers,” arXiv preprint [13] Dongchao Yang, Jinchuan Tian, Xu Tan, Rongjie Huang, Songxiang Liu, Xuankai Chang, Jiatong Shi, Sheng Zhao, Jiang Bian, Xixin Wu, et al., “Uniaudio: An audio foundation model toward universal audio generation,” arXiv preprint [14] Kai Shen, Zeqian Ju, Xu Tan, Yanqing Liu, Yichong Leng, Lei He, Tao Qin, Sheng Zhao, and Jiang Bian, “NaturalSpeech 2: Latent diffusion models are natural and zero-shot speech and singing synthesizers,” arXiv preprint arXiv:2304.09116, 2023."
      },
      {
       "id": "s-5-14-2",
       "original": "[15] Zeqian Ju, Yuancheng Wang, Kai Shen, Xu Tan, Detai Xin, Dongchao Yang, Yanqing Liu, Yichong Leng, Kaitao Song, Siliang Tang, et al., “Naturalspeech 3: Zero-shot speech synthesis with factorized codec and diffusion models,” arXiv preprint arXiv:2403.03100, 2024.",
       "zh": "[15] Zeqian Ju, Yuancheng Wang, Kai Shen, Xu Tan, Detai Xin, Dongchao Yang, Yanqing Liu, Yichong Leng, Kaitao Song, Siliang Tang, et al., “Naturalspeech 3: Zero-shot speech synthesis with factorized codec and diffusion models,” arXiv preprint arXiv:2403.03100, 2024."
      },
      {
       "id": "s-5-14-3",
       "original": "[16] Jonathan Ho, Ajay Jain, and Pieter Abbeel, “Denoising diffusion probabilistic models,” in Proc.",
       "zh": "[16] Jonathan Ho, Ajay Jain, and Pieter Abbeel, “Denoising diffusion probabilistic models,” in Proc."
      },
      {
       "id": "s-5-14-4",
       "original": "NIPS, 2020, vol. 33, pp.",
       "zh": "NIPS, 2020, vol. 33, pp."
      }
     ]
    },
    {
     "id": "eq-5-4",
     "type": "equation",
     "page": 7,
     "original": "6840–6851."
    },
    {
     "id": "p-5-15",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-5-15-1",
       "original": "[17] Yang Song, Jascha Sohl-Dickstein, Diederik P Kingma, Abhishek Kumar, Stefano Ermon, and Ben Poole, “Score-based generative modeling through stochastic differential equations,” in Proc.",
       "zh": "[17] Yang Song, Jascha Sohl-Dickstein, Diederik P Kingma, Abhishek Kumar, Stefano Ermon, and Ben Poole, “Score-based generative modeling through stochastic differential equations,” in Proc."
      },
      {
       "id": "s-5-15-2",
       "original": "ICML, 2020.",
       "zh": "ICML, 2020."
      },
      {
       "id": "s-5-15-3",
       "original": "[18] Matthew Le, Apoorv Vyas, Bowen Shi, Brian Karrer, Leda Sari, Rashel Moritz, Mary Williamson, Vimal Manohar, Yossi Adi, Jay Mahadeokar, et al., “Voicebox: Text-guided multilingual universal speech generation at scale,” Advances in neural information processing systems, vol. 36, 2024.",
       "zh": "[18] Matthew Le, Apoorv Vyas, Bowen Shi, Brian Karrer, Leda Sari, Rashel Moritz, Mary Williamson, Vimal Manohar, Yossi Adi, Jay Mahadeokar, et al., “Voicebox: Text-guided multilingual universal speech generation at scale,” Advances in neural information processing systems, vol. 36, 2024."
      },
      {
       "id": "s-5-15-4",
       "original": "[19] Shivam Mehta, Ruibo Tu, Jonas Beskow, ´Eva Sz´ekely, and Gustav Eje Henter, “Matcha-TTS: A fast TTS architecture with conditional flow matching,” in Proc.",
       "zh": "[19] Shivam Mehta, Ruibo Tu, Jonas Beskow, ´Eva Sz´ekely, and Gustav Eje Henter, “Matcha-TTS: A fast TTS architecture with conditional flow matching,” in Proc."
      },
      {
       "id": "s-5-15-5",
       "original": "ICASSP.",
       "zh": "ICASSP."
      },
      {
       "id": "s-5-15-6",
       "original": "IEEE, 2024, pp.",
       "zh": "IEEE, 2024, pp."
      }
     ]
    },
    {
     "id": "eq-5-5",
     "type": "equation",
     "page": 7,
     "original": "11341–11345."
    },
    {
     "id": "p-5-16",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-5-16-1",
       "original": "[20] Yaron Lipman, Ricky TQ Chen, Heli Ben-Hamu, Maximilian Nickel, and Matthew Le, “Flow matching for generative modeling,” in Proc.",
       "zh": "[20] Yaron Lipman, Ricky TQ Chen, Heli Ben-Hamu, Maximilian Nickel, and Matthew Le, “Flow matching for generative modeling,” in Proc."
      },
      {
       "id": "s-5-16-2",
       "original": "ICLR, 2022.",
       "zh": "ICLR, 2022."
      },
      {
       "id": "s-5-16-3",
       "original": "[21] Vadim Popov, Ivan Vovk, Vladimir Gogoryan, Tasnima Sadekova, and Mikhail Kudinov, “Grad-TTS: A diffusion probabilistic model for text-to-speech,” in Proc.",
       "zh": "[21] Vadim Popov, Ivan Vovk, Vladimir Gogoryan, Tasnima Sadekova, and Mikhail Kudinov, “Grad-TTS: A diffusion probabilistic model for text-to-speech,” in Proc."
      },
      {
       "id": "s-5-16-4",
       "original": "ICML, 2021, pp. 8599–8608.",
       "zh": "ICML, 2021, pp. 8599–8608."
      },
      {
       "id": "s-5-16-5",
       "original": "[22] Yuan Gao, Nobuyuki Morioka, Yu Zhang, and Nanxin Chen, “E3 TTS: Easy end-to-end diffusion-based text to speech,” in 2023 IEEE Automatic Speech Recognition and Understanding Workshop (ASRU).",
       "zh": "[22] Yuan Gao, Nobuyuki Morioka, Yu Zhang, and Nanxin Chen, “E3 TTS: Easy end-to-end diffusion-based text to speech,” in 2023 IEEE Automatic Speech Recognition and Understanding Workshop (ASRU)."
      },
      {
       "id": "s-5-16-6",
       "original": "IEEE, 2023, pp. 1–8.",
       "zh": "IEEE, 2023, pp. 1–8."
      },
      {
       "id": "s-5-16-7",
       "original": "[23] Olaf Ronneberger, Philipp Fischer, and Thomas Brox, “U-net: Convolutional networks for biomedical image segmentation,” in Proc.",
       "zh": "[23] Olaf Ronneberger, Philipp Fischer, and Thomas Brox, “U-net: Convolutional networks for biomedical image segmentation,” in Proc."
      },
      {
       "id": "s-5-16-8",
       "original": "MICCAI.",
       "zh": "MICCAI."
      },
      {
       "id": "s-5-16-9",
       "original": "Springer, 2015, pp. 234–241.",
       "zh": "Springer, 2015, pp. 234–241."
      },
      {
       "id": "s-5-16-10",
       "original": "[24] Philip Anastassiou, Jiawei Chen, Jitong Chen, Yuanzhe Chen, Zhuo Chen, Ziyi Chen, Jian Cong, Lelai Deng, Chuang Ding, Lu Gao, et al., “Seed-TTS: A Family of HighQuality Versatile Speech Generation Models,” arXiv preprint arXiv:2406.02430, 2024.",
       "zh": "[24] Philip Anastassiou 等，「Seed-TTS: A Family of High-Quality Versatile Speech Generation Models」，arXiv:2406.02430，2024。（参考文献，照录）"
      },
      {
       "id": "s-5-16-11",
       "original": "[25] Bo Li, Yu Zhang, Tara Sainath, Yonghui Wu, and William Chan, “Bytes are all you need: End-to-end multilingual speech recognition and synthesis with bytes,” in Proc.",
       "zh": "[24] Philip Anastassiou, Jiawei Chen, Jitong Chen, Yuanzhe Chen, Zhuo Chen, Ziyi Chen, Jian Cong, Lelai Deng, Chuang Ding, Lu Gao, et al., “Seed-TTS: A Family of HighQuality Versatile Speech Generation Models,” arXiv preprint [25] Bo Li, Yu Zhang, Tara Sainath, Yonghui Wu, and William Chan, “Bytes are all you need: End-to-end multilingual speech recognition and synthesis with bytes,” in Proc."
      },
      {
       "id": "s-5-16-12",
       "original": "ICASSP, 2019, pp. 5621–5625.",
       "zh": "ICASSP, 2019, pp. 5621–5625."
      },
      {
       "id": "s-5-16-13",
       "original": "[26] Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N Gomez, Lukasz Kaiser, and Illia Polosukhin, “Attention is all you need,” Proc.",
       "zh": "[26] Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N Gomez, Lukasz Kaiser, and Illia Polosukhin, “Attention is all you need,” Proc."
      },
      {
       "id": "s-5-16-14",
       "original": "NIPS, vol. 30,",
       "zh": "NIPS, vol. 30, 2017."
      }
     ]
    },
    {
     "id": "eq-5-6",
     "type": "equation",
     "page": 7,
     "original": "2017."
    },
    {
     "id": "p-5-17",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-5-17-1",
       "original": "[27] Ricky TQ Chen, Yulia Rubanova, Jesse Bettencourt, and David K Duvenaud, “Neural ordinary differential equations,” in Proc.",
       "zh": "[27] Ricky TQ Chen, Yulia Rubanova, Jesse Bettencourt, and David K Duvenaud, “Neural ordinary differential equations,” in Proc."
      },
      {
       "id": "s-5-17-2",
       "original": "NeurIPS, 2018, vol. 31.",
       "zh": "NeurIPS, 2018, vol. 31."
      },
      {
       "id": "s-5-17-3",
       "original": "[28] Michael McAuliffe, Michaela Socolof, Sarah Mihuc, Michael Wagner, and Morgan Sonderegger, “Montreal forced aligner: Trainable text-speech alignment using kaldi.,” in Proc.",
       "zh": "[28] Michael McAuliffe, Michaela Socolof, Sarah Mihuc, Michael Wagner, and Morgan Sonderegger, “Montreal forced aligner: Trainable text-speech alignment using kaldi.,” in Proc."
      },
      {
       "id": "s-5-17-4",
       "original": "Interspeech, 2017, pp. 498–502.",
       "zh": "Interspeech, 2017, pp. 498–502."
      }
     ]
    },
    {
     "id": "p-5-18",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-5-18-1",
       "original": "[29] Kevin Lenzo, “The carnegie mellon university pronouncing dictionary,” .",
       "zh": "[29] Kevin Lenzo, “The carnegie mellon university pronouncing dictionary,” ."
      }
     ]
    },
    {
     "id": "p-5-19",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-5-19-1",
       "original": "[30] Wei Kang, Xiaoyu Yang, Zengwei Yao, Fangjun Kuang, Yifan Yang, Liyong Guo, Long Lin, and Daniel Povey, “LibriHeavy: a 50,000 hours ASR corpus with punctuation casing and context,” in Proc.",
       "zh": "[30] Wei Kang, Xiaoyu Yang, Zengwei Yao, Fangjun Kuang, Yifan Yang, Liyong Guo, Long Lin, and Daniel Povey, “LibriHeavy: a 50,000 hours ASR corpus with punctuation casing and context,” in Proc."
      },
      {
       "id": "s-5-19-2",
       "original": "ICASSP.",
       "zh": "ICASSP."
      },
      {
       "id": "s-5-19-3",
       "original": "IEEE, 2024, pp. 10991–10995.",
       "zh": "IEEE, 2024, pp. 10991–10995."
      }
     ]
    },
    {
     "id": "p-5-20",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-5-20-1",
       "original": "[31] Jacob Kahn, Morgane Rivi`ere, Weiyi Zheng, Evgeny Kharitonov, Qiantong Xu, Pierre-Emmanuel Mazar´e, Julien Karadayi, Vitaliy Liptchinsky, Ronan Collobert, Christian Fuegen, et al., “Libri-light: A benchmark for ASR with limited or no supervision,” in Proc.",
       "zh": "[31] Jacob Kahn, Morgane Rivi`ere, Weiyi Zheng, Evgeny Kharitonov, Qiantong Xu, Pierre-Emmanuel Mazar´e, Julien Karadayi, Vitaliy Liptchinsky, Ronan Collobert, Christian Fuegen, et al., “Libri-light: A benchmark for ASR with limited or no supervision,” in Proc."
      },
      {
       "id": "s-5-20-2",
       "original": "ICASSP, 2020, pp. 7669–7673.",
       "zh": "ICASSP, 2020, pp. 7669–7673."
      }
     ]
    },
    {
     "id": "p-5-21",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-5-21-1",
       "original": "[32] Sang-gil Lee, Wei Ping, Boris Ginsburg, Bryan Catanzaro, and Sungroh Yoon, “BigVGAN: A universal neural vocoder with large-scale training,” in Proc.",
       "zh": "[32] Sang-gil Lee, Wei Ping, Boris Ginsburg, Bryan Catanzaro, and Sungroh Yoon, “BigVGAN: A universal neural vocoder with large-scale training,” in Proc."
      },
      {
       "id": "s-5-21-2",
       "original": "ICLR, 2022.",
       "zh": "ICLR, 2022."
      }
     ]
    },
    {
     "id": "p-5-22",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-5-22-1",
       "original": "[33] Jonathan Ho and Tim Salimans, “Classifier-free diffusion guidance,” arXiv preprint arXiv:2207.12598, 2022.",
       "zh": "[33] Jonathan Ho and Tim Salimans, “Classifier-free diffusion guidance,” arXiv preprint arXiv:2207.12598, 2022."
      }
     ]
    },
    {
     "id": "p-5-23",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-5-23-1",
       "original": "[34] Xiaofei Wang, Sefik Emre Eskimez, Manthan Thakker, Hemin Yang, Zirun Zhu, Min Tang, Yufei Xia, Jinzhu Li, Sheng Zhao, Jinyu Li, and Naoyuki Kanda, “An investigation of noise robustness for flow-matching-based zero-shot TTS,” in Proc.",
       "zh": "[34] Xiaofei Wang, Sefik Emre Eskimez, Manthan Thakker, Hemin Yang, Zirun Zhu, Min Tang, Yufei Xia, Jinzhu Li, Sheng Zhao, Jinyu Li, and Naoyuki Kanda, “An investigation of noise robustness for flow-matching-based zero-shot TTS,” in Proc."
      },
      {
       "id": "s-5-23-2",
       "original": "Interspeech, 2024.",
       "zh": "Interspeech, 2024."
      }
     ]
    },
    {
     "id": "p-5-24",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-5-24-1",
       "original": "[35] Aleksandr Meister, Matvei Novikov, Nikolay Karpov, Evelina Bakhturina, Vitaly Lavrukhin, and Boris Ginsburg, “LibriSpeech-PC: Benchmark for evaluation of punctuation and capitalization capabilities of end-to-end asr models,” in Proc.",
       "zh": "[35] Aleksandr Meister, Matvei Novikov, Nikolay Karpov, Evelina Bakhturina, Vitaly Lavrukhin, and Boris Ginsburg, “LibriSpeech-PC: Benchmark for evaluation of punctuation and capitalization capabilities of end-to-end asr models,” in Proc."
      },
      {
       "id": "s-5-24-2",
       "original": "ASRU.",
       "zh": "ASRU."
      },
      {
       "id": "s-5-24-3",
       "original": "IEEE, 2023, pp. 1–7.",
       "zh": "IEEE, 2023, pp. 1–7."
      }
     ]
    },
    {
     "id": "p-5-25",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-5-25-1",
       "original": "[36] Vassil Panayotov, Guoguo Chen, Daniel Povey, and Sanjeev Khudanpur, “LibriSpeech: an ASR corpus based on public domain audio books,” in Proc.",
       "zh": "[36] Vassil Panayotov, Guoguo Chen, Daniel Povey, and Sanjeev Khudanpur, “LibriSpeech: an ASR corpus based on public domain audio books,” in Proc."
      },
      {
       "id": "s-5-25-2",
       "original": "ICASSP, 2015, pp. 5206–5210.",
       "zh": "ICASSP, 2015, pp. 5206–5210."
      }
     ]
    },
    {
     "id": "p-5-26",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-5-26-1",
       "original": "[37] Wei-Ning Hsu, Benjamin Bolte, Yao-Hung Hubert Tsai, Kushal Lakhotia, Ruslan Salakhutdinov, and Abdelrahman Mohamed, “HuBERT: Self-supervised speech representation learning by masked prediction of hidden units,” IEEE/ACM Transactions on Audio, Speech, and Language Processing, vol.",
       "zh": "[37] Wei-Ning Hsu, Benjamin Bolte, Yao-Hung Hubert Tsai, Kushal Lakhotia, Ruslan Salakhutdinov, and Abdelrahman Mohamed, “HuBERT: Self-supervised speech representation learning by masked prediction of hidden units,” IEEE/ACM Transactions on Audio, Speech, and Language Processing, vol."
      }
     ]
    },
    {
     "id": "eq-5-7",
     "type": "equation",
     "page": 8,
     "original": "29, pp. 3451–3460, 2021."
    },
    {
     "id": "p-5-27",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-5-27-1",
       "original": "[38] Sanyuan Chen, Chengyi Wang, Zhengyang Chen, Yu Wu, Shujie Liu, Zhuo Chen, Jinyu Li, Naoyuki Kanda, Takuya Yoshioka, Xiong Xiao, et al., “WavLM: Large-scale self-supervised pre-training for full stack speech processing,” IEEE Journal of Selected Topics in Signal Processing, vol. 16, no. 6, pp. 1505–",
       "zh": "[38] Sanyuan Chen, Chengyi Wang, Zhengyang Chen, Yu Wu, Shujie Liu, Zhuo Chen, Jinyu Li, Naoyuki Kanda, Takuya Yoshioka, Xiong Xiao, et al., “WavLM: Large-scale self-supervised pre-training for full stack speech processing,” IEEE Journal of Selected Topics in Signal Processing, vol. 16, no. 6, pp. 1505– 1518, 2022."
      }
     ]
    },
    {
     "id": "eq-5-8",
     "type": "equation",
     "page": 8,
     "original": "1518, 2022."
    }
   ]
  }
 ],
 "annotations": [
  {
   "id": "ann-001",
   "anchor": {
    "sentence_id": "s-abstract-1-2",
    "quote": "the text input is converted into a character sequence with filler tokens"
   },
   "kind": "concept",
   "title": "filler token 是什么",
   "explanation": "E2 TTS 的核心机制一句话就能说完：把字符序列用特殊填充 token ⟨F⟩ 补齐到与 mel 帧序列等长，然后让模型并行预测整段 mel。字符该占多少帧、对齐点在哪，全部交给注意力隐式学习。这等于把 NAR TTS 里最难的「文本-语音长度对齐」问题，从显式的时长模型/强制对齐，转化为 filler 位置的隐式分配问题。读全文时记住：所有「简单」都建立在模型自己学好这个隐式对齐的赌注上。",
   "featured": true
  },
  {
   "id": "ann-002",
   "anchor": {
    "sentence_id": "s-abstract-1-4",
    "quote": "it does not require additional components (e.g., duration model, graphemeto-phoneme) or complex techniques (e.g., monotonic alignment search)"
   },
   "kind": "comparison",
   "title": "砍掉了哪些传统组件",
   "explanation": "这句是对过去十年 TTS 流水线的一次清点：时长模型（FastSpeech 一系必不可少）、G2P（音素系模型的标配前端）、单调对齐搜索（Glow-TTS/Matcha-TTS 的对齐来源），E2 TTS 一个都不要。注意它砍组件的方式不是发明更好的替代品，而是让一个足够大的 Transformer 在 50,000 小时级数据上自己把这三件事的联合功能内化。能否复现，取决于你有没有同等规模的数据和算力，而不是架构本身。",
   "featured": true
  },
  {
   "id": "ann-003",
   "anchor": {
    "sentence_id": "s-1-2-2",
    "quote": "because the codec token needs to be sampled sequentially, it inevitably increases the inference latency"
   },
   "kind": "motivation",
   "title": "AR codec 延迟的根源",
   "explanation": "这是对 VALL-E 路线的直接批评。codec token 必须逐帧顺序采样：RVQ 多层码本意味着每秒音频要生成几百个 token，每一步都依赖前一步，GPU 再快也无法并行。语音越长，自回归误差累积和延迟越明显，还没有办法靠更大的 batch 摊薄。NAR 流匹配则是一次性并行采样整条向量场轨迹，把「生成 N 帧」从 O(N) 次串行前向变成几十次可并行的 ODE 步进——这就是 E2 TTS 选择 fully-NAR 的根本动机。",
   "featured": true
  },
  {
   "id": "ann-004",
   "anchor": {
    "sentence_id": "s-1-4-8",
    "quote": "such techniques are not necessary to achieve high-quality zeroshot TTS, and they are sometimes even harmful to naturalness"
   },
   "kind": "critique",
   "title": "对齐技术反而有害？",
   "explanation": "这是全文最大胆的论断：显式音素对齐不仅不必要，还会伤害自然度。作者的论据是 (B4) 与 (P1) 的对照复现实验，但严格说这只证明了「在 Voicebox 这个实现里，帧级音素对齐是瓶颈」，不能推广为「一切显式对齐都有害」——F5-TTS 后来保留了部分结构先验反而更稳。这个结论的正确读法是：给架构塞入会带来错误传播的人工中间产物（对齐、时长标签），不如让端到端模型自己学，前提是数据量足够。",
   "featured": true
  },
  {
   "id": "ann-005",
   "anchor": {
    "sentence_id": "s-1-5-2",
    "quote": "E2 TTS consists of only two modules: a flow-matchingbased mel spectrogram generator and a vocoder"
   },
   "kind": "concept",
   "title": "只有两个模块的代价",
   "explanation": "生成器 + 声码器，就是全部。对照 VALL-E 需要 codec 编码器、AR 模型、NAR 模型、codec 解码器四层，工程链短了一大截。但极简架构不是免费的午餐：没有文本编码器意味着文本鲁棒性完全靠数据砸出来，没有时长模型意味着推理时必须人为指定目标时长（论文 3.6.3 节专门验证这个输入的容错性）。「简单」在这里是美学的也是风险点——它把复杂度从系统组件转移到了数据和隐式表征上。",
   "featured": false
  },
  {
   "id": "ann-006",
   "anchor": {
    "sentence_id": "s-flow-matching-transformer-2-11-1",
    "quote": "the model is trained to learn the distribution P(m ⊙ˆs|(1 −m) ⊙ˆs, ˆy)"
   },
   "kind": "concept",
   "title": "infilling 任务的形式化",
   "explanation": "这个条件分布精确描述了训练任务：给定未掩码部分 (1−m)⊙ŝ 和补齐文本 ŷ，重建被掩码部分 m⊙ŝ。掩码率 70%–100%（见 3.2 节）是个关键设定：掩码率拉到 100% 时模型见的其实是「零音频提示、纯文本生成」的极端样本，这正好覆盖了推理时音频提示之后的区域全要生成的场景。掩码位置沿时间轴随机采样，模型被迫学会从任意左右边界续写，比固定截尾的因果掩码对 zero-shot 续写更友好。",
   "featured": true
  },
  {
   "id": "ann-007",
   "anchor": {
    "sentence_id": "s-2-3-2-2",
    "quote": "utilizing an optimal transport path: pt(x|x1) = N(x|tx1, (1 −(1 −σmin)t)2I)"
   },
   "kind": "engineering",
   "title": "为什么用 OT 路径",
   "explanation": "条件流匹配可以选任意概率路径，E2 TTS 和 Matcha 一样选了最优传输路径：噪声到数据之间走直线，向量场近乎恒定。直线插值的直接好处是 ODE 求解轨迹曲率小，几十步甚至十几步采样就足够，推理 NFE 可以压到 32。如果用扩散模型那种弯弯曲曲的 VP/VE 路径，同样的采样步数下质量会差很多。这是流匹配相对扩散模型在 TTS 落地时最实在的一个工程优势——更快收敛、更少采样步。",
   "featured": true
  },
  {
   "id": "ann-008",
   "anchor": {
    "sentence_id": "s-2-3-2-3",
    "quote": "we apply an ordinary differential equation (ODE) solver [27] to generate the log mel-filterbank features"
   },
   "kind": "engineering",
   "title": "ODE 步数决定推理成本",
   "explanation": "推理本质是从纯噪声 p0 出发，用 ODE 求解器沿学到的向量场积分到 t=1，每一步都是一次完整的 335M 参数 Transformer 前向。论文用中点法、NFE=32：大约 32 次前向生成整段 mel，比 AR codec 模型动辄数百次还不可并行的前向便宜得多，且步数可调——步数换质量的旋钮完全暴露在推理侧。这也是后续 F5-TTS 用 Sway Sampling 重排时间步、把质量推进一步的切入点。",
   "explanation_plain": "生成音频不是一口气完成的，而是从噪声出发走 32 步「去噪」。步数越少越快但越糙，这个权衡在推理时可以自由调。",
   "featured": false
  },
  {
   "id": "ann-009",
   "anchor": {
    "sentence_id": "s-2-4-1-3",
    "quote": "eliminating the need for a grapheme-to-phoneme converter, a phoneme aligner, and a phoneme duration model"
   },
   "kind": "comparison",
   "title": "chain 断裂即自由",
   "explanation": "Voicebox 一系的传统流水线是串联结构：G2P 出错，对齐器跟着错，时长模型再放大，最后 mel 音素错一字整句发音崩。E2 TTS 把三级串联砸成一个端到端生成器，错误模型变成整体分布学习，鲁棒性自然上去。但要泼冷水：这条链被消除后，错误变成不可解释的黑盒——模型读错字你不知道是哪一环出问题，可控性调试会更痛苦。X2 扩展提供的手动注音接口，某种程度上就是在补回这条链末端的可控性。",
   "featured": true
  },
  {
   "id": "ann-010",
   "anchor": {
    "sentence_id": "s-2-4-1-4",
    "quote": "can be viewed as a joint model of the grapheme-to-phoneme converter, the phoneme duration model, and the audio model"
   },
   "kind": "concept",
   "title": "联合建模怎么理解",
   "explanation": "这句给出理解 E2 TTS 的等价视角：它没有发明新部件，而是把 TTS 三个传统子任务揉进同一个流匹配 Transformer。联合的好处是错误不平摊——G2P 的规则边界不再硬约束声学表现，时长和发音随语境自然变化，这正是自然度提升的来源；代价也完全对称——三个子任务的训练信号混在一起，收敛更慢（3.6.1 节图 4 直接显示 E2 TTS 前期 WER 远差于 Voicebox），想 training-free 地干预其中某一步也不可能。",
   "explanation_plain": "以前 TTS 是三个专家接力，现在是一个通才全包。接力会互相拖累，全包学得更自然但更难教、更慢。",
   "featured": false
  },
  {
   "id": "ann-011",
   "anchor": {
    "sentence_id": "s-3-1-1-5",
    "quote": "We also used a proprietary 200,000 hours of training data to investigate the scalability"
   },
   "kind": "number",
   "title": "200,000 小时的信号",
   "explanation": "公开配方只有 50,000 小时的 Libriheavy，但最好的两条结果（P2/P3）背后各站着 200,000 小时的专有数据（一个做无标注预训练，一个做全量训练）——4 倍的「隐藏数据」。这直接限定论文结论的适用边界：「简单架构就够」是在十万小时级数据前提下成立的，小数据场景下 Voicebox 式显式对齐反而收敛更快（图 4 已揭示）。开源社区复刻时，数据规模而不是 filler token，才是最难复制的部分。",
   "featured": true
  },
  {
   "id": "ann-012",
   "anchor": {
    "sentence_id": "s-3-2-1-6",
    "quote": "The masking length was randomly determined to be between 70% and 100%"
   },
   "kind": "engineering",
   "title": "掩码率 70%–100% 的含义",
   "explanation": "训练时随机遮蔽 70% 到 100% 的 mel 帧。拉到 100% 这一档常被忽略，但它正是零样本 TTS 的训练-推理一致性关键：推理时提示音频之后所有帧都等于「被遮蔽」，模型必须在只有文本条件的极端情形下也能生成。掩码率高还迫使模型充分利用文本条件而非抄近道复制可见邻帧，infilling 才学得像「生成」而不是「修补」。对比 BERT 式 15% 掩码，这个比例激进得多——因为它服务的不是表征学习而是生成任务。",
   "featured": false
  },
  {
   "id": "ann-013",
   "anchor": {
    "sentence_id": "s-3-2-4-4",
    "quote": "We used this duration model to estimate the target duration for a fair comparison with the Voicebox baseline"
   },
   "kind": "critique",
   "title": "时长模型的隐性依赖",
   "explanation": "一个反直觉的细节：主打「消灭时长模型」的 E2 TTS，主结果表里的数字其实都靠一个 8 层 Voicebox 式时长回归模型喂目标时长 Tgen。论文把它解释成「为了公平比较」，但这意味着生产部署要么接一个外置时长预测（砍掉的东西又回来了），要么由调用方拍脑袋给时长。3.6.3 节验证 ±30% 时长扰动下不崩，缓解了但没有根除这个输入自由度。「简单架构」的叙事在这里有一个不便明说的注脚。"
  },
  {
   "id": "ann-015",
   "anchor": {
    "sentence_id": "s-id-3-3-3",
    "quote": "achieved a CMOS score of -0.05, which is considered to have a level of naturalness indistinguishable from the ground truth"
   },
   "kind": "number",
   "title": "-0.05 是不是人类水平",
   "explanation": "CMOS 是成对比较分：范围 -3 到 +3，0 表示与真人五五开。-0.05 意味着评测者几乎分不出真假——对照组 NaturalSpeech 3 与 Voicebox 复现版都明显更负。但脚注 7 给出更诚实的拆解：E2 TTS 赢 33%、输 33%、平 34%，优势远谈不上碾压；且总样本只有 39 条、12 个评测者，统计功效弱。更关键的是测试域是 LibriSpeech 朗读腔，与训练数据同源，不是分布外泛化的证据。「indistinguishable」在这个协议下成立，外推到真实产品需谨慎。",
   "featured": false
  },
  {
   "id": "ann-016",
   "anchor": {
    "sentence_id": "s-id-3-4-2",
    "quote": "the use of phoneme alignment was the primary obstacle in achieving natural-sounding audio"
   },
   "kind": "critique",
   "title": "对齐瓶颈说的成色",
   "explanation": "论文反复强调「音素对齐是自然度的主要障碍」，支撑是它自己复现的 Voicebox 基线 (B4)。问题是这个基线未必调到最优——Meta 原文的 Voicebox 用了更大规模和更精细的工程，第三方复现普遍打折扣。把一个组件级结论建立在自家实现的对手上，因果链其实不完整：也可能是复现差距而非对齐本身。把这句话当作强假设而非定理更合适。后续 F5-TTS 去掉音素对齐依然成功，为它补了更可信的旁证。",
   "featured": true
  },
  {
   "id": "ann-017",
   "anchor": {
    "sentence_id": "s-3-5-3-4",
    "quote": "showed only marginal degradation of WER, even when we replaced 50% of words with phoneme sequences"
   },
   "kind": "engineering",
   "title": "15% 训练噪声换 50% 容忍",
   "explanation": "X2 扩展的训练手法极简：以 15% 概率把单词换成 CMU 词典的音素串，不加新模块、不改损失。换来的能力是推理时最多 50% 单词注音也只掉 0.1 的 WER——「括号内即音素」这种弱标记足以让模型解析字符里嵌套的另一种符号系统。对产品的意义很实际：专有名词、外语名、多音字的发音人工指定问题，业内过去要么加词典前端要么重训，这里化约为推理侧的字符串替换。低成本、后发制人，是这个套路值得借鉴的地方。",
   "featured": true
  },
  {
   "id": "ann-018",
   "anchor": {
    "sentence_id": "s-2-5-6-3",
    "quote": "we replaced the word in y with the phoneme sequence from the CMU pronouncing dictionary [29] with a 15% probability"
   },
   "kind": "engineering",
   "title": "标点为什么必须保留",
   "explanation": "这个训练细节值得单独看：单词替换为音素时，周边标点原样保留。标点字符是韵律的隐式标签——逗号带来停顿、问号抬升语调，模型从数据中学到了这层映射；如果替换时把问号顺手删了，音素化单词后的语调提示也丢了。字符级输入的好处正在于此：没有硬的前端规则，任何符号都可能变成条件信号。工程启示：做字符级 TTS 时，文本清洗别太狠，大小写和标点都是模型的韵律信息源（3.1 节「不做任何预处理」也是同一哲学）。"
  },
  {
   "id": "ann-019",
   "anchor": {
    "sentence_id": "s-3-6-3-6",
    "quote": "SIM-o significantly improved when the audio prompt length increased"
   },
   "kind": "number",
   "title": "提示越长越像，但有边界",
   "explanation": "音频提示从 3 秒拉长到 10 秒，WER 基本不变而 SIM-o 显著上升：更长提示等于更充分的音色条件，音色建模饱和前的免费午餐。这也解释了为什么 3.3 节主评测只用每说话人最后 3 秒——是保守设定，真实能力上限更高。但作者在同节承认提示过长时模型可能找不到 yaud/ytext 边界（两个条件字符串在注意力里缺乏显式分隔符），10 秒是该评测的上限而非模型的安全区。边界检测至今是字符填充方案的软肋，F5-TTS 的 padding mask 设计正是补这一点。",
   "explanation_plain": "给模型听 10 秒参考音比听 3 秒更像本人，且不会更容易读错字——但再长就有找不到「参考音结束、正文开始」分界的风险。"
  },
  {
   "id": "ann-020",
   "anchor": {
    "sentence_id": "s-3-6-5-3",
    "quote": "only a moderate increase in WER while maintaining a high SIM-o, even in the challenging cases of sr = 0.7 and sr = 1.3"
   },
   "kind": "number",
   "title": "±30% 时长扰动测试",
   "explanation": "E2 TTS 的时长是推理输入而非模型输出，那么用户给错时长会怎样？实验把总时长乘上 1/sr，覆盖 0.7–1.3 倍语速，WER 只是温和上升、SIM-o 基本不动。读法有两面：正面是填充 token 方案确实不把韵律钉死在单一尺度上，时长伸缩时模型能自动重排字音长度；反面是这属于相对宽松的合成条件——WER 对「读对字」敏感，对节奏是否自然不算敏感，而 ±30% 的语速失真人耳是很容易听出来的。鲁棒性声明成立，但「自然」与否这个协议没测。",
   "featured": false
  },
  {
   "id": "ann-021",
   "anchor": {
    "sentence_id": "s-3-2-1-8",
    "quote": "800,000 mini-batch updates with an effective mini-batch size of 307,200 audio frames"
   },
   "kind": "engineering",
   "title": "训练成本量级",
   "explanation": "307,200 帧 × 10.7ms ≈ 每个 mini-batch 约 55 分钟音频，训练 800,000 步——等效把约 83 万小时的音频过一遍，是对 Libriheavy 的十几次 epoch。这个量级说明：「Embarrassingly Easy」说的是架构和数据管线，不是训练便宜。极简架构把复杂度转嫁成了训练算力，否则无法解释为什么它要拖到训练后期才收敛过 Voicebox（3.6.1）。复现预算紧张时，论文（P2）路线给了提示：先用 200,000 小时无标注音频做掩码重建预训练，可以显著降低达到同等质量的下游训练量。",
   "featured": false
  }
 ]
};
