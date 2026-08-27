// 自动生成：2106.07447 全文双语精读数据（由 tools/compile_paper.js 装配）
// 结构/原文来自 .cache/papers/2106.07447.json（tools/extract_paper.py）；
// 翻译与讲解来自 .cache/papers/zh/2106.07447/（LLM agent 撰写）。
// 改翻译请改片段后重新装配；勿手改本文件的结构与 original 字段。
globalThis.PAPER_2106_07447 = {
 "paper_id": "2106.07447",
 "model_id": "hubert",
 "title": {
  "original": "HuBERT: Self-Supervised Speech Representation Learning by Masked Prediction of Hidden Units",
  "zh": "HuBERT：基于隐藏单元掩码预测的自监督语音表示学习"
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
       "original": "Wei-Ning Hsu, Benjamin Bolte, Yao-Hung Hubert Tsai, Kushal Lakhotia, Ruslan Salakhutdinov, Abdelrahman Mohamed"
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
       "original": "Self-supervised approaches for speech representa-",
       "zh": "（本句为断行残句，完整译文见下句。）"
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
       "original": "tion learning are challenged by three unique problems: (1) there are multiple sound units in each input utterance, (2) there is no lexicon of input sound units during the pre-training phase, and (3) sound units have variable lengths with no explicit segmentation.",
       "zh": "语音表示学习的自监督方法面临 3 个独特难题：(1) 每条输入语音中包含多个声学单元；(2) 预训练阶段不存在输入声学单元的词表；(3) 声学单元长度可变，且没有显式的切分边界。"
      },
      {
       "id": "s-abstract-2-2",
       "original": "To deal with these three problems, we propose the Hidden-Unit BERT (HuBERT) approach for self-supervised speech representation learning, which utilizes an ofﬂine clustering step to provide aligned target labels for a BERT-like prediction loss.",
       "zh": "为应对这 3 个问题，我们提出用于自监督语音表示学习的隐藏单元 BERT（Hidden-Unit BERT，HuBERT）方法，它利用一个离线聚类步骤，为类 BERT 的预测损失提供对齐的目标标签。"
      },
      {
       "id": "s-abstract-2-3",
       "original": "A key ingredient of our approach is applying the prediction loss over the masked regions only, which forces the model to learn a combined acoustic and language model over the continuous inputs.",
       "zh": "我们方法的一个关键要素是将预测损失只施加在被掩码的区域上，这迫使模型在连续输入上同时学习一个声学模型和一个语言模型。"
      },
      {
       "id": "s-abstract-2-4",
       "original": "HuBERT relies primarily on the consistency of the unsupervised clustering step rather than the intrinsic quality of the assigned cluster labels.",
       "zh": "HuBERT 主要依赖无监督聚类步骤的一致性，而非所分配聚类标签本身的内在质量。"
      },
      {
       "id": "s-abstract-2-5",
       "original": "Starting with a simple k-means teacher of 100 clusters, and using two iterations of clustering, the HuBERT model either matches or improves upon the state-ofthe-art wav2vec 2.0 performance on the Librispeech (960h) and Libri-light (60,000h) benchmarks with 10min, 1h, 10h, 100h, and 960h ﬁne-tuning subsets.",
       "zh": "从一个仅有 100 个簇的简单 k-means 教师出发，经过两轮聚类迭代，HuBERT 在 Librispeech（960h）和 Libri-light（60,000h）基准上、在 10min、1h、10h、100h 和 960h 的各微调子集上，都达到或超过了当时最优的 wav2vec 2.0 的性能。"
      },
      {
       "id": "s-abstract-2-6",
       "original": "Using a 1B parameter model, HuBERT shows up to 19% and 13% relative WER reduction on the more challenging dev-other and test-other evaluation subsets.1 Index Terms—Self-supervised learning, BERT.",
       "zh": "使用 1B 参数的模型，HuBERT 在更具挑战性的 dev-other 和 test-other 评测子集上取得了最高 19% 和 13% 的相对 WER 降低。（代码、预训练与微调模型开源于 fairseq 的 examples/hubert 目录。）关键词：自监督学习，BERT。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-I",
   "num": "I",
   "level": 1,
   "page": 1,
   "title": {
    "original": "INTRODUCTION",
    "zh": "引言"
   },
   "blocks": [
    {
     "id": "p-I-1",
     "type": "paragraph",
     "page": 1,
     "sentences": [
      {
       "id": "s-I-1-1",
       "original": "The north star for many research programs has been learning speech and audio representations through listening and interaction, similar to how babies learn their ﬁrst language.",
       "zh": "许多研究计划的北极星，是让机器通过聆听和交互来学习语音与音频的表示，就像婴儿习得母语那样。"
      },
      {
       "id": "s-I-1-2",
       "original": "High ﬁdelity speech representation includes disentangled aspects of the spoken content along with non-lexical information of how it is delivered, e.g., speaker identity, emotion, hesitation, interruptions.",
       "zh": "高保真的语音表示既包含与语音内容解耦的各个侧面，也包含内容如何被表达的非词汇信息，例如说话人身份、情绪、迟疑、打断等。"
      },
      {
       "id": "s-I-1-3",
       "original": "Furthermore, reaching a complete situational understanding requires modeling structured noise interleaving and overlapping with the speech signal, e.g., laughter, coughing, lip-smacking, background vehicle engine, birds chirping, or food sizzling sounds.",
       "zh": "此外，要达到完整的情境理解，还需要对与语音信号交织、重叠的结构化噪声建模，例如笑声、咳嗽声、咂嘴声、背景中的车辆引擎声、鸟鸣声或食物的滋滋声。"
      }
     ]
    },
    {
     "id": "p-I-2",
     "type": "paragraph",
     "page": 1,
     "sentences": [
      {
       "id": "s-I-2-1",
       "original": "The need for such high-ﬁdelity representations drove research in self-supervised learning for speech and audio where the targets driving the learning process of a designed pretext task are drawn from the input signal itself.",
       "zh": "对这种高保真表示的需求推动了语音与音频自监督学习的研究：在设计好的前置任务中，驱动学习过程的目标取自输入信号本身。"
      },
      {
       "id": "s-I-2-2",
       "original": "Examples of pretext tasks for self-supervised speech representation learning include distinguishing near-by features from temporally distant ones [1]–[3], next-step prediction of audio features [4], masked prediction of audio features given unmasked context [5], [6].",
       "zh": "语音表示自监督学习的前置任务例子包括：区分时间上相近的特征与遥远的特征 [1]–[3]、对音频特征做下一步预测 [4]、在给定未掩码上下文的情况下对被掩码的音频特征做掩码预测 [5]、[6]。"
      },
      {
       "id": "s-I-2-3",
       "original": "Besides, self-supervised learning methods do not rely on any linguistic resources during training, allowing them to learn 1The code, pre-trained and ﬁne-tuned models are available at https:// github.com/pytorch/fairseq/tree/master/examples/hubert. universal representations since labels, annotations, and textonly material ignores rich information in the input signal.",
       "zh": "此外，自监督学习方法在训练中不依赖任何语言学资源，因而能够学到通用的表示——标签、标注和纯文本材料都忽略了输入信号中丰富的信息。（脚注 1：代码、预训练与微调模型见 https://github.com/pytorch/fairseq/tree/master/examples/hubert。）"
      }
     ]
    },
    {
     "id": "p-I-3",
     "type": "paragraph",
     "page": 1,
     "sentences": [
      {
       "id": "s-I-3-1",
       "original": "Learning speech representations without reliance on large volumes of labeled data is crucial for industrial applications and products with ever-increasing coverage of new languages and domains.",
       "zh": "在工业应用与产品中，新语言和新领域的覆盖不断扩大，不依赖大规模标注数据来学习语音表示至关重要。"
      },
      {
       "id": "s-I-3-2",
       "original": "The time needed to collect large labeled datasets covering each of these scenarios is the real bottleneck in the current fast-moving AI industry, with time-to-market playing a critical role for product success.",
       "zh": "为上述每一种场景收集大规模标注数据集所需的时间，是当今快速迭代的 AI 产业中真正的瓶颈——上市时间对产品成败起着关键作用。"
      },
      {
       "id": "s-I-3-3",
       "original": "Building more inclusive applications covering spoken-only dialects and languages is another signiﬁcant beneﬁt of reducing dependence on linguistic resources.",
       "zh": "降低对语言学资源的依赖还有另一大好处：能构建覆盖纯口语方言与语言的、更具包容性的应用。"
      },
      {
       "id": "s-I-3-4",
       "original": "Given their non-standard orthographic rules, many of these languages and dialects have very little or no resources at all.",
       "zh": "由于这些语言和方言的书写规则并不规范，其中许多几乎没有或完全没有可用的语言学资源。"
      }
     ]
    },
    {
     "id": "p-I-4",
     "type": "paragraph",
     "page": 1,
     "sentences": [
      {
       "id": "s-I-4-1",
       "original": "Pseudo-labeling (PL), also known as self-training and belongs to the family of semi-supervised learning techniques, has been the dominant approach for utilizing unlabeled speech and audio with successful applications dating back to the mid1990s [7]–[10].",
       "zh": "伪标注（Pseudo-labeling，PL），又称自训练，属于半监督学习技术家族，自 1990 年代中期以来一直是利用无标注语音与音频的主流方法，并有许多成功应用 [7]–[10]。"
      },
      {
       "id": "s-I-4-2",
       "original": "PL starts with some supervised data to train a ”teacher” model in one speciﬁc downstream task.",
       "zh": "PL 先用一部分监督数据，在某个特定的下游任务上训练一个「教师」模型。"
      },
      {
       "id": "s-I-4-3",
       "original": "Pseudolabels are then generated for the unlabeled data using the teacher model.",
       "zh": "然后用教师模型为无标注数据生成伪标签。"
      },
      {
       "id": "s-I-4-4",
       "original": "Next, a student model is trained using the combined supervised and teacher-labeled data either using the standard cross-entropy [9] loss or using a contrastive loss [11] to account for noise in teacher-generated labels.",
       "zh": "接着，用监督数据与教师标注数据的合集训练一个学生模型，既可以使用标准的交叉熵损失 [9]，也可以使用对比损失 [11] 来容忍教师生成标签中的噪声。"
      },
      {
       "id": "s-I-4-5",
       "original": "The pseudolabeling process may be repeated multiple times to improve teacher label quality [12] iteratively.",
       "zh": "伪标注过程可以重复多轮，以迭代地提升教师标签的质量 [12]。"
      }
     ]
    },
    {
     "id": "p-I-5",
     "type": "paragraph",
     "page": 1,
     "sentences": [
      {
       "id": "s-I-5-1",
       "original": "Without discounting the immense success of pseudolabeling techniques, self-supervised representations offer two unique advantages: (1) Pseudo-label methods force student models to merely mimic a teacher model, which is limited by its supervised data size and the provided annotation quality.",
       "zh": "我们并不否认伪标注技术的巨大成功，但自监督表示提供了两个独特的优势：（1）伪标注方法迫使学生模型仅仅模仿教师模型，而教师受限于其监督数据的规模和标注质量。"
      },
      {
       "id": "s-I-5-2",
       "original": "On the other hand, self-supervised pretext tasks force the model to represent the entire input signal by compressing much more bits of information into the learned latent representation.",
       "zh": "另一方面，自监督前置任务迫使模型对整个输入信号建模，把多得多的信息比特压缩进学到的隐表示中。"
      },
      {
       "id": "s-I-5-3",
       "original": "(2) In pseudo-labeling, the supervised data of the teacher model forces the whole learning to be geared towards a single downstream task.",
       "zh": "（2）在伪标注中，教师模型的监督数据迫使整个学习过程面向单一下游任务。"
      },
      {
       "id": "s-I-5-4",
       "original": "On the contrary, self-supervised features show better generalization to a multitude of downstream applications.",
       "zh": "相反，自监督特征对众多下游应用表现出更好的泛化能力。"
      }
     ]
    },
    {
     "id": "p-I-6",
     "type": "paragraph",
     "page": 1,
     "sentences": [
      {
       "id": "s-I-6-1",
       "original": "There have been impressive successes for self-supervised learning in Computer Vision (CV) [13]–[15] and Natural Language Processing (NLP) [16]–[18] applications.",
       "zh": "自监督学习在计算机视觉（CV）[13]–[15] 和自然语言处理（NLP）[16]–[18] 应用中都取得了令人瞩目的成功。"
      },
      {
       "id": "s-I-6-2",
       "original": "Learning representations of discrete input sequences, such as in Natural Language Processing (NLP) applications, uses either masked prediction [19], [20] or auto-regressive generation [18], [21] of input sequences with partial obfuscation.",
       "zh": "对离散输入序列的表示学习（如 NLP 应用），通常采用对部分混淆的输入序列做掩码预测 [19]、[20] 或自回归生成 [18]、[21]。"
      },
      {
       "id": "s-I-6-3",
       "original": "For continuous inputs, such as in Computer Vision (CV) applications, representations are often learned through instance classiﬁcation, in which each image and its augmentations are treated as a single output class to be pulled together [14], [15] or contrasted against other negative samples [22].",
       "zh": "对连续输入（如 CV 应用），表示通常通过实例分类来学习：每张图像及其增强版本被当作一个独立的输出类别，要么彼此拉近 [14]、[15]，要么与其他负样本对比拉远 [22]。"
      }
     ]
    },
    {
     "id": "p-I-7",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-I-7-1",
       "original": "Speech signals differ from text and images in that they are continuous-valued sequences.",
       "zh": "语音信号不同于文本和图像之处在于：它是连续取值的序列。"
      },
      {
       "id": "s-I-7-2",
       "original": "Self-supervised learning for the speech recognition domain faces unique challenges from those in CV and NLP.",
       "zh": "因此，语音识别领域的自监督学习面临与 CV 和 NLP 不同的独特挑战。"
      },
      {
       "id": "s-I-7-3",
       "original": "Firstly, the presence of multiple sounds in each input utterance breaks the instance classiﬁcation assumption used in many CV pre-training approaches.",
       "zh": "首先，每条输入语音中存在多个声音，这打破了许多 CV 预训练方法所依赖的实例分类假设。"
      },
      {
       "id": "s-I-7-4",
       "original": "Secondly, during pre-training, there is no prior lexicon of discrete sound units available, as in NLP applications in which words or word pieces are used, hindering the use of predictive losses.",
       "zh": "其次，预训练期间没有像 NLP 应用那样可用的离散声学单元先验词表（NLP 中使用词或子词），这阻碍了预测式损失的使用。"
      },
      {
       "id": "s-I-7-5",
       "original": "Lastly, the boundaries between sound units are not known, which complicates masked prediction pre-training.",
       "zh": "最后，声学单元之间的边界是未知的，这让掩码预测式预训练变得更加复杂。"
      }
     ]
    },
    {
     "id": "p-I-8",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-I-8-1",
       "original": "In this paper, we introduce Hidden unit BERT (HuBERT) that beneﬁts from an ofﬂine clustering step to generate noisy labels for a BERT-like per-training.",
       "zh": "本文提出隐藏单元 BERT（HuBERT），它借助一个离线聚类步骤为类 BERT 的预训练生成带噪标签。"
      },
      {
       "id": "s-I-8-2",
       "original": "Concretely, a BERT model consumes masked continuous speech features to predict predetermined cluster assignments.",
       "zh": "具体来说，一个 BERT 模型以被掩码的连续语音特征为输入，预测预先确定的聚类分配。"
      },
      {
       "id": "s-I-8-3",
       "original": "The predictive loss is only applied over the masked regions, forcing the model to learn good high-level representations of unmasked inputs to infer the targets of masked ones correctly.",
       "zh": "预测损失只施加在被掩码的区域上，迫使模型为未掩码输入学到好的高层表示，从而能正确推断被掩码部分的目标。"
      },
      {
       "id": "s-I-8-4",
       "original": "Intuitively, the HuBERT model is forced to learn both acoustic and language models from continuous inputs.",
       "zh": "直观地说，HuBERT 模型被迫从连续输入中同时学习声学模型和语言模型。"
      },
      {
       "id": "s-I-8-5",
       "original": "First, the model needs to model unmasked inputs into meaningful continuous latent representations, which maps to the classical acoustic modeling problem.",
       "zh": "其一，模型需要把未掩码输入建模成有意义的连续隐表示，这对应经典的声学建模问题。"
      },
      {
       "id": "s-I-8-6",
       "original": "Second, to reduce the prediction error, the model needs to capture the long-range temporal relations between learned representations.",
       "zh": "其二，为了降低预测误差，模型需要捕捉所学表示之间的长程时间关系。"
      },
      {
       "id": "s-I-8-7",
       "original": "One crucial insight motivating this work is the importance of consistency of the targets, not just their correctness, which enables the model to focus on modeling the sequential structure of input data.",
       "zh": "激发本工作的一个关键洞见是：目标的一致性比其正确性更重要——一致性使模型能专注于对输入数据的序列结构建模。"
      },
      {
       "id": "s-I-8-8",
       "original": "Our approach draws inspiration from the DeepCluster method for self-supervised visual learning [23]; however, HuBERT beneﬁts from the masked prediction loss over speech sequences to represent their sequential structure.",
       "zh": "我们的方法受到自监督视觉学习方法 DeepCluster [23] 的启发；但 HuBERT 借助语音序列上的掩码预测损失来刻画其序列结构。"
      }
     ]
    },
    {
     "id": "p-I-9",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-I-9-1",
       "original": "When the HuBERT model is pre-trained on either the standard Librispeech 960h [24] or the Libri-Light 60k hours [25], it either matches or improves upon the state-of-theart wav2vec 2.0 [6] performance on all ﬁne-tuning subsets of 10mins, 1h, 10h, 100h, and 960h.",
       "zh": "当 HuBERT 模型在标准的 Librispeech 960h [24] 或 Libri-Light 60k 小时 [25] 上预训练时，它在 10mins、1h、10h、100h 和 960h 全部微调子集上都达到或超过了当时最优的 wav2vec 2.0 [6] 的性能。"
      },
      {
       "id": "s-I-9-2",
       "original": "We present systematic results on three model sizes pre-trained with HuBERT: BASE (90M parameters), LARGE (300M), and X-LARGE (1B).",
       "zh": "我们给出了三种模型规模上 HuBERT 预训练的系统结果：BASE（90M 参数）、LARGE（300M）和 X-LARGE（1B）。"
      },
      {
       "id": "s-I-9-3",
       "original": "The X-LARGE model shows up to 19% and 13% relative WER improvement from LARGE models on dev-other and test-other evaluation subsets when pre-trained on the Libri-Light 60k hours.",
       "zh": "在 Libri-Light 60k 小时上预训练时，X-LARGE 模型在 dev-other 和 test-other 评测子集上相对 LARGE 模型取得了最高 19% 和 13% 的 WER 改进。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-II",
   "num": "II",
   "level": 1,
   "page": 2,
   "title": {
    "original": "METHOD",
    "zh": "方法"
   },
   "blocks": []
  },
  {
   "id": "sec-II-A",
   "num": "A",
   "level": 2,
   "page": 2,
   "title": {
    "original": "Learning the Hidden Units for HuBERT",
    "zh": "为 HuBERT 学习隐藏单元"
   },
   "blocks": [
    {
     "id": "p-II-A-1",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-II-A-1-1",
       "original": "An acoustic model trained on text and speech pairs provides pseudo-phonetic labels for each frame via forced alignment in semi-supervised learning.",
       "zh": "在半监督学习中，一个用文本-语音对训练的声学模型可以通过强制对齐为每一帧提供伪音素标签。"
      },
      {
       "id": "s-II-A-1-2",
       "original": "On the contrary, the self-supervised representation learning setup has access to speech-only data.",
       "zh": "相比之下，自监督表示学习只能拿到纯语音数据。"
      },
      {
       "id": "s-II-A-1-3",
       "original": "Nevertheless, simple discrete latent variable models such as k-means and Gaussian mixture models (GMMs) infer hidden units that exhibit non-trivial correlation with the underlying acoustic units [26] (see also Table V).",
       "zh": "尽管如此，k-means、高斯混合模型（GMM）等简单的离散隐变量模型所推断出的隐藏单元，与底层声学单元之间表现出非平凡的相关性 [26]（另见 Table V）。"
      },
      {
       "id": "s-II-A-1-4",
       "original": "More advanced systems can achieve better acoustic unit discovery performance using better graphical models [27], [28] or parameterizes the distributions with more powerful neural network models [29]– [33].",
       "zh": "更先进的系统可以通过更好的图模型 [27]、[28]，或用更强大的神经网络模型来参数化这些分布 [29]–[33]，取得更好的声学单元发现性能。"
      }
     ]
    },
    {
     "id": "fig-II-A-1",
     "type": "figure_caption",
     "page": 2,
     "original": "Fig. 1: The HuBERT approach predicts hidden cluster assignments of the masked frames (y2, y3, y4 in the ﬁgure) generated by one or more iterations of k-means clustering.",
     "zh": "图 1：HuBERT 方法预测被掩码帧（图中的 y2、y3、y4）的隐藏簇分配，这些分配由一轮或多轮 k-means 聚类生成。"
    },
    {
     "id": "p-II-A-2",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-II-A-2-1",
       "original": "Inspired by this, we propose to use acoustic unit discovery models to provide frame-level targets.",
       "zh": "受此启发，我们提出用声学单元发现模型来提供帧级目标。"
      },
      {
       "id": "s-II-A-2-2",
       "original": "Let X denote a speech utterance X = [x1, · · · , xT ] of T frames.",
       "zh": "记一段语音为 X = [x1, · · · , xT]，共 T 帧。"
      },
      {
       "id": "s-II-A-2-3",
       "original": "Discovered hidden units are denoted with h(X) = Z = [z1, · · · , zT ], where zt ∈[C] is a C-class categorical variable and h is a clustering model, e.g. k-means.",
       "zh": "发现的隐藏单元记为 h(X) = Z = [z1, · · · , zT]，其中 zt ∈ [C] 是取 C 类的类别变量，h 是一个聚类模型，例如 k-means。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-II-B",
   "num": "B",
   "level": 2,
   "page": 2,
   "title": {
    "original": "Representation Learning via Masked Prediction",
    "zh": "通过掩码预测学习表示"
   },
   "blocks": [
    {
     "id": "p-II-B-1",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-II-B-1-1",
       "original": "Let M ⊂[T] denote the set of indices to be masked for a length-T sequence X, and ˜X = r(X, M) denote a corrupted version of X where xt is replaced with a mask embedding ˜x if t ∈M.",
       "zh": "记 M ⊂ [T] 为一条长度 T 序列 X 中被掩码的下标集合，记 X̃ = r(X, M) 为 X 的受损版本——若 t ∈ M，则 xt 被替换为掩码嵌入 x̃。"
      },
      {
       "id": "s-II-B-1-2",
       "original": "A masked prediction model f takes as input ˜X and predicts a distribution over the target indeces at each timestep pf(· | ˜X, t).",
       "zh": "掩码预测模型 f 以 X̃ 为输入，在每个时间步预测目标下标的分布 pf(· | X̃, t)。"
      },
      {
       "id": "s-II-B-1-3",
       "original": "There are two decisions to be made for masked prediction: how to mask and where to apply the prediction loss.",
       "zh": "掩码预测需要做出两个决定：如何掩码，以及在何处施加预测损失。"
      }
     ]
    },
    {
     "id": "p-II-B-2",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-II-B-2-1",
       "original": "Regarding the ﬁrst decision, we adopt the same strategies used in SpanBERT [34] and wav2vec 2.0 [6] for mask generation, where p% of the timesteps are randomly selected as start indices, and spans of l steps are masked.",
       "zh": "关于第一个决定，我们采用 SpanBERT [34] 和 wav2vec 2.0 [6] 中相同的掩码生成策略：随机选取 p% 的时间步作为起始下标，并掩码长度为 l 步的连续片段。"
      },
      {
       "id": "s-II-B-2-2",
       "original": "To address the second decision, we denote the cross-entropy loss computed over masked and unmasked timesteps as Lm and Lu, respectively.",
       "zh": "针对第二个决定，我们把在被掩码时间步上计算的交叉熵损失记为 Lm，在未掩码时间步上计算的记为 Lu。"
      },
      {
       "id": "s-II-B-2-3",
       "original": "Lm is deﬁned as:",
       "zh": "Lm 定义为："
      }
     ]
    },
    {
     "id": "eq-II-B-1",
     "type": "equation",
     "page": 2,
     "original": "t∈M log pf(zt | ˜X, t), Lm(f; X, M, Z) ="
    },
    {
     "id": "p-II-B-3",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-II-B-3-1",
       "original": "and Lu is of the same form except that it sums over t ̸∈ M.",
       "zh": "Lu 的形式相同，只是求和范围换成 t ∉ M。"
      },
      {
       "id": "s-II-B-3-2",
       "original": "The ﬁnal loss is computed as a weighted sum of the two terms: L = αLm + (1 −α)Lu.",
       "zh": "最终损失是两项的加权和：L = αLm + (1 − α)Lu。"
      },
      {
       "id": "s-II-B-3-3",
       "original": "In the extreme case when α = 0, the loss is computed over the unmasked timesteps, which is similar to acoustic modeling in hybrid speech recognition systems [35]–[38].",
       "zh": "在 α = 0 的极端情况下，损失只在未掩码时间步上计算，这类似于混合式语音识别系统中的声学建模 [35]–[38]。"
      },
      {
       "id": "s-II-B-3-4",
       "original": "In our setup, this limits the learning process to mimicking the clustering model.",
       "zh": "在我们的设定下，这会把学习过程限制为仅仅模仿聚类模型。"
      }
     ]
    },
    {
     "id": "p-II-B-4",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-II-B-4-1",
       "original": "In the other extreme with α = 1, the loss is only computed over the masked timesteps where the model has to predict the targets corresponding to the unseen frames from context, analogous to language modeling.",
       "zh": "在另一个极端 α = 1 下，损失只在被掩码的时间步上计算，模型必须从上下文推断出那些不可见帧对应的目标，这类似于语言建模。"
      },
      {
       "id": "s-II-B-4-2",
       "original": "It forces the model to learn both the acoustic representation of unmasked segments and the long-range temporal structure of the speech data.",
       "zh": "这迫使模型同时学习未掩码片段的声学表示和语音数据的长程时间结构。"
      },
      {
       "id": "s-II-B-4-3",
       "original": "We hypothesize that the setup with α = 1 is more resilient to the quality of cluster targets, which is demonstrated in our experiments (see Table V).",
       "zh": "我们假设 α = 1 的设定对聚类目标的质量更鲁棒，实验也证实了这一点（见 Table V）。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-II-C",
   "num": "C",
   "level": 2,
   "page": 3,
   "title": {
    "original": "Learning with Cluster Ensembles",
    "zh": "用簇集成学习"
   },
   "blocks": [
    {
     "id": "p-II-C-1",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-II-C-1-1",
       "original": "A simple idea to improve target quality is to utilize multiple clustering models.",
       "zh": "提升目标质量的一个简单想法是使用多个聚类模型。"
      },
      {
       "id": "s-II-C-1-2",
       "original": "While an individual clustering model may perform terribly, cluster ensembles can provide complementary information to facilitate representation learning.",
       "zh": "单个聚类模型可能表现很差，但簇集成可以提供互补信息，促进表示学习。"
      },
      {
       "id": "s-II-C-1-3",
       "original": "For example, an ensemble of k-means models with different codebook sizes can create targets of different granularity, from manner classes (vowel/consonant) to sub-phone states (senones).",
       "zh": "例如，用不同码本大小的 k-means 模型做集成，可以产生不同粒度的目标：从发音方式类别（元音/辅音）到子音素状态（senone）。"
      },
      {
       "id": "s-II-C-1-4",
       "original": "To extend the proposed framework, let Z(k) be the target sequences generated by the k-th clustering model.",
       "zh": "为扩展所提框架，记 Z(k) 为第 k 个聚类模型生成的目标序列。"
      },
      {
       "id": "s-II-C-1-5",
       "original": "We can now re-write Lm as: k log p(k) f (z(k) t | ˜X, t), (2)",
       "zh": "现在可以把 Lm 重写为公式 (2) 的形式（对所有簇模型的预测对数似然求和）。"
      }
     ]
    },
    {
     "id": "eq-II-C-1",
     "type": "equation",
     "page": 3,
     "original": "Lm(f; X, {Z(k)}k, M) = t∈M"
    },
    {
     "id": "p-II-C-2",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-II-C-2-1",
       "original": "and similarly for the unmasked loss Lu.",
       "zh": "未掩码损失 Lu 也类似。"
      },
      {
       "id": "s-II-C-2-2",
       "original": "This is analogous to multi-task learning, but with tasks created by unsupervised clustering.",
       "zh": "这类似于多任务学习，只不过任务是由无监督聚类创造出来的。"
      }
     ]
    },
    {
     "id": "p-II-C-3",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-II-C-3-1",
       "original": "Additionally, ensembling is intriguing because it can be used alongside product quantization (PQ) [39], where a feature space is partitioned into multiple subspaces, and each subspace is quantized separately.",
       "zh": "此外，集成之所以有吸引力，还因为它可以与乘积量化（PQ）[39] 搭配使用：PQ 把特征空间划分为多个子空间，每个子空间单独量化。"
      },
      {
       "id": "s-II-C-3-2",
       "original": "PQ allows effective Euclidean distance-based quantization such as k-means for highdimensional features and heterogeneous features whose scale differs signiﬁcantly between subspaces.",
       "zh": "PQ 使得基于欧氏距离的量化方法（如 k-means）对高维特征、以及各子空间尺度差异很大的异质特征依然有效。"
      },
      {
       "id": "s-II-C-3-3",
       "original": "In this case, the theoretical size of the target space is the product of all codebooks’ sizes.",
       "zh": "此时，目标空间的理论大小是所有码本大小的乘积。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-II-D",
   "num": "D",
   "level": 2,
   "page": 3,
   "title": {
    "original": "Iterative Reﬁnement of Cluster Assignments",
    "zh": "簇分配的迭代精炼"
   },
   "blocks": [
    {
     "id": "p-II-D-1",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-II-D-1-1",
       "original": "In addition to using cluster ensembles, another direction for improved representation is reﬁning the cluster assignments throughout the learning process.",
       "zh": "除了使用簇集成，另一条改进表示的方向是在学习过程中不断精炼簇分配。"
      },
      {
       "id": "s-II-D-1-2",
       "original": "Since we expect a pre-trained model to provide better representations than the raw acoustic feature such as MFCCs, we can create a new generation of clusters by training a discrete latent model over the learned latent representations.",
       "zh": "既然我们预期预训练模型能提供比 MFCC 等原始声学特征更好的表示，就可以在学到的隐表示上训练一个离散隐变量模型，生成新一代簇。"
      },
      {
       "id": "s-II-D-1-3",
       "original": "The learning process then proceeds with the newly discovered units.",
       "zh": "随后学习过程用这些新发现的单元继续进行。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-II-E",
   "num": "E",
   "level": 2,
   "page": 3,
   "title": {
    "original": "Implementation",
    "zh": "实现"
   },
   "blocks": [
    {
     "id": "p-II-E-1",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-II-E-1-1",
       "original": "Our pre-trained models follows the wav2vec 2.0 architecture [6], with a convolutional waveform encoder, a BERT encoder [19], a projection layer and a code embedding layer.",
       "zh": "我们的预训练模型沿用 wav2vec 2.0 的架构 [6]，包括一个卷积波形编码器、一个 BERT 编码器 [19]、一个投影层和一个码元嵌入层。"
      }
     ]
    },
    {
     "id": "p-II-E-2",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-II-E-2-1",
       "original": "We consider HuBERT in three different conﬁgurations: BASE, LARGE, and X-LARGE.",
       "zh": "我们考虑 HuBERT 的三种配置：BASE、LARGE 和 X-LARGE。"
      },
      {
       "id": "s-II-E-2-2",
       "original": "The ﬁsrt two follow the architectures of wav2vec 2.0 BASE and LARGE closely.",
       "zh": "前两种与 wav2vec 2.0 的 BASE 和 LARGE 架构基本一致。"
      },
      {
       "id": "s-II-E-2-3",
       "original": "The X-LARGE architecture expands the model size to about 1 billion parameters, similar to the size of the Conformer XXL model in [40].",
       "zh": "X-LARGE 架构把模型规模扩大到约 10 亿（1 billion）参数，与 [40] 中的 Conformer XXL 模型规模相当。"
      },
      {
       "id": "s-II-E-2-4",
       "original": "The waveform encoder is identical for all the three conﬁgurations, which is composed of seven 512-channel layers with strides [5,2,2,2,2,2,2] and kernel widths [10,3,3,3,3,2,2].",
       "zh": "三种配置的波形编码器完全相同：由 7 个 512 通道的卷积层组成，步幅为 [5,2,2,2,2,2,2]，核宽为 [10,3,3,3,3,2,2]。"
      },
      {
       "id": "s-II-E-2-5",
       "original": "The BERT encoder consists of many identical transformer blocks, whose parameters along with the parameter of the subsequent projection layer are speciﬁed in Table I.",
       "zh": "BERT 编码器由多个相同的 Transformer 块堆叠而成，其参数连同后续投影层的参数列于 Table I。"
      }
     ]
    },
    {
     "id": "p-II-E-3",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-II-E-3-1",
       "original": "BASE LARGE X-LARGE CNN Encoder strides 5, 2, 2, 2, 2, 2, 2 kernel width 10, 3, 3, 3, 3, 2, 2 channel 512 layer 12 24 48 embedding dim.",
       "zh": "（Table I 各列依次为 BASE / LARGE / X-LARGE）CNN 编码器：步幅 5, 2, 2, 2, 2, 2, 2；核宽 10, 3, 3, 3, 3, 2, 2；通道数 512；Transformer 层数分别为 12、24、48；嵌入维度"
      }
     ]
    },
    {
     "id": "p-II-E-4",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-II-E-4-1",
       "original": "768 1024 1280 inner FFN dim.",
       "zh": "分别为 768、1024、1280；FFN 内部维度"
      }
     ]
    },
    {
     "id": "p-II-E-5",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-II-E-5-1",
       "original": "3072 4096 5120 layerdrop prob 0.05 0 0 attention heads 8 16 16 Projection dim.",
       "zh": "分别为 3072、4096、5120；layerdrop 概率 0.05、0、0；注意力头数 8、16、16；投影维度"
      }
     ]
    },
    {
     "id": "p-II-E-6",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-II-E-6-1",
       "original": "256 768 1024 Num. of Params TABLE I: Model architecture summary for BASE, LARGE, and X-LARGE HuBERT models The convolutional waveform encoder generates a feature sequence at a 20ms framerate for audio sampled at 16kHz (CNN encoder down-sampling factor is 320x).",
       "zh": "分别为 256、768、1024。Table I：BASE、LARGE、X-LARGE 三种 HuBERT 模型的架构与参数量汇总。卷积波形编码器对 16kHz 采样的音频输出 20ms 帧率的特征序列（CNN 编码器的下采样倍率为 320x）。"
      },
      {
       "id": "s-II-E-6-2",
       "original": "The audio encoded features are then randomly masked as described in Section II-B.",
       "zh": "随后按第 II-B 节所述对编码后的音频特征做随机掩码。"
      },
      {
       "id": "s-II-E-6-3",
       "original": "The BERT encoder takes as input the masked sequence and outputs a feature sequence [o1, · · · , oT ].",
       "zh": "BERT 编码器以被掩码的序列为输入，输出特征序列 [o1, · · · , oT]。"
      },
      {
       "id": "s-II-E-6-4",
       "original": "The distribution over codewords is parameterized with p(k) f (c | ˜X, t) = exp(sim(A(k)ot, ec)/τ) PC c′=1 exp(sim(A(k)ot, ec′)/τ) , where A is the projection matrix, ec is the embedding for codeword c, sim(·, ·) computes the cosine similarity between two vectors, and τ scales the logit, which is set to 0.1.",
       "zh": "码元上的分布按 softmax(cos 相似度/τ) 参数化：分子为 exp(sim(A(k)ot, ec)/τ)，其中 A 是投影矩阵，ec 是码元 c 的嵌入，sim(·, ·) 计算两向量的余弦相似度，τ 用于缩放 logit，取 0.1（分母为对 c′=1 到 C 的归一化求和）。"
      },
      {
       "id": "s-II-E-6-5",
       "original": "When cluster ensembles are used, one projection matrix A(k) is applied for each clustering model k.",
       "zh": "使用簇集成时，每个聚类模型 k 各使用一个投影矩阵 A(k)。"
      }
     ]
    },
    {
     "id": "p-II-E-7",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-II-E-7-1",
       "original": "After HuBERT pre-training, We use the connectionist temporal classiﬁcation (CTC) [41] loss for ASR ﬁne-tuning of the whole model weights except the convolutional audio encoder, which remains frozen.",
       "zh": "HuBERT 预训练完成后，我们使用连接时序分类（CTC）[41] 损失对整个模型做 ASR 微调，但卷积音频编码器保持冻结。"
      },
      {
       "id": "s-II-E-7-2",
       "original": "The projection layer(s) is removed and replaced with a randomly initialized softmax layer.",
       "zh": "投影层被移除，替换为一个随机初始化的 softmax 层。"
      },
      {
       "id": "s-II-E-7-3",
       "original": "The CTC target vocabulary includes 26 English characters, a space token, an apostrophe, and a special CTC blank symbol.",
       "zh": "CTC 目标词表包括 26 个英文字母、一个空格 token、一个撇号，以及 CTC 专用的空白（blank）符号。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-III",
   "num": "III",
   "level": 1,
   "page": 3,
   "title": {
    "original": "RELATED WORK",
    "zh": "相关工作"
   },
   "blocks": [
    {
     "id": "p-III-1",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-III-1-1",
       "original": "We discuss recent studies on self-supervised speech representation learning by grouping them by training objective.",
       "zh": "下面按训练目标对近期自监督语音表示学习的研究分类讨论。"
      },
      {
       "id": "s-III-1-2",
       "original": "The earliest line of work learns representations by postulating a generative model for speech with latent variables, which are assumed to capture the relevant phonetic information.",
       "zh": "最早的一系工作为语音假设一个带隐变量的生成模型，并假定这些隐变量捕捉了相关的音素信息，以此学习表示。"
      },
      {
       "id": "s-III-1-3",
       "original": "Training of these models amounts to likelihood maximization.",
       "zh": "这些模型的训练等价于似然最大化。"
      },
      {
       "id": "s-III-1-4",
       "original": "Different latent structures have been applied to encode the prior assumption, such as continuous [29], discrete [31], [42], or sequential [28], [30], [32], [33], [43].",
       "zh": "人们用过不同的隐变量结构来编码先验假设，例如连续型 [29]、离散型 [31]、[42] 或序列型 [28]、[30]、[32]、[33]、[43]。"
      }
     ]
    },
    {
     "id": "p-III-2",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-III-2-1",
       "original": "Prediction-based self-supervised learning has gathered increasing interests recently, where a model is tasked to predict the content of the unseen regions [4], [44]–[50] or to contrast the target unseen frame with randomly sampled ones [1]– [3], [6].",
       "zh": "预测式自监督学习近来受到越来越多关注：让模型预测不可见区域的内容 [4]、[44]–[50]，或把目标不可见帧与随机采样的帧做对比 [1]–[3]、[6]。"
      },
      {
       "id": "s-III-2-2",
       "original": "Some models combine both the predictive and the contrastive losses [5], [51].",
       "zh": "有些模型同时使用预测损失和对比损失 [5]、[51]。"
      },
      {
       "id": "s-III-2-3",
       "original": "These objectives can usually be interpreted as mutual information maximization [52].",
       "zh": "这些目标通常可以被解释为互信息最大化 [52]。"
      },
      {
       "id": "s-III-2-4",
       "original": "Other objectives do not belong to these categories, for example, [53].",
       "zh": "还有一些目标不属于上述类别，例如 [53]。"
      }
     ]
    },
    {
     "id": "p-III-3",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-III-3-1",
       "original": "This work is most related to DiscreteBERT [51]: both HuBERT and DiscreteBERT predict discrete targets of masked regions.",
       "zh": "本工作与 DiscreteBERT [51] 最为相关：HuBERT 和 DiscreteBERT 都预测被掩码区域的离散目标。"
      },
      {
       "id": "s-III-3-2",
       "original": "However, there are several crucial differences.",
       "zh": "但二者存在几个关键差异。"
      },
      {
       "id": "s-III-3-3",
       "original": "First, instead of taking quantized units as input, HuBERT takes raw waveforms as input to pass as much information as possible to the transformer layers, which was shown to be important in [6].",
       "zh": "第一，HuBERT 不以量化单元为输入，而是以原始波形为输入，把尽可能多的信息传给 Transformer 层——[6] 已证明这一点很重要。"
      },
      {
       "id": "s-III-3-4",
       "original": "Furthermore, in the experiment section, we show that our model, with simple k-means targets, can achieve better performance than DiscreteBERT that uses vq-wav2vec [5] learned units.",
       "zh": "此外，在实验部分我们表明：即使只用简单的 k-means 目标，我们的模型也能超过使用 vq-wav2vec [5] 学习单元的 DiscreteBERT。"
      },
      {
       "id": "s-III-3-5",
       "original": "Second, we also present many techniques to improve teacher quality instead of using a single ﬁxed teacher as done in DiscreteBERT.",
       "zh": "第二，我们还提出了多种提升教师质量的技术，而不像 DiscreteBERT 那样只使用单一的固定教师。"
      }
     ]
    },
    {
     "id": "p-III-4",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-III-4-1",
       "original": "HuBERT is also related to wav2vec 2.0 [6].",
       "zh": "HuBERT 与 wav2vec 2.0 [6] 也密切相关。"
      },
      {
       "id": "s-III-4-2",
       "original": "However, the latter employs a contrastive loss that requires careful design of where to sample negative frames from, an auxiliary diversity loss to encourage the discrete unit usage, and demands a proper Gumbel-softmax temperature annealing schedule.",
       "zh": "然而后者采用对比损失：需要精心设计从何处采样负帧、需要一个鼓励离散单元使用的辅助多样性损失、还需要一套恰当的 Gumbel-softmax 温度退火计划。"
      },
      {
       "id": "s-III-4-3",
       "original": "In addition, it only explores quantizing the waveform encoder output, which may not be the best feature for quantization due to the limited capacity of the convolutional encoder, as suggested by our ablation studies in Figure 2.",
       "zh": "此外，它只探索了对波形编码器输出做量化；而正如我们在 Figure 2 的消融研究所示，卷积编码器容量有限，其输出未必是最适合量化的特征。"
      },
      {
       "id": "s-III-4-4",
       "original": "Concretely, our proposed method adopts a more direct predictive loss by separating the acoustic unit discovery step from the masked prediction representation learning phase and achieves the stateof-the-art results that match or outperform wav2vec 2.0 on different ﬁne-tuning scales.",
       "zh": "具体而言，我们的方法把声学单元发现步骤与掩码预测表示学习阶段解耦，采用更直接的预测损失，在不同微调规模上都取得了与 wav2vec 2.0 持平或更优的最先进结果。"
      }
     ]
    },
    {
     "id": "p-III-5",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-III-5-1",
       "original": "Finally, the idea of iterative reﬁnement target labels is similar to iterative pseudo labeling for semi-supervised ASR [12], [54], which leverages an improving student model to generate better pseudo-labels for the next iteration of training.",
       "zh": "最后，迭代精炼目标标签的思路与半监督 ASR 中的迭代伪标注 [12]、[54] 相似：后者利用不断改进的学生模型为下一轮训练生成更好的伪标签。"
      },
      {
       "id": "s-III-5-2",
       "original": "The HuBERT approach can be seen as extending this method to the self-supervised setup with a masked prediction loss.",
       "zh": "HuBERT 方法可以看作是把这一思路扩展到带掩码预测损失的自监督设定中。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-IV",
   "num": "IV",
   "level": 1,
   "page": 4,
   "title": {
    "original": "EXPERIMENTAL DETAILS",
    "zh": "实验细节"
   },
   "blocks": []
  },
  {
   "id": "sec-IV-A",
   "num": "A",
   "level": 2,
   "page": 4,
   "title": {
    "original": "Data",
    "zh": "数据"
   },
   "blocks": [
    {
     "id": "p-IV-A-1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-IV-A-1-1",
       "original": "For unsupervised pre-training, we use the full 960 hours of LibriSpeech audio [24] or 60,000 hours of Libri-light [25] audio, both of which are derived from the LibriVox project that contains English recordings of copyright-free audiobooks by volunteers from the Internet.",
       "zh": "无监督预训练使用完整的 960 小时 LibriSpeech 音频 [24]，或 60,000 小时 Libri-light 音频 [25]；两者都源自 LibriVox 项目——该项目收集了互联网志愿者朗读的无版权英文有声书。"
      }
     ]
    },
    {
     "id": "p-IV-A-2",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-IV-A-2-1",
       "original": "For supervised ﬁne-tuning, ﬁve different partitions are considered: Libri-light 10-minute, 1-hour, 10- hour splits and LibriSpeech 100-hour (train-clean-100) and 960-hour (train-clean-100, train-clean-360, train-other-500 combined) splits.",
       "zh": "监督微调考虑五种划分：Libri-light 的 10-minute、1-hour、10-hour 子集，以及 LibriSpeech 的 100-hour（train-clean-100）和 960-hour（train-clean-100、train-clean-360、train-other-500 合并）子集。"
      },
      {
       "id": "s-IV-A-2-2",
       "original": "The three Libri-light splits are subsets of the the LibriSpeech training split, and each of them contain half of the audio from train-clean-* and the other from train-other-500.",
       "zh": "三个 Libri-light 子集都是 LibriSpeech 训练集的子集，且每个子集都各取一半来自 train-clean-*、另一半来自 train-other-500。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-IV-B",
   "num": "B",
   "level": 2,
   "page": 4,
   "title": {
    "original": "Unsupervised Unit Discovery",
    "zh": "无监督单元发现"
   },
   "blocks": [
    {
     "id": "p-IV-B-1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-IV-B-1-1",
       "original": "To demonstrate the effectiveness of the proposed method on utilizing low-quality cluster assignments, we consider the k-means algorithm [55] for acoustic unit discovery by default.",
       "zh": "为展示所提方法利用低质量簇分配的能力，我们默认采用 k-means 算法 [55] 做声学单元发现。"
      },
      {
       "id": "s-IV-B-1-2",
       "original": "It is one of the most naive unit discovery models that can be treated as modeling an isotropic Gaussian with the same scalar variance for each acoustic unit.",
       "zh": "它是最朴素的单元发现模型之一，等价于为每个声学单元建模一个共享标量方差的各向同性高斯分布。"
      },
      {
       "id": "s-IV-B-1-3",
       "original": "To generate labels for the ﬁrst iteration HuBERT training over the 960 hour LibriSpeech training set, we run k-means clustering with 100 clusters on 39-dimensional MFCC features, which are 13 coefﬁcients with the ﬁrst and the second-order derivatives.",
       "zh": "为第一轮 HuBERT 训练生成标签时，我们在 960 小时 LibriSpeech 训练集的 39 维 MFCC 特征上跑 100 簇的 k-means 聚类——39 维即 13 个系数加一阶、二阶导数。"
      }
     ]
    },
    {
     "id": "p-IV-B-2",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-IV-B-2-1",
       "original": "To generate better targets for the subsequent iterations, we run k-means clustering with 500 clusters on the latent features extracted from the HuBERT model pre-trained in the previous iteration (not ﬁne-tuned) at some intermediate transformer layer.",
       "zh": "为后续迭代生成更好的目标，我们从上一轮预训练（未微调）的 HuBERT 模型的某个中间 Transformer 层抽取隐特征，在其上跑 500 簇的 k-means 聚类。"
      },
      {
       "id": "s-IV-B-2-2",
       "original": "Since the feature dimension at the transformer output is much higher than the MFCC features (768-D for HuBERT BASE), we cannot afford to load the entire 960 hour training split to the memory.",
       "zh": "由于 Transformer 输出的特征维度远高于 MFCC 特征（HuBERT BASE 为 768-D），我们无法把整个 960 小时训练集载入内存。"
      },
      {
       "id": "s-IV-B-2-3",
       "original": "So instead, we randomly sample 10% of the data for ﬁtting the k-means model.",
       "zh": "因此我们随机采样 10% 的数据来拟合 k-means 模型。"
      }
     ]
    },
    {
     "id": "p-IV-B-3",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-IV-B-3-1",
       "original": "The MiniBatchKMeans algorithm implemented in the scikit-learn [56] package is used for clustering, which ﬁts a mini-batch of samples at a time.2 We set the mini-batch size to be 10,000 frames. k-means++ [57] with 20 random starts is used for better initialization.",
       "zh": "聚类使用 scikit-learn [56] 实现的 MiniBatchKMeans 算法，每次拟合一个 mini-batch 样本（脚注 2）。mini-batch 大小设为 10,000 帧；并采用带 20 次随机重启的 k-means++ [57] 以获得更好的初始化。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-IV-C",
   "num": "C",
   "level": 2,
   "page": 4,
   "title": {
    "original": "Pre-Training",
    "zh": "预训练"
   },
   "blocks": [
    {
     "id": "p-IV-C-1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-IV-C-1-1",
       "original": "We train the BASE model for two iterations on the 960 hours of LibriSpeech audio on 32 GPUs, with a batch size of at most 87.5 seconds of audio per GPU.",
       "zh": "我们在 32 块 GPU 上、用 960 小时 LibriSpeech 音频把 BASE 模型训练两轮，每块 GPU 的 batch 大小至多为 87.5 秒音频。"
      },
      {
       "id": "s-IV-C-1-2",
       "original": "The ﬁrst iteration is trained for 250k steps, while the second iteration is trained for 400k steps using labels generated by clustering the 6-th transformer layer output of the ﬁrst iteration model.",
       "zh": "第一轮训练 250k 步；第二轮训练 400k 步，其标签来自对第一轮模型第 6 层 Transformer 输出的聚类。"
      },
      {
       "id": "s-IV-C-1-3",
       "original": "Training for 100k steps takes about 9.5 hours.",
       "zh": "训练 100k 步约需 9.5 小时。"
      }
     ]
    },
    {
     "id": "p-IV-C-2",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-IV-C-2-1",
       "original": "Next we train HuBERT LARGE and X-LARGE for one iteration on 60,000 hours of Libri-light audio on 128 and 256 GPUs, respectively, for 400k steps.",
       "zh": "接着我们在 60,000 小时 Libri-light 音频上把 HuBERT LARGE 和 X-LARGE 各训练一轮，分别使用 128 和 256 块 GPU，训练 400k 步。"
      },
      {
       "id": "s-IV-C-2-2",
       "original": "The batch sizes are reduced to 56.25 and 22.5 seconds of audio per GPU due to memory constraints.",
       "zh": "由于显存限制，每块 GPU 的 batch 大小分别缩减到 56.25 和 22.5 秒音频。"
      },
      {
       "id": "s-IV-C-2-3",
       "original": "Instead of restarting the iterative process from clustering MFCC features, we extract features from the 9- th transformer layer of the second iteration BASE HuBERT for clustering and use those labels for training these two models.",
       "zh": "我们没有重新从 MFCC 特征聚类开始迭代过程，而是从第二轮 BASE HuBERT 的第 9 层 Transformer 抽取特征做聚类，并用这些标签训练这两个模型。"
      },
      {
       "id": "s-IV-C-2-4",
       "original": "Hence, these two models can also be seen as the third iteration models.",
       "zh": "因此，这两个模型也可以看作第三轮迭代模型。"
      }
     ]
    },
    {
     "id": "p-IV-C-3",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-IV-C-3-1",
       "original": "For all HuBERT conﬁgurations, mask span is set to l = 10, and p = 8% of the waveform encoder output frames are randomly selected as mask start if not otherwise mentioned.",
       "zh": "如无特别说明，所有 HuBERT 配置的掩码片段长度设为 l = 10，并随机选取波形编码器输出帧的 p = 8% 作为掩码起点。"
      },
      {
       "id": "s-IV-C-3-2",
       "original": "Adam [58] optimizer is used with β = (0.9, 0.98), and the learning rate ramps up linearly from 0 to the peak learning rate for the ﬁrst 8% of the training steps, and then decays linearly back to zero.",
       "zh": "优化器使用 Adam [58]，β = (0.9, 0.98)；学习率先在前 8% 的训练步内从 0 线性升到峰值，再线性衰减回 0。"
      },
      {
       "id": "s-IV-C-3-3",
       "original": "The peak learning rates are 5e-4/1.5e3/3e-3 for BASE/LARGE/X-LARGE models.",
       "zh": "BASE/LARGE/X-LARGE 模型的峰值学习率分别为 5e-4/1.5e3/3e-3（原文如此；从量级看 LARGE 的 1.5e3 疑为 1.5e-3 之笔误）。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-IV-D",
   "num": "D",
   "level": 2,
   "page": 4,
   "title": {
    "original": "Supervised Fine-Tuning and Decoding",
    "zh": "监督微调与解码"
   },
   "blocks": [
    {
     "id": "p-IV-D-1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-IV-D-1-1",
       "original": "We ﬁne-tune each model on 8 GPUs on the labeled splits described in Section IV-A.",
       "zh": "我们在 8 块 GPU 上、按第 IV-A 节所述的标注子集微调每个模型。"
      },
      {
       "id": "s-IV-D-1-2",
       "original": "The batch sizes per GPU are at 2It still requires loading the entire dataset to the memory ﬁrst. most 200/80/40 seconds of audio for BASE/LARGE/X-LARGE models.",
       "zh": "（脚注 2：聚类仍需先把整个数据集载入内存。）BASE/LARGE/X-LARGE 模型每块 GPU 的 batch 大小至多为 200/80/40 秒音频。"
      },
      {
       "id": "s-IV-D-1-3",
       "original": "During ﬁne-tuning, the convolutional waveform audio encoder parameters are ﬁxed.",
       "zh": "微调期间，卷积波形音频编码器的参数固定不变。"
      },
      {
       "id": "s-IV-D-1-4",
       "original": "Like wav2vec 2.0, we introduce a freeze-step hyperparameter to control how many ﬁne-tuning steps the transformer parameters are ﬁxed, and only the new softmax matrix is trained.",
       "zh": "与 wav2vec 2.0 一样，我们引入 freeze-step 超参数，控制微调前多少步内冻结 Transformer 参数、只训练新的 softmax 矩阵。"
      },
      {
       "id": "s-IV-D-1-5",
       "original": "We sweep over peak learning rate ([1e-5, 1e-4]), learning rate schedule (percentage of steps for linear ramp-up and decay), number of ﬁne-tuning steps, freeze step, and waveform encoder output masking probability for each model size and ﬁne-tuning split combination using the word error rate (WER) on the dev-other subset as a criterion for model selection.",
       "zh": "针对每种模型规模与微调子集的组合，我们以 dev-other 子集上的词错误率（WER）作为模型选择标准，对峰值学习率（[1e-5, 1e-4]）、学习率计划（线性升温和衰减的步数占比）、微调步数、freeze step 以及波形编码器输出的掩码概率做网格搜索。"
      }
     ]
    },
    {
     "id": "p-IV-D-2",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-IV-D-2-1",
       "original": "We use the wav2letter++ [59] beam search decoder wrapped in Fairseq [60] for language model-fused decoding, which optimizes: log pCT C(Y | X) + w1 log PLM(Y ) + w2|Y |, where Y is the predicted text, |Y | is the length of the text, and w1 and w2 denote the language model weight and word score.",
       "zh": "语言模型融合解码使用 Fairseq [60] 封装的 wav2letter++ [59] 束搜索解码器，优化目标为：log pCTC(Y | X) + w1 log PLM(Y) + w2|Y |，其中 Y 是预测文本，|Y | 是文本长度，w1、w2 分别是语言模型权重和词得分。"
      },
      {
       "id": "s-IV-D-2-2",
       "original": "The decoding hyperparameters are searched with Ax, a Bayesian optimization toolkit,3.",
       "zh": "解码超参数用 Ax（一个贝叶斯优化工具包，见脚注 3：https://github.com/facebook/Ax）搜索。"
      },
      {
       "id": "s-IV-D-2-3",
       "original": "In this work, we consider both n-gram and transformer language models trained on the ofﬁcial Librispeech language modeling data.",
       "zh": "本工作同时使用在 LibriSpeech 官方语言建模数据上训练的 n-gram 语言模型和 Transformer 语言模型。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-IV-E",
   "num": "E",
   "level": 2,
   "page": 5,
   "title": {
    "original": "Metrics of Target Quality",
    "zh": "目标质量的度量"
   },
   "blocks": [
    {
     "id": "p-IV-E-1",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-IV-E-1-1",
       "original": "For analysis, we derive frame-level forced-aligned phonetic transcripts using a hybrid ASR system to measure the correlation between the k-means cluster assignments and the actual phonetic units.",
       "zh": "为便于分析，我们用一个混合式 ASR 系统生成帧级的强制对齐音素转写，用来衡量 k-means 簇分配与真实音素单元之间的相关性。"
      },
      {
       "id": "s-IV-E-1-2",
       "original": "Given aligned frame-level phonetic labels [y1, · · · , yT ] and k-means labels [z1, · · · , zT ], the joint distribution between the two variables pyz(i, j) can be estimated by counting the occurrences:",
       "zh": "给定对齐后的帧级音素标签 [y1, · · · , yT] 和 k-means 标签 [z1, · · · , zT]，两个变量的联合分布 pyz(i, j) 可以通过计数来估计："
      }
     ]
    },
    {
     "id": "eq-IV-E-1",
     "type": "equation",
     "page": 5,
     "original": "pyz(i, j) = PT t=1[yt = i ∧zt = j]"
    },
    {
     "id": "p-IV-E-2",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-IV-E-2-1",
       "original": "T , where i denotes the i-th phoneme class and j denotes the j-th k-means label class.",
       "zh": "（分母为 T，）其中 i 表示第 i 个音素类别，j 表示第 j 个 k-means 标签类别。"
      },
      {
       "id": "s-IV-E-2-2",
       "original": "The marginal probabilities are computed as pz(j) = P",
       "zh": "边缘概率按 pz(j) = Σ"
      }
     ]
    },
    {
     "id": "eq-IV-E-2",
     "type": "equation",
     "page": 5,
     "original": "i pyz(i, j) and py(j) = P"
    },
    {
     "id": "p-IV-E-3",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-IV-E-3-1",
       "original": "j pyz(i, j).",
       "zh": "j 方向求和 pyz(i, j) 计算（py(i) 同理对 i 求和）。"
      },
      {
       "id": "s-IV-E-3-2",
       "original": "For each phone class i, we further compute the most likely target label as: z∗(i) = arg max j pyz(i, j).",
       "zh": "对每个音素类别 i，进一步计算其最可能的目标标签：z*(i) = arg max j pyz(i, j)。"
      }
     ]
    },
    {
     "id": "p-IV-E-4",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-IV-E-4-1",
       "original": "Likewise, for each k-means class j, we compute the most likely phone label as: y∗(j) = arg max i pyz(i, j).",
       "zh": "类似地，对每个 k-means 类别 j，计算其最可能的音素标签：y*(j) = arg max i pyz(i, j)。"
      }
     ]
    },
    {
     "id": "p-IV-E-5",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-IV-E-5-1",
       "original": "Three metrics are considered:",
       "zh": "我们考虑三个指标："
      }
     ]
    },
    {
     "id": "p-IV-E-6",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-IV-E-6-1",
       "original": "1) phone purity (Phn Pur.):",
       "zh": "1）音素纯度（phone purity，Phn Pur.）："
      }
     ]
    },
    {
     "id": "p-IV-E-7",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-IV-E-7-1",
       "original": "Epz(j)[py|z(y∗(j) | j)], where py|z(i | j) = pyz(i, j)/pz(j) denotes the conditional probability of phone given a k-means label.",
       "zh": "Epz(j)[py|z(y*(j) | j)]，其中 py|z(i | j) = pyz(i, j)/pz(j) 是给定 k-means 标签时音素的条件概率。"
      },
      {
       "id": "s-IV-E-7-2",
       "original": "This metric measures the average phone purity within one class, which can be interpreted as the frame-level phone accuracy if we transcribe each k-means class with its 3https://github.com/facebook/Ax most likely phone label.",
       "zh": "该指标衡量同一簇内的平均音素纯度：如果把每个 k-means 簇都转写为其最可能的音素标签，它可以解释为帧级音素准确率。（脚注 3：https://github.com/facebook/Ax）"
      },
      {
       "id": "s-IV-E-7-3",
       "original": "When comparing different sets of target labels with the same number of units, higher purity indicates better quality.",
       "zh": "在比较单元数相同的两组目标标签时，纯度越高质量越好。"
      },
      {
       "id": "s-IV-E-7-4",
       "original": "However, this metric is less meaningful when comparing two sets with different numbers of units: in the extreme case where each frame is assigned a unique target label, the phone purity would be 100%.",
       "zh": "但在比较单元数不同的两组标签时，这个指标意义不大：极端情况下若每帧都被分配一个唯一标签，音素纯度会达到 100%。"
      }
     ]
    },
    {
     "id": "p-IV-E-8",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-IV-E-8-1",
       "original": "2) cluster purity (Cls Pur.):",
       "zh": "2）簇纯度（cluster purity，Cls Pur.）："
      }
     ]
    },
    {
     "id": "p-IV-E-9",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-IV-E-9-1",
       "original": "Epy(i)[pz|y(z∗(i) | i)], where pz|y(j | i) = pyz(i, j)/py(i) denotes the conditional probability of a k-means label given phone label.",
       "zh": "Epy(i)[pz|y(z*(i) | i)]，其中 pz|y(j | i) = pyz(i, j)/py(i) 是给定音素标签时 k-means 标签的条件概率。"
      },
      {
       "id": "s-IV-E-9-2",
       "original": "Cluster purity is the counterpart of phone purity, whose value would typically decrease when the number of units increases.",
       "zh": "簇纯度是音素纯度的对偶指标，其取值通常随单元数增加而下降。"
      },
      {
       "id": "s-IV-E-9-3",
       "original": "When comparing target labels with the same number of units, higher cluster purity also indicates a better quality, as frames of the same phone are more likely labeled as the same k-means label class. 3) phone-normalized mutual information (PNMI): i j pyz(i, j) log pyz(i, j)",
       "zh": "比较单元数相同的目标标签时，簇纯度越高同样说明质量越好——同一音素的帧更可能被标为同一个 k-means 簇。3）音素归一化互信息（PNMI）：对 i、j 求和 pyz(i, j) log(pyz(i, j) 与边缘概率乘积之比）。"
      }
     ]
    },
    {
     "id": "eq-IV-E-3",
     "type": "equation",
     "page": 5,
     "original": "I(y; z)"
    },
    {
     "id": "eq-IV-E-4",
     "type": "equation",
     "page": 5,
     "original": "py(i)pz(j) H(y) ="
    },
    {
     "id": "eq-IV-E-5",
     "type": "equation",
     "page": 5,
     "original": "i py(i) log py(i) = H(y) −H(y | z)"
    },
    {
     "id": "eq-IV-E-6",
     "type": "equation",
     "page": 5,
     "original": "H(y) = 1 −H(y | z)"
    },
    {
     "id": "p-IV-E-10",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-IV-E-10-1",
       "original": "H(y) .",
       "zh": "（PNMI 即互信息 I(y; z) 除以音素标签熵 H(y)。）"
      }
     ]
    },
    {
     "id": "p-IV-E-11",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-IV-E-11-1",
       "original": "PNMI is an information-theoretic metric that measures the percentage of uncertainty about the phone label y eliminated after observing the k-means label z.",
       "zh": "PNMI 是一个信息论指标，衡量观察到 k-means 标签 z 之后、关于音素标签 y 的不确定性被消除了百分之多少。"
      },
      {
       "id": "s-IV-E-11-2",
       "original": "Higher PNMI also indicates better k-means clustering quality.",
       "zh": "PNMI 越高也说明 k-means 聚类质量越好。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-V",
   "num": "V",
   "level": 1,
   "page": 5,
   "title": {
    "original": "RESULTS",
    "zh": "实验结果"
   },
   "blocks": []
  },
  {
   "id": "sec-V-A",
   "num": "A",
   "level": 2,
   "page": 5,
   "title": {
    "original": "Main Results: Low- and High-Resource Setups",
    "zh": "主要结果：低资源与高资源设定"
   },
   "blocks": [
    {
     "id": "p-V-A-1",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-V-A-1-1",
       "original": "Table II presents results for the low-resource setup, where pre-trained models are ﬁne-tuned on 10 minutes, 1 hour, 10 hours, or 100 hours of labeled data.",
       "zh": "Table II 给出低资源设定的结果：预训练模型分别在 10 minutes、1 hour、10 hours 或 100 hours 的标注数据上微调。"
      },
      {
       "id": "s-V-A-1-2",
       "original": "We include comparison with semi-supervised (iterative pseudo labeling (IPL) [12], slimIPL [54], noisy student [61]) and self-supervised approaches (DeCoAR 2.0 [50], DiscreteBERT [51], wav2vec 2.0 [6]) in the literature.",
       "zh": "我们纳入了文献中半监督方法（迭代伪标注 IPL [12]、slimIPL [54]、noisy student [61]）和自监督方法（DeCoAR 2.0 [50]、DiscreteBERT [51]、wav2vec 2.0 [6]）的对比。"
      },
      {
       "id": "s-V-A-1-3",
       "original": "Increasing the amount of unlabeled data and increasing the model size improve performance, demonstrating the scalability of the proposed HuBERT selfsupervised pre-training method.",
       "zh": "增加无标注数据量、增大模型规模都能提升性能，展示了所提 HuBERT 自监督预训练方法的可扩展性。"
      },
      {
       "id": "s-V-A-1-4",
       "original": "In the ultra-low resource setup with just 10 minutes of labeled data, the HuBERT LARGE model can achieve a WER of 4.7% on the test-clean set and 7.6% on the test-other set, which is 0.1% and 0.6% WER lower, respectively than the state-of-the-art wav2vec 2.0 LARGE model.",
       "zh": "在仅 10 minutes 标注数据的极低资源设定下，HuBERT LARGE 模型在 test-clean 上取得 4.7% 的 WER、在 test-other 上取得 7.6%，分别比当时最优的 wav2vec 2.0 LARGE 模型低 0.1% 和 0.6%。"
      },
      {
       "id": "s-V-A-1-5",
       "original": "By further scaling up the model size to 1B parameters, the HuBERT X-LARGE model can further reduce the WER to 4.6% and 6.8% on test-clean and test-other.",
       "zh": "把模型规模进一步扩大到 1B 参数后，HuBERT X-LARGE 模型在 test-clean 和 test-other 上把 WER 进一步降到 4.6% 和 6.8%。"
      },
      {
       "id": "s-V-A-1-6",
       "original": "The superiority of HuBERT persists across setups with different amounts of labeled data, with the only exceptions being ﬁnetuning on 100 hours of labeled data, where HuBERT LARGE is 0.1% WER higher than wav2vec 2.0 LARGE on test-clean, and HuBERT BASE is 0.1% WER higher than wav2vec 2.0 Model Unlabeled Data LM dev-clean dev-other test-clean test-other 10-min labeled 15.7 24.1 16.3 25.2 8.9 15.7 9.1 15.6 6.3 9.8 6.6 10.3 4.6 7.9 4.8 8.2 9.1 15.0 9.7 15.3 6.1 9.4 6.6 10.1 4.3 7.0 4.7 7.6 4.4 6.1 4.6 6.8 13.8 29.1 8.5 16.4 9.0 17.6 5.0 10.8 5.5 11.3 2.9 5.4 2.9 5.8 5.6 10.9 6.1 11.3 2.6 4.9 2.9 5.4 2.6 4.2 2.8 4.8 SlimIPL [54] 5.3 7.9 5.5 9.0 5.4 13.3 5.3 13.2 5.9 14.1 3.8 9.1 4.3 9.5 2.4 4.8 2.6 4.9 3.9 9.0 4.3 9.4 2.2 4.3 2.4 4.6 2.1 3.6 2.3 4.0 IPL [12] 3.19 6.14 3.72 7.11 SlimIPL [54] 2.2 4.6 2.7 5.2 Noisy Student [61] 3.9 8.8 4.2 8.6 5.0 12.1 4.0 10.9 4.5 12.1 2.7 7.9 3.4 8.0 1.9 4.0 2.0 4.0 2.7 7.8 3.4 8.1 1.8 3.7 2.1 3.9 1.7 3.0 1.9 3.5 TABLE II: Results and comparison with the literature on low resource setups (10-min, 1-hour, 10-hour, and 100-hour of labeled data).",
       "zh": "HuBERT 的优势在不同标注数据量的设定下都成立，仅有的例外是在 100 hours 标注数据上微调时：HuBERT LARGE 在 test-clean 上比 wav2vec 2.0 LARGE 高 0.1% WER，HuBERT BASE 在 test-other 上比 wav2vec 2.0 BASE 高 0.1% WER。（Table II：低资源设定（10-min、1-hour、10-hour、100-hour 标注数据）下与文献的对比结果；表格各列为模型、无标注数据、语言模型及 dev-clean、dev-other、test-clean、test-other 的 WER，各模型行数据与原文一致：15.7 24.1 16.3 25.2；8.9 15.7 9.1 15.6；6.3 9.8 6.6 10.3；4.6 7.9 4.8 8.2；9.1 15.0 9.7 15.3；6.1 9.4 6.6 10.1；4.3 7.0 4.7 7.6；4.4 6.1 4.6 6.8；13.8 29.1；8.5 16.4；9.0 17.6；5.0 10.8 5.5 11.3；2.9 5.4 2.9 5.8；5.6 10.9 6.1 11.3；2.6 4.9 2.9 5.4；2.6 4.2 2.8 4.8；SlimIPL [54] 5.3 7.9 5.5 9.0；5.4 13.3 5.3 13.2；5.9 14.1；3.8 9.1 4.3 9.5；2.4 4.8 2.6 4.9；3.9 9.0 4.3 9.4；2.2 4.3 2.4 4.6；2.1 3.6 2.3 4.0；IPL [12] 3.19 6.14 3.72 7.11；SlimIPL [54] 2.2 4.6 2.7 5.2；Noisy Student [61] 3.9 8.8 4.2 8.6；5.0 12.1 4.0 10.9；4.5 12.1；2.7 7.9 3.4 8.0；1.9 4.0 2.0 4.0；2.7 7.8 3.4 8.1；1.8 3.7 2.1 3.9；1.7 3.0 1.9 3.5。）"
      }
     ]
    },
    {
     "id": "p-V-A-2",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-V-A-2-1",
       "original": "BASE on test-other.",
       "zh": "（接上句，即 test-other 上的 BASE 对比。）"
      },
      {
       "id": "s-V-A-2-2",
       "original": "In addition, HuBERT also outperforms DiscreteBERT by a large margin in all setups, while both are trained with a virtually identical objective - masked prediction of discovered units.",
       "zh": "此外，HuBERT 在所有设定下都大幅超过 DiscreteBERT，尽管两者的训练目标几乎相同——都是对发现的单元做掩码预测。"
      },
      {
       "id": "s-V-A-2-3",
       "original": "The considerable performance gap suggests two things.",
       "zh": "这一巨大的性能差距说明了两点。"
      },
      {
       "id": "s-V-A-2-4",
       "original": "First, using waveform as the input to the model is crucial for avoiding loss of information during quantization.",
       "zh": "第一，用波形作为模型输入对于避免量化过程中的信息损失至关重要。"
      },
      {
       "id": "s-V-A-2-5",
       "original": "Second, while vq-wav2vec [5], the units that DiscreteBERT uses for training, may discover better units than k-means clustering of MFCC features, the proposed iterative reﬁnement beneﬁts from the improving HuBERT model and learn better units eventually.",
       "zh": "第二，尽管 DiscreteBERT 所用的 vq-wav2vec [5] 单元可能比 MFCC 特征的 k-means 聚类发现更好的单元，但我们提出的迭代精炼能受益于不断改进的 HuBERT 模型，最终学到更好的单元。"
      },
      {
       "id": "s-V-A-2-6",
       "original": "We will verify these statements in the ablation study sections.",
       "zh": "我们将在消融研究部分验证这些论断。"
      }
     ]
    },
    {
     "id": "p-V-A-3",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-V-A-3-1",
       "original": "We report results of ﬁne-tuning HuBERT models on the full 960 hours of Librispeech data and compare with the literature in Table III.",
       "zh": "我们在完整 960 hours 的 Librispeech 数据上微调 HuBERT 模型，并在 Table III 中与文献对比。"
      },
      {
       "id": "s-V-A-3-2",
       "original": "Prior studies using additional unpaired speech are classiﬁed into:",
       "zh": "使用额外不成对语音的既往研究可分为："
      }
     ]
    },
    {
     "id": "p-V-A-4",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-V-A-4-1",
       "original": "1) self-training: ﬁrst train an ASR on labeled data to annotate unlabeled speech, and then combine both golden and ASR-annotated text-speech pairs for supervised training. 2) pre-training: ﬁrst use unlabeled speech for pre-training a model, and then ﬁne-tune the model on labeled data with a supervised training objective.",
       "zh": "1）自训练：先在标注数据上训练一个 ASR 为无标注语音打标，再把黄金标注与 ASR 标注的文本-语音对合并做监督训练。2）预训练：先用无标注语音预训练模型，再用监督训练目标在标注数据上微调。"
      }
     ]
    },
    {
     "id": "p-V-A-5",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-V-A-5-1",
       "original": "3) pre-training + self-training: ﬁrst pre-train and ﬁne-tune a model, and then use it to annotate unlabeled speech for self-training combined with supervised data.",
       "zh": "3）预训练 + 自训练：先预训练并微调一个模型，再用它为无标注语音打标，与监督数据合并做自训练。"
      },
      {
       "id": "s-V-A-5-2",
       "original": "HuBERT outperforms the state-of-the-art supervised and selftraining methods and is on par with the two best pre-training results in the literature; both are based on wav2vec 2.0 contrastive learning.",
       "zh": "HuBERT 超过了最先进的监督方法和自训练方法，并与文献中最好的两个预训练结果持平——这两者都基于 wav2vec 2.0 对比学习。"
      },
      {
       "id": "s-V-A-5-3",
       "original": "In contrast, it lags behind methods combining pre-training with self-training.",
       "zh": "相比之下，它落后于「预训练 + 自训练」相结合的方法。"
      },
      {
       "id": "s-V-A-5-4",
       "original": "However, as observed in [63] and [40], we expect that HuBERT can achieve comparable or better performance after combining with self-training, since the pre-trained HuBERT model is on par or better than the pre-trained model those two methods use for pseudo labeling.",
       "zh": "不过，如 [63] 和 [40] 所观察到的，我们预期 HuBERT 与自训练结合后能取得相当或更好的性能，因为预训练的 HuBERT 模型与那两个方法用于伪标注的预训练模型持平或更好。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-V-B",
   "num": "B",
   "level": 2,
   "page": 6,
   "title": {
    "original": "Analysis: K-Means Stability",
    "zh": "分析：k-means 的稳定性"
   },
   "blocks": [
    {
     "id": "p-V-B-1",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-V-B-1-1",
       "original": "To better understand why masked prediction of discovered units is effective, we conduct a series of analyses and ablation studies.",
       "zh": "为更好地理解为什么掩码预测发现的单元是有效的，我们进行了一系列分析与消融研究。"
      },
      {
       "id": "s-V-B-1-2",
       "original": "We start with probing the stability of the k-means clustering algorithm concerning different numbers of clusters and Model Unlabeled Data LM dev-clean dev-other test-clean test-other Superivsed Conformer L [62] 1.9 3.9 Self-Training IPL [12] 1.85 3.26 2.10 4.01 Noisy Student [61] LV-60k 1.6 3.4 1.7 3.4 Pre-Training 1.6 3.0 1.8 3.3 pre-trained Conformer XXL [40] 1.5 3.0 1.5 3.1 Pre-Training + Self-Training wav2vec 2.0 + self-training [63] 1.1 2.7 1.5 3.1 pre-trained Conformer XXL + Noisy Student [40] 1.3 2.6 1.4 2.6 This work (Pre-Training) 1.5 3.0 1.9 3.3 1.5 2.5 1.8 2.9 TABLE III: Comparison with the literature on high resource setups using all 960 hours of labeled LibriSpeech data. different sizes of its training data.",
       "zh": "我们首先考察 k-means 聚类算法在不同簇数与不同训练数据量下的稳定性。（Table III：使用全部 960 小时 LibriSpeech 标注数据的高资源设定下与文献的对比；表格各列为模型、无标注数据、语言模型及 dev-clean、dev-other、test-clean、test-other 的 WER，各行数据与原文一致：监督 Conformer L [62] 1.9 3.9；自训练 IPL [12] 1.85 3.26 2.10 4.01；Noisy Student [61]（LV-60k）1.6 3.4 1.7 3.4；纯预训练 1.6 3.0 1.8 3.3；预训练 Conformer XXL [40] 1.5 3.0 1.5 3.1；预训练+自训练 wav2vec 2.0 + self-training [63] 1.1 2.7 1.5 3.1；预训练 Conformer XXL + Noisy Student [40] 1.3 2.6 1.4 2.6；本工作（纯预训练）1.5 3.0 1.9 3.3 与 1.5 2.5 1.8 2.9。）"
      },
      {
       "id": "s-V-B-1-3",
       "original": "Two features are considered: 39-dimensional MFCC features and 768-dimensional output from the 6-th transformer layer of the ﬁrst iteration HuBERT- BASE model.",
       "zh": "考虑两种特征：39 维 MFCC 特征，以及第一轮 HuBERT-BASE 模型第 6 层 Transformer 的 768 维输出。"
      },
      {
       "id": "s-V-B-1-4",
       "original": "These two features are used to produce cluster assignments for the ﬁrst and the second iteration HUBERT training, respectively.",
       "zh": "这两种特征分别用于生成第一轮和第二轮 HuBERT 训练的簇分配。"
      }
     ]
    },
    {
     "id": "p-V-B-2",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-V-B-2-1",
       "original": "For k-means clustering, we consider K = {100, 500} clusters ﬁtted on {1, 10, 100} hours of speech sampled from the LibriSpeech training split.",
       "zh": "k-means 聚类考虑 K = {100, 500} 个簇，分别拟合在从 LibriSpeech 训练集采样的 {1, 10, 100} 小时语音上。"
      },
      {
       "id": "s-V-B-2-2",
       "original": "Each combination of the hyperparameters and the features are trained for 10 trials, and the mean and standard deviation of the supervised PNMI metric on the development set (combining dev-clean and devother from LibriSpeech) is reported in Table IV.",
       "zh": "每种超参数与特征的组合训练 10 次，报告开发集（合并 LibriSpeech 的 dev-clean 和 dev-other）上监督 PNMI 指标的均值和标准差，见 Table IV。"
      },
      {
       "id": "s-V-B-2-3",
       "original": "The results show that the k-means clustering is reasonably stable given the small standard deviations across different hyperparameters and features.",
       "zh": "结果表明，在不同超参数和特征下，k-means 聚类的标准差都很小，相当稳定。"
      },
      {
       "id": "s-V-B-2-4",
       "original": "Furthermore, increasing the amount of data used for ﬁtting k-means models improves PNMI in general, but the gain is only as much as 0.012, suggesting the feasibility of using k-means for unit discovery even with limited CPU memory relative to the feature matrix size.",
       "zh": "此外，增加拟合 k-means 所用的数据量总体能提升 PNMI，但最大增益只有 0.012——这说明即使 CPU 内存相对特征矩阵大小有限，用 k-means 做单元发现也是可行的。"
      },
      {
       "id": "s-V-B-2-5",
       "original": "Lastly, the PNMI score is much higher when clustering on HuBERT features than clustering on MFCC features, and the gap is even larger with 500 clusters, indicating that iterative reﬁnement signiﬁcantly improves the clustering quality. feature PNMI (mean ± std) with K-means Training Size = MFCC 100 500 BASE-it1-L6 100 500 TABLE IV: Stability of K-means as an unsupervised unit discovery algorithm with respect to different features, numbers of clusters, and training data sizes.",
       "zh": "最后，在 HuBERT 特征上聚类的 PNMI 远高于在 MFCC 特征上聚类，且 500 簇时差距更大，说明迭代精炼显著提升了聚类质量。（Table IV：k-means 作为无监督单元发现算法的稳定性；表格为不同特征（MFCC 与 BASE-it1-L6）、簇数（100 与 500）与训练数据量（1、10、100 小时）下的 PNMI 均值 ± 标准差。）"
      },
      {
       "id": "s-V-B-2-6",
       "original": "PNMI stands for phonenormalized mutual information.",
       "zh": "PNMI 即音素归一化互信息（phone-normalized mutual information）。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-V-C",
   "num": "C",
   "level": 2,
   "page": 7,
   "title": {
    "original": "Analysis: Clustering Quality Across Layers and Iterations",
    "zh": "分析：跨层与跨迭代的聚类质量"
   },
   "blocks": [
    {
     "id": "p-V-C-1",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-V-C-1-1",
       "original": "We next study how each layer of the HuBERT model from each iteration performs when used for clustering to generate",
       "zh": "接下来研究：用每轮迭代 HuBERT 模型的各层特征做聚类来生成训练目标时，"
      }
     ]
    },
    {
     "id": "eq-V-C-1",
     "type": "equation",
     "page": 7,
     "original": "0.4"
    },
    {
     "id": "p-V-C-2",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-V-C-2-1",
       "original": "Cluster Purity (%)",
       "zh": "（图中纵轴：）簇纯度（%）"
      }
     ]
    },
    {
     "id": "eq-V-C-2",
     "type": "equation",
     "page": 7,
     "original": "0.3"
    },
    {
     "id": "eq-V-C-3",
     "type": "equation",
     "page": 7,
     "original": "0.2"
    },
    {
     "id": "eq-V-C-4",
     "type": "equation",
     "page": 7,
     "original": "0.1"
    },
    {
     "id": "p-V-C-3",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-V-C-3-1",
       "original": "0 Phone Purity (%)",
       "zh": "（纵轴刻度从 0 起）音素纯度（%）"
      }
     ]
    },
    {
     "id": "eq-V-C-5",
     "type": "equation",
     "page": 7,
     "original": "0.7"
    },
    {
     "id": "eq-V-C-6",
     "type": "equation",
     "page": 7,
     "original": "0.6"
    },
    {
     "id": "eq-V-C-7",
     "type": "equation",
     "page": 7,
     "original": "0.5"
    },
    {
     "id": "eq-V-C-8",
     "type": "equation",
     "page": 7,
     "original": "0.4"
    },
    {
     "id": "eq-V-C-9",
     "type": "equation",
     "page": 7,
     "original": "0.7"
    },
    {
     "id": "p-V-C-4",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-V-C-4-1",
       "original": "PNMI (%)",
       "zh": "PNMI（%）"
      }
     ]
    },
    {
     "id": "eq-V-C-10",
     "type": "equation",
     "page": 7,
     "original": "0.6"
    },
    {
     "id": "eq-V-C-11",
     "type": "equation",
     "page": 7,
     "original": "0.5"
    },
    {
     "id": "eq-V-C-12",
     "type": "equation",
     "page": 7,
     "original": "0.4"
    },
    {
     "id": "p-V-C-5",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-V-C-5-1",
       "original": "Layer",
       "zh": "层号（Layer）"
      }
     ]
    },
    {
     "id": "fig-V-C-1",
     "type": "figure_caption",
     "page": 7,
     "original": "Fig. 2: Quality of the cluster assignments obtained by running k-means clustering on features extracted from each transformer layer of the ﬁrst and the second iteration BASE HuBERT models.",
     "zh": "图 2：对第一轮和第二轮 BASE HuBERT 模型的各 Transformer 层特征跑 k-means 聚类，所得簇分配的质量对比。"
    },
    {
     "id": "p-V-C-6",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-V-C-6-1",
       "original": "training targets.",
       "zh": "（各层）表现如何。"
      },
      {
       "id": "s-V-C-6-2",
       "original": "The two BASE HuBERT models from the ﬁrst two iterations as described in Section IV-C are considered, which are referred to as BASE-it1 and BASE-it2, respectively.",
       "zh": "考虑第 IV-C 节所述前两轮迭代的两个 BASE HuBERT 模型，分别记为 BASE-it1 和 BASE-it2。"
      },
      {
       "id": "s-V-C-6-3",
       "original": "There are 26 features representing 12 transformer layers plus the input to the ﬁrst transformer layer (denoted as “Layer 0”) from the two HuBERT models.",
       "zh": "共 26 个特征：两个模型各自的 12 个 Transformer 层，加上第一个 Transformer 层的输入（记为「Layer 0」）。"
      },
      {
       "id": "s-V-C-6-4",
       "original": "For each feature, we ﬁt three kmeans models (K = {100, 500, 1000} clusters) on a 100 hour subset randomly sampled from the LibriSpeech training data.",
       "zh": "对每个特征，在从 LibriSpeech 训练数据随机采样的 100 hour 子集上拟合三个 k-means 模型（K = {100, 500, 1000} 个簇）。"
      },
      {
       "id": "s-V-C-6-5",
       "original": "PNMI dev-other WER (%) WER Chenone (supervised top-line) 8976 0.809 10.38 9.16 9.79 K-means {50,100} 17.81 K-means {50,100,500} 17.56 K-means on MFCC 50 0.227 18.68 31.07 94.60 100 0.243 17.86 29.57 96.37 500 0.276 18.40 33.42 97.66 K-means on BASE-it1-layer6 500 0.637 11.91 13.47 23.29 K-means on BASE-it2-layer9 500 0.704 10.75 11.59 13.79 19.26 17.64 18.46 Product K-means-{0,1,2}-100 16.73 TABLE V: The effect of the training objective and clustering quality on performance.",
       "zh": "（Table V：训练目标与聚类质量对性能的影响；列为 PNMI、dev-other WER（%）及不同 α 权重下的 WER，各行数据与原文一致：chenone（监督上线）8976 单元（按 0 1 2…编号）、PNMI 0.809、dev-other 10.38、9.16、9.79；K-means {50,100}（50100）17.81；K-means {50,100,500}（50100 加 500）17.56；MFCC 上 k-means 50 簇：0.227 18.68 31.07 94.60；100 簇：0.243 17.86 29.57 96.37；500 簇：0.276 18.40 33.42 97.66；BASE-it1-layer6 上 k-means 500 簇：0.637 11.91 13.47 23.29；BASE-it2-layer9 上 k-means 500 簇：0.704 10.75 11.59 13.79 19.26 17.64 18.46；乘积 K-means-{0,1,2}-100：16.73。）"
      },
      {
       "id": "s-V-C-6-6",
       "original": "C refers to the number of units, and α is the weight for masked frames.",
       "zh": "C 表示单元数，α 是被掩码帧损失的权重。"
      }
     ]
    },
    {
     "id": "p-V-C-7",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-V-C-7-1",
       "original": "The teacher quality measured in cluster purity, phone purity, and phone normalized mutual information (PNMI) is shown in Figure 2.",
       "zh": "以簇纯度、音素纯度和音素归一化互信息（PNMI）衡量的教师质量如 Figure 2 所示。"
      },
      {
       "id": "s-V-C-7-2",
       "original": "As a baseline, MFCC achieves (cluster purity, phone purity, PNMI) = (0.099, 0.335, 0.255) for K = 100 and (0.031, 0.356, 0.287) for K = 500.",
       "zh": "作为基线，MFCC 在 K = 100 时取得（簇纯度、音素纯度、PNMI）= (0.099, 0.335, 0.255)，K = 500 时为 (0.031, 0.356, 0.287)。"
      }
     ]
    },
    {
     "id": "p-V-C-8",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-V-C-8-1",
       "original": "Both BASE-it1 and BASE-it2 features result in signiﬁcantly better clustering quality on all three metrics than MFCC with the same number of clusters.",
       "zh": "在相同簇数下，BASE-it1 和 BASE-it2 的特征在全部三个指标上都显著优于 MFCC。"
      },
      {
       "id": "s-V-C-8-2",
       "original": "On the other hand, the best BASE-it2 feature is better than the best BASE-it1 on phone purity and PNMI, but slightly worse on cluster purity.",
       "zh": "另一方面，最好的 BASE-it2 特征在音素纯度和 PNMI 上优于最好的 BASE-it1，但在簇纯度上略逊。"
      },
      {
       "id": "s-V-C-8-3",
       "original": "Finally, we observe different trends across layers from BASE-it1 and BASE-it2: while BASE-it2 model features generally improve over layers, BASE-it1 has the best features in the middle layers around the 6th layer.",
       "zh": "最后，我们观察到 BASE-it1 与 BASE-it2 的跨层趋势不同：BASE-it2 的特征质量总体上随层数提升，而 BASE-it1 的最佳特征出现在第 6 层附近的中间层。"
      },
      {
       "id": "s-V-C-8-4",
       "original": "Interestingly, the quality of the last few layers degrades dramatically for BASE-it1, potentially because it is trained on target assignments of worse quality, and therefore the last few layers learn to mimic their bad label behavior.",
       "zh": "有趣的是，BASE-it1 最后几层的质量急剧下降，可能是因为它的训练目标本身质量较差，最后几层学会了模仿这些糟糕标签的行为。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-V-D",
   "num": "D",
   "level": 2,
   "page": 8,
   "title": {
    "original": "Ablation: The Importance of Predicting Masked Frames",
    "zh": "消融：预测被掩码帧的重要性"
   },
   "blocks": [
    {
     "id": "p-V-D-1",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-V-D-1-1",
       "original": "We present a series of ablation studies in the following sections to learn how pre-training objective, cluster quality, and hyperparameters affect the performance.",
       "zh": "下面几节给出一系列消融研究，考察预训练目标、聚类质量和超参数如何影响性能。"
      },
      {
       "id": "s-V-D-1-2",
       "original": "The models for ablation studies are pre-trained for 100k steps and ﬁne-tuned on the 10-hour libri-light split using ﬁxed hyperaprameters.",
       "zh": "消融所用模型预训练 100k 步，在 libri-light 10-hour 子集上用固定超参数微调。"
      },
      {
       "id": "s-V-D-1-3",
       "original": "MFCC-based k-means units with C=100 are used if not otherwise mentioned.",
       "zh": "如无特别说明，使用基于 MFCC 的 k-means 单元，C=100。"
      },
      {
       "id": "s-V-D-1-4",
       "original": "We report WERs on the dev-other set decoded with the n-gram language model using ﬁxed decoding hyperparameters.",
       "zh": "我们报告 dev-other 集上用 n-gram 语言模型、固定解码超参数解码得到的 WER。"
      }
     ]
    },
    {
     "id": "p-V-D-2",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-V-D-2-1",
       "original": "To understand the importance of our proposal to predict the masked frames only, we compare three conditions: 1) predicting masked frames, 2) predicting all frames, and 3) predicting unmasked frames, which can be simulated by setting α to 1.0, 0.5, and 0.0, respectively.",
       "zh": "为验证「只预测被掩码帧」这一设计的重要性，我们比较三种条件：1）只预测被掩码帧，2）预测全部帧，3）只预测未掩码帧——分别对应 α = 1.0、0.5 和 0.0。"
      },
      {
       "id": "s-V-D-2-2",
       "original": "We are comparing three k-means models learned from clustering MFCC teachers with 50, 100, 500 clusters, one learned from clustering HuBERT-BASE-it1 6th transformer layer features, and supervised labels obtained from the forced-alignment of character-based HMM models (chenone) [64].",
       "zh": "我们比较了五种目标：簇数为 50、100、500 的 MFCC k-means 教师、在 HuBERT-BASE-it1 第 6 层 Transformer 特征上聚类得到的 k-means，以及由基于字符的 HMM 模型强制对齐得到的监督标签（chenone）[64]。"
      }
     ]
    },
    {
     "id": "p-V-D-3",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-V-D-3-1",
       "original": "Results shown in Table V indicate that when learning from bad cluster assignments, computing loss only from the masked regions achieves the best performance, while the inclusion of unmasked loss results in signiﬁcantly higher WERs.",
       "zh": "Table V 的结果表明：当从糟糕的簇分配中学习时，只计算掩码区域的损失取得最好性能，而引入未掩码损失会导致 WER 显著升高。"
      },
      {
       "id": "s-V-D-3-2",
       "original": "However, as the clustering quality improves, the model would suffer less when computing losses on the unmasked frames (BASE- TABLE VI: Cluster ensembles with k-means and product k-means. it1-layer6) or even achieve better performance as the case of chenone.",
       "zh": "然而，随着聚类质量提升，在未掩码帧上计算损失的负面影响会减小（BASE-it1-layer6），甚至在 chenone 监督标签的情形下反而更好。（Table VI：k-means 与乘积 k-means 的簇集成结果。）"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-V-E",
   "num": "E",
   "level": 2,
   "page": 8,
   "title": {
    "original": "Ablation: The Effect of Cluster Ensembles",
    "zh": "消融：簇集成的作用"
   },
   "blocks": [
    {
     "id": "p-V-E-1",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-V-E-1-1",
       "original": "To understand the effect of combining multiple k-means models for generating targets, we consider two setups.",
       "zh": "为理解组合多个 k-means 模型生成目标的效果，我们考虑两种设定。"
      },
      {
       "id": "s-V-E-1-2",
       "original": "The ﬁrst one has k-means models of different numbers of clusters presented in Table V, denoted with KM-{50,100,500}.",
       "zh": "第一种是 Table V 中簇数各不相同的 k-means 模型集合，记为 KM-{50,100,500}。"
      },
      {
       "id": "s-V-E-1-3",
       "original": "The second one has k-means models trained on spliced MFCC features with a window of three; hence, each input feature is represented as a 117-dimensional vector.",
       "zh": "第二种是在窗长为 3 的拼接 MFCC 特征上训练的 k-means 模型，因此每个输入特征表示为 117 维向量。"
      },
      {
       "id": "s-V-E-1-4",
       "original": "In this second case, we apply product quantization on the spliced features, where dimensions are split into the coefﬁcients of the zeroth, ﬁrst, and second-order derivatives, with each 39-dimensional subspace quantized to a codebook of 100 entries.",
       "zh": "在第二种情形下，我们对拼接特征做乘积量化：维度按零阶、一阶、二阶导数系数切分，每个 39 维子空间量化到 100 个码词条目。"
      },
      {
       "id": "s-V-E-1-5",
       "original": "We denote these codebooks with Product k-means-{0,1,2}-100, respectively.",
       "zh": "这些码本分别记为 Product k-means-{0,1,2}-100。"
      },
      {
       "id": "s-V-E-1-6",
       "original": "By comparing the results from Table V and Table VI, it is clear that using an ensemble leads to better performance than what a single k-means clustering can achieve.",
       "zh": "对比 Table V 和 Table VI 的结果可以清楚看到：使用集成比任何单个 k-means 聚类都取得更好的性能。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-V-F",
   "num": "F",
   "level": 2,
   "page": 8,
   "title": {
    "original": "Ablation: Impact of Hyperparameters",
    "zh": "消融：超参数的影响"
   },
   "blocks": [
    {
     "id": "fig-V-F-1",
     "type": "figure_caption",
     "page": 8,
     "original": "Figure 3 and Table VII studies how hyperparameters affect HuBERT pre-training. It is shown that (1) the portion of frames selected as mask start is optimal at p =8%; (2) increasing the batch size can signiﬁcantly improve the performance; (3) training for longer consistently helps for both k-means models with C={50, 100}, and the best model achieves a WER of 11.68%. These ﬁndings are also consistent with those from BERT-like models [20]. In addition, we include a comparable result from DiscreteBERT [51] in Table VII which applies kmeans to quantize the same MFCC features into 13.5k units, used as both the output and the input to the BERT model. Besides using continuous speech input rather than discrete units, We hypothesize that HuBERT achieves signiﬁcantly better performance because its fewer k-means clusters of 100 or 500 help capture broad phonetic concepts without delving into inter/intra-speaker variation.",
     "zh": "图 3 与 Table VII 研究超参数如何影响 HuBERT 预训练。结果表明：（1）作为掩码起点的帧比例在 p =8% 时最优；（2）增大 batch 大小可以显著提升性能；（3）延长训练对 C={50, 100} 的 k-means 模型都有稳定帮助，最佳模型取得 11.68% 的 WER。这些发现与 BERT 类模型 [20] 的结论一致。此外，Table VII 还纳入了 DiscreteBERT [51] 的一个可比结果：它对同样的 MFCC 特征做 k-means 量化出 13.5k 个单元，同时作为 BERT 模型的输出和输入。除了用连续语音输入而非离散单元之外，我们推测 HuBERT 性能显著更好的另一个原因是：100 或 500 个较少的 k-means 簇有助于捕捉宽泛的音素概念，而不陷入说话人间/说话人内差异的细节。"
    }
   ]
  },
  {
   "id": "sec-VI",
   "num": "VI",
   "level": 1,
   "page": 8,
   "title": {
    "original": "CONCLUSION",
    "zh": "结论"
   },
   "blocks": [
    {
     "id": "p-VI-1",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-VI-1-1",
       "original": "This paper presents HuBERT, a speech representation learning approach that relies on predicting K-means cluster assignments of masked segments of continuous input.",
       "zh": "本文提出 HuBERT：一种语音表示学习方法，它依赖对连续输入被掩码片段的 k-means 簇分配做预测。"
      },
      {
       "id": "s-VI-1-2",
       "original": "On both the Librispeech 960 hours and the 60,000 hours Libri-light pretraining setups, HuBERT matches or outperforms the stateof-the-art systems over all ﬁne-tuning subsets of 10mins, 1h, dev-other WER (%) steps=100k K-means 50 18.68 13.65 12.40 11.82 100 17.86 12.97 12.32 11.68 [51] 13.5k 26.6 TABLE VII: Varying the number of HuBERT pre-training steps. p is set to 6.5%.",
       "zh": "在 Librispeech 960 hours 和 60,000 hours Libri-light 两种预训练设定下，HuBERT 在 10mins、1h、（Table VII：改变 HuBERT 预训练步数的结果，p 设为 6.5%；列为 steps=100k 时不同单元配置的 dev-other WER（%），各行数据与原文一致：k-means 50 簇：18.68 13.65 12.40 11.82；100 簇：17.86 12.97 12.32 11.68；[51] 13.5k 单元：26.6。）"
      }
     ]
    },
    {
     "id": "p-VI-2",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-VI-2-1",
       "original": "WER (%) WER (%)",
       "zh": "（Figure 3 左图纵轴为 WER（%）与掩码概率的关系，右图纵轴为 WER（%）。）"
      }
     ]
    },
    {
     "id": "eq-VI-1",
     "type": "equation",
     "page": 9,
     "original": "20 30 40"
    },
    {
     "id": "p-VI-3",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-VI-3-1",
       "original": "2 4.5 6.5 8 9 16 18 20 22 24",
       "zh": "（Figure 3 横轴刻度：掩码概率 p 取 2、4.5、6.5、8、9 等，GPU 数量取 16、18、20、22、24 等。）"
      }
     ]
    },
    {
     "id": "eq-VI-2",
     "type": "equation",
     "page": 9,
     "original": "8 16 32"
    },
    {
     "id": "eq-VI-3",
     "type": "equation",
     "page": 9,
     "original": "p"
    },
    {
     "id": "p-VI-4",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-VI-4-1",
       "original": "#GPUs",
       "zh": "（横轴：）GPU 数量（#GPUs）"
      }
     ]
    },
    {
     "id": "fig-VI-1",
     "type": "figure_caption",
     "page": 9,
     "original": "Fig. 3: Varying masking probability p (left) and effective batch size through the number of GPUs (right).",
     "zh": "图 3：改变掩码概率 p（左）与通过 GPU 数量改变有效 batch 大小（右）。"
    },
    {
     "id": "p-VI-5",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-VI-5-1",
       "original": "10h, 100h, and 960h.",
       "zh": "10h、100h 和 960h 全部微调子集上都达到或超过最先进系统。"
      },
      {
       "id": "s-VI-5-2",
       "original": "Furthermore, the learned representation quality improves dramatically with iteratively reﬁning K- means cluster assignments using learned latent representations for a previous iteration.",
       "zh": "此外，用上一轮学到的隐表示对 k-means 簇分配做迭代精炼，能大幅提升学到的表示质量。"
      },
      {
       "id": "s-VI-5-3",
       "original": "Finally, HuBERT scales well to a 1B transformer model showing a relative reduction in WER of up to 13% on the test-other subset.",
       "zh": "最后，HuBERT 可以良好地扩展到 1B 参数的 Transformer 模型，在 test-other 子集上取得最高 13% 的相对 WER 降低。"
      },
      {
       "id": "s-VI-5-4",
       "original": "For future work, we plan to improve the HuBERT training procedure to consist of a single phase.",
       "zh": "未来工作中，我们计划把 HuBERT 的训练流程改进为单一阶段。"
      },
      {
       "id": "s-VI-5-5",
       "original": "Furthermore, given the high quality of its representations, we will consider using HuBERT pretrained representations for multiple downstream recognition and generation tasks beyond ASR.",
       "zh": "此外，鉴于其表示的高质量，我们将考虑把 HuBERT 预训练表示用于 ASR 之外的多种下游识别与生成任务。"
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
    "original": "REFERENCES",
    "zh": "REFERENCES"
   },
   "blocks": [
    {
     "id": "p-references-1",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-references-1-1",
       "original": "[1] A. v. d."
      },
      {
       "id": "s-references-1-2",
       "original": "Oord, Y."
      },
      {
       "id": "s-references-1-3",
       "original": "Li, and O."
      },
      {
       "id": "s-references-1-4",
       "original": "Vinyals, “Representation learning with contrastive predictive coding,” arXiv preprint arXiv:1807.03748, 2018."
      },
      {
       "id": "s-references-1-5",
       "original": "[2] S."
      },
      {
       "id": "s-references-1-6",
       "original": "Schneider, A."
      },
      {
       "id": "s-references-1-7",
       "original": "Baevski, R."
      },
      {
       "id": "s-references-1-8",
       "original": "Collobert, and M."
      },
      {
       "id": "s-references-1-9",
       "original": "Auli, “wav2vec: Unsupervised pre-training for speech recognition,” arXiv preprint [3] E."
      },
      {
       "id": "s-references-1-10",
       "original": "Kharitonov, M."
      },
      {
       "id": "s-references-1-11",
       "original": "Rivi`ere, G."
      },
      {
       "id": "s-references-1-12",
       "original": "Synnaeve, L."
      },
      {
       "id": "s-references-1-13",
       "original": "Wolf, P.-E."
      },
      {
       "id": "s-references-1-14",
       "original": "Mazar´e, M."
      },
      {
       "id": "s-references-1-15",
       "original": "Douze, and E."
      },
      {
       "id": "s-references-1-16",
       "original": "Dupoux, “Data augmenting contrastive learning of speech representations in the time domain,” arXiv preprint [4] Y.-A."
      },
      {
       "id": "s-references-1-17",
       "original": "Chung, W.-N."
      },
      {
       "id": "s-references-1-18",
       "original": "Hsu, H."
      },
      {
       "id": "s-references-1-19",
       "original": "Tang, and J."
      },
      {
       "id": "s-references-1-20",
       "original": "Glass, “An unsupervised autoregressive model for speech representation learning,” arXiv preprint [5] A."
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
       "original": "Baevski, S."
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
       "original": "Schneider, and M."
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
       "original": "Auli, “vq-wav2vec: Selfsupervised learning of discrete speech representations,” arXiv preprint [6] A."
      },
      {
       "id": "s-references-4-2",
       "original": "Baevski, H."
      },
      {
       "id": "s-references-4-3",
       "original": "Zhou, A."
      },
      {
       "id": "s-references-4-4",
       "original": "Mohamed, and M."
      },
      {
       "id": "s-references-4-5",
       "original": "Auli, “wav2vec 2.0: A framework for self-supervised learning of speech representations,” arXiv [7] G."
      },
      {
       "id": "s-references-4-6",
       "original": "Zavaliagkos and T."
      },
      {
       "id": "s-references-4-7",
       "original": "Colthurst, “Utilizing untranscribed training data to improve performance,” in DARPA Broadcast News Transcription and Understanding Workshop, 1998."
      },
      {
       "id": "s-references-4-8",
       "original": "[8] J."
      },
      {
       "id": "s-references-4-9",
       "original": "Ma, S."
      },
      {
       "id": "s-references-4-10",
       "original": "Matsoukas, O."
      },
      {
       "id": "s-references-4-11",
       "original": "Kimball, and R."
      },
      {
       "id": "s-references-4-12",
       "original": "Schwartz, “Unsupervised training on large amounts of broadcast news data,” in ICASSP, 2006."
      },
      {
       "id": "s-references-4-13",
       "original": "[9] J."
      },
      {
       "id": "s-references-4-14",
       "original": "Kahn, A."
      },
      {
       "id": "s-references-4-15",
       "original": "Lee, and A."
      },
      {
       "id": "s-references-4-16",
       "original": "Hannun, “Self-training for end-to-end speech recognition,” in ICASSP, 2020."
      },
      {
       "id": "s-references-4-17",
       "original": "[10] W.-N."
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
       "original": "Hsu, A."
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
       "original": "Lee, G."
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
       "original": "Synnaeve, and A."
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
       "original": "Hannun, “Semisupervised speech recognition via local prior matching,” arXiv preprint [11] A."
      },
      {
       "id": "s-references-8-2",
       "original": "Xiao, C."
      },
      {
       "id": "s-references-8-3",
       "original": "Fuegen, and A."
      },
      {
       "id": "s-references-8-4",
       "original": "Mohamed, “Contrastive semi-supervised learning for asr,” arXiv preprint arXiv:2103.05149, 2021."
      },
      {
       "id": "s-references-8-5",
       "original": "[12] Q."
      },
      {
       "id": "s-references-8-6",
       "original": "Xu, T."
      },
      {
       "id": "s-references-8-7",
       "original": "Likhomanenko, J."
      },
      {
       "id": "s-references-8-8",
       "original": "Kahn, A."
      },
      {
       "id": "s-references-8-9",
       "original": "Hannun, G."
      },
      {
       "id": "s-references-8-10",
       "original": "Synnaeve, and R."
      },
      {
       "id": "s-references-8-11",
       "original": "Collobert, “Iterative pseudo-labeling for speech recognition,” arXiv [13] M."
      },
      {
       "id": "s-references-8-12",
       "original": "Caron, I."
      },
      {
       "id": "s-references-8-13",
       "original": "Misra, J."
      },
      {
       "id": "s-references-8-14",
       "original": "Mairal, P."
      },
      {
       "id": "s-references-8-15",
       "original": "Goyal, P."
      },
      {
       "id": "s-references-8-16",
       "original": "Bojanowski, and A."
      },
      {
       "id": "s-references-8-17",
       "original": "Joulin, “Unsupervised learning of visual features by contrasting cluster assignments,” CoRR, vol. abs/2006.09882, 2020."
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
       "original": "[14] X."
      },
      {
       "id": "s-references-9-2",
       "original": "Chen and K."
      },
      {
       "id": "s-references-9-3",
       "original": "He, “Exploring simple siamese representation learning,” CoRR, vol. abs/2011.10566, 2020."
      },
      {
       "id": "s-references-9-4",
       "original": "[15] J."
      },
      {
       "id": "s-references-9-5",
       "original": "Grill, F."
      },
      {
       "id": "s-references-9-6",
       "original": "Strub, F."
      },
      {
       "id": "s-references-9-7",
       "original": "Altch´e, C."
      },
      {
       "id": "s-references-9-8",
       "original": "Tallec, P."
      },
      {
       "id": "s-references-9-9",
       "original": "H."
      },
      {
       "id": "s-references-9-10",
       "original": "Richemond, E."
      },
      {
       "id": "s-references-9-11",
       "original": "Buchatskaya, C."
      }
     ]
    },
    {
     "id": "tb-references-10",
     "type": "table_body",
     "page": 9,
     "original": "Doersch, B.\n´A.\nPires, Z.\nD.\nGuo, M.\nG.\nAzar, B.",
     "cells": 7
    },
    {
     "id": "p-references-17",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-references-17-1",
       "original": "Piot, K."
      },
      {
       "id": "s-references-17-2",
       "original": "Kavukcuoglu, R."
      },
      {
       "id": "s-references-17-3",
       "original": "Munos, and M."
      },
      {
       "id": "s-references-17-4",
       "original": "Valko, “Bootstrap your own latent: A new approach to self-supervised learning,” CoRR, vol. abs/2006.07733, 2020."
      },
      {
       "id": "s-references-17-5",
       "original": "[16] T."
      },
      {
       "id": "s-references-17-6",
       "original": "B."
      },
      {
       "id": "s-references-17-7",
       "original": "Brown, B."
      },
      {
       "id": "s-references-17-8",
       "original": "Mann, N."
      },
      {
       "id": "s-references-17-9",
       "original": "Ryder, M."
      },
      {
       "id": "s-references-17-10",
       "original": "Subbiah, J."
      },
      {
       "id": "s-references-17-11",
       "original": "Kaplan, P."
      },
      {
       "id": "s-references-17-12",
       "original": "Dhariwal, A."
      },
      {
       "id": "s-references-17-13",
       "original": "Neelakantan, P."
      },
      {
       "id": "s-references-17-14",
       "original": "Shyam, G."
      },
      {
       "id": "s-references-17-15",
       "original": "Sastry, A."
      },
      {
       "id": "s-references-17-16",
       "original": "Askell, S."
      },
      {
       "id": "s-references-17-17",
       "original": "Agarwal, A."
      },
      {
       "id": "s-references-17-18",
       "original": "HerbertVoss, G."
      },
      {
       "id": "s-references-17-19",
       "original": "Krueger, T."
      },
      {
       "id": "s-references-17-20",
       "original": "Henighan, R."
      },
      {
       "id": "s-references-17-21",
       "original": "Child, A."
      },
      {
       "id": "s-references-17-22",
       "original": "Ramesh, D."
      },
      {
       "id": "s-references-17-23",
       "original": "M."
      },
      {
       "id": "s-references-17-24",
       "original": "Ziegler, J."
      },
      {
       "id": "s-references-17-25",
       "original": "Wu, C."
      },
      {
       "id": "s-references-17-26",
       "original": "Winter, C."
      },
      {
       "id": "s-references-17-27",
       "original": "Hesse, M."
      },
      {
       "id": "s-references-17-28",
       "original": "Chen, E."
      },
      {
       "id": "s-references-17-29",
       "original": "Sigler, M."
      },
      {
       "id": "s-references-17-30",
       "original": "Litwin, S."
      },
      {
       "id": "s-references-17-31",
       "original": "Gray, B."
      },
      {
       "id": "s-references-17-32",
       "original": "Chess, J."
      },
      {
       "id": "s-references-17-33",
       "original": "Clark, C."
      },
      {
       "id": "s-references-17-34",
       "original": "Berner, S."
      },
      {
       "id": "s-references-17-35",
       "original": "McCandlish, A."
      },
      {
       "id": "s-references-17-36",
       "original": "Radford, I."
      },
      {
       "id": "s-references-17-37",
       "original": "Sutskever, and D."
      },
      {
       "id": "s-references-17-38",
       "original": "Amodei, “Language models are few-shot learners,” CoRR, vol."
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
       "original": "abs/2005.14165, 2020."
      },
      {
       "id": "s-references-18-2",
       "original": "[17] Y."
      },
      {
       "id": "s-references-18-3",
       "original": "Liu, M."
      },
      {
       "id": "s-references-18-4",
       "original": "Ott, N."
      },
      {
       "id": "s-references-18-5",
       "original": "Goyal, J."
      },
      {
       "id": "s-references-18-6",
       "original": "Du, M."
      },
      {
       "id": "s-references-18-7",
       "original": "Joshi, D."
      },
      {
       "id": "s-references-18-8",
       "original": "Chen, O."
      },
      {
       "id": "s-references-18-9",
       "original": "Levy, M."
      },
      {
       "id": "s-references-18-10",
       "original": "Lewis, L."
      },
      {
       "id": "s-references-18-11",
       "original": "Zettlemoyer, and V."
      },
      {
       "id": "s-references-18-12",
       "original": "Stoyanov, “Roberta: A robustly optimized bert pretraining approach,” arXiv preprint arXiv:1907.11692, 2019."
      },
      {
       "id": "s-references-18-13",
       "original": "[18] M."
      },
      {
       "id": "s-references-18-14",
       "original": "Lewis, Y."
      },
      {
       "id": "s-references-18-15",
       "original": "Liu, N."
      },
      {
       "id": "s-references-18-16",
       "original": "Goyal, M."
      },
      {
       "id": "s-references-18-17",
       "original": "Ghazvininejad, A."
      },
      {
       "id": "s-references-18-18",
       "original": "Mohamed, O."
      },
      {
       "id": "s-references-18-19",
       "original": "Levy, V."
      },
      {
       "id": "s-references-18-20",
       "original": "Stoyanov, and L."
      },
      {
       "id": "s-references-18-21",
       "original": "Zettlemoyer, “Bart: Denoising sequence-to-sequence pre-training for natural language generation, translation, and comprehension,” arXiv preprint arXiv:1910.13461, 2019."
      },
      {
       "id": "s-references-18-22",
       "original": "[19] J."
      },
      {
       "id": "s-references-18-23",
       "original": "Devlin, M.-W."
      },
      {
       "id": "s-references-18-24",
       "original": "Chang, K."
      },
      {
       "id": "s-references-18-25",
       "original": "Lee, and K."
      },
      {
       "id": "s-references-18-26",
       "original": "Toutanova, “Bert: Pre-training of deep bidirectional transformers for language understanding,” arXiv [20] K."
      },
      {
       "id": "s-references-18-27",
       "original": "Clark, M.-T."
      },
      {
       "id": "s-references-18-28",
       "original": "Luong, Q."
      },
      {
       "id": "s-references-18-29",
       "original": "V."
      },
      {
       "id": "s-references-18-30",
       "original": "Le, and C."
      },
      {
       "id": "s-references-18-31",
       "original": "D."
      },
      {
       "id": "s-references-18-32",
       "original": "Manning, “Electra: Pretraining text encoders as discriminators rather than generators,” arXiv [21] M."
      },
      {
       "id": "s-references-18-33",
       "original": "E."
      },
      {
       "id": "s-references-18-34",
       "original": "Peters, M."
      },
      {
       "id": "s-references-18-35",
       "original": "Neumann, M."
      },
      {
       "id": "s-references-18-36",
       "original": "Iyyer, M."
      },
      {
       "id": "s-references-18-37",
       "original": "Gardner, C."
      },
      {
       "id": "s-references-18-38",
       "original": "Clark, K."
      },
      {
       "id": "s-references-18-39",
       "original": "Lee, and L."
      },
      {
       "id": "s-references-18-40",
       "original": "Zettlemoyer, “Deep contextualized word representations,” in NAACL, 2018."
      },
      {
       "id": "s-references-18-41",
       "original": "[22] K."
      },
      {
       "id": "s-references-18-42",
       "original": "He, H."
      },
      {
       "id": "s-references-18-43",
       "original": "Fan, Y."
      },
      {
       "id": "s-references-18-44",
       "original": "Wu, S."
      },
      {
       "id": "s-references-18-45",
       "original": "Xie, and R."
      },
      {
       "id": "s-references-18-46",
       "original": "Girshick, “Momentum contrast for unsupervised visual representation learning,” in CVPR, 2020."
      },
      {
       "id": "s-references-18-47",
       "original": "[23] M."
      },
      {
       "id": "s-references-18-48",
       "original": "Caron, P."
      },
      {
       "id": "s-references-18-49",
       "original": "Bojanowski, A."
      },
      {
       "id": "s-references-18-50",
       "original": "Joulin, and M."
      },
      {
       "id": "s-references-18-51",
       "original": "Douze, “Deep clustering for unsupervised learning of visual features,” in ECCV, 2018."
      },
      {
       "id": "s-references-18-52",
       "original": "[24] V."
      },
      {
       "id": "s-references-18-53",
       "original": "Panayotov, G."
      },
      {
       "id": "s-references-18-54",
       "original": "Chen, D."
      },
      {
       "id": "s-references-18-55",
       "original": "Povey, and S."
      },
      {
       "id": "s-references-18-56",
       "original": "Khudanpur, “Librispeech: an asr corpus based on public domain audio books,” in ICASSP, 2015."
      },
      {
       "id": "s-references-18-57",
       "original": "[25] J."
      },
      {
       "id": "s-references-18-58",
       "original": "Kahn et al., “Libri-light: A benchmark for asr with limited or no supervision,” in ICASSP, 2020."
      },
      {
       "id": "s-references-18-59",
       "original": "[26] C.-y."
      },
      {
       "id": "s-references-18-60",
       "original": "Lee and J."
      },
      {
       "id": "s-references-18-61",
       "original": "Glass, “A nonparametric bayesian approach to acoustic model discovery,” in ACL, 2012."
      },
      {
       "id": "s-references-18-62",
       "original": "[27] L."
      },
      {
       "id": "s-references-18-63",
       "original": "Ondel, L."
      },
      {
       "id": "s-references-18-64",
       "original": "Burget, and J. ˇCernock`y, “Variational inference for acoustic unit discovery,” Procedia Computer Science, vol. 81, pp. 80–86, 2016."
      },
      {
       "id": "s-references-18-65",
       "original": "[28] J."
      },
      {
       "id": "s-references-18-66",
       "original": "Ebbers, J."
      },
      {
       "id": "s-references-18-67",
       "original": "Heymann, L."
      },
      {
       "id": "s-references-18-68",
       "original": "Drude, T."
      },
      {
       "id": "s-references-18-69",
       "original": "Glarner, R."
      },
      {
       "id": "s-references-18-70",
       "original": "Haeb-Umbach, and B."
      },
      {
       "id": "s-references-18-71",
       "original": "Raj, “Hidden markov model variational autoencoder for acoustic unit discovery.” in INTERSPEECH, 2017."
      },
      {
       "id": "s-references-18-72",
       "original": "[29] W.-N."
      },
      {
       "id": "s-references-18-73",
       "original": "Hsu, Y."
      },
      {
       "id": "s-references-18-74",
       "original": "Zhang, and J."
      },
      {
       "id": "s-references-18-75",
       "original": "Glass, “Learning latent representations for speech generation and transformation,” in INTERSPEECH, 2017."
      },
      {
       "id": "s-references-18-76",
       "original": "[30] ——, “Unsupervised learning of disentangled and interpretable representations from sequential data,” in NeurIPS, 2017."
      },
      {
       "id": "s-references-18-77",
       "original": "[31] J."
      },
      {
       "id": "s-references-18-78",
       "original": "Chorowski, R."
      },
      {
       "id": "s-references-18-79",
       "original": "J."
      },
      {
       "id": "s-references-18-80",
       "original": "Weiss, S."
      },
      {
       "id": "s-references-18-81",
       "original": "Bengio, and A. van den Oord, “Unsupervised speech representation learning using wavenet autoencoders,” IEEE/ACM transactions on audio, speech, and language processing, vol. 27, no. 12, pp. 2041–2053, 2019."
      },
      {
       "id": "s-references-18-82",
       "original": "[32] S."
      },
      {
       "id": "s-references-18-83",
       "original": "Khurana, S."
      },
      {
       "id": "s-references-18-84",
       "original": "R."
      },
      {
       "id": "s-references-18-85",
       "original": "Joty, A."
      },
      {
       "id": "s-references-18-86",
       "original": "Ali, and J."
      },
      {
       "id": "s-references-18-87",
       "original": "Glass, “A factorial deep markov model for unsupervised disentangled representation learning from speech,” in ICASSP, 2019."
      },
      {
       "id": "s-references-18-88",
       "original": "[33] S."
      },
      {
       "id": "s-references-18-89",
       "original": "Khurana, A."
      },
      {
       "id": "s-references-18-90",
       "original": "Laurent, W.-N."
      },
      {
       "id": "s-references-18-91",
       "original": "Hsu, J."
      },
      {
       "id": "s-references-18-92",
       "original": "Chorowski, A."
      },
      {
       "id": "s-references-18-93",
       "original": "Lancucki, R."
      },
      {
       "id": "s-references-18-94",
       "original": "Marxer, and J."
      },
      {
       "id": "s-references-18-95",
       "original": "Glass, “A convolutional deep markov model for unsupervised speech representation learning,” arXiv preprint [34] M."
      },
      {
       "id": "s-references-18-96",
       "original": "Joshi, D."
      },
      {
       "id": "s-references-18-97",
       "original": "Chen, Y."
      },
      {
       "id": "s-references-18-98",
       "original": "Liu, D."
      },
      {
       "id": "s-references-18-99",
       "original": "S."
      },
      {
       "id": "s-references-18-100",
       "original": "Weld, L."
      },
      {
       "id": "s-references-18-101",
       "original": "Zettlemoyer, and O."
      },
      {
       "id": "s-references-18-102",
       "original": "Levy, “Spanbert: Improving pre-training by representing and predicting spans,” Transactions of the Association for Computational Linguistics, 2020."
      },
      {
       "id": "s-references-18-103",
       "original": "[35] S."
      },
      {
       "id": "s-references-18-104",
       "original": "Young, “Large vocabulary continuous speech recognition: A review,” IEEE Signal Processing Magazine, vol. 13, no. 5, pp. 45–57, 1996."
      },
      {
       "id": "s-references-18-105",
       "original": "[36] O."
      },
      {
       "id": "s-references-18-106",
       "original": "Abdel-Hamid, A.-r."
      },
      {
       "id": "s-references-18-107",
       "original": "Mohamed, H."
      },
      {
       "id": "s-references-18-108",
       "original": "Jiang, and G."
      },
      {
       "id": "s-references-18-109",
       "original": "Penn, “Applying convolutional neural networks concepts to hybrid nn-hmm model for speech recognition,” in 2012 IEEE international conference on Acoustics, speech and signal processing (ICASSP)."
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
       "original": "IEEE, 2012, pp. 4277– 4280."
      },
      {
       "id": "s-references-19-2",
       "original": "[37] D."
      },
      {
       "id": "s-references-19-3",
       "original": "Povey, “Discriminative training for large vocabulary speech recognition,” Ph.D. dissertation, University of Cambridge, 2005."
      },
      {
       "id": "s-references-19-4",
       "original": "[38] H."
      },
      {
       "id": "s-references-19-5",
       "original": "A."
      },
      {
       "id": "s-references-19-6",
       "original": "Bourlard and N."
      },
      {
       "id": "s-references-19-7",
       "original": "Morgan, Connectionist speech recognition: a hybrid approach."
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
       "original": "Springer Science & Business Media, 2012, vol. 247."
      },
      {
       "id": "s-references-20-2",
       "original": "[39] R."
      },
      {
       "id": "s-references-20-3",
       "original": "M."
      },
      {
       "id": "s-references-20-4",
       "original": "Gray and D."
      },
      {
       "id": "s-references-20-5",
       "original": "L."
      },
      {
       "id": "s-references-20-6",
       "original": "Neuhoff, “Quantization,” IEEE transactions on information theory, vol. 44, no. 6, pp. 2325–2383, 1998."
      }
     ]
    },
    {
     "id": "p-references-21",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-21-1",
       "original": "[40] Y."
      },
      {
       "id": "s-references-21-2",
       "original": "Zhang, J."
      },
      {
       "id": "s-references-21-3",
       "original": "Qin, D."
      },
      {
       "id": "s-references-21-4",
       "original": "S."
      },
      {
       "id": "s-references-21-5",
       "original": "Park, W."
      },
      {
       "id": "s-references-21-6",
       "original": "Han, C.-C."
      },
      {
       "id": "s-references-21-7",
       "original": "Chiu, R."
      },
      {
       "id": "s-references-21-8",
       "original": "Pang, Q."
      },
      {
       "id": "s-references-21-9",
       "original": "V."
      },
      {
       "id": "s-references-21-10",
       "original": "Le, and Y."
      },
      {
       "id": "s-references-21-11",
       "original": "Wu, “Pushing the limits of semi-supervised learning for automatic speech recognition,” arXiv preprint arXiv:2010.10504, 2020."
      },
      {
       "id": "s-references-21-12",
       "original": "[41] A."
      },
      {
       "id": "s-references-21-13",
       "original": "Graves, S."
      },
      {
       "id": "s-references-21-14",
       "original": "Fern´andez, F."
      },
      {
       "id": "s-references-21-15",
       "original": "Gomez, and J."
      },
      {
       "id": "s-references-21-16",
       "original": "Schmidhuber, “Connectionist temporal classiﬁcation: labelling unsegmented sequence data with recurrent neural networks,” in ICML, 2006."
      },
      {
       "id": "s-references-21-17",
       "original": "[42] A. van den Oord, O."
      },
      {
       "id": "s-references-21-18",
       "original": "Vinyals et al., “Neural discrete representation learning,” in NeurIPS, 2017."
      },
      {
       "id": "s-references-21-19",
       "original": "[43] T."
      },
      {
       "id": "s-references-21-20",
       "original": "Glarner, P."
      },
      {
       "id": "s-references-21-21",
       "original": "Hanebrink, J."
      },
      {
       "id": "s-references-21-22",
       "original": "Ebbers, and R."
      },
      {
       "id": "s-references-21-23",
       "original": "Haeb-Umbach, “Full bayesian hidden markov model variational autoencoder for acoustic unit discovery.” in INTERSPEECH, 2018."
      },
      {
       "id": "s-references-21-24",
       "original": "[44] Y.-A."
      },
      {
       "id": "s-references-21-25",
       "original": "Chung and J."
      },
      {
       "id": "s-references-21-26",
       "original": "Glass, “Generative pre-training for speech with autoregressive predictive coding,” in ICASSP, 2020."
      },
      {
       "id": "s-references-21-27",
       "original": "[45] ——, “Improved speech representations with multi-target autoregressive predictive coding,” arXiv preprint arXiv:2004.05274, 2020."
      },
      {
       "id": "s-references-21-28",
       "original": "[46] S."
      },
      {
       "id": "s-references-21-29",
       "original": "Ling, Y."
      },
      {
       "id": "s-references-21-30",
       "original": "Liu, J."
      },
      {
       "id": "s-references-21-31",
       "original": "Salazar, and K."
      },
      {
       "id": "s-references-21-32",
       "original": "Kirchhoff, “Deep contextualized acoustic representations for semi-supervised speech recognition,” in ICASSP, 2020."
      },
      {
       "id": "s-references-21-33",
       "original": "[47] W."
      },
      {
       "id": "s-references-21-34",
       "original": "Wang, Q."
      },
      {
       "id": "s-references-21-35",
       "original": "Tang, and K."
      },
      {
       "id": "s-references-21-36",
       "original": "Livescu, “Unsupervised pre-training of bidirectional speech encoders via masked reconstruction,” in ICASSP, 2020."
      },
      {
       "id": "s-references-21-37",
       "original": "[48] A."
      },
      {
       "id": "s-references-21-38",
       "original": "T."
      },
      {
       "id": "s-references-21-39",
       "original": "Liu, S.-w."
      },
      {
       "id": "s-references-21-40",
       "original": "Yang, P.-H."
      },
      {
       "id": "s-references-21-41",
       "original": "Chi, P.-c."
      },
      {
       "id": "s-references-21-42",
       "original": "Hsu, and H.-y."
      },
      {
       "id": "s-references-21-43",
       "original": "Lee, “Mockingjay: Unsupervised speech representation learning with deep bidirectional transformer encoders,” in ICASSP, 2020."
      },
      {
       "id": "s-references-21-44",
       "original": "[49] P.-H."
      },
      {
       "id": "s-references-21-45",
       "original": "Chi, P.-H."
      },
      {
       "id": "s-references-21-46",
       "original": "Chung, T.-H."
      },
      {
       "id": "s-references-21-47",
       "original": "Wu, C.-C."
      },
      {
       "id": "s-references-21-48",
       "original": "Hsieh, S.-W."
      },
      {
       "id": "s-references-21-49",
       "original": "Li, and H.-y."
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
       "original": "Lee, “Audio albert: A lite bert for self-supervised learning of audio representation,” arXiv preprint arXiv:2005.08575, 2020."
      },
      {
       "id": "s-references-22-2",
       "original": "[50] S."
      },
      {
       "id": "s-references-22-3",
       "original": "Ling and Y."
      },
      {
       "id": "s-references-22-4",
       "original": "Liu, “Decoar 2.0: Deep contextualized acoustic representations with vector quantization,” arXiv preprint arXiv:2012.06659, 2020."
      },
      {
       "id": "s-references-22-5",
       "original": "[51] A."
      },
      {
       "id": "s-references-22-6",
       "original": "Baevski, M."
      },
      {
       "id": "s-references-22-7",
       "original": "Auli, and A."
      },
      {
       "id": "s-references-22-8",
       "original": "Mohamed, “Effectiveness of self-supervised pre-training for speech recognition,” arXiv preprint arXiv:1911.03912, 2019."
      },
      {
       "id": "s-references-22-9",
       "original": "[52] Y.-H."
      },
      {
       "id": "s-references-22-10",
       "original": "H."
      },
      {
       "id": "s-references-22-11",
       "original": "Tsai, Y."
      },
      {
       "id": "s-references-22-12",
       "original": "Wu, R."
      },
      {
       "id": "s-references-22-13",
       "original": "Salakhutdinov, and L.-P."
      },
      {
       "id": "s-references-22-14",
       "original": "Morency, “Selfsupervised learning from a multi-view perspective,” arXiv preprint [53] S."
      },
      {
       "id": "s-references-22-15",
       "original": "Pascual, M."
      },
      {
       "id": "s-references-22-16",
       "original": "Ravanelli, J."
      },
      {
       "id": "s-references-22-17",
       "original": "Serr`a, A."
      },
      {
       "id": "s-references-22-18",
       "original": "Bonafonte, and Y."
      },
      {
       "id": "s-references-22-19",
       "original": "Bengio, “Learning problem-agnostic speech representations from multiple selfsupervised tasks,” in INTERSPEECH, 2019."
      },
      {
       "id": "s-references-22-20",
       "original": "[54] T."
      },
      {
       "id": "s-references-22-21",
       "original": "Likhomanenko, Q."
      },
      {
       "id": "s-references-22-22",
       "original": "Xu, J."
      },
      {
       "id": "s-references-22-23",
       "original": "Kahn, G."
      },
      {
       "id": "s-references-22-24",
       "original": "Synnaeve, and R."
      },
      {
       "id": "s-references-22-25",
       "original": "Collobert, “slimipl: Language-model-free iterative pseudo-labeling,” arXiv preprint [55] S."
      },
      {
       "id": "s-references-22-26",
       "original": "Lloyd, “Least squares quantization in pcm,” IEEE transactions on information theory, vol. 28, no. 2, pp. 129–137, 1982."
      },
      {
       "id": "s-references-22-27",
       "original": "[56] F."
      },
      {
       "id": "s-references-22-28",
       "original": "Pedregosa et al., “Scikit-learn: Machine learning in python,” the Journal of machine Learning research, 2011."
      },
      {
       "id": "s-references-22-29",
       "original": "[57] D."
      },
      {
       "id": "s-references-22-30",
       "original": "Arthur and S."
      },
      {
       "id": "s-references-22-31",
       "original": "Vassilvitskii, “k-means++: The advantages of careful seeding,” Stanford, Tech."
      },
      {
       "id": "s-references-22-32",
       "original": "Rep., 2006."
      },
      {
       "id": "s-references-22-33",
       "original": "[58] D."
      },
      {
       "id": "s-references-22-34",
       "original": "P."
      },
      {
       "id": "s-references-22-35",
       "original": "Kingma and J."
      },
      {
       "id": "s-references-22-36",
       "original": "Ba, “Adam: A method for stochastic optimization,” arXiv preprint arXiv:1412.6980, 2014."
      },
      {
       "id": "s-references-22-37",
       "original": "[59] V."
      },
      {
       "id": "s-references-22-38",
       "original": "Pratap et al., “wav2letter++: The fastest open-source speech recognition system,” arXiv preprint arXiv:1812.07625, 2018."
      },
      {
       "id": "s-references-22-39",
       "original": "[60] M."
      },
      {
       "id": "s-references-22-40",
       "original": "Ott et al., “fairseq: A fast, extensible toolkit for sequence modeling,” in NAACL, 2019."
      },
      {
       "id": "s-references-22-41",
       "original": "[61] D."
      },
      {
       "id": "s-references-22-42",
       "original": "S."
      },
      {
       "id": "s-references-22-43",
       "original": "Park, Y."
      },
      {
       "id": "s-references-22-44",
       "original": "Zhang, Y."
      },
      {
       "id": "s-references-22-45",
       "original": "Jia, W."
      },
      {
       "id": "s-references-22-46",
       "original": "Han, C.-C."
      },
      {
       "id": "s-references-22-47",
       "original": "Chiu, B."
      },
      {
       "id": "s-references-22-48",
       "original": "Li, Y."
      },
      {
       "id": "s-references-22-49",
       "original": "Wu, and Q."
      },
      {
       "id": "s-references-22-50",
       "original": "V."
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
       "original": "Le, “Improved noisy student training for automatic speech recognition,” arXiv preprint arXiv:2005.09629, 2020."
      },
      {
       "id": "s-references-23-2",
       "original": "[62] A."
      },
      {
       "id": "s-references-23-3",
       "original": "Gulati, J."
      },
      {
       "id": "s-references-23-4",
       "original": "Qin, C.-C."
      },
      {
       "id": "s-references-23-5",
       "original": "Chiu, N."
      },
      {
       "id": "s-references-23-6",
       "original": "Parmar, Y."
      },
      {
       "id": "s-references-23-7",
       "original": "Zhang, J."
      },
      {
       "id": "s-references-23-8",
       "original": "Yu, W."
      },
      {
       "id": "s-references-23-9",
       "original": "Han, S."
      },
      {
       "id": "s-references-23-10",
       "original": "Wang, Z."
      },
      {
       "id": "s-references-23-11",
       "original": "Zhang, Y."
      },
      {
       "id": "s-references-23-12",
       "original": "Wu et al., “Conformer: Convolution-augmented transformer for speech recognition,” arXiv preprint arXiv:2005.08100, 2020."
      },
      {
       "id": "s-references-23-13",
       "original": "[63] Q."
      },
      {
       "id": "s-references-23-14",
       "original": "Xu, A."
      },
      {
       "id": "s-references-23-15",
       "original": "Baevski, T."
      },
      {
       "id": "s-references-23-16",
       "original": "Likhomanenko, P."
      },
      {
       "id": "s-references-23-17",
       "original": "Tomasello, A."
      },
      {
       "id": "s-references-23-18",
       "original": "Conneau, R."
      },
      {
       "id": "s-references-23-19",
       "original": "Collobert, G."
      },
      {
       "id": "s-references-23-20",
       "original": "Synnaeve, and M."
      },
      {
       "id": "s-references-23-21",
       "original": "Auli, “Self-training and pretraining are complementary for speech recognition,” arXiv preprint [64] D."
      },
      {
       "id": "s-references-23-22",
       "original": "Le, X."
      },
      {
       "id": "s-references-23-23",
       "original": "Zhang, W."
      },
      {
       "id": "s-references-23-24",
       "original": "Zheng, C."
      },
      {
       "id": "s-references-23-25",
       "original": "F¨ugen, G."
      },
      {
       "id": "s-references-23-26",
       "original": "Zweig, and M."
      },
      {
       "id": "s-references-23-27",
       "original": "L."
      },
      {
       "id": "s-references-23-28",
       "original": "Seltzer, “From senones to chenones: Tied context-dependent graphemes for hybrid speech recognition,” in ASRU, 2019."
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
    "sentence_id": "s-abstract-2-4",
    "quote": "the consistency of the unsupervised clustering step rather than the intrinsic quality of the assigned cluster labels"
   },
   "kind": "concept",
   "title": "一致性大于正确性",
   "explanation": "这是全文最贵的洞见。HuBERT 不要求 k-means 标签「是」真正的音素，只要求同一个声音反复被分到同一个簇——标签一致，模型就能把「从上下文推断被掩码簇 id」当成有梯度的任务，语音结构自然被学进表示里。这把 MLM 式预训练对「真词表」的依赖给拆掉了。后续 w2v-BERT、WavLM 这一系列工作的共同点，都是先找一个足够稳定的离散化目标。",
   "explanation_plain": "聚类分错没关系，分得「稳」就行——学生翻来覆去预测同一套标签，语音的规律就逼它自己学会了。",
   "featured": true
  },
  {
   "id": "ann-002",
   "anchor": {
    "sentence_id": "s-abstract-2-3",
    "quote": "applying the prediction loss over the masked regions only"
   },
   "kind": "concept",
   "title": "损失只打掩码区",
   "explanation": "只对被掩码位置计损失（α=1），是 HuBERT 与「逐帧模仿伪标签」的本质分界：未掩码帧的标签是可见的，若也计损失，模型直接把 k-means 的分类面抄一遍即可，学不到任何序列结构。掩码区计损失才迫使模型做「声音版的完形填空」，声学模型（给未掩码帧编码）和语言模型（长程依赖）被迫同时成立。Table V 的消融证实：目标越差，这一点越关键。",
   "featured": true
  },
  {
   "id": "ann-003",
   "anchor": {
    "sentence_id": "s-I-4-1",
    "quote": "has been the dominant approach for utilizing unlabeled speech and audio with successful applications dating back to the mid1990s"
   },
   "kind": "comparison",
   "title": "伪标注的旧路线",
   "explanation": "作者先把伪标注（PL）这条从 1990 年代中期延续至今的主线摆上桌，再指出它两个结构性缺陷：学生被老师的天花板锁死，且整个学习被迫面向单一任务。这个对比是理解 HuBERT 价值的坐标系——它不是又一个打标循环，而是把打标对象从「文本」换成了「聚类 id」。有意思的是，论文最终也承认 PL+预训练结合最强，HuBERT 赢在当更好的底座。",
   "featured": false
  },
  {
   "id": "ann-004",
   "anchor": {
    "sentence_id": "s-I-7-4",
    "quote": "there is no prior lexicon of discrete sound units available"
   },
   "kind": "motivation",
   "title": "语音缺一本词典",
   "explanation": "这是语音自监督照搬 BERT 的根本障碍：NLP 的词表是现成的离散类别，masked word prediction 是标准分类问题；语音帧是连续向量，没有先验的「音素词表」，预测无从谈起。HuBERT 的解法是离线造一本临时词典——k-means 聚类就是音素词表的拙劣近似。理解这一点就会明白为什么 wav2vec 2.0 选择在线量化+对比，而 HuBERT 选择离线聚类+预测：两条路都在补这本词典。",
   "explanation_plain": "BERT 能玩掩码预测是因为有词表可猜；语音没有词表，就拿 k-means 现造一个。",
   "featured": true
  },
  {
   "id": "ann-005",
   "anchor": {
    "sentence_id": "s-I-8-2",
    "quote": "a BERT model consumes masked continuous speech features to predict predetermined cluster assignments"
   },
   "kind": "concept",
   "title": "连续输入离散目标",
   "explanation": "注意输入输出是不对称的：输入是被掩码的连续波形特征，输出是离散的簇 id 分类。这让模型拿到的信息量比 DiscreteBERT 那种「输入也量化」的方案大一个量级——量化只在目标侧发生，信息瓶废弃。后来 Table V 里 HuBERT 大幅甩开 DiscreteBERT，论文把这一半功劳归给波形输入，另一半归给迭代精炼的教师。",
   "featured": false
  },
  {
   "id": "ann-006",
   "anchor": {
    "sentence_id": "s-I-8-7",
    "quote": "the importance of consistency of the targets, not just their correctness"
   },
   "kind": "connection",
   "title": "与知识蒸馏同源",
   "explanation": "「目标一致性比正确性更重要」和蒸馏领域的经验异曲同工：软标签哪怕带噪，只要温度平滑、错误模式稳定，学生照样学到决策面的几何结构。HuBERT 相当于把 k-means 当成一个会犯系统性错误的固定教师；系统性偏差不可怕，随机噪声才可怕——后者会让模型去拟合不可泛化的抖动。做伪标签/重标注管线时这条原则同样成立：宁可换一个稳定的差教师，不要在每次迭代里换随机化的好教师。",
   "featured": true
  },
  {
   "id": "ann-007",
   "anchor": {
    "sentence_id": "s-II-B-3-3",
    "quote": "when α = 0, the loss is computed over the unmasked timesteps, which is similar to acoustic modeling in hybrid speech recognition systems"
   },
   "kind": "comparison",
   "title": "α=0 退化回混合式",
   "explanation": "α=0 时模型在可见帧上预测聚类标签，数学上等价于传统 HMM-DNN 混合系统的帧级声学建模，只是把 senone 换成 k-means 簇。作者点出这一点意在说明：HuBERT 的新意全部藏在 α=1 那一端。这给「HuBERT 算不算新东西」的争论提供了标尺——若把掩码去掉，它确实只是用聚类伪标签重跑了一遍几十年前的老范式；新的是掩码带来的序列建模压力。",
   "featured": false
  },
  {
   "id": "ann-008",
   "anchor": {
    "sentence_id": "s-II-D-1-2",
    "quote": "create a new generation of clusters by training a discrete latent model over the learned latent representations"
   },
   "kind": "engineering",
   "title": "自举的飞轮怎么转",
   "explanation": "迭代精炼是一个自举飞轮：MFCC 簇教出第一轮模型 → 用第一轮中间层特征重新聚类 → 更好的标签教第二轮模型。实证上(PNMI 从 0.24 级升到 0.64 级)收益巨大，但作者只跑了 2-3 轮，没有回答「何时饱和/是否会塌缩到教师偏差里」。工程上要复现这套流程，聚类那一步是纯 CPU 的 MiniBatchKMeans，与 GPU 训练交替调度，pipeline 复杂度和故障面都不小——这也是后来 SINGLE-iteration 方法被追捧的原因之一。",
   "featured": true
  },
  {
   "id": "ann-009",
   "anchor": {
    "sentence_id": "s-III-4-2",
    "quote": "requires careful design of where to sample negative frames from, an auxiliary diversity loss to encourage the discrete unit usage, and demands a proper Gumbel-softmax temperature annealing schedule"
   },
   "kind": "critique",
   "title": "对 wav2vec 2.0 的拆解",
   "explanation": "这是作者对 wav2vec 2.0 训练复杂度的集中吐槽：负样本采样策略、多样性损失、Gumbel 温度退火，三个任何一项调不好都会训崩的旋钮。HuBERT 的交叉熵+离线聚类把这些旋钮全部移除，工程可靠性显著提升——这也是为什么很多团队复现 wav2vec 2.0 失败却能复现 HuBERT。但别忘了代价被转移到了离线聚类与多轮迭代的 pipeline 上，并非真正免费。",
   "explanation_plain": "wav2vec 2.0 难训是因为旋钮太多；HuBERT 把旋钮卸了，但代价是多了个离线聚类流水线。",
   "featured": true
  },
  {
   "id": "ann-010",
   "anchor": {
    "sentence_id": "s-IV-B-1-3",
    "quote": "we run k-means clustering with 100 clusters on 39-dimensional MFCC features"
   },
   "kind": "number",
   "title": "教师可以有多糙",
   "explanation": "第一轮的教师糙得惊人：39 维 MFCC（13 维系数+一阶二阶差分）、100 个簇，PNMI 只有 0.24 上下，簇纯度约 10%——按传统标准这标签根本不能用。但配合 α=1 的掩码预测损失，它依然把 BASE 模型喂了起来。这条数字给所有「伪标签质量焦虑」提供了反例：在一致性+掩码预测的组合下，标签质量的门槛远低于直觉。当然上限也由教师决定，所以才有后面的迭代精炼。",
   "featured": true
  },
  {
   "id": "ann-011",
   "anchor": {
    "sentence_id": "s-IV-B-2-3",
    "quote": "randomly sample 10% of the data for ﬁtting the k-means model"
   },
   "kind": "engineering",
   "title": "聚类的内存妥协",
   "explanation": "768 维特征、960 小时、数千帧每秒，全量载入内存不现实，作者直接随机抽样 10% 拟合 k-means。Table IV 的稳定性实验给这个妥协兜底：训练数据从 1 小时加到 100 小时，PNMI 最多只涨 0.012。这是个很实用的工程结论——k-means 聚类对拟合数据量极度不敏感，做类似 pipeline 时完全可以激进降采样，把内存和时间的预算留给主训练。",
   "featured": false
  },
  {
   "id": "ann-012",
   "anchor": {
    "sentence_id": "s-IV-C-1-2",
    "quote": "The ﬁrst iteration is trained for 250k steps, while the second iteration is trained for 400k steps using labels generated by clustering the 6-th transformer layer output"
   },
   "kind": "engineering",
   "title": "取中间层而非末层",
   "explanation": "第二轮标签来自第一轮模型的第 6 层（共 12 层），不是最后一层。Figure 2 解释了原因：第一轮的末几层在「模仿坏标签」的压力下明显退化，中间层才是音素信息最纯的地方。迭代自训练时这是条普适经验——喂下一轮的特征不要取被上一轮目标污染最深的末层。但注意第二轮的最佳层号漂到了第 9 层，说明「取哪层」本身是随迭代漂移的超参数，并非有定论。",
   "featured": true
  },
  {
   "id": "ann-013",
   "anchor": {
    "sentence_id": "s-IV-C-2-3",
    "quote": "we extract features from the 9- th transformer layer of the second iteration BASE HuBERT for clustering and use those labels for training these two models"
   },
   "kind": "critique",
   "title": "大模型的小捷径",
   "explanation": "LARGE 和 X-LARGE 没有从 MFCC 重跑迭代流程，而是直接拿第二轮 BASE 的第 9 层特征聚类当教师——省了大量聚类和冷启动成本，但也意味着 1B 模型的上限被 90M 小模型的表示质量锚定。作者把这称作「第三轮迭代」，严格说它更像「教师蒸馏式换尺度」。若真按各自模型的中间层重新聚类，大模型或许还有空间；论文没有做这组对照，这 19%/13% 的相对提升可能仍是被低估的。",
   "featured": false
  },
  {
   "id": "ann-014",
   "anchor": {
    "sentence_id": "s-IV-D-1-4",
    "quote": "we introduce a freeze-step hyperparameter to control how many ﬁne-tuning steps the transformer parameters are ﬁxed"
   },
   "kind": "engineering",
   "title": "冻结步数这个旋钮",
   "explanation": "低资源微调时，随机初始化的 CTC 头在头几百步会输出近乎随机的梯度，若立刻回传进预训练 Transformer，几十轮内就能把好表示冲坏。freeze-step 的合理性在此：先让 softmax 头在冻结主干上校准，再整体放开。这个技巧沿用自 wav2vec 2.0，也是现在微调一切自监督语音模型的默认操作之一。代价是多一个需要和 lr、mask 概率联合扫的超参数——作者用 dev-other 做选择，每个组合都扫，成本不低。",
   "featured": false
  },
  {
   "id": "ann-015",
   "anchor": {
    "sentence_id": "s-V-A-1-4",
    "quote": "the HuBERT LARGE model can achieve a WER of 4.7% on the test-clean set and 7.6% on the test-other set"
   },
   "kind": "number",
   "title": "10 分钟标注能走多远",
   "explanation": "只用 10 分钟标注微调，test-clean 4.7% / test-other 7.6%——这个数放在 2021 年是颠覆性的：它意味着 Librispeech 级别的干净朗读语音上，标注瓶颈被自监督预训练基本消除了。但要注意分母：10 分钟标签只用来教 CTC 头对齐字符，真正重活全在 60,000 小时无标注预训练里。对实际业务,衡量低资源方法时要把「无标注数据+算力」也计入成本,这不是免费的低资源。",
   "featured": true
  },
  {
   "id": "ann-016",
   "anchor": {
    "sentence_id": "s-V-A-2-4",
    "quote": "using waveform as the input to the model is crucial for avoiding loss of information during quantization"
   },
   "kind": "critique",
   "title": "归因是否干净",
   "explanation": "作者把对 DiscreteBERT 的大幅领先归因于两点：波形输入避免量化信息损失、迭代精炼带来更好教师。方向大概率是对的,但对照并不严格——DiscreteBERT 输入输出都用同一套 13.5k 单元的 vq-wav2vec 码本，变量不止「输入连续与否」一个,码本粒度、蒸馏教师的训练量都不同。「波形输入至关重要」更多是「合理推断+消融支持」而非「隔离变量的因果结论」，引用时别把话说满。",
   "featured": false
  },
  {
   "id": "ann-017",
   "anchor": {
    "sentence_id": "s-V-B-2-5",
    "quote": "the PNMI score is much higher when clustering on HuBERT features than clustering on MFCC features"
   },
   "kind": "number",
   "title": "PNMI 跨了多少量级",
   "explanation": "MFCC 上聚类 PNMI 约 0.24-0.29，第二轮 BASE-it2 第 9 层特征上聚类达 0.704——教师与真实音素的互信息翻了近 3 倍，这是迭代精炼有效的最直接量化证据。更有意思的是 500 簇时差距更大:学到的表示撑起了更细粒度的切分。反过来要警惕：PNMI 衡量的是「与 HMM 强制对齐音素的相关性」，而 HMM 对齐本身也只是参照系,不能把 PNMI 当绝对真理去最大化。",
   "featured": false
  },
  {
   "id": "ann-018",
   "anchor": {
    "sentence_id": "s-V-C-8-4",
    "quote": "the last few layers learn to mimic their bad label behavior"
   },
   "kind": "concept",
   "title": "末层被教师污染",
   "explanation": "BASE-it1 的末几层聚类质量骤降，作者解释为「学会了模仿糟糕标签」。这揭示了预测式自监督的一个结构性现象：网络逐层从「声学细节」过渡到「任务目标本身」，末层表示越来越像教师的输出空间而非音素空间。学生要取其神而非其形,就必须从中间层抽取特征。这一现象后来在 WavLM 的层分析、SUPERB 的逐层权重里反复出现,是自监督语音模型的通用解剖学结论。",
   "featured": true
  },
  {
   "id": "ann-019",
   "anchor": {
    "sentence_id": "s-V-D-3-1",
    "quote": "computing loss only from the masked regions achieves the best performance, while the inclusion of unmasked loss results in signiﬁcantly higher WERs"
   },
   "kind": "number",
   "title": "目标差时掩码护体",
   "explanation": "Table V 的数字很直白：MFCC-100 目标下,α=1 的 dev-other WER 17.86%,α=0.5 恶化到 29.57%,α=0 崩到 96.37%——掺入未掩码损失在坏教师手中是灾难性的。但同一张表也给出反转:换监督级 chenone 目标(10.38%)后,加未掩码损失反而略好。所以「只在掩码区计损失」不是普适最优，而是「教师越差越必须」的防护机制；教师足够可信时,全序列监督的信息量优势会回来。做伪标签训练的配比设计值得对照这条曲线。",
   "featured": true
  },
  {
   "id": "ann-020",
   "anchor": {
    "sentence_id": "s-VI-5-4",
    "quote": "we plan to improve the HuBERT training procedure to consist of a single phase"
   },
   "kind": "critique",
   "title": "两段式是已知软肋",
   "explanation": "作者自己在结论里承认：「离线聚类—掩码预训练」两段式是个待拆的脚手架。每迭代一轮就要全量提特征、跑一趟 CPU k-means、再重新洗数据,流水线重、周期长、目标还是「上轮的旧模型」。后续工作沿两个方向拆它：一是 w2v-BERT 式在线化,用可学的量化器替代离线聚类;二是干脆绕开离散目标(WavLM 仍是离线教师但流程简化, BEST-RQ 用随机码本直接一阶段)。评价 HuBERT 的历史位置时,这个「未来工作」一句其实点中了它最大的工程局限。",
   "featured": true
  }
 ]
};
