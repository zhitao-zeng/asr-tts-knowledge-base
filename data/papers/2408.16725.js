// 自动生成：2408.16725 全文双语精读数据（由 tools/compile_paper.js 装配）
// 结构/原文来自 .cache/papers/2408.16725.json（tools/extract_paper.py）；
// 翻译与讲解来自 .cache/papers/zh/2408.16725/（LLM agent 撰写）。
// 改翻译请改片段后重新装配；勿手改本文件的结构与 original 字段。
globalThis.PAPER_2408_16725 = {
 "paper_id": "2408.16725",
 "model_id": "mini_omni",
 "title": {
  "original": "Mini-Omni: Language Models Can Hear, Talk While Thinking in Streaming",
  "zh": "Mini-Omni：语言模型可以在流式推理中边思考边听、边说"
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
       "original": "Zhifei Xie♠♣∗ xzf24@mails.tsinghua.edu.cn Changqiao Wu♠∗ wuchangqiao@inspirai.com ♠Inspirai ♣Tsinghua University https://github.com/gpt-omni/mini-omni"
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
       "original": "Recent advances in language models have achieved significant progress.",
       "zh": "语言模型的近期进展已取得显著突破。"
      },
      {
       "id": "s-abstract-1-2",
       "original": "GPT-4o, as a new milestone, has enabled real-time conversations with humans, demonstrating near-human natural fluency.",
       "zh": "GPT-4o 作为新的里程碑，实现了与人类的实时对话，展现出接近人类的自然流畅度。"
      },
      {
       "id": "s-abstract-1-3",
       "original": "Such human-computer interaction necessitates models with the capability to perform reasoning directly with the audio modality and generate output in streaming.",
       "zh": "这种人机交互要求模型能够直接在音频模态上进行推理，并以流式方式生成输出。"
      },
      {
       "id": "s-abstract-1-4",
       "original": "However, this remains beyond the reach of current academic models, as they typically depend on extra TTS systems for speech synthesis, resulting in undesirable latency.",
       "zh": "然而，这对当前学术界模型而言仍难以企及，因为它们通常依赖额外的 TTS 系统进行语音合成，导致不可接受的延迟。"
      },
      {
       "id": "s-abstract-1-5",
       "original": "This paper introduces the Mini-Omni, an audio-based end-to-end conversational model, capable of real-time speech interaction.",
       "zh": "本文介绍 Mini-Omni，一个基于音频的端到端对话模型，能够实现实时语音交互。"
      },
      {
       "id": "s-abstract-1-6",
       "original": "To achieve this capability, we propose a text-instructed speech generation method, along with batch-parallel strategies during inference to further boost the performance.",
       "zh": "为实现这一能力，我们提出了一种文本指令化的语音生成方法，并在推理阶段结合批量并行策略以进一步提升性能。"
      },
      {
       "id": "s-abstract-1-7",
       "original": "Our method also helps to retain the original model’s language capabilities with minimal degradation, enabling other works to establish real-time interaction capabilities.",
       "zh": "我们的方法还确保了模型在最小化文本能力损失的前提下，使其他研究也能建立实时交互能力。"
      },
      {
       "id": "s-abstract-1-8",
       "original": "We call this training method \"Any Model Can Talk\".",
       "zh": "我们将这种训练方法称为「Any Model Can Talk」。"
      },
      {
       "id": "s-abstract-1-9",
       "original": "We also introduce the VoiceAssistant-400K dataset to fine-tune models optimized for speech output.",
       "zh": "我们还构建了 VoiceAssistant-400K 数据集，用于微调模型以优化语音输出质量。"
      },
      {
       "id": "s-abstract-1-10",
       "original": "To our best knowledge, Mini-Omni is the first fully end-to-end, open-source model for real-time speech interaction, offering valuable potential for future research.",
       "zh": "据我们所知，Mini-Omni 是第一个完全端到端、开源的实时语音交互模型，为未来研究提供了宝贵的潜力。"
      }
     ]
    },
    {
     "id": "fig-abstract-1",
     "type": "figure_caption",
     "page": 1,
     "original": "Figure 1: The Mini-Omni model architecture.",
     "zh": "图 1：Mini-Omni 模型架构。"
    },
    {
     "id": "p-abstract-2",
     "type": "paragraph",
     "page": 1,
     "sentences": [
      {
       "id": "s-abstract-2-1",
       "original": "∗Equal contribution.",
       "zh": "∗同等贡献。"
      },
      {
       "id": "s-abstract-2-2",
       "original": "Work done during Zhifei Xie’s internship at Inspirai.",
       "zh": "本工作在 Zhifei Xie 于 Inspirai 实习期间完成。"
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
       "original": "Technical report.",
       "zh": "技术报告。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-1",
   "num": "1",
   "level": 1,
   "page": 2,
   "title": {
    "original": "Introduction",
    "zh": "引言"
   },
   "blocks": [
    {
     "id": "p-1-1",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-1-1-1",
       "original": "Recent developments in large language models have progressed rapidly, with models becoming increasingly powerful, such as off-the-shelf Llama 3.1 [meta, 2024], Mixtral [mixtral, 2024], Qwen-2 [Yang et al., 2024a], and the well-known GPT-4.",
       "zh": "近年来大语言模型发展迅速，模型能力不断增强，如现成的 Llama 3.1 [meta, 2024]、Mixtral [mixtral, 2024]、Qwen-2 [Yang et al., 2024a] 以及著名的 GPT-4。"
      },
      {
       "id": "s-1-1-2",
       "original": "As an extension of their capabilities, language models are beginning to master understanding other modalities, exemplified by LLaVA [Liu et al., 2024], Qwen2-Audio [Chu et al., 2024] and Video-llama [Zhang et al., 2023b].",
       "zh": "作为能力延伸，语言模型开始掌握理解其他模态的能力，典型例子包括 LLaVA [Liu et al., 2024]、Qwen2-Audio [Chu et al., 2024] 和 Video-llama [Zhang et al., 2023b]。"
      },
      {
       "id": "s-1-1-3",
       "original": "Despite their strength in specific tasks, a significant gap remains that hinders further integration of large language models into daily application: real-time voice interaction capability.",
       "zh": "尽管它们在特定任务上表现强劲，但阻碍大语言模型进一步融入日常应用的关键差距依然存在：实时语音交互能力。"
      },
      {
       "id": "s-1-1-4",
       "original": "GPT-4o [openai, 2024], introduced by OpenAI, is the first model to feature real-time multimodal speech interaction capabilities.",
       "zh": "OpenAI 推出的 GPT-4o [openai, 2024] 是首个具备实时多模态语音交互能力的模型。"
      },
      {
       "id": "s-1-1-5",
       "original": "It can understand and engage with vision, audio, and text while enabling real-time speech conversations, although it remains closed-source.",
       "zh": "它可以理解并交互视觉、音频和文本，同时实现实时语音对话，但它仍然是闭源的。"
      },
      {
       "id": "s-1-1-6",
       "original": "Other models typically adopt two approaches to incorporate speech capabilities.",
       "zh": "其他模型通常采用两种方法来引入语音能力。"
      },
      {
       "id": "s-1-1-7",
       "original": "The first is a cascade method, where the language model generates text, followed by a text-to-speech (TTS) model for audio synthesis.",
       "zh": "第一种是级联方法：语言模型先生成文本，再由文本转语音（TTS）模型合成音频。"
      },
      {
       "id": "s-1-1-8",
       "original": "This approach introduces significant latency due to the time required for text generation, severely impacting user experience.",
       "zh": "这种方法由于文本生成所需时间而引入显著延迟，严重影响用户体验。"
      },
      {
       "id": "s-1-1-9",
       "original": "The second, an end-to-end method like SpeechGPT [Zhang et al., 2023a], generates text before continuing to generate audio.",
       "zh": "第二种是端到端方法，如 SpeechGPT [Zhang et al., 2023a]，先生成文本再继续生成音频。"
      },
      {
       "id": "s-1-1-10",
       "original": "However, this still requires waiting for text generation.",
       "zh": "然而，这仍然需要等待文本生成完成。"
      },
      {
       "id": "s-1-1-11",
       "original": "Large language models need real end-to-end speech output capabilities to provide real-time feedback.",
       "zh": "大语言模型需要真正的端到端语音输出能力，才能提供实时反馈。"
      }
     ]
    },
    {
     "id": "p-1-2",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-1-2-1",
       "original": "Enhancing models with speech output capabilities is a challenging task, primarily due to four factors: (1) Complexity of Audio Reasoning: Our experiments indicate that direct training for audio modality reasoning is highly challenging, often resulting in incoherent outputs from the model.",
       "zh": "为模型赋予语音输出能力是一项具有挑战性的任务，主要归因为四个因素：(1) 音频推理的复杂性：我们的实验表明，直接训练音频模态推理极具挑战，模型输出往往不连贯。"
      },
      {
       "id": "s-1-2-2",
       "original": "(2) Model Complexity: Incorporating additional modules for speech input and output increases the overall complexity.",
       "zh": "(2) 模型复杂性：引入额外的语音输入输出模块会增加整体复杂度。"
      },
      {
       "id": "s-1-2-3",
       "original": "(3) Difficulty in Modality Alignment: The reasoning abilities developed for text are difficult to transfer to the audio domain.",
       "zh": "(3) 模态对齐的难度：在文本领域开发的推理能力难以迁移到音频领域。"
      },
      {
       "id": "s-1-2-4",
       "original": "(4) Resource Demands: Adapting a model’s text capabilities to the speech modality requires converting all data labels into audio and retraining, significantly increasing resource consumption.",
       "zh": "(4) 资源需求：将模型的文本能力适配到语音模态需要把所有数据标签转换为音频并重新训练，显著增加资源消耗。"
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
       "original": "In this paper, we propose Mini-Omni, the first open-source multi-model large language model with real-time conversational capabilities, featuring fully end-to-end speech input and output abilities.",
       "zh": "本文提出 Mini-Omni，首个具备实时对话能力的开源多模态大语言模型，拥有完全端到端的语音输入输出能力。"
      },
      {
       "id": "s-1-3-2",
       "original": "It also includes various other audio-to-text functionalities such as Automatic Speech Recognition (ASR).",
       "zh": "它还包含多种其他音频转文本功能，如自动语音识别（ASR）。"
      },
      {
       "id": "s-1-3-3",
       "original": "We adapt currently available off-the-shelf methods for discretizing speech tokens and employ the simplest model architecture, making it easy for our model and approach to be adapted by other researchers.",
       "zh": "我们采用现成的离散化语音 token 方法，并采用最简单的模型架构，使我们的模型和方法易于被其他研究者采用。"
      },
      {
       "id": "s-1-3-4",
       "original": "Direct audio reasoning poses significant challenges; however, our approach successfully addresses this using only a 0.5B model and a limited amount of synthesized audio data.",
       "zh": "直接音频推理带来重大挑战；然而，我们的方法仅用一个 0.5B 模型和有限的合成音频数据就成功解决了这些问题。"
      },
      {
       "id": "s-1-3-5",
       "original": "Importantly, our training framework achieves this without heavy reliance on extensive model capabilities or large volumes of data.",
       "zh": "重要的是，我们的训练框架实现这一目标时，并未过度依赖大规模模型能力或海量数据。"
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
       "original": "To leverage and preserve the original capabilities of the language model, we propose a parallel generation paradigm in which the transformer simultaneously produces audio and text tokens.",
       "zh": "为利用并保留语言模型的原始能力，我们提出了一种并行生成范式，让 Transformer 同时生成音频和文本 token。"
      },
      {
       "id": "s-1-4-2",
       "original": "Subsequently, we observed a minimal impact of the audio modality on text capabilities and further introduced batch-based parallel generation, which significantly enhances the model’s reasoning ability during streaming audio output.",
       "zh": "随后，我们观察到音频模态对文本能力影响极小，进而引入基于批量的并行生成，显著提升了模型在流式音频输出时的推理能力。"
      },
      {
       "id": "s-1-4-3",
       "original": "As a poinerr, we opted not to sacrifice audio quality for a simpler and lower bitrate audio encoder, in order to reduce the complexity of audio inference in the model.",
       "zh": "作为先驱，我们并未为了降低音频推理复杂度而牺牲音频质量去选用更简单、码率更低的音频编码器。"
      },
      {
       "id": "s-1-4-4",
       "original": "However, to ensure audio quality, we selected SNAC [Siuzdak, 2024], a music-grade encoder features 8 layers of codebooks and processes hundreds of tokens per second.",
       "zh": "然而，为确保音频质量，我们选择了 SNAC [Siuzdak, 2024]，这是一个音乐级的编码器，具有 8 层码本，每秒处理数百个 token。"
      },
      {
       "id": "s-1-4-5",
       "original": "Innovatively, we applied text-instructed delayed parallel generation to address the issue of long SNAC codebook sequences.",
       "zh": "我们创新性地应用了文本指令延迟并行生成，以解决 SNAC 码本序列过长的问题。"
      },
      {
       "id": "s-1-4-6",
       "original": "Experiments show that the audio output quality is on par with common TTS systems.",
       "zh": "实验表明，音频输出质量与常见 TTS 系统相当。"
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
       "original": "We also propose a method that requires minimal training and modification of the original model, enabling other works to rapidly develop their own speech capabilities.",
       "zh": "我们还提出了一种仅需最少训练和原始模型修改的方法，使其他工作能快速开发自己的语音能力。"
      },
      {
       "id": "s-1-5-2",
       "original": "We refer to this approach as \"Any Model Can Talk\", designed to achieve speech output using a limited amount of additional data.",
       "zh": "我们将这种方法称为「Any Model Can Talk」，旨在利用有限额外数据实现语音输出。"
      },
      {
       "id": "s-1-5-3",
       "original": "The approach extend speech capabilities through additional adapters and pre-trained models, fine-tuning with a small amount of synthesized data.",
       "zh": "该方法通过额外的适配器和预训练模型扩展语音能力，只需少量合成数据即可微调。"
      },
      {
       "id": "s-1-5-4",
       "original": "This is combined with the aforementioned parallel modeling approach to enable streaming output in the new modality while preserving the original model’s reasoning capabilities.",
       "zh": "这与上述并行建模方法相结合，在保留原始模型推理能力的同时，实现新模态的流式输出。"
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
       "original": "To evaluate the capabilities of Mini-Omni, we first assessed its performance on traditional textto-speech multi-modal tasks, including text-based question answering (textQA), automatic speech recognition (ASR), text-to-speech response, and speech-based question answering (speechQA).",
       "zh": "为评估 Mini-Omni 的能力，我们首先在传统文本转语音多模态任务上测试其性能，包括基于文本的问答（textQA）、自动语音识别（ASR）、文本转语音回复和基于语音的问答（speechQA）。"
      },
      {
       "id": "s-1-6-2",
       "original": "The model demonstrated strong proficiency in these fundamental tasks.",
       "zh": "模型在这些基础任务上展现出很强的熟练度。"
      },
      {
       "id": "s-1-6-3",
       "original": "Additionally, we conduct a series of experiments to investigate the impact on the original model’s capabilities and assess the effectiveness and variations of our inference method.",
       "zh": "此外，我们进行了一系列实验来考察其对原始模型能力的影响，并评估我们推理方法的有效性及其变体。"
      },
      {
       "id": "s-1-6-4",
       "original": "Preliminary experiments demonstrate that batch parallel inference preserves the model’s original capabilities.",
       "zh": "初步实验表明，批量并行推理保留了模型的原始能力。"
      },
      {
       "id": "s-1-6-5",
       "original": "We will conduct further experiments and provide additional details in due course.",
       "zh": "我们将在后续版本中开展更多实验并提供更多细节。"
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
       "original": "Lastly, we observed that most open-source QA datasets contain mixed code or overly lengthy text, rendering them unsuitable for speech model.",
       "zh": "最后，我们观察到大多数开源 QA 数据集包含混杂代码或过长文本，不适合语音模型。"
      },
      {
       "id": "s-1-7-2",
       "original": "To overcome this limitation, we introduce the VoiceAssistant-400K dataset, comprising over 400,000 entries specifically generated by GPT-4o for speech assistant supervised fine-tuning (SFT).",
       "zh": "为克服这一局限，我们引入了 VoiceAssistant-400K 数据集，包含超过 400,000 条专门由 GPT-4o 生成的语音助手监督微调（SFT）数据。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-in-summary-we-make-the-following",
   "num": null,
   "level": 2,
   "page": 3,
   "title": {
    "original": "In summary, we make the following contributions:",
    "zh": "总而言之，我们做出以下贡献："
   },
   "blocks": [
    {
     "id": "p-in-summary-we-make-the-following-1",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-in-summary-we-make-the-following-1-1",
       "original": "• We introduce Mini-Omni, the first open-source end-to-end multimodal large model with audio input and audio streaming output capabilities.",
       "zh": "• 我们介绍了 Mini-Omni，首个具备音频输入和音频流式输出能力的开源端到端多模态大模型。"
      },
      {
       "id": "s-in-summary-we-make-the-following-1-2",
       "original": "We propose a unique text-instruct parallel generation method that enables speech inference outputs aligned with textual capabilities, achieved with minimal data.",
       "zh": "我们提出了一种独特的文本指令并行生成方法，使语音推理输出与文本能力对齐，且仅需极少数据即可实现。"
      },
      {
       "id": "s-in-summary-we-make-the-following-1-3",
       "original": "We further enhance this with delayed parallelism, accelerating audio inference speed.",
       "zh": "我们进一步通过延迟并行化增强了这一方法，加速了音频推理速度。"
      }
     ]
    },
    {
     "id": "p-in-summary-we-make-the-following-2",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-in-summary-we-make-the-following-2-1",
       "original": "• We introduce \"Any Model Can Talk\", an innovative approach that enhances performance without altering the architecture of large models by focusing on training and inference.",
       "zh": "• 我们介绍了「Any Model Can Talk」，这是一种创新的方法，通过聚焦于训练和推理，在不改变大模型架构的前提下增强其性能。"
      },
      {
       "id": "s-in-summary-we-make-the-following-2-2",
       "original": "Our method employs a three-phase training process for speech-to-text and text-to-speech adapters, including annealing and SFT.",
       "zh": "我们的方法对语音转文本和文本转语音适配器采用三阶段训练流程，包括退火和监督微调。"
      },
      {
       "id": "s-in-summary-we-make-the-following-2-3",
       "original": "Our method involves minimal training and modification of the original model, aiming to provide a reference for incorporating interaction capabilities into other models.",
       "zh": "我们的方法对原始模型的训练和修改极少，旨在为将交互能力引入其他模型提供参考。"
      }
     ]
    },
    {
     "id": "p-in-summary-we-make-the-following-3",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-in-summary-we-make-the-following-3-1",
       "original": "• We identified shortcomings in existing open-source QA datasets when training audio assistants and proposed a dedicated dataset for speech model outputs, called VoiceAssistant-400K.",
       "zh": "• 我们指出了现有开源 QA 数据集在训练语音助手时的不足，并提出了专门用于语音模型输出的数据集 VoiceAssistant-400K。"
      },
      {
       "id": "s-in-summary-we-make-the-following-3-2",
       "original": "This dataset, synthesized using GPT-4o, can be used to fine-tune models to develop the tone of a voice assistant.",
       "zh": "该数据集使用 GPT-4o 合成，可用于微调模型以培养语音助手的语气风格。"
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
       "original": "Multimodal Understanding Recently, researchers have been increasingly focused on advancing unified models for cross-modal understanding.",
       "zh": "多模态理解：近期，研究者越来越关注推进跨模态理解的统一模型。"
      },
      {
       "id": "s-2-1-2",
       "original": "These approaches typically employ a well-pretrained neural network as the encoder for relevant modalities, using a lightweight adapter to align the encoder’s output with the text input of language model.",
       "zh": "这些方法通常使用预训练良好的神经网络作为相关模态的编码器，再用轻量级适配器将编码器输出与语言模型的文本输入对齐。"
      },
      {
       "id": "s-2-1-3",
       "original": "Classical works such as LLaVA [Liu et al., 2024], Flamingo [Alayrac et al., 2022] and BLIP [Li et al., 2022] are used for visual understanding, while in the audio domain, models like Whisper [Radford et al., 2023] and Beats [Chen et al., 2022] are commonly utilized as encoders for semantic and acoustic features.",
       "zh": "经典工作如用于视觉理解的 LLaVA [Liu et al., 2024]、Flamingo [Alayrac et al., 2022] 和 BLIP [Li et al., 2022]；在音频领域，Whisper [Radford et al., 2023] 和 Beats [Chen et al., 2022] 常被用作语义和声学特征的编码器。"
      },
      {
       "id": "s-2-1-4",
       "original": "In Llama 3.1, Whisper is employed, while SpeechVerse [Das et al., 2024] leverages WavLM [Hu et al., 2024]; SALMONN [Tang et al., 2023], combine Whisper and Beats to extract features.",
       "zh": "在 Llama 3.1 中使用了 Whisper，而 SpeechVerse [Das et al., 2024] 采用 WavLM [Hu et al., 2024]；SALMONN [Tang et al., 2023] 则结合 Whisper 和 Beats 来提取特征。"
      },
      {
       "id": "s-2-1-5",
       "original": "Such works are often constrained to producing output in the text modality.",
       "zh": "这类工作往往受限于仅能输出文本模态。"
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
       "original": "Audio Language Modeling Recently, an increasing number of studies have employed audio tokenization to bridge the gap between audio and text.",
       "zh": "音频语言建模：近期，越来越多研究采用音频 token 化来弥合音频与文本之间的鸿沟。"
      },
      {
       "id": "s-2-2-2",
       "original": "Audio tokenization converts continuous audio signals into discrete audio tokens, enabling large language models to perform inference and even cross-modal interactions.",
       "zh": "音频 token 化将连续音频信号转换为离散音频 token，使大语言模型能够进行推理乃至跨模态交互。"
      },
      {
       "id": "s-2-2-3",
       "original": "As a result, a variety of speech-text tasks, such as ASR, TTS, music understanding and generation, and sound editing, can be accomplished.",
       "zh": "因此，多种语音-文本任务得以完成，如 ASR、TTS、音乐理解与生成、声音编辑等。"
      },
      {
       "id": "s-2-2-4",
       "original": "MegaTTS [Jiang et al., 2023] utilized audio codecs for speech synthesis, while efforts like InstructTTS [Yang et al., 2024b], SpearTTS [Kharitonov et al., 2023], and Voicebox [Le et al., 2024] have further explored optimizations in decoding methods and conditioning techniques, employing Diffusion as the converter from tokens to audio.",
       "zh": "MegaTTS [Jiang et al., 2023] 利用音频 codec 进行语音合成；而 InstructTTS [Yang et al., 2024b]、SpearTTS [Kharitonov et al., 2023] 和 Voicebox [Le et al., 2024] 等工作则进一步探索了解码方法和条件化技术的优化，采用扩散模型作为 token 到音频的转换器。"
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
       "original": "Real-Time Human-Machine Interaction Models Since the introduction of GPT-4o [openai, 2024], real-time conversational models have achieved unprecedented results, providing near-instantaneous voice feedback to user inputs, marking a significant milestone for the next generation of multi-modal large models.",
       "zh": "实时人机交互模型：自 GPT-4o [openai, 2024] 推出以来，实时对话模型取得了前所未有的成果，能为用户输入提供近乎瞬时的语音反馈，标志着下一代多模态大模型的重要里程碑。"
      },
      {
       "id": "s-2-3-2",
       "original": "However, the technical implementations remain proprietary.",
       "zh": "然而，其技术实现仍然是专有的。"
      },
      {
       "id": "s-2-3-3",
       "original": "Models with real-time interaction capabilities are currently scarce.",
       "zh": "目前具备实时交互能力的模型仍属稀缺。"
      },
      {
       "id": "s-2-3-4",
       "original": "SpeechGPT [Zhang et al., 2023a] is an early end-to-end speech interaction model; however, it still suffers from latency due to the Audio-Text-Text-Audio(A- T-T-A) process, similar to Spectron [Nachmani et al., 2023].",
       "zh": "SpeechGPT [Zhang et al., 2023a] 是早期的端到端语音交互模型；然而，由于音频-文本-文本-音频（A-T-T-A）流程，它仍然存在延迟，与 Spectron [Nachmani et al., 2023] 类似。"
      },
      {
       "id": "s-2-3-5",
       "original": "LauraGPT [Chen et al., 2023] also employs a similar approach but not for voice conversation scenario.",
       "zh": "LauraGPT [Chen et al., 2023] 也采用了类似方法，但并非用于语音对话场景。"
      },
      {
       "id": "s-2-3-6",
       "original": "VITA [Fu et al., 2024] and Qwen-audio2 [Chu et al., 2024] are two models that support voice input, but they output text and rely on external TTS systems for speech synthesis.",
       "zh": "VITA [Fu et al., 2024] 和 Qwen-audio2 [Chu et al., 2024] 是支持语音输入的两个模型，但它们输出文本并依赖外部 TTS 系统进行语音合成。"
      },
      {
       "id": "s-2-3-7",
       "original": "Mini-Omni is a fully end-to-end speech-to-speech conversational model.",
       "zh": "Mini-Omni 是一个完全端到端的语音到语音对话模型。"
      },
      {
       "id": "s-2-3-8",
       "original": "Through our exploration, we have identified the biggest challenge in advancing this field: the logical inconsistency in reasoning when only the audio modality is present, which we will address in the following chapter.",
       "zh": "通过我们的探索，发现了推进该领域的最大挑战：仅存在音频模态时推理的逻辑不一致性，我们将在下一章解决这一问题。"
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
    "original": "Mini-Omni",
    "zh": "Mini-Omni"
   },
   "blocks": [
    {
     "id": "p-3-1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-1-1",
       "original": "Our innovation stems from existing methods such as SpeechGPT [Zhang et al., 2023a] and Spectron [Nachmani et al., 2023] utilize the A-T-T-A approach, which mitigates the challenges of direct audio learning by guiding the speech generation process through text.",
       "zh": "我们的创新源于现有方法，如 SpeechGPT [Zhang et al., 2023a] 和 Spectron [Nachmani et al., 2023]，它们利用 A-T-T-A 方法，通过文本引导语音生成过程来缓解直接音频学习的挑战。"
      },
      {
       "id": "s-3-1-2",
       "original": "However, generating text first and then audio is suboptimal for real-time dialogue scenarios.",
       "zh": "然而，先生成文本再生成音频对实时对话场景来说是次优的。"
      },
      {
       "id": "s-3-1-3",
       "original": "To address this, we propose a novel method for simultaneous text and audio generation.",
       "zh": "为解决这一问题，我们提出了一种新颖的同时生成文本和音频的方法。"
      },
      {
       "id": "s-3-1-4",
       "original": "This approach hypothesizes that text outputs have higher information density, allowing for the same response with fewer tokens.",
       "zh": "该方法假设文本输出具有更高的信息密度，可以用更少的 token 传达相同内容。"
      },
      {
       "id": "s-3-1-5",
       "original": "During the generation of audio tokens, the model effectively conditions on corresponding text tokens, akin to an online TTS system.",
       "zh": "在生成音频 token 时，模型有效地以对应文本 token 为条件，类似于在线 TTS 系统。"
      },
      {
       "id": "s-3-1-6",
       "original": "Prior to generating audio tokens, padding with N tokens ensures that the corresponding text tokens are produced first, allowing this to serve as a hyperparameter adjustment.",
       "zh": "在生成音频 token 之前，用 N 个 token 填充以确保对应文本 token 先生成，这可作为超参数调节。"
      },
      {
       "id": "s-3-1-7",
       "original": "Additionally, the model can also condition on speaker and style embeddings, facilitating control over speaker characteristics and stylistic elements.",
       "zh": "此外，模型还可以以说话人和风格嵌入为条件，便于控制说话人特征和风格元素。"
      },
      {
       "id": "s-3-1-8",
       "original": "In this section, we will detail how we implement our idea step by step.",
       "zh": "本节将详细介绍我们如何逐步实现这一想法。"
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
    "original": "Audio Language Modeling",
    "zh": "音频语言建模"
   },
   "blocks": [
    {
     "id": "p-3-1-1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-1-1-1",
       "original": "Consider Y = (yi ∈Vtxt | i = 1, . . . , ttxt) as a text utterance from a vocabulary Vtxt with length ttxt.",
       "zh": "设 Y = (yi ∈ Vtxt | i = 1, . . . , ttxt) 为来自词汇表 Vtxt、长度为 ttxt 的文本话语。"
      },
      {
       "id": "s-3-1-1-2",
       "original": "The probability of Y can be expressed as p(Y ) = Qttxt i=1 p(yi | y1, . . . , yi−1).",
       "zh": "Y 的概率可表示为 p(Y) = Π i=1 ttxt p(yi | y1, . . . , yi−1)。"
      },
      {
       "id": "s-3-1-1-3",
       "original": "Now, when dealing with a continuous speech signal, we can convert it into discrete speech tokens (dst), represented as D = (di ∈Vdst|i = 1, · · · , tdst) using a tokenizer.",
       "zh": "现在处理连续语音信号时，可用分词器将其转换为离散语音 token（dst），表示为 D = (di ∈ Vdst | i = 1, · · · , tdst)。"
      },
      {
       "id": "s-3-1-1-4",
       "original": "In this context Vdst is the vocabulary of discrete speech tokens.",
       "zh": "其中 Vdst 是离散语音 token 的词汇表。"
      },
      {
       "id": "s-3-1-1-5",
       "original": "These discrete speech tokens can be treated as spoken language within Vdst and modeled in a manner similar to text.",
       "zh": "这些离散语音 token 可被视为 Vdst 内的口语，与文本类似地进行建模。"
      },
      {
       "id": "s-3-1-1-6",
       "original": "We combine text and speech in a new vocabulary Vvoxt by Vvoxt = Vtxt∪Vdst.",
       "zh": "我们将文本和语音合并到新词汇表 Vvoxt 中，即 Vvoxt = Vtxt ∪ Vdst。"
      },
      {
       "id": "s-3-1-1-7",
       "original": "Therefore, we can model the probability of both speech and text tokens as Z, where Z = (zi ∈V|i = 1, · · · , t).",
       "zh": "因此，我们可将语音和文本 token 的概率统一建模为 Z，其中 Z = (zi ∈ V | i = 1, · · · , t)。"
      },
      {
       "id": "s-3-1-1-8",
       "original": "This probability is expressed as p(Z) = Qt i=1 p(zi | z1, · · · , zi−1), Z represent discrete speech tokens D(V = Vdst) or text tokens Y (V = Vtxt) or various combinations of Y and D.",
       "zh": "该概率表示为 p(Z) = Π i=1 t p(zi | z1, · · · , zi−1)，Z 代表离散语音 token D（V = Vdst）、文本 token Y（V = Vtxt）或 Y 和 D 的各种组合。"
      },
      {
       "id": "s-3-1-1-9",
       "original": "For the audio and text tokens generated simultaneously, the negative log-likelihood loss can be formulated as in Equation (1).",
       "zh": "对于同时生成的音频和文本 token，其负对数似然损失可如公式（1）所示。"
      }
     ]
    },
    {
     "id": "eq-3-1-1",
     "type": "equation",
     "page": 4,
     "original": "L(T, A|C) ="
    },
    {
     "id": "eq-3-1-2",
     "type": "equation",
     "page": 4,
     "original": "m X"
    },
    {
     "id": "eq-3-1-3",
     "type": "equation",
     "page": 4,
     "original": "j=1"
    },
    {
     "id": "eq-3-1-4",
     "type": "equation",
     "page": 4,
     "original": "nj X"
    },
    {
     "id": "eq-3-1-5",
     "type": "equation",
     "page": 4,
     "original": "i=1 log P(Ti,j, Ai,j|T<i,j, A<i,j; Xj) (1)"
    },
    {
     "id": "p-3-1-2",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-1-2-1",
       "original": "where T, A is the text-audio output pairs in the training corpus C, and m is the number of training examples.",
       "zh": "其中 T、A 为训练语料 C 中的文本-音频输出对，m 为训练样本数。"
      },
      {
       "id": "s-3-1-2-2",
       "original": "Xj is the input condition of j-th example, nj is max number of tokens of sample Tj and Aj, Ti,j and Ai,j represent the i-th text token and audio token of j-th sample.",
       "zh": "Xj 为第 j 个样本的输入条件，nj 为样本 Tj 和 Aj 的最大 token 数，Ti,j 和 Ai,j 分别代表第 j 个样本的第 i 个文本 token 和第 i 个音频 token。"
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
    "original": "Decoding Strategies",
    "zh": "解码策略"
   },
   "blocks": [
    {
     "id": "p-3-2-1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-2-1-1",
       "original": "Audio Generation with text instruction.",
       "zh": "基于文本指令的音频生成。"
      },
      {
       "id": "s-3-2-1-2",
       "original": "Language models have undergone substantial advancements, demonstrating exceptional reasoning capabilities within the text modality.",
       "zh": "语言模型已取得重大进展，在文本模态内展现出卓越的推理能力。"
      },
      {
       "id": "s-3-2-1-3",
       "original": "In response, Mini-Omni has been restructured to transfer these reasoning abilities to streaming audio output through a text-audio parallel decoding approach.",
       "zh": "对此，Mini-Omni 经过重构，通过文本-音频并行解码方法将这些推理能力迁移至流式音频输出。"
      },
      {
       "id": "s-3-2-1-4",
       "original": "This method simultaneously outputs both audio and text tokens, with the audio generated via text-to-speech synthesis, ensuring real-time delivery while leveraging the text-based reasoning strengths.",
       "zh": "该方法同时输出音频和文本 token，音频通过文本转语音合成方式生成，在利用文本推理优势的同时确保实时交付。"
      },
      {
       "id": "s-3-2-1-5",
       "original": "To align with the inputs of large models, all sequences generated in parallel are summed before producing the next token, as illustrated in Figure 1.",
       "zh": "为了对齐大模型的输入，所有并行生成的序列在产生下一个 token 前都会进行求和，如图 1 所示。"
      },
      {
       "id": "s-3-2-1-6",
       "original": "This approach enables the model to achieve real-time voice output in chat scenarios with minimal first token delay.",
       "zh": "这种方法使模型能够在聊天场景中以极小首 token 延迟实现实时语音输出。"
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
       "original": "Text-delay Parallel Decoding.",
       "zh": "文本延迟并行解码。"
      },
      {
       "id": "s-3-2-2-2",
       "original": "Parallel generation was first introduced by MusicGen [Copet et al., 2024] to accelerate the music generation process, and we have integrated this approach into the text modality to enhance reasoning capabilities.",
       "zh": "并行生成最初由 MusicGen [Copet et al., 2024] 提出以加速音乐生成过程，我们将这一方法引入文本模态以增强推理能力。"
      },
      {
       "id": "s-3-2-2-3",
       "original": "Parallel decoding is feasible because audio token codebooks used in language model training typically consist of multiple layers; generating all layers simultaneously can significantly increase model speed.",
       "zh": "并行解码之所以可行，是因为语言模型训练中使用的音频 token 码本通常由多层组成；同时生成所有层可显著提高模型速度。"
      },
      {
       "id": "s-3-2-2-4",
       "original": "For real-time speech output models, parallel decoding is even more critical, allowing for the generation of hundreds of audio tokens per second on standard devices.",
       "zh": "对实时语音输出模型而言，并行解码更为关键，能在标准设备上实现每秒生成数百个音频 token。"
      },
      {
       "id": "s-3-2-2-5",
       "original": "In this paper, we employ SNAC as the audio encoder, which comprises seven token layers with complementary relationships.",
       "zh": "本文采用 SNAC 作为音频编码器，其包含七层互补关系的 token 层。"
      },
      {
       "id": "s-3-2-2-6",
       "original": "Therefore, we employ eight sub-Language Model heads to generate eight tokens, including text, in a single step, while maintaining a one-step delay between adjacent layers.",
       "zh": "因此，我们采用八个子语言模型头在单步内生成八个 token（含文本），同时在相邻层之间保持一步延迟。"
      },
      {
       "id": "s-3-2-2-7",
       "original": "Since audio tokens are derived from text synthesis, the text token is output first, followed by SNAC tokens from the first to the seventh layer.",
       "zh": "由于音频 token 源自文本合成，文本 token 先输出，随后是 SNAC 从第一层到第七层的 token。"
      },
      {
       "id": "s-3-2-2-8",
       "original": "The process of text-first delay parallel decoding we propose is illustrated in Figure 2(b).",
       "zh": "我们提出的文本优先延迟并行解码过程如图 2(b) 所示。"
      }
     ]
    },
    {
     "id": "fig-3-2-1",
     "type": "figure_caption",
     "page": 5,
     "original": "Figure 2: Mini-Omni incorporates text-instruct mechanisms alongside Batch parallel generation techniques.",
     "zh": "图 2：Mini-Omni 结合文本指令机制与批量并行生成技术。"
    },
    {
     "id": "p-3-2-3",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-3-2-3-1",
       "original": "Batch Parallel Decoding.",
       "zh": "批量并行解码。"
      },
      {
       "id": "s-3-2-3-2",
       "original": "Although the previously introduced parallel generation method effectively transfers reasoning capabilities from the text modality to the audio modality, our experiments reveal that the model’s reasoning performance still varies between text and audio tasks, with audio responses tending to be simpler.",
       "zh": "尽管前面介绍的并行生成方法能有效将文本模态的推理能力迁移至音频模态，但我们的实验发现模型在文本和音频任务上的推理性能仍有差异，音频回答往往更简单。"
      },
      {
       "id": "s-3-2-3-3",
       "original": "We hypothesize that this is due to limitations in model capacity or insufficient audio data.",
       "zh": "我们假设这是由于模型容量有限或音频数据不足所致。"
      },
      {
       "id": "s-3-2-3-4",
       "original": "To address this issue and further enhance the model’s reasoning capabilities during dialogue, maximizing the transfer of its text-based abilities, we experimentally employ a Batch approach.",
       "zh": "为解决这一问题并进一步增强模型在对话中的推理能力，最大限度迁移其文本能力，我们实验性地采用了批量方法。"
      },
      {
       "id": "s-3-2-3-5",
       "original": "Given the model’s stronger performance in the text modality, we expand the inference task for a single input to a batch size of 2: one sample requires both text and audio responses, as described earlier, while the other sample only requires a text response, focusing on text-based audio synthesis.",
       "zh": "鉴于模型在文本模态表现更强，我们将单个输入的推理任务扩展为批量大小 2：一个样本需要同时输出文本和音频（如前所述），另一个样本仅需输出文本，专注于基于文本的音频合成。"
      },
      {
       "id": "s-3-2-3-6",
       "original": "However, the text token output from the first sample is discarded, and the text output from the second sample is embedded into the corresponding text token positions of the first sample.",
       "zh": "然而，第一个样本的文本 token 输出被丢弃，第二个样本的文本输出被嵌入第一个样本的对应文本 token 位置。"
      },
      {
       "id": "s-3-2-3-7",
       "original": "Simultaneously, the audio from the first sample is streamed using the content from the text-only response of the second sample; we term this process batch parallel decoding.",
       "zh": "同时，第一个样本的音频以第二个样本的纯文本回复内容进行流式传输；我们将这一过程称为批量并行解码。"
      },
      {
       "id": "s-3-2-3-8",
       "original": "Through this method, we effectively and almost entirely transfer the model’s text-based capabilities to the audio modality with minimal resource overhead, significantly enhancing its reasoning abilities in the new modality.",
       "zh": "通过这种方法，我们以极小资源开销将模型的文本能力有效且几乎完整地迁移到音频模态，显著增强了其在新模态中的推理能力。"
      },
      {
       "id": "s-3-2-3-9",
       "original": "The inference process of batch parallel decoding is illustrated in Figure 2(c).",
       "zh": "批量并行解码的推理过程如图 2(c) 所示。"
      },
      {
       "id": "s-3-2-3-10",
       "original": "We believe batch parallel decoding represents a key algorithmic innovation that enables such a small model to exhibit strong conversational abilities.",
       "zh": "我们相信批量并行解码是使如此小的模型能够展现强对话能力的关键算法创新。"
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
    "original": "Any Model Can Talk",
    "zh": "Any Model Can Talk"
   },
   "blocks": [
    {
     "id": "p-3-3-1",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-3-3-1-1",
       "original": "In this section, we present our training methodology.",
       "zh": "本节介绍我们的训练方法。"
      },
      {
       "id": "s-3-3-1-2",
       "original": "Our approach is designed to preserve the capabilities of the original model as much as possible.",
       "zh": "我们的方法旨在尽可能保留原始模型的能力。"
      },
      {
       "id": "s-3-3-1-3",
       "original": "This is achieved firstly due to the strong performance of our base model, and secondly because our method can be applied to other works that excel in text output but lack robust speech interaction capabilities.",
       "zh": "之所以能做到这一点，首先是因为我们的基础模型具有强大的性能，其次是因为我们的方法可以应用于其他在文本输出方面优秀、但缺乏强大语音交互能力的工作。"
      }
     ]
    },
    {
     "id": "p-3-3-2",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-3-3-2-1",
       "original": "Audio Encoding: The audio input primarily focuses on feature extraction from the input audio, with options including Hubert or a separately pretrained audio encoder.",
       "zh": "音频编码：音频输入主要聚焦于从输入音频中提取特征，可选 Hubert 或单独预训练的音频编码器。"
      },
      {
       "id": "s-3-3-2-2",
       "original": "Given our focus on speech input, Whisper [Radford et al., 2023] and Qwen2-audio [Chu et al., 2024] also demonstrate effective performance for general audio tasks.",
       "zh": "鉴于我们聚焦语音输入，Whisper [Radford et al., 2023] 和 Qwen2-audio [Chu et al., 2024] 在通用音频任务上也展现出有效性能。"
      },
      {
       "id": "s-3-3-2-3",
       "original": "For audio output, selecting audio tokens with a multi-codebook approach better captures audio details.",
       "zh": "对于音频输出，选择多码本方法的音频 token 能更好地捕获音频细节。"
      },
      {
       "id": "s-3-3-2-4",
       "original": "We experimented with flattening for audio token modeling, but it resulted in excessively long tokens, which are detrimental to streaming and lead to unstable learning.",
       "zh": "我们曾尝试用扁平化方式建模音频 token，但导致 token 过长，不利于流式传输且学习不稳定。"
      },
      {
       "id": "s-3-3-2-5",
       "original": "Instead, parallel decoding, inspired by MusicGen [Copet et al., 2024], employs a delay pattern combined with text conditions, as illustrated in Figure 2.",
       "zh": "相反，受 MusicGen [Copet et al., 2024] 启发的并行解码采用延迟模式并结合文本条件，如图 2 所示。"
      }
     ]
    },
    {
     "id": "p-3-3-3",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-3-3-3-1",
       "original": "Three-Stage Training.",
       "zh": "三阶段训练。"
      },
      {
       "id": "s-3-3-3-2",
       "original": "Our training methodology is divided into three distinct stages: (1) Modality Alignment.",
       "zh": "我们的训练方法分为三个不同阶段：(1) 模态对齐。"
      },
      {
       "id": "s-3-3-3-3",
       "original": "The goal of this stage is to enhance the text model’s ability to understand and generate speech.",
       "zh": "该阶段目标是增强文本模型理解和生成语音的能力。"
      },
      {
       "id": "s-3-3-3-4",
       "original": "The core model of Mini-Omni is entirely frozen, with gradients allowed only in two adapters.",
       "zh": "Mini-Omni 的核心模型完全冻结，仅允许梯度通过两个适配器。"
      },
      {
       "id": "s-3-3-3-5",
       "original": "During this stage, we use data from speech recognition and speech synthesis to train the model’s",
       "zh": "在该阶段，我们使用语音识别和语音合成的数据来训练模型的"
      }
     ]
    },
    {
     "id": "fig-3-3-1",
     "type": "figure_caption",
     "page": 6,
     "original": "Figure 3: Mini-Omni’s three-stage training phases: modality expansion, modality adaptation training, and holistic fine-tuning.",
     "zh": "图 3：Mini-Omni 的三阶段训练阶段：模态扩展、模态适配训练和整体微调。"
    },
    {
     "id": "p-3-3-4",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-3-3-4-1",
       "original": "speech recognition and synthesis capabilities.",
       "zh": "语音识别与合成能力。"
      },
      {
       "id": "s-3-3-4-2",
       "original": "(2) Adaption Training.",
       "zh": "(2) 适配训练。"
      },
      {
       "id": "s-3-3-4-3",
       "original": "Once the new modality is aligned with the text model’s input, the adapters are frozen.",
       "zh": "一旦新模态与文本模型输入对齐，适配器即被冻结。"
      },
      {
       "id": "s-3-3-4-4",
       "original": "In this stage, we focus solely on training the model’s text capabilities when given audio inputs, as audio output is simply synthesized from text.",
       "zh": "在该阶段，我们仅专注于训练模型在给定音频输入时的文本能力，因为音频输出仅是从文本合成的。"
      },
      {
       "id": "s-3-3-4-5",
       "original": "The model is trained using data from speech recognition, spoken question answering, and text response tasks.",
       "zh": "模型使用语音识别、口语问答和文本回复任务的数据进行训练。"
      },
      {
       "id": "s-3-3-4-6",
       "original": "(3) Multi-modal Finetuning.",
       "zh": "(3) 多模态微调。"
      },
      {
       "id": "s-3-3-4-7",
       "original": "In the final stage, the entire model is fine-tuned using comprehensive data.",
       "zh": "在最后阶段，使用综合数据对整个模型进行微调。"
      },
      {
       "id": "s-3-3-4-8",
       "original": "At this point, all model weights are unfrozen and trained.",
       "zh": "此时，所有模型权重解冻并参与训练。"
      },
      {
       "id": "s-3-3-4-9",
       "original": "Since the primary modality alignment tasks are handled during adapter training, the original model’s capabilities are maximally preserved.",
       "zh": "由于主要的模态对齐任务已在适配器训练阶段完成，原始模型的能力得到最大化保留。"
      }
     ]
    },
    {
     "id": "p-3-3-5",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-3-3-5-1",
       "original": "Model Input Ids.",
       "zh": "模型输入 ID。"
      },
      {
       "id": "s-3-3-5-2",
       "original": "Given the eight parallel output sequences, the input also requires eight sequences, leading to significant complexity.",
       "zh": "给定八个并行输出序列，输入同样需要八个序列，这带来了显著的复杂性。"
      },
      {
       "id": "s-3-3-5-3",
       "original": "Therefore, we briefly outline the organization of model inputs here.",
       "zh": "因此，我们在此简要概述模型输入的组织方式。"
      },
      {
       "id": "s-3-3-5-4",
       "original": "The model can accept either text or audio inputs, which are placed in the corresponding modality sequences.",
       "zh": "模型可接受文本或音频输入，并被放置在对应的模态序列中。"
      },
      {
       "id": "s-3-3-5-5",
       "original": "For audio inputs, the input tokens and Whisper features are transformed into tensors of the same dimension via adapters and then concatenated.",
       "zh": "对于音频输入，输入 token 和 Whisper 特征经适配器转换为相同维度的张量后进行拼接。"
      },
      {
       "id": "s-3-3-5-6",
       "original": "Depending on the task, we place the <answer> special token in different positions to guide the model’s output, achieving multi-modal output.",
       "zh": "根据任务不同，我们将 <answer> 特殊 token 放置在不同位置以引导模型输出，实现多模态输出。"
      },
      {
       "id": "s-3-3-5-7",
       "original": "The organization of some tasks is illustrated in Figure 4.",
       "zh": "部分任务的组织方式如图 4 所示。"
      },
      {
       "id": "s-3-3-5-8",
       "original": "Before being fed into the model, all sequences are summed and averaged to integrate features.",
       "zh": "在输入模型之前，所有序列会经过求和与平均以整合特征。"
      }
     ]
    },
    {
     "id": "fig-3-3-2",
     "type": "figure_caption",
     "page": 6,
     "original": "Figure 4: Diagram of the input section of Mini-Omni parallel generation. The <answer> special token is placed at the end of the sequence to be generated, as determined by the task.",
     "zh": "图 4：Mini-Omni 并行生成输入部分示意图。<answer> 特殊 token 根据任务决定放置于待生成序列的末尾。"
    }
   ]
  },
  {
   "id": "sec-4",
   "num": "4",
   "level": 1,
   "page": 6,
   "title": {
    "original": "Experiments",
    "zh": "实验"
   },
   "blocks": [
    {
     "id": "p-4-1",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-4-1-1",
       "original": "his section presents the foundational capability test results for Mini-Omni.",
       "zh": "本节展示 Mini-Omni 的基础能力测试结果。"
      },
      {
       "id": "s-4-1-2",
       "original": "We first describe the training datasets, data processing methods, and hyperparameters.",
       "zh": "我们首先描述训练数据集、数据处理方法和超参数。"
      },
      {
       "id": "s-4-1-3",
       "original": "We then evaluate the model’s performance on core tasks like speech recognition and provide several use case examples.",
       "zh": "然后评估模型在语音识别等核心任务上的性能，并提供若干使用案例。"
      },
      {
       "id": "s-4-1-4",
       "original": "We will include all relevant experiments in the next version as soon as possible.",
       "zh": "我们将在下一版本中尽快补充所有相关实验。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-4-1",
   "num": "4.1",
   "level": 2,
   "page": 7,
   "title": {
    "original": "Datasets",
    "zh": "数据集"
   },
   "blocks": [
    {
     "id": "p-4-1-1",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-4-1-1-1",
       "original": "To establish foundational speech capabilities, we trained the model using three speech recognition datasets totaling approximately 8,000 hours, focusing on speech understanding and synthesis.",
       "zh": "为建立基础语音能力，我们使用三个语音识别数据集（总计约 8,000 小时）训练模型，聚焦于语音理解和合成。"
      },
      {
       "id": "s-4-1-1-2",
       "original": "For text modality, we incorporated 2 million data points from the Open-Orca [OpenOrca] dataset and integrated them with other modalities to preserve textual accuracy.",
       "zh": "对于文本模态，我们纳入了来自 Open-Orca [OpenOrca] 数据集的 2 million 条数据，并将其与其他模态整合以保持文本准确性。"
      },
      {
       "id": "s-4-1-1-3",
       "original": "Moss’s SFT dataset [Sun et al., 2024] was utilized with zero-shot TTS to synthesize 1.5 million speech QA pairs.",
       "zh": "Moss 的 SFT 数据集 [Sun et al., 2024] 通过零样本 TTS 合成了 1.5 million 条语音问答对。"
      },
      {
       "id": "s-4-1-1-4",
       "original": "To avoid unsuitable code and symbolic outputs, we created the VoiceAssistant-400K dataset with GPT-4o.",
       "zh": "为避免不适合语音输出的代码和符号，我们使用 GPT-4o 构建了 VoiceAssistant-400K 数据集。"
      },
      {
       "id": "s-4-1-1-5",
       "original": "Datasets are detailed in Table 1.",
       "zh": "数据集详情见表 1。"
      },
      {
       "id": "s-4-1-1-6",
       "original": "Stage 1 involves ASR data for training speech adapters.",
       "zh": "阶段 1 使用 ASR 数据训练语音适配器。"
      },
      {
       "id": "s-4-1-1-7",
       "original": "Stage 2 uses TextQA and AudioQA for audio/text input and text response training.",
       "zh": "阶段 2 使用 TextQA 和 AudioQA 进行音频/文本输入与文本回复训练。"
      },
      {
       "id": "s-4-1-1-8",
       "original": "Stage 3 focuses on multimodal interaction using the audio modality of AudioQA.",
       "zh": "阶段 3 聚焦使用 AudioQA 的音频模态进行多模态交互。"
      },
      {
       "id": "s-4-1-1-9",
       "original": "Final stage training includes annealing and fine-tuning with Voice QA.",
       "zh": "最终阶段训练包括使用 Voice QA 数据进行退火和微调。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-task",
   "num": null,
   "level": 2,
   "page": 7,
   "title": {
    "original": "Task",
    "zh": "任务"
   },
   "blocks": [
    {
     "id": "p-task-1",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-task-1-1",
       "original": "Stages Dataset Modality items Libritts [Zen et al., 2019] A1|T1 586 h ASR",
       "zh": "（表 1：训练数据集与用途——Stages × Dataset × Modality × items：Libritts [Zen et al., 2019]（A1|T1，586h，ASR，阶段 1,2,3）、VCTK [datashare, 2024]（44h）、Multilingual LibriSpeech [Pratap et al., 2020]（8000h）、Text QA（Open-Orca [OpenOrca]，T1|T2，2000K，阶段 2,3）、Audio QA（Moss-002-sft-data [Sun et al., 2024]，A1|T1|A2|T2，1500K，阶段 3）、Alpaca-GPT4 [vicgalle, 2024]（55k）、Identity finetune [sayan1101, 2024]（2k）、QAassistant [Mihaiii, 2024a]（27k）、voice QA final Rlhf [Anthropic, 2024]（367k）、Trivia-singlechoice [Mihaiii, 2024c]（17k）、Trivia-Multichoice [Mihaiii, 2024b]（20k）、OpenAssistant [OpenAssistan, 2024]（2k）。模态记号中 T 与 A 分别代表文本与音频模态，下标 1/2 表示输入或输出。）"
      }
     ]
    },
    {
     "id": "eq-task-1",
     "type": "equation",
     "page": 7,
     "original": "1,2,3"
    },
    {
     "id": "p-task-2",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-task-2-1",
       "original": "VCTK [datashare, 2024] A1|T1 44 h Multilingual LibriSpeech [Pratap et al., 2020] A1|T1 8000h Text QA",
       "zh": "（表 1：训练数据集与用途——Stages × Dataset × Modality × items：Libritts [Zen et al., 2019]（A1|T1，586h，ASR，阶段 1,2,3）、VCTK [datashare, 2024]（44h）、Multilingual LibriSpeech [Pratap et al., 2020]（8000h）、Text QA（Open-Orca [OpenOrca]，T1|T2，2000K，阶段 2,3）、Audio QA（Moss-002-sft-data [Sun et al., 2024]，A1|T1|A2|T2，1500K，阶段 3）、Alpaca-GPT4 [vicgalle, 2024]（55k）、Identity finetune [sayan1101, 2024]（2k）、QAassistant [Mihaiii, 2024a]（27k）、voice QA final Rlhf [Anthropic, 2024]（367k）、Trivia-singlechoice [Mihaiii, 2024c]（17k）、Trivia-Multichoice [Mihaiii, 2024b]（20k）、OpenAssistant [OpenAssistan, 2024]（2k）。模态记号中 T 与 A 分别代表文本与音频模态，下标 1/2 表示输入或输出。）"
      }
     ]
    },
    {
     "id": "eq-task-2",
     "type": "equation",
     "page": 7,
     "original": "2,3"
    },
    {
     "id": "eq-task-3",
     "type": "equation",
     "page": 7,
     "original": "Open-Orca [OpenOrca] T1|T2 2000K Audio QA"
    },
    {
     "id": "eq-task-4",
     "type": "equation",
     "page": 7,
     "original": "3"
    },
    {
     "id": "p-task-3",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-task-3-1",
       "original": "Moss-002-sft-data [Sun et al., 2024] A1|T1|A2|T2 1500K Alpaca-GPT4 [vicgalle, 2024] A1|T1|A2|T2 55k Identity finetune [sayan1101, 2024] A1|T1|A2|T2 2k QAassistant [Mihaiii, 2024a] A1|T1|A2|T2 27k voice QA final Rlhf [Anthropic, 2024] A1|T1|A2|T2 367k Trivia-singlechoice [Mihaiii, 2024c] A1|T1|A2|T2 17k Trivia-Multichoice [Mihaiii, 2024b] A1|T1|A2|T2 20k OpenAssistant [OpenAssistan, 2024] A1|T1|A2|T2 2k Table 1: The datasets and their usage for training Mini-Omni are as follows: In the modality notation, T and A represent the text and audio modalities, with subscripts 1 and 2 indicating input or output.",
       "zh": "（表 1：训练数据集与用途——Stages × Dataset × Modality × items：Libritts [Zen et al., 2019]（A1|T1，586h，ASR，阶段 1,2,3）、VCTK [datashare, 2024]（44h）、Multilingual LibriSpeech [Pratap et al., 2020]（8000h）、Text QA（Open-Orca [OpenOrca]，T1|T2，2000K，阶段 2,3）、Audio QA（Moss-002-sft-data [Sun et al., 2024]，A1|T1|A2|T2，1500K，阶段 3）、Alpaca-GPT4 [vicgalle, 2024]（55k）、Identity finetune [sayan1101, 2024]（2k）、QAassistant [Mihaiii, 2024a]（27k）、voice QA final Rlhf [Anthropic, 2024]（367k）、Trivia-singlechoice [Mihaiii, 2024c]（17k）、Trivia-Multichoice [Mihaiii, 2024b]（20k）、OpenAssistant [OpenAssistan, 2024]（2k）。模态记号中 T 与 A 分别代表文本与音频模态，下标 1/2 表示输入或输出。）"
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
    "original": "Training Parameters",
    "zh": "训练参数"
   },
   "blocks": [
    {
     "id": "p-4-2-1",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-4-2-1-1",
       "original": "Our model is trained on 8 A100 GPUs, utilizing a cosine annealing learning rate scheduler with a minimum learning rate of 4e-6 and a maximum learning rate of 4e-4.",
       "zh": "我们的模型在 8 块 A100 GPU 上训练，采用余弦退火学习率调度，最小学习率为 4e-6，最大学习率为 4e-4。"
      },
      {
       "id": "s-4-2-1-2",
       "original": "Each training epoch consists of 40,000 steps, with batch size 192 for each step.",
       "zh": "每个训练轮次包含 40,000 步，每步批量大小为 192。"
      },
      {
       "id": "s-4-2-1-3",
       "original": "The base language model employs Qwen2-0.5B [Yang et al., 2024a], a transformer architecture with 24 blocks and an internal dimension of 896.",
       "zh": "基础语言模型采用 Qwen2-0.5B [Yang et al., 2024a]，这是一个具有 24 个块、内部维度 896 的 Transformer 架构。"
      },
      {
       "id": "s-4-2-1-4",
       "original": "The speech encoder uses the Whisper-small encoder, with ASR adapter connected via two-layer MLP, and the TTS adapter extends the original model by adding 6 additional transformer blocks.",
       "zh": "语音编码器使用 Whisper-small 编码器，ASR 适配器通过两层 MLP 连接，TTS 适配器则在原模型基础上添加 6 个额外的 Transformer 块进行扩展。"
      },
      {
       "id": "s-4-2-1-5",
       "original": "During fine-tuning, we use learn rate from 4e-6 to 5e-5.",
       "zh": "微调阶段，学习率从 4e-6 到 5e-5。"
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
    "original": "Experimental Results",
    "zh": "实验结果"
   },
   "blocks": [
    {
     "id": "p-4-3-1",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-4-3-1-1",
       "original": "We first evaluated the model’s performance on ASR tasks to assess its speech understanding capabilities.",
       "zh": "我们首先评估了模型在 ASR 任务上的性能，以评估其语音理解能力。"
      },
      {
       "id": "s-4-3-1-2",
       "original": "Basic experiments on speech recognition capabilities were conducted using the four test sets from LibriSpeech [Panayotov et al., 2015]: test-clean, test-other, dev-clean, and dev-other.",
       "zh": "语音识别能力的基础实验使用 LibriSpeech [Panayotov et al., 2015] 的四个测试集：test-clean、test-other、dev-clean 和 dev-other。"
      },
      {
       "id": "s-4-3-1-3",
       "original": "Results are presented in Table 2, where we compare the accuracy of our adopted speech recognition systems, wav2vec2 [Baevski et al., 2020] and Whisper-small, as well as the VITA [Fu et al., 2024].",
       "zh": "结果见表 2，我们对比了所采用语音识别系统、wav2vec2 [Baevski et al., 2020] 和 Whisper-small，以及 VITA [Fu et al., 2024] 的准确率。"
      },
      {
       "id": "s-4-3-1-4",
       "original": "The findings indicate that while Mini-Omni’s speech recognition performance slightly lags behind Whisper-small’s [Radford et al., 2023] decoder, it still achieves an excellent level of audio comprehension.",
       "zh": "结果表明，尽管 Mini-Omni 的语音识别性能略逊于 Whisper-small [Radford et al., 2023] 的解码器，但它仍达到了优秀的音频理解水平。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-method",
   "num": null,
   "level": 2,
   "page": 7,
   "title": {
    "original": "Method",
    "zh": "方法"
   },
   "blocks": [
    {
     "id": "p-method-1",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-method-1-1",
       "original": "test-clean test-other dev-clean dev-other wav2vec2-base [Baevski et al., 2020]",
       "zh": "（表 2：ASR 对比——wav2vec2-base [Baevski et al., 2020] 6.0/13.4/-/-；VITA [Fu et al., 2024] 8.14/18.41/7.57/16.57；whisper-small [Radford et al., 2023] 3.4/7.6/-/-；Mini-Omni 4.5/9.7/4.6/9.2（test-clean/test-other/dev-clean/dev-other）。）表 2：模型 ASR 与所用基座模型的对比。"
      }
     ]
    },
    {
     "id": "eq-method-1",
     "type": "equation",
     "page": 7,
     "original": "6.0 13.4 - -"
    },
    {
     "id": "eq-method-2",
     "type": "equation",
     "page": 7,
     "original": "VITA [Fu et al., 2024]"
    },
    {
     "id": "eq-method-3",
     "type": "equation",
     "page": 7,
     "original": "8.14 18.41 7.57 16.57"
    },
    {
     "id": "eq-method-4",
     "type": "equation",
     "page": 7,
     "original": "whisper-small [Radford et al., 2023]"
    },
    {
     "id": "eq-method-5",
     "type": "equation",
     "page": 7,
     "original": "3.4 7.6 - -"
    },
    {
     "id": "eq-method-6",
     "type": "equation",
     "page": 7,
     "original": "Mini-Omni"
    },
    {
     "id": "eq-method-7",
     "type": "equation",
     "page": 7,
     "original": "4.5 9.7 4.6 9.2"
    },
    {
     "id": "p-method-2",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-method-2-1",
       "original": "Table 2: Comparison of the model’s ASR with the base model used.",
       "zh": "（表 2：ASR 对比——wav2vec2-base [Baevski et al., 2020] 6.0/13.4/-/-；VITA [Fu et al., 2024] 8.14/18.41/7.57/16.57；whisper-small [Radford et al., 2023] 3.4/7.6/-/-；Mini-Omni 4.5/9.7/4.6/9.2（test-clean/test-other/dev-clean/dev-other）。）表 2：模型 ASR 与所用基座模型的对比。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-4-4",
   "num": "4.4",
   "level": 2,
   "page": 8,
   "title": {
    "original": "Case Study",
    "zh": "案例研究"
   },
   "blocks": [
    {
     "id": "p-4-4-1",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-4-4-1-1",
       "original": "Here, we present several cases to demonstrate Mini-Omni’s capabilities in speech understanding and reasoning.",
       "zh": "此处，我们展示若干案例，以证明 Mini-Omni 在语音理解和推理方面的能力。"
      },
      {
       "id": "s-4-4-1-2",
       "original": "These examples reveal that speech-based reasoning is somewhat weaker compared to text-based reasoning, highlighting the necessity for batch generation.",
       "zh": "这些示例表明，基于语音的推理与基于文本的推理相比略弱，这突出了批量生成的必要性。"
      },
      {
       "id": "s-4-4-1-3",
       "original": "For more impressive examples, please refer to https://github.com/gpt-omni/mini-omni.",
       "zh": "更多令人印象深刻的示例，请参阅 https://github.com/gpt-omni/mini-omni。"
      }
     ]
    },
    {
     "id": "fig-4-4-1",
     "type": "figure_caption",
     "page": 8,
     "original": "Figure 5: Real streaming output examples of Mini-Omni",
     "zh": "图 5：Mini-Omni 的真实流式输出示例"
    }
   ]
  },
  {
   "id": "sec-5",
   "num": "5",
   "level": 1,
   "page": 8,
   "title": {
    "original": "Conclusion",
    "zh": "结论"
   },
   "blocks": [
    {
     "id": "p-5-1",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-5-1-1",
       "original": "In this work, we introduce Mini-Omni, the first multi-modal model with direct speech-to-speech capabilities.",
       "zh": "在这项工作中，我们介绍了 Mini-Omni，首个具备直接语音到语音能力的多模态模型。"
      },
      {
       "id": "s-5-1-2",
       "original": "Building on previous approaches that use text-guided speech generation, we propose a parallel text and audio generation method that leverages minimal additional data and modules to rapidly transfer a language model’s text capabilities to the audio modality, supporting streaming output interactions with high model and data efficiency.",
       "zh": "在之前使用文本引导语音生成方法的基础上，我们提出了一种并行文本和音频生成方法，仅利用极少的额外数据和模块，就能将语言模型的文本能力快速迁移到音频模态，支持流式输出交互，具有很高的模型和数据效率。"
      },
      {
       "id": "s-5-1-3",
       "original": "We explore both text-instructed streaming parallel generation and batch parallel generation, which further enhance the model’s reasoning ability and efficiency.",
       "zh": "我们探索了文本指令流式并行生成和批量并行生成，进一步增强了模型的推理能力和效率。"
      },
      {
       "id": "s-5-1-4",
       "original": "Our approach successfully addresses challenging real-time dialogue tasks using a model with only 0.5 billion parameters.",
       "zh": "我们的方法仅用 0.5B 参数的模型就成功解决了具有挑战性的实时对话任务。"
      },
      {
       "id": "s-5-1-5",
       "original": "We have developed the Any Model Can Talk method, based on a pre and post-adapter design, to facilitate rapid speech adaptation of other models with minimal additional training.",
       "zh": "我们开发了 Any Model Can Talk 方法，基于前后适配器设计，便于其他模型以最少额外训练快速适配语音能力。"
      },
      {
       "id": "s-5-1-6",
       "original": "Additionally, we have released the VoiceAssistant-400K dataset for fine-tuning speech output, designed to minimize the generation of code symbols and assist humans in a voice assistant-like manner.",
       "zh": "此外，我们还发布了用于微调语音输出的 VoiceAssistant-400K 数据集，旨在最小化代码符号生成，并以类似语音助手的方式辅助人类。"
      },
      {
       "id": "s-5-1-7",
       "original": "All our data, inference, and training codes will be progressively open-sourced at https://github.com/gpt-omni/mini-omni.",
       "zh": "我们的所有数据、推理和训练代码将在 https://github.com/gpt-omni/mini-omni 逐步开源。"
      },
      {
       "id": "s-5-1-8",
       "original": "We hope to provide guidance and support for other work focused on language model speech interaction.",
       "zh": "我们希望为其他专注于语言模型语音交互的工作提供指导和支持。"
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
       "original": "Jean-Baptiste Alayrac, Jeff Donahue, Pauline Luc, Antoine Miech, Iain Barr, Yana Hasson, Karel Lenc, Arthur Mensch, Katherine Millican, Malcolm Reynolds, et al. Flamingo: a visual language model for few-shot learning."
      },
      {
       "id": "s-references-1-2",
       "original": "Advances in neural information processing systems, 35:23716–23736,"
      }
     ]
    },
    {
     "id": "eq-references-1",
     "type": "equation",
     "page": 9,
     "original": "2022."
    },
    {
     "id": "p-references-2",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-references-2-1",
       "original": "Anthropic. https://huggingface.co/datasets/anthropic/hh-rlhf, 2024."
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
       "original": "Alexei Baevski, Yuhao Zhou, Abdelrahman Mohamed, and Michael Auli. wav2vec 2.0: A framework for self-supervised learning of speech representations."
      },
      {
       "id": "s-references-3-2",
       "original": "Advances in neural information processing systems, 33:12449–12460, 2020."
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
       "original": "Qian Chen, Yunfei Chu, Zhifu Gao, Zerui Li, Kai Hu, Xiaohuan Zhou, Jin Xu, Ziyang Ma, Wen Wang, Siqi Zheng, et al. Lauragpt: Listen, attend, understand, and regenerate audio with gpt. arXiv preprint arXiv:2310.04673, 2023."
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
       "original": "Sanyuan Chen, Yu Wu, Chengyi Wang, Shujie Liu, Daniel Tompkins, Zhuo Chen, and Furu Wei."
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
       "original": "Beats: Audio pre-training with acoustic tokenizers. arXiv preprint arXiv:2212.09058, 2022."
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
       "original": "Yunfei Chu, Jin Xu, Qian Yang, Haojie Wei, Xipin Wei, Zhifang Guo, Yichong Leng, Yuanjun Lv, Jinzheng He, Junyang Lin, et al. Qwen2-audio technical report. arXiv preprint arXiv:2407.10759,"
      }
     ]
    },
    {
     "id": "eq-references-2",
     "type": "equation",
     "page": 9,
     "original": "2024."
    },
    {
     "id": "p-references-8",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-references-8-1",
       "original": "Jade Copet, Felix Kreuk, Itai Gat, Tal Remez, David Kant, Gabriel Synnaeve, Yossi Adi, and Alexandre Défossez."
      },
      {
       "id": "s-references-8-2",
       "original": "Simple and controllable music generation."
      },
      {
       "id": "s-references-8-3",
       "original": "Advances in Neural Information Processing Systems, 36, 2024."
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
       "original": "Nilaksh Das, Saket Dingliwal, Srikanth Ronanki, Rohit Paturi, David Huang, Prashant Mathur, Jie Yuan, Dhanush Bekal, Xing Niu, Sai Muralidhar Jayanthi, et al. Speechverse: A large-scale generalizable audio language model. arXiv preprint arXiv:2405.08295, 2024. datashare. https://datashare.ed.ac.uk/handle/10283/2651, 2024."
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
       "original": "Chaoyou Fu, Haojia Lin, Zuwei Long, Yunhang Shen, Meng Zhao, Yifan Zhang, Xiong Wang, Di Yin, Long Ma, Xiawu Zheng, et al. Vita: Towards open-source interactive omni multimodal llm. arXiv preprint arXiv:2408.05211, 2024."
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
       "original": "Shujie Hu, Long Zhou, Shujie Liu, Sanyuan Chen, Hongkun Hao, Jing Pan, Xunying Liu, Jinyu Li, Sunit Sivasankaran, Linquan Liu, et al. Wavllm: Towards robust and adaptive speech large language model. arXiv preprint arXiv:2404.00656, 2024."
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
       "original": "Ziyue Jiang, Yi Ren, Zhenhui Ye, Jinglin Liu, Chen Zhang, Qian Yang, Shengpeng Ji, Rongjie Huang, Chunfeng Wang, Xiang Yin, et al. Mega-tts: Zero-shot text-to-speech at scale with intrinsic inductive bias. arXiv preprint arXiv:2306.03509, 2023."
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
       "original": "Eugene Kharitonov, Damien Vincent, Zalán Borsos, Raphaël Marinier, Sertan Girgin, Olivier Pietquin, Matt Sharifi, Marco Tagliasacchi, and Neil Zeghidour."
      },
      {
       "id": "s-references-13-2",
       "original": "Speak, read and prompt: High-fidelity text-to-speech with minimal supervision."
      },
      {
       "id": "s-references-13-3",
       "original": "Transactions of the Association for Computational Linguistics, 11:1703–1718, 2023."
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
       "original": "Matthew Le, Apoorv Vyas, Bowen Shi, Brian Karrer, Leda Sari, Rashel Moritz, Mary Williamson, Vimal Manohar, Yossi Adi, Jay Mahadeokar, et al. Voicebox: Text-guided multilingual universal speech generation at scale."
      },
      {
       "id": "s-references-14-2",
       "original": "Advances in neural information processing systems, 36, 2024."
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
       "original": "Junnan Li, Dongxu Li, Caiming Xiong, and Steven Hoi."
      },
      {
       "id": "s-references-15-2",
       "original": "Blip: Bootstrapping language-image pretraining for unified vision-language understanding and generation."
      },
      {
       "id": "s-references-15-3",
       "original": "In International conference on machine learning, pages 12888–12900."
      },
      {
       "id": "s-references-15-4",
       "original": "PMLR, 2022."
      }
     ]
    },
    {
     "id": "p-references-16",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-16-1",
       "original": "Haotian Liu, Chunyuan Li, Yuheng Li, and Yong Jae Lee."
      },
      {
       "id": "s-references-16-2",
       "original": "Improved baselines with visual instruction tuning."
      },
      {
       "id": "s-references-16-3",
       "original": "In Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition, pages 26296–26306, 2024. meta. llama3.1, 2024."
      },
      {
       "id": "s-references-16-4",
       "original": "URL https://llama.meta.com/."
      }
     ]
    },
    {
     "id": "p-references-17",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-17-1",
       "original": "Mihaiii. https://huggingface.co/datasets/mihaiii/qa-assistant-2, 2024a."
      }
     ]
    },
    {
     "id": "p-references-18",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-18-1",
       "original": "Mihaiii. https://huggingface.co/datasets/mihaiii/triviamultichoice, 2024b."
      }
     ]
    },
    {
     "id": "p-references-19",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-19-1",
       "original": "Mihaiii. https://huggingface.co/datasets/mihaiii/triviasinglechoice, 2024c. mixtral. https://mistral.ai/, 2024."
      }
     ]
    },
    {
     "id": "p-references-20",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-20-1",
       "original": "Eliya Nachmani, Alon Levkovitch, Roy Hirsch, Julian Salazar, Chulayuth Asawaroengchai, Soroosh Mariooryad, Ehud Rivlin, RJ Skerry-Ryan, and Michelle Tadmor Ramanovich."
      },
      {
       "id": "s-references-20-2",
       "original": "Spoken question answering and speech continuation using spectrogram-powered llm. arXiv preprint arXiv:2305.15255,"
      }
     ]
    },
    {
     "id": "eq-references-3",
     "type": "equation",
     "page": 10,
     "original": "2023."
    },
    {
     "id": "p-references-21",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-21-1",
       "original": "openai. https://openai.com/, 2024."
      }
     ]
    },
    {
     "id": "p-references-22",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-22-1",
       "original": "OpenAssistan. https://huggingface.co/datasets/openassistant/oasst1, 2024."
      }
     ]
    },
    {
     "id": "p-references-23",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-23-1",
       "original": "OpenOrca. https://huggingface.co/datasets/open-orca/openorca/."
      }
     ]
    },
    {
     "id": "p-references-24",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-24-1",
       "original": "Vassil Panayotov, Guoguo Chen, Daniel Povey, and Sanjeev Khudanpur."
      },
      {
       "id": "s-references-24-2",
       "original": "Librispeech: an asr corpus based on public domain audio books."
      },
      {
       "id": "s-references-24-3",
       "original": "In 2015 IEEE international conference on acoustics, speech and signal processing (ICASSP), pages 5206–5210."
      },
      {
       "id": "s-references-24-4",
       "original": "IEEE, 2015."
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
       "original": "Vineel Pratap, Qiantong Xu, Anuroop Sriram, Gabriel Synnaeve, and Ronan Collobert."
      },
      {
       "id": "s-references-25-2",
       "original": "Mls: A large-scale multilingual dataset for speech research. arXiv preprint arXiv:2012.03411, 2020."
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
       "original": "Alec Radford, Jong Wook Kim, Tao Xu, Greg Brockman, Christine McLeavey, and Ilya Sutskever."
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
       "original": "Robust speech recognition via large-scale weak supervision."
      },
      {
       "id": "s-references-27-2",
       "original": "In International conference on machine learning, pages 28492–28518."
      },
      {
       "id": "s-references-27-3",
       "original": "PMLR, 2023. sayan1101. https://huggingface.co/datasets/sayan1101/identity-finetune-data, 2024."
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
       "original": "Hubert Siuzdak. https://github.com/hubertsiuzdak/snac/, 2024."
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
       "original": "Tianxiang Sun, Xiaotian Zhang, Zhengfu He, Peng Li, Qinyuan Cheng, Xiangyang Liu, Hang Yan, Yunfan Shao, Qiong Tang, Shiduo Zhang, et al. Moss: An open conversational large language model."
      },
      {
       "id": "s-references-29-2",
       "original": "Machine Intelligence Research, pages 1–18, 2024."
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
       "original": "Changli Tang, Wenyi Yu, Guangzhi Sun, Xianzhao Chen, Tian Tan, Wei Li, Lu Lu, Zejun Ma, and Chao Zhang."
      },
      {
       "id": "s-references-30-2",
       "original": "Salmonn: Towards generic hearing abilities for large language models. arXiv preprint arXiv:2310.13289, 2023. vicgalle. https://huggingface.co/datasets/vicgalle/alpaca-gpt4, 2024."
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
       "original": "An Yang, Baosong Yang, Binyuan Hui, Bo Zheng, Bowen Yu, Chang Zhou, Chengpeng Li, Chengyuan Li, Dayiheng Liu, Fei Huang, et al."
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
       "original": "Qwen2 technical report."
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
       "original": "arXiv preprint arXiv:2407.10671, 2024a."
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
       "original": "Dongchao Yang, Songxiang Liu, Rongjie Huang, Chao Weng, and Helen Meng."
      },
      {
       "id": "s-references-34-2",
       "original": "Instructtts: Modelling expressive tts in discrete latent space with natural language style prompt."
      },
      {
       "id": "s-references-34-3",
       "original": "IEEE/ACM Transactions on Audio, Speech, and Language Processing, 2024b."
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
       "original": "Heiga Zen, Viet Dang, Rob Clark, Yu Zhang, Ron J Weiss, Ye Jia, Zhifeng Chen, and Yonghui Wu."
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
       "original": "Libritts: A corpus derived from librispeech for text-to-speech. arXiv preprint arXiv:1904.02882,"
      }
     ]
    },
    {
     "id": "eq-references-4",
     "type": "equation",
     "page": 10,
     "original": "2019."
    },
    {
     "id": "p-references-37",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-37-1",
       "original": "Dong Zhang, Shimin Li, Xin Zhang, Jun Zhan, Pengyu Wang, Yaqian Zhou, and Xipeng Qiu."
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
       "original": "Speechgpt: Empowering large language models with intrinsic cross-modal conversational abilities. arXiv preprint arXiv:2305.11000, 2023a."
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
       "original": "Hang Zhang, Xin Li, and Lidong Bing."
      },
      {
       "id": "s-references-39-2",
       "original": "Video-llama: An instruction-tuned audio-visual language model for video understanding. arXiv preprint arXiv:2306.02858, 2023b."
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
    "sentence_id": "s-abstract-1-5",
    "quote": "an audio-based end-to-end conversational model"
   },
   "kind": "concept",
   "title": "端到端语音对话",
   "explanation": "「端到端」在这里意味着语音输入直接进模型、语音输出直接从模型出，中间不经过独立的 ASR 和 TTS 模块。这与传统的 ASR→LLM→TTS 级联方案有本质区别，理论上可以消除级联带来的延迟累积和误差传递。但实际工程中，端到端模型往往需要在音频质量和推理能力之间做权衡，Mini-Omni 选择用文本引导来缓解这一矛盾。",
   "featured": true
  },
  {
   "id": "ann-002",
   "anchor": {
    "sentence_id": "s-1-1-8",
    "quote": "introduces significant latency due to the time required for text generation"
   },
   "kind": "comparison",
   "title": "级联方案的延迟瓶颈",
   "explanation": "级联方案（ASR→LLM→TTS）的延迟不是简单的加法，而是串联阻塞：必须等 LLM 生成完整文本，TTS 才能开始合成。在对话场景中，用户感知到的「思考时间」会被显著放大。Mini-Omni 的并行生成正是为了打破这种串行依赖，让音频和文本几乎同时开始输出。",
   "featured": true
  },
  {
   "id": "ann-003",
   "anchor": {
    "sentence_id": "s-1-2-1",
    "quote": "direct training for audio modality reasoning is highly challenging"
   },
   "kind": "motivation",
   "title": "直接音频推理的困难",
   "explanation": "这是本文最核心的动机之一。作者发现，如果直接让模型从音频输入推理到音频输出，模型很容易产生不连贯的输出。根本原因在于音频 token 的信息密度远低于文本，且缺乏文本那样的显式逻辑结构。Mini-Omni 的解决方案不是硬磕音频推理，而是让文本「托底」——用文本生成来引导音频生成，相当于把推理任务转回模型更擅长的文本域。",
   "featured": true
  },
  {
   "id": "ann-004",
   "anchor": {
    "sentence_id": "s-1-4-1",
    "quote": "parallel generation paradigm in which the transformer simultaneously produces audio and text tokens"
   },
   "kind": "concept",
   "title": "并行生成范式",
   "explanation": "Mini-Omni 的并行生成不是简单的「同时输出」，而是让文本和音频 token 在同一个自回归序列中交错生成。文本 token 先出，作为音频 token 的条件，这样既保留了文本的推理能力，又实现了流式音频输出。这种设计的关键假设是文本的信息密度足够高，可以用更少的 token 承载相同的语义。",
   "featured": true
  },
  {
   "id": "ann-005",
   "anchor": {
    "sentence_id": "s-1-4-4",
    "quote": "SNAC [Siuzdak, 2024], a music-grade encoder features 8 layers of codebooks"
   },
   "kind": "engineering",
   "title": "SNAC 编码器的选择",
   "explanation": "作者明确选择了「音乐级」的 SNAC 而非更轻量的语音编码器，这是一个有意识的权衡：用更高的码本复杂度换取更好的音频质量。8 层码本意味着每秒数百个 token，这对自回归生成是巨大的负担。Mini-Omni 的延迟并行解码正是为了应对这一挑战，但这也暴露了端到端方案的一个固有矛盾——高质量音频 token 化与实时性之间的张力。",
   "featured": true
  },
  {
   "id": "ann-006",
   "anchor": {
    "sentence_id": "s-3-1-4",
    "quote": "text outputs have higher information density"
   },
   "kind": "concept",
   "title": "文本信息密度假设",
   "explanation": "这是 Mini-Omni 整个方法论的基石假设：文本用更少的 token 就能表达相同的信息。如果这一假设成立，那么让文本「先跑」、音频「跟随」就是合理的。但值得注意的是，这个假设在复杂推理任务中可能不成立——某些推理过程可能确实需要音频中的韵律、停顿等副语言信息，而这些在纯文本中是缺失的。",
   "featured": true
  },
  {
   "id": "ann-007",
   "anchor": {
    "sentence_id": "s-3-2-2-2",
    "quote": "Parallel generation was first introduced by MusicGen"
   },
   "kind": "connection",
   "title": "与 MusicGen 的渊源",
   "explanation": "Mini-Omni 的并行解码直接借鉴了 MusicGen 在音乐生成中的做法。MusicGen 用多码本并行生成来加速音乐合成，Mini-Omni 则将其迁移到语音对话场景，并加入了文本条件作为额外的引导。这种跨领域的灵感迁移在语音模型中很常见，但成功的关键在于如何适配——Mini-Omni 的适配方式是引入「文本优先」的延迟模式。",
   "featured": false
  },
  {
   "id": "ann-008",
   "anchor": {
    "sentence_id": "s-3-2-2-6",
    "quote": "eight sub-Language Model heads to generate eight tokens"
   },
   "kind": "engineering",
   "title": "八头并行解码",
   "explanation": "8 个子语言模型头对应 7 层 SNAC 码本加 1 层文本，这是一个相当激进的并行化设计。每一步同时生成 8 个 token，理论上可以大幅加速推理。但这也带来了显著的工程复杂度：需要精心设计的延迟对齐机制，确保文本 token 始终领先于对应的音频 token，否则音频质量会急剧下降。",
   "featured": false
  },
  {
   "id": "ann-009",
   "anchor": {
    "sentence_id": "s-3-2-3-2",
    "quote": "audio responses tending to be simpler"
   },
   "kind": "critique",
   "title": "音频推理的退化",
   "explanation": "作者坦诚地承认了并行生成的一个副作用：音频回答比文本回答更简单。这说明即使有了文本引导，模型在音频模态的推理能力仍然受限。这可能是因为音频 token 的序列更长、噪声更多，模型难以在长序列上维持复杂的推理链。批量并行解码正是为了弥补这一缺陷，但这也暴露了端到端方法的一个深层问题。",
   "featured": true
  },
  {
   "id": "ann-010",
   "anchor": {
    "sentence_id": "s-3-2-3-5",
    "quote": "expand the inference task for a single input to a batch size of 2"
   },
   "kind": "engineering",
   "title": "批量并行的 trick",
   "explanation": "这是一个相当巧妙的推理时技巧：用 batch size 2 来「作弊」，让一个样本专注文本推理，另一个样本专注音频合成，然后把文本结果「嫁接」到音频流中。这本质上是用计算冗余换取质量提升，类似于 TTS 中的 teacher forcing。但这也说明模型本身还无法真正同时做好文本推理和音频生成，需要这种外部的「分工」机制。",
   "featured": true
  },
  {
   "id": "ann-011",
   "anchor": {
    "sentence_id": "s-3-2-3-10",
    "quote": "key algorithmic innovation that enables such a small model"
   },
   "kind": "critique",
   "title": "小模型的「关键创新」",
   "explanation": "作者将批量并行解码称为「关键算法创新」，但这更像是一个工程上的权宜之计而非根本性的算法突破。它有效，但不够优雅——真正的创新应该是让模型自身具备跨模态推理能力，而不是靠外部 trick 来弥补。不过，考虑到 Mini-Omni 只有 0.5B 参数，这种务实的做法也是可以理解的。",
   "featured": false
  },
  {
   "id": "ann-012",
   "anchor": {
    "sentence_id": "s-3-3-3-4",
    "quote": "core model of Mini-Omni is entirely frozen"
   },
   "kind": "motivation",
   "title": "冻结核心模型的设计",
   "explanation": "三阶段训练的第一阶段完全冻结 LLM，只训练两个适配器，这是一种非常保守但有效的策略。它的目的是避免在模态对齐阶段破坏 LLM 已有的文本能力。这种「先适配、再融合」的思路在多模态模型中很常见，但 Mini-Omni 的 specially之处在于它同时需要处理输入和输出两个方向的适配。",
   "featured": false
  },
  {
   "id": "ann-013",
   "anchor": {
    "sentence_id": "s-4-1-1-1",
    "quote": "three speech recognition datasets totaling approximately 8,000 hours"
   },
   "kind": "number",
   "title": "训练数据规模",
   "explanation": "8,000 小时的 ASR 数据对于训练一个语音模型来说并不算大——相比之下，Whisper 用了 680,000 小时。Mini-Omni 用如此有限的数据就能实现可用的语音交互能力，这很大程度上得益于其「站在巨人肩膀上」的策略：基座模型 Qwen2-0.5B 已经具备了强大的文本能力，只需要学习模态对齐即可。",
   "featured": false
  },
  {
   "id": "ann-014",
   "anchor": {
    "sentence_id": "s-4-2-1-3",
    "quote": "Qwen2-0.5B"
   },
   "kind": "engineering",
   "title": "0.5B 小模型的选择",
   "explanation": "选择 Qwen2-0.5B 作为基座是一个务实的决定：小模型意味着更低的推理成本和更容易的部署。但这也带来了明显的上限——0.5B 参数的模型在复杂推理任务上天然受限。Mini-Omni 的批量并行解码某种程度上就是在弥补小模型的能力不足。如果换成更大的基座模型，可能不需要这种 trick 就能获得更好的音频推理质量。",
   "featured": true
  },
  {
   "id": "ann-015",
   "anchor": {
    "sentence_id": "s-4-3-1-4",
    "quote": "slightly lags behind Whisper-small"
   },
   "kind": "comparison",
   "title": "ASR 性能的差距",
   "explanation": "Mini-Omni 在 LibriSpeech 上的 WER（4.5%/9.7%）略高于 Whisper-small（3.4%/7.6%），但这个差距在可接受范围内。考虑到 Mini-Omni 是一个端到端对话模型而非专用 ASR 系统，这个结果已经相当不错。真正的挑战在于：这种 ASR 性能是否足以支撑复杂的语音交互场景，特别是在嘈杂环境或口音较重的情况下。",
   "featured": false
  },
  {
   "id": "ann-016",
   "anchor": {
    "sentence_id": "s-4-4-1-2",
    "quote": "speech-based reasoning is somewhat weaker compared to text-based reasoning"
   },
   "kind": "critique",
   "title": "语音推理的弱点",
   "explanation": "这是论文中一句非常诚实的自述：语音推理确实比文本推理弱。这验证了作者最初的担忧，也说明批量并行解码的必要性。但这也引出了一个更深层的问题：如果语音推理天然弱于文本推理，那么端到端语音模型的上限在哪里？是否有些任务本质上就需要文本作为中间表示？",
   "featured": true
  },
  {
   "id": "ann-017",
   "anchor": {
    "sentence_id": "s-1-7-2",
    "quote": "VoiceAssistant-400K dataset, comprising over 400,000 entries"
   },
   "kind": "number",
   "title": "VoiceAssistant-400K 数据集",
   "explanation": "400,000 条由 GPT-4o 生成的语音助手数据，这个规模在语音领域算是相当可观的。但值得注意的是，这些数据是「合成」的——由 GPT-4o 生成文本，再用 TTS 转成语音。合成数据的质量直接决定了模型输出的上限，而 GPT-4o 的「教师」角色也意味着 Mini-Omni 的能力很难超越 GPT-4o 的语音理解水平。",
   "featured": false
  },
  {
   "id": "ann-018",
   "anchor": {
    "sentence_id": "s-3-3-2-4",
    "quote": "flattening for audio token modeling, but it resulted in excessively long tokens"
   },
   "kind": "engineering",
   "title": "扁平化 token 的失败",
   "explanation": "作者曾尝试将多码本音频 token 扁平化为单一序列，但发现这会导致序列过长、学习不稳定。这是一个重要的负面结果：它说明音频 token 的并行结构不是可选的优化，而是必要的。这也解释了为什么 Mini-Omni 最终选择了延迟并行解码——不是因为它更好，而是因为扁平化根本不可行。",
   "featured": false
  },
  {
   "id": "ann-019",
   "anchor": {
    "sentence_id": "s-5-1-4",
    "quote": "only 0.5 billion parameters"
   },
   "kind": "number",
   "title": "0.5B 参数的成就",
   "explanation": "用 0.5B 参数实现端到端实时语音对话，这在工程上是一个不小的成就。但「成功解决」这个词可能有些夸大——从论文自己的 case study 来看，语音推理质量仍然明显弱于文本。0.5B 参数既是 Mini-Omni 的亮点（高效、易部署），也是其局限（能力上限低）。",
   "featured": false
  },
  {
   "id": "ann-020",
   "anchor": {
    "sentence_id": "s-2-3-4",
    "quote": "Audio-Text-Text-Audio(A- T-T-A) process"
   },
   "kind": "comparison",
   "title": "A-T-T-A 与并行生成",
   "explanation": "A-T-T-A（音频→文本→文本→音频）是 SpeechGPT 等早期模型的标准流程，它的延迟来自于两次完整的模态转换。Mini-Omni 的并行生成试图将这一过程压缩为「音频+文本同时输出」，但严格来说它并没有完全消除文本中间表示——文本 token 仍然是音频 token 的条件。所以 Mini-Omni 更像是「并行的 A-T-T-A」而非真正的端到端。",
   "featured": true
  }
 ]
};
