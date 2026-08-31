// 自动生成：2606.03455 全文双语精读数据（由 tools/compile_paper.js 装配）
// 结构/原文来自 .cache/papers/2606.03455.json（tools/extract_paper.py）；
// 翻译与讲解来自 .cache/papers/zh/2606.03455/（LLM agent 撰写）。
// 改翻译请改片段后重新装配；勿手改本文件的结构与 original 字段。
globalThis.PAPER_2606_03455 = {
 "paper_id": "2606.03455",
 "model_id": "wavtts",
 "title": {
  "original": "WavTTS: Towards High-Quality Zero-Shot TTS via Direct Raw Waveform Modeling",
  "zh": "WavTTS：通过直接建模原始波形实现高质量零样本 TTS"
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
       "original": "Wenxi Chen1,2, Dongya Jia3, Yushen Chen1,2, Zhikang Niu1,2, Yuzhe Liang1,2, Xiquan Li1, Ruiqi Yan1, Ziyang Ma1,2, Guanrou Yang1,2, Sanyuan Chen3, Yue Wang3, Zhuo Chen3, Kai Yu1, Xie Chen1,2† 1Shanghai Jiao Tong University, 2Shanghai Innovation Institute, 3ByteDance Seed †Corresponding author"
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
       "original": "Recently, diffusion models operating on VAE latents or mel-spectrograms have become the dominant paradigm for zero-shot TTS.",
       "zh": "近来，工作在 VAE 潜空间或 mel 频谱图上的扩散模型已成为零样本（zero-shot）TTS 的主流范式。"
      },
      {
       "id": "s-abstract-1-2",
       "original": "Although these compressed representations improve generation efficiency, they inevitably suffer from information loss and non-end-to-end training.",
       "zh": "尽管这些压缩表征提升了生成效率，但它们不可避免地存在信息损失，且无法实现端到端训练。"
      },
      {
       "id": "s-abstract-1-3",
       "original": "Theoretically, directly modeling raw waveforms circumvents these issues; however, this direction remains underexplored and is often deemed difficult due to the extremely long sequence length of audio signals.",
       "zh": "从理论上说，直接建模原始波形可以绕开这些问题；然而由于音频信号的序列极长，这一方向长期被认为难以实现，探索也相对不足。"
      },
      {
       "id": "s-abstract-1-4",
       "original": "To overcome this, we propose WavTTS, the first raw waveform generative TTS model that substantially narrows the gap with latent-space generative models.",
       "zh": "为克服这一困难，我们提出 WavTTS——首个大幅缩小与潜空间生成模型差距的原始波形生成式 TTS 模型。"
      },
      {
       "id": "s-abstract-1-5",
       "original": "Built upon the flow matching with Diffusion Transformer (DiT), WavTTS directly models speech waveforms via a simple patchification strategy, while integrating multi-scale mel-spectrogram supervision to provide perceptual guidance during training.",
       "zh": "WavTTS 构建在流匹配（flow matching）与 Diffusion Transformer（DiT）之上，通过一种简单的 patch 化策略直接建模语音波形，同时引入多尺度 mel 频谱图监督，在训练期间提供感知层面的引导。"
      },
      {
       "id": "s-abstract-1-6",
       "original": "Furthermore, we investigate the impact of prediction targets and noise scheduling in waveform diffusion, and develop an effective schedule design to improve generation quality.",
       "zh": "此外，我们研究了预测目标与噪声调度在波形扩散中的影响，并设计了一套有效的调度方案以提升生成质量。"
      },
      {
       "id": "s-abstract-1-7",
       "original": "Evaluations on open-source benchmarks demonstrate that WavTTS closely approaches the performance of current state-of-the-art latent generative zero-shot TTS models, while substantially outperforming previous end-to-end speech generation models.",
       "zh": "在开源基准上的评测表明，WavTTS 的表现已非常接近当前最先进的潜空间零样本 TTS 模型，同时大幅超越以往的端到端语音生成模型。"
      },
      {
       "id": "s-abstract-1-8",
       "original": "Our findings demonstrate the feasibility of scaling diffusion-based TTS directly in the waveform space, opening a new direction for end-to-end speech generation.",
       "zh": "我们的发现证明了直接在波形空间扩展扩散式 TTS 的可行性，为端到端语音生成开辟了新方向。"
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
       "original": "Correspondence: Xie Chen at chenxie95@sjtu.edu.cn Project Page: https://wavtts.github.io Code and Model: https://github.com/cwx-worst-one/WavTTS",
       "zh": "通信作者：Xie Chen，邮箱 chenxie95@sjtu.edu.cn。项目主页：https://wavtts.github.io。代码与模型：https://github.com/cwx-worst-one/WavTTS。"
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
       "original": "Recent years have witnessed remarkable progress in text-to-speech (TTS) [67, 68, 71, 80], where current zero-shot TTS models are capable of achieving voice cloning and high-quality speech generation given only a brief audio prompt [1, 83, 102].",
       "zh": "近年来，文本转语音（TTS）取得了显著进展 [67, 68, 71, 80]，当前的零样本 TTS 模型仅凭一段简短的音频提示（prompt）就能实现声音克隆与高质量语音生成 [1, 83, 102]。"
      },
      {
       "id": "s-1-1-2",
       "original": "Existing architectures predominantly fall into autoregressive (AR) [21,",
       "zh": "现有架构主要分为自回归（AR）[21, 22, 31, 37, 91, 106, 107] 与非自回归（NAR）[46, 78, 85, 92, 108, 109] 两大范式。"
      }
     ]
    },
    {
     "id": "eq-1-1",
     "type": "equation",
     "page": 1,
     "original": "22, 31, 37, 91, 106, 107] and non-autoregressive (NAR) [46, 78, 85, 92, 108, 109] paradigms. AR models"
    },
    {
     "id": "p-1-2",
     "type": "paragraph",
     "page": 1,
     "sentences": [
      {
       "id": "s-1-2-1",
       "original": "based on next-token prediction are highly expressive and eliminate the need for explicit duration predictors, but they are constrained by heavily compressed and quantized discrete tokens [5, 25, 62, 74], while also suffering from high inference latency and exposure bias.",
       "zh": "基于下一 token 预测的 AR 模型表达能力强、无需显式的时长预测器，但受限于经过重度压缩与量化的离散 token [5, 25, 62, 74]，同时还存在推理延迟高与暴露偏差的问题。"
      },
      {
       "id": "s-1-2-2",
       "original": "In contrast, NAR models, primarily built upon diffusion-based architectures [28, 76], greatly improve generation speed through parallel inference in continuous acoustic spaces.",
       "zh": "相比之下，NAR 模型主要建立在扩散架构之上 [28, 76]，通过在连续声学空间中并行推理，大幅提升了生成速度。"
      },
      {
       "id": "s-1-2-3",
       "original": "Recent advances further remove the need for external duration predictors through implicit text-to-representation alignment [8, 17, 47].",
       "zh": "近来的进展还通过隐式的文本-表征对齐 [8, 17, 47]，进一步免除了对外部时长预测器的依赖。"
      },
      {
       "id": "s-1-2-4",
       "original": "However, whether utilizing highly compressed VAE latents or mel-spectrograms that discard phase and high-frequency details, these continuous representations remain inherently lossy, imposing an upper bound on generation quality.",
       "zh": "然而，无论是高度压缩的 VAE 潜空间表征，还是丢弃了相位与高频细节的 mel 频谱图，这些连续表征本质上都是有损的，给生成质量设定了上限。"
      },
      {
       "id": "s-1-2-5",
       "original": "Furthermore, the conventional two-stage training paradigm, which relies on pre-trained autoencoders or vocoders, inevitably introduces accumulated errors and decoding artifacts.",
       "zh": "此外，依赖预训练自编码器或声码器的传统两阶段训练范式，不可避免地会引入累积误差与解码伪影。"
      },
      {
       "id": "s-1-2-6",
       "original": "This motivates us to revisit the existing speech generation pipeline: Can we achieve high-quality zero-shot TTS by directly modeling the raw, uncompressed waveform space?",
       "zh": "这促使我们重新审视现有的语音生成流水线：能否通过直接建模原始、未压缩的波形空间，来实现高质量的零样本 TTS？"
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
       "original": "Indeed, several early studies [13, 40] have explored end-to-end speech generation without relying on lossy acoustic intermediates.",
       "zh": "事实上，已有一些早期研究 [13, 40] 探索过不依赖有损声学中间表征的端到端语音生成。"
      },
      {
       "id": "s-1-3-2",
       "original": "WaveNet [82] pioneered neural raw waveform generation by autoregressively predicting audio samples, but its practical use was severely limited by prohibitively slow inference.",
       "zh": "WaveNet [82] 通过自回归地逐样本预测音频，开创了神经原始波形生成的先河，但其实际应用受限于慢得难以承受的推理速度。"
      },
      {
       "id": "s-1-3-3",
       "original": "Although subsequent studies improved waveform generation efficiency through parallel generation [60, 64], block-wise modeling [88], or diffusion-based refinement [3, 19], raw waveform TTS remains highly challenging.",
       "zh": "尽管后续研究通过并行生成 [60, 64]、分块建模 [88] 或基于扩散的细化 [3, 19] 提升了波形生成的效率，原始波形 TTS 仍然极具挑战。"
      },
      {
       "id": "s-1-3-4",
       "original": "The extremely high temporal resolution of raw audio requires models to capture long-range linguistic dependencies while preserving fine-grained phase, periodicity, and high-frequency structures within a high-dimensional continuous space.",
       "zh": "原始音频极高的时间分辨率要求模型在捕捉长程语言依赖的同时，还要在高维连续空间中保留细粒度的相位、周期性与高频结构。"
      },
      {
       "id": "s-1-3-5",
       "original": "Moreover, prior waveform-based TTS systems have rarely been scaled to modern zero-shot settings with incontext speaker prompting, leaving a substantial generalization gap compared with recent mel- or latent-space generative TTS systems.",
       "zh": "此外，以往的波形 TTS 系统很少扩展到支持上下文说话人提示的现代零样本设定，与近期 mel 频谱或潜空间生成式 TTS 系统相比存在明显的泛化差距。"
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
       "original": "In this paper, we revisit waveform-space generative modeling and propose WavTTS, a high-quality, end-to-end zero-shot TTS model.",
       "zh": "本文重新审视波形空间的生成式建模，提出 WavTTS——一个高质量、端到端的零样本 TTS 模型。"
      },
      {
       "id": "s-1-4-2",
       "original": "Based on flow matching [51] with Diffusion Transformers (DiT) [61], WavTTS enables truly end-to-end speech generation by eliminating the reliance on pre-trained autoencoders or vocoders, as illustrated in Figure 1.",
       "zh": "基于流匹配 [51] 与 Diffusion Transformer（DiT）[61]，WavTTS 通过消除对预训练自编码器与声码器的依赖，实现了真正端到端的语音生成，如 Figure 1 所示。"
      },
      {
       "id": "s-1-4-3",
       "original": "To address the computational challenges posed by extremely long raw waveform sequences, we employ a simple non-overlapping patchification strategy.",
       "zh": "为应对超长原始波形序列带来的计算挑战，我们采用一种简单的非重叠 patch 化策略。"
      },
      {
       "id": "s-1-4-4",
       "original": "Furthermore, to improve optimization efficiency, we adopt an x-prediction formulation [49], which directly predicts the clean waveform from noisy inputs.",
       "zh": "此外，为提升优化效率，我们采用 x-prediction 公式 [49]，即从含噪输入直接预测干净波形。"
      },
      {
       "id": "s-1-4-5",
       "original": "This formulation naturally allows us to incorporate multi-scale mel-spectrogram supervision, providing perceptual guidance that accelerates convergence and improves generation quality.",
       "zh": "这一公式天然地允许我们引入多尺度 mel 频谱图监督，提供感知引导，从而加速收敛并改善生成质量。"
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
       "original": "Building upon this architecture, we further reveal the critical role of noise design in waveform-space flow matching.",
       "zh": "在此架构之上，我们进一步揭示了噪声设计在波形空间流匹配中的关键作用。"
      },
      {
       "id": "s-1-5-2",
       "original": "By aligning signal-noise variances and shifting the temporal schedules toward high-noise regimes during both training and inference, we substantially enhance model robustness, speech naturalness, and intelligibility.",
       "zh": "通过对齐信号与噪声的方差，并在训练与推理阶段都将时间调度推向高噪声区间，我们大幅增强了模型的鲁棒性、语音自然度与可懂度。"
      },
      {
       "id": "s-1-5-3",
       "original": "Finally, our scaling analysis demonstrates that large-scale data and matched model capacities are essential for unlocking the potential of high-dimensional waveform modeling.",
       "zh": "最后，我们的扩展性分析表明，大规模数据与相匹配的模型容量是释放高维波形建模潜力的关键。"
      },
      {
       "id": "s-1-5-4",
       "original": "Comparisons with alternative lossless representations, such as STFT and MDCT, further demonstrate the simplicity and effectiveness of direct time-domain generation.",
       "zh": "与 STFT、MDCT 等其他无损表征的对比，进一步证明了直接在时域生成的简洁与有效。"
      },
      {
       "id": "s-1-5-5",
       "original": "In summary, our main contributions are as follows:",
       "zh": "总而言之，我们的主要贡献如下："
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
       "original": "• We propose WavTTS, a flow-matching framework that performs end-to-end zero-shot TTS directly in the waveform space.",
       "zh": "我们提出 WavTTS，一个直接在波形空间进行端到端零样本 TTS 的流匹配框架。"
      },
      {
       "id": "s-1-6-2",
       "original": "This framework eliminates the reliance on pre-trained autoencoders, neural codecs, or vocoders, thereby simplifying the speech generation pipeline.",
       "zh": "该框架消除了对预训练自编码器、神经 codec 或声码器的依赖，从而简化了语音生成流水线。"
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
       "original": "• We introduce key designs tailored for effective waveform-space generation, including waveform patchification, an x-prediction objective coupled with multi-scale mel-spectrogram supervision, and signal-noise variance alignment paired with noise-shifted temporal schedules across both training and inference.",
       "zh": "我们引入了一组为高效波形空间生成量身定制的关键设计，包括波形 patch 化、结合多尺度 mel 频谱图监督的 x-prediction 目标，以及贯穿训练与推理两端的信号-噪声方差对齐与噪声偏移时间调度。"
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
       "original": "• To the best of our knowledge, WavTTS is the first raw waveform generative TTS system to closely approach the performance of mainstream state-of-the-art NAR zero-shot TTS models.",
       "zh": "据我们所知，WavTTS 是首个性能接近主流最先进 NAR 零样本 TTS 模型的原始波形生成式 TTS 系统。"
      },
      {
       "id": "s-1-8-2",
       "original": "This validates the feasibility of direct waveform modeling and challenges the prevailing assumption that high-quality TTS necessarily requires intermediate acoustic features or discrete tokens.",
       "zh": "这验证了直接波形建模的可行性，并挑战了「高质量 TTS 必须依赖中间声学特征或离散 token」这一普遍假设。"
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
    "original": "Related Work",
    "zh": "相关工作"
   },
   "blocks": [
    {
     "id": "p-2-1",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-2-1-1",
       "original": "Diffusion-based TTS.",
       "zh": "基于扩散的 TTS。"
      },
      {
       "id": "s-2-1-2",
       "original": "Diffusion-based generative models have emerged as a dominant paradigm for NAR speech synthesis [39, 71].",
       "zh": "基于扩散的生成模型已成为 NAR 语音合成的主流范式 [39, 71]。"
      },
      {
       "id": "s-2-1-3",
       "original": "Early approaches, such as Diff-TTS [36], Grad-TTS [65], and ProDiff [34], primarily relied on denoising diffusion probabilistic models (DDPMs) with score-matching objectives [28, 76].",
       "zh": "早期方法如 Diff-TTS [36]、Grad-TTS [65] 与 ProDiff [34]，主要依赖采用分数匹配（score-matching）目标的去噪扩散概率模型（DDPM）[28, 76]。"
      },
      {
       "id": "s-2-1-4",
       "original": "More recent studies have shifted toward flow matching [24, 47, 51, 56], where representative systems such as Voicebox [46] and Matcha-TTS [56] leverage optimal transport and continuous-time flows to improve generation quality",
       "zh": "更近的研究则转向流匹配 [24, 47, 51, 56]，代表性系统如 Voicebox [46] 与 Matcha-TTS [56] 利用最优传输与连续时间流来提升生成质量。"
      }
     ]
    },
    {
     "id": "fig-2-1",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "fig-2-1-s1",
       "original": "Figure 1 Diffusion paradigms across different representation spaces in text-to-speech synthesis. (a) Latent Diffusion modeling on highly compressed VAE representations. (b) Mel-Spectrogram Diffusion modeling on spectrograms with discarded phase information. (c) Raw Waveform Diffusion modeling directly on lossless audio waveforms.",
       "zh": "图 1. 文本转语音合成中不同表征空间上的扩散范式。(a) 在高度压缩的 VAE 表征上建模的潜空间扩散。(b) 在丢弃相位信息的频谱图上建模的 mel 频谱图扩散。(c) 直接在无损音频波形上建模的原始波形扩散。"
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
       "original": "while enabling efficient ODE-based sampling.",
       "zh": "同时，流匹配还支持高效的基于 ODE 的采样。"
      },
      {
       "id": "s-2-2-2",
       "original": "In terms of acoustic representation, most existing diffusion-based TTS models operate in compressed continuous spaces, specifically VAE latents [38, 63, 85, 92] (Figure 1(a)) and mel-spectrograms [8, 17, 108] (Figure 1(b)).",
       "zh": "在声学表征方面，绝大多数基于扩散的 TTS 模型工作在压缩的连续空间中，具体包括 VAE 潜空间 [38, 63, 85, 92]（Figure 1(a)）与 mel 频谱图 [8, 17, 108]（Figure 1(b)）。"
      },
      {
       "id": "s-2-2-3",
       "original": "These representations substantially reduce sequence length and computational cost.",
       "zh": "这些表征大幅缩短了序列长度、降低了计算成本。"
      },
      {
       "id": "s-2-2-4",
       "original": "However, they are inherently lossy and rely on pre-trained autoencoders [41, 59] or vocoders [48, 72], leading to a multi-stage generation pipeline that may introduce compounding errors and reconstruction artifacts.",
       "zh": "然而，它们本质上是有损的，并且依赖预训练的自编码器 [41, 59] 或声码器 [48, 72]，由此形成的多阶段生成流水线可能引入累积误差与重建伪影。"
      },
      {
       "id": "s-2-2-5",
       "original": "This motivates us to revisit end-to-end raw waveform generation under modern diffusion-based TTS frameworks, as illustrated in Figure 1(c), aiming to eliminate lossy intermediate acoustic representations while retaining the efficiency and scalability of NAR generation.",
       "zh": "这促使我们在现代扩散式 TTS 框架下重新审视端到端原始波形生成，如 Figure 1(c) 所示，目标是在保留 NAR 生成的效率与可扩展性的同时，消除有损的中间声学表征。"
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
       "original": "Raw Waveform Modeling.",
       "zh": "原始波形建模。"
      },
      {
       "id": "s-2-3-2",
       "original": "Despite the computational challenges of high temporal resolution, direct raw waveform modeling remains highly appealing.",
       "zh": "尽管高时间分辨率带来了计算上的挑战，直接建模原始波形仍然极具吸引力。"
      }
     ]
    },
    {
     "id": "p-2-4",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-2-4-1",
       "original": "WaveNet [82] pioneered autoregressive modeling on raw waveforms.",
       "zh": "WaveNet [82] 开创了原始波形上的自回归建模。"
      },
      {
       "id": "s-2-4-2",
       "original": "Subsequent works [33, 43, 60] substantially improved generation efficiency but mainly served as vocoders conditioned on intermediate acoustic features (e.g., mel-spectrograms) rather than full TTS systems.",
       "zh": "后续工作 [33, 43, 60] 大幅提升了生成效率，但它们主要以中间声学特征（如 mel 频谱图）为条件充当声码器，而非完整的 TTS 系统。"
      },
      {
       "id": "s-2-4-3",
       "original": "Early end-to-end TTS efforts explored various architectures with knowledge distillation, GANs, normalizing flows, or diffusion models [4, 13, 64, 68, 88].",
       "zh": "早期的端到端 TTS 尝试探索了多种架构，涉及知识蒸馏、GAN、归一化流或扩散模型 [4, 13, 64, 68, 88]。"
      },
      {
       "id": "s-2-4-4",
       "original": "Notably, while VITS [40] and JETS [50] achieve high-quality end-to-end training, they still rely on intermediate features, latent variable modeling, or adversarial vocoders.",
       "zh": "值得注意的是，VITS [40] 与 JETS [50] 虽实现了高质量的端到端训练，但仍依赖中间特征、潜变量建模或对抗式声码器。"
      },
      {
       "id": "s-2-4-5",
       "original": "More recently, diffusion-based native waveform generation has gained increasing attention.",
       "zh": "更近期，基于扩散的原生波形生成受到越来越多的关注。"
      },
      {
       "id": "s-2-4-6",
       "original": "DiffAR [3] applies diffusion in waveform space but is limited by slow autoregressive generation.",
       "zh": "DiffAR [3] 在波形空间中应用扩散，但受限于缓慢的自回归生成。"
      },
      {
       "id": "s-2-4-7",
       "original": "E3-TTS [19] proposes a simple NAR diffusion approach for waveform generation; however, it lacks systematic comparisons with mainstream NAR baselines under large-scale controlled settings.",
       "zh": "E3-TTS [19] 提出了一种简单的波形生成 NAR 扩散方法，但它缺乏在大规模受控设定下与主流 NAR 基线的系统性比较。"
      },
      {
       "id": "s-2-4-8",
       "original": "Concurrent work WavFlow [105] also investigates direct waveform generation, but it focuses on sound effects generation rather than text-to-speech synthesis.",
       "zh": "并行工作 WavFlow [105] 同样研究直接波形生成，但其关注点是音效生成而非文本转语音。"
      },
      {
       "id": "s-2-4-9",
       "original": "This gap highlights the need for a scalable waveform generative TTS system that eliminates intermediate representations while enabling efficient and high-quality generation in the high-dimensional time-domain space.",
       "zh": "这一空白凸显了对一个可扩展的波形生成式 TTS 系统的需求：它应当消除中间表征，同时在高维时域空间中实现高效、高质量的生成。"
      }
     ]
    },
    {
     "id": "p-2-5",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-2-5-1",
       "original": "Insights from Pixel-Space Diffusion.",
       "zh": "来自像素空间扩散的启示。"
      },
      {
       "id": "s-2-5-2",
       "original": "In computer vision, the exploration of diffusion models in high-dimensional pixel space [12, 28, 58, 75] predates their latent-space counterparts.",
       "zh": "在计算机视觉领域，对高维像素空间扩散模型 [12, 28, 58, 75] 的探索早于潜空间扩散。"
      },
      {
       "id": "s-2-5-3",
       "original": "Early architectures [29] typically relied on U-Nets [69] with dense convolutions and long residual connections, which are computationally prohibitive and severely limit model scaling.",
       "zh": "早期架构 [29] 通常依赖带有密集卷积与长残差连接的 U-Net [69]，计算开销大得难以承受，严重限制了模型扩展。"
      },
      {
       "id": "s-2-5-4",
       "original": "To alleviate this burden, subsequent studies explored various directions, such as decomposing the diffusion process across multiple resolution scales [6, 81], integrating autoregressive",
       "zh": "为缓解这一负担，后续研究探索了多个方向，例如将扩散过程分解到多个分辨率尺度 [6, 81]、将自回归架构与归一化流相结合"
      }
     ]
    },
    {
     "id": "fig-2-2",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "fig-2-2-s1",
       "original": "Figure 2 Illustration of WavTTS training (left) and inference (right).",
       "zh": "图 2. WavTTS 训练（左）与推理（右）示意图。"
      }
     ]
    },
    {
     "id": "p-2-6",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-2-6-1",
       "original": "architectures with normalizing flows [100, 103], or introducing auxiliary decoders to recover high-frequency details [10, 54, 84, 97].",
       "zh": "（接上句）…… [100, 103]，或引入辅助解码器来恢复高频细节 [10, 54, 84, 97]。"
      },
      {
       "id": "s-2-6-2",
       "original": "Alongside the rise of patch-based architectures, recent works have also re-examined diffusion objectives for high-dimensional generation.",
       "zh": "随着基于 patch 的架构兴起，近期研究也重新审视了高维生成的扩散目标。"
      },
      {
       "id": "s-2-6-3",
       "original": "JiT [49] proposes directly predicting the clean image, i.e., x-prediction, to improve modeling in pixel space, while PixelGen [55] further incorporates perceptual loss to better capture the perceptual manifold of pixels.",
       "zh": "JiT [49] 提出直接预测干净图像，即 x-prediction，以改进像素空间建模；PixelGen [55] 则进一步引入感知损失，以更好地捕捉像素的感知流形。"
      },
      {
       "id": "s-2-6-4",
       "original": "These advances in visual generation inspire our waveform modeling design: we adopt an x-prediction objective and combine it with multi-scale mel-spectrogram supervision as a perceptual training signal, enabling high-quality raw waveform generation.",
       "zh": "视觉生成领域的这些进展启发了我们的波形建模设计：我们采用 x-prediction 目标，并将其与多尺度 mel 频谱图监督相结合作为感知训练信号，从而实现高质量的原始波形生成。"
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
    "original": "WavTTS",
    "zh": "WavTTS"
   },
   "blocks": [
    {
     "id": "p-3-1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-1-1",
       "original": "As illustrated in Figure 2, WavTTS is an NAR zero-shot TTS model that directly generates raw waveforms.",
       "zh": "如 Figure 2 所示，WavTTS 是一个直接生成原始波形的 NAR 零样本 TTS 模型。"
      },
      {
       "id": "s-3-1-2",
       "original": "This section first introduces the waveform diffusion modeling framework of WavTTS in Section 3.1, then describes the multi-scale mel-spectrogram auxiliary supervision in Section 3.2, and finally presents our noise-aware schedule design for both training and inference in Section 3.3.",
       "zh": "本节首先在 Section 3.1 介绍 WavTTS 的波形扩散建模框架，然后在 Section 3.2 描述多尺度 mel 频谱图辅助监督，最后在 Section 3.3 给出面向训练与推理的噪声感知调度设计。"
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
    "original": "Raw Waveform Diffusion Modeling",
    "zh": "原始波形扩散建模"
   },
   "blocks": [
    {
     "id": "p-3-1-1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-1-1-1",
       "original": "Following recent NAR TTS frameworks [8, 17, 92], WavTTS models waveform generation under the flow matching (FM) paradigm [51] from the perspective of ordinary differential equations (ODEs).",
       "zh": "沿用近期的 NAR TTS 框架 [8, 17, 92]，WavTTS 从常微分方程（ODE）的视角，在流匹配（FM）范式 [51] 下建模波形生成。"
      },
      {
       "id": "s-3-1-1-2",
       "original": "Under the rectified flow formulation with linear interpolation [51, 52], given a clean speech waveform x1 ∼p(x1) from the data distribution and a Gaussian noise sample x0 ∼p(x0) = N(0, I), the intermediate noisy waveform at timestep t is defined as xt = (1 −t)x0 + tx1, where t ∈[0, 1] is sampled to learn the transport process from noise to data.",
       "zh": "在线性插值的 rectified flow 公式 [51, 52] 下，给定来自数据分布的干净语音波形 x1 ∼ p(x1) 与高斯噪声样本 x0 ∼ p(x0) = N(0, I)，时刻 t 的中间含噪波形定义为 xt = (1 − t)x0 + tx1，其中 t ∈ [0, 1] 为采样得到，用于学习从噪声到数据的传输过程。"
      },
      {
       "id": "s-3-1-1-3",
       "original": "Taking the derivative of xt with respect to t yields the ground-truth velocity field vt = x1 −x0.",
       "zh": "对 xt 关于 t 求导，可得真实的速度场 vt = x1 − x0。"
      },
      {
       "id": "s-3-1-1-4",
       "original": "The original FM objective trains a neural network vθ(xt, t) to directly regress this velocity field:",
       "zh": "原始的 FM 目标训练一个神经网络 vθ(xt, t) 来直接回归这一速度场："
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
       "original": "LFM = Et,x0,x1 h ∥vθ(xt, t) −vt∥2",
       "zh": "（公式：L_FM = E_{t,x0,x1}[‖v_θ(x_t, t) − v_t‖^2_2]。）"
      }
     ]
    },
    {
     "id": "eq-3-1-1",
     "type": "equation",
     "page": 4,
     "original": "2"
    },
    {
     "id": "eq-3-1-2",
     "type": "equation",
     "page": 4,
     "original": "i"
    },
    {
     "id": "eq-3-1-3",
     "type": "equation",
     "page": 4,
     "original": "."
    },
    {
     "id": "eq-3-1-4",
     "type": "equation",
     "page": 4,
     "original": "(1)"
    },
    {
     "id": "p-3-1-3",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-1-3-1",
       "original": "However, directly predicting x1−x0 requires the model to fit a target containing the stochastic noise component x0, which is particularly challenging in the high-dimensional and complex waveform space.",
       "zh": "（式 1）然而直接预测 x1−x0 要求模型拟合含随机噪声分量 x0 的目标，在高维复杂的波形空间中尤其困难。"
      },
      {
       "id": "s-3-1-3-2",
       "original": "This issue becomes more pronounced in silent segments or low-energy frequency regions, where noise-dominated targets may lead to unstable optimization [95].",
       "zh": "在静音段或低能量频段，这一问题更加突出：由噪声主导的目标可能导致优化不稳定 [95]。"
      },
      {
       "id": "s-3-1-3-3",
       "original": "To mitigate this problem, inspired by JiT [49], we reformulate the prediction target as directly estimating the clean waveform, i.e., the network outputs xθ = netθ(xt, t).",
       "zh": "为缓解这一问题，受 JiT [49] 启发，我们将预测目标重构为直接估计干净波形，即网络输出 xθ = netθ(xt, t)。"
      },
      {
       "id": "s-3-1-3-4",
       "original": "Under this formulation, the predicted and ground-truth velocity fields can be rewritten as vθ = xθ−xt 1−t = x1 −x0, respectively.",
       "zh": "在该公式下，预测速度场与真实速度场可分别改写为 vθ = (xθ − xt)/(1 − t) 与 vt = x1 − x0。"
      },
      {
       "id": "s-3-1-3-5",
       "original": "Substituting them into Eq. (1), the original FM objective can be equivalently transformed into the following x-prediction objective:",
       "zh": "将它们代入式 (1)，原始的 FM 目标可等价地转化为如下 x-prediction 目标："
      }
     ]
    },
    {
     "id": "eq-3-1-5",
     "type": "equation",
     "page": 5,
     "original": "LFM = Et,x0,x1"
    },
    {
     "id": "eq-3-1-6",
     "type": "equation",
     "page": 5,
     "original": "1−t and vt = x1−xt"
    },
    {
     "id": "eq-3-1-7",
     "type": "equation",
     "page": 5,
     "original": "\" xθ −x1"
    },
    {
     "id": "eq-3-1-8",
     "type": "equation",
     "page": 5,
     "original": "#"
    },
    {
     "id": "eq-3-1-9",
     "type": "equation",
     "page": 5,
     "original": "2"
    },
    {
     "id": "eq-3-1-10",
     "type": "equation",
     "page": 5,
     "original": ". (2)"
    },
    {
     "id": "eq-3-1-11",
     "type": "equation",
     "page": 5,
     "original": "1 −t"
    },
    {
     "id": "eq-3-1-12",
     "type": "equation",
     "page": 5,
     "original": "2"
    },
    {
     "id": "p-3-1-4",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-3-1-4-1",
       "original": "To enable zero-shot voice cloning, we employ the text-conditioned speech-infilling task [46], where the model predicts the masked speech segment given the surrounding audio context and the full text transcript.",
       "zh": "为实现零样本声音克隆，我们采用文本条件下的语音填充（speech-infilling）任务 [46]：给定周围音频上下文与完整文本转录，模型预测被掩蔽的语音段。"
      },
      {
       "id": "s-3-1-4-2",
       "original": "Let x1 ∈RT denote the clean waveform and y denote the corresponding text transcript.",
       "zh": "设 x1 ∈ R^T 表示干净波形，y 表示对应的文本转录。"
      },
      {
       "id": "s-3-1-4-3",
       "original": "As shown in Figure 2, we apply a contiguous span mask m ∈{0, 1}T , utilizing xctx = (1 −m) ⊙x1 as the audio prompt.",
       "zh": "如 Figure 2 所示，我们施加连续区间掩码 m ∈ {0, 1}^T，并将 xctx = (1 − m) ⊙ x1 作为音频提示。"
      },
      {
       "id": "s-3-1-4-4",
       "original": "Meanwhile, the noisy waveform is obtained by linear interpolation as xt = (1 −t)x0 + tx1.",
       "zh": "与此同时，含噪波形通过线性插值得到：xt = (1 − t)x0 + tx1。"
      },
      {
       "id": "s-3-1-4-5",
       "original": "For efficient temporal modeling, we patchify the 1D raw waveform into non-overlapping blocks of length F, yielding a representation in RN×F , where N = ⌈T/F⌉[73, 88, 90].",
       "zh": "为实现高效的时序建模，我们将 1D 原始波形切分为长度为 F 的非重叠块（patch），得到 R^{N×F} 的表征，其中 N = ⌈T/F⌉ [73, 88, 90]。"
      },
      {
       "id": "s-3-1-4-6",
       "original": "The patchified noisy waveform and audio prompt are then embedded via two-layer linear projections.",
       "zh": "patch 化后的含噪波形与音频提示随后经两层线性投影嵌入。"
      },
      {
       "id": "s-3-1-4-7",
       "original": "For the text condition y, represented by bilingual pinyin and alphabet tokens, we pad the text sequence with filler tokens to match the length of the audio patches, enabling implicit text-audio alignment [8, 17].",
       "zh": "对于文本条件 y，我们以拼音与字母的双语 token 表示，并用填充 token 将文本序列补齐到与音频 patch 相同的长度，从而实现隐式的文本-音频对齐 [8, 17]。"
      },
      {
       "id": "s-3-1-4-8",
       "original": "The text sequence is encoded by ConvNeXt V2 blocks [89] and concatenated with the audio embeddings along the feature dimension as input to the flow matching network.",
       "zh": "文本序列由 ConvNeXt V2 块 [89] 编码，并与音频嵌入沿特征维度拼接，作为流匹配网络的输入。"
      },
      {
       "id": "s-3-1-4-9",
       "original": "Finally, the network output is projected by a linear layer and reshaped, i.e., unpatchified, to recover the predicted waveform xθ.",
       "zh": "最后，网络输出经线性层投影并重新整形（即反 patch 化），还原出预测波形 xθ。"
      },
      {
       "id": "s-3-1-4-10",
       "original": "Accordingly, the x-prediction FM objective in Eq. (2) can be reformulated as:",
       "zh": "相应地，式 (2) 中的 x-prediction FM 目标可重写为："
      }
     ]
    },
    {
     "id": "eq-3-1-13",
     "type": "equation",
     "page": 5,
     "original": "\" (xθ(xt, t, xctx, y) −x1) ⊙m"
    },
    {
     "id": "eq-3-1-14",
     "type": "equation",
     "page": 5,
     "original": "LFM = Et,x0,x1"
    },
    {
     "id": "eq-3-1-15",
     "type": "equation",
     "page": 5,
     "original": "#"
    },
    {
     "id": "eq-3-1-16",
     "type": "equation",
     "page": 5,
     "original": "2"
    },
    {
     "id": "eq-3-1-17",
     "type": "equation",
     "page": 5,
     "original": ". (3)"
    },
    {
     "id": "eq-3-1-18",
     "type": "equation",
     "page": 5,
     "original": "1 −t"
    },
    {
     "id": "eq-3-1-19",
     "type": "equation",
     "page": 5,
     "original": "2"
    },
    {
     "id": "p-3-1-5",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-3-1-5-1",
       "original": "WavTTS employs DiT [61] as the flow matching backbone, with the sampled timestep t injected via adaLN- Zero conditioning.",
       "zh": "WavTTS 采用 DiT [61] 作为流匹配骨干网络，采样的时刻 t 通过 adaLN-Zero 条件注入。"
      },
      {
       "id": "s-3-1-5-2",
       "original": "RMSNorm [101] and RoPE [77] are applied across all Transformer layers.",
       "zh": "RMSNorm [101] 与 RoPE [77] 应用于所有 Transformer 层。"
      },
      {
       "id": "s-3-1-5-3",
       "original": "To enable classifier-free guidance (CFG) [27] during inference, we jointly drop the text transcript and audio prompt with a probability of 0.1 during training, allowing the model to learn an unconditional distribution.",
       "zh": "为在推理时启用无分类器引导（CFG）[27]，训练期间我们以 0.1 的概率同时丢弃文本转录与音频提示，使模型学习无条件分布。"
      },
      {
       "id": "s-3-1-5-4",
       "original": "To avoid division-by-zero instability in Eq. (3), we clip t to a maximum value of 0.98 when computing the loss.",
       "zh": "为避免式 (3) 中的除零不稳定，计算损失时将 t 截断到最大值 0.98。"
      }
     ]
    },
    {
     "id": "p-3-1-6",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-3-1-6-1",
       "original": "For inference, we employ the Euler method as the ODE solver, which iteratively transports a randomly sampled initial noise x0 toward the target data distribution p(x1) via first-order numerical integration.",
       "zh": "推理时，我们采用欧拉方法作为 ODE 求解器，通过一阶数值积分，将随机采样的初始噪声 x0 迭代地传输到目标数据分布 p(x1)。"
      },
      {
       "id": "s-3-1-6-2",
       "original": "Given a predefined discrete time schedule 0 = t0 < · · · < ti < · · · < tK = 1, where K denotes the number of function evaluations (NFE), each update step is computed as:",
       "zh": "给定预定义的离散时间调度 0 = t0 < ··· < ti < ··· < tK = 1（其中 K 表示函数评估次数，即 NFE），每一步更新按下式计算："
      }
     ]
    },
    {
     "id": "eq-3-1-20",
     "type": "equation",
     "page": 5,
     "original": "xti+1 = xti + (ti+1 −ti)vθ(xti, ti, xctx, y) = xti + (ti+1 −ti)xθ(xti, ti, xctx, y) −xti"
    },
    {
     "id": "eq-3-1-21",
     "type": "equation",
     "page": 5,
     "original": "1 −ti . (4)"
    },
    {
     "id": "p-3-1-7",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-3-1-7-1",
       "original": "In practice, we apply CFG by linearly extrapolating the conditional and unconditional x-predictions:",
       "zh": "（上式中的速度项以 x-prediction 形式展开，分母为）1 − ti。实际推理中，我们通过对条件与无条件 x 预测做线性外推来施加 CFG："
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
       "original": "˜xθ(xt, t, xctx, y, α) = xθ(xt, t, xctx, y) + α xθ(xt, t, xctx, y) −xθ(xt, t, ∅, ∅)",
       "zh": "（公式：x̃_θ(x_t, t, x_ctx, y, α) = x_θ(x_t, t, x_ctx, y) + α·[x_θ(x_t, t, x_ctx, y) − x_θ(x_t, t, ∅, ∅)]（式 5），其中 α 为 CFG 强度，∅ 表示对应条件被置零填充。）"
      }
     ]
    },
    {
     "id": "eq-3-1-22",
     "type": "equation",
     "page": 5,
     "original": ", (5)"
    },
    {
     "id": "p-3-1-9",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-3-1-9-1",
       "original": "where α is the CFG scale, and ∅denotes that the corresponding condition is replaced with zero padding.",
       "zh": "（公式：x̃_θ(x_t, t, x_ctx, y, α) = x_θ(x_t, t, x_ctx, y) + α·[x_θ(x_t, t, x_ctx, y) − x_θ(x_t, t, ∅, ∅)]（式 5），其中 α 为 CFG 强度，∅ 表示对应条件被置零填充。）"
      },
      {
       "id": "s-3-1-9-2",
       "original": "For zero-shot generation, we concatenate the transcript of the reference audio yref and the target text ygen as the text condition.",
       "zh": "进行零样本生成时，我们将参考音频的转录 yref 与目标文本 ygen 拼接，作为文本条件。"
      },
      {
       "id": "s-3-1-9-3",
       "original": "The target speech duration is estimated according to the character-length ratio between yref and ygen, and is used to determine the length of the masked region after the prompt waveform.",
       "zh": "目标语音时长根据 yref 与 ygen 之间的字符长度比估计，用于确定提示波形之后被掩蔽区域的长度。"
      },
      {
       "id": "s-3-1-9-4",
       "original": "The model then generates the target speech within this masked region, producing the final waveform prediction.",
       "zh": "随后模型在该掩蔽区域内生成目标语音，输出最终的波形预测。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-3-2",
   "num": "3.2",
   "level": 2,
   "page": 6,
   "title": {
    "original": "Multi-Scale Mel-Spectrogram Loss",
    "zh": "多尺度 mel 频谱图损失"
   },
   "blocks": [
    {
     "id": "p-3-2-1",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-3-2-1-1",
       "original": "Directly modeling high-dimensional waveforms suffers from substantial information redundancy.",
       "zh": "直接建模高维波形存在严重的信息冗余。"
      },
      {
       "id": "s-3-2-1-2",
       "original": "Relying solely on the time-domain FM objective may force the model to fit perceptually insignificant sample-level variations, thereby hindering efficient optimization.",
       "zh": "仅依赖时域的 FM 目标，可能迫使模型去拟合感知上无关紧要的样本级波动，从而妨碍高效优化。"
      },
      {
       "id": "s-3-2-1-3",
       "original": "Prior studies on vocoders [42, 94] and neural audio codecs [11, 44, 98] have shown that frequency-domain objectives, such as STFT or mel-spectrogram losses [79], can effectively improve the perceptual quality of synthesized audio and better align with human auditory perception.",
       "zh": "以往关于声码器 [42, 94] 与神经音频 codec [11, 44, 98] 的研究表明，频域目标（如 STFT 或 mel 频谱图损失 [79]）能有效提升合成音频的感知质量，并与人耳听觉更好地对齐。"
      }
     ]
    },
    {
     "id": "p-3-2-2",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-3-2-2-1",
       "original": "Motivated by these observations, we introduce a multi-scale mel-spectrogram loss as auxiliary perceptual supervision.",
       "zh": "受这些观察启发，我们引入多尺度 mel 频谱图损失作为辅助的感知监督。"
      },
      {
       "id": "s-3-2-2-2",
       "original": "Benefiting from the x-prediction objective, we can directly compute the log-mel spectrogram distance between the predicted waveform xθ and the ground-truth x1 across multiple spectral resolutions.",
       "zh": "得益于 x-prediction 目标，我们可以直接在多个频谱分辨率上，计算预测波形 xθ 与真实波形 x1 之间的 log-mel 频谱图距离。"
      },
      {
       "id": "s-3-2-2-3",
       "original": "This supervision encourages the model to capture both local acoustic details and global spectral structures.",
       "zh": "该监督促使模型同时捕捉局部声学细节与全局频谱结构。"
      },
      {
       "id": "s-3-2-2-4",
       "original": "Consistent with the FM objective, we apply the mel-spectrogram loss only to the masked target speech regions, leading to the following formulation:",
       "zh": "与 FM 目标一致，mel 频谱图损失仅施加在被掩蔽的目标语音区域，公式如下："
      }
     ]
    },
    {
     "id": "eq-3-2-1",
     "type": "equation",
     "page": 6,
     "original": "m(s) ⊙(Φs(x1) −Φs(xθ)) 1 ∥m(s)∥1"
    },
    {
     "id": "eq-3-2-2",
     "type": "equation",
     "page": 6,
     "original": "\"X"
    },
    {
     "id": "eq-3-2-3",
     "type": "equation",
     "page": 6,
     "original": "Lmel = Et,x0,x1"
    },
    {
     "id": "eq-3-2-4",
     "type": "equation",
     "page": 6,
     "original": "s∈S"
    },
    {
     "id": "eq-3-2-5",
     "type": "equation",
     "page": 6,
     "original": "#"
    },
    {
     "id": "eq-3-2-6",
     "type": "equation",
     "page": 6,
     "original": ", (6)"
    },
    {
     "id": "p-3-2-3",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-3-2-3-1",
       "original": "where S denotes the set of mel-spectrogram configurations, Φs(·) extracts the log-mel spectrogram at scale s, and m(s) is the span mask aligned with the corresponding temporal resolution.",
       "zh": "其中 S 表示 mel 频谱图配置的集合，Φs(·) 在尺度 s 上提取 log-mel 频谱图，m(s) 是与相应时间分辨率对齐的区间掩码。"
      },
      {
       "id": "s-3-2-3-2",
       "original": "The overall training objective of WavTTS is defined as:",
       "zh": "WavTTS 的整体训练目标定义为："
      }
     ]
    },
    {
     "id": "eq-3-2-7",
     "type": "equation",
     "page": 6,
     "original": "L = LFM + λmelLmel, (7)"
    },
    {
     "id": "p-3-2-4",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-3-2-4-1",
       "original": "where λmel controls the strength of the perceptual guidance.",
       "zh": "L = LFM + λmel·Lmel，其中 λmel 控制感知引导的强度。"
      },
      {
       "id": "s-3-2-4-2",
       "original": "Empirically, we find that this auxiliary loss substantially accelerates model convergence and improves speech naturalness, without requiring any pre-trained acoustic representation models.",
       "zh": "经验上我们发现，这一辅助损失能大幅加速模型收敛并改善语音自然度，且不需要任何预训练的声学表征模型。"
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
    "original": "Schedule Design for Raw Waveform Flow Matching",
    "zh": "原始波形流匹配的调度设计"
   },
   "blocks": [
    {
     "id": "p-3-3-1",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-3-3-1-1",
       "original": "Prior studies in computer vision [7, 29, 30] have shown that proper noise scheduling is crucial for highdimensional pixel-space diffusion.",
       "zh": "计算机视觉领域的先前研究 [7, 29, 30] 表明，恰当的噪声调度对高维像素空间扩散至关重要。"
      },
      {
       "id": "s-3-3-1-2",
       "original": "We empirically find that this principle is equally important for waveformspace diffusion.",
       "zh": "我们从实验中发现，这一原则对波形空间扩散同样重要。"
      },
      {
       "id": "s-3-3-1-3",
       "original": "Accordingly, we introduce two noise-aware strategies: Signal-Noise Variance Alignment for scale matching (Section 3.3.1) and Noise-Shifted Temporal Scheduling for trajectory adjustment (Section 3.3.2).",
       "zh": "据此，我们引入两种噪声感知策略：用于尺度匹配的信号-噪声方差对齐（Section 3.3.1），以及用于轨迹调整的噪声偏移时间调度（Section 3.3.2）。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-3-3-1",
   "num": "3.3.1",
   "level": 2,
   "page": 6,
   "title": {
    "original": "Signal-Noise Variance Alignment",
    "zh": "信号-噪声方差对齐"
   },
   "blocks": [
    {
     "id": "p-3-3-1-1",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-3-3-1-1-1",
       "original": "Standard rectified flow formulations implicitly assume that the target data distribution and the noise prior have comparable scale.",
       "zh": "标准的 rectified flow 公式隐含地假设目标数据分布与噪声先验具有相当的尺度。"
      },
      {
       "id": "s-3-3-1-1-2",
       "original": "However, direct waveform modeling inherently violates this assumption.",
       "zh": "然而，直接波形建模天然违背这一假设。"
      },
      {
       "id": "s-3-3-1-1-3",
       "original": "While raw audio is typically bounded within [−1, 1], its empirical standard deviation is much smaller due to the prevalence of silent intervals and low-energy speech regions.",
       "zh": "原始音频虽然通常被限定在 [−1, 1] 区间内，但由于静音区间与低能量语音段大量存在，其经验标准差要小得多。"
      },
      {
       "id": "s-3-3-1-1-4",
       "original": "For example, our statistical analysis shows that the waveform standard deviation is only ∼0.12 on Emilia [26] and ∼0.07 on LibriTTS [99].",
       "zh": "例如，我们的统计分析显示，波形标准差在 Emilia [26] 上仅约 0.12，在 LibriTTS [99] 上仅约 0.07。"
      },
      {
       "id": "s-3-3-1-1-5",
       "original": "This severe scale mismatch between the waveform distribution and the unit Gaussian prior (σx0 = 1) leads to a suboptimal signal-to-noise ratio (SNR) trajectory.",
       "zh": "波形分布与单位高斯先验（σx0 = 1）之间这种严重的尺度失配，会导致信噪比（SNR）轨迹处于次优状态。"
      },
      {
       "id": "s-3-3-1-1-6",
       "original": "Specifically, under the linear interpolation path xt = (1 −t)x0 + tx1, the Log-SNR can be mathematically decomposed as: t2σ2 x1 (1 −t)2σ2x0",
       "zh": "具体而言，在线性插值路径 xt = (1 − t)x0 + tx1 下，对数信噪比（Log-SNR）可数学分解为：t2σ2x1 / [(1 − t)2σ2x0]（即式 2 中信号项与噪声项之比的分解形式）。"
      }
     ]
    },
    {
     "id": "eq-3-3-1-1",
     "type": "equation",
     "page": 6,
     "original": "Log-SNR(t) = 10 log10"
    },
    {
     "id": "eq-3-3-1-2",
     "type": "equation",
     "page": 6,
     "original": "40"
    },
    {
     "id": "p-3-3-1-2",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-3-3-1-2-1",
       "original": "Original Waveform (σ=0.1) 5× Scaled Waveform (σ=0.5) 10× Scaled Waveform (σ=1.0)",
       "zh": "（图 3 标签：原始波形 Original Waveform (σ=0.1) / 5× Scaled Waveform (σ=0.5) / 10× Scaled Waveform (σ=1.0)。）"
      }
     ]
    },
    {
     "id": "eq-3-3-1-3",
     "type": "equation",
     "page": 6,
     "original": "20"
    },
    {
     "id": "eq-3-3-1-4",
     "type": "equation",
     "page": 6,
     "original": "log-SNR (dB)"
    },
    {
     "id": "eq-3-3-1-5",
     "type": "equation",
     "page": 6,
     "original": "0 -20 -40 0.0 0.2 0.4 0.6 0.8 1.0 -60"
    },
    {
     "id": "p-3-3-1-3",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-3-3-1-3-1",
       "original": "t",
       "zh": "近来，工作在 VAE 潜空间或 mel 频谱图上的扩散模型已成为零样本（zero-shot）TTS 的主流范式。"
      }
     ]
    },
    {
     "id": "fig-3-3-1-1",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "fig-3-3-1-1-s1",
       "original": "Figure 3 Log-SNR curves under different waveform scaling factors, assuming σx1 = 0.1.",
       "zh": "图 3. 不同波形缩放系数下的 Log-SNR 曲线，假设 σx1 = 0.1。"
      }
     ]
    },
    {
     "id": "eq-3-3-1-6",
     "type": "equation",
     "page": 6,
     "original": "σx1"
    },
    {
     "id": "p-3-3-1-4",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-3-3-1-4-1",
       "original": "= 20 log10 t 1 −t + 20 log10",
       "zh": "（公式片段：= 20·log10(t/(1−t)) + 20·log10(·)。）"
      }
     ]
    },
    {
     "id": "eq-3-3-1-7",
     "type": "equation",
     "page": 6,
     "original": "."
    },
    {
     "id": "eq-3-3-1-8",
     "type": "equation",
     "page": 6,
     "original": "(8)"
    },
    {
     "id": "eq-3-3-1-9",
     "type": "equation",
     "page": 6,
     "original": "σx0"
    },
    {
     "id": "p-3-3-1-5",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-3-3-1-5-1",
       "original": "As illustrated in Figure 3 and Eq. (8), assuming σx1 = 0.1 and σx0 = 1, the actual log-SNR trajectory is shifted downward by 20 dB compared to the variance-aligned case where σx1 = σx0.",
       "zh": "如 Figure 3 与式 (8) 所示，假设 σx1 = 0.1、σx0 = 1，实际的 log-SNR 轨迹相比 σx1 = σx0 的方差对齐情形整体下移了 20 dB。"
      },
      {
       "id": "s-3-3-1-5-2",
       "original": "As a result, the model is forced to operate in extremely low-SNR regimes for most training timesteps, making it difficult to recover fine-grained waveform structures from an overwhelming noise background.",
       "zh": "其结果是，模型在大多数训练时刻都被迫在极低信噪比的区间工作，难以从压倒性的噪声背景中恢复细粒度的波形结构。"
      },
      {
       "id": "s-3-3-1-5-3",
       "original": "Moreover, during inference, transporting unit Gaussian noise to a low-variance waveform distribution is prone to amplifying minor prediction errors, leading to perceptible background noise and unstable artifacts.",
       "zh": "此外，推理时把单位高斯噪声传输到低方差的波形分布，容易放大微小的预测误差，产生可感知的背景噪声与不稳定伪影。"
      }
     ]
    },
    {
     "id": "p-3-3-1-6",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-3-3-1-6-1",
       "original": "To address this issue, we introduce Signal-Noise Variance Alignment.",
       "zh": "为解决这一问题，我们引入信号-噪声方差对齐。"
      },
      {
       "id": "s-3-3-1-6-2",
       "original": "Before training, we apply a constant scaling factor k to the target waveform, i.e., x′ 1 = k · x1, such that σx′ 1 ≈1.",
       "zh": "训练之前，我们对目标波形施加一个恒定的缩放系数 k，即 x′1 = k · x1，使得 σx′1 ≈ 1。"
      },
      {
       "id": "s-3-3-1-6-3",
       "original": "We then replace x1 in Eq. (3) with the scaled waveform x′ 1 as the FM prediction target.",
       "zh": "随后用缩放后的波形 x′1 替换式 (3) 中的 x1，作为 FM 的预测目标。"
      },
      {
       "id": "s-3-3-1-6-4",
       "original": "This simple operation removes the negative offset term in Eq. (8) without changing the underlying structure of the waveform manifold, providing a smoother and more balanced signal-to-noise trajectory over t ∈(0, 1).",
       "zh": "这一简单操作消去了式 (8) 中的负偏移项，同时不改变波形流形的内在结构，从而在 t ∈ (0, 1) 上提供更平滑、更均衡的信噪比轨迹。"
      },
      {
       "id": "s-3-3-1-6-5",
       "original": "Notably, to prevent energy scaling from distorting the perceptual objective, the mel-spectrogram loss is computed strictly at the original waveform scale by comparing x1 with xθ/k.",
       "zh": "值得注意的是，为防止能量缩放扭曲感知目标，mel 频谱图损失严格在原始波形尺度上计算，即比较 x1 与 xθ/k。"
      },
      {
       "id": "s-3-3-1-6-6",
       "original": "During inference, once the model predicts the scaled waveform x′ 1, we simply apply the inverse scaling factor 1/k to recover the audio to its original amplitude range.",
       "zh": "推理时，一旦模型预测出缩放后的波形 x′1，只需乘以逆缩放系数 1/k，即可将音频恢复到原始幅度范围。"
      }
     ]
    },
    {
     "id": "p-3-3-1-7",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-3-3-1-7-1",
       "original": "Uniform LogitNormal (",
       "zh": "（图 4(b)：Uniform 与 LogitNormal（µ=0.0、σ=1.0；µ=0.8、σ=0.8）调度曲线；纵轴 log(π(t)/(1−t)^2)，刻度 -4/0/2/6；Hard Phase（低 SNR）/ Easy Phase（高 SNR）；横轴 t（0.0/0.2/0.4/0.6/0.8/1.0）。）"
      }
     ]
    },
    {
     "id": "eq-3-3-1-10",
     "type": "equation",
     "page": 7,
     "original": "= 0.0, = 1.0) 2.5"
    },
    {
     "id": "eq-3-3-1-11",
     "type": "equation",
     "page": 7,
     "original": "LogitNormal ("
    },
    {
     "id": "eq-3-3-1-12",
     "type": "equation",
     "page": 7,
     "original": "= 0.8, = 0.8)"
    },
    {
     "id": "eq-3-3-1-13",
     "type": "equation",
     "page": 7,
     "original": "Probability Density (t)"
    },
    {
     "id": "eq-3-3-1-14",
     "type": "equation",
     "page": 7,
     "original": "2.0 1.5 1.0 0.5 0.0 0.0 0.2 0.4 0.6 0.8 1.0"
    },
    {
     "id": "p-3-3-1-8",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-3-3-1-8-1",
       "original": "t (a) Timestep sampling density π(t).",
       "zh": "（图 4(a)：时间步采样密度 π(t)；横轴 t。）"
      }
     ]
    },
    {
     "id": "eq-3-3-1-15",
     "type": "equation",
     "page": 7,
     "original": "6"
    },
    {
     "id": "eq-3-3-1-16",
     "type": "equation",
     "page": 7,
     "original": "Uniform LogitNormal ("
    },
    {
     "id": "eq-3-3-1-17",
     "type": "equation",
     "page": 7,
     "original": "= 0.0, = 1.0)"
    },
    {
     "id": "eq-3-3-1-18",
     "type": "equation",
     "page": 7,
     "original": "LogitNormal ("
    },
    {
     "id": "eq-3-3-1-19",
     "type": "equation",
     "page": 7,
     "original": "= 0.8, = 0.8) 4"
    },
    {
     "id": "eq-3-3-1-20",
     "type": "equation",
     "page": 7,
     "original": "log ( (t)/(1 t)2)"
    },
    {
     "id": "eq-3-3-1-21",
     "type": "equation",
     "page": 7,
     "original": "2 0"
    },
    {
     "id": "eq-3-3-1-22",
     "type": "equation",
     "page": 7,
     "original": "Hard Phase Easy Phase (Low SNR) (High SNR)"
    },
    {
     "id": "eq-3-3-1-23",
     "type": "equation",
     "page": 7,
     "original": "2 0.0 0.2 0.4 0.6 0.8 1.0"
    },
    {
     "id": "p-3-3-1-9",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-3-3-1-9-1",
       "original": "t (b) Implicit loss weight π(t)/(1 −t)2 in log scale.",
       "zh": "（图 4(b)：Uniform 与 LogitNormal（µ=0.0、σ=1.0；µ=0.8、σ=0.8）调度曲线；纵轴 log(π(t)/(1−t)^2)，刻度 -4/0/2/6；Hard Phase（低 SNR）/ Easy Phase（高 SNR）；横轴 t（0.0/0.2/0.4/0.6/0.8/1.0）。）"
      }
     ]
    },
    {
     "id": "fig-3-3-1-2",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "fig-3-3-1-2-s1",
       "original": "Figure 4 Illustration of timestep sampling densities and their corresponding implicit loss weights under the x-prediction objective. The noise-shifted schedule emphasizes low-SNR regions while reducing the excessive loss weight near t →1.",
       "zh": "图 4. x-prediction 目标下时刻采样密度及其对应隐式损失权重的示意图。噪声偏移调度强调低信噪比区域，同时降低 t → 1 附近过大的损失权重。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-3-3-2",
   "num": "3.3.2",
   "level": 2,
   "page": 7,
   "title": {
    "original": "Noise-Shifted Temporal Scheduling",
    "zh": "噪声偏移时间调度"
   },
   "blocks": [
    {
     "id": "p-3-3-2-1",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-3-3-2-1-1",
       "original": "During training, existing flow-matching-based TTS models [8, 108] typically adopt uniform timestep sampling, i.e., t ∼U(0, 1).",
       "zh": "训练时，现有基于流匹配的 TTS 模型 [8, 108] 通常采用均匀时刻采样，即 t ∼ U(0, 1)。"
      },
      {
       "id": "s-3-3-2-1-2",
       "original": "However, under the x-prediction objective, predicting the raw waveform x′ 1 from the interpolated state xt = (1 −t)x0 + tx′ 1 leads to highly imbalanced modeling difficulty across timesteps.",
       "zh": "然而，在 x-prediction 目标下，从插值状态 xt = (1 − t)x0 + tx′1 预测原始波形 x′1，会导致不同时刻上的建模难度高度不均衡。"
      },
      {
       "id": "s-3-3-2-1-3",
       "original": "When t →0, the input is dominated by Gaussian noise, forcing the model to reconstruct the waveform under extremely low-SNR conditions.",
       "zh": "当 t → 0 时，输入被高斯噪声主导，模型被迫在极低信噪比条件下重建波形。"
      },
      {
       "id": "s-3-3-2-1-4",
       "original": "In contrast, when t →1, the input is already close to the target, and the model only needs to remove minor residual noise.",
       "zh": "相反，当 t → 1 时，输入已接近目标，模型只需去除少量残余噪声。"
      },
      {
       "id": "s-3-3-2-1-5",
       "original": "To mitigate this issue, following practices in image generation [18, 49], we sample training timesteps from a logit-normal distribution.",
       "zh": "为缓解这一问题，我们沿用图像生成中的做法 [18, 49]，从 logit-normal 分布中采样训练时刻。"
      },
      {
       "id": "s-3-3-2-1-6",
       "original": "Formally, we draw u ∼N(µ, σ2) and set t = sigmoid(u), yielding t ∼LogitNormal(µ, σ2).",
       "zh": "形式化地，我们抽取 u ∼ N(µ, σ2) 并令 t = sigmoid(u)，从而得到 t ∼ LogitNormal(µ, σ2)。"
      },
      {
       "id": "s-3-3-2-1-7",
       "original": "In practice, we set µ < 0 to shift the sampling density π(t) toward high-noise regions, as shown in Figure 4a.",
       "zh": "实际中，我们取 µ < 0，将采样密度 π(t) 移向高噪声区域，如 Figure 4a 所示。"
      },
      {
       "id": "s-3-3-2-1-8",
       "original": "From the perspective of the x-prediction objective, non-uniform timestep sampling can be equivalently interpreted as implicit loss re-weighting [18] under uniform sampling:",
       "zh": "从 x-prediction 目标的视角看，非均匀时刻采样可以等价地解释为均匀采样下的隐式损失重加权 [18]：损失中的每一项都带有 1/(1 −t)2 · ∥xθ − x′1∥2 2 的形式。"
      }
     ]
    },
    {
     "id": "eq-3-3-2-1",
     "type": "equation",
     "page": 7,
     "original": "1"
    },
    {
     "id": "eq-3-3-2-2",
     "type": "equation",
     "page": 7,
     "original": "(1 −t)2 ∥xθ −x′"
    },
    {
     "id": "eq-3-3-2-3",
     "type": "equation",
     "page": 7,
     "original": "1∥2 2"
    },
    {
     "id": "eq-3-3-2-4",
     "type": "equation",
     "page": 7,
     "original": "LFM = Et∼π(t), x0,x′ 1"
    },
    {
     "id": "p-3-3-2-2",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-3-3-2-2-1",
       "original": "= Et∼U(0,1), x0,x′",
       "zh": "（公式：= E_{t~U(0,1), x0, x′1}[π(t)/(1 −t)^2 · ‖x_θ − x′_1‖^2_2]。）"
      }
     ]
    },
    {
     "id": "eq-3-3-2-5",
     "type": "equation",
     "page": 7,
     "original": "1"
    },
    {
     "id": "eq-3-3-2-6",
     "type": "equation",
     "page": 7,
     "original": "π(t) (1 −t)2 ∥xθ −x′"
    },
    {
     "id": "eq-3-3-2-7",
     "type": "equation",
     "page": 7,
     "original": "1∥2 2 ."
    },
    {
     "id": "eq-3-3-2-8",
     "type": "equation",
     "page": 7,
     "original": "(9)"
    },
    {
     "id": "p-3-3-2-3",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-3-3-2-3-1",
       "original": "As illustrated in Figure 4b, noise-shifted scheduling amplifies the expected loss weights in early high-noise regions while suppressing those in later near-clean regions.",
       "zh": "（式 9）如图 4b 所示，噪声偏移调度放大了早期高噪声区的期望损失权重，同时抑制后期近干净区的权重。"
      },
      {
       "id": "s-3-3-2-3-2",
       "original": "This encourages the model to allocate more capacity to the challenging stage of coarse waveform structure formation, while reducing redundant optimization on easier late-stage denoising.",
       "zh": "这促使模型把更多容量分配给粗粒度波形结构成形这一困难阶段，同时减少在较容易的后期去噪上的冗余优化。"
      },
      {
       "id": "s-3-3-2-3-3",
       "original": "Notably, the logit-normal density naturally decays near both boundaries, i.e., t →0 and t →1.",
       "zh": "值得注意的是，logit-normal 密度在两个边界（t → 0 与 t → 1）附近都自然衰减。"
      },
      {
       "id": "s-3-3-2-3-4",
       "original": "This boundary decay avoids over-penalizing nearly pure-noise inputs while also mitigating excessive optimization on near-clean states, encouraging the model to focus on structurally informative low-SNR timesteps.",
       "zh": "这种边界衰减既避免了对接近纯噪声输入的过度惩罚，也缓解了对近干净状态的过度优化，使模型聚焦于结构信息量大的低信噪比时刻。"
      }
     ]
    },
    {
     "id": "p-3-3-2-4",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-3-3-2-4-1",
       "original": "During inference, shifting the sampling schedule toward high-noise regions, as opposed to uniform sampling, has proven effective for improving speech synthesis quality [8, 104], a trend that we also observe in direct waveform modeling.",
       "zh": "推理时，相比均匀采样，把采样调度移向高噪声区域已被证明能改善语音合成质量 [8, 104]；我们在直接波形建模中也观察到了同样的趋势。"
      },
      {
       "id": "s-3-3-2-4-2",
       "original": "From the perspective of ODE integration, early steps in noisy regions are particularly critical: truncation errors accumulated in this stage can propagate throughout the trajectory and substantially degrade the global waveform structure.",
       "zh": "从 ODE 积分的视角看，噪声区域的早期步骤尤为关键：该阶段累积的截断误差会沿整条轨迹传播，严重破坏全局波形结构。"
      },
      {
       "id": "s-3-3-2-4-3",
       "original": "However, existing inference schedules are not always optimal for our setting.",
       "zh": "然而，现有的推理调度对我们的设定而言并非总是最优。"
      },
      {
       "id": "s-3-3-2-4-4",
       "original": "For example, Sway Sampling [8] provides only a limited degree of timestep shifting, which we find insufficient for high-dimensional raw waveform generation.",
       "zh": "例如，Sway Sampling [8] 只能提供有限程度的时刻偏移，我们发现这对高维原始波形生成而言是不够的。"
      },
      {
       "id": "s-3-3-2-4-5",
       "original": "To address this limitation, we propose PolyShift, a composite noise-shifted inference schedule that combines a polynomial transformation [32] with a time-shift function [18].",
       "zh": "为弥补这一局限，我们提出 PolyShift——一种复合的噪声偏移推理调度，将多项式变换 [32] 与时间偏移函数 [18] 相结合。"
      },
      {
       "id": "s-3-3-2-4-6",
       "original": "This design enables more flexible control over the inference trajectory and allows denser integration in challenging high-noise regions.",
       "zh": "该设计能对推理轨迹进行更灵活的控制，并在困难的高噪声区域布置更密集的积分。"
      },
      {
       "id": "s-3-3-2-4-7",
       "original": "Given a uniformly spaced sequence τ ∈[0, 1], the actual inference timestep t is defined as:",
       "zh": "给定一个均匀间隔的序列 τ ∈ [0, 1]，实际推理时刻 t 定义如下："
      }
     ]
    },
    {
     "id": "eq-3-3-2-9",
     "type": "equation",
     "page": 8,
     "original": "τ p + s(1 −τ p), (10)"
    },
    {
     "id": "eq-3-3-2-10",
     "type": "equation",
     "page": 8,
     "original": "t = τ p"
    },
    {
     "id": "p-3-3-2-5",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-3-3-2-5-1",
       "original": "where p is the power factor and s is the shift factor.",
       "zh": "其中 p 为幂因子，s 为偏移因子。"
      },
      {
       "id": "s-3-3-2-5-2",
       "original": "By setting p > 1 and s > 1, PolyShift sampling flexibly allocates more integration steps to challenging high-noise regions.",
       "zh": "通过设定 p > 1 与 s > 1，PolyShift 采样可灵活地把更多积分步分配给困难的高噪声区域。"
      },
      {
       "id": "s-3-3-2-5-3",
       "original": "This reduces early-stage numerical errors and suppresses generation artifacts, ultimately leading to higher-fidelity waveform synthesis.",
       "zh": "这减少了早期阶段的数值误差并抑制生成伪影，最终带来更高保真度的波形合成。"
      },
      {
       "id": "s-3-3-2-5-4",
       "original": "We provide further comparison and analysis of different inference timestep sampling strategies in Appendix B.",
       "zh": "在 Appendix B 中，我们对不同推理时刻采样策略给出了更详细的比较与分析。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-4",
   "num": "4",
   "level": 1,
   "page": 8,
   "title": {
    "original": "Experimental Setup",
    "zh": "实验设置"
   },
   "blocks": [
    {
     "id": "p-4-1",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-4-1-1",
       "original": "Datasets.",
       "zh": "数据集。"
      },
      {
       "id": "s-4-1-2",
       "original": "We train WavTTS on the open-source Emilia dataset [26], which contains approximately 95K hours of English and Chinese speech.",
       "zh": "我们在开源的 Emilia 数据集 [26] 上训练 WavTTS，该数据集包含约 95K 小时的英语与中文语音。"
      },
      {
       "id": "s-4-1-3",
       "original": "For zero-shot TTS evaluation, we use the Seed-TTS test-en set [1], which consists of 1,088 samples from Common Voice [2], and the Seed-TTS test-zh set, which contains 2,020 samples from DiDiSpeech [23].",
       "zh": "零样本 TTS 评测使用 Seed-TTS test-en 集 [1]（包含来自 Common Voice [2] 的 1,088 个样本）与 Seed-TTS test-zh 集（包含来自 DiDiSpeech [23] 的 2,020 个样本）。"
      },
      {
       "id": "s-4-1-4",
       "original": "For standard TTS evaluation against prior end-to-end speech generation models, we use 682 in-domain English test samples from LJSpeech [35] and the LibriSpeech-PC [57] test-clean subset, which contains 1,127 English samples, following the evaluation split of F5-TTS [8].",
       "zh": "与以往端到端语音生成模型的标准 TTS 对比评测中，我们使用来自 LJSpeech [35] 的 682 个领域内英语测试样本，以及 LibriSpeech-PC [57] 的 test-clean 子集（包含 1,127 个英语样本），评测划分沿用 F5-TTS [8]。"
      }
     ]
    },
    {
     "id": "p-4-2",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-4-2-1",
       "original": "Model Setup.",
       "zh": "模型设置。"
      },
      {
       "id": "s-4-2-2",
       "original": "We train WavTTS for 1.2M steps on 8 NVIDIA A100 80GB GPUs, with a batch size of 153,600 audio patch frames, corresponding to approximately 0.43 hours of audio.",
       "zh": "我们在 8 张 NVIDIA A100 80GB GPU 上训练 WavTTS 共 1.2M 步，batch 大小为 153,600 个音频 patch 帧，约相当于 0.43 小时的音频。"
      },
      {
       "id": "s-4-2-3",
       "original": "We use the AdamW optimizer [53] with a peak learning rate of 7.5 × 10−5, which is linearly warmed up for 20K updates and then kept constant.",
       "zh": "优化器采用 AdamW [53]，峰值学习率为 7.5 × 10−5，先线性预热 20K 步，之后保持恒定。"
      },
      {
       "id": "s-4-2-4",
       "original": "All audio is resampled to 16 kHz, and the waveform patch size is set to F = 160, resulting in a patchified sequence rate of 100 Hz.",
       "zh": "所有音频重采样至 16 kHz，波形 patch 大小设为 F = 160，patch 化后的序列帧率为 100 Hz。"
      },
      {
       "id": "s-4-2-5",
       "original": "We set λmel = 0.05 to balance the FM objective and mel-spectrogram supervision.",
       "zh": "设 λmel = 0.05，以平衡 FM 目标与 mel 频谱图监督。"
      },
      {
       "id": "s-4-2-6",
       "original": "For noise-aware training, we use a scaling factor of k = 9, since Emilia’s empirical waveform standard deviation is approximately 0.12.",
       "zh": "噪声感知训练使用缩放系数 k = 9，因为 Emilia 上波形的经验标准差约为 0.12。"
      },
      {
       "id": "s-4-2-7",
       "original": "Following prior practice [49], we adopt logit-normal timestep sampling with µ = −0.8 and σ = 0.8.",
       "zh": "沿用先前做法 [49]，我们采用 logit-normal 时刻采样，取 µ = −0.8、σ = 0.8。"
      },
      {
       "id": "s-4-2-8",
       "original": "During inference, we use 50 NFEs, a CFG scale of α = 3, and the PolyShift inference schedule with p = 2 and s = 3.",
       "zh": "推理时使用 50 次 NFE、CFG 强度 α = 3，并采用 p = 2、s = 3 的 PolyShift 推理调度。"
      },
      {
       "id": "s-4-2-9",
       "original": "More model configurations and implementation details are provided in Appendix A.",
       "zh": "更多模型配置与实现细节见 Appendix A。"
      }
     ]
    },
    {
     "id": "p-4-3",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-4-3-1",
       "original": "Baselines.",
       "zh": "基线。"
      },
      {
       "id": "s-4-3-2",
       "original": "For zero-shot TTS evaluation, we primarily compare WavTTS with state-of-the-art NAR models, including mel-spectrogram-based systems such as E2-TTS [17], F5-TTS [8], and ZipVoice [108], as well as latent-based systems such as MaskGCT [87] and LongCat-AudioDiT [92].",
       "zh": "零样本 TTS 评测中，我们主要将 WavTTS 与最先进的 NAR 模型对比，包括基于 mel 频谱图的 E2-TTS [17]、F5-TTS [8] 与 ZipVoice [108]，以及基于潜空间的 MaskGCT [87] 与 LongCat-AudioDiT [92]。"
      },
      {
       "id": "s-4-3-3",
       "original": "We also report the performance of representative AR models for reference, including CosyVoice [14], CosyVoice 2 [15], Llasa [96], and SparkTTS [86].",
       "zh": "我们还列出了代表性 AR 模型的表现供参考，包括 CosyVoice [14]、CosyVoice 2 [15]、Llasa [96] 与 SparkTTS [86]。"
      },
      {
       "id": "s-4-3-4",
       "original": "For standard TTS evaluation against prior end-to-end waveform generation models, we use publicly available implementations, including WaveGrad 2 [4], VITS [40], and JETS [50].",
       "zh": "与以往端到端波形生成模型的标准 TTS 对比中，我们使用公开可用的实现，包括 WaveGrad 2 [4]、VITS [40] 与 JETS [50]。"
      },
      {
       "id": "s-4-3-5",
       "original": "For VITS, we evaluate two variants trained on LJSpeech and VCTK [93], denoted as VITSLJ and VITSVCTK, respectively.",
       "zh": "对于 VITS，我们评测了分别在 LJSpeech 与 VCTK [93] 上训练的两个变体，记为 VITSLJ 与 VITSVCTK。"
      }
     ]
    },
    {
     "id": "p-4-4",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-4-4-1",
       "original": "Evaluation Metrics.",
       "zh": "评测指标。"
      },
      {
       "id": "s-4-4-2",
       "original": "We adopt three reproducible model-based metrics for objective evaluation.",
       "zh": "我们采用三个可复现的模型化指标进行客观评测。"
      },
      {
       "id": "s-4-4-3",
       "original": "Intelligibility is measured by word error rate (WER) using ASR models, with Whisper-large-v3 [66] for English and Paraformer-zh [20] for Chinese.",
       "zh": "可懂度以词错误率（WER）衡量，使用 ASR 模型转写：英语用 Whisper-large-v3 [66]，中文用 Paraformer-zh [20]。"
      },
      {
       "id": "s-4-4-4",
       "original": "Speaker similarity is evaluated by SIM-o, where a WavLM-based speaker verification model [9] is used to extract speaker representations from the generated speech and the reference prompt, followed by cosine similarity computation.",
       "zh": "说话人相似度以 SIM-o 衡量：用基于 WavLM 的说话人验证模型 [9] 分别从生成语音与参考提示中提取说话人表征，再计算余弦相似度。"
      },
      {
       "id": "s-4-4-5",
       "original": "Naturalness is assessed by UTMOS [70], which predicts the mean opinion score (MOS) of synthesized speech.",
       "zh": "自然度由 UTMOS [70] 评估，它预测合成语音的平均意见分（MOS）。"
      }
     ]
    },
    {
     "id": "tab-4-1",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "tab-4-1-s1",
       "original": "Table 1 Zero-shot TTS results on the Seed-TTS benchmark. Best results are highlighted in bold, and second-best are underlined. “Multi.” denotes multilingual training data. †Results are taken from the original papers.",
       "zh": "表 1. Seed-TTS 基准上的零样本 TTS 结果。最优结果加粗，次优加下划线。「Multi.」表示多语言训练数据。†结果摘自原论文。"
      }
     ]
    },
    {
     "id": "p-4-5",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-4-5-1",
       "original": "Model Params Data (hrs) Seed-TTS test-en Seed-TTS test-zh WER(%) ↓ SIM-o ↑ UTMOS ↑ CER(%) ↓ SIM-o ↑ UTMOS ↑ Ground Truth",
       "zh": "表头：Model × Params × Data (hrs) × Seed-TTS test-en（WER(%)↓/SIM-o↑/UTMOS↑）× Seed-TTS test-zh（CER(%)↓/SIM-o↑/UTMOS↑）——Ground Truth –/–：1.79/0.73/3.53、1.25/0.75/2.78；AR Models†：CosyVoice 416M、170K 小时、Multi.（后续照原文）。"
      }
     ]
    },
    {
     "id": "eq-4-1",
     "type": "equation",
     "page": 9,
     "original": "– – 1.79 0.73 3.53 1.25 0.75 2.78"
    },
    {
     "id": "p-4-6",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-4-6-1",
       "original": "AR Models† CosyVoice 416M 170K Multi.",
       "zh": "表头：Model × Params × Data (hrs) × Seed-TTS test-en（WER(%)↓/SIM-o↑/UTMOS↑）× Seed-TTS test-zh（CER(%)↓/SIM-o↑/UTMOS↑）——Ground Truth –/–：1.79/0.73/3.53、1.25/0.75/2.78；AR Models†：CosyVoice 416M、170K 小时、Multi.（后续照原文）。"
      }
     ]
    },
    {
     "id": "eq-4-2",
     "type": "equation",
     "page": 9,
     "original": "4.29 0.61 – 3.63 0.72 –"
    },
    {
     "id": "p-4-7",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-4-7-1",
       "original": "CosyVoice 2 618M 167K Multi.",
       "zh": "（表格行）4.29/0.61/–/3.63/0.72/–；CosyVoice 2 618M、167K 小时、Multi.（后续照原文）。"
      }
     ]
    },
    {
     "id": "eq-4-3",
     "type": "equation",
     "page": 9,
     "original": "2.57 0.65 – 1.45 0.75 –"
    },
    {
     "id": "p-4-8",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-4-8-1",
       "original": "Llasa-1B 1370M 250K Multi.",
       "zh": "（表格行）2.57/0.65/–/1.45/0.75/–；Llasa-1B 1370M、250K 小时、Multi.（后续照原文）。"
      }
     ]
    },
    {
     "id": "eq-4-4",
     "type": "equation",
     "page": 9,
     "original": "3.22 0.57 – 1.89 0.67 –"
    },
    {
     "id": "p-4-9",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-4-9-1",
       "original": "Spark-TTS 507M 102K Multi.",
       "zh": "（表格行）3.22/0.57/–/1.89/0.67/–；Spark-TTS 507M、102K 小时、Multi.（后续照原文）。"
      }
     ]
    },
    {
     "id": "eq-4-5",
     "type": "equation",
     "page": 9,
     "original": "1.98 0.58 – 1.20 0.67 –"
    },
    {
     "id": "eq-4-6",
     "type": "equation",
     "page": 9,
     "original": "NAR Latent/Mel-Spectrogram Models MaskGCT 1048M 100K Emilia"
    },
    {
     "id": "eq-4-7",
     "type": "equation",
     "page": 9,
     "original": "2.36 0.71 3.57 2.48 0.77 2.64"
    },
    {
     "id": "eq-4-8",
     "type": "equation",
     "page": 9,
     "original": "E2-TTS 333M 100K Emilia"
    },
    {
     "id": "eq-4-9",
     "type": "equation",
     "page": 9,
     "original": "2.21 0.71 3.20 1.97 0.73 2.27"
    },
    {
     "id": "eq-4-10",
     "type": "equation",
     "page": 9,
     "original": "F5-TTS 336M 100K Emilia"
    },
    {
     "id": "eq-4-11",
     "type": "equation",
     "page": 9,
     "original": "1.65 0.66 3.73 1.55 0.75 2.94"
    },
    {
     "id": "eq-4-12",
     "type": "equation",
     "page": 9,
     "original": "ZipVoice 123M 100K Emilia"
    },
    {
     "id": "eq-4-13",
     "type": "equation",
     "page": 9,
     "original": "1.60 0.70 3.83 1.40 0.75 3.15"
    },
    {
     "id": "p-4-10",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-4-10-1",
       "original": "LongCat-AudioDiT 1420M 100K Multi.",
       "zh": "（表格行）LongCat-AudioDiT 1420M、100K 小时、Multi.。"
      }
     ]
    },
    {
     "id": "eq-4-14",
     "type": "equation",
     "page": 9,
     "original": "1.94 0.76 3.80 1.10 0.81 3.16"
    },
    {
     "id": "eq-4-15",
     "type": "equation",
     "page": 9,
     "original": "NAR Waveform Space Models WavTTS 673M 100K Emilia"
    },
    {
     "id": "eq-4-16",
     "type": "equation",
     "page": 9,
     "original": "1.50 0.65 3.92 1.59 0.73 3.08"
    }
   ]
  },
  {
   "id": "sec-5",
   "num": "5",
   "level": 1,
   "page": 9,
   "title": {
    "original": "Experimental Results",
    "zh": "实验结果"
   },
   "blocks": []
  },
  {
   "id": "sec-5-1",
   "num": "5.1",
   "level": 2,
   "page": 9,
   "title": {
    "original": "Overall Performance",
    "zh": "总体性能"
   },
   "blocks": []
  },
  {
   "id": "sec-5-1-1",
   "num": "5.1.1",
   "level": 2,
   "page": 9,
   "title": {
    "original": "Zero-Shot TTS Evaluation",
    "zh": "零样本 TTS 评测"
   },
   "blocks": [
    {
     "id": "p-5-1-1-1",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-5-1-1-1-1",
       "original": "As shown in Table 1, WavTTS demonstrates that high-quality zero-shot TTS can be achieved without relying on pre-trained neural codecs, vocoders, or autoencoders.",
       "zh": "如 Table 1 所示，WavTTS 证明了无需依赖预训练神经 codec、声码器或自编码器，也能实现高质量的零样本 TTS。"
      },
      {
       "id": "s-5-1-1-1-2",
       "original": "In particular, it exhibits strong intelligibility and objective naturalness.",
       "zh": "特别地，它展现出很强的可懂度与客观自然度。"
      },
      {
       "id": "s-5-1-1-1-3",
       "original": "On the English test set, it achieves the best WER of 1.50% and the highest UTMOS score of 3.92 among all evaluated baselines, while also maintaining competitive performance on the Chinese test set.",
       "zh": "在英文测试集上，它在所有参评基线中取得最优的 WER 1.50% 与最高的 UTMOS 3.92，同时在中文测试集上也保持了有竞争力的表现。"
      },
      {
       "id": "s-5-1-1-1-4",
       "original": "In terms of speaker similarity, WavTTS still lags behind some highly optimized latent-space models.",
       "zh": "在说话人相似度上，WavTTS 仍落后于一些经过高度优化的潜空间模型。"
      },
      {
       "id": "s-5-1-1-1-5",
       "original": "We hypothesize that this is because waveform-space generation operates on high-dimensional, uncompressed time-domain signals that contain rich, fine-grained acoustic variations (e.g., phase and ambient details).",
       "zh": "我们推测，这是因为波形空间生成作用在高维、未压缩的时域信号上，其中包含丰富而细粒度的声学变化（如相位与环境细节）。"
      },
      {
       "id": "s-5-1-1-1-6",
       "original": "This inherent complexity makes it harder for a finite-capacity model to prioritize target-speaker timbre cloning during generation.",
       "zh": "这种固有的复杂性使得容量有限的模型更难在生成时优先保证目标说话人的音色克隆。"
      },
      {
       "id": "s-5-1-1-1-7",
       "original": "Therefore, further model scaling and tailored speaker-oriented alignment strategies may be important for fully exploiting the potential of raw waveform TTS.",
       "zh": "因此，进一步的模型扩展与面向说话人的定制对齐策略，可能是充分释放原始波形 TTS 潜力的关键。"
      }
     ]
    },
    {
     "id": "p-5-1-1-2",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-5-1-1-2-1",
       "original": "Overall, the results validate the feasibility of direct waveform-space generation for zero-shot TTS, establishing WavTTS as a streamlined end-to-end alternative to existing multi-stage TTS pipelines.",
       "zh": "总体而言，这些结果验证了直接波形空间生成用于零样本 TTS 的可行性，使 WavTTS 成为现有多阶段 TTS 流水线之外一种流程精简的端到端替代方案。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-5-1-2",
   "num": "5.1.2",
   "level": 2,
   "page": 9,
   "title": {
    "original": "Comparison with End-to-End Speech Generation Models",
    "zh": "与端到端语音生成模型的比较"
   },
   "blocks": [
    {
     "id": "p-5-1-2-1",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-5-1-2-1-1",
       "original": "Since most prior end-to-end speech generation models do not support zero-shot TTS, we focus our comparison on intelligibility (WER) and objective naturalness (UTMOS).",
       "zh": "由于以往大多数端到端语音生成模型不支持零样本 TTS，我们的比较聚焦于可懂度（WER）与客观自然度（UTMOS）。"
      },
      {
       "id": "s-5-1-2-1-2",
       "original": "These baselines are predominantly trained on the single-speaker LJSpeech [35] dataset, except for VITSVCTK.",
       "zh": "这些基线除 VITSVCTK 外，均在单说话人的 LJSpeech [35] 数据集上训练。"
      },
      {
       "id": "s-5-1-2-1-3",
       "original": "To reduce the influence of speaker timbre differences on the UTMOS metric and ensure a fairer naturalness evaluation, we prompt WavTTS with a fixed audio clip randomly selected from LJSpeech for zero-shot synthesis.",
       "zh": "为降低说话人音色差异对 UTMOS 指标的影响、保证更公平的自然度评测，我们从 LJSpeech 中随机选取一段固定音频作为提示，让 WavTTS 做零样本合成。"
      }
     ]
    },
    {
     "id": "tab-5-1-2-1",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "tab-5-1-2-1-s1",
       "original": "Table 2 Comparison of TTS performance with previous endto-end speech generation models.",
       "zh": "表 2. 与以往端到端语音生成模型的 TTS 性能比较。"
      }
     ]
    },
    {
     "id": "p-5-1-2-2",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-5-1-2-2-1",
       "original": "Model LJSpeech LibriSpeech-PC WER(%) ↓ UTMOS ↑ WER(%) ↓ UTMOS ↑ Ground Truth",
       "zh": "（表 2：Model × LJSpeech（WER(%)↓/UTMOS↑）× LibriSpeech-PC（WER(%)↓/UTMOS↑）——Ground Truth 3.42/4.36/2.23/4.10；WaveGrad 2 25.19/3.24/33.77/3.05；VITS_VCTK 9.34/4.06/10.23/4.03；VITS_LJ 3.72/4.37/2.23/4.36；JETS 3.73/4.36/3.00/4.34；WavTTS 3.43/4.39/2.02/4.36。）如表 2 所示，WavTTS 在两个测试集上都取得最低 WER 与最高 UTMOS。"
      }
     ]
    },
    {
     "id": "eq-5-1-2-1",
     "type": "equation",
     "page": 9,
     "original": "3.42 4.36 2.23 4.10"
    },
    {
     "id": "eq-5-1-2-2",
     "type": "equation",
     "page": 9,
     "original": "WaveGrad 2"
    },
    {
     "id": "eq-5-1-2-3",
     "type": "equation",
     "page": 9,
     "original": "25.19 3.24 33.77 3.05"
    },
    {
     "id": "eq-5-1-2-4",
     "type": "equation",
     "page": 9,
     "original": "VITSVCTK"
    },
    {
     "id": "eq-5-1-2-5",
     "type": "equation",
     "page": 9,
     "original": "9.34 4.06 10.23 4.03"
    },
    {
     "id": "eq-5-1-2-6",
     "type": "equation",
     "page": 9,
     "original": "VITSLJ"
    },
    {
     "id": "eq-5-1-2-7",
     "type": "equation",
     "page": 9,
     "original": "3.72 4.37 2.23 4.36"
    },
    {
     "id": "eq-5-1-2-8",
     "type": "equation",
     "page": 9,
     "original": "JETS"
    },
    {
     "id": "eq-5-1-2-9",
     "type": "equation",
     "page": 9,
     "original": "3.73 4.36 3.00 4.34"
    },
    {
     "id": "eq-5-1-2-10",
     "type": "equation",
     "page": 9,
     "original": "WavTTS"
    },
    {
     "id": "eq-5-1-2-11",
     "type": "equation",
     "page": 9,
     "original": "3.43 4.39 2.02 4.36"
    },
    {
     "id": "p-5-1-2-3",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-5-1-2-3-1",
       "original": "As shown in Table 2, WavTTS achieves the lowest WER and the highest UTMOS across both test sets.",
       "zh": "（表 2：Model × LJSpeech（WER(%)↓/UTMOS↑）× LibriSpeech-PC（WER(%)↓/UTMOS↑）——Ground Truth 3.42/4.36/2.23/4.10；WaveGrad 2 25.19/3.24/33.77/3.05；VITS_VCTK 9.34/4.06/10.23/4.03；VITS_LJ 3.72/4.37/2.23/4.36；JETS 3.73/4.36/3.00/4.34；WavTTS 3.43/4.39/2.02/4.36。）如表 2 所示，WavTTS 在两个测试集上都取得最低 WER 与最高 UTMOS。"
      },
      {
       "id": "s-5-1-2-3-2",
       "original": "Notably, under the zero-shot setting, WavTTS outperforms prior supervised systems on the LJSpeech test set, which closely matches their training distributions, and maintains strong performance on the out-of-domain LibriSpeech-PC dataset.",
       "zh": "值得注意的是，在零样本设定下，WavTTS 在与其训练分布高度匹配的 LJSpeech 测试集上超过了以往的有监督系统，并在领域外的 LibriSpeech-PC 数据集上保持了强劲表现。"
      },
      {
       "id": "s-5-1-2-3-3",
       "original": "These results demonstrate the superior intelligibility, naturalness, and robust generalization capabilities of our approach.",
       "zh": "这些结果表明我们的方法具备更优的可懂度、自然度与稳健的泛化能力。"
      }
     ]
    },
    {
     "id": "p-5-1-2-4",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-5-1-2-4-1",
       "original": "It is worth noting that although models such as VITS and JETS are commonly categorized as end-to-end systems, they do not model raw audio directly.",
       "zh": "值得指出的是，VITS、JETS 这类模型虽通常被归为端到端系统，但它们并不直接建模原始音频。"
      },
      {
       "id": "s-5-1-2-4-2",
       "original": "Instead, their core acoustic sequence modeling is performed in intermediate latent spaces with lower temporal resolution, followed by adversarial decoders that upsample these representations into high-dimensional waveforms.",
       "zh": "它们的核心声学序列建模是在时间分辨率较低的中间潜空间中完成的，随后再由对抗解码器将这些表征上采样为高维波形。"
      },
      {
       "id": "s-5-1-2-4-3",
       "original": "In contrast, WavTTS directly models raw waveforms through patchification while achieving superior TTS performance.",
       "zh": "相比之下，WavTTS 通过 patch 化直接建模原始波形，并取得了更优的 TTS 性能。"
      },
      {
       "id": "s-5-1-2-4-4",
       "original": "This demonstrates the potential of native waveform generation as a simpler and more direct paradigm for end-to-end speech synthesis.",
       "zh": "这展示了原生波形生成作为一种更简洁、更直接的端到端语音合成范式的潜力。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-5-2",
   "num": "5.2",
   "level": 2,
   "page": 10,
   "title": {
    "original": "Ablation Studies",
    "zh": "消融研究"
   },
   "blocks": [
    {
     "id": "p-5-2-1",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-5-2-1-1",
       "original": "We conduct ablation studies on WavTTS to validate the effectiveness of our core design choices.",
       "zh": "我们对 WavTTS 进行消融研究，以验证核心设计选择的有效性。"
      },
      {
       "id": "s-5-2-1-2",
       "original": "For a fair and computationally efficient comparison, all variants are trained for 1M steps on 8 NVIDIA A100 80GB GPUs and evaluated on the Seed-TTS test-en set with the same inference strategy as in Section 4.",
       "zh": "为保证公平且计算开销可控的比较，所有变体均在 8 张 NVIDIA A100 80GB GPU 上训练 1M 步，并采用与 Section 4 相同的推理策略在 Seed-TTS test-en 集上评测。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-5-2-1",
   "num": "5.2.1",
   "level": 2,
   "page": 10,
   "title": {
    "original": "Training Objectives",
    "zh": "训练目标"
   },
   "blocks": [
    {
     "id": "p-5-2-1-1",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-5-2-1-1-1",
       "original": "As shown in Table 3, we study the impact of the flow matching prediction target and the weight of the multi-scale mel-spectrogram loss λmel.",
       "zh": "如 Table 3 所示，我们研究流匹配预测目标与多尺度 mel 频谱图损失权重 λmel 的影响。"
      },
      {
       "id": "s-5-2-1-1-2",
       "original": "Compared with v-prediction, x-prediction achieves slightly better intelligibility and a clear improvement in speaker similarity, suggesting that directly predicting the clean waveform, rather than the vector field, provides a more effective learning target for raw waveform modeling.",
       "zh": "与 v-prediction 相比，x-prediction 的可懂度略优，且说话人相似度提升明显，说明对原始波形建模而言，直接预测干净波形比预测向量场是更有效的学习目标。"
      },
      {
       "id": "s-5-2-1-1-3",
       "original": "In addition, x-prediction naturally aligns with auxiliary melspectrogram supervision, as the mel loss can be directly applied to the predicted waveform.",
       "zh": "此外，x-prediction 与辅助的 mel 频谱图监督天然契合，因为 mel 损失可以直接施加在预测波形上。"
      },
      {
       "id": "s-5-2-1-1-4",
       "original": "By contrast, v-prediction requires reconstructing the waveform prediction from the estimated velocity before computing the mel loss.",
       "zh": "相比之下，v-prediction 需要先由估计的速度重建出波形预测，才能计算 mel 损失。"
      }
     ]
    },
    {
     "id": "tab-5-2-1-1",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "tab-5-2-1-1-s1",
       "original": "Table 3 Ablations on the prediction objective and melspectrogram loss weight. Default settings are marked in gray .",
       "zh": "表 3. 预测目标与 mel 频谱图损失权重的消融。默认设置以灰色标出。"
      }
     ]
    },
    {
     "id": "p-5-2-1-2",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-5-2-1-2-1",
       "original": "Prediction Target λmel WER (%) ↓ SIM-o ↑ UTMOS ↑ v-prediction",
       "zh": "（表：Prediction Target × λ_mel × WER(%)↓ × SIM-o↑ × UTMOS↑——v-prediction：0.05→1.67/0.61/3.94；0→1.92/0.56/3.77；0.01→1.77/0.60/3.87；0.05→1.65/0.65/3.93；0.2→1.74/0.60/3.89；0.5→1.81/0.55/3.82；x-prediction（对照）。）λ_mel 的消融凸显适当感知监督的关键作用。"
      }
     ]
    },
    {
     "id": "eq-5-2-1-1",
     "type": "equation",
     "page": 10,
     "original": "0.05 1.67 0.61 3.94 0 1.92 0.56 3.77 0.01 1.77 0.60 3.87 0.05 1.65 0.65 3.93 0.2 1.74 0.60 3.89 0.5 1.81 0.55 3.82"
    },
    {
     "id": "p-5-2-1-3",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-5-2-1-3-1",
       "original": "x-prediction The ablation on λmel highlights the critical role of appropriate perceptual supervision.",
       "zh": "（表：Prediction Target × λ_mel × WER(%)↓ × SIM-o↑ × UTMOS↑——v-prediction：0.05→1.67/0.61/3.94；0→1.92/0.56/3.77；0.01→1.77/0.60/3.87；0.05→1.65/0.65/3.93；0.2→1.74/0.60/3.89；0.5→1.81/0.55/3.82；x-prediction（对照）。）λ_mel 的消融凸显适当感知监督的关键作用。"
      },
      {
       "id": "s-5-2-1-3-2",
       "original": "Without the melspectrogram loss (λmel = 0), the model degrades consistently across all metrics, indicating that sample-level flow matching alone is insufficient for efficient raw waveform generation.",
       "zh": "去掉 mel 频谱图损失（λmel = 0）后，模型在所有指标上全面退化，说明仅靠样本级的流匹配不足以支撑高效的原始波形生成。"
      },
      {
       "id": "s-5-2-1-3-3",
       "original": "The mel loss also substantially accelerates training convergence: at 200k steps, the model trained with mel supervision already reduces WER below 5%, while the model without mel supervision still fails to generate intelligible speech.",
       "zh": "mel 损失还大幅加速了训练收敛：在 200k 步时，带 mel 监督的模型已将 WER 降至 5% 以下，而没有 mel 监督的模型此时仍无法生成可懂的语音。"
      },
      {
       "id": "s-5-2-1-3-4",
       "original": "However, excessively large values of λmel (λmel ∈{0.2, 0.5}) degrade both intelligibility and speaker similarity, suggesting that overly strong perceptual supervision may distract the model from learning the underlying waveform-space flow.",
       "zh": "然而，过大的 λmel（λmel ∈ {0.2, 0.5}）会同时损害可懂度与说话人相似度，说明过强的感知监督可能分散模型对底层波形空间流的学习。"
      },
      {
       "id": "s-5-2-1-3-5",
       "original": "We therefore set λmel = 0.05 as the default configuration.",
       "zh": "因此我们将 λmel = 0.05 设为默认配置。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-5-2-2",
   "num": "5.2.2",
   "level": 2,
   "page": 10,
   "title": {
    "original": "Noise Scheduling",
    "zh": "噪声调度"
   },
   "blocks": [
    {
     "id": "tab-5-2-2-1",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "tab-5-2-2-1-s1",
       "original": "Table 4 investigates the impact of the waveform scaling factor k on model performance. Without amplitude scaling (k = 1), the model suffers from severe degradation, with SIM-o and UTMOS scores substantially lower than those of the scaled variants. This indicates that, without proper scaling, the target waveform remains overwhelmed by Gaussian noise over a large portion of the diffusion trajectory, leading to inefficient learning in the raw waveform space during training. By employing the proposed Signal-Noise Variance Alignment strategy (k = 9), the model achieves the highest SIM-o and UTMOS scores while maintaining a competitive WER. Interestingly, a smaller scaling factor (k = 5) slightly improves intelligibility and yields faster WER convergence. We hypothesize that a relatively higher noise ratio forces the model to prioritize coarse-grained linguistic structures. However, this intelligibility gain comes at the expense of speaker similarity and naturalness;",
       "zh": "表 4（正文说明部分）：考察波形缩放系数 k 对模型性能的影响。不做幅度缩放（k = 1）时模型性能严重退化，SIM-o 与 UTMOS 远低于缩放变体，说明缺乏适当缩放时目标波形在扩散轨迹的大部分区段被高斯噪声淹没，导致原始波形空间中的低效学习。采用提出的信号-噪声方差对齐（k = 9）后，模型取得最高的 SIM-o 与 UTMOS，WER 保持有竞争力。有趣的是，较小的缩放系数（k = 5）略微改善可懂度并加快 WER 收敛，我们推测是较高的噪声比例迫使模型优先学习粗粒度语言结构；但这种可懂度收益以说话人相似度与自然度为代价。"
      }
     ]
    },
    {
     "id": "tab-5-2-2-2",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "tab-5-2-2-2-s1",
       "original": "Table 4 Ablations on the scaling factor k. Default settings are marked in gray .",
       "zh": "表 4. 缩放系数 k 的消融。默认设置以灰色标出。"
      }
     ]
    },
    {
     "id": "p-5-2-2-1",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-5-2-2-1-1",
       "original": "k WER (%) ↓ SIM-o ↑ UTMOS ↑",
       "zh": "（表格行：k × WER(%)↓ × SIM-o↑ × UTMOS↑——1：4.18/0.32/2.40；5：1.51/0.59/3.81；9：1.65/0.65/3.93；10：1.82/0.64/3.87。）主观试听进一步发现电子噪声、去噪不完全等可闻伪影。"
      }
     ]
    },
    {
     "id": "eq-5-2-2-1",
     "type": "equation",
     "page": 10,
     "original": "1 4.18 0.32 2.40 5 1.51 0.59 3.81 9 1.65 0.65 3.93 10 1.82 0.64 3.87"
    },
    {
     "id": "p-5-2-2-2",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-5-2-2-2-1",
       "original": "subjective listening further reveals audible artifacts such as electronic noise and incomplete denoising.",
       "zh": "（表格行：k × WER(%)↓ × SIM-o↑ × UTMOS↑——1：4.18/0.32/2.40；5：1.51/0.59/3.81；9：1.65/0.65/3.93；10：1.82/0.64/3.87。）主观试听进一步发现电子噪声、去噪不完全等可闻伪影。"
      },
      {
       "id": "s-5-2-2-2-2",
       "original": "Overall, aligning the variance between the signal and Gaussian noise provides a better balance between objective metrics and perceptual quality, making it an effective design choice for raw waveform diffusion modeling.",
       "zh": "总体而言，在信号与高斯噪声之间对齐方差，能在客观指标与感知质量之间取得更好的平衡，是原始波形扩散建模中有效的设计选择。"
      }
     ]
    },
    {
     "id": "eq-5-2-2-2",
     "type": "equation",
     "page": 11,
     "original": "15.0 0.65 12.5 0.60"
    },
    {
     "id": "eq-5-2-2-3",
     "type": "equation",
     "page": 11,
     "original": "WER (%)"
    },
    {
     "id": "eq-5-2-2-4",
     "type": "equation",
     "page": 11,
     "original": "10.0"
    },
    {
     "id": "eq-5-2-2-5",
     "type": "equation",
     "page": 11,
     "original": "SIM-o"
    },
    {
     "id": "eq-5-2-2-6",
     "type": "equation",
     "page": 11,
     "original": "7.5 0.55 5.0 0.50 2.5 4.0 3.9"
    },
    {
     "id": "eq-5-2-2-7",
     "type": "equation",
     "page": 11,
     "original": "UTMOS"
    },
    {
     "id": "eq-5-2-2-8",
     "type": "equation",
     "page": 11,
     "original": "3.8 3.7 3.6"
    },
    {
     "id": "p-5-2-2-3",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-5-2-2-3-1",
       "original": "200K 400K 600K 800K 1M Training Steps 200K 400K 600K 800K 1M Training Steps 200K 400K 600K 800K 1M Training Steps Uniform",
       "zh": "（图横轴：Training Steps（200K / 400K / 600K / 800K / 1M，三组）；Uniform。）"
      }
     ]
    },
    {
     "id": "eq-5-2-2-9",
     "type": "equation",
     "page": 11,
     "original": "LogitNormal (μ = 0.0, σ = 1.0) LogitNormal (μ = −0.8, σ = 0.8) LogitNormal (μ = −1.2, σ = 1.0)"
    },
    {
     "id": "fig-5-2-2-1",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "fig-5-2-2-1-s1",
       "original": "Figure 5 Comparison of zero-shot TTS performance under different training noise schedules.",
       "zh": "图 5. 不同训练噪声调度下零样本 TTS 性能的对比。"
      }
     ]
    },
    {
     "id": "p-5-2-2-4",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-5-2-2-4-1",
       "original": "To validate the noise-shifted temporal scheduling introduced in Section 3.3.2, we compare different timestep sampling strategies during training.",
       "zh": "为验证 Section 3.3.2 引入的噪声偏移时间调度，我们比较训练期的不同时刻采样策略。"
      },
      {
       "id": "s-5-2-2-4-2",
       "original": "Specifically, we evaluate the three distributions illustrated in Figure 4a, together with a more aggressive noise-shifted variant, t ∼LogitNormal(µ = −1.2, σ = 1.0), which further biases the sampling density toward high-noise regions compared with µ = −0.8.",
       "zh": "具体而言，我们评测 Figure 4a 所示的三种分布，外加一个更激进的噪声偏移变体 t ∼ LogitNormal(µ = −1.2, σ = 1.0)，它比 µ = −0.8 更偏向高噪声区域。"
      }
     ]
    },
    {
     "id": "p-5-2-2-5",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-5-2-2-5-1",
       "original": "As shown in Figure 5, appropriately shifting training timesteps toward high-noise regions accelerates convergence and improves final performance.",
       "zh": "如 Figure 5 所示，适度地将训练时刻移向高噪声区域能加速收敛并提升最终性能。"
      },
      {
       "id": "s-5-2-2-5-2",
       "original": "In particular, using a logit-normal distribution with µ < 0 leads to substantially faster WER convergence than the other strategies, reducing WER below 2% within 400K steps and achieving a lower final WER.",
       "zh": "特别地，采用 µ < 0 的 logit-normal 分布比其他策略的 WER 收敛快得多：在 400K 步内即可将 WER 降到 2% 以下，且最终 WER 更低。"
      },
      {
       "id": "s-5-2-2-5-3",
       "original": "This suggests that high-noise timesteps are crucial for learning text–speech alignment and coarse linguistic structures in waveform-based flow matching; consequently, increasing their sampling probability enhances synthesis intelligibility.",
       "zh": "这表明高噪声时刻对学习文本-语音对齐与粗粒度语言结构至关重要；提高其采样概率能增强合成的可懂度。"
      },
      {
       "id": "s-5-2-2-5-4",
       "original": "However, excessively shifting the sampling distribution toward the noise side can compromise the modeling of speaker characteristics and fine-grained acoustic details.",
       "zh": "然而，过度地将采样分布移向噪声一侧，会损害对说话人特征与细粒度声学细节的建模。"
      },
      {
       "id": "s-5-2-2-5-5",
       "original": "For example, the aggressive setting, t ∼LogitNormal(µ = −1.2, σ = 1.0), leads to degradation in both SIM-o and UTMOS.",
       "zh": "例如，激进的 t ∼ LogitNormal(µ = −1.2, σ = 1.0) 设置会导致 SIM-o 与 UTMOS 双双下降。"
      },
      {
       "id": "s-5-2-2-5-6",
       "original": "We therefore adopt µ = −0.8 and σ = 0.8 as the default configuration, which strikes a better balance for zero-shot TTS.",
       "zh": "因此我们采用 µ = −0.8、σ = 0.8 作为默认配置，它在零样本 TTS 上取得了更好的平衡。"
      },
      {
       "id": "s-5-2-2-5-7",
       "original": "Interestingly, uniform sampling converges more slowly but achieves the highest final UTMOS, possibly because it allocates more training samples to lower-noise regions, which helps the model refine local acoustic details.",
       "zh": "有趣的是，均匀采样收敛更慢，却取得了最高的最终 UTMOS——可能是因为它把更多训练样本分配给了低噪声区域，有助于模型打磨局部声学细节。"
      },
      {
       "id": "s-5-2-2-5-8",
       "original": "Future work will explore dynamic sampling scheduling that adjusts the timestep distribution over the course of training to further improve overall performance.",
       "zh": "未来工作将探索随训练进程动态调整时刻分布的采样调度，以进一步提升整体性能。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-5-2-3",
   "num": "5.2.3",
   "level": 2,
   "page": 11,
   "title": {
    "original": "Inference Strategies",
    "zh": "推理策略"
   },
   "blocks": [
    {
     "id": "p-5-2-3-1",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-5-2-3-1-1",
       "original": "We evaluate the model, trained for 1M steps, using various timestep schedules during inference with the NFE set to 50.",
       "zh": "我们在 NFE 设为 50 的条件下，用各种时刻调度评测训练了 1M 步的模型。"
      },
      {
       "id": "s-5-2-3-1-2",
       "original": "As shown in Table 5, noise-shifted schedules, such as Sway Sampling and our proposed PolyShift, significantly outperform uniform sampling in overall zero-shot TTS performance.",
       "zh": "如 Table 5 所示，噪声偏移调度（如 Sway Sampling 与我们提出的 PolyShift）在整体零样本 TTS 性能上显著优于均匀采样。"
      },
      {
       "id": "s-5-2-3-1-3",
       "original": "This demonstrates that allocating more timesteps to the high-noise regime—namely, the initial phase of the ODE trajectory—crucially enhances final speech synthesis quality.",
       "zh": "这说明把更多时刻分配给高噪声区间——即 ODE 轨迹的初始阶段——对最终语音合成质量至关重要。"
      },
      {
       "id": "s-5-2-3-1-4",
       "original": "Furthermore, applying a more aggressive shift strategy by replacing Sway Sampling with PolyShift yields further improvements in SIM-o and UTMOS.",
       "zh": "此外，用 PolyShift 替换 Sway Sampling 这一更激进的偏移策略，在 SIM-o 与 UTMOS 上带来了进一步提升。"
      },
      {
       "id": "s-5-2-3-1-5",
       "original": "This suggests that flow matching in the raw waveform space necessitates a denser early-stage timestep allocation to formulate a better generative trajectory prototype.",
       "zh": "这表明在原始波形空间做流匹配，需要在早期阶段布置更密集的时刻，以形成更好的生成轨迹原型。"
      },
      {
       "id": "s-5-2-3-1-6",
       "original": "Notably, while an excessively large shift, such as PolyShift (p = 2.0, s = 5.0), marginally reduces the WER, it introduces more pronounced background noise in subjective listening.",
       "zh": "值得注意的是，过大的偏移（如 PolyShift 取 p = 2.0、s = 5.0）虽能略微降低 WER，但在主观试听中引入了更明显的背景噪声。"
      },
      {
       "id": "s-5-2-3-1-7",
       "original": "We attribute this artifact to inadequate fine-grained",
       "zh": "我们将这种伪影归因于细粒度细化不足——由分配给后期阶段的时刻稀缺所致（该句在抽取文本中被表格截断，后半句见下）。"
      }
     ]
    },
    {
     "id": "tab-5-2-3-1",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "tab-5-2-3-1-s1",
       "original": "Table 5 Comparison of inference timestep schedules. Default settings are marked in gray .",
       "zh": "表 5. 推理时刻调度的对比。默认设置以灰色标出。"
      }
     ]
    },
    {
     "id": "p-5-2-3-2",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-5-2-3-2-1",
       "original": "Inference Schedule WER (%) ↓ SIM-o ↑ UTMOS ↑ Uniform",
       "zh": "（表格：Inference Schedule × WER(%)↓ × SIM-o↑ × UTMOS↑——Uniform 1.78/0.63/3.77；Sway Sampling（s′=−1.0）1.68/0.64/3.88；PolyShift（p=2.0, s=1.0）1.60/0.64/3.88；PolyShift（p=2.0, s=3.0）1.65/0.65/3.93；PolyShift（p=2.0, s=5.0）1.58/0.65/3.92。）后期阶段分配的时间步不足导致细化（refinement）不够。"
      }
     ]
    },
    {
     "id": "eq-5-2-3-1",
     "type": "equation",
     "page": 11,
     "original": "1.78 0.63 3.77"
    },
    {
     "id": "eq-5-2-3-2",
     "type": "equation",
     "page": 11,
     "original": "Sway Sampling (s′ = −1.0)"
    },
    {
     "id": "eq-5-2-3-3",
     "type": "equation",
     "page": 11,
     "original": "1.68 0.64 3.88"
    },
    {
     "id": "eq-5-2-3-4",
     "type": "equation",
     "page": 11,
     "original": "PolyShift (p = 2.0, s = 1.0)"
    },
    {
     "id": "eq-5-2-3-5",
     "type": "equation",
     "page": 11,
     "original": "1.60 0.64 3.88"
    },
    {
     "id": "eq-5-2-3-6",
     "type": "equation",
     "page": 11,
     "original": "PolyShift (p = 2.0, s = 3.0)"
    },
    {
     "id": "eq-5-2-3-7",
     "type": "equation",
     "page": 11,
     "original": "1.65 0.65 3.93"
    },
    {
     "id": "eq-5-2-3-8",
     "type": "equation",
     "page": 11,
     "original": "PolyShift (p = 2.0, s = 5.0)"
    },
    {
     "id": "eq-5-2-3-9",
     "type": "equation",
     "page": 11,
     "original": "1.58 0.65 3.92"
    },
    {
     "id": "p-5-2-3-3",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-5-2-3-3-1",
       "original": "refinement, caused by a scarcity of timesteps allocated to the later stages.",
       "zh": "（表格：Inference Schedule × WER(%)↓ × SIM-o↑ × UTMOS↑——Uniform 1.78/0.63/3.77；Sway Sampling（s′=−1.0）1.68/0.64/3.88；PolyShift（p=2.0, s=1.0）1.60/0.64/3.88；PolyShift（p=2.0, s=3.0）1.65/0.65/3.93；PolyShift（p=2.0, s=5.0）1.58/0.65/3.92。）后期阶段分配的时间步不足导致细化（refinement）不够。"
      },
      {
       "id": "s-5-2-3-3-2",
       "original": "Consequently, we adopt PolyShift (p = 2.0, s = 3.0) as our default inference configuration.",
       "zh": "因此，我们采用 PolyShift（p = 2.0，s = 3.0）作为默认推理配置。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-5-2-4",
   "num": "5.2.4",
   "level": 2,
   "page": 12,
   "title": {
    "original": "Scaling Behaviors",
    "zh": "缩放行为"
   },
   "blocks": [
    {
     "id": "p-5-2-4-1",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-5-2-4-1-1",
       "original": "To investigate the scaling behavior of WavTTS with respect to training data and model size, we train WavTTS and a smaller-backbone variant, detailed in Appendix A, on two datasets: LibriTTS [99] and Emilia [26].",
       "zh": "为考察 WavTTS 随训练数据与模型规模的缩放行为，我们在 LibriTTS [99] 与 Emilia [26] 两个数据集上分别训练 WavTTS 及一个骨干更小的变体（详见 Appendix A）。"
      },
      {
       "id": "s-5-2-4-1-2",
       "original": "LibriTTS represents a low-resource setting with approximately 585 hours of English speech, whereas Emilia provides a large-scale 100K-hour multilingual corpus.",
       "zh": "LibriTTS 代表低资源设定，仅有约 585 小时的英语语音；Emilia 则提供 100K 小时规模的多语言语料。"
      }
     ]
    },
    {
     "id": "p-5-2-4-2",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-5-2-4-2-1",
       "original": "As shown in Table 6, the scale of training data and model capacity both have a substantial impact on final performance.",
       "zh": "如 Table 6 所示，训练数据规模与模型容量对最终性能都有显著影响。"
      }
     ]
    },
    {
     "id": "p-5-2-4-3",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-5-2-4-3-1",
       "original": "When trained on LibriTTS, both models exhibit poor zero-shot generalization on the out-of-domain Seed-TTS test-en set, yielding SIM-o scores in the 0.3 range.",
       "zh": "在 LibriTTS 上训练时，两个模型在领域外的 Seed-TTS test-en 集上零样本泛化都很差，SIM-o 仅约 0.3。"
      },
      {
       "id": "s-5-2-4-3-2",
       "original": "In contrast, scaling up to the 100K-hour Emilia dataset markedly improves speaker similarity and reduces WER below 2% for both model sizes.",
       "zh": "相比之下，扩展到 100K 小时的 Emilia 数据集后，两种大小的模型说话人相似度都明显提升，WER 也都降到 2% 以下。"
      },
      {
       "id": "s-5-2-4-3-3",
       "original": "This suggests that large-scale and diverse data is essential for learning robust speaker characteristics and linguistic content directly in the high-dimensional waveform space.",
       "zh": "这说明，要在高维波形空间中直接学习到稳健的说话人特征与语言内容，大规模且多样的数据是必不可少的。"
      }
     ]
    },
    {
     "id": "tab-5-2-4-1",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "tab-5-2-4-1-s1",
       "original": "Table 6 Scaling behavior of WavTTS under different training data scales and model sizes.",
       "zh": "表 6. WavTTS 在不同训练数据规模与模型大小下的缩放行为。"
      }
     ]
    },
    {
     "id": "p-5-2-4-4",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-5-2-4-4-1",
       "original": "Training Data Model Size WER (%) ↓ SIM-o ↑ UTMOS ↑ LibriTTS (585 hrs) 340M",
       "zh": "（表格：Training Data × Model Size × WER(%)↓ × SIM-o↑ × UTMOS↑——LibriTTS（585 小时）：340M 2.16/0.35/3.95，673M 2.12/0.31/3.94；Emilia（100K 小时）：340M 1.74/0.56/3.87，673M 1.65/0.65/3.93。）在 Emilia 上把模型从 340M 增至 673M 进一步改善 WER 与 SIM-o，说话人相似度提升尤其明显。"
      }
     ]
    },
    {
     "id": "eq-5-2-4-1",
     "type": "equation",
     "page": 12,
     "original": "2.16 0.35 3.95"
    },
    {
     "id": "eq-5-2-4-2",
     "type": "equation",
     "page": 12,
     "original": "673M"
    },
    {
     "id": "eq-5-2-4-3",
     "type": "equation",
     "page": 12,
     "original": "2.12 0.31 3.94"
    },
    {
     "id": "eq-5-2-4-4",
     "type": "equation",
     "page": 12,
     "original": "Emilia (100K hrs) 340M"
    },
    {
     "id": "eq-5-2-4-5",
     "type": "equation",
     "page": 12,
     "original": "1.74 0.56 3.87"
    },
    {
     "id": "eq-5-2-4-6",
     "type": "equation",
     "page": 12,
     "original": "673M"
    },
    {
     "id": "eq-5-2-4-7",
     "type": "equation",
     "page": 12,
     "original": "1.65 0.65 3.93"
    },
    {
     "id": "p-5-2-4-5",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-5-2-4-5-1",
       "original": "Increasing the model size from 340M to 673M further improves WER and SIM-o when trained on Emilia, with a particularly clear gain in speaker similarity.",
       "zh": "（表格：Training Data × Model Size × WER(%)↓ × SIM-o↑ × UTMOS↑——LibriTTS（585 小时）：340M 2.16/0.35/3.95，673M 2.12/0.31/3.94；Emilia（100K 小时）：340M 1.74/0.56/3.87，673M 1.65/0.65/3.93。）在 Emilia 上把模型从 340M 增至 673M 进一步改善 WER 与 SIM-o，说话人相似度提升尤其明显。"
      },
      {
       "id": "s-5-2-4-5-2",
       "original": "Interestingly, this benefit is not observed under the low-resource LibriTTS setting, where the larger model brings little intelligibility improvement and even slightly degrades speaker similarity.",
       "zh": "有趣的是，在低资源的 LibriTTS 设定下并未观察到这种收益：更大的模型几乎没有带来可懂度提升，说话人相似度甚至略有下降。"
      },
      {
       "id": "s-5-2-4-5-3",
       "original": "This indicates that model scaling is effective only when supported by sufficient training data.",
       "zh": "这表明，模型扩展只有在有充足训练数据支撑时才有效。"
      },
      {
       "id": "s-5-2-4-5-4",
       "original": "Overall, these results show scaling trends consistent with prior large-scale TTS systems [16, 45], suggesting that sufficient data scale and matched model capacity are both critical for achieving high-quality zero-shot TTS in the raw waveform space.",
       "zh": "总体而言，这些结果呈现出与以往大规模 TTS 系统 [16, 45] 一致的扩展趋势，说明在原始波形空间中，足够的数据规模与相匹配的模型容量对实现高质量零样本 TTS 都至关重要。"
      }
     ]
    },
    {
     "id": "eq-5-2-4-8",
     "type": "equation",
     "page": 12,
     "original": "100 0.6 80"
    },
    {
     "id": "eq-5-2-4-9",
     "type": "equation",
     "page": 12,
     "original": "WER (%)"
    },
    {
     "id": "eq-5-2-4-10",
     "type": "equation",
     "page": 12,
     "original": "60"
    },
    {
     "id": "eq-5-2-4-11",
     "type": "equation",
     "page": 12,
     "original": "SIM-o"
    },
    {
     "id": "eq-5-2-4-12",
     "type": "equation",
     "page": 12,
     "original": "0.5 40 0.4 20 0 0.3 4.0 3.8 3.6"
    },
    {
     "id": "eq-5-2-4-13",
     "type": "equation",
     "page": 12,
     "original": "UTMOS"
    },
    {
     "id": "eq-5-2-4-14",
     "type": "equation",
     "page": 12,
     "original": "3.4 3.2 3.0"
    },
    {
     "id": "p-5-2-4-6",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-5-2-4-6-1",
       "original": "200K 400K 600K 800K 1M Training Steps 200K 400K 600K 800K 1M Training Steps 200K 400K 600K 800K 1M Training Steps Mel-Spectrogram Waveform (Ours) STFT MDCT",
       "zh": "（图横轴：Training Steps（200K / 400K / 600K / 800K / 1M，三组）；Mel-Spectrogram / Waveform (Ours) / STFT / MDCT。）"
      }
     ]
    },
    {
     "id": "fig-5-2-4-1",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "fig-5-2-4-1-s1",
       "original": "Figure 6 Comparison of zero-shot TTS performance curves using different acoustic representations. Waveform, STFT, and MDCT are lossless (or nearly lossless) representations, while mel-spectrograms are lossy and require an additional pre-trained vocoder [72] for waveform reconstruction.",
       "zh": "图 6. 使用不同声学表征的零样本 TTS 性能曲线对比。Waveform、STFT 与 MDCT 为无损（或接近无损）表征，而 mel 频谱图是有损表征，需要额外的预训练声码器 [72] 来重建波形。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-5-2-5",
   "num": "5.2.5",
   "level": 2,
   "page": 12,
   "title": {
    "original": "Comparison of Acoustic Representations",
    "zh": "声学表征的比较"
   },
   "blocks": [
    {
     "id": "p-5-2-5-1",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-5-2-5-1-1",
       "original": "Raw waveforms preserve speech signals directly in the time domain, while speech can also be represented by lossless or nearly lossless time-frequency transforms, such as short-time Fourier transform (STFT) and modified discrete cosine transform (MDCT) coefficients, which support waveform reconstruction through corresponding inverse transforms.",
       "zh": "原始波形直接在时域保留语音信号；语音也可以用无损或近无损的时频变换表征，例如短时傅里叶变换（STFT）与改进离散余弦变换（MDCT）系数，它们都支持通过相应的逆变换重建波形。"
      },
      {
       "id": "s-5-2-5-1-2",
       "original": "To examine whether frequency-domain modeling offers advantages over direct waveform modeling, we compare these representations under the same flow matching framework.",
       "zh": "为考察频域建模是否优于直接波形建模，我们在同一流匹配框架下比较这些表征。"
      },
      {
       "id": "s-5-2-5-1-3",
       "original": "For reference, we additionally include mel-spectrograms as a standard lossy acoustic representation.",
       "zh": "作为参照，我们还加入了 mel 频谱图这一标准的有损声学表征。"
      },
      {
       "id": "s-5-2-5-1-4",
       "original": "Details of STFT- and MDCT-based diffusion modeling are provided in Appendix C.",
       "zh": "基于 STFT 与 MDCT 的扩散建模细节见 Appendix C。"
      }
     ]
    },
    {
     "id": "fig-5-2-5-1",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "fig-5-2-5-1-s1",
       "original": "Figure 6 compares zero-shot TTS performance across different acoustic representations. Overall, both raw waveform and mel-spectrogram models converge efficiently, achieving under 10% WER and over 0.5 SIM-o at 200K training steps. Notably, waveform modeling outperforms mel-spectrograms with faster early intelligibility convergence (4.10% vs. 9.76% WER at 200K steps) and better objective naturalness (3.93 vs. 3.68 UTMOS at 1M steps), while maintaining comparable speaker similarity. These results suggest that WavTTS can effectively model high-dimensional waveform structures and benefit from the lossless nature of raw waveforms for natural speech synthesis.",
       "zh": "图 6 对比了不同声学表征下的零样本 TTS 性能。总体而言，原始波形与 mel 频谱图模型都能高效收敛，在 200K 训练步时 WER 已低于 10%、SIM-o 超过 0.5。值得注意的是，波形建模在早期可懂度收敛上优于 mel 频谱图（200K 步时 WER 4.10% 对 9.76%），客观自然度也更好（1M 步时 UTMOS 3.93 对 3.68），说话人相似度则相当。这些结果表明 WavTTS 能有效建模高维波形结构，并从原始波形的无损特性中受益，产出自然的合成语音。"
      }
     ]
    },
    {
     "id": "p-5-2-5-2",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-5-2-5-2-1",
       "original": "In contrast, STFT and MDCT representations exhibit significantly slower convergence and inferior final zero-shot TTS performance.",
       "zh": "相比之下，STFT 与 MDCT 表征的收敛明显更慢，最终零样本 TTS 性能也较差。"
      },
      {
       "id": "s-5-2-5-2-2",
       "original": "The MDCT-based model begins to generate recognizable speech after 400K steps, while the STFT-based model requires around 600K steps.",
       "zh": "基于 MDCT 的模型要到 400K 步之后才开始生成可辨认的语音，而基于 STFT 的模型则需要约 600K 步。"
      },
      {
       "id": "s-5-2-5-2-3",
       "original": "We hypothesize that this stems from the inherent complexity of these time-frequency representations.",
       "zh": "我们推测这源于这些时频表征内在的复杂性。"
      },
      {
       "id": "s-5-2-5-2-4",
       "original": "STFT requires modeling complex-valued coefficients with coupled magnitude-phase structures, while MDCT exhibits an unfavorable feature distribution for flow matching.",
       "zh": "STFT 需要建模幅度与相位结构相互耦合的复数系数，而 MDCT 的特征分布对流匹配不利。"
      },
      {
       "id": "s-5-2-5-2-5",
       "original": "For example, on sampled Emilia data, MDCT features have a standard deviation of only about 0.005 but a maximum value of 0.15, indicating a sharply peaked distribution with extreme outliers that may hinder effective learning.",
       "zh": "例如，在抽样的 Emilia 数据上，MDCT 特征的标准差仅约 0.005，但最大值达 0.15，说明其分布尖峰明显、极端离群值多，可能妨碍有效学习。"
      },
      {
       "id": "s-5-2-5-2-6",
       "original": "Consequently, developing flow-matching TTS in such frequency-domain spaces may necessitate more delicate feature preprocessing and architectural modifications.",
       "zh": "因此，在这类频域空间中开发流匹配 TTS，可能需要更精细的特征预处理与架构改造。"
      }
     ]
    },
    {
     "id": "p-5-2-5-3",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-5-2-5-3-1",
       "original": "Overall, this comparison highlights direct waveform modeling as a simple yet effective approach.",
       "zh": "总体而言，这一比较凸显了直接波形建模是一种简单而有效的方法。"
      },
      {
       "id": "s-5-2-5-3-2",
       "original": "It avoids additional time-frequency transforms and inverse reconstruction, while achieving performance comparable to, or even better than, the widely used lossy mel-spectrogram representation.",
       "zh": "它避免了额外的时频变换与逆重建，同时取得了与广泛使用的有损 mel 频谱图表征相当甚至更好的性能。"
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
    "original": "Conclusion",
    "zh": "结论"
   },
   "blocks": [
    {
     "id": "p-6-1",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-6-1-1",
       "original": "In this paper, we proposed WavTTS, an end-to-end zero-shot TTS framework that directly models speech in the raw waveform space.",
       "zh": "本文提出 WavTTS——一个直接在原始波形空间建模语音的端到端零样本 TTS 框架。"
      },
      {
       "id": "s-6-1-2",
       "original": "By combining flow matching with a Diffusion Transformer backbone and an efficient patchification strategy, WavTTS enables tractable modeling of high-dimensional time-domain signals without relying on neural codecs, vocoders, or autoencoders.",
       "zh": "通过将流匹配与 Diffusion Transformer 骨干及高效的 patch 化策略相结合，WavTTS 无需依赖神经 codec、声码器或自编码器，就能对高维时域信号进行可计算的建模。"
      },
      {
       "id": "s-6-1-3",
       "original": "To further improve optimization efficiency and perceptual quality, we adopted an x-prediction objective with auxiliary multi-scale mel-spectrogram supervision, together with signal-noise variance alignment and noise-shifted temporal scheduling tailored for waveform-space modeling.",
       "zh": "为进一步提升优化效率与感知质量，我们采用了配合多尺度 mel 频谱图辅助监督的 x-prediction 目标，以及专为波形空间建模设计的信号-噪声方差对齐与噪声偏移时间调度。"
      },
      {
       "id": "s-6-1-4",
       "original": "Experimental results demonstrate that WavTTS closely approaches state-of-the-art NAR zero-shot TTS models based on compressed representations, while substantially outperforming previous end-to-end speech generation systems.",
       "zh": "实验结果表明，WavTTS 已接近基于压缩表征的最先进 NAR 零样本 TTS 模型，同时大幅超越以往的端到端语音生成系统。"
      },
      {
       "id": "s-6-1-5",
       "original": "Overall, WavTTS validates the feasibility of a streamlined, native waveform generation paradigm, paving a promising path toward high-quality end-to-end speech synthesis.",
       "zh": "总体而言，WavTTS 验证了精简的原生波形生成范式的可行性，为高质量端到端语音合成开辟了一条有前景的路径。"
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
       "original": "[1] Philip Anastassiou, Jiawei Chen, Jitong Chen, Yuanzhe Chen, Zhuo Chen, Ziyi Chen, Jian Cong, Lelai Deng, Chuang Ding, Lu Gao, et al. Seed-TTS: A Family of High-Quality Versatile Speech Generation Models. arXiv preprint arXiv:2406.02430, 2024."
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
       "original": "[2] Rosana Ardila, Megan Branson, Kelly Davis, Michael Kohler, Josh Meyer, Michael Henretty, Reuben Morais, Lindsay Saunders, Francis Tyers, and Gregor Weber."
      },
      {
       "id": "s-references-2-2",
       "original": "Common Voice: A Massively-Multilingual Speech Corpus."
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
       "original": "In Proceedings of the twelfth language resources and evaluation conference, pages 4218–4222, 2020."
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
       "original": "[3] Roi Benita, Michael Elad, and Joseph Keshet."
      },
      {
       "id": "s-references-4-2",
       "original": "DiffAR: Denoising Diffusion Autoregressive Model for Raw Speech Waveform Generation."
      },
      {
       "id": "s-references-4-3",
       "original": "In The Twelfth International Conference on Learning Representations, 2024."
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
       "original": "[4] Nanxin Chen, Yu Zhang, Heiga Zen, Ron J Weiss, Mohammad Norouzi, Najim Dehak, and William Chan."
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
       "original": "WaveGrad 2: Iterative Refinement for Text-to-Speech Synthesis."
      },
      {
       "id": "s-references-6-2",
       "original": "Interspeech 2021, pages 3765–3769, 2021."
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
       "original": "[5] Sanyuan Chen, Shujie Liu, Long Zhou, Yanqing Liu, Xu Tan, Jinyu Li, Sheng Zhao, Yao Qian, and Furu Wei."
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
       "original": "VALL-E 2: Neural Codec Language Models are Human Parity Zero-Shot Text to Speech Synthesizers. arXiv preprint arXiv:2406.05370, 2024."
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
       "original": "[6] Shoufa Chen, Chongjian Ge, Shilong Zhang, Peize Sun, and Ping Luo."
      },
      {
       "id": "s-references-9-2",
       "original": "PixelFlow: Pixel-Space Generative Models with Flow. arXiv preprint arXiv:2504.07963, 2025."
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
       "original": "[7] Ting Chen."
      },
      {
       "id": "s-references-10-2",
       "original": "On the Importance of Noise Scheduling for Diffusion Models. arXiv preprint arXiv:2301.10972, 2023."
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
       "original": "[8] Yushen Chen, Zhikang Niu, Ziyang Ma, Keqi Deng, Chunhui Wang, JianZhao JianZhao, Kai Yu, and Xie Chen."
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
       "original": "F5-TTS: A Fairytaler that Fakes Fluent and Faithful Speech with Flow Matching."
      },
      {
       "id": "s-references-12-2",
       "original": "In Proceedings of the 63rd Annual Meeting of the Association for Computational Linguistics (Volume 1: Long Papers), pages 6255–6271,"
      }
     ]
    },
    {
     "id": "eq-references-1",
     "type": "equation",
     "page": 14,
     "original": "2025."
    },
    {
     "id": "p-references-13",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-13-1",
       "original": "[9] Zhengyang Chen, Sanyuan Chen, Yu Wu, Yao Qian, Chengyi Wang, Shujie Liu, Yanmin Qian, and Michael Zeng."
      },
      {
       "id": "s-references-13-2",
       "original": "Large-Scale Self-Supervised Speech Representation Learning for Automatic Speaker Verification."
      },
      {
       "id": "s-references-13-3",
       "original": "In ICASSP 2022-2022 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP), pages 6147–6151."
      },
      {
       "id": "s-references-13-4",
       "original": "IEEE, 2022."
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
       "original": "[10] Zhennan Chen, Junwei Zhu, Xu Chen, Jiangning Zhang, Xiaobin Hu, Hanzhen Zhao, Chengjie Wang, Jian Yang, and Ying Tai."
      },
      {
       "id": "s-references-14-2",
       "original": "DiP: Taming diffusion models in pixel space. arXiv preprint arXiv:2511.18822, 2025."
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
       "original": "[11] Alexandre Défossez, Jade Copet, Gabriel Synnaeve, and Yossi Adi."
      },
      {
       "id": "s-references-15-2",
       "original": "High Fidelity Neural Audio Compression. arXiv preprint arXiv:2210.13438, 2022."
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
       "original": "[12] Prafulla Dhariwal and Alexander Nichol."
      },
      {
       "id": "s-references-16-2",
       "original": "Diffusion Models Beat GANs on Image Synthesis."
      },
      {
       "id": "s-references-16-3",
       "original": "Advances in neural information processing systems, 34:8780–8794, 2021."
      }
     ]
    },
    {
     "id": "p-references-17",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-17-1",
       "original": "[13] Jeff Donahue, Sander Dieleman, Mikołaj Bińkowski, Erich Elsen, and Karen Simonyan."
      },
      {
       "id": "s-references-17-2",
       "original": "End-to-End Adversarial Text-to-Speech. arXiv preprint arXiv:2006.03575, 2020."
      }
     ]
    },
    {
     "id": "p-references-18",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-18-1",
       "original": "[14] Zhihao Du, Qian Chen, Shiliang Zhang, Kai Hu, Heng Lu, Yexin Yang, Hangrui Hu, Siqi Zheng, Yue Gu, Ziyang Ma, et al. CosyVoice: A Scalable Multilingual Zero-shot Text-to-speech Synthesizer based on Supervised Semantic Tokens. arXiv preprint arXiv:2407.05407, 2024."
      }
     ]
    },
    {
     "id": "p-references-19",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-19-1",
       "original": "[15] Zhihao Du, Yuxuan Wang, Qian Chen, Xian Shi, Xiang Lv, Tianyu Zhao, Zhifu Gao, Yexin Yang, Changfeng Gao, Hui Wang, et al. CosyVoice 2: Scalable Streaming Speech Synthesis with Large Language Models. arXiv preprint arXiv:2412.10117, 2024."
      }
     ]
    },
    {
     "id": "p-references-20",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-20-1",
       "original": "[16] Zhihao Du, Changfeng Gao, Yuxuan Wang, Fan Yu, Tianyu Zhao, Hao Wang, Xiang Lv, Hui Wang, Chongjia Ni, Xian Shi, et al. CosyVoice 3: Towards In-the-wild Speech Generation via Scaling-up and Post-training. arXiv preprint arXiv:2505.17589, 2025."
      }
     ]
    },
    {
     "id": "p-references-21",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-21-1",
       "original": "[17] Sefik Emre Eskimez, Xiaofei Wang, Manthan Thakker, Canrun Li, Chung-Hsien Tsai, Zhen Xiao, Hemin Yang, Zirun Zhu, Min Tang, Xu Tan, et al. E2 TTS: Embarrassingly Easy Fully Non-Autoregressive Zero-Shot TTS."
      }
     ]
    },
    {
     "id": "p-references-22",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-22-1",
       "original": "In 2024 IEEE spoken language technology workshop (SLT), pages 682–689."
      },
      {
       "id": "s-references-22-2",
       "original": "IEEE, 2024."
      }
     ]
    },
    {
     "id": "p-references-23",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-references-23-1",
       "original": "[18] Patrick Esser, Sumith Kulal, Andreas Blattmann, Rahim Entezari, Jonas Müller, Harry Saini, Yam Levi, Dominik Lorenz, Axel Sauer, Frederic Boesel, et al. Scaling Rectified Flow Transformers for High-Resolution Image Synthesis."
      },
      {
       "id": "s-references-23-2",
       "original": "In Forty-first international conference on machine learning, 2024."
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
       "original": "[19] Yuan Gao, Nobuyuki Morioka, Yu Zhang, and Nanxin Chen."
      },
      {
       "id": "s-references-24-2",
       "original": "E3 TTS: Easy End-to-End Diffusion-Based Text To Speech."
      },
      {
       "id": "s-references-24-3",
       "original": "In 2023 IEEE Automatic Speech Recognition and Understanding Workshop (ASRU), pages 1–8."
      },
      {
       "id": "s-references-24-4",
       "original": "IEEE,"
      }
     ]
    },
    {
     "id": "eq-references-2",
     "type": "equation",
     "page": 15,
     "original": "2023."
    },
    {
     "id": "p-references-25",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-25-1",
       "original": "[20] Zhifu Gao, ShiLiang Zhang, Ian McLoughlin, and Zhijie Yan."
      },
      {
       "id": "s-references-25-2",
       "original": "Paraformer: Fast and Accurate Parallel Transformer for Non-autoregressive End-to-End Speech Recognition."
      },
      {
       "id": "s-references-25-3",
       "original": "In Proc."
      },
      {
       "id": "s-references-25-4",
       "original": "Interspeech 2022, pages 2063–2067, 2022."
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
       "original": "[21] Yitian Gong, Botian Jiang, Yiwei Zhao, Yucheng Yuan, Kuangwei Chen, Yaozhou Jiang, Cheng Chang, Dong Hong, Mingshu Chen, Ruixiao Li, et al. MOSS-TTS Technical Report. arXiv preprint arXiv:2603.18090, 2026."
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
       "original": "[22] Hao-Han Guo, Yao Hu, Kun Liu, Fei-Yu Shen, Xu Tang, Yi-Chen Wu, Feng-Long Xie, Kun Xie, and Kai-Tuo Xu."
      },
      {
       "id": "s-references-27-2",
       "original": "FireRedTTS: A Foundation Text-To-Speech Framework for Industry-Level Generative Speech Applications."
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
       "original": "arXiv preprint arXiv:2409.03283, 2024."
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
       "original": "[23] Tingwei Guo, Cheng Wen, Dongwei Jiang, Ne Luo, Ruixiong Zhang, Shuaijiang Zhao, Wubo Li, Cheng Gong, Wei Zou, Kun Han, et al. Didispeech: A Large Scale Mandarin Speech Corpus."
      },
      {
       "id": "s-references-29-2",
       "original": "In ICASSP 2021-2021 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP), pages 6968–6972."
      },
      {
       "id": "s-references-29-3",
       "original": "IEEE, 2021."
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
       "original": "[24] Yiwei Guo, Chenpeng Du, Ziyang Ma, Xie Chen, and Kai Yu."
      },
      {
       "id": "s-references-30-2",
       "original": "VoiceFlow: Efficient Text-To-Speech with Rectified Flow Matching."
      },
      {
       "id": "s-references-30-3",
       "original": "In ICASSP 2024-2024 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP), pages 11121–11125."
      },
      {
       "id": "s-references-30-4",
       "original": "IEEE, 2024."
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
       "original": "[25] Bing Han, Long Zhou, Shujie Liu, Sanyuan Chen, Lingwei Meng, Yanming Qian, Yanqing Liu, Sheng Zhao, Jinyu Li, and Furu Wei."
      },
      {
       "id": "s-references-31-2",
       "original": "VALL-E R: Robust and Efficient Zero-Shot Text-to-Speech Synthesis via Monotonic Alignment. arXiv preprint arXiv:2406.07855, 2024."
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
       "original": "[26] Haorui He, Zengqiang Shang, Chaoren Wang, Xuyuan Li, Yicheng Gu, Hua Hua, Liwei Liu, Chen Yang, Jiaqi Li, Peiyang Shi, et al. Emilia: An Extensive, Multilingual, and Diverse Speech Dataset For Large-Scale Speech Generation."
      },
      {
       "id": "s-references-32-2",
       "original": "In 2024 IEEE Spoken Language Technology Workshop (SLT), pages 885–890."
      },
      {
       "id": "s-references-32-3",
       "original": "IEEE, 2024."
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
       "original": "[27] Jonathan Ho and Tim Salimans."
      },
      {
       "id": "s-references-33-2",
       "original": "Classifier-Free Diffusion Guidance. arXiv preprint arXiv:2207.12598, 2022."
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
       "original": "[28] Jonathan Ho, Ajay Jain, and Pieter Abbeel."
      },
      {
       "id": "s-references-34-2",
       "original": "Denoising Diffusion Probabilistic Models."
      },
      {
       "id": "s-references-34-3",
       "original": "Advances in neural information processing systems, 33:6840–6851, 2020."
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
       "original": "[29] Emiel Hoogeboom, Jonathan Heek, and Tim Salimans. simple diffusion: End-to-end diffusion for high resolution images."
      },
      {
       "id": "s-references-35-2",
       "original": "In International Conference on Machine Learning, pages 13213–13232."
      },
      {
       "id": "s-references-35-3",
       "original": "PMLR, 2023."
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
       "original": "[30] Emiel Hoogeboom, Thomas Mensink, Jonathan Heek, Kay Lamerigts, Ruiqi Gao, and Tim Salimans."
      },
      {
       "id": "s-references-36-2",
       "original": "Simpler Diffusion: 1.5 FID on ImageNet512 with pixel-space diffusion."
      },
      {
       "id": "s-references-36-3",
       "original": "In Proceedings of the Computer Vision and Pattern Recognition Conference, pages 18062–18071, 2025."
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
       "original": "[31] Hangrui Hu, Xinfa Zhu, Ting He, Dake Guo, Bin Zhang, Xiong Wang, Zhifang Guo, Ziyue Jiang, Hongkun Hao, Zishan Guo, et al. Qwen3-TTS Technical Report. arXiv preprint arXiv:2601.15621, 2026."
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
       "original": "[32] Yang Hu, Xiao Wang, Zezhen Ding, Lirong Wu, Huatian Zhang, Stan Z Li, Sheng Wang, Jiheng Zhang, Ziyun Li, and Tianlong Chen."
      },
      {
       "id": "s-references-38-2",
       "original": "FlowTS: Time Series Generation via Rectified Flow. arXiv preprint arXiv:2411.07506, 2024."
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
       "original": "[33] R Huang, MWY Lam, J Wang, D Su, D Yu, Y Ren, and Z Zhao."
      },
      {
       "id": "s-references-39-2",
       "original": "FastDiff: A Fast Conditional Diffusion Model for High-Quality Speech Synthesis."
      },
      {
       "id": "s-references-39-3",
       "original": "In IJCAI International Joint Conference on Artificial Intelligence, pages 4157–4163."
      },
      {
       "id": "s-references-39-4",
       "original": "IJCAI: International Joint Conferences on Artificial Intelligence Organization, 2022."
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
       "original": "[34] Rongjie Huang, Zhou Zhao, Huadai Liu, Jinglin Liu, Chenye Cui, and Yi Ren."
      },
      {
       "id": "s-references-40-2",
       "original": "ProDiff: Progressive Fast Diffusion Model for High-Quality Text-to-Speech."
      },
      {
       "id": "s-references-40-3",
       "original": "In Proceedings of the 30th ACM International Conference on Multimedia, pages 2595–2605, 2022."
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
       "original": "[35] Keith Ito and Linda Johnson."
      },
      {
       "id": "s-references-41-2",
       "original": "The lj speech dataset. https://keithito.com/LJ-Speech-Dataset/, 2017."
      }
     ]
    },
    {
     "id": "p-references-42",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-42-1",
       "original": "[36] Myeonghun Jeong, Hyeongju Kim, Sung Jun Cheon, Byoung Jin Choi, and Nam Soo Kim."
      },
      {
       "id": "s-references-42-2",
       "original": "Diff-TTS: A Denoising Diffusion Model for Text-to-Speech. arXiv preprint arXiv:2104.01409, 2021."
      }
     ]
    },
    {
     "id": "p-references-43",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-43-1",
       "original": "[37] Dongya Jia, Zhuo Chen, Jiawei Chen, Chenpeng Du, Jian Wu, Jian Cong, Xiaobin Zhuang, Chumin Li, Zhen Wei, Yuping Wang, et al. DiTAR: Diffusion Transformer Autoregressive Modeling for Speech Generation."
      },
      {
       "id": "s-references-43-2",
       "original": "In Forty-second International Conference on Machine Learning, 2025."
      }
     ]
    },
    {
     "id": "p-references-44",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-44-1",
       "original": "[38] Ziyue Jiang, Yi Ren, Ruiqi Li, Shengpeng Ji, Boyang Zhang, Zhenhui Ye, Chen Zhang, Bai Jionghao, Xiaoda Yang, Jialong Zuo, et al. MegaTTS 3: Sparse Alignment Enhanced Latent Diffusion Transformer for Zero-Shot Speech Synthesis. arXiv preprint arXiv:2502.18924, 2025."
      }
     ]
    },
    {
     "id": "p-references-45",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-45-1",
       "original": "[39] Zeqian Ju, Yuancheng Wang, Kai Shen, Xu Tan, Detai Xin, Dongchao Yang, Yanqing Liu, Yichong Leng, Kaitao Song, Siliang Tang, et al. NaturalSpeech 3: Zero-Shot Speech Synthesis with Factorized Codec and Diffusion Models. arXiv preprint arXiv:2403.03100, 2024."
      }
     ]
    },
    {
     "id": "p-references-46",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-46-1",
       "original": "[40] Jaehyeon Kim, Jungil Kong, and Juhee Son."
      },
      {
       "id": "s-references-46-2",
       "original": "Conditional Variational Autoencoder with Adversarial Learning for End-to-End Text-to-Speech."
      },
      {
       "id": "s-references-46-3",
       "original": "In International conference on machine learning, pages 5530–5540."
      },
      {
       "id": "s-references-46-4",
       "original": "PMLR, 2021."
      }
     ]
    },
    {
     "id": "p-references-47",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-47-1",
       "original": "[41] Diederik P Kingma and Max Welling."
      },
      {
       "id": "s-references-47-2",
       "original": "Auto-Encoding Variational Bayes. arXiv preprint arXiv:1312.6114, 2013."
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
       "original": "[42] Jungil Kong, Jaehyeon Kim, and Jaekyoung Bae."
      },
      {
       "id": "s-references-48-2",
       "original": "HiFi-GAN: Generative Adversarial Networks for Efficient and High Fidelity Speech Synthesis."
      },
      {
       "id": "s-references-48-3",
       "original": "Advances in neural information processing systems, 33:17022–17033, 2020."
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
       "original": "[43] Zhifeng Kong, Wei Ping, Jiaji Huang, Kexin Zhao, and Bryan Catanzaro."
      },
      {
       "id": "s-references-49-2",
       "original": "DiffWave: A Versatile Diffusion Model for Audio Synthesis. arXiv preprint arXiv:2009.09761, 2020."
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
       "original": "[44] Rithesh Kumar, Prem Seetharaman, Alejandro Luebs, Ishaan Kumar, and Kundan Kumar."
      },
      {
       "id": "s-references-50-2",
       "original": "High-Fidelity Audio Compression with Improved RVQGAN."
      },
      {
       "id": "s-references-50-3",
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
     "id": "p-references-51",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-51-1",
       "original": "[45] Mateusz Łajszczak, Guillermo Cámbara, Yang Li, Fatih Beyhan, Arent Van Korlaar, Fan Yang, Arnaud Joly, Álvaro Martín-Cortinas, Ammar Abbas, Adam Michalski, et al. BASE TTS: Lessons from building a billion-parameter Text-to-Speech model on 100K hours of data. arXiv preprint arXiv:2402.08093, 2024."
      }
     ]
    },
    {
     "id": "p-references-52",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-52-1",
       "original": "[46] Matthew Le, Apoorv Vyas, Bowen Shi, Brian Karrer, Leda Sari, Rashel Moritz, Mary Williamson, Vimal Manohar, Yossi Adi, Jay Mahadeokar, et al. Voicebox: Text-Guided Multilingual Universal Speech Generation at Scale."
      },
      {
       "id": "s-references-52-2",
       "original": "Advances in neural information processing systems, 36:14005–14034, 2023."
      }
     ]
    },
    {
     "id": "p-references-53",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-53-1",
       "original": "[47] Keon Lee, Dong Won Kim, Jaehyeon Kim, Seungjun Chung, and Jaewoong Cho."
      }
     ]
    },
    {
     "id": "p-references-54",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-54-1",
       "original": "DiTTo-TTS: Diffusion Transformers for Scalable Text-to-Speech without Domain-Specific Factors."
      },
      {
       "id": "s-references-54-2",
       "original": "In International Conference on Learning Representations, volume 2025, pages 52022–52055, 2025."
      }
     ]
    },
    {
     "id": "p-references-55",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-55-1",
       "original": "[48] Sang-gil Lee, Wei Ping, Boris Ginsburg, Bryan Catanzaro, and Sungroh Yoon."
      },
      {
       "id": "s-references-55-2",
       "original": "BigVGAN: A Universal Neural Vocoder with Large-Scale Training. arXiv preprint arXiv:2206.04658, 2022."
      }
     ]
    },
    {
     "id": "p-references-56",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-56-1",
       "original": "[49] Tianhong Li and Kaiming He."
      },
      {
       "id": "s-references-56-2",
       "original": "Back to Basics: Let Denoising Generative Models Denoise. arXiv preprint arXiv:2511.13720, 2025."
      }
     ]
    },
    {
     "id": "p-references-57",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-57-1",
       "original": "[50] Dan Lim, Sunghee Jung, and Eesung Kim."
      },
      {
       "id": "s-references-57-2",
       "original": "JETS: Jointly training FastSpeech2 and HiFi-GAN for end to end text to speech. arXiv preprint arXiv:2203.16852, 2022."
      }
     ]
    },
    {
     "id": "p-references-58",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-58-1",
       "original": "[51] Yaron Lipman, Ricky TQ Chen, Heli Ben-Hamu, Maximilian Nickel, and Matt Le."
      },
      {
       "id": "s-references-58-2",
       "original": "Flow Matching for Generative Modeling. arXiv preprint arXiv:2210.02747, 2022."
      }
     ]
    },
    {
     "id": "p-references-59",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-59-1",
       "original": "[52] Xingchao Liu, Chengyue Gong, and Qiang Liu."
      },
      {
       "id": "s-references-59-2",
       "original": "Flow Straight and Fast: Learning to Generate and Transfer Data with Rectified Flow. arXiv preprint arXiv:2209.03003, 2022."
      }
     ]
    },
    {
     "id": "p-references-60",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-60-1",
       "original": "[53] Ilya Loshchilov and Frank Hutter."
      },
      {
       "id": "s-references-60-2",
       "original": "Decoupled Weight Decay Regularization."
      },
      {
       "id": "s-references-60-3",
       "original": "In International Conference on Learning Representations, 2019."
      }
     ]
    },
    {
     "id": "p-references-61",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-61-1",
       "original": "[54] Zehong Ma, Longhui Wei, Shuai Wang, Shiliang Zhang, and Qi Tian."
      },
      {
       "id": "s-references-61-2",
       "original": "DeCo: Frequency-Decoupled Pixel Diffusion for End-to-End Image Generation. arXiv preprint arXiv:2511.19365, 2025."
      }
     ]
    },
    {
     "id": "p-references-62",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-62-1",
       "original": "[55] Zehong Ma, Ruihan Xu, and Shiliang Zhang."
      },
      {
       "id": "s-references-62-2",
       "original": "PixelGen: Pixel Diffusion Beats Latent Diffusion with Perceptual Loss. arXiv preprint arXiv:2602.02493, 2026."
      }
     ]
    },
    {
     "id": "p-references-63",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-63-1",
       "original": "[56] Shivam Mehta, Ruibo Tu, Jonas Beskow, Éva Székely, and Gustav Eje Henter."
      },
      {
       "id": "s-references-63-2",
       "original": "Matcha-TTS: A Fast TTS Architecture with Conditional Flow Matching."
      },
      {
       "id": "s-references-63-3",
       "original": "In ICASSP 2024-2024 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP), pages 11341–11345."
      },
      {
       "id": "s-references-63-4",
       "original": "IEEE, 2024."
      }
     ]
    },
    {
     "id": "p-references-64",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-64-1",
       "original": "[57] Aleksandr Meister, Matvei Novikov, Nikolay Karpov, Evelina Bakhturina, Vitaly Lavrukhin, and Boris Ginsburg."
      }
     ]
    },
    {
     "id": "p-references-65",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-65-1",
       "original": "LibriSpeech-PC: Benchmark for Evaluation of Punctuation and Capitalization Capabilities of End-to-End ASR Model."
      },
      {
       "id": "s-references-65-2",
       "original": "In 2023 IEEE automatic speech recognition and understanding workshop (ASRU), pages 1–7."
      },
      {
       "id": "s-references-65-3",
       "original": "IEEE,"
      }
     ]
    },
    {
     "id": "eq-references-4",
     "type": "equation",
     "page": 16,
     "original": "2023."
    },
    {
     "id": "p-references-66",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-66-1",
       "original": "[58] Alexander Quinn Nichol and Prafulla Dhariwal."
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
       "original": "Improved Denoising Diffusion Probabilistic Models."
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
       "original": "In International conference on machine learning, pages 8162–8171."
      },
      {
       "id": "s-references-68-2",
       "original": "PMLR, 2021."
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
       "original": "[59] Zhikang Niu, Shujie Hu, Jeongsoo Choi, Yushen Chen, Peining Chen, Pengcheng Zhu, Yunting Yang, Bowen Zhang, Jian Zhao, Chunhui Wang, et al. Semantic-VAE: Semantic-Alignment Latent Representation for Better Speech Synthesis. arXiv preprint arXiv:2509.22167, 2025."
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
       "original": "[60] Aaron Oord, Yazhe Li, Igor Babuschkin, Karen Simonyan, Oriol Vinyals, Koray Kavukcuoglu, George Driessche, Edward Lockhart, Luis Cobo, Florian Stimberg, et al. Parallel WaveNet: Fast High-Fidelity Speech Synthesis."
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
       "original": "In International conference on machine learning, pages 3918–3926."
      },
      {
       "id": "s-references-71-2",
       "original": "PMLR, 2018."
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
       "original": "[61] William Peebles and Saining Xie."
      },
      {
       "id": "s-references-72-2",
       "original": "Scalable Diffusion Models with Transformers."
      },
      {
       "id": "s-references-72-3",
       "original": "In Proceedings of the IEEE/CVF international conference on computer vision, pages 4195–4205, 2023."
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
       "original": "[62] Puyuan Peng, Po-Yao Huang, Shang-Wen Li, Abdelrahman Mohamed, and David Harwath."
      },
      {
       "id": "s-references-73-2",
       "original": "VOICECRAFT: Zero-Shot Speech Editing and Text-to-Speech in the Wild."
      },
      {
       "id": "s-references-73-3",
       "original": "In Proceedings of the 62nd Annual Meeting of the Association for Computational Linguistics (Volume 1: Long Papers), pages 12442–12462, 2024."
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
       "original": "[63] Zhiliang Peng, Jianwei Yu, Wenhui Wang, Yaoyao Chang, Yutao Sun, Li Dong, Yi Zhu, Weijiang Xu, Hangbo Bao, Zehua Wang, et al. VibeVoice: Expressive Podcast Generation with Next-Token Diffusion."
      },
      {
       "id": "s-references-74-2",
       "original": "In The Fourteenth International Conference on Learning Representations, 2026."
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
       "original": "[64] Wei Ping, Kainan Peng, and Jitong Chen."
      },
      {
       "id": "s-references-75-2",
       "original": "ClariNet: Parallel Wave Generation in End-to-End Text-to-Speech. arXiv preprint arXiv:1807.07281, 2018."
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
       "original": "[65] Vadim Popov, Ivan Vovk, Vladimir Gogoryan, Tasnima Sadekova, and Mikhail Kudinov."
      },
      {
       "id": "s-references-76-2",
       "original": "Grad-TTS: A Diffusion Probabilistic Model for Text-to-Speech."
      },
      {
       "id": "s-references-76-3",
       "original": "In International conference on machine learning, pages 8599–8608."
      }
     ]
    },
    {
     "id": "p-references-77",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-77-1",
       "original": "PMLR, 2021."
      }
     ]
    },
    {
     "id": "p-references-78",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-78-1",
       "original": "[66] Alec Radford, Jong Wook Kim, Tao Xu, Greg Brockman, Christine McLeavey, and Ilya Sutskever."
      },
      {
       "id": "s-references-78-2",
       "original": "Robust Speech Recognition via Large-Scale Weak Supervision."
      },
      {
       "id": "s-references-78-3",
       "original": "In International conference on machine learning, pages 28492–28518."
      },
      {
       "id": "s-references-78-4",
       "original": "PMLR, 2023."
      }
     ]
    },
    {
     "id": "p-references-79",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-79-1",
       "original": "[67] Yi Ren, Yangjun Ruan, Xu Tan, Tao Qin, Sheng Zhao, Zhou Zhao, and Tie-Yan Liu."
      },
      {
       "id": "s-references-79-2",
       "original": "FastSpeech: Fast, Robust and Controllable Text to Speech."
      },
      {
       "id": "s-references-79-3",
       "original": "Advances in neural information processing systems, 32, 2019."
      }
     ]
    },
    {
     "id": "p-references-80",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-80-1",
       "original": "[68] Yi Ren, Chenxu Hu, Xu Tan, Tao Qin, Sheng Zhao, Zhou Zhao, and Tie-Yan Liu."
      },
      {
       "id": "s-references-80-2",
       "original": "FastSpeech 2: Fast and High-Quality End-to-End Text to Speech."
      },
      {
       "id": "s-references-80-3",
       "original": "In International Conference on Learning Representations, 2021."
      }
     ]
    },
    {
     "id": "p-references-81",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-81-1",
       "original": "[69] Olaf Ronneberger, Philipp Fischer, and Thomas Brox."
      },
      {
       "id": "s-references-81-2",
       "original": "U-Net: Convolutional Networks for Biomedical Image Segmentation."
      },
      {
       "id": "s-references-81-3",
       "original": "In International Conference on Medical image computing and computer-assisted intervention, pages 234–241."
      },
      {
       "id": "s-references-81-4",
       "original": "Springer, 2015."
      }
     ]
    },
    {
     "id": "p-references-82",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-82-1",
       "original": "[70] Takaaki Saeki, Detai Xin, Wataru Nakata, Tomoki Koriyama, Shinnosuke Takamichi, and Hiroshi Saruwatari."
      }
     ]
    },
    {
     "id": "p-references-83",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-83-1",
       "original": "UTMOS: UTokyo-SaruLab System for VoiceMOS Challenge 2022."
      },
      {
       "id": "s-references-83-2",
       "original": "In Proc."
      },
      {
       "id": "s-references-83-3",
       "original": "Interspeech 2022, pages 4521–4525,"
      }
     ]
    },
    {
     "id": "eq-references-5",
     "type": "equation",
     "page": 17,
     "original": "2022."
    },
    {
     "id": "p-references-84",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-84-1",
       "original": "[71] Kai Shen, Zeqian Ju, Xu Tan, Eric Liu, Yichong Leng, Lei He, Tao Qin, Jiang Bian, et al. NaturalSpeech 2: Latent Diffusion Models are Natural and Zero-Shot Speech and Singing Synthesizers."
      },
      {
       "id": "s-references-84-2",
       "original": "In International conference on learning representations, volume 2024, pages 698–722, 2024."
      }
     ]
    },
    {
     "id": "p-references-85",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-85-1",
       "original": "[72] Hubert Siuzdak."
      },
      {
       "id": "s-references-85-2",
       "original": "Vocos: Closing the gap between time-domain and Fourier-based neural vocoders for high-quality audio synthesis. arXiv preprint arXiv:2306.00814, 2023."
      }
     ]
    },
    {
     "id": "p-references-86",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-86-1",
       "original": "[73] Yakun Song, Jiawei Chen, Xiaobin Zhuang, Chenpeng Du, Ziyang Ma, Jian Wu, Jian Cong, Dongya Jia, Zhuo Chen, Yuping Wang, et al. MagiCodec: Simple Masked Gaussian-Injected Codec for High-Fidelity Reconstruction and Generation. arXiv preprint arXiv:2506.00385, 2025."
      }
     ]
    },
    {
     "id": "p-references-87",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-87-1",
       "original": "[74] Yakun Song, Zhuo Chen, Xiaofei Wang, Ziyang Ma, and Xie Chen."
      },
      {
       "id": "s-references-87-2",
       "original": "ELLA-V: Stable Neural Codec Language Modeling with Alignment-Guided Sequence Reordering ."
      },
      {
       "id": "s-references-87-3",
       "original": "In Proceedings of the AAAI Conference on Artificial Intelligence, 2025."
      }
     ]
    },
    {
     "id": "p-references-88",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-references-88-1",
       "original": "[75] Yang Song and Stefano Ermon."
      },
      {
       "id": "s-references-88-2",
       "original": "Generative Modeling by Estimating Gradients of the Data Distribution."
      },
      {
       "id": "s-references-88-3",
       "original": "Advances in neural information processing systems, 32, 2019."
      }
     ]
    },
    {
     "id": "p-references-89",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-89-1",
       "original": "[76] Yang Song, Jascha Sohl-Dickstein, Diederik P Kingma, Abhishek Kumar, Stefano Ermon, and Ben Poole."
      }
     ]
    },
    {
     "id": "p-references-90",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-90-1",
       "original": "Score-Based Generative Modeling through Stochastic Differential Equations. arXiv preprint arXiv:2011.13456,"
      }
     ]
    },
    {
     "id": "eq-references-6",
     "type": "equation",
     "page": 18,
     "original": "2020."
    },
    {
     "id": "p-references-91",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-91-1",
       "original": "[77] Jianlin Su, Murtadha Ahmed, Yu Lu, Shengfeng Pan, Wen Bo, and Yunfeng Liu."
      }
     ]
    },
    {
     "id": "p-references-92",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-92-1",
       "original": "RoFormer: Enhanced transformer with Rotary Position Embedding."
      },
      {
       "id": "s-references-92-2",
       "original": "Neurocomputing, 568:127063, 2024."
      }
     ]
    },
    {
     "id": "p-references-93",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-93-1",
       "original": "[78] Xiaohui Sun, Ruitong Xiao, Jianye Mo, Bowen Wu, Qun Yu, and Baoxun Wang."
      },
      {
       "id": "s-references-93-2",
       "original": "F5R-TTS: Improving FlowMatching based Text-to-Speech with Group Relative Policy Optimization. arXiv preprint arXiv:2504.02407,"
      }
     ]
    },
    {
     "id": "eq-references-7",
     "type": "equation",
     "page": 18,
     "original": "2025."
    },
    {
     "id": "p-references-94",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-94-1",
       "original": "[79] Shinji Takaki, Toru Nakashika, Xin Wang, and Junichi Yamagishi."
      },
      {
       "id": "s-references-94-2",
       "original": "STFT Spectral Loss for Training a Neural Speech Waveform Model."
      },
      {
       "id": "s-references-94-3",
       "original": "In ICASSP 2019-2019 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP), pages 7065–7069."
      },
      {
       "id": "s-references-94-4",
       "original": "IEEE, 2019."
      }
     ]
    },
    {
     "id": "p-references-95",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-95-1",
       "original": "[80] Xu Tan, Jiawei Chen, Haohe Liu, Jian Cong, Chen Zhang, Yanqing Liu, Xi Wang, Yichong Leng, Yuanhao Yi, Lei He, et al. NaturalSpeech: End-to-End Text-to-Speech Synthesis With Human-Level Quality."
      },
      {
       "id": "s-references-95-2",
       "original": "IEEE Transactions on Pattern Analysis and Machine Intelligence, 46(6):4234–4245, 2024."
      }
     ]
    },
    {
     "id": "p-references-96",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-96-1",
       "original": "[81] Jiayan Teng, Wendi Zheng, Ming Ding, Wenyi Hong, Jianqiao Wangni, Zhuoyi Yang, and Jie Tang."
      },
      {
       "id": "s-references-96-2",
       "original": "Relay Diffusion: Unifying diffusion process across resolutions for image synthesis."
      },
      {
       "id": "s-references-96-3",
       "original": "In International Conference on Learning Representations, volume 2024, pages 18885–18907, 2024."
      }
     ]
    },
    {
     "id": "p-references-97",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-97-1",
       "original": "[82] Aaron Van Den Oord, Sander Dieleman, Heiga Zen, Karen Simonyan, Oriol Vinyals, Alex Graves, Nal Kalchbrenner, Andrew Senior, Koray Kavukcuoglu, et al. WaveNet: A Generative Model for Raw Audio. arXiv preprint arXiv:1609.03499, 12(1), 2016."
      }
     ]
    },
    {
     "id": "p-references-98",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-98-1",
       "original": "[83] Chengyi Wang, Sanyuan Chen, Yu Wu, Ziqiang Zhang, Long Zhou, Shujie Liu, Zhuo Chen, Yanqing Liu, Huaming Wang, Jinyu Li, et al. Neural Codec Language Models are Zero-Shot Text to Speech Synthesizers."
      }
     ]
    },
    {
     "id": "p-references-99",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-99-1",
       "original": "arXiv preprint arXiv:2301.02111, 2023."
      }
     ]
    },
    {
     "id": "p-references-100",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-100-1",
       "original": "[84] Shuai Wang, Ziteng Gao, Chenhui Zhu, Weilin Huang, and Limin Wang."
      },
      {
       "id": "s-references-100-2",
       "original": "PixNerd: Pixel Neural Field Diffusion. arXiv preprint arXiv:2507.23268, 2025."
      }
     ]
    },
    {
     "id": "p-references-101",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-101-1",
       "original": "[85] Xiaopeng Wang, Chunyu Qiang, Ruibo Fu, Zhengqi Wen, Xuefei Liu, Yukun Liu, Yuzhe Liang, Kang Yin, Yuankun Xie, Heng Xie, et al. M3-TTS: Multi-modal DiT Alignment & Mel-latent for Zero-shot High-fidelity Speech Synthesis. arXiv preprint arXiv:2512.04720, 2025."
      }
     ]
    },
    {
     "id": "p-references-102",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-102-1",
       "original": "[86] Xinsheng Wang, Mingqi Jiang, Ziyang Ma, Ziyu Zhang, Songxiang Liu, Linqin Li, Zheng Liang, Qixi Zheng, Rui Wang, Xiaoqin Feng, et al. Spark-TTS: An Efficient LLM-Based Text-to-Speech Model with Single-Stream Decoupled Speech Tokens. arXiv preprint arXiv:2503.01710, 2025."
      }
     ]
    },
    {
     "id": "p-references-103",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-103-1",
       "original": "[87] Yuancheng Wang, Haoyue Zhan, Liwei Liu, Ruihong Zeng, Haotian Guo, Jiachen Zheng, Qiang Zhang, Xueyao Zhang, Shunsi Zhang, and Zhizheng Wu."
      },
      {
       "id": "s-references-103-2",
       "original": "MaskGCT: Zero-Shot Text-to-Speech with Masked Generative Codec Transformer. arXiv preprint arXiv:2409.00750, 2024."
      }
     ]
    },
    {
     "id": "p-references-104",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-104-1",
       "original": "[88] Ron J Weiss, RJ Skerry-Ryan, Eric Battenberg, Soroosh Mariooryad, and Diederik P Kingma."
      },
      {
       "id": "s-references-104-2",
       "original": "Wave-Tacotron: Spectrogram-Free End-to-End Text-to-Speech Synthesis."
      },
      {
       "id": "s-references-104-3",
       "original": "In ICASSP 2021-2021 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP), pages 5679–5683."
      },
      {
       "id": "s-references-104-4",
       "original": "IEEE, 2021."
      }
     ]
    },
    {
     "id": "p-references-105",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-105-1",
       "original": "[89] Sanghyun Woo, Shoubhik Debnath, Ronghang Hu, Xinlei Chen, Zhuang Liu, In So Kweon, and Saining Xie."
      },
      {
       "id": "s-references-105-2",
       "original": "ConvNeXt V2: Co-Designing and Scaling ConvNets With Masked Autoencoders."
      },
      {
       "id": "s-references-105-3",
       "original": "In Proceedings of the IEEE/CVF conference on computer vision and pattern recognition, pages 16133–16142, 2023."
      }
     ]
    },
    {
     "id": "p-references-106",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-106-1",
       "original": "[90] Haibin Wu, Naoyuki Kanda, Sefik Emre Eskimez, and Jinyu Li."
      },
      {
       "id": "s-references-106-2",
       "original": "TS3-Codec: Transformer-Based Simple Streaming Single Codec."
      },
      {
       "id": "s-references-106-3",
       "original": "In Proc."
      },
      {
       "id": "s-references-106-4",
       "original": "Interspeech 2025, pages 604–608, 2025."
      }
     ]
    },
    {
     "id": "p-references-107",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-107-1",
       "original": "[91] Kun Xie, Feiyu Shen, Junjie Li, Fenglong Xie, Xu Tang, and Yao Hu."
      },
      {
       "id": "s-references-107-2",
       "original": "FireRedTTS-2: Towards Long Conversational Speech Generation for Podcast and Chatbot. arXiv preprint arXiv:2509.02020, 2025."
      }
     ]
    },
    {
     "id": "p-references-108",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-108-1",
       "original": "[92] Detai Xin, Shujie Hu, Chengzuo Yang, Chen Huang, Guoqiao Yu, Guanglu Wan, and Xunliang Cai."
      }
     ]
    },
    {
     "id": "p-references-109",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-references-109-1",
       "original": "LongCat-AudioDiT: High-Fidelity Diffusion Text-to-Speech in the Waveform Latent Space. arXiv preprint arXiv:2603.29339, 2026."
      }
     ]
    },
    {
     "id": "p-references-110",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-references-110-1",
       "original": "[93] Junichi Yamagishi, Christophe Veaux, and Kirsten MacDonald."
      },
      {
       "id": "s-references-110-2",
       "original": "Cstr vctk corpus: English multi-speaker corpus for cstr voice cloning toolkit (version 0.92)."
      },
      {
       "id": "s-references-110-3",
       "original": "The Rainbow Passage which the speakers read out can be found in the International Dialects of English Archive:(http://web. ku. edu/˜ idea/readings/rainbow. htm)., 2019."
      }
     ]
    },
    {
     "id": "p-references-111",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-references-111-1",
       "original": "[94] Ryuichi Yamamoto, Eunwoo Song, and Jae-Min Kim."
      },
      {
       "id": "s-references-111-2",
       "original": "Parallel Wavegan: A Fast Waveform Generation Model Based on Generative Adversarial Networks with Multi-Resolution Spectrogram."
      },
      {
       "id": "s-references-111-3",
       "original": "In ICASSP 2020-2020 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP), pages 6199–6203."
      },
      {
       "id": "s-references-111-4",
       "original": "IEEE, 2020."
      }
     ]
    },
    {
     "id": "p-references-112",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-references-112-1",
       "original": "[95] Zengwei Yao, Wei Kang, Han Zhu, Liyong Guo, Lingxuan Ye, Fangjun Kuang, Weiji Zhuang, Zhaoqing Li, Zhifeng Han, Long Lin, et al. Flow2GAN: Hybrid Flow Matching and GAN with Multi-Resolution Network for Few-step High-Fidelity Audio Generation. arXiv preprint arXiv:2512.23278, 2025."
      }
     ]
    },
    {
     "id": "p-references-113",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-references-113-1",
       "original": "[96] Zhen Ye, Xinfa Zhu, Chi-Min Chan, Xinsheng Wang, Xu Tan, Jiahe Lei, Yi Peng, Haohe Liu, Yizhu Jin, Zheqi Dai, et al. Llasa: Scaling Train-Time and Inference-Time Compute for Llama-based Speech Synthesis. arXiv preprint arXiv:2502.04128, 2025."
      }
     ]
    },
    {
     "id": "p-references-114",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-references-114-1",
       "original": "[97] Yongsheng Yu, Wei Xiong, Weili Nie, Yichen Sheng, Shiqiu Liu, and Jiebo Luo."
      },
      {
       "id": "s-references-114-2",
       "original": "PixelDiT: Pixel Diffusion Transformers for Image Generation. arXiv preprint arXiv:2511.20645, 2025."
      }
     ]
    },
    {
     "id": "p-references-115",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-references-115-1",
       "original": "[98] Neil Zeghidour, Alejandro Luebs, Ahmed Omran, Jan Skoglund, and Marco Tagliasacchi."
      },
      {
       "id": "s-references-115-2",
       "original": "SoundStream: An End-to-End Neural Audio Codec."
      },
      {
       "id": "s-references-115-3",
       "original": "IEEE/ACM Transactions on Audio, Speech, and Language Processing, 30:"
      }
     ]
    },
    {
     "id": "eq-references-8",
     "type": "equation",
     "page": 19,
     "original": "495–507, 2021."
    },
    {
     "id": "p-references-116",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-references-116-1",
       "original": "[99] Heiga Zen, Viet Dang, Rob Clark, Yu Zhang, Ron J Weiss, Ye Jia, Zhifeng Chen, and Yonghui Wu."
      },
      {
       "id": "s-references-116-2",
       "original": "LibriTTS: A Corpus Derived from LibriSpeech for Text-to-Speech. arXiv preprint arXiv:1904.02882, 2019."
      }
     ]
    },
    {
     "id": "p-references-117",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-references-117-1",
       "original": "[100] Shuangfei Zhai, Ruixiang Zhang, Preetum Nakkiran, David Berthelot, Jiatao Gu, Huangjie Zheng, Tianrong Chen, Miguel Angel Bautista, Navdeep Jaitly, and Josh Susskind."
      },
      {
       "id": "s-references-117-2",
       "original": "Normalizing Flows are Capable Generative Models. arXiv preprint arXiv:2412.06329, 2024."
      }
     ]
    },
    {
     "id": "p-references-118",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-references-118-1",
       "original": "[101] Biao Zhang and Rico Sennrich."
      },
      {
       "id": "s-references-118-2",
       "original": "Root Mean Square Layer Normalization."
      },
      {
       "id": "s-references-118-3",
       "original": "Advances in neural information processing systems, 32, 2019."
      }
     ]
    },
    {
     "id": "p-references-119",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-references-119-1",
       "original": "[102] Ziqiang Zhang, Long Zhou, Chengyi Wang, Sanyuan Chen, Yu Wu, Shujie Liu, Zhuo Chen, Yanqing Liu, Huaming Wang, Jinyu Li, et al. Speak Foreign Languages with Your Own Voice: Cross-Lingual Neural Codec Language Modeling. arXiv preprint arXiv:2303.03926, 2023."
      }
     ]
    },
    {
     "id": "p-references-120",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-references-120-1",
       "original": "[103] Guangting Zheng, Qinyu Zhao, Tao Yang, Fei Xiao, Zhijie Lin, Jie Wu, Jiajun Deng, Yanyong Zhang, and Rui Zhu."
      },
      {
       "id": "s-references-120-2",
       "original": "FARMER: Flow AutoRegressive Transformer over Pixels. arXiv preprint arXiv:2510.23588, 2025."
      }
     ]
    },
    {
     "id": "p-references-121",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-references-121-1",
       "original": "[104] Qixi Zheng, Yushen Chen, Zhikang Niu, Ziyang Ma, Xiaofei Wang, Kai Yu, and Xie Chen."
      },
      {
       "id": "s-references-121-2",
       "original": "Accelerating Flow-Matching-Based Text-to-Speech via Empirically Pruned Step Sampling."
      },
      {
       "id": "s-references-121-3",
       "original": "In Proc."
      },
      {
       "id": "s-references-121-4",
       "original": "Interspeech 2025, pages"
      }
     ]
    },
    {
     "id": "eq-references-9",
     "type": "equation",
     "page": 19,
     "original": "2445–2449, 2025."
    },
    {
     "id": "p-references-122",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-references-122-1",
       "original": "[105] Feiyan Zhou, Luyuan Wang, Shoufa Chen, Zhe Wang, Zhiheng Liu, Yuren Cong, Xiaohui Zhang, Fanny Yang, and Belinda Zeng."
      },
      {
       "id": "s-references-122-2",
       "original": "WavFlow: Audio Generation in Waveform Space. arXiv preprint arXiv:2605.18749, 2026."
      }
     ]
    },
    {
     "id": "p-references-123",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-references-123-1",
       "original": "[106] Siyi Zhou, Yiquan Zhou, Yi He, Xun Zhou, Jinchao Wang, Wei Deng, and Jingchen Shu."
      },
      {
       "id": "s-references-123-2",
       "original": "IndexTTS2: A Breakthrough in Emotionally Expressive and Duration-Controlled Auto-Regressive Zero-Shot Text-to-Speech."
      },
      {
       "id": "s-references-123-3",
       "original": "In Proceedings of the AAAI Conference on Artificial Intelligence, volume 40, pages 35139–35148, 2026."
      }
     ]
    },
    {
     "id": "p-references-124",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-references-124-1",
       "original": "[107] Yixuan Zhou, Guoyang Zeng, Xin Liu, Xiang Li, Renjie Yu, Ziyang Wang, Runchuan Ye, Weiyue Sun, Jiancheng Gui, Kehan Li, et al. VoxCPM: Tokenizer-Free TTS for Context-Aware Speech Generation and True-to-Life Voice Cloning. arXiv preprint arXiv:2509.24650, 2025."
      }
     ]
    },
    {
     "id": "p-references-125",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-references-125-1",
       "original": "[108] Han Zhu, Wei Kang, Zengwei Yao, Liyong Guo, Fangjun Kuang, Zhaoqing Li, Weiji Zhuang, Long Lin, and Daniel Povey."
      },
      {
       "id": "s-references-125-2",
       "original": "ZipVoice: Fast and High-Quality Zero-Shot Text-to-Speech with Flow Matching. arXiv preprint arXiv:2506.13053, 2025."
      }
     ]
    },
    {
     "id": "p-references-126",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-references-126-1",
       "original": "[109] Han Zhu, Lingxuan Ye, Wei Kang, Zengwei Yao, Liyong Guo, Fangjun Kuang, Zhifeng Han, Weiji Zhuang, Long Lin, and Daniel Povey."
      },
      {
       "id": "s-references-126-2",
       "original": "OmniVoice: Towards Omnilingual Zero-Shot Text-to-Speech with Diffusion Language Models. arXiv preprint arXiv:2604.00688, 2026."
      }
     ]
    }
   ]
  },
  {
   "id": "sec-appendix",
   "num": null,
   "level": 1,
   "page": 20,
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
   "page": 20,
   "title": {
    "original": "Implementation Details",
    "zh": "实现细节"
   },
   "blocks": [
    {
     "id": "p-A-1",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-A-1-1",
       "original": "We train two model variants with different scales: a large model with 673M parameters as our final configuration, and a smaller model with 340M parameters for scaling ablations.",
       "zh": "我们训练了两个规模的模型变体：673M 参数的大模型作为最终配置，以及 340M 参数的小模型用于缩放消融。"
      },
      {
       "id": "s-A-1-2",
       "original": "Both variants adopt a DiT [61] backbone and share the training strategy detailed in Section 4, differing only in size.",
       "zh": "两个变体均采用 DiT [61] 骨干，共享 Section 4 详述的训练策略，仅在规模上不同。"
      },
      {
       "id": "s-A-1-3",
       "original": "The large model consists of 28 Transformer layers with a hidden dimension of 1152 and an FFN expansion ratio of 4, while the smaller model uses 22 layers with a hidden dimension of 1024 and an FFN expansion ratio of 2.",
       "zh": "大模型包含 28 层 Transformer，隐藏维度 1152，FFN 扩展比为 4；小模型为 22 层，隐藏维度 1024，FFN 扩展比为 2。"
      },
      {
       "id": "s-A-1-4",
       "original": "Both models use 16 attention heads, and the dropout rate in Transformer layers is set to 0.",
       "zh": "两个模型都使用 16 个注意力头，Transformer 层的 dropout 率设为 0。"
      },
      {
       "id": "s-A-1-5",
       "original": "The text encoder consists of four ConvNeXt V2 blocks [89] with an embedding dimension of 512 and an FFN expansion ratio of 2.",
       "zh": "文本编码器由 4 个 ConvNeXt V2 块 [89] 组成，嵌入维度 512，FFN 扩展比为 2。"
      },
      {
       "id": "s-A-1-6",
       "original": "For the patchified waveforms, we apply a two-layer linear projection without activations: a bias-free layer mapping to a 768-dimensional intermediate representation, followed by a biased layer projecting to 1024 dimensions.",
       "zh": "对 patch 化的波形，我们施加不带激活函数的两层线性投影：先经一个无偏置层映射到 768 维中间表征，再经一个带偏置层投影到 1024 维。"
      },
      {
       "id": "s-A-1-7",
       "original": "During infilling-task training [46], a continuous segment covering 70%–100% of the audio prompt is randomly masked.",
       "zh": "在语音填充任务训练 [46] 中，随机掩蔽覆盖音频提示 70%–100% 的一段连续区间。"
      }
     ]
    },
    {
     "id": "p-A-2",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-A-2-1",
       "original": "We adopt the multi-scale mel-spectrogram loss from DAC [44] as an additional perceptual supervision during training.",
       "zh": "我们采用 DAC [44] 的多尺度 mel 频谱图损失作为训练期间的附加感知监督。"
      },
      {
       "id": "s-A-2-2",
       "original": "Specifically, we compute mel-spectrograms at seven different time–frequency resolutions with window sizes [32, 64, 128, 256, 512, 1024, 2048], where the hop size at each scale is set to one quarter of the corresponding window length.",
       "zh": "具体而言，我们在 7 种不同时频分辨率上计算 mel 频谱图，窗长分别为 [32, 64, 128, 256, 512, 1024, 2048]，每个尺度的 hop 大小设为对应窗长的四分之一。"
      },
      {
       "id": "s-A-2-3",
       "original": "The number of mel bins for each scale is configured as [5, 10, 20, 40, 80, 160, 320].",
       "zh": "各尺度的 mel bin 数配置为 [5, 10, 20, 40, 80, 160, 320]。"
      },
      {
       "id": "s-A-2-4",
       "original": "All mel transforms are computed from magnitude spectrograms (power = 1.0) with reflective padding and centered STFT computation.",
       "zh": "所有 mel 变换均由幅度频谱图（power = 1.0）计算，采用反射式填充与居中 STFT。"
      },
      {
       "id": "s-A-2-5",
       "original": "For each scale, we compute the L1 distance between the log-mel spectrograms of the predicted waveform and the target waveform over the masked regions, as described in Section 3.2.",
       "zh": "对每个尺度，如 Section 3.2 所述，我们在被掩蔽区域上计算预测波形与目标波形 log-mel 频谱图之间的 L1 距离。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-B",
   "num": "B",
   "level": 1,
   "page": 20,
   "title": {
    "original": "Comparison of Inference Timestep Schedules",
    "zh": "推理时刻调度的比较"
   },
   "blocks": [
    {
     "id": "p-B-1",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-B-1-1",
       "original": "Previous studies have shown that, under the flow matching framework, shifting inference timesteps toward high-noise regions, i.e., allocating more integration steps to the early stage, can improve zero-shot TTS performance.",
       "zh": "先前研究表明，在流匹配框架下，将推理时刻移向高噪声区域——即把更多积分步分配给早期阶段——能改善零样本 TTS 性能。"
      },
      {
       "id": "s-B-1-2",
       "original": "For example, Sway Sampling, introduced in F5-TTS [8], adopts a cosine-based timestep transformation and controls the degree of shifting through a coefficient s′.",
       "zh": "例如，F5-TTS [8] 引入的 Sway Sampling 采用基于余弦的时刻变换，通过系数 s′ 控制偏移程度。"
      },
      {
       "id": "s-B-1-3",
       "original": "Nevertheless, we empirically find that even its strongest shift setting, s′ = −1.0, remains insufficient for high-dimensional raw waveform generation.",
       "zh": "然而，我们经验性地发现，即便其最强的偏移设置 s′ = −1.0，对高维原始波形生成仍然不够。"
      },
      {
       "id": "s-B-1-4",
       "original": "To enable more flexible timestep allocation, we propose PolyShift sampling, which allows a stronger bias toward high-noise regions.",
       "zh": "为实现更灵活的时刻分配，我们提出 PolyShift 采样，允许更强地偏向高噪声区域。"
      },
      {
       "id": "s-B-1-5",
       "original": "As shown in Figure 7, PolyShift with p = 2.0 and s = 1.0, which applies only the polynomial transformation without additional time shifting, already produces a stronger concentration toward t →0 than Sway Sampling with s′ = −1.0.",
       "zh": "如 Figure 7 所示，仅施加多项式变换、不加额外时间偏移的 PolyShift（p = 2.0，s = 1.0），其向 t → 0 的聚集程度已经强于 s′ = −1.0 的 Sway Sampling。"
      },
      {
       "id": "s-B-1-6",
       "original": "Increasing the shift factor to s = 3.0 further moves the sampling density toward the high-noise region, resulting in a substantially higher probability density in the early interval t ∈(0, 0.2) and a lower density in the low-noise interval t ∈(0.8, 1.0).",
       "zh": "将偏移因子增大到 s = 3.0 会进一步把采样密度推向高噪声区域，在早期区间 t ∈ (0, 0.2) 内产生高得多的概率密度，并降低低噪声区间 t ∈ (0.8, 1.0) 内的密度。"
      },
      {
       "id": "s-B-1-7",
       "original": "In principle, by jointly adjusting the polynomial factor p and the shift factor s, PolyShift can cover a broad range of timestep allocation patterns, making it adaptable to different inference settings.",
       "zh": "原则上，通过联合调节多项式因子 p 与偏移因子 s，PolyShift 可以覆盖大范围的时刻分配模式，从而适配不同的推理设定。"
      }
     ]
    },
    {
     "id": "eq-B-1",
     "type": "equation",
     "page": 20,
     "original": "4.0"
    },
    {
     "id": "eq-B-2",
     "type": "equation",
     "page": 20,
     "original": "Uniform Sway Sampling (s0 = −0.4)"
    },
    {
     "id": "eq-B-3",
     "type": "equation",
     "page": 20,
     "original": "3.5"
    },
    {
     "id": "eq-B-4",
     "type": "equation",
     "page": 20,
     "original": "Sway Sampling (s0 = −1.0) Probability Density π(t)"
    },
    {
     "id": "eq-B-5",
     "type": "equation",
     "page": 20,
     "original": "3.0"
    },
    {
     "id": "p-B-2",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-B-2-1",
       "original": "PolyShift (p = 2.0, s = 1.0) PolyShift (p = 2.0, s = 3.0)",
       "zh": "（图例：PolyShift (p = 2.0, s = 1.0) / PolyShift (p = 2.0, s = 3.0)。）"
      }
     ]
    },
    {
     "id": "eq-B-6",
     "type": "equation",
     "page": 20,
     "original": "2.5 2.0 1.5 1.0 0.5 0.0 0.0 0.2 0.4 0.6 0.8 1.0"
    },
    {
     "id": "p-B-3",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-B-3-1",
       "original": "t",
       "zh": "近来，工作在 VAE 潜空间或 mel 频谱图上的扩散模型已成为零样本（zero-shot）TTS 的主流范式。"
      }
     ]
    },
    {
     "id": "fig-B-1",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "fig-B-1-s1",
       "original": "Figure 7 Timestep sampling densities under different inference schedules.",
       "zh": "图 7. 不同推理调度下的时刻采样密度。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-C",
   "num": "C",
   "level": 1,
   "page": 20,
   "title": {
    "original": "Diffusion Modeling with STFT and MDCT Representations",
    "zh": "STFT 与 MDCT 表征的扩散建模"
   },
   "blocks": [
    {
     "id": "p-C-1",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-C-1-1",
       "original": "To ensure a fair comparison with direct waveform modeling, we adapt the STFT and MDCT representations to the same flow matching framework with a comparable parameter count.",
       "zh": "为保证与直接波形建模的公平比较，我们把 STFT 与 MDCT 表征适配到同一流匹配框架，参数量保持相当。"
      },
      {
       "id": "s-C-1-2",
       "original": "Specifically, we use the same DiT backbone as the larger configuration described in Appendix A.",
       "zh": "具体而言，我们使用与 Appendix A 所述较大配置相同的 DiT 骨干。"
      },
      {
       "id": "s-C-1-3",
       "original": "The model retains the x-prediction objective, with the prediction space changed from raw waveforms to STFT or MDCT coefficients.",
       "zh": "模型保留 x-prediction 目标，仅将预测空间从原始波形改为 STFT 或 MDCT 系数。"
      },
      {
       "id": "s-C-1-4",
       "original": "Since the prediction targets inherently capture time-frequency information, we omit the auxiliary multi-scale mel-spectrogram loss.",
       "zh": "由于预测目标本身已携带时频信息，我们省略了辅助的多尺度 mel 频谱图损失。"
      }
     ]
    },
    {
     "id": "p-C-2",
     "type": "paragraph",
     "page": 21,
     "sentences": [
      {
       "id": "s-C-2-1",
       "original": "All other training and inference configurations follow the setup described in Section 4.",
       "zh": "其余所有训练与推理配置均沿用 Section 4 的设置。"
      },
      {
       "id": "s-C-2-2",
       "original": "Below, we detail the feature transformations and specific modeling adaptations for both representations.",
       "zh": "下面详述两种表征的特征变换与具体建模适配。"
      }
     ]
    },
    {
     "id": "p-C-3",
     "type": "paragraph",
     "page": 21,
     "sentences": [
      {
       "id": "s-C-3-1",
       "original": "Short-Time Fourier Transform (STFT).",
       "zh": "短时傅里叶变换（STFT）。"
      },
      {
       "id": "s-C-3-2",
       "original": "For STFT-based diffusion modeling, we first resample the audio to 16 kHz and extract STFT features using a Hann window, with the FFT size and window length set to 400 and the hop length set to 160.",
       "zh": "基于 STFT 的扩散建模中，我们先将音频重采样至 16 kHz，用 Hann 窗提取 STFT 特征，FFT 大小与窗长均设为 400，hop 长度设为 160。"
      },
      {
       "id": "s-C-3-3",
       "original": "This yields a frame rate of 100 Hz, matching that of the patchified waveform representation used in WavTTS.",
       "zh": "由此得到 100 Hz 的帧率，与 WavTTS 中 patch 化波形表征的帧率一致。"
      },
      {
       "id": "s-C-3-4",
       "original": "To handle the complex-valued STFT coefficients, we separate their real and imaginary parts and concatenate them along the feature dimension, resulting in a 402-dimensional continuous feature sequence (i.e., 2 × (400/2 + 1)).",
       "zh": "为处理复数取值的 STFT 系数，我们分离其实部与虚部并沿特征维度拼接，得到 402 维的连续特征序列（即 2 × (400/2 + 1)）。"
      },
      {
       "id": "s-C-3-5",
       "original": "Empirical statistics on the Emilia dataset show that the standard deviation of the unrolled STFT coefficients is naturally close to 1, aligning well with the Gaussian noise scale in flow matching.",
       "zh": "Emilia 数据集上的经验统计表明，展开后的 STFT 系数标准差天然接近 1，与流匹配中的高斯噪声尺度吻合良好。"
      },
      {
       "id": "s-C-3-6",
       "original": "We therefore feed the STFT features directly into the diffusion process without additional scaling.",
       "zh": "因此我们将 STFT 特征直接输入扩散过程，不做额外缩放。"
      },
      {
       "id": "s-C-3-7",
       "original": "Consistent with the waveform setting, we optimize the model with the MSE loss between the predicted and ground-truth STFT features.",
       "zh": "与波形设定一致，我们以预测与真实 STFT 特征之间的 MSE 损失优化模型。"
      },
      {
       "id": "s-C-3-8",
       "original": "During inference, once the predicted real and imaginary components are generated via the ODE solver, we reconstruct the final audio waveform using the inverse STFT (iSTFT).",
       "zh": "推理时，ODE 求解器生成预测的实部与虚部后，我们用逆 STFT（iSTFT）重建最终音频波形。"
      }
     ]
    },
    {
     "id": "p-C-4",
     "type": "paragraph",
     "page": 21,
     "sentences": [
      {
       "id": "s-C-4-1",
       "original": "Modified Discrete Cosine Transform (MDCT).",
       "zh": "改进离散余弦变换（MDCT）。"
      },
      {
       "id": "s-C-4-2",
       "original": "For MDCT-based diffusion modeling, we first resample the audio to 16 kHz and extract MDCT features using a standard Vorbis window with a length of 320.",
       "zh": "基于 MDCT 的扩散建模中，我们先将音频重采样至 16 kHz，用长度为 320 的标准 Vorbis 窗提取 MDCT 特征。"
      },
      {
       "id": "s-C-4-3",
       "original": "Due to the overlapped-transform property of MDCT, the hop length is set to half of the window length (i.e., 160), again yielding a frame rate of 100 Hz.",
       "zh": "由于 MDCT 的重叠变换性质，hop 长度设为窗长的一半（即 160），同样得到 100 Hz 的帧率。"
      },
      {
       "id": "s-C-4-4",
       "original": "Under this configuration, each frame corresponds to a 160-dimensional continuous feature vector.",
       "zh": "在该配置下，每帧对应一个 160 维的连续特征向量。"
      },
      {
       "id": "s-C-4-5",
       "original": "Empirical statistics on Emilia show that the standard deviation of the MDCT features is approximately 0.005.",
       "zh": "Emilia 上的经验统计显示，MDCT 特征的标准差约为 0.005。"
      },
      {
       "id": "s-C-4-6",
       "original": "We therefore multiply the MDCT coefficients by a factor of 200 to align their scale with the Gaussian noise used in flow matching.",
       "zh": "因此我们将 MDCT 系数乘以 200，使其尺度与流匹配使用的高斯噪声对齐。"
      },
      {
       "id": "s-C-4-7",
       "original": "The scaled MDCT coefficients are then fed into the flow matching process and optimize the model with the MSE loss between the predicted and ground-truth MDCT features.",
       "zh": "缩放后的 MDCT 系数被送入流匹配过程，模型以预测与真实 MDCT 特征之间的 MSE 损失优化。"
      },
      {
       "id": "s-C-4-8",
       "original": "During inference, after the ODE solver generates the predicted MDCT features, we reconstruct the final waveform using inverse MDCT (iMDCT).",
       "zh": "推理时，ODE 求解器生成预测的 MDCT 特征后，我们用逆 MDCT（iMDCT）重建最终波形。"
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
    "sentence_id": "s-1-2-1",
    "quote": "constrained by heavily compressed and quantized discrete tokens"
   },
   "kind": "comparison",
   "title": "AR 与 NAR 各自的硬伤",
   "explanation": "这句把两条主流路线的代价一次说清：AR（VALL-E 一系）靠 codec 离散 token 自回归生成，表达力来自语言模型式的 next-token 预测，但量化本身丢信息，逐 token 解码拉高延迟，训练-推理不一致带来暴露偏差；NAR 扩散（F5-TTS 一系）并行生成快，却在有损连续表征上工作。WavTTS 的切入点就是保留 NAR 的速度、同时把表征换成无损波形，把两边的「表征税」都省掉。",
   "featured": true
  },
  {
   "id": "ann-002",
   "anchor": {
    "sentence_id": "s-1-3-2",
    "quote": "its practical use was severely limited by prohibitively slow inference"
   },
   "kind": "concept",
   "title": "波形生成为何沉寂了八年",
   "explanation": "WaveNet 2016 年就证明了逐样本自回归可以生成高质量波形，但 16kHz 意味着生成 1 秒音频要串行 16,000 步，这个数量级直接宣判了它在实时场景的死刑。此后波形建模主要用于声码器（输入 mel、输出波形），没人敢把它当完整 TTS 用。WavTTS 用 patch 化（160 样本/帧）+ NAR 扩散把序列压到 100 Hz、把解码改成并行 ODE，才重新打开这条路线。",
   "featured": true
  },
  {
   "id": "ann-003",
   "anchor": {
    "sentence_id": "s-1-3-4",
    "quote": "capture long-range linguistic dependencies while preserving fine-grained phase, periodicity, and high-frequency structures"
   },
   "kind": "concept",
   "title": "波形建模的双重负担",
   "explanation": "一句话点出原始波形比 mel 难在哪：模型既要理解「这句话该怎么说」这种跨秒级的语言结构，又要同时把相位、周期性、高频细节这些毫秒级信号物理量生对。mel 表征之所以流行，正是因为它把后者大量丢弃，让模型专心学前者。WavTTS 的整体设计（多尺度 mel 监督+噪声调度）本质上就是在波形空间里人为重建这种「分工」。"
  },
  {
   "id": "ann-004",
   "anchor": {
    "sentence_id": "s-3-1-3-1",
    "quote": "requires the model to fit a target containing the stochastic noise component"
   },
   "kind": "concept",
   "title": "v-prediction 的隐藏噪声税",
   "explanation": "这是 x-prediction 论证的核心。速度目标 vt = x1 − x0 里混着每次采样都不同的 x0，同一个 x1 配上不同噪声就是不同的回归目标——模型被迫去学习噪声的分布，而不是数据本身。这个问题在图像里不算尖锐，但在 16,000 维/秒的波形上被急剧放大。改成预测干净波形 xθ 后，目标变成确定性量，噪声只出现在输入侧，学习信号干净得多。",
   "featured": true
  },
  {
   "id": "ann-005",
   "anchor": {
    "sentence_id": "s-3-1-3-2",
    "quote": "noise-dominated targets may lead to unstable optimization"
   },
   "kind": "critique",
   "title": "静音段是波形扩散的暗坑",
   "explanation": "静音段的真实波形接近全零，此时 vt ≈ −x0，回归目标几乎就是纯噪声本身——模型在大量训练样本上学不到任何结构，梯度反而被噪声主导。这篇论文没明说但值得追问：Emilia 里静音占比多高、是否做了 VAD 修剪？如果数据管道里静音比例高，x-prediction 的收益可能有一部分只是抵消了数据的脏，而非方法本身的普适优势。复现时这是个容易被低估的变量。"
  },
  {
   "id": "ann-006",
   "anchor": {
    "sentence_id": "s-3-1-4-5",
    "quote": "non-overlapping blocks of length F"
   },
   "kind": "engineering",
   "title": "160 样本一个 patch 的妥协",
   "explanation": "把波形切成非重叠块是最暴力的序列压缩：F=160 把序列缩短两个数量级到 100 Hz，代价是 patch 内部结构全靠线性投影硬学，跨 patch 边界的高频连续性完全没有显式约束（图像 ViT 没这个问题，因为相邻像素语义独立）。这解释了为什么必须再外挂多尺度 mel 损失——它补的正是 patch 化丢掉的频域连续性。简单工程选择，换回的是整套训练目标都要跟着调。"
  },
  {
   "id": "ann-007",
   "anchor": {
    "sentence_id": "s-3-1-4-7",
    "quote": "pad the text sequence with filler tokens to match the length of the audio patches"
   },
   "kind": "concept",
   "title": "时长是填出来的",
   "explanation": "这是 F5-TTS 一系免时长预测器的秘诀：不用学时长模块，直接把文本 token 序列用填充符补齐到音频帧数，让模型在 speech-infilling 任务里自己推断「这段文字配这段长度的空白」。好处是架构极简，坏处是把对齐压力全转嫁到 DiT 的隐式学习上——5.2.2 节里高噪声时刻对 WER 的决定性影响，正是模型在低信噪比下摸索这个隐式对齐的直接证据。"
  },
  {
   "id": "ann-008",
   "anchor": {
    "sentence_id": "s-3-2-2-2",
    "quote": "directly compute the log-mel spectrogram distance between the predicted waveform"
   },
   "kind": "concept",
   "title": "x-pred 与 mel 监督互相成全",
   "explanation": "注意这句里的因果：多尺度 mel 损失不是独立锦上添花，而是 x-prediction 的副产品——只有网络直接输出波形，才能在频域对它求距离；v-prediction 得先做 (1−t)·v + xt 的代数还原才能算，既多一步误差传递，也让损失 landscape 更扭曲。这和 5.2.1 消融互相印证：x-pred 的主要优势不是 WER（1.67 vs 1.65 几乎打平），而是 SIM-o（0.61 vs 0.65），音色这种全频带属性恰恰最吃频域监督。"
  },
  {
   "id": "ann-009",
   "anchor": {
    "sentence_id": "s-3-3-1-1-4",
    "quote": "waveform standard deviation is only ∼0.12 on Emilia"
   },
   "kind": "number",
   "title": "0.12 这个数为何致命",
   "explanation": "标准差 0.12 意味着信号的「体积」只有单位高斯噪声的八分之一左右。在线性插值路径下，xt 的信噪比由 t²σ²x1/(1−t)²σ²x0 决定，信号方差小一个数量级，整条 log-SNR 曲线就整体下移 20 dB——后果是绝大多数训练时刻模型都埋在比标准设定深得多的噪声里。这就是为什么 k=9（约 1/0.12 的倒数级别）不是调参玄学，而是把两个分布的方差强行对齐的数学必然，见 Table 4 的 k=1 崩溃。",
   "featured": true
  },
  {
   "id": "ann-010",
   "anchor": {
    "sentence_id": "s-3-3-1-6-5",
    "quote": "comparing x1 with xθ/k"
   },
   "kind": "engineering",
   "title": "缩放要除回来再算感知损失",
   "explanation": "训练目标在放大 k 倍的波形上回归没问题，但 mel 频谱图对幅度是敏感的（log 域的能量差会直接表现为距离），如果也拿放大后的预测值去比，感知目标就被能量缩放污染了。所以损失里显式把预测除回 xθ/k 再算 mel。一个容易写漏的实现细节，漏了它 λmel 的实际含义就变了——消融里 λmel 过大翻车的现象，可能有一部分正来自这种尺度混淆。"
  },
  {
   "id": "ann-011",
   "anchor": {
    "sentence_id": "s-3-3-2-3-2",
    "quote": "coarse waveform structure formation"
   },
   "kind": "concept",
   "title": "为什么高噪声步决定成败",
   "explanation": "流匹配的 ODE 轨迹里，t 小的一端决定全局结构（音素序列、韵律骨架），t 大的一端只是给已定的波形去毛刺。早期步子错了，后面再多细化步也救不回来。这一点在波形上比在 mel 上更致命，因为波形的「结构」是微秒级的相位连续性，容错窗口极窄。训练用 logit-normal(µ<0)、推理用 PolyShift 加重早期密度，都是同一个洞察的两个面：把算力砸向轨迹的起点。",
   "featured": true
  },
  {
   "id": "ann-012",
   "anchor": {
    "sentence_id": "s-3-3-2-4-4",
    "quote": "only a limited degree of timestep shifting"
   },
   "kind": "comparison",
   "title": "Sway 不够用，才要 PolyShift",
   "explanation": "F5-TTS 的 Sway Sampling 用余弦变换偏移时刻，最强档 s′=−1.0 也只有一个自由度，密度向 t→0 的压缩程度有上限。WavTTS 换 PolyShift（多项式 p + 时间偏移 s 双自由度）不是为创新而创新：16kHz 波形的 ODE 对早期截断误差的敏感度远高于 100Hz mel 帧，需要的偏移强度超出了 Sway 的表达能力。结论放在更大的图景里看：表征维度越高、结构越精细，推理调度就越需要定制，「拿来主义」调度在这行不管用了。",
   "featured": true
  },
  {
   "id": "ann-013",
   "anchor": {
    "sentence_id": "s-4-2-2",
    "quote": "a batch size of 153,600 audio patch frames"
   },
   "kind": "number",
   "title": "0.43 小时一个 batch",
   "explanation": "换算一下：153,600 个 patch 帧 × 160 样本 ≈ 24.6M 音频样本，16kHz 下约 0.43 小时，分布到 8 张 A100。batch 用「音频时长」而不是「条数」度量，因为 Emilia 样本长度差异极大，按时长打包才能保证显存占用稳定。这也是 waveform DiT 工程的隐形成本——相同 GPU 预算下，潜空间模型一个 batch 能塞进多得多的音频时长，WavTTS 的吞吐劣势被 batch 组织方式放大，1.2M 步的训练耗时自然不便宜。"
  },
  {
   "id": "ann-014",
   "anchor": {
    "sentence_id": "s-4-2-4",
    "quote": "patch size is set to F = 160, resulting in a patchified sequence rate of 100 Hz"
   },
   "kind": "engineering",
   "title": "100 Hz 的刻意对齐",
   "explanation": "F=160 配 16kHz 恰得 100 Hz——这不是巧合，而是为 5.2.5 的表征对比埋的伏笔：STFT（400 窗/160 hop）与 MDCT（320 窗/160 hop）也都取 100 Hz，三种表征序列长度完全一致，背骨网络输出端只需要换最后一层投影维度。这个对齐让「波形 vs 频域」的对比真正只剩表征一个变量，工程上是花了一点心思才让结论站得住的。同时 100 Hz 也是主流 mel 帧率，下游想嫁接现有组件不用改时序假设。"
  },
  {
   "id": "ann-015",
   "anchor": {
    "sentence_id": "s-5-1-1-1-3",
    "quote": "the best WER of 1.50% and the highest UTMOS score of 3.92"
   },
   "kind": "number",
   "title": "英文两项第一的真实含金量",
   "explanation": "WER 1.50 与 UTMOS 3.92 确实超过所有 NAR 基线，但注意两个细节：一是 WER 1.50 仍高于 Ground Truth 重合成上界 1.79……（原文 Ground Truth 为 1.79，WavTTS 反而更低，说明指标天花板本身被 ASR 模型噪声封顶，差距主要靠挤压可得区间）；二是 UTMOS 是模型估的 MOS，天然偏向打分分布相近的生成式模型，「客观自然度第一」不等于人听第一。真正难追的是 SIM-o——波形模型在这个指标上仍输潜空间模型，这是它还没跨过去的坎。",
   "featured": true
  },
  {
   "id": "ann-016",
   "anchor": {
    "sentence_id": "s-5-1-1-1-4",
    "quote": "still lags behind some highly optimized latent-space models"
   },
   "kind": "critique",
   "title": "音色克隆仍是波形路线的短板",
   "explanation": "LongCat-AudioDiT 的 SIM-o 0.81、WavTTS 只有 0.73，差了一截。作者的解释是波形的高维细节分散了模型容量，但更诚实的说法是：潜空间模型在 codec/VAE 压缩时已经预消化了说话人因子的粗粒度表征，克隆任务被前置简化了；WavTTS 从裸波形学起，等效于在更难的输入空间里做同样的事。结论——「端到端更简洁」在逆向工程上是对的，但简洁性收益并没有免费换来能力对价，音色精调仍需专门补丁。",
   "featured": true
  },
  {
   "id": "ann-017",
   "anchor": {
    "sentence_id": "s-5-2-1-3-3",
    "quote": "the model trained with mel supervision already reduces WER below 5%"
   },
   "kind": "number",
   "title": "mel 损失买了 5 倍收敛速度",
   "explanation": "200K 步有个硬对比：有 mel 监督 WER<5%，没有它「仍无法生成可懂语音」。即便按最宽容的解读，感知损失至少买了数倍的有效收敛速度。这回答了「波形模型为什么过去训不动」的部分答案——不是缺算力，是缺一个告诉模型「哪些样本级误差人耳根本不在乎、哪些又至关重要」的信号。换个角度看，这也暴露了纯时域 MSE 在高维波形上作为唯一目标的失效，「端到端=只靠一个损失」的浪漫想象在这里被现实修正了。",
   "featured": true
  },
  {
   "id": "ann-018",
   "anchor": {
    "sentence_id": "s-5-2-2-5-7",
    "quote": "uniform sampling converges more slowly but achieves the highest final UTMOS"
   },
   "kind": "critique",
   "title": "论文自己埋的一个反例",
   "explanation": "降噪调度的叙事越读越顺，但这句自己留了反证：均匀采样虽然收敛慢、WER 略高，最终 UTMOS 却反而最高。作者给的解释是低噪声段样本多、局部细节打磨好——这个机制如果成立，逻辑上就推出「最优调度应当是随训练进程动态变化的」，而不是静态 µ=−0.8。论文把它列进 future work，等于默认当前默认配置不是全局最优。读表格时要有意识：Table 3–5 报告的都是选定默认下的对比，调度×步数的组合空间远没被充分探索过。"
  },
  {
   "id": "ann-019",
   "anchor": {
    "sentence_id": "s-5-2-4-5-1",
    "quote": "340M to 673M"
   },
   "kind": "number",
   "title": "100K 小时是扩模型先决条件",
   "explanation": "对比两组数字很有意思：Emilia 上 340M→673M 带来 SIM 0.56→0.65 的实质跳升；LibriTTS（585 小时）上同样的扩参 SIM 反而 0.35→0.31 还倒退。也就是说在数据撑不住的时候，加容量是负收益。这给所有想复现波形 TTS 的人写了现实约束：没有 10 万小时级语料，340M 可能就是天花板了，先把数据搞到再谈模型。这和 Whisper 式「数据规模是第一变量」的结论是同一时代的不同注脚。",
   "featured": true
  },
  {
   "id": "ann-020",
   "anchor": {
    "sentence_id": "s-5-2-5-2-5",
    "quote": "standard deviation of only about 0.005 but a maximum value of 0.15"
   },
   "kind": "number",
   "title": "MDCT 死在离群值上",
   "explanation": "标准差 0.005 意味着绝大多数系数挤在零附近，最大值 0.15 却是典型值的 30 倍——一个极尖锐的尖峰分布。对 MSE 损失的流匹配来说这就是灾难：离群点贡献的梯度把模型拉向极端值，其余点的信号全被淹没。作者用 ×200 硬对齐标准差只是治标。这个细节提醒我们：无损表示的「无损」不等于「好建模」，STFT 的复数耦合、MDCT 的尖峰分布都各有坑，而时域波形反而分布更良态——这是论文里少有的、能从统计形状直接读出的方法学论据。"
  },
  {
   "id": "ann-021",
   "anchor": {
    "sentence_id": "s-5-2-5-2-2",
    "quote": "begins to generate recognizable speech after 400K steps"
   },
   "kind": "comparison",
   "title": "收敛速度的差距比最终质量更说明问题",
   "explanation": "MDCT 400K 步、STFT 600K 步才有可懂语音，而 mel 与波形都在 200K 步内越过同一条线。最终指标或许还能靠更多训练拉回来，但「能开始说话的时间点」几乎无法靠调参补救——它反映的是模型在该表征空间中找到可优化方向的难易。换句话说，波形建模的真正卖点不是「跑到终点比别人快一点点」，而是收敛路径本身更短、更稳。对动辄上万 GPU 小时的 TTS 训练而言，这个差异工程价值远大于论文表格里的最终 UTMOS 差。"
  }
 ]
};
