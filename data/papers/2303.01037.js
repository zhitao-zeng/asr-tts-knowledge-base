// 自动生成：2303.01037 全文双语精读数据（由 tools/compile_paper.js 装配）
// 结构/原文来自 .cache/papers/2303.01037.json（tools/extract_paper.py）；
// 翻译与讲解来自 .cache/papers/zh/2303.01037/（LLM agent 撰写）。
// 改翻译请改片段后重新装配；勿手改本文件的结构与 original 字段。
globalThis.PAPER_2303_01037 = {
 "paper_id": "2303.01037",
 "model_id": "google_usm",
 "title": {
  "original": "Google USM: Scaling Automatic Speech Recognition Beyond 100 Languages",
  "zh": "Google USM：把自动语音识别扩展到 100 种以上语言"
 },
 "sections": [
  {
   "id": "sec-yu-zhang",
   "num": null,
   "level": 2,
   "page": 1,
   "title": {
    "original": "Yu Zhang",
    "zh": "Yu Zhang（作者）"
   },
   "blocks": [
    {
     "id": "p-yu-zhang-1",
     "type": "paragraph",
     "page": 1,
     "sentences": [
      {
       "id": "s-yu-zhang-1-1",
       "original": "Wei Han James Qin Yongqiang Wang Ankur Bapna Zhehuai Chen",
       "zh": "（作者名单）Wei Han、James Qin、Yongqiang Wang、Ankur Bapna、Zhehuai Chen"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-nanxin-chen",
   "num": null,
   "level": 2,
   "page": 1,
   "title": {
    "original": "Nanxin Chen",
    "zh": "Nanxin Chen（作者）"
   },
   "blocks": [
    {
     "id": "p-nanxin-chen-1",
     "type": "paragraph",
     "page": 1,
     "sentences": [
      {
       "id": "s-nanxin-chen-1-1",
       "original": "Bo Li Vera Axelrod Gary Wang Zhong Meng Ke Hu",
       "zh": "（作者名单，续）Bo Li、Vera Axelrod、Gary Wang、Zhong Meng、Ke Hu"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-andrew-rosenberg",
   "num": null,
   "level": 2,
   "page": 1,
   "title": {
    "original": "Andrew Rosenberg",
    "zh": "Andrew Rosenberg（作者）"
   },
   "blocks": [
    {
     "id": "p-andrew-rosenberg-1",
     "type": "paragraph",
     "page": 1,
     "sentences": [
      {
       "id": "s-andrew-rosenberg-1-1",
       "original": "Rohit Prabhavalkar Daniel S.",
       "zh": "（作者名单，续）Rohit Prabhavalkar、Daniel S."
      },
      {
       "id": "s-andrew-rosenberg-1-2",
       "original": "Park Parisa Haghani",
       "zh": "（作者名单，续）Park、Parisa Haghani"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-jason-riesa",
   "num": null,
   "level": 2,
   "page": 1,
   "title": {
    "original": "Jason Riesa",
    "zh": "Jason Riesa"
   },
   "blocks": [
    {
     "id": "p-jason-riesa-1",
     "type": "paragraph",
     "page": 1,
     "sentences": [
      {
       "id": "s-jason-riesa-1-1",
       "original": "Ginger Perng Hagen Soltau Trevor Strohman",
       "zh": "（作者名单）Ginger Perng Hagen Soltau Trevor Strohman"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-bhuvana-ramabhadran",
   "num": null,
   "level": 2,
   "page": 1,
   "title": {
    "original": "Bhuvana Ramabhadran",
    "zh": "Bhuvana Ramabhadran"
   },
   "blocks": [
    {
     "id": "p-bhuvana-ramabhadran-1",
     "type": "paragraph",
     "page": 1,
     "sentences": [
      {
       "id": "s-bhuvana-ramabhadran-1-1",
       "original": "Tara Sainath Pedro Moreno Chung-Cheng Chiu",
       "zh": "（作者名单）Tara Sainath Pedro Moreno Chung-Cheng Chiu"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-johan-schalkwyk",
   "num": null,
   "level": 2,
   "page": 1,
   "title": {
    "original": "Johan Schalkwyk",
    "zh": "Johan Schalkwyk"
   },
   "blocks": [
    {
     "id": "p-johan-schalkwyk-1",
     "type": "paragraph",
     "page": 1,
     "sentences": [
      {
       "id": "s-johan-schalkwyk-1-1",
       "original": "Françoise Beaufays Yonghui Wu ∗†",
       "zh": "（作者名单）Françoise Beaufays Yonghui Wu ∗†"
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
       "original": "We introduce the Universal Speech Model (USM), a single large model that performs automatic speech recognition (ASR) across 100+ languages.",
       "zh": "我们提出通用语音模型（Universal Speech Model，USM），这是一个能在 100 多种语言上执行自动语音识别（ASR）的单一大型模型。"
      },
      {
       "id": "s-abstract-1-2",
       "original": "This is achieved by pre-training the encoder of the model on a large unlabeled multilingual dataset of 12 million (M) hours spanning over 300 languages, and fine-tuning on a smaller labeled dataset.",
       "zh": "其实现方式是：先在一个覆盖 300 多种语言、包含 12M（1200 万）小时无标注多语种音频的数据集上预训练模型的编码器，再在规模更小的有标注数据集上微调。"
      },
      {
       "id": "s-abstract-1-3",
       "original": "We use multilingual pre-training with random-projection quantization and speech-text modality matching to achieve state-of-the-art performance on downstream multilingual ASR and speech-to-text translation tasks.",
       "zh": "我们结合随机投影量化（random-projection quantization）的多语种预训练与语音-文本模态匹配，在下游多语种 ASR 和语音到文本翻译任务上取得了最优（state-of-the-art）性能。"
      },
      {
       "id": "s-abstract-1-4",
       "original": "We also demonstrate that despite using a labeled training set 1/7-th the size of that used for the Whisper model [1], our model exhibits comparable or better performance on both in-domain and out-of-domain speech recognition tasks across many languages.",
       "zh": "我们还证明，尽管使用的有标注训练集仅为 Whisper 模型 [1] 的 1/7（七分之一），我们的模型在众多语言的域内和域外语音识别任务上仍取得了相当或更优的性能。"
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
       "original": "Recent advances in self-supervised learning have ushered in a new era for speech recognition.",
       "zh": "自监督学习的最新进展开启了语音识别的新时代。"
      },
      {
       "id": "s-1-1-2",
       "original": "Whereas previous works focused mostly on improving the quality of monolingual models for mainstream languages, recent studies have increasingly turned to “universal” models [1–4].",
       "zh": "此前的工作大多专注于改进主流语言单语模型的质量，而最近的研究日益转向「通用」模型 [1–4]。"
      },
      {
       "id": "s-1-1-3",
       "original": "These may take the form of a single model that performs well on multiple tasks [1,2], or one that covers multiple domains [2,3], or one that supports multiple languages [1,5].",
       "zh": "这类模型可以是：在多个任务上都表现良好的单一模型 [1,2]，或覆盖多个领域的模型 [2,3]，或支持多种语言的模型 [1,5]。"
      },
      {
       "id": "s-1-1-4",
       "original": "In this work, we explore the frontiers of language expansion.",
       "zh": "在本工作中，我们探索语言扩展（language expansion）的边界。"
      },
      {
       "id": "s-1-1-5",
       "original": "Our long-term goal is to train a universal ASR model that covers all the spoken languages in the world.",
       "zh": "我们的长期目标是训练一个覆盖全世界所有口语语言的通用 ASR 模型。"
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
       "original": "A fundamental challenge in scaling speech technologies to many languages is obtaining enough data to train high-quality models.",
       "zh": "把语音技术扩展到众多语言的一个根本性挑战，在于如何获得足够的数据来训练高质量模型。"
      },
      {
       "id": "s-1-2-2",
       "original": "With conventional supervised training approaches, audio data needs to be manually transcribed, which is lengthy and expensive, or collected from existing transcribed sources which are hard to find for tail languages.",
       "zh": "采用传统的监督训练方法时，音频数据需要人工转写——这既耗时又昂贵；或者从已有的转写来源收集，但对于长尾语言这些来源很难找到。"
      },
      {
       "id": "s-1-2-3",
       "original": "While transcribed speech may be scarce in many ∗All authors are affiliated with Google Inc.",
       "zh": "尽管在许多语言中已转写的语音可能很稀缺（∗所有作者均供职于 Google Inc.）"
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
       "original": "†Contact author at ngyuzh@google.com.",
       "zh": "（†联系作者：ngyuzh@google.com。）"
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
       "original": "Preprint. languages, untranscribed speech and text data are practically unlimited.",
       "zh": "（预印本。）……但对于这些语言，未转写的语音和文本数据实际上是近乎无穷的。"
      },
      {
       "id": "s-1-4-2",
       "original": "Recent developments in semisupervised algorithms for speech recognition makes it possible to leverage such data for pre-training and produce high-quality speech models with a limited amount of transcribed data [3,6].",
       "zh": "语音识别半监督算法的最新进展，使我们可以利用此类数据进行预训练，只需有限的已转写数据即可产出高质量的语音模型 [3,6]。"
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
       "original": "Moreover, recent studies have shown that a single large model can utilize large data sets more effectively than smaller models [1,4].",
       "zh": "此外，近期研究表明单一大型模型能比小模型更有效地利用大数据集 [1,4]。"
      },
      {
       "id": "s-1-5-2",
       "original": "This all points to a promising direction where large amounts of unpaired multilingual speech and text data and smaller amounts of transcribed data can contribute to training a single large universal ASR model.",
       "zh": "这一切都指向一个有前景的方向：利用大量未配对的多语种语音与文本数据、加少量已转写数据，来训练一个单一的大型通用 ASR 模型。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-1-1",
   "num": "1.1",
   "level": 2,
   "page": 2,
   "title": {
    "original": "Our approach",
    "zh": "我们的方法"
   },
   "blocks": [
    {
     "id": "p-1-1-1",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-1-1-1-1",
       "original": "We produce large “Universal Speech Models\" (USMs) through a training pipeline that utilizes three types of datasets:",
       "zh": "我们通过一条利用三类数据集的训练流水线，构建出大型的「通用语音模型」（USM）："
      }
     ]
    },
    {
     "id": "p-1-1-2",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-1-1-2-1",
       "original": "• Unpaired Audio:",
       "zh": "• 未配对音频："
      }
     ]
    },
    {
     "id": "p-1-1-3",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-1-1-3-1",
       "original": "– YT-NTL-U: A large unlabeled multilingual dataset consisting of 12M hours of YouTube-based audio covering over 300 languages. – Pub-U: 429k hours of unlabeled speech in 51 languages based on public datasets.",
       "zh": "– YT-NTL-U：一个大型无标注多语音语种数据集，由 1200 万小时（12M）基于 YouTube 的音频组成，覆盖 300 多种语言。– Pub-U：基于公开数据集的 429k 小时无标注语音，覆盖 51 种语言。"
      }
     ]
    },
    {
     "id": "p-1-1-4",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-1-1-4-1",
       "original": "• Unpaired Text:",
       "zh": "• 未配对文本："
      }
     ]
    },
    {
     "id": "p-1-1-5",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-1-1-5-1",
       "original": "– Web-NTL: A large multilingual text-only corpus with 28B sentences spanning over 1140 languages.",
       "zh": "– Web-NTL：一个大型多语种纯文本语料库，包含 280 亿（28B）句，覆盖 1140 多种语言。"
      }
     ]
    },
    {
     "id": "p-1-1-6",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-1-1-6-1",
       "original": "• Paired ASR Data: We utilize two corpora of paired audio-text data with O(10k) hours of audio for supervised training.",
       "zh": "• 配对 ASR 数据：我们使用两个语音-文本配对语料库，音频规模为万小时级（O(10k) 小时），用于监督训练。"
      }
     ]
    },
    {
     "id": "p-1-1-7",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-1-1-7-1",
       "original": "– YT-SUP+: 90k hours of labeled multilingual data covering 73 language and 100k hours of en-US pseudo-labeled data generated by noisy student training (NST) [7,8] from YT-NTL-U. – Pub-S: 10k hours of labeled multi-domain en-US public data and 10k labeled multilingual public data covering 102 languages.",
       "zh": "– YT-SUP+：90k 小时覆盖 73 种语言的有标注多语种数据，另加 100k 小时由噪声学生训练（noisy student training，NST）[7,8] 从 YT-NTL-U 生成的 en-US 伪标注数据。– Pub-S：10k 小时多领域 en-US 公开有标注数据，以及 10k 小时覆盖 102 种语言的公开有标注多语种数据。"
      }
     ]
    },
    {
     "id": "p-1-1-8",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-1-1-8-1",
       "original": "2B-parameter Conformer [9] models are built using these datasets through the following steps:",
       "zh": "基于这些数据集，我们通过以下步骤构建 2B 参数的 Conformer [9] 模型："
      }
     ]
    },
    {
     "id": "p-1-1-9",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-1-1-9-1",
       "original": "1.",
       "zh": "1."
      },
      {
       "id": "s-1-1-9-2",
       "original": "Unsupervised Pre-training: BEST-RQ (BERT-based Speech pre-Training with Randomprojection Quantizer) [10] is used to pre-train the encoder of the model with YT-NTL-U.",
       "zh": "无监督预训练：使用 BEST-RQ（基于 BERT 的语音预训练 + 随机投影量化器，BERT-based Speech pre-Training with Random-projection Quantizer）[10]，在 YT-NTL-U 上预训练模型的编码器。"
      }
     ]
    },
    {
     "id": "p-1-1-10",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-1-1-10-1",
       "original": "2.",
       "zh": "2."
      },
      {
       "id": "s-1-1-10-2",
       "original": "MOST (Multi-Objective Supervised pre-Training): The model can optionally be further prepared by a multi-objective supervised pre-training pipeline that utilizes all three kinds of datasets: YT-NTL-U, Pub-U, Web-NTL and Pub-S.",
       "zh": "MOST（多目标监督预训练，Multi-Objective Supervised pre-Training）：还可以选择性地通过一个多目标监督预训练流水线进一步准备模型，该流水线利用全部三类数据集：YT-NTL-U、Pub-U、Web-NTL 和 Pub-S。"
      },
      {
       "id": "s-1-1-10-3",
       "original": "Here, a weighted sum of the BEST- RQ masked language model loss [11], along with the text-injection losses (including the supervised ASR loss and modality matching losses) [12,13] is optimized during training.",
       "zh": "在这一步中，训练时优化的是 BEST-RQ 掩码语言模型损失 [11] 与文本注入（text-injection）损失（包括监督 ASR 损失和模态匹配损失）[12,13] 的加权和。"
      }
     ]
    },
    {
     "id": "p-1-1-11",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-1-1-11-1",
       "original": "3.",
       "zh": "3."
      },
      {
       "id": "s-1-1-11-2",
       "original": "Supervised ASR Training: We produce generic ASR models trained with connectionist temporal classification (CTC) [14] and Listen, Attend, and Spell (LAS) [15] tranducers for downstream tasks.",
       "zh": "监督 ASR 训练：我们产出使用连接时序分类（connectionist temporal classification，CTC）[14] 和 Listen, Attend, and Spell（LAS）[15] Transducer 训练的通用 ASR 模型，用于下游任务。"
      }
     ]
    },
    {
     "id": "p-1-1-12",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-1-1-12-1",
       "original": "Two types of models are produced through this pipeline—pre-trained models that can be fine-tuned on downstream tasks, and generic ASR models for which we assume no downstream fine-tuning occurs.",
       "zh": "这条流水线性地产出两类模型：可在下游任务上微调的预训练模型；以及我们假定不再进行下游微调的通用 ASR 模型。"
      },
      {
       "id": "s-1-1-12-2",
       "original": "The generic ASR models are trained with chunk-wise attention, which we introduce later in this report.",
       "zh": "通用 ASR 模型使用分块注意力（chunk-wise attention）训练，我们将在后文中介绍。"
      }
     ]
    },
    {
     "id": "tab-1-1-1",
     "type": "table_caption",
     "page": 2,
     "original": "Table 1: USM models prepared in this work. The generic ASR models are trained on a large \"upstream\" ASR corpus and not finetuned further, while the pre-trained models are fine-tuned on downstream tasks.",
     "zh": "表 1：本工作准备的 USM 模型。通用 ASR 模型在大规模“上游”ASR 语料上训练且不再微调，而预训练模型则在下游任务上微调。"
    },
    {
     "id": "p-1-1-13",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-1-1-13-1",
       "original": "BEST-RQ MOST Model-Type Decoder Upstream Chunk-wise ASR Dataset Attention USM YT-NTL-U Pre-trained Downstream Dependent USM-M Pre-trained Downstream Dependent USM-LAS Generic ASR LAS YT-SUP+ USM-CTC Generic ASR CTC YT-SUP+ We denote the pre-trained models USM and USM-M, where the appendix -M indicates that MOST has been utilized for the preparation of the model.",
       "zh": "（Table 1 正文，抽取已打散为句子，保留原序）BEST-RQ MOST 模型类型 解码器 上游数据集 分块注意力：USM — 上游 YT-NTL-U，预训练型，下游解码器按需选择；USM-M — 预训练型，下游解码器按需选择；USM-LAS — 通用 ASR，解码器 LAS，上游 YT-SUP+；USM-CTC — 通用 ASR，解码器 CTC，上游 YT-SUP+。我们将预训练模型记作 USM 和 USM-M，其中后缀 -M 表示模型准备过程中使用了 MOST。"
      },
      {
       "id": "s-1-1-13-2",
       "original": "The USM and USM-M models can be further fine-tuned on the downstream task of choice with an appropriate transducer unit, which can be a CTC, LAS or RNN transducer (RNN-T) unit.",
       "zh": "USM 和 USM-M 模型可以在选定的下游任务上，配合合适的 Transducer 单元进行微调——可以是 CTC、LAS 或 RNN Transducer（RNN-T）单元。"
      },
      {
       "id": "s-1-1-13-3",
       "original": "We evaluate our USM models on two types of benchmarks:",
       "zh": "我们在两类基准上评估 USM 模型："
      }
     ]
    },
    {
     "id": "p-1-1-14",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-1-1-14-1",
       "original": "• Automatic Speech Recognition (ASR): We use YouTube data to train USMs for YouTube (e.g., closed captions).",
       "zh": "• 自动语音识别（ASR）：我们用 YouTube 数据为 YouTube 场景（如自动字幕）训练 USM。"
      },
      {
       "id": "s-1-1-14-2",
       "original": "We evaluate the USMs on two public benchmarks, SpeechStew [2] and FLEURS [16].",
       "zh": "我们在两个公开基准 SpeechStew [2] 和 FLEURS [16] 上评估 USM。"
      },
      {
       "id": "s-1-1-14-3",
       "original": "We also report results on the long-form test set CORAAL [17] for which only the evaluation set is available.",
       "zh": "我们还报告了长音频测试集 CORAAL [17] 上的结果，该数据集只有评估集可用。"
      }
     ]
    },
    {
     "id": "p-1-1-15",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-1-1-15-1",
       "original": "• Automatic Speech Translation (AST): We test AST performance on CoVoST 2 [18].",
       "zh": "• 自动语音翻译（AST）：我们在 CoVoST 2 [18] 上测试 AST 性能。"
      }
     ]
    },
    {
     "id": "p-1-1-16",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-1-1-16-1",
       "original": "As indicated in Table 1, the generic ASR models are trained with YT-SUP+ and not fine-tuned on domain-specific datasets for downstream ASR tasks.",
       "zh": "如 Table 1 所示，通用 ASR 模型在 YT-SUP+ 上训练，且不为下游 ASR 任务在特定领域数据集上微调。"
      },
      {
       "id": "s-1-1-16-2",
       "original": "We, however, explore the possibility of attaching additional “adapter\" units [19] to both generic and pre-trained ASR models and training adapter weights while keeping the rest of the model frozen.",
       "zh": "不过，我们探索了另一种可能：为通用 ASR 模型和预训练 ASR 模型挂载额外的「适配器」（adapter）单元 [19]，并在保持模型其余部分冻结的情况下训练适配器权重。"
      }
     ]
    },
    {
     "id": "p-1-1-17",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-1-1-17-1",
       "original": "Text-injection + BEST-RQ + Conformer Encoder BEST-RQ + Supervised ASR loss RNN-T - Low Resource CTC - Long-form LAS - Short-form and Speech Translation Multi-Objective Supervised Pre-Training Unsupervised Pre-training Unsupervised Audio from hundreds of languages, ~10M hrs High/Mid resource supervised data 100h to 10k per language 80% of compute 15% of compute In-domain Fine-tuning with task specific transducer Unsupervised Task specific paired data Text data 28B sentences in over 1000 languages 5% of compute",
       "zh": "（Figure 1 内嵌流程图文字，抽取已打散）文本注入 + BEST-RQ + Conformer 编码器；BEST-RQ + 监督 ASR 损失；RNN-T 用于低资源，CTC 用于长音频，LAS 用于短音频与语音翻译；多目标监督预训练；无监督预训练；来自数百种语言的无监督音频，约 10M（1000 万）小时；高/中资源监督数据每语言 100 至 10k（1 万）小时；占 80% 算力、15% 算力；用任务特定的 Transducer 做域内微调；无监督数据；任务特定的配对数据；超过 1000 种语言的 28B（280 亿）句文本数据；占 5% 算力。"
      }
     ]
    },
    {
     "id": "fig-1-1-1",
     "type": "figure_caption",
     "page": 3,
     "original": "Figure 1: An overview of our approach. Training is split into three stages. (i) The first stage trains a conformer backbone on a large unlabeled speech dataset, optimizing for the BEST-RQ objective. (ii) We continue training this speech representation learning model while optimizing for multiple objectives, the BEST-RQ objective on unlabeled speech, the modality matching, supervised ASR and duration modeling losses on paired speech and transcript data and the text reconstruction objective with an RNN-T decoder on unlabeled text. (iii) The third stage fine-tunes this pre-trained encoder on the ASR or AST tasks.",
     "zh": "图 1：我们方法的总览。训练分为三个阶段。(i) 第一阶段在大型无标注语音数据集上训练 Conformer 主干，优化 BEST-RQ 目标。(ii) 我们接着继续训练该语音表征学习模型，同时优化多个目标：无标注语音上的 BEST-RQ 目标、配对语音-转写数据上的模态匹配损失、监督 ASR 损失与时长建模损失，以及用 RNN-T 解码器在无标注文本上的文本重建目标。(iii) 第三阶段在 ASR 或 AST 任务上微调这个预训练编码器。"
    },
    {
     "id": "p-1-1-18",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-1-1-18-1",
       "original": "The overall training pipeline of our models is summarized in Fig. 1.",
       "zh": "我们模型的整体训练流水线概括于 Fig. 1。"
      },
      {
       "id": "s-1-1-18-2",
       "original": "In our design, once a large amount of compute is expended in the pre-training stages, the downstream application can be conveniently fine-tuned from a model trained from stage-1 or stage-2 with a task-specific transducer.",
       "zh": "在我们的设计中，一旦在预训练阶段投入了大量算力，下游应用就可以方便地从阶段 1 或阶段 2 的模型出发、配合任务特定的 Transducer 进行微调。"
      },
      {
       "id": "s-1-1-18-3",
       "original": "Our experimental results demonstrate that this pipelined training framework enables us to build both generic multilingual ASR systems and domain specific models with state-of-the-art performance.",
       "zh": "我们的实验结果表明，这一流水线式训练框架使我们既能构建通用多语种 ASR 系统，也能构建达到最先进水平的领域特定模型。"
      }
     ]
    },
    {
     "id": "p-1-1-19",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-1-1-19-1",
       "original": "We next present the key findings of our research, provide an overall view of the report, and review related work.",
       "zh": "接下来，我们给出本研究的关键发现，介绍本报告的整体结构，并回顾相关工作。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-1-2",
   "num": "1.2",
   "level": 2,
   "page": 3,
   "title": {
    "original": "Key Findings",
    "zh": "关键发现"
   },
   "blocks": [
    {
     "id": "p-1-2-1",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-1-2-1-1",
       "original": "SoTA results for downstream multilingual speech tasks: Our USM models achieve state-of-the-art performance for multilingual ASR and AST for multiple datasets in multiple domains.",
       "zh": "下游多语种语音任务的最优（SoTA）结果：我们的 USM 模型在多语种 ASR 和 AST 的多个数据集、多个领域上取得了最先进性能。"
      },
      {
       "id": "s-1-2-1-2",
       "original": "This includes SpeechStew (mono-lingual ASR) [2], CORAAL (African American Vernacular English (AAVE) ASR) [17], FLEURS (multi-lingual ASR) [16], YT (multilingual long-form ASR), and CoVoST (AST from English to multiple languages).",
       "zh": "这包括 SpeechStew（单语 ASR）[2]、CORAAL（非裔美国人白话英语（AAVE）ASR）[17]、FLEURS（多语种 ASR）[16]、YT（多语种长音频 ASR）以及 CoVoST（从英语到多语言的 AST）。"
      },
      {
       "id": "s-1-2-1-3",
       "original": "We depict our model’s performance in the first panel of Fig. 2.",
       "zh": "我们在 Fig. 2 的第一个面板中展示了模型的性能。"
      },
      {
       "id": "s-1-2-1-4",
       "original": "We also build an ASR model for YouTube captioning – i.e., the transcription of speech in YouTube videos, that achieves < 30% WER on 73 languages.",
       "zh": "我们还为 YouTube 字幕——即 YouTube 视频中语音的转写——构建了一个 ASR 模型，在 73 种语言上达到 < 30% WER。"
      },
      {
       "id": "s-1-2-1-5",
       "original": "With only 90k hours of supervised data, this model performs better than Whisper [1], a strong general ASR system trained on more than",
       "zh": "仅用 90k 小时监督数据，这个模型的表现就优于 Whisper [1]——一个用超过 400k 小时（见下句）转写数据训练的强通用 ASR 系统。"
      }
     ]
    },
    {
     "id": "fig-1-2-1",
     "type": "figure_caption",
     "page": 4,
     "original": "Figure 2: (Left)† WERs (%) Our language expansion effort to support more languages on YouTube (73 languages) and extending to 100+ languages on the public dataset (FLEURS). Lower is better. To the best of our knowledge, no published model can successfully decode all 73 languages from our YouTube set, thus we only list our results. (Middle)† Our results on ASR benchmarks, with or without in-domain data. Lower is better. (Right) SoTA results on public speech translation tasks. Results presented are presented as high/middle/low resources languages defined in [20]. Higher is better.",
     "zh": "图 2：（左）† WER（%）：我们在 YouTube 上支持更多语言（73 种语言）的语言扩展工作，以及在公开数据集（FLEURS）上扩展到 100+ 种语言。越低越好。据我们所知，没有任何已发表模型能成功解码我们 YouTube 集合中的全部 73 种语言，因此只列出了我们自己的结果。（中）† 我们在 ASR 基准上的结果，包含有/无域内数据两种设定。越低越好。（右）公开语音翻译任务上的最优结果。结果按 [20] 中定义的高/中/低资源语言分组呈现。越高越好。"
    },
    {
     "id": "p-1-2-2",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-1-2-2-1",
       "original": "400k hours of transcribed data (we select 18 languages that Whisper can successfully decode with lower than 40% WER).",
       "zh": "（接上句）……即 Whisper 使用的超过 400k 小时转写数据（我们选取了 18 种 Whisper 能成功解码且 WER 低于 40% 的语言进行比较）。"
      },
      {
       "id": "s-1-2-2-2",
       "original": "The second panel of Fig. 2 demonstrates that our YouTube captions model generalizes well to unseen domains.",
       "zh": "Fig. 2 的第二个面板表明，我们的 YouTube 字幕模型能很好地泛化到未见过的领域。"
      }
     ]
    },
    {
     "id": "p-1-2-3",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-1-2-3-1",
       "original": "BEST-RQ is a scalable speech representation learner: We find that BEST-RQ pre-training can effectively scale to the very large data regime with a 2B parameter Conformer-based backbone, comparing favorably against Wav2Vec 2.0 [6] and W2v-BERT [21] in this setting.",
       "zh": "BEST-RQ 是可扩展的语音表征学习器：我们发现，基于 2B 参数 Conformer 主干，BEST-RQ 预训练可以有效扩展到超大规模数据场景，并且在该设定下与 Wav2Vec 2.0 [6] 和 W2v-BERT [21] 相比表现更优。"
      }
     ]
    },
    {
     "id": "p-1-2-4",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-1-2-4-1",
       "original": "MOST (BEST-RQ + text-injection) is a scalable speech and text representation learner: We demonstrate that MOST is an effective method for utilizing large scale text data for improving quality on downstream speech tasks, as demonstrated by quality gains exhibited for the FLEURS and CoVoST 2 tasks. Fig. 2 depicts USM’s performance, establishing a new state-of-the-art on the FLEURS benchmark across 102 languages for ASR and on CoVoST 2 across 21 languages on AST.",
       "zh": "MOST（BEST-RQ + 文本注入）是可扩展的语音与文本表征学习器：我们证明 MOST 是一种利用大规模文本数据提升下游语音任务质量的有效方法——FLEURS 和 CoVoST 2 任务上的质量提升即为例证。Fig. 2 描绘了 USM 的性能：在 FLEURS 基准的 102 种语言 ASR 任务上、以及 CoVoST 2 的 21 种语言 AST 任务上建立了新的最先进水平。"
      }
     ]
    },
    {
     "id": "p-1-2-5",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-1-2-5-1",
       "original": "Representations from MOST (BEST-RQ + text-injection) can quickly adapt to new domains: We find that it is possible to obtain powerful downstream ASR/AST models by attaching and training light-weight residual adapter modules, which only add 2% of additional parameters, while keeping the rest of the model frozen.",
       "zh": "来自 MOST（BEST-RQ + 文本注入）的表征可以快速适配新领域：我们发现，只需挂载并训练轻量的残差适配器（residual adapter）模块——仅增加 2% 的额外参数，同时保持模型其余部分冻结——即可获得强大的下游 ASR/AST 模型。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-chunk-wise-attention-for-robust-",
   "num": null,
   "level": 2,
   "page": 4,
   "title": {
    "original": "Chunk-wise attention for robust long-form speech recognition:",
    "zh": "分块注意力实现鲁棒的长音频语音识别"
   },
   "blocks": [
    {
     "id": "p-chunk-wise-attention-for-robust--1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-chunk-wise-attention-for-robust--1-1",
       "original": "We introduce chunk-wise attention, an effective, scalable method for extending the performance of ASR models trained on shorter utterances to very long speech inputs.",
       "zh": "我们提出分块注意力（chunk-wise attention），这是一种有效且可扩展的方法，能把在较短语句上训练的 ASR 模型的性能扩展到非常长的语音输入。"
      },
      {
       "id": "s-chunk-wise-attention-for-robust--1-2",
       "original": "We find that the USM-CTC/LAS models trained with chunk-wise attention is able to produce high-quality transcripts for very long utterances in the YouTube evaluation sets.",
       "zh": "我们发现，使用分块注意力训练的 USM-CTC/LAS 模型能够在 YouTube 评估集上为超长语句产出高质量转写。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-1-3",
   "num": "1.3",
   "level": 2,
   "page": 4,
   "title": {
    "original": "Outline",
    "zh": "报告结构"
   },
   "blocks": [
    {
     "id": "p-1-3-1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-1-3-1-1",
       "original": "The outline of this report is as follows:",
       "zh": "本报告的结构如下："
      }
     ]
    },
    {
     "id": "p-1-3-2",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-1-3-2-1",
       "original": "Methods: We review the architecture and the methods used in the paper.",
       "zh": "方法：我们回顾论文中使用的架构与方法。"
      },
      {
       "id": "s-1-3-2-2",
       "original": "We provide brief summaries of the Conformer [9], BEST-RQ [10], text-injection [12, 13] used for MOST, and Noisy Student Training (NST) [7,8].",
       "zh": "我们对 Conformer [9]、BEST-RQ [10]、MOST 所用的文本注入（text-injection）[12, 13] 以及噪声学生训练（NST）[7,8] 做简要概述。"
      },
      {
       "id": "s-1-3-2-3",
       "original": "We also introduce chunk-wise attention for scalable training on long utterances.",
       "zh": "我们还介绍用于长语句可扩展训练的分块注意力。"
      }
     ]
    },
    {
     "id": "p-1-3-3",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-1-3-3-1",
       "original": "Data: We describe the four types of datasets used to train our models: the unlabeled multilingual speech dataset YT-NTL-U, the multilingual text corpus Web-NTL, labeled datasets, and pseudolabeled datasets.",
       "zh": "数据：我们描述用于训练模型的四类数据集：无标注多语种语音数据集 YT-NTL-U、多语种文本语料 Web-NTL、有标注数据集，以及伪标注数据集。"
      }
     ]
    },
    {
     "id": "p-1-3-4",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-1-3-4-1",
       "original": "Key Results: We present the performance of our USM models on downstream ASR and AST tasks.",
       "zh": "关键结果：我们展示 USM 模型在下游 ASR 与 AST 任务上的性能。"
      },
      {
       "id": "s-1-3-4-2",
       "original": "We demonstrate that USM establishes new states-of-the-art on several speech understanding benchmarks.",
       "zh": "我们证明 USM 在若干语音理解基准上建立了新的最先进水平。"
      }
     ]
    },
    {
     "id": "p-1-3-5",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-1-3-5-1",
       "original": "Analysis and Ablations: We present analysis of the effects of the key components of our work and compare their performance against existing methods.",
       "zh": "分析与消融：我们分析本工作关键组件的影响，并将其性能与已有方法比较。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-1-4",
   "num": "1.4",
   "level": 2,
   "page": 5,
   "title": {
    "original": "Related Work",
    "zh": "相关工作"
   },
   "blocks": [
    {
     "id": "p-1-4-1",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-1-4-1-1",
       "original": "There is extensive literature on pre-training [6,12,22–33] and self-training [8,34–44] for ASR.",
       "zh": "关于 ASR 的预训练 [6,12,22–33] 与自训练 [8,34–44] 已有大量文献。"
      },
      {
       "id": "s-1-4-1-2",
       "original": "Large speech models trained on large datasets have been studied previously in both monolingual [3] and multilingual contexts [1,4].",
       "zh": "在大数据集上训练的大型语音模型，此前已在单语 [3] 与多语种 [1,4] 场景中被研究过。"
      },
      {
       "id": "s-1-4-1-3",
       "original": "Large multi-modal speech models have been explored in [13,20,45–54].",
       "zh": "大型多模态语音模型已在 [13,20,45–54] 中被探索。"
      },
      {
       "id": "s-1-4-1-4",
       "original": "Various unsupervised pre-training methods for speech models have been proposed and applied in [6,10,21].",
       "zh": "各种针对语音模型的无监督预训练方法已在 [6,10,21] 中被提出和应用。"
      }
     ]
    },
    {
     "id": "p-1-4-2",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-1-4-2-1",
       "original": "Our work is an extension of a host of recent research efforts [3, 10, 13, 53, 55] that have studied semi-supervised learning for ASR in the context of deep-learning.",
       "zh": "我们的工作是一系列近期研究 [3, 10, 13, 53, 55] 的延伸，这些研究在深度学习框架下研究了 ASR 的半监督学习。"
      },
      {
       "id": "s-1-4-2-2",
       "original": "Large speech models (> 1B) were first studied in [3]; we expand upon this approach to train multilingual speech models in this work.",
       "zh": "大型语音模型（> 1B 参数）最早由 [3] 研究；本工作在这一路线的基础上训练多语种语音模型。"
      },
      {
       "id": "s-1-4-2-3",
       "original": "We improve the methods used in [3] by employing a more scalable self-supervised learning algorithm (BEST-RQ) and additionally applying multi-modal pre-training (text-injection) to prepare the models.",
       "zh": "我们通过采用更具可扩展性的自监督学习算法（BEST-RQ），并额外施加多模态预训练（文本注入）来准备模型，从而改进了 [3] 中的方法。"
      },
      {
       "id": "s-1-4-2-4",
       "original": "We introduce an improvement to BEST-RQ [10] by utilizing a multi-softmax loss.",
       "zh": "我们通过使用多 softmax 损失对 BEST-RQ [10] 做出改进。"
      },
      {
       "id": "s-1-4-2-5",
       "original": "We also incorporate Multi-Objective Supervised Training (BEST-RQ with text-injection) to improve the quality of speech representations learnt during pre-training, by utilizing transcribed data and unlabeled text.",
       "zh": "我们还纳入了多目标监督训练（BEST-RQ 结合文本注入），利用已转写数据和无标注文本来提升预训练中学到的语音表征质量。"
      },
      {
       "id": "s-1-4-2-6",
       "original": "Long-form ASR has been studied in [1,56,57]; we propose chunk-wise attention as an alternative solution to chunk-based decoding.",
       "zh": "长音频 ASR 已在 [1,56,57] 中被研究；我们提出分块注意力作为基于分块解码的替代方案。"
      }
     ]
    },
    {
     "id": "p-1-4-3",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-1-4-3-1",
       "original": "In this paper, we propose a scalable self-supervised training framework for multilingual ASR which extends to hundreds of languages.",
       "zh": "在本文中，我们提出一个面向多语种 ASR 的可扩展自监督训练框架，可扩展到数百种语言。"
      },
      {
       "id": "s-1-4-3-2",
       "original": "In particular:",
       "zh": "具体而言："
      }
     ]
    },
    {
     "id": "p-1-4-4",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-1-4-4-1",
       "original": "• We demonstrate that USMs pre-trained on 300 languages can successfully adapt to both ASR and AST tasks in new languages with a small amount of supervised data. • We build a generic ASR model on 73 languages by fine-tuning pre-trained models on 90k hours of supervised data.",
       "zh": "• 我们证明，在 300 种语言上预训练的 USM，只需少量监督数据即可成功适配新语言的 ASR 与 AST 任务。• 我们通过在 90k 小时监督数据上微调预训练模型，构建了一个覆盖 73 种语言的通用 ASR 模型。"
      },
      {
       "id": "s-1-4-4-2",
       "original": "We show that the generic ASR models can carry out inference efficiently on TPUs and can reliably transcribe hours-long audio on YouTube Caption ASR benchmarks. • We conduct a systematic study on the effects of pre-training, noisy student training, text injection, and model size for multilingual ASR.",
       "zh": "• 我们展示通用 ASR 模型可以在 TPU 上高效推理，并能在 YouTube 字幕 ASR 基准上可靠地转写数小时长的音频。• 我们对预训练、噪声学生训练、文本注入以及模型规模对多语种 ASR 的影响进行了系统研究。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-2",
   "num": "2",
   "level": 1,
   "page": 5,
   "title": {
    "original": "Methods",
    "zh": "方法"
   },
   "blocks": []
  },
  {
   "id": "sec-2-1",
   "num": "2.1",
   "level": 2,
   "page": 5,
   "title": {
    "original": "Model Architecture: Conformer",
    "zh": "模型架构：Conformer"
   },
   "blocks": [
    {
     "id": "p-2-1-1",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-2-1-1-1",
       "original": "We use the convolution-augmented transformer [9], or Conformer, with relative attention [58] as an encoder model.",
       "zh": "我们使用卷积增强 Transformer（convolution-augmented transformer）[9]——即 Conformer——配合相对注意力（relative attention）[58] 作为编码器模型。"
      },
      {
       "id": "s-2-1-1-2",
       "original": "For downstream speech tasks such as ASR or AST, the features produced by the Conformer are either used as an input to a connectionist temporal classification (CTC) [14], RNN transducer (RNN-T) [59] or a Listen, Attend, and Spell (LAS) [15] unit after additional projection.",
       "zh": "对于 ASR 或 AST 等下游语音任务，Conformer 产生的特征经过额外投影后，作为连接时序分类（CTC）[14]、RNN Transducer（RNN-T）[59] 或 Listen, Attend, and Spell（LAS）[15] 单元的输入。"
      },
      {
       "id": "s-2-1-1-3",
       "original": "As will be discussed further, BEST-RQ pre-training is exclusively applied to the encoder, while other forms of training (e.g., T5 [60]) train the entire task network as a whole.",
       "zh": "后文将进一步讨论：BEST-RQ 预训练只作用于编码器，而其他形式的训练（例如 T5 [60]）会把整个任务网络作为一个整体来训练。"
      }
     ]
    },
    {
     "id": "p-2-1-2",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-2-1-2-1",
       "original": "For our experiments, we consider two models with 600M and 2B parameters respectively.",
       "zh": "在实验中，我们考虑两个模型，参数量分别为 600M 和 2B。"
      },
      {
       "id": "s-2-1-2-2",
       "original": "While the main results presented have been obtained using the 2B model, the 600M model is utilized for ablation studies and observing model scaling behavior.",
       "zh": "主要结果均使用 2B 模型获得，而 600M 模型用于消融实验和观察模型规模扩展行为。"
      },
      {
       "id": "s-2-1-2-3",
       "original": "Some features of the models are listed in Table 2.",
       "zh": "模型的一些特性列于 Table 2。"
      }
     ]
    },
    {
     "id": "tab-2-1-1",
     "type": "table_caption",
     "page": 5,
     "original": "Table 2: Conformer model parameters.",
     "zh": "表 2：Conformer 模型参数。"
    },
    {
     "id": "p-2-1-3",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-2-1-3-1",
       "original": "# Params (B) # Layers Dimension Att.",
       "zh": "（Table 2 表头）参数量（B）/ 层数 / 维度 / 注意力头数。"
      },
      {
       "id": "s-2-1-3-2",
       "original": "Heads Conv.",
       "zh": "（Table 2 表头续）卷积核大小。"
      },
      {
       "id": "s-2-1-3-3",
       "original": "Kernel Size Conformer-0.6 0.6 24 1024 8 5 2.0 32 1536 16 5",
       "zh": "（Table 2 正文）Conformer-0.6：参数量 0.6B、24 层、维度 1024、8 个注意力头、卷积核大小 5；Conformer-2B：参数量 2.0B、32 层、维度 1536、16 个注意力头、卷积核大小 5。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-2-2",
   "num": "2.2",
   "level": 2,
   "page": 5,
   "title": {
    "original": "Pre-training: BEST-RQ",
    "zh": "预训练：BEST-RQ"
   },
   "blocks": [
    {
     "id": "p-2-2-1",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-2-2-1-1",
       "original": "We select BEST-RQ [10] as the method to pre-train our networks with speech audio.",
       "zh": "我们选择 BEST-RQ [10] 作为用语音音频预训练网络的方法。"
      },
      {
       "id": "s-2-2-1-2",
       "original": "BEST-RQ provides a simple framework with a small number of hyperparameters for unsupervised training on",
       "zh": "BEST-RQ 提供了一个超参数很少的简洁框架，用于在（下接）"
      }
     ]
    },
    {
     "id": "fig-2-2-1",
     "type": "figure_caption",
     "page": 6,
     "original": "Figure 3: BEST-RQ based pre-training with conformer encoder.",
     "zh": "图 3：基于 BEST-RQ、使用 Conformer 编码器的预训练。"
    },
    {
     "id": "p-2-2-2",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-2-2-2-1",
       "original": "large-scale unlabeled audio data.",
       "zh": "（接上句）大规模无标注音频数据上进行无监督训练。"
      },
      {
       "id": "s-2-2-2-2",
       "original": "We discuss the comparative advantage of BEST-RQ against other pre-training methods in section 5.3.",
       "zh": "我们在 5.3 节讨论 BEST-RQ 相对于其他预训练方法的比较优势。"
      }
     ]
    },
    {
     "id": "p-2-2-3",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-2-2-3-1",
       "original": "BEST-RQ employs a BERT-style training task for the audio input that attempts to predict masked speech features.",
       "zh": "BEST-RQ 对音频输入采用 BERT 式训练任务，目标是预测被掩码的语音特征。"
      },
      {
       "id": "s-2-2-3-2",
       "original": "To make the task compatible with BERT-style training, the original speech features corresponding to the masked frames are quantized, and the task requires predicting the quantized label of these features.",
       "zh": "为使该任务与 BERT 式训练兼容，被掩码帧对应的原始语音特征会被量化，任务要求预测这些特征的量化标签。"
      },
      {
       "id": "s-2-2-3-3",
       "original": "For a given number of quantization targets c, random “codebook\" vectors v0, · · · , vc−1 are chosen in an embedding space.",
       "zh": "给定量化目标数量 c，在嵌入空间中随机选取 c 个“码本”向量 v0, · · · , vc−1。"
      },
      {
       "id": "s-2-2-3-4",
       "original": "The discrete label of the speech feature is obtained by first projecting the feature into the embedding space by a randomly initialized, frozen projection matrix and then finding the closest codebook vector.",
       "zh": "语音特征的离散标签这样获得：先用一个随机初始化且冻结的投影矩阵把特征投影到嵌入空间，然后找出距离最近的码本向量。"
      },
      {
       "id": "s-2-2-3-5",
       "original": "The index of this codebook vector is identified as the label of the speech feature.",
       "zh": "该码本向量的下标即被确定为这段语音特征的标签。"
      },
      {
       "id": "s-2-2-3-6",
       "original": "Cosine similarity is used as the distance measure for determining the code.",
       "zh": "确定码时使用余弦相似度作为距离度量。"
      }
     ]
    },
    {
     "id": "p-2-2-4",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-2-2-4-1",
       "original": "We note that while w2v-BERT [21] pre-training has proven to be an effective method for unsupervised pre-training, it requires an additional quantization module which introduces more complexity.",
       "zh": "我们注意到，虽然 w2v-BERT [21] 预训练已被证明是一种有效的无监督预训练方法，但它需要额外的量化模块，引入了更多复杂性。"
      },
      {
       "id": "s-2-2-4-2",
       "original": "As we increase the model size and language coverage, the learnt codebook module proves costly to tune and can impede progress of model development.",
       "zh": "随着模型规模和语言覆盖度的增加，学习得到的码本模块被证明调参代价高昂，且会阻碍模型开发进度。"
      },
      {
       "id": "s-2-2-4-3",
       "original": "Meanwhile, the BEST-RQ algorithm does not require such a module, making it a more scalable method for pre-training.",
       "zh": "相比之下，BEST-RQ 算法不需要这样的模块，因此是更具可扩展性的预训练方法。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-2-2-1",
   "num": "2.2.1",
   "level": 2,
   "page": 6,
   "title": {
    "original": "Multi-softmax",
    "zh": "多 softmax"
   },
   "blocks": [
    {
     "id": "p-2-2-1-1",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-2-2-1-1-1",
       "original": "Instead of utilizing a single codebook [10], we use multiple codebooks to improve BEST-RQ training in this study.",
       "zh": "本研究不使用单一码本 [10]，而是使用多个码本来改进 BEST-RQ 训练。"
      },
      {
       "id": "s-2-2-1-1-2",
       "original": "More precisely, we use N softmax layers to produce N probability predictions from the output of the encoder to compare against N independent quantization targets obtained from the masked speech features.",
       "zh": "更准确地说，我们使用 N 个 softmax 层从编码器输出产生 N 个概率预测，与从被掩码语音特征得到的 N 个相互独立的量化目标分别比较。"
      },
      {
       "id": "s-2-2-1-1-3",
       "original": "We train the network with equal weights for each softmax layer.",
       "zh": "训练时每个 softmax 层使用相同的权重。"
      },
      {
       "id": "s-2-2-1-1-4",
       "original": "The use of multiple codebooks improves the stability and convergence of the model.",
       "zh": "使用多个码本提升了模型的稳定性与收敛速度。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-2-3",
   "num": "2.3",
   "level": 2,
   "page": 6,
   "title": {
    "original": "Self-training: Noisy Student Training",
    "zh": "自训练：噪声学生训练"
   },
   "blocks": [
    {
     "id": "p-2-3-1",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-2-3-1-1",
       "original": "We utilize noisy student training (NST) [7,8] to generate pseudo-labeled data to augment supervised training.",
       "zh": "我们利用噪声学生训练（noisy student training，NST）[7,8] 生成伪标注数据来增强监督训练。"
      },
      {
       "id": "s-2-3-1-2",
       "original": "This is done by first training a teacher model with augmentation on a supervised set, then using that teacher to generate transcripts for unlabeled audio data.",
       "zh": "做法是：先在监督数据集上带数据增强训练一个教师模型，再用该教师模型为无标注音频生成转写文本。"
      },
      {
       "id": "s-2-3-1-3",
       "original": "A heuristic filtering method based on the ratio between the number of words and audio length is used to filter the pseudo-labeled data.",
       "zh": "我们使用一种基于词数与音频时长之比的启发式过滤方法来筛选伪标注数据。"
      },
      {
       "id": "s-2-3-1-4",
       "original": "The pseudo-labeled data is mixed with supervised data to train the student model.",
       "zh": "伪标注数据与监督数据混合，用于训练学生模型。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-2-4",
   "num": "2.4",
   "level": 2,
   "page": 6,
   "title": {
    "original": "Chunk-wise Attention for Long-form ASR",
    "zh": "用于长音频 ASR 的分块注意力"
   },
   "blocks": [
    {
     "id": "p-2-4-1",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-2-4-1-1",
       "original": "In many real-world applications, ASR systems are required to transcribe minutes- or hours-long audio.",
       "zh": "在许多实际应用中，ASR 系统需要转写数分钟乃至数小时长的音频。"
      },
      {
       "id": "s-2-4-1-2",
       "original": "This poses significant challenges to many end-to-end ASR systems, as these ASR systems are usually trained on much shorter segments, typically less than 30 seconds.",
       "zh": "这对许多端到端 ASR 系统构成了重大挑战，因为这些系统通常在短得多的片段上训练——通常不到 30 秒。"
      },
      {
       "id": "s-2-4-1-3",
       "original": "For systems that use attention-based encoders, it is impractical to use global attention to attend to the entire audio.",
       "zh": "对于使用基于注意力的编码器的系统，用全局注意力处理整段音频是不现实的。"
      },
      {
       "id": "s-2-4-1-4",
       "original": "Local self attention, which only attends to the fixed length of left and right context, is thus widely used.",
       "zh": "因此，只关注固定长度左右上下文的局部自注意力（local self attention）被广泛使用。"
      },
      {
       "id": "s-2-4-1-5",
       "original": "For example, in BEST-RQ pre-training, only 128 left and 128 right context frames are used for local self attention.",
       "zh": "例如，在 BEST-RQ 预训练中，局部自注意力只使用左侧 128 帧和右侧 128 帧上下文。"
      },
      {
       "id": "s-2-4-1-6",
       "original": "However, stacking many local self attention layers creates a significant receptive field mismatch between training and inference.",
       "zh": "然而，堆叠多层局部自注意力会造成训练与推理之间显著的感受野失配。"
      },
      {
       "id": "s-2-4-1-7",
       "original": "The left figure in Fig. 4 illustrates this issue with a network consisting of 4 local self attention layers, each using only 1 left and 1 right context frames.",
       "zh": "Fig. 4 左图用一个由 4 层局部自注意力组成的网络说明了这一问题，其中每层只使用左侧 1 帧和右侧 1 帧上下文。"
      },
      {
       "id": "s-2-4-1-8",
       "original": "Since the context is leaked in every layer, the receptive field width grows linearly with respect to the number of layers; for a big encoder like that of the Conformer-2B, this means that the receptive field width for the encoder output is longer than 327 seconds.",
       "zh": "由于上下文在每一层都会「泄漏」，感受野宽度随层数线性增长；对于像 Conformer-2B 这样的大编码器，这意味着编码器输出的感受野宽度超过 327 秒。"
      },
      {
       "id": "s-2-4-1-9",
       "original": "During training, the model is trained with at most 30 seconds speech segments, while at inference time, when minutes or hours long audio is fed to the model, the encoder needs to process over 300 seconds of audio to produce one encoder output—a pattern it has never trained on.",
       "zh": "训练时，模型在最长 30 秒的语音片段上训练；而推理时，当分钟级或小时级的音频被送入模型，编码器需要处理超过 300 秒的音频才能产生一个编码器输出——这是它从未训练过的模式。"
      },
      {
       "id": "s-2-4-1-10",
       "original": "Our empirical observations demonstrate that, under this train-test mismatch, these models with deep architectures and high capacity suffer from high deletion errors.",
       "zh": "我们的实验观察表明，在这种训练-测试失配下，这些具有深层结构和高容量的模型会出现大量删除（deletion）错误。"
      },
      {
       "id": "s-2-4-1-11",
       "original": "We henceforth refer to this problem as the “long-form (performance) degradation\" problem.",
       "zh": "我们此后把这一问题称为「长音频（性能）退化」问题。"
      }
     ]
    },
    {
     "id": "p-2-4-2",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-2-4-2-1",
       "original": "Chunk-wise Self-Attention Local Self-Attention Receptive field for y3 Receptive field for y4 Receptive field for y0,..y3 Receptive field for y4,..y8",
       "zh": "（Figure 4 内嵌文字）分块自注意力 / 局部自注意力；y3 的感受野；y4 的感受野；y0,..y3 的感受野；y4,..y8 的感受野。"
      }
     ]
    },
    {
     "id": "fig-2-4-1",
     "type": "figure_caption",
     "page": 7,
     "original": "Figure 4: Comparing receptive fields of two networks with 4 layers of local self attention and chunkwise attention.",
     "zh": "图 4：两个网络的感受野对比：一个含 4 层局部自注意力，另一个含 4 层分块注意力。"
    },
    {
     "id": "p-2-4-3",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-2-4-3-1",
       "original": "To solve this problem, we propose a simple modification to the attention mechanism; the attention is restricted to audio chunks.",
       "zh": "为解决该问题，我们提出对注意力机制的一个简单修改：把注意力限制在音频块（chunk）之内。"
      },
      {
       "id": "s-2-4-3-2",
       "original": "This is illustrated on the right side of Fig. 4, in which 8 frames are divided into 2 chunks, and the attention is performed within each chunk.",
       "zh": "Fig. 4 右侧展示了这一做法：8 帧被划分为 2 个块，注意力在每个块内部执行。"
      },
      {
       "id": "s-2-4-3-3",
       "original": "In this case, there is no context leaking in the attention layer, and thus the receptive field width is independent of the number of layers.",
       "zh": "在这种情况下，注意力层中不存在上下文泄漏，因此感受野宽度与层数无关。"
      },
      {
       "id": "s-2-4-3-4",
       "original": "In our experiments an 8-second chunk resulted in the best recognition quality vs. computational cost trade-off.",
       "zh": "在我们的实验中，8 秒的块长在识别质量与计算开销之间取得了最佳折中。"
      }
     ]
    },
    {
     "id": "p-2-4-4",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-2-4-4-1",
       "original": "It is worthwhile to note there are a few other works in the literature which also modify the attention pattern to deal with the long-form audio in ASR, e.g., [61–66].",
       "zh": "值得指出的是，文献中还有一些工作也通过修改注意力模式来处理 ASR 中的长音频，例如 [61–66]。"
      },
      {
       "id": "s-2-4-4-2",
       "original": "Though conceptually similar to block processing (e.g. [65,66]), chunk-wise attention is more flexible.",
       "zh": "尽管与块处理（block processing，如 [65,66]）概念上相似，分块注意力更灵活。"
      },
      {
       "id": "s-2-4-4-3",
       "original": "Block processing is performed at the input feature level, which limits the encoder layers to the context frame at the current chunk.",
       "zh": "块处理在输入特征层面执行，这会把编码器各层限制在当前块的上下文帧上。"
      },
      {
       "id": "s-2-4-4-4",
       "original": "On the other hand, chunk-wise attention allows other layers in the encoder (e.g., convolution layers) to process contextual frames beyond the current chunk.",
       "zh": "相比之下，分块注意力允许编码器中的其他层（如卷积层）处理超出当前块的上下文帧。"
      },
      {
       "id": "s-2-4-4-5",
       "original": "Compared with Whisper [1], which segments the audio into 30 second chunks and uses a heuristic process to carry the decoder states over, we only chunk the attention state, and allow the decoder to access the entire encoder output.",
       "zh": "与 Whisper [1] 相比——Whisper 把音频切成 30 秒的块，并用一个启发式过程传递解码器状态——我们只对注意力状态分块，并允许解码器访问整个编码器输出。"
      },
      {
       "id": "s-2-4-4-6",
       "original": "We also use either a CTC or RNN-T decoder to decode on long-form audio, neither of which have been observed to hallucinate compared to attention-based sequence-to-sequence decoders.",
       "zh": "我们还使用 CTC 或 RNN-T 解码器解码长音频，而这两类解码器未像基于注意力的序列到序列解码器那样被观察到会产生幻觉（hallucination）。"
      },
      {
       "id": "s-2-4-4-7",
       "original": "We observe our systems are robust on long-form ASR tasks with a simpler decoding process on long-form speech signals.",
       "zh": "我们观察到，配合一套更简单的长音频解码流程，我们的系统在长音频 ASR 任务上表现鲁棒。"
      }
     ]
    },
    {
     "id": "p-2-4-5",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-2-4-5-1",
       "original": "…",
       "zh": "……"
      }
     ]
    },
    {
     "id": "p-2-4-6",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-2-4-6-1",
       "original": "On Speech input On paired input On text input",
       "zh": "（Figure 5 内嵌文字）语音输入时 / 配对输入时 / 文本输入时。"
      }
     ]
    },
    {
     "id": "fig-2-4-2",
     "type": "figure_caption",
     "page": 8,
     "original": "Figure 5: Overview of MOST text injection. The left-most panel depicts MOST training on unlabeled speech input; the center panel depicts training on paired speech and text input; the right-most panel depicts training on unlabeled text data.",
     "zh": "图 5：MOST 文本注入总览。最左面板描绘 MOST 在无标注语音输入上的训练；中间面板描绘在配对语音-文本输入上的训练；最右面板描绘在无标注文本数据上的训练。"
    }
   ]
  },
  {
   "id": "sec-2-5",
   "num": "2.5",
   "level": 2,
   "page": 8,
   "title": {
    "original": "Multi-Objective Supervised Pre-training: BEST-RQ + text-injection",
    "zh": "多目标监督预训练：BEST-RQ + 文本注入"
   },
   "blocks": [
    {
     "id": "p-2-5-1",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-2-5-1-1",
       "original": "In addition to pre-training with unlabeled speech, we add an additional stage of Multi-Objective Supervised pre-Training (MOST) as shown in Fig. 5, where we train the model jointly on unlabeled speech, unlabeled text and paired speech and text data.",
       "zh": "除了用无标注语音做预训练之外，我们还额外加入一个多目标监督预训练（Multi-Objective Supervised pre-Training，MOST）阶段，如 Fig. 5 所示——在这一阶段，模型联合在无标注语音、无标注文本以及配对语音-文本数据上训练。"
      },
      {
       "id": "s-2-5-1-2",
       "original": "The training loss for this procedure is based on the text-injection loss including duration modeling and consistency regularization as in [13], to which we add a weighted BEST-RQ loss for the encoder of the model.",
       "zh": "这一过程的训练损失基于文本注入损失（包括 [13] 中的时长建模与一致性正则化），再为模型编码器加上一个加权的 BEST-RQ 损失。"
      },
      {
       "id": "s-2-5-1-3",
       "original": "MOST yields two benefits: (i) Training with paired speech and text data with alignment losses results in learning speech representations that are better aligned with text, improving quality on tasks like ASR and AST that require mapping the acoustics of the speech signal to text.",
       "zh": "MOST 带来两点收益：(i) 在配对语音-文本数据上用对齐损失训练，能学到与文本对齐得更好的语音表征，从而在 ASR、AST 这类需要把语音信号映射为文本的任务上提升质量。"
      },
      {
       "id": "s-2-5-1-4",
       "original": "(ii) Training simultaneously on unlabeled text in a model that learns speech and text representations jointly improves the robustness of learned representations, especially on low resource languages and domains, also generalizing to new languages with no paired data seen during training [67].",
       "zh": "(ii) 在一个联合学习语音与文本表征的模型中同时在无标注文本上训练，能提升所学表征的鲁棒性——尤其是在低资源语言与领域上——并泛化到训练中完全没有见过配对数据的新语言 [67]。"
      }
     ]
    },
    {
     "id": "p-2-5-2",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-2-5-2-1",
       "original": "The key architectural components for constructing the text-injection loss as utilized in our approach include: (i) A speech-only encoder that utilizes a convolutional sub-sampling feature encoder and a single conformer layer.",
       "zh": "在我们的方法中，构建文本注入损失的关键架构组件包括：(i) 一个纯语音编码器，由一个卷积子采样特征编码器和单个 Conformer 层组成。"
      },
      {
       "id": "s-2-5-2-2",
       "original": "For continued pre-training the feature encoder is initialized from the BEST- RQ pre-trained checkpoint while the conformer layer is initialized randomly.",
       "zh": "进行继续预训练时，特征编码器从 BEST-RQ 预训练检查点初始化，而该 Conformer 层随机初始化。"
      },
      {
       "id": "s-2-5-2-3",
       "original": "(ii) A text-only encoder that consists of an embedding layer, an upsampler, and a conformer layer block.",
       "zh": "(ii) 一个纯文本编码器，由一个嵌入层、一个上采样器和一个 Conformer 层块组成。"
      },
      {
       "id": "s-2-5-2-4",
       "original": "The upsampler used in this work is a learned duration based upsampling model [13], though a fixed or random repetition upsampler can also be used for text-injection [47,53].",
       "zh": "本工作使用的上采样器是一个学习得到的、基于时长的上采样模型 [13]，不过固定或随机重复的上采样器也可用于文本注入 [47,53]。"
      },
      {
       "id": "s-2-5-2-5",
       "original": "All components are initialized randomly.",
       "zh": "这些组件全部随机初始化。"
      },
      {
       "id": "s-2-5-2-6",
       "original": "(iii) A shared conformer encoder initialized from the pre-trained BEST-RQ speech encoder.",
       "zh": "(iii) 一个共享 Conformer 编码器，从预训练好的 BEST-RQ 语音编码器初始化。"
      },
      {
       "id": "s-2-5-2-7",
       "original": "(iv) The BEST-RQ speech softmax layers initialized from the BEST-RQ checkpoint.",
       "zh": "(iv) BEST-RQ 语音 softmax 层，从 BEST-RQ 检查点初始化。"
      },
      {
       "id": "s-2-5-2-8",
       "original": "(v) The decoder unit which is initialized randomly.",
       "zh": "(v) 解码器单元，随机初始化。"
      }
     ]
    },
    {
     "id": "p-2-5-3",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-2-5-3-1",
       "original": "The main idea of text-injection (e.g. [13,53,54]) is to produce joint, co-aligned embeddings of speech and text as sequences in the same embedding space.",
       "zh": "文本注入（如 [13,53,54]）的核心思想是：把语音与文本作为同一嵌入空间中的序列，产出联合且共对齐（co-aligned）的嵌入。"
      },
      {
       "id": "s-2-5-3-2",
       "original": "Given this embedding space, text data with no associated audio can contribute to improving the speech task.",
       "zh": "有了这样的嵌入空间，没有配对应音频的文本数据也能为改进语音任务做出贡献。"
      },
      {
       "id": "s-2-5-3-3",
       "original": "The speech and text encoders presented above are intended to produce these embeddings, which need to be matched in the embedding space and are also required to be co-aligned in the time dimension.",
       "zh": "上面介绍的语音编码器与文本编码器正是为了产出这类嵌入：它们需要在嵌入空间中相互匹配，同时还要求在时间维度上共对齐。"
      },
      {
       "id": "s-2-5-3-4",
       "original": "The embeddings enable the text data to contribute to preparing the model for downstream tasks.",
       "zh": "这类嵌入使文本数据也能参与为下游任务准备模型。"
      }
     ]
    },
    {
     "id": "p-2-5-4",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-2-5-4-1",
       "original": "To achieve these objectives, the architecture as presented above is trained using three types of data, each contributing to different types of losses:",
       "zh": "为实现这些目标，上文介绍的架构用三类数据训练，每类数据贡献不同类型的损失："
      }
     ]
    },
    {
     "id": "p-2-5-5",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-2-5-5-1",
       "original": "1.",
       "zh": "1."
      },
      {
       "id": "s-2-5-5-2",
       "original": "The unlabeled speech passes through the shared encoder and the BEST-RQ softmax layers to contribute to the BEST-RQ loss.",
       "zh": "无标注语音经过共享编码器与 BEST-RQ softmax 层，为 BEST-RQ 损失做贡献。"
      }
     ]
    },
    {
     "id": "p-2-5-6",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-2-5-6-1",
       "original": "2.",
       "zh": "2."
      },
      {
       "id": "s-2-5-6-2",
       "original": "The paired speech-text data serves multiple functions.",
       "zh": "配对语音-文本数据承担多重功能。"
      }
     ]
    },
    {
     "id": "p-2-5-7",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-2-5-7-1",
       "original": "• The labeled speech flows through the speech encoder, the shared encoder and the decoder unit and contributes to the standard ASR loss computed against the paired text.",
       "zh": "• 有标注语音流经语音编码器、共享编码器和解码器单元，为相对配对文本计算的标准 ASR 损失做贡献。"
      }
     ]
    },
    {
     "id": "p-2-5-8",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-2-5-8-1",
       "original": "Here, the speech-text alignments of the paired data are extracted from the decoder unit and used to train the duration upsampler within the text encoder. • The text of the paired data also passes through the text encoder.",
       "zh": "此处，配对数据的语音-文本对齐从解码器单元中抽取出来，用于训练文本编码器内的时长上采样器。• 配对数据中的文本也同时经过文本编码器。"
      },
      {
       "id": "s-2-5-8-2",
       "original": "The encoded text sequence is used to compute a consistency loss against the encoded speech sequence.",
       "zh": "编码后的文本序列用于与编码后的语音序列计算一致性损失。"
      }
     ]
    },
    {
     "id": "p-2-5-9",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-2-5-9-1",
       "original": "This loss is used to train solely the text encoder—the speech encoder weights are frozen for this particular forward-propagation.",
       "zh": "这个损失只用于训练文本编码器——在这次前向传播中，语音编码器的权重被冻结。"
      }
     ]
    },
    {
     "id": "p-2-5-10",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-2-5-10-1",
       "original": "3.",
       "zh": "3."
      },
      {
       "id": "s-2-5-10-2",
       "original": "The unlabeled text data contributes to a reconstruction loss.",
       "zh": "无标注文本数据为一个重建损失做贡献。"
      },
      {
       "id": "s-2-5-10-3",
       "original": "This loss is constructed by passing the text through the text encoder, then masking chunks of the feature sequence produced.",
       "zh": "该损失这样构造：文本经文本编码器处理后，把产出的特征序列中的一些块掩码掉。"
      },
      {
       "id": "s-2-5-10-4",
       "original": "These masked text features live in the same embedding space as masked speech features, and thus can be passed through the shared encoder and the decoder unit to compute the ASR loss against the original text.",
       "zh": "这些被掩码的文本特征与被掩码的语音特征处于同一嵌入空间，因此可以送入共享编码器与解码器单元，相对原文本计算 ASR 损失。"
      },
      {
       "id": "s-2-5-10-5",
       "original": "This is the reconstruction loss used to train the model.",
       "zh": "这就是用于训练模型的重建损失。"
      }
     ]
    },
    {
     "id": "p-2-5-11",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-2-5-11-1",
       "original": "For training stability, MOST proceeds in two stages—we first train solely on paired data to learn stable decoder alignments for 20k steps.",
       "zh": "为保证训练稳定，MOST 分两个阶段进行——我们先只在配对数据上训练 20k 步，学到稳定的解码器对齐。"
      },
      {
       "id": "s-2-5-11-2",
       "original": "We then train the duration upsampler and activate the losses for unlabeled text.",
       "zh": "然后训练时长上采样器，并激活针对无标注文本的损失。"
      },
      {
       "id": "s-2-5-11-3",
       "original": "We refer the reader to [13] for further details.",
       "zh": "更多细节请读者参阅 [13]。"
      }
     ]
    },
    {
     "id": "p-2-5-12",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-2-5-12-1",
       "original": "When fine-tuning for ASR, we initialize the feature encoder of the ASR model with the speech feature encoder, initialize the conformer block with the shared conformer encoder, and add a randomly initialized task-specific transducer.",
       "zh": "为 ASR 微调时，我们用语音特征编码器初始化 ASR 模型的特征编码器，用共享 Conformer 编码器初始化 Conformer 块，并加一个随机初始化的任务特定 Transducer。"
      }
     ]
    },
    {
     "id": "p-2-5-13",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-2-5-13-1",
       "original": "In the MOST set-up, the speech and text representations live in a shared representation space, thereby allowing us to utilize text machine translation (MT) data during the fine-tuning stage of AST tasks.",
       "zh": "在 MOST 设定下，语音与文本表征处于共享表征空间中，因此允许我们在 AST 任务的微调阶段利用文本机器翻译（MT）数据。"
      },
      {
       "id": "s-2-5-13-2",
       "original": "We follow the same approach described in [13,20] and report the AST results with joint fine-tuning for models prepared with MOST.",
       "zh": "我们沿用 [13,20] 中描述的方法，报告了 MOST 准备的模型在联合微调下的 AST 结果。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-2-6",
   "num": "2.6",
   "level": 2,
   "page": 9,
   "title": {
    "original": "Residual Adaptation with a Frozen Encoder",
    "zh": "冻结编码器下的残差适配"
   },
   "blocks": [
    {
     "id": "p-2-6-1",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-2-6-1-1",
       "original": "Ideally, the fine-tuning process of the model should be scalable with the number of downstream tasks while in reality, fine-tuning the pre-trained USM individually for various domains and tasks becomes prohibitively expensive.",
       "zh": "理想情况下，模型的微调过程应当能随下游任务数量扩展；但现实中，为各种领域与任务分别微调预训练 USM 的代价会高到不可承受。"
      },
      {
       "id": "s-2-6-1-2",
       "original": "In order to mitigate this issue, we explore a lightweight alternative [19] to training the full network where residual adapters with a small number of parameters are added for each individual language while the pre-trained USM is entirely frozen during fine-tuning.",
       "zh": "为缓解这一问题，我们探索了一种替代全量网络训练的轻量方案 [19]：为每种语言分别添加参数量很小的残差适配器（residual adapter），微调期间预训练的 USM 完全冻结。"
      },
      {
       "id": "s-2-6-1-3",
       "original": "We experiment with adding two parallel adapters to each Conformer block, whose parameter count amounts to 2% of the original pre-trained USM, and fine-tune the adapters on downstream language tasks.",
       "zh": "我们在每个 Conformer 块中实验性地加入两个并行适配器，其参数量约为原预训练 USM 的 2%，并在下游语言任务上微调这些适配器。"
      },
      {
       "id": "s-2-6-1-4",
       "original": "When serving the model, the adapter is dynamically loaded according to the language of the input batch [68,69].",
       "zh": "部署模型时，根据输入批次的语言动态加载对应的适配器 [68,69]。"
      },
      {
       "id": "s-2-6-1-5",
       "original": "This enables one to conduct inference on 100+ languages while keeping the total number of parameters manageable by re-using the same parameters and computation process for the majority of the time.",
       "zh": "这使得对 100+ 种语言进行推理成为可能，同时总参数量保持可控——因为在绝大多数时间复用的是同一套参数与计算过程。"
      },
      {
       "id": "s-2-6-1-6",
       "original": "We also find that training the adapter versus fine-tuning the entire model can reduce over-fitting especially when the training data is limited.",
       "zh": "我们还发现，与微调整个模型相比，训练适配器能减少过拟合，在训练数据有限时尤其如此。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-2-7",
   "num": "2.7",
   "level": 2,
   "page": 9,
   "title": {
    "original": "Training Details",
    "zh": "训练细节"
   },
   "blocks": [
    {
     "id": "p-2-7-1",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-2-7-1-1",
       "original": "Data Processing: The audio is uniformly sampled to 16 kHz quality—any audio with a different native sampling rate is either up-sampled or down-sampled.",
       "zh": "数据处理：音频统一重采样至 16 kHz——任何原生采样率不同的音频都会被上采样或下采样。"
      },
      {
       "id": "s-2-7-1-2",
       "original": "The audio is then featurized into 128- dimensional log-mel filterbank coefficients.",
       "zh": "随后音频被特征化为 128 维 log-Mel 滤波器组系数。"
      },
      {
       "id": "s-2-7-1-3",
       "original": "Graphemes are used to tokenize the text for FLEURS in-domain fine-tuning, while word-piece models (WPMs) [70] are used for tokenization for all other tasks.",
       "zh": "FLEURS 域内微调使用字位（grapheme）对文本分词，其余所有任务使用词片模型（word-piece model，WPM）[70] 分词。"
      }
     ]
    },
    {
     "id": "p-2-7-2",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-2-7-2-1",
       "original": "BEST-RQ: We follow default masking and quantization parameters of BEST-RQ as in [10].",
       "zh": "BEST-RQ：我们沿用 [10] 中 BEST-RQ 的默认掩码与量化参数。"
      },
      {
       "id": "s-2-7-2-2",
       "original": "We use a 16 codebook multi-softmax loss to stabilize training and improve performance as described in 5.1.",
       "zh": "如 5.1 节所述，我们使用 16 码本的多 softmax 损失来稳定训练并改善性能。"
      },
      {
       "id": "s-2-7-2-3",
       "original": "We do not use EMA for pre-training.",
       "zh": "预训练中不使用 EMA（指数滑动平均）。"
      }
     ]
    },
    {
     "id": "p-2-7-3",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-2-7-3-1",
       "original": "MOST: We follow the text encoder and decoder architecture described in [13] but use 4k sentencepiece models (SPMs).",
       "zh": "MOST：我们沿用 [13] 中描述的文本编码器与解码器架构，但使用 4k 的 SentencePiece 模型（SPM）。"
      },
      {
       "id": "s-2-7-3-2",
       "original": "We use a single 1536-dimensional Conformer layer as the speech encoder and Conformer-2B encoder as the shared encoder.",
       "zh": "我们用单个 1536 维 Conformer 层作为语音编码器，用 Conformer-2B 编码器作为共享编码器。"
      },
      {
       "id": "s-2-7-3-3",
       "original": "We mix un-transcribed speech, unspoken text, and transcribed speech in each batch with fixed batch sizes of, respectively, 4096, 8192, and 1024.",
       "zh": "我们在每个批次中混合未转写语音、未语音化文本（unspoken text）与已转写语音，固定批大小分别为 4096、8192 和 1024。"
      },
      {
       "id": "s-2-7-3-4",
       "original": "The model is initialized with the BEST-RQ pre-trained encoder.",
       "zh": "模型以 BEST-RQ 预训练编码器初始化。"
      },
      {
       "id": "s-2-7-3-5",
       "original": "MOST employs a curriculum learning schedule where training initially is conducted with un-transcribed speech and paired speech-text data, and unspoken text is utilized only after 20k steps.",
       "zh": "MOST 采用课程学习（curriculum learning）安排：训练初期只用未转写语音与配对语音-文本数据，未语音化文本在 20k 步之后才启用。"
      },
      {
       "id": "s-2-7-3-6",
       "original": "The joint training employing all three types of data lasts for another 100K steps.",
       "zh": "使用全部三类数据的联合训练再持续 100K 步。"
      }
     ]
    },
    {
     "id": "p-2-7-4",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-2-7-4-1",
       "original": "Supervised Training: We use two separate optimizers for the encoder parameters and the decoder parameters of the network [71].",
       "zh": "监督训练：我们为网络的编码器参数与解码器参数使用两个独立的优化器 [71]。"
      },
      {
       "id": "s-2-7-4-2",
       "original": "For USM-CTC and USM-LAS, we train the model for 100k steps with 2048 batch size.",
       "zh": "对于 USM-CTC 和 USM-LAS，我们以 2048 的批大小训练 100k 步。"
      },
      {
       "id": "s-2-7-4-3",
       "original": "For in-domain experiments, the checkpoint is selected based on development set performance.",
       "zh": "域内实验的检查点根据开发集性能选取。"
      }
     ]
    },
    {
     "id": "p-2-7-5",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-2-7-5-1",
       "original": "Training Large Models: We use the GShard [72] framework with the GSPMD backend [73] to train our large models on TPUs.",
       "zh": "训练大模型：我们使用 GShard [72] 框架与 GSPMD 后端 [73] 在 TPU 上训练我们的大模型。"
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
    "original": "Datasets",
    "zh": "数据集"
   },
   "blocks": []
  },
  {
   "id": "sec-3-1",
   "num": "3.1",
   "level": 2,
   "page": 10,
   "title": {
    "original": "Audio Data",
    "zh": "音频数据"
   },
   "blocks": [
    {
     "id": "fig-3-1-1",
     "type": "figure_caption",
     "page": 10,
     "original": "Figure 6: The video category and length distribution of YT-513-U.",
     "zh": "图 6：YT-513-U 的视频类别与时长分布。"
    },
    {
     "id": "p-3-1-1",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-3-1-1-1",
       "original": "The following audio datasets are used in this report to train our models:",
       "zh": "本报告使用以下音频数据集来训练我们的模型："
      }
     ]
    },
    {
     "id": "p-3-1-2",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-3-1-2-1",
       "original": "• YouTube SUPervised Plus (YT-SUP+):",
       "zh": "• YouTube SUPervised Plus（YT-SUP+）："
      }
     ]
    },
    {
     "id": "p-3-1-3",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-3-1-3-1",
       "original": "– YT-SUP: 90k hours of segmented, labeled audio across 75 languages. – YT-Pseudo-Labeled: 100k hours of segmented, pseudo-labeled en-US audio from YT- NTL-U.",
       "zh": "– YT-SUP：90k 小时、覆盖 75 种语言的切分好的有标注音频。– YT-Pseudo-Labeled：100k 小时来自 YT-NTL-U 的切分好的 en-US 伪标注音频。"
      },
      {
       "id": "s-3-1-3-2",
       "original": "The pseudo-labels are generated by a 600M CTC model trained on YT-SUP en-US data.",
       "zh": "伪标注由一个在 YT-SUP en-US 数据上训练的 600M CTC 模型生成。"
      }
     ]
    },
    {
     "id": "p-3-1-4",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-3-1-4-1",
       "original": "• YouTube Next Thousand Languages Unsupervised (YT-NTL-U): 12.1M hours of segmented, unlabeled audio, including:",
       "zh": "• YouTube Next Thousand Languages Unsupervised（YT-NTL-U）：12.1M 小时切分好的无标注音频，包括："
      }
     ]
    },
    {
     "id": "p-3-1-5",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-3-1-5-1",
       "original": "– YT-55-U: 12M hours of segmented, unlabeled audio on 55 rich resource languages identified by YouTube production language id models. – YT-513-U: 100k hours of segmented, unlabeled audio across 513 tail languages not covered by YouTube production language id models.",
       "zh": "– YT-55-U：12M 小时切分好的无标注音频，覆盖 YouTube 生产环境语言识别模型所识别的 55 种富资源语言。– YT-513-U：100k 小时切分好的无标注音频，覆盖 513 种 YouTube 生产环境语言识别模型未覆盖的长尾语言。"
      },
      {
       "id": "s-3-1-5-2",
       "original": "These languages are identified by vendors.",
       "zh": "这些语言是由供应商（vendor）识别确认的。"
      }
     ]
    },
    {
     "id": "p-3-1-6",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-3-1-6-1",
       "original": "Let us expand upon how each dataset has been constructed.",
       "zh": "下面展开说明各数据集是如何构建的。"
      }
     ]
    },
    {
     "id": "p-3-1-7",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-3-1-7-1",
       "original": "YT-SUP+: YT-SUP is a dataset with audio from videos that have user-uploaded transcripts from 75 languages.",
       "zh": "YT-SUP+：YT-SUP 是一个音频来自 75 种语言带用户上传字幕（transcript）视频的数据集。"
      },
      {
       "id": "s-3-1-7-2",
       "original": "We group consecutive segments into a longer unit similar to [57].",
       "zh": "我们仿照 [57]，把连续片段合并成更长的单元。"
      },
      {
       "id": "s-3-1-7-3",
       "original": "The maximal sequence length for training is 30 seconds.",
       "zh": "训练的最大序列长度为 30 秒。"
      },
      {
       "id": "s-3-1-7-4",
       "original": "The total amount of training data is 90k hours, ranging from English (en-US) (3.5k hours) to Amharic (Am-Et) (150 hours).",
       "zh": "训练数据总量为 90k 小时，从英语（en-US）的 3.5k 小时到阿姆哈拉语（Am-Et）的 150 小时不等。"
      },
      {
       "id": "s-3-1-7-5",
       "original": "We also introduce an additional 100k hours of en-US audio from YT-NTL-U to YT-SUP.",
       "zh": "我们还从 YT-NTL-U 向 YT-SUP 额外引入 100k 小时 en-US 音频。"
      },
      {
       "id": "s-3-1-7-6",
       "original": "We choose to generate pseudo-labels on this dataset using a 600M-parameter CTC YT teacher model trained on YT-SUP.",
       "zh": "我们选择用一个在 YT-SUP 上训练的 600M 参数 CTC 版 YT 教师模型，为该数据集生成伪标注。"
      },
      {
       "id": "s-3-1-7-7",
       "original": "Each audio is randomly segmented between 5 to 15 seconds.",
       "zh": "每段音频被随机切分成 5 到 15 秒的片段。"
      }
     ]
    },
    {
     "id": "p-3-1-8",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-3-1-8-1",
       "original": "YT-55-U: YT-55-U is built by first randomly collecting 3 million hours of audio from \"speech-heavy\" YouTube videos, filtered by language.",
       "zh": "YT-55-U：YT-55-U 的构建方式是：先从「语音密集型」的 YouTube 视频中随机收集 3 million（300 万）小时音频，按语言过滤。"
      },
      {
       "id": "s-3-1-8-2",
       "original": "The 3 million hours of audio is then further segmented by the YT teacher model.",
       "zh": "这 3 million（300 万）小时音频随后由 YT 教师模型进一步切分。"
      },
      {
       "id": "s-3-1-8-3",
       "original": "Instead of using a teacher model as in [3], the non-speech segments identified by a Voice Activity Detection (VAD) model are removed to yield approximately 1 million hours of unlabeled audio data.",
       "zh": "与 [3] 中直接使用教师模型切分不同，我们先由语音活动检测（VAD）模型移除识别出的非语音片段，得到约 1 million（100 万）小时无标注音频数据。"
      },
      {
       "id": "s-3-1-8-4",
       "original": "Later, we use a YouTube production language identification model to select 55 languages from that audio.",
       "zh": "之后，我们用 YouTube 生产环境的语言识别模型从这批音频中选出 55 种语言。"
      }
     ]
    },
    {
     "id": "p-3-1-9",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-3-1-9-1",
       "original": "YT-513-U: We create an additional dataset called YT-513-U to ensure coverage of lower resource languages in our pre-training dataset.",
       "zh": "YT-513-U：我们额外创建了 YT-513-U 数据集，以确保预训练数据集对低资源语言的覆盖。"
      },
      {
       "id": "s-3-1-9-2",
       "original": "We reached out to vendors and native speakers to identify YT videos containing speech in specific long tail languages, collecting a dataset of unlabeled speech in 513 languages.",
       "zh": "我们联系供应商与母语者，请他们识别含有特定长尾语言语音的 YouTube 视频，收集得到一个覆盖 513 种语言的无标注语音数据集。"
      },
      {
       "id": "s-3-1-9-3",
       "original": "Vendors were tasked with ensuring a variety of domains, voices, and content in the videos that are collected in each language.",
       "zh": "供应商的任务是确保每种语言收集到的视频在领域、说话人与内容上都有多样性。"
      },
      {
       "id": "s-3-1-9-4",
       "original": "These videos are segmented into speech segments using a VAD model, resulting in a total of 102k hours of speech.",
       "zh": "这些视频用 VAD 模型切分成语音片段，共得到 102k 小时语音。"
      },
      {
       "id": "s-3-1-9-5",
       "original": "Our final YT-513-U dataset contains 88 languages with over 500 hours of speech each, 237 languages with between 100-500 hours, and 188 languages with less than 100 hours of data.",
       "zh": "最终的 YT-513-U 数据集中：88 种语言各拥有超过 500 小时语音；237 种语言各自在 100-500 小时之间；188 种语言各自不足 100 小时。"
      },
      {
       "id": "s-3-1-9-6",
       "original": "The languages chosen for this collection are wide-ranging, with a majority of our data corresponding to languages from South Asia, Southeast Asia, West Africa, and East Africa.",
       "zh": "本次收集所选的语言分布广泛，大部分数据来自南亚、东南亚、西非和东非的语言。"
      },
      {
       "id": "s-3-1-9-7",
       "original": "The distribution of video categories and lengths in our dataset are depicted in Figure 6.",
       "zh": "数据集中视频类别与时长的分布见 Figure 6。"
      }
     ]
    },
    {
     "id": "p-3-1-10",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-3-1-10-1",
       "original": "In addition to YouTube data, we also include public data for MOST training:",
       "zh": "除 YouTube 数据外，我们还纳入公开数据用于 MOST 训练："
      }
     ]
    },
    {
     "id": "p-3-1-11",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-3-1-11-1",
       "original": "• Public Unsupervised (Pub-U): Following [20], we use approximately 429k hours of unlabeled speech data in 51 languages.",
       "zh": "• 公开无监督数据（Pub-U）：沿用 [20]，我们使用约 429k 小时、覆盖 51 种语言的无标注语音数据。"
      },
      {
       "id": "s-3-1-11-2",
       "original": "It includes: 372k hours of speech data spanning 23 languages from VoxPopuli [74], read speech data in 25 languages drawn from the v6.1 release of Common Voice [75], 50k hours of read books data in eight European languages from Multilingual LibriSpeech [76] and 1k hours of telephonic conversation data spanning 17 African and Asian languages from BABEL [77]. • Public Supervised (Pub-S): Similar to [20], our public supervised set includes approximately 1.3k hours of speech and transcript data spanning 14 languages from VoxPopuli, 10 hour training splits for each of the 8 MLS languages, and 1k hours of data spanning 17 languages from the Babel ASR task.",
       "zh": "它包括：来自 VoxPopuli [74] 的 372k 小时、覆盖 23 种语言的语音数据；取自 Common Voice v6.1 版 [75] 的 25 种语言朗读语音；来自 Multilingual LibriSpeech [76] 的 50k 小时、8 种欧洲语言的朗读有声书数据；以及来自 BABEL [77] 的 1k 小时、覆盖 17 种非洲与亚洲语言的电话对话数据。• 公开监督数据（Pub-S）：与 [20] 类似，我们的公开监督集包括：来自 VoxPopuli 的约 1.3k 小时、覆盖 14 种语言的语音-转写数据；8 种 MLS 语言各 10 小时的训练切分；以及来自 Babel ASR 任务的 1k 小时、覆盖 17 种语言的数据。"
      }
     ]
    },
    {
     "id": "p-3-1-12",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-3-1-12-1",
       "original": "Note that the public data is only used for in-domain pre-training and is excluded for training the generic USM-LAS/CTC models.",
       "zh": "注意，公开数据仅用于域内预训练，训练通用的 USM-LAS/CTC 模型时被排除在外。"
      },
      {
       "id": "s-3-1-12-2",
       "original": "This allows us to treat the public task performance as out-of-domain benchmarks for the USM-LAS/CTC models.",
       "zh": "这样我们就可以把公开任务上的性能当作 USM-LAS/CTC 模型的域外基准。"
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
    "original": "Text Data",
    "zh": "文本数据"
   },
   "blocks": [
    {
     "id": "p-3-2-1",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-3-2-1-1",
       "original": "Web-NTL: For pre-training with unlabeled text, we use a web-crawled corpus of monolingual text containing over 28B sentences [78].",
       "zh": "Web-NTL：用于无标注文本预训练的是一个网络爬取的单语文本语料库，包含超过 28B（280 亿）句 [78]。"
      },
      {
       "id": "s-3-2-1-2",
       "original": "The dataset spans 1140 languages, 205 of which have over 1M sentences and 199 of which have between 100k and 1M sentences.",
       "zh": "该数据集覆盖 1140 种语言，其中 205 种各拥有超过 1M（100 万）句，199 种各自在 100k 到 1M（100 万）句之间。"
      },
      {
       "id": "s-3-2-1-3",
       "original": "We up-sample lower resource languages using temperature-based sampling [79] with T = 3.0.",
       "zh": "我们采用基于温度的采样（temperature-based sampling）[79]，取 T = 3.0，对低资源语言进行上采样。"
      },
      {
       "id": "s-3-2-1-4",
       "original": "More details about the dataset and the mining approach have been described in Section 2 of [78].",
       "zh": "关于该数据集与挖掘方法的更多细节，见 [78] 第 2 节。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-3-3",
   "num": "3.3",
   "level": 2,
   "page": 11,
   "title": {
    "original": "Downstream Benchmarks",
    "zh": "下游基准"
   },
   "blocks": []
  },
  {
   "id": "sec-3-3-1",
   "num": "3.3.1",
   "level": 2,
   "page": 11,
   "title": {
    "original": "Speech Recognition (ASR)",
    "zh": "语音识别（ASR）"
   },
   "blocks": [
    {
     "id": "p-3-3-1-1",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-3-3-1-1-1",
       "original": "We present our results on two public tasks, SpeechStew [2] and FLEURS [16], and an internal benchmark on YouTube.",
       "zh": "我们在两个公开任务 SpeechStew [2] 和 FLEURS [16]，以及一个内部 YouTube 基准上报告结果。"
      }
     ]
    },
    {
     "id": "p-3-3-1-2",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-3-3-1-2-1",
       "original": "The SpeechStew [2] dataset is assembled by putting together seven public speech corpora—AMI [80], Common Voice [81], English Broadcast News3, LibriSpeech [82], Switchboard/Fisher4, TED-LIUM v3 [83,84] and Wall Street Journal5, which are all standard benchmarks [85–87] covering different domains in en-US.",
       "zh": "SpeechStew [2] 数据集由七个公开语音语料库拼装而成——AMI [80]、Common Voice [81]、English Broadcast News（脚注3）、LibriSpeech [82]、Switchboard/Fisher（脚注4）、TED-LIUM v3 [83,84] 和 Wall Street Journal（脚注5）——这些都是覆盖 en-US 不同领域的标准基准 [85–87]。"
      }
     ]
    },
    {
     "id": "p-3-3-1-3",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-3-3-1-3-1",
       "original": "The FLEURS [16] dataset is a publicly available, multi-way parallel dataset of 10 hours of read speech in 102 languages spanning 7 geo-groups.",
       "zh": "FLEURS [16] 数据集是一个公开的多向平行数据集，包含 102 种语言、每种 10 小时的朗读语音，横跨 7 个地理分组。"
      },
      {
       "id": "s-3-3-1-3-2",
       "original": "We restrict our use of the dataset to its ASR benchmark.",
       "zh": "我们只使用该数据集的 ASR 基准部分。"
      },
      {
       "id": "s-3-3-1-3-3",
       "original": "Among the 102 languages present in the FLEURS benchmark, we select 62 to serve as a sub-group to compare our generic ASR system with Whisper [1], as those languages are covered by the training sets of both models.",
       "zh": "在 FLEURS 基准的 102 种语言中，我们选出 62 种作为子集来与 Whisper [1] 比较我们的通用 ASR 系统——因为这些语言同时被两个模型的训练集覆盖。"
      },
      {
       "id": "s-3-3-1-3-4",
       "original": "We also report full results for in-domain fine-tuning and adaptation.",
       "zh": "我们还报告了域内微调与适配的完整结果。"
      },
      {
       "id": "s-3-3-1-3-5",
       "original": "Unlike [16], we report both WER and CER metrics, as CER is inappropriate as an indicator of 3Linguistic data consortium (LDC) datasets LDC97S44, LDC97T22, LDC98S71 and LDC98T28.",
       "zh": "与 [16] 不同，我们同时报告 WER 与 CER 指标，因为对某些语言 CER 不是合适的指标（脚注3：语言数据联盟（LDC）数据集 LDC97S44、LDC97T22、LDC98S71 和 LDC98T28）。"
      }
     ]
    },
    {
     "id": "p-3-3-1-4",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-3-3-1-4-1",
       "original": "4LDC datasets LDC2004T19, LDC2005T19, LDC2004S13, LDC2005S13 and LDC97S62. 5LDC datasets LDC93S6B and LDC94S13B.",
       "zh": "（脚注4：LDC 数据集 LDC2004T19、LDC2005T19、LDC2004S13、LDC2005S13 和 LDC97S62。脚注5：LDC 数据集 LDC93S6B 和 LDC94S13B。）"
      }
     ]
    },
    {
     "id": "tab-3-3-1-1",
     "type": "table_caption",
     "page": 12,
     "original": "Table 3: WERs (%) across multiple tasks for multiple settings compared against pre-existing baselines, with the exception of CoVoST 2, for which the BLEU score is presented. For the YouTube long-form set, we select the top-25 languages Whisper was trained on and exclude all languages for which Whisper produces > 40% WER to reduce the noise introduced by LAS hallucination in the Whisper model. For FLEURS, we report both the WER and the CER for our models. †Results omitted for the Whisper-shortform model on the YouTube long-form dataset as the model has a high deletion problem on this set. ‡The Whisper-shortform model uses segmented decoding to reduce its hallucination problem on CORAAL. §Our adapter setup adds about 2.3% of the total parameters while keeping the encoder frozen from pre-training.",
     "zh": "表 3：多种设定下多个任务上的 WER（%），与已有基线比较；CoVoST 2 除外，报告的是 BLEU 分数。对于 YouTube 长音频集，我们选取 Whisper 训练时覆盖的前 25 种语言，并排除所有 Whisper 产出 > 40% WER 的语言，以降低 Whisper 模型 LAS 幻觉带来的噪声。对于 FLEURS，我们同时报告模型的 WER 与 CER。†Whisper-shortform 模型在 YouTube 长音频数据集上的结果省略，因为该模型在此集合上存在严重删除问题。‡Whisper-shortform 模型使用分段解码，以减少其在 CORAAL 上的幻觉问题。§我们的适配器设置在保持编码器自预训练起冻结的前提下，增加约 2.3% 的总参数。"
    },
    {
     "id": "p-3-3-1-5",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-3-3-1-5-1",
       "original": "Task Multilingual Long-form ASR Multidomain en-US Multilingual ASR AST Dataset YouTube CORAAL SpeechStew FLEURS CoVoST 2 Langauges en-US 18 73 en-US en-US 62 102 21 Prior Work (single model) Whisper-longform 17.7 27.8 23.9 12.8 Whisper-shortform† 13.2‡ 11.5 36.6 29.1 Our Work (single model) USM-LAS 14.4 19.0 29.8 11.2 10.5 12.5 USM-CTC 13.7 18.7 26.7 12.1 10.8 15.5 Prior Work (in-domain fine-tuning) BigSSL [3] 14.8 7.5 Maestro [67] 7.2 25.2 Maestro-U [67] 26.0 (8.7) Our Work (in-domain fine-tuning) USM 13.2 7.4 13.5 19.2 (6.9) 28.7 USM-M 12.5 7.0 11.8 17.4 (6.5) 30.7 Our Work (frozen encoder) USM-M-adapter§ 7.5 12.4 17.6 (6.7) 29.6 performance for some languages.",
       "zh": "（Table 3 正文，数值与原文一致，抽取顺序已打散）任务：多语种长音频 ASR、多领域 en-US、多语种 ASR、AST；数据集：YouTube、CORAAL、SpeechStew、FLEURS、CoVoST 2；语言数：en-US 单语、18、73、en-US、en-US、62、102、21。已有工作（单一模型）：Whisper-longform 17.7、27.8、23.9、12.8；Whisper-shortform† 13.2‡、11.5、36.6、29.1。本工作（单一模型）：USM-LAS 14.4、19.0、29.8、11.2、10.5、12.5；USM-CTC 13.7、18.7、26.7、12.1、10.8、15.5。已有工作（域内微调）：BigSSL [3] 14.8、7.5；Maestro [67] 7.2、25.2；Maestro-U [67] 26.0（8.7）。本工作（域内微调）：USM 13.2、7.4、13.5、19.2（6.9）、28.7；USM-M 12.5、7.0、11.8、17.4（6.5）、30.7。本工作（冻结编码器）：USM-M-adapter§ 7.5、12.4、17.6（6.7）、29.6。（CoVoST 2 列报告 BLEU 分数；括号内为 CER）"
      },
      {
       "id": "s-3-3-1-5-2",
       "original": "When presenting the error rate metrics, we use CER for Chinese, Japanese, Thai, Lao, and Burmese to be consistent with Whisper [1].",
       "zh": "在报告错误率指标时，为与 Whisper [1] 保持一致，我们对中文、日语、泰语、老挝语和缅甸语使用 CER。"
      }
     ]
    },
    {
     "id": "p-3-3-1-6",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-3-3-1-6-1",
       "original": "The test set for the YouTube domain consists of utterances from 73 languages with an average of 15 hours of audio per language, the audio length for each individual language ranging from 1 to 24 hours.",
       "zh": "YouTube 领域的测试集由 73 种语言的语句组成，平均每语言 15 小时音频，单个语言的音频时长从 1 小时到 24 小时不等。"
      },
      {
       "id": "s-3-3-1-6-2",
       "original": "The audio is transcribed manually from popular YouTube videos, each with a duration of up to 30 minutes.",
       "zh": "音频来自热门 YouTube 视频并人工转写，每条视频最长 30 分钟。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-3-3-2",
   "num": "3.3.2",
   "level": 2,
   "page": 12,
   "title": {
    "original": "Speech Translation (AST)",
    "zh": "语音翻译（AST）"
   },
   "blocks": [
    {
     "id": "p-3-3-2-1",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-3-3-2-1-1",
       "original": "Following [20], we use CoVoST 2 [18] to benchmark multilingual speech translation.",
       "zh": "沿用 [20]，我们用 CoVoST 2 [18] 作为多语种语音翻译基准。"
      },
      {
       "id": "s-3-3-2-1-2",
       "original": "We evaluate the multilingual XX-to-English task that covers translation from 21 source languages into English.",
       "zh": "我们评估多语种的 XX→英语任务，覆盖从 21 种源语言到英语的翻译。"
      },
      {
       "id": "s-3-3-2-1-3",
       "original": "Depending on the language, the training data ranges in size from 1 - 264 hours.",
       "zh": "视语言而定，训练数据规模从 1 小时到 264 小时不等。"
      }
     ]
    },
    {
     "id": "p-3-3-2-2",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-3-3-2-2-1",
       "original": "Besides speech translation data, we also add text-to-text translation data for training the model as in [20].",
       "zh": "除语音翻译数据外，我们还如 [20] 一样加入文本到文本的翻译数据来训练模型。"
      },
      {
       "id": "s-3-3-2-2-2",
       "original": "This dataset includes the text translation data from CoVoST 2 combined with all data from either WMT or TED Talks, as available.",
       "zh": "该数据集包括 CoVoST 2 的文本翻译数据，并尽可能并入 WMT 或 TED Talks 的全部数据。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-4",
   "num": "4",
   "level": 1,
   "page": 12,
   "title": {
    "original": "Key Results",
    "zh": "关键结果"
   },
   "blocks": []
  },
  {
   "id": "sec-4-1",
   "num": "4.1",
   "level": 2,
   "page": 12,
   "title": {
    "original": "Robust Speech Recognition for Massively Multilingual Tasks",
    "zh": "面向超大规模多语种任务的鲁棒语音识别"
   },
   "blocks": [
    {
     "id": "p-4-1-1",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-4-1-1-1",
       "original": "In this section, we compare the performance of our models against public baselines, including Whisper large-v26 [1], which has been trained on 680k hours of weakly supervised data across 100 languages.",
       "zh": "本节我们把模型与公开基线比较，包括 Whisper large-v26 [1]（large-v2，见脚注6）——它在覆盖 100 种语言的 680k 小时弱监督数据上训练。"
      }
     ]
    },
    {
     "id": "p-4-1-2",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-4-1-2-1",
       "original": "For the massively multilingual speech recognition test dataset from YouTube, we observe that Whisper hallucinates in many languages, resulting in a WER exceeding 100%.",
       "zh": "在来自 YouTube 的超大规模多语种语音识别测试集上，我们观察到 Whisper 在许多语言中产生幻觉，导致 WER 超过 100%。"
      },
      {
       "id": "s-4-1-2-2",
       "original": "For a reasonable comparison, we restrict the language set on which we compare the performance USM against Whisper by first selecting the top-25 languages from the training data for Whisper and further excluding languages for which Whisper produces > 40% WER.",
       "zh": "为进行合理比较，我们这样限定 USM 与 Whisper 比较的语言集合：先选取 Whisper 训练数据中的前 25 种语言，再进一步排除 Whisper 产出 > 40% WER 的语言。"
      },
      {
       "id": "s-4-1-2-3",
       "original": "We also use segmented decoding for Whisper with 30-second segments to further reduce the effect of hallucinations.",
       "zh": "我们还对 Whisper 使用 30 秒分段的分段解码，以进一步减轻幻觉的影响。"
      },
      {
       "id": "s-4-1-2-4",
       "original": "As shown in Table 3, our USM-LAS and 6Whisper large-v2 on Github (https://github.com/openai/whisper.git, revision b4308c4) is used for evaluation.",
       "zh": "如 Table 3 所示，我们的 USM-LAS 和（脚注6：评估使用 GitHub 上的 Whisper large-v2，https://github.com/openai/whisper.git，修订版 b4308c4）——"
      }
     ]
    },
    {
     "id": "p-4-1-3",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-4-1-3-1",
       "original": "USM-CTC models outperform Whisper by a wide margin on YouTube en-US, despite training on significantly less supervised data (3.5k hours versus Whisper’s 400k hours [1]).",
       "zh": "（接上）USM-CTC 模型在 YouTube en-US 上大幅超越 Whisper，尽管训练所用的监督数据少得多（3.5k（3500）小时对 Whisper 的 400k（40 万）小时 [1]）。"
      },
      {
       "id": "s-4-1-3-2",
       "original": "While the USM-LAS model also requires segmented decoding to reduce long-form degradation as discussed in section 2.4, it is far more robust, out-performing Whisper by a relative 30% WER on those 18 languages.",
       "zh": "虽然如 2.4 节所讨论的，USM-LAS 模型同样需要分段解码来减轻长音频退化，但它的鲁棒性强得多——在这 18 种语言上以相对 30% 的 WER 优势超越 Whisper。"
      },
      {
       "id": "s-4-1-3-3",
       "original": "USM-CTC does not exhibit long-form performance degradation and achieves the best performance on YouTube.",
       "zh": "USM-CTC 则完全没有表现出长音频性能退化，并在 YouTube 上取得最佳性能。"
      }
     ]
    },
    {
     "id": "p-4-1-4",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-4-1-4-1",
       "original": "On the out-of-domain long-form CORAAL set, both USM-CTC and USM-LAS outperform Whisper by more than 10% relative WER.",
       "zh": "在域外长音频集 CORAAL 上，USM-CTC 与 USM-LAS 均以超过 10% 的相对 WER 优势超越 Whisper。"
      },
      {
       "id": "s-4-1-4-2",
       "original": "USM-CTC and USM-LAS similary outperform Whisper on SpeechStew, whose training data the models have not had access to.",
       "zh": "USM-CTC 与 USM-LAS 同样在 SpeechStew 上超越 Whisper——而模型从未接触过 SpeechStew 的训练数据。"
      }
     ]
    },
    {
     "id": "p-4-1-5",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-4-1-5-1",
       "original": "We further compare the multilingual performance of the models on the held-out set from FLEURS.",
       "zh": "我们进一步在 FLEURS 的留出集上比较各模型的多语种性能。"
      },
      {
       "id": "s-4-1-5-2",
       "original": "As shown in Table 3, USM-LAS and USM-CTC both outperform Whisper by 66% relative WER, despite using a smaller amount of multilingual supervised data (90k versus Whisper’s 117k, when en-US is excluded).",
       "zh": "如 Table 3 所示，USM-LAS 与 USM-CTC 都以相对 66% 的 WER 优势超越 Whisper，尽管使用的多语种监督数据更少（90k 小时对 Whisper 的 117k 小时，均不计 en-US）。"
      },
      {
       "id": "s-4-1-5-3",
       "original": "USM-LAS consistently outperforms USM-CTC for short-form ASR tasks.",
       "zh": "在短音频 ASR 任务上，USM-LAS 一致优于 USM-CTC。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-4-2",
   "num": "4.2",
   "level": 2,
   "page": 13,
   "title": {
    "original": "Massively Multilingual Results Beyond 100 Languages",
    "zh": "超越 100 种语言的超大规模多语种结果"
   },
   "blocks": [
    {
     "id": "p-4-2-1",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-4-2-1-1",
       "original": "The lower part of Table 3 shows our results for in-domain fine-tuning.",
       "zh": "Table 3 的下半部分展示了我们的域内微调结果。"
      },
      {
       "id": "s-4-2-1-2",
       "original": "Our pre-trained model improves the FLEURS benchmark significantly, even when using only 10 hours per language.",
       "zh": "即使每语言只用 10 小时数据，我们的预训练模型也显著改进了 FLEURS 基准。"
      },
      {
       "id": "s-4-2-1-3",
       "original": "Compared to the previous SoTA in [67], our model achieves a 30% relative improvement in terms of WER across 102 languages.",
       "zh": "与此前 [67] 的最先进水平相比，我们的模型在 102 种语言上的 WER 取得 30% 的相对改进。"
      },
      {
       "id": "s-4-2-1-4",
       "original": "Our results show that while generic speech models can be powerful, performance is still maximized by in-domain fine-tuning.",
       "zh": "我们的结果表明：尽管通用语音模型可以很强大，但性能的极限仍要靠域内微调来达到。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-4-3",
   "num": "4.3",
   "level": 2,
   "page": 13,
   "title": {
    "original": "MOST Produces Robust Representations that Generalize to New Domains",
    "zh": "MOST 产出能泛化到新领域的鲁棒表征"
   },
   "blocks": [
    {
     "id": "p-4-3-1",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-4-3-1-1",
       "original": "MOST training aligns the representations of speech and text by training simultaneously on the two modalities.",
       "zh": "MOST 训练通过在两种模态上同时训练，使语音与文本的表征对齐。"
      },
      {
       "id": "s-4-3-1-2",
       "original": "We investigate whether MOST representations are useful for adapting the model to new domains by freezing the entire learned encoder produced by MOST and adjusting a small amount of parameters added to the network by residual adapters.",
       "zh": "我们考察 MOST 表征是否有助于把模型适配到新领域：做法是把 MOST 产出的整个编码器冻结，只调整残差适配器为网络新增的少量参数。"
      },
      {
       "id": "s-4-3-1-3",
       "original": "As shown in Table 3, by adding only 2% to the total number of parameters, the MOST representation model (USM-M-adapter) only performs slightly worse than the fine-tuning baselines, still showing competitive performance on downstream ASR and AST tasks.",
       "zh": "如 Table 3 所示，仅增加约 2% 的总参数，MOST 表征模型（USM-M-adapter）就只比微调基线略差，在下游 ASR 与 AST 任务上仍表现出有竞争力的性能。"
      },
      {
       "id": "s-4-3-1-4",
       "original": "The small number of parameters being trained in this approach makes it feasible to extend our system to a large number of new domains and new tasks, even with a limited amount of training data, such as in FLEURS.",
       "zh": "该方案需训练的参数量很小，因而即使训练数据有限（如 FLEURS），把系统扩展到大量新领域与新任务也是可行的。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-4-4",
   "num": "4.4",
   "level": 2,
   "page": 13,
   "title": {
    "original": "Pushing the Quality of ASR on Unseen Languages",
    "zh": "在未见过语言上推高 ASR 质量"
   },
   "blocks": [
    {
     "id": "tab-4-4-1",
     "type": "table_caption",
     "page": 13,
     "original": "Table 4: Noisy student training for unseen languages. WERs (%) for the teacher adapter models and the student models are presented. The relative improvement (%) of the student models can be found in the last column.",
     "zh": "表 4：面向未见过语言的噪声学生训练。表中给出教师适配器模型与学生模型的 WER（%），最后一列是学生模型的相对改进（%）。"
    },
    {
     "id": "p-4-4-1",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-4-4-1-1",
       "original": "Languages Whisper-v2 # hrs in YT-NTL USM-LAS-Adapter USM-M + pseudo label Rel.",
       "zh": "（Table 4 表头）语言 / Whisper-v2 / YT-NTL 中的小时数 / USM-LAS-Adapter / USM-M + 伪标注 / 相对提升。"
      },
      {
       "id": "s-4-4-1-2",
       "original": "Imprv.",
       "zh": "改进率。"
      }
     ]
    },
    {
     "id": "p-4-4-2",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-4-4-2-1",
       "original": "Hausa (ha) 88.9 2175.0 24.5 22.8 7.5 Kazakh (kk) 37.7 196.0 11.8 10.9 8.3 Shona (sn) 121.0 247.0 29.1 22.2 31.1 Pashto (ps) 93.7 254.0 36.0 35.4 1.7 Yoruba (yo) 94.8 1292.0 33.4 30.6 9.2 Tail languages often do not have paired transcriptions for supervised learning—we refer to these languages as unseen languages, as the model has not seen paired data for these lanugages during training.",
       "zh": "（Table 4 正文，数值与原文一致）豪萨语（ha）88.9、2175.0、24.5、22.8、7.5；哈萨克语（kk）37.7、196.0、11.8、10.9、8.3；绍纳语（sn）121.0、247.0、29.1、22.2、31.1；普什图语（ps）93.7、254.0、36.0、35.4、1.7；约鲁巴语（yo）94.8、1292.0、33.4、30.6、9.2。长尾语言往往没有可用于监督学习的配对转写——我们把这类语言称为「未见过」语言，因为模型在训练中从未见过这些语言的配对数据。"
      },
      {
       "id": "s-4-4-2-2",
       "original": "To create pseudo-labels for these languages, we first build a USM-LAS-Adapter by attaching residual adapters to USM-LAS and training them using FLEURS data.",
       "zh": "为给这些语言构造伪标注，我们首先构建一个 USM-LAS-Adapter：把残差适配器挂到 USM-LAS 上，并用 FLEURS 数据训练它们。"
      },
      {
       "id": "s-4-4-2-3",
       "original": "By using the USM-LAS- Adapter as a teacher, we can now transcribe the unlabeled data in the unseen languages as part of the YT-NTL dataset.",
       "zh": "以 USM-LAS-Adapter 为教师，我们现在就可以转写 YT-NTL 数据集中未见过语言的无标注数据。"
      },
      {
       "id": "s-4-4-2-4",
       "original": "As shown in Table 4, we observe consistent wins for all languages on the FLEURS benchmark.",
       "zh": "如 Table 4 所示，我们观察到所有语言在 FLEURS 基准上都一致地取得收益。"
      },
      {
       "id": "s-4-4-2-5",
       "original": "For some languages, the improvement is larger than 30%.",
       "zh": "对某些语言，改进幅度超过 30%。"
      },
      {
       "id": "s-4-4-2-6",
       "original": "This further demonstrates the robustness of the USM-LAS model—despite using only 10 hours of out of domain data from FLEURS, the USM-LAS-Adapter is able to transcribe YouTube data to produce meaningful recognition results that lead to these improvements.",
       "zh": "这进一步证明了 USM-LAS 模型的鲁棒性——尽管只用了来自 FLEURS 的 10 小时域外数据，USM-LAS-Adapter 就能转写 YouTube 数据，产出有意义的识别结果并带来这些改进。"
      },
      {
       "id": "s-4-4-2-7",
       "original": "We find the approach of training adapter models on small datasets and utilizing them for pseudo-labeling to be a promising route for scaling up the number of languages that can be transcribed by USMs.",
       "zh": "我们发现，「先在小数据集上训练适配器模型、再用它们生成伪标注」这一路线，在扩展 USM 可转写语言数量方面很有前景。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-4-5",
   "num": "4.5",
   "level": 2,
   "page": 14,
   "title": {
    "original": "USMs are Strong AST Models",
    "zh": "USM 是强大的 AST 模型"
   },
   "blocks": [
    {
     "id": "p-4-5-1",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-4-5-1-1",
       "original": "The multi-lingual speech translation performance of fine-tuned USMs are shown in Table 3.",
       "zh": "微调后 USM 的多语种语音翻译性能如 Table 3 所示。"
      },
      {
       "id": "s-4-5-1-2",
       "original": "We find that we are already comparable to the CoVoST 2 SoTA BLEU score by fine-tuning the speechonly USM.",
       "zh": "我们发现，仅微调纯语音版 USM，就已经能与 CoVoST 2 的最优 BLEU 分数相当。"
      },
      {
       "id": "s-4-5-1-3",
       "original": "We note that the previous SoTA uses 125k hours of supervised speech translation data compared to the 859 hours of data used by the USM.",
       "zh": "我们注意到，此前的最优结果使用了 125k 小时监督语音翻译数据，而 USM 只用了 859 小时。"
      },
      {
       "id": "s-4-5-1-4",
       "original": "After MOST training, USM-M can use both speech and text as training input.",
       "zh": "经过 MOST 训练后，USM-M 可以同时以语音和文本作为训练输入。"
      },
      {
       "id": "s-4-5-1-5",
       "original": "By introducing text-to-text machine translation (MT) data during fine-tuning, USM-M is able to achieve an unprecedented > 30 BLEU on CoVoST (a 1 BLEU increase from SoTA).",
       "zh": "通过在微调阶段引入文本到文本机器翻译（MT）数据，USM-M 在 CoVoST 上取得了前所未有的 > 30 BLEU（比此前最优水平提高了 1 个 BLEU）。"
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
    "original": "Analysis and Ablations",
    "zh": "分析与消融"
   },
   "blocks": []
  },
  {
   "id": "sec-5-1",
   "num": "5.1",
   "level": 2,
   "page": 14,
   "title": {
    "original": "Multi-Softmax Loss for BEST-RQ",
    "zh": "BEST-RQ 的多 softmax 损失"
   },
   "blocks": [
    {
     "id": "p-5-1-1",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-5-1-1-1",
       "original": "We observe a consistent > 5% relative improvement in ASR and AST benchmarks by increasing the number of the softmax groups in the multi-softmax loss for BEST-RQ training from 1 to 16, as shown in Table 5.",
       "zh": "如 Table 5 所示，我们观察到：把 BEST-RQ 训练的多 softmax 损失中 softmax 组数从 1 增加到 16，ASR 与 AST 基准会一致地取得 > 5% 的相对改进。"
      },
      {
       "id": "s-5-1-1-2",
       "original": "We also find that using multiple softmax groups significantly reduces performance variation across different pre-training runs and improves convergence speed.",
       "zh": "我们还发现，使用多个 softmax 组显著降低了不同预训练运行之间的性能波动，并加快了收敛速度。"
      }
     ]
    },
    {
     "id": "tab-5-1-1",
     "type": "table_caption",
     "page": 14,
     "original": "Table 5: YT-55 versus YT-NTL across different domains, with and without multi-softmax groups. For simplicity, we report CER for FLEURS. For CoVoST, we report the BLEU score. YT-NTL covers 27 additional languages not covered in YT-55.",
     "zh": "表 5：YT-55 与 YT-NTL 在不同领域上的对比，含/不含多 softmax 组。为简洁起见，FLEURS 报告 CER，CoVoST 报告 BLEU 分数。YT-NTL 覆盖了 YT-55 未覆盖的另外 27 种语言。"
    },
    {
     "id": "p-5-1-2",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-5-1-2-1",
       "original": "pre-train Set # Params (B) # Softmax FLEURS (CER) CoVoST (BLEU) .",
       "zh": "（Table 5 表头）预训练集 / 参数量（B）/ softmax 组数 / FLEURS（CER）/ CoVoST（BLEU）。"
      }
     ]
    },
    {
     "id": "p-5-1-3",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-5-1-3-1",
       "original": "102 langs 27 langs Conformer-0.6B YT-55 0.6 1 9.5 20.9 YT-55 2.0 1 7.9 9.5 26.6 YT-NTL-U 2.0 1 7.4 8.5 27.5 YT-NTL-U 2.0 16 6.9 8.1 28.7",
       "zh": "（Table 5 正文，数值与原文一致；FLEURS 分为 102 语言与 27 语言两列）Conformer-0.6B：预训练集 YT-55，参数量 0.6B，1 个 softmax，FLEURS CER 9.5，CoVoST BLEU 20.9；YT-55，2.0B，1 个 softmax，7.9、9.5、26.6；YT-NTL-U，2.0B，1 个 softmax，7.4、8.5、27.5；YT-NTL-U，2.0B，16 个 softmax，6.9、8.1、28.7。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-5-2",
   "num": "5.2",
   "level": 2,
   "page": 14,
   "title": {
    "original": "Model and Language Scaling",
    "zh": "模型与语言规模扩展"
   },
   "blocks": [
    {
     "id": "p-5-2-1",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-5-2-1-1",
       "original": "We find that scaling up the model size and increasing the language coverage of the pre-training dataset greatly benefits the performance of the USMs, as demonstrated in Table 5.",
       "zh": "我们发现，扩大模型规模、增加预训练数据集的语言覆盖，能大幅改善 USM 的性能，如 Table 5 所示。"
      },
      {
       "id": "s-5-2-1-2",
       "original": "In particular, we find a 10% relative improvement of ASR and AST performance by using YT-NTL vs. YT-55 for pre-training, despite the fact that each newly added language in YT-NTL contains approximately 500 hours of speech—a relatively small amount.",
       "zh": "特别地，用 YT-NTL 替代 YT-55 做预训练，为 ASR 与 AST 性能带来了 10% 的相对改进——尽管 YT-NTL 中每个新增语言的语音只有约 500 小时，规模相对很小。"
      },
      {
       "id": "s-5-2-1-3",
       "original": "As could be expected, the relative gains on the newly covered languages are more substantial than those on other languages.",
       "zh": "不出所料，新增覆盖语言上的相对收益比其他语言更显著。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-5-3",
   "num": "5.3",
   "level": 2,
   "page": 14,
   "title": {
    "original": "BEST-RQ is a Scalable Self-supervised Learner",
    "zh": "BEST-RQ 是可扩展的自监督学习器"
   },
   "blocks": [
    {
     "id": "p-5-3-1",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-5-3-1-1",
       "original": "BEST-RQ has been shown to outperform or be comparable to other prominent pre-training methods for speech recognition, including wav2vec 2.0 and W2v-BERT in the original work in which it was introduced [10].",
       "zh": "在 BEST-RQ 最初提出的论文 [10] 中，它已被证明优于或相当于语音识别领域其他主流预训练方法，包括 wav2vec 2.0 与 W2v-BERT。"
      },
      {
       "id": "s-5-3-1-2",
       "original": "Here we investigate its comparative performance and scaling properties, similar to what has been done for wav2vec 2.0 in [3] and W2v-BERT in [20].",
       "zh": "此处我们考察它的比较性能与规模扩展性质，做法类似于 [3] 对 wav2vec 2.0 和 [20] 对 W2v-BERT 的研究。"
      },
      {
       "id": "s-5-3-1-3",
       "original": "We utilize the set-up of pre-training the model using YT-55 and fine-tuning it on CoVoST 2.",
       "zh": "我们采用的设定是：用 YT-55 预训练模型，再在 CoVoST 2 上微调。"
      },
      {
       "id": "s-5-3-1-4",
       "original": "As shown in Table 6, our results indicate that for the Conformer-0.6B, W2v-BERT and BEST-RQ perform similarly, but BEST-RQ obtains greater gains when scaled up.",
       "zh": "如 Table 6 所示，我们的结果表明：对于 Conformer-0.6B，W2v-BERT 与 BEST-RQ 表现相当；但规模扩大后，BEST-RQ 获得更大的收益。"
      },
      {
       "id": "s-5-3-1-5",
       "original": "A contributing factor to this can be that W2v-BERT is more prone to codebook collapse and training instabilities at the 2B scale, while BEST-RQ by construction doesn’t suffer from codebook collapse.",
       "zh": "一个可能的原因是：W2v-BERT 在 2B 规模下更容易出现码本坍缩（codebook collapse）和训练不稳定，而 BEST-RQ 在构造上就不存在码本坍缩问题。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-5-4",
   "num": "5.4",
   "level": 2,
   "page": 14,
   "title": {
    "original": "Chunk-wise attention for robust long-form speech recognition",
    "zh": "分块注意力实现鲁棒的长音频语音识别"
   },
   "blocks": [
    {
     "id": "fig-5-4-1",
     "type": "figure_caption",
     "page": 14,
     "original": "Fig. 7 depicts the long-form performance degradation issue as described in section 2.4. In the figure, we see that for the shallow Conformer model with 17 layers, using a small local self attention context",
     "zh": "图 7（上接说明文字）：描绘了 2.4 节所述的长音频性能退化问题。图中可见，对于有 17 层的浅层 Conformer 模型，在使用较小的局部自注意力上下文……（图注剩余部分在后续段落继续）"
    },
    {
     "id": "tab-5-4-1",
     "type": "table_caption",
     "page": 15,
     "original": "Table 6: BLEU scores for the CoVoST 2 X →En task to compare BEST-RQ against W2v-BERT. Higher is better.",
     "zh": "表 6：CoVoST 2 X→英语任务上 BEST-RQ 与 W2v-BERT 的 BLEU 分数对比。越高越好。"
    },
    {
     "id": "p-5-4-1",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-5-4-1-1",
       "original": "X →English high mid low all",
       "zh": "（Table 6 表头）X →英语：高资源 / 中资源 / 低资源 / 全部。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-previous-work",
   "num": null,
   "level": 2,
   "page": 15,
   "title": {
    "original": "Previous Work",
    "zh": "已有工作（Table 6 基线行）"
   },
   "blocks": [
    {
     "id": "p-previous-work-1",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-previous-work-1-1",
       "original": "XLS-R (0.3B) [33] 30.6 18.9 5.1 13.2 XLS-R (1B) [33] 34.3 25.5 11.7 19.3 XLS-R (2B) [33] 36.1 27.7 15.1 22.1",
       "zh": "（Table 6 基线行，数值与原文一致）XLS-R（0.3B）[33]：30.6、18.9、5.1、13.2；XLS-R（1B）[33]：34.3、25.5、11.7、19.3；XLS-R（2B）[33]：36.1、27.7、15.1、22.1。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-conformer-0-6b",
   "num": null,
   "level": 2,
   "page": 15,
   "title": {
    "original": "Conformer-0.6B",
    "zh": "Conformer-0.6B（Table 6 续与 Figure 7 说明）"
   },
   "blocks": [
    {
     "id": "p-conformer-0-6b-1",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-conformer-0-6b-1-1",
       "original": "W2v-BERT 35.6 25.3 13.4 20.4 BEST-RQ 32.5 25.6 14.7 20.7 W2v-BERT 36.0 27.8 15.6 22.4 BEST-RQ 35.8 31.3 21.5 26.6",
       "zh": "（Table 6 正文，数值与原文一致）W2v-BERT：35.6、25.3、13.4、20.4；BEST-RQ：32.5、25.6、14.7、20.7；W2v-BERT：36.0、27.8、15.6、22.4；BEST-RQ：35.8、31.3、21.5、26.6。"
      }
     ]
    },
    {
     "id": "fig-conformer-0-6b-1",
     "type": "figure_caption",
     "page": 15,
     "original": "Figure 7: The word error rate measured on the YouTube en-US long-form test set for Conformer models with varying depth.",
     "zh": "图 7：不同深度 Conformer 模型在 YouTube en-US 长音频测试集上测得的词错误率。"
    },
    {
     "id": "p-conformer-0-6b-2",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-conformer-0-6b-2-1",
       "original": "(65) length, the word error rate measured on the long-form test set gradually improves as the training progresses.",
       "zh": "（……上接 Figure 7 图注，原句含页码残留「(65)」）……长度（65）时，长音频测试集上测得的词错误率随训练进行逐渐改善。"
      },
      {
       "id": "s-conformer-0-6b-2-2",
       "original": "With a deeper model that has 48 layers but roughly the same number of parameters, however, the larger receptive field mismatch results in higher test WERs as the training step increases.",
       "zh": "然而，对于一个有 48 层但参数量大致相同的更深模型，更大的感受野失配导致测试 WER 随训练步数增加而升高。"
      }
     ]
    },
    {
     "id": "tab-conformer-0-6b-1",
     "type": "table_caption",
     "page": 15,
     "original": "Table 7 demonstrates that chunk-wise attention is able to address the long-form degradation issue and show robust performance across four different languages—en-US (English), ru-RU (Russian), ko-KR (Korean), and uk-UA (Ukrainian). We compare chunk-wise attention models with an 8-second chunk size (CW-8s in Table 7) against local self attention models which uses 128 context frames in each conformer layer (LSA-128). We note that further increasing the context window size of the local self attention model results in high deletion error rates on all languages of the YouTube long-form test sets. These results show that the chunk-wise attention models do not exhibit long-form performance degradation and are able to improve upon the performance of the local self attention models operating at the maximum allowed receptive field length.",
     "zh": "表 7（文字说明部分）：证明分块注意力能解决长音频退化问题，并在四种不同语言——en-US（英语）、ru-RU（俄语）、ko-KR（韩语）和 uk-UA（乌克兰语）——上表现鲁棒。我们把块长为 8 秒的分块注意力模型（Table 7 中的 CW-8s）与每个 Conformer 层使用 128 帧上下文的局部自注意力模型（LSA-128）对比。我们注意到，进一步增大局部自注意力模型的上下文窗口，会在 YouTube 长音频测试集的所有语言上导致高删除错误率。这些结果表明：分块注意力模型不出现长音频性能退化，且能优于工作在最大允许感受野长度下的局部自注意力模型。"
    },
    {
     "id": "tab-conformer-0-6b-2",
     "type": "table_caption",
     "page": 15,
     "original": "Table 7: Chunk-wise attention. WER (%) is reported on the YouTube long-form set.",
     "zh": "表 7：分块注意力。报告 YouTube 长音频集上的 WER（%）。"
    },
    {
     "id": "p-conformer-0-6b-3",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-conformer-0-6b-3-1",
       "original": "# Params (B) # Layers en-US ru-RU ko-KR uk-UA LSA-128 0.6 24 16.2 16.6 26.2 15.5 CW-8s 0.6 24 12.5 14.7 19.5 15.3",
       "zh": "（Table 7 正文，数值与原文一致）参数量（B）/ 层数 / en-US / ru-RU / ko-KR / uk-UA：LSA-128，0.6B、24 层，16.2、16.6、26.2、15.5；CW-8s，0.6B、24 层，12.5、14.7、19.5、15.3。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-5-5",
   "num": "5.5",
   "level": 2,
   "page": 15,
   "title": {
    "original": "TPU Serving Capacity of USM-CTC Models",
    "zh": "USM-CTC 模型的 TPU 服务能力"
   },
   "blocks": [
    {
     "id": "p-5-5-1",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-5-5-1-1",
       "original": "In section 4, we have demonstrated that USM-CTC models are powerful generic ASR models with reliable long-form transcription performance and excellent generalization properties.",
       "zh": "在第 4 节中，我们已证明 USM-CTC 模型是强大的通用 ASR 模型，具备可靠的长音频转录性能与优秀的泛化特性。"
      },
      {
       "id": "s-5-5-1-2",
       "original": "Here we",
       "zh": "此处我们（下接）"
      }
     ]
    },
    {
     "id": "tab-5-5-1",
     "type": "table_caption",
     "page": 16,
     "original": "Table 8: RTF for USM-2B.",
     "zh": "表 8：USM-2B 的 RTF。"
    },
    {
     "id": "p-5-5-2",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-5-5-2-1",
       "original": "bf-16 Streaming # Params (B) TPU [88] Batch Size 1.0/RTF Conformer-0.1B 0.1 TPUv4i 64 3047 Conformer-0.6B 0.6 TPUv4i 64 1920 2.0 TPUv4i 32 827 measure the serving capacity of the USM-CTC model as represented by the real time factor (RTF) in an ideal setup where we assume that each batch sent to TPU is fully packed along the time axis.",
       "zh": "（Table 8 正文，数值与原文一致）bf-16 / 流式；参数量（B）/ TPU 类型 [88] / 批大小 / 1.0/RTF：Conformer-0.1B，0.1B，TPUv4i，批大小 64，3047；Conformer-0.6B，0.6B，TPUv4i，批大小 64，1920；Conformer-2B，2.0B，TPUv4i，批大小 32，827。（接上句）……以实时因子（RTF）衡量 USM-CTC 模型的服务能力——在一个理想设定下测量：我们假设发送到 TPU 的每个批次在时间轴上被完全填满。"
      },
      {
       "id": "s-5-5-2-2",
       "original": "The results of these measurements are presented in Table 8.",
       "zh": "这些测量的结果呈现在 Table 8 中。"
      },
      {
       "id": "s-5-5-2-3",
       "original": "Surprisingly, we find that the 2B-paramter USM-CTC model is only 3.9× slower than the 100M-parameter streaming model [89], primarily due to the fact that our models operate at batch processing mode.",
       "zh": "令人意外的是，我们发现 2B 参数的 USM-CTC 模型只比 100M 参数的流式模型 [89] 慢 3.9×（3.9 倍）——这主要归功于我们的模型以批处理模式运行。"
      },
      {
       "id": "s-5-5-2-4",
       "original": "This result demonstrates that the USM-CTC can be used as an offline transcriber efficiently on TPUs (or GPUs).",
       "zh": "这一结果表明，USM-CTC 可以作为离线转写器在 TPU（或 GPU）上高效运行。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-6",
   "num": "6",
   "level": 1,
   "page": 16,
   "title": {
    "original": "Discussion",
    "zh": "讨论"
   },
   "blocks": [
    {
     "id": "p-6-1",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-6-1-1",
       "original": "In this report, we put forward a practical and flexible approach for training speech understanding models capable of scaling speech recognition to hundreds of languages.",
       "zh": "在本报告中，我们提出了一种实用且灵活的方法，用于训练能把语音识别扩展到数百种语言的语音理解模型。"
      },
      {
       "id": "s-6-1-2",
       "original": "We conclude the report with summarizing insights gained in the process:",
       "zh": "在报告结尾，我们总结这一过程中获得的洞见："
      }
     ]
    },
    {
     "id": "p-6-2",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-6-2-1",
       "original": "Unlabeled versus weakly labeled data: We believe diverse unlabeled data is more practical to acquire for building usable ASR for tail languages than weakly labeled data.",
       "zh": "无标注数据与弱标注数据：我们认为，要为长尾语言构建可用的 ASR，多样化的无标注数据比弱标注数据更切实可行。"
      },
      {
       "id": "s-6-2-2",
       "original": "We have demonstrated that collaborating with native speakers to identify unsupervised data in hundreds of tail languages can be an effective route to improving recognition performance on low resource languages.",
       "zh": "我们已经证明：与母语者协作、在数百种长尾语言中识别并收集非监督数据，是提升低资源语言识别性能的一条有效路径。"
      }
     ]
    },
    {
     "id": "p-6-3",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-6-3-1",
       "original": "In-domain data is best: We have demonstrated that we can build a robust ASR system across many domains by utilizing a large amount of unsupervised data and a small amount of labeled data.",
       "zh": "域内数据最佳：我们已证明，利用大量非监督数据加少量有标注数据，就能构建跨多领域的鲁棒 ASR 系统。"
      },
      {
       "id": "s-6-3-2",
       "original": "Our results, however, also confirm that the most effective way to optimize the performance for a given domain is to use in-domain data to fine-tune the model.",
       "zh": "不过，我们的结果也同时确认：要针对某个特定领域把性能优化到极致，最有效的方式仍是用域内数据微调模型。"
      }
     ]
    },
    {
     "id": "p-6-4",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-6-4-1",
       "original": "CTC vs RNN-T vs LAS: The best transducer depends on the downstream task.",
       "zh": "CTC、RNN-T 与 LAS 之争：最好的 Transducer 取决于下游任务。"
      },
      {
       "id": "s-6-4-2",
       "original": "A large pre-trained model with a frozen encoder can allow experimenters to test different transducers quickly and select the optimal transducer for their purpose.",
       "zh": "一个带冻结编码器的大型预训练模型，可以让实验者快速测试不同 Transducer，并为各自的目的选出最优的那个。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-acknowledgments",
   "num": null,
   "level": 1,
   "page": 16,
   "title": {
    "original": "Acknowledgments",
    "zh": "致谢"
   },
   "blocks": [
    {
     "id": "p-acknowledgments-1",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-acknowledgments-1-1",
       "original": "We would like to thank Alexis Conneau, Min Ma, Shikhar Bharadwaj, Sid Dalmia, Jiahui Yu, Jian Cheng, Paul Rubenstein, Ye Jia, Justin Snyder, Vincent Tsang, Yuanzhong Xu, Tao Wang, Anusha Ramesh, Calum Barnes, Salem Haykal for useful discussions.",
       "zh": "我们感谢 Alexis Conneau、Min Ma、Shikhar Bharadwaj、Sid Dalmia、Jiahui Yu、Jian Cheng、Paul Rubenstein、Ye Jia、Justin Snyder、Vincent Tsang、Yuanzhong Xu、Tao Wang、Anusha Ramesh、Calum Barnes、Salem Haykal 的有益讨论。"
      }
     ]
    },
    {
     "id": "p-acknowledgments-2",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-acknowledgments-2-1",
       "original": "We appreciate valuable feedback and support from Eli Collins, Jeff Dean, Sissie Hsiao, Zoubin Ghahramani.",
       "zh": "我们感谢 Eli Collins、Jeff Dean、Sissie Hsiao、Zoubin Ghahramani 的宝贵反馈与支持。"
      },
      {
       "id": "s-acknowledgments-2-2",
       "original": "Special thanks to Austin Tarango, Lara Tumeh, and Jason Porta for their guidance around responsible AI practices.",
       "zh": "特别感谢 Austin Tarango、Lara Tumeh 和 Jason Porta 在负责任 AI（responsible AI）实践方面的指导。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-references",
   "num": null,
   "level": 1,
   "page": 16,
   "title": {
    "original": "References",
    "zh": "References"
   },
   "blocks": [
    {
     "id": "p-references-1",
     "type": "paragraph",
     "page": 16,
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
       "original": "Sutskever, “Robust speech recognition via large-scale weak supervision,” arXiv preprint arXiv:2212.04356, 2022."
      }
     ]
    },
    {
     "id": "p-references-2",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-2-1",
       "original": "[2] W."
      },
      {
       "id": "s-references-2-2",
       "original": "Chan, D."
      },
      {
       "id": "s-references-2-3",
       "original": "Park, C."
      },
      {
       "id": "s-references-2-4",
       "original": "Lee, Y."
      },
      {
       "id": "s-references-2-5",
       "original": "Zhang, Q."
      },
      {
       "id": "s-references-2-6",
       "original": "Le, and M."
      },
      {
       "id": "s-references-2-7",
       "original": "Norouzi, “Speechstew: Simply mix all available speech recognition data to train one large neural network,” arXiv preprint arXiv:2104.02133, 2021."
      }
     ]
    },
    {
     "id": "p-references-3",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-3-1",
       "original": "[3] Y."
      },
      {
       "id": "s-references-3-2",
       "original": "Zhang, D."
      },
      {
       "id": "s-references-3-3",
       "original": "S."
      },
      {
       "id": "s-references-3-4",
       "original": "Park, W."
      },
      {
       "id": "s-references-3-5",
       "original": "Han, J."
      },
      {
       "id": "s-references-3-6",
       "original": "Qin, A."
      },
      {
       "id": "s-references-3-7",
       "original": "Gulati, J."
      },
      {
       "id": "s-references-3-8",
       "original": "Shor, A."
      },
      {
       "id": "s-references-3-9",
       "original": "Jansen, Y."
      },
      {
       "id": "s-references-3-10",
       "original": "Xu, Y."
      },
      {
       "id": "s-references-3-11",
       "original": "Huang, S."
      },
      {
       "id": "s-references-3-12",
       "original": "Wang, Z."
      },
      {
       "id": "s-references-3-13",
       "original": "Zhou, B."
      },
      {
       "id": "s-references-3-14",
       "original": "Li, M."
      },
      {
       "id": "s-references-3-15",
       "original": "Ma, W."
      },
      {
       "id": "s-references-3-16",
       "original": "Chan, J."
      },
      {
       "id": "s-references-3-17",
       "original": "Yu, Y."
      },
      {
       "id": "s-references-3-18",
       "original": "Wang, L."
      },
      {
       "id": "s-references-3-19",
       "original": "Cao, K."
      },
      {
       "id": "s-references-3-20",
       "original": "C."
      },
      {
       "id": "s-references-3-21",
       "original": "Sim, B."
      },
      {
       "id": "s-references-3-22",
       "original": "Ramabhadran, T."
      },
      {
       "id": "s-references-3-23",
       "original": "N."
      },
      {
       "id": "s-references-3-24",
       "original": "Sainath, F."
      },
      {
       "id": "s-references-3-25",
       "original": "Beaufays, Z."
      },
      {
       "id": "s-references-3-26",
       "original": "Chen, Q."
      },
      {
       "id": "s-references-3-27",
       "original": "V."
      },
      {
       "id": "s-references-3-28",
       "original": "Le, C.-C."
      },
      {
       "id": "s-references-3-29",
       "original": "Chiu, R."
      },
      {
       "id": "s-references-3-30",
       "original": "Pang, and Y."
      },
      {
       "id": "s-references-3-31",
       "original": "Wu, “Bigssl: Exploring the frontier of large-scale semi-supervised learning for automatic speech recognition,” IEEE Journal of Selected Topics in Signal Processing, vol. 16, no. 6, pp. 1519–1532, 2022."
      }
     ]
    },
    {
     "id": "p-references-4",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-4-1",
       "original": "[4] B."
      },
      {
       "id": "s-references-4-2",
       "original": "Li, R."
      },
      {
       "id": "s-references-4-3",
       "original": "Pang, T."
      },
      {
       "id": "s-references-4-4",
       "original": "N."
      },
      {
       "id": "s-references-4-5",
       "original": "Sainath, A."
      },
      {
       "id": "s-references-4-6",
       "original": "Gulati, Y."
      },
      {
       "id": "s-references-4-7",
       "original": "Zhang, J."
      },
      {
       "id": "s-references-4-8",
       "original": "Qin, P."
      },
      {
       "id": "s-references-4-9",
       "original": "Haghani, W."
      },
      {
       "id": "s-references-4-10",
       "original": "R."
      },
      {
       "id": "s-references-4-11",
       "original": "Huang, and M."
      },
      {
       "id": "s-references-4-12",
       "original": "Ma, “Scaling end-to-end models for large-scale multilingual asr,” arXiv preprint arXiv:2104.14830, 2021."
      }
     ]
    },
    {
     "id": "p-references-5",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-5-1",
       "original": "[5] X."
      },
      {
       "id": "s-references-5-2",
       "original": "Li, F."
      },
      {
       "id": "s-references-5-3",
       "original": "Metze, D."
      },
      {
       "id": "s-references-5-4",
       "original": "R."
      },
      {
       "id": "s-references-5-5",
       "original": "Mortensen, A."
      },
      {
       "id": "s-references-5-6",
       "original": "W."
      },
      {
       "id": "s-references-5-7",
       "original": "Black, and S."
      },
      {
       "id": "s-references-5-8",
       "original": "Watanabe, “Asr2k: Speech recognition for around 2000 languages without audio,” arXiv preprint arXiv:2209.02842, 2022."
      }
     ]
    },
    {
     "id": "p-references-6",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-6-1",
       "original": "[6] A."
      },
      {
       "id": "s-references-6-2",
       "original": "Baevski, H."
      },
      {
       "id": "s-references-6-3",
       "original": "Zhou, A."
      },
      {
       "id": "s-references-6-4",
       "original": "Mohamed, and M."
      },
      {
       "id": "s-references-6-5",
       "original": "Auli, “wav2vec 2.0: A framework for self-supervised learning of speech representations,” arXiv preprint arXiv:2006.11477, 2020."
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
       "original": "[7] Q."
      },
      {
       "id": "s-references-7-2",
       "original": "Xie, M.-T."
      },
      {
       "id": "s-references-7-3",
       "original": "Luong, E."
      },
      {
       "id": "s-references-7-4",
       "original": "Hovy, and Q."
      },
      {
       "id": "s-references-7-5",
       "original": "V."
      },
      {
       "id": "s-references-7-6",
       "original": "Le, “Self-training with noisy student improves imagenet classification,” in Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition, 2020, pp. 10 687–10 698."
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
       "original": "[8] D."
      },
      {
       "id": "s-references-8-2",
       "original": "S."
      },
      {
       "id": "s-references-8-3",
       "original": "Park, Y."
      },
      {
       "id": "s-references-8-4",
       "original": "Zhang, Y."
      },
      {
       "id": "s-references-8-5",
       "original": "Jia, W."
      },
      {
       "id": "s-references-8-6",
       "original": "Han, C.-C."
      },
      {
       "id": "s-references-8-7",
       "original": "Chiu, B."
      },
      {
       "id": "s-references-8-8",
       "original": "Li, Y."
      },
      {
       "id": "s-references-8-9",
       "original": "Wu, and Q."
      },
      {
       "id": "s-references-8-10",
       "original": "V."
      },
      {
       "id": "s-references-8-11",
       "original": "Le, “Improved noisy student training for automatic speech recognition,” arXiv preprint arXiv:2005.09629, 2020."
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
       "original": "[9] A."
      },
      {
       "id": "s-references-9-2",
       "original": "Gulati, J."
      },
      {
       "id": "s-references-9-3",
       "original": "Qin, C.-C."
      },
      {
       "id": "s-references-9-4",
       "original": "Chiu, N."
      },
      {
       "id": "s-references-9-5",
       "original": "Parmar, Y."
      },
      {
       "id": "s-references-9-6",
       "original": "Zhang, J."
      },
      {
       "id": "s-references-9-7",
       "original": "Yu, W."
      },
      {
       "id": "s-references-9-8",
       "original": "Han, S."
      },
      {
       "id": "s-references-9-9",
       "original": "Wang, Z."
      },
      {
       "id": "s-references-9-10",
       "original": "Zhang, Y."
      },
      {
       "id": "s-references-9-11",
       "original": "Wu et al., “Conformer: Convolution-augmented transformer for speech recognition,” arXiv preprint arXiv:2005.08100, 2020."
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
       "original": "[10] C.-C."
      },
      {
       "id": "s-references-10-2",
       "original": "Chiu, J."
      },
      {
       "id": "s-references-10-3",
       "original": "Qin, Y."
      },
      {
       "id": "s-references-10-4",
       "original": "Zhang, J."
      },
      {
       "id": "s-references-10-5",
       "original": "Yu, and Y."
      },
      {
       "id": "s-references-10-6",
       "original": "Wu, “Self-supervised learning with random-projection quantizer for speech recognition,” in Proceedings of the 39th International Conference on Machine Learning, ser."
      },
      {
       "id": "s-references-10-7",
       "original": "Proceedings of Machine Learning Research, K."
      },
      {
       "id": "s-references-10-8",
       "original": "Chaudhuri, S."
      },
      {
       "id": "s-references-10-9",
       "original": "Jegelka, L."
      },
      {
       "id": "s-references-10-10",
       "original": "Song, C."
      },
      {
       "id": "s-references-10-11",
       "original": "Szepesvari, G."
      },
      {
       "id": "s-references-10-12",
       "original": "Niu, and S."
      },
      {
       "id": "s-references-10-13",
       "original": "Sabato, Eds., vol. 162."
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
       "original": "PMLR, 17–23 Jul 2022, pp. 3915–3924."
      },
      {
       "id": "s-references-11-2",
       "original": "[Online]."
      },
      {
       "id": "s-references-11-3",
       "original": "Available: https://proceedings.mlr.press/v162/chiu22a.html [11] J."
      },
      {
       "id": "s-references-11-4",
       "original": "Devlin, M.-W."
      },
      {
       "id": "s-references-11-5",
       "original": "Chang, K."
      },
      {
       "id": "s-references-11-6",
       "original": "Lee, and K."
      },
      {
       "id": "s-references-11-7",
       "original": "Toutanova, “Bert: Pre-training of deep bidirectional transformers for language understanding,” arXiv preprint arXiv:1810.04805, 2018."
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
       "original": "[12] Z."
      },
      {
       "id": "s-references-12-2",
       "original": "Chen, Y."
      },
      {
       "id": "s-references-12-3",
       "original": "Zhang, A."
      },
      {
       "id": "s-references-12-4",
       "original": "Rosenberg, B."
      },
      {
       "id": "s-references-12-5",
       "original": "Ramabhadran, G."
      },
      {
       "id": "s-references-12-6",
       "original": "Wang, and P."
      },
      {
       "id": "s-references-12-7",
       "original": "Moreno, “Injecting text in selfsupervised speech pretraining,” arXiv preprint arXiv:2108.12226, 2021."
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
       "original": "[13] Z."
      },
      {
       "id": "s-references-13-2",
       "original": "Chen, Y."
      },
      {
       "id": "s-references-13-3",
       "original": "Zhang, A."
      },
      {
       "id": "s-references-13-4",
       "original": "Rosenberg, B."
      },
      {
       "id": "s-references-13-5",
       "original": "Ramabhadran, P."
      },
      {
       "id": "s-references-13-6",
       "original": "Moreno, A."
      },
      {
       "id": "s-references-13-7",
       "original": "Bapna, and H."
      },
      {
       "id": "s-references-13-8",
       "original": "Zen, “Maestro: Matched speech text representations through modality matching,” arXiv preprint arXiv:2204.03409, 2022."
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
       "original": "[14] A."
      },
      {
       "id": "s-references-14-2",
       "original": "Graves, S."
      },
      {
       "id": "s-references-14-3",
       "original": "Fernández, F."
      },
      {
       "id": "s-references-14-4",
       "original": "Gomez, and J."
      },
      {
       "id": "s-references-14-5",
       "original": "Schmidhuber, “Connectionist temporal classification: labelling unsegmented sequence data with recurrent neural networks,” in Proceedings of the 23rd international conference on Machine learning, 2006, pp. 369–376."
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
       "original": "[15] W."
      },
      {
       "id": "s-references-15-2",
       "original": "Chan, N."
      },
      {
       "id": "s-references-15-3",
       "original": "Jaitly, Q."
      },
      {
       "id": "s-references-15-4",
       "original": "Le, and O."
      },
      {
       "id": "s-references-15-5",
       "original": "Vinyals, “Listen, attend and spell: A neural network for large vocabulary conversational speech recognition,” in 2016 IEEE international conference on acoustics, speech and signal processing (ICASSP)."
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
       "original": "[16] A."
      },
      {
       "id": "s-references-16-2",
       "original": "Conneau, M."
      },
      {
       "id": "s-references-16-3",
       "original": "Ma, S."
      },
      {
       "id": "s-references-16-4",
       "original": "Khanuja, Y."
      },
      {
       "id": "s-references-16-5",
       "original": "Zhang, V."
      },
      {
       "id": "s-references-16-6",
       "original": "Axelrod, S."
      },
      {
       "id": "s-references-16-7",
       "original": "Dalmia, J."
      },
      {
       "id": "s-references-16-8",
       "original": "Riesa, C."
      },
      {
       "id": "s-references-16-9",
       "original": "Rivera, and A."
      },
      {
       "id": "s-references-16-10",
       "original": "Bapna, “Fleurs: Few-shot learning evaluation of universal representations of speech,” arXiv preprint [17] T."
      },
      {
       "id": "s-references-16-11",
       "original": "Kendall and C."
      },
      {
       "id": "s-references-16-12",
       "original": "Farrington, “The corpus of regional african american language. version 2021.07. eugene, or: The online resources for african american language project,” 2021."
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
       "original": "[18] C."
      },
      {
       "id": "s-references-17-2",
       "original": "Wang, A."
      },
      {
       "id": "s-references-17-3",
       "original": "Wu, and J."
      },
      {
       "id": "s-references-17-4",
       "original": "Pino, “CoVoST 2 and massively multilingual speech-to-text translation,” in interspeech, 2021."
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
       "original": "[19] J."
      },
      {
       "id": "s-references-18-2",
       "original": "He, C."
      },
      {
       "id": "s-references-18-3",
       "original": "Zhou, X."
      },
      {
       "id": "s-references-18-4",
       "original": "Ma, T."
      },
      {
       "id": "s-references-18-5",
       "original": "Berg-Kirkpatrick, and G."
      },
      {
       "id": "s-references-18-6",
       "original": "Neubig, “Towards a unified view of parameter-efficient transfer learning,” in International Conference on Learning Representations, 2022."
      },
      {
       "id": "s-references-18-7",
       "original": "[Online]."
      },
      {
       "id": "s-references-18-8",
       "original": "Available: https://openreview.net/forum?id=0RDcd5Axok [20] A."
      },
      {
       "id": "s-references-18-9",
       "original": "Bapna, C."
      },
      {
       "id": "s-references-18-10",
       "original": "Cherry, Y."
      },
      {
       "id": "s-references-18-11",
       "original": "Zhang, Y."
      },
      {
       "id": "s-references-18-12",
       "original": "Jia, M."
      },
      {
       "id": "s-references-18-13",
       "original": "Johnson, Y."
      },
      {
       "id": "s-references-18-14",
       "original": "Cheng, S."
      },
      {
       "id": "s-references-18-15",
       "original": "Khanuja, J."
      },
      {
       "id": "s-references-18-16",
       "original": "Riesa, and A."
      },
      {
       "id": "s-references-18-17",
       "original": "Conneau, “mslam: Massively multilingual joint pre-training for speech and text,” arXiv preprint arXiv:2202.01374, 2022."
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
       "original": "[21] Y.-A."
      },
      {
       "id": "s-references-19-2",
       "original": "Chung, Y."
      },
      {
       "id": "s-references-19-3",
       "original": "Zhang, W."
      },
      {
       "id": "s-references-19-4",
       "original": "Han, C.-C."
      },
      {
       "id": "s-references-19-5",
       "original": "Chiu, J."
      },
      {
       "id": "s-references-19-6",
       "original": "Qin, R."
      },
      {
       "id": "s-references-19-7",
       "original": "Pang, and Y."
      },
      {
       "id": "s-references-19-8",
       "original": "Wu, “W2v-bert: Combining contrastive learning and masked language modeling for self-supervised speech pre-training,” in 2021 IEEE Automatic Speech Recognition and Understanding Workshop (ASRU)."
      }
     ]
    },
    {
     "id": "p-references-20",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-20-1",
       "original": "[22] W.-N."
      },
      {
       "id": "s-references-20-2",
       "original": "Hsu and J."
      },
      {
       "id": "s-references-20-3",
       "original": "Glass, “Extracting domain invariant features by unsupervised learning for robust automatic speech recognition,” in 2018 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP)."
      }
     ]
    },
    {
     "id": "p-references-21",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-21-1",
       "original": "[23] Y.-A."
      },
      {
       "id": "s-references-21-2",
       "original": "Chung and J."
      },
      {
       "id": "s-references-21-3",
       "original": "Glass, “Speech2vec: A sequence-to-sequence framework for learning word embeddings from speech,” arXiv preprint arXiv:1803.08976, 2018."
      }
     ]
    },
    {
     "id": "p-references-22",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-22-1",
       "original": "[24] A. v. d."
      },
      {
       "id": "s-references-22-2",
       "original": "Oord, Y."
      },
      {
       "id": "s-references-22-3",
       "original": "Li, and O."
      },
      {
       "id": "s-references-22-4",
       "original": "Vinyals, “Representation learning with contrastive predictive coding,” arXiv preprint arXiv:1807.03748, 2018."
      }
     ]
    },
    {
     "id": "p-references-23",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-23-1",
       "original": "[25] Y.-A."
      },
      {
       "id": "s-references-23-2",
       "original": "Chung, W.-N."
      },
      {
       "id": "s-references-23-3",
       "original": "Hsu, H."
      },
      {
       "id": "s-references-23-4",
       "original": "Tang, and J."
      },
      {
       "id": "s-references-23-5",
       "original": "Glass, “An unsupervised autoregressive model for speech representation learning,” arXiv preprint arXiv:1904.03240, 2019."
      }
     ]
    },
    {
     "id": "p-references-24",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-24-1",
       "original": "[26] J."
      },
      {
       "id": "s-references-24-2",
       "original": "Chorowski, R."
      },
      {
       "id": "s-references-24-3",
       "original": "J."
      },
      {
       "id": "s-references-24-4",
       "original": "Weiss, S."
      },
      {
       "id": "s-references-24-5",
       "original": "Bengio, and A. van den Oord, “Unsupervised speech representation learning using wavenet autoencoders,” IEEE/ACM transactions on audio, speech, and language processing, vol. 27, no. 12, pp. 2041–2053, 2019."
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
       "original": "[27] S."
      },
      {
       "id": "s-references-25-2",
       "original": "Schneider, A."
      },
      {
       "id": "s-references-25-3",
       "original": "Baevski, R."
      },
      {
       "id": "s-references-25-4",
       "original": "Collobert, and M."
      },
      {
       "id": "s-references-25-5",
       "original": "Auli, “wav2vec: Unsupervised pre-training for speech recognition,” arXiv preprint arXiv:1904.05862, 2019."
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
       "original": "[28] A."
      },
      {
       "id": "s-references-26-2",
       "original": "Baevski, S."
      },
      {
       "id": "s-references-26-3",
       "original": "Schneider, and M."
      },
      {
       "id": "s-references-26-4",
       "original": "Auli, “vq-wav2vec: Self-supervised learning of discrete speech representations,” arXiv preprint arXiv:1910.05453, 2019."
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
       "original": "[29] S."
      },
      {
       "id": "s-references-27-2",
       "original": "Ling, Y."
      },
      {
       "id": "s-references-27-3",
       "original": "Liu, J."
      },
      {
       "id": "s-references-27-4",
       "original": "Salazar, and K."
      },
      {
       "id": "s-references-27-5",
       "original": "Kirchhoff, “Deep contextualized acoustic representations for semisupervised speech recognition,” in ICASSP 2020-2020 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP)."
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
       "original": "[30] A."
      },
      {
       "id": "s-references-28-2",
       "original": "Baevski, M."
      },
      {
       "id": "s-references-28-3",
       "original": "Auli, and A."
      },
      {
       "id": "s-references-28-4",
       "original": "Mohamed, “Effectiveness of self-supervised pre-training for speech recognition,” arXiv preprint arXiv:1911.03912, 2019."
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
       "original": "[31] M."
      },
      {
       "id": "s-references-29-2",
       "original": "Riviere, A."
      },
      {
       "id": "s-references-29-3",
       "original": "Joulin, P.-E."
      },
      {
       "id": "s-references-29-4",
       "original": "Mazaré, and E."
      },
      {
       "id": "s-references-29-5",
       "original": "Dupoux, “Unsupervised pretraining transfers well across languages,” in ICASSP 2020-2020 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP)."
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
       "original": "[32] K."
      },
      {
       "id": "s-references-30-2",
       "original": "Kawakami, L."
      },
      {
       "id": "s-references-30-3",
       "original": "Wang, C."
      },
      {
       "id": "s-references-30-4",
       "original": "Dyer, P."
      },
      {
       "id": "s-references-30-5",
       "original": "Blunsom, and A. v. d."
      },
      {
       "id": "s-references-30-6",
       "original": "Oord, “Learning robust and multilingual speech representations,” arXiv preprint arXiv:2001.11128, 2020."
      }
     ]
    },
    {
     "id": "p-references-31",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-31-1",
       "original": "[33] A."
      },
      {
       "id": "s-references-31-2",
       "original": "Babu, C."
      },
      {
       "id": "s-references-31-3",
       "original": "Wang, A."
      },
      {
       "id": "s-references-31-4",
       "original": "Tjandra, K."
      },
      {
       "id": "s-references-31-5",
       "original": "Lakhotia, Q."
      },
      {
       "id": "s-references-31-6",
       "original": "Xu, N."
      },
      {
       "id": "s-references-31-7",
       "original": "Goyal, K."
      },
      {
       "id": "s-references-31-8",
       "original": "Singh, P. von Platen, Y."
      },
      {
       "id": "s-references-31-9",
       "original": "Saraf, J."
      },
      {
       "id": "s-references-31-10",
       "original": "Pino et al., “Xls-r: Self-supervised cross-lingual speech representation learning at scale,” arXiv preprint [34] G."
      },
      {
       "id": "s-references-31-11",
       "original": "Zavaliagkos and T."
      },
      {
       "id": "s-references-31-12",
       "original": "Colthurst, “Utilizing untranscribed training data to improve performance,” in DARPA Broadcast News Transcription and Understanding Workshop, Landsdowne, 1998, pp. 301–305."
      }
     ]
    },
    {
     "id": "p-references-32",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-32-1",
       "original": "[35] L."
      },
      {
       "id": "s-references-32-2",
       "original": "Lamel, J. luc Gauvain, and G."
      },
      {
       "id": "s-references-32-3",
       "original": "Adda, “Lightly supervised acoustic model training,” in Proc."
      },
      {
       "id": "s-references-32-4",
       "original": "ISCA ITRW ASR2000, 2000, pp. 150–154."
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
       "original": "[36] S."
      },
      {
       "id": "s-references-33-2",
       "original": "Novotney and R."
      },
      {
       "id": "s-references-33-3",
       "original": "Schwartz, “Analysis of low-resource acoustic model self-training,” in Tenth Annual Conference of the International Speech Communication Association, 2009."
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
       "original": "[37] S."
      },
      {
       "id": "s-references-34-2",
       "original": "Thomas, M."
      },
      {
       "id": "s-references-34-3",
       "original": "L."
      },
      {
       "id": "s-references-34-4",
       "original": "Seltzer, K."
      },
      {
       "id": "s-references-34-5",
       "original": "Church, and H."
      },
      {
       "id": "s-references-34-6",
       "original": "Hermansky, “Deep neural network features and semisupervised training for low resource speech recognition,” in 2013 IEEE international conference on acoustics, speech and signal processing."
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
       "original": "[38] B."
      },
      {
       "id": "s-references-35-2",
       "original": "Li, T."
      },
      {
       "id": "s-references-35-3",
       "original": "N."
      },
      {
       "id": "s-references-35-4",
       "original": "Sainath, R."
      },
      {
       "id": "s-references-35-5",
       "original": "Pang, and Z."
      },
      {
       "id": "s-references-35-6",
       "original": "Wu, “Semi-supervised training for end-to-end models via weak distillation,” in ICASSP 2019-2019 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP)."
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
       "original": "[39] J."
      },
      {
       "id": "s-references-36-2",
       "original": "Kahn, A."
      },
      {
       "id": "s-references-36-3",
       "original": "Lee, and A."
      },
      {
       "id": "s-references-36-4",
       "original": "Hannun, “Self-training for end-to-end speech recognition,” in ICASSP 2020-2020 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP)."
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
       "original": "IEEE, 2020, pp. 7084–7088."
      }
     ]
    },
    {
     "id": "p-references-38",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-38-1",
       "original": "[40] G."
      },
      {
       "id": "s-references-38-2",
       "original": "Synnaeve, Q."
      },
      {
       "id": "s-references-38-3",
       "original": "Xu, J."
      },
      {
       "id": "s-references-38-4",
       "original": "Kahn, T."
      },
      {
       "id": "s-references-38-5",
       "original": "Likhomanenko, E."
      },
      {
       "id": "s-references-38-6",
       "original": "Grave, V."
      },
      {
       "id": "s-references-38-7",
       "original": "Pratap, A."
      },
      {
       "id": "s-references-38-8",
       "original": "Sriram, V."
      },
      {
       "id": "s-references-38-9",
       "original": "Liptchinsky, and R."
      },
      {
       "id": "s-references-38-10",
       "original": "Collobert, “End-to-end asr: from supervised to semi-supervised learning with modern architectures,” in arXiv, 2019."
      }
     ]
    },
    {
     "id": "p-references-39",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-39-1",
       "original": "[41] S."
      },
      {
       "id": "s-references-39-2",
       "original": "H."
      },
      {
       "id": "s-references-39-3",
       "original": "K."
      },
      {
       "id": "s-references-39-4",
       "original": "Parthasarathi and N."
      },
      {
       "id": "s-references-39-5",
       "original": "Strom, “Lessons from building acoustic models with a million hours of speech,” in ICASSP 2019-2019 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP)."
      }
     ]
    },
    {
     "id": "p-references-40",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-40-1",
       "original": "[42] W.-N."
      },
      {
       "id": "s-references-40-2",
       "original": "Hsu, A."
      },
      {
       "id": "s-references-40-3",
       "original": "Lee, G."
      },
      {
       "id": "s-references-40-4",
       "original": "Synnaeve, and A."
      },
      {
       "id": "s-references-40-5",
       "original": "Hannun, “Semi-supervised speech recognition via local prior matching,” arXiv preprint arXiv:2002.10336, 2020."
      }
     ]
    },
    {
     "id": "p-references-41",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-41-1",
       "original": "[43] Q."
      },
      {
       "id": "s-references-41-2",
       "original": "Xu, T."
      },
      {
       "id": "s-references-41-3",
       "original": "Likhomanenko, J."
      },
      {
       "id": "s-references-41-4",
       "original": "Kahn, A."
      },
      {
       "id": "s-references-41-5",
       "original": "Hannun, G."
      },
      {
       "id": "s-references-41-6",
       "original": "Synnaeve, and R."
      },
      {
       "id": "s-references-41-7",
       "original": "Collobert, “Iterative pseudo-labeling for speech recognition,” arXiv preprint arXiv:2005.09267, 2020."
      }
     ]
    },
    {
     "id": "p-references-42",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-42-1",
       "original": "[44] Z."
      },
      {
       "id": "s-references-42-2",
       "original": "Chen, A."
      },
      {
       "id": "s-references-42-3",
       "original": "Rosenberg, Y."
      },
      {
       "id": "s-references-42-4",
       "original": "Zhang, H."
      },
      {
       "id": "s-references-42-5",
       "original": "Zen, M."
      },
      {
       "id": "s-references-42-6",
       "original": "Ghodsi, Y."
      },
      {
       "id": "s-references-42-7",
       "original": "Huang, J."
      },
      {
       "id": "s-references-42-8",
       "original": "Emond, G."
      },
      {
       "id": "s-references-42-9",
       "original": "Wang, B."
      },
      {
       "id": "s-references-42-10",
       "original": "Ramabhadran, and P."
      },
      {
       "id": "s-references-42-11",
       "original": "J."
      },
      {
       "id": "s-references-42-12",
       "original": "Moreno, “Semi-Supervision in ASR: Sequential MixMatch and Factorized TTS-Based Augmentation,” in Proc."
      },
      {
       "id": "s-references-42-13",
       "original": "Interspeech 2021, 2021, pp. 736–740."
      }
     ]
    },
    {
     "id": "p-references-43",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-43-1",
       "original": "[45] A."
      },
      {
       "id": "s-references-43-2",
       "original": "Renduchintala, S."
      },
      {
       "id": "s-references-43-3",
       "original": "Ding, M."
      },
      {
       "id": "s-references-43-4",
       "original": "Wiesner, and S."
      },
      {
       "id": "s-references-43-5",
       "original": "Watanabe, “Multi-modal data augmentation for end-to-end asr,” arXiv preprint arXiv:1803.10299, 2018."
      }
     ]
    },
    {
     "id": "p-references-44",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-44-1",
       "original": "[46] A."
      },
      {
       "id": "s-references-44-2",
       "original": "Bapna, Y.-a."
      },
      {
       "id": "s-references-44-3",
       "original": "Chung, N."
      },
      {
       "id": "s-references-44-4",
       "original": "Wu, A."
      },
      {
       "id": "s-references-44-5",
       "original": "Gulati, Y."
      },
      {
       "id": "s-references-44-6",
       "original": "Jia, J."
      },
      {
       "id": "s-references-44-7",
       "original": "H."
      },
      {
       "id": "s-references-44-8",
       "original": "Clark, M."
      },
      {
       "id": "s-references-44-9",
       "original": "Johnson, J."
      },
      {
       "id": "s-references-44-10",
       "original": "Riesa, A."
      },
      {
       "id": "s-references-44-11",
       "original": "Conneau, and Y."
      },
      {
       "id": "s-references-44-12",
       "original": "Zhang, “Slam: A unified encoder for speech and language modeling via speech-text joint pre-training,” arXiv preprint arXiv:2110.10329, 2021."
      }
     ]
    },
    {
     "id": "p-references-45",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-45-1",
       "original": "[47] S."
      },
      {
       "id": "s-references-45-2",
       "original": "Thomas, B."
      },
      {
       "id": "s-references-45-3",
       "original": "Kingsbury, G."
      },
      {
       "id": "s-references-45-4",
       "original": "Saon, and H.-K."
      },
      {
       "id": "s-references-45-5",
       "original": "J."
      },
      {
       "id": "s-references-45-6",
       "original": "Kuo, “Integrating text inputs for training and adapting rnn transducer asr models,” in ICASSP 2022-2022 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP), 2022, pp. 8127–8131."
      }
     ]
    },
    {
     "id": "p-references-46",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-46-1",
       "original": "[48] Y."
      },
      {
       "id": "s-references-46-2",
       "original": "Cheng, Y."
      },
      {
       "id": "s-references-46-3",
       "original": "Zhang, M."
      },
      {
       "id": "s-references-46-4",
       "original": "Johnson, W."
      },
      {
       "id": "s-references-46-5",
       "original": "Macherey, and A."
      },
      {
       "id": "s-references-46-6",
       "original": "Bapna, “Mu2slam: Multitask, multilingual speech and language models,” arXiv preprint arXiv:2212.09553, 2022."
      }
     ]
    },
    {
     "id": "p-references-47",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-references-47-1",
       "original": "[49] Z.-H."
      },
      {
       "id": "s-references-47-2",
       "original": "Zhang, L."
      },
      {
       "id": "s-references-47-3",
       "original": "Zhou, J."
      },
      {
       "id": "s-references-47-4",
       "original": "Ao, S."
      },
      {
       "id": "s-references-47-5",
       "original": "Liu, L."
      },
      {
       "id": "s-references-47-6",
       "original": "Dai, J."
      },
      {
       "id": "s-references-47-7",
       "original": "Li, and F."
      },
      {
       "id": "s-references-47-8",
       "original": "Wei, “Speechut: Bridging speech and text with hidden-unit for encoder-decoder based speech-text pre-training,” in Conference on Empirical Methods in Natural Language Processing, 2022."
      }
     ]
    },
    {
     "id": "p-references-48",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-references-48-1",
       "original": "[50] Z.-H."
      },
      {
       "id": "s-references-48-2",
       "original": "Zhang, S."
      },
      {
       "id": "s-references-48-3",
       "original": "Chen, L."
      },
      {
       "id": "s-references-48-4",
       "original": "Zhou, Y."
      },
      {
       "id": "s-references-48-5",
       "original": "Wu, S."
      },
      {
       "id": "s-references-48-6",
       "original": "Ren, S."
      },
      {
       "id": "s-references-48-7",
       "original": "Liu, Z."
      },
      {
       "id": "s-references-48-8",
       "original": "Yao, X."
      },
      {
       "id": "s-references-48-9",
       "original": "Gong, L."
      },
      {
       "id": "s-references-48-10",
       "original": "Dai, J."
      },
      {
       "id": "s-references-48-11",
       "original": "Li, and F."
      },
      {
       "id": "s-references-48-12",
       "original": "Wei, “Speechlm: Enhanced speech pre-training with unpaired textual data,” ArXiv, vol. abs/2209.15329, 2022."
      }
     ]
    },
    {
     "id": "p-references-49",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-references-49-1",
       "original": "[51] S."
      },
      {
       "id": "s-references-49-2",
       "original": "Khurana, A."
      },
      {
       "id": "s-references-49-3",
       "original": "Laurent, and J."
      },
      {
       "id": "s-references-49-4",
       "original": "R."
      },
      {
       "id": "s-references-49-5",
       "original": "Glass, “Samu-xlsr: Semantically-aligned multimodal utterance-level cross-lingual speech representation,” IEEE Journal of Selected Topics in Signal Processing, vol. 16, pp."
      }
     ]
    },
    {
     "id": "p-references-50",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-references-50-1",
       "original": "1493–1504, 2022."
      }
     ]
    },
    {
     "id": "p-references-51",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-references-51-1",
       "original": "[52] X."
      },
      {
       "id": "s-references-51-2",
       "original": "Zhou, J."
      },
      {
       "id": "s-references-51-3",
       "original": "Wang, Z."
      },
      {
       "id": "s-references-51-4",
       "original": "Cui, S."
      },
      {
       "id": "s-references-51-5",
       "original": "Zhang, Z."
      },
      {
       "id": "s-references-51-6",
       "original": "Yan, J."
      },
      {
       "id": "s-references-51-7",
       "original": "Zhou, and C."
      },
      {
       "id": "s-references-51-8",
       "original": "Zhou, “Mmspeech: Multi-modal multi-task encoder-decoder pre-training for speech recognition,” ArXiv, vol. abs/2212.00500, 2022."
      }
     ]
    },
    {
     "id": "p-references-52",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-references-52-1",
       "original": "[53] T."
      },
      {
       "id": "s-references-52-2",
       "original": "N."
      },
      {
       "id": "s-references-52-3",
       "original": "Sainath, R."
      },
      {
       "id": "s-references-52-4",
       "original": "Prabhavalkar, A."
      },
      {
       "id": "s-references-52-5",
       "original": "Bapna, Y."
      },
      {
       "id": "s-references-52-6",
       "original": "Zhang, Z."
      },
      {
       "id": "s-references-52-7",
       "original": "Huo, Z."
      },
      {
       "id": "s-references-52-8",
       "original": "Chen, B."
      },
      {
       "id": "s-references-52-9",
       "original": "Li, W."
      },
      {
       "id": "s-references-52-10",
       "original": "Wang, and T."
      },
      {
       "id": "s-references-52-11",
       "original": "Strohman, “Joist: A joint speech and text streaming model for asr,” in 2022 IEEE Spoken Language Technology Workshop (SLT)."
      }
     ]
    },
    {
     "id": "p-references-53",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-references-53-1",
       "original": "[54] Z."
      },
      {
       "id": "s-references-53-2",
       "original": "Meng, W."
      },
      {
       "id": "s-references-53-3",
       "original": "Wang, R."
      },
      {
       "id": "s-references-53-4",
       "original": "Prabhavalkar, T."
      },
      {
       "id": "s-references-53-5",
       "original": "N."
      },
      {
       "id": "s-references-53-6",
       "original": "Sainath, T."
      },
      {
       "id": "s-references-53-7",
       "original": "Chen, E."
      },
      {
       "id": "s-references-53-8",
       "original": "Variani, Y."
      },
      {
       "id": "s-references-53-9",
       "original": "Zhang, B."
      },
      {
       "id": "s-references-53-10",
       "original": "Li, A."
      },
      {
       "id": "s-references-53-11",
       "original": "Rosenberg, and B."
      },
      {
       "id": "s-references-53-12",
       "original": "Ramabhadran, “Jeit: Joint end-to-end model and internal language model training for speech recognition,” in ICASSP, 2023, 2023."
      }
     ]
    },
    {
     "id": "p-references-54",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-references-54-1",
       "original": "[55] Z."
      },
      {
       "id": "s-references-54-2",
       "original": "Meng, T."
      },
      {
       "id": "s-references-54-3",
       "original": "Chen, R."
      },
      {
       "id": "s-references-54-4",
       "original": "Prabhavalkar, Y."
      },
      {
       "id": "s-references-54-5",
       "original": "Zhang, G."
      },
      {
       "id": "s-references-54-6",
       "original": "Wang, K."
      },
      {
       "id": "s-references-54-7",
       "original": "Audhkhasi, J."
      },
      {
       "id": "s-references-54-8",
       "original": "Emond, T."
      },
      {
       "id": "s-references-54-9",
       "original": "Strohman, B."
      },
      {
       "id": "s-references-54-10",
       "original": "Ramabhadran, W."
      },
      {
       "id": "s-references-54-11",
       "original": "R."
      },
      {
       "id": "s-references-54-12",
       "original": "Huang et al., “Modular hybrid autoregressive transducer,” in 2022 IEEE Spoken Language Technology Workshop (SLT)."
      }
     ]
    },
    {
     "id": "p-references-55",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-references-55-1",
       "original": "[56] C.-C."
      },
      {
       "id": "s-references-55-2",
       "original": "Chiu, W."
      },
      {
       "id": "s-references-55-3",
       "original": "Han, Y."
      },
      {
       "id": "s-references-55-4",
       "original": "Zhang, R."
      },
      {
       "id": "s-references-55-5",
       "original": "Pang, S."
      },
      {
       "id": "s-references-55-6",
       "original": "Kishchenko, P."
      },
      {
       "id": "s-references-55-7",
       "original": "Nguyen, A."
      },
      {
       "id": "s-references-55-8",
       "original": "Narayanan, H."
      },
      {
       "id": "s-references-55-9",
       "original": "Liao, S."
      },
      {
       "id": "s-references-55-10",
       "original": "Zhang, A."
      },
      {
       "id": "s-references-55-11",
       "original": "Kannan et al., “A comparison of end-to-end models for long-form speech recognition,” in 2019 IEEE automatic speech recognition and understanding workshop (ASRU)."
      }
     ]
    },
    {
     "id": "p-references-56",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-references-56-1",
       "original": "[57] Z."
      },
      {
       "id": "s-references-56-2",
       "original": "Lu, Y."
      },
      {
       "id": "s-references-56-3",
       "original": "Pan, T."
      },
      {
       "id": "s-references-56-4",
       "original": "Doutre, P."
      },
      {
       "id": "s-references-56-5",
       "original": "Haghani, L."
      },
      {
       "id": "s-references-56-6",
       "original": "Cao, R."
      },
      {
       "id": "s-references-56-7",
       "original": "Prabhavalkar, C."
      },
      {
       "id": "s-references-56-8",
       "original": "Zhang, and T."
      },
      {
       "id": "s-references-56-9",
       "original": "Strohman, “Input length matters: Improving rnn-t and mwer training for long-form telephony speech recognition,” arXiv preprint [58] Z."
      },
      {
       "id": "s-references-56-10",
       "original": "Dai, Z."
      },
      {
       "id": "s-references-56-11",
       "original": "Yang, Y."
      },
      {
       "id": "s-references-56-12",
       "original": "Yang, J."
      },
      {
       "id": "s-references-56-13",
       "original": "Carbonell, Q."
      },
      {
       "id": "s-references-56-14",
       "original": "V."
      },
      {
       "id": "s-references-56-15",
       "original": "Le, and R."
      },
      {
       "id": "s-references-56-16",
       "original": "Salakhutdinov, “Transformer-xl: Attentive language models beyond a fixed-length context,” arXiv preprint arXiv:1901.02860, 2019."
      }
     ]
    },
    {
     "id": "p-references-57",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-references-57-1",
       "original": "[59] A."
      },
      {
       "id": "s-references-57-2",
       "original": "Graves, “Sequence transduction with recurrent neural networks,” arXiv preprint arXiv:1211.3711, 2012."
      }
     ]
    },
    {
     "id": "p-references-58",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-references-58-1",
       "original": "[60] C."
      },
      {
       "id": "s-references-58-2",
       "original": "Raffel, N."
      },
      {
       "id": "s-references-58-3",
       "original": "Shazeer, A."
      },
      {
       "id": "s-references-58-4",
       "original": "Roberts, K."
      },
      {
       "id": "s-references-58-5",
       "original": "Lee, S."
      },
      {
       "id": "s-references-58-6",
       "original": "Narang, M."
      },
      {
       "id": "s-references-58-7",
       "original": "Matena, Y."
      },
      {
       "id": "s-references-58-8",
       "original": "Zhou, W."
      },
      {
       "id": "s-references-58-9",
       "original": "Li, and P."
      },
      {
       "id": "s-references-58-10",
       "original": "J."
      },
      {
       "id": "s-references-58-11",
       "original": "Liu, “Exploring the limits of transfer learning with a unified text-to-text transformer,” The Journal of Machine Learning Research, vol. 21, no. 1, pp. 5485–5551, 2020."
      }
     ]
    },
    {
     "id": "p-references-59",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-references-59-1",
       "original": "[61] B."
      },
      {
       "id": "s-references-59-2",
       "original": "Ramabhadran, K."
      },
      {
       "id": "s-references-59-3",
       "original": "Audhkhasi, P."
      },
      {
       "id": "s-references-59-4",
       "original": "J."
      },
      {
       "id": "s-references-59-5",
       "original": "M."
      },
      {
       "id": "s-references-59-6",
       "original": "Mengibar, and T."
      },
      {
       "id": "s-references-59-7",
       "original": "Chen, “Mixture model attention: Flexible streaming and non-streaming automatic speech recognition,” in Proceedings of Interspeech, 2021, 2021."
      }
     ]
    },
    {
     "id": "p-references-60",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-references-60-1",
       "original": "[62] L."
      },
      {
       "id": "s-references-60-2",
       "original": "Lu, C."
      },
      {
       "id": "s-references-60-3",
       "original": "Liu, J."
      },
      {
       "id": "s-references-60-4",
       "original": "Li, and Y."
      },
      {
       "id": "s-references-60-5",
       "original": "Gong, “Exploring transformers for large-scale speech recognition,” arXiv preprint arXiv:2005.09684, 2020."
      }
     ]
    },
    {
     "id": "p-references-61",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-references-61-1",
       "original": "[63] X."
      },
      {
       "id": "s-references-61-2",
       "original": "Chen, Y."
      },
      {
       "id": "s-references-61-3",
       "original": "Wu, Z."
      },
      {
       "id": "s-references-61-4",
       "original": "Wang, S."
      },
      {
       "id": "s-references-61-5",
       "original": "Liu, and J."
      },
      {
       "id": "s-references-61-6",
       "original": "Li, “Developing real-time streaming transformer transducer for speech recognition on large-scale dataset,” in International Conference on Acoustics, Speech and Signal Processing (ICASSP), 2021, pp. 5904–5908."
      }
     ]
    },
    {
     "id": "p-references-62",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-references-62-1",
       "original": "[64] C."
      },
      {
       "id": "s-references-62-2",
       "original": "Wu, Y."
      },
      {
       "id": "s-references-62-3",
       "original": "Wang, Y."
      },
      {
       "id": "s-references-62-4",
       "original": "Shi, C.-F."
      },
      {
       "id": "s-references-62-5",
       "original": "Yeh, and F."
      },
      {
       "id": "s-references-62-6",
       "original": "Zhang, “Streaming transformer-based acoustic models using self-attention with augmented memory,” arXiv preprint arXiv:2005.08042, 2020."
      }
     ]
    },
    {
     "id": "p-references-63",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-references-63-1",
       "original": "[65] Y."
      },
      {
       "id": "s-references-63-2",
       "original": "Shi, Y."
      },
      {
       "id": "s-references-63-3",
       "original": "Wang, C."
      },
      {
       "id": "s-references-63-4",
       "original": "Wu, C.-F."
      },
      {
       "id": "s-references-63-5",
       "original": "Yeh, J."
      },
      {
       "id": "s-references-63-6",
       "original": "Chan, F."
      },
      {
       "id": "s-references-63-7",
       "original": "Zhang, D."
      },
      {
       "id": "s-references-63-8",
       "original": "Le, and M."
      },
      {
       "id": "s-references-63-9",
       "original": "Seltzer, “Emformer: Efficient memory transformer based acoustic model for low latency streaming speech recognition,” in International Conference on Acoustics, Speech and Signal Processing (ICASSP)."
      }
     ]
    },
    {
     "id": "p-references-64",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-references-64-1",
       "original": "[66] E."
      },
      {
       "id": "s-references-64-2",
       "original": "Tsunoo, Y."
      },
      {
       "id": "s-references-64-3",
       "original": "Kashiwagi, T."
      },
      {
       "id": "s-references-64-4",
       "original": "Kumakura, and S."
      },
      {
       "id": "s-references-64-5",
       "original": "Watanabe, “Transformer asr with contextual block processing,” in 2019 IEEE Automatic Speech Recognition and Understanding Workshop (ASRU)."
      }
     ]
    },
    {
     "id": "p-references-65",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-references-65-1",
       "original": "IEEE, 2019, pp. 427–433."
      }
     ]
    },
    {
     "id": "p-references-66",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-references-66-1",
       "original": "[67] Z."
      },
      {
       "id": "s-references-66-2",
       "original": "Chen, A."
      },
      {
       "id": "s-references-66-3",
       "original": "Bapna, A."
      },
      {
       "id": "s-references-66-4",
       "original": "Rosenberg, Y."
      },
      {
       "id": "s-references-66-5",
       "original": "Zhang, B."
      },
      {
       "id": "s-references-66-6",
       "original": "Ramabhadran, P."
      },
      {
       "id": "s-references-66-7",
       "original": "Moreno, and N."
      },
      {
       "id": "s-references-66-8",
       "original": "Chen, “Maestrou: Leveraging joint speech-text representation learning for zero supervised speech asr,” arXiv preprint [68] F."
      },
      {
       "id": "s-references-66-9",
       "original": "Biadsy, Y."
      },
      {
       "id": "s-references-66-10",
       "original": "Chen, X."
      },
      {
       "id": "s-references-66-11",
       "original": "Zhang, O."
      },
      {
       "id": "s-references-66-12",
       "original": "Rybakov, A."
      },
      {
       "id": "s-references-66-13",
       "original": "Rosenberg, and P."
      },
      {
       "id": "s-references-66-14",
       "original": "J."
      },
      {
       "id": "s-references-66-15",
       "original": "Moreno, “A scalable model specialization framework for training and inference using submodels and its application to speech model personalization,” in Proc."
      },
      {
       "id": "s-references-66-16",
       "original": "Interspeech 2022."
      }
     ]
    },
    {
     "id": "p-references-67",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-references-67-1",
       "original": "ISCA, 2022, pp. 5125–5129."
      }
     ]
    },
    {
     "id": "p-references-68",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-references-68-1",
       "original": "[69] K."
      },
      {
       "id": "s-references-68-2",
       "original": "Tomanek, V."
      },
      {
       "id": "s-references-68-3",
       "original": "Zayats, D."
      },
      {
       "id": "s-references-68-4",
       "original": "Padfield, K."
      },
      {
       "id": "s-references-68-5",
       "original": "Vaillancourt, and F."
      },
      {
       "id": "s-references-68-6",
       "original": "Biadsy, “Residual adapters for parameterefficient asr adaptation to atypical and accented speech,” in Proceedings of the 2021 Conference on Empirical Methods in Natural Language Processing, 2021, pp. 6751–6760."
      }
     ]
    },
    {
     "id": "p-references-69",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-references-69-1",
       "original": "[70] M."
      },
      {
       "id": "s-references-69-2",
       "original": "Schuster and K."
      },
      {
       "id": "s-references-69-3",
       "original": "Nakajima, “Japanese and korean voice search,” in 2012 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP)."
      }
     ]
    },
    {
     "id": "p-references-70",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-references-70-1",
       "original": "[71] Y."
      },
      {
       "id": "s-references-70-2",
       "original": "Zhang, J."
      },
      {
       "id": "s-references-70-3",
       "original": "Qin, D."
      },
      {
       "id": "s-references-70-4",
       "original": "S."
      },
      {
       "id": "s-references-70-5",
       "original": "Park, W."
      },
      {
       "id": "s-references-70-6",
       "original": "Han, C.-C."
      },
      {
       "id": "s-references-70-7",
       "original": "Chiu, R."
      },
      {
       "id": "s-references-70-8",
       "original": "Pang, Q."
      },
      {
       "id": "s-references-70-9",
       "original": "V."
      },
      {
       "id": "s-references-70-10",
       "original": "Le, and Y."
      },
      {
       "id": "s-references-70-11",
       "original": "Wu, “Pushing the limits of semi-supervised learning for automatic speech recognition,” arXiv preprint arXiv:2010.10504, 2020."
      }
     ]
    },
    {
     "id": "p-references-71",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-references-71-1",
       "original": "[72] D."
      },
      {
       "id": "s-references-71-2",
       "original": "Lepikhin, H."
      },
      {
       "id": "s-references-71-3",
       "original": "Lee, Y."
      },
      {
       "id": "s-references-71-4",
       "original": "Xu, D."
      },
      {
       "id": "s-references-71-5",
       "original": "Chen, O."
      },
      {
       "id": "s-references-71-6",
       "original": "Firat, Y."
      },
      {
       "id": "s-references-71-7",
       "original": "Huang, M."
      },
      {
       "id": "s-references-71-8",
       "original": "Krikun, N."
      },
      {
       "id": "s-references-71-9",
       "original": "Shazeer, and Z."
      },
      {
       "id": "s-references-71-10",
       "original": "Chen, “GShard: Scaling giant models with conditional computation and automatic sharding,” CoRR, vol. abs/2006.16668, 2020."
      },
      {
       "id": "s-references-71-11",
       "original": "[Online]."
      },
      {
       "id": "s-references-71-12",
       "original": "Available: https://arxiv.org/abs/2006.16668 [73] Y."
      },
      {
       "id": "s-references-71-13",
       "original": "Xu, H."
      },
      {
       "id": "s-references-71-14",
       "original": "Lee, D."
      },
      {
       "id": "s-references-71-15",
       "original": "Chen, B."
      },
      {
       "id": "s-references-71-16",
       "original": "A."
      },
      {
       "id": "s-references-71-17",
       "original": "Hechtman, Y."
      },
      {
       "id": "s-references-71-18",
       "original": "Huang, R."
      },
      {
       "id": "s-references-71-19",
       "original": "Joshi, M."
      },
      {
       "id": "s-references-71-20",
       "original": "Krikun, D."
      },
      {
       "id": "s-references-71-21",
       "original": "Lepikhin, A."
      },
      {
       "id": "s-references-71-22",
       "original": "Ly, M."
      },
      {
       "id": "s-references-71-23",
       "original": "Maggioni, R."
      },
      {
       "id": "s-references-71-24",
       "original": "Pang, N."
      },
      {
       "id": "s-references-71-25",
       "original": "Shazeer, S."
      },
      {
       "id": "s-references-71-26",
       "original": "Wang, T."
      },
      {
       "id": "s-references-71-27",
       "original": "Wang, Y."
      },
      {
       "id": "s-references-71-28",
       "original": "Wu, and Z."
      },
      {
       "id": "s-references-71-29",
       "original": "Chen, “GSPMD: general and scalable parallelization for ML computation graphs,” CoRR, vol. abs/2105.04663, 2021."
      },
      {
       "id": "s-references-71-30",
       "original": "[Online]."
      },
      {
       "id": "s-references-71-31",
       "original": "Available: https://arxiv.org/abs/2105.04663 [74] C."
      },
      {
       "id": "s-references-71-32",
       "original": "Wang, M."
      },
      {
       "id": "s-references-71-33",
       "original": "Rivière, A."
      },
      {
       "id": "s-references-71-34",
       "original": "Lee, A."
      },
      {
       "id": "s-references-71-35",
       "original": "Wu, C."
      },
      {
       "id": "s-references-71-36",
       "original": "Talnikar, D."
      },
      {
       "id": "s-references-71-37",
       "original": "Haziza, M."
      },
      {
       "id": "s-references-71-38",
       "original": "Williamson, J."
      },
      {
       "id": "s-references-71-39",
       "original": "Pino, and E."
      },
      {
       "id": "s-references-71-40",
       "original": "Dupoux, “Voxpopuli: A large-scale multilingual speech corpus for representation learning, semi-supervised learning and interpretation,” arXiv preprint arXiv:2101.00390, 2021."
      }
     ]
    },
    {
     "id": "p-references-72",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-references-72-1",
       "original": "[75] R."
      },
      {
       "id": "s-references-72-2",
       "original": "Ardila, M."
      },
      {
       "id": "s-references-72-3",
       "original": "Branson, K."
      },
      {
       "id": "s-references-72-4",
       "original": "Davis, M."
      },
      {
       "id": "s-references-72-5",
       "original": "Henretty, M."
      },
      {
       "id": "s-references-72-6",
       "original": "Kohler, J."
      },
      {
       "id": "s-references-72-7",
       "original": "Meyer, R."
      },
      {
       "id": "s-references-72-8",
       "original": "Morais, L."
      },
      {
       "id": "s-references-72-9",
       "original": "Saunders, F."
      },
      {
       "id": "s-references-72-10",
       "original": "M."
      },
      {
       "id": "s-references-72-11",
       "original": "Tyers, and G."
      },
      {
       "id": "s-references-72-12",
       "original": "Weber, “Common voice: A massively-multilingual speech corpus,” arXiv preprint arXiv:1912.06670, 2019."
      }
     ]
    },
    {
     "id": "p-references-73",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-references-73-1",
       "original": "[76] V."
      },
      {
       "id": "s-references-73-2",
       "original": "Pratap, Q."
      },
      {
       "id": "s-references-73-3",
       "original": "Xu, A."
      },
      {
       "id": "s-references-73-4",
       "original": "Sriram, G."
      },
      {
       "id": "s-references-73-5",
       "original": "Synnaeve, and R."
      },
      {
       "id": "s-references-73-6",
       "original": "Collobert, “Mls: A large-scale multilingual dataset for speech research,” arXiv preprint arXiv:2012.03411, 2020."
      }
     ]
    },
    {
     "id": "p-references-74",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-references-74-1",
       "original": "[77] M."
      },
      {
       "id": "s-references-74-2",
       "original": "J."
      },
      {
       "id": "s-references-74-3",
       "original": "F."
      },
      {
       "id": "s-references-74-4",
       "original": "Gales, K."
      },
      {
       "id": "s-references-74-5",
       "original": "Knill, A."
      },
      {
       "id": "s-references-74-6",
       "original": "Ragni, and S."
      },
      {
       "id": "s-references-74-7",
       "original": "P."
      },
      {
       "id": "s-references-74-8",
       "original": "Rath, “Speech recognition and keyword spotting for lowresource languages: Babel project research at cued,” in SLTU, 2014."
      }
     ]
    },
    {
     "id": "p-references-75",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-references-75-1",
       "original": "[78] A."
      },
      {
       "id": "s-references-75-2",
       "original": "Bapna, I."
      },
      {
       "id": "s-references-75-3",
       "original": "Caswell, J."
      },
      {
       "id": "s-references-75-4",
       "original": "Kreutzer, O."
      },
      {
       "id": "s-references-75-5",
       "original": "Firat, D. van Esch, A."
      },
      {
       "id": "s-references-75-6",
       "original": "Siddhant, M."
      },
      {
       "id": "s-references-75-7",
       "original": "Niu, P."
      },
      {
       "id": "s-references-75-8",
       "original": "Baljekar, X."
      },
      {
       "id": "s-references-75-9",
       "original": "Garcia, W."
      },
      {
       "id": "s-references-75-10",
       "original": "Macherey et al., “Building machine translation systems for the next thousand languages,” arXiv preprint [79] N."
      },
      {
       "id": "s-references-75-11",
       "original": "Arivazhagan, A."
      },
      {
       "id": "s-references-75-12",
       "original": "Bapna, O."
      },
      {
       "id": "s-references-75-13",
       "original": "Firat, D."
      },
      {
       "id": "s-references-75-14",
       "original": "Lepikhin, M."
      },
      {
       "id": "s-references-75-15",
       "original": "Johnson, M."
      },
      {
       "id": "s-references-75-16",
       "original": "Krikun, M."
      },
      {
       "id": "s-references-75-17",
       "original": "X."
      },
      {
       "id": "s-references-75-18",
       "original": "Chen, Y."
      },
      {
       "id": "s-references-75-19",
       "original": "Cao, G."
      },
      {
       "id": "s-references-75-20",
       "original": "Foster, C."
      },
      {
       "id": "s-references-75-21",
       "original": "Cherry et al., “Massively multilingual neural machine translation in the wild: Findings and challenges,” arXiv preprint arXiv:1907.05019, 2019."
      }
     ]
    },
    {
     "id": "p-references-76",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-references-76-1",
       "original": "[80] J."
      },
      {
       "id": "s-references-76-2",
       "original": "Carletta, S."
      },
      {
       "id": "s-references-76-3",
       "original": "Ashby, S."
      },
      {
       "id": "s-references-76-4",
       "original": "Bourban, M."
      },
      {
       "id": "s-references-76-5",
       "original": "Flynn, M."
      },
      {
       "id": "s-references-76-6",
       "original": "Guillemot, T."
      },
      {
       "id": "s-references-76-7",
       "original": "Hain, J."
      },
      {
       "id": "s-references-76-8",
       "original": "Kadlec, V."
      },
      {
       "id": "s-references-76-9",
       "original": "Karaiskos, W."
      },
      {
       "id": "s-references-76-10",
       "original": "Kraaij, M."
      },
      {
       "id": "s-references-76-11",
       "original": "Kronenthal et al., “The ami meeting corpus: A pre-announcement,” in International workshop on machine learning for multimodal interaction."
      }
     ]
    },
    {
     "id": "p-references-77",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-references-77-1",
       "original": "Springer, 2005, pp. 28–39."
      }
     ]
    },
    {
     "id": "p-references-78",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-references-78-1",
       "original": "[81] R."
      },
      {
       "id": "s-references-78-2",
       "original": "Ardila, M."
      },
      {
       "id": "s-references-78-3",
       "original": "Branson, K."
      },
      {
       "id": "s-references-78-4",
       "original": "Davis, M."
      },
      {
       "id": "s-references-78-5",
       "original": "Henretty, M."
      },
      {
       "id": "s-references-78-6",
       "original": "Kohler, J."
      },
      {
       "id": "s-references-78-7",
       "original": "Meyer, R."
      },
      {
       "id": "s-references-78-8",
       "original": "Morais, L."
      },
      {
       "id": "s-references-78-9",
       "original": "Saunders, F."
      },
      {
       "id": "s-references-78-10",
       "original": "M."
      },
      {
       "id": "s-references-78-11",
       "original": "Tyers, and G."
      },
      {
       "id": "s-references-78-12",
       "original": "Weber, “Common voice: A massively-multilingual speech corpus,” arXiv preprint arXiv:1912.06670, 2019."
      }
     ]
    },
    {
     "id": "p-references-79",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-references-79-1",
       "original": "[82] V."
      },
      {
       "id": "s-references-79-2",
       "original": "Panayotov, G."
      },
      {
       "id": "s-references-79-3",
       "original": "Chen, D."
      },
      {
       "id": "s-references-79-4",
       "original": "Povey, and S."
      },
      {
       "id": "s-references-79-5",
       "original": "Khudanpur, “Librispeech: an asr corpus based on public domain audio books,” in 2015 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP)."
      }
     ]
    },
    {
     "id": "p-references-80",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-references-80-1",
       "original": "[83] A."
      },
      {
       "id": "s-references-80-2",
       "original": "Rousseau, P."
      },
      {
       "id": "s-references-80-3",
       "original": "Deléglise, and Y."
      },
      {
       "id": "s-references-80-4",
       "original": "Esteve, “Ted-lium: an automatic speech recognition dedicated corpus.”"
      }
     ]
    },
    {
     "id": "p-references-81",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-references-81-1",
       "original": "in LREC, 2012, pp. 125–129."
      }
     ]
    },
    {
     "id": "p-references-82",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-references-82-1",
       "original": "[84] F."
      },
      {
       "id": "s-references-82-2",
       "original": "Hernandez, V."
      },
      {
       "id": "s-references-82-3",
       "original": "Nguyen, S."
      },
      {
       "id": "s-references-82-4",
       "original": "Ghannay, N."
      },
      {
       "id": "s-references-82-5",
       "original": "Tomashenko, and Y."
      },
      {
       "id": "s-references-82-6",
       "original": "Esteve, “Ted-lium 3: twice as much data and corpus repartition for experiments on speaker adaptation,” in International conference on speech and computer."
      }
     ]
    },
    {
     "id": "p-references-83",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-references-83-1",
       "original": "Springer, 2018, pp. 198–208."
      }
     ]
    },
    {
     "id": "p-references-84",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-references-84-1",
       "original": "[85] J.-L."
      },
      {
       "id": "s-references-84-2",
       "original": "Gauvain, L."
      },
      {
       "id": "s-references-84-3",
       "original": "F."
      },
      {
       "id": "s-references-84-4",
       "original": "Lamel, G."
      },
      {
       "id": "s-references-84-5",
       "original": "Adda, and M."
      },
      {
       "id": "s-references-84-6",
       "original": "Adda-Decker, “The limsi continuous speech dictation system: evaluation on the arpa wall street journal task,” in Proceedings of ICASSP’94."
      },
      {
       "id": "s-references-84-7",
       "original": "IEEE International Conference on Acoustics, Speech and Signal Processing, vol. 1."
      }
     ]
    },
    {
     "id": "p-references-85",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-references-85-1",
       "original": "IEEE, 1994, pp. I–557."
      }
     ]
    },
    {
     "id": "p-references-86",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-references-86-1",
       "original": "[86] F."
      },
      {
       "id": "s-references-86-2",
       "original": "Kubala, J."
      },
      {
       "id": "s-references-86-3",
       "original": "Davenport, H."
      },
      {
       "id": "s-references-86-4",
       "original": "Jin, D."
      },
      {
       "id": "s-references-86-5",
       "original": "Liu, T."
      },
      {
       "id": "s-references-86-6",
       "original": "Leek, S."
      },
      {
       "id": "s-references-86-7",
       "original": "Matsoukas, D."
      },
      {
       "id": "s-references-86-8",
       "original": "Miller, L."
      },
      {
       "id": "s-references-86-9",
       "original": "Nguyen, F."
      },
      {
       "id": "s-references-86-10",
       "original": "Richardson, R."
      },
      {
       "id": "s-references-86-11",
       "original": "Schwartz et al., “The 1997 bbn byblos system applied to broadcast news transcription,” in Proc."
      },
      {
       "id": "s-references-86-12",
       "original": "DARPA Broadcast News Transcription and Understanding Workshop."
      }
     ]
    },
    {
     "id": "p-references-87",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-references-87-1",
       "original": "Morgan Kaufmann, 1998, pp. 35–40."
      }
     ]
    },
    {
     "id": "p-references-88",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-references-88-1",
       "original": "[87] S."
      },
      {
       "id": "s-references-88-2",
       "original": "Chen, M."
      },
      {
       "id": "s-references-88-3",
       "original": "Gales, P."
      },
      {
       "id": "s-references-88-4",
       "original": "Gopalakrishnan, R."
      },
      {
       "id": "s-references-88-5",
       "original": "Gopinath, H."
      },
      {
       "id": "s-references-88-6",
       "original": "Printz, D."
      },
      {
       "id": "s-references-88-7",
       "original": "Kanevsky, P."
      },
      {
       "id": "s-references-88-8",
       "original": "Olsen, and L."
      },
      {
       "id": "s-references-88-9",
       "original": "Polymenakos, “Ibm’s lvcsr system for transcription of broadcast news used in the 1997 hub4 english evaluation,” in Proceedings of the Speech Recognition Workshop."
      }
     ]
    },
    {
     "id": "p-references-89",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-references-89-1",
       "original": "Citeseer, 1998."
      }
     ]
    },
    {
     "id": "p-references-90",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-references-90-1",
       "original": "[88] N."
      },
      {
       "id": "s-references-90-2",
       "original": "P."
      },
      {
       "id": "s-references-90-3",
       "original": "Jouppi, D."
      },
      {
       "id": "s-references-90-4",
       "original": "H."
      },
      {
       "id": "s-references-90-5",
       "original": "Yoon, M."
      },
      {
       "id": "s-references-90-6",
       "original": "Ashcraft, M."
      },
      {
       "id": "s-references-90-7",
       "original": "Gottscho, T."
      },
      {
       "id": "s-references-90-8",
       "original": "B."
      },
      {
       "id": "s-references-90-9",
       "original": "Jablin, G."
      },
      {
       "id": "s-references-90-10",
       "original": "Kurian, J."
      },
      {
       "id": "s-references-90-11",
       "original": "Laudon, S."
      },
      {
       "id": "s-references-90-12",
       "original": "Li, P."
      },
      {
       "id": "s-references-90-13",
       "original": "Ma, X."
      },
      {
       "id": "s-references-90-14",
       "original": "Ma et al., “Ten lessons from three generations shaped google’s tpuv4i: Industrial product,” in 2021 ACM/IEEE 48th Annual International Symposium on Computer Architecture (ISCA)."
      }
     ]
    },
    {
     "id": "p-references-91",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-references-91-1",
       "original": "[89] B."
      },
      {
       "id": "s-references-91-2",
       "original": "Li, A."
      },
      {
       "id": "s-references-91-3",
       "original": "Gulati, J."
      },
      {
       "id": "s-references-91-4",
       "original": "Yu, T."
      },
      {
       "id": "s-references-91-5",
       "original": "N."
      },
      {
       "id": "s-references-91-6",
       "original": "Sainath, C.-C."
      },
      {
       "id": "s-references-91-7",
       "original": "Chiu, A."
      },
      {
       "id": "s-references-91-8",
       "original": "Narayanan, S.-Y."
      },
      {
       "id": "s-references-91-9",
       "original": "Chang, R."
      },
      {
       "id": "s-references-91-10",
       "original": "Pang, Y."
      },
      {
       "id": "s-references-91-11",
       "original": "He, J."
      },
      {
       "id": "s-references-91-12",
       "original": "Qin et al., “A better and faster end-to-end model for streaming asr,” in ICASSP 2021-2021 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP)."
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
    "sentence_id": "s-abstract-1-2",
    "quote": "12 million (M) hours spanning over 300 languages"
   },
   "kind": "number",
   "title": "12M 小时是什么量级",
   "explanation": "作为对比，Whisper 的弱监督训练集是 68 万小时，已被视为「暴力规模」；USM 的无标注预训练池又大了约 17 倍。关键点在于这 1200 万小时是无标注的——靠 YouTube 自动采集与语种识别过滤，绕开了人工转写瓶颈。论文的核心赌注正是：把 ASR 的数据瓶颈从「标注产能」转移到「采集与算力」，覆盖面才能推到 300+ 语言。",
   "featured": true
  },
  {
   "id": "ann-002",
   "anchor": {
    "sentence_id": "s-abstract-1-4",
    "quote": "1/7-th the size of that used for the Whisper model [1]"
   },
   "kind": "comparison",
   "title": "用 1/7 标注量打平 Whisper",
   "explanation": "Whisper 吃 68 万小时弱标注，USM 域内微调只用约 90k 小时监督数据却打平甚至反超，差距来自范式：Whisper 全部监督端到端，标签效率受限于标注总量；USM 先用 BEST-RQ 在 12M 无标注音频上把声学表征学成，监督数据只负责「对表」。这直接验证了「无标注数据做表征、小标注做适配」这条路线在多语言上的标签效率优势。",
   "featured": true
  },
  {
   "id": "ann-003",
   "anchor": {
    "sentence_id": "s-1-1-9-2",
    "quote": "Randomprojection Quantizer"
   },
   "kind": "concept",
   "title": "随机投影量化器",
   "explanation": "BEST-RQ 的离散化靠一个随机初始化、全程不训练的投影矩阵加码本，而不是 vq-wav2vec 那种可学习量化器。直觉是：预训练早期模型本身也做不出「好」的量化目标，随机投影反而提供了稳定、不坍缩的伪标签，让模型专注学表征。这省掉了量化器的调参成本，是 BEST-RQ 能轻松放大到 2B 参数、12M 小时数据的关键原因之一。"
  },
  {
   "id": "ann-004",
   "anchor": {
    "sentence_id": "s-2-2-3-4",
    "quote": "randomly initialized, frozen projection matrix"
   },
   "kind": "concept",
   "title": "冻结的随机矩阵为何不坍缩",
   "explanation": "掩码语音特征经冻结随机矩阵投影后，目标码本 ID 在整个训练中固定不变，不会随表征演化而漂移。这从根本上避免了 codebook collapse——可学码本常见的「所有向量挤到少数码字」病态，因为目标与模型输出之间不存在相互追逐的回路。工程上的收益是超参极少：矩阵维度、码本大小几乎免调，给后面 300 语言、2B 参数的放大扫清了障碍。"
  },
  {
   "id": "ann-005",
   "anchor": {
    "sentence_id": "s-2-2-4-2",
    "quote": "the learnt codebook module proves costly to tune"
   },
   "kind": "motivation",
   "title": "为什么放弃可学习码本",
   "explanation": "这句话是 BEST-RQ 相对 HuBERT / vq-wav2vec 的核心设计动机。可学习量化器引入额外损失、码本大小、EMA 更新等一组互相耦合的超参，在多语言、超大规模场景下调参成本被成倍放大——300 种语言的声学分布差异极大，单一码本很难同时适配。随机投影把这些自由度全部砍掉，换来的是「开箱即扩」的可扩展性。"
  },
  {
   "id": "ann-006",
   "anchor": {
    "sentence_id": "s-2-4-1-8",
    "quote": "longer than 327 seconds"
   },
   "kind": "concept",
   "title": "感受野失配 327 秒",
   "explanation": "USM 编码器层数堆深后，理论感受野超过 327 秒，但训练语料绝大多数是十几秒的短句。于是模型在 5 分钟以上的长音频上，被迫利用从未训练过的远程注意力模式，泛化瞬间崩塌——表现为大量删除与幻觉重复。这个「感受野 > 训练时长」的失配是所有基于全局注意力的长音频 ASR 的通病，也是本文引入分块注意力的直接动机。"
  },
  {
   "id": "ann-007",
   "anchor": {
    "sentence_id": "s-2-4-1-10",
    "quote": "suffer from high deletion errors"
   },
   "kind": "engineering",
   "title": "长音频删除错误的诊断",
   "explanation": "长音频上 LAS/听觉-注意力解码器最常见的失效不是替换，而是删除：注意力在长上下文中漂移，整段内容被跳过，WER 可爆到 100% 以上。论文在 Table 3 脚注里甚至为此排除 Whisper 在该集合上的短音频数字。识别这一失效模式很重要，因为它决定了修复方向——不是靠更强的语言模型补回来，而是从结构上限制注意力所能看到的范围（分块）。"
  },
  {
   "id": "ann-008",
   "anchor": {
    "sentence_id": "s-2-4-3-4",
    "quote": "an 8-second chunk"
   },
   "kind": "engineering",
   "title": "8 秒块长的选择",
   "explanation": "8 秒不是拍脑袋：它对应训练集中典型语句的时长分布，让每个注意力块看到的上下文与训练时一致，从根上消除长度失配。块太大会重新引入远程注意力的退化，块太小则割裂语义、影响识别质量。工程上 8 秒还能与流式推理的延迟预算对齐——同一个分块机制既服务离线长音频，也能平滑迁移到低延迟场景。"
  },
  {
   "id": "ann-009",
   "anchor": {
    "sentence_id": "s-2-4-4-5",
    "quote": "we only chunk the attention state, and allow the decoder to access the entire encoder output"
   },
   "kind": "comparison",
   "title": "分块注意力 vs 分块解码",
   "explanation": "Whisper 式分段解码把整段音频切成 30 秒窗口各自识别再拼接，段间无上下文，边界处易丢字、且语言模型看不到段外信息，幻觉风险高。USM 的分块注意力只在编码器注意力状态上切块，解码器仍能看到完整编码输出——全局语境不丢，只是编码器「看」的方式受控。这是两种范式在长音频上的本质差异，也是 USM-CTC/LAS 无幻觉的机制保证。",
   "featured": true
  },
  {
   "id": "ann-010",
   "anchor": {
    "sentence_id": "s-2-4-4-6",
    "quote": "neither of which have been observed to hallucinate"
   },
   "kind": "connection",
   "title": "CTC 为何不幻觉",
   "explanation": "CTC / RNN-T 的输出与输入帧有单调对齐约束，解码器无法凭空生成没有声学对应的内容，因此结构上免疫「编造型」幻觉；LAS 的注意力解码器则在长输入上容易自由发挥。这解释了 Table 3 中 USM-CTC 在长音频 YouTube 集上的压倒性优势。工程启示：对长音频、要求逐字可溯源的场景（会议纪要、字幕校对），带对齐约束的解码头是更稳的选择。"
  },
  {
   "id": "ann-011",
   "anchor": {
    "sentence_id": "s-2-5-10-4",
    "quote": "live in the same embedding space as masked speech features"
   },
   "kind": "concept",
   "title": "语音-文本共享嵌入空间",
   "explanation": "MOST 的关键技巧在于：注入的文本 token 不是单独一路输入，而是与被掩码的语音特征落入同一嵌入空间、走同一套预训练目标。这样文本在训练中就承担了「语音语义先验」的角色——模型学到的是跨模态对齐的表征，而不是两条平行通路。这解释了为何只在预训练后期加很少量的文本注入，就能在 FLEURS / CoVoST 上稳定涨点。"
  },
  {
   "id": "ann-012",
   "anchor": {
    "sentence_id": "s-2-6-1-3",
    "quote": "2% of the original pre-trained USM"
   },
   "kind": "engineering",
   "title": "2% 参数的残差适配器",
   "explanation": "对一个 2B 参数的冻结编码器，残差适配器只加约 2% 参数就能在新领域/新语言上拿到不错的下游效果，远低于全量微调的显存与存储成本。工程意义在于「一个底座、多个轻头」：300+ 语言各自存 2% 的适配器即可，不必为每语言保存全量模型副本。这是把大模型推向生产部署时极现实的权衡，Table 3 的 USM-M-adapter 行证明性能损失可控。"
  },
  {
   "id": "ann-013",
   "anchor": {
    "sentence_id": "s-2-7-3-3",
    "quote": "4096, 8192, and 1024"
   },
   "kind": "engineering",
   "title": "BEST-RQ 的码本规格",
   "explanation": "这组数字是默认配置：码本维度 4096、码本大小 8192、随机投影维度 1024。相对而言，Wav2Vec 2.0 常用 320 码本、HuBERT 常见 500 类聚类目标。USM 明显放大了离散化容量，以承载 300 语言的声学多样性；而随机投影免调参的特性，又让这些大规格超参不需要在各语言间重新搜索。提醒读者：论文一切 Table 结果都建立在这组默认值上，未做精细扫描。"
  },
  {
   "id": "ann-014",
   "anchor": {
    "sentence_id": "s-3-1-5-1",
    "quote": "513 tail languages"
   },
   "kind": "number",
   "title": "513 种长尾语言",
   "explanation": "论文把 YouTube 无标注池里识别出的语言剥去头部，剩下 513 种「长尾」——单语种数据量极少、覆盖极不均匀。这个数字说明语言覆盖的头部效应极其夸张：前几十种语言占绝大部分小时数，后面几百种加起来也只是零头。理解这一点才能看懂 USM 为何强调「通用预训练 + 小数据适配」——长尾语言永远等不到足量监督数据，只能靠共享表征。"
  },
  {
   "id": "ann-015",
   "anchor": {
    "sentence_id": "s-3-1-9-5",
    "quote": "188 languages with less than 100 hours"
   },
   "kind": "number",
   "title": "188 种语言不足 100 小时",
   "explanation": "即使在 Web-NTL / YT-NTL 这种巨型无标注池里，仍有 188 种语言的可用数据不足 100 小时——对端到端监督训练来说这是「不可用」量级，但对共享编码器却足够体现该语言的声学指纹。这组的尺度能直接指导生产决策：资源低于某阈值的语言，与其硬做监督训练，不如接入 USM 式底座做适配，标注预算花在伪标签质量上。",
   "featured": true
  },
  {
   "id": "ann-016",
   "anchor": {
    "sentence_id": "s-3-1-12-1",
    "quote": "excluded for training the generic USM-LAS/CTC models"
   },
   "kind": "engineering",
   "title": "为什么排除部分语言",
   "explanation": "不是所有 102 种 FLEURS 语言都进了通用 USM-LAS/CTC 的训练集——质量和语种识别置信度不达标的会被剔除。这提醒读者：「100+ 语言通用模型」背后并不是无脑堆料，而是有明确的数据准入门槛。工程上这是必要的妥协——低质量伪标签对共享编码器的伤害，往往大于少覆盖几种语言的损失；待后续 NST/适配器路线再补回长尾。"
  },
  {
   "id": "ann-017",
   "anchor": {
    "sentence_id": "s-4-1-2-1",
    "quote": "resulting in a WER exceeding 100%"
   },
   "kind": "critique",
   "title": "WER 超过 100% 意味着什么",
   "explanation": "WER = (替换+删除+插入)/参考词数，理论上无上限；超过 100% 几乎只可能是幻觉——模型生成了远多于参考文本的内容。论文用这个数字直接点破 Whisper 的长音频缺陷，并据此设计比较协议（排除 > 40% WER 的语言）以避免无意义对比。批判性在于：这暴露了「弱监督 + 全监督 seq2seq」范式在域外长音频上的结构性脆弱，不是再堆数据能修的。",
   "featured": true
  },
  {
   "id": "ann-018",
   "anchor": {
    "sentence_id": "s-4-1-3-1",
    "quote": "(3.5k hours versus Whisper’s 400k hours [1])"
   },
   "kind": "number",
   "title": "3.5k vs 400k 小时 en-US",
   "explanation": "在 en-US 单语上，USM 只用了 3.5k 小时监督数据，Whisper 用了 400k 小时（占其 68 万总量的大头），结果 USM 在长音频 YouTube 集上反超约 30% 相对 WER。差距不是模型魔法，而是范式：USM 的表征来自 12M 小时无标注多语言预训练，监督数据只做最后的对齐；Whisper 把所有表征学习都压在有标注数据上，标签效率差了不止一个数量级。",
   "featured": true
  },
  {
   "id": "ann-019",
   "anchor": {
    "sentence_id": "s-4-1-5-2",
    "quote": "outperform Whisper by 66% relative WER"
   },
   "kind": "number",
   "title": "FLEURS 上 66% 相对优势",
   "explanation": "在 FLEURS 62 种共有语言上，USM-LAS/CTC 的 WER 比 Whisper 低 66%（相对值），这是全文最有冲击力的单一数字之一。注意两点：一是它建立在仅 90k 小时多语言监督数据上（Whisper 是 117k）；二是 FLEURS 是 102 语言的平行朗读集，覆盖面广但域偏「干净朗读」。这个数字应读作「在受控、多语言、短句条件下的范式优势」，不能简单外推到嘈杂会议、长尾口音等真实场景。",
   "featured": true
  },
  {
   "id": "ann-020",
   "anchor": {
    "sentence_id": "s-4-5-1-3",
    "quote": "125k hours of supervised speech translation data compared to the 859 hours"
   },
   "kind": "number",
   "title": "CoVoST 859 小时对 125k",
   "explanation": "在 CoVoST 2 英→21 语 AST 上，先前排名的系统平均用了约 125k 小时监督翻译数据，USM 只靠 859 小时 CoVoST 训练集就拿到相当甚至更好的 BLEU。标签效率差了约两个数量级，根因在于 MOST 预训练已把语音-文本对齐学进了底座，下游任务只需「对表」。这提醒 AST 从业者：不要先堆翻译对，先确认底座里是否已有跨模态对齐的先验。",
   "featured": true
  },
  {
   "id": "ann-021",
   "anchor": {
    "sentence_id": "s-5-2-1-2",
    "quote": "approximately 500 hours of speech"
   },
   "kind": "critique",
   "title": "500 小时的消融规模",
   "explanation": "BEST-RQ 与 Wav2Vec 2.0 / W2v-BERT 的对比消融，只在约 500 小时 en-US 上完成。这个规模与最终 12M 小时的预训练相差四个数量级，因此结论「BEST-RQ 在超大规模下仍占优」实际上是外推——虽然论文在 2B 参数 + 12M 小时的最终系统里稳定，但严格说「为什么选择 BEST-RQ」的证据强度是有限的。读消融时建议区分「小规模机制结论」与「大规模工程结论」两类。"
  },
  {
   "id": "ann-022",
   "anchor": {
    "sentence_id": "s-5-3-1-5",
    "quote": "doesn’t suffer from codebook collapse"
   },
   "kind": "concept",
   "title": "码本坍缩何以被规避",
   "explanation": "码本坍缩是可学量化器的经典病态：少数码字吸走几乎所有输入，有效码本大小急剧缩水，预训练目标失去区分度。BEST-RQ 用冻结随机投影 + 固定码本彻底绕过——码字分布由投影的几何性质决定，不随训练漂移。这条性质使得 BEST-RQ 能直接放大到 2B 参数、12M 小时而无需周期性重聚类（HuBERT）或复杂的码本 EMA 维护（vq-wav2vec），是工程可扩展性的隐藏功臣。"
  },
  {
   "id": "ann-023",
   "anchor": {
    "sentence_id": "s-5-5-2-3",
    "quote": "only 3.9× slower than the 100M-parameter streaming model"
   },
   "kind": "engineering",
   "title": "2B 模型仅慢 3.9 倍",
   "explanation": "一个 2B 参数的 USM-CTC/RNN-T 在 TPU 上做长音频推理，吞吐只比 100M 的专用流式模型慢 3.9 倍——参数大 20 倍，速度只慢 4 倍。这背后是 CTC/RNN-T 解码的高并行性，加上大批量 TPU 推理摊薄的固定开销。工程启示：当模型质量显著更强、且服务在自有加速硬件上时，「大模型不能上线」的旧观念未必成立，推理成本-质量曲线可能比直觉平得多。",
   "featured": true
  },
  {
   "id": "ann-024",
   "anchor": {
    "sentence_id": "s-6-2-1",
    "quote": "diverse unlabeled data is more practical to acquire"
   },
   "kind": "motivation",
   "title": "结论落到数据哲学",
   "explanation": "结尾这句话是整篇论文的落点：与其追求更多标注，不如追求更多样的无标注。USM 的成功不是因为模型结构多巧，而是把数据瓶颈从「标注产能」转移到「采集与算力」——而后者的增长曲线远比标注产能陡。对今天的从业者仍有现实指导意义：预算有限时，优先砸数据采集与无标注预训练，标注预算留给「对表」和关键域适配，这条优先级在论文发表三年后仍未被颠覆。",
   "featured": true
  }
 ]
};
