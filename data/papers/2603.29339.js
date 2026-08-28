// 自动生成：2603.29339 全文双语精读数据（由 tools/compile_paper.js 装配）
// 结构/原文来自 .cache/papers/2603.29339.json（tools/extract_paper.py）；
// 翻译与讲解来自 .cache/papers/zh/2603.29339/（LLM agent 撰写）。
// 改翻译请改片段后重新装配；勿手改本文件的结构与 original 字段。
globalThis.PAPER_2603_29339 = {
 "paper_id": "2603.29339",
 "model_id": "longcat_audiodit",
 "title": {
  "original": "LongCat-AudioDiT: High-Fidelity Diffusion Text-to-Speech in the Waveform Latent Space",
  "zh": "LongCat-AudioDiT：在波形潜空间进行高保真扩散式文本转语音"
 },
 "sections": [
  {
   "id": "sec-meituan-longcat-team",
   "num": null,
   "level": 2,
   "page": 1,
   "title": {
    "original": "Meituan LongCat Team",
    "zh": "美团 LongCat 团队"
   },
   "blocks": [
    {
     "id": "p-meituan-longcat-team-1",
     "type": "paragraph",
     "page": 1,
     "sentences": [
      {
       "id": "s-meituan-longcat-team-1-1",
       "original": "longcat-team@meituan.com",
       "zh": "longcat-team@meituan.com"
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
       "original": "We present LongCat-AudioDiT, a novel, non-autoregressive diffusion-based text-to-speech (TTS) model that achieves state-of-the-art (SOTA) performance.",
       "zh": "我们提出 LongCat-AudioDiT，一个全新的、基于扩散的非自回归（NAR）文本转语音（TTS）模型，取得了当前最优（SOTA）的性能。"
      },
      {
       "id": "s-abstract-1-2",
       "original": "Unlike previous methods that rely on intermediate acoustic representations such as mel-spectrograms, the core innovation of LongCat-AudioDiT lies in operating directly within the waveform latent space.",
       "zh": "与以往依赖梅尔频谱图等中间声学表征的方法不同，LongCat-AudioDiT 的核心创新在于直接在波形潜空间中进行建模。"
      },
      {
       "id": "s-abstract-1-3",
       "original": "This approach effectively mitigates compounding errors and drastically simplifies the TTS pipeline, requiring only a waveform variational autoencoder (Wav-VAE) and a diffusion backbone.",
       "zh": "这一做法有效缓解了级联误差累积，并大幅简化了 TTS 流水线——整套系统只需要一个波形变分自编码器（Wav-VAE）和一个扩散主干网络。"
      },
      {
       "id": "s-abstract-1-4",
       "original": "Furthermore, we introduce two critical improvements to the inference process: first, we identify and rectify a long-standing training-inference mismatch; second, we replace traditional classifierfree guidance with adaptive projection guidance to elevate generation quality.",
       "zh": "此外，我们对推理过程提出了两项关键改进：第一，识别并修正了一个长期存在的训练-推理不一致问题；第二，用自适应投影引导（APG）替代传统的无分类器引导（CFG），以提升生成质量。"
      },
      {
       "id": "s-abstract-1-5",
       "original": "Experimental results demonstrate that, despite the absence of complex multi-stage training pipelines or highquality human-annotated datasets, LongCat-AudioDiT achieves SOTA zero-shot voice cloning performance on the Seed benchmark while maintaining competitive intelligibility.",
       "zh": "实验结果表明，尽管没有复杂的多阶段训练流水线、也没有高质量人工标注数据集，LongCat-AudioDiT 仍在 Seed 基准上取得了 SOTA 的零样本声音克隆性能，同时保持了有竞争力的可懂度。"
      },
      {
       "id": "s-abstract-1-6",
       "original": "Specifically, our largest variant, LongCat-AudioDiT-3.5B, outperforms the previous SOTA model (SeedTTS), improving the speaker similarity (SIM) scores from 0.809 to 0.818 on Seed-ZH, and from 0.776 to 0.797 on Seed-Hard.",
       "zh": "具体而言，我们最大的变体 LongCat-AudioDiT-3.5B 超越了此前 SOTA 模型（Seed-TTS），将说话人相似度（SIM）分数在 Seed-ZH 上从 0.809 提升到 0.818，在 Seed-Hard 上从 0.776 提升到 0.797。"
      },
      {
       "id": "s-abstract-1-7",
       "original": "Finally, through comprehensive ablation studies and systematic analysis, we validate the effectiveness of our proposed modules.",
       "zh": "最后，通过系统的消融实验和分析，我们验证了所提出各模块的有效性。"
      },
      {
       "id": "s-abstract-1-8",
       "original": "Notably, we investigate the interplay between the Wav-VAE and the TTS backbone, revealing the counterintuitive finding that superior reconstruction fidelity in the Wav-VAE does not necessarily lead to better overall TTS performance.",
       "zh": "值得注意的是，我们深入研究了 Wav-VAE 与 TTS 主干之间的相互作用，揭示了一个反直觉的发现：Wav-VAE 的重建保真度更高，并不必然带来更好的整体 TTS 性能。"
      },
      {
       "id": "s-abstract-1-9",
       "original": "Code and model weights are released to foster further research within the speech community.",
       "zh": "我们开源了代码和模型权重，以促进语音社区的进一步研究。"
      },
      {
       "id": "s-abstract-1-10",
       "original": "Github:https://github.com/meituan-longcat/LongCat-AudioDiT HuggingFace: https://huggingface.co/meituan-longcat/LongCat-AudioDiT-3.5B https://huggingface.co/meituan-longcat/LongCat-AudioDiT-1B",
       "zh": "Github:https://github.com/meituan-longcat/LongCat-AudioDiT；HuggingFace: https://huggingface.co/meituan-longcat/LongCat-AudioDiT-3.5B、https://huggingface.co/meituan-longcat/LongCat-AudioDiT-1B。"
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
       "original": "Text-to-speech (TTS) synthesis is a fundamental task in content generation.",
       "zh": "文本转语音（TTS）合成是内容生成领域的一项基础任务。"
      },
      {
       "id": "s-1-1-2",
       "original": "Recent TTS systems, built upon either autoregressive (AR) or non-autoregressive (NAR) generative paradigms, have achieved impressive speech quality that approaches human-level naturalness [Wang et al., 2023, Le et al., 2024, Anastassiou et al., 2024, Ju et al., 2024, Du et al., 2025, Zhang et al., 2025].",
       "zh": "近期的 TTS 系统建立在自回归（AR）或非自回归（NAR）生成范式之上，已经取得了接近人类自然度的出色语音质量 [Wang et al., 2023, Le et al., 2024, Anastassiou et al., 2024, Ju et al., 2024, Du et al., 2025, Zhang et al., 2025]。"
      },
      {
       "id": "s-1-1-3",
       "original": "Among these paradigms, NAR TTS—particularly diffusion-based models—stands out for its generation quality, architectural simplicity, and inference efficiency.",
       "zh": "在这些范式中，NAR TTS——尤其是基于扩散的模型——在生成质量、架构简洁性和推理效率方面表现突出。"
      },
      {
       "id": "s-1-1-4",
       "original": "Specifically, because NAR TTS can operate directly on continuous acoustic representations without relying on discrete audio tokenizers, it inherently bypasses complex system designs.",
       "zh": "具体而言，由于 NAR TTS 可以直接在连续声学表征上建模、不依赖离散音频分词器，它天然绕开了复杂的系统设计。"
      },
      {
       "id": "s-1-1-5",
       "original": "Although early NAR systems heavily relied on auxiliary duration prediction modules to establish temporal alignment between text and audio [Ren et al., 2019, Le et al., 2024], recent advances have demonstrated that models can implicitly learn this alignment given sufficient training data [Eskimez et al., 2024a, Chen et al., 2024a, Lee et al., 2024], enabling further architectural simplification.",
       "zh": "尽管早期 NAR 系统严重依赖辅助的时长预测模块来建立文本与音频之间的时间对齐 [Ren et al., 2019, Le et al., 2024]，但近期进展表明，只要训练数据足够充分，模型可以隐式地学会这种对齐 [Eskimez et al., 2024a, Chen et al., 2024a, Lee et al., 2024]，从而进一步简化架构。"
      },
      {
       "id": "s-1-1-6",
       "original": "Furthermore, by generating the entire speech sequence in parallel, NAR TTS exhibits a distinct speed advantage over its AR counterparts, especially as the sequence length increases.",
       "zh": "此外，由于 NAR TTS 并行生成整段语音序列，它相对 AR 同类方法具有明显的速度优势，序列越长优势越明显。"
      },
      {
       "id": "s-1-1-7",
       "original": "Despite these advantages, hybrid architectures that integrate both AR and NAR technologies have recently dominated the SOTA landscape [Betker, 2023, Anastassiou et al., 2024, Du et al., 2024a, Zhang et al., 2025], generally outperforming pure diffusion-based NAR models [Chen et al., 2024a, Lee et al., 2024].",
       "zh": "尽管有这些优势，近年来占据 SOTA 主导地位的却是同时融合 AR 与 NAR 技术的混合架构 [Betker, 2023, Anastassiou et al., 2024, Du et al., 2024a, Zhang et al., 2025]，它们总体上优于纯扩散式 NAR 模型 [Chen et al., 2024a, Lee et al., 2024]。"
      },
      {
       "id": "s-1-1-8",
       "original": "An exception is the diffusion-based variant Seed-DiT, which reportedly surpasses its hybrid counterpart, Seed-ICL, within the Seed-TTS framework [Anastassiou et al., 2024].",
       "zh": "一个例外是 Seed-TTS 框架中的扩散式变体 Seed-DiT——据报道它超过了同框架内的混合模型 Seed-ICL [Anastassiou et al., 2024]。"
      },
      {
       "id": "s-1-1-9",
       "original": "However, the exact architecture and technical details Previous diffusion-based TTS Waveform Vocoder Mel-spec Mel-VAE Decoder Latent Diffusion TTS Text Vocoder Compounding Errors Wav-VAE Decoder Diffusion TTS Text",
       "zh": "然而，Seed-DiT 的确切架构与技术细节（此处穿插图 1 的抽取残留文字：以往扩散式 TTS 的路线是波形→声码器、梅尔频谱→Mel-VAE 解码器→潜空间扩散 TTS→文本→声码器，存在误差累积；而本方法是 Wav-VAE 解码器、扩散 TTS、文本）"
      }
     ]
    },
    {
     "id": "fig-1-1",
     "type": "figure_caption",
     "page": 2,
     "original": "Figure 1 | Overview of LongCat-AudioDiT. Our architecture generates continuous waveform latents directly, thereby avoiding the compounding errors that inherently arise when predicting and subsequently converting intermediate representations (e.g., mel-spectrograms) into waveforms.",
     "zh": "图 1 | LongCat-AudioDiT 概览。我们的架构直接生成连续波形潜变量，从而避免了先预测中间表征（如梅尔频谱图）、再将其转换为波形时固有的误差累积。"
    },
    {
     "id": "p-1-2",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-1-2-1",
       "original": "of Seed-DiT remain undisclosed, leaving a critical gap regarding how to construct a pure, highly performant diffusion-based TTS system.",
       "zh": "始终未被公开，这就留下了一个关键空白：如何构建一个纯粹的、高性能的扩散式 TTS 系统。"
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
       "original": "In this paper, we present LongCat-AudioDiT, a diffusion-based NAR TTS model that achieves SOTA performance.",
       "zh": "在本文中，我们提出 LongCat-AudioDiT——一个取得 SOTA 性能的扩散式 NAR TTS 模型。"
      },
      {
       "id": "s-1-3-2",
       "original": "A core finding of our work is that training the diffusion model directly in the waveform latent space yields substantial improvements over traditional paradigms that rely on intermediate acoustic representations, such as mel-spectrograms.",
       "zh": "我们工作的一个核心发现是：直接在波形潜空间中训练扩散模型，相比依赖梅尔频谱图等中间声学表征的传统范式，能带来实质性的提升。"
      },
      {
       "id": "s-1-3-3",
       "original": "Consequently, LongCat-AudioDiT consists of only two streamlined components: a waveform variational autoencoder (Wav-VAE) [Kingma and Welling, 2013] and a diffusion Transformer (DiT) [Vaswani et al., 2017, Peebles and Xie, 2023].",
       "zh": "因此，LongCat-AudioDiT 只由两个精简的组件构成：一个波形变分自编码器（Wav-VAE）[Kingma and Welling, 2013] 和一个扩散 Transformer（DiT）[Vaswani et al., 2017, Peebles and Xie, 2023]。"
      },
      {
       "id": "s-1-3-4",
       "original": "During training, the VAE encoder produces continuous latents for the DiT.",
       "zh": "训练时，VAE 编码器为 DiT 产出连续潜变量。"
      },
      {
       "id": "s-1-3-5",
       "original": "During inference, the VAE decoder synthesizes raw waveforms directly from the latents sampled by the DiT, completely bypassing intermediate representations and eliminating the need for auxiliary vocoders heavily relied upon in previous studies [Chen et al., 2024a, Lee et al., 2024].",
       "zh": "推理时，VAE 解码器直接从 DiT 采样得到的潜变量合成原始波形，完全绕过中间表征，也不再需要以往研究重度依赖的辅助声码器 [Chen et al., 2024a, Lee et al., 2024]。"
      },
      {
       "id": "s-1-3-6",
       "original": "This end-to-end design mitigates the compounding errors typically incurred when predicting mel-spectrograms and subsequently converting them into waveforms.",
       "zh": "这种端到端设计缓解了「先预测梅尔频谱图、再将其转换为波形」时通常会产生的误差累积。"
      },
      {
       "id": "s-1-3-7",
       "original": "To support robust multilingual synthesis, we condition the model not only on the last hidden states but also on the raw word embeddings extracted from a pretrained language model.",
       "zh": "为了支撑稳健的多语言合成，我们不仅以预训练语言模型的最后隐状态为条件，还使用了它的原始词嵌入。"
      },
      {
       "id": "s-1-3-8",
       "original": "Furthermore, we introduce two critical improvements to the inference process: first, we identify and rectify a long-standing training-inference mismatch; second, we replace traditional classifier-free guidance with adaptive projection guidance to elevate generation quality.",
       "zh": "此外，我们对推理过程提出两项关键改进：第一，识别并修正了一个长期存在的训练-推理不一致问题；第二，用自适应投影引导（APG）替代传统的无分类器引导（CFG）以提升生成质量。"
      },
      {
       "id": "s-1-3-9",
       "original": "Finally, we explore the scalability of our architecture and observe a clear performance advantage when scaling up the model size.",
       "zh": "最后，我们探索了架构的可扩展性，观察到增大模型规模能带来明确的性能优势。"
      },
      {
       "id": "s-1-3-10",
       "original": "The final version of LongCat-AudioDiT, comprising 3.5B parameters and trained on 1 million hours of Chinese and English speech data, achieves SOTA performance on the Seed benchmark [Anastassiou et al., 2024].",
       "zh": "最终版本的 LongCat-AudioDiT 拥有 3.5B 参数，在 1 million（1,000,000）小时的中英文语音数据上训练，在 Seed 基准上取得了 SOTA 性能 [Anastassiou et al., 2024]。"
      },
      {
       "id": "s-1-3-11",
       "original": "To thoroughly validate our approach, we conduct comprehensive ablation studies on the proposed techniques.",
       "zh": "为了彻底验证我们的方法，我们对所提出的技术进行了全面的消融实验。"
      },
      {
       "id": "s-1-3-12",
       "original": "In addition, we systematically investigate the impact of latent dimensionality and compression rates on both the reconstruction fidelity of the Wav-VAE and the overall generation quality of the TTS model.",
       "zh": "此外，我们系统地研究了潜变量维度与压缩率对 Wav-VAE 重建保真度和 TTS 模型整体生成质量的影响。"
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
       "original": "Our main contributions are summarized as follows:",
       "zh": "我们的主要贡献总结如下："
      }
     ]
    },
    {
     "id": "p-1-5",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-1-5-1",
       "original": "• We propose LongCat-AudioDiT, a SOTA diffusion-based NAR TTS model.",
       "zh": "• 我们提出 LongCat-AudioDiT，一个 SOTA 的扩散式 NAR TTS 模型。"
      },
      {
       "id": "s-1-5-2",
       "original": "By operating directly in the waveform latent space, our approach effectively eliminates the compounding errors introduced by intermediate representations like mel-spectrograms.",
       "zh": "通过直接在波形潜空间中建模，我们的方法有效消除了梅尔频谱图等中间表征引入的误差累积。"
      }
     ]
    },
    {
     "id": "p-1-6",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-1-6-1",
       "original": "• We propose two critical improvements to the inference process: first, we identify and rectify a longstanding training-inference mismatch; second, we replace traditional classifier-free guidance with adaptive projection guidance to elevate generation quality.",
       "zh": "• 我们对推理过程提出两项关键改进：第一，识别并修正了一个长期存在的训练-推理不一致问题；第二，用自适应投影引导替代传统的无分类器引导以提升生成质量。"
      }
     ]
    },
    {
     "id": "p-1-7",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-1-7-1",
       "original": "• We conduct systematic and comprehensive experiments to validate the effectiveness of our design choices.",
       "zh": "• 我们开展了系统而全面的实验，验证了各项设计选择的有效性。"
      },
      {
       "id": "s-1-7-2",
       "original": "Notably, we provide empirical insights into the non-trivial relationship between the reconstruction quality of the Wav-VAE and the ultimate synthesis quality of the TTS backbone.",
       "zh": "值得注意的是，我们就 Wav-VAE 重建质量与 TTS 主干最终合成质量之间非平凡的关系，给出了经验性的洞见。"
      }
     ]
    },
    {
     "id": "p-1-8",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-1-8-1",
       "original": "• We publicly release the source code and model weights of LongCat-AudioDiT to advance research and development within the community.",
       "zh": "• 我们公开发布 LongCat-AudioDiT 的源代码与模型权重，以推动社区的研究与开发。"
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
    "zh": "2 相关工作"
   },
   "blocks": []
  },
  {
   "id": "sec-2-1",
   "num": "2.1",
   "level": 2,
   "page": 3,
   "title": {
    "original": "Diffusion-based TTS",
    "zh": "2.1 基于扩散的 TTS"
   },
   "blocks": [
    {
     "id": "p-2-1-1",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-2-1-1-1",
       "original": "Early diffusion-based TTS models, such as Grad-TTS [Popov et al., 2021] and Diff-TTS [Jeong et al., 2021], adopted diffusion probabilistic models (DPMs) [Sohl-Dickstein et al., 2015, Song et al., 2020, Ho et al., 2020] governed by stochastic differential equations (SDEs).",
       "zh": "早期的扩散式 TTS 模型，如 Grad-TTS [Popov et al., 2021] 和 Diff-TTS [Jeong et al., 2021]，采用了由随机微分方程（SDE）控制的扩散概率模型（DPM）[Sohl-Dickstein et al., 2015, Song et al., 2020, Ho et al., 2020]。"
      },
      {
       "id": "s-2-1-1-2",
       "original": "The fundamental concept of these approaches is to construct a bidirectional transformation between a simple Gaussian prior and the complex speech data distribution.",
       "zh": "这些方法的基本思想是在简单的高斯先验与复杂的语音数据分布之间构建一个双向变换。"
      },
      {
       "id": "s-2-1-1-3",
       "original": "While the forward process deterministically degrades speech data into Gaussian noise via continuous diffusion, the reverse denoising process lacks a closed-form solution and thus requires a neural network to approximate it.",
       "zh": "前向过程通过连续扩散确定性地把语音数据退化为高斯噪声，而反向去噪过程没有闭式解，因此需要一个神经网络来逼近它。"
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
       "original": "More recently, flow matching paradigms [Lipman et al., 2022], built upon continuous normalizing flows (CNFs) [Chen, 2018], have become prevalent in diffusion-based TTS [Le et al., 2024, Mehta et al., 2024, Eskimez et al., 2024b, Chen et al., 2024a].",
       "zh": "更近一些，建立在连续归一化流（CNF）[Chen, 2018] 之上的流匹配（flow matching）范式 [Lipman et al., 2022] 在扩散式 TTS 中流行开来 [Le et al., 2024, Mehta et al., 2024, Eskimez et al., 2024b, Chen et al., 2024a]。"
      },
      {
       "id": "s-2-1-2-2",
       "original": "CNFs model the transformation as an ordinary differential equation (ODE) and can be efficiently trained using a simulation-free objective known as conditional flow matching (CFM) [Lipman et al., 2022].",
       "zh": "CNF 把这个变换建模为常微分方程（ODE），并可以用一种免模拟的目标——条件流匹配（CFM）[Lipman et al., 2022]——来高效训练。"
      },
      {
       "id": "s-2-1-2-3",
       "original": "Although recent studies have demonstrated that DPMs and CFM intrinsically belong to the same theoretical family [Albergo et al., 2025], CFM is often the preferred choice in practice.",
       "zh": "尽管近期研究表明 DPM 与 CFM 本质上属于同一个理论家族 [Albergo et al., 2025]，实践中 CFM 往往是首选。"
      },
      {
       "id": "s-2-1-2-4",
       "original": "This is because it offers a simpler mathematical formulation [Liu et al., 2022a]—eliminating the need for complex noise scheduling—while delivering performance comparable or superior to traditional DPMs.",
       "zh": "这是因为它在数学形式上更简单 [Liu et al., 2022a]——无需复杂的噪声调度——同时性能可与传统 DPM 相当甚至更优。"
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
       "original": "A parallel trajectory in the development of diffusion-based TTS focuses on text-to-speech alignment.",
       "zh": "扩散式 TTS 的另一条并行发展线索聚焦于文本-语音对齐。"
      },
      {
       "id": "s-2-1-3-2",
       "original": "While early systems addressed this challenge by incorporating explicit, auxiliary duration prediction modules [Popov et al., 2021, Shen et al., 2023, Le et al., 2024, Ju et al., 2024], recent advances have shifted towards fully end-to-end architectures.",
       "zh": "早期系统通过引入显式的辅助时长预测模块来解决这一难题 [Popov et al., 2021, Shen et al., 2023, Le et al., 2024, Ju et al., 2024]，而近期进展已转向完全端到端的架构。"
      },
      {
       "id": "s-2-1-3-3",
       "original": "For instance, the representative E2-TTS [Eskimez et al., 2024a] framework, along with subsequent studies [Chen et al., 2024a, Lee et al., 2024, Zhu et al., 2025], demonstrated that the necessary alignment can be implicitly learned by the generative model without explicit supervision, provided there is sufficient training data.",
       "zh": "例如，代表性的 E2-TTS [Eskimez et al., 2024a] 框架及其后续工作 [Chen et al., 2024a, Lee et al., 2024, Zhu et al., 2025] 证明：只要训练数据足够充分，所需的对齐可以由生成模型隐式学到，无需显式监督。"
      }
     ]
    },
    {
     "id": "p-2-1-4",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-2-1-4-1",
       "original": "LongCat-AudioDiT builds upon this modern trajectory by adopting both the CFM framework and an alignmentfree architecture.",
       "zh": "LongCat-AudioDiT 沿着这条现代路线构建，同时采用了 CFM 框架和免对齐（alignment-free）架构。"
      },
      {
       "id": "s-2-1-4-2",
       "original": "However, we extend beyond these foundations by introducing several novel techniques designed to substantially improve the generation quality of diffusion-based TTS.",
       "zh": "不过，我们在这些基础之上更进一步，引入了若干旨在大幅提升扩散式 TTS 生成质量的新技术。"
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
    "original": "Latent Representations in Diffusion-based TTS",
    "zh": "2.2 扩散式 TTS 中的潜表征"
   },
   "blocks": [
    {
     "id": "p-2-2-1",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-2-2-1-1",
       "original": "The choice of latent representation, which serves as the modeling target for the diffusion backbone, is critical in TTS systems.",
       "zh": "潜表征的选择——它充当扩散主干的建模目标——在 TTS 系统中至关重要。"
      },
      {
       "id": "s-2-2-1-2",
       "original": "While it is feasible to train diffusion models directly on raw time-domain waveforms [Gao et al., 2023a], compressing the high-dimensional audio into a compact latent space has proven to be significantly more effective and computationally efficient [Rombach et al., 2022].",
       "zh": "虽然直接在原始时域波形上训练扩散模型是可行的 [Gao et al., 2023a]，但实践证明，把高维音频压缩到紧凑的潜空间要有效得多、计算效率也高得多 [Rombach et al., 2022]。"
      },
      {
       "id": "s-2-2-1-3",
       "original": "Specifically, the latent representation profoundly impacts both generation quality and synthesis speed, as it dictates the inherent trade-off between temporal compression rate and reconstruction fidelity.",
       "zh": "具体而言，潜表征深刻地影响生成质量与合成速度，因为它决定了时间压缩率与重建保真度之间内在的权衡。"
      },
      {
       "id": "s-2-2-1-4",
       "original": "Most prior studies have adopted the mel-spectrogram as the default latent representation [Popov et al., 2021, Le et al., 2024, Eskimez et al., 2024b, Chen et al., 2024a], necessitating an auxiliary vocoder to invert the predicted mel-spectrograms back into audible waveforms.",
       "zh": "以往大多数研究把梅尔频谱图作为默认的潜表征 [Popov et al., 2021, Le et al., 2024, Eskimez et al., 2024b, Chen et al., 2024a]，这就需要一个辅助声码器把预测出的梅尔频谱图还原为可听的波形。"
      },
      {
       "id": "s-2-2-1-5",
       "original": "To achieve a higher compression rate and further accelerate inference, architectures like DiTTo-TTS [Lee et al., 2024] employ a Mel-VAE to encode the mel-spectrograms into an even lower-dimensional space.",
       "zh": "为了获得更高的压缩率、进一步加速推理，DiTTo-TTS [Lee et al., 2024] 等架构使用 Mel-VAE 把梅尔频谱图编码到更低维的空间。"
      },
      {
       "id": "s-2-2-1-6",
       "original": "However, all these paradigms intrinsically suffer from potential compounding errors.",
       "zh": "然而，所有这些范式都内在地受困于潜在的误差累积。"
      },
      {
       "id": "s-2-2-1-7",
       "original": "These errors arise from the multiple stages of data conversion—first predicting the intermediate acoustic features, and subsequently reconstructing the signal via a separate neural vocoder.",
       "zh": "这些误差来自多级数据转换——先预测中间声学特征，再经一个独立的神经声码器重建信号。"
      }
     ]
    },
    {
     "id": "p-2-2-2",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-2-2-2-1",
       "original": "In LongCat-AudioDiT, we directly employ a waveform-based VAE (Wav-VAE) to encode raw audio into continuous latent representations.",
       "zh": "在 LongCat-AudioDiT 中，我们直接采用基于波形的 VAE（Wav-VAE）把原始音频编码为连续潜表征。"
      },
      {
       "id": "s-2-2-2-2",
       "original": "By unifying the acoustic modeling and waveform generation into a single continuous latent space, our approach elegantly bypasses intermediate transformations and mitigates the compounding error problem.",
       "zh": "通过把声学建模与波形生成统一到同一个连续潜空间中，我们的方法优雅地绕过了中间转换，缓解了误差累积问题。"
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
    "original": "Wav-VAE",
    "zh": "3 Wav-VAE"
   },
   "blocks": [
    {
     "id": "p-3-1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-1-1",
       "original": "Compared to mel-spectrograms—which inherently discard phase information and fine-grained high-frequency details—compact variational autoencoder (VAE) representations retain essential acoustic characteristics while effectively eliminating redundant components.",
       "zh": "相比梅尔频谱图——它本质上丢弃了相位信息和细粒度高频细节——紧凑的变分自编码器（VAE）表征在保留关键声学特性的同时，有效剔除了冗余成分。"
      },
      {
       "id": "s-3-1-2",
       "original": "Consequently, they offer significantly greater potential for high-fidelity audio generation [Liu et al., 2022b, Lee and Kim, 2025, Qiang et al., 2024, Niu et al., 2025].",
       "zh": "因此，它们为高保真音频生成提供了明显更大的潜力 [Liu et al., 2022b, Lee and Kim, 2025, Qiang et al., 2024, Niu et al., 2025]。"
      }
     ]
    },
    {
     "id": "p-3-2",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-2-1",
       "original": "Motivated by these advantages, we develop a fully convolutional audio autoencoder that compresses raw waveforms into a compact, continuous latent representation.",
       "zh": "受这些优势的驱动，我们开发了一个全卷积音频自编码器，把原始波形压缩为紧凑的连续潜表征。"
      },
      {
       "id": "s-3-2-2",
       "original": "Operating directly in the time domain, the model consists of an encoder E, a bottleneck module, and a decoder D.",
       "zh": "模型直接在时域上操作，由编码器 E、瓶颈模块和解码器 D 组成。"
      },
      {
       "id": "s-3-2-3",
       "original": "Given an input waveform x ∈R1×T , the encoder maps it to a latent sequence z ∈RD×(T/R), where D denotes the latent dimensionality and R represents the temporal downsampling factor.",
       "zh": "给定输入波形 x ∈R1×T ，编码器将其映射为潜序列 z ∈RD×(T/R)，其中 D 表示潜维度，R 表示时间下采样因子。"
      },
      {
       "id": "s-3-2-4",
       "original": "Subsequently, the decoder reconstructs the waveform as ˆx = D(z) ∈R1×T .",
       "zh": "随后，解码器把波形重建为 ˆx = D(z) ∈R1×T 。"
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
    "original": "Model Architecture",
    "zh": "3.1 模型架构"
   },
   "blocks": [
    {
     "id": "p-3-1-1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-1-1-1",
       "original": "Encoder.",
       "zh": "编码器。"
      },
      {
       "id": "s-3-1-1-2",
       "original": "The encoder maps the input waveform to a low-dimensional latent sequence via hierarchical downsampling.",
       "zh": "编码器通过逐级下采样，把输入波形映射为低维潜序列。"
      },
      {
       "id": "s-3-1-1-3",
       "original": "The raw waveform is first projected into a high-dimensional feature space using a weightnormalized 1D convolution.",
       "zh": "原始波形首先经一个权重归一化（weight-normalized）的 1 维卷积投影到高维特征空间。"
      },
      {
       "id": "s-3-1-1-4",
       "original": "The resulting representation is then processed by N cascaded Oobleck blocks Evans et al. [2024].",
       "zh": "得到的表征随后由 N 个级联的 Oobleck 模块处理 Evans et al. [2024]。"
      },
      {
       "id": "s-3-1-1-5",
       "original": "The i-th block reduces the temporal resolution by a stride of si while expanding the channel dimension from Ci to Ci+1.",
       "zh": "第 i 个模块以步幅 si 降低时间分辨率，同时把通道维度从 Ci 扩展到 Ci+1。"
      },
      {
       "id": "s-3-1-1-6",
       "original": "The cumulative downsampling ratio is given by: R = QN i=1 si.",
       "zh": "累积下采样率为：R = QN i=1 si（即各模块步幅的连乘积）。"
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
       "original": "Prior to downsampling, each block employs a stack of dilated residual units to capture multi-scale temporal dependencies.",
       "zh": "在下采样之前，每个模块用一叠空洞卷积残差单元来捕捉多尺度时间依赖。"
      },
      {
       "id": "s-3-1-2-2",
       "original": "A residual unit updates the hidden representation h as follows: h ←h + Conv1×1 σ(Convk,d(σ(h)))",
       "zh": "残差单元按下式更新隐藏表示 h：h ← h + Conv1×1(σ(Conv_{k,d}(σ(h))))（式 1），其中 Conv_{k,d} 为权重归一化、卷积核 k、膨胀率 d 的一维卷积，σ 为 Snake 激活函数 [Ziyin et al., 2020]。"
      }
     ]
    },
    {
     "id": "eq-3-1-1",
     "type": "equation",
     "page": 4,
     "original": ", (1)"
    },
    {
     "id": "p-3-1-3",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-1-3-1",
       "original": "where Convk,d denotes a weight-normalized 1D convolution with kernel size k and dilation rate d, and σ represents the Snake activation function [Ziyin et al., 2020].",
       "zh": "残差单元按下式更新隐藏表示 h：h ← h + Conv1×1(σ(Conv_{k,d}(σ(h))))（式 1），其中 Conv_{k,d} 为权重归一化、卷积核 k、膨胀率 d 的一维卷积，σ 为 Snake 激活函数 [Ziyin et al., 2020]。"
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
       "original": "Following Wu et al. [2025], to stabilize the training process under aggressive downsampling, each encoder block incorporates a non-parametric shortcut path.",
       "zh": "跟随 Wu et al. [2025] 的做法，为了在激进下采样下稳定训练过程，每个编码器模块都加入一条无参数的捷径（shortcut）通路。"
      },
      {
       "id": "s-3-1-4-2",
       "original": "Specifically, let the input to the i-th block be a tensor of shape [B, Ci, T] with a target stride of si.",
       "zh": "具体而言，设第 i 个模块的输入是形状为 [B, Ci, T] 的张量，目标步幅为 si。"
      },
      {
       "id": "s-3-1-4-3",
       "original": "A space-to-channel reshape operation first folds the temporal dimension into the channel axis, transforming the tensor to [B, Ci · si, T/si], thereby matching the desired downsampled temporal resolution.",
       "zh": "首先用「空间到通道」的重排操作把时间维折叠到通道轴上，将张量变换为 [B, Ci · si, T/si]，从而匹配目标的下采样时间分辨率。"
      },
      {
       "id": "s-3-1-4-4",
       "original": "Next, a channel-wise averaging operation groups adjacent channels to reduce the dimension to Ci+1, yielding a tensor of shape [B, Ci+1, T/si].",
       "zh": "接着按通道分组做平均，把通道维度降到 Ci+1，得到形状为 [B, Ci+1, T/si] 的张量。"
      },
      {
       "id": "s-3-1-4-5",
       "original": "This parameter-free branch establishes a linear residual pathway that bypasses the nonlinear transformations of the main block, and its output is combined with the block’s main output via element-wise addition.",
       "zh": "这条无参数分支建立了一条绕过主模块非线性变换的线性残差通路，其输出与模块的主输出按元素相加。"
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
       "original": "Finally, a convolutional projection layer—also equipped with an analogous shortcut mechanism—is applied to map the deepest features to the target latent dimension D.",
       "zh": "最后，用一个卷积投影层——同样配备类似的捷径机制——把最深层特征映射到目标潜维度 D。"
      },
      {
       "id": "s-3-1-5-2",
       "original": "A VAE bottleneck is then applied to the encoder’s output, generating the mean µ and log-variance log σ2.",
       "zh": "随后在编码器输出上施加 VAE 瓶颈，生成均值 μ 和对数方差 log σ2。"
      },
      {
       "id": "s-3-1-5-3",
       "original": "The continuous latent representation is sampled using the reparameterization trick: z = µ + σ ⊙ϵ, where ϵ ∼N(0, I).",
       "zh": "连续潜表征用重参数化技巧采样：z = μ + σ ⊙ε，其中 ε ∼N(0, I)。"
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
       "original": "Decoder.",
       "zh": "解码器。"
      },
      {
       "id": "s-3-1-6-2",
       "original": "The decoder architecture closely mirrors that of the encoder in reverse.",
       "zh": "解码器架构基本是编码器的镜像反转。"
      },
      {
       "id": "s-3-1-6-3",
       "original": "The sampled latent sequence z is initially projected into a high-dimensional feature space via a weight-normalized 1D convolution, and then progressively upsampled through N cascaded decoder blocks.",
       "zh": "采样得到的潜序列 z 先经一个权重归一化的 1 维卷积投影到高维特征空间，再由 N 个级联的解码器模块逐级上采样。"
      },
      {
       "id": "s-3-1-6-4",
       "original": "Following each upsampling step, the same stack of dilated residual units used in the encoder is applied to model multi-scale temporal dependencies.",
       "zh": "每步上采样之后，应用与编码器相同的一叠空洞残差单元来建模多尺度时间依赖。"
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
       "original": "Furthermore, each decoder block incorporates a non-parametric shortcut branch symmetric to its encoder counterpart.",
       "zh": "此外，每个解码器模块都包含一条与编码器对应部分对称的无参数捷径分支。"
      },
      {
       "id": "s-3-1-7-2",
       "original": "For an input tensor of shape [B, Ci+1, T/si], a channel-to-space rearrangement first restores the temporal resolution to T.",
       "zh": "对于形状为 [B, Ci+1, T/si] 的输入张量，先用「通道到空间」的重排把时间分辨率恢复为 T。"
      },
      {
       "id": "s-3-1-7-3",
       "original": "This is followed by a channel replication step to match the main branch’s output shape of [B, Ci, T].",
       "zh": "随后通过通道复制，把形状对齐到主分支的输出 [B, Ci, T]。"
      },
      {
       "id": "s-3-1-7-4",
       "original": "The shortcut and main branch outputs are then fused via element-wise addition.",
       "zh": "捷径与主分支的输出再按元素相加融合。"
      },
      {
       "id": "s-3-1-7-5",
       "original": "A final convolutional projection layer maps the reconstructed features back to the time-domain waveform ˆx.",
       "zh": "最后一个卷积投影层把重建特征映射回时域波形 ˆx。"
      }
     ]
    },
    {
     "id": "p-3-1-8",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-3-1-8-1",
       "original": "Scale MLP AdaLN Masked Compute gradient Text Emb Predicted Velocity ConvNeXt v2 Final Projection Blocks DiT Block Layer Norm Embedder Multi-head Cross-Attention Layer Norm Text Emb Scale Multi-head Self-Attention AdaLN MLP Time",
       "zh": "（此处为图 2 的抽取残留文字，无完整句子语义，按图内标签如实译出：）Scale、MLP、AdaLN、掩码、计算梯度、文本嵌入、预测速度、ConvNeXt v2、最终投影、模块、DiT 模块、Layer Norm、嵌入器、多头交叉注意力、Layer Norm、文本嵌入、Scale、多头自注意力、AdaLN、MLP、时间。"
      }
     ]
    },
    {
     "id": "eq-3-1-2",
     "type": "equation",
     "page": 5,
     "original": "×𝑁"
    },
    {
     "id": "p-3-1-9",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-3-1-9-1",
       "original": "Layer Norm Layer Norm Prompt Masked Raw Word Emb Clean Latent UMT5 Text For prediction Noisy Prompt Noisy Latent",
       "zh": "（此处为图 2 右侧文本编码器部分的抽取残留，按图内标签如实译出：）Layer Norm、Layer Norm、提示、掩码、原始词嵌入、干净潜变量、UMT5、文本、用于预测、加噪提示、加噪潜变量。"
      }
     ]
    },
    {
     "id": "fig-3-1-1",
     "type": "figure_caption",
     "page": 5,
     "original": "Figure 2 | Architecture of LongCat-AudioDiT. Middle: The overall architecture. Left: Detailed structure of the DiT block. Right: Detailed structure of the text encoder.",
     "zh": "图 2 | LongCat-AudioDiT 的架构。中：整体架构。左：DiT 模块的细节结构。右：文本编码器的细节结构。"
    }
   ]
  },
  {
   "id": "sec-3-2",
   "num": "3.2",
   "level": 2,
   "page": 5,
   "title": {
    "original": "Training Objective",
    "zh": "3.2 训练目标"
   },
   "blocks": [
    {
     "id": "p-3-2-1",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-3-2-1-1",
       "original": "The Wav-VAE is optimized via a two-stage adversarial training procedure.",
       "zh": "Wav-VAE 通过两阶段对抗训练过程进行优化。"
      },
      {
       "id": "s-3-2-1-2",
       "original": "The generator (i.e., the autoencoder) minimizes a combined loss function formulated as:",
       "zh": "生成器（即自编码器）最小化一个组合损失函数，形式如下："
      }
     ]
    },
    {
     "id": "eq-3-2-1",
     "type": "equation",
     "page": 5,
     "original": "Lgen = λspecLspec + λmelLmel + λtimeLtime + λKLLKL + λadvLadv + λfmLfm. (2)"
    },
    {
     "id": "p-3-2-2",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-3-2-2-1",
       "original": "The individual components of this objective are defined as follows:",
       "zh": "该目标的各个分量定义如下："
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
       "original": "• Lspec (Multi-resolution STFT loss [Zeghidour et al., 2021]): Incorporates perceptual weighting to encourage faithful reproduction of the time-frequency structure across various scales. • Lmel (Multi-scale mel-spectrogram loss [Kumar et al., 2023]): Reduces spectral discrepancies across multiple FFT resolutions, ensuring perceptually natural synthesis. • Ltime (L1 time-domain loss): Directly minimizes the sample-level absolute error between the input and the reconstructed waveforms. • LKL (KL divergence loss): Regularizes the learned latent distribution towards a standard Gaussian prior, ensuring a smooth, continuous, and well-structured latent space suitable for the diffusion model.",
       "zh": "• Lspec（多分辨率 STFT 损失 [Zeghidour et al., 2021]）：加入感知加权，促使模型在多种尺度上忠实地复现时频结构。• Lmel（多尺度梅尔频谱图损失 [Kumar et al., 2023]）：在多个 FFT 分辨率上减小频谱差异，保证感知上自然的合成。• Ltime（L1 时域损失）：直接最小化输入波形与重建波形之间逐样本的绝对误差。• LKL（KL 散度损失）：把学到的潜分布向标准高斯先验正则化，确保潜空间平滑、连续且结构良好，适合扩散模型使用。"
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
       "original": "The remaining two terms are derived from a multi-scale STFT discriminator, which is trained in parallel using a standard adversarial objective.",
       "zh": "其余两项来自一个多尺度 STFT 判别器，它以标准的对抗目标并行训练。"
      },
      {
       "id": "s-3-2-4-2",
       "original": "Specifically, the adversarial loss Ladv encourages the generator to synthesize waveforms that are perceptually indistinguishable from real audio.",
       "zh": "具体而言，对抗损失 Ladv 促使生成器合成在感知上与真实音频难以区分的波形。"
      },
      {
       "id": "s-3-2-4-3",
       "original": "Meanwhile, the feature matching loss [Kong et al., 2020] Lfm minimizes the L1 distance between the intermediate feature maps extracted by the discriminator for both real and reconstructed audio.",
       "zh": "同时，特征匹配损失 [Kong et al., 2020] Lfm 最小化判别器对真实音频与重建音频所提取中间特征图之间的 L1 距离。"
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
       "original": "To ensure training stability, we employ an initial warmup phase.",
       "zh": "为保证训练稳定，我们采用一个初始的预热（warmup）阶段。"
      },
      {
       "id": "s-3-2-5-2",
       "original": "During this period, the adversarial and feature matching terms (Ladv and Lfm) are disabled.",
       "zh": "在此期间，对抗项与特征匹配项（Ladv 和 Lfm）被禁用。"
      },
      {
       "id": "s-3-2-5-3",
       "original": "This strategy allows the autoencoder to establish a stable and accurate reconstruction mapping before being subjected to the more challenging adversarial gradients.",
       "zh": "这一策略让自编码器先建立一个稳定而准确的重建映射，之后再接受更具挑战性的对抗梯度。"
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
    "original": "Diffusion TTS",
    "zh": "4 扩散式 TTS"
   },
   "blocks": []
  },
  {
   "id": "sec-4-1",
   "num": "4.1",
   "level": 2,
   "page": 5,
   "title": {
    "original": "Overview",
    "zh": "4.1 总览"
   },
   "blocks": [
    {
     "id": "p-4-1-1",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-4-1-1-1",
       "original": "We adopt the Conditional Flow Matching (CFM) framework [Lipman et al., 2022] to model the TTS process as an Ordinary Differential Equation (ODE): dzt = vtdt, which deterministically transports random Gaussian noise z0 to target speech latents z1 along a velocity field vt.",
       "zh": "我们采用条件流匹配（CFM）框架 [Lipman et al., 2022]，把 TTS 过程建模为一个常微分方程（ODE）：dzt = vtdt，它沿速度场 vt 把随机高斯噪声 z0 确定性地输运到目标语音潜变量 z1。"
      },
      {
       "id": "s-4-1-1-2",
       "original": "Following the rectified flow formulation [Liu et al., 2022a], we construct the noisy latent zt via linear interpolation between the clean latent and the noise prior:",
       "zh": "遵循 rectified flow 的表述 [Liu et al., 2022a]，我们通过在干净潜变量与噪声先验之间做线性插值来构造加噪潜变量 zt：zt = (1 −t)z0 + tz1。"
      }
     ]
    },
    {
     "id": "eq-4-1-1",
     "type": "equation",
     "page": 6,
     "original": "zt = (1 −t)z0 + tz1. (3)"
    },
    {
     "id": "p-4-1-2",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-4-1-2-1",
       "original": "The velocity field is estimated by a neural network parameterized by θCFM, conditioned on the text sequence q and an audio context prompt zctx.",
       "zh": "速度场由一个以 θCFM 为参数的神经网络估计，其条件为文本序列 q 和音频上下文提示 zctx。"
      },
      {
       "id": "s-4-1-2-2",
       "original": "Following VoiceBox [Le et al., 2024], we construct zctx by randomly masking continuous spans of the clean latent z1, a strategy that inherently enables zero-shot voice cloning capabilities.",
       "zh": "跟随 VoiceBox [Le et al., 2024]，我们通过对干净潜变量 z1 随机掩码连续片段来构造 zctx——这一策略天然赋予了零样本声音克隆能力。"
      },
      {
       "id": "s-4-1-2-3",
       "original": "The optimization objective for CFM is to minimize the mean squared error between the predicted velocity vθ and the ground-truth target velocity (z1 −z0) over the masked regions:",
       "zh": "CFM 的优化目标是：在被掩码的区域上，最小化预测速度 vθ 与真实目标速度 (z1 −z0) 之间的均方误差："
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
       "original": "LCFM = Et,m,z0,z1 h\r\r(1 −m) ⊙ (z1 −z0) −v(zt, t, zctx, q; θCFM) 2i",
       "zh": "L_CFM = E_{t,m,z0,z1}[‖(1 −m) ⊙ (z1 −z0) − v(z_t, t, z_ctx, q; θ_CFM)‖^2]（式 4），其中 m 为生成 z_ctx 所用的随机二值掩码。"
      }
     ]
    },
    {
     "id": "eq-4-1-2",
     "type": "equation",
     "page": 6,
     "original": ", (4)"
    },
    {
     "id": "p-4-1-4",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-4-1-4-1",
       "original": "where m denotes the random binary mask used to generate zctx.",
       "zh": "L_CFM = E_{t,m,z0,z1}[‖(1 −m) ⊙ (z1 −z0) − v(z_t, t, z_ctx, q; θ_CFM)‖^2]（式 4），其中 m 为生成 z_ctx 所用的随机二值掩码。"
      },
      {
       "id": "s-4-1-4-2",
       "original": "Furthermore, to facilitate classifier-free guidance (CFG) [Ho and Salimans, 2021] during inference, we jointly drop the audio context zctx and the text condition q with a probability of 10% during training, thereby enabling the model to learn an unconditional distribution.",
       "zh": "此外，为在推理期支持无分类器引导（CFG）[Ho and Salimans, 2021]，训练时我们以 10% 的概率同时丢弃音频上下文 zctx 和文本条件 q，从而让模型学到无条件分布。"
      }
     ]
    },
    {
     "id": "p-4-1-5",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-4-1-5-1",
       "original": "The overall architecture of our CFM network, illustrated in Fig. 2, is built upon the Diffusion Transformer (DiT) paradigm [Peebles and Xie, 2023].",
       "zh": "我们的 CFM 网络整体架构如图 2 所示，建立在扩散 Transformer（DiT）范式之上 [Peebles and Xie, 2023]。"
      },
      {
       "id": "s-4-1-5-2",
       "original": "It leverages a standard Transformer [Vaswani et al., 2017] backbone and employs Adaptive Layer Normalization (AdaLN) [Perez et al., 2018] to inject the timestep condition t.",
       "zh": "它使用标准的 Transformer [Vaswani et al., 2017] 主干，并用自适应层归一化（AdaLN）[Perez et al., 2018] 注入时间步条件 t。"
      },
      {
       "id": "s-4-1-5-3",
       "original": "To stabilize the training dynamics, we incorporate QK-Norm [Henry et al., 2020] within the attention modules.",
       "zh": "为稳定训练动态，我们在注意力模块中加入 QK-Norm [Henry et al., 2020]。"
      },
      {
       "id": "s-4-1-5-4",
       "original": "While standard LayerNorm [Ba et al., 2016] is utilized throughout the network, RMSNorm [Zhang and Sennrich, 2019] is specifically applied for the QK-Norm operations.",
       "zh": "网络各处使用标准 LayerNorm [Ba et al., 2016]，而 QK-Norm 操作则专门使用 RMSNorm [Zhang and Sennrich, 2019]。"
      },
      {
       "id": "s-4-1-5-5",
       "original": "Following DiTTo-TTS [Lee et al., 2024], we utilize cross-attention mechanisms to implicitly learn the text-to-speech alignment, and apply Rotary Positional Embedding (RoPE) [Su et al., 2024] across all attention layers to capture relative positional dependencies.",
       "zh": "跟随 DiTTo-TTS [Lee et al., 2024]，我们用交叉注意力机制隐式学习文本-语音对齐，并在所有注意力层上应用旋转位置编码（RoPE）[Su et al., 2024] 以捕捉相对位置依赖。"
      }
     ]
    },
    {
     "id": "p-4-1-6",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-4-1-6-1",
       "original": "We also integrate two structural optimizations from DiTTo-TTS: long-skip connections and a global AdaLN formulation.",
       "zh": "我们还整合了 DiTTo-TTS 的两项结构优化：长跳跃连接（long-skip connection）和全局 AdaLN 形式。"
      },
      {
       "id": "s-4-1-6-2",
       "original": "The long-skip connection directly adds the network’s input to the final-layer hidden state, a modification that yielded slight but consistent improvements in our preliminary experiments.",
       "zh": "长跳跃连接把网络输入直接加到最后一层的隐状态上；在我们的初步实验中，这一改动带来了微小但一致的提升。"
      },
      {
       "id": "s-4-1-6-3",
       "original": "The global AdaLN mechanism, originally proposed in Gentron [Chen et al., 2024b], replaces individual AdaLN projections with a shared, global block for all DiT layers.",
       "zh": "全局 AdaLN 机制最初在 Gentron [Chen et al., 2024b] 中提出，它用一个所有 DiT 层共享的全局模块替代逐层独立的 AdaLN 投影。"
      },
      {
       "id": "s-4-1-6-4",
       "original": "We observe that this design significantly reduces the overall parameter count without degrading generation performance.",
       "zh": "我们观察到，这一设计在不损害生成性能的前提下显著减少了总参数量。"
      }
     ]
    },
    {
     "id": "p-4-1-7",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-4-1-7-1",
       "original": "Additionally, we adopt Representation Alignment (REPA) [Yu et al., 2024] to ground the internal representations of the DiT to a robust, self-supervised semantic space.",
       "zh": "此外，我们采用表征对齐（REPA）[Yu et al., 2024]，把 DiT 的内部表征锚定到一个鲁棒的自监督语义空间。"
      },
      {
       "id": "s-4-1-7-2",
       "original": "Specifically, we employ a pretrained mHuBERT model [Boito et al., 2024] and minimize the L1 distance between the outputs of the 8-th DiT layer and the corresponding mHuBERT features for the identical input speech.",
       "zh": "具体而言，我们使用预训练的 mHuBERT 模型 [Boito et al., 2024]，并最小化第 8 层 DiT 输出与同一段输入语音对应 mHuBERT 特征之间的 L1 距离。"
      },
      {
       "id": "s-4-1-7-3",
       "original": "Our preliminary findings indicate that while REPA does not enhance the generation quality, it substantially accelerates the convergence during training.",
       "zh": "我们的初步结论是：REPA 虽不提升生成质量，但能显著加快训练收敛。"
      }
     ]
    },
    {
     "id": "p-4-1-8",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-4-1-8-1",
       "original": "In the next section, we detail our text encoder that supports multiple languages.",
       "zh": "在下一节中，我们详细介绍支持多语言的文本编码器。"
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
    "original": "Multilingual Text Embedding",
    "zh": "4.2 多语言文本嵌入"
   },
   "blocks": [
    {
     "id": "p-4-2-1",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-4-2-1-1",
       "original": "Our goal is to design a robust text encoder capable of supporting multilingual synthesis.",
       "zh": "我们的目标是设计一个能支持多语言合成的鲁棒文本编码器。"
      },
      {
       "id": "s-4-2-1-2",
       "original": "Existing approaches typically either train a text encoder from scratch [Chen et al., 2024a] or leverage a pretrained language model, such as ByT5 [Xue et al., 2022, Lee et al., 2024].",
       "zh": "现有做法通常要么从零训练一个文本编码器 [Chen et al., 2024a]，要么借助预训练语言模型，如 ByT5 [Xue et al., 2022, Lee et al., 2024]。"
      },
      {
       "id": "s-4-2-1-3",
       "original": "However, training from scratch is highly resource-intensive and notoriously difficult to scale to new languages.",
       "zh": "但从零训练资源消耗巨大，而且也极难扩展到新语言。"
      },
      {
       "id": "s-4-2-1-4",
       "original": "Conversely, while ByT5 theoretically supports arbitrary languages, its byte-level tokenization results in prohibitively long sequence lengths for languages like Chinese, which empirically led to suboptimal performance and alignment difficulties in our preliminary experiments.",
       "zh": "反过来，ByT5 理论上支持任意语言，但其字节级分词会让中文这类语言的序列长度变得过长；在我们的初步实验中，这实际导致了欠优的性能和对齐困难。"
      },
      {
       "id": "s-4-2-1-5",
       "original": "To overcome these limitations, we propose utilizing UMT5 [Chung et al., 2023], a multilingual variant of T5, as our foundational text encoder.",
       "zh": "为克服这些局限，我们提出使用 UMT5 [Chung et al., 2023]——T5 的多语言变体——作为基础文本编码器。"
      },
      {
       "id": "s-4-2-1-6",
       "original": "UMT5 supports 107 languages and employs a subword tokenizer that maintains reasonable sequence lengths across diverse languages, perfectly aligning with our architectural requirements.",
       "zh": "UMT5 支持 107 种语言，并使用子词分词器，能在各种语言间保持合理的序列长度，与我们的架构需求完美契合。"
      },
      {
       "id": "s-4-2-1-7",
       "original": "A standard practice when utilizing pretrained language models is to extract the last hidden state as the text representation q.",
       "zh": "使用预训练语言模型的标准做法是抽取最后隐状态作为文本表征 q。"
      },
      {
       "id": "s-4-2-1-8",
       "original": "However, we observed that relying exclusively on the final layer yields poor intelligibility in the TTS task.",
       "zh": "然而，我们观察到仅依赖最后一层会让 TTS 任务的可懂度变差。"
      },
      {
       "id": "s-4-2-1-9",
       "original": "We hypothesize that while the last hidden state is rich in high-level semantic information, it abstracts away the low-level lexical and phonetic cues that are crucial for precise acoustic mapping.",
       "zh": "我们假设：最后隐状态虽然富含高层语义信息，却把对精确声学映射至关重要的低层词汇与语音线索抽象掉了。"
      },
      {
       "id": "s-4-2-1-10",
       "original": "Motivated by this, we propose integrating the raw word embeddings (the initial embedding layer of UMT5) with the final hidden state.",
       "zh": "受此启发，我们提出把原始词嵌入（UMT5 的初始嵌入层）与最后隐状态进行融合。"
      },
      {
       "id": "s-4-2-1-11",
       "original": "The resulting text representation q for LongCat-AudioDiT is formulated as:",
       "zh": "LongCat-AudioDiT 的文本表征 q 由此定义为：q = LayerNorm(last_hidden_state) + LayerNorm(raw_word_embedding)。"
      }
     ]
    },
    {
     "id": "eq-4-2-1",
     "type": "equation",
     "page": 6,
     "original": "q = LayerNorm(last_hidden_state) + LayerNorm(raw_word_embedding). (5)"
    },
    {
     "id": "p-4-2-2",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-4-2-2-1",
       "original": "Here, non-parametric LayerNorm is applied to appropriately balance the distinct scales of the two representational spaces before summation.",
       "zh": "这里使用无参数的 LayerNorm，在相加前恰当地平衡两个表征空间的不同尺度。"
      },
      {
       "id": "s-4-2-2-2",
       "original": "Although our empirical validation is conducted using UMT5, we posit that this dual-embedding extraction strategy is model-agnostic and can be generalized to other large multilingual language models.",
       "zh": "尽管我们的实证验证用的是 UMT5，但我们认为这种双嵌入抽取策略是与模型无关的，可以推广到其他大型多语言语言模型。"
      },
      {
       "id": "s-4-2-2-3",
       "original": "We use UMT5-base1 in all experiments.",
       "zh": "所有实验均使用 UMT5-base（脚注 1：https://huggingface.co/google/umt5-base）。"
      }
     ]
    },
    {
     "id": "p-4-2-3",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-4-2-3-1",
       "original": "Furthermore, following F5-TTS [Chen et al., 2024a], we pass the extracted text representation q through a lightweight sequence refinement module based on ConvNeXt V2 [Woo et al., 2023].",
       "zh": "此外，跟随 F5-TTS [Chen et al., 2024a]，我们把抽取的文本表征 q 送入一个基于 ConvNeXt V2 [Woo et al., 2023] 的轻量序列精炼模块。"
      },
      {
       "id": "s-4-2-3-2",
       "original": "We empirically find that this localized convolutional refinement significantly accelerates the convergence of the text-to-speech alignment during training.",
       "zh": "我们从经验上发现，这种局部卷积精炼能显著加快训练中文本-语音对齐的收敛。"
      }
     ]
    },
    {
     "id": "p-4-2-4",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-4-2-4-1",
       "original": "In the subsequent sections, we introduce two improvements to the inference process proposed in LongCatAudioDiT that further elevate generation performance.",
       "zh": "在接下来的几节中，我们介绍 LongCat-AudioDiT 对推理过程提出的两项改进，它们进一步提升了生成性能。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-4-3",
   "num": "4.3",
   "level": 2,
   "page": 7,
   "title": {
    "original": "Mitigating the Training-Inference Mismatch in Noisy Latent",
    "zh": "4.3 缓解加噪潜变量中的训练-推理不一致"
   },
   "blocks": [
    {
     "id": "p-4-3-1",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-4-3-1-1",
       "original": "During inference, we employ the Euler method to solve the ODE.",
       "zh": "推理时，我们采用欧拉（Euler）方法求解 ODE。"
      },
      {
       "id": "s-4-3-1-2",
       "original": "The number of function evaluations is set to 16.",
       "zh": "函数评估次数（NFE）设为 16。"
      },
      {
       "id": "s-4-3-1-3",
       "original": "Initializing the process with randomly sampled Gaussian noise z0, we iteratively update the latent zt at each step as follows: zt+∆t = zt + v(zt, t, zctx, q; θCFM)∆t,",
       "zh": "以随机采样高斯噪声 z0 初始化该过程，每步按下式迭代更新潜变量：z_{t+∆t} = z_t + v(z_t, t, z_ctx, q; θ_CFM)·∆t（式 6），其中 ∆t 为预定义积分步长。"
      }
     ]
    },
    {
     "id": "eq-4-3-1",
     "type": "equation",
     "page": 7,
     "original": "(6)"
    },
    {
     "id": "p-4-3-2",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-4-3-2-1",
       "original": "where ∆t is the predefined integration step size.",
       "zh": "以随机采样高斯噪声 z0 初始化该过程，每步按下式迭代更新潜变量：z_{t+∆t} = z_t + v(z_t, t, z_ctx, q; θ_CFM)·∆t（式 6），其中 ∆t 为预定义积分步长。"
      }
     ]
    },
    {
     "id": "p-4-3-3",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-4-3-3-1",
       "original": "By revisiting this sequential inference process, we identify a critical training-inference mismatch regarding the state of the noisy latent zt.",
       "zh": "重新审视这个逐步推理过程，我们发现了一个关于加噪潜变量 zt 状态的关键训练-推理不一致。"
      },
      {
       "id": "s-4-3-3-2",
       "original": "For clarity, we conceptually partition zt along the temporal axis into two segments: zctx t = zt[: Tctx] corresponding to the conditioning prompt, and zgen t = zt[Tctx :] corresponding to the target generation region, where Tctx denotes the duration of the prompt latent zctx.",
       "zh": "为清晰起见，把 z_t 沿时间轴概念性地分为两段：z^ctx_t = z_t[: T_ctx] 对应条件提示段，z^gen_t = z_t[T_ctx :] 对应目标生成段，其中 T_ctx 为提示潜变量 z_ctx 的时长。"
      }
     ]
    },
    {
     "id": "p-4-3-4",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-4-3-4-1",
       "original": "Recall that during training, the exact trajectory of the entire zt is constructed via linear interpolation (Eq. 3), acting as the ground truth (GT) noisy latent.",
       "zh": "回忆一下：训练时，整段 zt 的精确轨迹由线性插值构造（式 3），充当真值（GT）加噪潜变量。"
      },
      {
       "id": "s-4-3-4-2",
       "original": "During inference, however, an asymmetry emerges.",
       "zh": "然而在推理时，一种不对称性出现了。"
      },
      {
       "id": "s-4-3-4-3",
       "original": "Because the flow matching objective (Eq. 4) penalizes velocity prediction errors only on the masked target region (vgen), the iterative update successfully yields a valid approximation of the GT trajectory for zgen t .",
       "zh": "由于流匹配目标（式 4）只对被掩码的目标区域（v^gen）惩罚速度预测误差，迭代更新可成功得到 z^gen_t 对 GT 轨迹的有效近似。"
      },
      {
       "id": "s-4-3-4-4",
       "original": "Conversely, because no loss is computed over the prompt region, the model’s velocity predictions for zctx t are essentially unconstrained and arbitrary.",
       "zh": "相反，由于提示区域不计算损失，模型对 z^ctx_t 的速度预测基本不受约束、可以是任意的。"
      },
      {
       "id": "s-4-3-4-5",
       "original": "Consequently, accumulating these unconstrained updates causes zctx t to drift away from its theoretical GT trajectory, thus introducing a training-inference mismatch that has been overlooked in prior work [Le et al., 2024, Chen et al., 2024a].",
       "zh": "于是累积这些无约束更新会使 z^ctx_t 漂离其理论 GT 轨迹，引入此前工作 [Le et al., 2024, Chen et al., 2024a] 忽视的训练-推理失配。"
      },
      {
       "id": "s-4-3-4-6",
       "original": "We resolve this discrepancy by forcibly overwriting zctx t with its GT value at every inference step: zctx t ←tzctx + (1 −t)zctx",
       "zh": "我们通过在每个推理步强制把 z^ctx_t 覆写为其 GT 值来消除这一差异：z^ctx_t ← t·z^ctx + (1 −t)·z^ctx_0（式 7），其中 z^ctx_0 为提示部分的初始高斯噪声。"
      }
     ]
    },
    {
     "id": "eq-4-3-2",
     "type": "equation",
     "page": 7,
     "original": "0 , (7)"
    },
    {
     "id": "eq-4-3-3",
     "type": "equation",
     "page": 7,
     "original": "where zctx"
    },
    {
     "id": "eq-4-3-4",
     "type": "equation",
     "page": 7,
     "original": "0"
    },
    {
     "id": "p-4-3-5",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-4-3-5-1",
       "original": "is the initial Gaussian noise of the prompt part.",
       "zh": "我们通过在每个推理步强制把 z^ctx_t 覆写为其 GT 值来消除这一差异：z^ctx_t ← t·z^ctx + (1 −t)·z^ctx_0（式 7），其中 z^ctx_0 为提示部分的初始高斯噪声。"
      }
     ]
    },
    {
     "id": "p-4-3-6",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-4-3-6-1",
       "original": "Furthermore, on the basis of this problem, we propose a corollary for CFG.",
       "zh": "此外，在这个问题的基础上，我们为 CFG 提出一个推论。"
      },
      {
       "id": "s-4-3-6-2",
       "original": "To obtain a truly unconditional velocity estimate, it is insufficient to merely drop zctx; the explicitly constructed noisy prompt latent zctx t must also be dropped, as it inherently leaks acoustic information about the prompt.",
       "zh": "要获得真正无条件的速度估计，仅丢弃 z_ctx 还不够；显式构造的带噪提示潜变量 z^ctx_t 也必须丢弃，因为它本身会泄漏提示的声学信息。"
      }
     ]
    },
    {
     "id": "p-4-3-7",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-4-3-7-1",
       "original": "In Section 5.3.3, we empirically demonstrate that mitigating this mismatch and isolating the conditional information yields substantial improvements in overall synthesis performance.",
       "zh": "在第 5.3.3 节中，我们通过实验证明：缓解这种不一致并隔离条件信息，能为整体合成性能带来实质提升。"
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
    "original": "Replacing CFG with Adaptive Projection Guidance",
    "zh": "4.4 用自适应投影引导（APG）替代 CFG"
   },
   "blocks": [
    {
     "id": "p-4-4-1",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-4-4-1-1",
       "original": "Following standard practice, we first utilize classifier-free guidance (CFG) [Ho and Salimans, 2021] to steer the predicted velocity at each integration step: vCFG t = vt + α(vt −vu t ),",
       "zh": "按标准做法，先用 classifier-free guidance（CFG）[Ho and Salimans, 2021] 在每个积分步引导预测速度：v^CFG_t = v_t + α(v_t − v^u_t)（式 8），其中 v^u_t = v(z^u_t, t, ∅, ∅; θ_CFM) 为无条件速度，α 为 CFG 强度。"
      }
     ]
    },
    {
     "id": "eq-4-4-1",
     "type": "equation",
     "page": 7,
     "original": "(8)"
    },
    {
     "id": "p-4-4-2",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-4-4-2-1",
       "original": "where vu t = v(zu t , t, ∅, ∅; θCFM) represents the unconditional velocity; α denotes the CFG scale.",
       "zh": "按标准做法，先用 classifier-free guidance（CFG）[Ho and Salimans, 2021] 在每个积分步引导预测速度：v^CFG_t = v_t + α(v_t − v^u_t)（式 8），其中 v^u_t = v(z^u_t, t, ∅, ∅; θ_CFM) 为无条件速度，α 为 CFG 强度。"
      },
      {
       "id": "s-4-4-2-2",
       "original": "By default, we set α = 4.0.",
       "zh": "默认情况下，我们设 α = 4.0。"
      },
      {
       "id": "s-4-4-2-3",
       "original": "As established in Section 4.3, to accurately compute the unconditional velocity, we compute the noisy latent zu t by dropping the prompt part zctx t to avoid information leakage, i.e., zu t = concat(∅, zgen t",
       "zh": "如 4.3 节所述，为准确计算无条件速度，需通过丢弃提示段 z^ctx_t 来构造带噪潜变量 z^u_t 以避免信息泄漏，即 z^u_t = concat(∅, z^gen_t)。"
      }
     ]
    },
    {
     "id": "eq-4-4-2",
     "type": "equation",
     "page": 7,
     "original": ")."
    },
    {
     "id": "p-4-4-3",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-4-4-3-1",
       "original": "In our preliminary experiments, while standard CFG effectively improved synthesis quality, it occasionally introduced audible artifacts, and increasing the guidance scale α further exacerbated the degradation.",
       "zh": "在我们的初步实验中，标准 CFG 虽然有效提升了合成质量，但偶尔会引入可听见的伪影（artifacts），而进一步增大引导尺度 α 会加剧这种劣化。"
      },
      {
       "id": "s-4-4-3-2",
       "original": "We hypothesize that a large CFG scale induces an oversaturation phenomenon, a widely recognized issue in diffusion-based image generation [Kynkäänniemi et al., 2024].",
       "zh": "我们假设，过大的 CFG 尺度会引发过饱和（oversaturation）现象——这是基于扩散的图像生成中一个广为人知的问题 [Kynkäänniemi et al., 2024]。"
      },
      {
       "id": "s-4-4-3-3",
       "original": "To alleviate this problem, we incorporate Adaptive Projection Guidance (APG) [Sadat et al., 2024].",
       "zh": "为缓解该问题，我们引入自适应投影引导（APG）[Sadat et al., 2024]。"
      },
      {
       "id": "s-4-4-3-4",
       "original": "The core intuition of APG is to decompose the guidance residual, vt −vu t , into two geometrically orthogonal components: one parallel to the conditional 1https://huggingface.co/google/umt5-base prediction vt and the other orthogonal to it.",
       "zh": "APG 的核心直觉是把引导残差 vt − vu t 分解为两个几何上正交的分量：一个与条件预测 vt 平行，另一个与之正交。（此处串入脚注 1 的 URL 抽取残留：https://huggingface.co/google/umt5-base）"
      },
      {
       "id": "s-4-4-3-5",
       "original": "APG theorizes that the parallel component is the primary cause behind oversaturation; thus, the issue can be resolved by selectively dampening this term.",
       "zh": "APG 的理论认为，平行分量是过饱和的主因；因此，选择性地阻尼该分量即可解决问题。"
      }
     ]
    },
    {
     "id": "p-4-4-4",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-4-4-4-1",
       "original": "To integrate APG into our flow matching framework, we first project the model’s output from the velocity domain into the data sample domain (i.e., predicting z1), as suggested by Sadat et al. [2024]: µt = zt+(1−t)vt.",
       "zh": "为了把 APG 整合进我们的流匹配框架，我们按照 Sadat et al. [2024] 的建议，先把模型输出从速度域投影到数据样本域（即预测 z1）：μt = zt + (1−t)vt。"
      },
      {
       "id": "s-4-4-4-2",
       "original": "Let the guidance term in this sample domain be denoted as ∆µt = µt −µu t .",
       "zh": "记该样本域中的引导项为 ∆μt = μt − μu t。"
      },
      {
       "id": "s-4-4-4-3",
       "original": "The parallel component ∆µ∥ t with respect to µt is calculated as: ∆µ∥ t = ⟨∆µt,µt⟩ ⟨µt,µt⟩µt, and the corresponding orthogonal term is ∆µ⊥ t = ∆µt −∆µ∥ t .",
       "zh": "∆μt 相对于 μt 的平行分量 ∆μ∥ t 计算为：∆μ∥ t = (⟨∆μt, μt⟩ / ⟨μt, μt⟩) μt，相应的正交项为 ∆μ⊥ t = ∆μt − ∆μ∥ t。"
      },
      {
       "id": "s-4-4-4-4",
       "original": "The APG-adjusted prediction in the sample domain is then formulated as:",
       "zh": "于是，APG 调整后的样本域预测表示为："
      }
     ]
    },
    {
     "id": "p-4-4-5",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-4-4-5-1",
       "original": "µAPG t",
       "zh": "随后把调整后的样本预测映射回速度域以继续 ODE 求解：v^APG_t = (µ^APG_t − z_t)/(1 −t)。"
      }
     ]
    },
    {
     "id": "eq-4-4-3",
     "type": "equation",
     "page": 8,
     "original": "= µt + α∆µ⊥"
    },
    {
     "id": "eq-4-4-4",
     "type": "equation",
     "page": 8,
     "original": "t + η∆µ∥ t ,"
    },
    {
     "id": "eq-4-4-5",
     "type": "equation",
     "page": 8,
     "original": "(9)"
    },
    {
     "id": "p-4-4-6",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-4-4-6-1",
       "original": "where η acts as a dampening factor for the parallel component and is set to 0.5 by default.",
       "zh": "（公式片段：……t + η∆µ^∥_t（式 9），其中 η 为平行分量的阻尼系数，默认取 0.5。）"
      },
      {
       "id": "s-4-4-6-2",
       "original": "Subsequently, we map the adjusted sample prediction back to the velocity domain to proceed with the ODE solver: vAPG t = µAPG t −zt 1 −t",
       "zh": "随后把调整后的样本预测映射回速度域以继续 ODE 求解：v^APG_t = (µ^APG_t − z_t)/(1 −t)。"
      }
     ]
    },
    {
     "id": "eq-4-4-6",
     "type": "equation",
     "page": 8,
     "original": "."
    },
    {
     "id": "eq-4-4-7",
     "type": "equation",
     "page": 8,
     "original": "(10)"
    },
    {
     "id": "p-4-4-7",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-4-4-7-1",
       "original": "Furthermore, we adopt the reverse momentum trick proposed in APG [Sadat et al., 2024], which maintains a moving average ∆µt ←∆µt + β∆µt.",
       "zh": "（式 10）此外采用 APG [Sadat et al., 2024] 提出的反向动量技巧，维护滑动平均 ∆µ_t ← ∆µ_t + β·∆µ_t。"
      },
      {
       "id": "s-4-4-7-2",
       "original": "Applying a negative momentum (β < 0) forces the guidance to focus more on the current update direction rather than accumulating past momentum.",
       "zh": "施加负动量（β < 0）会迫使引导更关注当前的更新方向，而不是累积过去的动量。"
      },
      {
       "id": "s-4-4-7-3",
       "original": "By default, we set β = −0.3.",
       "zh": "默认情况下，我们设 β = −0.3。"
      }
     ]
    },
    {
     "id": "p-4-4-8",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-4-4-8-1",
       "original": "As demonstrated in Section 5.3.3, APG effectively eliminates artifacts and significantly elevates synthesis quality.",
       "zh": "如第 5.3.3 节所示，APG 有效地消除了伪影，并显著提升了合成质量。"
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
    "original": "Experiments",
    "zh": "5 实验"
   },
   "blocks": []
  },
  {
   "id": "sec-5-1",
   "num": "5.1",
   "level": 2,
   "page": 8,
   "title": {
    "original": "Experimental Setup Data",
    "zh": "5.1 实验设置：数据"
   },
   "blocks": [
    {
     "id": "p-5-1-1",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-5-1-1-1",
       "original": "For the training of the Wav-VAE, we employ a curated internal corpus comprising 200K hours of Chinese and English speech.",
       "zh": "Wav-VAE 的训练使用了一个经过精筛的内部语料库，包含 200K 小时的中文与英文语音。"
      },
      {
       "id": "s-5-1-1-2",
       "original": "Audio clips are segmented to approximately 3 seconds.",
       "zh": "音频片段被切分为约 3 秒。"
      }
     ]
    },
    {
     "id": "p-5-1-2",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-5-1-2-1",
       "original": "For the TTS backbone (DiT), we utilize a curated internal dataset containing 100K hours of Chinese and English speech for all baseline and ablation experiments.",
       "zh": "对于 TTS 主干（DiT），所有基线与消融实验均使用一个包含 100K 小时中英文语音的精筛内部数据集。"
      },
      {
       "id": "s-5-1-2-2",
       "original": "For the large-scale scaling experiments, this training corpus is further expanded to 1M hours.",
       "zh": "在大规模扩展实验中，该训练语料进一步扩展到 1M 小时。"
      },
      {
       "id": "s-5-1-2-3",
       "original": "The transcriptions for all utterances are obtained by a speech recognition model.",
       "zh": "所有语音的转写文本均由一个语音识别模型获得。"
      },
      {
       "id": "s-5-1-2-4",
       "original": "We sample all audio data at 24 kHz.",
       "zh": "所有音频数据均采样为 24 kHz。"
      },
      {
       "id": "s-5-1-2-5",
       "original": "The maximal audio duration-TTS training is 60 seconds.",
       "zh": "TTS 训练的最大音频时长为 60 秒。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-training-details",
   "num": null,
   "level": 2,
   "page": 8,
   "title": {
    "original": "Training Details",
    "zh": "训练细节"
   },
   "blocks": [
    {
     "id": "p-training-details-1",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-training-details-1-1",
       "original": "The Wav-VAE contains 157M parameters and is optimized on 32 NVIDIA H800 GPUs with a global batch size of 384.",
       "zh": "Wav-VAE 含 157M 参数，在 32 张 NVIDIA H800 GPU 上以 384 的全局批大小优化。"
      },
      {
       "id": "s-training-details-1-2",
       "original": "By default, the model is configured with a latent dimensionality of 64 and operates at a temporal frame rate of 11.72 Hz.",
       "zh": "默认配置下，模型的潜变量维度为 64，时间帧率为 11.72 Hz。"
      }
     ]
    },
    {
     "id": "p-training-details-2",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-training-details-2-1",
       "original": "For the diffusion backbone, we train two variants with 1B and 3.5B parameters, respectively.",
       "zh": "对于扩散主干，我们分别训练了 1B 和 3.5B 参数的两个变体。"
      },
      {
       "id": "s-training-details-2-2",
       "original": "The 1B model is trained on 16 GPUs with a global batch size of 256, whereas the 3.5B model utilizes 64 GPUs with a global batch size of 1024.",
       "zh": "1B 模型在 16 张 GPU 上以 256 的全局批大小训练，而 3.5B 模型使用 64 张 GPU 与 1024 的全局批大小。"
      },
      {
       "id": "s-training-details-2-3",
       "original": "Both models are optimized using AdamW [Loshchilov and Hutter, 2018], with moving average coefficients set to β1 = 0.9 and β2 = 0.95.",
       "zh": "两个模型均使用 AdamW [Loshchilov and Hutter, 2018] 优化，滑动平均系数设为 β1 = 0.9、β2 = 0.95。"
      },
      {
       "id": "s-training-details-2-4",
       "original": "We apply a linear learning rate decay schedule, gradually decreasing the learning rate from 1e-4 to 1e-5 following an initial 1K warmup steps.",
       "zh": "我们采用线性学习率衰减策略：在最初的 1K 预热步之后，学习率从 1e-4 逐步降至 1e-5。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-evaluation-metrics",
   "num": null,
   "level": 2,
   "page": 8,
   "title": {
    "original": "Evaluation Metrics",
    "zh": "评测指标"
   },
   "blocks": [
    {
     "id": "p-evaluation-metrics-1",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-evaluation-metrics-1-1",
       "original": "We benchmark the Wav-VAE on the LibriTTS test-clean subset [Zen et al., 2019], and evaluate the full TTS pipeline on the Seed benchmark [Anastassiou et al., 2024].",
       "zh": "我们在 LibriTTS test-clean 子集 [Zen et al., 2019] 上对 Wav-VAE 做基准评测，并在 Seed 基准 [Anastassiou et al., 2024] 上评测完整的 TTS 流水线。"
      }
     ]
    },
    {
     "id": "p-evaluation-metrics-2",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-evaluation-metrics-2-1",
       "original": "To evaluate the Wav-VAE reconstruction fidelity, we adopt standard objective metrics including PESQ [Rix et al., 2001] for assessing perceptual quality and STOI [Taal et al., 2011] for measuring speech intelligibility.",
       "zh": "为评估 Wav-VAE 的重建保真度，我们采用标准客观指标：用 PESQ [Rix et al., 2001] 评估感知质量，用 STOI [Taal et al., 2011] 衡量语音可懂度。"
      }
     ]
    },
    {
     "id": "p-evaluation-metrics-3",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-evaluation-metrics-3-1",
       "original": "The generative capabilities of the TTS models are evaluated across four primary dimensions: intelligibility, zero-shot voice cloning, naturalness, and overall acoustic quality.",
       "zh": "TTS 模型的生成能力从四个主要维度评估：可懂度、零样本声音克隆、自然度与整体声学质量。"
      },
      {
       "id": "s-evaluation-metrics-3-2",
       "original": "We measure these using the following metrics:",
       "zh": "我们使用以下指标来衡量："
      }
     ]
    },
    {
     "id": "p-evaluation-metrics-4",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-evaluation-metrics-4-1",
       "original": "• Character/Word Error Rate (CER/WER): To quantify intelligibility, we transcribe the synthesized speech using Whisper large-v3 [Radford et al., 2023] for English and Paraformer [Gao et al., 2023b] for Chinese, subsequently calculating the respective CER or WER. • Speaker Similarity (SIM): To evaluate voice cloning accuracy, we compute the cosine similarity between the speaker embeddings of the reference prompt and the synthesized speech.",
       "zh": "• 字符/词错误率（CER/WER）：为量化可懂度，英文用 Whisper large-v3 [Radford et al., 2023]、中文用 Paraformer [Gao et al., 2023b] 对合成语音做转写，再分别计算 CER 或 WER。• 说话人相似度（SIM）：为评估声音克隆准确度，我们计算参考提示与合成语音的说话人嵌入之间的余弦相似度。"
      },
      {
       "id": "s-evaluation-metrics-4-2",
       "original": "This formulation is mathematically equivalent to the SIM-O metric proposed in VoiceBox [Le et al., 2024].",
       "zh": "这一形式在数学上等价于 VoiceBox [Le et al., 2024] 提出的 SIM-O 指标。"
      },
      {
       "id": "s-evaluation-metrics-4-3",
       "original": "Following Seed-TTS [Anastassiou",
       "zh": "跟随 Seed-TTS [Anastassiou et al., 2024]（此处「et al., 2024]」字样因表格行抽取而错位到下文 s-ar-hybrid-models-1-1 句中），我们使用一个微调过的 WavLM [Chen et al., 2022]（wavlm_large_finetune2）来抽取鲁棒的说话人嵌入。• UTMOS [Saeki et al., 2022]：一种与人类平均意见分（MOS）高度相关的神经客观指标，用于近似语音自然度。• DNSMOS [Reddy et al., 2021]：一个被广泛采用的客观指标，用于评估合成音频的整体感知声学质量。"
      }
     ]
    },
    {
     "id": "tab-evaluation-metrics-1",
     "type": "table_caption",
     "page": 9,
     "original": "Table 1 | Objective evaluation results of LongCat-AudioDiT on the Seed benchmark [Anastassiou et al., 2024]. The results of other methods are taken from the original paper or, if open-sourced, evaluated by us. Bold indicates the best score. Underline indicates the second-best score.",
     "zh": "表 1 ｜ LongCat-AudioDiT 在 Seed 基准 [Anastassiou et al., 2024] 上的客观评测结果。其他方法的结果取自原始论文；若已开源，则由我们自行评测。加粗表示最佳得分，下划线表示次佳得分。"
    }
   ]
  },
  {
   "id": "sec-model",
   "num": null,
   "level": 2,
   "page": 9,
   "title": {
    "original": "Model",
    "zh": "模型（表 2 表头与 GT 行抽取残留）"
   },
   "blocks": [
    {
     "id": "p-model-1",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-model-1-1",
       "original": "ZH EN ZH-Hard CER (%) ↓ SIM ↑ WER (%) ↓ SIM ↑ CER (%) ↓ SIM ↑ GT",
       "zh": "表头：ZH / EN / ZH-Hard × CER (%) ↓ / SIM ↑ / WER (%) ↓ / SIM ↑——GT（后续照原文）。"
      }
     ]
    },
    {
     "id": "eq-model-1",
     "type": "equation",
     "page": 9,
     "original": "1.26 0.755 2.14 0.734 - -"
    }
   ]
  },
  {
   "id": "sec-nar-models",
   "num": null,
   "level": 2,
   "page": 9,
   "title": {
    "original": "NAR Models",
    "zh": "NAR 模型（表 1 行抽取残留）"
   },
   "blocks": [
    {
     "id": "p-nar-models-1",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-nar-models-1-1",
       "original": "Seed-DiT [Anastassiou et al., 2024]",
       "zh": "（表格行）Seed-DiT [Anastassiou et al., 2024]。"
      }
     ]
    },
    {
     "id": "eq-nar-models-1",
     "type": "equation",
     "page": 9,
     "original": "1.18 0.809 1.73 0.790 - -"
    },
    {
     "id": "eq-nar-models-2",
     "type": "equation",
     "page": 9,
     "original": "MaskGCT [Wang et al., 2024]"
    },
    {
     "id": "eq-nar-models-3",
     "type": "equation",
     "page": 9,
     "original": "2.27 0.774 2.62 0.714 10.27 0.748"
    },
    {
     "id": "eq-nar-models-4",
     "type": "equation",
     "page": 9,
     "original": "E2 TTS [Eskimez et al., 2024b]"
    },
    {
     "id": "eq-nar-models-5",
     "type": "equation",
     "page": 9,
     "original": "1.97 0.730 2.19 0.710 - -"
    },
    {
     "id": "eq-nar-models-6",
     "type": "equation",
     "page": 9,
     "original": "F5 TTS [Chen et al., 2024a]"
    },
    {
     "id": "eq-nar-models-7",
     "type": "equation",
     "page": 9,
     "original": "1.56 0.741 1.83 0.647 8.67 0.713"
    },
    {
     "id": "eq-nar-models-8",
     "type": "equation",
     "page": 9,
     "original": "F5R-TTS [Sun et al., 2025]"
    },
    {
     "id": "eq-nar-models-9",
     "type": "equation",
     "page": 9,
     "original": "1.37 0.754 - - 8.79 0.718"
    },
    {
     "id": "eq-nar-models-10",
     "type": "equation",
     "page": 9,
     "original": "ZipVoice [Zhu et al., 2025]"
    },
    {
     "id": "eq-nar-models-11",
     "type": "equation",
     "page": 9,
     "original": "1.40 0.751 1.64 0.668 - -"
    }
   ]
  },
  {
   "id": "sec-ar-hybrid-models",
   "num": null,
   "level": 2,
   "page": 9,
   "title": {
    "original": "AR/Hybrid Models",
    "zh": "AR/混合模型（表 1 行抽取残留）"
   },
   "blocks": [
    {
     "id": "p-ar-hybrid-models-1",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-ar-hybrid-models-1-1",
       "original": "Seed-ICL [Anastassiou et al., 2024]",
       "zh": "（表格行）Seed-ICL [Anastassiou et al., 2024]。"
      }
     ]
    },
    {
     "id": "eq-ar-hybrid-models-1",
     "type": "equation",
     "page": 9,
     "original": "1.12 0.796 2.25 0.762 7.59 0.776"
    },
    {
     "id": "eq-ar-hybrid-models-2",
     "type": "equation",
     "page": 9,
     "original": "SparkTTS [Wang et al., 2025]"
    },
    {
     "id": "eq-ar-hybrid-models-3",
     "type": "equation",
     "page": 9,
     "original": "1.20 0.672 1.98 0.584 - -"
    },
    {
     "id": "eq-ar-hybrid-models-4",
     "type": "equation",
     "page": 9,
     "original": "Qwen2.5-Omni [Xu et al., 2025]"
    },
    {
     "id": "eq-ar-hybrid-models-5",
     "type": "equation",
     "page": 9,
     "original": "1.70 0.752 2.72 0.632 7.97 0.747"
    },
    {
     "id": "eq-ar-hybrid-models-6",
     "type": "equation",
     "page": 9,
     "original": "CosyVoice [Du et al., 2024a]"
    },
    {
     "id": "eq-ar-hybrid-models-7",
     "type": "equation",
     "page": 9,
     "original": "3.63 0.723 4.29 0.609 11.75 0.709"
    },
    {
     "id": "eq-ar-hybrid-models-8",
     "type": "equation",
     "page": 9,
     "original": "CosyVoice2 [Du et al., 2024b]"
    },
    {
     "id": "eq-ar-hybrid-models-9",
     "type": "equation",
     "page": 9,
     "original": "1.45 0.748 2.57 0.652 6.83 0.724"
    },
    {
     "id": "eq-ar-hybrid-models-10",
     "type": "equation",
     "page": 9,
     "original": "FireRedTTS-1S [Guo et al., 2025]"
    },
    {
     "id": "eq-ar-hybrid-models-11",
     "type": "equation",
     "page": 9,
     "original": "1.05 0.750 2.17 0.660 7.63 0.748"
    },
    {
     "id": "eq-ar-hybrid-models-12",
     "type": "equation",
     "page": 9,
     "original": "CosyVoice3-1.5B [Du et al., 2025]"
    },
    {
     "id": "eq-ar-hybrid-models-13",
     "type": "equation",
     "page": 9,
     "original": "1.12 0.781 2.21 0.720 5.83 0.758"
    },
    {
     "id": "eq-ar-hybrid-models-14",
     "type": "equation",
     "page": 9,
     "original": "IndexTTS2 [Zhou et al., 2025a]"
    },
    {
     "id": "eq-ar-hybrid-models-15",
     "type": "equation",
     "page": 9,
     "original": "1.03 0.765 2.23 0.706 7.12 0.755"
    },
    {
     "id": "eq-ar-hybrid-models-16",
     "type": "equation",
     "page": 9,
     "original": "DiTAR [Jia et al., 2025]"
    },
    {
     "id": "eq-ar-hybrid-models-17",
     "type": "equation",
     "page": 9,
     "original": "1.02 0.753 1.69 0.735 - -"
    },
    {
     "id": "eq-ar-hybrid-models-18",
     "type": "equation",
     "page": 9,
     "original": "MiniMax-Speech [Zhang et al., 2025]"
    },
    {
     "id": "eq-ar-hybrid-models-19",
     "type": "equation",
     "page": 9,
     "original": "0.99 0.799 1.90 0.738 - -"
    },
    {
     "id": "eq-ar-hybrid-models-20",
     "type": "equation",
     "page": 9,
     "original": "VoxCPM [Zhou et al., 2025b]"
    },
    {
     "id": "eq-ar-hybrid-models-21",
     "type": "equation",
     "page": 9,
     "original": "0.93 0.772 1.85 0.729 8.87 0.730"
    },
    {
     "id": "eq-ar-hybrid-models-22",
     "type": "equation",
     "page": 9,
     "original": "MOSS-TTS [SII-OpenMOSS, 2026]"
    },
    {
     "id": "eq-ar-hybrid-models-23",
     "type": "equation",
     "page": 9,
     "original": "1.20 0.788 1.85 0.734 - -"
    },
    {
     "id": "eq-ar-hybrid-models-24",
     "type": "equation",
     "page": 9,
     "original": "Qwen3-TTS [Hu et al., 2026]"
    },
    {
     "id": "eq-ar-hybrid-models-25",
     "type": "equation",
     "page": 9,
     "original": "1.22 0.770 1.23 0.717 6.76 0.748"
    },
    {
     "id": "eq-ar-hybrid-models-26",
     "type": "equation",
     "page": 9,
     "original": "CosyVoice3.5"
    },
    {
     "id": "eq-ar-hybrid-models-27",
     "type": "equation",
     "page": 9,
     "original": "0.87 0.797 1.57 0.738 5.71 0.786"
    },
    {
     "id": "eq-ar-hybrid-models-28",
     "type": "equation",
     "page": 9,
     "original": "LongCat-AudioDiT-1B"
    },
    {
     "id": "eq-ar-hybrid-models-29",
     "type": "equation",
     "page": 9,
     "original": "1.18 0.812 1.78 0.762 6.33 0.787"
    },
    {
     "id": "eq-ar-hybrid-models-30",
     "type": "equation",
     "page": 9,
     "original": "LongCat-AudioDiT-3.5B"
    },
    {
     "id": "eq-ar-hybrid-models-31",
     "type": "equation",
     "page": 9,
     "original": "1.09 0.818 1.50 0.786 6.04 0.797"
    },
    {
     "id": "p-ar-hybrid-models-2",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-ar-hybrid-models-2-1",
       "original": "et al., 2024], we utilize a fine-tuned WavLM [Chen et al., 2022] (wavlm_large_finetune2) to extract the robust speaker embeddings. • UTMOS [Saeki et al., 2022]: A highly correlated neural objective metric used to approximate human Mean Opinion Scores (MOS) regarding speech naturalness. • DNSMOS [Reddy et al., 2021]: A widely adopted objective metric designed to evaluate the overall perceptual acoustic quality of the synthesized audio.",
       "zh": "et al., 2024]，我们使用微调过的 WavLM [Chen et al., 2022]（wavlm_large_finetune2）提取鲁棒说话人嵌入。• UTMOS [Saeki et al., 2022]：与人评 MOS 高度相关的神经客观指标，用于近似语音自然度。• DNSMOS [Reddy et al., 2021]：广泛采用的客观指标，评估合成音频的整体感知声学质量。"
      }
     ]
    },
    {
     "id": "p-ar-hybrid-models-3",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-ar-hybrid-models-3-1",
       "original": "Note that a subset of these TTS metrics is also applied to evaluate the Wav-VAE reconstructions, allowing us to comparatively analyze the inherent gap between representation reconstruction (Wav-VAE) and generation (TTS).",
       "zh": "注意，这些 TTS 指标中的一个子集也被用于评估 Wav-VAE 的重建结果，使我们能够对比分析表征重建（Wav-VAE）与生成（TTS）之间的固有差距。"
      }
     ]
    },
    {
     "id": "p-ar-hybrid-models-4",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-ar-hybrid-models-4-1",
       "original": "Finally, we benchmark LongCat-AudioDiT against strong prior work, encompassing purely NAR diffusion models, AR models, and state-of-the-art hybrid TTS architectures.",
       "zh": "最后，我们把 LongCat-AudioDiT 与一系列强基线做基准对比，涵盖纯 NAR 扩散模型、AR 模型以及最先进的混合 TTS 架构。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-5-2",
   "num": "5.2",
   "level": 2,
   "page": 9,
   "title": {
    "original": "Main Results",
    "zh": "5.2 主要结果"
   },
   "blocks": [
    {
     "id": "p-5-2-1",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-5-2-1-1",
       "original": "The evaluation results for both the full LongCat-AudioDiT pipeline and the standalone Wav-VAE are presented in Table 1 and Table 2, respectively.",
       "zh": "完整 LongCat-AudioDiT 流水线与独立 Wav-VAE 的评测结果分别见表 1 与表 2。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-tts-synthesis-performance",
   "num": null,
   "level": 2,
   "page": 9,
   "title": {
    "original": "TTS Synthesis Performance",
    "zh": "TTS 合成性能"
   },
   "blocks": [
    {
     "id": "p-tts-synthesis-performance-1",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-tts-synthesis-performance-1-1",
       "original": "As demonstrated in Table 1, our proposed TTS model consistently outperforms the majority of prior art, achieving particularly remarkable gains in speaker similarity (SIM) over the highly competitive Seed-DiT architecture [Anastassiou et al., 2024].",
       "zh": "如表 1 所示，我们提出的 TTS 模型持续优于绝大多数先前工作，尤其在说话人相似度（SIM）上相对极具竞争力的 Seed-DiT 架构 [Anastassiou et al., 2024] 取得了显著增益。"
      },
      {
       "id": "s-tts-synthesis-performance-1-2",
       "original": "Specifically, LongCat-AudioDiT establishes new state-of-the-art (SOTA) SIM scores on the demanding Seed-ZH and Seed-Hard benchmarks, while securing the second-best SIM score on Seed-EN.",
       "zh": "具体而言，LongCat-AudioDiT 在要求严苛的 Seed-ZH 与 Seed-Hard 基准上建立了新的 SOTA SIM 得分，并在 Seed-EN 上取得次佳 SIM。"
      },
      {
       "id": "s-tts-synthesis-performance-1-3",
       "original": "Most notably, our end-to-end framework decisively surpasses all previous diffusion-based paradigms—such as F5-TTS [Chen et al., 2024a]—that rely on intermediate mel-spectrograms 2https://github.com/microsoft/UniSpeech/tree/main/downstreams/speaker_verification",
       "zh": "最引人注目的是，我们的端到端框架明确超越了所有以往依赖中间梅尔频谱图的扩散式范式——如 F5-TTS [Chen et al., 2024a]。（此处串入脚注 2 的 URL 抽取残留：https://github.com/microsoft/UniSpeech/tree/main/downstreams/speaker_verification）"
      }
     ]
    },
    {
     "id": "tab-tts-synthesis-performance-1",
     "type": "table_caption",
     "page": 10,
     "original": "Table 2 | Objective evaluation results of the proposed Wav-VAE on the LibriTTS Zen et al. [2019] test-clean subset. Bold indicates the best score among continuous VAEs. Nq is the number of codebooks for discrete codecs. For codecs, frame per second (FPS) denotes the number of tokens per second.",
     "zh": "表 2 ｜ 所提 Wav-VAE 在 LibriTTS（Zen et al. [2019]）test-clean 子集上的客观评测结果。加粗表示连续 VAE 中的最佳得分。Nq 为离散编解码器的码本数量。对编解码器而言，帧率（FPS）表示每秒的 token 数。"
    }
   ]
  },
  {
   "id": "sec-model-2",
   "num": null,
   "level": 2,
   "page": 10,
   "title": {
    "original": "Model",
    "zh": "模型（表 2 表头与 GT 行抽取残留）"
   },
   "blocks": [
    {
     "id": "p-model-2-1",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-model-2-1-1",
       "original": "Nq FPS PESQ ↑ STOI ↑ UTMOS ↑ GT",
       "zh": "（此处为表 2 的表头与首行抽取残留，按原样译出并保留全部数字：）Nq（码本数）、FPS（帧率）、PESQ ↑、STOI ↑、UTMOS ↑；GT（真值）：–、–、4.644、1.0、4.056。"
      }
     ]
    },
    {
     "id": "eq-model-2-1",
     "type": "equation",
     "page": 10,
     "original": "– – 4.644 1.0 4.056"
    }
   ]
  },
  {
   "id": "sec-discrete-codecs",
   "num": null,
   "level": 2,
   "page": 10,
   "title": {
    "original": "Discrete Codecs",
    "zh": "离散编解码器（表 2 行抽取残留）"
   },
   "blocks": [
    {
     "id": "p-discrete-codecs-1",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-discrete-codecs-1-1",
       "original": "DAC [Kumar et al., 2023]",
       "zh": "（表格行）DAC [Kumar et al., 2023]。"
      }
     ]
    },
    {
     "id": "eq-discrete-codecs-1",
     "type": "equation",
     "page": 10,
     "original": "9 900 3.908 0.970 3.910"
    },
    {
     "id": "eq-discrete-codecs-2",
     "type": "equation",
     "page": 10,
     "original": "Encodec [Défossez et al., 2022]"
    },
    {
     "id": "eq-discrete-codecs-3",
     "type": "equation",
     "page": 10,
     "original": "8 600 2.720 0.939 3.040"
    },
    {
     "id": "eq-discrete-codecs-4",
     "type": "equation",
     "page": 10,
     "original": "Vocos [Siuzdak, 2023]"
    },
    {
     "id": "eq-discrete-codecs-5",
     "type": "equation",
     "page": 10,
     "original": "8 600 2.807 0.943 3.695"
    },
    {
     "id": "eq-discrete-codecs-6",
     "type": "equation",
     "page": 10,
     "original": "WavTokenizer [Ji et al., 2024]"
    },
    {
     "id": "eq-discrete-codecs-7",
     "type": "equation",
     "page": 10,
     "original": "1 75 2.373 0.914 4.049"
    },
    {
     "id": "eq-discrete-codecs-8",
     "type": "equation",
     "page": 10,
     "original": "BigCodec [Xin et al., 2024]"
    },
    {
     "id": "eq-discrete-codecs-9",
     "type": "equation",
     "page": 10,
     "original": "1 80 2.697 0.939 4.097"
    }
   ]
  },
  {
   "id": "sec-continuous-vaes",
   "num": null,
   "level": 2,
   "page": 10,
   "title": {
    "original": "Continuous VAEs",
    "zh": "连续 VAE（表 2 行抽取残留）"
   },
   "blocks": [
    {
     "id": "p-continuous-vaes-1",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-continuous-vaes-1-1",
       "original": "VibeVoice [Peng et al., 2025]",
       "zh": "（此处为表 2 中连续 VAE 各行的抽取残留，各列依次为 Nq、FPS、PESQ、STOI、UTMOS，按模型逐一译出并保留全部数字：）VibeVoice [Peng et al., 2025]：1、7.50、3.068、0.828、4.181；Ours Wav-VAE（我们的 Wav-VAE）：1、7.81、3.089、0.963、4.116；Ours Wav-VAE：1、11.72、3.237、0.967、4.013。句末“as generation targets”实为前文 s-tts-synthesis-performance-1-3 尾部的错位残留，意为“作为生成目标”。"
      }
     ]
    },
    {
     "id": "eq-continuous-vaes-1",
     "type": "equation",
     "page": 10,
     "original": "1 7.50 3.068 0.828 4.181"
    },
    {
     "id": "eq-continuous-vaes-2",
     "type": "equation",
     "page": 10,
     "original": "Ours Wav-VAE"
    },
    {
     "id": "eq-continuous-vaes-3",
     "type": "equation",
     "page": 10,
     "original": "1 7.81 3.089 0.963 4.116"
    },
    {
     "id": "eq-continuous-vaes-4",
     "type": "equation",
     "page": 10,
     "original": "Ours Wav-VAE"
    },
    {
     "id": "eq-continuous-vaes-5",
     "type": "equation",
     "page": 10,
     "original": "1 11.72 3.237 0.967 4.013"
    },
    {
     "id": "p-continuous-vaes-2",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-continuous-vaes-2-1",
       "original": "as generation targets.",
       "zh": "（此处为表 2 中连续 VAE 各行的抽取残留，各列依次为 Nq、FPS、PESQ、STOI、UTMOS，按模型逐一译出并保留全部数字：）VibeVoice [Peng et al., 2025]：1、7.50、3.068、0.828、4.181；Ours Wav-VAE（我们的 Wav-VAE）：1、7.81、3.089、0.963、4.116；Ours Wav-VAE：1、11.72、3.237、0.967、4.013。句末“as generation targets”实为前文 s-tts-synthesis-performance-1-3 尾部的错位残留，意为“作为生成目标”。"
      },
      {
       "id": "s-continuous-vaes-2-2",
       "original": "This substantial margin strongly validates our core hypothesis: operating directly within the waveform latent space effectively circumvents compounding errors and yields superior voice cloning fidelity.",
       "zh": "这一巨大优势有力地验证了我们的核心假设：直接在波形潜空间中建模能有效规避误差累积，并带来更优的声音克隆保真度。"
      }
     ]
    },
    {
     "id": "p-continuous-vaes-3",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-continuous-vaes-3-1",
       "original": "Regarding intelligibility (WER/CER), LongCat-AudioDiT achieves highly competitive performance relative to existing open-source baselines.",
       "zh": "在可懂度（WER/CER）方面，LongCat-AudioDiT 相对现有开源基线取得了高度有竞争力的表现。"
      },
      {
       "id": "s-continuous-vaes-3-2",
       "original": "While our error rates slightly trail heavily engineered proprietary systems like Qwen3-TTS [Hu et al., 2026] and CosyVoice3.5, it is crucial to emphasize that those models rely on complex multi-stage training pipelines and massive amounts of high-quality, human-annotated data.",
       "zh": "尽管我们的错误率略逊于 Qwen3-TTS [Hu et al., 2026] 与 CosyVoice3.5 这类重度工程化的专有系统，但必须强调：那些模型依赖复杂的多阶段训练流水线以及海量的高质量人工标注数据。"
      },
      {
       "id": "s-continuous-vaes-3-3",
       "original": "In contrast, LongCat-AudioDiT attains its performance with a remarkably simplified end-to-end architecture and a single training stage.",
       "zh": "相比之下，LongCat-AudioDiT 以极为简化的端到端架构与单一训练阶段就达到了这一性能。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-wav-vae-reconstruction-quality",
   "num": null,
   "level": 2,
   "page": 10,
   "title": {
    "original": "Wav-VAE Reconstruction Quality",
    "zh": "Wav-VAE 重建质量"
   },
   "blocks": [
    {
     "id": "p-wav-vae-reconstruction-quality-1",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-wav-vae-reconstruction-quality-1-1",
       "original": "The intrinsic reconstruction capabilities of our Wav-VAE are detailed in Table 2.",
       "zh": "我们 Wav-VAE 的内在重建能力详见表 2。"
      },
      {
       "id": "s-wav-vae-reconstruction-quality-1-2",
       "original": "Operating at a comparable frame rate (FPS), our Wav-VAE exhibits superior overall reconstruction fidelity compared to the baseline Wav-VAE introduced in VibeVoice [Peng et al., 2025].",
       "zh": "在可比的帧率（FPS）下，我们的 Wav-VAE 相比 VibeVoice [Peng et al., 2025] 引入的基线 Wav-VAE 展现出更优的整体重建保真度。"
      },
      {
       "id": "s-wav-vae-reconstruction-quality-1-3",
       "original": "Furthermore, when juxtaposed with SOTA discrete audio codecs, our continuous Wav-VAE not only outperforms most of them in acoustic quality but does so while operating at a drastically reduced sequence length (fewer frames per second).",
       "zh": "此外，与 SOTA 离散音频编解码器并列比较时，我们的连续 Wav-VAE 不仅在声学质量上超过其中大多数，而且是在大幅缩短的序列长度（每秒帧数更少）下做到的。"
      },
      {
       "id": "s-wav-vae-reconstruction-quality-1-4",
       "original": "This stark contrast strongly underscores the inherent capacity advantages and expressive efficiency of modeling continuous latent representations over discrete tokens.",
       "zh": "这一鲜明对比有力凸显了连续潜表征相对离散 token 在建模上的固有容量优势与表达效率。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-5-3",
   "num": "5.3",
   "level": 2,
   "page": 10,
   "title": {
    "original": "Ablation Studies",
    "zh": "5.3 消融研究"
   },
   "blocks": [
    {
     "id": "p-5-3-1",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-5-3-1-1",
       "original": "To systematically validate our architectural choices and the proposed techniques, we conduct comprehensive ablation experiments.",
       "zh": "为系统地验证我们的架构选择与所提技术，我们开展了全面的消融实验。"
      },
      {
       "id": "s-5-3-1-2",
       "original": "Specifically, our investigations are guided by the following three core research questions (RQs):",
       "zh": "具体而言，我们的研究由以下三个核心研究问题（RQ）牵引："
      }
     ]
    },
    {
     "id": "p-5-3-2",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-5-3-2-1",
       "original": "• RQ1: As a modeling target-TTS, does the waveform latent (Wav-VAE) outperform intermediate representations like the mel-spectrogram latent (Mel-VAE)? • RQ2: What is the intrinsic relationship between VAE reconstruction fidelity and the downstream TTS synthesis quality?",
       "zh": "• RQ1：作为 TTS 的建模目标，波形潜变量（Wav-VAE）是否优于梅尔频谱图潜变量（Mel-VAE）这类中间表征？• RQ2：VAE 重建保真度与下游 TTS 合成质量之间的内在关系是什么？"
      },
      {
       "id": "s-5-3-2-2",
       "original": "Does a superior VAE guarantee a better generative TTS model? • RQ3: How effectively do our inference techniques, i.e., solving training-inference mismatch and APG, contribute to the overall generation quality?",
       "zh": "更好的 VAE 是否保证更好的生成式 TTS 模型？• RQ3：我们的推理改进技术——即解决训练-推理不一致与 APG——对整体生成质量的贡献有多大？"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-5-3-1",
   "num": "5.3.1",
   "level": 2,
   "page": 10,
   "title": {
    "original": "RQ1: Wav-VAE vs. Mel-VAE-TTS Generation",
    "zh": "RQ1：Wav-VAE vs. Mel-VAE——TTS 生成"
   },
   "blocks": [
    {
     "id": "p-5-3-1-1",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-5-3-1-1-1",
       "original": "The central hypothesis underpinning LongCat-AudioDiT is that modeling directly within the waveform latent space is superior to utilizing intermediate representations, primarily due to the mitigation of compounding errors.",
       "zh": "支撑 LongCat-AudioDiT 的核心假设是：直接在波形潜空间中建模优于使用中间表征，主要原因是能缓解误差累积。"
      },
      {
       "id": "s-5-3-1-1-2",
       "original": "Since recent work like DiTTo-TTS [Lee et al., 2024] has already established that Mel-VAE outperforms raw mel-spectrograms in diffusion-based TTS, we restrict our comparison directly to Wav-VAE versus Mel-VAE.",
       "zh": "由于 DiTTo-TTS [Lee et al., 2024] 等近期工作已经证明在扩散式 TTS 中 Mel-VAE 优于原始梅尔频谱图，我们把对比直接限定在 Wav-VAE 与 Mel-VAE 之间。"
      }
     ]
    },
    {
     "id": "p-5-3-1-2",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-5-3-1-2-1",
       "original": "Intelligibility",
       "zh": "（图纵轴：Intelligibility（可懂度）。）"
      }
     ]
    },
    {
     "id": "eq-5-3-1-1",
     "type": "equation",
     "page": 11,
     "original": "0.990 1.25 1.50 0.985"
    },
    {
     "id": "eq-5-3-1-2",
     "type": "equation",
     "page": 11,
     "original": "WER-TTS"
    },
    {
     "id": "eq-5-3-1-3",
     "type": "equation",
     "page": 11,
     "original": "1.75"
    },
    {
     "id": "eq-5-3-1-4",
     "type": "equation",
     "page": 11,
     "original": "STOI-VAE"
    },
    {
     "id": "eq-5-3-1-5",
     "type": "equation",
     "page": 11,
     "original": "0.980 2.00 0.975 2.25 2.50 0.970 2.75 64 128 256 0.965"
    },
    {
     "id": "eq-5-3-1-6",
     "type": "equation",
     "page": 11,
     "original": "Naturalness"
    },
    {
     "id": "eq-5-3-1-7",
     "type": "equation",
     "page": 11,
     "original": "3.2 4.04 3.1 4.02"
    },
    {
     "id": "eq-5-3-1-8",
     "type": "equation",
     "page": 11,
     "original": "UTMOS-VAE UTMOS-TTS"
    },
    {
     "id": "eq-5-3-1-9",
     "type": "equation",
     "page": 11,
     "original": "3.0 4.00 3.98 2.9 3.96 2.8 3.94 2.7 3.92 2.6 64 128 256"
    },
    {
     "id": "eq-5-3-1-10",
     "type": "equation",
     "page": 11,
     "original": "Latent dim Similarity"
    },
    {
     "id": "eq-5-3-1-11",
     "type": "equation",
     "page": 11,
     "original": "0.975 0.820 0.970 0.815 0.965"
    },
    {
     "id": "eq-5-3-1-12",
     "type": "equation",
     "page": 11,
     "original": "SIM-VAE SIM-TTS"
    },
    {
     "id": "eq-5-3-1-13",
     "type": "equation",
     "page": 11,
     "original": "0.810 0.960 0.805 0.955 0.800 0.950 64 128 256 0.945 0.795"
    },
    {
     "id": "eq-5-3-1-14",
     "type": "equation",
     "page": 11,
     "original": "Quality"
    },
    {
     "id": "eq-5-3-1-15",
     "type": "equation",
     "page": 11,
     "original": "3.40 4.0 3.38"
    },
    {
     "id": "eq-5-3-1-16",
     "type": "equation",
     "page": 11,
     "original": "DNSMOS-TTS PESQ-VAE"
    },
    {
     "id": "eq-5-3-1-17",
     "type": "equation",
     "page": 11,
     "original": "3.36 3.8 3.34 3.6 3.32 3.30 3.4 3.28 3.2 3.26 64 128 256"
    },
    {
     "id": "p-5-3-1-3",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-5-3-1-3-1",
       "original": "Latent dim",
       "zh": "（图横轴：Latent dim（潜变量维度）。）"
      }
     ]
    },
    {
     "id": "fig-5-3-1-1",
     "type": "figure_caption",
     "page": 11,
     "original": "Figure 3 | Objective evaluation results for both Wav-VAE reconstruction and TTS synthesis under varying latent dimensions. For ease of reading, we negate WER-TTS.",
     "zh": "图 3 ｜ 不同潜变量维度下 Wav-VAE 重建与 TTS 合成的客观评测结果。为便于阅读，我们对 WER-TTS 取了负号。"
    },
    {
     "id": "tab-5-3-1-1",
     "type": "table_caption",
     "page": 11,
     "original": "Table 3 | Objective evaluation results of TTS models based on Wav-VAE and Mel-VAE on the Seed benchmark [Anastassiou et al., 2024]. Bold indicates the best score.",
     "zh": "表 3 ｜ 基于 Wav-VAE 与 Mel-VAE 的 TTS 模型在 Seed 基准 [Anastassiou et al., 2024] 上的客观评测结果。加粗表示最佳得分。"
    }
   ]
  },
  {
   "id": "sec-tts-latent-model",
   "num": null,
   "level": 2,
   "page": 11,
   "title": {
    "original": "TTS Latent Model",
    "zh": "TTS 潜变量模型（表 3 行抽取残留）"
   },
   "blocks": [
    {
     "id": "p-tts-latent-model-1",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-tts-latent-model-1-1",
       "original": "ZH EN ZH-Hard CER (%) ↓ SIM ↑ WER (%) ↓ SIM ↑ CER (%) ↓ SIM ↑ Mel-VAE",
       "zh": "（表：ZH/EN/ZH-Hard 三组的 CER(%)↓/SIM↑ 与 WER(%)↓/SIM↑——Mel-VAE 1.29/0.706、2.20/0.714、7.70/0.696；Wav-VAE 1.18/0.812、1.78/0.762、6.33/0.787。）本实验采用 ACE-Step [Gong et al., 2025] 引入的开源 Mel-VAE。"
      }
     ]
    },
    {
     "id": "eq-tts-latent-model-1",
     "type": "equation",
     "page": 11,
     "original": "1.29 0.706 2.20 0.714 7.70 0.696"
    },
    {
     "id": "eq-tts-latent-model-2",
     "type": "equation",
     "page": 11,
     "original": "Wav-VAE"
    },
    {
     "id": "eq-tts-latent-model-3",
     "type": "equation",
     "page": 11,
     "original": "1.18 0.812 1.78 0.762 6.33 0.787"
    },
    {
     "id": "p-tts-latent-model-2",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-tts-latent-model-2-1",
       "original": "For this experiment, we adopt the open-source Mel-VAE introduced in ACE-Step [Gong et al., 2025].",
       "zh": "（表：ZH/EN/ZH-Hard 三组的 CER(%)↓/SIM↑ 与 WER(%)↓/SIM↑——Mel-VAE 1.29/0.706、2.20/0.714、7.70/0.696；Wav-VAE 1.18/0.812、1.78/0.762、6.33/0.787。）本实验采用 ACE-Step [Gong et al., 2025] 引入的开源 Mel-VAE。"
      },
      {
       "id": "s-tts-latent-model-2-2",
       "original": "Although originally designed for music generation, we empirically verify that this Mel-VAE yields high-fidelity speech reconstruction at a similar frame rate to our proposed Wav-VAE.",
       "zh": "尽管该 Mel-VAE 最初是为音乐生成设计的，我们从实证上验证了它能在与我们所提 Wav-VAE 相近的帧率下产生高保真的语音重建。"
      },
      {
       "id": "s-tts-latent-model-2-3",
       "original": "We train a baseline 1B parameter TTS model using this Mel-VAE as the modeling target.",
       "zh": "我们以该 Mel-VAE 为建模目标，训练了一个 1B 参数的基线 TTS 模型。"
      },
      {
       "id": "s-tts-latent-model-2-4",
       "original": "During inference, the generated latents are decoded into mel-spectrograms, which are subsequently inverted into time-domain waveforms using the officially provided high-quality vocoder3.",
       "zh": "推理时，生成的潜变量被解码为梅尔频谱图，随后用官方提供的高质量声码器（脚注 3）逆变换为时域波形。"
      }
     ]
    },
    {
     "id": "p-tts-latent-model-3",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-tts-latent-model-3-1",
       "original": "The comparative evaluation results are presented in Table 3.",
       "zh": "对比评测结果见表 3。"
      },
      {
       "id": "s-tts-latent-model-3-2",
       "original": "As observed, the LongCat-AudioDiT model built upon the Wav-VAE consistently and significantly outperforms the Mel-VAE-based baseline across all metrics, validating our core assumption.",
       "zh": "可以看到，建立在 Wav-VAE 之上的 LongCat-AudioDiT 模型在所有指标上一致且显著地优于基于 Mel-VAE 的基线，验证了我们的核心假设。"
      },
      {
       "id": "s-tts-latent-model-3-3",
       "original": "Remarkably, while improvements in intelligibility (WER/CER) are solid, the Wav-VAE yields a drastic boost in the speaker similarity (SIM) metric.",
       "zh": "值得注意的是，尽管可懂度（WER/CER）的提升是扎实的，Wav-VAE 在说话人相似度（SIM）指标上带来了巨大的跃升。"
      },
      {
       "id": "s-tts-latent-model-3-4",
       "original": "This targeted improvement elegantly corroborates our hypothesis: fine-grained, high-frequency acoustic details—which are essential for zero-shot voice cloning—are intrinsically fragile and easily lost during the cascading conversions (latent → mel-spectrogram →waveform) inherent to the Mel-VAE pipeline.",
       "zh": "这一有针对性的改进优雅地印证了我们的假设：细粒度的高频声学细节——零样本声音克隆的关键——本质上是脆弱的，容易在 Mel-VAE 流水线固有的级联转换（潜变量 → 梅尔频谱图 → 波形）中丢失。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-5-3-2",
   "num": "5.3.2",
   "level": 2,
   "page": 11,
   "title": {
    "original": "RQ2: The Interplay Between Wav-VAE Reconstruction and TTS Generation",
    "zh": "RQ2：Wav-VAE 重建与 TTS 生成之间的相互作用"
   },
   "blocks": [
    {
     "id": "p-5-3-2-1",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-5-3-2-1-1",
       "original": "We investigate the intrinsic relationship between the reconstruction fidelity of the Wav-VAE and the generation quality of the downstream TTS model.",
       "zh": "我们研究 Wav-VAE 的重建保真度与下游 TTS 模型生成质量之间的内在关系。"
      },
      {
       "id": "s-5-3-2-1-2",
       "original": "A naive assumption is that a superior Wav-VAE guarantees better TTS performance, given that the VAE’s reconstruction fidelity inherently defines the upper bound for the generative model.",
       "zh": "一个朴素假设是：更好的 Wav-VAE 必然带来更好的 TTS 性能，因为 VAE 的重建保真度本身就决定了生成模型的上限。"
      },
      {
       "id": "s-5-3-2-1-3",
       "original": "To test this hypothesis, we train multiple Wav-VAEs with varying latent dimensionalities and temporal frame rates (FPS), subsequently training a corresponding TTS backbone for each VAE variant.",
       "zh": "为验证该假设，我们训练了多个不同潜变量维度与时间帧率（FPS）的 Wav-VAE，并为每个 VAE 变体训练对应的 TTS 主干。"
      },
      {
       "id": "s-5-3-2-1-4",
       "original": "Specifically, 3https://github.com/ace-step/ACE-Step Intelligibility",
       "zh": "具体地（脚注 3：https://github.com/ace-step/ACE-Step；图纵轴：Intelligibility。）"
      }
     ]
    },
    {
     "id": "eq-5-3-2-1",
     "type": "equation",
     "page": 11,
     "original": "0.970 1.1 1.2 0.968"
    },
    {
     "id": "eq-5-3-2-2",
     "type": "equation",
     "page": 11,
     "original": "WER-TTS"
    },
    {
     "id": "eq-5-3-2-3",
     "type": "equation",
     "page": 11,
     "original": "1.3"
    },
    {
     "id": "eq-5-3-2-4",
     "type": "equation",
     "page": 11,
     "original": "STOI-VAE"
    },
    {
     "id": "eq-5-3-2-5",
     "type": "equation",
     "page": 11,
     "original": "0.966 1.4 0.964 1.5 1.6 0.962 1.7 7.81 11.72 23.44 0.960"
    },
    {
     "id": "eq-5-3-2-6",
     "type": "equation",
     "page": 11,
     "original": "Naturalness"
    },
    {
     "id": "eq-5-3-2-7",
     "type": "equation",
     "page": 11,
     "original": "4.20 3.35 4.15 3.30 4.10 3.25"
    },
    {
     "id": "eq-5-3-2-8",
     "type": "equation",
     "page": 11,
     "original": "UTMOS-VAE UTMOS-TTS"
    },
    {
     "id": "eq-5-3-2-9",
     "type": "equation",
     "page": 11,
     "original": "4.05 3.20 4.00 3.15 3.95 3.10 3.90 3.05 3.85 3.00 3.80 2.95 7.81 11.72 23.44"
    },
    {
     "id": "eq-5-3-2-10",
     "type": "equation",
     "page": 11,
     "original": "Latent FPS Similarity"
    },
    {
     "id": "eq-5-3-2-11",
     "type": "equation",
     "page": 11,
     "original": "0.955 0.815 0.950 0.810 0.945"
    },
    {
     "id": "eq-5-3-2-12",
     "type": "equation",
     "page": 11,
     "original": "SIM-VAE SIM-TTS"
    },
    {
     "id": "eq-5-3-2-13",
     "type": "equation",
     "page": 11,
     "original": "0.805 0.940 0.800 0.935 0.795 0.930 7.81 11.72 23.44 0.925 0.790"
    },
    {
     "id": "eq-5-3-2-14",
     "type": "equation",
     "page": 11,
     "original": "Quality"
    },
    {
     "id": "eq-5-3-2-15",
     "type": "equation",
     "page": 11,
     "original": "3.45 3.44 3.40 3.42"
    },
    {
     "id": "eq-5-3-2-16",
     "type": "equation",
     "page": 11,
     "original": "DNSMOS-TTS"
    },
    {
     "id": "eq-5-3-2-17",
     "type": "equation",
     "page": 11,
     "original": "3.35"
    },
    {
     "id": "eq-5-3-2-18",
     "type": "equation",
     "page": 11,
     "original": "PESQ-VAE"
    },
    {
     "id": "eq-5-3-2-19",
     "type": "equation",
     "page": 11,
     "original": "3.40 3.30 3.38 3.25 3.36 3.20 3.34 3.15 3.32 3.10 3.30 7.81 11.72 23.44"
    },
    {
     "id": "p-5-3-2-2",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-5-3-2-2-1",
       "original": "Latent FPS",
       "zh": "（图横轴：Latent FPS（潜变量帧率）。）"
      }
     ]
    },
    {
     "id": "fig-5-3-2-1",
     "type": "figure_caption",
     "page": 12,
     "original": "Figure 4 | Objective evaluation results for both Wav-VAE reconstruction and TTS synthesis across varying latent frame rates (FPS). For ease of reading, we negate WER-TTS.",
     "zh": "图 4 ｜ 不同潜变量帧率（FPS）下 Wav-VAE 重建与 TTS 合成的客观评测结果。为便于阅读，我们对 WER-TTS 取了负号。"
    },
    {
     "id": "p-5-3-2-3",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-5-3-2-3-1",
       "original": "we select latent dimensions from the set {64, 128, 256} and frame rates from {7.81, 11.72, 23.44}, yielding a total of 6 unique Wav-VAE models and 6 paired TTS models.",
       "zh": "我们从集合 {64, 128, 256} 中选取潜变量维度，从 {7.81, 11.72, 23.44} 中选取帧率，共得到 6 个独特的 Wav-VAE 模型与 6 个配对的 TTS 模型。"
      },
      {
       "id": "s-5-3-2-3-2",
       "original": "For the dimension ablation (3 models), we fix the frame rate at 20 Hz; conversely, for the frame rate ablation (3 models), we fix the latent dimension at 64.",
       "zh": "在维度消融（3 个模型）中，我们把帧率固定为 20 Hz；反之，在帧率消融（3 个模型）中，我们把潜变量维度固定为 64。"
      },
      {
       "id": "s-5-3-2-3-3",
       "original": "All TTS models in this ablation are trained using the exact configurations as the LongCat-AudioDiT-1B baseline.",
       "zh": "本消融中的所有 TTS 模型均采用与 LongCat-AudioDiT-1B 基线完全相同的配置训练。"
      }
     ]
    },
    {
     "id": "p-5-3-2-4",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-5-3-2-4-1",
       "original": "The comprehensive evaluation results are visualized in Fig. 3 and Fig. 4.",
       "zh": "完整的评测结果可视化于图 3 与图 4。"
      },
      {
       "id": "s-5-3-2-4-2",
       "original": "To facilitate a clear comparison across domains, we categorize the metrics into four analogous groups: intelligibility (STOI-VAE & WER-TTS), speaker similarity (SIM-VAE & SIM-TTS), naturalness (UTMOS-VAE & UTMOS-TTS), and overall acoustic quality (PESQ-VAE & DNSMOS-TTS).",
       "zh": "为便于跨域清晰比较，我们把指标归为四个对应的组别：可懂度（STOI-VAE 与 WER-TTS）、说话人相似度（SIM-VAE 与 SIM-TTS）、自然度（UTMOS-VAE 与 UTMOS-TTS）、整体声学质量（PESQ-VAE 与 DNSMOS-TTS）。"
      },
      {
       "id": "s-5-3-2-4-3",
       "original": "Note that the VAE similarity (SIM-VAE) is calculated by comparing the ground truth (GT) utterance against its direct reconstruction.",
       "zh": "注意，VAE 相似度（SIM-VAE）是通过比较真值（GT）语音与其直接重建结果来计算的。"
      }
     ]
    },
    {
     "id": "p-5-3-2-5",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-5-3-2-5-1",
       "original": "Observation 1: The Dimension-Capacity Trade-off.",
       "zh": "观察 1：维度-容量权衡。"
      },
      {
       "id": "s-5-3-2-5-2",
       "original": "Under a fixed TTS parameter budget, increasing the latent dimension consistently improves the Wav-VAE’s reconstruction fidelity but simultaneously degrades the TTS generation quality (see Fig. 3).",
       "zh": "在固定的 TTS 参数预算下，增大潜变量维度的确能持续提升 Wav-VAE 的重建保真度，但同时会劣化 TTS 生成质量（见图 3）。"
      },
      {
       "id": "s-5-3-2-5-3",
       "original": "This finding directly contradicts the naive assumption.",
       "zh": "这一发现直接推翻了朴素假设。"
      },
      {
       "id": "s-5-3-2-5-4",
       "original": "We initially hypothesized that increasing the TTS model capacity might resolve this mismatch; thus, we scaled up the TTS backbone to 3.5B parameters, conditioned on the 128-dimensional Wav-VAE.",
       "zh": "我们最初假设增大 TTS 模型容量或许能消解这一矛盾；于是，在 128 维 Wav-VAE 条件下，我们把 TTS 主干扩展到 3.5B 参数。"
      },
      {
       "id": "s-5-3-2-5-5",
       "original": "However, while this larger variant achieved a marginal gain in SIM score, its overall performance remained inferior to the 3.5B model conditioned on the 64-dimensional Wav-VAE (as reported in Table 1).",
       "zh": "然而，尽管这个更大的变体在 SIM 上略有提升，其整体性能仍不及以 64 维 Wav-VAE 为条件的 3.5B 模型（如表 1 所报告）。"
      },
      {
       "id": "s-5-3-2-5-6",
       "original": "This suggests that excessively high-dimensional continuous latents impose a severe modeling burden on the diffusion backbone that cannot be easily overcome merely by scaling up parameters.",
       "zh": "这表明，过高维度的连续潜变量会给扩散主干施加严重的建模负担，而这种负担无法仅靠扩大参数量轻易克服。"
      }
     ]
    },
    {
     "id": "p-5-3-2-6",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-5-3-2-6-1",
       "original": "Observation 2: The Frame Rate Sweet Spot.",
       "zh": "观察 2：帧率甜点。"
      },
      {
       "id": "s-5-3-2-6-2",
       "original": "There exists an optimal temporal frame rate (FPS) that balances VAE and TTS performance, though this sweet spot is not necessarily identical for both tasks (see Fig. 4).",
       "zh": "存在一个能平衡 VAE 与 TTS 性能的最优时间帧率（FPS），但两个任务的甜点未必相同（见图 4）。"
      },
      {
       "id": "s-5-3-2-6-3",
       "original": "For the Wav-VAE, a lower FPS surprisingly yields better intelligibility and naturalness, but penalizes similarity and overall acoustic quality.",
       "zh": "对 Wav-VAE 而言，更低的 FPS 出人意料地带来更好的可懂度与自然度，却损害相似度与整体声学质量。"
      },
      {
       "id": "s-5-3-2-6-4",
       "original": "This behavior is intuitive: an aggressively downsampled (lower FPS) latent forces the autoencoder to discard fine-grained, high-frequency acoustic details (hurting SIM and PESQ) while preserving global phonetic structures (aiding STOI).",
       "zh": "这种行为很直观：激进下采样（更低 FPS）的潜变量迫使自编码器丢弃细粒度的高频声学细节（伤害 SIM 与 PESQ），同时保留全局音素结构（有利 STOI）。"
      },
      {
       "id": "s-5-3-2-6-5",
       "original": "Conversely, for the generative TTS model, a lower FPS substantially boosts the overall synthesis quality.",
       "zh": "反过来，对生成式 TTS 模型而言，更低的 FPS 大幅提升了整体合成质量。"
      },
      {
       "id": "s-5-3-2-6-6",
       "original": "We observe that the diffusion backbone struggles to accurately model the complex, highly correlated temporal dynamics of high-FPS latents, leading to unstable generation.",
       "zh": "我们观察到，扩散主干难以准确建模高 FPS 潜变量那种复杂且高度相关的时间动态，从而导致生成不稳定。"
      }
     ]
    },
    {
     "id": "p-5-3-2-7",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-5-3-2-7-1",
       "original": "Synthesizing these two critical observations, we empirically identify the 64-dimensional, 11.72-Hz Wav-VAE as the optimal representation target, and adopt it as the default configuration for all LongCat-AudioDiT models.",
       "zh": "综合这两项关键观察，我们从实证上认定 64 维、11.72 Hz 的 Wav-VAE 为最优的表征目标，并将其作为所有 LongCat-AudioDiT 模型的默认配置。"
      }
     ]
    },
    {
     "id": "tab-5-3-2-1",
     "type": "table_caption",
     "page": 13,
     "original": "Table 4 | Objective evaluation results of the ablation studies on noise-prompt dual masking and APG on the Seed-ZH benchmark [Anastassiou et al., 2024]. Bold indicates the best score.",
     "zh": "表 4 ｜ 噪声-提示双重掩码与 APG 在 Seed-ZH 基准 [Anastassiou et al., 2024] 上的消融研究客观评测结果。加粗表示最佳得分。"
    }
   ]
  },
  {
   "id": "sec-experiment",
   "num": null,
   "level": 2,
   "page": 13,
   "title": {
    "original": "Experiment",
    "zh": "实验（表 4 行抽取残留）"
   },
   "blocks": [
    {
     "id": "p-experiment-1",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-experiment-1-1",
       "original": "CER (%) ↓ SIM ↑ UTMOS ↑ DNSMOS ↑ LongCat-AudioDiT-1B",
       "zh": "表头：CER (%) ↓ / SIM ↑ / UTMOS ↑ / DNSMOS ↑——LongCat-AudioDiT-1B（后续照原文）。"
      }
     ]
    },
    {
     "id": "eq-experiment-1",
     "type": "equation",
     "page": 13,
     "original": "1.18 0.812 3.16 3.40"
    },
    {
     "id": "eq-experiment-2",
     "type": "equation",
     "page": 13,
     "original": "training-inference mismatch"
    },
    {
     "id": "eq-experiment-3",
     "type": "equation",
     "page": 13,
     "original": "1.21 0.769 2.83 3.34"
    },
    {
     "id": "eq-experiment-4",
     "type": "equation",
     "page": 13,
     "original": "w/o APG"
    },
    {
     "id": "eq-experiment-5",
     "type": "equation",
     "page": 13,
     "original": "1.18 0.812 3.06 3.38"
    }
   ]
  },
  {
   "id": "sec-5-3-3",
   "num": "5.3.3",
   "level": 2,
   "page": 13,
   "title": {
    "original": "RQ3: Effectiveness of the Proposed Techniques for Inference",
    "zh": "RQ3：所提推理改进技术的有效性"
   },
   "blocks": [
    {
     "id": "p-5-3-3-1",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-5-3-3-1-1",
       "original": "Finally, we address RQ3 by evaluating the individual contributions of solving the training-inference mismatch and APG.",
       "zh": "最后，我们通过评估解决训练-推理不一致与 APG 各自的贡献来回答 RQ3。"
      },
      {
       "id": "s-5-3-3-1-2",
       "original": "To this end, we conduct two targeted ablation experiments on the LongCat-AudioDiT-1B backbone.",
       "zh": "为此，我们在 LongCat-AudioDiT-1B 主干上做了两组针对性的消融实验。"
      },
      {
       "id": "s-5-3-3-1-3",
       "original": "In the first configuration (training-inference mismatch), we keep zctx t as the model prediction and do not overwrite it with the GT noisy latent for inference.",
       "zh": "第一种配置（训练-推理失配）：保留 z^ctx_t 为模型预测值，推理时不用 GT 带噪潜变量覆写。"
      },
      {
       "id": "s-5-3-3-1-4",
       "original": "We also retain zctx t to compute the unconditional velocity.",
       "zh": "同时保留 z^ctx_t 用于计算无条件速度。"
      },
      {
       "id": "s-5-3-3-1-5",
       "original": "In the second configuration (w/o APG), we replace the APG inference algorithm with standard CFG (Eq. 8).",
       "zh": "在第二组配置（w/o APG）中，我们把 APG 推理算法替换为标准 CFG（式 8）。"
      },
      {
       "id": "s-5-3-3-1-6",
       "original": "The comparative results are summarized in Table 4.",
       "zh": "对比结果汇总于表 4。"
      }
     ]
    },
    {
     "id": "p-5-3-3-2",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-5-3-3-2-1",
       "original": "• Impact of the training-inference mismatch: The overall performance of the utterances synthesized by LongCat-AudioDiT-1B consistently and significantly outperforms those synthesized without solving the training-inference mismatch problem.",
       "zh": "• 训练-推理不一致的影响：LongCat-AudioDiT-1B 合成语音的整体性能一致且显著优于不解决训练-推理不一致问题时的合成结果。"
      },
      {
       "id": "s-5-3-3-2-2",
       "original": "This clear performance degradation validates the existence of the recognized problem and the effectiveness of our method to mitigate it. • Impact of APG: While the baseline model employing standard CFG achieves comparable intelligibility (CER) and speaker similarity (SIM) scores, the integration of APG yields superior UTMOS and DNSMOS scores.",
       "zh": "这一明显的性能劣化验证了该问题的存在以及我们缓解方法的有效性。• APG 的影响：采用标准 CFG 的基线模型在可懂度（CER）与说话人相似度（SIM）上与之相当，但引入 APG 后 UTMOS 与 DNSMOS 得分更优。"
      }
     ]
    },
    {
     "id": "p-5-3-3-3",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-5-3-3-3-1",
       "original": "This demonstrates that APG effectively mitigates the oversaturation artifacts inherent to high-scale CFG, thereby elevating the perceptual naturalness and overall acoustic quality of the synthesized speech.",
       "zh": "这表明 APG 有效缓解了高引导尺度 CFG 固有的过饱和伪影，从而提升了合成语音的感知自然度与整体声学质量。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-6",
   "num": "6",
   "level": 1,
   "page": 13,
   "title": {
    "original": "Conclusion and Future Work",
    "zh": "6 结论与未来工作"
   },
   "blocks": [
    {
     "id": "p-6-1",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-6-1-1",
       "original": "In this paper, we present LongCat-AudioDiT, a state-of-the-art non-autoregressive diffusion-based TTS model.",
       "zh": "本文提出了 LongCat-AudioDiT——一个最先进的非自回归扩散式 TTS 模型。"
      },
      {
       "id": "s-6-1-2",
       "original": "The core advancement of LongCat-AudioDiT lies in modeling the generative process directly within the waveform latent space, bypassing intermediate acoustic representations such as mel-spectrograms widely adopted in prior literature.",
       "zh": "LongCat-AudioDiT 的核心进展在于直接在波形潜空间中建模生成过程，绕开了以往文献广泛采用的梅尔频谱图等中间声学表征。"
      },
      {
       "id": "s-6-1-3",
       "original": "This unified design not only drastically simplifies the overall TTS pipeline but also fundamentally eliminates the compounding errors inherently caused by two-stage acoustic-to-waveform conversions.",
       "zh": "这种统一设计不仅大幅简化了整体 TTS 流水线，也从根本上消除了两阶段「声学表征→波形」转换所固有的误差累积。"
      },
      {
       "id": "s-6-1-4",
       "original": "Furthermore, we introduce two critical improvements to the inference process: first, we identify and rectify a long-standing training-inference mismatch; second, we replace traditional CFG with APG to elevate generation quality.",
       "zh": "此外，我们对推理过程引入了两项关键改进：第一，识别并修正了一个长期存在的训练-推理不一致；第二，用 APG 替代传统 CFG 以提升生成质量。"
      }
     ]
    },
    {
     "id": "p-6-2",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-6-2-1",
       "original": "Extensive experimental results demonstrate that LongCat-AudioDiT achieves new SOTA zero-shot speaker similarity on the rigorous Seed benchmark while maintaining competitive intelligibility.",
       "zh": "大量实验结果表明，LongCat-AudioDiT 在严格的 Seed 基准上取得了新的 SOTA 零样本说话人相似度，同时保持了有竞争力的可懂度。"
      },
      {
       "id": "s-6-2-2",
       "original": "Notably, this is accomplished through an end-to-end approach, without relying on sophisticated multi-stage training pipelines or expensive high-quality human annotations.",
       "zh": "值得注意的是，这一切是通过端到端方式实现的，不依赖复杂的多阶段训练流水线，也不依赖昂贵的高质量人工标注。"
      },
      {
       "id": "s-6-2-3",
       "original": "By outperforming previous diffusion-based baselines by a considerable margin, our work robustly validates the superiority of waveform-level latent modeling over traditional intermediate representations.",
       "zh": "我们的工作以相当大的优势超越了以往的扩散式基线，有力地验证了波形级潜变量建模相对于传统中间表征的优越性。"
      }
     ]
    },
    {
     "id": "p-6-3",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-6-3-1",
       "original": "Finally, through comprehensive ablation studies, we systematically dissect the individual contributions of our proposed components.",
       "zh": "最后，通过全面的消融研究，我们系统地拆解了所提各组件的独立贡献。"
      },
      {
       "id": "s-6-3-2",
       "original": "Most importantly, our deep dive into the interplay between the Wav-VAE’s reconstruction fidelity (e.g., varying dimensions and frame rates) and the downstream TTS generation quality reveals nontrivial trade-offs.",
       "zh": "最重要的是，我们对 Wav-VAE 重建保真度（如不同维度与帧率）与下游 TTS 生成质量之间相互作用的深入剖析，揭示了非平凡的权衡。"
      },
      {
       "id": "s-6-3-3",
       "original": "We believe these empirical insights advance the understanding of the synergy between representation learning and generative modeling, shedding light on the future design of audio foundation models.",
       "zh": "我们相信，这些实证洞见推进了对表征学习与生成建模之间协同关系的理解，为未来的音频基础模型设计提供了启示。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-future-work",
   "num": null,
   "level": 2,
   "page": 13,
   "title": {
    "original": "Future Work",
    "zh": "未来工作"
   },
   "blocks": [
    {
     "id": "p-future-work-1",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-future-work-1-1",
       "original": "Promising directions for future research include pushing the performance ceiling via alignmentfree reinforcement learning (RLHF for audio), and accelerating the inference speed through knowledge distillation techniques for real-time deployment.",
       "zh": "有前景的未来研究方向包括：通过免对齐的强化学习（面向音频的 RLHF）进一步推高性能上限，以及通过知识蒸馏技术加速推理，实现实时部署。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-7",
   "num": "7",
   "level": 1,
   "page": 14,
   "title": {
    "original": "Contributor Core Contributors",
    "zh": "贡献者：核心贡献者"
   },
   "blocks": [
    {
     "id": "p-7-1",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-7-1-1",
       "original": "Detai Xin, Shujie Hu, Chengzuo Yang",
       "zh": "Detai Xin、Shujie Hu、Chengzuo Yang"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-tech-leads",
   "num": null,
   "level": 2,
   "page": 14,
   "title": {
    "original": "Tech Leads",
    "zh": "技术负责人"
   },
   "blocks": [
    {
     "id": "p-tech-leads-1",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-tech-leads-1-1",
       "original": "Chen Huang, Guoqiao Yu, Guanglu Wan, Xunliang Cai",
       "zh": "Chen Huang、Guoqiao Yu、Guanglu Wan、Xunliang Cai"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-contributors",
   "num": null,
   "level": 2,
   "page": 14,
   "title": {
    "original": "Contributors",
    "zh": "贡献者"
   },
   "blocks": [
    {
     "id": "p-contributors-1",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-contributors-1-1",
       "original": "(Sorted in alphabetical order) Disong Wang, Fengjiao Chen, Fengyu Yang, Hui Yang, Jiamu Li, Jun Wang, Qi Li, Qian Yang, Quanxiu Wang, Rumei Li, Shuaiqi Chen, Xu Xiang, Xuezhi Cao, Yi Chen, Yuchen Sun, Zheng Zhang, Zhiqing Hong, Ziwen Wang",
       "zh": "（按字母序排列）Disong Wang、Fengjiao Chen、Fengyu Yang、Hui Yang、Jiamu Li、Jun Wang、Qi Li、Qian Yang、Quanxiu Wang、Rumei Li、Shuaiqi Chen、Xu Xiang、Xuezhi Cao、Yi Chen、Yuchen Sun、Zheng Zhang、Zhiqing Hong、Ziwen Wang"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-references",
   "num": null,
   "level": 1,
   "page": 14,
   "title": {
    "original": "References",
    "zh": "References"
   },
   "blocks": [
    {
     "id": "p-references-1",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-1-1",
       "original": "Chengyi Wang, Sanyuan Chen, Yu Wu, Ziqiang Zhang, Long Zhou, Shujie Liu, Zhuo Chen, Yanqing Liu, Huaming Wang, Jinyu Li, et al. Neural codec language models are zero-shot text to speech synthesizers."
      }
     ]
    },
    {
     "id": "p-references-2",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-2-1",
       "original": "arXiv preprint arXiv:2301.02111, 2023."
      }
     ]
    },
    {
     "id": "p-references-3",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-3-1",
       "original": "Matthew Le, Apoorv Vyas, Bowen Shi, Brian Karrer, Leda Sari, Rashel Moritz, Mary Williamson, Vimal Manohar, Yossi Adi, Jay Mahadeokar, et al. Voicebox: Text-guided multilingual universal speech generation at scale."
      }
     ]
    },
    {
     "id": "p-references-4",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-4-1",
       "original": "Advances in neural information processing systems, 36, 2024."
      }
     ]
    },
    {
     "id": "p-references-5",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-5-1",
       "original": "Philip Anastassiou, Jiawei Chen, Jitong Chen, Yuanzhe Chen, Zhuo Chen, Ziyi Chen, Jian Cong, Lelai Deng, Chuang Ding, Lu Gao, et al. Seed-tts: A family of high-quality versatile speech generation models. arXiv preprint arXiv:2406.02430, 2024."
      }
     ]
    },
    {
     "id": "p-references-6",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-6-1",
       "original": "Zeqian Ju, Yuancheng Wang, Kai Shen, Xu Tan, Detai Xin, Dongchao Yang, Yanqing Liu, Yichong Leng, Kaitao Song, Siliang Tang, et al. Naturalspeech 3: Zero-shot speech synthesis with factorized codec and diffusion models. arXiv preprint arXiv:2403.03100, 2024."
      }
     ]
    },
    {
     "id": "p-references-7",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-7-1",
       "original": "Zhihao Du, Changfeng Gao, Yuxuan Wang, Fan Yu, Tianyu Zhao, Hao Wang, Xiang Lv, Hui Wang, Chongjia Ni, Xian Shi, et al. Cosyvoice 3: Towards in-the-wild speech generation via scaling-up and post-training. arXiv preprint arXiv:2505.17589, 2025."
      }
     ]
    },
    {
     "id": "p-references-8",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-8-1",
       "original": "Bowen Zhang, Congchao Guo, Geng Yang, Hang Yu, Haozhe Zhang, Heidi Lei, Jialong Mai, Junjie Yan, Kaiyue Yang, Mingqi Yang, et al. Minimax-speech: Intrinsic zero-shot text-to-speech with a learnable speaker encoder. arXiv preprint arXiv:2505.07916, 2025."
      }
     ]
    },
    {
     "id": "p-references-9",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-9-1",
       "original": "Yi Ren, Yangjun Ruan, Xu Tan, Tao Qin, Sheng Zhao, Zhou Zhao, and Tie-Yan Liu."
      },
      {
       "id": "s-references-9-2",
       "original": "Fastspeech: Fast, robust and controllable text to speech."
      },
      {
       "id": "s-references-9-3",
       "original": "Proc."
      },
      {
       "id": "s-references-9-4",
       "original": "NeurIPS, 32, 2019."
      }
     ]
    },
    {
     "id": "p-references-10",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-10-1",
       "original": "Sefik Emre Eskimez, Xiaofei Wang, Manthan Thakker, Canrun Li, Chung-Hsien Tsai, Zhen Xiao, Hemin Yang, Zirun Zhu, Min Tang, Xu Tan, et al. E2 tts: Embarrassingly easy fully non-autoregressive zero-shot tts."
      },
      {
       "id": "s-references-10-2",
       "original": "In 2024 IEEE spoken language technology workshop (SLT), pages 682–689."
      },
      {
       "id": "s-references-10-3",
       "original": "IEEE, 2024a."
      }
     ]
    },
    {
     "id": "p-references-11",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-11-1",
       "original": "Yushen Chen, Zhikang Niu, Ziyang Ma, Keqi Deng, Chunhui Wang, Jian Zhao, Kai Yu, and Xie Chen."
      },
      {
       "id": "s-references-11-2",
       "original": "F5-tts: A fairytaler that fakes fluent and faithful speech with flow matching. arXiv preprint arXiv:2410.06885, 2024a."
      }
     ]
    },
    {
     "id": "p-references-12",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-12-1",
       "original": "Keon Lee, Dong Won Kim, Jaehyeon Kim, Seungjun Chung, and Jaewoong Cho."
      },
      {
       "id": "s-references-12-2",
       "original": "Ditto-tts: Diffusion transformers for scalable text-to-speech without domain-specific factors. arXiv preprint arXiv:2406.11427, 2024."
      }
     ]
    },
    {
     "id": "p-references-13",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-13-1",
       "original": "James Betker."
      },
      {
       "id": "s-references-13-2",
       "original": "Better speech synthesis through scaling. arXiv preprint arXiv:2305.07243, 2023."
      }
     ]
    },
    {
     "id": "p-references-14",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-14-1",
       "original": "Zhihao Du, Qian Chen, Shiliang Zhang, Kai Hu, Heng Lu, Yexin Yang, Hangrui Hu, Siqi Zheng, Yue Gu, Ziyang Ma, et al. Cosyvoice: A scalable multilingual zero-shot text-to-speech synthesizer based on supervised semantic tokens. arXiv preprint arXiv:2407.05407, 2024a."
      }
     ]
    },
    {
     "id": "p-references-15",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-15-1",
       "original": "Diederik P Kingma and Max Welling."
      },
      {
       "id": "s-references-15-2",
       "original": "Auto-encoding variational bayes. arXiv preprint arXiv:1312.6114, 2013."
      }
     ]
    },
    {
     "id": "p-references-16",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-16-1",
       "original": "Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N Gomez, Łukasz Kaiser, and Illia Polosukhin."
      },
      {
       "id": "s-references-16-2",
       "original": "Attention is all you need."
      },
      {
       "id": "s-references-16-3",
       "original": "Advances in neural information processing systems, 30, 2017."
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
       "original": "William Peebles and Saining Xie."
      },
      {
       "id": "s-references-17-2",
       "original": "Scalable diffusion models with transformers."
      },
      {
       "id": "s-references-17-3",
       "original": "In Proceedings of the IEEE/CVF international conference on computer vision, pages 4195–4205, 2023."
      }
     ]
    },
    {
     "id": "p-references-18",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-18-1",
       "original": "Vadim Popov, Ivan Vovk, Vladimir Gogoryan, Tasnima Sadekova, and Mikhail Kudinov."
      },
      {
       "id": "s-references-18-2",
       "original": "Grad-tts: A diffusion probabilistic model for text-to-speech."
      },
      {
       "id": "s-references-18-3",
       "original": "In International Conference on Machine Learning, pages 8599–8608."
      }
     ]
    },
    {
     "id": "p-references-19",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-19-1",
       "original": "PMLR, 2021."
      }
     ]
    },
    {
     "id": "p-references-20",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-20-1",
       "original": "Myeonghun Jeong, Hyeongju Kim, Sung Jun Cheon, Byoung Jin Choi, and Nam Soo Kim."
      },
      {
       "id": "s-references-20-2",
       "original": "Diff-tts: A denoising diffusion model for text-to-speech. arXiv preprint arXiv:2104.01409, 2021."
      }
     ]
    },
    {
     "id": "p-references-21",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-21-1",
       "original": "Jascha Sohl-Dickstein, Eric Weiss, Niru Maheswaranathan, and Surya Ganguli."
      },
      {
       "id": "s-references-21-2",
       "original": "Deep unsupervised learning using nonequilibrium thermodynamics."
      },
      {
       "id": "s-references-21-3",
       "original": "In International conference on machine learning, pages 2256–2265."
      }
     ]
    },
    {
     "id": "p-references-22",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-22-1",
       "original": "pmlr, 2015."
      }
     ]
    },
    {
     "id": "p-references-23",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-23-1",
       "original": "Yang Song, Jascha Sohl-Dickstein, Diederik P Kingma, Abhishek Kumar, Stefano Ermon, and Ben Poole."
      }
     ]
    },
    {
     "id": "p-references-24",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-24-1",
       "original": "Score-based generative modeling through stochastic differential equations. arXiv preprint arXiv:2011.13456,"
      }
     ]
    },
    {
     "id": "eq-references-1",
     "type": "equation",
     "page": 15,
     "original": "2020."
    },
    {
     "id": "p-references-25",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-25-1",
       "original": "Jonathan Ho, Ajay Jain, and Pieter Abbeel."
      },
      {
       "id": "s-references-25-2",
       "original": "Denoising diffusion probabilistic models."
      },
      {
       "id": "s-references-25-3",
       "original": "Advances in neural information processing systems, 33:6840–6851, 2020."
      }
     ]
    },
    {
     "id": "p-references-26",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-26-1",
       "original": "Yaron Lipman, Ricky TQ Chen, Heli Ben-Hamu, Maximilian Nickel, and Matthew Le."
      },
      {
       "id": "s-references-26-2",
       "original": "Flow matching for generative modeling."
      },
      {
       "id": "s-references-26-3",
       "original": "In The Eleventh International Conference on Learning Representations, 2022."
      }
     ]
    },
    {
     "id": "p-references-27",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-27-1",
       "original": "Ricky T."
      },
      {
       "id": "s-references-27-2",
       "original": "Q."
      },
      {
       "id": "s-references-27-3",
       "original": "Chen. torchdiffeq, 2018."
      },
      {
       "id": "s-references-27-4",
       "original": "URL https://github.com/rtqichen/torchdiffeq."
      }
     ]
    },
    {
     "id": "p-references-28",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-28-1",
       "original": "Shivam Mehta, Ruibo Tu, Jonas Beskow, Éva Székely, and Gustav Eje Henter."
      },
      {
       "id": "s-references-28-2",
       "original": "Matcha-tts: A fast tts architecture with conditional flow matching."
      },
      {
       "id": "s-references-28-3",
       "original": "In ICASSP 2024-2024 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP), pages 11341–11345."
      },
      {
       "id": "s-references-28-4",
       "original": "IEEE, 2024."
      }
     ]
    },
    {
     "id": "p-references-29",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-29-1",
       "original": "Sefik Emre Eskimez, Xiaofei Wang, Manthan Thakker, Canrun Li, Chung-Hsien Tsai, Zhen Xiao, Hemin Yang, Zirun Zhu, Min Tang, Xu Tan, et al. E2 tts: Embarrassingly easy fully non-autoregressive zero-shot tts."
      },
      {
       "id": "s-references-29-2",
       "original": "In 2024 IEEE Spoken Language Technology Workshop (SLT), pages 682–689."
      },
      {
       "id": "s-references-29-3",
       "original": "IEEE, 2024b."
      }
     ]
    },
    {
     "id": "p-references-30",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-30-1",
       "original": "Michael Albergo, Nicholas M Boffi, and Eric Vanden-Eijnden."
      },
      {
       "id": "s-references-30-2",
       "original": "Stochastic interpolants: A unifying framework for flows and diffusions."
      },
      {
       "id": "s-references-30-3",
       "original": "Journal of Machine Learning Research, 26(209):1–80, 2025."
      }
     ]
    },
    {
     "id": "p-references-31",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-31-1",
       "original": "Xingchao Liu, Chengyue Gong, and Qiang Liu."
      },
      {
       "id": "s-references-31-2",
       "original": "Flow straight and fast: Learning to generate and transfer data with rectified flow. arXiv preprint arXiv:2209.03003, 2022a."
      }
     ]
    },
    {
     "id": "p-references-32",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-32-1",
       "original": "Kai Shen, Zeqian Ju, Xu Tan, Yanqing Liu, Yichong Leng, Lei He, Tao Qin, Sheng Zhao, and Jiang Bian."
      }
     ]
    },
    {
     "id": "p-references-33",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-33-1",
       "original": "Naturalspeech 2: Latent diffusion models are natural and zero-shot speech and singing synthesizers. arXiv preprint arXiv:2304.09116, 2023."
      }
     ]
    },
    {
     "id": "p-references-34",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-34-1",
       "original": "Han Zhu, Wei Kang, Zengwei Yao, Liyong Guo, Fangjun Kuang, Zhaoqing Li, Weiji Zhuang, Long Lin, and Daniel Povey."
      },
      {
       "id": "s-references-34-2",
       "original": "Zipvoice: Fast and high-quality zero-shot text-to-speech with flow matching. arXiv preprint arXiv:2506.13053, 2025."
      }
     ]
    },
    {
     "id": "p-references-35",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-35-1",
       "original": "Yuan Gao, Nobuyuki Morioka, Yu Zhang, and Nanxin Chen."
      },
      {
       "id": "s-references-35-2",
       "original": "E3 tts: Easy end-to-end diffusion-based text to speech."
      },
      {
       "id": "s-references-35-3",
       "original": "In 2023 IEEE Automatic Speech Recognition and Understanding Workshop (ASRU), pages 1–8."
      },
      {
       "id": "s-references-35-4",
       "original": "IEEE, 2023a."
      }
     ]
    },
    {
     "id": "p-references-36",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-36-1",
       "original": "Robin Rombach, Andreas Blattmann, Dominik Lorenz, Patrick Esser, and Björn Ommer."
      },
      {
       "id": "s-references-36-2",
       "original": "High-resolution image synthesis with latent diffusion models."
      },
      {
       "id": "s-references-36-3",
       "original": "In Proceedings of the IEEE/CVF conference on computer vision and pattern recognition, pages 10684–10695, 2022."
      }
     ]
    },
    {
     "id": "p-references-37",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-37-1",
       "original": "Yanqing Liu, Ruiqing Xue, Lei He, Xu Tan, and Sheng Zhao."
      },
      {
       "id": "s-references-37-2",
       "original": "Delightfultts 2: End-to-end speech synthesis with adversarial vector-quantized auto-encoders."
      },
      {
       "id": "s-references-37-3",
       "original": "In Proc."
      },
      {
       "id": "s-references-37-4",
       "original": "Interspeech, 2022b."
      }
     ]
    },
    {
     "id": "p-references-38",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-38-1",
       "original": "Yongjoon Lee and Chanwoo Kim."
      },
      {
       "id": "s-references-38-2",
       "original": "Wave-u-mamba: an end-to-end framework for high-quality and efficient speech super resolution."
      },
      {
       "id": "s-references-38-3",
       "original": "In Proc."
      },
      {
       "id": "s-references-38-4",
       "original": "ICASSP, 2025."
      }
     ]
    },
    {
     "id": "p-references-39",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-39-1",
       "original": "Chunyu Qiang, Hao Li, Yixin Tian, Yi Zhao, et al. High-fidelity speech synthesis with minimal supervision: All using diffusion models."
      },
      {
       "id": "s-references-39-2",
       "original": "In Proc."
      },
      {
       "id": "s-references-39-3",
       "original": "ICASSP, 2024."
      }
     ]
    },
    {
     "id": "p-references-40",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-40-1",
       "original": "Zhikang Niu, Shujie Hu, Jeongsoo Choi, Yushen Chen, Peining Chen, Pengcheng Zhu, Yunting Yang, Bowen Zhang, Jian Zhao, Chunhui Wang, et al. Semantic-vae: Semantic-alignment latent representation for better speech synthesis. arXiv preprint arXiv:2509.22167, 2025."
      }
     ]
    },
    {
     "id": "p-references-41",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-41-1",
       "original": "Zach Evans, CJ Carr, Josiah Taylor, Scott H Hawley, and Jordi Pons."
      },
      {
       "id": "s-references-41-2",
       "original": "Fast timing-conditioned latent audio diffusion."
      },
      {
       "id": "s-references-41-3",
       "original": "In Forty-first International Conference on Machine Learning, 2024."
      }
     ]
    },
    {
     "id": "p-references-42",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-42-1",
       "original": "Liu Ziyin, Tilman Hartwig, and Masahito Ueda."
      },
      {
       "id": "s-references-42-2",
       "original": "Neural networks fail to learn periodic functions and how to fix it."
      },
      {
       "id": "s-references-42-3",
       "original": "Advances in Neural Information Processing Systems, 33:1583–1594, 2020."
      },
      {
       "id": "s-references-42-4",
       "original": "Chun Yat Wu, Jiajun Deng, Guinan Li, Qiuqiang Kong, and Simon Lui."
      },
      {
       "id": "s-references-42-5",
       "original": "Clear: Continuous latent autoregressive modeling for high-quality and low-latency speech synthesis. arXiv preprint arXiv:2508.19098, 2025."
      },
      {
       "id": "s-references-42-6",
       "original": "Neil Zeghidour, Alejandro Luebs, Ahmed Omran, Jan Skoglund, and Marco Tagliasacchi."
      },
      {
       "id": "s-references-42-7",
       "original": "Soundstream: An end-to-end neural audio codec."
      },
      {
       "id": "s-references-42-8",
       "original": "IEEE/ACM Transactions on Audio, Speech, and Language Processing, 30:"
      }
     ]
    },
    {
     "id": "eq-references-2",
     "type": "equation",
     "page": 16,
     "original": "495–507, 2021."
    },
    {
     "id": "p-references-43",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-43-1",
       "original": "Rithesh Kumar, Prem Seetharaman, Alejandro Luebs, Ishaan Kumar, and Kundan Kumar."
      },
      {
       "id": "s-references-43-2",
       "original": "High-fidelity audio compression with improved rvqgan."
      },
      {
       "id": "s-references-43-3",
       "original": "Advances in Neural Information Processing Systems, 36:27980–27993,"
      }
     ]
    },
    {
     "id": "eq-references-3",
     "type": "equation",
     "page": 16,
     "original": "2023."
    },
    {
     "id": "p-references-44",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-44-1",
       "original": "Jungil Kong, Jaehyeon Kim, and Jaekyoung Bae."
      },
      {
       "id": "s-references-44-2",
       "original": "Hifi-gan: Generative adversarial networks for efficient and high fidelity speech synthesis."
      },
      {
       "id": "s-references-44-3",
       "original": "In Advances in Neural Information Processing Systems, volume 33, pages 17022–17033."
      },
      {
       "id": "s-references-44-4",
       "original": "Curran Associates, Inc., 2020."
      },
      {
       "id": "s-references-44-5",
       "original": "Jonathan Ho and Tim Salimans."
      },
      {
       "id": "s-references-44-6",
       "original": "Classifier-free diffusion guidance."
      },
      {
       "id": "s-references-44-7",
       "original": "In NeurIPS 2021 Workshop on Deep Generative Models and Downstream Applications, 2021."
      },
      {
       "id": "s-references-44-8",
       "original": "Ethan Perez, Florian Strub, Harm De Vries, Vincent Dumoulin, and Aaron Courville."
      },
      {
       "id": "s-references-44-9",
       "original": "Film: Visual reasoning with a general conditioning layer."
      },
      {
       "id": "s-references-44-10",
       "original": "In Proceedings of the AAAI conference on artificial intelligence, volume 32,"
      }
     ]
    },
    {
     "id": "eq-references-4",
     "type": "equation",
     "page": 16,
     "original": "2018."
    },
    {
     "id": "p-references-45",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-45-1",
       "original": "Alex Henry, Prudhvi Raj Dachapally, Shubham Shantaram Pawar, and Yuxuan Chen."
      },
      {
       "id": "s-references-45-2",
       "original": "Query-key normalization for transformers."
      },
      {
       "id": "s-references-45-3",
       "original": "In Findings of the Association for Computational Linguistics: EMNLP 2020, pages 4246–4253,"
      }
     ]
    },
    {
     "id": "eq-references-5",
     "type": "equation",
     "page": 16,
     "original": "2020."
    },
    {
     "id": "p-references-46",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-46-1",
       "original": "Jimmy Lei Ba, Jamie Ryan Kiros, and Geoffrey E Hinton."
      },
      {
       "id": "s-references-46-2",
       "original": "Layer normalization. arXiv preprint arXiv:1607.06450,"
      }
     ]
    },
    {
     "id": "eq-references-6",
     "type": "equation",
     "page": 16,
     "original": "2016."
    },
    {
     "id": "p-references-47",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-47-1",
       "original": "Biao Zhang and Rico Sennrich."
      },
      {
       "id": "s-references-47-2",
       "original": "Root mean square layer normalization."
      },
      {
       "id": "s-references-47-3",
       "original": "Advances in neural information processing systems, 32, 2019."
      },
      {
       "id": "s-references-47-4",
       "original": "Jianlin Su, Murtadha Ahmed, Yu Lu, Shengfeng Pan, Wen Bo, and Yunfeng Liu."
      }
     ]
    },
    {
     "id": "p-references-48",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-48-1",
       "original": "Roformer: Enhanced transformer with rotary position embedding."
      },
      {
       "id": "s-references-48-2",
       "original": "Neurocomputing, 568:127063, 2024."
      },
      {
       "id": "s-references-48-3",
       "original": "Shoufa Chen, Mengmeng Xu, Jiawei Ren, Yuren Cong, Sen He, Yanping Xie, Animesh Sinha, Ping Luo, Tao Xiang, and Juan-Manuel Perez-Rua."
      },
      {
       "id": "s-references-48-4",
       "original": "Gentron: Diffusion transformers for image and video generation."
      },
      {
       "id": "s-references-48-5",
       "original": "In Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition, pages 6441–6451, 2024b."
      },
      {
       "id": "s-references-48-6",
       "original": "Sihyun Yu, Sangkyung Kwak, Huiwon Jang, Jongheon Jeong, Jonathan Huang, Jinwoo Shin, and Saining Xie."
      }
     ]
    },
    {
     "id": "p-references-49",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-49-1",
       "original": "Representation alignment for generation: Training diffusion transformers is easier than you think. arXiv preprint arXiv:2410.06940, 2024."
      },
      {
       "id": "s-references-49-2",
       "original": "Marcely Zanon Boito, Vivek Iyer, Nikolaos Lagos, Laurent Besacier, and Ioan Calapodescu. mhubert-147: A compact multilingual hubert model. arXiv preprint arXiv:2406.06371, 2024."
      },
      {
       "id": "s-references-49-3",
       "original": "Linting Xue, Aditya Barua, Noah Constant, Rami Al-Rfou, Sharan Narang, Mihir Kale, Adam Roberts, and Colin Raffel."
      },
      {
       "id": "s-references-49-4",
       "original": "Byt5: Towards a token-free future with pre-trained byte-to-byte models."
      },
      {
       "id": "s-references-49-5",
       "original": "Transactions of the Association for Computational Linguistics, 10:291–306, 2022."
      },
      {
       "id": "s-references-49-6",
       "original": "Hyung Won Chung, Noah Constant, Xavier Garcia, Adam Roberts, Yi Tay, Sharan Narang, and Orhan Firat."
      }
     ]
    },
    {
     "id": "p-references-50",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-50-1",
       "original": "Unimax: Fairer and more effective language sampling for large-scale multilingual pretraining. arXiv preprint arXiv:2304.09151, 2023."
      },
      {
       "id": "s-references-50-2",
       "original": "Sanghyun Woo, Shoubhik Debnath, Ronghang Hu, Xinlei Chen, Zhuang Liu, In So Kweon, and Saining Xie."
      }
     ]
    },
    {
     "id": "p-references-51",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-51-1",
       "original": "Convnext v2: Co-designing and scaling convnets with masked autoencoders."
      },
      {
       "id": "s-references-51-2",
       "original": "In Proceedings of the IEEE/CVF conference on computer vision and pattern recognition, pages 16133–16142, 2023."
      },
      {
       "id": "s-references-51-3",
       "original": "Tuomas Kynkäänniemi, Miika Aittala, Tero Karras, Samuli Laine, Timo Aila, and Jaakko Lehtinen."
      },
      {
       "id": "s-references-51-4",
       "original": "Applying guidance in a limited interval improves sample and distribution quality in diffusion models."
      },
      {
       "id": "s-references-51-5",
       "original": "Advances in Neural Information Processing Systems, 37:122458–122483, 2024."
      },
      {
       "id": "s-references-51-6",
       "original": "Seyedmorteza Sadat, Otmar Hilliges, and Romann M Weber."
      },
      {
       "id": "s-references-51-7",
       "original": "Eliminating oversaturation and artifacts of high guidance scales in diffusion models."
      },
      {
       "id": "s-references-51-8",
       "original": "In The Thirteenth International Conference on Learning Representations,"
      }
     ]
    },
    {
     "id": "eq-references-7",
     "type": "equation",
     "page": 16,
     "original": "2024."
    },
    {
     "id": "p-references-52",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-52-1",
       "original": "Ilya Loshchilov and Frank Hutter."
      },
      {
       "id": "s-references-52-2",
       "original": "Decoupled weight decay regularization."
      },
      {
       "id": "s-references-52-3",
       "original": "In Proc."
      },
      {
       "id": "s-references-52-4",
       "original": "ICLR, 2018."
      },
      {
       "id": "s-references-52-5",
       "original": "Heiga Zen, Viet Dang, Rob Clark, Yu Zhang, Ron J Weiss, Ye Jia, Zhifeng Chen, and Yonghui Wu."
      },
      {
       "id": "s-references-52-6",
       "original": "Libritts: A corpus derived from librispeech for text-to-speech."
      },
      {
       "id": "s-references-52-7",
       "original": "Proc."
      },
      {
       "id": "s-references-52-8",
       "original": "Interspeech, 2019."
      }
     ]
    },
    {
     "id": "p-references-53",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-53-1",
       "original": "Antony W Rix, John G Beerends, Michael P Hollier, and Andries P Hekstra."
      },
      {
       "id": "s-references-53-2",
       "original": "Perceptual evaluation of speech quality (pesq)-a new method for speech quality assessment of telephone networks and codecs."
      },
      {
       "id": "s-references-53-3",
       "original": "In Proc."
      }
     ]
    },
    {
     "id": "p-references-54",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-54-1",
       "original": "ICASSP, volume 2, pages 749–752."
      },
      {
       "id": "s-references-54-2",
       "original": "IEEE, 2001."
      }
     ]
    },
    {
     "id": "p-references-55",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-55-1",
       "original": "Cees H Taal, Richard C Hendriks, Richard Heusdens, and Jesper Jensen."
      },
      {
       "id": "s-references-55-2",
       "original": "An algorithm for intelligibility prediction of time–frequency weighted noisy speech."
      },
      {
       "id": "s-references-55-3",
       "original": "IEEE Transactions on audio, speech, and language processing, 19(7):2125–2136, 2011."
      }
     ]
    },
    {
     "id": "p-references-56",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-56-1",
       "original": "Alec Radford, Jong Wook Kim, Tao Xu, Greg Brockman, Christine McLeavey, and Ilya Sutskever."
      },
      {
       "id": "s-references-56-2",
       "original": "Robust speech recognition via large-scale weak supervision."
      },
      {
       "id": "s-references-56-3",
       "original": "In International conference on machine learning, pages 28492–28518."
      },
      {
       "id": "s-references-56-4",
       "original": "PMLR, 2023."
      }
     ]
    },
    {
     "id": "p-references-57",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-57-1",
       "original": "Zhifu Gao, Zerui Li, Jiaming Wang, Haoneng Luo, Xian Shi, Mengzhe Chen, Yabin Li, Lingyun Zuo, Zhihao Du, and Shiliang Zhang."
      },
      {
       "id": "s-references-57-2",
       "original": "Funasr: A fundamental end-to-end speech recognition toolkit."
      },
      {
       "id": "s-references-57-3",
       "original": "In Interspeech 2023, pages 1593–1597, 2023b. doi:10.21437/Interspeech.2023-1428."
      }
     ]
    },
    {
     "id": "p-references-58",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-58-1",
       "original": "Sanyuan Chen, Chengyi Wang, Zhengyang Chen, Yu Wu, Shujie Liu, Zhuo Chen, Jinyu Li, Naoyuki Kanda, Takuya Yoshioka, Xiong Xiao, et al. Wavlm: Large-scale self-supervised pre-training for full stack speech processing."
      },
      {
       "id": "s-references-58-2",
       "original": "IEEE Journal of Selected Topics in Signal Processing, 16(6):1505–1518, 2022."
      }
     ]
    },
    {
     "id": "p-references-59",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-59-1",
       "original": "Takaaki Saeki, Detai Xin, Wataru Nakata, Tomoki Koriyama, Shinnosuke Takamichi, and Hiroshi Saruwatari."
      }
     ]
    },
    {
     "id": "p-references-60",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-60-1",
       "original": "Utmos: Utokyo-sarulab system for voicemos challenge 2022. arXiv preprint arXiv:2204.02152, 2022."
      }
     ]
    },
    {
     "id": "p-references-61",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-61-1",
       "original": "Chandan KA Reddy, Vishak Gopal, and Ross Cutler."
      },
      {
       "id": "s-references-61-2",
       "original": "Dnsmos: A non-intrusive perceptual objective speech quality metric to evaluate noise suppressors."
      },
      {
       "id": "s-references-61-3",
       "original": "In ICASSP 2021-2021 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP), pages 6493–6497."
      },
      {
       "id": "s-references-61-4",
       "original": "IEEE, 2021."
      }
     ]
    },
    {
     "id": "p-references-62",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-62-1",
       "original": "Yuancheng Wang, Haoyue Zhan, Liwei Liu, Ruihong Zeng, Haotian Guo, Jiachen Zheng, Qiang Zhang, Xueyao Zhang, Shunsi Zhang, and Zhizheng Wu."
      },
      {
       "id": "s-references-62-2",
       "original": "Maskgct: Zero-shot text-to-speech with masked generative codec transformer. arXiv preprint arXiv:2409.00750, 2024."
      }
     ]
    },
    {
     "id": "p-references-63",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-63-1",
       "original": "Xiaohui Sun, Ruitong Xiao, Jianye Mo, Bowen Wu, Qun Yu, and Baoxun Wang."
      },
      {
       "id": "s-references-63-2",
       "original": "F5r-tts: Improving flowmatching based text-to-speech with group relative policy optimization. arXiv preprint arXiv:2504.02407,"
      }
     ]
    },
    {
     "id": "eq-references-8",
     "type": "equation",
     "page": 17,
     "original": "2025."
    },
    {
     "id": "p-references-64",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-64-1",
       "original": "Xinsheng Wang, Mingqi Jiang, Ziyang Ma, Ziyu Zhang, Songxiang Liu, Linqin Li, Zheng Liang, Qixi Zheng, Rui Wang, Xiaoqin Feng, et al. Spark-tts: An efficient llm-based text-to-speech model with single-stream decoupled speech tokens. arXiv preprint arXiv:2503.01710, 2025."
      }
     ]
    },
    {
     "id": "p-references-65",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-65-1",
       "original": "Jin Xu, Zhifang Guo, Jinzheng He, Hangrui Hu, Ting He, Shuai Bai, Keqin Chen, Jialin Wang, Yang Fan, Kai Dang, et al. Qwen2. 5-omni technical report. arXiv preprint arXiv:2503.20215, 2025."
      }
     ]
    },
    {
     "id": "p-references-66",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-66-1",
       "original": "Zhihao Du, Yuxuan Wang, Qian Chen, Xian Shi, Xiang Lv, Tianyu Zhao, Zhifu Gao, Yexin Yang, Changfeng Gao, Hui Wang, et al. Cosyvoice 2: Scalable streaming speech synthesis with large language models. arXiv preprint arXiv:2412.10117, 2024b."
      }
     ]
    },
    {
     "id": "p-references-67",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-67-1",
       "original": "Hao-Han Guo, Yao Hu, Fei-Yu Shen, Xu Tang, Yi-Chen Wu, Feng-Long Xie, and Kun Xie."
      },
      {
       "id": "s-references-67-2",
       "original": "Fireredtts-1s: An upgraded streamable foundation text-to-speech system. arXiv preprint arXiv:2503.20499, 2025."
      }
     ]
    },
    {
     "id": "p-references-68",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-68-1",
       "original": "Siyi Zhou, Yiquan Zhou, Yi He, Xun Zhou, Jinchao Wang, Wei Deng, and Jingchen Shu."
      },
      {
       "id": "s-references-68-2",
       "original": "Indextts2: A breakthrough in emotionally expressive and duration-controlled auto-regressive zero-shot text-to-speech."
      }
     ]
    },
    {
     "id": "p-references-69",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-69-1",
       "original": "arXiv preprint arXiv:2506.21619, 2025a."
      }
     ]
    },
    {
     "id": "p-references-70",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-70-1",
       "original": "Dongya Jia, Zhuo Chen, Jiawei Chen, Chenpeng Du, Jian Wu, Jian Cong, Xiaobin Zhuang, Chumin Li, Zhen Wei, Yuping Wang, et al. Ditar: Diffusion transformer autoregressive modeling for speech generation. arXiv preprint arXiv:2502.03930, 2025."
      }
     ]
    },
    {
     "id": "p-references-71",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-71-1",
       "original": "Yixuan Zhou, Guoyang Zeng, Xin Liu, Xiang Li, Renjie Yu, Ziyang Wang, Runchuan Ye, Weiyue Sun, Jiancheng Gui, Kehan Li, et al. Voxcpm: Tokenizer-free tts for context-aware speech generation and true-to-life voice cloning. arXiv preprint arXiv:2509.24650, 2025b."
      }
     ]
    },
    {
     "id": "p-references-72",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-72-1",
       "original": "SII-OpenMOSS."
      },
      {
       "id": "s-references-72-2",
       "original": "Moss-tts technical report. arXiv preprint arXiv:2603.18090, 2026."
      }
     ]
    },
    {
     "id": "p-references-73",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-73-1",
       "original": "Hangrui Hu, Xinfa Zhu, Ting He, Dake Guo, Bin Zhang, Xiong Wang, Zhifang Guo, Ziyue Jiang, Hongkun Hao, Zishan Guo, et al. Qwen3-tts technical report. arXiv preprint arXiv:2601.15621, 2026."
      }
     ]
    },
    {
     "id": "p-references-74",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-74-1",
       "original": "Alexandre Défossez, Jade Copet, Gabriel Synnaeve, and Yossi Adi."
      },
      {
       "id": "s-references-74-2",
       "original": "High fidelity neural audio compression."
      }
     ]
    },
    {
     "id": "p-references-75",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-75-1",
       "original": "arXiv preprint arXiv:2210.13438, 2022."
      }
     ]
    },
    {
     "id": "p-references-76",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-76-1",
       "original": "Hubert Siuzdak."
      },
      {
       "id": "s-references-76-2",
       "original": "Vocos: Closing the gap between time-domain and fourier-based neural vocoders for highquality audio synthesis. arXiv preprint arXiv:2306.00814, 2023."
      }
     ]
    },
    {
     "id": "p-references-77",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-77-1",
       "original": "Shengpeng Ji, Ziyue Jiang, Wen Wang, Yifu Chen, Minghui Fang, Jialong Zuo, Qian Yang, Xize Cheng, Zehan Wang, Ruiqi Li, et al. Wavtokenizer: an efficient acoustic discrete codec tokenizer for audio language modeling. arXiv preprint arXiv:2408.16532, 2024."
      }
     ]
    },
    {
     "id": "p-references-78",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-78-1",
       "original": "Detai Xin, Xu Tan, Shinnosuke Takamichi, and Hiroshi Saruwatari."
      },
      {
       "id": "s-references-78-2",
       "original": "Bigcodec: Pushing the limits of low-bitrate neural speech codec. arXiv preprint arXiv:2409.05377, 2024."
      },
      {
       "id": "s-references-78-3",
       "original": "Zhiliang Peng, Jianwei Yu, Wenhui Wang, Yaoyao Chang, Yutao Sun, Li Dong, Yi Zhu, Weijiang Xu, Hangbo Bao, Zehua Wang, et al. Vibevoice technical report. arXiv preprint arXiv:2508.19205, 2025."
      }
     ]
    },
    {
     "id": "p-references-79",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-79-1",
       "original": "Junmin Gong, Sean Zhao, Sen Wang, Shengyuan Xu, and Joe Guo."
      },
      {
       "id": "s-references-79-2",
       "original": "Ace-step: A step towards music generation foundation model. arXiv preprint arXiv:2506.00045, 2025."
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
    "sentence_id": "s-1-3-6",
    "quote": "compounding errors"
   },
   "kind": "motivation",
   "title": "误差累积是什么",
   "explanation": "传统管线是「DiT 预测梅尔频谱 → 声码器转波形」两段式，梅尔频谱本身丢了相位和高频细节，声码器只能靠猜补回来；猜不准的部分就是累积误差。LongCat-AudioDiT 让一个 VAE 直接编解码波形，扩散模型在这个波形潜空间里生成，解码一步到位，从结构上消掉了中间环节。这是全文的立论根基，也是它敢声称 SIM 大幅领先的原因。",
   "featured": true
  },
  {
   "id": "ann-002",
   "anchor": {
    "sentence_id": "s-1-3-8",
    "quote": "training-inference mismatch"
   },
   "kind": "concept",
   "title": "这篇论文的真亮点",
   "explanation": "比起「把 mel 换成 waveform latent」这个相对直白的改动，推理侧的两项修正是本文更有壁垒的贡献：一是发现 prompt 区加噪潜变量在推理时无人约束会漂移（4.3 节），二是用 APG 换掉 CFG（4.4 节）。消融（5.3.3）显示两者各值约 0.05 SIM 和 0.3 UTMOS，积少成多就是 SOTA 的边际。读这篇论文，第 4 章比第 3 章值得反复看。",
   "featured": true
  },
  {
   "id": "ann-003",
   "anchor": {
    "sentence_id": "s-3-1-4-1",
    "quote": "shortcut"
   },
   "kind": "engineering",
   "title": "无参数 shortcut 的取舍",
   "explanation": "Wav-VAE 的每个编码器块都做「变换支 + 恒等/池化 shortcut」相加，且不引入可学习参数。好处是梯度通路稳定、浅层信息不衰减，训练 VAE 时不用操心初始化；代价是 shortcut 用平均池化对齐形状，本身也是一种信息损失。这是从 audio VAE 工程实践里沉淀下来的稳态设计，和 Oobleck/DAC 一脉相承，单看不出彩，但少了它重建指标会明显波动。",
   "featured": false
  },
  {
   "id": "ann-004",
   "anchor": {
    "sentence_id": "s-3-2-5-1",
    "quote": "warmup"
   },
   "kind": "engineering",
   "title": "先易后难的对抗训练",
   "explanation": "VAE+GAN 的经典坑是：重建还没学好就上对抗损失，判别器梯度会把生成器拉崩。这里的解法是 warmup 阶段冻结 Ladv 和 Lfm，先让自编码器学到稳定的重建映射，再开对抗。工程上这条经验对所有「重建+感知」混合目标都成立——先拟合数据，再追求 perceptual quality，顺序反了模型很容易产生高频伪影。",
   "featured": false
  },
  {
   "id": "ann-005",
   "anchor": {
    "sentence_id": "s-4-1-2-2",
    "quote": "zero-shot"
   },
   "kind": "concept",
   "title": "掩码即声音克隆",
   "explanation": "VoiceBox 奠定的套路：训练时随机掩掉干净潜变量的一段，让模型以剩下的部分为「上下文提示」去重建被掩区域。这等于免费构造了无数「给定参考音频、补全目标段」的样本，推理时换成真实参考音频就是零样本声音克隆——不需要显式的说话人编码器。LongCat-AudioDiT 把它从 mel 潜空间整体平移到了波形潜空间，SIM 的大幅提升说明这一策略对表征形式不敏感。",
   "featured": true
  },
  {
   "id": "ann-006",
   "anchor": {
    "sentence_id": "s-4-1-7-1",
    "quote": "REPA"
   },
   "kind": "engineering",
   "title": "REPA 只加速不提质",
   "explanation": "作者诚实地写明：REPA（把 DiT 第 8 层表征往 mHuBERT 特征上对齐）不提升最终生成质量，但能显著加快收敛。这个结论和 REPA 原论文在图像上的表态一致——它是训练加速器而非质量增强器。对要复现的人这是重要提示：算力紧张可以砍掉这条损失，只是训练曲线会慢一些；不要指望它能救一个已经训差的模型。",
   "featured": false
  },
  {
   "id": "ann-007",
   "anchor": {
    "sentence_id": "s-4-2-1-5",
    "quote": "UMT5"
   },
   "kind": "comparison",
   "title": "文本编码器为何选 UMT5",
   "explanation": "三条路：从零训练（贵、难扩语言）、ByT5（字节级，中文序列爆长、对齐差）、UMT5（107 种子词分词、序列长度可控）。作者踩过 ByT5 的坑后落到 UMT5-base。这个选择的连锁影响很实际：子词分词让中英混合文本的 token 长度与语音时长量级匹配，cross-attention 学对齐的收敛速度直接受益（4.2 节末尾的 ConvNeXt 精炼也是同一目的）。对多语言 TTS，文本编码器的分词粒度比模型大小更关键。",
   "featured": false
  },
  {
   "id": "ann-008",
   "anchor": {
    "sentence_id": "s-4-2-1-9",
    "quote": "low-level"
   },
   "kind": "motivation",
   "title": "单层嵌入不够用",
   "explanation": "语言模型越深越抽象——末层富含语义，但字音、韵律相关的低层线索被洗掉了，而 TTS 恰恰需要后者驱动精确发音。作者的做法是把 UMT5 的词嵌入层和末层隐状态各自 LayerNorm 后相加，让「怎么读」和「读什么」同时在线。这是典型的「预训练表征不是免费午餐」案例：直接取最后一层是视觉/文本任务的默认，套到语音任务上就要改。",
   "featured": true
  },
  {
   "id": "ann-009",
   "anchor": {
    "sentence_id": "s-abstract-1-4",
    "quote": "training-inference mismatch"
   },
   "kind": "concept",
   "title": "被全场忽略的漂移",
   "explanation": "这是本文最漂亮的一个观察。流匹配损失只惩罚被掩的目标区域，prompt 区 zctx 的速度预测完全不受约束；推理时每一步的任意更新累积下来，zctx 会漂离它在训练时对应的 GT 轨迹——而模型看到的条件分布就变了。作者点名 VoiceBox、F5-TTS 都没注意到这一点。任何做「条件区域 + 生成区域」混合 ODE 采样的系统（语音填充、视频续写）都该自查同样的 bug。",
   "featured": true
  },
  {
   "id": "ann-010",
   "anchor": {
    "sentence_id": "s-4-3-4-6",
    "quote": "overwriting"
   },
   "kind": "engineering",
   "title": "修复便宜得离谱",
   "explanation": "修复方式是每个推理步把 zctx 强制覆写为理论 GT 值 tzctx1 + (1−t)zctx0——一行代码、零训练成本。消融显示这一步值约 0.04 SIM 和 0.33 UTMOS。这种「找到根因后修复 trivial」的模式是工程研究里最划算的收益；难点从来不在修复本身，而在于意识到「prompt 区也在被 ODE 更新、且无人监督」这件事。",
   "featured": true
  },
  {
   "id": "ann-011",
   "anchor": {
    "sentence_id": "s-4-3-6-2",
    "quote": "leak"
   },
   "kind": "critique",
   "title": "CFG 的隐藏泄漏",
   "explanation": "常规 CFG 的「无条件」分支只是丢掉条件文本，但作者指出：只要 zctx（prompt 区的加噪潜变量）还在，它就携带了提示音频的声学信息，无条件估计并不真正无条件，CFG 引导方向因此有偏。这个泄漏在 F5-TTS、VoiceBox 里都默认存在，本文是首个明确指出并在采样时把 prompt 区一并置空的。做 CFG 类系统的人值得照此检查自己的 unconditional 输入到底「有多无条件」。",
   "featured": true
  },
  {
   "id": "ann-012",
   "anchor": {
    "sentence_id": "s-1-1-6",
    "quote": "parallel"
   },
   "kind": "concept",
   "title": "APG 的几何直觉",
   "explanation": "CFG 把「条件速度 − 无条件速度」这个残差整体放大 α 倍，α 一大就过饱和出伪影。APG 把这个残差按相对条件预测的方向拆成平行分量和正交分量，主张过饱和主要来自平行分量，于是只对它加阻尼（η=0.5），正交分量照常放大。几何上相当于「只修正方向、不重复加幅度」。这是图像扩散（Sadat et al.）向语音流匹配的迁移，迁移的关键是把速度域先映到样本域再投影。",
   "featured": false
  },
  {
   "id": "ann-013",
   "anchor": {
    "sentence_id": "s-5-1-2-3",
    "quote": "speech recognition model"
   },
   "kind": "critique",
   "title": "ASR 转写训练的代价",
   "explanation": "全量 TTS 训练文本都来自一个语音识别模型的自动转写，而非人工标注。这把上游 ASR 的错误直接铸进了 TTS 的文本条件里——WER 上略逊 Qwen3-TTS/CosyVoice3.5 的差距未必全是模型问题，标注质量也在起作用。作者拿「免人工标注」当卖点，但它同时是质量天花板的一部分；这个 trade-off 论文没有展开量化，读者要心里有数。",
   "featured": true
  },
  {
   "id": "ann-014",
   "anchor": {
    "sentence_id": "s-evaluation-metrics-4-1",
    "quote": "Whisper"
   },
   "kind": "number",
   "title": "测量本身的噪声",
   "explanation": "可懂度评估用的 ASR 是 Whisper large-v3（英文）和 Paraformer（中文），SIM 用微调过的 WavLM，自然度用 UTMOS/DNSMOS。这套装备本身就是误差源：Whisper 对合成语音的识别偏宽松，UTMOS 与真人 MOS 的相关性在分布外会掉。比较表 1 里 1-2 个百分点的 WER 差距时，这个「测量仪器的底噪」必须算进去——差距小于仪器噪声的结论基本是五五开。",
   "featured": false
  },
  {
   "id": "ann-015",
   "anchor": {
    "sentence_id": "s-continuous-vaes-3-2",
    "quote": "Qwen3-TTS"
   },
   "kind": "critique",
   "title": "WER 其实是输的",
   "explanation": "论文的视觉重点是 SIM 拿 SOTA，但表中 WER 一项 LongCat-AudioDiT 并不领先：3.5B 在 ZH/EN/ZH-Hard 上的 1.09/1.50/6.04，输给 CosyVoice3.5 的 0.87/1.57/5.71 和 VoxCPM 的 0.93/1.85/8.87（混合口径）。作者的辩护是人家用了多阶段管线和人工标注——理由合理，但也意味着：如果你的场景把可懂度放第一位（导航、播报），这套「单阶段端到端」还不是最强选项。",
   "featured": true
  },
  {
   "id": "ann-016",
   "anchor": {
    "sentence_id": "s-abstract-1-6",
    "quote": "speaker similarity"
   },
   "kind": "number",
   "title": "SIM 涨幅很不对称",
   "explanation": "表 3 里 Wav-VAE 对 Mel-VAE：ZH-SIM 0.812 vs 0.706，+0.106；而同表 WER 只在 1.18 vs 1.29 上改善 0.11。增益高度集中在声音克隆维度，可懂度只是顺带略好。作者的解释是高频细节决定音色、且在 mel 往返转换中最易丢失——与第 1 章的 compounding error 叙事闭环。做选型的人由此可知：波形潜空间的钱主要花在音色保真上，不是为了读得更准。",
   "featured": true
  },
  {
   "id": "ann-017",
   "anchor": {
    "sentence_id": "s-5-3-2-5-2",
    "quote": "degrades the TTS generation quality"
   },
   "kind": "critique",
   "title": "更准的 VAE 反而更差",
   "explanation": "RQ2 的核心反直觉发现：加大潜变量维度让 VAE 重建更好，却让下游 TTS 生成更差；即使把 DiT 扩到 3.5B 也救不回 128 维的劣势。这说明瓶颈不在容量而在「可学性」——高维连续潜空间里真正含信息的低频流形更难被扩散模型命中。对行业是个清醒的提醒：不要再闭着眼睛把 VAE 保真度往上堆，重建指标和生成质量不是单调关系。",
   "featured": true
  },
  {
   "id": "ann-018",
   "anchor": {
    "sentence_id": "s-5-3-2-6-3",
    "quote": "lower FPS"
   },
   "kind": "connection",
   "title": "帧率该和谁对齐",
   "explanation": "Wav-VAE 的最优帧率（11.72 Hz）落在语音学上一个有意义的量级：音素平均时长约 80-100 ms，11.72 Hz 对应每帧约 85 ms，恰好一帧一个音素上下。这与离散 codec 领域「25-50 Hz perceptual token」的共识不同——连续潜变量可以压得更低，因为解码器有连续空间的插值能力。这条线索解释了为什么后来发现 WavTokenizer 的 75 Hz 反而对 TTS 不友好。",
   "featured": false
  },
  {
   "id": "ann-019",
   "anchor": {
    "sentence_id": "s-training-details-1-2",
    "quote": "11.72"
   },
   "kind": "number",
   "title": "配置甜点的依据",
   "explanation": "64 维 × 11.72 Hz 是论文扫完 6 组 VAE × 6 组 TTS 后选定的组合：比它维度高的 TTS 学不动，比它帧率低的 VAE 保真受损。一个容易被忽略的细节：维度消融时帧率固定在 20 Hz（不是默认 11.72 Hz），帧率消融时维度固定 64——两组扫描并不构成正交网格，理论上可能存在作者没试过的更优点（比如 96 维 × 15 Hz），实践者不必把 64/11.72 当教条。",
   "featured": false
  },
  {
   "id": "ann-020",
   "anchor": {
    "sentence_id": "s-5-3-3-2-2",
    "quote": "APG"
   },
   "kind": "number",
   "title": "每项改动值多少",
   "explanation": "表 4 给出两组消融的量化贡献：解决训练-推理不一致相对不解决，SIM 0.812 vs 0.769（+0.043）、UTMOS 3.16 vs 2.83（+0.33）；APG 相对标准 CFG，UTMOS 3.16 vs 3.06（+0.10）、DNSMOS 3.40 vs 3.38。注意两项改进的「分值结构」不同：前者保 SIM，后者保自然度/质量，组合起来才能同时赢两个维度。对复现者说明：少了任何一项，表 1 的 SOTA 位次都站不住。",
   "featured": true
  },
  {
   "id": "ann-021",
   "anchor": {
    "sentence_id": "s-6-2-2",
    "quote": "human annotations"
   },
   "kind": "critique",
   "title": "端到端叙事的边界",
   "explanation": "结论反复强调「无需复杂多阶段管线、无需人工标注」，但注意几个隐含依赖：Wav-VAE 仍是单独预训练的模块（严格意义并非从零端到端）、文本来自外部 ASR 模型的自动转写（依赖另一个模型的先验）、SIM 评测用的 WavLM 说话人嵌入也是预训练产物。「端到端」更多是在描述 TTS 主干的训练方式，而非整个系统从零起步。读行业论文对这类修辞保持警惕是值得养成的习惯。",
   "featured": false
  },
  {
   "id": "ann-022",
   "anchor": {
    "sentence_id": "s-future-work-1-1",
    "quote": "RLHF"
   },
   "kind": "connection",
   "title": "下一步往哪走",
   "explanation": "作者点名两个方向：面向音频的免对齐 RLHF 和知识蒸馏加速。前者对应把 preference learning 从文本 LLM 迁到语音自然度/表现力的优化；后者直接回应了扩散 TTS 的部署痛点——NFE=16 的 ODE 采样对实时场景偏重，蒸成 2-4 步甚至单步（consistency/shortcut 模型路线）是行业主攻方向之一。对想跟进的研究者，这两条线索的 ROI 都比继续堆数据规模高。",
   "featured": false
  }
 ]
};
