// 自动生成：2502.18924 全文双语精读数据（由 tools/compile_paper.js 装配）
// 结构/原文来自 .cache/papers/2502.18924.json（tools/extract_paper.py）；
// 翻译与讲解来自 .cache/papers/zh/2502.18924/（LLM agent 撰写）。
// 改翻译请改片段后重新装配；勿手改本文件的结构与 original 字段。
globalThis.PAPER_2502_18924 = {
 "paper_id": "2502.18924",
 "model_id": "mega_tts3",
 "title": {
  "original": "MegaTTS 3: Sparse Alignment Enhanced Latent Diffusion Transformer for Zero-Shot Speech Synthesis",
  "zh": "MegaTTS 3：用于零样本语音合成的稀疏对齐增强潜在扩散 Transformer"
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
       "original": "Ziyue Jiang1,2*, Yi Ren2, Ruiqi Li1,2, Shengpeng Ji1, Boyang Zhang1, Zhenhui Ye1, Chen Zhang2, Bai Jionghao1, Xiaoda Yang1, Jialong Zuo1, Yu Zhang1, Rui Liu3, Xiang Yin2, Zhou Zhao1 1Zhejiang University, 2ByteDance, 3Inner Mongolia University ziyuejiang341@gmail.com, zhaozhou@zju.edu.cn"
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
       "original": "While recent zero-shot text-to-speech (TTS) models have significantly improved speech quality and expressiveness, mainstream systems still suffer from issues related to speechtext alignment modeling: 1) models without explicit speech-text alignment modeling exhibit less robustness, especially for hard sentences in practical applications; 2) predefined alignment-based models suffer from naturalness constraints of forced alignments.",
       "zh": "尽管近期的零样本文本转语音（TTS）模型显著提升了语音质量与表现力，主流系统仍受困于语音-文本对齐建模相关的问题：1）不做显式语音-文本对齐建模的模型鲁棒性较差，在实际应用中的难句上尤其如此；2）基于预定义对齐的模型则受制于强制对齐带来的自然度约束。"
      },
      {
       "id": "s-abstract-1-2",
       "original": "This paper introduces MegaTTS 3, a TTS system featuring an innovative sparse alignment algorithm that guides the latent diffusion transformer (DiT).",
       "zh": "本文提出 MegaTTS 3，一个采用创新稀疏对齐算法来引导潜在扩散 Transformer（DiT）的 TTS 系统。"
      },
      {
       "id": "s-abstract-1-3",
       "original": "Specifically, we provide sparse alignment boundaries to MegaTTS 3 to reduce the difficulty of alignment without limiting the search space, thereby achieving high naturalness.",
       "zh": "具体来说，我们为 MegaTTS 3 提供稀疏的对齐边界，在降低对齐学习难度的同时不限制搜索空间，从而实现高自然度。"
      },
      {
       "id": "s-abstract-1-4",
       "original": "Moreover, we employ a multi-condition classifier-free guidance strategy for accent intensity adjustment and adopt the piecewise rectified flow technique to accelerate the generation process.",
       "zh": "此外，我们采用多条件无分类器引导（classifier-free guidance）策略实现口音强度调节，并采用分段修正流（piecewise rectified flow）技术加速生成过程。"
      },
      {
       "id": "s-abstract-1-5",
       "original": "Experiments demonstrate that MegaTTS 3 achieves state-of-the-art zero-shot TTS speech quality and supports highly flexible control over accent intensity.",
       "zh": "实验表明，MegaTTS 3 达到了最先进的零样本 TTS 语音质量，并支持高度灵活的口音强度控制。"
      },
      {
       "id": "s-abstract-1-6",
       "original": "Notably, our system can generate high-quality one-minute speech with only 8 sampling steps.",
       "zh": "值得注意的是，我们的系统仅需 8 步采样即可生成高质量的 1 分钟语音。"
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
       "original": "Audio samples are available at https://sditdemo. github.io/sditdemo/.",
       "zh": "音频样例见 https://sditdemo.github.io/sditdemo/。"
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
       "original": "In recent years, neural codec language models (Wang et al., 2023; Zhang et al., 2023; Song et al., 2024; Xin et al., 2024) and large-scale diffusion models (Shen et al., 2023; Matthew et al., 2023; Lee et al., 2024a; Eskimez et al., 2024; Ju et al., 2024; Yang et al., 2024d,b) have brought considerable advancements to the field of speech synthesis.",
       "zh": "近年来，神经 codec 语言模型（Wang et al., 2023; Zhang et al., 2023; Song et al., 2024; Xin et al., 2024）和大规模扩散模型（Shen et al., 2023; Matthew et al., 2023; Lee et al., 2024a; Eskimez et al., 2024; Ju et al., 2024; Yang et al., 2024d,b）为语音合成领域带来了可观的进步。"
      },
      {
       "id": "s-1-1-2",
       "original": "Unlike traditional text-to-speech (TTS) systems (Shen et al., 2018; Jia et al., 2018; Li et al., 2019; Kim et al., 2020; Ren et al., 2019; Kim et al., *Intern at ByteDance.",
       "zh": "与传统 TTS 系统（Shen et al., 2018; Jia et al., 2018; Li et al., 2019; Kim et al., 2020; Ren et al., 2019; Kim et al.,（此句句尾混入脚注「* Intern at ByteDance.」）"
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
       "original": "2021, 2022), these models are trained on largescale, multi-domain speech corpora, which contributes to notable improvements in the naturalness and expressiveness of synthesized audio.",
       "zh": "2021, 2022）不同，这些模型在大规模、多领域的语音语料上训练，使合成音频的自然度与表现力得到显著提升。"
      },
      {
       "id": "s-1-2-2",
       "original": "Given only seconds of speech prompt, they can synthesize identity-preserving speech in a zero-shot manner.",
       "zh": "仅给出几秒钟的语音提示（prompt），它们就能以零样本方式合成保持说话人身份的语音。"
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
       "original": "To generate high-quality speech with clear and expressive pronunciation, a TTS model must establish an alignment mapping from text to speech signals (Kim et al., 2020; Tan et al., 2021).",
       "zh": "为了生成发音清晰、富有表现力的高质量语音，TTS 模型必须建立从文本到语音信号的对齐映射（Kim et al., 2020; Tan et al., 2021）。"
      },
      {
       "id": "s-1-3-2",
       "original": "However, from the perspective of speech-text alignment, current solutions suffer from the following issues:",
       "zh": "然而，从语音-文本对齐的角度看，现有方案存在以下问题："
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
       "original": "• Models with implicit speech-text alignment achieve the soft alignment paths through attention mechanisms (Wang et al., 2023; Chen et al., 2024a; Du et al., 2024).",
       "zh": "• 采用隐式语音-文本对齐的模型通过注意力机制获得软对齐路径（Wang et al., 2023; Chen et al., 2024a; Du et al., 2024）。"
      },
      {
       "id": "s-1-4-2",
       "original": "These models can be categorized into: 1) autoregressive codec language models (AR LM), which are inefficient and lack robustness.",
       "zh": "这些模型可以分为：1）自回归 codec 语言模型（AR LM），其效率低下且缺乏鲁棒性。"
      },
      {
       "id": "s-1-4-3",
       "original": "The lengthy discrete speech codes, which typically require a bit rate of 1.5 kbps (Kumar et al., 2024; Wu et al., 2024), impose a significant burden on these autoregressive language models; 2) diffusion-based models without explicit duration modeling (Lee et al., 2024a; Eskimez et al., 2024; Lovelace et al., 2023; Gao et al., 2023; Cámbara et al., 2024; Yang et al., 2024d,b), which significantly speeds up the speech generation process.",
       "zh": "冗长的离散语音编码（通常需要 1.5 kbps 的码率（Kumar et al., 2024; Wu et al., 2024））给这些自回归语言模型带来了沉重负担；2）不做显式时长建模的扩散模型（Lee et al., 2024a; Eskimez et al., 2024; Lovelace et al., 2023; Gao et al., 2023; Cámbara et al., 2024; Yang et al., 2024d,b），它们显著加快了语音生成过程。"
      },
      {
       "id": "s-1-4-4",
       "original": "However, when compared with methods that adopt forced alignment, these models exhibit a decline in speech intelligibility.",
       "zh": "然而，与采用强制对齐的方法相比，这些模型在语音可懂度上有所下降。"
      },
      {
       "id": "s-1-4-5",
       "original": "Besides, these methods cannot provide fine-grained control over the duration of specific pronunciations and can only adjust the overall speech rate.",
       "zh": "此外，这些方法无法对特定发音的时长进行细粒度控制，只能调整整体语速。"
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
       "original": "• Predefined alignment-based methods have prosodic naturalness constraints of forced alignments.",
       "zh": "• 基于预定义对齐的方法则受到强制对齐的韵律自然度约束。"
      }
     ]
    },
    {
     "id": "p-1-6",
     "type": "paragraph",
     "page": 1,
     "sentences": [
      {
       "id": "s-1-6-1",
       "original": "During training, alignment paths (Ren et al., 2020; Kim et al., 2020) are directly introduced into their models (Matthew et al., 2023; Shen et al., 2023; Ju et al., 2024) to reduce the complexity of textto-speech generation, which achieves higher intelligibility.",
       "zh": "在训练时，对齐路径（Ren et al., 2020; Kim et al., 2020）被直接引入模型（Matthew et al., 2023; Shen et al., 2023; Ju et al., 2024），以降低文本转语音生成的复杂度，从而获得更高的可懂度。"
      },
      {
       "id": "s-1-6-2",
       "original": "Nevertheless, they suffer from the following limitations: 1) predefined alignments constrain the model’s search space to produce more natural-sounding speech (Anastassiou et al., 2024; Chen et al., 2024a); 2) the overall naturalness is highly dependent on the performance of duration models.",
       "zh": "然而，它们存在以下局限：1）预定义对齐限制了模型生成更自然语音的搜索空间（Anastassiou et al., 2024; Chen et al., 2024a）；2）整体自然度高度依赖时长模型的性能。"
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
       "original": "Intuitively, we can integrate the two aforementioned diffusion-based methods to pursue optimal performance.",
       "zh": "直观地说，我们可以把上述两类基于扩散的方法结合起来，以追求最优性能。"
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
       "original": "To be specific, we propose a novel sparse speech-text alignment strategy to enhance the latent diffusion transformer (DiT), termed MegaTTS 3.",
       "zh": "具体来说，我们提出了一种新颖的稀疏语音-文本对齐策略来增强潜在扩散 Transformer（DiT），称为 MegaTTS 3。"
      },
      {
       "id": "s-1-8-2",
       "original": "In our approach, phoneme tokens are sparsely distributed within the corresponding forced alignment regions to provide coarse pronunciation information that is then refined by the latent DiT model.",
       "zh": "在我们的方法中，音素 token 被稀疏地分布在对应的强制对齐区域内，提供粗略的发音信息，再由潜在 DiT 模型加以细化。"
      },
      {
       "id": "s-1-8-3",
       "original": "Experimental results demonstrate that MegaTTS 3 achieves nearly state-of-the-art speech intelligibility and speaker similarity on the LibriSpeech test-clean set (Panayotov et al., 2015) with only 8 sampling steps, while also exhibiting high speech naturalness.",
       "zh": "实验结果表明，MegaTTS 3 在 LibriSpeech test-clean 集（Panayotov et al., 2015）上仅用 8 步采样就取得了接近最先进的语音可懂度与说话人相似度，同时保持了很高的语音自然度。"
      },
      {
       "id": "s-1-8-4",
       "original": "The main contributions of this work are summarized as follows:",
       "zh": "本工作的主要贡献总结如下："
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
       "original": "• We design a sparse alignment enhanced latent diffusion transformer model, which effectively integrates the strengths of the two aforementioned speech-text alignment approaches.",
       "zh": "• 我们设计了一种稀疏对齐增强的潜在扩散 Transformer 模型，有效融合了上述两类语音-文本对齐方法的优势。"
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
       "original": "Notably, our model also demonstrates greater robustness to duration prediction errors compared to methods with forced alignment.",
       "zh": "值得注意的是，与采用强制对齐的方法相比，我们的模型对时长预测误差还表现出更强的鲁棒性。"
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
       "original": "• To achieve higher generation quality and more flexible control, we propose a multi-condition CFG strategy to adjust the guidance scales for speaker timbre and text content separately.",
       "zh": "• 为了获得更高的生成质量和更灵活的控制，我们提出多条件 CFG 策略，分别调整说话人音色和文本内容的引导尺度。"
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
       "original": "Furthermore, we discover that the text guidance scale can also be used to modulate the intensity of personal accents, offering a new direction for enhancing speech expressiveness.",
       "zh": "进一步地，我们发现文本引导尺度还可用于调制个人口音的强度，这为增强语音表现力提供了一个新方向。"
      }
     ]
    },
    {
     "id": "p-1-13",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-1-13-1",
       "original": "• We successfully reduce the inference steps from 25 to 8 with the piecewise rectified flow (PeRFLow) technique, achieving highly efficient zero-shot TTS with minimal quality degradation.",
       "zh": "• 我们借助分段修正流（PeRFLow）技术成功地把推理步数从 25 步减少到 8 步，以极小的质量损失实现了高效的零样本 TTS。"
      },
      {
       "id": "s-1-13-2",
       "original": "We also visualize the attention matrices across various layers of MegaTTS 3 and obtain insightful findings in Appendix F.",
       "zh": "我们还对 MegaTTS 3 各层的注意力矩阵做了可视化，并在 Appendix F 中给出了一些有启发性的发现。"
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
    "original": "Background Zero-shot TTS.",
    "zh": "2 背景：零样本 TTS"
   },
   "blocks": [
    {
     "id": "p-2-1",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-2-1-1",
       "original": "Zero-shot TTS (Casanova et al., 2022; Wang et al., 2023; Zhang et al., 2023; Shen et al., 2023; Matthew et al., 2023; Jiang et al., 2024; Liu et al., 2024b; Lee et al., 2024a; Li et al., 2024; Lee et al., 2023; Ju et al., 2024; Meng et al., 2024; Chen et al., 2024b) aims to synthesize unseen voices with speech prompts.",
       "zh": "零样本 TTS（Casanova et al., 2022; Wang et al., 2023; Zhang et al., 2023; Shen et al., 2023; Matthew et al., 2023; Jiang et al., 2024; Liu et al., 2024b; Lee et al., 2024a; Li et al., 2024; Lee et al., 2023; Ju et al., 2024; Meng et al., 2024; Chen et al., 2024b）旨在借助语音提示合成未见过的声音。"
      },
      {
       "id": "s-2-1-2",
       "original": "Among them, neural codec language models (Chen et al., 2024a) are the first that can autoregressively synthesize speech that rivals human recordings in naturalness and expressiveness.",
       "zh": "其中，神经 codec 语言模型（Chen et al., 2024a）是最早能自回归地合成在自然度与表现力上媲美真人录音的语音的模型。"
      },
      {
       "id": "s-2-1-3",
       "original": "However, they still face several challenges, such as the lossy compression in discrete audio tokenization and the time-consuming nature of autoregressive generation.",
       "zh": "然而，它们仍面临若干挑战，例如离散音频 token 化的有损压缩，以及自回归生成耗时的问题。"
      },
      {
       "id": "s-2-1-4",
       "original": "To address these issues, some subsequent works explore solutions based on continuous vectors and non-autoregressive diffusion models (Shen et al., 2023; Matthew et al., 2023; Lee et al., 2024a; Eskimez et al., 2024; Yang et al., 2024d,b; Chen et al., 2024b).",
       "zh": "为了解决这些问题，一些后续工作探索了基于连续向量与非自回归扩散模型的方案（Shen et al., 2023; Matthew et al., 2023; Lee et al., 2024a; Eskimez et al., 2024; Yang et al., 2024d,b; Chen et al., 2024b）。"
      },
      {
       "id": "s-2-1-5",
       "original": "These works can be categorized into two main types: 1) the first type directly models speech-text alignments using attention mechanisms without explicit duration modeling (Lee et al., 2024a; Eskimez et al., 2024).",
       "zh": "这些工作可分为两大类：1）第一类直接用注意力机制建模语音-文本对齐，而不做显式时长建模（Lee et al., 2024a; Eskimez et al., 2024）。"
      },
      {
       "id": "s-2-1-6",
       "original": "Although these models perform well in terms of generation speed and quality, their robustness, especially in challenging cases, still requires enhancement.",
       "zh": "尽管这类模型在生成速度和质量上表现不错，其鲁棒性（尤其是在困难样本上）仍有待加强。"
      },
      {
       "id": "s-2-1-7",
       "original": "The second category (Shen et al., 2023; Matthew et al., 2023) utilizes predefined alignments to simplify alignment learning.",
       "zh": "第二类（Shen et al., 2023; Matthew et al., 2023）利用预定义对齐来简化对齐学习。"
      },
      {
       "id": "s-2-1-8",
       "original": "However, the search space of the generated speech of these models is limited by predefined alignments.",
       "zh": "然而，这些模型生成语音的搜索空间受到预定义对齐的限制。"
      },
      {
       "id": "s-2-1-9",
       "original": "To address these limitations, we propose a sparse alignment mechanism to reduce the constraints of predefined alignment-based methods while also reducing the difficulty of speech-text alignment learning.",
       "zh": "针对这些局限，我们提出稀疏对齐机制，既减轻预定义对齐方法的约束，又降低语音-文本对齐学习的难度。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-accented-tts",
   "num": null,
   "level": 2,
   "page": 2,
   "title": {
    "original": "Accented TTS.",
    "zh": "口音 TTS"
   },
   "blocks": [
    {
     "id": "p-accented-tts-1",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-accented-tts-1-1",
       "original": "While accented TTS is not yet mainstream in the field of speech synthesis, it offers valuable potential for customized TTS services, by enhancing the expressiveness of speech synthesis systems and improving listeners’ comprehension of speech content (Tan et al., 2021; Melechovsky et al., 2022; Badlani et al., 2023; Zhou et al., 2024; Shah et al., 2024; Ma et al., 2023; Inoue et al., 2024; Zhong et al., 2024).",
       "zh": "尽管口音 TTS 尚未成为语音合成领域的主流方向，但它对定制化 TTS 服务很有价值：既能增强语音合成系统的表现力，也能帮助听众更好地理解语音内容（Tan et al., 2021; Melechovsky et al., 2022; Badlani et al., 2023; Zhou et al., 2024; Shah et al., 2024; Ma et al., 2023; Inoue et al., 2024; Zhong et al., 2024）。"
      },
      {
       "id": "s-accented-tts-1-2",
       "original": "With the emergence of conversational AI systems, accented TTS technology has even broader application scenarios.",
       "zh": "随着对话式 AI 系统的兴起，口音 TTS 技术有了更广阔的应用场景。"
      },
      {
       "id": "s-accented-tts-1-3",
       "original": "In this paper, we focus on a specific task of accented TTS: adjusting the accent intensity of speakers to make them sound like native English speakers or Latent Vector Masked Latent Latent with Anchor Discriminator Wave Decoder Latent Diffusion Transformer Sparse Aligner t Target Latent Phoneme Encoder Wave Encoder Wave Encoder Text (a) WaveVAE (b) Sparse-Aligned Diffusion Transformer",
       "zh": "本文聚焦口音 TTS 中的一个具体任务：调节说话人的口音强度，让他们听起来像以英语为母语的人，或像（此句句尾混入 Figure 1 的图中文字：Latent Vector Masked Latent Latent with Anchor Discriminator Wave Decoder Latent Diffusion Transformer Sparse Aligner t Target Latent Phoneme Encoder Wave Encoder Wave Encoder Text (a) WaveVAE (b) Sparse-Aligned Diffusion Transformer）"
      }
     ]
    },
    {
     "id": "fig-accented-tts-1",
     "type": "figure_caption",
     "page": 3,
     "original": "Figure 1: (a) The WaveVAE model; (b) Overview of our model. We insert the sparse alignment anchors into the latent vector sequence to provide coarse alignment information. The transformer blocks in MegaTTS 3 will automatically build fine-grained alignment paths.",
     "zh": "图 1：（a）WaveVAE 模型；（b）我们的模型总览。我们把稀疏对齐锚点插入潜在向量序列中，以提供粗略的对齐信息。MegaTTS 3 中的 Transformer 块会自动构建细粒度的对齐路径。"
    },
    {
     "id": "p-accented-tts-2",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-accented-tts-2-1",
       "original": "accented speakers who use English as a second language (Liu et al., 2024a).",
       "zh": "把英语作为第二语言的带口音说话人（Liu et al., 2024a）。"
      },
      {
       "id": "s-accented-tts-2-2",
       "original": "Unlike previous work, our approach does not require paired data or accurate accent labels; instead, it allows for flexible control over the accent intensity using the proposed multi-condition CFG mechanism.",
       "zh": "与以往工作不同，我们的方法不需要成对数据或精确的口音标签；相反，它借助提出的多条件 CFG 机制即可灵活控制口音强度。"
      },
      {
       "id": "s-accented-tts-2-3",
       "original": "In addition, we describe the CFG mechanism used in zero-shot TTS systems in Appendix B.",
       "zh": "此外，我们在 Appendix B 中介绍了零样本 TTS 系统中使用的 CFG 机制。"
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
    "zh": "3 方法"
   },
   "blocks": [
    {
     "id": "p-3-1",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-3-1-1",
       "original": "This section introduces MegaTTS 3.",
       "zh": "本节介绍 MegaTTS 3。"
      },
      {
       "id": "s-3-1-2",
       "original": "To begin with, we describe the architecture design of MegaTTS 3.",
       "zh": "首先，我们介绍 MegaTTS 3 的架构设计。"
      },
      {
       "id": "s-3-1-3",
       "original": "Then, we provide detailed explanations of the sparse alignment mechanism, the piecewise rectified flow acceleration technique, and the multicondition classifier-free guidance strategy.",
       "zh": "随后，我们详细解释稀疏对齐机制、分段修正流加速技术和多条件无分类器引导策略。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-3-1",
   "num": "3.1",
   "level": 2,
   "page": 3,
   "title": {
    "original": "Architecture WaveVAE.",
    "zh": "3.1 架构：WaveVAE"
   },
   "blocks": [
    {
     "id": "p-3-1-1",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-3-1-1-1",
       "original": "As shown in Figure 1 (a), given a speech waveform s, the VAE encoder E encodes s into a latent vector z, and the wave decoder D reconstructs the waveform x = D(z) = D(E(s)).",
       "zh": "如 Figure 1 (a) 所示，给定语音波形 s，VAE 编码器 E 把 s 编码为潜在向量 z，波形解码器 D 重建波形 x = D(z) = D(E(s))。"
      },
      {
       "id": "s-3-1-1-2",
       "original": "To reduce the computational burden of the model and simplify speech-text alignment learning, the encoder E downsamples the waveform by a factor of d in length.",
       "zh": "为了降低模型的计算负担并简化语音-文本对齐学习，编码器 E 把波形在长度方向上下采样 d 倍。"
      }
     ]
    },
    {
     "id": "p-3-1-2",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-3-1-2-1",
       "original": "The encoder E is similar to the one used in Ji et al. (2024), and the decoder D is based on Kong et al. (2020).",
       "zh": "编码器 E 与 Ji et al.（2024）所用的编码器类似，解码器 D 基于 Kong et al.（2020）。"
      },
      {
       "id": "s-3-1-2-2",
       "original": "We also adopt the multi-period discriminator (MPD), multiscale discriminator (MSD), and multi-resolution discriminator (MRD) (Kong et al., 2020; Jang et al., 2021) to model the high-frequency details in waveforms, which ensure perceptually highquality reconstructions.",
       "zh": "我们还采用多周期判别器（MPD）、多尺度判别器（MSD）和多分辨率判别器（MRD）（Kong et al., 2020; Jang et al., 2021）对波形中的高频细节建模，保证感知上高质量的重建。"
      },
      {
       "id": "s-3-1-2-3",
       "original": "The training loss of the speech compression model can be formulated as",
       "zh": "语音压缩模型的训练损失可表述为"
      }
     ]
    },
    {
     "id": "eq-3-1-1",
     "type": "equation",
     "page": 3,
     "original": "L = Lrec + LKL + LAdv, where Lrec = ∥s −ˆs∥2"
    },
    {
     "id": "p-3-1-3",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-3-1-3-1",
       "original": "is the spectrogram reconstruction loss, LKL is the slight KL-penalty loss (Rombach et al., 2022), and LAdv is the LSGAN-styled adversarial loss (Mao et al., 2017).",
       "zh": "其中 Lrec 是频谱重建损失，LKL 是较小的 KL 惩罚损失（Rombach et al., 2022），LAdv 是 LSGAN 风格的对抗损失（Mao et al., 2017）。"
      },
      {
       "id": "s-3-1-3-2",
       "original": "After training, a one-second speech clip can be encoded into 25 vector frames.",
       "zh": "训练完成后，一段 1 秒的语音片段可被编码为 25 帧向量。"
      },
      {
       "id": "s-3-1-3-3",
       "original": "For more details, please refer to Appendix A.1 and 4.5.",
       "zh": "更多细节请参见 Appendix A.1 与 4.5。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-latent-diffusion-transformer-wit",
   "num": null,
   "level": 2,
   "page": 3,
   "title": {
    "original": "Latent Diffusion Transformer with Masked",
    "zh": "带掩码语音建模的潜在扩散 Transformer"
   },
   "blocks": [
    {
     "id": "p-latent-diffusion-transformer-wit-1",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-latent-diffusion-transformer-wit-1-1",
       "original": "Speech Modeling.",
       "zh": "语音建模。（本句为章节标题「Latent Diffusion Transformer with Masked Speech Modeling」跨页截断的后半段）"
      }
     ]
    },
    {
     "id": "p-latent-diffusion-transformer-wit-2",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-latent-diffusion-transformer-wit-2-1",
       "original": "The latent diffusion transformer is used to predict speech that matches the style of the given speaker and the content of the provided text.",
       "zh": "潜在扩散 Transformer 用于预测符合给定说话人风格和给定文本内容的语音。"
      },
      {
       "id": "s-latent-diffusion-transformer-wit-2-2",
       "original": "Given the random variables Z0 sampled from a standard Gaussian distribution π0 and Z1 sampled from the latent space given by the speech compression model with data density π1, we adopt the rectified flow Liu et al. (2022) to implicitly learn the transport map T, which yields Z1 := T(Z0).",
       "zh": "给定从标准高斯分布 π0 采样的随机变量 Z0，以及从语音压缩模型给出的潜在空间（数据密度为 π1）采样的 Z1，我们采用修正流（rectified flow）（Liu et al., 2022）隐式地学习传输映射 T，使得 Z1 := T(Z0)。"
      },
      {
       "id": "s-latent-diffusion-transformer-wit-2-3",
       "original": "The rectified flow learns T by constructing the following ordinary differential equation (ODE):",
       "zh": "修正流通过构造如下常微分方程（ODE）来学习 T：dZt = v(Zt, t) dt，其中 t ∈[0, 1] 表示时间，v 是漂移力。"
      }
     ]
    },
    {
     "id": "eq-latent-diffusion-transformer-wit-1",
     "type": "equation",
     "page": 3,
     "original": "dZt = v(Zt, t) dt, (1)"
    },
    {
     "id": "p-latent-diffusion-transformer-wit-3",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-latent-diffusion-transformer-wit-3-1",
       "original": "where t ∈[0, 1] denotes time and v is the drift force.",
       "zh": "修正流通过构造如下常微分方程（ODE）来学习 T：dZt = v(Zt, t) dt，其中 t ∈[0, 1] 表示时间，v 是漂移力。"
      },
      {
       "id": "s-latent-diffusion-transformer-wit-3-2",
       "original": "Equation 1 converts Z0 from π0 to Z1 from π1.",
       "zh": "公式 1 把来自 π0 的 Z0 转化为来自 π1 的 Z1。"
      },
      {
       "id": "s-latent-diffusion-transformer-wit-3-3",
       "original": "The drift force v drives the flow to follow the direction (Z1 −Z0).",
       "zh": "漂移力 v 驱使流沿着 (Z1 −Z0) 的方向行进。"
      },
      {
       "id": "s-latent-diffusion-transformer-wit-3-4",
       "original": "The latent diffusion transformer, parameterized by θ, can be trained by estimating v(Zt, t) with vθ(Zt, t) through minimizing the least squares loss with respect to the line directions (Z1 −Z0):",
       "zh": "参数化为 θ 的潜在扩散 Transformer 通过用 vθ(Zt, t) 估计 v(Zt, t)、并对直线方向 (Z1 −Z0) 最小化最小二乘损失来训练："
      }
     ]
    },
    {
     "id": "eq-latent-diffusion-transformer-wit-2",
     "type": "equation",
     "page": 3,
     "original": "Z 1"
    },
    {
     "id": "eq-latent-diffusion-transformer-wit-3",
     "type": "equation",
     "page": 3,
     "original": "0"
    },
    {
     "id": "p-latent-diffusion-transformer-wit-4",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-latent-diffusion-transformer-wit-4-1",
       "original": "E ∥(Z1 −Z0) −v(Zt, t)∥2 dt.",
       "zh": "（本句为公式残块，接上方训练目标：）∫₀¹ E ∥(Z1 −Z0) −v(Zt, t)∥2 dt。"
      }
     ]
    },
    {
     "id": "eq-latent-diffusion-transformer-wit-4",
     "type": "equation",
     "page": 3,
     "original": "(2)"
    },
    {
     "id": "eq-latent-diffusion-transformer-wit-5",
     "type": "equation",
     "page": 3,
     "original": "min v"
    },
    {
     "id": "p-latent-diffusion-transformer-wit-5",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-latent-diffusion-transformer-wit-5-1",
       "original": "We use the standard transformer block from LLAMA (Dubey et al., 2024) as the basic structure for MegaTTS 3 and adopt the Rotary Position Embedding (RoPE) (Su et al., 2024) as the positional embedding.",
       "zh": "我们使用 LLAMA（Dubey et al., 2024）的标准 Transformer 块作为 MegaTTS 3 的基本结构，并采用旋转位置编码（RoPE）（Su et al., 2024）作为位置嵌入。"
      },
      {
       "id": "s-latent-diffusion-transformer-wit-5-2",
       "original": "During training, we randomly divide the latent vector sequence into a prompt region zprompt and a masked target region ztarget, with the proportion of zprompt being γ ∼U(0.1, 0.9).",
       "zh": "训练时，我们把潜在向量序列随机划分为提示（prompt）区 zprompt 和掩码目标区 ztarget，zprompt 所占比例为 γ ∼U(0.1, 0.9)。"
      },
      {
       "id": "s-latent-diffusion-transformer-wit-5-3",
       "original": "We use vθ to predict the masked target vector ˆztarget conditioned on zprompt and the phoneme embedding p, denoted as vθ(ˆztarget|zprompt, p).",
       "zh": "我们用 vθ 在 zprompt 和音素嵌入 p 的条件下预测被掩码的目标向量 ẑtarget，记作 vθ(ẑtarget|zprompt, p)。"
      },
      {
       "id": "s-latent-diffusion-transformer-wit-5-4",
       "original": "The loss is calculated using only the masked region ztarget.",
       "zh": "损失只在掩码区域 ztarget 上计算。"
      },
      {
       "id": "s-latent-diffusion-transformer-wit-5-5",
       "original": "MegaTTS 3 learns the average pronunciation from p and the specific characteristics such as timbre, accent, and prosody of the corresponding speaker from zprompt.",
       "zh": "MegaTTS 3 从 p 中学习平均发音，从 zprompt 中学习对应说话人的音色、口音和韵律等具体特征。"
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
    "original": "Sparse Alignment Enhanced Latent Diffusion Transformer (MegaTTS 3)",
    "zh": "3.2 稀疏对齐增强的潜在扩散 Transformer（MegaTTS 3）"
   },
   "blocks": [
    {
     "id": "p-3-2-1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-2-1-1",
       "original": "In this subsection, we describe the sparse alignment strategy as the foundation of MegaTTS 3, followed by the piecewise rectified flow and multi-condition CFG strategies to further enhance MegaTTS 3’s capacity.",
       "zh": "在本小节中，我们首先介绍作为 MegaTTS 3 基础的稀疏对齐策略，随后介绍分段修正流和多条件 CFG 策略，以进一步增强 MegaTTS 3 的能力。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-sparse-alignment-strategy",
   "num": null,
   "level": 2,
   "page": 4,
   "title": {
    "original": "Sparse Alignment Strategy.",
    "zh": "稀疏对齐策略"
   },
   "blocks": [
    {
     "id": "p-sparse-alignment-strategy-1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-sparse-alignment-strategy-1-1",
       "original": "Let’s first analyze the reasons behind the characteristics of different speech-text alignment modeling methods in depth.",
       "zh": "我们先深入分析不同语音-文本对齐建模方法各自特性背后的原因。"
      },
      {
       "id": "s-sparse-alignment-strategy-1-2",
       "original": "Implicitly modeling speech-text alignment is a relatively challenging task, which consequently leads to suboptimal speech intelligibility, particularly in hard cases.",
       "zh": "隐式建模语音-文本对齐是一项相对困难的任务，因此会导致可懂度不够理想，在困难样本上尤其如此。"
      },
      {
       "id": "s-sparse-alignment-strategy-1-3",
       "original": "On the other hand, employing predefined hard alignment paths constrains the model’s search space to produce more naturalsounding speech.",
       "zh": "另一方面，使用预定义的硬对齐路径会限制模型生成更自然语音的搜索空间。"
      }
     ]
    },
    {
     "id": "p-sparse-alignment-strategy-2",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-sparse-alignment-strategy-2-1",
       "original": "The characteristics of these systems motivate us to design an approach that combines the advantages of both: we first provide a rough alignment to MegaTTS 3 and then use attention mechanisms in Transformer blocks to construct the fine-grained implicit alignment path.",
       "zh": "这些系统的特性促使我们设计一种结合两者优点的方法：先给 MegaTTS 3 提供一个粗略对齐，再利用 Transformer 块中的注意力机制构建细粒度的隐式对齐路径。"
      }
     ]
    },
    {
     "id": "p-sparse-alignment-strategy-3",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-sparse-alignment-strategy-3-1",
       "original": "The visualizations of the implicit alignment paths are included in Appendix F.",
       "zh": "隐式对齐路径的可视化结果见 Appendix F。"
      },
      {
       "id": "s-sparse-alignment-strategy-3-2",
       "original": "In specific, denote the latent speech vector sequence as z = [z1, z2, · · · , zn], the phoneme sequence as p = [p1, p2, · · · , pm], and the phoneme duration sequence as d = [d1, d2, · · · , dm], where n, m is the length of the sequence.",
       "zh": "具体来说，记潜在语音向量序列为 z = [z1, z2, · · · , zn]，音素序列为 p = [p1, p2, · · · , pm]，音素时长序列为 d = [d1, d2, · · · , dm]，其中 n、m 为序列长度。"
      },
      {
       "id": "s-sparse-alignment-strategy-3-3",
       "original": "The length of the speech vector that corresponds to a phoneme pi is the duration di.",
       "zh": "音素 pi 对应的语音向量长度即时长 di。"
      },
      {
       "id": "s-sparse-alignment-strategy-3-4",
       "original": "Given d = [2, 2, 3], the hard speech-text alignment path can be denoted as a = [p1, p1, p2, p2, p3, p3, p3].",
       "zh": "给定 d = [2, 2, 3]，硬语音-文本对齐路径可表示为 a = [p1, p1, p2, p2, p3, p3, p3]。"
      },
      {
       "id": "s-sparse-alignment-strategy-3-5",
       "original": "To construct the rough alignment ˜a, we randomly retain only one anchor for each phoneme: ˜a = [M, p1, p2, M, M, M, P3], where M represents the mask token. ˜a is downsampled with convolution layers to match the length of the latent sequence z.",
       "zh": "为构造粗略对齐 ã，我们对每个音素只随机保留一个锚点：ã = [M, p1, p2, M, M, M, P3]，其中 M 代表掩码 token。ã 经卷积层下采样，使其长度与潜在序列 z 匹配。"
      },
      {
       "id": "s-sparse-alignment-strategy-3-6",
       "original": "Then, we directly concatenate the downsampled ˜a and z along the channel dimension.",
       "zh": "然后，我们把下采样后的 ã 与 z 沿通道维直接拼接。"
      },
      {
       "id": "s-sparse-alignment-strategy-3-7",
       "original": "The anchors in ˜a provide MegaTTS 3 with approximate positional information for each phoneme, simplifying the learning process of speech-text alignment.",
       "zh": "ã 中的锚点为 MegaTTS 3 提供了每个音素的大致位置信息，简化了语音-文本对齐的学习过程。"
      },
      {
       "id": "s-sparse-alignment-strategy-3-8",
       "original": "At the same time, the rough alignment information does not limit MegaTTS 3’s search space and also enables fine-grained control over each phoneme’s duration.",
       "zh": "与此同时，粗略对齐信息并不限制 MegaTTS 3 的搜索空间，还能实现对每个音素时长的细粒度控制。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-piecewise-rectified-flow-acceler",
   "num": null,
   "level": 2,
   "page": 4,
   "title": {
    "original": "Piecewise Rectified Flow Acceleration.",
    "zh": "分段修正流加速"
   },
   "blocks": [
    {
     "id": "p-piecewise-rectified-flow-acceler-1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-piecewise-rectified-flow-acceler-1-1",
       "original": "We adopt Piecewise Rectified Flow (PeRFlow) (Yan et al., 2024) to distill the pretrained MegaTTS 3 model into a more efficient generator.",
       "zh": "我们采用分段修正流（PeRFlow）（Yan et al., 2024）把预训练的 MegaTTS 3 模型蒸馏成一个更高效的生成器。"
      },
      {
       "id": "s-piecewise-rectified-flow-acceler-1-2",
       "original": "Although our MegaTTS 3 is non-autoregressive in terms of the time dimension, it requires multiple iterations to solve the Flow ODE.",
       "zh": "尽管 MegaTTS 3 在时间维度上是非自回归的，它仍需多次迭代来求解 Flow ODE。"
      },
      {
       "id": "s-piecewise-rectified-flow-acceler-1-3",
       "original": "The number of iterations (i.e., number of function evaluations, NFE) has a great impact on inference efficiency, especially when the model scales up further.",
       "zh": "迭代次数（即函数评估次数，NFE）对推理效率影响很大，尤其当模型规模进一步扩大时。"
      },
      {
       "id": "s-piecewise-rectified-flow-acceler-1-4",
       "original": "Therefore, we adopt the PeRFlow technique to further reduce NFE by segmenting the flow trajectories into multiple time windows.",
       "zh": "因此，我们采用 PeRFlow 技术，通过把流轨迹分割为多个时间窗口来进一步降低 NFE。"
      },
      {
       "id": "s-piecewise-rectified-flow-acceler-1-5",
       "original": "Applying reflow operations within these shortened time intervals, PeRFlow eliminates the need to simulate the full ODE trajectory for training data preparation, allowing it to be trained in real-time alongside large-scale real data during the training process.",
       "zh": "在这些缩短的时间区间内施加 reflow 操作，PeRFlow 无需在准备训练数据时模拟完整的 ODE 轨迹，因而可以在训练过程中与大规模真实数据一起实时训练。"
      },
      {
       "id": "s-piecewise-rectified-flow-acceler-1-6",
       "original": "Given number of windows K, we divide the time t ∈[0, 1] into K time windows {(tk−1, tk]}K k=1.",
       "zh": "给定窗口数 K，我们把时间 t ∈[0, 1] 划分为 K 个时间窗口 {(tk−1, tk]}（k=1…K）。"
      },
      {
       "id": "s-piecewise-rectified-flow-acceler-1-7",
       "original": "Then, we randomly sample k ∈{1, · · · , K} uniformly.",
       "zh": "然后，我们从 {1, · · · , K} 中均匀随机采样一个 k。"
      },
      {
       "id": "s-piecewise-rectified-flow-acceler-1-8",
       "original": "We use the startpoint of the sampled time window ztk−1 = p 1 −σ2(tk−1)z1 + σ(tk−1)ϵ to solve the endpoint of the time window ˆztk = ϕθ(ztk−1, tk−1, tk), where ϵ ∼N(0, I) is the random noise, σ(t) is the noise schedule, and ϕθ is the ODE solver of the teacher model.",
       "zh": "我们用所采样时间窗口的起点 ztk−1 = √（1 −σ2(tk−1)）z1 + σ(tk−1)ϵ 来求解该时间窗口的终点 ẑtk = ϕθ(ztk−1, tk−1, tk)，其中 ϵ ∼N(0, I) 为随机噪声，σ(t) 为噪声调度，ϕθ 为教师模型的 ODE 求解器。"
      },
      {
       "id": "s-piecewise-rectified-flow-acceler-1-9",
       "original": "Since ztk−1 and ˆztk is available, the student model ˆθ can be trained via the following objectives:",
       "zh": "由于 ztk−1 和 ẑtk 均已可得，学生模型 θ̂ 可通过如下目标进行训练："
      }
     ]
    },
    {
     "id": "eq-piecewise-rectified-flow-acceler-1",
     "type": "equation",
     "page": 4,
     "original": "2 , (3)"
    },
    {
     "id": "eq-piecewise-rectified-flow-acceler-2",
     "type": "equation",
     "page": 4,
     "original": "ℓ= vˆθ(zt, t) −ˆztk −ztk−1"
    },
    {
     "id": "eq-piecewise-rectified-flow-acceler-3",
     "type": "equation",
     "page": 4,
     "original": "tk −tk−1"
    },
    {
     "id": "p-piecewise-rectified-flow-acceler-2",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-piecewise-rectified-flow-acceler-2-1",
       "original": "where vˆθ is the estimated drift force with parameter ˆθ and t is uniformly sampled from (tk−1, tk].",
       "zh": "其中 vθ̂ 是参数为 θ̂ 的漂移力估计，t 从 (tk−1, tk] 中均匀采样。"
      },
      {
       "id": "s-piecewise-rectified-flow-acceler-2-2",
       "original": "We provide details of PeRFlow training for MegaTTS 3 in Appendix C.",
       "zh": "MegaTTS 3 的 PeRFlow 训练细节见 Appendix C。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-multi-condition",
   "num": null,
   "level": 2,
   "page": 4,
   "title": {
    "original": "Multi-condition",
    "zh": "多条件无分类器引导（CFG）"
   },
   "blocks": [
    {
     "id": "p-multi-condition-1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-multi-condition-1-1",
       "original": "Classifier-Free Guidance (CFG).",
       "zh": "无分类器引导（CFG）。（本句为章节标题「Multi-condition Classifier-Free Guidance (CFG)」跨页截断的后半段）"
      }
     ]
    },
    {
     "id": "p-multi-condition-2",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-multi-condition-2-1",
       "original": "We employ classifier-free guidance approach (Ho and Salimans, 2022) to steer the model gθ’s output towards the conditional generation gθ(zt, c) and away from the unconditional generation gθ(zt, ∅):",
       "zh": "我们采用无分类器引导方法（Ho and Salimans, 2022），使模型 gθ 的输出趋向条件生成 gθ(zt, c)、远离无条件生成 gθ(zt, ∅)："
      }
     ]
    },
    {
     "id": "eq-multi-condition-1",
     "type": "equation",
     "page": 5,
     "original": "ˆgθ(zt, c) = gθ(zt, ∅) + α · [gθ(zt, c) −gθ(zt, ∅)] , (4)"
    },
    {
     "id": "p-multi-condition-3",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-multi-condition-3-1",
       "original": "where c denotes the conditional state, ∅denotes the unconditional state, and α is the guidance scale selected based on experimental results.",
       "zh": "ĝθ(zt, c) = gθ(zt, ∅) + α · [gθ(zt, c) −gθ(zt, ∅)]，其中 c 表示条件状态，∅ 表示无条件状态，α 是依据实验结果选定的引导尺度。"
      },
      {
       "id": "s-multi-condition-3-2",
       "original": "Unlike standard classifier-free guidance, MegaTTS 3’s conditional states c consist of two components: phoneme embeddings p and the speaker prompt zprompt.",
       "zh": "与标准的无分类器引导不同，MegaTTS 3 的条件状态 c 由两部分组成：音素嵌入 p 和说话人提示 zprompt。"
      },
      {
       "id": "s-multi-condition-3-3",
       "original": "In the experiments, as the text guidance scale increases, we observe that the pronunciation changes according to the following pattern: 1) starting with improper pronunciation; 2) then shifting to pronouncing with the current speaker’s accent; 3) and finally approaching the standard pronunciation of the target language.",
       "zh": "在实验中，随着文本引导尺度增大，我们观察到发音按如下规律变化：1）起初发音不恰当；2）随后转变为带当前说话人口音的发音；3）最终接近目标语言的标准发音。"
      },
      {
       "id": "s-multi-condition-3-4",
       "original": "The detailed experimental setup is described in Appendix K.",
       "zh": "详细的实验设置见 Appendix K。"
      },
      {
       "id": "s-multi-condition-3-5",
       "original": "This allows us to use the text guidance scale αtxt to control the accent intensity.",
       "zh": "这使得我们可以用文本引导尺度 αtxt 来控制口音强度。"
      },
      {
       "id": "s-multi-condition-3-6",
       "original": "At the same time, the speaker guidance scale αspk should be a relatively high value to ensure a high speaker similarity.",
       "zh": "与此同时，说话人引导尺度 αspk 应取相对较高的值，以保证较高的说话人相似度。"
      },
      {
       "id": "s-multi-condition-3-7",
       "original": "Therefore, we adopt the multi-condition classifier-free guidance technique to separately control αtxt and αspk:",
       "zh": "因此，我们采用多条件无分类器引导技术，分别控制 αtxt 和 αspk："
      }
     ]
    },
    {
     "id": "eq-multi-condition-2",
     "type": "equation",
     "page": 5,
     "original": "ˆgθ(zt, p, zprompt) =αspk [gθ(zt, p, zprompt) −gθ(zt, p, ∅)] + αtxt [gθ(zt, p, ∅) −gθ(zt, ∅, ∅)] + gθ(zt, ∅, ∅) (5)"
    },
    {
     "id": "p-multi-condition-4",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-multi-condition-4-1",
       "original": "In training, we randomly drop condition zprompt with a probability of pspk = 0.10.",
       "zh": "ĝθ(zt, p, zprompt) =αspk [gθ(zt, p, zprompt) −gθ(zt, p, ∅)] + αtxt [gθ(zt, p, ∅) −gθ(zt, ∅, ∅)] + gθ(zt, ∅, ∅)。训练时，我们以 pspk = 0.10 的概率随机丢弃条件 zprompt。"
      },
      {
       "id": "s-multi-condition-4-2",
       "original": "Only when zprompt is dropped, we randomly drop condition p with a probability of 50%.",
       "zh": "只有当 zprompt 被丢弃时，我们才会以 50% 的概率随机丢弃条件 p。"
      },
      {
       "id": "s-multi-condition-4-3",
       "original": "Therefore, our model is able to handle all three types of conditional inputs described in Equation 5.",
       "zh": "因此，我们的模型能够处理公式 5 所描述的全部三类条件输入。"
      },
      {
       "id": "s-multi-condition-4-4",
       "original": "We select the guidance scale αspk and αtxt based on experimental results.",
       "zh": "我们依据实验结果选定引导尺度 αspk 与 αtxt。"
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
    "original": "Experiments",
    "zh": "4 实验"
   },
   "blocks": [
    {
     "id": "p-4-1",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-4-1-1",
       "original": "In this subsection, we describe the datasets, training, inference, and evaluation metrics.",
       "zh": "在本节中，我们介绍数据集、训练、推理和评测指标。"
      },
      {
       "id": "s-4-1-2",
       "original": "We provide the model configuration and detailed hyperparameter setting in Appendix A.1.",
       "zh": "模型配置与详细的超参数设置见 Appendix A.1。"
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
    "original": "Experimental setup Datasets.",
    "zh": "4.1 实验设置：数据集"
   },
   "blocks": [
    {
     "id": "p-4-1-1",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-4-1-1-1",
       "original": "We train MegaTTS 3 on the LibriLight (Kahn et al., 2020) dataset, which contains 60k hours of unlabeled speech derived from LibriVox audiobooks.",
       "zh": "我们在 LibriLight（Kahn et al., 2020）数据集上训练 MegaTTS 3，该数据集包含来自 LibriVox 有声书的 60k 小时无标注语音。"
      },
      {
       "id": "s-4-1-1-2",
       "original": "All speech data are sampled at 16KHz.",
       "zh": "所有语音数据的采样率均为 16KHz。"
      },
      {
       "id": "s-4-1-1-3",
       "original": "We transcribe the speeches using an internal ASR system and extract the predefined speech-text alignment using the external alignment tool (McAuliffe et al., 2017).",
       "zh": "我们用一个内部 ASR 系统转写语音，并用外部对齐工具（McAuliffe et al., 2017）抽取预定义的语音-文本对齐。"
      },
      {
       "id": "s-4-1-1-4",
       "original": "We utilize three benchmark datasets: 1) the librispeech (Panayotov et al., 2015) test-clean set following NaturalSpeech 3 (Ju et al., 2024) for zero-shot TTS evaluation; 2) the LibriSpeech-PC test-clean set following F5- TTS (Chen et al., 2024b) for zero-shot TTS evaluation; 3) the L2-arctic dataset (Zhao et al., 2018) following (Melechovsky et al., 2022; Liu et al., 2024a) for accented TTS evaluation.",
       "zh": "我们使用三个基准数据集：1）遵循 NaturalSpeech 3（Ju et al., 2024）的 LibriSpeech（Panayotov et al., 2015）test-clean 集，用于零样本 TTS 评测；2）遵循 F5-TTS（Chen et al., 2024b）的 LibriSpeech-PC test-clean 集，用于零样本 TTS 评测；3）遵循（Melechovsky et al., 2022; Liu et al., 2024a）的 L2-ARCTIC 数据集（Zhao et al., 2018），用于口音 TTS 评测。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-training-and-inference",
   "num": null,
   "level": 2,
   "page": 5,
   "title": {
    "original": "Training and Inference.",
    "zh": "训练与推理"
   },
   "blocks": [
    {
     "id": "p-training-and-inference-1",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-training-and-inference-1-1",
       "original": "We train the WaveVAE model and MegaTTS 3 on 8 NVIDIA A100 GPUs.",
       "zh": "我们在 8 张 NVIDIA A100 GPU 上训练 WaveVAE 模型和 MegaTTS 3。"
      },
      {
       "id": "s-training-and-inference-1-2",
       "original": "The batch sizes, optimizer settings, and learning rate schedules are described in Appendix A.1.",
       "zh": "批大小、优化器设置和学习率调度见 Appendix A.1。"
      },
      {
       "id": "s-training-and-inference-1-3",
       "original": "It takes 2M steps for the WaveVAE model’s training and 1M steps for MegaTTS 3’s training until convergence.",
       "zh": "WaveVAE 模型的训练需 2M 步，MegaTTS 3 的训练需 1M 步直至收敛。"
      },
      {
       "id": "s-training-and-inference-1-4",
       "original": "The pre-training of MegaTTS 3 requires 800k steps and PeRFlow distillation requires 200k steps.",
       "zh": "MegaTTS 3 的预训练需要 800k 步，PeRFlow 蒸馏需要 200k 步。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-objective-metrics",
   "num": null,
   "level": 2,
   "page": 5,
   "title": {
    "original": "Objective Metrics.",
    "zh": "客观指标"
   },
   "blocks": [
    {
     "id": "p-objective-metrics-1",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-objective-metrics-1-1",
       "original": "1) For zero-shot TTS, we evaluate speech intelligibility using the word error rate (WER) and speaker similarity using SIM- O (Ju et al., 2024).",
       "zh": "1）对于零样本 TTS，我们用词错误率（WER）评测语音可懂度，用 SIM-O（Ju et al., 2024）评测说话人相似度。"
      },
      {
       "id": "s-objective-metrics-1-2",
       "original": "To measure SIM-O, we utilize the WavLM-TDCNN speaker embedding model1 to calculate the cosine similarity score between the generated samples and the prompt.",
       "zh": "为计算 SIM-O，我们使用 WavLM-TDCNN 说话人嵌入模型（原文脚注 1，代码链接见 Appendix A）计算生成样本与提示（prompt）之间的余弦相似度得分。"
      },
      {
       "id": "s-objective-metrics-1-3",
       "original": "As SIM- R (Matthew et al., 2023) is not comparable across baselines using different acoustic tokenizers, we recommend focusing on SIM-O in our experiments.",
       "zh": "由于 SIM-R（Matthew et al., 2023）在使用不同声学分词器的基线之间不可比，我们建议在我们的实验中重点关注 SIM-O。"
      },
      {
       "id": "s-objective-metrics-1-4",
       "original": "The similarity score is in the range of [−1, 1], where a higher value indicates greater similarity.",
       "zh": "相似度得分取值范围为 [−1, 1]，数值越高表示相似度越大。"
      },
      {
       "id": "s-objective-metrics-1-5",
       "original": "In terms of WER, we use the publicly available HuBERT-Large model (Hsu et al., 2021), finetuned on the 960-hour LibriSpeech training set, to transcribe the generated speech.",
       "zh": "在 WER 方面，我们使用公开的 HuBERT-Large 模型（Hsu et al., 2021）（在 960 小时 LibriSpeech 训练集上微调）来转写生成的语音。"
      },
      {
       "id": "s-objective-metrics-1-6",
       "original": "The WER is calculated by comparing the transcribed text to the original target text.",
       "zh": "WER 通过比较转写文本与原始目标文本计算得到。"
      },
      {
       "id": "s-objective-metrics-1-7",
       "original": "All samples from the test set are used for the objective evaluation; 2) For accented TTS, we evaluate the Mel Cepstral Distortion (MCD) in dB level and the moments (standard deviation (σ), skewness (γ) and kurtosis (κ)) (Andreeva et al., 2014; Niebuhr and Skarnitzl, 2019) of the pitch distribution to evaluate whether the model accurately captures accent variance.",
       "zh": "测试集的全部样本都用于客观评测；2）对于口音 TTS，我们评测 dB 级的 Mel 倒谱失真（MCD），以及音高分布的各阶矩（标准差 σ、偏度 γ 和峰度 κ）（Andreeva et al., 2014; Niebuhr and Skarnitzl, 2019），以评估模型是否准确捕捉了口音差异。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-subjective-metrics",
   "num": null,
   "level": 2,
   "page": 5,
   "title": {
    "original": "Subjective Metrics.",
    "zh": "主观指标"
   },
   "blocks": [
    {
     "id": "p-subjective-metrics-1",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-subjective-metrics-1-1",
       "original": "We conduct the MOS (mean opinion score) evaluation on the test set to measure the audio naturalness via Amazon Mechanical Turk.",
       "zh": "我们在测试集上进行 MOS（平均意见分）评测以衡量音频自然度，平台为 Amazon Mechanical Turk。"
      },
      {
       "id": "s-subjective-metrics-1-2",
       "original": "We keep the text content and prompt speech consistent among different models to exclude other interference factors.",
       "zh": "我们保持不同模型间的文本内容与提示语音一致，以排除其他干扰因素。"
      },
      {
       "id": "s-subjective-metrics-1-3",
       "original": "We randomly choose 40 sam1https://github.com/microsoft/UniSpeech/tree/ main/downstreams/speaker_verification Model #Params Training Data SIM-O↑ SIM-R↑ WER↓ CMOS↑ SMOS↑ RTF↓ GT",
       "zh": "我们随机抽取 40 个样（脚注 1：https://github.com/microsoft/UniSpeech/tree/main/downstreams/speaker_verification）。（表头：Model / #Params / Training Data / SIM-O↑ / SIM-R↑ / WER↓ / CMOS↑ / SMOS↑ / RTF↓——GT，后续照原文。）"
      }
     ]
    },
    {
     "id": "eq-subjective-metrics-1",
     "type": "equation",
     "page": 5,
     "original": "- - 0.68 - 1.94% +0.12 3.92 -"
    },
    {
     "id": "eq-subjective-metrics-2",
     "type": "equation",
     "page": 5,
     "original": "VALL-E 2∗ 0.4B LibriHeavy"
    },
    {
     "id": "eq-subjective-metrics-3",
     "type": "equation",
     "page": 5,
     "original": "0.64 0.68 2.44% - - -"
    },
    {
     "id": "eq-subjective-metrics-4",
     "type": "equation",
     "page": 5,
     "original": "VoiceBox† 0.4B Collected (60kh)"
    },
    {
     "id": "eq-subjective-metrics-5",
     "type": "equation",
     "page": 5,
     "original": "0.64 0.67 2.03% -0.20 3.81 0.340"
    },
    {
     "id": "eq-subjective-metrics-6",
     "type": "equation",
     "page": 5,
     "original": "DiTTo-TTS∗ 0.7B Collected (55kh)"
    },
    {
     "id": "eq-subjective-metrics-7",
     "type": "equation",
     "page": 5,
     "original": "0.62 0.65 2.56% - - -"
    },
    {
     "id": "eq-subjective-metrics-8",
     "type": "equation",
     "page": 5,
     "original": "NaturalSpeech 3† 0.5B LibriLight"
    },
    {
     "id": "eq-subjective-metrics-9",
     "type": "equation",
     "page": 5,
     "original": "0.67 0.76 1.81% -0.10 3.95 0.296"
    },
    {
     "id": "eq-subjective-metrics-10",
     "type": "equation",
     "page": 5,
     "original": "CosyVoice 0.4B Collected (172kh)"
    },
    {
     "id": "eq-subjective-metrics-11",
     "type": "equation",
     "page": 5,
     "original": "0.62 - 2.24% -0.18 3.93 1.375"
    },
    {
     "id": "eq-subjective-metrics-12",
     "type": "equation",
     "page": 5,
     "original": "MaskGCT 1.0B Emilia (100kh)"
    },
    {
     "id": "eq-subjective-metrics-13",
     "type": "equation",
     "page": 5,
     "original": "0.69 - 2.63% - - -"
    },
    {
     "id": "eq-subjective-metrics-14",
     "type": "equation",
     "page": 5,
     "original": "F5-TTS 0.3B Emilia (100kh)"
    },
    {
     "id": "eq-subjective-metrics-15",
     "type": "equation",
     "page": 5,
     "original": "0.66 - 1.96% -0.12 3.96 0.307"
    },
    {
     "id": "eq-subjective-metrics-16",
     "type": "equation",
     "page": 5,
     "original": "MegaTTS 3 0.3B LibriLight"
    },
    {
     "id": "eq-subjective-metrics-17",
     "type": "equation",
     "page": 5,
     "original": "0.71 0.78 1.82% 0.00 3.98 0.188"
    },
    {
     "id": "eq-subjective-metrics-18",
     "type": "equation",
     "page": 5,
     "original": "MegaTTS 3-accelerated 0.3B LibriLight"
    },
    {
     "id": "eq-subjective-metrics-19",
     "type": "equation",
     "page": 5,
     "original": "0.70 0.78 1.86% -0.03 3.96 0.124"
    },
    {
     "id": "tab-subjective-metrics-1",
     "type": "table_caption",
     "page": 6,
     "original": "Table 1: Zero-shot TTS results on the LibriSpeech test-clean set following NaturalSpeech 3 (Ju et al., 2024). ∗",
     "zh": "表 1：遵循 NaturalSpeech 3（Ju et al., 2024）在 LibriSpeech test-clean 集上的零样本 TTS 结果。"
    },
    {
     "id": "p-subjective-metrics-2",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-subjective-metrics-2-1",
       "original": "means the results are obtained from the paper. † means the results are obtained from the authors. #Params denotes the number of parameters.",
       "zh": "∗ 表示结果取自论文原文。† 表示结果由作者提供。#Params 表示参数数量。"
      },
      {
       "id": "s-subjective-metrics-2-2",
       "original": "RTF denotes the real-time factor.",
       "zh": "RTF 表示实时因子。"
      }
     ]
    },
    {
     "id": "p-subjective-metrics-3",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-subjective-metrics-3-1",
       "original": "Model #Params SIM-O↑ WER↓ GT",
       "zh": "表头：Model / #Params / SIM-O↑ / WER↓——GT（后续照原文）。"
      }
     ]
    },
    {
     "id": "eq-subjective-metrics-20",
     "type": "equation",
     "page": 6,
     "original": "- 0.69 2.23%"
    },
    {
     "id": "eq-subjective-metrics-21",
     "type": "equation",
     "page": 6,
     "original": "CosyVoice 0.3B"
    },
    {
     "id": "eq-subjective-metrics-22",
     "type": "equation",
     "page": 6,
     "original": "0.66 3.59%"
    },
    {
     "id": "eq-subjective-metrics-23",
     "type": "equation",
     "page": 6,
     "original": "E2 TTS 0.3B"
    },
    {
     "id": "eq-subjective-metrics-24",
     "type": "equation",
     "page": 6,
     "original": "0.69 2.95%"
    },
    {
     "id": "eq-subjective-metrics-25",
     "type": "equation",
     "page": 6,
     "original": "F5-TTS 0.3B"
    },
    {
     "id": "eq-subjective-metrics-26",
     "type": "equation",
     "page": 6,
     "original": "0.66 2.42%"
    },
    {
     "id": "eq-subjective-metrics-27",
     "type": "equation",
     "page": 6,
     "original": "MegaTTS 3 0.3B"
    },
    {
     "id": "eq-subjective-metrics-28",
     "type": "equation",
     "page": 6,
     "original": "0.70 2.31%"
    },
    {
     "id": "tab-subjective-metrics-2",
     "type": "table_caption",
     "page": 6,
     "original": "Table 2: Zero-shot TTS results on the LibriSpeech-PC test-clean set following F5-TTS (Chen et al., 2024b). #Params denotes the number of parameters.",
     "zh": "表 2：遵循 F5-TTS（Chen et al., 2024b）在 LibriSpeech-PC test-clean 集上的零样本 TTS 结果。#Params 表示参数数量。"
    },
    {
     "id": "p-subjective-metrics-4",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-subjective-metrics-4-1",
       "original": "ples from the test set of each dataset for the subjective evaluation, and each audio is listened to by at least 10 testers.",
       "zh": "我们从每个数据集的测试集中随机选取 40 个样本用于主观评测，每段音频至少由 10 名测试者收听。"
      },
      {
       "id": "s-subjective-metrics-4-2",
       "original": "We analyze the MOS in three aspects: CMOS (quality, clarity, naturalness, and high-frequency details), SMOS (speaker similarity in terms of timbre reconstruction and prosodic pattern), and ASMOS (accent similarity).",
       "zh": "我们从三个维度分析 MOS：CMOS（质量、清晰度、自然度和高频细节）、SMOS（音色重建与韵律模式上的说话人相似度）和 ASMOS（口音相似度）。"
      },
      {
       "id": "s-subjective-metrics-4-3",
       "original": "We tell the testers to focus on one corresponding aspect and ignore the other aspect when scoring.",
       "zh": "我们要求测试者在打分时只关注对应的维度并忽略其他维度。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-4-2",
   "num": "4.2",
   "level": 2,
   "page": 6,
   "title": {
    "original": "Results of Zero-Shot Speech Synthesis Evaluation Baselines.",
    "zh": "4.2 零样本语音合成评测结果：基线"
   },
   "blocks": [
    {
     "id": "p-4-2-1",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-4-2-1-1",
       "original": "We compare the zero-shot speech synthesis performance of MegaTTS 3 with 11 strong baselines, including: 1) VALL-E 2 (Chen et al., 2024a); 2) VoiceBox (Matthew et al., 2023); 3) DiTTo-TTS (Lee et al., 2024a); 4) NaturalSpeech 3 (Ju et al., 2024); 5) CosyVoice (Du et al., 2024); 6) MaskGCT (Wang et al., 2024); 7) F5- TTS (Chen et al., 2024b); 8) E2 TTS (Eskimez et al., 2024).",
       "zh": "我们把 MegaTTS 3 的零样本语音合成性能与 11 个强基线进行比较，包括：1）VALL-E 2（Chen et al., 2024a）；2）VoiceBox（Matthew et al., 2023）；3）DiTTo-TTS（Lee et al., 2024a）；4）NaturalSpeech 3（Ju et al., 2024）；5）CosyVoice（Du et al., 2024）；6）MaskGCT（Wang et al., 2024）；7）F5-TTS（Chen et al., 2024b）；8）E2 TTS（Eskimez et al., 2024）。"
      },
      {
       "id": "s-4-2-1-2",
       "original": "Explanation and details of the selected baseline systems are provided in Appendix A.4.",
       "zh": "所选基线系统的说明与细节见 Appendix A.4。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-analysis",
   "num": null,
   "level": 2,
   "page": 6,
   "title": {
    "original": "Analysis",
    "zh": "分析"
   },
   "blocks": [
    {
     "id": "p-analysis-1",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-analysis-1-1",
       "original": "As shown in Table 1, we can see that 1) MegaTTS 3 achieves state-of-the-art SIM-O, SMOS, and WER scores, comparable to NaturalSpeech 3 (the counterpart with forced alignment), and significantly surpasses other baselines without explicit alignments.",
       "zh": "如 Table 1 所示，可以看到：1）MegaTTS 3 取得了最先进的 SIM-O、SMOS 和 WER 分数，与 NaturalSpeech 3（采用强制对齐的对照系统）相当，并显著超越其他不做显式对齐的基线。"
      },
      {
       "id": "s-analysis-1-2",
       "original": "The improved SIM-O and SMOS suggest that the proposed sparse alignment effectively simplifies the text-to-speech mapping challenge like predefined forced duration information, allowing the model to focus more on learning timbre information.",
       "zh": "SIM-O 和 SMOS 的提升表明，所提的稀疏对齐像预定义的强制时长信息一样，有效简化了文本到语音的映射难题，使模型能把更多精力放在学习音色信息上。"
      },
      {
       "id": "s-analysis-1-3",
       "original": "And the improved WER indicates that MegaTTS 3 also enjoys strong robustness; 2) MegaTTS 3 significantly surpasses all baselines in terms of CMOS, demonstrating the effectiveness of the proposed sparse alignment strategy; 3) After the PeRFlow acceleration, the student model of MegaTTS 3 shows on par quality with the teacher model and enjoys fast inference speed.",
       "zh": "而 WER 的提升表明 MegaTTS 3 同时具备较强的鲁棒性；2）MegaTTS 3 在 CMOS 上显著超越所有基线，证明了所提稀疏对齐策略的有效性；3）经 PeRFlow 加速后，MegaTTS 3 的学生模型展现出与教师模型相当的质量，并享有更快的推理速度。"
      },
      {
       "id": "s-analysis-1-4",
       "original": "We also conduct the experiments on the LibriSpeech-PC test-clean set provided by F5-TTS and the results are shown in Table 2, which also demonstrates that our method achieves state-of-theart performance in terms of speaker similarity and speech intelligibility.",
       "zh": "我们还在 F5-TTS 提供的 LibriSpeech-PC test-clean 集上做了实验，结果见 Table 2，同样表明我们的方法在说话人相似度和语音可懂度上达到了最先进的性能。"
      },
      {
       "id": "s-analysis-1-5",
       "original": "The duration controllability of MegaTTS 3 is verified in Appendix E.",
       "zh": "MegaTTS 3 的时长可控性在 Appendix E 中得到验证。"
      },
      {
       "id": "s-analysis-1-6",
       "original": "In the demo page, we also demonstrate that our method can maintain high naturalness even when the performance of the duration predictor is suboptimal (while MegaTTS 3 with forced alignment fails).",
       "zh": "在演示页面上，我们还展示了即使时长预测器的性能不理想，我们的方法也能保持高自然度（而采用强制对齐的 MegaTTS 3 则会失败）。"
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
    "original": "Experiments of Prosodic Naturalness",
    "zh": "4.3 韵律自然度实验"
   },
   "blocks": [
    {
     "id": "p-4-3-1",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-4-3-1-1",
       "original": "We also measure the objective metrics MCD, SSIM, STOI, GPE, VDE, and FFE following InstructTTS (Yang et al., 2024c) to evaluate the prosodic naturalness of our method.",
       "zh": "我们还按 InstructTTS (Yang et al., 2024c) 测量 MCD、SSIM、STOI、GPE、VDE、FFE 等客观指标，以评估方法的韵律自然度。"
      },
      {
       "id": "s-4-3-1-2",
       "original": "The results are presented in Table 4.",
       "zh": "结果见表 4。"
      },
      {
       "id": "s-4-3-1-3",
       "original": "Specifically, our method with sparse alignment (Ours w/ S.A.) achieves the best performance across all metrics, with an MCD of 4.42, GPE of 0.31, VDE of 0.29, and FFE of 0.34.",
       "zh": "具体而言，带稀疏对齐的方法（Ours w/ S.A.）在所有指标上最佳：MCD 4.42、GPE 0.31、VDE 0.29、FFE 0.34。"
      },
      {
       "id": "s-4-3-1-4",
       "original": "These results indicate a significant improvement in prosodic naturalness compared to the baseModel MCD (dB) ↓",
       "zh": "这些结果表明相对基（表头：Model / MCD (dB) ↓，后续照原文）有显著的韵律自然度提升。"
      }
     ]
    },
    {
     "id": "eq-4-3-1",
     "type": "equation",
     "page": 6,
     "original": "σ ↑ γ ↓ κ ↓"
    },
    {
     "id": "eq-4-3-2",
     "type": "equation",
     "page": 6,
     "original": "ASMOS ↑ CMOS ↑ SMOS ↑ GT"
    },
    {
     "id": "eq-4-3-3",
     "type": "equation",
     "page": 6,
     "original": "- 45.1 0.591 0.783 4.03 +0.09 3.95"
    },
    {
     "id": "eq-4-3-4",
     "type": "equation",
     "page": 6,
     "original": "CTA-TTS"
    },
    {
     "id": "eq-4-3-5",
     "type": "equation",
     "page": 6,
     "original": "5.98 41.1 0.602 0.799 3.72 -0.60 3.64"
    },
    {
     "id": "eq-4-3-6",
     "type": "equation",
     "page": 6,
     "original": "MegaTTS 3"
    },
    {
     "id": "eq-4-3-7",
     "type": "equation",
     "page": 6,
     "original": "5.69 42.3 0.601 0.790 3.84 +0.00 3.89"
    },
    {
     "id": "tab-4-3-1",
     "type": "table_caption",
     "page": 7,
     "original": "Table 3: The objective and subjective experimental results for accented TTS. MCD (dB) denotes the Mel Cepstral Distortion at the dB level. σ, γ, and κ are the standard deviation, skewness, and kurtosis of the pitch distribution.",
     "zh": "表 3：口音 TTS 的客观与主观实验结果。MCD (dB) 表示 dB 级的 Mel 倒谱失真。σ、γ 和 κ 分别为音高分布的标准差、偏度和峰度。"
    },
    {
     "id": "p-4-3-2",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-4-3-2-1",
       "original": "Method MCD↓ GPE↓ VDE↓ FFE↓ NaturalSpeech 3",
       "zh": "（本句为 Table 4 表头及首行残块：）Method、MCD↓、GPE↓、VDE↓、FFE↓；NaturalSpeech 3：4.45、0.44、0.33、0.37；Ours w/ F.A.（接下行）。"
      }
     ]
    },
    {
     "id": "eq-4-3-8",
     "type": "equation",
     "page": 7,
     "original": "4.45 0.44 0.33 0.37"
    },
    {
     "id": "p-4-3-3",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-4-3-3-1",
       "original": "Ours w/ F.A.",
       "zh": "（本句为 Table 4 表头及首行残块：）Method、MCD↓、GPE↓、VDE↓、FFE↓；NaturalSpeech 3：4.45、0.44、0.33、0.37；Ours w/ F.A.（接下行）。"
      }
     ]
    },
    {
     "id": "eq-4-3-9",
     "type": "equation",
     "page": 7,
     "original": "4.48 0.44 0.35 0.40"
    },
    {
     "id": "p-4-3-4",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-4-3-4-1",
       "original": "Ours w/ S.A.",
       "zh": "（本句为 Table 4 数据行残块：）Ours w/ F.A.：4.48、0.44、0.35、0.40；Ours w/ S.A.（接下行）。"
      }
     ]
    },
    {
     "id": "eq-4-3-10",
     "type": "equation",
     "page": 7,
     "original": "4.42 0.31 0.29 0.34"
    },
    {
     "id": "tab-4-3-2",
     "type": "table_caption",
     "page": 7,
     "original": "Table 4: Comparisons about prosodic naturalness metrics on LibriSpeech test-clean set. “F.A.” denotes forced alignment and “S.A.” denotes sparse alignment.",
     "zh": "表 4：LibriSpeech test-clean 集上韵律自然度指标的对比。「F.A.」表示强制对齐，「S.A.」表示稀疏对齐。"
    },
    {
     "id": "p-4-3-5",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-4-3-5-1",
       "original": "line NaturalSpeech 3 and our method with forced alignment (Ours w/ F.A.), further validating the effectiveness of our sparse alignment strategy.",
       "zh": "即与 NaturalSpeech 3 以及我们采用强制对齐的方法（Ours w/ F.A.）相比均有提升，进一步验证了稀疏对齐策略的有效性。"
      },
      {
       "id": "s-4-3-5-2",
       "original": "Our method provides a noval and effective solution for speech synthesis applications that require high robustness and exceptional expressiveness, such as audiobook narration and virtual assistants.",
       "zh": "我们的方法为需要高鲁棒性和出色表现力的语音合成应用（如有声书旁白和虚拟助手）提供了一种新颖而有效的解决方案。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-4-4",
   "num": "4.4",
   "level": 2,
   "page": 7,
   "title": {
    "original": "Results of Accented TTS",
    "zh": "4.4 口音 TTS 结果"
   },
   "blocks": [
    {
     "id": "p-4-4-1",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-4-4-1-1",
       "original": "In this subsection, we evaluate the accented TTS performance of our model on the L2-ARCTIC dataset (Zhao et al., 2018).",
       "zh": "在本小节中，我们在 L2-ARCTIC 数据集（Zhao et al., 2018）上评测模型的口音 TTS 性能。"
      },
      {
       "id": "s-4-4-1-2",
       "original": "This corpus includes recordings from non-native speakers of English whose first languages are Hindi, Korean, etc. In this experiment, we focus on verifying whether our model and baseline can synthesize natural speech with different accent types (standard English or English with specific accents) while maintaining consistent vocal timbre.",
       "zh": "该语料库收录了母语为印地语、韩语等的非英语母语说话人的录音。本实验重点验证：在保持音色一致的前提下，我们的模型和基线能否合成不同口音类型（标准英语或带特定口音的英语）的自然语音。"
      },
      {
       "id": "s-4-4-1-3",
       "original": "We compare our MegaTTS 3 model with CTA-TTS (Liu et al., 2024a).",
       "zh": "我们把 MegaTTS 3 模型与 CTA-TTS（Liu et al., 2024a）进行比较。"
      },
      {
       "id": "s-4-4-1-4",
       "original": "More details of the baseline model are provided in Appendix A.5. 1) First, we evaluate whether the models can synthesize high-quality speeches with accents.",
       "zh": "基线模型的更多细节见 Appendix A.5。1）首先，我们评测模型能否合成带口音的高质量语音。"
      },
      {
       "id": "s-4-4-1-5",
       "original": "As shown in Table 3, our MegaTTS 3 model significantly outperforms the CTA-TTS baseline in terms of the subjective accent similarity MOS core, the MCD (dB) values, and the statistical moments (σ, γ, and κ) of pitch distributions.",
       "zh": "如 Table 3 所示，我们的 MegaTTS 3 模型在主观口音相似度 MOS 得分、MCD (dB) 数值及音高分布的各阶矩（σ、γ 和 κ）上均显著优于 CTA-TTS 基线。"
      },
      {
       "id": "s-4-4-1-6",
       "original": "These results demonstrate the superior accent learning capability of MegaTTS 3 compared to the baseline system.",
       "zh": "这些结果表明，与基线系统相比，MegaTTS 3 具有更强的口音学习能力。"
      },
      {
       "id": "s-4-4-1-7",
       "original": "Besides, the MegaTTS 3 model achieves higher CMOS and SMOS scores compared to CTA-TTS, indicating a significant improvement in speech quality and speaker similarity; 2) Secondly, we evaluate whether the models can accurately control standard accented standard accented",
       "zh": "此外 MegaTTS 3 的 CMOS 与 SMOS 均高于 CTA-TTS，说明语音质量与说话人相似度显著提升；2）其次评估模型能否精确控制「标准口音」（standard accented）。（图：standard accented 0.83/0.19/0.96/0.07/0.17/0.81/0.04/0.93，(a) CTA-TTS 与 (b) S-DiT 对比。）"
      }
     ]
    },
    {
     "id": "eq-4-4-1",
     "type": "equation",
     "page": 7,
     "original": "0.83 0.19 0.96 0.07 0.17 0.81 0.04 0.93"
    },
    {
     "id": "p-4-4-2",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-4-4-2-1",
       "original": "standard accented standard accented (a) CTA-TTS (b) S-DiT",
       "zh": "此外 MegaTTS 3 的 CMOS 与 SMOS 均高于 CTA-TTS，说明语音质量与说话人相似度显著提升；2）其次评估模型能否精确控制「标准口音」（standard accented）。（图：standard accented 0.83/0.19/0.96/0.07/0.17/0.81/0.04/0.93，(a) CTA-TTS 与 (b) S-DiT 对比。）"
      }
     ]
    },
    {
     "id": "fig-4-4-1",
     "type": "figure_caption",
     "page": 7,
     "original": "Figure 2: The confusion matrices between the perceived and intended accent categories of synthesized speech. The X-axis and Y-axis represent the intended and perceived categories, respectively.",
     "zh": "图 2：合成语音的感知口音类别与预期口音类别之间的混淆矩阵。X 轴与 Y 轴分别表示预期类别与感知类别。"
    },
    {
     "id": "p-4-4-3",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-4-4-3-1",
       "original": "the accent types of the generated speeches.",
       "zh": "生成语音的口音类型。"
      },
      {
       "id": "s-4-4-3-2",
       "original": "We follow CTA-TTS to conduct the intensity classification experiment (Liu et al., 2024a).",
       "zh": "我们遵循 CTA-TTS 的做法开展口音强度分类实验（Liu et al., 2024a）。"
      },
      {
       "id": "s-4-4-3-3",
       "original": "At run-time, we generate speeches with two accent types, and the listeners are instructed to classify the perceived accent categories, including “standard” and “accented”.",
       "zh": "在运行时，我们生成两种口音类型的语音，并指示听众对感知到的口音类别进行分类，包括「标准」和「带口音」。"
      },
      {
       "id": "s-4-4-3-4",
       "original": "Figure 2 shows that our MegaTTS 3 significantly surpasses CTA-TTS in terms of accent controllability.",
       "zh": "Figure 2 显示，我们的 MegaTTS 3 在口音可控性上显著超越 CTA-TTS。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-4-5",
   "num": "4.5",
   "level": 2,
   "page": 7,
   "title": {
    "original": "Evaluation of WaveVAE",
    "zh": "4.5 WaveVAE 评测"
   },
   "blocks": [
    {
     "id": "p-4-5-1",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-4-5-1-1",
       "original": "First, we evaluate the reconstruction quality of the WaveVAE model, with results presented in Table 5.",
       "zh": "首先，我们评测 WaveVAE 模型的重建质量，结果见 Table 5。"
      },
      {
       "id": "s-4-5-1-2",
       "original": "We report the objective metrics, including Perceptual Evaluation of Speech Quality (PESQ), Virtual Speech Quality Objective Listener (ViSQOL), and Mel-Cepstral Distortion (MCD).",
       "zh": "我们报告了客观指标，包括语音质量感知评估（PESQ）、虚拟语音质量客观听众（ViSQOL）和 Mel 倒谱失真（MCD）。"
      },
      {
       "id": "s-4-5-1-3",
       "original": "We select the following codec models as baselines: 1) EnCodec (Dé- fossez et al., 2022), a representative and pioneering work in the field of speech codec; 2) DAC (Kumar et al., 2024), a high-bitrate audio codec model with high reconstruction quality; 3) WavTokenizer (Ji et al., 2024), a low-bitrate speech codec model that focuses more on perceptual reconstruction quality; 4) X-codec2 (Ye et al., 2025), a low-bitrate speech codec model, leveraging the representations of a pre-trained model to further enhance overall quality.",
       "zh": "我们选取以下 codec 模型作为基线：1）EnCodec（Défossez et al., 2022），语音 codec 领域具有代表性的开创性工作；2）DAC（Kumar et al., 2024），重建质量很高的高码率音频 codec 模型；3）WavTokenizer（Ji et al., 2024），更注重感知重建质量的低码率语音 codec 模型；4）X-codec2（Ye et al., 2025），利用预训练模型表征进一步提升整体质量的低码率语音 codec 模型。"
      },
      {
       "id": "s-4-5-1-4",
       "original": "The results demonstrates that, despite applying higher compression rate, our solution achieves superior performance on various reconstruction metrics, such as MCD and ViSQOL.",
       "zh": "结果表明，尽管我们的方案采用了更高的压缩率，它在 MCD、ViSQOL 等多项重建指标上仍取得了更优的性能。"
      }
     ]
    },
    {
     "id": "p-4-5-2",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-4-5-2-1",
       "original": "Models Tokens/s Latent Layer Type PESQ↑ STOI↑ ViSQOL↑ MCD↓ UTMOS↑ Encodec",
       "zh": "表头：Models / Tokens/s / Latent Layer Type / PESQ↑ / STOI↑ / ViSQOL↑ / MCD↓ / UTMOS↑——Encodec（后续照原文）。"
      }
     ]
    },
    {
     "id": "eq-4-5-1",
     "type": "equation",
     "page": 8,
     "original": "600 8"
    },
    {
     "id": "eq-4-5-2",
     "type": "equation",
     "page": 8,
     "original": "Discrete"
    },
    {
     "id": "eq-4-5-3",
     "type": "equation",
     "page": 8,
     "original": "3.16 0.94 4.31 1.63 3.07"
    },
    {
     "id": "eq-4-5-4",
     "type": "equation",
     "page": 8,
     "original": "DAC"
    },
    {
     "id": "eq-4-5-5",
     "type": "equation",
     "page": 8,
     "original": "450 9"
    },
    {
     "id": "eq-4-5-6",
     "type": "equation",
     "page": 8,
     "original": "Discrete"
    },
    {
     "id": "eq-4-5-7",
     "type": "equation",
     "page": 8,
     "original": "4.13 0.97 4.68 1.05 4.01"
    },
    {
     "id": "eq-4-5-8",
     "type": "equation",
     "page": 8,
     "original": "WavTokenizer"
    },
    {
     "id": "eq-4-5-9",
     "type": "equation",
     "page": 8,
     "original": "75 1"
    },
    {
     "id": "eq-4-5-10",
     "type": "equation",
     "page": 8,
     "original": "Discrete"
    },
    {
     "id": "eq-4-5-11",
     "type": "equation",
     "page": 8,
     "original": "2.55 0.88 3.83 1.99 4.07"
    },
    {
     "id": "eq-4-5-12",
     "type": "equation",
     "page": 8,
     "original": "X-codec2"
    },
    {
     "id": "eq-4-5-13",
     "type": "equation",
     "page": 8,
     "original": "50 1"
    },
    {
     "id": "eq-4-5-14",
     "type": "equation",
     "page": 8,
     "original": "Discrete"
    },
    {
     "id": "eq-4-5-15",
     "type": "equation",
     "page": 8,
     "original": "3.03 0.91 4.12 1.72 4.13"
    },
    {
     "id": "eq-4-5-16",
     "type": "equation",
     "page": 8,
     "original": "WaveVAE"
    },
    {
     "id": "eq-4-5-17",
     "type": "equation",
     "page": 8,
     "original": "25 1"
    },
    {
     "id": "eq-4-5-18",
     "type": "equation",
     "page": 8,
     "original": "Continuous"
    },
    {
     "id": "eq-4-5-19",
     "type": "equation",
     "page": 8,
     "original": "3.84 0.96 4.71 1.03 4.10"
    },
    {
     "id": "tab-4-5-1",
     "type": "table_caption",
     "page": 8,
     "original": "Table 5: Comparison of the reconstruction quality. The sampling rate are set to 16 kHz. Bold and Underline values indicate the best and second best results. “Tokens/s” means how many tokens a one-second speech will be compressed into.",
     "zh": "表 5：重建质量对比。采样率均设为 16 kHz。加粗与下划线数值分别表示最优与次优结果。「Tokens/s」表示 1 秒语音被压缩为多少个 token。"
    },
    {
     "id": "p-4-5-3",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-4-5-3-1",
       "original": "Setting SIM-O↑ WER↓ Ours",
       "zh": "（表格行：Setting × SIM-O↑ × WER↓——Ours 0.71/1.82%；w/ Encodec 0.56/2.24%；w/ DAC 0.64/1.93%。）"
      }
     ]
    },
    {
     "id": "eq-4-5-20",
     "type": "equation",
     "page": 8,
     "original": "0.71 1.82%"
    },
    {
     "id": "eq-4-5-21",
     "type": "equation",
     "page": 8,
     "original": "w/ Encodec"
    },
    {
     "id": "eq-4-5-22",
     "type": "equation",
     "page": 8,
     "original": "0.56 2.24%"
    },
    {
     "id": "eq-4-5-23",
     "type": "equation",
     "page": 8,
     "original": "w/ DAC"
    },
    {
     "id": "eq-4-5-24",
     "type": "equation",
     "page": 8,
     "original": "0.64 1.93%"
    },
    {
     "id": "tab-4-5-2",
     "type": "table_caption",
     "page": 8,
     "original": "Table 6: Comparison of zero-shot TTS performance of MegaTTS 3 using different speech compression models on the LibriSpeech test-clean set.",
     "zh": "表 6：MegaTTS 3 使用不同语音压缩模型时在 LibriSpeech test-clean 集上的零样本 TTS 性能对比。"
    },
    {
     "id": "p-4-5-4",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-4-5-4-1",
       "original": "Setting SIM-O↑ WER↓ CMOS↑ SMOS↑ Ours",
       "zh": "（表格行：Setting × SIM-O↑ × WER↓ × CMOS↑ × SMOS↑——Ours 0.71/1.82%/0.00/3.94；w/ F.A.（后续照原文）。）"
      }
     ]
    },
    {
     "id": "eq-4-5-25",
     "type": "equation",
     "page": 8,
     "original": "0.71 1.82% 0.00 3.94"
    },
    {
     "id": "p-4-5-5",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-4-5-5-1",
       "original": "w/ F.A.",
       "zh": "（本句为 Table 4 表头及首行残块：）Method、MCD↓、GPE↓、VDE↓、FFE↓；NaturalSpeech 3：4.45、0.44、0.33、0.37；Ours w/ F.A.（接下行）。"
      }
     ]
    },
    {
     "id": "eq-4-5-26",
     "type": "equation",
     "page": 8,
     "original": "0.70 1.80% -0.17 3.94"
    },
    {
     "id": "p-4-5-6",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-4-5-6-1",
       "original": "w/o A.",
       "zh": "（表格行）0.70/1.80%/-0.17/3.94；w/o A.（后续照原文）。"
      }
     ]
    },
    {
     "id": "eq-4-5-27",
     "type": "equation",
     "page": 8,
     "original": "0.67 2.14% -0.12 3.88"
    },
    {
     "id": "eq-4-5-28",
     "type": "equation",
     "page": 8,
     "original": "w/ CFG"
    },
    {
     "id": "eq-4-5-29",
     "type": "equation",
     "page": 8,
     "original": "0.68 1.79% -0.02 3.89"
    },
    {
     "id": "eq-4-5-30",
     "type": "equation",
     "page": 8,
     "original": "w/o CFG"
    },
    {
     "id": "eq-4-5-31",
     "type": "equation",
     "page": 8,
     "original": "0.43 6.85% -0.56 3.35"
    },
    {
     "id": "tab-4-5-3",
     "type": "table_caption",
     "page": 8,
     "original": "Table 7: Ablation studies of alignment strategies and CFG mechanisms on the LibriSpeech test-clean set.",
     "zh": "表 7：LibriSpeech test-clean 集上对齐策略与 CFG 机制的消融研究。"
    },
    {
     "id": "p-4-5-7",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-4-5-7-1",
       "original": "Second, to demonstrate the impact of different speech compression models on the overall performance of the TTS system, we extracted the latents from Encodec and DAC, respectively, for training our MegaTTS 3 model.",
       "zh": "其次，为了展示不同语音压缩模型对 TTS 系统整体性能的影响，我们分别用 Encodec 和 DAC 提取的潜在表征来训练我们的 MegaTTS 3 模型。"
      },
      {
       "id": "s-4-5-7-2",
       "original": "We report the experimental results in Table 6.",
       "zh": "实验结果见 Table 6。"
      },
      {
       "id": "s-4-5-7-3",
       "original": "It can be seen that our method outperforms “w/ DAC” and “w/ Encodec”, due to the fact that the latent space of our speech compression model is more compact (only 25 tokens per second).",
       "zh": "可以看到，我们的方法优于「w/ DAC」和「w/ Encodec」，原因是我们的语音压缩模型的潜在空间更紧凑（每秒仅 25 个 token）。"
      },
      {
       "id": "s-4-5-7-4",
       "original": "The results demonstrate the importance of our WaveVAE, a high-compression, high-reconstruction-quality speech codec model, for TTS systems.",
       "zh": "这些结果证明了我们的 WaveVAE——一个高压缩率、高重建质量的语音 codec 模型——对 TTS 系统的重要性。"
      },
      {
       "id": "s-4-5-7-5",
       "original": "This conclusion is also verified by a previous work (Lee et al., 2024a), which shows compact target latents facilitate learning in diffusion models.",
       "zh": "此前一项工作（Lee et al., 2024a）也验证了这一结论：紧凑的目标潜在表征有助于扩散模型的学习。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-4-6",
   "num": "4.6",
   "level": 2,
   "page": 8,
   "title": {
    "original": "Ablation Studies",
    "zh": "4.6 消融研究"
   },
   "blocks": [
    {
     "id": "p-4-6-1",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-4-6-1-1",
       "original": "We test the following four settings: 1) w/ FA, which replaces the sparse alignment in MegaTTS 3 with forced alignment used in (Matthew et al., 2023; Shen et al., 2023); 2) w/o A., we do not use the predefined alignments and modeling the duration information implicitly; 3) w/ CFG, we use the standard CFG following the common practice in Diffusionbased TTS; 4) w/o CFG, we do not use the CFG mechanism.",
       "zh": "我们测试以下四种设置：1）w/ FA：把 MegaTTS 3 中的稀疏对齐替换为（Matthew et al., 2023; Shen et al., 2023）所用的强制对齐；2）w/o A.：不使用预定义对齐，隐式建模时长信息；3）w/ CFG：遵循基于扩散的 TTS 的常见做法使用标准 CFG；4）w/o CFG：不使用 CFG 机制。"
      },
      {
       "id": "s-4-6-1-2",
       "original": "All tests follow the experimental setup described in Section 4.2.",
       "zh": "所有测试均遵循 Section 4.2 描述的实验设置。"
      },
      {
       "id": "s-4-6-1-3",
       "original": "The results are shown in Table 7.",
       "zh": "结果见 Table 7。"
      },
      {
       "id": "s-4-6-1-4",
       "original": "For settings 1) and 2), it can be observed that both forced alignment and sparse alignment can enhance the performance of speech synthesis models.",
       "zh": "对设置 1）和 2），可以观察到强制对齐和稀疏对齐都能增强语音合成模型的性能。"
      },
      {
       "id": "s-4-6-1-5",
       "original": "However, compared to forced alignment, sparse alignment does not constrain the model’s search space, leading to a prosodic naturalness (see Section 4.3).",
       "zh": "然而，与强制对齐相比，稀疏对齐不约束模型的搜索空间，从而带来更好的韵律自然度（见 Section 4.3）。"
      },
      {
       "id": "s-4-6-1-6",
       "original": "Therefore, the sparse alignment strategy achieves +0.17 CMOS compared to the forced alignment strategy.",
       "zh": "因此，稀疏对齐策略相比强制对齐策略取得了 +0.17 的 CMOS 提升。"
      },
      {
       "id": "s-4-6-1-7",
       "original": "For setting 3), compared with the standard CFG, our multi-condition CFG performs slightly better as it allows for flexible control over the weights between the text prompt and the speaker prompt.",
       "zh": "对设置 3），与标准 CFG 相比，我们的多条件 CFG 表现略好，因为它允许灵活控制文本提示与说话人提示之间的权重。"
      },
      {
       "id": "s-4-6-1-8",
       "original": "Setting 4) proves that the CFG mechanism is crucial for MegaTTS 3.",
       "zh": "设置 4）证明 CFG 机制对 MegaTTS 3 至关重要。"
      },
      {
       "id": "s-4-6-1-9",
       "original": "Additionally, we visualize the attention score matrices from different transformer layers in MegaTTS 3 in Appendix F, leading to some interesting observations.",
       "zh": "此外，我们在 Appendix F 中可视化了 MegaTTS 3 不同 Transformer 层的注意力分数矩阵，并得到了一些有趣的观察。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-5",
   "num": "5",
   "level": 1,
   "page": 8,
   "title": {
    "original": "Conclusions",
    "zh": "5 结论"
   },
   "blocks": [
    {
     "id": "p-5-1",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-5-1-1",
       "original": "In this paper, we introduce MegaTTS 3, a zero-shot TTS framework that leverages novel sparse alignment boundaries to ease the difficulty of alignment learning while retaining the naturalness of the generated speeches.",
       "zh": "本文提出 MegaTTS 3，一个零样本 TTS 框架，它利用新颖的稀疏对齐边界降低对齐学习的难度，同时保持生成语音的自然度。"
      },
      {
       "id": "s-5-1-2",
       "original": "This strategy allows MegaTTS 3 to combine the strengths of methods with both implicit alignments and predefined hard alignments.",
       "zh": "这一策略使 MegaTTS 3 能够结合隐式对齐方法与预定义硬对齐方法两者的优点。"
      },
      {
       "id": "s-5-1-3",
       "original": "Additionally, we employ the PeRFlow technique to further accelerate the generation process and design a multi-condition CFG strategy to offer more flexible control over accents.",
       "zh": "此外，我们采用 PeRFlow 技术进一步加速生成过程，并设计了多条件 CFG 策略，以提供更灵活的口音控制。"
      },
      {
       "id": "s-5-1-4",
       "original": "Experimental results show that MegaTTS 3 achieves state-of-the-art zero-shot TTS speech quality while maintaining a more efficient pipeline.",
       "zh": "实验结果表明，MegaTTS 3 在保持更高效流程的同时，取得了最先进的零样本 TTS 语音质量。"
      },
      {
       "id": "s-5-1-5",
       "original": "Moreover, the sparse alignment strategy also shows enhanced prosodic naturalness and higher robustness against a suboptimal duration predictor.",
       "zh": "此外，稀疏对齐策略还展现出更强的韵律自然度，以及面对不理想时长预测器时更高的鲁棒性。"
      },
      {
       "id": "s-5-1-6",
       "original": "Due to space constraints, further discussions are provided in the appendix.",
       "zh": "受篇幅所限，更多讨论见附录。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-limitations",
   "num": null,
   "level": 2,
   "page": 9,
   "title": {
    "original": "Limitations",
    "zh": "局限性"
   },
   "blocks": [
    {
     "id": "p-limitations-1",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-limitations-1-1",
       "original": "In this section, we discuss the limitations of the proposed method and outline potential strategies for addressing them in future research.",
       "zh": "在本节中，我们讨论所提方法的局限性，并给出未来研究中解决这些问题的潜在策略。"
      }
     ]
    },
    {
     "id": "p-limitations-2",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-limitations-2-1",
       "original": "• Language Coverage.",
       "zh": "• 语言覆盖。"
      },
      {
       "id": "s-limitations-2-2",
       "original": "Although our model currently supports both English and Chinese, there are far more languages in the world.",
       "zh": "尽管我们的模型目前同时支持英语和中文，世界上的语言远不止这些。"
      },
      {
       "id": "s-limitations-2-3",
       "original": "We plan to incorporate additional training data from a wider range of languages and apply adaptation-based techniques, such as LoRA tuning (Hu et al., 2021), to enhance speech quality for low-resource languages.",
       "zh": "我们计划纳入更多语种的训练数据，并采用基于适配的技术（如 LoRA 微调（Hu et al., 2021））来提升低资源语言的语音质量。"
      }
     ]
    },
    {
     "id": "p-limitations-3",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-limitations-3-1",
       "original": "• Function Coverage.",
       "zh": "• 功能覆盖。"
      },
      {
       "id": "s-limitations-3-2",
       "original": "We can make MegaTTS 3 more user-friendly by enabling it to generate speech in various styles according to text descriptions through instruction-based finetuning.",
       "zh": "通过基于指令的微调，让 MegaTTS 3 能根据文本描述生成各种风格的语音，可以使它更易用。"
      },
      {
       "id": "s-limitations-3-3",
       "original": "We can further fine-tune MegaTTS 3 on the paralinguistic corpus, allowing it to generate speech that is closer to a natural human style.",
       "zh": "我们还可以在副语言语料上进一步微调 MegaTTS 3，使其生成更接近自然人风格的语音。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-references",
   "num": null,
   "level": 1,
   "page": 9,
   "title": {
    "original": "References",
    "zh": "References"
   },
   "blocks": [
    {
     "id": "p-references-1",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-references-1-1",
       "original": "Philip Anastassiou, Jiawei Chen, Jitong Chen, Yuanzhe Chen, Zhuo Chen, Ziyi Chen, Jian Cong, Lelai Deng, Chuang Ding, Lu Gao, et al. 2024."
      },
      {
       "id": "s-references-1-2",
       "original": "Seed-tts: A family of high-quality versatile speech generation models."
      }
     ]
    },
    {
     "id": "p-references-2",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-references-2-1",
       "original": "arXiv preprint arXiv:2406.02430."
      }
     ]
    },
    {
     "id": "p-references-3",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-references-3-1",
       "original": "Bistra Andreeva, Gra˙zyna Demenko, Bernd Möbius, Frank Zimmerer, Jeanin Jügler, and Magdalena Oleskowicz-Popiel. 2014."
      },
      {
       "id": "s-references-3-2",
       "original": "Differences of pitch profiles in germanic and slavic languages."
      },
      {
       "id": "s-references-3-3",
       "original": "In Fifteenth Annual Conference of the International Speech Communication Association."
      }
     ]
    },
    {
     "id": "p-references-4",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-references-4-1",
       "original": "Rosana Ardila, Megan Branson, Kelly Davis, Michael Henretty, Michael Kohler, Josh Meyer, Reuben Morais, Lindsay Saunders, Francis M Tyers, and Gregor Weber. 2019."
      },
      {
       "id": "s-references-4-2",
       "original": "Common voice: A massivelymultilingual speech corpus."
      }
     ]
    },
    {
     "id": "p-references-5",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-references-5-1",
       "original": "arXiv preprint arXiv:1912.06670."
      }
     ]
    },
    {
     "id": "p-references-6",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-references-6-1",
       "original": "Rohan Badlani, Rafael Valle, Kevin J Shih, Joao Felipe Santos, Siddharth Gururani, and Bryan Catanzaro."
      }
     ]
    },
    {
     "id": "p-references-7",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-references-7-1",
       "original": "2023."
      },
      {
       "id": "s-references-7-2",
       "original": "Multilingual multiaccented multispeaker tts with radtts. arXiv preprint arXiv:2301.10335."
      }
     ]
    },
    {
     "id": "p-references-8",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-references-8-1",
       "original": "Guillermo Cámbara, Patrick Lumban Tobing, Mikolaj Babianski, Ravichander Vipperla, Duo Wang Ron Shmelkin, Giuseppe Coccia, Orazio Angelini, Arnaud Joly, Mateusz Lajszczak, and Vincent Pollet."
      }
     ]
    },
    {
     "id": "p-references-9",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-references-9-1",
       "original": "2024."
      },
      {
       "id": "s-references-9-2",
       "original": "Mapache: Masked parallel transformer for advanced speech editing and synthesis."
      },
      {
       "id": "s-references-9-3",
       "original": "In ICASSP 2024-2024 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP), pages 10691–10695."
      },
      {
       "id": "s-references-9-4",
       "original": "IEEE."
      }
     ]
    },
    {
     "id": "p-references-10",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-references-10-1",
       "original": "Edresson Casanova, Julian Weber, Christopher D Shulby, Arnaldo Candido Junior, Eren Gölge, and Moacir A Ponti. 2022."
      },
      {
       "id": "s-references-10-2",
       "original": "Yourtts: Towards zero-shot multi-speaker tts and zero-shot voice conversion for everyone."
      },
      {
       "id": "s-references-10-3",
       "original": "In International Conference on Machine Learning, pages 2709–2720."
      },
      {
       "id": "s-references-10-4",
       "original": "PMLR."
      }
     ]
    },
    {
     "id": "p-references-11",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-references-11-1",
       "original": "Guoguo Chen, Shuzhou Chai, Guanbo Wang, Jiayu Du, Wei-Qiang Zhang, Chao Weng, Dan Su, Daniel Povey, Jan Trmal, Junbo Zhang, et al. 2021."
      },
      {
       "id": "s-references-11-2",
       "original": "Gigaspeech: An evolving, multi-domain asr corpus with 10,000 hours of transcribed audio. arXiv preprint arXiv:2106.06909."
      }
     ]
    },
    {
     "id": "p-references-12",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-references-12-1",
       "original": "Sanyuan Chen, Shujie Liu, Long Zhou, Yanqing Liu, Xu Tan, Jinyu Li, Sheng Zhao, Yao Qian, and Furu Wei. 2024a."
      },
      {
       "id": "s-references-12-2",
       "original": "Vall-e 2: Neural codec language models are human parity zero-shot text to speech synthesizers. arXiv preprint arXiv:2406.05370."
      }
     ]
    },
    {
     "id": "p-references-13",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-references-13-1",
       "original": "Yushen Chen, Zhikang Niu, Ziyang Ma, Keqi Deng, Chunhui Wang, Jian Zhao, Kai Yu, and Xie Chen."
      }
     ]
    },
    {
     "id": "p-references-14",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-references-14-1",
       "original": "2024b."
      }
     ]
    },
    {
     "id": "p-references-15",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-references-15-1",
       "original": "F5-tts: A fairytaler that fakes fluent and faithful speech with flow matching. arXiv preprint arXiv:2410.06885."
      }
     ]
    },
    {
     "id": "p-references-16",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-references-16-1",
       "original": "Alexandre Défossez, Jade Copet, Gabriel Synnaeve, and Yossi Adi. 2022."
      },
      {
       "id": "s-references-16-2",
       "original": "High fidelity neural audio compression. arXiv preprint arXiv:2210.13438."
      }
     ]
    },
    {
     "id": "p-references-17",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-references-17-1",
       "original": "Zhihao Du, Qian Chen, Shiliang Zhang, Kai Hu, Heng Lu, Yexin Yang, Hangrui Hu, Siqi Zheng, Yue Gu, Ziyang Ma, et al. 2024."
      },
      {
       "id": "s-references-17-2",
       "original": "Cosyvoice: A scalable multilingual zero-shot text-to-speech synthesizer based on supervised semantic tokens. arXiv preprint arXiv:2407.05407."
      }
     ]
    },
    {
     "id": "p-references-18",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-references-18-1",
       "original": "Abhimanyu Dubey, Abhinav Jauhri, Abhinav Pandey, Abhishek Kadian, Ahmad Al-Dahle, Aiesha Letman, Akhil Mathur, Alan Schelten, Amy Yang, Angela Fan, et al. 2024."
      },
      {
       "id": "s-references-18-2",
       "original": "The llama 3 herd of models. arXiv preprint arXiv:2407.21783."
      }
     ]
    },
    {
     "id": "p-references-19",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-references-19-1",
       "original": "Sefik Emre Eskimez, Xiaofei Wang, Manthan Thakker, Canrun Li, Chung-Hsien Tsai, Zhen Xiao, Hemin Yang, Zirun Zhu, Min Tang, Xu Tan, et al. 2024."
      }
     ]
    },
    {
     "id": "p-references-20",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-references-20-1",
       "original": "E2 tts: Embarrassingly easy fully non-autoregressive zero-shot tts. arXiv preprint arXiv:2406.18009."
      }
     ]
    },
    {
     "id": "p-references-21",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-references-21-1",
       "original": "Yuan Gao, Nobuyuki Morioka, Yu Zhang, and Nanxin Chen. 2023."
      },
      {
       "id": "s-references-21-2",
       "original": "E3 tts: Easy end-to-end diffusion-based text to speech."
      }
     ]
    },
    {
     "id": "p-references-22",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-references-22-1",
       "original": "In 2023 IEEE Automatic Speech Recognition and Understanding Workshop (ASRU), pages 1–8."
      },
      {
       "id": "s-references-22-2",
       "original": "IEEE."
      }
     ]
    },
    {
     "id": "p-references-23",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-references-23-1",
       "original": "Jonathan Ho and Tim Salimans. 2022."
      }
     ]
    },
    {
     "id": "p-references-24",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-references-24-1",
       "original": "Classifierfree diffusion guidance."
      }
     ]
    },
    {
     "id": "p-references-25",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-references-25-1",
       "original": "arXiv preprint arXiv:2207.12598."
      }
     ]
    },
    {
     "id": "p-references-26",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-26-1",
       "original": "Wei-Ning Hsu, Benjamin Bolte, Yao-Hung Hubert Tsai, Kushal Lakhotia, Ruslan Salakhutdinov, and Abdelrahman Mohamed. 2021."
      },
      {
       "id": "s-references-26-2",
       "original": "Hubert: Self-supervised speech representation learning by masked prediction of hidden units."
      },
      {
       "id": "s-references-26-3",
       "original": "IEEE/ACM Transactions on Audio, Speech, and Language Processing, 29:3451–3460."
      }
     ]
    },
    {
     "id": "p-references-27",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-27-1",
       "original": "Edward J Hu, Yelong Shen, Phillip Wallis, Zeyuan Allen-Zhu, Yuanzhi Li, Shean Wang, Lu Wang, and Weizhu Chen. 2021."
      }
     ]
    },
    {
     "id": "p-references-28",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-28-1",
       "original": "Lora: Low-rank adaptation of large language models."
      }
     ]
    },
    {
     "id": "p-references-29",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-29-1",
       "original": "arXiv preprint arXiv:2106.09685."
      }
     ]
    },
    {
     "id": "p-references-30",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-30-1",
       "original": "Sho Inoue, Shuai Wang, Wanxing Wang, Pengcheng Zhu, Mengxiao Bi, and Haizhou Li. 2024."
      },
      {
       "id": "s-references-30-2",
       "original": "Macst: Multi-accent speech synthesis via text transliteration for accent conversion."
      }
     ]
    },
    {
     "id": "p-references-31",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-31-1",
       "original": "arXiv preprint arXiv:2409.09352."
      }
     ]
    },
    {
     "id": "p-references-32",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-32-1",
       "original": "Won Jang, Dan Lim, Jaesam Yoon, Bongwan Kim, and Juntae Kim. 2021."
      },
      {
       "id": "s-references-32-2",
       "original": "Univnet: A neural vocoder with multi-resolution spectrogram discriminators for high-fidelity waveform generation. arXiv preprint arXiv:2106.07889."
      }
     ]
    },
    {
     "id": "p-references-33",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-33-1",
       "original": "Shengpeng Ji, Ziyue Jiang, Wen Wang, Yifu Chen, Minghui Fang, Jialong Zuo, Qian Yang, Xize Cheng, Zehan Wang, Ruiqi Li, et al. 2024."
      }
     ]
    },
    {
     "id": "p-references-34",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-34-1",
       "original": "Wavtokenizer: an efficient acoustic discrete codec tokenizer for audio language modeling. arXiv preprint arXiv:2408.16532."
      }
     ]
    },
    {
     "id": "p-references-35",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-35-1",
       "original": "Ye Jia, Yu Zhang, Ron Weiss, Quan Wang, Jonathan Shen, Fei Ren, Patrick Nguyen, Ruoming Pang, Ignacio Lopez Moreno, Yonghui Wu, et al. 2018."
      },
      {
       "id": "s-references-35-2",
       "original": "Transfer learning from speaker verification to multispeaker text-to-speech synthesis."
      },
      {
       "id": "s-references-35-3",
       "original": "Advances in neural information processing systems, 31."
      }
     ]
    },
    {
     "id": "p-references-36",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-36-1",
       "original": "Ziyue Jiang, Jinglin Liu, Yi Ren, Jinzheng He, Zhenhui Ye, Shengpeng Ji, Qian Yang, Chen Zhang, Pengfei Wei, Chunfeng Wang, et al. 2024."
      },
      {
       "id": "s-references-36-2",
       "original": "Mega-tts 2: Boosting prompting mechanisms for zero-shot speech synthesis."
      },
      {
       "id": "s-references-36-3",
       "original": "In The Twelfth International Conference on Learning Representations."
      }
     ]
    },
    {
     "id": "p-references-37",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-37-1",
       "original": "Zeqian Ju, Yuancheng Wang, Kai Shen, Xu Tan, Detai Xin, Dongchao Yang, Yanqing Liu, Yichong Leng, Kaitao Song, Siliang Tang, et al. 2024."
      }
     ]
    },
    {
     "id": "p-references-38",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-38-1",
       "original": "Naturalspeech 3: Zero-shot speech synthesis with factorized codec and diffusion models."
      }
     ]
    },
    {
     "id": "p-references-39",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-39-1",
       "original": "arXiv preprint arXiv:2403.03100."
      }
     ]
    },
    {
     "id": "p-references-40",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-40-1",
       "original": "Jacob Kahn, Morgane Rivière, Weiyi Zheng, Evgeny Kharitonov, Qiantong Xu, Pierre-Emmanuel Mazaré, Julien Karadayi, Vitaliy Liptchinsky, Ronan Collobert, Christian Fuegen, et al. 2020."
      },
      {
       "id": "s-references-40-2",
       "original": "Libri-light: A benchmark for asr with limited or no supervision."
      }
     ]
    },
    {
     "id": "p-references-41",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-41-1",
       "original": "In ICASSP 2020-2020 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP), pages 7669–7673."
      },
      {
       "id": "s-references-41-2",
       "original": "IEEE."
      }
     ]
    },
    {
     "id": "p-references-42",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-42-1",
       "original": "Heeseung Kim, Sungwon Kim, and Sungroh Yoon."
      }
     ]
    },
    {
     "id": "eq-references-1",
     "type": "equation",
     "page": 10,
     "original": "2022."
    },
    {
     "id": "p-references-43",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-43-1",
       "original": "Guided-tts: A diffusion model for text-tospeech via classifier guidance."
      },
      {
       "id": "s-references-43-2",
       "original": "In International Conference on Machine Learning, pages 11119–11133."
      },
      {
       "id": "s-references-43-3",
       "original": "PMLR."
      }
     ]
    },
    {
     "id": "p-references-44",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-44-1",
       "original": "Jaehyeon Kim, Sungwon Kim, Jungil Kong, and Sungroh Yoon. 2020."
      },
      {
       "id": "s-references-44-2",
       "original": "Glow-tts: A generative flow for text-to-speech via monotonic alignment search."
      },
      {
       "id": "s-references-44-3",
       "original": "Advances in Neural Information Processing Systems,"
      }
     ]
    },
    {
     "id": "eq-references-2",
     "type": "equation",
     "page": 10,
     "original": "33:8067–8077."
    },
    {
     "id": "p-references-45",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-45-1",
       "original": "Jaehyeon Kim, Jungil Kong, and Juhee Son. 2021."
      }
     ]
    },
    {
     "id": "p-references-46",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-46-1",
       "original": "Conditional variational autoencoder with adversarial learning for end-to-end text-to-speech."
      },
      {
       "id": "s-references-46-2",
       "original": "In International Conference on Machine Learning, pages 5530–5540."
      },
      {
       "id": "s-references-46-3",
       "original": "PMLR."
      }
     ]
    },
    {
     "id": "p-references-47",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-47-1",
       "original": "Jungil Kong, Jaehyeon Kim, and Jaekyoung Bae. 2020."
      }
     ]
    },
    {
     "id": "p-references-48",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-48-1",
       "original": "Hifi-gan: Generative adversarial networks for efficient and high fidelity speech synthesis."
      },
      {
       "id": "s-references-48-2",
       "original": "Advances in Neural Information Processing Systems, 33:17022–"
      }
     ]
    },
    {
     "id": "eq-references-3",
     "type": "equation",
     "page": 10,
     "original": "17033."
    },
    {
     "id": "p-references-49",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-49-1",
       "original": "Rithesh Kumar, Prem Seetharaman, Alejandro Luebs, Ishaan Kumar, and Kundan Kumar. 2024."
      }
     ]
    },
    {
     "id": "p-references-50",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-50-1",
       "original": "Highfidelity audio compression with improved rvqgan."
      },
      {
       "id": "s-references-50-2",
       "original": "Advances in Neural Information Processing Systems,"
      }
     ]
    },
    {
     "id": "eq-references-4",
     "type": "equation",
     "page": 10,
     "original": "36."
    },
    {
     "id": "p-references-51",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-51-1",
       "original": "Keon Lee, Dong Won Kim, Jaehyeon Kim, and Jaewoong Cho. 2024a."
      },
      {
       "id": "s-references-51-2",
       "original": "Ditto-tts: Efficient and scalable zero-shot text-to-speech with diffusion transformer."
      }
     ]
    },
    {
     "id": "p-references-52",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-52-1",
       "original": "arXiv preprint arXiv:2406.11427."
      }
     ]
    },
    {
     "id": "p-references-53",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-53-1",
       "original": "Sang-Hoon Lee, Ha-Yeong Choi, Seung-Bin Kim, and Seong-Whan Lee. 2023."
      },
      {
       "id": "s-references-53-2",
       "original": "Hierspeech++: Bridging the gap between semantic and acoustic representation of speech by hierarchical variational inference for zero-shot speech synthesis. arXiv preprint arXiv:2311.12454."
      }
     ]
    },
    {
     "id": "p-references-54",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-54-1",
       "original": "Yeonghyeon Lee, Inmo Yeon, Juhan Nam, and Joon Son Chung. 2024b."
      },
      {
       "id": "s-references-54-2",
       "original": "Voiceldm: Text-to-speech with environmental context."
      },
      {
       "id": "s-references-54-3",
       "original": "In ICASSP 2024-2024 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP), pages 12566–12571."
      }
     ]
    },
    {
     "id": "p-references-55",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-55-1",
       "original": "IEEE."
      }
     ]
    },
    {
     "id": "p-references-56",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-56-1",
       "original": "Naihan Li, Shujie Liu, Yanqing Liu, Sheng Zhao, and Ming Liu. 2019."
      },
      {
       "id": "s-references-56-2",
       "original": "Neural speech synthesis with transformer network."
      },
      {
       "id": "s-references-56-3",
       "original": "In Proceedings of the AAAI conference on artificial intelligence, volume 33, pages"
      }
     ]
    },
    {
     "id": "eq-references-5",
     "type": "equation",
     "page": 10,
     "original": "6706–6713."
    },
    {
     "id": "p-references-57",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-57-1",
       "original": "Yinghao Aaron Li, Cong Han, Vinay Raghavan, Gavin Mischler, and Nima Mesgarani. 2024."
      },
      {
       "id": "s-references-57-2",
       "original": "Styletts 2: Towards human-level text-to-speech through style diffusion and adversarial training with large speech language models."
      },
      {
       "id": "s-references-57-3",
       "original": "Advances in Neural Information Processing Systems, 36."
      }
     ]
    },
    {
     "id": "p-references-58",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-58-1",
       "original": "Rui Liu, Berrak Sisman, Guanglai Gao, and Haizhou Li."
      }
     ]
    },
    {
     "id": "p-references-59",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-59-1",
       "original": "2024a."
      },
      {
       "id": "s-references-59-2",
       "original": "Controllable accented text-to-speech synthesis with fine and coarse-grained intensity rendering."
      },
      {
       "id": "s-references-59-3",
       "original": "IEEE/ACM Transactions on Audio, Speech, and Language Processing."
      }
     ]
    },
    {
     "id": "p-references-60",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-60-1",
       "original": "Xingchao Liu, Chengyue Gong, and Qiang Liu. 2022."
      }
     ]
    },
    {
     "id": "p-references-61",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-61-1",
       "original": "Flow straight and fast: Learning to generate and transfer data with rectified flow."
      }
     ]
    },
    {
     "id": "p-references-62",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-62-1",
       "original": "arXiv preprint arXiv:2209.03003."
      }
     ]
    },
    {
     "id": "p-references-63",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-63-1",
       "original": "Zhijun Liu, Shuai Wang, Sho Inoue, Qibing Bai, and Haizhou Li. 2024b."
      },
      {
       "id": "s-references-63-2",
       "original": "Autoregressive diffusion transformer for text-to-speech synthesis. arXiv preprint arXiv:2406.05551."
      }
     ]
    },
    {
     "id": "p-references-64",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-64-1",
       "original": "Steven R Livingstone and Frank A Russo. 2018."
      },
      {
       "id": "s-references-64-2",
       "original": "The ryerson audio-visual database of emotional speech and song (ravdess): A dynamic, multimodal set of facial and vocal expressions in north american english."
      }
     ]
    },
    {
     "id": "p-references-65",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-65-1",
       "original": "PloS one, 13(5):e0196391."
      }
     ]
    },
    {
     "id": "p-references-66",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-66-1",
       "original": "Philipos C Loizou. 2011."
      },
      {
       "id": "s-references-66-2",
       "original": "Speech quality assessment."
      }
     ]
    },
    {
     "id": "p-references-67",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-67-1",
       "original": "In Multimedia analysis, processing and communications, pages 623–654."
      },
      {
       "id": "s-references-67-2",
       "original": "Springer."
      }
     ]
    },
    {
     "id": "p-references-68",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-68-1",
       "original": "Justin Lovelace, Soham Ray, Kwangyoun Kim, Kilian Q Weinberger, and Felix Wu. 2023."
      },
      {
       "id": "s-references-68-2",
       "original": "Simple-tts: End-toend text-to-speech synthesis with latent diffusion."
      }
     ]
    },
    {
     "id": "p-references-69",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-69-1",
       "original": "Linhan Ma, Yongmao Zhang, Xinfa Zhu, Yi Lei, Ziqian Ning, Pengcheng Zhu, and Lei Xie. 2023."
      },
      {
       "id": "s-references-69-2",
       "original": "Accentvits: accent transfer for end-to-end tts."
      },
      {
       "id": "s-references-69-3",
       "original": "In National Conference on Man-Machine Speech Communication, pages 203–214."
      },
      {
       "id": "s-references-69-4",
       "original": "Springer."
      }
     ]
    },
    {
     "id": "p-references-70",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-70-1",
       "original": "Xudong Mao, Qing Li, Haoran Xie, Raymond YK Lau, Zhen Wang, and Stephen Paul Smolley. 2017."
      },
      {
       "id": "s-references-70-2",
       "original": "Least squares generative adversarial networks."
      },
      {
       "id": "s-references-70-3",
       "original": "In Proceedings of the IEEE international conference on computer vision, pages 2794–2802."
      }
     ]
    },
    {
     "id": "p-references-71",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-71-1",
       "original": "Le Matthew, Vyas Apoorv, Shi Bowen, Karrer Brian, Sari Leda, Moritz Rashel, Williamson Mary, Manohar Vimal, Adi Yossi, Mahadeokar Jay, and Hsu Wei-Ning. 2023."
      },
      {
       "id": "s-references-71-2",
       "original": "Voicebox: Text-guided multilingual universal speech generation at scale."
      }
     ]
    },
    {
     "id": "p-references-72",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-72-1",
       "original": "Michael McAuliffe, Michaela Socolof, Sarah Mihuc, Michael Wagner, and Morgan Sonderegger. 2017."
      }
     ]
    },
    {
     "id": "p-references-73",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-73-1",
       "original": "Montreal forced aligner: Trainable text-speech alignment using kaldi."
      },
      {
       "id": "s-references-73-2",
       "original": "In Interspeech, volume 2017, pages"
      }
     ]
    },
    {
     "id": "eq-references-6",
     "type": "equation",
     "page": 11,
     "original": "498–502."
    },
    {
     "id": "p-references-74",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-74-1",
       "original": "Jan Melechovsky, Ambuj Mehrish, Berrak Sisman, and Dorien Herremans. 2022."
      },
      {
       "id": "s-references-74-2",
       "original": "Accented text-to-speech synthesis with a conditional variational autoencoder."
      }
     ]
    },
    {
     "id": "p-references-75",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-75-1",
       "original": "arXiv preprint arXiv:2211.03316."
      }
     ]
    },
    {
     "id": "p-references-76",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-76-1",
       "original": "Lingwei Meng, Long Zhou, Shujie Liu, Sanyuan Chen, Bing Han, Shujie Hu, Yanqing Liu, Jinyu Li, Sheng Zhao, Xixin Wu, et al. 2024."
      },
      {
       "id": "s-references-76-2",
       "original": "Autoregressive speech synthesis without vector quantization. arXiv preprint arXiv:2407.08551."
      }
     ]
    },
    {
     "id": "p-references-77",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-77-1",
       "original": "Oliver Niebuhr and Radek Skarnitzl. 2019."
      },
      {
       "id": "s-references-77-2",
       "original": "Measuring a speaker’s acoustic correlates of pitch–but which?"
      }
     ]
    },
    {
     "id": "p-references-78",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-78-1",
       "original": "a contrastive analysis based on perceived speaker charisma."
      }
     ]
    },
    {
     "id": "p-references-79",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-79-1",
       "original": "In Proceedings of 19th International Congress of Phonetic Sciences."
      }
     ]
    },
    {
     "id": "p-references-80",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-80-1",
       "original": "Vassil Panayotov, Guoguo Chen, Daniel Povey, and Sanjeev Khudanpur. 2015."
      },
      {
       "id": "s-references-80-2",
       "original": "Librispeech: an asr corpus based on public domain audio books."
      },
      {
       "id": "s-references-80-3",
       "original": "In 2015 IEEE international conference on acoustics, speech and signal processing (ICASSP), pages 5206–5210."
      }
     ]
    },
    {
     "id": "p-references-81",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-81-1",
       "original": "IEEE."
      }
     ]
    },
    {
     "id": "p-references-82",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-82-1",
       "original": "Puyuan Peng, Po-Yao Huang, Shang-Wen Li, Abdelrahman Mohamed, and David Harwath. 2024."
      },
      {
       "id": "s-references-82-2",
       "original": "Voicecraft: Zero-shot speech editing and text-to-speech in the wild. arXiv preprint arXiv:2403.16973."
      }
     ]
    },
    {
     "id": "p-references-83",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-83-1",
       "original": "Yi Ren, Chenxu Hu, Xu Tan, Tao Qin, Sheng Zhao, Zhou Zhao, and Tie-Yan Liu. 2020."
      }
     ]
    },
    {
     "id": "p-references-84",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-84-1",
       "original": "Fastspeech 2: Fast and high-quality end-to-end text to speech. arXiv preprint arXiv:2006.04558."
      }
     ]
    },
    {
     "id": "p-references-85",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-85-1",
       "original": "Yi Ren, Yangjun Ruan, Xu Tan, Tao Qin, Sheng Zhao, Zhou Zhao, and Tie-Yan Liu. 2019."
      },
      {
       "id": "s-references-85-2",
       "original": "Fastspeech: Fast, robust and controllable text to speech."
      },
      {
       "id": "s-references-85-3",
       "original": "Advances in neural information processing systems, 32."
      }
     ]
    },
    {
     "id": "p-references-86",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-86-1",
       "original": "Robin Rombach, Andreas Blattmann, Dominik Lorenz, Patrick Esser, and Björn Ommer. 2022."
      }
     ]
    },
    {
     "id": "p-references-87",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-87-1",
       "original": "Highresolution image synthesis with latent diffusion models."
      },
      {
       "id": "s-references-87-2",
       "original": "In Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition, pages"
      }
     ]
    },
    {
     "id": "eq-references-7",
     "type": "equation",
     "page": 11,
     "original": "10684–10695."
    },
    {
     "id": "p-references-88",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-88-1",
       "original": "Neil Shah, Saiteja Kosgi, Vishal Tambrahalli, S Neha, Anil Nelakanti, and Vineet Gandhi. 2024."
      },
      {
       "id": "s-references-88-2",
       "original": "Parrottts: Text-to-speech synthesis exploiting disentangled selfsupervised representations."
      },
      {
       "id": "s-references-88-3",
       "original": "In Findings of the Association for Computational Linguistics: EACL 2024, pages 79–91."
      }
     ]
    },
    {
     "id": "p-references-89",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-89-1",
       "original": "Jonathan Shen, Ruoming Pang, Ron J Weiss, Mike Schuster, Navdeep Jaitly, Zongheng Yang, Zhifeng Chen, Yu Zhang, Yuxuan Wang, Rj Skerrv-Ryan, et al. 2018."
      },
      {
       "id": "s-references-89-2",
       "original": "Natural tts synthesis by conditioning wavenet on mel spectrogram predictions."
      },
      {
       "id": "s-references-89-3",
       "original": "In 2018 IEEE international conference on acoustics, speech and signal processing (ICASSP), pages 4779–4783."
      }
     ]
    },
    {
     "id": "p-references-90",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-90-1",
       "original": "IEEE."
      }
     ]
    },
    {
     "id": "p-references-91",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-91-1",
       "original": "Kai Shen, Zeqian Ju, Xu Tan, Yanqing Liu, Yichong Leng, Lei He, Tao Qin, Sheng Zhao, and Jiang Bian."
      }
     ]
    },
    {
     "id": "p-references-92",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-92-1",
       "original": "2023."
      },
      {
       "id": "s-references-92-2",
       "original": "Naturalspeech 2: Latent diffusion models are natural and zero-shot speech and singing synthesizers. arXiv preprint arXiv:2304.09116."
      }
     ]
    },
    {
     "id": "p-references-93",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-93-1",
       "original": "Yakun Song, Zhuo Chen, Xiaofei Wang, Ziyang Ma, and Xie Chen. 2024."
      },
      {
       "id": "s-references-93-2",
       "original": "Ella-v: Stable neural codec language modeling with alignment-guided sequence reordering. arXiv preprint arXiv:2401.07333."
      }
     ]
    },
    {
     "id": "p-references-94",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-94-1",
       "original": "Jianlin Su, Murtadha Ahmed, Yu Lu, Shengfeng Pan, Wen Bo, and Yunfeng Liu. 2024."
      },
      {
       "id": "s-references-94-2",
       "original": "Roformer: Enhanced transformer with rotary position embedding."
      }
     ]
    },
    {
     "id": "p-references-95",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-95-1",
       "original": "Neurocomputing, 568:127063."
      }
     ]
    },
    {
     "id": "p-references-96",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-96-1",
       "original": "Xu Tan, Tao Qin, Frank Soong, and Tie-Yan Liu. 2021."
      }
     ]
    },
    {
     "id": "p-references-97",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-97-1",
       "original": "A survey on neural speech synthesis. arXiv preprint arXiv:2106.15561."
      }
     ]
    },
    {
     "id": "p-references-98",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-98-1",
       "original": "Chengyi Wang, Sanyuan Chen, Yu Wu, Ziqiang Zhang, Long Zhou, Shujie Liu, Zhuo Chen, Yanqing Liu, Huaming Wang, Jinyu Li, et al. 2023."
      },
      {
       "id": "s-references-98-2",
       "original": "Neural codec language models are zero-shot text to speech synthesizers. arXiv preprint arXiv:2301.02111."
      }
     ]
    },
    {
     "id": "p-references-99",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-99-1",
       "original": "Yuancheng Wang, Haoyue Zhan, Liwei Liu, Ruihong Zeng, Haotian Guo, Jiachen Zheng, Qiang Zhang, Xueyao Zhang, Shunsi Zhang, and Zhizheng Wu."
      }
     ]
    },
    {
     "id": "eq-references-8",
     "type": "equation",
     "page": 12,
     "original": "2024."
    },
    {
     "id": "p-references-100",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-100-1",
       "original": "Maskgct: Zero-shot text-to-speech with masked generative codec transformer. arXiv preprint arXiv:2409.00750."
      }
     ]
    },
    {
     "id": "p-references-101",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-101-1",
       "original": "Haibin Wu, Xuanjun Chen, Yi-Cheng Lin, Kai-wei Chang, Ho-Lam Chung, Alexander H Liu, and Hungyi Lee. 2024."
      },
      {
       "id": "s-references-101-2",
       "original": "Towards audio language modeling-an overview. arXiv preprint arXiv:2402.13236."
      }
     ]
    },
    {
     "id": "p-references-102",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-102-1",
       "original": "Detai Xin, Xu Tan, Kai Shen, Zeqian Ju, Dongchao Yang, Yuancheng Wang, Shinnosuke Takamichi, Hiroshi Saruwatari, Shujie Liu, Jinyu Li, et al. 2024."
      }
     ]
    },
    {
     "id": "p-references-103",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-103-1",
       "original": "Rall-e: Robust codec language modeling with chainof-thought prompting for text-to-speech synthesis. arXiv preprint arXiv:2404.03204."
      }
     ]
    },
    {
     "id": "p-references-104",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-104-1",
       "original": "Hanshu Yan, Xingchao Liu, Jiachun Pan, Jun Hao Liew, Qiang Liu, and Jiashi Feng. 2024."
      },
      {
       "id": "s-references-104-2",
       "original": "Perflow: Piecewise rectified flow as universal plug-and-play accelerator. arXiv preprint arXiv:2405.07510."
      }
     ]
    },
    {
     "id": "p-references-105",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-105-1",
       "original": "An Yang, Baosong Yang, Binyuan Hui, Bo Zheng, Bowen Yu, Chang Zhou, Chengpeng Li, Chengyuan Li, Dayiheng Liu, Fei Huang, et al. 2024a."
      },
      {
       "id": "s-references-105-2",
       "original": "Qwen2 technical report. arXiv preprint arXiv:2407.10671."
      }
     ]
    },
    {
     "id": "p-references-106",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-106-1",
       "original": "Dongchao Yang, Rongjie Huang, Yuanyuan Wang, Haohan Guo, Dading Chong, Songxiang Liu, Xixin Wu, and Helen Meng. 2024b."
      },
      {
       "id": "s-references-106-2",
       "original": "Simplespeech 2: Towards simple and efficient text-to-speech with flow-based scalar latent transformer diffusion models. arXiv preprint arXiv:2408.13893."
      }
     ]
    },
    {
     "id": "p-references-107",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-107-1",
       "original": "Dongchao Yang, Songxiang Liu, Rongjie Huang, Chao Weng, and Helen Meng. 2024c."
      },
      {
       "id": "s-references-107-2",
       "original": "Instructtts: Modelling expressive tts in discrete latent space with natural language style prompt."
      },
      {
       "id": "s-references-107-3",
       "original": "IEEE/ACM Transactions on Audio, Speech, and Language Processing."
      }
     ]
    },
    {
     "id": "p-references-108",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-108-1",
       "original": "Dongchao Yang, Dingdong Wang, Haohan Guo, Xueyuan Chen, Xixin Wu, and Helen Meng. 2024d."
      }
     ]
    },
    {
     "id": "p-references-109",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-109-1",
       "original": "Simplespeech: Towards simple and efficient text-tospeech with scalar latent transformer diffusion models. arXiv preprint arXiv:2406.02328."
      }
     ]
    },
    {
     "id": "p-references-110",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-110-1",
       "original": "Jinhyeok Yang, Junhyeok Lee, Hyeong-Seok Choi, Seunghun Ji, Hyeongju Kim, and Juheon Lee. 2024e."
      }
     ]
    },
    {
     "id": "p-references-111",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-111-1",
       "original": "Dualspeech: Enhancing speaker-fidelity and textintelligibility through dual classifier-free guidance. arXiv preprint arXiv:2408.14423."
      }
     ]
    },
    {
     "id": "p-references-112",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-112-1",
       "original": "Zhen Ye, Xinfa Zhu, Chi-Min Chan, Xinsheng Wang, Xu Tan, Jiahe Lei, Yi Peng, Haohe Liu, Yizhu Jin, Zheqi DAI, et al. 2025."
      },
      {
       "id": "s-references-112-2",
       "original": "Llasa: Scaling train-time and inference-time compute for llama-based speech synthesis. arXiv preprint arXiv:2502.04128."
      }
     ]
    },
    {
     "id": "p-references-113",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-113-1",
       "original": "Heiga Zen, Viet Dang, Rob Clark, Yu Zhang, Ron J Weiss, Ye Jia, Zhifeng Chen, and Yonghui Wu. 2019."
      }
     ]
    },
    {
     "id": "p-references-114",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-114-1",
       "original": "Libritts: A corpus derived from librispeech for textto-speech. arXiv preprint arXiv:1904.02882."
      }
     ]
    },
    {
     "id": "p-references-115",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-115-1",
       "original": "Binbin Zhang, Hang Lv, Pengcheng Guo, Qijie Shao, Chao Yang, Lei Xie, Xin Xu, Hui Bu, Xiaoyu Chen, Chenchen Zeng, et al. 2022."
      },
      {
       "id": "s-references-115-2",
       "original": "Wenetspeech: A 10000+ hours multi-domain mandarin corpus for speech recognition."
      },
      {
       "id": "s-references-115-3",
       "original": "In ICASSP 2022-2022 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP), pages 6182–6186."
      },
      {
       "id": "s-references-115-4",
       "original": "IEEE."
      }
     ]
    },
    {
     "id": "p-references-116",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-116-1",
       "original": "Ziqiang Zhang, Long Zhou, Chengyi Wang, Sanyuan Chen, Yu Wu, Shujie Liu, Zhuo Chen, Yanqing Liu, Huaming Wang, Jinyu Li, et al. 2023."
      },
      {
       "id": "s-references-116-2",
       "original": "Speak foreign languages with your own voice: Cross-lingual neural codec language modeling."
      }
     ]
    },
    {
     "id": "p-references-117",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-117-1",
       "original": "arXiv preprint arXiv:2303.03926."
      }
     ]
    },
    {
     "id": "p-references-118",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-118-1",
       "original": "Guanlong Zhao, Sinem Sonsaat, Alif Silpachai, Ivana Lucic, Evgeny Chukharev-Hudilainen, John Levis, and Ricardo Gutierrez-Osuna. 2018."
      },
      {
       "id": "s-references-118-2",
       "original": "L2-arctic: A non-native english speech corpus."
      },
      {
       "id": "s-references-118-3",
       "original": "In Proc."
      },
      {
       "id": "s-references-118-4",
       "original": "Interspeech, pages 2783–2787."
      }
     ]
    },
    {
     "id": "p-references-119",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-119-1",
       "original": "Jinzuomu Zhong, Korin Richmond, Zhiba Su, and Siqi Sun. 2024."
      }
     ]
    },
    {
     "id": "p-references-120",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-120-1",
       "original": "Accentbox: Towards highfidelity zero-shot accent generation. arXiv preprint arXiv:2409.09098."
      }
     ]
    },
    {
     "id": "p-references-121",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-121-1",
       "original": "Xuehao Zhou, Mingyang Zhang, Yi Zhou, Zhizheng Wu, and Haizhou Li. 2024."
      },
      {
       "id": "s-references-121-2",
       "original": "Multi-scale accent modeling with disentangling for multi-speaker multi-accent tts synthesis. arXiv preprint arXiv:2406.10844."
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
    "original": "Detailed Experimental Settings",
    "zh": "Detailed Experimental Settings"
   },
   "blocks": []
  },
  {
   "id": "sec-A-1",
   "num": "A.1",
   "level": 2,
   "page": 12,
   "title": {
    "original": "Model Configuration",
    "zh": "Model Configuration"
   },
   "blocks": [
    {
     "id": "p-A-1-1",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-A-1-1-1",
       "original": "• The WaveVAE model consists of a VAE encoder, a wave decoder, and discriminators; The VAE encoder follows the architecture used in (Ji et al., 2024).",
       "zh": "• WaveVAE 模型由 VAE 编码器、波形解码器和判别器组成；VAE 编码器沿用（Ji et al., 2024）所用的架构。"
      },
      {
       "id": "s-A-1-1-2",
       "original": "The wave decoder consists of a convolutional upsampler and a Hifi-GAN decoder (Kong et al., 2020).",
       "zh": "波形解码器由一个卷积上采样器和一个 Hifi-GAN 解码器（Kong et al., 2020）组成。"
      },
      {
       "id": "s-A-1-1-3",
       "original": "The latent channel size is set to 32.",
       "zh": "潜在通道数设为 32。"
      },
      {
       "id": "s-A-1-1-4",
       "original": "The weight of the KL loss is set to 1 × 10−3, which only imposes a slight KL penalty on the learned latent.",
       "zh": "KL 损失的权重设为 1 × 10−3，只对学到的潜在表征施加轻微的 KL 惩罚。"
      },
      {
       "id": "s-A-1-1-5",
       "original": "In training, we use batches of fixed length, consisting of 72,000 wavform frames, with a batch size set to 40 for each GPU.",
       "zh": "训练中我们使用固定长度的批次，每批含 72,000 个波形帧，每张 GPU 的批大小设为 40。"
      },
      {
       "id": "s-A-1-1-6",
       "original": "We use the Adam optimizer with a learning rate",
       "zh": "我们使用 Adam 优化器，学习率为 1 × 10−4，β1 = 0.9，β2 = 0.999，预热 10K 步。"
      }
     ]
    },
    {
     "id": "eq-A-1-1",
     "type": "equation",
     "page": 12,
     "original": "of 1 × 10−4, β1 = 0.9, β2 = 0.999, and 10K"
    },
    {
     "id": "p-A-1-2",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-A-1-2-1",
       "original": "warmup steps.",
       "zh": "我们使用 Adam 优化器，学习率为 1 × 10−4，β1 = 0.9，β2 = 0.999，预热 10K 步。"
      }
     ]
    },
    {
     "id": "p-A-1-3",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-A-1-3-1",
       "original": "• The MegaTTS 3 model use the standard transformer block from LLAMA (Dubey et al., 2024) as the basic structure, which comprises a 24-layer Transformer with 16 attention heads and 1024 embedding dimensions.",
       "zh": "• MegaTTS 3 模型使用 LLAMA（Dubey et al., 2024）的标准 Transformer 块作为基本结构，由 24 层 Transformer 组成，含 16 个注意力头和 1024 维嵌入。"
      },
      {
       "id": "s-A-1-3-2",
       "original": "It contains 339M parameters in total.",
       "zh": "模型总共包含 339M 个参数。"
      },
      {
       "id": "s-A-1-3-3",
       "original": "We adopt the Rotary Position Embedding (RoPE) (Su et al., 2024) as the positional embedding following the common practice in LLAMA implementations.",
       "zh": "我们遵循 LLAMA 实现中的常见做法，采用旋转位置编码（RoPE）（Su et al., 2024）作为位置嵌入。"
      },
      {
       "id": "s-A-1-3-4",
       "original": "For simplicity, we do not use the phoneme encoder and style encoder like previous works.",
       "zh": "为简单起见，我们不像以往工作那样使用音素编码器和风格编码器。"
      },
      {
       "id": "s-A-1-3-5",
       "original": "We only use a linear projection layer to transform these features to the same dimension.",
       "zh": "我们只用一个线性投影层把这些特征变换到同一维度。"
      },
      {
       "id": "s-A-1-3-6",
       "original": "During training, we use 8 A100 80GB GPUs with a batch size of 10K latent frames per GPU for 1M steps.",
       "zh": "训练时，我们使用 8 张 A100 80GB GPU，每张 GPU 的批大小为 10K 潜在帧，共训练 1M 步。"
      },
      {
       "id": "s-A-1-3-7",
       "original": "We use the Adam optimizer with a learning rate of",
       "zh": "我们使用 Adam 优化器，学习率为 1 × 10−4，β1 = 0.9，β2 = 0.999，预热 10K 步。"
      }
     ]
    },
    {
     "id": "eq-A-1-2",
     "type": "equation",
     "page": 12,
     "original": "5 × 10−5, β1 = 0.9, β2 = 0.999, and 10K"
    },
    {
     "id": "p-A-1-4",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-A-1-4-1",
       "original": "warmup steps.",
       "zh": "我们使用 Adam 优化器，学习率为 1 × 10−4，β1 = 0.9，β2 = 0.999，预热 10K 步。"
      },
      {
       "id": "s-A-1-4-2",
       "original": "In zero-shot TTS experiments, we set the text guidance scale αtxt and the speaker guidance scale αspk to 2.5 and 3.5, respectively.",
       "zh": "在零样本 TTS 实验中，我们把文本引导尺度 αtxt 和说话人引导尺度 αspk 分别设为 2.5 和 3.5。"
      },
      {
       "id": "s-A-1-4-3",
       "original": "In accented TTS experiments, we set αspk = 6.5, αtxt = 1.5 to generate the accented speech and set αspk = 2.0, αtxt = 5.0 to generate the speech with standard English.",
       "zh": "在口音 TTS 实验中，我们设 αspk = 6.5、αtxt = 1.5 来生成带口音的语音，设 αspk = 2.0、αtxt = 5.0 来生成标准英语语音。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-A-2",
   "num": "A.2",
   "level": 2,
   "page": 13,
   "title": {
    "original": "Random Seeds",
    "zh": "Random Seeds"
   },
   "blocks": [
    {
     "id": "p-A-2-1",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-A-2-1-1",
       "original": "We ran objective experiments 10 times with 10 different random seeds and obtained the averaged results.",
       "zh": "随机种子：我们用 10 个不同的随机种子跑了 10 次客观实验并取平均结果。"
      },
      {
       "id": "s-A-2-1-2",
       "original": "The chosen random seeds are [4475, 5949,",
       "zh": "所选随机种子为 [4475, 5949, 6828, 6744, 3954, 3962, 6837, 1237, 3824, 3163]。"
      }
     ]
    },
    {
     "id": "eq-A-2-1",
     "type": "equation",
     "page": 13,
     "original": "6828, 6744, 3954, 3962, 6837, 1237, 3824, 3163]."
    }
   ]
  },
  {
   "id": "sec-A-3",
   "num": "A.3",
   "level": 2,
   "page": 13,
   "title": {
    "original": "Sampling Strategy",
    "zh": "Sampling Strategy"
   },
   "blocks": [
    {
     "id": "p-A-3-1",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-A-3-1-1",
       "original": "For MegaTTS 3, we applied the Euler sampler with a fixed step size following the common practice in flow ODE sampling.",
       "zh": "采样策略：对 MegaTTS 3，我们遵循流 ODE 采样的常见做法，采用固定步长的 Euler 采样器。"
      },
      {
       "id": "s-A-3-1-2",
       "original": "We use 25 and 8 sampling steps for MegaTTS 3 and MegaTTS 3-accelerated, respectively.",
       "zh": "MegaTTS 3 和 MegaTTS 3-accelerated 分别使用 25 步和 8 步采样。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-A-4",
   "num": "A.4",
   "level": 2,
   "page": 13,
   "title": {
    "original": "Details about Zero-Shot TTS Baselines",
    "zh": "Details about Zero-Shot TTS Baselines"
   },
   "blocks": [
    {
     "id": "p-A-4-1",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-A-4-1-1",
       "original": "In this subsection, we provide the details about the baselines in our zero-shot TTS experiments:",
       "zh": "零样本 TTS 基线细节：本小节介绍零样本 TTS 实验中各基线的细节："
      }
     ]
    },
    {
     "id": "p-A-4-2",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-A-4-2-1",
       "original": "• VALL-E 2 (Chen et al., 2024a), based on VALL-E, introduces Repetition Aware Sampling to stabilize the decoding process and proposes the Grouped Code Modeling to effectively address the challenges of long sequence modeling.",
       "zh": "• VALL-E 2（Chen et al., 2024a）基于 VALL-E，引入重复感知采样（Repetition Aware Sampling）来稳定解码过程，并提出分组编码建模（Grouped Code Modeling）以有效应对长序列建模的挑战。"
      }
     ]
    },
    {
     "id": "p-A-4-3",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-A-4-3-1",
       "original": "• VoiceBox (Matthew et al., 2023) is a nonautoregressive flow-matching model designed to infill mel-spectrograms based on provided speech context and text.",
       "zh": "• VoiceBox（Matthew et al., 2023）是一个非自回归的流匹配模型，旨在根据给定的语音上下文和文本对 Mel 频谱图进行补全填充。"
      },
      {
       "id": "s-A-4-3-2",
       "original": "We obtained the samples by contacting the authors.",
       "zh": "我们联系作者获得了其样本。"
      }
     ]
    },
    {
     "id": "p-A-4-4",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-A-4-4-1",
       "original": "• DiTTo-TTS (Lee et al., 2024a) addresses the challenge of text-speech alignment via crossattention mechanisms with the prediction of the total length of speech representations.",
       "zh": "• DiTTo-TTS（Lee et al., 2024a）通过带语音表征总长度预测的交叉注意力机制来应对文本-语音对齐的挑战。"
      },
      {
       "id": "s-A-4-4-2",
       "original": "We directly obtain the results of objective evaluations from their paper.",
       "zh": "我们直接从其论文中获取客观评测结果。"
      }
     ]
    },
    {
     "id": "p-A-4-5",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-A-4-5-1",
       "original": "• NaturalSpeech 3 (Ju et al., 2024) designs a neural codec with factorized vector quantization (FVQ) to disentangle speech waveform into subspaces of content, prosody, timbre, and acoustic details and propose a factorized diffusion model to generate attributes in each subspace following its corresponding prompt.",
       "zh": "• NaturalSpeech 3（Ju et al., 2024）设计了带因子化向量量化（FVQ）的神经 codec，把语音波形解耦为内容、韵律、音色和声学细节等子空间，并提出因子化扩散模型，按各子空间对应的提示分别生成各属性。"
      }
     ]
    },
    {
     "id": "p-A-4-6",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-A-4-6-1",
       "original": "We obtained the samples by contacting the authors.",
       "zh": "我们联系作者获得了其样本。"
      }
     ]
    },
    {
     "id": "p-A-4-7",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-A-4-7-1",
       "original": "• CosyVoice (Du et al., 2024) utilizes an LLM for text-to-token generation and a conditional flow matching model for token-to-speech synthesis.",
       "zh": "• CosyVoice（Du et al., 2024）用一个 LLM 做文本到 token 的生成，并用一个条件流匹配模型做 token 到语音的合成。"
      },
      {
       "id": "s-A-4-7-2",
       "original": "We use the official code and the model snapshot named “CosyVoice-300M” in our experiments2.",
       "zh": "我们在实验中使用其官方代码和名为「CosyVoice-300M」的模型快照（见脚注 2）。"
      }
     ]
    },
    {
     "id": "p-A-4-8",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-A-4-8-1",
       "original": "• MaskGCT (Wang et al., 2024) proposes a fully non-autoregressive codec-based TTS model that eliminates the need for explicit alignment information between text and speech supervision, as well as phone-level duration prediction.",
       "zh": "• MaskGCT（Wang et al., 2024）提出一个完全非自回归的 codec 化 TTS 模型，无需文本与语音监督之间的显式对齐信息，也无需音素级时长预测。"
      },
      {
       "id": "s-A-4-8-2",
       "original": "We directly obtain the results of objective evaluations from their paper.",
       "zh": "我们直接从其论文中获取客观评测结果。"
      }
     ]
    },
    {
     "id": "p-A-4-9",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-A-4-9-1",
       "original": "• F5-TTS (Chen et al., 2024b) proposes a fully non-autoregressive text-to-speech system based on flow matching with Diffusion Transformer (DiT).",
       "zh": "• F5-TTS（Chen et al., 2024b）提出一个基于扩散 Transformer（DiT）流匹配的完全非自回归文本转语音系统。"
      },
      {
       "id": "s-A-4-9-2",
       "original": "We use the official code and pretrained model in our experiments3.",
       "zh": "我们在实验中使用其官方代码和预训练模型（见脚注 3）。"
      }
     ]
    },
    {
     "id": "p-A-4-10",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-A-4-10-1",
       "original": "• E2 TTS (Eskimez et al., 2024) proposes an easy non-autoregressive zero-shot TTS system, that offers human-level naturalness and state-of-the-art speaker similarity and intelligibility.",
       "zh": "• E2 TTS（Eskimez et al., 2024）提出一个简洁的非自回归零样本 TTS 系统，提供人类水平的自然度以及最先进的说话人相似度与可懂度。"
      },
      {
       "id": "s-A-4-10-2",
       "original": "We use the code implemented by F5-TTS authors in our experiments4.",
       "zh": "我们在实验中使用 F5-TTS 作者实现的代码（见脚注 4）。"
      }
     ]
    },
    {
     "id": "p-A-4-11",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-A-4-11-1",
       "original": "The evaluation is conducted on a server with 1 NVIDIA V100 GPU and batch size 1.",
       "zh": "评测在一台配备 1 张 NVIDIA V100 GPU 的服务器上进行，批大小为 1。"
      },
      {
       "id": "s-A-4-11-2",
       "original": "RTF denotes the real-time factor, i.e., the seconds required for the system (together with the vocoder) to synthesize one-second audio.",
       "zh": "RTF 表示实时因子，即系统（连同声码器）合成 1 秒音频所需的秒数。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-A-5",
   "num": "A.5",
   "level": 2,
   "page": 13,
   "title": {
    "original": "Details about the Accented TTS Baseline",
    "zh": "Details about the Accented TTS Baseline"
   },
   "blocks": [
    {
     "id": "p-A-5-1",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-A-5-1-1",
       "original": "CTA-TTS (Liu et al., 2024a) is a TTS framework that uses a phoneme recognition model to quantify 2https://github.com/FunAudioLLM/CosyVoice 3https://github.com/SWivid/F5-TTS 4https://github.com/SWivid/F5-TTS the accent intensity in phoneme level for accent intensity control.",
       "zh": "口音 TTS 基线细节：CTA-TTS（Liu et al., 2024a）是一个 TTS 框架，用音素识别模型在音素级量化口音强度，从而进行口音强度控制。（本句与脚注粘连：脚注 2 为 https://github.com/FunAudioLLM/CosyVoice，脚注 3 为 https://github.com/SWivid/F5-TTS，脚注 4 为 https://github.com/SWivid/F5-TTS）"
      },
      {
       "id": "s-A-5-1-2",
       "original": "CTA-TTS first trains the phoneme recognition model on the standard pronunciation LibriSpeech dataset, and then uses the output probability distribution of the model to assess the accent intensity and create accent labels on the accented L2Arctic dataset.",
       "zh": "CTA-TTS 先在标准发音的 LibriSpeech 数据集上训练音素识别模型，然后用该模型的输出概率分布评估口音强度，并在带口音的 L2-ARCTIC 数据集上构造口音标签。"
      },
      {
       "id": "s-A-5-1-3",
       "original": "These labels were input into the TTS model to enable control over accent intensity.",
       "zh": "这些标签被输入 TTS 模型，以实现口音强度控制。"
      }
     ]
    },
    {
     "id": "p-A-5-2",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-A-5-2-1",
       "original": "Systems like CTA-TTS require precise accent annotations during training, so we trained them on the L2-ARCTIC dataset.",
       "zh": "像 CTA-TTS 这样的系统在训练时需要精确的口音标注，因此我们在 L2-ARCTIC 数据集上训练它们。"
      },
      {
       "id": "s-A-5-2-2",
       "original": "However, our model does not require accent annotations and learns different accent patterns from large-scale data, using only the multi-condition CFG mechanism to achieve accent intensity control.",
       "zh": "然而，我们的模型不需要口音标注，而是从大规模数据中学习不同的口音模式，仅用多条件 CFG 机制即可实现口音强度控制。"
      },
      {
       "id": "s-A-5-2-3",
       "original": "Therefore, we directly compare the zero-shot results of our model with the baselines, which is a more challenging task.",
       "zh": "因此，我们直接用模型的零样本结果与基线比较，这是一个更具挑战性的任务。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-A-6",
   "num": "A.6",
   "level": 2,
   "page": 14,
   "title": {
    "original": "Details in Subjective Evaluations",
    "zh": "Details in Subjective Evaluations"
   },
   "blocks": [
    {
     "id": "p-A-6-1",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-A-6-1-1",
       "original": "We conduct evaluations of audio quality, speaker similarity, and accent similarity on Amazon Mechanical Turk (MTurk).",
       "zh": "主观评测细节：我们在 Amazon Mechanical Turk（MTurk）上开展音频质量、说话人相似度和口音相似度的评测。"
      },
      {
       "id": "s-A-6-1-2",
       "original": "We inform the participants that the data will be utilized for scientific research purposes.",
       "zh": "我们告知参与者数据将用于科研目的。"
      },
      {
       "id": "s-A-6-1-3",
       "original": "For each dataset, 40 samples are randomly selected from the test set, and the TTS systems are then used to generate corresponding audio samples.",
       "zh": "对每个数据集，我们从测试集中随机选取 40 个样本，并用各 TTS 系统生成对应的音频样本。"
      },
      {
       "id": "s-A-6-1-4",
       "original": "Each audio sample is listened to by a minimum of 10 listeners.",
       "zh": "每段音频样本至少由 10 名听众收听。"
      },
      {
       "id": "s-A-6-1-5",
       "original": "For CMOS, following the approach of Loizou (2011), listeners are asked to compare pairs of audio generated by systems A and B and indicate their preference between the two.",
       "zh": "对 CMOS，遵循 Loizou（2011）的做法，听众被要求比较系统 A 和系统 B 生成的成对音频，并给出二者之间的偏好。"
      },
      {
       "id": "s-A-6-1-6",
       "original": "They are then asked to choose one of the following scores: 0 indicating no difference, 1 indicating a slight difference, 2 indicating a significant difference and 3 indicating a very large difference.",
       "zh": "然后他们需要从以下分值中选择一个：0 表示无差异，1 表示略有差异，2 表示差异明显，3 表示差异非常大。"
      },
      {
       "id": "s-A-6-1-7",
       "original": "We instruct listeners to “Please focus on speech quality, particularly in terms of clarity, naturalness, and high-frequency details, while disregarding other factors”.",
       "zh": "我们指示听众：「请关注语音质量，尤其是清晰度、自然度和高频细节，忽略其他因素。」"
      },
      {
       "id": "s-A-6-1-8",
       "original": "For SMOS and ASMOS, each participant is instructed to rate the sentence on a 1-5 Likert scale based on their subjective judgment.",
       "zh": "对 SMOS 和 ASMOS，每位参与者被要求基于主观判断按 1-5 分的李克特量表为句子打分。"
      },
      {
       "id": "s-A-6-1-9",
       "original": "For speaker similarity evaluations (SMOS), we instruct listeners to “Please focus solely on the timbre and prosodic similarity between the reference speech and the generated speech, while disregarding differences in content, grammar, audio quality, and other factors”.",
       "zh": "对说话人相似度评测（SMOS），我们指示听众：「请只关注参考语音与生成语音之间在音色和韵律上的相似度，忽略内容、语法、音频质量等方面的差异。」"
      },
      {
       "id": "s-A-6-1-10",
       "original": "For accent similarity evaluations (AS- MOS), we instruct listeners to “Please focus solely on the accent similarity between the ground-truth speech and the generated speech, while disregarding other factors”.",
       "zh": "对口音相似度评测（ASMOS），我们指示听众：「请只关注真实语音与生成语音之间的口音相似度，忽略其他因素。」"
      },
      {
       "id": "s-A-6-1-11",
       "original": "The screenshots of instructions for testers are shown in Figure 3.",
       "zh": "给测试者的指示截图见 Figure 3。"
      },
      {
       "id": "s-A-6-1-12",
       "original": "Additionally, we insert audio samples with known quality levels (e.g., reference recordings with no artifacts or intentionally corrupted audio with noticeable distortions) into the evaluation set to verify whether evaluators are attentive and professional.",
       "zh": "此外，我们在评测集中插入已知质量水平的音频样本（如无瑕疵的参考录音或带明显失真的人为损坏音频），以验证评测者是否认真且专业。"
      },
      {
       "id": "s-A-6-1-13",
       "original": "We also randomly repeat some audio clips in the evaluation set to check whether evaluators provide consistent ratings for the same sample.",
       "zh": "我们还在评测集中随机重复一些音频片段，以检查评测者对同一样本的打分是否一致。"
      },
      {
       "id": "s-A-6-1-14",
       "original": "If large deviations in scores (larger than 1.0) for repeated clips occurs, we will select a new rater to evaluate this audio clip.",
       "zh": "如果重复片段的打分出现较大偏差（大于 1.0），我们会换一位新的评测者来评测该音频片段。"
      }
     ]
    },
    {
     "id": "p-A-6-2",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-A-6-2-1",
       "original": "We paid $8 to participants hourly and totally spent about $500 on participant compensation.",
       "zh": "我们向参与者支付每小时 $8 的报酬，参与者报酬总计约 $500。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-B",
   "num": "B",
   "level": 1,
   "page": 14,
   "title": {
    "original": "Classifier-Free Guidance Used in Zero-Shot TTS",
    "zh": "附录 B：零样本 TTS 中使用的无分类器引导（CFG）"
   },
   "blocks": [
    {
     "id": "p-B-1",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-B-1-1",
       "original": "Classifier-Free Guidance (CFG) (Ho and Salimans, 2022) is a technique that balances sample fidelity and mode coverage in diffusion models by combining the score estimates from both a conditional and an unconditional model.",
       "zh": "无分类器引导（CFG）（Ho and Salimans, 2022）通过结合条件模型与无条件模型的得分估计，在扩散模型中平衡样本保真度与模式覆盖度。"
      },
      {
       "id": "s-B-1-2",
       "original": "The unconditional model is trained alongside the conditional model by randomly omitting the conditioning variable c with a certain probability, allowing the same model to provide score estimates for both p(x) and p(x|c).",
       "zh": "无条件模型与条件模型一起训练：以一定概率随机省略条件变量 c，使同一个模型能同时为 p(x) 和 p(x|c) 提供得分估计。"
      },
      {
       "id": "s-B-1-3",
       "original": "In large-scale zero-shot TTS, VoiceBox (Matthew et al., 2023) and NaturalSpeech 2 (Shen et al., 2023) achieve CFG mechanism by dropping the text and prompt speech features.",
       "zh": "在大规模零样本 TTS 中，VoiceBox（Matthew et al., 2023）和 NaturalSpeech 2（Shen et al., 2023）通过丢弃文本与提示语音特征来实现 CFG 机制。"
      },
      {
       "id": "s-B-1-4",
       "original": "However, these works overlook that text and timbre should be controlled separately.",
       "zh": "然而，这些工作忽视了文本与音色应当分开控制这一点。"
      },
      {
       "id": "s-B-1-5",
       "original": "Inspired by VoiceLDM (Lee et al., 2024b) that introduces separate control of environmental conditions and speech contents, a concurrent work (Yang et al., 2024e) proposes separately controlling the speaker fidelity and text intelligibility.",
       "zh": "受 VoiceLDM（Lee et al., 2024b）分别控制环境条件与语音内容的做法启发，一项同期工作（Yang et al., 2024e）提出分别控制说话人保真度与文本可懂度。"
      },
      {
       "id": "s-B-1-6",
       "original": "However, this work is limited to improving the audio quality of TTS and does not explore the impact of CFG on accent.",
       "zh": "然而，该工作仅限于提升 TTS 的音频质量，并未探索 CFG 对口音的影响。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-C",
   "num": "C",
   "level": 1,
   "page": 14,
   "title": {
    "original": "Details of PeRFlow Training Procedure",
    "zh": "附录 C：PeRFlow 训练流程细节"
   },
   "blocks": [
    {
     "id": "p-C-1",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-C-1-1",
       "original": "Once the pretrained ODE solver of the teacher model ϕθ is available, we perform the PeRFlow technique to train an accelerated solver in real time.",
       "zh": "一旦获得教师模型预训练的 ODE 求解器 ϕθ，我们就执行 PeRFlow 技术实时训练一个加速求解器。"
      },
      {
       "id": "s-C-1-2",
       "original": "When training, we only consider the shortened segments of the ODE trajectories, reducing the computational load of inference for the teacher model at each training step, and accelerating the training process.",
       "zh": "训练时，我们只考虑 ODE 轨迹中缩短的分段，降低了每个训练步中教师模型的推理计算量，从而加速训练过程。"
      }
     ]
    },
    {
     "id": "p-C-2",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-C-2-1",
       "original": "At each training step, given a data sample z1 and a sample z0 drawn from the source distribution (in this case, z0 ∼N(0, I), i.e., Gaussian distribution), we randomly select a time window (tk−1, tk] and (a) Screenshot of CMOS testing.",
       "zh": "在每个训练步，给定数据样本 z1 和从源分布（此处 z0 ∼N(0, I)，即高斯分布）采样的 z0，我们随机选择一个时间窗口 (tk−1, tk]（本句与图 3 子图标题 (a) Screenshot of CMOS testing. 粘连）。"
      },
      {
       "id": "s-C-2-2",
       "original": "(b) Screenshot of SMOS testing.",
       "zh": "（本句为图 3 子图标题：）(b) SMOS 测试截图。"
      },
      {
       "id": "s-C-2-3",
       "original": "(c) Screenshot of ASMOS testing.",
       "zh": "（本句为图 3 子图标题：）(c) ASMOS 测试截图。"
      }
     ]
    },
    {
     "id": "fig-C-1",
     "type": "figure_caption",
     "page": 15,
     "original": "Figure 3: Screenshots of subjective evaluations.",
     "zh": "图 3：主观评测的截图。"
    },
    {
     "id": "p-C-3",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-C-3-1",
       "original": "compute the standpoint of the segmented probability path ztk−1 = p 1 −σ2(tk−1)z1 + σ(tk−1)z0, where K is a hyperparameter indicating the total number of segments, k ∈{1, · · · , K}, tk = k/K, and σ(t) is the noise schedule.",
       "zh": "然后计算分段概率路径的起点 ztk−1 = √（1 −σ2(tk−1)）z1 + σ(tk−1)z0，其中 K 是表示总分段数的超参数，k ∈{1, · · · , K}，tk = k/K，σ(t) 为噪声调度。"
      },
      {
       "id": "s-C-3-2",
       "original": "The teacher solver only needs to infer the endpoint of this segmented path, ˆztk = ϕθ(ztk−1, tk−1, tk), with a remarkably smaller number of iterations bT, comparing to that of a full trajectory, T.",
       "zh": "教师求解器只需推理该分段路径的终点 ẑtk = ϕθ(ztk−1, tk−1, tk)，其迭代次数 bT 相比完整轨迹的 T 显著减少。"
      },
      {
       "id": "s-C-3-3",
       "original": "Finally, the student model is optimized on the segmented trajectory from ztk−1 to ˆztk.",
       "zh": "最后，学生模型在从 ztk−1 到 ẑtk 的分段轨迹上优化。"
      },
      {
       "id": "s-C-3-4",
       "original": "We set T to 25 and bT to 8, achieving a non-negligible acceleration of the training process.",
       "zh": "我们把 T 设为 25、bT 设为 8，实现了不可忽视的训练加速。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-D",
   "num": "D",
   "level": 1,
   "page": 15,
   "title": {
    "original": "Details about Data and Model Scaling Experiments Training Corpus.",
    "zh": "附录 D：数据与模型规模实验详情——训练语料"
   },
   "blocks": [
    {
     "id": "p-D-1",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-D-1-1",
       "original": "The data/model scalability is crucial for practical TTS systems.",
       "zh": "数据/模型可扩展性对实用的 TTS 系统至关重要。"
      },
      {
       "id": "s-D-1-2",
       "original": "To evaluate the scalability of MegaTTS 3 in Section 4.6, we construct a 600kh internal multilingual training corpus comprising both English and Chinese speech.",
       "zh": "为了在 Section 4.6 中评估 MegaTTS 3 的可扩展性，我们构建了一个 600kh 的内部多语言训练语料，同时包含英语与中文语音。"
      },
      {
       "id": "s-D-1-3",
       "original": "Most of the audiobook recordings are crawled from YouTube and online podcasts like novelfm5.",
       "zh": "大部分有声书录音爬取自 YouTube 和 novelfm 等在线播客（见脚注 5）。"
      },
      {
       "id": "s-D-1-4",
       "original": "We also include the academic datasets like LibriLight (Kahn et al., 2020), WenetSpeech (Zhang et al., 2022), and GigaSpeech (Chen et al., 2021).",
       "zh": "我们还纳入了 LibriLight（Kahn et al., 2020）、WenetSpeech（Zhang et al., 2022）和 GigaSpeech（Chen et al., 2021）等学术数据集。"
      },
      {
       "id": "s-D-1-5",
       "original": "Since the crawled corpus may contain unlabelled 5https://novelfm.changdunovel.com/ speeches.",
       "zh": "由于爬取的语料可能包含未标注的语音（此处混入脚注 5：https://novelfm.changdunovel.com/）。"
      },
      {
       "id": "s-D-1-6",
       "original": "We transcribe them using an internal ASR model.",
       "zh": "我们用一个内部 ASR 模型对它们进行转写。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-test-set",
   "num": null,
   "level": 2,
   "page": 16,
   "title": {
    "original": "Test Set.",
    "zh": "测试集"
   },
   "blocks": [
    {
     "id": "p-test-set-1",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-test-set-1-1",
       "original": "Most prior studies of zero-shot TTS evaluate performances using the reading-style LibriSpeech test set, which may be different from real-world speech generation scenarios.",
       "zh": "大多数此前的零样本 TTS 研究都使用朗读风格的 LibriSpeech 测试集评估性能，这可能与真实世界的语音生成场景不同。"
      },
      {
       "id": "s-test-set-1-2",
       "original": "In section 4.6, we evaluate our model using the test sets collected from various sources, including: 1) CommonVoice (Ardila et al., 2019), a large voice corpus containing noisy speeches from various scenarios; 2) RAVDESS (Livingstone and Russo, 2018), an emotional TTS dataset featuring 8 emotions and 2 emotional intensity.",
       "zh": "在 Section 4.6 中，我们用来自多种来源的测试集评估模型，包括：1）CommonVoice（Ardila et al., 2019），一个包含多种场景下带噪语音的大型语音语料库；2）RAVDESS（Livingstone and Russo, 2018），一个含 8 种情绪和 2 种情绪强度的情感 TTS 数据集。"
      },
      {
       "id": "s-test-set-1-3",
       "original": "We follow Ju et al. (2024) and use strong-intensity samples to validate the model’s ability to handle emotional variance; 3) LibriTTS (Zen et al., 2019), a high-quality speech corpus; 4) we collect samples from videos, movies, and animations to test whether our model can simulate timbres with distinctly strong individual characteristics.",
       "zh": "我们遵循 Ju et al.（2024）的做法，使用强情绪强度样本验证模型处理情绪变化的能力；3）LibriTTS（Zen et al., 2019），一个高质量语音语料库；4）我们从视频、电影和动画中收集样本，测试模型能否模拟个性特征鲜明的音色。"
      },
      {
       "id": "s-test-set-1-4",
       "original": "The test set consists of 40 audio samples extracted from each source.",
       "zh": "测试集由每个来源各抽取 40 个音频样本组成。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-experimental-setup",
   "num": null,
   "level": 2,
   "page": 16,
   "title": {
    "original": "Experimental Setup",
    "zh": "实验设置"
   },
   "blocks": [
    {
     "id": "p-experimental-setup-1",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-experimental-setup-1-1",
       "original": "We scale up MegaTTS 3 from 0.5B to 7.0B following the hyper-parameter settings in Qwen 2 (Yang et al., 2024a).",
       "zh": "我们遵循 Qwen 2（Yang et al., 2024a）的超参数设置，把 MegaTTS 3 从 0.5B 扩展到 7.0B。"
      },
      {
       "id": "s-experimental-setup-1-2",
       "original": "In this experiment, we only increase the parameters of the MegaTTS 3 model to verify its scalability.",
       "zh": "在本实验中，我们只增大 MegaTTS 3 模型的参数量来验证其可扩展性。"
      },
      {
       "id": "s-experimental-setup-1-3",
       "original": "The parameters of the speech compression VAE remained unchanged.",
       "zh": "语音压缩 VAE 的参数保持不变。"
      },
      {
       "id": "s-experimental-setup-1-4",
       "original": "In theory, expanding the parameters of both models could yield the optimal results, which we leave for future work.",
       "zh": "理论上，同时扩大两个模型的参数量可能得到最优结果，我们把这一点留作未来工作。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-speech-text-alignment-labels-for",
   "num": null,
   "level": 2,
   "page": 16,
   "title": {
    "original": "Speech-Text Alignment Labels for Large-Scale",
    "zh": "大规模数据的语音-文本对齐标签"
   },
   "blocks": [
    {
     "id": "p-speech-text-alignment-labels-for-1",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-speech-text-alignment-labels-for-1-1",
       "original": "Data.",
       "zh": "数据。（本句为章节标题「Speech-Text Alignment Labels for Large-Scale Data」跨页截断的尾部残词）"
      }
     ]
    },
    {
     "id": "p-speech-text-alignment-labels-for-2",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-speech-text-alignment-labels-for-2-1",
       "original": "Training an MFA model directly on a 600khour dataset is impractical.",
       "zh": "直接在 600k 小时的数据集上训练一个 MFA 模型是不现实的。"
      },
      {
       "id": "s-speech-text-alignment-labels-for-2-2",
       "original": "Therefore, we randomly sampled a 10k-hour subset from the dataset to train a robust MFA model, which is then used to align the full dataset.",
       "zh": "因此，我们从数据集中随机抽取 10k 小时的子集训练一个鲁棒的 MFA 模型，再用它来对齐全量数据集。"
      },
      {
       "id": "s-speech-text-alignment-labels-for-2-3",
       "original": "Since data processing inherently requires some alignment model (such as an ASR model) for speech segmentation, using a pretrained MFA model for alignment extraction does not limit the system’s data scalability.",
       "zh": "由于数据处理本身就需要某种对齐模型（如 ASR 模型）来做语音切分，使用预训练的 MFA 模型提取对齐并不会限制系统的数据可扩展性。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-results",
   "num": null,
   "level": 2,
   "page": 16,
   "title": {
    "original": "Results",
    "zh": "结果"
   },
   "blocks": [
    {
     "id": "p-results-1",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-results-1-1",
       "original": "We evaluate the effectiveness of data and model scaling for the proposed MegaTTS 3 model.",
       "zh": "我们评估了 MegaTTS 3 模型的数据与模型规模扩展效果。"
      },
      {
       "id": "s-results-1-2",
       "original": "In this experiment, we train models with 0.5B parameters on multilingual internal datasets with data sizes of 2kh, 40kh, 200kh, and 600kh, respectively.",
       "zh": "本实验中，我们在 2kh、40kh、200kh、600kh 四种数据规模的多语种内部数据集上训练 0.5B 参数模型。"
      },
      {
       "id": "s-results-1-3",
       "original": "We also train models with 0.5B, 1.5B, and 7.0B parameters on the 600kh dataset.",
       "zh": "我们还在 600kh 数据集上训练了 0.5B、1.5B 与 7.0B 参数的模型。"
      },
      {
       "id": "s-results-1-4",
       "original": "We evaluate the zero-shot TTS performance in terms of speaker similarity (Sim-O) and speech intelligibility (WER) on Setting SIM-O↑ WER↓ 2kh",
       "zh": "我们在零样本 TTS 上评估说话人相似度（Sim-O）与语音可懂度（WER）（表头：Setting / SIM-O↑ / WER↓——2kh，后续照原文）。"
      }
     ]
    },
    {
     "id": "eq-results-1",
     "type": "equation",
     "page": 16,
     "original": "0.52 4.27%"
    },
    {
     "id": "eq-results-2",
     "type": "equation",
     "page": 16,
     "original": "40kh"
    },
    {
     "id": "eq-results-3",
     "type": "equation",
     "page": 16,
     "original": "0.63 2.98%"
    },
    {
     "id": "eq-results-4",
     "type": "equation",
     "page": 16,
     "original": "200kh"
    },
    {
     "id": "eq-results-5",
     "type": "equation",
     "page": 16,
     "original": "0.65 2.34%"
    },
    {
     "id": "eq-results-6",
     "type": "equation",
     "page": 16,
     "original": "600kh"
    },
    {
     "id": "eq-results-7",
     "type": "equation",
     "page": 16,
     "original": "0.66 2.10%"
    },
    {
     "id": "eq-results-8",
     "type": "equation",
     "page": 16,
     "original": "0.5B"
    },
    {
     "id": "eq-results-9",
     "type": "equation",
     "page": 16,
     "original": "0.66 2.10%"
    },
    {
     "id": "eq-results-10",
     "type": "equation",
     "page": 16,
     "original": "1.5B"
    },
    {
     "id": "eq-results-11",
     "type": "equation",
     "page": 16,
     "original": "0.72 1.98%"
    },
    {
     "id": "eq-results-12",
     "type": "equation",
     "page": 16,
     "original": "7.0B"
    },
    {
     "id": "eq-results-13",
     "type": "equation",
     "page": 16,
     "original": "0.74 1.90%"
    },
    {
     "id": "tab-results-1",
     "type": "table_caption",
     "page": 16,
     "original": "Table 8: Results of data and model scaling experiments.",
     "zh": "表 8：数据与模型规模实验的结果。"
    },
    {
     "id": "p-results-2",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-results-2-1",
       "original": "an internal test set consisting of 400 speech samples from various sources.",
       "zh": "评测在一个包含来自多种来源的 400 条语音样本的内部测试集上进行。"
      },
      {
       "id": "s-results-2-2",
       "original": "Based on Table 8, we conclude that: 1) as the data size increases from 2kh to 600kh, both the model’s speaker similarity and speech intelligibility improve consistently, demonstrating strong data scalability of our model; 2) as the model size scales from 0.5B to 7.0B parameters, SIM-O improves by 12.1% and WER decreases by 9.52%, validating the model scalability of MegaTTS 3.",
       "zh": "基于 Table 8，我们得出结论：1）随着数据规模从 2kh 增加到 600kh，模型的说话人相似度与语音可懂度都持续提升，表明我们的模型具有很强的数据可扩展性；2）随着模型规模从 0.5B 扩展到 7.0B 参数，SIM-O 提升了 12.1%，WER 下降了 9.52%，验证了 MegaTTS 3 的模型可扩展性。"
      },
      {
       "id": "s-results-2-3",
       "original": "Additionally, we find that increasing the model parameters enhances its paralinguistic capabilities, with specific audio examples available on the demo page.",
       "zh": "此外，我们发现增大模型参数量还能增强其副语言能力，具体音频样例见演示页面。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-E",
   "num": "E",
   "level": 1,
   "page": 16,
   "title": {
    "original": "Duration Controllability of MegaTTS 3",
    "zh": "附录 E：MegaTTS 3 的时长可控性"
   },
   "blocks": [
    {
     "id": "p-E-1",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-E-1-1",
       "original": "In this section, we aim to verify MegaTTS 3’s duration control capabilities through case studies.",
       "zh": "在本节中，我们旨在通过案例研究验证 MegaTTS 3 的时长控制能力。"
      },
      {
       "id": "s-E-1-2",
       "original": "We randomly selected a speech prompt from the test set and used the sentence “Notably, raising questions about both the size of the perimeter and efforts to sweep and secure.” as the target sentence to generate speeches.",
       "zh": "我们从测试集中随机选取一段语音提示，并用「Notably, raising questions about both the size of the perimeter and efforts to sweep and secure.」作为目标句子来生成语音。"
      },
      {
       "id": "s-E-1-3",
       "original": "In the generation process, we first control the sentence-level duration by multiplying the time coordinates of the phoneme anchors described in Section 3.2 by a fixed value.",
       "zh": "在生成过程中，我们首先把 Section 3.2 所述音素锚点的时间坐标乘以一个固定值，从而控制句级时长。"
      },
      {
       "id": "s-E-1-4",
       "original": "As shown in Figure 4, our MegaTTS 3 demonstrates good sentence-level duration control.",
       "zh": "如 Figure 4 所示，我们的 MegaTTS 3 展现出良好的句级时长控制能力。"
      },
      {
       "id": "s-E-1-5",
       "original": "Moreover, our MegaTTS 3 is also capable of fine-grained phoneme-level duration control.",
       "zh": "此外，我们的 MegaTTS 3 还能进行细粒度的音素级时长控制。"
      },
      {
       "id": "s-E-1-6",
       "original": "As illustrated in Figure 5, we multiplied the anchor coordinates of the phoneme within the red box by a fixed value while keeping the relative positions of other phoneme anchors unchanged.",
       "zh": "如 Figure 5 所示，我们把红框内音素的锚点坐标乘以一个固定值，同时保持其他音素锚点的相对位置不变。"
      },
      {
       "id": "s-E-1-7",
       "original": "The figure shows that our MegaTTS 3 also exhibits good finegrained phoneme-level duration controllability.",
       "zh": "图中显示，我们的 MegaTTS 3 同样展现出良好的音素级细粒度时长可控性。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-F",
   "num": "F",
   "level": 1,
   "page": 16,
   "title": {
    "original": "Visualization of Attention Matrices",
    "zh": "附录 F：注意力矩阵可视化"
   },
   "blocks": [
    {
     "id": "p-F-1",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-F-1-1",
       "original": "We visualize the attention matrices from all layers in the 1.4B MegaTTS 3 model, using 8 sampling steps.",
       "zh": "我们可视化了 1.4B 的 MegaTTS 3 模型在 8 步采样下所有层的注意力矩阵。"
      },
      {
       "id": "s-F-1-2",
       "original": "From Figure 6, we observe: 1) within the same layer, despite different timesteps, the at-",
       "zh": "从 Figure 6 中我们观察到：1）在同一层内，尽管时间步不同，注意力矩阵（接下一句）"
      }
     ]
    },
    {
     "id": "fig-F-1",
     "type": "figure_caption",
     "page": 17,
     "original": "Figure 4: Sentence-level duration control.",
     "zh": "图 4：句级时长控制。"
    },
    {
     "id": "fig-F-2",
     "type": "figure_caption",
     "page": 17,
     "original": "Figure 5: Phoneme-level duration control.",
     "zh": "图 5：音素级时长控制。"
    },
    {
     "id": "p-F-2",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-F-2-1",
       "original": "(a) Layer 8 with different timesteps.",
       "zh": "（本句为图 6 子图标题：）(a) 第 8 层在不同时间步下的情况。"
      },
      {
       "id": "s-F-2-2",
       "original": "(b) Layer 16 with different timesteps.",
       "zh": "（本句为图 6 子图标题：）(b) 第 16 层在不同时间步下的情况。"
      },
      {
       "id": "s-F-2-3",
       "original": "(c) Layer 27 with different timesteps.",
       "zh": "（本句为图 6 子图标题：）(c) 第 27 层在不同时间步下的情况。"
      }
     ]
    },
    {
     "id": "fig-F-3",
     "type": "figure_caption",
     "page": 17,
     "original": "Figure 6: Visualization of Attention Matrices from different layers in MegaTTS 3.",
     "zh": "图 6：MegaTTS 3 不同层的注意力矩阵可视化。"
    },
    {
     "id": "p-F-3",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-F-3-1",
       "original": "tention matrices remain identical.",
       "zh": "保持一致。换句话说，每一层的功能在不同时间步之间保持一致；2）Transformer 各层的功能可以分为三类。"
      },
      {
       "id": "s-F-3-2",
       "original": "In other words, the function of each layer stays consistent across timesteps; 2) the functions of the transformer layers can be categorized into three types.",
       "zh": "换言之，每层的功能在不同时间步之间保持一致；2）Transformer 各层的功能可分为三类。"
      },
      {
       "id": "s-F-3-3",
       "original": "As shown in Figure 6 (a), the bottom layers handle text and audio feature extraction; in Figure 6 (b), the middle layers focus on speech-text alignment; and in",
       "zh": "Figure 6 (c) 中，顶层则对目标潜在特征进行细化。"
      }
     ]
    },
    {
     "id": "fig-F-4",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "fig-F-4-s1",
       "original": "Figure 6 (c), the top layers refine the target latent features.",
       "zh": "（抽取残块：「Figure 6 (c), the top layers refine the target latent features.」——图 6 (c) 中，顶层对目标潜在特征进行细化。）"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-G",
   "num": "G",
   "level": 1,
   "page": 17,
   "title": {
    "original": "About Different Lengths of Context",
    "zh": "附录 G：关于不同长度的上下文"
   },
   "blocks": [
    {
     "id": "p-G-1",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-G-1-1",
       "original": "An imbalanced distribution of prompt and target lengths during training can lead to unstable generation performance during inference.",
       "zh": "训练时提示与目标长度分布不均衡会导致推理时生成性能不稳定。"
      },
      {
       "id": "s-G-1-2",
       "original": "For example, Method MCD↓ SSIM↑ STOI↑ GPE↓ VDE↓ FFE↓ Ours w/ Sparse Alignment",
       "zh": "例如（表头：Method / MCD↓ / SSIM↑ / STOI↑ / GPE↓ / VDE↓ / FFE↓——Ours w/ Sparse Alignment，后续照原文）。"
      }
     ]
    },
    {
     "id": "eq-G-1",
     "type": "equation",
     "page": 17,
     "original": "4.56 0.52 0.62 0.34 0.30 0.35"
    },
    {
     "id": "eq-G-2",
     "type": "equation",
     "page": 17,
     "original": "Ours w/ Forced Alignment"
    },
    {
     "id": "eq-G-3",
     "type": "equation",
     "page": 17,
     "original": "4.62 0.45 0.62 0.42 0.34 0.40"
    },
    {
     "id": "eq-G-4",
     "type": "equation",
     "page": 17,
     "original": "Ours w/ Standard CFG"
    },
    {
     "id": "eq-G-5",
     "type": "equation",
     "page": 17,
     "original": "4.59 0.51 0.61 0.36 0.32 0.37"
    },
    {
     "id": "eq-G-6",
     "type": "equation",
     "page": 17,
     "original": "Ours w/ Standard AR Duration"
    },
    {
     "id": "eq-G-7",
     "type": "equation",
     "page": 17,
     "original": "4.58 0.50 0.62 0.36 0.31 0.36"
    },
    {
     "id": "tab-G-1",
     "type": "table_caption",
     "page": 18,
     "original": "Table 9: Comparisons about “expressiveness” metrics on the LibriSpeech test-clean set.",
     "zh": "表 9：LibriSpeech test-clean 集上「表现力」指标的对比。"
    },
    {
     "id": "p-G-2",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-G-2-1",
       "original": "Model - with Longer Texts WER↓ SIM-O↑ VoiceCraft",
       "zh": "表头：Model - with Longer Texts / WER↓ / SIM-O↑——VoiceCraft（后续照原文）。"
      }
     ]
    },
    {
     "id": "eq-G-8",
     "type": "equation",
     "page": 18,
     "original": "12.81% 0.62"
    },
    {
     "id": "eq-G-9",
     "type": "equation",
     "page": 18,
     "original": "CosyVoice"
    },
    {
     "id": "eq-G-10",
     "type": "equation",
     "page": 18,
     "original": "5.52% 0.68"
    },
    {
     "id": "eq-G-11",
     "type": "equation",
     "page": 18,
     "original": "MegaTTS 3"
    },
    {
     "id": "eq-G-12",
     "type": "equation",
     "page": 18,
     "original": "2.39% 0.70"
    },
    {
     "id": "eq-G-13",
     "type": "equation",
     "page": 18,
     "original": "Model - with Short Texts WER↓ SIM-O↑ VoiceCraft"
    },
    {
     "id": "eq-G-14",
     "type": "equation",
     "page": 18,
     "original": "4.07% 0.58"
    },
    {
     "id": "eq-G-15",
     "type": "equation",
     "page": 18,
     "original": "CosyVoice"
    },
    {
     "id": "eq-G-16",
     "type": "equation",
     "page": 18,
     "original": "2.24% 0.62"
    },
    {
     "id": "eq-G-17",
     "type": "equation",
     "page": 18,
     "original": "MegaTTS 3"
    },
    {
     "id": "eq-G-18",
     "type": "equation",
     "page": 18,
     "original": "1.82% 0.71"
    },
    {
     "id": "tab-G-2",
     "type": "table_caption",
     "page": 18,
     "original": "Table 10: Comparisons with longer texts.",
     "zh": "表 10：更长文本上的对比。"
    },
    {
     "id": "p-G-3",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-G-3-1",
       "original": "if the majority of the sampled data during training consists of 20-second targets, the generation performance for audio with a 40-second target will be worse than that of 20-second targets in inference.",
       "zh": "如果训练中采样到的数据大多是 20 秒目标，那么推理时对 40 秒目标音频的生成性能就会比 20 秒目标差。"
      },
      {
       "id": "s-G-3-2",
       "original": "To solve the imbalanced distribution issue, we recommend using the following multi-sentence data sampling strategy: we concatenate all audio recordings of the same speaker in the dataset in time order, and then randomly extract audio segments of length t ∼U(tmin, tmax) from the concatenated audio, where tmin is the minimum sampling time and tmax is the maximum sampling time.",
       "zh": "为解决这种分布不均衡问题，我们推荐如下多句子数据采样策略：把数据集中同一说话人的所有录音按时间顺序拼接，然后从拼接后的音频中随机抽取长度为 t ∼U(tmin, tmax) 的音频段，其中 tmin 为最小采样时长，tmax 为最大采样时长。"
      },
      {
       "id": "s-G-3-3",
       "original": "Then, following Section 3.1, we randomly divide the sampled sequence into a prompt region and a target region.",
       "zh": "然后，按照 Section 3.1 的做法，把采样到的序列随机划分为提示区和目标区。"
      },
      {
       "id": "s-G-3-4",
       "original": "Although we do not use this strategy in our experiments in order to make a fair comparison with other methods, this strategy is effective in practical scenarios.",
       "zh": "尽管为了与其他方法公平比较，我们在实验中并未使用这一策略，但它在实际场景中是有效的。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-H",
   "num": "H",
   "level": 1,
   "page": 18,
   "title": {
    "original": "Experiments of Prosodic Naturalness for Zero-Shot TTS",
    "zh": "附录 H：零样本 TTS 的韵律自然度实验"
   },
   "blocks": [
    {
     "id": "p-H-1",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-H-1-1",
       "original": "We also conduct the ablation studies using the objective metrics MCD, SSIM, STOI, GPE, VDE, and FFE following InstructTTS (Yang et al., 2024c) to evaluate the prosodic naturalness of our proposed method.",
       "zh": "我们还遵循 InstructTTS（Yang et al., 2024c），使用客观指标 MCD、SSIM、STOI、GPE、VDE 和 FFE 做了消融实验，以评估所提方法的韵律自然度。"
      },
      {
       "id": "s-H-1-2",
       "original": "We conduct experiments on the LibriSpeech test-clean 2.2-hour subset (following the setup in VALL-E 2 and Voicebox).",
       "zh": "我们在 LibriSpeech test-clean 的 2.2 小时子集上开展实验（遵循 VALL-E 2 和 Voicebox 的设置）。"
      },
      {
       "id": "s-H-1-3",
       "original": "The results are shown in the Table below.",
       "zh": "结果见下表。"
      },
      {
       "id": "s-H-1-4",
       "original": "We compare MegaTTS 3 with the following baselines: 1) “Ours w/ Forced Alignment”, we replace the sparse alignment with the forced alignment; 2) “Ours w/ Standard CFG”, we replace the multi-condition CFG with standard CFG; 3) “Ours w/ Standard AR Duration”, we replace the duration from F-LM with the duration from standard AR duration predictor following SimpleSpeech 2 (Yang et al., 2024b).",
       "zh": "我们把 MegaTTS 3 与以下基线比较：1）「Ours w/ Forced Alignment」：把稀疏对齐替换为强制对齐；2）「Ours w/ Standard CFG」：把多条件 CFG 替换为标准 CFG；3）「Ours w/ Standard AR Duration」：遵循 SimpleSpeech 2（Yang et al., 2024b），把 F-LM 的时长替换为标准自回归时长预测器的时长。"
      },
      {
       "id": "s-H-1-5",
       "original": "The results in Table 9 show that sparse alignment brings significant improvements, and both multi-condition CFG and F-LM duration contribute positively to the performance.",
       "zh": "Table 9 的结果表明，稀疏对齐带来了显著提升，多条件 CFG 与 F-LM 时长也都对性能有正向贡献。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-I",
   "num": "I",
   "level": 1,
   "page": 18,
   "title": {
    "original": "Experiments with Longer Samples",
    "zh": "附录 I：更长样本的实验"
   },
   "blocks": [
    {
     "id": "p-I-1",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-I-1-1",
       "original": "To directly compare MegaTTS 3’s robustness to long sequences against other AR models, we have conducted experiemnts for a test set with longer samples.",
       "zh": "为了直接把 MegaTTS 3 对长序列的鲁棒性与其他自回归模型对比，我们在一个含更长样本的测试集上做了实验。"
      },
      {
       "id": "s-I-1-2",
       "original": "Specifically, we randomly select 10 sentences, each containing more than 50 words.",
       "zh": "具体来说，我们随机选取 10 个句子，每个句子都超过 50 个词。"
      },
      {
       "id": "s-I-1-3",
       "original": "For each speaker in the LibriSpeech test-clean set, we randomly chose a 3-second clip as a prompt, resulting in 400 target samples in total.",
       "zh": "对 LibriSpeech test-clean 集中的每位说话人，我们随机选取一段 3 秒片段作为提示，共得到 400 个目标样本。"
      },
      {
       "id": "s-I-1-4",
       "original": "To make our results more convincing, we include strongperforming TTS models, VoiceCraft (Peng et al., 2024) and CosyVoice (AR+NAR) (Du et al., 2024), as our baselines.",
       "zh": "为使结果更有说服力，我们纳入了表现强劲的 TTS 模型 VoiceCraft（Peng et al., 2024）和 CosyVoice（AR+NAR）（Du et al., 2024）作为基线。"
      },
      {
       "id": "s-I-1-5",
       "original": "The results for longer samples are presented in Table 10.",
       "zh": "更长样本的结果见 Table 10。"
      },
      {
       "id": "s-I-1-6",
       "original": "As shown, compared to the baseline systems, MegaTTS 3 does not exhibit a significant decline in speech intelligibility when generating longer sentences, illustrating the effectiveness of the combination of F-LM and MegaTTS",
       "zh": "如图所示，与基线系统相比，MegaTTS 3 在生成更长句子时可懂度没有明显下降，说明 F-LM 与 MegaTTS 3 的组合是有效的。"
      }
     ]
    },
    {
     "id": "eq-I-1",
     "type": "equation",
     "page": 18,
     "original": "3."
    }
   ]
  },
  {
   "id": "sec-J",
   "num": "J",
   "level": 1,
   "page": 18,
   "title": {
    "original": "Experiments with Hard Sentences",
    "zh": "附录 J：难句实验"
   },
   "blocks": [
    {
     "id": "p-J-1",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-J-1-1",
       "original": "The transcriptions on the LibriSpeech test-clean set are relatively simple since they come from audiobooks.",
       "zh": "LibriSpeech test-clean 集上的转写相对简单，因为它们来自有声书。"
      },
      {
       "id": "s-J-1-2",
       "original": "To further indicate the speech intelligibility Model WER↓ Substitution↓ Deletion↓ Insertion↓ E2-TTS",
       "zh": "为进一步说明语音可懂度（表头：Model / WER↓ / Substitution↓ / Deletion↓ / Insertion↓——E2-TTS，后续照原文）。"
      }
     ]
    },
    {
     "id": "eq-J-1",
     "type": "equation",
     "page": 18,
     "original": "8.49% 3.65% 4.75% 0.09%"
    },
    {
     "id": "eq-J-2",
     "type": "equation",
     "page": 18,
     "original": "F5-TTS"
    },
    {
     "id": "eq-J-3",
     "type": "equation",
     "page": 18,
     "original": "4.28% 1.78% 2.28% 0.22%"
    },
    {
     "id": "eq-J-4",
     "type": "equation",
     "page": 18,
     "original": "MegaTTS 3"
    },
    {
     "id": "eq-J-5",
     "type": "equation",
     "page": 18,
     "original": "3.95% 1.80% 2.07% 0.08%"
    },
    {
     "id": "tab-J-1",
     "type": "table_caption",
     "page": 19,
     "original": "Table 11: Comparisons with hard sentences. The results of the baselines are infered from offical checkpoints.",
     "zh": "表 11：难句上的对比。基线结果由官方 checkpoint 推理得到。"
    },
    {
     "id": "p-J-2",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-J-2-1",
       "original": "of different methods, we evaluate our model on the challenging set containing 100 difficult textual patterns from ELLA-V (Song et al., 2024).",
       "zh": "我们在来自 ELLA-V（Song et al., 2024）的包含 100 个困难文本模式的挑战性集合上评估了我们的模型。"
      },
      {
       "id": "s-J-2-2",
       "original": "Since the speech prompts used by ELLA-V are not publicly available, we randomly sample 3-second-long speeches in the LibriSpeech test-clean set as speech prompts.",
       "zh": "由于 ELLA-V 所用的语音提示未公开，我们随机抽取 LibriSpeech test-clean 集中 3 秒长的语音作为语音提示。"
      },
      {
       "id": "s-J-2-3",
       "original": "For this evaluation, we used the official checkpoint of F5-TTS (Chen et al., 2024b) and the E2-TTS (Eskimez et al., 2024) inference API provided on F5-TTS’s Hugging Face page.",
       "zh": "本次评测中，我们使用了 F5-TTS（Chen et al., 2024b）的官方 checkpoint，以及 F5-TTS Hugging Face 页面上提供的 E2-TTS（Eskimez et al., 2024）推理 API。"
      },
      {
       "id": "s-J-2-4",
       "original": "We employ Whisper-large-v3 for WER calculation.",
       "zh": "我们使用 Whisper-large-v3 计算 WER。"
      },
      {
       "id": "s-J-2-5",
       "original": "Based on the results presented in Table 11, our model shows stronger robustness against hard transcriptions.",
       "zh": "基于 Table 11 的结果，我们的模型对困难文本展现出更强的鲁棒性。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-K",
   "num": "K",
   "level": 1,
   "page": 19,
   "title": {
    "original": "Additional Details for Multi-Condition CFG",
    "zh": "附录 K：多条件 CFG 的补充细节"
   },
   "blocks": [
    {
     "id": "p-K-1",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-K-1-1",
       "original": "In Section 3.2, regarding the multi-condition CFG technique, the experimental setup for the preliminary experiment for accent control is: fixing αspk at 2.5 and varying αtxt from 1.0 to 6.0.",
       "zh": "在 Section 3.2 中，关于多条件 CFG 技术，口音控制预实验的实验设置为：固定 αspk 为 2.5，把 αtxt 从 1.0 变化到 6.0。"
      },
      {
       "id": "s-K-1-2",
       "original": "Specifically, as αtxt increases from 1.0 to 1.5, the generated speeches contains improper pronunciations and distortions.",
       "zh": "具体来说，当 αtxt 从 1.0 增大到 1.5 时，生成的语音包含不恰当的发音和失真。"
      },
      {
       "id": "s-K-1-3",
       "original": "When αtxt ranges from 1.5 to 2.5, the pronunciations align with the speaker’s accent.",
       "zh": "当 αtxt 在 1.5 到 2.5 之间时，发音与说话人的口音一致。"
      },
      {
       "id": "s-K-1-4",
       "original": "Finally, once αtxt exceeds 4.0, the generated speech converges toward the standard pronunciation of the target language.",
       "zh": "最后，一旦 αtxt 超过 4.0，生成的语音会收敛到目标语言的标准发音。"
      },
      {
       "id": "s-K-1-5",
       "original": "Notably, the optimal values for parameters αtxt and αspk may vary across different models.",
       "zh": "值得注意的是，参数 αtxt 和 αspk 的最优值在不同模型之间可能不同。"
      },
      {
       "id": "s-K-1-6",
       "original": "The values reported here are specific to the model used in our experiments.",
       "zh": "此处报告的数值是专门针对我们实验中所用模型的。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-L",
   "num": "L",
   "level": 1,
   "page": 19,
   "title": {
    "original": "Ethics Statement",
    "zh": "附录 L：伦理声明"
   },
   "blocks": [
    {
     "id": "p-L-1",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-L-1-1",
       "original": "The proposed model, MegaTTS 3, is designed to advance zero-shot TTS technologies, making it easier for users to generate personalized speech.",
       "zh": "所提模型 MegaTTS 3 旨在推动零样本 TTS 技术的发展，使用户更容易生成个性化语音。"
      },
      {
       "id": "s-L-1-2",
       "original": "When used responsibly and legally, this technique can enhance applications such as movies, games, podcasts, and various other services, contributing to increasing convenience in everyday life.",
       "zh": "在负责任且合法地使用的前提下，这项技术可以增强电影、游戏、播客等多种服务，为日常生活带来更多便利。"
      },
      {
       "id": "s-L-1-3",
       "original": "However, we acknowledge the potential risks of misuse, such as voice cloning for malicious purposes.",
       "zh": "然而，我们也意识到潜在的滥用风险，例如用于恶意目的的声音克隆。"
      },
      {
       "id": "s-L-1-4",
       "original": "To mitigate this risk, solutions like building a corresponding deepfake detection model will be considered.",
       "zh": "为缓解这一风险，我们会考虑构建相应的深度伪造（deepfake）检测模型等方案。"
      },
      {
       "id": "s-L-1-5",
       "original": "Additionally, we plan to incorporate watermarks and verification methods for synthetic audio to ensure ethical use in real-world applications.",
       "zh": "此外，我们计划为合成音频引入水印和验证方法，以确保其在真实应用中被合乎伦理地使用。"
      },
      {
       "id": "s-L-1-6",
       "original": "Restrictions will also be included in the licensing of our project to further prevent misuse.",
       "zh": "我们还将在项目的许可协议中加入限制条款，以进一步防止滥用。"
      },
      {
       "id": "s-L-1-7",
       "original": "By addressing these ethical concerns, we aim to contribute to the development of responsible and beneficial AI technologies, while remaining conscious of the potential risks and societal impact.",
       "zh": "通过回应这些伦理关切，我们希望在推动负责任且有益的 AI 技术发展的同时，始终意识到潜在的风险与社会影响。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-M",
   "num": "M",
   "level": 1,
   "page": 19,
   "title": {
    "original": "Reproducibility Statement",
    "zh": "附录 M：可复现性声明"
   },
   "blocks": [
    {
     "id": "p-M-1",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-M-1-1",
       "original": "We have taken several steps to ensure the reproducibility of the experiments and results presented in this paper: 1) the architecture and algorithm of the MegaTTS 3 model are described in Section 3 and and relevant hyperparameters are fully described in Appendix A.1; 2) The evaluation metrics, including WER, SIM-O, MCD (dB), the moments of the pitch distribution, alignment error, CMOS, SMOS, and ASMOS, are described in detail in Section 4.1; 3) For most of the key experiments, we utilize publicly available datasets such as LibriLight, LibriSpeech, and L2Arctic.",
       "zh": "我们采取了若干措施来保证本文实验与结果的可复现性：1）MegaTTS 3 模型的架构与算法见 Section 3，相关超参数在 Appendix A.1 中有完整描述；2）评测指标（包括 WER、SIM-O、MCD (dB)、音高分布各阶矩、对齐错误、CMOS、SMOS 和 ASMOS）在 Section 4.1 中有详细介绍；3）在大多数关键实验中，我们使用 LibriLight、LibriSpeech 和 L2-ARCTIC 等公开数据集。"
      },
      {
       "id": "s-M-1-2",
       "original": "The selection of the test sets is identical to that used in previous zero-shot TTS research.",
       "zh": "测试集的选择与此前的零样本 TTS 研究完全一致。"
      },
      {
       "id": "s-M-1-3",
       "original": "However, as the publicly available datasets are insufficient for our data scaling experiments, we construct a larger dataset, which is described in detail in Appendix D; 4) To ensure reproducibility of the results, we have carefully set random seeds in our experiments and the random seeds are provided in Appendix A.2.",
       "zh": "然而，由于公开数据集不足以支撑数据规模扩展实验，我们构建了一个更大的数据集，详见 Appendix D；4）为保证结果可复现，我们在实验中仔细设定了随机种子，随机种子见 Appendix A.2。"
      },
      {
       "id": "s-M-1-4",
       "original": "All objective results reported are based on the average performance across multiple runs.",
       "zh": "所报告的全部客观结果均为多次运行的平均性能。"
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
    "sentence_id": "s-1-8-2",
    "quote": "phoneme tokens are sparsely distributed within the corresponding forced alignment regions to provide coarse pronunciation information that is then refined by the latent DiT model"
   },
   "kind": "concept",
   "title": "稀疏对齐的核心设计",
   "explanation": "这是全文的题眼：既不像 CTA-TTS 那样把每个音素硬铺成显式时长，也不像 E2-TTS/F5-TTS 那样完全不告诉模型对齐信息，而是在强制对齐给出的区间里只放稀疏的音素锚点，把「读什么、大概何时读」作为弱条件交给 DiT 去细化。它本质上是用低成本、粗粒度的监督信号换取搜索空间自由度，可视为硬对齐与隐式对齐之间的折中工程解。",
   "featured": true
  },
  {
   "id": "ann-002",
   "anchor": {
    "sentence_id": "s-1-4-3",
    "quote": "which typically require a bit rate of 1.5 kbps"
   },
   "kind": "motivation",
   "title": "离散 codec 的码率包袱",
   "explanation": "作者在此点出放弃离散 codec 路线的动机：以 1.5 kbps 码率产生的长 token 序列让自回归语言模型不堪重负。这是从离散 token+AR 范式转向连续潜在+扩散范式的关键论据，也为后文 WaveVAE 把 1 秒语音压成 25 帧的设计埋下伏笔。",
   "featured": false
  },
  {
   "id": "ann-003",
   "anchor": {
    "sentence_id": "s-1-6-2",
    "quote": "predefined alignments constrain the model’s search space to produce more natural-sounding speech"
   },
   "kind": "comparison",
   "title": "预定义对齐的两难",
   "explanation": "这里把 CTA-TTS 类硬对齐路线的两条局限讲得很直白：一是把搜索空间钉死在预设对齐上，自然度天花板受限；二是整体表现被时长模型的质量绑架。稀疏对齐正是针对这两点而来——保留发音引导，但把时长决策权还给生成模型。",
   "featured": false
  },
  {
   "id": "ann-004",
   "anchor": {
    "sentence_id": "s-1-8-3",
    "quote": "with only 8 sampling steps"
   },
   "kind": "number",
   "title": "8 步采样的卖点",
   "explanation": "「仅 8 步采样即接近 SOTA」是摘要级卖点，对应 PeRFlow 蒸馏把教师模型的 25 步压到 8 步。需要注意这是在 LibriSpeech test-clean 这一相对干净的测试集上达成的，真实复杂场景下的鲁棒性要靠附录 J 的难句实验另行佐证。",
   "featured": false
  },
  {
   "id": "ann-005",
   "anchor": {
    "sentence_id": "s-1-13-1",
    "quote": "reduce the inference steps from 25 to 8"
   },
   "kind": "number",
   "title": "PeRFlow 蒸馏 25 到 8",
   "explanation": "贡献列表中的这条对应方法部分的分段修正流（PeRFlow）：把 25 步教师轨迹切成片段做分段蒸馏，学生直接学 8 步近似。文中报告质量损失很小，这类「采样步数蒸馏」正成为扩散 TTS 落地的标准动作，与图像领域的一致性模型思路同源。",
   "featured": false
  },
  {
   "id": "ann-006",
   "anchor": {
    "sentence_id": "s-3-1-3-2",
    "quote": "a one-second speech clip can be encoded into 25 vector frames"
   },
   "kind": "concept",
   "title": "WaveVAE 的 25 帧/秒",
   "explanation": "WaveVAE 把 1 秒语音编码为 25 个连续向量帧，是 MegaTTS 3 效率故事的另一半：帧率远低于常规 codec 的 50-75 Hz，且是连续表征而非离散 token，DiT 建模的序列长度因此大幅缩短。后文 Table 5 的对比也显示这一紧凑潜在空间优于 DAC/Encodec 方案。",
   "featured": true
  },
  {
   "id": "ann-007",
   "anchor": {
    "sentence_id": "s-latent-diffusion-transformer-wit-5-2",
    "quote": "with the proportion of zprompt being γ ∼U(0.1, 0.9)"
   },
   "kind": "engineering",
   "title": "提示比例随机采样",
   "explanation": "训练时把潜在序列随机切成提示区与目标区，提示比例 γ 在 [0.1, 0.9] 均匀采样。这个看似不起眼的细节让同一个模型天然支持任意长度的语音提示，推理时零样本克隆只是其特例；同时也构成对目标区重建的多尺度自监督。",
   "featured": false
  },
  {
   "id": "ann-008",
   "anchor": {
    "sentence_id": "s-multi-condition-3-3",
    "quote": "then shifting to pronouncing with the current speaker’s accent"
   },
   "kind": "connection",
   "title": "文本引导意外成口音旋钮",
   "explanation": "多条件 CFG 中，作者发现增大文本引导强度 αtxt 会让发音经历「失真→带说话人口音→目标语言标准音」的三段变化。也就是说 αtxt 不仅是常规的质量/保真旋钮，还意外成为一个连续可调的口音强度控制器——这是全文最有意思的涌现现象之一，Appendix K 给出了具体数值区间。",
   "featured": true
  },
  {
   "id": "ann-009",
   "anchor": {
    "sentence_id": "s-accented-tts-2-2",
    "quote": "it allows for flexible control over the accent intensity using the proposed multi-condition CFG mechanism"
   },
   "kind": "concept",
   "title": "无需标注的口音控制",
   "explanation": "区别于以往口音 TTS 需要成对数据或精确口音标签，MegaTTS 3 只靠多条件 CFG 的引导系数即可连续调节口音强度。这把「口音」从数据标注问题转化成了推理期超参数问题，工程上非常讨巧，但也意味着口音控制粒度完全依赖 αtxt 的经验调参。",
   "featured": false
  },
  {
   "id": "ann-010",
   "anchor": {
    "sentence_id": "s-4-5-7-3",
    "quote": "due to the fact that the latent space of our speech compression model is more compact (only 25 tokens per second)"
   },
   "kind": "comparison",
   "title": "紧凑潜在空间胜 DAC/Encodec",
   "explanation": "消融显示把 WaveVAE 换成 DAC 或 Encodec 都会变差，作者归因于自家潜在空间更紧凑（每秒仅 25 个 token）。要注意这里「token」指连续向量帧而非离散码本索引，紧凑性同时降低了 DiT 的序列长度和学习难度，是表征设计与骨干网络协同优化的典型案例。",
   "featured": false
  },
  {
   "id": "ann-011",
   "anchor": {
    "sentence_id": "s-4-6-1-6",
    "quote": "the sparse alignment strategy achieves +0.17 CMOS compared to the forced alignment strategy"
   },
   "kind": "number",
   "title": "稀疏对齐 +0.17 CMOS",
   "explanation": "关键消融数字：在其他条件完全一致时，稀疏对齐相对强制对齐在自然度上取得 +0.17 CMOS 的优势。CMOS 属主观偏好分，0.17 已是可感知差距；更重要的是这说明「放松对齐约束」确实换来了自然度，而非仅仅不损失。",
   "featured": true
  },
  {
   "id": "ann-012",
   "anchor": {
    "sentence_id": "s-4-6-1-8",
    "quote": "the CFG mechanism is crucial for MegaTTS 3"
   },
   "kind": "number",
   "title": "去掉 CFG 即崩溃",
   "explanation": "消融中去掉 CFG 后 CMOS 跌到 0.43、SMOS 跌到 3.35 量级，几乎是灾难性退化。这说明 MegaTTS 3 的音色相似度与发音质量高度依赖推理期的多条件引导，模型本体学到的条件约束并不充分——读 Table 6 时应把「w/o CFG」一栏当作系统真实短板来看。",
   "featured": true
  },
  {
   "id": "ann-013",
   "anchor": {
    "sentence_id": "s-4-6-1-4",
    "quote": "both forced alignment and sparse alignment can enhance the performance of speech synthesis models"
   },
   "kind": "comparison",
   "title": "有对齐总比没有强",
   "explanation": "消融前两组对比说明：无论强制对齐还是稀疏对齐，只要引入音素级对齐信息都会优于完全隐式的做法。这为「对齐有用」提供了证据，也把真正的争论点缩小到「对齐该多硬」，最终由 +0.17 CMOS 那组实验给出稀疏方案胜出的结论。",
   "featured": false
  },
  {
   "id": "ann-014",
   "anchor": {
    "sentence_id": "s-analysis-1-6",
    "quote": "even when the performance of the duration predictor is suboptimal (while MegaTTS 3 with forced alignment fails)"
   },
   "kind": "critique",
   "title": "鲁棒性证据藏在演示页",
   "explanation": "作者声称稀疏对齐在时长预测器不佳时仍保持高自然度、而强制对齐版本会失败——这本应是支持其核心动机最硬的证据，却只出现在演示页而无论文内的定量表格。读者无法独立验证这一关键对比，属于全文论证链上较明显的薄弱环节。",
   "featured": true
  },
  {
   "id": "ann-015",
   "anchor": {
    "sentence_id": "s-objective-metrics-1-5",
    "quote": "finetuned on the 960-hour LibriSpeech training set, to transcribe the generated speech"
   },
   "kind": "critique",
   "title": "WER 评测器自带偏差",
   "explanation": "主实验用 HuBERT-Large（LibriSpeech 960h 微调）转写合成语音来算 WER，而附录 J 难句实验又改用 Whisper-large-v3。两套 ASR 评测器口径不一致，且评测器自身在 LibriSpeech 上训练、天然偏向该域发音，跨论文比较 WER 时这一细节必须计入。",
   "featured": false
  },
  {
   "id": "ann-016",
   "anchor": {
    "sentence_id": "s-4-4-1-3",
    "quote": "We compare our MegaTTS 3 model with CTA-TTS"
   },
   "kind": "critique",
   "title": "口音实验只比一家",
   "explanation": "口音 TTS 小节只与 CTA-TTS 单一基线对比。鉴于口音可控生成本身基线稀缺，单点对比可以理解，但作者也承认 CTA-TTS 用的是「非零样本」设定，这场比较对双方都不完全公平，结论宜定性参考而非定量采信。",
   "featured": false
  },
  {
   "id": "ann-017",
   "anchor": {
    "sentence_id": "s-A-5-2-3",
    "quote": "which is a more challenging task"
   },
   "kind": "comparison",
   "title": "用更难设定自证清白",
   "explanation": "作者特意说明：直接拿自家零样本结果去比基线的非零样本（或更宽松设定）结果，等于主动选择了更难的任务。这种「给自己上难度」的对比姿态值得肯定，至少方向上不会高估 MegaTTS 3 的相对优势，读者可更放心地看待 Table 1 的领先数字。",
   "featured": false
  },
  {
   "id": "ann-018",
   "anchor": {
    "sentence_id": "s-D-1-2",
    "quote": "we construct a 600kh internal multilingual training corpus comprising both English and Chinese speech"
   },
   "kind": "number",
   "title": "60 万小时私有语料",
   "explanation": "规模扩展实验用了 60 万小时（600kh）中英内部语料——是主实验 LibriLight 60k 小时的 10 倍。这意味着论文最关键的 scalability 结论建立在无法公开复现的数据上，外部研究者只能复现「LibriLight 规模内成立」的那部分结论。",
   "featured": true
  },
  {
   "id": "ann-019",
   "anchor": {
    "sentence_id": "s-results-2-2",
    "quote": "SIM-O improves by 12.1% and WER decreases by 9.52%"
   },
   "kind": "number",
   "title": "0.5B 到 7B 的缩放收益",
   "explanation": "模型从 0.5B 扩到 7.0B，SIM-O 提升 12.1%、WER 下降 9.52%。注意这是 14 倍参数量换来的相对收益，且 WER 的绝对改善远小于参数增幅——TTS 的缩放曲线看起来比 LLM 平缓得多，性价比拐点在哪仍是开放问题。",
   "featured": true
  },
  {
   "id": "ann-020",
   "anchor": {
    "sentence_id": "s-K-1-4",
    "quote": "once αtxt exceeds 4.0"
   },
   "kind": "connection",
   "title": "口音旋钮的数值地图",
   "explanation": "Appendix K 给出 αtxt 的完整数值地图：1.0-1.5 发音失真，1.5-2.5 保留说话人口音，超过 4.0 收敛到目标语言标准音（固定 αspk=2.5）。这把抽象的「文本引导强度」变成了可操作的旋钮，但作者也提醒该数值区间只对当前 checkpoint 有效，换模型需重新标定。",
   "featured": true
  },
  {
   "id": "ann-021",
   "anchor": {
    "sentence_id": "s-G-3-4",
    "quote": "Although we do not use this strategy in our experiments"
   },
   "kind": "critique",
   "title": "有效但被弃用的策略",
   "explanation": "作者承认某个推理策略在实际场景中有效，却为了与其他方法公平对比而未在实验中使用。这类「留了一手」的表述很常见，但也提示读者：论文报告的数字是 MegaTTS 3 的下限配置，产品化部署的真实表现可能更好——反向也说明当前数字未必代表系统上限。",
   "featured": false
  },
  {
   "id": "ann-022",
   "anchor": {
    "sentence_id": "s-F-3-2",
    "quote": "the function of each layer stays consistent across timesteps; 2) the functions of the transformer layers can be categorized into three types"
   },
   "kind": "concept",
   "title": "DiT 层功能三分法",
   "explanation": "附录 F 的注意力分析发现：每层功能跨时间步保持一致，且 Transformer 层可分为三类（底层对齐文本-语音、中层建模说话人、顶层细化潜在特征）。这与 LLM 中「底层句法、中层语义、高层任务」的分层发现遥相呼应，为后续按层剪枝或分层条件注入提供了依据。",
   "featured": true
  }
 ]
};
