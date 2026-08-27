// 自动生成：2306.15687 全文双语精读数据（由 tools/compile_paper.js 装配）
// 结构/原文来自 .cache/papers/2306.15687.json（tools/extract_paper.py）；
// 翻译与讲解来自 .cache/papers/zh/2306.15687/（LLM agent 撰写）。
// 改翻译请改片段后重新装配；勿手改本文件的结构与 original 字段。
globalThis.PAPER_2306_15687 = {
 "paper_id": "2306.15687",
 "model_id": "voicebox",
 "title": {
  "original": "Voicebox: Text-Guided Multilingual Universal Speech Generation at Scale",
  "zh": "Voicebox：规模化的文本引导多语言通用语音生成"
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
       "original": "Matthew Le∗Apoorv Vyas∗ Bowen Shi∗ Brian Karrer∗ Leda Sari Rashel Moritz"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-mary-williamson",
   "num": null,
   "level": 2,
   "page": 1,
   "title": {
    "original": "Mary Williamson",
    "zh": "Mary Williamson（作者行）"
   },
   "blocks": [
    {
     "id": "p-mary-williamson-1",
     "type": "paragraph",
     "page": 1,
     "sentences": [
      {
       "id": "s-mary-williamson-1-1",
       "original": "Vimal Manohar Yossi Adi† Jay Mahadeokar Wei-Ning Hsu∗ Fundamental AI Research (FAIR), Meta",
       "zh": "Vimal Manohar、Yossi Adi†、Jay Mahadeokar、Wei-Ning Hsu∗，Meta 基础人工智能研究院（FAIR）。"
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
       "original": "Large-scale generative models such as GPT and DALL-E have revolutionized natural language processing and computer vision research.",
       "zh": "GPT 和 DALL-E 等大规模生成模型已经彻底改变了自然语言处理和计算机视觉研究。"
      },
      {
       "id": "s-abstract-1-2",
       "original": "These models not only generate high fidelity text or image outputs, but are also generalists which can solve tasks not explicitly taught.",
       "zh": "这些模型不仅能生成高保真的文本或图像，还具备通用性，能够完成未经明确训练的任务。"
      },
      {
       "id": "s-abstract-1-3",
       "original": "In contrast, speech generative models are still primitive in terms of scale and task generalization.",
       "zh": "相比之下，语音生成模型在规模和任务泛化能力上仍处于初级阶段。"
      },
      {
       "id": "s-abstract-1-4",
       "original": "In this paper, we present Voicebox, the most versatile text-guided generative model for speech at scale.",
       "zh": "本文提出 Voicebox：迄今功能最全面的规模化文本引导语音生成模型。"
      },
      {
       "id": "s-abstract-1-5",
       "original": "Voicebox is a non-autoregressive flow-matching model trained to infill speech, given audio context and text, trained on over 50K hours of speech that are neither filtered nor enhanced.",
       "zh": "Voicebox 是一个非自回归（NAR）的流匹配（flow matching）模型，在给定音频上下文与文本的条件下训练语音填充（infilling），训练语料为超过 50K 小时的语音，未经过滤，也未做增强。"
      },
      {
       "id": "s-abstract-1-6",
       "original": "Similar to GPT, Voicebox can perform many different tasks through in-context learning, but is more flexible as it can also condition on future context.",
       "zh": "与 GPT 类似，Voicebox 可以通过上下文学习（in-context learning）完成许多不同任务，但它更灵活，因为它还能以未来的上下文作为条件。"
      },
      {
       "id": "s-abstract-1-7",
       "original": "Voicebox can be used for mono or cross-lingual zero-shot text-to-speech synthesis, noise removal, content editing, style conversion, and diverse sample generation.",
       "zh": "Voicebox 可用于单语或跨语种的零样本文本转语音（TTS）合成、噪声去除、内容编辑、风格转换以及多样化样本生成。"
      },
      {
       "id": "s-abstract-1-8",
       "original": "In particular, Voicebox outperforms the state-of-the-art zero-shot TTS model VALL-E on both intelligibility (5.9% vs 1.9% word error rates) and audio similarity (0.580 vs 0.681) while being up to 20 times faster.",
       "zh": "特别地，Voicebox 在可懂度（词错误率（WER）5.9% 对 1.9%）和音频相似度（0.580 对 0.681）两项指标上均超过最先进的零样本 TTS 模型 VALL-E，同时推理速度最高快 20 倍。"
      },
      {
       "id": "s-abstract-1-9",
       "original": "Audio samples can be found in https://voicebox.metademolab.com.",
       "zh": "音频样例见 https://voicebox.metademolab.com。"
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
       "original": "Recent advances in large-scale generative models [Brown et al., 2020, Nichol et al., 2021, Ramesh et al., 2021] have led to a major paradigm shift towards building general-purpose models, which can perform many new tasks not explicitly trained on.",
       "zh": "大规模生成模型 [Brown et al., 2020, Nichol et al., 2021, Ramesh et al., 2021] 的最新进展带来了一次重大的范式转变：构建可以完成许多从未明确训练过的新任务的通用模型。"
      },
      {
       "id": "s-1-1-2",
       "original": "These generative models learn to predict the missing data given the context.",
       "zh": "这些生成模型学习在给定上下文的情况下预测缺失的数据。"
      },
      {
       "id": "s-1-1-3",
       "original": "Post training, we can directly input a question, optionally with a few contextual question-answer examples, instead of fine-tuning with labeled data.",
       "zh": "训练完成后，我们可以直接输入一个问题（可选地附带少量上下文问答示例），而无需用标注数据做微调。"
      },
      {
       "id": "s-1-1-4",
       "original": "To give a concrete example, the model can answer a question like, “What is the capital of Japan?” with an example of such a relationship in the context: “The capital of Germany is Berlin.",
       "zh": "举个具体的例子，在给出同类关系的上下文「法国的首都是巴黎。德国的首都是柏林。」之后，模型就能回答类似「日本的首都是哪里？」这样的问题。"
      },
      {
       "id": "s-1-1-5",
       "original": "The capital of Japan is”.",
       "zh": "（接上）「日本的首都是」。"
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
       "original": "While the training objective appears simple, it subsumes many tasks as one can convert them into some form of context.",
       "zh": "虽然这个训练目标看起来很简单，但它涵盖了许多任务，因为任何任务都可以转化为某种形式的上下文。"
      },
      {
       "id": "s-1-2-2",
       "original": "For the model to perform well at every task, it implies that the estimation of p(missing data | context) needs to be accurate for every context.",
       "zh": "模型要在每个任务上都表现好，就意味着 p(缺失数据 | 上下文) 的估计必须对每一种上下文都足够准确。"
      },
      {
       "id": "s-1-2-3",
       "original": "Hence, scale and diversity are the most crucial factors for building general-purpose models [Hoffmann et al., 2022, Aghajanyan et al., 2023], as we see the state-of-the-art (SOTA) language and vision-language models are trained on web-scale data with billions to hundreds of billions of parameters.",
       "zh": "因此，规模与多样性是构建通用模型最关键的两个因素 [Hoffmann et al., 2022, Aghajanyan et al., 2023]，正如我们所见，最先进的（SOTA）语言模型和视觉-语言模型都是在网络规模的数据上以数十亿到数千亿参数训练出来的。"
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
       "original": "Despite the success of large-scale generative models in other areas, most speech models are still trained on datasets at the scale of tens to hundreds of hours [Ren et al., 2021, Kim et al., 2020, 2021, ∗Equal contribution.",
       "zh": "尽管大规模生成模型在其他领域取得了成功，大多数语音模型仍然在几十到几百小时规模的数据集上训练 [Ren et al., 2021, Kim et al., 2020, 2021, ∗共同一作。"
      },
      {
       "id": "s-1-3-2",
       "original": "Corresponding authors: {mattle,wnhsu}@meta.com †FAIR & Hebrew University of Jerusalem.",
       "zh": "通讯作者：{mattle, wnhsu}@meta.com。†FAIR 与耶路撒冷希伯来大学。"
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
       "original": "Preprint.",
       "zh": "预印本。"
      },
      {
       "id": "s-1-4-2",
       "original": "Under review.",
       "zh": "审稿中。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-zero-shot-tts",
   "num": null,
   "level": 2,
   "page": 2,
   "title": {
    "original": "Zero-shot TTS",
    "zh": "零样本 TTS（示意图标签区）"
   },
   "blocks": []
  },
  {
   "id": "sec-denoising",
   "num": null,
   "level": 2,
   "page": 2,
   "title": {
    "original": "Denoising",
    "zh": "去噪"
   },
   "blocks": [
    {
     "id": "p-denoising-1",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-denoising-1-1",
       "original": "noise",
       "zh": "（图内标签）噪声"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-text-only-sampling",
   "num": null,
   "level": 2,
   "page": 2,
   "title": {
    "original": "Text-Only Sampling",
    "zh": "仅文本采样（示意图区，含图 1）"
   },
   "blocks": [
    {
     "id": "p-text-only-sampling-1",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-text-only-sampling-1-1",
       "original": "“HIS … GOURMET“ Content Raw data Style “OUTSIDE OF THESE…”",
       "zh": "（图内文字）「HIS … GOURMET」 内容 原始数据 风格 「OUTSIDE OF THESE…」"
      }
     ]
    },
    {
     "id": "p-text-only-sampling-2",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-text-only-sampling-2-1",
       "original": "Model Input “DON’T MOVE AROUND…”",
       "zh": "（图内文字）模型 输入 「DON'T MOVE AROUND…」"
      }
     ]
    },
    {
     "id": "p-text-only-sampling-3",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-text-only-sampling-3-1",
       "original": "“FROM … ALONE“ Ref Concat(“HIS … GOURMET”, “FROM … ALONE“) “OUTSIDE OF THESE…”",
       "zh": "（图内文字）「FROM … ALONE」 参考音频 拼接（「HIS … GOURMET」＋「FROM … ALONE」） 「OUTSIDE OF THESE…」"
      }
     ]
    },
    {
     "id": "p-text-only-sampling-4",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-text-only-sampling-4-1",
       "original": "“DON’T MOVE AROUND…”",
       "zh": "（图内文字）「DON'T MOVE AROUND…」"
      }
     ]
    },
    {
     "id": "p-text-only-sampling-5",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-text-only-sampling-5-1",
       "original": "Sample #1 Target Ref Model Output Sample #2 Sample #3",
       "zh": "（图内文字）样本 #1 目标 参考 模型 输出 样本 #2 样本 #3"
      }
     ]
    },
    {
     "id": "fig-text-only-sampling-1",
     "type": "figure_caption",
     "page": 2,
     "original": "Figure 1: Voicebox task generalization through in-context learning.",
     "zh": "图 1：Voicebox 通过上下文学习实现任务泛化的示意图。"
    },
    {
     "id": "p-text-only-sampling-6",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-text-only-sampling-6-1",
       "original": "Popov et al., 2021, Huang et al., 2022, Tan et al., 2022, Casanova et al., 2021].",
       "zh": "（接上页引文）Popov et al., 2021, Huang et al., 2022, Tan et al., 2022, Casanova et al., 2021]。"
      },
      {
       "id": "s-text-only-sampling-6-2",
       "original": "Previous works consider highly curated datasets such as VCTK [Yamagishi et al., 2019], which contains only clean audio recorded in studio from about 100 speakers with little speaking style and text variation.",
       "zh": "以往的工作多使用高度筛选的数据集，例如 VCTK [Yamagishi et al., 2019]，其中只包含约 100 位说话人在录音棚录制的干净音频，说话风格和文本变化都很少。"
      },
      {
       "id": "s-text-only-sampling-6-3",
       "original": "Such models struggle to synthesize speech with rich variation in emotion, voice, background noise, acoustic condition, and have not been tested on the abilities to generalize to tasks not explicitly trained on.",
       "zh": "这类模型难以合成在情感、嗓音、背景噪声、声学条件上变化丰富的语音，也从未被检验过能否泛化到未经显式训练的任务。"
      }
     ]
    },
    {
     "id": "p-text-only-sampling-7",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-text-only-sampling-7-1",
       "original": "There had been a few attempts of using in-the-wild data such as CommonVoice [Ardila et al., 2019], Librispeech [Panayotov et al., 2015], and LibriTTS [Zen et al., 2019] for training text-to-speech (TTS) models.",
       "zh": "此前已有一些尝试，使用野外采集的数据（如 CommonVoice [Ardila et al., 2019]、LibriSpeech [Panayotov et al., 2015] 和 LibriTTS [Zen et al., 2019]）来训练 TTS 模型。"
      },
      {
       "id": "s-text-only-sampling-7-2",
       "original": "It led to huge quality degradation compared to training on curated datasets [Hsu et al., 2019, Wang et al., 2021].",
       "zh": "但与在筛选过的数据集上训练相比，质量出现了大幅下降 [Hsu et al., 2019, Wang et al., 2021]。"
      },
      {
       "id": "s-text-only-sampling-7-3",
       "original": "In particular, while in-the-wild data are generally of lower quality, the gap between synthesized and training speech is big compared to that of the models trained on curated speech [Wang et al., 2021], which suggests that previous models terribly underfit in-the-wild data.",
       "zh": "具体来说，虽然野外数据质量普遍较低，但与在筛选语音上训练的模型相比，合成语音与训练语音之间的差距更大 [Wang et al., 2021]，这说明以往的模型对野外数据严重欠拟合。"
      }
     ]
    },
    {
     "id": "p-text-only-sampling-8",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-text-only-sampling-8-1",
       "original": "This paper presents Voicebox, the most versatile text-conditioned speech generative model at scale.",
       "zh": "本文提出 Voicebox：迄今功能最全面的规模化文本条件语音生成模型。"
      },
      {
       "id": "s-text-only-sampling-8-2",
       "original": "Voicebox is trained on a text-guided speech infilling task, where the goal is to generate masked speech given its surrounding audio and text transcript.",
       "zh": "Voicebox 在文本引导的语音填充任务上训练：给定周围的音频和文本转写，生成被掩蔽的语音。"
      },
      {
       "id": "s-text-only-sampling-8-3",
       "original": "This can be considered as a guided in-context learning problem, where audio style is inferred from the audio context and textual content is specified through transcript.",
       "zh": "这可以看作一个有引导的上下文学习问题：音频风格从音频上下文中推断，文本内容则通过转写文本指定。"
      },
      {
       "id": "s-text-only-sampling-8-4",
       "original": "Voicebox does not require any audio style labels (e.g., speaker, emotion, and noise), which differentiates Voicebox from the majority of prior work where such labels are used extensively.",
       "zh": "Voicebox 不需要任何音频风格标签（如说话人、情感、噪声），这使它区别于大量依赖此类标签的先前工作。"
      },
      {
       "id": "s-text-only-sampling-8-5",
       "original": "Prior work uses labels to make the mapping between input (text and audio style) and output (speech) more deterministic to reduce underfitting [Wang et al., 2021, Popov et al., 2021].",
       "zh": "先前工作使用标签让输入（文本与音频风格）到输出（语音）的映射更加确定，以缓解欠拟合 [Wang et al., 2021, Popov et al., 2021]。"
      },
      {
       "id": "s-text-only-sampling-8-6",
       "original": "We show that Voicebox’s text-guided speech infilling approach is much more scalable in terms of data while subsuming many common speech generative tasks.",
       "zh": "我们表明，Voicebox 的文本引导语音填充方法在数据规模上更具可扩展性，同时涵盖了许多常见的语音生成任务。"
      }
     ]
    },
    {
     "id": "p-text-only-sampling-9",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-text-only-sampling-9-1",
       "original": "In terms of modeling, Voicebox is a non-autoregressive (NAR) continuous normalizing flow (CNF) model [Chen et al., 2018].",
       "zh": "在建模上，Voicebox 是一个非自回归（NAR）的连续归一化流（CNF）模型 [Chen et al., 2018]。"
      },
      {
       "id": "s-text-only-sampling-9-2",
       "original": "Similar to diffusion models [Ho et al., 2020], CNFs model the transformation from a simple distribution to a complex data distribution (p(missing data | context)), parameterized by a neural network.",
       "zh": "与扩散模型 [Ho et al., 2020] 类似，CNF 对从简单分布到复杂数据分布（p(缺失数据 | 上下文)）的变换建模，并由神经网络参数化。"
      },
      {
       "id": "s-text-only-sampling-9-3",
       "original": "We train Voicebox with flow-matching [Lipman et al., 2023], a recently proposed method that enables efficient and scalable training of CNFs via a simple vector field regression loss.",
       "zh": "我们使用流匹配（flow matching）[Lipman et al., 2023] 训练 Voicebox，这是最近提出的一种方法，通过简单的向量场回归损失实现 CNF 的高效、可扩展训练。"
      },
      {
       "id": "s-text-only-sampling-9-4",
       "original": "In contrast to auto-regressive models, Voicebox can consume context not only in the past but also in the future.",
       "zh": "与自回归（AR）模型不同，Voicebox 不仅能利用过去的上下文，还能利用未来的上下文。"
      },
      {
       "id": "s-text-only-sampling-9-5",
       "original": "Moreover, the number of flow steps can be controlled at inference time to flexibly trade off quality and runtime efficiency.",
       "zh": "此外，流步数可以在推理时控制，从而灵活地在质量与运行效率之间做权衡。"
      }
     ]
    },
    {
     "id": "p-text-only-sampling-10",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-text-only-sampling-10-1",
       "original": "Voicebox is trained on 60K hours of English audiobooks and 50K hours of multilingual audiobooks in 6 languages for the mono and multilingual setups.",
       "zh": "Voicebox 在两种设定下训练：单语设定使用 60K 小时英语有声书，多语言设定使用覆盖 6 种语言的 50K 小时多语言有声书。"
      },
      {
       "id": "s-text-only-sampling-10-2",
       "original": "Voicebox achieves SOTA performance on mono-lingual/cross-lingual zero-shot TTS, speech denoising, speech editing, diverse speech sampling and an application to data creation for speech recognition.",
       "zh": "Voicebox 在单语/跨语种零样本 TTS、语音去噪、语音编辑、多样化语音采样以及为语音识别合成训练数据等任务上均达到 SOTA 水平。"
      },
      {
       "id": "s-text-only-sampling-10-3",
       "original": "To tackle the lack of comparability due to the use of subjective metrics, this paper presents a series of metrics using public models to facilitate reproducible comparison and model development for speech generation studies.",
       "zh": "为解决主观指标导致的结果不可比问题，本文提出一系列基于公开模型的指标，以促进语音生成研究中可复现的比较和模型开发。"
      }
     ]
    },
    {
     "id": "p-text-only-sampling-11",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-text-only-sampling-11-1",
       "original": "The contribution of this work can be summarized as follows:",
       "zh": "本工作的贡献可总结如下："
      }
     ]
    },
    {
     "id": "p-text-only-sampling-12",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-text-only-sampling-12-1",
       "original": "1.",
       "zh": "1."
      },
      {
       "id": "s-text-only-sampling-12-2",
       "original": "Voicebox represents a breakthrough in generative modeling for speech.",
       "zh": "Voicebox 代表了语音生成建模的突破。"
      },
      {
       "id": "s-text-only-sampling-12-3",
       "original": "By learning to solve a text-guided speech infilling task with large scale data, Voicebox can solve tasks it was not explicitly trained to accomplish via in-context learning.",
       "zh": "通过在大规模数据上学习文本引导的语音填充任务，Voicebox 能借助上下文学习解决它从未被显式训练过的任务。"
      }
     ]
    },
    {
     "id": "p-text-only-sampling-13",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-text-only-sampling-13-1",
       "original": "2.",
       "zh": "2."
      },
      {
       "id": "s-text-only-sampling-13-2",
       "original": "Voicebox outperforms VALL-E and achieves a new SOTA English zero-shot TTS result (5.9% →1.9% on word error rate (WER) and 0.580 →0.681 on audio similarity).",
       "zh": "Voicebox 超过 VALL-E，取得英语零样本 TTS 的新 SOTA 结果（词错误率（WER）从 5.9% 降至 1.9%，音频相似度从 0.580 提升至 0.681）。"
      }
     ]
    },
    {
     "id": "p-text-only-sampling-14",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-text-only-sampling-14-1",
       "original": "3.",
       "zh": "3."
      },
      {
       "id": "s-text-only-sampling-14-2",
       "original": "Voicebox is the first model that can perform high-quality cross-lingual zero-shot TTS across six languages.",
       "zh": "Voicebox 是首个能在六种语言间进行高质量跨语种零样本 TTS 的模型。"
      },
      {
       "id": "s-text-only-sampling-14-3",
       "original": "It does not use any style labels, pre-trained embedders, or multilingual samples.",
       "zh": "它不使用任何风格标签、预训练嵌入器，也不使用多语言混合样本。"
      },
      {
       "id": "s-text-only-sampling-14-4",
       "original": "Compared to the prior cross-lingual SOTA YourTTS, Voicebox reduces the average WER from 10.9% to 5.2%, and improves audio similarity from 0.335 to 0.481.",
       "zh": "与先前的跨语种 SOTA 模型 YourTTS 相比，Voicebox 将平均 WER 从 10.9% 降至 5.2%，并将音频相似度从 0.335 提升至 0.481。"
      }
     ]
    },
    {
     "id": "p-text-only-sampling-15",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-text-only-sampling-15-1",
       "original": "4.",
       "zh": "4."
      },
      {
       "id": "s-text-only-sampling-15-2",
       "original": "Voicebox is capable of infilling speech of any length and outperforms the prior SOTA A3T, on text guided denoising with -8.8% WER, +0.450 similarity, and +0.80 mean opinion score.",
       "zh": "Voicebox 能填充任意长度的语音，并在文本引导去噪上超过先前 SOTA 模型 A3T：WER 降低 8.8%，相似度提高 0.450，平均意见分提高 0.80。"
      }
     ]
    },
    {
     "id": "p-text-only-sampling-16",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-text-only-sampling-16-1",
       "original": "5.",
       "zh": "5."
      },
      {
       "id": "s-text-only-sampling-16-2",
       "original": "Voicebox can generate diverse and realistic speech.",
       "zh": "Voicebox 能生成多样且真实的语音。"
      },
      {
       "id": "s-text-only-sampling-16-3",
       "original": "An ASR system can be trained solely on synthetic speech generated by Voicebox, resulting in only 0.4%/1.7% absolute WER increase on Librispeech test-other/test-clean compared to training on real data.",
       "zh": "仅用 Voicebox 生成的合成语音训练 ASR 系统，与用真实数据训练相比，在 LibriSpeech test-other/test-clean 上 WER 仅绝对上升 0.4%/1.7%。"
      },
      {
       "id": "s-text-only-sampling-16-4",
       "original": "In contrast, previous TTS models suffer from at least 18.2%/44.5% absolute WER increase.",
       "zh": "相比之下，此前的 TTS 模型至少带来 18.2%/44.5% 的绝对 WER 上升。"
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
    "original": "Related Work Generative speech models",
    "zh": "2 相关工作：生成式语音模型"
   },
   "blocks": [
    {
     "id": "p-2-1",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-2-1-1",
       "original": "Most speech generative models are task-specific and trained on different datasets.",
       "zh": "大多数语音生成模型都是任务专用的，且训练于不同的数据集上。"
      },
      {
       "id": "s-2-1-2",
       "original": "One common type of task is audio style conversion, which aims to convert only a specific attribute while keeping other attributes the same.",
       "zh": "一类常见任务是音频风格转换：只改变某一个特定属性，同时保持其他属性不变。"
      },
      {
       "id": "s-2-1-3",
       "original": "Voice conversion [Kameoka et al., 2018, Lorenzo-Trueba et al., 2018], emotion conversion [Robinson et al., 2019, Kreuk et al., 2022], speech enhancement [Xu et al., 2014, Défossez et al., 2020, Serrà et al., 2022] belong to this category.",
       "zh": "语音转换 [Kameoka et al., 2018, Lorenzo-Trueba et al., 2018]、情感转换 [Robinson et al., 2019, Kreuk et al., 2022]、语音增强 [Xu et al., 2014, Défossez et al., 2020, Serrà et al., 2022] 都属于这一类。"
      },
      {
       "id": "s-2-1-4",
       "original": "Many of these models are supervised and trained on pairs of data that only differ in one attribute, for example, emotion [Kreuk et al., 2022].",
       "zh": "其中许多模型是有监督的，需要在仅有一个属性不同的成对数据上训练，例如情感 [Kreuk et al., 2022]。"
      },
      {
       "id": "s-2-1-5",
       "original": "It is hard to obtain such data.",
       "zh": "这样的数据很难获取。"
      },
      {
       "id": "s-2-1-6",
       "original": "Moreover, some attributes, such as speaking style, are hard to annotate.",
       "zh": "此外，有些属性（如说话风格）很难标注。"
      },
      {
       "id": "s-2-1-7",
       "original": "Hence, these models are often trained on small datasets and do not generalize well.",
       "zh": "因此，这些模型往往在小数据集上训练，泛化能力不佳。"
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
       "original": "Controllable text-to-speech synthesis (TTS) is another common task, which aims to synthesize speech in a target audio style (e.g., voice, speaking style, recording environment) given text.",
       "zh": "可控文本转语音（TTS）合成是另一类常见任务：给定文本，合成具有目标音频风格（如嗓音、说话风格、录音环境）的语音。"
      },
      {
       "id": "s-2-2-2",
       "original": "While some styles like voice can be specified through labels [Kim et al., 2021] or pre-trained embeddings like YourTTS [Casanova et al., 2021] and Jia et al. [2018]; others like prosody are hard to annotate or embed.",
       "zh": "有些风格（如嗓音）可以通过标签 [Kim et al., 2021] 或预训练嵌入（如 YourTTS [Casanova et al., 2021] 和 Jia et al. [2018]）来指定；但另一些（如韵律）很难标注或嵌入。"
      },
      {
       "id": "s-2-2-3",
       "original": "Previous studies [Wang et al., 2018, Akuzawa et al., 2018, Hsu et al., 2019] tried to control them by learning a residual embedding.",
       "zh": "先前研究 [Wang et al., 2018, Akuzawa et al., 2018, Hsu et al., 2019] 尝试通过学习残差嵌入来控制这些属性。"
      },
      {
       "id": "s-2-2-4",
       "original": "However, these models encode style in a low-dimensional space and impose an overly simple distribution of speech given text and residual embedding [Ren et al., 2021, Shen et al., 2017].",
       "zh": "然而，这些模型将风格编码在低维空间中，对给定文本和残差嵌入下语音的分布施加了过于简单的假设 [Ren et al., 2021, Shen et al., 2017]。"
      },
      {
       "id": "s-2-2-5",
       "original": "They cannot generate realistic noisy speech given a low dimensional vector, and performance degrades when conditioned on noisy references [Hsu et al., 2019].",
       "zh": "给定一个低维向量，它们无法生成真实的带噪语音，且以带噪参考音频为条件时性能会下降 [Hsu et al., 2019]。"
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
       "original": "Infilling can be considered as another type of task.",
       "zh": "填充（infilling）可以看作另一类任务。"
      },
      {
       "id": "s-2-3-2",
       "original": "It aims to predict speech given context [Lakhotia et al., 2021, Borsos et al., 2022a] and optionally text guidance [Bai et al., 2022, Borsos et al., 2022b, Wang et al., 2023].",
       "zh": "它的目标是给定上下文 [Lakhotia et al., 2021, Borsos et al., 2022a]、并可选地结合文本引导 [Bai et al., 2022, Borsos et al., 2022b, Wang et al., 2023] 来预测语音。"
      },
      {
       "id": "s-2-3-3",
       "original": "Instead of learning an explicit embedding to control style, infilling models predict speech coherent to the context.",
       "zh": "填充模型不学习显式的嵌入来控制风格，而是预测与上下文连贯的语音。"
      },
      {
       "id": "s-2-3-4",
       "original": "In other words, these models perform in-context learning similar to Large Language Models (LLMs), which specifies the task (i.e., the desired style to convert) through context.",
       "zh": "换句话说，这些模型执行与大语言模型（LLM）类似的上下文学习，通过上下文来指定任务（即期望转换到的风格）。"
      },
      {
       "id": "s-2-3-5",
       "original": "While this is a step toward building large scale generalist models using little explicit supervision, most prior work using text guidance still assumes a deterministic mapping from text and context to target [Bai et al., 2022, Borsos et al., 2022b], which is only realistic for very short segments.",
       "zh": "虽然这是朝着用很少显式监督构建大规模通用模型迈出的一步，但大多数使用文本引导的先前工作仍假设从文本和上下文到目标的映射是确定性的 [Bai et al., 2022, Borsos et al., 2022b]，这一假设只对很短的片段才成立。"
      },
      {
       "id": "s-2-3-6",
       "original": "Hence, models with those assumptions could typically only infill segments up to 1 second [Borsos et al., 2022b].",
       "zh": "因此，基于这类假设的模型通常只能填充最长 1 秒的片段 [Borsos et al., 2022b]。"
      },
      {
       "id": "s-2-3-7",
       "original": "Voicebox is a text-guided infilling model, but it leverages the CNF model that can parameterize any distribution.",
       "zh": "Voicebox 是一个文本引导的填充模型，但它利用可以对任意分布参数化的 CNF 模型。"
      },
      {
       "id": "s-2-3-8",
       "original": "Hence, Voicebox can infill speech of any length and can be trained on in-the-wild datasets with rich variation, and provide a general solution that subsumes many tasks in a text-guided fashion.",
       "zh": "因此，Voicebox 可以填充任意长度的语音，可以在变化丰富的野外数据集上训练，并提供以文本引导方式涵盖多种任务的通用解决方案。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-large-scale-in-context-learning-",
   "num": null,
   "level": 2,
   "page": 3,
   "title": {
    "original": "Large scale in-context learning models",
    "zh": "大规模上下文学习模型"
   },
   "blocks": [
    {
     "id": "p-large-scale-in-context-learning--1",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-large-scale-in-context-learning--1-1",
       "original": "With the advancement in neural codec for speech [Hsu et al., 2021, Défossez et al., 2022, Zeghidour et al., 2022], many recent studies explore token-based language modeling for speech generation.",
       "zh": "随着语音神经 codec 的发展 [Hsu et al., 2021, Défossez et al., 2022, Zeghidour et al., 2022]，许多近期研究探索了基于 token 的语言建模来做语音生成。"
      },
      {
       "id": "s-large-scale-in-context-learning--1-2",
       "original": "The GSLM-family [Lakhotia et al., 2021, Kharitonov et al., 2021, Nguyen et al., 2022] are textless language models built upon HuBERT units [Hsu et al., 2021] for speech continuation without using text.",
       "zh": "GSLM 系列 [Lakhotia et al., 2021, Kharitonov et al., 2021, Nguyen et al., 2022] 是建立在 HuBERT 单元 [Hsu et al., 2021] 之上的无文本语言模型，用于不使用文本的语音续写。"
      },
      {
       "id": "s-large-scale-in-context-learning--1-3",
       "original": "HuBERT units encode mostly content [Polyak et al., 2021], and the generated speech does not preserve the voice of the prompt.",
       "zh": "HuBERT 单元主要编码内容 [Polyak et al., 2021]，生成的语音无法保留提示音频的嗓音。"
      },
      {
       "id": "s-large-scale-in-context-learning--1-4",
       "original": "To tackle this, AudioLM [Borsos et al., 2022a] considers a cascaded approach which first generates HuBERT-like tokens and then predicts SoundStream [Zeghidour et al., 2022] tokens, a reconstruction based codec that preserves style.",
       "zh": "为解决这一问题，AudioLM [Borsos et al., 2022a] 采用级联方法：先生成类 HuBERT 的 token，再预测 SoundStream [Zeghidour et al., 2022] token——后者是一种基于重建、能保留风格的 codec。"
      },
      {
       "id": "s-large-scale-in-context-learning--1-5",
       "original": "These models are not conditioned on text and are evaluated on spoken language modeling tasks.",
       "zh": "这些模型不以文本为条件，评估任务是口语语言建模。"
      }
     ]
    },
    {
     "id": "p-large-scale-in-context-learning--2",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-large-scale-in-context-learning--2-1",
       "original": "VALL-E [Wang et al., 2023] is most related to Voicebox.",
       "zh": "VALL-E [Wang et al., 2023] 与 Voicebox 关系最密切。"
      },
      {
       "id": "s-large-scale-in-context-learning--2-2",
       "original": "It is a text conditioned LM trained on Encodec [Défossez et al., 2022] tokens (similar to SoundStream).",
       "zh": "它是一个以文本为条件、在 Encodec [Défossez et al., 2022] token（与 SoundStream 类似）上训练的语言模型。"
      },
      {
       "id": "s-large-scale-in-context-learning--2-3",
       "original": "Encodec tokenizes speech with a residual quantization layer, which encodes each frame with 8 codebooks at a 75Hz frame rate.",
       "zh": "Encodec 通过残差量化层对语音做 token 化，以 75Hz 的帧率用 8 个码本编码每一帧。"
      },
      {
       "id": "s-large-scale-in-context-learning--2-4",
       "original": "The codebooks are ordered such that the first code contains the most information and so on.",
       "zh": "这些码本按信息量排序：第一个码本包含最多信息，依此类推。"
      },
      {
       "id": "s-large-scale-in-context-learning--2-5",
       "original": "VALL-E has two modules.",
       "zh": "VALL-E 包含两个模块。"
      },
      {
       "id": "s-large-scale-in-context-learning--2-6",
       "original": "The first is an auto-regressive (AR) model that predicts the first code of each frame given text and the audio prompt.",
       "zh": "第一个是 AR 模型，给定文本和音频提示，预测每帧的第一个码本。"
      },
      {
       "id": "s-large-scale-in-context-learning--2-7",
       "original": "The second is an NAR model that predicts the remaining seven codebooks sequentially (all frames are predicted simultaneously when predicting each codebook).",
       "zh": "第二个是 NAR 模型，顺序预测其余七个码本（预测每个码本时所有帧同时预测）。"
      }
     ]
    },
    {
     "id": "p-large-scale-in-context-learning--3",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-large-scale-in-context-learning--3-1",
       "original": "VALL-E demonstrates state-of-the-art (SOTA) zero-shot TTS performance through in-context learning, where speech of the desired style is used as the prompt.",
       "zh": "VALL-E 通过上下文学习展示了 SOTA 的零样本 TTS 性能：以具有期望风格的语音作为提示。"
      },
      {
       "id": "s-large-scale-in-context-learning--3-2",
       "original": "The model considers the prompt as part of the whole utterance such that it generates the rest of the utterance containing the target text in the same audio style.",
       "zh": "模型把提示视为整个语句的一部分，从而生成包含目标文本、且与提示具有相同音频风格的其余部分。"
      },
      {
       "id": "s-large-scale-in-context-learning--3-3",
       "original": "Voicebox has several design advantages compared to VALL-E. 1) Voicebox can use context both in the past and future, which is useful for editing where only a segment in the middle needs to be generated. 2) Voicebox can generate speech much faster than VALL-E because flow-matching can produce high quality samples with less than ten NAR steps, while VALL-E requires one AR and seven NAR steps. 3) Voicebox decouples duration and audio modeling, enabling finer grained alignment control. 4) Voicebox is compatible with any continuous features including Encodec embeddings.",
       "zh": "与 VALL-E 相比，Voicebox 有若干设计优势：1）Voicebox 可以同时利用过去和未来的上下文，这对只需生成中间某一段的编辑任务很有用；2）Voicebox 的生成速度远快于 VALL-E，因为流匹配只需不到 10 次 NAR 步即可产出高质量样本，而 VALL-E 需要 1 次 AR 步加 7 次 NAR 步；3）Voicebox 将时长建模与音频建模解耦，可实现更细粒度的对齐控制；4）Voicebox 兼容任何连续特征，包括 Encodec 嵌入。"
      }
     ]
    },
    {
     "id": "p-large-scale-in-context-learning--4",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-large-scale-in-context-learning--4-1",
       "original": "NaturalSpeech2 [Shen et al., 2023] is another concurrent work that explores diffusion-style models for in-context speech generation.",
       "zh": "NaturalSpeech2 [Shen et al., 2023] 是另一项同期工作，探索用扩散式模型做上下文语音生成。"
      },
      {
       "id": "s-large-scale-in-context-learning--4-2",
       "original": "It adopts the latent diffusion framework [Rombach et al., 2022], which encodes speech into latent features using an auto-encoder with a residual vector quantizer, and uses a diffusion model to generate latent features conditioned on text, (predicted) pitch, and a speech prompt.",
       "zh": "它采用潜扩散框架 [Rombach et al., 2022]：用带残差向量量化器的自编码器把语音编码为潜特征，再用扩散模型以文本、（预测的）基频和语音提示为条件生成潜特征。"
      },
      {
       "id": "s-large-scale-in-context-learning--4-3",
       "original": "The predicted latent features are converted to waveform using the decoder of the same auto-encoder.",
       "zh": "生成的潜特征由同一个自编码器的解码器还原为波形。"
      }
     ]
    },
    {
     "id": "p-large-scale-in-context-learning--5",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-large-scale-in-context-learning--5-1",
       "original": "NaturalSpeech2 differs from Voicebox in a few key aspects. 1) it has an extra pitch predictor and conditions feature generation on pitch. 2) NaturalSpeech2 predicts learned latent features while Voicebox predicts Mel spectrogram. 3) it adopts an asymmetric encoder for speech prompt and speech target, and uses two-stage cross-attention to query the prompt.",
       "zh": "NaturalSpeech2 与 Voicebox 在几个关键方面不同：1）它有额外的基频预测器，并以基频为条件生成特征；2）NaturalSpeech2 预测学习到的潜特征，而 Voicebox 预测 Mel 频谱图；3）它对语音提示和语音目标采用非对称编码器，并用两阶段交叉注意力查询提示。"
      },
      {
       "id": "s-large-scale-in-context-learning--5-2",
       "original": "Inference for NaturalSpeech2 is more efficient in terms of attention computation because the prompt is only encoded once and reused for every diffusion step, but it is unclear how this design affects infilling performance, which was not evaluated. 4) the duration and the pitch predictor is a regression model which predicts only one duration and pitch for the same prompt and text. 5) NaturalSpeech2 always conditions on a speech prompt during inference, which does not allow diverse speech sampling demonstrated in Section 5.5. 6) Voicebox leverages flow-matching with optimal transport path which was shown to train and infer faster than diffusion paths, which is the objective NaturalSpeech2 adopts.",
       "zh": "NaturalSpeech2 的推理在注意力计算上更高效，因为提示只编码一次并在每个扩散步复用，但尚不清楚这一设计对填充性能有何影响——原文未做评估；4）其时长和基频预测器是回归模型，对同一提示和文本只预测一种时长和基频；5）NaturalSpeech2 在推理时始终以语音提示为条件，因此无法实现第 5.5 节展示的多样化语音采样；6）Voicebox 采用带最优传输路径的流匹配，已被证明比 NaturalSpeech2 采用的扩散路径目标训练和推理都更快。"
      },
      {
       "id": "s-large-scale-in-context-learning--5-3",
       "original": "Voicebox generates high quality samples with only 16 ODE steps while NaturalSpeech2 sets the diffusion steps to 150.",
       "zh": "Voicebox 仅用 16 步 ODE 就能生成高质量样本，而 NaturalSpeech2 的扩散步数设为 150。"
      },
      {
       "id": "s-large-scale-in-context-learning--5-4",
       "original": "The overall inference time for Voicebox is expected to be faster.",
       "zh": "Voicebox 的总体推理时间预计会更快。"
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
    "zh": "3 模型"
   },
   "blocks": []
  },
  {
   "id": "sec-3-1",
   "num": "3.1",
   "level": 2,
   "page": 4,
   "title": {
    "original": "Background: Flow Matching with an optimal transport path",
    "zh": "3.1 背景：带最优传输路径的流匹配"
   },
   "blocks": [
    {
     "id": "p-3-1-1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-1-1-1",
       "original": "Let Rd be the data space with data points x ∈Rd drawn from some unknown distribution q(x).",
       "zh": "设 Rd 为数据空间，数据点 x ∈ Rd 取自某个未知分布 q(x)。"
      },
      {
       "id": "s-3-1-1-2",
       "original": "Continuous Normalizing Flows (CNFs) Chen et al. [2018] are a family of generative models that learn the transformation from a simple prior distribution p0 (e.g., normal distribution) to the data distribution p1 ≈q.",
       "zh": "连续归一化流（CNF）[Chen et al.] [2018] 是一类生成模型，学习从简单先验分布 p0（如正态分布）到数据分布 p1 ≈ q 的变换。"
      },
      {
       "id": "s-3-1-1-3",
       "original": "CNFs parameterize a time-dependent vector field vt : [0, 1] × Rd →Rd that is used to construct a flow: ϕt : [0, 1] × Rd →Rd that pushes points from the prior towards the target distribution.",
       "zh": "CNF 参数化一个时间相关的向量场 vt : [0, 1] × Rd → Rd，用它来构造一个流 ϕt : [0, 1] × Rd → Rd，把点从先验分布推向目标分布。"
      },
      {
       "id": "s-3-1-1-4",
       "original": "The relationship between a vector field and a flow is defined via the ordinary differential equation (ODE) as: d dtϕt(x) = vt(ϕt(x)); ϕ0(x) = x.",
       "zh": "向量场与流的关系由常微分方程（ODE）定义：d/dt ϕt(x) = vt(ϕt(x))，且 ϕ0(x) = x。"
      }
     ]
    },
    {
     "id": "p-3-1-2",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-3-1-2-1",
       "original": "For a flow ϕt, the probability path (time-dependent probability density function) p : [0, 1] × Rd → R>0 can be derived via the change of variables formula: pt(x) = p0(ϕ−1 t (x)) det ∂ϕ−1 t ∂x (x) .",
       "zh": "给定流 ϕt，可通过变量替换公式推导概率路径（时间相关的概率密度函数）p : [0, 1] × Rd → R>0：pt(x) = p0(ϕt⁻¹(x)) |det ∂ϕt⁻¹/∂x (x)|。"
      }
     ]
    },
    {
     "id": "p-3-1-3",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-3-1-3-1",
       "original": "To sample from pt(x), we first draw x0 from p0 and then solve the initial value problem (IVP) for ϕt(x0) given dϕt(x)/dt = vt(ϕt(x)) and ϕ0(x) = x0.",
       "zh": "要从 pt(x) 采样，我们先从 p0 抽取 x0，然后在 dϕt(x)/dt = vt(ϕt(x)) 和 ϕ0(x) = x0 的条件下求解初值问题（IVP）得到 ϕt(x0)。"
      },
      {
       "id": "s-3-1-3-2",
       "original": "We use xt and ϕt(x0) interchangeably.",
       "zh": "我们交替使用 xt 和 ϕt(x0) 两种记号。"
      }
     ]
    },
    {
     "id": "p-3-1-4",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-3-1-4-1",
       "original": "Let pt be a probability path and ut be the corresponding vector field that generates pt.",
       "zh": "设 pt 为一条概率路径，ut 为生成 pt 的对应向量场。"
      },
      {
       "id": "s-3-1-4-2",
       "original": "The vector field vt(x; θ) parameterized by a neural network θ can be trained with the Flow Matching objective:",
       "zh": "由神经网络 θ 参数化的向量场 vt(x; θ) 可以用流匹配（Flow Matching）目标训练："
      }
     ]
    },
    {
     "id": "p-3-1-5",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-3-1-5-1",
       "original": "LF M(θ) = Et,pt(x)||ut(x) −vt(x; θ)||2, where t ∼U[0, 1] and x ∼pt(x).",
       "zh": "（式 2）LFM(θ) = Et,pt(x) ||ut(x) − vt(x; θ)||²，其中 t ∼ U[0, 1]，x ∼ pt(x)。"
      },
      {
       "id": "s-3-1-5-2",
       "original": "While the objective appears simple, in practice we do not have the prior knowledge of pt or vt, and cannot directly compute the loss or its gradient estimator.",
       "zh": "虽然这个目标看起来简单，但实际上我们事先并不知道 pt 或 vt，无法直接计算损失或其梯度估计。"
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
       "original": "Let x1 be a random variable distributed according to data distribution q.",
       "zh": "设 x1 是服从数据分布 q 的随机变量。"
      },
      {
       "id": "s-3-1-6-2",
       "original": "Lipman et al. [2023] first notes that a probability path pt(x) can be constructed via a mixture of simpler conditional paths pt(x | x1) whose vector field ut(x | x1) can be easily computed.",
       "zh": "Lipman et al. [2023] 首先指出：概率路径 pt(x) 可以由更简单的条件路径 pt(x | x1) 混合而成，而这些条件路径的向量场 ut(x | x1) 很容易计算。"
      },
      {
       "id": "s-3-1-6-3",
       "original": "To construct pt(x), a conditional path is defined such that 1) p0(x | x1) = p0(x) and 2) p1(x | x1) = N(x | x1, σ2I), a Gaussian distribution centered at x1 with a sufficiently small σ (typically 10−5).",
       "zh": "为构造 pt(x)，条件路径需满足：1）p0(x | x1) = p0(x)；2）p1(x | x1) = N(x | x1, σ²I)，即以 x1 为中心、σ 充分小（通常为 10−5，即 10^-5）的高斯分布。"
      },
      {
       "id": "s-3-1-6-4",
       "original": "The marginal path is computed as R pt(x | x1)q(x1)dx1, which closely approximates q(x1) at t = 1.",
       "zh": "边际路径通过 ∫ pt(x | x1)q(x1)dx1 计算，它在 t = 1 处非常接近 q(x1)。"
      },
      {
       "id": "s-3-1-6-5",
       "original": "With that, [Lipman et al., 2023] presents the Conditional Flow Matching (CFM) objective, LCF M(θ) = Et,q(x1),pt(x|x1)||ut(x | x1) −vt(x; θ)||2.",
       "zh": "在此基础上，[Lipman et al., 2023] 提出条件流匹配（CFM）目标（式 5）：LCFM(θ) = Et,q(x1),pt(x|x1) ||ut(x | x1) − vt(x; θ)||2。"
      }
     ]
    },
    {
     "id": "p-3-1-7",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-3-1-7-1",
       "original": "It is proven that FM and CFM have identical gradients w.r.t. θ.",
       "zh": "可以证明 FM 与 CFM 关于 θ 的梯度完全相同。"
      },
      {
       "id": "s-3-1-7-2",
       "original": "More importantly, one can easily draw samples from pt(x | x1) and compute ut(x | x1) to derive an unbiased gradient estimator.",
       "zh": "更重要的是，我们可以很容易地从 pt(x | x1) 采样并计算 ut(x | x1)，从而得到无偏的梯度估计。"
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
       "original": "The next question is how to choose a conditional flow.",
       "zh": "接下来的问题是如何选择条件流。"
      },
      {
       "id": "s-3-1-8-2",
       "original": "A flow defines trajectories, describing how each point moves between p0 and p1.",
       "zh": "流定义了轨迹，描述每个点如何在 p0 与 p1 之间移动。"
      },
      {
       "id": "s-3-1-8-3",
       "original": "Intuitively, a simpler trajectory (e.g., a straight line) can be learned faster and the IVP can be solved more accurately and efficiently.",
       "zh": "直觉上，更简单的轨迹（例如直线）学得更快，初值问题也能解得更准、更高效。"
      },
      {
       "id": "s-3-1-8-4",
       "original": "Lipman et al. [2023] presents a conditional flow called optimal transport (OT) path, which has the form of pt(x | x1) = N(x | tx1, (1 −(1 −σmin)t)2I) and ut(x | x1) = (x1 −(1 −σmin)x) / (1 −(1 −σmin)t).",
       "zh": "Lipman et al. [2023] 提出了一种称为最优传输（OT）路径的条件流，形式为 pt(x | x1) = N(x | tx1, (1 − (1 − σmin)t)²I)，ut(x | x1) = (x1 − (1 − σmin)x) / (1 − (1 − σmin)t)。（对应式 2 的目标）"
      },
      {
       "id": "s-3-1-8-5",
       "original": "The flow is arguably simple because points move with a constant speed and direction.",
       "zh": "这个流可以说很简单，因为各点以恒定的速度和方向移动。"
      },
      {
       "id": "s-3-1-8-6",
       "original": "We adopt it for Voicebox Lipman et al. [2023] also presents another flow that recovers the path of diffusion models [Song and Ermon, 2019], which is more complex than the OT path.",
       "zh": "我们在 Voicebox 中采用它。Lipman et al. [2023] 还给出了另一种能还原扩散模型 [Song and Ermon, 2019] 路径的流，它比 OT 路径更复杂。"
      },
      {
       "id": "s-3-1-8-7",
       "original": "We will present ablation studies comparing different paths (OT vs diffusion) and different objectives (CFM vs score-matching).",
       "zh": "我们将给出消融实验，比较不同路径（OT 与扩散）和不同目标（CFM 与 score-matching）。"
      },
      {
       "id": "s-3-1-8-8",
       "original": "Results show the superiority in performance and efficiency of CFM with OT path",
       "zh": "结果表明，采用 OT 路径的 CFM 在性能和效率上都更优。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-3-2",
   "num": "3.2",
   "level": 2,
   "page": 5,
   "title": {
    "original": "Problem formulation",
    "zh": "3.2 问题形式化"
   },
   "blocks": [
    {
     "id": "p-3-2-1",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-3-2-1-1",
       "original": "Given a dataset of transcribed speech (x, y) where x and y denote an audio sample and its transcript, respectively, the goal is to build a single model that can perform many text-guided speech generation tasks through in-context learning.",
       "zh": "给定一个带转写的语音数据集 (x, y)，其中 x 和 y 分别表示音频样本及其转写文本，目标是构建一个能通过上下文学习完成多种文本引导语音生成任务的单一模型。"
      },
      {
       "id": "s-3-2-1-2",
       "original": "We propose to train such a generative model on the text-guided speech infilling task, which predicts a segment of speech given its surrounding audio and the complete text transcript.",
       "zh": "我们提出在文本引导的语音填充任务上训练这样的生成模型：给定周围音频和完整文本转写，预测一段语音。"
      },
      {
       "id": "s-3-2-1-3",
       "original": "Let m be a binary temporal mask which is of the same length as x, 3 and xmis = m⊙x and xctx = (1 −m) ⊙x be the complementary masked versions of x.",
       "zh": "设 m 为与 x 等长的二值时间掩蔽（“时间”指音频样本的物理时间，而非 CNF 中流的时间 t ∈ [0, 1]），并令 xmis = m ⊙ x、xctx = (1 − m) ⊙ x 为 x 的两个互补掩蔽版本。（脚注 3）"
      },
      {
       "id": "s-3-2-1-4",
       "original": "The generative model learns p(xmis | y, xctx).",
       "zh": "生成模型学习 p(xmis | y, xctx)。"
      },
      {
       "id": "s-3-2-1-5",
       "original": "In other words, y and xctx are the context and xmis is the missing data.",
       "zh": "换句话说，y 和 xctx 是上下文，xmis 是缺失的数据。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-3-3",
   "num": "3.3",
   "level": 2,
   "page": 5,
   "title": {
    "original": "Model and Training",
    "zh": "3.3 模型与训练"
   },
   "blocks": [
    {
     "id": "p-3-3-1",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-3-3-1-1",
       "original": "Motivated by the need that some applications require fine-grained alignment control between speech and text, we decouple Voicebox into two components: an audio model and a duration model.",
       "zh": "出于某些应用需要对语音与文本之间的对齐做细粒度控制，我们将 Voicebox 解耦为两个组件：音频模型和时长模型。"
      },
      {
       "id": "s-3-3-1-2",
       "original": "Let x = (x1, x2, · · · , xN) be an audio sample of N frames, y = (y1, y2, · · · , yM) be a text sequence of M phones, and l = (l1, l2, · · · , lM) be the per-phone duration where lj denotes how many audio frames yj correspond to and PM j=1 lj = N.",
       "zh": "设 x = (x1, x2, · · · , xN) 为 N 帧的音频样本，y = (y1, y2, · · · , yM) 为 M 个音素的文本序列，l = (l1, l2, · · · , lM) 为逐音素时长，其中 lj 表示 yj 对应多少音频帧，且 Σ(j=1..M) lj = N。"
      },
      {
       "id": "s-3-3-1-3",
       "original": "We further define z = rep(y, l) = (z1, z2, · · · , zN) to be the frame-level phone transcript, which repeats each yj by lj times such that zi denotes the phone label of the audio frame xi.",
       "zh": "我们进一步定义 z = rep(y, l) = (z1, z2, · · · , zN) 为帧级音素转写：把每个 yj 重复 lj 次，使 zi 表示音频帧 xi 的音素标签。"
      },
      {
       "id": "s-3-3-1-4",
       "original": "For a pair of (x, y), l and z can be estimated through forced alignment 3“temporal” refers to the physical time of the audio sample, not the time t ∈[0, 1] of the flow in CNF. using a speech recognition model.",
       "zh": "对于一对 (x, y)，可以使用语音识别模型通过强制对齐估计 l 和 z。（脚注 3：“时间”指音频样本的物理时间，而非 CNF 中的流时间 t ∈ [0, 1]，即从 0 到 1。）"
      },
      {
       "id": "s-3-3-1-5",
       "original": "The estimation of q(xmis | y, xctx) is then broken down into the audio model q(xmis | z, xctx) and the duration model q(lmis | y, lctx), where lmis and lctx denote l masked by m′ and 1 −m′, and m′ is downsampled from m based on l where m = rep(m′, l)",
       "zh": "于是 q(xmis | y, xctx) 的估计被分解为音频模型 q(xmis | z, xctx) 和时长模型 q(lmis | y, lctx)，其中 lmis 和 lctx 分别表示 l 被 m′ 和 1 − m′ 掩蔽的部分，而 m′ 由 m 根据 l 下采样得到，满足 m = rep(m′, l)。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-voicebox-audio-model",
   "num": null,
   "level": 2,
   "page": 6,
   "title": {
    "original": "Voicebox Audio Model",
    "zh": "Voicebox 音频模型（图 2）"
   },
   "blocks": [
    {
     "id": "p-voicebox-audio-model-1",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-voicebox-audio-model-1-1",
       "original": "H F F Phone embedder Frame-level phone emb Masked speech Noisy speech N Phonemize & Forced alignment Random span masking “How are you doing” N D F Transformer Linear Projection Predicted flow (gradient) N N 1 Sinusoidal position embedder Compute sample at flow step t for OT path Sampled flow step Sampled noise from the prior F",
       "zh": "（图内文字）H F F 音素嵌入器 帧级音素嵌入 被掩蔽语音 含噪语音 N 音素化与强制对齐 随机片段掩蔽 “How are you doing” N D F Transformer 线性投影 预测的流（梯度） N N 1 正弦位置嵌入器 计算 OT 路径上流步 t 处的样本 采样得到的流步 从先验采样的噪声 F"
      }
     ]
    },
    {
     "id": "fig-voicebox-audio-model-1",
     "type": "figure_caption",
     "page": 6,
     "original": "Figure 2: Illustration of the Voicebox audio model. The lower half illustrates how inputs are created during training. N denotes the number of frames, H for the phone embedding dimension, F for the spectral feature dimension, and D for the Transformer input dimension. Solid dark gray blocks denote trainable components, and light gray blocks with dashed border are frozen components or operations without trainable parameters.",
     "zh": "图 2：Voicebox 音频模型示意图。下半部分展示训练时输入的构造方式。N 表示帧数，H 为音素嵌入维度，F 为频谱特征维度，D 为 Transformer 输入维度。深灰色实心块为可训练组件，带虚线边框的浅灰色块为冻结组件或无可训练参数的操作。"
    }
   ]
  },
  {
   "id": "sec-audio-model-fig-2",
   "num": null,
   "level": 2,
   "page": 6,
   "title": {
    "original": "Audio Model (Fig. 2)",
    "zh": "音频模型（图 2）"
   },
   "blocks": [
    {
     "id": "p-audio-model-fig-2-1",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-audio-model-fig-2-1-1",
       "original": "Given a context z and xctx of length N, the distribution of xmis is highly stochastic especially when xmis has a large temporal span.",
       "zh": "给定长度为 N 的上下文 z 和 xctx，xmis 的分布是高度随机的，尤其当 xmis 的时间跨度较大时。"
      },
      {
       "id": "s-audio-model-fig-2-1-2",
       "original": "Hence, we parameterize it with a CNF and train it using the flow matching objective with the optimal transport path.",
       "zh": "因此，我们用 CNF 对其参数化，并采用带最优传输路径的流匹配目标进行训练。"
      },
      {
       "id": "s-audio-model-fig-2-1-3",
       "original": "Audio x is represented as an 80-dimensional log Mel spectrogram (xi ∈R80) extracted at a 100Hz frame rate.4 The audio context xi ctx = 0 where mi = 1 and xi ctx = xi where mi = 0.",
       "zh": "音频 x 表示为 80 维 log-Mel 频谱图（xi ∈ R80），以 100Hz 帧率提取。音频上下文满足：mi = 1 时 xi_ctx = 0，mi = 0 时 xi_ctx = xi。（脚注 4）"
      }
     ]
    },
    {
     "id": "p-audio-model-fig-2-2",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-audio-model-fig-2-2-1",
       "original": "For simpler conditioning, we model the conditional distribution q(x | z, xctx) of all frames x instead of only masked frames xmis.",
       "zh": "为简化条件建模，我们对全部帧 x 的条件分布 q(x | z, xctx) 建模，而不是只对被掩蔽帧 xmis 建模。"
      },
      {
       "id": "s-audio-model-fig-2-2-2",
       "original": "A neural network is used to parameterize the conditional vector field vt(xt, xctx, z; θ) that additionally takes xctx and z as input.",
       "zh": "一个神经网络用于参数化条件向量场 vt(xt, xctx, z; θ)，它额外以 xctx 和 z 作为输入。"
      },
      {
       "id": "s-audio-model-fig-2-2-3",
       "original": "Note that xt is a sample at flow step t.",
       "zh": "注意 xt 是流步 t 处的样本。"
      }
     ]
    },
    {
     "id": "p-audio-model-fig-2-3",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-audio-model-fig-2-3-1",
       "original": "Given as input xctx ∈RN×F , xt ∈RN×F , phone sequence z ∈[K]N with K denoting the number of phone classes, and a time step t ∈[0, 1], we employ a Transformer model to parameterize the vector field vt.",
       "zh": "给定输入 xctx ∈ R^(N×F)、xt ∈ R^(N×F)、音素序列 z ∈ [K]^N（K 为音素类别数）以及时间步 t ∈ [0, 1]，我们用一个 Transformer 模型参数化向量场 vt。"
      },
      {
       "id": "s-audio-model-fig-2-3-2",
       "original": "A lookup table, denoted as L ∈RK×H, is used to embed the phone sequence z, resulting in the embedded sequence zemb ∈RN×H where zi emb = L(zi) for i ∈1, . . . , N.",
       "zh": "用查找表 L ∈ R^(K×H) 嵌入音素序列 z，得到嵌入序列 zemb ∈ R^(N×H)，其中 zi_emb = L(zi)，i ∈ 1, . . . , N。"
      },
      {
       "id": "s-audio-model-fig-2-3-3",
       "original": "Subsequently, the three sequences (xt, xctx, and zemb) are concatenated frame-by-frame and projected by employing matrix Wp ∈R(2F +H)×D, thereby obtaining the sequence Hc ∈RN×D where D represents the embedding dimension of the Transformer model.",
       "zh": "随后，将三个序列（xt、xctx 和 zemb）逐帧拼接，并通过矩阵 Wp ∈ R^((2F +H)×D) 投影，得到序列 Hc ∈ R^(N×D)，其中 D 为 Transformer 模型的嵌入维度。"
      }
     ]
    },
    {
     "id": "p-audio-model-fig-2-4",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-audio-model-fig-2-4-1",
       "original": "To embed the flow step, a sinusoidal positional encoding is applied to map t ∈[0, 1] to ht ∈RD.",
       "zh": "为嵌入流步，应用正弦位置编码把 t ∈ [0, 1] 映射为 ht ∈ R^D。"
      },
      {
       "id": "s-audio-model-fig-2-4-2",
       "original": "The sequence ˜Hc ∈R(N+1)×D, which serves as the input to the Transformer model, is derived by concatenating Hc with the vector ht along the time dimension.",
       "zh": "将 Hc 与向量 ht 沿时间维拼接，得到序列 H̃c ∈ R^((N+1)×D)，作为 Transformer 模型的输入。"
      },
      {
       "id": "s-audio-model-fig-2-4-3",
       "original": "Given the Transformer output vt(xt, xmis, z; θ) ∈RN×F , which is the sub-sequence corresponding to Hc, the loss is computed as:",
       "zh": "取 Transformer 输出中对应 Hc 的子序列 vt(xt, xmis, z; θ) ∈ R^(N×F)，损失计算为："
      }
     ]
    },
    {
     "id": "p-audio-model-fig-2-5",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-audio-model-fig-2-5-1",
       "original": "Laudio-CFM(θ) = Et,m,q(x,z),p0(x0)||ut(xt | x) −vt(xt, xctx, z; θ)||2, by reparameterizing Eq. (4).",
       "zh": "（式 2 的推广）Laudio-CFM(θ) = Et,m,q(x,z),p0(x0) ||ut(xt | x) − vt(xt, xctx, z; θ)||²，由式 (4) 重参数化得到。"
      },
      {
       "id": "s-audio-model-fig-2-5-2",
       "original": "During training, given an audio sample x and a prior sample x0, we have xt = (1 −(1 −σmin)t)x0 + tx and ut(xt | x) = x −(1 −σmin)x0.",
       "zh": "训练时，给定音频样本 x 和先验样本 x0，有 xt = (1 − (1 − σmin)t)x0 + tx，ut(xt | x) = x − (1 − σmin)x0。"
      },
      {
       "id": "s-audio-model-fig-2-5-3",
       "original": "This function computes the loss on all frames, including those that are not masked and would not be required during inference.",
       "zh": "该函数在所有帧上计算损失，包括那些未被掩蔽、推理时也不需要生成的帧。"
      }
     ]
    },
    {
     "id": "p-audio-model-fig-2-6",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-audio-model-fig-2-6-1",
       "original": "4A Mel-spectrogram can be converted back to a waveform using a vocoder.",
       "zh": "（脚注 4）Mel 频谱图可以用声码器转换回波形。"
      }
     ]
    },
    {
     "id": "p-audio-model-fig-2-7",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-audio-model-fig-2-7-1",
       "original": "To divert the model’s focus to masked frames, we present a masked version of Laudio-CFM:",
       "zh": "为让模型的注意力集中到被掩蔽帧上，我们给出 Laudio-CFM 的掩蔽版本："
      }
     ]
    },
    {
     "id": "p-audio-model-fig-2-8",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-audio-model-fig-2-8-1",
       "original": "Laudio-CFM-m(θ) = Et,m,q(x,z),p0(x0)||m ⊙(ut(xt | x) −vt(xt, xctx, z; θ)) ||2, where the loss is only computed on masked frames.",
       "zh": "（式 2 的掩蔽形式）Laudio-CFM-m(θ) = Et,m,q(x,z),p0(x0) ||m ⊙ (ut(xt | x) − vt(xt, xctx, z; θ)) ||²，损失只在被掩蔽帧上计算。"
      },
      {
       "id": "s-audio-model-fig-2-8-2",
       "original": "Appendix B.1 shows it leads to better results.",
       "zh": "附录 B.1 表明这一版本带来更好的结果。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-duration-model",
   "num": null,
   "level": 2,
   "page": 7,
   "title": {
    "original": "Duration model",
    "zh": "时长模型"
   },
   "blocks": [
    {
     "id": "p-duration-model-1",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-duration-model-1-1",
       "original": "We consider two solutions.",
       "zh": "我们考虑两种方案。"
      },
      {
       "id": "s-duration-model-1-2",
       "original": "The first one closely follows the audio model.",
       "zh": "第一种方案与音频模型基本一致。"
      },
      {
       "id": "s-duration-model-1-3",
       "original": "It models q(l | y, lctx) via a conditional vector field which swaps (x, xctx, z) with (l, lctx, y) and accordingly for the flow, where l, lctx ∈RM×1 and y ∈[K]M.",
       "zh": "它通过一个条件向量场对 q(l | y, lctx) 建模，把 (x, xctx, z) 替换为 (l, lctx, y)，流也做相应替换，其中 l, lctx ∈ R^(M×1)，y ∈ [K]^M。"
      },
      {
       "id": "s-duration-model-1-4",
       "original": "The masked version of the CFM loss is used for training.",
       "zh": "训练使用掩蔽版 CFM 损失。"
      },
      {
       "id": "s-duration-model-1-5",
       "original": "On the other hand, previous studies have shown that regression duration models can produce reasonable speech [Ren et al., 2021, Ła´ncucki, 2021].",
       "zh": "另一方面，已有研究表明回归式时长模型也能产生合理的语音 [Ren et al., 2021, Łańcucki, 2021]。"
      },
      {
       "id": "s-duration-model-1-6",
       "original": "Hence we consider a second solution that regresses the masked duration lmis given the context duration lctx and phonetic transcript y.",
       "zh": "因此我们考虑第二种方案：给定上下文时长 lctx 和音素转写 y，回归被掩蔽时长 lmis。"
      },
      {
       "id": "s-duration-model-1-7",
       "original": "The same Transformer model is used, except that there are only two input sequences instead of three, and the time embedding is not used.",
       "zh": "使用同一个 Transformer 模型，只是输入序列只有两个而非三个，且不使用时间嵌入。"
      },
      {
       "id": "s-duration-model-1-8",
       "original": "The model is trained with an L1 regression loss on masked phones:",
       "zh": "模型在被掩蔽音素上用 L1 回归损失训练："
      }
     ]
    },
    {
     "id": "p-duration-model-2",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-duration-model-2-1",
       "original": "Ldur-regr-m(θ) = Em,q(l,y)||m′ ⊙(lmis −g(lctx, y; θ)) ||1, where g denotes the regression-based duration model.",
       "zh": "Ldur-regr-m(θ) = Em,q(l,y) ||m′ ⊙ (lmis − g(lctx, y; θ)) ||1，其中 g 表示基于回归的时长模型。"
      },
      {
       "id": "s-duration-model-2-2",
       "original": "This is similar to the duration model used in FastSpeech2 [Ren et al., 2021], but with additional duration context lctx as input.",
       "zh": "这与 FastSpeech2 [Ren et al., 2021] 使用的时长模型类似，但额外以时长上下文 lctx 为输入。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-3-4",
   "num": "3.4",
   "level": 2,
   "page": 7,
   "title": {
    "original": "Inference",
    "zh": "3.4 推理"
   },
   "blocks": [
    {
     "id": "p-3-4-1",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-3-4-1-1",
       "original": "To sample from the the learned audio distribution p1(x | z, xctx), a noise x0 is first sampled from p0, and then an ODE solver is used to evaluate ϕ1(x0) given dϕt(x0)/dt = vt(ϕt(x0), xctx, z; θ) and the initial condition ϕ0(x0) = x0. Fig. 3 provides an illustration of the process.",
       "zh": "要从学习到的音频分布 p1(x | z, xctx) 采样，先从 p0 采样噪声 x0，然后用 ODE 求解器在 dϕt(x0)/dt = vt(ϕt(x0), xctx, z; θ) 和初始条件 ϕ0(x0) = x0 下求 ϕ1(x0)。图 3 给出该过程的示意。"
      }
     ]
    },
    {
     "id": "p-3-4-2",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-3-4-2-1",
       "original": "Intuitively, the ODE solver computes ϕ1(x0) by evaluating vt at multiple t to approximate the integration from t = 0 to t = 1 given the initial condition ϕ0(x0) = x0.",
       "zh": "直观地说，ODE 求解器通过在多个 t 处评估 vt，从初始条件 ϕ0(x0) = x0 出发近似 t = 0 到 t = 1 的积分，从而计算 ϕ1(x0)。"
      },
      {
       "id": "s-3-4-2-2",
       "original": "The number of function evaluation (NFE) is defined as how many times dϕt(x0)/dt is evaluated.",
       "zh": "函数评估次数（NFE）定义为 dϕt(x0)/dt 被评估的次数。"
      },
      {
       "id": "s-3-4-2-3",
       "original": "A higher NFE often leads to a more accurate solution of ϕ1(x0) at the cost of longer run time.",
       "zh": "更高的 NFE 通常能得到更精确的 ϕ1(x0) 解，代价是运行时间更长。"
      },
      {
       "id": "s-3-4-2-4",
       "original": "This provides great flexibility for users to decide the trade-off between speed and accuracy.",
       "zh": "这为用户提供了极大的灵活性，自行决定速度与精度之间的权衡。"
      },
      {
       "id": "s-3-4-2-5",
       "original": "Moreover, we find that empirically Voicebox can generate very high quality speech with less than 10 NFEs, making it significantly faster than auto-regressive models.",
       "zh": "此外，我们经验上发现 Voicebox 用不到 10 次 NFE 就能生成非常高质量的语音，这使它显著快于自回归模型。"
      }
     ]
    },
    {
     "id": "p-3-4-3",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-3-4-3-1",
       "original": "Voicebox audio model inference ODE step 1 ODE step 2 ODE step N … conditionals: Voicebox audio model:",
       "zh": "（图内文字）Voicebox 音频模型推理 ODE 步 1 ODE 步 2 ODE 步 N … 条件输入：Voicebox 音频模型："
      }
     ]
    },
    {
     "id": "fig-3-4-1",
     "type": "figure_caption",
     "page": 7,
     "original": "Figure 3: Inference is equivalent to solving an ODE with an initial condition x0 sampled from the prior, a derivative dxt",
     "zh": "图 3：推理等价于求解一个 ODE：初始条件 x0 从先验采样，导数 dxt/dt 由音频模型给出（标题在抽取中截断）。"
    },
    {
     "id": "p-3-4-4",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-3-4-4-1",
       "original": "dt specified by the audio model, and conditional inputs (z, xctx).",
       "zh": "（接图 3，续）dt 由音频模型指定，条件输入为 (z, xctx)。"
      },
      {
       "id": "s-3-4-4-2",
       "original": "At each step, the ODE solver estimate xt+1 given t, xt from the previous step, the audio model, and the conditional inputs.",
       "zh": "每一步中，ODE 求解器根据上一步的 t、xt、音频模型和条件输入估计 xt+1。"
      },
      {
       "id": "s-3-4-4-3",
       "original": "In the end, it produces x1, which is a sample drawn from the learned distribution p1.",
       "zh": "最终得到 x1，即从学习到的分布 p1 中抽取的一个样本。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-3-5",
   "num": "3.5",
   "level": 2,
   "page": 7,
   "title": {
    "original": "Classifier-Free Guidance",
    "zh": "3.5 无分类器引导"
   },
   "blocks": [
    {
     "id": "p-3-5-1",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-3-5-1-1",
       "original": "Classifier guidance (CG) [Dhariwal and Nichol, 2021] is a technique used to trade off mode coverage and sample fidelity for diffusion models post training, similar to the effect of truncated or lowtemperature sampling for generative adversarial networks [Brock et al., 2018] and discrete flow models [Kingma and Dhariwal, 2018].",
       "zh": "分类器引导（CG）[Dhariwal and Nichol, 2021] 是一种在训练后权衡扩散模型模式覆盖度与样本保真度的技术，其作用类似于生成对抗网络 [Brock et al., 2018] 和离散流模型 [Kingma and Dhariwal, 2018] 中的截断采样或低温采样。"
      },
      {
       "id": "s-3-5-1-2",
       "original": "It modifies the score estimate of a diffusion model to include the gradient of the log likelihood of an auxiliary classifier.",
       "zh": "它修改扩散模型的 score 估计，加入一个辅助分类器的对数似然梯度。"
      },
      {
       "id": "s-3-5-1-3",
       "original": "Ho and Salimans [2022] notes that CG approximates sampling from p(x | c)p(c | x)α where c is the conditioner, and this can be simulated without a classifier by mixing the score estimate of a conditional model and an unconditional model.",
       "zh": "Ho and Salimans [2022] 指出，CG 近似于从 p(x | c)p(c | x)^α 采样（c 为条件），而这可以通过混合条件模型与无条件模型的 score 估计来模拟，无需分类器。"
      },
      {
       "id": "s-3-5-1-4",
       "original": "The unconditional model can be jointly trained by dropping the conditioner c with some probability, and the same model provides score estimates for both p(x) and p(x | c).",
       "zh": "无条件模型可以通过在训练时以一定概率丢弃条件 c 来联合训练，同一个模型同时为 p(x) 和 p(x | c) 提供 score 估计。"
      }
     ]
    },
    {
     "id": "p-3-5-2",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-3-5-2-1",
       "original": "We extend the idea of classifier free guidance (CFG) to flow-matching models.",
       "zh": "我们将无分类器引导（CFG）的思想推广到流匹配模型。"
      },
      {
       "id": "s-3-5-2-2",
       "original": "The conditioner c is equivalent to (z, xctx) for audio models and (y, lctx) for duration models, which is dropped with puncond during training.",
       "zh": "条件 c 在音频模型中等价于 (z, xctx)，在时长模型中等价于 (y, lctx)，训练时以概率 puncond 被丢弃。"
      },
      {
       "id": "s-3-5-2-3",
       "original": "During inference, the modified vector field ˜vt for the audio model becomes ˜vt(w, xmis, z; θ) = (1 + α) · vt(w, xctx, z; θ) −α · vt(w; θ), where α is the strength of the guidance, and vt(w; θ) is obtained by dropping xctx and z.",
       "zh": "推理时，音频模型修改后的向量场 ṽt 变为 ṽt(w, xmis, z; θ) = (1 + α) · vt(w, xctx, z; θ) − α · vt(w; θ)，其中 α 为引导强度，vt(w; θ) 通过丢弃 xctx 和 z 得到。"
      },
      {
       "id": "s-3-5-2-4",
       "original": "We use α and αdur for the CFG strengths for audio and duration model, respectively, which are selected based on empirical results.5",
       "zh": "音频模型和时长模型的 CFG 强度分别记为 α 和 αdur，根据经验结果选取。（脚注 5）"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-3-6",
   "num": "3.6",
   "level": 2,
   "page": 8,
   "title": {
    "original": "Applications",
    "zh": "3.6 应用"
   },
   "blocks": [
    {
     "id": "p-3-6-1",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-3-6-1-1",
       "original": "We demonstrate that Voicebox exhibits in-context learning abilities similar to LLMs by presenting a few examples of how to create context to perform tasks Voicebox was not explicitly trained on.",
       "zh": "我们通过若干示例展示 Voicebox 具备类似 LLM 的上下文学习能力：只需构造合适的上下文，即可完成 Voicebox 从未显式训练过的任务。"
      },
      {
       "id": "s-3-6-1-2",
       "original": "These examples are also illustrated in Figs. 1 and 4.",
       "zh": "这些示例也在图 1 和图 4 中展示。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-zero-shot-tts-alignment-preserve",
   "num": null,
   "level": 2,
   "page": 8,
   "title": {
    "original": "Zero-shot TTS & alignment-preserved style transfer",
    "zh": "零样本 TTS 与保持对齐的风格迁移"
   },
   "blocks": [
    {
     "id": "p-zero-shot-tts-alignment-preserve-1",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-zero-shot-tts-alignment-preserve-1-1",
       "original": "Given a target text ˆy and a transcribed reference audio (x, y), zero-shot TTS aims to synthesize speech resembling the possibly unseen audio style of the reference.",
       "zh": "给定目标文本 ŷ 和一段带转写的参考音频 (x, y)，零样本 TTS 的目标是合成模仿参考音频（可能是未见过的）音频风格的语音。"
      },
      {
       "id": "s-zero-shot-tts-alignment-preserve-1-2",
       "original": "Voicebox performs the task by treating the reference audio and the target speech as one utterance where the target speech is masked.",
       "zh": "Voicebox 把参考音频和目标语音视为一条语句来完成该任务，其中目标语音部分被掩蔽。"
      },
      {
       "id": "s-zero-shot-tts-alignment-preserve-1-3",
       "original": "Let l and z be phone duration and frame-level transcript of (x, y).",
       "zh": "设 l 和 z 为 (x, y) 的音素时长和帧级转写。"
      },
      {
       "id": "s-zero-shot-tts-alignment-preserve-1-4",
       "original": "The target duration ˆl is sampled given the duration context l and concatenated phone sequence cat(y, ˆy).",
       "zh": "目标时长 l̂ 以时长上下文 l 和拼接后的音素序列 cat(y, ŷ) 为条件采样得到。"
      },
      {
       "id": "s-zero-shot-tts-alignment-preserve-1-5",
       "original": "The target speech ˆx is then sampled given the context x and concatenated frame-level phones cat(z, rep(ˆy, ˆl)).",
       "zh": "然后以上下文 x 和拼接后的帧级音素 cat(z, rep(ŷ, l̂)) 为条件采样目标语音 x̂。"
      }
     ]
    },
    {
     "id": "p-zero-shot-tts-alignment-preserve-2",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-zero-shot-tts-alignment-preserve-2-1",
       "original": "Voicebox can also convert the audio style for speech ¯x while preserving its alignment ¯z.",
       "zh": "Voicebox 还可以在保持语音 x̄ 对齐 z̄ 不变的前提下转换其音频风格。"
      },
      {
       "id": "s-zero-shot-tts-alignment-preserve-2-2",
       "original": "This is useful for editing audio that is synchronized with other modalities such as video.",
       "zh": "这对于需要与视频等其他模态保持同步的音频编辑很有用。"
      },
      {
       "id": "s-zero-shot-tts-alignment-preserve-2-3",
       "original": "Similar to zero-shot TTS, Voicebox can simply perform the task by sampling target speech ˆx given the context x and concatenated frame-level phones cat(z, ¯z).",
       "zh": "与零样本 TTS 类似，Voicebox 只需以上下文 x 和拼接后的帧级音素 cat(z, z̄) 为条件采样目标语音 x̂ 即可完成该任务。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-transient-noise-removal-content-",
   "num": null,
   "level": 2,
   "page": 8,
   "title": {
    "original": "Transient noise removal & content editing",
    "zh": "瞬态噪声去除与内容编辑"
   },
   "blocks": [
    {
     "id": "p-transient-noise-removal-content--1",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-transient-noise-removal-content--1-1",
       "original": "When recording speech, one might misspeak a few words or the recording my be interrupted by unexpected background noise.",
       "zh": "录制语音时，说话人可能说错几个词，或者录音被意外的背景噪声打断。"
      },
      {
       "id": "s-transient-noise-removal-content--1-2",
       "original": "In these scenarios it is desired to just modify the problematic segment instead of re-recording the speech.",
       "zh": "在这些场景下，人们希望只修改出问题的片段，而不是重录整段语音。"
      },
      {
       "id": "s-transient-noise-removal-content--1-3",
       "original": "Voicebox can perform transient noise removal through re-generating the noise corrupted segment given the original frame-level transcript and the surrounding clean audio.",
       "zh": "Voicebox 可以执行瞬态噪声去除：给定原始帧级转写和周围的干净音频，重新生成被噪声污染的片段。"
      },
      {
       "id": "s-transient-noise-removal-content--1-4",
       "original": "Specifically, given the frame-level transcript z of a transcribed noisy speech (x, y), a user creates a mask m to indicate the noisy segment.",
       "zh": "具体来说，给定带转写含噪语音 (x, y) 的帧级转写 z，用户创建一个掩蔽 m 来标出含噪片段。"
      },
      {
       "id": "s-transient-noise-removal-content--1-5",
       "original": "The segment ˆxmis is then sampled given z and xctx = (1 −m) ⊙x.",
       "zh": "然后以 z 和 xctx = (1 − m) ⊙ x 为条件采样该片段 x̂mis。"
      },
      {
       "id": "s-transient-noise-removal-content--1-6",
       "original": "The audio model would likely generate clean speech for ˆxmis because during training clean audio context co-occurs with clean target audio most of the time.",
       "zh": "音频模型很可能会为 x̂mis 生成干净语音，因为训练时干净的音频上下文绝大多数时候与干净的目标音频共现。"
      },
      {
       "id": "s-transient-noise-removal-content--1-7",
       "original": "The new audio ˆx = ˆxmis + xctx.",
       "zh": "新音频为 x̂ = x̂mis + xctx。"
      }
     ]
    },
    {
     "id": "p-transient-noise-removal-content--2",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-transient-noise-removal-content--2-1",
       "original": "For content editing, let ˆy be the new desired transcript with some words from the original transcript y replaced, and l be the original duration.",
       "zh": "对于内容编辑，设 ŷ 为新的目标转写（其中原转写 y 的一些词被替换），l 为原始时长。"
      },
      {
       "id": "s-transient-noise-removal-content--2-2",
       "original": "A user first constructs lctx (of the same length as ˆy) by copying the lengths of phones that are not replaced from l, and set the lengths to 0 for new phones.",
       "zh": "用户首先构造 lctx（长度与 ŷ 相同）：从 l 中复制未被替换音素的时长，并把新音素的时长设为 0。"
      },
      {
       "id": "s-transient-noise-removal-content--2-3",
       "original": "The duration of new phones ˆlmis is sampled given lctx and ˆy, and the new duration ˆl = ˆlmis + lctx.",
       "zh": "以 lctx 和 ŷ 为条件采样新音素的时长 l̂mis，得到新时长 l̂ = l̂mis + lctx。"
      },
      {
       "id": "s-transient-noise-removal-content--2-4",
       "original": "The new frame-level transcript is constructed with ˆz = rep(ˆy, ˆl).",
       "zh": "新的帧级转写由 ẑ = rep(ŷ, l̂) 构造。"
      },
      {
       "id": "s-transient-noise-removal-content--2-5",
       "original": "Similarly, the audio context xctx is of the same length as ˆz, and is created by filling frames mapped to unreplaced phones with the corresponding frames in x, and leaving those for new phones with 0.",
       "zh": "类似地，音频上下文 xctx 与 ẑ 等长：映射到未替换音素的帧用 x 中对应的帧填充，新音素对应的帧则留 0。"
      },
      {
       "id": "s-transient-noise-removal-content--2-6",
       "original": "The frames for the new phones ˆxmis are sampled given ˆz and xctx.",
       "zh": "以 ẑ 和 xctx 为条件采样新音素对应的帧 x̂mis。"
      },
      {
       "id": "s-transient-noise-removal-content--2-7",
       "original": "The edited speech is computed as ˆx = ˆxmis + xctx.",
       "zh": "编辑后的语音为 x̂ = x̂mis + xctx。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-diverse-speech-sampling-alignmen",
   "num": null,
   "level": 2,
   "page": 8,
   "title": {
    "original": "Diverse speech sampling & alignment-preserved style shuffling",
    "zh": "多样化语音采样与保持对齐的风格打乱"
   },
   "blocks": [
    {
     "id": "p-diverse-speech-sampling-alignmen-1",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-diverse-speech-sampling-alignmen-1-1",
       "original": "Voicebox can generate diverse speech samples by infilling the whole utterance.",
       "zh": "Voicebox 可以通过填充整条语句来生成多样化的语音样本。"
      },
      {
       "id": "s-diverse-speech-sampling-alignmen-1-2",
       "original": "We first use the duration model to sample ˆl given the phone transcript ˆy.",
       "zh": "我们首先用时长模型以音素转写 ŷ 为条件采样时长 l̂。"
      },
      {
       "id": "s-diverse-speech-sampling-alignmen-1-3",
       "original": "We then use the audio model to sample ˆx given ˆz = rep(ˆy, ˆl).",
       "zh": "然后用音频模型以 ẑ = rep(ŷ, l̂) 为条件采样语音 x̂。"
      }
     ]
    },
    {
     "id": "p-diverse-speech-sampling-alignmen-2",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-diverse-speech-sampling-alignmen-2-1",
       "original": "Similar to style transfer, Voicebox can also shuffle the audio style while keeping the alignment by sampling ˆx conditioning on the frame-level transcript ¯z of the target speech clip ¯x.",
       "zh": "与风格迁移类似，Voicebox 也可以在保持对齐的前提下打乱音频风格：以目标语音片段 x̄ 的帧级转写 z̄ 为条件采样 x̂。"
      }
     ]
    },
    {
     "id": "p-diverse-speech-sampling-alignmen-3",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-diverse-speech-sampling-alignmen-3-1",
       "original": "5Note that the computation is doubled for the same NFE when using CFG, because each evaluation of ˜vt requires two forward passes of the model vt.",
       "zh": "（脚注 5）注意使用 CFG 时，相同 NFE 下计算量翻倍，因为每次评估 ṽt 都需要模型 vt 做两次前向。"
      }
     ]
    },
    {
     "id": "p-diverse-speech-sampling-alignmen-4",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-diverse-speech-sampling-alignmen-4-1",
       "original": "[8   3  2  2 1  0   4 5  1 1 10 ]",
       "zh": "（图内数字）[8 3 2 2 1 0 4 5 1 1 10]"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-diverse-sampling",
   "num": null,
   "level": 2,
   "page": 9,
   "title": {
    "original": "Diverse sampling",
    "zh": "多样化采样（示意图）"
   },
   "blocks": [
    {
     "id": "p-diverse-sampling-1",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-diverse-sampling-1-1",
       "original": "Duration phonemize model Audio model upsample [SIL HH AH L OW SIL W ER L D SIL] “Hello world” [SIL*8 HH*3 … D*1 SIL*10] [0   0  0  0 0  0   0 0  0 0 0  ] [8   3  2  2 1  7   1 5  2 10 ]",
       "zh": "（图内文字）时长模型 音素化 音频模型 上采样 [SIL HH AH L OW SIL W ER L D SIL] “Hello world” [SIL*8 HH*3 … D*1 SIL*10] [0 0 0 0 0 0 0 0 0 0 0] [8 3 2 2 1 7 1 5 2 10]"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-editing-infilling",
   "num": null,
   "level": 2,
   "page": 9,
   "title": {
    "original": "Editing / infilling",
    "zh": "编辑／填充（示意图）"
   },
   "blocks": [
    {
     "id": "p-editing-infilling-1",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-editing-infilling-1-1",
       "original": "Duration Forced-align & model Replace Audio model upsample [SIL HH AH L OW SIL T AA M SIL] “Hello world” → “Hello tom” [SIL*8 … AA*5 M*2 SIL*10] [8   3  2  2 1  7   0 0  0 10 ] (audio of “Hello world”)",
       "zh": "（图内文字）时长模型 强制对齐与替换 音频模型 上采样 [SIL HH AH L OW SIL T AA M SIL] “Hello world” → “Hello tom” [SIL*8 … AA*5 M*2 SIL*10] [8 3 2 2 1 7 0 0 0 10]（“Hello world” 的音频）"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-style-transfer",
   "num": null,
   "level": 2,
   "page": 9,
   "title": {
    "original": "Style transfer",
    "zh": "风格迁移（示意图）"
   },
   "blocks": [
    {
     "id": "p-style-transfer-1",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-style-transfer-1-1",
       "original": "“world” segment removed, insert 8 frames of mask (predicted duration of “tom”) [8   3  … 1 1 10  2  4  0   1 5  1 3 4  ] Duration Forced-align model Audio model upsample [SIL HH … L D SIL HH EY SIL F OW K S SIL] “Hello world” [SIL*8 … K*3 S*3 SIL*4] [8   3  … 1 1 10  0  0  0   0 0  0 0 0  ] (audio of “Hello world”) mask whose length is (audio of “Hello world”) the sum of predicted duration for “Hey folks” “Hey folks” phonemize",
       "zh": "（图内文字）“world” 片段被移除，插入 8 帧掩蔽（“tom” 的预测时长）[8 3 … 1 1 10 2 4 0 1 5 1 3 4] 时长模型 强制对齐 音频模型 上采样 [SIL HH … L D SIL HH EY SIL F OW K S SIL] “Hello world” [SIL*8 … K*3 S*3 SIL*4] [8 3 … 1 1 10 0 0 0 0 0 0 0 0]（“Hello world” 的音频）长度等于 “Hey folks” 预测时长之和的掩蔽（“Hello world” 的音频）“Hey folks” 音素化"
      }
     ]
    },
    {
     "id": "fig-style-transfer-1",
     "type": "figure_caption",
     "page": 9,
     "original": "Figure 4: Detailed diagrams of diverse speech sampling, content editing, and style transfer. Text in red and blocks in orange at the input of a model denote segments to be predicted. Numbers in blue and spectrogram in cyan at the model output denote predicted duration and spectrogram.",
     "zh": "图 4：多样化语音采样、内容编辑和风格迁移的详细示意图。模型输入处的红色文字与橙色块表示待预测的片段；模型输出处的蓝色数字与青色频谱图表示预测的时长与频谱图。"
    }
   ]
  },
  {
   "id": "sec-4",
   "num": "4",
   "level": 1,
   "page": 9,
   "title": {
    "original": "Metrics",
    "zh": "4 评价指标"
   },
   "blocks": [
    {
     "id": "p-4-1",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-4-1-1",
       "original": "Voicebox formulates many speech generation tasks as text-guided in-context learning problems.",
       "zh": "Voicebox 将许多语音生成任务统一表述为文本引导的上下文学习问题。"
      },
      {
       "id": "s-4-1-2",
       "original": "The common goal of audio-conditioned tasks is to produce realistic speech that is coherent with the context and has the correct textual content.",
       "zh": "以音频为条件的任务，其共同目标是生成真实的语音，使之与上下文连贯且文本内容正确。"
      },
      {
       "id": "s-4-1-3",
       "original": "For tasks not conditioned on audio context, it is desired to generate diverse and realistic samples with distribution similar to training data with correct content.",
       "zh": "对于不以音频上下文为条件的任务，则希望生成多样且真实的样本，其分布与训练数据相似且内容正确。"
      }
     ]
    },
    {
     "id": "p-4-2",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-4-2-1",
       "original": "Prior studies often adopt subjective metrics like mean opinion scores (MOS) [Ribeiro et al., 2011] which are not comparable across papers or even across studies in the same paper, because ratings can be biased by the quality of samples from other systems evaluated in the same trial.",
       "zh": "以往研究常采用平均意见分（MOS）等主观指标 [Ribeiro et al., 2011]，但这类指标在论文之间、甚至同一篇论文的不同实验之间都不可比，因为评分会受到同次评测中其他系统样本质量的干扰。"
      },
      {
       "id": "s-4-2-2",
       "original": "Some studies have also considered automatic quantitative metrics measuring signal-level similarity, such as mean cepstral distance (MCD) [Kubichek, 1993, Skerry-Ryan et al., 2018] for speech synthesis and voice conversion, and signal-to-noise/distortion ratio (SNR/SDR) [Le Roux et al., 2019] for speech enhancement.",
       "zh": "也有研究采用衡量信号层面相似度的自动化定量指标，例如用于语音合成与语音转换的平均倒谱距离（MCD）[Kubichek, 1993, Skerry-Ryan et al., 2018]，以及用于语音增强的信噪比／信失真比（SNR/SDR）[Le Roux et al., 2019]。"
      },
      {
       "id": "s-4-2-3",
       "original": "These metrics assume the output is deterministic given input, which is often ill-posed and unfairly penalizes generative models that produce realistic and valid samples.",
       "zh": "这些指标假设给定输入后输出是确定的，这一假设往往本身就不成立，并且会不公平地惩罚那些生成真实且合理样本的生成模型。"
      },
      {
       "id": "s-4-2-4",
       "original": "The caveats of signal level metrics have also been discussed in image generative modeling literature [Saharia et al., 2022].",
       "zh": "信号层面指标的缺陷在图像生成建模文献中也有讨论 [Saharia et al., 2022]。"
      },
      {
       "id": "s-4-2-5",
       "original": "In this paper, we advocate the following reproducible model-based perceptual metrics.",
       "zh": "本文提倡使用以下可复现的、基于模型的感知指标。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-correctness-and-intelligibility",
   "num": null,
   "level": 2,
   "page": 10,
   "title": {
    "original": "Correctness and intelligibility",
    "zh": "正确性与可懂度"
   },
   "blocks": [
    {
     "id": "p-correctness-and-intelligibility-1",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-correctness-and-intelligibility-1-1",
       "original": "This can be measured by the word error rate (WER) of the synthesized speech’s transcription with respect to the input text, which has been adopted in prior work [Wang et al., 2018].",
       "zh": "这可以通过合成语音转写结果相对于输入文本的词错误率（WER）来衡量，以往工作也采用过这一做法 [Wang et al., 2018]。"
      },
      {
       "id": "s-correctness-and-intelligibility-1-2",
       "original": "Public automatic speech recognition (ASR) models are used for comparability.",
       "zh": "为保证可比性，使用公开的自动语音识别（ASR）模型。"
      },
      {
       "id": "s-correctness-and-intelligibility-1-3",
       "original": "For English-only setups, we follow [Wang et al., 2023] and use HuBERT-L [Hsu et al., 2021] pre-trained on 60K hours of Librilight [Kahn et al., 2019] and fine-tuned on 960 hours of Librispeech [Panayotov et al., 2015].",
       "zh": "在纯英语设置下，我们遵循 [Wang et al., 2023]，使用在 60K 小时 Librilight [Kahn et al., 2019] 上预训练、并在 960 小时 Librispeech [Panayotov et al., 2015] 上微调的 HuBERT-L [Hsu et al., 2021]。"
      },
      {
       "id": "s-correctness-and-intelligibility-1-4",
       "original": "For multilingual setups we use the Whisper large-v2 model [Radford et al., 2022].",
       "zh": "在多语言设置下，我们使用 Whisper large-v2 模型 [Radford et al., 2022]。"
      }
     ]
    },
    {
     "id": "p-correctness-and-intelligibility-2",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-correctness-and-intelligibility-2-1",
       "original": "It should be noted that while a lower WER suggests that the generated speech is more intelligible by the model and contains more correct content, it does not necessarily imply the quality is better.",
       "zh": "需要注意的是，更低的 WER 虽然说明生成语音对模型而言更可懂、内容更正确，但并不一定意味着质量更好。"
      },
      {
       "id": "s-correctness-and-intelligibility-2-2",
       "original": "Similarly, when generating diverse samples or when transferring to an audio style that is more expressive or more noisy, generated speech can be harder for an ASR model to recognize, which leads to a higher WER, which does not imply the sample is bad.",
       "zh": "类似地，在生成多样化样本、或将语音迁移到更具表现力或更嘈杂的音频风格时，生成语音对 ASR 模型而言更难识别，从而导致更高的 WER，这并不意味着样本差。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-coherence",
   "num": null,
   "level": 2,
   "page": 10,
   "title": {
    "original": "Coherence",
    "zh": "连贯性"
   },
   "blocks": [
    {
     "id": "p-coherence-1",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-coherence-1-1",
       "original": "This is measured by the similarity between the embedding of generated speech and that of the audio context, where different embedding models would reflect coherence of different attributes.",
       "zh": "连贯性通过生成语音的嵌入与音频上下文的嵌入之间的相似度来衡量，不同的嵌入模型反映不同属性的连贯性。"
      },
      {
       "id": "s-coherence-1-2",
       "original": "VALL-E proposed to use WavLM-TDCNN speaker embedding model [Chen et al., 2022], which maps an audio clip to a fixed dimensional vector, to measure voice similarity.",
       "zh": "VALL-E 提出使用 WavLM-TDCNN 说话人嵌入模型 [Chen et al., 2022]（将音频片段映射为定长向量）来衡量音色相似度。"
      },
      {
       "id": "s-coherence-1-3",
       "original": "We consider the same model to compare with VALL-E.",
       "zh": "为与 VALL-E 对比，我们采用同一模型。"
      },
      {
       "id": "s-coherence-1-4",
       "original": "In particular, VALL-E reports similarity with respect to resynthesized audio context by its vocoder (Encodec-decoder), which we call SIM-resyn (SIM- r).",
       "zh": "具体而言，VALL-E 报告的是相对于其声码器（Encodec 解码器）重合成音频上下文的相似度，我们称之为 SIM-resyn（SIM-r）。"
      },
      {
       "id": "s-coherence-1-5",
       "original": "SIM-resyn is not comparable across models using different vocoders.",
       "zh": "SIM-resyn 在使用不同声码器的模型之间不可比。"
      },
      {
       "id": "s-coherence-1-6",
       "original": "Hence, we advocate for computing similarity against the original audio context, which we call SIM-orig (SIM-o).",
       "zh": "因此，我们提倡相对于原始音频上下文计算相似度，称之为 SIM-orig（SIM-o）。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-diversity-and-quality",
   "num": null,
   "level": 2,
   "page": 10,
   "title": {
    "original": "Diversity and quality",
    "zh": "多样性与质量"
   },
   "blocks": [
    {
     "id": "p-diversity-and-quality-1",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-diversity-and-quality-1-1",
       "original": "Fréchet Inception Score (FID) [Heusel et al., 2017] is widely adopted for image generation evaluations, which captures the similarity between generated and real images at the distribution level in some feature space.",
       "zh": "Fréchet Inception Score（FID）[Heusel et al., 2017] 被广泛用于图像生成评估，它在某个特征空间中捕捉生成图像与真实图像在分布层面的相似度。"
      },
      {
       "id": "s-diversity-and-quality-1-2",
       "original": "It fits a Gaussian distribution for real samples and one for generated samples in some feature space, and compute the Fréchet distance between the two.",
       "zh": "它在某特征空间中分别为真实样本与生成样本拟合一个高斯分布，并计算两者之间的 Fréchet 距离。"
      },
      {
       "id": "s-diversity-and-quality-1-3",
       "original": "A shorter distance implies the distributions are more similar and generally reflects both higher sample quality and diversity.",
       "zh": "距离越短意味着分布越相似，通常同时反映更高的样本质量与多样性。"
      },
      {
       "id": "s-diversity-and-quality-1-4",
       "original": "We adapt the metric for speech by using self-supervised wav2vec 2.0 features [Baevski et al., 2020] and refer to it as Fréchet Speech Distance (FSD).",
       "zh": "我们将该指标改造用于语音：采用自监督的 wav2vec 2.0 特征 [Baevski et al., 2020]，并称之为 Fréchet 语音距离（FSD）。"
      },
      {
       "id": "s-diversity-and-quality-1-5",
       "original": "We verify its effectiveness in Appendix C.1 along with alternative features.",
       "zh": "我们在附录 C.1 中验证了它的有效性，并比较了备选特征。"
      }
     ]
    },
    {
     "id": "p-diversity-and-quality-2",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-diversity-and-quality-2-1",
       "original": "As supplementary metrics, we include quality MOS (QMOS) for subjective audio quality evaluation, and similarity MOS (SMOS) for subjective audio similarity evaluation given pairs of prompt and system-generated audio clips.",
       "zh": "作为补充指标，我们报告用于主观音质评估的质量 MOS（QMOS），以及在给定提示音频与系统生成音频对的条件下用于主观相似度评估的相似度 MOS（SMOS）。"
      },
      {
       "id": "s-diversity-and-quality-2-2",
       "original": "Both of which are in the scale of 1 to 5 with 5 being the best. 50 samples are evaluated for each system and 10 ratings are collected for each sample.",
       "zh": "两者均采用 1 到 5 分制，5 分为最佳。每个系统评估 50 个样本，每个样本收集 10 份评分。"
      },
      {
       "id": "s-diversity-and-quality-2-3",
       "original": "Averaged ratings along with 95% confidence interval are reported.",
       "zh": "报告平均评分及 95% 置信区间。"
      },
      {
       "id": "s-diversity-and-quality-2-4",
       "original": "For that, the CrowdMOS Ribeiro et al. [2011] package was used with the recommended recipes for filtering outliers and inaccurate ratings.",
       "zh": "为此使用了 CrowdMOS Ribeiro et al. [2011] 工具包，并按其推荐方案过滤离群与不准确的评分。"
      },
      {
       "id": "s-diversity-and-quality-2-5",
       "original": "The MOS instructions can be found in Appendix C.5.",
       "zh": "MOS 评分说明见附录 C.5。"
      }
     ]
    },
    {
     "id": "p-diversity-and-quality-3",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-diversity-and-quality-3-1",
       "original": "To evaluate duration models, one can continue using the aforementioned metrics to gauge the end-toend performance.",
       "zh": "评估时长模型时，可以继续用上述指标衡量端到端性能。"
      },
      {
       "id": "s-diversity-and-quality-3-2",
       "original": "Alternatively, we also present a few standalone metrics focusing on the duration model.",
       "zh": "此外，我们也提出几项专门针对时长模型的独立指标。"
      },
      {
       "id": "s-diversity-and-quality-3-3",
       "original": "Descriptions and results can be found in Appendices C.2 to C.4.",
       "zh": "相关描述与结果见附录 C.2 至 C.4。"
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
    "original": "Experiment",
    "zh": "5 实验"
   },
   "blocks": []
  },
  {
   "id": "sec-5-1",
   "num": "5.1",
   "level": 2,
   "page": 10,
   "title": {
    "original": "Setup Data",
    "zh": "5.1 实验设置：数据"
   },
   "blocks": [
    {
     "id": "p-5-1-1",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-5-1-1-1",
       "original": "We train the English-only model on 60K hours ASR-transcribed English audiobooks and the multilingual model on 50K hours of multilingual audiobooks from six languages: English (En), French (Fr), German (De), Spanish (Es), Polish (Pl) and Portuguese (Pt).",
       "zh": "我们在 60K 小时经 ASR 转写的英语有声书上训练纯英语模型，在 50K 小时涵盖六种语言的多语言有声书上训练多语言模型：英语（En）、法语（Fr）、德语（De）、西班牙语（Es）、波兰语（Pl）和葡萄牙语（Pt）。"
      },
      {
       "id": "s-5-1-1-2",
       "original": "Following [Babu et al., 2022], for a given upsampling factor β, we upsample low resource languages to mimic sampling batches from a multinomial distribution ps ∼ ns N β s=1,...,S where S is the total number of languages, ns the number of pretraining hours of language s, and N the total number of hours.",
       "zh": "遵循 [Babu et al., 2022]，给定上采样因子 β，我们对低资源语言进行上采样，使采样批次近似服从多项分布 ps ∼ ns^β/N（s=1,...,S），其中 S 为语言总数，ns 为语言 s 的预训练小时数，N 为总小时数。"
      },
      {
       "id": "s-5-1-1-3",
       "original": "We set β = 0.25.",
       "zh": "我们设 β = 0.25。"
      }
     ]
    },
    {
     "id": "p-5-1-2",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-5-1-2-1",
       "original": "The two models are abbreviated as VB-En and VB-Multi.",
       "zh": "两个模型分别简记为 VB-En 和 VB-Multi。"
      }
     ]
    },
    {
     "id": "p-5-1-3",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-5-1-3-1",
       "original": "The Montreal Forced Aligner (MFA) [McAuliffe et al., 2017] is used to phonemize and force align the transcript based on the MFA phone set, which is a modified version of the international phonetic alphabet (IPA).",
       "zh": "使用 Montreal 强制对齐器（MFA）[McAuliffe et al., 2017] 基于 MFA 音素集（国际音标 IPA 的修改版）对转写文本进行音素化和强制对齐。"
      },
      {
       "id": "s-5-1-3-2",
       "original": "Word position postfixes are added.",
       "zh": "并添加词内位置后缀。"
      },
      {
       "id": "s-5-1-3-3",
       "original": "Audio is represented as a 80-dimensional log Mel spectrogram and a HiFi-GAN vocoder trained on the same 60K hours of English speech is used to generate waveform.",
       "zh": "音频表示为 80 维对数 Mel 频谱图，并使用在相同 60K 小时英语语音上训练的 HiFi-GAN 声码器生成波形。"
      },
      {
       "id": "s-5-1-3-4",
       "original": "More details about phone representation, data transformation, and vocoder can be found in Appendices A.1 to A.3.",
       "zh": "关于音素表示、数据变换和声码器的更多细节见附录 A.1 至 A.3。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-model",
   "num": null,
   "level": 2,
   "page": 11,
   "title": {
    "original": "Model",
    "zh": "模型"
   },
   "blocks": [
    {
     "id": "p-model-1",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-model-1-1",
       "original": "Transformer [Vaswani et al., 2017] with convolutional positional embedding [Baevski et al., 2020] and symmetric bi-directional ALiBi self-attention bias [Press et al., 2021] are used for both the audio and the duration model.",
       "zh": "音频模型与时长模型均采用 Transformer [Vaswani et al., 2017]，并使用卷积位置嵌入 [Baevski et al., 2020] 与对称双向 ALiBi 自注意力偏置 [Press et al., 2021]。"
      },
      {
       "id": "s-model-1-2",
       "original": "ALiBi bias for the flow step xt is set to 0.",
       "zh": "流步骤 xt 对应的 ALiBi 偏置设为 0。"
      },
      {
       "id": "s-model-1-3",
       "original": "More details in Appendix A.6.",
       "zh": "更多细节见附录 A.6。"
      },
      {
       "id": "s-model-1-4",
       "original": "The audio model has 24 layers, 16 attention heads, 1024/4096 embedding/feed-forward network (FFN) dimension, 330M parameters.",
       "zh": "音频模型有 24 层、16 个注意力头，嵌入／前馈网络（FFN）维度为 1024/4096，共 330M 参数。"
      },
      {
       "id": "s-model-1-5",
       "original": "We add skip connections connecting symmetric layers (first layer to last layer, second layer to second-to-last layer, etc.) in the style of the UNet architecture.",
       "zh": "我们按 UNet 架构的风格，在对称层之间（第一层与最后一层、第二层与倒数第二层，依此类推）添加跳跃连接。"
      },
      {
       "id": "s-model-1-6",
       "original": "States are concatenated channel-wise and then combined using a linear layer.",
       "zh": "各状态在通道维上拼接，再经线性层融合。"
      },
      {
       "id": "s-model-1-7",
       "original": "The duration model has 8 heads, 512/2048 embedding/FFN dimensions, with 8/10 layers for English/multilingual setup (28M/34M parameters in total).",
       "zh": "时长模型有 8 个头，嵌入／FFN 维度为 512/2048，英语／多语言设置分别为 8/10 层（总计 28M/34M 参数）。"
      },
      {
       "id": "s-model-1-8",
       "original": "All models are trained in FP16.",
       "zh": "所有模型均以 FP16 训练。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-training",
   "num": null,
   "level": 2,
   "page": 11,
   "title": {
    "original": "Training",
    "zh": "训练"
   },
   "blocks": [
    {
     "id": "p-training-1",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-training-1-1",
       "original": "VB-En/VB-Multi audio models are trained for 500K/750K updates with an effective batch size of 240K frames.",
       "zh": "VB-En／VB-Multi 的音频模型分别训练 500K/750K 次更新，有效批大小为 240K 帧。"
      },
      {
       "id": "s-training-1-2",
       "original": "For training efficiency, audio length is capped at 1,600 frames and chunked randomly if the length exceeds this threshold.",
       "zh": "为训练效率，音频长度上限为 1,600 帧，超过该阈值则随机切块。"
      },
      {
       "id": "s-training-1-3",
       "original": "Duration models are trained for 600K updates with an effective batch size of 60K frames.",
       "zh": "时长模型训练 600K 次更新，有效批大小为 60K 帧。"
      },
      {
       "id": "s-training-1-4",
       "original": "The Adam [Kingma and Ba, 2014] optimizer is used with a peak learning rate of 1e-4, linearly warmed up for 5K steps and linearly decays over the rest of training.",
       "zh": "使用 Adam [Kingma and Ba, 2014] 优化器，峰值学习率 1e-4，线性预热 5K 步，随后在剩余训练过程中线性衰减。"
      },
      {
       "id": "s-training-1-5",
       "original": "For audio models, we clip the gradient norm to 0.2 for training stability.",
       "zh": "对音频模型，我们将梯度范数裁剪到 0.2 以保证训练稳定性。"
      },
      {
       "id": "s-training-1-6",
       "original": "The audio/duration sequence is masked with pdrop = 0.3/0.2, and otherwise a segment of r% sequence length is masked, where r ∼U[70, 100]/U[10, 100]. puncond is set to 0.2 for audio/duration models.",
       "zh": "音频／时长序列以 pdrop = 0.3/0.2 的概率整体丢弃掩蔽，否则掩蔽长度为序列长度 r% 的一段，其中 r ∼U[70, 100]/U[10, 100]；音频／时长模型的 puncond 均设为 0.2。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-inference",
   "num": null,
   "level": 2,
   "page": 11,
   "title": {
    "original": "Inference",
    "zh": "推理"
   },
   "blocks": [
    {
     "id": "p-inference-1",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-inference-1-1",
       "original": "The torchdiffeq [Chen, 2018] package is used, which implements both fixed and adaptive step ODE solvers.",
       "zh": "使用 torchdiffeq [Chen, 2018] 软件包，它同时实现了定步长与自适应步长的 ODE 求解器。"
      },
      {
       "id": "s-inference-1-2",
       "original": "By default, the midpoint solver is used with a step size of 0.0625 (NFE=32).",
       "zh": "默认使用中点求解器，步长 0.0625（NFE=32）。"
      },
      {
       "id": "s-inference-1-3",
       "original": "The regression duration model is used by default.",
       "zh": "默认使用回归时长模型。"
      },
      {
       "id": "s-inference-1-4",
       "original": "Silence at both ends are trimmed to 0.1 second max.",
       "zh": "两端的静音最多裁剪至 0.1 秒。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-baselines",
   "num": null,
   "level": 2,
   "page": 11,
   "title": {
    "original": "Baselines",
    "zh": "基线"
   },
   "blocks": [
    {
     "id": "p-baselines-1",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-baselines-1-1",
       "original": "We consider three baselines: 1) VALL-E [Wang et al., 2023], SOTA for English zero-shot TTS trained on Librilight. 2) YourTTS [Casanova et al., 2021], SOTA multilingual (English, French, and Portuguese) zero-shot TTS model trained on VCTK, LibriTTS, TTS-Portugese [Casanova et al., 2022], and M-AILABS French.",
       "zh": "我们考虑三个基线：1) VALL-E [Wang et al., 2023]，在 Librilight 上训练的英语零样本 TTS 当前最佳模型。2) YourTTS [Casanova et al., 2021]，在 VCTK、LibriTTS、TTS-Portugese [Casanova et al., 2022] 与 M-AILABS French 上训练的多语言（英语、法语、葡萄牙语）零样本 TTS 当前最佳模型。"
      },
      {
       "id": "s-baselines-1-2",
       "original": "It is a flow-based model adapted from VITS [Kim et al., 2021] using a pre-trained multilingual speaker embedder for voice conditioning. 3) A3T [Bai et al., 2022], SOTA for NAR speech editing and infilling trained with a regression loss on VCTK.",
       "zh": "它是基于 VITS [Kim et al., 2021] 改造的流模型，使用预训练的多语言说话人嵌入器进行音色条件化。3) A3T [Bai et al., 2022]，在 VCTK 上以回归损失训练的 NAR 语音编辑与填充当前最佳模型。"
      },
      {
       "id": "s-baselines-1-3",
       "original": "We also consider Demucs [Défossez et al., 2020], a SOTA speech enhancement model trained with regression and adversarial losses for denoising experiments.",
       "zh": "在去噪实验中，我们还考虑 Demucs [Défossez et al., 2020]——一个以回归与对抗损失训练的语音增强当前最佳模型。"
      },
      {
       "id": "s-baselines-1-4",
       "original": "Table 1 summarizes the tasks each baseline is capable of solving.",
       "zh": "表 1 总结了各基线能够解决的任务。"
      }
     ]
    },
    {
     "id": "tab-baselines-1",
     "type": "table_caption",
     "page": 11,
     "original": "Table 1: Comparing Voicebox with baselines on task capabilities. “Sampling” refers to the ability of generating diverse audio clips without conditioning on any audio. Through infilling, A3T and Voicebox can remove transient noise but not stationary background noise. VALL-E can only generate speech conditioning on the past context. Hence, the generated segment would only be coherent to the past context but will not have a smooth transition to the future context. With that, we label VALL-E as incapable of denoising or editing.",
     "zh": "表 1：Voicebox 与各基线在任务能力上的对比。“采样”指不以任何音频为条件生成多样化音频片段的能力。通过填充，A3T 与 Voicebox 可以移除瞬态噪声，但不能移除平稳背景噪声。VALL-E 只能以过去上下文为条件生成语音，因此生成片段只与过去上下文连贯，无法与未来上下文平滑衔接，据此我们将 VALL-E 标记为不具备去噪或编辑能力。"
    }
   ]
  },
  {
   "id": "sec-model-2",
   "num": null,
   "level": 2,
   "page": 11,
   "title": {
    "original": "Model",
    "zh": "模型能力对照（表 1 残留）"
   },
   "blocks": [
    {
     "id": "p-model-2-1",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-model-2-1-1",
       "original": "ZS TTS Denoise Partial Edit Sampling VALL-E ✗ ✗ YourTTS ✗ ✗ A3T ✓(short) ✗ Demucs ✗ ✗ ✗ Voicebox ✓(short)",
       "zh": "（表内文字）模型｜零样本 TTS｜去噪｜部分编辑｜采样：VALL-E ✗ ✗；YourTTS ✗ ✗；A3T ✓（短） ✗；Demucs ✗ ✗ ✗；Voicebox ✓（短）。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-5-2",
   "num": "5.2",
   "level": 2,
   "page": 11,
   "title": {
    "original": "Monolingual zero-shot TTS",
    "zh": "5.2 单语零样本 TTS"
   },
   "blocks": [
    {
     "id": "tab-5-2-1",
     "type": "table_caption",
     "page": 11,
     "original": "Table 2 presents the zero-shot TTS results of the English model VB-En. Following [Wang et al., 2023], the test set is constructed by selecting 4 to 10 second long samples from Librispeech test-clean.",
     "zh": "表 2 给出英语模型 VB-En 的零样本 TTS 结果。遵循 [Wang et al., 2023]，测试集从 Librispeech test-clean 中选取 4 到 10 秒长的样本构建。"
    },
    {
     "id": "p-5-2-1",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-5-2-1-1",
       "original": "We consider cross-sentence prompting where a 3 second clip from another sample of the same speaker is used as audio context, and continuation where the first 3 seconds of each utterance is used.",
       "zh": "我们考虑两种条件方式：跨句提示（cross-sentence prompting）——取同一说话人另一条样本的 3 秒片段作为音频上下文；以及续写（continuation）——取每条语音的前 3 秒。"
      }
     ]
    },
    {
     "id": "p-5-2-2",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-5-2-2-1",
       "original": "We ran subjective MOS studies comparing ground truth, YourTTS, and Voicebox.",
       "zh": "我们开展了主观 MOS 评测，对比真实语音、YourTTS 与 Voicebox。"
      },
      {
       "id": "s-5-2-2-2",
       "original": "A3T is not included because of the bad performance and VALL-E is not included because the model is not available.",
       "zh": "A3T 因性能太差未纳入，VALL-E 因模型不可得未纳入。"
      },
      {
       "id": "s-5-2-2-3",
       "original": "Voicebox outperforms all baselines on all metrics in both cases.",
       "zh": "在两种条件下，Voicebox 在所有指标上都优于全部基线。"
      },
      {
       "id": "s-5-2-2-4",
       "original": "In particular, Voicebox transfers style much more effectively (+0.101/+0.108 SIM-r on cross-sentence/continuation) than VALL-E, and the gap is even bigger when compared against raw audio (+0.141 SIM-o on continuation).",
       "zh": "特别是，Voicebox 的风格迁移远比 VALL-E 有效（跨句／续写上 SIM-r 分别高 +0.101/+0.108），与原始音频对比时差距更大（续写上 SIM-o 高 +0.141）。"
      },
      {
       "id": "s-5-2-2-5",
       "original": "MOS studies also confirm the quality and similarity of Voicebox are subjectively better than YourTTS.",
       "zh": "MOS 评测也证实，Voicebox 的质量与相似度在主观上优于 YourTTS。"
      }
     ]
    },
    {
     "id": "tab-5-2-2",
     "type": "table_caption",
     "page": 12,
     "original": "Table 2: English zero-shot TTS results on filtered LS test-clean. \"-\" results are not available. We obtain VALL-E continuation SIM result through communication with the authors.",
     "zh": "表 2：过滤后 LS test-clean 上的英语零样本 TTS 结果。“-”表示结果不可得。VALL-E 续写 SIM 结果来自与作者的沟通。"
    }
   ]
  },
  {
   "id": "sec-model-3",
   "num": null,
   "level": 2,
   "page": 12,
   "title": {
    "original": "Model",
    "zh": "模型结果（表 2 残留）"
   },
   "blocks": [
    {
     "id": "p-model-3-1",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-model-3-1-1",
       "original": "SIM-r QMOS SMOS Ground truth 2.2 0.754 3.98± 0.14 cross-sentence A3T 63.3 0.046 0.146 YourTTS 7.7 0.337 3.27± 0.13 VALL-E 5.9 0.580 VB-En 1.9 0.662 0.681 3.78± 0.10 continuation A3T 18.7 0.058 0.144 VALL-E 3.8 0.452∗ 0.508 VB-En (α = 0.7) 2.0 0.593 0.616",
       "zh": "（表内数字）SIM-r QMOS SMOS；真实语音 2.2 0.754 3.98±0.14；跨句：A3T 63.3 0.046 0.146，YourTTS 7.7 0.337 3.27±0.13，VALL-E 5.9 0.580，VB-En 1.9 0.662 0.681 3.78±0.10；续写：A3T 18.7 0.058 0.144，VALL-E 3.8 0.452∗ 0.508，VB-En（α = 0.7）2.0 0.593 0.616。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-5-3",
   "num": "5.3",
   "level": 2,
   "page": 12,
   "title": {
    "original": "Cross-lingual zero-shot TTS",
    "zh": "5.3 跨语言零样本 TTS"
   },
   "blocks": [
    {
     "id": "p-5-3-1",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-5-3-1-1",
       "original": "Tables 3 and 4 presents cross-lingual zero-shot TTS results, where the audio context and the target text are in different languages.",
       "zh": "表 3 与表 4 给出跨语言零样本 TTS 结果，其中音频上下文与目标文本属于不同语言。"
      },
      {
       "id": "s-5-3-1-2",
       "original": "Note that VB-Multi is not trained on any sample with multiple languages in an utterance spoken by the same speaker.",
       "zh": "注意，VB-Multi 的训练数据中不存在同一说话人在一条语音内说多种语言的样本。"
      },
      {
       "id": "s-5-3-1-3",
       "original": "The test set is constructed using filtered MLS test split described in Appendix A.4.",
       "zh": "测试集按附录 A.4 所述的过滤后 MLS 测试划分构建。"
      },
      {
       "id": "s-5-3-1-4",
       "original": "For each target text, we sample one 3-second long audio context from each language, which creates 36 language transfer directions in total.",
       "zh": "对每个目标文本，我们从每种语言各采样一段 3 秒音频上下文，共构成 36 个语言迁移方向。"
      }
     ]
    },
    {
     "id": "p-5-3-2",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-5-3-2-1",
       "original": "Voicebox yields better performance than YourTTS everywhere.",
       "zh": "Voicebox 在所有方向上都优于 YourTTS。"
      },
      {
       "id": "s-5-3-2-2",
       "original": "Specifically, on En/Fr/Pt which YourTTS supports, Voicebox obtains 3.1%/5.9%/8.1% lower WERs and 0.136/0.141/0.160 higher similarity averaged across audio context in six languages.",
       "zh": "具体而言，在 YourTTS 支持的 En/Fr/Pt 上，Voicebox 的 WER 分别低 3.1%/5.9%/8.1%，在六种语言的音频上下文上平均相似度分别高 0.136/0.141/0.160。"
      },
      {
       "id": "s-5-3-2-3",
       "original": "The average audio similarity MOS is 0.59 (3.89 vs 3.30) higher for Voicebox and the average quality MOS is 0.27 (3.50 vs. 3.23) higher.",
       "zh": "Voicebox 的平均音频相似度 MOS 高 0.59（3.89 对 3.30），平均质量 MOS 高 0.27（3.50 对 3.23）。"
      }
     ]
    },
    {
     "id": "tab-5-3-1",
     "type": "table_caption",
     "page": 12,
     "original": "Table 3: Multilingual zero-shot TTS results on filtered MLS test sets. GT/YT/VB-Multi refers to ground truth/YourTTS/multilingual Voicebox. “Ref” column shows the audio context language.",
     "zh": "表 3：过滤后 MLS 测试集上的多语言零样本 TTS 结果。GT/YT/VB-Multi 分别指真实语音／YourTTS／多语言 Voicebox。“Ref”列表示音频上下文的语言。"
    },
    {
     "id": "p-5-3-3",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-5-3-3-1",
       "original": "Ref De En Es Fr Pl Pt GT 5.9 0.725 5.0 0.636 4.1 0.729 5.2 0.714 4.9 0.743 5.8 0.725 De 7.3 0.373 11.3 0.361 13.7 0.263 En 7.0 0.403 11.4 0.298 14.1 0.234 Es 7.6 0.327 11.6 0.316 13.5 0.256 Fr 7.6 0.363 10.7 0.459 13.1 0.299 Pl 7.8 0.349 11.8 0.370 15.1 0.308 Pt 7.6 0.322 11.8 0.297 13.6 0.436 YT AVG 7.5 0.356 11.4 0.350 13.9 0.299 De 4.8 0.632 4.8 0.522 3.6 0.442 5.3 0.489 5.5 0.449 5.4 0.420 En 5.9 0.435 4.2 0.535 4.1 0.423 6.8 0.423 8.3 0.402 7.6 0.385 Es 4.9 0.460 4.3 0.479 3.6 0.613 5.3 0.473 5.2 0.436 5.4 0.435 Fr 4.9 0.476 4.3 0.485 3.7 0.479 5.1 0.602 4.8 0.408 5.4 0.418 Pl 4.7 0.491 3.8 0.503 3.5 0.528 5.1 0.503 4.0 0.641 4.9 0.476 Pt 4.9 0.422 4.6 0.426 3.7 0.476 5.5 0.453 4.8 0.406 5.2 0.620 VB-Multi (α = 1.0) AVG 5.0 0.486 4.4 0.492 3.7 0.494 5.5 0.491 5.5 0.457 5.7 0.459",
       "zh": "（表内数字）参考语言 Ref 依次对 De En Es Fr Pl Pt；行 GT：5.9 0.725，5.0 0.636，4.1 0.729，5.2 0.714，4.9 0.743，5.8 0.725。YourTTS（YT）：De 7.3 0.373，11.3 0.361，13.7 0.263；En 7.0 0.403，11.4 0.298，14.1 0.234；Es 7.6 0.327，11.6 0.316，13.5 0.256；Fr 7.6 0.363，10.7 0.459，13.1 0.299；Pl 7.8 0.349，11.8 0.370，15.1 0.308；Pt 7.6 0.322，11.8 0.297，13.6 0.436；YT 平均（AVG）7.5 0.356，11.4 0.350，13.9 0.299。VB-Multi（α = 1.0）：De 4.8 0.632，4.8 0.522，3.6 0.442，5.3 0.489，5.5 0.449，5.4 0.420；En 5.9 0.435，4.2 0.535，4.1 0.423，6.8 0.423，8.3 0.402，7.6 0.385；Es 4.9 0.460，4.3 0.479，3.6 0.613，5.3 0.473，5.2 0.436，5.4 0.435；Fr 4.9 0.476，4.3 0.485，3.7 0.479，5.1 0.602，4.8 0.408，5.4 0.418；Pl 4.7 0.491，3.8 0.503，3.5 0.528，5.1 0.503，4.0 0.641，4.9 0.476；Pt 4.9 0.422，4.6 0.426，3.7 0.476，5.5 0.453，4.8 0.406，5.2 0.620；VB-Multi 平均 5.0 0.486，4.4 0.492，3.7 0.494，5.5 0.491，5.5 0.457，5.7 0.459。"
      }
     ]
    },
    {
     "id": "tab-5-3-2",
     "type": "table_caption",
     "page": 13,
     "original": "Table 4: Multilingual zero-shot TTS SMOS/QMOS results on filtered MLS English test set with prompts in different languages. YT/VB-Multi refers to YourTTS/multilingual Voicebox. “Ref” shows the audio context language.",
     "zh": "表 4：过滤后 MLS 英语测试集上、提示为不同语言时的多语言零样本 TTS SMOS/QMOS 结果。YT/VB-Multi 指 YourTTS／多语言 Voicebox，“Ref”表示音频上下文语言。"
    },
    {
     "id": "p-5-3-4",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-5-3-4-1",
       "original": "Ref=De Ref=En Ref=Es Ref=Fr Ref=Pl Ref=Pt SMOS (target text = En) YT VB-Multi (α = 1.0) QMOS (target text = En) YT VB-Multi (α = 1.0)",
       "zh": "（表内文字）Ref=De Ref=En Ref=Es Ref=Fr Ref=Pl Ref=Pt；SMOS（目标文本 = En）：YT 对 VB-Multi（α = 1.0）；QMOS（目标文本 = En）：YT 对 VB-Multi（α = 1.0）。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-5-4",
   "num": "5.4",
   "level": 2,
   "page": 13,
   "title": {
    "original": "Transient noise removal",
    "zh": "5.4 瞬态噪声移除"
   },
   "blocks": [
    {
     "id": "p-5-4-1",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-5-4-1-1",
       "original": "We construct a noisy test set by mixing the filtered Librispeech test-clean from Section 5.2 with non-speech noise such that it overlaps with 50% of the duration at a -10dB signal-to-noise ratio.",
       "zh": "我们构造了一个含噪测试集：将 5.2 节过滤后的 Librispeech test-clean 与非语音噪声混合，使噪声与语音 50% 的时长重叠，信噪比为 -10dB。"
      },
      {
       "id": "s-5-4-1-2",
       "original": "Note that for infilling models like A3T and Voicebox, the type and the SNR of transient noise would not affect the performance, because the corrupted segment is entirely masked and speech is re-generated independent of the corrupted segment.",
       "zh": "注意，对 A3T 与 Voicebox 这类填充模型而言，瞬态噪声的类型与信噪比不会影响性能，因为受损片段被整体掩蔽，语音是在独立于受损片段的情况下重新生成的。"
      },
      {
       "id": "s-5-4-1-3",
       "original": "Results of additional conditions can be found in Appendix B.4.",
       "zh": "更多条件下的结果见附录 B.4。"
      }
     ]
    },
    {
     "id": "tab-5-4-1",
     "type": "table_caption",
     "page": 13,
     "original": "Table 5 presents the results comparing Voicebox with A3T and Demucs. It should be noted that A3T and Voicebox utilize transcript and location of the noise while Demucs does not. Nevertheless the goal of the study is to present a new paradigm and show Voicebox can perform denoising without being explicitly trained. Compared to the baselines, Voicebox generates samples that are much more intelligible (2.0% WER), more similar to the clean parts of the audio (0.612 SIM-o), and of higher quality (3.87 MOS) in this challenging noise condition. A3T is better than Demucs on intelligibilty and quality, but the infilled speech is not coherent because it is only trained on VCTK and cannot generalize to new audio styles.",
     "zh": "表 5 给出 Voicebox 与 A3T、Demucs 的对比结果。需要指出，A3T 与 Voicebox 利用了转写文本与噪声位置，而 Demucs 没有。尽管如此，本研究的目的是提出一种新范式，证明 Voicebox 无需显式训练即可去噪。与基线相比，Voicebox 在这一苛刻噪声条件下生成的样本可懂度更高（2.0% WER）、与音频干净部分更相似（0.612 SIM-o）、质量更高（3.87 MOS）。A3T 在可懂度与质量上优于 Demucs，但填充语音不连贯，因为它仅在 VCTK 上训练，无法泛化到新的音频风格。"
    },
    {
     "id": "tab-5-4-2",
     "type": "table_caption",
     "page": 13,
     "original": "Table 5: Transient noise removal where noise overlaps with 50% of the speech at a -10dB SNR.",
     "zh": "表 5：瞬态噪声移除，噪声以 -10dB 信噪比与 50% 的语音重叠。"
    }
   ]
  },
  {
   "id": "sec-model-4",
   "num": null,
   "level": 2,
   "page": 13,
   "title": {
    "original": "Model",
    "zh": "模型结果（表 5 残留）"
   },
   "blocks": [
    {
     "id": "p-model-4-1",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-model-4-1-1",
       "original": "QMOS Clean speech 2.2 0.687 Noisy speech 41.2 0.287 Demucs 32.5 0.368 A3T 11.5 0.148 VB-En (α = 0.7) 2.0 0.612",
       "zh": "（表内数字）QMOS；干净语音 2.2 0.687；含噪语音 41.2 0.287；Demucs 32.5 0.368；A3T 11.5 0.148；VB-En（α = 0.7）2.0 0.612。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-5-5",
   "num": "5.5",
   "level": 2,
   "page": 13,
   "title": {
    "original": "Diverse speech sampling and application to ASR data generation",
    "zh": "5.5 多样化语音采样及其在 ASR 数据生成中的应用"
   },
   "blocks": [
    {
     "id": "tab-5-5-1",
     "type": "table_caption",
     "page": 13,
     "original": "Table 6 compares the ability to generate diverse samples for Librispeech test-other text. We consider English Voicebox (VB-En) with regression (regr) or flow-matching (FM) duration models. VITS- VCTK additionally conditions on a speaker ID, which we randomly sample for each sentence. YourTTS conditions on text and a reference audio, which we draw from the LS train splits.",
     "zh": "表 6 对比了针对 Librispeech test-other 文本生成多样样本的能力。我们考虑带回归（regr）或流匹配（FM）时长模型的英语 Voicebox（VB-En）。VITS-VCTK 额外以说话人 ID 为条件，我们为每句随机采样一个；YourTTS 以文本和一段参考音频为条件，参考音频取自 LS 训练划分。"
    },
    {
     "id": "p-5-5-1",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-5-5-1-1",
       "original": "Qualitatively, A3T generates the same robotic voice when not conditioned on audio context and VITS- LJ generates high quality but a single voice, hence both yield high FSD (bad quality or diversity) but VITS-LJ has a low WER.",
       "zh": "定性来看，A3T 在不以音频上下文为条件时生成同一种机械音；VITS-LJ 质量高但只有单一音色，因此二者 FSD 都很高（质量或多样性差），不过 VITS-LJ 的 WER 很低。"
      },
      {
       "id": "s-5-5-1-2",
       "original": "VITS-VCTK improves the voice diversity and FSD and YourTTS further advances it as it is trained on more speakers.",
       "zh": "VITS-VCTK 改善了音色多样性与 FSD；YourTTS 因训练于更多说话人而更进一步。"
      },
      {
       "id": "s-5-5-1-3",
       "original": "Voicebox models (with different duration samplers) outperform the baseline on FSD by large margins, showing Voicebox’s ability to produce realistic and diverse samples whose distribution is close to the training data.",
       "zh": "采用不同时长采样器的 Voicebox 模型在 FSD 上大幅优于基线，显示出 Voicebox 生成分布接近训练数据的真实且多样样本的能力。"
      },
      {
       "id": "s-5-5-1-4",
       "original": "Among them, the FM duration model creates more varying speaking styles compared to the regression one which ASR may struggle more to recognize.",
       "zh": "其中，FM 时长模型生成的说话风格变化更多，ASR 识别难度相对回归时长模型更大。"
      },
      {
       "id": "s-5-5-1-5",
       "original": "Voicebox even yields lower FSDs than the real samples from the Librispeech test-other split, because the latter contains only tens of speakers and the diversity is limited.",
       "zh": "Voicebox 的 FSD 甚至低于 Librispeech test-other 的真实样本，因为后者只包含数十位说话人，多样性有限。"
      }
     ]
    },
    {
     "id": "p-5-5-2",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-5-5-2-1",
       "original": "We next train an ASR model using only synthetic speech and evaluate it on real speech, which has not been successful before because synthetic data were not realistic and representative enough.",
       "zh": "接下来我们只用合成语音训练 ASR 模型并在真实语音上评测——此前这从未成功过，因为合成数据不够真实、不够有代表性。"
      }
     ]
    },
    {
     "id": "tab-5-5-2",
     "type": "table_caption",
     "page": 14,
     "original": "Table 6: Diverse speech generation from LS test-other text.",
     "zh": "表 6：从 LS test-other 文本生成多样化语音。"
    },
    {
     "id": "p-5-5-3",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-5-5-3-1",
       "original": "Model FSD Ground truth 4.3 171.1 require additional input VITS-VCTK 10.6 306.6 YourTTS (ref=LS train) 9.0 277.9 text-only A3T 37.9 373.0 VITS-LJ 5.6 344.2 VB-En (α = 0, dur=regr) 3.1 155.7 VB-En (α = 0, dur=FM, αdur = 0) 5.6 159.8",
       "zh": "（表内数字）模型 FSD；真实语音 4.3 171.1；需要额外输入：VITS-VCTK 10.6 306.6，YourTTS（参考=LS train）9.0 277.9；仅文本：A3T 37.9 373.0，VITS-LJ 5.6 344.2，VB-En（α = 0，dur=regr）3.1 155.7，VB-En（α = 0，dur=FM，αdur = 0）5.6 159.8。"
      }
     ]
    },
    {
     "id": "tab-5-5-3",
     "type": "table_caption",
     "page": 14,
     "original": "Table 7: Performance of ASR models trained on real or synthetic speech, tested on real speech and decoded with or without a 4-gram language model.",
     "zh": "表 7：在真实语音或合成语音上训练的 ASR 模型性能，测试于真实语音，分别在有／无 4-gram 语言模型下解码。"
    },
    {
     "id": "p-5-5-4",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-5-5-4-1",
       "original": "WER on real data No LM 4-gram LM ASR training data test-c test-o test-c test-o Real audio (100hr) 9.0 21.5 6.1 16.2 Real audio (960hr) 2.6 6.3 2.2 5.0 VITS-LJ 58.0 81.2 51.6 78.1 VITS-VCTK 33.8 55.5 30.2 53.1 YourTTS (ref=LS train) 25.0 54.6 20.4 51.2 VB-En (α = 0, dur=regr) 7.1 17.6 6.5 14.6 VB-En (α = 0, dur=FM, αdur = 0) 3.1 8.3 2.6 6.7",
       "zh": "（表内数字）真实数据上的 WER：无 LM 与 4-gram LM 下 ASR 训练数据在 test-c/test-o 上——真实音频（100hr）9.0 21.5／6.1 16.2；真实音频（960hr）2.6 6.3／2.2 5.0；VITS-LJ 58.0 81.2／51.6 78.1；VITS-VCTK 33.8 55.5／30.2 53.1；YourTTS（ref=LS train）25.0 54.6／20.4 51.2；VB-En（α = 0，dur=regr）7.1 17.6／6.5 14.6；VB-En（α = 0，dur=FM，αdur = 0）3.1 8.3／2.6 6.7。"
      }
     ]
    },
    {
     "id": "tab-5-5-4",
     "type": "table_caption",
     "page": 14,
     "original": "Table 7 compares real and synthetic data from Voicebox and three baseline models. Each TTS model generates one sample per text from the Librispeech training set, resulting in 281K utterances per system. For real data, we consider train-960 and train-clean-100. Details about the ASR model and training configurations are in Appendix A.5.",
     "zh": "表 7 对比了真实数据与来自 Voicebox 及三个基线模型的合成数据。每个 TTS 模型为 Librispeech 训练集中的每段文本生成一条样本，每个系统共 281K 条语音。真实数据取 train-960 与 train-clean-100。ASR 模型与训练配置的细节见附录 A.5。"
    },
    {
     "id": "p-5-5-5",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-5-5-5-1",
       "original": "The results are highly correlated with the FSD scores of synthetic data.",
       "zh": "结果与合成数据的 FSD 分数高度相关。"
      },
      {
       "id": "s-5-5-5-2",
       "original": "VITS-LJ gives the worst results, because the synthetic speech has only one voice.",
       "zh": "VITS-LJ 结果最差，因为合成语音只有一种音色。"
      },
      {
       "id": "s-5-5-5-3",
       "original": "YourTTS performs better on test-clean, but is similar to VITS-VCTK on test-other.",
       "zh": "YourTTS 在 test-clean 上更好，但在 test-other 上与 VITS-VCTK 相当。"
      },
      {
       "id": "s-5-5-5-4",
       "original": "It suggests that while YourTTS is trained on more voices and can generate speech with higher voice diversity, it still fails to produce realistic noisy speech and hence the resulting ASR model still underperforms on test-other.",
       "zh": "这说明 YourTTS 虽然训练于更多音色、能生成音色多样性更高的语音，但仍无法生成真实的带噪语音，因此所得 ASR 模型在 test-other 上依然落后。"
      }
     ]
    },
    {
     "id": "p-5-5-6",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-5-5-6-1",
       "original": "Both Voicebox variants beat the baseline by a large margin.",
       "zh": "两个 Voicebox 变体都大幅超越基线。"
      },
      {
       "id": "s-5-5-6-2",
       "original": "In particular, Voicebox generates more diverse speech when using the FM duration model, which leads to a better ASR system when used for training.",
       "zh": "特别是使用 FM 时长模型时，Voicebox 生成的语音更多样，用于训练能得到更好的 ASR 系统。"
      },
      {
       "id": "s-5-5-6-3",
       "original": "Compared to the baselines, the ASR model trained on Voicebox data with FM duration model reduces WERs by over 85% and only lags behind real data by 0.4% and 1.7% absolute.",
       "zh": "与基线相比，用带 FM 时长模型的 Voicebox 数据训练的 ASR 模型 WER 降低超过 85%，仅比真实数据分别落后 0.4% 和 1.7%（绝对值）。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-5-6",
   "num": "5.6",
   "level": 2,
   "page": 14,
   "title": {
    "original": "Inference efficiency versus performance",
    "zh": "5.6 推理效率与性能的权衡"
   },
   "blocks": [
    {
     "id": "p-5-6-1",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-5-6-1-1",
       "original": "We examine the trade-off between the metrics of interest (WER, SIM, FSD) for different settings of guidance strength (α) and NFE specified by the user. Fig. 5a shows the Voicebox inference time to generate an audio sample of 10 seconds (including vocoding and predicting duration) as NFE varies and compares that to VALL-E.6 For NFE=2 without CFG, Voicebox takes about 0.31 seconds, about 20 times faster than VALL-E.",
       "zh": "我们考察了在用户指定的不同引导强度（α）与 NFE 设置下，所关心指标（WER、SIM、FSD）之间的权衡。图 5a 展示了 Voicebox 生成 10 秒音频（含声码器与时长预测）的推理时间随 NFE 的变化，并与 VALL-E 对比。（脚注 6）在无 CFG、NFE=2 时，Voicebox 约需 0.31 秒，约为 VALL-E 的 20 倍快。"
      },
      {
       "id": "s-5-6-1-2",
       "original": "At NFE=64, Voicebox is only 4% slower than VALL-E.",
       "zh": "在 NFE=64 时，Voicebox 仅比 VALL-E 慢 4%。"
      }
     ]
    },
    {
     "id": "p-5-6-2",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-5-6-2-1",
       "original": "Next, we study the cross-sentence setup of Section 5.2 to analyze the impact on WER and SIM-r.",
       "zh": "接着，我们在 5.2 节的跨句设置下分析对 WER 与 SIM-r 的影响。"
      },
      {
       "id": "s-5-6-2-2",
       "original": "We find that for all settings Voicebox has better WER than VALL-E.",
       "zh": "我们发现在所有设置下 Voicebox 的 WER 都优于 VALL-E。"
      },
      {
       "id": "s-5-6-2-3",
       "original": "WER remains stable with mean of 2.0 and variance of 0.005 as shown in Fig. 5b. Fig. 5c shows that, in the case of SIM-r, lower classifier guidance strength values (α = 0 or 0.3) produce higher speaker similarity when operating in a lower NFE regime (≤4).",
       "zh": "如图 5b 所示，WER 保持稳定，均值 2.0、方差 0.005。图 5c 表明，就 SIM-r 而言，在低 NFE 区间（≤4）内较低的分类器引导强度（α = 0 或 0.3）产生更高的说话人相似度。"
      },
      {
       "id": "s-5-6-2-4",
       "original": "However, starting from NFE=8, a higher classifier guidance strength improves speaker similarity.",
       "zh": "但从 NFE=8 开始，更高的分类器引导强度会提升说话人相似度。"
      }
     ]
    },
    {
     "id": "p-5-6-3",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-5-6-3-1",
       "original": "Finally, in Fig. 5e we examine FSD by generating samples for Librispeech test-other text.",
       "zh": "最后，在图 5e 中我们通过为 Librispeech test-other 文本生成样本来考察 FSD。"
      },
      {
       "id": "s-5-6-3-2",
       "original": "We find that lower classifier guidance strength produces lower FSD scores and more diverse samples.",
       "zh": "我们发现较低的分类器引导强度产生更低的 FSD 和更多样的样本。"
      },
      {
       "id": "s-5-6-3-3",
       "original": "Increasing the NFE for each setting improves FSD. Fig. 5d shows the WER of the same test case.",
       "zh": "提高各设置的 NFE 会改善 FSD。图 5d 给出同一测试的 WER。"
      },
      {
       "id": "s-5-6-3-4",
       "original": "We find that for α = 0, WER increases slightly from 2.8 to 3.1 as NFE goes from 2 to 32.",
       "zh": "我们发现当 α = 0 时，NFE 从 2 增至 32，WER 从 2.8 微升至 3.1。"
      },
      {
       "id": "s-5-6-3-5",
       "original": "For a larger classifier guidance strength, WER remains more stable.",
       "zh": "分类器引导强度较大时，WER 更稳定。"
      },
      {
       "id": "s-5-6-3-6",
       "original": "Through FSD and subjective listening, we discovered that a lower NFE leads to generating less diverse samples especially when the guidance weight is lower (α = 0 or 0.3).",
       "zh": "通过 FSD 与主观试听，我们发现较低的 NFE 会导致样本多样性下降，尤其是引导权重较低（α = 0 或 0.3）时。"
      },
      {
       "id": "s-5-6-3-7",
       "original": "Although those samples are of lower quality, they are easier for the ASR model to recognize because they tend not contain extreme audio styles like whispering or high background noise.",
       "zh": "这些样本虽然质量较低，但更易被 ASR 模型识别，因为它们往往不含耳语或重背景噪声等极端音频风格。"
      },
      {
       "id": "s-5-6-3-8",
       "original": "As a result, WERs are lower.",
       "zh": "因此 WER 更低。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-5-7",
   "num": "5.7",
   "level": 2,
   "page": 14,
   "title": {
    "original": "How context length affects monolingual and cross-lingual zero-shot TTS",
    "zh": "5.7 上下文长度对单语与跨语言零样本 TTS 的影响"
   },
   "blocks": [
    {
     "id": "p-5-7-1",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-5-7-1-1",
       "original": "Monolingual: For in-context zero-shot TTS in Section 5.2, we used 3.0 seconds of prompt audio.",
       "zh": "单语：5.2 节的上下文零样本 TTS 使用 3.0 秒提示音频。"
      },
      {
       "id": "s-5-7-1-2",
       "original": "Here we examine how WER / SIM-r vary with different amounts of prompt audio using duration from regression duration model for the target text.",
       "zh": "这里我们考察目标文本使用回归时长模型的时长时，WER／SIM-r 随提示音频量的变化。"
      },
      {
       "id": "s-5-7-1-3",
       "original": "If the desired prompt is longer than the available 6Re-implemented and confirmed with the authors that our re-implementation is faster (6.2 vs 10 seconds).",
       "zh": "如果所需提示长于可用音频（……（脚注 6）我们重新实现并经作者确认，我们的重实现更快（6.2 秒对 10 秒））（接上）"
      }
     ]
    },
    {
     "id": "p-5-7-2",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-5-7-2-1",
       "original": "Voicebox =0 =0.3 =0.7 VALL-E 6 Inference time (10s audio) 6 5 4 4 20.4X 2 3 2 0.675 0.650 0.625 SIM-r 0.600 0.575 21 22 23 24 25 0 21 22 23 24 25 26 NFE 21 22 23 24 25 NFE NFE (b) NFE vs WER (Zero-shot TTS) (a) NFE vs time (w/o CFG) 3.1 3.0 2.9 21 22 23 24 25 NFE (d) NFE vs WER (Diverse speech sampling) (c) NFE vs SIM-r (Zero-shot TTS) 220 200 FSD 180 160 21 22 23 24 25 NFE (e) NFE vs FSD (Diverse speech sampling)",
       "zh": "（图内文字）Voicebox α=0 α=0.3 α=0.7 VALL-E；推理时间（10 秒音频）6 5 4 4，20.4 倍，2 3 2；3.1 3.0 2.9 26 为（b）子图纵轴刻度之一；SIM-r 0.675 0.650 0.625 0.600 0.575；NFE 21 22 23 24 25 等坐标轴。（b）NFE 对 WER（零样本 TTS）；（a）NFE 对时间（无 CFG）；（d）NFE 对 WER（多样化语音采样）；（c）NFE 对 SIM-r（零样本 TTS）；FSD 220 200 180 160；（e）NFE 对 FSD（多样化语音采样）。"
      }
     ]
    },
    {
     "id": "fig-5-7-1",
     "type": "figure_caption",
     "page": 15,
     "original": "Figure 5: Trade-off between NFE and different metrics. Inference time will be doubled with CFG.",
     "zh": "图 5：NFE 与不同指标之间的权衡。使用 CFG 时推理时间翻倍。"
    },
    {
     "id": "p-5-7-3",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-5-7-3-1",
       "original": "audio, the shorter audio is used as the prompt.",
       "zh": "（接上）则以较短的音频作为提示。"
      },
      {
       "id": "s-5-7-3-2",
       "original": "Results are shown in Figure 6.",
       "zh": "结果见图 6。"
      },
      {
       "id": "s-5-7-3-3",
       "original": "As expected, WER mildly decreases and SIM-r grows quickly and flattens with longer audio prompts.",
       "zh": "符合预期：WER 随提示变长缓慢下降，SIM-r 快速上升后趋平。"
      },
      {
       "id": "s-5-7-3-4",
       "original": "Comparing against VALL-E, Voicebox is more efficient at leveraging an audio prompt, achieving the same speaker similarity as VALL-E with roughly two thirds the input audio.",
       "zh": "与 VALL-E 相比，Voicebox 利用提示音频更高效，只需约三分之二的输入音频即可达到与 VALL-E 相同的说话人相似度。"
      }
     ]
    },
    {
     "id": "p-5-7-4",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-5-7-4-1",
       "original": "6 5 4 3 2 1 2 3 4 5 6 7 8 Seconds (a) WER 0.7 0.6 0.5 SIM-r 0.4 0.3 0.2 1 2 3 4 5 6 7 8 Seconds (b) Speaker Similarity",
       "zh": "（图内文字）（a）WER：6 5 4 3 2 1；秒 2 3 4 5 6 7 8。（b）说话人相似度：SIM-r 0.7 0.6 0.5 0.4 0.3 0.2；秒 1 2 3 4 5 6 7 8。"
      }
     ]
    },
    {
     "id": "fig-5-7-2",
     "type": "figure_caption",
     "page": 15,
     "original": "Figure 6: WER and SIM-r as a function of prompt audio time in seconds for the Zero-shot TTS task 5.2. Audio is generated using classifier-free guidance strength (α) of 0.7 and midpoint ODE solver with a NFE of 32. The blue line is for Voicebox and the red star is VALLE at 3 seconds. The speaker similarity (SIM-r) remains same for longer prompts (up to 10s).",
     "zh": "图 6：零样本 TTS 任务（5.2 节）中 WER 与 SIM-r 随提示音频秒数的变化。音频以分类器自由引导强度（α）0.7、NFE 为 32 的中点 ODE 求解器生成。蓝线为 Voicebox，红色星号为 3 秒处的 VALL-E。更长提示（至 10 秒）时说话人相似度（SIM-r）保持不变。"
    },
    {
     "id": "p-5-7-5",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-5-7-5-1",
       "original": "Cross-lingual: Here we examine the effect of increasing the prompt length for the case of crosslingual zero-shot TTS.",
       "zh": "跨语言：这里我们考察跨语言零样本 TTS 下增加提示长度的影响。"
      },
      {
       "id": "s-5-7-5-2",
       "original": "As described in 5.2, this setting has a total 36 language transfer directions for each pair of source and target language.",
       "zh": "如 5.2 节所述，该设置对每对源语言与目标语言共有 36 个语言迁移方向。"
      },
      {
       "id": "s-5-7-5-3",
       "original": "For each target text in a given transfer setting, we examine how WER / SIM-o7 vary as the prompt length increases.",
       "zh": "对给定迁移设置下的每个目标文本，我们考察 WER／SIM-o 随提示长度增加的变化。（脚注 7）"
      },
      {
       "id": "s-5-7-5-4",
       "original": "Similarly, the regression duration model is used for the target text. Fig. 7 and Fig. 8 plot the SIM-o (speaker similarity) and WER trends respectively.",
       "zh": "同样，目标文本使用回归时长模型。图 7 与图 8 分别绘制了 SIM-o（说话人相似度）与 WER 的趋势。（接上）"
      },
      {
       "id": "s-5-7-5-5",
       "original": "When concatenating the prompt to the target for MLS, we find that the samples are quite a bit longer than what the model was trained on (16s max length), because MLS test set 7Same trend is observed with SIM-r.",
       "zh": "（接上）将提示与目标拼接用于 MLS 时，我们发现样本比模型训练时所见（最长 16 秒）长不少，因为 MLS 测试集（脚注 7：SIM-r 上观察到相同趋势。）"
      },
      {
       "id": "s-5-7-5-6",
       "original": "We present SIM-o to be consistent with Table 3 english french german polish portuguese spanish 0.7 0.6 0.6 0.5 0.5 0.4 0.4 0.3 0.3 0.7 0.6 0.5 0.4 0.3 2 4 6 8 10 2 4 6 8 10 (a) English (b) French 0.7 0.7 0.6 0.6 0.5 0.5 0.4 0.4 0.3 0.3 2 4 6 8 10 (c) Spanish 0.7 0.6 0.5 0.4 0.3 2 4 6 8 10 2 4 6 8 10 2 4 6 8 10 (e) German (d) Portuguese (f) Polish",
       "zh": "（接上）我们报告 SIM-o 以与表 3 保持一致。（图内文字）english french german polish portuguese spanish；0.7 0.6 0.5 0.4 0.3 等坐标轴；2 4 6 8 10；（a）English（b）French（c）Spanish（d）Portuguese（e）German（f）Polish。"
      }
     ]
    },
    {
     "id": "fig-5-7-3",
     "type": "figure_caption",
     "page": 16,
     "original": "Figure 7: Each subplot considers one of the six target language and shows SIM-o (speaker similarity) as a function of prompt audio duration in seconds for cross-lingual style transfer from different source language. We set the classifier-free guidance strength (α) to 1.0 and use midpoint ODE solver with a NFE of 32.",
     "zh": "图 7：每个子图对应六种目标语言之一，展示跨语言风格迁移下 SIM-o（说话人相似度）随提示音频秒数的变化（来自不同源语言）。分类器自由引导强度（α）设为 1.0，使用 NFE 为 32 的中点 ODE 求解器。"
    },
    {
     "id": "p-5-7-6",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-5-7-6-1",
       "original": "samples are in average 15 seconds long.",
       "zh": "（接上）样本平均长 15 秒。"
      },
      {
       "id": "s-5-7-6-2",
       "original": "To alleviate this out of domain issue and focus the study on varying the prompt length, we truncate the target sequences to 4 seconds (at word boundaries).",
       "zh": "为缓解这一域外问题并将研究聚焦于提示长度的变化，我们将目标序列截断为 4 秒（按词边界）。"
      },
      {
       "id": "s-5-7-6-3",
       "original": "We notice that WERs are higher compared to Table 3, likely because the ASR model struggles with incomplete sentences.",
       "zh": "我们注意到 WER 较表 3 更高，可能是因为 ASR 模型难以处理不完整的句子。"
      },
      {
       "id": "s-5-7-6-4",
       "original": "Each subplot contains the trend for one of the target languages from all six source languages.",
       "zh": "每个子图展示一种目标语言在所有六种源语言下的趋势。"
      }
     ]
    },
    {
     "id": "p-5-7-7",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-5-7-7-1",
       "original": "The speaker similarity consistently improves as the prompt length is increased, similar to the monolingual setting.",
       "zh": "说话人相似度随提示变长持续上升，与单语设置类似。"
      },
      {
       "id": "s-5-7-7-2",
       "original": "In contrast, we find that WER increases as we increase the prompt length for most directions.",
       "zh": "相反，我们发现大多数方向上 WER 随提示变长而上升。"
      },
      {
       "id": "s-5-7-7-3",
       "original": "The WER increases much more for En →non-En directions.",
       "zh": "英语→非英语方向的 WER 上升幅度大得多。"
      },
      {
       "id": "s-5-7-7-4",
       "original": "We hypothesize that this is due to training data imbalance across languages, where English accounts for over 90% of the multilingual training data.",
       "zh": "我们推测这源于训练数据的语言不均衡：英语占多语言训练数据的 90% 以上。"
      },
      {
       "id": "s-5-7-7-5",
       "original": "Hence, when transferring from English, the model is more likely to assume that the whole sentence is in English as the prompt length increases and produce incorrect pronunciation for the non-English target.",
       "zh": "因此从英语迁移时，随提示变长，模型更倾向于认为整句都是英语，从而对非英语目标产生错误发音。"
      },
      {
       "id": "s-5-7-7-6",
       "original": "Note that during the training phase, the model was only exposed to audio samples and phonemes originating from a single language.",
       "zh": "注意训练阶段模型只接触过来自单一语言的音频样本与音素。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-5-8",
   "num": "5.8",
   "level": 2,
   "page": 16,
   "title": {
    "original": "Ablation on generative modeling approaches",
    "zh": "5.8 生成建模方法的消融"
   },
   "blocks": [
    {
     "id": "p-5-8-1",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-5-8-1-1",
       "original": "We compare three generative modeling approaches in this section: the proposed flow-matching with the OT path (FM w/ OT), flow-matching with the variance preserving (VP) diffusion path (FM w/ diff), and score-matching with the VP diffusion path (SM w/ diff).",
       "zh": "本节比较三种生成建模方法：本文提出的带最优传输（OT）路径的流匹配（FM w/ OT）、带方差保持（VP）扩散路径的流匹配（FM w/ diff），以及带 VP 扩散路径的得分匹配（SM w/ diff）。"
      },
      {
       "id": "s-5-8-1-2",
       "original": "The last two objectives model the same probability path, but they predict different objects (vector field vs score function).",
       "zh": "后两个目标建模的是同一概率路径，但预测对象不同（向量场对得分函数）。"
      },
      {
       "id": "s-5-8-1-3",
       "original": "A reduced setup described in B.1 with a lowered learning rate (1e-4) and losses on all frames (Eq. (5)) is adopted to ensure convergence for all three objectives.",
       "zh": "为保证三个目标都能收敛，采用附录 B.1 所述的精简设置：学习率降至 1e-4，并对所有帧计算损失（式 (5)）。"
      }
     ]
    },
    {
     "id": "p-5-8-2",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-5-8-2-1",
       "original": "We vary the number of training and inference steps, and evaluate models on the zero-shot TTS task( Section 5.2).",
       "zh": "我们改变训练步数与推理步数，在零样本 TTS 任务（5.2 节）上评估各模型。"
      },
      {
       "id": "s-5-8-2-2",
       "original": "Results in Table 8 shows that FM w/ OT trains significantly faster than the other two objectives, achieving the best performance with 100K training steps, and even outperforms SM w/ diff using only 50K updates.",
       "zh": "表 8 的结果表明 FM w/ OT 的训练明显快于另外两个目标：100K 训练步即取得最佳性能，甚至只用 50K 次更新就超过 SM w/ diff。"
      },
      {
       "id": "s-5-8-2-3",
       "original": "Results in Table 9 shows superior inference efficiency of FM w/ OT, which can produce good results with just 8 NFEs, while FM w/ diff requires at least 16 NFEs and SM w/ diff requires over 64 NFEs.",
       "zh": "表 9 的结果显示 FM w/ OT 的推理效率更高：仅 8 次 NFE 即可产生不错的结果，而 FM w/ diff 至少需要 16 次 NFE，SM w/ diff 需要超过 64 次 NFE。"
      },
      {
       "id": "s-5-8-2-4",
       "original": "Complete results are in Table B4 english french german polish portuguese spanish 40 8.5 30 8.0 7.5 20 7.0 6.5 10 40 30 20 10 2 4 6 8 10 2 4 6 8 10 (a) English (b) French 18 40 16 30 14 12 20 10 10 8 2 4 6 8 10 (c) Spanish 80 60 40 20 2 4 6 8 10 2 4 6 8 10 2 4 6 8 10 (e) German (d) Portuguese (f) Polish",
       "zh": "完整结果见表 B4。（图内文字）english french german polish portuguese spanish；各子图纵轴刻度含 40 30 20 10、8.5 8.0 7.5 7.0 6.5 以及 18 16 14 12、80 60 等与 NFE 2 4 6 8 10 横轴刻度；2 4 6 8 10；（a）English（b）French（c）Spanish（d）Portuguese（e）German（f）Polish。"
      }
     ]
    },
    {
     "id": "fig-5-8-1",
     "type": "figure_caption",
     "page": 17,
     "original": "Figure 8: Each subplot considers one of the six target language and shows WER as a function of prompt audio duration in seconds for cross-lingual style transfer from different source language. We find WER remain reasonably low for all cases except for “English” to “X” style transfer.We set the classifier-free guidance strength (α) to 1.0 and use midpoint ODE solver with a NFE of 32.",
     "zh": "图 8：每个子图对应六种目标语言之一，展示跨语言风格迁移下 WER 随提示音频秒数的变化（来自不同源语言）。我们发现除“英语→X”迁移外，所有情况下 WER 都保持在合理低水平。分类器自由引导强度（α）设为 1.0，使用 NFE 为 32 的中点 ODE 求解器。"
    },
    {
     "id": "tab-5-8-1",
     "type": "table_caption",
     "page": 17,
     "original": "Table 8: Comparing different objectives on training efficiency. 32 NFEs are used for inference. Each model is evaluated on the monolingual zero-shot TTS task.",
     "zh": "表 8：不同目标在训练效率上的对比。推理使用 32 次 NFE。每个模型在单语零样本 TTS 任务上评估。"
    },
    {
     "id": "p-5-8-3",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-5-8-3-1",
       "original": "Method upd=50K upd=100K upd=150K Sim-o Sim-o Sim-o FM w/ OT (proposed) 2.5 0.424 2.2 0.487 2.1 0.508 FM w/ diff 76.0 0.066 3.1 0.344 2.6 0.478 SM w/ diff 73.3 0.062 17.4 0.176 5.1 0.349",
       "zh": "（表内数字）方法 upd=50K／upd=100K／upd=150K（WER 与 SIM-o）：FM w/ OT（本文）2.5 0.424／2.2 0.487／2.1 0.508；FM w/ diff 76.0 0.066／3.1 0.344／2.6 0.478；SM w/ diff 73.3 0.062／17.4 0.176／5.1 0.349。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-6",
   "num": "6",
   "level": 1,
   "page": 17,
   "title": {
    "original": "Ethical Statement",
    "zh": "6 伦理声明"
   },
   "blocks": [
    {
     "id": "p-6-1",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-6-1-1",
       "original": "We recognize the potential risks of a model capable of generating speech in the style of arbitrary people.",
       "zh": "我们认识到，一个能以任意人物风格生成语音的模型存在潜在风险。"
      },
      {
       "id": "s-6-1-2",
       "original": "In an effort to diminish these risks we show that a binary classification model is able to consistently distinguish between real world speech and that which is generated from our model.",
       "zh": "为降低这些风险，我们证明了一个二分类模型能够稳定地区分真实世界语音与本模型生成的语音。"
      }
     ]
    },
    {
     "id": "p-6-2",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-6-2-1",
       "original": "Inspired by [Kharitonov et al., 2023], we train a convolutional binary classification model to distinguish between real and generated speech.",
       "zh": "受 [Kharitonov et al., 2023] 启发，我们训练了一个卷积二分类模型来区分真实语音与生成语音。"
      },
      {
       "id": "s-6-2-2",
       "original": "The model consists of 6 blocks with hidden dimension sizes: [64, 128, 256, 256, 512, 512].",
       "zh": "该模型由 6 个块组成，隐藏维度分别为 [64, 128, 256, 256, 512, 512]。"
      },
      {
       "id": "s-6-2-3",
       "original": "Each block contains a (3 x 1) convolution along the time axis, a (1 x 3) convolution along the frequency axis, followed by a ReLU activation and batch normalization.",
       "zh": "每个块包含一个沿时间轴的 (3 x 1) 卷积、一个沿频率轴的 (1 x 3) 卷积，随后是 ReLU 激活与批归一化。"
      },
      {
       "id": "s-6-2-4",
       "original": "After each block that increases the hidden dimension size we also apply max pooling with a stride of 2 across both the time and frequency dimensions.",
       "zh": "在每个扩大隐藏维度的块之后，还在时间与频率两个维度上施加步长为 2 的最大池化。"
      },
      {
       "id": "s-6-2-5",
       "original": "Finally, global max pooling is applied and a linear layer projects to a single value that is fed into a binary cross entropy loss.",
       "zh": "最后施加全局最大池化，并经线性层投影为单一数值，送入二元交叉熵损失。"
      },
      {
       "id": "s-6-2-6",
       "original": "At inference time we create a sliding window with hop length equal to 250ms and run each chunk of audio through the classifier and average the outputs.",
       "zh": "推理时我们使用步长 250ms 的滑动窗口，将每段音频分别送入分类器并对输出取平均。"
      }
     ]
    },
    {
     "id": "p-6-3",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-6-3-1",
       "original": "The model is tested on the dev-clean split of Librispeech.",
       "zh": "模型在 Librispeech 的 dev-clean 划分上测试。"
      },
      {
       "id": "s-6-3-2",
       "original": "We then take a 100 hour subset of the 60K hour-English data and set aside 2,703 random utterances (to match the size of dev-clean) which is used as a validation split.",
       "zh": "我们从 60K 小时英语数据中抽取 100 小时子集，留出 2,703 条随机语音（与 dev-clean 规模一致）作为验证集。"
      },
      {
       "id": "s-6-3-3",
       "original": "The remaining utterances from the 100 hours subset are used as the ground truth utterances for training.",
       "zh": "100 小时子集中的其余语音用作训练的真实语音。"
      },
      {
       "id": "s-6-3-4",
       "original": "For each split we synthesize audio, conditioned on each utterance of",
       "zh": "对每个划分，我们以该划分中的每条语音为条件合成音频（接上）"
      }
     ]
    },
    {
     "id": "tab-6-1",
     "type": "table_caption",
     "page": 18,
     "original": "Table 9: Comparing different objectives on inference efficiency. All models are trained for 150K updates. Each model is evaluated on the monolingual zero-shot TTS task.",
     "zh": "表 9：不同目标在推理效率上的对比。所有模型训练 150K 次更新，均在单语零样本 TTS 任务上评估。"
    },
    {
     "id": "p-6-4",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-6-4-1",
       "original": "Method NFE=4 NFE=8 NFE=16 NFE=32 Sim-o Sim-o Sim-o Sim-o FM w/ OT (proposed) 2.4 0.410 2.2 0.481 2.2 0.503 2.1 0.508 FM w/ diff 11.5 0.171 3.0 0.359 2.7 0.447 2.6 0.478 SM w/ diff 94.5 0.054 42.3 0.076 11.5 0.218 5.1 0.349 the split by masking out frames in the spectrogram corresponding to 90%, 50%, and 30% of the phonemes of the utterance.",
       "zh": "（表内数字）方法 NFE=4／NFE=8／NFE=16／NFE=32（WER 与 SIM-o）：FM w/ OT（本文）2.4 0.410／2.2 0.481／2.2 0.503／2.1 0.508；FM w/ diff 11.5 0.171／3.0 0.359／2.7 0.447／2.6 0.478；SM w/ diff 94.5 0.054／42.3 0.076／11.5 0.218／5.1 0.349。（接上）合成方式是掩蔽频谱图中对应该语音 90%、50% 和 30% 音素的帧。"
      },
      {
       "id": "s-6-4-2",
       "original": "All samples are generated using classifier-free guidance with w = 0.7, midpoint ODE solver (step size 0.0625 / NFE=64), and the regression duration model.",
       "zh": "所有样本均以 w = 0.7 的分类器自由引导、中点 ODE 求解器（步长 0.0625／NFE=64）以及回归时长模型生成。"
      }
     ]
    },
    {
     "id": "p-6-5",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-6-5-1",
       "original": "We consider two detection tasks.",
       "zh": "我们考虑两个检测任务。"
      },
      {
       "id": "s-6-5-2",
       "original": "The first one is to distinguish between original audio and Voiceboxgenerated audio.",
       "zh": "第一个是区分原始音频与 Voicebox 生成的音频。"
      },
      {
       "id": "s-6-5-3",
       "original": "The second one is to distinguish resynthesized audio and Voicebox-generated audio.",
       "zh": "第二个是区分重合成音频与 Voicebox 生成的音频。"
      },
      {
       "id": "s-6-5-4",
       "original": "The resynthesized audio is created by extracting the Mel Spectrogram from original audio and then vocoding it with the HiFi-GAN vocoder.",
       "zh": "重合成音频的构造方式是：从原始音频提取 Mel 频谱图，再用 HiFi-GAN 声码器合成波形。"
      }
     ]
    },
    {
     "id": "tab-6-2",
     "type": "table_caption",
     "page": 18,
     "original": "Table 10 presents the results for each setting. The model can trivially distinguish original audio from Voicebox-generated audio. This results from the fact that a model can also trivially distinguish original audio from resynthesized audio, most likely by recognizing artifacts produced by the vocoder. The task of differentiating Voicebox-generated audio from resynthesized audio is much harder. When 90% of the audio is masked, the model is able to reliably classify the audio as Voicebox-generated. In lower masking regimes this decreases a bit, but this is likely due to a naive inference method of averaging the outputs of all sliding windows. Since the majority of windows are non-synthetic, this leads to mis-classifications.",
     "zh": "表 10 给出各设置下的结果。模型可以轻易地区分原始音频与 Voicebox 生成的音频——这源于模型同样能轻易地区分原始音频与重合成音频（很可能是通过识别声码器产生的伪影）。区分 Voicebox 生成音频与重合成音频要难得多。当 90% 的音频被掩蔽时，模型能可靠地判定音频为 Voicebox 生成；在较低的掩蔽比例下准确率有所下降，但这很可能是因为取所有滑动窗口输出平均的朴素推理方式：由于大多数窗口并非合成，从而导致误分类。"
    },
    {
     "id": "tab-6-3",
     "type": "table_caption",
     "page": 18,
     "original": "Table 10: Synthetic speech detection metrics % Mask Accuracy Precision Recall",
     "zh": "表 10：合成语音检测指标。% Mask 为掩蔽比例，列为准确率（Accuracy）、精确率（Precision）、召回率（Recall）。"
    },
    {
     "id": "p-6-6",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-6-6-1",
       "original": "Original audio vs Voicebox-generated audio 30% 1.000 1.000 1.000 50% 1.000 1.000 1.000 90% 1.000 1.000 1.000 Resynthesized audio vs Voicebox-generated audio 30% 0.704 0.714 0.680 50% 0.809 0.796 0.831 90% 0.907 0.881 0.942",
       "zh": "（表内数字）原始音频对 Voicebox 生成音频：30% 掩蔽 1.000 1.000 1.000，50% 1.000 1.000 1.000，90% 1.000 1.000 1.000；重合成音频对 Voicebox 生成音频：30% 0.704 0.714 0.680，50% 0.809 0.796 0.831，90% 0.907 0.881 0.942。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-7",
   "num": "7",
   "level": 1,
   "page": 18,
   "title": {
    "original": "Conclusion and Discussion",
    "zh": "7 结论与讨论"
   },
   "blocks": [
    {
     "id": "p-7-1",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-7-1-1",
       "original": "This paper presents Voicebox, the most versatile generative model for speech.",
       "zh": "本文提出了 Voicebox——功能最全面的语音生成模型。"
      },
      {
       "id": "s-7-1-2",
       "original": "By learning to solve a text-guided speech infilling task on large scale multilingual datasets with a power model and training objective Voicebox demonstrates impressive task generalization capabilities.",
       "zh": "凭借强大的模型与训练目标，在大规模多语言数据集上学习求解文本引导的语音填充任务，Voicebox 展现出令人印象深刻的任务泛化能力。"
      },
      {
       "id": "s-7-1-3",
       "original": "Voicebox achieves state-of-the-art performance on mono and cross-lingual zero-shot TTS, speech inpainting, and diverse speech sampling, and can generate speech up to 20 times faster than the best autoregressive models.",
       "zh": "Voicebox 在单语与跨语言零样本 TTS、语音修补（inpainting）和多样化语音采样上均达到最先进水平，且生成语音的速度可达最佳自回归模型的 20 倍。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-limitation",
   "num": null,
   "level": 2,
   "page": 18,
   "title": {
    "original": "Limitation",
    "zh": "局限性"
   },
   "blocks": [
    {
     "id": "p-limitation-1",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-limitation-1-1",
       "original": "Voicebox models presented in this paper are trained on read speech from audiobooks in up to six written languages.",
       "zh": "本文提出的 Voicebox 模型在至多六种书面语言的有声书朗读语音上训练。"
      },
      {
       "id": "s-limitation-1-2",
       "original": "Hence, the current models may not transfer well to conversational speech [Godfrey et al., 1992], which is more casual and contains more non-verbal sounds such as laughing and back-channeling (e.g., um-hmm).",
       "zh": "因此，当前模型可能无法很好地迁移到会话语音 [Godfrey et al., 1992]——后者更随意，包含更多笑声、附和声（如“um-hmm”）等非语言声音。"
      },
      {
       "id": "s-limitation-1-3",
       "original": "We plan to tackle the problem by scaling the training data to incorporate more diverse speech.",
       "zh": "我们计划通过扩大训练数据规模、纳入更多样的语音来解决该问题。"
      }
     ]
    },
    {
     "id": "p-limitation-2",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-limitation-2-1",
       "original": "On the other hand, Voicebox depends on a phonemizer and a forced aligner to produce frame-level phonetic transcript.",
       "zh": "另一方面，Voicebox 依赖音素化器与强制对齐器来产生帧级音素转写。"
      },
      {
       "id": "s-limitation-2-2",
       "original": "In addition, many existing phonemizers [McAuliffe et al., 2017] are word-based, which does not take neighboring words of the target into account when predicting the pronunciation.",
       "zh": "此外，许多现有音素化器 [McAuliffe et al., 2017] 以词为单位工作，预测发音时不考虑目标词的相邻词。"
      }
     ]
    },
    {
     "id": "p-limitation-3",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-limitation-3-1",
       "original": "Such phonemizers cannot accurately predict phonetic transcript given text because pronunciation is context-dependent in many languages (e.g., liaisons in French).",
       "zh": "这类音素化器无法根据文本准确预测音素转写，因为在许多语言中发音依赖上下文（如法语的连诵）。"
      },
      {
       "id": "s-limitation-3-2",
       "original": "In the future, we will explore more end-to-end methods where a model would be able to take raw text with punctuation as input [Casanova et al., 2021], and eliminate the need of phonemizers and forced aligners to improve the performance and increase the language coverage.",
       "zh": "未来我们将探索更端到端的方法：模型直接以带标点的原始文本为输入 [Casanova et al., 2021]，从而消除对音素化器与强制对齐器的依赖，以提升性能并扩大语言覆盖。"
      }
     ]
    },
    {
     "id": "p-limitation-4",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-limitation-4-1",
       "original": "Last but not least, while Voicebox yields impressive results on transferring audio style (voice, speaking style, emotion, and acoustic condition), the model does not allow independent control of each attribute.",
       "zh": "最后但同样重要的是，尽管 Voicebox 在迁移音频风格（音色、说话风格、情绪与声学条件）上效果出色，模型并不支持对各属性独立控制。"
      },
      {
       "id": "s-limitation-4-2",
       "original": "In other words, one cannot ask the model to generate speech that resembles voice of one sample while resembling the emotion of another sample.",
       "zh": "换言之，无法要求模型生成音色像某一样本、而情绪像另一样本的语音。"
      },
      {
       "id": "s-limitation-4-3",
       "original": "We leave disentangled control of attributes through prompting or text description for future work.",
       "zh": "我们将通过提示或文本描述实现属性解耦控制留作未来工作。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-broader-impact",
   "num": null,
   "level": 2,
   "page": 19,
   "title": {
    "original": "Broader impact",
    "zh": "更广泛的影响"
   },
   "blocks": [
    {
     "id": "p-broader-impact-1",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-broader-impact-1-1",
       "original": "A high-quality and versatile generalist speech generation model like Voicebox can enable many applications that improve the quality of our life.",
       "zh": "像 Voicebox 这样高质量、多功能的通用语音生成模型可以支撑许多改善生活质量的应用。"
      },
      {
       "id": "s-broader-impact-1-2",
       "original": "For example, zero-shot TTS could bring the voice back to people who suffer from diseases or underwent surgeries such as laryngectomy the causes inability to speak.",
       "zh": "例如，零样本 TTS 可以让因疾病或喉切除术等手术而丧失说话能力的人重获声音。"
      },
      {
       "id": "s-broader-impact-1-3",
       "original": "Zero-shot TTS can also be combined with visual speech recognition systems [Hsu et al., 2022] to avoid the need of typing.",
       "zh": "零样本 TTS 还可与视觉语音识别系统 [Hsu et al., 2022] 结合，免去打字之需。"
      },
      {
       "id": "s-broader-impact-1-4",
       "original": "When paired with speech translation models, cross-lingual zero-shot TTS enables everyone to speak any language in their own voice.",
       "zh": "与语音翻译模型配合时，跨语言零样本 TTS 让每个人都能用自己的声音说任何语言。"
      },
      {
       "id": "s-broader-impact-1-5",
       "original": "Content editing and speech denoising can be productivity tools for users to create content more effortlessly.",
       "zh": "内容编辑与语音去噪可以成为帮助用户更轻松创作内容的生产力工具。"
      },
      {
       "id": "s-broader-impact-1-6",
       "original": "Diverse speech sampling, as shown in the paper, can significantly reduces the cost of creating data for training speech-input models.",
       "zh": "如文中所示，多样化语音采样能显著降低为训练语音输入模型制作数据的成本。"
      }
     ]
    },
    {
     "id": "p-broader-impact-2",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-broader-impact-2-1",
       "original": "While Voicebox can bring many positive social impacts, it also carries the potential of misuse and unintended harm.",
       "zh": "Voicebox 虽能带来诸多积极的社会影响，但也存在被滥用与造成意外伤害的潜在风险。"
      },
      {
       "id": "s-broader-impact-2-2",
       "original": "To mitigate the risk, we have presented a highly effective classifier in Section 6 showing that the model can accurately distinguish between real and synthetic speech.",
       "zh": "为缓解风险，我们在第 6 节给出了一个高效的分类器，表明模型可以准确地区分真实语音与合成语音。"
      },
      {
       "id": "s-broader-impact-2-3",
       "original": "For future work, we also plan to investigate proactive methods for training the generative model such that the synthetic speech can be more easily detected, such as embedding artificial fingerprints [Yu et al., 2021] that can be trivially detected without hurting the speech quality.",
       "zh": "未来工作中，我们还计划研究主动式的生成模型训练方法，使合成语音更易被检测，例如嵌入可轻易检测且不损害音质的人工指纹 [Yu et al., 2021]。"
      }
     ]
    },
    {
     "id": "p-broader-impact-3",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-broader-impact-3-1",
       "original": "To prevent Voicebox from learning biases, we also need to carefully select its training data.",
       "zh": "为防止 Voicebox 学到偏见，我们还需谨慎选择训练数据。"
      },
      {
       "id": "s-broader-impact-3-2",
       "original": "First, if Voicebox is only trained on a smaller number of speakers from a specific group with similar accents, it will not be able to generate diverse speech representing the accents around the globe, and downstream models trained on Voicebox generated speech would perform worse on groups with underrepresented accents.",
       "zh": "首先，如果 Voicebox 只在来自特定群体、口音相似的少数说话人上训练，它将无法生成代表全球各地口音的多样化语音，而用 Voicebox 生成语音训练的下游模型在口音代表性不足的群体上表现会更差。"
      },
      {
       "id": "s-broader-impact-3-3",
       "original": "For zero-shot style transfer, the performance would also degrade for underrepresented accents.",
       "zh": "零样本风格迁移在代表性不足的口音上性能同样会下降。"
      },
      {
       "id": "s-broader-impact-3-4",
       "original": "To mitigate this, we have leveraged in-the-wild speech that includes a wide variety of accents, and will continue investing in collecting diverse speech to avoid such biases.",
       "zh": "为缓解这一点，我们利用了包含广泛口音的野外真实语音，并将持续投入收集多样化语音以避免此类偏见。"
      }
     ]
    },
    {
     "id": "p-broader-impact-4",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-broader-impact-4-1",
       "original": "Second, if Voicebox is trained on data where samples from one ethnic group always have lower audio quality (e.g., more noise) while the other ethnic group always has higher audio quality samples, the model would also learn undesired association.",
       "zh": "其次，如果训练数据中某一族群的样本总是音质较低（如噪声更多），而另一族群的样本总是音质较高，模型也会学到不希望出现的关联。"
      },
      {
       "id": "s-broader-impact-4-2",
       "original": "To mitigate this, we want the distribution of audio quality (and other audio attributes) and ethnic group to be less correlated, which is usually the case when we have larger scale data collected from in-the-wild sources.",
       "zh": "为缓解这一点，我们希望音质（及其他音频属性）与族群之间的分布相关性更弱——当数据规模更大、来自野外真实来源时通常如此。"
      },
      {
       "id": "s-broader-impact-4-3",
       "original": "We can further tackle this by leveraging data augmentation to decorrelate the distribution, such as adding noise and enhancing speech to widen the audio quality distribution.",
       "zh": "我们还可以借助数据增强进一步去相关，例如通过加噪与语音增强来拓宽音质的分布。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-acknowledgment",
   "num": null,
   "level": 1,
   "page": 19,
   "title": {
    "original": "Acknowledgment",
    "zh": "致谢"
   },
   "blocks": [
    {
     "id": "p-acknowledgment-1",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-acknowledgment-1-1",
       "original": "The authors would like to thank Kristin Lauter and Joelle Pineau for supporting the project, thank Ricky Chen, Yaron Lipman, Alexandre Defossez, Gabriel Synnaeve for the technical discussion, thank Jade Copet and Gabriel Synnaeve for the compute support, thank Eleonora Presani and Jackie Pan for discussing the responsible AI studies, thank William Ngan, Somya Jain, Lydia Baillergeau, Dana Beaty, Chantal Mora, Daniel Duncan, Gopika Jhala, Steph Miles, Josh Terry, Valeryia Aranovich, Ashton Evans, Aly Gill, Andrea Mileskiewicz, Emily Richards, and Aaron Vasquez for developing the visual assets and the website, thank Alyssa Newcomb and Oliver Libaw for developing the posts, thank Peter Gray, Natalie Hereth, Shauna Kelleher, Ashley Gabriel, Seine Kim, Ana Paula Kirschner Moffarej and Aiman Farooq for coordinating the launch, thank Harrison Rudolph, Mallika Malhotra, Carolyn Krol, Lauren Cohen and Mo Metanat for the reviews, and thank Alexandra Gualdino, Ana Paula Kirschner Mofarrej, Benjamin Muller, Chloe Rolland, Daniella Kalfa, Darcie Da Silva, Gabriel Synnaeve, Hunter Goldman, Juan Pino, Karen Ulrich, Kris Sekula, Manuel Ribeiro, Marina Zannoli, Mary Williamson, Rashel Moritz, Stephanie Castillo, Tu Anh Nguyen, Vlad Sobal, Volker Seeker, and anonymous volunteers for sharing speech samples for the demo.",
       "zh": "作者感谢 Kristin Lauter 与 Joelle Pineau 对本项目的支持；感谢 Ricky Chen、Yaron Lipman、Alexandre Defossez、Gabriel Synnaeve 的技术讨论；感谢 Jade Copet 与 Gabriel Synnaeve 的算力支持；感谢 Eleonora Presani 与 Jackie Pan 就负责任 AI 研究的讨论；感谢 William Ngan、Somya Jain、Lydia Baillergeau、Dana Beaty、Chantal Mora、Daniel Duncan、Gopika Jhala、Steph Miles、Josh Terry、Valeryia Aranovich、Ashton Evans、Aly Gill、Andrea Mileskiewicz、Emily Richards 与 Aaron Vasquez 开发视觉素材与网站；感谢 Alyssa Newcomb 与 Oliver Libaw 撰写推文；感谢 Peter Gray、Natalie Hereth、Shauna Kelleher、Ashley Gabriel、Seine Kim、Ana Paula Kirschner Moffarej 与 Aiman Farooq 协调发布；感谢 Harrison Rudolph、Mallika Malhotra、Carolyn Krol、Lauren Cohen 与 Mo Metanat 的审阅；并感谢 Alexandra Gualdino、Ana Paula Kirschner Mofarrej、Benjamin Muller、Chloe Rolland、Daniella Kalfa、Darcie Da Silva、Gabriel Synnaeve、Hunter Goldman、Juan Pino、Karen Ulrich、Kris Sekula、Manuel Ribeiro、Marina Zannoli、Mary Williamson、Rashel Moritz、Stephanie Castillo、Tu Anh Nguyen、Vlad Sobal、Volker Seeker 以及匿名志愿者为演示提供语音样本。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-references",
   "num": null,
   "level": 1,
   "page": 20,
   "title": {
    "original": "References",
    "zh": "References"
   },
   "blocks": [
    {
     "id": "p-references-1",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-references-1-1",
       "original": "A."
      },
      {
       "id": "s-references-1-2",
       "original": "Aghajanyan, L."
      },
      {
       "id": "s-references-1-3",
       "original": "Yu, A."
      },
      {
       "id": "s-references-1-4",
       "original": "Conneau, W.-N."
      },
      {
       "id": "s-references-1-5",
       "original": "Hsu, K."
      },
      {
       "id": "s-references-1-6",
       "original": "Hambardzumyan, S."
      },
      {
       "id": "s-references-1-7",
       "original": "Zhang, S."
      },
      {
       "id": "s-references-1-8",
       "original": "Roller, N."
      },
      {
       "id": "s-references-1-9",
       "original": "Goyal, O."
      },
      {
       "id": "s-references-1-10",
       "original": "Levy, and L."
      },
      {
       "id": "s-references-1-11",
       "original": "Zettlemoyer."
      },
      {
       "id": "s-references-1-12",
       "original": "Scaling laws for generative mixed-modal language models."
      },
      {
       "id": "s-references-1-13",
       "original": "ArXiv, abs/2301.03728, 2023."
      }
     ]
    },
    {
     "id": "p-references-2",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-references-2-1",
       "original": "K."
      },
      {
       "id": "s-references-2-2",
       "original": "Akuzawa, Y."
      },
      {
       "id": "s-references-2-3",
       "original": "Iwasawa, and Y."
      },
      {
       "id": "s-references-2-4",
       "original": "Matsuo."
      },
      {
       "id": "s-references-2-5",
       "original": "Expressive speech synthesis via modeling expressions with variational autoencoder."
      },
      {
       "id": "s-references-2-6",
       "original": "ArXiv, abs/1804.02135, 2018."
      }
     ]
    },
    {
     "id": "p-references-3",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-references-3-1",
       "original": "R."
      },
      {
       "id": "s-references-3-2",
       "original": "Ardila, M."
      },
      {
       "id": "s-references-3-3",
       "original": "Branson, K."
      },
      {
       "id": "s-references-3-4",
       "original": "Davis, M."
      },
      {
       "id": "s-references-3-5",
       "original": "Henretty, M."
      },
      {
       "id": "s-references-3-6",
       "original": "Kohler, J."
      },
      {
       "id": "s-references-3-7",
       "original": "Meyer, R."
      },
      {
       "id": "s-references-3-8",
       "original": "Morais, L."
      },
      {
       "id": "s-references-3-9",
       "original": "Saunders, F."
      },
      {
       "id": "s-references-3-10",
       "original": "M."
      }
     ]
    },
    {
     "id": "p-references-4",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-references-4-1",
       "original": "Tyers, and G."
      },
      {
       "id": "s-references-4-2",
       "original": "Weber."
      },
      {
       "id": "s-references-4-3",
       "original": "Common voice: A massively-multilingual speech corpus."
      },
      {
       "id": "s-references-4-4",
       "original": "In International Conference on Language Resources and Evaluation, 2019."
      }
     ]
    },
    {
     "id": "p-references-5",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-references-5-1",
       "original": "A."
      },
      {
       "id": "s-references-5-2",
       "original": "Babu, C."
      },
      {
       "id": "s-references-5-3",
       "original": "Wang, A."
      },
      {
       "id": "s-references-5-4",
       "original": "Tjandra, K."
      },
      {
       "id": "s-references-5-5",
       "original": "Lakhotia, Q."
      },
      {
       "id": "s-references-5-6",
       "original": "Xu, N."
      },
      {
       "id": "s-references-5-7",
       "original": "Goyal, K."
      },
      {
       "id": "s-references-5-8",
       "original": "Singh, P. von Platen, Y."
      },
      {
       "id": "s-references-5-9",
       "original": "Saraf, J."
      },
      {
       "id": "s-references-5-10",
       "original": "Pino, A."
      },
      {
       "id": "s-references-5-11",
       "original": "Baevski, A."
      },
      {
       "id": "s-references-5-12",
       "original": "Conneau, and M."
      },
      {
       "id": "s-references-5-13",
       "original": "Auli."
      },
      {
       "id": "s-references-5-14",
       "original": "XLS-R: self-supervised cross-lingual speech representation learning at scale."
      },
      {
       "id": "s-references-5-15",
       "original": "In H."
      },
      {
       "id": "s-references-5-16",
       "original": "Ko and J."
      },
      {
       "id": "s-references-5-17",
       "original": "H."
      },
      {
       "id": "s-references-5-18",
       "original": "L."
      },
      {
       "id": "s-references-5-19",
       "original": "Hansen, editors, Interspeech 2022, 23rd Annual Conference of the International Speech Communication Association, Incheon, Korea, 18-22 September 2022, pages 2278–2282."
      },
      {
       "id": "s-references-5-20",
       "original": "ISCA, 2022."
      }
     ]
    },
    {
     "id": "p-references-6",
     "type": "paragraph",
     "page": 20,
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
       "original": "Advances in neural information processing systems, 2020."
      }
     ]
    },
    {
     "id": "p-references-7",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-references-7-1",
       "original": "H."
      },
      {
       "id": "s-references-7-2",
       "original": "Bai, R."
      },
      {
       "id": "s-references-7-3",
       "original": "Zheng, J."
      },
      {
       "id": "s-references-7-4",
       "original": "Chen, X."
      },
      {
       "id": "s-references-7-5",
       "original": "Li, M."
      },
      {
       "id": "s-references-7-6",
       "original": "Ma, and L."
      },
      {
       "id": "s-references-7-7",
       "original": "Huang."
      },
      {
       "id": "s-references-7-8",
       "original": "A3T: Alignment-aware acoustic and text pretraining for speech synthesis and editing."
      },
      {
       "id": "s-references-7-9",
       "original": "In International Conference on Machine Learning, 2022."
      }
     ]
    },
    {
     "id": "p-references-8",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-references-8-1",
       "original": "Z."
      },
      {
       "id": "s-references-8-2",
       "original": "Borsos, R."
      },
      {
       "id": "s-references-8-3",
       "original": "Marinier, D."
      },
      {
       "id": "s-references-8-4",
       "original": "Vincent, E."
      },
      {
       "id": "s-references-8-5",
       "original": "Kharitonov, O."
      },
      {
       "id": "s-references-8-6",
       "original": "Pietquin, M."
      },
      {
       "id": "s-references-8-7",
       "original": "Sharifi, O."
      },
      {
       "id": "s-references-8-8",
       "original": "Teboul, D."
      },
      {
       "id": "s-references-8-9",
       "original": "Grangier, M."
      },
      {
       "id": "s-references-8-10",
       "original": "Tagliasacchi, and N."
      },
      {
       "id": "s-references-8-11",
       "original": "Zeghidour."
      },
      {
       "id": "s-references-8-12",
       "original": "AudioLM: a language modeling approach to audio generation."
      }
     ]
    },
    {
     "id": "p-references-9",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-references-9-1",
       "original": "ArXiv, abs/2209.03143, 2022a."
      }
     ]
    },
    {
     "id": "p-references-10",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-references-10-1",
       "original": "Z."
      },
      {
       "id": "s-references-10-2",
       "original": "Borsos, M."
      },
      {
       "id": "s-references-10-3",
       "original": "Sharifi, and M."
      },
      {
       "id": "s-references-10-4",
       "original": "Tagliasacchi."
      },
      {
       "id": "s-references-10-5",
       "original": "SpeechPainter: Text-conditioned speech inpainting."
      },
      {
       "id": "s-references-10-6",
       "original": "In Interspeech, 2022b."
      }
     ]
    },
    {
     "id": "p-references-11",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-references-11-1",
       "original": "A."
      },
      {
       "id": "s-references-11-2",
       "original": "Brock, J."
      },
      {
       "id": "s-references-11-3",
       "original": "Donahue, and K."
      },
      {
       "id": "s-references-11-4",
       "original": "Simonyan."
      },
      {
       "id": "s-references-11-5",
       "original": "Large scale gan training for high fidelity natural image synthesis. arXiv preprint arXiv:1809.11096, 2018."
      }
     ]
    },
    {
     "id": "p-references-12",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-references-12-1",
       "original": "T."
      },
      {
       "id": "s-references-12-2",
       "original": "B."
      },
      {
       "id": "s-references-12-3",
       "original": "Brown, B."
      },
      {
       "id": "s-references-12-4",
       "original": "Mann, N."
      },
      {
       "id": "s-references-12-5",
       "original": "Ryder, M."
      },
      {
       "id": "s-references-12-6",
       "original": "Subbiah, J."
      },
      {
       "id": "s-references-12-7",
       "original": "Kaplan, P."
      },
      {
       "id": "s-references-12-8",
       "original": "Dhariwal, A."
      },
      {
       "id": "s-references-12-9",
       "original": "Neelakantan, P."
      },
      {
       "id": "s-references-12-10",
       "original": "Shyam, G."
      },
      {
       "id": "s-references-12-11",
       "original": "Sastry, A."
      },
      {
       "id": "s-references-12-12",
       "original": "Askell, S."
      },
      {
       "id": "s-references-12-13",
       "original": "Agarwal, A."
      },
      {
       "id": "s-references-12-14",
       "original": "Herbert-Voss, G."
      },
      {
       "id": "s-references-12-15",
       "original": "Krueger, T."
      },
      {
       "id": "s-references-12-16",
       "original": "J."
      },
      {
       "id": "s-references-12-17",
       "original": "Henighan, R."
      },
      {
       "id": "s-references-12-18",
       "original": "Child, A."
      },
      {
       "id": "s-references-12-19",
       "original": "Ramesh, D."
      },
      {
       "id": "s-references-12-20",
       "original": "M."
      },
      {
       "id": "s-references-12-21",
       "original": "Ziegler, J."
      },
      {
       "id": "s-references-12-22",
       "original": "Wu, C."
      },
      {
       "id": "s-references-12-23",
       "original": "Winter, C."
      },
      {
       "id": "s-references-12-24",
       "original": "Hesse, M."
      },
      {
       "id": "s-references-12-25",
       "original": "Chen, E."
      },
      {
       "id": "s-references-12-26",
       "original": "Sigler, M."
      },
      {
       "id": "s-references-12-27",
       "original": "Litwin, S."
      },
      {
       "id": "s-references-12-28",
       "original": "Gray, B."
      },
      {
       "id": "s-references-12-29",
       "original": "Chess, J."
      },
      {
       "id": "s-references-12-30",
       "original": "Clark, C."
      },
      {
       "id": "s-references-12-31",
       "original": "Berner, S."
      },
      {
       "id": "s-references-12-32",
       "original": "McCandlish, A."
      },
      {
       "id": "s-references-12-33",
       "original": "Radford, I."
      },
      {
       "id": "s-references-12-34",
       "original": "Sutskever, and D."
      },
      {
       "id": "s-references-12-35",
       "original": "Amodei."
      },
      {
       "id": "s-references-12-36",
       "original": "Language models are few-shot learners."
      },
      {
       "id": "s-references-12-37",
       "original": "ArXiv, abs/2005.14165, 2020."
      }
     ]
    },
    {
     "id": "p-references-13",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-references-13-1",
       "original": "E."
      },
      {
       "id": "s-references-13-2",
       "original": "Casanova, J."
      },
      {
       "id": "s-references-13-3",
       "original": "Weber, C."
      },
      {
       "id": "s-references-13-4",
       "original": "D."
      },
      {
       "id": "s-references-13-5",
       "original": "Shulby, A."
      },
      {
       "id": "s-references-13-6",
       "original": "C."
      },
      {
       "id": "s-references-13-7",
       "original": "Júnior, E."
      },
      {
       "id": "s-references-13-8",
       "original": "Gölge, and M."
      },
      {
       "id": "s-references-13-9",
       "original": "A."
      },
      {
       "id": "s-references-13-10",
       "original": "Ponti."
      },
      {
       "id": "s-references-13-11",
       "original": "YourTTS: Towards zeroshot multi-speaker tts and zero-shot voice conversion for everyone."
      },
      {
       "id": "s-references-13-12",
       "original": "In International Conference on Machine Learning, 2021."
      }
     ]
    },
    {
     "id": "p-references-14",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-references-14-1",
       "original": "E."
      },
      {
       "id": "s-references-14-2",
       "original": "Casanova, A."
      },
      {
       "id": "s-references-14-3",
       "original": "C."
      },
      {
       "id": "s-references-14-4",
       "original": "Junior, C."
      },
      {
       "id": "s-references-14-5",
       "original": "Shulby, F."
      },
      {
       "id": "s-references-14-6",
       "original": "S. d."
      },
      {
       "id": "s-references-14-7",
       "original": "Oliveira, J."
      },
      {
       "id": "s-references-14-8",
       "original": "P."
      },
      {
       "id": "s-references-14-9",
       "original": "Teixeira, M."
      },
      {
       "id": "s-references-14-10",
       "original": "A."
      },
      {
       "id": "s-references-14-11",
       "original": "Ponti, and S."
      },
      {
       "id": "s-references-14-12",
       "original": "Aluísio."
      }
     ]
    },
    {
     "id": "p-references-15",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-references-15-1",
       "original": "Tts-portuguese corpus: a corpus for speech synthesis in brazilian portuguese."
      },
      {
       "id": "s-references-15-2",
       "original": "Language Resources and Evaluation, 56(3):1043–1055, 2022."
      }
     ]
    },
    {
     "id": "p-references-16",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-references-16-1",
       "original": "R."
      },
      {
       "id": "s-references-16-2",
       "original": "T."
      },
      {
       "id": "s-references-16-3",
       "original": "Q."
      },
      {
       "id": "s-references-16-4",
       "original": "Chen. torchdiffeq, 2018."
      },
      {
       "id": "s-references-16-5",
       "original": "URL https://github.com/rtqichen/torchdiffeq."
      }
     ]
    },
    {
     "id": "p-references-17",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-references-17-1",
       "original": "R."
      },
      {
       "id": "s-references-17-2",
       "original": "T."
      },
      {
       "id": "s-references-17-3",
       "original": "Q."
      },
      {
       "id": "s-references-17-4",
       "original": "Chen, Y."
      },
      {
       "id": "s-references-17-5",
       "original": "Rubanova, J."
      },
      {
       "id": "s-references-17-6",
       "original": "Bettencourt, and D."
      },
      {
       "id": "s-references-17-7",
       "original": "K."
      },
      {
       "id": "s-references-17-8",
       "original": "Duvenaud."
      },
      {
       "id": "s-references-17-9",
       "original": "Neural ordinary differential equations."
      },
      {
       "id": "s-references-17-10",
       "original": "In Neural Information Processing Systems, 2018."
      }
     ]
    },
    {
     "id": "p-references-18",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-references-18-1",
       "original": "S."
      },
      {
       "id": "s-references-18-2",
       "original": "Chen, C."
      },
      {
       "id": "s-references-18-3",
       "original": "Wang, Z."
      },
      {
       "id": "s-references-18-4",
       "original": "Chen, Y."
      },
      {
       "id": "s-references-18-5",
       "original": "Wu, S."
      },
      {
       "id": "s-references-18-6",
       "original": "Liu, Z."
      },
      {
       "id": "s-references-18-7",
       "original": "Chen, J."
      },
      {
       "id": "s-references-18-8",
       "original": "Li, N."
      },
      {
       "id": "s-references-18-9",
       "original": "Kanda, T."
      },
      {
       "id": "s-references-18-10",
       "original": "Yoshioka, X."
      },
      {
       "id": "s-references-18-11",
       "original": "Xiao, et al."
      }
     ]
    },
    {
     "id": "p-references-19",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-references-19-1",
       "original": "Wavlm: Large-scale self-supervised pre-training for full stack speech processing."
      },
      {
       "id": "s-references-19-2",
       "original": "IEEE Journal of Selected Topics in Signal Processing, 16(6):1505–1518, 2022."
      }
     ]
    },
    {
     "id": "p-references-20",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-references-20-1",
       "original": "A."
      },
      {
       "id": "s-references-20-2",
       "original": "Défossez, G."
      },
      {
       "id": "s-references-20-3",
       "original": "Synnaeve, and Y."
      },
      {
       "id": "s-references-20-4",
       "original": "Adi."
      },
      {
       "id": "s-references-20-5",
       "original": "Real time speech enhancement in the waveform domain."
      }
     ]
    },
    {
     "id": "p-references-21",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-references-21-1",
       "original": "ArXiv, abs/2006.12847, 2020."
      }
     ]
    },
    {
     "id": "p-references-22",
     "type": "paragraph",
     "page": 21,
     "sentences": [
      {
       "id": "s-references-22-1",
       "original": "A."
      },
      {
       "id": "s-references-22-2",
       "original": "Défossez, J."
      },
      {
       "id": "s-references-22-3",
       "original": "Copet, G."
      },
      {
       "id": "s-references-22-4",
       "original": "Synnaeve, and Y."
      },
      {
       "id": "s-references-22-5",
       "original": "Adi."
      },
      {
       "id": "s-references-22-6",
       "original": "High fidelity neural audio compression."
      },
      {
       "id": "s-references-22-7",
       "original": "ArXiv, abs/2210.13438, 2022."
      }
     ]
    },
    {
     "id": "p-references-23",
     "type": "paragraph",
     "page": 21,
     "sentences": [
      {
       "id": "s-references-23-1",
       "original": "B."
      },
      {
       "id": "s-references-23-2",
       "original": "Desplanques, J."
      },
      {
       "id": "s-references-23-3",
       "original": "Thienpondt, and K."
      },
      {
       "id": "s-references-23-4",
       "original": "Demuynck."
      },
      {
       "id": "s-references-23-5",
       "original": "ECAPA-TDNN: Emphasized Channel Attention, propagation and aggregation in TDNN based speaker verification."
      },
      {
       "id": "s-references-23-6",
       "original": "In Interspeech, 2020."
      }
     ]
    },
    {
     "id": "p-references-24",
     "type": "paragraph",
     "page": 21,
     "sentences": [
      {
       "id": "s-references-24-1",
       "original": "P."
      },
      {
       "id": "s-references-24-2",
       "original": "Dhariwal and A."
      },
      {
       "id": "s-references-24-3",
       "original": "Nichol."
      },
      {
       "id": "s-references-24-4",
       "original": "Diffusion models beat GANs on image synthesis."
      },
      {
       "id": "s-references-24-5",
       "original": "Advances in Neural Information Processing Systems, 2021."
      }
     ]
    },
    {
     "id": "p-references-25",
     "type": "paragraph",
     "page": 21,
     "sentences": [
      {
       "id": "s-references-25-1",
       "original": "J."
      },
      {
       "id": "s-references-25-2",
       "original": "J."
      },
      {
       "id": "s-references-25-3",
       "original": "Godfrey, E."
      },
      {
       "id": "s-references-25-4",
       "original": "C."
      },
      {
       "id": "s-references-25-5",
       "original": "Holliman, and J."
      },
      {
       "id": "s-references-25-6",
       "original": "McDaniel."
      },
      {
       "id": "s-references-25-7",
       "original": "Switchboard: Telephone speech corpus for research and development."
      },
      {
       "id": "s-references-25-8",
       "original": "In Acoustics, Speech, and Signal Processing, IEEE International Conference on, volume 1, pages 517–520."
      },
      {
       "id": "s-references-25-9",
       "original": "IEEE Computer Society, 1992."
      }
     ]
    },
    {
     "id": "p-references-26",
     "type": "paragraph",
     "page": 21,
     "sentences": [
      {
       "id": "s-references-26-1",
       "original": "A."
      },
      {
       "id": "s-references-26-2",
       "original": "Gulati, J."
      },
      {
       "id": "s-references-26-3",
       "original": "Qin, C.-C."
      },
      {
       "id": "s-references-26-4",
       "original": "Chiu, N."
      },
      {
       "id": "s-references-26-5",
       "original": "Parmar, Y."
      },
      {
       "id": "s-references-26-6",
       "original": "Zhang, J."
      },
      {
       "id": "s-references-26-7",
       "original": "Yu, W."
      },
      {
       "id": "s-references-26-8",
       "original": "Han, S."
      },
      {
       "id": "s-references-26-9",
       "original": "Wang, Z."
      },
      {
       "id": "s-references-26-10",
       "original": "Zhang, Y."
      },
      {
       "id": "s-references-26-11",
       "original": "Wu, et al. Conformer: Convolution-augmented transformer for speech recognition. arXiv preprint arXiv:2005.08100, 2020."
      }
     ]
    },
    {
     "id": "p-references-27",
     "type": "paragraph",
     "page": 21,
     "sentences": [
      {
       "id": "s-references-27-1",
       "original": "M."
      },
      {
       "id": "s-references-27-2",
       "original": "Heusel, H."
      },
      {
       "id": "s-references-27-3",
       "original": "Ramsauer, T."
      },
      {
       "id": "s-references-27-4",
       "original": "Unterthiner, B."
      },
      {
       "id": "s-references-27-5",
       "original": "Nessler, and S."
      },
      {
       "id": "s-references-27-6",
       "original": "Hochreiter."
      },
      {
       "id": "s-references-27-7",
       "original": "GANs trained by a two time-scale update rule converge to a local Nash equilibrium."
      },
      {
       "id": "s-references-27-8",
       "original": "Advances in neural information processing systems, 2017."
      }
     ]
    },
    {
     "id": "p-references-28",
     "type": "paragraph",
     "page": 21,
     "sentences": [
      {
       "id": "s-references-28-1",
       "original": "J."
      },
      {
       "id": "s-references-28-2",
       "original": "Ho and T."
      },
      {
       "id": "s-references-28-3",
       "original": "Salimans."
      },
      {
       "id": "s-references-28-4",
       "original": "Classifier-free diffusion guidance. arXiv preprint arXiv:2207.12598, 2022."
      }
     ]
    },
    {
     "id": "p-references-29",
     "type": "paragraph",
     "page": 21,
     "sentences": [
      {
       "id": "s-references-29-1",
       "original": "J."
      },
      {
       "id": "s-references-29-2",
       "original": "Ho, A."
      },
      {
       "id": "s-references-29-3",
       "original": "Jain, and P."
      },
      {
       "id": "s-references-29-4",
       "original": "Abbeel."
      },
      {
       "id": "s-references-29-5",
       "original": "Denoising diffusion probabilistic models."
      },
      {
       "id": "s-references-29-6",
       "original": "Advances in Neural Information Processing Systems, 2020."
      }
     ]
    },
    {
     "id": "p-references-30",
     "type": "paragraph",
     "page": 21,
     "sentences": [
      {
       "id": "s-references-30-1",
       "original": "J."
      },
      {
       "id": "s-references-30-2",
       "original": "Hoffmann, S."
      },
      {
       "id": "s-references-30-3",
       "original": "Borgeaud, A."
      },
      {
       "id": "s-references-30-4",
       "original": "Mensch, E."
      },
      {
       "id": "s-references-30-5",
       "original": "Buchatskaya, T."
      },
      {
       "id": "s-references-30-6",
       "original": "Cai, E."
      },
      {
       "id": "s-references-30-7",
       "original": "Rutherford, D. de Las Casas, L."
      },
      {
       "id": "s-references-30-8",
       "original": "A."
      },
      {
       "id": "s-references-30-9",
       "original": "Hendricks, J."
      },
      {
       "id": "s-references-30-10",
       "original": "Welbl, A."
      },
      {
       "id": "s-references-30-11",
       "original": "Clark, T."
      },
      {
       "id": "s-references-30-12",
       "original": "Hennigan, E."
      },
      {
       "id": "s-references-30-13",
       "original": "Noland, K."
      },
      {
       "id": "s-references-30-14",
       "original": "Millican, G. van den Driessche, B."
      },
      {
       "id": "s-references-30-15",
       "original": "Damoc, A."
      },
      {
       "id": "s-references-30-16",
       "original": "Guy, S."
      },
      {
       "id": "s-references-30-17",
       "original": "Osindero, K."
      },
      {
       "id": "s-references-30-18",
       "original": "Simonyan, E."
      },
      {
       "id": "s-references-30-19",
       "original": "Elsen, J."
      },
      {
       "id": "s-references-30-20",
       "original": "W."
      },
      {
       "id": "s-references-30-21",
       "original": "Rae, O."
      },
      {
       "id": "s-references-30-22",
       "original": "Vinyals, and L."
      },
      {
       "id": "s-references-30-23",
       "original": "Sifre."
      }
     ]
    },
    {
     "id": "p-references-31",
     "type": "paragraph",
     "page": 21,
     "sentences": [
      {
       "id": "s-references-31-1",
       "original": "Training compute-optimal large language models."
      },
      {
       "id": "s-references-31-2",
       "original": "ArXiv, abs/2203.15556, 2022."
      }
     ]
    },
    {
     "id": "p-references-32",
     "type": "paragraph",
     "page": 21,
     "sentences": [
      {
       "id": "s-references-32-1",
       "original": "W.-N."
      },
      {
       "id": "s-references-32-2",
       "original": "Hsu, Y."
      },
      {
       "id": "s-references-32-3",
       "original": "Zhang, R."
      },
      {
       "id": "s-references-32-4",
       "original": "J."
      },
      {
       "id": "s-references-32-5",
       "original": "Weiss, H."
      },
      {
       "id": "s-references-32-6",
       "original": "Zen, Y."
      },
      {
       "id": "s-references-32-7",
       "original": "Wu, Y."
      },
      {
       "id": "s-references-32-8",
       "original": "Wang, Y."
      },
      {
       "id": "s-references-32-9",
       "original": "Cao, Y."
      },
      {
       "id": "s-references-32-10",
       "original": "Jia, Z."
      },
      {
       "id": "s-references-32-11",
       "original": "Chen, J."
      },
      {
       "id": "s-references-32-12",
       "original": "Shen, et al."
      }
     ]
    },
    {
     "id": "p-references-33",
     "type": "paragraph",
     "page": 21,
     "sentences": [
      {
       "id": "s-references-33-1",
       "original": "Hierarchical generative modeling for controllable speech synthesis."
      },
      {
       "id": "s-references-33-2",
       "original": "In International Conference on Learning Representations, 2019."
      }
     ]
    },
    {
     "id": "p-references-34",
     "type": "paragraph",
     "page": 21,
     "sentences": [
      {
       "id": "s-references-34-1",
       "original": "W.-N."
      },
      {
       "id": "s-references-34-2",
       "original": "Hsu, B."
      },
      {
       "id": "s-references-34-3",
       "original": "Bolte, Y.-H."
      },
      {
       "id": "s-references-34-4",
       "original": "H."
      },
      {
       "id": "s-references-34-5",
       "original": "Tsai, K."
      },
      {
       "id": "s-references-34-6",
       "original": "Lakhotia, R."
      },
      {
       "id": "s-references-34-7",
       "original": "Salakhutdinov, and A."
      },
      {
       "id": "s-references-34-8",
       "original": "Mohamed."
      },
      {
       "id": "s-references-34-9",
       "original": "Hubert: Self-supervised speech representation learning by masked prediction of hidden units."
      },
      {
       "id": "s-references-34-10",
       "original": "IEEE/ACM Transactions on Audio, Speech, and Language Processing, 29:3451–3460, 2021."
      }
     ]
    },
    {
     "id": "p-references-35",
     "type": "paragraph",
     "page": 21,
     "sentences": [
      {
       "id": "s-references-35-1",
       "original": "W.-N."
      },
      {
       "id": "s-references-35-2",
       "original": "Hsu, T."
      },
      {
       "id": "s-references-35-3",
       "original": "Remez, B."
      },
      {
       "id": "s-references-35-4",
       "original": "Shi, J."
      },
      {
       "id": "s-references-35-5",
       "original": "Donley, and Y."
      },
      {
       "id": "s-references-35-6",
       "original": "Adi."
      },
      {
       "id": "s-references-35-7",
       "original": "Revise: Self-supervised speech resynthesis with visual input for universal and generalized speech enhancement. arXiv preprint arXiv:2212.11377, 2022."
      }
     ]
    },
    {
     "id": "p-references-36",
     "type": "paragraph",
     "page": 21,
     "sentences": [
      {
       "id": "s-references-36-1",
       "original": "R."
      },
      {
       "id": "s-references-36-2",
       "original": "Huang, M."
      },
      {
       "id": "s-references-36-3",
       "original": "W."
      },
      {
       "id": "s-references-36-4",
       "original": "Y."
      },
      {
       "id": "s-references-36-5",
       "original": "Lam, J."
      },
      {
       "id": "s-references-36-6",
       "original": "Wang, D."
      },
      {
       "id": "s-references-36-7",
       "original": "Su, D."
      },
      {
       "id": "s-references-36-8",
       "original": "Yu, Y."
      },
      {
       "id": "s-references-36-9",
       "original": "Ren, and Z."
      },
      {
       "id": "s-references-36-10",
       "original": "Zhao."
      },
      {
       "id": "s-references-36-11",
       "original": "FastDiff: A fast conditional diffusion model for high-quality speech synthesis."
      },
      {
       "id": "s-references-36-12",
       "original": "In International Joint Conference on Artificial Intelligence, 2022."
      }
     ]
    },
    {
     "id": "p-references-37",
     "type": "paragraph",
     "page": 21,
     "sentences": [
      {
       "id": "s-references-37-1",
       "original": "Y."
      },
      {
       "id": "s-references-37-2",
       "original": "Jia, Y."
      },
      {
       "id": "s-references-37-3",
       "original": "Zhang, R."
      },
      {
       "id": "s-references-37-4",
       "original": "Weiss, Q."
      },
      {
       "id": "s-references-37-5",
       "original": "Wang, J."
      },
      {
       "id": "s-references-37-6",
       "original": "Shen, F."
      },
      {
       "id": "s-references-37-7",
       "original": "Ren, P."
      },
      {
       "id": "s-references-37-8",
       "original": "Nguyen, R."
      },
      {
       "id": "s-references-37-9",
       "original": "Pang, I."
      },
      {
       "id": "s-references-37-10",
       "original": "Lopez Moreno, Y."
      },
      {
       "id": "s-references-37-11",
       "original": "Wu, et al. Transfer learning from speaker verification to multispeaker text-to-speech synthesis."
      },
      {
       "id": "s-references-37-12",
       "original": "Advances in neural information processing systems, 2018."
      }
     ]
    },
    {
     "id": "p-references-38",
     "type": "paragraph",
     "page": 21,
     "sentences": [
      {
       "id": "s-references-38-1",
       "original": "J."
      },
      {
       "id": "s-references-38-2",
       "original": "Kahn, M."
      },
      {
       "id": "s-references-38-3",
       "original": "Rivière, W."
      },
      {
       "id": "s-references-38-4",
       "original": "Zheng, E."
      },
      {
       "id": "s-references-38-5",
       "original": "Kharitonov, Q."
      },
      {
       "id": "s-references-38-6",
       "original": "Xu, P.-E."
      },
      {
       "id": "s-references-38-7",
       "original": "Mazar’e, J."
      },
      {
       "id": "s-references-38-8",
       "original": "Karadayi, V."
      },
      {
       "id": "s-references-38-9",
       "original": "Liptchinsky, R."
      },
      {
       "id": "s-references-38-10",
       "original": "Collobert, C."
      },
      {
       "id": "s-references-38-11",
       "original": "Fuegen, T."
      },
      {
       "id": "s-references-38-12",
       "original": "Likhomanenko, G."
      },
      {
       "id": "s-references-38-13",
       "original": "Synnaeve, A."
      },
      {
       "id": "s-references-38-14",
       "original": "Joulin, A. rahman Mohamed, and E."
      },
      {
       "id": "s-references-38-15",
       "original": "Dupoux."
      },
      {
       "id": "s-references-38-16",
       "original": "Libri-Light: A benchmark for asr with limited or no supervision."
      },
      {
       "id": "s-references-38-17",
       "original": "International Conference on Acoustics, Speech and Signal Processing, 2019."
      }
     ]
    },
    {
     "id": "p-references-39",
     "type": "paragraph",
     "page": 21,
     "sentences": [
      {
       "id": "s-references-39-1",
       "original": "H."
      },
      {
       "id": "s-references-39-2",
       "original": "Kameoka, T."
      },
      {
       "id": "s-references-39-3",
       "original": "Kaneko, K."
      },
      {
       "id": "s-references-39-4",
       "original": "Tanaka, and N."
      },
      {
       "id": "s-references-39-5",
       "original": "Hojo."
      },
      {
       "id": "s-references-39-6",
       "original": "StarGAN-VC: non-parallel many-to-many voice conversion using star generative adversarial networks."
      },
      {
       "id": "s-references-39-7",
       "original": "IEEE Spoken Language Technology Workshop, 2018."
      }
     ]
    },
    {
     "id": "p-references-40",
     "type": "paragraph",
     "page": 21,
     "sentences": [
      {
       "id": "s-references-40-1",
       "original": "E."
      },
      {
       "id": "s-references-40-2",
       "original": "Kharitonov, A."
      },
      {
       "id": "s-references-40-3",
       "original": "Lee, A."
      },
      {
       "id": "s-references-40-4",
       "original": "Polyak, Y."
      },
      {
       "id": "s-references-40-5",
       "original": "Adi, J."
      },
      {
       "id": "s-references-40-6",
       "original": "Copet, K."
      },
      {
       "id": "s-references-40-7",
       "original": "Lakhotia, T."
      },
      {
       "id": "s-references-40-8",
       "original": "Nguyen, M."
      },
      {
       "id": "s-references-40-9",
       "original": "Rivière, A. rahman Mohamed, E."
      },
      {
       "id": "s-references-40-10",
       "original": "Dupoux, and W.-N."
      },
      {
       "id": "s-references-40-11",
       "original": "Hsu."
      },
      {
       "id": "s-references-40-12",
       "original": "Text-free prosody-aware generative spoken language modeling."
      },
      {
       "id": "s-references-40-13",
       "original": "In Annual Meeting of the Association for Computational Linguistics, 2021."
      }
     ]
    },
    {
     "id": "p-references-41",
     "type": "paragraph",
     "page": 22,
     "sentences": [
      {
       "id": "s-references-41-1",
       "original": "E."
      },
      {
       "id": "s-references-41-2",
       "original": "Kharitonov, D."
      },
      {
       "id": "s-references-41-3",
       "original": "Vincent, Z."
      },
      {
       "id": "s-references-41-4",
       "original": "Borsos, R."
      },
      {
       "id": "s-references-41-5",
       "original": "Marinier, S."
      },
      {
       "id": "s-references-41-6",
       "original": "Girgin, O."
      },
      {
       "id": "s-references-41-7",
       "original": "Pietquin, M."
      },
      {
       "id": "s-references-41-8",
       "original": "Sharifi, M."
      },
      {
       "id": "s-references-41-9",
       "original": "Tagliasacchi, and N."
      },
      {
       "id": "s-references-41-10",
       "original": "Zeghidour."
      },
      {
       "id": "s-references-41-11",
       "original": "Speak, read and prompt: High-fidelity text-to-speech with minimal supervision, 2023."
      }
     ]
    },
    {
     "id": "p-references-42",
     "type": "paragraph",
     "page": 22,
     "sentences": [
      {
       "id": "s-references-42-1",
       "original": "K."
      },
      {
       "id": "s-references-42-2",
       "original": "Kilgour, M."
      },
      {
       "id": "s-references-42-3",
       "original": "Zuluaga, D."
      },
      {
       "id": "s-references-42-4",
       "original": "Roblek, and M."
      },
      {
       "id": "s-references-42-5",
       "original": "Sharifi."
      },
      {
       "id": "s-references-42-6",
       "original": "Fréchet audio distance: A reference-free metric for evaluating music enhancement algorithms."
      },
      {
       "id": "s-references-42-7",
       "original": "In Interspeech, 2019."
      }
     ]
    },
    {
     "id": "p-references-43",
     "type": "paragraph",
     "page": 22,
     "sentences": [
      {
       "id": "s-references-43-1",
       "original": "J."
      },
      {
       "id": "s-references-43-2",
       "original": "Kim, S."
      },
      {
       "id": "s-references-43-3",
       "original": "Kim, J."
      },
      {
       "id": "s-references-43-4",
       "original": "Kong, and S."
      },
      {
       "id": "s-references-43-5",
       "original": "Yoon."
      },
      {
       "id": "s-references-43-6",
       "original": "Glow-TTS: A generative flow for text-to-speech via monotonic alignment search."
      },
      {
       "id": "s-references-43-7",
       "original": "Advances in Neural Information Processing Systems, 2020."
      }
     ]
    },
    {
     "id": "p-references-44",
     "type": "paragraph",
     "page": 22,
     "sentences": [
      {
       "id": "s-references-44-1",
       "original": "J."
      },
      {
       "id": "s-references-44-2",
       "original": "Kim, J."
      },
      {
       "id": "s-references-44-3",
       "original": "Kong, and J."
      },
      {
       "id": "s-references-44-4",
       "original": "Son."
      },
      {
       "id": "s-references-44-5",
       "original": "Conditional variational autoencoder with adversarial learning for end-to-end text-to-speech."
      },
      {
       "id": "s-references-44-6",
       "original": "In International Conference on Machine Learning, 2021."
      }
     ]
    },
    {
     "id": "p-references-45",
     "type": "paragraph",
     "page": 22,
     "sentences": [
      {
       "id": "s-references-45-1",
       "original": "D."
      },
      {
       "id": "s-references-45-2",
       "original": "P."
      },
      {
       "id": "s-references-45-3",
       "original": "Kingma and J."
      },
      {
       "id": "s-references-45-4",
       "original": "Ba."
      },
      {
       "id": "s-references-45-5",
       "original": "Adam: A method for stochastic optimization."
      },
      {
       "id": "s-references-45-6",
       "original": "CoRR, abs/1412.6980, 2014."
      }
     ]
    },
    {
     "id": "p-references-46",
     "type": "paragraph",
     "page": 22,
     "sentences": [
      {
       "id": "s-references-46-1",
       "original": "D."
      },
      {
       "id": "s-references-46-2",
       "original": "P."
      },
      {
       "id": "s-references-46-3",
       "original": "Kingma and P."
      },
      {
       "id": "s-references-46-4",
       "original": "Dhariwal."
      },
      {
       "id": "s-references-46-5",
       "original": "Glow: Generative flow with invertible 1x1 convolutions."
      },
      {
       "id": "s-references-46-6",
       "original": "Advances in neural information processing systems, 31, 2018."
      }
     ]
    },
    {
     "id": "p-references-47",
     "type": "paragraph",
     "page": 22,
     "sentences": [
      {
       "id": "s-references-47-1",
       "original": "F."
      },
      {
       "id": "s-references-47-2",
       "original": "Kreuk, A."
      },
      {
       "id": "s-references-47-3",
       "original": "Polyak, J."
      },
      {
       "id": "s-references-47-4",
       "original": "Copet, E."
      },
      {
       "id": "s-references-47-5",
       "original": "Kharitonov, T.-A."
      },
      {
       "id": "s-references-47-6",
       "original": "Nguyen, M."
      },
      {
       "id": "s-references-47-7",
       "original": "Rivière, W.-N."
      },
      {
       "id": "s-references-47-8",
       "original": "Hsu, A."
      },
      {
       "id": "s-references-47-9",
       "original": "Mohamed, E."
      },
      {
       "id": "s-references-47-10",
       "original": "Dupoux, and Y."
      },
      {
       "id": "s-references-47-11",
       "original": "Adi."
      },
      {
       "id": "s-references-47-12",
       "original": "Textless speech emotion conversion using decomposed and discrete representations."
      },
      {
       "id": "s-references-47-13",
       "original": "In Proceedings of the 2022 Conference on Empirical Methods in Natural Language Processing, 2022."
      }
     ]
    },
    {
     "id": "p-references-48",
     "type": "paragraph",
     "page": 22,
     "sentences": [
      {
       "id": "s-references-48-1",
       "original": "R."
      },
      {
       "id": "s-references-48-2",
       "original": "Kubichek."
      },
      {
       "id": "s-references-48-3",
       "original": "Mel-cepstral distance measure for objective speech quality assessment."
      },
      {
       "id": "s-references-48-4",
       "original": "In Proceedings of IEEE pacific rim conference on communications computers and signal processing, volume 1, pages 125–128."
      },
      {
       "id": "s-references-48-5",
       "original": "IEEE, 1993."
      }
     ]
    },
    {
     "id": "p-references-49",
     "type": "paragraph",
     "page": 22,
     "sentences": [
      {
       "id": "s-references-49-1",
       "original": "K."
      },
      {
       "id": "s-references-49-2",
       "original": "Lakhotia, E."
      },
      {
       "id": "s-references-49-3",
       "original": "Kharitonov, W.-N."
      },
      {
       "id": "s-references-49-4",
       "original": "Hsu, Y."
      },
      {
       "id": "s-references-49-5",
       "original": "Adi, A."
      },
      {
       "id": "s-references-49-6",
       "original": "Polyak, B."
      },
      {
       "id": "s-references-49-7",
       "original": "Bolte, T."
      },
      {
       "id": "s-references-49-8",
       "original": "Nguyen, J."
      },
      {
       "id": "s-references-49-9",
       "original": "Copet, A."
      },
      {
       "id": "s-references-49-10",
       "original": "Baevski, A."
      },
      {
       "id": "s-references-49-11",
       "original": "B."
      },
      {
       "id": "s-references-49-12",
       "original": "Mohamed, and E."
      },
      {
       "id": "s-references-49-13",
       "original": "Dupoux."
      },
      {
       "id": "s-references-49-14",
       "original": "On generative spoken language modeling from raw audio."
      }
     ]
    },
    {
     "id": "p-references-50",
     "type": "paragraph",
     "page": 22,
     "sentences": [
      {
       "id": "s-references-50-1",
       "original": "Transactions of the Association for Computational Linguistics, 9:1336–1354, 2021."
      }
     ]
    },
    {
     "id": "p-references-51",
     "type": "paragraph",
     "page": 22,
     "sentences": [
      {
       "id": "s-references-51-1",
       "original": "A. Ła´ncucki."
      },
      {
       "id": "s-references-51-2",
       "original": "Fastpitch: Parallel text-to-speech with pitch prediction."
      },
      {
       "id": "s-references-51-3",
       "original": "In International Conference on Acoustics, Speech and Signal Processing, 2021."
      }
     ]
    },
    {
     "id": "p-references-52",
     "type": "paragraph",
     "page": 22,
     "sentences": [
      {
       "id": "s-references-52-1",
       "original": "J."
      },
      {
       "id": "s-references-52-2",
       "original": "Le Roux, S."
      },
      {
       "id": "s-references-52-3",
       "original": "Wisdom, H."
      },
      {
       "id": "s-references-52-4",
       "original": "Erdogan, and J."
      },
      {
       "id": "s-references-52-5",
       "original": "R."
      },
      {
       "id": "s-references-52-6",
       "original": "Hershey."
      },
      {
       "id": "s-references-52-7",
       "original": "Sdr–half-baked or well done?"
      },
      {
       "id": "s-references-52-8",
       "original": "In ICASSP 2019-2019 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP), pages 626–630."
      },
      {
       "id": "s-references-52-9",
       "original": "IEEE, 2019."
      }
     ]
    },
    {
     "id": "p-references-53",
     "type": "paragraph",
     "page": 22,
     "sentences": [
      {
       "id": "s-references-53-1",
       "original": "Y."
      },
      {
       "id": "s-references-53-2",
       "original": "Lipman, R."
      },
      {
       "id": "s-references-53-3",
       "original": "T."
      },
      {
       "id": "s-references-53-4",
       "original": "Q."
      },
      {
       "id": "s-references-53-5",
       "original": "Chen, H."
      },
      {
       "id": "s-references-53-6",
       "original": "Ben-Hamu, M."
      },
      {
       "id": "s-references-53-7",
       "original": "Nickel, and M."
      },
      {
       "id": "s-references-53-8",
       "original": "Le."
      },
      {
       "id": "s-references-53-9",
       "original": "Flow matching for generative modeling."
      },
      {
       "id": "s-references-53-10",
       "original": "In International Conference on Learning Representations, 2023."
      }
     ]
    },
    {
     "id": "p-references-54",
     "type": "paragraph",
     "page": 22,
     "sentences": [
      {
       "id": "s-references-54-1",
       "original": "J."
      },
      {
       "id": "s-references-54-2",
       "original": "Lorenzo-Trueba, J."
      },
      {
       "id": "s-references-54-3",
       "original": "Yamagishi, T."
      },
      {
       "id": "s-references-54-4",
       "original": "Toda, D."
      },
      {
       "id": "s-references-54-5",
       "original": "Saito, F."
      },
      {
       "id": "s-references-54-6",
       "original": "Villavicencio, T."
      },
      {
       "id": "s-references-54-7",
       "original": "H."
      },
      {
       "id": "s-references-54-8",
       "original": "Kinnunen, and Z."
      },
      {
       "id": "s-references-54-9",
       "original": "Ling."
      }
     ]
    },
    {
     "id": "p-references-55",
     "type": "paragraph",
     "page": 22,
     "sentences": [
      {
       "id": "s-references-55-1",
       "original": "The voice conversion challenge 2018: Promoting development of parallel and nonparallel methods."
      },
      {
       "id": "s-references-55-2",
       "original": "ArXiv, abs/1804.04262, 2018."
      }
     ]
    },
    {
     "id": "p-references-56",
     "type": "paragraph",
     "page": 22,
     "sentences": [
      {
       "id": "s-references-56-1",
       "original": "M."
      },
      {
       "id": "s-references-56-2",
       "original": "McAuliffe, M."
      },
      {
       "id": "s-references-56-3",
       "original": "Socolof, S."
      },
      {
       "id": "s-references-56-4",
       "original": "Mihuc, M."
      },
      {
       "id": "s-references-56-5",
       "original": "Wagner, and M."
      },
      {
       "id": "s-references-56-6",
       "original": "Sonderegger."
      },
      {
       "id": "s-references-56-7",
       "original": "Montreal forced aligner: Trainable text-speech alignment using kaldi."
      },
      {
       "id": "s-references-56-8",
       "original": "In Interspeech, 2017."
      }
     ]
    },
    {
     "id": "p-references-57",
     "type": "paragraph",
     "page": 22,
     "sentences": [
      {
       "id": "s-references-57-1",
       "original": "T."
      },
      {
       "id": "s-references-57-2",
       "original": "Nguyen, E."
      },
      {
       "id": "s-references-57-3",
       "original": "Kharitonov, J."
      },
      {
       "id": "s-references-57-4",
       "original": "Copet, Y."
      },
      {
       "id": "s-references-57-5",
       "original": "Adi, W.-N."
      },
      {
       "id": "s-references-57-6",
       "original": "Hsu, A."
      },
      {
       "id": "s-references-57-7",
       "original": "M."
      },
      {
       "id": "s-references-57-8",
       "original": "Elkahky, P."
      },
      {
       "id": "s-references-57-9",
       "original": "Tomasello, R."
      },
      {
       "id": "s-references-57-10",
       "original": "Algayres, B."
      },
      {
       "id": "s-references-57-11",
       "original": "Sagot, A."
      },
      {
       "id": "s-references-57-12",
       "original": "Mohamed, and E."
      },
      {
       "id": "s-references-57-13",
       "original": "Dupoux."
      },
      {
       "id": "s-references-57-14",
       "original": "Generative spoken dialogue language modeling."
      },
      {
       "id": "s-references-57-15",
       "original": "Transactions of the Association for Computational Linguistics, 11:250–266, 2022."
      }
     ]
    },
    {
     "id": "p-references-58",
     "type": "paragraph",
     "page": 22,
     "sentences": [
      {
       "id": "s-references-58-1",
       "original": "A."
      },
      {
       "id": "s-references-58-2",
       "original": "Nichol, P."
      },
      {
       "id": "s-references-58-3",
       "original": "Dhariwal, A."
      },
      {
       "id": "s-references-58-4",
       "original": "Ramesh, P."
      },
      {
       "id": "s-references-58-5",
       "original": "Shyam, P."
      },
      {
       "id": "s-references-58-6",
       "original": "Mishkin, B."
      },
      {
       "id": "s-references-58-7",
       "original": "McGrew, I."
      },
      {
       "id": "s-references-58-8",
       "original": "Sutskever, and M."
      },
      {
       "id": "s-references-58-9",
       "original": "Chen."
      }
     ]
    },
    {
     "id": "p-references-59",
     "type": "paragraph",
     "page": 22,
     "sentences": [
      {
       "id": "s-references-59-1",
       "original": "GLIDE: Towards photorealistic image generation and editing with text-guided diffusion models."
      },
      {
       "id": "s-references-59-2",
       "original": "In International Conference on Machine Learning, 2021."
      }
     ]
    },
    {
     "id": "p-references-60",
     "type": "paragraph",
     "page": 22,
     "sentences": [
      {
       "id": "s-references-60-1",
       "original": "V."
      },
      {
       "id": "s-references-60-2",
       "original": "Panayotov, G."
      },
      {
       "id": "s-references-60-3",
       "original": "Chen, D."
      },
      {
       "id": "s-references-60-4",
       "original": "Povey, and S."
      },
      {
       "id": "s-references-60-5",
       "original": "Khudanpur."
      },
      {
       "id": "s-references-60-6",
       "original": "Librispeech: An asr corpus based on public domain audio books."
      },
      {
       "id": "s-references-60-7",
       "original": "International Conference on Acoustics, Speech and Signal Processing, 2015."
      }
     ]
    },
    {
     "id": "p-references-61",
     "type": "paragraph",
     "page": 22,
     "sentences": [
      {
       "id": "s-references-61-1",
       "original": "D."
      },
      {
       "id": "s-references-61-2",
       "original": "S."
      },
      {
       "id": "s-references-61-3",
       "original": "Park, W."
      },
      {
       "id": "s-references-61-4",
       "original": "Chan, Y."
      },
      {
       "id": "s-references-61-5",
       "original": "Zhang, C.-C."
      },
      {
       "id": "s-references-61-6",
       "original": "Chiu, B."
      },
      {
       "id": "s-references-61-7",
       "original": "Zoph, E."
      },
      {
       "id": "s-references-61-8",
       "original": "D."
      },
      {
       "id": "s-references-61-9",
       "original": "Cubuk, and Q."
      },
      {
       "id": "s-references-61-10",
       "original": "V."
      },
      {
       "id": "s-references-61-11",
       "original": "Le."
      },
      {
       "id": "s-references-61-12",
       "original": "SpecAugment: A simple data augmentation method for automatic speech recognition."
      },
      {
       "id": "s-references-61-13",
       "original": "In Interspeech, 2019."
      }
     ]
    },
    {
     "id": "p-references-62",
     "type": "paragraph",
     "page": 22,
     "sentences": [
      {
       "id": "s-references-62-1",
       "original": "A."
      },
      {
       "id": "s-references-62-2",
       "original": "Paszke, S."
      },
      {
       "id": "s-references-62-3",
       "original": "Gross, F."
      },
      {
       "id": "s-references-62-4",
       "original": "Massa, A."
      },
      {
       "id": "s-references-62-5",
       "original": "Lerer, J."
      },
      {
       "id": "s-references-62-6",
       "original": "Bradbury, G."
      },
      {
       "id": "s-references-62-7",
       "original": "Chanan, T."
      },
      {
       "id": "s-references-62-8",
       "original": "Killeen, Z."
      },
      {
       "id": "s-references-62-9",
       "original": "Lin, N."
      },
      {
       "id": "s-references-62-10",
       "original": "Gimelshein, L."
      },
      {
       "id": "s-references-62-11",
       "original": "Antiga, et al. Pytorch: An imperative style, high-performance deep learning library."
      },
      {
       "id": "s-references-62-12",
       "original": "Advances in neural information processing systems, 2019."
      }
     ]
    },
    {
     "id": "p-references-63",
     "type": "paragraph",
     "page": 23,
     "sentences": [
      {
       "id": "s-references-63-1",
       "original": "A."
      },
      {
       "id": "s-references-63-2",
       "original": "Polyak, Y."
      },
      {
       "id": "s-references-63-3",
       "original": "Adi, J."
      },
      {
       "id": "s-references-63-4",
       "original": "Copet, E."
      },
      {
       "id": "s-references-63-5",
       "original": "Kharitonov, K."
      },
      {
       "id": "s-references-63-6",
       "original": "Lakhotia, W.-N."
      },
      {
       "id": "s-references-63-7",
       "original": "Hsu, A."
      },
      {
       "id": "s-references-63-8",
       "original": "Mohamed, and E."
      },
      {
       "id": "s-references-63-9",
       "original": "Dupoux."
      }
     ]
    },
    {
     "id": "p-references-64",
     "type": "paragraph",
     "page": 23,
     "sentences": [
      {
       "id": "s-references-64-1",
       "original": "Speech resynthesis from discrete disentangled self-supervised representations."
      },
      {
       "id": "s-references-64-2",
       "original": "In Interspeech, 2021."
      }
     ]
    },
    {
     "id": "p-references-65",
     "type": "paragraph",
     "page": 23,
     "sentences": [
      {
       "id": "s-references-65-1",
       "original": "V."
      },
      {
       "id": "s-references-65-2",
       "original": "Popov, I."
      },
      {
       "id": "s-references-65-3",
       "original": "Vovk, V."
      },
      {
       "id": "s-references-65-4",
       "original": "Gogoryan, T."
      },
      {
       "id": "s-references-65-5",
       "original": "Sadekova, and M."
      },
      {
       "id": "s-references-65-6",
       "original": "Kudinov."
      },
      {
       "id": "s-references-65-7",
       "original": "Grad-TTS: A diffusion probabilistic model for text-to-speech."
      },
      {
       "id": "s-references-65-8",
       "original": "In International Conference on Machine Learning, 2021."
      }
     ]
    },
    {
     "id": "p-references-66",
     "type": "paragraph",
     "page": 23,
     "sentences": [
      {
       "id": "s-references-66-1",
       "original": "D."
      },
      {
       "id": "s-references-66-2",
       "original": "Povey, A."
      },
      {
       "id": "s-references-66-3",
       "original": "Ghoshal, G."
      },
      {
       "id": "s-references-66-4",
       "original": "Boulianne, L."
      },
      {
       "id": "s-references-66-5",
       "original": "Burget, O."
      },
      {
       "id": "s-references-66-6",
       "original": "Glembek, N."
      },
      {
       "id": "s-references-66-7",
       "original": "Goel, M."
      },
      {
       "id": "s-references-66-8",
       "original": "Hannemann, P."
      },
      {
       "id": "s-references-66-9",
       "original": "Motlicek, Y."
      },
      {
       "id": "s-references-66-10",
       "original": "Qian, P."
      },
      {
       "id": "s-references-66-11",
       "original": "Schwarz, et al. The kaldi speech recognition toolkit."
      },
      {
       "id": "s-references-66-12",
       "original": "In Workshop on automatic speech recognition and understanding, 2011."
      }
     ]
    },
    {
     "id": "p-references-67",
     "type": "paragraph",
     "page": 23,
     "sentences": [
      {
       "id": "s-references-67-1",
       "original": "O."
      },
      {
       "id": "s-references-67-2",
       "original": "Press, N."
      },
      {
       "id": "s-references-67-3",
       "original": "A."
      },
      {
       "id": "s-references-67-4",
       "original": "Smith, and M."
      },
      {
       "id": "s-references-67-5",
       "original": "Lewis."
      },
      {
       "id": "s-references-67-6",
       "original": "Train short, test long: Attention with linear biases enables input length extrapolation."
      },
      {
       "id": "s-references-67-7",
       "original": "ArXiv, abs/2108.12409, 2021."
      }
     ]
    },
    {
     "id": "p-references-68",
     "type": "paragraph",
     "page": 23,
     "sentences": [
      {
       "id": "s-references-68-1",
       "original": "A."
      },
      {
       "id": "s-references-68-2",
       "original": "Radford, J."
      },
      {
       "id": "s-references-68-3",
       "original": "W."
      },
      {
       "id": "s-references-68-4",
       "original": "Kim, T."
      },
      {
       "id": "s-references-68-5",
       "original": "Xu, G."
      },
      {
       "id": "s-references-68-6",
       "original": "Brockman, C."
      },
      {
       "id": "s-references-68-7",
       "original": "McLeavey, and I."
      },
      {
       "id": "s-references-68-8",
       "original": "Sutskever."
      },
      {
       "id": "s-references-68-9",
       "original": "Robust speech recognition via large-scale weak supervision."
      },
      {
       "id": "s-references-68-10",
       "original": "ArXiv, abs/2212.04356, 2022."
      }
     ]
    },
    {
     "id": "p-references-69",
     "type": "paragraph",
     "page": 23,
     "sentences": [
      {
       "id": "s-references-69-1",
       "original": "A."
      },
      {
       "id": "s-references-69-2",
       "original": "Ramesh, M."
      },
      {
       "id": "s-references-69-3",
       "original": "Pavlov, G."
      },
      {
       "id": "s-references-69-4",
       "original": "Goh, S."
      },
      {
       "id": "s-references-69-5",
       "original": "Gray, C."
      },
      {
       "id": "s-references-69-6",
       "original": "Voss, A."
      },
      {
       "id": "s-references-69-7",
       "original": "Radford, M."
      },
      {
       "id": "s-references-69-8",
       "original": "Chen, and I."
      },
      {
       "id": "s-references-69-9",
       "original": "Sutskever."
      },
      {
       "id": "s-references-69-10",
       "original": "Zero-shot text-to-image generation."
      },
      {
       "id": "s-references-69-11",
       "original": "ArXiv, abs/2102.12092, 2021."
      }
     ]
    },
    {
     "id": "p-references-70",
     "type": "paragraph",
     "page": 23,
     "sentences": [
      {
       "id": "s-references-70-1",
       "original": "Y."
      },
      {
       "id": "s-references-70-2",
       "original": "Ren, C."
      },
      {
       "id": "s-references-70-3",
       "original": "Hu, X."
      },
      {
       "id": "s-references-70-4",
       "original": "Tan, T."
      },
      {
       "id": "s-references-70-5",
       "original": "Qin, S."
      },
      {
       "id": "s-references-70-6",
       "original": "Zhao, Z."
      },
      {
       "id": "s-references-70-7",
       "original": "Zhao, and T.-Y."
      },
      {
       "id": "s-references-70-8",
       "original": "Liu."
      },
      {
       "id": "s-references-70-9",
       "original": "Fastspeech 2: Fast and high-quality end-to-end text to speech."
      },
      {
       "id": "s-references-70-10",
       "original": "In International Conference on Learning Representations, 2021."
      }
     ]
    },
    {
     "id": "p-references-71",
     "type": "paragraph",
     "page": 23,
     "sentences": [
      {
       "id": "s-references-71-1",
       "original": "F."
      },
      {
       "id": "s-references-71-2",
       "original": "Ribeiro, D."
      },
      {
       "id": "s-references-71-3",
       "original": "Florêncio, C."
      },
      {
       "id": "s-references-71-4",
       "original": "Zhang, and M."
      },
      {
       "id": "s-references-71-5",
       "original": "Seltzer."
      },
      {
       "id": "s-references-71-6",
       "original": "CrowdMOS: An approach for crowdsourcing mean opinion score studies."
      },
      {
       "id": "s-references-71-7",
       "original": "In International Conference on Acoustics, Speech and Signal Processing, 2011."
      }
     ]
    },
    {
     "id": "p-references-72",
     "type": "paragraph",
     "page": 23,
     "sentences": [
      {
       "id": "s-references-72-1",
       "original": "C."
      },
      {
       "id": "s-references-72-2",
       "original": "Robinson, N."
      },
      {
       "id": "s-references-72-3",
       "original": "Obin, and A."
      },
      {
       "id": "s-references-72-4",
       "original": "Roebel."
      },
      {
       "id": "s-references-72-5",
       "original": "Sequence-to-sequence modelling of F0 for speech emotion conversion."
      },
      {
       "id": "s-references-72-6",
       "original": "In International Conference on Acoustics, Speech and Signal Processing, 2019."
      }
     ]
    },
    {
     "id": "p-references-73",
     "type": "paragraph",
     "page": 23,
     "sentences": [
      {
       "id": "s-references-73-1",
       "original": "R."
      },
      {
       "id": "s-references-73-2",
       "original": "Rombach, A."
      },
      {
       "id": "s-references-73-3",
       "original": "Blattmann, D."
      },
      {
       "id": "s-references-73-4",
       "original": "Lorenz, P."
      },
      {
       "id": "s-references-73-5",
       "original": "Esser, and B."
      },
      {
       "id": "s-references-73-6",
       "original": "Ommer."
      },
      {
       "id": "s-references-73-7",
       "original": "High-resolution image synthesis with latent diffusion models."
      },
      {
       "id": "s-references-73-8",
       "original": "In Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition, 2022."
      }
     ]
    },
    {
     "id": "p-references-74",
     "type": "paragraph",
     "page": 23,
     "sentences": [
      {
       "id": "s-references-74-1",
       "original": "C."
      },
      {
       "id": "s-references-74-2",
       "original": "Saharia, W."
      },
      {
       "id": "s-references-74-3",
       "original": "Chan, H."
      },
      {
       "id": "s-references-74-4",
       "original": "Chang, C."
      },
      {
       "id": "s-references-74-5",
       "original": "Lee, J."
      },
      {
       "id": "s-references-74-6",
       "original": "Ho, T."
      },
      {
       "id": "s-references-74-7",
       "original": "Salimans, D."
      },
      {
       "id": "s-references-74-8",
       "original": "Fleet, and M."
      },
      {
       "id": "s-references-74-9",
       "original": "Norouzi."
      },
      {
       "id": "s-references-74-10",
       "original": "Palette: Image-to-image diffusion models."
      },
      {
       "id": "s-references-74-11",
       "original": "In ACM SIGGRAPH 2022 Conference Proceedings, 2022."
      }
     ]
    },
    {
     "id": "p-references-75",
     "type": "paragraph",
     "page": 23,
     "sentences": [
      {
       "id": "s-references-75-1",
       "original": "J."
      },
      {
       "id": "s-references-75-2",
       "original": "Serrà, S."
      },
      {
       "id": "s-references-75-3",
       "original": "Pascual, J."
      },
      {
       "id": "s-references-75-4",
       "original": "Pons, R."
      },
      {
       "id": "s-references-75-5",
       "original": "O."
      },
      {
       "id": "s-references-75-6",
       "original": "Araz, and D."
      },
      {
       "id": "s-references-75-7",
       "original": "Scaini."
      },
      {
       "id": "s-references-75-8",
       "original": "Universal speech enhancement with score-based diffusion."
      },
      {
       "id": "s-references-75-9",
       "original": "ArXiv, abs/2206.03065, 2022."
      }
     ]
    },
    {
     "id": "p-references-76",
     "type": "paragraph",
     "page": 23,
     "sentences": [
      {
       "id": "s-references-76-1",
       "original": "J."
      },
      {
       "id": "s-references-76-2",
       "original": "Shen, R."
      },
      {
       "id": "s-references-76-3",
       "original": "Pang, R."
      },
      {
       "id": "s-references-76-4",
       "original": "J."
      },
      {
       "id": "s-references-76-5",
       "original": "Weiss, M."
      },
      {
       "id": "s-references-76-6",
       "original": "Schuster, N."
      },
      {
       "id": "s-references-76-7",
       "original": "Jaitly, Z."
      },
      {
       "id": "s-references-76-8",
       "original": "Yang, Z."
      },
      {
       "id": "s-references-76-9",
       "original": "Chen, Y."
      },
      {
       "id": "s-references-76-10",
       "original": "Zhang, Y."
      },
      {
       "id": "s-references-76-11",
       "original": "Wang, R."
      },
      {
       "id": "s-references-76-12",
       "original": "J."
      },
      {
       "id": "s-references-76-13",
       "original": "SkerryRyan, R."
      },
      {
       "id": "s-references-76-14",
       "original": "A."
      },
      {
       "id": "s-references-76-15",
       "original": "Saurous, Y."
      },
      {
       "id": "s-references-76-16",
       "original": "Agiomyrgiannakis, and Y."
      },
      {
       "id": "s-references-76-17",
       "original": "Wu."
      },
      {
       "id": "s-references-76-18",
       "original": "Natural TTS synthesis by conditioning wavenet on mel spectrogram predictions."
      },
      {
       "id": "s-references-76-19",
       "original": "International Conference on Acoustics, Speech and Signal Processing, 2017."
      }
     ]
    },
    {
     "id": "p-references-77",
     "type": "paragraph",
     "page": 23,
     "sentences": [
      {
       "id": "s-references-77-1",
       "original": "K."
      },
      {
       "id": "s-references-77-2",
       "original": "Shen, Z."
      },
      {
       "id": "s-references-77-3",
       "original": "Ju, X."
      },
      {
       "id": "s-references-77-4",
       "original": "Tan, Y."
      },
      {
       "id": "s-references-77-5",
       "original": "Liu, Y."
      },
      {
       "id": "s-references-77-6",
       "original": "Leng, L."
      },
      {
       "id": "s-references-77-7",
       "original": "He, T."
      },
      {
       "id": "s-references-77-8",
       "original": "Qin, S."
      },
      {
       "id": "s-references-77-9",
       "original": "Zhao, and J."
      },
      {
       "id": "s-references-77-10",
       "original": "Bian."
      },
      {
       "id": "s-references-77-11",
       "original": "Naturalspeech 2: Latent diffusion models are natural and zero-shot speech and singing synthesizers. arXiv preprint arXiv:2304.09116, 2023."
      }
     ]
    },
    {
     "id": "p-references-78",
     "type": "paragraph",
     "page": 23,
     "sentences": [
      {
       "id": "s-references-78-1",
       "original": "R."
      },
      {
       "id": "s-references-78-2",
       "original": "Skerry-Ryan, E."
      },
      {
       "id": "s-references-78-3",
       "original": "Battenberg, Y."
      },
      {
       "id": "s-references-78-4",
       "original": "Xiao, Y."
      },
      {
       "id": "s-references-78-5",
       "original": "Wang, D."
      },
      {
       "id": "s-references-78-6",
       "original": "Stanton, J."
      },
      {
       "id": "s-references-78-7",
       "original": "Shor, R."
      },
      {
       "id": "s-references-78-8",
       "original": "Weiss, R."
      },
      {
       "id": "s-references-78-9",
       "original": "Clark, and R."
      },
      {
       "id": "s-references-78-10",
       "original": "A."
      }
     ]
    },
    {
     "id": "p-references-79",
     "type": "paragraph",
     "page": 23,
     "sentences": [
      {
       "id": "s-references-79-1",
       "original": "Saurous."
      },
      {
       "id": "s-references-79-2",
       "original": "Towards end-to-end prosody transfer for expressive speech synthesis with tacotron."
      },
      {
       "id": "s-references-79-3",
       "original": "In international conference on machine learning, pages 4693–4702."
      },
      {
       "id": "s-references-79-4",
       "original": "PMLR, 2018."
      }
     ]
    },
    {
     "id": "p-references-80",
     "type": "paragraph",
     "page": 23,
     "sentences": [
      {
       "id": "s-references-80-1",
       "original": "Y."
      },
      {
       "id": "s-references-80-2",
       "original": "Song and S."
      },
      {
       "id": "s-references-80-3",
       "original": "Ermon."
      },
      {
       "id": "s-references-80-4",
       "original": "Generative modeling by estimating gradients of the data distribution."
      },
      {
       "id": "s-references-80-5",
       "original": "Advances in neural information processing systems, 32, 2019."
      }
     ]
    },
    {
     "id": "p-references-81",
     "type": "paragraph",
     "page": 23,
     "sentences": [
      {
       "id": "s-references-81-1",
       "original": "X."
      },
      {
       "id": "s-references-81-2",
       "original": "Tan, J."
      },
      {
       "id": "s-references-81-3",
       "original": "Chen, H."
      },
      {
       "id": "s-references-81-4",
       "original": "Liu, J."
      },
      {
       "id": "s-references-81-5",
       "original": "Cong, C."
      },
      {
       "id": "s-references-81-6",
       "original": "Zhang, Y."
      },
      {
       "id": "s-references-81-7",
       "original": "Liu, X."
      },
      {
       "id": "s-references-81-8",
       "original": "Wang, Y."
      },
      {
       "id": "s-references-81-9",
       "original": "Leng, Y."
      },
      {
       "id": "s-references-81-10",
       "original": "Yi, L."
      },
      {
       "id": "s-references-81-11",
       "original": "He, F."
      },
      {
       "id": "s-references-81-12",
       "original": "K."
      },
      {
       "id": "s-references-81-13",
       "original": "Soong, T."
      },
      {
       "id": "s-references-81-14",
       "original": "Qin, S."
      },
      {
       "id": "s-references-81-15",
       "original": "Zhao, and T.-Y."
      },
      {
       "id": "s-references-81-16",
       "original": "Liu."
      },
      {
       "id": "s-references-81-17",
       "original": "NaturalSpeech: End-to-end text to speech synthesis with human-level quality."
      },
      {
       "id": "s-references-81-18",
       "original": "ArXiv, abs/2205.04421, 2022."
      }
     ]
    },
    {
     "id": "p-references-82",
     "type": "paragraph",
     "page": 23,
     "sentences": [
      {
       "id": "s-references-82-1",
       "original": "A."
      },
      {
       "id": "s-references-82-2",
       "original": "Vaswani, N."
      },
      {
       "id": "s-references-82-3",
       "original": "M."
      },
      {
       "id": "s-references-82-4",
       "original": "Shazeer, N."
      },
      {
       "id": "s-references-82-5",
       "original": "Parmar, J."
      },
      {
       "id": "s-references-82-6",
       "original": "Uszkoreit, L."
      },
      {
       "id": "s-references-82-7",
       "original": "Jones, A."
      },
      {
       "id": "s-references-82-8",
       "original": "N."
      },
      {
       "id": "s-references-82-9",
       "original": "Gomez, L."
      },
      {
       "id": "s-references-82-10",
       "original": "Kaiser, and I."
      },
      {
       "id": "s-references-82-11",
       "original": "Polosukhin."
      },
      {
       "id": "s-references-82-12",
       "original": "Attention is all you need."
      },
      {
       "id": "s-references-82-13",
       "original": "ArXiv, abs/1706.03762, 2017."
      }
     ]
    },
    {
     "id": "p-references-83",
     "type": "paragraph",
     "page": 24,
     "sentences": [
      {
       "id": "s-references-83-1",
       "original": "C."
      },
      {
       "id": "s-references-83-2",
       "original": "Wang, W.-N."
      },
      {
       "id": "s-references-83-3",
       "original": "Hsu, Y."
      },
      {
       "id": "s-references-83-4",
       "original": "Adi, A."
      },
      {
       "id": "s-references-83-5",
       "original": "Polyak, A."
      },
      {
       "id": "s-references-83-6",
       "original": "Lee, P.-J."
      },
      {
       "id": "s-references-83-7",
       "original": "Chen, J."
      },
      {
       "id": "s-references-83-8",
       "original": "Gu, and J."
      },
      {
       "id": "s-references-83-9",
       "original": "M."
      },
      {
       "id": "s-references-83-10",
       "original": "Pino. fairseq s2: A scalable and integrable speech synthesis toolkit."
      },
      {
       "id": "s-references-83-11",
       "original": "In Conference on Empirical Methods in Natural Language Processing, 2021."
      }
     ]
    },
    {
     "id": "p-references-84",
     "type": "paragraph",
     "page": 24,
     "sentences": [
      {
       "id": "s-references-84-1",
       "original": "C."
      },
      {
       "id": "s-references-84-2",
       "original": "Wang, S."
      },
      {
       "id": "s-references-84-3",
       "original": "Chen, Y."
      },
      {
       "id": "s-references-84-4",
       "original": "Wu, Z.-H."
      },
      {
       "id": "s-references-84-5",
       "original": "Zhang, L."
      },
      {
       "id": "s-references-84-6",
       "original": "Zhou, S."
      },
      {
       "id": "s-references-84-7",
       "original": "Liu, Z."
      },
      {
       "id": "s-references-84-8",
       "original": "Chen, Y."
      },
      {
       "id": "s-references-84-9",
       "original": "Liu, H."
      },
      {
       "id": "s-references-84-10",
       "original": "Wang, J."
      },
      {
       "id": "s-references-84-11",
       "original": "Li, L."
      },
      {
       "id": "s-references-84-12",
       "original": "He, S."
      },
      {
       "id": "s-references-84-13",
       "original": "Zhao, and F."
      },
      {
       "id": "s-references-84-14",
       "original": "Wei."
      },
      {
       "id": "s-references-84-15",
       "original": "Neural codec language models are zero-shot text to speech synthesizers."
      }
     ]
    },
    {
     "id": "p-references-85",
     "type": "paragraph",
     "page": 24,
     "sentences": [
      {
       "id": "s-references-85-1",
       "original": "ArXiv, abs/2301.02111, 2023."
      }
     ]
    },
    {
     "id": "p-references-86",
     "type": "paragraph",
     "page": 24,
     "sentences": [
      {
       "id": "s-references-86-1",
       "original": "Y."
      },
      {
       "id": "s-references-86-2",
       "original": "Wang, D."
      },
      {
       "id": "s-references-86-3",
       "original": "Stanton, Y."
      },
      {
       "id": "s-references-86-4",
       "original": "Zhang, R."
      },
      {
       "id": "s-references-86-5",
       "original": "J."
      },
      {
       "id": "s-references-86-6",
       "original": "Skerry-Ryan, E."
      },
      {
       "id": "s-references-86-7",
       "original": "Battenberg, J."
      },
      {
       "id": "s-references-86-8",
       "original": "Shor, Y."
      },
      {
       "id": "s-references-86-9",
       "original": "Xiao, F."
      },
      {
       "id": "s-references-86-10",
       "original": "Ren, Y."
      },
      {
       "id": "s-references-86-11",
       "original": "Jia, and R."
      },
      {
       "id": "s-references-86-12",
       "original": "A."
      },
      {
       "id": "s-references-86-13",
       "original": "Saurous."
      },
      {
       "id": "s-references-86-14",
       "original": "Style tokens: Unsupervised style modeling, control and transfer in end-to-end speech synthesis."
      },
      {
       "id": "s-references-86-15",
       "original": "In International Conference on Machine Learning, 2018."
      }
     ]
    },
    {
     "id": "p-references-87",
     "type": "paragraph",
     "page": 24,
     "sentences": [
      {
       "id": "s-references-87-1",
       "original": "Y."
      },
      {
       "id": "s-references-87-2",
       "original": "Xu, J."
      },
      {
       "id": "s-references-87-3",
       "original": "Du, L.-R."
      },
      {
       "id": "s-references-87-4",
       "original": "Dai, and C.-H."
      },
      {
       "id": "s-references-87-5",
       "original": "Lee."
      },
      {
       "id": "s-references-87-6",
       "original": "A regression approach to speech enhancement based on deep neural networks."
      },
      {
       "id": "s-references-87-7",
       "original": "IEEE/ACM Transactions on Audio, Speech, and Language Processing, 23(1): 7–19, 2014."
      }
     ]
    },
    {
     "id": "p-references-88",
     "type": "paragraph",
     "page": 24,
     "sentences": [
      {
       "id": "s-references-88-1",
       "original": "J."
      },
      {
       "id": "s-references-88-2",
       "original": "Yamagishi, C."
      },
      {
       "id": "s-references-88-3",
       "original": "Veaux, and K."
      },
      {
       "id": "s-references-88-4",
       "original": "MacDonald."
      },
      {
       "id": "s-references-88-5",
       "original": "Cstr vctk corpus: English multi-speaker corpus for cstr voice cloning toolkit (version 0.92). 2019."
      }
     ]
    },
    {
     "id": "p-references-89",
     "type": "paragraph",
     "page": 24,
     "sentences": [
      {
       "id": "s-references-89-1",
       "original": "R."
      },
      {
       "id": "s-references-89-2",
       "original": "Yamamoto, E."
      },
      {
       "id": "s-references-89-3",
       "original": "Song, and J.-M."
      },
      {
       "id": "s-references-89-4",
       "original": "Kim."
      },
      {
       "id": "s-references-89-5",
       "original": "Parallel WaveGAN: A fast waveform generation model based on generative adversarial networks with multi-resolution spectrogram."
      },
      {
       "id": "s-references-89-6",
       "original": "In International Conference on Acoustics, Speech and Signal Processing, 2020."
      }
     ]
    },
    {
     "id": "p-references-90",
     "type": "paragraph",
     "page": 24,
     "sentences": [
      {
       "id": "s-references-90-1",
       "original": "N."
      },
      {
       "id": "s-references-90-2",
       "original": "Yu, V."
      },
      {
       "id": "s-references-90-3",
       "original": "Skripniuk, S."
      },
      {
       "id": "s-references-90-4",
       "original": "Abdelnabi, and M."
      },
      {
       "id": "s-references-90-5",
       "original": "Fritz."
      },
      {
       "id": "s-references-90-6",
       "original": "Artificial fingerprinting for generative models: Rooting deepfake attribution in training data."
      },
      {
       "id": "s-references-90-7",
       "original": "In Proceedings of the IEEE/CVF International conference on computer vision, pages 14448–14457, 2021."
      }
     ]
    },
    {
     "id": "p-references-91",
     "type": "paragraph",
     "page": 24,
     "sentences": [
      {
       "id": "s-references-91-1",
       "original": "N."
      },
      {
       "id": "s-references-91-2",
       "original": "Zeghidour, A."
      },
      {
       "id": "s-references-91-3",
       "original": "Luebs, A."
      },
      {
       "id": "s-references-91-4",
       "original": "Omran, J."
      },
      {
       "id": "s-references-91-5",
       "original": "Skoglund, and M."
      },
      {
       "id": "s-references-91-6",
       "original": "Tagliasacchi."
      },
      {
       "id": "s-references-91-7",
       "original": "Soundstream: An end-to-end neural audio codec."
      },
      {
       "id": "s-references-91-8",
       "original": "IEEE/ACM Transactions on Audio, Speech, and Language Processing, 30: 495–507, 2022."
      }
     ]
    },
    {
     "id": "p-references-92",
     "type": "paragraph",
     "page": 24,
     "sentences": [
      {
       "id": "s-references-92-1",
       "original": "H."
      },
      {
       "id": "s-references-92-2",
       "original": "Zen, V."
      },
      {
       "id": "s-references-92-3",
       "original": "Dang, R."
      },
      {
       "id": "s-references-92-4",
       "original": "Clark, Y."
      },
      {
       "id": "s-references-92-5",
       "original": "Zhang, R."
      },
      {
       "id": "s-references-92-6",
       "original": "J."
      },
      {
       "id": "s-references-92-7",
       "original": "Weiss, Y."
      },
      {
       "id": "s-references-92-8",
       "original": "Jia, Z."
      },
      {
       "id": "s-references-92-9",
       "original": "Chen, and Y."
      },
      {
       "id": "s-references-92-10",
       "original": "Wu."
      },
      {
       "id": "s-references-92-11",
       "original": "Libritts: A corpus derived from librispeech for text-to-speech. arXiv preprint arXiv:1904.02882, 2019."
      }
     ]
    }
   ]
  },
  {
   "id": "sec-A",
   "num": "A",
   "level": 1,
   "page": 25,
   "title": {
    "original": "Additional Details of Experiment Setup",
    "zh": "附录 A 实验设置的补充细节"
   },
   "blocks": []
  },
  {
   "id": "sec-A-1",
   "num": "A.1",
   "level": 2,
   "page": 25,
   "title": {
    "original": "Vocoder",
    "zh": "A.1 声码器"
   },
   "blocks": [
    {
     "id": "p-A-1-1",
     "type": "paragraph",
     "page": 25,
     "sentences": [
      {
       "id": "s-A-1-1-1",
       "original": "We adapt the HiFi-GAN V1 configuration to generate 16kHz audio from 80 dimensional log Mel spectral features sampled at 100Hz.",
       "zh": "我们改造 HiFi-GAN V1 配置，从以 100Hz 采样的 80 维对数 Mel 频谱特征生成 16kHz 音频。"
      },
      {
       "id": "s-A-1-1-2",
       "original": "To compute the log Mel spectrogram, we use a 1024-point short time Fourier transform with a 640-sample (40ms) analysis window, 160-sample (10ms) shift, and the Hann windowing function to compute the amplitude spectrogram, and then apply an 80 dimension Mel filter with a cutoff frequency at 8kHz.",
       "zh": "计算对数 Mel 频谱图时，使用 1024 点短时傅里叶变换：分析窗 640 样本（40ms）、帧移 160 样本（10ms）、Hann 窗，先计算幅度谱，再施加截止频率 8kHz 的 80 维 Mel 滤波器组。"
      },
      {
       "id": "s-A-1-1-3",
       "original": "The original HiFi-GAN V1 has four transposed convolution blocks for upsampling.",
       "zh": "原版 HiFi-GAN V1 有四个转置卷积上采样块。"
      },
      {
       "id": "s-A-1-1-4",
       "original": "The upsampling factors are [8, 8, 2, 2] and the corresponding kernel sizes are [16, 16, 4, 4].",
       "zh": "上采样因子为 [8, 8, 2, 2]，对应卷积核大小为 [16, 16, 4, 4]。"
      },
      {
       "id": "s-A-1-1-5",
       "original": "Here we only need a total upsampling factor of 160 instead of 256, and we adjust the upsampling factors to [5, 4, 4, 2] and kernel sizes to [11, 8, 8, 4] accordingly.",
       "zh": "这里我们只需总上采样因子 160（而非 256），相应地将上采样因子调整为 [5, 4, 4, 2]，卷积核大小调整为 [11, 8, 8, 4]。"
      },
      {
       "id": "s-A-1-1-6",
       "original": "The other parameters are identical to the HiFi-GAN V1 configuration.",
       "zh": "其余参数与 HiFi-GAN V1 配置相同。"
      },
      {
       "id": "s-A-1-1-7",
       "original": "Total number of parameters is 13M.",
       "zh": "总参数量为 13M。"
      },
      {
       "id": "s-A-1-1-8",
       "original": "We train the adapted HiFi-GAN on the 60K hours of English audiobook data for 1.5M updates on 8 GPUs, which takes 7.5 days.",
       "zh": "我们在 60K 小时英语有声书数据上训练改造后的 HiFi-GAN，使用 8 张 GPU 训练 1.5M 次更新，耗时 7.5 天。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-A-2",
   "num": "A.2",
   "level": 2,
   "page": 25,
   "title": {
    "original": "Phone representation Ghost silence",
    "zh": "A.2 音素表示：幽灵静音"
   },
   "blocks": [
    {
     "id": "p-A-2-1",
     "type": "paragraph",
     "page": 25,
     "sentences": [
      {
       "id": "s-A-2-1-1",
       "original": "The frame-level phonetic transcript used for training is obtained through forcealigning speech and phonetic transcript.",
       "zh": "训练所用的帧级音素转写由语音与音素转写强制对齐得到。"
      },
      {
       "id": "s-A-2-1-2",
       "original": "In particular, a forced aligner may align some frames to a special phone “SIL” for non-speech frames (silence or noise).",
       "zh": "具体而言，强制对齐器可能把部分帧对齐到特殊音素“SIL”，表示非语音帧（静音或噪声）。"
      },
      {
       "id": "s-A-2-1-3",
       "original": "For most forced aligners, only frames between words and frames at the beginning and at the end of an utterance can be aligned to SIL.",
       "zh": "对大多数强制对齐器而言，只有词间以及句首、句尾的帧才能被对齐到 SIL。"
      }
     ]
    },
    {
     "id": "p-A-2-2",
     "type": "paragraph",
     "page": 25,
     "sentences": [
      {
       "id": "s-A-2-2-1",
       "original": "During inference, we are only given the text transcript, which does not tell us where we should insert silence to.",
       "zh": "推理时我们只有文本转写，它并不告诉我们应在何处插入静音。"
      },
      {
       "id": "s-A-2-2-2",
       "original": "Hence, it is desired to have the duration model not only predict the duration for each phone (SIL included), but also predict the existence of SIL at eligible locations (between words and at the two ends of the utterance).",
       "zh": "因此，我们希望时长模型不仅预测每个音素（含 SIL）的时长，还预测合规位置（词间与句两端）是否存在 SIL。"
      },
      {
       "id": "s-A-2-2-3",
       "original": "To tackle it, we introduce ghost silence to our phonetic transcript, which are silences in between words with duration of zero frames.",
       "zh": "为此，我们在音素转写中引入“幽灵静音”（ghost silence）——词间时长为零帧的静音。"
      }
     ]
    },
    {
     "id": "p-A-2-3",
     "type": "paragraph",
     "page": 25,
     "sentences": [
      {
       "id": "s-A-2-3-1",
       "original": "To give an example, suppose the transcript contains three words: “Hey what’s up” with pronunciation “{Hey:[A,B], what’s:[C], up:[D,E,F]}”, and the frame-level phonetic transcript z obtained through forced alignment is z = (SIL A B B SIL C D D D E E F SIL SIL).",
       "zh": "举例：设转写含三个词 “Hey what’s up”，发音为 “{Hey:[A,B], what’s:[C], up:[D,E,F]}”，强制对齐得到的帧级音素转写为 z = (SIL A B B SIL C D D D E E F SIL SIL)。"
      },
      {
       "id": "s-A-2-3-2",
       "original": "The phonetic transcripts becomes y = (SIL A B SIL C SIL D E F SIL), where the ghost silence is highlighted in green.",
       "zh": "（加入幽灵静音后）音素转写变为 y = (SIL A B SIL C SIL D E F SIL)，其中幽灵静音在原图中以绿色标出。"
      },
      {
       "id": "s-A-2-3-3",
       "original": "The corresponding duration would be l = (1, 1, 2, 1, 1, 0, 3, 2, 1, 2).",
       "zh": "对应的时长为 l = (1, 1, 2, 1, 1, 0, 3, 2, 1, 2)。"
      },
      {
       "id": "s-A-2-3-4",
       "original": "A ghost silence is inserted between what’s and up during training, and the duration model should predict the duration of it as zero to indicate that there should not be a pause between the two words.",
       "zh": "训练时在 what’s 与 up 之间插入一个幽灵静音，时长模型应将其时长预测为零，表示两词之间不应有停顿。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-word-position-dependent-phone",
   "num": null,
   "level": 2,
   "page": 25,
   "title": {
    "original": "Word-position-dependent phone",
    "zh": "词位置相关音素"
   },
   "blocks": [
    {
     "id": "p-word-position-dependent-phone-1",
     "type": "paragraph",
     "page": 25,
     "sentences": [
      {
       "id": "s-word-position-dependent-phone-1-1",
       "original": "The possible absence of silence between words in the framelevel phone transcript can make it hard for the audio model to identify word boundaries.",
       "zh": "帧级音素转写中词与词之间可能没有静音，这会让音频模型难以识别词边界。"
      },
      {
       "id": "s-word-position-dependent-phone-1-2",
       "original": "To help the audio model identify the word boundary which is important when reading a sentence, we introduce word-position-dependent phones which are commonly used in Hidden Markov Model based acoustic models for speech recognition [Povey et al., 2011].",
       "zh": "为帮助音频模型识别对朗读句子很重要的词边界，我们引入词位置相关音素——这在基于隐马尔可夫模型的语音识别声学模型中很常见 [Povey et al., 2011]。"
      },
      {
       "id": "s-word-position-dependent-phone-1-3",
       "original": "This adds a postfix to each phone in the transcript to denote where it is in the corresponding word.",
       "zh": "它为转写中的每个音素添加后缀，标明其在所属词中的位置。"
      },
      {
       "id": "s-word-position-dependent-phone-1-4",
       "original": "There are four postfixes: _B for beginning, _E for end, _I for intermediate, and _S for singleton.",
       "zh": "共四个后缀：_B 表示词首，_E 表示词尾，_I 表示词中，_S 表示单音素成词。"
      },
      {
       "id": "s-word-position-dependent-phone-1-5",
       "original": "The above example becomes “{Hey:[A_B,B_E], what’s:[C_S], up:[D_B,E_I,F_E]}” with frame-level phonetic transcript z = (SIL A_B B_E B_E SIL C_S D_B D_B D_B E_I E_I F_E SIL SIL).",
       "zh": "上面的例子变为 “{Hey:[A_B,B_E], what’s:[C_S], up:[D_B,E_I,F_E]}”，帧级音素转写为 z = (SIL A_B B_E B_E SIL C_S D_B D_B D_B E_I E_I F_E SIL SIL)。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-phone-level-mask",
   "num": null,
   "level": 2,
   "page": 25,
   "title": {
    "original": "Phone-level mask",
    "zh": "音素级掩蔽"
   },
   "blocks": [
    {
     "id": "p-phone-level-mask-1",
     "type": "paragraph",
     "page": 25,
     "sentences": [
      {
       "id": "s-phone-level-mask-1-1",
       "original": "In terms of masking, given duration l, the relationship of phone-level mask m′ and frame-level mask m can be written as m = rep(m′, l).",
       "zh": "在掩蔽方面，给定时长 l，音素级掩蔽 m′ 与帧级掩蔽 m 的关系可写为 m = rep(m′, l)。"
      },
      {
       "id": "s-phone-level-mask-1-2",
       "original": "For the applications where a duration model is involved (zero-shot TTS, content editing, diverse speech sampling), the frame-level mask m is extended such that no phone is partially masked.",
       "zh": "对于涉及时长模型的应用（零样本 TTS、内容编辑、多样化语音采样），帧级掩蔽 m 会做扩展，使任何音素都不会被部分掩蔽。"
      },
      {
       "id": "s-phone-level-mask-1-3",
       "original": "In other words, all the frames corresponding to a phone is either entirely masked or entirely unmasked.",
       "zh": "换言之，一个音素对应的所有帧要么整体被掩蔽，要么整体保留。"
      },
      {
       "id": "s-phone-level-mask-1-4",
       "original": "During training, we mask a contiguous chunk of audio, infilling of which is a more challenging task compared to infilling multiple smaller segments.",
       "zh": "训练时我们掩蔽一段连续的音频——相比填充多个较短的片段，填充连续段是更有挑战的任务。"
      },
      {
       "id": "s-phone-level-mask-1-5",
       "original": "All frames that are aligned to a phone are either entirely masked or unmasked.",
       "zh": "对齐到同一音素的所有帧要么整体掩蔽，要么整体保留。"
      },
      {
       "id": "s-phone-level-mask-1-6",
       "original": "Note that masking all frames for a phone is not a necessity but was chosen due to ease of implementation.",
       "zh": "注意，掩蔽音素的全部帧并非必须，只是出于实现简便的选择。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-A-3",
   "num": "A.3",
   "level": 2,
   "page": 25,
   "title": {
    "original": "Data transformation",
    "zh": "A.3 数据变换"
   },
   "blocks": [
    {
     "id": "p-A-3-1",
     "type": "paragraph",
     "page": 25,
     "sentences": [
      {
       "id": "s-A-3-1-1",
       "original": "The Mel spectrogram is normalized with the global mean (-5.8843) and standard deviation (2.2615) to stabilize training.",
       "zh": "Mel 频谱图用全局均值（-5.8843）与标准差（2.2615）归一化以稳定训练。"
      },
      {
       "id": "s-A-3-1-2",
       "original": "The statistics are estimated on 30k random training samples from the 1K hours of English audio.",
       "zh": "统计量从 1K 小时英语音频中随机抽取的 30k 训练样本上估计。"
      },
      {
       "id": "s-A-3-1-3",
       "original": "Input and output duration are dequantized (x ∼U[x −0.5, x + 0.5]) and transformed with log(1 + x) following [Ren et al., 2021].",
       "zh": "输入与输出时长先做去量化（x ∼U[x −0.5, x + 0.5]），再按 [Ren et al., 2021] 做 log(1 + x) 变换。"
      },
      {
       "id": "s-A-3-1-4",
       "original": "Prediction of duration is quantized and clipped such that the minimal duration is greater than or equal to zero.",
       "zh": "时长的预测值经量化并裁剪，使最短时长大于等于零。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-A-4",
   "num": "A.4",
   "level": 2,
   "page": 26,
   "title": {
    "original": "Cross-lingual zero-shot TTS test data filtering",
    "zh": "A.4 跨语言零样本 TTS 测试数据过滤"
   },
   "blocks": [
    {
     "id": "p-A-4-1",
     "type": "paragraph",
     "page": 26,
     "sentences": [
      {
       "id": "s-A-4-1-1",
       "original": "We create a test set for each language by selecting samples from the MLS test split which have Whisper transcription WER lower than 20% (or 30% for Polish and Portugueses test splits which contains less than 1K samples), because we found MLS test set contains many examples with incomplete transcriptions missing a large portion of the utterance.",
       "zh": "我们为每种语言构建测试集：从 MLS 测试划分中选取 Whisper 转写 WER 低于 20% 的样本（对样本不足 1K 的波兰语与葡萄牙语测试划分放宽到 30%），因为我们发现 MLS 测试集中有许多转写不完整、缺失大段语音内容的样本。"
      },
      {
       "id": "s-A-4-1-2",
       "original": "In addition, a small amount of utterances were excluded due to MFA alignment failure.",
       "zh": "此外，少量语音因 MFA 对齐失败被剔除。"
      },
      {
       "id": "s-A-4-1-3",
       "original": "Table A1 lists the number of samples remained for each language.",
       "zh": "表 A1 列出过滤后各语言剩余的样本数。"
      }
     ]
    },
    {
     "id": "p-A-4-2",
     "type": "paragraph",
     "page": 26,
     "sentences": [
      {
       "id": "s-A-4-2-1",
       "original": "Table A1: Number of MLS test samples after filtering.",
       "zh": "表 A1：过滤后的 MLS 测试样本数。"
      },
      {
       "id": "s-A-4-2-2",
       "original": "Language #samples before filtering #samples after filtering English 3769 3535 Spanish 2385 2323 German 3394 3183 French 2426 2284 Polish 520 508 Portuguese 871 838",
       "zh": "（表内数字）语言｜过滤前样本数｜过滤后样本数：英语 3769 3535；西班牙语 2385 2323；德语 3394 3183；法语 2426 2284；波兰语 520 508；葡萄牙语 871 838。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-A-5",
   "num": "A.5",
   "level": 2,
   "page": 26,
   "title": {
    "original": "Setup for training ASR models with synthetic speech",
    "zh": "A.5 用合成语音训练 ASR 模型的设置"
   },
   "blocks": [
    {
     "id": "p-A-5-1",
     "type": "paragraph",
     "page": 26,
     "sentences": [
      {
       "id": "s-A-5-1-1",
       "original": "To train an ASR model in Section 5.5, we extract 80-dimensional log Mel features with a 25ms window and a 10ms frame shift, and then apply global mean-variance normalization.",
       "zh": "为训练 5.5 节中的 ASR 模型，我们提取 80 维对数 Mel 特征（25ms 窗、10ms 帧移），再做全局均值方差归一化。"
      },
      {
       "id": "s-A-5-1-2",
       "original": "The ASR model is an RNN-T with a Conformer-based encoder [Gulati et al., 2020].",
       "zh": "ASR 模型为基于 Conformer 编码器的 RNN-T [Gulati et al., 2020]。"
      },
      {
       "id": "s-A-5-1-3",
       "original": "The conformer applies time scale reduction to the input features with stride 6, embeds them into 512-dimensional vectors, passes these vectors through a 20-layer conformer which has 8 attention heads and 2048-dimensional fully-connected layers.",
       "zh": "Conformer 先以步长 6 对输入特征做时间维下采样，嵌入为 512 维向量，再经过 20 层 Conformer（8 个注意力头、2048 维前馈层）。"
      },
      {
       "id": "s-A-5-1-4",
       "original": "The conformer output is further mapped to 1024 dimensions through a linear layer followed by layer normalization before being passed to the joiner.",
       "zh": "Conformer 输出先经线性层映射到 1024 维并做层归一化，再送入联合器（joiner）。"
      },
      {
       "id": "s-A-5-1-5",
       "original": "The predictor of the network first embeds wordpiece units into 512 dimensional embeddings, applies layer normalization, a 512-dimensional LSTM, a dropout layer and a linear layer that maps the LSTM output to 1024 dimensions.",
       "zh": "网络的预测器（predictor）先将 wordpiece 单元嵌入为 512 维，然后依次施加层归一化、512 维 LSTM、dropout 层，以及把 LSTM 输出映射到 1024 维的线性层。"
      },
      {
       "id": "s-A-5-1-6",
       "original": "The joiner adds the encoder and predictor outputs, applies tanh non-linearity and uses a linear layer that maps the 512-dimensional joiner input into wordpiece units.",
       "zh": "联合器将编码器与预测器输出相加，施加 tanh 非线性，再用线性层把 512 维的联合器输入映射到 wordpiece 单元。"
      },
      {
       "id": "s-A-5-1-7",
       "original": "There are 4096 wordpiece units estimated from the LibriSpeech 960hr training text.",
       "zh": "共 4096 个 wordpiece 单元，从 LibriSpeech 960hr 训练文本估计。"
      }
     ]
    },
    {
     "id": "p-A-5-2",
     "type": "paragraph",
     "page": 26,
     "sentences": [
      {
       "id": "s-A-5-2-1",
       "original": "We apply SpecAugment [Park et al., 2019] in all ASR runs.",
       "zh": "所有 ASR 实验均施加 SpecAugment [Park et al., 2019]。"
      },
      {
       "id": "s-A-5-2-2",
       "original": "The models are trained using PyTorch [Paszke et al., 2019] with Adam [Kingma and Ba, 2014] optimizer for 120 epochs unless otherwise noted.",
       "zh": "除特别注明外，模型使用 PyTorch [Paszke et al., 2019] 与 Adam [Kingma and Ba, 2014] 优化器训练 120 个 epoch。"
      },
      {
       "id": "s-A-5-2-3",
       "original": "The learning rate follows a tri-stage schedule with a maximum of 0.001.",
       "zh": "学习率采用三阶段（tri-stage）调度，峰值 0.001。"
      },
      {
       "id": "s-A-5-2-4",
       "original": "We applied gradient clipping at 10 and a weight decay parameter of 0.1.",
       "zh": "梯度裁剪阈值为 10，权重衰减为 0.1。"
      },
      {
       "id": "s-A-5-2-5",
       "original": "For the 960hr setting, we used a variable batch size capped at 1K utterances or 30K frames, whichever is smaller.",
       "zh": "在 960hr 设置下，使用可变批大小，上限取 1K 条语音或 30K 帧中较小者。"
      },
      {
       "id": "s-A-5-2-6",
       "original": "This corresponds to about 45K update steps for 120 epochs.",
       "zh": "对应 120 个 epoch 约 45K 次更新。"
      },
      {
       "id": "s-A-5-2-7",
       "original": "For the 100hr setting, we set the maximum learning rate to 0.0001 and used smaller batch size (capped at 200 utterances or 5K frames).",
       "zh": "在 100hr 设置下，峰值学习率设为 0.0001，并使用更小的批大小（上限 200 条语音或 5K 帧）。"
      },
      {
       "id": "s-A-5-2-8",
       "original": "In this case, 120 epochs corresponded to about 120K updates.",
       "zh": "此时 120 个 epoch 约对应 120K 次更新。"
      },
      {
       "id": "s-A-5-2-9",
       "original": "For decoding, we used n-best decoding with a beam-size of 15, and evaluated the WER on the 1-best path.",
       "zh": "解码时使用束宽 15 的 n-best 解码，并以 1-best 路径评估 WER。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-A-6",
   "num": "A.6",
   "level": 2,
   "page": 26,
   "title": {
    "original": "Bi-directional ALiBi Bias",
    "zh": "双向 ALiBi 偏置"
   },
   "blocks": [
    {
     "id": "p-A-6-1",
     "type": "paragraph",
     "page": 26,
     "sentences": [
      {
       "id": "s-A-6-1-1",
       "original": "We use a symmetric variant bi-directional variant of ALiBi bias where any query Qi and key Kj with |i −j| = N use the same representations 8.",
       "zh": "我们使用 ALiBi 偏置的对称双向变体：任意满足 |i −j| = N 的查询 Qi 与键 Kj 使用相同的表示。（脚注 8）"
      },
      {
       "id": "s-A-6-1-2",
       "original": "Furthermore, for any query Qi the bias corresponding to the flow step xt is set to 0.",
       "zh": "此外，对任意查询 Qi，对应流步骤 xt 的偏置设为 0。"
      },
      {
       "id": "s-A-6-1-3",
       "original": "Similarly the bias from the flow-step xt to any other query 0.",
       "zh": "（脚注 8 区域）类似地，从流步骤 xt 到其他任意查询的偏置也设为 0。"
      },
      {
       "id": "s-A-6-1-4",
       "original": "In our experiments, we find ALiBi Bias to improve convergence and extrapolation to longer sequences.",
       "zh": "实验中我们发现 ALiBi 偏置能改善收敛性以及向更长序列的外推。"
      }
     ]
    },
    {
     "id": "p-A-6-2",
     "type": "paragraph",
     "page": 26,
     "sentences": [
      {
       "id": "s-A-6-2-1",
       "original": "8Our implementation is similar to symmetric option.",
       "zh": "（脚注 8）我们的实现与 symmetric 选项类似。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-B",
   "num": "B",
   "level": 1,
   "page": 27,
   "title": {
    "original": "Additional Experiments",
    "zh": "附录 B 补充实验"
   },
   "blocks": []
  },
  {
   "id": "sec-B-1",
   "num": "B.1",
   "level": 2,
   "page": 27,
   "title": {
    "original": "Comparing audio model training objectives",
    "zh": "B.1 音频模型训练目标的对比"
   },
   "blocks": [
    {
     "id": "p-B-1-1",
     "type": "paragraph",
     "page": 27,
     "sentences": [
      {
       "id": "s-B-1-1-1",
       "original": "While A3T is considered the regression-based speech infilling baseline, it is trained on a smaller dataset and uses a smaller model compared to Voicebox.",
       "zh": "虽然 A3T 被视为基于回归的语音填充基线，但与 Voicebox 相比，它的训练数据更少、模型更小。"
      },
      {
       "id": "s-B-1-1-2",
       "original": "Here we present a controlled study comparing the flow-matching and regression objectives, as well as the effectiveness of masked loss.",
       "zh": "这里我们给出一个受控研究，比较流匹配与回归目标，以及掩蔽损失的有效性。"
      }
     ]
    },
    {
     "id": "p-B-1-2",
     "type": "paragraph",
     "page": 27,
     "sentences": [
      {
       "id": "s-B-1-2-1",
       "original": "We consider a reduced setup for this ablation to save the compute.",
       "zh": "为节省算力，本消融采用精简设置。"
      },
      {
       "id": "s-B-1-2-2",
       "original": "All models were trained on an English audiobook dataset with 1K hours of speech using a smaller model configuration (12 layers, 1024-dimensional Transformer embedding, 2048-dimensional feed-forward layer, 8 attention heads) for 150k steps with an effective batch size of 120k frames.",
       "zh": "所有模型均在 1K 小时语音的英语有声书数据集上，用更小的模型配置（12 层、1024 维 Transformer 嵌入、2048 维前馈层、8 个注意力头）训练 150k 步，有效批大小 120k 帧。"
      },
      {
       "id": "s-B-1-2-3",
       "original": "These models are evaluated on the cross-sentence zero-shot TTS setup (Section 5.2) and diverse speech sampling (Section 5.5).",
       "zh": "这些模型在跨句零样本 TTS（5.2 节）与多样化语音采样（5.5 节）上评估。"
      }
     ]
    },
    {
     "id": "p-B-1-3",
     "type": "paragraph",
     "page": 27,
     "sentences": [
      {
       "id": "s-B-1-3-1",
       "original": "Results in Table B2 show that while regression audio models produce comparable WER, the audio similarity and diversity are significantly worse.",
       "zh": "表 B2 的结果表明：回归音频模型的 WER 虽相当，但音频相似度与多样性明显更差。"
      },
      {
       "id": "s-B-1-3-2",
       "original": "Subjective listening also reveals that the audio quality and audio similarity are much worse.",
       "zh": "主观试听也显示其音质与音频相似度明显更差。"
      },
      {
       "id": "s-B-1-3-3",
       "original": "On the other hand, masked loss improves audio similarity and diversity while having little impact on intelligibility.",
       "zh": "另一方面，掩蔽损失能提升音频相似度与多样性，同时对可懂度影响不大。"
      }
     ]
    },
    {
     "id": "p-B-1-4",
     "type": "paragraph",
     "page": 27,
     "sentences": [
      {
       "id": "s-B-1-4-1",
       "original": "Table B2: Comparison of flow-matching and regression models, trained with loss computed on all frames or only masked frames.",
       "zh": "表 B2：流匹配与回归模型的对比，分别在所有帧或仅掩蔽帧上计算损失训练。"
      },
      {
       "id": "s-B-1-4-2",
       "original": "Results of the proposed objective is boldfaced.",
       "zh": "本文提出的目标的结果以粗体标出。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-method",
   "num": null,
   "level": 2,
   "page": 27,
   "title": {
    "original": "Method",
    "zh": "方法对比（表 B2 残留）"
   },
   "blocks": [
    {
     "id": "p-method-1",
     "type": "paragraph",
     "page": 27,
     "sentences": [
      {
       "id": "s-method-1-1",
       "original": "Loss Zero-Shot TTS (cross-sentence) Diverse sampling SIM-r FSD Flow Matching Masked 2.1 0.597 3.1 242.5 Flow Matching All 2.0 0.528 3.1 243.1 Regression Masked 2.0 0.520 2.9 278.8 Regression All 2.0 0.512 2.9 282.8",
       "zh": "（表内数字）损失｜零样本 TTS（跨句）｜多样化采样（WER、SIM-r、FSD）：流匹配＋掩蔽 2.1 0.597／3.1 242.5；流匹配＋全帧 2.0 0.528／3.1 243.1；回归＋掩蔽 2.0 0.520／2.9 278.8；回归＋全帧 2.0 0.512／2.9 282.8。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-B-2",
   "num": "B.2",
   "level": 2,
   "page": 27,
   "title": {
    "original": "Effectiveness on data scaling",
    "zh": "B.2 数据规模的影响"
   },
   "blocks": [
    {
     "id": "p-B-2-1",
     "type": "paragraph",
     "page": 27,
     "sentences": [
      {
       "id": "s-B-2-1-1",
       "original": "We create four subsets of the 60K hour English data (0.1%, 1%, 10%, 100% in duration).",
       "zh": "我们从 60K 小时英语数据中构造四个子集（按时长的 0.1%、1%、10%、100%）。"
      },
      {
       "id": "s-B-2-1-2",
       "original": "In particular, the x% subset would contain roughly x% of the speakers from the original set.",
       "zh": "具体而言，x% 子集大致包含原集合 x% 的说话人。"
      },
      {
       "id": "s-B-2-1-3",
       "original": "We train one model on each subset with a reduced setup described in Appendix B.1 and evaluate them on zero-shot TTS (cross-sentence) and diverse sampling.",
       "zh": "我们在每个子集上按附录 B.1 的精简设置各训练一个模型，并在零样本 TTS（跨句）与多样化采样上评估。"
      },
      {
       "id": "s-B-2-1-4",
       "original": "Results show that scaling data constantly improves the zero-shot TTS performance (WER and SIM-r) as well as WER on diverse sampling.",
       "zh": "结果表明，扩大数据规模可持续改善零样本 TTS 性能（WER 与 SIM-r）以及多样化采样的 WER。"
      },
      {
       "id": "s-B-2-1-5",
       "original": "For FSD it shows regression when scaling from 6K hour to 60K hour, but this could result from the the reference distribution is computed from the 1K hour English audiobook data that has less diverse samples.",
       "zh": "FSD 在从 6K 小时扩展到 60K 小时时出现回退，但这可能是因为参考分布是从样本多样性更低的 1K 小时英语有声书数据上计算的。"
      }
     ]
    },
    {
     "id": "p-B-2-2",
     "type": "paragraph",
     "page": 27,
     "sentences": [
      {
       "id": "s-B-2-2-1",
       "original": "Table B3: Experiments on the effect of scaling training data.",
       "zh": "表 B3：训练数据规模影响的实验。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-train-data-hr",
   "num": null,
   "level": 2,
   "page": 27,
   "title": {
    "original": "Train data (hr)",
    "zh": "训练数据时长（表 B3 残留）"
   },
   "blocks": [
    {
     "id": "p-train-data-hr-1",
     "type": "paragraph",
     "page": 27,
     "sentences": [
      {
       "id": "s-train-data-hr-1-1",
       "original": "Zero-Shot TTS Diverse sampling SIM-r FSD 60 2.30 0.151 3.48 280.48 600 2.11 0.417 3.19 205.39 6,000 2.08 0.573 2.96 195.52 60,000 2.05 0.645 2.95 214.38",
       "zh": "（表内数字）训练数据（小时）｜零样本 TTS（WER、SIM-r）｜多样化采样（WER、FSD）：60 2.30 0.151／3.48 280.48；600 2.11 0.417／3.19 205.39；6,000 2.08 0.573／2.96 195.52；60,000 2.05 0.645／2.95 214.38。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-B-3",
   "num": "B.3",
   "level": 2,
   "page": 27,
   "title": {
    "original": "Complete results on comparing generative modeling approaches",
    "zh": "B.3 生成建模方法对比的完整结果"
   },
   "blocks": [
    {
     "id": "p-B-3-1",
     "type": "paragraph",
     "page": 27,
     "sentences": [
      {
       "id": "s-B-3-1-1",
       "original": "Table B4 presents the full results of Section 5.8 on all combinations of training steps, inference steps with results on both monolingual zero-shot TTS (Section 5.2) and diverse speech sampling (Section 5.5) for the ablation study presented in Section 5.8.",
       "zh": "表 B4 给出 5.8 节消融研究在所有训练步数、推理步数组合下的完整结果，涵盖单语零样本 TTS（5.2 节）与多样化语音采样（5.5 节）两个任务。"
      },
      {
       "id": "s-B-3-1-2",
       "original": "In all settings Flow Matching with OT paths performs strictly better than both of the other approaches.",
       "zh": "在所有设置下，带 OT 路径的流匹配都严格优于另外两种方法。"
      }
     ]
    },
    {
     "id": "p-B-3-2",
     "type": "paragraph",
     "page": 28,
     "sentences": [
      {
       "id": "s-B-3-2-1",
       "original": "Table B4: Comparison of FM w/OT vs. FM w/Diffusion vs. SM.",
       "zh": "表 B4：FM w/ OT、FM w/ Diffusion 与 SM 的对比。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-method-2",
   "num": null,
   "level": 2,
   "page": 28,
   "title": {
    "original": "Method",
    "zh": "方法完整结果（表 B4 残留）"
   },
   "blocks": [
    {
     "id": "p-method-2-1",
     "type": "paragraph",
     "page": 28,
     "sentences": [
      {
       "id": "s-method-2-1-1",
       "original": "Train Steps NFE ZS-TTS (cross-sentence) Diverse sampling SIM-r FSD 4 2.7 0.303 0.362 4.8 276.499 8 2.5 0.353 0.412 4.8 235.958 16 2.4 0.366 0.425 4.7 227.485 32 2.5 0.364 0.424 4.7 225.931 50000 4 2.5 0.347 0.404 4.3 258.358 8 2.2 0.411 0.468 4.2 216.512 16 2.3 0.429 0.483 4.3 206.538 32 2.2 0.431 0.487 4.2 203.792 FM w/ OT 100000 4 2.4 0.356 0.410 4.0 249.712 8 2.2 0.430 0.481 4.0 208.511 16 2.2 0.453 0.503 4.0 198.040 32 2.1 0.458 0.508 3.9 195.304 150000 4 99.9 0.050 0.050 99.8 3478.910 8 99.9 0.047 0.047 99.9 4704.237 16 98.8 0.052 0.048 96.5 5336.591 32 76.0 0.060 0.066 49.5 2485.400 50000 4 98.9 0.048 0.048 96.6 4486.401 8 14.6 0.104 0.137 12.0 669.564 16 4.0 0.210 0.262 7.0 381.891 32 3.1 0.285 0.344 6.3 294.777 FM w/ diff 100000 4 11.5 0.132 0.171 11.4 692.560 8 3.0 0.305 0.359 5.6 334.237 16 2.7 0.391 0.447 5.4 244.067 32 2.6 0.423 0.478 5.2 224.963 150000 4 99.6 0.050 0.048 99.7 2816.083 8 99.3 0.051 0.048 99.6 3079.040 16 97.5 0.052 0.050 98.4 3710.340 32 73.3 0.057 0.062 86.2 3011.030 50000 4 99.4 0.050 0.050 99.3 3474.579 8 97.2 0.049 0.048 97.9 3600.423 16 53.9 0.064 0.071 69.6 2060.892 32 17.4 0.150 0.176 34.4 1071.579 SM w/ diff 100000 4 94.5 0.055 0.054 79.4 2953.417 8 42.3 0.070 0.076 27.5 1071.010 16 11.5 0.191 0.218 12.8 698.411 32 5.1 0.309 0.349 8.8 519.468 150000",
       "zh": "（表内数字）方法｜训练步数｜NFE｜零样本 TTS（跨句：WER、SIM-o/SIM-r）｜多样化采样（WER、FSD）。训练 Step 取值 50000/100000/150000。FM w/ OT：50000 步 NFE=4/8/16/32 为 2.7 0.303 0.362 4.8 276.499／2.5 0.353 0.412 4.8 235.958／2.4 0.366 0.425 4.7 227.485／2.5 0.364 0.424 4.7 225.931；50000 续／100000 步为 2.5 0.347 0.404 4.3 258.358／2.2 0.411 0.468 4.2 216.512／2.3 0.429 0.483 4.3 206.538／2.2 0.431 0.487 4.2 203.792；100000 步为 2.4 0.356 0.410 4.0 249.712／2.2 0.430 0.481 4.0 208.511／2.2 0.453 0.503 4.0 198.040／2.1 0.458 0.508 3.9 195.304（另有 150000 步行 99.9 0.050 0.050 99.8 3478.910／99.9 0.047 0.047 99.9 4704.237／98.8 0.052 0.048 96.5 5336.591／76.0 0.060 0.066 49.5 2485.400）。FM w/ diff：50000 步为 99.9 0.050 0.050 99.8 3478.910／99.9 0.047 0.047 99.9 4704.237／98.8 0.052 0.048 96.5 5336.591／76.0 0.060 0.066 49.5 2485.400；50000 续／100000 步为 98.9 0.048 0.048 96.6 4486.401／14.6 0.104 0.137 12.0 669.564／4.0 0.210 0.262 7.0 381.891／3.1 0.285 0.344 6.3 294.777；100000 步为 11.5 0.132 0.171 11.4 692.560／3.0 0.305 0.359 5.6 334.237／2.7 0.391 0.447 5.4 244.067／2.6 0.423 0.478 5.2 224.963（另有 150000 步行 99.6 0.050 0.048 99.7 2816.083／99.3 0.051 0.048 99.6 3079.040／97.5 0.052 0.050 98.4 3710.340／73.3 0.057 0.062 86.2 3011.030）。SM w/ diff：50000 步为 99.6 0.050 0.048 99.7 2816.083／99.3 0.051 0.048 99.6 3079.040／97.5 0.052 0.050 98.4 3710.340／73.3 0.057 0.062 86.2 3011.030；50000 续／100000 步为 99.4 0.050 0.050 99.3 3474.579／97.2 0.049 0.048 97.9 3600.423／53.9 0.064 0.071 69.6 2060.892／17.4 0.150 0.176 34.4 1071.579；100000 步为 94.5 0.055 0.054 79.4 2953.417／42.3 0.070 0.076 27.5 1071.010／11.5 0.191 0.218 12.8 698.411／5.1 0.309 0.349 8.8 519.468（末行为 150000 步）。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-B-4",
   "num": "B.4",
   "level": 2,
   "page": 28,
   "title": {
    "original": "Transient noise removal in more conditions",
    "zh": "B.4 更多条件下的瞬态噪声移除"
   },
   "blocks": [
    {
     "id": "p-B-4-1",
     "type": "paragraph",
     "page": 28,
     "sentences": [
      {
       "id": "s-B-4-1-1",
       "original": "We expand the experiments in Section 5.4 by comparing the models on two noise levels (low noise: 10dB and high noise: -10dB), three overlapping ratios (30%, 50%, 70%), and also two types of noise (speech noise and non-speech noise).",
       "zh": "我们扩展了 5.4 节的实验，在两种噪声水平（低噪声：10dB；高噪声：-10dB）、三种重叠比例（30%、50%、70%）以及两种噪声类型（语音噪声与非语音噪声）下比较各模型。"
      }
     ]
    },
    {
     "id": "p-B-4-2",
     "type": "paragraph",
     "page": 28,
     "sentences": [
      {
       "id": "s-B-4-2-1",
       "original": "Results are presented in Table B5.",
       "zh": "结果见表 B5。"
      },
      {
       "id": "s-B-4-2-2",
       "original": "Voicebox consistently produces the most intelligible audio at all conditions (indicating the percentage of speech to infill).",
       "zh": "在所有条件下（括号内数值表示需填充的语音比例），Voicebox 都生成可懂度最高的音频。"
      },
      {
       "id": "s-B-4-2-3",
       "original": "In terms of audio similarity, Voicebox is constantly better in the high noise condition with gains ranging from 0.265 to 0.324 compared to Demucs, and is on par with Demucs in low noise condition.",
       "zh": "在音频相似度方面，Voicebox 在高噪声条件下稳定更优，相比 Demucs 的提升从 0.265 到 0.324 不等；在低噪声条件下与 Demucs 相当。"
      }
     ]
    },
    {
     "id": "p-B-4-3",
     "type": "paragraph",
     "page": 29,
     "sentences": [
      {
       "id": "s-B-4-3-1",
       "original": "Table B5: Results of transient noise removal with varying overlapping percentage and noise level.",
       "zh": "表 B5：不同重叠比例与噪声水平下的瞬态噪声移除结果。"
      },
      {
       "id": "s-B-4-3-2",
       "original": "“sp” means added noise is speech, and “non-sp” means non-speech.",
       "zh": "“sp”表示添加的噪声为语音，“non-sp”表示非语音。"
      }
     ]
    },
    {
     "id": "p-B-4-4",
     "type": "paragraph",
     "page": 29,
     "sentences": [
      {
       "id": "s-B-4-4-1",
       "original": "sp non-sp sp non-sp sp non-sp sp non-sp SNR=-10dB, overlap=30% SNR=10dB, overlap=30% Noisy speech 26.7 24.9 0.202 0.238 3.7 3.1 0.605 0.603 Demucs 20.5 19.7 0.247 0.247 3.2 2.8 0.570 0.567 A3T 7.5 0.058 same as left VB-En (α = 0.7) 2.2 0.566 same as left SNR=-10dB, overlap=50% SNR=10dB, overlap=50% Noisy speech 43.6 40.8 0.256 0.292 4.5 3.8 0.649 0.649 Demucs 34.3 32.5 0.291 0.288 3.8 3.3 0.616 0.613 A3T 11.5 0.064 same as left VB-En (α = 0.7) 2.0 0.612 same as left SNR=-10dB, overlap=70% SNR=10dB, overlap=70% Noisy speech 60.0 56.0 0.260 0.303 6.3 4.6 0.595 0.592 Demucs 49.5 45.4 0.293 0.294 4.6 3.8 0.572 0.564 A3T 16.6 0.063 same as left VB-En (α = 0.7) 2.0 0.559 same as left",
       "zh": "（表内数字）各条件下（sp/non-sp）的 WER 与 SIM-o。SNR=-10dB、overlap=30%：含噪语音 26.7 24.9 0.202 0.238，Demucs 20.5 19.7 0.247 0.247，A3T 7.5 0.058，VB-En（α = 0.7）2.2 0.566；SNR=10dB、overlap=30%：含噪 3.7 3.1 0.605 0.603，Demucs 3.2 2.8 0.570 0.567。SNR=-10dB、overlap=50%：含噪 43.6 40.8 0.256 0.292，Demucs 34.3 32.5 0.291 0.288，A3T 11.5 0.064，VB-En 2.0 0.612；SNR=10dB、overlap=50%：含噪 4.5 3.8 0.649 0.649，Demucs 3.8 3.3 0.616 0.613。SNR=-10dB、overlap=70%：含噪 60.0 56.0 0.260 0.303，Demucs 49.5 45.4 0.293 0.294，A3T 16.6 0.063，VB-En 2.0 0.559；SNR=10dB、overlap=70%：含噪 6.3 4.6 0.595 0.592，Demucs 4.6 3.8 0.572 0.564。A3T 与 VB-En 在低噪声（10dB）各重叠比例下的结果与左栏相同（same as left）。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-B-5",
   "num": "B.5",
   "level": 2,
   "page": 29,
   "title": {
    "original": "Choice of audio model output features",
    "zh": "B.5 音频模型输出特征的选择"
   },
   "blocks": [
    {
     "id": "p-B-5-1",
     "type": "paragraph",
     "page": 29,
     "sentences": [
      {
       "id": "s-B-5-1-1",
       "original": "The performance of our model is upper bounded by how well the chosen acoustic features can be reconstructed to waveform.",
       "zh": "我们模型的性能上限取决于所选声学特征能被重建回波形的好坏。"
      },
      {
       "id": "s-B-5-1-2",
       "original": "The reconstruction performance is determined jointly by the encoding process, as in how much information is lost when encoding waveform into the features, and the decoding process, as in how well the vocoder can translate the encoded information into waveform.",
       "zh": "重建性能由编码过程（波形编码为特征时损失多少信息）与解码过程（声码器把编码信息还原为波形的能力）共同决定。"
      }
     ]
    },
    {
     "id": "p-B-5-2",
     "type": "paragraph",
     "page": 29,
     "sentences": [
      {
       "id": "s-B-5-2-1",
       "original": "To motivate the choice of the acoustic feature and the vocoder, we compare four combinations: the first one is Mel spectrogram + HiFi-GAN which is what this paper adopts.",
       "zh": "为论证声学特征与声码器的选择，我们比较四种组合：第一种是 Mel 频谱图＋HiFi-GAN，即本文采用的方案。"
      },
      {
       "id": "s-B-5-2-2",
       "original": "The second is Mel spectrogram + Parallel WaveGAN [Yamamoto et al., 2020] that is used by A3T [Bai et al., 2022].",
       "zh": "第二种是 Mel 频谱图＋Parallel WaveGAN [Yamamoto et al., 2020]，即 A3T [Bai et al., 2022] 所用的方案。"
      },
      {
       "id": "s-B-5-2-3",
       "original": "The third one is Encodec post-quantization dense feature + Encodec decoder, which is analogous to VALL-E’s setup.",
       "zh": "第三种是 Encodec 量化后稠密特征＋Encodec 解码器，与 VALL-E 的设置类似。"
      },
      {
       "id": "s-B-5-2-4",
       "original": "The last one is also Encodec but with pre-quantization dense feature, which we include to study how much information is lost during quantization.",
       "zh": "最后一种同样用 Encodec，但取量化前稠密特征——纳入它是为了研究量化过程损失了多少信息。"
      }
     ]
    },
    {
     "id": "p-B-5-3",
     "type": "paragraph",
     "page": 29,
     "sentences": [
      {
       "id": "s-B-5-3-1",
       "original": "We also note that Mel spectrogram features are 80 dimensional encoded at 100Hz, which is 8K dimensions per second, while Encodec features are 128 dimensional encoded at 75Hz, which is 9.6K dimensions per second, higher than the Mel spectrogram features.",
       "zh": "还需指出，Mel 频谱特征为 100Hz 的 80 维，即每秒 8K 维；而 Encodec 特征为 75Hz 的 128 维，即每秒 9.6K 维，高于 Mel 频谱特征。"
      }
     ]
    },
    {
     "id": "p-B-5-4",
     "type": "paragraph",
     "page": 29,
     "sentences": [
      {
       "id": "s-B-5-4-1",
       "original": "Table B6 presents the results evaluated on the Librispeech dev-clean and dev-other splits.",
       "zh": "表 B6 给出在 Librispeech dev-clean 与 dev-other 划分上的评估结果。"
      },
      {
       "id": "s-B-5-4-2",
       "original": "All three models have the same WER resynthesizing dev-clean split, but ParallelWaveGAN degrades the most on dev-other.",
       "zh": "三个模型在 dev-clean 上重合成的 WER 相同，但 ParallelWaveGAN 在 dev-other 上退化最严重。"
      },
      {
       "id": "s-B-5-4-3",
       "original": "Interestingly Encodec even produces audio of lower WER than the ground truth.",
       "zh": "有趣的是，Encodec 产生的音频 WER 甚至低于真实语音。"
      }
     ]
    },
    {
     "id": "p-B-5-5",
     "type": "paragraph",
     "page": 29,
     "sentences": [
      {
       "id": "s-B-5-5-1",
       "original": "In terms of audio similarity, besides the default audio feature extractor WavLM-TDCNN, we also include results of similarity computed with another speaker encoder ECAPA [Desplanques et al., 2020].",
       "zh": "在音频相似度方面，除默认的音频特征提取器 WavLM-TDCNN 外，我们还报告了用另一种说话人编码器 ECAPA [Desplanques et al., 2020] 计算的相似度。"
      },
      {
       "id": "s-B-5-5-2",
       "original": "Parallel WaveGAN is consistently the worst.",
       "zh": "Parallel WaveGAN 始终最差。"
      },
      {
       "id": "s-B-5-5-3",
       "original": "However, it is unclear whether HiFi-GAN or Encodec performs better.",
       "zh": "但 HiFi-GAN 与 Encodec 孰优并不明朗。"
      },
      {
       "id": "s-B-5-5-4",
       "original": "Encodec prevails with the WavLM-TDCNN embedder and HiFi-GAN wins using ECAPA.",
       "zh": "用 WavLM-TDCNN 嵌入器时 Encodec 占优，用 ECAPA 时 HiFi-GAN 胜出。"
      },
      {
       "id": "s-B-5-5-5",
       "original": "It may require subjective MOS test to conclude which one reconstructs the audio better, and we leave exploration of modeling Encodec dense features for future study.",
       "zh": "可能需要主观 MOS 测试才能判定谁重建音频更好；对 Encodec 稠密特征建模的探索留待未来研究。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-C",
   "num": "C",
   "level": 1,
   "page": 29,
   "title": {
    "original": "Additional Details and Studies on Metrics",
    "zh": "附录 C 评价指标的补充细节与研究"
   },
   "blocks": []
  },
  {
   "id": "sec-C-1",
   "num": "C.1",
   "level": 2,
   "page": 29,
   "title": {
    "original": "Measuring speech diversity and quality with FSD Diversity",
    "zh": "C.1 用 FSD 衡量语音多样性与质量：多样性"
   },
   "blocks": [
    {
     "id": "p-C-1-1",
     "type": "paragraph",
     "page": 29,
     "sentences": [
      {
       "id": "s-C-1-1-1",
       "original": "We first validate if FSD reflects the diversity for a set of speech samples and study its sensitivity to sample size.",
       "zh": "我们首先验证 FSD 是否反映一组语音样本的多样性，并研究其对样本量的敏感性。"
      },
      {
       "id": "s-C-1-1-2",
       "original": "To achieve that, we design controlled experiments to compute FSD on sets of samples with varying diversity and sample sizes.",
       "zh": "为此，我们设计受控实验，在多样性与样本量各不相同的样本集上计算 FSD。"
      },
      {
       "id": "s-C-1-1-3",
       "original": "Specifically, we create two partitions from 1K Table B6: Comparison of different audio features and vocoders on audio reconstruction.",
       "zh": "具体而言，我们从 1K（……表 B6：不同音频特征与声码器在音频重建上的对比。）（接上）"
      },
      {
       "id": "s-C-1-1-4",
       "original": "Librispeech dev-clean (d-c) and dev-other (d-o) are used for evaluation.",
       "zh": "（接上）使用 Librispeech dev-clean（d-c）与 dev-other（d-o）进行评估。"
      },
      {
       "id": "s-C-1-1-5",
       "original": "WER and audio similarity computed with WavLM-TDCNN and ECAPA are reported.",
       "zh": "（接上）报告 WER 以及分别用 WavLM-TDCNN 与 ECAPA 计算的音频相似度。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-audio-feature-vocoder",
   "num": null,
   "level": 2,
   "page": 30,
   "title": {
    "original": "Audio feature / Vocoder",
    "zh": "音频特征／声码器（表 B6 与 FSD 敏感性研究）"
   },
   "blocks": [
    {
     "id": "p-audio-feature-vocoder-1",
     "type": "paragraph",
     "page": 30,
     "sentences": [
      {
       "id": "s-audio-feature-vocoder-1-1",
       "original": "SIM-o (WavLM) SIM-o (ECAPA) d-c d-o d-c d-o d-c d-o Ground truth 2.1 4.7 1.000 1.000 1.000 1.000 Mel spectrogram / HiFi-GAN 2.1 4.7 0.915 0.909 0.766 0.762 Mel spectrogram / Parallel WaveGAN 2.1 5.2 0.868 0.847 0.721 0.711 Encodec post-quantized feature / Encodec decoder 2.1 4.5 0.943 0.944 0.724 0.722 Encodec pre-quantized feature / Encodec decoder 2.1 4.4 0.943 0.944 0.724 0.722 hours of English speech, where each partition has the same set of speakers and the same number of utterances for each speaker.",
       "zh": "（表内数字）SIM-o（WavLM）／SIM-o（ECAPA），d-c 与 d-o：真实语音 2.1 4.7，1.000 1.000，1.000 1.000；Mel 频谱图／HiFi-GAN 2.1 4.7，0.915 0.909，0.766 0.762；Mel 频谱图／Parallel WaveGAN 2.1 5.2，0.868 0.847，0.721 0.711；Encodec 量化后特征／解码器 2.1 4.5，0.943 0.944，0.724 0.722；Encodec 量化前特征／解码器 2.1 4.4，0.943 0.944，0.724 0.722。（接上）小时英语语音构造两个划分，两个划分含相同的说话人集合，且每位说话人的语音条数相同。"
      },
      {
       "id": "s-audio-feature-vocoder-1-2",
       "original": "The first partition is considered the reference set.",
       "zh": "第一个划分作为参考集。"
      }
     ]
    },
    {
     "id": "p-audio-feature-vocoder-2",
     "type": "paragraph",
     "page": 30,
     "sentences": [
      {
       "id": "s-audio-feature-vocoder-2-1",
       "original": "To test the sensitivity to sample size, we use the second partition to create subsets by sampling r% of utterances from each speaker in that partition.",
       "zh": "为测试对样本量的敏感性，我们用第二个划分构造子集：从该划分中每位说话人抽取 r% 的语音。"
      },
      {
       "id": "s-audio-feature-vocoder-2-2",
       "original": "This sampling method is denoted as “utt”.",
       "zh": "该采样方式记为“utt”。"
      },
      {
       "id": "s-audio-feature-vocoder-2-3",
       "original": "We computed that on average, each speaker contributed approximately 2.33 sessions, with each session containing around 52.45 utterances.",
       "zh": "经计算，每位说话人平均贡献约 2.33 个会话，每个会话约含 52.45 条语音。"
      },
      {
       "id": "s-audio-feature-vocoder-2-4",
       "original": "Therefore, the subsets created using the sampling method are expected to have similar audio style distributions to the reference set and the FSD is expected to stay low regardless of the subset size.",
       "zh": "因此，用该采样方法构造的子集与参考集的音频风格分布预期相近，无论子集大小如何，FSD 都应保持较低。"
      },
      {
       "id": "s-audio-feature-vocoder-2-5",
       "original": "We consider r ∈{1, 5, 10, 25, 50, 100}.",
       "zh": "我们取 r ∈{1, 5, 10, 25, 50, 100}。"
      }
     ]
    },
    {
     "id": "p-audio-feature-vocoder-3",
     "type": "paragraph",
     "page": 30,
     "sentences": [
      {
       "id": "s-audio-feature-vocoder-3-1",
       "original": "To test the correlation with diversity, we again use the second partition to create subsets by sampling r% of speakers and including all the utterances in the partition from those speakers.",
       "zh": "为测试与多样性的相关性，我们同样从第二个划分构造子集：抽取 r% 的说话人，并纳入这些说话人在该划分中的全部语音。"
      },
      {
       "id": "s-audio-feature-vocoder-3-2",
       "original": "This sampling method is denoted as “spk” where a smaller r leads to a subset with fewer speakers and hence lower diversity.",
       "zh": "该采样方式记为“spk”：r 越小，子集说话人越少，多样性越低。"
      },
      {
       "id": "s-audio-feature-vocoder-3-3",
       "original": "Therefore the FSD is expected to increase as r decreases.",
       "zh": "因此 FSD 预期随 r 减小而上升。"
      },
      {
       "id": "s-audio-feature-vocoder-3-4",
       "original": "The same set of values for r is considered.",
       "zh": "r 取与之前相同的一组值。"
      },
      {
       "id": "s-audio-feature-vocoder-3-5",
       "original": "For the same r, the “utt” subset should always have a lower FSD than the “spk” subset.",
       "zh": "在相同 r 下，“utt”子集的 FSD 应始终低于“spk”子集。"
      }
     ]
    },
    {
     "id": "p-audio-feature-vocoder-4",
     "type": "paragraph",
     "page": 30,
     "sentences": [
      {
       "id": "s-audio-feature-vocoder-4-1",
       "original": "We compare three different features for computing the FSD score.",
       "zh": "我们比较三种用于计算 FSD 的特征。"
      },
      {
       "id": "s-audio-feature-vocoder-4-2",
       "original": "The first is the supervised WavLM-TDCNN feature used for computing audio similarity (SIM-r and SIM-o).",
       "zh": "第一种是用于计算音频相似度（SIM-r 与 SIM-o）的有监督 WavLM-TDCNN 特征。"
      },
      {
       "id": "s-audio-feature-vocoder-4-3",
       "original": "The second is the self-supervised wav2vec 2.0 BASE [Baevski et al., 2020] feature reduced to 128 dimensions using principle component analysis (PCA).",
       "zh": "第二种是经主成分分析（PCA）降到 128 维的自监督 wav2vec 2.0 BASE [Baevski et al., 2020] 特征。"
      },
      {
       "id": "s-audio-feature-vocoder-4-4",
       "original": "The last one is the supervised audio event classification model feature that is used to compute FAD [Kilgour et al., 2019] for non-speech audio generation.",
       "zh": "最后一种是用于为非语音音频生成计算 FAD [Kilgour et al., 2019] 的有监督音频事件分类模型特征。"
      }
     ]
    },
    {
     "id": "p-audio-feature-vocoder-5",
     "type": "paragraph",
     "page": 30,
     "sentences": [
      {
       "id": "s-audio-feature-vocoder-5-1",
       "original": "Figure C1 first compares using different layers of wav2vec 2.0 features.",
       "zh": "图 C1 首先比较 wav2vec 2.0 不同层的特征。"
      },
      {
       "id": "s-audio-feature-vocoder-5-2",
       "original": "All of them yield similar desirable results where “utt” stays low and “spk” increases drastically when the sample size reduces and speaker diversity decreases.",
       "zh": "各层都呈现相似的预期结果：“utt”保持低位，“spk”随样本量与说话人多样性下降而急剧上升。"
      },
      {
       "id": "s-audio-feature-vocoder-5-3",
       "original": "We then decide to use the middle layer (layer 6) as the default feature for FSD computation.",
       "zh": "我们随后选定中间层（第 6 层）作为 FSD 计算的默认特征。"
      }
     ]
    },
    {
     "id": "p-audio-feature-vocoder-6",
     "type": "paragraph",
     "page": 30,
     "sentences": [
      {
       "id": "s-audio-feature-vocoder-6-1",
       "original": "Figure C2 further compares wav2vec 2.0-layer 6 with the two other features.",
       "zh": "图 C2 进一步将 wav2vec 2.0 第 6 层与另外两种特征对比。"
      },
      {
       "id": "s-audio-feature-vocoder-6-2",
       "original": "WavLM-TDCNN and wav2vec 2.0-layer 6 present similar trends and both have low variance.",
       "zh": "WavLM-TDCNN 与 wav2vec 2.0 第 6 层呈现相似趋势且方差都很低。"
      },
      {
       "id": "s-audio-feature-vocoder-6-3",
       "original": "Both of them are suitable for measuring diversity, and we decide to use wav2vec 2.0 features as it is self-supervised and would be able to capture more holistic information of speech such as prosody and emotion.",
       "zh": "二者都适合衡量多样性；我们选择 wav2vec 2.0 特征，因为它是自监督的，能捕捉语音中更整体的信息（如韵律与情绪）。"
      }
     ]
    },
    {
     "id": "p-audio-feature-vocoder-7",
     "type": "paragraph",
     "page": 30,
     "sentences": [
      {
       "id": "s-audio-feature-vocoder-7-1",
       "original": "In contrast, FAD score [Kilgour et al., 2019] is not appropriate for measuring speech diversity.",
       "zh": "相比之下，FAD 分数 [Kilgour et al., 2019] 不适合衡量语音多样性。"
      },
      {
       "id": "s-audio-feature-vocoder-7-2",
       "original": "The score does not increase much between r = 25% and r = 1% for “spk” sampling method, showing that the score does not reflect the decreasing speaker diversity.",
       "zh": "在“spk”采样下，r = 25% 到 r = 1% 之间分数上升甚微，说明它没有反映说话人多样性的下降。"
      },
      {
       "id": "s-audio-feature-vocoder-7-3",
       "original": "On the other hand, “utt” sampling method observes huge FAD score increase when reducing the sample size from r = 25% to r = 1% where the diversity does not change much as the number of speakers remains the same.",
       "zh": "另一方面，“utt”采样下把样本量从 r = 25% 减到 r = 1% 时 FAD 大幅上升，而此时说话人数量不变、多样性变化不大。"
      },
      {
       "id": "s-audio-feature-vocoder-7-4",
       "original": "Moreover, at r = 1% both sampling methods result in similar FAD score while the two subsets exhibit very different levels of diversity.",
       "zh": "此外，r = 1% 时两种采样的 FAD 相近，但两个子集的多样性水平差异很大。"
      },
      {
       "id": "s-audio-feature-vocoder-7-5",
       "original": "We hypothesize that this is because FAD score is computed based on features extracted from an audio even classifier trained on AudioSet, which learns to distinguish between events like lawn mower, car engine, and human speech, but does not learn to capture the variation within speech, such as different voices.",
       "zh": "我们推测这是因为 FAD 基于在 AudioSet 上训练的音频事件分类器特征计算——该分类器学会区分割草机、汽车引擎、人声等事件，却没有学会捕捉语音内部的差异（如不同音色）。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-quality",
   "num": null,
   "level": 2,
   "page": 30,
   "title": {
    "original": "Quality",
    "zh": "质量"
   },
   "blocks": [
    {
     "id": "p-quality-1",
     "type": "paragraph",
     "page": 30,
     "sentences": [
      {
       "id": "s-quality-1-1",
       "original": "In addition to measuring diversity, Fréchet distance is a commonly used metric for assessing quality in image generation [Ho et al., 2020].",
       "zh": "除衡量多样性外，Fréchet 距离也是图像生成中评估质量的常用指标 [Ho et al., 2020]。"
      },
      {
       "id": "s-quality-1-2",
       "original": "To show its applicability for speech generation, we evaluate the FSD score of speech utterances with varying levels of quality.",
       "zh": "为表明它适用于语音生成，我们评估了质量水平各不相同的语音的 FSD 分数。"
      },
      {
       "id": "s-quality-1-3",
       "original": "The reference set samples are 1K hours of English training data, and the hypothesis set is the Librispeech test-clean split with noise added.",
       "zh": "参考集样本为 1K 小时英语训练数据，待测集为加入噪声的 Librispeech test-clean 划分。"
      },
      {
       "id": "s-quality-1-4",
       "original": "We added Gaussian noise at different SNRs, ranging from 0 to 50 dB.",
       "zh": "我们以不同信噪比加入高斯噪声，范围从 0 到 50 dB。"
      },
      {
       "id": "s-quality-1-5",
       "original": "Lower SNR layer-2 250 250 200 200 Fréchet Distance 150 150 100 100 50 50 0 0 layer-4 layer-6 200 150 100 50 0 100 101 102 100 101 102 layer-8 300 utt spk 200 250 Fréchet Distance 150 200 150 100 100 50 50 0 0 100 101 102 layer-10 layer-12 150 125 100 75 50 25 0 100 101 102 100 101 102 ratio(%) 100 101 102 ratio(%) ratio(%) Figure C1: FSD based on different layers of wav2vec 2.0 BASE. utt: utterance-based sampling, spk: speaker-based sampling.",
       "zh": "更低的 SNR（……（图内文字）layer-2/layer-4/layer-6/layer-8/layer-10/layer-12，Fréchet Distance 250 200 150 100 50 0，样本量横轴 100 101 102，utt spk，ratio(%)，部分子图纵轴刻度还包含 300 125 75 25 等；图 C1：基于 wav2vec 2.0 BASE 不同层的 FSD。utt：按语音采样；spk：按说话人采样。）（接上）"
      },
      {
       "id": "s-quality-1-6",
       "original": "Vertical bars denote standard deviation.",
       "zh": "（接上）竖线表示标准差。"
      }
     ]
    },
    {
     "id": "p-quality-2",
     "type": "paragraph",
     "page": 31,
     "sentences": [
      {
       "id": "s-quality-2-1",
       "original": "Wav2vec 2.0-layer 6 WavLM-TDCNN 3 utt spk 200 Fréchet Distance 150 2 100 1 50 0 0 FAD 400 300 200 100 0 100 101 102 100 101 102 ratio(%) 100 101 102 ratio(%) ratio(%) Figure C2: FSD with different sample size using supervised WavLM-TDCNN, self-supervised wav2vec 2.0, and supervised audio event classifier features. utt: utterance-based sampling, spk: speaker-based sampling.",
       "zh": "（图内文字）Wav2vec 2.0-layer 6、WavLM-TDCNN 3 2 1（3 条曲线、2 类采样、1 个 FAD 面板）；utt spk；Fréchet Distance 200 150 100 50 0；FAD 400 300 200 100 0；100 101 102 ratio(%) 等坐标轴；图 C2：使用有监督 WavLM-TDCNN、自监督 wav2vec 2.0 与有监督音频事件分类器特征在不同样本量下的 FSD。utt：按语音采样；spk：按说话人采样。"
      },
      {
       "id": "s-quality-2-2",
       "original": "Vertical bars denote standard deviation. values correspond to lower quality.",
       "zh": "（接上）竖线表示标准差。更低的 SNR 值对应更低的质量。"
      },
      {
       "id": "s-quality-2-3",
       "original": "We use the default speech feature extractor (i.e., wav2vec 2.0, layer-6) throughout the experiments.",
       "zh": "整个实验均使用默认语音特征提取器（即 wav2vec 2.0 第 6 层）。"
      }
     ]
    },
    {
     "id": "p-quality-3",
     "type": "paragraph",
     "page": 31,
     "sentences": [
      {
       "id": "s-quality-3-1",
       "original": "Our results, summarized in Figure C3, show that a subset with a lower SNR has a higher FSD score.",
       "zh": "结果汇总于图 C3：SNR 越低的子集 FSD 越高。"
      },
      {
       "id": "s-quality-3-2",
       "original": "Therefore, a lower FSD score indicates higher acoustic quality for the set of test samples when diversity is fixed.",
       "zh": "因此，在多样性固定时，更低的 FSD 表示待测样本集的声学质量更高。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-C-2",
   "num": "C.2",
   "level": 2,
   "page": 31,
   "title": {
    "original": "Standalone metrics for duration models",
    "zh": "C.2 时长模型的独立指标"
   },
   "blocks": [
    {
     "id": "p-C-2-1",
     "type": "paragraph",
     "page": 31,
     "sentences": [
      {
       "id": "s-C-2-1-1",
       "original": "As mentioned in the main text, we can utilize end-to-end metrics of WER, SIM, and FSD to evaluate duration models, but also consider metrics specifically for duration.",
       "zh": "如正文所述，我们可以用 WER、SIM、FSD 等端到端指标评估时长模型，但也考虑专门针对时长的指标。"
      }
     ]
    },
    {
     "id": "p-C-2-2",
     "type": "paragraph",
     "page": 31,
     "sentences": [
      {
       "id": "s-C-2-2-1",
       "original": "First, we consider two metrics aimed at the quality of duration predictions, here denoted ˆl(lctx, y).",
       "zh": "首先，我们考虑两个针对时长预测质量的指标，预测时长记为 l̂(lctx, y)。"
      },
      {
       "id": "s-C-2-2-2",
       "original": "For a regression model, we use ˆl(lctx, y) = g(lctx, y; θ).",
       "zh": "对回归模型，取 l̂(lctx, y) = g(lctx, y; θ)。"
      },
      {
       "id": "s-C-2-2-3",
       "original": "For a flow matching model, we set ˆl as the mean over 20 samples, ensuring a fairer comparison.",
       "zh": "对流匹配模型，取 l̂ 为 20 个样本的均值，以保证比较更公平。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-duration-correctness-ms-mae",
   "num": null,
   "level": 2,
   "page": 31,
   "title": {
    "original": "Duration correctness (MS-MAE)",
    "zh": "时长正确性（MS-MAE）"
   },
   "blocks": [
    {
     "id": "p-duration-correctness-ms-mae-1",
     "type": "paragraph",
     "page": 31,
     "sentences": [
      {
       "id": "s-duration-correctness-ms-mae-1-1",
       "original": "Our first metric, multi-sample mean-absolute error (MS-MAE), is the masked absolute error per-utterance divided by the average number of masked phonemes 3000 2500 Fréchet Distance 2000 1500 1000 500 0 10 20 30 40 50 SNR (dB) 0 Figure C3: FSD under different noisy levels.",
       "zh": "我们的第一个指标是多样本平均绝对误差（MS-MAE）：每条语音上掩蔽部分的绝对误差除以掩蔽音素的平均数（……（图内文字）Fréchet Distance 3000 2500 2000 1500 1000 500 0；SNR (dB) 0 10 20 30 40 50；图 C3：不同噪声水平下的 FSD。）（接上）"
      },
      {
       "id": "s-duration-correctness-ms-mae-1-2",
       "original": "Feature: Wav2vec 2.0 layer-6 feature.",
       "zh": "（接上）特征：wav2vec 2.0 第 6 层特征。"
      },
      {
       "id": "s-duration-correctness-ms-mae-1-3",
       "original": "Noise is added upon model output from Voicebox under unconditional setting. per-utterance Em,l,y||m ⊙ l −ˆl(lctx, y) ||1 Em,l,y||m||1",
       "zh": "（接上）噪声加在无条件设置下 Voicebox 的模型输出上。逐条语音计算 Em,l,y||m ⊙ l − l̂(lctx, y)||1 / Em,l,y||m||1。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-speaking-rate-correlation-ms-cor",
   "num": null,
   "level": 2,
   "page": 32,
   "title": {
    "original": "Speaking rate correlation (MS-Corr)",
    "zh": "语速相关性（MS-Corr）"
   },
   "blocks": [
    {
     "id": "p-speaking-rate-correlation-ms-cor-1",
     "type": "paragraph",
     "page": 32,
     "sentences": [
      {
       "id": "s-speaking-rate-correlation-ms-cor-1-1",
       "original": "Our next metric, multi-sample correlation (MS-Corr), computes the average masked predicted duration and unmasked duration context per utterance, and computes their correlation across utterances.",
       "zh": "我们的第二个指标是多样本相关（MS-Corr）：对每条语音分别计算掩蔽部分预测时长的平均值与未掩蔽时长上下文的平均值，再计算二者在语音集合上的相关性。"
      },
      {
       "id": "s-speaking-rate-correlation-ms-cor-1-2",
       "original": "Comparing MS-Corr with the same correlation computed from the ground truth, we observe to what extent predicted durations capture appropriate correlations with the context.",
       "zh": "将 MS-Corr 与由真实值算得的同一相关性对比，可以观察预测时长在多大程度上捕捉了与上下文的恰当相关关系。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-duration-diversity-and-quality-f",
   "num": null,
   "level": 2,
   "page": 32,
   "title": {
    "original": "Duration diversity and quality (FDD)",
    "zh": "时长多样性与质量（FDD）"
   },
   "blocks": [
    {
     "id": "p-duration-diversity-and-quality-f-1",
     "type": "paragraph",
     "page": 32,
     "sentences": [
      {
       "id": "s-duration-diversity-and-quality-f-1-1",
       "original": "Additionally, we evaluate the quality and diversity of duration samples at the distribution level, similar to our audio evaluation of diversity and quality via FSD.",
       "zh": "此外，与用 FSD 评估音频多样性与质量类似，我们在分布层面评估时长样本的质量与多样性。"
      },
      {
       "id": "s-duration-diversity-and-quality-f-1-2",
       "original": "We produce one sample per utterance from a duration model and collect all sampled phoneme durations, possibly many per-utterance, into an empirical distribution.",
       "zh": "我们让时长模型对每条语音生成一个样本，把所有采样到的音素时长（每条语音可能有多个）收集为一个经验分布。"
      },
      {
       "id": "s-duration-diversity-and-quality-f-1-3",
       "original": "We compare means and variances of this sampled distribution versus the means and variances of the training distribution, labeled µ, s, and µ′, s′ respectively.",
       "zh": "我们比较该采样分布的均值与方差同训练分布的均值与方差，分别记为 µ、s 与 µ′、s′（接上）"
      },
      {
       "id": "s-duration-diversity-and-quality-f-1-4",
       "original": "We define the Fréchet duration distance (FDD) as the Fréchet distance between the distributions",
       "zh": "（接上）并定义 Fréchet 时长距离（FDD）为两分布之间的 Fréchet 距离（接上）"
      }
     ]
    },
    {
     "id": "eq-duration-diversity-and-quality-f-1",
     "type": "equation",
     "page": 32,
     "original": "(µ −µ′)2 + s + s′ −2 √"
    },
    {
     "id": "p-duration-diversity-and-quality-f-2",
     "type": "paragraph",
     "page": 32,
     "sentences": [
      {
       "id": "s-duration-diversity-and-quality-f-2-1",
       "original": "ss′, treated as though they were Gaussians.",
       "zh": "（接上）即将 µ、s 与 µ′、s′ 视作高斯分布参数来计算。"
      },
      {
       "id": "s-duration-diversity-and-quality-f-2-2",
       "original": "FDD depends on the sampled durations accurately reflecting the training distribution of real durations.",
       "zh": "FDD 依赖于采样时长对真实时长训练分布的准确反映。"
      },
      {
       "id": "s-duration-diversity-and-quality-f-2-3",
       "original": "As for FSD, this metric is specific to unconditional text-to-speech generation.",
       "zh": "与 FSD 一样，该指标仅适用于无条件的文本到语音生成。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-C-3",
   "num": "C.3",
   "level": 2,
   "page": 32,
   "title": {
    "original": "Duration model evaluation with standalone metrics",
    "zh": "C.3 用独立指标评估时长模型"
   },
   "blocks": [
    {
     "id": "p-C-3-1",
     "type": "paragraph",
     "page": 32,
     "sentences": [
      {
       "id": "s-C-3-1-1",
       "original": "We evaluate three duration model variants.",
       "zh": "我们评估三个时长模型变体。"
      },
      {
       "id": "s-C-3-1-2",
       "original": "The first and second utilizes flow matching and regression, trained using masked conditional flow matching and regression respectively as described in Section 3.3.",
       "zh": "前两个分别采用流匹配与回归，按 3.3 节所述以掩蔽条件流匹配与掩蔽回归训练。"
      },
      {
       "id": "s-C-3-1-3",
       "original": "The third is a regression model that ignores duration context lctx and only uses phonetic transcript y, referred to as unconditional regression below.",
       "zh": "第三个是忽略时长上下文 lctx、只用音素转写 y 的回归模型，下称无条件回归。"
      },
      {
       "id": "s-C-3-1-4",
       "original": "This is the duration model used in FastSpeech2 [Ren et al., 2021], A3T [Bai et al., 2022] and many other non-autoregressive speech synthesis models.",
       "zh": "这正是 FastSpeech2 [Ren et al., 2021]、A3T [Bai et al., 2022] 及许多其他非自回归语音合成模型所用的时长模型。"
      }
     ]
    },
    {
     "id": "p-C-3-2",
     "type": "paragraph",
     "page": 32,
     "sentences": [
      {
       "id": "s-C-3-2-1",
       "original": "We evaluate our three duration model variants on the Librispeech test-other split on two tasks.",
       "zh": "我们在 Librispeech test-other 划分上、以两个任务评估这三个时长模型变体。"
      },
      {
       "id": "s-C-3-2-2",
       "original": "The first is unconditional TTS where we generate all durations from given phonemes (i.e. lctx is entirely masked).",
       "zh": "第一个是无条件 TTS：从给定音素生成全部时长（即 lctx 整体被掩蔽）。"
      },
      {
       "id": "s-C-3-2-3",
       "original": "The second task is infilling the second half of each utterance’s durations, where lctx are durations from the unmasked half of the utterance.",
       "zh": "第二个任务是填充每条语音后半部分的时长，此时 lctx 为语音未掩蔽前半部分的时长。"
      },
      {
       "id": "s-C-3-2-4",
       "original": "This second infilling task distinguishes between the two regression model variants, since the unconditional regression ignores lctx, and hence predicts identical durations for the tasks.",
       "zh": "这第二个填充任务能区分两个回归变体：无条件回归忽略 lctx，因此对两个任务预测出相同的时长。"
      },
      {
       "id": "s-C-3-2-5",
       "original": "Duration metrics are computed for TTS and infilling in Table C7 and C8.",
       "zh": "TTS 与填充的时长指标分别见表 C7 与表 C8。"
      },
      {
       "id": "s-C-3-2-6",
       "original": "The prefix Phn or Sil indicates the associated metric was either computed across all nonsilence or all silence phonemes.",
       "zh": "前缀 Phn 或 Sil 表示相应指标分别在全部非静音音素或全部静音音素上计算。"
      },
      {
       "id": "s-C-3-2-7",
       "original": "Start and end silences were not trimmed for these duration metric evaluations.",
       "zh": "这些时长指标评估中端到端的静音不做裁剪。"
      }
     ]
    },
    {
     "id": "p-C-3-3",
     "type": "paragraph",
     "page": 33,
     "sentences": [
      {
       "id": "s-C-3-3-1",
       "original": "Starting with prediction quality metrics (MS-MAE and MS-Corr), the duration-conditional regression performs slightly better on MS-MAE overall than the other models.",
       "zh": "先看预测质量指标（MS-MAE 与 MS-Corr）：时长条件回归在 MS-MAE 上总体略优于其他模型。"
      },
      {
       "id": "s-C-3-3-2",
       "original": "Larger differences are seen on Phn-MS-Corr where the unconditional regression has a correlation substantively below the other models (Phn-MS-Corr of ground truth is 0.47), indicating conditioning on duration context lctx is beneficial.",
       "zh": "更大的差异体现在 Phn-MS-Corr 上：无条件回归的相关性明显低于其他模型（真实值的 Phn-MS-Corr 为 0.47），说明以时长上下文 lctx 为条件是有益的。"
      },
      {
       "id": "s-C-3-3-3",
       "original": "Flow-matching shows the largest distinction versus regression on the distributional comparison captured by FDD.",
       "zh": "流匹配与回归最大的区别体现在 FDD 所刻画的分布对比上。"
      },
      {
       "id": "s-C-3-3-4",
       "original": "The regression models have generally larger FDD because they underestimate the standard deviation in phoneme and silence durations, and hence produce samples with less duration diversity and more regular duration lengths.",
       "zh": "回归模型的 FDD 普遍更大，因为它们低估了音素与静音时长的标准差，从而生成时长多样性更低、时长更规整的样本。"
      }
     ]
    },
    {
     "id": "p-C-3-4",
     "type": "paragraph",
     "page": 33,
     "sentences": [
      {
       "id": "s-C-3-4-1",
       "original": "Table C7: English TTS duration metrics on LS test-other.",
       "zh": "表 C7：LS test-other 上的英语 TTS 时长指标。"
      },
      {
       "id": "s-C-3-4-2",
       "original": "Duration Model Phn-MS-MAE Phn-FDD Sil-MS-MAE Sil-FDD Unconditional Regression 2.53 0.72 5.32 2.39 Duration-conditional Regression 2.52 0.76 5.10 8.40 Duration-conditional Flow Matching 2.63 0.61 5.18 2.48 Table C8: English second-half infilling duration metrics on LS test-other.",
       "zh": "（表内数字）时长模型 Phn-MS-MAE／Phn-FDD／Sil-MS-MAE／Sil-FDD：无条件回归 2.53 0.72 5.32 2.39；时长条件回归 2.52 0.76 5.10 8.40；时长条件流匹配 2.63 0.61 5.18 2.48。表 C8：LS test-other 上的英语后半段填充时长指标。"
      }
     ]
    },
    {
     "id": "p-C-3-5",
     "type": "paragraph",
     "page": 33,
     "sentences": [
      {
       "id": "s-C-3-5-1",
       "original": "Duration Model Phn-MS-MAE Phn-MS-Corr Sil-MS-MAE Unconditional Regression 2.57 0.26 5.44 Duration-conditional Regression 2.45 0.35 5.20 Duration-conditional Flow Matching 2.52 0.41 5.32",
       "zh": "（表内数字）时长模型 Phn-MS-MAE／Phn-MS-Corr／Sil-MS-MAE：无条件回归 2.57 0.26 5.44；时长条件回归 2.45 0.35 5.20；时长条件流匹配 2.52 0.41 5.32。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-C-4",
   "num": "C.4",
   "level": 2,
   "page": 33,
   "title": {
    "original": "Duration model evaluation with end-to-end metrics",
    "zh": "C.4 用端到端指标评估时长模型"
   },
   "blocks": [
    {
     "id": "p-C-4-1",
     "type": "paragraph",
     "page": 33,
     "sentences": [
      {
       "id": "s-C-4-1-1",
       "original": "We now present end-to-end metrics for our three duration variants for zero-shot TTS cross-sentence and continuation, as well as diverse speech generation, corresponding to Sections 5.2 and 5.5.",
       "zh": "下面我们给出三个时长变体在零样本 TTS 跨句与续写、以及多样化语音生成（对应 5.2 节与 5.5 节）上的端到端指标。"
      },
      {
       "id": "s-C-4-1-2",
       "original": "Zero-shot TTS cross-sentence and continuation results are shown in Table C10 and diverse speech generation results in Table C9.",
       "zh": "零样本 TTS 跨句与续写结果见表 C10，多样化语音生成结果见表 C9。"
      },
      {
       "id": "s-C-4-1-3",
       "original": "These results are not comparable with the main text as they utilize the flow-matching model described in Appendix B.1, denoted as VB-En-1K.",
       "zh": "这些结果与正文不可比，因为此处使用的是附录 B.1 所述的流匹配模型，记为 VB-En-1K。"
      }
     ]
    },
    {
     "id": "p-C-4-2",
     "type": "paragraph",
     "page": 33,
     "sentences": [
      {
       "id": "s-C-4-2-1",
       "original": "Overall, FSD and SIM are similar across duration variants.",
       "zh": "总体而言，FSD 与 SIM 在各时长变体间相近。"
      },
      {
       "id": "s-C-4-2-2",
       "original": "On the other hand, WER is sensitive to the choice of duration model, where the duration-conditional regression achieves a substantially lower WER.",
       "zh": "另一方面，WER 对时长模型的选择敏感：时长条件回归取得了明显更低的 WER。"
      },
      {
       "id": "s-C-4-2-3",
       "original": "Subjective listening from the duration-conditional regression and flow-matching confirms that the regression model is producing more regular patterns of speech, that may be easier for ASR to recognize, while sacrificing some duration diversity.",
       "zh": "对时长条件回归与流匹配的主观试听证实：回归模型生成的语音模式更规整、可能更易被 ASR 识别，但牺牲了一部分时长多样性。"
      }
     ]
    },
    {
     "id": "p-C-4-3",
     "type": "paragraph",
     "page": 33,
     "sentences": [
      {
       "id": "s-C-4-3-1",
       "original": "Table C9: Diverse speech generation from LS test-other text.",
       "zh": "表 C9：从 LS test-other 文本生成多样化语音。"
      },
      {
       "id": "s-C-4-3-2",
       "original": "Duration Model with VB-En-1K FSD (LS-train) Unconditional Regression 3.8 148.7 Duration-conditional Regression 3.7 148.1 Duration-conditional Flow Matching 5.4 155.1",
       "zh": "（表内数字）时长模型（配 VB-En-1K）WER／FSD（LS-train）：无条件回归 3.8 148.7；时长条件回归 3.7 148.1；时长条件流匹配 5.4 155.1。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-C-5",
   "num": "C.5",
   "level": 2,
   "page": 33,
   "title": {
    "original": "MOS instructions",
    "zh": "C.5 MOS 说明"
   },
   "blocks": [
    {
     "id": "p-C-5-1",
     "type": "paragraph",
     "page": 33,
     "sentences": [
      {
       "id": "s-C-5-1-1",
       "original": "Table C11 shows the instruction presented to the raters for quality mean opinion score study.",
       "zh": "表 C11 给出质量平均意见分（QMOS）评测中展示给评分者的说明。"
      },
      {
       "id": "s-C-5-1-2",
       "original": "Table C12 shows the instruction presented to the raters for similarity mean opinion score study.",
       "zh": "表 C12 给出相似度平均意见分（SMOS）评测中展示给评分者的说明。"
      }
     ]
    },
    {
     "id": "p-C-5-2",
     "type": "paragraph",
     "page": 34,
     "sentences": [
      {
       "id": "s-C-5-2-1",
       "original": "Table C10: English zero-shot TTS results on filtered LS test-clean.",
       "zh": "表 C10：过滤后 LS test-clean 上的英语零样本 TTS 结果。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-duration-model-with-vb-en-1k",
   "num": null,
   "level": 2,
   "page": 34,
   "title": {
    "original": "Duration Model with VB-En-1K",
    "zh": "时长模型（配 VB-En-1K，表 C10/C11 残留）"
   },
   "blocks": [
    {
     "id": "p-duration-model-with-vb-en-1k-1",
     "type": "paragraph",
     "page": 34,
     "sentences": [
      {
       "id": "s-duration-model-with-vb-en-1k-1-1",
       "original": "SIM-r cross-sentence Unconditional Regression 3.0 0.538 0.584 Duration-conditional Regression 2.7 0.545 0.591 Duration-conditional Flow Matching 3.4 0.528 0.578 continuation Unconditional Regression 2.5 0.485 0.524 Duration-conditional Regression 2.2 0.491 0.533 Duration-conditional Flow Matching 2.7 0.481 0.525 Table C11: Quality mean opinion score (QMOS) instruction.",
       "zh": "（表内数字）SIM-r：跨句——无条件回归 3.0 0.538 0.584，时长条件回归 2.7 0.545 0.591，时长条件流匹配 3.4 0.528 0.578；续写——无条件回归 2.5 0.485 0.524，时长条件回归 2.2 0.491 0.533，时长条件流匹配 2.7 0.481 0.525。表 C11：质量平均意见分（QMOS）说明。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-introduction",
   "num": null,
   "level": 2,
   "page": 34,
   "title": {
    "original": "Introduction",
    "zh": "介绍（QMOS 说明）"
   },
   "blocks": [
    {
     "id": "p-introduction-1",
     "type": "paragraph",
     "page": 34,
     "sentences": [
      {
       "id": "s-introduction-1-1",
       "original": "Your task is to evaluate the subjective quality and intelligibility of the speech from short (2-8 second) audio files.",
       "zh": "你的任务是评估短音频文件（2-8 秒）中语音的主观音质与可懂度。"
      },
      {
       "id": "s-introduction-1-2",
       "original": "Each HIT can be completed in roughly around 120 seconds.",
       "zh": "每个 HIT 大约 120 秒可以完成。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-task-instructions",
   "num": null,
   "level": 2,
   "page": 34,
   "title": {
    "original": "Task Instructions",
    "zh": "任务说明（QMOS）"
   },
   "blocks": [
    {
     "id": "p-task-instructions-1",
     "type": "paragraph",
     "page": 34,
     "sentences": [
      {
       "id": "s-task-instructions-1-1",
       "original": "In this task you will hear samples of speech recordings.",
       "zh": "在本任务中，你将听到语音录音样本。"
      },
      {
       "id": "s-task-instructions-1-2",
       "original": "The purpose of this test is to evaluate the quality and intelligibility of each file in terms of its overall sound quality and the amount of mumbling and unclear phrases in the recording.",
       "zh": "本测试的目的是从整体音质及录音中含糊不清短语的程度两方面，评估每个文件的质量与可懂度。"
      }
     ]
    },
    {
     "id": "p-task-instructions-2",
     "type": "paragraph",
     "page": 34,
     "sentences": [
      {
       "id": "s-task-instructions-2-1",
       "original": "Please keep in mind that speech samples can be distorted and noisy, however these are only specific examples.",
       "zh": "请记住，语音样本可能失真、带噪，但这些只是具体示例。"
      }
     ]
    },
    {
     "id": "p-task-instructions-3",
     "type": "paragraph",
     "page": 34,
     "sentences": [
      {
       "id": "s-task-instructions-3-1",
       "original": "Please use a headset for listening and adjust your volume level to your comfort during this training, and do not change later during the experiment.",
       "zh": "请佩戴耳机收听，并在本培训阶段将音量调到舒适水平，之后实验中不要再改动。"
      }
     ]
    },
    {
     "id": "p-task-instructions-4",
     "type": "paragraph",
     "page": 34,
     "sentences": [
      {
       "id": "s-task-instructions-4-1",
       "original": "You should give a score according to the following scale, known as the MOS (mean opinion score) scales:",
       "zh": "请按以下标尺打分，即 MOS（平均意见分）标尺："
      }
     ]
    }
   ]
  },
  {
   "id": "sec-score-quality-and-intelligibilit",
   "num": null,
   "level": 2,
   "page": 34,
   "title": {
    "original": "Score (Quality and Intelligibility of the speech)",
    "zh": "评分（语音质量与可懂度）"
   },
   "blocks": [
    {
     "id": "p-score-quality-and-intelligibilit-1",
     "type": "paragraph",
     "page": 34,
     "sentences": [
      {
       "id": "s-score-quality-and-intelligibilit-1-1",
       "original": "5 (Excellent) 4 (Good) 3 (Fair) 2 (Poor) 1 (Bad) Table C12: Similarity mean opinion score (SMOS) instruction.",
       "zh": "5（优）4（良）3（中）2（差）1（劣）。表 C12：相似度平均意见分（SMOS）说明。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-task-name",
   "num": null,
   "level": 2,
   "page": 35,
   "title": {
    "original": "Task Name",
    "zh": "任务名称（SMOS）"
   },
   "blocks": [
    {
     "id": "p-task-name-1",
     "type": "paragraph",
     "page": 35,
     "sentences": [
      {
       "id": "s-task-name-1-1",
       "original": "Rate the similarity of the synthesized speech samples to a given prompt.",
       "zh": "对合成语音样本与给定提示的相似度打分。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-task-instructions-2",
   "num": null,
   "level": 2,
   "page": 35,
   "title": {
    "original": "Task Instructions",
    "zh": "任务说明（SMOS）"
   },
   "blocks": [
    {
     "id": "p-task-instructions-2-1",
     "type": "paragraph",
     "page": 35,
     "sentences": [
      {
       "id": "s-task-instructions-2-1-1",
       "original": "Your task is to evaluate the similarity of the synthesized speech samples to the given speech prompt.",
       "zh": "你的任务是评估合成语音样本与给定语音提示的相似度。"
      },
      {
       "id": "s-task-instructions-2-1-2",
       "original": "You should focus on the similarity of the speaker, speaking style, acoustic conditions, background noise, etc. You should rank the recordings on the scale between 1-5, where 5 is the best quality and 1 is the worst.",
       "zh": "你应关注说话人、说话风格、声学条件、背景噪声等方面的相似度。请在 1-5 之间打分，5 为质量最好，1 为最差。"
      }
     ]
    },
    {
     "id": "p-task-instructions-2-2",
     "type": "paragraph",
     "page": 35,
     "sentences": [
      {
       "id": "s-task-instructions-2-2-1",
       "original": "In other words, please rank the recordings according to their acoustic similarity to the given prompt, meaning as if they were recorded in the same place by the same speaker speaking in similar styles.",
       "zh": "换言之，请根据录音与给定提示在声学上的相似程度打分——即仿佛是同一说话人以相似风格在同一地点录制的。"
      },
      {
       "id": "s-task-instructions-2-2-2",
       "original": "This task typically requires approximately 120 seconds to complete.",
       "zh": "该任务通常需要约 120 秒完成。"
      }
     ]
    },
    {
     "id": "p-task-instructions-2-3",
     "type": "paragraph",
     "page": 35,
     "sentences": [
      {
       "id": "s-task-instructions-2-3-1",
       "original": "Please use a headset for listening and adjust your volume level to your comfort during this training, and do not change later during the experiment.",
       "zh": "请佩戴耳机收听，并在本培训阶段将音量调到舒适水平，之后实验中不要再改动。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-D",
   "num": "D",
   "level": 1,
   "page": 35,
   "title": {
    "original": "Detailed Configurations for Acoustic and Duration model training",
    "zh": "附录 D 声学模型与时长模型训练的详细配置"
   },
   "blocks": [
    {
     "id": "p-D-1",
     "type": "paragraph",
     "page": 35,
     "sentences": [
      {
       "id": "s-D-1-1",
       "original": "Table D13: Detailed configurations for the audio models used in our experiments.",
       "zh": "表 D13：实验中音频模型的详细配置。"
      }
     ]
    },
    {
     "id": "p-D-2",
     "type": "paragraph",
     "page": 35,
     "sentences": [
      {
       "id": "s-D-2-1",
       "original": "VB-En VB-Multi Model Parameters Model Dimension 1024 1024 Number of Heads 16 16 Number of Layers 24 24 Feedforward Dimension 4096 4096 Attention Dropout 0.0 0.0 Activation Dropout 0.1 0.1 ConvPos Width 31 31 ConvPos Groups 16 16 ConvPos Depth 2 2 Skip Connections Alibi Bias Training Parameters Number of Iterations 500000 750000 Number of GPUs 32 32 Learning Rate (LR) 0.0001 0.0001 Gradient Clipping Value 0.2 0.2 LR Scheduler Warmup Steps 5000 5000 Loss Masking Data Parameters Tokens per Batch 7500 7500 Conditional Dropout 0.2 0.2 Position Dependent Phones Phoneme Mask Percent 0.0, 0.0 0.0, 0.0 Spectrogram Mask Percent 0.7, 1.0 0.7, 1.0 Spectrogram Drop Percentage 0.3 0.3 Chunk Length 1600 1600 Transform Type normalize normalize Mean -5.884 -5.884 Standard Deviation 2.261 2.261 Upsampling β 0.25 Table D14: Detailed configurations for conditional flow matching based duration models used in our experiments.",
       "zh": "（表内文字）VB-En／VB-Multi。模型参数：模型维度 1024 1024；头数 16 16；层数 24 24；前馈维度 4096 4096；注意力 dropout 0.0 0.0；激活 dropout 0.1 0.1；ConvPos 宽度 31 31；ConvPos 组数 16 16；ConvPos 深度 2 2；跳跃连接：有；ALiBi 偏置：有。训练参数：迭代次数 500000 750000；GPU 数 32 32；学习率（LR）0.0001 0.0001；梯度裁剪值 0.2 0.2；LR 调度器预热步数 5000 5000；损失掩蔽：有。数据参数：每批 token 数（帧）7500 7500；条件 dropout 0.2 0.2；位置相关音素：有；音素掩蔽比例 0.0, 0.0／0.0, 0.0；频谱图掩蔽比例 0.7, 1.0／0.7, 1.0；频谱图丢弃比例 0.3 0.3；切块长度 1600 1600；变换类型 normalize normalize；均值 -5.884 -5.884；标准差 2.261 2.261；上采样 β 0.25。表 D14：实验中基于条件流匹配的时长模型的详细配置。"
      },
      {
       "id": "s-D-2-2",
       "original": "For regression based model, we use the same configurations but use regression loss.",
       "zh": "回归模型使用相同配置，但改用回归损失。"
      }
     ]
    },
    {
     "id": "p-D-3",
     "type": "paragraph",
     "page": 36,
     "sentences": [
      {
       "id": "s-D-3-1",
       "original": "VB-En VB-Multi Model Parameters Model Dimension 512 768 Number of Layers 8 10 Feedforward Dimension 2048 2048 Attention Dropout 0.1 0.1 Activation Dropout 0.1 0.1 ConvPos Width 15 15 ConvPos Groups 16 16 ConvPos Depth 2 2 Skip Connections Alibi Bias Training Parameters Number of Iterations 600000 600000 Number of GPUs 4 4 Learning Rate (LR) 0.0001 0.0001 LR Scheduler Warmup Steps 5000 5000 Loss Masking Data Parameters Conditional Dropout 0.2 0.2 Upsampling β 0.5 Tokens per Batch 15000 15000 Duration Drop Percentage 0.2 0.2 Duration Mask Percent 0.1, 1.0 0.1, 1.0 Position Dependent Phones Transform Type log log",
       "zh": "（表内文字）VB-En／VB-Multi。模型参数：模型维度 512 768；层数 8 10；前馈维度 2048 2048；注意力 dropout 0.1 0.1；激活 dropout 0.1 0.1；ConvPos 宽度 15 15；ConvPos 组数 16 16；ConvPos 深度 2 2；跳跃连接：有；ALiBi 偏置：有。训练参数：迭代次数 600000 600000；GPU 数 4 4；学习率（LR）0.0001 0.0001；LR 调度器预热步数 5000 5000；损失掩蔽：有。数据参数：条件 dropout 0.2 0.2；上采样 β 0.5；每批 token 数 15000 15000；时长丢弃比例 0.2 0.2；时长掩蔽比例 0.1, 1.0／0.1, 1.0；位置相关音素：有；变换类型 log log。"
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
    "quote": "it subsumes many tasks as one can convert them into some form of context"
   },
   "kind": "concept",
   "title": "一切皆上下文",
   "explanation": "这是 Voicebox 的核心思想：只要把任务改写成“给定上下文补全缺失片段”，一个填充目标就覆盖了零样本 TTS、去噪、编辑等所有任务。代价是灵活性来自条件构造，而非架构本身——后续工作都沿用了这一抽象。",
   "explanation_plain": "一个填充目标，靠构造不同的上下文就能变出所有语音任务。",
   "featured": true
  },
  {
   "id": "ann-002",
   "anchor": {
    "sentence_id": "s-2-3-3",
    "quote": "Instead of learning an explicit embedding to control style, infilling models predict speech coherent to the context"
   },
   "kind": "comparison",
   "title": "不学风格嵌入",
   "explanation": "传统可控 TTS 要显式学一个风格嵌入向量来控制音色与韵律；填充模型则让生成结果直接向上下文对齐，风格作为上下文的自然延续出现。这省掉了风格标签与嵌入器，但也意味着无法独立控制单个属性（见局限性一节）。",
   "featured": false
  },
  {
   "id": "ann-003",
   "anchor": {
    "sentence_id": "s-3-1-1-1",
    "quote": "drawn from some unknown distribution q(x)"
   },
   "kind": "concept",
   "title": "流匹配的起点",
   "explanation": "流匹配（flow matching）的目标是学一个向量场，把简单先验分布连续变换到数据分布 q(x)，而无需像扩散模型那样做得分匹配。Voicebox 采用最优传输（OT）路径，5.8 节证明它训练与推理都显著快于扩散路径。",
   "featured": true
  },
  {
   "id": "ann-004",
   "anchor": {
    "sentence_id": "s-3-3-1-2",
    "quote": "lj denotes how many audio frames yj correspond to"
   },
   "kind": "concept",
   "title": "时长即对齐",
   "explanation": "Voicebox 把音素与帧的对齐显式建模为时长序列 l：音素级条件先经时长模型预测 l，再用 rep(y, l) 展开成帧级条件送给音频模型。时长模型与音频模型分离，是它能做“预测时长后重说一遍”这类编辑操作的关键。",
   "featured": false
  },
  {
   "id": "ann-005",
   "anchor": {
    "sentence_id": "s-audio-model-fig-2-1-3",
    "quote": "80-dimensional log Mel spectrogram"
   },
   "kind": "engineering",
   "title": "为什么选 Mel",
   "explanation": "音频用 100Hz 的 80 维对数 Mel 频谱表示，比 Encodec 的 75Hz×128 维（每秒 9.6K 维）更省。附录 B.5 专门对比了四种特征＋声码器组合：Mel＋HiFi-GAN 在重建质量上与 Encodec 互有胜负，但维度更低、声码器更成熟。",
   "featured": false
  },
  {
   "id": "ann-006",
   "anchor": {
    "sentence_id": "s-3-5-2-1",
    "quote": "classifier free guidance (CFG) to flow-matching models"
   },
   "kind": "concept",
   "title": "CFG 搬到流匹配",
   "explanation": "作者把扩散模型里的分类器自由引导推广到流匹配：以概率 puncond=0.2 丢弃条件，推理时用 α 在有条件与无条件向量场之间外插。注意 CFG 让每次 ODE 评估变成两次前向，相同 NFE 下计算量翻倍——这是调 NFE 时要算清的账。",
   "explanation_plain": "引导强度 α 越高越贴近条件，但推理成本翻倍。",
   "featured": true
  },
  {
   "id": "ann-007",
   "anchor": {
    "sentence_id": "s-4-2-3",
    "quote": "unfairly penalizes generative models that produce realistic and valid samples"
   },
   "kind": "critique",
   "title": "信号指标的偏置",
   "explanation": "MCD、SNR 这类信号级指标暗含“给定输入输出唯一确定”的假设，对生成模型天然不公：一个真实但不同的合理样本会被重罚。本文据此全面转向基于模型的感知指标（WER/SIM/FSD），这一立场后来被多数 TTS 论文继承。",
   "featured": true
  },
  {
   "id": "ann-008",
   "anchor": {
    "sentence_id": "s-correctness-and-intelligibility-2-2",
    "quote": "leads to a higher WER, which does not imply the sample is bad"
   },
   "kind": "critique",
   "title": "WER 的反向陷阱",
   "explanation": "用 ASR 的 WER 衡量可懂度有个隐蔽陷阱：风格更夸张、噪声更多的样本 WER 天然偏高，并不等于质量差。后文 5.6 节正好撞上这一点——低 NFE 样本更“平庸”反而 WER 更低。读所有 Voicebox 系论文的 WER 数字时都要带上这个心眼。",
   "featured": true
  },
  {
   "id": "ann-009",
   "anchor": {
    "sentence_id": "s-coherence-1-4",
    "quote": "SIM-resyn (SIM- r)"
   },
   "kind": "critique",
   "title": "SIM-r 不可比",
   "explanation": "VALL-E 报告的相似度是相对于其声码器重合成上下文算的（SIM-r），换不同声码器的模型之间不可比。本文提倡的 SIM-o（相对原始音频）才是公平口径。对比不同论文的相似度数字时，先确认分母是 resyn 还是 orig。",
   "featured": false
  },
  {
   "id": "ann-010",
   "anchor": {
    "sentence_id": "s-diversity-and-quality-1-4",
    "quote": "Fréchet Speech Distance (FSD)"
   },
   "kind": "concept",
   "title": "FSD 的由来",
   "explanation": "FSD 是把图像领域的 FID 搬到语音：用 wav2vec 2.0 第 6 层特征拟合两个高斯并算 Fréchet 距离。附录 C.1 证明它能正确反映说话人多样性与加噪质量，而 FAD（音频事件特征）做不到——特征选择决定了分布指标的成败。",
   "featured": false
  },
  {
   "id": "ann-011",
   "anchor": {
    "sentence_id": "s-5-1-1-1",
    "quote": "60K hours ASR-transcribed English audiobooks"
   },
   "kind": "number",
   "title": "训练数据量级",
   "explanation": "英语模型 60K 小时、多语言模型 50K 小时有声书，文本标签全部由 ASR 自动转写。这个规模是同期 VALL-E（60K 小时 Librilight）的同级，但全部是朗读风格的有声书——这直接决定了它在会话语音上的短板（见局限性）。",
   "featured": false
  },
  {
   "id": "ann-012",
   "anchor": {
    "sentence_id": "s-model-1-5",
    "quote": "in the style of the UNet architecture"
   },
   "kind": "engineering",
   "title": "UNet 式跳连",
   "explanation": "音频模型在对称层之间加 UNet 式跳跃连接（首层接末层、次层接倒二层），状态按通道拼接后线性融合。这让 24 层 Transformer 在流匹配的逐步细化中保留低层细节，是稳定大模型训练的一个低成本技巧。",
   "featured": false
  },
  {
   "id": "ann-013",
   "anchor": {
    "sentence_id": "s-training-1-6",
    "quote": "r ∼U[70, 100]/U[10, 100]"
   },
   "kind": "engineering",
   "title": "掩蔽比例的讲究",
   "explanation": "音频序列每次掩蔽连续一段，长度占序列的 r%，r 从 U[70,100] 采样——即训练时让模型见惯“大面积缺失”；时长模型则是 U[10,100]。大面积掩蔽迫使模型真正依赖文本与剩余上下文，而非局部插值，这是填充能力强的关键训练配方。",
   "featured": true
  },
  {
   "id": "ann-014",
   "anchor": {
    "sentence_id": "s-inference-1-2",
    "quote": "midpoint solver is used with a step size of 0.0625 (NFE=32)"
   },
   "kind": "engineering",
   "title": "默认 32 次评估",
   "explanation": "推理用定步长中点 ODE 求解器，默认 NFE=32。5.6 节显示 NFE=2 时已能出可用结果（0.31 秒、比 VALL-E 快约 20 倍），NFE=8 起质量显著提升——实际部署可以按延迟预算在 2 到 64 之间自由换挡。",
   "explanation_plain": "NFE 就是质量与延迟的旋钮。",
   "featured": false
  },
  {
   "id": "ann-015",
   "anchor": {
    "sentence_id": "s-5-2-2-4",
    "quote": "+0.141 SIM-o on continuation"
   },
   "kind": "number",
   "title": "相似度差距有多大",
   "explanation": "SIM 量表上 0.1 已是很明显的差距：Voicebox 对 VALL-E 在续写设置下 SIM-r 高 0.108，换到更公平的 SIM-o 口径差距拉大到 0.141。这说明 VALL-E 的高相似度有一部分是“声码器口径”给的，Voicebox 的风格迁移优势比表面数字更大。",
   "featured": true
  },
  {
   "id": "ann-016",
   "anchor": {
    "sentence_id": "s-5-3-2-2",
    "quote": "3.1%/5.9%/8.1% lower WERs"
   },
   "kind": "number",
   "title": "跨语言的红利",
   "explanation": "在 YourTTS 支持的 En/Fr/Pt 上，Voicebox 的 WER 分别低 3.1/5.9/8.1 个百分点——注意 YourTTS 本就是在这些语言上专门训练的，而 Voicebox 从未见过同一说话人跨语言的样本。这说明跨语言风格迁移可以从单语数据中涌现，无需跨语言平行语料。",
   "featured": false
  },
  {
   "id": "ann-017",
   "anchor": {
    "sentence_id": "s-5-5-1-5",
    "quote": "lower FSDs than the real samples from the Librispeech test-other split"
   },
   "kind": "critique",
   "title": "比真实还“真实”？",
   "explanation": "Voicebox 的 FSD 低于真实 test-other 样本，这不是模型超越了真实，而是参考集（60K 小时有声书）的说话人多样性本来就高于只有数十位说话人的 test-other。FSD 衡量的是与参考分布的距离，读数永远要先问“参考是谁”。",
   "featured": false
  },
  {
   "id": "ann-018",
   "anchor": {
    "sentence_id": "s-5-5-6-3",
    "quote": "only lags behind real data by 0.4% and 1.7% absolute"
   },
   "kind": "number",
   "title": "合成数据可用了",
   "explanation": "只用 Voicebox 合成语音训练的 ASR，在 test-clean/test-other 上仅比 100 小时真实数据差 0.4%/1.7% WER——这是“合成语音训练 ASR”首次接近实用水平。对低资源语言来说，这条路径意味着 TTS 可以直接当 ASR 的数据工厂。",
   "explanation_plain": "合成语音第一次接近能当真数据用。",
   "featured": true
  },
  {
   "id": "ann-019",
   "anchor": {
    "sentence_id": "s-5-6-1-1",
    "quote": "about 20 times faster than VALL-E"
   },
   "kind": "comparison",
   "title": "20 倍速的来源",
   "explanation": "NFE=2 时生成 10 秒音频只需 0.31 秒，比自回归的 VALL-E 快约 20 倍。根本原因是 NAR 架构一次前向产出全部帧，且流匹配允许用极少步数粗采样；而自回归 codec 模型必须逐 token 串行解码数千步。速度与质量的权衡完全由 NFE 一个旋钮控制。",
   "featured": true
  },
  {
   "id": "ann-020",
   "anchor": {
    "sentence_id": "s-5-7-7-5",
    "quote": "the model is more likely to assume that the whole sentence is in English"
   },
   "kind": "critique",
   "title": "提示越长越跑偏",
   "explanation": "跨语言迁移时提示越长 WER 越高，尤以英语→其他语言为甚：英语占多语言训练数据 90% 以上，长英语提示让模型“认定”整句都是英语。这是数据不均衡与上下文学习相互放大的典型案例，也提醒后续多语模型要控制语言比例。",
   "featured": true
  },
  {
   "id": "ann-021",
   "anchor": {
    "sentence_id": "s-5-8-2-2",
    "quote": "even outperforms SM w/ diff using only 50K updates"
   },
   "kind": "number",
   "title": "OT 路径快三倍",
   "explanation": "带最优传输路径的流匹配用 50K 步就超过得分匹配 150K 步的水平，且推理仅需 8 次 NFE（SM 需 64 次以上）。OT 路径让传输轨迹更直，向量场更易学——这一消融是后来 TTS 领域普遍转向流匹配的直接证据。",
   "featured": true
  },
  {
   "id": "ann-022",
   "anchor": {
    "sentence_id": "s-6-2-6",
    "quote": "sliding window with hop length equal to 250ms"
   },
   "kind": "engineering",
   "title": "检测器的软肋",
   "explanation": "合成语音检测器用 250ms 滑窗逐段分类再取平均。表 10 显示掩蔽比例越低（合成片段越少）准确率越降，正是因为多数窗口是真实语音，平均稀释了合成证据。想部署这类检测器，逐窗投票或注意力汇聚比朴素平均更靠谱。",
   "featured": false
  },
  {
   "id": "ann-023",
   "anchor": {
    "sentence_id": "s-limitation-2-1",
    "quote": "depends on a phonemizer and a forced aligner"
   },
   "kind": "critique",
   "title": "管线依赖的代价",
   "explanation": "Voicebox 需要音素化器＋强制对齐器提供帧级音素转写：词级音素化无法处理连诵等上下文发音，对齐失败直接剔除数据。这条管线依赖正是后来 fully-NAR 模型（如 F5-TTS、E2-TTS）刻意消除的边界——它们用字符/拼音填充替代音素对齐，证明了去音素化可行。",
   "explanation_plain": "对音素对齐器的依赖，是后续模型最想砍掉的部分。",
   "featured": true
  },
  {
   "id": "ann-024",
   "anchor": {
    "sentence_id": "s-limitation-4-1",
    "quote": "does not allow independent control of each attribute"
   },
   "kind": "critique",
   "title": "属性不可拆分",
   "explanation": "Voicebox 能整体迁移音色、风格、情绪、声学环境，但无法“要甲的音色配乙的情绪”——因为所有属性都打包在同一段上下文音频里整体延续。这是“风格来自上下文”设计（见 ann-002）的一体两面：解耦控制需要额外的属性条件化机制。",
   "featured": false
  },
  {
   "id": "ann-025",
   "anchor": {
    "sentence_id": "s-A-2-2-3",
    "quote": "ghost silence"
   },
   "kind": "engineering",
   "title": "零帧静音的妙用",
   "explanation": "推理时只有文本，不知道哪里该停顿。作者的解法是在训练转写里插入时长为零的“幽灵静音”，让时长模型自己决定每个词间位置是否存在静音及其长度。一个不花标注成本的小技巧，把“是否停顿”从外部知识变成了可学习量。",
   "featured": false
  },
  {
   "id": "ann-026",
   "anchor": {
    "sentence_id": "s-B-2-1-5",
    "quote": "the reference distribution is computed from the 1K hour English audiobook data"
   },
   "kind": "critique",
   "title": "FSD 的参考幻觉",
   "explanation": "数据从 6K 小时扩到 60K 小时时 FSD 反而变差，作者解释为参考分布算自多样性更低的 1K 小时数据。这提醒我们：FSD 类分布指标的读数完全由参考集定义，跨论文、跨参考集比较没有意义——报告 FSD 必须同时报参考集。",
   "featured": false
  }
 ]
};
