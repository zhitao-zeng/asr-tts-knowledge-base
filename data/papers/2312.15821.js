// 自动生成：2312.15821 全文双语精读数据（由 tools/compile_paper.js 装配）
// 结构/原文来自 .cache/papers/2312.15821.json（tools/extract_paper.py）；
// 翻译与讲解来自 .cache/papers/zh/2312.15821/（LLM agent 撰写）。
// 改翻译请改片段后重新装配；勿手改本文件的结构与 original 字段。
globalThis.PAPER_2312_15821 = {
 "paper_id": "2312.15821",
 "model_id": "audiobox",
 "title": {
  "original": "Audiobox: Unified Audio Generation with Natural Language Prompts",
  "zh": "Audiobox：基于自然语言提示的统一音频生成"
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
       "original": "Apoorv Vyas∗, Bowen Shi∗, Matthew Le∗, Andros Tjandra∗, Yi-Chiao Wu∗, Baishan Guo, Jiemin Zhang, Xinyue Zhang, Robert Adkins, William Ngan, Jeff Wang, Ivan Cruz, Bapi Akula, Akinniyi Akinyemi, Brian Ellis, Rashel Moritz, Yael Yungster, Alice Rakotoarison, Liang Tan, Chris Summers, Carleigh Wood, Joshua Lane, Mary Williamson†, Wei-Ning Hsu† Audiobox Team, Fundamental AI Research (FAIR) at Meta ∗Research team, equal contribution †Research and engineering leadership, equal contribution Audio is an essential part of our life, but creating it often requires expertise and is time-consuming."
      },
      {
       "id": "s-front-1-2",
       "original": "Research communities have made great progress over the past year advancing the performance of large scale audio generative models for a single modality (speech, sound, or music) through adopting more powerful generative models and scaling data."
      },
      {
       "id": "s-front-1-3",
       "original": "However, these models lack controllability in several aspects: speech generation models cannot synthesize novel styles based on text description and are limited on domain coverage such as outdoor environments; sound generation models only provide coarse-grained control based on descriptions like “a person speaking” and would only generate mumbling human voices."
      },
      {
       "id": "s-front-1-4",
       "original": "This paper presents Audiobox, a unified model based on flow-matching that is capable of generating various audio modalities."
      },
      {
       "id": "s-front-1-5",
       "original": "We design description-based and example-based prompting to enhance controllability and unify speech and sound generation paradigms."
      },
      {
       "id": "s-front-1-6",
       "original": "We allow transcript, vocal, and other audio styles to be controlled independently when generating speech."
      },
      {
       "id": "s-front-1-7",
       "original": "To improve model generalization with limited labels, we adapt a self-supervised infilling objective to pre-train on large quantities of unlabeled audio."
      },
      {
       "id": "s-front-1-8",
       "original": "Audiobox sets new benchmarks on speech and sound generation (0.745 similarity on Librispeech for zero-shot TTS; 0.77 FAD on AudioCaps for text-to-sound) and unlocks new methods for generating audio with novel vocal and acoustic styles."
      },
      {
       "id": "s-front-1-9",
       "original": "We further integrate Bespoke Solvers, which speeds up generation by over 25 times compared to the default ODE solver for flow-matching, without loss of performance on several tasks."
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
       "original": "Correspondence: Apoorv Vyas vyasapoorv@meta.com, Wei-Ning Hsu wnhsu@meta.com Why building audio generative models: Audio is a key component in creating many forms of content, such as movies, podcasts, audiobooks, and Ads."
      },
      {
       "id": "s-front-2-2",
       "original": "However, audio creation is time-consuming and requires various expertise, such as voice acting, music composing and performing, Foley sound effect creation, and sound engineering."
      },
      {
       "id": "s-front-2-3",
       "original": "This imposes a great barrier to entry for the general public, making it hard for people to become audio creators."
      },
      {
       "id": "s-front-2-4",
       "original": "Even for professionals, performing these tasks can still take a lot of time and resources, limiting their productivity."
      },
      {
       "id": "s-front-2-5",
       "original": "Developing audio generative models that are generalizable, controllable, and high quality can bring transformative changes to the audio creation process, improving the efficiency of the professionals as well as unleashing the creativity for everyone."
      }
     ]
    },
    {
     "id": "p-front-3",
     "type": "paragraph",
     "page": 1,
     "sentences": [
      {
       "id": "s-front-3-1",
       "original": "Demo: https://audiobox.metademolab.com/"
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
       "original": "Progress of audio generative models: Recently, researchers have made significant progress advancing audio generative models.",
       "zh": "音频生成模型的进展：最近，研究者在推进音频生成模型方面取得了显著进展。"
      },
      {
       "id": "s-1-1-2",
       "original": "Speech generative models can mimic any vocal style using audio prompts that are as short as three seconds (Wang et al., 2023a; Shen et al., 2023; Le et al., 2023; Kharitonov et al., 2023), infill a portion of speech to remove transient noise or edit words for any speaker (Le et al., 2023; Shen et al., 2023), synthesize foreign languages in anyone’s voice (Zhang et al., 2023; Le et al., 2023), and create dialogues (Borsos et al., 2023).",
       "zh": "语音生成模型可以借助短至 3 秒的音频提示模仿任意声线（Wang et al., 2023a; Shen et al., 2023; Le et al., 2023; Kharitonov et al., 2023），可以填充一段语音以去除瞬态噪声或为任意说话人编辑字词（Le et al., 2023; Shen et al., 2023），可以用任何人的声音合成外语（Zhang et al., 2023; Le et al., 2023），还可以生成对话（Borsos et al., 2023）。"
      },
      {
       "id": "s-1-1-3",
       "original": "Music generative models can create music in various styles using a short text description (Schneider et al., 2023; Huang et al., 2023a; Agostinelli et al., 2023; Copet et al., 2023) and infill",
       "zh": "音乐生成模型可以用一段简短的文字描述创作各种风格的音乐（Schneider et al., 2023; Huang et al., 2023a; Agostinelli et al., 2023; Copet et al., 2023），并填充"
      }
     ]
    },
    {
     "id": "fig-1-1",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "fig-1-1-s1",
       "original": "Figure 1 Audiobox model diagram",
       "zh": "图 1 Audiobox 模型结构示意图"
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
       "original": "a portion of music (Li et al., 2023).",
       "zh": "一段音乐（Li et al., 2023）。"
      },
      {
       "id": "s-1-2-2",
       "original": "Sound effect generative models follows a similar paradigm.",
       "zh": "音效生成模型遵循类似的范式。"
      },
      {
       "id": "s-1-2-3",
       "original": "They are capable of creating and infilling complex acoustic scenes like “birds chirping and water dripping with some banging in the background” given a text description (Yang et al., 2023c; Kreuk et al., 2022; Huang et al., 2023b;",
       "zh": "给定文字描述，它们能够生成和填充复杂的声学场景，例如「鸟鸣和水滴声，背景中有一些敲击声」（Yang et al., 2023c; Kreuk et al., 2022; Huang et al., 2023b;"
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
       "original": "Ghosal et al., 2023; Liu et al., 2023b,c).",
       "zh": "Ghosal et al., 2023; Liu et al., 2023b,c）。"
      },
      {
       "id": "s-1-3-2",
       "original": "Recent models also extends to more general editing, such as removal or addition of sound events with natural language instructions (Wang et al., 2023b; Liu et al., 2023d).",
       "zh": "最新的模型还扩展到更通用的编辑任务，例如用自然语言指令移除或添加声音事件（Wang et al., 2023b; Liu et al., 2023d）。"
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
       "original": "Limitation of existing models: Existing audio generative models are still limited in controllability and generalizability.",
       "zh": "现有模型的局限：现有音频生成模型在可控性和泛化性上仍然受限。"
      },
      {
       "id": "s-1-4-2",
       "original": "First, the real world audio content often contain a mix of speech, music, and sound effects.",
       "zh": "首先，真实世界的音频内容往往是语音、音乐和音效的混合。"
      },
      {
       "id": "s-1-4-3",
       "original": "However, existing audio generative models are mostly modality-specific, which only generate either speech, music, or sound effects.",
       "zh": "然而，现有音频生成模型大多是单模态的，只能生成语音、音乐或音效中的一种。"
      },
      {
       "id": "s-1-4-4",
       "original": "In particular, existing large scale speech generative models (Wang et al., 2023a; Le et al., 2023; Shen et al., 2023) are trained mostly on audiobooks (Zen et al., 2019; Kahn et al., 2019; Pratap et al., 2020), which lacks diversity compared to truly in-the-wild data such as AudioSet (Gemmeke et al., 2017) in terms of expressivity (e.g., non-verbal sounds like coughing, screaming, laughing) and acoustic conditions (e.g., urban, rural, public indoor, stadiums).",
       "zh": "特别是，现有大规模语音生成模型（Wang et al., 2023a; Le et al., 2023; Shen et al., 2023）大多在有声书上训练（Zen et al., 2019; Kahn et al., 2019; Pratap et al., 2020），与 AudioSet（Gemmeke et al., 2017）这类真正野外的数据相比，在表现力（例如咳嗽、尖叫、大笑等非语言声音）和声学条件（例如城市、乡村、室内公共场所、体育场）上都缺乏多样性。"
      },
      {
       "id": "s-1-4-5",
       "original": "These models can only generate audio of limited styles and do not capture the correlation between different audio modalities.",
       "zh": "这些模型只能生成有限风格的音频，也无法捕捉不同音频模态之间的相关性。"
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
       "original": "On the other hand, there is a discrepancy between speech and sound/speech generation paradigm.",
       "zh": "另一方面，语音生成与音效/语音生成范式之间存在不一致。"
      },
      {
       "id": "s-1-5-2",
       "original": "Recent speech generation models mostly use example-based control, where an audio sample of the target style is provided and the style control is more precise; in contrast, description-based control is adopted for music and sound generation, where the model can create novel styles based on natural language prompts.",
       "zh": "近期的语音生成模型大多采用示例式控制：提供一段目标风格的音频样本，风格控制较为精确；相比之下，音乐和音效生成采用描述式控制，模型可以根据自然语言提示创造出全新的风格。"
      },
      {
       "id": "s-1-5-3",
       "original": "Both approaches have their strengths and weaknesses, but such a discrepancy prevents development of unified models that enjoy the best of both worlds.",
       "zh": "两种方法各有优劣，但这种范式上的不一致阻碍了兼取两者之长的统一模型的发展。"
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
       "original": "Last but not least, existing sound generation models only provide coarse control such as “a man is speaking” when generating speech.",
       "zh": "最后但同样重要的是，现有音效生成模型在生成语音时只能提供粗略的控制，例如「一个男人在说话」。"
      },
      {
       "id": "s-1-6-2",
       "original": "Existing datasets do not offer finer-grained captions that characterizes vocal styles in greater details, such as “A middle aged woman from the American South is speaking over the phone in a passionate voice.",
       "zh": "现有数据集没有提供更细粒度的字幕来更详细地刻画声线风格，例如「一位来自美国南方、说话带热情的中年女性正在打电话。"
      },
      {
       "id": "s-1-6-3",
       "original": "She speaks in at a fast pace with a high pitch.” Neither do these models enable transcript input to controlling the textual content.",
       "zh": "她语速很快、音调很高。」这些模型也不支持用转写文本来控制生成内容。"
      },
      {
       "id": "s-1-6-4",
       "original": "Hence, these models can only generate mumbling speech.",
       "zh": "因此，这些模型只能生成含混不清的咕哝声般的语音。"
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
       "original": "Due to a lack of consideration in the language-guided generation of speech within a natural setting, designing proper objective evaluation metrics for such universal models remains an open question that has not been fully addressed by prior works.",
       "zh": "由于先前工作对自然场景下以语言引导的语音生成缺乏考虑，为这类通用模型设计合适的客观评测指标仍然是一个未被充分解决的开放问题。"
      },
      {
       "id": "s-1-7-2",
       "original": "In objective evaluation, previous speech-oriented studies Guo et al. (2023); Leng et al. (2023); Yang et al. (2023a) often adopt ad-hoc evaluation metrics (e.g., accuracy of pre-defined attributes), making it challenging to generalize to free-form instructions.",
       "zh": "在客观评测中，以往面向语音的研究 Guo et al. (2023); Leng et al. (2023); Yang et al. (2023a) 往往采用临时性的评测指标（例如预定义属性的准确率），难以推广到自由形式的指令。"
      },
      {
       "id": "s-1-7-3",
       "original": "The joint audio-text embedding network (e.g., CLAP Wu et al. (2023)), widely utilized in text-to-audio generation, is tailored to sound events and frequently falls short in capturing intricate attributes such as accents in speech (see Section 7.1.1).",
       "zh": "在文生音频生成中被广泛使用的音频-文本联合嵌入网络（例如 CLAP Wu et al. (2023)）是为声音事件定制的，经常无法捕捉语音中诸如口音之类的细微属性（见第 7.1.1 节）。"
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
       "original": "Goals and overview of our model: To tackle these problems, there are three key objectives of this work.",
       "zh": "目标与模型概览：为了解决这些问题，本工作有三个关键目标。"
      },
      {
       "id": "s-1-8-2",
       "original": "First, we aim to build a unified model for sound and speech in order to generate a wider variety of real-world audio, which is often a mix of both.",
       "zh": "第一，我们旨在构建一个统一语音与音效的模型，以生成更多样化的真实世界音频——后者往往同时包含两者。"
      },
      {
       "id": "s-1-8-3",
       "original": "Second, we want to improve controllability for creating novel styles through enabling multiple input methods, using either reference audio, text description, or a combination of both.",
       "zh": "第二，我们希望通过支持多种输入方式——参考音频、文字描述或两者的组合——来改进可控性，从而创造全新的风格。"
      },
      {
       "id": "s-1-8-4",
       "original": "Last but not least, to improve model generalization, we want to scale training data and utilize data with different level of supervision.",
       "zh": "最后但同样重要的是，为了改进模型泛化性，我们希望扩大训练数据规模，并利用不同监督程度的数据。"
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
       "original": "To that end, we present the Audiobox framework.",
       "zh": "为此，我们提出 Audiobox 框架。"
      },
      {
       "id": "s-1-9-2",
       "original": "Audiobox is built upon Voicebox (Le et al., 2023) and SpeechFlow (Liu et al., 2023a), which are flow-matching based models for transcript-guided speech generation and self-supervised speech pre-training, respectively.",
       "zh": "Audiobox 构建于 Voicebox（Le et al., 2023）和 SpeechFlow（Liu et al., 2023a）之上，后两者分别是基于流匹配的转写引导语音生成模型和自监督语音预训练模型。"
      },
      {
       "id": "s-1-9-3",
       "original": "To facilitate data scaling and development of downstream models, we first adopt the SpeechFlow pre-training method and pre-train a unified model using large quantities of unlabeled speech, music, and sound effects, referred to as Audiobox SSL (Section 4).",
       "zh": "为促进数据扩展和下游模型的开发，我们首先采用 SpeechFlow 预训练方法，在大量无标注的语音、音乐和音效上预训练一个统一模型，称为 Audiobox SSL（第 4 节）。"
      },
      {
       "id": "s-1-9-4",
       "original": "To validate the effectiveness of the unified pre-trained model, we fine-tune Audiobox SSL for transcript-guided speech generation (Audiobox Speech, Section 5) and description-guided sound generation (Audiobox Sound, Section 6), showing significant improvements from prior studies.",
       "zh": "为验证统一预训练模型的有效性，我们将 Audiobox SSL 分别微调用于转写引导的语音生成（Audiobox Speech，第 5 节）和描述引导的音效生成（Audiobox Sound，第 6 节），相对先前研究取得了显著提升。"
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
       "original": "Combining the best of both worlds, we present Audiobox, the unified model for sound and speech generation in Section 7.",
       "zh": "兼取两者之长，我们在第 7 节提出 Audiobox——统一语音与音效生成的模型。"
      },
      {
       "id": "s-1-10-2",
       "original": "It bridges the gap between sound and speech generation by enabling natural language prompts for holistic style control, and furthers disentangled speech control with voice prompts.",
       "zh": "它通过支持自然语言提示进行整体风格控制，弥合了音效与语音生成之间的鸿沟，并借助声音提示进一步推进了解耦的语音控制。"
      },
      {
       "id": "s-1-10-3",
       "original": "Our joint model achieves unprecedented controllability for universal audio generation and superior versatility with additional capabilities on top of what Voicebox offers.",
       "zh": "我们的联合模型为通用音频生成带来了前所未有的可控性，并在 Voicebox 已具备的能力之上提供了额外的功能与更强的通用性。"
      },
      {
       "id": "s-1-10-4",
       "original": "Audiobox outperforms existing domain specific models on multiple tasks and is close to Audiobox Speech and Audiobox Sound on their corresponding benchmark tasks.",
       "zh": "Audiobox 在多个任务上超越了现有的领域专用模型，并且在相应的基准任务上接近 Audiobox Speech 与 Audiobox Sound 的水平。"
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
       "original": "To facilitate the evaluation of Audiobox and advance research in text-guided universal audio generative models, we propose Joint-CLAP, trained on both sound and speech description data.",
       "zh": "为促进 Audiobox 的评测并推动文本引导的通用音频生成模型研究，我们提出 Joint-CLAP，它在音效描述和语音描述数据上联合训练。"
      },
      {
       "id": "s-1-11-2",
       "original": "In comparison to CLAP Wu et al. (2023), Joint-CLAP significantly outperforms CLAP in retrieving description-based speech, and the text-to-audio similarity exhibits a stronger correlation with human judgment.",
       "zh": "与 CLAP Wu et al. (2023) 相比，Joint-CLAP 在基于描述的语音检索上显著优于 CLAP，其文本-音频相似度与人类判断的相关性也更强。"
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
       "original": "Orthogonally, to improve performance-efficiency trade-off, we integrate Bespoke Solver, a novel post-training inference optimization methods for flow-matching models.",
       "zh": "在与之正交的方向上，为改进性能-效率的权衡，我们集成了 Bespoke Solver——一种针对流匹配模型的新型训练后推理优化方法。"
      },
      {
       "id": "s-1-12-2",
       "original": "With Bespoke Solver, our models are able speed up by 25x compared to using the adaptive step size dopri5 solver without loss of performance.",
       "zh": "借助 Bespoke Solver，我们的模型相对使用自适应步长的 dopri5 求解器能够加速 25 倍，且性能无损失。"
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
       "original": "As generative models become more powerful and essential parts of everyone’s life, it is more important than ever to conduct research responsibly and mitigate potential risks.",
       "zh": "随着生成模型变得日益强大并成为人们生活中不可或缺的一部分，负责任地开展研究并降低潜在风险比以往任何时候都更加重要。"
      },
      {
       "id": "s-1-13-2",
       "original": "We conducted a series of study demonstrating the fairness is achieved through better representing voices of different demographic groups with data scaling.",
       "zh": "我们开展了一系列研究，表明通过数据扩展更好地覆盖不同人口统计群体的声音，可以实现公平性。"
      },
      {
       "id": "s-1-13-3",
       "original": "We also validate the effectiveness of a recent watermarking system (Seamless Communication, 2023), showing the verification is highly effective and robust to adversarial perturbation.",
       "zh": "我们还验证了近期一种水印系统（Seamless Communication, 2023）的有效性，表明其验证机制高度有效，且对对抗性扰动具有鲁棒性。"
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
       "original": "This paper is related to a large body of work on large scale generative modeling for audio.",
       "zh": "本文与大规模音频生成建模的大量工作相关。"
      },
      {
       "id": "s-2-1-2",
       "original": "As the focus of this work is on universality and controllability, we first discuss controllable generation for modality specific models and then compare with recent studies on universal models that can perform multiple tasks or generate audio in multiple modalities and domains.",
       "zh": "由于本工作的重点是通用性与可控性，我们先讨论单模态模型的可控生成，然后与近期可执行多任务或生成多模态、多领域音频的通用模型研究进行对比。"
      },
      {
       "id": "s-2-1-3",
       "original": "For the rest of the paper, we will refer to speech, sound, music as different audio modalities, and within modality style variation, such as read speech, spontaneous speech, conversational speech, as different domains.",
       "zh": "在本文余下部分，我们将语音、音效、音乐称为不同的音频模态，将模态内部的风格差异（如朗读语音、即兴语音、对话语音）称为不同的领域。"
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
       "original": "Large scale in-context text-to-speech generative models: Over the past few months, there has been significant progress in developing large scale speech generative models (Wang et al., 2023a; Shen et al., 2023; Kharitonov et al., 2023; Le et al., 2023; Yang et al., 2023b; Borsos et al., 2023) that are trained on in-the-wild data at the scale of close to 100K hours (Kahn et al., 2019; Pratap et al., 2020) with minimal supervision, which leads to much better generalization for synthesizing unseen speech styles in a zero-shot fashion.",
       "zh": "大规模上下文内文语转换生成模型：过去几个月，大规模语音生成模型（Wang et al., 2023a; Shen et al., 2023; Kharitonov et al., 2023; Le et al., 2023; Yang et al., 2023b; Borsos et al., 2023）发展迅速，它们在接近 100K 小时规模的野外数据（Kahn et al., 2019; Pratap et al., 2020）上以极少监督训练，从而能以零样本方式更好地泛化到未见过的语音风格。"
      },
      {
       "id": "s-2-2-2",
       "original": "These models are in sharp contrast to conventional regression-based models such as Ren et al. (2021); Shen et al. (2017); Łańcucki (2021), which are trained on highly curated datasets (Yamagishi et al., 2019) containing clean audio, limited style variation, and extensive labels (e.g., speaker and emotion labels).",
       "zh": "这些模型与传统的回归式模型（如 Ren et al. (2021); Shen et al. (2017); Łańcucki (2021)）形成鲜明对比——后者在高度精选的数据集（Yamagishi et al., 2019）上训练，数据干净、风格变化有限且带有大量标签（如说话人和情感标签）。"
      }
     ]
    },
    {
     "id": "p-2-3",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-2-3-1",
       "original": "The key to successful data scaling in recent work is the adoption of powerful generative models that can capture highly stochastic input-output relationships.",
       "zh": "近期工作成功实现数据扩展的关键，在于采用了能捕捉高度随机的输入-输出关系的强大生成模型。"
      },
      {
       "id": "s-2-3-2",
       "original": "For example, VALL-E (Wang et al., 2023a) adopt the token-based autoregressive language modeling approach, which converts speech into discrete tokens with a neural codec model (Défossez et al., 2022) and formulate text-to-speech (TTS) as a conditional language modeling problem given a transcript and an audio prompt (the first few seconds of the target speech).",
       "zh": "例如，VALL-E（Wang et al., 2023a）采用基于 token 的自回归语言建模方法，用神经 codec 模型（Défossez et al., 2022）将语音转换为离散 token，并将文语转换（TTS）形式化为给定转写和音频提示（目标语音的前几秒）的条件语言建模问题。"
      },
      {
       "id": "s-2-3-3",
       "original": "NaturalSpeech2 (Shen et al., 2023) and Voicebox (Le et al., 2023) adopt non-autoregressive diffusion (Ho et al., 2020) and conditional flow-matching models (Lipman et al., 2023).",
       "zh": "NaturalSpeech2（Shen et al., 2023）和 Voicebox（Le et al., 2023）则采用非自回归扩散模型（Ho et al., 2020）和条件流匹配模型（Lipman et al., 2023）。"
      },
      {
       "id": "s-2-3-4",
       "original": "Given a transcript and an audio context (the audio surrounding the target speech), these models iteratively transform a noise sampled from a simple prior to speech, represented as learned latent features or mel spectrograms.",
       "zh": "给定转写和音频上下文（目标语音周围的音频），这些模型将从简单先验分布采样的噪声迭代地转换为语音，语音以学习到的潜特征或 Mel 频谱图表示。"
      }
     ]
    },
    {
     "id": "p-2-4",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-2-4-1",
       "original": "At the high level, VALL-E performs transcript-guided speech continuation while NaturalSpeech2 and Voicebox perform transcript-guided speech infilling.",
       "zh": "从高层看，VALL-E 执行转写引导的语音续写，而 NaturalSpeech2 与 Voicebox 执行转写引导的语音填充。"
      },
      {
       "id": "s-2-4-2",
       "original": "These models are trained with only transcript supervision, which facilitates data scaling.",
       "zh": "这些模型仅使用转写监督进行训练，这有利于数据扩展。"
      },
      {
       "id": "s-2-4-3",
       "original": "The style of the generated audio is controlled through the audio prompt or audio context.",
       "zh": "生成音频的风格通过音频提示或音频上下文来控制。"
      },
      {
       "id": "s-2-4-4",
       "original": "Note that the style refers to not only voice, but everything other than transcript, including prosody, emotion, acoustic environment, channel, noise, etc. This can be understood as a form of in-context learning: because the audio style tends to be coherent within an utterance, these models learn to infer the style of the target based on its context.",
       "zh": "注意，这里的风格不仅指声线，还包括转写之外的一切：韵律、情感、声学环境、信道、噪声等。这可以理解为一种上下文学习：由于音频风格在一条话语内往往是连贯的，这些模型学会根据上下文推断目标的风格。"
      },
      {
       "id": "s-2-4-5",
       "original": "In turn, it enables generalization to unseen style, such that speech of any style can be generated by conditioning on an audio prompt/context of the desired style.",
       "zh": "反过来，这使得模型能够泛化到未见过的风格——只要以期望风格的音频提示/上下文为条件，就能生成任意风格的语音。"
      }
     ]
    },
    {
     "id": "p-2-5",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-2-5-1",
       "original": "While the in-context style transfer paradigm is powerful, it also possesses several limitations in terms of controllability.",
       "zh": "虽然上下文内风格迁移范式很强大，但它在可控性上也有若干局限。"
      },
      {
       "id": "s-2-5-2",
       "original": "First, audio prompt is the only input mechanism of controlling the audio style.",
       "zh": "首先，音频提示是控制音频风格的唯一输入机制。"
      },
      {
       "id": "s-2-5-3",
       "original": "Users cannot provide a descriptive text, such as “a young man speaking with a happy tone in an auditorium” to create diverse speech matching the description, whereas this feature is commonly supported and widely enjoyed for image (Ramesh et al., 2022; Rombach et al., 2022), music (Agostinelli et al., 2023), and sound (Kreuk et al., 2022) generation.",
       "zh": "用户无法提供描述性文字（例如「一个年轻人在礼堂里用愉快的语气说话」）来创造符合描述的多样化语音，而这一功能在图像（Ramesh et al., 2022; Rombach et al., 2022）、音乐（Agostinelli et al., 2023）和音效（Kreuk et al., 2022）生成中已被普遍支持并广受喜爱。"
      },
      {
       "id": "s-2-5-4",
       "original": "Second, disentangled style control is not enabled with the paradigm, where voice and other attributes, such as emotion and acoustic condition, can be controlled independently.",
       "zh": "其次，该范式不支持解耦的风格控制，即无法独立控制声线与其他属性（如情感和声学条件）。"
      },
      {
       "id": "s-2-5-5",
       "original": "This feature is often desired as exemplified in earlier work where emotion and voice can be controlled independently (Hsu et al., 2019; Kulkarni et al., 2021; Nguyen et al., 2023).",
       "zh": "这一功能常常是人们所需要的，早期工作已展示了情感与声线可被独立控制（Hsu et al., 2019; Kulkarni et al., 2021; Nguyen et al., 2023）。"
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
       "original": "Natural language style prompting for controllable speech generation: Studies on controllable speech generation aims to develop models which can generate speech of many different domains and provide input methods for disentangled, flexible, and accurate control.",
       "zh": "用于可控语音生成的自然语言风格提示：可控语音生成的研究旨在开发能生成多种领域语音的模型，并提供解耦、灵活、精确的输入控制方式。"
      },
      {
       "id": "s-2-6-2",
       "original": "Earlier models often enable control over only a small number of attributes (e.g., speaker and emotion) with a fixed number of options (e.g., happy/sad/neutral for emotion) through one-hot vectors (Nguyen et al., 2023).",
       "zh": "早期模型通常只支持少量属性（如说话人和情感）的有限选项控制（如情感的开心/悲伤/中性），通过 one-hot 向量实现（Nguyen et al., 2023）。"
      },
      {
       "id": "s-2-6-3",
       "original": "Such methods are difficult to generalize as it is difficult to represent many speech attributes, such as audio quality, acoustic environment, with one-hot vectors.",
       "zh": "这类方法难以泛化，因为许多语音属性（如音频质量、声学环境）很难用 one-hot 向量表示。"
      },
      {
       "id": "s-2-6-4",
       "original": "Nor could information such as “a speaker starts with a slow pace and speeds up” be accurately represented.",
       "zh": "「说话人先慢后快」之类的信息也无法被准确表达。"
      },
      {
       "id": "s-2-6-5",
       "original": "In-context TTS (Wang et al., 2023a) models greatly improves domain coverage, but has the limitation on flexibility and disentangled control described above.",
       "zh": "上下文内 TTS（Wang et al., 2023a）模型大幅提升了领域覆盖，但存在上述灵活性和解耦控制方面的局限。"
      }
     ]
    },
    {
     "id": "p-2-7",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-2-7-1",
       "original": "To address the limitation, several recent studies also propose to control speech style through natural language prompts.",
       "zh": "为解决这一局限，近期也有若干研究提出通过自然语言提示控制语音风格。"
      },
      {
       "id": "s-2-7-2",
       "original": "InstructTTS (Yang et al., 2023a) and PromptTTS (Guo et al., 2023) are the two earliest works.",
       "zh": "InstructTTS（Yang et al., 2023a）和 PromptTTS（Guo et al., 2023）是最早的两项工作。"
      },
      {
       "id": "s-2-7-3",
       "original": "They are trained on small scale data with mainly emotion variation and limited number of speakers (7 for InstructTTS and 2 for PromptTTS synthetic setup).",
       "zh": "它们在主要以情感变化为主的小规模数据上训练，说话人数量有限（InstructTTS 为 7 人，PromptTTS 的合成设置为 2 人）。"
      },
      {
       "id": "s-2-7-4",
       "original": "In particular, InstructTTS collects human descriptions for 44 hours of speech focusing on only the emotion and a separate speaker ID input is used as model input.",
       "zh": "具体来说，InstructTTS 为 44 小时语音收集了人工描述，仅聚焦情感，且模型输入中还使用了单独的说话人 ID。"
      },
      {
       "id": "s-2-7-5",
       "original": "Therefore, the natural language prompt is only used for controlling the emotion.",
       "zh": "因此，自然语言提示只用于控制情感。"
      },
      {
       "id": "s-2-7-6",
       "original": "PromptTTS recruits human annotators to write descriptions to given four to five attribute labels (emotion, gender, volume, speed, and pitch; emotion label is not available for the real data), and trains models on 2-voice synthetic data as well as LibriTTS (Zen et al., 2019).",
       "zh": "PromptTTS 招募人工标注者根据给定的四到五个属性标签（情感、性别、音量、语速和音调；真实数据无情感标签）撰写描述，并在 2 人合成数据以及 LibriTTS（Zen et al., 2019）上训练模型。"
      },
      {
       "id": "s-2-7-7",
       "original": "Because the descriptions of PromptTTS are created based on attribute labels instead of speech samples, these descriptions do not contain additional information compared to the labels and theoretically does not enable finer grained attribute control.",
       "zh": "由于 PromptTTS 的描述是基于属性标签而非语音样本撰写的，这些描述相比标签并不包含额外信息，理论上无法实现更细粒度的属性控制。"
      }
     ]
    },
    {
     "id": "p-2-8",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-2-8-1",
       "original": "PromptTTS2 (Leng et al., 2023) is a concurrent work which improves upon PromptTTS in two aspects.",
       "zh": "PromptTTS2（Leng et al., 2023）是一项同期工作，在两个方面改进了 PromptTTS。"
      },
      {
       "id": "s-2-8-2",
       "original": "First, it proposes a automatic description creation pipeline based on speech attribute labeler and large language models, which enables scaling to training on 44K hours of audiobook data.",
       "zh": "第一，它提出了基于语音属性标注器和大语言模型的自动描述生成流水线，使训练规模扩展到 44K 小时有声书数据。"
      },
      {
       "id": "s-2-8-3",
       "original": "Second, PromptTTS2 adopts a diffusion model to capture the one-to-many relationship given input (transcript and description), whereas PromptTTS adopts a regression model assuming deterministic mapping.",
       "zh": "第二，PromptTTS2 采用扩散模型来捕捉给定输入（转写和描述）的一对多关系，而 PromptTTS 采用假设确定性映射的回归模型。"
      },
      {
       "id": "s-2-8-4",
       "original": "Nevertheless, similar to PromptTTS, all the descriptions PromptTTS2 create are derived from four categorical attributes with two to three options each (total 54 combinations).",
       "zh": "然而，与 PromptTTS 类似，PromptTTS2 生成的所有描述都源自 4 个类别属性、每个属性 2 到 3 个选项（共 54 种组合）。"
      },
      {
       "id": "s-2-8-5",
       "original": "Hence, PromptTTS2 does not provide finer grained control than PromptTTS and has limited coverage on the attributes it can control via natural language prompt.",
       "zh": "因此，PromptTTS2 并未提供比 PromptTTS 更细粒度的控制，其可通过自然语言提示控制的属性覆盖也有限。"
      }
     ]
    },
    {
     "id": "p-2-9",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-2-9-1",
       "original": "Large scale general-domain models for sound and music generation: Text-to-sound (Kreuk et al., 2022) and text-to-music (Schneider et al., 2023) are the emerging paradigms for general-domain sound and music generation, in contrast to earlier studies that generate finite sound effects (Donahue et al., 2018) or instruments (Huang et al., 2018).",
       "zh": "大规模通用领域音效与音乐生成模型：文生音效（Kreuk et al., 2022）和文生音乐（Schneider et al., 2023）是通用领域音效与音乐生成的新兴范式，与早期生成有限音效（Donahue et al., 2018）或乐器（Huang et al., 2018）的研究形成对比。"
      },
      {
       "id": "s-2-9-2",
       "original": "The text here refers to a holistic description of the target audio, such as “A child shouts while an emergency vehicle siren sounds with the horn blowing.” (Kim et al., 2019) and “The low quality recording features a ballad song that contains sustained strings... It sounds sad and soulful, like something you would hear at Sunday services.” for music (Agostinelli et al., 2023).",
       "zh": "这里的文本指对目标音频的整体描述，例如「一个孩子在大喊，同时一辆应急车辆鸣着警笛、按着喇叭。」（Kim et al., 2019），以及音乐领域的「这段低质量录音是一首民谣，包含持续的弦乐……听起来悲伤而深情，像周日礼拜时会听到的音乐。」（Agostinelli et al., 2023）。"
      }
     ]
    },
    {
     "id": "p-2-10",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-2-10-1",
       "original": "Similar to speech generation, the recent progress can be largely attributed to the advancement in generative models for continuous data (Ho et al., 2020; Huang et al., 2023a; Liu et al., 2023b) and audio tokenizers (Zeghidour et al., 2022; Défossez et al., 2022; Kreuk et al., 2022; Copet et al., 2023; Agostinelli et al., 2023), which enables modeling methods capable of capturing highly stochastic conditional distributions of audio given descriptions for general domain sound/music data.",
       "zh": "与语音生成类似，近期的进展在很大程度上可归因于连续数据生成模型（Ho et al., 2020; Huang et al., 2023a; Liu et al., 2023b）和音频分词器（Zeghidour et al., 2022; Défossez et al., 2022; Kreuk et al., 2022; Copet et al., 2023; Agostinelli et al., 2023）的进步，使得建模方法能够捕捉给定描述时通用领域音效/音乐数据高度随机的条件分布。"
      }
     ]
    },
    {
     "id": "p-2-11",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-2-11-1",
       "original": "A key limitation of these models is the ability to control transcript and generate intelligible speech or vocals.",
       "zh": "这些模型的一个关键局限在于控制转写文本、生成可懂语音或人声的能力。"
      },
      {
       "id": "s-2-11-2",
       "original": "These models only take a description as input, which does not specify the transcript when speech is presented.",
       "zh": "这些模型只接受描述作为输入，当出现语音时，描述并不指定转写文本。"
      },
      {
       "id": "s-2-11-3",
       "original": "Hence, generating samples with prompts like “a person speaking” often results in speech-like mumbling sound with unintelligible content (Liu et al., 2023b).",
       "zh": "因此，用「一个人在说话」这类提示生成的样本往往是内容不可懂的、类似语音的咕哝声（Liu et al., 2023b）。"
      },
      {
       "id": "s-2-11-4",
       "original": "In other words, these models does not offer an input for users to control transcript, and have not learned language models that allow it to construct and synthesize meaningful sentences given only the description.",
       "zh": "换言之，这些模型没有为用户提供控制转写文本的输入，也没有学到仅凭描述就能构造并合成有意义句子的语言模型。"
      }
     ]
    },
    {
     "id": "p-2-12",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-2-12-1",
       "original": "Unified model for audio generation: With the great progress made in developing general-domain models for each audio modality, researchers also start exploring unified model that can generate audio beyond a single modality and perform multiple generative tasks.",
       "zh": "音频生成的统一模型：随着各音频模态的通用领域模型取得巨大进展，研究者也开始探索能生成超越单一模态的音频、并执行多种生成任务的统一模型。"
      },
      {
       "id": "s-2-12-2",
       "original": "Such a model could potentially learn from different sources of supervision and benefit from knowledge transfer across tasks.",
       "zh": "这样的模型有潜力从不同来源的监督中学习，并受益于跨任务的知识迁移。"
      },
      {
       "id": "s-2-12-3",
       "original": "There are three concurrent studies that are related to this work.",
       "zh": "有三项同期研究与本工作相关。"
      }
     ]
    },
    {
     "id": "p-2-13",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-2-13-1",
       "original": "UniAudio (Yang et al., 2023b) focuses on building a single model that can perform multiple tasks, including text-to-music, text-to-sound, and in-context TTS and natural language style prompted TTS.",
       "zh": "UniAudio（Yang et al., 2023b）聚焦于构建能执行多种任务的单一模型，包括文生音乐、文生音效、上下文内 TTS 和自然语言风格提示 TTS。"
      },
      {
       "id": "s-2-13-2",
       "original": "It follows the VALL-E (Wang et al., 2023a) framework, which tokenizes audio and serializes conditioning input and output audio tokens for training a conditional token-based language model.",
       "zh": "它遵循 VALL-E（Wang et al., 2023a）框架：将音频 token 化，把条件输入与输出音频 token 序列化，训练一个基于 token 的条件语言模型。"
      },
      {
       "id": "s-2-13-3",
       "original": "It is trained on the same speech descriptions collected by PromptTTS, which inherits the same limitations in terms what attributes and how granular they can be controlled through natural language prompts as discussed earlier.",
       "zh": "它在 PromptTTS 收集的同一批语音描述上训练，因此继承了前文讨论过的局限：哪些属性、以何种粒度能通过自然语言提示控制。"
      }
     ]
    },
    {
     "id": "p-2-14",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-2-14-1",
       "original": "VoiceLDM (Lee et al., 2023) is the most related work.",
       "zh": "VoiceLDM（Lee et al., 2023）是与我们最相关的工作。"
      },
      {
       "id": "s-2-14-2",
       "original": "It introduces a transcript input to AudioLDM (Liu et al., 2023b) and controls style through text description embedded with a frozen Contrastive Language-Audio Pre-training (CLAP) model (Wu et al., 2023).",
       "zh": "它在 AudioLDM（Liu et al., 2023b）中引入转写输入，并通过冻结的对比语言-音频预训练（CLAP）模型（Wu et al., 2023）嵌入的文本描述来控制风格。"
      },
      {
       "id": "s-2-14-3",
       "original": "During training, CLAP embedding from audio is used for conditioning.",
       "zh": "训练时使用来自音频的 CLAP 嵌入作为条件。"
      },
      {
       "id": "s-2-14-4",
       "original": "VoiceLDM is trained on datasets with rich acoustic variation, and hence is capable of generating speech in diverse acoustic environments.",
       "zh": "VoiceLDM 在声学变化丰富的数据集上训练，因此能生成多样声学环境下的语音。"
      },
      {
       "id": "s-2-14-5",
       "original": "However, the performance in terms of controllability is bounded by the pre-trained CLAP model.",
       "zh": "然而，其可控性表现受限于预训练 CLAP 模型。"
      },
      {
       "id": "s-2-14-6",
       "original": "Since the CLAP model are trained on audio-caption pairs focus on sound events, the embedding only encodes very coarse information regarding speech attributes.",
       "zh": "由于 CLAP 模型是在聚焦声音事件的音频-字幕对上训练的，其嵌入只编码了非常粗略的语音属性信息。"
      },
      {
       "id": "s-2-14-7",
       "original": "Furthermore, VoiceLDM also follows the sound generation paradigm which always generate audio clips of a fixed size (10 seconds), which is not ideal for speech generation that have variable length in general.",
       "zh": "此外，VoiceLDM 也遵循音效生成范式，总是生成固定长度（10 秒）的音频片段，这对通常长度可变的语音生成并不理想。"
      },
      {
       "id": "s-2-14-8",
       "original": "Finally, despite that the model can generate non-speech sounds when conditioned on empty transcripts, the performance of sound generation lags behind state-of-the-art models by a large margin.",
       "zh": "最后，尽管该模型在以空转写为条件时能生成非语音声音，但其音效生成性能与 SOTA 模型仍有很大差距。"
      }
     ]
    },
    {
     "id": "p-2-15",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-2-15-1",
       "original": "AudioLDM 2 (Liu et al., 2023c) presents a two-stage model that is applicable to speech, sound, and music generation.",
       "zh": "AudioLDM 2（Liu et al., 2023c）提出了一个可用于语音、音效和音乐生成的两阶段模型。"
      },
      {
       "id": "s-2-15-2",
       "original": "It is comprised of a deterministic auto-regressive model that maps conditioning input (e.g., CLAP-embedded audio, description, transcript, image) to semantic features sequence, and a diffusion model which mapping semantic to acoustic features.",
       "zh": "它由一个确定性的自回归模型（将条件输入——如 CLAP 嵌入的音频、描述、转写、图像——映射为语义特征序列）和一个将语义特征映射为声学特征的扩散模型组成。"
      },
      {
       "id": "s-2-15-3",
       "original": "The structure is similar to SPEAR-TTS (Kharitonov et al., 2023) but with different modeling methods and representations for each stage.",
       "zh": "该结构与 SPEAR-TTS（Kharitonov et al., 2023）类似，但每个阶段采用不同的建模方法和表示。"
      },
      {
       "id": "s-2-15-4",
       "original": "Hence, similarly it can leverage unlabeled audio for training the second stage model.",
       "zh": "因此，它同样可以利用无标注音频训练第二阶段模型。"
      },
      {
       "id": "s-2-15-5",
       "original": "While AudioLDM 2 presents a unified framework, empirically separate models for speech and sound/music generation are trained, as the authors noted that different model architecture hyperparameters are required for different modalities.",
       "zh": "尽管 AudioLDM 2 提出了统一框架，但实际上仍分别为语音和音效/音乐生成训练了独立模型，因为作者指出不同模态需要不同的模型架构超参数。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-3",
   "num": "3",
   "level": 1,
   "page": 6,
   "title": {
    "original": "Background",
    "zh": "背景"
   },
   "blocks": [
    {
     "id": "p-3-1",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-3-1-1",
       "original": "This work is heavily built upon the training objective and model architecture of Voicebox (Le et al., 2023), and the self-supervised objective of SpeechFlow (Liu et al., 2023a).",
       "zh": "本工作在 Voicebox（Le et al., 2023）的训练目标和模型架构以及 SpeechFlow（Liu et al., 2023a）的自监督目标基础之上大力构建。"
      },
      {
       "id": "s-3-1-2",
       "original": "Both studies adopt conditional flowmatching (Lipman et al., 2023) as the modeling backbone, which is a powerful non-autoregressive generative model for continuous data.",
       "zh": "这两项研究都采用条件流匹配（Lipman et al., 2023）作为建模骨架，这是一种面向连续数据的强大非自回归生成模型。"
      },
      {
       "id": "s-3-1-3",
       "original": "We provide a technical overview here.",
       "zh": "我们在此提供技术概览。"
      }
     ]
    },
    {
     "id": "p-3-2",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-3-2-1",
       "original": "Conditional flow-matching: Conditional flow-matching (FM) (Lipman et al., 2023) is a novel generative modeling method derived from the continuous normalizing flow (Chen et al., 2018) framework.",
       "zh": "条件流匹配：条件流匹配（FM）（Lipman et al., 2023）是一种源自连续归一化流（Chen et al., 2018）框架的新型生成建模方法。"
      },
      {
       "id": "s-3-2-2",
       "original": "It models the paths that transform samples from a simple prior distribution p0 to the corresponding samples from the complex data distribution p1 in a continuous manner.",
       "zh": "它以连续方式建模将简单先验分布 p0 中的样本变换为复杂数据分布 p1 中对应样本的路径。"
      },
      {
       "id": "s-3-2-3",
       "original": "We use flow step t to describe the progress of transformation, where the prior is at t = 0 and the data is at t = 1.",
       "zh": "我们用流步 t 描述变换进度，先验位于 t = 0，数据位于 t = 1。"
      }
     ]
    },
    {
     "id": "p-3-3",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-3-3-1",
       "original": "The training objective of FM resembles the objective diffusion models (Ho et al., 2020): during training, given a sample x1 drawn from the data distribution, a random flow step t ∼U[0, 1] is sampled, and a noisy version of the data xt as well as its derivative vt = dxt/dt for the chosen condition path are computed.",
       "zh": "FM 的训练目标与扩散模型（Ho et al., 2020）的目标相似：训练时，给定从数据分布采样的样本 x1，随机采样一个流步 t ∼U[0, 1]，并计算所选条件路径下带噪数据 xt 及其导数 vt = dxt/dt。"
      },
      {
       "id": "s-3-3-2",
       "original": "A FM model u is trained to predict the derivative vt given t and xt.",
       "zh": "训练一个 FM 模型 u，在给定 t 和 xt 的条件下预测导数 vt。"
      },
      {
       "id": "s-3-3-3",
       "original": "During inference, to draw a sample x1 from the learned data distribution, a sample x0 is first drawn from the prior distribution, and then the ordinary differential equation (ODE) solver is used to estimate x1 given x0 and the derivative parameterized by the FM model through integration.",
       "zh": "推理时，为从学到的数据分布中采样 x1，先从先验分布采样 x0，然后使用常微分方程（ODE）求解器，通过积分在 x0 和由 FM 模型参数化的导数下估计 x1。"
      },
      {
       "id": "s-3-3-4",
       "original": "Trade-off between accuracy of x1 estimation and speed can be flexibly selected by configuring the ODE solver.",
       "zh": "通过配置 ODE 求解器，可以灵活地选择 x1 估计精度与速度之间的权衡。"
      }
     ]
    },
    {
     "id": "p-3-4",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-3-4-1",
       "original": "At a high level, FM subsumes diffusion models, which correspond to specific paths of the transformation.",
       "zh": "从高层看，FM 涵盖了扩散模型——扩散对应于变换中特定的路径。"
      },
      {
       "id": "s-3-4-2",
       "original": "The authors of Lipman et al. (2023) presented an alternative called optimal transport (OT), which are conditional paths with constant directions and speeds.",
       "zh": "Lipman et al. (2023) 的作者提出了另一种称为最优传输（OT）的路径，即方向和速度恒定的条件路径。"
      },
      {
       "id": "s-3-4-3",
       "original": "It is arguably easier to learn and can be more accurately estimated by the ODE solver with fewer steps.",
       "zh": "它可以说更容易学习，并且能用更少的步数被 ODE 求解器更准确地估计。"
      },
      {
       "id": "s-3-4-4",
       "original": "The OT path results in better training and inference efficiency as empirically verified in Lipman et al. (2023) and Le et al. (2023).",
       "zh": "Lipman et al. (2023) 与 Le et al. (2023) 的经验验证表明，OT 路径带来了更好的训练和推理效率。"
      }
     ]
    },
    {
     "id": "p-3-5",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-3-5-1",
       "original": "Given a sample x1 and a flow-step t, with the OT conditional path we have xt = (1 −(1 −σmin)t)x0 + tx1 and vt = x1 −(1 −σmin)x0, where x0 is drawn from the prior distribution N(0, I) and σmin is a small value (10−5).",
       "zh": "给定样本 x1 与流步 t，采用 OT 条件路径时有 xt = (1 −(1 −σmin)t)x0 + tx1 与 vt = x1 −(1 −σmin)x0，其中 x0 从先验分布 N(0, I) 采样，σmin 是一个很小的值（10−5）。"
      },
      {
       "id": "s-3-5-2",
       "original": "The FM model u minimizes: Et,x1,x0||u(xt, t) −vt||2.",
       "zh": "FM 模型 u 最小化：Et,x1,x0||u(xt, t) −vt||2。"
      }
     ]
    },
    {
     "id": "eq-3-1",
     "type": "equation",
     "page": 6,
     "original": "(1)"
    },
    {
     "id": "p-3-6",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-3-6-1",
       "original": "Voicebox: Voicebox (Le et al., 2023) is a conditional generative model based on FM which additionally conditions on frame-aligned phonetic transcript and masked audio for audio prediction, and conditions on phonetic transcript and masked duration sequence for phone duration prediction.",
       "zh": "(1) Voicebox：Voicebox（Le et al., 2023）是一个基于 FM 的条件生成模型，额外以帧对齐的音素转写和掩蔽音频为条件预测音频，并以音素转写和掩蔽时长序列为条件预测音素时长。"
      },
      {
       "id": "s-3-6-2",
       "original": "Audio is represented as 80-dimensional Mel spectrograms and are converted to waveform using a HiFi-GAN vocoder (Kong et al., 2020).",
       "zh": "音频表示为 80 维 Mel 频谱图，并用 HiFi-GAN 声码器（Kong et al., 2020）转换为波形。"
      },
      {
       "id": "s-3-6-3",
       "original": "Duration sequence denotes the number of frames for each phoneme in the transcript.",
       "zh": "时长序列表示转写中每个音素占用的帧数。"
      }
     ]
    },
    {
     "id": "p-3-7",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-3-7-1",
       "original": "Voicebox adopts the Transformer (Vaswani et al., 2017) model with U-Net (Ronneberger et al., 2015) connections.",
       "zh": "Voicebox 采用带 U-Net（Ronneberger et al., 2015）连接的 Transformer（Vaswani et al., 2017）模型。"
      },
      {
       "id": "s-3-7-2",
       "original": "Masked spectrogram (or masked duration), frame-aligned phone embeddings (or phone embeddings), and noisy audio xt (or noisy duration) are concatenated along the channel dimension and projected to the Transformer feature dimension.",
       "zh": "掩蔽频谱图（或掩蔽时长）、帧对齐的音素嵌入（或音素嵌入）与带噪音频 xt（或带噪时长）沿信道维度拼接，并投影到 Transformer 的特征维度。"
      },
      {
       "id": "s-3-7-3",
       "original": "The flow step sinusoidal embedding is then concatenated with the project features along the time dimension, passed as input to the Transformer model.",
       "zh": "然后将流步的正弦嵌入与投影特征沿时间维度拼接，作为 Transformer 模型的输入。"
      },
      {
       "id": "s-3-7-4",
       "original": "The Transformer output is then projected to 80 dimensions (or 1 dimension for duration) and predicts the derivative vt.",
       "zh": "Transformer 输出再投影到 80 维（时长为 1 维），预测导数 vt。"
      }
     ]
    },
    {
     "id": "p-3-8",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-3-8-1",
       "original": "It is a supervised model trained on 60K hours of audiobooks and achieves state-of-the-art performance on in-context text-to-speech synthesis that can mimic the audio style given a three second audio prompt.",
       "zh": "它是一个在 60K 小时有声书上训练的监督模型，在上下文内文语转换上实现了 SOTA 性能——给定 3 秒音频提示即可模仿其音频风格。"
      },
      {
       "id": "s-3-8-2",
       "original": "It is also high versatile due to the generality of transcript-guided infilling, where the model can perform transient noise removal, diverse style generation, speech editing, cross-lingual style transfer by simply forming transcript and audio inputs differently.",
       "zh": "它还高度通用：得益于转写引导填充的通用性，只需以不同方式构造转写和音频输入，模型即可执行瞬态噪声移除、多样化风格生成、语音编辑和跨语言风格迁移。"
      }
     ]
    },
    {
     "id": "p-3-9",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-3-9-1",
       "original": "SpeechFlow: SpeechFlow (Liu et al., 2023a) is a self-supervised framework based on FM with learns to infill speech given the audio context.",
       "zh": "SpeechFlow：SpeechFlow（Liu et al., 2023a）是一个基于 FM 的自监督框架，学习在给定音频上下文的条件下填充语音。"
      },
      {
       "id": "s-3-9-2",
       "original": "This is equivalent to Voicebox without conditioning on transcripts.",
       "zh": "这相当于不以转写为条件的 Voicebox。"
      },
      {
       "id": "s-3-9-3",
       "original": "The self-supervised objective tackles label scarcity issues and enables the model to learn from large quantities of unlabeled speech the distribution of speech as well as the correlation between temporal segments within an utterance.",
       "zh": "自监督目标解决了标签稀缺问题，使模型能从大量无标注语音中学习语音的分布以及话语内时间片段之间的相关性。"
      }
     ]
    },
    {
     "id": "p-3-10",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-3-10-1",
       "original": "Fine-tuning SpeechFlow with the same transcript-guided infilling objective as Voicebox shows superior performance and sample efficiency, matching style similarity of VALL-E (Wang et al., 2023a) with only 10 hours of labeled data.",
       "zh": "用与 Voicebox 相同的转写引导填充目标微调 SpeechFlow，展现出更优的性能和样本效率——仅用 10 小时标注数据即可匹配 VALL-E（Wang et al., 2023a）的风格相似度。"
      },
      {
       "id": "s-3-10-2",
       "original": "The pre-trained model also demonstrates promising improvements on other speech generation tasks, including source separation and speech enhancement.",
       "zh": "预训练模型在其他语音生成任务（包括源分离和语音增强）上也展现出可观的提升。"
      },
      {
       "id": "s-3-10-3",
       "original": "It also enables parameter efficient fine-tuning like LoRA (Hu et al., 2021) and fine-tuning with a much lower batch size, demonstrating the efficiency and reusability of self-supervised pre-train models.",
       "zh": "它还支持 LoRA（Hu et al., 2021）等参数高效微调，并可用低得多的批大小微调，展示了自监督预训练模型的效率与可复用性。"
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
    "original": "Audiobox SSL: Self-supervised Generative Audio Pre-training",
    "zh": "Audiobox SSL：自监督生成式音频预训练"
   },
   "blocks": [
    {
     "id": "p-4-1",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-4-1-1",
       "original": "Our first step is to develop Audiobox SSL, a foundation model that can be fine-tuned for any downstream audio generation tasks.",
       "zh": "我们的第一步是开发 Audiobox SSL——一个可以为任何下游音频生成任务微调的基础模型。"
      },
      {
       "id": "s-4-1-2",
       "original": "Because labeled data are not always available or of high quality, and data scaling is the key to generalization, our strategy is to train this foundation model using audio without any supervision, such as transcripts, captions, or attribute labels, which can be found in larger quantities.",
       "zh": "由于标注数据并不总是可得或质量不高，而数据扩展是泛化的关键，我们的策略是在完全不带监督（如转写、字幕或属性标签）的音频上训练这一基础模型——这类音频可以获取更大的规模。"
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
    "original": "Method",
    "zh": "方法"
   },
   "blocks": [
    {
     "id": "p-4-1-1",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-4-1-1-1",
       "original": "We adapt Audiobox SSL from SpeechFlow, which was originally designed for generative speech pre-training.",
       "zh": "我们将 Audiobox SSL 从 SpeechFlow 改造而来，后者最初是为生成式语音预训练设计的。"
      },
      {
       "id": "s-4-1-1-2",
       "original": "The same learning objective is also meaningful for general audio: through learning to infill, the model can also capture the temporal relationship of audio events (e.g., clock ticking sound at fixed time interval, approaching train producing sounds with increasing volume), and learns the distribution of general audio.",
       "zh": "同样的学习目标对通用音频也有意义：通过学习填充，模型还能捕捉音频事件的时间关系（例如时钟以固定间隔滴答作响、驶近的火车音量逐渐增大），并学习通用音频的分布。"
      },
      {
       "id": "s-4-1-1-3",
       "original": "Therefore, during supervised fine-tuning, a model does not need to learn what a natural audio sample sounds like, but only needs to learn aligning the label with the corresponding mode of distribution.",
       "zh": "因此，在监督微调时，模型无需再学习自然音频样本听起来是什么样的，只需学习将标签与分布中对应的模式对齐。"
      }
     ]
    },
    {
     "id": "p-4-1-2",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-4-1-2-1",
       "original": "The original SpeechFlow model is trained to predict spectrograms and uses a HiFi-GAN model to generate waveform given spectrogram.",
       "zh": "原始的 SpeechFlow 模型被训练为预测频谱图，并使用 HiFi-GAN 模型由频谱图生成波形。"
      },
      {
       "id": "s-4-1-2-2",
       "original": "However, HiFi-GAN does not generalize well to non-speech audio such as sound or music (Lee et al., 2022).",
       "zh": "然而，HiFi-GAN 对音效或音乐等非语音音频泛化不佳（Lee et al., 2022）。"
      },
      {
       "id": "s-4-1-2-3",
       "original": "To tackle that, we train the model to predict latent features learned by an autoencoder.",
       "zh": "为解决这一问题，我们训练模型预测由自编码器学到的潜特征。"
      },
      {
       "id": "s-4-1-2-4",
       "original": "In particular, we use the dense Encodec (Défossez et al., 2022) features which are extracted prior to the residual quantization layer, which demonstrates good resynthesis quality in various audio modalities and has been adopted for sound and music generation (Kreuk et al., 2022; Copet et al., 2023).",
       "zh": "具体而言，我们使用稠密 Encodec（Défossez et al., 2022）特征——即在残差量化层之前提取的特征，它在多种音频模态上都展现出良好的重合成质量，并已被用于音效和音乐生成（Kreuk et al., 2022; Copet et al., 2023）。"
      },
      {
       "id": "s-4-1-2-5",
       "original": "This is similar to the latent diffusion framework (Rombach et al., 2022) that is also adopted in NaturalSpeech2 (Shen et al.,",
       "zh": "这类似于潜扩散框架（Rombach et al., 2022），NaturalSpeech2（Shen et al., 2023）也采用了该框架。"
      }
     ]
    },
    {
     "id": "eq-4-1-1",
     "type": "equation",
     "page": 7,
     "original": "2023)."
    },
    {
     "id": "p-4-1-3",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-4-1-3-1",
       "original": "During training, the model is conditioned on fully masked features with probability pcond.",
       "zh": "训练时，模型以概率 pcond 以全掩蔽特征为条件。"
      },
      {
       "id": "s-4-1-3-2",
       "original": "With probability 1 −pcond, a subset (nmask) of frames are masked with minimum span length lmask.",
       "zh": "以概率 1 −pcond，掩蔽一个子集（nmask）的帧，最小掩蔽片段长度为 lmask。"
      },
      {
       "id": "s-4-1-3-3",
       "original": "The FM loss is computed only on masked frames.",
       "zh": "FM 损失只在被掩蔽的帧上计算。"
      },
      {
       "id": "s-4-1-3-4",
       "original": "When a frame is masked, its features are set to 0.",
       "zh": "一帧被掩蔽时，其特征被置为 0。"
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
    "original": "Experimental Setup",
    "zh": "实验设置"
   },
   "blocks": [
    {
     "id": "p-4-2-1",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-4-2-1-1",
       "original": "Training data: We collect an large scale audio dataset that greatly increases the domain coverage, modality coverage, and quantities compared to previous large scale audio generative model studies (Yang et al., 2023b; Borsos et al., 2023; Wang et al., 2023a; Liu et al., 2023c), which leverage datasets ranging between 10K to 100K hours containing mostly speech from a single domain (e.g., audiobooks).",
       "zh": "训练数据：我们收集了一个大规模音频数据集，与先前的大规模音频生成模型研究（Yang et al., 2023b; Borsos et al., 2023; Wang et al., 2023a; Liu et al., 2023c）相比，大幅提升了领域覆盖、模态覆盖和数据量——先前工作使用的数据集规模在 10K 到 100K 小时之间，且大多只包含单一领域（如有声书）的语音。"
      }
     ]
    },
    {
     "id": "p-4-2-2",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-4-2-2-1",
       "original": "Specifically, our dataset includes over 160K hours of speech (primarily English), 20K hours of music and 6K hours of sound samples.",
       "zh": "具体而言，我们的数据集包含超过 160K 小时的语音（以英语为主）、20K 小时音乐和 6K 小时音效样本。"
      },
      {
       "id": "s-4-2-2-2",
       "original": "The speech portion covers audiobooks, podcasts, read sentences, talks, conversations, and in-the-wild recordings including various acoustic conditions and non-verbal voices.",
       "zh": "语音部分覆盖有声书、播客、朗读句、演讲、对话，以及包含各种声学条件和非语言声音的野外录音。"
      },
      {
       "id": "s-4-2-2-3",
       "original": "To ensure fairness and a good representation for people from various groups, it includes speakers from over 150 countries speaking over 200 different primary languages.",
       "zh": "为确保公平性并良好代表各群体，数据包含来自超过 150 个国家、使用超过 200 种不同母语的说话人。"
      },
      {
       "id": "s-4-2-2-4",
       "original": "We refer to this set as “Mix-185K.”",
       "zh": "我们将该数据集称为「Mix-185K」。"
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
       "original": "Model and training: We train a 24 layer Transformer Vaswani et al. (2017) with convolutional position embeddings Baevski et al. (2020) and symmetric bi-directional ALiBi self-attention bias Press et al. (2021).",
       "zh": "模型与训练：我们训练了一个 24 层 Transformer Vaswani et al. (2017)，使用卷积位置嵌入 Baevski et al. (2020) 和对称双向 ALiBi 自注意力偏置 Press et al. (2021)。"
      },
      {
       "id": "s-4-2-3-2",
       "original": "The model has 16 attention heads, 1024/4096 embedding/feed-forward network (FFN) dimension, and 330M parameters.",
       "zh": "模型有 16 个注意力头，嵌入/前馈网络（FFN）维度为 1024/4096，参数量为 330M。"
      },
      {
       "id": "s-4-2-3-3",
       "original": "We add UNet-style skip connections, where states are concatenated channel-wise and then combined using a linear layer.",
       "zh": "我们加入了 UNet 式跳跃连接：状态沿信道维度拼接后用线性层合并。"
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
       "original": "The model is trained for 1 million updates with an effective batch size of 480K frames.",
       "zh": "模型训练 1 百万次更新，有效批大小为 480K 帧。"
      },
      {
       "id": "s-4-2-4-2",
       "original": "For efficiency, samples are randomly chunked if they exceed 1,600 frames.",
       "zh": "为提高效率，超过 1,600 帧的样本会被随机切块。"
      },
      {
       "id": "s-4-2-4-3",
       "original": "We set pcond = 0.1, nmask ∼U[70%, 100%], and lmask = 10.",
       "zh": "我们设置 pcond = 0.1，nmask ∼U[70%, 100%]，lmask = 10。"
      }
     ]
    },
    {
     "id": "p-4-2-5",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-4-2-5-1",
       "original": "We use the Adam Kingma and Ba (2014) optimizer with learning rate 1e-4, linearly warmed up for 5k steps and linearly decayed over the rest of training.",
       "zh": "我们使用 Adam Kingma and Ba (2014) 优化器，学习率 1e-4，前 5k 步线性预热，随后在剩余训练中线性衰减。"
      },
      {
       "id": "s-4-2-5-2",
       "original": "For stability, we use gradient norm clipping with a norm threshold of 0.2.",
       "zh": "为稳定性，我们使用梯度范数裁剪，阈值为 0.2。"
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
    "original": "Audiobox Speech: Scaling In-context Text-to-speech Synthesis",
    "zh": "Audiobox Speech：扩展上下文内文语转换合成"
   },
   "blocks": [
    {
     "id": "p-5-1",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-5-1-1",
       "original": "In this section, we study the effectiveness of pre-training and fine-tuning data scaling for speech generation.",
       "zh": "本节研究预训练和微调数据扩展对语音生成的效果。"
      },
      {
       "id": "s-5-1-2",
       "original": "We present Audiobox Speech, which fine-tunes Audiobox SSL with the same transcript-guided speech infilling objective as Voicebox using transcribed speech.",
       "zh": "我们提出 Audiobox Speech：使用带转写的语音，以与 Voicebox 相同的转写引导语音填充目标微调 Audiobox SSL。"
      },
      {
       "id": "s-5-1-3",
       "original": "The resulting model can be applied to multiple downstream tasks just like Voicebox.",
       "zh": "所得模型可以像 Voicebox 一样应用于多个下游任务。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-5-1",
   "num": "5.1",
   "level": 2,
   "page": 8,
   "title": {
    "original": "Method",
    "zh": "方法"
   },
   "blocks": [
    {
     "id": "p-5-1-1",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-5-1-1-1",
       "original": "To incorporate the frame-aligned transcript z, we follow Liu et al. (2023a).",
       "zh": "为引入帧对齐的转写 z，我们遵循 Liu et al. (2023a) 的做法。"
      },
      {
       "id": "s-5-1-1-2",
       "original": "Specifically, given the noisy Encodec features xt at the flow-step t, masked Encodec features xctx, we first concatenate xt and xctx channel-wise and apply a linear project to get xh.",
       "zh": "具体而言，给定流步 t 的带噪 Encodec 特征 xt 和掩蔽 Encodec 特征 xctx，先将 xt 与 xctx 沿信道维度拼接，再做线性投影得到 xh。"
      },
      {
       "id": "s-5-1-1-3",
       "original": "We then apply another linear layer to the frame-aligned transcript embeddings zemb, and add this to the hidden state xh.",
       "zh": "然后对帧对齐的转写嵌入 zemb 施加另一个线性层，并将其加到隐状态 xh 上。"
      },
      {
       "id": "s-5-1-1-4",
       "original": "The resulting features are concatenated with the flow step sinusoidal embedding along the time dimension and fed to the Transformer as input.",
       "zh": "所得特征与流步正弦嵌入沿时间维度拼接，馈入 Transformer 作为输入。"
      },
      {
       "id": "s-5-1-1-5",
       "original": "The Transformer output is projected and predicts the derivative vt.",
       "zh": "Transformer 输出经投影后预测导数 vt。"
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
       "original": "There are two different approaches to fine-tuning the model.",
       "zh": "微调模型有两种不同方式。"
      },
      {
       "id": "s-5-1-2-2",
       "original": "The first one is low-rank adaptation (LoRA) Hu et al. (2021), where we add LoRA adapters to the linear input projection of each self-attention layer.",
       "zh": "第一种是低秩适配（LoRA）Hu et al. (2021)，即为每个自注意力层的线性输入投影添加 LoRA 适配器。"
      },
      {
       "id": "s-5-1-2-3",
       "original": "With this approach, only the transcript embedding, projection parameters, along with the LoRA adapter parameters are optimized.",
       "zh": "采用这种方式时，只有转写嵌入、投影参数和 LoRA 适配器参数被优化。"
      },
      {
       "id": "s-5-1-2-4",
       "original": "The second approach is full fine-tuning, where all parameters are optimized together.",
       "zh": "第二种是全量微调，即所有参数一起优化。"
      },
      {
       "id": "s-5-1-2-5",
       "original": "Liu et al. (2023a) showed that LoRA achieves better performance when fine-tuning SpeechFlow on 960 hours of speech, but we suspect that full fine-tuning may prevail when we scale fine-tuning data.",
       "zh": "Liu et al. (2023a) 表明在 960 小时语音上微调 SpeechFlow 时 LoRA 表现更好，但我们猜测当微调数据规模扩大后，全量微调可能更占优。"
      }
     ]
    },
    {
     "id": "p-5-1-3",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-5-1-3-1",
       "original": "In addition, many prior studies (Le et al., 2023; Wang et al., 2023a) represent transcripts as phoneme sequences and using the off-the-shelf Montreal Forced Aligner (McAuliffe et al., 2017) for aligning the training data.",
       "zh": "此外，许多先前研究（Le et al., 2023; Wang et al., 2023a）将转写表示为音素序列，并使用现成的 Montreal Forced Aligner（McAuliffe et al., 2017）对齐训练数据。"
      },
      {
       "id": "s-5-1-3-2",
       "original": "Instead, we represent transcript with raw characters, including punctuation and with true cases, and utilize the SeamlessM4T v2 multilingual char-to-unit forced aligner presented in Seamless Communication (2023) adapted from RAD-TTS (Shih et al., 2021).",
       "zh": "与之不同，我们用原始字符表示转写——保留标点和真实大小写——并使用 Seamless Communication (2023) 中提出的 SeamlessM4T v2 多语言字符到单元强制对齐器，它改编自 RAD-TTS（Shih et al., 2021）。"
      },
      {
       "id": "s-5-1-3-3",
       "original": "This aligner is trained on large quantities of multilingual data and can align raw text with speech.",
       "zh": "该对齐器在大量多语言数据上训练，可以将原始文本与语音对齐。"
      },
      {
       "id": "s-5-1-3-4",
       "original": "There are several benefits with the replacement.",
       "zh": "这一替换有若干好处。"
      },
      {
       "id": "s-5-1-3-5",
       "original": "First, it circumvents the need of phonemizers and avoids error propagation due to incorrect phonemization.",
       "zh": "第一，它绕开了音素化器的需求，避免音素化错误造成的错误传播。"
      },
      {
       "id": "s-5-1-3-6",
       "original": "Second, raw text preserves more information than phonemized text, such as casing (e.g., all caps for emphasis) and punctuation.",
       "zh": "第二，原始文本比音素化文本保留更多信息，如大小写（如全大写表示强调）和标点。"
      },
      {
       "id": "s-5-1-3-7",
       "original": "Third, the SeamlessM4T v2 aligner is much more robust than MFA and can handle multilingual/code-switching text, which enables easier extension to multilingual TTS systems and is more suitable for aligning challenging speech such as conversational and noisy samples.",
       "zh": "第三，SeamlessM4T v2 对齐器比 MFA 鲁棒得多，能处理多语言/语码混合文本，更容易扩展到多语言 TTS 系统，也更适合对齐对话式和带噪语音等有挑战性的样本。"
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
       "original": "Following Le et al. (2023), we train a flow-matching duration model only with labeled data.",
       "zh": "跟随 Le et al. (2023)，我们仅用标注数据训练一个流匹配时长模型。"
      },
      {
       "id": "s-5-1-4-2",
       "original": "It was shown in Le et al. (2023) that FM duration model has better diversity compared to regression duration models.",
       "zh": "Le et al. (2023) 表明，相比回归式时长模型，FM 时长模型的多样性更好。"
      },
      {
       "id": "s-5-1-4-3",
       "original": "However, it is less stable and sometimes produces unnatural prosody.",
       "zh": "然而它不够稳定，有时会产生不自然的韵律。"
      },
      {
       "id": "s-5-1-4-4",
       "original": "To alleviate the issue, we propose to average over a small number of duration sequences for stabilization, which empirically shows better trade-off between diversity and quality.",
       "zh": "为缓解该问题，我们提出对少量时长序列取平均来稳定输出，经验表明这在多样性与质量之间取得了更好的权衡。"
      },
      {
       "id": "s-5-1-4-5",
       "original": "The averaging operation is reasonable as duration distributions are relatively unimodal.",
       "zh": "取平均操作是合理的，因为时长分布相对呈单峰。"
      },
      {
       "id": "s-5-1-4-6",
       "original": "When averaging more samples, it approaches the mean, which is the estimation produced by regression models.",
       "zh": "当平均的样本数更多时，结果趋近均值——这正是回归模型的估计。"
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
    "original": "Task and Evaluation",
    "zh": "任务与评测"
   },
   "blocks": [
    {
     "id": "p-5-2-1",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-5-2-1-1",
       "original": "We consider the in-context TTS (also known as zero-shot TTS) task.",
       "zh": "我们考虑上下文内 TTS（也称零样本 TTS）任务。"
      },
      {
       "id": "s-5-2-1-2",
       "original": "In-context TTS aims to synthesize speech that resembles the audio style of the given an audio example which may be unseen during training.",
       "zh": "上下文内 TTS 的目标是合成在音频风格上与给定音频示例相似的语音，该示例可能在训练时未见过。"
      },
      {
       "id": "s-5-2-1-3",
       "original": "The audio style refers to not only voice, but everything other than transcript, such as prosody and acoustic condition.",
       "zh": "音频风格不仅指声线，还包括转写之外的一切，如韵律和声学条件。"
      },
      {
       "id": "s-5-2-1-4",
       "original": "To perform the task, input raw/frame-level transcript is the concatenation of the raw/frame-level transcript of the audio example and the target raw/frame-level transcript, while the masked audio/duration is the concatenation of the example audio/duration and a mask for the speech/duration to be generated.",
       "zh": "执行该任务时，输入的原文/帧级转写是音频示例的原文/帧级转写与目标原文/帧级转写的拼接，而掩蔽音频/时长则是示例音频/时长与待生成语音/时长的掩蔽的拼接。"
      },
      {
       "id": "s-5-2-1-5",
       "original": "We first sample duration sequence for the target raw transcript to create frame-level target transcript using the duration model, and then sample audio with the audio model.",
       "zh": "我们首先用时长模型为目标原始转写采样时长序列，得到帧级目标转写，然后用音频模型采样音频。"
      }
     ]
    },
    {
     "id": "p-5-2-2",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-5-2-2-1",
       "original": "The performance is measured in terms of style similarity, content correctness, and quality.",
       "zh": "性能从风格相似度、内容正确性和质量三方面衡量。"
      },
      {
       "id": "s-5-2-2-2",
       "original": "A proxy automatic metric for style similarity is the cosine similarity between the audio prompt and the generated audio in some embedding space that reflects the audio style.",
       "zh": "风格相似度的代理自动指标是音频提示与生成音频在某个反映音频风格的嵌入空间中的余弦相似度。"
      },
      {
       "id": "s-5-2-2-3",
       "original": "WavLM-TDCNN (Chen et al., 2022b) is commonly used for embedding (Wang et al., 2023a; Kharitonov et al., 2023; Le et al., 2023).",
       "zh": "WavLM-TDCNN（Chen et al., 2022b）是常用的嵌入模型（Wang et al., 2023a; Kharitonov et al., 2023; Le et al., 2023）。"
      },
      {
       "id": "s-5-2-2-4",
       "original": "Le et al. (2023) advocates for reporting both similarity with respect to raw audio (SIM-orig) and to audio resynthesized from the same vocoder (SIM-resyn) for comparability across studies (SIM-orig).",
       "zh": "Le et al. (2023) 主张同时报告相对原始音频的相似度（SIM-orig）和相对由同一声码器重合成音频的相似度（SIM-resyn），以便跨研究比较（SIM-orig）。"
      },
      {
       "id": "s-5-2-2-5",
       "original": "Content correctness can be approximated with the word error rate (WER) from some speech recognition model; however, WER can result from both synthesis error and recognition error, and hence is less reliable when numbers are close or when the target style is more difficult to recognize (e.g., accented speech, conversational speech, noisy speech).",
       "zh": "内容正确性可以用某个语音识别模型的词错误率（WER）近似；然而 WER 同时受合成错误和识别错误影响，因此在数值接近时或目标风格更难识别时（如带口音语音、对话语音、带噪语音）不太可靠。"
      },
      {
       "id": "s-5-2-2-6",
       "original": "In this paper we use Whisper large-v2 instead of HuBERT-L Hsu et al. (2021) used in prior studies (Wang et al., 2023a; Le et al., 2023) because the latter is less robust and has higher WER on real data for non audiobook domains.",
       "zh": "本文使用 Whisper large-v2 而非先前研究（Wang et al., 2023a; Le et al., 2023）使用的 HuBERT-L Hsu et al. (2021)，因为后者鲁棒性较差，在非有声书领域的真实数据上 WER 更高。"
      },
      {
       "id": "s-5-2-2-7",
       "original": "Subjective evaluations are often used for assessing style similarity and audio quality, measured by mean opinion scores (MOS).",
       "zh": "主观评测常用于评估风格相似度和音频质量，以平均意见分（MOS）衡量。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-5-3",
   "num": "5.3",
   "level": 2,
   "page": 9,
   "title": {
    "original": "Experimental Setup",
    "zh": "实验设置"
   },
   "blocks": [
    {
     "id": "p-5-3-1",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-5-3-1-1",
       "original": "Training data: We train Audiobox Speech on a transcribed English subset of the speech data used for pre-training.",
       "zh": "训练数据：我们在预训练所用语音数据的带转写英语子集上训练 Audiobox Speech。"
      },
      {
       "id": "s-5-3-1-2",
       "original": "The subset contains 100K hours of speech covering similar domains as the full set, which we refer to as “SP-multi-100K.” We create the transcribed subset with the following pre-processing methods:",
       "zh": "该子集包含 100K 小时语音，覆盖与全集类似的领域，称为「SP-multi-100K」。我们用以下预处理方法构建带转写子集："
      }
     ]
    },
    {
     "id": "p-5-3-2",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-5-3-2-1",
       "original": "For unsegmented multi-speaker conversational datasets information, we first segment our dataset using PyAnnote diarization toolkit (Plaquet and Bredin, 2023; Bredin, 2023) to create single speaker speech segments.",
       "zh": "对于未切分的多说话人对话数据集，我们首先用 PyAnnote 说话人分离工具包（Plaquet and Bredin, 2023; Bredin, 2023）切分数据，得到单说话人语音片段。"
      },
      {
       "id": "s-5-3-2-2",
       "original": "For untranscribed speech, we transcribe data using two speech recognition models, Whisper Radford et al. (2022) large-v2 and medium.en.",
       "zh": "对于无转写语音，我们用两个语音识别模型——Whisper Radford et al. (2022) large-v2 和 medium.en——进行转写。"
      },
      {
       "id": "s-5-3-2-3",
       "original": "For each audio with unknown language, we additional use the Whisper large-v2 model for language identification (LID).",
       "zh": "对于语言未知的音频，我们额外使用 Whisper large-v2 模型做语种识别（LID）。"
      },
      {
       "id": "s-5-3-2-4",
       "original": "We then remove the utterances where the probability being English is lower than 50% or the the word error rate (WER) between the transcriptions from the two models is greater than 50%.",
       "zh": "随后，我们移除英语概率低于 50% 或两个模型转写之间的词错误率（WER）大于 50% 的话语。"
      }
     ]
    },
    {
     "id": "p-5-3-3",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-5-3-3-1",
       "original": "To create a similar text distributions across multiple datasets, we apply inverse text normalization to create true-cased and punctuated transcript for any dataset with normalized transcript using Whisper-punctuation library.1 It performs the task through constrained search where the produced transcript needs to match the original transcript after normalization.",
       "zh": "为使多个数据集的文本分布相近，我们对任何使用规范化转写文本的数据集应用逆文本规范化，生成带真实大小写和标点的转写，使用的是 Whisper-punctuation 库。1 它通过受限搜索执行该任务：生成的转写经规范化后需与原始转写一致。"
      }
     ]
    },
    {
     "id": "p-5-3-4",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-5-3-4-1",
       "original": "Model and training: We adopt the full fine-tuning method and train the audio model for 200K steps with an effective batch size of 240K frames.",
       "zh": "模型与训练：我们采用全量微调方法训练音频模型，共 200K 步，有效批大小 240K 帧。"
      },
      {
       "id": "s-5-3-4-2",
       "original": "Samples are randomly chunked if they exceed 1,600 frames.",
       "zh": "超过 1,600 帧的样本会被随机切块。"
      },
      {
       "id": "s-5-3-4-3",
       "original": "Character embeddings are 128 dimensions.",
       "zh": "字符嵌入为 128 维。"
      },
      {
       "id": "s-5-3-4-4",
       "original": "For each batch, audio is entire masked with probability 0.3; otherwise a contiguous chunk is masked where the chunk size 70% to 100% of the frames.",
       "zh": "每个批次中，音频以概率 0.3 整体掩蔽；否则掩蔽一个连续片段，片段大小为帧数的 70% 到 100%。"
      },
      {
       "id": "s-5-3-4-5",
       "original": "The same optimizer, learning rate, scheduler, and gradient clipping as Audiobox SSL are used.",
       "zh": "优化器、学习率、调度器和梯度裁剪均与 Audiobox SSL 相同。"
      }
     ]
    },
    {
     "id": "p-5-3-5",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-5-3-5-1",
       "original": "The duration model has 8 heads, 768/2048 embedding/FFN dimensions, 10 layers, with 40 dimension character embeddings.",
       "zh": "时长模型有 8 个头、768/2048 的嵌入/FFN 维度、10 层，字符嵌入为 40 维。"
      },
      {
       "id": "s-5-3-5-2",
       "original": "It is trained for 600K updates with an effective batch size of 120K frames.",
       "zh": "它训练 600K 次更新，有效批大小 120K 帧。"
      },
      {
       "id": "s-5-3-5-3",
       "original": "For each batch, duration is entirely masked with probability 0.2 and otherwise a chunk of 10% to 100% of the sequence length is masked.",
       "zh": "每个批次中，时长以概率 0.2 整体掩蔽，否则掩蔽序列长度 10% 到 100% 的一个片段。"
      },
      {
       "id": "s-5-3-5-4",
       "original": "The rest of the optimization parameters are the same as the audio model.",
       "zh": "其余优化参数与音频模型相同。"
      }
     ]
    },
    {
     "id": "p-5-3-6",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-5-3-6-1",
       "original": "Evaluation data and configuration: For in-context TTS, three second prompts are used following Wang et al. (2023a).",
       "zh": "评测数据与配置：上下文内 TTS 跟随 Wang et al. (2023a) 使用 3 秒提示。"
      },
      {
       "id": "s-5-3-6-2",
       "original": "Voicebox uses the last three seconds of the reference as the prompt, which often contains a considerable amount of trailing silence.",
       "zh": "Voicebox 使用参考音频的最后 3 秒作为提示，其中往往包含相当长的结尾静音。"
      },
      {
       "id": "s-5-3-6-3",
       "original": "We instead use the last three seconds after removing the trailing silences based on the forced alignment for all experiments in this paper.",
       "zh": "本文所有实验则基于强制对齐去掉结尾静音后取最后 3 秒。"
      },
      {
       "id": "s-5-3-6-4",
       "original": "Duration is estimated by averaging over five samples and following (Le et al., 2023) predicted silence at both ends are trimmed to 0.1 second max.",
       "zh": "时长通过对 5 个样本取平均估计，并跟随 (Le et al., 2023) 将两端预测静音裁剪至最长 0.1 秒。"
      }
     ]
    },
    {
     "id": "p-5-3-7",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-5-3-7-1",
       "original": "The torchdiffeq (Chen, 2018) package is used.",
       "zh": "我们使用 torchdiffeq（Chen, 2018）软件包。"
      },
      {
       "id": "s-5-3-7-2",
       "original": "By default, we use the midpoint solver with a step size of 0.0625, which invokes the derivatives being evaluated 32 times.",
       "zh": "默认使用 midpoint 求解器，步长 0.0625，需对导数求值 32 次。"
      },
      {
       "id": "s-5-3-7-3",
       "original": "When using classifier free guidance the model does 2 forward passes per evaluation, leading to a total of 64 calls to the model.",
       "zh": "使用无分类器引导时，模型每次求值做 2 次前向传播，共调用模型 64 次。"
      },
      {
       "id": "s-5-3-7-4",
       "original": "A guidance weight for classifier-free guidance (Ho and Salimans, 2022) of 0.7 is applied.",
       "zh": "无分类器引导（Ho and Salimans, 2022）的引导权重取 0.7。"
      }
     ]
    },
    {
     "id": "p-5-3-8",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-5-3-8-1",
       "original": "1https://github.com/jumon/whisper-punctuator Models are evaluated on five datasets representing different domains.",
       "zh": "1https://github.com/jumon/whisper-punctuator 模型在代表不同领域的 5 个数据集上评测。"
      },
      {
       "id": "s-5-3-8-2",
       "original": "(1) Librispeech test-clean (LS) (Panayotov et al., 2015): audiobook recordings that are scripted and relatively clean.",
       "zh": "(1) Librispeech test-clean（LS）（Panayotov et al., 2015）：照稿朗读、相对干净的有声书录音。"
      },
      {
       "id": "s-5-3-8-3",
       "original": "Following Wang et al. (2023a), we keep only samples between 4 to 10 seconds for evaluation to compare with prior studies.",
       "zh": "跟随 Wang et al. (2023a)，我们仅保留 4 到 10 秒的样本用于评测，以便与先前研究对比。"
      },
      {
       "id": "s-5-3-8-4",
       "original": "(2) CommonVoice v13.0 English test set (CV) (Ardila et al., 2019): sentences read by volunteers worldwide.",
       "zh": "(2) CommonVoice v13.0 英语测试集（CV）（Ardila et al., 2019）：全球志愿者朗读的句子。"
      },
      {
       "id": "s-5-3-8-5",
       "original": "It covers broader accents and are noisier compared to Librispeech.",
       "zh": "相比 Librispeech，它覆盖更广的口音且更嘈杂。"
      },
      {
       "id": "s-5-3-8-6",
       "original": "(3) Switchboard (SWBD) (Godfrey et al., 1992): a conversational speech corpus.",
       "zh": "(3) Switchboard（SWBD）（Godfrey et al., 1992）：一个对话语音语料库。"
      },
      {
       "id": "s-5-3-8-7",
       "original": "We evaluate on a subset of 611 samples from 8 speakers.",
       "zh": "我们在来自 8 位说话人的 611 个样本的子集上评测。"
      },
      {
       "id": "s-5-3-8-8",
       "original": "(4) Expresso (Nguyen et al., 2023) (Expr) is a multispeaker expressive speech dataset covering 7 different speaking styles, which we evaluate on a subset of 999 samples.",
       "zh": "(4) Expresso（Nguyen et al., 2023）（Expr）是一个多说话人表现力语音数据集，覆盖 7 种不同说话风格，我们在 999 个样本的子集上评测。"
      },
      {
       "id": "s-5-3-8-9",
       "original": "(5) An internal expressive and accented dataset (Accent): read sentences with speakers covering a wider range of accents and 10 emotions.",
       "zh": "(5) 一个内部的表现力与口音数据集（Accent）：朗读句，说话人覆盖更广的口音和 10 种情感。"
      },
      {
       "id": "s-5-3-8-10",
       "original": "We create a subset of 500 samples for evaluation.",
       "zh": "我们构建了一个 500 个样本的子集用于评测。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-5-4",
   "num": "5.4",
   "level": 2,
   "page": 10,
   "title": {
    "original": "Main Results",
    "zh": "实验结果"
   },
   "blocks": [
    {
     "id": "p-5-4-1",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-5-4-1-1",
       "original": "We compare Audiobox Speech with several state-of-the-art in-context speech generation models.",
       "zh": "我们将 Audiobox Speech 与若干 SOTA 上下文内语音生成模型进行对比。"
      },
      {
       "id": "s-5-4-1-2",
       "original": "Voicebox, VALL-E, NaturalSpeech 2 (NS2), and YourTTS are trained on 60K, 60K, 44K, 600 hours of audiobooks respectively.",
       "zh": "Voicebox、VALL-E、NaturalSpeech 2（NS2）和 YourTTS 分别在 60K、60K、44K、600 小时的有声书上训练。"
      },
      {
       "id": "s-5-4-1-3",
       "original": "UniAudio is trained on about 100K hours of audio, where speech accounts for 81K hours and are mostly audiobooks.",
       "zh": "UniAudio 在约 100K 小时音频上训练，其中语音占 81K 小时且主要为有声书。"
      },
      {
       "id": "s-5-4-1-4",
       "original": "Results are shown in Tables 1 and 2.",
       "zh": "结果见 Tables 1 和 2。"
      }
     ]
    },
    {
     "id": "p-5-4-2",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-5-4-2-1",
       "original": "Audiobox Speech achieves a new best on style similarity (0.745 vs. 0.710 from UniAudio) on the audiobook domain test set (LS).",
       "zh": "Audiobox Speech 在有声书领域测试集（LS）上取得风格相似度的新最佳（0.745，对 UniAudio 的 0.710）。"
      },
      {
       "id": "s-5-4-2-2",
       "original": "More importantly, Audiobox Speech drastically improves Voicebox on all other domains, with similarity improvement ranging from 0.096 to 0.156.",
       "zh": "更重要的是，Audiobox Speech 在所有其他领域上大幅超越 Voicebox，相似度提升幅度在 0.096 到 0.156 之间。"
      },
      {
       "id": "s-5-4-2-3",
       "original": "The results suggest that Audiobox Speech generalizes much better thanks to scaling data to cover more domains.",
       "zh": "结果表明，得益于数据扩展到覆盖更多领域，Audiobox Speech 的泛化能力显著更好。"
      },
      {
       "id": "s-5-4-2-4",
       "original": "The subjective evaluations presented in Table 2 again confirms that Audiobox Speech transfers styles significantly better than the baselines, and generate audio with better quality.",
       "zh": "Table 2 给出的主观评测再次确认，Audiobox Speech 在风格迁移上显著优于各基线，且生成的音频质量更好。"
      }
     ]
    },
    {
     "id": "tab-5-4-1",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "tab-5-4-1-s1",
       "original": "Table 1 In-context TTS style similarity and content correctness. We cite Yang et al. (2023b) for the NS2 results which are not in the original paper(Shen et al., 2023). WER with ∗are computed using HuBERT-L ASR that is not comparable with the other numbers.",
       "zh": "Table 1 上下文内 TTS 的风格相似度与内容正确性。NS2 结果引自 Yang et al. (2023b)，原论文（Shen et al., 2023）未包含。带 ∗ 的 WER 使用 HuBERT-L ASR 计算，与其他数字不可比。"
      }
     ]
    },
    {
     "id": "p-5-4-3",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-5-4-3-1",
       "original": "Sim-r ↑ Sim-o ↑ Word error rate (%) ↓ LS LS CV SWBD Expr Accent Avg LS CV SWBD Expr Accent Avg VALL-E",
       "zh": "表头：Sim-r ↑ / Sim-o ↑ / Word error rate (%) ↓（LS / CV / SWBD / Expr / Accent / Avg 各列）——VALL-E（后续照原文）。"
      }
     ]
    },
    {
     "id": "eq-5-4-1",
     "type": "equation",
     "page": 10,
     "original": "0.580 - - - - - - 5.9∗ - - - - -"
    },
    {
     "id": "eq-5-4-2",
     "type": "equation",
     "page": 10,
     "original": "NS2"
    },
    {
     "id": "eq-5-4-3",
     "type": "equation",
     "page": 10,
     "original": "0.620 - - - - - - 2.3∗ - - - - -"
    },
    {
     "id": "eq-5-4-4",
     "type": "equation",
     "page": 10,
     "original": "UniAudio"
    },
    {
     "id": "eq-5-4-5",
     "type": "equation",
     "page": 10,
     "original": "0.710 - - - - - - 2.0∗ - - - - -"
    },
    {
     "id": "eq-5-4-6",
     "type": "equation",
     "page": 10,
     "original": "YourTTS"
    },
    {
     "id": "eq-5-4-7",
     "type": "equation",
     "page": 10,
     "original": "- 0.455 0.312 0.291 0.290 0.366 0.343 6.8 10.4 11.8 9.5 4.0 8.5"
    },
    {
     "id": "eq-5-4-8",
     "type": "equation",
     "page": 10,
     "original": "Voicebox"
    },
    {
     "id": "eq-5-4-9",
     "type": "equation",
     "page": 10,
     "original": "0.696 0.674 0.477 0.452 0.487 0.563 0.531 2.6 7.9 10.6 7.2 2.1 6.1"
    },
    {
     "id": "eq-5-4-10",
     "type": "equation",
     "page": 10,
     "original": "Audiobox Speech"
    },
    {
     "id": "eq-5-4-11",
     "type": "equation",
     "page": 10,
     "original": "0.745 0.734 0.607 0.608 0.603 0.659 0.642 3.2 3.7 9.1 3.2 0.9 4.0"
    },
    {
     "id": "tab-5-4-2",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "tab-5-4-2-s1",
       "original": "Table 2 In-context TTS style similarity and quality subjective evaluation",
       "zh": "Table 2 上下文内 TTS 的风格相似度与质量主观评测"
      }
     ]
    },
    {
     "id": "p-5-4-4",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-5-4-4-1",
       "original": "Style similarity MOS ↑ LS CV SWBD Expr Accent YourTTS",
       "zh": "表头：Style similarity MOS ↑（LS / CV / SWBD / Expr / Accent）——YourTTS（后续照原文）。"
      }
     ]
    },
    {
     "id": "eq-5-4-12",
     "type": "equation",
     "page": 10,
     "original": "1.67 ± 0.09 1.61 ± 0.09 1.55 ± 0.08 1.41 ± 0.07 1.46 ± 0.07"
    },
    {
     "id": "eq-5-4-13",
     "type": "equation",
     "page": 10,
     "original": "Voicebox"
    },
    {
     "id": "eq-5-4-14",
     "type": "equation",
     "page": 10,
     "original": "2.85 ± 0.12 2.66 ± 0.13 2.89 ± 0.13 2.42 ± 0.13 2.51 ± 0.11"
    },
    {
     "id": "eq-5-4-15",
     "type": "equation",
     "page": 10,
     "original": "Audiobox Speech"
    },
    {
     "id": "eq-5-4-16",
     "type": "equation",
     "page": 10,
     "original": "3.88 ± 0.11 3.77 ± 0.11 3.63 ± 0.12 3.85 ± 0.11 3.77 ± 0.11"
    },
    {
     "id": "p-5-4-5",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-5-4-5-1",
       "original": "Quality MOS ↑ LS CV SWBD Expr Accent YourTTS",
       "zh": "表头：Quality MOS ↑（LS / CV / SWBD / Expr / Accent）——YourTTS（后续照原文）。"
      }
     ]
    },
    {
     "id": "eq-5-4-17",
     "type": "equation",
     "page": 10,
     "original": "1.89 ± 0.10 2.19 ± 0.12 1.57 ± 0.08 1.74 ± 0.09 1.92 ± 0.10"
    },
    {
     "id": "eq-5-4-18",
     "type": "equation",
     "page": 10,
     "original": "Voicebox"
    },
    {
     "id": "eq-5-4-19",
     "type": "equation",
     "page": 10,
     "original": "3.70 ± 0.11 3.06 ± 0.12 2.94 ± 0.12 2.76 ± 0.12 3.38 ± 0.12"
    },
    {
     "id": "eq-5-4-20",
     "type": "equation",
     "page": 10,
     "original": "Audiobox Speech"
    },
    {
     "id": "eq-5-4-21",
     "type": "equation",
     "page": 10,
     "original": "4.11 ± 0.08 4.00 ± 0.09 3.74 ± 0.09 4.00 ± 0.09 4.22 ± 0.07"
    }
   ]
  },
  {
   "id": "sec-5-5",
   "num": "5.5",
   "level": 2,
   "page": 10,
   "title": {
    "original": "Ablation Study",
    "zh": "消融研究"
   },
   "blocks": [
    {
     "id": "p-5-5-1",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-5-5-1-1",
       "original": "We present ablation studies in Table 3.",
       "zh": "我们在 Table 3 中给出消融研究。"
      },
      {
       "id": "s-5-5-1-2",
       "original": "To understand the effect of data scaling, we create a subset containing 60K hours of audiobook speech referred to as “SP-book-60K”, which is a subset of the 100K hour multi-domain speech we have (SP-multi-100K).",
       "zh": "为理解数据扩展的作用，我们构建了一个包含 60K 小时有声书语音的子集，称为「SP-book-60K」，它是我们已有的 100K 小时多领域语音（SP-multi-100K）的子集。"
      }
     ]
    },
    {
     "id": "p-5-5-2",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-5-5-2-1",
       "original": "We first compare the top two rows, which differ in the pre-training data and are both fine-tuned with LoRA.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-5-5-2-2",
       "original": "Results suggest that while WER remains similar, scaling pre-training data greatly improves style similarity, especially on domains not covered in the fine-tuning data (CV, SWBD, Expr, Accent).",
       "zh": "结果表明，WER 基本不变，但扩大预训练数据显著提升了风格相似度，尤其是在微调数据未覆盖的领域上（CV、SWBD、Expr、Accent）。"
      },
      {
       "id": "s-5-5-2-3",
       "original": "On the other hand, scaling fine-tuning data from SP-book-60K to SP-multi-100K does not appear to improve much on similarity.",
       "zh": "另一方面，将微调数据从 SP-book-60K 扩大到 SP-multi-100K 似乎在相似度上没有多少提升。"
      },
      {
       "id": "s-5-5-2-4",
       "original": "This potentially results from the fact that pre-training data is a superset of fine-tuning data, and hence fine-tuning has little to learn on style transfer and focuses on aligning transcript with speech.",
       "zh": "这可能是因为预训练数据是微调数据的超集，微调在风格迁移上几乎没什么可学的了，主要聚焦在转写与语音的对齐上。"
      }
     ]
    },
    {
     "id": "p-5-5-3",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-5-5-3-1",
       "original": "Comparing the third and the fourth row, we see that by fine-tuning the whole model, style similarity improves slightly and WER improves greatly on most of the domains (23% to 43% relative WER reduction).",
       "zh": "比较第三、四行可见，全量微调后风格相似度略有提升，而 WER 在多数领域上大幅改善（相对 WER 降低 23% 到 43%）。"
      },
      {
       "id": "s-5-5-3-2",
       "original": "The only exception is on SWBD, which are 8kHz narrowband recordings that are likely less represented in the fine-tuning data.",
       "zh": "唯一的例外是 SWBD，该数据集是 8kHz 窄带录音，在微调数据中可能很少出现。"
      },
      {
       "id": "s-5-5-3-3",
       "original": "Finally, we compare the last two rows and confirm that using audio prompts without silence leads to drastic improvements on similarity on datasets which tend to have long trailing silences (CV, Accent), while overall maintaining the WER.",
       "zh": "最后，比较最后两行可以确认：使用不含静音的音频提示能大幅提升在结尾静音往往较长的数据集上的相似度（CV、Accent），同时 WER 总体保持。"
      },
      {
       "id": "s-5-5-3-4",
       "original": "This is because the silence is not informative for inferring the target style.",
       "zh": "这是因为静音对推断目标风格没有信息量。"
      }
     ]
    },
    {
     "id": "tab-5-5-1",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "tab-5-5-1-s1",
       "original": "Table 3 Ablation study for in-context TTS. PT and FT data denote the data used for pre-training and fine-tuning repsectively. FT method denotes whether LoRA or full fine-tuning (full) is adopted. “has sil” denote whether the conditioned audio prompt contains silence.",
       "zh": "Table 3 上下文内 TTS 的消融研究。PT 和 FT data 分别表示预训练与微调所用数据。FT method 表示采用 LoRA 还是全量微调（full）。「has sil」表示条件音频提示是否包含静音。"
      }
     ]
    },
    {
     "id": "p-5-5-4",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-5-5-4-1",
       "original": "Sim-o ↑ PT data FT data FT method has sil LS CV SWBD Expr Accent SP-book-60K SP-book-60K LoRA Y",
       "zh": "表头：Sim-o ↑ × PT data / FT data / FT method / has sil（LS / CV / SWBD / Expr / Accent）——SP-book-60K / SP-book-60K / LoRA / Y（后续照原文）。"
      }
     ]
    },
    {
     "id": "eq-5-5-1",
     "type": "equation",
     "page": 11,
     "original": "0.708 0.461 0.530 0.552 0.529"
    },
    {
     "id": "eq-5-5-2",
     "type": "equation",
     "page": 11,
     "original": "Mix-185K SP-book-60K LoRA Y"
    },
    {
     "id": "eq-5-5-3",
     "type": "equation",
     "page": 11,
     "original": "0.718 0.505 0.592 0.571 0.584"
    },
    {
     "id": "eq-5-5-4",
     "type": "equation",
     "page": 11,
     "original": "Mix-185K SP-multi-100K LoRA Y"
    },
    {
     "id": "eq-5-5-5",
     "type": "equation",
     "page": 11,
     "original": "0.714 0.502 0.583 0.559 0.590"
    },
    {
     "id": "eq-5-5-6",
     "type": "equation",
     "page": 11,
     "original": "Mix-185K SP-multi-100K full Y"
    },
    {
     "id": "eq-5-5-7",
     "type": "equation",
     "page": 11,
     "original": "0.720 0.508 0.556 0.603 0.596"
    },
    {
     "id": "eq-5-5-8",
     "type": "equation",
     "page": 11,
     "original": "Mix-185K SP-multi-100K full N"
    },
    {
     "id": "eq-5-5-9",
     "type": "equation",
     "page": 11,
     "original": "0.734 0.607 0.608 0.603 0.659"
    },
    {
     "id": "p-5-5-5",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-5-5-5-1",
       "original": "WER (%) ↓ PT data FT data FT method has sil LS CV SWBD Expr Accent SP-book-60K SP-book-60K LoRA Y",
       "zh": "表头：WER (%) ↓ × PT data / FT data / FT method / has sil（LS / CV / SWBD / Expr / Accent）——SP-book-60K / SP-book-60K / LoRA / Y（后续照原文）。"
      }
     ]
    },
    {
     "id": "eq-5-5-10",
     "type": "equation",
     "page": 11,
     "original": "4.4 4.4 8.7 4.2 1.5"
    },
    {
     "id": "eq-5-5-11",
     "type": "equation",
     "page": 11,
     "original": "Mix-185K SP-book-60K LoRA Y"
    },
    {
     "id": "eq-5-5-12",
     "type": "equation",
     "page": 11,
     "original": "3.8 4.7 8.9 3.9 1.4"
    },
    {
     "id": "eq-5-5-13",
     "type": "equation",
     "page": 11,
     "original": "Mix-185K SP-multi-100K LoRA Y"
    },
    {
     "id": "eq-5-5-14",
     "type": "equation",
     "page": 11,
     "original": "3.8 6.0 9.0 4.0 1.4"
    },
    {
     "id": "eq-5-5-15",
     "type": "equation",
     "page": 11,
     "original": "Mix-185K SP-multi-100K full Y"
    },
    {
     "id": "eq-5-5-16",
     "type": "equation",
     "page": 11,
     "original": "2.5 3.6 10.1 3.1 0.8"
    },
    {
     "id": "eq-5-5-17",
     "type": "equation",
     "page": 11,
     "original": "Mix-185K SP-multi-100K full N"
    },
    {
     "id": "eq-5-5-18",
     "type": "equation",
     "page": 11,
     "original": "3.2 3.7 9.1 3.2 0.9"
    }
   ]
  },
  {
   "id": "sec-6",
   "num": "6",
   "level": 1,
   "page": 11,
   "title": {
    "original": "Audiobox Sound: Simple Text-to-sound Generation and Infilling",
    "zh": "Audiobox Sound：简洁的文生音效生成与填充"
   },
   "blocks": [
    {
     "id": "p-6-1",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-6-1-1",
       "original": "In this section, we present Audiobox Sound, a model for text-guided generation of general sound.",
       "zh": "本节介绍 Audiobox Sound——一个以文本引导生成通用音效的模型。"
      },
      {
       "id": "s-6-1-2",
       "original": "The task is also referred to as text-to-audio generation (TTA) in many prior works(Liu et al., 2023b; Huang et al., 2023b; Kreuk et al., 2022).",
       "zh": "该任务在许多先前工作中也称为文生音频生成（TTA）(Liu et al., 2023b; Huang et al., 2023b; Kreuk et al., 2022)。"
      },
      {
       "id": "s-6-1-3",
       "original": "It aims to generate general audios given a holistic text description.",
       "zh": "其目标是根据一段整体性的文字描述生成通用音频。"
      },
      {
       "id": "s-6-1-4",
       "original": "In contrast to text-to-speech synthesis, the text cannot be frame-wise aligned to audio.",
       "zh": "与文语转换不同，这里的文本无法与音频逐帧对齐。"
      },
      {
       "id": "s-6-1-5",
       "original": "Furthermore, sound data only constitutes a small portion of the whole training data.",
       "zh": "此外，音效数据只占整体训练数据的一小部分。"
      },
      {
       "id": "s-6-1-6",
       "original": "Thus we investigate whether general audio pre-training is able to bring gains to generation of audios of specific domain, which we take sound generation as an example.",
       "zh": "因此我们研究：通用音频预训练能否为特定领域的音频生成带来增益——我们以音效生成为例。"
      },
      {
       "id": "s-6-1-7",
       "original": "While we focus on generation of sound events, the technique can similarly apply to other areas (e.g., music).",
       "zh": "虽然我们聚焦声音事件的生成，该技术同样适用于其他领域（如音乐）。"
      }
     ]
    },
    {
     "id": "p-6-2",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-6-2-1",
       "original": "Most prior works Liu et al. (2023b); Ghosal et al. (2023); Liu et al. (2023c); Huang et al. (2023b); Yang et al. (2023c) build the diffusion models upon a constrained latent space, commonly learned through autoencoding.",
       "zh": "大多数先前工作 Liu et al. (2023b); Ghosal et al. (2023); Liu et al. (2023c); Huang et al. (2023b); Yang et al. (2023c) 在受限的潜空间上构建扩散模型，该潜空间通常通过自编码学习获得。"
      },
      {
       "id": "s-6-2-2",
       "original": "Such strategy has shown to improve the data efficiency Rombach et al. (2021).",
       "zh": "这一策略已被证明能提高数据效率 Rombach et al. (2021)。"
      },
      {
       "id": "s-6-2-3",
       "original": "In this work, we adopt a different approach, which directly builds the flow matching network on auto-encoding based latent representation of raw waveforms.",
       "zh": "本文采用不同路线：直接在原始波形经自编码得到的潜表示上构建流匹配网络。"
      },
      {
       "id": "s-6-2-4",
       "original": "Such methodology has been largely explored in the language model space Kreuk et al. (2022);",
       "zh": "这种方法论在语言模型领域已有广泛探索 Kreuk et al. (2022);"
      }
     ]
    },
    {
     "id": "p-6-3",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-6-3-1",
       "original": "Copet et al. (2023); Agostinelli et al. (2023), which typically requires to build a billion-scale model to achieve comparable performance to the alternatives aforementioned.",
       "zh": "Copet et al. (2023); Agostinelli et al. (2023)，但通常需要构建十亿参数级模型才能达到与前述方法相当的性能。"
      },
      {
       "id": "s-6-3-2",
       "original": "Here we show that by leveraging such simple strategy the flow matching models can achieve SOTA performance while being highly efficient (e.g., > 2x smaller than Kreuk et al. (2022)).",
       "zh": "此处我们表明，借助这种简单策略，流匹配模型可以达到 SOTA 性能，同时高度高效（例如参数量比 Kreuk et al. (2022) 小 2x 以上）。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-6-1",
   "num": "6.1",
   "level": 2,
   "page": 12,
   "title": {
    "original": "Method",
    "zh": "方法"
   },
   "blocks": [
    {
     "id": "p-6-1-1",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-6-1-1-1",
       "original": "Similar to speech generation, we model the text-conditional sound distribution with flow matching.",
       "zh": "与语音生成类似，我们用流匹配对以文本为条件的音效分布建模。"
      },
      {
       "id": "s-6-1-1-2",
       "original": "In contrast to learning phoneme encoding from scratch, we employ a pre-trained text encoder to map audio captions into word embeddings.",
       "zh": "与从头学习音素编码不同，我们使用预训练文本编码器将音频字幕映射为词嵌入。"
      },
      {
       "id": "s-6-1-1-3",
       "original": "Due to the lack of alignment between audio and text embedding, a cross-attention layer is applied in each transformer layer to allow the model attend to the whole text sequence in modeling the gradient distribution, similar to Ghosal et al. (2023); Liu et al. (2023b,c); Kreuk et al. (2022).",
       "zh": "由于音频与文本嵌入之间不存在对齐，我们在每个 Transformer 层中施加交叉注意力层，使模型在建模梯度分布时能够关注整段文本序列，与 Ghosal et al. (2023); Liu et al. (2023b,c); Kreuk et al. (2022) 类似。"
      }
     ]
    },
    {
     "id": "p-6-1-2",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-6-1-2-1",
       "original": "Different from prior works in TTA such as AudioLDM (Liu et al., 2023b), AudioLDM2 (Liu et al., 2023c), Tango (Ghosal et al., 2023), we do not rely on an off-the-shelf variational auto-encoder (Kingma and Welling, 2014) to map the low-level audio representation (mel spectrogram) into a latent space and model the distribution in the original embedding space directly.",
       "zh": "与 AudioLDM（Liu et al., 2023b）、AudioLDM2（Liu et al., 2023c）、Tango（Ghosal et al., 2023）等 TTA 先前工作不同，我们不依赖现成的变分自编码器（Kingma and Welling, 2014）将低层音频表示（Mel 频谱图）映射到潜空间，而是直接在原始嵌入空间中建模分布。"
      },
      {
       "id": "s-6-1-2-2",
       "original": "This streamlines the model architecture and reduces the necessity of introducing excessive trainable parameters during fine-tuning, thus bridging the gap between pre-training and fine-tuning.",
       "zh": "这精简了模型架构，减少微调时引入过多可训练参数的需要，从而弥合预训练与微调之间的鸿沟。"
      }
     ]
    },
    {
     "id": "p-6-1-3",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-6-1-3-1",
       "original": "Except for the cross-attention layers, all the remaining parameters are initialized based on the pre-trained model introduced in Section 4.",
       "zh": "除交叉注意力层外，其余所有参数都基于第 4 节介绍的预训练模型初始化。"
      },
      {
       "id": "s-6-1-3-2",
       "original": "Similar to text-to-speech synthesis, parameter-efficient fine-tuning strategy like LoRA Hu et al. (2021) can be applied in text-to-audio generation.",
       "zh": "与文语转换类似，LoRA Hu et al. (2021) 这类参数高效微调策略可用于文生音频生成。"
      },
      {
       "id": "s-6-1-3-3",
       "original": "In practice, we observed fine-tuning the whole model leads to significantly better performance and thus choose to fine-tune the whole model by default (see Section 6.5).",
       "zh": "实践中，我们观察到全量微调带来显著更好的性能，因此默认选择全量微调（见第 6.5 节）。"
      }
     ]
    },
    {
     "id": "p-6-1-4",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-6-1-4-1",
       "original": "Multi-stage fine-tuning: Compared to transcripts for text-to-speech synthesis, high-quality audio captioning data are much more scarce.",
       "zh": "多阶段微调：与文语转换的转写相比，高质量音频字幕数据要稀缺得多。"
      },
      {
       "id": "s-6-1-4-2",
       "original": "Typically, public audio captioning datasets include fewer than 1000 hours of audios, which is orders of magnitude smaller than the speech datasets.",
       "zh": "公开音频字幕数据集通常包含的音频不足 1000 小时，比语音数据集小几个数量级。"
      },
      {
       "id": "s-6-1-4-3",
       "original": "On the other hand, the larger-scale sound data often contain noisy category labels and has distributional shift in the audio category (Kim et al., 2019).",
       "zh": "另一方面，更大规模的音效数据往往带有噪声较大的类别标签，且音频类别分布存在偏移（Kim et al., 2019）。"
      },
      {
       "id": "s-6-1-4-4",
       "original": "To mitigate this issue, we divide the fine-tuning process into two stages, which is based on low-quality (e.g., tags) and high-quality (e.g., human written captions) audio descriptions respectively.",
       "zh": "为缓解该问题，我们将微调过程分为两个阶段，分别基于低质量（如标签）和高质量（如人工撰写字幕）的音频描述。"
      },
      {
       "id": "s-6-1-4-5",
       "original": "Weights of the first model are used to initialize the subsequent model.",
       "zh": "第一阶段模型的权重用于初始化后续模型。"
      },
      {
       "id": "s-6-1-4-6",
       "original": "We argue the labeled data used in first stage, despite its noisy nature, is helpful for learning the text conditional distribution (see Section 6.5).",
       "zh": "我们认为，第一阶段的标注数据尽管噪声较大，仍有助于学习以文本为条件的分布（见第 6.5 节）。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-6-2",
   "num": "6.2",
   "level": 2,
   "page": 12,
   "title": {
    "original": "Tasks and Evaluation",
    "zh": "任务与评测"
   },
   "blocks": [
    {
     "id": "p-6-2-1",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-6-2-1-1",
       "original": "We consider the following two sound generation tasks: text-to-sound (TTA) generation and text-guided audio infilling (TAI).",
       "zh": "我们考虑以下两个音效生成任务：文生音效（TTA）生成与文本引导的音频填充（TAI）。"
      },
      {
       "id": "s-6-2-1-2",
       "original": "We use AudioCaps test set (Kim et al., 2019), a standard benchmark for sound generation (Kreuk et al., 2022; Liu et al., 2023b,c; Yang et al., 2023b; Lee et al., 2023; Ghosal et al., 2023), to evaluate all models.",
       "zh": "我们使用 AudioCaps 测试集（Kim et al., 2019）评测所有模型，它是音效生成的标准基准（Kreuk et al., 2022; Liu et al., 2023b,c; Yang et al., 2023b; Lee et al., 2023; Ghosal et al., 2023）。"
      },
      {
       "id": "s-6-2-1-3",
       "original": "For TTA, the model is evaluated standard Frechet Audio Distance (FAD) (Kilgour et al., 2019), Frechet Distance (FD) and KL divergence (KLD) based on the pre-trained audio event tagger PANN (Kong et al., 2019), and Inception score (IS) (Salimans et al., 2016).",
       "zh": "对 TTA，采用标准 Frechet Audio Distance（FAD）(Kilgour et al., 2019)、基于预训练音频事件标注器 PANN（Kong et al., 2019）的 Frechet Distance（FD）与 KL 散度（KLD），以及 Inception score（IS）(Salimans et al., 2016）评测模型。"
      },
      {
       "id": "s-6-2-1-4",
       "original": "FAD and FD measure distributionlevel similarity between reference samples and generated samples.",
       "zh": "FAD 与 FD 衡量参考样本与生成样本之间分布级的相似度。"
      },
      {
       "id": "s-6-2-1-5",
       "original": "KLD is an instance level metric computing the divergence of the acoustic event posterior between the reference and the generated sample for a given description.",
       "zh": "KLD 是实例级指标，计算给定描述下参考样本与生成样本之间声学事后概率的散度。"
      },
      {
       "id": "s-6-2-1-6",
       "original": "IS measures specificity and coverage for a set of samples without requiring references, which assigns a higher score if instance posteriors have low entropy and marginal posterior has high entropy.",
       "zh": "IS 无需参考即可衡量一组样本的特异性与覆盖度：实例后验低熵且边际后验高熵时得分更高。"
      },
      {
       "id": "s-6-2-1-7",
       "original": "The metrics are implemented following the audioldm_eval toolkit.2.",
       "zh": "各指标按 audioldm_eval 工具包实现。2."
      },
      {
       "id": "s-6-2-1-8",
       "original": "In addition, we calculate the similarity between generated audio and text description using the CLAP model Wu et al. (2023) 3.",
       "zh": "此外，我们使用 CLAP 模型 Wu et al. (2023) 3 计算生成音频与文本描述之间的相似度。"
      }
     ]
    },
    {
     "id": "p-6-2-2",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-6-2-2-1",
       "original": "In TAI, the model is conditioned on p% of the ground-truth audio as context to infill the remaining (100−p)%, in addition to the text description of the whole audio.",
       "zh": "在 TAI 中，除整段音频的文本描述外，模型还以真值音频的 p% 作为上下文，填充其余 (100−p)%。"
      },
      {
       "id": "s-6-2-2-2",
       "original": "In particular, p is set to be 30 and the middle 70% are the region to fill in.",
       "zh": "具体而言，p 设为 30，中间 70% 为待填充区域。"
      },
      {
       "id": "s-6-2-2-3",
       "original": "In addition to the metrics for TTA, we further measure the similarity to the reference audio (CLAP-aa), which is the cosine similarity between CLAP embeddings of the generated and reference audio.",
       "zh": "除 TTA 的指标外，我们还衡量与参考音频的相似度（CLAP-aa）——即生成音频与参考音频 CLAP 嵌入之间的余弦相似度。"
      }
     ]
    },
    {
     "id": "p-6-2-3",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-6-2-3-1",
       "original": "In addition to the objective metrics aforementioned, we also conduct subjective evaluation to evaluate two main aspects of the generated audio: overall naturalness (OVL) and relevance to text input (REL), similar to Kreuk et al. (2022); Liu et al. (2023b).",
       "zh": "除上述客观指标外，我们还进行主观评测，评估生成音频的两个主要方面：整体自然度（OVL）与文本输入相关性（REL），与 Kreuk et al. (2022); Liu et al. (2023b) 类似。"
      },
      {
       "id": "s-6-2-3-2",
       "original": "For these two metrics, raters were asked to rate the perceptual quality and the match between audio and text of the audio samples in a range between 1 and 5 similar to MOS.",
       "zh": "对这两个指标，要求评分者按 1 到 5 的范围对音频样本的感知质量以及音频与文本的匹配程度评分，类似于 MOS。"
      },
      {
       "id": "s-6-2-3-3",
       "original": "Based on the evaluation protocol Kreuk et al. (2022), the subjective evaluation is done on 100 randomly 2https://github.com/haoheliu/audioldm_eval 3We use the 630k-best checkpoint of https://github.com/LAION-AI/CLAP sampled files from AudioCaps test set.",
       "zh": "按照评测协议 Kreuk et al. (2022)，主观评测在从 AudioCaps 测试集随机抽取的 100 个样本上进行（2https://github.com/haoheliu/audioldm_eval 3我们使用 https://github.com/LAION-AI/CLAP 的 630k-best 检查点）。"
      },
      {
       "id": "s-6-2-3-4",
       "original": "Each sample is evaluated by 5 annotators from professional annotation service.",
       "zh": "每个样本由专业标注服务的 5 名标注者评估。"
      },
      {
       "id": "s-6-2-3-5",
       "original": "We list the annotation interface in Appendix D.",
       "zh": "标注界面见附录 D。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-6-3",
   "num": "6.3",
   "level": 2,
   "page": 13,
   "title": {
    "original": "Experimental Setup",
    "zh": "实验设置"
   },
   "blocks": [
    {
     "id": "p-6-3-1",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-6-3-1-1",
       "original": "Data: To train Audiobox Sound, we use about 6K hours of audio data, among which ∼150 hours are captioned audios (SD-cap-150) and the remaining ones only consist of audio tags (SD-tag-6K).",
       "zh": "数据：我们使用约 6K 小时音频训练 Audiobox Sound，其中约 150 小时为带字幕音频（SD-cap-150），其余仅有音频标签（SD-tag-6K）。"
      },
      {
       "id": "s-6-3-1-2",
       "original": "During the first-stage fine-tuning, the whole dataset is used while only the captioning data are used in the second stage.",
       "zh": "第一阶段微调使用全部数据，第二阶段只使用字幕数据。"
      },
      {
       "id": "s-6-3-1-3",
       "original": "To tackle the ontology of audio tags, we concatenate the tags of different levels as the pseudo-caption of the audio.",
       "zh": "针对音频标签的本体结构，我们将不同层级的标签拼接作为音频的伪字幕。"
      },
      {
       "id": "s-6-3-1-4",
       "original": "See Table 4 for example audio description in these two sources.",
       "zh": "这两种来源的音频描述示例见 Table 4。"
      }
     ]
    },
    {
     "id": "tab-6-3-1",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "tab-6-3-1-s1",
       "original": "Table 4 Examples of audio descriptions in tag-based and caption-based datasets (Note: the two columns of each row are unaligned.)",
       "zh": "Table 4 基于标签与基于字幕数据集中的音频描述示例（注：每行两列并不对应。）"
      }
     ]
    },
    {
     "id": "p-6-3-2",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-6-3-2-1",
       "original": "Tag-based description Caption-based description Animal A woman talks nearby as water pours Drill Multiple clanging and clanking sounds Fill, Liquid The sizzling of food while a dish is clanking Bell, Hall, Room, Inside, Large a motorboat cruises along, and a man talks Wolves, Domestic, Animal, Canidae, Dogs, Pets Bark, Bow-wow, Animals, Growling The wind is blowing, insects are singing, and rustling occurs Implementation Details: We use T5-base (Raffel et al., 2020) to map the text description into embeddings.",
       "zh": "基于标签的描述｜基于字幕的描述：Animal｜一位女士在附近说话，水在倾倒；Drill｜多声铿锵敲击声；Fill, Liquid｜食物滋滋作响，碗碟叮当；Bell, Hall, Room, Inside, Large｜摩托艇驶过，一位男士说话；Wolves, Domestic, Animal, Canidae, Dogs, Pets｜Bark, Bow-wow, Animals, Growling；风在吹，虫在鸣，伴有沙沙声。实现细节：我们使用 T5-base（Raffel et al., 2020）将文本描述映射为嵌入。"
      },
      {
       "id": "s-6-3-2-2",
       "original": "Each cross-attention layer has 16 heads and its implementation remains same as the self-attention layers except that keys and values are text embeddings.",
       "zh": "每个交叉注意力层有 16 个头，实现与自注意力层相同，只是键和值改为文本嵌入。"
      },
      {
       "id": "s-6-3-2-3",
       "original": "The time-step embedding is added to the T5 embedding before being attended to.",
       "zh": "时间步嵌入在参与注意力计算前加到 T5 嵌入上。"
      },
      {
       "id": "s-6-3-2-4",
       "original": "In the first stage, we fine-tune the model for 200K updates with an effective batch size of 720K frames.",
       "zh": "第一阶段，我们以 720K 帧的有效批大小微调模型 200K 次更新。"
      },
      {
       "id": "s-6-3-2-5",
       "original": "During the second stage, we further fine-tune the model for 100K updates with an effective batch size 240K frames.",
       "zh": "第二阶段，再以 240K 帧的有效批大小微调 100K 次更新。"
      },
      {
       "id": "s-6-3-2-6",
       "original": "For both stages, the learning rate and gradient clipping are set to 0.0002 and 0.2 respectively.",
       "zh": "两个阶段的学习率与梯度裁剪分别设为 0.0002 和 0.2。"
      },
      {
       "id": "s-6-3-2-7",
       "original": "For inference, we use dopri5 solver with absolute and relative tolerance of 10−5 as the default option.",
       "zh": "推理默认使用 dopri5 求解器，绝对与相对容差均为 10−5。"
      },
      {
       "id": "s-6-3-2-8",
       "original": "The classifier-free guidance weight is tuned between 0 and 5 and we found setting it to 1 leads to the best result.",
       "zh": "无分类器引导权重在 0 到 5 之间调参，我们发现设为 1 效果最好。"
      },
      {
       "id": "s-6-3-2-9",
       "original": "For each text prompt, we generate 32 random samples and select the one with the highest CLAP similarity to the text prompt.",
       "zh": "对每个文本提示，我们生成 32 个随机样本，选择与文本提示 CLAP 相似度最高的一个。"
      },
      {
       "id": "s-6-3-2-10",
       "original": "For audio infilling, the masked audio is always kept for conditioning and only the text description is optionally dropped for classifier free guidance.",
       "zh": "对音频填充，掩蔽音频始终保留作为条件，只有文本描述可选地被丢弃以做无分类器引导。"
      }
     ]
    },
    {
     "id": "p-6-3-3",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-6-3-3-1",
       "original": "Baselines: We compare Audiobox Sound against models from the faimily of AudioLDM2 Liu et al. (2023c) and TANGO Ghosal et al. (2023), which stand as current SOTA approaches for general audio generation Liu et al. (2023c).",
       "zh": "基线：我们将 Audiobox Sound 与 AudioLDM2 Liu et al. (2023c) 和 TANGO Ghosal et al. (2023) 系列模型对比，它们是当前通用音频生成的 SOTA 方法 Liu et al. (2023c)。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-6-4",
   "num": "6.4",
   "level": 2,
   "page": 13,
   "title": {
    "original": "Main Results",
    "zh": "实验结果"
   },
   "blocks": [
    {
     "id": "p-6-4-1",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-6-4-1-1",
       "original": "Text-To-Audio: Table 5 compares our model to prior audio audio generation models in TTA.",
       "zh": "文生音频：Table 5 在 TTA 上将我们的模型与先前的音频生成模型对比。"
      },
      {
       "id": "s-6-4-1-2",
       "original": "Audiobox Sound consistently outperforms all prior works in both objective and subjective evaluation by a large margin, though it is significantly more parameter efficient.",
       "zh": "Audiobox Sound 在客观与主观评测上均以大幅优势一致超越所有先前工作，尽管其参数效率高得多。"
      },
      {
       "id": "s-6-4-1-3",
       "original": "It is also worth noting compared to many approaches listed in Table 5, the sound training data we used is also fewer.",
       "zh": "还值得注意的是，与 Table 5 列出的许多方法相比，我们使用的音效训练数据也更少。"
      },
      {
       "id": "s-6-4-1-4",
       "original": "This further reveals the effect of general domain pre-training for sound generation.",
       "zh": "这进一步揭示了通用领域预训练对音效生成的作用。"
      }
     ]
    },
    {
     "id": "p-6-4-2",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-6-4-2-1",
       "original": "Text-To-Audio Infilling: Table 6 shows the the performance of Audiobox Sound on TAI, as well as its comparison to prior works.",
       "zh": "文生音频填充：Table 6 给出 Audiobox Sound 在 TAI 上的性能，及与先前工作的对比。"
      },
      {
       "id": "s-6-4-2-2",
       "original": "Our model outperforms prior works by a large margin as well on this task.",
       "zh": "我们的模型在该任务上同样大幅超越先前工作。"
      },
      {
       "id": "s-6-4-2-3",
       "original": "Compared to TAI, we noticed a mixing result according to different metrics.",
       "zh": "与 TAI 相比，我们注意到不同指标呈现出不一致的结果。"
      },
      {
       "id": "s-6-4-2-4",
       "original": "Noticably, the trend on FAD and KLD is not consistently, as in the comparison between TTA and TAI.",
       "zh": "值得注意的是，FAD 与 KLD 的趋势并不一致，正如 TTA 与 TAI 的比较所示。"
      },
      {
       "id": "s-6-4-2-5",
       "original": "This can be related to the sensitivity of metrics.",
       "zh": "这可能与指标的敏感性有关。"
      },
      {
       "id": "s-6-4-2-6",
       "original": "On the other hand, the similarity between the generation and reference is greatly increased (CLAP-aa: 0.61→0.77) when the context is fed into the model, which suggests the improvement of coherence to the original audio when context is employed.",
       "zh": "另一方面，当上下文输入模型后，生成结果与参考的相似度大幅提升（CLAP-aa：0.61→0.77），表明使用上下文增强了与原始音频的一致性。"
      }
     ]
    },
    {
     "id": "p-6-4-3",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-6-4-3-1",
       "original": "Inference efficiency: In addition to quality metrics, we further show the quality-speed trade-off at inference time in Figure 2.",
       "zh": "推理效率：除质量指标外，我们还在 Figure 2 中展示推理时的质量-速度权衡。"
      },
      {
       "id": "s-6-4-3-2",
       "original": "Specifically, we vary the number of inference steps, which correspond to the step size in",
       "zh": "具体而言，我们改变推理步数（对应我们模型 ODE 求解器的步长，具体为"
      }
     ]
    },
    {
     "id": "tab-6-4-1",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "tab-6-4-1-s1",
       "original": "Table 5 Text-to-audio generation results on AudioCaps evaluation set. Baselines are evaluated based on the respective official repos. Subjective scores are computed based on 95% confidence interval.",
       "zh": "Table 5 AudioCaps 评测集上的文生音频结果。基线基于各自官方仓库评测。主观分数按 95% 置信区间计算。"
      }
     ]
    },
    {
     "id": "p-6-4-4",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-6-4-4-1",
       "original": "objective subjective FAD ↓ FD ↓ KLD ↓ IS ↑ CLAP ↑ OVL ↑ REL ↑ Ground-truth",
       "zh": "表头：objective（FAD ↓ / FD ↓ / KLD ↓ / IS ↑ / CLAP ↑）× subjective（OVL ↑ / REL ↑）——Ground-truth（后续照原文）。"
      }
     ]
    },
    {
     "id": "eq-6-4-1",
     "type": "equation",
     "page": 14,
     "original": "- - - 13.28 0.49 3.36± 0.18 3.86± 0.18"
    },
    {
     "id": "eq-6-4-2",
     "type": "equation",
     "page": 14,
     "original": "AudioLDM-L-Full Liu et al. (2023b)"
    },
    {
     "id": "eq-6-4-3",
     "type": "equation",
     "page": 14,
     "original": "3.37 28.76 1.66 8.72 0.43 2.48± 0.14 3.20± 0.18"
    },
    {
     "id": "eq-6-4-4",
     "type": "equation",
     "page": 14,
     "original": "AudioLDM 2-Full Liu et al. (2023c)"
    },
    {
     "id": "eq-6-4-5",
     "type": "equation",
     "page": 14,
     "original": "1.76 32.12 1.71 8.56 0.43 2.90± 0.16 2.98± 0.19"
    },
    {
     "id": "eq-6-4-6",
     "type": "equation",
     "page": 14,
     "original": "AudioLDM 2-Full-Large Liu et al. (2023c)"
    },
    {
     "id": "eq-6-4-7",
     "type": "equation",
     "page": 14,
     "original": "1.89 33.28 1.60 8.55 0.45 2.90± 0.16 3.13± 0.17"
    },
    {
     "id": "eq-6-4-8",
     "type": "equation",
     "page": 14,
     "original": "TANGO Ghosal et al. (2023)"
    },
    {
     "id": "eq-6-4-9",
     "type": "equation",
     "page": 14,
     "original": "1.57 23.78 1.37 8.30 0.51 3.10± 0.14 3.51± 0.16"
    },
    {
     "id": "eq-6-4-10",
     "type": "equation",
     "page": 14,
     "original": "TANGO-full-FT Ghosal et al. (2023)"
    },
    {
     "id": "eq-6-4-11",
     "type": "equation",
     "page": 14,
     "original": "2.19 18.47 1.20 8.80 0.56 3.04± 0.13 3.78± 0.15"
    },
    {
     "id": "eq-6-4-12",
     "type": "equation",
     "page": 14,
     "original": "Audiobox Sound"
    },
    {
     "id": "eq-6-4-13",
     "type": "equation",
     "page": 14,
     "original": "0.77 8.30 1.15 12.70 0.71 3.43± 0.15 4.09± 0.15"
    },
    {
     "id": "tab-6-4-2",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "tab-6-4-2-s1",
       "original": "Table 6 Text-to-audio infilling results on AudioCaps evaluation set. Baselines are evaluated based on the respective official repos. Subjective scores are computed based on 95% confidence interval.",
       "zh": "Table 6 AudioCaps 评测集上的文生音频填充结果。基线基于各自官方仓库评测。主观分数按 95% 置信区间计算。"
      }
     ]
    },
    {
     "id": "p-6-4-5",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-6-4-5-1",
       "original": "objective subjective FAD ↓ FD ↓ KLD ↓ IS ↑ CLAP ↑ CLAP-aa ↑ OVL ↑ REL ↑ Ground-truth",
       "zh": "（表：objective（FAD↓/FD↓/KLD↓/IS↑/CLAP↑/CLAP-aa↑）× subjective（OVL↑/REL↑）——Ground-truth、AudioLDM-L-Full、TANGO、TANGO-full-FT、Audiobox Sound 各行的完整数值。原始数据照录如下）\n客观 主观 FAD ↓ FD ↓ KLD ↓ IS ↑ CLAP ↑ CLAP-aa ↑ OVL ↑ REL ↑ Ground-truth - - - 13.28 0.49 - 3.13± 0.13 4.21± 0.15 AudioLDM-L-Full Liu et al. (2023b) 2.65 21.27 0.84 8.27 0.51 0.76 2.58± 0.12 3.58± 0.17 TANGO Ghosal et al. (2023) 1.25 18.02 0.78 8.53 0.53 0.78 2.75± 0.12 3.94± 0.15 TANGO-full-FT Ghosal et al. (2023) 1.86 15.00 0.71 8.95 0.56 0.78 2.79± 0.12 4.07± 0.14 Audiobox Sound 1.29 7.19 0.65 12.05 0.63 0.77 2.95± 0.12 4.20± 0.12 我们模型的 ODE 求解器以及 TANGO 和 AudioLDM2 中的 DDIM 步数。"
      }
     ]
    },
    {
     "id": "eq-6-4-14",
     "type": "equation",
     "page": 14,
     "original": "- - - 13.28 0.49 - 3.13± 0.13 4.21± 0.15"
    },
    {
     "id": "eq-6-4-15",
     "type": "equation",
     "page": 14,
     "original": "AudioLDM-L-Full Liu et al. (2023b)"
    },
    {
     "id": "eq-6-4-16",
     "type": "equation",
     "page": 14,
     "original": "2.65 21.27 0.84 8.27 0.51 0.76 2.58± 0.12 3.58± 0.17"
    },
    {
     "id": "eq-6-4-17",
     "type": "equation",
     "page": 14,
     "original": "TANGO Ghosal et al. (2023)"
    },
    {
     "id": "eq-6-4-18",
     "type": "equation",
     "page": 14,
     "original": "1.25 18.02 0.78 8.53 0.53 0.78 2.75± 0.12 3.94± 0.15"
    },
    {
     "id": "eq-6-4-19",
     "type": "equation",
     "page": 14,
     "original": "TANGO-full-FT Ghosal et al. (2023)"
    },
    {
     "id": "eq-6-4-20",
     "type": "equation",
     "page": 14,
     "original": "1.86 15.00 0.71 8.95 0.56 0.78 2.79± 0.12 4.07± 0.14"
    },
    {
     "id": "eq-6-4-21",
     "type": "equation",
     "page": 14,
     "original": "Audiobox Sound"
    },
    {
     "id": "eq-6-4-22",
     "type": "equation",
     "page": 14,
     "original": "1.29 7.19 0.65 12.05 0.63 0.77 2.95± 0.12 4.20± 0.12"
    },
    {
     "id": "p-6-4-6",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-6-4-6-1",
       "original": "the ODE solver for our model and the number of DDIM steps in TANGO and AudioLDM2.",
       "zh": "（表：objective（FAD↓/FD↓/KLD↓/IS↑/CLAP↑/CLAP-aa↑）× subjective（OVL↑/REL↑）——Ground-truth、AudioLDM-L-Full、TANGO、TANGO-full-FT、Audiobox Sound 各行的完整数值。原始数据照录如下）\n客观 主观 FAD ↓ FD ↓ KLD ↓ IS ↑ CLAP ↑ CLAP-aa ↑ OVL ↑ REL ↑ Ground-truth - - - 13.28 0.49 - 3.13± 0.13 4.21± 0.15 AudioLDM-L-Full Liu et al. (2023b) 2.65 21.27 0.84 8.27 0.51 0.76 2.58± 0.12 3.58± 0.17 TANGO Ghosal et al. (2023) 1.25 18.02 0.78 8.53 0.53 0.78 2.75± 0.12 3.94± 0.15 TANGO-full-FT Ghosal et al. (2023) 1.86 15.00 0.71 8.95 0.56 0.78 2.79± 0.12 4.07± 0.14 Audiobox Sound 1.29 7.19 0.65 12.05 0.63 0.77 2.95± 0.12 4.20± 0.12 我们模型的 ODE 求解器以及 TANGO 和 AudioLDM2 中的 DDIM 步数。"
      },
      {
       "id": "s-6-4-6-2",
       "original": "Audiobox Sound achieves consistently higher quality (lower FAD) with the same number of inference steps compared to AudioLDM2 and Tango.",
       "zh": "与 AudioLDM2 和 Tango 相比，Audiobox Sound 在相同推理步数下取得一致更高的质量（更低的 FAD）。"
      },
      {
       "id": "s-6-4-6-3",
       "original": "This implies the better efficiency of the flow-matching approach Audiobox is based on, as is similarly demonstrated in Le et al. (2023).",
       "zh": "这意味着 Audiobox 所基于的流匹配方法效率更高，与 Le et al. (2023) 的结论类似。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-6-5",
   "num": "6.5",
   "level": 2,
   "page": 14,
   "title": {
    "original": "Analysis and Ablation Study",
    "zh": "分析与消融研究"
   },
   "blocks": [
    {
     "id": "p-6-5-1",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-6-5-1-1",
       "original": "Ablation Study: Here we conduct an ablation study showing the effect of different components of Audiobox Sound.",
       "zh": "消融研究：此处我们进行消融研究，考察 Audiobox Sound 各组件的作用。"
      },
      {
       "id": "s-6-5-1-2",
       "original": "Specifically, we vary the following training strategies: training with SD-cap-150 only, training with SD-tag-6K and SD-cap-150, training with the whole speech, music and sound datasets.",
       "zh": "具体而言，我们变化以下训练策略：仅用 SD-cap-150 训练、用 SD-tag-6K 和 SD-cap-150 训练、用完整的语音、音乐与音效数据集训练。"
      }
     ]
    },
    {
     "id": "p-6-5-2",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-6-5-2-1",
       "original": "As is shown in Table 7, using a general pre-trained model boosts the performance by ∼20% in FAD.",
       "zh": "如 Table 7 所示，使用通用预训练模型将 FAD 提升了约 20%。"
      },
      {
       "id": "s-6-5-2-2",
       "original": "Despite the discrepancy in task and data domain, generation of universal audios is a beneficial pretext task for text-to-sound generation.",
       "zh": "尽管任务与数据领域不同，通用音频生成是文生音效生成的有益前置任务。"
      },
      {
       "id": "s-6-5-2-3",
       "original": "As music and speech constitutes a significant portion of our evaluation set, increasing the scale of these two modalities in pre-training provides additional benefits.",
       "zh": "由于音乐与语音占我们评测集的很大一部分，在预训练中增加这两种模态的规模提供了额外收益。"
      },
      {
       "id": "s-6-5-2-4",
       "original": "Furthermore, the two-stage fine-tuning also consistently outperforms fine-tuning with SD-cap-150 only regardless of using a pre-trained model or not.",
       "zh": "此外，无论是否使用预训练模型，两阶段微调都一致优于仅用 SD-cap-150 微调。"
      },
      {
       "id": "s-6-5-2-5",
       "original": "The gain is mostly attributed to scaling up in-domain training data (i.e., sound only).",
       "zh": "这一增益主要来自领域内训练数据（即仅音效）的扩展。"
      },
      {
       "id": "s-6-5-2-6",
       "original": "Despite the labels being different, simply using audio tags can still enhance learning the mapping between the description of events and the actual audio.",
       "zh": "尽管标签并不相同，简单地使用音频标签仍能加强事件描述与实际音频之间映射的学习。"
      },
      {
       "id": "s-6-5-2-7",
       "original": "Finally, comparing the last two rows of Table 7 suggests reranking with CLAP model is an effective approach to improving the overall performance in both the audio quality (FAD: 0.91 →0.78) and text-audio relatedness (CLAP score: 0.60 →0.71).",
       "zh": "最后，比较 Table 7 最后两行表明，用 CLAP 模型重排序是提升整体性能的有效方法——无论是音频质量（FAD：0.91 →0.78）还是文本-音频相关性（CLAP 分数：0.60 →0.71）。"
      }
     ]
    },
    {
     "id": "p-6-5-3",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-6-5-3-1",
       "original": "Fine-tuning strategy We compare the two different fine-tuning strategies: LoRA vs. full model fine-tuning.",
       "zh": "微调策略 我们比较两种微调策略：LoRA 与全量微调。"
      },
      {
       "id": "s-6-5-3-2",
       "original": "For LoRA, we add LoRA adaptors described in Section 5 to self-attention layers.",
       "zh": "对 LoRA，我们为自注意力层添加第 5 节所述的 LoRA 适配器。"
      },
      {
       "id": "s-6-5-3-3",
       "original": "In contrast to full-tuning where the whole model is fine-tuned, only the adaptors and cross-attention layers will be updated during fine-tuning and all the remaining parts are frozen.",
       "zh": "与更新整个模型的全量微调不同，微调时只更新适配器与交叉注意力层，其余部分均冻结。"
      },
      {
       "id": "s-6-5-3-4",
       "original": "LoRA fine-tuning is on average 15% to 30% worse (relative) than its full fine-tuning counterpart.",
       "zh": "LoRA 微调平均比对应的全量微调差 15% 到 30%（相对值）。"
      },
      {
       "id": "s-6-5-3-5",
       "original": "The incorporation of cross-attention layers induces large architectural change to the model, which increases the necessity of fine-tuning the whole model.",
       "zh": "交叉注意力层的引入为模型带来了较大的架构变化，增加了全量微调的必要性。"
      }
     ]
    },
    {
     "id": "fig-6-5-1",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "fig-6-5-1-s1",
       "original": "Figure 2 Quality-speed trade-off of Audiobox Sound, Tango and AudioLDM2. NFE: Number of function evaluations.",
       "zh": "Figure 2 Audiobox Sound、Tango 与 AudioLDM2 的质量-速度权衡。NFE：函数评估次数。"
      }
     ]
    },
    {
     "id": "tab-6-5-1",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "tab-6-5-1-s1",
       "original": "Table 7 Ablation for sound generation on AudioCaps evaluation set. Tag: audio tagging data, Cap: captioning data. Note the results of this table are based on the midpoint solver with a step size of 1/32 (equivalent to 64 NFE) for the purpose of inference speed-up.",
       "zh": "Table 7 AudioCaps 评测集上音效生成的消融。Tag：音频标注数据；Cap：字幕数据。注：为加快推理速度，本表结果基于 midpoint 求解器、步长 1/32（等效 64 次 NFE）。"
      }
     ]
    },
    {
     "id": "p-6-5-4",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-6-5-4-1",
       "original": "PT (SSL) FT-1 FT-2 w/ rerank FAD ↓ FD ↓ KLD ↓ IS ↑ CLAP ↑",
       "zh": "表头：PT (SSL) / FT-1 / FT-2 / w/ rerank × FAD ↓ / FD ↓ / KLD ↓ / IS ↑ / CLAP ↑。"
      }
     ]
    },
    {
     "id": "eq-6-5-1",
     "type": "equation",
     "page": 15,
     "original": "✗ -"
    },
    {
     "id": "eq-6-5-2",
     "type": "equation",
     "page": 15,
     "original": "SD-cap-150"
    },
    {
     "id": "eq-6-5-3",
     "type": "equation",
     "page": 15,
     "original": "✓ 1.17 9.88 1.17 11.43 0.71 ✗"
    },
    {
     "id": "eq-6-5-4",
     "type": "equation",
     "page": 15,
     "original": "SD-tag-6K + SD-cap-150"
    },
    {
     "id": "eq-6-5-5",
     "type": "equation",
     "page": 15,
     "original": "- ✓ 1.61 13.16 1.34 10.17 0.67 ✗"
    },
    {
     "id": "eq-6-5-6",
     "type": "equation",
     "page": 15,
     "original": "SD-tag-6K + SD-cap-150 SD-cap-150"
    },
    {
     "id": "eq-6-5-7",
     "type": "equation",
     "page": 15,
     "original": "✓ 0.97 8.70 1.17 12.19 0.71 ✓ -"
    },
    {
     "id": "eq-6-5-8",
     "type": "equation",
     "page": 15,
     "original": "SD-cap-150"
    },
    {
     "id": "eq-6-5-9",
     "type": "equation",
     "page": 15,
     "original": "✓ 0.95 8.70 1.15 12.21 0.70 ✓"
    },
    {
     "id": "eq-6-5-10",
     "type": "equation",
     "page": 15,
     "original": "SD-tag-6K + SD-cap-150 SD-cap-150"
    },
    {
     "id": "eq-6-5-11",
     "type": "equation",
     "page": 15,
     "original": "✗ 0.91 8.95 1.33 12.41 0.60 ✓"
    },
    {
     "id": "eq-6-5-12",
     "type": "equation",
     "page": 15,
     "original": "SD-tag-6K + SD-cap-150 SD-cap-150"
    },
    {
     "id": "eq-6-5-13",
     "type": "equation",
     "page": 15,
     "original": "✓ 0.78 8.31 1.14 12.62 0.71"
    }
   ]
  },
  {
   "id": "sec-7",
   "num": "7",
   "level": 1,
   "page": 15,
   "title": {
    "original": "Audiobox: Toward Universal and Controllable Audio Generation",
    "zh": "Audiobox：迈向通用且可控的音频生成"
   },
   "blocks": [
    {
     "id": "p-7-1",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-7-1-1",
       "original": "In previous sections, we discussed speech and sound generation independently.",
       "zh": "前面几节分别独立讨论了语音生成与音效生成。"
      },
      {
       "id": "s-7-1-2",
       "original": "This section presents Audiobox, a single model that can produce both speech and audio conditioned on text description or audio example.",
       "zh": "本节提出 Audiobox——一个能以文本描述或音频示例为条件、同时生成语音与音频的单一模型。"
      },
      {
       "id": "s-7-1-3",
       "original": "Fine-tuning our pre-trained model for this joint task enables natural language instruction to control the output speech attributes like perceived age, gender, quality on top of example-based control (ZS-TTS).",
       "zh": "将预训练模型针对这一联合任务微调后，可以在示例式控制（ZS-TTS）之上，用自然语言指令控制输出语音的感知年龄、性别、质量等属性。"
      },
      {
       "id": "s-7-1-4",
       "original": "Furthermore, training on wide variety of data enables simulating voices in different environments and accompanied by acoustic events such as birds chirping, applause.",
       "zh": "此外，在多样化数据上训练使模型能模拟不同环境中的声音，并配以鸟鸣、掌声等声学事件。"
      },
      {
       "id": "s-7-1-5",
       "original": "We further envision a scenario where the user would like to restyle the given audio example with natural language instruction.",
       "zh": "我们进一步设想一种场景：用户希望用自然语言指令重塑给定音频示例的风格。"
      },
      {
       "id": "s-7-1-6",
       "original": "For example, change the audio style to make it sound like it is recorded in a cathedral.",
       "zh": "例如，改变音频风格，使其听起来像是在大教堂里录制的。"
      },
      {
       "id": "s-7-1-7",
       "original": "This requires disentangled vocal style control using an additional utterance from the same speaker called voice prompt.",
       "zh": "这需要借助来自同一说话人的另一条话语（称为声音提示）实现解耦的声线风格控制。"
      }
     ]
    },
    {
     "id": "p-7-2",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-7-2-1",
       "original": "We design Audiobox to enable speech and sound generation capabilities previously discussed in Sections 5 and 6.",
       "zh": "我们设计 Audiobox，使其具备第 5、6 节讨论的语音与音效生成能力。"
      },
      {
       "id": "s-7-2-2",
       "original": "Furthermore through voice prompt and description we also envision vocal style transfer to more complex acoustic scenes enabled through joint training.",
       "zh": "此外，借助声音提示与描述，我们还设想通过联合训练实现面向更复杂声学场景的声线风格迁移。"
      },
      {
       "id": "s-7-2-3",
       "original": "Below we discuss in details speech caption and voice prompt modeling, data creation, and experiments.",
       "zh": "下面详细讨论语音字幕与声音提示的建模、数据构建与实验。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-7-1",
   "num": "7.1",
   "level": 2,
   "page": 16,
   "title": {
    "original": "Data Creation",
    "zh": "数据构建"
   },
   "blocks": [
    {
     "id": "eq-7-1-1",
     "type": "equation",
     "page": 16,
     "original": "7.1.1"
    },
    {
     "id": "p-7-1-1",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-7-1-1-1",
       "original": "Speech Captions We aim to bridge the gap between speech and sound datasets by supporting description-based control for speech generation.",
       "zh": "7.1.1 语音字幕 我们旨在通过为语音生成支持描述式控制，弥合语音数据集与音效数据集之间的鸿沟。"
      },
      {
       "id": "s-7-1-1-2",
       "original": "We consider both human annotations and automatically created captions Automatic captions: Given the lack of any dataset with fine-grained description for speech, we generate speech captions using a large language model (LLM) with speech attribute tags extracted either using existing metadata or use pseudo labels using classifiers.",
       "zh": "我们同时考虑人工标注与自动构建的字幕。自动字幕：鉴于目前没有任何带细粒度语音描述的数据集，我们使用大语言模型（LLM）生成语音字幕，其输入是用现有元数据提取、或用分类器伪标注得到的语音属性标签。"
      },
      {
       "id": "s-7-1-1-3",
       "original": "We extract the following attributes: (1) age: 4 classes",
       "zh": "我们提取以下属性：(1) 年龄：4 类 (2) 性别：2 类 (3) 音频质量：3 类 (4) 音调：3 类 (5) 语速：3 类 (6) 口音：开放词表 (7) 情感：开放词表 (8) 环境：开放词表。更多细节见附录 A。"
      }
     ]
    },
    {
     "id": "eq-7-1-2",
     "type": "equation",
     "page": 16,
     "original": "(2) gender: 2 classes (3) audio quality: 3 classes (4) pitch: 3 classes (5) speaking rate: 3 classes (6) accent:"
    },
    {
     "id": "p-7-1-2",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-7-1-2-1",
       "original": "open-vocabulary (7) emotion: open-vocabulary (8) environment: open-vocabulary More details can be found in Appendix A.",
       "zh": "我们提取以下属性：(1) 年龄：4 类 (2) 性别：2 类 (3) 音频质量：3 类 (4) 音调：3 类 (5) 语速：3 类 (6) 口音：开放词表 (7) 情感：开放词表 (8) 环境：开放词表。更多细节见附录 A。"
      }
     ]
    },
    {
     "id": "p-7-1-3",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-7-1-3-1",
       "original": "Given the above attributes, we use the LLAMA2 7B model Touvron et al. (2023) to convert them into captions.",
       "zh": "给定上述属性，我们使用 LLAMA2 7B 模型 Touvron et al. (2023) 将其转换为字幕。"
      },
      {
       "id": "s-7-1-3-2",
       "original": "To capture different writing styles, we prompt the model a style bank mimicking different characters with example writing samples.",
       "zh": "为捕捉不同的写作风格，我们用一个模仿不同人物角色的风格库提示模型，并附上写作示例。"
      },
      {
       "id": "s-7-1-3-3",
       "original": "A few of them are listed below:",
       "zh": "以下列出其中几条："
      }
     ]
    },
    {
     "id": "p-7-1-4",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-7-1-4-1",
       "original": "• A young male adult voice, conveys anger and frustration.",
       "zh": "• 一个年轻的成年男性嗓音，传达出愤怒和挫败感。"
      },
      {
       "id": "s-7-1-4-2",
       "original": "The audio, of normal quality, is recorded inside a small space.",
       "zh": "音频质量正常，录制于一个小空间内。"
      },
      {
       "id": "s-7-1-4-3",
       "original": "The person speaks with South Asia accent and a normal speaking pace.",
       "zh": "此人说话带南亚口音，语速正常。"
      }
     ]
    },
    {
     "id": "p-7-1-5",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-7-1-5-1",
       "original": "• This young bloke’s ticked off, audio’s all good.",
       "zh": "• 这小伙子气坏了，音频没问题。"
      },
      {
       "id": "s-7-1-5-2",
       "original": "He’s in some small space and has a South Asian accent.",
       "zh": "他在某个小空间里，带南亚口音。"
      }
     ]
    },
    {
     "id": "p-7-1-6",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-7-1-6-1",
       "original": "Talks normal speed.",
       "zh": "语速正常。"
      }
     ]
    },
    {
     "id": "p-7-1-7",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-7-1-7-1",
       "original": "• Got this young dude who’s mad, audio’s decent.",
       "zh": "• 有这么个年轻人，火气很大，音频还行。"
      },
      {
       "id": "s-7-1-7-2",
       "original": "He’s in a tight spot, has that South Asian accent, and talks at a chill pace.",
       "zh": "他处在一个逼仄的地方，带那种南亚口音，说话节奏挺松弛。"
      }
     ]
    },
    {
     "id": "p-7-1-8",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-7-1-8-1",
       "original": "• Young man is angry.",
       "zh": "• 年轻男子很生气。"
      },
      {
       "id": "s-7-1-8-2",
       "original": "Audio is okay, small place.",
       "zh": "音频可以，小地方。"
      },
      {
       "id": "s-7-1-8-3",
       "original": "Accent from South Asia.",
       "zh": "南亚口音。"
      },
      {
       "id": "s-7-1-8-4",
       "original": "Speaks normal.",
       "zh": "语速正常。"
      }
     ]
    },
    {
     "id": "p-7-1-9",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-7-1-9-1",
       "original": "To further improve coverage over different environment and background sounds, for each utterance, we apply a random augmentation by convolving with a random room impulse responses (RIR) from a set of known environments and optionally add add a background noise from a set with known tags.",
       "zh": "为进一步扩大对不同环境与背景声的覆盖，我们对每条话语施加随机增强：与来自已知环境集合的随机房间脉冲响应（RIR）卷积，并可选择叠加来自已知标签集合的背景噪声。"
      }
     ]
    },
    {
     "id": "p-7-1-10",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-7-1-10-1",
       "original": "We also generate the corresponding caption with updated environment and background noises using the LLAMA2 7B model.",
       "zh": "我们还使用 LLAMA2 7B 模型，根据更新后的环境和背景噪声生成相应的字幕。"
      },
      {
       "id": "s-7-1-10-2",
       "original": "When adding any background noise to the utterance, we update the quality to “low”.",
       "zh": "向话语添加任何背景噪声时，我们将质量更新为「低」。"
      },
      {
       "id": "s-7-1-10-3",
       "original": "For utterances applied only RIR we update the quality to be “normal” if the original quality was “studio”.",
       "zh": "对只施加 RIR 的话语，若原质量为「录音棚级」，则更新为「正常」。"
      },
      {
       "id": "s-7-1-10-4",
       "original": "We do not apply utterances with low audio quality since those may not be suited for RIR augmentations.",
       "zh": "低音频质量的话语不做处理，因为它们可能不适合 RIR 增强。"
      }
     ]
    },
    {
     "id": "p-7-1-11",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-7-1-11-1",
       "original": "Human annotations: We create human-based annotation to gather more fine-grained description and better alignment towards human hearing perception.",
       "zh": "人工标注：我们构建人工标注，以收集更细粒度、且与人类听觉感知更一致的描述。"
      },
      {
       "id": "s-7-1-11-2",
       "original": "We select a 500 hour subset of SP-multi-100K described in Section 5.5.",
       "zh": "我们从第 5.5 节所述的 SP-multi-100K 中选取一个 500 小时子集。"
      }
     ]
    },
    {
     "id": "p-7-1-12",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-7-1-12-1",
       "original": "In the annotation guidelines, we ask the annotator to describe the perceived attribute such as: gender, age, accent, emotion, environment, tonal variation, speaking pace, pitch, emotion, audio quality, vocal style and any miscellaneous details from the speech utterances.",
       "zh": "在标注指南中，我们要求标注者描述感知到的属性，如：性别、年龄、口音、情感、环境、音高变化、语速、音调、情感、音频质量、声线风格以及话语中的任何其他细节。"
      },
      {
       "id": "s-7-1-12-2",
       "original": "In addition to this we also collect categories for the attributes.",
       "zh": "除此之外，我们还收集各属性的类别。"
      },
      {
       "id": "s-7-1-12-3",
       "original": "To ensure we get high quality description, we filter annotators in two stages.",
       "zh": "为确保获得高质量描述，我们分两阶段筛选标注者。"
      },
      {
       "id": "s-7-1-12-4",
       "original": "First, we keep annotators who successfully labeled pre-selected gold samples with high accuracy.",
       "zh": "首先，保留能以高准确率标注预选金标样本的标注者。"
      },
      {
       "id": "s-7-1-12-5",
       "original": "We additionally use an LLM to automatically rate the quality annotations to ensure high quality detailed captions to complement our automatic caption above.",
       "zh": "我们还额外使用一个 LLM 自动为标注质量打分，以确保获得高质量、细节丰富的字幕，作为上述自动字幕的补充。"
      },
      {
       "id": "s-7-1-12-6",
       "original": "More details on quality can be found in Appendix B.",
       "zh": "更多质量方面的细节见附录 B。"
      },
      {
       "id": "s-7-1-12-7",
       "original": "Here are some captions example curated by our human annotator:",
       "zh": "以下是我们的人工标注者整理出的一些字幕示例："
      }
     ]
    },
    {
     "id": "p-7-1-13",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-7-1-13-1",
       "original": "1.",
       "zh": "1."
      },
      {
       "id": "s-7-1-13-2",
       "original": "A young woman with an American accent speaks in a higher pitched voice.",
       "zh": "一位带美国口音的年轻女性用偏高的音调说话。"
      },
      {
       "id": "s-7-1-13-3",
       "original": "She speaks at a normal pace with a bit of a muffled voice.",
       "zh": "她语速正常，声音略带闷塞。"
      },
      {
       "id": "s-7-1-13-4",
       "original": "She is outside in an urban area and cars can be heard passing by in the background.",
       "zh": "她身处城市户外，背景里能听到汽车驶过。"
      },
      {
       "id": "s-7-1-13-5",
       "original": "She has a happy and excited tone that is slightly melodious.",
       "zh": "她的语气开心而兴奋，略带抑扬感。"
      },
      {
       "id": "s-7-1-13-6",
       "original": "The audio is of poor quality and dog barking can be heard at the end.",
       "zh": "音频质量较差，结尾处能听到狗叫。"
      }
     ]
    },
    {
     "id": "p-7-1-14",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-7-1-14-1",
       "original": "2.",
       "zh": "2."
      },
      {
       "id": "s-7-1-14-2",
       "original": "A middle aged man with a mildly masculine voice seems to be outside in a rural or natural environment with a moderately background noise of birds singing.",
       "zh": "一位嗓音略带阳刚的中年男子似乎在乡村或自然环境的户外，背景噪声为中等强度的鸟鸣。"
      },
      {
       "id": "s-7-1-14-3",
       "original": "He seems to be in a neutral mood when show casing a house to some people.",
       "zh": "他似乎情绪平稳，正在向一些人展示一所房子。"
      },
      {
       "id": "s-7-1-14-4",
       "original": "His voice is hoarse/rough speaking at a slow pace with an average voice pitch.",
       "zh": "他嗓音沙哑/粗糙，语速缓慢，音高适中。"
      }
     ]
    },
    {
     "id": "p-7-1-15",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-7-1-15-1",
       "original": "Voice Prompts Natural language description alone allows user to control styles through describing attributes such as age, accent, emotion, pitch, and environment.",
       "zh": "声音提示 仅靠自然语言描述，用户就可以通过描述年龄、口音、情感、音调和环境等属性来控制风格。"
      },
      {
       "id": "s-7-1-15-2",
       "original": "However, a user maybe interested in synthesizing a specific vocal style and while changing other attributes such as quality, emotion, background.",
       "zh": "然而，用户可能希望合成特定的声线风格，同时改变质量、情感、背景等其他属性。"
      },
      {
       "id": "s-7-1-15-3",
       "original": "This requires disentangled control between the input voice sample and natural language text prompt.",
       "zh": "这需要在输入声音样本与自然语言文本提示之间实现解耦控制。"
      }
     ]
    },
    {
     "id": "p-7-1-16",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-7-1-16-1",
       "original": "For each target utterance, we sample an additional utterance from the same speaker to serve as voice prompt during training.",
       "zh": "对每条目标话语，我们从同一说话人处另采样一条话语，在训练时作为声音提示。"
      },
      {
       "id": "s-7-1-16-2",
       "original": "The voice prompt is selected such that it differs from the target utterance on one or more attribute such as emotion, environment, and speaking rate.",
       "zh": "声音提示的选取标准是：它在情感、环境、语速等一个或多个属性上与目标话语不同。"
      },
      {
       "id": "s-7-1-16-3",
       "original": "This is to de-correlate the target and prompt on everything but vocal similarity.",
       "zh": "这是为了让目标与提示在声线相似度之外的一切属性上去相关。"
      },
      {
       "id": "s-7-1-16-4",
       "original": "We additionally apply a random room impulse response and background noise augmentation to the voice prompt to increase robustness as well as further de-correlation.",
       "zh": "我们还对声音提示施加随机房间脉冲响应与背景噪声增强，以增强鲁棒性并进一步去相关。"
      }
     ]
    },
    {
     "id": "p-7-1-17",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-7-1-17-1",
       "original": "Note that this is different from passing the audio as audio context (zero-shot TTS) where we expect the model to copy over emotion, environment and other background details as well.",
       "zh": "注意，这与将音频作为音频上下文（零样本 TTS）不同——后者期望模型把情感、环境和其他背景细节一并复制过来。"
      },
      {
       "id": "s-7-1-17-2",
       "original": "Here we would want the model to transfer only the vocal style from prompt and use the description for other details such as environment and emotions.",
       "zh": "在这里，我们希望模型只从提示迁移声线风格，而环境、情感等其他细节由描述决定。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-7-2",
   "num": "7.2",
   "level": 2,
   "page": 17,
   "title": {
    "original": "Method",
    "zh": "方法"
   },
   "blocks": [
    {
     "id": "p-7-2-1",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-7-2-1-1",
       "original": "Audiobox (Figure 1) conditions on both transcript and masked audio features (same as Audiobox Speech) and captions (same as Audiobox Sound) for description conditional generation.",
       "zh": "Audiobox（Figure 1）以转写与掩蔽音频特征（与 Audiobox Speech 相同）以及字幕（与 Audiobox Sound 相同）为条件，进行描述条件生成。"
      },
      {
       "id": "s-7-2-1-2",
       "original": "To unify training, for sound inputs without transcript, we create a pseudo-transcript that contains “<sound>” tokens each of length 1 second filling the length of audio.",
       "zh": "为统一训练，对没有转写的音效输入，我们构造伪转写：用每个长度为 1 秒的「<sound>」token 填满整段音频的时长。"
      },
      {
       "id": "s-7-2-1-3",
       "original": "We additionally condition on the another utterance from the same speaker (voice prompt).",
       "zh": "我们还额外以来自同一说话人的另一条话语（声音提示）为条件。"
      },
      {
       "id": "s-7-2-1-4",
       "original": "As described in Section 7.1.2, the voice prompt is selected in a adversarial fashion to enable disentangled control.",
       "zh": "如第 7.1.2 节所述，声音提示以对抗方式选取，以实现解耦控制。"
      },
      {
       "id": "s-7-2-1-5",
       "original": "For audios with missing prompts, we feed a pseudo voice prompt of length 0.1s filled with zeros.",
       "zh": "对缺少提示的音频，我们馈入长度为 0.1s、全零填充的伪声音提示。"
      },
      {
       "id": "s-7-2-1-6",
       "original": "The voice prompt is embedded by a lightweight Transformer.",
       "zh": "声音提示由一个轻量 Transformer 编码。"
      },
      {
       "id": "s-7-2-1-7",
       "original": "We then concatenate the output with the caption description embedding for cross-attention.",
       "zh": "随后将其输出与字幕描述嵌入拼接，用于交叉注意力。"
      },
      {
       "id": "s-7-2-1-8",
       "original": "We randomly initialize the parameters for the cross-attention, description projection, and character embedding weights.",
       "zh": "交叉注意力、描述投影与字符嵌入的权重随机初始化。"
      },
      {
       "id": "s-7-2-1-9",
       "original": "All other parameters are initialized based on Audiobox SSL in Section 4.",
       "zh": "其余所有参数基于第 4 节的 Audiobox SSL 初始化。"
      },
      {
       "id": "s-7-2-1-10",
       "original": "Similar to the sound model training in Section 6, we use multi-stage fine-tuning as described next.",
       "zh": "与第 6 节的音效模型训练类似，我们使用下文所述的多阶段微调。"
      }
     ]
    },
    {
     "id": "p-7-2-2",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-7-2-2-1",
       "original": "Multi-stage fine-tuning: Except for the high quality 500 hours of speech captions that we collect, the rest of our speech captions are generated using attribute tags and an LLM.",
       "zh": "多阶段微调：除我们收集的 500 小时高质量语音字幕外，其余语音字幕都是用属性标签和 LLM 生成的。"
      },
      {
       "id": "s-7-2-2-2",
       "original": "Furthermore most of the datasets do not provide any meta-data further limiting the quality of the captions.",
       "zh": "此外，大多数数据集不提供任何元数据，进一步限制了字幕质量。"
      },
      {
       "id": "s-7-2-2-3",
       "original": "To mitigate this issue we train our model in two stages.",
       "zh": "为缓解该问题，我们分两阶段训练模型。"
      },
      {
       "id": "s-7-2-2-4",
       "original": "In the first stage we use all the captions for speech and audios.",
       "zh": "第一阶段使用语音与音频的全部字幕。"
      },
      {
       "id": "s-7-2-2-5",
       "original": "To avoid under-fitting on the audio events generation, we upsample the audio data such that the ratio of total speech and audio data in hours is about 3 : 1.",
       "zh": "为避免在音频事件生成上欠拟合，我们上采样音频数据，使语音与音频数据总时长之比约为 3 : 1。"
      },
      {
       "id": "s-7-2-2-6",
       "original": "In the second stage, we initialize the model from first stage weights and only train on the high quality data that comprises 500 hour of annotated speech captions and a few other datasets with emotion and accent metadata for rich LLM captions.",
       "zh": "第二阶段，从第一阶段权重初始化模型，只在高质量数据上训练——包括 500 小时人工标注语音字幕，以及少数带情感与口音元数据、可生成丰富 LLM 字幕的数据集。"
      },
      {
       "id": "s-7-2-2-7",
       "original": "We again upsample the audio data such that the ratio of total speech and audio data is about 2.6 : 1.",
       "zh": "我们再次上采样音频数据，使语音与音频数据总量之比约为 2.6 : 1。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-7-3",
   "num": "7.3",
   "level": 2,
   "page": 17,
   "title": {
    "original": "Task and Evaluation",
    "zh": "任务与评测"
   },
   "blocks": [
    {
     "id": "p-7-3-1",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-7-3-1-1",
       "original": "In our unified Audiobox model, the model is capable of new generation tasks such as description-guided TTS (transcript + description) and description-guided TTS with extra voice conditioning generation (transcript + description + voice prompt).",
       "zh": "在我们的统一 Audiobox 模型中，模型能够执行新的生成任务，如描述引导 TTS（转写 + 描述）和带额外声线条件的描述引导 TTS（转写 + 描述 + 声音提示）。"
      },
      {
       "id": "s-7-3-1-2",
       "original": "Additionally, Audiobox also maintains generation capability from all prior section including: diverse speech sampling (transcript only), zero-shot TTS (transcript + context prompt) (see Section 5.2), text-to-sound (TTA) generation (description only) and text-guided infilling (TAI, description + context prompt) (see Section 6.2).",
       "zh": "此外，Audiobox 还保留了前面各节的全部生成能力，包括：多样化语音采样（仅转写）、零样本 TTS（转写 + 上下文提示，见第 5.2 节）、文生音效（TTA）生成（仅描述）与文本引导填充（TAI，描述 + 上下文提示，见第 6.2 节）。"
      },
      {
       "id": "s-7-3-1-3",
       "original": "In Appendix C, describe the tasks and inputs in detail.",
       "zh": "附录 C 详细描述了各任务及其输入。"
      }
     ]
    },
    {
     "id": "p-7-3-2",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-7-3-2-1",
       "original": "For all speech generation tasks, we measure the WER and similarity of vocal style if context or voice prompt is provided.",
       "zh": "对所有语音生成任务，我们在提供上下文或声音提示时测量 WER 和声线风格相似度。"
      },
      {
       "id": "s-7-3-2-2",
       "original": "In addition, for any generation task with description conditioning, we measure the similarity between description and generated audio with cosine similarity between CLAP text and audio embedding.",
       "zh": "此外，对任何带描述条件的生成任务，我们用 CLAP 文本与音频嵌入之间的余弦相似度，衡量描述与生成音频的相似度。"
      },
      {
       "id": "s-7-3-2-3",
       "original": "For the description-guided TTS, in addition to objective metric, we also conduct subjective evaluation to assess the QMOS and REL.",
       "zh": "对描述引导 TTS，除客观指标外，我们还进行主观评测，评估 QMOS 与 REL。"
      },
      {
       "id": "s-7-3-2-4",
       "original": "Below, we provide details on the CLAP model used for speech evaluation.",
       "zh": "下面给出语音评测所用 CLAP 模型的细节。"
      }
     ]
    },
    {
     "id": "p-7-3-3",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-7-3-3-1",
       "original": "Joint-CLAP similarity In terms of tasks, generating speech conditioned on text descriptions is similar to description-guided sound generation (TTA).",
       "zh": "Joint-CLAP 相似度 从任务上看，以文本描述为条件生成语音类似于描述引导的音效生成（TTA）。"
      },
      {
       "id": "s-7-3-3-2",
       "original": "As is common in TTA, we also employ the text-to-audio similarity to measure how well the generated audio matches the description.",
       "zh": "与 TTA 的惯例一样，我们也用文本-音频相似度衡量生成音频与描述的匹配程度。"
      },
      {
       "id": "s-7-3-3-3",
       "original": "However, unlike TTA scenario, joint text-audio embedding models such as CLAP Wu et al. (2023) cannot be straightforwardly applied to the speech domain.",
       "zh": "然而，与 TTA 场景不同，CLAP Wu et al. (2023) 这类文本-音频联合嵌入模型无法直接套用到语音领域。"
      },
      {
       "id": "s-7-3-3-4",
       "original": "Existing CLAP models are trained with coarse description about speech, such as \"a person speaking\".",
       "zh": "现有 CLAP 模型是用对语音的粗略描述（如「一个人在说话」）训练的。"
      },
      {
       "id": "s-7-3-3-5",
       "original": "The model is unable to distinguish fine-grained speaking styles like accent or emotion.",
       "zh": "该模型无法区分口音或情感等细粒度说话风格。"
      },
      {
       "id": "s-7-3-3-6",
       "original": "Although there exist public CLAP models which are trained with speech data, most of them are trained with (speech, transcript) pairs which is orthogonal to the text description.",
       "zh": "虽然存在用语音数据训练的公开 CLAP 模型，但它们大多用（语音，转写）对训练，这与文本描述是正交的。"
      },
      {
       "id": "s-7-3-3-7",
       "original": "Thus, for the purpose of evaluating description-conditioned speech generative models, we propose Joint-CLAP model, which is designed for both description-based speech and audio evaluation.",
       "zh": "因此，为评测描述条件的语音生成模型，我们提出 Joint-CLAP 模型，同时面向基于描述的语音与音频评测。"
      }
     ]
    },
    {
     "id": "p-7-3-4",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-7-3-4-1",
       "original": "Training Similar to CLAP Wu et al. (2023), Joint-CLAP consists of an audio and text branch, each responsible for encoding audio waveforms and the natural language sentences respectively.",
       "zh": "训练 与 CLAP Wu et al. (2023) 类似，Joint-CLAP 包含音频与文本两个分支，分别负责编码音频波形与自然语言句子。"
      },
      {
       "id": "s-7-3-4-2",
       "original": "Given a speech-text pair (xa, xt), the audio and text branch fa and ft encodes it into the embedding pair (ea, et): ea = fa(xa), et = ft(xt).",
       "zh": "给定语音-文本对 (xa, xt)，音频分支与文本分支 fa 和 ft 将其编码为嵌入对 (ea, et)：ea = fa(xa)，et = ft(xt)。"
      },
      {
       "id": "s-7-3-4-3",
       "original": "We use the same contrastive loss for model training following Wu et al. (2023); Radford et al. (2021), where τ is a learnable parameter. i=1 (log exp (ea i · et i/τ) PN j=1 exp (ea i · et j/τ) + log exp (et i · ea i /τ) PN j=1 exp (et i · ea j /τ)",
       "zh": "我们沿用 Wu et al. (2023); Radford et al. (2021) 的对比损失训练模型，其中 τ 是可学习参数。i=1 (log exp (ea i · et i/τ) PN j=1 exp (ea i · et j/τ) + log exp (et i · ea i /τ) PN j=1 exp (et i · ea j /τ) ) (2)"
      }
     ]
    },
    {
     "id": "eq-7-3-1",
     "type": "equation",
     "page": 18,
     "original": ") (2)"
    },
    {
     "id": "eq-7-3-2",
     "type": "equation",
     "page": 18,
     "original": "N X"
    },
    {
     "id": "eq-7-3-3",
     "type": "equation",
     "page": 18,
     "original": "L = 1 2N"
    },
    {
     "id": "p-7-3-5",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-7-3-5-1",
       "original": "In practice, we use pre-trained RoBERTa Liu et al. (2019) as the text encoder ft.",
       "zh": "实践中，我们使用预训练 RoBERTa Liu et al. (2019) 作为文本编码器 ft。"
      },
      {
       "id": "s-7-3-5-2",
       "original": "In contrast to CLAP, which uses pretrained audio taggers (e.g., HSTAT Chen et al. (2022a)) for audio encoding, here we use WavLM Chen et al. (2022b) as the backbone for encoding.",
       "zh": "与使用预训练音频标注器（如 HSTAT Chen et al. (2022a)）做音频编码的 CLAP 不同，我们使用 WavLM Chen et al. (2022b) 作为编码骨架。"
      },
      {
       "id": "s-7-3-5-3",
       "original": "Self-supervised speech models can better capture detailed information (e.g., speaking style) than general audio classifiers.",
       "zh": "自监督语音模型比通用音频分类器能更好地捕捉细节信息（如说话风格）。"
      },
      {
       "id": "s-7-3-5-4",
       "original": "Both RoBERTa and WavLM encoders are fine-tuned in model training.",
       "zh": "RoBERTa 与 WavLM 编码器在训练中都会微调。"
      }
     ]
    },
    {
     "id": "p-7-3-6",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-7-3-6-1",
       "original": "Data The training data of Speech-CLAP consists of SD-tag-6K, SD-cap-150, and 2K hours of speech datasets including both human and automatic captions.",
       "zh": "数据 Speech-CLAP 的训练数据包括 SD-tag-6K、SD-cap-150，以及 2K 小时同时带人工字幕和自动字幕的语音数据集。"
      },
      {
       "id": "s-7-3-6-2",
       "original": "The training set includes both speech and non-speech data in order to equip the model the discriminative capabilities for speaking with environmental sound use cases (e.g., a man speaks as birds chirp and dogs bark).",
       "zh": "训练集同时包含语音与非语音数据，以使模型具备区分「说话伴随环境声」场景的能力（例如一个人在说话，同时鸟鸣狗叫）。"
      },
      {
       "id": "s-7-3-6-3",
       "original": "The speech portion is a subset of the captioned speech described in Section 7.1.1, which are selected to balance the ratio of human annotated and LLM-augmented captions.",
       "zh": "语音部分是第 7.1.1 节所述带字幕语音的子集，选取时平衡人工标注字幕与 LLM 增强字幕的比例。"
      },
      {
       "id": "s-7-3-6-4",
       "original": "The model is evaluated on the evaluation sets of the sound and speech subset respectively.",
       "zh": "模型分别在音效与语音子集的评测集上评估。"
      }
     ]
    },
    {
     "id": "p-7-3-7",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-7-3-7-1",
       "original": "Implementation Details For audio and text encoder, we use WavLM-base+ and RoBERTa base respectively.",
       "zh": "实现细节 音频编码器与文本编码器分别使用 WavLM-base+ 与 RoBERTa base。"
      },
      {
       "id": "s-7-3-7-2",
       "original": "Using alternative speech encoders within the same family such as WavLM-large brings similar results.",
       "zh": "使用同一系列的其他语音编码器（如 WavLM-large）结果相近。"
      },
      {
       "id": "s-7-3-7-3",
       "original": "The audio and text embeddings are normalized before calculating the loss (Equation (2)).",
       "zh": "音频与文本嵌入在计算损失（Equation (2)）前均做归一化。"
      },
      {
       "id": "s-7-3-7-4",
       "original": "The model is trained using Adam optimizer Kingma and Ba (2014) with a learning rate of 5e −5.",
       "zh": "模型使用 Adam 优化器 Kingma and Ba (2014) 训练，学习率 5e −5。"
      },
      {
       "id": "s-7-3-7-5",
       "original": "We use 64 volta32 GPUs with a batch size of 75 per GPU for 200K updates.",
       "zh": "我们使用 64 张 volta32 GPU，每 GPU 批大小 75，共训练 200K 次更新。"
      },
      {
       "id": "s-7-3-7-6",
       "original": "For training stability, the gradient is clipped to 10 by norm and raw floating point precision is used without any quantization.",
       "zh": "为训练稳定性，梯度按范数裁剪到 10，并使用原始浮点精度，不做任何量化。"
      },
      {
       "id": "s-7-3-7-7",
       "original": "We track the recall (A2T@10) on the validation set at the end of each epoch and select the model checkpoint with the highest value.",
       "zh": "我们在每个 epoch 结束时跟踪验证集上的召回率（A2T@10），并选取数值最高的检查点。"
      }
     ]
    },
    {
     "id": "p-7-3-8",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-7-3-8-1",
       "original": "Retrieval Performance We compare Joint-CLAP to the original CLAPs proposed by Wu et al. (2023), measuring the text-to-audio and audio-to-text retrieval performance.",
       "zh": "检索性能 我们将 Joint-CLAP 与 Wu et al. (2023) 提出的原始 CLAP 对比，衡量文本到音频与音频到文本的检索性能。"
      },
      {
       "id": "s-7-3-8-2",
       "original": "Specifically, we take two public CLAP models trained general audios: CLAP (general audio) 4, and general audios plus speech: CLAP (w/ speech) 5 Per retrieval task, we report the recall under three thresholds: 1, 5 and 10.",
       "zh": "具体而言，我们取两个在通用音频上训练的公开 CLAP 模型：CLAP（general audio）4，以及在通用音频加语音上训练的 CLAP（w/ speech）5。每个检索任务报告 1、5、10 三个阈值下的召回率。"
      },
      {
       "id": "s-7-3-8-3",
       "original": "As is shown in Table 8, public CLAPs, regardless of whether speech data are utilized or not, achieves significantly lower performance on speech retrieval based text descriptions, with ∼30x performance degradation compared to the sound benchmark.",
       "zh": "如 Table 8 所示，无论是否使用语音数据，公开 CLAP 在基于文本描述的语音检索上性能都显著更低，相比音效基准性能下降约 30 倍。"
      },
      {
       "id": "s-7-3-8-4",
       "original": "This might be due to the naturally larger ambiguity in the task, where description of speech may exhibit higher variance.",
       "zh": "这可能源于该任务天然更大的歧义性——对语音的描述可能呈现更高的方差。"
      },
      {
       "id": "s-7-3-8-5",
       "original": "For instance, different people may have varying opinions on what constitutes fast speaking versus slow speaking.",
       "zh": "例如，不同的人对何为快语速、何为慢语速可能有不同看法。"
      },
      {
       "id": "s-7-3-8-6",
       "original": "In spite of such ambiguity, Joint-CLAP still significantly improves the retrieval performance under the same setting (T2A@10 on speech: 2.29 →22.01), while maintaining the performance for general audios (T2A@10 on sound: 63.64 →67.64).",
       "zh": "尽管存在这种歧义，Joint-CLAP 仍在相同设置下显著提升了检索性能（语音上的 T2A@10：2.29 →22.01），同时保持了通用音频上的性能（音效上的 T2A@10：63.64 →67.64）。"
      },
      {
       "id": "s-7-3-8-7",
       "original": "The gain is attributed to fine-tuning with speech-specific datasets 4https://huggingface.co/lukewys/laion_clap/blob/main/630k-best.pt 5https://huggingface.co/lukewys/laion_clap/blob/main/music_speech_audioset_epoch_15_esc_89.98.pt and using a high-performing speech encoder.",
       "zh": "这一增益归因于用语音专用数据集微调 4https://huggingface.co/lukewys/laion_clap/blob/main/630k-best.pt 5https://huggingface.co/lukewys/laion_clap/blob/main/music_speech_audioset_epoch_15_esc_89.98.pt，并使用高性能语音编码器。"
      },
      {
       "id": "s-7-3-8-8",
       "original": "To further ablate this effect, we trained a CLAP model without altering the model architecture using in-domain speech data.",
       "zh": "为进一步消融该效应，我们在不改变模型架构的情况下，用领域内语音数据训练了一个 CLAP 模型。"
      },
      {
       "id": "s-7-3-8-9",
       "original": "The retrieval performance is considerably lower than the WavLM-based Joint-CLAP (e.g., T2A@10 on speech: 12.01 vs. 22.01).",
       "zh": "其检索性能显著低于基于 WavLM 的 Joint-CLAP（例如语音上的 T2A@10：12.01 对 22.01）。"
      }
     ]
    },
    {
     "id": "tab-7-3-1",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "tab-7-3-1-s1",
       "original": "Table 8 Comparison between Speech-CLAP and public CLAP models on retrieval performance in sound and speech.",
       "zh": "Table 8 Speech-CLAP 与公开 CLAP 模型在音效与语音检索性能上的对比。"
      }
     ]
    },
    {
     "id": "p-7-3-9",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-7-3-9-1",
       "original": "Speech Text→Audio Audio→Text R@1 R@5 R@10 R@1 R@5 R@10 CLAP (general audio) Wu et al. (2023)",
       "zh": "（表：Speech/Sound 下 Text→Audio 与 Audio→Text 的 R@1/R@5/R@10——CLAP (general audio)、CLAP (w/ speech)、Speech-CLAP 三系统完整数值。原始数据照录如下）\n语音 文本→音频 音频→文本 R@1 R@5 R@10 R@1 R@5 R@10 CLAP（通用音频） Wu et al. (2023) 0.36 1.29 2.29 0.64 2.26 3.55 CLAP（含语音） Wu et al. (2023) 0.82 2.42 3.37 0.51 1.90 2.60 Speech-CLAP 7.10 16.30 22.01 5.96 16.07 22.34 声音 文本→音频 音频→文本 R@1 R@5 R@10 R@1 R@5 R@10 CLAP（通用音频） Wu et al. (2023) 11.03 45.33 63.64 9.45 44.36 61.70 CLAP（含语音） Wu et al. (2023) 11.15 42.42 60.36 9.70 43.15 59.03 Speech-CLAP 13.33 51.88 67.64 11.27 47.27 64.48 Joint-CLAP 分数与人类主观评分的相关性 在实践中，我们还注意到 Joint-CLAP 模型与人类感知的文本-音频相似性更相关，而公开 CLAP 模型则不然（见图 3）。"
      }
     ]
    },
    {
     "id": "eq-7-3-4",
     "type": "equation",
     "page": 19,
     "original": "0.36 1.29 2.29 0.64 2.26 3.55"
    },
    {
     "id": "eq-7-3-5",
     "type": "equation",
     "page": 19,
     "original": "CLAP (w/ speech) Wu et al. (2023)"
    },
    {
     "id": "eq-7-3-6",
     "type": "equation",
     "page": 19,
     "original": "0.82 2.42 3.37 0.51 1.90 2.60"
    },
    {
     "id": "eq-7-3-7",
     "type": "equation",
     "page": 19,
     "original": "Speech-CLAP"
    },
    {
     "id": "eq-7-3-8",
     "type": "equation",
     "page": 19,
     "original": "7.10 16.30 22.01 5.96 16.07 22.34"
    },
    {
     "id": "p-7-3-10",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-7-3-10-1",
       "original": "Sound Text→Audio Audio→Text R@1 R@5 R@10 R@1 R@5 R@10 CLAP (general audio) Wu et al. (2023)",
       "zh": "（表：Speech/Sound 下 Text→Audio 与 Audio→Text 的 R@1/R@5/R@10——CLAP (general audio)、CLAP (w/ speech)、Speech-CLAP 三系统完整数值。原始数据照录如下）\n语音 文本→音频 音频→文本 R@1 R@5 R@10 R@1 R@5 R@10 CLAP（通用音频） Wu et al. (2023) 0.36 1.29 2.29 0.64 2.26 3.55 CLAP（含语音） Wu et al. (2023) 0.82 2.42 3.37 0.51 1.90 2.60 Speech-CLAP 7.10 16.30 22.01 5.96 16.07 22.34 声音 文本→音频 音频→文本 R@1 R@5 R@10 R@1 R@5 R@10 CLAP（通用音频） Wu et al. (2023) 11.03 45.33 63.64 9.45 44.36 61.70 CLAP（含语音） Wu et al. (2023) 11.15 42.42 60.36 9.70 43.15 59.03 Speech-CLAP 13.33 51.88 67.64 11.27 47.27 64.48 Joint-CLAP 分数与人类主观评分的相关性 在实践中，我们还注意到 Joint-CLAP 模型与人类感知的文本-音频相似性更相关，而公开 CLAP 模型则不然（见图 3）。"
      }
     ]
    },
    {
     "id": "eq-7-3-9",
     "type": "equation",
     "page": 19,
     "original": "11.03 45.33 63.64 9.45 44.36 61.70"
    },
    {
     "id": "eq-7-3-10",
     "type": "equation",
     "page": 19,
     "original": "CLAP (w/ speech) Wu et al. (2023)"
    },
    {
     "id": "eq-7-3-11",
     "type": "equation",
     "page": 19,
     "original": "11.15 42.42 60.36 9.70 43.15 59.03"
    },
    {
     "id": "eq-7-3-12",
     "type": "equation",
     "page": 19,
     "original": "Speech-CLAP"
    },
    {
     "id": "eq-7-3-13",
     "type": "equation",
     "page": 19,
     "original": "13.33 51.88 67.64 11.27 47.27 64.48"
    },
    {
     "id": "p-7-3-11",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-7-3-11-1",
       "original": "Correlation between Joint-CLAP scores and human opionion scores In practice, we also notice the Joint-CLAP model is more closely correlated to human-perceived text-audio similarity, as opposed to the public CLAP model (see Figure 3).",
       "zh": "（表：Speech/Sound 下 Text→Audio 与 Audio→Text 的 R@1/R@5/R@10——CLAP (general audio)、CLAP (w/ speech)、Speech-CLAP 三系统完整数值。原始数据照录如下）\n语音 文本→音频 音频→文本 R@1 R@5 R@10 R@1 R@5 R@10 CLAP（通用音频） Wu et al. (2023) 0.36 1.29 2.29 0.64 2.26 3.55 CLAP（含语音） Wu et al. (2023) 0.82 2.42 3.37 0.51 1.90 2.60 Speech-CLAP 7.10 16.30 22.01 5.96 16.07 22.34 声音 文本→音频 音频→文本 R@1 R@5 R@10 R@1 R@5 R@10 CLAP（通用音频） Wu et al. (2023) 11.03 45.33 63.64 9.45 44.36 61.70 CLAP（含语音） Wu et al. (2023) 11.15 42.42 60.36 9.70 43.15 59.03 Speech-CLAP 13.33 51.88 67.64 11.27 47.27 64.48 Joint-CLAP 分数与人类主观评分的相关性 在实践中，我们还注意到 Joint-CLAP 模型与人类感知的文本-音频相似性更相关，而公开 CLAP 模型则不然（见图 3）。"
      },
      {
       "id": "s-7-3-11-2",
       "original": "Specifically, we take six Audiobox models of varying performance and run subjective evaluation with these models on the four evaluation sets.",
       "zh": "具体而言，我们取 6 个性能各异的 Audiobox 模型，在 4 个评测集上进行主观评测。"
      },
      {
       "id": "s-7-3-11-3",
       "original": "As is shown in Figure 3, the Pearson correlation coefficient between the text-audio similarity and REL score is increased from 0.028 to 0.727 with a joint CLAP model, suggesting that its text-audio similarity score is a reliable metric for evaluating description-controlled speech generation.",
       "zh": "如 Figure 3 所示，采用联合 CLAP 模型后，文本-音频相似度与 REL 分数之间的 Pearson 相关系数从 0.028 提升到 0.727，表明其文本-音频相似度分数是评测描述控制语音生成的可靠指标。"
      }
     ]
    },
    {
     "id": "fig-7-3-1",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "fig-7-3-1-s1",
       "original": "Figure 3 Correlation between text-audio similarity and REL score in different CLAP models. r: Pearson correlation coefficient.",
       "zh": "Figure 3 不同 CLAP 模型中文本-音频相似度与 REL 分数的相关性。r：Pearson 相关系数。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-7-4",
   "num": "7.4",
   "level": 2,
   "page": 19,
   "title": {
    "original": "Experimental Setup",
    "zh": "实验设置"
   },
   "blocks": [
    {
     "id": "p-7-4-1",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-7-4-1-1",
       "original": "Training data: We train unified Audiobox with a combination of (1) English speech dataset (SP-Multi-100K, see Section 5.3) with additional text description and voice prompt for each corresponding utterances and (2) sound dataset with text description or tags (SD-TAG-6K and SD-CAP-150, see Section 6.3).",
       "zh": "训练数据：我们用以下数据的组合训练统一 Audiobox：(1) 英语语音数据集（SP-Multi-100K，见第 5.3 节），并为每条话语附加文本描述与声音提示；(2) 带文本描述或标签的音效数据集（SD-TAG-6K 与 SD-CAP-150，见第 6.3 节）。"
      },
      {
       "id": "s-7-4-1-2",
       "original": "In both cases, each description is either generated from an LLM, or annotated by humans.",
       "zh": "在这两种情况下，每条描述要么由 LLM 生成，要么由人工标注。"
      },
      {
       "id": "s-7-4-1-3",
       "original": "We employ two-stage fine-tuning to improve our model fidelity and quality.",
       "zh": "我们采用两阶段微调来提升模型的保真度与质量。"
      },
      {
       "id": "s-7-4-1-4",
       "original": "In the first stage fine-tuning, we incorporate all speech (SP-Multi-100K) and sound (SD-TAG-6K and SD-CAP-150) datasets into our training dataset.",
       "zh": "第一阶段微调中，我们把全部语音（SP-Multi-100K）与音效（SD-TAG-6K 和 SD-CAP-150）数据集纳入训练集。"
      },
      {
       "id": "s-7-4-1-5",
       "original": "In the second stage fine-tuning, we use a subset of our first-stage fine-tuning dataset comprised of higher quality dataset with total about 2,310 hours.",
       "zh": "第二阶段微调中，我们使用第一阶段微调数据集中质量更高的子集，总时长约 2,310 小时。"
      }
     ]
    },
    {
     "id": "p-7-4-2",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-7-4-2-1",
       "original": "Implementation details: Unified Audiobox model takes four different inputs: 1) frame-aligned transcript, 2) description, 3) voice prompts, and 4) context prompt (masked audio features).",
       "zh": "实现细节：统一 Audiobox 模型接受四种不同输入：1) 帧对齐转写，2) 描述，3) 声音提示，以及 4) 上下文提示（掩蔽音频特征）。"
      },
      {
       "id": "s-7-4-2-2",
       "original": "First, we first embed the input character sequence in frame-aligned transcript to 128 dimension features.",
       "zh": "首先，我们把帧对齐转写中的输入字符序列嵌入为 128 维特征。"
      },
      {
       "id": "s-7-4-2-3",
       "original": "The embedded sequence is then projected using a linear layer and added to the projected masked audio features as input to the Transformer.",
       "zh": "嵌入序列随后经线性层投影，并加到投影后的掩蔽音频特征上，作为 Transformer 的输入。"
      },
      {
       "id": "s-7-4-2-4",
       "original": "Next, we use T5-base to extract 512-dimension continuous embedding from the description.",
       "zh": "接着，我们使用 T5-base 从描述中提取 512 维连续嵌入。"
      },
      {
       "id": "s-7-4-2-5",
       "original": "The parameters of T5-base are kept frozen during training.",
       "zh": "训练期间 T5-base 的参数保持冻结。"
      },
      {
       "id": "s-7-4-2-6",
       "original": "We add a trainable linear layer to project the output from 512-dimensions to match the Transformer embedding dimensions (1024).",
       "zh": "我们添加一个可训练线性层，把其输出从 512 维投影到与 Transformer 嵌入维度（1024）相匹配。"
      },
      {
       "id": "s-7-4-2-7",
       "original": "For the voice prompts, we first extract dense features using the same Encodec model described in Section 4.",
       "zh": "对声音提示，我们首先用第 4 节所述的同一 EnCodec 模型提取密集特征。"
      },
      {
       "id": "s-7-4-2-8",
       "original": "These features are then input to a 3-layered Transformer model with 1024 embedding dimensions, 16 attention heads, and a feed-forward dimension of 4096.",
       "zh": "这些特征随后输入一个 3 层 Transformer，其嵌入维度为 1024，注意力头数为 16，前馈维度为 4096。"
      },
      {
       "id": "s-7-4-2-9",
       "original": "We then concatenate the time-step embedding, voice prompt encoder output, and description embedding which form the input for cross-attention.",
       "zh": "然后我们拼接时间步嵌入、声音提示编码器输出与描述嵌入，构成交叉注意力的输入。"
      }
     ]
    },
    {
     "id": "p-7-4-3",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-7-4-3-1",
       "original": "During training, we randomly drop voice prompt, captions, and context with the probabilities specified in Table 9:",
       "zh": "训练时，我们按 Table 9 指定的概率随机丢弃声音提示、字幕与上下文："
      }
     ]
    },
    {
     "id": "tab-7-4-1",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "tab-7-4-1-s1",
       "original": "Table 9 Drop-out probabilities for context (ctx), voice prompt (vp), and caption (cap). “F” (false) / “T” (true) refers whether the input is used.",
       "zh": "Table 9 context（ctx）、voice prompt（vp）与 caption（cap）的 drop-out 概率。「F」（false）/「T」（true）指该输入是否被使用。"
      }
     ]
    },
    {
     "id": "p-7-4-4",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-7-4-4-1",
       "original": "Hyper-parameters P(vp=F) p(ctx=F | vp=T) P(ctx=F | vp=F) p(cap=F)",
       "zh": "超参数 P(vp=F) p(ctx=F | vp=T) P(ctx=F | vp=F) p(cap=F) 0.5 0.7 0.5 0.3 这些概率是围绕前面讨论的具体用例设计的。"
      }
     ]
    },
    {
     "id": "eq-7-4-1",
     "type": "equation",
     "page": 20,
     "original": "0.5 0.7 0.5 0.3"
    },
    {
     "id": "p-7-4-5",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-7-4-5-1",
       "original": "These probabilities are designed with specific use cases discussed previously.",
       "zh": "超参数 P(vp=F) p(ctx=F | vp=T) P(ctx=F | vp=F) p(cap=F) 0.5 0.7 0.5 0.3 这些概率是围绕前面讨论的具体用例设计的。"
      },
      {
       "id": "s-7-4-5-2",
       "original": "Note that zero-shot TTS requires the model to copy each and every attribute from the audio prompt while restylization requires model to maintain high similarity of vocal style while discarding emotion, environment and other attributes.",
       "zh": "注意，零样本 TTS 要求模型复制音频提示中的每一个属性，而风格重塑要求模型在保持声线风格高度相似的同时，丢弃情感、环境等其他属性。"
      },
      {
       "id": "s-7-4-5-3",
       "original": "This requires us to distinguish the context from the voice prompt.",
       "zh": "这要求我们把上下文与声音提示区分开来。"
      }
     ]
    },
    {
     "id": "p-7-4-6",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-7-4-6-1",
       "original": "Setting the dropout probabilities as defined in Table 9 lead to the joint probabilities presented in Table 10.",
       "zh": "按 Table 9 定义的丢弃概率，可导出 Table 10 所示的联合概率。"
      },
      {
       "id": "s-7-4-6-2",
       "original": "The joint probabilities correspond to each of the use case that the model can support.",
       "zh": "这些联合概率分别对应模型可支持的各个用例。"
      },
      {
       "id": "s-7-4-6-3",
       "original": "Note that the generative pre-training already tunes model for ZS-TTS and diverse speech sampling applications.",
       "zh": "注意，生成式预训练已经让模型适配 ZS-TTS 与多样化语音采样应用。"
      },
      {
       "id": "s-7-4-6-4",
       "original": "Therefore, we select the hyper-parameters to bias the model towards description-guided TTS with and without vocal conditioning.",
       "zh": "因此，我们选择这些超参数，使模型向带或不带声线条件的描述引导 TTS 倾斜。"
      }
     ]
    },
    {
     "id": "tab-7-4-2",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "tab-7-4-2-s1",
       "original": "Table 10 Derived joint probabilities for context, voice prompt, and caption for different use cases.",
       "zh": "Table 10 不同用例下 context、voice prompt 与 caption 的导出联合概率。"
      }
     ]
    },
    {
     "id": "p-7-4-7",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-7-4-7-1",
       "original": "Hyper-parameters ZS-TTS Description-TTS w/ vocal Description-TTS Sampling P(ctx=T, vp=F, cap=F) P(ctx=F, vp=T, cap=T) P(ctx=F, vp=F, cap=T) P(ctx=F, vp=F, cap=F)",
       "zh": "超参数 ZS-TTS 描述引导 TTS（带声线） 描述引导 TTS 采样 P(ctx=T, vp=F, cap=F) P(ctx=F, vp=T, cap=T) P(ctx=F, vp=F, cap=T) P(ctx=F, vp=F, cap=F) 0.075 0.245 0.175 0.075 第一阶段微调中，我们在 32 张 A100-80GB GPU 上对全部参数微调最多 600K 次更新。"
      }
     ]
    },
    {
     "id": "eq-7-4-2",
     "type": "equation",
     "page": 20,
     "original": "0.075 0.245 0.175 0.075"
    },
    {
     "id": "p-7-4-8",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-7-4-8-1",
       "original": "In the first stage fine-tuning, we fine-tune all parameters for a maximum of 600K updates with 32 A100-80GB GPUs.",
       "zh": "超参数 ZS-TTS 描述引导 TTS（带声线） 描述引导 TTS 采样 P(ctx=T, vp=F, cap=F) P(ctx=F, vp=T, cap=T) P(ctx=F, vp=F, cap=T) P(ctx=F, vp=F, cap=F) 0.075 0.245 0.175 0.075 第一阶段微调中，我们在 32 张 A100-80GB GPU 上对全部参数微调最多 600K 次更新。"
      },
      {
       "id": "s-7-4-8-2",
       "original": "We stopped training after 350K steps as we didnot find any gains in model performance beyond this.",
       "zh": "我们在 350K 步后停止训练，因为此后模型性能不再有收益。"
      },
      {
       "id": "s-7-4-8-3",
       "original": "In the second stage, we further fine-tune our model parameter with LoRA fine-tuning on the self-attention parameters with r = 64 and cross attention input projection layers for 100K updates with 16 A100-80GB GPUs.",
       "zh": "第二阶段，我们进一步用 LoRA 微调模型参数——作用于自注意力参数（r = 64）与交叉注意力输入投影层——在 16 张 A100-80GB GPU 上训练 100K 次更新。"
      }
     ]
    },
    {
     "id": "p-7-4-9",
     "type": "paragraph",
     "page": 20,
     "sentences": [
      {
       "id": "s-7-4-9-1",
       "original": "For the unified Audiobox duration model, we use both transcript and the description text as the input.",
       "zh": "对统一 Audiobox 时长模型，我们同时使用转写与描述文本作为输入。"
      },
      {
       "id": "s-7-4-9-2",
       "original": "We use 12 Transformers decoder layer with 8 heads, 768/2048 embedding/FFN dimensions self-attention and cross-attention layer to attend the description embedding.",
       "zh": "我们使用 12 层 Transformer 解码器，8 头，嵌入/FFN 维度为 768/2048，自注意力与交叉注意力层用于关注描述嵌入。"
      },
      {
       "id": "s-7-4-9-3",
       "original": "We use 40 dimension for the character embedding.",
       "zh": "字符嵌入使用 40 维。"
      }
     ]
    },
    {
     "id": "p-7-4-10",
     "type": "paragraph",
     "page": 21,
     "sentences": [
      {
       "id": "s-7-4-10-1",
       "original": "During training, we set the description embedding drop probability 0.3.",
       "zh": "训练时，我们把描述嵌入的丢弃概率设为 0.3。"
      },
      {
       "id": "s-7-4-10-2",
       "original": "The model trained with 600K updates with flow-matching loss with 8 A100-80GB GPUS.",
       "zh": "模型在 8 张 A100-80GB GPU 上以流匹配损失训练 600K 次更新。"
      },
      {
       "id": "s-7-4-10-3",
       "original": "For evaluation, we use the checkpoint at 200K steps.",
       "zh": "评测时，我们使用 200K 步处的检查点。"
      }
     ]
    },
    {
     "id": "p-7-4-11",
     "type": "paragraph",
     "page": 21,
     "sentences": [
      {
       "id": "s-7-4-11-1",
       "original": "Evaluation data: We measure the effectiveness of description-guided TTS and description-guided TTS with vocal prompts on the following test sets.",
       "zh": "评测数据：我们在以下测试集上衡量描述引导 TTS 与带声音提示的描述引导 TTS 的效果。"
      },
      {
       "id": "s-7-4-11-2",
       "original": "First, we annotate a set of 1,946 recordings sampled from diverse sources, including LibriTTS (Zen et al., 2019), Common Voice (Ardila et al., 2019), Switchboard (Godfrey et al., 1992), Fisher (Cieri, Christopher, et al. , 2004,2005a,,), Spotify (Clifton et al., 2020), AudioSet (Gemmeke et al., 2017), Expresso (Nguyen et al., 2023) in order to evaluate the ability to generalize.",
       "zh": "首先，我们标注了 1,946 条采自多种来源的录音，包括 LibriTTS (Zen et al., 2019)、Common Voice (Ardila et al., 2019)、Switchboard (Godfrey et al., 1992)、Fisher (Cieri, Christopher, et al. , 2004,2005a,,)、Spotify (Clifton et al., 2020)、AudioSet (Gemmeke et al., 2017)、Expresso (Nguyen et al., 2023)，以评估泛化能力。"
      },
      {
       "id": "s-7-4-11-3",
       "original": "This set is denoted as SpCap (SC).",
       "zh": "该集合记为 SpCap（SC）。"
      },
      {
       "id": "s-7-4-11-4",
       "original": "The second set is AC-filtered (AC-filt) (Lee et al., 2023) with 825 utterances.",
       "zh": "第二个集合是 AC-filtered（AC-filt）(Lee et al., 2023)，含 825 条话语。"
      },
      {
       "id": "s-7-4-11-5",
       "original": "It constructed from AudioCaps test set by transcribing and keeping samples with reliable ASR transcriptions.",
       "zh": "它由 AudioCaps 测试集转写而来，只保留 ASR 转写可靠的样本。"
      }
     ]
    },
    {
     "id": "p-7-4-12",
     "type": "paragraph",
     "page": 21,
     "sentences": [
      {
       "id": "s-7-4-12-1",
       "original": "The third one is the Expresso test set (Expr) with 999 utterances.",
       "zh": "第三个是 Expresso 测试集（Expr），含 999 条话语。"
      },
      {
       "id": "s-7-4-12-2",
       "original": "Finally, the fourth one contains utterances from the internal Accent set.",
       "zh": "最后，第四个集合包含来自内部 Accent 集的话语。"
      },
      {
       "id": "s-7-4-12-3",
       "original": "We apply randomly sampled RIR and noise augmentation to construct this set and denote it as “Accent+” (500 utterances).",
       "zh": "我们施加随机采样的 RIR 与噪声增强来构造该集合，记为「Accent+」（500 条话语）。"
      },
      {
       "id": "s-7-4-12-4",
       "original": "Expr and Accent+ use speech captions derived from LLM using the available attributes.",
       "zh": "Expr 与 Accent+ 使用由 LLM 基于可用属性生成的语音字幕。"
      },
      {
       "id": "s-7-4-12-5",
       "original": "For Accent+, we additionally pass the environment and background noises tags to the LLM to incorporate the information into generated captions.",
       "zh": "对 Accent+，我们还额外把环境与背景噪声标签传给 LLM，以便把这些信息纳入生成的字幕。"
      },
      {
       "id": "s-7-4-12-6",
       "original": "Together these sets cover a wide variety of acoustic events, emotions, accents, environments, and vocal styles.",
       "zh": "这些集合合在一起覆盖了非常多样的声学事件、情感、口音、环境与声线风格。"
      }
     ]
    },
    {
     "id": "p-7-4-13",
     "type": "paragraph",
     "page": 21,
     "sentences": [
      {
       "id": "s-7-4-13-1",
       "original": "To evaluate description-based TTS with vocal prompt, we use Expr and Accent+ datasets and select another utterance from the same speaker.",
       "zh": "为评测带声音提示的描述引导 TTS，我们使用 Expr 与 Accent+ 数据集，并从同一说话人处另选一条话语。"
      },
      {
       "id": "s-7-4-13-2",
       "original": "The prompt is selected such that is different from the target utterance on either emotion or speaking style (enunciated, whisper, etc).",
       "zh": "提示的选取标准是：它在情感或说话风格（清晰发音、耳语等）上与目标话语不同。"
      },
      {
       "id": "s-7-4-13-3",
       "original": "Furthermore, we also compare against Audiobox Sound and Audiobox Speech on speech and sound applications using the evaluation sets described in Sections 5 and 6 respectively.",
       "zh": "此外，我们还分别在第 5、6 节所述的评测集上，把 Audiobox Sound 与 Audiobox Speech 在语音和音效应用上做对比。"
      }
     ]
    },
    {
     "id": "p-7-4-14",
     "type": "paragraph",
     "page": 21,
     "sentences": [
      {
       "id": "s-7-4-14-1",
       "original": "Inference: We use duration model described in this section with averaging over 5 samples.",
       "zh": "推理：我们使用本节所述的时长模型，并对 5 个样本做平均。"
      },
      {
       "id": "s-7-4-14-2",
       "original": "For descriptionguided TTS (with or without voice prompt), we additionally sample a silence duration of between 0 and 3 seconds and pad it to both ends.",
       "zh": "对描述引导 TTS（带或不带声音提示），我们额外采样一个 0 到 3 秒之间的静音时长，并填充到两端。"
      },
      {
       "id": "s-7-4-14-3",
       "original": "We find this generates audios that are coherent with the description particularly when they also mention acoustic events.",
       "zh": "我们发现这样生成的音频与描述更一致，特别是当描述还提到声学事件时。"
      },
      {
       "id": "s-7-4-14-4",
       "original": "For example: a man speaks and car passes by while a dog is barking.",
       "zh": "例如：一个人在说话，同时有汽车驶过、狗在叫。"
      },
      {
       "id": "s-7-4-14-5",
       "original": "However, this can cause model to hallucinate sounds when there are no acoustic events described.",
       "zh": "然而，当描述中没有声学事件时，这可能导致模型幻听出声音。"
      },
      {
       "id": "s-7-4-14-6",
       "original": "To cover all scenarios involving description-guided TTS, we generate N = 8 samples with stochastic silence padding and then output the best sample based on clap re-ranking using the joint model.",
       "zh": "为覆盖描述引导 TTS 的所有场景，我们生成 N = 8 个带随机静音填充的样本，然后用联合模型做 CLAP 重排序，输出最佳样本。"
      },
      {
       "id": "s-7-4-14-7",
       "original": "We use a guidance weight of 0.75 for the description-guided TTS (with/without voice prompt) applications.",
       "zh": "对描述引导 TTS（带/不带声音提示）应用，我们使用 0.75 的引导权重。"
      }
     ]
    },
    {
     "id": "p-7-4-15",
     "type": "paragraph",
     "page": 21,
     "sentences": [
      {
       "id": "s-7-4-15-1",
       "original": "For sound only generation, we always generate 10s long audios with pseudo-transcripts using a guidance weight of 1.33.",
       "zh": "对纯音效生成，我们始终用伪转写生成 10 秒长的音频，引导权重为 1.33。"
      },
      {
       "id": "s-7-4-15-2",
       "original": "We use clap reranking with N = 16 samples using the sound clap model.",
       "zh": "我们用音效 CLAP 模型做 CLAP 重排序，取 N = 16 个样本。"
      },
      {
       "id": "s-7-4-15-3",
       "original": "For zero-shot in-context TTS applications, we trim the end-silences similar to the Audiobox Speech model and use a guidance weight of 1.0.",
       "zh": "对零样本上下文 TTS 应用，我们像 Audiobox Speech 模型一样裁剪末尾静音，并使用 1.0 的引导权重。"
      },
      {
       "id": "s-7-4-15-4",
       "original": "Given that this application doesn’t involve any descriptions, we do not use clap re-ranking.",
       "zh": "由于该应用不涉及任何描述，我们不使用 CLAP 重排序。"
      },
      {
       "id": "s-7-4-15-5",
       "original": "Unless specified, both acoustic and duration Audiobox models use the midpoint solver with a step size of 1/32, which invokes the function being integrated 64 times.",
       "zh": "除非特别说明，声学与时长的 Audiobox 模型都使用步长为 1/32 的中点求解器，即被积函数被调用 64 次。"
      },
      {
       "id": "s-7-4-15-6",
       "original": "When using classifier free guidance the model does 2 forward passes, leading to a total of 128 calls to the model forward pass.",
       "zh": "使用无分类器引导时，模型做 2 次前向传播，因此总共调用模型前向 128 次。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-7-5",
   "num": "7.5",
   "level": 2,
   "page": 21,
   "title": {
    "original": "Main Results",
    "zh": "实验结果"
   },
   "blocks": [
    {
     "id": "p-7-5-1",
     "type": "paragraph",
     "page": 21,
     "sentences": [
      {
       "id": "s-7-5-1-1",
       "original": "In this section, we investigate the effectiveness of the unified Audiobox model on a number of use cases.",
       "zh": "本节考察统一 Audiobox 模型在多个用例上的效果。"
      },
      {
       "id": "s-7-5-1-2",
       "original": "We first compare the description-guided TTS with and without voice prompt in Tables 11 and 12 respectively.",
       "zh": "我们首先在 Table 11 和 Table 12 中分别对比带/不带声音提示的描述引导 TTS。"
      },
      {
       "id": "s-7-5-1-3",
       "original": "For this task, we compare with VoiceLDM Lee et al. (2023) and AudioLDM2 Liu et al. (2023c) models as baselines.",
       "zh": "在该任务上，我们以 VoiceLDM Lee et al. (2023) 与 AudioLDM2 Liu et al. (2023c) 模型作为基线。"
      },
      {
       "id": "s-7-5-1-4",
       "original": "Next, in Table 13 we evaluate how well Audiobox performs speech tasks as compared to non-description speech only model, Audiobox Speech.",
       "zh": "接着，在 Table 13 中我们评估 Audiobox 在语音任务上相对非描述式纯语音模型 Audiobox Speech 的表现。"
      },
      {
       "id": "s-7-5-1-5",
       "original": "Finally, in Table 14 we compare against the sound-only Audiobox Sound model on the TTA task.",
       "zh": "最后，在 Table 14 中我们在 TTA 任务上对比纯音效模型 Audiobox Sound。"
      }
     ]
    },
    {
     "id": "eq-7-5-1",
     "type": "equation",
     "page": 21,
     "original": "7.5.1"
    },
    {
     "id": "p-7-5-2",
     "type": "paragraph",
     "page": 21,
     "sentences": [
      {
       "id": "s-7-5-2-1",
       "original": "Description-based control for speech generation",
       "zh": "7.5.1 语音生成的描述式控制"
      }
     ]
    },
    {
     "id": "tab-7-5-1",
     "type": "paragraph",
     "page": 21,
     "sentences": [
      {
       "id": "tab-7-5-1-s1",
       "original": "Table 11 compares Audiobox with VoiceLDM Lee et al. (2023) and AudioLDM2 Liu et al. (2023c) models on description-guided TTS and description-guided TTS with voice prompt (voice restylization) tasks. We find that Audiobox outperforms both baselines on all datasets and metrics. In particular, Audiobox is able",
       "zh": "Table 11 在描述引导 TTS 与带声音提示的描述引导 TTS（声音风格重塑）任务上对比 Audiobox 与 VoiceLDM Lee et al. (2023)、AudioLDM2 Liu et al. (2023c) 模型。我们发现 Audiobox 在所有数据集和指标上都优于两个基线。特别地，Audiobox 能够"
      }
     ]
    },
    {
     "id": "p-7-5-3",
     "type": "paragraph",
     "page": 22,
     "sentences": [
      {
       "id": "s-7-5-3-1",
       "original": "to consistently generate audios for rich descriptions in SC, background events (AC-filt), expressive audios (Expr), and accented audios with diverse backgrounds (Accent+).",
       "zh": "能够稳定地为 SC 中的丰富描述、AC-filt 中的背景事件、Expr 中的表现力音频，以及 Accent+ 中带多样背景的口音音频生成对应音频。"
      }
     ]
    },
    {
     "id": "tab-7-5-2",
     "type": "paragraph",
     "page": 22,
     "sentences": [
      {
       "id": "tab-7-5-2-s1",
       "original": "Table 11 Description-based control for speech generation. Audiobox outperforms both AudioLDM2 and VoiceLDM on all datasets and metrics. VoiceLDM and AudioLDM2 models struggle in particular of Expr and Accent+ datasets with expressive audios.",
       "zh": "Table 11 语音生成的描述式控制。Audiobox 在所有数据集和指标上都优于 AudioLDM2 与 VoiceLDM。VoiceLDM 与 AudioLDM2 模型在 Expr 与 Accent+ 这类表现力音频数据集上尤为吃力。"
      }
     ]
    },
    {
     "id": "p-7-5-4",
     "type": "paragraph",
     "page": 22,
     "sentences": [
      {
       "id": "s-7-5-4-1",
       "original": "JointCLAP ↑ WER (%) ↓ SC AC-filt Expr Accent+ SC AC-filt Expr Accent+ ground truth",
       "zh": "（表：JointCLAP↑ × WER(%)↓（SC/AC-filt/Expr/Accent+）与 QMOS↑/REL↑——ground truth、VoiceLDM、AudioLDM2-SP、Audiobox 各行完整数值。原始数据照录如下）\nJointCLAP ↑ WER (%) ↓ SC AC-filt Expr Accent+ SC AC-filt Expr Accent+ ground truth 0.403 0.479 0.548 0.561 8.4 23.5 5.8 13.5 VoiceLDM 0.245 0.449 0.060 0.235 8.0 6.8 5.3 4.4 AudioLDM2-SP 0.241 0.225 0.066 0.110 32.5 26.3 33.8 23.9 Audiobox 0.430 0.489 0.387 0.596 7.2 5.2 4.5 2.6 QMOS ↑ REL ↑ SC AC-filt Expr Accent+ SC AC-filt Expr Accent+ ground truth 3.60± 0.11 3.25± 0.14 4.00± 0.09 3.24± 0.13 3.66± 0.10 3.86± 0.12 4.01± 0.10 3.51± 0.11 VoiceLDM 3.01± 0.10 2.95± 0.13 2.92± 0.12 2.87± 0.12 2.90± 0.10 3.08± 0.14 2.78± 0.11 3.2± 0.11 AudioLDM2-SP 2.19± 0.11 2.17± 0.12 2.47± 0.11 2.25± 0.10 2.37± 0.11 2.11± 0.12 2.48± 0.11 2.22± 0.10 Audiobox 3.58± 0.10 3.38± 0.12 3.82± 0.09 3.54± 0.12 3.74± 0.09 3.61± 0.12 3.94± 0.11 3.61± 0.10 我们还注意到 AudioLDM2 和 VoiceLDM 在表现力数据集（Expr 和 Accent+）上尤其困难。"
      }
     ]
    },
    {
     "id": "eq-7-5-2",
     "type": "equation",
     "page": 22,
     "original": "0.403 0.479 0.548 0.561 8.4 23.5 5.8 13.5"
    },
    {
     "id": "eq-7-5-3",
     "type": "equation",
     "page": 22,
     "original": "VoiceLDM"
    },
    {
     "id": "eq-7-5-4",
     "type": "equation",
     "page": 22,
     "original": "0.245 0.449 0.060 0.235 8.0 6.8 5.3 4.4"
    },
    {
     "id": "eq-7-5-5",
     "type": "equation",
     "page": 22,
     "original": "AudioLDM2-SP"
    },
    {
     "id": "eq-7-5-6",
     "type": "equation",
     "page": 22,
     "original": "0.241 0.225 0.066 0.110 32.5 26.3 33.8 23.9"
    },
    {
     "id": "eq-7-5-7",
     "type": "equation",
     "page": 22,
     "original": "Audiobox"
    },
    {
     "id": "eq-7-5-8",
     "type": "equation",
     "page": 22,
     "original": "0.430 0.489 0.387 0.596 7.2 5.2 4.5 2.6"
    },
    {
     "id": "p-7-5-5",
     "type": "paragraph",
     "page": 22,
     "sentences": [
      {
       "id": "s-7-5-5-1",
       "original": "QMOS ↑ REL ↑ SC AC-filt Expr Accent+ SC AC-filt Expr Accent+ ground truth",
       "zh": "（表：JointCLAP↑ × WER(%)↓（SC/AC-filt/Expr/Accent+）与 QMOS↑/REL↑——ground truth、VoiceLDM、AudioLDM2-SP、Audiobox 各行完整数值。原始数据照录如下）\nJointCLAP ↑ WER (%) ↓ SC AC-filt Expr Accent+ SC AC-filt Expr Accent+ ground truth 0.403 0.479 0.548 0.561 8.4 23.5 5.8 13.5 VoiceLDM 0.245 0.449 0.060 0.235 8.0 6.8 5.3 4.4 AudioLDM2-SP 0.241 0.225 0.066 0.110 32.5 26.3 33.8 23.9 Audiobox 0.430 0.489 0.387 0.596 7.2 5.2 4.5 2.6 QMOS ↑ REL ↑ SC AC-filt Expr Accent+ SC AC-filt Expr Accent+ ground truth 3.60± 0.11 3.25± 0.14 4.00± 0.09 3.24± 0.13 3.66± 0.10 3.86± 0.12 4.01± 0.10 3.51± 0.11 VoiceLDM 3.01± 0.10 2.95± 0.13 2.92± 0.12 2.87± 0.12 2.90± 0.10 3.08± 0.14 2.78± 0.11 3.2± 0.11 AudioLDM2-SP 2.19± 0.11 2.17± 0.12 2.47± 0.11 2.25± 0.10 2.37± 0.11 2.11± 0.12 2.48± 0.11 2.22± 0.10 Audiobox 3.58± 0.10 3.38± 0.12 3.82± 0.09 3.54± 0.12 3.74± 0.09 3.61± 0.12 3.94± 0.11 3.61± 0.10 我们还注意到 AudioLDM2 和 VoiceLDM 在表现力数据集（Expr 和 Accent+）上尤其困难。"
      }
     ]
    },
    {
     "id": "eq-7-5-9",
     "type": "equation",
     "page": 22,
     "original": "3.60± 0.11 3.25± 0.14 4.00± 0.09 3.24± 0.13 3.66± 0.10 3.86± 0.12 4.01± 0.10 3.51± 0.11"
    },
    {
     "id": "eq-7-5-10",
     "type": "equation",
     "page": 22,
     "original": "VoiceLDM"
    },
    {
     "id": "eq-7-5-11",
     "type": "equation",
     "page": 22,
     "original": "3.01± 0.10 2.95± 0.13 2.92± 0.12 2.87± 0.12 2.90± 0.10 3.08± 0.14 2.78± 0.11 3.2± 0.11"
    },
    {
     "id": "eq-7-5-12",
     "type": "equation",
     "page": 22,
     "original": "AudioLDM2-SP"
    },
    {
     "id": "eq-7-5-13",
     "type": "equation",
     "page": 22,
     "original": "2.19± 0.11 2.17± 0.12 2.47± 0.11 2.25± 0.10 2.37± 0.11 2.11± 0.12 2.48± 0.11 2.22± 0.10"
    },
    {
     "id": "eq-7-5-14",
     "type": "equation",
     "page": 22,
     "original": "Audiobox"
    },
    {
     "id": "eq-7-5-15",
     "type": "equation",
     "page": 22,
     "original": "3.58± 0.10 3.38± 0.12 3.82± 0.09 3.54± 0.12 3.74± 0.09 3.61± 0.12 3.94± 0.11 3.61± 0.10"
    },
    {
     "id": "p-7-5-6",
     "type": "paragraph",
     "page": 22,
     "sentences": [
      {
       "id": "s-7-5-6-1",
       "original": "We also note that AudioLDM2 and VoiceLDM struggle in particular on expressive datasets (Expr and Accent+).",
       "zh": "（表：JointCLAP↑ × WER(%)↓（SC/AC-filt/Expr/Accent+）与 QMOS↑/REL↑——ground truth、VoiceLDM、AudioLDM2-SP、Audiobox 各行完整数值。原始数据照录如下）\nJointCLAP ↑ WER (%) ↓ SC AC-filt Expr Accent+ SC AC-filt Expr Accent+ ground truth 0.403 0.479 0.548 0.561 8.4 23.5 5.8 13.5 VoiceLDM 0.245 0.449 0.060 0.235 8.0 6.8 5.3 4.4 AudioLDM2-SP 0.241 0.225 0.066 0.110 32.5 26.3 33.8 23.9 Audiobox 0.430 0.489 0.387 0.596 7.2 5.2 4.5 2.6 QMOS ↑ REL ↑ SC AC-filt Expr Accent+ SC AC-filt Expr Accent+ ground truth 3.60± 0.11 3.25± 0.14 4.00± 0.09 3.24± 0.13 3.66± 0.10 3.86± 0.12 4.01± 0.10 3.51± 0.11 VoiceLDM 3.01± 0.10 2.95± 0.13 2.92± 0.12 2.87± 0.12 2.90± 0.10 3.08± 0.14 2.78± 0.11 3.2± 0.11 AudioLDM2-SP 2.19± 0.11 2.17± 0.12 2.47± 0.11 2.25± 0.10 2.37± 0.11 2.11± 0.12 2.48± 0.11 2.22± 0.10 Audiobox 3.58± 0.10 3.38± 0.12 3.82± 0.09 3.54± 0.12 3.74± 0.09 3.61± 0.12 3.94± 0.11 3.61± 0.10 我们还注意到 AudioLDM2 和 VoiceLDM 在表现力数据集（Expr 和 Accent+）上尤其困难。"
      },
      {
       "id": "s-7-5-6-2",
       "original": "In particular, we find that utterances generated by AudioLDM2 and VoiceLDM models are significantly worse than the ground truth especially in complicated scenarios involving description of both speech, environment (cathedral), and background sounds.",
       "zh": "具体而言，我们发现 AudioLDM2 与 VoiceLDM 生成的话语显著差于真值，尤其是在同时包含语音、环境（大教堂）与背景声描述的复杂场景下。"
      },
      {
       "id": "s-7-5-6-3",
       "original": "This results in worse scores on the Accent+ dataset.",
       "zh": "这导致它们在 Accent+ 数据集上得分更差。"
      },
      {
       "id": "s-7-5-6-4",
       "original": "Furthermore, Expr test set contains voices exploring expressive styles like enunciation, whispering, non-binary gender which is where AudioLDM2 and VoiceLDM struggle.",
       "zh": "此外，Expr 测试集包含探索表现力风格的语音，如清晰发音、耳语、非二元性别等——这正是 AudioLDM2 与 VoiceLDM 吃力之处。"
      },
      {
       "id": "s-7-5-6-5",
       "original": "We hypothesize this could be because they are out-of-distribution cases w.r.t training.",
       "zh": "我们推测这可能是因为这些相对训练分布而言是分布外样本。"
      },
      {
       "id": "s-7-5-6-6",
       "original": "Both VoiceLDM and AudioLDM2 model tend to struggle on such utterances leading to low scores on objective metrics.",
       "zh": "VoiceLDM 与 AudioLDM2 模型在这类话语上都表现吃力，导致客观指标得分偏低。"
      }
     ]
    },
    {
     "id": "p-7-5-7",
     "type": "paragraph",
     "page": 22,
     "sentences": [
      {
       "id": "s-7-5-7-1",
       "original": "Our subjective evaluations also align with the objective metrics where we find the the Audiobox model significantly outperforms the baselines in particular to similarity to the description.",
       "zh": "我们的主观评测也与客观指标一致：Audiobox 模型显著优于基线，尤其是在与描述的相似度上。"
      },
      {
       "id": "s-7-5-7-2",
       "original": "The worse scores on Accent+ and Expr dataset for AudioLDM2 and VoiceLDM model further confirms our own observations.",
       "zh": "AudioLDM2 与 VoiceLDM 模型在 Accent+ 与 Expr 数据集上更差的分数进一步印证了我们的观察。"
      }
     ]
    },
    {
     "id": "p-7-5-8",
     "type": "paragraph",
     "page": 22,
     "sentences": [
      {
       "id": "s-7-5-8-1",
       "original": "In Table 12, we present the results for description-guided TTS with voice prompt.",
       "zh": "Table 12 给出了带声音提示的描述引导 TTS 结果。"
      },
      {
       "id": "s-7-5-8-2",
       "original": "VoiceLDM and AudioLDM2 model do not simultaneously support conditioning based on vocal and text descriptions for a transcript.",
       "zh": "VoiceLDM 与 AudioLDM2 模型无法同时支持基于声线与文本描述对转写进行条件控制。"
      },
      {
       "id": "s-7-5-8-3",
       "original": "Towards our best effort comparison, we combine the CLAP embedding for the audio vocal prompt and the textual description by averaging them and use it as a conditioning input.",
       "zh": "为尽力公平对比，我们把音频声线提示与文本描述的 CLAP 嵌入取平均，合并后作为条件输入。"
      },
      {
       "id": "s-7-5-8-4",
       "original": "We find that Audiobox outperforms both baselines.",
       "zh": "我们发现 Audiobox 优于两个基线。"
      },
      {
       "id": "s-7-5-8-5",
       "original": "We also notice that in the absence of voice-prompt, the speaker similarity of Audiobox is greatly reduced as the description cannot capture all aspects of voice.",
       "zh": "我们还注意到，缺少声音提示时 Audiobox 的说话人相似度大幅下降，因为描述无法捕捉声音的全部层面。"
      },
      {
       "id": "s-7-5-8-6",
       "original": "The subjective evaluations aligns with the objective metrics both for description and generated audio similarity and speaker similarity.",
       "zh": "主观评测与客观指标一致：包括描述与生成音频的相似度，以及说话人相似度。"
      },
      {
       "id": "s-7-5-8-7",
       "original": "We find that the voice prompt greatly improves the speaker similarity while matching the descriptions.",
       "zh": "我们发现声音提示在与描述匹配的同时大幅提升了说话人相似度。"
      }
     ]
    },
    {
     "id": "eq-7-5-16",
     "type": "equation",
     "page": 22,
     "original": "7.5.2"
    },
    {
     "id": "p-7-5-9",
     "type": "paragraph",
     "page": 22,
     "sentences": [
      {
       "id": "s-7-5-9-1",
       "original": "Comparison to Audiobox Speech and Audiobox Sound",
       "zh": "7.5.2 与 Audiobox Speech 和 Audiobox Sound 的对比"
      }
     ]
    },
    {
     "id": "tab-7-5-3",
     "type": "paragraph",
     "page": 22,
     "sentences": [
      {
       "id": "tab-7-5-3-s1",
       "original": "Table 13 compares the unified Audiobox and speech only Audiobox Speech models for zero-shot TTS on 5 different datasets. We use the same duration model for both acoustic models for this task. We find that the unified Audiobox model gives higher speaker similarity but performs marginally worse on the word error rate. This is also confirmed by subjective evaluations where we find only minor differences between the Audiobox and Audiobox Speech models.",
       "zh": "Table 13 在 5 个不同数据集上对比统一 Audiobox 与纯语音的 Audiobox Speech 模型的零样本 TTS。该任务中两个声学模型使用同一时长模型。我们发现统一 Audiobox 模型的说话人相似度更高，但词错误率略差；主观评测也证实了这一点，两个模型之间只有细微差别。"
      }
     ]
    },
    {
     "id": "p-7-5-10",
     "type": "paragraph",
     "page": 22,
     "sentences": [
      {
       "id": "s-7-5-10-1",
       "original": "In Table 14, we present the results comparing the unified Audiobox to the Audiobox Sound, VoiceLDM, and AudioLDM2 models on the task of TTA task as described in Section 6.2.",
       "zh": "Table 14 给出统一 Audiobox 与 Audiobox Sound、VoiceLDM、AudioLDM2 模型在第 6.2 节所述 TTA 任务上的对比结果。"
      },
      {
       "id": "s-7-5-10-2",
       "original": "We find that Audiobox significantly outperforms all baselines achieving the state-of-the-art performance for joint models and even outperforms sound only models such as TANGO.",
       "zh": "我们发现 Audiobox 显著优于所有基线，达到联合模型的最先进水平，甚至超过 TANGO 等纯音效模型。"
      },
      {
       "id": "s-7-5-10-3",
       "original": "The Audiobox performs worse only to the Audiobox Sound model which specializes in sound generation.",
       "zh": "Audiobox 仅劣于专精音效生成的 Audiobox Sound 模型。"
      },
      {
       "id": "s-7-5-10-4",
       "original": "The subjective evaluations further confirm that both our Audiobox and Audiobox Sound outperform all other baselines by a significant margin.",
       "zh": "主观评测进一步证实，Audiobox 与 Audiobox Sound 都以显著优势优于其他所有基线。"
      }
     ]
    },
    {
     "id": "tab-7-5-4",
     "type": "paragraph",
     "page": 23,
     "sentences": [
      {
       "id": "tab-7-5-4-s1",
       "original": "Table 12 Description-based control with extra voice conditioning for speech generation",
       "zh": "Table 12 带额外声音条件的语音生成描述式控制"
      }
     ]
    },
    {
     "id": "p-7-5-11",
     "type": "paragraph",
     "page": 23,
     "sentences": [
      {
       "id": "s-7-5-11-1",
       "original": "Comparing on objective metrics.",
       "zh": "客观指标对比。"
      }
     ]
    },
    {
     "id": "p-7-5-12",
     "type": "paragraph",
     "page": 23,
     "sentences": [
      {
       "id": "s-7-5-12-1",
       "original": "Model Voice cond.",
       "zh": "模型 声音条件"
      }
     ]
    },
    {
     "id": "p-7-5-13",
     "type": "paragraph",
     "page": 23,
     "sentences": [
      {
       "id": "s-7-5-13-1",
       "original": "JointCLAP ↑ Sim-o ↑ WER ↓ Expr Accent+ Expr Accent+ Expr Accent+ ground truth n/a",
       "zh": "表头：JointCLAP ↑ / Sim-o ↑ / WER ↓（Expr / Accent+ 各组）——ground truth n/a（后续照原文）。"
      }
     ]
    },
    {
     "id": "eq-7-5-17",
     "type": "equation",
     "page": 23,
     "original": "0.548 0.561 0.395 0.526 5.8 13.5"
    },
    {
     "id": "eq-7-5-18",
     "type": "equation",
     "page": 23,
     "original": "VoiceLDM avg. CLAP"
    },
    {
     "id": "eq-7-5-19",
     "type": "equation",
     "page": 23,
     "original": "0.093 0.204 0.115 0.076 4.8 3.9"
    },
    {
     "id": "eq-7-5-20",
     "type": "equation",
     "page": 23,
     "original": "AudioLDM2-SP avg. CLAP"
    },
    {
     "id": "eq-7-5-21",
     "type": "equation",
     "page": 23,
     "original": "0.067 0.118 0.045 0.089 34.6 30.2"
    },
    {
     "id": "eq-7-5-22",
     "type": "equation",
     "page": 23,
     "original": "Audiobox No"
    },
    {
     "id": "eq-7-5-23",
     "type": "equation",
     "page": 23,
     "original": "0.387 0.596 0.181 0.141 4.5 2.6"
    },
    {
     "id": "eq-7-5-24",
     "type": "equation",
     "page": 23,
     "original": "Audiobox Yes"
    },
    {
     "id": "eq-7-5-25",
     "type": "equation",
     "page": 23,
     "original": "0.480 0.593 0.377 0.344 7.7 2.8"
    },
    {
     "id": "p-7-5-14",
     "type": "paragraph",
     "page": 23,
     "sentences": [
      {
       "id": "s-7-5-14-1",
       "original": "Comparing on subjective metrics for Speaker similarity, quality and description aspects Model Voice cond.",
       "zh": "模型 声音条件"
      }
     ]
    },
    {
     "id": "p-7-5-15",
     "type": "paragraph",
     "page": 23,
     "sentences": [
      {
       "id": "s-7-5-15-1",
       "original": "QMOS ↑ REL ↑ Speaker Similarity MOS ↑ Expr Accent+ Expr Accent+ Expr Accent+ ground truth n/a",
       "zh": "表头：QMOS ↑ / REL ↑ / Speaker Similarity MOS ↑（Expr / Accent+ 各组）——ground truth n/a（后续照原文）。"
      }
     ]
    },
    {
     "id": "eq-7-5-26",
     "type": "equation",
     "page": 23,
     "original": "4.0± 0.09 3.24± 0.13 4.01± 0.1 3.51± 0.11 3.38± 0.11 3.27± 0.10"
    },
    {
     "id": "eq-7-5-27",
     "type": "equation",
     "page": 23,
     "original": "Audiobox No"
    },
    {
     "id": "eq-7-5-28",
     "type": "equation",
     "page": 23,
     "original": "3.82± 0.09 3.54± 0.12 3.94± 0.11 3.61± 0.1 3.02± 0.12 3.03± 0.10"
    },
    {
     "id": "eq-7-5-29",
     "type": "equation",
     "page": 23,
     "original": "Audiobox Yes"
    },
    {
     "id": "eq-7-5-30",
     "type": "equation",
     "page": 23,
     "original": "3.86± 0.09 3.58± 0.12 3.99± 0.11 3.57± 0.11 3.36± 0.11 3.24± 0.11"
    },
    {
     "id": "tab-7-5-5",
     "type": "paragraph",
     "page": 23,
     "sentences": [
      {
       "id": "tab-7-5-5-s1",
       "original": "Table 13 Comparing Audiobox and Audiobox Speech model for In-context TTS application. Both model use the same regression based duration model",
       "zh": "Table 13 在上下文 TTS 应用上对比 Audiobox 与 Audiobox Speech 模型。两个模型使用相同的回归式时长模型"
      }
     ]
    },
    {
     "id": "p-7-5-16",
     "type": "paragraph",
     "page": 23,
     "sentences": [
      {
       "id": "s-7-5-16-1",
       "original": "Style similarity and content correctness using objective metrics Sim-o ↑ Word error rate (%) ↓ LS CV SWBD Expr Accent Avg LS CV SWBD Expr Accent Avg Audiobox Speech",
       "zh": "（小标题：客观指标的风格相似度与内容正确性。）表头：Sim-o ↑ / Word error rate (%) ↓（LS / CV / SWBD / Expr / Accent / Avg）——Audiobox Speech（后续照原文）。"
      }
     ]
    },
    {
     "id": "eq-7-5-31",
     "type": "equation",
     "page": 23,
     "original": "0.734 0.607 0.608 0.603 0.659 0.642 3.2 3.7 9.1 3.2 0.9 4.0"
    },
    {
     "id": "eq-7-5-32",
     "type": "equation",
     "page": 23,
     "original": "Audiobox"
    },
    {
     "id": "eq-7-5-33",
     "type": "equation",
     "page": 23,
     "original": "0.732 0.624 0.610 0.643 0.674 0.656 4.8 3.0 12.6 2.7 0.9 4.8"
    },
    {
     "id": "p-7-5-17",
     "type": "paragraph",
     "page": 23,
     "sentences": [
      {
       "id": "s-7-5-17-1",
       "original": "Style similarity MOS subjective evaluation ↑ LS CV SWBD Expr Accent Audiobox Speech",
       "zh": "（小标题：Style similarity MOS 主观评测 ↑。）表头：LS / CV / SWBD / Expr / Accent——Audiobox Speech（后续照原文）。"
      }
     ]
    },
    {
     "id": "eq-7-5-34",
     "type": "equation",
     "page": 23,
     "original": "3.88 ± 0.11 3.77 ± 0.11 3.63 ± 0.12 3.85 ± 0.11 3.77 ± 0.11"
    },
    {
     "id": "eq-7-5-35",
     "type": "equation",
     "page": 23,
     "original": "Audiobox"
    },
    {
     "id": "eq-7-5-36",
     "type": "equation",
     "page": 23,
     "original": "3.72 ± 0.11 4.03 ± 0.11 3.72 ± 0.12 4.01 ± 0.10 3.88 ± 0.11"
    },
    {
     "id": "p-7-5-18",
     "type": "paragraph",
     "page": 23,
     "sentences": [
      {
       "id": "s-7-5-18-1",
       "original": "Quality MOS subjective evaluation ↑ LS CV SWBD Expr Accent Audiobox Speech",
       "zh": "（小标题：Quality MOS 主观评测 ↑。）表头：LS / CV / SWBD / Expr / Accent——Audiobox Speech（后续照原文）。"
      }
     ]
    },
    {
     "id": "eq-7-5-37",
     "type": "equation",
     "page": 23,
     "original": "4.11 ± 0.08 4.00 ± 0.09 3.74 ± 0.09 4.00 ± 0.09 4.22 ± 0.08"
    },
    {
     "id": "eq-7-5-38",
     "type": "equation",
     "page": 23,
     "original": "Audiobox"
    },
    {
     "id": "eq-7-5-39",
     "type": "equation",
     "page": 23,
     "original": "3.95 ± 0.08 3.97 ± 0.09 3.88 ± 0.08 3.93 ± 0.09 4.17 ± 0.07"
    }
   ]
  },
  {
   "id": "sec-8",
   "num": "8",
   "level": 1,
   "page": 23,
   "title": {
    "original": "Inference Optimization with Bespoke Solver",
    "zh": "低 NFE 下的高效推理"
   },
   "blocks": [
    {
     "id": "p-8-1",
     "type": "paragraph",
     "page": 23,
     "sentences": [
      {
       "id": "s-8-1-1",
       "original": "To generate samples from a flow-matching model, an ODE solver is used at inference time to approximate the integration.",
       "zh": "要从流匹配模型生成样本，推理时需要使用 ODE 求解器来近似积分。"
      },
      {
       "id": "s-8-1-2",
       "original": "There are many solvers that one can choose from, such as adaptive step-size dopri5 solver or fixed step-size midpoint solver.",
       "zh": "可选的求解器很多，例如自适应步长的 dopri5 求解器或固定步长的中点求解器。"
      },
      {
       "id": "s-8-1-3",
       "original": "These solvers can be configured to operate at different speed-accuracy trade-off (accuracy in computing the integral).",
       "zh": "这些求解器可以配置在不同的速度-精度权衡点上运行（精度指计算积分的精度）。"
      },
      {
       "id": "s-8-1-4",
       "original": "While flow-matching with OT path produces higher quality samples compared to diffusion models (Lipman et al., 2023; Le et al., 2023) for the same number of ODE steps and achieves better trade-off, very aggressive settings like midpoint with only 4 steps may still dramatically decrease the sample quality.",
       "zh": "尽管在相同 ODE 步数下，带 OT 路径的流匹配比扩散模型 (Lipman et al., 2023; Le et al., 2023) 产生更高质量的样本、取得更好的权衡，但像只用 4 步的中点法这样激进的设置仍可能大幅降低样本质量。"
      }
     ]
    },
    {
     "id": "p-8-2",
     "type": "paragraph",
     "page": 23,
     "sentences": [
      {
       "id": "s-8-2-1",
       "original": "Inference efficiency is quantified by the number of function evaluation (NFE), which denotes the number of time an ODE solver evaluates the derivative.",
       "zh": "推理效率用函数评估次数（NFE）量化，即 ODE 求解器评估导数的次数。"
      },
      {
       "id": "s-8-2-2",
       "original": "To improve the inference speed at the extreme low NFE regime (i.e., 4), we adopt Bespoke Solvers Shaul et al. (2023) to recover similar sample quality as the original model with a much lower NFE.",
       "zh": "为提升极低 NFE 区间（即 4）下的推理速度，我们采用 Bespoke Solvers Shaul et al. (2023)，以低得多的 NFE 恢复与原模型相近的样本质量。"
      }
     ]
    },
    {
     "id": "p-8-3",
     "type": "paragraph",
     "page": 23,
     "sentences": [
      {
       "id": "s-8-3-1",
       "original": "Assume the initial noise sample x(0) = x0 ∼p(x0).",
       "zh": "设初始噪声样本 x(0) = x0 ∼p(x0)。"
      },
      {
       "id": "s-8-3-2",
       "original": "Bespoke solver learns extra parameters θ ∈Rp where p is",
       "zh": "Bespoke solver 学习额外参数 θ ∈Rp，其中 p 是"
      }
     ]
    },
    {
     "id": "tab-8-1",
     "type": "paragraph",
     "page": 24,
     "sentences": [
      {
       "id": "tab-8-1-s1",
       "original": "Table 14 Comparing unified Audiobox for Text-to-audio generation results on AudioCaps evaluation set. We find that Audiobox outperforms all baselines except the sound only Audiobox Sound. Most notably it even outperforms TANGO-full-FT model on most metrics by significant margin.",
       "zh": "Table 14 在 AudioCaps 评测集上对比统一 Audiobox 的文生音频生成结果。我们发现 Audiobox 优于除纯音效 Audiobox Sound 外的所有基线。最值得注意的是，它甚至在多数指标上以显著优势超过 TANGO-full-FT 模型。"
      }
     ]
    },
    {
     "id": "p-8-4",
     "type": "paragraph",
     "page": 24,
     "sentences": [
      {
       "id": "s-8-4-1",
       "original": "objective subjective FAD ↓ FD ↓ KLD ↓ IS ↑ CLAP ↑ OVL ↑ REL ↑ ground truth",
       "zh": "（表：objective（FAD↓/FD↓/KLD↓/IS↑/CLAP↑）× subjective（OVL↑/REL↑）——ground truth、VoiceLDM、UniAudio、Audiobox (ours)、TANGO-full-FT、Audiobox Sound (ours) 各行完整数值。原始数据照录如下）\n客观 主观 FAD ↓ FD ↓ KLD ↓ IS ↑ CLAP ↑ OVL ↑ REL ↑ ground truth - - - 13.28 0.49 3.36± 0.18 3.86± 0.18 统一模型 VoiceLDM Lee et al. (2023) 10.28 49.48 2.95 4.79 0.37 2.07± 0.16 2.62± 0.22 UniAudio Yang et al. (2023b) 3.12 - 2.60 - - - - Audiobox（本文） 1.10 10.14 1.19 11.90 0.70 3.19± 0.14 3.94± 0.14 仅声音模型 TANGO-full-FT Ghosal et al. (2023) 2.19 18.47 1.20 8.80 0.56 3.04± 0.13 3.78± 0.15 Audiobox Sound（本文） 0.77 8.30 1.15 12.70 0.71 3.43± 0.15 4.09± 0.15 非常小，并在以下公式中最小化近似样本 xθ n 与真实数据点 x(1) 之间的全局截断误差（局部截断误差之和）：Ex0∼p(x0)∥x(1) −xθ n∥，其中 xθ n 是求解器步骤 θ 的输出。"
      }
     ]
    },
    {
     "id": "eq-8-1",
     "type": "equation",
     "page": 24,
     "original": "- - - 13.28 0.49 3.36± 0.18 3.86± 0.18"
    },
    {
     "id": "eq-8-2",
     "type": "equation",
     "page": 24,
     "original": "Unified Models VoiceLDM Lee et al. (2023)"
    },
    {
     "id": "eq-8-3",
     "type": "equation",
     "page": 24,
     "original": "10.28 49.48 2.95 4.79 0.37 2.07± 0.16 2.62± 0.22"
    },
    {
     "id": "eq-8-4",
     "type": "equation",
     "page": 24,
     "original": "UniAudio Yang et al. (2023b)"
    },
    {
     "id": "eq-8-5",
     "type": "equation",
     "page": 24,
     "original": "3.12 - 2.60 - - - -"
    },
    {
     "id": "eq-8-6",
     "type": "equation",
     "page": 24,
     "original": "Audiobox (ours)"
    },
    {
     "id": "eq-8-7",
     "type": "equation",
     "page": 24,
     "original": "1.10 10.14 1.19 11.90 0.70 3.19± 0.14 3.94± 0.14"
    },
    {
     "id": "eq-8-8",
     "type": "equation",
     "page": 24,
     "original": "Sound-only models TANGO-full-FT Ghosal et al. (2023)"
    },
    {
     "id": "eq-8-9",
     "type": "equation",
     "page": 24,
     "original": "2.19 18.47 1.20 8.80 0.56 3.04± 0.13 3.78± 0.15"
    },
    {
     "id": "eq-8-10",
     "type": "equation",
     "page": 24,
     "original": "Audiobox Sound (ours)"
    },
    {
     "id": "eq-8-11",
     "type": "equation",
     "page": 24,
     "original": "0.77 8.30 1.15 12.70 0.71 3.43± 0.15 4.09± 0.15"
    },
    {
     "id": "p-8-5",
     "type": "paragraph",
     "page": 24,
     "sentences": [
      {
       "id": "s-8-5-1",
       "original": "very small and minimize the global truncation error (sum of local truncation error) between approximate sample xθ n and ground truth data point x(1) in the following formula: Ex0∼p(x0)∥x(1) −xθ n∥, where xθ n is the output of the solver stepθ.",
       "zh": "（表：objective（FAD↓/FD↓/KLD↓/IS↑/CLAP↑）× subjective（OVL↑/REL↑）——ground truth、VoiceLDM、UniAudio、Audiobox (ours)、TANGO-full-FT、Audiobox Sound (ours) 各行完整数值。原始数据照录如下）\n客观 主观 FAD ↓ FD ↓ KLD ↓ IS ↑ CLAP ↑ OVL ↑ REL ↑ ground truth - - - 13.28 0.49 3.36± 0.18 3.86± 0.18 统一模型 VoiceLDM Lee et al. (2023) 10.28 49.48 2.95 4.79 0.37 2.07± 0.16 2.62± 0.22 UniAudio Yang et al. (2023b) 3.12 - 2.60 - - - - Audiobox（本文） 1.10 10.14 1.19 11.90 0.70 3.19± 0.14 3.94± 0.14 仅声音模型 TANGO-full-FT Ghosal et al. (2023) 2.19 18.47 1.20 8.80 0.56 3.04± 0.13 3.78± 0.15 Audiobox Sound（本文） 0.77 8.30 1.15 12.70 0.71 3.43± 0.15 4.09± 0.15 非常小，并在以下公式中最小化近似样本 xθ n 与真实数据点 x(1) 之间的全局截断误差（局部截断误差之和）：Ex0∼p(x0)∥x(1) −xθ n∥，其中 xθ n 是求解器步骤 θ 的输出。"
      }
     ]
    },
    {
     "id": "p-8-6",
     "type": "paragraph",
     "page": 24,
     "sentences": [
      {
       "id": "s-8-6-1",
       "original": "At a high level, Bespoke solvers aims to learn transformation for paths such that transformed can be more accurately estimated with the desired number of ODE steps.",
       "zh": "从高层看，Bespoke solver 旨在为路径学习一种变换，使变换后的路径能在期望的 ODE 步数下被更准确地估计。"
      },
      {
       "id": "s-8-6-2",
       "original": "Bespoke Solver work by transforming the sample trajectory x(t) using two components tr : [0, 1] →[0, 1] as time reparameterization and invertible function φ : [0, 1] × Rd →Rd, where those functions are parameterized by extra parameters θ.",
       "zh": "Bespoke Solver 通过两个组件变换样本轨迹 x(t)：tr : [0, 1] →[0, 1] 作为时间重参数化，以及可逆函数 φ : [0, 1] × Rd →Rd，这些函数由额外参数 θ 参数化。"
      },
      {
       "id": "s-8-6-3",
       "original": "Let the parametric solver be stepθ(t, x; ut).",
       "zh": "设参数化求解器为 stepθ(t, x; ut)。"
      },
      {
       "id": "s-8-6-4",
       "original": "First we transform input (t, x) into (r, ¯x) = (rt, φrt(x)).",
       "zh": "首先把输入 (t, x) 变换为 (r, ¯x) = (rt, φrt(x))。"
      },
      {
       "id": "s-8-6-5",
       "original": "Next, we perform a step in the transformed space as (rnext, ¯xnext) = step(r, ¯x; ¯ur), using the chosen base solver (e.g., midpoint), where ¯ur is vector field on transformed trajectory.",
       "zh": "接着在变换后的空间中执行一步 (rnext, ¯xnext) = step(r, ¯x; ¯ur)，使用所选的基础求解器（如中点法），其中 ¯ur 是变换后轨迹上的向量场。"
      },
      {
       "id": "s-8-6-6",
       "original": "To transform back to original space, we compute (tnext, xnext) = stepθ(x, t; ut) = (trnext, φ−1 rnext(¯xnext)).",
       "zh": "为变换回原空间，我们计算 (tnext, xnext) = stepθ(x, t; ut) = (trnext, φ−1 rnext(¯xnext))。"
      }
     ]
    },
    {
     "id": "p-8-7",
     "type": "paragraph",
     "page": 24,
     "sentences": [
      {
       "id": "s-8-7-1",
       "original": "To train the Bespoke solver, we generate the ground-truth path x(t) at times ti where i ∈[N] using standard ODE solver, and we calculate the local truncation error dθ i = ∥x(ti)−stepθ x(ti−1, x(ti−1); u)∥between ground truth and predicted sample from parameterized solver θ, and finally we minimize the Bespoke loss L(θ) = Ex0∼p(x0) Pn i=1 dθ i .",
       "zh": "为训练 Bespoke solver，我们用标准 ODE 求解器在时刻 ti（i ∈[N]）生成真值路径 x(t)，计算真值与参数化求解器 θ 预测样本之间的局部截断误差 dθ i = ∥x(ti)−stepθ x(ti−1, x(ti−1); u)∥，最后最小化 Bespoke 损失 L(θ) = Ex0∼p(x0) Pn i=1 dθ i 。"
      }
     ]
    },
    {
     "id": "p-8-8",
     "type": "paragraph",
     "page": 24,
     "sentences": [
      {
       "id": "s-8-8-1",
       "original": "In this paper, we generate ground truth paths for training Bespoke Solvers for speech generation using dopri5 ODE solver to estimate N = 200 steps with guidance weight (GW) of 0.7.",
       "zh": "本文中，我们用 dopri5 ODE 求解器估计 N = 200 步、引导权重（GW）为 0.7，生成用于训练语音生成 Bespoke Solver 的真值路径。"
      },
      {
       "id": "s-8-8-2",
       "original": "Table 15 top half shows the evaluation result on zero-shot TTS with matched guidance weight (0.7) comparing two standard ODE solvers: midpoint and dopri5 with the Bespoke Solver.",
       "zh": "Table 15 上半部分给出引导权重匹配（0.7）时零样本 TTS 的评测结果，对比两个标准 ODE 求解器：中点法与 dopri5，以及 Bespoke Solver。"
      },
      {
       "id": "s-8-8-3",
       "original": "As we can see, by using bespoke solver, we could reduce ODE steps down to 4 and still retain similar performance in term of style similarity and WER.",
       "zh": "可以看到，使用 bespoke solver 后，ODE 步数可降至 4，仍在风格相似度与 WER 上保持相近的性能。"
      }
     ]
    },
    {
     "id": "p-8-9",
     "type": "paragraph",
     "page": 24,
     "sentences": [
      {
       "id": "s-8-9-1",
       "original": "In addition, we also study if a Bespoke Solver trained for a specific guidance weight generalizes to a different guidance weight, and present comparison between the default midpoint solver with the bespoke solver using GW=0.0.",
       "zh": "此外，我们还研究了针对特定引导权重训练的 Bespoke Solver 能否泛化到其他引导权重，并给出 GW=0.0 下默认中点求解器与 bespoke solver 的对比。"
      },
      {
       "id": "s-8-9-2",
       "original": "Results suggest that it can generalize to different guidance setups.",
       "zh": "结果表明它可以泛化到不同的引导设置。"
      }
     ]
    },
    {
     "id": "tab-8-2",
     "type": "paragraph",
     "page": 24,
     "sentences": [
      {
       "id": "tab-8-2-s1",
       "original": "Table 15 Comparison between the standard ODE solver using midpoint, dopri5 and parameterized Bespoke solver in term of NFE, speaker similarity and WER.",
       "zh": "Table 15 标准 ODE 求解器（midpoint、dopri5）与参数化 Bespoke solver 在 NFE、说话人相似度与 WER 上的对比。"
      }
     ]
    },
    {
     "id": "p-8-10",
     "type": "paragraph",
     "page": 24,
     "sentences": [
      {
       "id": "s-8-10-1",
       "original": "Solver NFE GW Sim-o ↑ Word error rate (%) ↓ LS CV SWBD Expr Accent LS CV SWBD Expr Accent",
       "zh": "表头：Solver / NFE / GW × Sim-o ↑ / Word error rate (%) ↓（LS / CV / SWBD / Expr / Accent 各组）。"
      }
     ]
    },
    {
     "id": "eq-8-12",
     "type": "equation",
     "page": 24,
     "original": "0.733 0.607 0.605 0.602 0.657 3.0 3.6 9.5 2.8 0.9"
    },
    {
     "id": "eq-8-13",
     "type": "equation",
     "page": 24,
     "original": "midpoint, 16 steps"
    },
    {
     "id": "eq-8-14",
     "type": "equation",
     "page": 24,
     "original": "32 0.734 0.607 0.608 0.603 0.659 3.2 3.7 9.1 3.2 0.9"
    },
    {
     "id": "eq-8-15",
     "type": "equation",
     "page": 24,
     "original": "Bespoke, 4 steps"
    },
    {
     "id": "eq-8-16",
     "type": "equation",
     "page": 24,
     "original": "8 0.735 0.607 0.606 0.606 0.658 3.0 3.5 8.3 3.0 0.7"
    },
    {
     "id": "eq-8-17",
     "type": "equation",
     "page": 24,
     "original": "dopri5"
    },
    {
     "id": "eq-8-18",
     "type": "equation",
     "page": 24,
     "original": "∼280 0.7"
    },
    {
     "id": "eq-8-19",
     "type": "equation",
     "page": 24,
     "original": "midpoint, 16 steps"
    },
    {
     "id": "eq-8-20",
     "type": "equation",
     "page": 24,
     "original": "32 0.0 0.671 0.546 0.578 0.541 0.601 3.6 5.1 12.1 3.1 1.3"
    },
    {
     "id": "eq-8-21",
     "type": "equation",
     "page": 24,
     "original": "Bespoke, 4 steps"
    },
    {
     "id": "eq-8-22",
     "type": "equation",
     "page": 24,
     "original": "8 0.672 0.548 0.576 0.544 0.604 3.6 5.1 12.1 3.0 1.3"
    }
   ]
  },
  {
   "id": "sec-9",
   "num": "9",
   "level": 1,
   "page": 25,
   "title": {
    "original": "Responsible AI",
    "zh": "负责任 AI"
   },
   "blocks": [
    {
     "id": "p-9-1",
     "type": "paragraph",
     "page": 25,
     "sentences": [
      {
       "id": "s-9-1-1",
       "original": "In order to build a system responsibly, we conduct evaluations to gauge the fairness aspect and studies methods to defend misuse.",
       "zh": "为了负责任地构建系统，我们开展评测以衡量公平性，并研究防范滥用的方法。"
      },
      {
       "id": "s-9-1-2",
       "original": "In this section, we first analyze if our model produces similar performance on different groups like genders and accents.",
       "zh": "本节首先分析模型在性别、口音等不同群体上的表现是否相近。"
      },
      {
       "id": "s-9-1-3",
       "original": "Second, we also perform watermarking experiments to evaluate if a recently proposed watermarking system generalizes to our models such that watermarked samples from our models can be reliably detected.",
       "zh": "其次，我们还进行水印实验，评估最近提出的水印系统能否泛化到我们的模型上，使我们模型生成的带水印样本能被可靠检测。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-9-1",
   "num": "9.1",
   "level": 2,
   "page": 25,
   "title": {
    "original": "Fairness across groups",
    "zh": "跨群体的公平性"
   },
   "blocks": [
    {
     "id": "p-9-1-1",
     "type": "paragraph",
     "page": 25,
     "sentences": [
      {
       "id": "s-9-1-1-1",
       "original": "We train our model on large quantities of data from various sources.",
       "zh": "我们在来自多种来源的大量数据上训练模型。"
      },
      {
       "id": "s-9-1-1-2",
       "original": "We believe through scaling training data, our model can perform well across many different groups.",
       "zh": "我们相信，通过扩大训练数据规模，模型能在许多不同群体上都有良好表现。"
      },
      {
       "id": "s-9-1-1-3",
       "original": "We assess this aspects by evaluating model performance by genders and by accents.",
       "zh": "我们通过按性别和按口音评估模型表现来检验这一方面。"
      },
      {
       "id": "s-9-1-1-4",
       "original": "In particular, we consider gender bias or accent bias are observed if there is a groups that has significantly worse performance in term of content correctness (measured by WER) and style similarity (measured by cosine similarity between style embeddings) compared to those of the entire population.",
       "zh": "具体而言，如果某个群体在内容正确性（用 WER 衡量）和风格相似度（用风格嵌入间的余弦相似度衡量）上显著差于全体人群，我们就认为观察到了性别偏差或口音偏差。"
      }
     ]
    },
    {
     "id": "p-9-1-2",
     "type": "paragraph",
     "page": 25,
     "sentences": [
      {
       "id": "s-9-1-2-1",
       "original": "To conduct our experiment, we consider the zero-shot TTS task conditioned on a context prompt.",
       "zh": "为开展实验，我们考虑以上下文提示为条件的零样本 TTS 任务。"
      },
      {
       "id": "s-9-1-2-2",
       "original": "We use a dataset with country and gender labels for this experiment.",
       "zh": "实验使用带国家和性别标签的数据集。"
      },
      {
       "id": "s-9-1-2-3",
       "original": "For the TTS transcript, we sample 20 transcripts from the test set.",
       "zh": "对 TTS 转写，我们从测试集中采样 20 条转写。"
      },
      {
       "id": "s-9-1-2-4",
       "original": "For the TTS prompts, we evaluate on accents of which there are at least 5 unique speakers in the dataset, which leave us to 64 accents.",
       "zh": "对 TTS 提示，我们评估数据集中至少有 5 个不同说话人的口音，最终得到 64 种口音。"
      },
      {
       "id": "s-9-1-2-5",
       "original": "Then, we sample 20 random utterances (10 for male, 10 for female) from each accent groups.",
       "zh": "然后，我们从每个口音组采样 20 条随机话语（男性 10 条、女性 10 条）。"
      },
      {
       "id": "s-9-1-2-6",
       "original": "In total, we have 400 (20 transcripts × 20 prompts) for each accent groups and 12800 (20 transcripts × 10 prompts × 64 accents) for each gender groups.",
       "zh": "总体上，每个口音组有 400 个组合（20 条转写 × 20 条提示），每个性别组有 12800 个组合（20 条转写 × 10 条提示 × 64 种口音）。"
      },
      {
       "id": "s-9-1-2-7",
       "original": "(a) WER across gender group.",
       "zh": "(a) 各性别组的 WER。"
      },
      {
       "id": "s-9-1-2-8",
       "original": "(b) Speaker similarity across gender group (mean ± 1 stddev).",
       "zh": "(b) 各性别组的说话人相似度（均值 ± 1 标准差）。"
      }
     ]
    },
    {
     "id": "fig-9-1-1",
     "type": "paragraph",
     "page": 25,
     "sentences": [
      {
       "id": "fig-9-1-1-s1",
       "original": "Figure 4a shows average WER and Figure 4b shows average speaker similarity across different gender group. We observed that the number are very similar and the speaker similary mean fall between ± 1 standard deviation. Figure 5a shows average WER and Figure 5b shows average speaker similarity across different accent group. Similar with the gender groups, WER over all accents remain similar and each group speaker similarity falls within ± 1 standard deviation. Across gender and accent, WER remains very low around 1.5% which means 1 mistake for every 66 words in the transcript. We come to the conclusion that our model has no significant performance difference given different group of gender and accents.",
       "zh": "Figure 4a 给出不同性别组的平均 WER，Figure 4b 给出不同性别组的平均说话人相似度。我们观察到数值非常接近，说话人相似度均值落在 ± 1 个标准差之内。Figure 5a 给出不同口音组的平均 WER，Figure 5b 给出不同口音组的平均说话人相似度。与性别组类似，所有口音上的 WER 保持相近，各组说话人相似度都落在 ± 1 个标准差之内。跨性别和口音，WER 都保持在约 1.5% 的很低水平，即转写中每 66 个词错 1 个。我们得出结论：模型在不同性别和口音群体上没有显著的表现差异。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-9-2",
   "num": "9.2",
   "level": 2,
   "page": 25,
   "title": {
    "original": "Watermarking for Generated Audio Detection",
    "zh": "用于生成音频检测的水印"
   },
   "blocks": [
    {
     "id": "p-9-2-1",
     "type": "paragraph",
     "page": 25,
     "sentences": [
      {
       "id": "s-9-2-1-1",
       "original": "Recent advancement on quality and fidelity in audio generative model has empower novel applications and use case on the model.",
       "zh": "音频生成模型在质量与保真度上的最新进展，为模型赋能了新的应用与用例。"
      },
      {
       "id": "s-9-2-1-2",
       "original": "However, at the same time, there are many people has their raising concerns about the risks of misused.",
       "zh": "然而与此同时，许多人对滥用风险的担忧也日益增加。"
      },
      {
       "id": "s-9-2-1-3",
       "original": "Therefore, the ability to recognize which audio is generated or real is crucial to prevent the misused of the technology and enable certain platform to comply with their policy Fernandez et al. (2023).",
       "zh": "因此，识别音频是生成的还是真实的能力，对防止技术滥用、并使平台能够遵守其政策至关重要 Fernandez et al. (2023)。"
      }
     ]
    },
    {
     "id": "p-9-2-2",
     "type": "paragraph",
     "page": 25,
     "sentences": [
      {
       "id": "s-9-2-2-1",
       "original": "In this section, we use Seamless Watermark (Seamless Communication, 2023) to see we can reliably put and detect an imperceptible watermark on top of our model generated audio.",
       "zh": "本节中，我们使用 Seamless Watermark (Seamless Communication, 2023)，检验能否在模型生成的音频之上可靠地嵌入并检测不可感知的水印。"
      },
      {
       "id": "s-9-2-2-2",
       "original": "The watermarking model has similar building block as Encodec Défossez et al. (2022).",
       "zh": "水印模型的构建模块与 EnCodec Défossez et al. (2022) 类似。"
      },
      {
       "id": "s-9-2-2-3",
       "original": "The training objectives are based on weighted combination of two losses: 1) perceptual loss to ensure the watermark is imperceptible (Si-SNR and L1 loss), 2) localization loss based on binary cross entropy to ensure accurate localized detection on watermark in frame level.",
       "zh": "训练目标是两个损失的加权组合：1) 感知损失，确保水印不可感知（Si-SNR 与 L1 损失）；2) 基于二元交叉熵的定位损失，确保在帧级对水印进行准确的定位检测。"
      },
      {
       "id": "s-9-2-2-4",
       "original": "(a) WER across accent group.",
       "zh": "(a) 各口音组的 WER。"
      },
      {
       "id": "s-9-2-2-5",
       "original": "(b) Speaker similarity across accent group (mean ± 1 stddev).",
       "zh": "(b) 各口音组的说话人相似度（均值 ± 1 标准差）。"
      }
     ]
    },
    {
     "id": "p-9-2-3",
     "type": "paragraph",
     "page": 26,
     "sentences": [
      {
       "id": "s-9-2-3-1",
       "original": "Here, we use the output generated from most scenarios such as zero-shot TTS, description-based TTS, voice+description-based TTS, and sound generation and apply various data augmentation on top of them.",
       "zh": "这里，我们使用大多数场景下生成的输出——如零样本 TTS、基于描述的 TTS、声音+描述的 TTS 以及音效生成——并在其上施加各种数据增强。"
      },
      {
       "id": "s-9-2-3-2",
       "original": "We measure the performance of watermark detection by their false positive rate (FPR) and false negative rate (FNR).",
       "zh": "我们用假阳性率（FPR）与假阴性率（FNR）衡量水印检测的性能。"
      }
     ]
    },
    {
     "id": "tab-9-2-1",
     "type": "paragraph",
     "page": 26,
     "sentences": [
      {
       "id": "tab-9-2-1-s1",
       "original": "Table 16 shows the average FPR and FNR over all tasks for each data augmentations. We observed very low FPR and FNR, close to 0%, which means the watermark works very robustly against various type of generated audio and speech and data augmentations. Simultaneously, the watermarked audio also have very low scale-invariant signal-to-noise ratio (SI-SNR) -20.6db, which means the watermarks residual is in-perceivable from human perspective.",
       "zh": "Table 16 给出每种数据增强在所有任务上的平均 FPR 与 FNR。我们观察到 FPR 与 FNR 都非常低，接近 0%，说明水印对各类生成音频、语音和数据增强都非常鲁棒。同时，带水印音频的尺度不变信噪比（SI-SNR）也很低，为 -20.6db，即从人的角度看水印残差不可感知。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-10",
   "num": "10",
   "level": 1,
   "page": 26,
   "title": {
    "original": "Discussion",
    "zh": "讨论"
   },
   "blocks": []
  },
  {
   "id": "sec-10-1",
   "num": "10.1",
   "level": 2,
   "page": 26,
   "title": {
    "original": "Limitations",
    "zh": "局限性"
   },
   "blocks": [
    {
     "id": "p-10-1-1",
     "type": "paragraph",
     "page": 26,
     "sentences": [
      {
       "id": "s-10-1-1-1",
       "original": "Fine-grained Control: With the recent advances in generative models, the performance in terms of controllability is mainly determined by the domain coverage and the quantity of the training data.",
       "zh": "细粒度控制：随着生成模型的近期进展，可控性方面的表现主要由训练数据的领域覆盖度和数量决定。"
      },
      {
       "id": "s-10-1-1-2",
       "original": "We have demonstrated that for in-context TTS (example-based control), style similarity can be significantly improved by scaling the data used for self-supervised pre-training, which learns to infill audio given the audio context.",
       "zh": "我们已经证明，对上下文 TTS（基于示例的控制），通过扩大自监督预训练所用的数据规模——即学习在给定音频上下文时填充音频——可以显著提升风格相似度。"
      }
     ]
    },
    {
     "id": "p-10-1-2",
     "type": "paragraph",
     "page": 26,
     "sentences": [
      {
       "id": "s-10-1-2-1",
       "original": "In contrast, description-based control requires a higher level of supervision, using paired audio and description to align concepts described in text with variations observed in audio.",
       "zh": "相比之下，基于描述的控制需要更高层级的监督：用成对的音频与描述，把文本中描述的概念与音频中观察到的变化对齐。"
      },
      {
       "id": "s-10-1-2-2",
       "original": "Hence, it is harder to generalize description-based control due to the scarcity of labeled data covering various concepts and concepts of different granularity.",
       "zh": "因此，由于覆盖各种概念、各种粒度概念的标注数据稀缺，基于描述的控制更难泛化。"
      }
     ]
    },
    {
     "id": "p-10-1-3",
     "type": "paragraph",
     "page": 26,
     "sentences": [
      {
       "id": "s-10-1-3-1",
       "original": "To give a concrete examples, our training data may contain both instances of chihuahua barking and those of Augmentation FPR FNR No augmentation",
       "zh": "举个具体例子，我们的训练数据可能同时包含吉娃娃吠叫的样本与（表头：Augmentation / FPR / FNR——No augmentation，后续照原文）。"
      }
     ]
    },
    {
     "id": "eq-10-1-1",
     "type": "equation",
     "page": 26,
     "original": "0.001 0"
    },
    {
     "id": "eq-10-1-2",
     "type": "equation",
     "page": 26,
     "original": "Bandpass filter"
    },
    {
     "id": "eq-10-1-3",
     "type": "equation",
     "page": 26,
     "original": "0.001 0"
    },
    {
     "id": "eq-10-1-4",
     "type": "equation",
     "page": 26,
     "original": "Boost audio"
    },
    {
     "id": "eq-10-1-5",
     "type": "equation",
     "page": 26,
     "original": "0.001 0"
    },
    {
     "id": "eq-10-1-6",
     "type": "equation",
     "page": 26,
     "original": "Duck audio"
    },
    {
     "id": "eq-10-1-7",
     "type": "equation",
     "page": 26,
     "original": "0.001 0"
    },
    {
     "id": "eq-10-1-8",
     "type": "equation",
     "page": 26,
     "original": "Echo"
    },
    {
     "id": "eq-10-1-9",
     "type": "equation",
     "page": 26,
     "original": "0.001 0.001"
    },
    {
     "id": "eq-10-1-10",
     "type": "equation",
     "page": 26,
     "original": "Highpass filter"
    },
    {
     "id": "eq-10-1-11",
     "type": "equation",
     "page": 26,
     "original": "0.001 0"
    },
    {
     "id": "eq-10-1-12",
     "type": "equation",
     "page": 26,
     "original": "Lowpass filter"
    },
    {
     "id": "eq-10-1-13",
     "type": "equation",
     "page": 26,
     "original": "0.001 0"
    },
    {
     "id": "eq-10-1-14",
     "type": "equation",
     "page": 26,
     "original": "Pink noise"
    },
    {
     "id": "eq-10-1-15",
     "type": "equation",
     "page": 26,
     "original": "0.001 0"
    },
    {
     "id": "eq-10-1-16",
     "type": "equation",
     "page": 26,
     "original": "Random noise"
    },
    {
     "id": "eq-10-1-17",
     "type": "equation",
     "page": 26,
     "original": "0 0"
    },
    {
     "id": "eq-10-1-18",
     "type": "equation",
     "page": 26,
     "original": "Speed slower"
    },
    {
     "id": "eq-10-1-19",
     "type": "equation",
     "page": 26,
     "original": "0 0.003"
    },
    {
     "id": "eq-10-1-20",
     "type": "equation",
     "page": 26,
     "original": "Smoothing"
    },
    {
     "id": "eq-10-1-21",
     "type": "equation",
     "page": 26,
     "original": "0 0.001"
    },
    {
     "id": "eq-10-1-22",
     "type": "equation",
     "page": 26,
     "original": "Up-down resampling"
    },
    {
     "id": "eq-10-1-23",
     "type": "equation",
     "page": 26,
     "original": "0.001 0"
    },
    {
     "id": "tab-10-1-1",
     "type": "paragraph",
     "page": 27,
     "sentences": [
      {
       "id": "tab-10-1-1-s1",
       "original": "Table 16 List of audio augmentation technique applied on top of watermarked audio with their detection performance respectively averaged on all scenarios.",
       "zh": "Table 16 施加在水印音频上的各种音频增强技术，及其在所有场景上取平均后的检测性能。"
      }
     ]
    },
    {
     "id": "p-10-1-4",
     "type": "paragraph",
     "page": 27,
     "sentences": [
      {
       "id": "s-10-1-4-1",
       "original": "labrador barking; however, all those instances are likely captioned as “a dog barking.” Hence, when prompted with “a chihuahua barking,” the best the model can do is generating a dog barking audio clip if the text embedding of “chihuahua” and “dog” are close to each other, but it would not be able to generate the correct chihuahua barking sound if such supervision was not provided during training.",
       "zh": "因此，当提示为「一只吉娃娃在叫」时，如果「吉娃娃」与「狗」的文本嵌入足够接近，模型至多能生成一段狗叫音频；但如果训练中没有提供这样的监督，它就无法生成正确的吉娃娃犬吠声。"
      },
      {
       "id": "s-10-1-4-2",
       "original": "The same idea also applies to speech attributes such as accents, where regional accents cannot be accurately generated if the training dataset does not include those paired examples.",
       "zh": "同样的思路也适用于口音等语音属性——如果训练数据集中没有包含这些成对样本，就无法准确生成地域口音。"
      }
     ]
    },
    {
     "id": "p-10-1-5",
     "type": "paragraph",
     "page": 27,
     "sentences": [
      {
       "id": "s-10-1-5-1",
       "original": "Data creation: Given the coverage and the quantity of paired data is the key to improve description-based control, it is natural to consider strategies to create such data.",
       "zh": "数据构建：既然成对数据的覆盖度与数量是改进描述式控制的关键，自然要考虑构建这类数据的策略。"
      },
      {
       "id": "s-10-1-5-2",
       "original": "However, it is in fact very challenging to create fine-grained descriptions given audio.",
       "zh": "然而，给定音频来构建细粒度描述实际上非常困难。"
      },
      {
       "id": "s-10-1-5-3",
       "original": "While it is easy for annotators to differentiate cat meowing and dog barking, labeling which dog species solely based on audio is difficult task for most of the people.",
       "zh": "虽然标注者很容易区分猫叫和狗叫，但仅凭音频判断是哪种狗对大多数人来说都是困难的任务。"
      },
      {
       "id": "s-10-1-5-4",
       "original": "Similar challenges exist as well regarding labeling speech attributes such as accents.",
       "zh": "标注口音等语音属性也存在类似挑战。"
      },
      {
       "id": "s-10-1-5-5",
       "original": "Moreover, annotators can often disagree on attributes such as emotion, perceived age and quality of audio.",
       "zh": "此外，标注者在情感、感知年龄和音频质量等属性上常常意见不一。"
      },
      {
       "id": "s-10-1-5-6",
       "original": "Hence, it is difficult to create large scale fine-grained description datasets for audio.",
       "zh": "因此，很难构建大规模的音频细粒度描述数据集。"
      },
      {
       "id": "s-10-1-5-7",
       "original": "The lack of large such datasets also leads to difficulty in developing attribute taggers and captioning models that can automate description creation and be used for evaluation.",
       "zh": "这类大规模数据集的缺乏，也导致难以开发能自动化描述生成并用于评测的属性标注器与字幕模型。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-10-2",
   "num": "10.2",
   "level": 2,
   "page": 27,
   "title": {
    "original": "Broader Impact",
    "zh": "更广泛的影响"
   },
   "blocks": [
    {
     "id": "p-10-2-1",
     "type": "paragraph",
     "page": 27,
     "sentences": [
      {
       "id": "s-10-2-1-1",
       "original": "This work greatly advances controllability for speech generation and improves coverage of styles.",
       "zh": "这项工作大大推进了语音生成的可控性，并改善了风格覆盖。"
      },
      {
       "id": "s-10-2-1-2",
       "original": "The ability to generate speech with desired vocal and acoustic styles using natural language descriptions unlocks a wealth of applications.",
       "zh": "用自然语言描述生成具有期望声线与声学风格的语音，这一能力解锁了丰富的应用。"
      },
      {
       "id": "s-10-2-1-3",
       "original": "For example, it can be used to create new voices for characters in immersive audiobooks, Ads, and movie scripts, where creators have in mind what style of voice the characters should have.",
       "zh": "例如，它可以用于为沉浸式有声书、广告和电影剧本中的角色创造新声音——创作者心中已经设想好角色应该有什么样的声音风格。"
      },
      {
       "id": "s-10-2-1-4",
       "original": "Compared to exampled-based control (in-context TTS), description-based control can create novel voice of the desired without having to clone from an existing individual and saves the time creators spends on searching the reference voice.",
       "zh": "与基于示例的控制（上下文 TTS）相比，基于描述的控制无需克隆某个真实个体就能创造出想要的新声音，也节省了创作者寻找参考声音的时间。"
      }
     ]
    },
    {
     "id": "p-10-2-2",
     "type": "paragraph",
     "page": 27,
     "sentences": [
      {
       "id": "s-10-2-2-1",
       "original": "The ability to generate speech in diverse acoustic conditions is especially crucial for applications such as film making and immersive audiobook creation, where characters may be presented in different environment such as caves and it is essential to create audio reflecting the acoustic properties of those scenes.",
       "zh": "在多样声学条件下生成语音的能力，对电影制作和沉浸式有声书创作等应用尤为关键——角色可能出现在洞穴等不同环境中，必须生成反映这些场景声学特性的音频。"
      },
      {
       "id": "s-10-2-2-2",
       "original": "The ability to preserve the voice while changing emotion and acoustic scenes is also crucial for generating long form audio content such as stories.",
       "zh": "在改变情感与声学场景的同时保持声音的能力，对生成故事等长篇音频内容也很关键。"
      },
      {
       "id": "s-10-2-2-3",
       "original": "Overall, Audiobox makes it much easier for creators to generate content with higher quality compared to prior models.",
       "zh": "总体而言，与以往模型相比，Audiobox 让创作者更容易生成更高质量的内容。"
      }
     ]
    },
    {
     "id": "p-10-2-3",
     "type": "paragraph",
     "page": 27,
     "sentences": [
      {
       "id": "s-10-2-3-1",
       "original": "While Audiobox can help spark everyone’s creativity and bring many positive social impacts, similar to other powerful generative models, it also carries risks of being misused and causing unintended harm.",
       "zh": "虽然 Audiobox 能激发每个人的创造力、带来许多积极的社会影响，但与其他强大的生成模型类似，它也存在被滥用并造成非预期伤害的风险。"
      },
      {
       "id": "s-10-2-3-2",
       "original": "In particular, speech synthesis may be used for spreading misinformation and impersonation.",
       "zh": "特别是，语音合成可能被用于传播虚假信息和冒充他人。"
      },
      {
       "id": "s-10-2-3-3",
       "original": "We presented studies on watermarking to effectively mitigate this risk in a robust fashion.",
       "zh": "我们给出了水印研究，以鲁棒的方式有效缓解这一风险。"
      },
      {
       "id": "s-10-2-3-4",
       "original": "On other hand, we also demonstrated that model perform similarly well across variations demographic groups, ensuring bias is reduced through data scaling.",
       "zh": "另一方面，我们还证明了模型在不同人口统计群体上的表现相近，确保通过数据规模化降低偏差。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-11",
   "num": "11",
   "level": 1,
   "page": 28,
   "title": {
    "original": "Conclusion",
    "zh": "结论"
   },
   "blocks": [
    {
     "id": "p-11-1",
     "type": "paragraph",
     "page": 28,
     "sentences": [
      {
       "id": "s-11-1-1",
       "original": "This paper presents Audiobox, a unified model for audio generation with unprecedented versatility, controllability, and quality.",
       "zh": "本文提出 Audiobox——一个在通用性、可控性与质量上都前所未有的统一音频生成模型。"
      },
      {
       "id": "s-11-1-2",
       "original": "Audiobox is capable of generating both speech and sound from text description, audio example, or a combination of vocal style reference and description.",
       "zh": "Audiobox 能够根据文本描述、音频示例，或声线风格参考与描述的组合，同时生成语音与音效。"
      },
      {
       "id": "s-11-1-3",
       "original": "In particular, for speech generation, Audiobox is able to control very fine-grained vocal styles such as accent, emotion, timbre and create speech simulating more diverse environment compared to previous models.",
       "zh": "特别是在语音生成上，与以往模型相比，Audiobox 能控制口音、情感、音色等非常细粒度的声线风格，并创造出模拟更多样环境的语音。"
      },
      {
       "id": "s-11-1-4",
       "original": "Asides from showing novel capabilities, Audiobox outperforms all prior in-context speech generation and sound generation models on well-studied benchmarks evaluating existing capabilities.",
       "zh": "除了展示新能力之外，Audiobox 在评估已有能力的成熟基准上，优于所有以往的上下文语音生成与音效生成模型。"
      }
     ]
    },
    {
     "id": "p-11-2",
     "type": "paragraph",
     "page": 28,
     "sentences": [
      {
       "id": "s-11-2-1",
       "original": "More importantly, we believe this work pioneers in building universal audio generative models with unified controls and sheds light for future research on audio generative modeling.",
       "zh": "更重要的是，我们相信这项工作率先构建了具有统一控制的通用音频生成模型，为音频生成建模的未来研究指明了方向。"
      },
      {
       "id": "s-11-2-2",
       "original": "In essence, we demonstrate that with large quantities of data, it is possible to build a unified model that outperforms modality specific ones.",
       "zh": "本质上，我们证明了：有了大量数据，构建一个优于模态专用模型的统一模型是可能的。"
      },
      {
       "id": "s-11-2-3",
       "original": "This points toward a path similar to the evolution of language generation models, where a large scale model trained with a simple objective on large quantities of data eventually surpasses task or language specific models with significantly better generalization ability and emerging capabilities.",
       "zh": "这指向一条与语言生成模型演进相似的路径：用简单目标在海量数据上训练的大模型，最终以显著更强的泛化能力和涌现能力超越任务专用或语言专用的模型。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-acknowledgement",
   "num": null,
   "level": 1,
   "page": 28,
   "title": {
    "original": "Acknowledgement",
    "zh": "致谢"
   },
   "blocks": [
    {
     "id": "p-acknowledgement-1",
     "type": "paragraph",
     "page": 28,
     "sentences": [
      {
       "id": "s-acknowledgement-1-1",
       "original": "The authors would like to thank Ricky Chen, Hady Elsahar, Ilia Kulikov, Hirofumi Inaguma, Jing Xu, and Yossi Adi, Alexander H.",
       "zh": "作者感谢 Ricky Chen、Hady Elsahar、Ilia Kulikov、Hirofumi Inaguma、Jing Xu、Yossi Adi、Alexander H. Liu、Chung-Ming Chien、Qing He、Thilo Koehler、Fuchun Peng、Xiaohui Zhang、Vimal Manohar、Po-Wei Chou、Kaustubh Kalgaonkar、Anurag Kumar、Yangyang Shi、Zhaoheng Ni、Gael Le Lan 与 Varun Nagaraja 在研究上的有益讨论；"
      },
      {
       "id": "s-acknowledgement-1-2",
       "original": "Liu, Chung-Ming Chien, Qing He, Thilo Koehler, Fuchun Peng, Xiaohui Zhang, Vimal Manohar, Po-Wei Chou, Kaustubh Kalgaonkar, Anurag Kumar, Yangyang Shi, Zhaoheng Ni, Gael Le Lan, and Varun Nagaraja for their helpful discussion on research, thank Juan Pino, Ian Stewart, Alexander Miller, and Joelle Pineau for organizational support, thank Adina Williams, Christophe Ropers, Chloe Bakalar, Imanol Arrieta Ibarra, and Esteban Arcaute for discussion on responsible AI, thank Wei Zhu, Yichen Wang, Jiun-Ren Lin, Chao Zhou, Peter Weng, Stephen Fink, Ivan Evtimov, David Renardy, Sonia Kim for responsible AI and safety implementation, thank Neil Seejoor, Somya Jain, Chandan Avdhut, Chris Henry, and KC Braunschweig for support on infrastructure, thank Carolyn Krol, Ernest Hammond, Mo Metanat, David Soofian, Ndidi Elue, Mallika Malhotra, Kelechi Ebi Kamanu, Maeve Ryan, Harrison Rudolph, Jennifer Okafor for their support on research and grant review, thank Ana Paula Kirschner Mofarrej, Lydia Baillergeau, Steph Miles, Raghu Nayani, Michelle Restrepo, Tamara Piksa, Chris Wiltz, Orialis Valentin, Aiman Farooq, Gopika Jhala and Ashley Gabriel on cross-functional support",
       "zh": "感谢 Juan Pino、Ian Stewart、Alexander Miller 与 Joelle Pineau 的组织支持；感谢 Adina Williams、Christophe Ropers、Chloe Bakalar、Imanol Arrieta Ibarra 与 Esteban Arcaute 关于负责任 AI 的讨论；感谢 Wei Zhu、Yichen Wang、Jiun-Ren Lin、Chao Zhou、Peter Weng、Stephen Fink、Ivan Evtimov、David Renardy、Sonia Kim 在负责任 AI 与安全实现上的工作；感谢 Neil Seejoor、Somya Jain、Chandan Avdhut、Chris Henry 与 KC Braunschweig 在基础设施上的支持；感谢 Carolyn Krol、Ernest Hammond、Mo Metanat、David Soofian、Ndidi Elue、Mallika Malhotra、Kelechi Ebi Kamanu、Maeve Ryan、Harrison Rudolph、Jennifer Okafor 在研究与基金评审上的支持；感谢 Ana Paula Kirschner Mofarrej、Lydia Baillergeau、Steph Miles、Raghu Nayani、Michelle Restrepo、Tamara Piksa、Chris Wiltz、Orialis Valentin、Aiman Farooq、Gopika Jhala 与 Ashley Gabriel 的跨职能支持。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-contribution",
   "num": null,
   "level": 1,
   "page": 29,
   "title": {
    "original": "Contribution",
    "zh": "作者贡献"
   },
   "blocks": [
    {
     "id": "p-contribution-1",
     "type": "paragraph",
     "page": 29,
     "sentences": [
      {
       "id": "s-contribution-1-1",
       "original": "Apoorv Vyas proposed and implemented LLM caption, audio augmentation and annotation quality control pipelines, and implemented voice prompting Bowen Shi led Audiobox-Sound experiments, implemented and conducted experiments for Joint-CLAP, proposed two-stage fine-tuning and led studies on evaluation Matthew Le implemented and conducted experiments for Audiobox-SSL, Audiobox-Speech, and Bespoke Solver, led model integration to demo Andros Tjandra implemented speech attribute labelers and responsible AI studies Yi-Chiao Wu created Audiobox baseline results and implemented audio infilling for baselines Liang Tan explore speech representation and conducted preliminary experiments on forced aligners Bowen Shi and Wei-Ning Hsu prepared sound data and implemented, proposed Joint-CLAP and conducted experiments for Audiobox-Sound Andros Tjandra and Apoorv Vyas implemented Audiobox Andros Tjandra and Matthew Le conducted experiments for duration models Apoorv Vyas, Andros Tjandra and Bowen Shi iterated on LLM prompting for text-to-speech and sound training Apoorv Vyas, Andros Tjandra, Matthew Le, Bowen Shi, Liang Tan and Wei-Ning Hsu prepared speech data Apoorv Vyas, Andros Tjandra, Matthew Le and Bowen Shi conducted Audiobox experiments Wei-Ning Hsu, Bowen Shi, Apoorv Vyas, Andros Tjandra, Matthew Le wrote the paper Baishan Guo, Apoorv Vyas and Andros Tjandra implemented the human annotation pipeline Baishan Guo ran human annotation and subjective evaluation, and analyzed annotation and evaluation results Bapi Akula explored audio pre-processing and transformation, assisted in developing data pipeline Carleigh Wood coordinated and facilitated data annotation Jiemin Zhang led the demo development, designed and implemented demo infra, model integration, early demo mitigation and capacity testing Xinyue Zhang designed and implemented demo backend, data logging, mitigation verification and toxic content filtering.",
       "zh": "Apoorv Vyas 提出并实现了 LLM 字幕、音频增强与标注质量控制流水线，并实现了声音提示；Bowen Shi 领导 Audiobox-Sound 实验，实现并开展了 Joint-CLAP 实验，提出两阶段微调并领导评测研究；Matthew Le 实现并开展了 Audiobox-SSL、Audiobox-Speech 与 Bespoke Solver 实验，领导模型到演示的集成；Andros Tjandra 实现了语音属性标注器与负责任 AI 研究；Yi-Chiao Wu 创建了 Audiobox 基线结果并为基线实现了音频填充；Liang Tan 探索了语音表征并开展了强制对齐器的初步实验；Bowen Shi 与 Wei-Ning Hsu 准备了音效数据，提出并实现了 Joint-CLAP，开展了 Audiobox-Sound 实验；Andros Tjandra 与 Apoorv Vyas 实现了 Audiobox；Andros Tjandra 与 Matthew Le 开展了时长模型实验；Apoorv Vyas、Andros Tjandra 与 Bowen Shi 迭代了文生语音与音效训练的 LLM 提示；Apoorv Vyas、Andros Tjandra、Matthew Le、Bowen Shi、Liang Tan 与 Wei-Ning Hsu 准备了语音数据；Apoorv Vyas、Andros Tjandra、Matthew Le 与 Bowen Shi 开展了 Audiobox 实验；Wei-Ning Hsu、Bowen Shi、Apoorv Vyas、Andros Tjandra、Matthew Le 撰写了论文；Baishan Guo、Apoorv Vyas 与 Andros Tjandra 实现了人工标注流水线；Baishan Guo 执行了人工标注与主观评测，并分析了标注与评测结果；Bapi Akula 探索了音频预处理与变换，协助开发数据流水线；Carleigh Wood 协调并推进了数据标注；Jiemin Zhang 领导演示开发，设计并实现了演示基础设施、模型集成、早期演示风险缓解与容量测试；Xinyue Zhang 设计并实现了演示后端、数据记录、风险缓解验证与有毒内容过滤。"
      }
     ]
    },
    {
     "id": "p-contribution-2",
     "type": "paragraph",
     "page": 29,
     "sentences": [
      {
       "id": "s-contribution-2-1",
       "original": "Robbie Adkins designed and implemented demo frontend and supported backend implementation.",
       "zh": "Robbie Adkins 设计并实现了演示前端，并支持后端实现。"
      }
     ]
    },
    {
     "id": "p-contribution-3",
     "type": "paragraph",
     "page": 29,
     "sentences": [
      {
       "id": "s-contribution-3-1",
       "original": "Akinniyi Akinyemi conducted demo deployment, demo and mitigation infra set up.",
       "zh": "Akinniyi Akinyemi 执行了演示部署，搭建了演示与风险缓解基础设施。"
      }
     ]
    },
    {
     "id": "p-contribution-4",
     "type": "paragraph",
     "page": 29,
     "sentences": [
      {
       "id": "s-contribution-4-1",
       "original": "Joshua Lane implemented early UI structure.",
       "zh": "Joshua Lane 实现了早期 UI 结构。"
      }
     ]
    },
    {
     "id": "p-contribution-5",
     "type": "paragraph",
     "page": 29,
     "sentences": [
      {
       "id": "s-contribution-5-1",
       "original": "William Ngan designed the demo experience and implemented front-end demo interfaces.",
       "zh": "William Ngan 设计了演示体验并实现了前端演示界面。"
      }
     ]
    },
    {
     "id": "p-contribution-6",
     "type": "paragraph",
     "page": 29,
     "sentences": [
      {
       "id": "s-contribution-6-1",
       "original": "Brian Ellis prototyped demo concepts and created audio for demos Alice Rakotoarison, Chris Summers conducted demo user experience research Yael Yungster provided design management support Jeff Wang provided product management support for the team, contributed to overall research vision, strategy, project milestones and execution.",
       "zh": "Brian Ellis 做了演示概念原型并为演示创作了音频；Alice Rakotoarison、Chris Summers 开展了演示用户体验研究；Yael Yungster 提供了设计管理支持；Jeff Wang 为团队提供了产品管理支持，贡献了整体研究愿景、战略、项目里程碑与执行。"
      }
     ]
    },
    {
     "id": "p-contribution-7",
     "type": "paragraph",
     "page": 29,
     "sentences": [
      {
       "id": "s-contribution-7-1",
       "original": "Ivan Cruz provided technical program management support, coordinated responsible AI study, red teaming, and cross-functional support Rashel Moritz provided program management support, contributed to early project planning, mitigation planning, review, and cross-functional support Mary Williamson provided management support for the team and co-led the project, contributed to research vision, and oversaw demo Wei-Ning Hsu designed and led the project, advised Apoorv, Bowen, Matthew, Andros, Yi-Chiao, and Liang on the research, and coordinated research, demo, and data streams.",
       "zh": "Ivan Cruz 提供了技术项目管理支持，协调了负责任 AI 研究、红队测试与跨职能支持；Rashel Moritz 提供了项目管理支持，贡献了早期项目规划、风险缓解规划、评审与跨职能支持；Mary Williamson 为团队提供了管理支持并共同领导项目，贡献了研究愿景，并监督了演示；Wei-Ning Hsu 设计并领导了本项目，指导 Apoorv、Bowen、Matthew、Andros、Yi-Chiao 与 Liang 的研究，并协调了研究、演示与数据各条工作线。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-references",
   "num": null,
   "level": 1,
   "page": 30,
   "title": {
    "original": "References",
    "zh": "References"
   },
   "blocks": [
    {
     "id": "p-references-1",
     "type": "paragraph",
     "page": 30,
     "sentences": [
      {
       "id": "s-references-1-1",
       "original": "A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-1-2",
       "original": "Agostinelli, T."
      },
      {
       "id": "s-references-1-3",
       "original": "I.",
       "zh": "值得注意的是，FAD 与 KLD 的趋势并不一致，正如 TTA 与 TAI 的比较所示。"
      },
      {
       "id": "s-references-1-4",
       "original": "Denk, Z."
      },
      {
       "id": "s-references-1-5",
       "original": "Borsos, J."
      },
      {
       "id": "s-references-1-6",
       "original": "Engel, M.",
       "zh": "多阶段微调：除我们收集的 500 小时高质量语音字幕外，其余语音字幕都是用属性标签和 LLM 生成的。"
      },
      {
       "id": "s-references-1-7",
       "original": "Verzetti, A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-1-8",
       "original": "Caillon, Q."
      },
      {
       "id": "s-references-1-9",
       "original": "Huang, A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-1-10",
       "original": "Jansen, A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-1-11",
       "original": "Roberts, M.",
       "zh": "多阶段微调：除我们收集的 500 小时高质量语音字幕外，其余语音字幕都是用属性标签和 LLM 生成的。"
      },
      {
       "id": "s-references-1-12",
       "original": "Tagliasacchi, et al. Musiclm: Generating music from text. arXiv preprint arXiv:2301.11325, 2023.",
       "zh": "1."
      }
     ]
    },
    {
     "id": "p-references-2",
     "type": "paragraph",
     "page": 30,
     "sentences": [
      {
       "id": "s-references-2-1",
       "original": "R.",
       "zh": "最后，比较最后两行可以确认：使用不含静音的音频提示能大幅提升在结尾静音往往较长的数据集上的相似度（CV、Accent），同时 WER 总体保持。"
      },
      {
       "id": "s-references-2-2",
       "original": "Ardila, M.",
       "zh": "多阶段微调：除我们收集的 500 小时高质量语音字幕外，其余语音字幕都是用属性标签和 LLM 生成的。"
      },
      {
       "id": "s-references-2-3",
       "original": "Branson, K.",
       "zh": "我们将该数据集称为「Mix-185K」。"
      },
      {
       "id": "s-references-2-4",
       "original": "Davis, M.",
       "zh": "多阶段微调：除我们收集的 500 小时高质量语音字幕外，其余语音字幕都是用属性标签和 LLM 生成的。"
      },
      {
       "id": "s-references-2-5",
       "original": "Henretty, M.",
       "zh": "多阶段微调：除我们收集的 500 小时高质量语音字幕外，其余语音字幕都是用属性标签和 LLM 生成的。"
      },
      {
       "id": "s-references-2-6",
       "original": "Kohler, J."
      },
      {
       "id": "s-references-2-7",
       "original": "Meyer, R.",
       "zh": "最后，比较最后两行可以确认：使用不含静音的音频提示能大幅提升在结尾静音往往较长的数据集上的相似度（CV、Accent），同时 WER 总体保持。"
      },
      {
       "id": "s-references-2-8",
       "original": "Morais, L."
      },
      {
       "id": "s-references-2-9",
       "original": "Saunders, F."
      },
      {
       "id": "s-references-2-10",
       "original": "M.",
       "zh": "多阶段微调：除我们收集的 500 小时高质量语音字幕外，其余语音字幕都是用属性标签和 LLM 生成的。"
      },
      {
       "id": "s-references-2-11",
       "original": "Tyers, and G."
      },
      {
       "id": "s-references-2-12",
       "original": "Weber."
      }
     ]
    },
    {
     "id": "p-references-3",
     "type": "paragraph",
     "page": 30,
     "sentences": [
      {
       "id": "s-references-3-1",
       "original": "Common voice: A massively-multilingual speech corpus."
      },
      {
       "id": "s-references-3-2",
       "original": "In International Conference on Language Resources and Evaluation, 2019."
      }
     ]
    },
    {
     "id": "p-references-4",
     "type": "paragraph",
     "page": 30,
     "sentences": [
      {
       "id": "s-references-4-1",
       "original": "A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-4-2",
       "original": "Baevski, Y."
      },
      {
       "id": "s-references-4-3",
       "original": "Zhou, A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-4-4",
       "original": "Mohamed, and M.",
       "zh": "多阶段微调：除我们收集的 500 小时高质量语音字幕外，其余语音字幕都是用属性标签和 LLM 生成的。"
      },
      {
       "id": "s-references-4-5",
       "original": "Auli. wav2vec 2.0: A framework for self-supervised learning of speech representations.",
       "zh": "2."
      },
      {
       "id": "s-references-4-6",
       "original": "Advances in neural information processing systems, 2020."
      }
     ]
    },
    {
     "id": "p-references-5",
     "type": "paragraph",
     "page": 30,
     "sentences": [
      {
       "id": "s-references-5-1",
       "original": "Z.",
       "zh": "作者感谢 Ricky Chen、Hady Elsahar、Ilia Kulikov、Hirofumi Inaguma、Jing Xu、Yossi Adi、Alexander H. Liu、Chung-Ming Chien、Qing He、Thilo Koehler、Fuchun Peng、Xiaohui Zhang、Vimal Manohar、Po-Wei Chou、Kaustubh Kalgaonkar、Anurag Kumar、Yangyang Shi、Zhaoheng Ni、Gael Le Lan 与 Varun Nagaraja 在研究上的有益讨论；"
      },
      {
       "id": "s-references-5-2",
       "original": "Borsos, M.",
       "zh": "多阶段微调：除我们收集的 500 小时高质量语音字幕外，其余语音字幕都是用属性标签和 LLM 生成的。"
      },
      {
       "id": "s-references-5-3",
       "original": "Sharifi, D.",
       "zh": "标注界面见附录 D。"
      },
      {
       "id": "s-references-5-4",
       "original": "Vincent, E.",
       "zh": "为提升极低 NFE 区间（即 4）下的推理速度，我们采用 Bespoke Solvers Shaul et al. (2023)，以低得多的 NFE 恢复与原模型相近的样本质量。"
      },
      {
       "id": "s-references-5-5",
       "original": "Kharitonov, N."
      },
      {
       "id": "s-references-5-6",
       "original": "Zeghidour, and M.",
       "zh": "多阶段微调：除我们收集的 500 小时高质量语音字幕外，其余语音字幕都是用属性标签和 LLM 生成的。"
      },
      {
       "id": "s-references-5-7",
       "original": "Tagliasacchi."
      },
      {
       "id": "s-references-5-8",
       "original": "Soundstorm: Efficient parallel audio generation. arXiv preprint arXiv:2305.09636, 2023."
      }
     ]
    },
    {
     "id": "p-references-6",
     "type": "paragraph",
     "page": 30,
     "sentences": [
      {
       "id": "s-references-6-1",
       "original": "H.",
       "zh": "作者感谢 Ricky Chen、Hady Elsahar、Ilia Kulikov、Hirofumi Inaguma、Jing Xu、Yossi Adi、Alexander H. Liu、Chung-Ming Chien、Qing He、Thilo Koehler、Fuchun Peng、Xiaohui Zhang、Vimal Manohar、Po-Wei Chou、Kaustubh Kalgaonkar、Anurag Kumar、Yangyang Shi、Zhaoheng Ni、Gael Le Lan 与 Varun Nagaraja 在研究上的有益讨论；"
      },
      {
       "id": "s-references-6-2",
       "original": "Bredin. pyannote.audio 2.1 speaker diarization pipeline: principle, benchmark, and recipe.",
       "zh": "2."
      },
      {
       "id": "s-references-6-3",
       "original": "In Proc."
      },
      {
       "id": "s-references-6-4",
       "original": "INTERSPEECH"
      }
     ]
    },
    {
     "id": "eq-references-1",
     "type": "equation",
     "page": 30,
     "original": "2023, 2023."
    },
    {
     "id": "p-references-7",
     "type": "paragraph",
     "page": 30,
     "sentences": [
      {
       "id": "s-references-7-1",
       "original": "K.",
       "zh": "我们将该数据集称为「Mix-185K」。"
      },
      {
       "id": "s-references-7-2",
       "original": "Chen, X."
      },
      {
       "id": "s-references-7-3",
       "original": "Du, B."
      },
      {
       "id": "s-references-7-4",
       "original": "Zhu, Z."
      },
      {
       "id": "s-references-7-5",
       "original": "Ma, T."
      },
      {
       "id": "s-references-7-6",
       "original": "Berg-Kirkpatrick, and S.",
       "zh": "UniAudio（Yang et al., 2023b）聚焦于构建能执行多种任务的单一模型，包括文生音乐、文生音效、上下文内 TTS 和自然语言风格提示 TTS。"
      },
      {
       "id": "s-references-7-7",
       "original": "Dubnov."
      },
      {
       "id": "s-references-7-8",
       "original": "Hts-at: A hierarchical token-semantic audio transformer for sound classification and detection."
      },
      {
       "id": "s-references-7-9",
       "original": "In IEEE International Conference on Acoustics, Speech and Signal Processing, ICASSP, 2022a."
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
       "original": "R.",
       "zh": "最后，比较最后两行可以确认：使用不含静音的音频提示能大幅提升在结尾静音往往较长的数据集上的相似度（CV、Accent），同时 WER 总体保持。"
      },
      {
       "id": "s-references-8-2",
       "original": "T."
      },
      {
       "id": "s-references-8-3",
       "original": "Q."
      },
      {
       "id": "s-references-8-4",
       "original": "Chen. torchdiffeq, 2018."
      },
      {
       "id": "s-references-8-5",
       "original": "URL https://github.com/rtqichen/torchdiffeq."
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
       "original": "R.",
       "zh": "最后，比较最后两行可以确认：使用不含静音的音频提示能大幅提升在结尾静音往往较长的数据集上的相似度（CV、Accent），同时 WER 总体保持。"
      },
      {
       "id": "s-references-9-2",
       "original": "T."
      },
      {
       "id": "s-references-9-3",
       "original": "Q."
      },
      {
       "id": "s-references-9-4",
       "original": "Chen, Y."
      },
      {
       "id": "s-references-9-5",
       "original": "Rubanova, J."
      },
      {
       "id": "s-references-9-6",
       "original": "Bettencourt, and D.",
       "zh": "标注界面见附录 D。"
      },
      {
       "id": "s-references-9-7",
       "original": "K.",
       "zh": "我们将该数据集称为「Mix-185K」。"
      },
      {
       "id": "s-references-9-8",
       "original": "Duvenaud."
      },
      {
       "id": "s-references-9-9",
       "original": "Neural ordinary differential equations."
      },
      {
       "id": "s-references-9-10",
       "original": "In Neural Information Processing Systems, 2018."
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
       "original": "S.",
       "zh": "UniAudio（Yang et al., 2023b）聚焦于构建能执行多种任务的单一模型，包括文生音乐、文生音效、上下文内 TTS 和自然语言风格提示 TTS。"
      },
      {
       "id": "s-references-10-2",
       "original": "Chen, C."
      },
      {
       "id": "s-references-10-3",
       "original": "Wang, Z."
      },
      {
       "id": "s-references-10-4",
       "original": "Chen, Y."
      },
      {
       "id": "s-references-10-5",
       "original": "Wu, S.",
       "zh": "UniAudio（Yang et al., 2023b）聚焦于构建能执行多种任务的单一模型，包括文生音乐、文生音效、上下文内 TTS 和自然语言风格提示 TTS。"
      },
      {
       "id": "s-references-10-6",
       "original": "Liu, Z."
      },
      {
       "id": "s-references-10-7",
       "original": "Chen, J."
      },
      {
       "id": "s-references-10-8",
       "original": "Li, N."
      },
      {
       "id": "s-references-10-9",
       "original": "Kanda, T."
      },
      {
       "id": "s-references-10-10",
       "original": "Yoshioka, X."
      },
      {
       "id": "s-references-10-11",
       "original": "Xiao, et al. Wavlm: Large-scale self-supervised pre-training for full stack speech processing."
      },
      {
       "id": "s-references-10-12",
       "original": "IEEE Journal of Selected Topics in Signal Processing, 16(6):1505–1518, 2022b."
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
       "original": "Cieri, Christopher, et al. ."
      },
      {
       "id": "s-references-11-2",
       "original": "Fisher English training speech parts 1 and 2 LDC200{4,5}S13."
      },
      {
       "id": "s-references-11-3",
       "original": "Web Download."
      },
      {
       "id": "s-references-11-4",
       "original": "Linguistic Data Consortium, Philadelphia, 2004,2005a."
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
       "original": "Cieri, Christopher, et al. ."
      },
      {
       "id": "s-references-12-2",
       "original": "Fisher English training speech parts 1 and 2 transcripts LDC200{4,5}T19."
      },
      {
       "id": "s-references-12-3",
       "original": "Web Download."
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
       "original": "Linguistic Data Consortium, Philadelphia, 2004,2005b."
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
       "original": "A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-14-2",
       "original": "Clifton, A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-14-3",
       "original": "Pappu, S.",
       "zh": "UniAudio（Yang et al., 2023b）聚焦于构建能执行多种任务的单一模型，包括文生音乐、文生音效、上下文内 TTS 和自然语言风格提示 TTS。"
      },
      {
       "id": "s-references-14-4",
       "original": "Reddy, Y."
      },
      {
       "id": "s-references-14-5",
       "original": "Yu, J."
      },
      {
       "id": "s-references-14-6",
       "original": "Karlgren, B."
      },
      {
       "id": "s-references-14-7",
       "original": "Carterette, and R.",
       "zh": "最后，比较最后两行可以确认：使用不含静音的音频提示能大幅提升在结尾静音往往较长的数据集上的相似度（CV、Accent），同时 WER 总体保持。"
      },
      {
       "id": "s-references-14-8",
       "original": "Jones."
      },
      {
       "id": "s-references-14-9",
       "original": "The spotify podcast dataset. arXiv preprint arXiv:2004.04270, 2020."
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
       "original": "J."
      },
      {
       "id": "s-references-15-2",
       "original": "Copet, F."
      },
      {
       "id": "s-references-15-3",
       "original": "Kreuk, I.",
       "zh": "值得注意的是，FAD 与 KLD 的趋势并不一致，正如 TTA 与 TAI 的比较所示。"
      },
      {
       "id": "s-references-15-4",
       "original": "Gat, T."
      },
      {
       "id": "s-references-15-5",
       "original": "Remez, D.",
       "zh": "标注界面见附录 D。"
      },
      {
       "id": "s-references-15-6",
       "original": "Kant, G."
      },
      {
       "id": "s-references-15-7",
       "original": "Synnaeve, Y."
      },
      {
       "id": "s-references-15-8",
       "original": "Adi, and A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-15-9",
       "original": "Défossez."
      },
      {
       "id": "s-references-15-10",
       "original": "Simple and controllable music generation."
      },
      {
       "id": "s-references-15-11",
       "original": "In Thirty-seventh Conference on Neural Information Processing Systems, 2023."
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
       "original": "A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-16-2",
       "original": "Défossez, J."
      },
      {
       "id": "s-references-16-3",
       "original": "Copet, G."
      },
      {
       "id": "s-references-16-4",
       "original": "Synnaeve, and Y."
      },
      {
       "id": "s-references-16-5",
       "original": "Adi."
      },
      {
       "id": "s-references-16-6",
       "original": "High fidelity neural audio compression.",
       "zh": "2."
      },
      {
       "id": "s-references-16-7",
       "original": "ArXiv, abs/2210.13438, 2022.",
       "zh": "2."
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
       "original": "C."
      },
      {
       "id": "s-references-17-2",
       "original": "Donahue, J."
      },
      {
       "id": "s-references-17-3",
       "original": "McAuley, and M.",
       "zh": "多阶段微调：除我们收集的 500 小时高质量语音字幕外，其余语音字幕都是用属性标签和 LLM 生成的。"
      },
      {
       "id": "s-references-17-4",
       "original": "Puckette."
      },
      {
       "id": "s-references-17-5",
       "original": "Adversarial audio synthesis. arXiv preprint arXiv:1802.04208, 2018.",
       "zh": "2."
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
       "original": "A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-18-2",
       "original": "Défossez, J."
      },
      {
       "id": "s-references-18-3",
       "original": "Copet, G."
      },
      {
       "id": "s-references-18-4",
       "original": "Synnaeve, and Y."
      },
      {
       "id": "s-references-18-5",
       "original": "Adi."
      },
      {
       "id": "s-references-18-6",
       "original": "High fidelity neural audio compression. arXiv preprint arXiv:2210.13438,",
       "zh": "2."
      }
     ]
    },
    {
     "id": "eq-references-2",
     "type": "equation",
     "page": 30,
     "original": "2022."
    },
    {
     "id": "p-references-19",
     "type": "paragraph",
     "page": 30,
     "sentences": [
      {
       "id": "s-references-19-1",
       "original": "P.",
       "zh": "1."
      },
      {
       "id": "s-references-19-2",
       "original": "Fernandez, G."
      },
      {
       "id": "s-references-19-3",
       "original": "Couairon, H.",
       "zh": "作者感谢 Ricky Chen、Hady Elsahar、Ilia Kulikov、Hirofumi Inaguma、Jing Xu、Yossi Adi、Alexander H. Liu、Chung-Ming Chien、Qing He、Thilo Koehler、Fuchun Peng、Xiaohui Zhang、Vimal Manohar、Po-Wei Chou、Kaustubh Kalgaonkar、Anurag Kumar、Yangyang Shi、Zhaoheng Ni、Gael Le Lan 与 Varun Nagaraja 在研究上的有益讨论；"
      },
      {
       "id": "s-references-19-4",
       "original": "Jégou, M.",
       "zh": "多阶段微调：除我们收集的 500 小时高质量语音字幕外，其余语音字幕都是用属性标签和 LLM 生成的。"
      },
      {
       "id": "s-references-19-5",
       "original": "Douze, and T."
      },
      {
       "id": "s-references-19-6",
       "original": "Furon."
      },
      {
       "id": "s-references-19-7",
       "original": "The stable signature: Rooting watermarks in latent diffusion models."
      },
      {
       "id": "s-references-19-8",
       "original": "In Proceedings of the IEEE/CVF International Conference on Computer Vision (ICCV), pages 22466–22477, October 2023."
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
       "original": "J."
      },
      {
       "id": "s-references-20-2",
       "original": "F."
      },
      {
       "id": "s-references-20-3",
       "original": "Gemmeke, D.",
       "zh": "标注界面见附录 D。"
      },
      {
       "id": "s-references-20-4",
       "original": "P.",
       "zh": "1."
      },
      {
       "id": "s-references-20-5",
       "original": "Ellis, D.",
       "zh": "标注界面见附录 D。"
      },
      {
       "id": "s-references-20-6",
       "original": "Freedman, A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-20-7",
       "original": "Jansen, W."
      },
      {
       "id": "s-references-20-8",
       "original": "Lawrence, R.",
       "zh": "最后，比较最后两行可以确认：使用不含静音的音频提示能大幅提升在结尾静音往往较长的数据集上的相似度（CV、Accent），同时 WER 总体保持。"
      },
      {
       "id": "s-references-20-9",
       "original": "C."
      },
      {
       "id": "s-references-20-10",
       "original": "Moore, M.",
       "zh": "多阶段微调：除我们收集的 500 小时高质量语音字幕外，其余语音字幕都是用属性标签和 LLM 生成的。"
      },
      {
       "id": "s-references-20-11",
       "original": "Plakal, and M.",
       "zh": "多阶段微调：除我们收集的 500 小时高质量语音字幕外，其余语音字幕都是用属性标签和 LLM 生成的。"
      },
      {
       "id": "s-references-20-12",
       "original": "Ritter."
      },
      {
       "id": "s-references-20-13",
       "original": "Audio set: An ontology and human-labeled dataset for audio events."
      },
      {
       "id": "s-references-20-14",
       "original": "In 2017 IEEE international conference on acoustics, speech and signal processing (ICASSP), pages 776–780."
      },
      {
       "id": "s-references-20-15",
       "original": "IEEE, 2017."
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
       "original": "D.",
       "zh": "标注界面见附录 D。"
      },
      {
       "id": "s-references-21-2",
       "original": "Ghosal, N."
      },
      {
       "id": "s-references-21-3",
       "original": "Majumder, A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-21-4",
       "original": "Mehrish, and S.",
       "zh": "UniAudio（Yang et al., 2023b）聚焦于构建能执行多种任务的单一模型，包括文生音乐、文生音效、上下文内 TTS 和自然语言风格提示 TTS。"
      },
      {
       "id": "s-references-21-5",
       "original": "Poria."
      },
      {
       "id": "s-references-21-6",
       "original": "Text-to-audio generation using instruction-tuned llm and latent diffusion model. arXiv preprint arXiv:2304.13731, 2023."
      }
     ]
    },
    {
     "id": "p-references-22",
     "type": "paragraph",
     "page": 31,
     "sentences": [
      {
       "id": "s-references-22-1",
       "original": "J."
      },
      {
       "id": "s-references-22-2",
       "original": "J."
      },
      {
       "id": "s-references-22-3",
       "original": "Godfrey, E.",
       "zh": "为提升极低 NFE 区间（即 4）下的推理速度，我们采用 Bespoke Solvers Shaul et al. (2023)，以低得多的 NFE 恢复与原模型相近的样本质量。"
      },
      {
       "id": "s-references-22-4",
       "original": "C."
      },
      {
       "id": "s-references-22-5",
       "original": "Holliman, and J."
      },
      {
       "id": "s-references-22-6",
       "original": "McDaniel."
      },
      {
       "id": "s-references-22-7",
       "original": "Switchboard: Telephone speech corpus for research and development."
      }
     ]
    },
    {
     "id": "p-references-23",
     "type": "paragraph",
     "page": 31,
     "sentences": [
      {
       "id": "s-references-23-1",
       "original": "In Acoustics, Speech, and Signal Processing, IEEE International Conference on, volume 1, pages 517–520."
      },
      {
       "id": "s-references-23-2",
       "original": "IEEE Computer Society, 1992.",
       "zh": "2."
      }
     ]
    },
    {
     "id": "p-references-24",
     "type": "paragraph",
     "page": 31,
     "sentences": [
      {
       "id": "s-references-24-1",
       "original": "Z.",
       "zh": "作者感谢 Ricky Chen、Hady Elsahar、Ilia Kulikov、Hirofumi Inaguma、Jing Xu、Yossi Adi、Alexander H. Liu、Chung-Ming Chien、Qing He、Thilo Koehler、Fuchun Peng、Xiaohui Zhang、Vimal Manohar、Po-Wei Chou、Kaustubh Kalgaonkar、Anurag Kumar、Yangyang Shi、Zhaoheng Ni、Gael Le Lan 与 Varun Nagaraja 在研究上的有益讨论；"
      },
      {
       "id": "s-references-24-2",
       "original": "Guo, Y."
      },
      {
       "id": "s-references-24-3",
       "original": "Leng, Y."
      },
      {
       "id": "s-references-24-4",
       "original": "Wu, S.",
       "zh": "UniAudio（Yang et al., 2023b）聚焦于构建能执行多种任务的单一模型，包括文生音乐、文生音效、上下文内 TTS 和自然语言风格提示 TTS。"
      },
      {
       "id": "s-references-24-5",
       "original": "Zhao, and X."
      },
      {
       "id": "s-references-24-6",
       "original": "Tan."
      },
      {
       "id": "s-references-24-7",
       "original": "PromptTTS: Controllable text-to-speech with text descriptions."
      },
      {
       "id": "s-references-24-8",
       "original": "In ICASSP 2023-2023 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP), pages 1–5."
      },
      {
       "id": "s-references-24-9",
       "original": "IEEE, 2023."
      }
     ]
    },
    {
     "id": "p-references-25",
     "type": "paragraph",
     "page": 31,
     "sentences": [
      {
       "id": "s-references-25-1",
       "original": "J."
      },
      {
       "id": "s-references-25-2",
       "original": "Ho and T."
      },
      {
       "id": "s-references-25-3",
       "original": "Salimans."
      },
      {
       "id": "s-references-25-4",
       "original": "Classifier-free diffusion guidance. arXiv preprint arXiv:2207.12598, 2022.",
       "zh": "2."
      }
     ]
    },
    {
     "id": "p-references-26",
     "type": "paragraph",
     "page": 31,
     "sentences": [
      {
       "id": "s-references-26-1",
       "original": "J."
      },
      {
       "id": "s-references-26-2",
       "original": "Ho, A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-26-3",
       "original": "Jain, and P.",
       "zh": "1."
      },
      {
       "id": "s-references-26-4",
       "original": "Abbeel."
      },
      {
       "id": "s-references-26-5",
       "original": "Denoising diffusion probabilistic models."
      },
      {
       "id": "s-references-26-6",
       "original": "Advances in Neural Information Processing Systems, 2020."
      }
     ]
    },
    {
     "id": "p-references-27",
     "type": "paragraph",
     "page": 31,
     "sentences": [
      {
       "id": "s-references-27-1",
       "original": "W.-N."
      },
      {
       "id": "s-references-27-2",
       "original": "Hsu, Y."
      },
      {
       "id": "s-references-27-3",
       "original": "Zhang, R.",
       "zh": "最后，比较最后两行可以确认：使用不含静音的音频提示能大幅提升在结尾静音往往较长的数据集上的相似度（CV、Accent），同时 WER 总体保持。"
      },
      {
       "id": "s-references-27-4",
       "original": "J."
      },
      {
       "id": "s-references-27-5",
       "original": "Weiss, H.",
       "zh": "作者感谢 Ricky Chen、Hady Elsahar、Ilia Kulikov、Hirofumi Inaguma、Jing Xu、Yossi Adi、Alexander H. Liu、Chung-Ming Chien、Qing He、Thilo Koehler、Fuchun Peng、Xiaohui Zhang、Vimal Manohar、Po-Wei Chou、Kaustubh Kalgaonkar、Anurag Kumar、Yangyang Shi、Zhaoheng Ni、Gael Le Lan 与 Varun Nagaraja 在研究上的有益讨论；"
      },
      {
       "id": "s-references-27-6",
       "original": "Zen, Y."
      },
      {
       "id": "s-references-27-7",
       "original": "Wu, Y."
      },
      {
       "id": "s-references-27-8",
       "original": "Wang, Y."
      },
      {
       "id": "s-references-27-9",
       "original": "Cao, Y."
      },
      {
       "id": "s-references-27-10",
       "original": "Jia, Z."
      },
      {
       "id": "s-references-27-11",
       "original": "Chen, J."
      },
      {
       "id": "s-references-27-12",
       "original": "Shen, et al. Hierarchical generative modeling for controllable speech synthesis."
      },
      {
       "id": "s-references-27-13",
       "original": "In International Conference on Learning Representations,",
       "zh": "1."
      }
     ]
    },
    {
     "id": "eq-references-3",
     "type": "equation",
     "page": 31,
     "original": "2019."
    },
    {
     "id": "p-references-28",
     "type": "paragraph",
     "page": 31,
     "sentences": [
      {
       "id": "s-references-28-1",
       "original": "W.-N."
      },
      {
       "id": "s-references-28-2",
       "original": "Hsu, B."
      },
      {
       "id": "s-references-28-3",
       "original": "Bolte, Y.-H.",
       "zh": "作者感谢 Ricky Chen、Hady Elsahar、Ilia Kulikov、Hirofumi Inaguma、Jing Xu、Yossi Adi、Alexander H. Liu、Chung-Ming Chien、Qing He、Thilo Koehler、Fuchun Peng、Xiaohui Zhang、Vimal Manohar、Po-Wei Chou、Kaustubh Kalgaonkar、Anurag Kumar、Yangyang Shi、Zhaoheng Ni、Gael Le Lan 与 Varun Nagaraja 在研究上的有益讨论；"
      },
      {
       "id": "s-references-28-4",
       "original": "H.",
       "zh": "作者感谢 Ricky Chen、Hady Elsahar、Ilia Kulikov、Hirofumi Inaguma、Jing Xu、Yossi Adi、Alexander H. Liu、Chung-Ming Chien、Qing He、Thilo Koehler、Fuchun Peng、Xiaohui Zhang、Vimal Manohar、Po-Wei Chou、Kaustubh Kalgaonkar、Anurag Kumar、Yangyang Shi、Zhaoheng Ni、Gael Le Lan 与 Varun Nagaraja 在研究上的有益讨论；"
      },
      {
       "id": "s-references-28-5",
       "original": "Tsai, K.",
       "zh": "我们将该数据集称为「Mix-185K」。"
      },
      {
       "id": "s-references-28-6",
       "original": "Lakhotia, R.",
       "zh": "最后，比较最后两行可以确认：使用不含静音的音频提示能大幅提升在结尾静音往往较长的数据集上的相似度（CV、Accent），同时 WER 总体保持。"
      },
      {
       "id": "s-references-28-7",
       "original": "Salakhutdinov, and A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-28-8",
       "original": "Mohamed."
      },
      {
       "id": "s-references-28-9",
       "original": "Hubert: Self-supervised speech representation learning by masked prediction of hidden units."
      },
      {
       "id": "s-references-28-10",
       "original": "IEEE/ACM Transactions on Audio, Speech, and Language Processing, 29:3451–3460, 2021.",
       "zh": "1."
      }
     ]
    },
    {
     "id": "p-references-29",
     "type": "paragraph",
     "page": 31,
     "sentences": [
      {
       "id": "s-references-29-1",
       "original": "E.",
       "zh": "为提升极低 NFE 区间（即 4）下的推理速度，我们采用 Bespoke Solvers Shaul et al. (2023)，以低得多的 NFE 恢复与原模型相近的样本质量。"
      },
      {
       "id": "s-references-29-2",
       "original": "J."
      },
      {
       "id": "s-references-29-3",
       "original": "Hu, Y."
      },
      {
       "id": "s-references-29-4",
       "original": "Shen, P.",
       "zh": "1."
      },
      {
       "id": "s-references-29-5",
       "original": "Wallis, Z."
      },
      {
       "id": "s-references-29-6",
       "original": "Allen-Zhu, Y."
      },
      {
       "id": "s-references-29-7",
       "original": "Li, S.",
       "zh": "UniAudio（Yang et al., 2023b）聚焦于构建能执行多种任务的单一模型，包括文生音乐、文生音效、上下文内 TTS 和自然语言风格提示 TTS。"
      },
      {
       "id": "s-references-29-8",
       "original": "Wang, L."
      },
      {
       "id": "s-references-29-9",
       "original": "Wang, and W."
      },
      {
       "id": "s-references-29-10",
       "original": "Chen."
      },
      {
       "id": "s-references-29-11",
       "original": "Lora: Low-rank adaptation of large language models, 2021.",
       "zh": "1."
      }
     ]
    },
    {
     "id": "p-references-30",
     "type": "paragraph",
     "page": 31,
     "sentences": [
      {
       "id": "s-references-30-1",
       "original": "C.-Z."
      },
      {
       "id": "s-references-30-2",
       "original": "A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-30-3",
       "original": "Huang, A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-30-4",
       "original": "Vaswani, J."
      },
      {
       "id": "s-references-30-5",
       "original": "Uszkoreit, N."
      },
      {
       "id": "s-references-30-6",
       "original": "Shazeer, I.",
       "zh": "值得注意的是，FAD 与 KLD 的趋势并不一致，正如 TTA 与 TAI 的比较所示。"
      },
      {
       "id": "s-references-30-7",
       "original": "Simon, C."
      },
      {
       "id": "s-references-30-8",
       "original": "Hawthorne, A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-30-9",
       "original": "M.",
       "zh": "多阶段微调：除我们收集的 500 小时高质量语音字幕外，其余语音字幕都是用属性标签和 LLM 生成的。"
      },
      {
       "id": "s-references-30-10",
       "original": "Dai, M.",
       "zh": "多阶段微调：除我们收集的 500 小时高质量语音字幕外，其余语音字幕都是用属性标签和 LLM 生成的。"
      },
      {
       "id": "s-references-30-11",
       "original": "D.",
       "zh": "标注界面见附录 D。"
      },
      {
       "id": "s-references-30-12",
       "original": "Hoffman, M.",
       "zh": "多阶段微调：除我们收集的 500 小时高质量语音字幕外，其余语音字幕都是用属性标签和 LLM 生成的。"
      },
      {
       "id": "s-references-30-13",
       "original": "Dinculescu, and D.",
       "zh": "标注界面见附录 D。"
      },
      {
       "id": "s-references-30-14",
       "original": "Eck."
      },
      {
       "id": "s-references-30-15",
       "original": "Music transformer. arXiv preprint arXiv:1809.04281, 2018."
      }
     ]
    },
    {
     "id": "p-references-31",
     "type": "paragraph",
     "page": 31,
     "sentences": [
      {
       "id": "s-references-31-1",
       "original": "Q."
      },
      {
       "id": "s-references-31-2",
       "original": "Huang, D.",
       "zh": "标注界面见附录 D。"
      },
      {
       "id": "s-references-31-3",
       "original": "S.",
       "zh": "UniAudio（Yang et al., 2023b）聚焦于构建能执行多种任务的单一模型，包括文生音乐、文生音效、上下文内 TTS 和自然语言风格提示 TTS。"
      },
      {
       "id": "s-references-31-4",
       "original": "Park, T."
      },
      {
       "id": "s-references-31-5",
       "original": "Wang, T."
      },
      {
       "id": "s-references-31-6",
       "original": "I.",
       "zh": "值得注意的是，FAD 与 KLD 的趋势并不一致，正如 TTA 与 TAI 的比较所示。"
      },
      {
       "id": "s-references-31-7",
       "original": "Denk, A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-31-8",
       "original": "Ly, N."
      },
      {
       "id": "s-references-31-9",
       "original": "Chen, Z."
      },
      {
       "id": "s-references-31-10",
       "original": "Zhang, Z."
      },
      {
       "id": "s-references-31-11",
       "original": "Zhang, J."
      },
      {
       "id": "s-references-31-12",
       "original": "Yu, C."
      },
      {
       "id": "s-references-31-13",
       "original": "Frank, et al. Noise2music: Text-conditioned music generation with diffusion models. arXiv preprint arXiv:2302.03917, 2023a.",
       "zh": "2."
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
       "original": "R.",
       "zh": "最后，比较最后两行可以确认：使用不含静音的音频提示能大幅提升在结尾静音往往较长的数据集上的相似度（CV、Accent），同时 WER 总体保持。"
      },
      {
       "id": "s-references-32-2",
       "original": "Huang, J."
      },
      {
       "id": "s-references-32-3",
       "original": "Huang, D.",
       "zh": "标注界面见附录 D。"
      },
      {
       "id": "s-references-32-4",
       "original": "Yang, Y."
      },
      {
       "id": "s-references-32-5",
       "original": "Ren, L."
      },
      {
       "id": "s-references-32-6",
       "original": "Liu, M.",
       "zh": "多阶段微调：除我们收集的 500 小时高质量语音字幕外，其余语音字幕都是用属性标签和 LLM 生成的。"
      },
      {
       "id": "s-references-32-7",
       "original": "Li, Z."
      },
      {
       "id": "s-references-32-8",
       "original": "Ye, J."
      },
      {
       "id": "s-references-32-9",
       "original": "Liu, X."
      },
      {
       "id": "s-references-32-10",
       "original": "Yin, and Z."
      },
      {
       "id": "s-references-32-11",
       "original": "Zhao."
      },
      {
       "id": "s-references-32-12",
       "original": "Make-an-audio: Text-to-audio generation with prompt-enhanced diffusion models. arXiv preprint arXiv:2301.12661, 2023b.",
       "zh": "1."
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
       "original": "J."
      },
      {
       "id": "s-references-33-2",
       "original": "Kahn, M.",
       "zh": "多阶段微调：除我们收集的 500 小时高质量语音字幕外，其余语音字幕都是用属性标签和 LLM 生成的。"
      },
      {
       "id": "s-references-33-3",
       "original": "Rivière, W."
      },
      {
       "id": "s-references-33-4",
       "original": "Zheng, E.",
       "zh": "为提升极低 NFE 区间（即 4）下的推理速度，我们采用 Bespoke Solvers Shaul et al. (2023)，以低得多的 NFE 恢复与原模型相近的样本质量。"
      },
      {
       "id": "s-references-33-5",
       "original": "Kharitonov, Q."
      },
      {
       "id": "s-references-33-6",
       "original": "Xu, P.-E.",
       "zh": "为提升极低 NFE 区间（即 4）下的推理速度，我们采用 Bespoke Solvers Shaul et al. (2023)，以低得多的 NFE 恢复与原模型相近的样本质量。"
      },
      {
       "id": "s-references-33-7",
       "original": "Mazar’e, J."
      },
      {
       "id": "s-references-33-8",
       "original": "Karadayi, V."
      },
      {
       "id": "s-references-33-9",
       "original": "Liptchinsky, R.",
       "zh": "最后，比较最后两行可以确认：使用不含静音的音频提示能大幅提升在结尾静音往往较长的数据集上的相似度（CV、Accent），同时 WER 总体保持。"
      },
      {
       "id": "s-references-33-10",
       "original": "Collobert, C."
      },
      {
       "id": "s-references-33-11",
       "original": "Fuegen, T."
      },
      {
       "id": "s-references-33-12",
       "original": "Likhomanenko, G."
      },
      {
       "id": "s-references-33-13",
       "original": "Synnaeve, A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-33-14",
       "original": "Joulin, A. rahman Mohamed, and E.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-33-15",
       "original": "Dupoux."
      },
      {
       "id": "s-references-33-16",
       "original": "Libri-Light: A benchmark for asr with limited or no supervision."
      },
      {
       "id": "s-references-33-17",
       "original": "International Conference on Acoustics, Speech and Signal Processing, 2019."
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
       "original": "E.",
       "zh": "为提升极低 NFE 区间（即 4）下的推理速度，我们采用 Bespoke Solvers Shaul et al. (2023)，以低得多的 NFE 恢复与原模型相近的样本质量。"
      },
      {
       "id": "s-references-34-2",
       "original": "Kharitonov, D.",
       "zh": "标注界面见附录 D。"
      },
      {
       "id": "s-references-34-3",
       "original": "Vincent, Z."
      },
      {
       "id": "s-references-34-4",
       "original": "Borsos, R.",
       "zh": "最后，比较最后两行可以确认：使用不含静音的音频提示能大幅提升在结尾静音往往较长的数据集上的相似度（CV、Accent），同时 WER 总体保持。"
      },
      {
       "id": "s-references-34-5",
       "original": "Marinier, S.",
       "zh": "UniAudio（Yang et al., 2023b）聚焦于构建能执行多种任务的单一模型，包括文生音乐、文生音效、上下文内 TTS 和自然语言风格提示 TTS。"
      },
      {
       "id": "s-references-34-6",
       "original": "Girgin, O.",
       "zh": "我们发现 Audiobox 显著优于所有基线，达到联合模型的最先进水平，甚至超过 TANGO 等纯音效模型。"
      },
      {
       "id": "s-references-34-7",
       "original": "Pietquin, M.",
       "zh": "多阶段微调：除我们收集的 500 小时高质量语音字幕外，其余语音字幕都是用属性标签和 LLM 生成的。"
      },
      {
       "id": "s-references-34-8",
       "original": "Sharifi, M.",
       "zh": "多阶段微调：除我们收集的 500 小时高质量语音字幕外，其余语音字幕都是用属性标签和 LLM 生成的。"
      },
      {
       "id": "s-references-34-9",
       "original": "Tagliasacchi, and N."
      },
      {
       "id": "s-references-34-10",
       "original": "Zeghidour."
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
       "original": "Speak, read and prompt: High-fidelity text-to-speech with minimal supervision, 2023."
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
       "original": "K.",
       "zh": "我们将该数据集称为「Mix-185K」。"
      },
      {
       "id": "s-references-36-2",
       "original": "Kilgour, M.",
       "zh": "多阶段微调：除我们收集的 500 小时高质量语音字幕外，其余语音字幕都是用属性标签和 LLM 生成的。"
      },
      {
       "id": "s-references-36-3",
       "original": "Zuluaga, D.",
       "zh": "标注界面见附录 D。"
      },
      {
       "id": "s-references-36-4",
       "original": "Roblek, and M.",
       "zh": "多阶段微调：除我们收集的 500 小时高质量语音字幕外，其余语音字幕都是用属性标签和 LLM 生成的。"
      },
      {
       "id": "s-references-36-5",
       "original": "Sharifi."
      },
      {
       "id": "s-references-36-6",
       "original": "Fréchet audio distance: A reference-free metric for evaluating music enhancement algorithms."
      },
      {
       "id": "s-references-36-7",
       "original": "In Interspeech, 2019."
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
       "original": "C."
      },
      {
       "id": "s-references-37-2",
       "original": "D.",
       "zh": "标注界面见附录 D。"
      },
      {
       "id": "s-references-37-3",
       "original": "Kim, B."
      },
      {
       "id": "s-references-37-4",
       "original": "Kim, H.",
       "zh": "作者感谢 Ricky Chen、Hady Elsahar、Ilia Kulikov、Hirofumi Inaguma、Jing Xu、Yossi Adi、Alexander H. Liu、Chung-Ming Chien、Qing He、Thilo Koehler、Fuchun Peng、Xiaohui Zhang、Vimal Manohar、Po-Wei Chou、Kaustubh Kalgaonkar、Anurag Kumar、Yangyang Shi、Zhaoheng Ni、Gael Le Lan 与 Varun Nagaraja 在研究上的有益讨论；"
      },
      {
       "id": "s-references-37-5",
       "original": "Lee, and G."
      },
      {
       "id": "s-references-37-6",
       "original": "Kim."
      },
      {
       "id": "s-references-37-7",
       "original": "Audiocaps: Generating captions for audios in the wild."
      },
      {
       "id": "s-references-37-8",
       "original": "In NAACL-HLT,"
      }
     ]
    },
    {
     "id": "eq-references-4",
     "type": "equation",
     "page": 31,
     "original": "2019."
    },
    {
     "id": "p-references-38",
     "type": "paragraph",
     "page": 31,
     "sentences": [
      {
       "id": "s-references-38-1",
       "original": "D.",
       "zh": "标注界面见附录 D。"
      },
      {
       "id": "s-references-38-2",
       "original": "P.",
       "zh": "1."
      },
      {
       "id": "s-references-38-3",
       "original": "Kingma and J."
      },
      {
       "id": "s-references-38-4",
       "original": "Ba."
      },
      {
       "id": "s-references-38-5",
       "original": "Adam: A method for stochastic optimization."
      },
      {
       "id": "s-references-38-6",
       "original": "CoRR, abs/1412.6980, 2014.",
       "zh": "2."
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
       "original": "D.",
       "zh": "标注界面见附录 D。"
      },
      {
       "id": "s-references-39-2",
       "original": "P.",
       "zh": "1."
      },
      {
       "id": "s-references-39-3",
       "original": "Kingma and M.",
       "zh": "多阶段微调：除我们收集的 500 小时高质量语音字幕外，其余语音字幕都是用属性标签和 LLM 生成的。"
      },
      {
       "id": "s-references-39-4",
       "original": "Welling."
      },
      {
       "id": "s-references-39-5",
       "original": "Auto-encoding variational bayes."
      },
      {
       "id": "s-references-39-6",
       "original": "In ICLR, 2014."
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
       "original": "J."
      },
      {
       "id": "s-references-40-2",
       "original": "Kong, J."
      },
      {
       "id": "s-references-40-3",
       "original": "Kim, and J."
      },
      {
       "id": "s-references-40-4",
       "original": "Bae."
      },
      {
       "id": "s-references-40-5",
       "original": "Hifi-gan: Generative adversarial networks for efficient and high fidelity speech synthesis."
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
       "original": "Advances in Neural Information Processing Systems, 33:17022–17033, 2020."
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
       "original": "Q."
      },
      {
       "id": "s-references-42-2",
       "original": "Kong, Y."
      },
      {
       "id": "s-references-42-3",
       "original": "Cao, T."
      },
      {
       "id": "s-references-42-4",
       "original": "Iqbal, Y."
      },
      {
       "id": "s-references-42-5",
       "original": "Wang, W."
      },
      {
       "id": "s-references-42-6",
       "original": "Wang, and M.",
       "zh": "多阶段微调：除我们收集的 500 小时高质量语音字幕外，其余语音字幕都是用属性标签和 LLM 生成的。"
      },
      {
       "id": "s-references-42-7",
       "original": "D.",
       "zh": "标注界面见附录 D。"
      },
      {
       "id": "s-references-42-8",
       "original": "Plumbley."
      },
      {
       "id": "s-references-42-9",
       "original": "Panns: Large-scale pretrained audio neural networks for audio pattern recognition."
      },
      {
       "id": "s-references-42-10",
       "original": "IEEE/ACM Transactions on Audio, Speech, and Language Processing, 28,"
      }
     ]
    },
    {
     "id": "eq-references-5",
     "type": "equation",
     "page": 31,
     "original": "2019."
    },
    {
     "id": "p-references-43",
     "type": "paragraph",
     "page": 31,
     "sentences": [
      {
       "id": "s-references-43-1",
       "original": "F."
      },
      {
       "id": "s-references-43-2",
       "original": "Kreuk, G."
      },
      {
       "id": "s-references-43-3",
       "original": "Synnaeve, A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-43-4",
       "original": "Polyak, U."
      },
      {
       "id": "s-references-43-5",
       "original": "Singer, A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-43-6",
       "original": "Défossez, J."
      },
      {
       "id": "s-references-43-7",
       "original": "Copet, D.",
       "zh": "标注界面见附录 D。"
      },
      {
       "id": "s-references-43-8",
       "original": "Parikh, Y."
      },
      {
       "id": "s-references-43-9",
       "original": "Taigman, and Y."
      },
      {
       "id": "s-references-43-10",
       "original": "Adi."
      },
      {
       "id": "s-references-43-11",
       "original": "Audiogen: Textually guided audio generation. arXiv preprint arXiv:2209.15352, 2022.",
       "zh": "2."
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
       "original": "A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-44-2",
       "original": "Kulkarni, V."
      },
      {
       "id": "s-references-44-3",
       "original": "Colotte, and D.",
       "zh": "标注界面见附录 D。"
      },
      {
       "id": "s-references-44-4",
       "original": "Jouvet."
      },
      {
       "id": "s-references-44-5",
       "original": "Improving transfer of expressivity for end-to-end multispeaker text-to-speech synthesis."
      },
      {
       "id": "s-references-44-6",
       "original": "In 2021 29th European Signal Processing Conference (EUSIPCO), pages 31–35."
      },
      {
       "id": "s-references-44-7",
       "original": "IEEE, 2021.",
       "zh": "1."
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
       "original": "A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-45-2",
       "original": "Kumar, K.",
       "zh": "我们将该数据集称为「Mix-185K」。"
      },
      {
       "id": "s-references-45-3",
       "original": "Tan, Z."
      },
      {
       "id": "s-references-45-4",
       "original": "Ni, P.",
       "zh": "1."
      },
      {
       "id": "s-references-45-5",
       "original": "Manocha, X."
      },
      {
       "id": "s-references-45-6",
       "original": "Zhang, E.",
       "zh": "为提升极低 NFE 区间（即 4）下的推理速度，我们采用 Bespoke Solvers Shaul et al. (2023)，以低得多的 NFE 恢复与原模型相近的样本质量。"
      },
      {
       "id": "s-references-45-7",
       "original": "Henderson, and B."
      },
      {
       "id": "s-references-45-8",
       "original": "Xu."
      },
      {
       "id": "s-references-45-9",
       "original": "Torchaudio-squim: Reference-less speech quality and intelligibility measures in torchaudio."
      },
      {
       "id": "s-references-45-10",
       "original": "In ICASSP 2023 - 2023 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP), pages 1–5, 2023. doi: 10.1109/ICASSP49357.2023.10096680."
      }
     ]
    },
    {
     "id": "p-references-46",
     "type": "paragraph",
     "page": 32,
     "sentences": [
      {
       "id": "s-references-46-1",
       "original": "A. Łańcucki.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-46-2",
       "original": "Fastpitch: Parallel text-to-speech with pitch prediction."
      },
      {
       "id": "s-references-46-3",
       "original": "In ICASSP 2021-2021 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP), pages 6588–6592.",
       "zh": "2."
      },
      {
       "id": "s-references-46-4",
       "original": "IEEE, 2021.",
       "zh": "1."
      }
     ]
    },
    {
     "id": "p-references-47",
     "type": "paragraph",
     "page": 32,
     "sentences": [
      {
       "id": "s-references-47-1",
       "original": "M.",
       "zh": "多阶段微调：除我们收集的 500 小时高质量语音字幕外，其余语音字幕都是用属性标签和 LLM 生成的。"
      },
      {
       "id": "s-references-47-2",
       "original": "Le, A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-47-3",
       "original": "Vyas, B."
      },
      {
       "id": "s-references-47-4",
       "original": "Shi, B."
      },
      {
       "id": "s-references-47-5",
       "original": "Karrer, L."
      },
      {
       "id": "s-references-47-6",
       "original": "Sari, R.",
       "zh": "最后，比较最后两行可以确认：使用不含静音的音频提示能大幅提升在结尾静音往往较长的数据集上的相似度（CV、Accent），同时 WER 总体保持。"
      },
      {
       "id": "s-references-47-7",
       "original": "Moritz, M.",
       "zh": "多阶段微调：除我们收集的 500 小时高质量语音字幕外，其余语音字幕都是用属性标签和 LLM 生成的。"
      },
      {
       "id": "s-references-47-8",
       "original": "Williamson, V."
      },
      {
       "id": "s-references-47-9",
       "original": "Manohar, Y."
      },
      {
       "id": "s-references-47-10",
       "original": "Adi, J."
      },
      {
       "id": "s-references-47-11",
       "original": "Mahadeokar, and W.-N."
      }
     ]
    },
    {
     "id": "p-references-48",
     "type": "paragraph",
     "page": 32,
     "sentences": [
      {
       "id": "s-references-48-1",
       "original": "Hsu."
      },
      {
       "id": "s-references-48-2",
       "original": "Voicebox: Text-guided multilingual universal speech generation at scale, 2023."
      }
     ]
    },
    {
     "id": "p-references-49",
     "type": "paragraph",
     "page": 32,
     "sentences": [
      {
       "id": "s-references-49-1",
       "original": "S.-g.",
       "zh": "UniAudio（Yang et al., 2023b）聚焦于构建能执行多种任务的单一模型，包括文生音乐、文生音效、上下文内 TTS 和自然语言风格提示 TTS。"
      },
      {
       "id": "s-references-49-2",
       "original": "Lee, W."
      },
      {
       "id": "s-references-49-3",
       "original": "Ping, B."
      },
      {
       "id": "s-references-49-4",
       "original": "Ginsburg, B."
      },
      {
       "id": "s-references-49-5",
       "original": "Catanzaro, and S.",
       "zh": "UniAudio（Yang et al., 2023b）聚焦于构建能执行多种任务的单一模型，包括文生音乐、文生音效、上下文内 TTS 和自然语言风格提示 TTS。"
      },
      {
       "id": "s-references-49-6",
       "original": "Yoon."
      },
      {
       "id": "s-references-49-7",
       "original": "Bigvgan: A universal neural vocoder with large-scale training. arXiv preprint arXiv:2206.04658, 2022.",
       "zh": "2."
      }
     ]
    },
    {
     "id": "p-references-50",
     "type": "paragraph",
     "page": 32,
     "sentences": [
      {
       "id": "s-references-50-1",
       "original": "Y.",
       "zh": "作者感谢 Ricky Chen、Hady Elsahar、Ilia Kulikov、Hirofumi Inaguma、Jing Xu、Yossi Adi、Alexander H. Liu、Chung-Ming Chien、Qing He、Thilo Koehler、Fuchun Peng、Xiaohui Zhang、Vimal Manohar、Po-Wei Chou、Kaustubh Kalgaonkar、Anurag Kumar、Yangyang Shi、Zhaoheng Ni、Gael Le Lan 与 Varun Nagaraja 在研究上的有益讨论；"
      },
      {
       "id": "s-references-50-2",
       "original": "Lee, I.",
       "zh": "值得注意的是，FAD 与 KLD 的趋势并不一致，正如 TTA 与 TAI 的比较所示。"
      },
      {
       "id": "s-references-50-3",
       "original": "Yeon, J."
      },
      {
       "id": "s-references-50-4",
       "original": "Nam, and J."
      },
      {
       "id": "s-references-50-5",
       "original": "S.",
       "zh": "UniAudio（Yang et al., 2023b）聚焦于构建能执行多种任务的单一模型，包括文生音乐、文生音效、上下文内 TTS 和自然语言风格提示 TTS。"
      },
      {
       "id": "s-references-50-6",
       "original": "Chung."
      },
      {
       "id": "s-references-50-7",
       "original": "Voiceldm: Text-to-speech with environmental context, 2023."
      }
     ]
    },
    {
     "id": "p-references-51",
     "type": "paragraph",
     "page": 32,
     "sentences": [
      {
       "id": "s-references-51-1",
       "original": "Y.",
       "zh": "作者感谢 Ricky Chen、Hady Elsahar、Ilia Kulikov、Hirofumi Inaguma、Jing Xu、Yossi Adi、Alexander H. Liu、Chung-Ming Chien、Qing He、Thilo Koehler、Fuchun Peng、Xiaohui Zhang、Vimal Manohar、Po-Wei Chou、Kaustubh Kalgaonkar、Anurag Kumar、Yangyang Shi、Zhaoheng Ni、Gael Le Lan 与 Varun Nagaraja 在研究上的有益讨论；"
      },
      {
       "id": "s-references-51-2",
       "original": "Leng, Z."
      },
      {
       "id": "s-references-51-3",
       "original": "Guo, K.",
       "zh": "我们将该数据集称为「Mix-185K」。"
      },
      {
       "id": "s-references-51-4",
       "original": "Shen, X."
      },
      {
       "id": "s-references-51-5",
       "original": "Tan, Z."
      },
      {
       "id": "s-references-51-6",
       "original": "Ju, Y."
      },
      {
       "id": "s-references-51-7",
       "original": "Liu, Y."
      },
      {
       "id": "s-references-51-8",
       "original": "Liu, D.",
       "zh": "标注界面见附录 D。"
      },
      {
       "id": "s-references-51-9",
       "original": "Yang, L."
      },
      {
       "id": "s-references-51-10",
       "original": "Zhang, K.",
       "zh": "我们将该数据集称为「Mix-185K」。"
      },
      {
       "id": "s-references-51-11",
       "original": "Song, et al. PromptTTS 2: Describing and generating voices with text prompt. arXiv preprint arXiv:2309.02285, 2023."
      }
     ]
    },
    {
     "id": "p-references-52",
     "type": "paragraph",
     "page": 32,
     "sentences": [
      {
       "id": "s-references-52-1",
       "original": "P.",
       "zh": "1."
      },
      {
       "id": "s-references-52-2",
       "original": "Li, B."
      },
      {
       "id": "s-references-52-3",
       "original": "Chen, Y."
      },
      {
       "id": "s-references-52-4",
       "original": "Yao, Y."
      },
      {
       "id": "s-references-52-5",
       "original": "Wang, A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-52-6",
       "original": "Wang, and A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-52-7",
       "original": "Wang."
      },
      {
       "id": "s-references-52-8",
       "original": "Jen-1: Text-guided universal music generation with omnidirectional diffusion models. arXiv preprint arXiv:2308.04729, 2023."
      }
     ]
    },
    {
     "id": "p-references-53",
     "type": "paragraph",
     "page": 32,
     "sentences": [
      {
       "id": "s-references-53-1",
       "original": "Y.",
       "zh": "作者感谢 Ricky Chen、Hady Elsahar、Ilia Kulikov、Hirofumi Inaguma、Jing Xu、Yossi Adi、Alexander H. Liu、Chung-Ming Chien、Qing He、Thilo Koehler、Fuchun Peng、Xiaohui Zhang、Vimal Manohar、Po-Wei Chou、Kaustubh Kalgaonkar、Anurag Kumar、Yangyang Shi、Zhaoheng Ni、Gael Le Lan 与 Varun Nagaraja 在研究上的有益讨论；"
      },
      {
       "id": "s-references-53-2",
       "original": "Lipman, R.",
       "zh": "最后，比较最后两行可以确认：使用不含静音的音频提示能大幅提升在结尾静音往往较长的数据集上的相似度（CV、Accent），同时 WER 总体保持。"
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
       "original": "Chen, H.",
       "zh": "作者感谢 Ricky Chen、Hady Elsahar、Ilia Kulikov、Hirofumi Inaguma、Jing Xu、Yossi Adi、Alexander H. Liu、Chung-Ming Chien、Qing He、Thilo Koehler、Fuchun Peng、Xiaohui Zhang、Vimal Manohar、Po-Wei Chou、Kaustubh Kalgaonkar、Anurag Kumar、Yangyang Shi、Zhaoheng Ni、Gael Le Lan 与 Varun Nagaraja 在研究上的有益讨论；"
      },
      {
       "id": "s-references-53-6",
       "original": "Ben-Hamu, M.",
       "zh": "多阶段微调：除我们收集的 500 小时高质量语音字幕外，其余语音字幕都是用属性标签和 LLM 生成的。"
      },
      {
       "id": "s-references-53-7",
       "original": "Nickel, and M.",
       "zh": "多阶段微调：除我们收集的 500 小时高质量语音字幕外，其余语音字幕都是用属性标签和 LLM 生成的。"
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
     "page": 32,
     "sentences": [
      {
       "id": "s-references-54-1",
       "original": "A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-54-2",
       "original": "H.",
       "zh": "作者感谢 Ricky Chen、Hady Elsahar、Ilia Kulikov、Hirofumi Inaguma、Jing Xu、Yossi Adi、Alexander H. Liu、Chung-Ming Chien、Qing He、Thilo Koehler、Fuchun Peng、Xiaohui Zhang、Vimal Manohar、Po-Wei Chou、Kaustubh Kalgaonkar、Anurag Kumar、Yangyang Shi、Zhaoheng Ni、Gael Le Lan 与 Varun Nagaraja 在研究上的有益讨论；"
      },
      {
       "id": "s-references-54-3",
       "original": "Liu, M.",
       "zh": "多阶段微调：除我们收集的 500 小时高质量语音字幕外，其余语音字幕都是用属性标签和 LLM 生成的。"
      },
      {
       "id": "s-references-54-4",
       "original": "Le, A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-54-5",
       "original": "Vyas, B."
      },
      {
       "id": "s-references-54-6",
       "original": "Shi, A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-54-7",
       "original": "Tjandra, and W.-N."
      },
      {
       "id": "s-references-54-8",
       "original": "Hsu."
      },
      {
       "id": "s-references-54-9",
       "original": "Generative pre-training for speech with flow matching, 2023a."
      }
     ]
    },
    {
     "id": "p-references-55",
     "type": "paragraph",
     "page": 32,
     "sentences": [
      {
       "id": "s-references-55-1",
       "original": "H.",
       "zh": "作者感谢 Ricky Chen、Hady Elsahar、Ilia Kulikov、Hirofumi Inaguma、Jing Xu、Yossi Adi、Alexander H. Liu、Chung-Ming Chien、Qing He、Thilo Koehler、Fuchun Peng、Xiaohui Zhang、Vimal Manohar、Po-Wei Chou、Kaustubh Kalgaonkar、Anurag Kumar、Yangyang Shi、Zhaoheng Ni、Gael Le Lan 与 Varun Nagaraja 在研究上的有益讨论；"
      },
      {
       "id": "s-references-55-2",
       "original": "Liu, Z."
      },
      {
       "id": "s-references-55-3",
       "original": "Chen, Y."
      },
      {
       "id": "s-references-55-4",
       "original": "Yuan, X."
      },
      {
       "id": "s-references-55-5",
       "original": "Mei, X."
      },
      {
       "id": "s-references-55-6",
       "original": "Liu, D.",
       "zh": "标注界面见附录 D。"
      },
      {
       "id": "s-references-55-7",
       "original": "Mandic, W."
      },
      {
       "id": "s-references-55-8",
       "original": "Wang, and M.",
       "zh": "多阶段微调：除我们收集的 500 小时高质量语音字幕外，其余语音字幕都是用属性标签和 LLM 生成的。"
      },
      {
       "id": "s-references-55-9",
       "original": "D.",
       "zh": "标注界面见附录 D。"
      },
      {
       "id": "s-references-55-10",
       "original": "Plumbley."
      },
      {
       "id": "s-references-55-11",
       "original": "Audioldm: Text-to-audio generation with latent diffusion models. arXiv preprint arXiv:2301.12503, 2023b.",
       "zh": "1."
      }
     ]
    },
    {
     "id": "p-references-56",
     "type": "paragraph",
     "page": 32,
     "sentences": [
      {
       "id": "s-references-56-1",
       "original": "H.",
       "zh": "作者感谢 Ricky Chen、Hady Elsahar、Ilia Kulikov、Hirofumi Inaguma、Jing Xu、Yossi Adi、Alexander H. Liu、Chung-Ming Chien、Qing He、Thilo Koehler、Fuchun Peng、Xiaohui Zhang、Vimal Manohar、Po-Wei Chou、Kaustubh Kalgaonkar、Anurag Kumar、Yangyang Shi、Zhaoheng Ni、Gael Le Lan 与 Varun Nagaraja 在研究上的有益讨论；"
      },
      {
       "id": "s-references-56-2",
       "original": "Liu, Q."
      },
      {
       "id": "s-references-56-3",
       "original": "Tian, Y."
      },
      {
       "id": "s-references-56-4",
       "original": "Yuan, X."
      },
      {
       "id": "s-references-56-5",
       "original": "Liu, X."
      },
      {
       "id": "s-references-56-6",
       "original": "Mei, Q."
      },
      {
       "id": "s-references-56-7",
       "original": "Kong, Y."
      },
      {
       "id": "s-references-56-8",
       "original": "Wang, W."
      },
      {
       "id": "s-references-56-9",
       "original": "Wang, Y."
      },
      {
       "id": "s-references-56-10",
       "original": "Wang, and M.",
       "zh": "多阶段微调：除我们收集的 500 小时高质量语音字幕外，其余语音字幕都是用属性标签和 LLM 生成的。"
      },
      {
       "id": "s-references-56-11",
       "original": "D.",
       "zh": "标注界面见附录 D。"
      },
      {
       "id": "s-references-56-12",
       "original": "Plumbley."
      },
      {
       "id": "s-references-56-13",
       "original": "Audioldm 2: Learning holistic audio generation with self-supervised pretraining. arXiv preprint arXiv:2308.05734, 2023c."
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
       "original": "X."
      },
      {
       "id": "s-references-57-2",
       "original": "Liu, Q."
      },
      {
       "id": "s-references-57-3",
       "original": "Kong, Y."
      },
      {
       "id": "s-references-57-4",
       "original": "Zhao, H.",
       "zh": "作者感谢 Ricky Chen、Hady Elsahar、Ilia Kulikov、Hirofumi Inaguma、Jing Xu、Yossi Adi、Alexander H. Liu、Chung-Ming Chien、Qing He、Thilo Koehler、Fuchun Peng、Xiaohui Zhang、Vimal Manohar、Po-Wei Chou、Kaustubh Kalgaonkar、Anurag Kumar、Yangyang Shi、Zhaoheng Ni、Gael Le Lan 与 Varun Nagaraja 在研究上的有益讨论；"
      },
      {
       "id": "s-references-57-5",
       "original": "Liu, Y."
      },
      {
       "id": "s-references-57-6",
       "original": "Yuan, Y."
      },
      {
       "id": "s-references-57-7",
       "original": "Liu, R.",
       "zh": "最后，比较最后两行可以确认：使用不含静音的音频提示能大幅提升在结尾静音往往较长的数据集上的相似度（CV、Accent），同时 WER 总体保持。"
      },
      {
       "id": "s-references-57-8",
       "original": "Xia, Y."
      },
      {
       "id": "s-references-57-9",
       "original": "Wang, M.",
       "zh": "多阶段微调：除我们收集的 500 小时高质量语音字幕外，其余语音字幕都是用属性标签和 LLM 生成的。"
      },
      {
       "id": "s-references-57-10",
       "original": "D.",
       "zh": "标注界面见附录 D。"
      },
      {
       "id": "s-references-57-11",
       "original": "Plumbley, and W."
      },
      {
       "id": "s-references-57-12",
       "original": "Wang."
      },
      {
       "id": "s-references-57-13",
       "original": "Separate anything you describe. arXiv preprint arXiv:2308.05037, 2023d."
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
       "original": "Y.",
       "zh": "作者感谢 Ricky Chen、Hady Elsahar、Ilia Kulikov、Hirofumi Inaguma、Jing Xu、Yossi Adi、Alexander H. Liu、Chung-Ming Chien、Qing He、Thilo Koehler、Fuchun Peng、Xiaohui Zhang、Vimal Manohar、Po-Wei Chou、Kaustubh Kalgaonkar、Anurag Kumar、Yangyang Shi、Zhaoheng Ni、Gael Le Lan 与 Varun Nagaraja 在研究上的有益讨论；"
      },
      {
       "id": "s-references-58-2",
       "original": "Liu, M.",
       "zh": "多阶段微调：除我们收集的 500 小时高质量语音字幕外，其余语音字幕都是用属性标签和 LLM 生成的。"
      },
      {
       "id": "s-references-58-3",
       "original": "Ott, N."
      },
      {
       "id": "s-references-58-4",
       "original": "Goyal, J."
      },
      {
       "id": "s-references-58-5",
       "original": "Du, M.",
       "zh": "多阶段微调：除我们收集的 500 小时高质量语音字幕外，其余语音字幕都是用属性标签和 LLM 生成的。"
      },
      {
       "id": "s-references-58-6",
       "original": "Joshi, D.",
       "zh": "标注界面见附录 D。"
      },
      {
       "id": "s-references-58-7",
       "original": "Chen, O.",
       "zh": "我们发现 Audiobox 显著优于所有基线，达到联合模型的最先进水平，甚至超过 TANGO 等纯音效模型。"
      },
      {
       "id": "s-references-58-8",
       "original": "Levy, M.",
       "zh": "多阶段微调：除我们收集的 500 小时高质量语音字幕外，其余语音字幕都是用属性标签和 LLM 生成的。"
      },
      {
       "id": "s-references-58-9",
       "original": "Lewis, L."
      },
      {
       "id": "s-references-58-10",
       "original": "Zettlemoyer, and V."
      },
      {
       "id": "s-references-58-11",
       "original": "Stoyanov."
      },
      {
       "id": "s-references-58-12",
       "original": "Roberta: A robustly optimized bert pretraining approach."
      },
      {
       "id": "s-references-58-13",
       "original": "ArXiv, abs/1907.11692, 2019."
      },
      {
       "id": "s-references-58-14",
       "original": "URL https://api.semanticscholar.org/ CorpusID:198953378."
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
       "original": "M.",
       "zh": "多阶段微调：除我们收集的 500 小时高质量语音字幕外，其余语音字幕都是用属性标签和 LLM 生成的。"
      },
      {
       "id": "s-references-59-2",
       "original": "McAuliffe, M.",
       "zh": "多阶段微调：除我们收集的 500 小时高质量语音字幕外，其余语音字幕都是用属性标签和 LLM 生成的。"
      },
      {
       "id": "s-references-59-3",
       "original": "Socolof, S.",
       "zh": "UniAudio（Yang et al., 2023b）聚焦于构建能执行多种任务的单一模型，包括文生音乐、文生音效、上下文内 TTS 和自然语言风格提示 TTS。"
      },
      {
       "id": "s-references-59-4",
       "original": "Mihuc, M.",
       "zh": "多阶段微调：除我们收集的 500 小时高质量语音字幕外，其余语音字幕都是用属性标签和 LLM 生成的。"
      },
      {
       "id": "s-references-59-5",
       "original": "Wagner, and M.",
       "zh": "多阶段微调：除我们收集的 500 小时高质量语音字幕外，其余语音字幕都是用属性标签和 LLM 生成的。"
      },
      {
       "id": "s-references-59-6",
       "original": "Sonderegger."
      },
      {
       "id": "s-references-59-7",
       "original": "Montreal forced aligner: Trainable text-speech alignment using kaldi."
      },
      {
       "id": "s-references-59-8",
       "original": "In Interspeech, 2017."
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
       "original": "T."
      },
      {
       "id": "s-references-60-2",
       "original": "A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-60-3",
       "original": "Nguyen, W.-N."
      },
      {
       "id": "s-references-60-4",
       "original": "Hsu, A. d’Avirro, B.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-60-5",
       "original": "Shi, I.",
       "zh": "值得注意的是，FAD 与 KLD 的趋势并不一致，正如 TTA 与 TAI 的比较所示。"
      },
      {
       "id": "s-references-60-6",
       "original": "Gat, M.",
       "zh": "多阶段微调：除我们收集的 500 小时高质量语音字幕外，其余语音字幕都是用属性标签和 LLM 生成的。"
      },
      {
       "id": "s-references-60-7",
       "original": "Fazel-Zarani, T."
      },
      {
       "id": "s-references-60-8",
       "original": "Remez, J."
      },
      {
       "id": "s-references-60-9",
       "original": "Copet, G."
      },
      {
       "id": "s-references-60-10",
       "original": "Synnaeve, M.",
       "zh": "多阶段微调：除我们收集的 500 小时高质量语音字幕外，其余语音字幕都是用属性标签和 LLM 生成的。"
      },
      {
       "id": "s-references-60-11",
       "original": "Hassid, et al. Expresso: A benchmark and analysis of discrete expressive speech resynthesis. arXiv preprint arXiv:2308.05725,"
      }
     ]
    },
    {
     "id": "eq-references-6",
     "type": "equation",
     "page": 32,
     "original": "2023."
    },
    {
     "id": "p-references-61",
     "type": "paragraph",
     "page": 32,
     "sentences": [
      {
       "id": "s-references-61-1",
       "original": "V."
      },
      {
       "id": "s-references-61-2",
       "original": "Panayotov, G."
      },
      {
       "id": "s-references-61-3",
       "original": "Chen, D.",
       "zh": "标注界面见附录 D。"
      },
      {
       "id": "s-references-61-4",
       "original": "Povey, and S.",
       "zh": "UniAudio（Yang et al., 2023b）聚焦于构建能执行多种任务的单一模型，包括文生音乐、文生音效、上下文内 TTS 和自然语言风格提示 TTS。"
      },
      {
       "id": "s-references-61-5",
       "original": "Khudanpur."
      },
      {
       "id": "s-references-61-6",
       "original": "Librispeech: An asr corpus based on public domain audio books."
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
       "original": "International Conference on Acoustics, Speech and Signal Processing, 2015."
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
       "original": "A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-63-2",
       "original": "Plaquet and H.",
       "zh": "作者感谢 Ricky Chen、Hady Elsahar、Ilia Kulikov、Hirofumi Inaguma、Jing Xu、Yossi Adi、Alexander H. Liu、Chung-Ming Chien、Qing He、Thilo Koehler、Fuchun Peng、Xiaohui Zhang、Vimal Manohar、Po-Wei Chou、Kaustubh Kalgaonkar、Anurag Kumar、Yangyang Shi、Zhaoheng Ni、Gael Le Lan 与 Varun Nagaraja 在研究上的有益讨论；"
      },
      {
       "id": "s-references-63-3",
       "original": "Bredin.",
       "zh": "2."
      },
      {
       "id": "s-references-63-4",
       "original": "Powerset multi-class cross entropy loss for neural speaker diarization."
      },
      {
       "id": "s-references-63-5",
       "original": "In Proc."
      },
      {
       "id": "s-references-63-6",
       "original": "INTER- SPEECH 2023, 2023."
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
       "original": "V."
      },
      {
       "id": "s-references-64-2",
       "original": "Pratap, Q."
      },
      {
       "id": "s-references-64-3",
       "original": "Xu, A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-64-4",
       "original": "Sriram, G."
      },
      {
       "id": "s-references-64-5",
       "original": "Synnaeve, and R.",
       "zh": "最后，比较最后两行可以确认：使用不含静音的音频提示能大幅提升在结尾静音往往较长的数据集上的相似度（CV、Accent），同时 WER 总体保持。"
      },
      {
       "id": "s-references-64-6",
       "original": "Collobert."
      },
      {
       "id": "s-references-64-7",
       "original": "Mls: A large-scale multilingual dataset for speech research."
      },
      {
       "id": "s-references-64-8",
       "original": "ArXiv, abs/2012.03411, 2020.",
       "zh": "2."
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
       "original": "O.",
       "zh": "我们发现 Audiobox 显著优于所有基线，达到联合模型的最先进水平，甚至超过 TANGO 等纯音效模型。"
      },
      {
       "id": "s-references-65-2",
       "original": "Press, N."
      },
      {
       "id": "s-references-65-3",
       "original": "A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-65-4",
       "original": "Smith, and M.",
       "zh": "多阶段微调：除我们收集的 500 小时高质量语音字幕外，其余语音字幕都是用属性标签和 LLM 生成的。"
      },
      {
       "id": "s-references-65-5",
       "original": "Lewis."
      },
      {
       "id": "s-references-65-6",
       "original": "Train short, test long: Attention with linear biases enables input length extrapolation."
      },
      {
       "id": "s-references-65-7",
       "original": "ArXiv, abs/2108.12409, 2021.",
       "zh": "1."
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
       "original": "A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-66-2",
       "original": "Radford, J."
      },
      {
       "id": "s-references-66-3",
       "original": "W."
      },
      {
       "id": "s-references-66-4",
       "original": "Kim, C."
      },
      {
       "id": "s-references-66-5",
       "original": "Hallacy, A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-66-6",
       "original": "Ramesh, G."
      },
      {
       "id": "s-references-66-7",
       "original": "Goh, S.",
       "zh": "UniAudio（Yang et al., 2023b）聚焦于构建能执行多种任务的单一模型，包括文生音乐、文生音效、上下文内 TTS 和自然语言风格提示 TTS。"
      },
      {
       "id": "s-references-66-8",
       "original": "Agarwal, G."
      },
      {
       "id": "s-references-66-9",
       "original": "Sastry, A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-66-10",
       "original": "Askell, P.",
       "zh": "1."
      },
      {
       "id": "s-references-66-11",
       "original": "Mishkin, J."
      },
      {
       "id": "s-references-66-12",
       "original": "Clark, G."
      },
      {
       "id": "s-references-66-13",
       "original": "Krueger, and I.",
       "zh": "值得注意的是，FAD 与 KLD 的趋势并不一致，正如 TTA 与 TAI 的比较所示。"
      },
      {
       "id": "s-references-66-14",
       "original": "Sutskever."
      },
      {
       "id": "s-references-66-15",
       "original": "Learning transferable visual models from natural language supervision."
      },
      {
       "id": "s-references-66-16",
       "original": "In International Conference on Machine Learning, 2021.",
       "zh": "1."
      },
      {
       "id": "s-references-66-17",
       "original": "URL https://api.semanticscholar.org/CorpusID:231591445."
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
       "original": "A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-67-2",
       "original": "Radford, J."
      },
      {
       "id": "s-references-67-3",
       "original": "W."
      },
      {
       "id": "s-references-67-4",
       "original": "Kim, T."
      },
      {
       "id": "s-references-67-5",
       "original": "Xu, G."
      },
      {
       "id": "s-references-67-6",
       "original": "Brockman, C."
      },
      {
       "id": "s-references-67-7",
       "original": "McLeavey, and I.",
       "zh": "值得注意的是，FAD 与 KLD 的趋势并不一致，正如 TTA 与 TAI 的比较所示。"
      },
      {
       "id": "s-references-67-8",
       "original": "Sutskever."
      },
      {
       "id": "s-references-67-9",
       "original": "Robust speech recognition via large-scale weak supervision, 2022.",
       "zh": "2."
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
       "original": "C."
      },
      {
       "id": "s-references-68-2",
       "original": "Raffel, N."
      },
      {
       "id": "s-references-68-3",
       "original": "Shazeer, A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-68-4",
       "original": "Roberts, K.",
       "zh": "我们将该数据集称为「Mix-185K」。"
      },
      {
       "id": "s-references-68-5",
       "original": "Lee, S.",
       "zh": "UniAudio（Yang et al., 2023b）聚焦于构建能执行多种任务的单一模型，包括文生音乐、文生音效、上下文内 TTS 和自然语言风格提示 TTS。"
      },
      {
       "id": "s-references-68-6",
       "original": "Narang, M.",
       "zh": "多阶段微调：除我们收集的 500 小时高质量语音字幕外，其余语音字幕都是用属性标签和 LLM 生成的。"
      },
      {
       "id": "s-references-68-7",
       "original": "Matena, Y."
      },
      {
       "id": "s-references-68-8",
       "original": "Zhou, W."
      },
      {
       "id": "s-references-68-9",
       "original": "Li, and P.",
       "zh": "1."
      },
      {
       "id": "s-references-68-10",
       "original": "J."
      },
      {
       "id": "s-references-68-11",
       "original": "Liu."
      },
      {
       "id": "s-references-68-12",
       "original": "Exploring the limits of transfer learning with a unified text-to-text transformer."
      },
      {
       "id": "s-references-68-13",
       "original": "The Journal of Machine Learning Research, 21(1):"
      }
     ]
    },
    {
     "id": "eq-references-7",
     "type": "equation",
     "page": 32,
     "original": "5485–5551, 2020."
    },
    {
     "id": "p-references-69",
     "type": "paragraph",
     "page": 32,
     "sentences": [
      {
       "id": "s-references-69-1",
       "original": "A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-69-2",
       "original": "Ramesh, P.",
       "zh": "1."
      },
      {
       "id": "s-references-69-3",
       "original": "Dhariwal, A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-69-4",
       "original": "Nichol, C."
      },
      {
       "id": "s-references-69-5",
       "original": "Chu, and M.",
       "zh": "多阶段微调：除我们收集的 500 小时高质量语音字幕外，其余语音字幕都是用属性标签和 LLM 生成的。"
      },
      {
       "id": "s-references-69-6",
       "original": "Chen."
      },
      {
       "id": "s-references-69-7",
       "original": "Hierarchical text-conditional image generation with clip latents. arXiv preprint arXiv:2204.06125, 1(2):3, 2022.",
       "zh": "2."
      }
     ]
    },
    {
     "id": "p-references-70",
     "type": "paragraph",
     "page": 33,
     "sentences": [
      {
       "id": "s-references-70-1",
       "original": "Y.",
       "zh": "作者感谢 Ricky Chen、Hady Elsahar、Ilia Kulikov、Hirofumi Inaguma、Jing Xu、Yossi Adi、Alexander H. Liu、Chung-Ming Chien、Qing He、Thilo Koehler、Fuchun Peng、Xiaohui Zhang、Vimal Manohar、Po-Wei Chou、Kaustubh Kalgaonkar、Anurag Kumar、Yangyang Shi、Zhaoheng Ni、Gael Le Lan 与 Varun Nagaraja 在研究上的有益讨论；"
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
       "original": "Qin, S.",
       "zh": "UniAudio（Yang et al., 2023b）聚焦于构建能执行多种任务的单一模型，包括文生音乐、文生音效、上下文内 TTS 和自然语言风格提示 TTS。"
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
       "original": "In International Conference on Learning Representations, 2021.",
       "zh": "1."
      }
     ]
    },
    {
     "id": "p-references-71",
     "type": "paragraph",
     "page": 33,
     "sentences": [
      {
       "id": "s-references-71-1",
       "original": "A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-71-2",
       "original": "Rix, J."
      },
      {
       "id": "s-references-71-3",
       "original": "Beerends, M.",
       "zh": "多阶段微调：除我们收集的 500 小时高质量语音字幕外，其余语音字幕都是用属性标签和 LLM 生成的。"
      },
      {
       "id": "s-references-71-4",
       "original": "Hollier, and A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-71-5",
       "original": "Hekstra."
      },
      {
       "id": "s-references-71-6",
       "original": "Perceptual evaluation of speech quality (pesq)-a new method for speech quality assessment of telephone networks and codecs."
      },
      {
       "id": "s-references-71-7",
       "original": "In 2001 IEEE International Conference on Acoustics, Speech, and Signal Processing."
      },
      {
       "id": "s-references-71-8",
       "original": "Proceedings (Cat. No.01CH37221), volume 2, pages 749–752 vol.2, 2001.",
       "zh": "1."
      }
     ]
    },
    {
     "id": "p-references-72",
     "type": "paragraph",
     "page": 33,
     "sentences": [
      {
       "id": "s-references-72-1",
       "original": "doi: 10.1109/ICASSP.2001.941023.",
       "zh": "1."
      }
     ]
    },
    {
     "id": "p-references-73",
     "type": "paragraph",
     "page": 33,
     "sentences": [
      {
       "id": "s-references-73-1",
       "original": "R.",
       "zh": "最后，比较最后两行可以确认：使用不含静音的音频提示能大幅提升在结尾静音往往较长的数据集上的相似度（CV、Accent），同时 WER 总体保持。"
      },
      {
       "id": "s-references-73-2",
       "original": "Rombach, A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-73-3",
       "original": "Blattmann, D.",
       "zh": "标注界面见附录 D。"
      },
      {
       "id": "s-references-73-4",
       "original": "Lorenz, P.",
       "zh": "1."
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
       "original": "High-resolution image synthesis with latent diffusion models, 2021.",
       "zh": "1."
      }
     ]
    },
    {
     "id": "p-references-74",
     "type": "paragraph",
     "page": 33,
     "sentences": [
      {
       "id": "s-references-74-1",
       "original": "R.",
       "zh": "最后，比较最后两行可以确认：使用不含静音的音频提示能大幅提升在结尾静音往往较长的数据集上的相似度（CV、Accent），同时 WER 总体保持。"
      },
      {
       "id": "s-references-74-2",
       "original": "Rombach, A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-74-3",
       "original": "Blattmann, D.",
       "zh": "标注界面见附录 D。"
      },
      {
       "id": "s-references-74-4",
       "original": "Lorenz, P.",
       "zh": "1."
      },
      {
       "id": "s-references-74-5",
       "original": "Esser, and B."
      },
      {
       "id": "s-references-74-6",
       "original": "Ommer."
      },
      {
       "id": "s-references-74-7",
       "original": "High-resolution image synthesis with latent diffusion models."
      },
      {
       "id": "s-references-74-8",
       "original": "In Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition, 2022.",
       "zh": "2."
      }
     ]
    },
    {
     "id": "p-references-75",
     "type": "paragraph",
     "page": 33,
     "sentences": [
      {
       "id": "s-references-75-1",
       "original": "O.",
       "zh": "我们发现 Audiobox 显著优于所有基线，达到联合模型的最先进水平，甚至超过 TANGO 等纯音效模型。"
      },
      {
       "id": "s-references-75-2",
       "original": "Ronneberger, P.",
       "zh": "1."
      },
      {
       "id": "s-references-75-3",
       "original": "Fischer, and T."
      },
      {
       "id": "s-references-75-4",
       "original": "Brox."
      },
      {
       "id": "s-references-75-5",
       "original": "U-net: Convolutional networks for biomedical image segmentation."
      },
      {
       "id": "s-references-75-6",
       "original": "In Medical Image Computing and Computer-Assisted Intervention–MICCAI 2015: 18th International Conference, Munich, Germany, October 5-9, 2015, Proceedings, Part III 18, pages 234–241.",
       "zh": "1."
      },
      {
       "id": "s-references-75-7",
       "original": "Springer, 2015."
      }
     ]
    },
    {
     "id": "p-references-76",
     "type": "paragraph",
     "page": 33,
     "sentences": [
      {
       "id": "s-references-76-1",
       "original": "T."
      },
      {
       "id": "s-references-76-2",
       "original": "Salimans, I.",
       "zh": "值得注意的是，FAD 与 KLD 的趋势并不一致，正如 TTA 与 TAI 的比较所示。"
      },
      {
       "id": "s-references-76-3",
       "original": "J."
      },
      {
       "id": "s-references-76-4",
       "original": "Goodfellow, W."
      },
      {
       "id": "s-references-76-5",
       "original": "Zaremba, V."
      },
      {
       "id": "s-references-76-6",
       "original": "Cheung, A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-76-7",
       "original": "Radford, and X."
      },
      {
       "id": "s-references-76-8",
       "original": "Chen."
      },
      {
       "id": "s-references-76-9",
       "original": "Improved techniques for training gans."
      },
      {
       "id": "s-references-76-10",
       "original": "ArXiv, abs/1606.03498, 2016."
      },
      {
       "id": "s-references-76-11",
       "original": "URL https://api.semanticscholar.org/CorpusID:1687220."
      }
     ]
    },
    {
     "id": "p-references-77",
     "type": "paragraph",
     "page": 33,
     "sentences": [
      {
       "id": "s-references-77-1",
       "original": "F."
      },
      {
       "id": "s-references-77-2",
       "original": "Schneider, Z."
      },
      {
       "id": "s-references-77-3",
       "original": "Jin, and B."
      },
      {
       "id": "s-references-77-4",
       "original": "Schölkopf."
      },
      {
       "id": "s-references-77-5",
       "original": "Mo\\ˆ usai: Text-to-music generation with long-context latent diffusion. arXiv preprint arXiv:2301.11757, 2023.",
       "zh": "1."
      }
     ]
    },
    {
     "id": "p-references-78",
     "type": "paragraph",
     "page": 33,
     "sentences": [
      {
       "id": "s-references-78-1",
       "original": "Seamless Communication."
      },
      {
       "id": "s-references-78-2",
       "original": "Seamless: Multilingual expressive and streaming speech translation. 2023."
      }
     ]
    },
    {
     "id": "p-references-79",
     "type": "paragraph",
     "page": 33,
     "sentences": [
      {
       "id": "s-references-79-1",
       "original": "N."
      },
      {
       "id": "s-references-79-2",
       "original": "Shaul, J."
      },
      {
       "id": "s-references-79-3",
       "original": "Perez, R.",
       "zh": "最后，比较最后两行可以确认：使用不含静音的音频提示能大幅提升在结尾静音往往较长的数据集上的相似度（CV、Accent），同时 WER 总体保持。"
      },
      {
       "id": "s-references-79-4",
       "original": "T."
      },
      {
       "id": "s-references-79-5",
       "original": "Chen, A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-79-6",
       "original": "Thabet, A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-79-7",
       "original": "Pumarola, and Y."
      },
      {
       "id": "s-references-79-8",
       "original": "Lipman."
      },
      {
       "id": "s-references-79-9",
       "original": "Bespoke solvers for generative flow models."
      }
     ]
    },
    {
     "id": "p-references-80",
     "type": "paragraph",
     "page": 33,
     "sentences": [
      {
       "id": "s-references-80-1",
       "original": "arXiv preprint arXiv:2310.19075, 2023."
      }
     ]
    },
    {
     "id": "p-references-81",
     "type": "paragraph",
     "page": 33,
     "sentences": [
      {
       "id": "s-references-81-1",
       "original": "J."
      },
      {
       "id": "s-references-81-2",
       "original": "Shen, R.",
       "zh": "最后，比较最后两行可以确认：使用不含静音的音频提示能大幅提升在结尾静音往往较长的数据集上的相似度（CV、Accent），同时 WER 总体保持。"
      },
      {
       "id": "s-references-81-3",
       "original": "Pang, R.",
       "zh": "最后，比较最后两行可以确认：使用不含静音的音频提示能大幅提升在结尾静音往往较长的数据集上的相似度（CV、Accent），同时 WER 总体保持。"
      },
      {
       "id": "s-references-81-4",
       "original": "J."
      },
      {
       "id": "s-references-81-5",
       "original": "Weiss, M.",
       "zh": "多阶段微调：除我们收集的 500 小时高质量语音字幕外，其余语音字幕都是用属性标签和 LLM 生成的。"
      },
      {
       "id": "s-references-81-6",
       "original": "Schuster, N."
      },
      {
       "id": "s-references-81-7",
       "original": "Jaitly, Z."
      },
      {
       "id": "s-references-81-8",
       "original": "Yang, Z."
      },
      {
       "id": "s-references-81-9",
       "original": "Chen, Y."
      },
      {
       "id": "s-references-81-10",
       "original": "Zhang, Y."
      },
      {
       "id": "s-references-81-11",
       "original": "Wang, R.",
       "zh": "最后，比较最后两行可以确认：使用不含静音的音频提示能大幅提升在结尾静音往往较长的数据集上的相似度（CV、Accent），同时 WER 总体保持。"
      },
      {
       "id": "s-references-81-12",
       "original": "J."
      },
      {
       "id": "s-references-81-13",
       "original": "Skerry-Ryan, R.",
       "zh": "最后，比较最后两行可以确认：使用不含静音的音频提示能大幅提升在结尾静音往往较长的数据集上的相似度（CV、Accent），同时 WER 总体保持。"
      },
      {
       "id": "s-references-81-14",
       "original": "A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      }
     ]
    },
    {
     "id": "p-references-82",
     "type": "paragraph",
     "page": 33,
     "sentences": [
      {
       "id": "s-references-82-1",
       "original": "Saurous, Y."
      },
      {
       "id": "s-references-82-2",
       "original": "Agiomyrgiannakis, and Y."
      },
      {
       "id": "s-references-82-3",
       "original": "Wu."
      },
      {
       "id": "s-references-82-4",
       "original": "Natural TTS synthesis by conditioning wavenet on mel spectrogram predictions."
      },
      {
       "id": "s-references-82-5",
       "original": "International Conference on Acoustics, Speech and Signal Processing, 2017."
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
       "original": "K.",
       "zh": "我们将该数据集称为「Mix-185K」。"
      },
      {
       "id": "s-references-83-2",
       "original": "Shen, Z."
      },
      {
       "id": "s-references-83-3",
       "original": "Ju, X."
      },
      {
       "id": "s-references-83-4",
       "original": "Tan, Y."
      },
      {
       "id": "s-references-83-5",
       "original": "Liu, Y."
      },
      {
       "id": "s-references-83-6",
       "original": "Leng, L."
      },
      {
       "id": "s-references-83-7",
       "original": "He, T."
      },
      {
       "id": "s-references-83-8",
       "original": "Qin, S.",
       "zh": "UniAudio（Yang et al., 2023b）聚焦于构建能执行多种任务的单一模型，包括文生音乐、文生音效、上下文内 TTS 和自然语言风格提示 TTS。"
      },
      {
       "id": "s-references-83-9",
       "original": "Zhao, and J."
      },
      {
       "id": "s-references-83-10",
       "original": "Bian."
      },
      {
       "id": "s-references-83-11",
       "original": "Naturalspeech 2: Latent diffusion models are natural and zero-shot speech and singing synthesizers. arXiv preprint arXiv:2304.09116, 2023."
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
       "original": "K.",
       "zh": "我们将该数据集称为「Mix-185K」。"
      },
      {
       "id": "s-references-84-2",
       "original": "J."
      },
      {
       "id": "s-references-84-3",
       "original": "Shih, R.",
       "zh": "最后，比较最后两行可以确认：使用不含静音的音频提示能大幅提升在结尾静音往往较长的数据集上的相似度（CV、Accent），同时 WER 总体保持。"
      },
      {
       "id": "s-references-84-4",
       "original": "Valle, R.",
       "zh": "最后，比较最后两行可以确认：使用不含静音的音频提示能大幅提升在结尾静音往往较长的数据集上的相似度（CV、Accent），同时 WER 总体保持。"
      },
      {
       "id": "s-references-84-5",
       "original": "Badlani, A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-84-6",
       "original": "Lancucki, W."
      },
      {
       "id": "s-references-84-7",
       "original": "Ping, and B."
      },
      {
       "id": "s-references-84-8",
       "original": "Catanzaro."
      },
      {
       "id": "s-references-84-9",
       "original": "Rad-tts: Parallel flow-based tts with robust alignment learning and diverse synthesis."
      },
      {
       "id": "s-references-84-10",
       "original": "In ICML Workshop on Invertible Neural Networks, Normalizing Flows, and Explicit Likelihood Models, 2021.",
       "zh": "1."
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
       "original": "H.",
       "zh": "作者感谢 Ricky Chen、Hady Elsahar、Ilia Kulikov、Hirofumi Inaguma、Jing Xu、Yossi Adi、Alexander H. Liu、Chung-Ming Chien、Qing He、Thilo Koehler、Fuchun Peng、Xiaohui Zhang、Vimal Manohar、Po-Wei Chou、Kaustubh Kalgaonkar、Anurag Kumar、Yangyang Shi、Zhaoheng Ni、Gael Le Lan 与 Varun Nagaraja 在研究上的有益讨论；"
      },
      {
       "id": "s-references-85-2",
       "original": "Touvron, L."
      },
      {
       "id": "s-references-85-3",
       "original": "Martin, K.",
       "zh": "我们将该数据集称为「Mix-185K」。"
      },
      {
       "id": "s-references-85-4",
       "original": "Stone, P.",
       "zh": "1."
      },
      {
       "id": "s-references-85-5",
       "original": "Albert, A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-85-6",
       "original": "Almahairi, Y."
      },
      {
       "id": "s-references-85-7",
       "original": "Babaei, N."
      },
      {
       "id": "s-references-85-8",
       "original": "Bashlykov, S.",
       "zh": "UniAudio（Yang et al., 2023b）聚焦于构建能执行多种任务的单一模型，包括文生音乐、文生音效、上下文内 TTS 和自然语言风格提示 TTS。"
      },
      {
       "id": "s-references-85-9",
       "original": "Batra, P.",
       "zh": "1."
      },
      {
       "id": "s-references-85-10",
       "original": "Bhargava, S.",
       "zh": "UniAudio（Yang et al., 2023b）聚焦于构建能执行多种任务的单一模型，包括文生音乐、文生音效、上下文内 TTS 和自然语言风格提示 TTS。"
      },
      {
       "id": "s-references-85-11",
       "original": "Bhosale, D.",
       "zh": "标注界面见附录 D。"
      },
      {
       "id": "s-references-85-12",
       "original": "Bikel, L."
      },
      {
       "id": "s-references-85-13",
       "original": "Blecher, C."
      },
      {
       "id": "s-references-85-14",
       "original": "C."
      },
      {
       "id": "s-references-85-15",
       "original": "Ferrer, M.",
       "zh": "多阶段微调：除我们收集的 500 小时高质量语音字幕外，其余语音字幕都是用属性标签和 LLM 生成的。"
      },
      {
       "id": "s-references-85-16",
       "original": "Chen, G."
      },
      {
       "id": "s-references-85-17",
       "original": "Cucurull, D.",
       "zh": "标注界面见附录 D。"
      },
      {
       "id": "s-references-85-18",
       "original": "Esiobu, J."
      },
      {
       "id": "s-references-85-19",
       "original": "Fernandes, J."
      },
      {
       "id": "s-references-85-20",
       "original": "Fu, W."
      },
      {
       "id": "s-references-85-21",
       "original": "Fu, B."
      },
      {
       "id": "s-references-85-22",
       "original": "Fuller, C."
      },
      {
       "id": "s-references-85-23",
       "original": "Gao, V."
      },
      {
       "id": "s-references-85-24",
       "original": "Goswami, N."
      },
      {
       "id": "s-references-85-25",
       "original": "Goyal, A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-85-26",
       "original": "Hartshorn, S.",
       "zh": "UniAudio（Yang et al., 2023b）聚焦于构建能执行多种任务的单一模型，包括文生音乐、文生音效、上下文内 TTS 和自然语言风格提示 TTS。"
      },
      {
       "id": "s-references-85-27",
       "original": "Hosseini, R.",
       "zh": "最后，比较最后两行可以确认：使用不含静音的音频提示能大幅提升在结尾静音往往较长的数据集上的相似度（CV、Accent），同时 WER 总体保持。"
      },
      {
       "id": "s-references-85-28",
       "original": "Hou, H.",
       "zh": "作者感谢 Ricky Chen、Hady Elsahar、Ilia Kulikov、Hirofumi Inaguma、Jing Xu、Yossi Adi、Alexander H. Liu、Chung-Ming Chien、Qing He、Thilo Koehler、Fuchun Peng、Xiaohui Zhang、Vimal Manohar、Po-Wei Chou、Kaustubh Kalgaonkar、Anurag Kumar、Yangyang Shi、Zhaoheng Ni、Gael Le Lan 与 Varun Nagaraja 在研究上的有益讨论；"
      },
      {
       "id": "s-references-85-29",
       "original": "Inan, M.",
       "zh": "多阶段微调：除我们收集的 500 小时高质量语音字幕外，其余语音字幕都是用属性标签和 LLM 生成的。"
      },
      {
       "id": "s-references-85-30",
       "original": "Kardas, V."
      },
      {
       "id": "s-references-85-31",
       "original": "Kerkez, M.",
       "zh": "多阶段微调：除我们收集的 500 小时高质量语音字幕外，其余语音字幕都是用属性标签和 LLM 生成的。"
      },
      {
       "id": "s-references-85-32",
       "original": "Khabsa, I.",
       "zh": "值得注意的是，FAD 与 KLD 的趋势并不一致，正如 TTA 与 TAI 的比较所示。"
      },
      {
       "id": "s-references-85-33",
       "original": "Kloumann, A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-85-34",
       "original": "Korenev, P.",
       "zh": "1."
      },
      {
       "id": "s-references-85-35",
       "original": "S.",
       "zh": "UniAudio（Yang et al., 2023b）聚焦于构建能执行多种任务的单一模型，包括文生音乐、文生音效、上下文内 TTS 和自然语言风格提示 TTS。"
      },
      {
       "id": "s-references-85-36",
       "original": "Koura, M.-A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-85-37",
       "original": "Lachaux, T."
      },
      {
       "id": "s-references-85-38",
       "original": "Lavril, J."
      },
      {
       "id": "s-references-85-39",
       "original": "Lee, D.",
       "zh": "标注界面见附录 D。"
      },
      {
       "id": "s-references-85-40",
       "original": "Liskovich, Y."
      },
      {
       "id": "s-references-85-41",
       "original": "Lu, Y."
      },
      {
       "id": "s-references-85-42",
       "original": "Mao, X."
      },
      {
       "id": "s-references-85-43",
       "original": "Martinet, T."
      },
      {
       "id": "s-references-85-44",
       "original": "Mihaylov, P.",
       "zh": "1."
      },
      {
       "id": "s-references-85-45",
       "original": "Mishra, I.",
       "zh": "值得注意的是，FAD 与 KLD 的趋势并不一致，正如 TTA 与 TAI 的比较所示。"
      },
      {
       "id": "s-references-85-46",
       "original": "Molybog, Y."
      },
      {
       "id": "s-references-85-47",
       "original": "Nie, A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-85-48",
       "original": "Poulton, J."
      },
      {
       "id": "s-references-85-49",
       "original": "Reizenstein, R.",
       "zh": "最后，比较最后两行可以确认：使用不含静音的音频提示能大幅提升在结尾静音往往较长的数据集上的相似度（CV、Accent），同时 WER 总体保持。"
      },
      {
       "id": "s-references-85-50",
       "original": "Rungta, K.",
       "zh": "我们将该数据集称为「Mix-185K」。"
      },
      {
       "id": "s-references-85-51",
       "original": "Saladi, A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-85-52",
       "original": "Schelten, R.",
       "zh": "最后，比较最后两行可以确认：使用不含静音的音频提示能大幅提升在结尾静音往往较长的数据集上的相似度（CV、Accent），同时 WER 总体保持。"
      },
      {
       "id": "s-references-85-53",
       "original": "Silva, E.",
       "zh": "为提升极低 NFE 区间（即 4）下的推理速度，我们采用 Bespoke Solvers Shaul et al. (2023)，以低得多的 NFE 恢复与原模型相近的样本质量。"
      },
      {
       "id": "s-references-85-54",
       "original": "M.",
       "zh": "多阶段微调：除我们收集的 500 小时高质量语音字幕外，其余语音字幕都是用属性标签和 LLM 生成的。"
      },
      {
       "id": "s-references-85-55",
       "original": "Smith, R.",
       "zh": "最后，比较最后两行可以确认：使用不含静音的音频提示能大幅提升在结尾静音往往较长的数据集上的相似度（CV、Accent），同时 WER 总体保持。"
      },
      {
       "id": "s-references-85-56",
       "original": "Subramanian, X."
      },
      {
       "id": "s-references-85-57",
       "original": "E.",
       "zh": "为提升极低 NFE 区间（即 4）下的推理速度，我们采用 Bespoke Solvers Shaul et al. (2023)，以低得多的 NFE 恢复与原模型相近的样本质量。"
      },
      {
       "id": "s-references-85-58",
       "original": "Tan, B."
      },
      {
       "id": "s-references-85-59",
       "original": "Tang, R.",
       "zh": "最后，比较最后两行可以确认：使用不含静音的音频提示能大幅提升在结尾静音往往较长的数据集上的相似度（CV、Accent），同时 WER 总体保持。"
      },
      {
       "id": "s-references-85-60",
       "original": "Taylor, A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-85-61",
       "original": "Williams, J."
      },
      {
       "id": "s-references-85-62",
       "original": "X."
      },
      {
       "id": "s-references-85-63",
       "original": "Kuan, P.",
       "zh": "1."
      },
      {
       "id": "s-references-85-64",
       "original": "Xu, Z."
      },
      {
       "id": "s-references-85-65",
       "original": "Yan, I.",
       "zh": "值得注意的是，FAD 与 KLD 的趋势并不一致，正如 TTA 与 TAI 的比较所示。"
      },
      {
       "id": "s-references-85-66",
       "original": "Zarov, Y."
      },
      {
       "id": "s-references-85-67",
       "original": "Zhang, A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-85-68",
       "original": "Fan, M.",
       "zh": "多阶段微调：除我们收集的 500 小时高质量语音字幕外，其余语音字幕都是用属性标签和 LLM 生成的。"
      },
      {
       "id": "s-references-85-69",
       "original": "Kambadur, S.",
       "zh": "UniAudio（Yang et al., 2023b）聚焦于构建能执行多种任务的单一模型，包括文生音乐、文生音效、上下文内 TTS 和自然语言风格提示 TTS。"
      },
      {
       "id": "s-references-85-70",
       "original": "Narang, A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-85-71",
       "original": "Rodriguez, R.",
       "zh": "最后，比较最后两行可以确认：使用不含静音的音频提示能大幅提升在结尾静音往往较长的数据集上的相似度（CV、Accent），同时 WER 总体保持。"
      },
      {
       "id": "s-references-85-72",
       "original": "Stojnic, S.",
       "zh": "UniAudio（Yang et al., 2023b）聚焦于构建能执行多种任务的单一模型，包括文生音乐、文生音效、上下文内 TTS 和自然语言风格提示 TTS。"
      },
      {
       "id": "s-references-85-73",
       "original": "Edunov, and T."
      },
      {
       "id": "s-references-85-74",
       "original": "Scialom."
      },
      {
       "id": "s-references-85-75",
       "original": "Llama 2: Open foundation and fine-tuned chat models, 2023."
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
       "original": "A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-86-2",
       "original": "Vaswani, N."
      },
      {
       "id": "s-references-86-3",
       "original": "M.",
       "zh": "多阶段微调：除我们收集的 500 小时高质量语音字幕外，其余语音字幕都是用属性标签和 LLM 生成的。"
      },
      {
       "id": "s-references-86-4",
       "original": "Shazeer, N."
      },
      {
       "id": "s-references-86-5",
       "original": "Parmar, J."
      },
      {
       "id": "s-references-86-6",
       "original": "Uszkoreit, L."
      },
      {
       "id": "s-references-86-7",
       "original": "Jones, A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-86-8",
       "original": "N."
      },
      {
       "id": "s-references-86-9",
       "original": "Gomez, L."
      },
      {
       "id": "s-references-86-10",
       "original": "Kaiser, and I.",
       "zh": "值得注意的是，FAD 与 KLD 的趋势并不一致，正如 TTA 与 TAI 的比较所示。"
      },
      {
       "id": "s-references-86-11",
       "original": "Polosukhin."
      },
      {
       "id": "s-references-86-12",
       "original": "Attention is all you need."
      },
      {
       "id": "s-references-86-13",
       "original": "ArXiv, abs/1706.03762, 2017."
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
       "original": "C."
      },
      {
       "id": "s-references-87-2",
       "original": "Wang, S.",
       "zh": "UniAudio（Yang et al., 2023b）聚焦于构建能执行多种任务的单一模型，包括文生音乐、文生音效、上下文内 TTS 和自然语言风格提示 TTS。"
      },
      {
       "id": "s-references-87-3",
       "original": "Chen, Y."
      },
      {
       "id": "s-references-87-4",
       "original": "Wu, Z.-H.",
       "zh": "作者感谢 Ricky Chen、Hady Elsahar、Ilia Kulikov、Hirofumi Inaguma、Jing Xu、Yossi Adi、Alexander H. Liu、Chung-Ming Chien、Qing He、Thilo Koehler、Fuchun Peng、Xiaohui Zhang、Vimal Manohar、Po-Wei Chou、Kaustubh Kalgaonkar、Anurag Kumar、Yangyang Shi、Zhaoheng Ni、Gael Le Lan 与 Varun Nagaraja 在研究上的有益讨论；"
      },
      {
       "id": "s-references-87-5",
       "original": "Zhang, L."
      },
      {
       "id": "s-references-87-6",
       "original": "Zhou, S.",
       "zh": "UniAudio（Yang et al., 2023b）聚焦于构建能执行多种任务的单一模型，包括文生音乐、文生音效、上下文内 TTS 和自然语言风格提示 TTS。"
      },
      {
       "id": "s-references-87-7",
       "original": "Liu, Z."
      },
      {
       "id": "s-references-87-8",
       "original": "Chen, Y."
      },
      {
       "id": "s-references-87-9",
       "original": "Liu, H.",
       "zh": "作者感谢 Ricky Chen、Hady Elsahar、Ilia Kulikov、Hirofumi Inaguma、Jing Xu、Yossi Adi、Alexander H. Liu、Chung-Ming Chien、Qing He、Thilo Koehler、Fuchun Peng、Xiaohui Zhang、Vimal Manohar、Po-Wei Chou、Kaustubh Kalgaonkar、Anurag Kumar、Yangyang Shi、Zhaoheng Ni、Gael Le Lan 与 Varun Nagaraja 在研究上的有益讨论；"
      },
      {
       "id": "s-references-87-10",
       "original": "Wang, J."
      },
      {
       "id": "s-references-87-11",
       "original": "Li, L."
      },
      {
       "id": "s-references-87-12",
       "original": "He, S.",
       "zh": "UniAudio（Yang et al., 2023b）聚焦于构建能执行多种任务的单一模型，包括文生音乐、文生音效、上下文内 TTS 和自然语言风格提示 TTS。"
      },
      {
       "id": "s-references-87-13",
       "original": "Zhao, and F."
      },
      {
       "id": "s-references-87-14",
       "original": "Wei."
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
       "original": "Neural codec language models are zero-shot text to speech synthesizers."
      },
      {
       "id": "s-references-88-2",
       "original": "ArXiv, abs/2301.02111, 2023a.",
       "zh": "1."
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
       "original": "Y.",
       "zh": "作者感谢 Ricky Chen、Hady Elsahar、Ilia Kulikov、Hirofumi Inaguma、Jing Xu、Yossi Adi、Alexander H. Liu、Chung-Ming Chien、Qing He、Thilo Koehler、Fuchun Peng、Xiaohui Zhang、Vimal Manohar、Po-Wei Chou、Kaustubh Kalgaonkar、Anurag Kumar、Yangyang Shi、Zhaoheng Ni、Gael Le Lan 与 Varun Nagaraja 在研究上的有益讨论；"
      },
      {
       "id": "s-references-89-2",
       "original": "Wang, Z."
      },
      {
       "id": "s-references-89-3",
       "original": "Ju, X."
      },
      {
       "id": "s-references-89-4",
       "original": "Tan, L."
      },
      {
       "id": "s-references-89-5",
       "original": "He, Z."
      },
      {
       "id": "s-references-89-6",
       "original": "Wu, J."
      },
      {
       "id": "s-references-89-7",
       "original": "Bian, and S.",
       "zh": "UniAudio（Yang et al., 2023b）聚焦于构建能执行多种任务的单一模型，包括文生音乐、文生音效、上下文内 TTS 和自然语言风格提示 TTS。"
      },
      {
       "id": "s-references-89-8",
       "original": "Zhao."
      },
      {
       "id": "s-references-89-9",
       "original": "Audit: Audio editing by following instructions with latent diffusion models. arXiv preprint arXiv:2304.00830, 2023b."
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
       "original": "Y.",
       "zh": "作者感谢 Ricky Chen、Hady Elsahar、Ilia Kulikov、Hirofumi Inaguma、Jing Xu、Yossi Adi、Alexander H. Liu、Chung-Ming Chien、Qing He、Thilo Koehler、Fuchun Peng、Xiaohui Zhang、Vimal Manohar、Po-Wei Chou、Kaustubh Kalgaonkar、Anurag Kumar、Yangyang Shi、Zhaoheng Ni、Gael Le Lan 与 Varun Nagaraja 在研究上的有益讨论；"
      },
      {
       "id": "s-references-90-2",
       "original": "Wu, K.",
       "zh": "我们将该数据集称为「Mix-185K」。"
      },
      {
       "id": "s-references-90-3",
       "original": "Chen, T."
      },
      {
       "id": "s-references-90-4",
       "original": "Zhang, Y."
      },
      {
       "id": "s-references-90-5",
       "original": "Hui, T."
      },
      {
       "id": "s-references-90-6",
       "original": "Berg-Kirkpatrick, and S.",
       "zh": "UniAudio（Yang et al., 2023b）聚焦于构建能执行多种任务的单一模型，包括文生音乐、文生音效、上下文内 TTS 和自然语言风格提示 TTS。"
      },
      {
       "id": "s-references-90-7",
       "original": "Dubnov."
      },
      {
       "id": "s-references-90-8",
       "original": "Large-scale contrastive language-audio pretraining with feature fusion and keyword-to-caption augmentation."
      },
      {
       "id": "s-references-90-9",
       "original": "In ICASSP 2023-2023 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP), pages 1–5."
      },
      {
       "id": "s-references-90-10",
       "original": "IEEE, 2023."
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
       "original": "J."
      },
      {
       "id": "s-references-91-2",
       "original": "Yamagishi, C."
      },
      {
       "id": "s-references-91-3",
       "original": "Veaux, and K.",
       "zh": "我们将该数据集称为「Mix-185K」。"
      },
      {
       "id": "s-references-91-4",
       "original": "MacDonald."
      },
      {
       "id": "s-references-91-5",
       "original": "Cstr vctk corpus: English multi-speaker corpus for cstr voice cloning toolkit (version 0.92). 2019."
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
       "original": "D.",
       "zh": "标注界面见附录 D。"
      },
      {
       "id": "s-references-92-2",
       "original": "Yang, S.",
       "zh": "UniAudio（Yang et al., 2023b）聚焦于构建能执行多种任务的单一模型，包括文生音乐、文生音效、上下文内 TTS 和自然语言风格提示 TTS。"
      },
      {
       "id": "s-references-92-3",
       "original": "Liu, R.",
       "zh": "最后，比较最后两行可以确认：使用不含静音的音频提示能大幅提升在结尾静音往往较长的数据集上的相似度（CV、Accent），同时 WER 总体保持。"
      },
      {
       "id": "s-references-92-4",
       "original": "Huang, G."
      },
      {
       "id": "s-references-92-5",
       "original": "Lei, C."
      },
      {
       "id": "s-references-92-6",
       "original": "Weng, H.",
       "zh": "作者感谢 Ricky Chen、Hady Elsahar、Ilia Kulikov、Hirofumi Inaguma、Jing Xu、Yossi Adi、Alexander H. Liu、Chung-Ming Chien、Qing He、Thilo Koehler、Fuchun Peng、Xiaohui Zhang、Vimal Manohar、Po-Wei Chou、Kaustubh Kalgaonkar、Anurag Kumar、Yangyang Shi、Zhaoheng Ni、Gael Le Lan 与 Varun Nagaraja 在研究上的有益讨论；"
      },
      {
       "id": "s-references-92-7",
       "original": "Meng, and D.",
       "zh": "标注界面见附录 D。"
      },
      {
       "id": "s-references-92-8",
       "original": "Yu."
      },
      {
       "id": "s-references-92-9",
       "original": "InstructTTS: Modelling expressive tts in discrete latent space with natural language style prompt. arXiv preprint arXiv:2301.13662, 2023a.",
       "zh": "1."
      }
     ]
    },
    {
     "id": "p-references-93",
     "type": "paragraph",
     "page": 34,
     "sentences": [
      {
       "id": "s-references-93-1",
       "original": "D.",
       "zh": "标注界面见附录 D。"
      },
      {
       "id": "s-references-93-2",
       "original": "Yang, J."
      },
      {
       "id": "s-references-93-3",
       "original": "Tian, X."
      },
      {
       "id": "s-references-93-4",
       "original": "Tan, R.",
       "zh": "最后，比较最后两行可以确认：使用不含静音的音频提示能大幅提升在结尾静音往往较长的数据集上的相似度（CV、Accent），同时 WER 总体保持。"
      },
      {
       "id": "s-references-93-5",
       "original": "Huang, S.",
       "zh": "UniAudio（Yang et al., 2023b）聚焦于构建能执行多种任务的单一模型，包括文生音乐、文生音效、上下文内 TTS 和自然语言风格提示 TTS。"
      },
      {
       "id": "s-references-93-6",
       "original": "Liu, X."
      },
      {
       "id": "s-references-93-7",
       "original": "Chang, J."
      },
      {
       "id": "s-references-93-8",
       "original": "Shi, S.",
       "zh": "UniAudio（Yang et al., 2023b）聚焦于构建能执行多种任务的单一模型，包括文生音乐、文生音效、上下文内 TTS 和自然语言风格提示 TTS。"
      },
      {
       "id": "s-references-93-9",
       "original": "Zhao, J."
      },
      {
       "id": "s-references-93-10",
       "original": "Bian, X."
      },
      {
       "id": "s-references-93-11",
       "original": "Wu, et al. Uniaudio: An audio foundation model toward universal audio generation. arXiv preprint arXiv:2310.00704, 2023b."
      }
     ]
    },
    {
     "id": "p-references-94",
     "type": "paragraph",
     "page": 34,
     "sentences": [
      {
       "id": "s-references-94-1",
       "original": "D.",
       "zh": "标注界面见附录 D。"
      },
      {
       "id": "s-references-94-2",
       "original": "Yang, J."
      },
      {
       "id": "s-references-94-3",
       "original": "Yu, H.",
       "zh": "作者感谢 Ricky Chen、Hady Elsahar、Ilia Kulikov、Hirofumi Inaguma、Jing Xu、Yossi Adi、Alexander H. Liu、Chung-Ming Chien、Qing He、Thilo Koehler、Fuchun Peng、Xiaohui Zhang、Vimal Manohar、Po-Wei Chou、Kaustubh Kalgaonkar、Anurag Kumar、Yangyang Shi、Zhaoheng Ni、Gael Le Lan 与 Varun Nagaraja 在研究上的有益讨论；"
      },
      {
       "id": "s-references-94-4",
       "original": "Wang, W."
      },
      {
       "id": "s-references-94-5",
       "original": "Wang, C."
      },
      {
       "id": "s-references-94-6",
       "original": "Weng, Y."
      },
      {
       "id": "s-references-94-7",
       "original": "Zou, and D.",
       "zh": "标注界面见附录 D。"
      },
      {
       "id": "s-references-94-8",
       "original": "Yu."
      },
      {
       "id": "s-references-94-9",
       "original": "Diffsound: Discrete diffusion model for text-to-sound generation."
      },
      {
       "id": "s-references-94-10",
       "original": "IEEE/ACM Transactions on Audio, Speech, and Language Processing, 2023c."
      }
     ]
    },
    {
     "id": "p-references-95",
     "type": "paragraph",
     "page": 34,
     "sentences": [
      {
       "id": "s-references-95-1",
       "original": "N."
      },
      {
       "id": "s-references-95-2",
       "original": "Zeghidour, A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-95-3",
       "original": "Luebs, A.",
       "zh": "我们首先比较前两行：两者的预训练数据不同，都用 LoRA 微调。"
      },
      {
       "id": "s-references-95-4",
       "original": "Omran, J."
      },
      {
       "id": "s-references-95-5",
       "original": "Skoglund, and M.",
       "zh": "多阶段微调：除我们收集的 500 小时高质量语音字幕外，其余语音字幕都是用属性标签和 LLM 生成的。"
      },
      {
       "id": "s-references-95-6",
       "original": "Tagliasacchi."
      },
      {
       "id": "s-references-95-7",
       "original": "Soundstream: An end-to-end neural audio codec."
      },
      {
       "id": "s-references-95-8",
       "original": "IEEE/ACM Transactions on Audio, Speech, and Language Processing, 30:495–507, 2022.",
       "zh": "2."
      }
     ]
    },
    {
     "id": "p-references-96",
     "type": "paragraph",
     "page": 34,
     "sentences": [
      {
       "id": "s-references-96-1",
       "original": "H.",
       "zh": "作者感谢 Ricky Chen、Hady Elsahar、Ilia Kulikov、Hirofumi Inaguma、Jing Xu、Yossi Adi、Alexander H. Liu、Chung-Ming Chien、Qing He、Thilo Koehler、Fuchun Peng、Xiaohui Zhang、Vimal Manohar、Po-Wei Chou、Kaustubh Kalgaonkar、Anurag Kumar、Yangyang Shi、Zhaoheng Ni、Gael Le Lan 与 Varun Nagaraja 在研究上的有益讨论；"
      },
      {
       "id": "s-references-96-2",
       "original": "Zen, V."
      },
      {
       "id": "s-references-96-3",
       "original": "Dang, R.",
       "zh": "最后，比较最后两行可以确认：使用不含静音的音频提示能大幅提升在结尾静音往往较长的数据集上的相似度（CV、Accent），同时 WER 总体保持。"
      },
      {
       "id": "s-references-96-4",
       "original": "Clark, Y."
      },
      {
       "id": "s-references-96-5",
       "original": "Zhang, R.",
       "zh": "最后，比较最后两行可以确认：使用不含静音的音频提示能大幅提升在结尾静音往往较长的数据集上的相似度（CV、Accent），同时 WER 总体保持。"
      },
      {
       "id": "s-references-96-6",
       "original": "J."
      },
      {
       "id": "s-references-96-7",
       "original": "Weiss, Y."
      },
      {
       "id": "s-references-96-8",
       "original": "Jia, Z."
      },
      {
       "id": "s-references-96-9",
       "original": "Chen, and Y."
      },
      {
       "id": "s-references-96-10",
       "original": "Wu."
      },
      {
       "id": "s-references-96-11",
       "original": "Libritts: A corpus derived from librispeech for text-to-speech. arXiv preprint arXiv:1904.02882, 2019."
      }
     ]
    },
    {
     "id": "p-references-97",
     "type": "paragraph",
     "page": 34,
     "sentences": [
      {
       "id": "s-references-97-1",
       "original": "Z.",
       "zh": "作者感谢 Ricky Chen、Hady Elsahar、Ilia Kulikov、Hirofumi Inaguma、Jing Xu、Yossi Adi、Alexander H. Liu、Chung-Ming Chien、Qing He、Thilo Koehler、Fuchun Peng、Xiaohui Zhang、Vimal Manohar、Po-Wei Chou、Kaustubh Kalgaonkar、Anurag Kumar、Yangyang Shi、Zhaoheng Ni、Gael Le Lan 与 Varun Nagaraja 在研究上的有益讨论；"
      },
      {
       "id": "s-references-97-2",
       "original": "Zhang, L."
      },
      {
       "id": "s-references-97-3",
       "original": "Zhou, C."
      },
      {
       "id": "s-references-97-4",
       "original": "Wang, S.",
       "zh": "UniAudio（Yang et al., 2023b）聚焦于构建能执行多种任务的单一模型，包括文生音乐、文生音效、上下文内 TTS 和自然语言风格提示 TTS。"
      },
      {
       "id": "s-references-97-5",
       "original": "Chen, Y."
      },
      {
       "id": "s-references-97-6",
       "original": "Wu, S.",
       "zh": "UniAudio（Yang et al., 2023b）聚焦于构建能执行多种任务的单一模型，包括文生音乐、文生音效、上下文内 TTS 和自然语言风格提示 TTS。"
      },
      {
       "id": "s-references-97-7",
       "original": "Liu, Z."
      },
      {
       "id": "s-references-97-8",
       "original": "Chen, Y."
      },
      {
       "id": "s-references-97-9",
       "original": "Liu, H.",
       "zh": "作者感谢 Ricky Chen、Hady Elsahar、Ilia Kulikov、Hirofumi Inaguma、Jing Xu、Yossi Adi、Alexander H. Liu、Chung-Ming Chien、Qing He、Thilo Koehler、Fuchun Peng、Xiaohui Zhang、Vimal Manohar、Po-Wei Chou、Kaustubh Kalgaonkar、Anurag Kumar、Yangyang Shi、Zhaoheng Ni、Gael Le Lan 与 Varun Nagaraja 在研究上的有益讨论；"
      },
      {
       "id": "s-references-97-10",
       "original": "Wang, J."
      },
      {
       "id": "s-references-97-11",
       "original": "Li, et al. Speak foreign languages with your own voice: Cross-lingual neural codec language modeling. arXiv preprint arXiv:2303.03926, 2023."
      }
     ]
    }
   ]
  },
  {
   "id": "sec-A",
   "num": "A",
   "level": 1,
   "page": 35,
   "title": {
    "original": "Speech Attributes for Speech Caption Creation",
    "zh": "用于语音字幕构建的语音属性"
   },
   "blocks": [
    {
     "id": "p-A-1",
     "type": "paragraph",
     "page": 35,
     "sentences": [
      {
       "id": "s-A-1-1",
       "original": "As described in Section 7.1.1, we extract attributes for creating speech captions.",
       "zh": "如第 7.1.1 节所述，我们提取属性用于构建语音字幕。"
      },
      {
       "id": "s-A-1-2",
       "original": "We obtain speech attributes from the associated metadata or by pseudo-labeling for a subset of attributes which can be labeled more reliably.",
       "zh": "我们从相关元数据中获取语音属性，或对能更可靠标注的属性子集做伪标注。"
      },
      {
       "id": "s-A-1-3",
       "original": "Details for each attribute are listed below • Age: We first bin the age into 4 different categories namely less than twenty (<20), young adults (20-35), middle age (40-60), and elders (>60).",
       "zh": "各属性的细节如下 • 年龄：我们首先把年龄分为 4 个不同类别：二十岁以下（<20）、青年（20-35）、中年（40-60）和老年（>60）。"
      },
      {
       "id": "s-A-1-4",
       "original": "We then fine-tune our dataset from pre-trained WavLM-base checkpoint with 3200 hours speeech and age metadata from our training set (consisted of conversational and reading speech with various quality).",
       "zh": "然后我们在预训练 WavLM-base 检查点之上，用训练集中的 3200 小时语音及年龄元数据微调（包含各种质量的对话与朗读语音）。"
      }
     ]
    },
    {
     "id": "p-A-2",
     "type": "paragraph",
     "page": 35,
     "sentences": [
      {
       "id": "s-A-2-1",
       "original": "• Gender: We fine-tune on top of WavLM-base checkpoint with 4300 hours speech and gender metadata from our training set (consisted of conversational and reading speech with various quality).",
       "zh": "• 性别：我们在 WavLM-base 检查点之上，用训练集中的 4300 小时语音及性别元数据微调（包含各种质量的对话与朗读语音）。"
      }
     ]
    },
    {
     "id": "p-A-3",
     "type": "paragraph",
     "page": 35,
     "sentences": [
      {
       "id": "s-A-3-1",
       "original": "• Audio Quality: We use TorchAudio-Squim Kumar et al. (2023) library and extract Perceptual Evaluation of Speech Quality (PESQ) Rix et al. (2001) score.",
       "zh": "• 音频质量：我们使用 TorchAudio-Squim Kumar et al. (2023) 库，提取语音质量感知评估（PESQ）Rix et al. (2001) 分数。"
      },
      {
       "id": "s-A-3-2",
       "original": "We then bin the score into three categories: Low quality ( 0-2.39 ), Normal quality ( 2.39-3.8 ) and Studio Quality ( >3.8 ).",
       "zh": "然后把分数分为三类：低质量（0-2.39）、正常质量（2.39-3.8）与录音棚质量（>3.8）。"
      }
     ]
    },
    {
     "id": "p-A-4",
     "type": "paragraph",
     "page": 35,
     "sentences": [
      {
       "id": "s-A-4-1",
       "original": "• Pitch: We use PyWorld vocoder 6 to extract fundamental frequency (f0) and then calculate the geometric mean across all voiced region.",
       "zh": "• 音调：我们使用 PyWorld 声码器 6 提取基频（f0），然后计算所有浊音区域的几何均值。"
      },
      {
       "id": "s-A-4-2",
       "original": "We use gender dependent threshold for binning the pitch into three different categories: low, normal, high.",
       "zh": "我们使用与性别相关的阈值，把音调分为三类：低、正常、高。"
      },
      {
       "id": "s-A-4-3",
       "original": "For gender masculine, we set low pitch (0-40 percentile), normal pitch (40-90 percentile) and high pitch (>90 percentile).",
       "zh": "对男性嗓音，我们设低音调（0-40 百分位）、正常音调（40-90 百分位）与高音调（>90 百分位）。"
      },
      {
       "id": "s-A-4-4",
       "original": "For gender feminine, we set low pitch (percentile 0-10), normal pitch (10-60 percentile) and high pitch (>60 percentile).",
       "zh": "对女性嗓音，我们设低音调（0-10 百分位）、正常音调（10-60 百分位）与高音调（>60 百分位）。"
      },
      {
       "id": "s-A-4-5",
       "original": "The logic behind asymmetric threshold is because in general people will perceive most of masculine voice have lower pitch and most of feminine voice have higher pitch.",
       "zh": "采用非对称阈值的逻辑在于：一般而言，人们会感知到大多数男性嗓音音调较低、大多数女性嗓音音调较高。"
      }
     ]
    },
    {
     "id": "p-A-5",
     "type": "paragraph",
     "page": 35,
     "sentences": [
      {
       "id": "s-A-5-1",
       "original": "• Speaking rate: Given the transcript and audio, we first apply VAD to remove the silence segments.",
       "zh": "• 语速：给定转写与音频，我们首先施加 VAD 去除静音段。"
      },
      {
       "id": "s-A-5-2",
       "original": "We then calculate character per seconds (CPS) and bin them into 3 categories: slow (<9.2 CPS), high (>20.8 CPS) and normal (9.2 <= x <= 20.8 CPS).",
       "zh": "然后计算每秒字符数（CPS），并分为 3 类：慢（<9.2 CPS）、快（>20.8 CPS）与正常（9.2 <= x <= 20.8 CPS）。"
      }
     ]
    },
    {
     "id": "p-A-6",
     "type": "paragraph",
     "page": 35,
     "sentences": [
      {
       "id": "s-A-6-1",
       "original": "• Accent: We use the accent from the metadata whenever available in the metadata, otherwise leave it blank.",
       "zh": "• 口音：只要元数据中带有口音，我们就使用元数据中的口音，否则留空。"
      }
     ]
    },
    {
     "id": "p-A-7",
     "type": "paragraph",
     "page": 35,
     "sentences": [
      {
       "id": "s-A-7-1",
       "original": "• Emotion: We use the emotion labels whenever available in the metadata, otherwise we leave it as blank.",
       "zh": "• 情感：只要元数据中带有情感标签，我们就使用它们，否则留空。"
      }
     ]
    },
    {
     "id": "p-A-8",
     "type": "paragraph",
     "page": 35,
     "sentences": [
      {
       "id": "s-A-8-1",
       "original": "• Environment: We use the environment tags such as inside a room, outside whenever available from the datasets.",
       "zh": "• 环境：只要数据集中带有环境标签（如在室内、在室外），我们就使用它们。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-B",
   "num": "B",
   "level": 1,
   "page": 35,
   "title": {
    "original": "Automatic Captions: Quality",
    "zh": "自动字幕：质量"
   },
   "blocks": [
    {
     "id": "p-B-1",
     "type": "paragraph",
     "page": 35,
     "sentences": [
      {
       "id": "s-B-1-1",
       "original": "To ensure we get high quality descriptions, we deploy a two-stage approach to filter the annotator candidate.",
       "zh": "为确保获得高质量描述，我们采用两阶段方法筛选标注者候选人。"
      },
      {
       "id": "s-B-1-2",
       "original": "First, we keep only annotators that successfully labeled pre-selected gold samples with high accuracy (> 73%).",
       "zh": "首先，只保留能以高准确率（> 73%）标注预选金标样本的标注者。"
      },
      {
       "id": "s-B-1-3",
       "original": "Later, we score their submitted captions using LLM and keep the annotator if their averaged score is above certain threshold.",
       "zh": "随后，我们用 LLM 对他们提交的字幕打分，平均分高于某一阈值者予以保留。"
      },
      {
       "id": "s-B-1-4",
       "original": "More specifically, for a speech segment, we first use a LLM to generate a caption based on annotated audio attributes.",
       "zh": "更具体地说，对一段语音，我们首先用一个 LLM 基于标注的音频属性生成字幕。"
      },
      {
       "id": "s-B-1-5",
       "original": "We then run a second stage where we ask the another LLM to compare the LLM-generated caption with human-written caption and rate the quality of human-written captions from 1 to 5.",
       "zh": "然后进行第二阶段：让另一个 LLM 比较 LLM 生成的字幕与人工书写的字幕，并从 1 到 5 给人工字幕的质量打分。"
      },
      {
       "id": "s-B-1-6",
       "original": "We prompt this LLM to give low score to human-written captions where no interesting audio events were added in additional to the annotated audio attributes or some important audio attributes are missing.",
       "zh": "我们提示该 LLM：如果人工字幕在标注属性之外没有补充有趣的音频事件，或遗漏了某些重要音频属性，就打低分。"
      },
      {
       "id": "s-B-1-7",
       "original": "Annotators with an averaged caption score less than 3 were removed.",
       "zh": "平均字幕得分低于 3 的标注者被移除。"
      },
      {
       "id": "s-B-1-8",
       "original": "This resulted in high quality and detailed captions that complement our pseudo-labeled captions above.",
       "zh": "由此得到高质量、细节丰富的字幕，与上述伪标注字幕形成互补。"
      },
      {
       "id": "s-B-1-9",
       "original": "Here are some captions example curated by our human annotator:",
       "zh": "以下是我们的人工标注者整理出的一些字幕示例："
      }
     ]
    }
   ]
  },
  {
   "id": "sec-C",
   "num": "C",
   "level": 1,
   "page": 35,
   "title": {
    "original": "Unified Audiobox Task Description",
    "zh": "统一 Audiobox 任务描述"
   },
   "blocks": [
    {
     "id": "p-C-1",
     "type": "paragraph",
     "page": 35,
     "sentences": [
      {
       "id": "s-C-1-1",
       "original": "Below we describe different tasks that unified Audiobox model can solve along with the inputs required.",
       "zh": "下面描述统一 Audiobox 模型可以解决的不同任务及其所需输入。"
      }
     ]
    },
    {
     "id": "p-C-2",
     "type": "paragraph",
     "page": 35,
     "sentences": [
      {
       "id": "s-C-2-1",
       "original": "6https://github.com/JeremyCCHsu/Python-Wrapper-for-World-Vocoder • Zero-shot TTS (in-context TTS): model takes as input a transcript and an audio example and generates speech that resembles the example’s audio style (described in Section 5.2).",
       "zh": "6https://github.com/JeremyCCHsu/Python-Wrapper-for-World-Vocoder • 零样本 TTS（上下文 TTS）：模型输入转写与音频示例，生成风格与示例音频相似的语音（见第 5.2 节）。"
      },
      {
       "id": "s-C-2-2",
       "original": "Inputs: (context, transcript).",
       "zh": "输入：（上下文、转写）。"
      }
     ]
    },
    {
     "id": "p-C-3",
     "type": "paragraph",
     "page": 36,
     "sentences": [
      {
       "id": "s-C-3-1",
       "original": "• Description-TTS/TTA: model takes as input a transcript/pseudo-transcript and a text description and generates speech / audio matching the description.",
       "zh": "• 描述引导 TTS/TTA：模型输入转写/伪转写与文本描述，生成与描述匹配的语音/音频。"
      },
      {
       "id": "s-C-3-2",
       "original": "Inputs: (description, transcript/pseudo-transcript) • Voice Restylization: model receives a transcript, a voice prompt and a description.",
       "zh": "输入：（描述、转写/伪转写） • 声音风格重塑：模型接收转写、声音提示与描述。"
      },
      {
       "id": "s-C-3-3",
       "original": "The generated output needs to match speaker’s vocal style and the description.",
       "zh": "生成的输出需要同时匹配说话人的声线风格与描述。"
      },
      {
       "id": "s-C-3-4",
       "original": "Note that the description could contain attributes different from the voice prompt.",
       "zh": "注意，描述可以包含与声音提示不同的属性。"
      },
      {
       "id": "s-C-3-5",
       "original": "For the voice prompt could have been recorded in a small room with neutral emotion and the description could specify happy emotion in a church with bells ringing.",
       "zh": "例如，声音提示可能是在小房间里用中性情感录制的，而描述可以指定在教堂里、铃声响起、情绪开心。"
      },
      {
       "id": "s-C-3-6",
       "original": "Inputs: (voice, description, transcript) • Sampling: The model receives a transcript as input and samples diverse voices.",
       "zh": "输入：（声音、描述、转写） • 采样：模型接收转写作为输入，采样多样化的声音。"
      },
      {
       "id": "s-C-3-7",
       "original": "Inputs: (transcript) • Speech Infilling/Editing: model takes as input an masked speech with accompanying transcript and an optional description and infills the masked portion.",
       "zh": "输入：（转写） • 语音填充/编辑：模型输入带掩蔽的语音及配套转写与可选描述，填充被掩蔽的部分。"
      },
      {
       "id": "s-C-3-8",
       "original": "Inputs: (context, transcript, optional description) • Audio Infilling/Editing: model takes as input an masked audio with pseudo transcript and description to infill the masked portion with matching description.",
       "zh": "输入：（上下文、转写、可选描述） • 音频填充/编辑：模型输入带掩蔽的音频与伪转写及描述，按匹配的描述填充被掩蔽的部分。"
      },
      {
       "id": "s-C-3-9",
       "original": "Inputs: (context, pseudo transcript, description)",
       "zh": "输入：（上下文、伪转写、描述）"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-D",
   "num": "D",
   "level": 1,
   "page": 36,
   "title": {
    "original": "Subjective Evaluation Interface",
    "zh": "主观评测界面"
   },
   "blocks": [
    {
     "id": "p-D-1",
     "type": "paragraph",
     "page": 36,
     "sentences": [
      {
       "id": "s-D-1-1",
       "original": "We show human annotation interfaces for sound in Figures D1 and D2, for speech in Figures D3 to D5.",
       "zh": "我们在 Figures D1 与 D2 中展示音效的人工标注界面，在 Figures D3 至 D5 中展示语音的人工标注界面。"
      }
     ]
    },
    {
     "id": "p-D-2",
     "type": "paragraph",
     "page": 37,
     "sentences": [
      {
       "id": "s-D-2-1",
       "original": "Figure D1 OVL evaluation for sound Figure D2 REL evaluation for sound Figure D3 Quality MOS evaluation for speech Figure D4 Similarity MOS evaluation for speech Figure D5 REL evaluation for speech",
       "zh": "Figure D1 音效的 OVL 评测 Figure D2 音效的 REL 评测 Figure D3 语音的质量 MOS 评测 Figure D4 语音的相似度 MOS 评测 Figure D5 语音的 REL 评测"
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
    "sentence_id": "s-4-1-2-4",
    "quote": "we use the dense Encodec (Défossez et al., 2022) features which are extracted prior to the residual quantization layer"
   },
   "kind": "engineering",
   "title": "用 RVQ 前的密集 EnCodec 特征做生成目标",
   "explanation": "Audiobox SSL 不预测离散 RVQ token，也不预测声谱图，而是直接回归 RVQ 量化前的连续 EnCodec 特征。这一步借鉴了 latent diffusion 的思路：避开 HiFi-GAN 在非语音音频上泛化差的问题，让一个自编码器统一承载语音、音乐、音效三种模态。后续 Voicebox→Audiobox 的整条流水线都建立在这个表征选择之上。",
   "featured": true
  },
  {
   "id": "ann-002",
   "anchor": {
    "sentence_id": "s-4-2-2-1",
    "quote": "our dataset includes over 160K hours of speech (primarily English), 20K hours of music and 6K hours of sound samples"
   },
   "kind": "number",
   "title": "Mix-185K：160K 语音 + 20K 音乐 + 6K 音效",
   "explanation": "预训练混合数据集中音效只有 6K 小时，约为语音的 4%。但第 6 节的消融显示，这个大规模通用预训练仍给纯音效生成带来约 20% 的 FAD 收益——「学通用的填充」对下游各模态都是有效的前置任务，这是 Audiobox 统一路线的核心证据之一。",
   "featured": true
  },
  {
   "id": "ann-003",
   "anchor": {
    "sentence_id": "s-5-1-3-2",
    "quote": "we represent transcript with raw characters, including punctuation and with true cases, and utilize the SeamlessM4T v2 multilingual char-to-unit forced aligner"
   },
   "kind": "engineering",
   "title": "字符级转写 + SeamlessM4T v2 对齐器，弃用 MFA 音素",
   "explanation": "以往工作（Voicebox、VALL-E 等）用音素序列 + Montreal Forced Aligner。Audiobox 改用带大小写和标点的原始字符，配合多语 char-to-unit 强制对齐器，一举去掉音素化错误传播，同时保留全大写强调、标点等韵律线索，并天然支持多语混读和带噪/对话语音的对齐。",
   "featured": true
  },
  {
   "id": "ann-004",
   "anchor": {
    "sentence_id": "s-5-1-2-5",
    "quote": "Liu et al. (2023a) showed that LoRA achieves better performance when fine-tuning SpeechFlow on 960 hours of speech, but we suspect that full fine-tuning may prevail when we scale fine-tuning data."
   },
   "kind": "comparison",
   "title": "数据规模改变 LoRA 与全量微调的相对优劣",
   "explanation": "SpeechFlow 在 960 小时微调时发现 LoRA 更好；Audiobox 把微调数据放大到 100K 小时后结论反转：全量微调在多数领域带来 23%–43% 的相对 WER 下降（音效侧 LoRA 也平均差 15%–30%）。教训：参数高效微调的优势区间与数据规模强相关，小数据结论不能直接外推。",
   "featured": true
  },
  {
   "id": "ann-005",
   "anchor": {
    "sentence_id": "s-5-5-2-2",
    "quote": "scaling pre-training data greatly improves style similarity, especially on domains not covered in the fine-tuning data (CV, SWBD, Expr, Accent)"
   },
   "kind": "number",
   "title": "泛化收益主要来自预训练扩规模，而非微调扩规模",
   "explanation": "消融把预训练数据与微调数据分开扫描：把微调数据从 SP-book-60K 扩到 SP-multi-100K 几乎不涨相似度，而扩预训练数据在微调未覆盖的领域（CV、SWBD、Expr、Accent）上大幅提升风格相似度。作者的解释很干脆：预训练数据是微调数据的超集，微调阶段已经没有多少「风格迁移」可学，只做转写-语音对齐。",
   "featured": true
  },
  {
   "id": "ann-006",
   "anchor": {
    "sentence_id": "s-5-3-6-3",
    "quote": "We instead use the last three seconds after removing the trailing silences based on the forced alignment for all experiments in this paper."
   },
   "kind": "engineering",
   "title": "提示音频的尾部静音是一个隐蔽的评测陷阱",
   "explanation": "Voicebox 直接取参考音频最后 3 秒做提示，其中常含大量尾部静音。Audiobox 先用强制对齐裁掉静音再取提示，在 CV、Accent 这类静音偏长的数据集上相似度大幅提升（0.720→0.734 平均），WER 基本持平。静音不携带目标风格信息——这个细节对复现零样本 TTS 数字影响很大。",
   "featured": true
  },
  {
   "id": "ann-007",
   "anchor": {
    "sentence_id": "s-5-2-2-5",
    "quote": "WER can result from both synthesis error and recognition error"
   },
   "kind": "critique",
   "title": "WER 作为内容指标的双重噪声来源",
   "explanation": "论文自己点破：WER 同时混入合成错误与识别器错误，在口音、对话、带噪等难识别风格上尤其不可靠。这也是本文换用 Whisper large-v2 替代 HuBERT-L 做评测 ASR 的原因。读 Table 1/2 的 WER 数字时要意识到：差距小的项很可能在评测噪声之内。"
  },
  {
   "id": "ann-008",
   "anchor": {
    "sentence_id": "s-7-2-2-3",
    "quote": "To mitigate this issue we train our model in two stages."
   },
   "kind": "concept",
   "title": "两阶段微调：先吃全量脏字幕，再收口到高质量字幕",
   "explanation": "语音字幕里只有 500 小时是人工标注，其余都是属性标签 + LLM 生成，且多数数据集连元数据都没有。Audiobox 的对策与音效侧一致：第一阶段用全部字幕（并上采样音频到语音：音频 ≈ 3:1）学覆盖度，第二阶段只用 2,310 小时高质量子集（比例约 2.6:1）修质量。这是「数量与质量不可兼得」时的标准折中。",
   "featured": true
  },
  {
   "id": "ann-009",
   "anchor": {
    "sentence_id": "s-7-1-16-2",
    "quote": "The voice prompt is selected such that it differs from the target utterance on one or more attribute such as emotion, environment, and speaking rate."
   },
   "kind": "motivation",
   "title": "对抗式声音提示：让提示只携带声线，不携带风格",
   "explanation": "这是声音提示与零样本 TTS 上下文提示的本质区别：后者希望模型照抄情感、环境等一切属性；前者故意选在情感/环境/语速上与目标不同的同说话人话语，再叠加 RIR 与噪声增强进一步去相关，逼模型只从提示提取声线，把其余控制让给文本描述。解耦控制不是靠架构，而是靠数据构造逼出来的。",
   "featured": true
  },
  {
   "id": "ann-010",
   "anchor": {
    "sentence_id": "s-7-2-1-2",
    "quote": "for sound inputs without transcript, we create a pseudo-transcript that contains “<sound>” tokens each of length 1 second filling the length of audio"
   },
   "kind": "engineering",
   "title": "伪转写 `<sound>`：让语音/音效共用一个条件接口",
   "explanation": "统一模型只有一条「帧对齐转写」输入通道。音效没有转写，就用每秒一个 `<sound>` token 填满整段时长；缺声音提示的样本则喂 0.1 秒全零伪提示。这种「特殊 token + 哑输入」的适配方式成本极低，但让语音与音效得以在同一个流匹配主干上联合训练。",
   "featured": true
  },
  {
   "id": "ann-011",
   "anchor": {
    "sentence_id": "s-7-4-6-4",
    "quote": "we select the hyper-parameters to bias the model towards description-guided TTS with and without vocal conditioning."
   },
   "kind": "number",
   "title": "丢弃概率按用例反推：联合概率向描述引导 TTS 倾斜",
   "explanation": "训练时随机丢弃 context/voice prompt/caption 的概率（0.5/0.7|0.5/0.3）不是拍脑袋，而是先确定各用例应有的联合概率（ZS-TTS 0.075、带声线描述 TTS 0.245、纯描述 TTS 0.175、采样 0.075），再反解出丢弃率。预训练已覆盖 ZS-TTS 与采样，微调就把概率质量压到新能力上。"
  },
  {
   "id": "ann-012",
   "anchor": {
    "sentence_id": "s-7-3-8-3",
    "quote": "with ∼30x performance degradation compared to the sound benchmark"
   },
   "kind": "comparison",
   "title": "公开 CLAP 在语音检索上退化约 30 倍",
   "explanation": "CLAP 用「一个人在说话」这类粗描述训练，无法区分口音、情感等细粒度风格。在语音 T2A@10 上公开 CLAP 只有 2.29–3.37，而音效上能到 60+——退化约 30 倍。作者的对策是 Joint-CLAP：WavLM-base+ 换音频骨架（自监督语音模型比通用音频分类器更能捕捉说话风格），RoBERTa 做文本端，用语音字幕对比学习微调，把语音 T2A@10 从 2.29 拉到 22.01。",
   "featured": true
  },
  {
   "id": "ann-013",
   "anchor": {
    "sentence_id": "s-7-3-11-3",
    "quote": "the Pearson correlation coefficient between the text-audio similarity and REL score is increased from 0.028 to 0.727"
   },
   "kind": "number",
   "title": "评测指标与人感知的相关性：0.028 → 0.727",
   "explanation": "指标能不能用，最终要看它与人评的相关性。公开 CLAP 的文本-音频相似度与主观 REL 分数的 Pearson 相关只有 0.028——几乎无关；换成 Joint-CLAP 后升到 0.727。这提醒读者：CLAP 分数高低本身没有意义，先验证它与人类判断一致，才能拿来做自动评测或重排序。",
   "featured": true
  },
  {
   "id": "ann-014",
   "anchor": {
    "sentence_id": "s-6-5-2-7",
    "quote": "reranking with CLAP model is an effective approach to improving the overall performance in both the audio quality (FAD: 0.91 →0.78) and text-audio relatedness (CLAP score: 0.60 →0.71)"
   },
   "kind": "engineering",
   "title": "CLAP 重排序：廉价的「best-of-N」质量增益",
   "explanation": "音效侧每条文本采样 N=32 个候选，用 CLAP 相似度选最优；描述引导 TTS 侧 N=8（用 Joint-CLAP），纯音效 N=16。零训练成本换来 FAD 0.91→0.78、CLAP 0.60→0.71。代价是推理算力随 N 线性放大——生成模型评测里这种「采样预算」差异本身就能制造不小的高低差，对比论文数字时需留意。"
  },
  {
   "id": "ann-015",
   "anchor": {
    "sentence_id": "s-8-8-3",
    "quote": "by using bespoke solver, we could reduce ODE steps down to 4 and still retain similar performance in term of style similarity and WER"
   },
   "kind": "number",
   "title": "Bespoke Solver：4 步 ODE 保住质量，NFE 32→8",
   "explanation": "中点法 16 步（NFE 32）是质量基线；Bespoke Solver 学习时间重参数化与可逆变换，把真值路径「掰直」到只用 4 步（NFE 8，即 4 倍加速）仍有相近的 Sim-o 与 WER（WER 9.1→8.3 甚至略好），且对训练时没见过的引导权重（GW=0.0）也能泛化。这是把流匹配推向实时可用的关键工程件。",
   "featured": true
  },
  {
   "id": "ann-016",
   "anchor": {
    "sentence_id": "s-10-1-4-1",
    "quote": "when prompted with “a chihuahua barking,” the best the model can do is generating a dog barking audio clip if the text embedding of “chihuahua” and “dog” are close to each other"
   },
   "kind": "critique",
   "title": "吉娃娃困境：描述控制的粒度上限由数据决定",
   "explanation": "训练数据里吉娃娃和拉布拉多的叫声大概率都被标成「一只狗在叫」，于是「吉娃娃在叫」的提示最多检索到嵌入最近的「狗叫」模式。模型学不会数据里不存在的区分——口音等地域属性同理。作者把这一点列为局限而非失败：描述式控制是监督对齐问题，规模化细粒度标注数据才是真正的瓶颈。",
   "featured": true
  },
  {
   "id": "ann-017",
   "anchor": {
    "sentence_id": "s-10-1-5-3",
    "quote": "labeling which dog species solely based on audio is difficult task for most of the people"
   },
   "kind": "motivation",
   "title": "为什么细粒度音频标注做不大：人耳本身就分不清",
   "explanation": "区分猫叫狗叫容易，但仅凭音频判断狗的品种超出多数人能力；口音、情感、感知年龄、音频质量上标注者还经常互相不一致。这解释了本文为何走「属性标签器 + LLM 生成字幕 + 少量精选人工字幕（500 小时）+ LLM 给人工字幕打分」的混合路线——纯人工细粒度标注在成本和一致性上都走不通。"
  },
  {
   "id": "ann-018",
   "anchor": {
    "sentence_id": "s-7-5-10-3",
    "quote": "The Audiobox performs worse only to the Audiobox Sound model which specializes in sound generation."
   },
   "kind": "concept",
   "title": "统一模型 vs 专用模型：差一点，但只差一点",
   "explanation": "统一 Audiobox 在 TTA 上超过 VoiceLDM、AudioLDM2、TANGO-full-FT 等所有基线，唯一压过它的是自家专精音效的 Audiobox Sound（FAD 0.77 vs 1.10）；在零样本 TTS 上它比 Audiobox Speech 相似度更高、WER 略差。结论与 LLM 的演进同构：足够大的统一模型可以逼近甚至超过专用模型，同时换来一个接口覆盖全部任务。",
   "featured": true
  },
  {
   "id": "ann-019",
   "anchor": {
    "sentence_id": "s-7-4-14-2",
    "quote": "we additionally sample a silence duration of between 0 and 3 seconds and pad it to both ends"
   },
   "kind": "engineering",
   "title": "随机静音填充：让「边说话边有车经过」成为可能，也会诱发幻听",
   "explanation": "描述引导 TTS 推理时在转写两端随机补 0–3 秒静音，给背景声学事件留出「发生的时间」，生成的音频才与「一个男人说话、狗在叫」这类复合描述一致。副作用是描述里没提事件时模型可能凭空幻听出声音——作者的解法不是改模型，而是采样 8 个不同静音填充的候选再用 Joint-CLAP 重排序。"
  },
  {
   "id": "ann-020",
   "anchor": {
    "sentence_id": "s-9-2-2-1",
    "quote": "we use Seamless Watermark (Seamless Communication, 2023) to see we can reliably put and detect an imperceptible watermark on top of our model generated audio"
   },
   "kind": "number",
   "title": "水印鲁棒性：FPR/FNR 接近 0%，SI-SNR -20.6dB",
   "explanation": "在零样本 TTS、描述 TTS、声音+描述 TTS、纯音效等几乎全部生成场景上叠加 12 种增强（带通/高低通滤波、回声、变速、重采样等）后，水印检测的假阳/假阴率仍接近 0%（最差项 FNR 0.003），水印残差 SI-SNR -20.6dB，人耳不可感知。这是发布级音频生成模型防滥用的关键配套件，但论文没有展示对恶意去除攻击的抵抗。"
  },
  {
   "id": "ann-021",
   "anchor": {
    "sentence_id": "s-11-2-3",
    "quote": "This points toward a path similar to the evolution of language generation models, where a large scale model trained with a simple objective on large quantities of data eventually surpasses task or language specific models"
   },
   "kind": "connection",
   "title": "「音频界的 GPT 路径」：结论里的最大论断也最需要打问号",
   "explanation": "作者把 Audiobox 类比为音频生成的 LLM 时刻：简单目标（流匹配填充）+ 海量数据 → 统一模型超过专用模型。本文证据确实支持「接近」，但音效上仍输给专用模型，且描述控制的粒度被字幕数据卡死（吉娃娃问题）。类比成立与否，取决于细粒度配对数据能否像文本一样被廉价规模化——这正是作者自己在局限性里存疑的地方。"
  }
 ]
};
