// 自动生成：2409.00750 全文双语精读数据（由 tools/compile_paper.js 装配）
// 结构/原文来自 .cache/papers/2409.00750.json（tools/extract_paper.py）；
// 翻译与讲解来自 .cache/papers/zh/2409.00750/（LLM agent 撰写）。
// 改翻译请改片段后重新装配；勿手改本文件的结构与 original 字段。
globalThis.PAPER_2409_00750 = {
 "paper_id": "2409.00750",
 "model_id": "maskgct",
 "title": {
  "original": "MaskGCT: Zero-Shot Text-to-Speech with Masked Generative Codec Transformer",
  "zh": "MaskGCT：基于掩码生成式 Codec Transformer 的零样本文本转语音"
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
       "original": "Yuancheng Wang1, Haoyue Zhan2, Liwei Liu1, Ruihong Zeng2, Haotian Guo1 Jiachen Zheng1, Qiang Zhang2, Xueyao Zhang1, Shunsi Zhang2, Zhizheng Wu1 1The Chinese University of Hong Kong, Shenzhen 2Guangzhou Quwan Network Technology"
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
       "original": "The recent large-scale text-to-speech (TTS) systems are usually grouped as autoregressive and non-autoregressive systems.",
       "zh": "近期的大规模文本转语音（TTS）系统通常分为自回归（AR）与非自回归（NAR）两类。"
      },
      {
       "id": "s-abstract-1-2",
       "original": "The autoregressive systems implicitly model duration but exhibit certain deficiencies in robustness and lack of duration controllability.",
       "zh": "自回归系统隐式地对时长建模，但在鲁棒性上存在一定缺陷，且缺乏时长可控性。"
      },
      {
       "id": "s-abstract-1-3",
       "original": "Non-autoregressive systems require explicit alignment information between text and speech during training and predict durations for linguistic units (e.g. phone), which may compromise their naturalness.",
       "zh": "非自回归系统在训练时需要文本与语音之间的显式对齐信息，并要为语言学单元（如音素）预测时长，这可能会损害其自然度。"
      },
      {
       "id": "s-abstract-1-4",
       "original": "In this paper, we introduce Masked Generative Codec Transformer (MaskGCT), a fully non-autoregressive TTS model that eliminates the need for explicit alignment information between text and speech supervision, as well as phone-level duration prediction.",
       "zh": "本文提出掩码生成式 Codec Transformer（MaskGCT），一个完全非自回归的 TTS 模型，既不需要文本与语音监督之间的显式对齐信息，也不需要音素级时长预测。"
      },
      {
       "id": "s-abstract-1-5",
       "original": "MaskGCT is a two-stage model: in the first stage, the model uses text to predict semantic tokens extracted from a speech self-supervised learning (SSL) model, and in the second stage, the model predicts acoustic tokens conditioned on these semantic tokens.",
       "zh": "MaskGCT 是一个两阶段模型：第一阶段用文本预测从语音自监督学习（SSL）模型中提取的语义 token；第二阶段以这些语义 token 为条件预测声学 token。"
      },
      {
       "id": "s-abstract-1-6",
       "original": "MaskGCT follows the mask-and-predict learning paradigm.",
       "zh": "MaskGCT 遵循掩码-预测（mask-and-predict）学习范式。"
      },
      {
       "id": "s-abstract-1-7",
       "original": "During training, MaskGCT learns to predict masked semantic or acoustic tokens based on given conditions and prompts.",
       "zh": "训练时，MaskGCT 学习在给定条件与提示（prompt）的基础上预测被掩蔽的语义或声学 token。"
      },
      {
       "id": "s-abstract-1-8",
       "original": "During inference, the model generates tokens of a specified length in a parallel manner.",
       "zh": "推理时，模型以并行方式生成指定长度的 token。"
      },
      {
       "id": "s-abstract-1-9",
       "original": "Experiments with 100K hours of in-thewild speech demonstrate that MaskGCT outperforms the current state-of-the-art zero-shot TTS systems in terms of quality, similarity, and intelligibility.",
       "zh": "在 100K 小时真实场景（in-the-wild）语音上的实验表明，MaskGCT 在质量、相似度和可懂度上超过了当前最先进的零样本 TTS 系统。"
      },
      {
       "id": "s-abstract-1-10",
       "original": "Audio samples are available at https://maskgct.github.io/.",
       "zh": "音频示例见 https://maskgct.github.io/。"
      },
      {
       "id": "s-abstract-1-11",
       "original": "We release our code and model checkpoints at https://github.com/open-mmlab/Amphion/blob/ main/models/tts/maskgct.",
       "zh": "我们在 https://github.com/open-mmlab/Amphion/blob/ main/models/tts/maskgct 开源了代码与模型检查点。"
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
       "original": "In recent years, large-scale zero-shot text-to-speech (TTS) systems [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] have achieved significant improvements by scaling data and model sizes, including both autoregressive (AR) [1, 2, 3, 4, 5, 6] and non-autoregressive (NAR) models [7, 8, 9, 10].",
       "zh": "近年来，大规模零样本文本转语音（TTS）系统 [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] 通过扩大数据与模型规模取得了显著进步，其中既包括自回归（AR）模型 [1, 2, 3, 4, 5, 6]，也包括非自回归（NAR）模型 [7, 8, 9, 10]。"
      },
      {
       "id": "s-1-1-2",
       "original": "However, both AR-based and NAR-based systems still exhibit some shortcomings.",
       "zh": "然而，AR 与 NAR 两类系统仍各自存在一些短板。"
      },
      {
       "id": "s-1-1-3",
       "original": "In particular, AR-based TTS systems typically quantize speech into discrete tokens and then use decoder-only models to autoregressively generate these tokens, which offer diverse prosody but also suffer from problems such as poor robustness and slow inference speed.",
       "zh": "具体来说，基于 AR 的 TTS 系统通常把语音量化为离散 token，再用 decoder-only 模型自回归地生成这些 token，这样做韵律多样，但也存在鲁棒性差、推理速度慢等问题。"
      },
      {
       "id": "s-1-1-4",
       "original": "NAR-based models, typically based on diffusion [7, 8], flow matching [9], or GAN [10], require explicit text and speech alignment information as well as the prediction of phone-level duration, resulting in a complex pipeline and producing more standardized but less diverse speech.",
       "zh": "基于 NAR 的模型——通常基于扩散模型 [7, 8]、流匹配 [9] 或 GAN [10]——需要显式的文本-语音对齐信息以及音素级时长预测，导致流水线复杂，且生成的语音更标准化、多样性更低。"
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
       "original": "Recently, masked generative transformers, a class of generative models, have achieved significant results in the fields of image [11, 12, 13], video [14, 15], and audio [16, 17, 18] generation, demonstrating potential comparable to or superior to autoregressive models or diffusion models.",
       "zh": "最近，掩码生成式 Transformer 作为一类生成模型，在图像 [11, 12, 13]、视频 [14, 15] 和音频 [16, 17, 18] 生成领域取得了显著成果，展现出与自回归模型或扩散模型相当甚至更优的潜力。"
      },
      {
       "id": "s-1-2-2",
       "original": "These models employ a mask-and-predict training paradigm and utilize iterative parallel decoding during Preprint.",
       "zh": "这类模型采用掩码-预测（mask-and-predict）训练范式，并在推理时使用迭代式并行解码。"
      },
      {
       "id": "s-1-2-3",
       "original": "Under review. inference.",
       "zh": "评审中（原文排版残留，译文按上下文补全）。"
      },
      {
       "id": "s-1-2-4",
       "original": "Some previous works have attempted to introduce masked generative models into the field of TTS.",
       "zh": "已有一些工作尝试把掩码生成模型引入 TTS 领域。"
      },
      {
       "id": "s-1-2-5",
       "original": "SoundStorm [19] was the first attempt to use a masked generative transformer to predict multi-layer acoustic tokens extracted from SoundStream, conditioned on speech semantic tokens; however, it needs to receive the semantic tokens of an AR model as input.",
       "zh": "SoundStorm [19] 首次用掩码生成式 Transformer 在语音语义 token 的条件下预测从 SoundStream 提取的多层声学 token；但它需要接收一个 AR 模型输出的语义 token 作为输入。"
      },
      {
       "id": "s-1-2-6",
       "original": "Thus, SoundStorm is more of an acoustic model that converts semantic tokens into acoustic tokens and does not fully utilize the powerful generative potential of masked generative models.",
       "zh": "因此，SoundStorm 更像一个把语义 token 转成声学 token 的声学模型，并未充分发挥掩码生成模型的强大生成潜力。"
      },
      {
       "id": "s-1-2-7",
       "original": "NaturalSpeech 3 [8] decomposes speech into discrete token sequences representing different attributes through special designs and generates tokens representing different attributes through masked generative models.",
       "zh": "NaturalSpeech 3 [8] 通过特殊设计把语音分解为代表不同属性的离散 token 序列，并用掩码生成模型生成代表不同属性的 token。"
      },
      {
       "id": "s-1-2-8",
       "original": "However, it still needs speech-text alignment supervision and phone-level duration prediction.",
       "zh": "然而，它仍需要语音-文本对齐监督和音素级时长预测。"
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
       "original": "In this work, we propose MaskGCT, a fully non-autoregressive model for text-to-speech synthesis that uses masked generative transformers without requiring text-speech alignment supervision and phone-level duration prediction.",
       "zh": "本工作提出 MaskGCT，一个用于文本转语音合成的完全非自回归模型，使用掩码生成式 Transformer，不需要文本-语音对齐监督，也不需要音素级时长预测。"
      },
      {
       "id": "s-1-3-2",
       "original": "MaskGCT is a two-stage system, both stages are trained using the mask-and-predict learning paradigm.",
       "zh": "MaskGCT 是一个两阶段系统，两个阶段都采用掩码-预测学习范式训练。"
      },
      {
       "id": "s-1-3-3",
       "original": "The first stage, the text-to-semantic (T2S) model, predicts masked semantic tokens with in-context learning, using text token sequences and prompt speech semantic token sequences as the prefix, without explicit duration prediction.",
       "zh": "第一阶段的文本到语义（T2S）模型通过上下文学习预测被掩蔽的语义 token，以文本 token 序列和提示语音的语义 token 序列作为前缀，无需显式时长预测。"
      },
      {
       "id": "s-1-3-4",
       "original": "The second stage, the semantic-to-acoustic (S2A) model, utilizes semantic tokens to predict masked acoustic tokens extracted from an RVQ-based speech codec with prompt acoustic tokens.",
       "zh": "第二阶段的语义到声学（S2A）模型利用语义 token，在提示声学 token 的条件下，预测从基于 RVQ 的语音 codec 中提取的被掩蔽声学 token。"
      },
      {
       "id": "s-1-3-5",
       "original": "During inference, MaskGCT can generate semantic tokens of various specified lengths with a few iteration steps given a sequence of text.",
       "zh": "推理时，给定一段文本，MaskGCT 只需少量迭代步即可生成各种指定长度的语义 token。"
      },
      {
       "id": "s-1-3-6",
       "original": "In addition, we train a VQ-VAE [20] to quantize speech self-supervised learning embedding, rather than using k-means to extract semantic tokens that is common in previous work.",
       "zh": "此外，我们训练了一个 VQ-VAE [20] 来量化语音自监督学习表征，而不是像以往工作那样普遍使用 k-means 来提取语义 token。"
      },
      {
       "id": "s-1-3-7",
       "original": "This approach minimizes the information loss of semantic features even with a single codebook.",
       "zh": "这种做法即使只用单一码本，也能把语义特征的信息损失降到最小。"
      },
      {
       "id": "s-1-3-8",
       "original": "We also explore the scalability of our methods beyond the zero-shot TTS task, such as speech translation (cross-lingual dubbing), speech content editing, voice conversion, and emotion control, demonstrating the potential of MaskGCT as a foundational model for speech generation.",
       "zh": "我们还探索了该方法在零样本 TTS 之外的可扩展性，例如语音翻译（跨语言配音）、语音内容编辑、声音转换和情感控制，展示了 MaskGCT 作为语音生成基础模型的潜力。"
      },
      {
       "id": "s-1-3-9",
       "original": "Table 1 shows a comparison between MaskGCT and some previous works.",
       "zh": "Table 1 给出了 MaskGCT 与一些先前工作的对比。"
      }
     ]
    },
    {
     "id": "tab-1-1",
     "type": "table_caption",
     "page": 2,
     "original": "Table 1: A comparison between MaskGCT and existing systems. “Model” stands for modeling method and “Rep.” stands for the representation used. MaskGCT uses masked generative modeling for acoustic and semantic tokens (“A.” stands for acoustic, “S.” stands for semantic, “F.” stands for factorized tokens used in NaturalSpeech 3). MaskGCT implicitly models duration (“Imp. Dur.”) and allows flexible control over the total length of generated speech (“Len. Ctrl”). MaskGCT supports various speech generation tasks.",
     "zh": "表 1：MaskGCT 与现有系统的对比。「Model」表示建模方法，「Rep.」表示所使用的表征。MaskGCT 对声学 token 与语义 token 都采用掩码生成建模（「A.」表示声学，「S.」表示语义，「F.」表示 NaturalSpeech 3 中使用的分解式 token）。MaskGCT 隐式地对时长建模（「Imp. Dur.」），并允许灵活控制生成语音的总长度（「Len. Ctrl」）。MaskGCT 支持多种语音生成任务。"
    },
    {
     "id": "p-1-4",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-1-4-1",
       "original": "System Model Rep.",
       "zh": "（表格残留）模型 / 表征。"
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
       "original": "Imp.",
       "zh": "（表格残留）隐式"
      },
      {
       "id": "s-1-5-2",
       "original": "Dur.",
       "zh": "时长。"
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
       "original": "Len.",
       "zh": "（表格残留）长度"
      },
      {
       "id": "s-1-6-2",
       "original": "Ctrl.",
       "zh": "控制。"
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
       "original": "ZS TTS CL TTS Dubbing Edit VALL-E Autoregressive A.",
       "zh": "（表格残留）ZS TTS、CL TTS、配音、编辑；VALL-E：自回归，声学"
      },
      {
       "id": "s-1-7-2",
       "original": "Tokens",
       "zh": "（谱系表行：Tokens ✓ ✗ ✓ ✗ ✗ ✗；NaturalSpeech 2；Diffusion A.）"
      }
     ]
    },
    {
     "id": "eq-1-1",
     "type": "equation",
     "page": 2,
     "original": "✓ ✗ ✓ ✗ ✗ ✗"
    },
    {
     "id": "eq-1-2",
     "type": "equation",
     "page": 2,
     "original": "NaturalSpeech 2 Diffusion A. Features"
    },
    {
     "id": "eq-1-3",
     "type": "equation",
     "page": 2,
     "original": "✗ ✗ ✓ ✗ ✗ ✗"
    },
    {
     "id": "eq-1-4",
     "type": "equation",
     "page": 2,
     "original": "VoiceBox Diffusion A. Features"
    },
    {
     "id": "eq-1-5",
     "type": "equation",
     "page": 2,
     "original": "✓ ✗ ✓ ✓ ✗ ✓"
    },
    {
     "id": "eq-1-6",
     "type": "equation",
     "page": 2,
     "original": "VoiceCraft Autoregressive A. Tokens"
    },
    {
     "id": "eq-1-7",
     "type": "equation",
     "page": 2,
     "original": "✓ ✗ ✓ ✗ ✗ ✓"
    },
    {
     "id": "eq-1-8",
     "type": "equation",
     "page": 2,
     "original": "NaturalSpeech 3 Masked Generative F. Tokens"
    },
    {
     "id": "eq-1-9",
     "type": "equation",
     "page": 2,
     "original": "✗ ✗ ✓ ✗ ✗ ✓"
    },
    {
     "id": "eq-1-10",
     "type": "equation",
     "page": 2,
     "original": "MaskGCT Masked Generative S.&A. Tokens"
    },
    {
     "id": "eq-1-11",
     "type": "equation",
     "page": 2,
     "original": "✓ ✓ ✓ ✓ ✓ ✓"
    },
    {
     "id": "p-1-8",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-1-8-1",
       "original": "Our experiments demonstrate that MaskGCT has achieved performance comparable to or superior to that of existing models in terms of speech quality, similarity, prosody, and intelligibility.",
       "zh": "（谱系表行：Tokens ✓ ✓ ✓ ✓ ✓ ✓。）实验表明 MaskGCT 在语音质量、相似度、韵律与可懂度上达到与现有模型相当或更优的水平。"
      },
      {
       "id": "s-1-8-2",
       "original": "Specifically, (1) It achieves comparable or better quality and naturalness than the ground truth speech across three benchmarks (LibriSpeech, SeedTTS test-en, and SeedTTS test-zh) in terms of CMOS.",
       "zh": "具体来说：(1) 就 CMOS 而言，它在三个基准（LibriSpeech、SeedTTS test-en 和 SeedTTS test-zh）上取得了与真人语音相当甚至更好的质量与自然度。"
      },
      {
       "id": "s-1-8-3",
       "original": "(2) It achieves human-level similarity between the generated speech and the prompt speech, with improvements of +0.017, -0.002, and +0.027 in SIM-O and +0.28, +0.32 and +0.25 in SMOS for LibriSpeech, SeedTTS test-en, and SeedTTS test-zh, respectively.",
       "zh": "(2) 它使生成语音与提示语音之间的相似度达到人类水平：在 LibriSpeech、SeedTTS test-en 和 SeedTTS test-zh 上，SIM-O 分别提升 +0.017、-0.002 和 +0.027，SMOS 分别提升 +0.28、+0.32 和 +0.25。"
      },
      {
       "id": "s-1-8-4",
       "original": "(3) It achieves comparable intelligibility in terms of WER across the three benchmarks and demonstrates stability within a reasonable range of speech duration, which also indicates the diversity and controllability of the generated speech.",
       "zh": "(3) 它在三个基准上的 WER 与真人相当，且在合理的语音时长范围内表现稳定，这也说明生成语音兼具多样性与可控性。"
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
       "original": "In summary, we propose a non-autoregressive zero-shot TTS system based on masked generative transformers and introduce a speech discrete semantic representation by training a VQ-VAE on speech self-supervised representations.",
       "zh": "总之，我们提出了一个基于掩码生成式 Transformer 的非自回归零样本 TTS 系统，并通过在语音自监督表征上训练 VQ-VAE 引入了一种语音离散语义表征。"
      },
      {
       "id": "s-1-9-2",
       "original": "Our system achieves human-level similarity, naturalness, and intelligibility by scaling data to 100K hours of in-the-wild speech, while also demonstrating high flexibility, diversity, and controllability.",
       "zh": "通过把数据规模扩大到 100K 小时真实场景语音，我们的系统在相似度、自然度和可懂度上达到人类水平，同时展现出高度的灵活性、多样性与可控性。"
      },
      {
       "id": "s-1-9-3",
       "original": "We investigate the scalability of our system across various tasks, including cross-lingual dubbing, voice conversion, emotion control, and speech content editing, utilizing zero-shot learning or post-training methods.",
       "zh": "我们考察了系统在多种任务上的可扩展性，包括跨语言配音、声音转换、情感控制和语音内容编辑，使用零样本学习或后训练方法。"
      },
      {
       "id": "s-1-9-4",
       "original": "This showcases the potential of our system as a foundational model for speech generation.",
       "zh": "这展示了我们的系统作为语音生成基础模型的潜力。"
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
    "original": "Related Work",
    "zh": "相关工作"
   },
   "blocks": [
    {
     "id": "p-2-1",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-2-1-1",
       "original": "Large-scale TTS.",
       "zh": "大规模 TTS。"
      },
      {
       "id": "s-2-1-2",
       "original": "Traditional TTS systems [21, 22, 23, 24, 25] are trained to generate speech from a single speaker or multiple speakers using hours of high-quality transcribed training data.",
       "zh": "传统 TTS 系统 [21, 22, 23, 24, 25] 使用数小时高质量带转录的训练数据，学习生成单个或多个说话人的语音。"
      },
      {
       "id": "s-2-1-3",
       "original": "Modern large-scale TTS systems [1, 2, 3, 4, 5, 6] aim to achieve zero-shot TTS (synthesizing speech for unseen speakers with speech prompts) by scaling both the model and data size.",
       "zh": "现代大规模 TTS 系统 [1, 2, 3, 4, 5, 6] 则通过同时扩大模型与数据规模来实现零样本 TTS（用语音提示为未见过的说话人合成语音）。"
      },
      {
       "id": "s-2-1-4",
       "original": "These systems can be mainly divided into AR-based and NAR-based categories.",
       "zh": "这些系统主要可分为基于 AR 与基于 NAR 两大类。"
      },
      {
       "id": "s-2-1-5",
       "original": "For AR-based systems: SpearTTS [1] utilizes three AR models to predict semantic tokens from text, coarse-grained acoustic tokens from semantic tokens, and fine-grained acoustic tokens from coarse-grained tokens.",
       "zh": "AR 类系统中：SpearTTS [1] 用三个 AR 模型依次从文本预测语义 token、从语义 token 预测粗粒度声学 token、再从粗粒度 token 预测细粒度声学 token。"
      },
      {
       "id": "s-2-1-6",
       "original": "VALL-E [2] predicts the first layer of acoustic tokens extracted from EnCodec [26] using an AR codec language model, and the final layers with a NAR model.",
       "zh": "VALL-E [2] 用一个 AR codec 语言模型预测从 EnCodec [26] 提取的声学 token 的第一层，再用一个 NAR 模型预测其余各层。"
      },
      {
       "id": "s-2-1-7",
       "original": "VoiceCraft [5] employs a single AR model to predict multi-layer acoustic tokens in a delayed pattern [27].",
       "zh": "VoiceCraft [5] 用单个 AR 模型以延迟模式（delayed pattern）[27] 预测多层声学 token。"
      },
      {
       "id": "s-2-1-8",
       "original": "BASETTS [3] predicts novel speech codes extracted from WavLM features and uses a GAN model for waveform reconstruction.",
       "zh": "BASETTS [3] 预测从 WavLM 特征中提取的新型语音码，并用 GAN 模型重建波形。"
      },
      {
       "id": "s-2-1-9",
       "original": "For NAR-based systems: NaturalSpeech 2 [7] employs latent diffusion to predict the latent representations from a codec model [28].",
       "zh": "NAR 类系统中：NaturalSpeech 2 [7] 使用潜在扩散来预测 codec 模型 [28] 的潜在表征。"
      },
      {
       "id": "s-2-1-10",
       "original": "VoiceBox [9] uses flow matching and in-context learning to predict mel-spectrograms.",
       "zh": "VoiceBox [9] 使用流匹配和上下文学习来预测 Mel 频谱图。"
      },
      {
       "id": "s-2-1-11",
       "original": "MegaTTS [10] utilizes a GAN to predict mel-spectrograms, while an AR model predicts phone-level prosody codes.",
       "zh": "MegaTTS [10] 用 GAN 预测 Mel 频谱图，另用一个 AR 模型预测音素级韵律码。"
      },
      {
       "id": "s-2-1-12",
       "original": "NaturalSpeech 3 [8] employs a unified framework based on discrete diffusion models to predict discrete representations of different speech attributes.",
       "zh": "NaturalSpeech 3 [8] 采用基于离散扩散模型的统一框架来预测不同语音属性的离散表征。"
      },
      {
       "id": "s-2-1-13",
       "original": "However, these NAR systems need to predict phoneme-level duration, leading to a complex pipeline and more standardized generative results.",
       "zh": "然而，这些 NAR 系统都需要预测音素级时长，导致流水线复杂、生成结果更趋标准化。"
      },
      {
       "id": "s-2-1-14",
       "original": "SimpleSpeech [29], DiTTo-TTS [30], and E2 TTS [31] are also NAR-based models that do not require precise alignment information between text and speech, nor do they predict phoneme-level duration.",
       "zh": "SimpleSpeech [29]、DiTTo-TTS [30] 和 E2 TTS [31] 也是 NAR 模型，它们不需要文本与语音之间的精确对齐信息，也不预测音素级时长。"
      },
      {
       "id": "s-2-1-15",
       "original": "We discuss these concurrent works in Appendix K.",
       "zh": "我们在附录 K 中讨论这些同期工作。"
      }
     ]
    },
    {
     "id": "p-2-2",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-2-2-1",
       "original": "Masked Generative Model.",
       "zh": "掩码生成模型。"
      },
      {
       "id": "s-2-2-2",
       "original": "Masked generative transformers, a class of generative models, achieve significant results and demonstrate potential comparable to or superior to that of autoregressive models or diffusion models in the fields of image [11, 12, 13, 32], video [14, 15], and audio [16, 17, 18, 19] generation.",
       "zh": "掩码生成式 Transformer 作为一类生成模型，在图像 [11, 12, 13, 32]、视频 [14, 15] 和音频 [16, 17, 18, 19] 生成领域取得了显著成果，展现出与自回归模型或扩散模型相当甚至更优的潜力。"
      },
      {
       "id": "s-2-2-3",
       "original": "MaskGIT [11] is the first work to use masked generative models for both unconditional and conditional image generation.",
       "zh": "MaskGIT [11] 是首个把掩码生成模型同时用于无条件与条件图像生成的工作。"
      },
      {
       "id": "s-2-2-4",
       "original": "Subsequently, Muse [12] leverages rich text to achieve highquality and diverse text-to-image generation within the same framework.",
       "zh": "随后，Muse [12] 在同一框架下利用丰富的文本实现了高质量、多样化的文生图。"
      },
      {
       "id": "s-2-2-5",
       "original": "MAGVIT-v2 [15] employs masked generative models with novel lookup-free quantization, outperforming diffusion models in image and video generation.",
       "zh": "MAGVIT-v2 [15] 采用掩码生成模型结合新型免查找量化（lookup-free quantization），在图像与视频生成上超过了扩散模型。"
      },
      {
       "id": "s-2-2-6",
       "original": "Recently, some efforts have been made to adapt masked generative models to the field of audio.",
       "zh": "最近，也有一些工作尝试把掩码生成模型适配到音频领域。"
      },
      {
       "id": "s-2-2-7",
       "original": "SoundStorm [19] takes in the semantic tokens from AudioLM and utilizes this generative paradigm to generate tokens for a neural audio codec [28].",
       "zh": "SoundStorm [19] 接收来自 AudioLM 的语义 token，并利用这种生成范式为神经音频 codec [28] 生成 token。"
      },
      {
       "id": "s-2-2-8",
       "original": "VampNet [16] and MAGNeT [18] apply masked generative models for music and audio generation, while MaskSR [17] extends these models for speech restoration.",
       "zh": "VampNet [16] 和 MAGNeT [18] 把掩码生成模型用于音乐与音频生成，而 MaskSR [17] 把这类模型扩展到语音修复。"
      }
     ]
    },
    {
     "id": "p-2-3",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-2-3-1",
       "original": "Discrete Speech Representation.",
       "zh": "离散语音表征。"
      },
      {
       "id": "s-2-3-2",
       "original": "Speech representation is a crucial aspect of speech generation.",
       "zh": "语音表征是语音生成的关键环节。"
      },
      {
       "id": "s-2-3-3",
       "original": "Early works [22, 24] typically utilized mel-spectrograms as the modeling target.",
       "zh": "早期工作 [22, 24] 通常以 Mel 频谱图为建模目标。"
      },
      {
       "id": "s-2-3-4",
       "original": "Recently, some large-scale TTS systems [2, 8] have shifted to using discrete speech representations.",
       "zh": "最近，一些大规模 TTS 系统 [2, 8] 已转向使用离散语音表征。"
      },
      {
       "id": "s-2-3-5",
       "original": "Discrete speech representation can be primarily divided into two types: semantic discrete representation and acoustic discrete representation1.",
       "zh": "离散语音表征主要可分为两类：语义离散表征与声学离散表征1。"
      },
      {
       "id": "s-2-3-6",
       "original": "Semantic discrete representations are mainly extracted from various speech SSL models [33, 34, 35] using quantization methods such as k-means.",
       "zh": "语义离散表征主要通过对各种语音自监督学习（SSL）模型 [33, 34, 35] 的输出做量化（如 k-means）得到。"
      },
      {
       "id": "s-2-3-7",
       "original": "Acoustic discrete representations, on the other hand, are usually obtained by training a VQ-GAN model [20] with the goal of waveform reconstruction, as seen in speech codecs [26, 28, 36].",
       "zh": "声学离散表征则通常以波形重建为目标训练 VQ-GAN 模型 [20] 得到，典型例子是各类语音 codec [26, 28, 36]。"
      },
      {
       "id": "s-2-3-8",
       "original": "Semantic discrete representation typically shows a stronger correlation with text, whereas acoustic discrete representation more effectively reconstructs audio.",
       "zh": "语义离散表征通常与文本有更强的相关性，而声学离散表征能更好地重建音频。"
      },
      {
       "id": "s-2-3-9",
       "original": "Consequently, some two-stage TTS models predict both semantic and acoustic tokens.",
       "zh": "因此，一些两阶段 TTS 模型会同时预测语义 token 和声学 token。"
      },
      {
       "id": "s-2-3-10",
       "original": "FACodec [8] is a novel speech codec that disentangles speech into subspaces of different attributes, including content, prosody, timbre, and acoustic details.",
       "zh": "FACodec [8] 是一种新型语音 codec，它把语音解耦到不同属性的子空间中，包括内容、韵律、音色和声学细节。"
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
    "original": "Method",
    "zh": "方法"
   },
   "blocks": []
  },
  {
   "id": "sec-3-1",
   "num": "3.1",
   "level": 2,
   "page": 3,
   "title": {
    "original": "Background: Non-Autoregressive Masked Generative Transformer",
    "zh": "背景：非自回归掩码生成式 Transformer"
   },
   "blocks": [
    {
     "id": "p-3-1-1",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-3-1-1-1",
       "original": "Given a discrete representation sequence X of some data, we define Xt = X ⊙Mt as the process of masking a subset of tokens in X with the corresponding binary mask Mt = [mt,i]N i=1.",
       "zh": "给定某数据的离散表征序列 X，我们定义 Xt = X ⊙Mt 为用对应的二值掩码 Mt = [mt,i]N i=1 遮蔽 X 中部分 token 的过程。"
      },
      {
       "id": "s-3-1-1-2",
       "original": "Specifically, this involves replacing xi with a special [MASK] token if mt,i = 1, and otherwise leaving xi unmasked if mt,i = 0.",
       "zh": "具体来说，若 mt,i = 1，则把 xi 替换为特殊的 [MASK] token；若 mt,i = 0，则保持 xi 不变。"
      },
      {
       "id": "s-3-1-1-3",
       "original": "Here, each mt,i is independently and identically distributed according to a Bernoulli distribution with parameter γ(t), where γ(t) ∈(0, 1] represents a mask schedule function 1We give a more detailed discussion about the definitions of “semantic” and “acoustic” in Appendix B.",
       "zh": "这里，每个 mt,i 独立同分布地服从参数为 γ(t) 的伯努利分布，其中 γ(t) ∈(0, 1] 表示掩码调度函数（关于「语义」与「声学」定义的更详细讨论见附录 B）。"
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
       "original": "Prompt Semantic Tokens Semantic Tokens Acoustic Tokens Speech Semantic Codec Speech Acoustic Text-to-Semantic Semantic-to-Acoustic Codec Prompt Speech MaskGCT Text MaskGCT Generated Speech",
       "zh": "（图 2 架构标签：Prompt（语义 token + 声学 token 提示）→ Text-to-Semantic → Semantic-to-Acoustic → 语音；Speech Semantic Codec 与 Speech Acoustic Codec；MaskGCT Text / MaskGCT；生成语音。）"
      }
     ]
    },
    {
     "id": "fig-3-1-1",
     "type": "figure_caption",
     "page": 4,
     "original": "Figure 1: An overview of the proposed two-stage MaskGCT framework. It consists of four main components: (1) a speech semantic representation codec converts speech to semantic tokens; (2) a text-to-semantic model predicts semantic tokens with text and prompt semantic tokens; (3) a semantic-to-acoustic model predicts acoustic tokens conditioned on semantic tokens; (4) a speech acoustic codec reconstructs waveform from acoustic tokens.",
     "zh": "图 1：所提出的两阶段 MaskGCT 框架总览。它由四个主要部分组成：(1) 语音语义表征 codec，把语音转换为语义 token；(2) 文本到语义模型，基于文本和提示语义 token 预测语义 token；(3) 语义到声学模型，以语义 token 为条件预测声学 token；(4) 语音声学 codec，从声学 token 重建波形。"
    },
    {
     "id": "p-3-1-3",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-1-3-1",
       "original": "2T ), t ∈(0, T]).",
       "zh": "（排版残留，例如掩码调度取 γ(t) = sin(πt/2T)），t ∈(0, T]）。"
      },
      {
       "id": "s-3-1-3-2",
       "original": "We denote X0 = X.",
       "zh": "我们记 X0 = X。"
      },
      {
       "id": "s-3-1-3-3",
       "original": "The non-autoregressive masked generative transformers are trained to predict the masked tokens based on the unmasked tokens and a condition C.",
       "zh": "非自回归掩码生成式 Transformer 的训练目标是：基于未被掩蔽的 token 和条件 C 来预测被掩蔽的 token。"
      },
      {
       "id": "s-3-1-3-4",
       "original": "This prediction is modeled as pθ(X0|Xt, C).",
       "zh": "这一预测被建模为 pθ(X0|Xt, C)。"
      },
      {
       "id": "s-3-1-3-5",
       "original": "The parameters θ are optimized to minimize the negative log-likelihood of the masked tokens: (for example, γ(t) = sin( πt",
       "zh": "参数 θ 通过最小化被掩蔽 token 的负对数似然来优化："
      }
     ]
    },
    {
     "id": "eq-3-1-1",
     "type": "equation",
     "page": 4,
     "original": "N X"
    },
    {
     "id": "p-3-1-4",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-1-4-1",
       "original": "Lmask = E X∈D,t∈[0,T ] −",
       "zh": "Lmask = E X∈D,t∈[0,T ] −"
      }
     ]
    },
    {
     "id": "eq-3-1-2",
     "type": "equation",
     "page": 4,
     "original": "i=1 mt,i · log(pθ(xi|Xt, C))."
    },
    {
     "id": "p-3-1-5",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-1-5-1",
       "original": "At the inference stage, we decode the tokens in parallel through iterative decoding.",
       "zh": "在推理阶段，我们通过迭代解码并行地解码 token。"
      },
      {
       "id": "s-3-1-5-2",
       "original": "We start with a fully masked sequence XT .",
       "zh": "从一个全掩蔽序列 XT 开始。"
      },
      {
       "id": "s-3-1-5-3",
       "original": "Assuming the total number of decoding steps is S, for each step i from 1 to S, we first sample ˆX0 from pθ(X0|XT −(i−1)· T S )⌋tokens based on the confidence score to remask, resulting in XT −i· T S , C).",
       "zh": "设总解码步数为 S，对从 1 到 S 的每一步 i，我们先从 pθ(X0|XT −(i−1)· T S , C)（公式残片，其语义为：按置信度挑选若干 token 重新掩蔽，得到 XT −i· T S）中采样 ˆX0。"
      },
      {
       "id": "s-3-1-5-4",
       "original": "Then, we sample ⌊N · γ(T −i · T in X.",
       "zh": "然后，我们对 X 中的 ⌊N · γ(T −i · T S )⌋ 个 token 重新掩蔽。"
      },
      {
       "id": "s-3-1-5-5",
       "original": "The confidence score for ˆxi in ˆX0 is assigned to pθ(X0|XT −(i−1)· T S , where N is the total number of tokens S ,i is a [MASK] token; otherwise, we set the confidence score of ˆxi to 1, indicating that tokens already unmasked in XT −(i−1)· T",
       "zh": "ˆX0 中 ˆxi 的置信度取自 pθ(X0|XT −(i−1)· T S , C)（N 为 token 总数；若对应位置是 [MASK] token，则置信度设为模型输出概率；否则把 ˆxi 的置信度设为 1，表示已在 XT −(i−1)· T S 中解掩的 token"
      }
     ]
    },
    {
     "id": "eq-3-1-3",
     "type": "equation",
     "page": 4,
     "original": "S , C) if xT −(i−1)· T"
    },
    {
     "id": "p-3-1-6",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-1-6-1",
       "original": "S will not be remasked.",
       "zh": "不会再被重新掩蔽。"
      },
      {
       "id": "s-3-1-6-2",
       "original": "Particularly, we choose ⌊N · γ(T −i · T S )⌋tokens with the lowest confidence scores to be masked.",
       "zh": "具体而言，我们选取置信度最低的 ⌊N · γ(T −i · T S )⌋ 个 token 进行掩蔽。"
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
       "original": "The masked generative modeling paradigm was first introduced in [11], and subsequent work such as [32] has further explored it under the perspective of discrete diffusion.",
       "zh": "掩码生成建模范式最早由 [11] 提出，[32] 等后续工作又从离散扩散的视角对其做了进一步探索。"
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
    "original": "Model Overview",
    "zh": "模型总览"
   },
   "blocks": [
    {
     "id": "p-3-2-1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-2-1-1",
       "original": "An overview of the MaskGCT framework is presented in Figure 1.",
       "zh": "Figure 1 展示了 MaskGCT 框架的总览。"
      },
      {
       "id": "s-3-2-1-2",
       "original": "Following [2, 19, 37], MaskGCT is a two-stage TTS system.",
       "zh": "沿用 [2, 19, 37]，MaskGCT 是一个两阶段 TTS 系统。"
      },
      {
       "id": "s-3-2-1-3",
       "original": "The first stage uses text to predict speech semantic representation tokens, which contain most information of content and partial information of prosody.",
       "zh": "第一阶段用文本预测语音语义表征 token，其中包含大部分内容信息和部分韵律信息。"
      },
      {
       "id": "s-3-2-1-4",
       "original": "The second stage model is trained to learn more acoustic information.",
       "zh": "第二阶段模型则学习更丰富的声学信息。"
      },
      {
       "id": "s-3-2-1-5",
       "original": "Unlike previous works [1, 2, 19, 37] use an autoregressive model for the first stage, MaskGCT utilizes the non-autoregressive masked generative modeling paradigm for both the two stages without text-speech alignment supervision and phone-level duration prediction: (1) For the first stage model, we trained a model to learn pθs1(S|St, (Sp, P)), where S is the speech semantic representation token sequence obtained from a speech semantic representation codec (we introduce in 3.2.1), Sp is the prompt semantic token sequence, and P is the text token sequence.",
       "zh": "与先前工作 [1, 2, 19, 37] 在第一阶段使用自回归模型不同，MaskGCT 两个阶段都采用非自回归的掩码生成建模范式，且不需要文本-语音对齐监督和音素级时长预测：(1) 对第一阶段模型，我们训练模型学习 pθs1(S|St, (Sp, P))，其中 S 是来自语音语义表征 codec（见 3.2.1）的语音语义表征 token 序列，Sp 是提示语义 token 序列，P 是文本 token 序列。"
      },
      {
       "id": "s-3-2-1-6",
       "original": "Sp and P are the condition for the first stage model.",
       "zh": "Sp 和 P 是第一阶段模型的条件。"
      },
      {
       "id": "s-3-2-1-7",
       "original": "(2) The second stage model is trained to learn pθs2(A|At, (Ap, S)), where A is the multi-layer acoustic token sequence from a speech acoustic codec like [26, 28].",
       "zh": "(2) 第二阶段模型学习 pθs2(A|At, (Ap, S))，其中 A 是来自语音声学 codec（如 [26, 28]）的多层声学 token 序列。"
      },
      {
       "id": "s-3-2-1-8",
       "original": "Our second stage model is similar to SoundStorm [19].",
       "zh": "我们的第二阶段模型与 SoundStorm [19] 类似。"
      },
      {
       "id": "s-3-2-1-9",
       "original": "We give more details about the four parts in the following sections.",
       "zh": "下面几节将分别介绍这四个部分的更多细节。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-3-2-1",
   "num": "3.2.1",
   "level": 2,
   "page": 4,
   "title": {
    "original": "Speech Semantic Representation Codec",
    "zh": "语音语义表征 Codec"
   },
   "blocks": [
    {
     "id": "p-3-2-1-1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-2-1-1-1",
       "original": "Discrete speech representations can be divided into semantic tokens and acoustic tokens.",
       "zh": "离散语音表征可分为语义 token 与声学 token。"
      },
      {
       "id": "s-3-2-1-1-2",
       "original": "Generally, semantic tokens are obtained by discretizing features from speech self-supervised learning (SSL).",
       "zh": "一般而言，语义 token 通过离散化语音自监督学习（SSL）模型的特征获得。"
      },
      {
       "id": "s-3-2-1-1-3",
       "original": "Previous two-stage, large-scale TTS systems [1, 19, 37] typically first use text to predict semantic tokens, and then employ another model to predict acoustic tokens or features.",
       "zh": "此前的两阶段大规模 TTS 系统 [1, 19, 37] 通常先用文本预测语义 token，再用另一个模型预测声学 token 或声学特征。"
      },
      {
       "id": "s-3-2-1-1-4",
       "original": "This is because semantic tokens have a stronger correlation with text or phonemes, which makes predicting them more straightforward than directly predicting acoustic tokens.",
       "zh": "这是因为语义 token 与文本或音素有更强的相关性，预测它们比直接预测声学 token 更容易。"
      },
      {
       "id": "s-3-2-1-1-5",
       "original": "Commonly, previous works have used k-means to discretize semantic features to obtain semantic tokens; however, this method can lead to a loss of information.",
       "zh": "以往工作普遍用 k-means 离散化语义特征来得到语义 token；但这种方法会造成信息损失。"
      },
      {
       "id": "s-3-2-1-1-6",
       "original": "This loss may complicate the accurate reconstruction of high-quality speech or the precise prediction of acoustic tokens, especially for tonally rich languages.",
       "zh": "这种损失可能使高质量语音的精确重建或声学 token 的精确预测变得困难，对声调丰富的语言尤其如此。"
      },
      {
       "id": "s-3-2-1-1-7",
       "original": "For example, our early experiments demonstrate the challenges of accurately predicting acoustic tokens to achieve proper prosody for Chinese using semantic tokens obtained via k-means.",
       "zh": "例如，我们的早期实验表明：使用 k-means 得到的语义 token 很难准确预测声学 token 来获得正确的中文韵律。"
      },
      {
       "id": "s-3-2-1-1-8",
       "original": "Therefore, we need to discretize semantic representation features while minimizing information loss.",
       "zh": "因此，我们需要在离散化语义表征特征的同时尽量减小信息损失。"
      },
      {
       "id": "s-3-2-1-1-9",
       "original": "Inspired by [38], we train a VQ-VAE model to learn a vector quantization codebook that reconstructs speech semantic representations from a speech SSL model.",
       "zh": "受 [38] 启发，我们训练一个 VQ-VAE 模型，学习一个向量量化码本来重建语音 SSL 模型的语义表征。"
      },
      {
       "id": "s-3-2-1-1-10",
       "original": "For a speech semantic representation sequence S ∈RT ×d, the vector quantizer quantizes the output of the encoder E(S) to E, and the decoder reconstructs E back to ˆS.",
       "zh": "对于语音语义表征序列 S ∈RT ×d，向量量化器把编码器输出 E(S) 量化为 E，解码器再把 E 重建回 ˆS。"
      },
      {
       "id": "s-3-2-1-1-11",
       "original": "We optimize the encoder and the decoder using a reconstruction loss between S and ˆS, employ codebook loss to optimize the codebook and use commitment loss to optimize the encoder with the straight-through method [20].",
       "zh": "我们用 S 与 ˆS 之间的重建损失优化编码器和解码器，用码本损失优化码本，并配合直通估计（straight-through）方法 [20] 用承诺损失优化编码器。"
      },
      {
       "id": "s-3-2-1-1-12",
       "original": "The total loss for training the semantic representation codec can be written as:",
       "zh": "训练语义表征 codec 的总损失可写为："
      }
     ]
    },
    {
     "id": "p-3-2-1-2",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-3-2-1-2-1",
       "original": "Ltotal = 1",
       "zh": "Ltotal = 1"
      }
     ]
    },
    {
     "id": "eq-3-2-1-1",
     "type": "equation",
     "page": 5,
     "original": "Td(λrec · ||S −ˆS||1 + λcodebook · ||sg(E(S)) −E||2 + λcommit · ||sg(E) −E(S)||2)."
    },
    {
     "id": "p-3-2-1-3",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-3-2-1-3-1",
       "original": "where sg means stop-gradient.",
       "zh": "其中 sg 表示停止梯度（stop-gradient）。"
      }
     ]
    },
    {
     "id": "p-3-2-1-4",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-3-2-1-4-1",
       "original": "In detail, we utilize the hidden states from the 17th layer of W2v-BERT 2.0 [33] as the semantic features for our speech encoder.",
       "zh": "具体而言，我们使用 W2v-BERT 2.0 [33] 第 17 层的隐状态作为语音编码器的语义特征。"
      },
      {
       "id": "s-3-2-1-4-2",
       "original": "The encoder and decoder are composed of multiple ConvNext [39] blocks.",
       "zh": "编码器与解码器由多个 ConvNext [39] 块组成。"
      },
      {
       "id": "s-3-2-1-4-3",
       "original": "Following the methods of improved VQ-GAN [40] and DAC [36], we use factorized codes to project the output of the encoder into a low-dimensional latent variable space.",
       "zh": "沿用改进版 VQ-GAN [40] 和 DAC [36] 的做法，我们用分解式编码（factorized codes）把编码器输出投影到低维潜变量空间。"
      },
      {
       "id": "s-3-2-1-4-4",
       "original": "The codebook contains 8,192 entries, each of dimension 8.",
       "zh": "码本包含 8,192 个条目，每个条目维度为 8。"
      },
      {
       "id": "s-3-2-1-4-5",
       "original": "Further details about the model architecture are provided in Appendix A.4.",
       "zh": "模型架构的更多细节见附录 A.4。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-3-2-2",
   "num": "3.2.2",
   "level": 2,
   "page": 5,
   "title": {
    "original": "Text-to-Semantic Model",
    "zh": "文本到语义模型"
   },
   "blocks": [
    {
     "id": "p-3-2-2-1",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-3-2-2-1-1",
       "original": "Based on the previous discussion, we employ a non-autoregressive masked generative transformer to train a text-to-semantic (T2S) model, instead of using an autoregressive model or any text-to-speech alignment information.",
       "zh": "基于前面的讨论，我们采用非自回归掩码生成式 Transformer 来训练文本到语义（T2S）模型，而不是使用自回归模型或任何文本-语音对齐信息。"
      },
      {
       "id": "s-3-2-2-1-2",
       "original": "During training, we randomly extract a portion of the prefix of the semantic token sequence as the prompt, denoted as Sp.",
       "zh": "训练时，我们随机截取语义 token 序列的一段前缀作为提示，记为 Sp。"
      },
      {
       "id": "s-3-2-2-1-3",
       "original": "We then concatenate the text token sequence P with Sp to form the condition.",
       "zh": "然后把文本 token 序列 P 与 Sp 拼接构成条件。"
      },
      {
       "id": "s-3-2-2-1-4",
       "original": "We simply add (P, Sp) as the prefix sequence to the input masked semantic token sequence St to leverage the in-context learning ability of language models.",
       "zh": "我们直接把 (P, Sp) 作为前缀序列拼接到被掩蔽的语义 token 序列 St 的输入上，以利用语言模型的上下文学习能力。"
      },
      {
       "id": "s-3-2-2-1-5",
       "original": "We use a Llama-style [41] transformer as the backbone of our model, incorporating gated linear units with GELU [42] activation, rotation position encoding [43], etc., but replacing causal attention with bidirectional attention.",
       "zh": "我们使用 Llama 风格 [41] 的 Transformer 作为模型骨干，结合带 GELU [42] 激活的门控线性单元、旋转位置编码 [43] 等，但把因果注意力替换为双向注意力。"
      },
      {
       "id": "s-3-2-2-1-6",
       "original": "We also use adaptive RMSNorm [44], which accepts the time step t as the condition.",
       "zh": "我们还使用自适应 RMSNorm [44]，它接受时间步 t 作为条件。"
      }
     ]
    },
    {
     "id": "p-3-2-2-2",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-3-2-2-2-1",
       "original": "During inference, we generate the target semantic token sequence of any specified length conditioned on the text and the prompt semantic token sequence.",
       "zh": "推理时，我们在文本和提示语义 token 序列的条件下，生成任意指定长度的目标语义 token 序列。"
      },
      {
       "id": "s-3-2-2-2-2",
       "original": "In this paper, we also train a flow matching [45] based duration prediction model to predict the total duration conditioned on the text and prompt speech duration, leveraging in-context learning.",
       "zh": "本文还训练了一个基于流匹配 [45] 的时长预测模型，在文本和提示语音时长的条件下预测总时长，利用了上下文学习。"
      },
      {
       "id": "s-3-2-2-2-3",
       "original": "More details can be found in Appendix A.5.",
       "zh": "更多细节见附录 A.5。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-3-2-3",
   "num": "3.2.3",
   "level": 2,
   "page": 5,
   "title": {
    "original": "Semantic-to-Acoustic Model",
    "zh": "语义到声学模型"
   },
   "blocks": [
    {
     "id": "p-3-2-3-1",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-3-2-3-1-1",
       "original": "We also train a semantic-to-acoustic (S2A) model using a masked generative codec transformer conditioned on the semantic tokens.",
       "zh": "我们同样用掩码生成式 Codec Transformer 训练一个以语义 token 为条件的语义到声学（S2A）模型。"
      },
      {
       "id": "s-3-2-3-1-2",
       "original": "Our semantic-to-acoustic model is based on SoundStorm [19], which generates multi-layer acoustic token sequences.",
       "zh": "我们的语义到声学模型基于 SoundStorm [19]，生成多层声学 token 序列。"
      },
      {
       "id": "s-3-2-3-1-3",
       "original": "Given N layers of the acoustic token sequence A1:N, during training, we select one layer j from 1 to N.",
       "zh": "给定声学 token 序列的 N 层 A1:N，训练时我们从 1 到 N 中选取一层 j。"
      },
      {
       "id": "s-3-2-3-1-4",
       "original": "We denote the jth layer of the acoustic token sequence as Aj.",
       "zh": "我们把声学 token 序列的第 j 层记为 Aj。"
      },
      {
       "id": "s-3-2-3-1-5",
       "original": "Following the previous discussion, we mask Aj at the timestep t to get Aj t.",
       "zh": "沿用前面的讨论，我们在时间步 t 掩蔽 Aj 得到 Aj t。"
      },
      {
       "id": "s-3-2-3-1-6",
       "original": "The model is then trained to predict Aj conditioned on the prompt Ap, the corresponding semantic token sequence S, and all the layers smaller than j of the acoustic tokens.",
       "zh": "模型学习在提示 Ap、对应语义 token 序列 S、以及声学 token 所有小于 j 的各层的条件下预测 Aj。"
      },
      {
       "id": "s-3-2-3-1-7",
       "original": "This can be formulated as pθs2a(Aj|Aj t, (Ap, S, A1:j−1)).",
       "zh": "这可形式化为 pθs2a(Aj|Aj t, (Ap, S, A1:j−1))。"
      },
      {
       "id": "s-3-2-3-1-8",
       "original": "We sample j according to a linear schedule p(j) = 1 − 2j N(N+1).",
       "zh": "我们按线性调度 p(j) = 1 − 2j N(N+1) 采样 j。"
      },
      {
       "id": "s-3-2-3-1-9",
       "original": "For the input of the S2A model, since the number of frames in the semantic token sequence is equal to the sum of the frames in the prompt acoustic sequence and the target acoustic sequence, we simply sum the embeddings of the semantic tokens and the embeddings of the acoustic tokens from layer 1 to j.",
       "zh": "对 S2A 模型的输入而言，由于语义 token 序列的帧数等于提示声学序列与目标声学序列帧数之和，我们直接把语义 token 的 embedding 与第 1 到 j 层声学 token 的 embedding 相加。"
      },
      {
       "id": "s-3-2-3-1-10",
       "original": "During inference, we generate tokens for each layer from coarse to fine, using iterative parallel decoding within each layer.",
       "zh": "推理时，我们从粗到细逐层生成 token，每一层内部使用迭代式并行解码。"
      },
      {
       "id": "s-3-2-3-1-11",
       "original": "Figure 2 shows a simplified training diagram of the T2S and S2A models.",
       "zh": "Figure 2 展示了 T2S 和 S2A 模型的简化训练示意图。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-3-2-4",
   "num": "3.2.4",
   "level": 2,
   "page": 5,
   "title": {
    "original": "Speech Acoustic Codec",
    "zh": "语音声学 Codec"
   },
   "blocks": [
    {
     "id": "p-3-2-4-1",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-3-2-4-1-1",
       "original": "Speech acoustic codec is trained to quantize speech waveform to multi-layer discrete tokens while aiming to preserve all the information of the speech as soon as possible.",
       "zh": "语音声学 codec 的训练目标是：在尽可能保留语音全部信息的前提下，把语音波形量化为多层离散 token。"
      },
      {
       "id": "s-3-2-4-1-2",
       "original": "We follow the residual vector Text-to-Semantic MaskGCT Masking Text Prompt Semantic Tokens Target Semantic Tokens Semantic-to-Acoustic MaskGCT Selected Layer Prompt Acoustic Tokens Target Acoustic Tokens",
       "zh": "我们沿用残差向量（原文排版与 Figure 2 图内文字混排，图内文字为：文本到语义 MaskGCT、掩蔽、文本、提示语义 token、目标语义 token；语义到声学 MaskGCT、选中层、提示声学 token、目标声学 token）"
      }
     ]
    },
    {
     "id": "fig-3-2-4-1",
     "type": "figure_caption",
     "page": 6,
     "original": "Figure 2: An overview of training diagram of the T2S (left) and S2A (right) models. The T2S model is trained to predict masked semantic tokens with text and prompt semantic tokens as the prefix. The S2A model is trained to predict masked acoustic tokens of a random layer conditioned on prompt acoustic tokens, semantic tokens, and acoustic tokens of the previous layers.",
     "zh": "图 2：T2S（左）与 S2A（右）模型的训练示意图。T2S 模型学习以文本和提示语义 token 为前缀来预测被掩蔽的语义 token；S2A 模型学习在提示声学 token、语义 token 以及前面若干层声学 token 的条件下，预测随机选中一层的被掩蔽声学 token。"
    },
    {
     "id": "p-3-2-4-2",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-3-2-4-2-1",
       "original": "quantization (RVQ) method to compress the 24K sampling rate speech waveform into discrete tokens of 12 layers.",
       "zh": "量化（RVQ）方法，把 24K 采样率的语音波形压缩为 12 层离散 token。"
      },
      {
       "id": "s-3-2-4-2-2",
       "original": "The codebook size of each layer is 1,024 and the codebook dimension is 8.",
       "zh": "每层码本大小为 1,024，码本维度为 8。"
      },
      {
       "id": "s-3-2-4-2-3",
       "original": "The model architectures, discriminators, and training losses follow DAC [36], except that we use the Vocos [46] architecture as the decoder for more efficient training and inference.",
       "zh": "模型架构、判别器与训练损失沿用 DAC [36]，不同之处在于我们使用 Vocos [46] 架构作为解码器，以获得更高效的训练与推理。"
      },
      {
       "id": "s-3-2-4-2-4",
       "original": "Figure 5 shows the comparison between the semantic codec and acoustic codec.",
       "zh": "Figure 5 给出了语义 codec 与声学 codec 的对比。"
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
    "original": "Other Applications",
    "zh": "其他应用"
   },
   "blocks": [
    {
     "id": "p-3-3-1",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-3-3-1-1",
       "original": "MaskGCT can accomplish tasks beyond zero-shot TTS, such as duration-controllable speech translation (cross-lingual dubbing), emotion control, speech content editing, and voice conversion with simple modifications or the assistance of external tools, demonstrating the potential of MaskGCT as a foundational model for speech generation.",
       "zh": "MaskGCT 还能完成零样本 TTS 之外的任务，例如时长可控的语音翻译（跨语言配音）、情感控制、语音内容编辑和声音转换，只需简单修改或借助外部工具，展示了 MaskGCT 作为语音生成基础模型的潜力。"
      },
      {
       "id": "s-3-3-1-2",
       "original": "We provide more details in Appendix F, G, H, I.",
       "zh": "更多细节见附录 F、G、H、I。"
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
    "original": "Experiments and Results",
    "zh": "实验与结果"
   },
   "blocks": []
  },
  {
   "id": "sec-4-1",
   "num": "4.1",
   "level": 2,
   "page": 6,
   "title": {
    "original": "Experimental Settings",
    "zh": "实验设置"
   },
   "blocks": [
    {
     "id": "p-4-1-1",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-4-1-1-1",
       "original": "Datasets.",
       "zh": "数据集。"
      },
      {
       "id": "s-4-1-1-2",
       "original": "We use the Emilia [47] dataset to train our models.",
       "zh": "我们使用 Emilia [47] 数据集训练模型。"
      },
      {
       "id": "s-4-1-1-3",
       "original": "Emilia is a multilingual and diverse in-the-wild speech dataset designed for large-scale speech generation.",
       "zh": "Emilia 是一个专为大规模语音生成设计的多语言、多样化真实场景语音数据集。"
      },
      {
       "id": "s-4-1-1-4",
       "original": "In this work, we use English and Chinese data from Emilia, each with 50K hours of speech (totaling 100K hours).",
       "zh": "本文使用 Emilia 中的英文和中文数据，各 50K 小时（合计 100K 小时）。"
      },
      {
       "id": "s-4-1-1-5",
       "original": "We evaluate our zero-shot TTS models with three benchmarks: (1) LibriSpeech [48] test-clean, a widely used test set for English zero-shot TTS.",
       "zh": "我们用三个基准评估零样本 TTS 模型：(1) LibriSpeech [48] test-clean，英文零样本 TTS 广泛使用的测试集。"
      },
      {
       "id": "s-4-1-1-6",
       "original": "(2) SeedTTS test-en, a test set introduced in Seed-TTS [6] of samples extracted from English public corpora, includes 1,000 samples from the Common Voice dataset [49].",
       "zh": "(2) SeedTTS test-en，Seed-TTS [6] 提出的测试集，样本取自英文公开语料，包含来自 Common Voice 数据集 [49] 的 1,000 条样本。"
      },
      {
       "id": "s-4-1-1-7",
       "original": "(3) SeedTTS test-zh, a test set introduced in Seed-TTS of samples extracted from Chinese public corpora, includes 2,000 samples from the DiDiSpeech dataset [50].",
       "zh": "(3) SeedTTS test-zh，Seed-TTS 提出的测试集，样本取自中文公开语料，包含来自 DiDiSpeech 数据集 [50] 的 2,000 条样本。"
      },
      {
       "id": "s-4-1-1-8",
       "original": "We also scale the training dataset to six languages to support multilingual zero-shot TTS.",
       "zh": "我们还将训练数据扩展到六种语言，以支持多语言零样本 TTS。"
      },
      {
       "id": "s-4-1-1-9",
       "original": "We provide additional experimental details and evaluation results about multilingual zero-shot TTS in Appendix E.",
       "zh": "多语言零样本 TTS 的更多实验细节与评估结果见附录 E。"
      }
     ]
    },
    {
     "id": "p-4-1-2",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-4-1-2-1",
       "original": "Evaluation Metrics.",
       "zh": "评估指标。"
      },
      {
       "id": "s-4-1-2-2",
       "original": "We use both objective and subjective metrics to evaluate our models.",
       "zh": "我们同时使用客观与主观指标评估模型。"
      },
      {
       "id": "s-4-1-2-3",
       "original": "For the objective metrics, we evaluate speaker similarity (SIM-O), robustness (WER), and speech quality (FSD).",
       "zh": "客观指标方面，我们评估说话人相似度（SIM-O）、鲁棒性（WER）和语音质量（FSD）。"
      },
      {
       "id": "s-4-1-2-4",
       "original": "Specifically, for speaker similarity, we compute the cosine similarity between the WavLM TDNN2 [35] speaker embedding of generated samples and the prompt.",
       "zh": "具体来说，说话人相似度通过计算生成样本与提示的 WavLM TDNN2 [35] 说话人 embedding 之间的余弦相似度得到。"
      },
      {
       "id": "s-4-1-2-5",
       "original": "For Word Error Rate (WER), we use a HuBERT-based3 ASR model for LibriSpeech test-clean, Whisper-large-v3 for Seed-TTS test-en, and Paraformer-zh for Seed-TTS test-zh, following previous works.",
       "zh": "词错误率（WER）方面，沿用先前工作：LibriSpeech test-clean 用基于 HuBERT3 的 ASR 模型，Seed-TTS test-en 用 Whisper-large-v3，Seed-TTS test-zh 用 Paraformer-zh。"
      },
      {
       "id": "s-4-1-2-6",
       "original": "For speech quality, we use Fréchet Speech Distance (FSD) with self-supervised wav2vec 2.0 [51] features, following [9].",
       "zh": "语音质量方面，沿用 [9]，我们用基于自监督 wav2vec 2.0 [51] 特征的 Fréchet Speech Distance（FSD）。"
      },
      {
       "id": "s-4-1-2-7",
       "original": "For the subjective metrics, comparative mean option score (CMOS) and similarity mean option score (SMOS) are used to evaluate naturalness and similarity, respectively.",
       "zh": "主观指标方面，分别用对比平均意见分（CMOS）和相似度平均意见分（SMOS）评估自然度与相似度。"
      },
      {
       "id": "s-4-1-2-8",
       "original": "CMOS is on a scale of -3 to 3, and SMOS is on a scale of 1 to 5.",
       "zh": "CMOS 的取值范围是 -3 到 3，SMOS 的取值范围是 1 到 5。"
      }
     ]
    },
    {
     "id": "p-4-1-3",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-4-1-3-1",
       "original": "Baseline.",
       "zh": "基线。"
      },
      {
       "id": "s-4-1-3-2",
       "original": "We compare our models with state-of-the-art zero-shot TTS systems, including NaturalSpeech 3 [8], VALL-E [2], VoiceBox [9], VoiceCraft [5], XTTS-v2 [52], and CosyVoice [53].",
       "zh": "我们将模型与最先进的零样本 TTS 系统对比，包括 NaturalSpeech 3 [8]、VALL-E [2]、VoiceBox [9]、VoiceCraft [5]、XTTS-v2 [52] 和 CosyVoice [53]。"
      },
      {
       "id": "s-4-1-3-3",
       "original": "More 2https://github.com/microsoft/UniSpeech/tree/main/downstreams/speaker_ verification 3https://huggingface.co/facebook/hubert-large-ls960-ft",
       "zh": "更多（原文脚注残留，原文为：2https://github.com/microsoft/UniSpeech/tree/main/downstreams/speaker_ verification，3https://huggingface.co/facebook/hubert-large-ls960-ft）"
      }
     ]
    },
    {
     "id": "tab-4-1-1",
     "type": "table_caption",
     "page": 7,
     "original": "Table 2: Evaluation results for MaskGCT and the baseline methods on LibriSpeech test-clean, SeedTTS test-en, SeedTTS test-zh. The boldface denotes the best result, the underline denotes the second best. gt length denotes the result obtained by using ground truth total speech length. The results in ‘()’ means the result is the best one selected from five random samples (rerank 5).",
     "zh": "表 2：MaskGCT 与基线方法在 LibriSpeech test-clean、SeedTTS test-en、SeedTTS test-zh 上的评估结果。粗体表示最优结果，下划线表示次优。gt length 表示使用真实语音总长度得到的结果。「()」中的结果表示从 5 个随机样本中选出的最佳结果（rerank 5）。"
    }
   ]
  },
  {
   "id": "sec-system",
   "num": null,
   "level": 2,
   "page": 7,
   "title": {
    "original": "System",
    "zh": "System"
   },
   "blocks": [
    {
     "id": "p-system-1",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-system-1-1",
       "original": "SIM-O ↑ WER ↓ FSD ↓ SMOS ↑ CMOS ↑ LibriSpeech test-clean Ground Truth",
       "zh": "(3) 它在三个基准上的 WER 与真人相当，且在合理的语音时长范围内表现稳定，这也说明生成语音兼具多样性与可控性。"
      }
     ]
    },
    {
     "id": "eq-system-1",
     "type": "equation",
     "page": 7,
     "original": "0.68 1.94 - 4.05±0.12 0.00"
    },
    {
     "id": "eq-system-2",
     "type": "equation",
     "page": 7,
     "original": "VALL-E [2]"
    },
    {
     "id": "eq-system-3",
     "type": "equation",
     "page": 7,
     "original": "0.50 5.90 - 3.47±0.26 -0.52±0.22"
    },
    {
     "id": "eq-system-4",
     "type": "equation",
     "page": 7,
     "original": "VoiceBox [9]"
    },
    {
     "id": "eq-system-5",
     "type": "equation",
     "page": 7,
     "original": "0.64 2.03 0.762 3.80±0.17 -0.41±0.13"
    },
    {
     "id": "eq-system-6",
     "type": "equation",
     "page": 7,
     "original": "NaturalSpeech 3 [8]"
    },
    {
     "id": "eq-system-7",
     "type": "equation",
     "page": 7,
     "original": "0.67 1.94 0.786 4.26±0.10 0.16±0.14"
    },
    {
     "id": "eq-system-8",
     "type": "equation",
     "page": 7,
     "original": "VoiceCraft [5]"
    },
    {
     "id": "eq-system-9",
     "type": "equation",
     "page": 7,
     "original": "0.45 4.68 0.981 3.52±0.21 -0.33±0.16"
    },
    {
     "id": "eq-system-10",
     "type": "equation",
     "page": 7,
     "original": "XTTS-v2 [52]"
    },
    {
     "id": "eq-system-11",
     "type": "equation",
     "page": 7,
     "original": "0.51 4.20 0.945 3.02±0.22 -0.98±0.19"
    },
    {
     "id": "eq-system-12",
     "type": "equation",
     "page": 7,
     "original": "MaskGCT"
    },
    {
     "id": "eq-system-13",
     "type": "equation",
     "page": 7,
     "original": "0.687(0.723) 2.634(1.976) 0.886 4.27±0.14 0.10±0.16"
    },
    {
     "id": "eq-system-14",
     "type": "equation",
     "page": 7,
     "original": "MaskGCT (gt length)"
    },
    {
     "id": "eq-system-15",
     "type": "equation",
     "page": 7,
     "original": "0.697 2.012 0.746 4.33±0.11 0.13±0.13"
    },
    {
     "id": "eq-system-16",
     "type": "equation",
     "page": 7,
     "original": "SeedTTS test-en Ground Truth"
    },
    {
     "id": "eq-system-17",
     "type": "equation",
     "page": 7,
     "original": "0.730 2.143 - 3.92±0.15 0.00"
    },
    {
     "id": "eq-system-18",
     "type": "equation",
     "page": 7,
     "original": "CosyVoice [53]"
    },
    {
     "id": "eq-system-19",
     "type": "equation",
     "page": 7,
     "original": "0.643 4.079 0.316 3.52±0.17 -0.41±0.18"
    },
    {
     "id": "eq-system-20",
     "type": "equation",
     "page": 7,
     "original": "XTTS-v2 [52]"
    },
    {
     "id": "eq-system-21",
     "type": "equation",
     "page": 7,
     "original": "0.463 3.248 0.484 3.15±0.22 -0.86±0.19"
    },
    {
     "id": "eq-system-22",
     "type": "equation",
     "page": 7,
     "original": "VoiceCraft [5]"
    },
    {
     "id": "eq-system-23",
     "type": "equation",
     "page": 7,
     "original": "0.470 7.556 0.226 3.18±0.20 -1.08±0.15"
    },
    {
     "id": "eq-system-24",
     "type": "equation",
     "page": 7,
     "original": "MaskGCT"
    },
    {
     "id": "eq-system-25",
     "type": "equation",
     "page": 7,
     "original": "0.717(0.760) 2.623(1.283) 0.188 4.24±0.12 0.03±0.14"
    },
    {
     "id": "eq-system-26",
     "type": "equation",
     "page": 7,
     "original": "MaskGCT (gt length)"
    },
    {
     "id": "eq-system-27",
     "type": "equation",
     "page": 7,
     "original": "0.728 2.466 0.159 4.13±0.17 0.12±0.15"
    },
    {
     "id": "eq-system-28",
     "type": "equation",
     "page": 7,
     "original": "SeedTTS test-zh Ground Truth"
    },
    {
     "id": "eq-system-29",
     "type": "equation",
     "page": 7,
     "original": "0.750 1.254 - 3.86±0.17 0.00"
    },
    {
     "id": "eq-system-30",
     "type": "equation",
     "page": 7,
     "original": "CosyVoice [53]"
    },
    {
     "id": "eq-system-31",
     "type": "equation",
     "page": 7,
     "original": "0.750 4.089 0.276 3.54±0.12 -0.45±0.15"
    },
    {
     "id": "eq-system-32",
     "type": "equation",
     "page": 7,
     "original": "XTTS-v2 [52]"
    },
    {
     "id": "eq-system-33",
     "type": "equation",
     "page": 7,
     "original": "0.635 2.876 0.413 2.95±0.18 -0.81±0.22"
    },
    {
     "id": "eq-system-34",
     "type": "equation",
     "page": 7,
     "original": "MaskGCT"
    },
    {
     "id": "eq-system-35",
     "type": "equation",
     "page": 7,
     "original": "0.774(0.805) 2.273(0.843) 0.106 4.09±0.12 0.05±0.17"
    },
    {
     "id": "eq-system-36",
     "type": "equation",
     "page": 7,
     "original": "MaskGCT (gt length)"
    },
    {
     "id": "eq-system-37",
     "type": "equation",
     "page": 7,
     "original": "0.777 2.183 0.101 4.11±0.12 0.08±0.18"
    },
    {
     "id": "p-system-2",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-system-2-1",
       "original": "details of each model can be found in Appendix D.",
       "zh": "（正文残句）各模型细节见附录 D。"
      },
      {
       "id": "s-system-2-2",
       "original": "We also train an AR-based T2S model to replace the T2S part of MaskGCT, we term it as AR + SoundStorm.",
       "zh": "我们还训练了一个基于 AR 的 T2S 模型来替换 MaskGCT 的 T2S 部分，记为 AR + SoundStorm。"
      }
     ]
    },
    {
     "id": "p-system-3",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-system-3-1",
       "original": "Training.",
       "zh": "训练。"
      },
      {
       "id": "s-system-3-2",
       "original": "We train all models on 8 NVIDIA A100 80GB GPUs.",
       "zh": "所有模型均在 8 张 NVIDIA A100 80GB GPU 上训练。"
      },
      {
       "id": "s-system-3-3",
       "original": "We train two T2S models of different sizes (denoted as T2S-Base and T2S-large).",
       "zh": "我们训练了两个不同规模的 T2S 模型（记为 T2S-Base 和 T2S-large）。"
      },
      {
       "id": "s-system-3-4",
       "original": "For more details about the model architecture, please refer to Appendix A.1.",
       "zh": "模型架构的更多细节见附录 A.1。"
      },
      {
       "id": "s-system-3-5",
       "original": "We report the metrics of T2S-large by default, and you can find a comparison of model sizes in Section 4.4.",
       "zh": "默认报告 T2S-large 的指标，模型规模对比见 Section 4.4。"
      },
      {
       "id": "s-system-3-6",
       "original": "We also compare two different methods of text tokenization: Grapheme-to-Phoneme (G2P) [54] and Byte Pair Encoding (BPE) [55].",
       "zh": "我们还对比了两种文本分词方法：字位转音素（G2P）[54] 和 BPE [55]。"
      },
      {
       "id": "s-system-3-7",
       "original": "See more details of the two methods in Appendix A.6.",
       "zh": "两种方法的更多细节见附录 A.6。"
      },
      {
       "id": "s-system-3-8",
       "original": "We report the metrics of G2P by default.",
       "zh": "默认报告 G2P 的指标。"
      },
      {
       "id": "s-system-3-9",
       "original": "We optimize these models with the AdamW [56] optimizer with a learning rate of 1e-4 and 32K warmup steps, following the inverse square root learning schedule.",
       "zh": "我们用 AdamW [56] 优化器优化这些模型，学习率为 1e-4，预热步数 32K，采用逆平方根学习率调度。"
      },
      {
       "id": "s-system-3-10",
       "original": "We use the classifier-free guidance [57], during training for both the T2S and S2A models, we drop the prompt with a probability of 0.15.",
       "zh": "我们使用无分类器引导（classifier-free guidance）[57]：训练 T2S 和 S2A 模型时，以 0.15 的概率丢弃提示。"
      },
      {
       "id": "s-system-3-11",
       "original": "See more details about classifier-free guidance and classifier-free guidance rescale in Appendix C.",
       "zh": "无分类器引导及其重缩放（rescale）的更多细节见附录 C。"
      }
     ]
    },
    {
     "id": "p-system-4",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-system-4-1",
       "original": "Inference.",
       "zh": "推理。"
      },
      {
       "id": "s-system-4-2",
       "original": "For the T2S model, we use 50 steps as the default total inference steps.",
       "zh": "T2S 模型默认总推理步数为 50 步。"
      },
      {
       "id": "s-system-4-3",
       "original": "The classifier-free guidance scale and the classifier-free guidance rescale factor [58] are set to 2.5 and 0.75, respectively.",
       "zh": "无分类器引导系数与重缩放因子 [58] 分别设为 2.5 和 0.75。"
      },
      {
       "id": "s-system-4-4",
       "original": "For sampling, we use a top-k of 20, with the sampling temperature annealing from 1.5 to 0.",
       "zh": "采样时 top-k 取 20，采样温度从 1.5 退火到 0。"
      },
      {
       "id": "s-system-4-5",
       "original": "We add Gumbel noise to token confidences when determining the remasking process, following [11].",
       "zh": "沿用 [11]，确定重新掩蔽过程时，我们给 token 置信度加入 Gumbel 噪声。"
      },
      {
       "id": "s-system-4-6",
       "original": "For the S2A model, we use [40, 16, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] steps for acoustic RVQ layers by default, we find the S2A model can also perform well with fewer inference steps of [10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] (see Appendix A.3).",
       "zh": "S2A 模型默认对声学 RVQ 各层使用 [40, 16, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] 步；我们发现更少的推理步数 [10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] 也能表现良好（见附录 A.3）。"
      },
      {
       "id": "s-system-4-7",
       "original": "We use the same sampling strategy as the T2S model, except that we use greedy sampling instead of top-k sampling if the inference step is 1.",
       "zh": "我们采用与 T2S 模型相同的采样策略，只是当推理步数为 1 时用贪心采样代替 top-k 采样。"
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
    "original": "Zero-Shot TTS",
    "zh": "零样本 TTS"
   },
   "blocks": [
    {
     "id": "p-4-2-1",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-4-2-1-1",
       "original": "In this section, we show the main results of zero-shot TTS: we show comparison results with SOTA baselines in Section 4.2.1; we compare MaskGCT with replacing T2S model to an AR model in Section 4.2.2; We present the performance of MaskGCT across varying speech tempos in Section 4.2.3.",
       "zh": "本节展示零样本 TTS 的主要结果：Section 4.2.1 给出与 SOTA 基线的对比；Section 4.2.2 对比 MaskGCT 与把 T2S 换成 AR 模型的版本；Section 4.2.3 展示 MaskGCT 在不同语速下的表现。"
      },
      {
       "id": "s-4-2-1-2",
       "original": "Additionally, we present the results of zero-shot TTS for speech style imitation in Section 4.3, multilingual zero-shot TTS in Appendix E, and cross-lingual speech translation (dubbing) in Appendix F.",
       "zh": "此外，Section 4.3 展示语音风格模仿的零样本 TTS 结果，多语言零样本 TTS 见附录 E，跨语言语音翻译（配音）见附录 F。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-4-2-1",
   "num": "4.2.1",
   "level": 2,
   "page": 8,
   "title": {
    "original": "Comparison with Baselines",
    "zh": "与基线的对比"
   },
   "blocks": [
    {
     "id": "p-4-2-1-1",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-4-2-1-1-1",
       "original": "We compare MaskGCT with baselines in terms of similarity, robustness, and generation quality.",
       "zh": "我们从相似度、鲁棒性和生成质量三个维度对比 MaskGCT 与基线。"
      },
      {
       "id": "s-4-2-1-1-2",
       "original": "The main results are shown in Table 2.",
       "zh": "主要结果见 Table 2。"
      },
      {
       "id": "s-4-2-1-1-3",
       "original": "MaskGCT demonstrates excellent performance on all metrics and achieves human-level similarity, naturalness, and intelligibility.",
       "zh": "MaskGCT 在所有指标上都表现出色，达到了人类水平的相似度、自然度和可懂度。"
      },
      {
       "id": "s-4-2-1-1-4",
       "original": "In similarity, MaskGCT’s SIM-O and SMOS both outperform the best baseline, whether assessed using the total length of ground truth or the predicted total duration (0.67→0.687 in LibriSpeech, 0.643→0.717 in SeedTTS testen, 0.75→0.774 in SeedTTS test-zh for SIM-O; +0.01 in LibriSpeech, +0.72 in SeedTTS test-en, +0.55 in SeedTTS test-zh for SMOS).",
       "zh": "相似度方面，无论使用真实总长度还是预测的总时长，MaskGCT 的 SIM-O 和 SMOS 都超过最强基线（SIM-O：LibriSpeech 0.67→0.687、SeedTTS test-en 0.643→0.717、SeedTTS test-zh 0.75→0.774；SMOS：LibriSpeech +0.01、SeedTTS test-en +0.72、SeedTTS test-zh +0.55）。"
      },
      {
       "id": "s-4-2-1-1-5",
       "original": "When compared with human recordings, MaskGCT achieves human-level similarity across all three test sets (+0.017, -0.002, and +0.027 for SIM-O respectively in the three test sets, and +0.28, +0.32, and +0.25 for SMOS respectively in the three test sets).",
       "zh": "与真人录音相比，MaskGCT 在全部三个测试集上都达到人类水平的相似度（SIM-O 在三个测试集上分别为 +0.017、-0.002、+0.027，SMOS 分别为 +0.28、+0.32、+0.25）。"
      },
      {
       "id": "s-4-2-1-1-6",
       "original": "In robustness, MaskGCT likewise results nearly on par with ground truth (with 2.634, 2.623, 2.273 WER on LibriSpeech, SeedTTS test-en, and SeedTTS test-zh, respectively), exhibiting enhanced robustness compared to AR-based models and performing on par or better than NAR-based models such as VoiceBox and NaturalSpeech 3, without relying on phone-level duration predictions.",
       "zh": "鲁棒性方面，MaskGCT 的结果同样几乎与真人语音持平（LibriSpeech、SeedTTS test-en、SeedTTS test-zh 上的 WER 分别为 2.634、2.623、2.273），比基于 AR 的模型鲁棒性更强，且在不依赖音素级时长预测的前提下，与 VoiceBox、NaturalSpeech 3 等 NAR 模型持平或更优。"
      },
      {
       "id": "s-4-2-1-1-7",
       "original": "In generation quality, MaskGCT achieves +0.10, +0.03, and +0.05 CMOS across the three test sets when compared with human recordings, indicating that MaskGCT attains human-level naturalness on these test sets.",
       "zh": "生成质量方面，MaskGCT 与真人录音相比在三个测试集上分别取得 +0.10、+0.03、+0.05 的 CMOS，表明 MaskGCT 在这些测试集上达到了人类水平的自然度。"
      },
      {
       "id": "s-4-2-1-1-8",
       "original": "We also observe that MaskGCT exhibits excellent performance when using both ground truth total duration and predicted total duration, indicating the robustness of MaskGCT within a reasonable range of total speech duration and the capability of our total duration predictor to yield appropriate durations.",
       "zh": "我们还观察到，无论使用真实总时长还是预测总时长，MaskGCT 都表现出色，说明 MaskGCT 在合理的总时长范围内具有鲁棒性，也说明了我们的总时长预测器能给出合适的时长。"
      }
     ]
    },
    {
     "id": "tab-4-2-1-1",
     "type": "table_caption",
     "page": 8,
     "original": "Table 3: Comparison results of the evaluation of MaskGCT and AR+SoundStorm. AR+SoundStorm can be regarded as replacing the T2S MaskGCT with the AR T2S model.",
     "zh": "表 3：MaskGCT 与 AR+SoundStorm 的评估对比结果。AR+SoundStorm 可视为把 MaskGCT 的 T2S 换成 AR T2S 模型。"
    }
   ]
  },
  {
   "id": "sec-system-2",
   "num": null,
   "level": 2,
   "page": 8,
   "title": {
    "original": "System",
    "zh": "System"
   },
   "blocks": [
    {
     "id": "p-system-2-1",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-system-2-1-1",
       "original": "SIM-O ↑ WER ↓ FSD ↓ SMOS ↑ CMOS ↑ LibriSpeech test-clean AR + SoundStorm",
       "zh": "(3) 它在三个基准上的 WER 与真人相当，且在合理的语音时长范围内表现稳定，这也说明生成语音兼具多样性与可控性。"
      }
     ]
    },
    {
     "id": "eq-system-2-1",
     "type": "equation",
     "page": 8,
     "original": "0.672 3.267 0.998 4.20±0.17 -0.02±0.20"
    },
    {
     "id": "eq-system-2-2",
     "type": "equation",
     "page": 8,
     "original": "MaskGCT"
    },
    {
     "id": "eq-system-2-3",
     "type": "equation",
     "page": 8,
     "original": "0.687 2.634 0.886 4.27±0.14 0.10±0.16"
    },
    {
     "id": "eq-system-2-4",
     "type": "equation",
     "page": 8,
     "original": "SeedTTS test-en AR + SoundStorm"
    },
    {
     "id": "eq-system-2-5",
     "type": "equation",
     "page": 8,
     "original": "0.683 2.846 0.323 4.03±0.23 -0.05±0.22"
    },
    {
     "id": "eq-system-2-6",
     "type": "equation",
     "page": 8,
     "original": "MaskGCT"
    },
    {
     "id": "eq-system-2-7",
     "type": "equation",
     "page": 8,
     "original": "0.717 2.623 0.188 4.24±0.12 0.03±0.14"
    },
    {
     "id": "eq-system-2-8",
     "type": "equation",
     "page": 8,
     "original": "SeedTTS test-zh AR + SoundStorm"
    },
    {
     "id": "eq-system-2-9",
     "type": "equation",
     "page": 8,
     "original": "0.747 3.865 0.238 3.78±0.23 -0.32±0.19"
    },
    {
     "id": "eq-system-2-10",
     "type": "equation",
     "page": 8,
     "original": "MaskGCT"
    },
    {
     "id": "eq-system-2-11",
     "type": "equation",
     "page": 8,
     "original": "0.774 2.273 0.106 4.09±0.12 0.05±0.17"
    }
   ]
  },
  {
   "id": "sec-4-2-2",
   "num": "4.2.2",
   "level": 2,
   "page": 8,
   "title": {
    "original": "Autoregressive vs. Masked Generative Models",
    "zh": "自回归模型 vs. 掩码生成模型"
   },
   "blocks": [
    {
     "id": "p-4-2-2-1",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-4-2-2-1-1",
       "original": "We compare MaskGCT to replacing T2S MaskGCT with an AR T2S model (which we call AR + SoundStorm).",
       "zh": "我们将 MaskGCT 与把 T2S MaskGCT 换成 AR T2S 模型的版本（称为 AR + SoundStorm）进行对比。"
      },
      {
       "id": "s-4-2-2-1-2",
       "original": "Table 3 shows the performance of these two models on all three test sets.",
       "zh": "Table 3 给出了这两个模型在全部三个测试集上的表现。"
      },
      {
       "id": "s-4-2-2-1-3",
       "original": "MaskGCT demonstrates improved similarity, robustness, and CMOS (+0.12 on LibriSpeech test-clean, +0.08 on SeedTTS test-en, and +0.37 on SeedTTS test-zh) across all three test sets.",
       "zh": "MaskGCT 在全部三个测试集上的相似度、鲁棒性和 CMOS 均有提升（CMOS：LibriSpeech test-clean 上 +0.12，SeedTTS test-en 上 +0.08，SeedTTS test-zh 上 +0.37）。"
      },
      {
       "id": "s-4-2-2-1-4",
       "original": "We also conduct comparisons on more challenging hard cases (such as repeating words, and tongue twisters, which are often considered as samples where TTS systems are prone to hallucinations).",
       "zh": "我们还在更有挑战性的难例上做了对比（例如重复词、绕口令——这些样本通常被认为是 TTS 系统容易出幻觉的场景）。"
      },
      {
       "id": "s-4-2-2-1-5",
       "original": "MaskGCT exhibits a more pronounced robustness advantage in these scenarios.",
       "zh": "MaskGCT 在这些场景下展现出更明显的鲁棒性优势。"
      },
      {
       "id": "s-4-2-2-1-6",
       "original": "See details in Appendix J.",
       "zh": "详见附录 J。"
      },
      {
       "id": "s-4-2-2-1-7",
       "original": "In addition, compared to AR-based models, MaskGCT offers the capability to control the total duration of the generated speech, along with fewer inference steps, requiring only 25 to 50 steps for T2S models to achieve optimal results for speeches of any length.",
       "zh": "此外，与基于 AR 的模型相比，MaskGCT 能控制生成语音的总时长，且推理步数更少——无论语音多长，T2S 模型只需 25 到 50 步即可达到最优效果。"
      },
      {
       "id": "s-4-2-2-1-8",
       "original": "Conversely, the inference steps for AR-based models increase linearly with the length of the speech.",
       "zh": "相反，基于 AR 的模型其推理步数会随语音长度线性增长。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-4-2-3",
   "num": "4.2.3",
   "level": 2,
   "page": 8,
   "title": {
    "original": "Duration Length Analysis",
    "zh": "时长长度分析"
   },
   "blocks": [
    {
     "id": "p-4-2-3-1",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-4-2-3-1-1",
       "original": "We analyze the robustness of the generated results of MaskGCT under different changes in total duration length (which can also be regarded as changes in speech tempo).",
       "zh": "我们分析了 MaskGCT 生成结果在总时长变化（也可视为语速变化）下的鲁棒性。"
      },
      {
       "id": "s-4-2-3-1-2",
       "original": "The results are shown in Figure 3.",
       "zh": "结果见 Figure 3。"
      },
      {
       "id": "s-4-2-3-1-3",
       "original": "We explore the results of multiplying the ground truth total duration by 0.7 to 1.3.",
       "zh": "我们将真实总时长乘以 0.7 到 1.3 的系数进行考察。"
      },
      {
       "id": "s-4-2-3-1-4",
       "original": "The results show that the lowest WER is achieved at a total duration multiplier of 1.0,",
       "zh": "结果表明，总时长系数为 1.0 时 WER 最低，"
      }
     ]
    },
    {
     "id": "eq-4-2-3-1",
     "type": "equation",
     "page": 8,
     "original": "5"
    },
    {
     "id": "p-4-2-3-2",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-4-2-3-2-1",
       "original": "SeedTTS test-en SeedTTS test-zh",
       "zh": "（图表横轴标签：SeedTTS test-en 与 SeedTTS test-zh 两个测试集。）"
      }
     ]
    },
    {
     "id": "eq-4-2-3-2",
     "type": "equation",
     "page": 8,
     "original": "4"
    },
    {
     "id": "p-4-2-3-3",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-4-2-3-3-1",
       "original": "WER",
       "zh": "(3) 它在三个基准上的 WER 与真人相当，且在合理的语音时长范围内表现稳定，这也说明生成语音兼具多样性与可控性。"
      }
     ]
    },
    {
     "id": "eq-4-2-3-3",
     "type": "equation",
     "page": 8,
     "original": "3"
    },
    {
     "id": "eq-4-2-3-4",
     "type": "equation",
     "page": 8,
     "original": "0.7 0.8 0.9 1 1.1 1.2 1.3"
    },
    {
     "id": "p-4-2-3-4",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-4-2-3-4-1",
       "original": "Total Duration Multiplier",
       "zh": "（Figure 3 横轴残留）0.7 0.8 0.9 1 1.1 1.2 1.3 总时长系数"
      }
     ]
    },
    {
     "id": "fig-4-2-3-1",
     "type": "figure_caption",
     "page": 8,
     "original": "Figure 3: WER vs. Total Duration Multiplier.",
     "zh": "图 3：WER 随总时长系数的变化。"
    },
    {
     "id": "p-4-2-3-5",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-4-2-3-5-1",
       "original": "indicating that the models perform best when the speech is played at its natural speed.",
       "zh": "说明模型在语音以自然语速播放时表现最好。"
      },
      {
       "id": "s-4-2-3-5-2",
       "original": "When the multiplier is 0.9 or 1.1, the model is still able to achieve a WER very close to the best.",
       "zh": "当系数为 0.9 或 1.1 时，模型仍能取得接近最优的 WER。"
      },
      {
       "id": "s-4-2-3-5-3",
       "original": "When the multiplier is 0.7 or 1.3, the WER is slightly higher but still within a reasonable range.",
       "zh": "当系数为 0.7 或 1.3 时，WER 略高，但仍在合理范围内。"
      },
      {
       "id": "s-4-2-3-5-4",
       "original": "This shows that our model can generate reasonable and accurate content at different speech tempos.",
       "zh": "这说明我们的模型能在不同语速下生成合理且准确的内容。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-4-3",
   "num": "4.3",
   "level": 2,
   "page": 9,
   "title": {
    "original": "Speech Style Imitation",
    "zh": "语音风格模仿"
   },
   "blocks": [
    {
     "id": "p-4-3-1",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-4-3-1-1",
       "original": "Zero-shot TTS endeavors to learn how to speak, including voice timbre and style, from prompt speech.",
       "zh": "零样本 TTS 的目的是从提示语音中学习如何说话，包括音色和风格。"
      },
      {
       "id": "s-4-3-1-2",
       "original": "Previous works utilized SIM-O to measure the similarity between generated speech and reference speech; however, SIM-O primarily assesses the similarity in voice timbre.",
       "zh": "先前工作用 SIM-O 衡量生成语音与参考语音的相似度；但 SIM-O 主要评估音色上的相似性。"
      },
      {
       "id": "s-4-3-1-3",
       "original": "In addition to evaluating the model’s zero-shot cloning ability through timbre similarity metrics, we also explored MaskGCT’s capability to clone overall style from two more expressive and stylized dimensions: accent and emotion.",
       "zh": "除了通过音色相似度指标评估模型的零样本克隆能力外，我们还从两个更具表现力与风格化的维度——口音和情感——考察了 MaskGCT 克隆整体风格的能力。"
      },
      {
       "id": "s-4-3-1-4",
       "original": "We randomly sampled a portion of data from the L2-ARCTIC [59] accent corpus and the ESD [60] emotion corpus to construct our accent and emotion evaluation datasets.",
       "zh": "我们从 L2-ARCTIC [59] 口音语料库和 ESD [60] 情感语料库中随机抽取部分数据，构建了口音评估集和情感评估集。"
      },
      {
       "id": "s-4-3-1-5",
       "original": "Additionally, we introduce supplementary metrics to assess the model’s performance.",
       "zh": "此外，我们引入了用于评估模型表现的补充指标。"
      },
      {
       "id": "s-4-3-1-6",
       "original": "For accent imitation, we employ SIM-Accent, to measure the similarity in accent between the generated speech and reference speech.",
       "zh": "对口音模仿，我们采用 SIM-Accent，衡量生成语音与参考语音在口音上的相似度。"
      },
      {
       "id": "s-4-3-1-7",
       "original": "The calculation process is analogous to SIM-O, but we utilize CommonAccent4 [61, 62] to derive the accent representation features of the speech.",
       "zh": "计算过程与 SIM-O 类似，但我们用 CommonAccent4 [61, 62] 提取语音的口音表征特征。"
      },
      {
       "id": "s-4-3-1-8",
       "original": "We also incorporate a subjective evaluation metric, Accent SMOS, which is similar to SMOS but focuses on accent rather than timbre.",
       "zh": "我们还加入了主观评估指标 Accent SMOS，与 SMOS 类似，但关注口音而非音色。"
      },
      {
       "id": "s-4-3-1-9",
       "original": "For emotion, we introduce Emotion SIM (with emotion2vec5 [63] to extract features) and Emotion SMOS.",
       "zh": "对情感，我们引入 Emotion SIM（用 emotion2vec5 [63] 提取特征）和 Emotion SMOS。"
      }
     ]
    },
    {
     "id": "p-4-3-2",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-4-3-2-1",
       "original": "Our experiments demonstrate that MaskGCT exhibits powerful style cloning capabilities.",
       "zh": "实验表明，MaskGCT 具有强大的风格克隆能力。"
      },
      {
       "id": "s-4-3-2-2",
       "original": "For accent imitation, MaskGCT achieves the highest SIM-O of 0.717, close to the ground truth of 0.747.",
       "zh": "口音模仿上，MaskGCT 取得最高的 SIM-O 0.717，接近真实语音的 0.747。"
      },
      {
       "id": "s-4-3-2-3",
       "original": "It also maintains a competitive WER of 6.382 and the best Accent SIM of 0.645.",
       "zh": "它还保持了有竞争力的 WER 6.382，以及最好的 Accent SIM 0.645。"
      },
      {
       "id": "s-4-3-2-4",
       "original": "Additionally, MaskGCT leads in CMOS of 0.23, SMOS of 4.24, and Accent SMOS of 4.38.",
       "zh": "此外，MaskGCT 的 CMOS 0.23、SMOS 4.24、Accent SMOS 4.38 均领先。"
      },
      {
       "id": "s-4-3-2-5",
       "original": "For emotion imitation, MaskGCT achieves the highest SIM-O of 0.600.",
       "zh": "情感模仿上，MaskGCT 取得最高的 SIM-O 0.600。"
      },
      {
       "id": "s-4-3-2-6",
       "original": "It also attains a competitive WER of 12.502 and a strong Emotion SIM of 0.822.",
       "zh": "它还取得了有竞争力的 WER 12.502 和很强的 Emotion SIM 0.822。"
      },
      {
       "id": "s-4-3-2-7",
       "original": "Furthermore, MaskGCT leads in all subjective metrics with CMOS of -0.31, SMOS of 4.07, and Emotion SMOS of 3.76, indicating natural and pleasant emotion imitation.",
       "zh": "此外，MaskGCT 在所有主观指标上领先：CMOS -0.31、SMOS 4.07、Emotion SMOS 3.76，说明其情感模仿自然且悦耳。"
      }
     ]
    },
    {
     "id": "tab-4-3-1",
     "type": "table_caption",
     "page": 9,
     "original": "Table 4: Evaluation results for MaskGCT and the baseline methods on accent imitation. System SIM-O ↑ WER ↓ Accent SIM ↑ CMOS ↑ SMOS ↑ Accent SMOS ↑ Accent Corpus L2-Arctit Ground Truth 0.747 10.903 0.633 0.00 - - VALL-E 0.403 10.721 0.485 -1.04±0.50 3.12±0.41 2.77±0.45 CosyVoice 0.653 6.660 0.640 0.10±0.19 4.23±0.18 3.99±0.23 VoiceBox 0.475 6.181 0.575 -0.55±0.22 3.93±0.25 3.49±0.29 VoiceCraft 0.438 10.072 0.517 -0.39±0.22 3.51±0.33 3.29±0.28 MaskGCT 0.717 6.382 0.645 0.23±0.17 4.24±0.16 4.38±0.25",
     "zh": "表 4：MaskGCT 与基线在口音模仿（accent imitation）上的评测结果。表头：System × SIM-O↑ × WER↓ × Accent SIM↑ × CMOS↑ × SMOS↑ × Accent SMOS↑——Accent Corpus L2-Arctic：Ground Truth 0.747/10.903/0.633/0.00/-/-；VALL-E 0.403/10.721/0.485/-1.04±0.50/3.12±0.41/2.77±0.45；CosyVoice 0.653/6.660/0.640/0.10±0.19/4.23±0.18/3.99±0.23；VoiceBox 0.475/6.181/0.575/-0.55±0.22/3.93±0.25/3.49±0.29；VoiceCraft 0.438/10.072/0.517/-0.39±0.22/3.51±0.33/3.29±0.28；MaskGCT 0.717/6.382/0.645/0.23±0.17/4.24±0.16/4.38±0.25。"
    },
    {
     "id": "tab-4-3-2",
     "type": "table_caption",
     "page": 9,
     "original": "Table 5: Evaluation results for MaskGCT and the baseline methods on emotion imitation. System SIM-O ↑ WER ↓ Emotion SIM ↑ CMOS ↑ SMOS ↑ Emotion SMOS ↑ Emotion Corpus ESD Ground Truth 0.673 11.792 0.936 0.00 - - VALL-E 0.396 15.731 0.735 -1.43±0.33 2.52±0.38 2.63±0.36 CosyVoice 0.575 10.139 0.839 -0.45±0.18 3.98±0.19 3.66±0.19 VoiceBox 0.451 12.647 0.811 -0.65±0.20 3.81±0.16 3.61±0.19 VoiceCraft 0.345 16.042 0.788 -0.60±0.24 3.42±0.31 3.52±0.25 MaskGCT 0.600 12.502 0.822 -0.31±0.17 4.07±0.16 3.76±0.25",
     "zh": "表 5：MaskGCT 与基线在情绪模仿（emotion imitation）上的评测结果。表头同上——Emotion Corpus ESD：Ground Truth 0.673/11.792/0.936/0.00/-/-；VALL-E 0.396/15.731/0.735/-1.43±0.33/2.52±0.38/2.63±0.36；CosyVoice 0.575/10.139/0.839/-0.45±0.18/3.98±0.19/3.66±0.19；VoiceBox 0.451/12.647/0.811/-0.65±0.20/3.81±0.16/3.61±0.19；VoiceCraft 0.345/16.042/0.788/-0.60±0.24/3.42±0.31/3.52±0.25；MaskGCT 0.600/12.502/0.822/-0.31±0.17/4.07±0.16/3.76±0.25。"
    }
   ]
  },
  {
   "id": "sec-4-4",
   "num": "4.4",
   "level": 2,
   "page": 9,
   "title": {
    "original": "Ablation Study",
    "zh": "消融实验"
   },
   "blocks": [
    {
     "id": "p-4-4-1",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-4-4-1-1",
       "original": "Inference Timesteps.",
       "zh": "推理步数。"
      },
      {
       "id": "s-4-4-1-2",
       "original": "We explore the impact of inference steps of the T2S model on the results, ranging from 5 steps to 75 steps.",
       "zh": "我们考察了 T2S 模型推理步数对结果的影响，范围从 5 步到 75 步。"
      },
      {
       "id": "s-4-4-1-3",
       "original": "Initially, SIM increases significantly and stabilizes after 25 steps.",
       "zh": "起初 SIM 显著上升，在 25 步后趋于稳定。"
      },
      {
       "id": "s-4-4-1-4",
       "original": "For test-zh, it rises from 0.761 at 5 steps to 0.771 at 75 steps, and for test-en, from 0.696 to 0.715.",
       "zh": "test-zh 上，SIM 从 5 步时的 0.761 升到 75 步时的 0.771；test-en 上，从 0.696 升到 0.715。"
      },
      {
       "id": "s-4-4-1-5",
       "original": "SIM peaks around 25 steps.",
       "zh": "SIM 在 25 步左右达到峰值。"
      },
      {
       "id": "s-4-4-1-6",
       "original": "WER improves more dramatically, especially up to 25 steps.",
       "zh": "WER 的改善更为显著，尤其是在 25 步以内。"
      },
      {
       "id": "s-4-4-1-7",
       "original": "For test-zh, 4https://huggingface.co/Jzuluaga/accent-id-commonaccent_ecapa 5https://github.com/ddlBoJack/emotion2vec",
       "zh": "test-zh 上，WER 从 5 步时的 10.19 降到 25 步时的 2.507；test-en 上，从 8.096 降到 2.346。（原文此处混入脚注链接残留：4https://huggingface.co/Jzuluaga/accent-id-commonaccent_ecapa 5https://github.com/ddlBoJack/emotion2vec）"
      }
     ]
    },
    {
     "id": "eq-4-4-1",
     "type": "equation",
     "page": 9,
     "original": "it drops from 10.19 at 5 steps to 2.507 at 25 steps, and for test-en, from 8.096 to 2.346. Both SIM"
    },
    {
     "id": "p-4-4-2",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-4-4-2-1",
       "original": "and WER show minimal changes beyond 25 steps.",
       "zh": "超过 25 步后，SIM 和 WER 都几乎不再变化。"
      },
      {
       "id": "s-4-4-2-2",
       "original": "These findings suggest that SIM can be optimized with around 10 steps, while achieving the lowest WER requires approximately 25 steps.",
       "zh": "这些发现表明：SIM 大约 10 步即可优化到位，而要取得最低 WER 大约需要 25 步。"
      },
      {
       "id": "s-4-4-2-3",
       "original": "Beyond this, both metrics show minimal changes, indicating that further increases in steps do not yield substantial improvements.",
       "zh": "再往后，两项指标都几乎不变，说明继续增加步数不会带来实质提升。"
      },
      {
       "id": "s-4-4-2-4",
       "original": "Therefore, for practical applications, 25 inference steps may be considered optimal for balancing SIM and WER, ensuring efficient and effective performance.",
       "zh": "因此，实际应用中 25 步推理可视为平衡 SIM 与 WER 的最优选择，兼顾效率与效果。"
      },
      {
       "id": "s-4-4-2-5",
       "original": "See more details in Appendix A.2.",
       "zh": "更多细节见附录 A.2。"
      }
     ]
    },
    {
     "id": "p-4-4-3",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-4-4-3-1",
       "original": "Model Size.",
       "zh": "模型规模。"
      },
      {
       "id": "s-4-4-3-2",
       "original": "We compare the performance differences of T2S models with varying model sizes.",
       "zh": "我们对比了不同规模 T2S 模型的性能差异。"
      },
      {
       "id": "s-4-4-3-3",
       "original": "The result is shown in Table 6.",
       "zh": "结果见 Table 6。"
      },
      {
       "id": "s-4-4-3-4",
       "original": "We observe that the large model outperforms the base model across all metrics, albeit not significantly.",
       "zh": "我们观察到，大模型在所有指标上都优于基础模型，但优势并不显著。"
      },
      {
       "id": "s-4-4-3-5",
       "original": "We suggest that our system can achieve good performance with just the setting of the base model when using 100K hours of data.",
       "zh": "我们认为，在 100K 小时数据的设定下，只用基础模型配置就能取得不错的性能。"
      },
      {
       "id": "s-4-4-3-6",
       "original": "In the future, we will explore more comprehensive scaling laws for both model size and data scaling.",
       "zh": "未来我们将探索关于模型规模与数据规模更全面的扩展规律（scaling law）。"
      }
     ]
    },
    {
     "id": "tab-4-4-1",
     "type": "table_caption",
     "page": 10,
     "original": "Table 6: Comparison results between T2S-Large and T2S-Base.",
     "zh": "表 6：T2S-Large 与 T2S-Base 的对比结果。"
    }
   ]
  },
  {
   "id": "sec-system-3",
   "num": null,
   "level": 2,
   "page": 10,
   "title": {
    "original": "System",
    "zh": "System"
   },
   "blocks": [
    {
     "id": "p-system-3-1",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-system-3-1-1",
       "original": "SIM-O ↑ WER ↓ FSD ↓ #Parameters SeedTTS test-en T2S-Base",
       "zh": "(3) 它在三个基准上的 WER 与真人相当，且在合理的语音时长范围内表现稳定，这也说明生成语音兼具多样性与可控性。\nSIM-O ↑ WER ↓ FSD ↓ #Parameters SeedTTS test-en T2S-Base"
      }
     ]
    },
    {
     "id": "eq-system-3-1",
     "type": "equation",
     "page": 10,
     "original": "0.714 2.514 0.189"
    },
    {
     "id": "eq-system-3-2",
     "type": "equation",
     "page": 10,
     "original": "315M T2S-Large"
    },
    {
     "id": "eq-system-3-3",
     "type": "equation",
     "page": 10,
     "original": "0.728 2.466 0.159"
    },
    {
     "id": "eq-system-3-4",
     "type": "equation",
     "page": 10,
     "original": "695M SeedTTS test-zh T2S-Base"
    },
    {
     "id": "eq-system-3-5",
     "type": "equation",
     "page": 10,
     "original": "0.769 2.216 0.123"
    },
    {
     "id": "eq-system-3-6",
     "type": "equation",
     "page": 10,
     "original": "315M T2S-Large"
    },
    {
     "id": "eq-system-3-7",
     "type": "equation",
     "page": 10,
     "original": "0.777 2.183 0.101"
    },
    {
     "id": "p-system-3-2",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-system-3-2-1",
       "original": "695M Text Tokenizer.",
       "zh": "（表：SIM-O↑/WER↓/FSD↓/#Parameters——SeedTTS test-en：T2S-Base 0.714/2.514/0.189/315M；T2S-Large 0.728/2.466/0.159/695M；SeedTTS test-zh：T2S-Base 0.769/2.216/0.123/315M；T2S-Large 0.777/2.183/0.101/695M。）Text Tokenizer。"
      },
      {
       "id": "s-system-3-2-2",
       "original": "We compare two text tokenization methods: Grapheme-to-Phoneme (G2P) and Byte Pair Encoding (BPE).",
       "zh": "我们对比了两种文本分词方法：字位转音素（G2P）和 BPE。"
      },
      {
       "id": "s-system-3-2-3",
       "original": "See more details in Appendix A.6.",
       "zh": "更多细节见附录 A.6。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-5",
   "num": "5",
   "level": 1,
   "page": 10,
   "title": {
    "original": "Conclusion",
    "zh": "结论"
   },
   "blocks": [
    {
     "id": "p-5-1",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-5-1-1",
       "original": "In this paper, we present MaskGCT, a large-scale zero-shot TTS system that leverages fully nonautoregressive masked generative codec transformers while not requiring text-speech alignment supervision and phone-level duration prediction.",
       "zh": "本文提出 MaskGCT，一个大规模零样本 TTS 系统：它使用完全非自回归的掩码生成式 Codec Transformer，同时不需要文本-语音对齐监督和音素级时长预测。"
      },
      {
       "id": "s-5-1-2",
       "original": "MaskGCT achieves high-quality text-to-speech synthesis using text to predict semantic tokens extracted from a speech self-supervised learning (SSL) model, and then predicting acoustic tokens conditioned on these semantic tokens.",
       "zh": "MaskGCT 通过用文本预测从语音自监督学习（SSL）模型中提取的语义 token、再以这些语义 token 为条件预测声学 token，实现高质量文本转语音合成。"
      },
      {
       "id": "s-5-1-3",
       "original": "Our experiments demonstrate that MaskGCT outperforms the state-of-the-art TTS system on speech quality, similarity, and intelligibility with scaled model size and training data, and MaskGCT can control the total duration of generated speech.",
       "zh": "实验表明，随着模型规模与训练数据的扩大，MaskGCT 在语音质量、相似度和可懂度上超过了最先进的 TTS 系统，并且能控制生成语音的总时长。"
      },
      {
       "id": "s-5-1-4",
       "original": "We also explore the scalability of MaskGCT in tasks such as speech translation, voice conversion, emotion control, and speech content editing, demonstrating the potential of MaskGCT as a foundational model for speech generation.",
       "zh": "我们还探索了 MaskGCT 在语音翻译、声音转换、情感控制和语音内容编辑等任务上的可扩展性，展示了 MaskGCT 作为语音生成基础模型的潜力。"
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
       "original": "[1] Eugene Kharitonov, Damien Vincent, Zalán Borsos, Raphaël Marinier, Sertan Girgin, Olivier Pietquin, Matt Sharifi, Marco Tagliasacchi, and Neil Zeghidour."
      },
      {
       "id": "s-references-1-2",
       "original": "Speak, read and prompt: High-fidelity text-to-speech with minimal supervision."
      },
      {
       "id": "s-references-1-3",
       "original": "Transactions of the Association for Computational Linguistics, 11:1703–1718, 2023."
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
       "original": "[2] Chengyi Wang, Sanyuan Chen, Yu Wu, Ziqiang Zhang, Long Zhou, Shujie Liu, Zhuo Chen, Yanqing Liu, Huaming Wang, Jinyu Li, et al. Neural codec language models are zero-shot text to speech synthesizers. arXiv preprint arXiv:2301.02111, 2023."
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
       "original": "[3] Mateusz Łajszczak, Guillermo Cámbara, Yang Li, Fatih Beyhan, Arent van Korlaar, Fan Yang, Arnaud Joly, Álvaro Martín-Cortinas, Ammar Abbas, Adam Michalski, et al. Base tts: Lessons from building a billion-parameter text-to-speech model on 100k hours of data. arXiv preprint arXiv:2402.08093, 2024."
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
       "original": "[4] Jaehyeon Kim, Keon Lee, Seungjun Chung, and Jaewoong Cho."
      },
      {
       "id": "s-references-4-2",
       "original": "Clam-tts: Improving neural codec language model for zero-shot text-to-speech. arXiv preprint arXiv:2404.02781, 2024."
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
       "original": "[5] Puyuan Peng, Po-Yao Huang, Daniel Li, Abdelrahman Mohamed, and David Harwath."
      },
      {
       "id": "s-references-5-2",
       "original": "Voicecraft: Zero-shot speech editing and text-to-speech in the wild. arXiv preprint arXiv:2403.16973,"
      }
     ]
    },
    {
     "id": "eq-references-1",
     "type": "equation",
     "page": 11,
     "original": "2024."
    },
    {
     "id": "p-references-6",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-6-1",
       "original": "[6] Philip Anastassiou, Jiawei Chen, Jitong Chen, Yuanzhe Chen, Zhuo Chen, Ziyi Chen, Jian Cong, Lelai Deng, Chuang Ding, Lu Gao, et al. Seed-tts: A family of high-quality versatile speech generation models. arXiv preprint arXiv:2406.02430, 2024."
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
       "original": "[7] Kai Shen, Zeqian Ju, Xu Tan, Yanqing Liu, Yichong Leng, Lei He, Tao Qin, Sheng Zhao, and Jiang Bian."
      },
      {
       "id": "s-references-7-2",
       "original": "Naturalspeech 2: Latent diffusion models are natural and zero-shot speech and singing synthesizers. arXiv preprint arXiv:2304.09116, 2023."
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
       "original": "[8] Zeqian Ju, Yuancheng Wang, Kai Shen, Xu Tan, Detai Xin, Dongchao Yang, Yanqing Liu, Yichong Leng, Kaitao Song, Siliang Tang, et al. Naturalspeech 3: Zero-shot speech synthesis with factorized codec and diffusion models. arXiv preprint arXiv:2403.03100, 2024."
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
       "original": "[9] Matthew Le, Apoorv Vyas, Bowen Shi, Brian Karrer, Leda Sari, Rashel Moritz, Mary Williamson, Vimal Manohar, Yossi Adi, Jay Mahadeokar, et al. Voicebox: Text-guided multilingual universal speech generation at scale."
      },
      {
       "id": "s-references-9-2",
       "original": "Advances in neural information processing systems,"
      }
     ]
    },
    {
     "id": "eq-references-2",
     "type": "equation",
     "page": 11,
     "original": "36, 2024."
    },
    {
     "id": "p-references-10",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-10-1",
       "original": "[10] Ziyue Jiang, Jinglin Liu, Yi Ren, Jinzheng He, Chen Zhang, Zhenhui Ye, Pengfei Wei, Chunfeng Wang, Xiang Yin, Zejun Ma, et al. Mega-tts 2: Zero-shot text-to-speech with arbitrary length speech prompts. arXiv preprint arXiv:2307.07218, 2023."
      }
     ]
    },
    {
     "id": "p-references-11",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-11-1",
       "original": "[11] Huiwen Chang, Han Zhang, Lu Jiang, Ce Liu, and William T Freeman."
      },
      {
       "id": "s-references-11-2",
       "original": "Maskgit: Masked generative image transformer."
      },
      {
       "id": "s-references-11-3",
       "original": "In Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition, pages 11315–11325, 2022."
      }
     ]
    },
    {
     "id": "p-references-12",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-12-1",
       "original": "[12] Huiwen Chang, Han Zhang, Jarred Barber, AJ Maschinot, Jose Lezama, Lu Jiang, Ming-Hsuan Yang, Kevin Murphy, William T Freeman, Michael Rubinstein, et al. Muse: Text-to-image generation via masked generative transformers. arXiv preprint arXiv:2301.00704, 2023."
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
       "original": "[13] Tianhong Li, Huiwen Chang, Shlok Mishra, Han Zhang, Dina Katabi, and Dilip Krishnan."
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
       "original": "Mage: Masked generative encoder to unify representation learning and image synthesis."
      },
      {
       "id": "s-references-14-2",
       "original": "In Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition, pages"
      }
     ]
    },
    {
     "id": "eq-references-3",
     "type": "equation",
     "page": 11,
     "original": "2142–2152, 2023."
    },
    {
     "id": "p-references-15",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-15-1",
       "original": "[14] Lijun Yu, Yong Cheng, Kihyuk Sohn, José Lezama, Han Zhang, Huiwen Chang, Alexander G Hauptmann, Ming-Hsuan Yang, Yuan Hao, Irfan Essa, et al. Magvit: Masked generative video transformer."
      },
      {
       "id": "s-references-15-2",
       "original": "In Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition, pages 10459–10469, 2023."
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
       "original": "[15] Lijun Yu, José Lezama, Nitesh B Gundavarapu, Luca Versari, Kihyuk Sohn, David Minnen, Yong Cheng, Agrim Gupta, Xiuye Gu, Alexander G Hauptmann, et al. Language model beats diffusion–tokenizer is key to visual generation. arXiv preprint arXiv:2310.05737, 2023."
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
       "original": "[16] Hugo Flores Garcia, Prem Seetharaman, Rithesh Kumar, and Bryan Pardo."
      },
      {
       "id": "s-references-17-2",
       "original": "Vampnet: Music generation via masked acoustic token modeling. arXiv preprint arXiv:2307.04686, 2023."
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
       "original": "[17] Xu Li, Qirui Wang, and Xiaoyu Liu."
      },
      {
       "id": "s-references-18-2",
       "original": "Masksr: Masked language model for full-band speech restoration. arXiv preprint arXiv:2406.02092, 2024."
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
       "original": "[18] Alon Ziv, Itai Gat, Gael Le Lan, Tal Remez, Felix Kreuk, Alexandre Défossez, Jade Copet, Gabriel Synnaeve, and Yossi Adi."
      },
      {
       "id": "s-references-19-2",
       "original": "Masked audio generation using a single non-autoregressive transformer. arXiv preprint arXiv:2401.04577, 2024."
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
       "original": "[19] Zalán Borsos, Matt Sharifi, Damien Vincent, Eugene Kharitonov, Neil Zeghidour, and Marco Tagliasacchi."
      },
      {
       "id": "s-references-20-2",
       "original": "Soundstorm: Efficient parallel audio generation. arXiv preprint arXiv:2305.09636,"
      }
     ]
    },
    {
     "id": "eq-references-4",
     "type": "equation",
     "page": 12,
     "original": "2023."
    },
    {
     "id": "p-references-21",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-21-1",
       "original": "[20] Aaron Van Den Oord, Oriol Vinyals, et al. Neural discrete representation learning."
      },
      {
       "id": "s-references-21-2",
       "original": "Advances in neural information processing systems, 30, 2017."
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
       "original": "[21] Yi Ren, Chenxu Hu, Xu Tan, Tao Qin, Sheng Zhao, Zhou Zhao, and Tie-Yan Liu."
      },
      {
       "id": "s-references-22-2",
       "original": "Fastspeech 2: Fast and high-quality end-to-end text to speech. arXiv preprint arXiv:2006.04558, 2020."
      }
     ]
    },
    {
     "id": "p-references-23",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-23-1",
       "original": "[22] Yi Ren, Yangjun Ruan, Xu Tan, Tao Qin, Sheng Zhao, Zhou Zhao, and Tie-Yan Liu."
      },
      {
       "id": "s-references-23-2",
       "original": "Fastspeech: Fast, robust and controllable text to speech."
      },
      {
       "id": "s-references-23-3",
       "original": "Advances in neural information processing systems,"
      }
     ]
    },
    {
     "id": "eq-references-5",
     "type": "equation",
     "page": 12,
     "original": "32, 2019."
    },
    {
     "id": "p-references-24",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-24-1",
       "original": "[23] Xu Tan, Jiawei Chen, Haohe Liu, Jian Cong, Chen Zhang, Yanqing Liu, Xi Wang, Yichong Leng, Yuanhao Yi, Lei He, et al. Naturalspeech: End-to-end text-to-speech synthesis with human-level quality."
      },
      {
       "id": "s-references-24-2",
       "original": "IEEE Transactions on Pattern Analysis and Machine Intelligence, 2024."
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
       "original": "[24] Yuxuan Wang, RJ Skerry-Ryan, Daisy Stanton, Yonghui Wu, Ron J Weiss, Navdeep Jaitly, Zongheng Yang, Ying Xiao, Zhifeng Chen, Samy Bengio, et al. Tacotron: Towards end-to-end speech synthesis. arXiv preprint arXiv:1703.10135, 2017."
      }
     ]
    },
    {
     "id": "p-references-26",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-26-1",
       "original": "[25] Jaehyeon Kim, Jungil Kong, and Juhee Son."
      },
      {
       "id": "s-references-26-2",
       "original": "Conditional variational autoencoder with adversarial learning for end-to-end text-to-speech."
      },
      {
       "id": "s-references-26-3",
       "original": "In International Conference on Machine Learning, pages 5530–5540."
      },
      {
       "id": "s-references-26-4",
       "original": "PMLR, 2021."
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
       "original": "[26] Alexandre Défossez, Jade Copet, Gabriel Synnaeve, and Yossi Adi."
      },
      {
       "id": "s-references-27-2",
       "original": "High fidelity neural audio compression. arXiv preprint arXiv:2210.13438, 2022."
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
       "original": "[27] Jade Copet, Felix Kreuk, Itai Gat, Tal Remez, David Kant, Gabriel Synnaeve, Yossi Adi, and Alexandre Défossez."
      },
      {
       "id": "s-references-28-2",
       "original": "Simple and controllable music generation."
      },
      {
       "id": "s-references-28-3",
       "original": "Advances in Neural Information Processing Systems, 36, 2024."
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
       "original": "[28] Neil Zeghidour, Alejandro Luebs, Ahmed Omran, Jan Skoglund, and Marco Tagliasacchi."
      }
     ]
    },
    {
     "id": "p-references-30",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-30-1",
       "original": "Soundstream: An end-to-end neural audio codec."
      },
      {
       "id": "s-references-30-2",
       "original": "IEEE/ACM Transactions on Audio, Speech, and Language Processing, 30:495–507, 2021."
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
       "original": "[29] Dongchao Yang, Dingdong Wang, Haohan Guo, Xueyuan Chen, Xixin Wu, and Helen Meng."
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
       "original": "Simplespeech: Towards simple and efficient text-to-speech with scalar latent transformer diffusion models. arXiv preprint arXiv:2406.02328, 2024."
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
       "original": "[30] Keon Lee, Dong Won Kim, Jaehyeon Kim, and Jaewoong Cho."
      },
      {
       "id": "s-references-33-2",
       "original": "Ditto-tts: Efficient and scalable zero-shot text-to-speech with diffusion transformer. arXiv preprint arXiv:2406.11427, 2024."
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
       "original": "[31] Sefik Emre Eskimez, Xiaofei Wang, Manthan Thakker, Canrun Li, Chung-Hsien Tsai, Zhen Xiao, Hemin Yang, Zirun Zhu, Min Tang, Xu Tan, et al. E2 tts: Embarrassingly easy fully non-autoregressive zero-shot tts. arXiv preprint arXiv:2406.18009, 2024."
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
       "original": "[32] José Lezama, Huiwen Chang, Lu Jiang, and Irfan Essa."
      },
      {
       "id": "s-references-35-2",
       "original": "Improved masked image generation with token-critic."
      },
      {
       "id": "s-references-35-3",
       "original": "In European Conference on Computer Vision, pages 70–86."
      },
      {
       "id": "s-references-35-4",
       "original": "Springer, 2022."
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
       "original": "[33] Yu-An Chung, Yu Zhang, Wei Han, Chung-Cheng Chiu, James Qin, Ruoming Pang, and Yonghui Wu."
      },
      {
       "id": "s-references-36-2",
       "original": "W2v-bert: Combining contrastive learning and masked language modeling for self-supervised speech pre-training."
      },
      {
       "id": "s-references-36-3",
       "original": "In 2021 IEEE Automatic Speech Recognition and Understanding Workshop (ASRU), pages 244–250."
      },
      {
       "id": "s-references-36-4",
       "original": "IEEE, 2021."
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
       "original": "[34] Wei-Ning Hsu, Benjamin Bolte, Yao-Hung Hubert Tsai, Kushal Lakhotia, Ruslan Salakhutdinov, and Abdelrahman Mohamed."
      },
      {
       "id": "s-references-37-2",
       "original": "Hubert: Self-supervised speech representation learning by masked prediction of hidden units."
      },
      {
       "id": "s-references-37-3",
       "original": "IEEE/ACM transactions on audio, speech, and language processing,"
      }
     ]
    },
    {
     "id": "eq-references-6",
     "type": "equation",
     "page": 13,
     "original": "29:3451–3460, 2021."
    },
    {
     "id": "p-references-38",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-references-38-1",
       "original": "[35] Sanyuan Chen, Chengyi Wang, Zhengyang Chen, Yu Wu, Shujie Liu, Zhuo Chen, Jinyu Li, Naoyuki Kanda, Takuya Yoshioka, Xiong Xiao, et al. Wavlm: Large-scale self-supervised pretraining for full stack speech processing."
      },
      {
       "id": "s-references-38-2",
       "original": "IEEE Journal of Selected Topics in Signal Processing,"
      }
     ]
    },
    {
     "id": "eq-references-7",
     "type": "equation",
     "page": 13,
     "original": "16(6):1505–1518, 2022."
    },
    {
     "id": "p-references-39",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-references-39-1",
       "original": "[36] Rithesh Kumar, Prem Seetharaman, Alejandro Luebs, Ishaan Kumar, and Kundan Kumar."
      },
      {
       "id": "s-references-39-2",
       "original": "Highfidelity audio compression with improved rvqgan."
      },
      {
       "id": "s-references-39-3",
       "original": "Advances in Neural Information Processing Systems, 36, 2024."
      }
     ]
    },
    {
     "id": "p-references-40",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-references-40-1",
       "original": "[37] James Betker."
      },
      {
       "id": "s-references-40-2",
       "original": "Better speech synthesis through scaling. arXiv preprint arXiv:2305.07243, 2023."
      }
     ]
    },
    {
     "id": "p-references-41",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-references-41-1",
       "original": "[38] Zhichao Huang, Chutong Meng, and Tom Ko."
      },
      {
       "id": "s-references-41-2",
       "original": "Repcodec: A speech representation codec for speech tokenization. arXiv preprint arXiv:2309.00169, 2023."
      }
     ]
    },
    {
     "id": "p-references-42",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-references-42-1",
       "original": "[39] Zhuang Liu, Hanzi Mao, Chao-Yuan Wu, Christoph Feichtenhofer, Trevor Darrell, and Saining Xie."
      },
      {
       "id": "s-references-42-2",
       "original": "A convnet for the 2020s."
      },
      {
       "id": "s-references-42-3",
       "original": "In Proceedings of the IEEE/CVF conference on computer vision and pattern recognition, pages 11976–11986, 2022."
      }
     ]
    },
    {
     "id": "p-references-43",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-references-43-1",
       "original": "[40] Jiahui Yu, Xin Li, Jing Yu Koh, Han Zhang, Ruoming Pang, James Qin, Alexander Ku, Yuanzhong Xu, Jason Baldridge, and Yonghui Wu."
      },
      {
       "id": "s-references-43-2",
       "original": "Vector-quantized image modeling with improved vqgan. arXiv preprint arXiv:2110.04627, 2021."
      }
     ]
    },
    {
     "id": "p-references-44",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-references-44-1",
       "original": "[41] Hugo Touvron, Louis Martin, Kevin Stone, Peter Albert, Amjad Almahairi, Yasmine Babaei, Nikolay Bashlykov, Soumya Batra, Prajjwal Bhargava, Shruti Bhosale, et al. Llama 2: Open foundation and fine-tuned chat models. arXiv preprint arXiv:2307.09288, 2023."
      }
     ]
    },
    {
     "id": "p-references-45",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-references-45-1",
       "original": "[42] Dan Hendrycks and Kevin Gimpel."
      }
     ]
    },
    {
     "id": "p-references-46",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-references-46-1",
       "original": "Gaussian error linear units (gelus)."
      }
     ]
    },
    {
     "id": "p-references-47",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-references-47-1",
       "original": "arXiv preprint arXiv:1606.08415, 2016."
      }
     ]
    },
    {
     "id": "p-references-48",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-references-48-1",
       "original": "[43] Jianlin Su, Murtadha Ahmed, Yu Lu, Shengfeng Pan, Wen Bo, and Yunfeng Liu."
      },
      {
       "id": "s-references-48-2",
       "original": "Roformer: Enhanced transformer with rotary position embedding."
      },
      {
       "id": "s-references-48-3",
       "original": "Neurocomputing, 568:127063, 2024."
      }
     ]
    },
    {
     "id": "p-references-49",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-references-49-1",
       "original": "[44] Biao Zhang and Rico Sennrich."
      },
      {
       "id": "s-references-49-2",
       "original": "Root mean square layer normalization."
      },
      {
       "id": "s-references-49-3",
       "original": "Advances in Neural Information Processing Systems, 32, 2019."
      }
     ]
    },
    {
     "id": "p-references-50",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-references-50-1",
       "original": "[45] Yaron Lipman, Ricky TQ Chen, Heli Ben-Hamu, Maximilian Nickel, and Matt Le."
      },
      {
       "id": "s-references-50-2",
       "original": "Flow matching for generative modeling. arXiv preprint arXiv:2210.02747, 2022."
      }
     ]
    },
    {
     "id": "p-references-51",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-references-51-1",
       "original": "[46] Hubert Siuzdak."
      },
      {
       "id": "s-references-51-2",
       "original": "Vocos: Closing the gap between time-domain and fourier-based neural vocoders for high-quality audio synthesis. arXiv preprint arXiv:2306.00814, 2023."
      }
     ]
    },
    {
     "id": "p-references-52",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-references-52-1",
       "original": "[47] Haorui He, Zengqiang Shang, Chaoren Wang, Xuyuan Li, Yicheng Gu, Hua Hua, Liwei Liu, Chen Yang, Jiaqi Li, Peiyang Shi, et al. Emilia: An extensive, multilingual, and diverse speech dataset for large-scale speech generation. arXiv preprint arXiv:2407.05361, 2024."
      }
     ]
    },
    {
     "id": "p-references-53",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-references-53-1",
       "original": "[48] Vassil Panayotov, Guoguo Chen, Daniel Povey, and Sanjeev Khudanpur."
      },
      {
       "id": "s-references-53-2",
       "original": "Librispeech: an asr corpus based on public domain audio books."
      },
      {
       "id": "s-references-53-3",
       "original": "In 2015 IEEE international conference on acoustics, speech and signal processing (ICASSP), pages 5206–5210."
      },
      {
       "id": "s-references-53-4",
       "original": "IEEE, 2015."
      }
     ]
    },
    {
     "id": "p-references-54",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-references-54-1",
       "original": "[49] Rosana Ardila, Megan Branson, Kelly Davis, Michael Henretty, Michael Kohler, Josh Meyer, Reuben Morais, Lindsay Saunders, Francis M Tyers, and Gregor Weber."
      },
      {
       "id": "s-references-54-2",
       "original": "Common voice: A massively-multilingual speech corpus. arXiv preprint arXiv:1912.06670, 2019."
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
       "original": "[50] Tingwei Guo, Cheng Wen, Dongwei Jiang, Ne Luo, Ruixiong Zhang, Shuaijiang Zhao, Wubo Li, Cheng Gong, Wei Zou, Kun Han, et al. Didispeech: A large scale mandarin speech corpus."
      },
      {
       "id": "s-references-55-2",
       "original": "In ICASSP 2021-2021 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP), pages 6968–6972."
      },
      {
       "id": "s-references-55-3",
       "original": "IEEE, 2021."
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
       "original": "[51] Alexei Baevski, Yuhao Zhou, Abdelrahman Mohamed, and Michael Auli."
      }
     ]
    },
    {
     "id": "p-references-57",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-57-1",
       "original": "wav2vec 2.0: A framework for self-supervised learning of speech representations."
      }
     ]
    },
    {
     "id": "p-references-58",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-58-1",
       "original": "Advances in neural information processing systems, 33:12449–12460, 2020."
      }
     ]
    },
    {
     "id": "p-references-59",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-59-1",
       "original": "[52] Edresson Casanova, Kelly Davis, Eren Gölge, Görkem Göknar, Iulian Gulea, Logan Hart, Aya Aljafari, Joshua Meyer, Reuben Morais, Samuel Olayemi, et al. Xtts: a massively multilingual zero-shot text-to-speech model. arXiv preprint arXiv:2406.04904, 2024."
      }
     ]
    },
    {
     "id": "p-references-60",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-60-1",
       "original": "[53] Zhihao Du, Qian Chen, Shiliang Zhang, Kai Hu, Heng Lu, Yexin Yang, Hangrui Hu, Siqi Zheng, Yue Gu, Ziyang Ma, et al. Cosyvoice: A scalable multilingual zero-shot text-to-speech synthesizer based on supervised semantic tokens. arXiv preprint arXiv:2407.05407, 2024."
      }
     ]
    },
    {
     "id": "p-references-61",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-61-1",
       "original": "[54] Mathieu Bernard and Hadrien Titeux."
      },
      {
       "id": "s-references-61-2",
       "original": "Phonemizer: Text to phones transcription for multiple languages in python."
      },
      {
       "id": "s-references-61-3",
       "original": "Journal of Open Source Software, 6(68):3958, 2021."
      }
     ]
    },
    {
     "id": "p-references-62",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-62-1",
       "original": "[55] Philip Gage."
      },
      {
       "id": "s-references-62-2",
       "original": "A new algorithm for data compression."
      },
      {
       "id": "s-references-62-3",
       "original": "The C Users Journal, 12(2):23–38, 1994."
      }
     ]
    },
    {
     "id": "p-references-63",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-63-1",
       "original": "[56] Ilya Loshchilov and Frank Hutter."
      },
      {
       "id": "s-references-63-2",
       "original": "Decoupled weight decay regularization. arXiv preprint arXiv:1711.05101, 2017."
      }
     ]
    },
    {
     "id": "p-references-64",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-64-1",
       "original": "[57] Jonathan Ho and Tim Salimans."
      }
     ]
    },
    {
     "id": "p-references-65",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-65-1",
       "original": "Classifier-free diffusion guidance."
      }
     ]
    },
    {
     "id": "p-references-66",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-66-1",
       "original": "arXiv preprint arXiv:2207.12598, 2022."
      }
     ]
    },
    {
     "id": "p-references-67",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-67-1",
       "original": "[58] Shanchuan Lin, Bingchen Liu, Jiashi Li, and Xiao Yang."
      },
      {
       "id": "s-references-67-2",
       "original": "Common diffusion noise schedules and sample steps are flawed."
      },
      {
       "id": "s-references-67-3",
       "original": "In Proceedings of the IEEE/CVF winter conference on applications of computer vision, pages 5404–5411, 2024."
      }
     ]
    },
    {
     "id": "p-references-68",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-68-1",
       "original": "[59] Guanlong Zhao, Evgeny Chukharev-Hudilainen, Sinem Sonsaat, Alif Silpachai, Ivana Lucic, Ricardo Gutierrez-Osuna, and John Levis."
      },
      {
       "id": "s-references-68-2",
       "original": "L2-arctic: A non-native english speech corpus. 2018."
      }
     ]
    },
    {
     "id": "p-references-69",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-69-1",
       "original": "[60] Kun Zhou, Berrak Sisman, Rui Liu, and Haizhou Li."
      },
      {
       "id": "s-references-69-2",
       "original": "Seen and unseen emotional style transfer for voice conversion with a new emotional speech dataset."
      },
      {
       "id": "s-references-69-3",
       "original": "In ICASSP 2021-2021 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP), pages 920–924."
      },
      {
       "id": "s-references-69-4",
       "original": "IEEE, 2021."
      }
     ]
    },
    {
     "id": "p-references-70",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-70-1",
       "original": "[61] Huaying Xue, Xiulian Peng, Yan Lu, et al. Convert and speak: Zero-shot accent conversion with minimum supervision."
      },
      {
       "id": "s-references-70-2",
       "original": "In ACM Multimedia 2024."
      }
     ]
    },
    {
     "id": "p-references-71",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-71-1",
       "original": "[62] Kaizhi Qian, Yang Zhang, Shiyu Chang, Xuesong Yang, and Mark Hasegawa-Johnson."
      },
      {
       "id": "s-references-71-2",
       "original": "Autovc: Zero-shot voice style transfer with only autoencoder loss."
      },
      {
       "id": "s-references-71-3",
       "original": "In International Conference on Machine Learning, pages 5210–5219."
      },
      {
       "id": "s-references-71-4",
       "original": "PMLR, 2019."
      }
     ]
    },
    {
     "id": "p-references-72",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-72-1",
       "original": "[63] Ziyang Ma, Zhisheng Zheng, Jiaxin Ye, Jinchao Li, Zhifu Gao, Shiliang Zhang, and Xie Chen."
      }
     ]
    },
    {
     "id": "p-references-73",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-73-1",
       "original": "emotion2vec: Self-supervised pre-training for speech emotion representation. arXiv preprint arXiv:2312.15185, 2023."
      }
     ]
    },
    {
     "id": "p-references-74",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-74-1",
       "original": "[64] Sang-gil Lee, Wei Ping, Boris Ginsburg, Bryan Catanzaro, and Sungroh Yoon."
      },
      {
       "id": "s-references-74-2",
       "original": "Bigvgan: A universal neural vocoder with large-scale training. arXiv preprint arXiv:2206.04658, 2022."
      }
     ]
    },
    {
     "id": "p-references-75",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-75-1",
       "original": "[65] Xingchao Liu, Chengyue Gong, and Qiang Liu."
      },
      {
       "id": "s-references-75-2",
       "original": "Flow straight and fast: Learning to generate and transfer data with rectified flow. arXiv preprint arXiv:2209.03003, 2022."
      }
     ]
    },
    {
     "id": "p-references-76",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-76-1",
       "original": "[66] Jaehyeon Kim, Sungwon Kim, Jungil Kong, and Sungroh Yoon."
      },
      {
       "id": "s-references-76-2",
       "original": "Glow-tts: A generative flow for text-to-speech via monotonic alignment search."
      },
      {
       "id": "s-references-76-3",
       "original": "Advances in Neural Information Processing Systems, 33:8067–8077, 2020."
      }
     ]
    },
    {
     "id": "p-references-77",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-77-1",
       "original": "[67] Zalán Borsos, Raphaël Marinier, Damien Vincent, Eugene Kharitonov, Olivier Pietquin, Matt Sharifi, Dominik Roblek, Olivier Teboul, David Grangier, Marco Tagliasacchi, et al. Audiolm: a language modeling approach to audio generation."
      },
      {
       "id": "s-references-77-2",
       "original": "IEEE/ACM transactions on audio, speech, and language processing, 31:2523–2533, 2023."
      }
     ]
    },
    {
     "id": "p-references-78",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-78-1",
       "original": "[68] Hao-Han Guo, Kun Liu, Fei-Yu Shen, Yi-Chen Wu, Feng-Long Xie, Kun Xie, and Kai-Tuo Xu."
      },
      {
       "id": "s-references-78-2",
       "original": "Fireredtts: A foundation text-to-speech framework for industry-level generative speech applications. arXiv preprint arXiv:2409.03283, 2024."
      }
     ]
    },
    {
     "id": "p-references-79",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-79-1",
       "original": "[69] Xin Zhang, Dong Zhang, Shimin Li, Yaqian Zhou, and Xipeng Qiu."
      },
      {
       "id": "s-references-79-2",
       "original": "Speechtokenizer: Unified speech tokenizer for speech large language models. arXiv preprint arXiv:2308.16692, 2023."
      }
     ]
    },
    {
     "id": "p-references-80",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-80-1",
       "original": "[70] Xueyao Zhang, Liumeng Xue, Yuancheng Wang, Yicheng Gu, Xi Chen, Zihao Fang, Haopeng Chen, Lexiao Zou, Chaoren Wang, Jun Han, et al. Amphion: An open-source audio, music and speech generation toolkit. arXiv preprint arXiv:2312.09911, 2023."
      }
     ]
    },
    {
     "id": "p-references-81",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-81-1",
       "original": "[71] Jacob Kahn, Morgane Riviere, Weiyi Zheng, Evgeny Kharitonov, Qiantong Xu, PierreEmmanuel Mazaré, Julien Karadayi, Vitaliy Liptchinsky, Ronan Collobert, Christian Fuegen, et al. Libri-light: A benchmark for asr with limited or no supervision."
      },
      {
       "id": "s-references-81-2",
       "original": "In ICASSP 2020-2020 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP), pages 7669–7673."
      },
      {
       "id": "s-references-81-3",
       "original": "IEEE, 2020."
      }
     ]
    },
    {
     "id": "p-references-82",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-82-1",
       "original": "[72] Josh Achiam, Steven Adler, Sandhini Agarwal, Lama Ahmad, Ilge Akkaya, Florencia Leoni Aleman, Diogo Almeida, Janko Altenschmidt, Sam Altman, Shyamal Anadkat, et al. Gpt-4 technical report. arXiv preprint arXiv:2303.08774, 2023."
      }
     ]
    },
    {
     "id": "p-references-83",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-83-1",
       "original": "[73] Chenpeng Du, Yiwei Guo, Feiyu Shen, Zhijun Liu, Zheng Liang, Xie Chen, Shuai Wang, Hui Zhang, and Kai Yu."
      },
      {
       "id": "s-references-83-2",
       "original": "Unicats: A unified context-aware text-to-speech framework with contextual vq-diffusion and vocoding."
      },
      {
       "id": "s-references-83-3",
       "original": "In Proceedings of the AAAI Conference on Artificial Intelligence, volume 38, pages 17924–17932, 2024."
      }
     ]
    },
    {
     "id": "p-references-84",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-84-1",
       "original": "[74] Jingyi Li, Weiping Tu, and Li Xiao."
      },
      {
       "id": "s-references-84-2",
       "original": "Freevc: Towards high-quality text-free one-shot voice conversion."
      },
      {
       "id": "s-references-84-3",
       "original": "In ICASSP 2023-2023 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP), pages 1–5."
      },
      {
       "id": "s-references-84-4",
       "original": "IEEE, 2023."
      }
     ]
    },
    {
     "id": "p-references-85",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-85-1",
       "original": "[75] Fabian Mentzer, David Minnen, Eirikur Agustsson, and Michael Tschannen."
      },
      {
       "id": "s-references-85-2",
       "original": "Finite scalar quantization: Vq-vae made simple. arXiv preprint arXiv:2309.15505, 2023."
      }
     ]
    }
   ]
  },
  {
   "id": "sec-A",
   "num": "A",
   "level": 1,
   "page": 15,
   "title": {
    "original": "Details of MaskGCT",
    "zh": "Details of MaskGCT"
   },
   "blocks": []
  },
  {
   "id": "sec-A-1",
   "num": "A.1",
   "level": 2,
   "page": 15,
   "title": {
    "original": "Model Architecture",
    "zh": "Model Architecture"
   },
   "blocks": [
    {
     "id": "p-A-1-1",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-A-1-1-1",
       "original": "We use a Llama-style [41] Transformer architecture as the backbone of our model, incorporating gated linear units with GELU [42] activation (SwiGLU), rotation position encoding [43], etc., but replacing causal attention with bidirectional attention.",
       "zh": "我们使用 Llama 风格 [41] 的 Transformer 架构作为模型骨干，结合带 GELU [42] 激活（SwiGLU）的门控线性单元、旋转位置编码 [43] 等，但把因果注意力替换为双向注意力。"
      },
      {
       "id": "s-A-1-1-2",
       "original": "We also use adaptive RMSNorm [44], which accepts the time step t as the condition.",
       "zh": "我们还使用自适应 RMSNorm [44]，它接受时间步 t 作为条件。"
      },
      {
       "id": "s-A-1-1-3",
       "original": "Table 7 presents the key hyperparameters of the models.",
       "zh": "Table 7 列出了模型的关键超参数。"
      }
     ]
    },
    {
     "id": "tab-A-1-1",
     "type": "table_caption",
     "page": 15,
     "original": "Table 7: Overview of the key hyperparameters of MaskGCT.",
     "zh": "表 7：MaskGCT 关键超参数总览。"
    }
   ]
  },
  {
   "id": "sec-t2s-base",
   "num": null,
   "level": 2,
   "page": 15,
   "title": {
    "original": "T2S-Base",
    "zh": "T2S-Base"
   },
   "blocks": [
    {
     "id": "p-t2s-base-1",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-t2s-base-1-1",
       "original": "T2S-Large S2A Layers",
       "zh": "表头：T2S-Large / S2A / Layers（后续照原文）。"
      }
     ]
    },
    {
     "id": "eq-t2s-base-1",
     "type": "equation",
     "page": 15,
     "original": "16 16 16"
    },
    {
     "id": "eq-t2s-base-2",
     "type": "equation",
     "page": 15,
     "original": "Model Dimension"
    },
    {
     "id": "eq-t2s-base-3",
     "type": "equation",
     "page": 15,
     "original": "1,024 1,536 1,024"
    },
    {
     "id": "eq-t2s-base-4",
     "type": "equation",
     "page": 15,
     "original": "FFN Dimension"
    },
    {
     "id": "eq-t2s-base-5",
     "type": "equation",
     "page": 15,
     "original": "4,096 6,144 4,096"
    },
    {
     "id": "eq-t2s-base-6",
     "type": "equation",
     "page": 15,
     "original": "Attention Heads"
    },
    {
     "id": "eq-t2s-base-7",
     "type": "equation",
     "page": 15,
     "original": "16 16 16"
    },
    {
     "id": "eq-t2s-base-8",
     "type": "equation",
     "page": 15,
     "original": "Attention Type Bidirectional Bidirectional Bidirectional Activation Function SwiGLU"
    },
    {
     "id": "eq-t2s-base-9",
     "type": "equation",
     "page": 15,
     "original": "- -"
    },
    {
     "id": "eq-t2s-base-10",
     "type": "equation",
     "page": 15,
     "original": "Positional Embeddings"
    },
    {
     "id": "eq-t2s-base-11",
     "type": "equation",
     "page": 15,
     "original": "RoPE (θ = 10,000) - -"
    },
    {
     "id": "p-t2s-base-2",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-t2s-base-2-1",
       "original": "Number of Parameters 315M 695M 353M",
       "zh": "（表格行）- / -；参数量（Number of Parameters）：315M / 695M / 353M。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-A-2",
   "num": "A.2",
   "level": 2,
   "page": 15,
   "title": {
    "original": "Inference Steps for the T2S model",
    "zh": "Inference Steps for the T2S model"
   },
   "blocks": [
    {
     "id": "fig-A-2-1",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "fig-A-2-1-s1",
       "original": "Figure 4 shows the relationship between inference steps and metrics SIM and WER for SeedTTS test-zh (left) and test-en (right). Initially, SIM increases significantly, stabilizing after 25 steps. For test-zh, SIM rises from 0.761 at 5 steps to 0.771 at 75 steps, and for test-en, from 0.696 to 0.715. SIM reaches high values with just 10 steps but peaks around 25 steps. WER improves more dramatically,",
       "zh": "图 4（文字在抽取层拆散到正文）展示了推理步数与指标 SIM、WER 的关系，左为 SeedTTS test-zh，右为 test-en：起初 SIM 显著上升并在 25 步后趋于稳定；test-zh 的 SIM 从 5 步时的 0.761 升到 75 步时的 0.771，test-en 从 0.696 升到 0.715；SIM 仅 10 步就能达到较高值并在 25 步左右达到峰值；WER 的改善更为显著——"
      }
     ]
    },
    {
     "id": "eq-A-2-1",
     "type": "equation",
     "page": 16,
     "original": "especially up to 25 steps. For test-zh, WER drops from 10.19 at 5 steps to 2.507 at 25 steps, and for"
    },
    {
     "id": "p-A-2-1",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-A-2-1-1",
       "original": "test-en, from 8.096 to 2.346.",
       "zh": "test-zh 上，WER 从 5 步时的 10.19 降到 25 步时的 2.507；test-en 上，从 8.096 降到 2.346。（原文此处混入脚注链接残留：4https://huggingface.co/Jzuluaga/accent-id-commonaccent_ecapa 5https://github.com/ddlBoJack/emotion2vec）"
      },
      {
       "id": "s-A-2-1-2",
       "original": "Both SIM and WER show minimal changes beyond 25 steps.",
       "zh": "超过 25 步后，SIM 和 WER 都几乎不再变化。"
      },
      {
       "id": "s-A-2-1-3",
       "original": "These findings indicate that while SIM metrics can be sufficiently optimized with around 10 inference steps, achieving the lowest WER values requires approximately 25 inference steps.",
       "zh": "这些发现表明：SIM 指标大约 10 步推理即可充分优化，而要取得最低 WER 大约需要 25 步推理。"
      },
      {
       "id": "s-A-2-1-4",
       "original": "Beyond this threshold, both SIM and WER metrics exhibit minimal changes, implying that further increases in inference steps do not yield substantial improvements in these performance metrics.",
       "zh": "超过这个阈值后，SIM 和 WER 都几乎不变，意味着继续增加推理步数不会在这些指标上带来实质提升。"
      },
      {
       "id": "s-A-2-1-5",
       "original": "Therefore, for practical applications, 25 inference steps may be considered optimal for balancing SIM and WER, ensuring efficient and effective performance.",
       "zh": "因此，实际应用中 25 步推理可视为平衡 SIM 与 WER 的最优选择，兼顾效率与效果。"
      }
     ]
    },
    {
     "id": "eq-A-2-2",
     "type": "equation",
     "page": 16,
     "original": "12"
    },
    {
     "id": "eq-A-2-3",
     "type": "equation",
     "page": 16,
     "original": "0.8"
    },
    {
     "id": "p-A-2-2",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-A-2-2-1",
       "original": "WER SIM",
       "zh": "SIM"
      }
     ]
    },
    {
     "id": "eq-A-2-4",
     "type": "equation",
     "page": 16,
     "original": "10"
    },
    {
     "id": "eq-A-2-5",
     "type": "equation",
     "page": 16,
     "original": "0.79"
    },
    {
     "id": "eq-A-2-6",
     "type": "equation",
     "page": 16,
     "original": "8"
    },
    {
     "id": "eq-A-2-7",
     "type": "equation",
     "page": 16,
     "original": "0.78"
    },
    {
     "id": "p-A-2-3",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-A-2-3-1",
       "original": "WER SIM",
       "zh": "SIM"
      }
     ]
    },
    {
     "id": "eq-A-2-8",
     "type": "equation",
     "page": 16,
     "original": "6"
    },
    {
     "id": "eq-A-2-9",
     "type": "equation",
     "page": 16,
     "original": "0.77"
    },
    {
     "id": "eq-A-2-10",
     "type": "equation",
     "page": 16,
     "original": "4"
    },
    {
     "id": "eq-A-2-11",
     "type": "equation",
     "page": 16,
     "original": "0.76"
    },
    {
     "id": "eq-A-2-12",
     "type": "equation",
     "page": 16,
     "original": "5 10 25 50 75 0.75"
    },
    {
     "id": "eq-A-2-13",
     "type": "equation",
     "page": 16,
     "original": "2"
    },
    {
     "id": "p-A-2-4",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-A-2-4-1",
       "original": "Inference Steps",
       "zh": "推理步数"
      }
     ]
    },
    {
     "id": "eq-A-2-14",
     "type": "equation",
     "page": 16,
     "original": "0.74"
    },
    {
     "id": "p-A-2-5",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-A-2-5-1",
       "original": "WER SIM",
       "zh": "SIM"
      }
     ]
    },
    {
     "id": "eq-A-2-15",
     "type": "equation",
     "page": 16,
     "original": "8"
    },
    {
     "id": "eq-A-2-16",
     "type": "equation",
     "page": 16,
     "original": "0.72"
    },
    {
     "id": "p-A-2-6",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-A-2-6-1",
       "original": "WER",
       "zh": "(3) 它在三个基准上的 WER 与真人相当，且在合理的语音时长范围内表现稳定，这也说明生成语音兼具多样性与可控性。"
      }
     ]
    },
    {
     "id": "eq-A-2-17",
     "type": "equation",
     "page": 16,
     "original": "6"
    },
    {
     "id": "p-A-2-7",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-A-2-7-1",
       "original": "SIM",
       "zh": "SIM"
      }
     ]
    },
    {
     "id": "eq-A-2-18",
     "type": "equation",
     "page": 16,
     "original": "0.7"
    },
    {
     "id": "eq-A-2-19",
     "type": "equation",
     "page": 16,
     "original": "4"
    },
    {
     "id": "eq-A-2-20",
     "type": "equation",
     "page": 16,
     "original": "5 10 25 50 75 0.68"
    },
    {
     "id": "eq-A-2-21",
     "type": "equation",
     "page": 16,
     "original": "2"
    },
    {
     "id": "p-A-2-8",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-A-2-8-1",
       "original": "Inference Steps",
       "zh": "推理步数"
      }
     ]
    },
    {
     "id": "fig-A-2-2",
     "type": "figure_caption",
     "page": 16,
     "original": "Figure 4: Inference Steps vs. SIM and WER. The results on the left are for SeedTTS test-zh, and the results on the right are for SeedTTS test-en. In this ablation study, we utilize the ground truth speech length.",
     "zh": "图 4：推理步数与 SIM、WER 的关系。左侧结果为 SeedTTS test-zh，右侧为 SeedTTS test-en。本消融实验使用真实语音长度。"
    }
   ]
  },
  {
   "id": "sec-A-3",
   "num": "A.3",
   "level": 2,
   "page": 16,
   "title": {
    "original": "Inference Steps for the S2A model",
    "zh": "Inference Steps for the S2A model"
   },
   "blocks": [
    {
     "id": "p-A-3-1",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-A-3-1-1",
       "original": "The S2A model generates tokens layer by layer during inference.",
       "zh": "S2A 模型的推理步数 S2A 模型在推理时逐层生成 token。"
      },
      {
       "id": "s-A-3-1-2",
       "original": "Since the acoustic codec follows an RVQ structure, we can view the S2A inference as a process from coarse to fine.",
       "zh": "由于声学 codec 采用 RVQ 结构，我们可以把 S2A 推理看作从粗到细的过程。"
      },
      {
       "id": "s-A-3-1-3",
       "original": "We also use more iterations in the initial layers, as the first few layers carry more information.",
       "zh": "我们在最初的若干层使用更多迭代步，因为前几层承载更多信息。"
      },
      {
       "id": "s-A-3-1-4",
       "original": "By default, we use inference steps of [40, 16, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] for each layer, however, we find that the S2A model can also perform well with fewer steps, such as [10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], with only a very slight performance loss.",
       "zh": "默认对各层使用推理步数 [40, 16, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]；但我们发现 S2A 模型用更少的步数如 [10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] 也能表现良好，性能损失非常轻微。"
      }
     ]
    },
    {
     "id": "tab-A-3-1",
     "type": "table_caption",
     "page": 16,
     "original": "Table 8: Evaluation results of different inference steps for the S2A model.",
     "zh": "表 8：S2A 模型不同推理步数的评估结果。"
    }
   ]
  },
  {
   "id": "sec-inference-steps",
   "num": null,
   "level": 2,
   "page": 16,
   "title": {
    "original": "Inference Steps",
    "zh": "推理步数"
   },
   "blocks": [
    {
     "id": "p-inference-steps-1",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-inference-steps-1-1",
       "original": "SIM-O ↑ WER ↓ FSD ↓ SeedTTS test-en",
       "zh": "(3) 它在三个基准上的 WER 与真人相当，且在合理的语音时长范围内表现稳定，这也说明生成语音兼具多样性与可控性。"
      }
     ]
    },
    {
     "id": "eq-inference-steps-1",
     "type": "equation",
     "page": 16,
     "original": "[10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] 0.709 2.796 0.164 [40, 16, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] 0.728 2.466"
    }
   ]
  },
  {
   "id": "sec-0-159",
   "num": "0.159",
   "level": 2,
   "page": 16,
   "title": {
    "original": "SeedTTS test-zh",
    "zh": "SeedTTS test-zh"
   },
   "blocks": [
    {
     "id": "eq-0-159-1",
     "type": "equation",
     "page": 16,
     "original": "[10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] 0.766 2.268 0.111 [40, 16, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] 0.777 2.183 0.101"
    }
   ]
  },
  {
   "id": "sec-A-4",
   "num": "A.4",
   "level": 2,
   "page": 16,
   "title": {
    "original": "Details of Semantic and Acoustic Codec",
    "zh": "语义与声学 Codec 的细节"
   },
   "blocks": [
    {
     "id": "p-A-4-1",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-A-4-1-1",
       "original": "For semantic codec, we train a VQ-VAE model using the hidden features from the 17th layer of W2v-BERT 2.0, incorporating factorized codec [32] technology.",
       "zh": "语义 codec 方面，我们训练一个 VQ-VAE 模型，使用 W2v-BERT 2.0 第 17 层的隐层特征，并结合分解式编码 [32] 技术。"
      },
      {
       "id": "s-A-4-1-2",
       "original": "The original hidden dimension of 1,024 is projected into a lower-dimensional space for quantization.",
       "zh": "原始 1,024 维的隐层维度被投影到更低维的空间进行量化。"
      },
      {
       "id": "s-A-4-1-3",
       "original": "The codebook size is set to 8,192, with a codebook dimension of 8.",
       "zh": "码本大小设为 8,192，码本维度为 8。"
      },
      {
       "id": "s-A-4-1-4",
       "original": "We employ only the L1 loss as the reconstruction target, optimizing the codebook with codebook loss and commitment loss.",
       "zh": "我们仅以 L1 损失作为重建目标，并用码本损失与承诺损失优化码本。"
      },
      {
       "id": "s-A-4-1-5",
       "original": "The input features are normalized to have a mean of 0 and a variance of 1, based on the statistics of the training dataset.",
       "zh": "输入特征按训练数据集的统计量归一化到均值 0、方差 1。"
      },
      {
       "id": "s-A-4-1-6",
       "original": "The encoder and the decoder are each composed of 12 mirrored ConvNext blocks, featuring a kernel size of 7 and a hidden size of 384.",
       "zh": "编码器与解码器各由 12 个镜像对称的 ConvNext 块组成，卷积核大小为 7，隐层维度为 384。"
      }
     ]
    },
    {
     "id": "p-A-4-2",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-A-4-2-1",
       "original": "For acoustic codec, the basic architecture of the encoder follows [36] and the decoder follows [46].",
       "zh": "声学 codec 方面，编码器的基本架构沿用 [36]，解码器沿用 [46]。"
      },
      {
       "id": "s-A-4-2-2",
       "original": "The Vocos-based decoder can model amplitude and phase, enabling waveform generation through Semantic features",
       "zh": "基于 Vocos 的解码器能建模幅度与相位，从而通过（语义特征）"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-speech-semantic",
   "num": null,
   "level": 2,
   "page": 17,
   "title": {
    "original": "Speech Semantic",
    "zh": "语音语义"
   },
   "blocks": []
  },
  {
   "id": "sec-codec",
   "num": null,
   "level": 2,
   "page": 17,
   "title": {
    "original": "Codec",
    "zh": "Codec"
   },
   "blocks": [
    {
     "id": "p-codec-1",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-codec-1-1",
       "original": "Decoder",
       "zh": "解码器"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-vq",
   "num": null,
   "level": 1,
   "page": 17,
   "title": {
    "original": "VQ",
    "zh": "VQ"
   },
   "blocks": []
  },
  {
   "id": "sec-encoder",
   "num": null,
   "level": 1,
   "page": 17,
   "title": {
    "original": "Encoder",
    "zh": "编码器"
   },
   "blocks": [
    {
     "id": "p-encoder-1",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-encoder-1-1",
       "original": "Semantic features W2v-BERT 2.0 Time/Spec Discriminator",
       "zh": "语义特征、W2v-BERT 2.0、时域/频域判别器"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-speech-acoustic",
   "num": null,
   "level": 2,
   "page": 17,
   "title": {
    "original": "Speech Acoustic",
    "zh": "语音声学"
   },
   "blocks": []
  },
  {
   "id": "sec-codec-2",
   "num": null,
   "level": 2,
   "page": 17,
   "title": {
    "original": "Codec",
    "zh": "Codec"
   },
   "blocks": [
    {
     "id": "p-codec-2-1",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-codec-2-1-1",
       "original": "Decoder",
       "zh": "解码器"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-rvq",
   "num": null,
   "level": 1,
   "page": 17,
   "title": {
    "original": "RVQ",
    "zh": "RVQ"
   },
   "blocks": []
  },
  {
   "id": "sec-encoder-2",
   "num": null,
   "level": 1,
   "page": 17,
   "title": {
    "original": "Encoder",
    "zh": "编码器"
   },
   "blocks": [
    {
     "id": "fig-encoder-2-1",
     "type": "figure_caption",
     "page": 17,
     "original": "Figure 5: An overview of the semantic codec (left) and acoustic codec (right). The semantic codec is trained to quantize semantic features with a single codebook and reconstruct semantic features. The acoustic codec is trained to quantize and reconstruct the speech waveform using RVQ, with time and spectral discriminators to enhance the reconstruction quality further.",
     "zh": "图 5：语义 codec（左）与声学 codec（右）总览。语义 codec 学习用单一码本量化语义特征并重建语义特征；声学 codec 学习用 RVQ 量化并重建语音波形，并借助时域与频域判别器进一步提升重建质量。"
    },
    {
     "id": "tab-encoder-2-1",
     "type": "table_caption",
     "page": 17,
     "original": "Table 9: The detailed model configurations of semantic codec and acoustic codec.",
     "zh": "表 9：语义 codec 与声学 codec 的详细模型配置。"
    }
   ]
  },
  {
   "id": "sec-semantic-codec",
   "num": null,
   "level": 2,
   "page": 17,
   "title": {
    "original": "Semantic Codec",
    "zh": "语义 Codec"
   },
   "blocks": [
    {
     "id": "p-semantic-codec-1",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-semantic-codec-1-1",
       "original": "Acoustic Codec Input W2v-BERT 2.0 hidden Waveform Sample Rate 16K 24K Hopsize",
       "zh": "（表：Acoustic Codec 对比——Input：W2v-BERT 2.0 hidden / Waveform；Sample Rate 16K/24K；Hopsize 320/480；(R)VQ Blocks 数 1/12；Codebook size 8,192/1,024；Codebook Dimension 8/8；Decoder Hidden Dimension 384/512；Decoder Kernel Size 7/7；Decoder Blocks 数 12/30；参数量 44M/170M。）无需上采样的逆 STFT 变换。"
      }
     ]
    },
    {
     "id": "eq-semantic-codec-1",
     "type": "equation",
     "page": 17,
     "original": "320 480"
    },
    {
     "id": "eq-semantic-codec-2",
     "type": "equation",
     "page": 17,
     "original": "Number of (R)VQ Blocks"
    },
    {
     "id": "eq-semantic-codec-3",
     "type": "equation",
     "page": 17,
     "original": "1 12"
    },
    {
     "id": "eq-semantic-codec-4",
     "type": "equation",
     "page": 17,
     "original": "Codebook size"
    },
    {
     "id": "eq-semantic-codec-5",
     "type": "equation",
     "page": 17,
     "original": "8,192 1,024"
    },
    {
     "id": "eq-semantic-codec-6",
     "type": "equation",
     "page": 17,
     "original": "Codebook Dimension"
    },
    {
     "id": "eq-semantic-codec-7",
     "type": "equation",
     "page": 17,
     "original": "8 8"
    },
    {
     "id": "eq-semantic-codec-8",
     "type": "equation",
     "page": 17,
     "original": "Decoder Hidden Dimension"
    },
    {
     "id": "eq-semantic-codec-9",
     "type": "equation",
     "page": 17,
     "original": "384 512"
    },
    {
     "id": "eq-semantic-codec-10",
     "type": "equation",
     "page": 17,
     "original": "Decoder Kernel Size"
    },
    {
     "id": "eq-semantic-codec-11",
     "type": "equation",
     "page": 17,
     "original": "7 7"
    },
    {
     "id": "eq-semantic-codec-12",
     "type": "equation",
     "page": 17,
     "original": "Number of Decoder Blocks"
    },
    {
     "id": "eq-semantic-codec-13",
     "type": "equation",
     "page": 17,
     "original": "12 30"
    },
    {
     "id": "p-semantic-codec-2",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-semantic-codec-2-1",
       "original": "Number of Parameters 44M 170M inverse STFT transformation without requiring upsampling.",
       "zh": "（表：Acoustic Codec 对比——Input：W2v-BERT 2.0 hidden / Waveform；Sample Rate 16K/24K；Hopsize 320/480；(R)VQ Blocks 数 1/12；Codebook size 8,192/1,024；Codebook Dimension 8/8；Decoder Hidden Dimension 384/512；Decoder Kernel Size 7/7；Decoder Blocks 数 12/30；参数量 44M/170M。）无需上采样的逆 STFT 变换。"
      },
      {
       "id": "s-semantic-codec-2-2",
       "original": "The number of RVQ layers, codebook size, and codebook dimension are set to 12, 8,192, and 8, respectively.",
       "zh": "RVQ 层数、码本大小与码本维度分别设为 12、8,192 和 8。"
      },
      {
       "id": "s-semantic-codec-2-3",
       "original": "We utilize the multi-scale mel-reconstruction loss [36] Lrec, for the adversarial loss Ladv, we employ both the multi-period discriminator (MPD) and the multi-band multi-scale STFT discriminator, as proposed by [36, 64].",
       "zh": "我们采用多尺度 Mel 重建损失 [36] Lrec；对抗损失 Ladv 同时使用多周期判别器（MPD）与 [36, 64] 提出的多频带多尺度 STFT 判别器。"
      },
      {
       "id": "s-semantic-codec-2-4",
       "original": "Additionally, we incorporate the relative feature matching loss Lfeat.",
       "zh": "此外，我们加入相对特征匹配损失 Lfeat。"
      },
      {
       "id": "s-semantic-codec-2-5",
       "original": "For codebook learning, we use the codebook loss Lcodebook and the commitment loss Lcommit from VQ-VAE.",
       "zh": "码本学习方面，我们使用 VQ-VAE 的码本损失 Lcodebook 和承诺损失 Lcommit。"
      },
      {
       "id": "s-semantic-codec-2-6",
       "original": "We set λrec = 10.0, λadv = 2.0, λfeat = 2.0, λcodebook = 1.0, λcommit = 0.25 as coefficients for balancing each loss terms.",
       "zh": "各损失项的平衡系数设为 λrec = 10.0、λadv = 2.0、λfeat = 2.0、λcodebook = 1.0、λcommit = 0.25。"
      },
      {
       "id": "s-semantic-codec-2-7",
       "original": "Figure 5 shows the overview of the semantic codec and acoustic codec, Table 9 presents the detailed model configurations of semantic codec and acoustic codec.",
       "zh": "Figure 5 展示语义 codec 与声学 codec 的总览，Table 9 列出两者的详细模型配置。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-A-5",
   "num": "A.5",
   "level": 2,
   "page": 17,
   "title": {
    "original": "Details of Duration Predictor",
    "zh": "Details of Duration Predictor"
   },
   "blocks": [
    {
     "id": "p-A-5-1",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-A-5-1-1",
       "original": "MaskGCT requires specifying the target speech duration during inference, so we train a flow matching [45, 65] based duration predictor to obtain the total duration of the target audio by summing the phone-level duration.",
       "zh": "时长预测器的细节：MaskGCT 推理时需要指定目标语音时长，因此我们训练了一个基于流匹配 [45, 65] 的时长预测器，通过对音素级时长求和来得到目标音频的总时长。"
      },
      {
       "id": "s-A-5-1-2",
       "original": "Note that we do not need to actually use the phone-level durations but only use them to make a reasonable estimate of the total duration, leaving other total duration predictor methods for future works to explore.",
       "zh": "注意，我们并不实际使用音素级时长，只用它们对总时长做合理估计；其他总时长预测方法留给未来工作探索。"
      },
      {
       "id": "s-A-5-1-3",
       "original": "The duration predictor has a similar Transformer architecture to MaskGCT, with 12 layers, 12 attention heads, and a hidden size of 768.",
       "zh": "时长预测器的 Transformer 架构与 MaskGCT 类似，共 12 层、12 个注意力头，隐层维度 768。"
      },
      {
       "id": "s-A-5-1-4",
       "original": "We also adapt in-context learning and classifier-free guidance for the duration predictor.",
       "zh": "时长预测器同样采用上下文学习与无分类器引导。"
      },
      {
       "id": "s-A-5-1-5",
       "original": "During training, we randomly select a prefix segment of the phoneme sequence and its corresponding duration as a prompt, which is not added with noise.",
       "zh": "训练时，我们随机选取音素序列的一段前缀及其对应时长作为提示，提示部分不加噪声。"
      },
      {
       "id": "s-A-5-1-6",
       "original": "At the same time, we use a probability of 0.15 to drop the prompt.",
       "zh": "同时以 0.15 的概率丢弃提示。"
      },
      {
       "id": "s-A-5-1-7",
       "original": "We model the duration in the log domain using flow matching.",
       "zh": "我们在对数域用流匹配对时长建模。"
      },
      {
       "id": "s-A-5-1-8",
       "original": "We denote x1 as a random variable of log(duration+1), x0 as a randomly sampled Gaussian noise, then vθ(xt, t) = xt = (1−t)x0 +tx1, where the timestep t ∈[0, 1].",
       "zh": "记 x1 为 log(duration+1) 的随机变量，x0 为随机采样的高斯噪声，则 vθ(xt, t) = xt = (1−t)x0 +tx1，其中时间步 t ∈[0, 1]。"
      },
      {
       "id": "s-A-5-1-9",
       "original": "The loss function of the duration predictor is Et,x1(vθ(xt, t)−(x1−x0))2.",
       "zh": "时长预测器的损失函数为 Et,x1(vθ(xt, t)−(x1−x0))2。"
      },
      {
       "id": "s-A-5-1-10",
       "original": "In the inference stage, we use a midpoint ODE solver to generate the target from randomly sampled Gaussian noise with a total of 4 steps.",
       "zh": "推理阶段，我们用中点 ODE 求解器从随机采样的高斯噪声出发生成目标，共 4 步。"
      },
      {
       "id": "s-A-5-1-11",
       "original": "We pretrain a duration aligner (between phoneme and W2v-BERT 2.0 semantic feature) based on monotonic alignment search (MAS) [66] to get the ground truth duration for each phoneme.",
       "zh": "我们预训练了一个基于单调对齐搜索（MAS）[66] 的时长对齐器（音素与 W2v-BERT 2.0 语义特征之间），以得到每个音素的真实时长。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-A-6",
   "num": "A.6",
   "level": 2,
   "page": 18,
   "title": {
    "original": "Text Tokenizer",
    "zh": "Text Tokenizer"
   },
   "blocks": [
    {
     "id": "p-A-6-1",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-A-6-1-1",
       "original": "We consider two text tokenization methods: Grapheme-to-Phoneme (G2P) and Byte Pair Encoding (BPE).",
       "zh": "文本分词器：我们考虑两种文本分词方法——字位转音素（G2P）和 BPE。"
      },
      {
       "id": "s-A-6-1-2",
       "original": "For G2P, we employ phonemize6 for English and a combination of jieba7 and pypinyin8 for Chinese.",
       "zh": "G2P 方面，英文用 phonemize6，中文用 jieba7 加 pypinyin8 的组合。"
      },
      {
       "id": "s-A-6-1-3",
       "original": "For BPE, we utilize the BPE method and vocabulary from Whisper9, with a vocabulary size exceeding 30,000.",
       "zh": "BPE 方面，我们使用 Whisper9 的 BPE 方法与词表，词表规模超过 30,000。"
      },
      {
       "id": "s-A-6-1-4",
       "original": "Table 10 shows the comparison results of MaskGCT using the two different text tokenization methods.",
       "zh": "Table 10 给出了 MaskGCT 使用两种文本分词方法的对比结果。"
      },
      {
       "id": "s-A-6-1-5",
       "original": "The results indicate that G2P outperforms BPE in English with a higher SIM-O of 0.728 compared to 0.711 and a lower WER of 2.466 versus 4.036.",
       "zh": "结果表明，G2P 在英文上优于 BPE：SIM-O 更高（0.728 对 0.711），WER 更低（2.466 对 4.036）。"
      },
      {
       "id": "s-A-6-1-6",
       "original": "Conversely, in Chinese, G2P maintains a slightly higher SIM-O (0.777 vs. 0.769) but BPE achieves a lower WER (1.921 vs. 2.338).",
       "zh": "相反，在中文上 G2P 的 SIM-O 略高（0.777 对 0.769），但 BPE 的 WER 更低（1.921 对 2.338）。"
      },
      {
       "id": "s-A-6-1-7",
       "original": "These findings suggest that while G2P is superior in preserving text similarity and reducing errors in English, BPE is more effective in minimizing WER in Chinese.",
       "zh": "这些发现说明：G2P 在英文上更利于保持文本相似度并减少错误，而 BPE 在中文上更能降低 WER。"
      },
      {
       "id": "s-A-6-1-8",
       "original": "We hypothesize that the reason might be that the Chinese G2P system we used still has deficiencies in handling polyphonic characters.",
       "zh": "我们推测，原因可能在于所使用的中文 G2P 系统在处理多音字方面仍有不足。"
      },
      {
       "id": "s-A-6-1-9",
       "original": "In contrast, BPE can learn different pronunciations for the same character based on context.",
       "zh": "相比之下，BPE 能根据上下文为同一个汉字学到不同发音。"
      }
     ]
    },
    {
     "id": "tab-A-6-1",
     "type": "table_caption",
     "page": 18,
     "original": "Table 10: G2P vs. BPE.",
     "zh": "表 10：G2P 与 BPE 的对比。"
    },
    {
     "id": "p-A-6-2",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-A-6-2-1",
       "original": "SIM-O ↑ WER ↓ SeedTTS test-en G2P",
       "zh": "(3) 它在三个基准上的 WER 与真人相当，且在合理的语音时长范围内表现稳定，这也说明生成语音兼具多样性与可控性。\nSIM-O ↑ WER ↓ SeedTTS test-en G2P"
      }
     ]
    },
    {
     "id": "eq-A-6-1",
     "type": "equation",
     "page": 18,
     "original": "0.728 2.466"
    },
    {
     "id": "eq-A-6-2",
     "type": "equation",
     "page": 18,
     "original": "BPE"
    },
    {
     "id": "eq-A-6-3",
     "type": "equation",
     "page": 18,
     "original": "0.711 4.036"
    },
    {
     "id": "eq-A-6-4",
     "type": "equation",
     "page": 18,
     "original": "SeedTTS test-zh G2P"
    },
    {
     "id": "eq-A-6-5",
     "type": "equation",
     "page": 18,
     "original": "0.777 2.183"
    },
    {
     "id": "eq-A-6-6",
     "type": "equation",
     "page": 18,
     "original": "BPE"
    },
    {
     "id": "eq-A-6-7",
     "type": "equation",
     "page": 18,
     "original": "0.769 1.921"
    }
   ]
  },
  {
   "id": "sec-B",
   "num": "B",
   "level": 1,
   "page": 18,
   "title": {
    "original": "Discussion about Semantic and Acoustic Definitions",
    "zh": "关于语义与声学定义的讨论"
   },
   "blocks": [
    {
     "id": "p-B-1",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-B-1-1",
       "original": "In this paper, we refer to the speech representation extracted from the speech self-supervised learning (SSL) model as the semantic feature.",
       "zh": "本文把从语音自监督学习（SSL）模型中提取的语音表征称为语义特征。"
      },
      {
       "id": "s-B-1-2",
       "original": "The discrete tokens obtained through the discretization of these semantic features (using k-means or vector quantization are termed semantic tokens.",
       "zh": "把这些语义特征离散化（使用 k-means 或向量量化）得到的离散 token 称为语义 token。"
      },
      {
       "id": "s-B-1-3",
       "original": "Similarly, we define the representations from melspectrogram, neural speech codecs, or speech VAE as acoustic features, and their discrete counterparts are called acoustic tokens.",
       "zh": "类似地，我们把来自 Mel 频谱图、神经语音 codec 或语音 VAE 的表征定义为声学特征，其离散对应物称为声学 token。"
      },
      {
       "id": "s-B-1-4",
       "original": "This terminology was first introduced in [67] and has since been adopted by many subsequent works [8, 19, 38, 68, 69].",
       "zh": "这套术语最早由 [67] 提出，此后被许多后续工作 [8, 19, 38, 68, 69] 沿用。"
      },
      {
       "id": "s-B-1-5",
       "original": "It is important to note that this is not a strictly rigorous definition.",
       "zh": "需要注意的是，这并不是一个严格严谨的定义。"
      },
      {
       "id": "s-B-1-6",
       "original": "Generally, we consider semantic features or tokens to contain more prominent linguistic information and exhibit stronger correlations with phonemes or text.",
       "zh": "一般而言，我们认为语义特征或 token 含有更突出的语言学信息，与音素或文本的相关性更强。"
      },
      {
       "id": "s-B-1-7",
       "original": "One measure of this is the phonetic discriminability in terms of the ABX error rate.",
       "zh": "一种衡量方式是 ABX 错误率所反映的音素可区分性。"
      },
      {
       "id": "s-B-1-8",
       "original": "In this paper, the W2v-BERT 2.0 features we use have a phonetic discriminability within less than 5 on the LibriSpeech dev-clean dataset, whereas acoustic features, for example, Encodec latent features, score above 20 on this metric.",
       "zh": "本文使用的 W2v-BERT 2.0 特征在 LibriSpeech dev-clean 数据集上的音素可区分性 ABX 错误率低于 5，而声学特征（例如 Encodec 潜在特征）在该指标上超过 20。"
      },
      {
       "id": "s-B-1-9",
       "original": "However, it is worth noting that semantic features or tokens not only contain semantic information but also include prosodic and timbre aspects.",
       "zh": "不过值得注意的是，语义特征或 token 不只包含语义信息，也包含韵律和音色成分。"
      },
      {
       "id": "s-B-1-10",
       "original": "In fact, we suggest that for certain two-stage zero-shot TTS systems, excessive loss of information in semantic tokens can degrade the performance of the second stage, where semantic-to-acoustic conversion occurs.",
       "zh": "事实上，我们认为对某些两阶段零样本 TTS 系统而言，语义 token 中过多的信息损失会损害第二阶段（语义到声学转换）的性能。"
      },
      {
       "id": "s-B-1-11",
       "original": "Therefore, finding a speech representation that is more suitable for speech generation remains a challenging problem.",
       "zh": "因此，找到一种更适合语音生成的语音表征仍是一个有挑战性的问题。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-C",
   "num": "C",
   "level": 1,
   "page": 18,
   "title": {
    "original": "Classifier-Free Guidance",
    "zh": "无分类器引导"
   },
   "blocks": [
    {
     "id": "p-C-1",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-C-1-1",
       "original": "We adopt the classifier-free guidance [57] technique for both the T2S model and the S2A model.",
       "zh": "我们对 T2S 模型和 S2A 模型都采用无分类器引导（classifier-free guidance）[57] 技术。"
      },
      {
       "id": "s-C-1-2",
       "original": "We also introduce classifier-free guidance with rescaling, following [58].",
       "zh": "我们还沿用 [58] 引入了带重缩放的无分类器引导。"
      },
      {
       "id": "s-C-1-3",
       "original": "In the training stage, we randomly drop the prompt with a probability of 0.15 to model the probability distribution pθ(X) without the prompt.",
       "zh": "训练阶段，我们以 0.15 的概率随机丢弃提示，从而对无提示的概率分布 pθ(X) 建模。"
      },
      {
       "id": "s-C-1-4",
       "original": "During inference, we compute the output embedding gcfg θ (X|Xp) = 6https://github.com/bootphon/phonemizer 7https://github.com/fxsjy/jieba 8https://github.com/mozillazg/python-pinyin 9https://github.com/huggingface/transformers/blob/main/src/transformers/models/ whisper/tokenization_whisper.py gθ(X|Xp) + wcfg · (gθ(X|Xp) −gθ(X)) of the last layer of the model, where wcfg is the classifierfree guidance scale, then we compute the rescale embedding grescale",
       "zh": "推理时，我们计算模型最后一层的输出 embedding：gcfg θ (X|Xp) = gθ(X|Xp) + wcfg · (gθ(X|Xp) −gθ(X))，其中 wcfg 为无分类器引导系数；再计算重缩放 embedding：grescale θ (X|Xp) = gcfg θ (X|Xp) × std(gθ(X|Xp))/std(gcfg θ (X|Xp))；最终输出 embedding 为 wrescale·grescale θ (X|Xp)+ (1 −wrescale) · gcfg θ (X|Xp)。（原文此处混入脚注链接残留：6https://github.com/bootphon/phonemizer 7https://github.com/fxsjy/jieba 8https://github.com/mozillazg/python-pinyin 9https://github.com/huggingface/transformers/blob/main/src/transformers/models/ whisper/tokenization_whisper.py）"
      }
     ]
    },
    {
     "id": "eq-C-1",
     "type": "equation",
     "page": 18,
     "original": "θ"
    },
    {
     "id": "p-C-2",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-C-2-1",
       "original": "(X|Xp) = gcfg θ (X|Xp) × std(gθ(X|Xp))/std(gcfg θ (X|Xp)), the final output embedding is computed as wrescale·grescale",
       "zh": "推理时，我们计算模型最后一层的输出 embedding：gcfg θ (X|Xp) = gθ(X|Xp) + wcfg · (gθ(X|Xp) −gθ(X))，其中 wcfg 为无分类器引导系数；再计算重缩放 embedding：grescale θ (X|Xp) = gcfg θ (X|Xp) × std(gθ(X|Xp))/std(gcfg θ (X|Xp))；最终输出 embedding 为 wrescale·grescale θ (X|Xp)+ (1 −wrescale) · gcfg θ (X|Xp)。（原文此处混入脚注链接残留：6https://github.com/bootphon/phonemizer 7https://github.com/fxsjy/jieba 8https://github.com/mozillazg/python-pinyin 9https://github.com/huggingface/transformers/blob/main/src/transformers/models/ whisper/tokenization_whisper.py）"
      }
     ]
    },
    {
     "id": "eq-C-2",
     "type": "equation",
     "page": 18,
     "original": "θ"
    },
    {
     "id": "p-C-3",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-C-3-1",
       "original": "(X|Xp)+ (1 −wrescale) · gcfg θ (X|Xp).",
       "zh": "推理时，我们计算模型最后一层的输出 embedding：gcfg θ (X|Xp) = gθ(X|Xp) + wcfg · (gθ(X|Xp) −gθ(X))，其中 wcfg 为无分类器引导系数；再计算重缩放 embedding：grescale θ (X|Xp) = gcfg θ (X|Xp) × std(gθ(X|Xp))/std(gcfg θ (X|Xp))；最终输出 embedding 为 wrescale·grescale θ (X|Xp)+ (1 −wrescale) · gcfg θ (X|Xp)。（原文此处混入脚注链接残留：6https://github.com/bootphon/phonemizer 7https://github.com/fxsjy/jieba 8https://github.com/mozillazg/python-pinyin 9https://github.com/huggingface/transformers/blob/main/src/transformers/models/ whisper/tokenization_whisper.py）"
      },
      {
       "id": "s-C-3-2",
       "original": "In our paper, wcfg and wrescale are set as 2.5 and 0.75 by default.",
       "zh": "本文中 wcfg 和 wrescale 默认分别设为 2.5 和 0.75。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-D",
   "num": "D",
   "level": 1,
   "page": 19,
   "title": {
    "original": "Evaluation Baselines",
    "zh": "评估基线"
   },
   "blocks": [
    {
     "id": "p-D-1",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-D-1-1",
       "original": "VALL-E [2].",
       "zh": "VALL-E [2]。"
      },
      {
       "id": "s-D-1-2",
       "original": "A large-scale TTS system uses an autoregressive and an additional non-autoregressive model to predict discrete tokens from a neural speech codec [26].",
       "zh": "一个大规模 TTS 系统，使用一个自回归模型和一个额外的非自回归模型来预测神经语音 codec [26] 的离散 token。"
      },
      {
       "id": "s-D-1-3",
       "original": "We reproduce VALL-E with Amphion toolkit [70] and Librilight [71] dataset.",
       "zh": "我们用 Amphion 工具包 [70] 和 Librilight [71] 数据集复现了 VALL-E。"
      }
     ]
    },
    {
     "id": "p-D-2",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-D-2-1",
       "original": "NaturalSpeech 3 [8].",
       "zh": "NaturalSpeech 3 [8]。"
      },
      {
       "id": "s-D-2-2",
       "original": "A non-autoregressive model large-scale TTS systems with factorized speech codec for speech decoupling representation and factorized diffusion Models for speech generation.",
       "zh": "一个非自回归的大规模 TTS 系统，采用分解式语音 codec 做语音解耦表征，并用分解式扩散模型做语音生成。"
      },
      {
       "id": "s-D-2-3",
       "original": "It achieves human-level naturalness on the LibriSpeech test set.",
       "zh": "它在 LibriSpeech 测试集上达到了人类水平的自然度。"
      },
      {
       "id": "s-D-2-4",
       "original": "We report the scores of LibriSpeech test-clean obtained from [8] and ask for the generated samples for subjective evaluation.",
       "zh": "我们报告取自 [8] 的 LibriSpeech test-clean 分数，并向作者索取生成样本用于主观评估。"
      }
     ]
    },
    {
     "id": "p-D-3",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-D-3-1",
       "original": "VoiceBox [9].",
       "zh": "VoiceBox [9]。"
      },
      {
       "id": "s-D-3-2",
       "original": "A non-autoregressive model large-scale multi-task speech generation model based on flow matching [45].",
       "zh": "一个基于流匹配 [45] 的非自回归大规模多任务语音生成模型。"
      },
      {
       "id": "s-D-3-3",
       "original": "We report the scores of LibriSpeech test-clean obtained from [8] and ask for the generated samples for subjective evaluation.",
       "zh": "我们报告取自 [8] 的 LibriSpeech test-clean 分数，并向作者索取生成样本用于主观评估。"
      }
     ]
    },
    {
     "id": "p-D-4",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-D-4-1",
       "original": "XTTS-v2 [52].",
       "zh": "XTTS-v2 [52]。"
      },
      {
       "id": "s-D-4-2",
       "original": "An open-source multilingual TTS model that supports 16 languages.",
       "zh": "一个支持 16 种语言的开源多语言 TTS 模型。"
      },
      {
       "id": "s-D-4-3",
       "original": "It is also based on an autoregressive model.",
       "zh": "它同样基于自回归模型。"
      },
      {
       "id": "s-D-4-4",
       "original": "We use the official code and pre-trained checkpoint10.",
       "zh": "我们使用官方代码与预训练检查点10。"
      }
     ]
    },
    {
     "id": "p-D-5",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-D-5-1",
       "original": "VoiceCraft [5].",
       "zh": "VoiceCraft [5]。"
      },
      {
       "id": "s-D-5-2",
       "original": "A token-infilling neural codec language model for text editing and text-to-speech.",
       "zh": "一个用于文本编辑和文本转语音的 token 填充式神经 codec 语言模型。"
      },
      {
       "id": "s-D-5-3",
       "original": "It predicts multi-layer tokens in a delay pattern.",
       "zh": "它以延迟模式预测多层 token。"
      },
      {
       "id": "s-D-5-4",
       "original": "We use the official code and pre-trained checkpoint11.",
       "zh": "我们使用官方代码与预训练检查点11。"
      }
     ]
    },
    {
     "id": "p-D-6",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-D-6-1",
       "original": "CosyVoice [53].",
       "zh": "CosyVoice [53]。"
      },
      {
       "id": "s-D-6-2",
       "original": "A two-stage large-scale TTS system.",
       "zh": "一个两阶段的大规模 TTS 系统。"
      },
      {
       "id": "s-D-6-3",
       "original": "The first stage is an autoregressive model and the second stage is a diffusion model.",
       "zh": "第一阶段是自回归模型，第二阶段是扩散模型。"
      },
      {
       "id": "s-D-6-4",
       "original": "It is trained on 170,000 hours of multilingual speech data.",
       "zh": "它在 170,000 小时多语言语音数据上训练。"
      },
      {
       "id": "s-D-6-5",
       "original": "We use the official code and pre-trained checkpoint12.",
       "zh": "我们使用官方代码与预训练检查点12。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-E",
   "num": "E",
   "level": 1,
   "page": 19,
   "title": {
    "original": "Multilingual Zero-Shot TTS",
    "zh": "多语言零样本 TTS"
   },
   "blocks": [
    {
     "id": "p-E-1",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-E-1-1",
       "original": "We validate the effectiveness of MaskGCT across four additional languages beyond Chinese and English, specifically Japanese, Korean, German, and French.",
       "zh": "我们在中英文之外的另外四种语言——日语、韩语、德语、法语——上验证了 MaskGCT 的有效性。"
      },
      {
       "id": "s-E-1-2",
       "original": "On the foundation of our existing training data, we expand by 2,500 hours of Japanese, 7,400 hours of Korean, 6,900 hours of German, and 8,200 hours of French.",
       "zh": "在现有训练数据的基础上，我们扩充了 2,500 小时日语、7,400 小时韩语、6,900 小时德语和 8,200 小时法语数据。"
      },
      {
       "id": "s-E-1-3",
       "original": "We collect these data using the data collection pipeline proposed by [47].",
       "zh": "这些数据采用 [47] 提出的数据收集流水线收集。"
      },
      {
       "id": "s-E-1-4",
       "original": "For evaluation, we use the test sets provided in [47].",
       "zh": "评估使用 [47] 提供的测试集。"
      },
      {
       "id": "s-E-1-5",
       "original": "We still employ SIM-O and WER as evaluation metrics, with Whisper-medium13 serving as the ASR model for WER assessment.",
       "zh": "我们仍以 SIM-O 和 WER 为评估指标，WER 评估使用 Whisper-medium13 作为 ASR 模型。"
      },
      {
       "id": "s-E-1-6",
       "original": "We utilize XTTS- v2 and the two models proposed in [47]: Emilia-AR and Emilia-NAR as comparative baselines.",
       "zh": "我们用 XTTS-v2 和 [47] 提出的两个模型 Emilia-AR、Emilia-NAR 作为对比基线。"
      },
      {
       "id": "s-E-1-7",
       "original": "Table 11 shows the results.",
       "zh": "结果见 Table 11。"
      },
      {
       "id": "s-E-1-8",
       "original": "MaskGCT demonstrates significant improvements over the baselines, with the exception of WER in Japanese.",
       "zh": "除日语的 WER 外，MaskGCT 相比基线取得了显著提升。"
      },
      {
       "id": "s-E-1-9",
       "original": "It is noteworthy that we only retrained our text-to-semantic model using the expanded data, without retraining the tokenizers and semantic-to-acoustic models.",
       "zh": "值得注意的是，我们只用扩充后的数据重新训练了文本到语义模型，没有重新训练分词器和语义到声学模型。"
      },
      {
       "id": "s-E-1-10",
       "original": "We believe that further enhancements in our model’s performance can be achieved if all components are retrained on the expanded data.",
       "zh": "我们相信，如果所有组件都在扩充后的数据上重训，模型性能还能进一步提升。"
      }
     ]
    },
    {
     "id": "tab-E-1",
     "type": "table_caption",
     "page": 19,
     "original": "Table 11: Evaluation results for MaskGCT and baseline methods on the test sets for Japanese, Korean, German, and French.",
     "zh": "表 11：MaskGCT 与基线方法在日语、韩语、德语、法语测试集上的评估结果。"
    }
   ]
  },
  {
   "id": "sec-system-4",
   "num": null,
   "level": 2,
   "page": 19,
   "title": {
    "original": "System",
    "zh": "System"
   },
   "blocks": [
    {
     "id": "p-system-4-1",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-system-4-1-1",
       "original": "Ja Ko Fr De",
       "zh": "（Table 11 数值与脚注残留，译文如实保留）Ja Ko Fr De Emilia-AR 3.6 0.625 10.9 0.681 8.2 0.589 6.8 0.680 Emilia-NAR 10.8 0.562 15.2 0.608 17.5 0.550 13.3 0.633 XTTS-v2 2.981 0.579 12.45 0.617 6.898 0.531 9.168 0.569 3.903 0.678 9.417 0.732 5.598 0.667 5.126 0.745 10https://huggingface.co/coqui/XTTS-v2 11https://huggingface.co/pyp1/VoiceCraft/blob/main/830M_TTSEnhanced.pth 12https://huggingface.co/model-scope/CosyVoice-300M 13ttps://huggingface.co/openai/whisper-medium。（脚注 10、11、12、13 为各模型与 tokenizer 的开源链接，其中 13 的链接在原文中误作 ttps:// 开头）"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-wer",
   "num": null,
   "level": 2,
   "page": 19,
   "title": {
    "original": "WER",
    "zh": "WER"
   },
   "blocks": [
    {
     "id": "p-wer-1",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-wer-1-1",
       "original": "SIM-O WER SIM-O WER SIM-O WER SIM-O Emilia-AR",
       "zh": "(3) 它在三个基准上的 WER 与真人相当，且在合理的语音时长范围内表现稳定，这也说明生成语音兼具多样性与可控性。"
      }
     ]
    },
    {
     "id": "eq-wer-1",
     "type": "equation",
     "page": 19,
     "original": "3.6 0.625 10.9 0.681 8.2 0.589 6.8 0.680"
    },
    {
     "id": "eq-wer-2",
     "type": "equation",
     "page": 19,
     "original": "Emilia-NAR"
    },
    {
     "id": "eq-wer-3",
     "type": "equation",
     "page": 19,
     "original": "10.8 0.562 15.2 0.608 17.5 0.550 13.3 0.633"
    },
    {
     "id": "eq-wer-4",
     "type": "equation",
     "page": 19,
     "original": "XTTS-v2"
    },
    {
     "id": "eq-wer-5",
     "type": "equation",
     "page": 19,
     "original": "2.981 0.579 12.45 0.617 6.898 0.531 9.168 0.569"
    },
    {
     "id": "eq-wer-6",
     "type": "equation",
     "page": 19,
     "original": "MaskGCT"
    },
    {
     "id": "eq-wer-7",
     "type": "equation",
     "page": 19,
     "original": "3.903 0.678 9.417 0.732 5.598 0.667 5.126 0.745"
    },
    {
     "id": "p-wer-2",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-wer-2-1",
       "original": "10https://huggingface.co/coqui/XTTS-v2 11https://huggingface.co/pyp1/VoiceCraft/blob/main/830M_TTSEnhanced.pth 12https://huggingface.co/model-scope/CosyVoice-300M 13ttps://huggingface.co/openai/whisper-medium",
       "zh": "（脚注 10：https://huggingface.co/coqui/XTTS-v2；11：https://huggingface.co/pyp1/VoiceCraft/blob/main/830M_TTSEnhanced.pth；12：https://huggingface.co/model-scope/CosyVoice-300M；13：https://huggingface.co/openai/whisper-medium）"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-F",
   "num": "F",
   "level": 1,
   "page": 20,
   "title": {
    "original": "Duration-Controllable Speech Translation",
    "zh": "时长可控的语音翻译"
   },
   "blocks": [
    {
     "id": "p-F-1",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-F-1-1",
       "original": "The goal of the speech translation task is to translate speech from one language to another while preserving the original semantic, timbre, and prosody.",
       "zh": "语音翻译任务的目标是把语音从一种语言翻译到另一种语言，同时保留原有的语义、音色和韵律。"
      },
      {
       "id": "s-F-1-2",
       "original": "In some scenarios, we also need to ensure that the total duration remains relatively unchanged, such as in cross-lingual dubbing.",
       "zh": "在某些场景下，我们还需要保证总时长基本不变，例如跨语言配音。"
      },
      {
       "id": "s-F-1-3",
       "original": "Our model can achieve this seamlessly, with the ability to control the total duration and, through in-context learning, use the pre-translation speech as a prompt to maintain the timbre and prosody.",
       "zh": "我们的模型可以无缝做到这一点：既能控制总时长，又能通过上下文学习把翻译前的语音作为提示来保持音色与韵律。"
      },
      {
       "id": "s-F-1-4",
       "original": "To quantify the capabilities of our model, we randomly select 200 samples from SeedTTS test-zh and 200 samples from SeedTTS test-en.",
       "zh": "为量化模型能力，我们从 SeedTTS test-zh 随机选取 200 条样本，从 SeedTTS test-en 随机选取 200 条样本。"
      },
      {
       "id": "s-F-1-5",
       "original": "Additionally, we sample 200 examples for each language of Japanese, Korean, German, and French from each of the test sets provided in [47].",
       "zh": "此外，我们从 [47] 提供的测试集中为日语、韩语、德语、法语各抽取 200 条样本。"
      },
      {
       "id": "s-F-1-6",
       "original": "Subsequently, we utilize GPT4omini [72] to translate each sample into one of the other five languages, using the translated text as the target text.",
       "zh": "随后，我们用 GPT4omini [72] 把每条样本翻译成其余五种语言之一，以译文作为目标文本。"
      },
      {
       "id": "s-F-1-7",
       "original": "We use the duration of prompt speech as the duration of target speech.",
       "zh": "我们把提示语音的时长作为目标语音的时长。"
      },
      {
       "id": "s-F-1-8",
       "original": "This process yields 30 sets of test data.",
       "zh": "这一过程产生 30 组测试数据。"
      },
      {
       "id": "s-F-1-9",
       "original": "Table 12 shows the results of the 30 sets of experiments.",
       "zh": "Table 12 给出了这 30 组实验的结果。"
      },
      {
       "id": "s-F-1-10",
       "original": "We observe that MaskGCT maintains a good level of speaker similarity across translations between the six languages.",
       "zh": "我们观察到，MaskGCT 在六种语言之间的翻译中都保持了较好的说话人相似度。"
      },
      {
       "id": "s-F-1-11",
       "original": "Both “X to En” and “En to X” generally perform well, characterized by relatively low WER values and moderate SIM-O scores.",
       "zh": "「X 到 En」与「En 到 X」总体表现良好，WER 较低、SIM-O 中等。"
      },
      {
       "id": "s-F-1-12",
       "original": "“X to Ja” also achieve low WER values.",
       "zh": "「X 到 Ja」的 WER 也较低。"
      },
      {
       "id": "s-F-1-13",
       "original": "However, for languages other than English, “X to Zh”, “X to De”, and “X to Fr” exhibit higher WER values.",
       "zh": "然而，对除英语外的语言，「X 到 Zh」「X 到 De」「X 到 Fr」的 WER 偏高。"
      },
      {
       "id": "s-F-1-14",
       "original": "We hypothesize that the primary reasons for this include the difficulty in maintaining accurate pronunciation while preserving the same duration before and after translation, as well as the limited training data for Fr and De.",
       "zh": "我们推测主要原因包括：在保持翻译前后时长相等的同时难以保持发音准确，以及 Fr 和 De 的训练数据有限。"
      },
      {
       "id": "s-F-1-15",
       "original": "Achieving more robust cross-lingual translation remains a focus for future work.",
       "zh": "实现更鲁棒的跨语言翻译仍是未来工作的重点。"
      },
      {
       "id": "s-F-1-16",
       "original": "We also show some examples of speech translation in our demo page.",
       "zh": "我们还在演示页面展示了一些语音翻译的样例。"
      }
     ]
    },
    {
     "id": "tab-F-1",
     "type": "table_caption",
     "page": 20,
     "original": "Table 12: Evaluation results in cross-lingual speech translation with consistent total duration.",
     "zh": "表 12：总时长一致的跨语言语音翻译评估结果。"
    },
    {
     "id": "p-F-2",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-F-2-1",
       "original": "Zh En Ja Ko De Fr WER SIM-O WER SIM-O WER SIM-O WER SIM-O WER SIM-O WER SIM-O Zh",
       "zh": "(3) 它在三个基准上的 WER 与真人相当，且在合理的语音时长范围内表现稳定，这也说明生成语音兼具多样性与可控性。"
      }
     ]
    },
    {
     "id": "eq-F-1",
     "type": "equation",
     "page": 20,
     "original": "- - 7.466 0.678 7.864 0.720 9.751 0.736 25.54 0.724 16.21 0.687"
    },
    {
     "id": "eq-F-2",
     "type": "equation",
     "page": 20,
     "original": "En"
    },
    {
     "id": "eq-F-3",
     "type": "equation",
     "page": 20,
     "original": "7.411 0.535 - - 5.870 0.544 12.18 0.543 12.43 0.579 17.48 0.590"
    },
    {
     "id": "eq-F-4",
     "type": "equation",
     "page": 20,
     "original": "Ja"
    },
    {
     "id": "eq-F-5",
     "type": "equation",
     "page": 20,
     "original": "13.93 0.647 7.387 0.642 - - 10.98 0.703 12.85 0.649 14.61 0.645"
    },
    {
     "id": "eq-F-6",
     "type": "equation",
     "page": 20,
     "original": "Ko"
    },
    {
     "id": "eq-F-7",
     "type": "equation",
     "page": 20,
     "original": "31.30 0.734 14.61 0.697 12.79 0.749 - - 26.58 0.722 33.96 0.712"
    },
    {
     "id": "eq-F-8",
     "type": "equation",
     "page": 20,
     "original": "De"
    },
    {
     "id": "eq-F-9",
     "type": "equation",
     "page": 20,
     "original": "19.54 0.714 5.148 0.740 6.072 0.678 12.02 0.667 - - 14.53 0.672"
    },
    {
     "id": "eq-F-10",
     "type": "equation",
     "page": 20,
     "original": "Fr"
    },
    {
     "id": "eq-F-11",
     "type": "equation",
     "page": 20,
     "original": "32.84 0.672 12.17 0.682 6.076 0.640 12.07 0.582 21.65 0.682 - -"
    }
   ]
  },
  {
   "id": "sec-G",
   "num": "G",
   "level": 1,
   "page": 20,
   "title": {
    "original": "Post-Training for Emotion Control",
    "zh": "情感控制的后训练"
   },
   "blocks": [
    {
     "id": "p-G-1",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-G-1-1",
       "original": "MaskGCT can unlock more extensive capabilities with post-training.",
       "zh": "MaskGCT 可以通过后训练解锁更多能力。"
      },
      {
       "id": "s-G-1-2",
       "original": "We take emotion control as an example.",
       "zh": "我们以情感控制为例。"
      },
      {
       "id": "s-G-1-3",
       "original": "After being pretrained on a large-scale dataset, we fine-tune the T2S model by adding an additional emotion label as a prefix to the original input sequence.",
       "zh": "在大规模数据集上预训练之后，我们对 T2S 模型做微调：在原输入序列前额外拼接一个情感标签作为前缀。"
      },
      {
       "id": "s-G-1-4",
       "original": "We use an emotion dataset, ESD [60], which consists of 350 parallel utterances with an average duration of 2.9 seconds spoken by 10 native English and 10 native Mandarin speakers, to fine-tune our model.",
       "zh": "我们使用情感数据集 ESD [60] 微调模型，该数据集包含 350 条平行语句，平均时长 2.9 秒，由 10 名英语母语者和 10 名中文母语者录制。"
      },
      {
       "id": "s-G-1-5",
       "original": "The experimental results show that MaskGCT can unlock emotion control capabilities for zero-shot in-context learning scenarios.",
       "zh": "实验结果表明，MaskGCT 可以在零样本上下文学习场景下解锁情感控制能力。"
      },
      {
       "id": "s-G-1-6",
       "original": "For the construction of the train and test datasets, we selected one male and one female speaker each from native English and native Mandarin backgrounds, resulting in a total of four speakers for the test dataset.",
       "zh": "训练与测试数据集的构造上，我们从英语母语者和中文母语者中各选一男一女，共 4 名说话人组成测试集。"
      },
      {
       "id": "s-G-1-7",
       "original": "The remaining 16 speakers were allocated to the training dataset.",
       "zh": "其余 16 名说话人划入训练集。"
      },
      {
       "id": "s-G-1-8",
       "original": "For the 350 parallel Chinese utterances, we randomly chose 22 utterances for the test set, with the remaining utterances designated for training.",
       "zh": "对 350 条平行中文语句，我们随机选 22 条作为测试集，其余用于训练。"
      },
      {
       "id": "s-G-1-9",
       "original": "Similarly, for the 350 parallel English utterances, we randomly selected 21 utterances for the test set, with the rest used for training.",
       "zh": "类似地，对 350 条平行英文语句，我们随机选 21 条作为测试集，其余用于训练。"
      },
      {
       "id": "s-G-1-10",
       "original": "To assess the consistency between the generated audio and the target emotion label, we trained an emotion classification model using the constructed train dataset.",
       "zh": "为评估生成音频与目标情感标签的一致性，我们用构造的训练集训练了一个情感分类模型。"
      },
      {
       "id": "s-G-1-11",
       "original": "This model achieved a classification accuracy of 72% on the test dataset.",
       "zh": "该模型在测试集上的分类准确率为 72%。"
      },
      {
       "id": "s-G-1-12",
       "original": "We show some examples in our demo page.",
       "zh": "我们在演示页面展示了一些样例。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-H",
   "num": "H",
   "level": 1,
   "page": 20,
   "title": {
    "original": "Speech Content Editing",
    "zh": "语音内容编辑"
   },
   "blocks": [
    {
     "id": "p-H-1",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-H-1-1",
       "original": "Based on the mask-and-predict mechanism, our text-to-semantic model supports zero-shot speech content editing with the assistance of a text-speech aligner.",
       "zh": "基于掩码-预测机制，我们的文本到语义模型在文本-语音对齐器的辅助下支持零样本语音内容编辑。"
      },
      {
       "id": "s-H-1-2",
       "original": "By using the aligner, we can identify the editing boundary of the original semantic token sequence, mask the portion that needs to be edited, and then predict the masked semantic tokens using the edited text and the unmasked semantic tokens.",
       "zh": "借助对齐器，我们可以定位原始语义 token 序列中的编辑边界，掩蔽需要编辑的部分，再用编辑后的文本和未掩蔽的语义 token 预测被掩蔽的语义 token。"
      },
      {
       "id": "s-H-1-3",
       "original": "However, we have observed that our system is not very robust in editing tasks.",
       "zh": "不过我们观察到，本系统在编辑任务上还不够鲁棒。"
      },
      {
       "id": "s-H-1-4",
       "original": "A possible conjecture is that we need to adopt a training paradigm better suited for editing tasks, such as fill-in-mask [9, 73].",
       "zh": "一个可能的猜想是：我们需要采用更适合编辑任务的训练范式，例如 fill-in-mask [9, 73]。"
      },
      {
       "id": "s-H-1-5",
       "original": "We show some examples in our demo page.",
       "zh": "我们在演示页面展示了一些样例。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-I",
   "num": "I",
   "level": 1,
   "page": 21,
   "title": {
    "original": "Voice Conversion",
    "zh": "声音转换"
   },
   "blocks": [
    {
     "id": "p-I-1",
     "type": "paragraph",
     "page": 21,
     "sentences": [
      {
       "id": "s-I-1-1",
       "original": "MaskGCT supports zero-shot voice conversion by fine-tuning the S2A with a modified training strategy.",
       "zh": "通过以改进的训练策略微调 S2A，MaskGCT 支持零样本声音转换。"
      },
      {
       "id": "s-I-1-2",
       "original": "The zero-shot voice conversion task aims to alter the source speech to sound like that of a target speaker using a reference speech from the target speaker, without changing the semantic content.",
       "zh": "零样本声音转换任务的目标是：在不改变语义内容的前提下，用目标说话人的一段参考语音，把源语音变得听起来像目标说话人。"
      },
      {
       "id": "s-I-1-3",
       "original": "We can directly use the semantic tokens Ssrc extracted from the source speech and the prompt acoustic tokens Aref extracted from the reference speech to predict the target acoustic tokens Atgt.",
       "zh": "我们可以直接用从源语音提取的语义 token Ssrc 和从参考语音提取的提示声学 token Aref 来预测目标声学 token Atgt。"
      },
      {
       "id": "s-I-1-4",
       "original": "Since Ssrc may retain some timbre information, we perform timbral perturbation on the semantic features input to the semantic codec encoder.",
       "zh": "由于 Ssrc 可能保留部分音色信息，我们对输入语义 codec 编码器的语义特征做音色扰动。"
      },
      {
       "id": "s-I-1-5",
       "original": "Specifically, we apply timbral perturbation to the input mel-spectrogram features of the W2v-BERT 2.0 model, following the method outlined in FreeVC [74].",
       "zh": "具体来说，沿用 FreeVC [74] 的方法，我们对 W2v-BERT 2.0 模型的输入 Mel 频谱图特征施加音色扰动。"
      },
      {
       "id": "s-I-1-6",
       "original": "We fine-tune our S2A model using this training strategy.",
       "zh": "我们用这种训练策略微调 S2A 模型。"
      },
      {
       "id": "s-I-1-7",
       "original": "We show some examples in our demo page.",
       "zh": "我们在演示页面展示了一些样例。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-J",
   "num": "J",
   "level": 1,
   "page": 21,
   "title": {
    "original": "Hard Cases Evaluation",
    "zh": "难例评估"
   },
   "blocks": [
    {
     "id": "p-J-1",
     "type": "paragraph",
     "page": 21,
     "sentences": [
      {
       "id": "s-J-1-1",
       "original": "We evaluate the performance of MaskGCT on some hard cases (SeedTTS test-hard), which refer to instances where large-scale TTS models, particularly those AR-based models, often exhibit hallucinations.",
       "zh": "我们在一些难例（SeedTTS test-hard）上评估 MaskGCT 的表现——这些样本中，大规模 TTS 模型（尤其是基于 AR 的模型）经常出现幻觉。"
      },
      {
       "id": "s-J-1-2",
       "original": "These cases include phrases with repeating words, tongue twisters, and other complex linguistic structures.",
       "zh": "这些难例包括含重复词的短语、绕口令以及其他复杂的语言结构。"
      },
      {
       "id": "s-J-1-3",
       "original": "Examples of such cases include: “the great greek grape growers grow great greek grapes”, “How many cookies could a good cook cook If a good cook could cook cookies?",
       "zh": "这类难例的例子包括：「the great greek grape growers grow great greek grapes」、「How many cookies could a good cook cook If a good cook could cook cookies?"
      },
      {
       "id": "s-J-1-4",
       "original": "A good cook could cook as much cookies as a good cook who could cook cookies”, and “ thought a thought.",
       "zh": "A good cook could cook as much cookies as a good cook who could cook cookies」，以及「 thought a thought."
      },
      {
       "id": "s-J-1-5",
       "original": "But the thought I thought wasn’t the thought I thought I thought.",
       "zh": "But the thought I thought wasn't the thought I thought I thought."
      },
      {
       "id": "s-J-1-6",
       "original": "If the thought I thought I thought had been the thought I thought, I wouldn’t have thought so much”.",
       "zh": "If the thought I thought I thought had been the thought I thought, I wouldn't have thought so much」。（英文绕口令原文保留，不作翻译）"
      }
     ]
    },
    {
     "id": "tab-J-1",
     "type": "table_caption",
     "page": 21,
     "original": "Table 13: The evaluation results of MaskGCT and AR + SoundStorm on SeedTTS test-hard.",
     "zh": "表 13：MaskGCT 与 AR + SoundStorm 在 SeedTTS test-hard 上的评估结果。"
    }
   ]
  },
  {
   "id": "sec-system-5",
   "num": null,
   "level": 2,
   "page": 21,
   "title": {
    "original": "System",
    "zh": "System"
   },
   "blocks": [
    {
     "id": "p-system-5-1",
     "type": "paragraph",
     "page": 21,
     "sentences": [
      {
       "id": "s-system-5-1-1",
       "original": "SIM-O ↑ WER ↓ SeedTTS test-hard AR + SoundStorm",
       "zh": "(3) 它在三个基准上的 WER 与真人相当，且在合理的语音时长范围内表现稳定，这也说明生成语音兼具多样性与可控性。"
      }
     ]
    },
    {
     "id": "eq-system-5-1",
     "type": "equation",
     "page": 21,
     "original": "0.692 34.16"
    },
    {
     "id": "eq-system-5-2",
     "type": "equation",
     "page": 21,
     "original": "AR + SoundStorm (rank 5)"
    },
    {
     "id": "eq-system-5-3",
     "type": "equation",
     "page": 21,
     "original": "0.739 17.05"
    },
    {
     "id": "eq-system-5-4",
     "type": "equation",
     "page": 21,
     "original": "MaskGCT"
    },
    {
     "id": "eq-system-5-5",
     "type": "equation",
     "page": 21,
     "original": "0.748 10.27"
    },
    {
     "id": "eq-system-5-6",
     "type": "equation",
     "page": 21,
     "original": "MaskGCT (rank 5)"
    },
    {
     "id": "eq-system-5-7",
     "type": "equation",
     "page": 21,
     "original": "0.776 6.258"
    }
   ]
  },
  {
   "id": "sec-K",
   "num": "K",
   "level": 1,
   "page": 21,
   "title": {
    "original": "Discussion about Concurrent Works",
    "zh": "关于同期工作的讨论"
   },
   "blocks": [
    {
     "id": "p-K-1",
     "type": "paragraph",
     "page": 21,
     "sentences": [
      {
       "id": "s-K-1-1",
       "original": "SimpleSpeech [29], DiTTo-TTS [30], and E2 TTS [31] are also NAR-based models that do not necessitate precise alignment information between text and speech, nor do they forecast phonemelevel duration.",
       "zh": "SimpleSpeech [29]、DiTTo-TTS [30] 和 E2 TTS [31] 同样是不需要文本与语音之间精确对齐信息、也不预测音素级时长的 NAR 模型。"
      },
      {
       "id": "s-K-1-2",
       "original": "These are concurrent works with MaskGCT.",
       "zh": "它们是与 MaskGCT 同期的工作。"
      },
      {
       "id": "s-K-1-3",
       "original": "The three models all employ diffusion modeling on speech representations within continuous spaces.",
       "zh": "这三个模型都在连续空间内对语音表征做扩散建模。"
      },
      {
       "id": "s-K-1-4",
       "original": "SimpleSpeech models the latent representation of a wav codec based on finite scalar quantization (FSQ) [75], DiTTo-TTS utilizes the latent representation of a wav codec based on residual vector quantization (RVQ), and E2 TTS directly models the mel-spectrogram with flow matching.",
       "zh": "SimpleSpeech 对基于有限标量量化（FSQ）[75] 的波形 codec 的潜在表征建模，DiTTo-TTS 使用基于残差向量量化（RVQ）的波形 codec 的潜在表征，而 E2 TTS 直接用流匹配对 Mel 频谱图建模。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-L",
   "num": "L",
   "level": 1,
   "page": 21,
   "title": {
    "original": "Boarder Impact",
    "zh": "更广泛的影响"
   },
   "blocks": [
    {
     "id": "p-L-1",
     "type": "paragraph",
     "page": 21,
     "sentences": [
      {
       "id": "s-L-1-1",
       "original": "Given that our model can synthesize speech with high speaker similarity, it carries potential risks of misuse, including spoofing voice identification or impersonating specific speakers.",
       "zh": "鉴于我们的模型能合成说话人相似度很高的语音，它存在被滥用的潜在风险，包括欺骗声纹识别或冒充特定说话人。"
      },
      {
       "id": "s-L-1-2",
       "original": "Our experiments were conducted under the assumption that the user consents to be the target speaker for speech synthesis.",
       "zh": "我们的实验均在用户同意成为语音合成目标说话人的假设下进行。"
      },
      {
       "id": "s-L-1-3",
       "original": "To mitigate misuse, it is essential to develop a robust model for detecting synthesized speech and to establish a system for reporting suspected misuse.",
       "zh": "为减少滥用，有必要研发能可靠检测合成语音的模型，并建立疑似滥用的举报机制。"
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
    "sentence_id": "s-abstract-1-4",
    "quote": "a fully non-autoregressive TTS model that eliminates the need for explicit alignment information between text and speech supervision"
   },
   "kind": "concept",
   "title": "NAR 路线的最后一公里",
   "explanation": "此前 NAR TTS（NaturalSpeech 2/3、VoiceBox）虽然推理并行，但训练仍依赖外部对齐器给的音素时长，等于把 AR 的顺序依赖换成了对对齐工具的依赖。MaskGCT 的卖点是用 mask-and-predict 把对齐和时长预测一并去掉：模型自己在双向注意力里学「哪段文本对哪段语音」。这一步补上后，TTS 的两条主流路线（AR、扩散/流匹配）在「免对齐」这一点上才算真正交汇。",
   "featured": true
  },
  {
   "id": "ann-002",
   "anchor": {
    "sentence_id": "s-1-2-5",
    "quote": "however, it needs to receive the semantic tokens of an AR model as input"
   },
   "kind": "comparison",
   "title": "SoundStorm 差在哪",
   "explanation": "SoundStorm 的并行解码只覆盖了「语义 token → 声学 token」这一段，文本到语义仍靠 AudioLM 的 AR 模型逐 token 生成，整条链路的延迟和错误累积都由 AR 段决定。MaskGCT 相当于把 SoundStorm 的思想上推到 T2S 阶段，两阶段全部掩码并行。评判 MaskGCT 的新意时，关键不在 S2A（那部分基本是 SoundStorm），而在 T2S 这一步能否摆脱 AR。",
   "featured": true
  },
  {
   "id": "ann-003",
   "anchor": {
    "sentence_id": "s-3-2-1-1-5",
    "quote": "previous works have used k-means to discretize semantic features to obtain semantic tokens; however, this method can lead to a loss of information"
   },
   "kind": "motivation",
   "title": "为什么要换掉 k-means",
   "explanation": "k-means 把连续的 SSL 特征硬分到固定簇心，量化误差不可控，声调语言里音高承载语义，损失一点就可能把「妈」说成「马」。作者早期实验在中文上直接撞到这个坑，才改用 VQ-VAE：以重建 SSL 特征为训练目标学码本，8,192 条目、维度 8 的单码本就能逼近 k-means 多码本的信息量。这是全文里少数由具体失败案例驱动的设计，值得记住。",
   "featured": true
  },
  {
   "id": "ann-004",
   "anchor": {
    "sentence_id": "s-3-1-3-3",
    "quote": "trained to predict the masked tokens based on the unmasked tokens and a condition C"
   },
   "kind": "concept",
   "title": "掩码生成 = 离散扩散",
   "explanation": "这套训练目标与 BERT 的 MLM 同形，但用法完全不同：训练时按调度 γ(t) 随机掩蔽任意比例的 token，推理时从全掩蔽出发、每步只把置信度最低的一部分重新掩蔽再解码，逐步收敛到完整序列。把它看成离散 token 上的扩散过程（[32] 的视角）更容易理解——迭代步数就是「去噪步数」，这也是为什么推理步数可以自由权衡质量与速度。",
   "featured": true
  },
  {
   "id": "ann-005",
   "anchor": {
    "sentence_id": "s-3-2-2-1-5",
    "quote": "replacing causal attention with bidirectional attention"
   },
   "kind": "engineering",
   "title": "双向注意力是关键改动",
   "explanation": "骨干是 Llama 风格 Transformer，但把因果掩码换成双向注意力——因为掩码预测的每个位置都要同时看左右两侧上下文，与 AR 的「只能看过去」相反。工程含义有二：一是双向注意力天然适合并行打分，一次前向给所有被掩位置出置信度；二是这个模型不能直接当语言模型做流式增量解码，想改成流式 TTS 需要重新设计，别指望白嫖。",
   "featured": true
  },
  {
   "id": "ann-006",
   "anchor": {
    "sentence_id": "s-3-2-3-1-8",
    "quote": "p(j) = 1 − 2j N(N+1)"
   },
   "kind": "engineering",
   "title": "偏向粗层的采样调度",
   "explanation": "S2A 训练时按 p(j) = 1 − 2j/(N(N+1)) 采样要预测的 RVQ 层 j——层号越小被抽中的概率越高。这是典型的「重要的层多练」：RVQ 第 1 层承载语义后的主要声学信息，第 12 层只是细节残差。推理侧的镜像设计是步数分配 [40, 16, 1, 1, …, 1]，粗层几十步迭代、细层一步贪心。工程复现时这两个调度是性价比最高的旋钮。"
  },
  {
   "id": "ann-007",
   "anchor": {
    "sentence_id": "s-4-1-1-4",
    "quote": "each with 50K hours of speech (totaling 100K hours)"
   },
   "kind": "number",
   "title": "100K 小时的口径",
   "explanation": "100K 小时 = Emilia 里英文 50K + 中文 50K，且 Emilia 本身是 in-the-wild 爬取后机器清洗的数据，不是录音棚精标。横向对比：VALL-E 用 60K 小时英文，CosyVoice 用 170K 小时多语言。MaskGCT 在数据量上并不夸张，它证明的是「掩码生成 + VQ-VAE 语义 token」这个配方在 10 万小时量级就能追平人类相似度——真正贵的其实是 W2v-BERT 2.0 特征提取和 codec 训练的工程链。"
  },
  {
   "id": "ann-008",
   "anchor": {
    "sentence_id": "s-4-1-2-5",
    "quote": "Whisper-large-v3 for Seed-TTS test-en, and Paraformer-zh for Seed-TTS test-zh"
   },
   "kind": "critique",
   "title": "WER 指标的三个坑",
   "explanation": "WER 用三个不同 ASR 模型分别测三个测试集（HuBERT / Whisper-large-v3 / Paraformer-zh），意味着跨测试集的 WER 数字不能直接比——它混入了 ASR 模型本身的能力差异。另外 WER 衡量的是「内容可懂度」，对韵律自然度、音色保真几乎无感，把它叫「鲁棒性」指标是名不副实的包装。读 Table 2 时，真正该看的是同一测试集内各系统的相对差距。",
   "featured": true
  },
  {
   "id": "ann-009",
   "anchor": {
    "sentence_id": "s-4-2-1-1-7",
    "quote": "+0.10, +0.03, and +0.05 CMOS across the three test sets when compared with human recordings"
   },
   "kind": "critique",
   "title": "「超过真人」别当真",
   "explanation": "CMOS +0.10/+0.03/+0.05 意味着在 5 分制打分的两两对比里，合成语音被听众判得比真人录音「更自然」。更合理的解读不是模型超越了人类，而是测试集里的真人录音（Common Voice、DiDiSpeech 这类众包语料）本身带底噪和不完美发音，拉低了 ground truth 的参照分。这种「超人」结论高度依赖测试集录音质量，换个干净的棚录集大概率消失。",
   "featured": true
  },
  {
   "id": "ann-010",
   "anchor": {
    "sentence_id": "s-4-2-1-1-4",
    "quote": "0.75→0.774 in SeedTTS test-zh for SIM-O"
   },
   "kind": "number",
   "title": "SIM-O 增益并不均匀",
   "explanation": "相似度提升在不同基准上差异很大：test-en 上 SIM-O 从 0.643 提到 0.717（+0.074，很实在），LibriSpeech 只从 0.67 到 0.687（+0.017），而对真人参照的提升在 test-en 上是 -0.002（即略低于真人）。SMOS 的提升 (+0.72/+0.55) 又远大于 SIM-O。这暗示客观 embedding 相似度已接近饱和，剩下的是听感层面的差距——也提醒你 SIM-O 超过 0.75 后基本失去区分度。"
  },
  {
   "id": "ann-011",
   "anchor": {
    "sentence_id": "s-4-2-2-1-7",
    "quote": "requiring only 25 to 50 steps for T2S models to achieve optimal results for speeches of any length"
   },
   "kind": "comparison",
   "title": "常数步数 vs 线性步数",
   "explanation": "AR TTS 的解码步数随语音长度线性增长（每个 token 一次前向），1 分钟语音可能上千步；掩码生成的步数是常数——25~50 步无论长短。但要注意这只是「步数」常数：每步是对整段序列做双向注意力，序列越长单步越贵，所以总计算量并非严格常数。真实收益集中在长句合成和批量服务场景，短句上 AR 的 KV cache 也未必慢。",
   "featured": true
  },
  {
   "id": "ann-012",
   "anchor": {
    "sentence_id": "s-4-4-2-2",
    "quote": "SIM can be optimized with around 10 steps, while achieving the lowest WER requires approximately 25 steps"
   },
   "kind": "number",
   "title": "10 步像人，25 步读对",
   "explanation": "这条消融把「相似度」和「可懂度」的收敛速度拆开了：SIM 约 10 步就到位，WER 要 25 步（test-zh 从 5 步的 10.19 降到 25 步的 2.507）。解读：迭代解码先学到「像谁说话」的全局声学风格（容易），后补齐逐 token 的内容正确性（难）。部署时可以按场景调——配音仿声场景 10 步够用，新闻播报类内容准确性优先的场景必须 25 步以上。",
   "featured": true
  },
  {
   "id": "ann-013",
   "anchor": {
    "sentence_id": "s-4-4-3-5",
    "quote": "can achieve good performance with just the setting of the base model when using 100K hours of data"
   },
   "kind": "critique",
   "title": "规模不敏感，还是没到瓶颈",
   "explanation": "T2S-Large 相对 T2S-Base 全指标领先但都「不显著」，作者据此说 100K 小时下 base 就够用。这个结论要打折：两档模型差距小，更可能是数据量还没到能让大模型拉开差距的区间，或者语义 token 的信息上限卡住了下游——S2A 能从语义 token 里榨出的东西就那么多，T2S 再大也没用。作者自己也承认 scaling law 留待未来，别把这句当定论。",
   "featured": true
  },
  {
   "id": "ann-014",
   "anchor": {
    "sentence_id": "s-A-6-1-5",
    "quote": "G2P outperforms BPE in English with a higher SIM-O of 0.728 compared to 0.711"
   },
   "kind": "comparison",
   "title": "G2P 与 BPE 的语言分化",
   "explanation": "英文：G2P 全面占优（SIM-O 0.728 vs 0.711，WER 2.466 vs 4.036）；中文：BPE 的 WER 反而更低（1.921 vs 2.338）。作者的解释是中文 G2P 多音字处理有缺陷，BPE 能从上下文消歧。给工程落地的启示：做中英双语 TTS，文本前端不必强求统一——英文走音素、中文直接 BPE 字 token 可能是更稳的组合，尤其在缺乏高质量 G2P 的语言上。",
   "featured": true
  },
  {
   "id": "ann-015",
   "anchor": {
    "sentence_id": "s-E-1-9",
    "quote": "we only retrained our text-to-semantic model using the expanded data, without retraining the tokenizers and semantic-to-acoustic models"
   },
   "kind": "critique",
   "title": "多语言实验的折扣",
   "explanation": "扩展到日/韩/德/法（2,500~8,200 小时每语种）时只重训了 T2S，codec 和 S2A 仍是中英双语训练的。这意味着小语种效果差（比如日语 WER 没超过基线）无法归因于「掩码生成不适合该语言」，可能只是声学 codec 没见过日语。附录 E 的结论只能当「下限」看——作者说这是优势（模块可独立扩展），但从评估严谨性看这更像没做完的实验。"
  },
  {
   "id": "ann-016",
   "anchor": {
    "sentence_id": "s-F-1-7",
    "quote": "We use the duration of prompt speech as the duration of target speech"
   },
   "kind": "motivation",
   "title": "配音场景的时长约束",
   "explanation": "跨语言配音要求译文语音与原视频口型/时轴对齐，这里直接把提示语音时长当作目标时长——这正是「并行生成须指定长度」从缺陷变成特性的场景。但 Table 12 里 X→Zh/De/Fr 的 WER 明显偏高，作者归因于「时长不变的前提下保持发音准确很难」：不同语言表达同一语义所需音节数差异很大，硬锁时长会逼模型压缩或拉伸发音，鲁棒跨语言配音他们自己也承认没解决。"
  },
  {
   "id": "ann-017",
   "anchor": {
    "sentence_id": "s-H-1-3",
    "quote": "our system is not very robust in editing tasks"
   },
   "kind": "critique",
   "title": "罕见地承认不行",
   "explanation": "全文到处都是「human-level」「state-of-the-art」，唯独语音编辑这里直接承认不鲁棒。原因值得想：mask-and-predict 训练时掩码比例由调度函数控制、位置随机，而编辑是「局部固定掩码 + 强边界约束」，训练分布与编辑任务不匹配。作者的猜想（改用 fill-in-mask 训练范式）等于承认当前模型的编辑能力是 zero-shot 蹭出来的，不是设计目标。用 MaskGCT 做编辑产品前，先读这段。",
   "featured": true
  },
  {
   "id": "ann-018",
   "anchor": {
    "sentence_id": "s-3-2-2-2-2",
    "quote": "we also train a flow matching [45] based duration prediction model to predict the total duration"
   },
   "kind": "critique",
   "title": "「无时长预测」有水分",
   "explanation": "标题级卖点是「去掉音素级时长预测」，但实际系统仍训练了一个流匹配时长预测器来给出总时长——只是从「每个音素多长」降级为「整段多长」。更微妙的是附录 A.5：这个总时长预测器内部还是用 MAS 对齐器产生的音素级时长做监督，再求和。所以严格说是「推理时不用音素时长」，训练链路里对齐器并没有消失，只是藏得更深。"
  },
  {
   "id": "ann-019",
   "anchor": {
    "sentence_id": "s-3-2-1-4-1",
    "quote": "the hidden states from the 17th layer of W2v-BERT 2.0"
   },
   "kind": "engineering",
   "title": "整条流水线的隐形地基",
   "explanation": "语义 codec 量化的是 W2v-BERT 2.0 第 17 层特征——这个选择锁死了全系统的语义上限：T2S 学的是这些特征的分布，S2A 以它们为条件。想换 SSL 模型（比如支持更多语种）就得重训语义 codec、T2S、S2A 三个组件。附录 E 多语言实验没重训 codec，效果打折，根源就在这里。复现或二次开发时，W2v-BERT 2.0 的特征提取成本（24 层 Conformer）要计入部署预算。"
  },
  {
   "id": "ann-020",
   "anchor": {
    "sentence_id": "s-system-4-4",
    "quote": "we use a top-k of 20, with the sampling temperature annealing from 1.5 to 0"
   },
   "kind": "engineering",
   "title": "采样超参是质量暗旋钮",
   "explanation": "推理质量很大程度压在一组采样超参上：CFG scale 2.5、rescale 0.75、top-k 20、温度 1.5→0 退火、再加 Gumbel 噪声扰动置信度排序。温度退火的逻辑是早期高温保持多样性、后期低温收敛；Gumbel 噪声防止每步都掩同样的低置信 token 陷入死循环。这些旋钮没有消融，调它们对 CMOS/WER 的敏感度是复现者要交的学费——论文只给了你一组「能 work」的点。"
  },
  {
   "id": "ann-021",
   "anchor": {
    "sentence_id": "s-B-1-8",
    "quote": "a phonetic discriminability within less than 5 on the LibriSpeech dev-clean dataset, whereas acoustic features, for example, Encodec latent features, score above 20"
   },
   "kind": "concept",
   "title": "语义 vs 声学的量化界限",
   "explanation": "作者用 ABX 错误率给「语义/声学」这对被滥用的术语划了条可测量的线：W2v-BERT 2.0 特征的音素可区分性 ABX 错误率 <5，EnCodec 潜在特征 >20，差 4 倍。这个附录其实是全文的理论补丁——既然语义 token 和文本强相关，T2S 才好学；声学 token 只管重建保真。但作者同时承认语义特征也混有韵律和音色，「语义」只是相关性强弱的工程划分，不是干净的科学概念。"
  },
  {
   "id": "ann-022",
   "anchor": {
    "sentence_id": "s-J-1-1",
    "quote": "often exhibit hallucinations"
   },
   "kind": "number",
   "title": "难例上的真实差距",
   "explanation": "SeedTTS test-hard（重复词、绕口令）是最能暴露 AR 幻觉的场景：AR + SoundStorm 的 WER 高达 34.16，即使用了 rerank 5 仍有 17.05；MaskGCT 不 rerank 就 10.27，rerank 5 后到 6.258。双向注意力让每个位置的生成都受全文约束，不会出现 AR 那种「前面说错了后面跟着错」的漂移。但也要看到 6.258 仍远高于普通测试集的 2.3 左右——掩码生成降低了幻觉，没消灭它。"
  },
  {
   "id": "ann-023",
   "anchor": {
    "sentence_id": "s-K-1-3",
    "quote": "employ diffusion modeling on speech representations within continuous spaces"
   },
   "kind": "connection",
   "title": "同期免对齐 NAR 的谱系",
   "explanation": "MaskGCT 与 SimpleSpeech、DiTTo-TTS、E2 TTS 同为 2024 年中的免对齐 NAR 路线，分歧在表征空间：MaskGCT 在离散 token 上做掩码生成，另外三家在连续表征（FSQ 潜在、RVQ 潜在、Mel）上做扩散/流匹配。连续路线省掉 codec 量化损失但解码步数更多；离散路线推理步数少但受 codec 质量钳制。此后 F5-TTS 等工作证明连续流匹配路线同样能 scale，两条路线至今没有收敛出唯一答案。"
  }
 ]
};
