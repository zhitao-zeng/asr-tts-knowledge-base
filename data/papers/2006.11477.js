// 自动生成：2006.11477 全文双语精读数据（由 tools/compile_paper.js 装配）
// 结构/原文来自 .cache/papers/2006.11477.json（tools/extract_paper.py）；
// 翻译与讲解来自 .cache/papers/zh/2006.11477/（LLM agent 撰写）。
// 改翻译请改片段后重新装配；勿手改本文件的结构与 original 字段。
globalThis.PAPER_2006_11477 = {
 "paper_id": "2006.11477",
 "model_id": "wav2vec2",
 "title": {
  "original": "wav2vec 2.0: A Framework for Self-Supervised Learning of Speech Representations",
  "zh": "wav2vec 2.0：语音表示的自监督学习框架"
 },
 "sections": [
  {
   "id": "sec-alexei-baevski",
   "num": null,
   "level": 2,
   "page": 1,
   "title": {
    "original": "Alexei Baevski",
    "zh": "Alexei Baevski（作者信息）"
   },
   "blocks": [
    {
     "id": "p-alexei-baevski-1",
     "type": "paragraph",
     "page": 1,
     "sentences": [
      {
       "id": "s-alexei-baevski-1-1",
       "original": "Henry Zhou Abdelrahman Mohamed Michael Auli {abaevski,henryzhou7,abdo,michaelauli}@fb.com",
       "zh": "作者：Henry Zhou、Abdelrahman Mohamed、Michael Auli；邮箱：{abaevski, henryzhou7, abdo, michaelauli}@fb.com。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-facebook-ai",
   "num": null,
   "level": 2,
   "page": 1,
   "title": {
    "original": "Facebook AI",
    "zh": "Facebook AI（作者单位）"
   },
   "blocks": []
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
       "original": "We show for the ﬁrst time that learning powerful representations from speech audio alone followed by ﬁne-tuning on transcribed speech can outperform the best semi-supervised methods while being conceptually simpler. wav2vec 2.0 masks the speech input in the latent space and solves a contrastive task deﬁned over a quantization of the latent representations which are jointly learned.",
       "zh": "我们首次证明：仅从语音音频中学习强大的表示，再在转写语音上微调，就能超过当时最好的半监督方法，而且在概念上更简洁。wav2vec 2.0 在潜在空间中对语音输入做掩码，并求解一个对比任务，该任务定义在一组联合学习得到的潜在表示量化（quantization）之上。"
      },
      {
       "id": "s-abstract-1-2",
       "original": "Experiments using all labeled data of Librispeech achieve 1.8/3.3 WER on the clean/other test sets.",
       "zh": "使用 Librispeech 全部标注数据的实验在 clean/other 测试集上取得 1.8/3.3 的 WER。"
      },
      {
       "id": "s-abstract-1-3",
       "original": "When lowering the amount of labeled data to one hour, wav2vec 2.0 outperforms the previous state of the art on the 100 hour subset while using 100 times less labeled data.",
       "zh": "当把标注数据量降到 1 小时时，wav2vec 2.0 在 100 小时子集上超过了此前最佳结果，而所用的标注数据只有对方的 1/100。"
      },
      {
       "id": "s-abstract-1-4",
       "original": "Using just ten minutes of labeled data and pre-training on 53k hours of unlabeled data still achieves 4.8/8.2 WER.",
       "zh": "只用 10 分钟标注数据、并在 53k 小时无标注数据上预训练，仍能取得 4.8/8.2 的 WER。"
      },
      {
       "id": "s-abstract-1-5",
       "original": "This demonstrates the feasibility of speech recognition with limited amounts of labeled data.1",
       "zh": "这证明了只用极少量标注数据实现语音识别的可行性。（脚注 1）"
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
       "original": "Neural networks beneﬁt from large quantities of labeled training data.",
       "zh": "神经网络受益于大量带标注的训练数据。"
      },
      {
       "id": "s-1-1-2",
       "original": "However, in many settings labeled data is much harder to come by than unlabeled data: current speech recognition systems require thousands of hours of transcribed speech to reach acceptable performance which is not available for the vast majority of the nearly 7,000 languages spoken worldwide [31].",
       "zh": "然而在许多场景下，标注数据比无标注数据难获得得多：当前的语音识别系统需要数千小时转写语音才能达到可接受的性能，而全世界近 7,000 种语言中的绝大多数都没有这样的资源 [31]。"
      },
      {
       "id": "s-1-1-3",
       "original": "Learning purely from labeled examples does not resemble language acquisition in humans: infants learn language by listening to adults around them - a process that requires learning good representations of speech.",
       "zh": "纯粹从带标注样本中学习并不符合人类习得语言的方式：婴儿是通过听周围成年人说话来学习语言的——这一过程要求先学到良好的语音表示。"
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
       "original": "In machine learning, self-supervised learning has emerged as a paradigm to learn general data representations from unlabeled examples and to ﬁne-tune the model on labeled data.",
       "zh": "在机器学习领域，自监督学习已经成为一种范式：先从无标注样本中学习通用的数据表示，再在标注数据上微调模型。"
      },
      {
       "id": "s-1-2-2",
       "original": "This has been particularly successful for natural language processing [43, 45, 9] and is an active research area for computer vision [20, 2, 36, 19, 6].",
       "zh": "这一思路在自然语言处理上取得了巨大成功 [43, 45, 9]，也是计算机视觉中一个活跃的研究方向 [20, 2, 36, 19, 6]。"
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
       "original": "In this paper, we present a framework for self-supervised learning of representations from raw audio data.",
       "zh": "本文提出一个从原始音频数据做表示自监督学习的框架。"
      },
      {
       "id": "s-1-3-2",
       "original": "Our approach encodes speech audio via a multi-layer convolutional neural network and then masks spans of the resulting latent speech representations [26, 56], similar to masked language modeling [9].",
       "zh": "我们的方法用多层卷积神经网络对语音音频编码，然后对得到的潜在语音表示做片段级掩码 [26, 56]，做法与掩码语言建模 [9] 类似。"
      },
      {
       "id": "s-1-3-3",
       "original": "The latent representations are fed to a Transformer network to build contextualized representations and the model is trained via a contrastive task where the true latent is to be distinguished from distractors [54, 49, 48, 28] (§ 2).",
       "zh": "这些潜在表示被送入一个 Transformer 网络以构建上下文化表示，模型通过一个对比任务来训练：需要从一组干扰项中分辨出真正的潜在表示 [54, 49, 48, 28]（§ 2）。"
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
       "original": "As part of training, we learn discrete speech units [53, 32, 7, 18] via a gumbel softmax [24, 5] to represent the latent representations in the contrastive task (Figure 1) which we ﬁnd to be more effective than non-quantized targets.",
       "zh": "作为训练的一部分，我们通过 gumbel softmax [24, 5] 学习离散的语音单元 [53, 32, 7, 18]，用于在对比任务中表示潜在表示（Figure 1）；我们发现这比不做量化的目标更有效。"
      },
      {
       "id": "s-1-4-2",
       "original": "After pre-training on unlabeled speech, the model is ﬁne-tuned 1Code and models are available at https://github.com/pytorch/fairseq Preprint.",
       "zh": "在无标注语音上预训练之后，模型再进入微调阶段（脚注 1：代码与模型见 https://github.com/pytorch/fairseq；预印本。）"
      },
      {
       "id": "s-1-4-3",
       "original": "Under review.",
       "zh": "（本稿）正在评审中。"
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
       "original": "Context representations",
       "zh": "上下文表示"
      }
     ]
    },
    {
     "id": "eq-1-1",
     "type": "equation",
     "page": 2,
     "original": "C"
    },
    {
     "id": "p-1-6",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-1-6-1",
       "original": "` Contrastive loss",
       "zh": "对比损失"
      }
     ]
    },
    {
     "id": "eq-1-2",
     "type": "equation",
     "page": 2,
     "original": "L"
    },
    {
     "id": "p-1-7",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-1-7-1",
       "original": "Transformer … …",
       "zh": "Transformer ……"
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
       "original": "Masked Quantized representations",
       "zh": "被掩码的（可见）侧与量化表示"
      }
     ]
    },
    {
     "id": "eq-1-3",
     "type": "equation",
     "page": 2,
     "original": "Q"
    },
    {
     "id": "p-1-9",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-1-9-1",
       "original": "Latent speech representations",
       "zh": "潜在语音表示"
      }
     ]
    },
    {
     "id": "eq-1-4",
     "type": "equation",
     "page": 2,
     "original": "Z"
    },
    {
     "id": "p-1-10",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-1-10-1",
       "original": "raw waveform CNN",
       "zh": "原始波形 → CNN"
      }
     ]
    },
    {
     "id": "fig-1-1",
     "type": "figure_caption",
     "page": 2,
     "original": "Figure 1: Illustration of our framework which jointly learns contextualized speech representations and an inventory of discretized speech units.",
     "zh": "图 1：我们的框架示意图，上下文化语音表示与离散语音单元库是联合学习的。"
    },
    {
     "id": "p-1-11",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-1-11-1",
       "original": "on labeled data with a Connectionist Temporal Classiﬁcation (CTC) loss [14, 4] to be used for downstream speech recognition tasks (§ 3) Previous work learned a quantization of the data followed by a contextualized representations with a self-attention model [5, 4], whereas our approach solves both problems end-to-end.",
       "zh": "预训练后，模型在标注数据上以 CTC（Connectionist Temporal Classification）损失 [14, 4] 微调，用于下游语音识别任务（§ 3）。以往的工作是先学习数据的量化，再用自注意力模型学习上下文化表示 [5, 4]；而我们的方法把两个问题端到端地一并求解。"
      },
      {
       "id": "s-1-11-2",
       "original": "Masking parts of the input with Transformer networks for speech has been explored [4, 26], but prior work relies either on a two-step pipeline or their model is trained by reconstructing the ﬁlter bank input features.",
       "zh": "用 Transformer 网络对语音输入做部分掩码此前也有人探索 [4, 26]，但先前工作要么依赖两段式流水线，要么模型是通过重建滤波器组（filter bank）输入特征来训练的。"
      },
      {
       "id": "s-1-11-3",
       "original": "Other related work includes learning representations from auto-encoding the input data [52, 11] or directly predicting future timesteps [8].",
       "zh": "其他相关工作还包括通过自编码输入数据来学习表示 [52, 11]，或直接预测未来时间步 [8]。"
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
       "original": "Our results show that jointly learning discrete speech units with contextualized representations achieves substantially better results than ﬁxed units learned in a prior step [4].",
       "zh": "我们的结果表明，把离散语音单元与上下文化表示联合学习，效果远好于之前先在单独一步中学好、随后固定不动的单元 [4]。"
      },
      {
       "id": "s-1-12-2",
       "original": "We also demonstrate the feasibility of ultra-low resource speech recognition: when using only 10 minutes of labeled data, our approach achieves word error rate (WER) 4.8/8.2 on the clean/other test sets of Librispeech.",
       "zh": "我们还证明了超低资源语音识别的可行性：只用 10 分钟标注数据，我们的方法在 Librispeech 的 clean/other 测试集上取得词错误率（WER）4.8/8.2。"
      },
      {
       "id": "s-1-12-3",
       "original": "We set a new state of the art on TIMIT phoneme recognition as well as the 100 hour clean subset of Librispeech.",
       "zh": "我们还在 TIMIT 音素识别以及 Librispeech 的 100 小时 clean 子集上刷新了最佳纪录。"
      },
      {
       "id": "s-1-12-4",
       "original": "Moreover, when we lower the amount of labeled data to just one hour, we still outperform the previous state of the art self-training method of [42] while using 100 times less labeled data and the same amount of unlabeled data.",
       "zh": "此外，当我们把标注数据量降到只有 1 小时时，我们仍然超过此前最佳的自训练方法 [42]，而且标注数据只有对方的 1/100，所用无标注数据量相同。"
      },
      {
       "id": "s-1-12-5",
       "original": "When we use all 960 hours of labeled data from Librispeech, then our model achieves 1.8/3.3 WER (§ 4, § 5).",
       "zh": "当使用 Librispeech 全部 960 小时标注数据时，我们的模型取得 1.8/3.3 的 WER（§ 4，§ 5）。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-2",
   "num": null,
   "level": 1,
   "page": 2,
   "title": {
    "original": "2",
    "zh": "2 模型"
   },
   "blocks": [
    {
     "id": "p-2-1",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-2-1-1",
       "original": "Our model is composed of a multi-layer convolutional feature encoder f : X 7→Z which takes as input raw audio X and outputs latent speech representations z1, . . . , zT for T time-steps.",
       "zh": "我们的模型由一个多层卷积特征编码器 f : X 7→ Z 组成，它以原始音频 X 为输入，输出 T 个时间步的潜在语音表示 z1, . . . , zT。"
      },
      {
       "id": "s-2-1-2",
       "original": "They are then fed to a Transformer g : Z 7→C to build representations c1, . . . , cT capturing information from the entire sequence [9, 5, 4].",
       "zh": "这些表示随后被送入一个 Transformer g : Z 7→ C，构建从整个序列中捕获信息的表示 c1, . . . , cT [9, 5, 4]。"
      },
      {
       "id": "s-2-1-3",
       "original": "The output of the feature encoder is discretized to qt with a quantization module Z 7→Q to represent the targets (Figure 1) in the self-supervised objective (§ 3.2).",
       "zh": "特征编码器的输出经由一个量化模块 Z 7→ Q 被离散化为 qt，用来表示自监督目标中的目标（Figure 1）（§ 3.2）。"
      },
      {
       "id": "s-2-1-4",
       "original": "Compared to vq-wav2vec [5], our model builds context representations over continuous speech representations and self-attention captures dependencies over the entire sequence of latent representations end-to-end.",
       "zh": "与 vq-wav2vec [5] 不同，我们的模型在连续语音表示之上构建上下文表示，并且自注意力以端到端方式捕获整条潜在表示序列上的依赖关系。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-feature-encoder",
   "num": null,
   "level": 2,
   "page": 2,
   "title": {
    "original": "Feature encoder.",
    "zh": "特征编码器"
   },
   "blocks": [
    {
     "id": "p-feature-encoder-1",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-feature-encoder-1-1",
       "original": "The encoder consists of several blocks containing a temporal convolution followed by layer normalization [1] and a GELU activation function [21].",
       "zh": "编码器由若干模块组成，每个模块包含一层时间维卷积，接层归一化（layer normalization）[1] 和 GELU 激活函数 [21]。"
      },
      {
       "id": "s-feature-encoder-1-2",
       "original": "The raw waveform input to the encoder is normalized to zero mean and unit variance.",
       "zh": "送入编码器的原始波形会被归一化为零均值、单位方差。"
      },
      {
       "id": "s-feature-encoder-1-3",
       "original": "The total stride of the encoder determines the number of time-steps T which are input to the Transformer (§ 4.2).",
       "zh": "编码器的总步幅决定了送入 Transformer 的时间步数量 T（§ 4.2）。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-contextualized-representations-w",
   "num": null,
   "level": 2,
   "page": 2,
   "title": {
    "original": "Contextualized representations with Transformers.",
    "zh": "用 Transformer 构建上下文化表示"
   },
   "blocks": [
    {
     "id": "p-contextualized-representations-w-1",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-contextualized-representations-w-1-1",
       "original": "The output of the feature encoder is fed to a context network which follows the Transformer architecture [55, 9, 33].",
       "zh": "特征编码器的输出被送入一个遵循 Transformer 架构 [55, 9, 33] 的上下文网络。"
      },
      {
       "id": "s-contextualized-representations-w-1-2",
       "original": "Instead of ﬁxed positional embeddings which encode absolute positional information, we use a convolutional layer similar to [37, 4, 57] which acts as relative positional embedding.",
       "zh": "我们不使用编码绝对位置信息的固定位置嵌入，而是采用一个类似 [37, 4, 57] 的卷积层，充当相对位置嵌入。"
      },
      {
       "id": "s-contextualized-representations-w-1-3",
       "original": "We add the output of the convolution followed by a GELU to the inputs and then apply layer normalization.",
       "zh": "我们把该卷积层（后接 GELU）的输出加到输入上，然后再做层归一化。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-quantization-module",
   "num": null,
   "level": 2,
   "page": 2,
   "title": {
    "original": "Quantization module.",
    "zh": "量化模块"
   },
   "blocks": [
    {
     "id": "p-quantization-module-1",
     "type": "paragraph",
     "page": 2,
     "sentences": [
      {
       "id": "s-quantization-module-1-1",
       "original": "For self-supervised training we discretize the output of the feature encoder z to a ﬁnite set of speech representations via product quantization [25].",
       "zh": "在自监督训练中，我们通过乘积量化（product quantization）[25] 把特征编码器的输出 z 离散化到一组有限的语音表示。"
      },
      {
       "id": "s-quantization-module-1-2",
       "original": "This choice led to good results in prior work which learned discrete units in a ﬁrst step followed by learning contextualized representations [5].",
       "zh": "这一选择在先前工作中取得了好效果：那项工作先在第一步学习离散单元，再学习上下文化表示 [5]。"
      },
      {
       "id": "s-quantization-module-1-3",
       "original": "Product quantization amounts to choosing quantized representations from multiple codebooks and concatenating them.",
       "zh": "乘积量化就是从多个码本（codebook）中各选一个量化表示，再把它们拼接起来。"
      },
      {
       "id": "s-quantization-module-1-4",
       "original": "Given G codebooks, or groups, with V entries e ∈ RV ×d/G, we choose one entry from each codebook and concatenate the resulting vectors e1, . . . , eG and apply a linear transformation Rd 7→Rf to obtain q ∈Rf.",
       "zh": "给定 G 个码本（或称分组），每个码本有 V 个条目 e ∈ R^(V×d/G)，我们从每个码本中选一个条目，把所得向量 e1, . . . , eG 拼接，再施加一个线性变换 R^d 7→ R^f，得到 q ∈ R^f。"
      }
     ]
    },
    {
     "id": "p-quantization-module-2",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-quantization-module-2-1",
       "original": "The Gumbel softmax enables choosing discrete codebook entries in a fully differentiable way [16, 24, 35].",
       "zh": "Gumbel softmax 使得以完全可微的方式选取离散码本条目成为可能 [16, 24, 35]。"
      },
      {
       "id": "s-quantization-module-2-2",
       "original": "We use the straight-through estimator [26] and setup G hard Gumbel softmax operations [24].",
       "zh": "我们使用直通估计器（straight-through estimator）[26]，并设置 G 个硬（hard）Gumbel softmax 操作 [24]。"
      },
      {
       "id": "s-quantization-module-2-3",
       "original": "The feature encoder output z is mapped to l ∈RG×V logits and the probabilities for choosing the v-th codebook entry for group g are pg,v = exp(lg,v + nv)/τ PV k=1 exp(lg,k + nk)/τ , where τ is a non-negative temperature, n = −log(−log(u)) and u are uniform samples from U(0, 1).",
       "zh": "特征编码器的输出 z 被映射为 l ∈ R^(G×V) 的 logits，为组 g 选取第 v 个码本条目的概率为 pg,v = exp(lg,v + nv)/τ ÷ Σk=1..V exp(lg,k + nk)/τ，其中 τ 是非负温度，n = −log(−log(u))，u 是从 U(0, 1) 中采样的均匀随机数。"
      },
      {
       "id": "s-quantization-module-2-4",
       "original": "During the forward pass, codeword i is chosen by i = argmaxjpg,j and in the backward pass, the true gradient of the Gumbel softmax outputs is used.",
       "zh": "前向传播中按 i = argmax_j pg,j 选取码字 i；反向传播中则使用 Gumbel softmax 输出的真实梯度。"
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
    "original": "Training",
    "zh": "3 训练"
   },
   "blocks": [
    {
     "id": "p-3-1",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-3-1-1",
       "original": "To pre-train the model we mask a certain proportion of time steps in the latent feature encoder space (§ 3.1), similar to masked language modeling in BERT [9].",
       "zh": "预训练时，我们在潜在特征编码器空间中对一定比例的时间步做掩码（§ 3.1），做法类似 BERT 中的掩码语言建模 [9]。"
      },
      {
       "id": "s-3-1-2",
       "original": "The training objective requires identifying the correct quantized latent audio representation in a set of distractors for each masked time step (§ 3.2) and the ﬁnal model is ﬁne-tuned on the labeled data (§ 3.3).",
       "zh": "训练目标要求：对每个被掩码的时间步，在一组干扰项中识别出正确的量化潜在音频表示（§ 3.2）；最终模型再在标注数据上微调（§ 3.3）。"
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
    "original": "Masking",
    "zh": "3.1 掩码"
   },
   "blocks": [
    {
     "id": "p-3-1-1",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-3-1-1-1",
       "original": "We mask a proportion of the feature encoder outputs, or time steps before feeding them to the context network and replace them with a trained feature vector shared between all masked time steps; we do not mask inputs to the quantization module.",
       "zh": "在把特征编码器的输出（即各时间步）送入上下文网络之前，我们对其一部分做掩码，并用一个在所有被掩码时间步之间共享的、经训练得到的特征向量来替换；我们不对量化模块的输入做掩码。"
      },
      {
       "id": "s-3-1-1-2",
       "original": "To mask the latent speech representations output by the encoder, we randomly sample without replacement a certain proportion p of all time steps to be starting indices and then mask the subsequent M consecutive time steps from every sampled index; spans may overlap.",
       "zh": "为了对编码器输出的潜在语音表示做掩码，我们按无放回随机采样，以某个比例 p 抽取所有时间步作为起始下标，然后从每个被采样的下标开始掩码其后连续 M 个时间步；片段之间允许重叠。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-3-2",
   "num": "3.2",
   "level": 2,
   "page": 3,
   "title": {
    "original": "Objective",
    "zh": "3.2 训练目标"
   },
   "blocks": [
    {
     "id": "p-3-2-1",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-3-2-1-1",
       "original": "During pre-training, we learn representations of speech audio by solving a contrastive task Lm which requires to identify the true quantized latent speech representation for a masked time step within a set of distractors.",
       "zh": "预训练时，我们通过求解对比任务 Lm 来学习语音音频的表示：对每个被掩码的时间步，需要在一组干扰项中识别出真正的量化潜在语音表示。"
      },
      {
       "id": "s-3-2-1-2",
       "original": "This is augmented by a codebook diversity loss Ld to encourage the model to use the codebook entries equally often.",
       "zh": "在此之上我们附加一个码本多样性损失 Ld，鼓励模型均匀地使用码本条目。"
      }
     ]
    },
    {
     "id": "p-3-2-2",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-3-2-2-1",
       "original": "L = Lm + αLd where α is a tuned hyperparameter.",
       "zh": "总目标为 L = Lm + αLd，其中 α 是一个调优得到的超参数。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-contrastive-loss",
   "num": null,
   "level": 2,
   "page": 3,
   "title": {
    "original": "Contrastive Loss.",
    "zh": "对比损失"
   },
   "blocks": [
    {
     "id": "p-contrastive-loss-1",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-contrastive-loss-1-1",
       "original": "Given context network output ct centered over masked time step t, the model needs to identify the true quantized latent speech representation qt in a set of K + 1 quantized candidate representations ˜q ∈Qt which includes qt and K distractors [23, 54].",
       "zh": "给定以被掩码时间步 t 为中心的上下文网络输出 ct，模型需要在 K + 1 个量化候选表示 q̃ ∈ Qt 中识别出真正的量化潜在语音表示 qt，其中 Qt 包含 qt 和 K 个干扰项 [23, 54]。"
      },
      {
       "id": "s-contrastive-loss-1-2",
       "original": "Distractors are uniformly sampled from other masked time steps of the same utterance.",
       "zh": "干扰项从同一条语音的其他被掩码时间步中均匀采样得到。"
      },
      {
       "id": "s-contrastive-loss-1-3",
       "original": "The loss is deﬁned as",
       "zh": "该损失定义为："
      }
     ]
    },
    {
     "id": "eq-contrastive-loss-1",
     "type": "equation",
     "page": 3,
     "original": "Lm = −log exp(sim(ct, qt)/κ) P"
    },
    {
     "id": "p-contrastive-loss-2",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-contrastive-loss-2-1",
       "original": "˜q∼Qt exp(sim(ct, ˜q)/κ) where we compute the cosine similarity sim(a, b) = aT b/∥a∥∥b∥between context representations and quantized latent speech representations [19, 6].",
       "zh": "（分母为对 q̃~Qt 求和的 exp(sim(ct, q̃)/κ)），其中我们在上下文表示与量化潜在语音表示之间计算余弦相似度 sim(a, b) = aᵀb/‖a‖‖b‖ [19, 6]。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-diversity-loss",
   "num": null,
   "level": 2,
   "page": 3,
   "title": {
    "original": "Diversity Loss.",
    "zh": "多样性损失"
   },
   "blocks": [
    {
     "id": "p-diversity-loss-1",
     "type": "paragraph",
     "page": 3,
     "sentences": [
      {
       "id": "s-diversity-loss-1-1",
       "original": "The contrastive task depends on the codebook to represent both positive and negative examples and the diversity loss Ld is designed to increase the use of the quantized codebook representations [10].",
       "zh": "对比任务依赖码本来表示正例与负例，多样性损失 Ld 的设计目的是提高量化码本表示的利用率 [10]。"
      },
      {
       "id": "s-diversity-loss-1-2",
       "original": "We encourage the equal use of the V entries in each of the G codebooks by maximizing the entropy of the averaged softmax distribution l over the codebook entries for each codebook ¯pg across a batch of utterances; the softmax disribution does not contain the gumbel noise nor a temperature:2",
       "zh": "我们鼓励 G 个码本中每个码本的 V 个条目被均匀使用：对一个批次内各条语音，在码本条目上求平均后的 softmax 分布 l̄（记为 p̄g），最大化其熵；此处的 softmax 分布不含 gumbel 噪声，也不含温度（脚注 2）。"
      }
     ]
    },
    {
     "id": "eq-diversity-loss-1",
     "type": "equation",
     "page": 4,
     "original": "G Ld ="
    },
    {
     "id": "p-diversity-loss-2",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-diversity-loss-2-1",
       "original": "1 GV",
       "zh": "（上式系数）1/(GV)（接下式对 g 求和、取负熵 −H(p̄g)）。"
      }
     ]
    },
    {
     "id": "eq-diversity-loss-2",
     "type": "equation",
     "page": 4,
     "original": "g=1 −H(¯pg) = 1 GV"
    }
   ]
  },
  {
   "id": "sec-3-3",
   "num": "3.3",
   "level": 2,
   "page": 4,
   "title": {
    "original": "Fine-tuning",
    "zh": "3.3 微调"
   },
   "blocks": [
    {
     "id": "eq-3-3-1",
     "type": "equation",
     "page": 4,
     "original": "G V"
    },
    {
     "id": "eq-3-3-2",
     "type": "equation",
     "page": 4,
     "original": "v=1 ¯pg,v log ¯pg,v g=1"
    },
    {
     "id": "p-3-3-1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-3-3-1-1",
       "original": "Pre-trained models are ﬁne-tuned for speech recognition by adding a randomly initialized linear projection on top of the context network into C classes representing the vocabulary of the task [4].",
       "zh": "预训练模型面向语音识别做微调的方式是：在上下文网络之上加一个随机初始化的线性投影，输出 C 个类别，即任务词表 [4]。"
      },
      {
       "id": "s-3-3-1-2",
       "original": "For Librispeech, we have 29 tokens for character targets plus a word boundary token.",
       "zh": "对 Librispeech，我们使用 29 个字符目标 token，外加一个词边界 token。"
      },
      {
       "id": "s-3-3-1-3",
       "original": "Models are optimized by minimizing a CTC loss [14] and we apply a modiﬁed version of SpecAugment [41] by masking to time-steps and channels during training which delays overﬁtting and signiﬁcantly improves the ﬁnal error rates, especially on the Libri-light subsets with few labeled examples.",
       "zh": "模型通过最小化 CTC 损失 [14] 来优化，并施加一个修改版的 SpecAugment [41]：训练中对时间步和通道做掩码；这能推迟过拟合并显著降低最终错误率，在标注样本很少的 Libri-light 子集上尤其明显。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-4",
   "num": "4",
   "level": 1,
   "page": 4,
   "title": {
    "original": "Experimental Setup",
    "zh": "4 实验设置"
   },
   "blocks": []
  },
  {
   "id": "sec-4-1",
   "num": "4.1",
   "level": 2,
   "page": 4,
   "title": {
    "original": "Datasets",
    "zh": "4.1 数据集"
   },
   "blocks": [
    {
     "id": "p-4-1-1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-4-1-1-1",
       "original": "As unlabeled data we consider the Librispeech corpus [40] without transcriptions containing 960 hours of audio (LS-960) or the audio data from LibriVox (LV-60k).",
       "zh": "无标注数据方面，我们考虑不带转写的 Librispeech 语料库 [40]，含 960 小时音频（LS-960），或 LibriVox 的音频数据（LV-60k）。"
      },
      {
       "id": "s-4-1-1-2",
       "original": "For the latter we follow the preprocessing of [27] resulting in 53.2k hours of audio.",
       "zh": "对后者，我们沿用 [27] 的预处理流程，得到 53.2k 小时音频。"
      },
      {
       "id": "s-4-1-1-3",
       "original": "We ﬁne-tune on ﬁve labeled data settings: 960 hours of transcribed Librispeech, the train-clean-100 subset comprising 100 hours (100 hours labeled), as well as the Libri-light limited resource training subsets originally extracted from Librispeech, these are train-10h (10 hours labeled), train-1h (1 hour labeled), train-10min (10 min labeled).",
       "zh": "我们在五种标注数据设置下微调：960 小时转写的 Librispeech、train-clean-100 子集 100 小时（标注 100 小时），以及最初从 Librispeech 抽取的 Libri-light 有限资源训练子集：train-10h（标注 10 小时）、train-1h（标注 1 小时）、train-10min（标注 10 分钟）。"
      },
      {
       "id": "s-4-1-1-4",
       "original": "We follow the evaluation protocol of Libri-light for these splits and evaluate on the standard Librispech dev-other/clean and test-clean/other sets.",
       "zh": "对这些划分，我们遵循 Libri-light 的评测协议，并在标准的 Librispeech dev-other/clean 与 test-clean/other 集合上评测。"
      }
     ]
    },
    {
     "id": "p-4-1-2",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-4-1-2-1",
       "original": "We ﬁne-tune the pre-trained models for phoneme recognition on the TIMIT dataset [13].",
       "zh": "我们还在 TIMIT 数据集 [13] 上把预训练模型微调用于音素识别。"
      },
      {
       "id": "s-4-1-2-2",
       "original": "It contains ﬁve hours of audio recordings with detailed phoneme labels.",
       "zh": "该数据集包含 5 小时带详细音素标注的录音。"
      },
      {
       "id": "s-4-1-2-3",
       "original": "We use the standard train, dev and test split and follow the standard protocol of collapsing phone labels to 39 classes.",
       "zh": "我们使用标准的 train/dev/test 划分，并遵循标准协议把音素标签折叠为 39 类。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-4-2",
   "num": "4.2",
   "level": 2,
   "page": 4,
   "title": {
    "original": "Pre-training",
    "zh": "4.2 预训练"
   },
   "blocks": [
    {
     "id": "p-4-2-1",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-4-2-1-1",
       "original": "Models are implemented in fairseq [39].",
       "zh": "模型基于 fairseq [39] 实现。"
      },
      {
       "id": "s-4-2-1-2",
       "original": "For masking, we sample p = 0.065 of all time-steps to be starting indices and mask the subsequent M = 10 time-steps.",
       "zh": "掩码时，我们以 p = 0.065 从所有时间步中采样起始下标，并掩码其后 M = 10 个时间步。"
      },
      {
       "id": "s-4-2-1-3",
       "original": "This results in approximately 49% of all time steps to be masked with a mean span length of 14.7, or 299ms (see Appendix A for more details on masking).",
       "zh": "这使得约 49% 的时间步被掩码，平均片段长度为 14.7 个时间步，即 299ms（掩码的更多细节见附录 A）。"
      }
     ]
    },
    {
     "id": "p-4-2-2",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-4-2-2-1",
       "original": "The feature encoder contains seven blocks and the temporal convolutions in each block have 512 channels with strides (5,2,2,2,2,2,2) and kernel widths (10,3,3,3,3,2,2).",
       "zh": "特征编码器包含 7 个模块，每个模块中的时间维卷积有 512 个通道，步幅为 (5,2,2,2,2,2,2)，卷积核宽度为 (10,3,3,3,3,2,2)。"
      },
      {
       "id": "s-4-2-2-2",
       "original": "This results in an encoder output frequency of 49 hz with a stride of about 20ms between each sample, and a receptive ﬁeld of 400 input samples or 25ms of audio.",
       "zh": "这使编码器的输出帧率为 49 hz，样本间步幅约 20ms，感受野为 400 个输入采样点，即 25ms 音频。"
      },
      {
       "id": "s-4-2-2-3",
       "original": "The convolutional layer modeling relative positional embeddings has kernel size 128 and 16 groups.",
       "zh": "用于建模相对位置嵌入的卷积层卷积核大小为 128，分 16 组。"
      }
     ]
    },
    {
     "id": "p-4-2-3",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-4-2-3-1",
       "original": "We experiment with two model conﬁgurations which use the same encoder architecture but differ in the Transformer setup: BASE contains 12 transformer blocks, model dimension 768, inner dimension (FFN) 3,072 and 8 attention heads.",
       "zh": "我们实验了两种模型配置，二者编码器架构相同，但 Transformer 设置不同：BASE 包含 12 个 Transformer 块，模型维度 768，内部维度（FFN）3,072，8 个注意力头。"
      },
      {
       "id": "s-4-2-3-2",
       "original": "Batches are built by cropping 250k audio samples, or 15.6sec, from each example.",
       "zh": "构造批次时，从每条样本裁剪 250k 个音频采样点，即 15.6 秒。"
      },
      {
       "id": "s-4-2-3-3",
       "original": "Crops are batched together to not exceed 1.4m samples per GPU and we train on a total of 64 V100 GPUs for 1.6 days [38]; the total batch size is 1.6h.",
       "zh": "裁剪结果组成批次，每 GPU 不超过 1.4m 个采样点；我们总共用 64 张 V100 GPU 训练 1.6 天 [38]；总批次大小为 1.6 小时音频。"
      }
     ]
    },
    {
     "id": "p-4-2-4",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-4-2-4-1",
       "original": "The LARGE model contains 24 transformer blocks with model dimension 1,024, inner dimension 4,096 and 16 attention heads.",
       "zh": "LARGE 模型包含 24 个 Transformer 块，模型维度 1,024，内部维度 4,096，16 个注意力头。"
      },
      {
       "id": "s-4-2-4-2",
       "original": "We crop 320k audio samples, or 20sec, with a limit of 1.2m samples per GPU and train on 128 V100 GPUs over 2.3 days for Librispeech and 5.2 days for LibriVox; the total batch size is 2.7h.",
       "zh": "我们裁剪 320k 个音频采样点（20 秒），每 GPU 上限 1.2m 个采样点；在 Librispeech 上用 128 张 V100 GPU 训练 2.3 天，在 LibriVox 上训练 5.2 天；总批次大小为 2.7 小时音频。"
      },
      {
       "id": "s-4-2-4-3",
       "original": "We use dropout 0.1 in the Transformer, at the output of the feature encoder and the input to the quantization module.",
       "zh": "我们在 Transformer 内部、特征编码器输出端以及量化模块输入端都使用 dropout 0.1。"
      },
      {
       "id": "s-4-2-4-4",
       "original": "Layers are dropped at a rate of 0.05 for BASE and 0.2 for LARGE [22, 12]; there is no layer drop for LV-60k.",
       "zh": "层丢弃（layer drop）比例为：BASE 0.05，LARGE 0.2 [22, 12]；LV-60k 上不使用层丢弃。"
      }
     ]
    },
    {
     "id": "p-4-2-5",
     "type": "paragraph",
     "page": 4,
     "sentences": [
      {
       "id": "s-4-2-5-1",
       "original": "2Our implementation maximizes perplexity GV −PG g=1 exp(−PV v=1 pgv log pgv) GV which is equivalent.",
       "zh": "脚注 2：我们的实现是最大化困惑度 GV − Σg=1..G exp(−Σv=1..V pgv log pgv)/GV，二者是等价的。"
      }
     ]
    },
    {
     "id": "p-4-2-6",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-4-2-6-1",
       "original": "We optimize with Adam [29], warming up the learning rate for the ﬁrst 8% of updates to a peak of 5 × 10−4 for BASE and 3 × 10−4 for LARGE, and then linearly decay it.",
       "zh": "我们使用 Adam [29] 优化：在前 8% 次更新内把学习率预热到峰值——BASE 为 5 × 10−4，LARGE 为 3 × 10−4，之后线性衰减。"
      },
      {
       "id": "s-4-2-6-2",
       "original": "LARGE trains for 250k updates, BASE for 400k updates, and LARGE on LV-60k for 600k updates.",
       "zh": "LARGE 训练 250k 次更新，BASE 训练 400k 次更新，LARGE 在 LV-60k 上训练 600k 次更新。"
      },
      {
       "id": "s-4-2-6-3",
       "original": "We use weight α = 0.1 for the diversity loss Equation 2.",
       "zh": "多样性损失（公式 2）的权重取 α = 0.1。"
      },
      {
       "id": "s-4-2-6-4",
       "original": "For the quantization module we use G = 2 and V = 320 for both models, resulting in a theoretical maximum of 102.4k codewords.",
       "zh": "量化模块对两种模型都使用 G = 2、V = 320，理论码字上限为 102.4k。"
      },
      {
       "id": "s-4-2-6-5",
       "original": "Entries are of size d/G = 128 for BASE amd d/G = 384 for LARGE.",
       "zh": "码本条目大小为 d/G = 128（BASE）和 d/G = 384（LARGE）。"
      },
      {
       "id": "s-4-2-6-6",
       "original": "The Gumbel softmax temperature τ is annealed from 2 to a minimum of 0.5 for BASE and 0.1 for LARGE by a factor of 0.999995 at every update.",
       "zh": "Gumbel softmax 的温度 τ 从 2 开始退火，按每步乘 0.999995 的因子，BASE 最低降到 0.5，LARGE 最低降到 0.1。"
      },
      {
       "id": "s-4-2-6-7",
       "original": "The temperature in the contrastive loss (Equation 3) is set to κ = 0.1.",
       "zh": "对比损失（公式 3）中的温度设为 κ = 0.1。"
      },
      {
       "id": "s-4-2-6-8",
       "original": "For the smaller Librispeech dataset, we regularize the model by applying an L2 penalty to the activations of the ﬁnal layer of the feature encoder and scale down the gradients for the encoder by a factor of 10.",
       "zh": "对较小的 Librispeech 数据集，我们对特征编码器最后一层的激活施加 L2 惩罚，并把编码器的梯度缩小 10 倍来正则化模型。"
      },
      {
       "id": "s-4-2-6-9",
       "original": "We also use a slightly different encoder architecture where we do not use layer normalization, and instead of normalizing the raw waveform, the output of the ﬁrst encoder layer is normalized.",
       "zh": "我们还使用一个略有差异的编码器架构：不使用层归一化，并且不归一化原始波形，而是对编码器第一层的输出做归一化。"
      },
      {
       "id": "s-4-2-6-10",
       "original": "In the contrastive loss we use K = 100 distractors.",
       "zh": "对比损失中我们使用 K = 100 个干扰项。"
      },
      {
       "id": "s-4-2-6-11",
       "original": "We choose the training checkpoint with the lowest Lm on the validation set.",
       "zh": "我们选取验证集上 Lm 最低的训练检查点。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-4-3",
   "num": "4.3",
   "level": 2,
   "page": 5,
   "title": {
    "original": "Fine-tuning",
    "zh": "4.3 微调"
   },
   "blocks": [
    {
     "id": "p-4-3-1",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-4-3-1-1",
       "original": "After pre-training we ﬁne-tune the learned representations on labeled data and add a randomly initialized output layer on top of the Transformer to predict characters (Librispeech/Libri-light) or phonemes (TIMIT).",
       "zh": "预训练之后，我们在标注数据上微调所学表示，在 Transformer 之上加一个随机初始化的输出层，用于预测字符（Librispeech/Libri-light）或音素（TIMIT）。"
      },
      {
       "id": "s-4-3-1-2",
       "original": "For Libri-light, we train three seeds with two different learning rates (2e-5 and 3e-5) for all subsets and choose the conﬁguration with lowest WER on dev-other subset decoded with the ofﬁcial 4-gram language model (LM) with beam 50 and ﬁxed model weights (LM weight 2, word insertion penalty -1).",
       "zh": "对 Libri-light，我们对所有子集各用三种随机种子、两种学习率（2e-5 和 3e-5）训练，并选出在 dev-other 子集上 WER 最低的配置；解码使用官方 4-gram 语言模型（LM），beam 为 50，模型权重固定（LM 权重 2，词插入惩罚 -1）。"
      },
      {
       "id": "s-4-3-1-3",
       "original": "For BASE on the labeled 960h subset we use a learning rate of 1e-4.",
       "zh": "对 BASE 在 960h 标注子集上，我们使用 1e-4 的学习率。"
      }
     ]
    },
    {
     "id": "p-4-3-2",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-4-3-2-1",
       "original": "We optimize with Adam and a tri-state rate schedule where the learning rate is warmed up for the ﬁrst 10% of updates, held constant for the next 40% and then linearly decayed for the remainder.",
       "zh": "我们使用 Adam 优化，并采用三阶段学习率调度：前 10% 次更新预热，接下来的 40% 保持不变，其余阶段线性衰减。"
      },
      {
       "id": "s-4-3-2-2",
       "original": "BASE uses a batch size of 3.2m samples per GPU and we ﬁne-tune on 8 GPUs, giving a total batch size of 1,600sec.",
       "zh": "BASE 每 GPU 批次大小为 3.2m 个采样点，我们在 8 张 GPU 上微调，总批次大小为 1,600 秒音频。"
      },
      {
       "id": "s-4-3-2-3",
       "original": "LARGE batches 1.28m samples on each GPU and we ﬁne-tune on 24 GPUs, resulting in an effective batch size of 1,920sec.",
       "zh": "LARGE 每 GPU 批次 1.28m 个采样点，我们在 24 张 GPU 上微调，有效批次大小为 1,920 秒音频。"
      },
      {
       "id": "s-4-3-2-4",
       "original": "For the ﬁrst 10k updates only the output classiﬁer is trained, after which the Transformer is also updated.",
       "zh": "前 10k 次更新只训练输出分类器，之后 Transformer 也一并更新。"
      },
      {
       "id": "s-4-3-2-5",
       "original": "The feature encoder is not trained during ﬁne-tuning.",
       "zh": "微调期间特征编码器不参与训练。"
      },
      {
       "id": "s-4-3-2-6",
       "original": "We mask the feature encoder representations with a strategy similar to SpecAugment [41] detailed in Appendix B.",
       "zh": "我们用一种类似 SpecAugment [41] 的策略对特征编码器表示做掩码，细节见附录 B。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-4-4",
   "num": "4.4",
   "level": 2,
   "page": 5,
   "title": {
    "original": "Language Models and Decoding",
    "zh": "4.4 语言模型与解码"
   },
   "blocks": [
    {
     "id": "p-4-4-1",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-4-4-1-1",
       "original": "We consider two types of language models (LM): a 4-gram model and a Transformer [3] trained on the Librispeech LM corpus.",
       "zh": "我们考虑两类语言模型（LM）：一个 4-gram 模型，以及一个在 Librispeech LM 语料上训练的 Transformer [3]。"
      },
      {
       "id": "s-4-4-1-2",
       "original": "The Transformer LM is identical to [51] and contains 20 blocks, model dimension 1,280, inner dimension 6,144 and 16 attention heads.",
       "zh": "该 Transformer LM 与 [51] 相同，包含 20 个块，模型维度 1,280，内部维度 6,144，16 个注意力头。"
      },
      {
       "id": "s-4-4-1-3",
       "original": "We tune the weights of the language model (interval [0, 5]) and a word insertion penalty ([−5, 5]) via Bayesian optimization3: we run 128 trials with beam 500 for the 4-gram LM and beam 50 for the Transformer LM and choose the best set of weights according to performance on dev-other.",
       "zh": "我们通过贝叶斯优化来调语言模型的权重（区间 [0, 5]）与词插入惩罚（区间 [−5, 5]）³：对 4-gram LM 以 beam 500 运行 128 次试验，对 Transformer LM 以 beam 50 运行，并按 dev-other 上的表现选出最优权重组合（脚注 3：贝叶斯优化工具见 facebook/Ax）。"
      },
      {
       "id": "s-4-4-1-4",
       "original": "Test performance is measured with beam 1,500 for the n-gram LM and beam 500 for the Transformer LM.",
       "zh": "测试集性能的测量使用 beam 1,500（n-gram LM）和 beam 500（Transformer LM）。"
      },
      {
       "id": "s-4-4-1-5",
       "original": "We use the beam search decoder of [44].",
       "zh": "我们使用 [44] 的束搜索（beam search）解码器。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-5",
   "num": "5",
   "level": 1,
   "page": 5,
   "title": {
    "original": "Results",
    "zh": "5 实验结果"
   },
   "blocks": []
  },
  {
   "id": "sec-5-1",
   "num": "5.1",
   "level": 2,
   "page": 5,
   "title": {
    "original": "Low-Resource Labeled Data Evaluation",
    "zh": "5.1 低资源标注数据评测"
   },
   "blocks": [
    {
     "id": "p-5-1-1",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-5-1-1-1",
       "original": "We ﬁrst evaluate our pre-trained models in settings where the amount of labeled data is limited to get a sense of how the representations learned on unlabeled data can improve low resource settings.",
       "zh": "我们首先在标注数据量受限的设置下评测预训练模型，以考察在无标注数据上学到的表示能在多大程度上改善低资源场景。"
      },
      {
       "id": "s-5-1-1-2",
       "original": "If a pre-trained model captures the structure of speech, then it should require few labeled examples to ﬁne-tune it for speech recognition.",
       "zh": "如果预训练模型确实捕获了语音的结构，那么为语音识别微调它所需的标注样本就应该很少。"
      },
      {
       "id": "s-5-1-1-3",
       "original": "The models are pre-trained on the audio data of either Librispeech (LS-960) or LibriVox (LV-60k) and most results are obtained by decoding with a Transformer language model (Transf.); Appendix C shows results with no language model at all as well as with an n-gram language model.",
       "zh": "模型在 Librispeech（LS-960）或 LibriVox（LV-60k）的音频数据上预训练，多数结果用 Transformer 语言模型（Transf.）解码得到；附录 C 给出了完全不用语言模型、以及用 n-gram 语言模型的结果。"
      }
     ]
    },
    {
     "id": "p-5-1-2",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-5-1-2-1",
       "original": "The LARGE model pre-trained on LV-60k and ﬁne-tuned on only 10 minutes of labeled data achieves a word error rate of 5.2/8.6 on the Librispeech clean/other test sets.",
       "zh": "在 LV-60k 上预训练的 LARGE 模型，仅用 10 分钟标注数据微调，就在 Librispeech 的 clean/other 测试集上取得 5.2/8.6 的词错误率。"
      },
      {
       "id": "s-5-1-2-2",
       "original": "Ten minutes of labeled data corresponds to just 48 recordings with an average length of 12.5 seconds.",
       "zh": "10 分钟标注数据只对应 48 条录音，平均长度 12.5 秒。"
      },
      {
       "id": "s-5-1-2-3",
       "original": "This demonstrates that ultra-low resource speech recognition is possible with self-supervised learning on unlabeled data.",
       "zh": "这证明，借助在无标注数据上的自监督学习，超低资源的语音识别是可行的。"
      }
     ]
    },
    {
     "id": "p-5-1-3",
     "type": "paragraph",
     "page": 5,
     "sentences": [
      {
       "id": "s-5-1-3-1",
       "original": "3https://github.com/facebook/Ax",
       "zh": "脚注 3：https://github.com/facebook/Ax"
      }
     ]
    },
    {
     "id": "tab-5-1-1",
     "type": "table_caption",
     "page": 6,
     "original": "Table 1: WER on the Librispeech dev/test sets when training on the Libri-light low-resource labeled data setups of 10 min, 1 hour, 10 hours and the clean 100h subset of Librispeech. Models use either the audio of Librispeech (LS-960) or the larger LibriVox (LV-60k) as unlabeled data. We consider two model sizes: BASE (95m parameters) and LARGE (317m parameters). Prior work used 860 unlabeled hours (LS-860) but the total with labeled data is 960 hours and comparable to our setup.",
     "zh": "表 1：在 Libri-light 低资源标注数据设置（10 分钟、1 小时、10 小时）以及 Librispeech 的 clean 100h 子集上训练时，Librispeech dev/test 集上的 WER。模型分别以 Librispeech 音频（LS-960）或更大的 LibriVox（LV-60k）作为无标注数据。我们考察两种模型规模：BASE（95m 参数）与 LARGE（317m 参数）。先前工作使用 860 小时无标注数据（LS-860），但加上标注数据后总量为 960 小时，与我们的设置相当。"
    }
   ]
  },
  {
   "id": "sec-10",
   "num": "10",
   "level": 1,
   "page": 6,
   "title": {
    "original": "min labeled",
    "zh": "10 分钟标注（表格碎片）"
   },
   "blocks": [
    {
     "id": "p-10-1",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-10-1-1",
       "original": "15.7 24.1 16.3 25.2 8.9 15.7 9.1 15.6 6.6 13.2 6.9 12.9 6.6 10.6 6.8 10.8 4.6 7.9 4.8 8.2 8.5 16.4 9.0 17.6 5.0 10.8 5.5 11.3 3.8 9.0 4.0 9.3 3.8 7.1 3.9 7.6 2.9 5.4 2.9 5.8 5.3 13.2 5.9 14.1 Iter. pseudo-labeling [58] 23.51 25.48 24.37 26.02 17.00 19.34 18.03 19.92 3.8 9.1 4.3 9.5 2.9 7.4 3.2 7.8 2.9 5.7 3.2 6.1 2.4 4.8 2.6 4.9 Hybrid DNN/HMM [34] 5.0 19.5 5.8 18.6 TTS data augm.",
       "zh": "（Table 1 数值碎块）各行（无 LM / 4-gram LM / Transformer LM 等解码条件下）WER 数值：15.7 24.1 16.3 25.2 8.9 15.7 9.1 15.6 6.6 13.2 6.9 12.9 6.6 10.6 6.8 10.8 4.6 7.9 4.8 8.2 8.5 16.4 9.0 17.6 5.0 10.8 5.5 11.3 3.8 9.0 4.0 9.3 3.8 7.1 3.9 7.6 2.9 5.4 2.9 5.8 5.3 13.2 5.9 14.1；对比基线：Iter. pseudo-labeling [58] 23.51 25.48 24.37 26.02 17.00 19.34 18.03 19.92 3.8 9.1 4.3 9.5 2.9 7.4 3.2 7.8 2.9 5.7 3.2 6.1 2.4 4.8 2.6 4.9；Hybrid DNN/HMM [34] 5.0 19.5 5.8 18.6；TTS data augm.（TTS 数据增强）。"
      },
      {
       "id": "s-10-1-2",
       "original": "[30] 4.3 13.5 4.0 10.9 4.5 12.1 Iter. pseudo-labeling [58] 4.98 7.97 5.59 8.95 3.19 6.14 3.72 7.11 Noisy student [42] 3.9 8.8 4.2 8.6 2.7 7.9 3.4 8.0 2.2 6.3 2.6 6.3 2.1 4.8 2.3 5.0 1.9 4.0 2.0 4.0 Our approach of jointly learning discrete units and contextualized representations clearly improves over previous work which learned quantized audio units in a separate step [4], reducing WER by a about a third.",
       "zh": "（Table 1 数值碎块续）TTS 数据增强 [30]：4.3 13.5 4.0 10.9 4.5 12.1；Iter. pseudo-labeling [58]：4.98 7.97 5.59 8.95 3.19 6.14 3.72 7.11；Noisy student [42]：3.9 8.8 4.2 8.6 2.7 7.9 3.4 8.0 2.2 6.3 2.6 6.3 2.1 4.8 2.3 5.0 1.9 4.0 2.0 4.0。我们联合学习离散单元与上下文化表示的方法，明显优于先在单独一步中学习量化音频单元的先前工作 [4]，WER 降低了约三分之一。"
      }
     ]
    },
    {
     "id": "p-10-2",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-10-2-1",
       "original": "A recent iterative self-training approach [42] represents the state of the art on the clean 100 hour subset of Librispeech but it requires multiple iterations of labeling, ﬁltering, and re-training.",
       "zh": "近期一种迭代式自训练方法 [42] 在 Librispeech 的 clean 100 小时子集上代表了此前最佳水平，但它需要多轮「打伪标签—过滤—重训」的迭代。"
      },
      {
       "id": "s-10-2-2",
       "original": "Our approach is simpler: we pre-train on the unlabeled data and ﬁne-tune on the labeled data.",
       "zh": "我们的方法更简单：在无标注数据上预训练，再在标注数据上微调。"
      },
      {
       "id": "s-10-2-3",
       "original": "On the 100 hour subset of Librispeech, their method achieves WER 4.2/8.6 on test-clean/other which compares to WER 2.3/5.0 with the LARGE model in a like for like setup, a relative WER reduction of 45%/42%.",
       "zh": "在 Librispeech 的 100 小时子集上，他们的方法在 test-clean/other 上取得 WER 4.2/8.6；而在完全对等的设置下，我们的 LARGE 模型取得 WER 2.3/5.0，相对 WER 降幅为 45%/42%。"
      }
     ]
    },
    {
     "id": "p-10-3",
     "type": "paragraph",
     "page": 6,
     "sentences": [
      {
       "id": "s-10-3-1",
       "original": "When the LARGE model uses an order of magnitude less labeled data (10h labeled), then it still achieves WER 3.2/6.1, an error reduction of 24%/29% relative to iterative self-training.",
       "zh": "当 LARGE 模型使用少一个数量级的标注数据（10 小时标注）时，仍取得 WER 3.2/6.1，相对迭代式自训练的错误率降幅为 24%/29%。"
      },
      {
       "id": "s-10-3-2",
       "original": "Using only a single hour of labeled data, the same model achieves WER 3.9/7.6 which improves on both test-clean and test-other by 7%/12% - with two orders of magnitude less labeled data.",
       "zh": "只用 1 小时标注数据，同一模型取得 WER 3.9/7.6，在 test-clean 和 test-other 上分别提升 7%/12%——而标注数据少了两个数量级。"
      },
      {
       "id": "s-10-3-3",
       "original": "We note that the Libri-",
       "zh": "我们注意到 Libri-（原文在此断行，接下页「light data splits…」）。"
      }
     ]
    },
    {
     "id": "tab-10-1",
     "type": "table_caption",
     "page": 7,
     "original": "Table 2: WER on Librispeech when using all 960 hours of labeled data (cf. Table 1).",
     "zh": "表 2：使用全部 960 小时标注数据时 Librispeech 上的 WER（参见 Table 1）。"
    }
   ]
  },
  {
   "id": "sec-supervised",
   "num": null,
   "level": 2,
   "page": 7,
   "title": {
    "original": "Supervised",
    "zh": "有监督（表格碎片）"
   },
   "blocks": [
    {
     "id": "p-supervised-1",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-supervised-1-1",
       "original": "CTC Transf [51] 2.20 4.94 2.47 5.45 S2S Transf.",
       "zh": "（Table 2 有监督基线数值碎块）CTC Transf [51]：2.20 4.94 2.47 5.45；S2S Transf.（seq2seq Transformer）。"
      },
      {
       "id": "s-supervised-1-2",
       "original": "[51] 2.10 4.79 2.33 5.17 Transf.",
       "zh": "（接上）[51]：2.10 4.79 2.33 5.17；Transf.（Transformer）。"
      },
      {
       "id": "s-supervised-1-3",
       "original": "Transducer [60] 2.0 4.6 ContextNet [17] 1.9 3.9 1.9 4.1 Conformer [15] 2.1 4.3 1.9 3.9",
       "zh": "（接上）Transducer [60]：2.0 4.6；ContextNet [17]：1.9 3.9 1.9 4.1；Conformer [15]：2.1 4.3 1.9 3.9。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-semi-supervised",
   "num": null,
   "level": 2,
   "page": 7,
   "title": {
    "original": "Semi-supervised",
    "zh": "半监督（表格碎片）"
   },
   "blocks": [
    {
     "id": "p-semi-supervised-1",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-semi-supervised-1-1",
       "original": "CTC Transf. + PL [51] 2.10 4.79 2.33 4.54 S2S Transf. + PL [51] 2.00 3.65 2.09 4.11 Iter. pseudo-labeling [58] 1.85 3.26 2.10 4.01 Noisy student [42] 1.6 3.4 1.7 3.4",
       "zh": "（Table 2 半监督基线数值碎块）CTC Transf. + PL [51]：2.10 4.79 2.33 4.54；S2S Transf. + PL [51]：2.00 3.65 2.09 4.11；Iter. pseudo-labeling [58]：1.85 3.26 2.10 4.01；Noisy student [42]：1.6 3.4 1.7 3.4。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-this-work",
   "num": null,
   "level": 2,
   "page": 7,
   "title": {
    "original": "This work",
    "zh": "本文方法（表格碎片）"
   },
   "blocks": [
    {
     "id": "p-this-work-1",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-this-work-1-1",
       "original": "LARGE - from scratch 1.7 4.3 2.1 4.6 1.8 4.7 2.1 4.8 1.7 3.9 2.0 4.1 1.6 3.0 1.8 3.3 light data splits contain both clean and noisy data leading to better accuracy on test-other compared to test-clean.",
       "zh": "（Table 2 本文方法数值碎块）LARGE - from scratch（从头训练）：1.7 4.3 2.1 4.6 1.8 4.7 2.1 4.8 1.7 3.9 2.0 4.1 1.6 3.0 1.8 3.3。说明：Libri-light 数据划分同时包含干净与嘈杂数据，这使得 test-other 上的准确率反而好于 test-clean。"
      },
      {
       "id": "s-this-work-1-2",
       "original": "Increasing model size reduces WER on all setups with the largest improvements on test-other (BASE vs. LARGE both on LS-960) and increasing the amount of unlabeled training data also leads to large improvements (LARGE LS-960 vs. LV-60k).",
       "zh": "增大模型规模在所有设置上都降低了 WER，其中 test-other 上的提升最大（同在 LS-960 上的 BASE 与 LARGE 对比）；增加无标注训练数据量也带来显著提升（LARGE 在 LS-960 与 LV-60k 上的对比）。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-5-2",
   "num": "5.2",
   "level": 2,
   "page": 7,
   "title": {
    "original": "High-Resource Labeled Data Evaluation on Librispeech",
    "zh": "5.2 Librispeech 高资源标注数据评测"
   },
   "blocks": [
    {
     "id": "p-5-2-1",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-5-2-1-1",
       "original": "In this section we evaluate the performance when large quantities of labeled speech are available to assess the effectiveness of our approach in a high resource setup.",
       "zh": "本节评测有大量标注语音可用时的性能，以评估我们的方法在高资源设置下的有效性。"
      },
      {
       "id": "s-5-2-1-2",
       "original": "Speciﬁcally, we ﬁne-tune the same models as before on the full 960 hours of labeled Librispeech: BASE and LARGE pre-trained on LS-960 as well as LARGE pre-trained on LV-60k.",
       "zh": "具体来说，我们把此前的同一批模型在完整的 960 小时 Librispeech 标注数据上微调：分别在 LS-960 上预训练的 BASE 和 LARGE，以及在 LV-60k 上预训练的 LARGE。"
      }
     ]
    },
    {
     "id": "tab-5-2-1",
     "type": "table_caption",
     "page": 7,
     "original": "Table 2 shows that our approach achieves WER 1.8/3.3 on test-clean/other on the full Librispeech benchmark. This is despite a weaker baseline architecture: supervised training of our architecture achieves WER 2.1/4.6 (LARGE - from scratch) compared to WER 1.9/4.1 for ContextNet [17], the baseline architecture of the state of the art [42]. We use a simple Transformer with CTC which does not perform as well as seq2seq models [51].",
     "zh": "表 2 表明，在完整的 Librispeech 基准上，我们的方法在 test-clean/other 上取得 WER 1.8/3.3。这还是在我们基线架构偏弱的情况下取得的：我们的架构从头监督训练只取得 WER 2.1/4.6（LARGE - from scratch），而作为最佳方法 [42] 基线架构的 ContextNet [17] 为 WER 1.9/4.1。我们使用的只是简单的 Transformer + CTC，其表现不及 seq2seq 模型 [51]。"
    },
    {
     "id": "p-5-2-2",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-5-2-2-1",
       "original": "Note that the vocabulary of our acoustic model (characters) does not match the vocabulary of the LM (words) which delays feedback from the LM and is likely to be detrimental.",
       "zh": "需要注意的是，我们声学模型的词表（字符）与 LM 的词表（词）不一致，这会推迟来自 LM 的反馈，很可能是有害的。"
      },
      {
       "id": "s-5-2-2-2",
       "original": "Most recent work [51, 58, 17, 42] uses the better performing word pieces [50] for both models.",
       "zh": "大多数近期工作 [51, 58, 17, 42] 对两个模型都使用表现更好的子词（word piece）[50]。"
      },
      {
       "id": "s-5-2-2-3",
       "original": "Moreover, our result is achieved without any data balancing such as [42].",
       "zh": "而且，我们的结果没有使用任何数据平衡手段（如 [42]）。"
      },
      {
       "id": "s-5-2-2-4",
       "original": "Finally, self-training is likely complimentary to pre-training and their combination may yield even better results.",
       "zh": "最后，自训练与预训练很可能是互补的，二者结合或许能取得更好的结果。"
      },
      {
       "id": "s-5-2-2-5",
       "original": "Appendix E presents a detailed error analysis of our pre-trained models in various labeled data setups.",
       "zh": "附录 E 给出了预训练模型在各种标注数据设置下的详细错误分析。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-5-3",
   "num": "5.3",
   "level": 2,
   "page": 7,
   "title": {
    "original": "Phoneme Recognition on TIMIT",
    "zh": "5.3 TIMIT 音素识别"
   },
   "blocks": [
    {
     "id": "p-5-3-1",
     "type": "paragraph",
     "page": 7,
     "sentences": [
      {
       "id": "s-5-3-1-1",
       "original": "Next, we evaluate accuracy on TIMIT phoneme recognition by ﬁne-tuning the pre-trained models on the labeled TIMIT training data.",
       "zh": "接下来，我们在带标注的 TIMIT 训练数据上微调预训练模型，评测 TIMIT 音素识别的准确率。"
      },
      {
       "id": "s-5-3-1-2",
       "original": "We ﬁne-tune as for the 10 hour subset of Libri-light but do not use a language model.",
       "zh": "微调方式与 Libri-light 的 10 小时子集相同，但不使用语言模型。"
      },
      {
       "id": "s-5-3-1-3",
       "original": "Table 3 shows that our approach can achieve a new state of the art on this dataset, reducing PER by a relative 23%/29% over the next best result on the dev/test sets.",
       "zh": "Table 3 显示，我们的方法在该数据集上取得新的最佳水平，在 dev/test 集上把 PER 相对降低了 23%/29%。"
      },
      {
       "id": "s-5-3-1-4",
       "original": "Appendix D shows an analysis of how the discrete latent speech representations related to phonemes.",
       "zh": "附录 D 分析了离散潜在语音表示与音素之间的关系。"
      },
      {
       "id": "s-5-3-1-5",
       "original": "Other recent work on pre-training which evaluates on TIMIT includes [47] who solve multiple tasks to learn good representations of speech.",
       "zh": "其他在 TIMIT 上评测的近期预训练工作还有 [47]，他们通过求解多个任务来学习良好的语音表示。"
      }
     ]
    },
    {
     "id": "tab-5-3-1",
     "type": "table_caption",
     "page": 8,
     "original": "Table 3: TIMIT phoneme recognition accuracy in terms of phoneme error rate (PER).",
     "zh": "表 3：以音素错误率（PER）衡量的 TIMIT 音素识别准确率。"
    },
    {
     "id": "p-5-3-2",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-5-3-2-1",
       "original": "dev PER test PER CNN + TD-ﬁlterbanks [59] 15.6 18.0 PASE+ [47] 17.2 Li-GRU + fMLLR [46] – 14.9 wav2vec [49] 12.9 14.7 vq-wav2vec [5] 9.6 11.6",
       "zh": "（Table 3 数值碎块）dev PER / test PER：CNN + TD-filterbanks [59] 15.6 18.0；PASE+ [47] 17.2；Li-GRU + fMLLR [46] – 14.9；wav2vec [49] 12.9 14.7；vq-wav2vec [5] 9.6 11.6。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-this-work-no-lm",
   "num": null,
   "level": 2,
   "page": 8,
   "title": {
    "original": "This work (no LM)",
    "zh": "本文方法（无 LM，表格碎片）"
   },
   "blocks": [
    {
     "id": "p-this-work-no-lm-1",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-this-work-no-lm-1-1",
       "original": "LARGE (LS-960) 7.4 8.3",
       "zh": "（Table 3 续）本文方法（无 LM）：LARGE (LS-960) 7.4 8.3。"
      }
     ]
    },
    {
     "id": "tab-this-work-no-lm-1",
     "type": "table_caption",
     "page": 8,
     "original": "Table 4: Average WER and standard deviation on combined dev-clean/other of Librispeech for three training seeds. We ablate quantizing the context network input and the targets in the contrastive loss.",
     "zh": "表 4：三种训练种子在 Librispeech dev-clean/other 合并集上的平均 WER 与标准差。我们对「上下文网络的输入是否量化」与「对比损失的目标是否量化」做了消融。"
    },
    {
     "id": "p-this-work-no-lm-2",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-this-work-no-lm-2-1",
       "original": "avg.",
       "zh": "平均值"
      },
      {
       "id": "s-this-work-no-lm-2-2",
       "original": "WER std.",
       "zh": "WER 标准差"
      }
     ]
    },
    {
     "id": "p-this-work-no-lm-3",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-this-work-no-lm-3-1",
       "original": "Continuous inputs, quantized targets (Baseline) 7.97 0.02 Quantized inputs, quantized targets 12.18 0.41 Quantized inputs, continuous targets 11.18 0.16 Continuous inputs, continuous targets 8.58 0.08",
       "zh": "（Table 4 数值碎块）连续输入 + 量化目标（Baseline，基线）：7.97 0.02；量化输入 + 量化目标：12.18 0.41；量化输入 + 连续目标：11.18 0.16；连续输入 + 连续目标：8.58 0.08。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-5-4",
   "num": "5.4",
   "level": 2,
   "page": 8,
   "title": {
    "original": "Ablations",
    "zh": "5.4 消融"
   },
   "blocks": [
    {
     "id": "p-5-4-1",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-5-4-1-1",
       "original": "A difference to previous work [5, 4] is that we quantize the latent audio representations only for the contrastive loss, i.e., when latents are used as targets, but not when the latents are input to the Transformer network.",
       "zh": "与先前工作 [5, 4] 的一个区别在于：我们只在对比损失中量化潜在音频表示，即潜在表示作为目标时才量化，而作为 Transformer 网络输入时不量化。"
      },
      {
       "id": "s-5-4-1-2",
       "original": "We motivate this choice by an ablating for which we adopt a reduced training setup to increase experimental turn around: we pre-train BASE on LS-960 for 250k updates with masking probability p = 0.075, ﬁne-tune on train-10h for 60k updates on a single GPU with 640k samples per batch, or 40 sec of speech audio.",
       "zh": "我们用一项消融来论证这一选择：为加快实验迭代，采用缩减版训练设置——在 LS-960 上以掩码概率 p = 0.075 预训练 BASE 共 250k 次更新，再在 train-10h 上用单张 GPU、每批 640k 个采样点（即 40 秒语音）微调 60k 次更新。"
      },
      {
       "id": "s-5-4-1-3",
       "original": "We report the average WER and standard deviation on the concatenation of dev-clean and dev-other (dev PER) for three seeds of ﬁne-tuning.",
       "zh": "我们报告 dev-clean 与 dev-other 合并集（dev PER，原文如此）上三次微调种子的平均 WER 与标准差。"
      }
     ]
    },
    {
     "id": "tab-5-4-1",
     "type": "table_caption",
     "page": 8,
     "original": "Table 4 shows that our strategy of continuous inputs with quantized targets (Baseline) performs best. Continuous latent speech representations retain more information to enable better context representations and quantizing the target representations leads to more robust training. Quantizing the latents both in the input and the targets performs least well, and explains the lower performance of prior work [5, 4]. Continuous targets reduce the effectiveness of self-supervised training since targets can capture detailed artifacts of the current sequence, e.g. speaker and background information, which make the task easier and prevent the model from learning general representations beneﬁcial to speech recognition. The training accuracy of identifying the correct latent audio representation increases from 62% to 78.0% when switching from quantized to continuous targets. Continuous inputs and continuous targets perform second best but various attempts to improve it did not lead to better results (see Appendix F for this experiment and other ablations on various hyperparameters).",
     "zh": "表 4 表明，我们「连续输入 + 量化目标」的策略（Baseline）表现最好。连续的潜在语音表示保留了更多信息，从而能构建更好的上下文表示；而量化目标表示让训练更稳健。输入与目标都量化的表现最差，这也解释了先前工作 [5, 4] 性能较低的原因。连续目标会削弱自监督训练的效果，因为目标能捕获当前序列的细枝末节（例如说话人和背景信息），使任务变得过于容易，阻碍模型学到对语音识别有益的通用表示。从量化目标换成连续目标后，识别正确潜在音频表示的训练准确率从 62% 上升到 78.0%。「连续输入 + 连续目标」排第二，但改进它的多次尝试都没有带来更好的结果（该实验及其他超参数消融见附录 F）。"
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
    "zh": "6 结论"
   },
   "blocks": [
    {
     "id": "p-6-1",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-6-1-1",
       "original": "We presented wav2vec 2.0, a framework for self-supervised learning of speech representations which masks latent representations of the raw waveform and solves a contrastive task over quantized speech representations.",
       "zh": "我们提出了 wav2vec 2.0：一个语音表示自监督学习框架，它对原始波形的潜在表示做掩码，并在量化语音表示上求解对比任务。"
      },
      {
       "id": "s-6-1-2",
       "original": "Our experiments show the large potential of pre-training on unlabeled data for speech processing: when using only 10 minutes of labeled training data, or 48 recordings of 12.5 seconds on average, we achieve a WER of 4.8/8.2 on test-clean/other of Librispeech.",
       "zh": "实验展示了在无标注数据上预训练对语音处理的巨大潜力：只用 10 分钟标注训练数据（平均每条 12.5 秒、共 48 条录音），我们就在 Librispeech 的 test-clean/other 上取得 4.8/8.2 的 WER。"
      }
     ]
    },
    {
     "id": "p-6-2",
     "type": "paragraph",
     "page": 8,
     "sentences": [
      {
       "id": "s-6-2-1",
       "original": "Our model achieves results which achieve a new state of the art on the full Librispeech benchmark for noisy speech.",
       "zh": "我们的模型在完整 Librispeech 基准的嘈杂语音测试集上取得新的最佳结果。"
      },
      {
       "id": "s-6-2-2",
       "original": "On the clean 100 hour Librispeech setup, wav2vec 2.0 outperforms the previous best result while using 100 times less labeled data.",
       "zh": "在 Librispeech 的 clean 100 小时设置上，wav2vec 2.0 超过了此前最佳结果，而标注数据只用了对方的 1/100。"
      },
      {
       "id": "s-6-2-3",
       "original": "The approach is also effective when large amounts of labeled data are available.",
       "zh": "在有大量标注数据可用时，该方法同样有效。"
      },
      {
       "id": "s-6-2-4",
       "original": "We expect performance gains by switching to a seq2seq architecture and a word piece vocabulary.",
       "zh": "我们预计，换成 seq2seq 架构与子词（word piece）词表还能带来性能提升。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-broader-impact",
   "num": null,
   "level": 1,
   "page": 9,
   "title": {
    "original": "Broader Impact",
    "zh": "社会影响"
   },
   "blocks": [
    {
     "id": "p-broader-impact-1",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-broader-impact-1-1",
       "original": "There are around 7,000 languages in the world and many more dialects.",
       "zh": "世界上大约有 7,000 种语言，方言更是多得数不清。"
      },
      {
       "id": "s-broader-impact-1-2",
       "original": "However, for most of them no speech recognition technology exists since current systems require hundreds or thousands of hours of labeled data which is hard to collect for most languages.",
       "zh": "然而其中绝大多数都没有可用的语音识别技术，因为现有系统需要数百乃至数千小时的标注数据，而这对大多数语言来说很难收集。"
      },
      {
       "id": "s-broader-impact-1-3",
       "original": "We have shown that speech recognition models can be built with very small amounts of annotated data at very good accuracy.",
       "zh": "我们已经证明：用极少量标注数据就能构建准确率相当好的语音识别模型。"
      },
      {
       "id": "s-broader-impact-1-4",
       "original": "We hope our work will make speech recognition technology more broadly available to many more languages and dialects.",
       "zh": "我们希望这项工作能让语音识别技术惠及更多的语言和方言。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-acknowledgments",
   "num": null,
   "level": 1,
   "page": 9,
   "title": {
    "original": "Acknowledgments",
    "zh": "致谢"
   },
   "blocks": [
    {
     "id": "p-acknowledgments-1",
     "type": "paragraph",
     "page": 9,
     "sentences": [
      {
       "id": "s-acknowledgments-1-1",
       "original": "We thank Tatiana Likhomanenko and Qiantong Xu for helpful discussion and their help with wav2letter integration.",
       "zh": "感谢 Tatiana Likhomanenko 和 Qiantong Xu 的有益讨论，以及他们在 wav2letter 集成上的帮助。"
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
       "original": "[1] J."
      },
      {
       "id": "s-references-1-2",
       "original": "L."
      },
      {
       "id": "s-references-1-3",
       "original": "Ba, J."
      },
      {
       "id": "s-references-1-4",
       "original": "R."
      },
      {
       "id": "s-references-1-5",
       "original": "Kiros, and G."
      },
      {
       "id": "s-references-1-6",
       "original": "E."
      },
      {
       "id": "s-references-1-7",
       "original": "Hinton."
      },
      {
       "id": "s-references-1-8",
       "original": "Layer normalization. arXiv, 2016."
      },
      {
       "id": "s-references-1-9",
       "original": "[2] P."
      },
      {
       "id": "s-references-1-10",
       "original": "Bachman, R."
      },
      {
       "id": "s-references-1-11",
       "original": "D."
      },
      {
       "id": "s-references-1-12",
       "original": "Hjelm, and W."
      },
      {
       "id": "s-references-1-13",
       "original": "Buchwalter."
      },
      {
       "id": "s-references-1-14",
       "original": "Learning representations by maximizing mutual information across views."
      },
      {
       "id": "s-references-1-15",
       "original": "In Proc. of NeurIPS, 2019."
      },
      {
       "id": "s-references-1-16",
       "original": "[3] A."
      },
      {
       "id": "s-references-1-17",
       "original": "Baevski and M."
      },
      {
       "id": "s-references-1-18",
       "original": "Auli."
      },
      {
       "id": "s-references-1-19",
       "original": "Adaptive input representations for neural language modeling."
      },
      {
       "id": "s-references-1-20",
       "original": "In Proc."
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
       "original": "of ICLR, 2018."
      },
      {
       "id": "s-references-2-2",
       "original": "[4] A."
      },
      {
       "id": "s-references-2-3",
       "original": "Baevski, M."
      },
      {
       "id": "s-references-2-4",
       "original": "Auli, and A."
      },
      {
       "id": "s-references-2-5",
       "original": "Mohamed."
      },
      {
       "id": "s-references-2-6",
       "original": "Effectiveness of self-supervised pre-training for speech recognition. arXiv, abs/1911.03912, 2019."
      },
      {
       "id": "s-references-2-7",
       "original": "[5] A."
      },
      {
       "id": "s-references-2-8",
       "original": "Baevski, S."
      },
      {
       "id": "s-references-2-9",
       "original": "Schneider, and M."
      },
      {
       "id": "s-references-2-10",
       "original": "Auli. vq-wav2vec: Self-supervised learning of discrete speech representations."
      },
      {
       "id": "s-references-2-11",
       "original": "In Proc. of ICLR, 2020."
      },
      {
       "id": "s-references-2-12",
       "original": "[6] T."
      },
      {
       "id": "s-references-2-13",
       "original": "Chen, S."
      },
      {
       "id": "s-references-2-14",
       "original": "Kornblith, M."
      },
      {
       "id": "s-references-2-15",
       "original": "Norouzi, and G."
      },
      {
       "id": "s-references-2-16",
       "original": "Hinton."
      },
      {
       "id": "s-references-2-17",
       "original": "A simple framework for contrastive learning of visual representations. arXiv, abs/2002.05709, 2020."
      },
      {
       "id": "s-references-2-18",
       "original": "[7] J."
      },
      {
       "id": "s-references-2-19",
       "original": "Chorowski, R."
      },
      {
       "id": "s-references-2-20",
       "original": "J."
      },
      {
       "id": "s-references-2-21",
       "original": "Weiss, S."
      },
      {
       "id": "s-references-2-22",
       "original": "Bengio, and A. van den Oord."
      },
      {
       "id": "s-references-2-23",
       "original": "Unsupervised speech representation learning using wavenet autoencoders. arXiv, abs/1901.08810, 2019."
      },
      {
       "id": "s-references-2-24",
       "original": "[8] Y."
      },
      {
       "id": "s-references-2-25",
       "original": "Chung, W."
      },
      {
       "id": "s-references-2-26",
       "original": "Hsu, H."
      },
      {
       "id": "s-references-2-27",
       "original": "Tang, and J."
      },
      {
       "id": "s-references-2-28",
       "original": "R."
      },
      {
       "id": "s-references-2-29",
       "original": "Glass."
      },
      {
       "id": "s-references-2-30",
       "original": "An unsupervised autoregressive model for speech representation learning. arXiv, abs/1904.03240, 2019."
      },
      {
       "id": "s-references-2-31",
       "original": "[9] J."
      },
      {
       "id": "s-references-2-32",
       "original": "Devlin, M.-W."
      },
      {
       "id": "s-references-2-33",
       "original": "Chang, K."
      },
      {
       "id": "s-references-2-34",
       "original": "Lee, and K."
      },
      {
       "id": "s-references-2-35",
       "original": "Toutanova."
      },
      {
       "id": "s-references-2-36",
       "original": "Bert: Pre-training of deep bidirectional transformers for language understanding. arXiv, abs/1810.04805, 2018."
      },
      {
       "id": "s-references-2-37",
       "original": "[10] S."
      },
      {
       "id": "s-references-2-38",
       "original": "Dieleman, A. van den Oord, and K."
      },
      {
       "id": "s-references-2-39",
       "original": "Simonyan."
      },
      {
       "id": "s-references-2-40",
       "original": "The challenge of realistic music generation: modelling raw audio at scale. arXiv, 2018."
      },
      {
       "id": "s-references-2-41",
       "original": "[11] R."
      },
      {
       "id": "s-references-2-42",
       "original": "Eloff, A."
      },
      {
       "id": "s-references-2-43",
       "original": "Nortje, B. van Niekerk, A."
      },
      {
       "id": "s-references-2-44",
       "original": "Govender, L."
      },
      {
       "id": "s-references-2-45",
       "original": "Nortje, A."
      },
      {
       "id": "s-references-2-46",
       "original": "Pretorius, E."
      },
      {
       "id": "s-references-2-47",
       "original": "Van Biljon, E. van der Westhuizen, L. van Staden, and H."
      },
      {
       "id": "s-references-2-48",
       "original": "Kamper."
      },
      {
       "id": "s-references-2-49",
       "original": "Unsupervised acoustic unit discovery for speech synthesis using discrete latent-variable neural networks. arXiv, abs/1904.07556, 2019."
      },
      {
       "id": "s-references-2-50",
       "original": "[12] A."
      },
      {
       "id": "s-references-2-51",
       "original": "Fan, E."
      },
      {
       "id": "s-references-2-52",
       "original": "Grave, and A."
      },
      {
       "id": "s-references-2-53",
       "original": "Joulin."
      },
      {
       "id": "s-references-2-54",
       "original": "Reducing transformer depth on demand with structured dropout."
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
       "original": "In Proc. of ICLR, 2020."
      },
      {
       "id": "s-references-3-2",
       "original": "[13] J."
      },
      {
       "id": "s-references-3-3",
       "original": "S."
      },
      {
       "id": "s-references-3-4",
       "original": "Garofolo, L."
      },
      {
       "id": "s-references-3-5",
       "original": "F."
      },
      {
       "id": "s-references-3-6",
       "original": "Lamel, W."
      },
      {
       "id": "s-references-3-7",
       "original": "M."
      },
      {
       "id": "s-references-3-8",
       "original": "Fisher, J."
      },
      {
       "id": "s-references-3-9",
       "original": "G."
      },
      {
       "id": "s-references-3-10",
       "original": "Fiscus, D."
      },
      {
       "id": "s-references-3-11",
       "original": "S."
      },
      {
       "id": "s-references-3-12",
       "original": "Pallett, and N."
      },
      {
       "id": "s-references-3-13",
       "original": "L."
      },
      {
       "id": "s-references-3-14",
       "original": "Dahlgren."
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
       "original": "The DARPA TIMIT Acoustic-Phonetic Continuous Speech Corpus CDROM."
      },
      {
       "id": "s-references-4-2",
       "original": "Linguistic Data Consortium, 1993."
      },
      {
       "id": "s-references-4-3",
       "original": "[14] A."
      },
      {
       "id": "s-references-4-4",
       "original": "Graves, S."
      },
      {
       "id": "s-references-4-5",
       "original": "Fernández, and F."
      },
      {
       "id": "s-references-4-6",
       "original": "Gomez."
      },
      {
       "id": "s-references-4-7",
       "original": "Connectionist temporal classiﬁcation: Labelling unsegmented sequence data with recurrent neural networks."
      },
      {
       "id": "s-references-4-8",
       "original": "In Proc. of ICML, 2006."
      },
      {
       "id": "s-references-4-9",
       "original": "[15] A."
      },
      {
       "id": "s-references-4-10",
       "original": "Gulati, J."
      },
      {
       "id": "s-references-4-11",
       "original": "Qin, C.-C."
      },
      {
       "id": "s-references-4-12",
       "original": "Chiu, N."
      },
      {
       "id": "s-references-4-13",
       "original": "Parmar, Y."
      },
      {
       "id": "s-references-4-14",
       "original": "Zhang, J."
      },
      {
       "id": "s-references-4-15",
       "original": "Yu, W."
      },
      {
       "id": "s-references-4-16",
       "original": "Han, S."
      },
      {
       "id": "s-references-4-17",
       "original": "Wang, Z."
      },
      {
       "id": "s-references-4-18",
       "original": "Zhang, Y."
      },
      {
       "id": "s-references-4-19",
       "original": "Wu, and R."
      },
      {
       "id": "s-references-4-20",
       "original": "Pang."
      },
      {
       "id": "s-references-4-21",
       "original": "Conformer: Convolution-augmented transformer for speech recognition. arXiv, 2020."
      },
      {
       "id": "s-references-4-22",
       "original": "[16] E."
      },
      {
       "id": "s-references-4-23",
       "original": "J."
      },
      {
       "id": "s-references-4-24",
       "original": "Gumbel."
      },
      {
       "id": "s-references-4-25",
       "original": "Statistical theory of extreme values and some practical applications: a series of lectures, volume 33."
      },
      {
       "id": "s-references-4-26",
       "original": "US Government Printing Ofﬁce, 1954."
      },
      {
       "id": "s-references-4-27",
       "original": "[17] W."
      },
      {
       "id": "s-references-4-28",
       "original": "Han, Z."
      },
      {
       "id": "s-references-4-29",
       "original": "Zhang, Y."
      },
      {
       "id": "s-references-4-30",
       "original": "Zhang, J."
      },
      {
       "id": "s-references-4-31",
       "original": "Yu, C.-C."
      },
      {
       "id": "s-references-4-32",
       "original": "Chiu, J."
      },
      {
       "id": "s-references-4-33",
       "original": "Qin, A."
      },
      {
       "id": "s-references-4-34",
       "original": "Gulati, R."
      },
      {
       "id": "s-references-4-35",
       "original": "Pang, and Y."
      },
      {
       "id": "s-references-4-36",
       "original": "Wu."
      },
      {
       "id": "s-references-4-37",
       "original": "Contextnet: Improving convolutional neural networks for automatic speech recognition with global context."
      }
     ]
    },
    {
     "id": "p-references-5",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-5-1",
       "original": "[18] D."
      },
      {
       "id": "s-references-5-2",
       "original": "Harwath, W.-N."
      },
      {
       "id": "s-references-5-3",
       "original": "Hsu, and J."
      },
      {
       "id": "s-references-5-4",
       "original": "Glass."
      },
      {
       "id": "s-references-5-5",
       "original": "Learning hierarchical discrete linguistic units from visually-grounded speech."
      },
      {
       "id": "s-references-5-6",
       "original": "In Proc. of ICLR, 2020."
      }
     ]
    },
    {
     "id": "p-references-6",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-6-1",
       "original": "[19] K."
      },
      {
       "id": "s-references-6-2",
       "original": "He, H."
      },
      {
       "id": "s-references-6-3",
       "original": "Fan, Y."
      },
      {
       "id": "s-references-6-4",
       "original": "Wu, S."
      },
      {
       "id": "s-references-6-5",
       "original": "Xie, and R."
      },
      {
       "id": "s-references-6-6",
       "original": "Girshick."
      },
      {
       "id": "s-references-6-7",
       "original": "Momentum contrast for unsupervised visual representation learning. arXiv, abs/1911.05722, 2019."
      }
     ]
    },
    {
     "id": "p-references-7",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-7-1",
       "original": "[20] O."
      },
      {
       "id": "s-references-7-2",
       "original": "J."
      },
      {
       "id": "s-references-7-3",
       "original": "Hénaff, A."
      },
      {
       "id": "s-references-7-4",
       "original": "Razavi, C."
      },
      {
       "id": "s-references-7-5",
       "original": "Doersch, S."
      },
      {
       "id": "s-references-7-6",
       "original": "M."
      },
      {
       "id": "s-references-7-7",
       "original": "A."
      },
      {
       "id": "s-references-7-8",
       "original": "Eslami, and A. van den Oord."
      },
      {
       "id": "s-references-7-9",
       "original": "Data-efﬁcient image recognition with contrastive predictive coding. arXiv, abs/1905.09272, 2019."
      }
     ]
    },
    {
     "id": "p-references-8",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-8-1",
       "original": "[21] D."
      },
      {
       "id": "s-references-8-2",
       "original": "Hendrycks and K."
      },
      {
       "id": "s-references-8-3",
       "original": "Gimpel."
      },
      {
       "id": "s-references-8-4",
       "original": "Gaussian error linear units (gelus). arXiv, 2016."
      }
     ]
    },
    {
     "id": "p-references-9",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-9-1",
       "original": "[22] G."
      },
      {
       "id": "s-references-9-2",
       "original": "Huang, Y."
      },
      {
       "id": "s-references-9-3",
       "original": "Sun, Z."
      },
      {
       "id": "s-references-9-4",
       "original": "Liu, D."
      },
      {
       "id": "s-references-9-5",
       "original": "Sedra, and K."
      },
      {
       "id": "s-references-9-6",
       "original": "Weinberger."
      },
      {
       "id": "s-references-9-7",
       "original": "Deep networks with stochastic depth."
      }
     ]
    },
    {
     "id": "p-references-10",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-10-1",
       "original": "[23] M."
      },
      {
       "id": "s-references-10-2",
       "original": "G."
      },
      {
       "id": "s-references-10-3",
       "original": "A."
      },
      {
       "id": "s-references-10-4",
       "original": "Hyvärinen."
      },
      {
       "id": "s-references-10-5",
       "original": "Noise-contrastive estimation: A new estimation principle for unnormalized statistical models."
      },
      {
       "id": "s-references-10-6",
       "original": "In Proc. of AISTATS, 2010."
      }
     ]
    },
    {
     "id": "p-references-11",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-11-1",
       "original": "[24] E."
      },
      {
       "id": "s-references-11-2",
       "original": "Jang, S."
      },
      {
       "id": "s-references-11-3",
       "original": "Gu, and B."
      },
      {
       "id": "s-references-11-4",
       "original": "Poole."
      },
      {
       "id": "s-references-11-5",
       "original": "Categorical reparameterization with gumbel-softmax. arXiv, abs/1611.01144, 2016."
      }
     ]
    },
    {
     "id": "p-references-12",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-12-1",
       "original": "[25] H."
      },
      {
       "id": "s-references-12-2",
       "original": "Jegou, M."
      },
      {
       "id": "s-references-12-3",
       "original": "Douze, and C."
      },
      {
       "id": "s-references-12-4",
       "original": "Schmid."
      },
      {
       "id": "s-references-12-5",
       "original": "Product quantization for nearest neighbor search."
      },
      {
       "id": "s-references-12-6",
       "original": "IEEE Trans."
      },
      {
       "id": "s-references-12-7",
       "original": "Pattern Anal."
      },
      {
       "id": "s-references-12-8",
       "original": "Mach."
      },
      {
       "id": "s-references-12-9",
       "original": "Intell., 33(1):117–128, Jan. 2011."
      }
     ]
    },
    {
     "id": "p-references-13",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-13-1",
       "original": "[26] D."
      },
      {
       "id": "s-references-13-2",
       "original": "Jiang, X."
      },
      {
       "id": "s-references-13-3",
       "original": "Lei, W."
      },
      {
       "id": "s-references-13-4",
       "original": "Li, N."
      },
      {
       "id": "s-references-13-5",
       "original": "Luo, Y."
      },
      {
       "id": "s-references-13-6",
       "original": "Hu, W."
      },
      {
       "id": "s-references-13-7",
       "original": "Zou, and X."
      },
      {
       "id": "s-references-13-8",
       "original": "Li."
      },
      {
       "id": "s-references-13-9",
       "original": "Improving transformer-based speech recognition using unsupervised pre-training. arXiv, abs/1910.09932, 2019."
      }
     ]
    },
    {
     "id": "p-references-14",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-14-1",
       "original": "[27] J."
      },
      {
       "id": "s-references-14-2",
       "original": "Kahn et al. Libri-light: A benchmark for asr with limited or no supervision."
      },
      {
       "id": "s-references-14-3",
       "original": "In Proc. of ICASSP, 2020."
      }
     ]
    },
    {
     "id": "p-references-15",
     "type": "paragraph",
     "page": 10,
     "sentences": [
      {
       "id": "s-references-15-1",
       "original": "[28] K."
      },
      {
       "id": "s-references-15-2",
       "original": "Kawakami, L."
      },
      {
       "id": "s-references-15-3",
       "original": "Wang, C."
      },
      {
       "id": "s-references-15-4",
       "original": "Dyer, P."
      },
      {
       "id": "s-references-15-5",
       "original": "Blunsom, and A. van den Oord."
      },
      {
       "id": "s-references-15-6",
       "original": "Learning robust and multilingual speech representations. arXiv, 2020."
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
       "original": "[29] D."
      },
      {
       "id": "s-references-16-2",
       "original": "P."
      },
      {
       "id": "s-references-16-3",
       "original": "Kingma and J."
      },
      {
       "id": "s-references-16-4",
       "original": "Ba."
      },
      {
       "id": "s-references-16-5",
       "original": "Adam: A Method for Stochastic Optimization."
      },
      {
       "id": "s-references-16-6",
       "original": "In Proc. of ICLR, 2015."
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
       "original": "[30] A."
      },
      {
       "id": "s-references-17-2",
       "original": "Laptev, R."
      },
      {
       "id": "s-references-17-3",
       "original": "Korostik, A."
      },
      {
       "id": "s-references-17-4",
       "original": "Svischev, A."
      },
      {
       "id": "s-references-17-5",
       "original": "Andrusenko, I."
      },
      {
       "id": "s-references-17-6",
       "original": "Medennikov, and S."
      },
      {
       "id": "s-references-17-7",
       "original": "Rybin."
      },
      {
       "id": "s-references-17-8",
       "original": "You do not need more data: Improving end-to-end speech recognition by text-to-speech data augmentation."
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
       "original": "arXiv, abs/2005.07157, 2020."
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
       "original": "[31] M."
      },
      {
       "id": "s-references-19-2",
       "original": "P."
      },
      {
       "id": "s-references-19-3",
       "original": "Lewis, G."
      },
      {
       "id": "s-references-19-4",
       "original": "F."
      },
      {
       "id": "s-references-19-5",
       "original": "Simon, and C."
      },
      {
       "id": "s-references-19-6",
       "original": "D."
      },
      {
       "id": "s-references-19-7",
       "original": "Fennig."
      },
      {
       "id": "s-references-19-8",
       "original": "Ethnologue: Languages of the world, nineteenth edition."
      },
      {
       "id": "s-references-19-9",
       "original": "Online version: http://www.ethnologue.com, 2016."
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
       "original": "[32] A."
      },
      {
       "id": "s-references-20-2",
       "original": "H."
      },
      {
       "id": "s-references-20-3",
       "original": "Liu, T."
      },
      {
       "id": "s-references-20-4",
       "original": "Tu, H. yi Lee, and L. shan Lee."
      },
      {
       "id": "s-references-20-5",
       "original": "Towards unsupervised speech recognition and synthesis with quantized speech representation learning. arXiv, 2019."
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
       "original": "[33] Y."
      },
      {
       "id": "s-references-21-2",
       "original": "Liu, M."
      },
      {
       "id": "s-references-21-3",
       "original": "Ott, N."
      },
      {
       "id": "s-references-21-4",
       "original": "Goyal, J."
      },
      {
       "id": "s-references-21-5",
       "original": "Du, M."
      },
      {
       "id": "s-references-21-6",
       "original": "Joshi, D."
      },
      {
       "id": "s-references-21-7",
       "original": "Chen, O."
      },
      {
       "id": "s-references-21-8",
       "original": "Levy, M."
      },
      {
       "id": "s-references-21-9",
       "original": "Lewis, L."
      },
      {
       "id": "s-references-21-10",
       "original": "Zettlemoyer, and V."
      },
      {
       "id": "s-references-21-11",
       "original": "Stoyanov."
      },
      {
       "id": "s-references-21-12",
       "original": "Roberta: A robustly optimized bert pretraining approach. arXiv preprint arXiv:1907.11692, 2019."
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
       "original": "[34] C."
      },
      {
       "id": "s-references-22-2",
       "original": "Lüscher, E."
      },
      {
       "id": "s-references-22-3",
       "original": "Beck, K."
      },
      {
       "id": "s-references-22-4",
       "original": "Irie, M."
      },
      {
       "id": "s-references-22-5",
       "original": "Kitza, W."
      },
      {
       "id": "s-references-22-6",
       "original": "Michel, A."
      },
      {
       "id": "s-references-22-7",
       "original": "Zeyer, R."
      },
      {
       "id": "s-references-22-8",
       "original": "Schlüter, and H."
      },
      {
       "id": "s-references-22-9",
       "original": "Ney."
      },
      {
       "id": "s-references-22-10",
       "original": "Rwth asr systems for librispeech: Hybrid vs attention."
      },
      {
       "id": "s-references-22-11",
       "original": "In Interspeech 2019, 2019."
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
       "original": "[35] C."
      },
      {
       "id": "s-references-23-2",
       "original": "J."
      },
      {
       "id": "s-references-23-3",
       "original": "Maddison, D."
      },
      {
       "id": "s-references-23-4",
       "original": "Tarlow, and T."
      },
      {
       "id": "s-references-23-5",
       "original": "Minka."
      },
      {
       "id": "s-references-23-6",
       "original": "A* sampling."
      },
      {
       "id": "s-references-23-7",
       "original": "In Advances in Neural Information Processing Systems, pages 3086–3094, 2014."
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
       "original": "[36] I."
      },
      {
       "id": "s-references-24-2",
       "original": "Misra and L. van der Maaten."
      },
      {
       "id": "s-references-24-3",
       "original": "Self-supervised learning of pretext-invariant representations."
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
       "original": "[37] A."
      },
      {
       "id": "s-references-25-2",
       "original": "Mohamed, D."
      },
      {
       "id": "s-references-25-3",
       "original": "Okhonko, and L."
      },
      {
       "id": "s-references-25-4",
       "original": "Zettlemoyer."
      },
      {
       "id": "s-references-25-5",
       "original": "Transformers with convolutional context for ASR. arXiv, abs/1904.11660, 2019."
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
       "original": "[38] M."
      },
      {
       "id": "s-references-26-2",
       "original": "Ott, S."
      },
      {
       "id": "s-references-26-3",
       "original": "Edunov, D."
      },
      {
       "id": "s-references-26-4",
       "original": "Grangier, and M."
      },
      {
       "id": "s-references-26-5",
       "original": "Auli."
      },
      {
       "id": "s-references-26-6",
       "original": "Scaling neural machine translation."
      },
      {
       "id": "s-references-26-7",
       "original": "In Proc. of WMT, 2018."
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
       "original": "[39] M."
      },
      {
       "id": "s-references-27-2",
       "original": "Ott, S."
      },
      {
       "id": "s-references-27-3",
       "original": "Edunov, A."
      },
      {
       "id": "s-references-27-4",
       "original": "Baevski, A."
      },
      {
       "id": "s-references-27-5",
       "original": "Fan, S."
      },
      {
       "id": "s-references-27-6",
       "original": "Gross, N."
      },
      {
       "id": "s-references-27-7",
       "original": "Ng, D."
      },
      {
       "id": "s-references-27-8",
       "original": "Grangier, and M."
      },
      {
       "id": "s-references-27-9",
       "original": "Auli. fairseq: A fast, extensible toolkit for sequence modeling."
      },
      {
       "id": "s-references-27-10",
       "original": "In Proc. of NAACL System Demonstrations, 2019."
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
       "original": "[40] V."
      },
      {
       "id": "s-references-28-2",
       "original": "Panayotov, G."
      },
      {
       "id": "s-references-28-3",
       "original": "Chen, D."
      },
      {
       "id": "s-references-28-4",
       "original": "Povey, and S."
      },
      {
       "id": "s-references-28-5",
       "original": "Khudanpur."
      },
      {
       "id": "s-references-28-6",
       "original": "Librispeech: an asr corpus based on public domain audio books."
      },
      {
       "id": "s-references-28-7",
       "original": "In Proc. of ICASSP, pages 5206–5210."
      },
      {
       "id": "s-references-28-8",
       "original": "IEEE, 2015."
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
       "original": "[41] D."
      },
      {
       "id": "s-references-29-2",
       "original": "S."
      },
      {
       "id": "s-references-29-3",
       "original": "Park, W."
      },
      {
       "id": "s-references-29-4",
       "original": "Chan, Y."
      },
      {
       "id": "s-references-29-5",
       "original": "Zhang, C.-C."
      },
      {
       "id": "s-references-29-6",
       "original": "Chiu, B."
      },
      {
       "id": "s-references-29-7",
       "original": "Zoph, E."
      },
      {
       "id": "s-references-29-8",
       "original": "D."
      },
      {
       "id": "s-references-29-9",
       "original": "Cubuk, and Q."
      },
      {
       "id": "s-references-29-10",
       "original": "V."
      },
      {
       "id": "s-references-29-11",
       "original": "Le."
      },
      {
       "id": "s-references-29-12",
       "original": "Specaugment: A simple data augmentation method for automatic speech recognition."
      },
      {
       "id": "s-references-29-13",
       "original": "In Proc. of Interspeech, 2019."
      }
     ]
    },
    {
     "id": "p-references-30",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-30-1",
       "original": "[42] D."
      },
      {
       "id": "s-references-30-2",
       "original": "S."
      },
      {
       "id": "s-references-30-3",
       "original": "Park, Y."
      },
      {
       "id": "s-references-30-4",
       "original": "Zhang, Y."
      },
      {
       "id": "s-references-30-5",
       "original": "Jia, W."
      },
      {
       "id": "s-references-30-6",
       "original": "Han, C.-C."
      },
      {
       "id": "s-references-30-7",
       "original": "Chiu, B."
      },
      {
       "id": "s-references-30-8",
       "original": "Li, Y."
      },
      {
       "id": "s-references-30-9",
       "original": "Wu, and Q."
      },
      {
       "id": "s-references-30-10",
       "original": "V."
      },
      {
       "id": "s-references-30-11",
       "original": "Le."
      },
      {
       "id": "s-references-30-12",
       "original": "Improved noisy student training for automatic speech recognition. arXiv, abs/2005.09629, 2020."
      },
      {
       "id": "s-references-30-13",
       "original": "[43] M."
      },
      {
       "id": "s-references-30-14",
       "original": "E."
      },
      {
       "id": "s-references-30-15",
       "original": "Peters, M."
      },
      {
       "id": "s-references-30-16",
       "original": "Neumann, M."
      },
      {
       "id": "s-references-30-17",
       "original": "Iyyer, M."
      },
      {
       "id": "s-references-30-18",
       "original": "Gardner, C."
      },
      {
       "id": "s-references-30-19",
       "original": "Clark, K."
      },
      {
       "id": "s-references-30-20",
       "original": "Lee, and L."
      },
      {
       "id": "s-references-30-21",
       "original": "Zettlemoyer."
      },
      {
       "id": "s-references-30-22",
       "original": "Deep contextualized word representations."
      },
      {
       "id": "s-references-30-23",
       "original": "In Proc. of ACL, 2018."
      },
      {
       "id": "s-references-30-24",
       "original": "[44] V."
      },
      {
       "id": "s-references-30-25",
       "original": "Pratap, A."
      },
      {
       "id": "s-references-30-26",
       "original": "Hannun, Q."
      },
      {
       "id": "s-references-30-27",
       "original": "Xu, J."
      },
      {
       "id": "s-references-30-28",
       "original": "Cai, J."
      },
      {
       "id": "s-references-30-29",
       "original": "Kahn, G."
      },
      {
       "id": "s-references-30-30",
       "original": "Synnaeve, V."
      },
      {
       "id": "s-references-30-31",
       "original": "Liptchinsky, and R."
      },
      {
       "id": "s-references-30-32",
       "original": "Collobert."
      }
     ]
    },
    {
     "id": "p-references-31",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-31-1",
       "original": "Wav2letter++: A fast open-source speech recognition system."
      },
      {
       "id": "s-references-31-2",
       "original": "In Proc. of ICASSP, 2019."
      },
      {
       "id": "s-references-31-3",
       "original": "[45] A."
      },
      {
       "id": "s-references-31-4",
       "original": "Radford, K."
      },
      {
       "id": "s-references-31-5",
       "original": "Narasimhan, T."
      },
      {
       "id": "s-references-31-6",
       "original": "Salimans, and I."
      },
      {
       "id": "s-references-31-7",
       "original": "Sutskever."
      },
      {
       "id": "s-references-31-8",
       "original": "Improving language understanding by generative pre-training. https://s3-us-west-2.amazonaws.com/openai-assets/ research-covers/language-unsupervised/language_understanding_paper.pdf, 2018."
      },
      {
       "id": "s-references-31-9",
       "original": "[46] M."
      },
      {
       "id": "s-references-31-10",
       "original": "Ravanelli, P."
      },
      {
       "id": "s-references-31-11",
       "original": "Brakel, M."
      },
      {
       "id": "s-references-31-12",
       "original": "Omologo, and Y."
      },
      {
       "id": "s-references-31-13",
       "original": "Bengio."
      },
      {
       "id": "s-references-31-14",
       "original": "Light gated recurrent units for speech recognition."
      },
      {
       "id": "s-references-31-15",
       "original": "IEEE Transactions on Emerging Topics in Computational Intelligence, 2(2):92–102, 2018."
      },
      {
       "id": "s-references-31-16",
       "original": "[47] M."
      },
      {
       "id": "s-references-31-17",
       "original": "Ravanelli, J."
      },
      {
       "id": "s-references-31-18",
       "original": "Zhong, S."
      },
      {
       "id": "s-references-31-19",
       "original": "Pascual, P."
      },
      {
       "id": "s-references-31-20",
       "original": "Swietojanski, J."
      },
      {
       "id": "s-references-31-21",
       "original": "Monteiro, J."
      },
      {
       "id": "s-references-31-22",
       "original": "Trmal, and Y."
      },
      {
       "id": "s-references-31-23",
       "original": "Bengio."
      }
     ]
    },
    {
     "id": "p-references-32",
     "type": "paragraph",
     "page": 11,
     "sentences": [
      {
       "id": "s-references-32-1",
       "original": "Multi-task self-supervised learning for robust speech recognition. arXiv, 2020."
      },
      {
       "id": "s-references-32-2",
       "original": "[48] M."
      },
      {
       "id": "s-references-32-3",
       "original": "Rivière, A."
      },
      {
       "id": "s-references-32-4",
       "original": "Joulin, P.-E."
      },
      {
       "id": "s-references-32-5",
       "original": "Mazaré, and E."
      },
      {
       "id": "s-references-32-6",
       "original": "Dupoux."
      },
      {
       "id": "s-references-32-7",
       "original": "Unsupervised pretraining transfers well across languages. arXiv, abs/2002.02848, 2020."
      },
      {
       "id": "s-references-32-8",
       "original": "[49] S."
      },
      {
       "id": "s-references-32-9",
       "original": "Schneider, A."
      },
      {
       "id": "s-references-32-10",
       "original": "Baevski, R."
      },
      {
       "id": "s-references-32-11",
       "original": "Collobert, and M."
      },
      {
       "id": "s-references-32-12",
       "original": "Auli. wav2vec: Unsupervised pre-training for speech recognition."
      },
      {
       "id": "s-references-32-13",
       "original": "In Proc. of Interspeech, 2019."
      },
      {
       "id": "s-references-32-14",
       "original": "[50] M."
      },
      {
       "id": "s-references-32-15",
       "original": "Schuster and K."
      },
      {
       "id": "s-references-32-16",
       "original": "Nakajima."
      },
      {
       "id": "s-references-32-17",
       "original": "Japanese and korean voice search."
      },
      {
       "id": "s-references-32-18",
       "original": "In Proc. of ICASSP, 2012."
      },
      {
       "id": "s-references-32-19",
       "original": "[51] G."
      },
      {
       "id": "s-references-32-20",
       "original": "Synnaeve, Q."
      },
      {
       "id": "s-references-32-21",
       "original": "Xu, J."
      },
      {
       "id": "s-references-32-22",
       "original": "Kahn, T."
      },
      {
       "id": "s-references-32-23",
       "original": "Likhomanenko, E."
      },
      {
       "id": "s-references-32-24",
       "original": "Grave, V."
      },
      {
       "id": "s-references-32-25",
       "original": "Pratap, A."
      },
      {
       "id": "s-references-32-26",
       "original": "Sriram, V."
      },
      {
       "id": "s-references-32-27",
       "original": "Liptchinsky, and R."
      },
      {
       "id": "s-references-32-28",
       "original": "Collobert."
      },
      {
       "id": "s-references-32-29",
       "original": "End-to-end ASR: from Supervised to Semi-Supervised Learning with Modern Architectures. arXiv, abs/1911.08460, 2020."
      },
      {
       "id": "s-references-32-30",
       "original": "[52] A."
      },
      {
       "id": "s-references-32-31",
       "original": "Tjandra, B."
      },
      {
       "id": "s-references-32-32",
       "original": "Sisman, M."
      },
      {
       "id": "s-references-32-33",
       "original": "Zhang, S."
      },
      {
       "id": "s-references-32-34",
       "original": "Sakti, H."
      },
      {
       "id": "s-references-32-35",
       "original": "Li, and S."
      },
      {
       "id": "s-references-32-36",
       "original": "Nakamura."
      },
      {
       "id": "s-references-32-37",
       "original": "Vqvae unsupervised unit discovery and multi-scale code2spec inverter for zerospeech challenge 2019. arXiv, 1905.11449, 2019."
      },
      {
       "id": "s-references-32-38",
       "original": "[53] A. van den Oord, O."
      },
      {
       "id": "s-references-32-39",
       "original": "Vinyals, et al. Neural discrete representation learning."
      },
      {
       "id": "s-references-32-40",
       "original": "In Advances in Neural Information Processing Systems, pages 6306–6315, 2017."
      },
      {
       "id": "s-references-32-41",
       "original": "[54] A. van den Oord, Y."
      },
      {
       "id": "s-references-32-42",
       "original": "Li, and O."
      },
      {
       "id": "s-references-32-43",
       "original": "Vinyals."
      },
      {
       "id": "s-references-32-44",
       "original": "Representation learning with contrastive predictive coding. arXiv, abs/1807.03748, 2018."
      },
      {
       "id": "s-references-32-45",
       "original": "[55] A."
      },
      {
       "id": "s-references-32-46",
       "original": "Vaswani, N."
      },
      {
       "id": "s-references-32-47",
       "original": "Shazeer, N."
      },
      {
       "id": "s-references-32-48",
       "original": "Parmar, J."
      },
      {
       "id": "s-references-32-49",
       "original": "Uszkoreit, L."
      },
      {
       "id": "s-references-32-50",
       "original": "Jones, A."
      },
      {
       "id": "s-references-32-51",
       "original": "N."
      },
      {
       "id": "s-references-32-52",
       "original": "Gomez, L."
      },
      {
       "id": "s-references-32-53",
       "original": "Kaiser, and I."
      },
      {
       "id": "s-references-32-54",
       "original": "Polosukhin."
      },
      {
       "id": "s-references-32-55",
       "original": "Attention is all you need."
      },
      {
       "id": "s-references-32-56",
       "original": "In Proc. of NIPS, 2017."
      },
      {
       "id": "s-references-32-57",
       "original": "[56] W."
      },
      {
       "id": "s-references-32-58",
       "original": "Wang, Q."
      },
      {
       "id": "s-references-32-59",
       "original": "Tang, and K."
      },
      {
       "id": "s-references-32-60",
       "original": "Livescu."
      },
      {
       "id": "s-references-32-61",
       "original": "Unsupervised pre-training of bidirectional speech encoders via masked reconstruction. arXiv, 2020."
      },
      {
       "id": "s-references-32-62",
       "original": "[57] F."
      },
      {
       "id": "s-references-32-63",
       "original": "Wu, A."
      },
      {
       "id": "s-references-32-64",
       "original": "Fan, A."
      },
      {
       "id": "s-references-32-65",
       "original": "Baevski, Y."
      },
      {
       "id": "s-references-32-66",
       "original": "N."
      },
      {
       "id": "s-references-32-67",
       "original": "Dauphin, and M."
      },
      {
       "id": "s-references-32-68",
       "original": "Auli."
      },
      {
       "id": "s-references-32-69",
       "original": "Pay less attention with lightweight and dynamic convolutions."
      },
      {
       "id": "s-references-32-70",
       "original": "In Proc. of ICLR, 2019."
      },
      {
       "id": "s-references-32-71",
       "original": "[58] Q."
      },
      {
       "id": "s-references-32-72",
       "original": "Xu, T."
      },
      {
       "id": "s-references-32-73",
       "original": "Likhomanenko, J."
      },
      {
       "id": "s-references-32-74",
       "original": "Kahn, A."
      },
      {
       "id": "s-references-32-75",
       "original": "Hannun, G."
      },
      {
       "id": "s-references-32-76",
       "original": "Synnaeve, and R."
      },
      {
       "id": "s-references-32-77",
       "original": "Collobert."
      },
      {
       "id": "s-references-32-78",
       "original": "Iterative pseudo-labeling for speech recognition. arXiv, 2020."
      },
      {
       "id": "s-references-32-79",
       "original": "[59] N."
      },
      {
       "id": "s-references-32-80",
       "original": "Zeghidour, N."
      },
      {
       "id": "s-references-32-81",
       "original": "Usunier, I."
      },
      {
       "id": "s-references-32-82",
       "original": "Kokkinos, T."
      },
      {
       "id": "s-references-32-83",
       "original": "Schaiz, G."
      },
      {
       "id": "s-references-32-84",
       "original": "Synnaeve, and E."
      },
      {
       "id": "s-references-32-85",
       "original": "Dupoux."
      },
      {
       "id": "s-references-32-86",
       "original": "Learning ﬁlterbanks from raw speech for phone recognition."
      },
      {
       "id": "s-references-32-87",
       "original": "In Proc. of ICASSP, 2018."
      },
      {
       "id": "s-references-32-88",
       "original": "[60] Q."
      },
      {
       "id": "s-references-32-89",
       "original": "Zhang, H."
      },
      {
       "id": "s-references-32-90",
       "original": "Lu, H."
      },
      {
       "id": "s-references-32-91",
       "original": "Sak, A."
      },
      {
       "id": "s-references-32-92",
       "original": "Tripathi, E."
      },
      {
       "id": "s-references-32-93",
       "original": "McDermott, S."
      },
      {
       "id": "s-references-32-94",
       "original": "Koo, and S."
      },
      {
       "id": "s-references-32-95",
       "original": "Kumar."
      },
      {
       "id": "s-references-32-96",
       "original": "Transformer transducer: A streamable speech recognition model with transformer encoders and rnn-t loss."
      }
     ]
    }
   ]
  },
  {
   "id": "sec-appendices",
   "num": null,
   "level": 1,
   "page": 12,
   "title": {
    "original": "Appendices",
    "zh": "附录"
   },
   "blocks": []
  },
  {
   "id": "sec-A",
   "num": "A",
   "level": 1,
   "page": 12,
   "title": {
    "original": "Masking distribution",
    "zh": "附录 A 掩码分布"
   },
   "blocks": [
    {
     "id": "p-A-1",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-A-1-1",
       "original": "When choosing which time-steps to mask, each latent speech representation in an utterance is considered a candidate starting time-step with probability p where M is the length of each masked span starting from the respective time step; both are hyper-parameters.",
       "zh": "选择要掩码哪些时间步时，一条语音中的每个潜在语音表示都以概率 p 被视为候选起始时间步，M 是从该时间步开始的掩码片段长度；二者都是超参数。"
      },
      {
       "id": "s-A-1-2",
       "original": "Sampled starting time steps are expanded to length M and spans can overlap.",
       "zh": "被采样的起始时间步会扩展为长度 M 的片段，片段之间允许重叠。"
      }
     ]
    },
    {
     "id": "p-A-2",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-A-2-1",
       "original": "For a 15 sec long audio sample, the average mask length is 14.7 time-steps, corresponding to 299ms of audio, with a median of 10 time-steps, and a maximum of about 100 time steps; about 49% of all time-steps in the sample will be masked.",
       "zh": "对一段 15 秒的音频样本，平均掩码长度为 14.7 个时间步，对应 299ms 音频；中位数为 10 个时间步，最大约为 100 个时间步；样本中约 49% 的时间步会被掩码。"
      },
      {
       "id": "s-A-2-2",
       "original": "A plot of the corresponding mask length distribution is shown in Figure 2 and an ablation of M and p as well as the effect of other masking strategies is shown in Table 5.",
       "zh": "相应的掩码长度分布见 Figure 2；M 与 p 的消融以及其他掩码策略的影响见 Table 5。"
      },
      {
       "id": "s-A-2-3",
       "original": "Reducing M results in increased prediction accuracy for the self-supervised but the task becomes trivial when spans with length one are masked, leading to poor performance on downstream speech recognition tasks.",
       "zh": "减小 M 会让自监督任务的预测准确率上升，但当掩码长度为 1 的片段时任务变得过于简单，导致下游语音识别性能变差。"
      },
      {
       "id": "s-A-2-4",
       "original": "We also consider other masking strategies: w/o overlap uniform(a,b) samples for each starting index a span length M s from interval a to b and masks the subsequent M s time-steps taking care not to overlap with existing spans; poisson(λ) and normal(µ, σ) sample M s from Poisson and normal distributions.",
       "zh": "我们还考察了其他掩码策略：w/o overlap uniform(a,b) 为每个起始下标从区间 a 到 b 中采样一个片段长度 Ms，并掩码其后 Ms 个时间步，同时注意不与已有片段重叠；poisson(λ) 与 normal(µ, σ) 则分别从泊松分布和正态分布中采样 Ms。"
      }
     ]
    },
    {
     "id": "p-A-3",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-A-3-1",
       "original": "0.25 0.20 Percent of all spans 0.15 0.10 0.05 20 40 60 80 100 Span length 0.00",
       "zh": "（Figure 2 坐标轴文字碎块）0.25 0.20（占全部片段的百分比）0.15 0.10 0.05；（横轴）20 40 60 80 100（片段长度）0.00。"
      }
     ]
    },
    {
     "id": "fig-A-1",
     "type": "figure_caption",
     "page": 12,
     "original": "Figure 2: Mask length distribution for a 15 second sample with p = 0.065 and M = 10.",
     "zh": "图 2：对 15 秒样本、p = 0.065、M = 10 时的掩码长度分布。"
    },
    {
     "id": "tab-A-1",
     "type": "table_caption",
     "page": 12,
     "original": "Table 5: Ablations on settings for the masking strategy during pre-training. When masking without overlap, we choose starting time steps with p = 0.037 which results in the total number of masked tokens to match the baseline.",
     "zh": "表 5：预训练掩码策略各项设置的消融。当采用无重叠掩码时，我们以 p = 0.037 选取起始时间步，使被掩码 token 总数与基线一致。"
    },
    {
     "id": "p-A-4",
     "type": "paragraph",
     "page": 12,
     "sentences": [
      {
       "id": "s-A-4-1",
       "original": "avg WER std Baseline (p = 0.075) 7.97 0.02 Mask length M = 8 8.33 0.05 Mask length M = 12 8.19 0.08 Mask length M = 15 8.43 0.19 Mask probability p = 0.065 7.95 0.08 Mask probability p = 0.06 8.14 0.22 Mask w/o overlap, uniform(1,31) 8.39 0.02 Mask w/o overlap, uniform(10,30) 9.17 0.05 Mask w/o overlap, poisson(15) 8.13 0.04 Mask w/o overlap, normal(15, 10) 8.37 0.03 Mask w/o overlap, length 10 9.15 0.02 Mask w/o overlap, length 15 9.43 0.26",
       "zh": "（Table 5 数值碎块）平均 WER / 标准差：Baseline (p = 0.075) 7.97 0.02；掩码长度 M = 8：8.33 0.05；M = 12：8.19 0.08；M = 15：8.43 0.19；掩码概率 p = 0.065：7.95 0.08；p = 0.06：8.14 0.22；无重叠掩码 uniform(1,31)：8.39 0.02；uniform(10,30)：9.17 0.05；poisson(15)：8.13 0.04；normal(15, 10)：8.37 0.03；固定长度 10：9.15 0.02；固定长度 15：9.43 0.26。"
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
    "original": "Fine-tuning Setup",
    "zh": "附录 B 微调设置"
   },
   "blocks": [
    {
     "id": "p-B-1",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-B-1-1",
       "original": "During ﬁne-tuning we apply a masking strategy to the feature encoder outputs similar to SpecAugment [41]: we randomly choose a number of starting time steps for which a span of ten subsequent time-steps is replaced with a mask embedding; spans may overlap and we use the same masked time step embedding as during pre-training.",
       "zh": "微调时，我们对特征编码器输出施加一种类似 SpecAugment [41] 的掩码策略：随机选取若干起始时间步，把其后 10 个时间步组成的片段替换为掩码嵌入；片段允许重叠，且使用与预训练相同的掩码时间步嵌入。"
      },
      {
       "id": "s-B-1-2",
       "original": "We also mask channels by choosing a number of channels as starting indices and then expand each one to cover the subsequent 64 channels.",
       "zh": "我们还做通道掩码：选取若干通道作为起始下标，然后把每个起始下标扩展为覆盖其后 64 个通道。"
      },
      {
       "id": "s-B-1-3",
       "original": "Spans may overlap and the selected channel spans are set to zero value.",
       "zh": "片段允许重叠，被选中的通道片段被置为零值。"
      },
      {
       "id": "s-B-1-4",
       "original": "We use LayerDrop [22, 12] at a rate of 0.05 for BASE and 0.1 for LARGE during ﬁne-tuning.",
       "zh": "微调时使用 LayerDrop [22, 12]，比例为：BASE 0.05，LARGE 0.1。"
      }
     ]
    },
    {
     "id": "tab-B-1",
     "type": "table_caption",
     "page": 13,
     "original": "Table 6 summarizes the ﬁne-tuning hyper-parameter settings used for the different labeled data setup. Table 7 shows the decoding parameters used for ﬁnal evaluations of the various labeled data setups for Librispeech pre-trained models and Table 8 shows decoding parameters for LibriVox.",
     "zh": "表 6 总结了各标注数据设置所用的微调超参数；Table 7 给出 Librispeech 预训练模型在各标注数据设置下做最终评测的解码参数；Table 8 给出 LibriVox 的解码参数。"
    },
    {
     "id": "tab-B-2",
     "type": "table_caption",
     "page": 13,
     "original": "Table 6: Fine-tuning hyperparameters timestep mask prob. channel mask prob. updates",
     "zh": "表 6：微调超参数（时间步掩码概率、通道掩码概率、更新次数）。"
    },
    {
     "id": "p-B-2",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-B-2-1",
       "original": "10 min 0.075 0.008 1 hour 0.075 0.004 0.065 0.004 0.05 0.008 0.05 0.0016 TIMIT 0.065 0.012",
       "zh": "（Table 6 数值碎块）10 min：0.075 0.008；1 hour：0.075 0.004；0.065 0.004；0.05 0.008；0.05 0.0016；TIMIT：0.065 0.012。"
      }
     ]
    },
    {
     "id": "tab-B-3",
     "type": "table_caption",
     "page": 13,
     "original": "Table 7: Decoding parameters for Librispeech subsets for models pre-trained on Librispeech",
     "zh": "表 7：在 Librispeech 上预训练的模型，于 Librispeech 各子集上的解码参数。"
    },
    {
     "id": "p-B-3",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-B-3-1",
       "original": "4gram LM weight 4gram word insert.",
       "zh": "（Table 7 表头碎块）4gram LM 权重／4gram 词插入。"
      }
     ]
    },
    {
     "id": "p-B-4",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-B-4-1",
       "original": "TransLM weight TransLM word insert.",
       "zh": "（Table 7 表头碎块）TransLM 权重／TransLM 词插入。"
      }
     ]
    },
    {
     "id": "p-B-5",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-B-5-1",
       "original": "10 min 3.23 1.20 1 hour 2.90 1.15 2.46 1.06 2.15 0.87 1.74 0.52 0.92",
       "zh": "（Table 7 数值碎块）10 min：3.23 1.20；1 hour：2.90 1.15；2.46 1.06；2.15 0.87；1.74 0.52；0.92。"
      }
     ]
    },
    {
     "id": "tab-B-4",
     "type": "table_caption",
     "page": 13,
     "original": "Table 8: Decoding parameters for Librispeech subsets for models pre-trained on Librivox.",
     "zh": "表 8：在 Librivox 上预训练的模型，于 Librispeech 各子集上的解码参数。"
    },
    {
     "id": "p-B-6",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-B-6-1",
       "original": "4gram LM weight 4gram word insert.",
       "zh": "（Table 8 表头碎块）4gram LM 权重／4gram 词插入。"
      }
     ]
    },
    {
     "id": "p-B-7",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-B-7-1",
       "original": "TransLM weight TransLM word insert.",
       "zh": "（Table 8 表头碎块）TransLM 权重／TransLM 词插入。"
      }
     ]
    },
    {
     "id": "p-B-8",
     "type": "paragraph",
     "page": 13,
     "sentences": [
      {
       "id": "s-B-8-1",
       "original": "10 min 3.86 1.47 1 hour 3.09 1.33 2.12 0.94 2.15 0.87 1.57 0.90",
       "zh": "（Table 8 数值碎块）10 min：3.86 1.47；1 hour：3.09 1.33；2.12 0.94；2.15 0.87；1.57 0.90。"
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
    "original": "Full results for Libri-light and Librispeech",
    "zh": "附录 C Libri-light 与 Librispeech 的完整结果"
   },
   "blocks": [
    {
     "id": "tab-C-1",
     "type": "table_caption",
     "page": 14,
     "original": "Table 9: WER on the Librispeech dev/test sets when training on the Libri-light low-resource labeled data setups (cf. Table 1).",
     "zh": "表 9：在 Libri-light 低资源标注数据设置上训练时，Librispeech dev/test 集上的 WER（参见 Table 1）。"
    }
   ]
  },
  {
   "id": "sec-10-2",
   "num": "10",
   "level": 1,
   "page": 14,
   "title": {
    "original": "min labeled",
    "zh": "10 分钟标注（附录表格碎片）"
   },
   "blocks": [
    {
     "id": "p-10-2-1",
     "type": "paragraph",
     "page": 14,
     "sentences": [
      {
       "id": "s-10-2-1-1",
       "original": "46.1 51.5 46.9 50.9 8.9 15.7 9.1 15.6 6.6 13.2 6.9 12.9 43.0 46.3 43.5 45.3 8.6 12.9 8.9 13.1 6.6 10.6 6.8 10.8 38.3 41.0 40.2 38.7 6.3 9.8 6.6 10.3 4.6 7.9 4.8 8.2 24.1 29.6 24.5 29.7 5.0 10.8 5.5 11.3 3.8 9.0 4.0 9.3 21.6 25.3 22.1 25.3 4.8 8.5 5.1 9.4 3.8 7.1 3.9 7.6 17.3 20.6 17.2 20.3 3.6 6.5 3.8 7.1 2.9 5.4 2.9 5.8 10.9 17.4 11.1 17.6 3.8 9.1 4.3 9.5 2.9 7.4 3.2 7.8 8.1 12.0 8.0 12.1 3.4 6.9 3.8 7.3 2.9 5.7 3.2 6.1 6.3 9.8 6.3 10.0 2.6 5.5 3.0 5.8 2.4 4.8 2.6 4.9 6.1 13.5 6.1 13.3 2.7 7.9 3.4 8.0 2.2 6.3 2.6 6.3 4.6 9.3 4.7 9.0 2.3 5.7 2.8 6.0 2.1 4.8 2.3 5.0 3.3 6.5 3.1 6.3 1.8 4.5 2.3 4.6 1.9 4.0 2.0 4.0",
       "zh": "（Table 9 数值碎块，含无 LM 与各解码条件）46.1 51.5 46.9 50.9 8.9 15.7 9.1 15.6 6.6 13.2 6.9 12.9 43.0 46.3 43.5 45.3 8.6 12.9 8.9 13.1 6.6 10.6 6.8 10.8 38.3 41.0 40.2 38.7 6.3 9.8 6.6 10.3 4.6 7.9 4.8 8.2 24.1 29.6 24.5 29.7 5.0 10.8 5.5 11.3 3.8 9.0 4.0 9.3 21.6 25.3 22.1 25.3 4.8 8.5 5.1 9.4 3.8 7.1 3.9 7.6 17.3 20.6 17.2 20.3 3.6 6.5 3.8 7.1 2.9 5.4 2.9 5.8 10.9 17.4 11.1 17.6 3.8 9.1 4.3 9.5 2.9 7.4 3.2 7.8 8.1 12.0 8.0 12.1 3.4 6.9 3.8 7.3 2.9 5.7 3.2 6.1 6.3 9.8 6.3 10.0 2.6 5.5 3.0 5.8 2.4 4.8 2.6 4.9 6.1 13.5 6.1 13.3 2.7 7.9 3.4 8.0 2.2 6.3 2.6 6.3 4.6 9.3 4.7 9.0 2.3 5.7 2.8 6.0 2.1 4.8 2.3 5.0 3.3 6.5 3.1 6.3 1.8 4.5 2.3 4.6 1.9 4.0 2.0 4.0。"
      }
     ]
    },
    {
     "id": "tab-10-2-1",
     "type": "table_caption",
     "page": 15,
     "original": "Table 10: WER on Librispeech when using all 960 hours of Librispeech as labeled data (cf. Table 2).",
     "zh": "表 10：使用 Librispeech 全部 960 小时作为标注数据时 Librispeech 上的 WER（参见 Table 2）。"
    },
    {
     "id": "p-10-2-2",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-10-2-2-1",
       "original": "LARGE - from scratch 2.8 7.6 3.0 7.7 1.8 5.4 2.6 5.8 1.7 4.3 2.1 4.6 3.2 8.9 3.4 8.5 2.0 5.9 2.6 6.1 1.8 4.7 2.1 4.8 2.6 6.5 2.8 6.3 1.7 4.6 2.3 5.0 1.7 3.9 2.0 4.1 2.1 4.5 2.2 4.5 1.4 3.5 2.0 3.6 1.6 3.0 1.8 3.3",
       "zh": "（Table 10 数值碎块）LARGE - from scratch（从头训练）：2.8 7.6 3.0 7.7 1.8 5.4 2.6 5.8 1.7 4.3 2.1 4.6 3.2 8.9 3.4 8.5 2.0 5.9 2.6 6.1 1.8 4.7 2.1 4.8 2.6 6.5 2.8 6.3 1.7 4.6 2.3 5.0 1.7 3.9 2.0 4.1 2.1 4.5 2.2 4.5 1.4 3.5 2.0 3.6 1.6 3.0 1.8 3.3。"
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
    "original": "Analysis of Discrete Latent Speech Representations",
    "zh": "附录 D 离散潜在语音表示分析"
   },
   "blocks": [
    {
     "id": "p-D-1",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-D-1-1",
       "original": "Next, we investigate whether the discrete latent speech representations qt learned by the quantizer relate to phonetic information: Using LARGE pre-trained on LV-60k and without any ﬁne-tuning, we compute the discrete latents for the training data of TIMIT and compute the co-occurrence between human annotated phonemes and the latents.",
       "zh": "接下来，我们考察量化器学到的离散潜在语音表示 qt 是否与语音学信息相关：使用在 LV-60k 上预训练的 LARGE 模型，不做任何微调，先对 TIMIT 训练数据算出离散潜在表示，再统计人工标注的音素与这些潜在表示之间的共现关系。"
      },
      {
       "id": "s-D-1-2",
       "original": "Ties are broken by choosing the phoneme which is most represented in the receptive ﬁeld of qt.",
       "zh": "出现并列时，选取在 qt 的感受野中占比最大的音素。"
      },
      {
       "id": "s-D-1-3",
       "original": "The training data contains 3696 utterances of average length 13.6 sec, or 563k discrete latents.",
       "zh": "训练数据包含 3696 条语音，平均长度 13.6 秒，共 563k 个离散潜在表示。"
      }
     ]
    },
    {
     "id": "fig-D-1",
     "type": "figure_caption",
     "page": 15,
     "original": "Figure 3 plots P(phoneme|qt) and shows that many discrete latents appear to specialize in speciﬁc phonetic sounds. The silence phoneme (bcl) represents 22% of all human annotated speech data and is therefore also modeled by many different latents.",
     "zh": "图 3 绘制了 P(phoneme|qt)，显示许多离散潜在表示确实专门对应特定的语音音类。静音音素（bcl）占全部人工标注语音数据的 22%，因此也被许多不同的潜在表示所建模。"
    },
    {
     "id": "p-D-2",
     "type": "paragraph",
     "page": 15,
     "sentences": [
      {
       "id": "s-D-2-1",
       "original": "aa ae ah aw ay b ch d dh dx eh axr ey f g bcl hh ih iy jh k el em en eng ow oy p r s sh t th uh uw v w y z",
       "zh": "（Figure 3 坐标轴文字碎块）aa ae ah aw ay b ch d dh dx eh axr ey f g bcl hh ih iy jh k el em en eng ow oy p r s sh t th uh uw v w y z。"
      }
     ]
    },
    {
     "id": "fig-D-2",
     "type": "figure_caption",
     "page": 15,
     "original": "Figure 3: Visualization of the co-occurrence between discrete latent speech representations and phonemes. We plot the conditional probability P(phoneme|qt) on TIMIT train data. The y-axis shows the collapsed 39 classes of phonemes and the x-axis is over the different discrete latents.",
     "zh": "图 3：离散潜在语音表示与音素共现关系的可视化。我们在 TIMIT 训练数据上绘制条件概率 P(phoneme|qt)；y 轴为折叠后的 39 类音素，x 轴为不同的离散潜在表示。"
    }
   ]
  },
  {
   "id": "sec-E",
   "num": "E",
   "level": 1,
   "page": 16,
   "title": {
    "original": "Speech Recognition Error Analysis",
    "zh": "附录 E 语音识别错误分析"
   },
   "blocks": [
    {
     "id": "p-E-1",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-E-1-1",
       "original": "In this section we study the most common errors our models make when ﬁne-tuned on different amounts of labeled data (Table 11).",
       "zh": "本节研究模型在不同标注数据量下微调时最常犯的错误（Table 11）。"
      },
      {
       "id": "s-E-1-2",
       "original": "We also show transcriptions of a few relatively challenging utterances from the dev-clean subset of Librispeech (Table 12).",
       "zh": "我们还给出 Librispeech dev-clean 子集中几条相对困难语音的转写示例（Table 12）。"
      }
     ]
    },
    {
     "id": "p-E-2",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-E-2-1",
       "original": "We consider models with no lexicon or no language model decoding, marked None in Table 9: Larger capacity decreases error rates: LARGE on LS-960 improves the word error rate on dev-clean from 46.1 to 43 compared to BASE.",
       "zh": "我们考察不用词表（lexicon）、也不用语言模型解码的模型，在 Table 9 中标记为 None：更大的容量会降低错误率——与 BASE 相比，LS-960 上的 LARGE 把 dev-clean 上的词错误率从 46.1 降到 43。"
      },
      {
       "id": "s-E-2-2",
       "original": "Increasing the amount of unlabeled training data further decreases the error rate to 33.8 for LARGE on LS-960.",
       "zh": "增加无标注训练数据量可进一步把错误率降到 33.8（LS-960 上的 LARGE，原文如此——按上下文应指 LV-60k 预训练模型）。"
      }
     ]
    },
    {
     "id": "p-E-3",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-E-3-1",
       "original": "In the ten minute labeled data setup, the model is still able to recognize basic units of speech: Table 11 shows that most errors are around spelling of words, e.g., omitting silent characters such as could →coud, know →now, or ignoring repeated letters such as still →stil, little →litle.",
       "zh": "在 10 分钟标注数据的设置下，模型仍能识别语音的基本单元：Table 11 显示，大多数错误出在单词拼写上，例如漏掉不发音字符（could → coud、know → now），或忽略重复字母（still → stil、little → litle）。"
      },
      {
       "id": "s-E-3-2",
       "original": "The LARGE LV-60k model achieves WER 38.3 on dev-clean and adding a Transformer language model enables to choose more likely pronunciations during the search and gives a large WER improvement to 5.0.",
       "zh": "LARGE LV-60k 模型在 dev-clean 上取得 WER 38.3；加入一个 Transformer 语言模型后，解码搜索能选出更可能的发音对应的拼写，把 WER 大幅改善到 5.0。"
      }
     ]
    },
    {
     "id": "p-E-4",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-E-4-1",
       "original": "The ten minute models without lexicon and language model tend to spell words phonetically and omit repeated letters, e.g., will →wil (Table 11).",
       "zh": "不用词表和语言模型的 10 分钟模型倾向于按发音拼写单词并省略重复字母，例如 will → wil（Table 11）。"
      },
      {
       "id": "s-E-4-2",
       "original": "Spelling errors decrease with more labeled data: with one hour of labeled data, slightly less common words move into the list of the most frequent errors, e.g., heaven and food are spelled phonetically.",
       "zh": "随着标注数据增多，拼写错误随之减少：有 1 小时标注数据时，稍不常见的词进入最高频错误列表，例如 heaven 和 food 会被按发音拼写。"
      },
      {
       "id": "s-E-4-3",
       "original": "At ten hours, top errors include articles, e.g., a, the which are a common source of errors in speech recognition in general.",
       "zh": "到 10 小时时，最高频错误包含冠词（如 a、the）——这本来就是语音识别中常见的错误来源。"
      },
      {
       "id": "s-E-4-4",
       "original": "There are also alternative spellings, color vs. colour as well as relatively rare words including person names, still spelled phonetically, e.g., phoebe →feeby.",
       "zh": "错误中还有拼写变体（color 对 colour），以及一些仍被按发音拼写的较罕见词（包括人名），例如 phoebe → feeby。"
      }
     ]
    },
    {
     "id": "p-E-5",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-E-5-1",
       "original": "At 100 hours, person names dominate the most frequent errors: phoebe →phebe, along with incorrect spacing anyone →any one, awhile →a while.",
       "zh": "到 100 小时时，人名占据最高频错误：phoebe → phebe，还有错误分词，如 anyone → any one、awhile → a while。"
      },
      {
       "id": "s-E-5-2",
       "original": "Finally at 960 hours the word error rate falls to 2% and top errors are mostly articles, incorrect splits, and some very rare words or names such as deucalion or gryce.",
       "zh": "最后到 960 小时时，词错误率降到 2%，最高频错误主要是冠词、错误切分，以及个别非常罕见的词或人名，如 deucalion、gryce。"
      }
     ]
    },
    {
     "id": "p-E-6",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-E-6-1",
       "original": "The “from scratch” 960 hour model has a similar word error rate as the 100 hour pre-trained model and displays a similar pattern of errors.",
       "zh": "「从头训练」的 960 小时模型与 100 小时预训练模型的词错误率相近，错误模式也类似。"
      }
     ]
    },
    {
     "id": "p-E-7",
     "type": "paragraph",
     "page": 16,
     "sentences": [
      {
       "id": "s-E-7-1",
       "original": "The pre-trained speech representations can be easily adapted to recognize speciﬁc sounds while ﬁne-tuning grounds these representations to the actual spelling.",
       "zh": "预训练的语音表示可以很容易地适配去识别特定的声音，而微调则把这些表示落到真实的拼写上。"
      }
     ]
    },
    {
     "id": "tab-E-1",
     "type": "table_caption",
     "page": 17,
     "original": "Table 11: Top word errors for models trained on 10m, 1h and 10h, 100h, 960h of labeled data and decoded on the Librispeech dev-clean subset without a language model or lexicon (see Table 9 and Table 10 - None). In brackets is the total number of occurrences of each error.",
     "zh": "表 11：分别在 10m、1h、10h、100h、960h 标注数据上训练、且不用语言模型与词表解码的模型，在 Librispeech dev-clean 子集上的最高频词错误（见 Table 9 与 Table 10 的 None 列）；括号内为各错误出现的总次数。"
    },
    {
     "id": "eq-E-1",
     "type": "equation",
     "page": 17,
     "original": "10m LARGE LV-60k all →al (181) too →to (26)"
    },
    {
     "id": "p-E-8",
     "type": "paragraph",
     "page": 17,
     "sentences": [
      {
       "id": "s-E-8-1",
       "original": "are →ar (115) until →untill (24) will →wil (100) new →knew (22) o →oh (10) you →yo (90) door →dor (18) one →on (89) says →sais (18) mode →mod (9) two →to (81) soul →sol (17) ursus →ersus (9) well →wel (80) bread →bred (16) tom →tome (8) been →ben (73) poor →pore (16) randal →randol (7) upon →apon (73) good →god (67) either →ither (13) color →colour (6) see →se (66) food →fud (13) ﬂour →ﬂower (6) we →whe (60) doubt →dout (12) phoebe →feeby (6) little →litle (54) earth →erth (12) an →and (5) great →grate (53) led →lead (12) cucumbers →cucombers (5) your →yor (53) sea →see (12) egg →eg (5) could →coud (51) thee →the (12) macklewain →macklewaine (5) here →hear (51) tom →tome (12) magpie →magpi (5) know →now (45) add →ad (11) milner →millner (5) there →ther (45) good →god (11) stacy →staci (5) three →thre (45) heaven →heven (11) trevelyan →trevellion (5) still →stil (42) mary →marry (11) verloc →verlock (5) off →of (40) randal →randel (11) ann →an (4) don’t →dont (37) answered →ansered (10) anyone →one (4) shall →shal (36) blood →blod (10) apartment →appartment (4) little →litl (35) bozzle →bosel (10) basin →bason (4) 960h LARGE from scratch macklewain →mackelwaine (7) o →oh (8) minnetaki →minnitaki (7) o →oh (6) in →an (8) randal →randall (7) bozzle →bosell (5) and →an (5) christie →cristy (6) criss →chris (5) clarke →clark (4) macklewain →mackelwane (6) bozzle →bosel (4) grethel →gretel (4) randal →randoll (6) clarke →clark (4) macklewain →mackelwaine (4) bozzle →bosall (5) colored →coloured (4) this →the (4) kaliko →calico (5) grethel →gretel (4) an →and (3) trevelyan →trevelian (5) lige →lyge (4) anyone →one (3) an →and (4) bozzle →basell (3) and →an (4) and →an (3) buns →bunds (3) anyone →one (4) ann →marianne (3) carrie →carry (3) bozzle →bozall (4) butte →bute (3) criss →chris (3) clarke →clark (4) color →colour (3) he’s →is (3) gryce →grice (4) deucalion →ducalion (3) his →is (3) i’m →am (4) forcemeat →meat (3) honor →honour (3) in →ind (4) gryce →grice (3) lattimer →latimer (3) letty →lettie (4) honor →honour (3) millet →mellet (3) phoebe →phebe (4) kearny →kirney (3) pyncheon →pension (3) nuova →noiva (3) tad →ted (3) ann →anne (3) thing →anything (3) thing →anything (3) awhile →while (3) this →the (3) trevelyan →trevelian (3)",
       "zh": "（Table 11 数值碎块：各数据量模型最常见的词级错误，括号内为该错误出现总次数）10m LARGE LV-60k：all → al (181)、too → to (26)、are → ar (115)、until → untill (24)、will → wil (100)、new → knew (22)、o → oh (10)、you → yo (90)、door → dor (18)、one → on (89)、says → sais (18)、mode → mod (9)、two → to (81)、soul → sol (17)、ursus → ersus (9)、well → wel (80)、bread → bred (16)、tom → tome (8)、been → ben (73)、poor → pore (16)、randal → randol (7)、upon → apon (73)、good → god (67)、either → ither (13)、color → colour (6)、see → se (66)、food → fud (13)、ﬂour → ﬂower (6)、we → whe (60)、doubt → dout (12)、phoebe → feeby (6)、little → litle (54)、earth → erth (12)、an → and (5)、great → grate (53)、led → lead (12)、cucumbers → cucombers (5)、your → yor (53)、sea → see (12)、egg → eg (5)、could → coud (51)、thee → the (12)、macklewain → macklewaine (5)、here → hear (51)、tom → tome (12)、magpie → magpi (5)、know → now (45)、add → ad (11)、milner → millner (5)、there → ther (45)、good → god (11)、stacy → staci (5)、three → thre (45)、heaven → heven (11)、trevelyan → trevellion (5)、still → stil (42)、mary → marry (11)、verloc → verlock (5)、off → of (40)、randal → randel (11)、ann → an (4)、don’t → dont (37)、answered → ansered (10)、anyone → one (4)、shall → shal (36)、blood → blod (10)、apartment → appartment (4)、little → litl (35)、bozzle → bosel (10)、basin → bason (4)。960h LARGE from scratch：macklewain → mackelwaine (7)、o → oh (8)、minnetaki → minnitaki (7)、o → oh (6)、in → an (8)、randal → randall (7)、bozzle → bosell (5)、and → an (5)、christie → cristy (6)、criss → chris (5)、clarke → clark (4)、macklewain → mackelwane (6)、bozzle → bosel (4)、grethel → gretel (4)、randal → randoll (6)、clarke → clark (4)、macklewain → mackelwaine (4)、bozzle → bosall (5)、colored → coloured (4)、this → the (4)、kaliko → calico (5)、grethel → gretel (4)、an → and (3)、trevelyan → trevelian (5)、lige → lyge (4)、anyone → one (3)、an → and (4)、bozzle → basell (3)、and → an (4)、and → an (3)、buns → bunds (3)、anyone → one (4)、ann → marianne (3)、carrie → carry (3)、bozzle → bozall (4)、butte → bute (3)、criss → chris (3)、clarke → clark (4)、color → colour (3)、he’s → is (3)、gryce → grice (4)、deucalion → ducalion (3)、his → is (3)、i’m → am (4)、forcemeat → meat (3)、honor → honour (3)、in → ind (4)、gryce → grice (3)、lattimer → latimer (3)、letty → lettie (4)、honor → honour (3)、millet → mellet (3)、phoebe → phebe (4)、kearny → kirney (3)、pyncheon → pension (3)、nuova → noiva (3)、tad → ted (3)、ann → anne (3)、thing → anything (3)、thing → anything (3)、awhile → while (3)、this → the (3)、trevelyan → trevelian (3)。"
      }
     ]
    },
    {
     "id": "tab-E-2",
     "type": "table_caption",
     "page": 18,
     "original": "Table 12: Examples of transcription of selected utterances from the dev-clean subset by various models without a language model or lexicon. Capitalized words indicate errors.",
     "zh": "表 12：不同模型在不用语言模型与词表的情况下，对 dev-clean 子集若干选定语音的转写示例；大写单词表示错误。"
    },
    {
     "id": "p-E-9",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-E-9-1",
       "original": "Transcription i’m mister christopher from london IM mister CRESTIFER FROME LUNDEN IM mister CRISTIFFHER from LOUNDEN i’m mister CHRYSTEPHER from london i’m mister christopher from london i’m mister christopher from london I MISSTER christopher from london il popolo e una bestia ILPOPULAR ONABESTIA O POPOLAONABASTIA U POPULAONABASTIAR O POPALOON A BASTYA YOU’LL POP A LAWYE ON A BAISTYE OL POPALOY ON ABESTIA he smelt the nutty aroma of the spirit he SMELTD the NUDY aroma of the spirit he SMELTD the NUDDY ARROMA of the spirit he smelt the NUDDY ERROMA of the spirit he smelt the NUDDY aroma of the spirit he smelt the NUTTIE aroma of the spirit he smelt the nutty EROMA of the spirit phoebe merely glanced at it and gave it back FEABY MEARLY glanced at it and gave it BAK FIEABY merely glanced at it and gave it back FEEBY merely glanced at it and gave it back BEBE merely glanced at it and gave it back phoebe merely glanced at it and gave it back phoebe merely glanced at it and gave it back sauterne is a white bordeaux a strong luscious wine the best known varieties being SULTERIN is a white BORDOE a strong LUCHOUS WIN the best NOWN VERIATYS being CLTEREN is a white BORDO a strong LUCHIOUS wine the best known VERIETIES being SOTERN is a white BOURDO a strong LUCIOUS wine the best known VORIETIES being SOTERN is a white BORDAUX a strong LUCIOUS wine the best known varieties being SOTERN is a white bordeaux a strong luscious wine the best known varieties being SOTERAN is a white bordeaux a strong luscious wine the best known varieties being i happen to have mac connell’s box for tonight or there’d be no chance of our getting places i HAPEND to have MECONALES BOXS for TONIT ORE THIRLD be no chance of OR GETING places i happen to have MACCONNEL’S BOCXS for tonight or TE’ELD be no chance of our getting places i HAPPENED to have MUKONNEL’S box for tonight or THERED be no chance of our getting places i HAPPENED to have MC CONNEL’S box for TO NIGHT or there’d be no chance of our getting places i happen to have MC CONALL’S box for TO NIGHT or there’d be no chance of our getting places i HAPPENE to have MACONEL’S box for TO NIGHT or there’d be no chance of our getting places",
       "zh": "（Table 12 数值碎块：dev-clean 若干困难语音在不同模型下的转写示例，大写词表示错误）原文「i’m mister christopher from london」，各模型输出如 IM mister CRESTIFER FROME LUNDEN / IM mister CRISTIFFHER from LOUNDEN / i’m mister CHRYSTEPHER from london 等，最佳模型可正确输出 i’m mister christopher from london；意大利语「il popolo e una bestia」被写成 ILPOPULAR ONABESTIA、O POPOLAONABASTIA 等；「he smelt the nutty aroma of the spirit」被写成 he SMELTD the NUDY aroma of the spirit 等；「phoebe merely glanced at it and gave it back」被写成 FEABY MEARLY glanced at it and gave it BAK 等；「sauterne is a white bordeaux…」被写成 SULTERIN is a white BORDOE 等；「i happen to have mac connell’s box for tonight…」被写成 i HAPEND to have MECONALES BOXS for TONIT 等。错误集中在人名、外来词与词边界上。"
      }
     ]
    }
   ]
  },
  {
   "id": "sec-F",
   "num": "F",
   "level": 1,
   "page": 18,
   "title": {
    "original": "Ablations",
    "zh": "附录 F 消融"
   },
   "blocks": [
    {
     "id": "tab-F-1",
     "type": "table_caption",
     "page": 18,
     "original": "Table 13 ablates various hyperparameter choices of our architecture. The setup for the baseline model is described in § 5.4. First, we tried to improve the continuous input and continuous target model (§ 5.4) by adding an MLP on top of the continuous target representation and we also tried to use a separate set of encoder parameters for the representations used as input and targets (Separate encoders). Both did not lead to meaningful improvements.",
     "zh": "表 13 消融了我们架构的各种超参数选择。基线模型的设置见 § 5.4。我们首先尝试改进「连续输入 + 连续目标」模型（§ 5.4）：在连续目标表示之上加一个 MLP；也尝试对用作输入与目标的表示使用两套独立的编码器参数（Separate encoders）。两者都没有带来有实际意义的提升。"
    },
    {
     "id": "p-F-1",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-F-1-1",
       "original": "Increasing the receptive ﬁeld size from 25ms to 30ms had little effect.",
       "zh": "把感受野从 25ms 增大到 30ms 几乎没有影响。"
      },
      {
       "id": "s-F-1-2",
       "original": "Setting the diversity penalty weight (α) too low results in lower codebook usage and lower performance.",
       "zh": "多样性惩罚权重（α）设得太低会导致码本使用率下降、性能变差。"
      },
      {
       "id": "s-F-1-3",
       "original": "Setting it too high leads to slight instability.",
       "zh": "设得太高则会带来轻微的训练不稳定。"
      },
      {
       "id": "s-F-1-4",
       "original": "Doubling the number of relative positional embeddings to 256 also did not help.",
       "zh": "把相对位置嵌入的数量翻倍到 256 同样没有帮助。"
      },
      {
       "id": "s-F-1-5",
       "original": "Stopping gradients from the quantizer to the encoder shows that the encoder requires training signal from the quantizer as well.",
       "zh": "切断从量化器到编码器的梯度后性能变差，说明编码器也需要来自量化器的训练信号。"
      }
     ]
    },
    {
     "id": "p-F-2",
     "type": "paragraph",
     "page": 18,
     "sentences": [
      {
       "id": "s-F-2-1",
       "original": "Next, increasing the number of negatives did not result in better performance (K = 200) and sampling negatives from the entire batch of utterances hurt performance, likely because candidates from other utterances are easy to distinguish.",
       "zh": "其次，增加负例数量（K = 200）并没有带来更好的性能；从整个批次的语音中采样负例反而损害性能，很可能因为来自其他语音的候选太容易被区分。"
      },
      {
       "id": "s-F-2-2",
       "original": "Sampling negatives from any time step in the utterance, masked or unmasked, does not help and is more computationally expensive.",
       "zh": "从语音的任意时间步（无论是否被掩码）采样负例没有帮助，而且计算开销更大。"
      },
      {
       "id": "s-F-2-3",
       "original": "Gumbel noise is important and increasing the number of codebooks did not result in better performance.",
       "zh": "Gumbel 噪声很重要；增加码本数量也没有带来更好的性能。"
      }
     ]
    },
    {
     "id": "tab-F-2",
     "type": "table_caption",
     "page": 19,
     "original": "Table 13: Ablation of various hyper-parmeter choices. We report average WER and standard deviation on combined dev-clean/other of Librispeech for three seeds of training.",
     "zh": "表 13：各项超参数选择的消融。报告三次训练种子在 Librispeech dev-clean/other 合并集上的平均 WER 与标准差。"
    },
    {
     "id": "p-F-3",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-F-3-1",
       "original": "avg.",
       "zh": "平均值"
      },
      {
       "id": "s-F-3-2",
       "original": "WER std.",
       "zh": "WER 标准差"
      }
     ]
    },
    {
     "id": "p-F-4",
     "type": "paragraph",
     "page": 19,
     "sentences": [
      {
       "id": "s-F-4-1",
       "original": "Baseline (p = 0.075, α = 0.1) 7.97 0.02 Continuous inputs, continuous targets 8.58 0.08 + MLP on targets 8.51 0.05 + Separate encoders 8.90 0.01 receptive ﬁeld 30ms 7.99 0.06 diversity penalty α = 0 8.48 0.08 α = 0.05 8.34 0.08 α = 0.2 8.58 0.45 Conv pos emb, kernel 256 8.14 0.05 No gradient to encoder from quantizer 8.41 0.08 Negatives K = 200 same utterance 8.12 0.05 K = 50 same utterance + K = 50 from batch 8.79 0.06 Sample negatives from any time step 8.07 0.02 No Gumbel noise 8.73 0.42 Codebook G=4, V=18 9.02 0.38 G=8, V=8 8.13 0.07 Predict exactly U time steps from edges 9.53 0.91 8.19 0.07 8.07 0.07 7.89 0.10 7.90 0.01 We also investigated predicting only time steps immediately next to the last unmasked time step for each span.",
       "zh": "（Table 13 数值碎块）Baseline (p = 0.075, α = 0.1)：7.97 0.02；连续输入 + 连续目标：8.58 0.08；目标上加 MLP：8.51 0.05；分离编码器（Separate encoders）：8.90 0.01；感受野 30ms：7.99 0.06；多样性惩罚 α = 0：8.48 0.08；α = 0.05：8.34 0.08；α = 0.2：8.58 0.45；卷积位置嵌入 kernel 256：8.14 0.05；量化器到编码器无梯度：8.41 0.08；负例 K = 200 来自同一语音：8.12 0.05；K = 50 来自同一语音 + K = 50 来自批次：8.79 0.06；从任意时间步采样负例：8.07 0.02；无 Gumbel 噪声：8.73 0.42；码本 G=4、V=18：9.02 0.38；G=8、V=8：8.13 0.07；从边界起精确预测 U 个时间步：9.53 0.91、8.19 0.07、8.07 0.07、7.89 0.10、7.90 0.01。我们还考察了只对每个掩码片段紧邻最后一个未掩码时间步之后的时间步做预测。"
      },
      {
       "id": "s-F-4-2",
       "original": "This enables to better control the difﬁculty of the pre-training task.",
       "zh": "这样可以更好地控制预训练任务的难度。"
      },
      {
       "id": "s-F-4-3",
       "original": "Given the leftmost or rightmost unmasked time step next to a masked span, we compute the contrastive loss only for the ﬁrst U masked time steps next to these unsmasked spans.",
       "zh": "给定紧邻掩码片段的最左或最右未掩码时间步，我们只对紧邻这些未掩码片段的前 U 个被掩码时间步计算对比损失。"
      },
      {
       "id": "s-F-4-4",
       "original": "Predicting only up to one time step performs poorly because there is little training signal from each utterance and predicting more time steps performs better but does not signiﬁcantly outperform predicting all masked time steps.",
       "zh": "只预测至多一个时间步的效果很差，因为每条语音能提供的训练信号太少；预测更多时间步效果更好，但也没有显著超过「预测全部被掩码时间步」。"
      },
      {
       "id": "s-F-4-5",
       "original": "Increasing the number of training updates helps but this increases training time.",
       "zh": "增加训练更新次数有帮助，但会增加训练时间。"
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
    "sentence_id": "s-abstract-1-1",
    "quote": "learning powerful representations from speech audio alone followed by ﬁne-tuning on transcribed speech can outperform the best semi-supervised methods while being conceptually simpler"
   },
   "kind": "motivation",
   "title": "为什么这句话重要",
   "explanation": "这是全文的立论：自监督预训练表示 + 少量标注微调，第一次正面打赢了「打伪标签、过滤、重训」式的半监督流水线，而且概念更简洁。这句话之后，语音领域的竞争点从「谁的半监督工程链条更精细」转向「谁的无标注语音更多、表示学得更好」，直接催生了 HuBERT、WavLM、XLS-R 整条路线。",
   "featured": true
  },
  {
   "id": "ann-002",
   "anchor": {
    "sentence_id": "s-abstract-1-4",
    "quote": "Using just ten minutes of labeled data and pre-training on 53k hours of unlabeled data still achieves 4.8/8.2 WER"
   },
   "kind": "number",
   "title": "10 分钟数字怎么读",
   "explanation": "10 分钟标注 + 53k 小时无标注，test-clean/other 4.8/8.2 WER。注意两点：其一，4.8 是 Transformer 大语言模型参与解码后的数字，纯声学模型（Table 11 的 None 设置）在 dev-clean 上还是 38.3 WER；其二，53k 小时无标注不是免费午餐，预训练用了 128 张 V100 跑 5.2 天。「10 分钟」的震撼背后是巨大的算力前置。",
   "featured": true
  },
  {
   "id": "ann-003",
   "anchor": {
    "sentence_id": "s-1-3-2",
    "quote": "encodes speech audio via a multi-layer convolutional neural network and then masks spans of the resulting latent speech representations [26, 56], similar to masked language modeling [9]"
   },
   "kind": "concept",
   "title": "掩码搬到连续语音",
   "explanation": "把 BERT 的掩码思想搬到语音要过两道坎：语音是连续的，没有现成 token；帧率高，逐帧掩码太琐碎。wav2vec 2.0 的解法是先由 CNN 把波形降到约 49Hz 的潜在序列，再对连续片段（span）整段掩码——遮的是一段声学事件而不是单帧，任务难度才合适。",
   "featured": true
  },
  {
   "id": "ann-004",
   "anchor": {
    "sentence_id": "s-1-4-1",
    "quote": "we learn discrete speech units [53, 32, 7, 18] via a gumbel softmax [24, 5] to represent the latent representations in the contrastive task (Figure 1) which we ﬁnd to be more effective than non-quantized targets"
   },
   "kind": "concept",
   "title": "为什么目标要量化",
   "explanation": "对比任务需要一个「正确答案」，直接用连续特征当目标会让模型去背当前片段的说话人、背景噪声等无关细节（§5.4 消融证明这样更差）。量化把目标压成有限码本里的离散单元，等价于强制任务只保留音素级的抽象信息。用 Gumbel softmax 让「选哪个码字」全程可微，码本和上下文网络得以端到端联合学习——这正是它比 vq-wav2vec 两步流水线强的原因。",
   "featured": true
  },
  {
   "id": "ann-005",
   "anchor": {
    "sentence_id": "s-contextualized-representations-w-1-2",
    "quote": "Instead of ﬁxed positional embeddings which encode absolute positional information, we use a convolutional layer similar to [37, 4, 57] which acts as relative positional embedding"
   },
   "kind": "engineering",
   "title": "卷积式相对位置",
   "explanation": "用一个卷积层（kernel 128、16 组）替代 Transformer 的绝对位置嵌入，注入的是相对位置偏置。对语音这种平移不变性较强的信号，这比正弦或可学习绝对位置嵌入更自然，后续 Conformer、Zipformer 把卷积请回 Transformer 主干，是同一思路的放大版。",
   "featured": false
  },
  {
   "id": "ann-006",
   "anchor": {
    "sentence_id": "s-quantization-module-1-4",
    "quote": "Given G codebooks, or groups, with V entries e ∈ RV ×d/G, we choose one entry from each codebook and concatenate the resulting vectors e1, . . . , eG and apply a linear transformation Rd 7→Rf to obtain q ∈Rf"
   },
   "kind": "concept",
   "title": "乘积量化的作用",
   "explanation": "乘积量化用 G 个小码本各取一条再拼接，表达力是 V 的 G 次方而参数量只是 G×V 条。G=2、V=320 就有 102.4k 种组合，足够覆盖音素粒度。它的角色类似今天音频 codec 里的残差向量量化（RVQ）码本——用少量参数撑起巨大离散空间，只不过这里码本是自监督目标，不是重建目标。",
   "featured": false
  },
  {
   "id": "ann-007",
   "anchor": {
    "sentence_id": "s-3-1-1-1",
    "quote": "we do not mask inputs to the quantization module"
   },
   "kind": "concept",
   "title": "目标侧不能掩码",
   "explanation": "容易被忽略但很关键：被送进 Transformer 的上下文侧要掩码，但产生对比目标的量化模块始终看到完整、未被掩码的潜在表示。否则「正确答案」自己也是从掩码向量里推出来的，任务就退化了。这和 EMA teacher 在 BYOL/数据蒸馏里的作用类似：目标侧必须比预测侧更可靠。",
   "featured": false
  },
  {
   "id": "ann-008",
   "anchor": {
    "sentence_id": "s-contrastive-loss-1-2",
    "quote": "Distractors are uniformly sampled from other masked time steps of the same utterance"
   },
   "kind": "engineering",
   "title": "负例只取同句",
   "explanation": "负例从同一条语音的其他被掩码时间步采样，而不是从整个 batch。附录 F 证明跨句负例反而掉点——别的说话人、别的声学环境太好区分，构成不了硬负例。真正难的是同一句里相邻的音素片段，把它们区分开才逼迫模型学音素级表示。做对比学习时，负例难度往往比负例数量更值钱。",
   "featured": true
  },
  {
   "id": "ann-009",
   "anchor": {
    "sentence_id": "s-diversity-loss-1-1",
    "quote": "the diversity loss Ld is designed to increase the use of the quantized codebook representations [10]"
   },
   "kind": "engineering",
   "title": "码本坍缩的解药",
   "explanation": "纯对比目标下，码本很容易坍缩：模型只用少数几个码字也能糊弄任务。多样性损失通过最大化码本条目使用分布的熵来对抗坍缩，α=0 的消融（附录 F）WER 从 7.97 涨到 8.48，证实了风险真实存在。今天的 VQ-VAE、codec 训练里用 commitment loss、码本 EMA 重置解决的是同一个病。",
   "featured": false
  },
  {
   "id": "ann-010",
   "anchor": {
    "sentence_id": "s-4-2-2-2",
    "quote": "an encoder output frequency of 49 hz with a stride of about 20ms between each sample, and a receptive ﬁeld of 400 input samples or 25ms of audio"
   },
   "kind": "number",
   "title": "49Hz 帧率的含义",
   "explanation": "7 层卷积总步幅 320，把 16kHz 波形压到约 49Hz，即每 20ms 一个潜在帧，感受野只有 25ms。这接近传统声学建模的帧移量级：CNN 只负责局部声学事件，真正的长程建模交给上面的 Transformer。理解这个分工，就明白为什么掩码要按 14.7 帧（约 300ms）的片段来做——那大约是一个音素/短音节的时长。",
   "featured": false
  },
  {
   "id": "ann-011",
   "anchor": {
    "sentence_id": "s-4-2-4-2",
    "quote": "train on 128 V100 GPUs over 2.3 days for Librispeech and 5.2 days for LibriVox"
   },
   "kind": "engineering",
   "title": "算力账要算清",
   "explanation": "LARGE 在 LV-60k 上预训练用了 128 张 V100 × 5.2 天，折合约 1.6 万张 V100·天级别里的一次中等投入——以 2020 年标准已属昂贵，以今天的标准看仍是小团队难以复现的规模。读「10 分钟标注」这类数字时，要把这笔前置算力账一起算进去：省的是标注人力，不是算力。",
   "featured": false
  },
  {
   "id": "ann-012",
   "anchor": {
    "sentence_id": "s-4-3-2-4",
    "quote": "For the ﬁrst 10k updates only the output classiﬁer is trained, after which the Transformer is also updated"
   },
   "kind": "engineering",
   "title": "先热身分类头",
   "explanation": "微调前 10k 步只训随机初始化的输出层，Transformer 冻结，且特征编码器全程冻结。这是一个朴素但有效的稳定化技巧：避免随机头的巨大初始梯度把预训练表示冲散。后来在 LLM 微调里常见的「先训 head / embedding 再放开主干」与之同源。代价是超参数更琐碎，但在 10 分钟标注这种极端小数据上很值。",
   "featured": false
  },
  {
   "id": "ann-013",
   "anchor": {
    "sentence_id": "s-5-1-2-2",
    "quote": "Ten minutes of labeled data corresponds to just 48 recordings with an average length of 12.5 seconds"
   },
   "kind": "number",
   "title": "48 条录音的含义",
   "explanation": "把「10 分钟」换算成 48 条平均 12.5 秒的录音，直观得让人震惊——一个说话人一段话的体量。但要泼冷水：这 48 条来自 Libri-light 清洗过的有声读物，朗读风格、录音条件都与 960h 训练分布同源。搬到真实场景（电话信道、口音、远场），10 分钟是否够用完全另说，论文没有回答。",
   "featured": true
  },
  {
   "id": "ann-014",
   "anchor": {
    "sentence_id": "s-10-2-3",
    "quote": "their method achieves WER 4.2/8.6 on test-clean/other which compares to WER 2.3/5.0 with the LARGE model in a like for like setup, a relative WER reduction of 45%/42%"
   },
   "kind": "comparison",
   "title": "赢在哪、对谁赢",
   "explanation": "对比对象 Noisy student [42] 是 2020 年半监督 ASR 的天花板，靠的是「打伪标签—过滤—重训」多轮迭代加数据平衡。wav2vec 2.0 用一次预训练加一次微调就在同等设置下把 WER 砍了近一半。这宣告了迭代自训练流水线时代的尾声——后续工作基本只在预训练表示这条线上卷。",
   "featured": true
  },
  {
   "id": "ann-015",
   "anchor": {
    "sentence_id": "s-5-2-2-1",
    "quote": "the vocabulary of our acoustic model (characters) does not match the vocabulary of the LM (words) which delays feedback from the LM and is likely to be detrimental"
   },
   "kind": "critique",
   "title": "作者自曝的短板",
   "explanation": "声学模型输出字符、LM 在词级建模，束搜索要等到一个词拼完才能得到 LM 分数反馈——作者在满标注场景下坦承这「很可能有害」。这句话的分量在于：即便拖着这个短板，他们仍然刷到了 SOTA，说明预训练表示带来的增益大到能盖住解码侧的不匹配。后来换 word piece / seq2seq 的后续工作确实又涨了一截。",
   "featured": true
  },
  {
   "id": "ann-016",
   "anchor": {
    "sentence_id": "s-5-4-1-1",
    "quote": "we quantize the latent audio representations only for the contrastive loss, i.e., when latents are used as targets, but not when the latents are input to the Transformer network"
   },
   "kind": "comparison",
   "title": "输入连续目标离散",
   "explanation": "这是和 vq-wav2vec 最本质的区别：量化只用于产生对比目标，Transformer 的输入保持连续。消融显示「双量化」WER 12.18，远差于基线 7.97——量化丢信息，喂给上下文网络等于先自残；而目标侧量化反而有益。这个「连续输入 + 离散目标」的配方后来被 HuBERT（用聚类标签当目标）继承并简化。",
   "featured": true
  },
  {
   "id": "ann-017",
   "anchor": {
    "sentence_id": "s-6-2-4",
    "quote": "We expect performance gains by switching to a seq2seq architecture and a word piece vocabulary"
   },
   "kind": "connection",
   "title": "作者预告的下一站",
   "explanation": "结论里作者自己承认：CTC + 字符词表只是权宜之计，换 seq2seq 架构和子词词表还能再涨。这基本预告了后来 w2v-BERT、Google USM 的方向。也反过来说明 wav2vec 2.0 的本体贡献是表示层，而不是识别器结构——它的解码端在所有 SOTA 模型里几乎是刻意保持最弱的。",
   "featured": false
  },
  {
   "id": "ann-018",
   "anchor": {
    "sentence_id": "s-A-2-3",
    "quote": "when spans with length one are masked, leading to poor performance on downstream speech recognition tasks"
   },
   "kind": "number",
   "title": "掩码长度的甜点",
   "explanation": "掩码片段长度为 1 时对比任务变得平凡（训练准确率接近白送），下游反而变差；平均 14.7 帧（299ms）才是甜点。这个长度不是巧合——它大约覆盖一个音素到短音节。掩码设计的本质是调任务难度：太容易学不到抽象，太难则信号不足。做类似掩码预训练时，先标定「目标单元的平均时长」再定掩码长度，是一条可迁移的经验。",
   "featured": true
  },
  {
   "id": "ann-019",
   "anchor": {
    "sentence_id": "s-D-1-1",
    "quote": "we compute the discrete latents for the training data of TIMIT and compute the co-occurrence between human annotated phonemes and the latents"
   },
   "kind": "concept",
   "title": "码本就约等于音素",
   "explanation": "不做任何微调，把 LV-60k 预训练模型的量化输出和 TIMIT 人工音素标注做共现统计，发现很多离散单元专门对应特定音类——量化码本在无人监督下自发收敛到了近似音素的粒度。这解释了为什么这套表示接个线性层加 10 分钟标注就能识别：最难的「切分+归类」在预训练时已经做完了。",
   "featured": true
  },
  {
   "id": "ann-020",
   "anchor": {
    "sentence_id": "s-E-3-1",
    "quote": "most errors are around spelling of words, e.g., omitting silent characters such as could →coud, know →now"
   },
   "kind": "critique",
   "title": "10 分钟模型的真实成色",
   "explanation": "附录 E 是全文最诚实的一节：不用 LM 时，10 分钟模型的错误几乎全是拼写型（coud、now、stil）——声学上它早已「听对」，只是没学会英文拼写规则。换句话说，4.8/8.2 的成绩单里语言模型补了巨大的洞（38.3 → 5.0）。对形态复杂、书写系统不规则的语言，这个洞未必补得上，外推需谨慎。",
   "featured": true
  },
  {
   "id": "ann-021",
   "anchor": {
    "sentence_id": "s-F-2-1",
    "quote": "sampling negatives from the entire batch of utterances hurt performance, likely because candidates from other utterances are easy to distinguish"
   },
   "kind": "engineering",
   "title": "硬负例胜过多负例",
   "explanation": "把负例从 K=100 加到 200 没收益，从整个 batch 采样反而掉点——跨句负例太简单。这与图像对比学习（MoCo、SimCLR）「负例越多越好」的经验相反，原因在于语音的同句负例天然就是硬负例：同说话人、同信道、相邻音素。做序列级对比学习时，优先在样本内部挖负例，比堆全局负例队列更划算。",
   "featured": false
  },
  {
   "id": "ann-022",
   "anchor": {
    "sentence_id": "s-F-1-5",
    "quote": "Stopping gradients from the quantizer to the encoder shows that the encoder requires training signal from the quantizer as well"
   },
   "kind": "critique",
   "title": "量化器反哺编码器",
   "explanation": "切断量化器到特征编码器的梯度后 WER 从 7.97 涨到 8.41——说明编码器的特征质量部分依赖量化路径回传的训练信号，端到端联合优化并非宣传话术，而是实打实有收益。但也提示这个系统各模块耦合很深：想单独替换量化器或编码器（比如换 RVQ、换 SSL 前端），重新调参的成本不低。",
   "featured": false
  }
 ]
};
