// 自动生成：2410.06885 全文双语精读数据（由 tools/compile_paper.js 装配）
// 结构/原文来自 .cache/papers/2410.06885.json（tools/extract_paper.py）；
// 翻译与讲解来自 .cache/papers/zh/2410.06885/（LLM agent 撰写）。
// 改翻译请改片段后重新装配；勿手改本文件的结构与 original 字段。
globalThis.PAPER_2410_06885 = {
 "paper_id": "2410.06885",
 "model_id": "f5_tts",
 "title": {
  "original": "F5-TTS: A Fairytaler that Fakes Fluent and Faithful Speech with Flow Matching",
  "zh": "F5-TTS：用流匹配捏造流利而忠实语音的「讲故事的人」"
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
       "original": "Yushen Chen1, Zhikang Niu1, Ziyang Ma1, Keqi Deng2 Chunhui Wang3, Jian Zhao3, Kai Yu1, Xie Chen1* 1MoE Key Lab of Artificial Intelligence, X-LANCE Lab, Shanghai Jiao Tong University 2University of Cambridge 3Geely Automobile Research Institute (Ningbo) Company Ltd."
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
       "original": "{swivid,chenxie95}@sjtu.edu.cn"
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
       "original": "This paper introduces F5-TTS, a fully nonautoregressive text-to-speech system based on flow matching with Diffusion Transformer (DiT).",
       "zh": "本文介绍 F5-TTS，一个基于流匹配（flow matching）与 Diffusion Transformer（DiT）的完全非自回归（NAR）文本转语音系统。"
      },
      {
       "id": "s-abstract-1-2",
       "original": "Without requiring complex designs such as duration model, text encoder, and phoneme alignment, the text input is simply padded with filler tokens to the same length as input speech, and then the denoising is performed for speech generation, which was originally proved feasible by E2 TTS.",
       "zh": "它不需要时长模型、文本编码器和音素对齐等复杂设计，只需将文本输入用填充 token 补齐到与输入语音相同的长度，然后进行去噪以生成语音——这一思路最初由 E2 TTS 证明可行。"
      },
      {
       "id": "s-abstract-1-3",
       "original": "However, the original design of E2 TTS makes it hard to follow due to its slow convergence and low robustness.",
       "zh": "然而，E2 TTS 的原始设计收敛缓慢且鲁棒性低，难以沿用。"
      },
      {
       "id": "s-abstract-1-4",
       "original": "To address these issues, we first model the input with ConvNeXt to refine the text representation, making it easy to align with the speech.",
       "zh": "为解决这些问题，我们首先用 ConvNeXt 对输入进行建模以细化文本表示，使其更容易与语音对齐。"
      },
      {
       "id": "s-abstract-1-5",
       "original": "We further propose an inference-time Sway Sampling strategy, which significantly improves our model’s performance and efficiency.",
       "zh": "我们进一步提出了一种推理期的 Sway Sampling 策略，显著提升了模型的性能与效率。"
      },
      {
       "id": "s-abstract-1-6",
       "original": "This sampling strategy for flow step can be easily applied to existing flow matching based models without retraining.",
       "zh": "这种针对流步骤（flow step）的采样策略可以方便地应用于已有的基于流匹配的模型，无需重新训练。"
      },
      {
       "id": "s-abstract-1-7",
       "original": "Our design allows faster training and achieves an inference RTF of 0.15, which is greatly improved compared to state-of-the-art diffusion-based TTS models.",
       "zh": "我们的设计使训练更快，并实现了 0.15 的推理 RTF，相比最先进的扩散类 TTS 模型有大幅提升。"
      },
      {
       "id": "s-abstract-1-8",
       "original": "Trained on a public 100K hours multilingual dataset, our F5-TTS exhibits highly natural and expressive zero-shot ability, seamless code-switching capability, and speed control efficiency.",
       "zh": "在公开的 100K 小时多语言数据集上训练后，F5-TTS 展现出高度自然、富有表现力的零样本能力、无缝的语码混合能力以及高效的速度控制。"
      },
      {
       "id": "s-abstract-1-9",
       "original": "We have released all codes and checkpoints to promote community development, at https://SWivid.github.io/F5-TTS/.",
       "zh": "我们已开源全部代码与模型权重以促进社区发展，地址为 https://SWivid.github.io/F5-TTS/。"
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
       "original": "Recent research in Text-to-Speech (TTS) has experienced great advancement (Shen et al., 2018; Li et al., 2019; Ren et al., 2020; Kim et al., 2020, 2021; Popov et al., 2021; Wang et al., 2023b; Tan et al., 2024).",
       "zh": "近年来，文本转语音（TTS）研究取得了长足进步（Shen et al., 2018; Li et al., 2019; Ren et al., 2020; Kim et al., 2020, 2021; Popov et al., 2021; Wang et al., 2023b; Tan et al., 2024）。"
      },
      {
       "id": "s-1-1-2",
       "original": "With a few seconds of audio prompt, current TTS models are able to synthesize speech for any given text and mimic the speaker of audio prompt (Wang et al., 2023a; Zhang et al., 2023b).",
       "zh": "只需几秒钟的音频提示，现有 TTS 模型就能为任意给定文本合成语音，并模仿音频提示中的说话人（Wang et al., 2023a; Zhang et al., 2023b）。"
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
       "original": "*Corresponding author The synthesized speech can achieve high fidelity and naturalness that they are almost indistinguishable from human speech (Shen et al., 2023; Ju et al., 2024; Chen et al., 2024; Le et al., 2024).",
       "zh": "（*通讯作者）合成语音可以达到极高的保真度与自然度，几乎与真人语音难以区分（Shen et al., 2023; Ju et al., 2024; Chen et al., 2024; Le et al., 2024）。"
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
       "original": "While autoregressive (AR) based TTS models exhibit an intuitive way of consecutively predicting the next token(s) and have achieved promising zeroshot TTS capability, the inherent limitations of AR modeling require extra efforts addressing issues such as inference latency and exposure bias (Song et al., 2024; Du et al., 2024a; Han et al., 2024; Xin et al., 2024; Peng et al., 2024).",
       "zh": "尽管基于自回归（AR）的 TTS 模型以直观的方式逐个预测下一个 token，并已展现出很好的零样本 TTS 能力，但 AR 建模的固有局限需要额外的努力来解决推理延迟和曝光偏差（exposure bias）等问题（Song et al., 2024; Du et al., 2024a; Han et al., 2024; Xin et al., 2024; Peng et al., 2024）。"
      },
      {
       "id": "s-1-3-2",
       "original": "Moreover, the quality of speech tokenizer is essential for AR models to achieve high-fidelity synthesis (Zeghidour et al., 2021; Défossez et al., 2022; Wu et al., 2023; Yang et al., 2023; Zhang et al., 2023a; Bai et al., 2024; Niu et al., 2024).",
       "zh": "此外，语音分词器（tokenizer）的质量对 AR 模型实现高保真合成至关重要（Zeghidour et al., 2021; Défossez et al., 2022; Wu et al., 2023; Yang et al., 2023; Zhang et al., 2023a; Bai et al., 2024; Niu et al., 2024）。"
      },
      {
       "id": "s-1-3-3",
       "original": "Thus, there have been studies exploring direct modeling in continuous space (Liu et al., 2024a; Li et al., 2024; Meng et al., 2024) to enhance synthesized speech quality recently.",
       "zh": "因此，近期有研究探索直接在连续空间中建模（Liu et al., 2024a; Li et al., 2024; Meng et al., 2024），以提升合成语音的质量。"
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
       "original": "Although AR models demonstrate impressive zero-shot performance as they perform implicit duration modeling and can leverage diverse sampling strategies, non-autoregressive (NAR) models benefit from fast inference through parallel processing, and effectively balance synthesis quality and latency.",
       "zh": "AR 模型之所以零样本表现出色，是因为它们进行隐式的时长建模并能利用多样的采样策略；而非自回归（NAR）模型则通过并行处理实现快速推理，在合成质量与延迟之间取得有效平衡。"
      },
      {
       "id": "s-1-4-2",
       "original": "Notably, diffusion models (Ho et al., 2020; Song et al., 2020) contribute most to the success of current NAR speech models (Shen et al., 2023; Ju et al., 2024).",
       "zh": "值得注意的是，扩散模型（Ho et al., 2020; Song et al., 2020）是当前 NAR 语音模型成功的最大功臣（Shen et al., 2023; Ju et al., 2024）。"
      },
      {
       "id": "s-1-4-3",
       "original": "In particular, Flow Matching with Optimal Transport path (FM-OT) (Lipman et al., 2022) is widely used in recent research fields not only text-to-speech (Le et al., 2024; Guo et al., 2024b; Mehta et al., 2024; Lee et al., 2024; Eskimez et al., 2024) but also image generation (Esser et al., 2024) and music generation (Fei et al., 2024).",
       "zh": "特别是带最优传输路径的流匹配（FM-OT）（Lipman et al., 2022），不仅在文本转语音（Le et al., 2024; Guo et al., 2024b; Mehta et al., 2024; Lee et al., 2024; Eskimez et al., 2024），还在图像生成（Esser et al., 2024）和音乐生成（Fei et al., 2024）等研究领域被广泛使用。"
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
       "original": "Unlike AR-based models, the alignment modeling between input text and synthesized speech is crucial and challenging for NAR-based models.",
       "zh": "与基于 AR 的模型不同，输入文本与合成语音之间的对齐建模对基于 NAR 的模型而言既关键又具挑战性。"
      },
      {
       "id": "s-1-5-2",
       "original": "While NaturalSpeech 3 (Ju et al., 2024) and Voicebox (Le et al., 2024) use frame-wise phoneme",
       "zh": "NaturalSpeech 3（Ju et al., 2024）和 Voicebox（Le et al., 2024）使用帧级音素对齐，"
      }
     ]
    },
    {
     "id": "fig-1-1",
     "type": "figure_caption",
     "page": 2,
     "original": "Figure 1: An overview of F5-TTS training (left) and inference (right). The model is trained on the text-guided speech-infilling task and condition flow matching loss. The input text is converted to a character sequence, padded with filler tokens to the same length as input speech, and refined by ConvNeXt V2 blocks before concatenation with speech input. The inference leverages Sway Sampling for flow steps, with the model and an ODE solver to generate speech from sampled noise.",
     "zh": "图 1：F5-TTS 训练（左）与推理（右）概览。模型在文本引导的语音填充任务上以条件流匹配损失训练。输入文本被转换为字符序列，用填充 token 补齐到与输入语音相同的长度，经 ConvNeXt V2 模块细化后再与语音输入拼接。推理时对流步骤采用 Sway Sampling，由模型与 ODE 求解器从采样的噪声生成语音。"
    },
    {
     "id": "p-1-6",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-1-6-1",
       "original": "alignment; Matcha-TTS (Mehta et al., 2024) adopts monotonic alignment search (Kim et al., 2020) and relies on a phoneme-level duration model; recent works find that introducing such rigid alignment between text and speech hinders the model from generating results with higher naturalness (Eskimez et al., 2024; Anastassiou et al., 2024).",
       "zh": "而 Matcha-TTS（Mehta et al., 2024）采用单调对齐搜索（Kim et al., 2020）并依赖音素级时长模型；最近的研究发现，在文本与语音之间引入这种刚性对齐会阻碍模型生成更高自然度的结果（Eskimez et al., 2024; Anastassiou et al., 2024）。"
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
       "original": "E3 TTS (Gao et al., 2023a) abandons phonemelevel duration and applies cross-attention on the input sequence but yields limited audio quality.",
       "zh": "E3 TTS（Gao et al., 2023a）放弃音素级时长，转而对输入序列施加交叉注意力，但音频质量有限。"
      },
      {
       "id": "s-1-7-2",
       "original": "DiTTo-TTS (Lee et al., 2024) uses Diffusion Transformer (DiT) (Peebles and Xie, 2023) with crossattention conditioned on encoded text from a pretrained language model.",
       "zh": "DiTTo-TTS（Lee et al., 2024）使用 Diffusion Transformer（DiT）（Peebles and Xie, 2023），以预训练语言模型编码的文本为条件做交叉注意力。"
      },
      {
       "id": "s-1-7-3",
       "original": "To further enhance alignment, it uses the pretrained language model to finetune the neural audio codec, infusing semantic information into the generated representations.",
       "zh": "为进一步增强对齐，它还用该预训练语言模型微调神经音频 codec，向生成的表示中注入语义信息。"
      },
      {
       "id": "s-1-7-4",
       "original": "In contrast, E2 TTS (Eskimez et al., 2024), based on Voicebox (Le et al., 2024), adopts a simpler way, which removes the phoneme and duration predictor and directly uses characters padded with filler tokens to the length of mel spectrograms as input.",
       "zh": "相比之下，基于 Voicebox（Le et al., 2024）的 E2 TTS（Eskimez et al., 2024）采用了更简单的方式：去掉音素与时长预测器，直接把用填充 token 补齐到 Mel 频谱图长度的字符序列作为输入。"
      },
      {
       "id": "s-1-7-5",
       "original": "This simple scheme also achieves very natural and realistic synthesized results.",
       "zh": "这个简单方案也能合成非常自然、逼真的结果。"
      },
      {
       "id": "s-1-7-6",
       "original": "However, we found that robustness issues exist in E2 TTS for the text and speech alignment.",
       "zh": "然而，我们发现 E2 TTS 在文本与语音对齐上存在鲁棒性问题。"
      },
      {
       "id": "s-1-7-7",
       "original": "Seed-TTS (Anastassiou et al., 2024) employs a similar strategy and achieves excellent results, though not elaborated in model details.",
       "zh": "Seed-TTS（Anastassiou et al., 2024）采用了类似策略并取得了出色结果，只是没有详述模型细节。"
      },
      {
       "id": "s-1-7-8",
       "original": "In these ways of not explicitly modeling phoneme-level duration, models learn to assign the length of each word or phoneme according to the given total sequence length, resulting in improved prosody and rhythm.",
       "zh": "在这些不显式建模音素级时长的方法中，模型学会根据给定的总序列长度自行分配每个词或音素的长度，从而带来更好的韵律与节奏。"
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
       "original": "In this paper, we propose F5-TTS, a Fairytaler that Fakes Fluent and Faithful speech with Flow matching.",
       "zh": "本文提出 F5-TTS——一个用流匹配（Flow matching）捏造流利（Fluent）而忠实（Faithful）语音的「讲故事的人」（Fairytaler）。"
      },
      {
       "id": "s-1-8-2",
       "original": "Maintaining the simplicity of pipeline without phoneme alignment, duration predictor, text encoder, and semantically infused codec model, F5-TTS leverages the Diffusion Transformer with ConvNeXt V2 (Woo et al., 2023) to better tackle text-speech alignment during in-context learning.",
       "zh": "在保持流水线简洁、不用音素对齐、时长预测器、文本编码器和语义注入 codec 模型的前提下，F5-TTS 借助带 ConvNeXt V2（Woo et al., 2023）的 Diffusion Transformer，在上下文学习中更好地处理文本-语音对齐。"
      },
      {
       "id": "s-1-8-3",
       "original": "We stress the deep entanglement of semantic and acoustic features in the E2 TTS model design, which has inherent problems and will pose alignment failure issues that could not simply be solved with re-ranking.",
       "zh": "我们强调 E2 TTS 模型设计中语义与声学特征的深度纠缠，这一固有问题会导致对齐失败，而这类失败无法简单地靠重排序（re-ranking）解决。"
      },
      {
       "id": "s-1-8-4",
       "original": "With in-depth ablation studies, our proposed F5-TTS demonstrates stronger robustness, in generating more faithful speech to the text prompt, while maintaining comparable speaker similarity.",
       "zh": "通过深入的消融研究，我们提出的 F5-TTS 展现出更强的鲁棒性，能生成更忠实于文本提示的语音，同时保持相当的说话人相似度。"
      },
      {
       "id": "s-1-8-5",
       "original": "Additionally, we introduce an inferencetime sampling strategy for flow steps substantially improving naturalness, intelligibility, and speaker similarity of generation.",
       "zh": "此外，我们引入了一种推理期的流步骤采样策略，大幅提升生成语音的自然度、可懂度与说话人相似度。"
      },
      {
       "id": "s-1-8-6",
       "original": "This approach can be seamlessly integrated into existing flow matching based models without retraining.",
       "zh": "该方法无需重训即可无缝集成到已有的基于流匹配的模型中。"
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
    "original": "Preliminaries",
    "zh": "预备知识"
   },
   "blocks": []
  },
  {
   "id": "sec-2-1",
   "num": "2.1",
   "level": 2,
   "page": 3,
   "title": {
    "original": "Flow Matching",
    "zh": "流匹配"
   },
   "blocks": [
    {
     "id": "p-2-1-1",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-2-1-1-1",
       "original": "The Flow Matching (FM) objective is to match a probability path pt from a simple distribution p0, e.g., the standard normal distribution p(x) = N(x|0, I), to p1 approximating the data distribution q.",
       "zh": "流匹配（FM）的目标是 match 一条概率路径 pₜ：从简单分布 p₀（例如标准正态分布 p(x) = N(x|0, I)，即均值 0、方差 1）出发，到达逼近数据分布 q 的 p₁。"
      },
      {
       "id": "s-2-1-1-2",
       "original": "In short, the FM loss regresses the vector field ut with a neural network vt as LFM(θ) = Et,pt(x) ∥vt(x) −ut(x)∥2 , where θ parameterizes the neural network, t ∼ U[0, 1] and x ∼pt(x). vt is trained over the entire flow step and data range, ensuring it learns to handle the entire transformation process from the initial distribution to the target distribution.",
       "zh": "简言之，FM 损失用神经网络 vₜ 回归向量场 uₜ，即 L_FM(θ) = E_{t,pₜ(x)} ‖vₜ(x) − uₜ(x)‖²（2 范数平方），其中 θ 是网络参数，t ∼ U[0, 1]，x ∼ pₜ(x)；vₜ 在整个流步骤与数据范围上训练，确保它学会处理从初始分布到目标分布的整个变换过程。"
      }
     ]
    },
    {
     "id": "p-2-1-2",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-2-1-2-1",
       "original": "As we have no prior knowledge of how to approximate pt and ut, a conditional probability path pt(x|x1) = N(x | µt(x1), σt(x1)2I) is considered in actual training, and the Conditional Flow Matching (CFM) loss is proved to have identical gradients w.r.t. θ (Lipman et al., 2022). x1 is the random variable corresponding to training data. µ and σ is the time-dependent mean and scalar standard deviation of Gaussian distribution.",
       "zh": "由于我们对如何逼近 pₜ 和 uₜ 没有先验知识，实际训练中考虑条件概率路径 pₜ(x|x₁) = N(x | μₜ(x₁), σₜ(x₁)²·I)（均值 μₜ(x1)、方差 σₜ(x1)²、协方差 σₜ(x1)2·I）；可以证明条件流匹配（CFM）损失关于 θ 的梯度与原目标相同（Lipman et al., 2022），其中 x₁ 是训练数据对应的随机变量，μ 和 σ 分别是高斯分布的时变均值与标量标准差。"
      }
     ]
    },
    {
     "id": "p-2-1-3",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-2-1-3-1",
       "original": "Remember that the goal is to construct target distribution (data samples) from initial simple distribution, e.g., Gaussian noise.",
       "zh": "回忆一下，我们的目标是从初始的简单分布（如高斯噪声）构造出目标分布（数据样本）。"
      },
      {
       "id": "s-2-1-3-2",
       "original": "With the conditional form, the flow map ψt(x) = σt(x1)x + µt(x1) with µ0(x1) = 0 and σ0(x1) = 1, µ1(x1) = x1 and σ1(x1) = 0 is made to have all conditional probability paths converging to p0 and p1 at the start and end.",
       "zh": "在条件形式下，令流映射 ψₜ(x) = σₜ(x₁)x + μₜ(x₁)，且 μ₀(x₁) = 0、σ₀(x₁) = 1、μ₁(x₁) = x₁、σ₁(x₁) = 0，可使所有条件概率路径在起点与终点分别收敛到 p₀ 和 p₁。"
      },
      {
       "id": "s-2-1-3-3",
       "original": "The flow thus provides a vector field dψt(x0)/dt = ut(ψt(x0)|x1).",
       "zh": "于是该流给出了向量场 dψₜ(x0)/dt = uₜ(ψₜ(x0)|x1)：从噪声 x0 出发（ψ0(x0) = x0），以数据 x1 为条件。"
      },
      {
       "id": "s-2-1-3-4",
       "original": "Reparameterize pt(x|x1) with x0, we have",
       "zh": "用 x0 对 pₜ(x|x₁) 重参数化，可得（x₁ 为条件数据，t 从 0 到 1 插值）"
      }
     ]
    },
    {
     "id": "eq-2-1-1",
     "type": "equation",
     "page": 3,
     "original": "LCFM(θ) = Et,q(x1),p(x0)∥vt(ψt(x0)) −d"
    },
    {
     "id": "eq-2-1-2",
     "type": "equation",
     "page": 3,
     "original": "dtψt(x0)∥2."
    },
    {
     "id": "p-2-1-4",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-2-1-4-1",
       "original": "Further leveraging Optimal Transport (OT) form ψt(x) = (1 −t)x + tx1, the OT-CFM loss is",
       "zh": "进一步采用最优传输（OT）形式 ψₜ(x) = (1 − t)x + tx₁，OT-CFM 损失为"
      }
     ]
    },
    {
     "id": "eq-2-1-3",
     "type": "equation",
     "page": 3,
     "original": "LCFM(θ) = Et,q(x1),p(x0)∥vt((1 −t)x0 + tx1) −(x1 −x0)∥2."
    },
    {
     "id": "p-2-1-5",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-2-1-5-1",
       "original": "To view in a more general way (Kingma and Gao, 2024), if formulating the loss in terms of log signalto-noise ratio (log-SNR) λ instead of flow step t, and parameterizing to predict x0 (ϵ, commonly stated in diffusion model) instead of predict x1−x0, the CFM loss is equivalent to the v-prediction (Salimans and Ho, 2022) loss with cosine schedule.",
       "zh": "从更一般的视角看（Kingma and Gao, 2024），如果把损失用对数信噪比（log-SNR）λ 而非流步骤 t 来表述，并把预测目标参数化为 x₀（扩散模型中常表述为预测 ϵ）而非 x₁ − x₀，则 CFM 损失等价于余弦调度下的 v-预测（v-prediction）损失（Salimans and Ho, 2022）——两种写法描述的是同一个 x₀ 到 x₁ 的传输目标（v 仍是关于 x0 与 x1 的回归，梯度与 1 范数写法一致）。"
      }
     ]
    },
    {
     "id": "p-2-1-6",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-2-1-6-1",
       "original": "For inference, given sampled noise x0 from initial distribution p0, flow step t ∈[0, 1] and condition with respect to generation task, the ordinary differential equation (ODE) solver (Chen, 2018) is used to evaluate ψ1(x0) the integration of dψt(x0)/dt with ψ0(x0) = x0.",
       "zh": "推理时，给定从初始分布 p₀ 采样的噪声 x₀、流步骤 t ∈ [0, 1] 以及生成任务的条件，使用常微分方程（ODE）求解器（Chen, 2018）对 dψₜ(x₀)/dt 积分，以 ψ₀(x₀) = x₀ 为初值求出 ψ₁(x₀)。"
      },
      {
       "id": "s-2-1-6-2",
       "original": "The number of function evaluations (NFE) is the times going through the neural network as we may provide multiple flow step values from 0 to 1 as input to approximate the integration.",
       "zh": "函数评估次数（NFE）是穿过神经网络的次数——为了逼近积分，我们会提供多个从 0 到 1 的流步骤取值作为输入。"
      },
      {
       "id": "s-2-1-6-3",
       "original": "Higher NFE will produce more accurate results and certainly take more calculation time.",
       "zh": "更高的 NFE 会产生更精确的结果，当然也消耗更多计算时间。"
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
    "original": "Classifier-Free Guidance",
    "zh": "无分类器引导"
   },
   "blocks": [
    {
     "id": "p-2-2-1",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-2-2-1-1",
       "original": "Classifier Guidance (CG) is proposed by Dhariwal and Nichol (2021), functions by adding the gradient of an additional classifier, while such an explicit way to condition the generation process may have several problems.",
       "zh": "分类器引导（CG）由 Dhariwal and Nichol (2021) 提出，其做法是叠加一个外部分类器的梯度；但这种显式地为生成过程施加条件的方式可能存在若干问题。"
      },
      {
       "id": "s-2-2-1-2",
       "original": "Extra training of the classifier is required and the generation result is directly affected by the quality of the classifier.",
       "zh": "它需要额外训练分类器，且生成结果直接受分类器质量影响。"
      },
      {
       "id": "s-2-2-1-3",
       "original": "Adversarial attacks might also occur as the guidance is introduced through the way of updating the gradient.",
       "zh": "由于引导是通过更新梯度的方式引入的，还可能发生对抗攻击。"
      },
      {
       "id": "s-2-2-1-4",
       "original": "Thus deceptive images with imperceptible details to human eyes may be generated, which are not conditional.",
       "zh": "于是可能生成带有人眼难以察觉细节、实则无条件的欺骗性图像。"
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
       "original": "Classifier-Free Guidance (CFG) (Ho and Salimans, 2022) proposes to replace the explicit classifier with an implicit classifier without directly computing the explicit classifier and its gradient.",
       "zh": "无分类器引导（CFG）（Ho and Salimans, 2022）提出用一个隐式分类器替代显式分类器，而不直接计算显式分类器及其梯度。"
      },
      {
       "id": "s-2-2-2-2",
       "original": "The gradient of a classifier can be expressed as a combination of conditional generation probability and unconditional generation probability.",
       "zh": "分类器的梯度可以表示为条件生成概率与无条件生成概率的组合。"
      },
      {
       "id": "s-2-2-2-3",
       "original": "By dropping the condition with a certain rate during training, and linear extrapolating the inference outputs with and without condition c, the final guided result is obtained.",
       "zh": "训练时以一定比例丢弃条件，推理时把有条件输出与无条件输出沿条件 c 做线性外推，即可得到最终的引导结果。"
      },
      {
       "id": "s-2-2-2-4",
       "original": "We could balance between fidelity and diversity of the generated samples with",
       "zh": "我们可以在生成样本的保真度与多样性之间做权衡："
      }
     ]
    },
    {
     "id": "eq-2-2-1",
     "type": "equation",
     "page": 3,
     "original": "vt,CFG = vt(ψt(x0), c) + α(vt(ψt(x0), c) −vt(ψt(x0)))"
    },
    {
     "id": "p-2-2-3",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-2-2-3-1",
       "original": "in CFM case, where α is the CFG strength.1 1Note that the inference time will be doubled if CFG.",
       "zh": "在 CFM 情形下，α 即 CFG 强度。（脚注 1：注意若使用 CFG，推理时间会翻倍——条件与无条件各跑 1 次。）"
      },
      {
       "id": "s-2-2-3-2",
       "original": "Model vt will execute the forward process twice, once with condition, and once without.",
       "zh": "模型 vₜ 要执行两次前向：一次带条件，一次不带条件。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-3",
   "num": "3",
   "level": 1,
   "page": 4,
   "title": {
    "original": "Method",
    "zh": "方法"
   },
   "blocks": [
    {
     "id": "p-3-1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-1-1",
       "original": "This work aims to build a high-level text-to-speech synthesis system.",
       "zh": "本工作旨在构建一个高水平的文本转语音合成系统。"
      },
      {
       "id": "s-3-1-2",
       "original": "We trained our model on the textguided speech-infilling task (Bai et al., 2022; Le et al., 2024).",
       "zh": "我们在文本引导的语音填充（speech-infilling）任务上训练模型（Bai et al., 2022; Le et al., 2024）。"
      },
      {
       "id": "s-3-1-3",
       "original": "Based on recent research (Lee et al., 2024; Eskimez et al., 2024; Liu et al., 2024b), it is promising to train without phoneme-level duration predictor and can achieve higher naturalness in zero-shot generation deprecating explicit phonemelevel alignment.",
       "zh": "基于近期研究（Lee et al., 2024; Eskimez et al., 2024; Liu et al., 2024b），不用音素级时长预测器、弃用显式音素级对齐地进行训练是可行的，并能在零样本生成中获得更高的自然度。"
      },
      {
       "id": "s-3-1-4",
       "original": "We propose our advanced architecture with faster convergence and more robust generation.",
       "zh": "我们提出了一种收敛更快、生成更鲁棒的改进架构。"
      },
      {
       "id": "s-3-1-5",
       "original": "We also propose an inference-time flow step sampling strategy, which significantly improves our model’s performance in faithfulness to reference text and speaker similarity.",
       "zh": "我们还提出了一种推理期的流步骤采样策略，显著提升模型在忠实于参考文本与说话人相似度方面的表现。"
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
    "original": "Pipeline Training",
    "zh": "流水线与训练"
   },
   "blocks": [
    {
     "id": "p-3-1-1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-1-1-1",
       "original": "The infilling task is to predict a segment of speech given its surrounding audio and full text (for both surrounding transcription and the part to generate).",
       "zh": "填充（infilling）任务是指：给定一段语音的上下文音频和完整文本（包括上下文转写与待生成部分），预测中间缺失的语音段。"
      },
      {
       "id": "s-3-1-1-2",
       "original": "For simplicity, we reuse the symbol x to denote an audio sample and y the corresponding transcript for a data pair (x, y).",
       "zh": "为简洁起见，我们沿用符号 x 表示音频样本、y 表示对应的转写文本，构成数据对 (x, y)。"
      },
      {
       "id": "s-3-1-1-3",
       "original": "As shown in Fig.1 (left), the acoustic input for training is an extracted mel spectrogram features x1 ∈RF×N from the audio sample x, where F is mel dimension and N is the sequence length.",
       "zh": "如 Fig.1（左）所示，训练时的声学输入是从音频样本 x 提取的 Mel 频谱图特征 x₁ ∈ R^{F×N}，其中 F 是梅尔维度、N 是序列长度。"
      },
      {
       "id": "s-3-1-1-4",
       "original": "In the scope of CFM, we pass in the model the noisy speech (1 −t)x0 + tx1 and the masked speech (1 −m) ⊙x1, where x0 denotes sampled Gaussian noise, t is sampled flow step, and m ∈{0, 1}F×N represents a binary temporal mask.",
       "zh": "在 CFM 框架下，我们向模型传入加噪语音 (1 − t)x₀ + tx₁ 和掩码语音 (1 − m) ⊙ x₁，其中 x₀ 为采样的高斯噪声，t 为采样的流步骤，m ∈ {0, 1}^{F×N} 是时间维度上的二值掩码。"
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
       "original": "Following E2 TTS, we directly use alphabets and symbols for English.",
       "zh": "沿用 E2 TTS 的做法，英文直接使用字母与符号。"
      },
      {
       "id": "s-3-1-2-2",
       "original": "We opt for full pinyin to facilitate Chinese zero-shot generation.",
       "zh": "中文则采用完整拼音（含声调）以促进中文零样本生成。"
      },
      {
       "id": "s-3-1-2-3",
       "original": "By breaking the raw text into such character sequence and padding it with filler tokens ⟨F⟩to the same length as mel frames, we form an extended sequence z with ci denoting the i-th character: z = (c1, c2, . . . , cM, ⟨F⟩, . . . , ⟨F⟩ | {z } (N−M) times ).",
       "zh": "把原始文本拆成这样的字符序列，并用填充 token ⟨F⟩ 补齐到与梅尔帧相同的长度，即得到扩展序列 z，其中 cᵢ 表示第 i 个字符：z = (c₁, c₂, …, c_M, ⟨F⟩, …, ⟨F⟩)（⟨F⟩ 共 N − M 个，即第 1 段为字符、第 2 段为填充）。"
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
       "original": "The model is trained to reconstruct m ⊙x1 with (1−m)⊙x1 and z, which equals to learn the target distribution p1 in form of P(m⊙x1|(1−m)⊙x1, z) approximating real data distribution q.",
       "zh": "模型的训练目标是：以 (1 − m) ⊙ x₁ 和 z 为条件重建 m ⊙ x₁，等价于学习形如 P(m⊙x₁ | (1−m)⊙x₁, z) 的目标分布 p₁ 去逼近真实数据分布 q。"
      },
      {
       "id": "s-3-1-3-2",
       "original": "Inference To generate a speech with the desired content, we have the audio prompt’s mel spectrogram features xref, its transcription yref, and a text prompt ygen.",
       "zh": "推理时，为生成指定内容的语音，我们拥有音频提示的 Mel 频谱图特征 x_ref、其转写文本 y_ref 以及一段文本提示 y_gen。"
      },
      {
       "id": "s-3-1-3-3",
       "original": "Audio prompt serves to provide speaker characteristics and text prompt is to guide the content of generated speech.",
       "zh": "音频提示提供说话人特征，文本提示则引导生成语音的内容。"
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
       "original": "The sequence length N, or duration, has now become a pivotal factor that necessitates informing the model of the desired length for sample generation.",
       "zh": "序列长度 N（即时长）由此成为关键因素——必须告知模型期望的样本生成长度。"
      },
      {
       "id": "s-3-1-4-2",
       "original": "One could train a separate model to predict and deliver the duration based on xref, yref and ygen.",
       "zh": "一种做法是训练一个单独的模型，根据 x_ref、y_ref 和 y_gen 预测并输出时长。"
      },
      {
       "id": "s-3-1-4-3",
       "original": "Here we simply estimate the duration based on the ratio of the number of characters in ygen and yref.",
       "zh": "这里我们简单地按 y_gen 与 y_ref 的字符数之比来估计时长。"
      },
      {
       "id": "s-3-1-4-4",
       "original": "We assume that the sum-up length of characters is no longer than mel length, thus padding with filler tokens is done as during training.",
       "zh": "我们假设字符总长度不超过梅尔长度，因此可以像训练时一样用填充 token 补齐。"
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
       "original": "To sample from the learned distribution, the converted mel features xref, along with concatenated and extended character sequence zref·gen serve as the condition in Eq.4.",
       "zh": "为从学得的分布中采样，转换后的梅尔特征 x_ref 与拼接、扩展后的字符序列 z_ref·gen 一起作为 Eq.4 中的条件。"
      },
      {
       "id": "s-3-1-5-2",
       "original": "We have vt(ψt(x0), c) = vt((1−t)x0+tx1|xref, zref·gen), See from Fig.1 (right), we start from a sampled noise x0, and what we want is the other end of flow x1.",
       "zh": "即 vₜ(ψₜ(x0), c) = vₜ((1−t)x0 + tx₁ | x_ref, z_ref·gen)；如 Fig.1（右）所示，我们从采样的噪声 x₀（ψ0(x0) = x0，t = 0 端点）出发，目标是流的另一端 x₁（ψ1(x0) = x1，t = 1 端点）。"
      },
      {
       "id": "s-3-1-5-3",
       "original": "Thus we use the ODE solver to gradually integrate from ψ0(x0) = x0 to ψ1(x0) = x1, given dψt(x0)/dt = vt(ψt(x0), xref, zref·gen).",
       "zh": "因此我们用 ODE 求解器，以 dψₜ(x₀)/dt = vₜ(ψₜ(x₀), x_ref, z_ref·gen) 从 ψ₀(x₀) = x₀（t 取 0 的端点）逐步积分到 ψ₁(x₀) = x₁（t 取 1 的端点）。"
      },
      {
       "id": "s-3-1-5-4",
       "original": "During inference, the flow steps are provided in an ordered way, e.g., uniformly sampled a certain number from 0 to 1 according to the NFE setting.",
       "zh": "推理时流步骤以有序方式给出，例如按 NFE 设定从 0 到 1 均匀采样一定数量的取值。"
      },
      {
       "id": "s-3-1-5-5",
       "original": "After getting the generated mel with model vt and ODE solver, we discard the part of xref.",
       "zh": "用模型 vₜ 和 ODE 求解器得到生成的梅尔特征后，丢弃属于 x_ref 的部分。"
      },
      {
       "id": "s-3-1-5-6",
       "original": "Then we leverage a vocoder to convert the mel back to waveform.",
       "zh": "然后用声码器把梅尔特征还原为波形。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-3-2",
   "num": null,
   "level": 2,
   "page": 4,
   "title": {
    "original": "3.2",
    "zh": "模型架构与 Sway Sampling"
   },
   "blocks": [
    {
     "id": "p-3-2-1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-2-1-1",
       "original": "E2 TTS directly concatenates the padded character sequence with input speech sequence, deeply entangling semantic and acoustic features with a large length gap of effective information, which is the underlying cause of hard training and poses several problems in a zero-shot scenario (Sec.5.1).",
       "zh": "E2 TTS 直接把补齐后的字符序列与输入语音序列拼接，使语义与声学特征深度纠缠，且两者的有效信息长度差距很大——这正是训练困难的根因，并在零样本场景下引发若干问题（见 Sec.5.1）。"
      },
      {
       "id": "s-3-2-1-2",
       "original": "To alleviate the problem of slow convergence and low robustness, we propose F5-TTS which accelerates training and inference and shows a strong robustness in generation.",
       "zh": "为缓解收敛慢、鲁棒性低的问题，我们提出 F5-TTS：它加速训练与推理，并展现出很强的生成鲁棒性。"
      },
      {
       "id": "s-3-2-1-3",
       "original": "Also, an inference-time Sway Sampling is introduced, which allows inference faster (using less NFE) while maintaining performance.",
       "zh": "此外，我们引入推理期的 Sway Sampling，可以在保持性能的同时让推理更快（使用更少的 NFE）。"
      },
      {
       "id": "s-3-2-1-4",
       "original": "This sampling way of flow step can be directly applied to other CFM-based models without retraining.",
       "zh": "这种流步骤采样方式无需重训即可直接应用于其他基于 CFM 的模型。"
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
       "original": "As shown in Fig.1, we use latent Diffusion Transformer (DiT) (Peebles and Xie, 2023) as backbone.",
       "zh": "如 Fig.1 所示，我们使用隐空间 Diffusion Transformer（DiT）（Peebles and Xie, 2023）作为骨干。"
      },
      {
       "id": "s-3-2-2-2",
       "original": "To be specific, we use DiT blocks with zero-initialized adaptive Layer Norm (adaLN- zero).",
       "zh": "具体而言，我们使用带零初始化自适应 Layer Norm（adaLN-zero）的 DiT 模块。"
      },
      {
       "id": "s-3-2-2-3",
       "original": "To enhance the model’s alignment ability, we also leverage ConvNeXt V2 blocks (Woo et al., 2023).",
       "zh": "为增强模型的对齐能力，我们还引入 ConvNeXt V2 模块（Woo et al., 2023）。"
      },
      {
       "id": "s-3-2-2-4",
       "original": "Its predecessor ConvNeXt V1 (Liu et al., 2022) is used in many works and shows a strong temporal modeling capability in speech domain tasks (Siuzdak, 2023; Okamoto et al., 2024).",
       "zh": "其前代 ConvNeXt V1（Liu et al., 2022）已被许多工作采用，并在语音领域任务中展现出很强的时序建模能力（Siuzdak, 2023; Okamoto et al., 2024）。"
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
       "original": "As described in Sec.3.1, the model input is character sequence, noisy speech, and masked speech.",
       "zh": "如 Sec.3.1 所述，模型输入是字符序列、加噪语音和掩码语音。"
      },
      {
       "id": "s-3-2-3-2",
       "original": "Before concatenation in the feature dimension, the character sequence first goes through ConvNeXt blocks.",
       "zh": "在特征维度上拼接之前，字符序列先经过 ConvNeXt 模块。"
      },
      {
       "id": "s-3-2-3-3",
       "original": "Experiments have shown that this way of providing individual modeling space allows text input to better prepare itself before later in-context learning.",
       "zh": "实验表明，这种提供独立建模空间的方式，能让文本输入在随后的上下文学习之前先「准备好自己」。"
      },
      {
       "id": "s-3-2-3-4",
       "original": "Unlike the phoneme-level force alignment done in Voicebox, a rigid boundary for text is not explicitly introduced.",
       "zh": "与 Voicebox 的音素级强制对齐不同，我们没有为文本显式引入刚性边界。"
      },
      {
       "id": "s-3-2-3-5",
       "original": "The semantic and acoustic features are jointly learned with the entire model.",
       "zh": "语义与声学特征由整个模型联合学习。"
      },
      {
       "id": "s-3-2-3-6",
       "original": "Not directly feeding the model with inputs of significant length gap as E2 TTS does, the proposed text refinement mitigates the impact of using inputs with mismatched effective information lengths, despite equal physical length in magnitude as E2 TTS.",
       "zh": "不像 E2 TTS 那样把有效信息长度差距悬殊的输入直接喂给模型，本文提出的文本细化缓解了这种输入有效信息长度不匹配的影响——尽管物理长度量级上与 E2 TTS 相同。"
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
       "original": "The flow step t for CFM is provided as the condition of adaLN-zero rather than appended to the concatenated input sequence in Voicebox.",
       "zh": "CFM 的流步骤 t 作为 adaLN-zero 的条件输入，而不是像 Voicebox 那样拼接到拼接后的输入序列上。"
      },
      {
       "id": "s-3-2-4-2",
       "original": "We found that an additional mean pooled token of text sequence for adaLN condition is not essential for the TTS task, maybe because the TTS task requires more rigorously guided results and the mean pooled text token is more coarse.",
       "zh": "我们发现，为 adaLN 条件再加入一个文本序列的均值池化 token 对 TTS 任务并非必需——或许是因为 TTS 任务要求结果受到更严格的引导，而均值池化的文本 token 过于粗糙。"
      }
     ]
    },
    {
     "id": "p-3-2-5",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-3-2-5-1",
       "original": "We adopt some position embedding settings in Voicebox.",
       "zh": "我们沿用了 Voicebox 的一些位置编码设置。"
      },
      {
       "id": "s-3-2-5-2",
       "original": "The flow step is embedded with a sinusoidal position.",
       "zh": "流步骤用正弦位置嵌入。"
      },
      {
       "id": "s-3-2-5-3",
       "original": "The concatenated input sequence is added with a convolutional position embedding.",
       "zh": "拼接后的输入序列加上卷积位置嵌入。"
      },
      {
       "id": "s-3-2-5-4",
       "original": "We apply a rotary position embedding (RoPE) (Su et al., 2024) for self-attention rather than symmetric bi-directional ALiBi bias (Press et al., 2021).",
       "zh": "自注意力使用旋转位置嵌入（RoPE）（Su et al., 2024），而非对称的双向 ALiBi 偏置（Press et al., 2021）。"
      },
      {
       "id": "s-3-2-5-5",
       "original": "And for extended character sequence z, we also add it with an absolute sinusoidal position embedding before feeding it into ConvNeXt blocks.",
       "zh": "对于扩展字符序列 z，在送入 ConvNeXt 模块之前还加上绝对正弦位置嵌入。"
      }
     ]
    },
    {
     "id": "p-3-2-6",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-3-2-6-1",
       "original": "Compared with Voicebox and E2 TTS, we abandoned the U-Net (Ronneberger et al., 2015) style skip connection structure and switched to using DiT with adaLN-zero.",
       "zh": "与 Voicebox 和 E2 TTS 相比，我们放弃了 U-Net（Ronneberger et al., 2015）式的跳跃连接结构，改用带 adaLN-zero 的 DiT。"
      },
      {
       "id": "s-3-2-6-2",
       "original": "Without a phoneme-level duration predictor and explicit alignment process, and nor with extra text encoder and semantically infused neural codec model in DiTTo-TTS, we give the text input a little freedom (individual modeling space) to let it prepare itself before concatenation and in-context learning with speech input.",
       "zh": "既没有音素级时长预测器和显式对齐过程，也没有 DiTTo-TTS 中额外的文本编码器与语义注入的神经 codec 模型，我们给文本输入留了一点自由（独立的建模空间），让它在与语音输入拼接、进行上下文学习之前先自行准备。"
      },
      {
       "id": "s-3-2-6-3",
       "original": "Sampling As stated in Sec.2.1, the CFM could be viewed as v-prediction with a cosine schedule.",
       "zh": "采样方面：如 Sec.2.1 所述，CFM 可视为余弦调度下的 v-预测。"
      },
      {
       "id": "s-3-2-6-4",
       "original": "For image synthesis, Esser et al. (2024) propose to further schedule the flow step with a single-peak logit-normal (Atchison and Shen, 1980) sampling, in order to give more weight to intermediate flow steps by sampling them more frequently.",
       "zh": "在图像合成中，Esser et al. (2024) 提出用单峰 logit-normal（Atchison and Shen, 1980）采样进一步调度流步骤，以便更频繁地采样中间流步骤、给予它们更大权重。"
      },
      {
       "id": "s-3-2-6-5",
       "original": "We speculate that such sampling distributes the model’s learning difficulty more evenly over different flow step t ∈[0, 1].",
       "zh": "我们推测，这种采样把模型的学习难度更均匀地分散到不同的流步骤 t ∈ [0, 1] 上。"
      }
     ]
    },
    {
     "id": "p-3-2-7",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-3-2-7-1",
       "original": "In contrast, we train our model with traditional uniformly sampled flow step t ∼U[0, 1] but apply a non-uniform sampling during inference.",
       "zh": "相比之下，我们训练时仍采用传统的均匀采样流步骤 t ∼ U[0, 1]，但在推理时施加非均匀采样。"
      },
      {
       "id": "s-3-2-7-2",
       "original": "In specific, we define a Sway Sampling function as",
       "zh": "具体地，我们定义 Sway Sampling 函数为"
      }
     ]
    },
    {
     "id": "eq-3-2-1",
     "type": "equation",
     "page": 5,
     "original": "fsway(u; s) = u + s · (cos(π"
    },
    {
     "id": "p-3-2-8",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-3-2-8-1",
       "original": "2 u) −1 + u), which is monotonic with coefficient s ∈[−1, 2 π−2].",
       "zh": "f_sway(u; s) = u + s · (cos(πu/2) − 1 + u)，它是单调的，系数 s ∈ [−1, 2/π − 2]（此处为跨页断行处的公式续行，按原文如实译出）。"
      },
      {
       "id": "s-3-2-8-2",
       "original": "We first sample u ∼U[0, 1], then apply this function to obtain sway sampled flow step t.",
       "zh": "我们先采样 u ∼ U[0, 1]，再应用该函数得到摇摆采样后的流步骤 t。"
      },
      {
       "id": "s-3-2-8-3",
       "original": "With s < 0, the sampling is sway to left; with s > 0, the sampling is sway to right; and s = 0 case equals to uniform sampling. Fig.3 shows the probability density function of Sway Sampling on flow step t.",
       "zh": "s < 0 时采样向左偏；s > 0 时采样向右偏；s = 0 时等价于均匀采样。Fig.3 展示了 Sway Sampling 在流步骤 t 上的概率密度函数。"
      }
     ]
    },
    {
     "id": "p-3-2-9",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-3-2-9-1",
       "original": "Conceptually, CFM models focus more on sketching the contours of speech in the early stage (t →0) from pure noise and later focus more on the embellishment of fine-grained details.",
       "zh": "从概念上讲，CFM 模型在早期（t → 0）更专注于从纯噪声中勾勒语音的轮廓，后期则更专注于细粒度细节的修饰。"
      },
      {
       "id": "s-3-2-9-2",
       "original": "Therefore, the alignment between speech and text will be determined based on the first few generated results.",
       "zh": "因此，语音与文本之间的对齐取决于最初几步的生成结果。"
      },
      {
       "id": "s-3-2-9-3",
       "original": "With a scale parameter s < 0, we make model inference more with smaller t, thus providing the ODE solver with more startup information to evaluate more precisely in initial integration steps.",
       "zh": "使用缩放系数 s < 0，我们让模型更多地在小 t 处推理，从而为 ODE 求解器提供更多起始信息，使初始积分步骤的求值更精确。"
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
    "original": "Experimental Setup Datasets",
    "zh": "实验设置：数据集、训练与基线"
   },
   "blocks": [
    {
     "id": "p-4-1",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-4-1-1",
       "original": "We utilize the in-the-wild multilingual speech dataset Emilia (He et al., 2024) to train our base models.",
       "zh": "我们使用野外（in-the-wild）多语言语音数据集 Emilia（He et al., 2024）训练基础模型。"
      },
      {
       "id": "s-4-1-2",
       "original": "After simply filtering out transcription failure and misclassified language speech, we retain approximately 95K hours of English and Chinese data.",
       "zh": "简单过滤掉转写失败和语种误分类的语音后，我们保留了约 95K 小时的英文和中文数据。"
      },
      {
       "id": "s-4-1-3",
       "original": "We also trained small models for ablation study and architecture search on WenetSpeech4TTS (Ma et al., 2024) Premium subset, consisting of a 945 hours Mandarin corpus.",
       "zh": "我们还在 WenetSpeech4TTS（Ma et al., 2024）Premium 子集——一个 945 小时的普通话语料——上训练小模型，用于消融研究和架构搜索。"
      },
      {
       "id": "s-4-1-4",
       "original": "Base model configurations are introduced below, and small model configurations are in Appendix B.1.",
       "zh": "基础模型配置见下文，小模型配置见附录 B.1。"
      },
      {
       "id": "s-4-1-5",
       "original": "Three test sets are adopted for evaluation, which are LibriSpeech-PC test-clean (Meister et al., 2023), Seed-TTS test-en (Anastassiou et al., 2024) with 1088 samples from Common Voice (Ardila et al., 2019), and Seed-TTS test-zh with 2020 samples from DiDiSpeech (Guo et al., 2021)2.",
       "zh": "评测采用三个测试集：LibriSpeech-PC test-clean（Meister et al., 2023）、来自 Common Voice（Ardila et al., 2019）含 1088 条样本的 Seed-TTS test-en（Anastassiou et al., 2024），以及来自 DiDiSpeech（Guo et al., 2021）含 2020 条样本的 Seed-TTS test-zh（见脚注 2）。"
      },
      {
       "id": "s-4-1-6",
       "original": "Most of the 2https://github.com/BytedanceSpeech/ seed-tts-eval previous English-only models are evaluated on different subsets of LibriSpeech test-clean while the used prompt list is not released, which makes fair comparison difficult.",
       "zh": "（脚注 2：https://github.com/BytedanceSpeech/seed-tts-eval）以往大多数纯英文模型在 LibriSpeech test-clean 的不同子集上评测，且所用提示列表未公开，难以公平比较。"
      },
      {
       "id": "s-4-1-7",
       "original": "Thus we build and release a 4-to-10-second LibriSpeech-PC subset with 1127 samples to facilitate community comparisons.",
       "zh": "因此我们构建并发布了一个含 1127 条样本、时长 4 至 10 秒的 LibriSpeech-PC 子集，方便社区比较。"
      },
      {
       "id": "s-4-1-8",
       "original": "Training Our base models are trained to 1.2M updates with a batch size of 307,200 audio frames (0.91 hours), for over one week on 8 NVIDIA A100 80G GPUs.",
       "zh": "训练：基础模型训练 1.2M 步更新，批大小为 307,200 音频帧（0.91 小时），在 8 张 NVIDIA A100 80G GPU 上训练超过一周。"
      },
      {
       "id": "s-4-1-9",
       "original": "The AdamW optimizer (Loshchilov, 2017) is used with a peak learning rate of 7.5e5, linearly warmed up for 20K updates, and linearly decays over the rest of the training.",
       "zh": "优化器使用 AdamW（Loshchilov, 2017），峰值学习率 7.5e-5，线性预热 20K 步，随后在剩余训练中线性衰减。"
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
       "original": "We set 1 for the max gradient norm clip.",
       "zh": "最大梯度范数裁剪设为 1。"
      },
      {
       "id": "s-4-2-2",
       "original": "The F5- TTS base model has 22 layers, 16 attention heads, 1024/2048 embedding/feed-forward network (FFN) dimension for DiT; and 4 layers, 512/1024 embedding/FFN dimension for ConvNeXt V2; in total 335.8M parameters.",
       "zh": "F5-TTS 基础模型的 DiT 部分为 22 层、16 个注意力头、嵌入/前馈网络（FFN）维度 1024/2048；ConvNeXt V2 部分为 4 层、嵌入/FFN 维度 512/1024；总计 335.8M 参数。"
      },
      {
       "id": "s-4-2-3",
       "original": "The reproduced E2 TTS, a 333.2M flat U-Net equipped Transformer, has 24 layers, 16 attention heads, and 1024/4096 embedding/FFN dimension.",
       "zh": "复现的 E2 TTS 是一个 333.2M 参数的扁平 U-Net Transformer，24 层、16 个注意力头、嵌入/FFN 维度 1024/4096。"
      },
      {
       "id": "s-4-2-4",
       "original": "Both models use RoPE as mentioned in Sec.3.2, a dropout rate of 0.1 for attention and FFN, the same convolutional position embedding as in Voicebox(Le et al., 2024).",
       "zh": "两个模型都使用 Sec.3.2 提到的 RoPE，注意力与 FFN 的 dropout 率为 0.1，并采用与 Voicebox（Le et al., 2024）相同的卷积位置嵌入。"
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
       "original": "We directly use alphabets and symbols for English, use jieba3 and pypinyin4 to process raw Chinese characters to full pinyins.",
       "zh": "英文直接使用字母与符号；中文用 jieba（脚注 3）和 pypinyin（脚注 4）把原始汉字处理成完整拼音。"
      },
      {
       "id": "s-4-3-2",
       "original": "The character embedding vocabulary size is 2546, counting in the special filler token and all other language characters exist in the Emilia dataset as there are many code-switched sentences.",
       "zh": "字符嵌入词表大小为 2546，包含特殊填充 token 以及 Emilia 数据集中出现的所有其他语种字符——因为数据中有大量语码混合的句子。"
      },
      {
       "id": "s-4-3-3",
       "original": "For audio samples we use 100-dimensional log mel-filterbank features with 24 kHz sampling rate and hop length 256.",
       "zh": "音频样本使用 100 维对数梅尔滤波器组特征，采样率 24 kHz，帧移 256。"
      },
      {
       "id": "s-4-3-4",
       "original": "A random 70% to 100% of mel frames is masked for infilling task training.",
       "zh": "训练填充任务时，随机掩码 70% 到 100% 的梅尔帧。"
      },
      {
       "id": "s-4-3-5",
       "original": "For CFG (Sec.2.2) training, first the masked speech input is dropped with a rate of 0.3, then the masked speech again but with text input together is dropped with a rate of 0.2 (Le et al., 2024).",
       "zh": "CFG（见 Sec.2.2）训练分两阶段：先以 0.3 的丢弃率丢弃掩码语音输入，再以 0.2 的丢弃率将掩码语音与文本输入一起丢弃（Le et al., 2024）。"
      },
      {
       "id": "s-4-3-6",
       "original": "We assume that the two-stage control of CFG training may have the model learn more with text alignment.",
       "zh": "我们认为这种两阶段的 CFG 训练控制可以让模型更多地学习文本对齐。"
      },
      {
       "id": "s-4-3-7",
       "original": "Inference The inference process is mainly elaborated in Sec.3.1.",
       "zh": "推理：推理过程已在 Sec.3.1 中详述。"
      },
      {
       "id": "s-4-3-8",
       "original": "We use the Exponential Moving Averaged (EMA) (Karras et al., 2024) weights for inference, and the Euler ODE solver for F5- TTS (midpoint for E2 TTS as described in Eskimez et al. (2024)).",
       "zh": "推理使用指数移动平均（EMA）（Karras et al., 2024）权重；F5-TTS 使用 Euler ODE 求解器（E2 TTS 按 Eskimez et al. (2024) 的描述使用中点法）。"
      },
      {
       "id": "s-4-3-9",
       "original": "We use the pretrained vocoder Vocos (Siuzdak, 2023) to convert generated log mel 3https://github.com/fxsjy/jieba 4https://github.com/mozillazg/python-pinyin spectrograms to audio signals.",
       "zh": "我们使用预训练的声码器 Vocos（Siuzdak, 2023）把生成的对数梅尔频谱图转换为音频信号。（脚注 3：https://github.com/fxsjy/jieba；脚注 4：https://github.com/mozillazg/python-pinyin）"
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
       "original": "Baselines We compare our models with leading TTS systems including, (mainly) autoregressive models: VALL-E 2 (Chen et al., 2024), MELLE (Meng et al., 2024), FireRedTTS (Guo et al., 2024a) and CosyVoice (Du et al., 2024b); non-autoregressive models: Voicebox (Le et al., 2024), NaturalSpeech 3 (Ju et al., 2024), DiTToTTS (Lee et al., 2024), MaskGCT (Wang et al., 2024), Seed-TTSDiT (Anastassiou et al., 2024) and our reproduced E2 TTS (Eskimez et al., 2024).",
       "zh": "基线：我们与领先的 TTS 系统比较，包括（主要是）自回归模型：VALL-E 2（Chen et al., 2024）、MELLE（Meng et al., 2024）、FireRedTTS（Guo et al., 2024a）和 CosyVoice（Du et al., 2024b）；非自回归模型：Voicebox（Le et al., 2024）、NaturalSpeech 3（Ju et al., 2024）、DiTTo-TTS（Lee et al., 2024）、MaskGCT（Wang et al., 2024）、Seed-TTS_DiT（Anastassiou et al., 2024）以及我们复现的 E2 TTS（Eskimez et al., 2024）。"
      },
      {
       "id": "s-4-4-2",
       "original": "Details of compared models see Appendix A.",
       "zh": "对比模型的详情见附录 A。"
      },
      {
       "id": "s-4-4-3",
       "original": "Metrics We measure the performances under cross-sentence task (Wang et al., 2023a; Le et al., 2024).",
       "zh": "指标：我们在跨句（cross-sentence）任务下评测性能（Wang et al., 2023a; Le et al., 2024）。"
      },
      {
       "id": "s-4-4-4",
       "original": "We report Word Error Rate (WER) and speaker Similarity between generated and the original target speeches (SIM-o (Le et al., 2024)) for objective evaluation.",
       "zh": "客观评测报告生成语音与原始目标语音之间的词错误率（WER）和说话人相似度（SIM-o（Le et al., 2024)）。"
      },
      {
       "id": "s-4-4-5",
       "original": "For WER, we employ Whisperlarge-v3 (Radford et al., 2023) to transcribe English and Paraformer-zh (Gao et al., 2023b) for Chinese, following (Anastassiou et al., 2024).",
       "zh": "WER 方面，沿用（Anastassiou et al., 2024）的做法，英文用 Whisper-large-v3（Radford et al., 2023）转写，中文用 Paraformer-zh（Gao et al., 2023b）。"
      },
      {
       "id": "s-4-4-6",
       "original": "For SIM-o, we use a WavLM-large-based (Chen et al., 2022) speaker verification model to extract speaker embeddings for calculating the cosine similarity of synthesized and ground truth speeches.",
       "zh": "SIM-o 方面，使用基于 WavLM-large（Chen et al., 2022）的说话人验证模型提取说话人嵌入，计算合成语音与真实语音的余弦相似度。"
      },
      {
       "id": "s-4-4-7",
       "original": "We use Comparative Mean Opinion Scores (CMOS) and Similarity Mean Opinion Scores (SMOS) for subjective evaluation.",
       "zh": "主观评测使用比较平均意见分（CMOS）和相似度平均意见分（SMOS）。"
      },
      {
       "id": "s-4-4-8",
       "original": "Details of subjective evaluations can be found in Appendix C.",
       "zh": "主观评测的细节见附录 C。"
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
    "original": "Experimental Results",
    "zh": "实验结果"
   },
   "blocks": [
    {
     "id": "p-5-1",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-5-1-1",
       "original": "Tab.1 and 2 show the main results of objective and subjective evaluations.",
       "zh": "Tab.1 和 Tab.2 给出客观与主观评测的主要结果。"
      },
      {
       "id": "s-5-1-2",
       "original": "We report the average score of three random seed generation results with our model and open-sourced baselines.",
       "zh": "我们报告的是本模型与开源基线在 3 个随机种子下生成结果的平均分。"
      },
      {
       "id": "s-5-1-3",
       "original": "We use by default a CFG strength of 2 and a Sway Sampling coefficient of −1 for our F5-TTS.",
       "zh": "F5-TTS 默认使用 CFG 强度 2、Sway Sampling 系数 −1。"
      }
     ]
    },
    {
     "id": "p-5-2",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-5-2-1",
       "original": "F5-TTS achieves a WER of 2.42 on LibriSpeechPC test-clean with 32 NFE, demonstrating its robustness in zero-shot generation.",
       "zh": "F5-TTS 在 32 NFE 下于 LibriSpeech-PC test-clean 取得 2.42 的 WER，展现了零样本生成的鲁棒性。"
      },
      {
       "id": "s-5-2-2",
       "original": "Inference with 16 NFE, F5-TTS gains an RTF of 0.15 while still supporting high-quality generation with a WER of 2.53.",
       "zh": "以 16 NFE 推理时，F5-TTS 取得 0.15 的 RTF，同时仍支持高质量生成，WER 为 2.53。"
      },
      {
       "id": "s-5-2-3",
       "original": "The reproduced E2 TTS shows an excellent speaker similarity (SIM) but much worse WER in the zero-shot scenario, indicating the inherent deficiency of alignment robustness.",
       "zh": "复现的 E2 TTS 说话人相似度（SIM）出色，但零样本场景下 WER 差得多，说明其对齐鲁棒性存在固有缺陷。"
      }
     ]
    },
    {
     "id": "p-5-3",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-5-3-1",
       "original": "From the evaluation results on the Seed-TTS test sets, F5-TTS behaves similarly with a close WER to ground truth and comparable SIM scores.",
       "zh": "在 Seed-TTS 测试集上，F5-TTS 表现类似：WER 接近真实语音（ground truth），SIM 分数相当。"
      },
      {
       "id": "s-5-3-2",
       "original": "It produces smooth and fluent speech in zero-shot generation with a CMOS of 0.31 (0.21) and SMOS #Param.",
       "zh": "它在零样本生成中产出了平滑流利的语音，CMOS 为 0.31（0.21），SMOS（及参数量 #Param.，见 Tab.2）……（此句因表格穿插而断行，后半接下文）"
      }
     ]
    },
    {
     "id": "p-5-4",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-5-4-1",
       "original": "#Data WER(%)↓SIM-o↑RTF↓ LibriSpeech test-clean Ground Truth (2.2 hours subset) 2.2 0.754 VALL-E 2 2.44 0.643 0.732 MELLE 2.10 0.625 0.549 MELLE-R2 2.14 0.608 0.276 Voicebox 1.9 0.662 0.64 DiTTo-TTS 2.56 0.627 0.162 Ground Truth (40 samples subset) 1.94 0.68 Voicebox 2.03 0.64 0.64 NaturalSpeech 3 1.94 0.67 0.296 MaskGCT 2.634 0.687 Ground Truth (1127 samples 2 hrs) 2.23 0.69 2.32 0.66 ∼300M 3.59 0.66 0.92 FireRedTTS ∼580M 2.69 0.47 0.84 E2 TTS (32 NFE) 2.95 0.69 0.68 2.53 0.66 0.15 2.42 0.66 0.31",
       "zh": "（此处为 Table 1 数值残块，数字与原文一致：列 #Data / WER(%)↓ / SIM-o↑ / RTF↓。LibriSpeech test-clean 上 Ground Truth（2.2 小时子集）为 2.2 / 0.754；VALL-E 2 为 2.44 / 0.643 / 0.732；MELLE 为 2.10 / 0.625 / 0.549；MELLE-R2 为 2.14 / 0.608 / 0.276；Voicebox 为 1.9 / 0.662 / 0.64；DiTTo-TTS 为 2.56 / 0.627 / 0.162。Ground Truth（40 条样本子集）为 1.94 / 0.68；同子集 Voicebox 为 2.03 / 0.64 / 0.64；NaturalSpeech 3 为 1.94 / 0.67 / 0.296；MaskGCT 为 2.634 / 0.687。Ground Truth（1127 条样本约 2 小时子集）为 2.23 / 0.69；CosyVoice（∼300M）为 3.59 / 0.66 / 0.92（另有 2.32 / 0.66 对照）；FireRedTTS（∼580M）为 2.69 / 0.47 / 0.84；E2 TTS（32 NFE）为 2.95 / 0.69 / 0.68；F5-TTS 16 NFE 为 2.53 / 0.66 / 0.15，32 NFE 为 2.42 / 0.66 / 0.31。）"
      }
     ]
    },
    {
     "id": "tab-5-1",
     "type": "table_caption",
     "page": 7,
     "original": "Table 1: Comparison results on LibriSpeech(-PC) testclean. The Real-Time Factor (RTF) is computed with the inference time of 10s speech on NVIDIA RTX 3090. #Param. stands for the number of learnable parameters and #Data refers to the used training dataset in hours.",
     "zh": "表 1：LibriSpeech(-PC) test-clean 上的对比结果。实时因子（RTF）按在 NVIDIA RTX 3090 上推理 10 秒语音的耗时计算。#Param. 表示可学习参数数量，#Data 表示所用训练数据的小时数。"
    },
    {
     "id": "p-5-5",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-5-5-1",
       "original": "of 3.89 (3.83) on Seed-TTS test-en (test-zh), and surpasses some baseline models trained with larger scales.",
       "zh": "……在 Seed-TTS test-en（test-zh）上 SMOS 为 3.89（3.83），并超过了一些以更大数据规模训练的基线模型。（此句因表格穿插而断行，与 Tab.1 数值块穿插，其列 #Data / WER(%)↓ / SIM-o↑ / RTF↓ 的完整转写见 Tab.1 残块句，含 LibriSpeech test-clean 2.2 小时子集 Ground Truth 2.2 / 0.754、1127 条约 2 小时子集 2.23 / 0.69、E2 TTS 32 NFE 2.95 / 0.69 / 0.68、F5-TTS 16 NFE 2.53 / 0.66 / 0.15 与 32 NFE 2.42 / 0.66 / 0.31 等，数字与原文一致。）"
      },
      {
       "id": "s-5-5-2",
       "original": "As stated in Sec.3.1, we simply estimate duration based on the ratio of the audio prompt’s transcript length and the text prompt length, rather than relying on an extra duration predictor.",
       "zh": "如 Sec.3.1 所述，我们简单地按音频提示转写长度与文本提示长度之比估计时长，而不依赖额外的时长预测器。"
      },
      {
       "id": "s-5-5-3",
       "original": "It is also worth mentioning that Seed-TTS with the best result is trained with orders of larger model size and dataset (several million hours) than ours.",
       "zh": "值得一提的是，取得最好结果的 Seed-TTS 使用了比我们大若干数量级的模型规模和数据（数百万小时）。"
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
       "original": "A robustness test on ELLA-V (Song et al., 2024) hard sentences is further included in Appendix B.5.",
       "zh": "针对 ELLA-V（Song et al., 2024）困难句的鲁棒性测试见附录 B.5。"
      },
      {
       "id": "s-5-6-2",
       "original": "The ablation of vocoders and additional evaluation with a non-PC test set are in Appendix B.6.",
       "zh": "声码器消融以及在 non-PC 测试集上的附加评测见附录 B.6。"
      },
      {
       "id": "s-5-6-3",
       "original": "An analysis of training stability with varying data scales is in Appendix B.7.",
       "zh": "不同数据规模下训练稳定性的分析见附录 B.7。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-5-1",
   "num": "5.1",
   "level": 2,
   "page": 7,
   "title": {
    "original": "Ablation of Model Architecture",
    "zh": "模型架构消融"
   },
   "blocks": [
    {
     "id": "p-5-1-1",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-5-1-1-1",
       "original": "To clarify our F5-TTS’s efficiency and stress the limitation of E2 TTS.",
       "zh": "为阐明 F5-TTS 的高效性并指出 E2 TTS 的局限，"
      },
      {
       "id": "s-5-1-1-2",
       "original": "We conduct in-depth ablation studies.",
       "zh": "我们开展了深入的消融研究。"
      },
      {
       "id": "s-5-1-1-3",
       "original": "We trained small models (all around 155M parameters) to 800K updates on the WenetSpeech4TTS Premium 945 hours Mandarin dataset with half the batch size compared to base models.",
       "zh": "我们在 WenetSpeech4TTS Premium 945 小时普通话数据集上训练小模型（均约 155M 参数）至 800K 步更新，批大小为基础模型的一半。"
      },
      {
       "id": "s-5-1-1-4",
       "original": "Configuration details see Appendix B.1.",
       "zh": "配置细节见附录 B.1。"
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
       "original": "Fig.2 shows the overall trend of productive small models’ WER and SIM scores evaluated on SeedTTS test-zh.",
       "zh": "Fig.2 展示了可用小模型在 Seed-TTS test-zh 上评测的 WER 与 SIM 分数的整体走势。（此句后半与 Table 2 数值块穿插，相关数字见该表：test-en 上 F5-TTS 为 2.06 / 0.73 / CMOS 0.00 / SMOS 3.91，E2 TTS 为 2.19 / 0.71 / 0.06 / 3.81；test-zh 上 F5-TTS 为 1.26 / 0.76 / 0.00 / 3.72 等。）"
      },
      {
       "id": "s-5-1-2-2",
       "original": "F5-TTS (32 NFE w/o SS) achieves a WER of 4.17 and a SIM of 0.54 at 800K upWER(%)↓SIM-o↑ CMOS↑SMOS↑ 2.06 0.73 0.00 3.91 2.09 0.70 3.39 0.64 0.02 3.64 FireRedTTS 3.82 0.46 2.94 MaskGCT Seed-TTSDiT E2 TTS (32 NFE) 2.19 0.71 0.06 3.81 1.89 0.67 0.16 3.79 1.83 0.67 0.31 3.89 1.26 0.76 0.00 3.72 1.27 0.72 3.10 0.75 3.54 FireRedTTS 1.51 0.63 3.28 MaskGCT Seed-TTSDiT E2 TTS (32 NFE) 1.97 0.73 3.44 1.74 0.75 0.02 3.72 1.56 0.76 0.21 3.83",
       "zh": "F5-TTS（32 NFE w/o SS）在 800K 步更新时取得 WER 4.17、SIM 0.54（此句为 Table 2 数值残块，数字与原文一致，列为 WER(%)↓ / SIM-o↑ / CMOS↑ / SMOS↑。Seed-TTS test-en：真实语音为 2.06 / 0.73 / 0.00 / 3.91；CosyVoice 为 0.64 / 0.02 / 3.64 与 2.09 / 0.70 对照；FireRedTTS 为 3.82 / 0.46 / 2.94；MaskGCT、Seed-TTS_DiT 部分列缺失；E2 TTS（32 NFE）为 2.19 / 0.71 / 0.06 / 3.81；F5-TTS 为 1.89 / 0.67 / 0.16 / 3.79 与 1.83 / 0.67 / 0.31 / 3.89；另有 2.09 / 0.70 / 3.39 一行。Seed-TTS test-zh：真实语音为 1.26 / 0.76 / 0.00 / 3.72；CosyVoice 为 1.27 / 0.72，SMOS 3.10 / 0.75 / 3.54；FireRedTTS 为 1.51 / 0.63 / 3.28；MaskGCT 为 1.97 / 0.73 / 3.44；Seed-TTS_DiT 为 1.74 / 0.75 / 0.02 / 3.72；E2 TTS（32 NFE）为 1.56 / 0.76 / 0.21 / 3.83；F5-TTS（32 NFE）为 1.26 / 0.76 / 0.00 / 3.72 一档，3.10 / 0.75 等列值散见于对应行。）"
      }
     ]
    },
    {
     "id": "tab-5-1-1",
     "type": "table_caption",
     "page": 7,
     "original": "Table 2: Results on two test sets, Seed-TTS test-en and test-zh. The boldface indicates the best result, the underline denotes the second best, and * denotes scores reported in baseline papers.",
     "zh": "表 2：Seed-TTS test-en 与 test-zh 两个测试集上的结果。加粗为最佳结果，下划线为次佳，* 表示基线论文中报告的分数。"
    },
    {
     "id": "fig-5-1-1",
     "type": "figure_caption",
     "page": 7,
     "original": "Figure 2: Seed-TTS test-zh evaluation results of 155M small models trained with WenetSpeech4TTS Premium a 945 hours Mandarin Corpus.",
     "zh": "图 2：在 WenetSpeech4TTS Premium（945 小时普通话语料）上训练的 155M 小模型，于 Seed-TTS test-zh 上的评测结果。"
    },
    {
     "id": "p-5-1-3",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-5-1-3-1",
       "original": "dates, while E2 TTS is 9.63 and 0.53.",
       "zh": "在 800K 步更新时，F5-TTS（32 NFE，不用 SS）取得 WER 4.17、SIM 0.54，而 E2 TTS 为 9.63 和 0.53。"
      },
      {
       "id": "s-5-1-3-2",
       "original": "We were first faced with unsatisfactory results with reproduced E2 TTS in Mandarin.",
       "zh": "我们最初在复现的中文 E2 TTS 上得到的是不理想的结果。"
      },
      {
       "id": "s-5-1-3-3",
       "original": "On the one hand, E2 TTS converges slowly; on the other hand, we found that E2 TTS consistently failed (unable to solve with re-ranking) on 7% test samples (WER>50%) all along the training process, speculated of larger distribution gap with train set.",
       "zh": "一方面，E2 TTS 收敛缓慢；另一方面，我们发现 E2 TTS 在整个训练过程中始终在 7% 的测试样本（WER > 50%）上失败（重排序无法解决），推测是这些样本与训练集的分布差距更大。"
      },
      {
       "id": "s-5-1-3-4",
       "original": "To disclose the possible reasons for E2 TTS’s deficiency, we investigate the models’ behaviors with different inputs.",
       "zh": "为揭示 E2 TTS 缺陷的可能原因，我们用不同输入考察模型的行为。"
      },
      {
       "id": "s-5-1-3-5",
       "original": "See from Tab.4 in Appendix B.2, by dropping the audio prompt, and synthesizing speech solely with the text prompt, E2 TTS is free of failures (F5-TTS also benefits but because of more standard output that is easier to be recognized by the ASR model).",
       "zh": "见附录 B.2 的 Tab.4：丢弃音频提示、仅凭文本提示合成语音时，E2 TTS 不再出现失败（F5-TTS 也有受益，但原因是输出更标准、更容易被 ASR 模型识别）。"
      },
      {
       "id": "s-5-1-3-6",
       "original": "This phenomenon implied a deep entanglement of semantic and acoustic features within E2 TTS’s model design, and it greatly hinders real-world application as the failed generation cannot be solved with re-ranking.",
       "zh": "这一现象暗示 E2 TTS 模型设计中语义与声学特征的深度纠缠；并且由于失败的生成无法靠重排序解决，它极大地阻碍了实际应用。"
      },
      {
       "id": "s-5-1-3-7",
       "original": "Supervised fine-tuning facing outof-domain data or a tremendous pretraining scale under the slow convergence speed is mandatory for E2 TTS, which is inconvenient for industrial deployment and a crushing burden for individuals.",
       "zh": "面对域外数据的监督微调，或在收敛如此缓慢的前提下做巨大规模的预训练，对 E2 TTS 而言都是必须的——这给工业部署带来不便，对个人开发者更是压垮性的负担。"
      }
     ]
    },
    {
     "id": "p-5-1-4",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-5-1-4-1",
       "original": "From Tab.3 GFLOPs, structures without many skip connections natively allow faster training and inference.",
       "zh": "从 Tab.3 的 GFLOPs 看，不带大量跳跃连接的结构天然允许更快的训练与推理。"
      },
      {
       "id": "s-5-1-4-2",
       "original": "However, pure adaLN DiT (F5- TTS−Conv2Text) failed to learn alignment given simply padded character sequences, while MMDiT (Esser et al., 2024) learned fast and collapsed fast, resulting in severe repeated utterance with wild timbre and prosody.",
       "zh": "然而，纯 adaLN DiT（F5-TTS−Conv2Text）在给定简单补齐的字符序列时未能学会对齐；而 MMDiT（Esser et al., 2024）学得快、崩得也快，产生严重的重复语句以及失控的音色与韵律。"
      },
      {
       "id": "s-5-1-4-3",
       "original": "We assume that the pure MMDiT structure is far too flexible for TTS task that requires faithful generation following guidance.",
       "zh": "我们认为纯 MMDiT 结构对要求忠实跟随引导的 TTS 任务来说过于灵活。"
      },
      {
       "id": "s-5-1-4-4",
       "original": "Thus we focus on enhancing the modeling ability of DiT.",
       "zh": "因此我们专注于增强 DiT 的建模能力。"
      },
      {
       "id": "s-5-1-4-5",
       "original": "Based on the concept of refining the input text representation to better align with speech modality, and keep the simplicity of system design, F5-TTS is proven effective.",
       "zh": "基于「细化输入文本表示以更好地与语音模态对齐」的理念，并保持系统设计的简洁，F5-TTS 被证明是有效的。"
      },
      {
       "id": "s-5-1-4-6",
       "original": "F5-TTS easily handles zeroshot generation, showing stronger robustness.",
       "zh": "F5-TTS 轻松应对零样本生成，展现出更强的鲁棒性。"
      }
     ]
    },
    {
     "id": "p-5-1-5",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-5-1-5-1",
       "original": "We further ablate with adding the same branch for input speech (F5-TTS+Conv2Audio), and also conduct experiments to figure out whether the long skip connection and the refinement of input text are beneficial to the counterpart backbone, i.e. F5- TTS and E2 TTS, named F5-TTS+LongSkip and E2 TTS+Conv2Text respectively.",
       "zh": "我们进一步消融：给输入语音加同样的分支（F5-TTS+Conv2Audio）；并通过实验考察长跳跃连接与文本细化是否对对应的另一骨干（即 F5-TTS 与 E2 TTS）有益，分别记为 F5-TTS+LongSkip 和 E2 TTS+Conv2Text。"
      },
      {
       "id": "s-5-1-5-2",
       "original": "From Fig.2, F5- TTS+Conv2Audio trades much alignment robustness (+1.61 WER) with a slightly higher speaker similarity (+0.01 SIM).",
       "zh": "从 Fig.2 看，F5-TTS+Conv2Audio 用大量对齐鲁棒性（+1.61 WER）换来了略高的说话人相似度（+0.01 SIM）。"
      },
      {
       "id": "s-5-1-5-3",
       "original": "The long skip connection structure can not simply fit into DiT to improve speaker similarity, while the ConvNeXt for input text refinement can not directly apply to the flat U-Net Transformer to improve WER as well, both showing significant degradation of performance.",
       "zh": "长跳跃连接结构无法简单嫁接到 DiT 上提升说话人相似度；用于文本细化的 ConvNeXt 也无法直接用于扁平 U-Net Transformer 来改善 WER——两者都出现显著的性能退化。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-5-2",
   "num": "5.2",
   "level": 2,
   "page": 8,
   "title": {
    "original": "Ablation of Sway Sampling",
    "zh": "Sway Sampling 消融"
   },
   "blocks": [
    {
     "id": "p-5-2-1",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-5-2-1-1",
       "original": "It is clear from Fig.3 that a Sway Sampling with more negative s value further improves performance.",
       "zh": "从 Fig.3 可以清楚看到，s 值更负的 Sway Sampling 能进一步提升性能。"
      },
      {
       "id": "s-5-2-1-2",
       "original": "Appendix B.3 with massive ablation results on base models, provides more evidence of the effectiveness of the proposed strategy.",
       "zh": "附录 B.3 给出了基础模型上的大量消融结果，为所提策略的有效性提供了更多证据。"
      }
     ]
    },
    {
     "id": "p-5-2-2",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-5-2-2-1",
       "original": "To be more concrete and intuitive, we conduct a \"leak and override\" experiment.",
       "zh": "为更具体、直观地说明，我们设计了一个「泄露并覆盖」（leak and override）实验。"
      }
     ]
    },
    {
     "id": "p-5-2-3",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-5-2-3-1",
       "original": "We first replace the Gaussian noise input x0 at inference time with a ground-truth-information-leaked input (1 −t′)x0 + t′x′ ref, where t′ = 0.1 and x′ ref is a duplicate of the audio prompt mel features.",
       "zh": "我们先把推理时的高斯噪声输入 x0 替换为泄露了真实信息的输入 (1 − t′)x0 + t′x′_ref（即 x0 占 (1 − t′)、x′_ref 占 t′），其中 t′ = 0.1，x′_ref 是音频提示梅尔特征的复制。"
      },
      {
       "id": "s-5-2-3-2",
       "original": "Then, we provide a text prompt different from the duplicated audio transcript and let the model continue",
       "zh": "然后给出一个与被复制音频转写不同的文本提示，让模型继续"
      }
     ]
    },
    {
     "id": "fig-5-2-1",
     "type": "figure_caption",
     "page": 8,
     "original": "Figure 3: The probability density function of Sway Sampling with different coefficient s, and small models’ corresponding performance on Seed-TTS test-zh.",
     "zh": "图 3：不同系数 s 下 Sway Sampling 的概率密度函数，以及小模型在 Seed-TTS test-zh 上的对应表现。"
    },
    {
     "id": "p-5-2-4",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-5-2-4-1",
       "original": "the subsequent inference (skip the flow steps before t′).",
       "zh": "后续推理（跳过 t′ 之前的流步骤）。"
      },
      {
       "id": "s-5-2-4-2",
       "original": "The model succeeds in overriding leaked utterances and producing speech following the text prompt if Sway Sampling is used, and fails without.",
       "zh": "使用 Sway Sampling 时，模型成功覆盖了被泄露的话语、产出跟随文本提示的语音；不使用时则失败。"
      },
      {
       "id": "s-5-2-4-3",
       "original": "Uniformly sampled flow steps will have the model producing speech dominated by leaked information, speaking the duplicated audio prompt’s context.",
       "zh": "均匀采样的流步骤会让模型产出被泄露信息主导的语音，说出被复制的音频提示内容。"
      },
      {
       "id": "s-5-2-4-4",
       "original": "Similarly, a leaked timbre can be overridden with another speaker’s utterance as an audio prompt, leveraging Sway Sampling.",
       "zh": "类似地，借助 Sway Sampling，还可以用另一位说话人的话语作为音频提示来覆盖被泄露的音色。"
      }
     ]
    },
    {
     "id": "p-5-2-5",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-5-2-5-1",
       "original": "The experiment result is a shred of strong evidence proving that the early flow steps are crucial for sketching the silhouette of target speech based on given prompts faithfully, the later steps focus more on formed intermediate noisy output, where our sway-to-left sampling (s < 0) finds the profitable niche and takes advantage of it.",
       "zh": "实验结果是有力证据：早期流步骤对依据给定提示忠实地勾勒目标语音的轮廓至关重要，后期步骤更关注已成形的中间带噪输出——我们的左偏采样（s < 0）找到了有利位置并加以利用。"
      },
      {
       "id": "s-5-2-5-2",
       "original": "We emphasize that our inference-time Sway Sampling can be easily applied to existing CFM-based models without retraining.",
       "zh": "我们强调，推理期的 Sway Sampling 无需重训即可方便地应用于已有的基于 CFM 的模型。"
      },
      {
       "id": "s-5-2-5-3",
       "original": "And we will work in the future to combine it with training-time noise schedulers and distillation techniques to further boost efficiency.",
       "zh": "未来我们会把它与训练期的噪声调度器和蒸馏技术结合，进一步提升效率。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-6",
   "num": "6",
   "level": 1,
   "page": 8,
   "title": {
    "original": "Conclusion",
    "zh": "结论"
   },
   "blocks": [
    {
     "id": "p-6-1",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-6-1-1",
       "original": "This work introduces F5-TTS, a fully nonautoregressive text-to-speech system based on flow matching with diffusion transformer (DiT).",
       "zh": "本工作介绍了 F5-TTS，一个基于流匹配与 Diffusion Transformer（DiT）的完全非自回归文本转语音系统。"
      },
      {
       "id": "s-6-1-2",
       "original": "With a tidy pipeline, literally text in and speech out, F5- TTS achieves state-of-the-art zero-shot ability compared to existing works trained on industry-scale data.",
       "zh": "凭借整洁的流水线——真正意义上文本进、语音出——F5-TTS 的零样本能力达到最先进水平，可比拟那些在工业级数据规模上训练的现有工作。"
      },
      {
       "id": "s-6-1-3",
       "original": "We adopt ConvNeXt for text modeling and propose the test-time Sway Sampling strategy to further improve the robustness of speech generation and inference efficiency.",
       "zh": "我们采用 ConvNeXt 进行文本建模，并提出测试期的 Sway Sampling 策略，进一步提升语音生成的鲁棒性与推理效率。"
      },
      {
       "id": "s-6-1-4",
       "original": "Our design allows faster training and inference, by achieving a testtime RTF of 0.15, which is competitive with other heavily optimized TTS models of similar performance.",
       "zh": "我们的设计使训练与推理更快，测试期 RTF 达 0.15，与其他经过重度优化的同等性能 TTS 模型相比具有竞争力。"
      },
      {
       "id": "s-6-1-5",
       "original": "We will open-source our code, and models, to enhance transparency and facilitate reproducible research in this area.",
       "zh": "我们将开源代码与模型，以增强透明度并促进该领域的可复现研究。"
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
       "original": "There are two limitations to this work.",
       "zh": "本工作有两点局限。"
      },
      {
       "id": "s-limitations-1-2",
       "original": "First, although F5-TTS accelerates the training and inference while maintaining the simplicity of the system through better structure design, the mel spectrogram sequence length is still much longer than the text modality.",
       "zh": "第一，尽管 F5-TTS 通过更好的结构设计，在保持系统简洁的同时加速了训练与推理，Mel 频谱图的序列长度仍远长于文本模态。"
      },
      {
       "id": "s-limitations-1-3",
       "original": "Therefore, research and employment of a more efficient and hopefully universal continuous representation compatible with highly expressive speech synthesis remains a critical direction and can further improve efficiency and performance.",
       "zh": "因此，研究并采用一种更高效、且有望通用的连续表示以兼容高表现力语音合成，仍是一个关键方向，并可进一步提升效率与性能。"
      },
      {
       "id": "s-limitations-1-4",
       "original": "Second, although F5-TTS has great zeroshot generation ability and can deeply mimic the reference audio, it lacks fine-grained control of paralinguistic details, e.g. emotion, which is of great research and practical application value.",
       "zh": "第二，尽管 F5-TTS 有很强的零样本生成能力、能深度模仿参考音频，但它缺乏对副语言细节（如情感）的细粒度控制，而这具有重要的研究价值与实际应用价值。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-ethics-statements",
   "num": null,
   "level": 2,
   "page": 9,
   "title": {
    "original": "Ethics Statements",
    "zh": "伦理声明"
   },
   "blocks": [
    {
     "id": "p-ethics-statements-1",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-ethics-statements-1-1",
       "original": "This work is purely a research project.",
       "zh": "本工作纯属研究项目。"
      },
      {
       "id": "s-ethics-statements-1-2",
       "original": "F5-TTS is trained on large-scale public multilingual speech data and could synthesize speech of high naturalness and speaker similarity.",
       "zh": "F5-TTS 在大规模公开多语言语音数据上训练，能够合成高度自然、说话人高度相似的语音。"
      },
      {
       "id": "s-ethics-statements-1-3",
       "original": "Given the potential risks in the misuse of the model, such as spoofing voice identification, it should be imperative to implement watermarks and develop a detection model to identify audio outputs.",
       "zh": "考虑到模型被滥用的潜在风险（例如欺骗声纹识别），应当必须实施水印技术并开发检测模型来识别音频输出。"
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
       "original": "Philip Anastassiou, Jiawei Chen, Jitong Chen, Yuanzhe Chen, et al. 2024."
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
       "original": "Seed-TTS: A family of highquality versatile speech generation models. arXiv Rosana Ardila, Megan Branson, Kelly Davis, Michael Henretty, Michael Kohler, Josh Meyer, Reuben Morais, Lindsay Saunders, Francis M Tyers, and Gregor Weber. 2019."
      },
      {
       "id": "s-references-2-2",
       "original": "Common voice: A massivelymultilingual speech corpus."
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
       "original": "Jhon Atchison and Sheng M Shen. 1980."
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
       "original": "Logisticnormal distributions: Some properties and uses."
      },
      {
       "id": "s-references-4-2",
       "original": "Biometrika, 67(2):261–272."
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
       "original": "He Bai, Tatiana Likhomanenko, Ruixiang Zhang, Zijin Gu, Zakaria Aldeneh, and Navdeep Jaitly. 2024."
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
       "original": "dMel: Speech tokenization made simple."
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
       "original": "arXiv He Bai, Renjie Zheng, Junkun Chen, Mingbo Ma, Xintong Li, and Liang Huang. 2022."
      },
      {
       "id": "s-references-7-2",
       "original": "A3t: Alignmentaware acoustic and text pretraining for speech synthesis and editing."
      },
      {
       "id": "s-references-7-3",
       "original": "In International Conference on Machine Learning, pages 1399–1411."
      },
      {
       "id": "s-references-7-4",
       "original": "PMLR."
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
       "original": "Ricky T."
      },
      {
       "id": "s-references-8-2",
       "original": "Q."
      },
      {
       "id": "s-references-8-3",
       "original": "Chen. 2018. torchdiffeq."
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
       "original": "Sanyuan Chen, Shujie Liu, Long Zhou, Yanqing Liu, Xu Tan, Jinyu Li, Sheng Zhao, Yao Qian, and Furu Wei. 2024."
      },
      {
       "id": "s-references-9-2",
       "original": "VALL-E 2: Neural codec language models are human parity zero-shot text to speech synthesizers. arXiv preprint arXiv:2406.05370."
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
       "original": "Zhengyang Chen, Sanyuan Chen, Yu Wu, Yao Qian, Chengyi Wang, Shujie Liu, Yanmin Qian, and Michael Zeng. 2022."
      },
      {
       "id": "s-references-10-2",
       "original": "Large-scale self-supervised speech representation learning for automatic speaker verification."
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
       "original": "In Proc."
      },
      {
       "id": "s-references-11-2",
       "original": "ICASSP, pages 6147–6151."
      },
      {
       "id": "s-references-11-3",
       "original": "IEEE."
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
       "original": "Alexandre Défossez, Jade Copet, Gabriel Synnaeve, and Yossi Adi. 2022."
      },
      {
       "id": "s-references-12-2",
       "original": "High fidelity neural audio compression. arXiv preprint arXiv:2210.13438."
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
       "original": "Prafulla Dhariwal and Alexander Nichol. 2021."
      },
      {
       "id": "s-references-13-2",
       "original": "Diffusion models beat gans on image synthesis."
      },
      {
       "id": "s-references-13-3",
       "original": "Advances in neural information processing systems, 34:8780– 8794."
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
       "original": "Chenpeng Du, Yiwei Guo, Hankun Wang, Yifan Yang, Zhikang Niu, Shuai Wang, Hui Zhang, Xie Chen, and Kai Yu. 2024a."
      },
      {
       "id": "s-references-14-2",
       "original": "VALL-T: Decoder-only generative transducer for robust and decoding-controllable textto-speech. arXiv preprint arXiv:2401.14321."
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
       "original": "Zhihao Du, Qian Chen, Shiliang Zhang, Kai Hu, et al."
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
       "original": "2024b."
      },
      {
       "id": "s-references-16-2",
       "original": "Cosyvoice: A scalable multilingual zeroshot text-to-speech synthesizer based on supervised semantic tokens. arXiv preprint arXiv:2407.05407."
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
       "original": "Sefik Emre Eskimez, Xiaofei Wang, Manthan Thakker, Canrun Li, et al. 2024."
      },
      {
       "id": "s-references-17-2",
       "original": "E2 TTS: Embarrassingly easy fully non-autoregressive zero-shot TTS. arXiv Patrick Esser, Sumith Kulal, Andreas Blattmann, Rahim Entezari, et al. 2024."
      },
      {
       "id": "s-references-17-3",
       "original": "Scaling rectified flow transformers for high-resolution image synthesis."
      },
      {
       "id": "s-references-17-4",
       "original": "In Proc."
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
       "original": "ICML."
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
       "original": "Zhengcong Fei, Mingyuan Fan, Changqian Yu, and Junshi Huang. 2024."
      },
      {
       "id": "s-references-19-2",
       "original": "Flux that plays music. arXiv Yuan Gao, Nobuyuki Morioka, Yu Zhang, and Nanxin Chen. 2023a."
      },
      {
       "id": "s-references-19-3",
       "original": "E3 TTS: Easy end-to-end diffusionbased text to speech."
      },
      {
       "id": "s-references-19-4",
       "original": "In Proc."
      },
      {
       "id": "s-references-19-5",
       "original": "ASRU, pages 1–8."
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
       "original": "IEEE."
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
       "original": "Zhifu Gao, Zerui Li, Jiaming Wang, Haoneng Luo, Xian Shi, Mengzhe Chen, Yabin Li, Lingyun Zuo, Zhihao Du, Zhangyu Xiao, et al. 2023b."
      },
      {
       "id": "s-references-21-2",
       "original": "FunASR: A fundamental end-to-end speech recognition toolkit. arXiv Hao-Han Guo, Kun Liu, Fei-Yu Shen, Yi-Chen Wu, Feng-Long Xie, Kun Xie, and Kai-Tuo Xu. 2024a."
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
       "original": "FireRedTTS: A foundation text-to-speech framework for industry-level generative speech applications. arXiv preprint arXiv:2409.03283."
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
       "original": "Tingwei Guo, Cheng Wen, Dongwei Jiang, Ne Luo, et al."
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
       "original": "2021."
      },
      {
       "id": "s-references-24-2",
       "original": "Didispeech: A large scale Mandarin speech corpus."
      },
      {
       "id": "s-references-24-3",
       "original": "In Proc."
      },
      {
       "id": "s-references-24-4",
       "original": "ICASSP, pages 6968–6972."
      },
      {
       "id": "s-references-24-5",
       "original": "IEEE."
      }
     ]
    },
    {
     "id": "p-references-25",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-25-1",
       "original": "Yiwei Guo, Chenpeng Du, Ziyang Ma, Xie Chen, and Kai Yu. 2024b."
      },
      {
       "id": "s-references-25-2",
       "original": "Voiceflow: Efficient text-to-speech with rectified flow matching."
      },
      {
       "id": "s-references-25-3",
       "original": "In Proc."
      },
      {
       "id": "s-references-25-4",
       "original": "ICASSP, pages 11121–11125."
      },
      {
       "id": "s-references-25-5",
       "original": "IEEE."
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
       "original": "Bing Han, Long Zhou, Shujie Liu, Sanyuan Chen, Lingwei Meng, Yanming Qian, Yanqing Liu, Sheng Zhao, Jinyu Li, and Furu Wei. 2024."
      },
      {
       "id": "s-references-26-2",
       "original": "VALL-E R: Robust and efficient zero-shot text-to-speech synthesis via monotonic alignment."
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
       "original": "Haorui He, Zengqiang Shang, Chaoren Wang, Xuyuan Li, et al. 2024."
      },
      {
       "id": "s-references-27-2",
       "original": "Emilia: An extensive, multilingual, and diverse speech dataset for large-scale speech generation. arXiv preprint arXiv:2407.05361."
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
       "original": "Jonathan Ho, Ajay Jain, and Pieter Abbeel. 2020."
      },
      {
       "id": "s-references-28-2",
       "original": "Denoising diffusion probabilistic models."
      },
      {
       "id": "s-references-28-3",
       "original": "Advances in neural information processing systems, 33:6840– 6851."
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
       "original": "Jonathan Ho and Tim Salimans. 2022."
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
       "original": "Classifierfree diffusion guidance."
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
       "original": "arXiv preprint Wei-Ning Hsu, Benjamin Bolte, Yao-Hung Hubert Tsai, Kushal Lakhotia, Ruslan Salakhutdinov, and Abdelrahman Mohamed. 2021."
      },
      {
       "id": "s-references-31-2",
       "original": "Hubert: Self-supervised speech representation learning by masked prediction of hidden units."
      },
      {
       "id": "s-references-31-3",
       "original": "IEEE/ACM Transactions on Audio, Speech, and Language Processing, 29:3451–3460."
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
       "original": "Keith Ito and Linda Johnson. 2017."
      },
      {
       "id": "s-references-32-2",
       "original": "The LJ speech dataset."
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
       "original": "Zeqian Ju, Yuancheng Wang, Kai Shen, Xu Tan, Detai Xin, Dongchao Yang, Yanqing Liu, Yichong Leng, Kaitao Song, Siliang Tang, et al. 2024."
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
       "original": "Naturalspeech 3: Zero-shot speech synthesis with factorized codec and diffusion models."
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
       "original": "Jacob Kahn, Morgane Riviere, Weiyi Zheng, Evgeny Kharitonov, et al. 2020."
      },
      {
       "id": "s-references-35-2",
       "original": "Libri-light: A benchmark for ASR with limited or no supervision."
      },
      {
       "id": "s-references-35-3",
       "original": "In Proc."
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
       "original": "ICASSP, pages 7669–7673."
      },
      {
       "id": "s-references-36-2",
       "original": "IEEE."
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
       "original": "Wei Kang, Xiaoyu Yang, Zengwei Yao, Fangjun Kuang, Yifan Yang, Liyong Guo, Long Lin, and Daniel Povey. 2024."
      },
      {
       "id": "s-references-37-2",
       "original": "Libriheavy: a 50,000 hours asr corpus with punctuation casing and context."
      },
      {
       "id": "s-references-37-3",
       "original": "In Proc."
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
       "original": "ICASSP, pages 10991–10995."
      },
      {
       "id": "s-references-38-2",
       "original": "IEEE."
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
       "original": "Tero Karras, Miika Aittala, Jaakko Lehtinen, Janne Hellsten, Timo Aila, and Samuli Laine. 2024."
      },
      {
       "id": "s-references-39-2",
       "original": "Analyzing and improving the training dynamics of diffusion models."
      },
      {
       "id": "s-references-39-3",
       "original": "In Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition, pages 24174–24184."
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
       "original": "Jaehyeon Kim, Sungwon Kim, Jungil Kong, and Sungroh Yoon. 2020."
      },
      {
       "id": "s-references-40-2",
       "original": "Glow-TTS: A generative flow for text-to-speech via monotonic alignment search."
      },
      {
       "id": "s-references-40-3",
       "original": "Advances in Neural Information Processing Systems, 33:8067–8077."
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
       "original": "Jaehyeon Kim, Jungil Kong, and Juhee Son. 2021."
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
       "original": "Conditional variational autoencoder with adversarial learning for end-to-end text-to-speech."
      },
      {
       "id": "s-references-42-2",
       "original": "In International Conference on Machine Learning, pages 5530–5540."
      },
      {
       "id": "s-references-42-3",
       "original": "PMLR."
      }
     ]
    },
    {
     "id": "p-references-43",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-43-1",
       "original": "Diederik Kingma and Ruiqi Gao. 2024."
      },
      {
       "id": "s-references-43-2",
       "original": "Understanding diffusion objectives as the ELBO with simple data augmentation."
      },
      {
       "id": "s-references-43-3",
       "original": "Advances in Neural Information Processing Systems, 36."
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
       "original": "Matthew Le, Apoorv Vyas, Bowen Shi, Brian Karrer, et al. 2024."
      },
      {
       "id": "s-references-44-2",
       "original": "Voicebox: Text-guided multilingual universal speech generation at scale."
      },
      {
       "id": "s-references-44-3",
       "original": "Advances in neural information processing systems, 36."
      }
     ]
    },
    {
     "id": "p-references-45",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-45-1",
       "original": "Keon Lee, Dong Won Kim, Jaehyeon Kim, and Jaewoong Cho. 2024."
      },
      {
       "id": "s-references-45-2",
       "original": "DiTTo-TTS: Efficient and scalable zero-shot text-to-speech with diffusion transformer. arXiv preprint arXiv:2406.11427."
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
       "original": "Sang-gil Lee, Wei Ping, Boris Ginsburg, Bryan Catanzaro, and Sungroh Yoon. 2022."
      },
      {
       "id": "s-references-46-2",
       "original": "Bigvgan: A universal neural vocoder with large-scale training. arXiv Naihan Li, Shujie Liu, Yanqing Liu, Sheng Zhao, and Ming Liu. 2019."
      },
      {
       "id": "s-references-46-3",
       "original": "Neural speech synthesis with transformer network."
      },
      {
       "id": "s-references-46-4",
       "original": "In Proceedings of the AAAI conference on artificial intelligence, volume 33, pages 6706–6713."
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
       "original": "Tianhong Li, Yonglong Tian, He Li, Mingyang Deng, and Kaiming He. 2024."
      },
      {
       "id": "s-references-47-2",
       "original": "Autoregressive image generation without vector quantization. arXiv preprint Yaron Lipman, Ricky TQ Chen, Heli Ben-Hamu, Maximilian Nickel, and Matt Le. 2022."
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
       "original": "Flow matching for generative modeling. arXiv preprint Zhijun Liu, Shuai Wang, Sho Inoue, Qibing Bai, and Haizhou Li. 2024a."
      },
      {
       "id": "s-references-48-2",
       "original": "Autoregressive diffusion transformer for text-to-speech synthesis. arXiv preprint Zhijun Liu, Shuai Wang, Pengcheng Zhu, Mengxiao Bi, and Haizhou Li. 2024b."
      },
      {
       "id": "s-references-48-3",
       "original": "E1 TTS: Simple and fast non-autoregressive TTS."
      }
     ]
    },
    {
     "id": "p-references-49",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-49-1",
       "original": "Zhuang Liu, Hanzi Mao, Chao-Yuan Wu, Christoph Feichtenhofer, Trevor Darrell, and Saining Xie. 2022."
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
       "original": "A convnet for the 2020s."
      }
     ]
    },
    {
     "id": "p-references-51",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-51-1",
       "original": "In Proceedings of the IEEE/CVF conference on computer vision and pattern recognition, pages 11976–11986."
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
       "original": "I Loshchilov. 2017."
      },
      {
       "id": "s-references-52-2",
       "original": "Decoupled weight decay regularization. arXiv preprint arXiv:1711.05101."
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
       "original": "Linhan Ma, Dake Guo, Kun Song, Yuepeng Jiang, Shuai Wang, Liumeng Xue, Weiming Xu, Huan Zhao, Binbin Zhang, and Lei Xie. 2024."
      },
      {
       "id": "s-references-53-2",
       "original": "WenetSpeech4TTS: A 12,800-hour Mandarin TTS corpus for large speech generation model benchmark. arXiv Shivam Mehta, Ruibo Tu, Jonas Beskow, Éva Székely, and Gustav Eje Henter. 2024."
      },
      {
       "id": "s-references-53-3",
       "original": "Matcha-TTS: A fast TTS architecture with conditional flow matching."
      },
      {
       "id": "s-references-53-4",
       "original": "In Proc."
      },
      {
       "id": "s-references-53-5",
       "original": "ICASSP, pages 11341–11345."
      },
      {
       "id": "s-references-53-6",
       "original": "IEEE."
      }
     ]
    },
    {
     "id": "p-references-54",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-54-1",
       "original": "Aleksandr Meister, Matvei Novikov, Nikolay Karpov, Evelina Bakhturina, Vitaly Lavrukhin, and Boris Ginsburg. 2023."
      },
      {
       "id": "s-references-54-2",
       "original": "LibriSpeech-PC: Benchmark for evaluation of punctuation and capitalization capabilities of end-to-end ASR models."
      },
      {
       "id": "s-references-54-3",
       "original": "In Proc."
      },
      {
       "id": "s-references-54-4",
       "original": "ASRU, pages 1–7."
      },
      {
       "id": "s-references-54-5",
       "original": "IEEE."
      }
     ]
    },
    {
     "id": "p-references-55",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-55-1",
       "original": "Lingwei Meng, Long Zhou, Shujie Liu, Sanyuan Chen, et al. 2024."
      },
      {
       "id": "s-references-55-2",
       "original": "Autoregressive speech synthesis without vector quantization."
      }
     ]
    },
    {
     "id": "p-references-56",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-56-1",
       "original": "Zhikang Niu, Sanyuan Chen, Long Zhou, Ziyang Ma, Xie Chen, and Shujie Liu. 2024."
      },
      {
       "id": "s-references-56-2",
       "original": "NDVQ: Robust neural audio codec with normal distribution-based vector quantization. arXiv preprint arXiv:2409.12717."
      }
     ]
    },
    {
     "id": "p-references-57",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-57-1",
       "original": "Takuma Okamoto, Yamato Ohtani, Tomoki Toda, and Hisashi Kawai. 2024."
      },
      {
       "id": "s-references-57-2",
       "original": "Convnext-TTS and ConvnextVC: Convnext-based fast end-to-end sequence-tosequence text-to-speech and voice conversion."
      },
      {
       "id": "s-references-57-3",
       "original": "In Proc."
      },
      {
       "id": "s-references-57-4",
       "original": "ICASSP, pages 12456–12460."
      },
      {
       "id": "s-references-57-5",
       "original": "IEEE."
      }
     ]
    },
    {
     "id": "p-references-58",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-58-1",
       "original": "William Peebles and Saining Xie. 2023."
      },
      {
       "id": "s-references-58-2",
       "original": "Scalable diffusion models with transformers."
      },
      {
       "id": "s-references-58-3",
       "original": "In Proceedings of the IEEE/CVF International Conference on Computer Vision, pages 4195–4205."
      }
     ]
    },
    {
     "id": "p-references-59",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-59-1",
       "original": "Puyuan Peng, Po-Yao Huang, Daniel Li, Abdelrahman Mohamed, and David Harwath. 2024."
      },
      {
       "id": "s-references-59-2",
       "original": "Voicecraft: Zero-shot speech editing and text-to-speech in the wild. arXiv preprint arXiv:2403.16973."
      }
     ]
    },
    {
     "id": "p-references-60",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-60-1",
       "original": "Vadim Popov, Ivan Vovk, Vladimir Gogoryan, Tasnima Sadekova, and Mikhail Kudinov. 2021."
      }
     ]
    },
    {
     "id": "p-references-61",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-61-1",
       "original": "Grad-tts: A diffusion probabilistic model for text-to-speech."
      },
      {
       "id": "s-references-61-2",
       "original": "In International Conference on Machine Learning, pages 8599–8608."
      },
      {
       "id": "s-references-61-3",
       "original": "PMLR."
      }
     ]
    },
    {
     "id": "p-references-62",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-62-1",
       "original": "Ofir Press, Noah A Smith, and Mike Lewis. 2021."
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
       "original": "Train short, test long: Attention with linear biases enables input length extrapolation. arXiv preprint Alec Radford, Jong Wook Kim, Tao Xu, Greg Brockman, Christine McLeavey, and Ilya Sutskever. 2023."
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
       "original": "Robust speech recognition via large-scale weak supervision."
      },
      {
       "id": "s-references-64-2",
       "original": "In International conference on machine learning, pages 28492–28518."
      },
      {
       "id": "s-references-64-3",
       "original": "PMLR."
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
       "original": "Yi Ren, Chenxu Hu, Xu Tan, Tao Qin, Sheng Zhao, Zhou Zhao, and Tie-Yan Liu. 2020."
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
       "original": "Fastspeech 2: Fast and high-quality end-to-end text to speech. arXiv preprint arXiv:2006.04558."
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
       "original": "Olaf Ronneberger, Philipp Fischer, and Thomas Brox."
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
       "original": "2015."
      },
      {
       "id": "s-references-68-2",
       "original": "U-net: Convolutional networks for biomedical image segmentation."
      },
      {
       "id": "s-references-68-3",
       "original": "In Proc."
      },
      {
       "id": "s-references-68-4",
       "original": "MICCAI, pages 234– 241."
      },
      {
       "id": "s-references-68-5",
       "original": "Springer."
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
       "original": "Takaaki Saeki, Detai Xin, Wataru Nakata, Tomoki Koriyama, Shinnosuke Takamichi, and Hiroshi Saruwatari. 2022."
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
       "original": "Utmos: Utokyo-sarulab system for voicemos challenge 2022. arXiv preprint Tim Salimans and Jonathan Ho. 2022."
      },
      {
       "id": "s-references-70-2",
       "original": "Progressive distillation for fast sampling of diffusion models. arXiv Jonathan Shen, Ruoming Pang, Ron J Weiss, Mike Schuster, et al. 2018."
      },
      {
       "id": "s-references-70-3",
       "original": "Natural TTS synthesis by conditioning wavenet on mel spectrogram predictions."
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
       "original": "In Proc."
      },
      {
       "id": "s-references-71-2",
       "original": "ICASSP, pages 4779–4783."
      },
      {
       "id": "s-references-71-3",
       "original": "IEEE."
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
       "original": "Kai Shen, Zeqian Ju, Xu Tan, Yanqing Liu, et al. 2023."
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
       "original": "Naturalspeech 2: Latent diffusion models are natural and zero-shot speech and singing synthesizers. arXiv Hubert Siuzdak. 2023."
      },
      {
       "id": "s-references-73-2",
       "original": "Vocos: Closing the gap between time-domain and fourier-based neural vocoders for high-quality audio synthesis."
      }
     ]
    },
    {
     "id": "p-references-74",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-74-1",
       "original": "Yakun Song, Zhuo Chen, Xiaofei Wang, Ziyang Ma, and Xie Chen. 2024."
      },
      {
       "id": "s-references-74-2",
       "original": "ELLA-V: Stable neural codec language modeling with alignment-guided sequence reordering. arXiv preprint arXiv:2401.07333."
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
       "original": "Yang Song, Jascha Sohl-Dickstein, Diederik P Kingma, Abhishek Kumar, Stefano Ermon, and Ben Poole."
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
       "original": "2020."
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
       "original": "Score-based generative modeling through stochastic differential equations."
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
       "original": "Jianlin Su, Murtadha Ahmed, Yu Lu, Shengfeng Pan, Wen Bo, and Yunfeng Liu. 2024."
      },
      {
       "id": "s-references-78-2",
       "original": "Roformer: Enhanced transformer with rotary position embedding."
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
       "original": "Neurocomputing, 568:127063."
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
       "original": "Xu Tan, Jiawei Chen, Haohe Liu, Jian Cong, et al. 2024."
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
       "original": "Naturalspeech: End-to-end text-to-speech synthesis with human-level quality."
      },
      {
       "id": "s-references-81-2",
       "original": "IEEE Transactions on Pattern Analysis and Machine Intelligence."
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
       "original": "Chengyi Wang, Sanyuan Chen, Yu Wu, Ziqiang Zhang, et al. 2023a."
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
       "original": "Neural codec language models are zero-shot text to speech synthesizers. arXiv preprint Tianrui Wang, Long Zhou, Ziqiang Zhang, Yu Wu, Shujie Liu, Yashesh Gaur, Zhuo Chen, Jinyu Li, and Furu Wei. 2023b."
      },
      {
       "id": "s-references-83-2",
       "original": "VioLA: Unified codec language models for speech recognition, synthesis, and translation."
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
       "original": "arXiv preprint arXiv:2305.16107."
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
       "original": "Yuancheng Wang, Haoyue Zhan, Liwei Liu, Ruihong Zeng, Haotian Guo, Jiachen Zheng, Qiang Zhang, Shunsi Zhang, and Zhizheng Wu. 2024."
      },
      {
       "id": "s-references-85-2",
       "original": "MaskGCT: Zero-shot text-to-speech with masked generative codec transformer. arXiv preprint arXiv:2409.00750."
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
       "original": "Sanghyun Woo, Shoubhik Debnath, Ronghang Hu, Xinlei Chen, Zhuang Liu, In So Kweon, and Saining Xie. 2023."
      },
      {
       "id": "s-references-86-2",
       "original": "Convnext v2: Co-designing and scaling convnets with masked autoencoders."
      },
      {
       "id": "s-references-86-3",
       "original": "In Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition, pages 16133–16142."
      }
     ]
    },
    {
     "id": "p-references-87",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-87-1",
       "original": "Yi-Chiao Wu, Israel D Gebru, Dejan Markovi´c, and Alexander Richard. 2023."
      }
     ]
    },
    {
     "id": "p-references-88",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-88-1",
       "original": "Audiodec: An opensource streaming high-fidelity neural audio codec."
      },
      {
       "id": "s-references-88-2",
       "original": "In Proc."
      },
      {
       "id": "s-references-88-3",
       "original": "ICASSP, pages 1–5."
      },
      {
       "id": "s-references-88-4",
       "original": "IEEE."
      }
     ]
    },
    {
     "id": "p-references-89",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-89-1",
       "original": "Detai Xin, Xu Tan, Kai Shen, Zeqian Ju, et al. 2024."
      }
     ]
    },
    {
     "id": "p-references-90",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-90-1",
       "original": "Rall-e: Robust codec language modeling with chainof-thought prompting for text-to-speech synthesis. arXiv preprint arXiv:2404.03204."
      }
     ]
    },
    {
     "id": "p-references-91",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-91-1",
       "original": "Dongchao Yang, Songxiang Liu, Rongjie Huang, Jinchuan Tian, Chao Weng, and Yuexian Zou."
      }
     ]
    },
    {
     "id": "p-references-92",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-92-1",
       "original": "2023."
      },
      {
       "id": "s-references-92-2",
       "original": "Hifi-codec: Group-residual vector quantization for high fidelity audio codec. arXiv preprint Neil Zeghidour, Alejandro Luebs, Ahmed Omran, Jan Skoglund, and Marco Tagliasacchi. 2021."
      }
     ]
    },
    {
     "id": "p-references-93",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-93-1",
       "original": "Soundstream: An end-to-end neural audio codec."
      },
      {
       "id": "s-references-93-2",
       "original": "IEEE/ACM Transactions on Audio, Speech, and Language Processing, 30:495–507."
      }
     ]
    },
    {
     "id": "p-references-94",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-94-1",
       "original": "Heiga Zen, Viet Dang, Rob Clark, Yu Zhang, Ron J Weiss, Ye Jia, Zhifeng Chen, and Yonghui Wu. 2019."
      }
     ]
    },
    {
     "id": "p-references-95",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-95-1",
       "original": "Libritts: A corpus derived from librispeech for textto-speech. arXiv preprint arXiv:1904.02882."
      }
     ]
    },
    {
     "id": "p-references-96",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-references-96-1",
       "original": "Xin Zhang, Dong Zhang, Shimin Li, Yaqian Zhou, and Xipeng Qiu. 2023a."
      },
      {
       "id": "s-references-96-2",
       "original": "Speechtokenizer: Unified speech tokenizer for speech large language models. arXiv Ziqiang Zhang, Long Zhou, Chengyi Wang, Sanyuan Chen, et al. 2023b."
      },
      {
       "id": "s-references-96-3",
       "original": "Speak foreign languages with your own voice: Cross-lingual neural codec language modeling. arXiv preprint arXiv:2303.03926."
      }
     ]
    }
   ]
  },
  {
   "id": "sec-A",
   "num": "A",
   "level": 1,
   "page": 13,
   "title": {
    "original": "Baseline Details",
    "zh": "附录 A：基线详情"
   },
   "blocks": [
    {
     "id": "p-A-1",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-A-1-1",
       "original": "VALL-E 2 (Chen et al., 2024) A large-scale TTS model shares the same architecture as VALL-E (Wang et al., 2023a) but employs a repetition-aware sampling strategy that promotes more deliberate sampling choices, trained on Libriheavy (Kang et al., 2024) 50K hours English dataset.",
       "zh": "VALL-E 2（Chen et al., 2024）：一个大规模 TTS 模型，与 VALL-E（Wang et al., 2023a）架构相同，但采用重复感知采样策略以促进更审慎的采样选择，在 Libriheavy（Kang et al., 2024）50K 小时英文数据集上训练。"
      }
     ]
    },
    {
     "id": "p-A-2",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-A-2-1",
       "original": "We compared with results reported in Meng et al. (2024).",
       "zh": "我们与 Meng et al. (2024) 报告的结果比较。"
      }
     ]
    },
    {
     "id": "p-A-3",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-A-3-1",
       "original": "MELLE (Meng et al., 2024) An autoregressive large-scale model leverages continuous-valued tokens with variational inference for text-to-speech synthesis.",
       "zh": "MELLE（Meng et al., 2024）：一个自回归大规模模型，利用连续值 token 与变分推断进行文本转语音合成。"
      }
     ]
    },
    {
     "id": "p-A-4",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-A-4-1",
       "original": "Its variants allow to prediction of multiple mel-spectrogram frames at each time step, noted by MELLE-Rx with x denotes reduction factor.",
       "zh": "其变体允许在每个时间步预测多个梅尔频谱图帧，记为 MELLE-Rx，x 为缩减因子。"
      },
      {
       "id": "s-A-4-2",
       "original": "The model is trained on Libriheavy (Kang et al., 2024) 50K hours English dataset.",
       "zh": "该模型在 Libriheavy（Kang et al., 2024）50K 小时英文数据集上训练。"
      }
     ]
    },
    {
     "id": "p-A-5",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-A-5-1",
       "original": "We compared with results reported in Meng et al. (2024).",
       "zh": "我们与 Meng et al. (2024) 报告的结果比较。"
      }
     ]
    },
    {
     "id": "p-A-6",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-A-6-1",
       "original": "Voicebox (Le et al., 2024) A non-autoregressive large-scale model based on flow matching trained with infilling task.",
       "zh": "Voicebox（Le et al., 2024）：一个基于流匹配、以填充任务训练的非自回归大规模模型。"
      },
      {
       "id": "s-A-6-2",
       "original": "We compared with the 330M parameters trained on 60K hours dataset Englishonly model’s results reported in Le et al. (2024) and Ju et al. (2024).",
       "zh": "我们与 Le et al. (2024) 和 Ju et al. (2024) 报告的 330M 参数、在 60K 小时纯英文数据集上训练的模型结果比较。"
      }
     ]
    },
    {
     "id": "p-A-7",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-A-7-1",
       "original": "NaturalSpeech 3 (Ju et al., 2024) A nonautoregressive large-scale TTS system leverages a factorized neural codec to decouple speech representations and a factorized diffusion model to generate speech based on disentangled attributes.",
       "zh": "NaturalSpeech 3（Ju et al., 2024）：一个非自回归大规模 TTS 系统，利用分解式神经 codec 解耦语音表示，并用分解式扩散模型按解耦的属性生成语音。"
      }
     ]
    },
    {
     "id": "p-A-8",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-A-8-1",
       "original": "The 500M base model is trained on Librilight (Kahn et al., 2020) a 60K hours English dataset.",
       "zh": "其 500M 基础模型在 Librilight（Kahn et al., 2020）60K 小时英文数据集上训练。"
      },
      {
       "id": "s-A-8-2",
       "original": "We compared with scores reported in Ju et al. (2024).",
       "zh": "我们与 Ju et al. (2024) 报告的分数比较。"
      }
     ]
    },
    {
     "id": "p-A-9",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-A-9-1",
       "original": "DiTTo-TTS (Lee et al., 2024) A large-scale nonautoregressive TTS model uses a cross-attention Diffusion Transformer and leverages a pretrained language model to enhance the alignment.",
       "zh": "DiTTo-TTS（Lee et al., 2024）：一个大规模非自回归 TTS 模型，使用交叉注意力 Diffusion Transformer，并借助预训练语言模型增强对齐。"
      },
      {
       "id": "s-A-9-2",
       "original": "We compare with DiTTo-en-XL, a 740M model trained on 55K hours English-only dataset, using scores reported in Lee et al. (2024).",
       "zh": "我们与 DiTTo-en-XL 比较——一个在 55K 小时纯英文数据集上训练的 740M 模型，分数取自 Lee et al. (2024) 的报告。"
      }
     ]
    },
    {
     "id": "p-A-10",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-A-10-1",
       "original": "FireRedTTS (Guo et al., 2024a) A foundation TTS framework for industry-level generative speech applications.",
       "zh": "FireRedTTS（Guo et al., 2024a）：面向工业级生成式语音应用的基础 TTS 框架。"
      },
      {
       "id": "s-A-10-2",
       "original": "The autoregressive text-tosemantic token model has 400M parameters and the token-to-waveform generation model has about half the parameters.",
       "zh": "其自回归文本到语义 token 模型有 400M 参数，token 到波形生成模型约为一半的参数量。"
      },
      {
       "id": "s-A-10-3",
       "original": "The system is trained with 248K hours of labeled speech data.",
       "zh": "该系统在 248K 小时标注语音数据上训练。"
      },
      {
       "id": "s-A-10-4",
       "original": "We use the official code and pre-trained checkpoint to evaluate5.",
       "zh": "我们使用官方代码与预训练权重进行评测（见脚注 5）。"
      }
     ]
    },
    {
     "id": "p-A-11",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-A-11-1",
       "original": "MaskGCT (Wang et al., 2024) A large-scale non-autoregressive TTS model without precise alignment information between text and speech following the mask-and-predict learning paradigm.",
       "zh": "MaskGCT（Wang et al., 2024）：一个大规模非自回归 TTS 模型，没有文本与语音之间的精确对齐信息，遵循掩码-预测学习范式。"
      },
      {
       "id": "s-A-11-2",
       "original": "The model is multi-stage, with a 695M text-to-semantic model (T2S) and then a 353M semantic-to-acoustic (S2A) model.",
       "zh": "模型为多阶段：先是 695M 的文本到语义模型（T2S），再是 353M 的语义到声学模型（S2A）。"
      },
      {
       "id": "s-A-11-3",
       "original": "The model is trained on Emilia (He et al., 2024) dataset with around 100K Chinese and English in-the-wild speech data.",
       "zh": "模型在 Emilia（He et al., 2024）数据集上训练，约为 100K 小时中英文野外语音数据。"
      },
      {
       "id": "s-A-11-4",
       "original": "We compare with results reported in Wang et al. (2024).",
       "zh": "我们与 Wang et al. (2024) 报告的结果比较。"
      }
     ]
    },
    {
     "id": "p-A-12",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-A-12-1",
       "original": "Seed-TTS (Anastassiou et al., 2024) A family of high-quality versatile speech generation models trained on unknown tremendously large data that is of orders of magnitudes larger than the previously largest TTS systems (Anastassiou et al., 2024).",
       "zh": "Seed-TTS（Anastassiou et al., 2024）：一族高质量、多用途的语音生成模型，在未公开的极大规模数据上训练，数据量比此前最大的 TTS 系统大若干数量级（Anastassiou et al., 2024）。"
      },
      {
       "id": "s-A-12-2",
       "original": "Seed-TTSDiT is a large-scale fully non-autoregressive model.",
       "zh": "Seed-TTS_DiT 是一个大规模的完全非自回归模型。"
      }
     ]
    },
    {
     "id": "p-A-13",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-A-13-1",
       "original": "We compare with results reported in Anastassiou et al. (2024).",
       "zh": "我们与 Anastassiou et al. (2024) 报告的结果比较。"
      }
     ]
    },
    {
     "id": "p-A-14",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-A-14-1",
       "original": "E2 TTS (Eskimez et al., 2024) A fully nonautoregressive TTS system proposes to model without the phoneme-level alignment in Voicebox, originally trained on Libriheavy (Kang et al., 2024) 50K English dataset.",
       "zh": "E2 TTS（Eskimez et al., 2024）：一个完全非自回归 TTS 系统，提出去掉 Voicebox 中的音素级对齐进行建模，最初在 Libriheavy（Kang et al., 2024）50K 小时英文数据集上训练。"
      },
      {
       "id": "s-A-14-2",
       "original": "We compare with our reproduced 333M multilingual E2 TTS trained on Emilia (He et al., 2024) dataset with around 100K Chinese and English in-the-wild speech data.",
       "zh": "我们与自己复现的 333M 多语言 E2 TTS 比较——它在 Emilia（He et al., 2024）数据集上训练，约为 100K 小时中英文野外语音数据。"
      }
     ]
    },
    {
     "id": "p-A-15",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-A-15-1",
       "original": "CosyVoice (Du et al., 2024b) A two-stage largescale TTS system, first autoregressive text-to-token, then a flow matching diffusion model.",
       "zh": "CosyVoice（Du et al., 2024b）：一个两阶段大规模 TTS 系统，先自回归文本到 token，再用流匹配扩散模型。"
      },
      {
       "id": "s-A-15-2",
       "original": "The model is of around 300M parameters, trained on 170K hours of multilingual speech data.",
       "zh": "模型约 300M 参数，在 170K 小时多语言语音数据上训练。"
      },
      {
       "id": "s-A-15-3",
       "original": "We obtain the evaluation result with the official code and pretrained checkpoint6.",
       "zh": "我们用官方代码与预训练权重得到评测结果（见脚注 6）。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-B",
   "num": "B",
   "level": 1,
   "page": 13,
   "title": {
    "original": "Experimental Result Supplements",
    "zh": "附录 B：实验结果补充"
   },
   "blocks": [
    {
     "id": "p-B-1",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-B-1-1",
       "original": "The UTMOS (Saeki et al., 2022) scores reported in this section are evaluated with an open-source MOS prediction model7.",
       "zh": "本节报告的 UTMOS（Saeki et al., 2022）分数由开源的 MOS 预测模型评测（见脚注 7）。"
      },
      {
       "id": "s-B-1-2",
       "original": "The UTMOS is an objective metric measuring naturalness.",
       "zh": "UTMOS 是一个衡量自然度的客观指标。"
      }
     ]
    },
    {
     "id": "p-B-2",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-B-2-1",
       "original": "Small Model Configuration The detailed configuration of small models is shown in Tab.3.",
       "zh": "小模型配置：小模型的详细配置见 Tab.3。"
      },
      {
       "id": "s-B-2-2",
       "original": "In the Transformer column, the 5https://github.com/FireRedTeam/FireRedTTS 6https://huggingface.co/model-scope/ CosyVoice-300M 7https://github.com/tarepan/SpeechMOS numbers denote the Model Dimension, the Number of Layers, the Number of Heads, and the multiples of Hidden Size.",
       "zh": "Transformer 列中的数字依次表示模型维度、层数、头数和隐层倍数。（脚注 5：https://github.com/FireRedTeam/FireRedTTS；脚注 6：https://huggingface.co/modelscope/CosyVoice-300M；脚注 7：https://github.com/tarepan/SpeechMOS）"
      },
      {
       "id": "s-B-2-3",
       "original": "In the ConvNeXt column, the numbers denote the Model Dimension, the Number of Layers, and the multiples of Hidden Size.",
       "zh": "ConvNeXt 列中的数字依次表示模型维度、层数和隐层倍数。"
      },
      {
       "id": "s-B-2-4",
       "original": "GFLOPs are evaluated using the thop Python package.",
       "zh": "GFLOPs 使用 thop Python 包评测。"
      }
     ]
    },
    {
     "id": "p-B-3",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-B-3-1",
       "original": "As mentioned in Sec.3.2, F5-TTS leverages an adaLN DiT backbone with ConvNeXt V2 blocks, while E2 TTS is a flat U-Net equipped Transformer.",
       "zh": "如 Sec.3.2 所述，F5-TTS 采用 adaLN DiT 骨干加 ConvNeXt V2 模块，而 E2 TTS 是配备 U-Net 的扁平 Transformer。"
      },
      {
       "id": "s-B-3-2",
       "original": "F5-TTS+LongSkip adds an additional long skip structure connecting the first to the last layer (Lee et al., 2024) in the Transformer.",
       "zh": "F5-TTS+LongSkip 增加了一条连接 Transformer 首层与末层的长跳跃结构（Lee et al., 2024）。"
      },
      {
       "id": "s-B-3-3",
       "original": "For the MultiModel Diffusion Transformer (MMDiT) (Esser et al., 2024), a double stream transformer, the setting denotes one stream configuration.",
       "zh": "对于双流的多模态扩散 Transformer（MMDiT）（Esser et al., 2024），表中的设置表示单条流的配置。"
      }
     ]
    },
    {
     "id": "p-B-4",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-B-4-1",
       "original": "Transformer ConvNeXt #Param.",
       "zh": "（此处为 Tab.3 数值残块：Transformer 与 ConvNeXt 两列配置及参数量，与原文一致。）"
      },
      {
       "id": "s-B-4-2",
       "original": "GFLOPs 173 F5-TTS−Conv2Text 164 F5-TTS+Conv2Audio 768,16,12,2 181 F5-TTS+LongSkip 175 E2 TTS 293 E2 TTS+Conv2Text 301 MMDiT 104",
       "zh": "（Tab.3 数值续块：各变体 GFLOPs——F5-TTS−Conv2Text 为 164，F5-TTS+Conv2Audio（768,16,12,2）为 181，F5-TTS+LongSkip 为 175，E2 TTS 为 293，E2 TTS+Conv2Text 为 301，MMDiT 为 104，F5-TTS 为 173。）"
      }
     ]
    },
    {
     "id": "tab-B-1",
     "type": "table_caption",
     "page": 14,
     "original": "Table 3: Details of small model configurations.",
     "zh": "表 3：小模型配置详情。"
    },
    {
     "id": "p-B-5",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-B-5-1",
       "original": "Ablation study on Input Condition The ablation study on different input conditions is conducted with three settings:",
       "zh": "输入条件消融：对不同输入条件的消融研究在三种设置下进行："
      }
     ]
    },
    {
     "id": "p-B-6",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-B-6-1",
       "original": "• Common input with text and audio prompts.",
       "zh": "• 常规输入：同时使用文本与音频提示。"
      }
     ]
    },
    {
     "id": "p-B-7",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-B-7-1",
       "original": "• Providing ground truth duration information rather than an estimate.",
       "zh": "• 提供真实（ground truth）时长信息而非估计值。"
      }
     ]
    },
    {
     "id": "p-B-8",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-B-8-1",
       "original": "• Retaining only text input, dropping audio prompt (using blank).",
       "zh": "• 只保留文本输入，丢弃音频提示（使用空白）。"
      }
     ]
    },
    {
     "id": "p-B-9",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-B-9-1",
       "original": "In Tab.4, all evaluations take the 155M small models’ checkpoints trained on WenetSpeech4TTS Premium at 800K updates.",
       "zh": "Tab.4 中的所有评测均取在 WenetSpeech4TTS Premium 上训练至 800K 步更新的 155M 小模型检查点。"
      },
      {
       "id": "s-B-9-2",
       "original": "Analysis see Sec.5.1.",
       "zh": "分析见 Sec.5.1。"
      }
     ]
    },
    {
     "id": "p-B-10",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-B-10-1",
       "original": "Common Input GT Duration Text-Only WER↓SIM↑WER↓SIM↑WER↓SIM↑ 4.17 0.54 3.87 0.54 3.22 0.21 F5-TTS+Conv2Audio 5.78 0.55 5.28 0.55 3.78 0.21 F5-TTS+LongSkip 5.17 0.53 5.03 0.53 3.35 0.21 E2 TTS 9.63 0.53 9.48 0.53 3.48 0.21 E2 TTS+Conv2Text 18.10 0.49 17.94 0.49 3.06 0.21",
       "zh": "（Tab.4 数值残块，数字与原文一致：常规输入 / 真实时长 / 仅文本三种条件下的 WER↓ 与 SIM↑。F5-TTS 为 4.17/0.54、3.87/0.54、3.22/0.21；F5-TTS+Conv2Audio 为 5.78/0.55、5.28/0.55、3.78/0.21；F5-TTS+LongSkip 为 5.17/0.53、5.03/0.53、3.35/0.21；E2 TTS 为 9.63/0.53、9.48/0.53、3.48/0.21；E2 TTS+Conv2Text 为 18.10/0.49、17.94/0.49、3.06/0.21。）"
      }
     ]
    },
    {
     "id": "tab-B-2",
     "type": "table_caption",
     "page": 14,
     "original": "Table 4: Ablation study on different input conditions. The boldface indicates the best result, and the underline denotes the second best. All scores are the average of three random seed results.",
     "zh": "表 4：不同输入条件的消融研究。加粗为最佳结果，下划线为次佳。所有分数均为 3 个随机种子结果的平均值。"
    },
    {
     "id": "p-B-11",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-B-11-1",
       "original": "Sway Sampling Effectiveness on Base Models From Tab.5, it is clear that our Sway Sampling strategy for test-time flow steps consistently improves the zero-shot generation performance in aspects of faithfulness to prompt text (WER), speaker similarity (SIM), and naturalness (UTMOS).",
       "zh": "Sway Sampling 在基础模型上的有效性：从 Tab.5 可以清楚看到，我们针对测试期流步骤的 Sway Sampling 策略，在忠实于提示文本（WER）、说话人相似度（SIM）和自然度（UTMOS）各方面持续提升零样本生成性能。"
      },
      {
       "id": "s-B-11-2",
       "original": "The gain of applying Sway Sampling to E2 TTS (Eskimez et al., 2024) proves that our Sway Sampling strategy is universally applicable to existing flow matching based TTS models.",
       "zh": "把 Sway Sampling 应用于 E2 TTS（Eskimez et al., 2024）同样有效，证明该策略可通用于已有的基于流匹配的 TTS 模型。"
      }
     ]
    },
    {
     "id": "p-B-12",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-B-12-1",
       "original": "RTF↓ 2.23 0.69 4.09 2.32 0.66 3.64 2.86 0.71 3.66 0.34 2.84 0.72 3.70 0.68 E2 TTS (32 NFE w/o SS) 2.95 0.69 3.56 0.68 2.43 0.66 3.87 0.26 2.41 0.66 3.89 0.53 F5-TTS (32 NFE w/o SS) 2.84 0.62 3.70 0.53 2.06 0.73 3.53 2.09 0.70 3.33 1.99 0.72 3.55 0.34 1.98 0.73 3.57 0.68 E2 TTS (32 NFE w/o SS) 2.19 0.71 3.33 0.68 1.88 0.66 3.70 0.26 1.87 0.66 3.72 0.53 F5-TTS (32 NFE w/o SS) 1.93 0.63 3.51 0.53 1.26 0.76 2.78 1.27 0.72 2.61 1.80 0.78 2.84 0.34 1.77 0.78 2.87 0.68 E2 TTS (32 NFE w/o SS) 1.97 0.73 2.49 0.68 1.61 0.75 2.87 0.26 1.58 0.75 2.91 0.53 F5-TTS (32 NFE w/o SS) 1.93 0.69 2.58 0.53",
       "zh": "（Tab.5 数值残块，数字与原文一致。32 NFE：Ground Truth 为 2.23 / 0.69 / 4.09（含 RTF 4.09 行）；E2 TTS（32 NFE w/o SS）为 2.32 / 0.66 / 3.64、2.86 / 0.71 / 3.66 / 0.34、2.84 / 0.72 / 3.70 / 0.68；E2 TTS（32 NFE w/ SS）为 2.95 / 0.69 / 3.56 / 0.68、2.43 / 0.66 / 3.87 / 0.26、2.41 / 0.66 / 3.89 / 0.53；F5-TTS（32 NFE w/o SS）为 2.84 / 0.62 / 3.70 / 0.53、2.06 / 0.73 / 3.53、2.09 / 0.70 / 3.33、1.99 / 0.72 / 3.55 / 0.34、1.98 / 0.73 / 3.57 / 0.68；E2 TTS 又一组（32 NFE w/o SS）为 2.19 / 0.71 / 3.33 / 0.68、1.88 / 0.66 / 3.70 / 0.26、1.87 / 0.66 / 3.72 / 0.53；F5-TTS（32 NFE w/ SS）为 1.93 / 0.63 / 3.51 / 0.53、1.26 / 0.76 / 2.78、1.27 / 0.72 / 2.61、1.80 / 0.78 / 2.84 / 0.34、1.77 / 0.78 / 2.87 / 0.68；E2 TTS（32 NFE w/ SS）为 1.97 / 0.73 / 2.49 / 0.68、1.61 / 0.75 / 2.87 / 0.26、1.58 / 0.75 / 2.91 / 0.53；F5-TTS（32 NFE w/ SS）为 1.93 / 0.69 / 2.58 / 0.53。三组各含 RTF 列，默认使用中点法；Tab.6 中 Euler、Heun-3 另有对比，两表覆盖 ODE 求解器与 2 个 Sway 系数取值。）"
      }
     ]
    },
    {
     "id": "tab-B-3",
     "type": "table_caption",
     "page": 14,
     "original": "Table 5: Base model evaluation results on LibriSpeechPC test-clean, Seed-TTS test-en and test-zh, with and without proposed test-time Sway Sampling (SS, with coefficient s = −1) strategy for flow steps. All generations leverage the midpoint ODE solver for ease of ablation.",
     "zh": "表 5：基础模型在 LibriSpeech-PC test-clean、Seed-TTS test-en 与 test-zh 上，使用与不使用测试期 Sway Sampling（SS，系数 s = −1）的评测结果。为便于消融，所有生成均使用中点 ODE 求解器。"
    },
    {
     "id": "p-B-13",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-B-13-1",
       "original": "Comparison of ODE Solvers The comparison results of using the Euler (firstorder), midpoint (second-order), or improved Heun (third-order, Heun-3) ODE solver during F5-TTS inference are shown in Tab.6.",
       "zh": "ODE 求解器对比：F5-TTS 推理中使用 Euler（一阶）、中点法（二阶）或改进 Heun（三阶，Heun-3）ODE 求解器的对比结果见 Tab.6。"
      },
      {
       "id": "s-B-13-2",
       "original": "The Euler is inherently faster and performs slightly better typically for larger NFE inference with Sway Sampling (otherwise the Euler solver results in degradation).",
       "zh": "Euler 天然更快；通常在配合 Sway Sampling 的大 NFE 推理中表现略好（否则 Euler 求解器会导致性能退化）。"
      }
     ]
    },
    {
     "id": "p-B-14",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-B-14-1",
       "original": "RTF↓ 2.23 0.69 4.09 2.06 0.73 3.53 1.26 0.76 2.78 s = −1 2.53 0.66 3.88 1.89 0.67 3.76 1.74 0.75 2.96 0.15 2.43 0.66 3.87 1.88 0.66 3.70 1.61 0.75 2.87 0.26 2.42 0.66 3.90 1.83 0.67 3.76 1.56 0.76 2.95 0.31 2.41 0.66 3.89 1.87 0.66 3.72 1.58 0.75 2.91 0.53 16 NFE Heun-3 2.39 0.65 3.87 1.80 0.66 3.70 1.55 0.75 2.88 0.44 s = −0.8 2.82 0.65 3.73 2.14 0.65 3.70 2.28 0.72 2.74 0.15 2.58 0.65 3.86 1.86 0.65 3.68 1.70 0.73 2.83 0.26 2.50 0.66 3.89 1.81 0.67 3.74 1.62 0.75 2.94 0.31 2.42 0.66 3.89 1.84 0.66 3.70 1.62 0.75 2.91 0.53 16 NFE Heun-3 2.40 0.65 3.85 1.78 0.66 3.68 1.56 0.74 2.84 0.44",
       "zh": "（Tab.6 数值残块，数字与原文一致：RTF↓ 2.23 0.69 4.09、2.06 0.73 3.53、1.26 0.76 2.78；s = −1 组 2.53 0.66 3.88、1.89 0.67 3.76、1.74 0.75 2.96，RTF 0.15；2.43 0.66 3.87、1.88 0.66 3.70、1.61 0.75 2.87，RTF 0.26；2.42 0.66 3.90、1.83 0.67 3.76、1.56 0.76 2.95，RTF 0.31；2.41 0.66 3.89、1.87 0.66 3.72、1.58 0.75 2.91，RTF 0.53；16 NFE Heun-3 组 2.39 0.65 3.87、1.80 0.66 3.70、1.55 0.75 2.88，RTF 0.44；s = −0.8 组 2.82 0.65 3.73、2.14 0.65 3.70、2.28 0.72 2.74，RTF 0.15；2.58 0.65 3.86、1.86 0.65 3.68、1.70 0.73 2.83，RTF 0.26；2.50 0.66 3.89、1.81 0.67 3.74、1.62 0.75 2.94，RTF 0.31；2.42 0.66 3.89、1.84 0.66 3.70、1.62 0.75 2.91，RTF 0.53；16 NFE Heun-3 组 2.40 0.65 3.85、1.78 0.66 3.68、1.56 0.74 2.84，RTF 0.44。）"
      }
     ]
    },
    {
     "id": "tab-B-4",
     "type": "table_caption",
     "page": 15,
     "original": "Table 6: Evaluation results of F5-TTS on LibriSpeech-PC test-clean, Seed-TTS test-en and Seed-TTS test-zh, employing the Euler, midpoint or Heun-3 ODE solver, and with different Sway Sampling s values.",
     "zh": "表 6：F5-TTS 在 LibriSpeech-PC test-clean、Seed-TTS test-en 与 Seed-TTS test-zh 上，使用 Euler、中点法或 Heun-3 ODE 求解器及不同 Sway Sampling s 值的评测结果。"
    },
    {
     "id": "p-B-15",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-B-15-1",
       "original": "ELLA-V Hard Sentences Evaluation ELLA-V (Song et al., 2024) proposed a challenging set containing 100 difficult textual patterns evaluating the robustness of the TTS model.",
       "zh": "ELLA-V 困难句评测：ELLA-V（Song et al., 2024）提出了一组包含 100 种困难文本模式的挑战性测试集，用于评测 TTS 模型的鲁棒性。"
      },
      {
       "id": "s-B-15-2",
       "original": "Following previous works (Chen et al., 2024; Meng et al., 2024; Eskimez et al., 2024), we include generated samples in our demo page8.",
       "zh": "沿用以往工作（Chen et al., 2024; Meng et al., 2024; Eskimez et al., 2024），我们把生成样本放在演示页面（见脚注 8）。"
      },
      {
       "id": "s-B-15-3",
       "original": "We additionally compare our model with the objective evaluation results reported in E1 TTS (Liu et al., 2024b).",
       "zh": "我们另外与 E1 TTS（Liu et al., 2024b）报告的客观评测结果比较。"
      }
     ]
    },
    {
     "id": "p-B-16",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-B-16-1",
       "original": "StyleTTS 2 is a TTS model leveraging style diffusion and adversarial training with large speech language models.",
       "zh": "StyleTTS 2 是一个利用风格扩散并与大型语音语言模型进行对抗训练的 TTS 模型。"
      },
      {
       "id": "s-B-16-2",
       "original": "CosyVoice is a two-stage largescale TTS system, consisting of a text-to-token AR model and a token-to-speech flow matching model.",
       "zh": "CosyVoice 是一个两阶段大规模 TTS 系统，由文本到 token 的 AR 模型和 token 到语音的流匹配模型组成。"
      },
      {
       "id": "s-B-16-3",
       "original": "Concurrent with our work, E1 TTSDMD is a diffusion-based NAR model with a distribution matching distillation technique to achieve one-step TTS generation.",
       "zh": "与我们同期的工作 E1 TTS_DMD 是一个基于扩散的 NAR 模型，用分布匹配蒸馏技术实现一步 TTS 生成。"
      },
      {
       "id": "s-B-16-4",
       "original": "Since the prompts used by E1 TTSDMD are not released, we randomly sample 3-second-long speeches in our LibriSpeech-PC testclean set as audio prompts.",
       "zh": "由于 E1 TTS_DMD 所用的提示未公开，我们从 LibriSpeech-PC test-clean 集中随机抽取 3 秒语音作为音频提示。"
      },
      {
       "id": "s-B-16-5",
       "original": "The evaluation result is in Tab.7.",
       "zh": "评测结果见 Tab.7。"
      },
      {
       "id": "s-B-16-6",
       "original": "We evaluate the reproduced E2 TTS and our F5-TTS with 32 NFE and Sway Sampling and report the averaged score of three random seed results.",
       "zh": "我们以 32 NFE 加 Sway Sampling 评测复现的 E2 TTS 与我们的 F5-TTS，报告 3 个随机种子的平均分。"
      }
     ]
    },
    {
     "id": "p-B-17",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-B-17-1",
       "original": "We note that a higher WER compared to the results on commonly used test sets is partially due to mispronunciation (yogis to yojus, cavorts to caverts, etc.).",
       "zh": "我们注意到，相比常用测试集上的结果，此处更高的 WER 部分源于误发音（如 yogis 读成 yojus、cavorts 读成 caverts 等）。"
      },
      {
       "id": "s-B-17-2",
       "original": "The high Deletion rate indicates a word-skipping phenomenon when our model encounters a stack of repeating words.",
       "zh": "较高的删除率（Deletion）表明模型在遇到一连串重复词时存在跳词现象。"
      },
      {
       "id": "s-B-17-3",
       "original": "The low Insertion rate makes it clear that our model is free of endless repetition.",
       "zh": "较低的插入率（Insertion）则说明我们的模型不会出现无休止重复。"
      },
      {
       "id": "s-B-17-4",
       "original": "We further emphasize that prompts from different speakers will spell very distinct utter8https://SWivid.github.io/F5-TTS/ Sub.(%)↓ Del.(%)↓ Ins.(%)↓ StyleTTS 2 E1 TTSDMD E2 TTS 8.58 3.70 4.82 0.06 4.40 1.81 2.40 0.18",
       "zh": "我们进一步强调，不同说话人的提示会产生差异很大的话语……（脚注 8：https://SWivid.github.io/F5-TTS/；Tab.7 数值：Sub.(%)↓ Del.(%)↓ Ins.(%)↓，StyleTTS 2 为 8.58 / 3.70 / 4.82，E1 TTS_DMD 为 0.06 / 4.40 / 1.81，E2 TTS 为 2.40 / 0.18 等，数字与原文一致。）"
      }
     ]
    },
    {
     "id": "tab-B-5",
     "type": "table_caption",
     "page": 15,
     "original": "Table 7: Results of zero-shot TTS WER on ELLA-V hard sentences. The asterisk * denotes the score reported in E1 TTS. Sub. for Substitution, Del. for Deletion, and Ins. for Insertion.",
     "zh": "表 7：ELLA-V 困难句上的零样本 TTS WER 结果。星号 * 表示 E1 TTS 报告的分数。Sub. 为替换错误，Del. 为删除错误，Ins. 为插入错误。"
    },
    {
     "id": "p-B-18",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-B-18-1",
       "original": "ances, where the ASR model transcribes correctly for one, and fails for another (e.g. quokkas to Cocos).",
       "zh": "ASR 模型可能转写对其中一个、却转写错另一个（如 quokkas 转写为 Cocos）。"
      }
     ]
    },
    {
     "id": "p-B-19",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-B-19-1",
       "original": "Comparison of Vocoders and between PC and non-PC The inference results with pretrained BigVGAN (Lee et al., 2022) and Vocos (Siuzdak, 2023) respectively as vocoder are shown in Tab.8, along with additional evaluation on a non-Capitalized version removing all Punctuations (non-PC) of the filtered LibriSpeech-PC test-clean subset.",
       "zh": "声码器对比与 PC/non-PC 对比：分别以预训练 BigVGAN（Lee et al., 2022）和 Vocos（Siuzdak, 2023）为声码器的推理结果见 Tab.8，另附在过滤版 LibriSpeech-PC test-clean 子集去除全部标点与大小写（non-PC）版本上的附加评测。"
      },
      {
       "id": "s-B-19-2",
       "original": "The non-PC version equals an ordinary LibriSpeech test-clean subset, with which we provide more comprehensive comparisons with previous works.",
       "zh": "non-PC 版本等价于普通的 LibriSpeech test-clean 子集，借此我们与以往工作进行更全面的比较。"
      }
     ]
    },
    {
     "id": "p-B-20",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-B-20-1",
       "original": "Moreover, we include WER scores measuring with a Hubert-large-based (Hsu et al., 2021) ASR model9 in Tab.8, with which our reproduced multilingual E2 TTS with 32 NFE and Vocos as vocoder achieves a WER of 2.92 on LibriSpeech-PC testclean and 2.66 if Sway Sampling applied.",
       "zh": "此外，Tab.8 还收录了用基于 Hubert-large（Hsu et al., 2021）的 ASR 模型（见脚注 9）测得的 WER：我们复现的多语言 E2 TTS（32 NFE、Vocos 声码器）在 LibriSpeech-PC test-clean 上 WER 为 2.92，应用 Sway Sampling 后为 2.66。"
      }
     ]
    },
    {
     "id": "p-B-21",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-B-21-1",
       "original": "9https://huggingface.co/facebook/ hubert-large-ls960-ft NFE steps LibriSpeech-non-PC test-clean & Vocoder 0.69 0.69 2.06 0.73 1.26 0.76 16 NFE - Vocos 0.66 0.66 1.89 0.67 1.74 0.75 16 NFE - BigVGAN 0.67 0.67 1.65 0.66 1.64 0.74 32 NFE - Vocos 0.66 0.66 1.83 0.67 1.56 0.76 32 NFE - BigVGAN 0.67 0.67 1.62 0.66 1.53 0.74",
       "zh": "（脚注 9：https://huggingface.co/facebook/hubert-large-ls960-ft；Tab.8 数值残块，数字与原文一致：NFE steps LibriSpeech-non-PC test-clean & Vocoder 0.69 0.69 2.06 0.73 1.26 0.76；16 NFE - Vocos 0.66 0.66 1.89 0.67 1.74 0.75；16 NFE - BigVGAN 0.67 0.67 1.65 0.66 1.64 0.74；32 NFE - Vocos 0.66 0.66 1.83 0.67 1.56 0.76；32 NFE - BigVGAN 0.67 0.67 1.62 0.66 1.53 0.74。）"
      }
     ]
    },
    {
     "id": "tab-B-6",
     "type": "table_caption",
     "page": 16,
     "original": "Table 8: F5-TTS Base model evaluation results on LibriSpeech-PC test-clean, LibriSpeech-non-PC test-clean, Seed-TTS test-en and test-zh with BigVGAN and Vocos, default setting as in Sec.5. The WER scores in brackets indicate results leveraging the Hubert-large-based ASR model.",
     "zh": "表 8：F5-TTS 基础模型在 LibriSpeech-PC test-clean、LibriSpeech-non-PC test-clean、Seed-TTS test-en 与 test-zh 上分别使用 BigVGAN 与 Vocos 的评测结果，默认设置同 Sec.5。括号内 WER 为使用 Hubert-large ASR 模型的结果。"
    },
    {
     "id": "p-B-22",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-B-22-1",
       "original": "Train Set LibriTTS - 585 hours LJSpeech - 24 hours Test Set LJSpeech in-set tests Model (#Param.)",
       "zh": "（Tab.9 表头残块：训练集 LibriTTS 585 小时、LJSpeech 24 小时；测试集 LJSpeech 集内测试；模型（参数量）。）"
      }
     ]
    },
    {
     "id": "p-B-23",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-B-23-1",
       "original": "Update UTMOS ↑ UTMOS ↑ 2.23 0.69 4.09 2.36 0.72 4.36 USLM (361M) 6.1 0.43 29.5 0.53 3.78 5.64 0.72 4.17 4.58 0.59 4.07 2.93 0.72 4.18 F5-TTS small 2.71 0.60 4.11 3.26 0.71 4.12 (158M) 2.44 0.60 4.11 3.90 0.70 4.05 2.20 0.60 4.10 4.68 0.70 3.99 2.23 0.59 4.10 5.25 0.69 3.93",
       "zh": "（Tab.9 数值残块，数字与原文一致：Update UTMOS↑ 与 UTMOS↑ 2.23 0.69 4.09、2.36 0.72 4.36；USLM（361M）为 6.1 / 0.43，29.5 / 0.53 / 3.78，5.64 / 0.72 / 4.17，4.58 / 0.59 / 4.07，2.93 / 0.72 / 4.18；F5-TTS small（158M）为 2.71 / 0.60 / 4.11、3.26 / 0.71 / 4.12，2.44 / 0.60 / 4.11、3.90 / 0.70 / 4.05，2.20 / 0.60 / 4.10、4.68 / 0.70 / 3.99，2.23 / 0.59 / 4.10、5.25 / 0.69 / 3.93。）"
      }
     ]
    },
    {
     "id": "tab-B-7",
     "type": "table_caption",
     "page": 16,
     "original": "Table 9: F5-TTS small models evaluation results on LibriSpeech-PC test-clean (model trained on LibriTTS 585 hours multi-speaker dataset), and on LJSpeech in-set test samples (model trained on 24 hours single-speaker LJSpeech); Vocos as vocoder, Whisper-large-v3 as ASR model. The scores of USLM (Zhang et al., 2023a) are evaluated with the official checkpoint pre-trained on LibriTTS.",
     "zh": "表 9：F5-TTS 小模型评测结果：在 LibriSpeech-PC test-clean 上（模型于 LibriTTS 585 小时多说话人数据集训练），以及在 LJSpeech 集内测试样本上（模型于 24 小时单说话人 LJSpeech 训练）；声码器为 Vocos，ASR 模型为 Whisper-large-v3。USLM（Zhang et al., 2023a）的分数由其在 LibriTTS 上预训练的官方权重评测得到。"
    },
    {
     "id": "p-B-24",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-B-24-1",
       "original": "Training and Inference Performance with Different Dataset Scales We train F5-TTS 158M small models on LibriTTS (Zen et al., 2019) 585 hours and LJSpeech (Ito and Johnson, 2017) 24 hours English datasets to provide insights on our model’s training stability with different dataset scales, typically to see whether it can maintain stable training on limited data.",
       "zh": "不同数据规模下的训练与推理表现：我们在 LibriTTS（Zen et al., 2019）585 小时与 LJSpeech（Ito and Johnson, 2017）24 小时英文数据集上训练 F5-TTS 158M 小模型，考察模型在不同数据规模下的训练稳定性——尤其能否在有限数据上保持稳定训练。"
      },
      {
       "id": "s-B-24-2",
       "original": "Both training takes place with the same configuration as described in Sec.5.1 and Appendix B.1 despite a batch size of 307,200 audio frames (0.91 hours) as base models.",
       "zh": "两处训练除批大小沿用基础模型的 307,200 音频帧（0.91 小时）外，均采用 Sec.5.1 与附录 B.1 所述的相同配置。"
      },
      {
       "id": "s-B-24-3",
       "original": "Every 100K update takes approximately 8 hours on 8 NVIDIA H100 SXM GPUs.",
       "zh": "每 100K 步更新在 8 张 NVIDIA H100 SXM GPU 上约需 8 小时。"
      }
     ]
    },
    {
     "id": "p-B-25",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-B-25-1",
       "original": "Same as Sec.5, we report the average score of three random seed generation results, using a CFG strength of 2, a Sway Sampling coefficient of −1, and 32 NFE steps.",
       "zh": "与 Sec.5 相同，我们报告 3 个随机种子生成结果的平均分，使用 CFG 强度 2、Sway Sampling 系数 −1 与 32 NFE 步。"
      },
      {
       "id": "s-B-25-2",
       "original": "Since LJSpeech is a singlespeaker dataset, we measure the metrics on in-set tests (1000 samples organized with 4 to 7 seconds to infer with an around 3-second prompt).",
       "zh": "由于 LJSpeech 是单说话人数据集，我们在集内测试上测量指标（1000 条样本，组织为 4 到 7 秒待生成语音配约 3 秒提示）。"
      },
      {
       "id": "s-B-25-3",
       "original": "It is clear from Tab.9 (and Fig.2 in comparison with E2 TTS small) that our design enables stable training to learn speech-text alignment (without graphemeto-phoneme) with varying data amounts.",
       "zh": "从 Tab.9（以及与 E2 TTS small 对比的 Fig.2）可以清楚看到，我们的设计使模型在不同数据量下都能稳定训练、学会语音-文本对齐（无需字位-音素转换）。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-C",
   "num": "C",
   "level": 1,
   "page": 16,
   "title": {
    "original": "Subjective Evaluation Details",
    "zh": "附录 C：主观评测细节"
   },
   "blocks": [
    {
     "id": "p-C-1",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-C-1-1",
       "original": "To evaluate speech quality, we conduct a CMOS subjective evaluation. 20 natives were invited for both English and Mandarin to evaluate 30 rounds with randomly selected utterances for all three test sets and all model variants.",
       "zh": "为评测语音质量，我们开展了 CMOS 主观评测：英文和普通话各邀请 20 位母语者，对来自全部 3 个测试集、全部模型变体的随机抽取语句评测 30 轮。"
      },
      {
       "id": "s-C-1-2",
       "original": "Evaluators were informed in detail about the guidelines and scoring criteria for the CMOS test, for example, the general instruction part:",
       "zh": "评测者被详细告知 CMOS 测试的指南与评分标准，例如总体指引部分："
      }
     ]
    },
    {
     "id": "p-C-2",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-C-2-1",
       "original": "• Most important: use high-quality studio headphones and a good sound card!",
       "zh": "• 最重要：使用高品质录音室耳机和好的声卡！"
      }
     ]
    },
    {
     "id": "p-C-3",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-C-3-1",
       "original": "• Listen through all test files and test sets before you do any ratings to get used to the material.",
       "zh": "• 在打分前先把所有测试文件和测试集听一遍，以适应材料。"
      }
     ]
    },
    {
     "id": "p-C-4",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-C-4-1",
       "original": "• Rate the quality of the test items only compared to the reference on top.",
       "zh": "• 只相对于顶部的参考音频评价测试项的质量。"
      }
     ]
    },
    {
     "id": "p-C-5",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-C-5-1",
       "original": "• Try to rate the overall impression of a test item and don’t concentrate on single aspects.",
       "zh": "• 尽量评价测试项的整体印象，不要只纠结于单一方面。"
      }
     ]
    },
    {
     "id": "p-C-6",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-C-6-1",
       "original": "For the CMOS test, the overall quality of a generated speech is first rated from −3 (bad quality compared to the reference) to +3 (much better than the reference) integer scale, then reported in average differentials with received scores of ground truth speech.",
       "zh": "CMOS 测试中，生成语音的整体质量先按 −3（比参考差）到 +3（比参考好得多）的整数尺度打分，再与真实语音（ground truth）所得分数求平均差值报告。"
      },
      {
       "id": "s-C-6-2",
       "original": "For SMOS, a 1 to 5 with 0.5 as an interval rating is employed (higher better).",
       "zh": "SMOS 采用 1 到 5 分、间隔 0.5 的评分（越高越好）。"
      },
      {
       "id": "s-C-6-3",
       "original": "Judges are to score the similarity between the synthesized and prompt speech with clearly differentiated instructions mentioning:",
       "zh": "评委按明确区分的指引，对合成语音与提示语音之间的相似度打分，指引中提到："
      }
     ]
    },
    {
     "id": "p-C-7",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-C-7-1",
       "original": "• Try to rate concentrating on the speaker similarity aspects with reference speech.",
       "zh": "• 尽量集中评价与参考语音在说话人相似度方面的表现。"
      }
     ]
    },
    {
     "id": "p-C-8",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-C-8-1",
       "original": "We encourage more rigorous and transparent subjective evaluations, such as releasing used samples if not open-sourcing the model checkpoints.",
       "zh": "我们鼓励更严格、更透明的主观评测，例如在不开源模型权重时至少公开所用样本。"
      },
      {
       "id": "s-C-8-2",
       "original": "Meanwhile inviting more evaluators leads to more comprehensive and fair rating scores.",
       "zh": "同时，邀请更多评测者会得到更全面、更公平的评分。"
      },
      {
       "id": "s-C-8-3",
       "original": "Just for reference, DiTTo-TTS (Lee et al., 2024) received and reported 6 and 12 ratings for SMOS and CMOS, respectively, NaturalSpeech 3 (Ju et al., 2024) invited 12 natives to judge 20 samples for CMOS and 10 samples for SMOS.",
       "zh": "仅供参考：DiTTo-TTS（Lee et al., 2024）报告的 SMOS 与 CMOS 分别只收到 6 份和 12 份评分；NaturalSpeech 3（Ju et al., 2024）邀请 12 位母语者评 20 条样本的 CMOS 和 10 条样本的 SMOS。"
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
    "quote": "the text input is simply padded with filler tokens to the same length as input speech"
   },
   "kind": "concept",
   "title": "⟨F⟩ 填充是全文的地基",
   "explanation": "F5-TTS 的全部「简单」都来自这一步：不做音素转换、不预测时长、不单独编文本，直接把字符序列用填充 token 补齐到 mel 帧长度，让文本和语音在时间轴上天然对齐，剩下的交给 DiT 学。理解了这个，才能理解为什么时长只能靠字符比例估计、为什么声学和语义必须纠缠在同一个序列里——简单不是免费的，它把对齐难题从「显式模块」转移到了「隐式学习」。",
   "featured": true
  },
  {
   "id": "ann-002",
   "anchor": {
    "sentence_id": "s-abstract-1-7",
    "quote": "achieves an inference RTF of 0.15"
   },
   "kind": "number",
   "title": "0.15 RTF 的口径要读仔细",
   "explanation": "RTF 0.15 是 16 NFE 下的数字（32 NFE 时是 0.31），按在 RTX 3090 上合成 10 秒语音计时。这个口径不含声码器开销以外的系统延迟，也不含批量并行的摊薄收益。它真正说明的问题是：当 NFE 砍半后质量只从 WER 2.42 掉到 2.53——F5-TTS 的质量-速度曲线在小步数端很平，这比单个数字更有价值。",
   "featured": true
  },
  {
   "id": "ann-003",
   "anchor": {
    "sentence_id": "s-1-7-4",
    "quote": "removes the phoneme and duration predictor and directly uses characters padded with filler tokens"
   },
   "kind": "comparison",
   "title": "E2 TTS 先拆了脚手架，F5-TTS 证明不塌",
   "explanation": "传统 TTS 的「音素+时长预测器+对齐」三件套，本质是人工给模型画好语音-文本对齐的辅助线。E2 TTS 第一个把辅助线全擦掉，证明了可行性但留下了对齐鲁棒性问题；F5-TTS 在同一简化框架下，靠 ConvNeXt 文本细化和 DiT 结构把擦掉辅助线的代价补回来。两代模型的关系不是推翻而是补完——看消融时要分清「简化框架」与「结构设计」各自的贡献。"
  },
  {
   "id": "ann-004",
   "anchor": {
    "sentence_id": "s-1-8-3",
    "quote": "deep entanglement of semantic and acoustic features"
   },
   "kind": "critique",
   "title": "对 E2 TTS 的指控未必能完全归因",
   "explanation": "「语义与声学深度纠缠」是本文对 E2 TTS 失败现象的核心解释，但注意证据是间接的：丢弃音频提示后失败消失，只能说明条件分支有问题，不能排除是 E2 TTS 的 U-Net 结构、训练数据分布或音素级填充粒度的差异。F5-TTS 自己也用同样的纠缠式拼接，只是多了 ConvNeXt 细化——所以更准确的结论也许是「纠缠需要足够强的文本侧表示来对冲」，而非纠缠本身有罪。",
   "featured": true
  },
  {
   "id": "ann-005",
   "anchor": {
    "sentence_id": "s-2-1-5-1",
    "quote": "the CFM loss is equivalent to the v-prediction"
   },
   "kind": "connection",
   "title": "CFM 与扩散 v-prediction 是同一枚硬币",
   "explanation": "这句把流匹配接进了扩散模型的理论谱系：换成 log-SNR 参数化后，CFM 损失等价于余弦调度下的 v-prediction。实用价值在于——扩散社区积累的直觉（噪声调度、采样器设计、蒸馏技术）都能平移到 CFM 上。作者在 Sec.5.2 展望把 Sway Sampling 与训练期噪声调度、蒸馏结合，正是顺着这条等价关系走的。"
  },
  {
   "id": "ann-006",
   "anchor": {
    "sentence_id": "s-2-2-3-1",
    "quote": "the inference time will be doubled if CFG"
   },
   "kind": "engineering",
   "title": "CFG 强度 2 = 真实 NFE 翻倍",
   "explanation": "Classifier-free guidance 每步要跑有条件和无条件两次前向，推理成本直接乘 2。所以论文报告的「32 NFE」实际是 64 次网络评估，「16 NFE」是 32 次。比较 RTF 或跟其他不做 CFG 的模型比 NFE 时，必须把这层换算算回去，否则会系统性高估 F5-TTS 的速度优势。论文把这个关键事实放在脚注里，读数时容易漏。"
  },
  {
   "id": "ann-007",
   "anchor": {
    "sentence_id": "s-3-1-4-3",
    "quote": "we simply estimate the duration based on the ratio of the number of characters"
   },
   "kind": "engineering",
   "title": "字符比例估时长：能用但脆弱",
   "explanation": "按时长 = 音频提示时长 ×（y_gen 字符数 / y_ref 字符数）估计，省掉了独立的时长模型，是「简单管线」的关键一环。但它隐含两个假设：提示语音的语速与目标语音一致、字符密度与发音时长成正比。对中英文混读、数字串、缩略词这类字符-发音长度脱节的场景，这个估计会系统性跑偏——Tab.4 显示换成真实时长后 WER 从 4.17 降到 3.87，说明这里确实留了性能在桌上。",
   "featured": true
  },
  {
   "id": "ann-008",
   "anchor": {
    "sentence_id": "s-3-2-4-2",
    "quote": "an additional mean pooled token of text sequence for adaLN condition is not essential"
   },
   "kind": "critique",
   "title": "全局文本 token 为何没用",
   "explanation": "标准 DiT（图像生成）会在 adaLN 条件里混入一个全局池化 token 提供整句语义。作者发现 TTS 里去掉它不掉点，给出的解释是「TTS 要求严格逐字跟随，全局语义太粗」。这个消融的价值在于提醒：图像 DiT 的经验不能照搬到语音——语音的强时间局部性让逐帧交叉注意力已经足够，全局信息反而是噪声。但也别过度推广：对需要全局情感/风格控制的任务，这个结论未必成立。"
  },
  {
   "id": "ann-009",
   "anchor": {
    "sentence_id": "s-3-2-7-1",
    "quote": "we train our model with traditional uniformly sampled flow step"
   },
   "kind": "concept",
   "title": "训练均匀采样、推理非均匀采样的错位设计",
   "explanation": "这是 Sway Sampling 的核心机制：训练时 t ∼ U[0,1] 均匀采样保证模型在全时间轴上都有监督信号；推理时再用 f_sway 把步点往 t 小的方向挤（s<0）。训练/推理采样分布故意不一致，赌的是「早期步的信息价值更高」——这个假设后来被 leak-and-override 实验直接证实。它和扩散模型里训练期重加权（如 P2 权重）是镜像关系：一个动训练分布，一个动推理网格。"
  },
  {
   "id": "ann-010",
   "anchor": {
    "sentence_id": "s-3-2-9-3",
    "quote": "we make model inference more with smaller t"
   },
   "kind": "motivation",
   "title": "为什么早期流步骤更值钱",
   "explanation": "作者的论点：t 小的阶段决定语音的整体轮廓（说什么、什么音色、什么韵律骨架），t 大的阶段只是精修已成形的频谱。所以把有限的 NFE 预算向左倾斜，等于把算力花在决策点上。这个直觉与扩散模型中「噪声调度重于步数」的共识一致，但本文是少见的在 TTS 上给出直接因果证据（覆盖实验）的工作，而不只是画曲线。"
  },
  {
   "id": "ann-011",
   "anchor": {
    "sentence_id": "s-4-1-8",
    "quote": "batch size of 307,200 audio frames (0.91 hours)"
   },
   "kind": "number",
   "title": "307,200 帧 ≈ 0.91 小时的动态批",
   "explanation": "按帧数而非条数定批大小（每帧 10ms，307,200 帧即 0.91 小时音频），8 张 A100 训 1.2M 步、超过一周。动态帧数批处理让长短样本混排时显存可控，但也意味着每条样本的梯度贡献不均——长语音天然占更多损失权重。对想复现的人：小模型（155M）用这个批大小一半也要 800K 步，H100 上每 100K 步约 8 小时，算力门槛并不低。",
   "featured": true
  },
  {
   "id": "ann-012",
   "anchor": {
    "sentence_id": "s-5-1-3-3",
    "quote": "consistently failed (unable to solve with re-ranking) on 7% test samples (WER>50%)"
   },
   "kind": "critique",
   "title": "7% 的完全失败比平均 WER 更致命",
   "explanation": "E2 TTS 的问题不在平均指标——SIM 0.53 只比 F5-TTS 低 0.01——而在于存在一个无法靠重排序救回的失败模式：7% 的样本 WER 超 50%，且贯穿整个训练过程不收敛。对工业部署来说，平均值好看但有一个稳定复现的崩溃尾巴，比全面平庸更不可用。这也是全文最有说服力的一点：用「失败率」而非「平均 WER」来论证结构缺陷。",
   "featured": true
  },
  {
   "id": "ann-013",
   "anchor": {
    "sentence_id": "s-5-1-3-6",
    "quote": "the failed generation cannot be solved with re-ranking"
   },
   "kind": "critique",
   "title": "重排序救不了，是「系统性失配」的信号",
   "explanation": "多次采样再选优（re-ranking）能救的是高方差的随机错误；救不回来说明失败样本处在模型分布的盲区里。作者归因于与训练集分布差距大——这实际上承认了纯 NAR 零样本模型对域外提示的泛化仍然没有兜底机制。值得追问的是：F5-TTS 自己是否也有类似的硬失败尾巴，只是比例更低？论文没有给出 F5-TTS 的失败率直方图，这是证据链上的一处留白。"
  },
  {
   "id": "ann-014",
   "anchor": {
    "sentence_id": "s-5-1-4-2",
    "quote": "learned fast and collapsed fast"
   },
   "kind": "critique",
   "title": "MMDiT 在 TTS 上为何翻车",
   "explanation": "MMDiT（Stable Diffusion 3 的骨干）把文本和语音放在两条流上各自变换再交互，自由度更高。作者的实验结论很直白：学得快崩得也快——重复语句、音色韵律失控。原因是 TTS 要求输出严格跟随文本，过大的结构自由度让模型找到了「说自己的话」的捷径。这对把 MMDiT 当万能升级项直接搬到语音任务的做法是个重要的反面数据点。",
   "featured": true
  },
  {
   "id": "ann-015",
   "anchor": {
    "sentence_id": "s-5-2-4-2",
    "quote": "The model succeeds in overriding leaked utterances"
   },
   "kind": "engineering",
   "title": "leak-and-override：一个漂亮的因果实验",
   "explanation": "这是全文设计最巧的实验：把 t′=0.1 的真实音频信息直接灌进噪声输入，再给一个与泄露内容不同的文本提示。用 Sway Sampling 时模型能「覆盖」泄露信息、跟随文本；均匀采样则被泄露内容带跑。这把「早期步骤定轮廓」从相关性观察升级成了可干预的因果结论，也顺带展示了一个实用能力——推理期用音频提示强行覆盖不想要的音色或内容。",
   "featured": true
  },
  {
   "id": "ann-016",
   "anchor": {
    "sentence_id": "s-5-2-5-2",
    "quote": "can be easily applied to existing CFM-based models without retraining"
   },
   "kind": "connection",
   "title": "Sway Sampling 是免费的推理期增益",
   "explanation": "只改推理网格、不动权重，意味着所有已训练的 CFM/流匹配 TTS（E2 TTS、Voicebox 一系）都能白捡这个改进——附录 B.3 在 E2 TTS 上验证了这一点。更广地看，它属于「测试期计算重分配」家族：不改训练、只调度推理预算，和扩散模型的采样器改进（DPM-Solver 一系）同宗。后续把它与蒸馏结合的方向，本质是把推理期省下的步数再折成训练期的目标。"
  },
  {
   "id": "ann-017",
   "anchor": {
    "sentence_id": "s-6-1-2",
    "quote": "achieves state-of-the-art zero-shot ability compared to existing works trained on industry-scale data"
   },
   "kind": "critique",
   "title": "「SOTA」结论要按口径打折",
   "explanation": "F5-TTS 用 95K 小时数据确实逼近甚至超过若干用数百万小时训练的工业模型，这是真实且有价值的结论。但注意比较面：在 Seed-TTS test-en/zh 上它 CMOS/SMOS 占优，WER 上与真实语音的差距、以及 ELLA-V 困难句上的高 WER（附录 B.5）显示鲁棒性离工业水准还有距离。「SOTA」应读作「学术规模数据下的 SOTA 性价比」，而非全面超越工业系统。"
  },
  {
   "id": "ann-018",
   "anchor": {
    "sentence_id": "s-limitations-1-2",
    "quote": "the mel spectrogram sequence length is still much longer than the text modality"
   },
   "kind": "concept",
   "title": "限制一的实质：模态长度错配",
   "explanation": "mel 帧长（每秒 100 帧）远超字符数，⟨F⟩ 填充把文本拉长到语音长度只是把它「撑满」，信息密度仍然悬殊——大部分位置是无信息的填充。这个错配正是语音 tokenizer（把语音压成离散 token、长度接近文本）路线的根本动机。作者自己点名这是效率瓶颈，等于承认 mel 帧级建模是过渡方案，为后续 VoxCPM、MoE-TTS 一类 token 级模型留出了位置。",
   "featured": true
  },
  {
   "id": "ann-019",
   "anchor": {
    "sentence_id": "s-5-5-3",
    "quote": "orders of larger model size and dataset (several million hours)"
   },
   "kind": "comparison",
   "title": "95K 小时 vs 数百万小时的对比坐标",
   "explanation": "Seed-TTS 的最佳结果背后是比 F5-TTS 大若干数量级的模型与数百万小时数据，而 F5-TTS 只用 95K 小时（Emilia）就在 CMOS/SMOS 上打平或反超。读这类跨数量级对比要保持两点清醒：一是 Emilia 是野外真实数据，多样性可能胜过同质的大规模内部数据；二是主观评测（CMOS/SMOS）样本量和盲测设计的敏感度远高于 WER。结论站得住，但外推到「数据规模不重要」就过头了。",
   "featured": true
  },
  {
   "id": "ann-020",
   "anchor": {
    "sentence_id": "s-B-25-3",
    "quote": "enables stable training to learn speech-text alignment (without graphemeto-phoneme)"
   },
   "kind": "engineering",
   "title": "24 小时单说话人也能训稳，才是给个人开发者的礼物",
   "explanation": "附录 B.7 的小实验容易被忽略：在仅 24 小时的 LJSpeech 单说话人数据上，F5-TTS small 仍能稳定学会对齐、不需要字位-音素转换，对比 E2 TTS small 的溃败（Fig.2）。这回答了「F5-TTS 的鲁棒性是数据喂出来的还是结构带来的」——至少部分来自结构。对没有百万小时数据的团队，这条证据链比主结果更有实用价值。",
   "featured": true
  }
 ]
};
