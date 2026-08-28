// 自动生成：2506.21619 全文双语精读数据（由 tools/compile_paper.js 装配）
// 结构/原文来自 .cache/papers/2506.21619.json（tools/extract_paper.py）；
// 翻译与讲解来自 .cache/papers/zh/2506.21619/（LLM agent 撰写）。
// 改翻译请改片段后重新装配；勿手改本文件的结构与 original 字段。
globalThis.PAPER_2506_21619 = {
 "paper_id": "2506.21619",
 "model_id": "indextts2",
 "title": {
  "original": "IndexTTS2: A Breakthrough in Emotionally Expressive and Duration-Controlled Auto-Regressive Zero-Shot Text-to-Speech",
  "zh": "IndexTTS2：兼具情感表现力与时长可控的自回归零样本文本转语音的突破"
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
       "original": "Siyi Zhou1, Yiquan Zhou1, Yi He1, Xun Zhou1, Jinchao Wang1, Wei Deng1, Jingchen Shu1 1Artificial Intelligence Platform Department, bilibili, China zhousiyi02@bilibili.com, zhouyiquan01@bilibili.com, heyi05@bilibili.com, zhouxun@bilibili.com, wangjinchao@bilibili.com, xuanwu@bilibili.com, shujingchen@bilibili.com,"
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
       "original": "Existing autoregressive large-scale text-to-speech (TTS) models have advantages in speech naturalness, but their token-by-token generation mechanism makes it difficult to precisely control the duration of synthesized speech.",
       "zh": "现有的自回归大规模文本转语音（TTS）模型在语音自然度上具有优势，但其逐 token 生成的机制使得精确控制合成语音的时长变得困难。"
      },
      {
       "id": "s-abstract-1-2",
       "original": "This becomes a significant limitation in applications requiring strict audio-visual synchronization, such as video dubbing.",
       "zh": "在要求严格音画同步的应用（如视频配音）中，这成为一项显著的局限。"
      },
      {
       "id": "s-abstract-1-3",
       "original": "This paper introduces IndexTTS2, which proposes a novel, general, and autoregressive model-friendly method for speech duration control.",
       "zh": "本文提出 IndexTTS2，给出了一种新颖、通用且对自回归模型友好的语音时长控制方法。"
      },
      {
       "id": "s-abstract-1-4",
       "original": "The method supports two generation modes: one explicitly specifies the number of generated tokens to precisely control speech duration; the other freely generates speech in an autoregressive manner without specifying the number of tokens, while faithfully reproducing the prosodic features of the input prompt.",
       "zh": "该方法支持两种生成模式：一种显式指定生成的 token 数量以精确控制语音时长；另一种不指定 token 数量、以自回归方式自由生成语音，同时忠实复现输入提示的韵律特征。"
      },
      {
       "id": "s-abstract-1-5",
       "original": "Furthermore, IndexTTS2 achieves disentanglement between emotional expression and speaker identity, enabling independent control over timbre and emotion.",
       "zh": "此外，IndexTTS2 实现了情感表达与说话人身份之间的解耦，从而可以独立控制音色与情感。"
      },
      {
       "id": "s-abstract-1-6",
       "original": "In the zero-shot setting, the model can accurately reconstruct the target timbre (from the timbre prompt) while perfectly reproducing the specified emotional tone (from the style prompt).",
       "zh": "在零样本设定下，模型能够准确重建目标音色（来自音色提示），同时完美复现指定的情感基调（来自风格提示）。"
      },
      {
       "id": "s-abstract-1-7",
       "original": "To enhance speech clarity in highly emotional expressions, we incorporate GPT latent representations and design a novel three-stage training paradigm to improve the stability of the generated speech.",
       "zh": "为增强高情感表达下的语音清晰度，我们引入 GPT 隐表征，并设计了新颖的三阶段训练范式来提升生成语音的稳定性。"
      },
      {
       "id": "s-abstract-1-8",
       "original": "Additionally, to lower the barrier for emotional control, we designed a soft instruction mechanism based on text descriptions by finetuning Qwen3, effectively guiding the generation of speech with the desired emotional orientation.",
       "zh": "此外，为降低情感控制的使用门槛，我们通过对 Qwen3 的微调设计了基于文本描述的软指令机制，有效引导模型生成具有所需情感倾向的语音。"
      },
      {
       "id": "s-abstract-1-9",
       "original": "Finally, experimental results on multiple datasets show that IndexTTS2 outperforms state-of-the-art zero-shot TTS models in terms of word error rate, speaker similarity, and emotional fidelity.",
       "zh": "最后，在多个数据集上的实验结果表明，IndexTTS2 在词错误率（WER）、说话人相似度和情感保真度方面均优于最先进的零样本 TTS 模型。"
      },
      {
       "id": "s-abstract-1-10",
       "original": "Audio samples are available at: https://index-tts.github.io/index-tts2.github.io/.",
       "zh": "音频样例见：https://index-tts.github.io/index-tts2.github.io/。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-introduction",
   "num": null,
   "level": 1,
   "page": 1,
   "title": {
    "original": "Introduction",
    "zh": "引言"
   },
   "blocks": [
    {
     "id": "p-introduction-1",
     "type": "paragraph",
     "page": 1,
     "sentences": [
      {
       "id": "s-introduction-1-1",
       "original": "Recent advances in vector quantization (van den Oord, Vinyals, and Kavukcuoglu 2017; Mentzer et al. 2023), Transformer architectures (Vaswani et al. 2017; Touvron et al. 2023), and large-scale data have enabled zero-shot TTS models to synthesize speech with timbre, prosody, and emotion from minimal audio prompts (Shen et al. 2024; Casanova et al. 2024; Du et al. 2024b).",
       "zh": "向量量化（van den Oord, Vinyals, and Kavukcuoglu 2017; Mentzer et al. 2023）、Transformer 架构（Vaswani et al. 2017; Touvron et al. 2023）以及大规模数据的最新进展，使零样本 TTS 模型能够仅凭极短的音频提示合成带有音色、韵律和情感的语音（Shen et al. 2024; Casanova et al. 2024; Du et al. 2024b）。"
      },
      {
       "id": "s-introduction-1-2",
       "original": "These models outperform traditional systems (Ren et al. 2022; Kim et al. 2020) Copyright © 2026, Association for the Advancement of Artificial Intelligence (www.aaai.org).",
       "zh": "这些模型在自然度和灵活性上超越了传统系统（Ren et al. 2022; Kim et al. 2020）（原文此处混入版權页脚文字：Copyright © 2026, Association for the Advancement of Artificial Intelligence (www.aaai.org)。"
      },
      {
       "id": "s-introduction-1-3",
       "original": "All rights reserved. in naturalness and flexibility, enabling applications like AI dubbing (Cong et al. 2025).",
       "zh": "版权所有。）等），从而支撑了 AI 配音（Cong et al. 2025）等应用。"
      },
      {
       "id": "s-introduction-1-4",
       "original": "Current TTS models are categorized into autoregressive (AR) (Sahipjohn et al. 2024; Li et al. 2025; Kim, Hong, and Choi 2023; Du et al. 2024a; Zhou et al. 2024; Chen et al. 2024a; Wang et al. 2025; Guo et al. 2024) and non-autoregressive (NAR) (Chen et al. 2025; Lee et al. 2024; Shen et al. 2024; Yang et al. 2024; Wang et al. 2024; Le et al. 2023; Eskimez et al. 2024) systems.",
       "zh": "当前的 TTS 模型可分为自回归（AR）系统（Sahipjohn et al. 2024; Li et al. 2025; Kim, Hong, and Choi 2023; Du et al. 2024a; Zhou et al. 2024; Chen et al. 2024a; Wang et al. 2025; Guo et al. 2024）与非自回归（NAR）系统（Chen et al. 2025; Lee et al. 2024; Shen et al. 2024; Yang et al. 2024; Wang et al. 2024; Le et al. 2023; Eskimez et al. 2024）两大类。"
      }
     ]
    },
    {
     "id": "p-introduction-2",
     "type": "paragraph",
     "page": 1,
     "sentences": [
      {
       "id": "s-introduction-2-1",
       "original": "AR-based zero-shot TTS models like XTTS (Casanova et al. 2024), Cosyvoice (Du et al. 2024a,b), and SparkTTS (Wang et al. 2025) show significant performance in terms of naturalness and expressiveness owing to their random sampling strategy and token-by-token generation.",
       "zh": "基于 AR 的零样本 TTS 模型，如 XTTS（Casanova et al. 2024）、Cosyvoice（Du et al. 2024a,b）和 SparkTTS（Wang et al. 2025），得益于其随机采样策略和逐 token 生成方式，在自然度和表现力上表现突出。"
      },
      {
       "id": "s-introduction-2-2",
       "original": "NAR-based models such as MaskGCT (Wang et al. 2024) and F5-TTS (Chen et al. 2024b) enable fast inference via parallel decoding and support flexible parameter control (e.g., duration) through human intervention or model autonomy.",
       "zh": "基于 NAR 的模型，如 MaskGCT（Wang et al. 2024）和 F5-TTS（Chen et al. 2024b），通过并行解码实现快速推理，并通过人工干预或模型自主来支持灵活的参数控制（例如时长）。"
      },
      {
       "id": "s-introduction-2-3",
       "original": "However, AR models face challenges in duration control due to their sequential generation nature, limiting their applicability in time-sensitive scenarios like automated dubbing.",
       "zh": "然而，AR 模型由于其顺序生成的本质，在时长控制上面临挑战，限制了它们在自动配音等时间敏感场景中的适用性。"
      },
      {
       "id": "s-introduction-2-4",
       "original": "Additionally, while TTS models excel in timbre reproduction, their emotional expression remains limited by scarce training data.",
       "zh": "此外，尽管 TTS 模型在音色复现上表现出色，但其情感表达仍受限于稀缺的训练数据。"
      },
      {
       "id": "s-introduction-2-5",
       "original": "Existing methods for emotional expression include emotion labels in training data (Zhou et al. 2023; Qi et al. 2024), mapping natural language descriptions with emotion audio via CLAP (Elizalde et al. 2023; Radford et al. 2021), instruction fine-tuning (Du et al. 2024b), and reference to emotional audio (Zhou et al. 2024), but these approaches lack robustness in affective range and control precision.",
       "zh": "现有的情感表达方法包括：在训练数据中标注情感标签（Zhou et al. 2023; Qi et al. 2024）、通过 CLAP 将自然语言描述与情感音频对齐（Elizalde et al. 2023; Radford et al. 2021）、指令微调（Du et al. 2024b），以及参考情感音频（Zhou et al. 2024），但这些方法在情感范围和控制精度的鲁棒性上仍有欠缺。"
      }
     ]
    },
    {
     "id": "p-introduction-3",
     "type": "paragraph",
     "page": 1,
     "sentences": [
      {
       "id": "s-introduction-3-1",
       "original": "We introduce IndexTTS2 (Figure 1), a novel zero-shot speech generation model that addresses both fixed-duration speech generation and natural-duration speech synthesis while enhancing emotional expressiveness.",
       "zh": "我们提出 IndexTTS2（Figure 1），这是一个新颖的零样本语音生成模型，同时解决固定时长语音生成与自然时长语音合成问题，并增强情感表现力。"
      },
      {
       "id": "s-introduction-3-2",
       "original": "The model comprises three core modules: the Text-to-Semantic (T2S) module, the Semantic-to-Mel (S2M) module, and the Vocoder.",
       "zh": "该模型由三个核心模块组成：文本到语义（T2S）模块、语义到 Mel 频谱（S2M）模块和声码器。"
      },
      {
       "id": "s-introduction-3-3",
       "original": "The T2S module employs an autoregressive transformer framework to generate semantic tokens from text, timbre/style prompts, and an optional speech token count.",
       "zh": "T2S 模块采用自回归 Transformer 框架，根据文本、音色/风格提示以及可选的语音 token 数量来生成语义 token。"
      },
      {
       "id": "s-introduction-3-4",
       "original": "Under specified token count constraints, a duration encoding mechanism ensures fixed-length token sequences with preserved semantic integrity.",
       "zh": "在指定 token 数量的约束下，一套时长编码机制可保证生成固定长度的 token 序列，同时保持语义完整性。"
      },
      {
       "id": "s-introduction-3-5",
       "original": "For emotional modeling, the T2S module extracts emotional features from style prompts and uses a Gradient Reversal Layer (GRL) (Ganin et al. 2016; Ju et al. 2024) to eliminate emotion-irrelevant inforSemantic Tokens Text Tokens Hello! 你好！ Text Tokenizer Text-to-Semantic Source Text Speech Token Num Style Prompt Timbre Prompt Semantic-to-Mel BigVGANv2 Mel Spectrogram Target Speech",
       "zh": "在情感建模方面，T2S 模块从风格提示中提取情感特征，并使用梯度反转层（GRL）（Ganin et al. 2016; Ju et al. 2024）来消除与情感无关的信（本句后半段为抽取自 Figure 1 的图片内文字残留：Semantic Tokens、Text Tokens、Hello! 你好！、Text Tokenizer、Text-to-Semantic、Source Text、Speech Token Num、Style Prompt、Timbre Prompt、Semantic-to-Mel、BigVGANv2、Mel Spectrogram、Target Speech，即图 1 中的各模块标注）。"
      }
     ]
    },
    {
     "id": "fig-introduction-1",
     "type": "figure_caption",
     "page": 2,
     "original": "Figure 1: The overview of IndexTTS2.",
     "zh": "图 1：IndexTTS2 总览。"
    },
    {
     "id": "p-introduction-4",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-introduction-4-1",
       "original": "mation during training.",
       "zh": "息（接上句，即“消除与情感无关的信息”）。"
      },
      {
       "id": "s-introduction-4-2",
       "original": "A multi-stage training strategy is adopted to overcome the lack of high-quality emotional data and enhance expressive capabilities.",
       "zh": "为克服高质量情感数据的缺乏并增强表达能力，模型采用了多阶段训练策略。"
      },
      {
       "id": "s-introduction-4-3",
       "original": "To enable natural language emotion control in speech synthesis, we further design a Text-to-Emotion (T2E) module, distilling Deepseekr1’s (Guo et al. 2025) emotion distribution prediction ability into Qwen-3-1.7b (Yang et al. 2025) via Low-Rank Adaptation (LoRA) (Sundaram, Du, and Zhao 2019; Devalal and Karthikeyan 2018; Bor, Vidler, and Roedig 2016), and combine these probabilities with precomputed emotion embeddings to condition the T2S output.",
       "zh": "为在语音合成中实现自然语言情感控制，我们进一步设计了文本到情感（T2E）模块，通过低秩适配（LoRA）（Sundaram, Du, and Zhao 2019; Devalal and Karthikeyan 2018; Bor, Vidler, and Roedig 2016）将 Deepseekr1（Guo et al. 2025）的情感分布预测能力蒸馏到 Qwen-3-1.7b（Yang et al. 2025）中，并将这些概率与预计算的情感嵌入相结合，以此作为 T2S 输出的条件。"
      },
      {
       "id": "s-introduction-4-4",
       "original": "The S2M module generates mel-spectrograms via a non-autoregressive architecture, incorporating GPT latent representations to stabilize speech clarity during intense emotional expressions.",
       "zh": "S2M 模块通过非自回归架构生成 Mel 频谱图，并融入 GPT 隐表征以在强烈情感表达时稳定语音清晰度。"
      },
      {
       "id": "s-introduction-4-5",
       "original": "The Vocoder module utilizes BigVGANv2 (Lee et al. 2023) to convert mel-spectrograms into audio waveforms.",
       "zh": "声码器模块使用 BigVGANv2（Lee et al. 2023）将 Mel 频谱图转换为音频波形。"
      }
     ]
    },
    {
     "id": "p-introduction-5",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-introduction-5-1",
       "original": "The key contributions of this work are:",
       "zh": "本工作的主要贡献如下："
      }
     ]
    },
    {
     "id": "p-introduction-6",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-introduction-6-1",
       "original": "• We propose a duration adaptation scheme for autoregressive TTS models.",
       "zh": "• 我们为自回归 TTS 模型提出了一种时长适配方案。"
      },
      {
       "id": "s-introduction-6-2",
       "original": "IndexTTS2 is the first autoregressive zero-shot TTS model to combine precise duration control with natural duration generation, and the method is scalable for any autoregressive large-scale TTS model. • The emotional and speaker-related features are decoupled from the prompts, and a feature fusion strategy is designed to maintain semantic fluency and pronunciation clarity during emotionally rich expressions.",
       "zh": "IndexTTS2 是首个将精确时长控制与自然时长生成相结合的自回归零样本 TTS 模型，且该方法可推广到任意自回归大规模 TTS 模型。• 情感特征与说话人相关特征从提示中解耦，并设计了一种特征融合策略，以在情感丰富的表达中保持语义流畅度和发音清晰度。"
      },
      {
       "id": "s-introduction-6-3",
       "original": "Furthermore, a tool was developed for emotion control, utilising natural language descriptions for the benefit of users. • To address the lack of highly expressive speech data, we propose an effective training strategy, significantly enhancing the emotional expressiveness of zeroshot TTS to State-of-the-Art (SOTA) level. • We will publicly release the code and pre-trained weights to facilitate future research and practical applications.",
       "zh": "此外，我们还开发了一款情感控制工具，方便用户使用自然语言描述进行控制。• 为解决高表现力语音数据缺乏的问题，我们提出了一种有效的训练策略，将零样本 TTS 的情感表现力显著提升至最先进（SOTA）水平。• 我们将公开发布代码与预训练权重，以促进后续研究与实际应用。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-related-work",
   "num": null,
   "level": 1,
   "page": 2,
   "title": {
    "original": "Related Work",
    "zh": "相关工作"
   },
   "blocks": []
  },
  {
   "id": "sec-precise-duration-control-for-lar",
   "num": null,
   "level": 2,
   "page": 2,
   "title": {
    "original": "Precise Duration Control for Large-Scale TTS.",
    "zh": "大规模 TTS 的精确时长控制"
   },
   "blocks": [
    {
     "id": "p-precise-duration-control-for-lar-1",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-precise-duration-control-for-lar-1-1",
       "original": "Current zero-shot large-scale TTS models adopt autoregressive or non-autoregressive paradigms, with non-autoregressive approaches excelling in duration control via duration predictors based on diffusion, transformers (Lee et al. 2024), flows (Kim, Hong, and Choi 2023), or language models (Yang et al. 2024).",
       "zh": "当前的零样本大规模 TTS 模型采用自回归或非自回归范式，其中非自回归方法通过基于扩散、Transformer（Lee et al. 2024）、流（Kim, Hong, and Choi 2023）或语言模型（Yang et al. 2024）的时长预测器，在时长控制上表现优异。"
      },
      {
       "id": "s-precise-duration-control-for-lar-1-2",
       "original": "Methods like MaskGCT (Wang et al. 2024) use flow modeling for phoneme-level duration predictors based on diffusion, transformers (Lee et al. 2024), flows (Kim, Hong, and Choi 2023), or language models (Yang et al.",
       "zh": "MaskGCT（Wang et al. 2024）等方法使用流进行建模。（本句后半段为跨栏抽取残留，重复列出了基于扩散、Transformer、流或语言模型的音素级时长预测器的引用（Lee et al. 2024; Kim, Hong, and Choi 2023; Yang et al.）"
      }
     ]
    },
    {
     "id": "p-precise-duration-control-for-lar-2",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-precise-duration-control-for-lar-2-1",
       "original": "2024).",
       "zh": "2024），与上句末尾相接，为同一处引用列表的断行残留。）"
      },
      {
       "id": "s-precise-duration-control-for-lar-2-2",
       "original": "Methods like MaskGCT (Wang et al. 2024) use flow modeling for phoneme-level durations, while F5-TTS (Chen et al. 2024b) estimates durations via text-speech length ratios.",
       "zh": "MaskGCT（Wang et al. 2024）等方法用流建模来预测音素级时长，而 F5-TTS（Chen et al. 2024b）则通过文本—语音长度比来估计时长。"
      },
      {
       "id": "s-precise-duration-control-for-lar-2-3",
       "original": "Autoregressive models (e.g., VoxInstruct (Zhou et al. 2024), Takin (Chen et al. 2024a)) rely on natural language instructions but face precision limitations.",
       "zh": "自回归模型（如 VoxInstruct（Zhou et al. 2024）、Takin（Chen et al. 2024a））依赖自然语言指令，但在精度上存在局限。"
      },
      {
       "id": "s-precise-duration-control-for-lar-2-4",
       "original": "Techniques like CosyVoice (Du et al. 2024a), Spark-TTS (Wang et al. 2025), DubWise (Sahipjohn et al. 2024), and FleSpeech (Li et al. 2025) address token generation control through specialized cues, attribute labels, cross-modal fusion, or multimodal embeddings.",
       "zh": "CosyVoice（Du et al. 2024a）、Spark-TTS（Wang et al. 2025）、DubWise（Sahipjohn et al. 2024）和 FleSpeech（Li et al. 2025）等技术则通过专门提示、属性标签、跨模态融合或多模态嵌入来解决 token 生成控制问题。"
      },
      {
       "id": "s-precise-duration-control-for-lar-2-5",
       "original": "This work introduces an enhanced autoregressive TTS model with precise token number control to overcome these challenges.",
       "zh": "本工作提出了一种增强的自回归 TTS 模型，通过精确的 token 数量控制来克服上述挑战。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-emotionally-controllable-large-s",
   "num": null,
   "level": 2,
   "page": 2,
   "title": {
    "original": "Emotionally Controllable Large-Scale TTS.",
    "zh": "情感可控的大规模 TTS"
   },
   "blocks": [
    {
     "id": "p-emotionally-controllable-large-s-1",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-emotionally-controllable-large-s-1-1",
       "original": "Emotion control in large-scale TTS leverages natural language descriptions (e.g., Controlspeech (Ji et al. 2024)), with CosyVoice (Du et al. 2024a) using preset instructions and EmoSphere++ (Cho et al. 2025) generating interpretable style embeddings.",
       "zh": "大规模 TTS 中的情感控制可利用自然语言描述（如 Controlspeech（Ji et al. 2024）），其中 CosyVoice（Du et al. 2024a）使用预设指令，EmoSphere++（Cho et al. 2025）生成可解释的风格嵌入。"
      },
      {
       "id": "s-emotionally-controllable-large-s-1-2",
       "original": "StyleTTS 2 (Li et al. 2023) employs diffusion-based style vectors, SC VALL-E (Kim, Hong, and Choi 2023) integrates style networks, and Vevo (Zhang et al. 2025) uses content-style token systems.",
       "zh": "StyleTTS 2（Li et al. 2023）采用基于扩散的风格向量，SC VALL-E（Kim, Hong, and Choi 2023）集成风格网络，Vevo（Zhang et al. 2025）使用内容—风格 token 体系。"
      },
      {
       "id": "s-emotionally-controllable-large-s-1-3",
       "original": "Multimodal approaches like FleSpeech (Li et al. 2025) embed textual, audio, and visual cues into unified representations for precise regulation.",
       "zh": "FleSpeech（Li et al. 2025）等多模态方法将文本、音频和视觉线索嵌入统一表征中，以实现精确调控。"
      },
      {
       "id": "s-emotionally-controllable-large-s-1-4",
       "original": "This work enhances emotional expressiveness via additional emotion features, enabling flexible control through natural language or reference audio inputs.",
       "zh": "本工作通过额外的情感特征增强情感表现力，支持通过自然语言或参考音频输入进行灵活控制。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-proposed-method",
   "num": null,
   "level": 1,
   "page": 2,
   "title": {
    "original": "Proposed Method",
    "zh": "提出的方法"
   },
   "blocks": [
    {
     "id": "p-proposed-method-1",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-proposed-method-1-1",
       "original": "We propose IndexTTS2, a cascaded autoregressive zeroshot TTS system comprising three modules: the Text-toSemantic (T2S) module, Semantic-to-Mel (S2M) module, and BigVGANv2 vocoder, each trained separately with tailored strategies to enhance emotional expressiveness.",
       "zh": "我们提出 IndexTTS2，这是一个级联的自回归零样本 TTS 系统，由三个模块组成：文本到语义（T2S）模块、语义到 Mel（S2M）模块和 BigVGANv2 声码器，各模块分别采用针对性策略独立训练，以增强情感表现力。"
      },
      {
       "id": "s-proposed-method-1-2",
       "original": "The T2S module generates semantic tokens from target text, style/timbre prompts, and an optional speech token count, while the S2M module predicts mel-spectrograms using these tokens and the timbre prompt.",
       "zh": "T2S 模块根据目标文本、风格/音色提示以及可选的语音 token 数量生成语义 token，而 S2M 模块则利用这些 token 和音色提示来预测 Mel 频谱图。"
      },
      {
       "id": "s-proposed-method-1-3",
       "original": "The BigVGANv2 vocoder then converts the mel-spectrograms into speech EA Autoregressive Text-to-Semantic Transformer Emotion Adapter",
       "zh": "BigVGANv2 声码器随后将 Mel 频谱图转换为语音（本句末尾混入 Figure 2 图片内文字残留：EA、Autoregressive Text-to-Semantic Transformer、Emotion Adapter + BT、1 2 3 4 5 ……，即图 2 中的模块标注与序号）。"
      }
     ]
    },
    {
     "id": "eq-proposed-method-1",
     "type": "equation",
     "page": 2,
     "original": "+"
    },
    {
     "id": "eq-proposed-method-2",
     "type": "equation",
     "page": 2,
     "original": "BT"
    },
    {
     "id": "eq-proposed-method-3",
     "type": "equation",
     "page": 2,
     "original": "1 2 3 4 5 ..."
    },
    {
     "id": "eq-proposed-method-4",
     "type": "equation",
     "page": 3,
     "original": "1 2 3 4 5 6 7 8 ..."
    },
    {
     "id": "p-proposed-method-2",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-proposed-method-2-1",
       "original": "p c e GRL Embedding Table BA Conditioner Text Tokenizer Semantic Codec Emotion Perceiver Speaker Classifier Speaker Perceiver Speech Token Num Conditioner Extraction Semantic Feature Semantic Feature Extraction Extraction Semantic Feature Hello! 你好！ Speaker Prompt GT Speech Style Prompt Text",
       "zh": "（图 2 架构标签：p/c/e；GRL；Embedding Table；BA Conditioner；Text Tokenizer；Semantic Codec；Emotion Perceiver；Speaker Classifier；Speaker Perceiver；Speech Token Num Conditioner；Extraction；Semantic Feature；Hello! 你好！；Speaker Prompt / GT Speech / Style Prompt / Text。）"
      }
     ]
    },
    {
     "id": "fig-proposed-method-1",
     "type": "figure_caption",
     "page": 3,
     "original": "Figure 2: Autoregressive Text-to-Semantic Module. When speech token num is specified, precise control of the number of synthesized semantic tokens is performed. The emotion adapter (red dashed lines) is employed to extract emotional features from the style prompt, which are then used as input to the Text-to-Semantic process for the reconstruction of emotions.",
     "zh": "图 2：自回归文本到语义模块。当指定语音 token 数量时，模块会对生成的语义 token 数量进行精确控制。情感适配器（红色虚线）用于从风格提示中提取情感特征，随后作为文本到语义过程的输入，用于情感的重建。"
    },
    {
     "id": "p-proposed-method-3",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-proposed-method-3-1",
       "original": "waveforms.",
       "zh": "波形（接上句，即“转换为语音波形”）。"
      },
      {
       "id": "s-proposed-method-3-2",
       "original": "To enable natural language-based emotional control, we introduce a Text-to-Emotion (T2E) module that produces an emotion vector from input text, which is integrated into the T2S module via a dedicated emotion vector interface.",
       "zh": "为实现基于自然语言的情感控制，我们引入了文本到情感（T2E）模块，它从输入文本生成情感向量，并通过专用的情感向量接口集成到 T2S 模块中。"
      },
      {
       "id": "s-proposed-method-3-3",
       "original": "This design facilitates flexible, high-quality emotional speech synthesis through explicit natural language instructions or reference audio inputs.",
       "zh": "这一设计使得通过显式的自然语言指令或参考音频输入，即可实现灵活、高质量的情感语音合成。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-autoregressive-text-to-semantic-",
   "num": null,
   "level": 2,
   "page": 3,
   "title": {
    "original": "Autoregressive Text-to-Semantic Module (T2S)",
    "zh": "自回归文本到语义模块（T2S）"
   },
   "blocks": [
    {
     "id": "p-autoregressive-text-to-semantic--1",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-autoregressive-text-to-semantic--1-1",
       "original": "We formulate T2S as an autoregressive semantic token prediction task.",
       "zh": "我们将 T2S 形式化为一个自回归的语义 token 预测任务。"
      },
      {
       "id": "s-autoregressive-text-to-semantic--1-2",
       "original": "As shown in Figure 2, the input sequence is constructed as [c, p, e⟨BT ⟩, Etext, e⟨BA⟩, Esem], where c denotes speaker attributes, p controls duration, Etext represents text embeddings, and Esem denotes the embeddings of semantic tokens extracted from ground-truth speech via a semantic codec. e⟨BT ⟩and e⟨BA⟩function as dedicated boundary tokens, serving to demarcate the extents of the text sequence and the semantic sequence, respectively.",
       "zh": "如 Figure 2 所示，输入序列构造为 [c, p, e⟨BT⟩, Etext, e⟨BA⟩, Esem]，其中 c 表示说话人属性，p 控制时长，Etext 表示文本嵌入，Esem 表示由语义 codec 从真实语音中提取的语义 token 的嵌入。e⟨BT⟩ 和 e⟨BA⟩ 作为专用的边界 token，分别用于界定文本序列和语义序列的范围。"
      },
      {
       "id": "s-autoregressive-text-to-semantic--1-3",
       "original": "Our architecture resembles IndexTTS (Deng et al. 2025) with key innovations in duration and emotion control.",
       "zh": "我们的架构与 IndexTTS（Deng et al. 2025）相似，但在时长与情感控制上有关键创新。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-duration",
   "num": null,
   "level": 2,
   "page": 3,
   "title": {
    "original": "Duration",
    "zh": "时长"
   },
   "blocks": [
    {
     "id": "p-duration-1",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-duration-1-1",
       "original": "Control: Duration regulation is achieved through a dedicated embedding p computed from the target semantic token length T, where p = Wnumh(T).",
       "zh": "控制：时长调节通过一个由目标语义 token 长度 T 计算得到的专用嵌入 p 来实现，其中 p = Wnum·h(T)。"
      },
      {
       "id": "s-duration-1-2",
       "original": "Here, Wnum ∈RLspeech×D represents an embedding table with Lspeech denoting the maximum semantic sequence length and D being the embedding dimensionality.",
       "zh": "这里，Wnum ∈ R^{Lspeech×D} 表示一个嵌入表，Lspeech 为最大语义序列长度，D 为嵌入维度。"
      },
      {
       "id": "s-duration-1-3",
       "original": "The function h(T) returns a one-hot vector corresponding to T (Rodr´ıguez et al. 2018).",
       "zh": "函数 h(T) 返回对应于 T 的独热向量（Rodríguez et al. 2018）。"
      },
      {
       "id": "s-duration-1-4",
       "original": "In particular, we implemented a special trick.",
       "zh": "特别地，我们实现了一个特殊技巧。"
      },
      {
       "id": "s-duration-1-5",
       "original": "We set the constraint Wsem = Wnum is imposed between Wnum and the semantic positional embedding table Wsem.",
       "zh": "我们在 Wnum 与语义位置嵌入表 Wsem 之间施加约束 Wsem = Wnum（原文句式残缺，按上下文译出）。"
      },
      {
       "id": "s-duration-1-6",
       "original": "This equation enables the autoregressive system to precisely align positional information with target duration information during generation, thereby accurately producing sequences of the desired length.",
       "zh": "这一等式使自回归系统在生成过程中能将位置信息与目标时长信息精确对齐，从而准确产出期望长度的序列。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-emotional-control",
   "num": null,
   "level": 2,
   "page": 3,
   "title": {
    "original": "Emotional Control:",
    "zh": "情感控制"
   },
   "blocks": [
    {
     "id": "p-emotional-control-1",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-emotional-control-1-1",
       "original": "Emotion synthesis integrates an emotion embedding e into the conditioning feature via the input sequence [c + e, p, e⟨BT ⟩, Etext, e⟨BA⟩, Esem], where e is extracted from style prompts using a Conformer-based emotion perceiver conditioner.",
       "zh": "情感合成将情感嵌入 e 通过输入序列 [c + e, p, e⟨BT⟩, Etext, e⟨BA⟩, Esem] 融入条件特征，其中 e 由基于 Conformer 的情感感知条件器从风格提示中提取。"
      },
      {
       "id": "s-emotional-control-1-2",
       "original": "To effectively capture the representation of emotional rhythm, we employ the following design: the speaker feature c is derived from a pretrained speaker perceiver conditioner extractor and primarily encodes timbral characteristics.",
       "zh": "为有效捕捉情感节奏的表征，我们采用如下设计：说话人特征 c 来自预训练的说话人感知条件提取器，主要编码音色特征。"
      },
      {
       "id": "s-emotional-control-1-3",
       "original": "To minimize the content overlap between e and c while enhancing feature disentanglement, we employ a GRL during training.",
       "zh": "为尽量减少 e 与 c 之间的内容重叠并增强特征解耦，我们在训练中使用了 GRL。"
      },
      {
       "id": "s-emotional-control-1-4",
       "original": "This adversarial mechanism forces e to exclusively capture emotional and rhythmic attributes, remaining invariant to speaker-specific timbre characteristics, thereby enabling more precise and robust control over global emotional prosody generation.",
       "zh": "这种对抗机制迫使 e 只捕捉情感与节奏属性，而对说话人特有的音色特征保持不变，从而实现对全局情感韵律生成的更精确、更鲁棒的控制。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-training-and-inference",
   "num": null,
   "level": 2,
   "page": 3,
   "title": {
    "original": "Training and Inference:",
    "zh": "训练与推理"
   },
   "blocks": [
    {
     "id": "p-training-and-inference-1",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-training-and-inference-1-1",
       "original": "Our training data is organized by speaker, with each speaker having at least two utterances.",
       "zh": "我们的训练数据按说话人组织，每位说话人至少有两条语音。"
      },
      {
       "id": "s-training-and-inference-1-2",
       "original": "For prompt and target partitioning, we divide different utterances from the same speaker into prompts and training targets.",
       "zh": "在划分提示与目标时，我们将同一说话人的不同语音分别划分为提示和训练目标。"
      },
      {
       "id": "s-training-and-inference-1-3",
       "original": "To enhance data diversity, we apply random speed perturbation to both real speech and prompts using scaling coefficients r1 and r2.",
       "zh": "为增强数据多样性，我们使用缩放系数 r1 和 r2 对真实语音和提示都施加随机变速扰动。"
      }
     ]
    },
    {
     "id": "p-training-and-inference-2",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-training-and-inference-2-1",
       "original": "We employ a dedicated three-stage training strategy for the T2S module: Stage 1: The model is trained on the full dataset using the input sequence [c, p, e⟨BT ⟩, Etext, e⟨BA⟩, Esem], where c is the speaker embedding and p is the duration embedding.",
       "zh": "我们对 T2S 模块采用专门的三阶段训练策略：阶段 1：模型在全量数据集上训练，输入序列为 [c, p, e⟨BT⟩, Etext, e⟨BA⟩, Esem]，其中 c 为说话人嵌入，p 为时长嵌入。"
      },
      {
       "id": "s-training-and-inference-2-2",
       "original": "To support both duration-controlled and free-form generation, p is randomly set to zero with a probability of 30%.",
       "zh": "为同时支持时长可控生成与自由形式生成，p 以 30% 的概率被随机置零。"
      },
      {
       "id": "s-training-and-inference-2-3",
       "original": "This stage establishes the model’s foundational capabilities.",
       "zh": "该阶段建立模型的基础能力。"
      }
     ]
    },
    {
     "id": "p-training-and-inference-3",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-training-and-inference-3-1",
       "original": "Stage 2: We refine the emotion control module using the modified input sequence [c+e, p, e⟨BT ⟩, Etext, e⟨BA⟩, Esem], where e denotes the emotion embedding.",
       "zh": "阶段 2：我们使用修改后的输入序列 [c+e, p, e⟨BT⟩, Etext, e⟨BA⟩, Esem] 对情感控制模块进行细化，其中 e 表示情感嵌入。"
      },
      {
       "id": "s-training-and-inference-3-2",
       "original": "In this stage, the speaker perceiver conditioner (producing c) is frozen, while the emotion perceiver conditioner remains trainable.",
       "zh": "在该阶段，产生 c 的说话人感知条件器被冻结，而情感感知条件器保持可训练。"
      },
      {
       "id": "s-training-and-inference-3-3",
       "original": "To disentangle speaker identity from emotional expression, a GRL and a speaker classifier are applied.",
       "zh": "为将说话人身份与情感表达解耦，训练中施加了一个 GRL 和一个说话人分类器。"
      },
      {
       "id": "s-training-and-inference-3-4",
       "original": "Training is conducted on a curated subset of 135 hours of high-quality emotional speech.",
       "zh": "该阶段在一个精选的 135 小时高质量情感语音子集上训练。"
      },
      {
       "id": "s-training-and-inference-3-5",
       "original": "The joint loss function is defined as",
       "zh": "联合损失函数定义为"
      }
     ]
    },
    {
     "id": "eq-training-and-inference-1",
     "type": "equation",
     "page": 4,
     "original": "T X"
    },
    {
     "id": "eq-training-and-inference-2",
     "type": "equation",
     "page": 4,
     "original": "LAR = − 1 T + 1"
    },
    {
     "id": "eq-training-and-inference-3",
     "type": "equation",
     "page": 4,
     "original": "t=0 log q(yt) −α log q(e), (1)"
    },
    {
     "id": "p-training-and-inference-4",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-training-and-inference-4-1",
       "original": "where yT represents the end-of-sequence token <EA>, q(yt) denotes the posterior probability of semantic tokens, q(e) denotes the posterior probability that e originates from the target speaker and α is the loss coefficient.",
       "zh": "−1/(T+1)·Σ_{t=0}^{T} log q(yt) − α·log q(e)（公式经抽取重排），其中 yT 表示序列结束 token <EA>，q(yt) 表示语义 token 的后验概率，q(e) 表示 e 来自目标说话人的后验概率，α 为损失系数。"
      }
     ]
    },
    {
     "id": "p-training-and-inference-5",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-training-and-inference-5-1",
       "original": "Stage 3: To improve robustness, we freeze all feature conditioners and perform fine-tuning on the full dataset.",
       "zh": "阶段 3：为提升鲁棒性，我们冻结所有特征条件器，并在全量数据集上进行微调。"
      }
     ]
    },
    {
     "id": "p-training-and-inference-6",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-training-and-inference-6-1",
       "original": "During inference, duration control is achieved by setting p = Wnumh(T), while free-form generation is enabled by using p = 0.",
       "zh": "推理时，通过设置 p = Wnum·h(T) 实现时长控制，而使用 p = 0 即可启用自由形式生成。"
      },
      {
       "id": "s-training-and-inference-6-2",
       "original": "Emotional prosody can be directly manipulated by providing a desired emotion vector e as input.",
       "zh": "通过直接给定期望的情感向量 e 作为输入，即可直接操控情感韵律。"
      }
     ]
    },
    {
     "id": "p-training-and-inference-7",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-training-and-inference-7-1",
       "original": "Flow Matching Module Semantic Feature Reference Feature Noising Concat Gpt Latent Random fusion Reference Token Semantic Token Reference Mel Target Mel Speaker Embedding Mel Spectrogram Speaker Embedding Semantic Codec Extraction Extraction Training Sample",
       "zh": "（图 3 训练流程标签：Flow Matching 模块；语义特征（Semantic Feature）与参考特征（Reference Feature）；Noising/Concat；GPT Latent；随机融合；参考 token/语义 token；参考 Mel/目标 Mel；说话人嵌入；Mel 频谱；语义 codec；Extraction；训练样本。）"
      }
     ]
    },
    {
     "id": "fig-training-and-inference-1",
     "type": "figure_caption",
     "page": 4,
     "original": "Figure 3: Semantic-to-Mel module based on flow matching.",
     "zh": "图 3：基于流匹配的语义到 Mel 模块。"
    }
   ]
  },
  {
   "id": "sec-semantic-to-mel-module-s2m",
   "num": null,
   "level": 2,
   "page": 4,
   "title": {
    "original": "Semantic-to-Mel Module (S2M)",
    "zh": "语义到 Mel 模块（S2M）"
   },
   "blocks": [
    {
     "id": "p-semantic-to-mel-module-s2m-1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-semantic-to-mel-module-s2m-1-1",
       "original": "As shown in Figure 3, the S2M module employs a nonregressive generation framework based on flow matching (Lipman et al. 2023; Liu 2024; Peebles and Xie 2023).",
       "zh": "如 Figure 3 所示，S2M 模块采用基于流匹配（Lipman et al. 2023; Liu 2024; Peebles and Xie 2023）的非自回归生成框架。"
      },
      {
       "id": "s-semantic-to-mel-module-s2m-1-2",
       "original": "The model synthesizes target mel-spectrograms by combining prompt mel-spectrograms, speaker embeddings, and semantic features.",
       "zh": "该模型通过结合提示 Mel 频谱图、说话人嵌入和语义特征来合成目标 Mel 频谱图。"
      },
      {
       "id": "s-semantic-to-mel-module-s2m-1-3",
       "original": "To address pronunciation issues in emotional speech generation, we introduce GPT latent enhancement.",
       "zh": "为解决情感语音生成中的发音问题，我们引入了 GPT 隐表征增强。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-gpt-latent-enhancement",
   "num": null,
   "level": 2,
   "page": 4,
   "title": {
    "original": "GPT Latent Enhancement:",
    "zh": "GPT 隐表征增强"
   },
   "blocks": [
    {
     "id": "p-gpt-latent-enhancement-1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-gpt-latent-enhancement-1-1",
       "original": "Conditional flow matching learns an Ordinary Differential Equation model (Chen et al. 2018) that maps samples from a noise distribution to target mel-spectrograms, conditioned on timbre reference audio and semantic codes generated by the T2S module.",
       "zh": "条件流匹配学习一个常微分方程（ODE）模型（Chen et al. 2018），该模型以音色参考音频以及 T2S 模块生成的语义编码为条件，将样本从噪声分布映射到目标 Mel 频谱图。"
      }
     ]
    },
    {
     "id": "p-gpt-latent-enhancement-2",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-gpt-latent-enhancement-2-1",
       "original": "To mitigate speech slurring in speech synthesis, especially when synthesizing emotional speech, we introduce a novel approach leveraging latent features from the GPT model, denoted as HGPT, which are extracted from the output of the final transformer layer in the T2S module.",
       "zh": "为缓解语音合成中的含混不清问题——尤其是在合成情感语音时——我们提出了一种利用 GPT 模型隐特征的新方法，记作 HGPT，这些特征取自 T2S 模块中最后一层 Transformer 的输出。"
      },
      {
       "id": "s-gpt-latent-enhancement-2-2",
       "original": "Given that the T2S module is trained to convert text into rich semantic representations using a large-scale dataset, we hypothesize that HGPT encodes substantial textual and contextual information.",
       "zh": "鉴于 T2S 模块是在大规模数据集上训练、用于将文本转换为丰富语义表征的，我们假设 HGPT 编码了大量文本与上下文信息。"
      },
      {
       "id": "s-gpt-latent-enhancement-2-3",
       "original": "To exploit this, we fuse HGPT with the semantic features via vector addition, forming an enhanced, context-enriched representation.",
       "zh": "为利用这一点，我们将 HGPT 与语义特征通过向量加法融合，形成增强的、上下文更丰富的表征。"
      },
      {
       "id": "s-gpt-latent-enhancement-2-4",
       "original": "This fused feature is then used as input to the S2M training process.",
       "zh": "该融合特征随后被用作 S2M 训练过程的输入。"
      },
      {
       "id": "s-gpt-latent-enhancement-2-5",
       "original": "Ablation studies validate that this integration effectively reduces the word error rate in highly expressive speech synthesis.",
       "zh": "消融实验验证，这一融合能有效降低高表现力语音合成中的词错误率（WER）。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-training-and-inference-2",
   "num": null,
   "level": 2,
   "page": 4,
   "title": {
    "original": "Training and Inference:",
    "zh": "训练与推理"
   },
   "blocks": [
    {
     "id": "p-training-and-inference-2-1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-training-and-inference-2-1-1",
       "original": "The S2M module is trained in a single stage.",
       "zh": "S2M 模块采用单阶段训练。"
      },
      {
       "id": "s-training-and-inference-2-1-2",
       "original": "During training, each input sentence is randomly split into a prompt segment and a target segment.",
       "zh": "训练时，每条输入句子被随机切分为一个提示片段和一个目标片段。"
      },
      {
       "id": "s-training-and-inference-2-1-3",
       "original": "The mel-spectrograms corresponding to the target segment are fully noised to form the source inputs for the diffusion process.",
       "zh": "目标片段对应的 Mel 频谱图被完全加噪，作为扩散过程的源输入。"
      },
      {
       "id": "s-training-and-inference-2-1-4",
       "original": "Semantic tokens generated by the T2S module are denoted as Qsem.",
       "zh": "由 T2S 模块生成的语义 token 记作 Qsem。"
      },
      {
       "id": "s-training-and-inference-2-1-5",
       "original": "To improve pronunciation robustness, a Multi-Layer Perceptron (MLP) (Rosenblatt 1958; Rumelhart, Hinton, and Williams 1986) is employed to randomly fuse the GPT hidden states HGPT and the semantic tokens Qsem with 50% probability, forming the final semantic representation Qfin.",
       "zh": "为提升发音鲁棒性，训练中用一个多层感知机（MLP）（Rosenblatt 1958; Rumelhart, Hinton, and Williams 1986）以 50% 的概率将 GPT 隐状态 HGPT 与语义 token Qsem 随机融合，形成最终的语义表征 Qfin。"
      },
      {
       "id": "s-training-and-inference-2-1-6",
       "original": "Speaker embeddings, extracted via a perceiver-based conditioner, are concatenated with Qfin to ensure timbre consistency.",
       "zh": "由感知器（perceiver）条件器提取的说话人嵌入与 Qfin 拼接，以保证音色一致性。"
      },
      {
       "id": "s-training-and-inference-2-1-7",
       "original": "The model is optimized using L1 loss (Koenker and Bassett Jr 1978) between the predicted (ypred) and target (ytar) mel-spectrograms:",
       "zh": "模型使用预测 Mel 频谱图（ypred）与目标 Mel 频谱图（ytar）之间的 L1 损失（Koenker and Bassett Jr 1978）进行优化："
      }
     ]
    },
    {
     "id": "eq-training-and-inference-2-1",
     "type": "equation",
     "page": 4,
     "original": "F X"
    },
    {
     "id": "eq-training-and-inference-2-2",
     "type": "equation",
     "page": 4,
     "original": "D X"
    },
    {
     "id": "eq-training-and-inference-2-3",
     "type": "equation",
     "page": 4,
     "original": "LL1 = 1 F · D"
    },
    {
     "id": "eq-training-and-inference-2-4",
     "type": "equation",
     "page": 4,
     "original": "d=1 |(ypred)f,d −(ytar)f,d|, (2)"
    },
    {
     "id": "eq-training-and-inference-2-5",
     "type": "equation",
     "page": 4,
     "original": "f=1"
    },
    {
     "id": "p-training-and-inference-2-2",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-training-and-inference-2-2-1",
       "original": "where F denotes the number of frames and D the dimensionality of the mel-frequency bins.",
       "zh": "其中 F 表示帧数，D 表示 Mel 频带的维度。"
      },
      {
       "id": "s-training-and-inference-2-2-2",
       "original": "During inference, an ODE solver generates mel-spectrograms from Gaussian noise, conditioned on the speaker embeddings and the final semantic representation Qfin.",
       "zh": "推理时，ODE 求解器以说话人嵌入和最终语义表征 Qfin 为条件，从高斯噪声生成 Mel 频谱图。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-text-to-emotion-t2e",
   "num": null,
   "level": 2,
   "page": 4,
   "title": {
    "original": "Text-to-Emotion (T2E)",
    "zh": "文本到情感（T2E）"
   },
   "blocks": [
    {
     "id": "p-text-to-emotion-t2e-1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-text-to-emotion-t2e-1-1",
       "original": "We achieve the effect of natural language emotion control through the following steps.",
       "zh": "我们通过以下步骤实现自然语言情感控制的效果。"
      }
     ]
    },
    {
     "id": "p-text-to-emotion-t2e-2",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-text-to-emotion-t2e-2-1",
       "original": "First, we define seven basic emotions: E = {Anger, Happiness, Fear, Disgust, Sadness, Surprise, Neutral}.",
       "zh": "首先，我们定义七种基本情感：E = {愤怒、快乐、恐惧、厌恶、悲伤、惊讶、中性}。"
      },
      {
       "id": "s-text-to-emotion-t2e-2-2",
       "original": "For each emotion ei ∈E, we extract embeddings from several relevant emotional audio samples using the pre-trained emotion perceiver conditioner in the T2S, forming a fixed emotion embedding set V.",
       "zh": "对于每种情感 ei ∈ E，我们使用 T2S 中预训练的情感感知条件器，从若干条相关的情感音频样本中提取嵌入，构成一个固定的情感嵌入集合 V。"
      }
     ]
    },
    {
     "id": "p-text-to-emotion-t2e-3",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-text-to-emotion-t2e-3-1",
       "original": "Then, we use the large language model Deepseek-r1 as a teacher to map a text input t to a 7-dimensional emotion probability distribution:",
       "zh": "然后，我们使用大语言模型 Deepseek-r1 作为教师，将文本输入 t 映射为一个 7 维情感概率分布：p = Deepseek-r1(t) ∈ ∆7，其中 ∆7 为 7 维概率单纯形（满足 Σi=1..7 pi = 1，pi ≥ 0）。"
      }
     ]
    },
    {
     "id": "eq-text-to-emotion-t2e-1",
     "type": "equation",
     "page": 4,
     "original": "p = Deepseek-r1(t) ∈∆7, (3)"
    },
    {
     "id": "p-text-to-emotion-t2e-4",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-text-to-emotion-t2e-4-1",
       "original": "where",
       "zh": "如 Figure 2 所示，输入序列构造为 [c, p, e⟨BT⟩, Etext, e⟨BA⟩, Esem]，其中 c 表示说话人属性，p 控制时长，Etext 表示文本嵌入，Esem 表示由语义 codec 从真实语音中提取的语义 token 的嵌入。e⟨BT⟩ 和 e⟨BA⟩ 作为专用的边界 token，分别用于界定文本序列和语义序列的范围。"
      }
     ]
    },
    {
     "id": "eq-text-to-emotion-t2e-2",
     "type": "equation",
     "page": 4,
     "original": "∆7"
    },
    {
     "id": "p-text-to-emotion-t2e-5",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-text-to-emotion-t2e-5-1",
       "original": "is the 7-dimensional probability simplex (P7 i=1 pi = 1, pi ≥0).",
       "zh": "然后，我们使用大语言模型 Deepseek-r1 作为教师，将文本输入 t 映射为一个 7 维情感概率分布：p = Deepseek-r1(t) ∈ ∆7，其中 ∆7 为 7 维概率单纯形（满足 Σi=1..7 pi = 1，pi ≥ 0）。"
      },
      {
       "id": "s-text-to-emotion-t2e-5-2",
       "original": "To enable efficient inference with smaller models, we apply knowledge distillation to transfer the teacher’s behavior to a smaller student model Qwen-3- 1.7b.",
       "zh": "为了能够用更小的模型实现高效推理，我们应用知识蒸馏，将教师的行为迁移到更小的学生模型 Qwen-3-1.7b。"
      }
     ]
    },
    {
     "id": "p-text-to-emotion-t2e-6",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-text-to-emotion-t2e-6-1",
       "original": "We construct a training dataset of 1000 text-distribution pairs using two types of prompts with Deepseek-r1:",
       "zh": "我们使用 Deepseek-r1 配合两类提示，构建了一个包含 1000 个文本—分布对的训练数据集："
      }
     ]
    },
    {
     "id": "p-text-to-emotion-t2e-7",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-text-to-emotion-t2e-7-1",
       "original": "• Descriptive: “Please generate descriptive sentences that express {emotion}.” • Script-like: “Please generate script-like utterances that express {emotion}.”",
       "zh": "• 描述型：“请生成表达{情感}的描述性句子。”• 剧本型：“请生成表达{情感}的剧本式台词。”"
      }
     ]
    },
    {
     "id": "p-text-to-emotion-t2e-8",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-text-to-emotion-t2e-8-1",
       "original": "For each generated sentence, we use a classification prompt to obtain the corresponding emotion distribution: “Given the input sentence, return a JSON object with probabilities for each of the 7 emotions.",
       "zh": "对于每个生成的句子，我们使用一条分类提示来获取对应的情感分布：“给定输入句子，返回一个 JSON 对象，给出 7 种情感各自的概率。"
      },
      {
       "id": "s-text-to-emotion-t2e-8-2",
       "original": "Probabilities must sum to 1 and be rounded to two decimal places.”",
       "zh": "概率之和必须为 1，并四舍五入保留两位小数。”"
      }
     ]
    },
    {
     "id": "p-text-to-emotion-t2e-9",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-text-to-emotion-t2e-9-1",
       "original": "Using this dataset, we fine-tune Qwen-3-1.7b via LoRA.",
       "zh": "利用该数据集，我们通过 LoRA 对 Qwen-3-1.7b 进行微调。"
      },
      {
       "id": "s-text-to-emotion-t2e-9-2",
       "original": "The training objective is to minimize the cross-entropy loss between the student model’s predictions and the teacherprovided distributions: min ϕ E(t,p)∼D CrossEntropy Qwen-3θ+ϕ(t), p",
       "zh": "训练目标是最小化学生模型预测与教师分布之间的交叉熵：min_ϕ E_{(t,p)~D} CrossEntropy(Qwen-3_{θ+ϕ}(t), p)（式 4），其中 θ 为 Qwen-3-1.7b 原始参数，ϕ 为 LoRA 参数，t 为数据集 D 的输入文本样本，p 为教师模型生成的软概率分布。"
      }
     ]
    },
    {
     "id": "eq-text-to-emotion-t2e-3",
     "type": "equation",
     "page": 5,
     "original": ", (4)"
    },
    {
     "id": "p-text-to-emotion-t2e-10",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-text-to-emotion-t2e-10-1",
       "original": "where θ denotes the original parameters of Qwen-3-1.7b and ϕ represents the LoRA parameters. t refers to input text samples from the dataset D, while p denotes the soft probability distributions generated by the teacher model.",
       "zh": "训练目标是最小化学生模型预测与教师分布之间的交叉熵：min_ϕ E_{(t,p)~D} CrossEntropy(Qwen-3_{θ+ϕ}(t), p)（式 4），其中 θ 为 Qwen-3-1.7b 原始参数，ϕ 为 LoRA 参数，t 为数据集 D 的输入文本样本，p 为教师模型生成的软概率分布。"
      },
      {
       "id": "s-text-to-emotion-t2e-10-2",
       "original": "After training, the distilled Qwen-3-1.7b model can efficiently replace Deepseek-r1 during inference with significantly reduced computational cost.",
       "zh": "训练完成后，蒸馏得到的 Qwen-3-1.7b 模型即可在推理时高效替代 Deepseek-r1，计算成本显著降低。"
      }
     ]
    },
    {
     "id": "p-text-to-emotion-t2e-11",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-text-to-emotion-t2e-11-1",
       "original": "Next step, the emotion vector einput is computed as a weighted average over the emotion embedding set V:",
       "zh": "接下来，情感向量 einput 通过对情感嵌入集合 V 加权平均计算得到："
      }
     ]
    },
    {
     "id": "eq-text-to-emotion-t2e-4",
     "type": "equation",
     "page": 5,
     "original": "e∈E pe · 1 |Ve|"
    },
    {
     "id": "p-text-to-emotion-t2e-12",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-text-to-emotion-t2e-12-1",
       "original": "einput = X",
       "zh": "（公式片段：e_input = X（见原文）。）"
      }
     ]
    },
    {
     "id": "eq-text-to-emotion-t2e-5",
     "type": "equation",
     "page": 5,
     "original": "X"
    },
    {
     "id": "eq-text-to-emotion-t2e-6",
     "type": "equation",
     "page": 5,
     "original": "v∈Ve v. (5)"
    },
    {
     "id": "p-text-to-emotion-t2e-13",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-text-to-emotion-t2e-13-1",
       "original": "Finally, this emotion vector is fed as a prompt into the T2S model, enabling the generation of speech with the desired emotional characteristics.",
       "zh": "最后，该情感向量作为提示送入 T2S 模型，从而生成具有所需情感特征的语音。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-experiments",
   "num": null,
   "level": 1,
   "page": 5,
   "title": {
    "original": "Experiments",
    "zh": "实验"
   },
   "blocks": [
    {
     "id": "p-experiments-1",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-experiments-1-1",
       "original": "Experimental Settings Datasets: We trained our model using 55K hours of data, including 30K Chinese data and 25K English data.",
       "zh": "实验设置 数据集：我们使用 55K 小时数据训练模型，其中包括 30K 小时中文数据和 25K 小时英文数据。"
      },
      {
       "id": "s-experiments-1-2",
       "original": "Most of the data comes from Emilia dataset (He et al. 2024), in addition to some audiobooks and purchasing data.",
       "zh": "大部分数据来自 Emilia 数据集（He et al. 2024），另有一部分有声读物和外购数据。"
      },
      {
       "id": "s-experiments-1-3",
       "original": "A total of 135 hours of emotional data came from 361 speakers, of which 29 hours came from the ESD dataset (Zhou et al. 2021) and the rest from commercial purchases.",
       "zh": "情感数据共 135 小时，来自 361 位说话人，其中 29 小时来自 ESD 数据集（Zhou et al. 2021），其余来自商业购买。"
      },
      {
       "id": "s-experiments-1-4",
       "original": "To validate the fundamental capabilities of TTS systems, we evaluated our model on four benchmarks: (1) SeedTTS test-en (Anastassiou et al. 2024), introduced in SeedTTS containing 1,000 utterances from the Common Voice dataset; (2) SeedTTS test-zh (Anastassiou et al. 2024), 2,000 utterances sourced from DiDiSpeech (Guo et al. 2021); (3) LibriSpeech-testclean (Panayotov et al. 2015), 2,620 randomly selected utterances from the LibriSpeech corpus; and (4) AISHELL-1 (Bu et al. 2017), 1,000 utterances randomly sampled from the AISHELL-1 dataset.",
       "zh": "为验证 TTS 系统的基础能力，我们在四个基准上评估模型：(1) SeedTTS test-en（Anastassiou et al. 2024），出自 SeedTTS，包含 1,000 条来自 Common Voice 数据集的语音；(2) SeedTTS test-zh（Anastassiou et al. 2024），包含 2,000 条来自 DiDiSpeech（Guo et al. 2021）的语音；(3) LibriSpeech-testclean（Panayotov et al. 2015），从 LibriSpeech 语料库中随机选取的 2,620 条语音；以及 (4) AISHELL-1（Bu et al. 2017），从 AISHELL-1 数据集中随机抽取的 1,000 条语音。"
      },
      {
       "id": "s-experiments-1-5",
       "original": "To better assess emotional modeling capability, we recruited 12 speakers (5 males and 7 females) to record an emotional test set.",
       "zh": "为更好地评估情感建模能力，我们招募了 12 位说话人（5 男 7 女）录制了一个情感测试集。"
      },
      {
       "id": "s-experiments-1-6",
       "original": "Each speaker recorded 3 sentences for each of the 7 emotional categories.",
       "zh": "每位说话人为 7 类情感各录制 3 句。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-evaluation-metrics",
   "num": null,
   "level": 2,
   "page": 5,
   "title": {
    "original": "Evaluation Metrics:",
    "zh": "评估指标"
   },
   "blocks": [
    {
     "id": "p-evaluation-metrics-1",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-evaluation-metrics-1-1",
       "original": "Objectively, speech intelligibility is evaluated using word error rate (WER), with FunASR (Gao et al. 2023) for Chinese content and Whisper (Radford et al. 2023) for English.",
       "zh": "客观评估方面，语音可懂度使用词错误率（WER）衡量，中文内容用 FunASR（Gao et al. 2023）识别，英文用 Whisper（Radford et al. 2023）识别。"
      },
      {
       "id": "s-evaluation-metrics-1-2",
       "original": "Speaker similarity (SS) is computed as the cosine similarity between speaker embeddings from FunASR’s pretrained speaker recognition model, while emotion similarity (ES) is calculated using emotion representations from the open-source emotion2vec (Ma et al. 2024) model.",
       "zh": "说话人相似度（SS）计算为 FunASR 预训练说话人识别模型所提取说话人嵌入之间的余弦相似度，而情感相似度（ES）则使用开源 emotion2vec（Ma et al. 2024）模型的情感表征计算。"
      },
      {
       "id": "s-evaluation-metrics-1-3",
       "original": "Subjective evaluation is conducted through a multidimensional Mean Opinion Score (MOS) framework, where Similarity MOS (SMOS), Prosody MOS (PMOS), Quality MOS (QMOS), and Emotion MOS (EMOS) assess speaker similarity, prosody, audio quality, and emotional fidelity respectively, each rated on a 1–5 scale.",
       "zh": "主观评估通过多维平均意见分（MOS）框架进行，其中相似度 MOS（SMOS）、韵律 MOS（PMOS）、质量 MOS（QMOS）和情感 MOS（EMOS）分别评估说话人相似度、韵律、音质和情感保真度，各项均按 1–5 分打分。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-baseline",
   "num": null,
   "level": 2,
   "page": 5,
   "title": {
    "original": "Baseline:",
    "zh": "基线"
   },
   "blocks": [
    {
     "id": "p-baseline-1",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-baseline-1-1",
       "original": "We compared our model with state-of-the-art zeroshot TTS systems, including MaskGCT (Wang et al. 2024), F5-TTS (Chen et al. 2024b), CosyVocie2 (Du et al. 2024b), SparkTTS (Wang et al. 2025) and the original IndexTTS (Deng et al. 2025) model.",
       "zh": "我们将模型与最先进的零样本 TTS 系统进行了比较，包括 MaskGCT（Wang et al. 2024）、F5-TTS（Chen et al. 2024b）、CosyVocie2（Du et al. 2024b）、SparkTTS（Wang et al. 2025）以及原版 IndexTTS（Deng et al. 2025）模型。"
      },
      {
       "id": "s-baseline-1-2",
       "original": "In addition, we conduct two ablation experiments to validate the architectural design and training methodology of IndexTTS2: (1) GPT latent enhancement removal.",
       "zh": "此外，我们开展了两项消融实验以验证 IndexTTS2 的架构设计与训练方法：(1) 移除 GPT 隐表征增强。"
      },
      {
       "id": "s-baseline-1-3",
       "original": "This experiment ablates the GPT- derived latent feature enhancement to evaluate its functional contribution in the S2M module.",
       "zh": "该实验消融源自 GPT 的隐特征增强，以评估其在 S2M 模块中的功能贡献。"
      },
      {
       "id": "s-baseline-1-4",
       "original": "(2) Training strategy ablation.",
       "zh": "(2) 训练策略消融。"
      },
      {
       "id": "s-baseline-1-5",
       "original": "This experiment ablates additional training strategies to evaluate its contribution to highly expressive emotional speech synthesis.",
       "zh": "该实验消融额外的训练策略，以评估其对高表现力情感语音合成的贡献。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-training",
   "num": null,
   "level": 2,
   "page": 5,
   "title": {
    "original": "Training",
    "zh": "训练"
   },
   "blocks": [
    {
     "id": "p-training-1",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-training-1-1",
       "original": "Hyperparameter Details: We trained IndexTTS2 on 8 NVIDIA A100 80GB GPUs using the AdamW optimizer with an initial learning rate of 2e-4.",
       "zh": "超参数细节：我们在 8 张 NVIDIA A100 80GB GPU 上训练 IndexTTS2，使用 AdamW 优化器，初始学习率 2e-4。"
      },
      {
       "id": "s-training-1-2",
       "original": "Our model was trained for a total of three weeks.",
       "zh": "模型总共训练了三周。"
      },
      {
       "id": "s-training-1-3",
       "original": "We used the same text tokenizer as IndexTTS and adopted the semantic codec from the MaskGCT model.",
       "zh": "我们使用与 IndexTTS 相同的文本分词器，并采用了 MaskGCT 模型的语义 codec。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-experiment-results",
   "num": null,
   "level": 2,
   "page": 5,
   "title": {
    "original": "Experiment Results",
    "zh": "实验结果"
   },
   "blocks": []
  },
  {
   "id": "sec-basic",
   "num": null,
   "level": 2,
   "page": 5,
   "title": {
    "original": "Basic",
    "zh": "基础能力"
   },
   "blocks": [
    {
     "id": "p-basic-1",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-basic-1-1",
       "original": "Competence Comparison: We evaluated IndexTTS2 on standard test sets (LibriSpeech-test-clean, SeedTTS test-zh/en, and AIShell-1 test)1.",
       "zh": "能力对比：我们在标准测试集（LibriSpeech-test-clean、SeedTTS test-zh/en 与 AIShell-1 test）上评测 IndexTTS2（脚注 1）。"
      },
      {
       "id": "s-basic-1-2",
       "original": "As shown in Table 1, compared to five representative models (MaskGCT, F5- TTS, CosyVoice2, SparkTTS, and the original IndexTTS), IndexTTS2 achieves SOTA performance in objective evaluation across most test sets, with only marginal underperformance on AIShell-1 relative to the ground truth and IndexTTS.",
       "zh": "如 Table 1 所示，与五个代表性模型（MaskGCT、F5-TTS、CosyVoice2、SparkTTS 和原版 IndexTTS）相比，IndexTTS2 在多数测试集的客观评估上取得 SOTA 表现，仅在 AIShell-1 上相对真实语音与 IndexTTS 略有不及。"
      },
      {
       "id": "s-basic-1-3",
       "original": "In subjective evaluation, IndexTTS2 outperforms all baseline models except for a slight underperformance against IndexTTS on SeedTTS test-en.",
       "zh": "在主观评估中，IndexTTS2 优于所有基线模型，仅在 SeedTTS test-en 上略逊于 IndexTTS。"
      },
      {
       "id": "s-basic-1-4",
       "original": "Results from the ablation experiment show that removing the GPT latent enhancement consistently improves SS while degrading WER across datasets, and the ablated model receives lower subjective scores across the board compared to IndexTTS2.",
       "zh": "消融实验结果表明，移除 GPT 隐表征增强会在各数据集上一致地提升 SS 但同时劣化 WER，且消融模型在所有主观评分上都低于 IndexTTS2。"
      },
      {
       "id": "s-basic-1-5",
       "original": "Notably, the subjective speaker similarity MOS (SMOS) indicate that despite the slight drop in SS, the enhanced model is perceived by human listeners as more similar to the target speaker.",
       "zh": "值得注意的是，主观说话人相似度 MOS（SMOS）表明，尽管 SS 略有下降，人类听感上增强模型反而更接近目标说话人。"
      },
      {
       "id": "s-basic-1-6",
       "original": "These findings confirm the importance of GPT latents in enhancing semantic clarity.",
       "zh": "这些发现印证了 GPT 隐表征在增强语义清晰度上的重要性。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-emotional-performance-comparison",
   "num": null,
   "level": 2,
   "page": 5,
   "title": {
    "original": "Emotional Performance Comparison:",
    "zh": "情感表现对比"
   },
   "blocks": [
    {
     "id": "p-emotional-performance-comparison-1",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-emotional-performance-comparison-1-1",
       "original": "We evaluated IndexTTS2’s emotional expressiveness on our constructed emotional dataset using relevant metrics.",
       "zh": "我们在构建的情感数据集上使用相关指标评估了 IndexTTS2 的情感表现力。"
      },
      {
       "id": "s-emotional-performance-comparison-1-2",
       "original": "As shown in Table 1To ensure cross-dataset evaluation consistency, we reimplemented some published experiments.",
       "zh": "如 Table 1（脚注，原文与正文连排）所示：为保证跨数据集评估的一致性，我们复现了部分已发表的实验。"
      },
      {
       "id": "s-emotional-performance-comparison-1-3",
       "original": "Observed minor performance variations—attributable to inherent model fluctuations or using FunASR-provided speaker feature replacements—remain within acceptable ranges, preserve overall rankings, and validate original results.",
       "zh": "观察到的轻微性能波动——可归因于模型固有的波动或改用 FunASR 提供的说话人特征——仍在可接受范围内，不影响整体排名，并验证了原始结果。"
      }
     ]
    },
    {
     "id": "tab-emotional-performance-comparison-1",
     "type": "table_caption",
     "page": 6,
     "original": "Table 1: Zero-Shot Performance Comparison of Various Systems on Different Datasets",
     "zh": "表 1：各系统在不同数据集上的零样本性能对比"
    }
   ]
  },
  {
   "id": "sec-dataset",
   "num": null,
   "level": 2,
   "page": 6,
   "title": {
    "original": "Dataset",
    "zh": "数据集"
   },
   "blocks": [
    {
     "id": "p-dataset-1",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-dataset-1-1",
       "original": "Model SS↑ WER(%)↓ SMOS↑ PMOS↑ QMOS↑ Ground Truth",
       "zh": "表头：Model / SS↑ / WER(%)↓ / SMOS↑ / PMOS↑ / QMOS↑——Ground Truth（后续照原文）。"
      }
     ]
    },
    {
     "id": "eq-dataset-1",
     "type": "equation",
     "page": 6,
     "original": "0.833 3.405 4.02±0.22 3.85±0.26 4.23±0.12"
    },
    {
     "id": "eq-dataset-2",
     "type": "equation",
     "page": 6,
     "original": "MaskGCT"
    },
    {
     "id": "eq-dataset-3",
     "type": "equation",
     "page": 6,
     "original": "0.790 7.759 4.12±0.09 3.98±0.11 4.19±0.19"
    },
    {
     "id": "eq-dataset-4",
     "type": "equation",
     "page": 6,
     "original": "F5-TTS"
    },
    {
     "id": "eq-dataset-5",
     "type": "equation",
     "page": 6,
     "original": "0.821 8.044 4.08±0.21 3.73±0.27 4.12±0.13"
    },
    {
     "id": "eq-dataset-6",
     "type": "equation",
     "page": 6,
     "original": "CosyVoice2"
    },
    {
     "id": "eq-dataset-7",
     "type": "equation",
     "page": 6,
     "original": "0.843 5.999 4.02±0.22 4.04±0.28 4.17±0.25"
    },
    {
     "id": "eq-dataset-8",
     "type": "equation",
     "page": 6,
     "original": "SparkTTS"
    },
    {
     "id": "eq-dataset-9",
     "type": "equation",
     "page": 6,
     "original": "0.756 8.843 4.06±0.20 3.94±0.21 4.15±0.16"
    },
    {
     "id": "eq-dataset-10",
     "type": "equation",
     "page": 6,
     "original": "IndexTTS"
    },
    {
     "id": "eq-dataset-11",
     "type": "equation",
     "page": 6,
     "original": "0.819 3.436 4.23±0.14 4.02±0.18 4.29±0.22"
    },
    {
     "id": "eq-dataset-12",
     "type": "equation",
     "page": 6,
     "original": "IndexTTS2"
    },
    {
     "id": "eq-dataset-13",
     "type": "equation",
     "page": 6,
     "original": "0.870 3.115 4.44±0.12 4.12±0.17 4.29±0.14"
    },
    {
     "id": "eq-dataset-14",
     "type": "equation",
     "page": 6,
     "original": "- GPT latent"
    },
    {
     "id": "eq-dataset-15",
     "type": "equation",
     "page": 6,
     "original": "0.887 3.334 4.33±0.10 4.10±0.12 4.17±0.22"
    }
   ]
  },
  {
   "id": "sec-librispeech",
   "num": null,
   "level": 2,
   "page": 6,
   "title": {
    "original": "LibriSpeech",
    "zh": "LibriSpeech"
   },
   "blocks": [
    {
     "id": "p-librispeech-1",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-librispeech-1-1",
       "original": "test-clean Ground Truth",
       "zh": "（表格行）test-clean；Ground Truth（后续照原文）。"
      }
     ]
    },
    {
     "id": "eq-librispeech-1",
     "type": "equation",
     "page": 6,
     "original": "0.820 1.897 4.21±0.19 4.06±0.25 4.40±0.15"
    },
    {
     "id": "eq-librispeech-2",
     "type": "equation",
     "page": 6,
     "original": "MaskGCT"
    },
    {
     "id": "eq-librispeech-3",
     "type": "equation",
     "page": 6,
     "original": "0.824 2.530 4.35±0.20 4.02±0.24 4.50±0.17"
    },
    {
     "id": "eq-librispeech-4",
     "type": "equation",
     "page": 6,
     "original": "F5-TTS"
    },
    {
     "id": "eq-librispeech-5",
     "type": "equation",
     "page": 6,
     "original": "0.803 1.937 4.44±0.14 4.06±0.21 4.40±0.12"
    },
    {
     "id": "eq-librispeech-6",
     "type": "equation",
     "page": 6,
     "original": "CosyVoice2"
    },
    {
     "id": "eq-librispeech-7",
     "type": "equation",
     "page": 6,
     "original": "0.794 3.277 4.42±0.26 3.96±0.24 4.52±0.15"
    },
    {
     "id": "eq-librispeech-8",
     "type": "equation",
     "page": 6,
     "original": "SparkTTS"
    },
    {
     "id": "eq-librispeech-9",
     "type": "equation",
     "page": 6,
     "original": "0.755 1.543 3.96±0.23 4.12±0.22 3.89±0.20"
    },
    {
     "id": "eq-librispeech-10",
     "type": "equation",
     "page": 6,
     "original": "IndexTTS"
    },
    {
     "id": "eq-librispeech-11",
     "type": "equation",
     "page": 6,
     "original": "0.808 1.844 4.67±0.16 4.52±0.14 4.67±0.19"
    },
    {
     "id": "eq-librispeech-12",
     "type": "equation",
     "page": 6,
     "original": "IndexTTS2"
    },
    {
     "id": "eq-librispeech-13",
     "type": "equation",
     "page": 6,
     "original": "0.860 1.521 4.42±0.19 4.40±0.13 4.48±0.15"
    },
    {
     "id": "eq-librispeech-14",
     "type": "equation",
     "page": 6,
     "original": "- GPT latent"
    },
    {
     "id": "eq-librispeech-15",
     "type": "equation",
     "page": 6,
     "original": "0.879 1.616 4.40±0.22 4.31±0.17 4.42±0.20"
    }
   ]
  },
  {
   "id": "sec-seedtts",
   "num": null,
   "level": 2,
   "page": 6,
   "title": {
    "original": "SeedTTS",
    "zh": "SeedTTS"
   },
   "blocks": [
    {
     "id": "p-seedtts-1",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-seedtts-1-1",
       "original": "test-en Ground Truth",
       "zh": "为验证 TTS 系统的基础能力，我们在四个基准上评估模型：(1) SeedTTS test-en（Anastassiou et al. 2024），出自 SeedTTS，包含 1,000 条来自 Common Voice 数据集的语音；(2) SeedTTS test-zh（Anastassiou et al. 2024），包含 2,000 条来自 DiDiSpeech（Guo et al. 2021）的语音；(3) LibriSpeech-testclean（Panayotov et al. 2015），从 LibriSpeech 语料库中随机选取的 2,620 条语音；以及 (4) AISHELL-1（Bu et al. 2017），从 AISHELL-1 数据集中随机抽取的 1,000 条语音。"
      }
     ]
    },
    {
     "id": "eq-seedtts-1",
     "type": "equation",
     "page": 6,
     "original": "0.776 1.254 3.81±0.24 4.04±0.28 4.21±0.26"
    },
    {
     "id": "eq-seedtts-2",
     "type": "equation",
     "page": 6,
     "original": "MaskGCT"
    },
    {
     "id": "eq-seedtts-3",
     "type": "equation",
     "page": 6,
     "original": "0.807 2.447 3.94±0.22 3.54±0.26 4.15±0.15"
    },
    {
     "id": "eq-seedtts-4",
     "type": "equation",
     "page": 6,
     "original": "F5-TTS"
    },
    {
     "id": "eq-seedtts-5",
     "type": "equation",
     "page": 6,
     "original": "0.844 1.514 4.19±0.21 3.88±0.23 4.38±0.16"
    },
    {
     "id": "eq-seedtts-6",
     "type": "equation",
     "page": 6,
     "original": "CosyVoice2"
    },
    {
     "id": "eq-seedtts-7",
     "type": "equation",
     "page": 6,
     "original": "0.846 1.451 4.12±0.25 4.33±0.19 4.31±0.21"
    },
    {
     "id": "eq-seedtts-8",
     "type": "equation",
     "page": 6,
     "original": "SparkTTS"
    },
    {
     "id": "eq-seedtts-9",
     "type": "equation",
     "page": 6,
     "original": "0.683 2.636 3.65±0.26 4.10±0.25 3.79±0.18"
    },
    {
     "id": "eq-seedtts-10",
     "type": "equation",
     "page": 6,
     "original": "IndexTTS"
    },
    {
     "id": "eq-seedtts-11",
     "type": "equation",
     "page": 6,
     "original": "0.781 1.097 4.10±0.09 3.73±0.23 4.33±0.17"
    },
    {
     "id": "eq-seedtts-12",
     "type": "equation",
     "page": 6,
     "original": "IndexTTS2"
    },
    {
     "id": "eq-seedtts-13",
     "type": "equation",
     "page": 6,
     "original": "0.865 1.008 4.44±0.17 4.46±0.11 4.54±0.08"
    },
    {
     "id": "eq-seedtts-14",
     "type": "equation",
     "page": 6,
     "original": "- GPT latent"
    },
    {
     "id": "eq-seedtts-15",
     "type": "equation",
     "page": 6,
     "original": "0.890 1.261 4.44±0.13 4.33±0.15 4.48±0.17"
    }
   ]
  },
  {
   "id": "sec-seedtts-2",
   "num": null,
   "level": 2,
   "page": 6,
   "title": {
    "original": "SeedTTS",
    "zh": "SeedTTS"
   },
   "blocks": [
    {
     "id": "p-seedtts-2-1",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-seedtts-2-1-1",
       "original": "test-zh Ground Truth",
       "zh": "（表格行）test-zh；Ground Truth（后续照原文）。"
      }
     ]
    },
    {
     "id": "eq-seedtts-2-1",
     "type": "equation",
     "page": 6,
     "original": "0.847 1.840 4.27±0.19 3.83±0.25 4.42±0.07"
    },
    {
     "id": "eq-seedtts-2-2",
     "type": "equation",
     "page": 6,
     "original": "MaskGCT"
    },
    {
     "id": "eq-seedtts-2-3",
     "type": "equation",
     "page": 6,
     "original": "0.598 4.930 3.92±0.03 2.67±0.08 3.67±0.07"
    },
    {
     "id": "eq-seedtts-2-4",
     "type": "equation",
     "page": 6,
     "original": "F5-TTS"
    },
    {
     "id": "eq-seedtts-2-5",
     "type": "equation",
     "page": 6,
     "original": "0.831 3.671 4.17±0.30 3.60±0.25 4.25±0.22"
    },
    {
     "id": "eq-seedtts-2-6",
     "type": "equation",
     "page": 6,
     "original": "CosyVoice2"
    },
    {
     "id": "eq-seedtts-2-7",
     "type": "equation",
     "page": 6,
     "original": "0.834 1.967 4.21±0.23 4.33±0.19 4.40±0.21"
    },
    {
     "id": "eq-seedtts-2-8",
     "type": "equation",
     "page": 6,
     "original": "SparkTTS"
    },
    {
     "id": "eq-seedtts-2-9",
     "type": "equation",
     "page": 6,
     "original": "0.593 1.743 3.48±0.22 3.96±0.16 3.79±0.20"
    },
    {
     "id": "eq-seedtts-2-10",
     "type": "equation",
     "page": 6,
     "original": "IndexTTS"
    },
    {
     "id": "eq-seedtts-2-11",
     "type": "equation",
     "page": 6,
     "original": "0.794 1.478 4.48±0.18 4.25±0.19 4.46±0.07"
    },
    {
     "id": "eq-seedtts-2-12",
     "type": "equation",
     "page": 6,
     "original": "IndexTTS2"
    },
    {
     "id": "eq-seedtts-2-13",
     "type": "equation",
     "page": 6,
     "original": "0.843 1.516 4.54±0.11 4.42±0.17 4.52±0.17"
    },
    {
     "id": "eq-seedtts-2-14",
     "type": "equation",
     "page": 6,
     "original": "- GPT latent"
    },
    {
     "id": "eq-seedtts-2-15",
     "type": "equation",
     "page": 6,
     "original": "0.868 1.791 4.33±0.22 4.27±0.26 4.40±0.19"
    }
   ]
  },
  {
   "id": "sec-aishell-1",
   "num": null,
   "level": 2,
   "page": 6,
   "title": {
    "original": "AIShell-1",
    "zh": "AIShell-1"
   },
   "blocks": [
    {
     "id": "p-aishell-1-1",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-aishell-1-1-1",
       "original": "test 2, IndexTTS2 achieves the highest scores across all four subjective evaluation dimensions, demonstrating superior emotional rendering capabilities.",
       "zh": "（上接 Table 2）IndexTTS2 在全部四项主观评估维度上取得最高分，展现出更优的情感渲染能力。"
      },
      {
       "id": "s-aishell-1-1-2",
       "original": "Examining the objective metrics, compared to five baseline models, IndexTTS2 shows leading performance in SS and ES, except for higher WER than IndexTTS.",
       "zh": "从客观指标看，与五个基线模型相比，IndexTTS2 在 SS 和 ES 上领先，只是 WER 高于 IndexTTS。"
      },
      {
       "id": "s-aishell-1-1-3",
       "original": "In the ablation setting, while IndexTTS2 exhibits slightly lower SS and ES than the variant without GPT latent enhancement, the gap in SS is minimal and the difference in ES (0.001) is practically insignificant; however, it maintains a clear advantage in WER and achieves superior performance across all subjective metrics.",
       "zh": "在消融设定下，尽管 IndexTTS2 的 SS 和 ES 略低于移除 GPT 隐表征增强的变体，但 SS 的差距很小、ES 的差异（0.001）在实际中可忽略；然而它在 WER 上保持明显优势，并在所有主观指标上表现更优。"
      },
      {
       "id": "s-aishell-1-1-4",
       "original": "This indicates that the GPT latent enhancement in the S2M module play a crucial role in maintaining speech clarity and articulation under high emotional expressiveness.",
       "zh": "这表明 S2M 模块中的 GPT 隐表征增强，对在高情感表现力下保持语音清晰度与发音准确性起着关键作用。"
      },
      {
       "id": "s-aishell-1-1-5",
       "original": "In contrast, removing the three-stage training strategy severely degrades emotional expressiveness, resulting in substantial performance drops across all metrics except WER.",
       "zh": "相比之下，移除三阶段训练策略会严重削弱情感表现力，导致除 WER 外的所有指标都大幅下滑。"
      },
      {
       "id": "s-aishell-1-1-6",
       "original": "Overall, these results demonstrate that IndexTTS2, with its multi-stage training incorporating GRL-based emotion disentanglement and GPT fusion, effectively balances emotional expressiveness with speech clarity, achieving state-of-the-art performance in emotional speech synthesis while maintaining exceptional textual accuracy.",
       "zh": "总体而言，这些结果表明 IndexTTS2 通过结合基于 GRL 的情感解耦与 GPT 融合的多阶段训练，有效平衡了情感表现力与语音清晰度，在保持出色文本准确度的同时，达到了情感语音合成的最先进水平。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-evaluation-of-natural-language-c",
   "num": null,
   "level": 2,
   "page": 6,
   "title": {
    "original": "Evaluation of Natural Language-Controlled Emotional",
    "zh": "自然语言控制情感合成的评估"
   },
   "blocks": [
    {
     "id": "p-evaluation-of-natural-language-c-1",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-evaluation-of-natural-language-c-1-1",
       "original": "Synthesis: We evaluated the T2E module’s effectiveness for natural language emotion control using a constructed test set (Table 3).",
       "zh": "合成：我们使用构建的测试集（Table 3）评估了 T2E 模块在自然语言情感控制上的有效性。"
      },
      {
       "id": "s-evaluation-of-natural-language-c-1-2",
       "original": "The test set included texts with half manually assigned emotion prompts and half using target texts as prompts.",
       "zh": "该测试集中一半文本使用人工指定的情感提示，另一半直接使用目标文本作为提示。"
      },
      {
       "id": "s-evaluation-of-natural-language-c-1-3",
       "original": "Through double-blind human evaluation across four metrics (timbre similarity, emotion similarity, rhythm and audio quality), our approach outperformed CosyVoice2 in all aspects, demonstrating superior natural language-based emotion control capabilities.",
       "zh": "通过四个维度（音色相似度、情感相似度、节奏与音质）的双盲人工评估，我们的方法在所有方面均优于 CosyVoice2，展现出更强的基于自然语言的情感控制能力。"
      },
      {
       "id": "s-evaluation-of-natural-language-c-1-4",
       "original": "This confirms its enhanced ability to align speech synthesis with specified emotional contexts while maintaining consistent perfor-",
       "zh": "这证实了它在保持一贯表现（下接 Table 2 数值碎块）的同时，使语音合成与指定情感上下文对齐的能力更强。"
      }
     ]
    },
    {
     "id": "tab-evaluation-of-natural-language-c-1",
     "type": "table_caption",
     "page": 7,
     "original": "Table 2: Performance Comparison of Various Systems on the Emotional Test Dataset",
     "zh": "表 2：各系统在情感测试数据集上的性能对比"
    }
   ]
  },
  {
   "id": "sec-model",
   "num": null,
   "level": 2,
   "page": 7,
   "title": {
    "original": "Model",
    "zh": "Model"
   },
   "blocks": [
    {
     "id": "p-model-1",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-model-1-1",
       "original": "SS↑ WER(%)↓ ES↑ SMOS↑ EMOS↑ PMOS↑ QMOS↑ MaskGCT",
       "zh": "表头：Model / SS↑ / WER(%)↓ / ES↑ / SMOS↑ / EMOS↑ / PMOS↑ / QMOS↑——MaskGCT（后续照原文）。"
      }
     ]
    },
    {
     "id": "eq-model-1",
     "type": "equation",
     "page": 7,
     "original": "0.810 4.059 0.841 3.42±0.36 3.37±0.42 3.04±0.40 3.39±0.37"
    },
    {
     "id": "eq-model-2",
     "type": "equation",
     "page": 7,
     "original": "F5-TTS"
    },
    {
     "id": "eq-model-3",
     "type": "equation",
     "page": 7,
     "original": "0.773 3.053 0.757 3.37±0.40 3.16±0.32 3.13±0.30 3.36±0.29"
    },
    {
     "id": "eq-model-4",
     "type": "equation",
     "page": 7,
     "original": "CosyVoice2"
    },
    {
     "id": "eq-model-5",
     "type": "equation",
     "page": 7,
     "original": "0.803 1.831 0.802 3.13±0.32 3.09±0.33 2.98±0.35 3.28±0.22"
    },
    {
     "id": "eq-model-6",
     "type": "equation",
     "page": 7,
     "original": "SparkTTS"
    },
    {
     "id": "eq-model-7",
     "type": "equation",
     "page": 7,
     "original": "0.673 2.299 0.832 3.01±0.26 3.16±0.24 3.21±0.28 3.04±0.18"
    },
    {
     "id": "eq-model-8",
     "type": "equation",
     "page": 7,
     "original": "IndexTTS"
    },
    {
     "id": "eq-model-9",
     "type": "equation",
     "page": 7,
     "original": "0.649 1.136 0.660 3.17±0.39 2.74±0.36 3.15±0.36 3.56±0.27"
    },
    {
     "id": "eq-model-10",
     "type": "equation",
     "page": 7,
     "original": "IndexTTS2"
    },
    {
     "id": "eq-model-11",
     "type": "equation",
     "page": 7,
     "original": "0.836 1.883 0.887 4.24±0.19 4.22±0.12 4.08±0.20 4.18±0.10"
    },
    {
     "id": "eq-model-12",
     "type": "equation",
     "page": 7,
     "original": "- GPT latent"
    },
    {
     "id": "eq-model-13",
     "type": "equation",
     "page": 7,
     "original": "0.869 2.766 0.888 4.15±0.20 4.15±0.19 4.02±0.20 4.03±0.11"
    },
    {
     "id": "eq-model-14",
     "type": "equation",
     "page": 7,
     "original": "- Training strategy"
    },
    {
     "id": "eq-model-15",
     "type": "equation",
     "page": 7,
     "original": "0.773 1.362 0.689 3.44±0.29 2.82±0.35 3.83±0.33 3.69±0.18"
    },
    {
     "id": "tab-model-1",
     "type": "table_caption",
     "page": 7,
     "original": "Table 3: Comparison of Natural Language-Based Emotion Control with CosyVoice2",
     "zh": "表 3：与 CosyVoice2 在基于自然语言的情感控制上的对比"
    }
   ]
  },
  {
   "id": "sec-model-2",
   "num": null,
   "level": 2,
   "page": 7,
   "title": {
    "original": "Model",
    "zh": "Model"
   },
   "blocks": [
    {
     "id": "p-model-2-1",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-model-2-1-1",
       "original": "SMOS↑ EMOS↑ PMOS↑ QMOS↑ CosyVoice2",
       "zh": "（表格行：SMOS↑/EMOS↑/PMOS↑/QMOS↑——CosyVoice2 2.973±0.26/3.339±0.30/3.679±0.19/3.429±0.24；IndexTTS2 3.875±0.21/3.786±0.24/4.143±0.13/4.071±0.15。）（正文残句）……表现。"
      }
     ]
    },
    {
     "id": "eq-model-2-1",
     "type": "equation",
     "page": 7,
     "original": "2.973±0.26 3.339±0.30 3.679±0.19 3.429±0.24"
    },
    {
     "id": "eq-model-2-2",
     "type": "equation",
     "page": 7,
     "original": "IndexTTS2"
    },
    {
     "id": "eq-model-2-3",
     "type": "equation",
     "page": 7,
     "original": "3.875±0.21 3.786±0.24 4.143±0.13 4.071±0.15"
    },
    {
     "id": "p-model-2-2",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-model-2-2-1",
       "original": "mance.",
       "zh": "（表格行：SMOS↑/EMOS↑/PMOS↑/QMOS↑——CosyVoice2 2.973±0.26/3.339±0.30/3.679±0.19/3.429±0.24；IndexTTS2 3.875±0.21/3.786±0.24/4.143±0.13/4.071±0.15。）（正文残句）……表现。"
      }
     ]
    },
    {
     "id": "tab-model-2-1",
     "type": "table_caption",
     "page": 7,
     "original": "Table 4: Token Number Error Rate for Duration Control with Different Settings(%)",
     "zh": "表 4：不同设定下时长控制的 token 数量错误率（%）"
    }
   ]
  },
  {
   "id": "sec-dataset-2",
   "num": null,
   "level": 2,
   "page": 7,
   "title": {
    "original": "Dataset",
    "zh": "数据集"
   },
   "blocks": [
    {
     "id": "eq-dataset-2-1",
     "type": "equation",
     "page": 7,
     "original": "*1 *0.75 *0.875 *1.125 *1.25"
    }
   ]
  },
  {
   "id": "sec-seedtts-3",
   "num": null,
   "level": 2,
   "page": 7,
   "title": {
    "original": "SeedTTS",
    "zh": "SeedTTS"
   },
   "blocks": [
    {
     "id": "p-seedtts-3-1",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-seedtts-3-1-1",
       "original": "test-zh",
       "zh": "为验证 TTS 系统的基础能力，我们在四个基准上评估模型：(1) SeedTTS test-en（Anastassiou et al. 2024），出自 SeedTTS，包含 1,000 条来自 Common Voice 数据集的语音；(2) SeedTTS test-zh（Anastassiou et al. 2024），包含 2,000 条来自 DiDiSpeech（Guo et al. 2021）的语音；(3) LibriSpeech-testclean（Panayotov et al. 2015），从 LibriSpeech 语料库中随机选取的 2,620 条语音；以及 (4) AISHELL-1（Bu et al. 2017），从 AISHELL-1 数据集中随机抽取的 1,000 条语音。"
      }
     ]
    },
    {
     "id": "eq-seedtts-3-1",
     "type": "equation",
     "page": 7,
     "original": "0.019 0.067 0.023 0.014 0.018"
    }
   ]
  },
  {
   "id": "sec-seedtts-4",
   "num": null,
   "level": 2,
   "page": 7,
   "title": {
    "original": "SeedTTS",
    "zh": "SeedTTS"
   },
   "blocks": [
    {
     "id": "p-seedtts-4-1",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-seedtts-4-1-1",
       "original": "test-en",
       "zh": "为验证 TTS 系统的基础能力，我们在四个基准上评估模型：(1) SeedTTS test-en（Anastassiou et al. 2024），出自 SeedTTS，包含 1,000 条来自 Common Voice 数据集的语音；(2) SeedTTS test-zh（Anastassiou et al. 2024），包含 2,000 条来自 DiDiSpeech（Guo et al. 2021）的语音；(3) LibriSpeech-testclean（Panayotov et al. 2015），从 LibriSpeech 语料库中随机选取的 2,620 条语音；以及 (4) AISHELL-1（Bu et al. 2017），从 AISHELL-1 数据集中随机抽取的 1,000 条语音。"
      }
     ]
    },
    {
     "id": "eq-seedtts-4-1",
     "type": "equation",
     "page": 7,
     "original": "0.015 0 0.009 0.023 0.013"
    },
    {
     "id": "tab-seedtts-4-1",
     "type": "table_caption",
     "page": 7,
     "original": "Table 5: MOS Scores for Different Models under Duration Control",
     "zh": "表 5：时长控制下不同模型的 MOS 分数"
    }
   ]
  },
  {
   "id": "sec-datasets",
   "num": null,
   "level": 2,
   "page": 7,
   "title": {
    "original": "Datasets",
    "zh": "数据集（续）"
   },
   "blocks": [
    {
     "id": "p-datasets-1",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-datasets-1-1",
       "original": "Model SMOS↑ PMOS↑ QMOS↑ GT",
       "zh": "（表格：Model × SMOS↑ × PMOS↑ × QMOS↑——GT 3.82±0.23/3.72±0.19/3.96±0.06；MaskGCT 4.04±0.18/4.16±0.06/3.66±0.11；F5-TTS 4.32±0.15/4.04±0.15/4.32±0.16；IndexTTS2 4.56±0.08/4.38±0.12/4.42±0.02。）"
      }
     ]
    },
    {
     "id": "eq-datasets-1",
     "type": "equation",
     "page": 7,
     "original": "3.82±0.23 3.72±0.19 3.96±0.06"
    },
    {
     "id": "eq-datasets-2",
     "type": "equation",
     "page": 7,
     "original": "MaskGCT"
    },
    {
     "id": "eq-datasets-3",
     "type": "equation",
     "page": 7,
     "original": "4.04±0.18 4.16±0.06 3.66±0.11"
    },
    {
     "id": "eq-datasets-4",
     "type": "equation",
     "page": 7,
     "original": "F5-TTS"
    },
    {
     "id": "eq-datasets-5",
     "type": "equation",
     "page": 7,
     "original": "4.32±0.15 4.04±0.15 4.32±0.16"
    },
    {
     "id": "eq-datasets-6",
     "type": "equation",
     "page": 7,
     "original": "IndexTTS2 4.56±0.08"
    },
    {
     "id": "eq-datasets-7",
     "type": "equation",
     "page": 7,
     "original": "4.38±0.12 4.42±0.02"
    }
   ]
  },
  {
   "id": "sec-seedtts-5",
   "num": null,
   "level": 2,
   "page": 7,
   "title": {
    "original": "SeedTTS",
    "zh": "SeedTTS"
   },
   "blocks": [
    {
     "id": "p-seedtts-5-1",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-seedtts-5-1-1",
       "original": "test-zh GT",
       "zh": "（表格行）test-zh；GT（后续照原文）。"
      }
     ]
    },
    {
     "id": "eq-seedtts-5-1",
     "type": "equation",
     "page": 7,
     "original": "4.32±0.26 4.34±0.05 4.42±0.11"
    },
    {
     "id": "eq-seedtts-5-2",
     "type": "equation",
     "page": 7,
     "original": "MaskGCT"
    },
    {
     "id": "eq-seedtts-5-3",
     "type": "equation",
     "page": 7,
     "original": "4.54±0.16 4.24±0.08 4.44±0.13"
    },
    {
     "id": "eq-seedtts-5-4",
     "type": "equation",
     "page": 7,
     "original": "F5-TTS"
    },
    {
     "id": "eq-seedtts-5-5",
     "type": "equation",
     "page": 7,
     "original": "4.34±0.18 4.24±0.06 4.26±0.09"
    },
    {
     "id": "eq-seedtts-5-6",
     "type": "equation",
     "page": 7,
     "original": "IndexTTS2 4.48±0.09"
    },
    {
     "id": "eq-seedtts-5-7",
     "type": "equation",
     "page": 7,
     "original": "4.46±0.18 4.44±0.05"
    }
   ]
  },
  {
   "id": "sec-seedtts-6",
   "num": null,
   "level": 2,
   "page": 7,
   "title": {
    "original": "SeedTTS",
    "zh": "SeedTTS"
   },
   "blocks": [
    {
     "id": "p-seedtts-6-1",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-seedtts-6-1-1",
       "original": "test-en",
       "zh": "为验证 TTS 系统的基础能力，我们在四个基准上评估模型：(1) SeedTTS test-en（Anastassiou et al. 2024），出自 SeedTTS，包含 1,000 条来自 Common Voice 数据集的语音；(2) SeedTTS test-zh（Anastassiou et al. 2024），包含 2,000 条来自 DiDiSpeech（Guo et al. 2021）的语音；(3) LibriSpeech-testclean（Panayotov et al. 2015），从 LibriSpeech 语料库中随机选取的 2,620 条语音；以及 (4) AISHELL-1（Bu et al. 2017），从 AISHELL-1 数据集中随机抽取的 1,000 条语音。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-duration-specified-speech-synthe",
   "num": null,
   "level": 2,
   "page": 7,
   "title": {
    "original": "Duration-Specified Speech Synthesis Evaluation:",
    "zh": "指定时长语音合成评估"
   },
   "blocks": [
    {
     "id": "p-duration-specified-speech-synthe-1",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-duration-specified-speech-synthe-1-1",
       "original": "We evaluated IndexTTS2’s duration control accuracy on SeedTTS test-zh and test-en using five experimental setups with duration scalings (original, 0.75×, 0.875×, 1.125×, and 1.25×).",
       "zh": "为验证 TTS 系统的基础能力，我们在四个基准上评估模型：(1) SeedTTS test-en（Anastassiou et al. 2024），出自 SeedTTS，包含 1,000 条来自 Common Voice 数据集的语音；(2) SeedTTS test-zh（Anastassiou et al. 2024），包含 2,000 条来自 DiDiSpeech（Guo et al. 2021）的语音；(3) LibriSpeech-testclean（Panayotov et al. 2015），从 LibriSpeech 语料库中随机选取的 2,620 条语音；以及 (4) AISHELL-1（Bu et al. 2017），从 AISHELL-1 数据集中随机抽取的 1,000 条语音。\n（原始数据照录）\nWe evaluated IndexTTS2’s duration control accuracy on SeedTTS test-zh and test-en using five experimental setups with duration scalings (original, 0.75×, 0.875×, 1.125×, and 1.25×)."
      },
      {
       "id": "s-duration-specified-speech-synthe-1-2",
       "original": "Results in Table 4 show minimal token number error rates (<0.02% for original durations and <0.03% for 0.875×/1.125×), with only a slight increase to 0.067% on SeedTTS test-zh for larger scaling factors (0.75×).",
       "zh": "表 4 的结果显示 token 数误差率极小（原始时长 <0.02%，0.875×/1.125× 时 <0.03%），仅在较大缩放因子（0.75×）下 SeedTTS test-zh 上微升至 0.067%。"
      },
      {
       "id": "s-duration-specified-speech-synthe-1-3",
       "original": "These findings indicate an almost negligible gap between MaskGCT F5TTS IndexTTS2 MaskGCT F5TTS IndexTTS2",
       "zh": "这些发现表明（图内图例：MaskGCT / F5TTS / IndexTTS2（两组）。）之间的差距几乎可以忽略。"
      }
     ]
    },
    {
     "id": "eq-duration-specified-speech-synthe-1",
     "type": "equation",
     "page": 7,
     "original": "4% 4% 3% 3% 2% 2% 1% 1% 0% 0% 0.75 0.785 1 1.125 0.75 0.785 1 1.125"
    },
    {
     "id": "p-duration-specified-speech-synthe-2",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-duration-specified-speech-synthe-2-1",
       "original": "(a) SeedTTS test-en (b) SeedTTS test-zh",
       "zh": "为验证 TTS 系统的基础能力，我们在四个基准上评估模型：(1) SeedTTS test-en（Anastassiou et al. 2024），出自 SeedTTS，包含 1,000 条来自 Common Voice 数据集的语音；(2) SeedTTS test-zh（Anastassiou et al. 2024），包含 2,000 条来自 DiDiSpeech（Guo et al. 2021）的语音；(3) LibriSpeech-testclean（Panayotov et al. 2015），从 LibriSpeech 语料库中随机选取的 2,620 条语音；以及 (4) AISHELL-1（Bu et al. 2017），从 AISHELL-1 数据集中随机抽取的 1,000 条语音。"
      }
     ]
    },
    {
     "id": "fig-duration-specified-speech-synthe-1",
     "type": "figure_caption",
     "page": 7,
     "original": "Figure 4: Comparison of WER for duration control section.",
     "zh": "图 4：时长控制部分的 WER 对比。"
    },
    {
     "id": "p-duration-specified-speech-synthe-3",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-duration-specified-speech-synthe-3-1",
       "original": "generated tokens and target durations, demonstrating IndexTTS2’s precise control over speech synthesis timing.",
       "zh": "生成 token 数与目标时长之间的差距几乎可以忽略，证明 IndexTTS2 对语音合成时长的精确控制。"
      }
     ]
    },
    {
     "id": "p-duration-specified-speech-synthe-4",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-duration-specified-speech-synthe-4-1",
       "original": "We further assessed speech quality under duration control by comparing WER.",
       "zh": "我们通过比较 WER 进一步评估了时长控制下的语音质量。"
      },
      {
       "id": "s-duration-specified-speech-synthe-4-2",
       "original": "As shown in Figure 4, IndexTTS2 matches F5-TTS on test-en and significantly outperforms MaskGCT.",
       "zh": "如 Figure 4 所示，IndexTTS2 在 test-en 上与 F5-TTS 持平，并显著优于 MaskGCT。"
      },
      {
       "id": "s-duration-specified-speech-synthe-4-3",
       "original": "On test-zh, IndexTTS2 surpasses F5-TTS by 0.5 pp and MaskGCT by 2 pp, with only a marginal drop in performance under scaled durations.",
       "zh": "在 test-zh 上，IndexTTS2 比 F5-TTS 高 0.5 个百分点、比 MaskGCT 高 2 个百分点，且在缩放时长下性能仅有轻微下降。"
      },
      {
       "id": "s-duration-specified-speech-synthe-4-4",
       "original": "To investigate the prosodic advantages of autoregressive modeling under fixed duration control, we conducted a comparison between IndexTTS2 and non-autoregressive TTS systems using SMOS, PMOS, and QMOS metrics.",
       "zh": "为考察固定时长控制下自回归建模的韵律优势，我们使用 SMOS、PMOS 和 QMOS 指标对 IndexTTS2 与非自回归 TTS 系统进行了比较。"
      },
      {
       "id": "s-duration-specified-speech-synthe-4-5",
       "original": "Results in Table 5 show that IndexTTS2 achieves superior prosody and speech quality.",
       "zh": "Table 5 的结果显示，IndexTTS2 取得了更优的韵律与语音质量。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-conclusion",
   "num": null,
   "level": 1,
   "page": 7,
   "title": {
    "original": "Conclusion",
    "zh": "结论"
   },
   "blocks": [
    {
     "id": "p-conclusion-1",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-conclusion-1-1",
       "original": "In this work, we present IndexTTS2, a zero-shot speech synthesis system that enhances duration modeling, emotional expressiveness, and phonetic clarity via an innovative autoregressive architecture with optimized training.",
       "zh": "本工作提出 IndexTTS2，这是一个零样本语音合成系统，通过创新的自回归架构与优化的训练方法，增强了时长建模、情感表现力和语音清晰度。"
      },
      {
       "id": "s-conclusion-1-2",
       "original": "Featuring a unique duration control for precise timing and a mechanism to decouple emotional and speaker features, IndexTTS2 facilitates emotion-specific speech generation from reference audio.",
       "zh": "凭借独特的精确时长控制以及情感与说话人特征解耦机制，IndexTTS2 能够从参考音频生成特定情感的语音。"
      },
      {
       "id": "s-conclusion-1-3",
       "original": "An LLM-driven module matches emotion vectors for language-based modulation, ensuring natural expression.",
       "zh": "一个由 LLM 驱动的模块负责匹配情感向量以实现基于语言的调控，确保自然的表达。"
      },
      {
       "id": "s-conclusion-1-4",
       "original": "Combined with specialized training and data augmentation strategies, the model achieves SOTA- level performance in high-expressive emotional restoration.",
       "zh": "结合专门的训练与数据增强策略，该模型在高表现力情感还原上达到了 SOTA 级性能。"
      },
      {
       "id": "s-conclusion-1-5",
       "original": "Efficient in zero-shot settings, IndexTTS2 produces expressive speech with controllable duration and emotions, advancing voice solutions for animated dubbing and video narration while pushing the boundaries of speech synthesis technology.",
       "zh": "IndexTTS2 在零样本设定下高效工作，能生成时长与情感可控、富有表现力的语音，推动了动画配音与视频旁白等语音方案的发展，也拓展了语音合成技术的边界。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-references",
   "num": null,
   "level": 1,
   "page": 8,
   "title": {
    "original": "References",
    "zh": "References"
   },
   "blocks": [
    {
     "id": "p-references-1",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-references-1-1",
       "original": "Anastassiou, P.; Chen, J.; Chen, J.; Chen, Y.; Chen, Z.; Chen, Z.; Cong, J.; Deng, L.; Ding, C.; Gao, L.; et al. 2024."
      },
      {
       "id": "s-references-1-2",
       "original": "Seedtts: A family of high-quality versatile speech generation models. arXiv preprint arXiv:2406.02430."
      }
     ]
    },
    {
     "id": "p-references-2",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-references-2-1",
       "original": "Bor, M."
      },
      {
       "id": "s-references-2-2",
       "original": "C.; Vidler, J.; and Roedig, U. 2016."
      },
      {
       "id": "s-references-2-3",
       "original": "LoRa for the Internet of Things."
      },
      {
       "id": "s-references-2-4",
       "original": "In Ewsn, volume 16, 361–366."
      }
     ]
    },
    {
     "id": "p-references-3",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-references-3-1",
       "original": "Bu, H.; Du, J.; Na, X.; Wu, B.; and Zheng, H. 2017."
      },
      {
       "id": "s-references-3-2",
       "original": "Aishell1: An open-source mandarin speech corpus and a speech recognition baseline."
      },
      {
       "id": "s-references-3-3",
       "original": "In 2017 20th conference of the oriental chapter of the international coordinating committee on speech databases and speech I/O systems and assessment (O-COCOSDA), 1–5."
      },
      {
       "id": "s-references-3-4",
       "original": "IEEE."
      }
     ]
    },
    {
     "id": "p-references-4",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-references-4-1",
       "original": "Casanova, E.; Davis, K.; G¨olge, E.; G¨oknar, G.; Gulea, I.; Hart, L.; Aljafari, A.; Meyer, J.; Morais, R.; Olayemi, S.; et al. 2024."
      },
      {
       "id": "s-references-4-2",
       "original": "XTTS: a Massively Multilingual Zero-Shot Textto-Speech Model."
      },
      {
       "id": "s-references-4-3",
       "original": "CoRR."
      }
     ]
    },
    {
     "id": "p-references-5",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-references-5-1",
       "original": "Chen, R."
      },
      {
       "id": "s-references-5-2",
       "original": "T.; Rubanova, Y.; Bettencourt, J.; and Duvenaud, D.",
       "zh": "如 Figure 4 所示，IndexTTS2 在 test-en 上与 F5-TTS 持平，并显著优于 MaskGCT。"
      },
      {
       "id": "s-references-5-3",
       "original": "K. 2018."
      }
     ]
    },
    {
     "id": "p-references-6",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-references-6-1",
       "original": "Neural ordinary differential equations."
      }
     ]
    },
    {
     "id": "p-references-7",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-references-7-1",
       "original": "Advances in neural information processing systems, 31."
      }
     ]
    },
    {
     "id": "p-references-8",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-references-8-1",
       "original": "Chen, S.; Feng, Y.; He, L.; He, T.; He, W.; Hu, Y.; Lin, B.; Lin, Y.; Pan, Y.; Tan, P.; et al. 2024a.",
       "zh": "如 Figure 4 所示，IndexTTS2 在 test-en 上与 F5-TTS 持平，并显著优于 MaskGCT。"
      },
      {
       "id": "s-references-8-2",
       "original": "Takin: A cohort of superior quality zero-shot speech generation models. arXiv preprint arXiv:2409.12139."
      }
     ]
    },
    {
     "id": "p-references-9",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-references-9-1",
       "original": "Chen, W.; Yang, S.; Li, G.; and Wu, X. 2025."
      },
      {
       "id": "s-references-9-2",
       "original": "DrawSpeech: Expressive Speech Synthesis Using Prosodic Sketches as Control Conditions."
      },
      {
       "id": "s-references-9-3",
       "original": "In ICASSP 2025-2025 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP), 1–5."
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
     "page": 8,
     "sentences": [
      {
       "id": "s-references-10-1",
       "original": "Chen, Y.; Niu, Z.; Ma, Z.; Deng, K.; Wang, C.; Zhao, J.; Yu, K.; and Chen, X. 2024b."
      },
      {
       "id": "s-references-10-2",
       "original": "F5-tts: A fairytaler that fakes fluent and faithful speech with flow matching. arXiv preprint arXiv:2410.06885."
      }
     ]
    },
    {
     "id": "p-references-11",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-references-11-1",
       "original": "Cho, D.-H.; Oh, H.-S.; Kim, S.-B.; and Lee, S.-W. 2025."
      },
      {
       "id": "s-references-11-2",
       "original": "EmoSphere++: Emotion-controllable zero-shot textto-speech via emotion-adaptive spherical vector."
      }
     ]
    },
    {
     "id": "p-references-12",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-references-12-1",
       "original": "IEEE Transactions on Affective Computing."
      }
     ]
    },
    {
     "id": "p-references-13",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-references-13-1",
       "original": "Cong, G.; Pan, J.; Li, L.; Qi, Y.; Peng, Y.; van den Hengel, A.; Yang, J.; and Huang, Q. 2025."
      }
     ]
    },
    {
     "id": "p-references-14",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-references-14-1",
       "original": "Emodubber: Towards high quality and emotion controllable movie dubbing."
      },
      {
       "id": "s-references-14-2",
       "original": "In Proceedings of the Computer Vision and Pattern Recognition Conference, 15863–15873."
      }
     ]
    },
    {
     "id": "p-references-15",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-references-15-1",
       "original": "Deng, W.; Zhou, S.; Shu, J.; Wang, J.; and Wang, L. 2025."
      },
      {
       "id": "s-references-15-2",
       "original": "IndexTTS: An Industrial-Level Controllable and Efficient Zero-Shot Text-To-Speech System."
      }
     ]
    },
    {
     "id": "p-references-16",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-references-16-1",
       "original": "arXiv preprint arXiv:2502.05512."
      }
     ]
    },
    {
     "id": "p-references-17",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-references-17-1",
       "original": "Devalal, S.; and Karthikeyan, A. 2018."
      },
      {
       "id": "s-references-17-2",
       "original": "LoRa technology-an overview."
      },
      {
       "id": "s-references-17-3",
       "original": "In 2018 second international conference on electronics, communication and aerospace technology (ICECA), 284–290."
      },
      {
       "id": "s-references-17-4",
       "original": "IEEE."
      },
      {
       "id": "s-references-17-5",
       "original": "Du, Z.; Chen, Q.; Zhang, S.; Hu, K.; Lu, H.; Yang, Y.; Hu, H.; Zheng, S.; Gu, Y.; Ma, Z.; et al. 2024a."
      }
     ]
    },
    {
     "id": "p-references-18",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-references-18-1",
       "original": "Cosyvoice: A scalable multilingual zero-shot text-to-speech synthesizer based on supervised semantic tokens. arXiv preprint arXiv:2407.05407."
      },
      {
       "id": "s-references-18-2",
       "original": "Du, Z.; Wang, Y.; Chen, Q.; Shi, X.; Lv, X.; Zhao, T.; Gao, Z.; Yang, Y.; Gao, C.; Wang, H.; et al. 2024b.",
       "zh": "如 Figure 4 所示，IndexTTS2 在 test-en 上与 F5-TTS 持平，并显著优于 MaskGCT。"
      },
      {
       "id": "s-references-18-3",
       "original": "Cosyvoice 2: Scalable streaming speech synthesis with large language models. arXiv preprint arXiv:2412.10117."
      },
      {
       "id": "s-references-18-4",
       "original": "Elizalde, B.; Deshmukh, S.; Ismail, M."
      },
      {
       "id": "s-references-18-5",
       "original": "A.; and Wang, H. 2023."
      },
      {
       "id": "s-references-18-6",
       "original": "CLAP Learning Audio Concepts from Natural Language Supervision."
      },
      {
       "id": "s-references-18-7",
       "original": "In IEEE International Conference on Acoustics, Speech and Signal Processing ICASSP 2023, Rhodes Island, Greece, June 4-10, 2023, 1–5."
      },
      {
       "id": "s-references-18-8",
       "original": "IEEE."
      },
      {
       "id": "s-references-18-9",
       "original": "Eskimez, S."
      },
      {
       "id": "s-references-18-10",
       "original": "E.; Wang, X.; Thakker, M.; Li, C.; Tsai, C.; Xiao, Z.; Yang, H.; Zhu, Z.; Tang, M.; Tan, X.; Liu, Y.; Zhao, S.; and Kanda, N. 2024."
      },
      {
       "id": "s-references-18-11",
       "original": "E2 TTS: Embarrassingly Easy Fully Non-Autoregressive Zero-Shot TTS."
      },
      {
       "id": "s-references-18-12",
       "original": "In IEEE Spoken Language Technology Workshop, SLT 2024, Macao, December"
      }
     ]
    },
    {
     "id": "eq-references-1",
     "type": "equation",
     "page": 8,
     "original": "2-5, 2024, 682–689. IEEE."
    },
    {
     "id": "p-references-19",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-references-19-1",
       "original": "Ganin, Y.; Ustinova, E.; Ajakan, H.; Germain, P.; Larochelle, H.; Laviolette, F.; March, M.; and Lempitsky, V. 2016."
      },
      {
       "id": "s-references-19-2",
       "original": "Domain-adversarial training of neural networks."
      },
      {
       "id": "s-references-19-3",
       "original": "Journal of machine learning research, 17(59): 1–35."
      },
      {
       "id": "s-references-19-4",
       "original": "Gao, Z.; Li, Z.; Wang, J.; Luo, H.; Shi, X.; Chen, M.; Li, Y.; Zuo, L.; Du, Z.; and Zhang, S. 2023."
      },
      {
       "id": "s-references-19-5",
       "original": "FunASR: A Fundamental End-to-End Speech Recognition Toolkit."
      },
      {
       "id": "s-references-19-6",
       "original": "In 24th Annual Conference of the International Speech Communication Association, Interspeech 2023, Dublin, Ireland, August"
      }
     ]
    },
    {
     "id": "eq-references-2",
     "type": "equation",
     "page": 8,
     "original": "20-24, 2023, 1593–1597. ISCA."
    },
    {
     "id": "p-references-20",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-references-20-1",
       "original": "Guo, D.; Yang, D.; Zhang, H.; Song, J.; Zhang, R.; Xu, R.; Zhu, Q.; Ma, S.; Wang, P.; Bi, X.; et al. 2025."
      },
      {
       "id": "s-references-20-2",
       "original": "Deepseek-r1: Incentivizing reasoning capability in llms via reinforcement learning. arXiv preprint arXiv:2501.12948."
      },
      {
       "id": "s-references-20-3",
       "original": "Guo, H.-H.; Hu, Y.; Liu, K.; Shen, F.-Y.; Tang, X.; Wu, Y.-C.; Xie, F.-L.; Xie, K.; and Xu, K.-T. 2024.",
       "zh": "如 Figure 4 所示，IndexTTS2 在 test-en 上与 F5-TTS 持平，并显著优于 MaskGCT。"
      }
     ]
    },
    {
     "id": "p-references-21",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-references-21-1",
       "original": "Fireredtts: A foundation text-to-speech framework for industrylevel generative speech applications."
      }
     ]
    },
    {
     "id": "p-references-22",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-references-22-1",
       "original": "arXiv preprint arXiv:2409.03283."
      },
      {
       "id": "s-references-22-2",
       "original": "Guo, T.; Wen, C.; Jiang, D.; Luo, N.; Zhang, R.; Zhao, S.; Li, W.; Gong, C.; Zou, W.; Han, K.; et al. 2021.",
       "zh": "如 Figure 4 所示，IndexTTS2 在 test-en 上与 F5-TTS 持平，并显著优于 MaskGCT。"
      },
      {
       "id": "s-references-22-3",
       "original": "Didispeech: A large scale mandarin speech corpus."
      },
      {
       "id": "s-references-22-4",
       "original": "In ICASSP 2021- 2021 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP), 6968–6972."
      },
      {
       "id": "s-references-22-5",
       "original": "IEEE."
      },
      {
       "id": "s-references-22-6",
       "original": "He, H.; Shang, Z.; Wang, C.; Li, X.; Gu, Y.; Hua, H.; Liu, L.; Yang, C.; Li, J.; Shi, P.; et al. 2024."
      },
      {
       "id": "s-references-22-7",
       "original": "Emilia: An extensive, multilingual, and diverse speech dataset for large-scale speech generation."
      },
      {
       "id": "s-references-22-8",
       "original": "In 2024 IEEE Spoken Language Technology Workshop (SLT), 885–890."
      },
      {
       "id": "s-references-22-9",
       "original": "IEEE."
      },
      {
       "id": "s-references-22-10",
       "original": "Ji, S.; Zuo, J.; Wang, W.; Fang, M.; Zheng, S.; Chen, Q.; Jiang, Z.; Huang, H.; Wang, Z.; Cheng, X.; et al. 2024."
      },
      {
       "id": "s-references-22-11",
       "original": "Controlspeech: Towards simultaneous zero-shot speaker cloning and zero-shot language style control with decoupled codec. arXiv preprint arXiv:2406.01205."
      },
      {
       "id": "s-references-22-12",
       "original": "Ju, Z.; Wang, Y.; Shen, K.; Tan, X.; Xin, D.; Yang, D.; Liu, Y.; Leng, Y.; Song, K.; Tang, S.; Wu, Z.; Qin, T.; Li, X.- Y.; Ye, W.; Zhang, S.; Bian, J.; He, L.; Li, J.; and Zhao, S. 2024.",
       "zh": "如 Figure 4 所示，IndexTTS2 在 test-en 上与 F5-TTS 持平，并显著优于 MaskGCT。"
      },
      {
       "id": "s-references-22-13",
       "original": "NaturalSpeech 3: Zero-Shot Speech Synthesis with Factorized Codec and Diffusion Models. arXiv:2403.03100."
      },
      {
       "id": "s-references-22-14",
       "original": "Kim, D.; Hong, S.; and Choi, Y.-H. 2023."
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
       "original": "SC VALL-E: Style-Controllable Zero-Shot Text to Speech Synthesizer. arXiv preprint arXiv:2307.10550."
      },
      {
       "id": "s-references-23-2",
       "original": "Kim, J.; Kim, S.; Kong, J.; and Yoon, S. 2020."
      },
      {
       "id": "s-references-23-3",
       "original": "Glow-tts: A generative flow for text-to-speech via monotonic alignment search."
      },
      {
       "id": "s-references-23-4",
       "original": "Advances in Neural Information Processing Systems, 33: 8067–8077."
      },
      {
       "id": "s-references-23-5",
       "original": "Koenker, R.; and Bassett Jr, G. 1978."
      },
      {
       "id": "s-references-23-6",
       "original": "Regression quantiles."
      },
      {
       "id": "s-references-23-7",
       "original": "Econometrica: journal of the Econometric Society, 33–50."
      },
      {
       "id": "s-references-23-8",
       "original": "Le, M.; Vyas, A.; Shi, B.; Karrer, B.; Sari, L.; Moritz, R.; Williamson, M.; Manohar, V.; Adi, Y.; Mahadeokar, J.; et al. 2023."
      },
      {
       "id": "s-references-23-9",
       "original": "Voicebox: Text-guided multilingual universal speech generation at scale."
      },
      {
       "id": "s-references-23-10",
       "original": "Advances in neural information processing systems, 36: 14005–14034."
      },
      {
       "id": "s-references-23-11",
       "original": "Lee, K.; Kim, D."
      },
      {
       "id": "s-references-23-12",
       "original": "W.; Kim, J.; and Cho, J. 2024."
      },
      {
       "id": "s-references-23-13",
       "original": "Ditto-tts: Efficient and scalable zero-shot text-to-speech with diffusion transformer. arXiv preprint arXiv:2406.11427."
      },
      {
       "id": "s-references-23-14",
       "original": "Lee, S.; Ping, W.; Ginsburg, B.; Catanzaro, B.; and Yoon, S. 2023."
      },
      {
       "id": "s-references-23-15",
       "original": "BigVGAN: A Universal Neural Vocoder with LargeScale Training."
      },
      {
       "id": "s-references-23-16",
       "original": "In The Eleventh International Conference on Learning Representations, ICLR 2023, Kigali, Rwanda, May 1-5, 2023."
      },
      {
       "id": "s-references-23-17",
       "original": "Li, H.; Li, Y.; Wang, X.; Hu, J.; Xie, Q.; Yang, S.; and Xie, L. 2025."
      },
      {
       "id": "s-references-23-18",
       "original": "FleSpeech: Flexibly Controllable Speech Generation with Various Prompts. arXiv preprint arXiv:2501.04644."
      },
      {
       "id": "s-references-23-19",
       "original": "Li, Y."
      },
      {
       "id": "s-references-23-20",
       "original": "A.; Han, C.; Raghavan, V.; Mischler, G.; and Mesgarani, N. 2023."
      },
      {
       "id": "s-references-23-21",
       "original": "Styletts 2: Towards human-level text-tospeech through style diffusion and adversarial training with large speech language models."
      },
      {
       "id": "s-references-23-22",
       "original": "Advances in Neural Information Processing Systems, 36: 19594–19621."
      },
      {
       "id": "s-references-23-23",
       "original": "Lipman, Y.; Chen, R."
      },
      {
       "id": "s-references-23-24",
       "original": "T.",
       "zh": "如 Figure 4 所示，IndexTTS2 在 test-en 上与 F5-TTS 持平，并显著优于 MaskGCT。"
      },
      {
       "id": "s-references-23-25",
       "original": "Q.; Ben-Hamu, H.; Nickel, M.; and Le, M. 2023."
      },
      {
       "id": "s-references-23-26",
       "original": "Flow Matching for Generative Modeling."
      },
      {
       "id": "s-references-23-27",
       "original": "In The Eleventh International Conference on Learning Representations, ICLR 2023, Kigali, Rwanda, May 1-5, 2023."
      },
      {
       "id": "s-references-23-28",
       "original": "Liu, S. 2024."
      },
      {
       "id": "s-references-23-29",
       "original": "Zero-shot Voice Conversion with Diffusion Transformers. arXiv preprint arXiv:2411.09943."
      },
      {
       "id": "s-references-23-30",
       "original": "Ma, Z.; Zheng, Z.; Ye, J.; Li, J.; Gao, Z.; Zhang, S.; and Chen, X. 2024. emotion2vec: Self-Supervised Pre-Training for Speech Emotion Representation."
      },
      {
       "id": "s-references-23-31",
       "original": "In Ku, L.; Martins, A.; and Srikumar, V., eds., Findings of the Association for Computational Linguistics, ACL 2024, Bangkok, Thailand and virtual meeting, August 11-16, 2024, 15747–15760."
      },
      {
       "id": "s-references-23-32",
       "original": "Association for Computational Linguistics."
      },
      {
       "id": "s-references-23-33",
       "original": "Mentzer, F.; Minnen, D.; Agustsson, E.; and Tschannen, M. 2023."
      },
      {
       "id": "s-references-23-34",
       "original": "Finite scalar quantization: Vq-vae made simple. arXiv preprint arXiv:2309.15505."
      },
      {
       "id": "s-references-23-35",
       "original": "Panayotov, V.; Chen, G.; Povey, D.; and Khudanpur, S. 2015."
      },
      {
       "id": "s-references-23-36",
       "original": "Librispeech: an asr corpus based on public domain audio books."
      },
      {
       "id": "s-references-23-37",
       "original": "In 2015 IEEE international conference on acoustics, speech and signal processing (ICASSP), 5206–5210."
      },
      {
       "id": "s-references-23-38",
       "original": "IEEE."
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
       "original": "Peebles, W.; and Xie, S. 2023."
      },
      {
       "id": "s-references-24-2",
       "original": "Scalable diffusion models with transformers."
      },
      {
       "id": "s-references-24-3",
       "original": "In Proceedings of the IEEE/CVF international conference on computer vision, 4195–4205."
      },
      {
       "id": "s-references-24-4",
       "original": "Qi, T.; Zheng, W.; Lu, C.; Zong, Y.; and Lian, H. 2024.",
       "zh": "如 Figure 4 所示，IndexTTS2 在 test-en 上与 F5-TTS 持平，并显著优于 MaskGCT。"
      },
      {
       "id": "s-references-24-5",
       "original": "PAVITS: Exploring Prosody-Aware VITS for End-to-End Emotional Voice Conversion."
      },
      {
       "id": "s-references-24-6",
       "original": "In IEEE International Conference on Acoustics, Speech and Signal Processing, ICASSP 2024, Seoul, Republic of Korea, April 14-19, 2024, 12697– 12701."
      },
      {
       "id": "s-references-24-7",
       "original": "IEEE."
      },
      {
       "id": "s-references-24-8",
       "original": "Radford, A.; Kim, J."
      },
      {
       "id": "s-references-24-9",
       "original": "W.; Hallacy, C.; Ramesh, A.; Goh, G.; Agarwal, S.; Sastry, G.; Askell, A.; Mishkin, P.; Clark, J.; Krueger, G.; and Sutskever, I. 2021."
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
       "original": "Learning Transferable Visual Models From Natural Language Supervision."
      },
      {
       "id": "s-references-25-2",
       "original": "In Meila, M.; and Zhang, T., eds., Proceedings of the 38th International Conference on Machine Learning, ICML 2021, 18-24 July 2021, Virtual Event, 8748–8763.",
       "zh": "如 Figure 4 所示，IndexTTS2 在 test-en 上与 F5-TTS 持平，并显著优于 MaskGCT。"
      },
      {
       "id": "s-references-25-3",
       "original": "PMLR."
      },
      {
       "id": "s-references-25-4",
       "original": "Radford, A.; Kim, J."
      },
      {
       "id": "s-references-25-5",
       "original": "W.; Xu, T.; Brockman, G.; McLeavey, C.; and Sutskever, I. 2023.",
       "zh": "如 Figure 4 所示，IndexTTS2 在 test-en 上与 F5-TTS 持平，并显著优于 MaskGCT。"
      },
      {
       "id": "s-references-25-6",
       "original": "Robust speech recognition via large-scale weak supervision."
      },
      {
       "id": "s-references-25-7",
       "original": "In International conference on machine learning, 28492–28518."
      },
      {
       "id": "s-references-25-8",
       "original": "PMLR."
      },
      {
       "id": "s-references-25-9",
       "original": "Ren, Y.; Hu, C.; Tan, X.; Qin, T.; Zhao, S.; Zhao, Z.; and Liu, T.-Y. 2022.",
       "zh": "如 Figure 4 所示，IndexTTS2 在 test-en 上与 F5-TTS 持平，并显著优于 MaskGCT。"
      },
      {
       "id": "s-references-25-10",
       "original": "FastSpeech 2: Fast and High-Quality Endto-End Text to Speech."
      },
      {
       "id": "s-references-25-11",
       "original": "Rodr´ıguez, P.; Bautista, M."
      },
      {
       "id": "s-references-25-12",
       "original": "A.; Gonzalez, J.; and Escalera, S. 2018."
      },
      {
       "id": "s-references-25-13",
       "original": "Beyond one-hot encoding: Lower dimensional target embedding."
      },
      {
       "id": "s-references-25-14",
       "original": "Image and Vision Computing, 75: 21–31."
      },
      {
       "id": "s-references-25-15",
       "original": "Rosenblatt, F. 1958."
      },
      {
       "id": "s-references-25-16",
       "original": "The perceptron: a probabilistic model for information storage and organization in the brain."
      },
      {
       "id": "s-references-25-17",
       "original": "Psychological review, 65(6): 386."
      },
      {
       "id": "s-references-25-18",
       "original": "Rumelhart, D."
      },
      {
       "id": "s-references-25-19",
       "original": "E.; Hinton, G."
      },
      {
       "id": "s-references-25-20",
       "original": "E.; and Williams, R."
      },
      {
       "id": "s-references-25-21",
       "original": "J. 1986."
      },
      {
       "id": "s-references-25-22",
       "original": "Learning representations by back-propagating errors."
      }
     ]
    },
    {
     "id": "p-references-26",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-references-26-1",
       "original": "nature, 323(6088): 533–536."
      },
      {
       "id": "s-references-26-2",
       "original": "Sahipjohn, N.; Gudmalwar, A.; Shah, N.; Wasnik, P.; and Shah, R."
      },
      {
       "id": "s-references-26-3",
       "original": "R. 2024."
      },
      {
       "id": "s-references-26-4",
       "original": "DubWise: Video-guided speech duration control in multimodal LLM-based text-to-speech for dubbing. arXiv preprint arXiv:2406.08802."
      },
      {
       "id": "s-references-26-5",
       "original": "Shen, K.; Ju, Z.; Tan, X.; Liu, E.; Leng, Y.; He, L.; Qin, T.; Zhao, S.; and Bian, J. 2024.",
       "zh": "如 Figure 4 所示，IndexTTS2 在 test-en 上与 F5-TTS 持平，并显著优于 MaskGCT。"
      },
      {
       "id": "s-references-26-6",
       "original": "NaturalSpeech 2: Latent Diffusion Models are Natural and Zero-Shot Speech and Singing Synthesizers."
      },
      {
       "id": "s-references-26-7",
       "original": "In The Twelfth International Conference on Learning Representations, ICLR 2024, Vienna, Austria, May"
      }
     ]
    },
    {
     "id": "eq-references-3",
     "type": "equation",
     "page": 9,
     "original": "7-11, 2024."
    },
    {
     "id": "p-references-27",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-references-27-1",
       "original": "Sundaram, J."
      },
      {
       "id": "s-references-27-2",
       "original": "P.",
       "zh": "如 Figure 4 所示，IndexTTS2 在 test-en 上与 F5-TTS 持平，并显著优于 MaskGCT。"
      },
      {
       "id": "s-references-27-3",
       "original": "S.; Du, W.; and Zhao, Z. 2019."
      },
      {
       "id": "s-references-27-4",
       "original": "A survey on LoRa networking: Research problems, current solutions, and open issues."
      },
      {
       "id": "s-references-27-5",
       "original": "IEEE Communications Surveys & Tutorials, 22(1): 371–388."
      },
      {
       "id": "s-references-27-6",
       "original": "Touvron, H.; Lavril, T.; Izacard, G.; Martinet, X.; Lachaux, M.; Lacroix, T.; Rozi`ere, B.; Goyal, N.; Hambro, E.; Azhar, F.; Rodriguez, A.; Joulin, A.; Grave, E.; and Lample, G. 2023.",
       "zh": "如 Figure 4 所示，IndexTTS2 在 test-en 上与 F5-TTS 持平，并显著优于 MaskGCT。"
      },
      {
       "id": "s-references-27-7",
       "original": "LLaMA: Open and Efficient Foundation Language Models."
      },
      {
       "id": "s-references-27-8",
       "original": "CoRR, abs/2302.13971. van den Oord, A.; Vinyals, O.; and Kavukcuoglu, K. 2017."
      },
      {
       "id": "s-references-27-9",
       "original": "Neural Discrete Representation Learning."
      },
      {
       "id": "s-references-27-10",
       "original": "In Advances in Neural Information Processing Systems 30: Annual Conference on Neural Information Processing Systems 2017, December 4-9, 2017, Long Beach, CA, USA, 6306–6315."
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
       "original": "Vaswani, A.; Shazeer, N.; Parmar, N.; Uszkoreit, J.; Jones, L.; Gomez, A."
      },
      {
       "id": "s-references-28-2",
       "original": "N.; Kaiser, L.; and Polosukhin, I. 2017."
      },
      {
       "id": "s-references-28-3",
       "original": "Attention is All you Need."
      },
      {
       "id": "s-references-28-4",
       "original": "In Advances in Neural Information Processing Systems 30: Annual Conference on Neural Information Processing Systems 2017, December 4-9, 2017, Long Beach, CA, USA, 5998–6008."
      },
      {
       "id": "s-references-28-5",
       "original": "Wang, X.; Jiang, M.; Ma, Z.; Zhang, Z.; Liu, S.; Li, L.; Liang, Z.; Zheng, Q.; Wang, R.; Feng, X.; et al. 2025."
      },
      {
       "id": "s-references-28-6",
       "original": "Spark-tts: An efficient llm-based text-to-speech model with single-stream decoupled speech tokens."
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
       "original": "arXiv preprint arXiv:2503.01710."
      },
      {
       "id": "s-references-29-2",
       "original": "Wang, Y.; Zhan, H.; Liu, L.; Zeng, R.; Guo, H.; Zheng, J.; Zhang, Q.; Zhang, X.; Zhang, S.; and Wu, Z. 2024."
      },
      {
       "id": "s-references-29-3",
       "original": "Maskgct: Zero-shot text-to-speech with masked generative codec transformer. arXiv preprint arXiv:2409.00750."
      },
      {
       "id": "s-references-29-4",
       "original": "Yang, A.; Li, A.; Yang, B.; Zhang, B.; Hui, B.; Zheng, B.; Yu, B.; Gao, C.; Huang, C.; Lv, C.; Zheng, C.; Liu, D.; Zhou, F.; Huang, F.; Hu, F.; Ge, H.; Wei, H.; Lin, H.; Tang, J.; Yang, J.; Tu, J.; Zhang, J.; Yang, J.; Yang, J.; Zhou, J.; Zhou, J.; Lin, J.; Dang, K.; Bao, K.; Yang, K.; Yu, L.; Deng, L.; Li, M.; Xue, M.; Li, M.; Zhang, P.; Wang, P.; Zhu, Q.; Men, R.; Gao, R.; Liu, S.; Luo, S.; Li, T.; Tang, T.; Yin, W.; Ren, X.; Wang, X.; Zhang, X.; Ren, X.; Fan, Y.; Su, Y.; Zhang, Y.; Zhang, Y.; Wan, Y.; Liu, Y.; Wang, Z.; Cui, Z.; Zhang, Z.; Zhou, Z.; and Qiu, Z. 2025.",
       "zh": "如 Figure 4 所示，IndexTTS2 在 test-en 上与 F5-TTS 持平，并显著优于 MaskGCT。"
      },
      {
       "id": "s-references-29-5",
       "original": "Qwen3 Technical Report. arXiv:2505.09388."
      },
      {
       "id": "s-references-29-6",
       "original": "Yang, D.; Wang, D.; Guo, H.; Chen, X.; Wu, X.; and Meng, H. 2024."
      },
      {
       "id": "s-references-29-7",
       "original": "Simplespeech: Towards simple and efficient textto-speech with scalar latent transformer diffusion models. arXiv preprint arXiv:2406.02328."
      },
      {
       "id": "s-references-29-8",
       "original": "Zhang, X.; Zhang, X.; Peng, K.; Tang, Z.; Manohar, V.; Liu, Y.; Hwang, J.; Li, D.; Wang, Y.; Chan, J.; et al. 2025."
      },
      {
       "id": "s-references-29-9",
       "original": "Vevo: Controllable zero-shot voice imitation with self-supervised disentanglement. arXiv preprint arXiv:2502.07243."
      },
      {
       "id": "s-references-29-10",
       "original": "Zhou, K.; Sisman, B.; Liu, R.; and Li, H. 2021."
      },
      {
       "id": "s-references-29-11",
       "original": "Seen and Unseen Emotional Style Transfer for Voice Conversion with A New Emotional Speech Dataset."
      },
      {
       "id": "s-references-29-12",
       "original": "In ICASSP 2021 - 2021 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP), 920–924."
      },
      {
       "id": "s-references-29-13",
       "original": "Zhou, K.; Sisman, B.; Rana, R.; Schuller, B."
      },
      {
       "id": "s-references-29-14",
       "original": "W.; and Li, H. 2023."
      },
      {
       "id": "s-references-29-15",
       "original": "Emotion Intensity and its Control for Emotional Voice Conversion."
      },
      {
       "id": "s-references-29-16",
       "original": "IEEE Trans."
      },
      {
       "id": "s-references-29-17",
       "original": "Affect."
      },
      {
       "id": "s-references-29-18",
       "original": "Comput., 14(1): 31–48."
      },
      {
       "id": "s-references-29-19",
       "original": "Zhou, Y.; Qin, X.; Jin, Z.; Zhou, S.; Lei, S.; Zhou, S.; Wu, Z.; and Jia, J. 2024."
      },
      {
       "id": "s-references-29-20",
       "original": "Voxinstruct: Expressive human instructionto-speech generation with unified multilingual codec language modelling."
      },
      {
       "id": "s-references-29-21",
       "original": "In Proceedings of the 32nd ACM International Conference on Multimedia, 554–563."
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
    "quote": "This becomes a significant limitation in applications requiring strict audio-visual synchronization, such as video dubbing."
   },
   "kind": "motivation",
   "title": "动机锚点是配音",
   "explanation": "全文的出发点不是抽象地补 AR 的短板，而是视频配音这个具体场景：配音要求整句台词恰好落在口型/画面窗口内，差一两百毫秒就会出戏。NAR 模型（F5-TTS、MaskGCT）靠时长预测器天然能做到，AR 模型逐 token 采样则无法控制终止位置。理解了这一点，后文所有设计——token 数量指定、Wnum=Wsem 约束——都是为这一个场景服务的，也解释了为什么论文把错误率压到 0.1% 以下当作核心卖点。",
   "featured": true
  },
  {
   "id": "ann-002",
   "anchor": {
    "sentence_id": "s-introduction-6-2",
    "quote": "IndexTTS2 is the first autoregressive zero-shot TTS model to combine precise duration control with natural duration generation"
   },
   "kind": "critique",
   "title": "「首个」成立吗",
   "explanation": "「首个结合精确时长控制与自然时长生成的 AR 零样本 TTS」这个 claim 依赖一个窄定义：把「控制」限定为「显式指定语义 token 数」。CosyVoice 用速度因子、VoxInstruct 用自然语言指令也算某种程度上的时长控制，只是精度不够。作者的贡献更准确的表述应是「首个在 AR 下做到 token 级误差 <0.1% 且无需外置时长预测器的方案」。宣传性措辞不影响方法本身的价值，但读结论时应把范围划清楚。",
   "featured": true
  },
  {
   "id": "ann-003",
   "anchor": {
    "sentence_id": "s-introduction-2-2",
    "quote": "enable fast inference via parallel decoding and support flexible parameter control (e.g., duration)"
   },
   "kind": "comparison",
   "title": "AR 与 NAR 的分工",
   "explanation": "这句把两条技术路线的取舍讲得很干净：NAR 用并行解码换速度和可控性（时长是显式参数），AR 用逐 token 采样换自然度和表现力。IndexTTS2 的立场是「不舍得放弃 AR 的自然度，那就把可控性补进 AR」，而不是像另一条路线那样继续优化 NAR 的自然度。这是判断后续一切设计的前提——它本质上是用工程手段抹平范式差异，代价是更复杂的训练管线。"
  },
  {
   "id": "ann-004",
   "anchor": {
    "sentence_id": "s-duration-1-5",
    "quote": "We set the constraint Wsem = Wnum is imposed between Wnum and the semantic positional embedding table Wsem."
   },
   "kind": "concept",
   "title": "全论文的机关",
   "explanation": "这是整篇论文最巧的一处设计：不新开一套时长嵌入表，而是硬性规定时长嵌入表 Wnum 等于语义位置嵌入表 Wsem。「目标 120 个 token」对应的查询向量因此逐维等于「第 120 个位置」的嵌入——AR 模型天然会在位置 T 处感到「该停了」，长度控制被转化为模型早已学会的位置先验。这个参数共享避免了新表的分布偏移，也是「质量不因控时长而下降」的直接原因。缺点是句子本身写错了（We set... is imposed 双重谓语），原文表述很粗糙。",
   "explanation_plain": "让「要生成 N 个 token」复用「第 N 个位置」的嵌入，模型到点自然收尾。",
   "featured": true
  },
  {
   "id": "ann-005",
   "anchor": {
    "sentence_id": "s-training-and-inference-2-2",
    "quote": "p is randomly set to zero with a probability of 30%."
   },
   "kind": "engineering",
   "title": "30% 置零的含义",
   "explanation": "p 以 30% 概率置零，等价于一个模型同时学两个任务：70% 样本学「在指定长度终止」，30% 样本学「不管长度、按韵律自然终止」。这正是 classifier-free guidance 式的训练技巧——同一权重既支持受控生成也支持自由生成，推理时只需改一个输入（p=0 或 p=Wnum·h(T)）。值得注意的是 30% 这个比例没有任何消融，读者不知道 10% 或 50% 是否一样好；这类未消融的超参在复现时是盲点。",
   "featured": false
  },
  {
   "id": "ann-006",
   "anchor": {
    "sentence_id": "s-emotional-control-1-4",
    "quote": "This adversarial mechanism forces e to exclusively capture emotional and rhythmic attributes, remaining invariant to speaker-specific timbre characteristics"
   },
   "kind": "concept",
   "title": "GRL 解耦的原理",
   "explanation": "梯度反转层（GRL，源自 DANN）在情感嵌入 e 后接一个说话人分类器：前向正常分类，反向把梯度乘负系数，于是 e 被训练成「包含一切能让模型合成出情感的韵律信息，但绝不泄露说话人身份」。收益是音色与情感可以来自两条不同参考音频（A 的嗓音 + B 的怒气），这是影视后期最想要的能力。代价是 GRL 对抗训练对权重 α 很敏感，论文没给 α 的取值和敏感性分析；且阶段 2 只用 135 小时情感数据，解耦质量的天花板受数据量限制。",
   "featured": true
  },
  {
   "id": "ann-007",
   "anchor": {
    "sentence_id": "s-training-and-inference-3-4",
    "quote": "Training is conducted on a curated subset of 135 hours of high-quality emotional speech."
   },
   "kind": "number",
   "title": "135 小时的分量",
   "explanation": "和后面实验部分对照：总训练数据 55K 小时，其中情感数据只有 135 小时（来自 361 位说话人，29 小时来自 ESD，其余商业购买），占比约 0.25%。也就是说论文最亮眼的情感能力是从极小的高质量子集上挤出来的——这既说明「 curated 小数据 + 冻结主干 + GRL」的 Stage 2 配方效率高，也意味着情感类别和风格的覆盖注定有限：7 类基本情感之外、或低资源语种上，解耦大概率失效。泛化边界问题论文完全没有讨论。",
   "featured": false
  },
  {
   "id": "ann-008",
   "anchor": {
    "sentence_id": "s-gpt-latent-enhancement-2-2",
    "quote": "we hypothesize that HGPT encodes substantial textual and contextual information."
   },
   "kind": "critique",
   "title": "假设没有被直接检验",
   "explanation": "作者的理由链是：T2S 在大数据上训练 → 最后一层隐状态 HGPT 应含丰富文本/上下文信息 → 加到语义 token 上能补发音。但「hypothesize」一词表明这是动机陈述而非已证事实，全文没有 probing 实验（如用 HGPT 做 forced alignment 或音素分类）证明它真的编码文本。往后看，消融其实呈现了反直觉的结果：去掉 HGPT 后客观 SS 反而上升。更朴素的解释是 HGPT 注入了连续化扰动、改了音色向量的分布，「文本信息」叙事可能只是事后合理化。",
   "featured": true
  },
  {
   "id": "ann-009",
   "anchor": {
    "sentence_id": "s-training-and-inference-2-1-5",
    "quote": "randomly fuse the GPT hidden states HGPT and the semantic tokens Qsem with 50% probability"
   },
   "kind": "engineering",
   "title": "50% 随机融合的价值",
   "explanation": "训练时以 50% 概率用 MLP 把 HGPT 融进语义 token，另一半样本不融。这样 S2M 同时见过「干净语义」和「增强语义」两种输入分布，推理时融合就变成了一个可选增益而非硬依赖，模型鲁棒性更好。这和 30% 置零 p 是同一种手法：用概率门控让一个权重服务多种推理模式。工程上值得借鉴，但同样没有 50% 的消融——论文在「为什么是这个数」上整体欠交代。",
   "featured": false
  },
  {
   "id": "ann-010",
   "anchor": {
    "sentence_id": "s-text-to-emotion-t2e-3-1",
    "quote": "use the large language model Deepseek-r1 as a teacher to map a text input t to a 7-dimensional emotion probability distribution"
   },
   "kind": "engineering",
   "title": "把 LLM 当情绪标注器",
   "explanation": "T2E 的关键不是新模型，而是把 DeepSeek-R1 当作一个会输出软标签的情绪分类器：文本 t → 7 维概率分布 → 蒸馏给 Qwen-3-1.7B（LoRA）。软分布（而不是独热标签）是精髓——「我气笑了」可以同时是高愤怒+中快乐，推理时 e_input 按概率加权混合预计算情感向量，细腻度远超离散标签。对工业落地的启发：情绪控制这类低维任务，完全可以用大模型造软标签 + 小模型蒸馏，成本直接打到本地可跑。",
   "featured": false
  },
  {
   "id": "ann-011",
   "anchor": {
    "sentence_id": "s-text-to-emotion-t2e-6-1",
    "quote": "We construct a training dataset of 1000 text-distribution pairs using two types of prompts with Deepseek-r1"
   },
   "kind": "critique",
   "title": "1000 对够吗",
   "explanation": "学生模型只靠 1000 个文本—分布对蒸馏，数量小得惊人，且全部由 DeepSeek-R1 自己用两类模板的提示生成——数据多样性完全受模板与教师口味限制，分布必然偏窄。它能 work 是因为输出空间只有 7 维单纯形，任务复杂度低。但要警惕两点：一是教师自身的情绪判断偏差会被无损继承（论文未评估教师标注准确率）；二是超出模板分布的输入（方言、讽刺、混合情绪）学生模型大概率失灵。「师生蒸馏」在这里更接近一个工程捷径而非稳妥方案。",
   "featured": true
  },
  {
   "id": "ann-012",
   "anchor": {
    "sentence_id": "s-experiments-1-1",
    "quote": "We trained our model using 55K hours of data, including 30K Chinese data and 25K English data."
   },
   "kind": "number",
   "title": "55K 小时的语种边界",
   "explanation": "55K 小时（30K 中文 + 25K 英文）大多来自 Emilia，再加有声书和外购数据，意味着 IndexTTS2 本质上是中英双语模型——参考音频可任意语言，但输出语种基本锁定中英。论文所有评测（SeedTTS test-zh/en、LibriSpeech、AISHELL-1）也都在中英范围内自证。「zero-shot」在这里只指音色/情感零样本，不指语种零样本，读结论时别混淆。",
   "featured": true
  },
  {
   "id": "ann-013",
   "anchor": {
    "sentence_id": "s-experiments-1-3",
    "quote": "A total of 135 hours of emotional data came from 361 speakers"
   },
   "kind": "critique",
   "title": "内部情感测试集问题",
   "explanation": "情感评测同时犯了双重自给自足：训练用 135 小时、361 位说话人的自有情感数据，测试又是另招 12 位说话人（5 男 7 女）每人录 7 类情感各 3 句构成的内部集——全部 252 句。训练与测试数据同出自「商业购买 + 录制」体系，录音条件、标注口径一致，情感相似度 ES 和情感 MOS 4.x 的高分里有多少是域内拟合无法判断。论文没有报告任何外部情感语料（如 IEMOCAP）上的交叉验证，SOTA 结论只在自定义闭环内成立。",
   "featured": true
  },
  {
   "id": "ann-014",
   "anchor": {
    "sentence_id": "s-evaluation-metrics-1-2",
    "quote": "emotion similarity (ES) is calculated using emotion representations from the open-source emotion2vec"
   },
   "kind": "critique",
   "title": "指标同源的风险",
   "explanation": "WER 用 FunASR（中）/ Whisper（英），SS 用 FunASR 的说话人模型，ES 用 emotion2vec——评测链条高度集中于少数几个开源模型。风险有二：一是如果情感感知条件器与 emotion2vec 的训练目标或数据有相似性（都是自监督情感表征），ES 就是在用「模型的朋友」给模型打分；二是作者脚注承认部分基线实验是他们自己复现、且部分说话人特征被 FunASR 版本替换，跨系统对比的严格同一条件其实没有保证。排名大概率方向正确，绝对数值别全信。",
   "featured": false
  },
  {
   "id": "ann-015",
   "anchor": {
    "sentence_id": "s-basic-1-4",
    "quote": "removing the GPT latent enhancement consistently improves SS while degrading WER across datasets"
   },
   "kind": "number",
   "title": "反直觉的消融",
   "explanation": "这是全文最值得盯着的数字：去掉 GPT 隐表征增强后，客观说话人相似度 SS 一致上升，WER 一致变差。也就是说 HGPT 并非免费的增益，而是显式的权衡——它把表征往「文本正确」方向拉，同时稀释了音色信息。作者用 SMOS（人听更像目标说话人）来找补，但这恰恰说明 SS 与 SMOS 在该系统上已经解耦，客观指标和人感不一致。做产品选型时要想清楚：要听感相似度还是要识别准确率，这项设计是站在后者一边的。",
   "featured": true
  },
  {
   "id": "ann-016",
   "anchor": {
    "sentence_id": "s-aishell-1-1-3",
    "quote": "the difference in ES (0.001) is practically insignificant"
   },
   "kind": "number",
   "title": "0.001 的说服力",
   "explanation": "作者辩称消融变体 ES 仅高 0.001、可忽略，从而坚持启用 GPT 增强。但 0.001 的差感觉上小，前提是 ES 的测量噪声远小于 0.001——论文从未报告指标的置信区间或多次运行方差，且情感测试集只有 252 句，统计功效存疑。同一论证逻辑若反过来用（「SS 也只差一点」），作者的结论就要翻转。坦白说，这段辩护更像在为已经选定的架构写合理化说明，而不是在做严格的统计判断。",
   "featured": false
  },
  {
   "id": "ann-017",
   "anchor": {
    "sentence_id": "s-aishell-1-1-5",
    "quote": "removing the three-stage training strategy severely degrades emotional expressiveness, resulting in substantial performance drops across all metrics except WER."
   },
   "kind": "critique",
   "title": "情感力靠管线堆出来",
   "explanation": "这条消融很关键：砍掉三阶段训练，除 WER 外全线崩塌（Table 2 中 ES 从 0.887 掉到 0.689）。它说明 IndexTTS2 的情感表现力不是模型容量内生得来的，而是被 Stage 2 的 135 小时精选数据 + GRL + 冻结策略硬生生塑造出来的。两个推论：一是能力高度耦合于这条脆弱管线，任何环节替换（比如换更大情感集）都需要重新调三阶段配比；二是基座 IndexTTS 本身情感能力很弱，进阶完全靠后训练。复现者要预期训练成本与调参难度都不低。",
   "featured": true
  },
  {
   "id": "ann-019",
   "anchor": {
    "sentence_id": "s-duration-specified-speech-synthe-4-3",
    "quote": "IndexTTS2 surpasses F5-TTS by 0.5 pp and MaskGCT by 2 pp"
   },
   "kind": "comparison",
   "title": "控时长下的 WER 对比",
   "explanation": "在「大家都被强制拉长/缩短 12.5%–25%」的条件下比 WER，才是公平的时长控制对决：IndexTTS2 在 test-zh 上比 F5-TTS 低 0.5 个百分点、比 MaskGCT 低 2 个百分点，test-en 与 F5-TTS 持平。这支持作者的立场——AR 的自然度优势在被管住时长后依然存在。但 0.5 pp 的差距没有显著性检验；而 MaskGCT 差 2 pp 更像 NAR 在强约束下的固有劣势（时长预测与声学建模分家），不全是 IndexTTS2 的功劳。",
   "featured": false
  },
  {
   "id": "ann-020",
   "anchor": {
    "sentence_id": "s-conclusion-1-4",
    "quote": "the model achieves SOTA- level performance in high-expressive emotional restoration."
   },
   "kind": "critique",
   "title": "结论说得太满",
   "explanation": "结论的 SOTA 声明有三处沉淀：对比基线全是开源模型（MaskGCT、F5-TTS、CosyVoice2、SparkTTS），没有闭源工业系统；主观情感测试集是自建闭环；T2E 对比只有 CosyVoice2 一家。在「开源零样本中英 TTS」圈层里结论大体可信，扩展到全体 TTS 则过头。另外全文没有 RTF/延迟数据——AR 逐 token 生成 + 流匹配 + BigVGANv2 的级联推理成本不低，落地效率声明缺乏支撑。",
   "featured": true
  },
  {
   "id": "ann-021",
   "anchor": {
    "sentence_id": "s-autoregressive-text-to-semantic--1-2",
    "quote": "the input sequence is constructed as [c, p, e⟨BT ⟩, Etext, e⟨BA⟩, Esem]"
   },
   "kind": "concept",
   "title": "输入序列怎么读",
   "explanation": "这串记号是 T2S 的完整配方：c（说话人条件）、p（时长嵌入，可为 0）、e⟨BT⟩/e⟨BA⟩ 是文本与语义两段的边界 token，Etext 是文本嵌入，Esem 是教师强制的真实语义 token，自回归预测直到 <EA>。注意 Stage 2 时 c 变为 c+e 直接相加——情感与音色向量在同一特征空间线性叠加，这解释了为何两者必须严格解耦，否则互相污染。读懂这行，后面 Duration/Emotion/Training 三节都顺理成章。",
   "featured": false
  },
  {
   "id": "ann-022",
   "anchor": {
    "sentence_id": "s-abstract-1-9",
    "quote": "outperforms state-of-the-art zero-shot TTS models in terms of word error rate, speaker similarity, and emotional fidelity."
   },
   "kind": "connection",
   "title": "三指标连起来看",
   "explanation": "WER、SS、情感保真三个指标分别对应三层能力：念对字（S2M + GPT 增强负责）、像本人（说话人条件器 + GRL 负责）、有情绪（T2E + 三阶段训练负责）。这篇论文的实质是在同一条级联上优化三个互相拉扯的目标——后文消融（去 GPT 增强则 SS 升 WER 降、去三阶段则情感崩）恰好证明三者不能同时拉满。把它和 Whisper 的知识卡对照着看会很有意思：Whisper 用规模抹平权衡，IndexTTS2 用结构技巧管理权衡，这是两条不同的工程哲学。",
   "featured": false
  }
 ]
};
