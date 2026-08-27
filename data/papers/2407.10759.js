// 自动生成：2407.10759 全文双语精读数据（由 tools/compile_paper.js 装配）
// 结构/原文来自 .cache/papers/2407.10759.json（tools/extract_paper.py）；
// 翻译与讲解来自 .cache/papers/zh/2407.10759/（LLM agent 撰写）。
// 改翻译请改片段后重新装配；勿手改本文件的结构与 original 字段。
globalThis.PAPER_2407_10759 = {
 "paper_id": "2407.10759",
 "model_id": "qwen2_audio",
 "title": {
  "original": "Qwen2-Audio Technical Report",
  "zh": "Qwen2-Audio 技术报告"
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
       "original": "Yunfei Chu∗† Jin Xu∗† Qian Yang∗ Haojie Wei Xipin Wei Zhifang Guo Yichong Leng Yuanjun Lv Jinzheng He Junyang Lin Chang Zhou† Jingren Zhou Qwen Team, Alibaba Group Code & Demo & Models: https://github.com/QwenLM/Qwen2-Audio"
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
       "original": "We introduce the latest progress of Qwen-Audio, a large-scale audio-language model called Qwen2-Audio, which is capable of accepting various audio signal inputs and performing audio analysis or direct textual responses with regard to speech instructions.",
       "zh": "我们介绍 Qwen-Audio 的最新进展——一个名为 Qwen2-Audio 的大规模音频-语言模型，它能够接收多种音频信号输入，并针对语音指令进行音频分析或直接给出文本回复。"
      },
      {
       "id": "s-abstract-1-2",
       "original": "In contrast to complex hierarchical tags, we have simplified the pre-training process by utilizing natural language prompts for different data and tasks, and have further expanded the data volume.",
       "zh": "与复杂的层级标签不同，我们通过为不同数据和任务使用自然语言提示（prompt）简化了预训练流程，并进一步扩大了数据规模。"
      },
      {
       "id": "s-abstract-1-3",
       "original": "We have boosted the instruction-following capability of Qwen2-Audio and implemented two distinct audio interaction modes for voice chat and audio analysis.",
       "zh": "我们提升了 Qwen2-Audio 的指令遵循能力，并实现了两种不同的音频交互模式：语音聊天与音频分析。"
      },
      {
       "id": "s-abstract-1-4",
       "original": "In the voice chat mode, users can freely engage in voice interactions with Qwen2-Audio without text input.",
       "zh": "在语音聊天模式下，用户可以在完全不输入文本的情况下与 Qwen2-Audio 自由进行语音交互。"
      },
      {
       "id": "s-abstract-1-5",
       "original": "In the audio analysis mode, users could provide audio and text instructions for analysis during the interaction.",
       "zh": "在音频分析模式下，用户可以在交互过程中提供音频和文本指令以进行分析。"
      },
      {
       "id": "s-abstract-1-6",
       "original": "Note that we do not use any system prompts to switch between voice chat and audio analysis modes.",
       "zh": "需要说明的是，我们并未使用任何系统提示来在语音聊天与音频分析两种模式之间切换。"
      },
      {
       "id": "s-abstract-1-7",
       "original": "Qwen2-Audio is capable of intelligently comprehending the content within audio and following voice commands to respond appropriately.",
       "zh": "Qwen2-Audio 能够智能地理解音频中的内容，并遵循语音命令作出恰当的响应。"
      },
      {
       "id": "s-abstract-1-8",
       "original": "For instance, in an audio segment that simultaneously contains sounds, multi-speaker conversations, and a voice command, Qwen2-Audio can directly understand the command and provide an interpretation and response to the audio.",
       "zh": "例如，在一段同时包含环境声音、多说话人对话和一条语音命令的音频中，Qwen2-Audio 可以直接理解其中这条命令，并对音频给出解读与回应。"
      },
      {
       "id": "s-abstract-1-9",
       "original": "Additionally, DPO has optimized the model’s performance in terms of factuality and adherence to desired behavior.",
       "zh": "此外，DPO（直接偏好优化）在事实性与符合期望行为方面优化了模型的表现。"
      },
      {
       "id": "s-abstract-1-10",
       "original": "According to the evaluation results from AIR-Bench, Qwen2-Audio outperformed previous SOTAs, such as Gemini-1.5-pro, in tests focused on audio-centric instruction-following capabilities.",
       "zh": "根据 AIR-Bench 的评测结果，Qwen2-Audio 在以音频为核心的指令遵循能力测试上超过了此前的 SOTA，例如 Gemini-1.5-pro。"
      },
      {
       "id": "s-abstract-1-11",
       "original": "Qwen2-Audio is open-sourced with the aim of fostering the advancement of the multi-modal language community.",
       "zh": "Qwen2-Audio 已开源，旨在促进多模态语言社区的发展。"
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
       "original": "Audio serves as a crucial medium for interaction and communication among humans and other living beings, carrying rich information content.",
       "zh": "音频是人类及其他生物之间交互与沟通的关键媒介，承载着丰富的信息内容。"
      },
      {
       "id": "s-1-1-2",
       "original": "A comprehensive understanding of various forms of audio signals is paramount to achieving Artificial General Intelligence (AGI).",
       "zh": "全面理解各种形式的音频信号，对实现通用人工智能（AGI）至关重要。"
      },
      {
       "id": "s-1-1-3",
       "original": "Recently, significant advancements have been made in the development of large audio-language models (LALMs) (Chu et al., 2023; Das et al., 2024; Kong et al., 2024; Tang et al., 2024; OpenAI, 2024), demonstrating remarkable achievements in comprehending diverse speech signals, performing speech signal analysis, and complex reasoning.",
       "zh": "近来，大规模音频-语言模型（LALMs）（Chu et al., 2023; Das et al., 2024; Kong et al., 2024; Tang et al., 2024; OpenAI, 2024）的发展取得了显著进展，在理解多样化语音信号、进行语音信号分析以及复杂推理方面都展现出令人瞩目的成果。"
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
       "original": "In this report, we develop Qwen2-Audio, with a primary focus on enhancing its instruction-following capabilities.",
       "zh": "在本报告中，我们开发了 Qwen2-Audio，主要聚焦于提升其指令遵循能力。"
      },
      {
       "id": "s-1-2-2",
       "original": "Qwen2-Audio is a Large Audio-Language Model (LALM) designed to process both audio and text inputs to generate textual outputs.",
       "zh": "Qwen2-Audio 是一个大型音频-语言模型（LALM），设计为处理音频与文本输入并生成文本输出。"
      },
      {
       "id": "s-1-2-3",
       "original": "Compared to previous models, Qwen2-Audio significantly scales up the training dataset.",
       "zh": "与以往的模型相比，Qwen2-Audio 大幅扩大了训练数据集的规模。"
      },
      {
       "id": "s-1-2-4",
       "original": "To reduce the gap between pre-training and post-training stages, we simplify the ∗Equal contribution, †Corresponding author Librispeech Mixed 96.0 6.43 94.0 5.95 Music 92.0 6.5 5.48 6.0 5.5 N/A 5.58 6.15 5.62 6.72 90.88 6.25 Sound 91.75 6.88 92.62 Speech FLUERS-ZH Aishell2 96.0 94.0 CoVoST2 30.0 92.0 20.0 10.0 15.0 30.0 45.0 62.5 Meld 75.0 87.5 Previous Top-tiers Qwen-Audio VocalSound",
       "zh": "为了缩小预训练阶段与后训练阶段之间的差距，我们简化了……（此处原文被页面脚注与 Figure 1 的图表数值打断，残留散值照录如下：Librispeech Mixed 96.0、6.43、94.0、5.95；Music 92.0、6.5、5.48、6.0、5.5、N/A、5.58、6.15、5.62、6.72、90.88、6.25；Sound 91.75、6.88、92.62；Speech；FLUERS-ZH、Aishell2 96.0、94.0；CoVoST2 30.0、92.0、20.0、10.0、15.0、30.0、45.0、62.5；Meld 75.0、87.5；Previous Top-tiers、Qwen-Audio、VocalSound；并含 *Equal contribution（同等贡献）与 †Corresponding author（通讯作者）脚注，正文延续见下句）。"
      }
     ]
    },
    {
     "id": "fig-1-1",
     "type": "figure_caption",
     "page": 2,
     "original": "Figure 1: Performance of Qwen2-Audio, Qwen-Audio and previous top-tiers from LALMs such as SpeechT5 (Ao et al., 2021), SpeechNet (Chen et al., 2021), SpeechLLaMA (Wu et al., 2023a), SALMONN (Tang et al., 2024), Whisper (Radford et al., 2023) Pengi (Deshmukh et al., 2023), and SpeechVerse (Das et al., 2024). We demonstrate the test set results across the 10 datasets covering Automatic Speech Recognition (ASR), Speech-to-Text Translation (S2TT), Speech Emotion Recognition (SER), Vocal Sound Classification (VSC), and instruction-following benchmark (Yang et al., 2024). The results of ASR datasets, such as Librispeech and Aishell2 refer to 1 - WER%. The results of CoVoST2 is the average BLEU score of seven translation directions (en-de, de-en, en-zh, zh-en, es-en, fr-en and it-en). The results of the AIR-Bench chat benchmark encompass four dimensions: speech, sound, music, and mixed. Scores for each dimension are automatically assessed by GPT-4, with values ranging from 0 to 10. Qwen2-Audio achieves remarkable performance without requiring any task-specific fine-tuning, surpassing its counterparts.",
     "zh": "Figure 1：Qwen2-Audio、Qwen-Audio 以及此前的顶级 LALM（如 SpeechT5 (Ao et al., 2021)、SpeechNet (Chen et al., 2021)、SpeechLLaMA (Wu et al., 2023a)、SALMONN (Tang et al., 2024)、Whisper (Radford et al., 2023)、Pengi (Deshmukh et al., 2023)、SpeechVerse (Das et al., 2024)）的性能对比。我们展示了覆盖自动语音识别（ASR）、语音到文本翻译（S2TT）、语音情感识别（SER）、人声分类（VSC）以及指令遵循基准（Yang et al., 2024）的 10 个测试集结果。Librispeech、Aishell2 等 ASR 数据集的结果为 1 - WER%。CoVoST2 的结果是七个翻译方向（en-de、de-en、en-zh、zh-en、es-en、fr-en、it-en）的平均 BLEU 分数。AIR-Bench chat 基准的结果涵盖四个维度：语音（speech）、声音（sound）、音乐（music）与混合（mixed）。每个维度的分数由 GPT-4 自动评估，取值范围为 0 到 10。Qwen2-Audio 在不要求任何任务特定微调的情况下取得了出色的表现，超过了同类模型。"
    },
    {
     "id": "p-1-3",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-1-3-1",
       "original": "pre-training process by directly using natural language prompts for various data and tasks, as illustrated in figure 2.",
       "zh": "……预训练流程改为直接对各类数据与任务使用自然语言提示，如 Figure 2 所示。"
      },
      {
       "id": "s-1-3-2",
       "original": "Following the practices in Large Language Models (LLMs) (OpenAI, 2023; Qwen, 2023), we further conduct instruction tuning and direct preference optimization to align the model’s outputs with human preferences.",
       "zh": "沿用大语言模型（LLM）中的做法（OpenAI, 2023; Qwen, 2023），我们进一步进行了指令微调与直接偏好优化（DPO），使模型输出与人类偏好对齐。"
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
       "original": "Qwen2-Audio operates in two distinct modes: Audio Analysis and Voice Chat.",
       "zh": "Qwen2-Audio 工作在两种不同的模式下：音频分析（Audio Analysis）与语音聊天（Voice Chat）。"
      },
      {
       "id": "s-1-4-2",
       "original": "These two modes are differentiated by their functionality, but there is no need for users to distinguish between them during use.",
       "zh": "这两种模式在功能上有所区分，但用户在使用过程中无需去区分它们。"
      },
      {
       "id": "s-1-4-3",
       "original": "In the audio analysis mode, users can leverage Qwen2-Audio to analyze a diverse range of audio types, including speech, sound, music, or various mixed audio forms.",
       "zh": "在音频分析模式下，用户可以利用 Qwen2-Audio 分析多种多样的音频类型，包括语音、声音、音乐，或各种混合音频形式。"
      },
      {
       "id": "s-1-4-4",
       "original": "Commands can be issued either through audio or text, and Qwen2-Audio will autonomously discern the command segments within the audio.",
       "zh": "命令可以通过音频或文本发出，Qwen2-Audio 会自主辨别音频中的命令片段。"
      },
      {
       "id": "s-1-4-5",
       "original": "Conversely, in voice chat mode, users can interact with Qwen2-Audio as if it were a conversational agent, engaging in unrestricted dialogue.",
       "zh": "相反，在语音聊天模式下，用户可以将 Qwen2-Audio 当作一个对话智能体，进行不受限的对话。"
      },
      {
       "id": "s-1-4-6",
       "original": "Audio interaction is available, and users can switch to text interaction at any moment they choose.",
       "zh": "语音交互可用，用户也可以选择随时切换到文本交互。"
      },
      {
       "id": "s-1-4-7",
       "original": "For instance, if a user inputs an audio clip where the initial part is the sound of typing on a keyboard, followed by the user asking \"What is this sound?\" in spoken language, Qwen2-Audio is expected to respond directly with \"This is the sound of a keyboard.\"",
       "zh": "例如，如果用户输入一段音频，其开头部分是敲击键盘的声音，随后用户用口语问「这是什么声音？」，我们期望 Qwen2-Audio 直接回答「这是键盘的声音」。"
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
       "original": "As shown in Figure 1, extensive evaluation demonstrates that Qwen2-Audio, without any task-specific fine-tuning, outperforms previous LALMs across a diverse range of tasks.",
       "zh": "如 Figure 1 所示，大量评测表明，Qwen2-Audio 在不做任何任务特定微调的情况下，于多种任务上超过了以往的 LALM。"
      },
      {
       "id": "s-1-5-2",
       "original": "Among them, Qwen2-Audio Multi-Task Pre-training “A man says “Hello” in Chinese.”",
       "zh": "其中，Qwen2-Audio 的多任务预训练……（此处为 Figure 2 内的示例文字「A man says 'Hello' in Chinese.」，意为「一个男人用中文说'你好'」）。"
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
       "original": "Input audio ASR Detect the language and recognize the speech:",
       "zh": "（Figure 2 图内文字）输入音频；ASR（任务）；「检测语言并识别语音」。"
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
       "original": "Language prompt (Sound of a car horning.)",
       "zh": "（Figure 2 图内文字）语言提示；（Sound of a car horning. 汽车鸣笛声。）"
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
       "original": "Input audio AAC Generate the caption in English:",
       "zh": "（Figure 2 图内文字）输入音频；AAC（音频描述任务）；「用英文生成描述」。"
      }
     ]
    },
    {
     "id": "p-1-9",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-1-9-1",
       "original": "Language prompt Audio Encoder SFT Voice Chat “I lost my phone today…”",
       "zh": "（Figure 2 图内文字）语言提示；音频编码器；SFT；语音聊天；「我今天把手机丢了……」"
      }
     ]
    },
    {
     "id": "p-1-10",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-1-10-1",
       "original": "“What’s the mood of the speaker?”",
       "zh": "「说话人的情绪如何？」"
      }
     ]
    },
    {
     "id": "p-1-11",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-1-11-1",
       "original": "Audio Analysis DPO “What emotions does the music convey?” (A guitar melody.)",
       "zh": "音频分析；DPO；「这段音乐传达了什么情绪？」（一段吉他旋律。）"
      }
     ]
    },
    {
     "id": "p-1-12",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-1-12-1",
       "original": "Query Input audio This piece of guitar music, with its soothing folk style, conveys a sense of calmness and nostalgia.",
       "zh": "查询；输入音频；这段吉他曲以其舒缓的民谣风格，传达出一种平静与怀旧之感。"
      }
     ]
    },
    {
     "id": "p-1-13",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-1-13-1",
       "original": "This piece of guitar music evokes a deep sense of calm and relaxation.",
       "zh": "这段吉他曲唤起了深深的平静与放松之感。"
      },
      {
       "id": "s-1-13-2",
       "original": "The gentle strumming patterns and melodies resonate with a feeling of peacefulness, as if transporting the listener to a quiet, serene place.",
       "zh": "轻柔的扫弦节奏与旋律唤起一种安宁的感觉，仿佛把听者带到一处静谧之地。"
      }
     ]
    },
    {
     "id": "p-1-14",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-1-14-1",
       "original": "<|zh|>你好。 A loud honk from a car startles a man crossing a busy city street, the noise echoing through the bustling surroundings.",
       "zh": "<|zh|>你好。（模型输出示例：）一声响亮的汽车鸣笛惊到了正穿过繁忙城市街道的男子，噪声在熙攘的四周回荡。"
      }
     ]
    },
    {
     "id": "p-1-15",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-1-15-1",
       "original": "Next Token Prediction QwenLM I'm sorry to hear that!",
       "zh": "（Figure 2 训练信号）下一个 token 预测（Next Token Prediction）；QwenLM；（回答示例：）听到这个消息我很难过！"
      },
      {
       "id": "s-1-15-2",
       "original": "Losing your phone can be frustrating.",
       "zh": "丢了手机确实很让人沮丧。"
      }
     ]
    },
    {
     "id": "p-1-16",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-1-16-1",
       "original": "She is sad.",
       "zh": "（Figure 2 中标注回答的示例：）她很难过。"
      }
     ]
    },
    {
     "id": "p-1-17",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-1-17-1",
       "original": "Preference scores FeedBack Lose！ 3.0 9.0 Win!",
       "zh": "（Figure 2 中 DPO 阶段示意：）偏好分数；反馈；负样本 3.0；正样本 9.0；胜出！"
      }
     ]
    },
    {
     "id": "fig-1-2",
     "type": "figure_caption",
     "page": 3,
     "original": "Figure 2: The overview of three-stage training process of Qwen2-Audio.",
     "zh": "Figure 2：Qwen2-Audio 三阶段训练流程概览。"
    },
    {
     "id": "p-1-18",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-1-18-1",
       "original": "achieves state-of-the-art performance on the test set of Aishell2, FLUERS-zh, VocalSound and AIR-Bench chat benchmark.",
       "zh": "……在 Aishell2、FLUERS-zh、VocalSound 以及 AIR-Bench chat 基准的测试集上取得了 SOTA 的表现。"
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
    "original": "Methodology Model Architecture",
    "zh": "方法：模型架构"
   },
   "blocks": [
    {
     "id": "p-2-1",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-2-1-1",
       "original": "The training process of Qwen2-Audio is depicted in Figure 2, which contains an audio encoder and a large language model.",
       "zh": "Qwen2-Audio 的训练流程如图 2 所示，模型包含一个音频编码器和一个大语言模型。"
      },
      {
       "id": "s-2-1-2",
       "original": "Given the paired data (a, x), where the a and x denote the audio sequences and text sequences, the training objective is to maximize the next text token probability as",
       "zh": "给定成对数据 (a, x)，其中 a 和 x 分别表示音频序列和文本序列，训练目标是最大化下一个文本 token 的概率，如下式："
      }
     ]
    },
    {
     "id": "eq-2-1",
     "type": "equation",
     "page": 3,
     "original": "Pθ(xt|x<t, Encoderϕ(a)), (1)"
    },
    {
     "id": "p-2-2",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-2-2-1",
       "original": "conditioning on audio representations and previous text sequences x<t, where θ and ϕ denote the trainable parameters of the LLM and audio encoder respectively.",
       "zh": "即：以音频表示和此前的文本序列 x<t 为条件，其中 θ 和 ϕ 分别表示大语言模型与音频编码器的可训练参数。"
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
       "original": "Different from Qwen-Audio, the initialization of the audio encoder of Qwen2-Audio is based on the Whisperlarge-v3 model (Radford et al., 2023).",
       "zh": "与 Qwen-Audio 不同，Qwen2-Audio 的音频编码器初始化基于 Whisper-large-v3 模型（Radford et al., 2023）。"
      },
      {
       "id": "s-2-3-2",
       "original": "To preprocess the audio data, we resamples it to a frequency of 16kHz and converts the raw waveform into 128-channel mel-spectrogram using a window size of 25ms and a hop size of 10ms.",
       "zh": "为了预处理音频数据，我们将其重采样到 16kHz 的频率，并使用 25ms 的窗长与 10ms 的帧移把原始波形转换成 128 通道的 Mel 频谱图。"
      },
      {
       "id": "s-2-3-3",
       "original": "Additionally, a pooling layer with a stride of two is incorporated to reduce the length of the audio representation.",
       "zh": "此外，还加入了一个步长为 2 的池化层，以缩短音频表示的长度。"
      },
      {
       "id": "s-2-3-4",
       "original": "As a result, each frame of the encoder output approximately corresponds to a 40ms segment of the original audio signal.",
       "zh": "因此，编码器输出的每一帧大致对应原始音频信号中 40ms 的片段。"
      },
      {
       "id": "s-2-3-5",
       "original": "Qwen2-Audio still incorporates the large language model Qwen-7B (Bai et al., 2023) as its foundational component.",
       "zh": "Qwen2-Audio 仍然采用大语言模型 Qwen-7B（Bai et al., 2023）作为其基础组件。"
      },
      {
       "id": "s-2-3-6",
       "original": "The total parameters of Qwen2-Audio is 8.2B parameters.",
       "zh": "Qwen2-Audio 的总参数量为 8.2B。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-pre-training",
   "num": null,
   "level": 2,
   "page": 3,
   "title": {
    "original": "Pre-training",
    "zh": "预训练"
   },
   "blocks": [
    {
     "id": "p-pre-training-1",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-pre-training-1-1",
       "original": "At the pre-training stage, we replace the hierarchical tags (Chu et al., 2023) with the natural language prompts.",
       "zh": "在预训练阶段，我们用自然语言提示替换了层级标签（Chu et al., 2023）。"
      },
      {
       "id": "s-pre-training-1-2",
       "original": "As shown in Figure 2.",
       "zh": "如 Figure 2 所示。"
      },
      {
       "id": "s-pre-training-1-3",
       "original": "We find that using language prompts can improve better generalization ability and better instruction following ability.",
       "zh": "我们发现，使用自然语言提示可以带来更好的泛化能力与更好的指令遵循能力。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-supervised-fine-tuning",
   "num": null,
   "level": 2,
   "page": 3,
   "title": {
    "original": "Supervised Fine-tuning",
    "zh": "监督微调"
   },
   "blocks": [
    {
     "id": "p-supervised-fine-tuning-1",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-supervised-fine-tuning-1-1",
       "original": "The thorough pretraining of Qwen2-Audio has equipped the model with a comprehensive understanding of audio content.",
       "zh": "Qwen2-Audio 的充分预训练使模型具备了对音频内容的全面理解。"
      },
      {
       "id": "s-supervised-fine-tuning-1-2",
       "original": "Building upon this, we employ instruction-based fine-tuning",
       "zh": "在此基础上，我们采用基于指令的微调技术……"
      }
     ]
    },
    {
     "id": "fig-supervised-fine-tuning-1",
     "type": "figure_caption",
     "page": 4,
     "original": "Figure 3: Statistics (hours) of pre-training dataset.",
     "zh": "Figure 3：预训练数据集的统计（小时数）。"
    },
    {
     "id": "p-supervised-fine-tuning-2",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-supervised-fine-tuning-2-1",
       "original": "techniques to improve the ability of the model to align with human intent, resulting in an interactive chat model.",
       "zh": "……来提升模型对齐人类意图的能力，最终得到一个可交互的聊天模型。"
      },
      {
       "id": "s-supervised-fine-tuning-2-2",
       "original": "Our prelimilary study emphasizes the critical influence of the quality and complexity of SFT data on the model’s performance.",
       "zh": "我们的初步研究强调了 SFT 数据的质量与复杂度对模型表现的关键影响。"
      },
      {
       "id": "s-supervised-fine-tuning-2-3",
       "original": "Accordingly, a meticulously curated set of high-quality SFT data was collected, with rigorous quality control procedures implemented.",
       "zh": "相应地，我们收集了一套精心策划的高质量 SFT 数据，并实施了严格的质量控制流程。"
      }
     ]
    },
    {
     "id": "p-supervised-fine-tuning-3",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-supervised-fine-tuning-3-1",
       "original": "We consider two distinct modes for human interactions:",
       "zh": "我们考虑了两种不同的人机交互模式："
      }
     ]
    },
    {
     "id": "p-supervised-fine-tuning-4",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-supervised-fine-tuning-4-1",
       "original": "• Audio Analysis: In the audio analysis mode, users are afforded the flexibility to have Qwen2-Audio analyze a diverse array of audio.",
       "zh": "• 音频分析：在音频分析模式下，用户可以灵活地让 Qwen2-Audio 分析多种多样的音频。"
      },
      {
       "id": "s-supervised-fine-tuning-4-2",
       "original": "User instructions can be given either through audio or text.",
       "zh": "用户指令既可以通过音频也可以通过文本给出。"
      }
     ]
    },
    {
     "id": "p-supervised-fine-tuning-5",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-supervised-fine-tuning-5-1",
       "original": "This mode is often used for offline analysis of audio files.",
       "zh": "这种模式常用于对音频文件进行离线分析。"
      }
     ]
    },
    {
     "id": "p-supervised-fine-tuning-6",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-supervised-fine-tuning-6-1",
       "original": "• Voice Chat: In the voice chat mode, users are encouraged to engage in voice conversations with Qwen2-Audio, asking a wide range of questions.",
       "zh": "• 语音聊天：在语音聊天模式下，鼓励用户与 Qwen2-Audio 进行语音对话，提出各种各样的问题。"
      },
      {
       "id": "s-supervised-fine-tuning-6-2",
       "original": "Please feel free to consider it your voice chat assistant.",
       "zh": "你完全可以把它当作自己的语音聊天助手。"
      }
     ]
    },
    {
     "id": "p-supervised-fine-tuning-7",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-supervised-fine-tuning-7-1",
       "original": "This mode is often used for online interaction with LALMs.",
       "zh": "这种模式常用于与 LALM 进行在线交互。"
      }
     ]
    },
    {
     "id": "p-supervised-fine-tuning-8",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-supervised-fine-tuning-8-1",
       "original": "For consistency and model uniformity, both interaction modes were jointly trained, thus users will not experience mode differentiation during use, nor is it necessary to switch between different modes using separate system prompts.",
       "zh": "为保持一致性与模型的统一性，两种交互模式被联合训练，因此用户在使用过程中不会感受到模式之分，也无需通过各自的系统提示在不同模式之间切换。"
      },
      {
       "id": "s-supervised-fine-tuning-8-2",
       "original": "The two modes are seamlessly integrated in actual use.",
       "zh": "两种模式在实际使用中是无缝融合的。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-direct-preference-optimization",
   "num": null,
   "level": 2,
   "page": 4,
   "title": {
    "original": "Direct Preference Optimization",
    "zh": "直接偏好优化"
   },
   "blocks": [
    {
     "id": "p-direct-preference-optimization-1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-direct-preference-optimization-1-1",
       "original": "We employ DPO (Rafailov et al., 2024) to further optimize models to follow human preferences.",
       "zh": "我们采用 DPO（Rafailov et al., 2024）来进一步优化模型，使其遵循人类偏好。"
      },
      {
       "id": "s-direct-preference-optimization-1-2",
       "original": "By obtaining the dataset D with the triplet data (x, yw, yl), where x is the input sequence with input audio, and yw and yl are the human-annotated good and bad responses respectively, we optimize the model Pθ as follows: log σ β log Pθ(yw | x)",
       "zh": "给定由三元组数据 (x, yw, yl) 构成的数据集 D，其中 x 是包含输入音频的输入序列，yw 和 yl 分别是人工标注的好回答与坏回答，我们按下式优化模型 Pθ：log σ β log Pθ(yw | x)……（此处原文公式被页内排版截断，完整形式见下方公式 (2)）。"
      }
     ]
    },
    {
     "id": "eq-direct-preference-optimization-1",
     "type": "equation",
     "page": 4,
     "original": "LDPO(Pθ; Pref) = −E(x,yw,yl)∼D"
    },
    {
     "id": "p-direct-preference-optimization-2",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-direct-preference-optimization-2-1",
       "original": ", (2)",
       "zh": "，(2)"
      }
     ]
    },
    {
     "id": "eq-direct-preference-optimization-2",
     "type": "equation",
     "page": 4,
     "original": "Pref(yw | x) −β log Pθ(yl | x)"
    },
    {
     "id": "eq-direct-preference-optimization-3",
     "type": "equation",
     "page": 4,
     "original": "Pref(yl | x)"
    },
    {
     "id": "p-direct-preference-optimization-3",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-direct-preference-optimization-3-1",
       "original": "where Pref denotes the reference model initialized with Pθ, σ represents sigmoid function and β is a hyperparameter.",
       "zh": "其中 Pref 表示以 Pθ 初始化的参考模型，σ 表示 sigmoid 函数，β 是一个超参数。"
      },
      {
       "id": "s-direct-preference-optimization-3-2",
       "original": "Figure 2 illustrates the three-stage training process of Qwen2-Audio.",
       "zh": "Figure 2 展示了 Qwen2-Audio 的三阶段训练流程。"
      }
     ]
    },
    {
     "id": "p-direct-preference-optimization-4",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-direct-preference-optimization-4-1",
       "original": "1https://github.com/mjpost/sacrebleu",
       "zh": "（脚注）1https://github.com/mjpost/sacrebleu"
      }
     ]
    },
    {
     "id": "tab-direct-preference-optimization-1",
     "type": "table_caption",
     "page": 5,
     "original": "Table 1: Summary of Evaluation Benchmarks for Qwen2-Audio.",
     "zh": "Table 1：Qwen2-Audio 评测基准汇总。"
    },
    {
     "id": "p-direct-preference-optimization-5",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-direct-preference-optimization-5-1",
       "original": "Task Description Dataset Split Metric Fleurs (Conneau et al., 2022) WER Aishell2 (Du et al., 2018) Librispeech (Panayotov et al., 2015) Common Voice (Ardila et al., 2020) ASR Automatic Speech Recognition S2TT Speech-to-Text Translation CoVoST2 (Wang et al., 2020) BLEU 1 (Papineni et al., 2002) SER Speech Emotion Recognition Meld (Poria et al., 2019) ACC VSC Vocal Sound Classification VocalSound (Gong et al., 2022) ACC Fisher (Cieri et al., 2004) SpokenWOZ (Si et al., 2023) IEMOCAP (Si et al., 2023) Common voice (Ardila et al., 2020) Chat-Benchmark-Speech AIR-Bench (Yang et al., 2024) Chat-Benchmark-Sound Clotho (Drossos et al., 2020) Chat-Benchmark-Music MusicCaps (Agostinelli et al., 2023) Chat-Benchmark-Mixed-Audio Common voice (Ardila et al., 2020) AudioCaps (Kim et al., 2019) MusicCaps (Agostinelli et al., 2023)",
       "zh": "（Table 1 表格正文抽取残留，含各任务描述、数据集、划分与指标：）Fleurs (Conneau et al., 2022)，WER；Aishell2 (Du et al., 2018)；Librispeech (Panayotov et al., 2015)；Common Voice (Ardila et al., 2020)；任务为 ASR 自动语音识别；S2TT 语音到文本翻译使用 CoVoST2 (Wang et al., 2020)，指标 BLEU 1 (Papineni et al., 2002)；SER 语音情感识别使用 Meld (Poria et al., 2019)，指标 ACC；VSC 人声分类使用 VocalSound (Gong et al., 2022)，指标 ACC；聊天基准方面，Speech 使用 Fisher (Cieri et al., 2004)、SpokenWOZ (Si et al., 2023)、IEMOCAP (Si et al., 2023)、Common voice (Ardila et al., 2020)；Chat-Benchmark-Speech 归属 AIR-Bench (Yang et al., 2024)；Chat-Benchmark-Sound 使用 Clotho (Drossos et al., 2020)；Chat-Benchmark-Music 使用 MusicCaps (Agostinelli et al., 2023)；Chat-Benchmark-Mixed-Audio 使用 Common voice (Ardila et al., 2020)、AudioCaps (Kim et al., 2019)、MusicCaps (Agostinelli et al., 2023)。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-3",
   "num": "3",
   "level": 1,
   "page": 5,
   "title": {
    "original": "Experiments",
    "zh": "实验"
   },
   "blocks": []
  },
  {
   "id": "sec-3-1",
   "num": "3.1",
   "level": 2,
   "page": 5,
   "title": {
    "original": "Evaluation",
    "zh": "评测"
   },
   "blocks": [
    {
     "id": "p-3-1-1",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-3-1-1-1",
       "original": "In practice, we have found that many previous test datasets are highly limited and cannot adequately reflect performance in real-world scenarios, such as some SLU (Spoken Language Understanding) and SER (Speech Emotion Recognition) datasets.",
       "zh": "在实践中我们发现，许多以往的测试数据集局限性很大，无法充分反映真实场景下的表现，例如一些 SLU（口语理解）和 SER（语音情感识别）数据集。"
      },
      {
       "id": "s-3-1-1-2",
       "original": "Therefore, we mainly evaluated performance directly on AIR-Bench.",
       "zh": "因此，我们主要在 AIR-Bench 上直接评测表现。"
      },
      {
       "id": "s-3-1-1-3",
       "original": "We discovered that the scores from AIR-Bench align more closely with the actual user interaction experience.",
       "zh": "我们发现，AIR-Bench 的分数与实际的用户交互体验更为吻合。"
      },
      {
       "id": "s-3-1-1-4",
       "original": "Meanwhile, in order to assess the universal understanding capabilities of Qwen2-Audio, as shown in Table 1, we still perform a comprehensive evaluation that encompasses various tasks, namely Automatic Speech Recognition (ASR), Speech-to-Text Translation (S2TT), Speech Emotion Recognition (SER), Vocal Sound Classification (VSC).",
       "zh": "同时，为了评估 Qwen2-Audio 的通用理解能力，如 Table 1 所示，我们仍进行了一套涵盖多种任务的综合评测，即自动语音识别（ASR）、语音到文本翻译（S2TT）、语音情感识别（SER）和人声分类（VSC）。"
      },
      {
       "id": "s-3-1-1-5",
       "original": "The evaluation is conducted across 13 datasets.",
       "zh": "评测在 13 个数据集上进行。"
      },
      {
       "id": "s-3-1-1-6",
       "original": "The evaluation datasets are rigorously excluded from the training data to avoid data leakage.",
       "zh": "评测数据集被严格地从训练数据中排除，以避免数据泄漏。"
      },
      {
       "id": "s-3-1-1-7",
       "original": "The models we compare include open-source models and callable APIs, such as Gemini.",
       "zh": "我们对比的模型包括开源模型和可调用的 API，例如 Gemini。"
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
    "original": "Main Results",
    "zh": "主要结果"
   },
   "blocks": [
    {
     "id": "p-3-2-1",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-3-2-1-1",
       "original": "In this section, we present a comprehensive evaluation of the Qwen2-Audio model, assessing its performance across various tasks without any task-specific fine-tuning.",
       "zh": "本节我们对 Qwen2-Audio 模型给出全面评测，在不做任何任务特定微调的情况下评估其在各项任务上的表现。"
      },
      {
       "id": "s-3-2-1-2",
       "original": "We begin by examining its English Automatic Speech Recognition (ASR) results, as depicted in Table 2, where Qwen2-Audio exhibits superior performance compared to previous multi-task learning models.",
       "zh": "我们首先考察其英语自动语音识别（ASR）结果，如 Table 2 所示，Qwen2-Audio 相比以往的多任务学习模型展现出更优的表现。"
      },
      {
       "id": "s-3-2-1-3",
       "original": "Specifically, it achieves a 1.6% and 3.6% WER on the librispeech test-clean and test-other datasets, respectively.",
       "zh": "具体而言，它在 Librispeech test-clean 和 test-other 数据集上分别取得了 1.6% 与 3.6% 的 WER。"
      },
      {
       "id": "s-3-2-1-4",
       "original": "Compared with Whisper-large-v3 on Fleurs zh subset, we achieve better results than Whisper-large-v3.",
       "zh": "与 Whisper-large-v3 在 Fleurs 中文子集上相比，我们取得了比 Whisper-large-v3 更好的结果。"
      },
      {
       "id": "s-3-2-1-5",
       "original": "One point to note is that Qwen2-Audio is not evaluated in a zero-shot manner on the Common Voice 15 dataset, whereas Whisper’s results are obtained in a zero-shot fashion.",
       "zh": "需要注意的一点是，Qwen2-Audio 在 Common Voice 15 数据集上并非以零样本方式评测，而 Whisper 的结果是以零样本方式取得的。"
      },
      {
       "id": "s-3-2-1-6",
       "original": "However, on the Fleurs dataset, both Qwen2-Audio and Whisper are evaluated in a zero-shot manner.",
       "zh": "不过，在 Fleurs 数据集上，Qwen2-Audio 与 Whisper 都是在零样本方式下评测的。"
      },
      {
       "id": "s-3-2-1-7",
       "original": "Furthermore, we evaluate Qwen2-Audio’s speech translation performance on the CoVoST2 dataset.",
       "zh": "此外，我们在 CoVoST2 数据集上评估了 Qwen2-Audio 的语音翻译表现。"
      },
      {
       "id": "s-3-2-1-8",
       "original": "The results reveal that Qwen2-Audio outperforms the baselines by a substantial margin across all seven translation directions.",
       "zh": "结果显示，Qwen2-Audio 在全部七个翻译方向上以显著优势超过基线。"
      },
      {
       "id": "s-3-2-1-9",
       "original": "For sound, we analyze the performance of Qwen2-Audio on SER, and VSC, as summarized in Table 2.",
       "zh": "对于声音方面，我们分析了 Qwen2-Audio 在 SER 与 VSC 上的表现，汇总于 Table 2。"
      },
      {
       "id": "s-3-2-1-10",
       "original": "Across these tasks, Qwen2-Audio consistently outperforms the baselines by a significant margin.",
       "zh": "在这些任务上，Qwen2-Audio 始终以明显优势超过基线。"
      }
     ]
    },
    {
     "id": "p-3-2-2",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-3-2-2-1",
       "original": "Lastly, to objectively evaluate the chat capabilities of Qwen2-Audio, we measured its performance on the",
       "zh": "最后，为客观评估 Qwen2-Audio 的聊天能力，我们在 AIR-Bench（Yang et al., 2024）的聊天基准上测量了其表现。"
      }
     ]
    },
    {
     "id": "tab-3-2-1",
     "type": "table_caption",
     "page": 6,
     "original": "Table 2: The results of Automatic Speech Recognition (ASR), Speech-to-Text Translation (S2TT), Speech Emotion Recognition (SER), Vocal Sound Classification (VSC), and AIR-Bench chat benchmark. Note that for Qwen2-Audio, the results for Fleurs are zero-shot, whereas the results for Common Voice are not zero-shot.",
     "zh": "Table 2：自动语音识别（ASR）、语音到文本翻译（S2TT）、语音情感识别（SER）、人声分类（VSC）以及 AIR-Bench 聊天基准的结果。注意：对 Qwen2-Audio 而言，Fleurs 的结果是零样本的，而 Common Voice 的结果不是零样本的。"
    },
    {
     "id": "p-3-2-3",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-3-2-3-1",
       "original": "Task Dataset Model Performance Metrics Results SpeechT5 (Ao et al., 2021) SpeechNet (Chen et al., 2021) - | - | 30.7 | - SLM-FT (Wang et al., 2023b) - | - | 2.6 | 5.0 SALMONN (Tang et al., 2024) - | - | 2.1 | 4.9 SpeechVerse (Das et al., 2024) - | - | 2.1 | 4.4 Librispeech dev-clean | dev-other | test-clean | test-other Common Voice 15 en | zh | yue | fr Whisper-large-v3 (Radford et al., 2023) ASR Fleurs zh Whisper-large-v3 (Radford et al., 2023) 7.7 7.5 MMSpeech-base (Zhou et al., 2022) Paraformer-large (Gao et al., 2023) - | 2.9 | - Aishell2 Mic | iOS | Android SALMONN (Tang et al., 2024) 18.6 | - | 33.1 | - SpeechLLaMA (Wu et al., 2023a) - | 27.1 | - | 12.3 BLSP (Wang et al., 2023a) 14.1 | - | - | - CoVoST2 en-de | de-en | en-zh | zh-en S2TT BLEU ↑ SpeechLLaMA (Wu et al., 2023a) BLEU ↑ CoVoST2 es-en | fr-en | it-en | SER Meld WavLM-large (Chen et al., 2022) ACC ↑ 0.542 0.557 0.553 CLAP (Elizalde et al., 2022) 0.4945 Pengi (Deshmukh et al., 2023) 0.6035 0.9289 0.9392 VSC VocalSound ACC ↑ SALMONN (Tang et al., 2024) BLSP (Wang et al., 2023a) Pandagpt (Su et al., 2023) Macaw-LLM (Lyu et al., 2023) SpeechGPT (Zhang et al., 2023) Next-gpt (Wu et al., 2023b) Gemini-1.5-pro (Reid et al., 2024) Chat Benchmark Speech | Sound | Music | Mixed-Audio AIR-Bench (Yang et al., 2024) GPT-4 ↑ chat benchmark of the AIR-Bench (Yang et al., 2024).",
       "zh": "（Table 2 表格正文抽取残留，含各模型与任务的数值散块：）任务、数据集、模型、性能指标与结果；SpeechT5 (Ao et al., 2021)、SpeechNet (Chen et al., 2021)（数值如 30.7）；SLM-FT (Wang et al., 2023b)（2.6 | 5.0）；SALMONN (Tang et al., 2024)（2.1 | 4.9）；SpeechVerse (Das et al., 2024)（2.1 | 4.4）；Librispeech dev-clean | dev-other | test-clean | test-other；Common Voice 15 en | zh | yue | fr；Whisper-large-v3 (Radford et al., 2023)；ASR Fleurs zh：Whisper-large-v3 (Radford et al., 2023) 7.7、7.5；MMSpeech-base (Zhou et al., 2022)、Paraformer-large (Gao et al., 2023)（2.9）；Aishell2 Mic | iOS | Android；SALMONN (18.6 | 33.1)；SpeechLLaMA (Wu et al., 2023a)（27.1 | 12.3）；BLSP (Wang et al., 2023a)（14.1）；CoVoST2 en-de | de-en | en-zh | zh-en；S2TT BLEU ↑：SpeechLLaMA；CoVoST2 es-en | fr-en | it-en；SER Meld：WavLM-large (Chen et al., 2022) ACC ↑ 0.542、0.557、0.553；CLAP (Elizalde et al., 2022) 0.4945；Pengi (Deshmukh et al., 2023) 0.6035、0.9289、0.9392；VSC VocalSound ACC ↑：SALMONN、BLSP、Pandagpt (Su et al., 2023)、Macaw-LLM (Lyu et al., 2023)、SpeechGPT (Zhang et al., 2023)、Next-gpt (Wu et al., 2023b)、Gemini-1.5-pro (Reid et al., 2024)；聊天基准 Speech | Sound | Music | Mixed-Audio：AIR-Bench（GPT-4 打分 ↑）。"
      },
      {
       "id": "s-3-2-3-2",
       "original": "Note that since Gemini-1.5 (Reid et al., 2024)2 cannot correctly return some test samples due to its SAFETY reasons during testing, the number of samples of Gemini1.5 on AIR-Bench-chat has been reduced by about 1/5.",
       "zh": "请注意，由于 Gemini-1.5（Reid et al., 2024）在测试期间因安全原因无法正确返回部分测试样本（见脚注 2），Gemini-1.5 在 AIR-Bench-chat 上的样本数减少了约 1/5。"
      },
      {
       "id": "s-3-2-3-3",
       "original": "As shown in table 2, Qwen2-Audio demonstrates state-of-the-art (SOTA) instruction-following capabilities across speech, sound music and mixed-Audio subsets.",
       "zh": "如 Table 2 所示，Qwen2-Audio 在语音、声音、音乐和混合音频子集上展现出 SOTA 的指令遵循能力。"
      },
      {
       "id": "s-3-2-3-4",
       "original": "It shows substantial improvements compared to Qwen-Audio and significantly outperforms other LALMs.",
       "zh": "相比 Qwen-Audio 它有显著提升，并且明显超过其他 LALM。"
      }
     ]
    },
    {
     "id": "p-3-2-4",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-3-2-4-1",
       "original": "2https://console.cloud.google.com/vertex-ai/generative/multimodal/create",
       "zh": "（脚注）2https://console.cloud.google.com/vertex-ai/generative/multimodal/create"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-4",
   "num": "4",
   "level": 1,
   "page": 7,
   "title": {
    "original": "Cases",
    "zh": "案例"
   },
   "blocks": [
    {
     "id": "p-4-1",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-4-1-1",
       "original": "Here, we present a part of cases to illustrate Qwen2-Audio’s audio-based interaction capabilities.",
       "zh": "这里展示一部分案例，用以说明 Qwen2-Audio 基于音频的交互能力。"
      },
      {
       "id": "s-4-1-2",
       "original": "For more impressive examples, please refer to https://github.com/QwenLM/Qwen2-Audio.",
       "zh": "更多令人印象深刻的示例，请参见 https://github.com/QwenLM/Qwen2-Audio。"
      }
     ]
    },
    {
     "id": "p-4-2",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-4-2-1",
       "original": "Yes, the speaker is female and in her twenties.",
       "zh": "（模型回答：）是的，说话人是女性，二十多岁。"
      }
     ]
    },
    {
     "id": "p-4-3",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-4-3-1",
       "original": "“I have an exam coming up, but I'm not well prepared.",
       "zh": "（用户语音：）「我马上有一场考试，但我准备得不太好。"
      },
      {
       "id": "s-4-3-2",
       "original": "I can't sleep well every night.”",
       "zh": "我每天晚上都睡不好。」"
      }
     ]
    },
    {
     "id": "p-4-4",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-4-4-1",
       "original": "“I heard that you can understand what people say and even know their age and gender.",
       "zh": "（用户语音：）「我听说你能听懂人们说的话，甚至能知道他们的年龄和性别。"
      },
      {
       "id": "s-4-4-2",
       "original": "So, can you guess my age and gender?”",
       "zh": "那么，你能猜猜我的年龄和性别吗？」"
      }
     ]
    },
    {
     "id": "p-4-5",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-4-5-1",
       "original": "I'm sorry to hear that you're feeling stressed about your exam.",
       "zh": "（模型回答：）很抱歉听到你因考试而感到焦虑。"
      },
      {
       "id": "s-4-5-2",
       "original": "It's completely normal to feel anxious when you're preparing for an important test.",
       "zh": "在准备重要考试时感到紧张是完全正常的。"
      },
      {
       "id": "s-4-5-3",
       "original": "Here are some tips that might help you:",
       "zh": "这里有一些可能对你有帮助的建议："
      }
     ]
    },
    {
     "id": "p-4-6",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-4-6-1",
       "original": "Remember, it's okay if you're not feeling well-prepared.",
       "zh": "请记住，感觉自己没有充分准备好是正常的。"
      },
      {
       "id": "s-4-6-2",
       "original": "Just do your best, and trust yourself.",
       "zh": "尽你最大的努力，相信自己。"
      },
      {
       "id": "s-4-6-3",
       "original": "Good luck with your exam!",
       "zh": "祝你考试顺利！"
      }
     ]
    },
    {
     "id": "p-4-7",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-4-7-1",
       "original": "1.",
       "zh": "1."
      },
      {
       "id": "s-4-7-2",
       "original": "Start studying early: Don't leave everything until the last minute.",
       "zh": "尽早开始学习：不要把所有事情都拖到最后关头。"
      }
     ]
    },
    {
     "id": "p-4-8",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-4-8-1",
       "original": "Break up your study sessions into smaller chunks of time, and try to stick to a regular schedule. 2.",
       "zh": "把学习时间切分成较小的时间段，并尽量坚持规律的日程。2."
      },
      {
       "id": "s-4-8-2",
       "original": "Find a quiet place to study: A quiet environment can help you concentrate better.",
       "zh": "找一个安静的地方学习：安静的环境能帮助你更好地集中注意力。"
      },
      {
       "id": "s-4-8-3",
       "original": "If possible, ﬁnd a library or a study room where you can work without distractions. 3.",
       "zh": "如果可能，找一间图书馆或自习室，在那里你可以不受干扰地学习。3."
      },
      {
       "id": "s-4-8-4",
       "original": "Take breaks: It's important to take breaks during your study sessions.",
       "zh": "适当休息：在学习过程中安排休息非常重要。"
      }
     ]
    },
    {
     "id": "p-4-9",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-4-9-1",
       "original": "This will give your brain a chance to rest and recharge.",
       "zh": "这会让你的大脑有机会休息和恢复精力。"
      },
      {
       "id": "s-4-9-2",
       "original": "Try taking short breaks every hour or so. 4.",
       "zh": "试着每隔一小时左右短暂休息一下。4."
      },
      {
       "id": "s-4-9-3",
       "original": "Get enough sleep: Lack of sleep can make it harder to focus and retain information.",
       "zh": "保证充足睡眠：睡眠不足会让集中注意力和记住信息变得更困难。"
      },
      {
       "id": "s-4-9-4",
       "original": "Make sure you're getting enough sleep each night, ideally around 7-8 hours. 5.",
       "zh": "确保每晚获得足够睡眠，理想情况下约 7-8 小时。5."
      },
      {
       "id": "s-4-9-5",
       "original": "Practice relaxation techniques: Deep breathing exercises, meditation, or yoga can all help you relax and reduce stress.",
       "zh": "练习放松技巧：深呼吸练习、冥想或瑜伽都能帮助你放松、减轻压力。"
      }
     ]
    },
    {
     "id": "fig-4-1",
     "type": "figure_caption",
     "page": 7,
     "original": "Figure 4: Example showing Qwen2-Audio’s capability in free chat around speech.",
     "zh": "Figure 4：示例展示 Qwen2-Audio 围绕语音进行自由对话的能力。"
    }
   ]
  },
  {
   "id": "sec-5",
   "num": "5",
   "level": 1,
   "page": 7,
   "title": {
    "original": "Conclusion",
    "zh": "结论"
   },
   "blocks": [
    {
     "id": "p-5-1",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-5-1-1",
       "original": "In this paper, we present Qwen2-Audio, which builds upon Qwen-Audio’s capability to analyze various types of audio while also being endowed with voice interaction abilities.",
       "zh": "在本文中，我们提出了 Qwen2-Audio，它在 Qwen-Audio 分析多种音频类型的能力之上，又被赋予了语音交互能力。"
      },
      {
       "id": "s-5-1-2",
       "original": "During the pre-training stage, we utilized natural language prompts for different data and tasks and have further expanded the data volume.",
       "zh": "在预训练阶段，我们针对不同的数据与任务使用自然语言提示，并进一步扩大了数据规模。"
      },
      {
       "id": "s-5-1-3",
       "original": "In the SFT phase, we enhanced Qwen2-Audio’s alignment with human interaction by increasing the quantity, quality, and complexity of SFT data, thereby enabling seamless voice and text interactions.",
       "zh": "在 SFT 阶段，我们通过提升 SFT 数据的数量、质量与复杂度，增强了 Qwen2-Audio 与人类交互意图的对齐，从而实现无缝的语音与文本交互。"
      },
      {
       "id": "s-5-1-4",
       "original": "Additionally, we improved Qwen2-Audio’s response quality through the DPO stage.",
       "zh": "此外，我们通过 DPO 阶段改善了 Qwen2-Audio 的回答质量。"
      },
      {
       "id": "s-5-1-5",
       "original": "Objective metrics tested on diverse benchmarks demonstrate Qwen2-Audio’s proficiency in audio understanding and dialogue capabilities.",
       "zh": "在多个基准上测得的客观指标展示了 Qwen2-Audio 在音频理解与对话能力上的熟练程度。"
      },
      {
       "id": "s-5-1-6",
       "original": "The cases presented within the paper also illustrate Qwen2-Audio’s fluent and flexible voice interaction capability.",
       "zh": "文中给出的案例也展示了 Qwen2-Audio 流畅而灵活的语音交互能力。"
      }
     ]
    },
    {
     "id": "p-5-2",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-5-2-1",
       "original": "每个⼈都希望被欣赏，所以如果你欣赏某⼈，不要把它保密。 “Translate it into German.”",
       "zh": "（用户语音内容为中文：）「每个人都希望被欣赏，所以如果你欣赏某人，不要把它保密。」（随后用户指令：）「把它翻译成德语。」"
      }
     ]
    },
    {
     "id": "p-5-3",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-5-3-1",
       "original": "“Help me translate the sentence into Chinese.",
       "zh": "（轮次重组后的示例文本：）「帮我把这个句子翻译成中文。"
      },
      {
       "id": "s-5-3-2",
       "original": "Everyone wants to be appreciated, so if you appreciate someone, don't keep it a secret.”",
       "zh": "Everyone wants to be appreciated, so if you appreciate someone, don't keep it a secret.（每个人都希望被欣赏，所以如果你欣赏某人，不要把它保密。）」"
      }
     ]
    },
    {
     "id": "p-5-4",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-5-4-1",
       "original": "Jeder möchte geschätzt werden, also wenn du jemanden schätzt, lass es nicht als Geheimnis verbergen.",
       "zh": "（模型输出的德语译文：）Jeder möchte geschätzt werden, also wenn du jemanden schätzt, lass es nicht als Geheimnis verbergen.（每个人都希望被欣赏，所以如果你欣赏某人，不要把它当作秘密藏起来。）"
      }
     ]
    },
    {
     "id": "p-5-5",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-5-5-1",
       "original": "“How about into French?”",
       "zh": "（用户追问：）「那法语呢？」"
      }
     ]
    },
    {
     "id": "p-5-6",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-5-6-1",
       "original": "Chacun veut être apprecié, alors si tu apprécies quelqu'un, ne le gardes pas secret.",
       "zh": "（模型输出的法语译文：）Chacun veut être apprecié, alors si tu apprécies quelqu'un, ne le gardes pas secret.（每个人都希望被欣赏，所以如果你欣赏某人，不要把它保密。）"
      }
     ]
    },
    {
     "id": "p-5-7",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-5-7-1",
       "original": "“给我⽣成⼀些类似这句话意思的，其他说法的句⼦，⽤中⽂⽣成。” 1. 每个⼈都喜欢被赞美，所以如果你喜欢⼀个⼈，不要隐藏你的赞赏。 2. 所有⼈都渴望得到认可，因此如果你欣赏某⼈，请不要独⾃享⽤这种感觉。 3. 欣赏他⼈是⼀种美德，所以不要让别⼈知道你对他们的赞赏是秘密的。 4. ⼈们都希望受到赞扬，所以如果你欣赏某⼈，不妨公开表达出来。 5. 如果你喜欢某⼈，不要犹豫告诉他们，因为每个⼈都有权利享受他⼈的赞赏。",
       "zh": "（用户指令：）「给我生成一些类似这句话意思的、其他说法的句子，用中文生成。」（模型输出：）1. 每个人都喜欢被赞美，所以如果你喜欢一个人，不要隐藏你的赞赏。2. 所有人都渴望得到认可，因此如果你欣赏某人，请不要独自享用这种感觉。3. 欣赏他人是一种美德，所以不要让别人对你的赞赏一无所知。4. 人们都希望受到赞扬，所以如果你欣赏某人，不妨公开表达出来。5. 如果你喜欢一个人，不要犹豫地告诉他们，因为每个人都有权利享受他人的赞赏。"
      }
     ]
    },
    {
     "id": "fig-5-1",
     "type": "figure_caption",
     "page": 8,
     "original": "Figure 5: Example showing Qwen2-Audio’s capability in free chat around speech.",
     "zh": "Figure 5：示例展示 Qwen2-Audio 围绕语音进行自由对话的能力。"
    },
    {
     "id": "p-5-8",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-5-8-1",
       "original": "Use headphones to block out external noise and ﬁnd a quiet place to study.",
       "zh": "（模型回答续：）用耳机隔绝外界噪声，并找一个安静的地方学习。"
      },
      {
       "id": "s-5-8-2",
       "original": "Prioritize your tasks and set realistic goals for yourself.",
       "zh": "为任务排好优先级，为自己设定现实可行的目标。"
      },
      {
       "id": "s-5-8-3",
       "original": "Use active learning techniques such as summarizing, note-taking, and quizzing to help you retain information.",
       "zh": "使用主动学习技巧，如总结、记笔记和自测，帮助你记住知识。"
      },
      {
       "id": "s-5-8-4",
       "original": "Take breaks and practice self-care to avoid burnout.",
       "zh": "适时休息并做好自我关照，以避免过度疲劳（burnout）。"
      }
     ]
    },
    {
     "id": "p-5-9",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-5-9-1",
       "original": "（with renovation noise）“In this situation, can I negotiate with them?”",
       "zh": "（伴随装修噪声的语音：）「这种情况下，我可以和他们协商吗？」"
      }
     ]
    },
    {
     "id": "p-5-10",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-5-10-1",
       "original": "（with renovation noise）“Oh no, how can I study quiet like this?”",
       "zh": "（伴随装修噪声的语音：）「天哪，这样我怎么安静学习啊？」"
      }
     ]
    },
    {
     "id": "p-5-11",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-5-11-1",
       "original": "Yes, you can try negotiating with them to reach a mutually beneﬁcial agreement.",
       "zh": "（模型回答：）可以，你可以尝试和他们协商，达成一个双方都有益的协议。"
      },
      {
       "id": "s-5-11-2",
       "original": "You could also consider seeking help from a mediator or professional negotiator if needed.",
       "zh": "如有需要，你也可以考虑寻求调解人或专业谈判者的帮助。"
      }
     ]
    },
    {
     "id": "p-5-12",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-5-12-1",
       "original": "因为这种场景让你感到放松和舒适，有助于提⾼睡眠质量。 （⾬声）“哎呀，真喜欢在这种场景下睡觉啊睡的真⾹，你能猜猜为什么我喜欢在这种场景 下睡觉吗？”",
       "zh": "（模型回答：）因为这种场景让你感到放松和舒适，有助于提高睡眠质量。（伴随雨声的语音：）「哎呀，真喜欢在这种场景下睡觉啊，睡得真香，你能猜猜为什么我喜欢在这种场景下睡觉吗？」"
      }
     ]
    },
    {
     "id": "fig-5-2",
     "type": "figure_caption",
     "page": 9,
     "original": "Figure 6: Example showing Qwen2-Audio’s capability in free chat around speech and nature sound.",
     "zh": "Figure 6：示例展示 Qwen2-Audio 围绕语音与自然声音进行自由对话的能力。"
    },
    {
     "id": "p-5-13",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-5-13-1",
       "original": "“Please transcribe the content of the next audio clip.” (Then a piece of audio is played) The original content of this audio is: 'Stop all the clocks, cut oﬀ the telephone, prevent the dog from barking, silence the pianos and with muﬄed drum bring out the coﬃn, let the mourners come.'",
       "zh": "（用户语音：）「请转写下一段音频的内容。」（随后播放一段音频）这段音频的原始内容是：「停止所有的时钟，切断电话线，阻止狗吠，让钢琴静默，随着低沉的鼓声抬出棺材，让哀悼者前来。」（出自 W. H. Auden 的 Funeral Blues）"
      }
     ]
    },
    {
     "id": "p-5-14",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-5-14-1",
       "original": "No less than 50 words and no more than 200 words, add scenes such as rain and thunder to the poem.",
       "zh": "（用户追加指令：）不少于 50 词、不超过 200 词，在诗中加入雨和雷等场景。"
      },
      {
       "id": "s-5-14-2",
       "original": "Finally, give the verses you created in lines.",
       "zh": "最后，把你创作的诗句按行给出。"
      }
     ]
    },
    {
     "id": "p-5-15",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-5-15-1",
       "original": "In the midst of an eerie stormy night, With raindrops falling heavy and bright, The world seemed to hush its voice, As winds howled through the darkened space.",
       "zh": "（模型创作的诗歌：）在一个诡异的暴风雨之夜，/ 雨点重重落下，明亮而密集，/ 世界仿佛屏住了声音，/ 狂风在黑暗的空间中呼啸。"
      },
      {
       "id": "s-5-15-2",
       "original": "Stop all the clocks, the time stood still, As the lightning ﬂashed through the sky, The telephone's ring was drowned out, By the roaring thunder that shook the ground.",
       "zh": "停止所有的时钟，时间凝固了，/ 闪电划过天空，/ 电话铃声被淹没，/ 被震动大地的滚滚雷声吞没。"
      },
      {
       "id": "s-5-15-3",
       "original": "Prevent the dog from barking, its cries were silenced, By the fear that gripped it in the night, Silence the pianos, their keys were muted, As the mournful sound of raindrops beat on wood.",
       "zh": "阻止狗吠，它的哀鸣被沉默，/ 被黑夜里攫住它的恐惧压制，/ 让钢琴静默，琴键都已喑哑，/ 只有雨滴敲打木头的哀伤声响。"
      },
      {
       "id": "s-5-15-4",
       "original": "With muﬄed drums, a slow march began, A solemn procession through the storm, The coﬃn was carried, heavy and solemn, Let the mourners come, to pay their ﬁnal respects.",
       "zh": "随着低沉的鼓声，缓慢的行进步伐开始，/ 一场庄重的队伍穿过风暴，/ 棺材被抬着，沉重而肃穆，/ 让哀悼者前来，致以最后的敬意。"
      },
      {
       "id": "s-5-15-5",
       "original": "As the storm slowly passed, the world emerged, A new day dawned, but memories lingered, Of the night when time stood still, And the mourners came, to say goodbye.",
       "zh": "当风暴缓缓过去，世界重新浮现，/ 新的一天破晓，但记忆仍萦绕，/ 那一夜时间凝固，/ 哀悼者前来，作最后的告别。"
      }
     ]
    },
    {
     "id": "fig-5-3",
     "type": "figure_caption",
     "page": 10,
     "original": "Figure 7: Example showing Qwen2-Audio’s capability in speech analysis.",
     "zh": "Figure 7：示例展示 Qwen2-Audio 在语音分析方面的能力。"
    },
    {
     "id": "p-5-16",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-5-16-1",
       "original": "What do you hear?",
       "zh": "（用户提问：）你听到了什么？"
      }
     ]
    },
    {
     "id": "p-5-17",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-5-17-1",
       "original": "I heard the sound of an alarm and a truck's air brake mixed with the noise of a heavy engine running and shifting gears.",
       "zh": "（模型回答：）我听到了警报声、卡车的气刹车声，混杂着一台重型发动机运转和换挡的噪声。"
      }
     ]
    },
    {
     "id": "p-5-18",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-5-18-1",
       "original": "Under what circumstances can you hear such sounds?",
       "zh": "（用户追问：）在什么场合下会听到这样的声音？"
      }
     ]
    },
    {
     "id": "p-5-19",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-5-19-1",
       "original": "These types of sounds might be commonly heard in industrial settings like construction sites or factories where machinery is operated, or during emergency situations like traﬃc accidents where sirens are triggered.",
       "zh": "（模型回答：）这类声音可能常见于工地或工厂等运转机械的工业环境，也可能出现在警笛被触发的紧急情况（如交通事故）中。"
      }
     ]
    },
    {
     "id": "p-5-20",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-5-20-1",
       "original": "“I am so scared!",
       "zh": "（用户语音：）「我好害怕！"
      },
      {
       "id": "s-5-20-2",
       "original": "What should I do?”",
       "zh": "我该怎么办？」"
      }
     ]
    },
    {
     "id": "p-5-21",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-5-21-1",
       "original": "It's understandable to feel scared under any situation that makes you feel uncomfortable.",
       "zh": "（模型回答：）在任何让你感到不适的情况下感到害怕都是可以理解的。"
      },
      {
       "id": "s-5-21-2",
       "original": "It's important to remember that it's okay to be scared.",
       "zh": "重要的是记住：害怕是正常的。"
      },
      {
       "id": "s-5-21-3",
       "original": "Here are some things you can do:",
       "zh": "以下是你可以做的一些事情："
      }
     ]
    },
    {
     "id": "p-5-22",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-5-22-1",
       "original": "1.",
       "zh": "1."
      },
      {
       "id": "s-5-22-2",
       "original": "Take deep breaths: Inhale deeply through your nose and exhale slowly through your mouth.",
       "zh": "深呼吸：用鼻子深吸气，再缓慢地用嘴呼出。"
      },
      {
       "id": "s-5-22-3",
       "original": "This can help calm your mind and body. 2.",
       "zh": "这可以帮助平复你的身心。2."
      },
      {
       "id": "s-5-22-4",
       "original": "Find a safe place: If possible, move to a safe location away from the source of the fear.",
       "zh": "找一个安全的地方：如果可能，转移到远离恐惧来源的安全位置。"
      },
      {
       "id": "s-5-22-5",
       "original": "If you're in a car, pull over to a parking lot or a safe spot on the side of the road. 3.",
       "zh": "如果你在开车，驶到停车场或路边安全地带停下。3."
      },
      {
       "id": "s-5-22-6",
       "original": "Stay informed: If you have access to information about the situation, stay informed but don't overdo it.",
       "zh": "保持知情：如果你能获取有关事态的信息，保持关注即可，但不要过度。"
      },
      {
       "id": "s-5-22-7",
       "original": "Too much information can create more anxiety. 4.",
       "zh": "过多的信息可能带来更多焦虑。4."
      },
      {
       "id": "s-5-22-8",
       "original": "Talk to someone: Talking to someone you trust can help you process your feelings and gain perspective.",
       "zh": "与他人交谈：与你信任的人交谈，能帮助你梳理情绪并获得新的视角。"
      },
      {
       "id": "s-5-22-9",
       "original": "You can call a friend, family member, or even a professional counselor if needed. 5.",
       "zh": "如果需要，可以打给朋友、家人，甚至专业咨询师。5."
      },
      {
       "id": "s-5-22-10",
       "original": "Practice relaxation techniques: Listening to music, doing yoga or meditation, or engaging in other relaxing activities can help reduce stress and anxiety.",
       "zh": "练习放松技巧：听音乐、做瑜伽或冥想，或进行其他放松活动，都有助于减轻压力与焦虑。"
      }
     ]
    },
    {
     "id": "p-5-23",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-5-23-1",
       "original": "Remember, it's okay to take time for yourself to process your emotions and come up with a plan that works best for you.",
       "zh": "请记住：给自己时间处理情绪、并制定出最适合自己的应对方案，是完全正常的。"
      }
     ]
    },
    {
     "id": "fig-5-4",
     "type": "figure_caption",
     "page": 11,
     "original": "Figure 8: Example showing Qwen2-Audio’s capability in sound analysis.",
     "zh": "Figure 8：示例展示 Qwen2-Audio 在声音分析方面的能力。"
    },
    {
     "id": "p-5-24",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-5-24-1",
       "original": "（play a piece of music without asking anything） This is a pop punk music piece.",
       "zh": "（播放一段音乐，未提任何问题。模型主动描述：）这是一首流行朋克（pop punk）风格的乐曲。"
      },
      {
       "id": "s-5-24-2",
       "original": "There is a male vocalist singing melodically in the lead.",
       "zh": "有一位男声主唱，演唱旋律动听。"
      },
      {
       "id": "s-5-24-3",
       "original": "The tune is being played by the guitar with the bass guitar playing in the background.",
       "zh": "乐曲由吉他演奏，背景中有贝斯吉他伴奏。"
      },
      {
       "id": "s-5-24-4",
       "original": "The rhythmic background consists of loud and aggressive sounding drums.",
       "zh": "背景节奏由响亮而有攻击性的鼓点构成。"
      },
      {
       "id": "s-5-24-5",
       "original": "The atmosphere is rebellious.",
       "zh": "整体氛围带有叛逆感。"
      },
      {
       "id": "s-5-24-6",
       "original": "This piece could be used in the soundtrack of a high school drama movie or TV show during scenes where the characters are rebelling against authority.",
       "zh": "这首曲子很适合用在高中题材影视剧的配乐中，尤其是角色反抗权威的场景。"
      }
     ]
    },
    {
     "id": "p-5-25",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-5-25-1",
       "original": "“What’s the tempo of this music?”",
       "zh": "（用户提问：）「这段音乐的速度（tempo）是多少？」"
      }
     ]
    },
    {
     "id": "p-5-26",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-5-26-1",
       "original": "The tempo of this music is 104.17  bpm.",
       "zh": "（模型回答：）这段音乐的速度是 104.17 bpm。"
      }
     ]
    },
    {
     "id": "p-5-27",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-5-27-1",
       "original": "“What’s the time signature of this music” The time signature of this music is 4/4.",
       "zh": "（用户提问：）「这段音乐的拍号是什么？」（模型回答：）这段音乐的拍号是 4/4。"
      }
     ]
    },
    {
     "id": "p-5-28",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-5-28-1",
       "original": "“What’s the key of this music” The key of this music piece is F# major.",
       "zh": "（用户提问：）「这段音乐的调是什么？」（模型回答：）这段音乐是 F# 大调。"
      }
     ]
    },
    {
     "id": "fig-5-5",
     "type": "figure_caption",
     "page": 12,
     "original": "Figure 9: Example showing Qwen2-Audio’s capability in music analysis.",
     "zh": "Figure 9：示例展示 Qwen2-Audio 在音乐分析方面的能力。"
    },
    {
     "id": "p-5-29",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-5-29-1",
       "original": "“What are the lyrics of the singing?” (Then a song is played.)",
       "zh": "（用户提问：）「歌唱部分的歌词是什么？」（随后播放一首歌。）"
      }
     ]
    },
    {
     "id": "p-5-30",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-5-30-1",
       "original": "The lyrics are 'Waiting for my favorite song.'",
       "zh": "（模型回答：）歌词是「Waiting for my favorite song.（在等我最喜欢的那首歌。）」"
      }
     ]
    },
    {
     "id": "p-5-31",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-5-31-1",
       "original": "“What are the lyrics of the singing?” (Then a song mixed with a sound is played.",
       "zh": "（用户再次提问：）「歌唱部分的歌词是什么？」（随后播放一段混有环境声音的歌。）"
      }
     ]
    },
    {
     "id": "p-5-32",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-5-32-1",
       "original": "The lyrics are 'Waiting for my favorite song.'",
       "zh": "（模型回答：）歌词是「Waiting for my favorite song.（在等我最喜欢的那首歌。）」"
      }
     ]
    },
    {
     "id": "p-5-33",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-5-33-1",
       "original": "“What are the lyrics of the singing?” (Then a song mixed with a speech(man speaking) is played.)",
       "zh": "（用户再次提问：）「歌唱部分的歌词是什么？」（随后播放一段混有人声语音（男子说话）的歌。）"
      }
     ]
    },
    {
     "id": "p-5-34",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-5-34-1",
       "original": "The lyrics are 'Waiting for my favorite song.'",
       "zh": "（模型回答：）歌词是「Waiting for my favorite song.（在等我最喜欢的那首歌。）」"
      }
     ]
    },
    {
     "id": "p-5-35",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-5-35-1",
       "original": "“What does the person say?” (Then a speech is played.)",
       "zh": "（用户提问：）「这个人说了什么？」（随后播放一段语音。）"
      }
     ]
    },
    {
     "id": "p-5-36",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-5-36-1",
       "original": "The old man laid down his hand to light a cigar.",
       "zh": "（模型回答：）老人放下手，点燃了一支雪茄。"
      }
     ]
    },
    {
     "id": "p-5-37",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-5-37-1",
       "original": "“What does the person say?” (Then a speech mixed with a music is played.)",
       "zh": "（用户再次提问：）「这个人说了什么？」（随后播放一段混有音乐的语音。）"
      }
     ]
    },
    {
     "id": "p-5-38",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-5-38-1",
       "original": "The old man laid down his hand to light a cigar.",
       "zh": "（模型回答：）老人放下手，点燃了一支雪茄。"
      }
     ]
    },
    {
     "id": "p-5-39",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-5-39-1",
       "original": "“What does the person say?” (Then a speech mixed with a sound is played.)",
       "zh": "（用户再次提问：）「这个人说了什么？」（随后播放一段混有环境声音的语音。）"
      }
     ]
    },
    {
     "id": "p-5-40",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-5-40-1",
       "original": "The old man laid down his hand to light a cigar.",
       "zh": "（模型回答：）老人放下手，点燃了一支雪茄。"
      }
     ]
    },
    {
     "id": "fig-5-6",
     "type": "figure_caption",
     "page": 13,
     "original": "Figure 10: Example showing Qwen2-Audio’s robustness in mixed audio analysis.",
     "zh": "Figure 10：示例展示 Qwen2-Audio 在混合音频分析上的鲁棒性。"
    }
   ]
  },
  {
   "id": "sec-6",
   "num": "6",
   "level": 1,
   "page": 14,
   "title": {
    "original": "Acknowledgements",
    "zh": "致谢"
   },
   "blocks": [
    {
     "id": "p-6-1",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-6-1-1",
       "original": "We express our gratitude to Jinze Bai, Shuai Bai, Peng Wang, Sinan Tan, Shijie Wang, Kai Dang for their insightful discussion.",
       "zh": "感谢 Jinze Bai、Shuai Bai、Peng Wang、Sinan Tan、Shijie Wang、Kai Dang 富有见地的讨论。"
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
       "original": "Andrea Agostinelli, Timo I Denk, Zalán Borsos, Jesse Engel, Mauro Verzetti, Antoine Caillon, Qingqing Huang, Aren Jansen, Adam Roberts, Marco Tagliasacchi, et al. Musiclm: Generating music from text. arXiv preprint arXiv:2301.11325, 2023."
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
       "original": "Junyi Ao, Rui Wang, Long Zhou, Chengyi Wang, Shuo Ren, Yu Wu, Shujie Liu, Tom Ko, Qing Li, Yu Zhang, et al."
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
       "original": "Speecht5: Unified-modal encoder-decoder pre-training for spoken language processing. arXiv:2110.07205, 2021."
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
       "original": "R."
      },
      {
       "id": "s-references-4-2",
       "original": "Ardila, M."
      },
      {
       "id": "s-references-4-3",
       "original": "Branson, K."
      },
      {
       "id": "s-references-4-4",
       "original": "Davis, M."
      },
      {
       "id": "s-references-4-5",
       "original": "Henretty, M."
      },
      {
       "id": "s-references-4-6",
       "original": "Kohler, J."
      },
      {
       "id": "s-references-4-7",
       "original": "Meyer, R."
      },
      {
       "id": "s-references-4-8",
       "original": "Morais, L."
      },
      {
       "id": "s-references-4-9",
       "original": "Saunders, F."
      },
      {
       "id": "s-references-4-10",
       "original": "M."
      },
      {
       "id": "s-references-4-11",
       "original": "Tyers, and G."
      },
      {
       "id": "s-references-4-12",
       "original": "Weber."
      },
      {
       "id": "s-references-4-13",
       "original": "Common voice: A massively-multilingual speech corpus."
      },
      {
       "id": "s-references-4-14",
       "original": "In Proceedings of the 12th Conference on Language Resources and Evaluation (LREC 2020), pages 4211–4215, 2020."
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
       "original": "Jinze Bai, Shuai Bai, Yunfei Chu, Zeyu Cui, Kai Dang, Xiaodong Deng, Yang Fan, Wenbin Ge, Yu Han, Fei Huang, et al. Qwen technical report. arXiv preprint arXiv:2309.16609, 2023."
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
       "original": "Sanyuan Chen, Chengyi Wang, Zhengyang Chen, Yu Wu, Shujie Liu, Zhuo Chen, Jinyu Li, Naoyuki Kanda, Takuya Yoshioka, Xiong Xiao, Jian Wu, Long Zhou, Shuo Ren, Yanmin Qian, Yao Qian, Jian Wu, Michael Zeng, Xiangzhan Yu, and Furu Wei."
      },
      {
       "id": "s-references-6-2",
       "original": "Wavlm: Large-scale self-supervised pre-training for full stack speech processing."
      },
      {
       "id": "s-references-6-3",
       "original": "IEEE J."
      },
      {
       "id": "s-references-6-4",
       "original": "Sel."
      },
      {
       "id": "s-references-6-5",
       "original": "Top."
      },
      {
       "id": "s-references-6-6",
       "original": "Signal Process., 2022."
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
       "original": "Yi-Chen Chen, Po-Han Chi, Shu-wen Yang, Kai-Wei Chang, Jheng-hao Lin, Sung-Feng Huang, Da-Rong Liu, Chi-Liang Liu, Cheng-Kuang Lee, and Hung-yi Lee."
      },
      {
       "id": "s-references-7-2",
       "original": "Speechnet: A universal modularized model for speech processing tasks. arXiv:2105.03070, 2021."
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
       "original": "Yunfei Chu, Jin Xu, Xiaohuan Zhou, Qian Yang, Shiliang Zhang, Zhijie Yan, Chang Zhou, and Jingren Zhou."
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
       "original": "Qwen-audio: Advancing universal audio understanding via unified large-scale audio-language models. arXiv preprint arXiv:2311.07919, 2023."
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
       "original": "Christopher Cieri, David Miller, and Kevin Walker."
      },
      {
       "id": "s-references-10-2",
       "original": "The fisher corpus: A resource for the next generations of speech-to-text."
      },
      {
       "id": "s-references-10-3",
       "original": "In LREC, volume 4, pages 69–71, 2004."
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
       "original": "Alexis Conneau, Min Ma, Simran Khanuja, Yu Zhang, Vera Axelrod, Siddharth Dalmia, Jason Riesa, Clara Rivera, and Ankur Bapna."
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
       "original": "Fleurs: Few-shot learning evaluation of universal representations of speech. 2022 IEEE Spoken Language Technology Workshop (SLT), pages 798–805, 2022."
      },
      {
       "id": "s-references-12-2",
       "original": "URL https: //api.semanticscholar.org/CorpusID:249062909."
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
       "original": "Nilaksh Das, Saket Dingliwal, Srikanth Ronanki, Rohit Paturi, David Huang, Prashant Mathur, Jie Yuan, Dhanush Bekal, Xing Niu, Sai Muralidhar Jayanthi, et al. Speechverse: A large-scale generalizable audio language model. arXiv preprint arXiv:2405.08295, 2024."
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
       "original": "Soham Deshmukh, Benjamin Elizalde, Rita Singh, and Huaming Wang."
      },
      {
       "id": "s-references-14-2",
       "original": "Pengi: An audio language model for audio tasks."
      },
      {
       "id": "s-references-14-3",
       "original": "CoRR, 2023."
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
       "original": "Konstantinos Drossos, Samuel Lipping, and Tuomas Virtanen."
      },
      {
       "id": "s-references-15-2",
       "original": "Clotho: an audio captioning dataset."
      },
      {
       "id": "s-references-15-3",
       "original": "In 2020 IEEE International Conference on Acoustics, Speech and Signal Processing, ICASSP 2020, Barcelona, Spain, May 4-8, 2020."
      },
      {
       "id": "s-references-15-4",
       "original": "IEEE, 2020."
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
       "original": "Jiayu Du, Xingyu Na, Xuechen Liu, and Hui Bu."
      },
      {
       "id": "s-references-16-2",
       "original": "AISHELL-2: transforming mandarin ASR research into industrial scale. abs/1808.10583, 2018."
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
       "original": "Benjamin Elizalde, Soham Deshmukh, Mahmoud Al Ismail, and Huaming Wang."
      },
      {
       "id": "s-references-17-2",
       "original": "CLAP: learning audio concepts from natural language supervision. abs/2206.04769, 2022."
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
       "original": "Zhifu Gao, Zerui Li, Jiaming Wang, Haoneng Luo, Xian Shi, Mengzhe Chen, Yabin Li, Lingyun Zuo, Zhihao Du, Zhangyu Xiao, and Shiliang Zhang."
      },
      {
       "id": "s-references-18-2",
       "original": "Funasr: A fundamental end-to-end speech recognition toolkit."
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
       "original": "CoRR, abs/2305.11013, 2023."
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
       "original": "Yuan Gong, Jin Yu, and James R."
      },
      {
       "id": "s-references-20-2",
       "original": "Glass."
      },
      {
       "id": "s-references-20-3",
       "original": "Vocalsound: A dataset for improving human vocal sounds recognition."
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
       "original": "In IEEE International Conference on Acoustics, Speech and Signal Processing, ICASSP 2022, Virtual and Singapore, 23-27 May 2022, pages 151–155."
      },
      {
       "id": "s-references-21-2",
       "original": "IEEE, 2022. doi: 10.1109/ICASSP43922.2022.9746828."
      },
      {
       "id": "s-references-21-3",
       "original": "URL https://doi. org/10.1109/ICASSP43922.2022.9746828."
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
       "original": "Chris Dongjoo Kim, Byeongchang Kim, Hyunmin Lee, and Gunhee Kim."
      },
      {
       "id": "s-references-22-2",
       "original": "Audiocaps: Generating captions for audios in the wild."
      },
      {
       "id": "s-references-22-3",
       "original": "In Proceedings of the 2019 Conference of the North American Chapter of the Association for Computational Linguistics: Human Language Technologies, Volume 1 (Long and Short Papers), 2019."
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
       "original": "Zhifeng Kong, Arushi Goel, Rohan Badlani, Wei Ping, Rafael Valle, and Bryan Catanzaro."
      },
      {
       "id": "s-references-23-2",
       "original": "Audio flamingo: A novel audio language model with few-shot learning and dialogue abilities. arXiv preprint arXiv:2402.01831, 2024."
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
       "original": "Chenyang Lyu, Minghao Wu, Longyue Wang, Xinting Huang, Bingshuai Liu, Zefeng Du, Shuming Shi, and Zhaopeng Tu."
      },
      {
       "id": "s-references-24-2",
       "original": "Macaw-llm: Multi-modal language modeling with image, audio, video, and text integration."
      }
     ]
    },
    {
     "id": "p-references-25",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-references-25-1",
       "original": "CoRR, abs/2306.09093, 2023."
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
       "original": "OpenAI."
      },
      {
       "id": "s-references-26-2",
       "original": "Gpt-4 technical report, 2023."
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
       "original": "OpenAI."
      },
      {
       "id": "s-references-27-2",
       "original": "Gpt-4o, 2024."
      },
      {
       "id": "s-references-27-3",
       "original": "URL https://openai.com/index/hello-gpt-4o/."
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
       "original": "Vassil Panayotov, Guoguo Chen, Daniel Povey, and Sanjeev Khudanpur."
      },
      {
       "id": "s-references-28-2",
       "original": "Librispeech: An ASR corpus based on public domain audio books."
      },
      {
       "id": "s-references-28-3",
       "original": "In 2015 IEEE International Conference on Acoustics, Speech and Signal Processing, ICASSP 2015, South Brisbane, Queensland, Australia, April 19-24, 2015."
      },
      {
       "id": "s-references-28-4",
       "original": "IEEE, 2015."
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
       "original": "Kishore Papineni, Salim Roukos, Todd Ward, and Wei-Jing Zhu."
      },
      {
       "id": "s-references-29-2",
       "original": "Bleu: a method for automatic evaluation of machine translation."
      },
      {
       "id": "s-references-29-3",
       "original": "In Proceedings of the 40th annual meeting of the Association for Computational Linguistics, 2002."
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
       "original": "Soujanya Poria, Devamanyu Hazarika, Navonil Majumder, Gautam Naik, Erik Cambria, and Rada Mihalcea."
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
       "original": "MELD: A multimodal multi-party dataset for emotion recognition in conversations."
      },
      {
       "id": "s-references-31-2",
       "original": "In Proceedings of the 57th Conference of the Association for Computational Linguistics, ACL 2019, Florence, Italy, July 28- August 2, 2019, Volume 1: Long Papers."
      },
      {
       "id": "s-references-31-3",
       "original": "Association for Computational Linguistics, 2019."
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
       "original": "Qwen."
      },
      {
       "id": "s-references-32-2",
       "original": "Introducing qwen-7b: Open foundation and human-aligned models (of the state-of-the-arts), 2023."
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
       "original": "URL https://github.com/QwenLM/Qwen-7B."
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
       "original": "Alec Radford, Jong Wook Kim, Tao Xu, Greg Brockman, Christine McLeavey, and Ilya Sutskever."
      },
      {
       "id": "s-references-34-2",
       "original": "Robust speech recognition via large-scale weak supervision."
      },
      {
       "id": "s-references-34-3",
       "original": "In International Conference on Machine Learning, ICML 2023, 23-29 July 2023, Honolulu, Hawaii, USA, 2023."
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
       "original": "Rafael Rafailov, Archit Sharma, Eric Mitchell, Christopher D Manning, Stefano Ermon, and Chelsea Finn."
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
       "original": "Direct preference optimization: Your language model is secretly a reward model."
      },
      {
       "id": "s-references-36-2",
       "original": "Advances in Neural Information Processing Systems, 36, 2024."
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
       "original": "Machel Reid, Nikolay Savinov, Denis Teplyashin, Dmitry Lepikhin, Timothy Lillicrap, Jean-baptiste Alayrac, Radu Soricut, Angeliki Lazaridou, Orhan Firat, Julian Schrittwieser, et al. Gemini 1.5: Unlocking multimodal understanding across millions of tokens of context. arXiv preprint arXiv:2403.05530, 2024."
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
       "original": "Shuzheng Si, Wentao Ma, Yuchuan Wu, Yinpei Dai, Haoyu Gao, Ting-En Lin, Hangyu Li, Rui Yan, Fei Huang, and Yongbin Li."
      },
      {
       "id": "s-references-38-2",
       "original": "Spokenwoz: A large-scale speech-text benchmark for spoken task-oriented dialogue in multiple domains. arXiv preprint arXiv:2305.13040, 2023."
      }
     ]
    },
    {
     "id": "p-references-39",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-39-1",
       "original": "Yixuan Su, Tian Lan, Huayang Li, Jialu Xu, Yan Wang, and Deng Cai."
      },
      {
       "id": "s-references-39-2",
       "original": "Pandagpt: One model to instructionfollow them all. arXiv:2305.16355, 2023."
      }
     ]
    },
    {
     "id": "p-references-40",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-40-1",
       "original": "Changli Tang, Wenyi Yu, Guangzhi Sun, Xianzhao Chen, Tian Tan, Wei Li, Lu Lu, Zejun MA, and Chao Zhang."
      },
      {
       "id": "s-references-40-2",
       "original": "SALMONN: Towards generic hearing abilities for large language models."
      },
      {
       "id": "s-references-40-3",
       "original": "In The Twelfth International Conference on Learning Representations, 2024."
      },
      {
       "id": "s-references-40-4",
       "original": "URL https://openreview.net/forum?id=14rn7HpKVk."
      }
     ]
    },
    {
     "id": "p-references-41",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-41-1",
       "original": "Changhan Wang, Anne Wu, and Juan Miguel Pino."
      },
      {
       "id": "s-references-41-2",
       "original": "Covost 2: A massively multilingual speech-to-text translation corpus. abs/2007.10310, 2020."
      },
      {
       "id": "s-references-41-3",
       "original": "URL https://arxiv.org/abs/2007.10310."
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
       "original": "Chen Wang, Minpeng Liao, Zhongqiang Huang, Jinliang Lu, Junhong Wu, Yuchen Liu, Chengqing Zong, and Jiajun Zhang."
      },
      {
       "id": "s-references-42-2",
       "original": "Blsp: Bootstrapping language-speech pre-training via behavior alignment of continuation writing. arXiv:2309.00916, 2023a."
      }
     ]
    },
    {
     "id": "p-references-43",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-references-43-1",
       "original": "Mingqiu Wang, Wei Han, Izhak Shafran, Zelin Wu, Chung-Cheng Chiu, Yuan Cao, Yongqiang Wang, Nanxin Chen, Yu Zhang, Hagen Soltau, Paul K."
      },
      {
       "id": "s-references-43-2",
       "original": "Rubenstein, Lukas Zilka, Dian Yu, Zhong Meng, Golan Pundak, Nikhil Siddhartha, Johan Schalkwyk, and Yonghui Wu."
      },
      {
       "id": "s-references-43-3",
       "original": "SLM: bridge the thin gap between speech and text foundation models. abs/2310.00230, 2023b."
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
       "original": "Jian Wu, Yashesh Gaur, Zhuo Chen, Long Zhou, Yimeng Zhu, Tianrui Wang, Jinyu Li, Shujie Liu, Bo Ren, Linquan Liu, and Yu Wu."
      },
      {
       "id": "s-references-44-2",
       "original": "On decoder-only architecture for speech-to-text and large language model integration. abs/2307.03917, 2023a."
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
       "original": "Shengqiong Wu, Hao Fei, Leigang Qu, Wei Ji, and Tat-Seng Chua."
      },
      {
       "id": "s-references-45-2",
       "original": "Next-gpt: Any-to-any multimodal LLM."
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
       "original": "CoRR, abs/2309.05519, 2023b."
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
       "original": "Qian Yang, Jin Xu, Wenrui Liu, Yunfei Chu, Ziyue Jiang, Xiaohuan Zhou, Yichong Leng, Yuanjun Lv, Zhou Zhao, Chang Zhou, and Jingren Zhou."
      },
      {
       "id": "s-references-47-2",
       "original": "Air-bench: Benchmarking large audio-language models via generative comprehension."
      },
      {
       "id": "s-references-47-3",
       "original": "In ACL, 2024."
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
       "original": "Dong Zhang, Shimin Li, Xin Zhang, Jun Zhan, Pengyu Wang, Yaqian Zhou, and Xipeng Qiu."
      },
      {
       "id": "s-references-48-2",
       "original": "Speechgpt: Empowering large language models with intrinsic cross-modal conversational abilities."
      },
      {
       "id": "s-references-48-3",
       "original": "CoRR, abs/2305.11000, 2023."
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
       "original": "Xiaohuan Zhou, Jiaming Wang, Zeyu Cui, Shiliang Zhang, Zhijie Yan, Jingren Zhou, and Chang Zhou."
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
       "original": "Mmspeech: Multi-modal multi-task encoder-decoder pre-training for speech recognition. abs/2212.00500, 2022."
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
    "quote": "we have simplified the pre-training process by utilizing natural language prompts for different data and tasks"
   },
   "kind": "comparison",
   "title": "层级标签换成自然语言提示",
   "explanation": "Qwen-Audio 一代用层级化标签（任务名、语种、领域等多级 tag）把不同数据组织进同一个模型，标签体系本身要人工设计且与训练绑死。二代直接用自然语言 prompt 描述数据，等于把「任务定义」从结构化的控制信号变成普通文本，让模型在预训练时就习惯「用指令理解任务」。这既是简化工程，也是为 SFT 阶段的自由对话打底——预训练和后训练格式一致，才是后文所谓「缩小两阶段差距」的真实含义。",
   "featured": true
  },
  {
   "id": "ann-002",
   "anchor": {
    "sentence_id": "s-abstract-1-6",
    "quote": "we do not use any system prompts to switch between voice chat and audio analysis modes"
   },
   "kind": "concept",
   "title": "没有系统提示，模式怎么切换",
   "explanation": "多数多模态模型靠 system prompt 硬切换「分析模式」和「聊天模式」，等价于让模型记住两套行为模板。Qwen2-Audio 反其道：把两种模式的数据混在一起做联合训练（见 2.2 节第 8 段），让模型自己根据输入里有没有可分析音频、用户语气是哪种，来判断该走哪条路径。这是产品体验上的一步，不是架构创新；但也意味着模型在边界场景（比如边聊天边塞一段环境音）可能摇摆，论文没有给出这种歧义场景的稳定性数据。",
   "featured": true
  },
  {
   "id": "ann-003",
   "anchor": {
    "sentence_id": "s-abstract-1-10",
    "quote": "Qwen2-Audio outperformed previous SOTAs, such as Gemini-1.5-pro"
   },
   "kind": "critique",
   "title": "赢 Gemini-1.5-pro 要打折看",
   "explanation": "摘要只报「超过 Gemini-1.5-pro」，正文 3.2 节却交代了两件事：一是 Gemini 在 AIR-Bench 因安全策略拒答，样本被砍掉约 1/5，等于对手被削了样本量；二是 Gemini 是闭源 API 且未针对音频任务特化，Qwen2-Audio 则是领域微调过的模型。把这两条放回去读「超过」这句话，它更多说明「领域微调模型能打败通用多模态 API」，而不是「二者在同一基准上公平比拼的结果」。宣传话术和技术结论要分开看。",
   "featured": true
  },
  {
   "id": "ann-004",
   "anchor": {
    "sentence_id": "s-1-2-4",
    "quote": "we simplify the ∗Equal contribution, †Corresponding author"
   },
   "kind": "engineering",
   "title": "抽样噪音的一个现场证据",
   "explanation": "这一行的原文被 PDF 抽取破坏——正文「simplify the pre-training process」和脚注「Equal contribution, Corresponding author」、Figure 1 的图表散值被粘到了同一句。这类残留是抽取层（PyMuPDF / pdfplumber 等）把双栏 PDF、页脚、图表文字按文本流展平的典型副作用。做下游 NLP（RAG、精读、句子级标注）时必须把这种「句子碎块」单独处理，否则要么污染翻译，要么把图表数值误当正文事实喂给模型。这条句子本身就是最好的警示案例。",
   "featured": false
  },
  {
   "id": "ann-005",
   "anchor": {
    "sentence_id": "s-1-5-1",
    "quote": "without any task-specific fine-tuning"
   },
   "kind": "critique",
   "title": "「无任务特定微调」是有限承诺",
   "explanation": "论文反复强调 Qwen2-Audio 不做任务特定微调也赢过对手，听起来很强。但要拆开看：它不做的是「为某一个下游 benchmark 单开 fine-tune」，而不是「没在这些任务上见过类似数据」。预训练和 SFT 阶段海量的 ASR/翻译/字幕数据本身就覆盖了这些任务的分布，「zero-shot on Fleurs」甚至也被作者自己承认为相对公平，「Common Voice 15」则明确是非零样本。所谓「generalist」更多指模型形态上的统一，不是数据上的清白。",
   "featured": true
  },
  {
   "id": "ann-006",
   "anchor": {
    "sentence_id": "s-2-3-1",
    "quote": "the initialization of the audio encoder of Qwen2-Audio is based on the Whisperlarge-v3 model"
   },
   "kind": "engineering",
   "title": "音频编码器直接薅 Whisper-large-v3",
   "explanation": "Qwen-Audio 也是 Whisper 系，这里作者再次选择「从头训一个音频编码器」 vs 「站在 Whisper-large-v3 的肩膀上」，挑了后者。收益立竿见影：Whisper 已经在 680,000 小时弱监督数据上学到过鲁棒的声学表示，Qwen2-Audio 不用再重造。代价也很现实：模型的语言偏向、噪声鲁棒性、对长音频的截断策略都继承了 Whisper 的偏见，非英语或口音重的上限被 Whisper 卡死。这是「借力」和「被束缚」同一件事的两面。",
   "featured": true
  },
  {
   "id": "ann-007",
   "anchor": {
    "sentence_id": "s-2-3-4",
    "quote": "each frame of the encoder output approximately corresponds to a 40ms segment"
   },
   "kind": "number",
   "title": "40ms 一帧，是怎么算出来的",
   "explanation": "原文给了三个参数：重采样到 16kHz、窗长 25ms、帧移 10ms，再加一个 stride=2 的池化。帧移 10ms × 池化 stride 2 = 20ms，但作者又乘上 2 才说 40ms——这其实是把两层下采样（前端 conv 通常还有一层 stride 2）合计起来。40ms 一帧意味着 1 秒音频被压成 25 个 token，留给 LLM 的上下文不算紧张；但同时任何需要亚 40ms 精度的任务（说话人起止、精确事件检测）都失去原生分辨率，只能靠训练数据补猜。",
   "featured": false
  },
  {
   "id": "ann-008",
   "anchor": {
    "sentence_id": "s-2-3-6",
    "quote": "The total parameters of Qwen2-Audio is 8.2B parameters"
   },
   "kind": "number",
   "title": "8.2B 这个数拆开看",
   "explanation": "Qwen-7B 是 LLM 主干，加上 Whisper-large-v3 的编码器（约 0.6-0.7B）和中间的投影层，凑齐约 8.2B。这个规模在 2024 年属于「能跑在数据中心、不适合端侧」的级别：单卡 A100 推理没问题，但要做到毫秒级延迟的实时对话、或塞进手机端，还差一代蒸馏/量化的工作。论文没有给 RTF、batch 吞吐、显存占用这些数据，意味着工程部署仍是用户自己要解决的坑。",
   "featured": false
  },
  {
   "id": "ann-009",
   "anchor": {
    "sentence_id": "s-pre-training-1-3",
    "quote": "using language prompts can improve better generalization ability and better instruction following ability"
   },
   "kind": "critique",
   "title": "「我们发现」没有数据支撑",
   "explanation": "这一句话是整篇报告里最重要的方法论主张——自然语言 prompt 比层级标签带来更好泛化和指令遵循。但它没有任何数据：没有给出和 Qwen-Audio 的对照实验、没有消融不同 prompt 风格的影响，只是陈述「我们发现」。这种「显然成立但不证明」的写法在快速迭代的 LLM/音频模型报告里很常见，可信度依赖作者的工程直觉而非可复现证据。读者若是想复现，只能凭经验选一边。",
   "featured": true
  },
  {
   "id": "ann-010",
   "anchor": {
    "sentence_id": "s-supervised-fine-tuning-8-1",
    "quote": "both interaction modes were jointly trained, thus users will not experience mode differentiation during use"
   },
   "kind": "engineering",
   "title": "两种模式为什么要联合训",
   "explanation": "把「音频分析」和「语音聊天」拆开训会省很多事，但用户就要手动切换或用 system prompt 分流。这里作者选择了更难的路：把两类数据混在 SFT 里联合训，期望模型从数据里学会「根据上下文判断该走哪个模式」。这是一个典型的产品驱动 ML 决策——牺牲训练数据组织的简洁，换用户体验的平滑。代价是模型对输入歧义的判断没有显式监督信号，全靠数据分布去推。后文没给出「模式识别错误率」这种指标，等于这条产品承诺无法量化验证。",
   "featured": true
  },
  {
   "id": "ann-011",
   "anchor": {
    "sentence_id": "s-direct-preference-optimization-1-1",
    "quote": "We employ DPO (Rafailov et al., 2024) to further optimize models to follow human preferences"
   },
   "kind": "comparison",
   "title": "为何是 DPO 不是 RLHF",
   "explanation": "在 Qwen 体系里 RLHF（PPO）是默认配方，这里改用 DPO。技术动机很现实：音频-文本数据的奖励模型训练代价高、PPO 在线采样在音频侧尤其昂贵（要重新跑一遍音频编码+LLM），DPO 把对答对做成离线偏好对，工程上轻量一档。这也是音频 LALM 的普遍痛点——RLHF 的 actor-critic 在跨模态上训练不稳定，DPO 的「悄悄学成一个奖励模型」反而更可工程化。学术上 DPO 被批评缺乏探索，但在这种「上线快、求稳」的场景里就是更务实的选择。",
   "featured": false
  },
  {
   "id": "ann-012",
   "anchor": {
    "sentence_id": "s-3-1-1-1",
    "quote": "many previous test datasets are highly limited and cannot adequately reflect performance in real-world scenarios"
   },
   "kind": "critique",
   "title": "说基准不行，然后自己造了一个",
   "explanation": "作者批评 SLU/SER 等老基准「不能反映真实场景」，这是合理的。但下一句的「因此我们主要在 AIR-Bench 上评测」就有点自我打广告的意味——AIR-Bench 是同一团队自己发表的基准（Yang et al., 2024，作者高度重合），用它来主张自家模型最优，独立性天然打折。再加上 AIR-Bench 的分数由 GPT-4 自动评估，等于把裁判权又外包给了另一个黑盒 LLM。这套「自家模型 + 自家基准 + LLM 打分」的组合在 2024 年的 LLM 论文里已成定式，但作为读者要保持警惕。",
   "featured": true
  },
  {
   "id": "ann-013",
   "anchor": {
    "sentence_id": "s-3-2-1-3",
    "quote": "it achieves a 1.6% and 3.6% WER on the librispeech test-clean and test-other datasets, respectively"
   },
   "kind": "number",
   "title": "1.6/3.6 WER 放在 2024 看是什么水平",
   "explanation": "Librispeech test-clean 1.6% 和 test-other 3.6% 在 2017 年是不可想象的成绩，到 2024 年已经只是「不错」——Whisper-large-v3 的对应数字大约是 1.8/3.6 一档，和 Qwen2-Audio 基本相当。也就是说 Qwen2-Audio 没把 ASR 的 SOTA 往前推，而是把「够用的 ASR」打包进了一个多模态对话模型。读这类报告别被 SOTA 字眼带跑：在 ASR 这种成熟任务上，「不掉队」已经是工程胜利，「碾压」反而要警惕是否评测口径不同。",
   "featured": false
  },
  {
   "id": "ann-014",
   "anchor": {
    "sentence_id": "s-3-2-1-5",
    "quote": "Qwen2-Audio is not evaluated in a zero-shot manner on the Common Voice 15 dataset, whereas Whisper’s results are obtained in a zero-shot fashion"
   },
   "kind": "critique",
   "title": "少见的诚实脚注，值得点出来",
   "explanation": "LLM 论文里藏口径差异是常态，把自己摆在不利位置的比较少见。作者明确写出 Common Voice 15 上 Qwen2-Audio 不是零样本、Whisper 是零样本——也就是说这一项的胜负本身不可直接比。这种「先自曝其短」的写法反而提高了整篇报告的可信度。读者反过来应该警觉：作者愿意承认的失分点列出来了，那没列出来的（比如 Fleurs 上 Qwen2-Audio 是否真的没碰过相关数据）就要自己多问一句。",
   "featured": true
  },
  {
   "id": "ann-015",
   "anchor": {
    "sentence_id": "s-3-2-3-2",
    "quote": "the number of samples of Gemini1.5 on AIR-Bench-chat has been reduced by about 1/5"
   },
   "kind": "critique",
   "title": "对手缺了 1/5 样本，胜负怎么算",
   "explanation": "Gemini-1.5 因安全策略拒答，AIR-Bench-chat 上样本缩水 1/5——这可不是小数目。作者没说明这些被拒样本最终是按 0 分计入，还是从分母里剔除。两种处理给出的结论差异很大：按 0 分计，等于惩罚谨慎；剔除，等于奖励拒答。无论哪种，Qwen2-Audio 在表面上赢 Gemini 的胜率都被扭曲了。这是「跨厂商 API 评测」的系统性问题，不是任何一方有意作弊，但读者若只看表格数字就会被误导。",
   "featured": true
  },
  {
   "id": "ann-016",
   "anchor": {
    "sentence_id": "s-4-2-1",
    "quote": "Yes, the speaker is female and in her twenties."
   },
   "kind": "concept",
   "title": "年龄性别是怎么「听」出来的",
   "explanation": "这条案例展示的是模型能从语音里推年龄和性别——技术上走基频、共振峰、语速这些声学线索，再加上 LLM 的常识先验（比如年轻女性的用词和音高分布）。但这条能力也带隐私和伦理问题：声音里包含的生物特征信息比文本多得多，一旦商用就涉及对说话人的推断。论文把这条能力当成亮点展示，没有讨论对应的合规约束（GDPR、各国隐私法对声音生物特征的定义差异很大），这是技术报告可以欠账、产品落地必须还的账。",
   "featured": false
  },
  {
   "id": "ann-017",
   "anchor": {
    "sentence_id": "s-5-13-1",
    "quote": "Stop all the clocks, cut oﬀ the telephone, prevent the dog from barking"
   },
   "kind": "connection",
   "title": "引的是奥登《葬礼蓝调》",
   "explanation": "模型转录的这段音频是 W. H. Auden 1936 年的 Funeral Blues，1994 年电影《四个婚礼一个葬礼》把它推广成大众文化符号。作者挑这首诗做演示很聪明：一是韵律强、意象密集，方便模型「改写加雷雨场景」这个写作任务展示创意；二是暗示模型对文化语境有记忆，本质上考的还是 LLM 那一半，而不是音频编码器。所以这类演示区分不出模型是「听懂了诗」还是「认出了这是 Auden」。",
   "featured": false
  },
  {
   "id": "ann-018",
   "anchor": {
    "sentence_id": "s-5-26-1",
    "quote": "The tempo of this music is 104.17  bpm"
   },
   "kind": "critique",
   "title": "104.17 bpm 这种精度被谁买了",
   "explanation": "BPM 估到小数点后两位是典型「看起来专业、其实不靠谱」的输出。现实情况是：电子乐的 BPM 通常是整数（128、140、174 等），真人演奏的 BPM 会漂。一个回归式报数的模型给出 104.17 这种伪精度，比给一个范围（「大约 104 bpm」）更容易被质疑——除非它真有一组精细的回归头专门做 tempo estimation，而这篇报告并没有提及。读起来更像 LLM 基于节拍规律的猜测性输出。",
   "featured": false
  },
  {
   "id": "ann-019",
   "anchor": {
    "sentence_id": "s-5-30-1",
    "quote": "The lyrics are 'Waiting for my favorite song.'"
   },
   "kind": "concept",
   "title": "在混合音频里找歌词，有用还是花活",
   "explanation": "5.29-5.40 这一组演示实际是在做一个隐藏任务：在包含噪声、音乐、语音混杂的输入里，根据用户问题精准抽取出对应的信号层。这其实是鸡尾酒会问题（cocktail party problem）的语言模型化解——不是把声学信号分离，而是用 LLM 的注意力去「选择」要关注哪一路。这条路径绕开了传统源分离 ASR，直接靠端到端训练数据让模型隐式学会。优雅，但上限是「它能不能在所有组合下都稳」——论文只给了几个精心挑选的成功 case，未给失败率。",
   "featured": true
  }
 ]
};
