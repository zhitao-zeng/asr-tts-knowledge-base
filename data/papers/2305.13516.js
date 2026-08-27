// 自动生成：2305.13516 全文双语精读数据（由 tools/compile_paper.js 装配）
// 结构/原文来自 .cache/papers/2305.13516.json（tools/extract_paper.py）；
// 翻译与讲解来自 .cache/papers/zh/2305.13516/（LLM agent 撰写）。
// 改翻译请改片段后重新装配；勿手改本文件的结构与 original 字段。
globalThis.PAPER_2305_13516 = {
 "paper_id": "2305.13516",
 "model_id": "meta_mms",
 "title": {
  "original": "Scaling Speech Technology to 1,000+ Languages",
  "zh": "将语音技术扩展到 1,000+ 种语言"
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
       "original": "Vineel Pratap♢ Andros Tjandra♢ Bowen Shi♢"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-paden-tomasello",
   "num": null,
   "level": 2,
   "page": 1,
   "title": {
    "original": "Paden Tomasello",
    "zh": "Paden Tomasello"
   },
   "blocks": [
    {
     "id": "p-paden-tomasello-1",
     "type": "paragraph",
     "page": 1,
     "sentences": [
      {
       "id": "s-paden-tomasello-1-1",
       "original": "Arun Babu Sayani Kundu∗Ali Elkahky†",
       "zh": "Arun Babu Sayani Kundu∗Ali Elkahky†"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-zhaoheng-ni",
   "num": null,
   "level": 2,
   "page": 1,
   "title": {
    "original": "Zhaoheng Ni",
    "zh": "Zhaoheng Ni"
   },
   "blocks": [
    {
     "id": "p-zhaoheng-ni-1",
     "type": "paragraph",
     "page": 1,
     "sentences": [
      {
       "id": "s-zhaoheng-ni-1-1",
       "original": "Apoorv Vyas Maryam Fazel-Zarandi Alexei Baevski‡ Yossi Adi§ Xiaohui Zhang Wei-Ning Hsu Alexis Conneau¶ Michael Auli♢ Meta AI ♢core team",
       "zh": "Apoorv Vyas Maryam Fazel-Zarandi Alexei Baevski‡ Yossi Adi§ Xiaohui Zhang Wei-Ning Hsu Alexis Conneau¶ Michael Auli♢ Meta AI ♢核心团队"
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
       "original": "Expanding the language coverage of speech technology has the potential to improve access to information for many more people.",
       "zh": "扩大语音技术的语言覆盖范围，有望让更多人能够获取信息。"
      },
      {
       "id": "s-abstract-1-2",
       "original": "However, current speech technology is restricted to about one hundred languages which is a small fraction of the over 7,000 languages spoken around the world.",
       "zh": "然而，目前的语音技术仅覆盖约一百种语言，这只是全球 7,000 多种语言中的一小部分。"
      },
      {
       "id": "s-abstract-1-3",
       "original": "The Massively Multilingual Speech (MMS) project increases the number of supported languages by 10-40x, depending on the task.",
       "zh": "大规模多语言语音（MMS）项目根据任务的不同，将支持的语言数量提升了 10-40 倍。"
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
       "original": "The main ingredients are a new dataset based on readings of publicly available religious texts and effectively leveraging self-supervised learning.",
       "zh": "主要的支撑是一个基于公开宗教文本朗读的新数据集，以及对自监督学习的有效利用。"
      },
      {
       "id": "s-abstract-2-2",
       "original": "We built pre-trained wav2vec 2.0 models covering 1,406 languages, a single multilingual automatic speech recognition model for 1,107 languages, speech synthesis models for the same number of languages, as well as a language identification model for 4,017 languages.",
       "zh": "我们构建了覆盖 1,406 种语言的预训练 wav2vec 2.0 模型、一个支持 1,107 种语言的单一多语言自动语音识别模型、覆盖同样数量语言的语音合成模型，以及一个支持 4,017 种语言的语种识别模型。"
      },
      {
       "id": "s-abstract-2-3",
       "original": "Experiments show that our multilingual speech recognition model more than halves the word error rate of Whisper on 54 languages of the FLEURS benchmark while being trained on a small fraction of the labeled data.",
       "zh": "实验表明，我们的多语言语音识别模型在 FLEURS 基准的 54 种语言上将 Whisper 的词错误率降低了一半以上，而训练所用的标注数据只占 Whisper 的一小部分。"
      },
      {
       "id": "s-abstract-2-4",
       "original": "The MMS models are available at https://github.com/pytorch/fairseq/tree/master/examples/mms.",
       "zh": "MMS 模型已在 https://github.com/pytorch/fairseq/tree/master/examples/mms 发布。"
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
       "original": "Speech technology has made much progress over the past decade [Chan et al., 2015, Graves et al., 2006, Baevski et al., 2020b, Radford et al., 2022] and has been integrated into many consumer products, such as home assistants and smartphones.",
       "zh": "过去十年，语音技术取得了长足进展 [Chan et al., 2015, Graves et al., 2006, Baevski et al., 2020b, Radford et al., 2022]，并已被集成到许多消费级产品中，例如家庭助手和智能手机。"
      },
      {
       "id": "s-1-1-2",
       "original": "Despite this progress, speech technology is still absent for the vast majority of the over 7,000 languages spoken around the world [Lewis et al., 2016].",
       "zh": "尽管有这些进展，全球 7,000 多种语言中的绝大多数仍然没有可用的语音技术 [Lewis et al., 2016]。"
      },
      {
       "id": "s-1-1-3",
       "original": "Moreover, many of these languages are at risk of disappearing by the end of this century and the narrow language coverage of current technology may contribute to this trend [Bromham et al., 2021].",
       "zh": "此外，其中许多语言面临在本世纪末消失的风险，而当前技术狭窄的语言覆盖可能会加剧这一趋势 [Bromham et al., 2021]。"
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
       "original": "Speech models have traditionally been built by training models on large amounts of labeled training data which is only available for a small number of languages.",
       "zh": "传统上，语音模型通过在大量标注训练数据上训练来构建，而这种数据只对少数语言可得。"
      },
      {
       "id": "s-1-2-2",
       "original": "More recently, self-supervised speech representations have dramatically lowered the amount of labeled data required to build speech systems [van den Oord et al., 2018, Schneider et al., 2019, Baevski et al., 2020b].",
       "zh": "近年来，自监督语音表示大幅降低了构建语音系统所需的标注数据量 [van den Oord et al., 2018, Schneider et al., 2019, Baevski et al., 2020b]。"
      },
      {
       "id": "s-1-2-3",
       "original": "But despite this ∗JPMorgan Chase.",
       "zh": "但尽管有这些 ∗摩根大通（JPMorgan Chase）。"
      },
      {
       "id": "s-1-2-4",
       "original": "Work done while at Meta AI.",
       "zh": "在 Meta AI 工作期间完成。"
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
       "original": "†Apple.",
       "zh": "†Apple。"
      },
      {
       "id": "s-1-3-2",
       "original": "Work done while at Meta AI. ‡Character.AI.",
       "zh": "在 Meta AI 工作期间完成。‡Character.AI。"
      },
      {
       "id": "s-1-3-3",
       "original": "Work done while at Meta AI. §Meta AI & Hebrew University of Jerusalem. ¶Open AI.",
       "zh": "在 Meta AI 工作期间完成。§Meta AI 与耶路撒冷希伯来大学。¶Open AI。"
      },
      {
       "id": "s-1-3-4",
       "original": "Work done while at Meta AI.",
       "zh": "在 Meta AI 工作期间完成。"
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
       "original": "Speech-to-Text, Text-to-Speech, Language ID Language ID",
       "zh": "语音转文本、文本转语音、语种识别 语种识别"
      }
     ]
    },
    {
     "id": "fig-1-1",
     "type": "figure_caption",
     "page": 2,
     "original": "Figure 1: Illustration of where the languages supported by MMS are spoken around the world: MMS models support speech-to-text and text-to-speech for 1,107 languages as well as language identification for 4,017 languages.",
     "zh": "图 1：MMS 所支持语言在全球分布的示意图：MMS 模型支持 1,107 种语言的语音转文本和文本转语音，以及 4,017 种语言的语种识别。"
    },
    {
     "id": "p-1-5",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-1-5-1",
       "original": "progress, prominent recent work still only supports about 100 languages [Radford et al., 2022, Zhang et al., 2023a].",
       "zh": "尽管有这些进展，近期的代表性工作仍只支持约 100 种语言 [Radford et al., 2022, Zhang et al., 2023a]。"
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
       "original": "To address this, we build a new dataset comprising a moderate amount of labeled data for 1,107 languages and another dataset of unlabeled speech in 3,809 languages (§3).",
       "zh": "为解决这一问题，我们构建了一个新数据集，包含 1,107 种语言的中等规模标注数据，以及一个覆盖 3,809 种语言的无标注语音数据集（§3）。"
      },
      {
       "id": "s-1-6-2",
       "original": "We leverage this data to pre-train wav2vec 2.0 models supporting several times more languages than any known prior work (§4) and then fine-tune these models to build a multilingual speech recognition model supporting 1,107 languages (§5), language identification models for 4,017 languages (§6) and text-to-speech models for 1,107 languages (§7).",
       "zh": "我们利用这些数据预训练 wav2vec 2.0 模型，支持的语言数量是已知先前工作的数倍（§4），然后微调这些模型，构建出支持 1,107 种语言的多语言语音识别模型（§5）、支持 4,017 种语言的语种识别模型（§6）以及支持 1,107 种语言的文本转语音模型（§7）。"
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
       "original": "The Massively Multilingual Speech (MMS) project aims to expand speech technology to many more people and we hope that it can be a small contribution to preserving the languages diversity of this world.",
       "zh": "大规模多语言语音（MMS）项目旨在将语音技术带给更多人，我们希望它能为保护这个世界的语言多样性做出一份微小贡献。"
      },
      {
       "id": "s-1-7-2",
       "original": "Figure 1 illustrates the location where the languages supported in this work are spoken and which tasks we cover for each language.",
       "zh": "图 1 展示了本工作所支持语言在世界各地的分布，以及每种语言覆盖的任务。"
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
    "original": "Related Work Multilingual Speech Datasets.",
    "zh": "相关工作 多语言语音数据集。"
   },
   "blocks": [
    {
     "id": "p-2-1",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-2-1-1",
       "original": "Current multilingual speech datasets with transcriptions are drawn from a variety of domains, including Wikipedia [Ardila et al., 2020, Conneau et al., 2022], political speech [Wang et al., 2021], audiobooks [Pratap et al., 2020c] to name a few.",
       "zh": "目前带转写的多语言语音数据集来自多种领域，包括 Wikipedia [Ardila et al., 2020, Conneau et al., 2022]、政治演讲 [Wang et al., 2021]、有声读物 [Pratap et al., 2020c] 等。"
      },
      {
       "id": "s-2-1-2",
       "original": "They are limited to about 100 languages with some datasets only containing data for European languages [Wang et al., 2021, Pratap et al., 2020c].",
       "zh": "它们被限制在约 100 种语言，其中一些数据集只包含欧洲语言的数据 [Wang et al., 2021, Pratap et al., 2020c]。"
      },
      {
       "id": "s-2-1-3",
       "original": "Multilingual datasets without transcriptions include VoxLingua107 [Valk and Alumäe, 2020] spanning data in 107 languages, or VoxPopuli [Wang et al., 2021] which contains large amounts of unlabeled data for European languages.",
       "zh": "无转写的多语言数据集包括覆盖 107 种语言的 VoxLingua107 [Valk and Alumäe, 2020]，以及包含大量欧洲语言无标注数据的 VoxPopuli [Wang et al., 2021]。"
      },
      {
       "id": "s-2-1-4",
       "original": "Leong et al. [2022] covers 56 low-resource languages and 428 hours of data.",
       "zh": "Leong et al. [2022] 覆盖了 56 种低资源语言，共 428 小时数据。"
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
       "original": "Compared to prior work utilizing read versions of the New Testament Black [2019], MMS covers many more languages (58% more for MMS-lab and over five times more for MMS-unlab) and our alignments are of much higher quality which leads to better models as we show in §3.3.1.",
       "zh": "与此前利用《新约》朗读版本的工作 Black [2019] 相比，MMS 覆盖了多得多的语言（MMS-lab 多 58%，MMS-unlab 多出五倍以上），而且我们的对齐质量高得多，从而能训练出更好的模型，我们在 §3.3.1 中展示这一点。"
      },
      {
       "id": "s-2-2-2",
       "original": "We also use the resulting data to train self-supervised models, build speech recognition systems as well as language identification models while as Black [2019] focused on speech synthesis.",
       "zh": "我们还用这些数据训练自监督模型、构建语音识别系统和语种识别模型，而 Black [2019] 的工作聚焦于语音合成。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-multilingual-automatic-speech-re",
   "num": null,
   "level": 2,
   "page": 3,
   "title": {
    "original": "Multilingual Automatic Speech Recognition (ASR).",
    "zh": "多语言自动语音识别（ASR）。"
   },
   "blocks": [
    {
     "id": "p-multilingual-automatic-speech-re-1",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-multilingual-automatic-speech-re-1-1",
       "original": "Prior work on multilingual speech recognition includes both non-neural methods [Burget et al., 2010, Lin et al., 2009], hybrid neural and HMM models [Heigold et al., 2013] and more recently neural systems [Cho et al., 2018, Toshniwal et al., 2018, Kannan et al., 2019, Li et al., 2019].",
       "zh": "多语言语音识别的先前工作既包括非神经方法 [Burget et al., 2010, Lin et al., 2009]、神经网络与 HMM 混合模型 [Heigold et al., 2013]，也包括更近的神经系统 [Cho et al., 2018, Toshniwal et al., 2018, Kannan et al., 2019, Li et al., 2019]。"
      },
      {
       "id": "s-multilingual-automatic-speech-re-1-2",
       "original": "Li et al. [2021] built multilingual ASR for up to 15 languages, Pratap et al. [2020a], Lugosch et al. [2022], Tjandra et al. [2022b] trained and explored several strategies for 50+ languages.",
       "zh": "Li et al. [2021] 构建了最多 15 种语言的多语言 ASR；Pratap et al. [2020a]、Lugosch et al. [2022]、Tjandra et al. [2022b] 针对 50+ 种语言训练并探索了多种策略。"
      }
     ]
    },
    {
     "id": "p-multilingual-automatic-speech-re-2",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-multilingual-automatic-speech-re-2-1",
       "original": "Whisper [Radford et al., 2022] mines 680K hours of data from the web and their model supports the transcription of 99 different languages.",
       "zh": "Whisper [Radford et al., 2022] 从网络上挖掘了 680K 小时数据，其模型支持 99 种不同语言的转写。"
      },
      {
       "id": "s-multilingual-automatic-speech-re-2-2",
       "original": "Zhang et al. [2023a] trained a multilingual ASR model based on YouTube audio data and successfully scaled to 100 languages.",
       "zh": "Zhang et al. [2023a] 基于 YouTube 音频数据训练多语言 ASR 模型，并成功扩展到 100 种语言。"
      },
      {
       "id": "s-multilingual-automatic-speech-re-2-3",
       "original": "A notable exception is Li et al. [2022] who created ASR for 1,909 languages by mapping the phoneme-like output of an eight language multilingual model to appropriate phonemes for the language of interest.",
       "zh": "一个值得注意的例外是 Li et al. [2022]，他们通过将一个八语言多语言模型的类音素输出映射到目标语言的相应音素，为 1,909 种语言构建了 ASR。"
      },
      {
       "id": "s-multilingual-automatic-speech-re-2-4",
       "original": "In contrast, MMS uses actual paired speech and text for over 1,100 languages and present a comparison to their approach below (§3.3.2).",
       "zh": "相比之下，MMS 使用超过 1,100 种语言的真实配对语音与文本，我们在下文中给出与他们方法的对比（§3.3.2）。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-spoken-language-identification-l",
   "num": null,
   "level": 2,
   "page": 3,
   "title": {
    "original": "Spoken Language Identification (LID).",
    "zh": "口语语种识别（LID）。"
   },
   "blocks": [
    {
     "id": "p-spoken-language-identification-l-1",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-spoken-language-identification-l-1-1",
       "original": "Whisper [Radford et al., 2022] also supports language identification and can distinguish between 99 different languages.",
       "zh": "Whisper [Radford et al., 2022] 也支持语种识别，可区分 99 种不同语言。"
      },
      {
       "id": "s-spoken-language-identification-l-1-2",
       "original": "Fan et al. [2021] utilizes wav2vec 2.0 for language identification using the API17-OLR dataset that consists of ten Asian languages.",
       "zh": "Fan et al. [2021] 在由十种亚洲语言组成的 API17-OLR 数据集上，利用 wav2vec 2.0 进行语种识别。"
      },
      {
       "id": "s-spoken-language-identification-l-1-3",
       "original": "Later, Tjandra et al. [2022a] demonstrated that a cross-lingual self-supervised model can improve language identification performance by training a language identification model for 26 languages using a proprietary dataset.",
       "zh": "随后，Tjandra et al. [2022a] 证明跨语言自监督模型可以提升语种识别性能，他们在一个专有数据集上训练了 26 种语言的语种识别模型。"
      },
      {
       "id": "s-spoken-language-identification-l-1-4",
       "original": "Babu et al. [2022] fine-tunes a pre-trained model to perform LID for 107 languages using the VoxLingua-107 dataset [Valk and Alumäe, 2020].",
       "zh": "Babu et al. [2022] 使用 VoxLingua-107 数据集 [Valk and Alumäe, 2020] 微调预训练模型，执行 107 种语言的 LID。"
      },
      {
       "id": "s-spoken-language-identification-l-1-5",
       "original": "In this work, we scale the number of languages to over 4,000 which to our knowledge is the broadest coverage spoken language identification model so far.",
       "zh": "在本工作中，我们将语言数量扩展到 4,000 种以上，据我们所知，这是迄今覆盖最广的口语语种识别模型。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-multilingual-text-to-speech-tts",
   "num": null,
   "level": 2,
   "page": 3,
   "title": {
    "original": "Multilingual Text-To-Speech (TTS).",
    "zh": "多语言文本转语音（TTS）。"
   },
   "blocks": [
    {
     "id": "p-multilingual-text-to-speech-tts-1",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-multilingual-text-to-speech-tts-1-1",
       "original": "Speech synthesis has been undergoing a transition from controlled settings to the generation of more diverse speech, with multilinguality being a crucial aspect [Casanova et al., 2022, Zhang et al., 2023b].",
       "zh": "语音合成正经历从受控场景到生成更多样化语音的转型，多语言能力是其中的关键一环 [Casanova et al., 2022, Zhang et al., 2023b]。"
      },
      {
       "id": "s-multilingual-text-to-speech-tts-1-2",
       "original": "However, the lack of multilingual training data, particularly for low-resource languages, presents a common obstacle in scaling TTS to more languages.",
       "zh": "然而，多语言训练数据的缺乏——尤其对低资源语言而言——是将 TTS 扩展到更多语言的常见障碍。"
      },
      {
       "id": "s-multilingual-text-to-speech-tts-1-3",
       "original": "To address data scarcity, prior work explored various approaches including byte encoding to unify text representations which was evaluated on English, Spanish, and Chinese [Li et al., 2019] Further studies explored other input representations, including phonemes [Zhang et al., 2019] and phonological features [Staib et al., 2020].",
       "zh": "为解决数据稀缺，先前工作探索了多种方案，包括用字节编码统一文本表示（在英语、西班牙语和中文上评估）[Li et al., 2019]；更多研究探索了其他输入表示，包括音素 [Zhang et al., 2019] 和音系特征 [Staib et al., 2020]。"
      }
     ]
    },
    {
     "id": "p-multilingual-text-to-speech-tts-2",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-multilingual-text-to-speech-tts-2-1",
       "original": "Additionally, various modeling schemes have been developed to encourage knowledge sharing between languages, such as parameter generation networks [Nekvinda and Dušek, 2020] and leveraging unpaired speech or text data for pre-training [Saeki et al., 2023b,a].",
       "zh": "此外，人们发展了多种建模方案来促进语言间的知识共享，例如参数生成网络 [Nekvinda and Dušek, 2020]，以及利用非配对语音或文本数据进行预训练 [Saeki et al., 2023b,a]。"
      },
      {
       "id": "s-multilingual-text-to-speech-tts-2-2",
       "original": "Despite these efforts, most prior work still covers a small number of languages but there are a few efforts which scaled to 46 languages [He et al., 2021] or use unsupervised techniques to scale to 101 languages [Saeki et al., 2023b].",
       "zh": "尽管有这些努力，大多数先前工作仍只覆盖少量语言，少数工作扩展到 46 种语言 [He et al., 2021]，或使用无监督技术扩展到 101 种语言 [Saeki et al., 2023b]。"
      },
      {
       "id": "s-multilingual-text-to-speech-tts-2-3",
       "original": "Meyer et al. [2022] also builds VITS models based on readings of the Bible but their work is limited to ten African languages.",
       "zh": "Meyer et al. [2022] 同样基于《圣经》朗读构建 VITS 模型，但其工作仅限于十种非洲语言。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-multilingual-nlp",
   "num": null,
   "level": 2,
   "page": 3,
   "title": {
    "original": "Multilingual NLP.",
    "zh": "多语言 NLP。"
   },
   "blocks": [
    {
     "id": "p-multilingual-nlp-1",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-multilingual-nlp-1-1",
       "original": "Multilinguality has been a very active research area in NLP where researchers introduced cross-lingually pre-trained sentence encoders [Conneau and Lample, 2019] spanning 100 languages, or pre-trained multilingual sequence to sequence models [Liu et al., 2020] applied to machine translation.",
       "zh": "多语言一直是 NLP 中非常活跃的研究领域，研究者提出了覆盖 100 种语言的跨语言预训练句子编码器 [Conneau and Lample, 2019]，以及应用于机器翻译的预训练多语言序列到序列模型 [Liu et al., 2020]。"
      },
      {
       "id": "s-multilingual-nlp-1-2",
       "original": "Multilingual machine translation models have also been scaled to 200 languages [NLLB_Team et al., 2022] and even 1,000 languages [Bapna et al., 2022a].",
       "zh": "多语言机器翻译模型也已扩展到 200 种语言 [NLLB_Team et al., 2022]，甚至 1,000 种语言 [Bapna et al., 2022a]。"
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
    "original": "Dataset Creation",
    "zh": "数据集构建"
   },
   "blocks": [
    {
     "id": "p-3-1",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-3-1-1",
       "original": "Our work leverages two new datasets to expand the language coverage of speech technology.",
       "zh": "我们的工作利用两个新数据集来扩大语音技术的语言覆盖范围。"
      },
      {
       "id": "s-3-1-2",
       "original": "In this section, we first detail how we create a labeled dataset which includes speech audio paired with corresponding text in 1,107 languages (MMS-lab; 44.7K hours; §3.1).",
       "zh": "在本节中，我们首先详述如何构建一个标注数据集，其中包含 1,107 种语言的语音音频及对应文本（MMS-lab；44.7K 小时；§3.1）。"
      },
      {
       "id": "s-3-1-3",
       "original": "Second, we discuss the creation of an unlabeled dataset for which we only have audio recordings and no corresponding text.",
       "zh": "其次，我们讨论一个无标注数据集的构建，该数据集只有音频录音，没有对应文本。"
      },
      {
       "id": "s-3-1-4",
       "original": "This dataset spans 3,809 languages (MMS-unlab; 7.7K total hours; §3.2).",
       "zh": "该数据集覆盖 3,809 种语言（MMS-unlab；总计 7.7K 小时；§3.2）。"
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
       "original": "We also use an unlabeled version of MMS-lab for pre-training and language identification.",
       "zh": "我们还使用 MMS-lab 的无标注版本进行预训练和语种识别。"
      },
      {
       "id": "s-3-2-2",
       "original": "This spans a larger number of languages, as we can also use unlabeled audio from our data source (MMS-lab-U; 1,362 languages; 55K hours).",
       "zh": "它覆盖更多语言，因为我们还可以使用来自数据源的、没有文本的无标注音频（MMS-lab-U；1,362 种语言；55K 小时）。"
      },
      {
       "id": "s-3-2-3",
       "original": "Figure 2 compares the datasets to existing corpora.",
       "zh": "图 2 将这些数据集与现有语料库进行对比。"
      },
      {
       "id": "s-3-2-4",
       "original": "A full list of the",
       "zh": "所支持语言的完整列表见"
      }
     ]
    },
    {
     "id": "eq-3-1",
     "type": "equation",
     "page": 4,
     "original": "106"
    },
    {
     "id": "eq-3-2",
     "type": "equation",
     "page": 4,
     "original": "105"
    },
    {
     "id": "p-3-3",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-3-1",
       "original": "MLS MMS-lab # hours CommonVoice",
       "zh": "MLS MMS-lab # 小时 CommonVoice"
      }
     ]
    },
    {
     "id": "eq-3-3",
     "type": "equation",
     "page": 4,
     "original": "104"
    },
    {
     "id": "p-3-4",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-4-1",
       "original": "CMU Wilderness BABEL VoxPopuli",
       "zh": "CMU Wilderness BABEL VoxPopuli"
      }
     ]
    },
    {
     "id": "eq-3-4",
     "type": "equation",
     "page": 4,
     "original": "103"
    },
    {
     "id": "p-3-5",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-5-1",
       "original": "FLEURS M-AILABS 10 100 # languages (a) Labeled Datasets.",
       "zh": "FLEURS M-AILABS 10 100 # 语言数 (a) 标注数据集。"
      }
     ]
    },
    {
     "id": "p-3-6",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-6-1",
       "original": "106 VoxPopuli",
       "zh": "106 VoxPopuli"
      }
     ]
    },
    {
     "id": "eq-3-5",
     "type": "equation",
     "page": 4,
     "original": "105"
    },
    {
     "id": "p-3-7",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-7-1",
       "original": "MMS-lab-U # hours Dhwani MMS-unlab",
       "zh": "MMS-lab-U # 小时 Dhwani MMS-unlab"
      }
     ]
    },
    {
     "id": "eq-3-6",
     "type": "equation",
     "page": 4,
     "original": "104"
    },
    {
     "id": "p-3-8",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-8-1",
       "original": "VoxLingua107",
       "zh": "VoxLingua107"
      }
     ]
    },
    {
     "id": "eq-3-7",
     "type": "equation",
     "page": 4,
     "original": "103"
    },
    {
     "id": "p-3-9",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-9-1",
       "original": "10 100 # languages (b) Unlabeled Datasets.",
       "zh": "10 100 # 语言数 (b) 无标注数据集。"
      }
     ]
    },
    {
     "id": "fig-3-1",
     "type": "figure_caption",
     "page": 4,
     "original": "Figure 2: Dataset Overview. MMS-lab, MMS-lab-U and MMS-unlab compared to existing multilingual speech corpora in terms of the supported languages and dataset size. We compare to BABEL [Gales et al., 2014], CMU Wilderness [Black, 2019], CommonVoice [Ardila et al., 2020], Dhwani [Javed et al., 2022], FLEURS [Conneau et al., 2022], M-AILABS [M-AILABS, 2018], MLS [Pratap et al., 2020c], VoxLingua107 [Valk and Alumäe, 2020], and VoxPopuli [Wang et al., 2021] .",
     "zh": "图 2：数据集概览。MMS-lab、MMS-lab-U 和 MMS-unlab 与现有多语言语音语料库在支持语言数和数据规模上的对比。对比对象包括 BABEL [Gales et al., 2014]、CMU Wilderness [Black, 2019]、CommonVoice [Ardila et al., 2020]、Dhwani [Javed et al., 2022]、FLEURS [Conneau et al., 2022]、M-AILABS [M-AILABS, 2018]、MLS [Pratap et al., 2020c]、VoxLingua107 [Valk and Alumäe, 2020] 和 VoxPopuli [Wang et al., 2021]。"
    },
    {
     "id": "p-3-10",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-10-1",
       "original": "languages supported is available at https://github.com/facebookresearch/fairseq/tree/ main/examples/mms.",
       "zh": "https://github.com/facebookresearch/fairseq/tree/ main/examples/mms。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-3-1",
   "num": "3.1",
   "level": 2,
   "page": 4,
   "title": {
    "original": "Paired Data for 1,107 Languages (MMS-lab)",
    "zh": "1,107 种语言的配对数据（MMS-lab）"
   },
   "blocks": [
    {
     "id": "p-3-1-1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-1-1-1",
       "original": "We obtain speech data and transcriptions for 1,107 languages by aligning New Testament texts obtained from online sources (§3.1.1) using the following steps:",
       "zh": "我们通过将从在线来源获取的《新约》文本（§3.1.1）进行对齐，获得 1,107 种语言的语音数据和转写，具体步骤如下："
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
       "original": "1.",
       "zh": "1."
      },
      {
       "id": "s-3-1-2-2",
       "original": "Download and preprocess both the speech audio and the text data (§3.1.2).",
       "zh": "下载并预处理语音音频和文本数据（§3.1.2）。"
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
       "original": "2.",
       "zh": "2."
      },
      {
       "id": "s-3-1-3-2",
       "original": "Apply a scalable alignment algorithm which can force align very long audio files with text and do this for data in 1000+ languages (§3.1.3).",
       "zh": "应用一种可扩展的对齐算法，能够将超长音频文件与文本强制对齐，并可处理 1000+ 种语言的数据（§3.1.3）。"
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
       "original": "3.",
       "zh": "3."
      },
      {
       "id": "s-3-1-4-2",
       "original": "Initial Data Alignment: we train an initial alignment model using existing multilingual speech datasets covering 8K hours of data in 127 languages and use this model to align data for all languages (§3.1.4).",
       "zh": "初始数据对齐：我们使用覆盖 127 种语言、8K 小时数据的现有多语言语音数据集训练一个初始对齐模型，并用它为所有语言对齐数据（§3.1.4）。"
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
       "original": "4.",
       "zh": "4."
      },
      {
       "id": "s-3-1-5-2",
       "original": "Improved Data Alignment: we train a second alignment model on the newly aligned data for which the original alignment model has high confidence and generate the alignments again.",
       "zh": "改进数据对齐：我们在原始对齐模型置信度较高的新对齐数据上训练第二个对齐模型，并重新生成对齐。"
      },
      {
       "id": "s-3-1-5-3",
       "original": "The new alignment model supports 1,130 languages and 31K hours of data including the data used in step 3 (§3.1.5).",
       "zh": "新的对齐模型支持 1,130 种语言、31K 小时数据，其中包含第 3 步所用的数据（§3.1.5）。"
      }
     ]
    },
    {
     "id": "p-3-1-6",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-1-6-1",
       "original": "5.",
       "zh": "5."
      },
      {
       "id": "s-3-1-6-2",
       "original": "Final data filtering: we filter the low-quality samples of each language based on a crossvalidation procedure.",
       "zh": "最终数据过滤：我们基于交叉验证流程过滤每种语言的低质量样本。"
      },
      {
       "id": "s-3-1-6-3",
       "original": "For each language, we train a monolingual ASR model on half of the aligned data to transcribe the other half of the data.",
       "zh": "对每种语言，我们在一半对齐数据上训练一个单语 ASR 模型，用来转写另一半数据。"
      },
      {
       "id": "s-3-1-6-4",
       "original": "We retain only samples for which the transcriptions are of acceptable quality (§3.1.6).",
       "zh": "我们只保留转写质量可接受的样本（§3.1.6）。"
      }
     ]
    },
    {
     "id": "p-3-1-7",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-1-7-1",
       "original": "6.",
       "zh": "6."
      },
      {
       "id": "s-3-1-7-2",
       "original": "We partition the data into training, development and test portions (§3.1.7).",
       "zh": "我们将数据划分为训练集、开发集和测试集（§3.1.7）。"
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
    "original": "Data Source",
    "zh": "数据来源"
   },
   "blocks": [
    {
     "id": "p-3-1-1-1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-1-1-1-1",
       "original": "The MMS-lab dataset is based on recordings of people reading the New Testament in different languages.",
       "zh": "MMS-lab 数据集基于人们用不同语言朗读《新约》的录音。"
      },
      {
       "id": "s-3-1-1-1-2",
       "original": "The New Testament consists of 27 books and a total of 260 chapters.",
       "zh": "《新约》由 27 卷书组成，共 260 章。"
      },
      {
       "id": "s-3-1-1-1-3",
       "original": "Specifically, we obtain data from Faith Comes By Hearing6, goto.bible and bible.com.",
       "zh": "具体而言，我们从 Faith Comes By Hearing6、goto.bible 和 bible.com 获取数据。"
      },
      {
       "id": "s-3-1-1-1-4",
       "original": "This includes the original text data as we well as the corresponding audio recording.",
       "zh": "这包括原始文本数据以及相应的音频录音。"
      }
     ]
    },
    {
     "id": "p-3-1-1-2",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-1-1-2-1",
       "original": "6https://www.faithcomesbyhearing.com/",
       "zh": "6https://www.faithcomesbyhearing.com/"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-basic-data-characteristics",
   "num": null,
   "level": 2,
   "page": 5,
   "title": {
    "original": "Basic Data Characteristics.",
    "zh": "基本数据特征。"
   },
   "blocks": [
    {
     "id": "p-basic-data-characteristics-1",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-basic-data-characteristics-1-1",
       "original": "The data sources provide 1,626 audio recordings of the New Testament in 1,362 languages, totaling 55K hours and we refer to this data as the MMS-lab-U dataset.7 Out of these, both text and audio is available for 1,306 different recordings in 1,130 languages and a total of 49K hours, which we focus on for MMS-lab.",
       "zh": "数据来源提供了 1,362 种语言的 1,626 个《新约》音频录音，总计 55K 小时，我们将这部分数据称为 MMS-lab-U 数据集。7 其中，1,306 个录音（1,130 种语言、总计 49K 小时）同时具备文本和音频，MMS-lab 聚焦的正是这部分数据。"
      },
      {
       "id": "s-basic-data-characteristics-1-2",
       "original": "For 99 languages, we have multiple recordings.",
       "zh": "有 99 种语言拥有多个录音。"
      },
      {
       "id": "s-basic-data-characteristics-1-3",
       "original": "Each recording provides separate audio files for each chapter and the duration of each chapter is on average 6.7 minutes but there is significant variance, depending on the language and chapter.",
       "zh": "每个录音按章提供独立的音频文件，每章平均时长 6.7 分钟，但方差很大，取决于语言和章节。"
      },
      {
       "id": "s-basic-data-characteristics-1-4",
       "original": "Recordings are almost always single speaker which makes it well suited for building speech synthesis systems (§7).",
       "zh": "录音几乎总是单一说话人，这使其非常适合构建语音合成系统（§7）。"
      },
      {
       "id": "s-basic-data-characteristics-1-5",
       "original": "However, speakers are often male which may introduce unwanted biases into machine learning models which we analyze below (§8.1).",
       "zh": "然而，说话人往往是男性，这可能给机器学习模型引入不希望的偏差，我们在下文中对此进行分析（§8.1）。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-multiple-scripts-or-dialects-per",
   "num": null,
   "level": 2,
   "page": 5,
   "title": {
    "original": "Multiple Scripts or Dialects per Language.",
    "zh": "同一语言的多种文字或方言。"
   },
   "blocks": [
    {
     "id": "p-multiple-scripts-or-dialects-per-1",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-multiple-scripts-or-dialects-per-1-1",
       "original": "When there are multiple recordings per language, we found that some recordings differ in the used writing script, e.g., for Serbian there are recordings using the Latin script and another which uses Cyrillic.8 Recordings can also differ in the spoken dialect, e.g., for the Poqomchi’ language there are recordings with western and eastern dialects.",
       "zh": "当一种语言有多个录音时，我们发现部分录音使用的书写文字不同，例如塞尔维亚语有使用拉丁文字的录音，也有使用西里尔文字的录音。8 录音的口语方言也可能不同，例如 Poqomchi’ 语有西部方言和东部方言的录音。"
      }
     ]
    },
    {
     "id": "p-multiple-scripts-or-dialects-per-2",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-multiple-scripts-or-dialects-per-2-1",
       "original": "Depending on the downstream task, we handle these cases differently: for language identification, we merge the different recordings regardless of writing script or dialect, for speech synthesis models, we choose one recording per dialect/script to avoid introducing additional speakers into the training data, and for automatic speech recognition, we combine all the recordings within the same script/dialect into one and treat them as different languages, e.g., srp-script:latin, srp-script:cyrillic.",
       "zh": "根据下游任务的不同，我们对这些情况分别处理：对于语种识别，无论文字或方言如何，我们都合并不同录音；对于语音合成模型，我们每种方言/文字选择一个录音，以避免向训练数据引入额外说话人；对于自动语音识别，我们将同一文字/方言内的所有录音合并为一个，并将它们视为不同语言，例如 srp-script:latin、srp-script:cyrillic。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-micro-and-macro-language-distinc",
   "num": null,
   "level": 2,
   "page": 5,
   "title": {
    "original": "Micro and Macro Language Distinction.",
    "zh": "微观语言与宏观语言的区分。"
   },
   "blocks": [
    {
     "id": "p-micro-and-macro-language-distinc-1",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-micro-and-macro-language-distinc-1-1",
       "original": "When there is a micro and macro language distinction, then we generally keep micro languages as distinct languages.",
       "zh": "当存在微观语言与宏观语言的区分时，我们一般将微观语言保留为独立语言。"
      },
      {
       "id": "s-micro-and-macro-language-distinc-1-2",
       "original": "However, for languages which are part of benchmarks we use for evaluation, e.g., FLEURS [Conneau et al., 2022], we deviate from this policy if the respective benchmark only contains the macro language, by merging the micro languages.",
       "zh": "然而，对于属于我们评估所用基准的语言（例如 FLEURS [Conneau et al., 2022]），如果相应基准只包含宏观语言，我们会偏离这一策略，将微观语言合并。"
      },
      {
       "id": "s-micro-and-macro-language-distinc-1-3",
       "original": "For example, Azerbaijani is a macro language and MMS-lab provides data for two associated micro languages, North Azerbaijani and South Azerbaijani.",
       "zh": "例如，阿塞拜疆语是一个宏观语言，MMS-lab 为其关联的两个微观语言——北阿塞拜疆语和南阿塞拜疆语——提供了数据。"
      },
      {
       "id": "s-micro-and-macro-language-distinc-1-4",
       "original": "For ASR, our evaluation benchmarks also keep the same distinction and so we model both micro languages separately, however, for LID, one of our benchmarks, VoxLingua-107 [Valk and Alumäe, 2020], only contains the macro language, and therefore, for LID only, we merge both micro languages into a single macro language.",
       "zh": "对于 ASR，我们的评估基准保持同样的区分，因此我们将两个微观语言分别建模；然而对于 LID，我们的基准之一 VoxLingua-107 [Valk and Alumäe, 2020] 只包含宏观语言，因此仅对 LID 而言，我们将两个微观语言合并为一个宏观语言。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-recordings-with-background-music",
   "num": null,
   "level": 2,
   "page": 5,
   "title": {
    "original": "Recordings with Background Music.",
    "zh": "带背景音乐的录音。"
   },
   "blocks": [
    {
     "id": "p-recordings-with-background-music-1",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-recordings-with-background-music-1-1",
       "original": "Some of the recordings contain background music and we refer to these as drama recordings.",
       "zh": "部分录音包含背景音乐，我们将其称为广播剧录音（drama recordings）。"
      },
      {
       "id": "s-recordings-with-background-music-1-2",
       "original": "In our final MMS-lab dataset, 38% of languages are represented solely by a drama recording and 11% have both drama recordings and recordings without background music (non-drama recordings).",
       "zh": "在最终的 MMS-lab 数据集中，38% 的语言仅由广播剧录音代表，11% 的语言既有广播剧录音也有无背景音乐的录音（非广播剧录音）。"
      },
      {
       "id": "s-recordings-with-background-music-1-3",
       "original": "For speech synthesis, we apply pre-processing to remove background music (§7).",
       "zh": "对于语音合成，我们应用预处理来移除背景音乐（§7）。"
      }
     ]
    },
    {
     "id": "p-recordings-with-background-music-2",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-recordings-with-background-music-2-1",
       "original": "While this data source covers a lot of languages, it requires careful curation to make it usable for building high-quality models which presents unique challenges given the large number of languages.",
       "zh": "虽然这一数据来源覆盖了大量语言，但要使其可用于构建高质量模型，需要精心的整编；考虑到语言数量庞大，这带来了独特的挑战。"
      },
      {
       "id": "s-recordings-with-background-music-2-2",
       "original": "We detail the steps we take in the remainder of this section.",
       "zh": "我们将在本节剩余部分详述所采取的步骤。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-3-1-2",
   "num": "3.1.2",
   "level": 2,
   "page": 5,
   "title": {
    "original": "Data Pre-processing Speech.",
    "zh": "数据预处理 语音。"
   },
   "blocks": [
    {
     "id": "p-3-1-2-1",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-3-1-2-1-1",
       "original": "The original audio files are available in MP3 stereo format using a 22/24/44 kHz sampling rate.",
       "zh": "原始音频文件为 MP3 立体声格式，采样率为 22/24/44 kHz。"
      },
      {
       "id": "s-3-1-2-1-2",
       "original": "We convert all of them to a single channel and 16 kHz sampling rate.",
       "zh": "我们将它们全部转换为单声道、16 kHz 采样率。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-text-normalization",
   "num": null,
   "level": 2,
   "page": 5,
   "title": {
    "original": "Text Normalization.",
    "zh": "文本规范化。"
   },
   "blocks": [
    {
     "id": "p-text-normalization-1",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-text-normalization-1-1",
       "original": "We design a generic text normalization pipeline that works well across the languages we consider.",
       "zh": "我们设计了一条通用的文本规范化流水线，在我们考虑的所有语言上都能良好工作。"
      },
      {
       "id": "s-text-normalization-1-2",
       "original": "First, we perform NFKC normalization and lower case all characters.9 NFKC normalization helps to make sure the character encoding is consistent.",
       "zh": "首先，我们执行 NFKC 规范化并将所有字符转为小写。9 NFKC 规范化有助于确保字符编码一致。"
      },
      {
       "id": "s-text-normalization-1-3",
       "original": "Next, we remove HTML tags such as \"&gt;\" or \"nbsp;\".",
       "zh": "接着，我们移除 HTML 标签，例如 \"&gt;\" 或 \"nbsp;\"。"
      },
      {
       "id": "s-text-normalization-1-4",
       "original": "We also remove punctuation and try to perform this carefully by including characters for which we are confident that they are in fact punctuation.10 We noticed that some recordings have a relatively high rate of brackets in the text: our criteria is recordings where at least 3% of verses contain brackets which resulted in about 50 recordings.",
       "zh": "我们还移除标点符号，并谨慎地执行这一步：只包含我们确信确为标点的字符。10 我们注意到，部分录音的文本中括号出现频率较高：我们的标准是至少 3% 的经节包含括号的录音，这样得到约 50 个录音。"
      },
      {
       "id": "s-text-normalization-1-5",
       "original": "We 7For the audio files with no paired text, we perform VAD and segment them into smaller files.",
       "zh": "我们 7对于没有配对文本的音频文件，我们执行 VAD 并将其切分为更小的文件。"
      }
     ]
    },
    {
     "id": "p-text-normalization-2",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-text-normalization-2-1",
       "original": "8Specifically, we measure the correlation of the character frequency distribution for all pairs of the recordings and examine recordings with a correlation lower than 0.99 further.",
       "zh": "8具体而言，我们计算所有录音对之间字符频率分布的相关性，并进一步检查相关性低于 0.99 的录音。"
      }
     ]
    },
    {
     "id": "p-text-normalization-3",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-text-normalization-3-1",
       "original": "9For example, there are two ways to represent Ç (Latin C with combining cedilla): splitting it into Latin capital C and combining cedilla (NFKD), or having a single Unicode character C with cedilla.",
       "zh": "9例如，Ç（拉丁字母 C 加组合软音符）有两种表示方式：拆分为拉丁大写 C 加组合软音符（NFKD），或使用单个 Unicode 字符带软音符的 C。"
      }
     ]
    },
    {
     "id": "p-text-normalization-4",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-text-normalization-4-1",
       "original": "10We obtain an initial set of punctuation characters from the respective Unicode category.",
       "zh": "10我们从相应的 Unicode 类别获取初始标点字符集合。"
      }
     ]
    },
    {
     "id": "p-text-normalization-5",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-text-normalization-5-1",
       "original": "1This morning Tom was going to school. 2Suddenly, it started raining heavily. 3Tom had to go back home.",
       "zh": "1This morning Tom was going to school. 2Suddenly, it started raining heavily. 3Tom had to go back home."
      }
     ]
    },
    {
     "id": "p-text-normalization-6",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-text-normalization-6-1",
       "original": "Alignment Step Splits the long audio file into verse level segments 1This morning Tom was going to school.",
       "zh": "对齐步骤将长音频文件切分为经节级片段 1This morning Tom was going to school."
      }
     ]
    },
    {
     "id": "p-text-normalization-7",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-text-normalization-7-1",
       "original": "2Suddenly, it started raining heavily.",
       "zh": "2Suddenly, it started raining heavily."
      }
     ]
    },
    {
     "id": "p-text-normalization-8",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-text-normalization-8-1",
       "original": "3Tom had to go back home.",
       "zh": "3Tom had to go back home."
      }
     ]
    },
    {
     "id": "fig-text-normalization-1",
     "type": "figure_caption",
     "page": 6,
     "original": "Figure 3: Illustration of Data Alignment. Forced alignment enables segmenting audio recordings and corresponding text into smaller segments that can be used to train machine learning models.",
     "zh": "图 3：数据对齐示意图。强制对齐能够将音频录音和对应文本切分为更小的片段，用于训练机器学习模型。"
    },
    {
     "id": "p-text-normalization-9",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-text-normalization-9-1",
       "original": "listened to a few instances of each recording to verify whether the text in the brackets is present in the audio or not.",
       "zh": "我们聆听了每个录音的一些实例，以验证括号内的文本是否出现在音频中。"
      },
      {
       "id": "s-text-normalization-9-2",
       "original": "In many cases, we noticed that the text in the brackets was not spoken and we removed the brackets and the text within.",
       "zh": "在许多情况下，我们注意到括号内的文本并未被朗读出来，于是我们移除了括号及其中的文本。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-3-1-3",
   "num": "3.1.3",
   "level": 2,
   "page": 6,
   "title": {
    "original": "Scalable Forced Alignment",
    "zh": "可扩展的强制对齐"
   },
   "blocks": [
    {
     "id": "p-3-1-3-1",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-3-1-3-1-1",
       "original": "The chapter recordings from the data source can be up to 43 minutes long which cannot be directly used by current machine learning algorithms: we use Transformer models which require large amounts of GPU memory and their computational complexity is quadratic in the input size.",
       "zh": "来自数据源的章节录音最长可达 43 分钟，无法直接用于当前的机器学习算法：我们使用的 Transformer 模型需要大量 GPU 内存，且其计算复杂度与输入长度呈平方关系。"
      },
      {
       "id": "s-3-1-3-1-2",
       "original": "We therefore segment the data into smaller units so it can be used by standard algorithms.",
       "zh": "因此，我们将数据切分为更小的单元，使其可以被标准算法使用。"
      },
      {
       "id": "s-3-1-3-1-3",
       "original": "Forced alignment determines which parts of the audio correspond to which parts of the text.",
       "zh": "强制对齐（forced alignment）确定音频的哪些部分对应文本的哪些部分。"
      }
     ]
    },
    {
     "id": "p-3-1-3-2",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-3-1-3-2-1",
       "original": "Given this alignment, the data can be segmented in different ways.",
       "zh": "有了这种对齐，数据可以用不同方式切分。"
      },
      {
       "id": "s-3-1-3-2-2",
       "original": "In our case, we segment the data into individual verses which are typically a single sentence but can sometimes contain several sentences.",
       "zh": "在我们的情形中，我们将数据切分为单个经节，通常是一个句子，但有时也包含多个句子。"
      },
      {
       "id": "s-3-1-3-2-3",
       "original": "The average duration of a verse is about 12 seconds.",
       "zh": "一个经节的平均时长约为 12 秒。"
      },
      {
       "id": "s-3-1-3-2-4",
       "original": "Figure 3 illustrates how the alignments enable creating verse-level audio segments for each chapter recording.",
       "zh": "图 3 展示了对齐如何为每个章节录音创建经节级音频片段。"
      },
      {
       "id": "s-3-1-3-2-5",
       "original": "In this section we detail how we perform efficient forced alignment on GPUs.",
       "zh": "在本节中，我们详述如何在 GPU 上执行高效的强制对齐。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-generating-posterior-probabiliti",
   "num": null,
   "level": 2,
   "page": 6,
   "title": {
    "original": "Generating Posterior Probabilities.",
    "zh": "生成后验概率。"
   },
   "blocks": [
    {
     "id": "p-generating-posterior-probabiliti-1",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-generating-posterior-probabiliti-1-1",
       "original": "Forced alignment requires posterior probabilities from an acoustic model which we use for alignment (§3.1.4).",
       "zh": "强制对齐需要来自声学模型的后验概率，我们用它进行对齐（§3.1.4）。"
      },
      {
       "id": "s-generating-posterior-probabiliti-1-2",
       "original": "This acoustic model is a Transformer which requires substantial amounts of memory to store activations which makes it infeasible to use for long audio files.",
       "zh": "该声学模型是一个 Transformer，需要大量内存存储激活值，因此无法用于长音频文件。"
      },
      {
       "id": "s-generating-posterior-probabiliti-1-3",
       "original": "As a workaround, we chunk the audio files into 15 second segments, generate posterior probabilities for each audio frame using the alignment model, and then concatenate these posterior probabilities into a single matrix again.",
       "zh": "作为变通，我们将音频文件切分为 15 秒的片段，用对齐模型为每个音频帧生成后验概率，然后再把这些后验概率拼接回单个矩阵。"
      },
      {
       "id": "s-generating-posterior-probabiliti-1-4",
       "original": "The acoustic model is trained with Connectionist Temporal Classification (CTC; Graves et al. 2006).",
       "zh": "该声学模型使用连接时序分类（CTC；Graves et al. 2006）训练。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-forced-alignment-using-ctc",
   "num": null,
   "level": 2,
   "page": 6,
   "title": {
    "original": "Forced Alignment using CTC.",
    "zh": "使用 CTC 的强制对齐。"
   },
   "blocks": [
    {
     "id": "p-forced-alignment-using-ctc-1",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-forced-alignment-using-ctc-1-1",
       "original": "Next, we perform forced alignment which finds the most likely path in the posterior probabilities for a given input audio sequence of length T and a text transcription of length L.",
       "zh": "接下来，我们执行强制对齐：给定长度为 T 的输入音频序列和长度为 L 的文本转写，在后验概率中寻找最可能的路径。"
      },
      {
       "id": "s-forced-alignment-using-ctc-1-2",
       "original": "These posterior probabilities require O(T × L) memory and a path will be of length T.",
       "zh": "这些后验概率需要 O(T × L) 的内存，且路径长度为 T。"
      },
      {
       "id": "s-forced-alignment-using-ctc-1-3",
       "original": "This path is computed using the Viterbi algorithm.",
       "zh": "该路径使用 Viterbi 算法计算。"
      },
      {
       "id": "s-forced-alignment-using-ctc-1-4",
       "original": "There are open source libraries implementing the algorithm on CPU [Kürzinger et al., 2020, Kahn et al., 2022], however, the CPU versions are slow to run, particularly on long recordings, as we will show below.",
       "zh": "已有在 CPU 上实现该算法的开源库 [Kürzinger et al., 2020, Kahn et al., 2022]，然而 CPU 版本运行缓慢，尤其是在长录音上，我们将在下文展示。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-efficient-forced-alignment-on-gp",
   "num": null,
   "level": 2,
   "page": 6,
   "title": {
    "original": "Efficient Forced Alignment on GPUs.",
    "zh": "GPU 上的高效强制对齐。"
   },
   "blocks": [
    {
     "id": "p-efficient-forced-alignment-on-gp-1",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-efficient-forced-alignment-on-gp-1-1",
       "original": "In order to make force alignment efficient for our purpose, we implemented a GPU version that computes the Viterbi path memory in a memory efficient way.",
       "zh": "为使强制对齐满足我们的效率要求，我们实现了一个 GPU 版本，以内存高效的方式计算 Viterbi 路径。"
      },
      {
       "id": "s-efficient-forced-alignment-on-gp-1-2",
       "original": "Storing all O(T × L) forward values for the Viterbi algorithm is infeasible on GPUs due to memory constraints.",
       "zh": "由于内存限制，在 GPU 上存储 Viterbi 算法全部 O(T × L) 的前向值是不可行的。"
      },
      {
       "id": "s-efficient-forced-alignment-on-gp-1-3",
       "original": "We therefore only store forward values for the current and the previous time-step and regularly transfer the computed backtracking matrices to CPU memory.",
       "zh": "因此，我们只存储当前和上一时间步的前向值，并定期将计算出的回溯矩阵传输到 CPU 内存。"
      },
      {
       "id": "s-efficient-forced-alignment-on-gp-1-4",
       "original": "This reduces the required GPU memory to O(L) compared to O(T × L) and enables forced alignment for very long audio",
       "zh": "这将所需 GPU 内存从 O(T × L) 降至 O(L)，使得对超长音频进行强制对齐成为可能"
      }
     ]
    },
    {
     "id": "eq-efficient-forced-alignment-on-gp-1",
     "type": "equation",
     "page": 7,
     "original": "100"
    },
    {
     "id": "p-efficient-forced-alignment-on-gp-2",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-efficient-forced-alignment-on-gp-2-1",
       "original": "Wall clock time (sec)",
       "zh": "墙上时钟时间（秒）"
      }
     ]
    },
    {
     "id": "eq-efficient-forced-alignment-on-gp-2",
     "type": "equation",
     "page": 7,
     "original": "80"
    },
    {
     "id": "eq-efficient-forced-alignment-on-gp-3",
     "type": "equation",
     "page": 7,
     "original": "60"
    },
    {
     "id": "eq-efficient-forced-alignment-on-gp-4",
     "type": "equation",
     "page": 7,
     "original": "40"
    },
    {
     "id": "eq-efficient-forced-alignment-on-gp-5",
     "type": "equation",
     "page": 7,
     "original": "20"
    },
    {
     "id": "p-efficient-forced-alignment-on-gp-3",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-efficient-forced-alignment-on-gp-3-1",
       "original": "ctc-seg (CPU) Flashlight (CPU) MMS (GPU) 0 100 500 0 Input audio length (sec)",
       "zh": "ctc-seg (CPU) Flashlight (CPU) MMS (GPU) 0 100 500 0 输入音频长度（秒）"
      }
     ]
    },
    {
     "id": "fig-efficient-forced-alignment-on-gp-1",
     "type": "figure_caption",
     "page": 7,
     "original": "Figure 4: Efficiency of Forced Alignment Implementations. The MMS implementation runs on GPU and can process long audio sequences in reasonable time compared to CPU alternatives.",
     "zh": "图 4：强制对齐实现的效率。MMS 的实现在 GPU 上运行，相比 CPU 替代方案，能在合理时间内处理长音频序列。"
    },
    {
     "id": "p-efficient-forced-alignment-on-gp-4",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-efficient-forced-alignment-on-gp-4-1",
       "original": "some respectable house provided text i shall rent a room in some respectable house some respectable house i shall rent a room in some respectable house",
       "zh": "some respectable house provided text i shall rent a room in some respectable house some respectable house i shall rent a room in some respectable house"
      }
     ]
    },
    {
     "id": "fig-efficient-forced-alignment-on-gp-2",
     "type": "figure_caption",
     "page": 7,
     "original": "Figure 5: Illustration of the ⟨∗⟩Token in Forced Alignment. We show the text to which we would like to align the audio at the top and what is actually spoken at the bottom in italics. Left: erroneous alignment when the provided text is incomplete. The word some is aligned incorrectly. Right: using ⟨∗⟩token at the beginning enables correct alignment of the provided text.",
     "zh": "图 5：强制对齐中 ⟨∗⟩ token 的示意图。顶部展示我们希望对齐音频的目标文本，底部斜体展示实际朗读的内容。左：当所给文本不完整时的错误对齐——单词 some 被错误对齐。右：在开头使用 ⟨∗⟩ token 使所给文本得以正确对齐。"
    },
    {
     "id": "p-efficient-forced-alignment-on-gp-5",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-efficient-forced-alignment-on-gp-5-1",
       "original": "sequences at high speed.",
       "zh": "序列，且速度很快。"
      },
      {
       "id": "s-efficient-forced-alignment-on-gp-5-2",
       "original": "Appendix A illustrates the algorithm and an implementation is available as part of TorchAudio [Yang et al., 2021].11",
       "zh": "附录 A 演示了该算法，其实现已作为 TorchAudio [Yang et al., 2021] 的一部分提供。11"
      }
     ]
    },
    {
     "id": "fig-efficient-forced-alignment-on-gp-3",
     "type": "figure_caption",
     "page": 7,
     "original": "Figure 4 shows that the forced alignment implementation scales much better to longer sequences than CPU alternatives such as ctc-segmentation [Kürzinger et al., 2020], a popular segmentation library used in ESPNet [Watanabe et al., 2018], SpeechBrain [Ravanelli et al., 2021] and Flashlight [Kahn et al., 2022].",
     "zh": "图 4 表明，强制对齐实现对长序列的扩展性远好于 CPU 替代方案，例如 ctc-segmentation [Kürzinger et al., 2020]——这是 ESPNet [Watanabe et al., 2018]、SpeechBrain [Ravanelli et al., 2021] 中常用的切分库——以及 Flashlight [Kahn et al., 2022]。"
    }
   ]
  },
  {
   "id": "sec-robust-alignment-for-noisy-trans",
   "num": null,
   "level": 2,
   "page": 7,
   "title": {
    "original": "Robust Alignment for Noisy Transcripts.",
    "zh": "面向含噪转写的鲁棒对齐。"
   },
   "blocks": [
    {
     "id": "p-robust-alignment-for-noisy-trans-1",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-robust-alignment-for-noisy-trans-1-1",
       "original": "For many recordings, speakers introduce the chapter name and the version of the New Testament before reading the first verse, however, the corresponding text does not contain this information.",
       "zh": "在许多录音中，说话人会在朗读第一节经文之前先介绍章节名和《新约》的版本，但对应文本并不包含这些信息。"
      },
      {
       "id": "s-robust-alignment-for-noisy-trans-1-2",
       "original": "This is problematic for forced alignment because the algorithm will still try to align the beginning of the audio to the text which can result in incorrect alignments.",
       "zh": "这对强制对齐是个问题，因为算法仍会尝试把音频开头与文本对齐，可能导致错误的对齐结果。"
      },
      {
       "id": "s-robust-alignment-for-noisy-trans-1-3",
       "original": "Another challenge is that numbers are generally spelled as digits in the text whereas our alignment model is trained on existing corpora which follow common practice of spelling numbers out fully (§3.1.4).",
       "zh": "另一个挑战是，文本中的数字通常以阿拉伯数字书写，而我们的对齐模型是在遵循常见做法、将数字完整拼读出来的现有语料上训练的（§3.1.4）。"
      },
      {
       "id": "s-robust-alignment-for-noisy-trans-1-4",
       "original": "Spelling numbers out requires language-specific and hand-crafted tooling which is not available for the 1,107 languages we consider.",
       "zh": "数字拼读需要针对特定语言的手工工具，而我们考虑的 1,107 种语言并没有这样的工具。"
      }
     ]
    },
    {
     "id": "p-robust-alignment-for-noisy-trans-2",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-robust-alignment-for-noisy-trans-2-1",
       "original": "To enable robust alignment in both cases, we introduce a star token (⟨∗⟩; Pratap et al. 2022, Cai et al. 2022) to which audio segments can be mapped if there is no good alternative in the text.12 We insert ⟨∗⟩at the beginning of the text data of each chapter and replace numerical digits with ⟨∗⟩ throughout.",
       "zh": "为了在这两种情况下都能实现鲁棒对齐，我们引入了一个星号 token（⟨∗⟩；Pratap et al. 2022, Cai et al. 2022），当文本中没有好的对应项时，音频片段可以映射到该 token。12 我们在每章文本数据的开头插入 ⟨∗⟩，并将所有数字替换为 ⟨∗⟩。"
      },
      {
       "id": "s-robust-alignment-for-noisy-trans-2-2",
       "original": "The posterior probability for this token is set to one.",
       "zh": "该 token 的后验概率设为 1。"
      },
      {
       "id": "s-robust-alignment-for-noisy-trans-2-3",
       "original": "After alignment, we add back the original digits and the subsequent data filtering often removes segments where the audio contains additional information not present in the aligned text (§3.1.6).",
       "zh": "对齐完成后，我们恢复原始数字；而后续的数据过滤通常会移除音频中包含对齐文本所没有的额外信息的片段（§3.1.6）。"
      },
      {
       "id": "s-robust-alignment-for-noisy-trans-2-4",
       "original": "Figure 5 illustrates how adding the ⟨∗⟩ token helps to improve alignment when the paired text does not cover the beginning of the audio.",
       "zh": "图 5 展示了当配对文本不覆盖音频开头时，添加 ⟨∗⟩ token 如何改进对齐。"
      }
     ]
    },
    {
     "id": "p-robust-alignment-for-noisy-trans-3",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-robust-alignment-for-noisy-trans-3-1",
       "original": "11https://github.com/pytorch/audio 12This is different from an OOV token or silence token in an HMM topology, which model a certain type of acoustic behavior and are independent from other in-vocabulary tokens.",
       "zh": "11https://github.com/pytorch/audio 12这不同于 HMM 拓扑中的 OOV token 或静音 token——后者建模某种特定声学行为，且与其他词表内 token 相互独立。"
      }
     ]
    },
    {
     "id": "p-robust-alignment-for-noisy-trans-4",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-robust-alignment-for-noisy-trans-4-1",
       "original": "Text Language 你叫什么名字 Mandarin Chinese आप कैसे ह( Hindi Qué música te gusta Spanish French Je suis ravi de vous rencontrer Arabic ﻣﻨﺪواﻋﻲ ﺳﺮوري ﻣﻘﺎﺑﻠﺘﻚ uroman nijiaoshenmemingzi aap kaise haim Que musica te gusta Je suis ravi de vous rencontrer mndwa'y srwry mqabltk",
       "zh": "文本 语言 你叫什么名字 中文普通话 आप कैसे ह( 印地语 Qué música te gusta 西班牙语 法语 Je suis ravi de vous rencontrer 阿拉伯语 ﻣﻨﺪواﻋﻲ ﺳﺮوري ﻣﻘﺎﺑﻠﺘﻚ uroman nijiaoshenmemingzi aap kaise haim Que musica te gusta Je suis ravi de vous rencontrer mndwa'y srwry mqabltk"
      }
     ]
    },
    {
     "id": "tab-robust-alignment-for-noisy-trans-1",
     "type": "table_caption",
     "page": 8,
     "original": "Table 1: Illustration of Text Encoding for Forced Alignment. Example outputs of uroman [Hermjakob et al., 2018].",
     "zh": "表 1：强制对齐的文本编码示意。uroman [Hermjakob et al., 2018] 的示例输出。"
    }
   ]
  },
  {
   "id": "sec-3-1-4",
   "num": "3.1.4",
   "level": 2,
   "page": 8,
   "title": {
    "original": "Initial Data Alignment Acoustic Model.",
    "zh": "初始数据对齐 声学模型。"
   },
   "blocks": [
    {
     "id": "p-3-1-4-1",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-3-1-4-1-1",
       "original": "To perform the forced alignment, prior work typically uses acoustic models trained on data in the same language.",
       "zh": "为执行强制对齐，先前工作通常使用在同种语言数据上训练的声学模型。"
      },
      {
       "id": "s-3-1-4-1-2",
       "original": "For example, for the eight languages of the MLS dataset Pratap et al. [2020c] the authors used acoustic models trained on existing data for these languages.",
       "zh": "例如，对于 MLS 数据集的八种语言，Pratap et al. [2020c] 的作者使用了在这些语言现有数据上训练的声学模型。"
      },
      {
       "id": "s-3-1-4-1-3",
       "original": "However, our setting includes many languages for which no datasets or acoustic models exist.",
       "zh": "然而，我们的设置包含许多不存在数据集或声学模型的语言。"
      },
      {
       "id": "s-3-1-4-1-4",
       "original": "We therefore train a multilingual acoustic model on FLEURS [Conneau et al., 2022] and CommonVoice 8.0 [Ardila et al., 2020] to learn a shared representation across languages which we hope to generalize to unseen languages.",
       "zh": "因此，我们在 FLEURS [Conneau et al., 2022] 和 CommonVoice 8.0 [Ardila et al., 2020] 上训练一个多语言声学模型，学习跨语言的共享表示，希望它能泛化到未见语言。"
      },
      {
       "id": "s-3-1-4-1-5",
       "original": "The multilingual model is based on fine-tuning XLS-R [Babu et al., 2022] using a total 8K hours of data covering 127 languages.",
       "zh": "该多语言模型基于对 XLS-R [Babu et al., 2022] 的微调，使用了覆盖 127 种语言的共 8K 小时数据。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-text-encoding",
   "num": null,
   "level": 2,
   "page": 8,
   "title": {
    "original": "Text Encoding.",
    "zh": "文本编码。"
   },
   "blocks": [
    {
     "id": "p-text-encoding-1",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-text-encoding-1-1",
       "original": "The text data is represented using the uroman transliteration tool [Hermjakob et al., 2018] which maps different writing scripts to a common Latin script representation.13 This is done using character descriptions based on Unicode tables and a large number of additional heuristics and it has language-specific romanization rules for some languages.",
       "zh": "文本数据使用 uroman 转写工具 [Hermjakob et al., 2018] 表示，它将不同书写文字映射到统一的拉丁文字表示。13 这通过基于 Unicode 表的字符描述和大量额外的启发式规则完成，并对部分语言设有特定语言的罗马化规则。"
      },
      {
       "id": "s-text-encoding-1-2",
       "original": "Prior work [Black, 2019] used Unitran [Yoon et al., 2007, Qian et al., 2010, Black, 2019] which converts UTF-8 encoded text into a phonetic transcription in either WorldBet [Hieronymus, 1993] or X-SAMPA [Wells, 1995].",
       "zh": "先前工作 [Black, 2019] 使用 Unitran [Yoon et al., 2007, Qian et al., 2010, Black, 2019]，将 UTF-8 编码的文本转换为 WorldBet [Hieronymus, 1993] 或 X-SAMPA [Wells, 1995] 的音标转写。"
      }
     ]
    },
    {
     "id": "p-text-encoding-2",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-text-encoding-2-1",
       "original": "Inspired by Black [2019], we initially investigated X-SAMPA but found that uroman led to similar quality results and we decided to use uroman since it is easier to interpret compared to International Phonetic Alphabet (IPA) based symbols generated by Unitran.",
       "zh": "受 Black [2019] 启发，我们最初考察了 X-SAMPA，但发现 uroman 能得到质量相近的结果；我们决定使用 uroman，因为相比 Unitran 生成的基于国际音标（IPA）的符号，它更容易解读。"
      },
      {
       "id": "s-text-encoding-2-2",
       "original": "Table 1 shows some example outputs from uroman.",
       "zh": "表 1 展示了 uroman 的一些示例输出。"
      },
      {
       "id": "s-text-encoding-2-3",
       "original": "We lowercase all the letters of the uroman output and retain only a to z characters as well as the apostrophe character to train acoustic models for forced alignment (§ 3.1.3).",
       "zh": "我们将 uroman 输出的所有字母转为小写，只保留 a 到 z 字符和撇号字符，用于训练强制对齐的声学模型（§ 3.1.3）。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-3-1-5",
   "num": "3.1.5",
   "level": 2,
   "page": 8,
   "title": {
    "original": "Improved Data Alignment",
    "zh": "改进数据对齐"
   },
   "blocks": [
    {
     "id": "p-3-1-5-1",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-3-1-5-1-1",
       "original": "To improve the alignments, we use a subset of good-quality samples to train a new alignment model.",
       "zh": "为改进对齐，我们使用一个高质量样本子集来训练新的对齐模型。"
      },
      {
       "id": "s-3-1-5-1-2",
       "original": "Samples are selected based on a score which is the length-normalized difference between the probability of the forced alignment path P(Y aligned | X) and the probability of greedy decoding from the alignment model P(Y greedy | X).",
       "zh": "样本的选择基于一个分数：强制对齐路径概率 P(Y aligned | X) 与对齐模型贪心解码概率 P(Y greedy | X) 之间经长度归一化的差值。"
      },
      {
       "id": "s-3-1-5-1-3",
       "original": "The former is constrained by the text used in the alignment and the latter is unconstrained.",
       "zh": "前者受对齐所用文本的约束，后者不受约束。"
      },
      {
       "id": "s-3-1-5-1-4",
       "original": "A large difference between these two quantities may indicate that the alignment is incorrect.14 Concretely, the score is",
       "zh": "这两个量之间的较大差值可能表明对齐不正确。14 具体而言，该分数为"
      }
     ]
    },
    {
     "id": "eq-3-1-5-1",
     "type": "equation",
     "page": 8,
     "original": "1 T log P(Y aligned | X) −log P(Y greedy | X) (1)"
    },
    {
     "id": "p-3-1-5-2",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-3-1-5-2-1",
       "original": "where T is the length of the audio.",
       "zh": "其中 T 是音频长度。"
      },
      {
       "id": "s-3-1-5-2-2",
       "original": "The score can vary from −inf, indicating low quality samples, to 0, indicating high quality samples.",
       "zh": "该分数可以从 −inf（表示低质量样本）变化到 0（表示高质量样本）。"
      },
      {
       "id": "s-3-1-5-2-3",
       "original": "After manual inspection of sample quality and their corresponding score for several languages, we select −0.2 as the threshold and choose samples with scores greater than this threshold.",
       "zh": "在对若干语言的样本质量及其对应分数进行人工检查后，我们选择 −0.2 作为阈值，选取分数高于该阈值的样本。"
      },
      {
       "id": "s-3-1-5-2-4",
       "original": "The improved alignment model is trained on a total of 31K hours in 1,130 languages which includes the data we used for the initial alignment model.15 We use this new model to re-generate verse level alignments for our data.",
       "zh": "改进后的对齐模型在覆盖 1,130 种语言的共 31K 小时数据上训练，其中包括我们用于初始对齐模型的数据。15 我们用这个新模型为数据重新生成经节级对齐。"
      }
     ]
    },
    {
     "id": "p-3-1-5-3",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-3-1-5-3-1",
       "original": "13https://www.isi.edu/~ulf/uroman.html 14It may also indicate that the alignment model is of poor quality but in practice we found that the metric identifies many incorrect alignments.",
       "zh": "13https://www.isi.edu/~ulf/uroman.html 14它也可能表明对齐模型本身质量较差，但实践中我们发现该指标能识别出许多不正确的对齐。"
      }
     ]
    },
    {
     "id": "p-3-1-5-4",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-3-1-5-4-1",
       "original": "15This model is available at https://github.com/facebookresearch/fairseq/tree/main/ examples/mms 200 Ruching Palaung Lampung Api 150 Number of hours Nyankole Taabwa Kumyk Timne Ikwo Akha Fijian 100 Gilaki 50 0 Makhuwa-Meetto Tagalog Mbandja Hindi Nyole Yemba Naxi Rejang Bashkir Avaric Hebrew Welsh Kamwe 0 200 400 600 800 1000 Languages",
       "zh": "15该模型见 https://github.com/facebookresearch/fairseq/tree/main/ examples/mms 200 Ruching Palaung Lampung Api 150 小时数 Nyankole Taabwa Kumyk Timne Ikwo Akha Fijian 100 Gilaki 50 0 Makhuwa-Meetto Tagalog Mbandja Hindi Nyole Yemba Naxi Rejang Bashkir Avaric Hebrew Welsh Kamwe 0 200 400 600 800 1000 语言"
      }
     ]
    },
    {
     "id": "fig-3-1-5-1",
     "type": "figure_caption",
     "page": 9,
     "original": "Figure 6: MMS-lab: Amount of Speech Data across Languages. We show the size of the training data sets and name some of the 1,107 languages.",
     "zh": "图 6：MMS-lab：各语言的语音数据量。我们展示训练数据集的规模，并列出 1,107 种语言中的一部分名称。"
    }
   ]
  },
  {
   "id": "sec-3-1-6",
   "num": "3.1.6",
   "level": 2,
   "page": 9,
   "title": {
    "original": "Final Data Filtering",
    "zh": "最终数据过滤"
   },
   "blocks": [
    {
     "id": "p-3-1-6-1",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-3-1-6-1-1",
       "original": "After generating the improved alignments, we noticed that some samples are still of low quality.",
       "zh": "在生成改进的对齐之后，我们注意到仍有一些样本质量较低。"
      },
      {
       "id": "s-3-1-6-1-2",
       "original": "Some recordings are not entirely faithful to the text and speakers sometimes add their own interpretation or paraphrase parts of the text.",
       "zh": "部分录音并不完全忠实于文本，说话人有时会加入自己的解释或转述部分文本内容。"
      },
      {
       "id": "s-3-1-6-1-3",
       "original": "This will negatively impact ASR and TTS models trained on the data and we therefore perform a final data filtering step to improve data quality as much as possible.",
       "zh": "这会对在该数据上训练的 ASR 和 TTS 模型产生负面影响，因此我们执行最终的数据过滤步骤，以尽可能提高数据质量。"
      }
     ]
    },
    {
     "id": "p-3-1-6-2",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-3-1-6-2-1",
       "original": "We we train monolingual ASR models on half of the the aligned samples of each recording, measure performance on the remaining half and remove samples which have a character error rate (CER) in excess of 10%.",
       "zh": "我们在每个录音一半的对齐样本上训练单语 ASR 模型，在另一半上测量性能，并移除字错误率（CER）超过 10% 的样本。"
      },
      {
       "id": "s-3-1-6-2-2",
       "original": "This removes about 1.7% of all samples across all languages.",
       "zh": "这移除了所有语言中约 1.7% 的样本。"
      }
     ]
    },
    {
     "id": "p-3-1-6-3",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-3-1-6-3-1",
       "original": "High CER may be due to low quality samples in either half of the data, that is the training data of the ASR model or the data being evaluated.",
       "zh": "高 CER 可能源于数据任意一半中的低质量样本，即 ASR 模型的训练数据或被评估的数据。"
      },
      {
       "id": "s-3-1-6-3-2",
       "original": "To help ensure we use recordings that are generally of good quality, we remove 3837 recordings which have CER in excess of 5% on the developmet set.",
       "zh": "为确保所用录音总体质量良好，我们移除了 3837 个在开发集上 CER 超过 5% 的录音。"
      },
      {
       "id": "s-3-1-6-3-3",
       "original": "We retain a total of 1,239 recordings covering 1,107 languages.",
       "zh": "我们共保留 1,239 个录音，覆盖 1,107 种语言。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-3-1-7",
   "num": "3.1.7",
   "level": 2,
   "page": 9,
   "title": {
    "original": "Creating train/dev/test splits",
    "zh": "划分训练/开发/测试集"
   },
   "blocks": [
    {
     "id": "p-3-1-7-1",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-3-1-7-1-1",
       "original": "The recordings often contain only a single speaker which makes it challenging to measure generalization performance of models trained on this data.",
       "zh": "这些录音通常只包含单一说话人，这使得衡量在该数据上训练的模型的泛化性能颇具挑战。"
      },
      {
       "id": "s-3-1-7-1-2",
       "original": "This is why we evaluate models trained on MMS-lab data on existing benchmarks as much as possible in the remainder of this paper.",
       "zh": "因此在本文余下部分，我们尽可能在现有基准上评估在 MMS-lab 数据上训练的模型。"
      },
      {
       "id": "s-3-1-7-1-3",
       "original": "The advantage of this is that it side steps the aforementioned issues and it also enables us to better understand how the data can be useful in other domains.",
       "zh": "这样做的好处是绕开了上述问题，也让我们能更好地理解这些数据在其他领域的可用性。"
      }
     ]
    },
    {
     "id": "p-3-1-7-2",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-3-1-7-2-1",
       "original": "However, existing benchmarks only cover a small fraction of the languages in MMS-lab and in order to be able to develop models for all languages, we split the aligned recordings into train/dev/test splits.",
       "zh": "然而，现有基准只覆盖 MMS-lab 中一小部分语言；为了能为所有语言开发模型，我们将对齐后的录音划分为训练/开发/测试集。"
      },
      {
       "id": "s-3-1-7-2-2",
       "original": "We aim to make the content of the splits as disjoint from each other as possible and use a similar split across different recordings.",
       "zh": "我们力求使各划分的内容尽量互不相交，并在不同录音间使用相似的划分。"
      },
      {
       "id": "s-3-1-7-2-3",
       "original": "To do so, we try to use different books for each split and use the same books for each split across recordings and languages as much as possible.",
       "zh": "为此，我们尽量为每个划分使用不同的书卷，并尽可能在各录音和语言间为每个划分使用相同的书卷。"
      }
     ]
    },
    {
     "id": "p-3-1-7-3",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-3-1-7-3-1",
       "original": "Concretely, we use the book Mark (MRK) as development set, the book John (JHN) as test set and the remaining books for training.",
       "zh": "具体而言，我们用《马可福音》（MRK）作为开发集，《约翰福音》（JHN）作为测试集，其余书卷用于训练。"
      },
      {
       "id": "s-3-1-7-3-2",
       "original": "For the 147 recordings where not all 260 chapters are available, we deviate from this and make a best effort split by books depending on which books are available in the respective recording.",
       "zh": "对于 147 个并非全部 260 章都可用的录音，我们偏离这一做法，根据相应录音中可用的书卷尽力按书卷划分。"
      },
      {
       "id": "s-3-1-7-3-3",
       "original": "In this case, we aim to have at least 10% of all available data in the development set and the test set each, or at most two hours of data in each set, whichever is less.",
       "zh": "在这种情况下，我们力求使开发集和测试集各占全部可用数据的至少 10%，或各至多两小时数据，取两者中较小者。"
      }
     ]
    },
    {
     "id": "p-3-1-7-4",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-3-1-7-4-1",
       "original": "The final dataset contains 44.7K hours of paired speech data where we use 36.8K hours for training (82.3%), 3.5K hours for development (7.8%) and 4.4K hours for testing (9.9%).",
       "zh": "最终数据集包含 44.7K 小时的配对语音数据，其中 36.8K 小时用于训练（82.3%），3.5K 小时用于开发（7.8%），4.4K 小时用于测试（9.9%）。"
      },
      {
       "id": "s-3-1-7-4-2",
       "original": "For each language, the train split contains an average of 32 hours (stddev=19), the dev split contains an average of 3.1 hours (stddev=1.8) and test split an average of 3.9 hours (stddev=2.3).",
       "zh": "对每种语言，训练集平均 32 小时（stddev=19），开发集平均 3.1 小时（stddev=1.8），测试集平均 3.9 小时（stddev=2.3）。"
      },
      {
       "id": "s-3-1-7-4-3",
       "original": "Figure 6 shows the data distribution across languages.",
       "zh": "图 6 展示了各语言的数据分布。"
      }
     ]
    },
    {
     "id": "p-3-1-7-5",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-3-1-7-5-1",
       "original": "128 64 Luxembourgish North Ndebele 32 Pampanga Kimbundu Shambala 16 Number of hours Taabwa Urhobo Finnish Danish Fuliiru Welsh Igala 8 4 2 1 0.5 0.25 Minangkabau Ngambay Slovenian Sena Japanese Dhundari Tamil Czech Bakhtiari Ghomálá' Italian Morisyen Maranao Kirghiz Nyanja Gofa Tulu Halbi 0 500 1000 1500 2000 2500 3000 3500 Languages",
       "zh": "128 64 Luxembourgish North Ndebele 32 Pampanga Kimbundu Shambala 16 小时数 Taabwa Urhobo Finnish Danish Fuliiru Welsh Igala 8 4 2 1 0.5 0.25 Minangkabau Ngambay Slovenian Sena Japanese Dhundari Tamil Czech Bakhtiari Ghomálá' Italian Morisyen Maranao Kirghiz Nyanja Gofa Tulu Halbi 0 500 1000 1500 2000 2500 3000 3500 语言"
      }
     ]
    },
    {
     "id": "fig-3-1-7-1",
     "type": "figure_caption",
     "page": 10,
     "original": "Figure 7: MMS-unlab: Amount of Speech Data across Languages. We show the size of the training data sets and name a few of the 3,809 languages.",
     "zh": "图 7：MMS-unlab：各语言的语音数据量。我们展示训练数据集的规模，并列出 3,809 种语言中的一部分名称。"
    }
   ]
  },
  {
   "id": "sec-3-2",
   "num": "3.2",
   "level": 2,
   "page": 10,
   "title": {
    "original": "Unpaired Data for 3,809 Languages (MMS-unlab) Data Source.",
    "zh": "3,809 种语言的非配对数据（MMS-unlab） 数据来源。"
   },
   "blocks": [
    {
     "id": "p-3-2-1",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-3-2-1-1",
       "original": "The data source for this dataset is Global Recordings Network which provides recordings of Bible stories, evangelistic messages, scripture readings, and songs in more than 6,255 languages and dialects.16 The audio files are not accompanied by a corresponding text transcription but the source makes clear which language is being spoken.",
       "zh": "该数据集的数据来源是 Global Recordings Network，它提供超过 6,255 种语言和方言的圣经故事、福音信息、经文朗读和歌曲录音。16 这些音频文件没有相应的文本转写，但该来源明确标注了所说的语言。"
      },
      {
       "id": "s-3-2-1-2",
       "original": "We group the data by language, combining dialects of the same language resulting in a total of 3,860 languages and 9,345 hours of audio.",
       "zh": "我们按语言对数据分组，合并同一语言的各方言，得到共 3,860 种语言、9,345 小时音频。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-pre-processing",
   "num": null,
   "level": 2,
   "page": 10,
   "title": {
    "original": "Pre-processing.",
    "zh": "预处理。"
   },
   "blocks": [
    {
     "id": "p-pre-processing-1",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-pre-processing-1-1",
       "original": "We convert the audio files to single channel and a sample rate of 16kHz.",
       "zh": "我们将音频文件转换为单声道、16kHz 采样率。"
      },
      {
       "id": "s-pre-processing-1-2",
       "original": "Next, we use inaSpeechSegmenter [Doukhan et al., 2018], a CNN-based audio segmentation model, to identify segments of speech, music, noise and silence in the audio.",
       "zh": "接着，我们使用 inaSpeechSegmenter [Doukhan et al., 2018]——一个基于 CNN 的音频切分模型——来识别音频中的语音、音乐、噪声和静音片段。"
      },
      {
       "id": "s-pre-processing-1-3",
       "original": "If two segments of speech are separated by intermediate segments containing music or noise, then we consider joining these segments if the intermediate segment is no longer than 20% of all segments together.",
       "zh": "如果两段语音被包含音乐或噪声的中间片段隔开，那么当中间片段不超过所有片段总长的 20% 时，我们考虑将这些片段拼接起来。"
      },
      {
       "id": "s-pre-processing-1-4",
       "original": "This is to build samples that are of longer duration and still contain mostly speech.",
       "zh": "这样做是为了构建时长更长、且仍主要由语音组成的样本。"
      },
      {
       "id": "s-pre-processing-1-5",
       "original": "The remaining non-speech segments are discarded.",
       "zh": "剩余的非语音片段被丢弃。"
      }
     ]
    },
    {
     "id": "p-pre-processing-2",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-pre-processing-2-1",
       "original": "Next, we randomly split the speech segments into portions of between 5.5 and 30 seconds.",
       "zh": "接下来，我们将语音片段随机切分为 5.5 到 30 秒之间的部分。"
      },
      {
       "id": "s-pre-processing-2-2",
       "original": "This makes the data usable for training downstream models and creates a length distribution of the samples that is in line with other datasets such as FLEURS where the average sample length is about 12 seconds.",
       "zh": "这使数据可用于训练下游模型，并使样本的长度分布与 FLEURS 等其他数据集一致——后者的平均样本长度约为 12 秒。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-dataset-split",
   "num": null,
   "level": 2,
   "page": 10,
   "title": {
    "original": "Dataset Split.",
    "zh": "数据集划分。"
   },
   "blocks": [
    {
     "id": "p-dataset-split-1",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-dataset-split-1-1",
       "original": "Finally, we split the samples of each language randomly into 80% training data, 10% development data, and 10% test data.",
       "zh": "最后，我们将每种语言的样本随机划分为 80% 训练数据、10% 开发数据和 10% 测试数据。"
      },
      {
       "id": "s-dataset-split-1-2",
       "original": "We also remove 51 languages for which we have less than 5 minutes of training data to ensure we have sufficient data to train models.",
       "zh": "我们还移除了训练数据不足 5 分钟的 51 种语言，以确保有足够数据训练模型。"
      },
      {
       "id": "s-dataset-split-1-3",
       "original": "The final dataset comprises a total of 7.7K hours of data in 3,809 languages.",
       "zh": "最终数据集包含 3,809 种语言、共 7.7K 小时数据。"
      },
      {
       "id": "s-dataset-split-1-4",
       "original": "The training portion is 6.2K hours and there are 770 hours for the valid and test sets each.",
       "zh": "训练部分为 6.2K 小时，验证集和测试集各 770 小时。"
      },
      {
       "id": "s-dataset-split-1-5",
       "original": "For each language, the train set contains an average of 97 minutes (stddev=177.4), and the dev/test sets contain an average of 12.1 minutes (stddev=22.3).",
       "zh": "对每种语言，训练集平均 97 分钟（stddev=177.4），开发/测试集平均 12.1 分钟（stddev=22.3）。"
      },
      {
       "id": "s-dataset-split-1-6",
       "original": "Figure 7 shows the data distribution across languages.",
       "zh": "图 7 展示了各语言的数据分布。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-3-3",
   "num": "3.3",
   "level": 2,
   "page": 10,
   "title": {
    "original": "Comparison to Existing Broad Coverage Approaches and Other Datasets",
    "zh": "与现有广覆盖方法及其他数据集的对比"
   },
   "blocks": [
    {
     "id": "p-3-3-1",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-3-3-1-1",
       "original": "In this section, we present a comparison to two related studies which aimed to expand speech technology to many languages.",
       "zh": "在本节中，我们对比两项同样旨在将语音技术扩展到众多语言的相关研究。"
      },
      {
       "id": "s-3-3-1-2",
       "original": "The CMU Wilderness project [Black, 2019] also used New Testament data to build speech synthesis models for 699 languages (§3.3.1) and ASR-2K [Li et al., 2022] focused on automatic speech recognition for nearly two thousand languages (§3.3.2).",
       "zh": "CMU Wilderness 项目 [Black, 2019] 同样使用《新约》数据为 699 种语言构建语音合成模型（§3.3.1），而 ASR-2K [Li et al., 2022] 聚焦于近两千种语言的自动语音识别（§3.3.2）。"
      },
      {
       "id": "s-3-3-1-3",
       "original": "Finally, we assess the viability of the new data for building machine learning models by comparing the performance of ASR models trained on MMS-lab to models trained on an existing dataset in an out-of-domain setting (§3.3.3).",
       "zh": "最后，我们在分布外（OOD）设置下，将在 MMS-lab 上训练的 ASR 模型与在现有数据集上训练的模型进行性能对比，以评估新数据用于构建机器学习模型的可行性（§3.3.3）。"
      }
     ]
    },
    {
     "id": "p-3-3-2",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-3-3-2-1",
       "original": "16https://globalrecordings.net/",
       "zh": "16https://globalrecordings.net/"
      }
     ]
    },
    {
     "id": "eq-3-3-1",
     "type": "equation",
     "page": 11,
     "original": "20"
    },
    {
     "id": "p-3-3-3",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-3-3-3-1",
       "original": "CMU Wilderness MMS-lab",
       "zh": "CMU Wilderness MMS-lab"
      }
     ]
    },
    {
     "id": "eq-3-3-2",
     "type": "equation",
     "page": 11,
     "original": "15"
    },
    {
     "id": "p-3-3-4",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-3-3-4-1",
       "original": "CER CER",
       "zh": "CER CER"
      }
     ]
    },
    {
     "id": "eq-3-3-3",
     "type": "equation",
     "page": 11,
     "original": "10"
    },
    {
     "id": "eq-3-3-4",
     "type": "equation",
     "page": 11,
     "original": "5"
    },
    {
     "id": "p-3-3-5",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-3-3-5-1",
       "original": "por eng tel",
       "zh": "por eng tel"
      }
     ]
    },
    {
     "id": "fig-3-3-1",
     "type": "figure_caption",
     "page": 11,
     "original": "Figure 8: MMS-lab vs. CMU Wilderness. Character Error Rate of ASR models in English (eng), Portuguese (por) and Telugu (tel) on the FLEURS dev set.",
     "zh": "图 8：MMS-lab 与 CMU Wilderness 对比。英语（eng）、葡萄牙语（por）和泰卢固语（tel）ASR 模型在 FLEURS 开发集上的字错误率。"
    }
   ]
  },
  {
   "id": "sec-3-3-1",
   "num": "3.3.1",
   "level": 2,
   "page": 11,
   "title": {
    "original": "CMU Wilderness Dataset",
    "zh": "CMU Wilderness 数据集"
   },
   "blocks": [
    {
     "id": "p-3-3-1-1",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-3-3-1-1-1",
       "original": "Common Voice MMS-lab",
       "zh": "Common Voice MMS-lab"
      }
     ]
    },
    {
     "id": "eq-3-3-1-1",
     "type": "equation",
     "page": 11,
     "original": "20"
    },
    {
     "id": "eq-3-3-1-2",
     "type": "equation",
     "page": 11,
     "original": "10"
    },
    {
     "id": "eq-3-3-1-3",
     "type": "equation",
     "page": 11,
     "original": "0"
    },
    {
     "id": "p-3-3-1-2",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-3-3-1-2-1",
       "original": "spa deupor ara rus eng cym tam cat tur tha fra fas ukr nld pol swh lug",
       "zh": "spa deupor ara rus eng cym tam cat tur tha fra fas ukr nld pol swh lug"
      }
     ]
    },
    {
     "id": "fig-3-3-1-1",
     "type": "figure_caption",
     "page": 11,
     "original": "Figure 9: MMS-lab vs. Common Voice. Character Error Rate on FLEURS dev set for ASR models trained on Common Voice (CV) data and MMS-lab data for 18 languages.",
     "zh": "图 9：MMS-lab 与 Common Voice 对比。在 Common Voice（CV）数据和 MMS-lab 数据上为 18 种语言训练的 ASR 模型在 FLEURS 开发集上的字错误率。"
    },
    {
     "id": "p-3-3-1-3",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-3-3-1-3-1",
       "original": "The most comparable prior work is the CMU Wilderness project which used data from similar sources [Black, 2019].",
       "zh": "最具可比性的先前工作是 CMU Wilderness 项目，它使用了来自类似来源的数据 [Black, 2019]。"
      },
      {
       "id": "s-3-3-1-3-2",
       "original": "To better understand how our data creation process compares to their method, we conduct a best effort side-by-side reproduction of their process and use the resulting data to train monolingual ASR models under the same settings.17 To compare the effectiveness of their data creation method to ours (§3.1), we take the original data from our data source and apply either our protocol or the protocol of Black [2019].",
       "zh": "为了更好地理解我们的数据创建流程与其方法的差异，我们尽最大努力对他们的流程进行并排复现，并用所得数据在相同设置下训练单语 ASR 模型。17 为比较他们的数据创建方法与我们的方法（§3.1）的效果，我们从数据源取原始数据，分别应用我们的流程或 Black [2019] 的流程。"
      },
      {
       "id": "s-3-3-1-3-3",
       "original": "For languages where multiple recordings exist, we only use the recordings used in the CMU Wilderness dataset to enable a better comparison.",
       "zh": "对于存在多个录音的语言，我们只使用 CMU Wilderness 数据集中所用的录音，以便更好地对比。"
      },
      {
       "id": "s-3-3-1-3-4",
       "original": "Next, we use the resulting data to fine-tune XLS-R models [Babu et al., 2022] for monolingual ASR and then measure accuracy in terms of character error rate on the FLEURS dev set.",
       "zh": "接着，我们用所得数据微调 XLS-R 模型 [Babu et al., 2022] 得到单语 ASR，然后在 FLEURS 开发集上以字错误率衡量准确率。"
      }
     ]
    },
    {
     "id": "fig-3-3-1-2",
     "type": "figure_caption",
     "page": 11,
     "original": "Figure 8 shows that the MMS-lab data preparation process results in better quality ASR models compared to CMU Wilderness with improvements between 2.1%-4.7% CER, depending on the language. Our alignment procedure also retains a much larger amount of the training data compared to the CMU Wilderness protocol: for Telugu, there are 26.5 hours of data, MMS-lab retains 26.2 hours compared to 11.1 hours for the CMU Wilderness process. For English, we start with 17.3 hours, MMS-lab retains 17 hours vs. 10.6 hours for CMU Wilderness.",
     "zh": "图 8 表明，与 CMU Wilderness 相比，MMS-lab 的数据准备流程能产出质量更好的 ASR 模型，CER 改善幅度在 2.1%-4.7% 之间，因语言而异。与 CMU Wilderness 流程相比，我们的对齐流程也保留了多得多的训练数据：泰卢固语原有 26.5 小时数据，MMS-lab 保留 26.2 小时，而 CMU Wilderness 流程只保留 11.1 小时。英语原有 17.3 小时，MMS-lab 保留 17 小时，而 CMU Wilderness 为 10.6 小时。"
    }
   ]
  },
  {
   "id": "sec-3-3-2",
   "num": "3.3.2",
   "level": 2,
   "page": 11,
   "title": {
    "original": "ASR-2K",
    "zh": "ASR-2K"
   },
   "blocks": [
    {
     "id": "p-3-3-2-1",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-3-3-2-1-1",
       "original": "The most comparable multilingual ASR work to ours is ASR-2K [Li et al., 2022] which covers 1,909 languages.",
       "zh": "与我们最可比的多语言 ASR 工作是 ASR-2K [Li et al., 2022]，它覆盖 1,909 种语言。"
      },
      {
       "id": "s-3-3-2-1-2",
       "original": "Their approach is based on mapping the output of an eight language multilingual model to appropriate phonemes for the language of interest.",
       "zh": "他们的方法基于将一个八语言多语言模型的输出映射到目标语言的相应音素。"
      },
      {
       "id": "s-3-3-2-1-3",
       "original": "In contrast, MMS-lab has actual paired speech and text data.",
       "zh": "相比之下，MMS-lab 拥有真实配对的语音和文本数据。"
      }
     ]
    },
    {
     "id": "p-3-3-2-2",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-3-3-2-2-1",
       "original": "ASR-2K reports average character error rate (CER) on 34 languages of Common Voice 6.0 and uses a language model for decoding.",
       "zh": "ASR-2K 报告了在 Common Voice 6.0 的 34 种语言上的平均字错误率（CER），并使用语言模型解码。"
      },
      {
       "id": "s-3-3-2-2-2",
       "original": "MMS-lab covers 22 out of these 34 languages and we use it to train monolingual ASR models without language models.",
       "zh": "MMS-lab 覆盖这 34 种语言中的 22 种，我们用它训练不使用语言模型的单语 ASR 模型。"
      },
      {
       "id": "s-3-3-2-2-3",
       "original": "The monolingual models trained on MMS-lab dataset obtain an average CER of 9.6 on 22 languages.",
       "zh": "在 MMS-lab 数据集上训练的单语模型在 22 种语言上取得 9.6 的平均 CER。"
      },
      {
       "id": "s-3-3-2-2-4",
       "original": "ASR-2K reports CER 50.9 on 34 languages.",
       "zh": "ASR-2K 报告在 34 种语言上的 CER 为 50.9。"
      },
      {
       "id": "s-3-3-2-2-5",
       "original": "While not a like for like comparison, this difference suggest that MMS-lab enables higher quality ASR models.",
       "zh": "尽管这不是完全对等的比较，这一差距表明 MMS-lab 能支持更高质量的 ASR 模型。"
      },
      {
       "id": "s-3-3-2-2-6",
       "original": "We stress that this is a best effort comparison and does not enable strong conclusions.18 17We reproduced the data by following the steps outlined at https://github.com/festvox/ datasets-CMU_Wilderness 18We could not obtain a per-language break down of the ASR-2K results.",
       "zh": "我们强调，这只是一个尽力而为的比较，不能得出强结论。18 17我们按照 https://github.com/festvox/ datasets-CMU_Wilderness 列出的步骤复现了该数据 18我们无法获得 ASR-2K 结果的逐语言细分。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-3-3-3",
   "num": "3.3.3",
   "level": 2,
   "page": 12,
   "title": {
    "original": "Other Existing Datasets",
    "zh": "其他现有数据集"
   },
   "blocks": [
    {
     "id": "p-3-3-3-1",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-3-3-3-1-1",
       "original": "The MMS-lab covers a large number of languages but it also has potential downsides: it is both from a particular narrow domain and most recordings are from a single speaker.",
       "zh": "MMS-lab 覆盖了大量语言，但它也有潜在的缺点：它既来自一个特定的狭窄领域，而且大多数录音来自单一说话人。"
      },
      {
       "id": "s-3-3-3-1-2",
       "original": "This may lead to poor performance on other domains or when the systems are applied to unseen speakers.",
       "zh": "这可能导致在其他领域或系统应用于未见说话人时性能不佳。"
      }
     ]
    },
    {
     "id": "p-3-3-3-2",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-3-3-3-2-1",
       "original": "To get a better sense of both issues, we train monolingual ASR models by finetuning XLSR [Babu et al., 2022] on MMS-lab and evaluate these models on the FLEURS benchmark.",
       "zh": "为了更好地了解这两个问题，我们通过在 MMS-lab 上微调 XLSR [Babu et al., 2022] 训练单语 ASR 模型，并在 FLEURS 基准上评估这些模型。"
      },
      {
       "id": "s-3-3-3-2-2",
       "original": "For comparison, we train another set of ASR models on labeled data from Common Voice which is an existing dataset and does not have the aforementioned downsides: the domain is general and the data contains multiple speakers.",
       "zh": "作为对比，我们在 Common Voice 的标注数据上训练另一组 ASR 模型——这是一个现有数据集，没有上述缺点：领域通用，且数据包含多个说话人。"
      },
      {
       "id": "s-3-3-3-2-3",
       "original": "We control the amount of training data of both datasets by using exactly ten hours of training data and one hour of development data from both datasets.",
       "zh": "我们控制两个数据集的训练数据量：都从两个数据集中各取恰好 10 小时训练数据和 1 小时开发数据。"
      }
     ]
    },
    {
     "id": "fig-3-3-3-1",
     "type": "figure_caption",
     "page": 12,
     "original": "Figure 9 shows that models trained on CommonVoice perform better on 18 languages of FLEURS (average CER 9.3 vs. 12.2) but the models MMS-lab still enable good performance.19 This is despite the fact that MMS-lab utterances are often from a single speaker and are from a very narrow domain. While there is certainly higher quality data for head languages, this result suggests that the quality of the MMS-lab data can enable high quality speech systems for a large number of other languages.",
     "zh": "图 9 表明，在 CommonVoice 上训练的模型在 FLEURS 的 18 种语言上表现更好（平均 CER 9.3 对 12.2），但在 MMS-lab 上训练的模型仍能取得不错的性能。19 尽管 MMS-lab 的语句往往来自单一说话人且领域非常狭窄。虽然头部语言确实存在更高质量的数据，这一结果表明 MMS-lab 数据的质量足以为大量其他语言构建高质量的语音系统。"
    }
   ]
  },
  {
   "id": "sec-4",
   "num": "4",
   "level": 1,
   "page": 12,
   "title": {
    "original": "Cross-lingual Self-supervised Speech Representation Learning",
    "zh": "跨语言自监督语音表示学习"
   },
   "blocks": [
    {
     "id": "p-4-1",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-4-1-1",
       "original": "As a first step, we train a self-supervised model of speech representations on the data outlined above as well as other existing public corpora.",
       "zh": "作为第一步，我们在上述数据以及其他现有公开语料上训练自监督语音表示模型。"
      },
      {
       "id": "s-4-1-2",
       "original": "We use wav2vec 2.0 for pre-training on unlabeled data which we later use as the basis for several downstream speech tasks (Baevski et al. 2020b; §4.1).",
       "zh": "我们使用 wav2vec 2.0 在无标注数据上预训练，随后将其作为多个下游语音任务的基础（Baevski et al. 2020b；§4.1）。"
      },
      {
       "id": "s-4-1-3",
       "original": "The resulting models were pre-trained on 1,406 languages which is over four times the number of languages of known prior work (Zhang et al. 2023a; §4.2).",
       "zh": "所得模型在 1,406 种语言上预训练，是已知先前工作语言数量的四倍以上（Zhang et al. 2023a；§4.2）。"
      },
      {
       "id": "s-4-1-4",
       "original": "The increased language coverage results in better performance for both ASR and LID compared to XLS-R (Babu et al. 2022; §4.3) which covered 128 languages and is publicly available.",
       "zh": "语言覆盖的增加使 ASR 和 LID 的性能相比 XLS-R（Babu et al. 2022；§4.3）都有所提升——后者覆盖 128 种语言且已公开发布。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-4-1",
   "num": "4.1",
   "level": 2,
   "page": 12,
   "title": {
    "original": "Method: wav2vec 2.0 and XLS-R",
    "zh": "方法：wav2vec 2.0 与 XLS-R"
   },
   "blocks": [
    {
     "id": "p-4-1-1",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-4-1-1-1",
       "original": "Our work builds on Babu et al. [2022] who pretrain wav2vec models on data from multiple languages.",
       "zh": "我们的工作建立在 Babu et al. [2022] 的基础上，他们在多语言数据上预训练 wav2vec 模型。"
      },
      {
       "id": "s-4-1-1-2",
       "original": "The wav2vec project created a series of models for learning self-supervised speech representations [Schneider et al., 2019, Baevski et al., 2020a,b] from unlabeled speech data.",
       "zh": "wav2vec 项目从无标注语音数据中学习自监督语音表示，创建了一系列模型 [Schneider et al., 2019, Baevski et al., 2020a,b]。"
      },
      {
       "id": "s-4-1-1-3",
       "original": "The resulting models can then be used to solve downstream speech tasks by fine-tuning them on labeled data or by tackling these tasks without labeled data using unsupervised learning [Baevski et al., 2021, Liu et al., 2022].",
       "zh": "所得模型随后可用于解决下游语音任务：在标注数据上微调，或使用无监督学习在无标注数据下处理这些任务 [Baevski et al., 2021, Liu et al., 2022]。"
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
       "original": "The most prominent one is wav2vec 2.0 [Baevski et al., 2020b] which enables building speech recognition models with only ten minutes of labeled data and even no labeled data at all [Baevski et al., 2021].",
       "zh": "其中最著名的是 wav2vec 2.0 [Baevski et al., 2020b]，它使得仅用十分钟标注数据、甚至完全不用标注数据 [Baevski et al., 2021] 就能构建语音识别模型。"
      },
      {
       "id": "s-4-1-2-2",
       "original": "The basic architecture of wav2vec 2.0 is as follows: a convolutional feature encoder f : X 7→Z maps raw audio X to latent speech representations z1, . . . , zT which are input to a Transformer g : Z 7→C to output context representations c1, . . . , cT [Baevski et al., 2020a].",
       "zh": "wav2vec 2.0 的基本架构如下：卷积特征编码器 f : X 7→Z 将原始音频 X 映射为潜在语音表示 z1, . . . , zT，再输入 Transformer g : Z 7→C 以输出上下文表示 c1, . . . , cT [Baevski et al., 2020a]。"
      },
      {
       "id": "s-4-1-2-3",
       "original": "Each zt represents 25ms of audio strided by 20ms and the Transformer architecture follows BERT [Vaswani et al., 2017, Devlin et al., 2019].",
       "zh": "每个 zt 表示 25ms 的音频，步长 20ms；Transformer 架构遵循 BERT [Vaswani et al., 2017, Devlin et al., 2019]。"
      }
     ]
    },
    {
     "id": "p-4-1-3",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-4-1-3-1",
       "original": "During training the feature encoder representations are discretized to q1, . . . , qT with a quantization module Z 7→Q to represent the targets in the objective.",
       "zh": "训练期间，特征编码器的表示经量化模块 Z 7→Q 离散化为 q1, . . . , qT，作为目标中的表示。"
      },
      {
       "id": "s-4-1-3-2",
       "original": "The quantization module uses a Gumbel softmax to choose entries form the codebooks and the chosen entries are concatenated [Jegou et al., 2011, Jang et al., 2016, Baevski et al., 2020a].",
       "zh": "量化模块使用 Gumbel softmax 从码本中选择条目，并将所选条目拼接 [Jegou et al., 2011, Jang et al., 2016, Baevski et al., 2020a]。"
      }
     ]
    },
    {
     "id": "p-4-1-4",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-4-1-4-1",
       "original": "The model is trained by solving a contrastive task over masked feature encoder outputs.",
       "zh": "模型通过在被掩码的特征编码器输出上求解一个对比任务来训练。"
      },
      {
       "id": "s-4-1-4-2",
       "original": "At training time, spans of ten time steps with random starting indices are masked.",
       "zh": "训练时，随机起始位置的十个连续时间步被掩码。"
      },
      {
       "id": "s-4-1-4-3",
       "original": "The objective requires identifying the true quantized latent qt for a masked time-step within a set of K = 100 distractors sampled from other masked time steps.",
       "zh": "该目标要求在一组从其他掩码时间步采样的 K = 100 个干扰项中，识别出被掩码时间步的真实量化潜在表示 qt。"
      },
      {
       "id": "s-4-1-4-4",
       "original": "The objective is augmented by a codebook diversity penalty to encourage the model to use all codebook entries [Dieleman et al., 2018].",
       "zh": "该目标还辅以码本多样性惩罚，以鼓励模型使用所有码本条目的使用 [Dieleman et al., 2018]。"
      }
     ]
    },
    {
     "id": "p-4-1-5",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-4-1-5-1",
       "original": "19Spanish (spa), Catalan (cat), Polish (pol), German (deu), Portoguese (por), Russian (rus), Ukrainian (ukr), Turkish (tur), Swahili (swh), French (fra), Dutch (nld), Farsi (fas), English (eng), Welsh (cym), Luganda (lug), Arabic (ara), Tamil (tam), Thai (tha).",
       "zh": "19西班牙语（spa）、加泰罗尼亚语（cat）、波兰语（pol）、德语（deu）、葡萄牙语（por）、俄语（rus）、乌克兰语（ukr）、土耳其语（tur）、斯瓦希里语（swh）、法语（fra）、荷兰语（nld）、波斯语（fas）、英语（eng）、威尔士语（cym）、卢干达语（lug）、阿拉伯语（ara）、泰米尔语（tam）、泰语（tha）。"
      }
     ]
    },
    {
     "id": "p-4-1-6",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-4-1-6-1",
       "original": "Model #langs Datasets B M F A #params Prior work XLSR-53 53 MLS, CV, BBL 24 1024 4096 16 VP-100K 23 VP-100K 24 1024 4096 16 XLS-R (0.3B) 128 VP-400K, MLS, CV, VL, BBL 24 1024 4096 16 XLS-R (1B) 128 VP-400K, MLS, CV, VL, BBL 48 1024 4096 16 MMS (0.3B) MMS-lab, FL, VP-400K, MLS, CV, VL, BBL 24 1024 4096 16 MMS (1B) MMS-lab, FL, VP-400K, MLS, CV, VL, BBL 48 1024 4096 16",
       "zh": "模型 #语言数 数据集 B M F A #参数量 先前工作 XLSR-53 53 MLS, CV, BBL 24 1024 4096 16 VP-100K 23 VP-100K 24 1024 4096 16 XLS-R (0.3B) 128 VP-400K, MLS, CV, VL, BBL 24 1024 4096 16 XLS-R (1B) 128 VP-400K, MLS, CV, VL, BBL 48 1024 4096 16 MMS (0.3B) MMS-lab, FL, VP-400K, MLS, CV, VL, BBL 24 1024 4096 16 MMS (1B) MMS-lab, FL, VP-400K, MLS, CV, VL, BBL 48 1024 4096 16"
      }
     ]
    },
    {
     "id": "tab-4-1-1",
     "type": "table_caption",
     "page": 13,
     "original": "Table 2: Self-supervised Models. Details of our models including prior work: XLSR-53 [Conneau et al., 2020a], VP-100K [Wang et al., 2021], XLS-R [Babu et al., 2022] and the MMS models: the number of languages (#langs), pretraining data (Datasets), the number of Transformer blocks (B), the number of hidden states (M), the inner dimension of feed-forward blocks (F), the number of attention heads (A) and the total number of parameters (#params).",
     "zh": "表 2：自监督模型。我们模型的细节及先前工作：XLSR-53 [Conneau et al., 2020a]、VP-100K [Wang et al., 2021]、XLS-R [Babu et al., 2022] 和 MMS 模型：语言数量（#langs）、预训练数据（Datasets）、Transformer 块数（B）、隐状态维度（M）、前馈块内层维度（F）、注意力头数（A）和总参数量（#params）。"
    },
    {
     "id": "p-4-1-7",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-4-1-7-1",
       "original": "XLSR and XLS-R train wav2vec 2.0 on many different languages from several datasets to obtain cross-lingual representations [Conneau et al., 2020a, Babu et al., 2022].",
       "zh": "XLSR 和 XLS-R 在来自多个数据集的不同语言上训练 wav2vec 2.0，以获得跨语言表示 [Conneau et al., 2020a, Babu et al., 2022]。"
      },
      {
       "id": "s-4-1-7-2",
       "original": "In order to balance the training data, two data sampling steps are performed.",
       "zh": "为平衡训练数据，执行两步数据采样。"
      },
      {
       "id": "s-4-1-7-3",
       "original": "First, for each dataset, we sample the data for the different languages L from a distribution pl ∼ nl N βL where l = 1, . . . , L, nl is the amount of unlabeled data for each language in the dataset, N is the total amount of training in the dataset, and βL is the upsampling factor which controls the trade-off between high- and low-resource languages during pretraining.",
       "zh": "首先，对每个数据集，我们从分布 pl ∼ nl N βL 中为不同语言 L 采样数据，其中 l = 1, . . . , L，nl 是数据集中每种语言的无标注数据量，N 是数据集中的训练数据总量，βL 是上采样因子，控制预训练期间高资源与低资源语言之间的权衡。"
      },
      {
       "id": "s-4-1-7-4",
       "original": "Second, we balance the different datasets by treating each dataset as a language in the above sampling scheme with a sampling parameter βD.",
       "zh": "其次，我们将每个数据集视为上述采样方案中的一种语言，使用采样参数 βD 来平衡不同数据集。"
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
    "original": "Pre-training Setup Hyperparameters.",
    "zh": "预训练设置 超参数。"
   },
   "blocks": [
    {
     "id": "p-4-2-1",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-4-2-1-1",
       "original": "We largely follow prior work in training cross-lingual wav2vec 2.0 models [Conneau et al., 2020a, Babu et al., 2022] and use the wav2vec 2.0 implementation available in fairseq [Ott et al., 2019] to train models with roughly 300M and 1B parameters (Table 2).",
       "zh": "我们大体遵循先前训练跨语言 wav2vec 2.0 模型的工作 [Conneau et al., 2020a, Babu et al., 2022]，并使用 fairseq [Ott et al., 2019] 中的 wav2vec 2.0 实现，训练约 300M 和 1B 参数的模型（表 2）。"
      },
      {
       "id": "s-4-2-1-2",
       "original": "To make efficient use of GPU memory, we use a fully sharded backend [Rajbhandari et al., 2021] as well as activation checkpointing [Chen et al., 2016] implemented in FairScale [Baines et al., 2021].",
       "zh": "为高效利用 GPU 内存，我们使用全分片后端 [Rajbhandari et al., 2021] 以及在 FairScale [Baines et al., 2021] 中实现的激活检查点 [Chen et al., 2016]。"
      }
     ]
    },
    {
     "id": "p-4-2-2",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-4-2-2-1",
       "original": "Our models are optimized with Adam [Kingma and Ba, 2015] and the learning rate is warmed up for the first 32K steps followed by polynomial decay to zero for the remainder of training.",
       "zh": "我们的模型使用 Adam [Kingma and Ba, 2015] 优化，学习率在前 32K 步进行预热，随后在剩余训练中按多项式衰减至零。"
      },
      {
       "id": "s-4-2-2-2",
       "original": "Training audio sequences are cropped to a maximum of 320K samples, or 20 seconds, and all models were pre-trained for a total of one million updates on A100 GPUs with 80GB of memory.",
       "zh": "训练音频序列被裁剪至最长 320K 个采样点（即 20 秒），所有模型在 80GB 显存的 A100 GPU 上共预训练 1 百万次更新。"
      },
      {
       "id": "s-4-2-2-3",
       "original": "The MMS (0.3B) model was trained with an effective batch size of 2.3 hours of data across 48 GPUs and the MMS (1B) model was trained with an effective batch size of 3.5 hours on 64 GPUs.",
       "zh": "MMS (0.3B) 模型在 48 块 GPU 上以 2.3 小时数据的有效批大小训练，MMS (1B) 模型在 64 块 GPU 上以 3.5 小时的有效批大小训练。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-data",
   "num": null,
   "level": 2,
   "page": 13,
   "title": {
    "original": "Data.",
    "zh": "数据。"
   },
   "blocks": [
    {
     "id": "p-data-1",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-data-1-1",
       "original": "The pre-training data covers about 491K hours in 1,406 languages.",
       "zh": "预训练数据覆盖 1,406 种语言、约 491K 小时。"
      },
      {
       "id": "s-data-1-2",
       "original": "This data is drawn from six training corpora with different characteristics, including the corpora used in XLS-R [Babu et al., 2022]:",
       "zh": "这些数据来自六个特征各异的训练语料，包括 XLS-R [Babu et al., 2022] 所用的语料："
      }
     ]
    },
    {
     "id": "p-data-2",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-data-2-1",
       "original": "• MMS-lab-U: 1,362 languages comprising 55K hours (§3.1).",
       "zh": "• MMS-lab-U：1,362 种语言，共 55K 小时（§3.1）。"
      }
     ]
    },
    {
     "id": "p-data-3",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-data-3-1",
       "original": "• Multilingual Librispech (MLS): 8 European languages of read books totaling 50K hours [Pratap et al., 2020c] • CommonVoice (CV): 89 languages totaling 8.8 hours of read Wikipedia text; we use v9.0 of the corpus [Ardila et al., 2020]) • VoxLingua-107 (VL): 107 languages totaling 5.3K hours of YouTube content [Valk and Alumäe, 2020] • BABEL (BBL): 17 African and Asian languages totaling about 1K hours of conversational telephone data [Gales et al., 2014] • VoxPopuli (VP): 371K hours of unlabeled speech data in 23 languages derived from European Parliament event recordings [Wang et al., 2021] Pre-training only uses the speech audio and none of the transcriptions and we balance the data following the strategy outlined in §4.1 using βL = βD = 0.5",
       "zh": "• Multilingual Librispech（MLS）：8 种欧洲语言的朗读书籍，共 50K 小时 [Pratap et al., 2020c] • CommonVoice（CV）：89 种语言，共 8.8 小时 Wikipedia 朗读文本；我们使用语料的 v9.0 版本 [Ardila et al., 2020]）• VoxLingua-107（VL）：107 种语言，共 5.3K 小时 YouTube 内容 [Valk and Alumäe, 2020] • BABEL（BBL）：17 种非洲和亚洲语言，共约 1K 小时电话会话数据 [Gales et al., 2014] • VoxPopuli（VP）：23 种语言、共 371K 小时源自欧洲议会活动录音的无标注语音数据 [Wang et al., 2021] 预训练只使用语音音频，不使用任何转写，并按 §4.1 所述策略以 βL = βD = 0.5 平衡数据"
      }
     ]
    },
    {
     "id": "eq-data-1",
     "type": "equation",
     "page": 14,
     "original": "18"
    },
    {
     "id": "eq-data-2",
     "type": "equation",
     "page": 14,
     "original": "16"
    },
    {
     "id": "p-data-4",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-data-4-1",
       "original": "CER",
       "zh": "CER"
      }
     ]
    },
    {
     "id": "eq-data-3",
     "type": "equation",
     "page": 14,
     "original": "14"
    },
    {
     "id": "p-data-5",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-data-5-1",
       "original": "XLS-R 1B 12",
       "zh": "XLS-R 1B 12"
      }
     ]
    },
    {
     "id": "fig-data-1",
     "type": "figure_caption",
     "page": 14,
     "original": "Figure 10: MMS vs. XLS-R. Character error rate (CER) on 61 FLEURS languages when fine-tuning multilingual ASR models on MMS-lab data. We report average performance on FLEURS dev data.",
     "zh": "图 10：MMS 与 XLS-R 对比。在 MMS-lab 数据上微调多语言 ASR 模型时，61 种 FLEURS 语言上的字错误率（CER）。我们报告在 FLEURS 开发数据上的平均性能。"
    },
    {
     "id": "eq-data-4",
     "type": "equation",
     "page": 14,
     "original": "10"
    },
    {
     "id": "p-data-6",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-data-6-1",
       "original": "CER MMS - XLS-R",
       "zh": "CER MMS - XLS-R"
      }
     ]
    },
    {
     "id": "eq-data-5",
     "type": "equation",
     "page": 14,
     "original": "5"
    },
    {
     "id": "eq-data-6",
     "type": "equation",
     "page": 14,
     "original": "0"
    },
    {
     "id": "eq-data-7",
     "type": "equation",
     "page": 14,
     "original": "−5"
    },
    {
     "id": "p-data-7",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-data-7-1",
       "original": "lugurd khm marhinormtelhautamgujvie myajavasmazjtha som benkaztglyor swhfulkorpan amhlaomalnya hun swepor fasfrarusengellspa bulronara heb zlmcebindtur mon ory kanfinnldsna isltgk cym ukrpollavkirdeucat",
       "zh": "lugurd khm marhinormtelhautamgujvie myajavasmazjtha som benkaztglyor swhfulkorpan amhlaomalnya hun swepor fasfrarusengellspa bulronara heb zlmcebindtur mon ory kanfinnldsna isltgk cym ukrpollavkirdeucat"
      }
     ]
    },
    {
     "id": "fig-data-2",
     "type": "figure_caption",
     "page": 14,
     "original": "Figure 11: MMS vs. XLS-R Breakdown. We show the absolute character error rate difference between multilingual ASR models based on XLS-R and MMS models with 1B parameters. Positive values indicate better performance of MMS and negative values better performance of XLS-R. Models are fine-tuned on MMS-lab data and evaluated on the development sets of 61 FLEURS languages.",
     "zh": "图 11：MMS 与 XLS-R 的逐语言分解。我们展示基于 XLS-R 与 MMS 的 1B 参数多语言 ASR 模型之间的绝对字错误率差值。正值表示 MMS 性能更好，负值表示 XLS-R 更好。模型在 MMS-lab 数据上微调，并在 61 种 FLEURS 语言的开发集上评估。"
    }
   ]
  },
  {
   "id": "sec-4-3",
   "num": "4.3",
   "level": 2,
   "page": 14,
   "title": {
    "original": "Comparison to XLS-R",
    "zh": "与 XLS-R 的对比"
   },
   "blocks": [
    {
     "id": "p-4-3-1",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-4-3-1-1",
       "original": "To better understand how the MMS models compare to XLS-R we fine-tuned both for automatic speech recognition on the 61 languages of the FLEURS benchmark for which MMS-lab provides training data.",
       "zh": "为了更好地理解 MMS 模型与 XLS-R 的差异，我们在 MMS-lab 提供训练数据的 61 种 FLEURS 基准语言上，对两者分别进行自动语音识别微调。"
      },
      {
       "id": "s-4-3-1-2",
       "original": "Models are evaluated without a language model and we report the average character error rate (CER) on FLEURS development data over all languages.",
       "zh": "模型评估时不使用语言模型，我们报告所有语言在 FLEURS 开发数据上的平均字错误率（CER）。"
      }
     ]
    },
    {
     "id": "fig-4-3-1",
     "type": "figure_caption",
     "page": 14,
     "original": "Figure 10 shows that the MMS models perform better: for the 300B size, MMS has 0.6 lower CER than XLS-R, and for the 1B size, the difference is 0.7 CER. More capacity helps to improve performance: for XLS-R the error rate decreases by 3.2 CER absolute when scaling the number of parameters from 300M to 1B and for MMS-lab there is a 3.0 CER improvement.",
     "zh": "图 10 表明 MMS 模型表现更好：300M 规模下，MMS 的 CER 比 XLS-R 低 0.6；1B 规模下，差距为 0.7 CER。更大容量有助于提升性能：XLS-R 参数量从 300M 扩展到 1B 时，错误率绝对下降 3.2 CER；MMS-lab 则有 3.0 CER 的提升。"
    },
    {
     "id": "p-4-3-2",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-4-3-2-1",
       "original": "MMS pre-trains on over ten times the number of languages of XLS-R and this improves performance, particularly on low resource languages (Figure 11) such as Amharic (amh), Lao (lao) or Malayalam (mal).",
       "zh": "MMS 的预训练语言数量是 XLS-R 的十倍以上，这提升了性能，尤其是在低资源语言上（图 11），例如阿姆哈拉语（amh）、老挝语（lao）或马拉雅拉姆语（mal）。"
      },
      {
       "id": "s-4-3-2-2",
       "original": "Compared to XLS-R, the pre-training data of MMS covers the following languages which improve: Chewa (nya), Fulah (ful) and Oromo (orm).",
       "zh": "相比 XLS-R，MMS 的预训练数据覆盖了以下性能有所提升的语言：奇瓦语（nya）、富拉语（ful）和奥罗莫语（orm）。"
      },
      {
       "id": "s-4-3-2-3",
       "original": "However, improvements at low resource languages result in a small degradation in some of the high-resource languages such as English (eng) or Spanish (spa) but there are also other languages such as Tajik (tgjk) or Welsh (cym) which perform less well.",
       "zh": "然而，低资源语言上的提升导致部分高资源语言出现小幅退化，例如英语（eng）或西班牙语（spa）；也有其他语言如塔吉克语（tgjk）或威尔士语（cym）表现较差。"
      }
     ]
    },
    {
     "id": "p-4-3-3",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-4-3-3-1",
       "original": "Equipped with this new pre-trained model we now investigate the use of MMS-lab and MMS-unlab for several downstream tasks.",
       "zh": "装备了这个新的预训练模型，我们现在研究将 MMS-lab 和 MMS-unlab 用于多个下游任务。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-5",
   "num": "5",
   "level": 1,
   "page": 15,
   "title": {
    "original": "Automatic Speech Recognition",
    "zh": "自动语音识别"
   },
   "blocks": [
    {
     "id": "p-5-1",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-5-1-1",
       "original": "We first turn to the task of transcribing speech in up to 1,107 different languages.",
       "zh": "我们首先研究转写多达 1,107 种不同语言语音的任务。"
      },
      {
       "id": "s-5-1-2",
       "original": "We use the labeled dataset we collected (§3.1) to fine-tune our pre-trained models (§4) for ASR.",
       "zh": "我们使用收集的标注数据集（§3.1）来微调预训练模型（§4）以进行 ASR。"
      },
      {
       "id": "s-5-1-3",
       "original": "We first outline our modeling approach (§5.1) and then scale the number of languages for multilingual ASR from 61 to 1,107 in order to better understand the impact of supporting more languages (§5.2).",
       "zh": "我们先概述建模方法（§5.1），然后将多语言 ASR 的语言数量从 61 扩展到 1,107，以更好地理解支持更多语言的影响（§5.2）。"
      },
      {
       "id": "s-5-1-4",
       "original": "Next, we compare our models to existing multilingual work (§5.3), and build robust multilingual models supporting 1,162 languages trained on several existing corpora as well as the MMS-lab data (§5.4).",
       "zh": "接着，我们将模型与现有的多语言工作进行对比（§5.3），并构建在多个现有语料库和 MMS-lab 数据上训练的、支持 1,162 种语言的鲁棒多语言模型（§5.4）。"
      },
      {
       "id": "s-5-1-5",
       "original": "Finally, we evaluate our multilingual models on all languages they support (§5.5).",
       "zh": "最后，我们在模型支持的所有语言上评估多语言模型（§5.5）。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-5-1",
   "num": "5.1",
   "level": 2,
   "page": 15,
   "title": {
    "original": "Modeling and Training Approach",
    "zh": "建模与训练方法"
   },
   "blocks": [
    {
     "id": "p-5-1-1",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-5-1-1-1",
       "original": "We train multilingual speech recognition models by fine-tuning our pre-trained MMS (1B) model (§4) using labeled data, similar to Baevski et al. [2020b].",
       "zh": "我们通过使用标注数据微调预训练的 MMS (1B) 模型（§4）来训练多语言语音识别模型，与 Baevski et al. [2020b] 类似。"
      },
      {
       "id": "s-5-1-1-2",
       "original": "To output transcriptions, we add a linear layer on top of the model which maps to an output vocabulary which is the set of letters in the labeled training data of all languages considered in a particular setting.",
       "zh": "为输出转写，我们在模型顶部添加一个线性层，映射到输出词表——即特定设置下所考虑所有语言标注训练数据中的字母集合。"
      },
      {
       "id": "s-5-1-1-3",
       "original": "Next, we fine-tune the entire model with the Connectionist Temporal Classification (CTC) criterion [Graves et al., 2006].",
       "zh": "接着，我们使用连接时序分类（CTC）准则 [Graves et al., 2006] 微调整个模型。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-optimization",
   "num": null,
   "level": 2,
   "page": 15,
   "title": {
    "original": "Optimization.",
    "zh": "优化。"
   },
   "blocks": [
    {
     "id": "p-optimization-1",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-optimization-1-1",
       "original": "We use Adam [Kingma and Ba, 2015] with exponential decay rates β1 = 0.9, β2 = 0.98 to train model weights using a tri-stage schedule where the learning rate is warmed up for the first 10% of updates, held constant for the next 40% updates, and then decayed in the final 50% updates.",
       "zh": "我们使用 Adam [Kingma and Ba, 2015]（指数衰减率 β1 = 0.9，β2 = 0.98）训练模型权重，采用三阶段调度：学习率在前 10% 的更新中预热，在接下来 40% 的更新中保持恒定，在最后 50% 的更新中衰减。"
      },
      {
       "id": "s-optimization-1-2",
       "original": "We experimented with different learning rates (1 × 10−4, 7 × 10−4, 3 × 10−4 1 × 10−5, 7 × 10−6, 3 × 10−6, 1 × 10−6) and number of updates (50K, 100K, 200K, 300K).",
       "zh": "我们尝试了不同的学习率（1 × 10−4, 7 × 10−4, 3 × 10−4 1 × 10−5, 7 × 10−6, 3 × 10−6, 1 × 10−6）和更新次数（50K, 100K, 200K, 300K）。"
      },
      {
       "id": "s-optimization-1-3",
       "original": "Unless otherwise mentioned, we fine-tune models for a total of 50K updates with a batch size of 0.8 hours of data using 16 A100 GPUs with 80GB of memory.",
       "zh": "除非另有说明，我们在 16 块 80GB 显存的 A100 GPU 上，以 0.8 小时数据的批大小对模型共微调 50K 次更新。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-language-specific-adapters-head-",
   "num": null,
   "level": 2,
   "page": 15,
   "title": {
    "original": "Language-specific Adapters, Head and Fine-Tuning (LSAH).",
    "zh": "语言特定适配器、输出头与微调（LSAH）。"
   },
   "blocks": [
    {
     "id": "p-language-specific-adapters-head--1",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-language-specific-adapters-head--1-1",
       "original": "In addition to training dense models which share all parameters across languages, we also consider adding adapter modules [Houlsby et al., 2019] to models where we use a different set of adapter weights for each language.",
       "zh": "除了训练所有参数跨语言共享的稠密模型外，我们还考虑为模型添加适配器（adapter）模块 [Houlsby et al., 2019]，其中每种语言使用一组不同的适配器权重。"
      },
      {
       "id": "s-language-specific-adapters-head--1-2",
       "original": "Specifically, we introduce adapters at every block of the transformer, and the adapter is added after the last feed-forward block.",
       "zh": "具体而言，我们在 Transformer 的每个块中引入适配器，适配器加在最后一个前馈块之后。"
      },
      {
       "id": "s-language-specific-adapters-head--1-3",
       "original": "The adapter module consists of a LayerNorm Ba et al. [2016] layer, a downward linear projection followed by a ReLU activation and an upward linear projection; the inner dimension of the projections is 16.",
       "zh": "适配器模块由一个 LayerNorm Ba et al. [2016] 层、一个向下线性投影、一个 ReLU 激活和一个向上线性投影组成；投影的内层维度为 16。"
      }
     ]
    },
    {
     "id": "p-language-specific-adapters-head--2",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-language-specific-adapters-head--2-1",
       "original": "For each language, using an adapter increases the number of parameters by 2M or about 2% of the total number of parameters without adapters.",
       "zh": "对每种语言，使用适配器会使参数量增加 2M，约为不使用适配器时总参数量的 2%。"
      },
      {
       "id": "s-language-specific-adapters-head--2-2",
       "original": "We then perform a second stage of fine-tuning for each language where we introduce a randomly initialized linear layer mapping to the specific output vocabulary of a language in addition to language-specific adapter and fine-tune these additional parameters only for another 2K updates on the labeled data of the respective language.",
       "zh": "随后，我们对每种语言执行第二阶段微调：除了语言特定适配器外，再引入一个随机初始化的、映射到该语言特定输出词表的线性层，并在相应语言的标注数据上只微调这些新增参数，再训练 2K 次更新。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-5-2",
   "num": "5.2",
   "level": 2,
   "page": 15,
   "title": {
    "original": "Scaling Multilingual ASR to 1,107 Languages",
    "zh": "将多语言 ASR 扩展到 1,107 种语言"
   },
   "blocks": [
    {
     "id": "p-5-2-1",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-5-2-1-1",
       "original": "We first analyze training multilingual ASR models with an increasing number of languages by scaling from 61 to 1,107 languages, roughly doubling the number of languages at every step.",
       "zh": "我们首先分析随着语言数量增加训练多语言 ASR 模型的情形：从 61 种扩展到 1,107 种，每一步大致将语言数量翻倍。"
      },
      {
       "id": "s-5-2-1-2",
       "original": "Models are trained on the labeled data of MMS-lab by fine-tuning the MMS (1B) pre-trained model (§4) and we consider training models with and without language specific adapters and output layers.",
       "zh": "模型通过微调 MMS (1B) 预训练模型（§4）在 MMS-lab 的标注数据上训练，我们考虑训练带与不带语言特定适配器和输出层的模型。"
      },
      {
       "id": "s-5-2-1-3",
       "original": "Each setting is evaluated on the 61 FLEURS languages covered by MMS-lab (FLEURS-61) as well as the 49 languages of CommonVoice covered by MMS-lab (CV-49).",
       "zh": "每种设置在 MMS-lab 覆盖的 61 种 FLEURS 语言（FLEURS-61）以及 MMS-lab 覆盖的 49 种 CommonVoice 语言（CV-49）上评估。"
      },
      {
       "id": "s-5-2-1-4",
       "original": "Results are reported on the development sets of FLEURS and CommonVoice in terms of Character Error Rate without a language model.",
       "zh": "结果以字错误率在 FLEURS 和 CommonVoice 的开发集上报告，不使用语言模型。"
      }
     ]
    },
    {
     "id": "fig-5-2-1",
     "type": "figure_caption",
     "page": 15,
     "original": "Figure 12 shows that performance degrades quickly for dense models which have no language-specific parameters: for FLEURS-61, CER increases by 5.1 when moving from 61 to 1,107 languages and for CV-49, there is a 2.1 CER increase. This is mainly due to languages being confused with each other which results in large performance drops for certain languages. Language-specific parameters (LSAH) alleviate this issue and show only very little degradation (0.4 CER for FLEURS-61 and 0.2 CER for CV-49).",
     "zh": "图 12 表明，没有语言特定参数的稠密模型的性能退化很快：对 FLEURS-61，从 61 种语言扩展到 1,107 种时 CER 上升 5.1；对 CV-49，CER 上升 2.1。这主要是因为语言之间相互混淆，导致某些语言性能大幅下降。语言特定参数（LSAH）缓解了这一问题，仅表现出极小的退化（FLEURS-61 上 0.4 CER，CV-49 上 0.2 CER）。"
    },
    {
     "id": "eq-5-2-1",
     "type": "equation",
     "page": 16,
     "original": "20"
    },
    {
     "id": "p-5-2-2",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-5-2-2-1",
       "original": "FLEURS-61 (Dense) FLEURS-61 (LSAH) CV-49 (Dense) CV-49 (LSAH) Character Error Rate",
       "zh": "FLEURS-61 (Dense) FLEURS-61 (LSAH) CV-49 (Dense) CV-49 (LSAH) 字错误率"
      }
     ]
    },
    {
     "id": "eq-5-2-2",
     "type": "equation",
     "page": 16,
     "original": "15"
    },
    {
     "id": "eq-5-2-3",
     "type": "equation",
     "page": 16,
     "original": "10"
    },
    {
     "id": "p-5-2-3",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-5-2-3-1",
       "original": "61 128 256 512 Number of Languages supported by Model",
       "zh": "61 128 256 512 模型支持的语言数量"
      }
     ]
    },
    {
     "id": "fig-5-2-2",
     "type": "figure_caption",
     "page": 16,
     "original": "Figure 12: Scaling Multilingual ASR to 1,107 Languages. We fine-tune both dense and LSAH models with 61, 128, 256, 512 and 1,107 languages on MMS-lab data and show average CER on 61 languages of FLEURS and 49 languages of CommonVoice. LSAH models have language-specific adapter modules and output layers.",
     "zh": "图 12：将多语言 ASR 扩展到 1,107 种语言。我们在 MMS-lab 数据上以 61、128、256、512 和 1,107 种语言分别微调稠密模型和 LSAH 模型，并展示在 61 种 FLEURS 语言和 49 种 CommonVoice 语言上的平均 CER。LSAH 模型具有语言特定的适配器模块和输出层。"
    },
    {
     "id": "p-5-2-4",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-5-2-4-1",
       "original": "#lang labeled train FLEURS-54 data (h) dev test Prior Work Whisper medium 99 50.1 Whisper large-v2 99 44.3 This Work 61 20.9 20.7 MMS (LSAH) 61 19.0 19.1 24.8 24.8 MMS (LSAH) 18.7 18.7",
       "zh": "#语言数 标注训练 FLEURS-54 数据 (h) dev test 先前工作 Whisper medium 99 50.1 Whisper large-v2 99 44.3 本工作 61 20.9 20.7 MMS (LSAH) 61 19.0 19.1 24.8 24.8 MMS (LSAH) 18.7 18.7"
      }
     ]
    },
    {
     "id": "tab-5-2-1",
     "type": "table_caption",
     "page": 16,
     "original": "Table 3: Comparison to Whisper. We report average WER on the 54 languages of the FLEURS benchmark supported by both Whisper and MMS (FLEURS-54). MMS is a CTC-based model and to enable a fairer comparison we use n-gram models trained on web data when comparing to Whisper whose decoder is a neural sequence-model that serves as a language model and was trained on billions of web tokens.",
     "zh": "表 3：与 Whisper 的对比。我们报告在 Whisper 和 MMS 都支持的 FLEURS 基准 54 种语言（FLEURS-54）上的平均 WER。MMS 是基于 CTC 的模型；为进行更公平的对比，在与 Whisper 比较时我们使用了在网络数据上训练的 n-gram 语言模型——Whisper 的解码器本身是一个神经序列模型，充当语言模型，且在数十亿的网络 token 上训练过。"
    },
    {
     "id": "p-5-2-5",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-5-2-5-1",
       "original": "In summary, this shows that scaling multilingual ASR models to over one thousand languages is feasible and that there is little performance degradation when coupled with language-specific parameters.",
       "zh": "总之，这表明将多语言 ASR 模型扩展到一千种语言以上是可行的，而且与语言特定参数结合时，性能退化很小。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-5-3",
   "num": "5.3",
   "level": 2,
   "page": 16,
   "title": {
    "original": "Comparison to Other Work",
    "zh": "与其他工作的对比"
   },
   "blocks": [
    {
     "id": "p-5-3-1",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-5-3-1-1",
       "original": "Next, we present comparisons to other recent related work on multilingual ASR: Whisper [Radford et al., 2022] uses large quantities of labeled web data to train a model supporting 99 languages (§5.3.1) and Google USM [Zhang et al., 2023a] builds multilingual ASR models supporting 100 languages by pre-training on YouTube data (§5.3.2).",
       "zh": "接下来，我们与其他近期的多语言 ASR 相关工作进行对比：Whisper [Radford et al., 2022] 使用大量网络标注数据训练支持 99 种语言的模型（§5.3.1）；Google USM [Zhang et al., 2023a] 通过在 YouTube 数据上预训练，构建支持 100 种语言的多语言 ASR 模型（§5.3.2）。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-5-3-1",
   "num": "5.3.1",
   "level": 2,
   "page": 16,
   "title": {
    "original": "Whisper",
    "zh": "Whisper"
   },
   "blocks": [
    {
     "id": "p-5-3-1-1",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-5-3-1-1-1",
       "original": "Whisper is a multilingual model trained on 680K hours of weakly labeled audio data from the web and able to transcribe speech in 99 languages [Radford et al., 2022].",
       "zh": "Whisper 是一个在来自网络的 680K 小时弱标注音频数据上训练的多语言模型，能够转写 99 种语言的语音 [Radford et al., 2022]。"
      },
      {
       "id": "s-5-3-1-1-2",
       "original": "The model uses a sequence to sequence architecture [Sutskever et al., 2014] which has a neural sequence model as decoder that acts in part like a language model.",
       "zh": "该模型使用序列到序列架构 [Sutskever et al., 2014]，其解码器是一个神经序列模型，部分地充当语言模型。"
      },
      {
       "id": "s-5-3-1-1-3",
       "original": "The decoder has been trained on the target side text of the labeled training data which likely amounts to several billions of words of text from the web.20 20Assuming 10K words of text per hour of paired speech data, the decoder was trained on about 6.8B words.",
       "zh": "解码器在标注训练数据的目标侧文本上训练，这些文本可能高达来自网络的数十亿词。20 20假设每小时配对语音数据对应 10K 词文本，解码器约在 6.8B 词上训练。"
      }
     ]
    },
    {
     "id": "p-5-3-1-2",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-5-3-1-2-1",
       "original": "FLEURS-102 dev test Prior Work w2v-BERT [Chen et al., 2022] 12.3 Maestro-U [Chen et al., 2022] 8.7 USM [Zhang et al., 2023a] 6.9 USM-M [Zhang et al., 2023a] 6.5 USM-M-adapter [Zhang et al., 2023a] 6.7 This Work MMS FL-102 (LSFT) + LM 6.3 6.3",
       "zh": "FLEURS-102 dev test 先前工作 w2v-BERT [Chen et al., 2022] 12.3 Maestro-U [Chen et al., 2022] 8.7 USM [Zhang et al., 2023a] 6.9 USM-M [Zhang et al., 2023a] 6.5 USM-M-adapter [Zhang et al., 2023a] 6.7 本工作 MMS FL-102 (LSFT) + LM 6.3 6.3"
      }
     ]
    },
    {
     "id": "tab-5-3-1-1",
     "type": "table_caption",
     "page": 17,
     "original": "Table 4: Comparison to Google USM. We report average CER on the 102 languages of FLEURS and use n-gram models together with our CTC acoustic models. USM-M is an RNN-T model which uses both unlabeled text as well as labeled speech data during pre-training and for MMS we use unlabeled text to train language models for inference.",
     "zh": "表 4：与 Google USM 的对比。我们报告 FLEURS 102 种语言上的平均 CER，并将 n-gram 模型与我们的 CTC 声学模型搭配使用。USM-M 是一个 RNN-T 模型，在预训练时同时使用无标注文本和标注语音数据；而对 MMS，我们使用无标注文本来训练推理用的语言模型。"
    },
    {
     "id": "p-5-3-1-3",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-5-3-1-3-1",
       "original": "In contrast, MMS is a CTC model whose decoder is a simple linear layer mapping to a set of characters (§5.1).",
       "zh": "相比之下，MMS 是一个 CTC 模型，其解码器只是一个映射到字符集合的简单线性层（§5.1）。"
      },
      {
       "id": "s-5-3-1-3-2",
       "original": "When comparing CTC models to models with sequence-model based decoders, the former are typically paired with an external language model to enable a fairer comparison.",
       "zh": "在将 CTC 模型与基于序列模型的解码器模型对比时，前者通常搭配外部语言模型，以使比较更公平。"
      },
      {
       "id": "s-5-3-1-3-3",
       "original": "We therefore train simple n-gram models on web data (Common Crawl) for each language and use it during inference time (CC LM; Heafield 2011, Conneau et al. 2020b, NLLB_Team et al. 2022); Appendix B details the training procedure.",
       "zh": "因此，我们为每种语言在网络数据（Common Crawl）上训练简单的 n-gram 模型，并在推理时使用（CC LM；Heafield 2011, Conneau et al. 2020b, NLLB_Team et al. 2022）；附录 B 详述了训练过程。"
      },
      {
       "id": "s-5-3-1-3-4",
       "original": "We evaluate both models on the 54 languages of FLEURS supported by both Whisper and MMS (FLEURS-54) and report word error rate except for Thai, Lao, Burmese and Khmer where we use character error rate.21 The results (Table 3) show that MMS reduces the word error rate of Whisper by a relative 58% while supporting over 11 times the number of languages.",
       "zh": "我们在 Whisper 和 MMS 都支持的 54 种 FLEURS 语言（FLEURS-54）上评估两个模型，报告词错误率，但泰语、老挝语、缅甸语和高棉语除外——这些语言我们使用字错误率。21 结果（表 3）表明，MMS 将 Whisper 的词错误率相对降低了 58%，同时支持的语言数量是其 11 倍以上。"
      },
      {
       "id": "s-5-3-1-3-5",
       "original": "Moreover, MMS was trained on 44.7K hours of labeled data compared to 680K for Whisper.22 A reduced version of MMS trained on 61 languages can still outperform Whisper to a similar degree while being trained on only about 3K hours of labeled training data.",
       "zh": "此外，MMS 只用 44.7K 小时标注数据训练，而 Whisper 用了 680K 小时。22 在 61 种语言上训练的精简版 MMS 仍能以相近幅度超过 Whisper，而其标注训练数据仅约 3K 小时。"
      },
      {
       "id": "s-5-3-1-3-6",
       "original": "Overall, MMS (LSAH) outperforms Whisper on 31 out of the 54 languages.",
       "zh": "总体而言，MMS (LSAH) 在 54 种语言中的 31 种上超过 Whisper。"
      },
      {
       "id": "s-5-3-1-3-7",
       "original": "Appendix C provides a per-language breakdown of the results.",
       "zh": "附录 C 提供结果的逐语言分解。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-5-3-2",
   "num": "5.3.2",
   "level": 2,
   "page": 17,
   "title": {
    "original": "Google USM",
    "zh": "Google USM"
   },
   "blocks": [
    {
     "id": "p-5-3-2-1",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-5-3-2-1-1",
       "original": "This model is pre-trained on 12M hours of proprietary YouTube audio spanning 300 languages and then fine-tuned to perform ASR for up to 100 languages on a labeled dataset of 90K hours [Zhang et al., 2023a] which results in large improvements over Whisper.23 In a best effort comparison, we adopt the USM setup where the authors fine-tune their pre-trained model on the labeled FLEURS data.",
       "zh": "该模型在覆盖 300 种语言的 12M 小时专有 YouTube 音频上预训练，然后在 90K 小时的标注数据集上微调以执行最多 100 种语言的 ASR [Zhang et al., 2023a]，相比 Whisper 取得了很大提升。23 在尽力而为的比较中，我们采用 USM 的设置，即作者在标注的 FLEURS 数据上微调其预训练模型。"
      },
      {
       "id": "s-5-3-2-1-2",
       "original": "We follow the same training regime as outlined above (§5.1) but fine-tune this model for a total of 300K updates.",
       "zh": "我们遵循上述相同的训练方案（§5.1），但对该模型共微调 300K 次更新。"
      },
      {
       "id": "s-5-3-2-1-3",
       "original": "Results are in terms of character error rate.24 There are several important differences between their approach and MMS: first, USM uses an RNN-T model [Chan et al., 2015] which has a built-in neural language model while as MMS is a CTC- based acoustic model.25 Second, some of the USM models were pre-trained on large quantities of unlabeled text as well as 20K hours of labeled audio data (USM-M/USM-M-adapter) while as MMS is pre-trained only on unlabeled speech data.",
       "zh": "结果以字错误率报告。24 他们的方法与 MMS 之间有几个重要差异：第一，USM 使用 RNN-T 模型 [Chan et al., 2015]，内置神经语言模型；而 MMS 是基于 CTC 的声学模型。25 第二，部分 USM 模型在大量无标注文本以及 20K 小时标注音频数据上预训练（USM-M/USM-M-adapter）；而 MMS 仅在无标注语音数据上预训练。"
      }
     ]
    },
    {
     "id": "p-5-3-2-2",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-5-3-2-2-1",
       "original": "21We follow Whisper’s evaluation methodology but add Khmer to the list of languages where evaluation is in terms of CER because there is no standard tokenization we are aware of.",
       "zh": "21我们遵循 Whisper 的评估方法，但将高棉语加入以 CER 评估的语言列表，因为据我们所知它没有标准的分词方式。"
      }
     ]
    },
    {
     "id": "p-5-3-2-3",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-5-3-2-3-1",
       "original": "22The non-English portion of the Whisper training data is still 117K hours and covers less than 100 languages, while MMS-lab is less than half the size and covers 11 times the number of languages.",
       "zh": "22Whisper 训练数据中的非英语部分仍有 117K 小时，覆盖不到 100 种语言；而 MMS-lab 的规模不到其一半，覆盖的语言数量却是其 11 倍。"
      }
     ]
    },
    {
     "id": "p-5-3-2-4",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-5-3-2-4-1",
       "original": "23We were not able to obtain the list of languages involved in their comparison to Whisper and therefore resort to a comparison not involving the labeled YouTube data.",
       "zh": "23我们无法获得他们与 Whisper 对比所用的语言列表，因此只能进行不涉及标注 YouTube 数据的比较。"
      },
      {
       "id": "s-5-3-2-4-2",
       "original": "This has the downside of removing the impact of the labeled datasets of each approach in the comparison.",
       "zh": "这样做的缺点是，比较中排除了各方法标注数据集的影响。"
      }
     ]
    },
    {
     "id": "p-5-3-2-5",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-5-3-2-5-1",
       "original": "24Zhang et al. [2023a] did not perform any additional pre-processing on the reference transcriptions when reporting CER which enables a comparison to their results [Yu Zhang, personal communication 5 May 2023].",
       "zh": "24Zhang et al. [2023a] 在报告 CER 时未对参考转写做任何额外预处理，这使得与他们的结果可比 [Yu Zhang，私人通信，2023 年 5 月 5 日]。"
      }
     ]
    },
    {
     "id": "p-5-3-2-6",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-5-3-2-6-1",
       "original": "25RNN-T may benefit particularly from pre-training on unlabeled text data in the case of USM-M, effectively training a strong neural language model.",
       "zh": "25RNN-T 可能尤其受益于在无标注文本数据上的预训练——在 USM-M 的情形中，这实际上训练了一个强神经语言模型。"
      }
     ]
    },
    {
     "id": "p-5-3-2-7",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-5-3-2-7-1",
       "original": "#lang FLEURS CV VP MLS Prior Work VoxPopuli [Wang et al., 2021] 1 15.3 Maestro [Chen et al., 2022] 14 8.1 RNN-T 1B [Li et al., 2021] 15 7.9 Whisper [Radford et al., 2022] 99 13.6∗ 7.3* ML-IO [Tjandra et al., 2022b] 70 7.5 USM-M [Zhang et al., 2023a] 102 6.5 This Work - Single-Domain training FL 102 6.4 CV 76 19.7 VP 14 10.3 MLS 8 8.7 This Work - Multi-Domain training MMS-lab+FL+CV+VP+MLS 6.2 19.6 10.6 9.0",
       "zh": "#语言数 FLEURS CV VP MLS 先前工作 VoxPopuli [Wang et al., 2021] 1 15.3 Maestro [Chen et al., 2022] 14 8.1 RNN-T 1B [Li et al., 2021] 15 7.9 Whisper [Radford et al., 2022] 99 13.6∗ 7.3* ML-IO [Tjandra et al., 2022b] 70 7.5 USM-M [Zhang et al., 2023a] 102 6.5 本工作 - 单域训练 FL 102 6.4 CV 76 19.7 VP 14 10.3 MLS 8 8.7 本工作 - 多域训练 MMS-lab+FL+CV+VP+MLS 6.2 19.6 10.6 9.0"
      }
     ]
    },
    {
     "id": "tab-5-3-2-1",
     "type": "table_caption",
     "page": 18,
     "original": "Table 5: Evaluation of MMS on Multilingual Benchmarks. MMS is fine-tuned on MMS-lab, FLEURS, CommonVoice, Voxpopuli and MLS. We report CER on FLEURS and WER on the other benchmarks. Results are averaged over all languages of a benchmark and (∗) indicates results with a different data normalization which does not enable a strict comparison to other results [Radford et al., 2022]. Our models use n-gram language models trained on Common Crawl during inference. For each approach, we show the number of languages an individual models supports and some prior results are based on multiple models, e.g., Wang et al. [2021].",
     "zh": "表 5：MMS 在多语言基准上的评估。MMS 在 MMS-lab、FLEURS、CommonVoice、Voxpopuli 和 MLS 上微调。我们在 FLEURS 上报告 CER，在其他基准上报告 WER。结果按基准的所有语言取平均，(∗) 表示因数据规范化不同而无法与其他结果严格比较的结果 [Radford et al., 2022]。我们的模型在推理时使用在 Common Crawl 上训练的 n-gram 语言模型。对每种方法，我们给出单个模型支持的语言数量；部分先前结果基于多个模型，例如 Wang et al. [2021]。"
    },
    {
     "id": "p-5-3-2-8",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-5-3-2-8-1",
       "original": "To enable a fairer comparison, we use n-gram language models trained on unlabeled text during inference: for each language, we use either an n-gram model trained on CommonCrawl or a model trained on the transcriptions of the FLEURS training set, depending on dev set performance and data availability.",
       "zh": "为使比较更公平，我们在推理时使用在无标注文本上训练的 n-gram 语言模型：对每种语言，根据开发集性能和数据可得性，我们使用在 CommonCrawl 上训练的 n-gram 模型，或在 FLEURS 训练集转写上训练的模型。"
      },
      {
       "id": "s-5-3-2-8-2",
       "original": "Appendix B details the training procedure.",
       "zh": "附录 B 详述了训练过程。"
      }
     ]
    },
    {
     "id": "tab-5-3-2-2",
     "type": "table_caption",
     "page": 18,
     "original": "Table 4 shows that MMS performs very competitively compared to USM. We note that the approaches have significant differences in the model architecture and uses of unlabeled/labeled data, however, we believe that the result convinces the reader that a simple CTC model paired with n-gram models can perform very competitively to more advanced architectures and more elaborate pre-training procedures. Appendix D shows a per-language breakdown of the results.",
     "zh": "表 4 表明，MMS 相比 USM 非常有竞争力。我们注意到，这些方法在模型架构和无标注/标注数据的使用上存在显著差异；然而，我们相信这一结果足以让读者信服：一个简单的 CTC 模型搭配 n-gram 模型，就能与更先进的架构和更精细的预训练流程相媲美。附录 D 展示结果的逐语言分解。"
    }
   ]
  },
  {
   "id": "sec-5-4",
   "num": "5.4",
   "level": 2,
   "page": 18,
   "title": {
    "original": "Robust Multilingual ASR Models",
    "zh": "鲁棒的多语言 ASR 模型"
   },
   "blocks": [
    {
     "id": "p-5-4-1",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-5-4-1-1",
       "original": "In this section, we turn to building multilingual ASR models on data from multiple domains following a similar approach as prior work for English-only models [Likhomanenko et al., 2020, Chan et al., 2021, Hsu et al., 2021].",
       "zh": "在本节中，我们转向在来自多个领域的数据上构建多语言 ASR 模型，方法类似于先前针对纯英语模型的工作 [Likhomanenko et al., 2020, Chan et al., 2021, Hsu et al., 2021]。"
      },
      {
       "id": "s-5-4-1-2",
       "original": "We fine-tune the pre-trained MMS (1B) model on MMS-lab, FLEURS, CommonVoice, VoxPopuli, and MLS data to support 1,162 language and perform 300K updates; we denote this as multi-domain training.",
       "zh": "我们在 MMS-lab、FLEURS、CommonVoice、VoxPopuli 和 MLS 数据上微调预训练的 MMS (1B) 模型，以支持 1,162 种语言，共执行 300K 次更新；我们称之为多域训练。"
      },
      {
       "id": "s-5-4-1-3",
       "original": "During fine-tuninig, the data of each language and dataset is balanced similar to pre-training (§4.2; using βD = 0 and βL = 0.3).",
       "zh": "微调期间，每种语言和每个数据集的数据按与预训练类似的方式平衡（§4.2；使用 βD = 0 和 βL = 0.3）。"
      },
      {
       "id": "s-5-4-1-4",
       "original": "The validation set for this model is the concatenation of the dev sets of each dataset for every language.",
       "zh": "该模型的验证集是每个数据集所有语言开发集的拼接。"
      }
     ]
    },
    {
     "id": "p-5-4-2",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-5-4-2-1",
       "original": "We evaluate this single model on FLEURS, CommonVoice, VoxPopuli and MLS.",
       "zh": "我们在 FLEURS、CommonVoice、VoxPopuli 和 MLS 上评估这个单一模型。"
      },
      {
       "id": "s-5-4-2-2",
       "original": "For FLEURS we measure average CER on the 102 languages of FLEURS, for CommonVoice WER over 76 languages, for VoxPopuli WER over 14 languages and for MLS WER over eight languages.",
       "zh": "对 FLEURS，我们在其 102 种语言上测量平均 CER；对 CommonVoice，在 76 种语言上测量 WER；对 VoxPopuli，在 14 种语言上测量 WER；对 MLS，在 8 种语言上测量 WER。"
      },
      {
       "id": "s-5-4-2-3",
       "original": "We also fine-tune MMS (1B) on each benchmark individually (single-domain training).26 During inference, we use n-gram models trained on CommonCrawl data.",
       "zh": "我们还分别在每个基准上单独微调 MMS (1B)（单域训练）。26 推理时，我们使用在 CommonCrawl 数据上训练的 n-gram 模型。"
      }
     ]
    },
    {
     "id": "tab-5-4-1",
     "type": "table_caption",
     "page": 18,
     "original": "Table 5 shows that the multi-domain model (MMS-lab+FL+CV+VP+MLS) can perform very competitively in several settings: For both FLEURS and CommonVoice it outperforms prior work as well the single-domain baselines and for VoxPopuli and MLS it is slightly worse than the single-domain baselines. For VoxPopuli, the MMS model it is outperformed by Maestro which supports a much",
     "zh": "表 5 表明，多域模型（MMS-lab+FL+CV+VP+MLS）在多个设置下都很有竞争力：在 FLEURS 和 CommonVoice 上，它超过先前工作和单域基线；在 VoxPopuli 和 MLS 上，它略逊于单域基线。在 VoxPopuli 上，MMS 模型被 Maestro 超越——后者支持的语言数量要少得多"
    },
    {
     "id": "p-5-4-3",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-5-4-3-1",
       "original": "26Models trained on FLEURS data were trained for 300K updates, for MLS models we found 50k updates to work well, CommonVoice and VoxPopuli models were trained for 200K updates.",
       "zh": "26在 FLEURS 数据上训练的模型训练了 300K 次更新；对 MLS 模型，我们发现 50k 次更新效果良好；CommonVoice 和 VoxPopuli 模型训练了 200K 次更新。"
      }
     ]
    },
    {
     "id": "p-5-4-4",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-5-4-4-1",
       "original": "#lang CER CER ≤5 % Asia 335 330 South America 136 132 North America 144 139 Europe 41 40 Africa 363 331 Pacific 88 87",
       "zh": "#语言数 CER CER ≤5 % 亚洲 335 330 南美洲 136 132 北美洲 144 139 欧洲 41 40 非洲 363 331 太平洋 88 87"
      }
     ]
    },
    {
     "id": "tab-5-4-2",
     "type": "table_caption",
     "page": 19,
     "original": "Table 6: ASR Evaluation on 1,107 Languages. We evaluate the MMS multi-domain model trained on MMS-lab, FLEURS, CommonVoice, VoxPopuli, and MLS supporting 1,162 languages (§5.4) Results are in terms of the average character error rate on the MMS-lab test sets for the languages of different geographical regions. We also show the number of languages for which the model achieves CER less than five, indicating systems which on average produce no more than one incorrect character every twenty characters. All results are shown with confidence interval 95%.",
     "zh": "表 6：1,107 种语言上的 ASR 评估。我们评估在 MMS-lab、FLEURS、CommonVoice、VoxPopuli 和 MLS 上训练的、支持 1,162 种语言的 MMS 多域模型（§5.4）。结果是不同地理区域语言在 MMS-lab 测试集上的平均字错误率。我们还展示模型达到 CER 小于 5 的语言数量，即平均每 20 个字符出错不超过 1 个的系统。所有结果均带 95% 置信区间。"
    },
    {
     "id": "p-5-4-5",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-5-4-5-1",
       "original": "smaller number of languages and on MLS other approaches are better which attribute to a focus on fewer languages.",
       "zh": "更少的语言；在 MLS 上，其他方法更好，这归因于它们聚焦更少语言。"
      },
      {
       "id": "s-5-4-5-2",
       "original": "Whisper results are not strictly comparable due to the different normalization but it appears to perform better on MLS due to a focus on head languages.",
       "zh": "由于规范化不同，Whisper 的结果无法严格比较，但它似乎在 MLS 上表现更好，因为它聚焦头部语言。"
      },
      {
       "id": "s-5-4-5-3",
       "original": "Overall, this demonstrates that a combined model supporting well over 1,000 languages can perform in aggregate competitively on a range of benchmarks.",
       "zh": "总体而言，这表明一个支持远超 1,000 种语言的组合模型，能在一系列基准上总体表现有竞争力。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-5-5",
   "num": "5.5",
   "level": 2,
   "page": 19,
   "title": {
    "original": "Evaluation on 1,107 Languages",
    "zh": "在 1,107 种语言上的评估"
   },
   "blocks": [
    {
     "id": "p-5-5-1",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-5-5-1-1",
       "original": "Finally, we evaluate the multi-domain model trained on MMS-lab, FLEURS, CommonVoice, VoxPopuli and MLS on the test sets of all 1,107 languages in MMS-lab.",
       "zh": "最后，我们在 MMS-lab 全部 1,107 种语言的测试集上，评估在 MMS-lab、FLEURS、CommonVoice、VoxPopuli 和 MLS 上训练的多域模型。"
      },
      {
       "id": "s-5-5-1-2",
       "original": "We measure character error rate and group languages into six geographical regions covered by MMS-lab: Asia, North America, South America, Europe, Africa and the Pacific region.",
       "zh": "我们测量字错误率，并将语言按 MMS-lab 覆盖的六个地理区域分组：亚洲、北美洲、南美洲、欧洲、非洲和太平洋地区。"
      },
      {
       "id": "s-5-5-1-3",
       "original": "In order to get a broader sense of quality, we measure the number of languages for which CER ≤5.",
       "zh": "为获得对质量的更宏观认识，我们统计 CER ≤5 的语言数量。"
      },
      {
       "id": "s-5-5-1-4",
       "original": "This indicates for how many languages the model makes on average no more than one error in twenty characters.",
       "zh": "这表示模型在多少种语言上平均每 20 个字符出错不超过 1 个。"
      },
      {
       "id": "s-5-5-1-5",
       "original": "While this measure is very coarse, it enables us to get a sense of quality across such a large number of languages.",
       "zh": "虽然这一度量非常粗糙，但它使我们能在如此大量的语言上对质量有所把握。"
      }
     ]
    },
    {
     "id": "tab-5-5-1",
     "type": "table_caption",
     "page": 19,
     "original": "Table 6 shows that our model meets the CER quality threshold for 96% of the 1,107 languages. The region with the lowest rate is Africa at 91% and we attribute this in part to different writing scripts. We note that this metric is by far not perfect as it imposes the same threshold for every language which may not be appropriate due to different character sets etc. Also, many of the recordings in MMS-lab are single speaker which means that both the training data and the test data contains utterances with the same voice for a particular language. While this makes evaluation challenging, we hope that this analysis gives a sense that the model can be used to transcribe a wide variety of languages.",
     "zh": "表 6 表明，我们的模型在 1,107 种语言中的 96% 达到了 CER 质量阈值。比例最低的区域是非洲，为 91%，我们将这部分归因于不同的书写文字。我们注意到，这一度量远非完美，因为它对每种语言施加相同的阈值，而由于字符集不同等原因，这可能并不合适。此外，MMS-lab 中的许多录音是单一说话人，这意味着对特定语言而言，训练数据和测试数据包含相同声音的语句。尽管这使评估具有挑战性，我们希望这一分析能让人感觉到：该模型可用于转写种类繁多的语言。"
    }
   ]
  },
  {
   "id": "sec-6",
   "num": "6",
   "level": 1,
   "page": 19,
   "title": {
    "original": "Language Identification",
    "zh": "语种识别"
   },
   "blocks": [
    {
     "id": "p-6-1",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-6-1-1",
       "original": "Language Identification (LID) is the task of determining the language which is spoken in a given utterance.",
       "zh": "语种识别（LID）是判定给定语句所说语言的任务。"
      },
      {
       "id": "s-6-1-2",
       "original": "This has several important applications: despite much work on multilingual speech recognition [Burget et al., 2010, Lin et al., 2009, Heigold et al., 2013, Bourlard et al., 2011, Cho et al., 2018, Toshniwal et al., 2018, Kannan et al., 2019, Li et al., 2019, Pratap et al., 2020b], many deployed systems are still trained on data in a single language despite the need to transcribe speech in different languages.",
       "zh": "它有若干重要应用：尽管多语言语音识别已有大量工作 [Burget et al., 2010, Lin et al., 2009, Heigold et al., 2013, Bourlard et al., 2011, Cho et al., 2018, Toshniwal et al., 2018, Kannan et al., 2019, Li et al., 2019, Pratap et al., 2020b]，许多部署系统中的模型仍在单一语言的数据上训练，尽管它们需要转写不同语言的语音。"
      },
      {
       "id": "s-6-1-3",
       "original": "It is therefore crucial to route utterances to the correct system and this routing depends on an LID model.",
       "zh": "因此，将语句路由到正确的系统至关重要，而这种路由依赖 LID 模型。"
      },
      {
       "id": "s-6-1-4",
       "original": "Moreover, much work on mining speech data from the web relies on LID, including some of the most recent large-scale weakly-supervised work [Radford et al., 2022].",
       "zh": "此外，许多从网络挖掘语音数据的工作都依赖 LID，包括一些最近的大规模弱监督工作 [Radford et al., 2022]。"
      },
      {
       "id": "s-6-1-5",
       "original": "Training a language identification system requires speech data for which the spoken language is known, however, the most diverse public corpora span no more than about 100 languages [Valk and Alumäe, 2020, Conneau et al., 2022].",
       "zh": "训练语种识别系统需要已知所说语言的语音数据，然而最多样化的公开语料库覆盖不超过约 100 种语言 [Valk and Alumäe, 2020, Conneau et al., 2022]。"
      }
     ]
    },
    {
     "id": "p-6-2",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-6-2-1",
       "original": "In this section, we first describe our methodology to build LID models (§6.1), then evaluate the feasibility of training LID systems using MMS-lab-U and MMS-unlab data compared data from",
       "zh": "在本节中，我们首先描述构建 LID 模型的方法（§6.1），然后评估用 MMS-lab-U 和 MMS-unlab 数据训练 LID 系统的可行性，并与来自"
      }
     ]
    },
    {
     "id": "eq-6-1",
     "type": "equation",
     "page": 20,
     "original": "100"
    },
    {
     "id": "p-6-3",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-6-3-1",
       "original": "-2.1% Dev Accuracy",
       "zh": "-2.1% 开发集准确率"
      }
     ]
    },
    {
     "id": "eq-6-2",
     "type": "equation",
     "page": 20,
     "original": "90"
    },
    {
     "id": "eq-6-3",
     "type": "equation",
     "page": 20,
     "original": "80"
    },
    {
     "id": "p-6-4",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-6-4-1",
       "original": "Model Trained on FLEURS VoxLingua-107 MMS-lab-U MMS-unlab MMS-lab-U+unlab -1.6% FLEURS VoxLingua-107 70 Evaluation Set",
       "zh": "模型训练数据 FLEURS VoxLingua-107 MMS-lab-U MMS-unlab MMS-lab-U+unlab -1.6% FLEURS VoxLingua-107 70 评估集"
      }
     ]
    },
    {
     "id": "fig-6-1",
     "type": "figure_caption",
     "page": 20,
     "original": "Figure 13: LID Performance with Different Training Datasets. Models trained on MMS-labU+unlab are very competitive to models trained on existing data (FLEURS, VoxLingua-107) when evaluated out-of-domain (comparison in dashed line). We train models on data from MMS-lab-U, MMS-unlab, FLEURS and VoxLingua-107 on a common subset of 72 languages and evaluate on FLEURS and VoxLingua-107.",
     "zh": "图 13：不同训练数据集下的 LID 性能。在分布外评估时，在 MMS-labU+unlab 上训练的模型与在现有数据（FLEURS、VoxLingua-107）上训练的模型相比非常有竞争力（虚线部分为对比）。我们在 72 种语言的公共子集上，用来自 MMS-lab-U、MMS-unlab、FLEURS 和 VoxLingua-107 的数据训练模型，并在 FLEURS 和 VoxLingua-107 上评估。"
    },
    {
     "id": "p-6-5",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-6-5-1",
       "original": "existing corpora (§6.2) and then build LID models with 40x more languages compared to existing systems (§6.3).27",
       "zh": "现有语料库的数据进行对比（§6.2）；然后构建语言数量是现有系统 40 倍的 LID 模型（§6.3）。27"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-6-1",
   "num": "6.1",
   "level": 2,
   "page": 20,
   "title": {
    "original": "Training Setup",
    "zh": "训练设置"
   },
   "blocks": [
    {
     "id": "p-6-1-1",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-6-1-1-1",
       "original": "We train models by fine-tuning the MMS (1B) pre-trained model (§4.2) for language identification.",
       "zh": "我们通过微调 MMS (1B) 预训练模型（§4.2）来进行语种识别，以此训练模型。"
      },
      {
       "id": "s-6-1-1-2",
       "original": "This is done by stacking a linear classifier on top of the pre-trained model, which maps to the set of possible languages for a particular task, followed by fine-tuning all parameters, including the pre-trained model.",
       "zh": "做法是在预训练模型之上堆叠一个线性分类器，映射到特定任务的可能语言集合，然后微调包括预训练模型在内的所有参数。"
      }
     ]
    },
    {
     "id": "p-6-1-2",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-6-1-2-1",
       "original": "We optimize models with Adam with exponential decay rates β1 = 0.9 and β2 = 0.98 and a tristate learning rate schedule where the learning rate is warmed up for the first 10% of updates, held constant for the next 40% and then linearly decayed for the remainder of training [Kingma and Ba, 2015].",
       "zh": "我们使用 Adam 优化模型，指数衰减率 β1 = 0.9、β2 = 0.98，采用三阶段学习率调度：前 10% 更新预热，接下来 40% 保持恒定，随后在剩余训练中线性衰减 [Kingma and Ba, 2015]。"
      },
      {
       "id": "s-6-1-2-2",
       "original": "During development, we experiment with different hyper-parameters and perform final model selection based on development set accuracy.",
       "zh": "开发期间，我们尝试了不同的超参数，并基于开发集准确率进行最终的模型选择。"
      },
      {
       "id": "s-6-1-2-3",
       "original": "We experiment with different learning rates (1 × 10−5, 3 × 10−5, 3 × 10−6, 5 × 10−6, 7 × 10−6), training updates (10K, 20K, 30K, 40K, 50K) and batch sizes (1.5min, 3min, 6min).",
       "zh": "我们尝试了不同的学习率（1 × 10−5, 3 × 10−5, 3 × 10−6, 5 × 10−6, 7 × 10−6）、训练更新次数（10K, 20K, 30K, 40K, 50K）和批大小（1.5min, 3min, 6min）。"
      },
      {
       "id": "s-6-1-2-4",
       "original": "We train models on 16 GPUs.",
       "zh": "我们在 16 块 GPU 上训练模型。"
      }
     ]
    },
    {
     "id": "p-6-1-3",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-6-1-3-1",
       "original": "To balance the different languages and corpora during training, we first balance the data of every language in the different corpora, using sampling parameter βL.",
       "zh": "为在训练期间平衡不同语言和语料库，我们首先使用采样参数 βL 平衡不同语料库中每种语言的数据。"
      },
      {
       "id": "s-6-1-3-2",
       "original": "This is followed by balancing each language using the resampled data of the first step, using sampling parameter βD with the sampling distribution outlined in §4.1.",
       "zh": "然后，使用第一步重采样得到的数据，按 §4.1 所述的采样分布，用采样参数 βD 平衡每种语言。"
      },
      {
       "id": "s-6-1-3-3",
       "original": "We experiment with βL and βD settings 0, 0.3, 0.5, 0.7 and 1.",
       "zh": "我们对 βL 和 βD 尝试了 0, 0.3, 0.5, 0.7 和 1 这些设置。"
      }
     ]
    },
    {
     "id": "p-6-1-4",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-6-1-4-1",
       "original": "When we train models on multiple datasets, then we use a development set containing up to 30 minutes of data for each language and we sample an equal amount of data from each corpus.",
       "zh": "当我们在多个数据集上训练模型时，我们使用每种语言至多 30 分钟数据的开发集，并从每个语料库中采样等量数据。"
      },
      {
       "id": "s-6-1-4-2",
       "original": "For models supporting 1K, 2K or 4K languages, we reduce the amount of data per language to 15 min, 7min and 3min to enable faster development.",
       "zh": "对于支持 1K、2K 或 4K 语言的模型，我们将每种语言的数据量分别降至 15 min、7min 和 3min，以加快开发速度。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-6-2",
   "num": "6.2",
   "level": 2,
   "page": 20,
   "title": {
    "original": "Comparison to Existing Datasets",
    "zh": "与现有数据集的对比"
   },
   "blocks": [
    {
     "id": "p-6-2-1",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-6-2-1-1",
       "original": "We first assess the effectiveness of training LID models on MMS-lab-U and MMS-unlab data compared to existing LID training data (FLEURS, VoxLingua-107).",
       "zh": "我们首先评估在 MMS-lab-U 和 MMS-unlab 数据上训练 LID 模型的效果，对比现有 LID 训练数据（FLEURS、VoxLingua-107）。"
      },
      {
       "id": "s-6-2-1-2",
       "original": "Performance is evaluated both on the FLEURS and VoxLingua-107 benchmarks.",
       "zh": "性能在 FLEURS 和 VoxLingua-107 两个基准上评估。"
      },
      {
       "id": "s-6-2-1-3",
       "original": "In this setting, FLEURS and VoxLingua107 models are at an advantage because there is no domain shift compared to systems trained on MMS-lab-U and MMS-unlab data.",
       "zh": "在这一设置中，FLEURS 和 VoxLingua107 模型处于优势，因为相比在 MMS-lab-U 和 MMS-unlab 数据上训练的系统，它们不存在领域偏移。"
      }
     ]
    },
    {
     "id": "p-6-2-2",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-6-2-2-1",
       "original": "We are particularly interested in the setting where models trained on existing corpora are evaluated out-of-domain, i.e., the performance of a model trained on VoxLingua-107 evaluated on FLEURS or 27Note that we use MMS-lab-U instead of MMS-lab because it supports more languages and we do not require the data to be paired with transcriptions for LID (§3.1.1).",
       "zh": "我们尤其关注这样一种设置：在现有语料上训练的模型在分布外评估——即在 VoxLingua-107 上训练的模型在 FLEURS 上评估的性能，或 27注意，我们使用 MMS-lab-U 而非 MMS-lab，因为它支持更多语言，且 LID 不需要数据与转写配对（§3.1.1）。"
      }
     ]
    },
    {
     "id": "p-6-2-3",
     "type": "paragraph",
     "page": 21,
     "sentences": [
      {
       "id": "s-6-2-3-1",
       "original": "#lang in-domain out-of-domain FLEURS VL BABEL VoxPopuli (102 lang.)",
       "zh": "#语言数 域内 分布外 FLEURS VL BABEL VoxPopuli (102 种语言）"
      }
     ]
    },
    {
     "id": "p-6-2-4",
     "type": "paragraph",
     "page": 21,
     "sentences": [
      {
       "id": "s-6-2-4-1",
       "original": "(33 lang.)",
       "zh": "（33 种语言）"
      }
     ]
    },
    {
     "id": "p-6-2-5",
     "type": "paragraph",
     "page": 21,
     "sentences": [
      {
       "id": "s-6-2-5-1",
       "original": "(23 lang.)",
       "zh": "（23 种语言）"
      }
     ]
    },
    {
     "id": "p-6-2-6",
     "type": "paragraph",
     "page": 21,
     "sentences": [
      {
       "id": "s-6-2-6-1",
       "original": "(25 lang.)",
       "zh": "（25 种语言）"
      }
     ]
    },
    {
     "id": "p-6-2-7",
     "type": "paragraph",
     "page": 21,
     "sentences": [
      {
       "id": "s-6-2-7-1",
       "original": "Prior Work mSLAM [Bapna et al., 2022b] 102 77.7 Whisper [Radford et al., 2022] 82 64.5 ASRL [Chen et al., 2023] 102 95.9 XLS-R [Babu et al., 2022] 107 94.3 SpeechBrain [Ravanelli et al., 2021] 107 93.3 AmberNet [Jia et al., 2022] 107 95.3 Our Baselines (based on existing datasets) MMS (FL) 102 96.2 MMS (VL) 107 94.7 MMS (FL + VL) 126 97.4 94.3 78 87.8 This Work MMS (MMS-lab-U+unlab+FL+VL) 126 97.5 93.9 84.1 87.3 256 97.2 93.4 80.1 87.6 512 96.8 92.9 81.6 85.6 97 92.8 80.5 86.2 97.3 92.8 81.5 86.6 97.2 93.9 80.5 87.1",
       "zh": "先前工作 mSLAM [Bapna et al., 2022b] 102 77.7 Whisper [Radford et al., 2022] 82 64.5 ASRL [Chen et al., 2023] 102 95.9 XLS-R [Babu et al., 2022] 107 94.3 SpeechBrain [Ravanelli et al., 2021] 107 93.3 AmberNet [Jia et al., 2022] 107 95.3 我们的基线（基于现有数据集）MMS (FL) 102 96.2 MMS (VL) 107 94.7 MMS (FL + VL) 126 97.4 94.3 78 87.8 本工作 MMS (MMS-lab-U+unlab+FL+VL) 126 97.5 93.9 84.1 87.3 256 97.2 93.4 80.1 87.6 512 96.8 92.9 81.6 85.6 97 92.8 80.5 86.2 97.3 92.8 81.5 86.6 97.2 93.9 80.5 87.1"
      }
     ]
    },
    {
     "id": "tab-6-2-1",
     "type": "table_caption",
     "page": 21,
     "original": "Table 7: Scaling LID to 4,017 Languages. We show test accuracy of LID models trained on an increasing number of languages using data from FLEURS (FL), VoxLingua-107 (VL) and MMS- lab-U+unlab; smaller language subsets are included in the larger subsets. There is little performance degradation when scaling to more languages. We also show results from the literature as well as baselines trained only on FL or VL.",
     "zh": "表 7：将 LID 扩展到 4,017 种语言。我们展示使用来自 FLEURS（FL）、VoxLingua-107（VL）和 MMS-lab-U+unlab 的数据、在递增语言数量上训练的 LID 模型的测试准确率；较小的语言子集包含在较大的子集中。扩展到更多语言时性能退化很小。我们还展示文献中的结果以及仅在 FL 或 VL 上训练的基线。"
    },
    {
     "id": "p-6-2-8",
     "type": "paragraph",
     "page": 21,
     "sentences": [
      {
       "id": "s-6-2-8-1",
       "original": "a model trained on FLEURS evaluated on VoxLingua-107 data, and how this compares to models trained on MMS-lab-U/MMS-unlab.",
       "zh": "在 FLEURS 上训练的模型在 VoxLingua-107 数据上评估的性能，以及这与在 MMS-lab-U/MMS-unlab 上训练的模型相比如何。"
      },
      {
       "id": "s-6-2-8-2",
       "original": "To enable a controlled comparison, we report LID accuracy on the 72 languages supported by all considered datasets and train only on data of these languages.",
       "zh": "为进行受控比较，我们在所有考虑的数据集都支持的 72 种语言上报告 LID 准确率，并只在这些语言的数据上训练。"
      }
     ]
    },
    {
     "id": "p-6-2-9",
     "type": "paragraph",
     "page": 21,
     "sentences": [
      {
       "id": "s-6-2-9-1",
       "original": "The results (Figure 13) show that MMS-lab-U+unlab enables LID with slightly lower performance compared to systems trained on existing datasets when both are evaluated out-of-domain: on FLEURS evaluation data the gap is 2.1% compared to a VoxLingua-107 model and on VoxLingua-107 evaluation data MMS-lab-U+unlab trails a FLEURS model by 1.6%.",
       "zh": "结果（图 13）表明，当双方都在分布外评估时，MMS-lab-U+unlab 训出的 LID 与在现有数据集上训练的系统相比性能略低：在 FLEURS 评估数据上，与 VoxLingua-107 模型的差距为 2.1%；在 VoxLingua-107 评估数据上，MMS-lab-U+unlab 落后 FLEURS 模型 1.6%。"
      },
      {
       "id": "s-6-2-9-2",
       "original": "Combining MMS-lab-U and MMS-unlab works particularly well as MMS-unlab is more varied which improves performance.",
       "zh": "MMS-lab-U 与 MMS-unlab 的组合效果尤其好，因为 MMS-unlab 更加多样，提升了性能。"
      },
      {
       "id": "s-6-2-9-3",
       "original": "Naturally, models trained on in-domain training data (FLEURS or VoxLingua-107) perform best.",
       "zh": "自然地，在域内训练数据（FLEURS 或 VoxLingua-107）上训练的模型表现最好。"
      },
      {
       "id": "s-6-2-9-4",
       "original": "We conclude that MMS-lab-U and MMS-unlab enable good quality LID models while enabling LID for many more languages as we will demonstrate next.",
       "zh": "我们的结论是，MMS-lab-U 和 MMS-unlab 能支持高质量的 LID 模型，同时能为多得多的语言实现 LID——接下来我们将展示这一点。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-6-3",
   "num": "6.3",
   "level": 2,
   "page": 21,
   "title": {
    "original": "Scaling Language Identification to 4,017 Languages",
    "zh": "将语种识别扩展到 4,017 种语言"
   },
   "blocks": [
    {
     "id": "p-6-3-1",
     "type": "paragraph",
     "page": 21,
     "sentences": [
      {
       "id": "s-6-3-1-1",
       "original": "Next, we scale spoken language identification from about 100 languages to 4,017 languages by combining MMS-lab-U, MMS-unlab, FLEURS, and VoxLingua-107 data.",
       "zh": "接下来，我们通过组合 MMS-lab-U、MMS-unlab、FLEURS 和 VoxLingua-107 数据，将口语语种识别从约 100 种语言扩展到 4,017 种语言。"
      },
      {
       "id": "s-6-3-1-2",
       "original": "Our primary goal is to understand how accuracy is impacted as models support more and more languages.",
       "zh": "我们的主要目标是理解随着模型支持的语言越来越多，准确率受到怎样的影响。"
      },
      {
       "id": "s-6-3-1-3",
       "original": "We start with 126 languages, the union of the languages in both FLEURS and VoxLingua-107, and then add languages from MMS-lab-U+unlab, roughly doubling the number of languages at every experiment.",
       "zh": "我们从 126 种语言开始——这是 FLEURS 和 VoxLingua-107 语言的并集——然后从 MMS-lab-U+unlab 中加入语言，每次实验大致将语言数量翻倍。"
      },
      {
       "id": "s-6-3-1-4",
       "original": "Languages are sorted by descending speaker count and we add the most spoken languages first.28 Performance is evaluated on FLEURS and VoxLingua-107 which is in-domain with respect to the models we train.",
       "zh": "语言按使用人数降序排列，我们优先加入使用人数最多的语言。28 性能在 FLEURS 和 VoxLingua-107 上评估，这对我们训练的模型而言是域内的。"
      },
      {
       "id": "s-6-3-1-5",
       "original": "To get a sense of how the models perform on domains not seen in the training data, we also evaluate on two other datasets which are out-of-domain with respect to the training data domain: first, BABEL is conversational telephone speech data and we evaluate on 23 African 28We obtain the number of speakers of each language from https://www.ethnologue.com and Asian languages [Gales et al., 2014].29 Second, VoxPopuli [Wang et al., 2021] consists of parliamentary speech in 25 languages from the European parliament.",
       "zh": "为了解模型在训练数据未曾见过的领域上的表现，我们还在另外两个相对训练数据领域而言是分布外的数据集上评估：第一，BABEL 是电话会话语音数据，我们在 23 种非洲 28我们从 https://www.ethnologue.com 获取每种语言的使用人数 和亚洲语言 [Gales et al., 2014] 上评估。29 第二，VoxPopuli [Wang et al., 2021] 由欧洲议会的 25 种语言的议会演讲组成。"
      },
      {
       "id": "s-6-3-1-6",
       "original": "We evaluate on 2.5 hours of data for each language sampled from the VoxPopuli unlabeled data portion.",
       "zh": "我们在每种语言 2.5 小时、从 VoxPopuli 无标注数据部分采样的数据上评估。"
      }
     ]
    },
    {
     "id": "tab-6-3-1",
     "type": "table_caption",
     "page": 22,
     "original": "Table 7 shows that MMS models scale very well: increasing the number of languages from 126 to 4,017 results in a modest performance drop of just 0.3% on FLEURS and no drop on VoxLingua-107. Out-of-domain we observe a drop of 3.6% on BABEL and 0.2% on VoxPopuli. The results are also competitive to models trained only on in-domain data: On FLEURS evaluation data, the 4,017 language MMS model performs 1% better than the baseline trained only on FLEURS data and is only 0.2% behind the baseline trained on both FLEURS and VoxLingua-107. On VoxLingua-107 evaluation data, the gap is 0.4-0.8%. This shows that scaling LID to 4,017 can result in models with competitive performance to models trained on much fewer languages.",
     "zh": "表 7 表明 MMS 模型的扩展性非常好：将语言数量从 126 增加到 4,017，在 FLEURS 上仅有 0.3% 的小幅性能下降，在 VoxLingua-107 上没有下降。在分布外，我们观察到 BABEL 上下降 3.6%，VoxPopuli 上下降 0.2%。这些结果与仅在域内数据上训练的模型相比也有竞争力：在 FLEURS 评估数据上，4,017 语言的 MMS 模型比仅在 FLEURS 数据上训练的基线好 1%，仅落后于在 FLEURS 和 VoxLingua-107 上共同训练的基线 0.2%。在 VoxLingua-107 评估数据上，差距为 0.4-0.8%。这表明，将 LID 扩展到 4,017 种语言可以得到与在少得多的语言上训练的模型性能相竞争的模型。"
    }
   ]
  },
  {
   "id": "sec-7",
   "num": "7",
   "level": 1,
   "page": 22,
   "title": {
    "original": "Speech Synthesis",
    "zh": "语音合成"
   },
   "blocks": [
    {
     "id": "p-7-1",
     "type": "paragraph",
     "page": 22,
     "sentences": [
      {
       "id": "s-7-1-1",
       "original": "As a final downstream task we consider speech synthesis or text-to-speech (TTS) where models output speech for a corresponding input text.",
       "zh": "作为最后一个下游任务，我们考虑语音合成，即文本转语音（TTS），模型为对应的输入文本输出语音。"
      },
      {
       "id": "s-7-1-2",
       "original": "Most prior work focuses on English using clean corpora and high quality phonemizers [Tan et al., 2021].",
       "zh": "大多数先前工作聚焦于英语，使用干净的语料库和高质量的音素化工具 [Tan et al., 2021]。"
      },
      {
       "id": "s-7-1-3",
       "original": "These resources are only available for a small number of languages which is why expanding TTS to 1,107 languages requires different choices.",
       "zh": "这些资源只对少数语言可用，这正是将 TTS 扩展到 1,107 种语言需要不同选择的原因。"
      },
      {
       "id": "s-7-1-4",
       "original": "Black [2019] built TTS systems for 699 languages using data from a similar source as MMS-lab.",
       "zh": "Black [2019] 使用与 MMS-lab 相似来源的数据，为 699 种语言构建了 TTS 系统。"
      },
      {
       "id": "s-7-1-5",
       "original": "Encouraged by our initial results indicating higher quality data (§3.3.1), we extend their work by building models for 1,107 languages.",
       "zh": "我们的初步结果表明数据质量更高（§3.3.1），受此鼓舞，我们扩展了他们的工作，为 1,107 种语言构建模型。"
      }
     ]
    },
    {
     "id": "p-7-2",
     "type": "paragraph",
     "page": 22,
     "sentences": [
      {
       "id": "s-7-2-1",
       "original": "We first describe the model architecture on which we build (§7.1), how we pre-process the data to train TTS models (§7.2) and how we evaluate our models (§7.3).",
       "zh": "我们首先描述所基于的模型架构（§7.1）、如何预处理数据以训练 TTS 模型（§7.2），以及如何评估我们的模型（§7.3）。"
      },
      {
       "id": "s-7-2-2",
       "original": "Next, we present an ablation of our design choices compared to a highly optimized setup used for English (§7.4).",
       "zh": "接下来，我们将我们的设计选择与一个为英语高度优化的设置进行消融对比（§7.4）。"
      },
      {
       "id": "s-7-2-3",
       "original": "We also measure performance when synthesizing out-of-domain data for 61 languages of the FLEURS benchmark (§7.5), and finally present results for all 1,107 languages (§7.6).",
       "zh": "我们还测量了在 FLEURS 基准的 61 种语言上合成域外数据时的性能（§7.5），最后给出全部 1,107 种语言的结果（§7.6）。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-7-1",
   "num": "7.1",
   "level": 2,
   "page": 22,
   "title": {
    "original": "Text-To-Speech Model",
    "zh": "文本转语音模型"
   },
   "blocks": [
    {
     "id": "p-7-1-1",
     "type": "paragraph",
     "page": 22,
     "sentences": [
      {
       "id": "s-7-1-1-1",
       "original": "Our Text-to-Speech (TTS) model is based on VITS [Kim et al., 2021], which is one of the stateof-the-art TTS approaches.",
       "zh": "我们的文本转语音（TTS）模型基于 VITS [Kim et al., 2021]，它是最先进的 TTS 方法之一。"
      },
      {
       "id": "s-7-1-1-2",
       "original": "While VITS has previously been applied in a multilingual setting for English, Portuguese, and French [Casanova et al., 2022], we scale it to 1,107 languages.",
       "zh": "虽然 VITS 此前已在英语、葡萄牙语和法语的多语言设置中应用 [Casanova et al., 2022]，我们将其扩展到 1,107 种语言。"
      }
     ]
    },
    {
     "id": "p-7-1-2",
     "type": "paragraph",
     "page": 22,
     "sentences": [
      {
       "id": "s-7-1-2-1",
       "original": "VITS is an end-to-end speech generation network that predicts the raw speech waveform from a text sequence.",
       "zh": "VITS 是一个端到端语音生成网络，从文本序列预测原始语音波形。"
      },
      {
       "id": "s-7-1-2-2",
       "original": "It can be viewed as a conditional variational auto-encoder (VAE; Kingma and Welling 2013) that estimates audio features based on the input text.",
       "zh": "它可以被视为一个条件变分自编码器（VAE；Kingma and Welling 2013），基于输入文本估计音频特征。"
      },
      {
       "id": "s-7-1-2-3",
       "original": "The spectrogram-based acoustic features are generated by a flow-based sub-network, which includes multiple affine coupling layers [Dinh et al., 2017] and a text encoder.",
       "zh": "基于频谱图的声学特征由一个基于流的子网络生成，该子网络包含多个仿射耦合层 [Dinh et al., 2017] 和一个文本编码器。"
      },
      {
       "id": "s-7-1-2-4",
       "original": "The waveform is decoded using a stack of transposed convolutional layers that have been adapted from HiFi-GAN [Kong et al., 2020].",
       "zh": "波形通过一叠转置卷积层解码，这些层改编自 HiFi-GAN [Kong et al., 2020]。"
      },
      {
       "id": "s-7-1-2-5",
       "original": "The model is trained end-to-end with a combination of losses derived from variational lower bound and adversarial training.",
       "zh": "模型以端到端方式训练，损失函数由变分下界和对抗训练导出并组合而成。"
      },
      {
       "id": "s-7-1-2-6",
       "original": "During inference, the text encodings are upsampled based on an internal duration prediction module and then mapped into the waveform using a cascade of the flow module and HiFi-GAN decoder.",
       "zh": "在推理时，文本编码先基于一个内部时长预测模块进行上采样，然后通过流模块与 HiFi-GAN 解码器的级联映射为波形。"
      }
     ]
    },
    {
     "id": "p-7-1-3",
     "type": "paragraph",
     "page": 22,
     "sentences": [
      {
       "id": "s-7-1-3-1",
       "original": "We train separate VITS models for each language.",
       "zh": "我们为每种语言训练独立的 VITS 模型。"
      },
      {
       "id": "s-7-1-3-2",
       "original": "Most of our hyperparameters are identical to the VITS model trained on LJSpeech [Ito and Johnson, 2017, Kim et al., 2021] except for these differences: Instead of training the model for 800K steps, we train each model for 100K steps using eight V100-GPUs with a batch size of 64 per GPU.",
       "zh": "我们的大多数超参数与在 LJSpeech 上训练的 VITS 模型相同 [Ito and Johnson, 2017, Kim et al., 2021]，但有以下不同：我们不是训练模型 800K 步，而是每个模型训练 100K 步，使用 8 块 V100 GPU，每块 GPU 批大小为 64。"
      },
      {
       "id": "s-7-1-3-3",
       "original": "This setup was only slightly worse than the original configuration but reduced training time by approximately eight times which made training a large number of TTS systems feasible (§7.3).",
       "zh": "这一设置只比原始配置略差，但将训练时间缩短了约 8 倍，使训练大量 TTS 系统变得可行（§7.3）。"
      },
      {
       "id": "s-7-1-3-4",
       "original": "We experimented with different learning rate settings and found that the original learning rate schedule of VITS worked best.",
       "zh": "我们尝试了不同的学习率设置，发现 VITS 原始的学习率调度效果最好。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-7-2",
   "num": "7.2",
   "level": 2,
   "page": 22,
   "title": {
    "original": "Text and Speech Data Pre-processing Data Selection.",
    "zh": "文本与语音数据预处理：数据选择"
   },
   "blocks": [
    {
     "id": "p-7-2-1",
     "type": "paragraph",
     "page": 22,
     "sentences": [
      {
       "id": "s-7-2-1-1",
       "original": "To train models we use the MMS-lab dataset which provides paired speech and text data.",
       "zh": "为训练模型，我们使用 MMS-lab 数据集，它提供配对的语音和文本数据。"
      },
      {
       "id": "s-7-2-1-2",
       "original": "For most languages we have a single recording of the New Testament, however, for 99 languages 29Amharic, Assamese, Bengali, Cantonese, Cebuano, Georgian, Guarani, Haitian Creole, Igbo, Javanese, Kazakh, Lao, Lithuanian, Dholuo, Mongolian, Pashto, Swahili, Tagalog, Tamil, Telugu, Turkish, Vietnamese, Zulu.",
       "zh": "对大多数语言，我们有一份《新约》录音，然而对 99 种语言 29阿姆哈拉语、阿萨姆语、孟加拉语、粤语、宿务语、格鲁吉亚语、瓜拉尼语、海地克里奥尔语、伊博语、爪哇语、哈萨克语、老挝语、立陶宛语、Dholuo、蒙古语、普什图语、斯瓦希里语、他加禄语、泰米尔语、泰卢固语、土耳其语、越南语、祖鲁语。"
      },
      {
       "id": "s-7-2-1-3",
       "original": "We evaluate on test utterances longer than 10 seconds. multiple recordings are available (§3.1.1).",
       "zh": "我们在长于 10 秒的测试语句上评估。有多份录音可用（§3.1.1）。"
      },
      {
       "id": "s-7-2-1-4",
       "original": "For these languages, we choose a single recording in order to avoid introducing additional speakers into the training data.",
       "zh": "对这些语言，我们选择单份录音，以避免向训练数据中引入额外的说话人。"
      },
      {
       "id": "s-7-2-1-5",
       "original": "To choose a recording, we train ASR models on the data and select the recording based on which the corresponding ASR model achieves the lowest CER on a held-out set of an out-of-domain evaluation set.",
       "zh": "为选择录音，我们在数据上训练 ASR 模型，并根据对应 ASR 模型在域外评估集的留出集上取得最低 CER 来选择录音。"
      },
      {
       "id": "s-7-2-1-6",
       "original": "If no out-of-domain evaluation set is available, we choose a random recording.",
       "zh": "如果没有域外评估集可用，我们随机选择一份录音。"
      },
      {
       "id": "s-7-2-1-7",
       "original": "Finally, if there are both drama and non-drama recordings, then we consider only non-drama recordings.",
       "zh": "最后，如果同时存在广播剧和非广播剧录音，则只考虑非广播剧录音。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-text-representations",
   "num": null,
   "level": 2,
   "page": 23,
   "title": {
    "original": "Text Representations.",
    "zh": "文本表示"
   },
   "blocks": [
    {
     "id": "p-text-representations-1",
     "type": "paragraph",
     "page": 23,
     "sentences": [
      {
       "id": "s-text-representations-1-1",
       "original": "Most current TTS models convert text to phonemes using grapheme-tophoneme tools such as g2p [Park and Kim, 2019] which rely on a lexicon to map input characters to phonetic representations.",
       "zh": "当前大多数 TTS 模型使用字形到音素（grapheme-to-phoneme）工具（如 g2p [Park and Kim, 2019]）将文本转换为音素，这些工具依赖词典将输入字符映射到音位表示。"
      },
      {
       "id": "s-text-representations-1-2",
       "original": "However, such lexicons are not available for most low resource languages since they require manual annotation.",
       "zh": "然而，这类词典对大多数低资源语言不可用，因为它们需要人工标注。"
      },
      {
       "id": "s-text-representations-1-3",
       "original": "In order to scale TTS to over one thousand languages, we represent the input text as individual letters for languages with a small vocabulary.",
       "zh": "为了将 TTS 扩展到一千多种语言，我们对词汇规模较小的语言将输入文本表示为单个字母。"
      },
      {
       "id": "s-text-representations-1-4",
       "original": "For languages with 200 or more characters, we use a uroman encoding (Hermjakob et al. 2018; §3.1.4).",
       "zh": "对拥有 200 个或更多字符的语言，我们使用 uroman 编码（Hermjakob et al. 2018；§3.1.4）。"
      },
      {
       "id": "s-text-representations-1-5",
       "original": "We validated this strategy on the languages of FLEURS where found that letter-based models outperform uroman-based systems across all languages, except for Amharic and Korean, which both have large character sets of between 200-1,000 characters.",
       "zh": "我们在 FLEURS 的语言上验证了这一策略，发现基于字母的模型在所有语言上都优于基于 uroman 的系统，除了阿姆哈拉语和韩语，二者都拥有介于 200-1,000 之间的大型字符集。"
      },
      {
       "id": "s-text-representations-1-6",
       "original": "We therefore used this mixed strategy.30",
       "zh": "因此我们采用了这种混合策略。30"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-speech-data-pre-processing",
   "num": null,
   "level": 2,
   "page": 23,
   "title": {
    "original": "Speech Data Pre-processing.",
    "zh": "语音数据预处理"
   },
   "blocks": [
    {
     "id": "p-speech-data-pre-processing-1",
     "type": "paragraph",
     "page": 23,
     "sentences": [
      {
       "id": "s-speech-data-pre-processing-1-1",
       "original": "For drama recordings, we remove background music to enhance the quality of TTS models.",
       "zh": "对于广播剧录音，我们去除背景音乐以提升 TTS 模型的质量。"
      },
      {
       "id": "s-speech-data-pre-processing-1-2",
       "original": "We use a denoiser model [Defossez et al., 2020] to remove background music.",
       "zh": "我们使用一个降噪器模型 [Defossez et al., 2020] 来去除背景音乐。"
      },
      {
       "id": "s-speech-data-pre-processing-1-3",
       "original": "We also noticed that some utterances contain multiple speakers, usually voicing different characters in the read stories.",
       "zh": "我们还注意到，一些语句包含多个说话人，通常是为朗读故事中的不同角色配音。"
      },
      {
       "id": "s-speech-data-pre-processing-1-4",
       "original": "We use a simple heuristic to detect those utterances and remove them from the training data.",
       "zh": "我们使用一个简单的启发式方法来检测这些语句，并将其从训练数据中移除。"
      },
      {
       "id": "s-speech-data-pre-processing-1-5",
       "original": "The heuristic computes the variance of the pitch on voiced frames and removes utterances with high variance in the pitch; the pitch estimation is based on Mauch and Dixon [2014].",
       "zh": "该启发式方法计算浊音帧上音高的方差，并移除音高方差高的语句；音高估计基于 Mauch and Dixon [2014]。"
      },
      {
       "id": "s-speech-data-pre-processing-1-6",
       "original": "We found that removing 15% of the utterances with the highest pitch variance in each recording removed many multi-speaker utterances.",
       "zh": "我们发现，移除每份录音中音高方差最高的 15% 的语句，可以去除许多多说话人语句。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-7-3",
   "num": "7.3",
   "level": 2,
   "page": 23,
   "title": {
    "original": "Evaluation Methodology",
    "zh": "评估方法"
   },
   "blocks": [
    {
     "id": "p-7-3-1",
     "type": "paragraph",
     "page": 23,
     "sentences": [
      {
       "id": "s-7-3-1-1",
       "original": "Evaluation of speech synthesis is not straightforward even in the most researched English setting comprising a clean corpus with single speaker data [Ito and Johnson, 2017] and expanding evaluation to a large number of languages poses additional challenges.",
       "zh": "即使在研究最充分的英语设置（由干净语料库和单说话人数据组成 [Ito and Johnson, 2017]）中，语音合成的评估也并不直接，而将评估扩展到大量语言会带来更多挑战。"
      },
      {
       "id": "s-7-3-1-2",
       "original": "Similar to prior work, we rely on both automatic metrics (MCD and ASR) and human studies which we detail next.",
       "zh": "与先前工作类似，我们同时依赖自动指标（MCD 和 ASR）和人类研究，下文将详细说明。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-mel-cepstral-distortion-mcd",
   "num": null,
   "level": 2,
   "page": 23,
   "title": {
    "original": "Mel-Cepstral Distortion (MCD).",
    "zh": "梅尔倒谱失真（MCD）"
   },
   "blocks": [
    {
     "id": "p-mel-cepstral-distortion-mcd-1",
     "type": "paragraph",
     "page": 23,
     "sentences": [
      {
       "id": "s-mel-cepstral-distortion-mcd-1-1",
       "original": "Mel-cepstral distortion is an automatic metric which measures the closeness of synthesized speech to a human utterance for the same text in terms of the warping distance of mel frequency cepstral coefficients.",
       "zh": "梅尔倒谱失真（MCD）是一个自动指标，它通过梅尔频率倒谱系数的规整距离，衡量合成语音与同一文本的人类语句之间的接近程度。"
      },
      {
       "id": "s-mel-cepstral-distortion-mcd-1-2",
       "original": "There are two disadvantages of MCD: first, it is only meaningful when the voice and prosody of the speaker as well as recording conditions in the training data matches the evaluation data because the mel cepstral sequences are sensitive to these aspects.",
       "zh": "MCD 有两个缺点：第一，只有当训练数据与评估数据在说话人的嗓音和韵律以及录音条件上匹配时，它才有意义，因为梅尔倒谱序列对这些方面很敏感。"
      },
      {
       "id": "s-mel-cepstral-distortion-mcd-1-3",
       "original": "This prevents evaluation on data outside the MMS-lab domain.",
       "zh": "这妨碍了在 MMS-lab 领域之外的数据上进行评估。"
      },
      {
       "id": "s-mel-cepstral-distortion-mcd-1-4",
       "original": "Second, it is not well suited to measuring the intelligibility of the TTS output.",
       "zh": "第二，它不太适合衡量 TTS 输出的可懂度。"
      },
      {
       "id": "s-mel-cepstral-distortion-mcd-1-5",
       "original": "We address the former by focusing MCD evaluation on MMS-lab data and the latter via the next metric.",
       "zh": "我们通过将 MCD 评估聚焦于 MMS-lab 数据来解决前者，并通过下一个指标解决后者。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-automatic-speech-recognition-asr",
   "num": null,
   "level": 2,
   "page": 23,
   "title": {
    "original": "Automatic speech recognition (ASR).",
    "zh": "自动语音识别（ASR）"
   },
   "blocks": [
    {
     "id": "p-automatic-speech-recognition-asr-1",
     "type": "paragraph",
     "page": 23,
     "sentences": [
      {
       "id": "s-automatic-speech-recognition-asr-1-1",
       "original": "Transcribing the synthesized speech with automatic speech recognition and then measuring the error rate has the potential to address both issues of MCD: it can be measured on evaluation sets which are out-of-domain and it captures the content of the synthesized speech.",
       "zh": "用自动语音识别转写合成语音然后测量错误率，有可能解决 MCD 的两个问题：它可以在域外的评估集上测量，并且能捕捉合成语音的内容。"
      },
      {
       "id": "s-automatic-speech-recognition-asr-1-2",
       "original": "Specifically, we synthesize both in-domain data from the MMS-lab evaluation sets as well as out-of-domain data from the FLEURS corpus.",
       "zh": "具体来说，我们既合成来自 MMS-lab 评估集的域内数据，也合成来自 FLEURS 语料库的域外数据。"
      },
      {
       "id": "s-automatic-speech-recognition-asr-1-3",
       "original": "Next, we apply ASR models and compute CER of the ASR model output with respect to the input text of the TTS system.",
       "zh": "接下来，我们应用 ASR 模型，计算 ASR 模型输出相对于 TTS 系统输入文本的 CER。"
      },
      {
       "id": "s-automatic-speech-recognition-asr-1-4",
       "original": "Low CER indicates that the TTS model is able to capture the content of the input text.",
       "zh": "低 CER 表明 TTS 模型能够捕捉输入文本的内容。"
      },
      {
       "id": "s-automatic-speech-recognition-asr-1-5",
       "original": "Unless otherwise stated, we use ASR models trained on FLEURS data.",
       "zh": "除非另有说明，我们使用在 FLEURS 数据上训练的 ASR 模型。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-mean-opinion-score-mos",
   "num": null,
   "level": 2,
   "page": 23,
   "title": {
    "original": "Mean Opinion Score (MOS).",
    "zh": "平均意见分（MOS）"
   },
   "blocks": [
    {
     "id": "p-mean-opinion-score-mos-1",
     "type": "paragraph",
     "page": 23,
     "sentences": [
      {
       "id": "s-mean-opinion-score-mos-1-1",
       "original": "Finally, we evaluate models using MOS and because it is very hard to find human raters proficient for a large number of languages, we ask raters to judge the fidelity of the synthesized samples together with how natural the speech sounds.",
       "zh": "最后，我们使用 MOS 评估模型，而且由于很难找到精通大量语言的人工评分员，我们要求评分员同时判断合成样本的保真度和语音听起来的自然度。"
      },
      {
       "id": "s-mean-opinion-score-mos-1-2",
       "original": "We rely on ASR to get a sense of how much of the content is preserved in the TTS outputs and consider the MOS score for generation quality and naturalness.",
       "zh": "我们依靠 ASR 来了解 TTS 输出中保留了多少内容，并将 MOS 分数用于衡量生成质量和自然度。"
      },
      {
       "id": "s-mean-opinion-score-mos-1-3",
       "original": "We evaluate 50 samples per method of each language, collect 30For all 1,107 languages, the following languages use a uroman encoding: Amharic, Gumuz, Korean, Sebat Bet Gurage and Tigrinya. train train text ASR (CER) MOS upd data repr.",
       "zh": "我们对每种语言的每种方法评估 50 个样本，收集 30对全部 1,107 种语言，以下语言使用 uroman 编码：阿姆哈拉语、Gumuz、韩语、Sebat Bet Gurage 和提格里尼亚语。训练 训练 文本 ASR (CER) MOS 更新次数 数据 表示"
      }
     ]
    },
    {
     "id": "p-mean-opinion-score-mos-2",
     "type": "paragraph",
     "page": 24,
     "sentences": [
      {
       "id": "s-mean-opinion-score-mos-2-1",
       "original": "MMS-lab LJS FLEURS MMS-lab LJS FLEURS Natural speech 4.4 4.3 9.3 LJS phon.",
       "zh": "MMS-lab LJS FLEURS MMS-lab LJS FLEURS 自然语音 4.4 4.3 9.3 LJS 音素"
      }
     ]
    },
    {
     "id": "p-mean-opinion-score-mos-3",
     "type": "paragraph",
     "page": 24,
     "sentences": [
      {
       "id": "s-mean-opinion-score-mos-3-1",
       "original": "5.5 4.9 5.9 LJS phon.",
       "zh": "5.5 4.9 5.9 LJS 音素"
      }
     ]
    },
    {
     "id": "p-mean-opinion-score-mos-4",
     "type": "paragraph",
     "page": 24,
     "sentences": [
      {
       "id": "s-mean-opinion-score-mos-4-1",
       "original": "6.3 4.9 6.3 MMS-lab phon.",
       "zh": "6.3 4.9 6.3 MMS-lab 音素"
      }
     ]
    },
    {
     "id": "p-mean-opinion-score-mos-5",
     "type": "paragraph",
     "page": 24,
     "sentences": [
      {
       "id": "s-mean-opinion-score-mos-5-1",
       "original": "7.2 6.8 7.9 MMS-lab chars 7.2 9.2 10.0",
       "zh": "7.2 6.8 7.9 MMS-lab 字符 7.2 9.2 10.0"
      }
     ]
    },
    {
     "id": "tab-mean-opinion-score-mos-1",
     "type": "table_caption",
     "page": 24,
     "original": "Table 8: Ablation of Training Setup. Our design choices (last row) lead to a moderate quality reduction compared to the standard VITS setup (second row) but enable scaling TTS to 1,107 languages. The standard VITS setting performs 800K training updates on clean LJSpeech data using a high quality phonemizer while as MMS is trained on MMS-lab data for fewer updates and with characters. Natural speech results are based on the human utterances of each dataset. We report ASR CER and MOS scores from a human study with confidence interval 95% on the English development sets of MMS-lab, LJSpeech and FLEURS.",
     "zh": "表 8：训练设置的消融。我们的设计选择（最后一行）相比标准 VITS 设置（第二行）带来适度的质量下降，但使 TTS 能扩展到 1,107 种语言。标准 VITS 设置在干净的 LJSpeech 数据上用高质量音素化工具执行 800K 次训练更新，而 MMS 在 MMS-lab 数据上以更少更新次数和字符输入训练。自然语音结果基于各数据集的人类语句。我们报告 ASR CER 和来自人类研究的 MOS 分数（置信区间 95%），在 MMS-lab、LJSpeech 和 FLEURS 的英语开发集上评估。"
    },
    {
     "id": "p-mean-opinion-score-mos-6",
     "type": "paragraph",
     "page": 24,
     "sentences": [
      {
       "id": "s-mean-opinion-score-mos-6-1",
       "original": "ASR (CER) MOS MMS-lab LJS FLEURS MMS-lab LJS FLEURS Natural speech 4.4 4.3 9.3 no background music 7.2 9.2 10.0 background music 11.8 15.6 16.1 + denoise 10.8 13.2 14.4 + denoise + filter 7.8 10.8 11.9",
       "zh": "ASR (CER) MOS MMS-lab LJS FLEURS MMS-lab LJS FLEURS 自然语音 4.4 4.3 9.3 无背景音乐 7.2 9.2 10.0 有背景音乐 11.8 15.6 16.1 + 降噪 10.8 13.2 14.4 + 降噪 + 过滤 7.8 10.8 11.9"
      }
     ]
    },
    {
     "id": "tab-mean-opinion-score-mos-2",
     "type": "table_caption",
     "page": 24,
     "original": "Table 9: Ablation of Building TTS Models using Data with Background Music. Curating the training data containing background music results in TTS systems which approach the performance of models trained on recordings without background music. We show MOS ratings as well as ASR CER on three different benchmarks for English data for the development sets of MMS-lab, LJSpeech and FLEURS. The TTS model labeled \"no background music\" is identical to the last row in Table 8 and we use the MMS-lab development set of the non-drama recording.",
     "zh": "表 9：使用含背景音乐的数据构建 TTS 模型的消融。对含背景音乐的训练数据进行整理，得到的 TTS 系统接近在无背景音乐录音上训练的模型的性能。我们展示了英语数据在 MMS-lab、LJSpeech 和 FLEURS 三个基准开发集上的 MOS 评分以及 ASR CER。标注为\"无背景音乐\"的 TTS 模型与表 8 最后一行相同，我们使用非广播剧录音的 MMS-lab 开发集。"
    },
    {
     "id": "p-mean-opinion-score-mos-7",
     "type": "paragraph",
     "page": 24,
     "sentences": [
      {
       "id": "s-mean-opinion-score-mos-7-1",
       "original": "ten judgements per sample and ask raters to judge the quality from 1 (lowest quality) to 5 (highest quality).",
       "zh": "每个样本 10 个判断，并要求评分员按 1（最低质量）到 5（最高质量）评判质量。"
      },
      {
       "id": "s-mean-opinion-score-mos-7-2",
       "original": "Results are reported in terms of the mean score as well as the 95% confidence interval.",
       "zh": "结果以平均分和 95% 置信区间报告。"
      },
      {
       "id": "s-mean-opinion-score-mos-7-3",
       "original": "We use the CrowdMOS [Ribeiro et al., 2011] package with the recommended recipes for detecting and discarding inaccurate ratings.",
       "zh": "我们使用 CrowdMOS [Ribeiro et al., 2011] 软件包及其推荐的配方来检测和丢弃不准确的评分。"
      },
      {
       "id": "s-mean-opinion-score-mos-7-4",
       "original": "We do not require raters to be able to speak the respective language (except for English) as it is very hard to find raters that speak all the languages we consider.",
       "zh": "我们不要求评分员会说相应语言（英语除外），因为很难找到会说我们考虑的所有语言的评分员。"
      },
      {
       "id": "s-mean-opinion-score-mos-7-5",
       "original": "We rely on the ASR error rate to get a sense of content preservation in the TTS models.",
       "zh": "我们依靠 ASR 错误率来了解 TTS 模型中的内容保留程度。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-7-4",
   "num": "7.4",
   "level": 2,
   "page": 24,
   "title": {
    "original": "Evaluation of Design Choices",
    "zh": "设计选择的评估"
   },
   "blocks": []
  },
  {
   "id": "sec-7-4-1",
   "num": "7.4.1",
   "level": 2,
   "page": 24,
   "title": {
    "original": "Training Setup",
    "zh": "训练设置"
   },
   "blocks": [
    {
     "id": "p-7-4-1-1",
     "type": "paragraph",
     "page": 24,
     "sentences": [
      {
       "id": "s-7-4-1-1-1",
       "original": "We first analyze the quality of our training setup (§7.1) and compare it to the common VITS setup [Kim et al., 2021] which trains models for up to 800K updates on the clean LJSpeech corpus [Ito and Johnson, 2017] with text data pre-processed by a high-quality phonemizer [Park and Kim, 2019].",
       "zh": "我们首先分析我们的训练设置（§7.1）的质量，并与常见的 VITS 设置 [Kim et al., 2021] 进行对比，后者在干净的 LJSpeech 语料库 [Ito and Johnson, 2017] 上训练模型多达 800K 次更新，文本数据由高质量音素化工具预处理 [Park and Kim, 2019]。"
      },
      {
       "id": "s-7-4-1-1-2",
       "original": "This contrasts to our setup where we train the same model for 100K updates on the MMS-lab data using letters.",
       "zh": "这与我们的设置形成对比：我们在 MMS-lab 数据上使用字母训练同一模型 100K 次更新。"
      }
     ]
    },
    {
     "id": "p-7-4-1-2",
     "type": "paragraph",
     "page": 24,
     "sentences": [
      {
       "id": "s-7-4-1-2-1",
       "original": "We evaluate performance on the development sets of MMS-lab which is in-domain for MMS-lab models, LJSpeech (LJS; Ito and Johnson 2017) which is in-domain for the original VITS setup and FLEURS which is out-of-domain for both.31 The audio of FLEURS frequently contains high levels of noise and reverberation and it is relatively uncommon to use it for TTS, however, it does cover a 31For measuring CER on LJSpeech, we remove punctuation and capitalization of both references and hypothesis using the normalization of Radford et al. [2022].",
       "zh": "我们在 MMS-lab 的开发集上评估性能——这对 MMS-lab 模型是域内的；在 LJSpeech（LJS；Ito and Johnson 2017）上评估——这对原始 VITS 设置是域内的；以及在 FLEURS 上评估——这对两者都是域外的。31 FLEURS 的音频经常包含高水平的噪声和混响，用它做 TTS 相对少见，然而它确实覆盖了 31在 LJSpeech 上测量 CER 时，我们使用 Radford et al. [2022] 的归一化方法去除参考和假设中的标点与大小写。"
      }
     ]
    },
    {
     "id": "p-7-4-1-3",
     "type": "paragraph",
     "page": 25,
     "sentences": [
      {
       "id": "s-7-4-1-3-1",
       "original": "ASR (CER) MOS TTS ref TTS ref In-domain 11.1 9.2 Out-of-domain 11.3 8.8 3.33 ± 0.12∗",
       "zh": "ASR (CER) MOS TTS ref TTS ref 域内 11.1 9.2 域外 11.3 8.8 3.33 ± 0.12∗"
      }
     ]
    },
    {
     "id": "tab-7-4-1-1",
     "type": "table_caption",
     "page": 25,
     "original": "Table 10: TTS in-domain and Out-of-domain Evaluation on 61 Languages. We synthesize the test sets of MMS-lab (in-domain) and FLEURS (out-of-domain) to measure character error rate (CER) and collect human judgements (MOS) for both the model outputs (TTS) and human utterances (ref). The MMS models are robust with little performance degradation when applied to general domain data (out-of-domain): they retain much of the original content (low difference between CER of TTS and ref) and the systems produce outputs with good prosody and sound quality (low difference between MOS scores between TTS and ref). We show MOS scores with confidence interval 95%. (∗) human judges assigned low ratings since the human reference audio in FLEURS contains a lot of variability compared to synthesized speech or the MMS-lab reference speech (in-domain ref).",
     "zh": "表 10：61 种语言上的 TTS 域内与域外评估。我们合成 MMS-lab（域内）和 FLEURS（域外）的测试集，以测量字错误率（CER）并为模型输出（TTS）和人类语句（ref）收集人类判断（MOS）。MMS 模型是稳健的，在应用于通用领域数据（域外）时性能退化很小：它们保留了大部分原始内容（TTS 与 ref 的 CER 差异小），并且系统产出的输出具有良好的韵律和音质（TTS 与 ref 的 MOS 分数差异小）。我们展示置信区间 95% 的 MOS 分数。(∗) 人类评委对 FLEURS 中的人类参考音频给出了较低评分，因为相比合成语音或 MMS-lab 参考语音（域内 ref），它包含大量变化。"
    },
    {
     "id": "p-7-4-1-4",
     "type": "paragraph",
     "page": 25,
     "sentences": [
      {
       "id": "s-7-4-1-4-1",
       "original": "large number of languages and it is out-of-domain with respect to the MMS-lab training data which makes it an interesting evaluation set, particularly for the experiment in §7.5.",
       "zh": "大量语言，且相对 MMS-lab 训练数据而言是域外的，这使它成为一个有趣的评估集，特别是对 §7.5 的实验而言。"
      }
     ]
    },
    {
     "id": "tab-7-4-1-2",
     "type": "table_caption",
     "page": 25,
     "original": "Table 8 shows that our reduced setup (row 5) generally performs less well than the highly optimized setup of VITS for LJSpeech (row 2; Kim et al. 2021) and each design choice (fewer training updates, MMS-lab training data and character inputs) leads to a reduction in quality. In terms of character error rate, the degradation is most pronounced on out-of-domain settings with respect to our reduced setup (row 5) and less so on the in-dmain MMS-lab development set. We stress that these choices enable scaling TTS to over 1,000 languages at manageable compute requirements and no need for language-specific text processing tools.",
     "zh": "表 8 表明，我们的精简设置（第 5 行）总体上不如为 LJSpeech 高度优化的 VITS 设置（第 2 行；Kim et al. 2021），且每一项设计选择（更少的训练更新、MMS-lab 训练数据和字符输入）都导致质量下降。就字错误率而言，退化在相对我们精简设置（第 5 行）的域外场景中最为明显，在域内的 MMS-lab 开发集上则较小。我们强调，这些选择使得以可控的算力需求将 TTS 扩展到 1,000 多种语言成为可能，且无需语言特定的文本处理工具。"
    },
    {
     "id": "p-7-4-1-5",
     "type": "paragraph",
     "page": 25,
     "sentences": [
      {
       "id": "s-7-4-1-5-1",
       "original": "Note that the CER of almost all models on FLEURS data is lower than for the corresponding natural speech and that the MOS scores of the human reference utterances is also lower than for other datasets.",
       "zh": "注意，几乎所有模型在 FLEURS 数据上的 CER 都低于对应的自然语音，而人类参考语句的 MOS 分数也低于其他数据集。"
      },
      {
       "id": "s-7-4-1-5-2",
       "original": "We attribute this to the high levels of noise and reverberation in the FLEURS audio which results in increased CER for the original samples compared to the CER of the synthesized samples.",
       "zh": "我们将其归因于 FLEURS 音频中高水平的噪声和混响，这使得原始样本的 CER 相比合成样本的 CER 升高了。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-7-4-2",
   "num": "7.4.2",
   "level": 2,
   "page": 25,
   "title": {
    "original": "Data with Background Music",
    "zh": "含背景音乐的数据"
   },
   "blocks": [
    {
     "id": "p-7-4-2-1",
     "type": "paragraph",
     "page": 25,
     "sentences": [
      {
       "id": "s-7-4-2-1-1",
       "original": "Next, we ablate how we build speech synthesis models based on recordings with background music which is a setting that applies to about 38% of the languages (§3.1.1).",
       "zh": "接下来，我们消融如何基于含背景音乐的录音构建语音合成模型，这一设置适用于约 38% 的语言（§3.1.1）。"
      },
      {
       "id": "s-7-4-2-1-2",
       "original": "For this purpose, we train a model on an English recording with background music before and after the pre-processing steps outlined in §7.2 and compare this to a model trained on another English recording that does not contain any background music to start with (no background music).",
       "zh": "为此，我们在一份含背景音乐的英语录音上，分别在执行 §7.2 所述预处理步骤之前和之后训练模型，并与在另一份本身不含任何背景音乐的英语录音上训练的模型（无背景音乐）进行对比。"
      },
      {
       "id": "s-7-4-2-1-3",
       "original": "The pre-processing denoises the data and removes utterances with multiple speakers.",
       "zh": "预处理对数据进行降噪并移除含多说话人的语句。"
      }
     ]
    },
    {
     "id": "p-7-4-2-2",
     "type": "paragraph",
     "page": 25,
     "sentences": [
      {
       "id": "s-7-4-2-2-1",
       "original": "The results (Table 9) show that both denoising and removing samples with multi-speaker utterances results in performance improvements compared to the original data with background music.",
       "zh": "结果（表 9）表明，与使用含背景音乐的原始数据相比，降噪和移除多说话人语句的样本都能带来性能提升。"
      },
      {
       "id": "s-7-4-2-2-2",
       "original": "Both steps reduce the CER gap to models trained on no background music data by 69-87% relative to the CER of the system trained on data with background music.",
       "zh": "相对在含背景音乐数据上训练的系统，这两个步骤将与无背景音乐数据所训模型之间的 CER 差距缩小了 69-87%。"
      },
      {
       "id": "s-7-4-2-2-3",
       "original": "MOS scores also increase after pre-processing, sometimes close to the level of the data with no background music on MMS-lab evaluation data (3.47 vs. 3.51).",
       "zh": "预处理后 MOS 分数也有所提高，在 MMS-lab 评估数据上有时接近无背景音乐数据的水平（3.47 vs. 3.51）。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-7-5",
   "num": "7.5",
   "level": 2,
   "page": 25,
   "title": {
    "original": "Out-of-Domain Evaluation",
    "zh": "域外评估"
   },
   "blocks": [
    {
     "id": "p-7-5-1",
     "type": "paragraph",
     "page": 25,
     "sentences": [
      {
       "id": "s-7-5-1-1",
       "original": "The MMS-lab data is from a particular narrow domain (§3.1.1) which poses the question of whether TTS models trained on this data will generalize to other domains.",
       "zh": "MMS-lab 数据来自一个特定的狭窄领域（§3.1.1），这就提出了一个问题：在该数据上训练的 TTS 模型能否泛化到其他领域。"
      },
      {
       "id": "s-7-5-1-2",
       "original": "To get a better sense of this, we train speech synthesis models and evaluate their quality on both in-domain and out-of-domain data.",
       "zh": "为更好地了解这一点，我们训练语音合成模型，并在域内和域外数据上评估其质量。"
      },
      {
       "id": "s-7-5-1-3",
       "original": "As in-domain data we use the test sets of MMS-lab and as out-of-domain data we use FLEURS.",
       "zh": "我们使用 MMS-lab 的测试集作为域内数据，使用 FLEURS 作为域外数据。"
      },
      {
       "id": "s-7-5-1-4",
       "original": "This enables evaluation on 61 languages of the FLEURS benchmark (FLEURS-61) which are covered by MMS-lab data.",
       "zh": "这使我们能在 FLEURS 基准中被 MMS-lab 数据覆盖的 61 种语言（FLEURS-61）上评估。"
      },
      {
       "id": "s-7-5-1-5",
       "original": "However, a downside of FLEURS is that it contains high levels of noise which makes it challenging when comparing synthesized audio to the human reference audio.",
       "zh": "然而，FLEURS 的一个缺点是它含有高水平噪声，这使得合成音频与人类参考音频的比较变得困难。"
      }
     ]
    },
    {
     "id": "tab-7-5-1",
     "type": "table_caption",
     "page": 25,
     "original": "Table 10 shows that MMS models are robust to domain shift: the CER of synthesized speech (TTS) is only slightly higher out-of-domain compared to in-domain and MOS scores for the synthesized",
     "zh": "表 10 表明，MMS 模型对领域偏移具有稳健性：合成语音（TTS）的 CER 在域外仅略高于域内，且合成样本的 MOS 分数"
    },
    {
     "id": "p-7-5-2",
     "type": "paragraph",
     "page": 26,
     "sentences": [
      {
       "id": "s-7-5-2-1",
       "original": "#lang MCD ASR (CER) TTS CER % TTS ref ≤5 Asia 335 296 South America 136 129 North America 144 125 Europe 41 39 Africa 363 277 Pacific 88 79 945",
       "zh": "#语言数 MCD ASR (CER) TTS CER % TTS ref ≤5 亚洲 335 296 南美洲 136 129 北美洲 144 125 欧洲 41 39 非洲 363 277 太平洋 88 79 945"
      }
     ]
    },
    {
     "id": "tab-7-5-2",
     "type": "table_caption",
     "page": 26,
     "original": "Table 11: TTS Evaluation on 1,107 Languages. The majority of MMS TTS models can synthesize speech which preserves most of the content as per the ASR character error rates (TTS CER ≤5). We report MCD and character error rate for the synthesized outputs (TTS) of the MMS-lab test sets as well as the human references (ref). We also show the number of systems which achieve CER less than five, indicating systems which on average produce no more than one incorrect character every twenty characters. Results are shown with confidence interval 95%.",
     "zh": "表 11：1,107 种语言上的 TTS 评估。大多数 MMS TTS 模型能合成保留大部分内容的语音，按 ASR 字错误率衡量（TTS CER ≤5）。我们报告 MMS-lab 测试集的合成输出（TTS）以及人类参考（ref）的 MCD 和字错误率。我们还展示 CER 小于 5 的系统数量，表示平均每 20 个字符产生不超过 1 个错误字符的系统。结果带 95% 置信区间。"
    },
    {
     "id": "p-7-5-3",
     "type": "paragraph",
     "page": 26,
     "sentences": [
      {
       "id": "s-7-5-3-1",
       "original": "samples are nearly identical.",
       "zh": "样本的 MOS 分数几乎相同。"
      },
      {
       "id": "s-7-5-3-2",
       "original": "We note that the in-domain and out-of-domain settings are measured on different data which does not enable strong claims about identical performance.",
       "zh": "我们注意到，域内和域外设置是在不同数据上测量的，这无法支持关于性能相同的强论断。"
      },
      {
       "id": "s-7-5-3-3",
       "original": "The systems also retain much of the original content as the small difference in CER between TTS and human utterances (ref) shows.",
       "zh": "这些系统也保留了大部分原始内容，正如 TTS 与人类语句（ref）之间 CER 的微小差异所示。"
      }
     ]
    },
    {
     "id": "p-7-5-4",
     "type": "paragraph",
     "page": 26,
     "sentences": [
      {
       "id": "s-7-5-4-1",
       "original": "The MOS scores also indicate that our systems have lower sound quality compared to human utterances but the difference is not very large on in-domain data (3.51 vs. 3.61).",
       "zh": "MOS 分数还表明，我们的系统相比人类语句音质较低，但在域内数据上差距不是很大（3.51 vs. 3.61）。"
      },
      {
       "id": "s-7-5-4-2",
       "original": "Unfortunately, out-of-domain MOS scores for the references are affected by the noisy speech in the FLEURS audio as noted earlier.",
       "zh": "不幸的是，如前所述，参考语音的域外 MOS 分数受到 FLEURS 音频中噪声语音的影响。"
      },
      {
       "id": "s-7-5-4-3",
       "original": "We conclude that TTS models trained on MMS-lab data perform well out-of-domain.",
       "zh": "我们的结论是，在 MMS-lab 数据上训练的 TTS 模型在域外表现良好。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-7-6",
   "num": "7.6",
   "level": 2,
   "page": 26,
   "title": {
    "original": "Evaluation on 1,107 Languages",
    "zh": "在 1,107 种语言上的评估"
   },
   "blocks": [
    {
     "id": "p-7-6-1",
     "type": "paragraph",
     "page": 26,
     "sentences": [
      {
       "id": "s-7-6-1-1",
       "original": "Finally, we train models for all languages of MMS-lab and focus on in-domain evaluation since finding out-of-domain evaluation data for such a large number of languages is difficult.",
       "zh": "最后，我们为 MMS-lab 的所有语言训练模型，并聚焦于域内评估，因为要为如此大量的语言找到域外评估数据是困难的。"
      },
      {
       "id": "s-7-6-1-2",
       "original": "Specifically, we measure MCD and ASR CER on the MMS-lab test sets.",
       "zh": "具体来说，我们在 MMS-lab 测试集上测量 MCD 和 ASR CER。"
      },
      {
       "id": "s-7-6-1-3",
       "original": "To be able to evaluate ASR quality on all languages, we use ASR models trained on MMS-lab data which results in much lower error rates.",
       "zh": "为了能在所有语言上评估 ASR 质量，我们使用在 MMS-lab 数据上训练的 ASR 模型，这带来低得多的错误率。"
      },
      {
       "id": "s-7-6-1-4",
       "original": "Similar to §5.5, we group results into six geographical regions covered by MMS-lab: Asia, North America, South America, Europe, Africa and the Pacific region.",
       "zh": "与 §5.5 类似，我们将结果按 MMS-lab 覆盖的六个地理区域分组：亚洲、北美洲、南美洲、欧洲、非洲和太平洋地区。"
      }
     ]
    },
    {
     "id": "p-7-6-2",
     "type": "paragraph",
     "page": 26,
     "sentences": [
      {
       "id": "s-7-6-2-1",
       "original": "To get an overall sense of how many models are of good quality, we measure whether the model for a particular language has ASR CER ≤5.",
       "zh": "为总体把握有多少模型质量良好，我们衡量特定语言的模型是否达到 ASR CER ≤5。"
      },
      {
       "id": "s-7-6-2-2",
       "original": "This indicates the number of systems which make on average no more than one error in twenty characters.",
       "zh": "这表示平均每 20 个字符出错不超过 1 个的系统数量。"
      },
      {
       "id": "s-7-6-2-3",
       "original": "While this measure is by far not perfect, it enables us to get a broad sense of quality across a large number of languages.",
       "zh": "虽然这一度量远非完美，但它使我们能在大量语言上对质量有一个宏观把握。"
      }
     ]
    },
    {
     "id": "tab-7-6-1",
     "type": "table_caption",
     "page": 26,
     "original": "Table 11 shows that about 85% of the 1,107 languages meet the CER quality threshold. South American and European languages achieve the highest rate at 95% and African languages the lowest rate of 76%. This is in part driven by different writing scripts. The ASR character error rates are generally low because the error rates are based on ASR models trained on MMS-lab data.",
     "zh": "表 11 表明，1,107 种语言中约 85% 达到 CER 质量阈值。南美洲和欧洲语言达标率最高，为 95%，非洲语言最低，为 76%。这部分由不同的书写文字造成。ASR 字错误率总体较低，因为错误率是基于在 MMS-lab 数据上训练的 ASR 模型计算的。"
    }
   ]
  },
  {
   "id": "sec-8",
   "num": "8",
   "level": 1,
   "page": 26,
   "title": {
    "original": "Bias Analysis and Ethical Considerations",
    "zh": "偏见分析与伦理考量"
   },
   "blocks": [
    {
     "id": "p-8-1",
     "type": "paragraph",
     "page": 26,
     "sentences": [
      {
       "id": "s-8-1-1",
       "original": "Training machine learning models on religious texts may introduce biases and requires ethical considerations.",
       "zh": "在宗教文本上训练机器学习模型可能引入偏见，并需要伦理上的考量。"
      },
      {
       "id": "s-8-1-2",
       "original": "In this section, we analyze whether our models are biased to perform better for different genders (§8.1), if the language produced by our models is religiously biased (§8.2 and finally, we discuss ethical considerations of using religious texts in research (§8.3).",
       "zh": "在本节中，我们分析模型是否对不同性别的说话人表现更好（§8.1）、模型产出的语言是否带有宗教偏见（§8.2），最后讨论在研究中使用宗教文本的伦理考量（§8.3）。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-8-1",
   "num": "8.1",
   "level": 2,
   "page": 26,
   "title": {
    "original": "Understanding Gender Bias",
    "zh": "理解性别偏见"
   },
   "blocks": [
    {
     "id": "p-8-1-1",
     "type": "paragraph",
     "page": 26,
     "sentences": [
      {
       "id": "s-8-1-1-1",
       "original": "Most speakers in MMS-lab dataset appear to be male and this bears the risk of machine learning models trained on this data performing better for male speakers.",
       "zh": "MMS-lab 数据集中的大多数说话人似乎是男性，这存在这样一种风险：在该数据上训练的机器学习模型对男性说话人表现更好。"
      },
      {
       "id": "s-8-1-1-2",
       "original": "To understand whether the models trained on our datasets (§3) exhibit gender bias, we perform the following experiment: we evaluate",
       "zh": "为理解在我们的数据集（§3）上训练的模型是否表现出性别偏见，我们进行以下实验：我们评估"
      }
     ]
    },
    {
     "id": "eq-8-1-1",
     "type": "equation",
     "page": 27,
     "original": "15",
     "zh": "15"
    },
    {
     "id": "p-8-1-2",
     "type": "paragraph",
     "page": 27,
     "sentences": [
      {
       "id": "s-8-1-2-1",
       "original": "MMS data FLEURS data",
       "zh": "MMS 数据 FLEURS 数据"
      }
     ]
    },
    {
     "id": "eq-8-1-2",
     "type": "equation",
     "page": 27,
     "original": "10",
     "zh": "10"
    },
    {
     "id": "p-8-1-3",
     "type": "paragraph",
     "page": 27,
     "sentences": [
      {
       "id": "s-8-1-3-1",
       "original": "CER",
       "zh": "CER"
      }
     ]
    },
    {
     "id": "eq-8-1-3",
     "type": "equation",
     "page": 27,
     "original": "5",
     "zh": "5"
    },
    {
     "id": "p-8-1-4",
     "type": "paragraph",
     "page": 27,
     "sentences": [
      {
       "id": "s-8-1-4-1",
       "original": "Overall Female Male 0",
       "zh": "总体 女性 男性 0"
      }
     ]
    },
    {
     "id": "fig-8-1-1",
     "type": "figure_caption",
     "page": 27,
     "original": "Figure 14: Analysis of Gender Bias. We compare the character error rate (CER) of automatic speech recognition models trained on MMS-lab data and FLEURS data for male and female spakers. Results are on the development sets of 27 languages of the FLEURS benchmark for which MMS-lab provides data and for which there are at least 50 samples for each gender.",
     "zh": "图 14：性别偏见分析。我们比较在 MMS-lab 数据和 FLEURS 数据上训练的自动语音识别模型对男性和女性说话人的字错误率（CER）。结果在 FLEURS 基准中 MMS-lab 提供数据且每种性别至少有 50 个样本的 27 种语言的开发集上。"
    },
    {
     "id": "p-8-1-5",
     "type": "paragraph",
     "page": 27,
     "sentences": [
      {
       "id": "s-8-1-5-1",
       "original": "models on the development set of FLEURS which contains metadata indicating the gender of the speaker and we use this information to report performance for each gender.",
       "zh": "模型在 FLEURS 的开发集上的表现，该集合包含指明说话人性别的元数据，我们利用这一信息按性别报告性能。"
      },
      {
       "id": "s-8-1-5-2",
       "original": "Using this split, we evaluate the accuracy of ASR models trained on MMS-lab on 27 languages of the FLEURS dataset for which MMS-lab provides data (61 languages), and for which there are at least 50 samples for each gender (27 out of these 61 languages).",
       "zh": "使用这一划分，我们在 FLEURS 数据集中 MMS-lab 提供数据的 27 种语言上（MMS-lab 共提供 61 种语言的数据）评估在 MMS-lab 上训练的 ASR 模型的准确率——这 27 种语言每种性别至少有 50 个样本（61 种中的 27 种）。"
      }
     ]
    },
    {
     "id": "fig-8-1-2",
     "type": "figure_caption",
     "page": 27,
     "original": "Figure 14 shows that the average character error rate over these 27 languages is very similar, both for the MMS model and the model trained on FLEURS data. There can be significant differences between genders within a particular language, but both models appear to be equally affected (see Table A4). On a per language basis, male speakers have a higher error rate for 14 languages while as female speakers have a higher error rate for the remaining 13 languages. We conclude that our models exhibit similar gender bias to models trained on FLEURS data which is general domain data.",
     "zh": "图 14 表明，这 27 种语言上的平均字错误率非常接近，无论对 MMS 模型还是在 FLEURS 数据上训练的模型都是如此。在特定语言内部，性别之间可能存在显著差异，但两个模型似乎受到同等程度的影响（见表 A4）。按语言逐一来看，男性说话人在 14 种语言上错误率更高，而女性说话人在其余 13 种语言上错误率更高。我们的结论是，我们的模型表现出的性别偏见与在通用领域数据 FLEURS 上训练的模型相似。"
    }
   ]
  },
  {
   "id": "sec-8-2",
   "num": "8.2",
   "level": 2,
   "page": 27,
   "title": {
    "original": "Understanding Language Bias",
    "zh": "理解语言偏见"
   },
   "blocks": [
    {
     "id": "p-8-2-1",
     "type": "paragraph",
     "page": 27,
     "sentences": [
      {
       "id": "s-8-2-1-1",
       "original": "The datasets created as part of this study are from a particular narrow domain and machine learning models estimated on this data may exhibit certain biases.",
       "zh": "本研究所构建的数据集来自一个特定的狭窄领域，在该数据上估计的机器学习模型可能表现出某些偏见。"
      },
      {
       "id": "s-8-2-1-2",
       "original": "In this section, we examine the extent to which automatic speech recognition models trained on MMS-lab data output biased language.",
       "zh": "在本节中，我们考察在 MMS-lab 数据上训练的自动语音识别模型在多大程度上输出带有偏见的语言。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-methodology",
   "num": null,
   "level": 2,
   "page": 27,
   "title": {
    "original": "Methodology.",
    "zh": "方法"
   },
   "blocks": [
    {
     "id": "p-methodology-1",
     "type": "paragraph",
     "page": 27,
     "sentences": [
      {
       "id": "s-methodology-1-1",
       "original": "The general methodology of our analysis is to identify a set of biased words in each language and to measure the rate at which biased words are produced by ASR models.",
       "zh": "我们分析的总体方法是识别每种语言中的一组偏见词，并测量 ASR 模型产出这些偏见词的比率。"
      },
      {
       "id": "s-methodology-1-2",
       "original": "We compare models trained on MMS-lab data and models trained on FLEURS, a corpus of people reading Wikipedia articles in different languages.",
       "zh": "我们比较在 MMS-lab 数据上训练的模型和在 FLEURS 上训练的模型，后者是一个由人们用不同语言朗读维基百科文章构成的语料库。"
      },
      {
       "id": "s-methodology-1-3",
       "original": "Both sets of models are tasked to transcribe the FLEURS development set and we are interested in whether models trained on MMS-lab data are more likely to use biased language compared to models trained on FLEURS data.",
       "zh": "两组模型都承担转写 FLEURS 开发集的任务，我们感兴趣的是：与在 FLEURS 数据上训练的模型相比，在 MMS-lab 数据上训练的模型是否更可能使用带偏见的语言。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-identifying-biased-words",
   "num": null,
   "level": 2,
   "page": 27,
   "title": {
    "original": "Identifying Biased Words.",
    "zh": "识别偏见词"
   },
   "blocks": [
    {
     "id": "p-identifying-biased-words-1",
     "type": "paragraph",
     "page": 27,
     "sentences": [
      {
       "id": "s-identifying-biased-words-1-1",
       "original": "We were not able to find speakers for most of the considered languages of this study and therefore use the following automatic procedure to determine religious words: for each word that occurs in the training data of MMS-lab, we compare the relative token frequency, that is, the rate at which the word type occurs in the MMS-lab data, to the relative token frequency in a general domain corpus; we use Common Crawl [Conneau et al., 2020b] as a general domain corpus.",
       "zh": "我们无法为本研究考虑的大多数语言找到说话人，因此使用以下自动程序来判定宗教词：对 MMS-lab 训练数据中出现的每一个词，我们比较相对词元频率——即该词型在 MMS-lab 数据中的出现率——与它在通用领域语料库中的相对词元频率；我们使用 Common Crawl [Conneau et al., 2020b] 作为通用领域语料库。"
      },
      {
       "id": "s-identifying-biased-words-1-2",
       "original": "If the relative word frequency is at least twice as high in MMS-lab compared to Common Crawl, then we add it to the subset of words we include in our study.",
       "zh": "如果一个词的相对频率在 MMS-lab 中至少比在 Common Crawl 中高两倍，我们就将其加入研究包含的词子集。"
      },
      {
       "id": "s-identifying-biased-words-1-3",
       "original": "This enables us to evaluate on 51 languages of the FLEURS corpus since not all languages are covered by MMS-lab and we also need to find data in Common Crawl for each language.",
       "zh": "这使我们能在 FLEURS 语料库的 51 种语言上评估，因为并非所有语言都被 MMS-lab 覆盖，而且我们还需要在 Common Crawl 中为每种语言找到数据。"
      },
      {
       "id": "s-identifying-biased-words-1-4",
       "original": "The automatic procedure has the added benefit of avoiding any potential biases introduced by human annotators.",
       "zh": "这一自动程序还有一个额外的好处：避免人类标注者可能引入的任何偏见。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-results",
   "num": null,
   "level": 2,
   "page": 27,
   "title": {
    "original": "Results.",
    "zh": "结果"
   },
   "blocks": [
    {
     "id": "p-results-1",
     "type": "paragraph",
     "page": 27,
     "sentences": [
      {
       "id": "s-results-1-1",
       "original": "Figure 15 shows that the rate of biased words is much lower in the outputs of MMS models compared to the training data (MMS-lab ASR output vs. MMS-lab train).",
       "zh": "图 15 表明，与训练数据相比，MMS 模型输出中的偏见词比率要低得多（MMS-lab ASR 输出 vs. MMS-lab 训练数据）。"
      },
      {
       "id": "s-results-1-2",
       "original": "For many languages, MMS models generate these words at the same rate as the FLEURS models.",
       "zh": "对许多语言，MMS 模型以与 FLEURS 模型相同的比率生成这些词。"
      },
      {
       "id": "s-results-1-3",
       "original": "On average the rate of biased MMS-lab train MMS-lab ASR output FLEURS ASR output Cumulative Relative Frequency (%)",
       "zh": "平均而言，偏见 MMS-lab 训练数据 MMS-lab ASR 输出 FLEURS ASR 输出 累积相对频率 (%)"
      }
     ]
    },
    {
     "id": "eq-results-1",
     "type": "equation",
     "page": 28,
     "original": "30",
     "zh": "30"
    },
    {
     "id": "eq-results-2",
     "type": "equation",
     "page": 28,
     "original": "20",
     "zh": "20"
    },
    {
     "id": "eq-results-3",
     "type": "equation",
     "page": 28,
     "original": "10",
     "zh": "10"
    },
    {
     "id": "eq-results-4",
     "type": "equation",
     "page": 28,
     "original": "0",
     "zh": "0"
    },
    {
     "id": "p-results-2",
     "type": "paragraph",
     "page": 28,
     "sentences": [
      {
       "id": "s-results-2-1",
       "original": "ceb cym elleng amhara asm azj fraguj indjav bulcat hau kan ben deu heb hun fas hin fin nldnya pan ory somspa vieyor lavmar swe ron sna mon rus teltgk pol tgl swhtam tur kaz urd ukr kor zlm kir",
       "zh": "ceb cym elleng amhara asm azj fraguj indjav bulcat hau kan ben deu heb hun fas hin fin nldnya pan ory somspa vieyor lavmar swe ron sna mon rus teltgk pol tgl swhtam tur kaz urd ukr kor zlm kir"
      }
     ]
    },
    {
     "id": "fig-results-1",
     "type": "figure_caption",
     "page": 28,
     "original": "Figure 15: Analysis of Language Produced by MMS ASR Models. MMS models generate biased words at a slightly increased rate of 0.7% absolute compared to models trained on FLEURS data. We focus on words that occur at least twice as often in the MMS-lab training data compared to Common Crawl (in terms of relative frequency). We compare the cumulative relative frequency of these words in the MMS model output and the output of ASR models trained on FLEURS data. ASR outputs are based on transcribing the development sets of 51 languages.",
     "zh": "图 15：MMS ASR 模型产出语言的分析。与在 FLEURS 数据上训练的模型相比，MMS 模型生成偏见词的比率绝对高出 0.7%，增幅轻微。我们聚焦于在 MMS-lab 训练数据中的出现频率至少为 Common Crawl 两倍的词（按相对频率计）。我们比较这些词在 MMS 模型输出和在 FLEURS 数据上训练的 ASR 模型输出中的累积相对频率。ASR 输出基于对 51 种语言开发集的转写。"
    },
    {
     "id": "p-results-3",
     "type": "paragraph",
     "page": 28,
     "sentences": [
      {
       "id": "s-results-3-1",
       "original": "words is 0.7% absolute higher for MMS compared to the FLEURS model.",
       "zh": "词的比率，MMS 相比 FLEURS 模型绝对高出 0.7%。"
      },
      {
       "id": "s-results-3-2",
       "original": "We interpret this as a slight bias as the difference between MMS-lab ASR output and FLEURS ASR output in Figure 15 shows.",
       "zh": "我们将其解读为轻微的偏见，正如图 15 中 MMS-lab ASR 输出与 FLEURS ASR 输出之间的差异所示。"
      }
     ]
    },
    {
     "id": "p-results-4",
     "type": "paragraph",
     "page": 28,
     "sentences": [
      {
       "id": "s-results-4-1",
       "original": "We consulted with native speakers for languages which showed the largest discrepancies: for Mongolian (mon), a native speaker verified that most of the biased words in question are actually general language with no particular bias.",
       "zh": "我们针对差异最大的语言咨询了母语者：对蒙古语（mon），一位母语者证实，所涉的大多数偏见词实际上是一般语言用词，没有特别的偏见。"
      },
      {
       "id": "s-results-4-2",
       "original": "For Persian (fas), only two out of the words the procedure identified were of religious nature and both were indeed over predicted: the Persian words for Jesus and spirit/ghost were predicted in four instances (on the entire development set) while the FLEURS model does not predict these words, however, the MMS model also predicts the word for hand 15 times more often than the baseline FLEURS model.",
       "zh": "对波斯语（fas），该程序识别出的词中只有两个具有宗教性质，且二者确实都被过度预测：波斯语中\"耶稣\"和\"灵/鬼魂\"这两个词在整个开发集上被预测了 4 次，而 FLEURS 模型不预测这些词；不过，MMS 模型对\"手\"这个词的预测次数也比基线 FLEURS 模型多 15 倍。"
      }
     ]
    },
    {
     "id": "p-results-5",
     "type": "paragraph",
     "page": 28,
     "sentences": [
      {
       "id": "s-results-5-1",
       "original": "In English, the procedure identifies words such as you, that, they but it also includes jesus, which both models predict at the same rate.",
       "zh": "在英语中，该程序识别出诸如 you、that、they 等词，但也包含 jesus，而两个模型对该词的预测率相同。"
      },
      {
       "id": "s-results-5-2",
       "original": "There is also christ, and lord, both of which are not predicted at all, or men which is predicted six times by the MMS model compared to five times by the FLEURS model.",
       "zh": "还有 christ 和 lord，二者完全没有被预测；以及 men，MMS 模型预测了 6 次，而 FLEURS 模型预测了 5 次。"
      },
      {
       "id": "s-results-5-3",
       "original": "Our method of identifying biased words has low precision but it does capture words which are likely more used in religious contexts than otherwise.",
       "zh": "我们识别偏见词的方法精确率较低，但它确实捕捉到了那些在宗教语境中可能比其他语境更常使用的词。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-8-3",
   "num": "8.3",
   "level": 2,
   "page": 28,
   "title": {
    "original": "Ethical Considerations and use of Religious Texts in Research",
    "zh": "伦理考量与在研究中使用宗教文本"
   },
   "blocks": [
    {
     "id": "p-8-3-1",
     "type": "paragraph",
     "page": 28,
     "sentences": [
      {
       "id": "s-8-3-1-1",
       "original": "Our consultations with Christian ethicists concluded that most Christians would not regard the New Testament, and translations thereof, as too sacred to be used in machine learning.",
       "zh": "我们对基督教伦理学家的咨询结论是：大多数基督徒不会认为《新约》及其译本神圣到不能用于机器学习。"
      },
      {
       "id": "s-8-3-1-2",
       "original": "The same is not true for all religious texts: for example, the Quran was originally not supposed to be translated.",
       "zh": "并非所有宗教文本都是如此：例如，《古兰经》最初是不应被翻译的。"
      },
      {
       "id": "s-8-3-1-3",
       "original": "There is also the risk of religious training data biasing the models with respect to a particular world view, however, our analysis of the language generated by our models suggests that the language produced by the resulting speech recognition models exhibit only little bias compared to baseline models trained on other domains (§8.2).",
       "zh": "还存在宗教训练数据使模型偏向某种特定世界观的风险，然而，我们对模型所生成语言的分析表明，与在其他领域数据上训练的基线模型相比，所得语音识别模型产出的语言只表现出很小的偏见（§8.2）。"
      }
     ]
    },
    {
     "id": "p-8-3-2",
     "type": "paragraph",
     "page": 28,
     "sentences": [
      {
       "id": "s-8-3-2-1",
       "original": "This project follows a long line of research utilizing the New Testament to train and evaluate machine learning models.",
       "zh": "本项目延续了利用《新约》训练和评估机器学习模型的一系列研究。"
      },
      {
       "id": "s-8-3-2-2",
       "original": "The most related project is the CMU Wilderness effort [Black, 2019] which created speech synthesis models for 699 languages using speech and text data from similar sources as our datasets.",
       "zh": "最相关的项目是 CMU Wilderness 工作 [Black, 2019]，它使用与我们数据集相似来源的语音和文本数据，为 699 种语言构建了语音合成模型。"
      },
      {
       "id": "s-8-3-2-3",
       "original": "For machine translation, researchers used data from the Bible both for training and evaluation [Christodouloupoulos and Steedman, 2015, McCarthy et al., 2020, NLLB_Team et al., 2022].",
       "zh": "在机器翻译方面，研究者将圣经数据既用于训练也用于评估 [Christodouloupoulos and Steedman, 2015, McCarthy et al., 2020, NLLB_Team et al., 2022]。"
      },
      {
       "id": "s-8-3-2-4",
       "original": "For speech processing, researchers trained speech synthesis models for ten African languages based on readings of the bible [Meyer et al., 2022].",
       "zh": "在语音处理方面，研究者基于圣经朗读为 10 种非洲语言训练了语音合成模型 [Meyer et al., 2022]。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-9",
   "num": "9",
   "level": 1,
   "page": 29,
   "title": {
    "original": "Conclusions and Open Problems",
    "zh": "结论与开放问题"
   },
   "blocks": [
    {
     "id": "p-9-1",
     "type": "paragraph",
     "page": 29,
     "sentences": [
      {
       "id": "s-9-1-1",
       "original": "We presented the first study which scaled speech technology to over one thousand languages.",
       "zh": "我们提出了第一项将语音技术扩展到一千多种语言的研究。"
      },
      {
       "id": "s-9-1-2",
       "original": "This has been made possible by the rapid progress in self-supervised speech representation learning which in turn enabled more sample efficient learning from labeled data.",
       "zh": "这得益于自监督语音表征学习的快速进展，而后者使从标注数据中进行样本效率更高的学习成为可能。"
      },
      {
       "id": "s-9-1-3",
       "original": "We presented how we collected datasets, pretrained models and then built models for automatic speech recognition, language identification and speech synthesis.",
       "zh": "我们介绍了如何收集数据集、预训练模型，然后构建自动语音识别、语种识别和语音合成模型。"
      },
      {
       "id": "s-9-1-4",
       "original": "This scaled the number of supported languages for several major speech tasks by between 10-40x.",
       "zh": "这将若干主要语音任务支持的语言数量扩展了 10-40 倍。"
      },
      {
       "id": "s-9-1-5",
       "original": "Going forward, we see several avenues for future work:",
       "zh": "展望未来，我们看到若干未来工作的方向："
      }
     ]
    }
   ]
  },
  {
   "id": "sec-scaling-to-even-more-languages-a",
   "num": null,
   "level": 2,
   "page": 29,
   "title": {
    "original": "Scaling to even more languages and dialects.",
    "zh": "扩展到更多语言和方言"
   },
   "blocks": [
    {
     "id": "p-scaling-to-even-more-languages-a-1",
     "type": "paragraph",
     "page": 29,
     "sentences": [
      {
       "id": "s-scaling-to-even-more-languages-a-1-1",
       "original": "Even though, we built speech systems supporting between 1,100-4,000 languages, there are currently over 7,000 languages being spoken around the world today.",
       "zh": "尽管我们构建了支持 1,100-4,000 种语言的语音系统，如今世界上仍有多于 7,000 种语言在被使用。"
      },
      {
       "id": "s-scaling-to-even-more-languages-a-1-2",
       "original": "Moreover, there are many more dialects which are often not adequately represented in the training data, even for high-resource languages such as English.",
       "zh": "此外，还有多得多的方言，即便对英语这样的高资源语言，它们在训练数据中也常常没有得到充分的代表。"
      },
      {
       "id": "s-scaling-to-even-more-languages-a-1-3",
       "original": "This can lead to undesirable biases in the performance of these models [Koenecke et al., 2020].",
       "zh": "这可能导致这些模型在性能上出现不希望有的偏见 [Koenecke et al., 2020]。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-multi-task-models",
   "num": null,
   "level": 2,
   "page": 29,
   "title": {
    "original": "Multi-task models.",
    "zh": "多任务模型"
   },
   "blocks": [
    {
     "id": "p-multi-task-models-1",
     "type": "paragraph",
     "page": 29,
     "sentences": [
      {
       "id": "s-multi-task-models-1-1",
       "original": "Another avenue is to train single models for several downstream tasks such as speech recognition, language identification etc. which can then all be performed by a single model.",
       "zh": "另一个方向是为若干下游任务（如语音识别、语种识别等）训练单一模型，使这些任务都能由一个模型完成。"
      },
      {
       "id": "s-multi-task-models-1-2",
       "original": "There has been work on a moderate number of languages [Radford et al., 2022] but we hope that this approach can be scaled to many more languages and with a smaller focus on head languages.",
       "zh": "已有在中等数量语言上的工作 [Radford et al., 2022]，但我们希望这一方法能扩展到多得多的语言，并减少对头部语言的关注。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-tackling-more-speech-tasks",
   "num": null,
   "level": 2,
   "page": 29,
   "title": {
    "original": "Tackling more speech tasks.",
    "zh": "攻克更多语音任务"
   },
   "blocks": [
    {
     "id": "p-tackling-more-speech-tasks-1",
     "type": "paragraph",
     "page": 29,
     "sentences": [
      {
       "id": "s-tackling-more-speech-tasks-1-1",
       "original": "While this study covered three different speech tasks, there are many more tasks involving speech data, such as speech translation, both to text and to speech, or keyword spotting, intent classification etc. We hope that future work will expand these tasks to many more languages as well.",
       "zh": "虽然本研究覆盖了三种不同的语音任务，但还有多得多的任务涉及语音数据，例如语音翻译（到文本和到语音）、关键词检出、意图分类等。我们希望未来的工作也能将这些任务扩展到更多的语言。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-acknowledgments",
   "num": null,
   "level": 1,
   "page": 29,
   "title": {
    "original": "Acknowledgments",
    "zh": "致谢"
   },
   "blocks": [
    {
     "id": "p-acknowledgments-1",
     "type": "paragraph",
     "page": 29,
     "sentences": [
      {
       "id": "s-acknowledgments-1-1",
       "original": "We would like to thank Chloé Bakalar and Hubert Etienne for providing feedback on responsible AI evaluations, as well as the people who featured in the demo video: Filmawit Gebreegziabher, Gilbert Buada, Shanti Jha, Masoud Tavazoei, Akinniyi Akinyemi, Mari Silvia Marin, Amlan Roy, Kumar Rajarshi, Sugat Nayak, Jason Carlo Carranceja, Amit Prakash, Hangameh Vahabzadeh, Mohsen Dalil, Swati Verma, Edwina Anandita, Faisal Putra.",
       "zh": "我们感谢 Chloé Bakalar 和 Hubert Etienne 就负责任的 AI 评估提供的反馈，也感谢演示视频中出镜的人士：Filmawit Gebreegziabher、Gilbert Buada、Shanti Jha、Masoud Tavazoei、Akinniyi Akinyemi、Mari Silvia Marin、Amlan Roy、Kumar Rajarshi、Sugat Nayak、Jason Carlo Carranceja、Amit Prakash、Hangameh Vahabzadeh、Mohsen Dalil、Swati Verma、Edwina Anandita、Faisal Putra。"
      },
      {
       "id": "s-acknowledgments-1-2",
       "original": "We would like to thank Moto Hira for help in preparing the forced alignment tutorial in TorchAudio and Ping Yu for analyzing the Chinese language datasets for MMS.",
       "zh": "我们感谢 Moto Hira 帮助在 TorchAudio 中准备强制对齐教程，感谢 Ping Yu 分析 MMS 的中文数据集。"
      },
      {
       "id": "s-acknowledgments-1-3",
       "original": "We thank Sainbayar Sukhbaatar for his analysis of the model transcriptions.",
       "zh": "我们感谢 Sainbayar Sukhbaatar 对模型转写结果的分析。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-references",
   "num": null,
   "level": 1,
   "page": 29,
   "title": {
    "original": "References",
    "zh": "References"
   },
   "blocks": [
    {
     "id": "p-references-1",
     "type": "paragraph",
     "page": 29,
     "sentences": [
      {
       "id": "s-references-1-1",
       "original": "R."
      },
      {
       "id": "s-references-1-2",
       "original": "Ardila, M."
      },
      {
       "id": "s-references-1-3",
       "original": "Branson, K."
      },
      {
       "id": "s-references-1-4",
       "original": "Davis, M."
      },
      {
       "id": "s-references-1-5",
       "original": "Henretty, M."
      },
      {
       "id": "s-references-1-6",
       "original": "Kohler, J."
      },
      {
       "id": "s-references-1-7",
       "original": "Meyer, R."
      },
      {
       "id": "s-references-1-8",
       "original": "Morais, L."
      },
      {
       "id": "s-references-1-9",
       "original": "Saunders, F."
      },
      {
       "id": "s-references-1-10",
       "original": "M."
      }
     ]
    },
    {
     "id": "p-references-2",
     "type": "paragraph",
     "page": 29,
     "sentences": [
      {
       "id": "s-references-2-1",
       "original": "Tyers, and G."
      },
      {
       "id": "s-references-2-2",
       "original": "Weber."
      },
      {
       "id": "s-references-2-3",
       "original": "Common voice: A massively-multilingual speech corpus."
      },
      {
       "id": "s-references-2-4",
       "original": "Proc. of LREC, 2020."
      }
     ]
    },
    {
     "id": "p-references-3",
     "type": "paragraph",
     "page": 29,
     "sentences": [
      {
       "id": "s-references-3-1",
       "original": "J."
      },
      {
       "id": "s-references-3-2",
       "original": "L."
      },
      {
       "id": "s-references-3-3",
       "original": "Ba, J."
      },
      {
       "id": "s-references-3-4",
       "original": "R."
      },
      {
       "id": "s-references-3-5",
       "original": "Kiros, and G."
      },
      {
       "id": "s-references-3-6",
       "original": "E."
      },
      {
       "id": "s-references-3-7",
       "original": "Hinton."
      },
      {
       "id": "s-references-3-8",
       "original": "Layer normalization. arXiv, 2016."
      }
     ]
    },
    {
     "id": "p-references-4",
     "type": "paragraph",
     "page": 29,
     "sentences": [
      {
       "id": "s-references-4-1",
       "original": "A."
      },
      {
       "id": "s-references-4-2",
       "original": "Babu, C."
      },
      {
       "id": "s-references-4-3",
       "original": "Wang, A."
      },
      {
       "id": "s-references-4-4",
       "original": "Tjandra, K."
      },
      {
       "id": "s-references-4-5",
       "original": "Lakhotia, Q."
      },
      {
       "id": "s-references-4-6",
       "original": "Xu, N."
      },
      {
       "id": "s-references-4-7",
       "original": "Goyal, K."
      },
      {
       "id": "s-references-4-8",
       "original": "Singh, P. von Platen, Y."
      },
      {
       "id": "s-references-4-9",
       "original": "Saraf, J."
      },
      {
       "id": "s-references-4-10",
       "original": "Pino, A."
      },
      {
       "id": "s-references-4-11",
       "original": "Baevski, A."
      },
      {
       "id": "s-references-4-12",
       "original": "Conneau, and M."
      },
      {
       "id": "s-references-4-13",
       "original": "Auli."
      },
      {
       "id": "s-references-4-14",
       "original": "XLS-R: Self-supervised Cross-lingual Speech Representation Learning at Scale."
      },
      {
       "id": "s-references-4-15",
       "original": "In Proc."
      },
      {
       "id": "s-references-4-16",
       "original": "Interspeech 2022, pages 2278–2282, 2022. doi: 10.21437/Interspeech.2022-143."
      }
     ]
    },
    {
     "id": "p-references-5",
     "type": "paragraph",
     "page": 29,
     "sentences": [
      {
       "id": "s-references-5-1",
       "original": "A."
      },
      {
       "id": "s-references-5-2",
       "original": "Baevski, S."
      },
      {
       "id": "s-references-5-3",
       "original": "Schneider, and M."
      },
      {
       "id": "s-references-5-4",
       "original": "Auli. vq-wav2vec: Self-supervised learning of discrete speech representations."
      },
      {
       "id": "s-references-5-5",
       "original": "In Proc. of ICLR, 2020a."
      }
     ]
    },
    {
     "id": "p-references-6",
     "type": "paragraph",
     "page": 29,
     "sentences": [
      {
       "id": "s-references-6-1",
       "original": "A."
      },
      {
       "id": "s-references-6-2",
       "original": "Baevski, Y."
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
       "original": "Auli. wav2vec 2.0: A framework for self-supervised learning of speech representations."
      },
      {
       "id": "s-references-6-6",
       "original": "In Proc. of NeurIPS, 2020b."
      }
     ]
    },
    {
     "id": "p-references-7",
     "type": "paragraph",
     "page": 29,
     "sentences": [
      {
       "id": "s-references-7-1",
       "original": "A."
      },
      {
       "id": "s-references-7-2",
       "original": "Baevski, W.-N."
      },
      {
       "id": "s-references-7-3",
       "original": "Hsu, A."
      },
      {
       "id": "s-references-7-4",
       "original": "Conneau, and M."
      },
      {
       "id": "s-references-7-5",
       "original": "Auli."
      },
      {
       "id": "s-references-7-6",
       "original": "Unsupervised speech recognition."
      },
      {
       "id": "s-references-7-7",
       "original": "In A."
      },
      {
       "id": "s-references-7-8",
       "original": "Beygelzimer, Y."
      },
      {
       "id": "s-references-7-9",
       "original": "Dauphin, P."
      },
      {
       "id": "s-references-7-10",
       "original": "Liang, and J."
      },
      {
       "id": "s-references-7-11",
       "original": "W."
      },
      {
       "id": "s-references-7-12",
       "original": "Vaughan, editors, Advances in Neural Information Processing Systems, 2021."
      }
     ]
    },
    {
     "id": "p-references-8",
     "type": "paragraph",
     "page": 30,
     "sentences": [
      {
       "id": "s-references-8-1",
       "original": "M."
      },
      {
       "id": "s-references-8-2",
       "original": "Baines, S."
      },
      {
       "id": "s-references-8-3",
       "original": "Bhosale, V."
      },
      {
       "id": "s-references-8-4",
       "original": "Caggiano, N."
      },
      {
       "id": "s-references-8-5",
       "original": "Goyal, S."
      },
      {
       "id": "s-references-8-6",
       "original": "Goyal, M."
      },
      {
       "id": "s-references-8-7",
       "original": "Ott, B."
      },
      {
       "id": "s-references-8-8",
       "original": "Lefaudeux, V."
      },
      {
       "id": "s-references-8-9",
       "original": "Liptchinsky, M."
      },
      {
       "id": "s-references-8-10",
       "original": "Rabbat, S."
      },
      {
       "id": "s-references-8-11",
       "original": "Sheiffer, A."
      },
      {
       "id": "s-references-8-12",
       "original": "Sridhar, and M."
      },
      {
       "id": "s-references-8-13",
       "original": "Xu."
      },
      {
       "id": "s-references-8-14",
       "original": "Fairscale: A general purpose modular pytorch library for high performance and large scale training. https://github.com/facebookresearch/ fairscale, 2021."
      }
     ]
    },
    {
     "id": "p-references-9",
     "type": "paragraph",
     "page": 30,
     "sentences": [
      {
       "id": "s-references-9-1",
       "original": "A."
      },
      {
       "id": "s-references-9-2",
       "original": "Bapna, I."
      },
      {
       "id": "s-references-9-3",
       "original": "Caswell, J."
      },
      {
       "id": "s-references-9-4",
       "original": "Kreutzer, O."
      },
      {
       "id": "s-references-9-5",
       "original": "Firat, D. van Esch, A."
      },
      {
       "id": "s-references-9-6",
       "original": "Siddhant, M."
      },
      {
       "id": "s-references-9-7",
       "original": "Niu, P."
      },
      {
       "id": "s-references-9-8",
       "original": "Baljekar, X."
      },
      {
       "id": "s-references-9-9",
       "original": "Garcia, W."
      },
      {
       "id": "s-references-9-10",
       "original": "Macherey, T."
      },
      {
       "id": "s-references-9-11",
       "original": "Breiner, V."
      },
      {
       "id": "s-references-9-12",
       "original": "Axelrod, J."
      },
      {
       "id": "s-references-9-13",
       "original": "Riesa, Y."
      },
      {
       "id": "s-references-9-14",
       "original": "Cao, M."
      },
      {
       "id": "s-references-9-15",
       "original": "X."
      },
      {
       "id": "s-references-9-16",
       "original": "Chen, K."
      },
      {
       "id": "s-references-9-17",
       "original": "Macherey, M."
      },
      {
       "id": "s-references-9-18",
       "original": "Krikun, P."
      },
      {
       "id": "s-references-9-19",
       "original": "Wang, A."
      },
      {
       "id": "s-references-9-20",
       "original": "Gutkin, A."
      },
      {
       "id": "s-references-9-21",
       "original": "Shah, Y."
      },
      {
       "id": "s-references-9-22",
       "original": "Huang, Z."
      },
      {
       "id": "s-references-9-23",
       "original": "Chen, Y."
      },
      {
       "id": "s-references-9-24",
       "original": "Wu, and M."
      },
      {
       "id": "s-references-9-25",
       "original": "Hughes."
      },
      {
       "id": "s-references-9-26",
       "original": "Building machine translation systems for the next thousand languages. arXiv, abs/2205.03983, 2022a."
      }
     ]
    },
    {
     "id": "p-references-10",
     "type": "paragraph",
     "page": 30,
     "sentences": [
      {
       "id": "s-references-10-1",
       "original": "A."
      },
      {
       "id": "s-references-10-2",
       "original": "Bapna, C."
      },
      {
       "id": "s-references-10-3",
       "original": "Cherry, Y."
      },
      {
       "id": "s-references-10-4",
       "original": "Zhang, Y."
      },
      {
       "id": "s-references-10-5",
       "original": "Jia, M."
      },
      {
       "id": "s-references-10-6",
       "original": "Johnson, Y."
      },
      {
       "id": "s-references-10-7",
       "original": "Cheng, S."
      },
      {
       "id": "s-references-10-8",
       "original": "Khanuja, J."
      },
      {
       "id": "s-references-10-9",
       "original": "Riesa, and A."
      },
      {
       "id": "s-references-10-10",
       "original": "Conneau."
      }
     ]
    },
    {
     "id": "p-references-11",
     "type": "paragraph",
     "page": 30,
     "sentences": [
      {
       "id": "s-references-11-1",
       "original": "mslam: Massively multilingual joint pre-training for speech and text."
      },
      {
       "id": "s-references-11-2",
       "original": "ArXiv, abs/2202.01374, 2022b."
      }
     ]
    },
    {
     "id": "p-references-12",
     "type": "paragraph",
     "page": 30,
     "sentences": [
      {
       "id": "s-references-12-1",
       "original": "A."
      },
      {
       "id": "s-references-12-2",
       "original": "W."
      },
      {
       "id": "s-references-12-3",
       "original": "Black."
      },
      {
       "id": "s-references-12-4",
       "original": "Cmu wilderness multilingual speech dataset."
      },
      {
       "id": "s-references-12-5",
       "original": "In Proc. of ICASSP, 2019."
      }
     ]
    },
    {
     "id": "p-references-13",
     "type": "paragraph",
     "page": 30,
     "sentences": [
      {
       "id": "s-references-13-1",
       "original": "H."
      },
      {
       "id": "s-references-13-2",
       "original": "Bourlard, J."
      },
      {
       "id": "s-references-13-3",
       "original": "Dines, et al. Current trends in multilingual speech processing."
      },
      {
       "id": "s-references-13-4",
       "original": "Sadhana, 2011."
      }
     ]
    },
    {
     "id": "p-references-14",
     "type": "paragraph",
     "page": 30,
     "sentences": [
      {
       "id": "s-references-14-1",
       "original": "L."
      },
      {
       "id": "s-references-14-2",
       "original": "Bromham, R."
      },
      {
       "id": "s-references-14-3",
       "original": "Dinnage, H."
      },
      {
       "id": "s-references-14-4",
       "original": "Skirgard, A."
      },
      {
       "id": "s-references-14-5",
       "original": "Ritchie, M."
      },
      {
       "id": "s-references-14-6",
       "original": "Cardillo, F."
      },
      {
       "id": "s-references-14-7",
       "original": "Meakins, S."
      },
      {
       "id": "s-references-14-8",
       "original": "Greenhill, and X."
      },
      {
       "id": "s-references-14-9",
       "original": "Hua."
      }
     ]
    },
    {
     "id": "p-references-15",
     "type": "paragraph",
     "page": 30,
     "sentences": [
      {
       "id": "s-references-15-1",
       "original": "Global predictors of language endangerment and the future of linguistic diversity."
      },
      {
       "id": "s-references-15-2",
       "original": "Nature Ecology and Evolution, 2021."
      }
     ]
    },
    {
     "id": "p-references-16",
     "type": "paragraph",
     "page": 30,
     "sentences": [
      {
       "id": "s-references-16-1",
       "original": "L."
      },
      {
       "id": "s-references-16-2",
       "original": "Burget, P."
      },
      {
       "id": "s-references-16-3",
       "original": "Schwarz, et al. Multilingual acoustic modeling for speech recognition based on subspace gaussian mixture models."
      },
      {
       "id": "s-references-16-4",
       "original": "In Proc. of ICASSP, 2010."
      }
     ]
    },
    {
     "id": "p-references-17",
     "type": "paragraph",
     "page": 30,
     "sentences": [
      {
       "id": "s-references-17-1",
       "original": "X."
      },
      {
       "id": "s-references-17-2",
       "original": "Cai, J."
      },
      {
       "id": "s-references-17-3",
       "original": "Yuan, Y."
      },
      {
       "id": "s-references-17-4",
       "original": "Bian, G."
      },
      {
       "id": "s-references-17-5",
       "original": "Xun, J."
      },
      {
       "id": "s-references-17-6",
       "original": "Huang, and K."
      },
      {
       "id": "s-references-17-7",
       "original": "Church."
      },
      {
       "id": "s-references-17-8",
       "original": "W-CTC: a connectionist temporal classification loss with wild cards."
      },
      {
       "id": "s-references-17-9",
       "original": "In International Conference on Learning Representations, 2022."
      }
     ]
    },
    {
     "id": "p-references-18",
     "type": "paragraph",
     "page": 30,
     "sentences": [
      {
       "id": "s-references-18-1",
       "original": "URL https://openreview.net/forum?id=0RqDp8FCW5Z."
      }
     ]
    },
    {
     "id": "p-references-19",
     "type": "paragraph",
     "page": 30,
     "sentences": [
      {
       "id": "s-references-19-1",
       "original": "E."
      },
      {
       "id": "s-references-19-2",
       "original": "Casanova, J."
      },
      {
       "id": "s-references-19-3",
       "original": "Weber, C."
      },
      {
       "id": "s-references-19-4",
       "original": "D."
      },
      {
       "id": "s-references-19-5",
       "original": "Shulby, A."
      },
      {
       "id": "s-references-19-6",
       "original": "C."
      },
      {
       "id": "s-references-19-7",
       "original": "Junior, E."
      },
      {
       "id": "s-references-19-8",
       "original": "Gölge, and M."
      },
      {
       "id": "s-references-19-9",
       "original": "A."
      },
      {
       "id": "s-references-19-10",
       "original": "Ponti."
      },
      {
       "id": "s-references-19-11",
       "original": "Yourtts: Towards zeroshot multi-speaker tts and zero-shot voice conversion for everyone."
      },
      {
       "id": "s-references-19-12",
       "original": "In International Conference on Machine Learning, pages 2709–2720."
      },
      {
       "id": "s-references-19-13",
       "original": "PMLR, 2022."
      }
     ]
    },
    {
     "id": "p-references-20",
     "type": "paragraph",
     "page": 30,
     "sentences": [
      {
       "id": "s-references-20-1",
       "original": "W."
      },
      {
       "id": "s-references-20-2",
       "original": "Chan, N."
      },
      {
       "id": "s-references-20-3",
       "original": "Jaitly, Q."
      },
      {
       "id": "s-references-20-4",
       "original": "V."
      },
      {
       "id": "s-references-20-5",
       "original": "Le, and O."
      },
      {
       "id": "s-references-20-6",
       "original": "Vinyals."
      },
      {
       "id": "s-references-20-7",
       "original": "Listen, attend and spell. arXiv, 2015."
      }
     ]
    },
    {
     "id": "p-references-21",
     "type": "paragraph",
     "page": 30,
     "sentences": [
      {
       "id": "s-references-21-1",
       "original": "W."
      },
      {
       "id": "s-references-21-2",
       "original": "Chan, D."
      },
      {
       "id": "s-references-21-3",
       "original": "Park, C."
      },
      {
       "id": "s-references-21-4",
       "original": "Lee, Y."
      },
      {
       "id": "s-references-21-5",
       "original": "Zhang, Q."
      },
      {
       "id": "s-references-21-6",
       "original": "Le, and M."
      },
      {
       "id": "s-references-21-7",
       "original": "Norouzi."
      },
      {
       "id": "s-references-21-8",
       "original": "Speechstew: Simply mix all available speech recognition data to train one large neural network. arXiv, abs/2104.02133, 2021."
      }
     ]
    },
    {
     "id": "p-references-22",
     "type": "paragraph",
     "page": 30,
     "sentences": [
      {
       "id": "s-references-22-1",
       "original": "T."
      },
      {
       "id": "s-references-22-2",
       "original": "Chen, B."
      },
      {
       "id": "s-references-22-3",
       "original": "Xu, C."
      },
      {
       "id": "s-references-22-4",
       "original": "Zhang, and C."
      },
      {
       "id": "s-references-22-5",
       "original": "Guestrin."
      },
      {
       "id": "s-references-22-6",
       "original": "Training deep nets with sublinear memory cost. arXiv, abs/1604.06174, 2016."
      }
     ]
    },
    {
     "id": "p-references-23",
     "type": "paragraph",
     "page": 30,
     "sentences": [
      {
       "id": "s-references-23-1",
       "original": "W."
      },
      {
       "id": "s-references-23-2",
       "original": "Chen, B."
      },
      {
       "id": "s-references-23-3",
       "original": "Yan, J."
      },
      {
       "id": "s-references-23-4",
       "original": "Shi, Y."
      },
      {
       "id": "s-references-23-5",
       "original": "Peng, S."
      },
      {
       "id": "s-references-23-6",
       "original": "Maiti, and S."
      },
      {
       "id": "s-references-23-7",
       "original": "Watanabe."
      },
      {
       "id": "s-references-23-8",
       "original": "Improving massively multilingual asr with auxiliary ctc objectives."
      },
      {
       "id": "s-references-23-9",
       "original": "In Proc. of ICASSP, 2023."
      }
     ]
    },
    {
     "id": "p-references-24",
     "type": "paragraph",
     "page": 30,
     "sentences": [
      {
       "id": "s-references-24-1",
       "original": "Z."
      },
      {
       "id": "s-references-24-2",
       "original": "Chen, Y."
      },
      {
       "id": "s-references-24-3",
       "original": "Zhang, A."
      },
      {
       "id": "s-references-24-4",
       "original": "Rosenberg, B."
      },
      {
       "id": "s-references-24-5",
       "original": "Ramabhadran, P."
      },
      {
       "id": "s-references-24-6",
       "original": "Moreno, A."
      },
      {
       "id": "s-references-24-7",
       "original": "Bapna, and H."
      },
      {
       "id": "s-references-24-8",
       "original": "Zen."
      },
      {
       "id": "s-references-24-9",
       "original": "Maestro: Matched speech text representations through modality matching. arXiv, abs/2204.03409, 2022."
      }
     ]
    },
    {
     "id": "p-references-25",
     "type": "paragraph",
     "page": 30,
     "sentences": [
      {
       "id": "s-references-25-1",
       "original": "J."
      },
      {
       "id": "s-references-25-2",
       "original": "Cho, M."
      },
      {
       "id": "s-references-25-3",
       "original": "K."
      },
      {
       "id": "s-references-25-4",
       "original": "Baskar, et al. Multilingual sequence-to-sequence speech recognition: architecture, transfer learning, and language modeling."
      },
      {
       "id": "s-references-25-5",
       "original": "In Proc. of IEEE SLT, 2018."
      }
     ]
    },
    {
     "id": "p-references-26",
     "type": "paragraph",
     "page": 30,
     "sentences": [
      {
       "id": "s-references-26-1",
       "original": "C."
      },
      {
       "id": "s-references-26-2",
       "original": "Christodouloupoulos and M."
      },
      {
       "id": "s-references-26-3",
       "original": "Steedman."
      },
      {
       "id": "s-references-26-4",
       "original": "A massively parallel corpus: the bible in 100 languages."
      }
     ]
    },
    {
     "id": "p-references-27",
     "type": "paragraph",
     "page": 30,
     "sentences": [
      {
       "id": "s-references-27-1",
       "original": "In Proc. of LREC, 2015."
      }
     ]
    },
    {
     "id": "p-references-28",
     "type": "paragraph",
     "page": 30,
     "sentences": [
      {
       "id": "s-references-28-1",
       "original": "R."
      },
      {
       "id": "s-references-28-2",
       "original": "Collobert, C."
      },
      {
       "id": "s-references-28-3",
       "original": "Puhrsch, and G."
      },
      {
       "id": "s-references-28-4",
       "original": "Synnaeve."
      },
      {
       "id": "s-references-28-5",
       "original": "Wav2letter: an end-to-end convnet-based speech recognition system. arXiv, abs/1609.03193, 2016."
      }
     ]
    },
    {
     "id": "p-references-29",
     "type": "paragraph",
     "page": 30,
     "sentences": [
      {
       "id": "s-references-29-1",
       "original": "A."
      },
      {
       "id": "s-references-29-2",
       "original": "Conneau and G."
      },
      {
       "id": "s-references-29-3",
       "original": "Lample."
      },
      {
       "id": "s-references-29-4",
       "original": "Cross-lingual language model pretraining."
      },
      {
       "id": "s-references-29-5",
       "original": "Proc. of NeurIPS, 2019."
      }
     ]
    },
    {
     "id": "p-references-30",
     "type": "paragraph",
     "page": 30,
     "sentences": [
      {
       "id": "s-references-30-1",
       "original": "A."
      },
      {
       "id": "s-references-30-2",
       "original": "Conneau, A."
      },
      {
       "id": "s-references-30-3",
       "original": "Baevski, R."
      },
      {
       "id": "s-references-30-4",
       "original": "Collobert, A."
      },
      {
       "id": "s-references-30-5",
       "original": "Mohamed, and M."
      },
      {
       "id": "s-references-30-6",
       "original": "Auli."
      },
      {
       "id": "s-references-30-7",
       "original": "Unsupervised cross-lingual representation learning for speech recognition. arXiv, abs/2006.13979, 2020a."
      }
     ]
    },
    {
     "id": "p-references-31",
     "type": "paragraph",
     "page": 30,
     "sentences": [
      {
       "id": "s-references-31-1",
       "original": "A."
      },
      {
       "id": "s-references-31-2",
       "original": "Conneau, K."
      },
      {
       "id": "s-references-31-3",
       "original": "Khandelwal, N."
      },
      {
       "id": "s-references-31-4",
       "original": "Goyal, V."
      },
      {
       "id": "s-references-31-5",
       "original": "Chaudhary, G."
      },
      {
       "id": "s-references-31-6",
       "original": "Wenzek, F."
      },
      {
       "id": "s-references-31-7",
       "original": "Guzmán, E."
      },
      {
       "id": "s-references-31-8",
       "original": "Grave, M."
      },
      {
       "id": "s-references-31-9",
       "original": "Ott, L."
      },
      {
       "id": "s-references-31-10",
       "original": "Zettlemoyer, and V."
      },
      {
       "id": "s-references-31-11",
       "original": "Stoyanov."
      },
      {
       "id": "s-references-31-12",
       "original": "Unsupervised cross-lingual representation learning at scale."
      },
      {
       "id": "s-references-31-13",
       "original": "In Proc. of ACL, 2020b."
      }
     ]
    },
    {
     "id": "p-references-32",
     "type": "paragraph",
     "page": 31,
     "sentences": [
      {
       "id": "s-references-32-1",
       "original": "A."
      },
      {
       "id": "s-references-32-2",
       "original": "Conneau, M."
      },
      {
       "id": "s-references-32-3",
       "original": "Ma, S."
      },
      {
       "id": "s-references-32-4",
       "original": "Khanuja, Y."
      },
      {
       "id": "s-references-32-5",
       "original": "Zhang, V."
      },
      {
       "id": "s-references-32-6",
       "original": "Axelrod, S."
      },
      {
       "id": "s-references-32-7",
       "original": "Dalmia, J."
      },
      {
       "id": "s-references-32-8",
       "original": "Riesa, C."
      },
      {
       "id": "s-references-32-9",
       "original": "Rivera, and A."
      },
      {
       "id": "s-references-32-10",
       "original": "Bapna."
      }
     ]
    },
    {
     "id": "p-references-33",
     "type": "paragraph",
     "page": 31,
     "sentences": [
      {
       "id": "s-references-33-1",
       "original": "Fleurs: Few-shot learning evaluation of universal representations of speech. arXiv, 2022."
      }
     ]
    },
    {
     "id": "p-references-34",
     "type": "paragraph",
     "page": 31,
     "sentences": [
      {
       "id": "s-references-34-1",
       "original": "A."
      },
      {
       "id": "s-references-34-2",
       "original": "Defossez, G."
      },
      {
       "id": "s-references-34-3",
       "original": "Synnaeve, and Y."
      },
      {
       "id": "s-references-34-4",
       "original": "Adi."
      },
      {
       "id": "s-references-34-5",
       "original": "Real time speech enhancement in the waveform domain."
      },
      {
       "id": "s-references-34-6",
       "original": "In Interspeech, 2020."
      }
     ]
    },
    {
     "id": "p-references-35",
     "type": "paragraph",
     "page": 31,
     "sentences": [
      {
       "id": "s-references-35-1",
       "original": "J."
      },
      {
       "id": "s-references-35-2",
       "original": "Devlin, M.-W."
      },
      {
       "id": "s-references-35-3",
       "original": "Chang, K."
      },
      {
       "id": "s-references-35-4",
       "original": "Lee, and K."
      },
      {
       "id": "s-references-35-5",
       "original": "Toutanova."
      }
     ]
    },
    {
     "id": "p-references-36",
     "type": "paragraph",
     "page": 31,
     "sentences": [
      {
       "id": "s-references-36-1",
       "original": "Bert: Pre-training of deep bidirectional transformers for language understanding."
      },
      {
       "id": "s-references-36-2",
       "original": "Proc. of NAACL, 2019."
      }
     ]
    },
    {
     "id": "p-references-37",
     "type": "paragraph",
     "page": 31,
     "sentences": [
      {
       "id": "s-references-37-1",
       "original": "S."
      },
      {
       "id": "s-references-37-2",
       "original": "Dieleman, A. van den Oord, and K."
      },
      {
       "id": "s-references-37-3",
       "original": "Simonyan."
      },
      {
       "id": "s-references-37-4",
       "original": "The challenge of realistic music generation: modelling raw audio at scale."
      },
      {
       "id": "s-references-37-5",
       "original": "Proc of NIPS, 2018."
      }
     ]
    },
    {
     "id": "p-references-38",
     "type": "paragraph",
     "page": 31,
     "sentences": [
      {
       "id": "s-references-38-1",
       "original": "L."
      },
      {
       "id": "s-references-38-2",
       "original": "Dinh, J."
      },
      {
       "id": "s-references-38-3",
       "original": "Sohl-Dickstein, and S."
      },
      {
       "id": "s-references-38-4",
       "original": "Bengio."
      },
      {
       "id": "s-references-38-5",
       "original": "Density estimation using real NVP."
      },
      {
       "id": "s-references-38-6",
       "original": "In ICLR."
      },
      {
       "id": "s-references-38-7",
       "original": "OpenReview.net, 2017."
      }
     ]
    },
    {
     "id": "p-references-39",
     "type": "paragraph",
     "page": 31,
     "sentences": [
      {
       "id": "s-references-39-1",
       "original": "D."
      },
      {
       "id": "s-references-39-2",
       "original": "Doukhan, E."
      },
      {
       "id": "s-references-39-3",
       "original": "Lechapt, M."
      },
      {
       "id": "s-references-39-4",
       "original": "Evrard, and J."
      },
      {
       "id": "s-references-39-5",
       "original": "Carrive."
      },
      {
       "id": "s-references-39-6",
       "original": "Ina’s mirex 2018 music and speech detection system."
      },
      {
       "id": "s-references-39-7",
       "original": "In Proc. of MIREX, 2018."
      }
     ]
    },
    {
     "id": "p-references-40",
     "type": "paragraph",
     "page": 31,
     "sentences": [
      {
       "id": "s-references-40-1",
       "original": "Z."
      },
      {
       "id": "s-references-40-2",
       "original": "Fan, M."
      },
      {
       "id": "s-references-40-3",
       "original": "Li, S."
      },
      {
       "id": "s-references-40-4",
       "original": "Zhou, and B."
      },
      {
       "id": "s-references-40-5",
       "original": "Xu."
      },
      {
       "id": "s-references-40-6",
       "original": "Exploring wav2vec 2.0 on speaker verification and language identification. arXiv, 2021."
      }
     ]
    },
    {
     "id": "p-references-41",
     "type": "paragraph",
     "page": 31,
     "sentences": [
      {
       "id": "s-references-41-1",
       "original": "M."
      },
      {
       "id": "s-references-41-2",
       "original": "J."
      },
      {
       "id": "s-references-41-3",
       "original": "F."
      },
      {
       "id": "s-references-41-4",
       "original": "Gales, K."
      },
      {
       "id": "s-references-41-5",
       "original": "M."
      },
      {
       "id": "s-references-41-6",
       "original": "Knill, A."
      },
      {
       "id": "s-references-41-7",
       "original": "Ragni, and S."
      },
      {
       "id": "s-references-41-8",
       "original": "P."
      },
      {
       "id": "s-references-41-9",
       "original": "Rath."
      },
      {
       "id": "s-references-41-10",
       "original": "Speech recognition and keyword spotting for low-resource languages: Babel project research at cued."
      },
      {
       "id": "s-references-41-11",
       "original": "In Spoken Language Technologies for Under-Resourced Languages, 2014."
      }
     ]
    },
    {
     "id": "p-references-42",
     "type": "paragraph",
     "page": 31,
     "sentences": [
      {
       "id": "s-references-42-1",
       "original": "A."
      },
      {
       "id": "s-references-42-2",
       "original": "Graves, S."
      },
      {
       "id": "s-references-42-3",
       "original": "Fernández, and F."
      },
      {
       "id": "s-references-42-4",
       "original": "Gomez."
      },
      {
       "id": "s-references-42-5",
       "original": "Connectionist temporal classification: Labelling unsegmented sequence data with recurrent neural networks."
      },
      {
       "id": "s-references-42-6",
       "original": "In Proc. of ICML, 2006."
      }
     ]
    },
    {
     "id": "p-references-43",
     "type": "paragraph",
     "page": 31,
     "sentences": [
      {
       "id": "s-references-43-1",
       "original": "M."
      },
      {
       "id": "s-references-43-2",
       "original": "He, J."
      },
      {
       "id": "s-references-43-3",
       "original": "Yang, L."
      },
      {
       "id": "s-references-43-4",
       "original": "He, and F."
      },
      {
       "id": "s-references-43-5",
       "original": "K."
      },
      {
       "id": "s-references-43-6",
       "original": "Soong."
      },
      {
       "id": "s-references-43-7",
       "original": "Multilingual byte2speech models for scalable low-resource speech synthesis. arXiv, abs/arXiv:2103.03541, 2021."
      }
     ]
    },
    {
     "id": "p-references-44",
     "type": "paragraph",
     "page": 31,
     "sentences": [
      {
       "id": "s-references-44-1",
       "original": "K."
      },
      {
       "id": "s-references-44-2",
       "original": "Heafield."
      },
      {
       "id": "s-references-44-3",
       "original": "KenLM: Faster and smaller language model queries."
      },
      {
       "id": "s-references-44-4",
       "original": "In Proceedings of the Sixth Workshop on Statistical Machine Translation, pages 187–197, Edinburgh, Scotland, July 2011."
      }
     ]
    },
    {
     "id": "p-references-45",
     "type": "paragraph",
     "page": 31,
     "sentences": [
      {
       "id": "s-references-45-1",
       "original": "Association for Computational Linguistics."
      }
     ]
    },
    {
     "id": "p-references-46",
     "type": "paragraph",
     "page": 31,
     "sentences": [
      {
       "id": "s-references-46-1",
       "original": "G."
      },
      {
       "id": "s-references-46-2",
       "original": "Heigold, V."
      },
      {
       "id": "s-references-46-3",
       "original": "Vanhoucke, A."
      },
      {
       "id": "s-references-46-4",
       "original": "Senior, P."
      },
      {
       "id": "s-references-46-5",
       "original": "Nguyen, M."
      },
      {
       "id": "s-references-46-6",
       "original": "Ranzato, M."
      },
      {
       "id": "s-references-46-7",
       "original": "Devin, and J."
      },
      {
       "id": "s-references-46-8",
       "original": "Dean."
      },
      {
       "id": "s-references-46-9",
       "original": "Multilingual acoustic models using distributed deep neural networks."
      },
      {
       "id": "s-references-46-10",
       "original": "In Proc. of ICASSP, 2013."
      }
     ]
    },
    {
     "id": "p-references-47",
     "type": "paragraph",
     "page": 31,
     "sentences": [
      {
       "id": "s-references-47-1",
       "original": "U."
      },
      {
       "id": "s-references-47-2",
       "original": "Hermjakob, J."
      },
      {
       "id": "s-references-47-3",
       "original": "May, and K."
      },
      {
       "id": "s-references-47-4",
       "original": "Knight."
      },
      {
       "id": "s-references-47-5",
       "original": "Out-of-the-box universal Romanization tool uroman."
      },
      {
       "id": "s-references-47-6",
       "original": "In Proceedings of ACL 2018, System Demonstrations, pages 13–18, Melbourne, Australia, July 2018."
      },
      {
       "id": "s-references-47-7",
       "original": "Association for Computational Linguistics. doi: 10.18653/v1/P18-4003."
      },
      {
       "id": "s-references-47-8",
       "original": "URL https: //aclanthology.org/P18-4003."
      }
     ]
    },
    {
     "id": "p-references-48",
     "type": "paragraph",
     "page": 31,
     "sentences": [
      {
       "id": "s-references-48-1",
       "original": "J."
      },
      {
       "id": "s-references-48-2",
       "original": "L."
      },
      {
       "id": "s-references-48-3",
       "original": "Hieronymus."
      },
      {
       "id": "s-references-48-4",
       "original": "Ascii phonetic symbols for the world’s languages: Worldbet."
      },
      {
       "id": "s-references-48-5",
       "original": "JIPA, 23:72, 1993."
      }
     ]
    },
    {
     "id": "p-references-49",
     "type": "paragraph",
     "page": 31,
     "sentences": [
      {
       "id": "s-references-49-1",
       "original": "N."
      },
      {
       "id": "s-references-49-2",
       "original": "Houlsby, A."
      },
      {
       "id": "s-references-49-3",
       "original": "Giurgiu, S."
      },
      {
       "id": "s-references-49-4",
       "original": "Jastrzebski, B."
      },
      {
       "id": "s-references-49-5",
       "original": "Morrone, Q."
      },
      {
       "id": "s-references-49-6",
       "original": "De Laroussilhe, A."
      },
      {
       "id": "s-references-49-7",
       "original": "Gesmundo, M."
      },
      {
       "id": "s-references-49-8",
       "original": "Attariyan, and S."
      },
      {
       "id": "s-references-49-9",
       "original": "Gelly."
      },
      {
       "id": "s-references-49-10",
       "original": "Parameter-efficient transfer learning for nlp."
      },
      {
       "id": "s-references-49-11",
       "original": "In International Conference on Machine Learning, pages 2790–2799."
      },
      {
       "id": "s-references-49-12",
       "original": "PMLR, 2019."
      }
     ]
    },
    {
     "id": "p-references-50",
     "type": "paragraph",
     "page": 31,
     "sentences": [
      {
       "id": "s-references-50-1",
       "original": "W.-N."
      },
      {
       "id": "s-references-50-2",
       "original": "Hsu, A."
      },
      {
       "id": "s-references-50-3",
       "original": "Sriram, A."
      },
      {
       "id": "s-references-50-4",
       "original": "Baevski, T."
      },
      {
       "id": "s-references-50-5",
       "original": "Likhomanenko, Q."
      },
      {
       "id": "s-references-50-6",
       "original": "Xu, V."
      },
      {
       "id": "s-references-50-7",
       "original": "Pratap, J."
      },
      {
       "id": "s-references-50-8",
       "original": "Kahn, A."
      },
      {
       "id": "s-references-50-9",
       "original": "Lee, R."
      },
      {
       "id": "s-references-50-10",
       "original": "Collobert, G."
      },
      {
       "id": "s-references-50-11",
       "original": "Synnaeve, et al. Robust wav2vec 2.0: Analyzing domain shift in self-supervised pre-training."
      }
     ]
    },
    {
     "id": "p-references-51",
     "type": "paragraph",
     "page": 31,
     "sentences": [
      {
       "id": "s-references-51-1",
       "original": "arXiv preprint arXiv:2104.01027, 2021."
      }
     ]
    },
    {
     "id": "p-references-52",
     "type": "paragraph",
     "page": 31,
     "sentences": [
      {
       "id": "s-references-52-1",
       "original": "K."
      },
      {
       "id": "s-references-52-2",
       "original": "Ito and L."
      },
      {
       "id": "s-references-52-3",
       "original": "Johnson."
      },
      {
       "id": "s-references-52-4",
       "original": "The lj speech dataset. https://keithito.com/LJ-Speech-Dataset/, 2017."
      }
     ]
    },
    {
     "id": "p-references-53",
     "type": "paragraph",
     "page": 31,
     "sentences": [
      {
       "id": "s-references-53-1",
       "original": "E."
      },
      {
       "id": "s-references-53-2",
       "original": "Jang, S."
      },
      {
       "id": "s-references-53-3",
       "original": "Gu, and B."
      },
      {
       "id": "s-references-53-4",
       "original": "Poole."
      },
      {
       "id": "s-references-53-5",
       "original": "Categorical reparameterization with gumbel-softmax."
      },
      {
       "id": "s-references-53-6",
       "original": "Proc. of ICLR, 2016."
      }
     ]
    },
    {
     "id": "p-references-54",
     "type": "paragraph",
     "page": 31,
     "sentences": [
      {
       "id": "s-references-54-1",
       "original": "T."
      },
      {
       "id": "s-references-54-2",
       "original": "Javed, S."
      },
      {
       "id": "s-references-54-3",
       "original": "Doddapaneni, A."
      },
      {
       "id": "s-references-54-4",
       "original": "Raman, K."
      },
      {
       "id": "s-references-54-5",
       "original": "S."
      },
      {
       "id": "s-references-54-6",
       "original": "Bhogale, G."
      },
      {
       "id": "s-references-54-7",
       "original": "Ramesh, A."
      },
      {
       "id": "s-references-54-8",
       "original": "Kunchukuttan, P."
      },
      {
       "id": "s-references-54-9",
       "original": "Kumar, and M."
      },
      {
       "id": "s-references-54-10",
       "original": "M."
      },
      {
       "id": "s-references-54-11",
       "original": "Khapra."
      },
      {
       "id": "s-references-54-12",
       "original": "Towards building asr systems for the next billion users."
      },
      {
       "id": "s-references-54-13",
       "original": "In Proc. of AAAI CAI, 2022."
      }
     ]
    },
    {
     "id": "p-references-55",
     "type": "paragraph",
     "page": 31,
     "sentences": [
      {
       "id": "s-references-55-1",
       "original": "H."
      },
      {
       "id": "s-references-55-2",
       "original": "Jegou, M."
      },
      {
       "id": "s-references-55-3",
       "original": "Douze, and C."
      },
      {
       "id": "s-references-55-4",
       "original": "Schmid."
      },
      {
       "id": "s-references-55-5",
       "original": "Product quantization for nearest neighbor search."
      },
      {
       "id": "s-references-55-6",
       "original": "IEEE Trans."
      }
     ]
    },
    {
     "id": "p-references-56",
     "type": "paragraph",
     "page": 31,
     "sentences": [
      {
       "id": "s-references-56-1",
       "original": "Pattern Anal."
      },
      {
       "id": "s-references-56-2",
       "original": "Mach."
      },
      {
       "id": "s-references-56-3",
       "original": "Intell., 33(1):117–128, Jan. 2011."
      }
     ]
    },
    {
     "id": "p-references-57",
     "type": "paragraph",
     "page": 32,
     "sentences": [
      {
       "id": "s-references-57-1",
       "original": "F."
      },
      {
       "id": "s-references-57-2",
       "original": "Jia, N."
      },
      {
       "id": "s-references-57-3",
       "original": "R."
      },
      {
       "id": "s-references-57-4",
       "original": "Koluguri, J."
      },
      {
       "id": "s-references-57-5",
       "original": "Balam, and B."
      },
      {
       "id": "s-references-57-6",
       "original": "Ginsburg."
      },
      {
       "id": "s-references-57-7",
       "original": "Ambernet: A compact end-to-end model for spoken language identification. arXiv, abs/2210.15781, 2022."
      }
     ]
    },
    {
     "id": "p-references-58",
     "type": "paragraph",
     "page": 32,
     "sentences": [
      {
       "id": "s-references-58-1",
       "original": "J."
      },
      {
       "id": "s-references-58-2",
       "original": "D."
      },
      {
       "id": "s-references-58-3",
       "original": "Kahn, V."
      },
      {
       "id": "s-references-58-4",
       "original": "Pratap, T."
      },
      {
       "id": "s-references-58-5",
       "original": "Likhomanenko, Q."
      },
      {
       "id": "s-references-58-6",
       "original": "Xu, A."
      },
      {
       "id": "s-references-58-7",
       "original": "Hannun, J."
      },
      {
       "id": "s-references-58-8",
       "original": "Cai, P."
      },
      {
       "id": "s-references-58-9",
       "original": "Tomasello, A."
      },
      {
       "id": "s-references-58-10",
       "original": "Lee, E."
      },
      {
       "id": "s-references-58-11",
       "original": "Grave, G."
      },
      {
       "id": "s-references-58-12",
       "original": "Avidov, et al. Flashlight: Enabling innovation in tools for machine learning."
      },
      {
       "id": "s-references-58-13",
       "original": "In International Conference on Machine Learning, pages 10557–10574."
      },
      {
       "id": "s-references-58-14",
       "original": "PMLR, 2022."
      }
     ]
    },
    {
     "id": "p-references-59",
     "type": "paragraph",
     "page": 32,
     "sentences": [
      {
       "id": "s-references-59-1",
       "original": "A."
      },
      {
       "id": "s-references-59-2",
       "original": "Kannan, A."
      },
      {
       "id": "s-references-59-3",
       "original": "Datta, et al. Large-scale multilingual speech recognition with a streaming end-to-end model."
      },
      {
       "id": "s-references-59-4",
       "original": "In Proc. of Interspeech, 2019."
      }
     ]
    },
    {
     "id": "p-references-60",
     "type": "paragraph",
     "page": 32,
     "sentences": [
      {
       "id": "s-references-60-1",
       "original": "J."
      },
      {
       "id": "s-references-60-2",
       "original": "Kim, J."
      },
      {
       "id": "s-references-60-3",
       "original": "Kong, and J."
      },
      {
       "id": "s-references-60-4",
       "original": "Son."
      },
      {
       "id": "s-references-60-5",
       "original": "Conditional variational autoencoder with adversarial learning for end-to-end text-to-speech."
      },
      {
       "id": "s-references-60-6",
       "original": "In Proc. of ICML, 2021."
      }
     ]
    },
    {
     "id": "p-references-61",
     "type": "paragraph",
     "page": 32,
     "sentences": [
      {
       "id": "s-references-61-1",
       "original": "D."
      },
      {
       "id": "s-references-61-2",
       "original": "P."
      },
      {
       "id": "s-references-61-3",
       "original": "Kingma and J."
      },
      {
       "id": "s-references-61-4",
       "original": "Ba."
      },
      {
       "id": "s-references-61-5",
       "original": "Adam: A Method for Stochastic Optimization."
      },
      {
       "id": "s-references-61-6",
       "original": "In Proc. of ICLR, 2015."
      }
     ]
    },
    {
     "id": "p-references-62",
     "type": "paragraph",
     "page": 32,
     "sentences": [
      {
       "id": "s-references-62-1",
       "original": "D."
      },
      {
       "id": "s-references-62-2",
       "original": "P."
      },
      {
       "id": "s-references-62-3",
       "original": "Kingma and M."
      },
      {
       "id": "s-references-62-4",
       "original": "Welling."
      },
      {
       "id": "s-references-62-5",
       "original": "Auto-encoding variational bayes."
      },
      {
       "id": "s-references-62-6",
       "original": "CoRR, abs/1312.6114, 2013."
      }
     ]
    },
    {
     "id": "p-references-63",
     "type": "paragraph",
     "page": 32,
     "sentences": [
      {
       "id": "s-references-63-1",
       "original": "A."
      },
      {
       "id": "s-references-63-2",
       "original": "Koenecke, A."
      },
      {
       "id": "s-references-63-3",
       "original": "Nam, E."
      },
      {
       "id": "s-references-63-4",
       "original": "Lake, J."
      },
      {
       "id": "s-references-63-5",
       "original": "Nudell, M."
      },
      {
       "id": "s-references-63-6",
       "original": "Quartey, Z."
      },
      {
       "id": "s-references-63-7",
       "original": "Mengesha, C."
      },
      {
       "id": "s-references-63-8",
       "original": "Toups, J."
      },
      {
       "id": "s-references-63-9",
       "original": "R."
      },
      {
       "id": "s-references-63-10",
       "original": "Rickford, D."
      },
      {
       "id": "s-references-63-11",
       "original": "Jurafsky, and S."
      },
      {
       "id": "s-references-63-12",
       "original": "Goel."
      },
      {
       "id": "s-references-63-13",
       "original": "Racial disparities in automated speech recognition."
      },
      {
       "id": "s-references-63-14",
       "original": "Proceedings of the National Academy of Sciences, 2020."
      }
     ]
    },
    {
     "id": "p-references-64",
     "type": "paragraph",
     "page": 32,
     "sentences": [
      {
       "id": "s-references-64-1",
       "original": "J."
      },
      {
       "id": "s-references-64-2",
       "original": "Kong, J."
      },
      {
       "id": "s-references-64-3",
       "original": "Kim, and J."
      },
      {
       "id": "s-references-64-4",
       "original": "Bae."
      },
      {
       "id": "s-references-64-5",
       "original": "Hifi-gan: Generative adversarial networks for efficient and high fidelity speech synthesis."
      },
      {
       "id": "s-references-64-6",
       "original": "In NeurIPS, 2020."
      }
     ]
    },
    {
     "id": "p-references-65",
     "type": "paragraph",
     "page": 32,
     "sentences": [
      {
       "id": "s-references-65-1",
       "original": "L."
      },
      {
       "id": "s-references-65-2",
       "original": "Kürzinger, D."
      },
      {
       "id": "s-references-65-3",
       "original": "Winkelbauer, L."
      },
      {
       "id": "s-references-65-4",
       "original": "Li, T."
      },
      {
       "id": "s-references-65-5",
       "original": "Watzel, and G."
      },
      {
       "id": "s-references-65-6",
       "original": "Rigoll."
      },
      {
       "id": "s-references-65-7",
       "original": "Ctc-segmentation of large corpora for german end-to-end speech recognition."
      },
      {
       "id": "s-references-65-8",
       "original": "In A."
      },
      {
       "id": "s-references-65-9",
       "original": "Karpov and R."
      },
      {
       "id": "s-references-65-10",
       "original": "Potapova, editors, Speech and Computer, pages 267–278, Cham, 2020."
      },
      {
       "id": "s-references-65-11",
       "original": "Springer International Publishing."
      }
     ]
    },
    {
     "id": "p-references-66",
     "type": "paragraph",
     "page": 32,
     "sentences": [
      {
       "id": "s-references-66-1",
       "original": "C."
      },
      {
       "id": "s-references-66-2",
       "original": "Leong, J."
      },
      {
       "id": "s-references-66-3",
       "original": "Nemecek, J."
      },
      {
       "id": "s-references-66-4",
       "original": "Mansdorfer, A."
      },
      {
       "id": "s-references-66-5",
       "original": "Filighera, A."
      },
      {
       "id": "s-references-66-6",
       "original": "Owodunni, and D."
      },
      {
       "id": "s-references-66-7",
       "original": "Whitenack."
      },
      {
       "id": "s-references-66-8",
       "original": "Bloom library: Multimodal datasets in 300+ languages for a variety of downstream tasks."
      },
      {
       "id": "s-references-66-9",
       "original": "In Proc. of EMNLP, 2022."
      }
     ]
    },
    {
     "id": "p-references-67",
     "type": "paragraph",
     "page": 32,
     "sentences": [
      {
       "id": "s-references-67-1",
       "original": "M."
      },
      {
       "id": "s-references-67-2",
       "original": "P."
      },
      {
       "id": "s-references-67-3",
       "original": "Lewis, G."
      },
      {
       "id": "s-references-67-4",
       "original": "F."
      },
      {
       "id": "s-references-67-5",
       "original": "Simon, and C."
      },
      {
       "id": "s-references-67-6",
       "original": "D."
      },
      {
       "id": "s-references-67-7",
       "original": "Fennig."
      },
      {
       "id": "s-references-67-8",
       "original": "Ethnologue: Languages of the world, nineteenth edition."
      }
     ]
    },
    {
     "id": "p-references-68",
     "type": "paragraph",
     "page": 32,
     "sentences": [
      {
       "id": "s-references-68-1",
       "original": "Online version: http://www.ethnologue.com, 2016."
      }
     ]
    },
    {
     "id": "p-references-69",
     "type": "paragraph",
     "page": 32,
     "sentences": [
      {
       "id": "s-references-69-1",
       "original": "B."
      },
      {
       "id": "s-references-69-2",
       "original": "Li, Y."
      },
      {
       "id": "s-references-69-3",
       "original": "Zhang, T."
      },
      {
       "id": "s-references-69-4",
       "original": "Sainath, Y."
      },
      {
       "id": "s-references-69-5",
       "original": "Wu, and W."
      },
      {
       "id": "s-references-69-6",
       "original": "Chan."
      },
      {
       "id": "s-references-69-7",
       "original": "Bytes are all you need: End-to-end multilingual speech recognition and synthesis with bytes."
      },
      {
       "id": "s-references-69-8",
       "original": "In Proc. of ICASSP, 2019."
      }
     ]
    },
    {
     "id": "p-references-70",
     "type": "paragraph",
     "page": 32,
     "sentences": [
      {
       "id": "s-references-70-1",
       "original": "B."
      },
      {
       "id": "s-references-70-2",
       "original": "Li, R."
      },
      {
       "id": "s-references-70-3",
       "original": "Pang, T."
      },
      {
       "id": "s-references-70-4",
       "original": "N."
      },
      {
       "id": "s-references-70-5",
       "original": "Sainath, A."
      },
      {
       "id": "s-references-70-6",
       "original": "Gulati, Y."
      },
      {
       "id": "s-references-70-7",
       "original": "Zhang, J."
      },
      {
       "id": "s-references-70-8",
       "original": "Qin, P."
      },
      {
       "id": "s-references-70-9",
       "original": "Haghani, W."
      },
      {
       "id": "s-references-70-10",
       "original": "R."
      },
      {
       "id": "s-references-70-11",
       "original": "Huang, M."
      },
      {
       "id": "s-references-70-12",
       "original": "Ma, and J."
      },
      {
       "id": "s-references-70-13",
       "original": "Bai."
      },
      {
       "id": "s-references-70-14",
       "original": "Scaling end-to-end models for large-scale multilingual asr."
      },
      {
       "id": "s-references-70-15",
       "original": "In Proc. of ASRU, 2021."
      }
     ]
    },
    {
     "id": "p-references-71",
     "type": "paragraph",
     "page": 32,
     "sentences": [
      {
       "id": "s-references-71-1",
       "original": "X."
      },
      {
       "id": "s-references-71-2",
       "original": "Li, F."
      },
      {
       "id": "s-references-71-3",
       "original": "Metze, D."
      },
      {
       "id": "s-references-71-4",
       "original": "R."
      },
      {
       "id": "s-references-71-5",
       "original": "Mortensen, A."
      },
      {
       "id": "s-references-71-6",
       "original": "W."
      },
      {
       "id": "s-references-71-7",
       "original": "Black, and S."
      },
      {
       "id": "s-references-71-8",
       "original": "Watanabe."
      },
      {
       "id": "s-references-71-9",
       "original": "Asr2k: Speech recognition for around 2000 languages without audio. arXiv preprint arXiv:2209.02842, 2022."
      }
     ]
    },
    {
     "id": "p-references-72",
     "type": "paragraph",
     "page": 32,
     "sentences": [
      {
       "id": "s-references-72-1",
       "original": "T."
      },
      {
       "id": "s-references-72-2",
       "original": "Likhomanenko, G."
      },
      {
       "id": "s-references-72-3",
       "original": "Synnaeve, and R."
      },
      {
       "id": "s-references-72-4",
       "original": "Collobert."
      },
      {
       "id": "s-references-72-5",
       "original": "Who needs words? lexicon-free speech recognition."
      }
     ]
    },
    {
     "id": "p-references-73",
     "type": "paragraph",
     "page": 32,
     "sentences": [
      {
       "id": "s-references-73-1",
       "original": "In Proc. of Interspeech, 2019."
      }
     ]
    },
    {
     "id": "p-references-74",
     "type": "paragraph",
     "page": 32,
     "sentences": [
      {
       "id": "s-references-74-1",
       "original": "T."
      },
      {
       "id": "s-references-74-2",
       "original": "Likhomanenko, Q."
      },
      {
       "id": "s-references-74-3",
       "original": "Xu, V."
      },
      {
       "id": "s-references-74-4",
       "original": "Pratap, P."
      },
      {
       "id": "s-references-74-5",
       "original": "Tomasello, J."
      },
      {
       "id": "s-references-74-6",
       "original": "Kahn, G."
      },
      {
       "id": "s-references-74-7",
       "original": "Avidov, R."
      },
      {
       "id": "s-references-74-8",
       "original": "Collobert, and G."
      },
      {
       "id": "s-references-74-9",
       "original": "Synnaeve."
      }
     ]
    },
    {
     "id": "p-references-75",
     "type": "paragraph",
     "page": 32,
     "sentences": [
      {
       "id": "s-references-75-1",
       "original": "Rethinking evaluation in ASR: are our models robust enough?"
      },
      {
       "id": "s-references-75-2",
       "original": "In Proc. of Interspeech, 2020."
      }
     ]
    },
    {
     "id": "p-references-76",
     "type": "paragraph",
     "page": 32,
     "sentences": [
      {
       "id": "s-references-76-1",
       "original": "H."
      },
      {
       "id": "s-references-76-2",
       "original": "Lin, L."
      },
      {
       "id": "s-references-76-3",
       "original": "Deng, D."
      },
      {
       "id": "s-references-76-4",
       "original": "Yu, Y.-f."
      },
      {
       "id": "s-references-76-5",
       "original": "Gong, A."
      },
      {
       "id": "s-references-76-6",
       "original": "Acero, and C.-H."
      },
      {
       "id": "s-references-76-7",
       "original": "Lee."
      },
      {
       "id": "s-references-76-8",
       "original": "A study on multilingual acoustic modeling for large vocabulary asr."
      },
      {
       "id": "s-references-76-9",
       "original": "In Proc. of ICASSP, 2009."
      }
     ]
    },
    {
     "id": "p-references-77",
     "type": "paragraph",
     "page": 32,
     "sentences": [
      {
       "id": "s-references-77-1",
       "original": "A."
      },
      {
       "id": "s-references-77-2",
       "original": "H."
      },
      {
       "id": "s-references-77-3",
       "original": "Liu, W.-N."
      },
      {
       "id": "s-references-77-4",
       "original": "Hsu, M."
      },
      {
       "id": "s-references-77-5",
       "original": "Auli, and A."
      },
      {
       "id": "s-references-77-6",
       "original": "Baevski."
      },
      {
       "id": "s-references-77-7",
       "original": "Towards end-to-end unsupervised speech recognition."
      }
     ]
    },
    {
     "id": "p-references-78",
     "type": "paragraph",
     "page": 32,
     "sentences": [
      {
       "id": "s-references-78-1",
       "original": "arXiv, 2022."
      }
     ]
    },
    {
     "id": "p-references-79",
     "type": "paragraph",
     "page": 32,
     "sentences": [
      {
       "id": "s-references-79-1",
       "original": "Y."
      },
      {
       "id": "s-references-79-2",
       "original": "Liu, J."
      },
      {
       "id": "s-references-79-3",
       "original": "Gu, N."
      },
      {
       "id": "s-references-79-4",
       "original": "Goyal, X."
      },
      {
       "id": "s-references-79-5",
       "original": "Li, S."
      },
      {
       "id": "s-references-79-6",
       "original": "Edunov, M."
      },
      {
       "id": "s-references-79-7",
       "original": "Ghazvininejad, M."
      },
      {
       "id": "s-references-79-8",
       "original": "Lewis, and L."
      },
      {
       "id": "s-references-79-9",
       "original": "Zettlemoyer."
      }
     ]
    },
    {
     "id": "p-references-80",
     "type": "paragraph",
     "page": 32,
     "sentences": [
      {
       "id": "s-references-80-1",
       "original": "Multilingual denoising pre-training for neural machine translation. arXiv, abs/2001.08210, 2020."
      }
     ]
    },
    {
     "id": "p-references-81",
     "type": "paragraph",
     "page": 32,
     "sentences": [
      {
       "id": "s-references-81-1",
       "original": "L."
      },
      {
       "id": "s-references-81-2",
       "original": "Lugosch, T."
      },
      {
       "id": "s-references-81-3",
       "original": "Likhomanenko, G."
      },
      {
       "id": "s-references-81-4",
       "original": "Synnaeve, and R."
      },
      {
       "id": "s-references-81-5",
       "original": "Collobert."
      },
      {
       "id": "s-references-81-6",
       "original": "Pseudo-labeling for massively multilingual speech recognition."
      },
      {
       "id": "s-references-81-7",
       "original": "In Proc. of ICASSP, 2022."
      }
     ]
    },
    {
     "id": "p-references-82",
     "type": "paragraph",
     "page": 32,
     "sentences": [
      {
       "id": "s-references-82-1",
       "original": "M-AILABS."
      },
      {
       "id": "s-references-82-2",
       "original": "The m-ailabs speech dataset, 2018."
      },
      {
       "id": "s-references-82-3",
       "original": "URL https://www.caito.de/2019/01/03/ the-m-ailabs-speech-dataset/."
      }
     ]
    },
    {
     "id": "p-references-83",
     "type": "paragraph",
     "page": 33,
     "sentences": [
      {
       "id": "s-references-83-1",
       "original": "M."
      },
      {
       "id": "s-references-83-2",
       "original": "Mauch and S."
      },
      {
       "id": "s-references-83-3",
       "original": "Dixon."
      },
      {
       "id": "s-references-83-4",
       "original": "Pyin: A fundamental frequency estimator using probabilistic threshold distributions. 2014 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP), pages 659–663, 2014."
      }
     ]
    },
    {
     "id": "p-references-84",
     "type": "paragraph",
     "page": 33,
     "sentences": [
      {
       "id": "s-references-84-1",
       "original": "A."
      },
      {
       "id": "s-references-84-2",
       "original": "McCarthy, R."
      },
      {
       "id": "s-references-84-3",
       "original": "Wicks, D."
      },
      {
       "id": "s-references-84-4",
       "original": "Lewis, A."
      },
      {
       "id": "s-references-84-5",
       "original": "Mueller, W."
      },
      {
       "id": "s-references-84-6",
       "original": "Wu, O."
      },
      {
       "id": "s-references-84-7",
       "original": "Adams, G."
      },
      {
       "id": "s-references-84-8",
       "original": "Nicolai, M."
      },
      {
       "id": "s-references-84-9",
       "original": "Post, and D."
      },
      {
       "id": "s-references-84-10",
       "original": "Yarowsky."
      },
      {
       "id": "s-references-84-11",
       "original": "The johns hopkins university bible corpus: 1600+ tongues for typological exploration."
      }
     ]
    },
    {
     "id": "p-references-85",
     "type": "paragraph",
     "page": 33,
     "sentences": [
      {
       "id": "s-references-85-1",
       "original": "In Proc. of LREC, 2020."
      }
     ]
    },
    {
     "id": "p-references-86",
     "type": "paragraph",
     "page": 33,
     "sentences": [
      {
       "id": "s-references-86-1",
       "original": "J."
      },
      {
       "id": "s-references-86-2",
       "original": "Meyer, D."
      },
      {
       "id": "s-references-86-3",
       "original": "I."
      },
      {
       "id": "s-references-86-4",
       "original": "Adelani, E."
      },
      {
       "id": "s-references-86-5",
       "original": "Casanova, A. Öktem, D."
      },
      {
       "id": "s-references-86-6",
       "original": "W."
      },
      {
       "id": "s-references-86-7",
       "original": "J."
      },
      {
       "id": "s-references-86-8",
       "original": "Weber, S."
      },
      {
       "id": "s-references-86-9",
       "original": "Kabongo, E."
      },
      {
       "id": "s-references-86-10",
       "original": "Salesky, I."
      },
      {
       "id": "s-references-86-11",
       "original": "Orife, C."
      },
      {
       "id": "s-references-86-12",
       "original": "Leong, P."
      },
      {
       "id": "s-references-86-13",
       "original": "Ogayo, C."
      },
      {
       "id": "s-references-86-14",
       "original": "Emezue, J."
      },
      {
       "id": "s-references-86-15",
       "original": "Mukiibi, S."
      },
      {
       "id": "s-references-86-16",
       "original": "Osei, A."
      },
      {
       "id": "s-references-86-17",
       "original": "Agbolo, V."
      },
      {
       "id": "s-references-86-18",
       "original": "Akinode, B."
      },
      {
       "id": "s-references-86-19",
       "original": "Opoku, S."
      },
      {
       "id": "s-references-86-20",
       "original": "Olanrewaju, J."
      },
      {
       "id": "s-references-86-21",
       "original": "Alabi, and S."
      },
      {
       "id": "s-references-86-22",
       "original": "Muhammad."
      },
      {
       "id": "s-references-86-23",
       "original": "Bibletts: a large, high-fidelity, multilingual, and uniquely african speech corpus. arXiv, abs/2207.03546, 2022."
      }
     ]
    },
    {
     "id": "p-references-87",
     "type": "paragraph",
     "page": 33,
     "sentences": [
      {
       "id": "s-references-87-1",
       "original": "T."
      },
      {
       "id": "s-references-87-2",
       "original": "Nekvinda and O."
      },
      {
       "id": "s-references-87-3",
       "original": "Dušek."
      },
      {
       "id": "s-references-87-4",
       "original": "One model, many languages: Meta-learning for multilingual text-tospeech."
      },
      {
       "id": "s-references-87-5",
       "original": "In Interspeech, 2020."
      }
     ]
    },
    {
     "id": "p-references-88",
     "type": "paragraph",
     "page": 33,
     "sentences": [
      {
       "id": "s-references-88-1",
       "original": "NLLB_Team, M."
      },
      {
       "id": "s-references-88-2",
       "original": "R."
      },
      {
       "id": "s-references-88-3",
       "original": "Costa-jussà, J."
      },
      {
       "id": "s-references-88-4",
       "original": "Cross, O. Çelebi, M."
      },
      {
       "id": "s-references-88-5",
       "original": "Elbayad, K."
      },
      {
       "id": "s-references-88-6",
       "original": "Heafield, K."
      },
      {
       "id": "s-references-88-7",
       "original": "Heffernan, E."
      },
      {
       "id": "s-references-88-8",
       "original": "Kalbassi, J."
      },
      {
       "id": "s-references-88-9",
       "original": "Lam, D."
      },
      {
       "id": "s-references-88-10",
       "original": "Licht, J."
      },
      {
       "id": "s-references-88-11",
       "original": "Maillard, A."
      },
      {
       "id": "s-references-88-12",
       "original": "Sun, S."
      },
      {
       "id": "s-references-88-13",
       "original": "Wang, G."
      },
      {
       "id": "s-references-88-14",
       "original": "Wenzek, A."
      },
      {
       "id": "s-references-88-15",
       "original": "Youngblood, B."
      },
      {
       "id": "s-references-88-16",
       "original": "Akula, L."
      },
      {
       "id": "s-references-88-17",
       "original": "Barrault, G."
      },
      {
       "id": "s-references-88-18",
       "original": "M."
      },
      {
       "id": "s-references-88-19",
       "original": "Gonzalez, P."
      },
      {
       "id": "s-references-88-20",
       "original": "Hansanti, J."
      },
      {
       "id": "s-references-88-21",
       "original": "Hoffman, S."
      },
      {
       "id": "s-references-88-22",
       "original": "Jarrett, K."
      },
      {
       "id": "s-references-88-23",
       "original": "R."
      },
      {
       "id": "s-references-88-24",
       "original": "Sadagopan, D."
      },
      {
       "id": "s-references-88-25",
       "original": "Rowe, S."
      },
      {
       "id": "s-references-88-26",
       "original": "Spruit, C."
      },
      {
       "id": "s-references-88-27",
       "original": "Tran, P."
      },
      {
       "id": "s-references-88-28",
       "original": "Andrews, N."
      },
      {
       "id": "s-references-88-29",
       "original": "F."
      },
      {
       "id": "s-references-88-30",
       "original": "Ayan, S."
      },
      {
       "id": "s-references-88-31",
       "original": "Bhosale, S."
      },
      {
       "id": "s-references-88-32",
       "original": "Edunov, A."
      },
      {
       "id": "s-references-88-33",
       "original": "Fan, C."
      },
      {
       "id": "s-references-88-34",
       "original": "Gao, V."
      },
      {
       "id": "s-references-88-35",
       "original": "Goswami, F."
      },
      {
       "id": "s-references-88-36",
       "original": "Guzmán, P."
      },
      {
       "id": "s-references-88-37",
       "original": "Koehn, A."
      },
      {
       "id": "s-references-88-38",
       "original": "Mourachko, C."
      },
      {
       "id": "s-references-88-39",
       "original": "Ropers, S."
      },
      {
       "id": "s-references-88-40",
       "original": "Saleem, H."
      },
      {
       "id": "s-references-88-41",
       "original": "Schwenk, and J."
      },
      {
       "id": "s-references-88-42",
       "original": "Wang."
      },
      {
       "id": "s-references-88-43",
       "original": "No language left behind: Scaling human-centered machine translation, 2022."
      }
     ]
    },
    {
     "id": "p-references-89",
     "type": "paragraph",
     "page": 33,
     "sentences": [
      {
       "id": "s-references-89-1",
       "original": "M."
      },
      {
       "id": "s-references-89-2",
       "original": "Ott, S."
      },
      {
       "id": "s-references-89-3",
       "original": "Edunov, A."
      },
      {
       "id": "s-references-89-4",
       "original": "Baevski, A."
      },
      {
       "id": "s-references-89-5",
       "original": "Fan, S."
      },
      {
       "id": "s-references-89-6",
       "original": "Gross, N."
      },
      {
       "id": "s-references-89-7",
       "original": "Ng, D."
      },
      {
       "id": "s-references-89-8",
       "original": "Grangier, and M."
      },
      {
       "id": "s-references-89-9",
       "original": "Auli. fairseq: A fast, extensible toolkit for sequence modeling."
      },
      {
       "id": "s-references-89-10",
       "original": "In Proc. of NAACL System Demonstrations, 2019."
      }
     ]
    },
    {
     "id": "p-references-90",
     "type": "paragraph",
     "page": 33,
     "sentences": [
      {
       "id": "s-references-90-1",
       "original": "K."
      },
      {
       "id": "s-references-90-2",
       "original": "Park and J."
      },
      {
       "id": "s-references-90-3",
       "original": "Kim. g2pe. https://github.com/Kyubyong/g2p, 2019."
      }
     ]
    },
    {
     "id": "p-references-91",
     "type": "paragraph",
     "page": 33,
     "sentences": [
      {
       "id": "s-references-91-1",
       "original": "D."
      },
      {
       "id": "s-references-91-2",
       "original": "Povey, A."
      },
      {
       "id": "s-references-91-3",
       "original": "Ghoshal, G."
      },
      {
       "id": "s-references-91-4",
       "original": "Boulianne, L."
      },
      {
       "id": "s-references-91-5",
       "original": "Burget, O."
      },
      {
       "id": "s-references-91-6",
       "original": "Glembek, N."
      },
      {
       "id": "s-references-91-7",
       "original": "Goel, M."
      },
      {
       "id": "s-references-91-8",
       "original": "Hannemann, P."
      },
      {
       "id": "s-references-91-9",
       "original": "Motlicek, Y."
      },
      {
       "id": "s-references-91-10",
       "original": "Qian, P."
      },
      {
       "id": "s-references-91-11",
       "original": "Schwarz, J."
      },
      {
       "id": "s-references-91-12",
       "original": "Silovsky, G."
      },
      {
       "id": "s-references-91-13",
       "original": "Stemmer, and K."
      },
      {
       "id": "s-references-91-14",
       "original": "Vesely."
      },
      {
       "id": "s-references-91-15",
       "original": "The kaldi speech recognition toolkit."
      }
     ]
    },
    {
     "id": "p-references-92",
     "type": "paragraph",
     "page": 33,
     "sentences": [
      {
       "id": "s-references-92-1",
       "original": "In Proc. of ASRU, 2011."
      }
     ]
    },
    {
     "id": "p-references-93",
     "type": "paragraph",
     "page": 33,
     "sentences": [
      {
       "id": "s-references-93-1",
       "original": "V."
      },
      {
       "id": "s-references-93-2",
       "original": "Pratap, A."
      },
      {
       "id": "s-references-93-3",
       "original": "Hannun, Q."
      },
      {
       "id": "s-references-93-4",
       "original": "Xu, J."
      },
      {
       "id": "s-references-93-5",
       "original": "Cai, J."
      },
      {
       "id": "s-references-93-6",
       "original": "Kahn, G."
      },
      {
       "id": "s-references-93-7",
       "original": "Synnaeve, V."
      },
      {
       "id": "s-references-93-8",
       "original": "Liptchinsky, and R."
      },
      {
       "id": "s-references-93-9",
       "original": "Collobert."
      }
     ]
    },
    {
     "id": "p-references-94",
     "type": "paragraph",
     "page": 33,
     "sentences": [
      {
       "id": "s-references-94-1",
       "original": "Wav2letter++: A fast open-source speech recognition system."
      },
      {
       "id": "s-references-94-2",
       "original": "In Proc. of ICASSP, 2019."
      }
     ]
    },
    {
     "id": "p-references-95",
     "type": "paragraph",
     "page": 33,
     "sentences": [
      {
       "id": "s-references-95-1",
       "original": "V."
      },
      {
       "id": "s-references-95-2",
       "original": "Pratap, A."
      },
      {
       "id": "s-references-95-3",
       "original": "Sriram, P."
      },
      {
       "id": "s-references-95-4",
       "original": "Tomasello, A."
      },
      {
       "id": "s-references-95-5",
       "original": "Hannun, V."
      },
      {
       "id": "s-references-95-6",
       "original": "Liptchinsky, G."
      },
      {
       "id": "s-references-95-7",
       "original": "Synnaeve, and R."
      },
      {
       "id": "s-references-95-8",
       "original": "Collobert."
      }
     ]
    },
    {
     "id": "p-references-96",
     "type": "paragraph",
     "page": 33,
     "sentences": [
      {
       "id": "s-references-96-1",
       "original": "Massively Multilingual ASR: 50 Languages, 1 Model, 1 Billion Parameters."
      },
      {
       "id": "s-references-96-2",
       "original": "In Proc. of Interspeech 2020, 2020a."
      }
     ]
    },
    {
     "id": "p-references-97",
     "type": "paragraph",
     "page": 33,
     "sentences": [
      {
       "id": "s-references-97-1",
       "original": "V."
      },
      {
       "id": "s-references-97-2",
       "original": "Pratap, A."
      },
      {
       "id": "s-references-97-3",
       "original": "Sriram, et al. Massively multilingual asr: 50 languages, 1 model, 1 billion parameters."
      }
     ]
    },
    {
     "id": "p-references-98",
     "type": "paragraph",
     "page": 33,
     "sentences": [
      {
       "id": "s-references-98-1",
       "original": "arXiv, abs/2007.03001, 2020b."
      }
     ]
    },
    {
     "id": "p-references-99",
     "type": "paragraph",
     "page": 33,
     "sentences": [
      {
       "id": "s-references-99-1",
       "original": "V."
      },
      {
       "id": "s-references-99-2",
       "original": "Pratap, Q."
      },
      {
       "id": "s-references-99-3",
       "original": "Xu, A."
      },
      {
       "id": "s-references-99-4",
       "original": "Sriram, G."
      },
      {
       "id": "s-references-99-5",
       "original": "Synnaeve, and R."
      },
      {
       "id": "s-references-99-6",
       "original": "Collobert."
      },
      {
       "id": "s-references-99-7",
       "original": "Mls: A large-scale multilingual dataset for speech research."
      },
      {
       "id": "s-references-99-8",
       "original": "In Proc. of Interspeech, 2020c."
      }
     ]
    },
    {
     "id": "p-references-100",
     "type": "paragraph",
     "page": 33,
     "sentences": [
      {
       "id": "s-references-100-1",
       "original": "V."
      },
      {
       "id": "s-references-100-2",
       "original": "Pratap, A."
      },
      {
       "id": "s-references-100-3",
       "original": "Hannun, G."
      },
      {
       "id": "s-references-100-4",
       "original": "Synnaeve, and R."
      },
      {
       "id": "s-references-100-5",
       "original": "Collobert."
      },
      {
       "id": "s-references-100-6",
       "original": "Star temporal classification: Sequence modeling with partially labeled data."
      },
      {
       "id": "s-references-100-7",
       "original": "In A."
      },
      {
       "id": "s-references-100-8",
       "original": "H."
      },
      {
       "id": "s-references-100-9",
       "original": "Oh, A."
      },
      {
       "id": "s-references-100-10",
       "original": "Agarwal, D."
      },
      {
       "id": "s-references-100-11",
       "original": "Belgrave, and K."
      },
      {
       "id": "s-references-100-12",
       "original": "Cho, editors, Advances in Neural Information Processing Systems, 2022."
      },
      {
       "id": "s-references-100-13",
       "original": "URL https://openreview.net/ forum?id=ldRyJb_cjXa."
      }
     ]
    },
    {
     "id": "p-references-101",
     "type": "paragraph",
     "page": 33,
     "sentences": [
      {
       "id": "s-references-101-1",
       "original": "T."
      },
      {
       "id": "s-references-101-2",
       "original": "Qian, K."
      },
      {
       "id": "s-references-101-3",
       "original": "Hollingshead, S.-y."
      },
      {
       "id": "s-references-101-4",
       "original": "Yoon, K.-y."
      },
      {
       "id": "s-references-101-5",
       "original": "Kim, and R."
      },
      {
       "id": "s-references-101-6",
       "original": "Sproat."
      },
      {
       "id": "s-references-101-7",
       "original": "A python toolkit for universal transliteration."
      },
      {
       "id": "s-references-101-8",
       "original": "In Proc. of LREC, 2010."
      }
     ]
    },
    {
     "id": "p-references-102",
     "type": "paragraph",
     "page": 33,
     "sentences": [
      {
       "id": "s-references-102-1",
       "original": "A."
      },
      {
       "id": "s-references-102-2",
       "original": "Radford, J."
      },
      {
       "id": "s-references-102-3",
       "original": "W."
      },
      {
       "id": "s-references-102-4",
       "original": "Kim, T."
      },
      {
       "id": "s-references-102-5",
       "original": "Xu, G."
      },
      {
       "id": "s-references-102-6",
       "original": "Brockman, C."
      },
      {
       "id": "s-references-102-7",
       "original": "McLeavey, and I."
      },
      {
       "id": "s-references-102-8",
       "original": "Sutskever."
      },
      {
       "id": "s-references-102-9",
       "original": "Robust speech recognition via large-scale weak supervision. arXiv, 2022."
      }
     ]
    },
    {
     "id": "p-references-103",
     "type": "paragraph",
     "page": 33,
     "sentences": [
      {
       "id": "s-references-103-1",
       "original": "S."
      },
      {
       "id": "s-references-103-2",
       "original": "Rajbhandari, O."
      },
      {
       "id": "s-references-103-3",
       "original": "Ruwase, J."
      },
      {
       "id": "s-references-103-4",
       "original": "Rasley, S."
      },
      {
       "id": "s-references-103-5",
       "original": "Smith, and Y."
      },
      {
       "id": "s-references-103-6",
       "original": "He."
      },
      {
       "id": "s-references-103-7",
       "original": "Zero-infinity: Breaking the GPU memory wall for extreme scale deep learning. arXiv, abs/2104.07857, 2021."
      }
     ]
    },
    {
     "id": "p-references-104",
     "type": "paragraph",
     "page": 33,
     "sentences": [
      {
       "id": "s-references-104-1",
       "original": "M."
      },
      {
       "id": "s-references-104-2",
       "original": "Ravanelli, T."
      },
      {
       "id": "s-references-104-3",
       "original": "Parcollet, P."
      },
      {
       "id": "s-references-104-4",
       "original": "Plantinga, A."
      },
      {
       "id": "s-references-104-5",
       "original": "Rouhe, S."
      },
      {
       "id": "s-references-104-6",
       "original": "Cornell, L."
      },
      {
       "id": "s-references-104-7",
       "original": "Lugosch, C."
      },
      {
       "id": "s-references-104-8",
       "original": "Subakan, N."
      },
      {
       "id": "s-references-104-9",
       "original": "Dawalatabad, A."
      },
      {
       "id": "s-references-104-10",
       "original": "Heba, J."
      },
      {
       "id": "s-references-104-11",
       "original": "Zhong, J.-C."
      },
      {
       "id": "s-references-104-12",
       "original": "Chou, S.-L."
      },
      {
       "id": "s-references-104-13",
       "original": "Yeh, S.-W."
      },
      {
       "id": "s-references-104-14",
       "original": "Fu, C.-F."
      },
      {
       "id": "s-references-104-15",
       "original": "Liao, E."
      },
      {
       "id": "s-references-104-16",
       "original": "Rastorgueva, F."
      },
      {
       "id": "s-references-104-17",
       "original": "Grondin, W."
      },
      {
       "id": "s-references-104-18",
       "original": "Aris, H."
      },
      {
       "id": "s-references-104-19",
       "original": "Na, Y."
      },
      {
       "id": "s-references-104-20",
       "original": "Gao, R."
      },
      {
       "id": "s-references-104-21",
       "original": "D."
      },
      {
       "id": "s-references-104-22",
       "original": "Mori, and Y."
      },
      {
       "id": "s-references-104-23",
       "original": "Bengio."
      },
      {
       "id": "s-references-104-24",
       "original": "SpeechBrain: A general-purpose speech toolkit, 2021. arXiv:2106.04624."
      }
     ]
    },
    {
     "id": "p-references-105",
     "type": "paragraph",
     "page": 34,
     "sentences": [
      {
       "id": "s-references-105-1",
       "original": "F."
      },
      {
       "id": "s-references-105-2",
       "original": "Ribeiro, D."
      },
      {
       "id": "s-references-105-3",
       "original": "Florêncio, C."
      },
      {
       "id": "s-references-105-4",
       "original": "Zhang, and M."
      },
      {
       "id": "s-references-105-5",
       "original": "Seltzer."
      },
      {
       "id": "s-references-105-6",
       "original": "Crowdmos: An approach for crowdsourcing mean opinion score studies."
      },
      {
       "id": "s-references-105-7",
       "original": "In 2011 IEEE international conference on acoustics, speech and signal processing (ICASSP), pages 2416–2419."
      },
      {
       "id": "s-references-105-8",
       "original": "IEEE, 2011."
      }
     ]
    },
    {
     "id": "p-references-106",
     "type": "paragraph",
     "page": 34,
     "sentences": [
      {
       "id": "s-references-106-1",
       "original": "T."
      },
      {
       "id": "s-references-106-2",
       "original": "Saeki, S."
      },
      {
       "id": "s-references-106-3",
       "original": "Maiti, X."
      },
      {
       "id": "s-references-106-4",
       "original": "Li, S."
      },
      {
       "id": "s-references-106-5",
       "original": "Watanabe, S."
      },
      {
       "id": "s-references-106-6",
       "original": "Takamichi, and H."
      },
      {
       "id": "s-references-106-7",
       "original": "Saruwatari."
      },
      {
       "id": "s-references-106-8",
       "original": "Learning to speak from text: Zero-shot multilingual text-to-speech with unsupervised text pretraining. arXiv, abs/2301.12596, 2023a."
      }
     ]
    },
    {
     "id": "p-references-107",
     "type": "paragraph",
     "page": 34,
     "sentences": [
      {
       "id": "s-references-107-1",
       "original": "T."
      },
      {
       "id": "s-references-107-2",
       "original": "Saeki, H."
      },
      {
       "id": "s-references-107-3",
       "original": "Zen, Z."
      },
      {
       "id": "s-references-107-4",
       "original": "Chen, N."
      },
      {
       "id": "s-references-107-5",
       "original": "Morioka, G."
      },
      {
       "id": "s-references-107-6",
       "original": "Wang, Y."
      },
      {
       "id": "s-references-107-7",
       "original": "Zhang, A."
      },
      {
       "id": "s-references-107-8",
       "original": "Bapna, A."
      },
      {
       "id": "s-references-107-9",
       "original": "Rosenberg, and B."
      },
      {
       "id": "s-references-107-10",
       "original": "Ramabhadran."
      },
      {
       "id": "s-references-107-11",
       "original": "Virtuoso: Massive multilingual speech-text joint semi-supervised learning for text-tospeech."
      },
      {
       "id": "s-references-107-12",
       "original": "In Proc. of ICASSP, 2023b."
      }
     ]
    },
    {
     "id": "p-references-108",
     "type": "paragraph",
     "page": 34,
     "sentences": [
      {
       "id": "s-references-108-1",
       "original": "S."
      },
      {
       "id": "s-references-108-2",
       "original": "Schneider, A."
      },
      {
       "id": "s-references-108-3",
       "original": "Baevski, R."
      },
      {
       "id": "s-references-108-4",
       "original": "Collobert, and M."
      },
      {
       "id": "s-references-108-5",
       "original": "Auli. wav2vec: Unsupervised pre-training for speech recognition."
      },
      {
       "id": "s-references-108-6",
       "original": "In Proc. of Interspeech, 2019."
      }
     ]
    },
    {
     "id": "p-references-109",
     "type": "paragraph",
     "page": 34,
     "sentences": [
      {
       "id": "s-references-109-1",
       "original": "M."
      },
      {
       "id": "s-references-109-2",
       "original": "Staib, T."
      },
      {
       "id": "s-references-109-3",
       "original": "H."
      },
      {
       "id": "s-references-109-4",
       "original": "Teh, A."
      },
      {
       "id": "s-references-109-5",
       "original": "Torresquintero, D."
      },
      {
       "id": "s-references-109-6",
       "original": "S."
      },
      {
       "id": "s-references-109-7",
       "original": "R."
      },
      {
       "id": "s-references-109-8",
       "original": "Mohan, L."
      },
      {
       "id": "s-references-109-9",
       "original": "Foglianti, R."
      },
      {
       "id": "s-references-109-10",
       "original": "Lenain, and J."
      },
      {
       "id": "s-references-109-11",
       "original": "Gao."
      }
     ]
    },
    {
     "id": "p-references-110",
     "type": "paragraph",
     "page": 34,
     "sentences": [
      {
       "id": "s-references-110-1",
       "original": "Phonological features for 0-shot multilingual speech synthesis."
      },
      {
       "id": "s-references-110-2",
       "original": "In Interspeech, 2020."
      }
     ]
    },
    {
     "id": "p-references-111",
     "type": "paragraph",
     "page": 34,
     "sentences": [
      {
       "id": "s-references-111-1",
       "original": "I."
      },
      {
       "id": "s-references-111-2",
       "original": "Sutskever, O."
      },
      {
       "id": "s-references-111-3",
       "original": "Vinyals, and Q."
      },
      {
       "id": "s-references-111-4",
       "original": "V."
      },
      {
       "id": "s-references-111-5",
       "original": "Le."
      },
      {
       "id": "s-references-111-6",
       "original": "Sequence to sequence learning with neural networks."
      },
      {
       "id": "s-references-111-7",
       "original": "Proc. of NIPS, 2014."
      }
     ]
    },
    {
     "id": "p-references-112",
     "type": "paragraph",
     "page": 34,
     "sentences": [
      {
       "id": "s-references-112-1",
       "original": "X."
      },
      {
       "id": "s-references-112-2",
       "original": "Tan, T."
      },
      {
       "id": "s-references-112-3",
       "original": "Qin, F."
      },
      {
       "id": "s-references-112-4",
       "original": "Soong, and T.-Y."
      },
      {
       "id": "s-references-112-5",
       "original": "Liu."
      },
      {
       "id": "s-references-112-6",
       "original": "A survey on neural speech synthesis. arXiv preprint arXiv:2106.15561, 2021."
      }
     ]
    },
    {
     "id": "p-references-113",
     "type": "paragraph",
     "page": 34,
     "sentences": [
      {
       "id": "s-references-113-1",
       "original": "A."
      },
      {
       "id": "s-references-113-2",
       "original": "Tjandra, D."
      },
      {
       "id": "s-references-113-3",
       "original": "G."
      },
      {
       "id": "s-references-113-4",
       "original": "Choudhury, F."
      },
      {
       "id": "s-references-113-5",
       "original": "Zhang, K."
      },
      {
       "id": "s-references-113-6",
       "original": "Singh, A."
      },
      {
       "id": "s-references-113-7",
       "original": "Conneau, A."
      },
      {
       "id": "s-references-113-8",
       "original": "Baevski, A."
      },
      {
       "id": "s-references-113-9",
       "original": "Sela, Y."
      },
      {
       "id": "s-references-113-10",
       "original": "Saraf, and M."
      },
      {
       "id": "s-references-113-11",
       "original": "Auli."
      },
      {
       "id": "s-references-113-12",
       "original": "Improved language identification through cross-lingual self-supervised learning."
      },
      {
       "id": "s-references-113-13",
       "original": "In ICASSP 2022-2022 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP), pages 6877–6881."
      },
      {
       "id": "s-references-113-14",
       "original": "IEEE, 2022a."
      }
     ]
    },
    {
     "id": "p-references-114",
     "type": "paragraph",
     "page": 34,
     "sentences": [
      {
       "id": "s-references-114-1",
       "original": "A."
      },
      {
       "id": "s-references-114-2",
       "original": "Tjandra, N."
      },
      {
       "id": "s-references-114-3",
       "original": "Singhal, D."
      },
      {
       "id": "s-references-114-4",
       "original": "Zhang, O."
      },
      {
       "id": "s-references-114-5",
       "original": "Kalinli, A."
      },
      {
       "id": "s-references-114-6",
       "original": "Mohamed, D."
      },
      {
       "id": "s-references-114-7",
       "original": "Le, and M."
      },
      {
       "id": "s-references-114-8",
       "original": "L."
      },
      {
       "id": "s-references-114-9",
       "original": "Seltzer."
      },
      {
       "id": "s-references-114-10",
       "original": "Massively multilingual asr on 70 languages: Tokenization, architecture, and generalization capabilities. arXiv, abs/2211.05756, 2022b."
      }
     ]
    },
    {
     "id": "p-references-115",
     "type": "paragraph",
     "page": 34,
     "sentences": [
      {
       "id": "s-references-115-1",
       "original": "S."
      },
      {
       "id": "s-references-115-2",
       "original": "Toshniwal, T."
      },
      {
       "id": "s-references-115-3",
       "original": "N."
      },
      {
       "id": "s-references-115-4",
       "original": "Sainath, R."
      },
      {
       "id": "s-references-115-5",
       "original": "J."
      },
      {
       "id": "s-references-115-6",
       "original": "Weiss, B."
      },
      {
       "id": "s-references-115-7",
       "original": "Li, P."
      },
      {
       "id": "s-references-115-8",
       "original": "Moreno, E."
      },
      {
       "id": "s-references-115-9",
       "original": "Weinstein, and K."
      },
      {
       "id": "s-references-115-10",
       "original": "Rao."
      },
      {
       "id": "s-references-115-11",
       "original": "Multilingual speech recognition with a single end-to-end model."
      },
      {
       "id": "s-references-115-12",
       "original": "In Proc. of ICASSP, 2018."
      }
     ]
    },
    {
     "id": "p-references-116",
     "type": "paragraph",
     "page": 34,
     "sentences": [
      {
       "id": "s-references-116-1",
       "original": "J."
      },
      {
       "id": "s-references-116-2",
       "original": "Valk and T."
      },
      {
       "id": "s-references-116-3",
       "original": "Alumäe."
      },
      {
       "id": "s-references-116-4",
       "original": "Voxlingua107: a dataset for spoken language recognition."
      },
      {
       "id": "s-references-116-5",
       "original": "In Proc. of SLT, 2020."
      }
     ]
    },
    {
     "id": "p-references-117",
     "type": "paragraph",
     "page": 34,
     "sentences": [
      {
       "id": "s-references-117-1",
       "original": "A. van den Oord, Y."
      },
      {
       "id": "s-references-117-2",
       "original": "Li, and O."
      },
      {
       "id": "s-references-117-3",
       "original": "Vinyals."
      },
      {
       "id": "s-references-117-4",
       "original": "Representation learning with contrastive predictive coding."
      }
     ]
    },
    {
     "id": "p-references-118",
     "type": "paragraph",
     "page": 34,
     "sentences": [
      {
       "id": "s-references-118-1",
       "original": "Proc. of NIPS, 2018."
      }
     ]
    },
    {
     "id": "p-references-119",
     "type": "paragraph",
     "page": 34,
     "sentences": [
      {
       "id": "s-references-119-1",
       "original": "A."
      },
      {
       "id": "s-references-119-2",
       "original": "Vaswani, N."
      },
      {
       "id": "s-references-119-3",
       "original": "Shazeer, N."
      },
      {
       "id": "s-references-119-4",
       "original": "Parmar, J."
      },
      {
       "id": "s-references-119-5",
       "original": "Uszkoreit, L."
      },
      {
       "id": "s-references-119-6",
       "original": "Jones, A."
      },
      {
       "id": "s-references-119-7",
       "original": "N."
      },
      {
       "id": "s-references-119-8",
       "original": "Gomez, L."
      },
      {
       "id": "s-references-119-9",
       "original": "Kaiser, and I."
      },
      {
       "id": "s-references-119-10",
       "original": "Polosukhin."
      }
     ]
    },
    {
     "id": "p-references-120",
     "type": "paragraph",
     "page": 34,
     "sentences": [
      {
       "id": "s-references-120-1",
       "original": "Attention is all you need."
      },
      {
       "id": "s-references-120-2",
       "original": "In Proc. of NIPS, 2017."
      }
     ]
    },
    {
     "id": "p-references-121",
     "type": "paragraph",
     "page": 34,
     "sentences": [
      {
       "id": "s-references-121-1",
       "original": "C."
      },
      {
       "id": "s-references-121-2",
       "original": "Wang, M."
      },
      {
       "id": "s-references-121-3",
       "original": "Riviere, A."
      },
      {
       "id": "s-references-121-4",
       "original": "Lee, A."
      },
      {
       "id": "s-references-121-5",
       "original": "Wu, C."
      },
      {
       "id": "s-references-121-6",
       "original": "Talnikar, D."
      },
      {
       "id": "s-references-121-7",
       "original": "Haziza, M."
      },
      {
       "id": "s-references-121-8",
       "original": "Williamson, J."
      },
      {
       "id": "s-references-121-9",
       "original": "Pino, and E."
      },
      {
       "id": "s-references-121-10",
       "original": "Dupoux."
      }
     ]
    },
    {
     "id": "p-references-122",
     "type": "paragraph",
     "page": 34,
     "sentences": [
      {
       "id": "s-references-122-1",
       "original": "VoxPopuli: A large-scale multilingual speech corpus for representation learning, semi-supervised learning and interpretation."
      },
      {
       "id": "s-references-122-2",
       "original": "In Proc. of ACL, 2021."
      }
     ]
    },
    {
     "id": "p-references-123",
     "type": "paragraph",
     "page": 34,
     "sentences": [
      {
       "id": "s-references-123-1",
       "original": "S."
      },
      {
       "id": "s-references-123-2",
       "original": "Watanabe, T."
      },
      {
       "id": "s-references-123-3",
       "original": "Hori, S."
      },
      {
       "id": "s-references-123-4",
       "original": "Karita, T."
      },
      {
       "id": "s-references-123-5",
       "original": "Hayashi, J."
      },
      {
       "id": "s-references-123-6",
       "original": "Nishitoba, Y."
      },
      {
       "id": "s-references-123-7",
       "original": "Unno, N."
      },
      {
       "id": "s-references-123-8",
       "original": "Enrique Yalta Soplin, J."
      },
      {
       "id": "s-references-123-9",
       "original": "Heymann, M."
      },
      {
       "id": "s-references-123-10",
       "original": "Wiesner, N."
      },
      {
       "id": "s-references-123-11",
       "original": "Chen, A."
      },
      {
       "id": "s-references-123-12",
       "original": "Renduchintala, and T."
      },
      {
       "id": "s-references-123-13",
       "original": "Ochiai."
      },
      {
       "id": "s-references-123-14",
       "original": "ESPnet: End-to-end speech processing toolkit."
      },
      {
       "id": "s-references-123-15",
       "original": "In Proceedings of Interspeech, pages 2207–2211, 2018. doi: 10.21437/ Interspeech.2018-1456."
      },
      {
       "id": "s-references-123-16",
       "original": "URL http://dx.doi.org/10.21437/Interspeech.2018-1456."
      }
     ]
    },
    {
     "id": "p-references-124",
     "type": "paragraph",
     "page": 34,
     "sentences": [
      {
       "id": "s-references-124-1",
       "original": "J."
      },
      {
       "id": "s-references-124-2",
       "original": "Wells."
      },
      {
       "id": "s-references-124-3",
       "original": "Computer-coding the ipa: a proposed extension of sampa, 1995."
      },
      {
       "id": "s-references-124-4",
       "original": "URL https://www.phon."
      }
     ]
    },
    {
     "id": "p-references-125",
     "type": "paragraph",
     "page": 34,
     "sentences": [
      {
       "id": "s-references-125-1",
       "original": "ucl.ac.uk/home/sampa/x-sampa.htm."
      }
     ]
    },
    {
     "id": "p-references-126",
     "type": "paragraph",
     "page": 34,
     "sentences": [
      {
       "id": "s-references-126-1",
       "original": "Y.-Y."
      },
      {
       "id": "s-references-126-2",
       "original": "Yang, M."
      },
      {
       "id": "s-references-126-3",
       "original": "Hira, Z."
      },
      {
       "id": "s-references-126-4",
       "original": "Ni, A."
      },
      {
       "id": "s-references-126-5",
       "original": "Chourdia, A."
      },
      {
       "id": "s-references-126-6",
       "original": "Astafurov, C."
      },
      {
       "id": "s-references-126-7",
       "original": "Chen, C.-F."
      },
      {
       "id": "s-references-126-8",
       "original": "Yeh, C."
      },
      {
       "id": "s-references-126-9",
       "original": "Puhrsch, D."
      },
      {
       "id": "s-references-126-10",
       "original": "Pollack, D."
      },
      {
       "id": "s-references-126-11",
       "original": "Genzel, D."
      },
      {
       "id": "s-references-126-12",
       "original": "Greenberg, E."
      },
      {
       "id": "s-references-126-13",
       "original": "Z."
      },
      {
       "id": "s-references-126-14",
       "original": "Yang, J."
      },
      {
       "id": "s-references-126-15",
       "original": "Lian, J."
      },
      {
       "id": "s-references-126-16",
       "original": "Mahadeokar, J."
      },
      {
       "id": "s-references-126-17",
       "original": "Hwang, J."
      },
      {
       "id": "s-references-126-18",
       "original": "Chen, P."
      },
      {
       "id": "s-references-126-19",
       "original": "Goldsborough, P."
      },
      {
       "id": "s-references-126-20",
       "original": "Roy, S."
      },
      {
       "id": "s-references-126-21",
       "original": "Narenthiran, S."
      },
      {
       "id": "s-references-126-22",
       "original": "Watanabe, S."
      },
      {
       "id": "s-references-126-23",
       "original": "Chintala, V."
      },
      {
       "id": "s-references-126-24",
       "original": "Quenneville-Bélair, and Y."
      },
      {
       "id": "s-references-126-25",
       "original": "Shi."
      },
      {
       "id": "s-references-126-26",
       "original": "Torchaudio: Building blocks for audio and speech processing. arXiv preprint arXiv:2110.15018, 2021."
      }
     ]
    },
    {
     "id": "p-references-127",
     "type": "paragraph",
     "page": 34,
     "sentences": [
      {
       "id": "s-references-127-1",
       "original": "S.-Y."
      },
      {
       "id": "s-references-127-2",
       "original": "Yoon, K.-Y."
      },
      {
       "id": "s-references-127-3",
       "original": "Kim, and R."
      },
      {
       "id": "s-references-127-4",
       "original": "Sproat."
      },
      {
       "id": "s-references-127-5",
       "original": "Multilingual transliteration using feature based phonetic method."
      },
      {
       "id": "s-references-127-6",
       "original": "In Proc. of ACL, 2007."
      }
     ]
    },
    {
     "id": "p-references-128",
     "type": "paragraph",
     "page": 35,
     "sentences": [
      {
       "id": "s-references-128-1",
       "original": "Y."
      },
      {
       "id": "s-references-128-2",
       "original": "Zhang, R."
      },
      {
       "id": "s-references-128-3",
       "original": "J."
      },
      {
       "id": "s-references-128-4",
       "original": "Weiss, H."
      },
      {
       "id": "s-references-128-5",
       "original": "Zen, Y."
      },
      {
       "id": "s-references-128-6",
       "original": "Wu, Z."
      },
      {
       "id": "s-references-128-7",
       "original": "Chen, R."
      },
      {
       "id": "s-references-128-8",
       "original": "Skerry-Ryan, Y."
      },
      {
       "id": "s-references-128-9",
       "original": "Jia, A."
      },
      {
       "id": "s-references-128-10",
       "original": "Rosenberg, and B."
      },
      {
       "id": "s-references-128-11",
       "original": "Ramabhadran."
      },
      {
       "id": "s-references-128-12",
       "original": "Learning to speak fluently in a foreign language: Multilingual speech synthesis and cross-language voice cloning."
      },
      {
       "id": "s-references-128-13",
       "original": "In Interspeech, 2019."
      }
     ]
    },
    {
     "id": "p-references-129",
     "type": "paragraph",
     "page": 35,
     "sentences": [
      {
       "id": "s-references-129-1",
       "original": "Y."
      },
      {
       "id": "s-references-129-2",
       "original": "Zhang, W."
      },
      {
       "id": "s-references-129-3",
       "original": "Han, J."
      },
      {
       "id": "s-references-129-4",
       "original": "Qin, Y."
      },
      {
       "id": "s-references-129-5",
       "original": "Wang, A."
      },
      {
       "id": "s-references-129-6",
       "original": "Bapna, Z."
      },
      {
       "id": "s-references-129-7",
       "original": "Chen, N."
      },
      {
       "id": "s-references-129-8",
       "original": "Chen, B."
      },
      {
       "id": "s-references-129-9",
       "original": "Li, V."
      },
      {
       "id": "s-references-129-10",
       "original": "Axelrod, G."
      },
      {
       "id": "s-references-129-11",
       "original": "Wang, Z."
      },
      {
       "id": "s-references-129-12",
       "original": "Meng, K."
      },
      {
       "id": "s-references-129-13",
       "original": "Hu, A."
      },
      {
       "id": "s-references-129-14",
       "original": "Rosenberg, R."
      },
      {
       "id": "s-references-129-15",
       "original": "Prabhavalkar, D."
      },
      {
       "id": "s-references-129-16",
       "original": "S."
      },
      {
       "id": "s-references-129-17",
       "original": "Park, P."
      },
      {
       "id": "s-references-129-18",
       "original": "Haghani, J."
      },
      {
       "id": "s-references-129-19",
       "original": "Riesa, G."
      },
      {
       "id": "s-references-129-20",
       "original": "Perng, H."
      },
      {
       "id": "s-references-129-21",
       "original": "Soltau, T."
      },
      {
       "id": "s-references-129-22",
       "original": "Strohman, B."
      },
      {
       "id": "s-references-129-23",
       "original": "Ramabhadran, T."
      },
      {
       "id": "s-references-129-24",
       "original": "Sainath, P."
      },
      {
       "id": "s-references-129-25",
       "original": "Moreno, C.-C."
      },
      {
       "id": "s-references-129-26",
       "original": "Chiu, J."
      },
      {
       "id": "s-references-129-27",
       "original": "Schalkwyk, F."
      },
      {
       "id": "s-references-129-28",
       "original": "Beaufays, and Y."
      },
      {
       "id": "s-references-129-29",
       "original": "Wu."
      },
      {
       "id": "s-references-129-30",
       "original": "Google usm: Scaling automatic speech recognition beyond 100 languages. arXiv, 2023a."
      }
     ]
    },
    {
     "id": "p-references-130",
     "type": "paragraph",
     "page": 35,
     "sentences": [
      {
       "id": "s-references-130-1",
       "original": "Z."
      },
      {
       "id": "s-references-130-2",
       "original": "Zhang, L."
      },
      {
       "id": "s-references-130-3",
       "original": "Zhou, C."
      },
      {
       "id": "s-references-130-4",
       "original": "Wang, S."
      },
      {
       "id": "s-references-130-5",
       "original": "Chen, Y."
      },
      {
       "id": "s-references-130-6",
       "original": "Wu, S."
      },
      {
       "id": "s-references-130-7",
       "original": "Liu, Z."
      },
      {
       "id": "s-references-130-8",
       "original": "Chen, Y."
      },
      {
       "id": "s-references-130-9",
       "original": "Liu, H."
      },
      {
       "id": "s-references-130-10",
       "original": "Wang, J."
      },
      {
       "id": "s-references-130-11",
       "original": "Li, L."
      },
      {
       "id": "s-references-130-12",
       "original": "He, S."
      },
      {
       "id": "s-references-130-13",
       "original": "Zhao, and F."
      },
      {
       "id": "s-references-130-14",
       "original": "Wei."
      },
      {
       "id": "s-references-130-15",
       "original": "Speak foreign languages with your own voice: Cross-lingual neural codec language modeling. arXiv, abs/2303.03926, 2023b."
      }
     ]
    }
   ]
  },
  {
   "id": "sec-appendices",
   "num": null,
   "level": 1,
   "page": 36,
   "title": {
    "original": "Appendices",
    "zh": "附录"
   },
   "blocks": []
  },
  {
   "id": "sec-A",
   "num": "A",
   "level": 1,
   "page": 36,
   "title": {
    "original": "Forced Alignment",
    "zh": "强制对齐"
   },
   "blocks": [
    {
     "id": "p-A-1",
     "type": "paragraph",
     "page": 36,
     "sentences": [
      {
       "id": "s-A-1-1",
       "original": "Given an input audio sequence X = (x1, ..., xN), where N is the number of frames, a CTC alignment model produces an output sequence Y = (y1, ..., yT) of length T, where yt denotes the posterior probability distribution over an alphabet A and blank token ⟨b⟩.",
       "zh": "给定输入音频序列 X = (x1, ..., xN)，其中 N 为帧数，一个 CTC 对齐模型产生长度为 T 的输出序列 Y = (y1, ..., yT)，其中 yt 表示在字母表 A 和空白词元 ⟨b⟩ 上的后验概率分布。"
      },
      {
       "id": "s-A-1-2",
       "original": "Let B denote the collapsing function of CTC which collapses all repeating symbols and which removes all blanks for a given sequence.",
       "zh": "令 B 表示 CTC 的坍缩函数，它对一个给定序列合并所有重复符号并移除所有空白。"
      },
      {
       "id": "s-A-1-3",
       "original": "An alignment path π = π1, ..., πT in CTC for a given target label of length M, L = (l1, ..., lM) where πt ∈A ∪{⟨b⟩} and li ∈A should satisfy B(π) = L.",
       "zh": "对于长度为 M 的给定目标标签 L = (l1, ..., lM)，CTC 中的一条对齐路径 π = π1, ..., πT（其中 πt ∈ A ∪ {⟨b⟩} 且 li ∈ A）应满足 B(π) = L。"
      }
     ]
    },
    {
     "id": "p-A-2",
     "type": "paragraph",
     "page": 36,
     "sentences": [
      {
       "id": "s-A-2-1",
       "original": "Among the all the alignment paths which can be collapsed to the given target label L, forced alignment computes the best alignment path ˆπ which maximizes the probability under the posterior distribution given by the acoustic model.",
       "zh": "在所有能坍缩为给定目标标签 L 的对齐路径中，强制对齐计算最优对齐路径 π̂，它在声学模型给出的后验分布下使概率最大化。"
      }
     ]
    },
    {
     "id": "eq-A-1",
     "type": "equation",
     "page": 36,
     "original": "ˆπ = arg max π∈B−1(L) P(π|X) (2)",
     "zh": "π̂ = arg max π∈B−1(L) P(π|X) (2)"
    },
    {
     "id": "p-A-3",
     "type": "paragraph",
     "page": 36,
     "sentences": [
      {
       "id": "s-A-3-1",
       "original": "CTC assumes every output is conditionally independent of the other outputs given the input.",
       "zh": "CTC 假设给定输入时，每个输出与其他输出条件独立。"
      },
      {
       "id": "s-A-3-2",
       "original": "We have",
       "zh": "我们有"
      }
     ]
    },
    {
     "id": "eq-A-2",
     "type": "equation",
     "page": 36,
     "original": "t=1 P(πt|t, X) =",
     "zh": "t=1 P(πt|t, X) ="
    },
    {
     "id": "eq-A-3",
     "type": "equation",
     "page": 36,
     "original": "T Y",
     "zh": "T Y"
    },
    {
     "id": "eq-A-4",
     "type": "equation",
     "page": 36,
     "original": "P(π|X) =",
     "zh": "P(π|X) ="
    },
    {
     "id": "eq-A-5",
     "type": "equation",
     "page": 36,
     "original": "T Y",
     "zh": "T Y"
    },
    {
     "id": "eq-A-6",
     "type": "equation",
     "page": 36,
     "original": "t=1 yt πt (3)",
     "zh": "t=1 yt πt (3)"
    },
    {
     "id": "p-A-4",
     "type": "paragraph",
     "page": 36,
     "sentences": [
      {
       "id": "s-A-4-1",
       "original": "Equation 2 can be computed efficiently using dynamic programming and backtracking.",
       "zh": "公式 2 可以使用动态规划和回溯高效计算。"
      },
      {
       "id": "s-A-4-2",
       "original": "An efficient version of this algorithm is implemented in flashlight [Kahn et al., 2022] on CPU.",
       "zh": "该算法的一个高效版本在 flashlight [Kahn et al., 2022] 中以 CPU 实现。"
      },
      {
       "id": "s-A-4-3",
       "original": "We implement a parallel version on CUDA, incorporating memory optimizations that offload memory to CPU, allowing it to process long audio files efficiently as shown in Algorithm 1.",
       "zh": "我们在 CUDA 上实现了一个并行版本，并结合将内存卸载到 CPU 的内存优化，使其能高效处理长音频文件，如算法 1 所示。"
      }
     ]
    },
    {
     "id": "p-A-5",
     "type": "paragraph",
     "page": 36,
     "sentences": [
      {
       "id": "s-A-5-1",
       "original": "Algorithm 1 Pseudo code of our CTC Forced Alignment algorithm on GPU Input: Posterior probabilities y, target label L Output: Alignment path π 1: S ←2 × |L| + 1 2: Create GPU matrices αodd, αeven of size S each to store the maximum log probability of aligning the target upto the given node 3: B ←100; # buffer size for data copy from GPU to CPU 4: Create CPU matrix β of size T × S for saving the label indices from previous time step used to compute αodd/αeven 5: Create GPU matrix βbuffer of size B × S, where B is the buffer size, to store the values of β temporarily in a buffer before being copied to CPU. 6: for t = 1, . . . , T do 7: for all l = 1, . . . , S do in parallel 8: If t is odd, update αodd[l] based on αeven, yt using dynamic programming and vice-versa 9: Store the index l′ from previous time step used to update αodd/αeven in βbuffer 10: end for 11: if t % B == 0 or t == T then 12: Copy βbuffer to CPU matrix β asynchronously 13: end if 14: end for 15: Backtrack and compute π from αodd, αeven and β",
       "zh": "算法 1 我们在 GPU 上的 CTC 强制对齐算法伪代码 输入：后验概率 y，目标标签 L 输出：对齐路径 π 1: S ← 2 × |L| + 1 2: 创建大小各为 S 的 GPU 矩阵 αodd、αeven，用于存储将目标对齐到给定节点的最大对数概率 3: B ← 100；# 从 GPU 拷贝数据到 CPU 的缓冲区大小 4: 创建大小为 T × S 的 CPU 矩阵 β，用于保存上一步用于计算 αodd/αeven 的标签索引 5: 创建大小为 B × S 的 GPU 矩阵 βbuffer，其中 B 为缓冲区大小，用于在拷贝到 CPU 之前将 β 的值暂存于缓冲区。6: for t = 1, . . . , T do 7: 对所有 l = 1, . . . , S 并行执行 8: 若 t 为奇数，则基于 αeven、yt 用动态规划更新 αodd[l]，反之亦然 9: 将上一步用于更新 αodd/αeven 的索引 l′ 存入 βbuffer 10: end for 11: if t % B == 0 或 t == T then 12: 将 βbuffer 异步拷贝到 CPU 矩阵 β 13: end if 14: end for 15: 回溯并从 αodd、αeven 和 β 计算 π"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-relationship-to-other-alignment-",
   "num": null,
   "level": 2,
   "page": 36,
   "title": {
    "original": "Relationship to Other Alignment Generation Approaches.",
    "zh": "与其他对齐生成方法的关系"
   },
   "blocks": [
    {
     "id": "p-relationship-to-other-alignment--1",
     "type": "paragraph",
     "page": 36,
     "sentences": [
      {
       "id": "s-relationship-to-other-alignment--1-1",
       "original": "For dealing with noisy transcripts, a commonly used alternative to forced alignment is as follows [Povey et al., 2011]: first segment the audio into shorter segments that can be input to an acoustic model composed with a language model and generate a transcription for each segment.32 Then align the generated transcription with the original text to determine the audio segment for each word.",
       "zh": "对于处理有噪声的转写，一种常用的强制对齐替代方法如下 [Povey et al., 2011]：首先将音频切分为可输入声学模型（与语言模型组合）的较短片段，并为每个片段生成转写。32 然后将生成的转写与原始文本对齐，以确定每个词对应的音频片段。"
      },
      {
       "id": "s-relationship-to-other-alignment--1-2",
       "original": "If the generated transcriptions cannot be well aligned, then these segments are discarded.",
       "zh": "如果生成的转写无法很好地对齐，则丢弃这些片段。"
      }
     ]
    },
    {
     "id": "p-relationship-to-other-alignment--2",
     "type": "paragraph",
     "page": 36,
     "sentences": [
      {
       "id": "s-relationship-to-other-alignment--2-1",
       "original": "32https://github.com/mozilla/DSAlign The advantage of this approach is that it enables alignment when the audio and the text do not correspond entirely to each other.",
       "zh": "32https://github.com/mozilla/DSAlign 这种方法的优点是，它使音频与文本并不完全对应时也能进行对齐。"
      },
      {
       "id": "s-relationship-to-other-alignment--2-2",
       "original": "However, the alignments are performed on a segment per segment basis, whereas our forced alignment process performs a global alignment taking the entire sequence into account.",
       "zh": "然而，对齐是逐片段进行的，而我们的强制对齐过程执行的是考虑整个序列的全局对齐。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-B",
   "num": "B",
   "level": 1,
   "page": 37,
   "title": {
    "original": "n-gram Language Models",
    "zh": "n 元语言模型"
   },
   "blocks": [
    {
     "id": "p-B-1",
     "type": "paragraph",
     "page": 37,
     "sentences": [
      {
       "id": "s-B-1-1",
       "original": "We train 5-gram language models on Common Crawl data using KenLM [Heafield, 2011] for each language in FLEURS.",
       "zh": "我们使用 KenLM [Heafield, 2011] 在 Common Crawl 数据上为 FLEURS 中的每种语言训练 5 元语言模型。"
      },
      {
       "id": "s-B-1-2",
       "original": "For languages that do not use spaces to separate words, we train 20-gram character-level language models.",
       "zh": "对于不使用空格分词的语言，我们训练 20 元字符级语言模型。"
      },
      {
       "id": "s-B-1-3",
       "original": "These languages are Mandarin Chinese (cmn), Cantonese Chinese (yue), Japanese (jpn), Thai (tha), Lao (lao), Burmese (mya) and Khmer (khm).",
       "zh": "这些语言是汉语普通话（cmn）、粤语（yue）、日语（jpn）、泰语（tha）、老挝语（lao）、缅甸语（mya）和高棉语（khm）。"
      },
      {
       "id": "s-B-1-4",
       "original": "The text is preprocessed following § 3.1.2 and we also remove emojis.33.",
       "zh": "文本按 §3.1.2 进行预处理，我们还移除表情符号。33。"
      }
     ]
    },
    {
     "id": "p-B-2",
     "type": "paragraph",
     "page": 37,
     "sentences": [
      {
       "id": "s-B-2-1",
       "original": "For word-level models, we limit the training data to 40GB and select the 250K most-frequent words as the vocabulary.",
       "zh": "对词级模型，我们将训练数据限制为 40GB，并选择 250K 个最高频词作为词表。"
      },
      {
       "id": "s-B-2-2",
       "original": "For character-level models, we limit the training data to 6GB.",
       "zh": "对字符级模型，我们将训练数据限制为 6GB。"
      },
      {
       "id": "s-B-2-3",
       "original": "We provide example commands used for training the LMs below:",
       "zh": "我们在下方给出训练语言模型所用的示例命令："
      }
     ]
    },
    {
     "id": "p-B-3",
     "type": "paragraph",
     "page": 37,
     "sentences": [
      {
       "id": "s-B-3-1",
       "original": "# word-level LM > kenlm/build/bin/lmplz –prune 1 2 3 4 5 -o 5 –limit_vocab_file vocab.txt -S 90% -T /tmp/ < input.txt > output.arpa 34 # character-level LM > kenlm/build/bin/lmplz –prune 0 0 0 0 0 1 1 1 2 3 -o 20 trie -S 90% -T /tmp/ < input.txt > output.arpa For n-gram models trained on the FLEURS training data transcriptions, we build 15-gram character level language models without any pruning on all languages in FLEURS.",
       "zh": "# 词级语言模型 > kenlm/build/bin/lmplz –prune 1 2 3 4 5 -o 5 –limit_vocab_file vocab.txt -S 90% -T /tmp/ < input.txt > output.arpa 34 # 字符级语言模型 > kenlm/build/bin/lmplz –prune 0 0 0 0 0 1 1 1 2 3 -o 20 trie -S 90% -T /tmp/ < input.txt > output.arpa 对在 FLEURS 训练数据转写上训练的 n 元模型，我们在 FLEURS 的所有语言上构建不做任何剪枝的 15 元字符级语言模型。"
      },
      {
       "id": "s-B-3-2",
       "original": "For the comparison with Whisper, we only use the Common Crawl language models.",
       "zh": "在与 Whisper 的对比中，我们只使用 Common Crawl 语言模型。"
      }
     ]
    },
    {
     "id": "p-B-4",
     "type": "paragraph",
     "page": 37,
     "sentences": [
      {
       "id": "s-B-4-1",
       "original": "We use the CTC beam-search decoder from the Flashlight [Kahn et al., 2022] library for decoding our models.",
       "zh": "我们使用 Flashlight [Kahn et al., 2022] 库中的 CTC 束搜索解码器来解码我们的模型。"
      },
      {
       "id": "s-B-4-2",
       "original": "For decoding with word-level LMs, we use the lexicon-based decoder of Collobert et al. [2016], Pratap et al. [2019] and for character-level LMs, we use the lexicon-free beam-search decoder of Likhomanenko et al. [2019].",
       "zh": "使用词级语言模型解码时，我们使用 Collobert et al. [2016], Pratap et al. [2019] 的基于词典的解码器；使用字符级语言模型时，我们使用 Likhomanenko et al. [2019] 的无词典束搜索解码器。"
      },
      {
       "id": "s-B-4-3",
       "original": "We tune the language model weight and word insertion penalty on the validation set to select the best hyperparameters for decoding the test set.",
       "zh": "我们在验证集上调优语言模型权重和词插入惩罚，以选择解码测试集的最佳超参数。"
      }
     ]
    },
    {
     "id": "p-B-5",
     "type": "paragraph",
     "page": 37,
     "sentences": [
      {
       "id": "s-B-5-1",
       "original": "33https://stackoverflow.com/a/33417311 34We use –prune 1 1 2 3 4 if data size < 5GB and additionally use –discount_fallback if data size < 1GB",
       "zh": "33https://stackoverflow.com/a/33417311 34若数据大小 < 5GB 我们使用 –prune 1 1 2 3 4，若数据大小 < 1GB 还额外使用 –discount_fallback"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-C",
   "num": "C",
   "level": 1,
   "page": 38,
   "title": {
    "original": "Comparison to Whisper",
    "zh": "与 Whisper 的对比"
   },
   "blocks": [
    {
     "id": "p-C-1",
     "type": "paragraph",
     "page": 38,
     "sentences": [
      {
       "id": "s-C-1-1",
       "original": "Table A1 shows a breakdown of the results into individual languages and Table A2 shows results with and without CC LM n-gram language models.",
       "zh": "表 A1 给出按语言细分的结果，表 A2 给出使用与不使用 CC LM n 元语言模型的结果。"
      }
     ]
    },
    {
     "id": "p-C-2",
     "type": "paragraph",
     "page": 38,
     "sentences": [
      {
       "id": "s-C-2-1",
       "original": "Whisper Whisper medium large-v2 L-61 L-61 L-61 L-61 L-1107 L-1107 L-1107 L-1107 noLM noLM noLM noLM LSAH LSAH LSAH LSAH Amharic 229.3 140.3 48.7 30.7 52.4 32.5 52.9 30.1 53.3 31.1 Arabic 20.4 16.0 34.9 19.6 35.8 19.9 44.0 23.4 41.3 21.0 Assamese 102.3 106.2 29.5 18.8 28.4 18.6 37.6 21.2 30.5 19.2 Azerbaijani 33.1 23.4 40.7 21.3 38.3 19.8 45.0 21.2 40.1 19.1 Bengali 100.6 104.1 19.7 11.6 20.0 12.1 25.0 12.5 23.5 12.1 Bulgarian 21.4 14.6 23.4 13.1 23.9 13.3 27.9 12.9 25.5 13.5 Burmese 123.0 115.7 22.2 14.2 22.3 14.5 29.2 20.2 24.5 16.0 Catalan 9.6 7.3 18.1 11.0 18.1 11.0 25.9 11.5 20.1 10.8 Dutch 9.9 6.7 26.9 13.7 26.4 14.3 38.1 14.9 27.6 14.5 English 4.4 4.2 23.8 10.7 24.8 11.8 38.8 12.2 27.8 12.3 Filipino 19.1 13.8 19.3 11.9 19.4 12.2 26.2 13.5 20.2 12.4 Finnish 13.9 9.7 26.4 22.5 26.9 23.1 32.3 22.2 28.8 23.1 French 8.7 8.3 24.3 13.7 24.5 14.1 35.8 15.4 29.3 15.0 German 6.5 4.5 22.5 13.2 22.3 13.7 38.4 13.1 22.5 13.3 Greek 19.0 12.5 40.8 14.0 40.5 13.6 57.5 13.0 40.1 13.6 Gujarati 104.8 102.7 23.0 13.0 22.7 12.8 73.9 56.4 24.0 12.8 Hausa 106.6 88.9 35.9 26.7 36.3 27.3 40.4 26.7 38.3 26.4 Hebrew 33.1 27.1 68.5 44.8 66.6 41.5 78.7 50.9 67.1 40.0 Hindi 26.8 21.5 65.0 44.4 28.8 16.0 70.7 45.7 21.2 10.6 Hungarian 24.3 17.0 31.2 18.1 30.7 18.4 40.3 18.3 30.7 18.0 Icelandic 49.9 38.2 42.9 18.3 42.3 19.9 53.6 20.5 45.3 18.6 Indonesian 10.2 7.1 25.5 11.7 23.8 12.1 31.9 11.6 23.4 11.8 Javanese 67.9 68.5 32.8 19.6 32.8 20.0 58.8 27.2 34.2 19.5 Kannada 77.7 37.0 18.8 14.4 15.8 12.9 41.3 25.2 17.7 13.3 Kazakh 48.8 37.7 30.2 17.4 30.2 17.7 63.8 19.5 31.6 17.4 Khmer 103.8 128.9 26.0 19.9 25.7 19.8 70.7 52.4 26.7 19.7 Korean 16.4 14.3 58.7 37.5 59.9 37.3 82.1 58.2 68.3 40.1 Lao 101.4 101.5 48.9 45.4 24.2 22.8 62.1 56.6 22.6 16.9 Latvian 32.0 23.1 20.8 12.0 20.9 12.1 24.5 11.9 21.8 12.1 Malay 12.2 8.7 25.3 12.3 25.9 13.2 32.4 12.1 26.1 12.5 Malayalam 101.1 100.7 23.7 19.1 19.5 16.6 39.1 25.6 20.4 15.3 Marathi 63.2 38.3 32.5 19.0 19.2 13.5 28.0 14.9 20.9 13.4 Mongolian 103.7 110.5 55.7 29.3 54.9 32.9 67.7 28.7 55.3 32.3 Persian 41.0 32.9 39.7 22.9 39.9 22.5 44.4 21.3 42.9 22.0 Polish 8.0 5.4 21.5 11.4 20.8 11.6 33.0 11.0 25.1 11.3 Portuguese 5.0 4.3 16.1 10.8 16.3 10.8 19.3 10.2 17.7 10.5 Punjabi 102.0 102.4 41.4 29.9 30.4 20.7 99.0 91.0 31.0 19.8 Romanian 20.0 14.4 27.9 18.8 28.4 19.1 31.3 17.8 27.4 18.3 Russian 7.2 5.6 30.3 14.6 30.4 14.3 38.8 14.7 35.0 15.0 Shona 143.9 121.0 38.1 30.4 37.7 30.1 43.0 29.9 37.8 29.6 Somali 104.0 102.9 51.8 42.8 52.5 43.0 54.5 42.9 53.8 42.8 Spanish 3.6 3.0 12.2 7.8 12.4 8.2 14.0 7.8 14.0 8.7 Swahili 52.8 39.3 22.9 16.0 23.3 15.6 29.6 16.8 23.7 16.0 Swedish 11.2 8.5 29.9 17.4 30.5 17.5 38.2 17.2 33.5 17.4 Tajik 74.0 85.8 59.8 46.6 33.9 19.2 59.0 39.5 25.7 15.7 Tamil 23.1 17.5 24.2 18.3 21.9 16.3 25.3 17.3 23.9 16.3 Telugu 82.8 99.0 19.4 13.7 19.6 13.7 24.5 15.8 22.1 13.6 Thai 15.4 11.5 18.2 13.6 18.1 13.6 27.6 18.8 20.7 14.3 Turkish 10.4 8.4 28.6 17.3 28.7 17.5 31.2 16.1 30.9 16.9 Ukrainian 11.6 8.6 31.1 13.6 31.7 13.5 39.2 13.3 33.3 13.6 Urdu 28.2 22.6 42.3 22.7 33.1 20.1 46.4 25.1 36.9 20.5 Vietnamese 12.7 10.3 44.5 18.6 47.5 20.7 56.6 21.0 52.9 19.8 Welsh 40.8 33.0 48.9 20.8 49.0 20.8 54.9 21.4 51.4 20.9 Yoruba 105.1 94.8 61.2 49.7 61.9 49.4 62.7 50.2 64.2 49.4 50.1 44.3 33.3 20.7 31.0 19.1 44.2 24.8 32.5 18.7 Table A1: Comparison to Whisper on the FLEURS test set.",
       "zh": "Whisper Whisper medium large-v2 L-61 L-61 L-61 L-61 L-1107 L-1107 L-1107 L-1107 noLM noLM noLM noLM LSAH LSAH LSAH LSAH 阿姆哈拉语 229.3 140.3 48.7 30.7 52.4 32.5 52.9 30.1 53.3 31.1 阿拉伯语 20.4 16.0 34.9 19.6 35.8 19.9 44.0 23.4 41.3 21.0 阿萨姆语 102.3 106.2 29.5 18.8 28.4 18.6 37.6 21.2 30.5 19.2 阿塞拜疆语 33.1 23.4 40.7 21.3 38.3 19.8 45.0 21.2 40.1 19.1 孟加拉语 100.6 104.1 19.7 11.6 20.0 12.1 25.0 12.5 23.5 12.1 保加利亚语 21.4 14.6 23.4 13.1 23.9 13.3 27.9 12.9 25.5 13.5 缅甸语 123.0 115.7 22.2 14.2 22.3 14.5 29.2 20.2 24.5 16.0 加泰罗尼亚语 9.6 7.3 18.1 11.0 18.1 11.0 25.9 11.5 20.1 10.8 荷兰语 9.9 6.7 26.9 13.7 26.4 14.3 38.1 14.9 27.6 14.5 英语 4.4 4.2 23.8 10.7 24.8 11.8 38.8 12.2 27.8 12.3 菲律宾语 19.1 13.8 19.3 11.9 19.4 12.2 26.2 13.5 20.2 12.4 芬兰语 13.9 9.7 26.4 22.5 26.9 23.1 32.3 22.2 28.8 23.1 法语 8.7 8.3 24.3 13.7 24.5 14.1 35.8 15.4 29.3 15.0 德语 6.5 4.5 22.5 13.2 22.3 13.7 38.4 13.1 22.5 13.3 希腊语 19.0 12.5 40.8 14.0 40.5 13.6 57.5 13.0 40.1 13.6 古吉拉特语 104.8 102.7 23.0 13.0 22.7 12.8 73.9 56.4 24.0 12.8 豪萨语 106.6 88.9 35.9 26.7 36.3 27.3 40.4 26.7 38.3 26.4 希伯来语 33.1 27.1 68.5 44.8 66.6 41.5 78.7 50.9 67.1 40.0 印地语 26.8 21.5 65.0 44.4 28.8 16.0 70.7 45.7 21.2 10.6 匈牙利语 24.3 17.0 31.2 18.1 30.7 18.4 40.3 18.3 30.7 18.0 冰岛语 49.9 38.2 42.9 18.3 42.3 19.9 53.6 20.5 45.3 18.6 印尼语 10.2 7.1 25.5 11.7 23.8 12.1 31.9 11.6 23.4 11.8 爪哇语 67.9 68.5 32.8 19.6 32.8 20.0 58.8 27.2 34.2 19.5 卡纳达语 77.7 37.0 18.8 14.4 15.8 12.9 41.3 25.2 17.7 13.3 哈萨克语 48.8 37.7 30.2 17.4 30.2 17.7 63.8 19.5 31.6 17.4 高棉语 103.8 128.9 26.0 19.9 25.7 19.8 70.7 52.4 26.7 19.7 韩语 16.4 14.3 58.7 37.5 59.9 37.3 82.1 58.2 68.3 40.1 老挝语 101.4 101.5 48.9 45.4 24.2 22.8 62.1 56.6 22.6 16.9 拉脱维亚语 32.0 23.1 20.8 12.0 20.9 12.1 24.5 11.9 21.8 12.1 马来语 12.2 8.7 25.3 12.3 25.9 13.2 32.4 12.1 26.1 12.5 马拉雅拉姆语 101.1 100.7 23.7 19.1 19.5 16.6 39.1 25.6 20.4 15.3 马拉地语 63.2 38.3 32.5 19.0 19.2 13.5 28.0 14.9 20.9 13.4 蒙古语 103.7 110.5 55.7 29.3 54.9 32.9 67.7 28.7 55.3 32.3 波斯语 41.0 32.9 39.7 22.9 39.9 22.5 44.4 21.3 42.9 22.0 波兰语 8.0 5.4 21.5 11.4 20.8 11.6 33.0 11.0 25.1 11.3 葡萄牙语 5.0 4.3 16.1 10.8 16.3 10.8 19.3 10.2 17.7 10.5 旁遮普语 102.0 102.4 41.4 29.9 30.4 20.7 99.0 91.0 31.0 19.8 罗马尼亚语 20.0 14.4 27.9 18.8 28.4 19.1 31.3 17.8 27.4 18.3 俄语 7.2 5.6 30.3 14.6 30.4 14.3 38.8 14.7 35.0 15.0 绍纳语 143.9 121.0 38.1 30.4 37.7 30.1 43.0 29.9 37.8 29.6 索马里语 104.0 102.9 51.8 42.8 52.5 43.0 54.5 42.9 53.8 42.8 西班牙语 3.6 3.0 12.2 7.8 12.4 8.2 14.0 7.8 14.0 8.7 斯瓦希里语 52.8 39.3 22.9 16.0 23.3 15.6 29.6 16.8 23.7 16.0 瑞典语 11.2 8.5 29.9 17.4 30.5 17.5 38.2 17.2 33.5 17.4 塔吉克语 74.0 85.8 59.8 46.6 33.9 19.2 59.0 39.5 25.7 15.7 泰米尔语 23.1 17.5 24.2 18.3 21.9 16.3 25.3 17.3 23.9 16.3 泰卢固语 82.8 99.0 19.4 13.7 19.6 13.7 24.5 15.8 22.1 13.6 泰语 15.4 11.5 18.2 13.6 18.1 13.6 27.6 18.8 20.7 14.3 土耳其语 10.4 8.4 28.6 17.3 28.7 17.5 31.2 16.1 30.9 16.9 乌克兰语 11.6 8.6 31.1 13.6 31.7 13.5 39.2 13.3 33.3 13.6 乌尔都语 28.2 22.6 42.3 22.7 33.1 20.1 46.4 25.1 36.9 20.5 越南语 12.7 10.3 44.5 18.6 47.5 20.7 56.6 21.0 52.9 19.8 威尔士语 40.8 33.0 48.9 20.8 49.0 20.8 54.9 21.4 51.4 20.9 约鲁巴语 105.1 94.8 61.2 49.7 61.9 49.4 62.7 50.2 64.2 49.4 50.1 44.3 33.3 20.7 31.0 19.1 44.2 24.8 32.5 18.7 表 A1：在 FLEURS 测试集上与 Whisper 的对比。"
      },
      {
       "id": "s-C-2-2",
       "original": "We report WER for each of the 54 languages supported by both MMS and Whisper, except for Thai (tha), Lao (lao), Burmese (mya) and Khmer (khm) where we report CER.",
       "zh": "我们对 MMS 和 Whisper 共同支持的 54 种语言逐一报告 WER，但泰语（tha）、老挝语（lao）、缅甸语（mya）和高棉语（khm）除外，对这些语言我们报告 CER。"
      },
      {
       "id": "s-C-2-3",
       "original": "We apply Whisper normalization for both reference and hypothesis for measuring CER/WER.",
       "zh": "在测量 CER/WER 时，我们对参考和假设都应用 Whisper 归一化。"
      }
     ]
    },
    {
     "id": "p-C-3",
     "type": "paragraph",
     "page": 39,
     "sentences": [
      {
       "id": "s-C-3-1",
       "original": "#lang lbld train FLEURS-54 data (h) (M) dev test Prior Work Whisper medium 99 50.1 Whisper large-v2 99 1,550M 44.3 This Work 61 33.6 33.3 + CC LM 61 20.9 20.7 MMS (LSAH) 61 1,096M 31.4 31.0 + CC LM 61 1,096M 19.1 19.0 44.7 44.2 + CC LM 24.8 24.8 MMS (LSAH) 3,346M 32.8 32.5 + CC LM 3,346M 18.7 18.7 Table A2: Comparison to Whisper.",
       "zh": "#语言数 标注 训练 FLEURS-54 数据 (h) (M) 开发集 测试集 先前工作 Whisper medium 99 50.1 Whisper large-v2 99 1,550M 44.3 本工作 61 33.6 33.3 + CC LM 61 20.9 20.7 MMS (LSAH) 61 1,096M 31.4 31.0 + CC LM 61 1,096M 19.1 19.0 44.7 44.2 + CC LM 24.8 24.8 MMS (LSAH) 3,346M 32.8 32.5 + CC LM 3,346M 18.7 18.7 表 A2：与 Whisper 的对比。"
      },
      {
       "id": "s-C-3-2",
       "original": "We report average WER on the 54 languages of the FLEURS benchmark supported by both Whisper and MMS (FLEURS-54).",
       "zh": "我们在 Whisper 和 MMS 共同支持的 FLEURS 基准的 54 种语言（FLEURS-54）上报告平均 WER。"
      },
      {
       "id": "s-C-3-3",
       "original": "MMS is a CTC-based model and to enable a fairer comparison we use n-gram models trained on web data when comparing to Whisper whose decoder is a neural sequence-model and serves as a language model that was trained on billions of web tokens.",
       "zh": "MMS 是基于 CTC 的模型，为实现更公平的对比，我们在与 Whisper 对比时使用了在网络数据上训练的 n 元模型，因为 Whisper 的解码器是一个神经序列模型，相当于一个在数十亿网络词元上训练的语言模型。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-D",
   "num": "D",
   "level": 1,
   "page": 40,
   "title": {
    "original": "Comparison to USM",
    "zh": "与 USM 的对比"
   },
   "blocks": [
    {
     "id": "p-D-1",
     "type": "paragraph",
     "page": 40,
     "sentences": [
      {
       "id": "s-D-1-1",
       "original": "Dev Test LM CER CER Afrikaans 6.3 6.3 Amharic 6.8 7.0 Arabic 4.3 4.9 Assamese 7.3 7.7 Asturian 5.2 5.1 Azerbaijani 4.2 3.9 Belarusian 3.8 3.8 Bengali 5.1 5.3 Bosnian 3.8 3.4 Bulgarian 3.0 3.2 Catalan 2.8 2.9 Cebuano 3.6 4.4 Czech 3.3 3.0 Sorani 6.5 7.4 Mandarin 14.8 14.9 Welsh 5.7 5.9 Danish 5.5 5.7 German 3.0 2.7 Greek 4.0 3.7 English 4.6 4.3 Estonian 2.9 2.7 Persian 4.0 4.1 Finnish 2.6 2.4 French 4.1 4.1 Fula 13.9 13.8 Irish 19.3 19.5 Galician 2.8 2.7 Gujarati 5.2 5.1 Hausa 5.5 5.9 Hebrew 15.5 12.9 Hindi 5.4 4.7 Croatian 3.5 3.2 Hungarian 4.1 4.2 Armenian 3.2 3.2 Igbo 10.7 11.1 Indonesian 2.3 2.1 Icelandic 5.2 4.1 Italian 1.5 1.4 Javanese 4.3 3.8 Japanese 14.5 14.6 Kamba 12.5 11.3 Kannada 4.6 4.4 Georgian 3.4 3.6 Kazakh 2.9 3.1 Kabuverdianu 4.3 4.3 Khmer 9.9 10.3 Kyrgyz 4.1 3.6 Korean 11.4 11.8 Lao 26.5 24.1 Latvian 2.8 2.2 Lingala 4.0 4.3 Lithuanian 4.3 3.7 Dev Test LM CER CER Luxembourgish 8.0 7.5 Ganda 8.0 8.4 Luo 4.9 5.0 Malayalam 4.4 4.2 Marathi 7.2 6.6 Macedonian 2.0 1.9 Maltese 3.7 3.7 Mongolian 5.6 5.9 Maori 5.9 6.9 Burmese 8.9 9.2 Dutch 3.7 3.1 Norwegian 3.7 4.1 Nepali 8.3 7.7 Northern 6.8 6.1 Nyanja 6.3 6.7 Occitan 7.8 8.2 Oromo 15.7 16.2 Oriya 6.3 7.1 Punjabi 7.4 7.0 Polish 2.6 2.7 Portuguese 2.8 2.8 Pashto 13.1 14.1 Romanian 3.7 3.1 Russian 3.1 3.0 Slovak 2.7 2.5 Slovenian 4.0 3.7 Shona 3.8 4.1 Sindhi 7.2 7.2 Somali 12.8 13.0 Spanish 1.8 2.1 Serbian 10.3 12.7 Swedish 4.7 4.6 Swahili 3.3 3.4 Tamil 8.2 9.0 Telugu 6.6 6.9 Tajik 4.0 4.5 Filipino 3.1 3.1 Thai 7.6 8.3 Turkish 3.5 3.1 Ukrainian 3.3 2.9 Umbundu 10.7 10.2 Urdu 9.8 8.1 Uzbek 4.7 5.0 Vietnamese 5.9 6.1 Wolof 11.2 11.5 Xhosa 6.0 6.1 Yoruba 17.0 16.1 Cantonese 12.9 12.4 Malay 2.8 2.6 Zulu 5.2 5.5 Average 6.3 6.3 Table A3: Results on FLEURS-102.",
       "zh": "开发集 测试集 语言模型 CER CER 南非荷兰语 6.3 6.3 阿姆哈拉语 6.8 7.0 阿拉伯语 4.3 4.9 阿萨姆语 7.3 7.7 阿斯图里亚斯语 5.2 5.1 阿塞拜疆语 4.2 3.9 白俄罗斯语 3.8 3.8 孟加拉语 5.1 5.3 波斯尼亚语 3.8 3.4 保加利亚语 3.0 3.2 加泰罗尼亚语 2.8 2.9 宿务语 3.6 4.4 捷克语 3.3 3.0 索拉尼库尔德语 6.5 7.4 汉语普通话 14.8 14.9 威尔士语 5.7 5.9 丹麦语 5.5 5.7 德语 3.0 2.7 希腊语 4.0 3.7 英语 4.6 4.3 爱沙尼亚语 2.9 2.7 波斯语 4.0 4.1 芬兰语 2.6 2.4 法语 4.1 4.1 富拉语 13.9 13.8 爱尔兰语 19.3 19.5 加利西亚语 2.8 2.7 古吉拉特语 5.2 5.1 豪萨语 5.5 5.9 希伯来语 15.5 12.9 印地语 5.4 4.7 克罗地亚语 3.5 3.2 匈牙利语 4.1 4.2 亚美尼亚语 3.2 3.2 伊博语 10.7 11.1 印尼语 2.3 2.1 冰岛语 5.2 4.1 意大利语 1.5 1.4 爪哇语 4.3 3.8 日语 14.5 14.6 卡姆巴语 12.5 11.3 卡纳达语 4.6 4.4 格鲁吉亚语 3.4 3.6 哈萨克语 2.9 3.1 卡布韦迪亚努语 4.3 4.3 高棉语 9.9 10.3 吉尔吉斯语 4.1 3.6 韩语 11.4 11.8 老挝语 26.5 24.1 拉脱维亚语 2.8 2.2 林加拉语 4.0 4.3 立陶宛语 4.3 3.7 开发集 测试集 语言模型 CER CER 卢森堡语 8.0 7.5 干达语 8.0 8.4 卢奥语 4.9 5.0 马拉雅拉姆语 4.4 4.2 马拉地语 7.2 6.6 马其顿语 2.0 1.9 马耳他语 3.7 3.7 蒙古语 5.6 5.9 毛利语 5.9 6.9 缅甸语 8.9 9.2 荷兰语 3.7 3.1 挪威语 3.7 4.1 尼泊尔语 8.3 7.7 北索托语 6.8 6.1 尼扬贾语 6.3 6.7 奥克语 7.8 8.2 奥罗莫语 15.7 16.2 奥里亚语 6.3 7.1 旁遮普语 7.4 7.0 波兰语 2.6 2.7 葡萄牙语 2.8 2.8 普什图语 13.1 14.1 罗马尼亚语 3.7 3.1 俄语 3.1 3.0 斯洛伐克语 2.7 2.5 斯洛文尼亚语 4.0 3.7 绍纳语 3.8 4.1 信德语 7.2 7.2 索马里语 12.8 13.0 西班牙语 1.8 2.1 塞尔维亚语 10.3 12.7 瑞典语 4.7 4.6 斯瓦希里语 3.3 3.4 泰米尔语 8.2 9.0 泰卢固语 6.6 6.9 塔吉克语 4.0 4.5 菲律宾语 3.1 3.1 泰语 7.6 8.3 土耳其语 3.5 3.1 乌克兰语 3.3 2.9 Umbundu 10.7 10.2 乌尔都语 9.8 8.1 乌兹别克语 4.7 5.0 越南语 5.9 6.1 沃洛夫语 11.2 11.5 科萨语 6.0 6.1 约鲁巴语 17.0 16.1 粤语 12.9 12.4 马来语 2.8 2.6 祖鲁语 5.2 5.5 平均 6.3 6.3 表 A3：FLEURS-102 上的结果。"
      },
      {
       "id": "s-D-1-2",
       "original": "We show character error rate on the dev and test sets of all 102 FLEURS languages for MMS when fine-tuned on the labeled data of FLEURS.",
       "zh": "我们展示了 MMS 在 FLEURS 标注数据上微调后，在全部 102 种 FLEURS 语言的开发集和测试集上的字错误率。"
      },
      {
       "id": "s-D-1-3",
       "original": "We use language-specific adapters and heads.",
       "zh": "我们使用语言特定的适配器和头部。"
      },
      {
       "id": "s-D-1-4",
       "original": "For inference we choose between two n-gram language models (LM) based on dev set accuracy: a word-based model trained on Common Crawl (CC LM) or a character-based model trained on the FLEURS training transcriptions (FL LM).",
       "zh": "推理时，我们根据开发集准确率在两个 n 元语言模型（LM）之间选择：在 Common Crawl 上训练的词级模型（CC LM）或在 FLEURS 训练转写上训练的字符级模型（FL LM）。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-E",
   "num": "E",
   "level": 1,
   "page": 41,
   "title": {
    "original": "Gender Bias Study",
    "zh": "性别偏见研究"
   },
   "blocks": [
    {
     "id": "p-E-1",
     "type": "paragraph",
     "page": 41,
     "sentences": [
      {
       "id": "s-E-1-1",
       "original": "Num Samples MMS ASR CER ↓ FLEURS ASR CER ↓ Female Male Female Male Overall Female Male Overall Assamese 139 279 15.3 15.1 15.4 8.6 8.0 8.9 Bulgarian 189 206 9.0 10.2 7.9 3.6 3.5 3.6 Welsh 150 296 15.8 19.4 14.1 8.4 11.5 6.9 Greek 125 146 11.4 9.3 13.1 5.4 4.0 6.6 English 245 149 10.8 10.7 10.9 6.0 5.5 6.8 Spanish 130 278 5.2 5.8 5.0 2.3 2.9 2.0 Fula 107 166 27.2 29.0 26.2 14.8 21.4 11.0 Finnish 352 63 7.6 7.1 10.2 2.7 2.6 3.8 French 62 227 9.1 10.0 8.8 5.4 6.4 5.2 Gujarati 149 283 13.3 12.7 13.7 6.2 6.2 6.2 Hindi 120 119 15.1 15.5 14.7 6.6 8.3 5.1 Kazakh 136 232 7.8 7.4 8.0 3.1 2.4 3.6 Khmer 98 228 26.1 22.8 27.6 14.1 11.2 15.4 Kannada 245 123 10.0 10.4 9.3 5.2 5.2 5.1 Korean 93 133 24.3 26.0 22.9 13.5 14.0 13.1 Kyrgyz 273 149 10.6 12.1 7.9 4.5 5.7 2.1 Ganda 228 78 13.4 13.3 13.6 8.2 7.9 9.0 Latvian 177 179 7.0 6.6 7.3 3.0 2.7 3.3 Marathi 148 295 13.2 9.3 15.0 8.2 4.8 9.9 Polish 95 243 6.6 7.2 6.3 3.3 3.8 3.1 Russian 203 153 8.0 7.4 8.9 4.0 3.7 4.6 Shona 118 275 10.5 8.6 11.4 4.1 2.2 5.1 Swedish 64 266 10.1 8.5 10.5 5.6 4.6 5.9 Swahili 59 152 7.7 11.1 6.5 3.7 3.9 3.6 Tamil 214 163 15.3 17.0 13.2 8.9 10.1 7.4 Telugu 76 235 12.7 11.3 13.1 7.9 8.2 7.8 Tajik 116 123 11.1 12.5 9.9 4.3 4.9 3.7 Average 12.4 12.3 12.4 6.5 6.2 6.4 Table A4: Analysis of Gender Bias.",
       "zh": "样本数量 MMS ASR CER ↓ FLEURS ASR CER ↓ 女性 男性 女性 男性 总体 女性 男性 总体 阿萨姆语 139 279 15.3 15.1 15.4 8.6 8.0 8.9 保加利亚语 189 206 9.0 10.2 7.9 3.6 3.5 3.6 威尔士语 150 296 15.8 19.4 14.1 8.4 11.5 6.9 希腊语 125 146 11.4 9.3 13.1 5.4 4.0 6.6 英语 245 149 10.8 10.7 10.9 6.0 5.5 6.8 西班牙语 130 278 5.2 5.8 5.0 2.3 2.9 2.0 富拉语 107 166 27.2 29.0 26.2 14.8 21.4 11.0 芬兰语 352 63 7.6 7.1 10.2 2.7 2.6 3.8 法语 62 227 9.1 10.0 8.8 5.4 6.4 5.2 古吉拉特语 149 283 13.3 12.7 13.7 6.2 6.2 6.2 印地语 120 119 15.1 15.5 14.7 6.6 8.3 5.1 哈萨克语 136 232 7.8 7.4 8.0 3.1 2.4 3.6 高棉语 98 228 26.1 22.8 27.6 14.1 11.2 15.4 卡纳达语 245 123 10.0 10.4 9.3 5.2 5.2 5.1 韩语 93 133 24.3 26.0 22.9 13.5 14.0 13.1 吉尔吉斯语 273 149 10.6 12.1 7.9 4.5 5.7 2.1 干达语 228 78 13.4 13.3 13.6 8.2 7.9 9.0 拉脱维亚语 177 179 7.0 6.6 7.3 3.0 2.7 3.3 马拉地语 148 295 13.2 9.3 15.0 8.2 4.8 9.9 波兰语 95 243 6.6 7.2 6.3 3.3 3.8 3.1 俄语 203 153 8.0 7.4 8.9 4.0 3.7 4.6 绍纳语 118 275 10.5 8.6 11.4 4.1 2.2 5.1 瑞典语 64 266 10.1 8.5 10.5 5.6 4.6 5.9 斯瓦希里语 59 152 7.7 11.1 6.5 3.7 3.9 3.6 泰米尔语 214 163 15.3 17.0 13.2 8.9 10.1 7.4 泰卢固语 76 235 12.7 11.3 13.1 7.9 8.2 7.8 塔吉克语 116 123 11.1 12.5 9.9 4.3 4.9 3.7 平均 12.4 12.3 12.4 6.5 6.2 6.4 表 A4：性别偏见分析。"
      },
      {
       "id": "s-E-1-2",
       "original": "We compare ASR models trained on MMS-lab data and FLEURS data.",
       "zh": "我们比较了在 MMS-lab 数据和在 FLEURS 数据上训练的 ASR 模型。"
      },
      {
       "id": "s-E-1-3",
       "original": "We report dev CER per gender of the speakers for 27 languages of FLEURS for which MMS-lab provides data and for which there are at least 50 samples for each gender.",
       "zh": "我们报告了 FLEURS 中 MMS-lab 提供数据且每种性别至少有 50 个样本的 27 种语言按说话人性别划分的开发集 CER。"
      }
     ]
    }
   ]
  }
 ],
 "annotations": [
  {
   "id": "a-01",
   "kind": "motivation",
   "title": "为什么是《新约》朗读：最大多语言平行语音语料",
   "featured": true,
   "anchor": {
    "sentence_id": "s-3-1-1-1-1",
    "quote": "recordings of people reading the New Testament in different languages"
   },
   "explanation": "把语音技术扩到上千种语言，最大的瓶颈不是模型而是配对数据。圣经是历史上被翻译得最多的文本，且存在教会制作的公开朗读录音，天然构成\"同一种内容、上千种语言\"的平行集。这一选择同时埋下了数据领域狭窄（宗教语域）和伦理风险，论文第 8 节专门回应。"
  },
  {
   "id": "a-02",
   "kind": "engineering",
   "title": "GPU 强制对齐：把内存从 O(T×L) 压到 O(L)",
   "featured": true,
   "anchor": {
    "sentence_id": "s-efficient-forced-alignment-on-gp-1-4",
    "quote": "O(L"
   },
   "explanation": "CTC 强制对齐的经典实现需要 T×S 的 DP 矩阵，长时间录音直接爆显存。本文的关键工程技巧是：前向只保留奇偶两列（大小各为 2|L|+1），把回溯所需的中间索引按每 100 步为一批异步卸载到 CPU。这使整本《新约》（数小时音频）可以在单卡上整块对齐，是 MMS-lab 能规模化的隐藏底座。"
  },
  {
   "id": "a-03",
   "kind": "concept",
   "title": "星号词元：让 CTC 能\"跳过\"文本与音频对不上的地方",
   "featured": true,
   "anchor": {
    "sentence_id": "s-robust-alignment-for-noisy-trans-2-1",
    "quote": "star"
   },
   "explanation": "宗教朗读常有即兴增删、音乐间奏，转写与音频并非逐字对应。作者在目标序列中插入 ⟨∗⟩ 占位符，允许 CTC 在对不上时把概率质量吸收到星号上，从而对齐不被噪声带偏。这是把\"理想对齐工具\"改造成\"脏数据对齐工具\"的关键一步，与直接丢弃对不齐片段的 Kaldi 式方案相比，回收了更多可用数据。"
  },
  {
   "id": "a-04",
   "kind": "number",
   "title": "38% 的语言录音带背景音乐：数据收集的现实",
   "featured": false,
   "anchor": {
    "sentence_id": "s-recordings-with-background-music-1-2",
    "quote": "38%"
   },
   "explanation": "细看数据画像会发现：超过三分之一的语言，其录音是带配乐的\"广播剧\"而非干声朗读。这不是边缘案例，而是低资源语音数据的常态。MMS 的对策（降噪器去音乐 + 音高方差启发式去掉多说话人语句）在 §7.4.2 被验证可弥合 69-87% 的 CER 差距，说明预处理是这一规模下绕不开的环节。"
  },
  {
   "id": "a-05",
   "kind": "engineering",
   "title": "uroman：用 ASCII 换\"一个模型吃所有文字系统\"",
   "featured": false,
   "anchor": {
    "sentence_id": "s-text-encoding-1-1",
    "quote": "maps different writing scripts to a common Latin script representation"
   },
   "explanation": "1,100+ 种语言涉及几十种文字，若每种文字各建词表，CTC 头部将不可管理。uroman 把任意文字统一转写为罗马字母表示，使所有语言共享一个字符集合。代价是丢失文字原貌（依赖转写质量），换来的是训练与解码基础设施的彻底统一——这也是后来 TTS 混合字母/uroman 策略的来源。"
  },
  {
   "id": "a-06",
   "kind": "comparison",
   "title": "wav2vec 2.0 vs XLS-R：1,406 种语言、491K 小时的预训练",
   "featured": false,
   "anchor": {
    "sentence_id": "s-data-1-1",
    "quote": "491K hours in 1,406 languages"
   },
   "explanation": "MMS 预训练规模是 XLS-R 的约 11 倍（语言数 128→1,406，小时数 43.6K→491K），其中 445K 小时还是无标注数据。预训练和 MMS-lab 对齐数据互相成就：对齐出的数据扩到 1,362 种语言是业界最大配对集，而无标注数据把覆盖面再推到 3,809 种语言。规模对比是论文说服力的核心之一。"
  },
  {
   "id": "a-07",
   "kind": "concept",
   "title": "LSAH：语言特定适配器 + 头部，2M 参数换可扩展多语言",
   "featured": true,
   "anchor": {
    "sentence_id": "s-language-specific-adapters-head--1-3",
    "quote": "the inner dimension of the projections is 16"
   },
   "explanation": "全参数微调成 1,107 个单语模型，参数量和存储都爆炸；而一个稠密多语言模型又会产生语言间干扰。LSAH 的折中是：冻结共享主干，每种语言只加内维 16 的小适配器（约 2M 参数）和独立 CTC 头。图 12 显示 61→1,107 语言扩展时，稠密模型 CER 恶化 5.1，而 LSAH 只恶化 0.4——参数高效与可扩展性兼得。"
  },
  {
   "id": "a-08",
   "kind": "number",
   "title": "关键数字：相对词错率降低 58%",
   "featured": true,
   "anchor": {
    "sentence_id": "s-5-3-1-3-4",
    "quote": "58%"
   },
   "explanation": "在 FLEURS-54（双方都覆盖的语言）上，MMS 相比 Whisper large-v2 取得 58% 的相对 WER 下降，而且这是用 44.7K 小时对比 Whisper 的 680K 小时训练数据达成的——数据效率优势约 15 倍。这说明在明确的多语言目标下，wav2vec 2.0 式预训练 + 微调可以击败大规模弱监督 seq2seq 路线。"
  },
  {
   "id": "a-09",
   "kind": "critique",
   "title": "与 Whisper 比公平吗：CTC 模型外挂 n 元 LM 的辩护",
   "featured": false,
   "anchor": {
    "sentence_id": "s-C-3-3",
    "quote": "Whisper whose decoder is a neural sequence-model and serves as a language model"
   },
   "explanation": "作者主动承认一个方法论软肋：MMS 是 CTC 模型，本身没有语言建模能力，而 Whisper 的解码器自带语言模型。为公平起见，MMS 侧外挂 Common Crawl n 元 LM。这提示读者：对比数字背后两边\"系统组成\"并不对称，58% 的相对提升既有数据功劳，也有评测口径上的补偿设计。"
  },
  {
   "id": "a-10",
   "kind": "comparison",
   "title": "6.3 vs 6.5：与 Google USM 的贴身对比",
   "featured": false,
   "anchor": {
    "sentence_id": "s-5-3-2-1-1",
    "quote": "12M hours of proprietary YouTube audio spanning 300 languages"
   },
   "explanation": "在 FLEURS-102 上 MMS（6.3 CER）以微弱优势胜过 Google USM（6.5），且 USM 预训练用了 1,200 万小时的专有数据。差距虽小，但 MMS 全文、代码、模型全开（CC-BY-NC 4.0），而 USM 数据闭源。这构成\"开放小规模可复现 vs 闭源大规模\"的鲜明对照，也是该论文引用面最广的结论之一。"
  },
  {
   "id": "a-11",
   "kind": "number",
   "title": "4,017 种语言的 LID：语言数翻 32 倍几乎不掉点",
   "featured": true,
   "anchor": {
    "sentence_id": "s-6-3-1-1",
    "quote": "4,017"
   },
   "explanation": "语种识别从约 126 种扩到 4,017 种，FLEURS 上准确率只降 0.3%，VoxLingua-107 上不降。这说明 LID 的语言间迁移几乎无损——与 ASR 的\"多语言干扰\"形成对照。直觉是：LID 只需粗粒度声学-语言线索，类别多反而构成对比学习信号；这是\"语言覆盖扩展红利\"最干净的证据。"
  },
  {
   "id": "a-12",
   "kind": "engineering",
   "title": "100K 步 × 8×V100：为 1,107 个 TTS 模型做的工程取舍",
   "featured": false,
   "anchor": {
    "sentence_id": "s-7-1-3-2",
    "quote": "100K steps using eight V100-GPUs with a batch size of 64"
   },
   "explanation": "原版 VITS 单模型要训 800K 步，照此 1,107 种语言的算力不可承受。MMS 把每个模型砍到 100K 步（约提速 8 倍），表 8 证明质量损失\"适度\"可接受。低资源语音合成的核心是系统性工程权衡：字母输入代替音素化（免语言特定工具）、缩减训练预算换覆盖面——单项指标换规模。"
  },
  {
   "id": "a-13",
   "kind": "comparison",
   "title": "字母 vs uroman：只有阿姆哈拉语和韩语例外",
   "featured": false,
   "anchor": {
    "sentence_id": "s-text-representations-1-5",
    "quote": "except for Amharic and Korean, which both have large character sets of between 200-1,000 characters"
   },
   "explanation": "TTS 文本表示的消融得出一个反直觉结论：直接用字母几乎总是优于 uroman 罗马化——uroman 会引入转写噪声。唯一例外是字符集在 200-1,000 之间的大字符集语言（阿姆哈拉语、韩语），此时字母词表过大、每字符样本过少，罗马化反而更稳。这给低资源 TTS 从业者一条清晰经验：默认字母，超大字符集再退到 uroman。"
  },
  {
   "id": "a-14",
   "kind": "critique",
   "title": "去掉 15% 音高方差最高的语句：有效但粗糙的启发式",
   "featured": false,
   "anchor": {
    "sentence_id": "s-speech-data-pre-processing-1-6",
    "quote": "15%"
   },
   "explanation": "广播剧录音里多说话人语句是 TTS 毒药。作者用\"浊音帧音高方差\"作代理：音高忽高忽低多半意味着在模仿不同角色。按每份录音内部排序、砍掉最高的 15%——阈值是拍脑袋的全局常数，对不同语言/录音条件并非最优。它提醒我们：超大规模数据集的清洗常常是\"够用的启发式\"而非最优算法。"
  },
  {
   "id": "a-15",
   "kind": "critique",
   "title": "性别偏见实验的逻辑：与 FLEURS 基线\"一样有偏\"",
   "featured": true,
   "anchor": {
    "sentence_id": "s-8-1-5-2",
    "quote": "27 languages"
   },
   "explanation": "MMS-lab 录音者多为男性，作者担心模型对女声更差。实验设计很聪明：不比绝对错误率（28 种语言中女高 13、男高 14，互有胜负无结论），而是与在性别均衡的 FLEURS 上训练的模型比\"偏见是否更大\"。结论是 MMS 偏见与通用域基线处于同一水平。这是\"数据集有偏 ≠ 系统比基线更有偏\"的示范性论证，但也暴露了\"与基线持平即接受\"的伦理标准局限。"
  },
  {
   "id": "a-16",
   "kind": "comparison",
   "title": "偏见词检测：出现率低 +0.7%，方法精确率很低",
   "anchor": {
    "sentence_id": "s-results-3-1",
    "quote": "0.7%"
   },
   "explanation": "作者用\"MMS-lab 中相对频率至少为 Common Crawl 两倍\"的自动规则圈定疑似宗教偏见词，再比较 ASR 输出与 FLEURS 基线的差异，净增仅 0.7 个百分点。人工复核（如波斯语 2 个宗教词、蒙古语多为误判）显示规则法假阳性率高。结论诚实：在宗教文本上训练确实带来轻微但可测的词汇偏置，只是量级有限。"
  },
  {
   "id": "a-17",
   "kind": "connection",
   "title": "谱系定位：CMU Wilderness、NLLB 到 MMS 的接力",
   "featured": false,
   "anchor": {
    "sentence_id": "s-8-3-2-2",
    "quote": "699 languages"
   },
   "explanation": "MMS 并非凭空诞生：TTS 线直接延续 Black 2019 的 CMU Wilderness（699 语言，同样基于圣经录音）；机器翻译线对应 NLLB（202 语言）；ASR/LID 线则是新的。把三者放进同一条\"宗教文本 → 低资源语音/语言技术\"的谱系，可以看到 MMS 的真正增量是 ASR+LID 以及每项任务覆盖量的数量级提升。"
  },
  {
   "id": "a-18",
   "kind": "critique",
   "title": "CER≤5 + 单说话人重合：乐观估计的两处水分",
   "featured": true,
   "anchor": {
    "sentence_id": "s-5-5-1-5",
    "quote": "this measure is very coarse"
   },
   "explanation": "\"96% 语言达标\"是 MMS 最广传播的数字之一，但表 6 的脚注自我拆台：统一阈值对不同书写系统不公平（非洲语言 91% 最低，部分因文字差异），且 MMS-lab 很多语言只有单一说话人，训练/测试集含相同声音——模型可能记住了说话人而非学会语言。作者如实标注，值得肯定，读者引用时应连这些 caveat 一起引用。"
  },
  {
   "id": "a-19",
   "kind": "concept",
   "title": "域内 vs 域外：评估设计里隐藏的领域偏移对照",
   "featured": false,
   "anchor": {
    "sentence_id": "s-6-2-1-3",
    "quote": "there is no domain shift compared to systems trained on MMS-lab-U and MMS-unlab data"
   },
   "explanation": "MMS 的 LID 实验精心设计了\"域内/域外\"两组对照：FLEURS/VoxLingua-107 模型在自己域内占优，但换域后 MMS-lab-U+unlab 训出的模型只落后 1.6-2.1%。这背后是对监督学习核心问题的干净利落回答：窄域但有规模的数据，能否替代多样化的现有数据集？答案基本肯定，这也是整套 MMS 论证的缩影。"
  },
  {
   "id": "a-20",
   "kind": "motivation",
   "title": "CC-BY-NC 4.0 放出数据与模型：开放是论文的另一半",
   "featured": false,
   "anchor": {
    "sentence_id": "s-9-1-1",
    "quote": "the first study which scaled speech technology to over one thousand languages"
   },
   "explanation": "论文反复强调在 CC-BY-NC 4.0 下开放 MMS-lab/MMS-lab-U 数据、对齐工具、预训练模型与全部下游模型。这使得\"覆盖 1,000+ 语言\"不是一次性榜单，而是整个低资源社区可继续构建的公共底座。今天 Hugging Face 上的 MMS 系列（facebook/mms-*）正是这一开放策略的直接产物，影响力远超论文本身。"
  }
 ]
};
