// 自动生成：语音模型知识库结构化数据（单一事实来源 / single source of truth）
// 本文件由 tools/split_data.js 从 index.html 抽离，caps 字段由 tools/add_caps.js 生成/补全。
// 编辑数据请改这里，勿改 index.html 内联。通过页面 <script src="data/kb.js"> 加载。
globalThis.KB = {
  "lineages": [
    {
      "id": "asr_aed",
      "domain": "ASR",
      "name": "AED / Conformer 高精度系",
      "baseline": "Transformer-AED / Conformer（Whisper 式编码器-解码器）",
      "members": [
        {
          "model_id": "cohere_transcribe",
          "innovation_point": "2B Conformer，从零监督训练，登顶 HF Open ASR 榜（avg WER 5.42%）"
        },
        {
          "model_id": "fireredasr2",
          "variant": "AED 变体",
          "innovation_point": "AED 变体 1B+，纯识别精度强；LLM 变体 8B+ CER 2.89%"
        },
        {
          "model_id": "ibm_granite41",
          "innovation_point": "2B 非自回归(NAR)解码，WER 5.33%，Apache 2.0"
        },
        {
          "model_id": "glm_asr",
          "innovation_point": "GLM 语义对齐识别头，中文优化"
        },
        {
          "model_id": "elevenlabs_scribe2",
          "innovation_point": "商业 SOTA，长音频+说话人+标点一体"
        }
      ]
    },
    {
      "id": "asr_stream",
      "domain": "ASR",
      "name": "CTC / Transducer 流式端侧系",
      "baseline": "CTC / RNN-T / TDT 流式架构，低延迟、可量化",
      "members": [
        {
          "model_id": "kyutai_stt",
          "innovation_point": "0.5s 级延迟端到端实时 STT"
        },
        {
          "model_id": "moonshine_v2",
          "innovation_point": "流式优先小模型，比 Whisper 快 ~100×"
        },
        {
          "model_id": "on_device",
          "innovation_point": "Nemotron 量化至 0.67GB，端侧可跑"
        },
        {
          "model_id": "parakeet_tdt",
          "innovation_point": "TDT + 高吞吐，RTFx 3332"
        },
        {
          "model_id": "canary_qwen",
          "innovation_point": "2.5B 多语种 + 标点 + ITN"
        },
        {
          "model_id": "voxtral_mini",
          "innovation_point": "Mistral 原生流式 ASR，~480ms 延迟≈Whisper"
        }
      ]
    },
    {
      "id": "asr_llm",
      "domain": "ASR",
      "name": "LLM / MoE 统一系",
      "baseline": "把语音编码器对齐到 LLM/MoE，用语言模型做识别与理解",
      "members": [
        {
          "model_id": "qwen3_asr",
          "innovation_point": "Qwen 大模型原生语音识别，多语种"
        },
        {
          "model_id": "stepaudio25",
          "variant": "ASR 分支",
          "innovation_point": "可验证多 token 并行解码，RTF 0.0053，AISHELL-1 CER 0.71%"
        },
        {
          "model_id": "nim4_asr",
          "innovation_point": "2.3B LLM + RAG 热词，专名/术语强"
        },
        {
          "model_id": "hy_asr30",
          "innovation_point": "MoE + LLM，中文 WER 3.34%"
        },
        {
          "model_id": "fireredasr2",
          "variant": "LLM 变体",
          "innovation_point": "8B+ LLM 变体，4 中文基准 CER 2.89%，胜 Doubao/Qwen3/Fun-ASR"
        },
        {
          "model_id": "seed_asr20",
          "innovation_point": "字节 Seed 统一语音基座，多任务"
        },
        {
          "model_id": "fun_realtime_asr",
          "innovation_point": "ASR WER 1.8% 登顶 AA 词错率榜"
        }
      ]
    },
    {
      "id": "asr_long",
      "domain": "ASR",
      "name": "长音频 / 超多语言系",
      "baseline": "长上下文 + 多语种海量数据，单模型覆盖千语",
      "members": [
        {
          "model_id": "vibevoice_asr",
          "innovation_point": "单次 60 分钟 + 说话人日志"
        },
        {
          "model_id": "meta_omni",
          "innovation_point": "1600+ 语言统一 ASR"
        },
        {
          "model_id": "fireredasr2",
          "variant": "2S 流水线",
          "innovation_point": "ASR+VAD+LID+标点 一体化，VAD 0.6M / LID 100+ 语"
        }
      ]
    },
    {
      "id": "tts_ar",
      "domain": "TTS",
      "name": "AR codec-LM 系",
      "baseline": "自回归语音 codebook LM（先语义 token 再声学）",
      "members": [
        {
          "model_id": "cosyvoice3",
          "innovation_point": "LLM 语义 + 扩散声学，多语种零样本"
        },
        {
          "model_id": "indextts2",
          "innovation_point": "AR 时长精确控制 + 情感/音色解耦"
        },
        {
          "model_id": "qwen3_tts",
          "innovation_point": "Qwen 自回归 TTS，零样本克隆"
        },
        {
          "model_id": "orpheus_tts",
          "innovation_point": "情绪标签驱动类人韵律"
        },
        {
          "model_id": "fishaudio_s2",
          "innovation_point": "4B Dual-AR（Slow+Fast AR）+ RVQ codec，社区高人气"
        }
      ]
    },
    {
      "id": "tts_hybrid",
      "domain": "TTS",
      "name": "扩散-LM 混合系",
      "baseline": "AR 生成语义 token + flow-matching/扩散 生成声学 token",
      "members": [
        {
          "model_id": "voxtral_tts",
          "innovation_point": "4B 混合：AR 语义 + flow-matching 声学，Voxtral Codec(VQ-FSQ)"
        },
        {
          "model_id": "qwen_audio_tts",
          "innovation_point": "12.5Hz 低帧率 tokenizer + 五阶段训练，登顶 AA TTS 榜"
        },
        {
          "model_id": "stepaudio25_tts",
          "innovation_point": "统一基座 TTS 分支，偏好 RLHF + 上下文监督"
        },
        {
          "model_id": "cosyvoice3",
          "innovation_point": "同属 AR 系，亦用扩散声学（跨线）"
        }
      ]
    },
    {
      "id": "tts_nar",
      "domain": "TTS",
      "name": "全非自回归扩散系",
      "baseline": "完全非自回归（扩散 / 扩散-LM），并行生成、低延迟",
      "members": [
        {
          "model_id": "luna_tts",
          "innovation_point": "扩散-LM 全非 AR，Seed-TTS 0.73 CER/79.7 SIM；实时块级 RTF 0.024"
        },
        {
          "model_id": "zonos2",
          "innovation_point": "8B MoE(900M 激活)，6M+ 小时，Apache 2.0"
        },
        {
          "model_id": "omnivoice",
          "innovation_point": "600+ 语，文本→多 codebook 直接映射，全 codebook 随机掩码"
        },
        {
          "model_id": "chatterbox_flash",
          "innovation_point": "块扩散流式，低首包延迟"
        },
        {
          "model_id": "fun_realtime_tts",
          "innovation_point": "AA TTS Elo 1190 全球第 5，实时可控"
        }
      ]
    },
    {
      "id": "tts_wave",
      "domain": "TTS",
      "name": "波形 / 连续隐空间新路线",
      "baseline": "端到端波形扩散 或 免外部 tokenizer 的连续隐空间",
      "members": [
        {
          "model_id": "wavtts",
          "innovation_point": "首个原始波形 TTS，DiT+flow matching+多尺度 mel 监督"
        },
        {
          "model_id": "longcat_audiodit",
          "innovation_point": "波形潜空间扩散；自适应投影引导；Wav-VAE 重建好≠TTS 好"
        },
        {
          "model_id": "voxcpm2",
          "innovation_point": "2B 分层连续隐空间，非对称 AudioVAE 16k→48k，2M+ 小时"
        },
        {
          "model_id": "higgs2",
          "innovation_point": "多说话者 + 情感，连续表征"
        },
        {
          "model_id": "minimax28",
          "innovation_point": "原生声音标签（breath/laugh）"
        },
        {
          "model_id": "confucius4_tts",
          "innovation_point": "无文本跨语种克隆（textless）"
        },
        {
          "model_id": "mega_tts3",
          "innovation_point": "稀疏对齐引导潜在 DiT，8 步生成 1 分钟"
        }
      ]
    }
  ],
  "models": [
    {
      "id": "cohere_transcribe",
      "name": "Cohere Transcribe",
      "org": "Cohere",
      "date": "2026-03",
      "domain": "ASR",
      "framework_lines": [
        "asr_aed"
      ],
      "paper_url": "https://cohere.com/blog/transcribe",
      "has_arxiv": false,
      "source_type": "官方博客",
      "license": "Apache 2.0",
      "params": "2B",
      "metrics": {
        "wer": 5.42
      },
      "summary": "2B Conformer 编码器 + 轻量 Transformer 解码器的开放权重 ASR，登顶 HuggingFace Open ASR Leaderboard（平均 WER 5.42%）。",
      "architecture": "大 Conformer 编码器承担主要参数，后接轻量 Transformer 解码器做 token 生成；从零监督训练，不引入 LLM 解码，推理路径短、延迟可控。",
      "training": "标准监督交叉熵（输出 token），从零训练；覆盖 14 种语言（英/法/德/意/西/葡/希/荷/波 + 中/日/韩/越/阿），面向实际条件下的低 WER 调优。",
      "results": [
        {
          "dataset": "HF Open ASR Leaderboard（多数据集均值）",
          "metric": "WER",
          "value": "5.42%",
          "note": "平均，居榜首"
        }
      ],
      "ablation": "未公开独立消融；其卖点在于‘同规模开放榜第一’，差异主要来自架构简洁（大编码器 + 轻解码器）与监督数据规模，而非结构创新。",
      "limitation": "覆盖 14 种语言，超多语种/极低资源场景弱于专门多语种模型；无 LLM 带来的语言理解/指令能力；可自托管或经 API，不参与端侧小模型。",
      "innovation": [
        "大 Conformer 编码器 + 轻量 Transformer 解码器",
        "开放权重（Apache 2.0）可自托管",
        "HF Open ASR 榜第一（WER 5.42%）",
        "2B 规模易部署"
      ],
      "diff_vs": [
        {
          "vs": "Whisper / Parakeet",
          "note": "同规模下 WER 更低且登顶开放榜，且完全开源"
        },
        {
          "vs": "LLM 系 ASR",
          "note": "纯 Conformer 更轻、延迟更可控，但缺语言理解"
        }
      ],
      "references": [
        {
          "title": "Cohere Transcribe 官方博客",
          "url": "https://cohere.com/blog/transcribe"
        }
      ],
      "caps": {
        "stream": false,
        "long": false,
        "multi": true,
        "clone": false,
        "emot": false
      }
    },
    {
      "id": "fireredasr2",
      "name": "FireRedASR2 (2S)",
      "org": "FireRed / 小红书",
      "date": "2026-03",
      "domain": "ASR",
      "framework_lines": [
        "asr_aed",
        "asr_llm",
        "asr_long"
      ],
      "paper_url": "https://arxiv.org/abs/2603.10420",
      "has_arxiv": true,
      "source_type": "论文",
      "pdf_local": "papers/2603.10420.pdf",
      "reader_paper": "2603.10420",
      "license": "开源(权重)",
      "params": "LLM 8B+ / AED 1B+",
      "metrics": {
        "cer": 2.89
      },
      "summary": "工业级 All-in-One ASR 系统：ASR+VAD+LID+标点四模块一体；ASR 含 LLM(8B+) 与 AED(1B+) 两变体，中文/方言强劲。",
      "architectures": [
        {
          "variant": "FireRedASR2-LLM",
          "arch_type": "LLM 解码 ASR",
          "line": "asr_llm",
          "innovation_point": "8B+ 参数，4 个公开中文基准平均 CER 2.89%、19 个方言基准 11.55%，胜 Doubao-ASR / Qwen3-ASR / Fun-ASR",
          "metrics": {
            "cer": 2.89
          }
        },
        {
          "variant": "FireRedASR2-AED",
          "arch_type": "Attention Encoder-Decoder",
          "line": "asr_aed",
          "innovation_point": "1B+ 参数纯 AED，覆盖普通话/方言/英文/code-switching 与歌唱转录"
        },
        {
          "variant": "FireRedVAD / LID / Punc",
          "arch_type": "流水线前置模块",
          "line": "asr_long",
          "innovation_point": "VAD 仅 0.6M(DFSMN)、LID 100+ 语、Punc BERT 式，FLEURS-VAD F1 97.57%"
        }
      ],
      "architecture": "核心是‘一个统一流水线串起四个模块’：语音先经超轻量 VAD(0.6M DFSMN，支持流式/非流式/多标签 mVAD) 切分，再经 LID(Encoder-Decoder，100+ 语、20+ 中文方言) 判语种，送入 ASR(LM 或 AED 变体) 转写，最后 Punc(BERT 式) 加标点。ASR 内部两变体共享前端表征。",
      "training": "四模块分别训练后联合部署；ASR 用大规模多方言/中英/code-switch 数据；VAD/LID/Punc 各有专门数据。权重与代码已开源。",
      "results": [
        {
          "dataset": "4 个公开中文基准(平均)",
          "metric": "CER",
          "value": "2.89%",
          "note": "LLM 变体，优于 Doubao-ASR / Qwen3-ASR / Fun-ASR"
        },
        {
          "dataset": "19 个中文方言/口音基准(平均)",
          "metric": "CER",
          "value": "11.55%",
          "note": "LLM 变体"
        },
        {
          "dataset": "FLEURS-VAD-102",
          "metric": "帧级 F1 / AUC-ROC",
          "value": "97.57% / 99.60%",
          "note": "VAD，优于 Silero/TEN/FunASR/WebRTC"
        },
        {
          "dataset": "FLEURS(82 语)",
          "metric": "句级准确率",
          "value": "97.18%",
          "note": "LID，优于 Whisper/SpeechBrain"
        },
        {
          "dataset": "多领域标点基准",
          "metric": "F1",
          "value": "78.90%",
          "note": "Punc，优于 FunASR-Punc 62.77%"
        }
      ],
      "ablation": "论文给出四模块各自在对应基准上超越强基线，证明‘一体化流水线’在工程上优于级联开源组件；方言覆盖广度是其关键增益。",
      "limitation": "LLM 变体 8B+ 推理成本较高；AED 变体精度低于 LLM 变体；与统一音频-语言基座(如 StepAudio)相比，不具备对话/生成能力。",
      "innovation": [
        "四模块 All-in-One 流水线",
        "LLM / AED 双变体按需选型",
        "方言/口音覆盖广度(19 基准 11.55%)"
      ],
      "diff_vs": [
        {
          "vs": "Cohere Transcribe",
          "note": "FireRedASR2 多模块+多变体+开源，Cohere 同为 Apache 2.0 开放权重、纯 ASR 单模型"
        },
        {
          "vs": "StepAudio 2.5",
          "note": "FireRedASR2 偏识别流水线，StepAudio 偏统一音频-语言基座"
        }
      ],
      "references": [
        {
          "title": "FireRedASR2S arXiv:2603.10420",
          "url": "https://arxiv.org/abs/2603.10420"
        }
      ],
      "caps": {
        "stream": true,
        "long": true,
        "multi": true,
        "clone": false,
        "emot": false
      }
    },
    {
      "id": "nim4_asr",
      "name": "NIM4-ASR",
      "org": "NIO / 蔚来",
      "date": "2026-04",
      "domain": "ASR",
      "framework_lines": [
        "asr_llm"
      ],
      "paper_url": "https://arxiv.org/abs/2604.18105",
      "has_arxiv": true,
      "source_type": "论文",
      "pdf_local": "papers/2604.18105.pdf",
      "reader_paper": "2604.18105",
      "license": "商业/可部署",
      "params": "2.3B",
      "metrics": {},
      "summary": "2.3B 实时流式 LLM-ASR，约 600M 流式 Conformer + Qwen3-1.7B 解码；引入百万级音素 RAG 热词机制强化专名/术语识别。",
      "architecture": "约 600M 流式 Conformer 编码器 + 两层 MLP adaptor 将音频映射为表征，送入 Qwen3-1.7B 语言模型做解码；原生流式（chunk 级编码 + KV-cache 复用），首包延迟受 ~160ms/token 分辨率约束。关键模块是检索增强(RAG)：推理时从百万级音素索引检索热词（人名、地名、产品名、术语），以约束/提示方式注入解码过程。",
      "training": "六阶段训练范式：CR-CTC 预训练 → 对齐(alignment) → IA-SFT(迭代异步 SFT) → Late Joint SFT → Context SFT(热词上下文) → ASR 专用 GRPO（奖励 R_acc=exp(-α·CER)、R_hallu、R_ctx）；推理时百万级音素 RAG 热词检索→注入，热词可来自领域词典或实时检索。",
      "results": [
        {
          "dataset": "含专名/术语的数据集",
          "metric": "WER",
          "value": "显著降低",
          "note": "相对无 RAG 基线，论文给出具体降幅"
        }
      ],
      "ablation": "核心消融即‘有无 RAG 热词’：在术语密集场景（金融、医疗、客服）WER 下降明显，通用场景增益较小。",
      "limitation": "依赖外部检索索引的质量与覆盖；热词注入增加推理复杂度；2.3B 规模在中低端硬件仍需优化。",
      "innovation": [
        "原生流式编码 + KV-cache 复用（低延迟实时 ASR）",
        "百万级音素 RAG 热词检索（亚毫秒，强化专名/术语）",
        "ASR 专用 GRPO（R_acc / R_hallu / R_ctx 多奖励）",
        "六阶段训练范式（CR-CTC → 对齐 → IA-SFT → Late Joint SFT → Context SFT → GRPO）"
      ],
      "diff_vs": [
        {
          "vs": "纯 Conformer ASR",
          "note": "用 LLM 承载语言知识，热词检索式增强"
        },
        {
          "vs": "FireRedASR2 LLM 变体",
          "note": "明确以 RAG 热词为差异化，而非单纯加大模型"
        }
      ],
      "references": [
        {
          "title": "NIM4-ASR arXiv:2604.18105",
          "url": "https://arxiv.org/abs/2604.18105"
        }
      ],
      "caps": {
        "stream": true,
        "long": false,
        "multi": true,
        "clone": false,
        "emot": false
      }
    },
    {
      "id": "ibm_granite41",
      "name": "IBM Granite Speech 4.1",
      "org": "IBM",
      "date": "2026-02",
      "domain": "ASR",
      "framework_lines": [
        "asr_aed"
      ],
      "paper_url": "",
      "has_arxiv": false,
      "source_type": "官方",
      "license": "Apache 2.0",
      "params": "2B (NAR)",
      "metrics": {
        "wer": 5.33
      },
      "summary": "2B 非自回归(NAR)解码的识别模型，WER 5.33%，低延迟且可商用。",
      "architecture": "语音编码器产出表征后由非自回归模块（如 mask-predict / CTC+NAR 解码）并行输出文本，减少自回归等待；与 Granite 语言模型生态打通便于后续语言处理。",
      "training": "大规模语音-文本对齐训练，NAR 解码目标与编码器联合优化；Apache 2.0 全开源。",
      "results": [
        {
          "dataset": "公开英文基准(均值)",
          "metric": "WER",
          "value": "5.33%",
          "note": "与 2B 级模型相当，许可更友好"
        }
      ],
      "ablation": "NAR vs AR 的延迟/精度权衡是核心；NAR 以轻微精度换显著延迟下降。",
      "limitation": "NAR 在极长句或强口音上可能弱于强 AR/LLM 模型；多语种覆盖不如专门多语种模型。",
      "innovation": [
        "非自回归解码降低延迟",
        "2B + Apache 2.0 全开源可商用",
        "Granite 生态衔接"
      ],
      "diff_vs": [
        {
          "vs": "Cohere Transcribe",
          "note": "精度接近但 Granite 完全开源可商用"
        },
        {
          "vs": "AR 系模型",
          "note": "NAR 是延迟优势来源"
        }
      ],
      "references": [
        {
          "title": "IBM Granite Speech 4.1（无公开论文 PDF，以官方发布为准）",
          "url": ""
        }
      ],
      "caps": {
        "stream": true,
        "long": false,
        "multi": false,
        "clone": false,
        "emot": false
      }
    },
    {
      "id": "moonshine_v2",
      "name": "Moonshine v2",
      "org": "Useful Sensors",
      "date": "2026-02",
      "domain": "ASR",
      "framework_lines": [
        "asr_stream"
      ],
      "paper_url": "https://github.com/usefulsensors/moonshine",
      "has_arxiv": false,
      "source_type": "博客",
      "license": "Apache 2.0",
      "params": "小模型",
      "metrics": {},
      "summary": "流式优先的小模型，比 Whisper 快约 100 倍，主打端侧/实时。",
      "architecture": "轻量编码器-解码器专为流式裁剪；以小参数量换取极低算力需求，适合 MCU/嵌入式。",
      "training": "在通用语音数据上训练，面向实时场景的延迟/精度权衡优化；Apache 2.0 开源。",
      "results": [
        {
          "dataset": "相对 Whisper",
          "metric": "推理速度",
          "value": "~100×",
          "note": "同精度量级下"
        }
      ],
      "ablation": "设计核心即在‘精度-速度’帕累托前沿上选小模型点；未做大型消融。",
      "limitation": "绝对精度弱于大模型；仅适合对精度容忍度高的端侧场景。",
      "innovation": [
        "流式优先架构，首包延迟极低",
        "极低算力可运行",
        "Apache 2.0 开源"
      ],
      "diff_vs": [
        {
          "vs": "Whisper",
          "note": "快约 100×但绝对精度弱"
        },
        {
          "vs": "Parakeet TDT",
          "note": "Moonshine 偏端侧小模型，Parakeet 偏服务端高吞吐"
        }
      ],
      "references": [
        {
          "title": "Moonshine v2 仓库",
          "url": "https://github.com/usefulsensors/moonshine"
        }
      ],
      "caps": {
        "stream": true,
        "long": false,
        "multi": false,
        "clone": false,
        "emot": false
      }
    },
    {
      "id": "on_device",
      "name": "On-Device Streaming ASR",
      "org": "NVIDIA",
      "date": "2026-04",
      "domain": "ASR",
      "framework_lines": [
        "asr_stream"
      ],
      "paper_url": "https://arxiv.org/abs/2604.14493",
      "has_arxiv": true,
      "source_type": "论文",
      "pdf_local": "papers/2604.14493.pdf",
      "reader_paper": "2604.14493",
      "license": "商业",
      "params": "0.67GB(量化)",
      "metrics": {},
      "summary": "将 Nemotron 语音模型量化至 0.67GB，可在端侧设备流式运行。",
      "architecture": "在 Nemotron 语音基线上做权重量化（如 INT8/低比特）与算子优化，保留流式 chunk 解码；体积压到 0.67GB 仍保持可用精度。",
      "training": "预训练大模型 → 量化 + 蒸馏/微调补偿精度损失；流式解码管线适配端侧。",
      "results": [
        {
          "dataset": "端侧部署",
          "metric": "模型体积",
          "value": "0.67GB",
          "note": "量化后，端侧流式可行"
        }
      ],
      "ablation": "量化粒度 vs 精度/延迟的权衡是核心实验。",
      "limitation": "量化后精度相对全精度有损；不同端侧芯片算子支持度影响实际表现。",
      "innovation": [
        "极致量化到 0.67GB 仍可流式",
        "端侧低资源可部署",
        "量化+流式联合优化"
      ],
      "diff_vs": [
        {
          "vs": "Moonshine v2",
          "note": "同端侧，但源自更大 Nemotron 基线的量化"
        },
        {
          "vs": "云端 LLM-ASR",
          "note": "精度妥协换端侧可部署"
        }
      ],
      "references": [
        {
          "title": "On-Device Streaming ASR arXiv:2604.14493",
          "url": "https://arxiv.org/abs/2604.14493"
        }
      ],
      "caps": {
        "stream": true,
        "long": false,
        "multi": false,
        "clone": false,
        "emot": false
      }
    },
    {
      "id": "kyutai_stt",
      "name": "Kyutai STT",
      "org": "Kyutai",
      "date": "2026-03",
      "domain": "ASR",
      "framework_lines": [
        "asr_stream"
      ],
      "paper_url": "https://github.com/kyutai-late/kyutai-stt",
      "has_arxiv": false,
      "source_type": "博客",
      "license": "开源",
      "params": "中等",
      "metrics": {
        "latency_ms": 500
      },
      "summary": "端到端实时 STT，延迟约 0.5s，强调自然实时对话体验。",
      "architecture": "端到端流式架构，边听边出，无独立 VAD 级联；通常采用流式 Conformer/Transformer + chunk 处理实现低延迟。",
      "training": "流式目标训练（chunk 级损失），强调首包延迟与自然对话节奏；开源可复现。",
      "results": [
        {
          "dataset": "实测",
          "metric": "延迟",
          "value": "~0.5s",
          "note": "接近人类对话节奏"
        }
      ],
      "ablation": "chunk 大小/上下文窗口对延迟-精度的影响是其工程重点。",
      "limitation": "相较非流式大模型精度略低；长静音/重叠语音处理仍有挑战。",
      "innovation": [
        "端到端流式，0.5s 级延迟",
        "自然实时对话友好",
        "开源可复现"
      ],
      "diff_vs": [
        {
          "vs": "Moonshine v2",
          "note": "同样实时，Kyutai 强调端到端与自然对话"
        },
        {
          "vs": "Voxtral Mini",
          "note": "二者均实时，Voxtral 配 TTS 生态"
        }
      ],
      "references": [
        {
          "title": "Kyutai STT 仓库",
          "url": "https://github.com/kyutai-late/kyutai-stt"
        }
      ],
      "caps": {
        "stream": true,
        "long": false,
        "multi": false,
        "clone": false,
        "emot": false
      }
    },
    {
      "id": "voxtral_mini",
      "name": "Voxtral Mini Realtime",
      "org": "Mistral",
      "date": "2026-02",
      "domain": "ASR",
      "framework_lines": [
        "asr_stream"
      ],
      "paper_url": "https://arxiv.org/abs/2602.11298",
      "has_arxiv": true,
      "source_type": "论文",
      "license": "Apache 2.0",
      "params": "4B",
      "metrics": {
        "latency_ms": 480
      },
      "summary": "Mistral 原生流式 ASR（Voxtral Realtime）：约 480ms 延迟下质量与 Whisper 相当，13 种语言，Apache 2.0 开放权重。",
      "architecture": "基于 Delayed Streams Modeling 的端到端流式 ASR：3.4B LM + 970M 因果音频编码器，Ada RMS-Norm 做延迟调节，显式对齐音频流与文本流，而非把离线模型切块/滑窗凑流式。",
      "training": "端到端为流式训练（非离线模型适配）；大规模多语预训练覆盖 13 种语言；Apache 2.0 开放权重。",
      "results": [
        {
          "dataset": "实测（480ms 延迟）",
          "metric": "质量",
          "value": "≈Whisper",
          "note": "亚秒延迟下与 Whisper 相当"
        }
      ],
      "ablation": "因果编码器 + Ada RMS-Norm 的延迟条件化是流式质量的关键；相比 chunking/sliding-window 离线适配，端到端流式训练避免块边界截断。",
      "limitation": "4B 规模推理成本高于小端侧模型；语种（13）少于部分多语专用模型；实时性以 ~480ms 延迟为代价。",
      "innovation": [
        "原生端到端流式 ASR（非离线切块）",
        "因果音频编码器 + Ada RMS-Norm 延迟调节",
        "480ms 延迟质量≈Whisper",
        "Apache 2.0 开放权重"
      ],
      "diff_vs": [
        {
          "vs": "Kyutai STT",
          "note": "二者均实时，Voxtral ~480ms 略低于 Kyutai ~500ms，且配 TTS 生态"
        },
        {
          "vs": "Whisper",
          "note": "实时性显著优于 Whisper，质量相当"
        }
      ],
      "references": [
        {
          "title": "Voxtral Realtime arXiv:2602.11298",
          "url": "https://arxiv.org/abs/2602.11298"
        }
      ],
      "caps": {
        "stream": true,
        "long": false,
        "multi": false,
        "clone": false,
        "emot": false
      }
    },
    {
      "id": "parakeet_tdt",
      "name": "NVIDIA Parakeet TDT",
      "org": "NVIDIA",
      "date": "2026-01",
      "domain": "ASR",
      "framework_lines": [
        "asr_stream"
      ],
      "paper_url": "https://catalog.ngc.nvidia.com/",
      "has_arxiv": false,
      "source_type": "榜单",
      "license": "CC-BY-4.0",
      "params": "0.6–1.1B",
      "metrics": {
        "rtf": 0.0003
      },
      "summary": "TDT 架构高吞吐 ASR，RTFx 约 3332，服务端批处理之王。",
      "architecture": "Token-and-Duration Transducer：在 RNN-T 基础上同时预测‘输出 token’与‘跳过帧数(duration)’，天然支持流式且大幅减少帧级重复计算，利于批处理。",
      "training": "大规模监督语音训练；TDT 目标函数联合优化 token 与 duration 预测；CC-BY-4.0。",
      "results": [
        {
          "dataset": "服务端批处理",
          "metric": "RTFx",
          "value": "~3332",
          "note": "即 1 秒音频约 0.0003 秒处理"
        }
      ],
      "ablation": "duration 预测粒度过粗/过细对吞吐与精度的影响是其关键设计点。",
      "limitation": "主打吞吐而非极低延迟；英文/多语种覆盖取决于训练数据。",
      "innovation": [
        "TDT 联合预测 token 与时长",
        "极高吞吐，适合批量转写",
        "CC-BY-4.0"
      ],
      "diff_vs": [
        {
          "vs": "Moonshine v2",
          "note": "Parakeet 重吞吐，Moonshine 重端侧小模型"
        },
        {
          "vs": "Cohere Transcribe",
          "note": "Cohere 重开放榜精度，Parakeet 重吞吐"
        }
      ],
      "references": [
        {
          "title": "NVIDIA NeMo Parakeet",
          "url": "https://catalog.ngc.nvidia.com/"
        }
      ],
      "caps": {
        "stream": true,
        "long": false,
        "multi": false,
        "clone": false,
        "emot": false
      }
    },
    {
      "id": "canary_qwen",
      "name": "Canary-Qwen 2.5B",
      "org": "NVIDIA",
      "date": "2026-02",
      "domain": "ASR",
      "framework_lines": [
        "asr_stream"
      ],
      "paper_url": "https://catalog.ngc.nvidia.com/",
      "has_arxiv": false,
      "source_type": "榜单",
      "license": "CC-BY-4.0",
      "params": "2.5B",
      "metrics": {},
      "summary": "2.5B multilingual ASR，覆盖英/法/德/西，内置标点与 ITN。",
      "architecture": "多语种编码器 + 解码，联合训练标点恢复与逆文本归一化(ITN)；2.5B 规模兼顾精度与成本。",
      "training": "四语(英/法/德/西)大规模数据 + 标点/ITN 多任务；CC-BY-4.0。",
      "results": [
        {
          "dataset": "四语基准",
          "metric": "WER",
          "value": "高精度",
          "note": "标点与 ITN 开箱可用"
        }
      ],
      "ablation": "多任务(识别+标点+ITN)联合训练的增益实验。",
      "limitation": "仅 4 语，超多语言场景需其他模型；相对 LLM 系缺语言理解。",
      "innovation": [
        "2.5B 多语种(4 语)",
        "内置标点恢复与 ITN",
        "CC-BY-4.0"
      ],
      "diff_vs": [
        {
          "vs": "Parakeet TDT",
          "note": "Canary 重多语种+标点，Parakeet 重纯吞吐"
        },
        {
          "vs": "Meta Omnilingual",
          "note": "Canary 仅 4 语高精度，Meta 重千语覆盖"
        }
      ],
      "references": [
        {
          "title": "NVIDIA NeMo Canary",
          "url": "https://catalog.ngc.nvidia.com/"
        }
      ],
      "caps": {
        "stream": true,
        "long": false,
        "multi": true,
        "clone": false,
        "emot": false
      }
    },
    {
      "id": "vibevoice_asr",
      "name": "VibeVoice ASR",
      "org": "微软",
      "date": "2026-01",
      "domain": "ASR",
      "framework_lines": [
        "asr_long"
      ],
      "paper_url": "https://arxiv.org/abs/2601.18184",
      "has_arxiv": true,
      "source_type": "论文",
      "pdf_local": "papers/2601.18184.pdf",
      "reader_paper": "2601.18184",
      "license": "研究",
      "params": "大",
      "metrics": {},
      "summary": "单次处理 60 分钟音频并附说话人日志，面向长会议/访谈。",
      "architecture": "长上下文编码器 + 说话人建模联合训练，支持单次吃下整场长音频并输出带说话人标签的转写。",
      "training": "长音频 + 多说话人数据训练，强调长程依赖与说话人一致性。",
      "results": [
        {
          "dataset": "长音频场景",
          "metric": "单次时长",
          "value": "60 分钟",
          "note": "含说话人日志"
        }
      ],
      "ablation": "上下文长度/分块策略对长音频精度的影响。",
      "limitation": "超长音频显存占用大；相对短音频模型部署成本高。",
      "innovation": [
        "单次 60 分钟超长音频",
        "内置说话人分离(diarization)",
        "长上下文建模"
      ],
      "diff_vs": [
        {
          "vs": "标准 ASR",
          "note": "突破分钟级限制，直接吃整场会议"
        },
        {
          "vs": "Meta Omnilingual",
          "note": "VibeVoice 重长音频+说话人，Meta 重语种覆盖"
        }
      ],
      "references": [
        {
          "title": "VibeVoice ASR arXiv:2601.18184",
          "url": "https://arxiv.org/abs/2601.18184"
        }
      ],
      "caps": {
        "stream": false,
        "long": true,
        "multi": false,
        "clone": false,
        "emot": false
      }
    },
    {
      "id": "stepaudio25",
      "name": "StepAudio 2.5",
      "org": "阶梯星辰",
      "date": "2026-05",
      "domain": "ASR",
      "framework_lines": [
        "asr_llm",
        "tts_hybrid"
      ],
      "paper_url": "https://arxiv.org/abs/2605.23463",
      "has_arxiv": true,
      "source_type": "论文",
      "pdf_local": "papers/2605.23463.pdf",
      "reader_paper": "2605.23463",
      "license": "研究/有限开放",
      "params": "大",
      "metrics": {
        "cer": 0.71,
        "rtf": 0.0053
      },
      "summary": "统一音频-语言基座，ASR 分支用可验证多 token 并行解码(RTF 0.0053)，三赛道(A SR/TTS/实时对话) SOTA。",
      "architectures": [
        {
          "variant": "ASR 分支",
          "arch_type": "统一基座 + 可验证多 token 解码",
          "line": "asr_llm",
          "innovation_point": "verifiable multi-token decoding，RTF 0.0053，AISHELL-1 CER 0.71%",
          "metrics": {
            "cer": 0.71,
            "rtf": 0.0053
          }
        },
        {
          "variant": "TTS 分支",
          "arch_type": "统一基座 + 偏好 RLHF",
          "line": "tts_hybrid",
          "innovation_point": "偏好 RLHF + 上下文丰富监督，可控且富表现力"
        }
      ],
      "architecture": "核心前提是‘文本与音频共享多模态表征空间’，任务差异仅是 operational regimes（数据构造、优化目标、解码约束）不同。基座是一个 audio-language foundation；通过后训练（RLHF 为主机制）塑形成三种运行模式：ASR 分支用‘可验证多 token 解码’（一次出多个 token，加速且可验证正确性）、TTS 分支用偏好 RLHF + 上下文丰富监督、实时分支用生成式奖励模型做低延迟一致对话。",
      "training": "从标准监督学习升级到 task-tailored RLHF：ASR 用可验证奖励（识别正确性）做 RLHF 对齐并驱动多 token 解码；TTS 用人类偏好 RLHF；实时用生成式奖励模型。训练强调‘同一 backbone 多目标塑形’而非多模型。",
      "results": [
        {
          "dataset": "AISHELL-1",
          "metric": "CER",
          "value": "0.71%",
          "note": "ASR 分支，RTF 0.0053（较 Qwen3-ASR 快 1.8×）"
        },
        {
          "dataset": "标准 ASR/TTS/Realtime 基准",
          "metric": "综合",
          "value": "SOTA",
          "note": "三赛道均达 SOTA"
        }
      ],
      "ablation": "论文关键论点是‘统一表征 + 任务专属 RLHF 塑形’可匹敌专用系统；多 token 解码对 ASR 延迟的增益是核心消融。",
      "limitation": "统一基座规模大、部署重；RLHF 对齐成本高；作为技术报告，细粒度模块消融与开源权重完整性有限。",
      "innovation": [
        "统一音频-语言表征，任务差异=运行模态而非架构",
        "以 RLHF 为主机制定义复杂优化目标",
        "ASR 可验证多 token 并行解码（RTF 0.0053）"
      ],
      "diff_vs": [
        {
          "vs": "Qwen-Audio-3.0",
          "note": "StepAudio 以统一基座三赛道 SOTA 见长，Qwen 分榜领先"
        },
        {
          "vs": "FireRedASR2",
          "note": "StepAudio 偏统一基座，FireRedASR2 偏识别家族+流水线"
        }
      ],
      "references": [
        {
          "title": "StepAudio 2.5 arXiv:2605.23463",
          "url": "https://arxiv.org/abs/2605.23463"
        }
      ],
      "caps": {
        "stream": true,
        "long": false,
        "multi": false,
        "clone": false,
        "emot": false
      }
    },
    {
      "id": "meta_omni",
      "name": "Meta Omnilingual ASR",
      "org": "Meta",
      "date": "2026-03",
      "domain": "ASR",
      "framework_lines": [
        "asr_long"
      ],
      "paper_url": "",
      "has_arxiv": false,
      "source_type": "官方",
      "license": "开源",
      "params": "大",
      "metrics": {
        "languages": 1600
      },
      "summary": "单模型覆盖 1600+ 语言，面向超多语言/长尾语种统一识别。",
      "architecture": "超多语种统一建模（ typically 大规模多语种 Conformer/ w2v-BERT 式），以单一模型覆盖高/低资源语言。",
      "training": "海量多语种数据（含大量低资源语种）；统一训练目标兼顾主流与长尾语言。",
      "results": [
        {
          "dataset": "语种覆盖",
          "metric": "语言数",
          "value": "1600+",
          "note": "长尾语种可用"
        }
      ],
      "ablation": "低资源语言的数据配比与采样策略是性能关键。",
      "limitation": "单语言精度通常不如针对该语的专用模型；极高资源消耗。",
      "innovation": [
        "1600+ 语言统一建模",
        "覆盖大量低资源语种",
        "大规模多语种数据"
      ],
      "diff_vs": [
        {
          "vs": "Canary-Qwen",
          "note": "Meta 重语种广度，Canary 重 4 语精度+标点"
        },
        {
          "vs": "VibeVoice ASR",
          "note": "Meta 重语种，VibeVoice 重长音频+说话人"
        }
      ],
      "references": [
        {
          "title": "Meta Omnilingual ASR（无公开论文 PDF，以官方发布为准）",
          "url": ""
        }
      ],
      "caps": {
        "stream": false,
        "long": true,
        "multi": true,
        "clone": false,
        "emot": false
      }
    },
    {
      "id": "hy_asr30",
      "name": "腾讯 Hy ASR 3.0",
      "org": "腾讯",
      "date": "2026-04",
      "domain": "ASR",
      "framework_lines": [
        "asr_llm"
      ],
      "paper_url": "https://www.tencent.com/",
      "has_arxiv": false,
      "source_type": "博客",
      "license": "商业",
      "params": "MoE+LLM",
      "metrics": {
        "wer": 3.34
      },
      "summary": "MoE + LLM 架构，中文 WER 低至 3.34%，工业高精度代表。",
      "architecture": "MoE 语音编码器（稀疏激活控成本）+ LLM 解码，将语音表征对齐到语言模型。",
      "training": "大规模中文/多方言数据 + LLM 对齐训练；稀疏激活平衡容量与推理成本。",
      "results": [
        {
          "dataset": "中文场景",
          "metric": "WER",
          "value": "3.34%",
          "note": "工业第一梯队"
        }
      ],
      "ablation": "MoE 专家数/稀疏度对中文精度与成本的权衡。",
      "limitation": "闭源商业；语种覆盖以中文为主。",
      "innovation": [
        "MoE 稀疏激活兼顾容量与成本",
        "LLM 解码强化语言理解",
        "中文 WER 3.34%"
      ],
      "diff_vs": [
        {
          "vs": "Cohere Transcribe",
          "note": "Hy 中文更强，Cohere 偏英文开放榜"
        },
        {
          "vs": "Qwen3-ASR",
          "note": "同为 LLM 系，分属腾讯/阿里生态"
        }
      ],
      "references": [
        {
          "title": "腾讯 Hy ASR 3.0（官方发布页，链接待补）",
          "url": "https://www.tencent.com/"
        }
      ],
      "caps": {
        "stream": false,
        "long": false,
        "multi": false,
        "clone": false,
        "emot": false
      }
    },
    {
      "id": "fun_realtime_asr",
      "name": "Fun-Realtime-ASR",
      "org": "阿里",
      "date": "2026-05",
      "domain": "ASR",
      "framework_lines": [
        "asr_llm"
      ],
      "paper_url": "https://www.aliyun.com/",
      "has_arxiv": false,
      "source_type": "榜单",
      "license": "商业",
      "params": "大",
      "metrics": {
        "wer": 1.8
      },
      "summary": "ASR WER 1.8% 登顶 Artificial Analysis 词错误率榜，三赛道‘大满贯’之一。",
      "architecture": "统一实时架构的 ASR 分支，工程上针对 AA 词错率榜优化（口径偏难句/口音）。",
      "training": "大规模数据与实时推理优化；与同族 TTS/Chat 共享基座。",
      "results": [
        {
          "dataset": "Artificial Analysis 词错率榜",
          "metric": "WER",
          "value": "1.8%",
          "note": "居首"
        }
      ],
      "ablation": "以第三方盲评榜为优化目标，具体消融未公开。",
      "limitation": "榜单口径与 HF 开放榜不同，横评需谨慎；闭源商业。",
      "innovation": [
        "词错误率 1.8% 登顶 AA 榜",
        "与同族 TTS/Chat 三赛道大满贯",
        "实时友好"
      ],
      "diff_vs": [
        {
          "vs": "Cohere Transcribe",
          "note": "口径不同（AA vs HF），二者均头部"
        },
        {
          "vs": "Hy ASR 3.0",
          "note": "Fun-Realtime 以 AA 榜第一为标志，Hy 以中文 WER 见长"
        }
      ],
      "references": [
        {
          "title": "Fun-Realtime（阿里云，链接待补）",
          "url": "https://www.aliyun.com/"
        }
      ],
      "caps": {
        "stream": true,
        "long": false,
        "multi": false,
        "clone": false,
        "emot": false
      }
    },
    {
      "id": "seed_asr20",
      "name": "Doubao / Seed-ASR 2.0",
      "org": "字节跳动",
      "date": "2026-03",
      "domain": "ASR",
      "framework_lines": [
        "asr_llm"
      ],
      "paper_url": "https://team.doubao.com/",
      "has_arxiv": false,
      "source_type": "博客",
      "license": "商业",
      "params": "大",
      "metrics": {},
      "summary": "字节 Seed 统一语音基座，多任务（识别/理解/翻译）一体。",
      "architecture": "大规模多任务语音训练，识别为其中一项能力；与豆包生态打通。",
      "training": "多任务联合训练，强调统一语音表征复用。",
      "results": [
        {
          "dataset": "多任务基准",
          "metric": "综合",
          "value": "居前",
          "note": "以官方发布为准"
        }
      ],
      "ablation": "多任务联合 vs 单任务的权衡。",
      "limitation": "闭源；细节公开有限。",
      "innovation": [
        "统一语音基座覆盖多任务",
        "与豆包生态打通",
        "工业级规模"
      ],
      "diff_vs": [
        {
          "vs": "StepAudio 2.5",
          "note": "同为统一基座，分属字节/阶梯星辰"
        },
        {
          "vs": "Qwen3-ASR",
          "note": "同 LLM 系，分属字节/阿里"
        }
      ],
      "references": [
        {
          "title": "Seed/豆包 语音（官方，链接待补）",
          "url": "https://team.doubao.com/"
        }
      ],
      "caps": {
        "stream": false,
        "long": false,
        "multi": false,
        "clone": false,
        "emot": false
      }
    },
    {
      "id": "qwen3_asr",
      "name": "Qwen3-ASR",
      "org": "阿里巴巴",
      "date": "2026-04",
      "domain": "ASR",
      "framework_lines": [
        "asr_llm"
      ],
      "paper_url": "",
      "has_arxiv": false,
      "source_type": "官方",
      "license": "开源(通义)",
      "params": "大",
      "metrics": {},
      "summary": "Qwen 大模型原生语音识别，多语种、与 Qwen 生态无缝衔接。",
      "architecture": "语音编码器对齐到 Qwen LLM，识别即语言理解；复用 Qwen 文本/agent 生态。",
      "training": "大规模语音-文本 + LLM 对齐训练；多语种覆盖。",
      "results": [
        {
          "dataset": "多语种基准",
          "metric": "综合",
          "value": "居前",
          "note": "与 Qwen 生态联动"
        }
      ],
      "ablation": "编码器-LLM 对齐方式、多语种数据配比的影响。",
      "limitation": "作为大模型，推理成本较高；细粒度指标以官方发布为准。",
      "innovation": [
        "大模型原生语音识别",
        "多语种覆盖",
        "Qwen 生态互通"
      ],
      "diff_vs": [
        {
          "vs": "Hy ASR 3.0",
          "note": "同 LLM 系，Qwen 偏开源生态，Hy 偏中文精度"
        },
        {
          "vs": "StepAudio 2.5",
          "note": "Qwen 在分榜领先，StepAudio 统一三赛道"
        }
      ],
      "references": [
        {
          "title": "（无公开论文 PDF，以官方发布为准）",
          "url": ""
        }
      ],
      "caps": {
        "stream": false,
        "long": false,
        "multi": true,
        "clone": false,
        "emot": false
      }
    },
    {
      "id": "glm_asr",
      "name": "GLM-ASR",
      "org": "智谱 AI",
      "date": "2026-04",
      "domain": "ASR",
      "framework_lines": [
        "asr_aed"
      ],
      "paper_url": "",
      "has_arxiv": false,
      "source_type": "官方",
      "license": "开源",
      "params": "中等",
      "metrics": {},
      "summary": "基于 GLM 语义对齐的识别头，中文场景优化，开源可商用。",
      "architecture": "在 GLM 表征上接识别头，利用语言模型语义先验提升识别的语言学合理性。",
      "training": "GLM 预训练表征 + 识别任务微调；中文数据优化。",
      "results": [
        {
          "dataset": "中文场景",
          "metric": "综合",
          "value": "良好",
          "note": "以官方发布为准"
        }
      ],
      "ablation": "语义对齐对中文同音字/专名的改善。",
      "limitation": "相对 LLM 系大模型，理解能力有限；语种以中文为主。",
      "innovation": [
        "GLM 语义对齐提升语言学合理性",
        "中文优化",
        "开源"
      ],
      "diff_vs": [
        {
          "vs": "Qwen3-ASR",
          "note": "同为国产开源大模型系，GLM 偏语义对齐"
        },
        {
          "vs": "Cohere Transcribe",
          "note": "GLM 开源，Cohere 同为 Apache 2.0 开放权重、纯 ASR 单模型"
        }
      ],
      "references": [
        {
          "title": "（无公开论文 PDF，以官方发布为准）",
          "url": ""
        }
      ],
      "caps": {
        "stream": false,
        "long": false,
        "multi": false,
        "clone": false,
        "emot": false
      }
    },
    {
      "id": "fun_asr",
      "name": "Fun-ASR (SenseVoice 系)",
      "org": "阿里",
      "date": "2026-02",
      "domain": "ASR",
      "framework_lines": [
        "asr_aed"
      ],
      "paper_url": "https://github.com/FunAudioLLM",
      "has_arxiv": false,
      "source_type": "博客",
      "license": "开源",
      "params": "中小",
      "metrics": {},
      "summary": "FunAudioLLM 家族的识别模型（SenseVoice 路线），多语种+情感/事件标签。",
      "architecture": "多任务训练，在识别文本同时预测情感与事件标签；轻量高效。",
      "training": "多语种 + 富标签（情感/事件）数据联合训练；社区活跃。",
      "results": [
        {
          "dataset": "多语种 + 富标签",
          "metric": "综合",
          "value": "可用",
          "note": "社区广泛采用"
        }
      ],
      "ablation": "富标签任务对主识别任务的增益/干扰权衡。",
      "limitation": "绝对精度不及大模型；事件/情感标签质量依赖数据。",
      "innovation": [
        "识别同时输出情感/事件标签",
        "多语种",
        "开源社区活跃"
      ],
      "diff_vs": [
        {
          "vs": "标准 ASR",
          "note": "在纯文本外附加情感/事件标签"
        },
        {
          "vs": "CosyVoice3",
          "note": "同家族，Fun-ASR 做识别、CosyVoice 做合成"
        }
      ],
      "references": [
        {
          "title": "FunAudioLLM 仓库",
          "url": "https://github.com/FunAudioLLM"
        }
      ],
      "caps": {
        "stream": false,
        "long": false,
        "multi": true,
        "clone": false,
        "emot": true
      }
    },
    {
      "id": "elevenlabs_scribe2",
      "name": "ElevenLabs Scribe v2",
      "org": "ElevenLabs",
      "date": "2026-03",
      "domain": "ASR",
      "framework_lines": [
        "asr_aed"
      ],
      "paper_url": "https://elevenlabs.io/",
      "has_arxiv": false,
      "source_type": "商业",
      "license": "商业",
      "params": "大",
      "metrics": {},
      "summary": "商业 SOTA 转写，长音频 + 说话人 + 标点一体化，企业级体验。",
      "architecture": "大模型转写 + 后处理流水线（说话人分离、标点、章节）；以 API 体验取胜。",
      "training": "大规模数据 + 企业场景调优；闭源。",
      "results": [
        {
          "dataset": "企业场景",
          "metric": "精度/易用性",
          "value": "领先",
          "note": "官方基准"
        }
      ],
      "ablation": "未公开；以产品体验为差异。",
      "limitation": "闭源付费；不可控/不可微调。",
      "innovation": [
        "长音频 + 说话人 + 标点一体",
        "企业级 API 体验",
        "商业 SOTA 精度"
      ],
      "diff_vs": [
        {
          "vs": "开源 ASR",
          "note": "精度/体验领先但闭源付费"
        },
        {
          "vs": "VibeVoice ASR",
          "note": "能力相似，但 ElevenLabs 为商业服务"
        }
      ],
      "references": [
        {
          "title": "ElevenLabs Scribe",
          "url": "https://elevenlabs.io/"
        }
      ],
      "caps": {
        "stream": false,
        "long": true,
        "multi": false,
        "clone": false,
        "emot": false
      }
    },
    {
      "id": "qwen_audio_tts",
      "name": "Qwen-Audio-3.0-TTS",
      "org": "阿里巴巴",
      "date": "2026-07",
      "domain": "TTS",
      "framework_lines": [
        "tts_hybrid"
      ],
      "paper_url": "https://arxiv.org/abs/2607.23938",
      "has_arxiv": true,
      "source_type": "论文",
      "pdf_local": "papers/2607.23938.pdf",
      "reader_paper": "2607.23938",
      "license": "开源(通义)",
      "params": "大",
      "metrics": {},
      "summary": "12.5Hz 低帧率 tokenizer + 五阶段渐进训练(LM+flow-matching 协同)，登顶 Artificial Analysis TTS 榜。",
      "architecture": "用 12.5Hz 低帧率语音 tokenizer（压缩率高→低延迟）建模语音；后端由语言模型(LM) 生成语义/声学序列、flow-matching(FM) 模型生成声学细节，二者通过五阶段渐进训练协同优化。控制通过自由自然语言指令 + 细粒度行内标签实现。",
      "training": "五阶段渐进训练范式协调 LM 与 FM；数据为 16 语言、20 个中文方言区；支持一次性最长 3 分钟长音频合成；并以噪声/混响/不清参考语音做鲁棒性训练。",
      "results": [
        {
          "dataset": "Artificial Analysis TTS Leaderboard",
          "metric": "排名",
          "value": "#1",
          "note": "独立榜第一"
        },
        {
          "dataset": "SEED-TTS-Eval / CV3-Eval / 指令跟随 / 长音频 / 声学鲁棒",
          "metric": "多项",
          "value": "SOTA/最强综合",
          "note": "内容一致性、说话人相似度、韵律自然度、音质、可控性、多语、效率、鲁棒"
        }
      ],
      "ablation": "低帧率 tokenizer(12.5Hz) 对延迟与质量的权衡、五阶段训练中 LM/FM 各阶段贡献、鲁棒性训练收益是其核心实验。",
      "limitation": "作为生产系统，轻量级部署与极端低资源语种仍是工程挑战；细粒度可控的边界未完全公开。",
      "innovation": [
        "12.5Hz 低帧率 tokenizer 降延迟",
        "五阶段渐进训练协同 LM+FM",
        "自然语言指令+行内标签自由控制",
        "3 分钟一次性长音频 + 强鲁棒参考"
      ],
      "diff_vs": [
        {
          "vs": "CosyVoice3",
          "note": "Qwen-Audio 走低帧率 tokenizer+五阶段训练，CosyVoice 偏 LLM+扩散混合"
        },
        {
          "vs": "Luna-TTS",
          "note": "Qwen-Audio 为混合系登顶榜，Luna 为全非 AR 扩散"
        }
      ],
      "references": [
        {
          "title": "Qwen-Audio-3.0-TTS arXiv:2607.23938",
          "url": "https://arxiv.org/abs/2607.23938"
        }
      ],
      "caps": {
        "stream": false,
        "long": false,
        "multi": false,
        "clone": false,
        "emot": false
      }
    },
    {
      "id": "luna_tts",
      "name": "Luna-TTS Family",
      "org": "社区/工业",
      "date": "2026-08",
      "domain": "TTS",
      "framework_lines": [
        "tts_nar"
      ],
      "paper_url": "https://arxiv.org/abs/2608.11593",
      "has_arxiv": true,
      "source_type": "论文",
      "pdf_local": "papers/2608.11593.pdf",
      "reader_paper": "2608.11593",
      "license": "开源",
      "params": "0.6B 主干",
      "metrics": {},
      "summary": "扩散-LM 全非自回归 TTS：整个 RVQ token 网格固定步并行细化；实时变体块级 RTF 0.024、首块 41.6ms。",
      "architecture": "在 100 万小时(zh/en/ja/ko) 上预训练；关键是从‘预训练 AR 文本 LLM’渐进适配：causal → bidirectional → block-causal 注意力，得到全非自回归(NAR) 的扩散-LM。Luna-TTS 一次性把整个 RVQ token 网格用固定步数并行细化（零样本克隆与语音编辑天然是 in-filling）；Luna-TTS Realtime 对 32 帧(1.28s) 块做 AR、块内并行去噪，KV-cache 块级生成 + 增量音频投递。",
      "training": "共享 tokenizer/数据流水线/0.6B 主干谱系；退火微调加入情绪与非言语声音(NVV) 控制；RL 阶段用 GRPO，策略比基于实际去噪轨迹计算。",
      "results": [
        {
          "dataset": "Seed-TTS-Eval test-zh",
          "metric": "CER / SIM",
          "value": "0.73 / 79.7",
          "note": "四项指标全对比最佳"
        },
        {
          "dataset": "Seed-TTS-Eval test-en",
          "metric": "WER / SIM",
          "value": "1.49 / 76.8",
          "note": "优于开源与商业系统"
        },
        {
          "dataset": "CV3-Eval(野外)",
          "metric": "中/英错率",
          "value": "最低",
          "note": "对比中最低"
        },
        {
          "dataset": "实时变体(warmed 服务)",
          "metric": "RTF / 首块延迟",
          "value": "0.0240 / 41.6ms",
          "note": "块级生成"
        }
      ],
      "ablation": "注意力形态(causal→bi→block-causal) 消融、并行步数对质量-延迟的权衡、GRPO 对 NVV/情绪控制的增益是核心。",
      "limitation": "NAR 并行生成对极长句的一致性与可控细粒度仍有上限；实时变体引入块级 AR，严格意义上非完全 NAR。",
      "innovation": [
        "从 AR 文本 LLM 渐进适配到扩散-LM(NAR)",
        "整个 RVQ 网格并行细化，去 AR 瓶颈",
        "实时块级去噪 + KV-cache，RTF 0.024",
        "GRPO 用于去噪轨迹对齐"
      ],
      "diff_vs": [
        {
          "vs": "CosyVoice3",
          "note": "Luna 去 AR 为扩散-LM，CosyVoice 仍含 AR 语义"
        },
        {
          "vs": "Qwen-Audio-3.0",
          "note": "Luna 纯非 AR，Qwen-Audio 为混合"
        }
      ],
      "references": [
        {
          "title": "Luna-TTS arXiv:2608.11593",
          "url": "https://arxiv.org/abs/2608.11593"
        }
      ],
      "caps": {
        "stream": true,
        "long": false,
        "multi": false,
        "clone": true,
        "emot": false
      }
    },
    {
      "id": "zonos2",
      "name": "ZONOS2",
      "org": "Zyphra",
      "date": "2026-06",
      "domain": "TTS",
      "framework_lines": [
        "tts_nar"
      ],
      "paper_url": "https://arxiv.org/abs/2606.24320",
      "has_arxiv": true,
      "source_type": "论文",
      "pdf_local": "papers/2606.24320.pdf",
      "reader_paper": "2606.24320",
      "license": "Apache 2.0",
      "params": "8B (900M 激活)",
      "metrics": {},
      "summary": "8B MoE(900M 激活) TTS，训练语料 200K→6M+ 小时，自然度/克隆 SOTA，Apache 2.0。",
      "architecture": "MoE 主干（总量 8B、激活 900M）兼顾容量与推理延迟/吞吐；相对 Zonos-v0.1(1.6B) 在规模、数据、训练配方上升级。",
      "training": "训练语料从 200K 小时扩展到 6M+ 小时（新数据处理管线）；简化后训练与条件配方以提升自然度与克隆保真；在质量/说话人相似度/WER/ZTTS1-Eval 上评估。",
      "results": [
        {
          "dataset": "ZTTS1-Eval(自研基准)",
          "metric": "质量/相似度/WER",
          "value": "竞争性 SOTA",
          "note": "保持良好流式延迟"
        }
      ],
      "ablation": "MoE 专家数/激活度、数据规模(200K→6M) 对质量与延迟的增益是核心实验。",
      "limitation": "8B 总参仍偏大；MoE 路由在边缘设备支持有限；部分指标与顶级商业系统持平而非领先。",
      "innovation": [
        "8B MoE(900M 激活) 容量-效率平衡",
        "6M+ 小时训练语料",
        "Apache 2.0 全开源 + 自研 ZTTS1-Eval"
      ],
      "diff_vs": [
        {
          "vs": "Luna-TTS",
          "note": "ZONOS2 重 MoE 容量与可控，Luna 重非 AR 范式"
        },
        {
          "vs": "OmniVoice",
          "note": "ZONOS2 偏可控/质量，OmniVoice 偏多语种"
        }
      ],
      "references": [
        {
          "title": "ZONOS2 arXiv:2606.24320",
          "url": "https://arxiv.org/abs/2606.24320"
        }
      ],
      "caps": {
        "stream": false,
        "long": false,
        "multi": false,
        "clone": true,
        "emot": false
      }
    },
    {
      "id": "omnivoice",
      "name": "OmniVoice",
      "org": "k2-fsa / 社区",
      "date": "2026-04",
      "domain": "TTS",
      "framework_lines": [
        "tts_nar"
      ],
      "paper_url": "https://arxiv.org/abs/2604.00688",
      "has_arxiv": true,
      "source_type": "论文",
      "pdf_local": "papers/2604.00688.pdf",
      "reader_paper": "2604.00688",
      "license": "开源",
      "params": "大",
      "metrics": {
        "languages": 600
      },
      "summary": "600+ 语言全非自回归扩散-LM TTS：文本直接映射到多 codebook 声学 token，免去两阶段语义中介。",
      "architecture": "扩散-LM 风格的离散 NAR 架构。关键创新是‘文本 → 多 codebook 声学 token’的直接映射，跳过传统‘文本→语义→声学’两阶段流水线。两大技术点：(1) full-codebook random masking 高效训练；(2) 从预训练 LLM 初始化以保证可懂度。",
      "training": "581k 小时多语种数据，全部来自开源；LLM 初始化 + 全 codebook 随机掩码训练。",
      "results": [
        {
          "dataset": "中/英/多语种基准",
          "metric": "综合",
          "value": "SOTA",
          "note": "覆盖广度迄今最大"
        }
      ],
      "ablation": "两阶段 vs 直接映射的对比、全 codebook 随机掩码的有效性、LLM 初始化对可懂度的贡献是核心。",
      "limitation": "600+ 语中大量低资源语种质量有限；直接映射对极高保真克隆可能弱于两阶段。",
      "innovation": [
        "文本直接映射到多 codebook 声学 token",
        "full-codebook 随机掩码高效训练",
        "LLM 初始化保可懂度",
        "581k 小时全开源数据，600+ 语"
      ],
      "diff_vs": [
        {
          "vs": "CosyVoice3",
          "note": "OmniVoice 语种更广且非 AR 直接映射，CosyVoice 含 AR 语义"
        },
        {
          "vs": "ZONOS2",
          "note": "OmniVoice 重语种，ZONOS2 重可控"
        }
      ],
      "references": [
        {
          "title": "OmniVoice arXiv:2604.00688",
          "url": "https://arxiv.org/abs/2604.00688"
        }
      ],
      "caps": {
        "stream": false,
        "long": false,
        "multi": false,
        "clone": false,
        "emot": false
      }
    },
    {
      "id": "fun_realtime_tts",
      "name": "Fun-Realtime-TTS",
      "org": "阿里",
      "date": "2026-05",
      "domain": "TTS",
      "framework_lines": [
        "tts_nar"
      ],
      "paper_url": "https://www.aliyun.com/",
      "has_arxiv": false,
      "source_type": "榜单",
      "license": "商业",
      "params": "大",
      "metrics": {
        "aa_tts_elo": 1190
      },
      "summary": "AA TTS Elo 1190 全球第 5，实时可控，三赛道大满贯之一。",
      "architecture": "实时可控合成架构（非 AR 或混合），与同族 ASR/Chat 共享基座形成三赛道大满贯。",
      "training": "实时推理优化 + 可控条件训练；以 AA 盲评榜为优化目标。",
      "results": [
        {
          "dataset": "Artificial Analysis TTS",
          "metric": "Elo",
          "value": "1190",
          "note": "全球第 5"
        }
      ],
      "ablation": "以第三方盲评为优化目标，具体未公开。",
      "limitation": "闭源商业；榜口径需结合 HF/其他榜看。",
      "innovation": [
        "AA TTS Elo 1190 全球第 5",
        "实时可控合成",
        "与同族 ASR/Chat 大满贯"
      ],
      "diff_vs": [
        {
          "vs": "Qwen-Audio-3.0-TTS",
          "note": "Fun-Realtime 实时可控，Qwen-Audio 为榜首"
        },
        {
          "vs": "CosyVoice3",
          "note": "同家族不同定位，Fun-Realtime 偏实时"
        }
      ],
      "references": [
        {
          "title": "Fun-Realtime（阿里云，链接待补）",
          "url": "https://www.aliyun.com/"
        }
      ],
      "caps": {
        "stream": true,
        "long": false,
        "multi": false,
        "clone": false,
        "emot": false
      }
    },
    {
      "id": "stepaudio25_tts",
      "name": "StepAudio 2.5 (TTS)",
      "org": "阶梯星辰",
      "date": "2026-05",
      "domain": "TTS",
      "framework_lines": [
        "tts_hybrid"
      ],
      "paper_url": "https://arxiv.org/abs/2605.23463",
      "has_arxiv": true,
      "source_type": "论文",
      "pdf_local": "papers/2605.23463.pdf",
      "license": "研究/有限开放",
      "params": "大",
      "metrics": {},
      "summary": "统一基座的 TTS 分支，用偏好 RLHF + 上下文丰富监督做可控、富表现力合成。",
      "architectures": [
        {
          "variant": "TTS 分支",
          "arch_type": "统一基座 + 扩散声学 + 偏好 RLHF",
          "line": "tts_hybrid",
          "innovation_point": "偏好 RLHF + 上下文丰富监督，可控且富表现力"
        }
      ],
      "architecture": "与 ASR 共享 audio-language 基座；TTS 分支在统一表征上用‘偏好 RLHF + 上下文丰富监督’塑形，强调可控与表现力，而非独立 TTS 架构。",
      "training": "task-tailored RLHF 是主机制：TTS 用人类偏好奖励 + 富上下文（参考音频/指令）监督对齐。",
      "results": [
        {
          "dataset": "标准 TTS 基准",
          "metric": "综合",
          "value": "SOTA",
          "note": "自然度/可控性达 SOTA"
        }
      ],
      "ablation": "偏好 RLHF vs 纯监督在表现力/可控上的增益是核心。",
      "limitation": "统一基座规模大；RLHF 成本高；权重开放程度有限。",
      "innovation": [
        "统一基座 TTS 分支",
        "生成式奖励模型 RLHF 对齐",
        "与 ASR/对话共享基座"
      ],
      "diff_vs": [
        {
          "vs": "Qwen-Audio-3.0-TTS",
          "note": "同混合系，StepAudio 强调 RLHF 对齐"
        },
        {
          "vs": "CosyVoice3",
          "note": "StepAudio 统一基座，CosyVoice 专注合成"
        }
      ],
      "references": [
        {
          "title": "StepAudio 2.5 arXiv:2605.23463",
          "url": "https://arxiv.org/abs/2605.23463"
        }
      ],
      "caps": {
        "stream": false,
        "long": false,
        "multi": false,
        "clone": false,
        "emot": true
      }
    },
    {
      "id": "wavtts",
      "name": "WavTTS",
      "org": "社区/工业",
      "date": "2026-06",
      "domain": "TTS",
      "framework_lines": [
        "tts_wave"
      ],
      "paper_url": "https://arxiv.org/abs/2606.03455",
      "has_arxiv": true,
      "source_type": "论文",
      "pdf_local": "papers/2606.03455.pdf",
      "reader_paper": "2606.03455",
      "license": "开源",
      "params": "大",
      "metrics": {},
      "summary": "首个原始波形生成式 TTS：DiT+flow matching 直接建模波形，配多尺度 mel 监督，逼近潜空间 SOTA。",
      "architecture": "基于 flow matching + Diffusion Transformer(DiT)；用简单 patchification 把原始波形切块直接建模，跳过 codec/mel 等压缩表征；训练中加入多尺度 mel 频谱监督提供感知引导。",
      "training": "波形扩散 + 多尺度 mel 监督；系统研究了预测目标与噪声调度(noise schedule) 在波形扩散中的影响，并设计了有效的 schedule。",
      "results": [
        {
          "dataset": "开源基准",
          "metric": "质量",
          "value": "逼近 SOTA 潜空间 TTS",
          "note": "显著优于此前端到端语音生成模型"
        }
      ],
      "ablation": "预测目标/噪声调度的消融、mel 监督的贡献、patchification 粒度的影响是核心。",
      "limitation": "原始波形序列极长，计算/显存成本高于潜空间模型；长音频生成效率仍是瓶颈。",
      "innovation": [
        "首个原始波形生成式 TTS",
        "DiT + flow matching 直接建模波形",
        "多尺度 mel 监督做感知引导",
        "证明波形空间扩散可规模化"
      ],
      "diff_vs": [
        {
          "vs": "CosyVoice3",
          "note": "WavTTS 无 codec，CosyVoice 经 codec/扩散"
        },
        {
          "vs": "VoxCPM2",
          "note": "WavTTS 波形级，VoxCPM2 连续隐空间"
        }
      ],
      "references": [
        {
          "title": "WavTTS arXiv:2606.03455",
          "url": "https://arxiv.org/abs/2606.03455"
        }
      ],
      "caps": {
        "stream": false,
        "long": false,
        "multi": false,
        "clone": false,
        "emot": false
      }
    },
    {
      "id": "longcat_audiodit",
      "name": "LongCat-AudioDiT",
      "org": "美团",
      "date": "2026-03",
      "domain": "TTS",
      "framework_lines": [
        "tts_wave"
      ],
      "paper_url": "https://arxiv.org/abs/2603.29339",
      "has_arxiv": true,
      "source_type": "论文",
      "pdf_local": "papers/2603.29339.pdf",
      "reader_paper": "2603.29339",
      "license": "开源",
      "params": "3.5B",
      "metrics": {},
      "summary": "波形潜空间 NAR 扩散 TTS：仅 Wav-VAE + 扩散主干；自适应投影引导；Seed-ZH SIM 0.818(超 Seed-TTS 0.809)。",
      "architecture": "直接在波形潜空间操作：只需一个波形 VAE(Wav-VAE) 把波形压到潜空间 + 一个扩散主干生成，省去 mel 等中间表征，简化管线、缓解误差累积。推理上纠正了长期训练-推理不匹配，并用自适应投影引导(adaptive projection guidance) 替代 CFG 提升质量。",
      "training": "非自回归扩散；无复杂多阶段训练、无高质量人工标注数据；3.5B 变体为主。",
      "results": [
        {
          "dataset": "Seed-ZH",
          "metric": "SIM",
          "value": "0.818",
          "note": "vs Seed-TTS 0.809"
        },
        {
          "dataset": "Seed-Hard",
          "metric": "SIM",
          "value": "0.797",
          "note": "vs Seed-TTS 0.776"
        }
      ],
      "ablation": "关键反直觉发现：Wav-VAE 重建保真度更高 ≠ TTS 整体更好（二者需协同调优）；自适应投影引导 vs CFG 的对比。",
      "limitation": "波形潜空间扩散计算仍重；对极长音频效率有限；开源权重但 3.5B 部署成本不低。",
      "innovation": [
        "波形潜空间直接扩散，仅 Wav-VAE+扩散主干",
        "纠正训练-推理不匹配",
        "自适应投影引导替代 CFG",
        "Wav-VAE 重建好≠TTS 好(反直觉)"
      ],
      "diff_vs": [
        {
          "vs": "WavTTS",
          "note": "LongCat 在潜空间扩散，WavTTS 直接波形"
        },
        {
          "vs": "CosyVoice3",
          "note": "LongCat 走波形潜空间，CosyVoice 走 codec"
        }
      ],
      "references": [
        {
          "title": "LongCat-AudioDiT arXiv:2603.29339",
          "url": "https://arxiv.org/abs/2603.29339"
        }
      ],
      "caps": {
        "stream": false,
        "long": false,
        "multi": false,
        "clone": false,
        "emot": false
      }
    },
    {
      "id": "voxcpm2",
      "name": "VoxCPM2",
      "org": "OpenBMB",
      "date": "2026-06",
      "domain": "TTS",
      "framework_lines": [
        "tts_wave"
      ],
      "paper_url": "https://arxiv.org/abs/2606.06928",
      "has_arxiv": true,
      "source_type": "论文",
      "pdf_local": "papers/2606.06928.pdf",
      "reader_paper": "2606.06928",
      "license": "Apache 2.0",
      "params": "2B",
      "metrics": {
        "languages": 30
      },
      "summary": "2B 分层连续隐空间模型，不依赖任何外部离散 tokenizer；非对称 AudioVAE 16k→48k；30 语+9 方言、2M+ 小时，Apache 2.0。",
      "architecture": "继承并扩展 VoxCPM 的‘分层扩散-自回归’连续隐空间范式：不依赖任何外部离散语音 tokenizer。质量上用非对称 AudioVAE——以 16kHz 编码、48kHz 重建，实现隐式超分且编码效率高。能力上单一主干统一 30 语言、9 中文方言、自然语言声音设计、风格可控克隆、高保真续写克隆。",
      "training": "联合扩展到 2B 参数 + 2M+ 小时多语种语音；提出统一序列组织(unified sequence organization)，用同一组输入积木的不同排列表达所有生成模式，从而单一参数集与单一目标联合训练。",
      "results": [
        {
          "dataset": "内部 30 语言评测集",
          "metric": "平均 WER",
          "value": "1.68%",
          "note": "零样本/指令跟随 TTS 达 SOTA 或竞争性"
        },
        {
          "dataset": "公开零样本/指令跟随基准",
          "metric": "综合",
          "value": "SOTA/竞争性",
          "note": "Apache 2.0 全开源"
        }
      ],
      "ablation": "非对称 AudioVAE（16k 编码/48k 重建）的隐式超分收益、统一序列组织对各生成模式联合训练的必要性是核心。",
      "limitation": "连续隐空间对离散可控编辑不如 codec 直观；2M 小时数据门槛高；长音频效率待验证。",
      "innovation": [
        "免外部离散 tokenizer 的连续隐空间",
        "非对称 AudioVAE 16k→48k 隐式超分",
        "统一序列组织实现单目标多模式联合训练",
        "2B + 2M 小时 + Apache 2.0 全开源"
      ],
      "diff_vs": [
        {
          "vs": "CosyVoice3",
          "note": "VoxCPM2 免外部 tokenizer，CosyVoice 依赖 codec"
        },
        {
          "vs": "WavTTS",
          "note": "VoxCPM2 连续隐空间，WavTTS 原始波形"
        }
      ],
      "references": [
        {
          "title": "VoxCPM2 arXiv:2606.06928",
          "url": "https://arxiv.org/abs/2606.06928"
        }
      ],
      "caps": {
        "stream": false,
        "long": false,
        "multi": true,
        "clone": true,
        "emot": false
      }
    },
    {
      "id": "chatterbox_flash",
      "name": "Chatterbox-Flash",
      "org": "Resemble / 社区",
      "date": "2026-05",
      "domain": "TTS",
      "framework_lines": [
        "tts_nar"
      ],
      "paper_url": "https://github.com/resemble-ai/chatterbox",
      "has_arxiv": false,
      "source_type": "博客",
      "license": "开源",
      "params": "中等",
      "metrics": {},
      "summary": "块扩散(chunk diffusion)流式 TTS，低首包延迟，适合实时对话。",
      "architecture": "把语音分块用扩散生成，块间流式衔接；非 AR 块扩散兼顾质量与低首包延迟。",
      "training": "扩散训练 + 流式块调度优化；开源。",
      "results": [
        {
          "dataset": "实时场景",
          "metric": "首包延迟",
          "value": "低",
          "note": "适合对讲（以开源实测为准）"
        }
      ],
      "ablation": "块大小/步数对延迟-质量的权衡。",
      "limitation": "块扩散的一致性与长句连贯性挑战；开源社区维护。",
      "innovation": [
        "块扩散流式，低首包延迟",
        "实时对话友好",
        "开源"
      ],
      "diff_vs": [
        {
          "vs": "ZONOS2",
          "note": "Chatterbox 重流式低延迟，ZONOS2 重 MoE 可控"
        },
        {
          "vs": "Luna-TTS",
          "note": "同非 AR，Chatterbox 偏流式"
        }
      ],
      "references": [
        {
          "title": "Chatterbox 仓库",
          "url": "https://github.com/resemble-ai/chatterbox"
        }
      ],
      "caps": {
        "stream": true,
        "long": false,
        "multi": false,
        "clone": false,
        "emot": false
      }
    },
    {
      "id": "confucius4_tts",
      "name": "Confucius4-TTS",
      "org": "网易",
      "date": "2026-04",
      "domain": "TTS",
      "framework_lines": [
        "tts_wave"
      ],
      "paper_url": "",
      "has_arxiv": false,
      "source_type": "官方",
      "license": "开源",
      "params": "大",
      "metrics": {},
      "summary": "无文本(textless)跨语种克隆，用连续表征实现‘听一段即跨语克隆’。",
      "architecture": "基于连续表征的 textless 方案：从参考音频直接提取连续语音表征，跨语种迁移到目标语言合成，无需目标语种文本或强数据。",
      "training": "连续表征 + 跨语种对齐训练；降低对目标语种文本/数据的依赖。",
      "results": [
        {
          "dataset": "跨语种克隆",
          "metric": "质量",
          "value": "显著",
          "note": "论文给出跨语种迁移效果"
        }
      ],
      "ablation": "textless 表征 vs 文本条件的跨语种质量对比。",
      "limitation": "完全 textless 在精确内容可控性上弱于文本条件；极低资源语种仍受限。",
      "innovation": [
        "textless 跨语种声音克隆",
        "连续表征跨语言迁移",
        "降低目标语种文本依赖"
      ],
      "diff_vs": [
        {
          "vs": "CosyVoice3",
          "note": "Confucius4 走 textless，CosyVoice 需文本"
        },
        {
          "vs": "VoxCPM2",
          "note": "同连续表征，Confucius4 重跨语种克隆"
        }
      ],
      "references": [
        {
          "title": "（无公开论文 PDF，以官方发布为准）",
          "url": ""
        }
      ],
      "caps": {
        "stream": false,
        "long": false,
        "multi": true,
        "clone": true,
        "emot": false
      }
    },
    {
      "id": "voxtral_tts",
      "name": "Voxtral TTS",
      "org": "Mistral",
      "date": "2026-03",
      "domain": "TTS",
      "framework_lines": [
        "tts_hybrid"
      ],
      "paper_url": "https://arxiv.org/abs/2603.25551",
      "has_arxiv": true,
      "source_type": "论文",
      "pdf_local": "papers/2603.25551.pdf",
      "reader_paper": "2603.25551",
      "license": "CC BY-NC",
      "params": "4B",
      "metrics": {
        "latency_ms": 70
      },
      "summary": "4B 混合(AR 语义 token + flow-matching 声学 token)；自研 Voxtral Codec(VQ-FSQ)；3s 克隆、9 语、对 ElevenLabs Flash v2.5 胜率 68.4%。",
      "architecture": "混合架构：自回归生成语义语音 token，再用 flow-matching 生成声学 token。语音 token 由自研 Voxtral Codec 编解码——该 codec 从零训练，采用混合 VQ-FSQ(Vocabulary-Free Scalar Quantization) 量化方案，兼顾表征效率与保真。",
      "training": "以 3 秒参考音频做零样本克隆；多语种(9 语) 自然度/表现力训练；CC BY-NC 开放权重。",
      "results": [
        {
          "dataset": "人工评测(母语者)",
          "metric": "对 ElevenLabs Flash v2.5 胜率",
          "value": "68.4%",
          "note": "多语种克隆自然度/表现力"
        },
        {
          "dataset": "实测",
          "metric": "首包延迟",
          "value": "~70ms",
          "note": "实时友好"
        }
      ],
      "ablation": "AR 语义 + flow-matching 声学的分工、VQ-FSQ 相对于标准 VQ 的增益是核心。",
      "limitation": "CC BY-NC 不可商用；4B 规模推理成本不低；语种限于 9 语。",
      "innovation": [
        "AR 语义 + flow-matching 声学混合",
        "自研 Voxtral Codec(VQ-FSQ)",
        "3s 克隆、9 语、~70ms 延迟",
        "对 ElevenLabs 68.4% 胜率"
      ],
      "diff_vs": [
        {
          "vs": "Qwen-Audio-3.0-TTS",
          "note": "Voxtral 混合架构+低延迟，Qwen-Audio 为榜首"
        },
        {
          "vs": "CosyVoice3",
          "note": "同混合，Voxtral 偏实时低延迟+自研 codec"
        }
      ],
      "references": [
        {
          "title": "Voxtral TTS arXiv:2603.25551",
          "url": "https://arxiv.org/abs/2603.25551"
        }
      ],
      "caps": {
        "stream": false,
        "long": false,
        "multi": false,
        "clone": true,
        "emot": false
      }
    },
    {
      "id": "fishaudio_s2",
      "name": "Fish Audio S2",
      "org": "Fish Audio",
      "date": "2026-03",
      "domain": "TTS",
      "framework_lines": [
        "tts_ar"
      ],
      "paper_url": "https://arxiv.org/abs/2603.08823",
      "has_arxiv": true,
      "source_type": "论文",
      "pdf_local": "papers/2603.08823.pdf",
      "reader_paper": "2603.08823",
      "license": "开源",
      "params": "4B",
      "metrics": {
        "rtf": 0.195
      },
      "summary": "开源 TTS：Dual-AR（4B Slow + 400M Fast AR）+ RVQ codec，80+ 语言、词级情绪控制；发布权重、微调代码与 SGLang 推理引擎（RTF 0.195、首包 <100ms）。",
      "architecture": "decoder-only Transformer 主干 + RVQ 音频 codec（沿用 Fish-Speech）；Dual-AR 把生成解耦为 Slow AR 与 Fast AR，10 码本 RVQ + GRPO 对齐；自研多阶段训练配方与分阶段数据管线（视频/语音字幕、音质评估、奖励建模）支撑指令跟随。",
      "training": "大规模语音 codec 训练 + 指令跟随控制；分阶段数据管线覆盖视频字幕、语音字幕、音质评估与奖励建模；开源权重与微调代码。",
      "results": [
        {
          "dataset": "SGLang 推理引擎",
          "metric": "RTF",
          "value": "0.195",
          "note": "流式生产级"
        },
        {
          "dataset": "首包音频",
          "metric": "延迟",
          "value": "<100ms",
          "note": "time-to-first-audio"
        }
      ],
      "ablation": "codec 码本/采样率对质量的影响；多阶段训练与奖励建模对指令跟随的贡献。",
      "limitation": "AR 生成有延迟与错误累积；规模小于大模型；指令跟随质量依赖奖励建模。",
      "innovation": [
        "开源 TTS + 微调代码 + SGLang 引擎",
        "Dual-AR（Slow+Fast AR）+ RVQ codec",
        "80+ 语言、词级情绪控制",
        "RTF 0.195、首包 <100ms"
      ],
      "diff_vs": [
        {
          "vs": "CosyVoice3",
          "note": "Fish 偏开源社区+指令控制，CosyVoice 偏大厂多语种"
        },
        {
          "vs": "Luna-TTS",
          "note": "Fish 为 AR，Luna 为非 AR"
        }
      ],
      "references": [
        {
          "title": "Fish Audio S2 arXiv:2603.08823",
          "url": "https://arxiv.org/abs/2603.08823"
        }
      ],
      "caps": {
        "stream": true,
        "long": false,
        "multi": true,
        "clone": true,
        "emot": true
      }
    },
    {
      "id": "minimax28",
      "name": "MiniMax Speech 2.8",
      "org": "MiniMax",
      "date": "2026-01",
      "domain": "TTS",
      "framework_lines": [
        "tts_wave"
      ],
      "paper_url": "https://www.minimax.io/",
      "has_arxiv": false,
      "source_type": "博客",
      "license": "商业",
      "params": "大",
      "metrics": {
        "languages": 40
      },
      "summary": "原生语气词/声音标签(breath、laugh 等)，10 秒克隆、40+ 语言（略早于窗口）。",
      "architecture": "在合成中原生支持声音/情绪标签控制（如 breath、laugh、情绪），属表现力增强路线。",
      "training": "表现力标签数据 + 多语种(40+) 训练；10 秒参考克隆。",
      "results": [
        {
          "dataset": "表现力/多语种",
          "metric": "综合",
          "value": "强",
          "note": "官方发布"
        }
      ],
      "ablation": "声音标签对自然度/表现力的增益。",
      "limitation": "闭源商业；精确内容可控性依赖标签体系。",
      "innovation": [
        "原生声音标签（breath/laugh/情绪）",
        "10 秒克隆、40+ 语言",
        "表现力控制强"
      ],
      "diff_vs": [
        {
          "vs": "CosyVoice3",
          "note": "MiniMax 重声音标签表现力，CosyVoice 重多语种"
        },
        {
          "vs": "Voxtral TTS",
          "note": "MiniMax 偏表现力标签，Voxtral 偏实时"
        }
      ],
      "references": [
        {
          "title": "MiniMax Speech",
          "url": "https://www.minimax.io/"
        }
      ],
      "caps": {
        "stream": false,
        "long": false,
        "multi": true,
        "clone": true,
        "emot": true
      }
    },
    {
      "id": "indextts2",
      "name": "IndexTTS2",
      "org": "B站",
      "date": "2026-05",
      "domain": "TTS",
      "framework_lines": [
        "tts_ar"
      ],
      "paper_url": "https://arxiv.org/abs/2506.21619",
      "has_arxiv": true,
      "source_type": "论文",
      "pdf_local": "papers/2506.21619.pdf",
      "reader_paper": "2506.21619",
      "license": "开源",
      "params": "大",
      "metrics": {},
      "summary": "AR TTS 中首个做‘精准时长控制 + 情感/音色解耦’，视频配音/音画对齐神器。",
      "architecture": "在自回归 codec-LM 框架内提出通用且 AR 友好的时长控制：两种模式——(1) 显式指定生成 token 数精确控制时长；(2) 自由 AR 生成但忠实复现提示韵律。同时实现情感表达与说话人身份解耦，零样本下分别从音色提示与风格提示重建目标音色与指定情绪。",
      "training": "引入 GPT 隐表征增强高情绪表达下的清晰度，并设计三阶段训练提升稳定性；为降低情绪控制门槛，用 Qwen3 微调实现基于文本描述的软指令机制引导情绪。",
      "results": [
        {
          "dataset": "多数据集零样本 TTS",
          "metric": "WER / SIM / 情绪保真",
          "value": "优于 SOTA",
          "note": "时长控制 + 情感解耦双优"
        }
      ],
      "ablation": "时长控制两种模式的对比、情感/音色解耦有效性、GPT 隐表征与三阶段训练对稳定性的贡献是核心。",
      "limitation": "AR 生成本质仍有延迟；极端情绪下清晰度仍需 GPT 表征补救；长音频一致性待验证。",
      "innovation": [
        "AR 友好的精准时长控制（指定 token 数 / 自由生成）",
        "情感与音色解耦，独立控制",
        "GPT 隐表征 + 三阶段训练提稳",
        "Qwen3 软指令情绪控制"
      ],
      "diff_vs": [
        {
          "vs": "CosyVoice3",
          "note": "IndexTTS2 强在时长控制，CosyVoice 强在多语种"
        },
        {
          "vs": "MegaTTS3",
          "note": "同可控，IndexTTS2 重时长，MegaTTS3 重 8 步生成"
        }
      ],
      "references": [
        {
          "title": "IndexTTS2 arXiv:2506.21619",
          "url": "https://arxiv.org/abs/2506.21619"
        }
      ],
      "caps": {
        "stream": false,
        "long": false,
        "multi": false,
        "clone": true,
        "emot": true
      }
    },
    {
      "id": "mega_tts3",
      "name": "MegaTTS 3",
      "org": "字节跳动",
      "date": "2026-02",
      "domain": "TTS",
      "framework_lines": [
        "tts_wave"
      ],
      "paper_url": "https://arxiv.org/abs/2502.18924",
      "has_arxiv": true,
      "source_type": "论文",
      "pdf_local": "papers/2502.18924.pdf",
      "reader_paper": "2502.18924",
      "license": "开源",
      "params": "中等",
      "metrics": {},
      "summary": "稀疏对齐引导潜在 DiT：给定稀疏对齐边界降低难度又不限搜索空间；8 步生成 1 分钟语音。",
      "architecture": "针对语音-文本对齐建模痛点提出稀疏对齐算法引导潜在扩散 Transformer(DiT)：提供稀疏对齐边界(sparse alignment boundaries) 给 DiT，既降低对齐难度又保留自然度搜索空间。配合多条件 classifier-free guidance 调口音强度，并用分段整流流(piecewise rectified flow) 加速。",
      "training": "稀疏对齐监督 + 多条件 CFG + 整流流加速训练/采样。",
      "results": [
        {
          "dataset": "零样本 TTS",
          "metric": "质量",
          "value": "SOTA",
          "note": "8 步采样生成 1 分钟语音"
        }
      ],
      "ablation": "稀疏对齐 vs 无对齐(鲁棒性差) / 强制对齐(自然度受限) 的三角权衡；8 步整流流的加速-质量曲线。",
      "limitation": "稀疏对齐边界获取仍依赖某种对齐先验；极快采样下高频细节可能损失。",
      "innovation": [
        "稀疏对齐引导潜在 DiT",
        "多条件 CFG 调口音强度",
        "分段整流流加速，8 步生成 1 分钟",
        "兼顾鲁棒性与自然度"
      ],
      "diff_vs": [
        {
          "vs": "IndexTTS2",
          "note": "MegaTTS3 重少步高效，IndexTTS2 重时长控制"
        },
        {
          "vs": "CosyVoice3",
          "note": "MegaTTS3 走 DiT，CosyVoice 走 codec+扩散"
        }
      ],
      "references": [
        {
          "title": "MegaTTS 3 arXiv:2502.18924",
          "url": "https://arxiv.org/abs/2502.18924"
        }
      ],
      "caps": {
        "stream": false,
        "long": false,
        "multi": false,
        "clone": false,
        "emot": false
      }
    },
    {
      "id": "cosyvoice3",
      "name": "CosyVoice 3",
      "org": "阿里巴巴",
      "date": "2026-03",
      "domain": "TTS",
      "framework_lines": [
        "tts_ar",
        "tts_hybrid"
      ],
      "paper_url": "https://github.com/FunAudioLLM/CosyVoice",
      "has_arxiv": false,
      "source_type": "博客",
      "license": "开源",
      "params": "大",
      "metrics": {},
      "summary": "LLM 语义 + 扩散声学的混合 TTS，多语种零样本克隆，社区与工业双热（跨 AR/混合两线）。",
      "architecture": "典型混合范式：LLM 生成语义 token（文本/参考→语义表征），扩散模型生成声学细节；支持 in-context learning 零样本克隆与多语种。",
      "training": "大规模多语种语音 + LLM 语义建模 + 扩散声学建模联合；开源。",
      "results": [
        {
          "dataset": "多语种零样本",
          "metric": "克隆/质量",
          "value": "领先",
          "note": "社区广泛采用"
        }
      ],
      "ablation": "LLM 语义与扩散声学的分工、in-context 克隆的数据构造。",
      "limitation": "含 AR 语义生成，有延迟与错误累积；相对全非 AR 模型实时性弱。",
      "innovation": [
        "LLM 语义 token + 扩散声学",
        "多语种零样本克隆",
        "开源 + 工业双落地"
      ],
      "diff_vs": [
        {
          "vs": "Qwen-Audio-3.0-TTS",
          "note": "CosyVoice 偏 codec+扩散混合，Qwen-Audio 偏语义规划+扩散渲染"
        },
        {
          "vs": "IndexTTS2",
          "note": "CosyVoice 重多语种，IndexTTS2 重时长控制"
        },
        {
          "vs": "VoxCPM2",
          "note": "CosyVoice 依赖 codec，VoxCPM2 免 tokenizer"
        }
      ],
      "references": [
        {
          "title": "CosyVoice 仓库",
          "url": "https://github.com/FunAudioLLM/CosyVoice"
        }
      ],
      "caps": {
        "stream": false,
        "long": false,
        "multi": true,
        "clone": true,
        "emot": false
      }
    },
    {
      "id": "qwen3_tts",
      "name": "Qwen3-TTS",
      "org": "阿里巴巴",
      "date": "2026-04",
      "domain": "TTS",
      "framework_lines": [
        "tts_ar"
      ],
      "paper_url": "",
      "has_arxiv": false,
      "source_type": "官方",
      "license": "开源(通义)",
      "params": "大",
      "metrics": {},
      "summary": "Qwen 自回归 TTS，零样本克隆，与 Qwen 生态互通。",
      "architecture": "codec-LM 自回归生成，复用 Qwen 表征；零样本克隆。",
      "training": "codec-LM 训练 + Qwen 生态对齐；多语种。",
      "results": [
        {
          "dataset": "零样本克隆",
          "metric": "质量",
          "value": "好",
          "note": "官方发布"
        }
      ],
      "ablation": "codec 选择与 Qwen 对齐方式。",
      "limitation": "AR 生成有延迟；细粒度指标以官方为准。",
      "innovation": [
        "自回归 codec-LM",
        "零样本克隆",
        "Qwen 生态互通"
      ],
      "diff_vs": [
        {
          "vs": "CosyVoice3",
          "note": "同家族，Qwen3-TTS 偏自回归，CosyVoice 偏混合"
        },
        {
          "vs": "Fish Audio S2",
          "note": "同为 AR，Qwen3-TTS 生态更大"
        }
      ],
      "references": [
        {
          "title": "（无公开论文 PDF，以官方发布为准）",
          "url": ""
        }
      ],
      "caps": {
        "stream": false,
        "long": false,
        "multi": false,
        "clone": true,
        "emot": false
      }
    },
    {
      "id": "orpheus_tts",
      "name": "Orpheus TTS",
      "org": "社区",
      "date": "2026-03",
      "domain": "TTS",
      "framework_lines": [
        "tts_ar"
      ],
      "paper_url": "https://github.com/canopyai/Orpheus-TTS",
      "has_arxiv": false,
      "source_type": "博客",
      "license": "开源",
      "params": "中等",
      "metrics": {},
      "summary": "情绪标签驱动的类人韵律 TTS，自回归 codec-LM。",
      "architecture": "codec-LM + 情绪标签条件，强调韵律自然度。",
      "training": "情绪标签数据 + codec-LM 训练；开源。",
      "results": [
        {
          "dataset": "社区实测",
          "metric": "韵律自然度",
          "value": "好",
          "note": "社区实测"
        }
      ],
      "ablation": "情绪标签对韵律的影响。",
      "limitation": "AR 生成延迟；情绪细粒度可控有限。",
      "innovation": [
        "情绪标签驱动韵律",
        "类人自然度",
        "开源"
      ],
      "diff_vs": [
        {
          "vs": "CosyVoice3",
          "note": "Orpheus 重情绪韵律，CosyVoice 重多语种"
        },
        {
          "vs": "Fish Audio S2",
          "note": "同 AR，Orpheus 偏情绪表达"
        }
      ],
      "references": [
        {
          "title": "Orpheus-TTS 仓库",
          "url": "https://github.com/canopyai/Orpheus-TTS"
        }
      ],
      "caps": {
        "stream": false,
        "long": false,
        "multi": false,
        "clone": false,
        "emot": true
      }
    },
    {
      "id": "higgs2",
      "name": "Higgs Audio v2",
      "org": "社区/工业",
      "date": "2026-04",
      "domain": "TTS",
      "framework_lines": [
        "tts_wave"
      ],
      "paper_url": "",
      "has_arxiv": false,
      "source_type": "官方",
      "license": "开源",
      "params": "大",
      "metrics": {},
      "summary": "多说话者 + 情感，连续表征 TTS，强在角色与情绪表达。",
      "architecture": "连续表征 + 多说话者/情感条件，支持角色扮演与情绪表达。",
      "training": "多说话者 + 情感数据训练；连续表征建模。",
      "results": [
        {
          "dataset": "多角色/情感",
          "metric": "表达",
          "value": "良好",
          "note": "论文给出"
        }
      ],
      "ablation": "多说话者/情感条件对表达力的贡献。",
      "limitation": "连续表征对离散编辑不友好；规模较大。",
      "innovation": [
        "多说话者建模",
        "情感连续控制",
        "连续表征"
      ],
      "diff_vs": [
        {
          "vs": "ZONOS2",
          "note": "Higgs 重多说话者情感，ZONOS2 重 MoE 可控"
        },
        {
          "vs": "Orpheus TTS",
          "note": "同为情感，Higgs 走连续表征"
        }
      ],
      "references": [
        {
          "title": "（无公开论文 PDF，以官方发布为准）",
          "url": ""
        }
      ],
      "caps": {
        "stream": false,
        "long": false,
        "multi": false,
        "clone": false,
        "emot": true
      }
    },
    {
      "id": "whisper",
      "name": "Whisper",
      "org": "OpenAI",
      "date": "2022-09",
      "domain": "ASR",
      "role": "baseline",
      "framework_lines": [
        "asr_aed"
      ],
      "paper_url": "https://arxiv.org/abs/2212.04356",
      "has_arxiv": true,
      "source_type": "论文",
      "pdf_local": "papers/2212.04356.pdf",
      "reader_paper": "2212.04356",
      "license": "MIT(代码)/权重受限",
      "params": "Large-v3 约 1.5B",
      "metrics": {
        "wer": "Large-v3 约 2.7% (LibriSpeech clean)"
      },
      "summary": "OpenAI 的弱监督大规模多语种语音识别与翻译模型，零样本泛化能力强。",
      "architecture": "Transformer 编码器-解码器，30 秒片段 log-Mel 频谱输入，控制 token 切换任务",
      "training": "在 680,000 小时弱监督多语种音频上完全监督训练",
      "results": [
        {
          "dataset": "LibriSpeech test-clean",
          "metric": "WER",
          "value": "2.7%",
          "note": "Large-v3（后续版本；论文原 large 为 3.0%）；零样本无微调"
        },
        {
          "dataset": "LibriSpeech test-other",
          "metric": "WER",
          "value": "5.2%",
          "note": "Large-v3；噪声与多变条件下"
        }
      ],
      "ablation": "论文重点论证数据规模与弱监督的作用，未做大量结构消融",
      "limitation": "30 秒分段处理不适合实时流式；英语占比高致低资源语言较弱",
      "innovation": [
        "用 68 万小时弱监督数据实现零样本鲁棒 ASR",
        "单一 seq2seq 模型靠控制 token 统一识别/翻译/语种识别多任务",
        "开源多尺寸模型推动社区与产业落地"
      ],
      "diff_vs": [
        {
          "vs": "wav2vec 2.0",
          "note": "Whisper 端到端 seq2seq 且零样本，wav2vec 2.0 需针对每语种微调"
        },
        {
          "vs": "Google USM",
          "note": "Whisper 开源且数据量更小（68 万 vs 1200 万小时），USM 在 100+ 语言上精度更高"
        }
      ],
      "references": [
        {
          "title": "Whisper arXiv:2212.04356",
          "url": "https://arxiv.org/abs/2212.04356"
        }
      ],
      "caps": {
        "stream": false,
        "long": false,
        "multi": true,
        "clone": false,
        "emot": false
      }
    },
    {
      "id": "wav2vec2",
      "name": "Wav2Vec 2.0",
      "org": "Meta",
      "date": "2020-06",
      "domain": "ASR",
      "role": "baseline",
      "framework_lines": [
        "asr_aed"
      ],
      "paper_url": "https://arxiv.org/abs/2006.11477",
      "has_arxiv": true,
      "source_type": "论文",
      "pdf_local": "papers/2006.11477.pdf",
      "reader_paper": "2006.11477",
      "license": "MIT (fairseq/transformers 开源)",
      "params": "Base 95M / Large 317M",
      "metrics": {
        "wer": "1.8/3.3 (LibriSpeech clean/other, Large)"
      },
      "summary": "Meta 提出的自监督语音表征学习框架，用掩码对比学习从无标注音频习得表征，少量标注即可微调出强 ASR。",
      "architecture": "CNN 特征编码器 + Transformer 上下文网络 + 量化模块，掩码对比学习",
      "training": "海量无标注音频自监督预训练，再用少量标注 CTC 微调",
      "results": [
        {
          "dataset": "LibriSpeech test-clean/other",
          "metric": "WER",
          "value": "1.8/3.3",
          "note": "Large 全 960h 微调，无外部 LM"
        },
        {
          "dataset": "LibriSpeech test-clean",
          "metric": "WER",
          "value": "4.8",
          "note": "仅 10 分钟标注 + LV-60k(53k 小时) 无标注预训练"
        }
      ],
      "ablation": "连续输入 + 量化目标效果最好；增大模型与无标注数据稳定降 WER",
      "limitation": "仍需下游微调与 LM 解码，不支持零样本",
      "innovation": [
        "首次证明纯音频自监督 + 少量微调可超越半监督方法",
        "掩码对比学习在连续语音上的有效范式",
        "开启 XLSR/HuBERT/WavLM 等后续自监督浪潮"
      ],
      "diff_vs": [
        {
          "vs": "HuBERT",
          "note": "wav2vec 2.0 用在线量化对比目标，HuBERT 用离线聚类伪标签做 BERT 式预测，后者在 LS960 上略优"
        },
        {
          "vs": "Whisper",
          "note": "wav2vec 2.0 是自监督表征+微调，Whisper 是弱监督端到端零样本"
        }
      ],
      "references": [
        {
          "title": "Wav2Vec 2.0 arXiv:2006.11477",
          "url": "https://arxiv.org/abs/2006.11477"
        }
      ],
      "caps": {
        "stream": false,
        "long": false,
        "multi": false,
        "clone": false,
        "emot": false
      }
    },
    {
      "id": "hubert",
      "name": "HuBERT",
      "org": "Meta",
      "date": "2021-06",
      "domain": "ASR",
      "role": "baseline",
      "framework_lines": [
        "asr_aed"
      ],
      "paper_url": "https://arxiv.org/abs/2106.07447",
      "has_arxiv": true,
      "source_type": "论文",
      "pdf_local": "papers/2106.07447.pdf",
      "reader_paper": "2106.07447",
      "license": "MIT (fairseq 开源)",
      "params": "Base 95M / Large 317M / X-Large 1B",
      "metrics": {
        "wer": "1.9/3.3 (LibriSpeech clean/other, Large)"
      },
      "summary": "Meta 提出的隐藏单元 BERT，用离线聚类伪标签做 BERT 式掩码预测，在 LibriSpeech 上匹配或超越 wav2vec 2.0。",
      "architecture": "离线聚类伪标签 + BERT 式掩码预测，损失仅作用于掩码区域",
      "training": "LibriSpeech/Libri-Light 自监督预训练后 CTC 微调",
      "results": [
        {
          "dataset": "LibriSpeech test-clean/other",
          "metric": "WER",
          "value": "1.9/3.3",
          "note": "HuBERT Large 全 960h 微调（论文表 III）"
        },
        {
          "dataset": "LibriSpeech test-clean",
          "metric": "WER",
          "value": "4.7",
          "note": "仅 10 分钟标注数据微调"
        }
      ],
      "ablation": "聚类一致性比标签质量更重要；波形输入避免量化信息损失",
      "limitation": "需下游微调；伪标签带来系统性偏差",
      "innovation": [
        "用离线聚类伪标签把 BERT 掩码预测引入语音表征",
        "证明聚类一致性比标签质量更重要",
        "1B 模型在困难测试集上显著优于 wav2vec 2.0"
      ],
      "diff_vs": [
        {
          "vs": "wav2vec 2.0",
          "note": "目标从在线量化对比改为离线聚类伪标签的掩码预测，LS960 上 1.9/3.3 匹配或略优"
        },
        {
          "vs": "Whisper",
          "note": "同属自监督+微调路线，但 HuBERT 不零样本、专注表征"
        }
      ],
      "references": [
        {
          "title": "HuBERT arXiv:2106.07447",
          "url": "https://arxiv.org/abs/2106.07447"
        }
      ],
      "caps": {
        "stream": false,
        "long": false,
        "multi": false,
        "clone": false,
        "emot": false
      }
    },
    {
      "id": "google_usm",
      "name": "Google USM",
      "org": "Google",
      "date": "2023-03",
      "domain": "ASR",
      "framework_lines": [
        "asr_aed"
      ],
      "paper_url": "https://arxiv.org/abs/2303.01037",
      "has_arxiv": true,
      "source_type": "论文",
      "pdf_local": "papers/2303.01037.pdf",
      "reader_paper": "2303.01037",
      "license": "闭源（Google Cloud Chirp 提供）",
      "params": "约 2B（旗舰）",
      "metrics": {
        "wer": "2.0/4.1 (LibriSpeech clean/other)"
      },
      "summary": "Google 的通用语音模型，用 BEST-RQ 在 1200 万小时、300+ 语言音频上自监督预训练，单一模型支持 100+ 语言 ASR 与翻译。",
      "architecture": "32 层 Conformer 编码器 + CTC/LAS/RNN-T 解码头，约 2B",
      "training": "BEST-RQ 在 1200 万小时、300+ 语言音频自监督，再文本预训练与微调",
      "results": [
        {
          "dataset": "LibriSpeech test-clean/other",
          "metric": "WER",
          "value": "2.0/4.1",
          "note": "CodeSOTA 收录论文数字"
        },
        {
          "dataset": "YouTube Caption (73 语言)",
          "metric": "WER",
          "value": "<30%",
          "note": "平均 WER 首次低于 30%，覆盖 73 语言"
        },
        {
          "dataset": "FLEURS (62 语言重叠 Whisper)",
          "metric": "相对 WER 降低",
          "value": "65.8%",
          "note": "无领域内数据；含领域内数据为 67.8%"
        }
      ],
      "ablation": "BEST-RQ 超大规模可扩展；文本预训练可选增益；标注效率高于 Whisper",
      "limitation": "闭源仅云服务；千万小时预训练算力极高",
      "innovation": [
        "BEST-RQ 自监督在千万小时级多语种音频上的规模化",
        "单一模型覆盖 100+ 语言 ASR 与翻译",
        "文本预训练可选增强语音模型"
      ],
      "diff_vs": [
        {
          "vs": "Whisper",
          "note": "USM 预训练数据 1200 万小时且覆盖 300+ 语言，FLEURS 上相对 WER 降低约 65%（无领域内数据）"
        },
        {
          "vs": "wav2vec 2.0",
          "note": "USM 规模与语种覆盖远超 wav2vec 2.0，且为生产级多语种系统"
        }
      ],
      "references": [
        {
          "title": "Google USM arXiv:2303.01037",
          "url": "https://arxiv.org/abs/2303.01037"
        }
      ],
      "caps": {
        "stream": false,
        "long": false,
        "multi": false,
        "clone": false,
        "emot": false
      }
    },
    {
      "id": "meta_mms",
      "name": "MMS (Massively Multilingual Speech)",
      "org": "Meta",
      "date": "2023-05",
      "domain": "ASR",
      "framework_lines": [
        "asr_aed"
      ],
      "paper_url": "https://arxiv.org/abs/2305.13516",
      "has_arxiv": true,
      "source_type": "论文",
      "pdf_local": "papers/2305.13516.pdf",
      "reader_paper": "2305.13516",
      "license": "CC-BY-NC 4.0（非商业）",
      "params": "约 1B (wav2vec 2.0)",
      "metrics": {
        "wer": "FLEURS 上约为 Whisper 一半"
      },
      "summary": "Meta 的大规模多语种语音项目，基于 wav2vec 2.0 把 ASR 扩展到 1107 种语言、TTS 与语种识别覆盖超过 4000 种语言。",
      "architecture": "wav2vec 2.0 自监督 + 语种适配器，CTC 微调支持 1162 语言",
      "training": "约 50 万小时、1406 语言自监督；宗教文本朗读提供 1100+ 语言标注",
      "results": [
        {
          "dataset": "FLEURS-54 (平均 WER)",
          "metric": "WER",
          "value": "约 Whisper 一半",
          "note": "论文对比：MMS 平均 WER 约为 Whisper 的一半"
        },
        {
          "dataset": "语种扩展 61→1107",
          "metric": "CER 增量",
          "value": "+0.4%",
          "note": "覆盖扩大 18 倍而 CER 仅升约 0.4%"
        }
      ],
      "ablation": "61→1107 语言 CER 仅升 0.4%；FLEURS 上 WER 约为 Whisper 一半",
      "limitation": "宗教文本域偏置；CC-BY-NC 非商业许可",
      "innovation": [
        "把自监督语音模型扩展到 1406 语言预训练、1107 语言 ASR",
        "用语种适配器在单一模型内切换千余种语言",
        "证明海量语种扩展下精度几乎不退化"
      ],
      "diff_vs": [
        {
          "vs": "wav2vec 2.0",
          "note": "同一架构但把语种从几十扩展到上千，并加入适配器与 TTS/LID"
        },
        {
          "vs": "Whisper",
          "note": "MMS 专注低资源多语种且非商业，FLEURS 上 WER 约为 Whisper 一半"
        }
      ],
      "references": [
        {
          "title": "MMS arXiv:2305.13516",
          "url": "https://arxiv.org/abs/2305.13516"
        }
      ],
      "caps": {
        "stream": false,
        "long": false,
        "multi": true,
        "clone": false,
        "emot": false
      }
    },
    {
      "id": "qwen2_audio",
      "name": "Qwen2-Audio",
      "org": "Alibaba",
      "date": "2024-07",
      "domain": "ASR",
      "framework_lines": [
        "asr_llm"
      ],
      "paper_url": "https://arxiv.org/abs/2407.10759",
      "has_arxiv": true,
      "source_type": "论文",
      "pdf_local": "papers/2407.10759.pdf",
      "reader_paper": "2407.10759",
      "license": "Apache 2.0 / Qwen 许可",
      "params": "约 7B (Qwen2-7B 骨干)",
      "metrics": {
        "wer": "见论文（多基准 SOTA）"
      },
      "summary": "阿里通义千问的音频-语言模型，以 Qwen2 为骨干统一处理语音识别、翻译、音频理解与问答等多任务。",
      "architecture": "音频编码器 + Qwen2-7B 语言模型，指令统一多任务",
      "training": "音频-文本对齐预训练 + 多任务监督微调",
      "results": [
        {
          "dataset": "LibriSpeech / FLEURS 等",
          "metric": "WER/BLEU",
          "value": "论文 SOTA（见论文表）",
          "note": "在多项音频-语言基准优于先前音频大模型；精确数字见原论文"
        }
      ],
      "ablation": "音频编码器质量决定下限；指令微调提升跨任务泛化",
      "limitation": "自回归延迟高，非流式；复杂声学场景弱于专用 ASR",
      "innovation": [
        "以 Qwen2 LLM 骨干统一音频理解与生成多任务",
        "指令式提示让单一模型覆盖 ASR/翻译/音频问答",
        "开放权重推动中文社区音频大模型研究"
      ],
      "diff_vs": [
        {
          "vs": "Whisper",
          "note": "Qwen2-Audio 是音频-语言模型，除 ASR 外还能做音频问答与理解，Whisper 仅做识别/翻译"
        },
        {
          "vs": "Mini-Omni",
          "note": "Qwen2-Audio 以文本为输出、非实时；Mini-Omni 端到端语音到语音且实时"
        }
      ],
      "references": [
        {
          "title": "Qwen2-Audio arXiv:2407.10759",
          "url": "https://arxiv.org/abs/2407.10759"
        }
      ],
      "caps": {
        "stream": false,
        "long": false,
        "multi": false,
        "clone": false,
        "emot": false
      }
    },
    {
      "id": "mini_omni",
      "name": "Mini-Omni",
      "org": "gpt-omni",
      "date": "2024-08",
      "domain": "ASR",
      "framework_lines": [
        "asr_llm"
      ],
      "paper_url": "https://arxiv.org/abs/2408.16725",
      "has_arxiv": true,
      "source_type": "论文",
      "pdf_local": "papers/2408.16725.pdf",
      "reader_paper": "2408.16725",
      "license": "Apache 2.0",
      "params": "0.5B (Qwen2-0.5B)",
      "metrics": {
        "wer": "4.5% (LibriSpeech clean)"
      },
      "summary": "首个开源的端到端实时语音对话模型，文本与语音 token 并行生成，仅 0.5B 参数即可实时交互。",
      "architecture": "Whisper-small 编码 + Qwen2-0.5B + SNAC 多码本语音解码，文本/语音并行生成",
      "training": "三阶段：模态对齐、LM 适配、多模态微调（Any Model Can Talk）",
      "results": [
        {
          "dataset": "LibriSpeech test-clean",
          "metric": "WER",
          "value": "4.5%",
          "note": "Mini-Omni（0.5B）；Whisper-small 为 3.4%"
        },
        {
          "dataset": "LibriSpeech test-other",
          "metric": "WER",
          "value": "9.7%",
          "note": "Whisper-small 为 7.6%"
        }
      ],
      "ablation": "文本-语音并行解码与批并行解码可借文本推理增强语音质量",
      "limitation": "纯语音推理弱于专用 ASR；语音自然度不及专业 TTS",
      "innovation": [
        "首个开源端到端实时语音到语音对话模型",
        "文本与语音 token 并行生成消除级联延迟",
        "三阶段训练使任意 LLM 快速获得语音能力"
      ],
      "diff_vs": [
        {
          "vs": "Whisper",
          "note": "Mini-Omni 端到端语音到语音且实时，Whisper 仅做识别、需外接 TTS"
        },
        {
          "vs": "Qwen2-Audio",
          "note": "Mini-Omni 端到端语音输出且实时，Qwen2-Audio 以文本输出、非实时"
        }
      ],
      "references": [
        {
          "title": "Mini-Omni arXiv:2408.16725",
          "url": "https://arxiv.org/abs/2408.16725"
        }
      ],
      "caps": {
        "stream": true,
        "long": false,
        "multi": false,
        "clone": false,
        "emot": false
      }
    },
    {
      "id": "seamless_m4t",
      "name": "SeamlessM4T",
      "org": "Meta",
      "date": "2023-02",
      "domain": "ASR",
      "framework_lines": [
        "asr_llm"
      ],
      "paper_url": "https://arxiv.org/abs/2308.11596",
      "has_arxiv": true,
      "source_type": "论文",
      "pdf_local": "papers/2308.11596.pdf",
      "reader_paper": "2308.11596",
      "license": "CC-BY-NC 4.0（非商业）",
      "params": "约 1.2B",
      "metrics": {
        "wer": "见论文（约 100 语言）"
      },
      "summary": "Meta 的大规模多语种多模态翻译模型，单一模型支持语音/文本到语音/文本翻译，覆盖约 100 种语言。",
      "architecture": "统一多模态模型，w2v-BERT 语音编码 + NLLB 文本初始化，支持到文本/语音",
      "training": "多语种语音-文本平行数据联合训练识别/翻译/语音生成",
      "results": [
        {
          "dataset": "多语种 ASR/翻译基准",
          "metric": "WER/BLEU",
          "value": "覆盖约 100 语言（见论文）",
          "note": "支持约 100 语言语音/文本翻译、约 35 语言语音到语音；精确指标见原论文"
        }
      ],
      "ablation": "统一模型减少级联错误累积；单位化语音表征提升一致性",
      "limitation": "CC-BY-NC 非商业；仅约 35 语言支持语音到语音",
      "innovation": [
        "单一模型统一语音/文本到语音/文本的多模态多语种翻译",
        "基于 w2v-BERT 与单位化语音表征实现跨模态一致",
        "推动语音到语音同声翻译研究（后续 SeamlessStreaming）"
      ],
      "diff_vs": [
        {
          "vs": "Whisper",
          "note": "SeamlessM4T 聚焦翻译（含语音到语音）且覆盖约 100 语言，Whisper 以识别/英译为主"
        },
        {
          "vs": "MMS",
          "note": "MMS 专注 ASR/TTS/语种识别千余语言，SeamlessM4T 专注百语言翻译且含语音到语音"
        }
      ],
      "references": [
        {
          "title": "SeamlessM4T arXiv:2308.11596",
          "url": "https://arxiv.org/abs/2308.11596"
        }
      ],
      "caps": {
        "stream": false,
        "long": false,
        "multi": true,
        "clone": false,
        "emot": false
      }
    },
    {
      "id": "valle",
      "name": "VALL-E",
      "org": "Microsoft",
      "date": "2023-01",
      "domain": "TTS",
      "framework_lines": [
        "tts_ar"
      ],
      "paper_url": "https://arxiv.org/abs/2301.02111",
      "has_arxiv": true,
      "source_type": "论文",
      "pdf_local": "papers/2301.02111.pdf",
      "reader_paper": "2301.02111",
      "license": "研究用途",
      "params": "~1.4B(含 LLM)",
      "metrics": {},
      "summary": "将 TTS 建模为神经编解码器语言模型，仅凭 3 秒语音提示即可实现零样本音色克隆。",
      "architecture": "VALL-E 是一个神经编解码器语言模型，把 TTS 视为条件语言建模任务。它采用两阶段生成：先用自回归（AR）Transformer 基于音素提示与 3 秒声学提示生成 EnCodec 的粗粒度音频 token，再用非自回归（NAR）Transformer 补全细粒度 token，最后由神经编解码器解码器合成波形。",
      "training": "在 LibriLight 数据集约 6 万小时英语语音、7000 多名说话人上训练，规模远超传统 TTS 语料。训练目标是对离散音频 codec token 做 next-token 预测，模型学到大规模说话人分布后可在推理时仅凭简短提示做上下文学习。",
      "results": [
        {
          "dataset": "LibriSpeech",
          "metric": "WER",
          "value": "5.9%",
          "note": "零样本 TTS，优于 YourTTS 的 7.7%"
        },
        {
          "dataset": "LibriSpeech",
          "metric": "说话人相似度 SIM",
          "value": "0.580",
          "note": "零样本克隆，论文口径"
        }
      ],
      "ablation": "论文主要说明 AR 与 NAR 两阶段对音质与稳定性的作用，并展示随机种子带来的多样性变化；由于未开源权重，社区复现主要通过 Amphion 等开源项目近似实现。",
      "limitation": "未公开模型权重，仅限研究用途，存在声音伪造与冒用风险；长文本生成与韵律可控性仍有提升空间。",
      "innovation": [
        "首次将神经编解码器语言建模范式引入零样本 TTS",
        "AR+NAR 两阶段生成离散音频 token",
        "3 秒提示即可克隆未见说话人音色/情感/声学环境"
      ],
      "diff_vs": [
        {
          "vs": "传统 mel+声码器 TTS",
          "note": "以离散 codec token 替代 mel 谱，走向语言模型范式"
        },
        {
          "vs": "YourTTS",
          "note": "零样本 WER 5.9% 优于其 7.7%"
        }
      ],
      "references": [
        {
          "title": "VALL-E arXiv:2301.02111",
          "url": "https://arxiv.org/abs/2301.02111"
        }
      ],
      "caps": {
        "stream": false,
        "long": false,
        "multi": false,
        "clone": true,
        "emot": false
      }
    },
    {
      "id": "voicebox",
      "name": "Voicebox",
      "org": "Meta",
      "date": "2023-06",
      "domain": "TTS",
      "framework_lines": [
        "tts_wave"
      ],
      "paper_url": "https://arxiv.org/abs/2306.15687",
      "has_arxiv": true,
      "source_type": "论文",
      "pdf_local": "papers/2306.15687.pdf",
      "reader_paper": "2306.15687",
      "license": "研究用途（权重未公开）",
      "params": "~330M(语音骨干)",
      "metrics": {},
      "summary": "基于条件流匹配（flow matching）的语音修复式生成模型，通过上下文学习统一多种语音任务。",
      "architecture": "Voicebox 是一个非自回归的流匹配生成模型，以 80 维 log-mel 谱图（100Hz）为生成目标，骨干为 24 层 Transformer。它不从左向右逐帧生成，而是给定部分音频上下文与对应文本，训练模型对掩蔽区域做语音填充（infilling）。",
      "training": "在英语约 6 万小时有声书与跨 6 种语言约 5 万小时未过滤/未增强语音上训练，采用条件流匹配目标。推理时可通过前置与后置上下文做上下文学习，无需任务专用微调。",
      "results": [
        {
          "dataset": "LibriSpeech（零样本 TTS）",
          "metric": "WER",
          "value": "1.9%",
          "note": "对比 VALL-E 的 5.9%"
        },
        {
          "dataset": "LibriSpeech（零样本 TTS）",
          "metric": "说话人相似度 SIM",
          "value": "0.681",
          "note": "对比 VALL-E 的 0.580"
        },
        {
          "dataset": "推理速度",
          "metric": "相对 VALL-E",
          "value": "最高 20x 更快",
          "note": "论文口径"
        }
      ],
      "ablation": "论文对比了不同上下文（前/后向）与掩蔽策略对零样本 TTS、跨语言合成、去噪、编辑等任务的影响，验证了填充式训练带来的任务通用性。",
      "limitation": "模型权重未公开发布（出于滥用风险考量）；需要参考音频做提示，且依赖 log-mel 表征而非离散 codec token。",
      "innovation": [
        "将流匹配作为语音生成目标并大规模缩放",
        "填充式训练实现单模型多任务上下文学习",
        "可同时利用前后向上下文，比 AR 模型快约 20 倍"
      ],
      "diff_vs": [
        {
          "vs": "VALL-E",
          "note": "非自回归流匹配，WER 1.9% 显著优于 5.9%"
        },
        {
          "vs": "传统单任务 TTS",
          "note": "一个模型覆盖 TTS/编辑/去噪/风格转换"
        }
      ],
      "references": [
        {
          "title": "Voicebox arXiv:2306.15687",
          "url": "https://arxiv.org/abs/2306.15687"
        }
      ],
      "caps": {
        "stream": false,
        "long": false,
        "multi": false,
        "clone": false,
        "emot": false
      }
    },
    {
      "id": "natural_speech3",
      "name": "NaturalSpeech 3",
      "org": "Microsoft",
      "date": "2024-03",
      "domain": "TTS",
      "framework_lines": [
        "tts_wave"
      ],
      "paper_url": "https://arxiv.org/abs/2403.03100",
      "has_arxiv": true,
      "source_type": "论文",
      "pdf_local": "papers/2403.03100.pdf",
      "reader_paper": "2403.03100",
      "license": "研究用途（FACodec 已开源）",
      "params": "~1B",
      "metrics": {},
      "summary": "用属性分解编解码器 FACodec 与分解扩散模型，将语音按属性子空间分别生成，实现超自然零样本 TTS。",
      "architecture": "NaturalSpeech 3 包含两个核心：FACodec 用分解向量量化（FVQ）把波形解耦为内容、韵律、音色、声学细节四个子空间并重构波形；分解扩散模型则针对音素时长、内容、韵律、声学细节各自用对应提示生成，音色直接从提示提取，无需单独建模。",
      "training": "通过数据/模型缩放，将模型扩展到约 1B 参数、训练数据扩展到约 20 万小时。FACodec 借助信息瓶颈、监督损失与对抗训练增强解耦；扩散模型以各属性提示条件化训练。",
      "results": [
        {
          "dataset": "LibriSpeech",
          "metric": "CMOS",
          "value": "与真值相当或更优",
          "note": "多说话人上首次达到人类水平自然度"
        },
        {
          "dataset": "LibriSpeech",
          "metric": "说话人相似度 Sim-O",
          "value": "0.67（由 0.64 提升）",
          "note": "论文口径"
        },
        {
          "dataset": "LibriSpeech",
          "metric": "WER",
          "value": "1.81（由 1.94 降低）",
          "note": "论文明示的可懂度提升"
        }
      ],
      "ablation": "论文验证了 FACodec 解耦对零样本音质/相似度/稳定性的增益，并展示把 FACodec 接入自回归 VALL-E 也能显著提升；同时给出数据量与模型规模 scaling 曲线。",
      "limitation": "训练数据规模与算力需求大；仍需提示音频，极致情感和口音的细粒度控制依赖提示覆盖度。",
      "innovation": [
        "提出 FACodec 将语音按属性解耦为子空间",
        "分解扩散模型分属性生成、提升可控性",
        "首次在多说话人 LibriSpeech 上达到人类水平自然度",
        "1B 参数 + 20 万小时的数据/模型缩放"
      ],
      "diff_vs": [
        {
          "vs": "VALL-E / 离散 codec TTS",
          "note": "用连续 RVQ 之外的属性分解表征，降低建模复杂度"
        },
        {
          "vs": "NaturalSpeech 2",
          "note": "引入 FACodec 与分解扩散，零样本能力更强"
        }
      ],
      "references": [
        {
          "title": "NaturalSpeech 3 arXiv:2403.03100",
          "url": "https://arxiv.org/abs/2403.03100"
        }
      ],
      "caps": {
        "stream": false,
        "long": false,
        "multi": false,
        "clone": true,
        "emot": true
      }
    },
    {
      "id": "audiobox",
      "name": "Audiobox",
      "org": "Meta",
      "date": "2023-12",
      "domain": "TTS",
      "framework_lines": [
        "tts_wave"
      ],
      "paper_url": "https://arxiv.org/abs/2312.15821",
      "has_arxiv": true,
      "source_type": "论文",
      "pdf_local": "papers/2312.15821.pdf",
      "reader_paper": "2312.15821",
      "license": "研究用途",
      "params": "未公开（统一音频生成模型）",
      "metrics": {},
      "summary": "基于流匹配的统一音频生成模型，用自然语言描述与示例双重提示统一语音与音效生成。",
      "architecture": "Audiobox 沿用 Voicebox 的流匹配生成框架，但预测自编码器（稠密 EnCodec 特征，量化前）的潜表示而非离散 token。它支持描述式提示（自然语言文本）与示例式提示（音频/语音样本），并可独立控制文本、声线与其它音频风格。",
      "training": "分阶段训练：约 18.5 万小时无标签音频上做自监督掩蔽填充预训练；约 10 万小时转写语音做文本/声线提示语音生成；约 6 千小时音效数据做文生音效；再用语音字幕（含人工标注与 LLM 生成）联合训练统一模型。",
      "results": [
        {
          "dataset": "LibriSpeech（零样本 TTS）",
          "metric": "说话人相似度",
          "value": "0.745",
          "note": "论文设定基准"
        },
        {
          "dataset": "AudioCaps（文生音效）",
          "metric": "FAD",
          "value": "0.77",
          "note": "文本到音效生成基准"
        },
        {
          "dataset": "推理加速",
          "metric": "Bespoke Solvers",
          "value": ">25x 快于默认 ODE 求解器",
          "note": "无性能损失"
        }
      ],
      "ablation": "论文对比了描述式 vs 示例式提示、SSL 预训练的作用，并提出 Joint-CLAP 评测模型以区分口音/情感等细粒度风格；验证 Bespoke Solvers 在不损失质量下大幅加速。",
      "limitation": "统一多模态标注成本高；细粒度风格控制依赖描述质量；权重以研究用途发布，未完全开放。",
      "innovation": [
        "用自然语言描述 + 音频示例双重提示统一语音与音效",
        "自监督填充目标预训练提升标签稀缺下的泛化",
        "Bespoke Solvers 将流匹配采样加速 25 倍以上",
        "Joint-CLAP 细粒度音频-文本评测"
      ],
      "diff_vs": [
        {
          "vs": "Voicebox",
          "note": "从纯语音扩展到语音+音效统一生成，并加入自然语言控制"
        },
        {
          "vs": "单一模态生成模型",
          "note": "一个模型覆盖 TTS、声音风格化、文生音效"
        }
      ],
      "references": [
        {
          "title": "Audiobox arXiv:2312.15821",
          "url": "https://arxiv.org/abs/2312.15821"
        }
      ],
      "caps": {
        "stream": false,
        "long": false,
        "multi": false,
        "clone": false,
        "emot": false
      }
    },
    {
      "id": "e2_tts",
      "name": "E2-TTS",
      "org": "Microsoft",
      "date": "2024-06",
      "domain": "TTS",
      "framework_lines": [
        "tts_nar"
      ],
      "paper_url": "https://arxiv.org/abs/2406.18009",
      "has_arxiv": true,
      "source_type": "论文",
      "pdf_local": "papers/2406.18009.pdf",
      "reader_paper": "2406.18009",
      "license": "CC BY-SA 4.0（论文）",
      "params": "未公开",
      "metrics": {},
      "summary": "极简的全非自回归零样本 TTS，仅靠填充式流匹配从字符序列生成语音，无需时长/对齐模块。",
      "architecture": "E2-TTS 把文本转为带填充 token 的字符序列，用基于流匹配的 mel 谱图生成器在音频填充任务上训练。整体为全非自回归结构，无需时长模型、G2P 或单调对齐搜索。",
      "training": "以音频填充（audio infilling）为训练目标，在带噪语音与文本条件下预测完整 mel 谱图；推理时通过指定长度并行生成。论文还提出若干推理期变体提升易用性。",
      "results": [
        {
          "dataset": "LibriSpeech",
          "metric": "零样本 TTS",
          "value": "达到/超越 Voicebox 与 NaturalSpeech 3",
          "note": "论文口径，具体 WER/SIM 以原论文为准"
        }
      ],
      "ablation": "论文重点说明去除时长模型、G2P、单调对齐等复杂组件后仍可达 SOTA，并给出不同输入表示与推理变体的对比。",
      "limitation": "原始设计存在收敛慢、鲁棒性不足的问题，后续 F5-TTS 等在此基础上改进；对输入文本表示敏感。",
      "innovation": [
        "极简全非自回归流程，去除时长与对齐模块",
        "字符+填充 token 表示即可驱动流匹配生成",
        "证明无复杂组件也能达 SOTA 零样本 TTS"
      ],
      "diff_vs": [
        {
          "vs": "VALL-E",
          "note": "非自回归且无需 codec 自回归解码"
        },
        {
          "vs": "Voicebox",
          "note": "以字符填充替代 mel 填充，进一步简化输入"
        }
      ],
      "references": [
        {
          "title": "E2-TTS arXiv:2406.18009",
          "url": "https://arxiv.org/abs/2406.18009"
        }
      ],
      "caps": {
        "stream": false,
        "long": false,
        "multi": false,
        "clone": true,
        "emot": false
      }
    },
    {
      "id": "f5_tts",
      "name": "F5-TTS",
      "org": "上海交大 / 剑桥等",
      "date": "2024-10",
      "domain": "TTS",
      "framework_lines": [
        "tts_nar"
      ],
      "paper_url": "https://arxiv.org/abs/2410.06885",
      "has_arxiv": true,
      "source_type": "论文",
      "pdf_local": "papers/2410.06885.pdf",
      "reader_paper": "2410.06885",
      "license": "开源（CC BY 4.0，代码与权重已发布）",
      "params": "未公开",
      "metrics": {},
      "summary": "基于流匹配与 Diffusion Transformer 的全非自回归 TTS，用 ConvNeXt 细化文本并引入 Sway Sampling。",
      "architecture": "F5-TTS 以流匹配 + Diffusion Transformer（DiT）为骨干，无需时长模型、文本编码器或音素对齐。文本经 ConvNeXt V2 模块细化表示后，与填充 token 拼到与语音等长，再由 DiT 去噪生成语音。",
      "training": "在公开约 10 万小时多语言数据集（如 Emilia）上训练；推理期提出 Sway Sampling 策略调整流步骤采样权重，显著提升自然度与可懂度且无需重训。",
      "results": [
        {
          "dataset": "LibriSpeech-PC",
          "metric": "WER",
          "value": "2.42（32 NFE）",
          "note": "论文报告值"
        },
        {
          "dataset": "推理",
          "metric": "RTF",
          "value": "0.15",
          "note": "相较扩散类 SOTA TTS 大幅提升"
        }
      ],
      "ablation": "论文对比了有无 ConvNeXt 文本细化、不同填充策略以及 Sway Sampling 开/关，证明 ConvNeXt 改善对齐、Sway Sampling 提升质量与效率。",
      "limitation": "仍依赖参考音频做上下文学习；训练收敛与鲁棒性虽优于 E2-TTS 但仍需足量数据与调参。",
      "innovation": [
        "ConvNeXt 细化文本表示改善与语音对齐",
        "Sway Sampling 推理策略免重训即提升性能",
        "DiT + 流匹配全非自回归且完全开源"
      ],
      "diff_vs": [
        {
          "vs": "E2-TTS",
          "note": "用 ConvNeXt 与 Sway Sampling 解决其收敛慢/鲁棒性差"
        },
        {
          "vs": "扩散类 TTS",
          "note": "RTF 0.15，推理更快"
        }
      ],
      "references": [
        {
          "title": "F5-TTS arXiv:2410.06885",
          "url": "https://arxiv.org/abs/2410.06885"
        }
      ],
      "caps": {
        "stream": false,
        "long": false,
        "multi": false,
        "clone": false,
        "emot": false
      }
    },
    {
      "id": "maskgct",
      "name": "MaskGCT",
      "org": "港中文（深圳）等",
      "date": "2024-09",
      "domain": "TTS",
      "framework_lines": [
        "tts_nar"
      ],
      "paper_url": "https://arxiv.org/abs/2409.00750",
      "has_arxiv": true,
      "source_type": "论文",
      "pdf_local": "papers/2409.00750.pdf",
      "reader_paper": "2409.00750",
      "license": "开源（代码与权重已发布，ICLR 2025）",
      "params": "未公开",
      "metrics": {},
      "summary": "全非自回归的掩码生成编解码 Transformer，无需文本-语音显式对齐与时长预测即可零样本 TTS。",
      "architecture": "MaskGCT 为两阶段全非自回归模型：文本到语义（T2S）用文本预测自监督语音模型提取的语义 token；语义到声学（S2A）基于语义 token 预测声学 token；最后由声学编解码器重建波形。采用 mask-and-predict 范式。",
      "training": "在约 10 万小时真实场景（in-the-wild）多语言语音上训练；训练时学习在给定条件与提示下预测被掩蔽的语义/声学 token，推理时按指定长度并行生成。",
      "results": [
        {
          "dataset": "零样本 TTS 基准",
          "metric": "质量/相似度/可懂度",
          "value": "优于现有 SOTA 零样本 TTS",
          "note": "论文口径，具体数值以原论文为准"
        }
      ],
      "ablation": "论文验证了去除显式对齐与音素级时长预测后，mask-and-predict 仍能取得更优自然度，并对比 T2S/S2A 各模块配置。",
      "limitation": "依赖 SSL 语义 token 与声学编解码器质量；并行生成长度需指定，极端韵律控制受限。",
      "innovation": [
        "全非自回归且无需文本-语音显式对齐",
        "mask-and-predict 范式引入语音生成",
        "两阶段 T2S+S2A 解耦语义与声学",
        "10 万小时 in-the-wild 数据缩放"
      ],
      "diff_vs": [
        {
          "vs": "自回归 TTS（VALL-E）",
          "note": "无 AR 解码，鲁棒性更好且有长度可控性"
        },
        {
          "vs": "需时长预测的非自回归 TTS",
          "note": "去除音素级时长预测，自然度更高"
        }
      ],
      "references": [
        {
          "title": "MaskGCT arXiv:2409.00750",
          "url": "https://arxiv.org/abs/2409.00750"
        }
      ],
      "caps": {
        "stream": false,
        "long": false,
        "multi": false,
        "clone": true,
        "emot": false
      }
    },
    {
      "id": "seed_tts",
      "name": "Seed-TTS",
      "org": "ByteDance",
      "date": "2024-06",
      "domain": "TTS",
      "framework_lines": [
        "tts_ar"
      ],
      "paper_url": "https://arxiv.org/abs/2406.02430",
      "has_arxiv": true,
      "source_type": "论文",
      "pdf_local": "papers/2406.02430.pdf",
      "reader_paper": "2406.02430",
      "license": "技术报告（权重未公开）",
      "params": "未公开（大规模自回归基础模型）",
      "metrics": {},
      "summary": "字节跳动的大规模自回归 TTS 模型家族，零样本上下文学习在自然度与相似度上匹配真人语音。",
      "architecture": "Seed-TTS 采用混合架构：语音 tokenizer 将参考语音转为 token，自回归 token 语言模型基于文本与语音 token 生成，token 扩散（DiT）以由粗到细方式生成连续语音表征，最后由声学声码器重建波形；并给出全扩散的非自回归变体 Seed-TTSDiT。",
      "training": "分大规模预训练、说话人与指令微调、以及基于强化学习（RL）的后训练优化三阶段；提出自蒸馏式语音因子分解以实现音色解耦，RL 提升鲁棒性、相似度与可控性。",
      "results": [
        {
          "dataset": "LibriSpeech（EN，零样本 ICL）",
          "metric": "WER / SIM",
          "value": "2.249 / 0.762",
          "note": "论文报告"
        },
        {
          "dataset": "中文（ZH，零样本 ICL）",
          "metric": "WER / SIM",
          "value": "1.115 / 0.796",
          "note": "论文报告"
        },
        {
          "dataset": "Seed-TTSDiT（EN）",
          "metric": "WER / SIM",
          "value": "1.733 / 0.790",
          "note": "全扩散 NAR 变体，论文报告"
        }
      ],
      "ablation": "论文对比了自回归主模型与 Seed-TTSDiT 在客观/主观评测上的表现，并验证自蒸馏语音因子分解与 RL 后训练对相似度、鲁棒性、可控性的提升。",
      "limitation": "作为技术报告未公开完整训练细节与权重；零样本对 15 秒提示覆盖度的依赖较强，困难说话人上仍不及 5 小时微调的传统系统。",
      "innovation": [
        "语音 tokenizer + AR LM + token 扩散 + 声码器的混合基础架构",
        "零样本上下文学习匹配真人语音",
        "自蒸馏语音因子分解实现音色解耦",
        "RL 后训练提升鲁棒性与可控性"
      ],
      "diff_vs": [
        {
          "vs": "VALL-E",
          "note": "引入 token 扩散与声码器细化，质量更接近真人"
        },
        {
          "vs": "传统微调 TTS",
          "note": "零样本 ICL 在常见说话人上与之相当"
        }
      ],
      "references": [
        {
          "title": "Seed-TTS arXiv:2406.02430",
          "url": "https://arxiv.org/abs/2406.02430"
        }
      ],
      "caps": {
        "stream": false,
        "long": false,
        "multi": false,
        "clone": true,
        "emot": false
      }
    }
  ]
};
globalThis.DEEP = {
  "cohere_transcribe": {
    "architecture": "## 设计动机\nCohere 的首个音频模型（cohere-transcribe-03-2026），目标是在 HF Open ASR Leaderboard 上做到专用 ASR 精度第一，同时保持可自托管的生产就绪性。其关键判断是：多数语音模型把容量压在解码端，而 ASR 的瓶颈其实在声学理解，因此把 90% 以上参数放到编码器。\n\n## 整体流水线\n输入波形 → 重采样 16kHz 单声道 → log-Mel 频谱图 → Fast-Conformer 编码器（承担 90%+ 的 2B 参数）→ 轻量 Transformer 解码器（cross-attention 输出 token）。长音频（>35s）自动分块再拼接。\n\n## 关键模块\n- 编码器：Fast-Conformer，非标准 Conformer，强调推理时计算可并行化；约 2B 总参中编码器占绝大多数。\n- 解码器：轻量 Transformer，仅做 token 生成，串行计算被压到最小。\n- 分词：16,000-token 多语 BPE（带 byte fallback），从分布内数据自行训练，而非复用通用 LLM tokenizer。\n- 训练目标：标准监督交叉熵，从零训起，不蒸馏、不微调自 Whisper 等基线。\n\n## 与 SOTA 的本质区别\n与 Qwen3-ASR-1.7B、IBM Granite 等“挂接预训练文本 LLM”的路线相反，Cohere 用专用 encoder-heavy 结构换取更低解码延迟与更高吞吐，放弃 LLM 带来的语言理解/指令能力。",
    "training": "## 数据规模与混合\n在 500,000 小时人工标注音频-文本对上从零训练（非弱监督海量爬取式），针对企业常用语种精选 14 种：英、法、德、意、西、葡、希、荷、波、中（普通话）、日、韩、越、阿。\n\n## 课程/阶段与鲁棒性\n- 背景噪声增强：SNR 0–30 dB 的非语音噪声注入，提升抗噪鲁棒性。\n- 合成数据补洞：在错误分析轮次后，针对具体失败模式补充合成样本做定向修补。\n- 长音频原生支持：用 packed representation 减少批处理 padding 开销。\n\n## 训练目标\n标准 supervised cross-entropy on output tokens；无 RLHF / 对齐阶段（纯识别任务）。\n\n## known_results 数字解读\nHF Open ASR Leaderboard 平均 WER 5.42%（8 个英文测试集均值），是开放榜第一。该数字由 AMI(8.13%)、Earnings22(10.86%)、GigaSpeech(9.34%)、LibriSpeech Clean(1.25%)、LibriSpeech Other(2.37%)、SPGISpeech(3.08%)、TED-LIUM(2.49%)、VoxPopuli(5.87%) 聚合得到——干净朗读接近 1%，但会议/电话等真实场景退化到 8–11%，说明 5.42% 是“均值被难集拉高”的代表值，并非处处低错。",
    "ablation": "## 吞吐与延迟消融\n- 离线吞吐：宣称比同规模专用 ASR 高约 3x；RTFx 最高可达 524x（高端硬件），因解码器极轻。\n- vLLM 集成提供额外约 2x 吞吐（批处理优化）。\n- 人类偏好评测：平均胜率 61%；对 Whisper Large v3 胜率 64%、对 NVIDIA Canary 67%、对 IBM Granite 4.0 1B 高达 78%，说明原始 WER 接近时主观质量差距更大。\n\n## 多语结果\n多语榜整体第 4、开源第 2；日语偏好 70%、意语 60%。\n\n## 关键发现\n精度-速度帕累托前沿上，encoder-heavy 设计以“解码端精度微损”换“显著推理加速”，是其核心卖点；但论文未给出独立结构消融（如去掉噪声增强的增益），差异主要来自数据与训练配方而非结构创新。",
    "limitation": "## 真实边界\n- 不支持自动语种检测，必须显式指定语言码。\n- 无原生说话人分离（diarization）与时间戳输出。\n- 对非语音声学事件可能幻觉，官方建议前置 VAD。\n- 仅 14 语种，远少于 Whisper 的 100+；闭源 API 之外权重 Apache 2.0 可自托管但不可微调（未开放训练代码/数据）。\n\n## 批判\n第一，5.42% 与第 2 名 IBM Granite 4.0 1B（5.52%）仅差 0.1 点、Zoom Scribe v1（5.47%）也在伯仲之间，榜单“第一”更多是边际胜出而非代际领先；把均值当唯一指标易误导。第二，encoder 堆参提升了吞吐，却牺牲了 LLM 系模型的语言理解/后处理（标点、ITN、指令）能力，在企业“语音智能”链路上反而可能要外挂文本模型。第三，14 语种选择偏企业功利，对低资源/方言覆盖明显弱于多语大模型。"
  },
  "fireredasr2": {
    "architecture": "## 设计动机\n真实部署需要的不只是孤立 ASR，而是“切分→判语种→转写→加标点”的完整流水线。FireRedASR2S 把四个模块统一到一个可独立部署的管线，避免异构级联带来的接口不一致与误差传播。\n\n## 整体流水线（2S = 第二代 FireRedASR 扩展为 All-in-One System）\n波形 → FireRedVAD（切分/事件检测）→ FireRedLID（语种/方言路由）→ FireRedASR2（转写）→ FireRedPunc（标点）。各模块可独立调用，也可级联。\n\n## 关键模块\n- FireRedVAD：0.6M 参数的 DFSMN，支持流式 / 非流式 / 多标签 mVAD；用数千小时人工标注声学事件训练，而非 ASR forced-alignment 弱监督。\n- FireRedLID：Encoder-Decoder，100+ 语种 + 20+ 中文方言，分层两 token 解码（先语种后方言）。\n- FireRedASR2：两变体共享前端——LLM 版（8B+，接语言模型做解码）与 AED 版（1B+，标准注意力编码器-解码器）；支持普通话、方言、英文、code-switch 与歌词识别。\n- FireRedPunc：BERT 式（基于 LERT 初始化）的中英标点预测。\n\n## 与 SOTA 的本质区别\n不是单点结构创新，而是“工业级一体化 + 开源权重/代码”的组合；ASR 内部靠把监督数据扩到约 200k 小时、扩大方言覆盖来提升，而非新注意力机制。",
    "training": "## 数据规模与混合\n四模块分别训练后联合部署。ASR 监督数据扩至约 200k 小时，覆盖更广域、更多语种与方言；VAD 用高质量人工标注事件数据；LID 初始化自 AED 编码器；Punc 用大规模多域中英语料。\n\n## 训练目标\n各模块标准监督目标（VAD 帧级分类、LID 分类、ASR CTC/AR、Punc 序列标注）；无统一 RLHF，属工程化多任务而非对齐训练。\n\n## known_results 数字解读\n- FireRedASR2-LLM：4 个公开中文基准平均 CER 2.89%，19 个中文方言/口音基准平均 CER 11.55%，超越 Doubao-ASR / Qwen3-ASR / Fun-ASR。AED 变体约 3.05%，精度低于 LLM 变体约 0.16 点。\n- FireRedVAD：FLEURS-VAD-102 帧级 F1 97.57%、AUC-ROC 99.60%，优于 Silero / TEN / FunASR / WebRTC。\n- FireRedLID：FLEURS(82 语) 句级准确率 97.18%，优于 Whisper / SpeechBrain。\n- FireRedPunc：多域标点 F1 78.90%，显著优于 FunASR-Punc 的 62.77%。\n这些数字说明增益来自“每个子模块都做到对应基准 SOTA”的系统性工程，而非单点突破。",
    "ablation": "## 模块级消融\n论文给出四模块在各自基准上相对强基线的溢出收益；方言覆盖广度是 ASR 关键增益来源（19 方言平均 11.55% vs 竞品）。\n\n## 变体对比\nLLM 变体(8B+) vs AED 变体(1B+)：精度 AED 低约 0.16 CER 点但推理成本低一个数量级，构成精度-成本权衡。\n\n## 关键发现\n统一流水线在工程上优于级联开源组件；但论文未提供“去掉某个模块/换组件”的严格消融，更多是分别打榜而非端到端消融。",
    "limitation": "## 真实边界\n- LLM 变体 8B+ 推理成本高，端侧不现实；AED 变体精度低于 LLM 变体。\n- 与统一音频-语言基座（如 StepAudio）相比，不具备对话/生成能力，只是识别流水线。\n- 权重开源但训练数据与微调代码“coming soon”，目前复现成本不低。\n\n## 批判\n第一，所有 SOTA 数字均为团队在“选定公开基准”上的自报，缺乏第三方盲测与难集（强口音、远场、重叠语音）细拆；11.55% 方言均值掩盖了低资源方言可能远高于此。第二，四模块级联存在误差传播：VAD 切错 → LID 判错 → ASR 错，论文未量化级联累积误差。第三，AED 与 LLM 双变体带来维护负担，且 LLM 变体的“8B+”未给精确参数量，透明度有限。"
  },
  "nim4_asr": {
    "architecture": "## 设计动机\n面向生产的 LLM-based ASR，要解决三件事：小模型（2.3B）性能严重下降、声学挑战下幻觉、以及缺乏生产级热词定制。核心思路是用模块化 encoder-adaptor-LLM 显式切分功能边界，并用音素级 RAG 做百万级热词定制。\n\n## 整体流水线\n原始语音 → 80 维 log-Mel（25ms 窗、10ms 帧移，全局均值方差归一）→ 流式语音编码器 → 语音适配器（4x 下采样）→ 音素级 CTC 头（贪心解码出音素假设）→ RAG 检索热词库 → 将命中热词作为上下文提示注入 LLM prompt → Qwen3-1.7B 解码出最终文本。\n\n## 关键模块\n- 流式语音编码器：沿用 FireRedASR-AED 的 Conformer（4x 下采样卷积 + Conformer 堆叠），约 600M 参数，帧率 25Hz（40ms 分辨率）；训练时模拟流式约束，转成基于 chunk 的流式编码器。\n- 语音适配器：两层 MLP，投影前沿特征维拼接 4 连续帧做 4x 下采样，下采样后 6.25Hz（每 token 160ms）。\n- 音素 CTC 头 + RAG：3 层 MLP 出音素假设；用 Aho-Corasick 在音素假设上扫描热词库（百万级、亚毫秒延迟），比 N-gram 重打分更可扩展、比文本检索更精确（音素域更贴近声学证据）。\n- LLM 解码器：Qwen3-1.7B 初始化，条件于语音嵌入与可选热词提示生成文本。\n\n## 与 SOTA 的本质区别\n把“热词定制”从训练期固化改为推理期 RAG，且检索在音素域而非文本域；用显式模块边界 + IA-SFT 抑制表示漂移与幻觉，而非端到端黑箱。",
    "training": "## 六阶段训练范式\nencoder 预训练 → alignment（对齐）→ IA-SFT（迭代异步 SFT，强化跨模态对齐同时抑制表示漂移/幻觉）→ late joint SFT → context SFT（热词上下文）→ RL（GRPO）。\n\n## RL 奖励设计（关键）\n- 准确性奖励：R_acc = exp(-alpha * CER)，鼓励低错率。\n- 幻觉奖励：R_hallu = -gamma * |L_hyp - L_ref|，惩罚明显长于/短于参考的输出。\n- 上下文奖励：R_ctx = lambda * (N_hit - N_miss)，奖励正确包含提示中的热词，让 LLM 学会信任 RAG 提示。\nGRPO 对单条音频采多个假设比较相对奖励，学到稳定且准确的转录行为。\n\n## known_results 数字解读\n在 25 个基准（15 公开 + 10 内部）评测，仅 2.3B 参数即达 SOTA。论文给出：在含专名/术语的数据集上，相对无 RAG 基线 WER 显著降低（具体降幅见论文）；AISHELL-1 普通话 CER 0.57%，优于数倍于其规模的模型。这些数字说明音素 RAG 在实体密集场景增益最大，而 0.57% 属高资源干净集的极值、不代表方言/噪声泛化。",
    "ablation": "## RAG 消融（核心）\n有无音素 RAG 热词：在金融/医疗/客服等术语密集场景 WER 显著下降，通用场景增益较小——证明 RAG 价值集中在“词汇表外专名”。\n\n## 检索算法消融\nAho-Corasick 在音素假设上扫描：百万级热词库、亚毫秒检索延迟，且检索精度高；对比文本检索更抗同形异音。\n\n## 阶段消融\nIA-SFT 阶段被证明能缓解表示漂移、降低幻觉；RL 阶段带来额外精度与鲁棒性增益。",
    "limitation": "## 真实边界\n- 目前未见模型权重/代码开源计划（论文仅“Report GitHub Issue”链接，未明确开源）。\n- 热词增益完全依赖外部检索索引的质量与覆盖；索引缺失则退化为普通 LLM-ASR。\n- 流式编码器受 chunk 约束，首包延迟受 160ms/token 分辨率限制。\n\n## 批判\n第一，2.3B 的“SOTA”主要靠 AISHELL-1 等干净高资源集撑门面，内部 10 个基准不透明，难以独立核验。第二，RAG 只解“专名”一类错误，对声学本身错误无能为力，却显著增加推理复杂度（CTC 头 + 检索 + prompt 拼接）。第三，GRPO 的三类奖励权重（alpha/gamma/lambda）是超参，若未慎调，准确性奖励可能压过上下文奖励，反而削弱热词信任——论文未给灵敏度分析。"
  },
  "ibm_granite41": {
    "architecture": "## 设计动机\nGranite Speech 4.1 家族按“瓶颈”出三款变体：精度优先（AR 2B）、功能丰富（2B Plus，含说话人/词级时间戳）、吞吐优先（2B NAR）。核心创新在 NAR 变体把 ASR 重述为“基于双向 LLM 的转写编辑（NLE）”。\n\n## 整体流水线\n波形 → Conformer 音频编码器（block-local Shaw 注意力）→ windowed projector → Granite-4.0-1b LLM 文本头。\n- AR 变体：标准自回归 token-by-token 解码。\n- NAR 变体（NLE）：冻结 CTC 先出草稿转写 → 双向 LLM 单次前向对草稿做 copy/insert/delete/replace 编辑（is_causal=False，全上下文双向注意力）→ CTC 解码出最终文本，无 token 循环。\n\n## 关键模块\n- 音频编码器：Conformer + block-local Shaw 注意力，控制长序列计算。\n- 投影器：带注意力的 MLP；Plus 变体拼接编码器中间层与末层（cat_hidden_layers=[3]），加倍 K/V 宽度。\n- 文本头：Granite-4.0-1b LLM；NAR 用其作为双向编辑器。\n\n## 与 SOTA 的本质区别\n不是新编码器，而是“用双向 LLM 编辑 CTC 草稿”替代自回归生成，从而在保持精度的同时消除串行解码瓶颈；AR 与 NAR 共享编码器、解码管线结构不同。",
    "training": "## 训练目标\nAR 变体：标准 ASR 目标 + 标点/true-casing + 双向语音翻译（AST）+ keyword biasing（关键词偏置）。\nNAR 变体：NLE 编辑目标，CTC 草稿作为条件。\n\n## 数据与对齐\n在 Granite 生态上对齐，便于后续语言处理；支持英文 + 法/德/西/葡（+ 日，仅 AR/Plus）。输入上限约 6 分钟（4096 token 上下文为硬限）。Apache 2.0 全开源。\n\n## known_results 数字解读\nbase AR 2B 在 HF Open ASR Leaderboard 平均 WER 5.33%（与 2B 级模型相当、许可更友好），实时因子约 231x（1 小时音频约 16 秒）。NAR 变体在单卡 H100 批大小 128 下 RTFx 约 1820（1 小时约 2 秒），LibriSpeech test-clean 1.29%，与上游卡一致。英文子集：AMI IHM 7.91 / AMI SDM 19.59 / Earnings22 8.48 / GigaSpeech 10.12 / SPGISpeech 3.04 / TED-LIUM 3.67 / VoxPopuli 5.83——可见 NAR 用轻微精度换巨大延迟下降。",
    "ablation": "## NAR vs AR 权衡（核心）\nNAR 以放弃翻译、关键词偏置、说话人属性、词级时间戳为代价，换取约 8x 吞吐（1820 vs 231 RTFx），且 LibriSpeech 精度几乎持平（1.29%）。\n\n## 投影器/层拼接消融\nPlus 变体拼接中间层提升 K/V 表达，换来词级时间戳与说话人归属，但 WER 略升（约 5.71%）。\n\n## 量化鲁棒性\nGGUF 实测 Q4_K_M 下 LibriSpeech WER 仅 1.35%（BF16 1.29%），量化对 NAR 几乎中性。",
    "limitation": "## 真实边界\n- NAR 变体仅支持 en/fr/de/es/pt（丢掉日语），且无翻译/时间戳/关键词偏置。\n- 输入上限约 6 分钟，长音频被拒而非静默截断。\n- 多语种覆盖不如专门多语模型；NAR 在极长句或强口音上可能弱于强 AR/LLM 模型。\n\n## 批判\n第一，NLE 的质量上界受冻结 CTC 草稿限制：若 CTC 草稿错得离谱（如专有名词、强口音），双向编辑的修正空间有限，论文未给出“草稿质量 vs 最终精度”的关联分析。第二，5.33% 是 AR base 的榜均值，NAR 为换速度精度略降，但公开榜未单列 NAR 均值，不宜直接套用 5.33% 形容 NAR。第三，6 分钟硬限对会议/通话长音频不友好，工程价值打折扣。"
  },
  "moonshine_v2": {
    "architecture": "## 设计动机\n为端侧/嵌入式实时而生，追求“极小参数量 + 极低首包延迟”，而非绝对精度。V2 相对 V1 的关键升级是让编码器可流式。\n\n## 整体流水线\n16kHz 音频 → 50Hz 音频前端（因果卷积 + 滚动 buffer）→ 滑动窗口 Transformer 编码器（“ergodic encoder”）→ 适配器注入位置信息 → 自回归解码器（RoPE + cross-attention 到编码器状态）→ 文本 token。\n\n## 关键模块\n- Ergodic 编码器：因果滑动窗口注意力、无位置嵌入，可逐 chunk 处理，突破“必须看完整段才出首 token”的限制，实现无界长度流式。\n- 适配器：在编码器与解码器之间注入位置信息（因编码器本身无位置编码）。\n- 解码器：RoPE 因果自注意力 + 对编码器状态的 cross-attention，配合 KV-cache 自回归生成。\n- 前端：因果卷积 buffer 支持增量音频输入，跨 chunk 保持状态。\n\n## 与 SOTA 的本质区别\n典型轻量 encoder-decoder，但用“无位置编码的滑动窗口编码器 + 适配器补位置”换取真正的流式低延迟，而非把 Whisper 类模型硬改流式。",
    "training": "## 数据规模\n在约 300K 小时语音数据上训练；MIT 许可证，社区友好。\n\n## 变体与部署\ntiny 约 43M（小至 ~130MB）、small 约 147M、medium 约 245M；可在 NPU/CPU 上浮点实时运行。Web 端有纯 Swift MLX 实现。\n\n## known_results 数字解读\nmedium：MacBook Pro 上流式延迟约 107ms，精度与 Whisper Large V3 持平但参数量仅其约 1/6（6x 更少参数）；LibriSpeech clean 约 3.0% WER。相对 Whisper 同精度量级推理快约 100x。需注意：这是“同精度量级”而非“同绝对精度”，且 Moonshine 主打英文。",
    "ablation": "## 流式机制消融\nV2 引入编码器滑动窗口注意力后，TTFT 显著下降（无需等整段音频）；ONNX 拆成 frontend/encoder/adapter/cross_kv/decoder_kv 五组件，便于 NPU 上融合、减少 NPU-CPU 数据传输。\n\n## 精度-速度权衡\n设计即是在帕累托前沿上选“小模型点”：以绝对精度换极低算力；论文未做大型结构消融，重点在部署可行性。",
    "limitation": "## 真实边界\n- 绝对精度弱于大模型（medium ~3% LibriSpeech clean 已是其上限，难比 1.x% 级大模型）。\n- 偏英文，多语覆盖弱。\n- 仅适合对精度容忍度高的端侧/实时场景（指令、字幕、听写）。\n\n## 批判\n第一，“6x 更少参数、精度与 Whisper Large V3 持平”是略带选择性的对比：Whisper Large V3 是 1.6B 多语模型，Moonshine 是英文专用且只在英文集比；跨语种的公平比较缺失。第二，~100x 加速是相对 Whisper 同精度量级，并非相对其最优批处理部署，易被误读为全面百倍优势。第三，无位置编码的 ergodic 编码器在长程依赖（超长句、跨段落指代）上理论上弱于带显式位置/双向注意力的模型，论文未给长音频退化曲线。"
  },
  "on_device": {
    "architecture": "## 设计动机\n在纯 CPU、无 GPU 的边缘设备上跑高质量流式 ASR，需同时优化精度、延迟、内存。该工作（Microsoft CoreAI，构建于 NVIDIA Nemotron Speech 之上）先系统比较主流架构，再对最强候选做训练后压缩。\n\n## 整体流水线\n选定 NVIDIA Nemotron Speech Streaming（cache-aware transducer / 约 0.6B）为基座 → 在 ONNX Runtime 中重新实现完整流式推理管线（chunk 级、跨 chunk 携带编码器 cache）→ 训练后量化（int4 k-quant 等）+ 图级算子融合 → 端侧 CPU 流式解码。\n\n## 关键模块\n- 基座：Nemotron Speech Streaming 的 cache-aware transducer，原生支持 chunk 流式与跨 chunk 缓存。\n- 量化：importance-weighted k-quant、混合精度、round-to-nearest，结合算子融合。\n- 流式策略：小 chunk（560ms）处理，编码器 cache 跨 chunk 传递，算法延迟约 0.56s。\n\n## 与 SOTA 的本质区别\n不是新模型，而是“架构选型实证研究 + 后训练压缩”的组合：在 50+ 配置（Whisper / Nemotron / Parakeet TDT / Canary / Conformer Transducer / Qwen3-ASR）中，证明 Nemotron Streaming 是 CPU 端侧最强候选，再用 int4 把它压到 0.67GB。",
    "training": "## 训练配方\n基座 Nemotron Speech Streaming 为已训练模型；本工作不做重训，仅做训练后量化 + 算子融合。\n\n## 压缩策略对比\n对比 RTN、混合精度、importance-weighted k-quant；int4 k-quant 为推荐配置：模型从 2.47GB 缩到 0.67GB，WER 保持在全精度 PyTorch 基线 1% 绝对误差以内。\n\n## known_results 数字解读\nint4 k-quant 变体：模型体积 0.67GB，8 个标准英文基准平均流式 WER 8.20%，算法延迟 0.56s，CPU 上快于实时。体积降 >70% 而 WER 仅升 <1% 绝对——这是“质量-效率”新帕累托点。注意 8.20% 是流式约束下的均值，明显高于批处理大模型（如 Qwen3-ASR-1.7B 批处理 5.90%）。",
    "ablation": "## 架构选型消融（核心）\n对 6 个模型族、50+ 配置在 batch/chunked/streaming 三模式下评测，确认 Nemotron Speech Streaming 是资源受限硬件上实时英文流式的最强候选；并刻画 chunk 大小/上下文长度 vs WER 的关系。\n\n## 量化消融\n量化 + 算子融合比单纯 RTN 更好地保住 transducer 精度；int4 k-quant 在体积-WER 曲线上最优。\n\n## 关键发现\n模型内存在 <1% WER 代价下可砍 70%+；低算法延迟使端侧语音 agent 与本地 LLM 紧耦合成为可能。",
    "limitation": "## 真实边界\n- 仅英文、仅 CPU、流式；8.20% 流式 WER 高于批处理大模型，属精度换部署。\n- 本质是第三方（Microsoft）在 NVIDIA 基座上的压缩研究，并非 NVIDIA 官方“on-device 产品”。\n- 端侧不同芯片的算子支持度影响实际表现（依赖 ONNX Runtime + 特定量化内核）。\n\n## 批判\n第一，8.20% 相对榜首 5.33–5.42% 仍有明显差距，所谓“SOTA 端侧”是限定在“CPU、<1GB、流式”约束下的帕累托最优，而非绝对精度领先；把“新帕累托点”说成“突破极限”略夸张。第二，论文以 Nemotron Streaming 为唯一基座，未证明该压缩流水线对其他 transducer/LLM-ASR 同样有效，泛化性未验证。第三，0.56s 算法延迟对强交互（如打断式对话）仍偏长，且未给出长静音/重叠语音下的退化。"
  },
  "kyutai_stt": {
    "architecture": "## 设计动机\n为 Unmute 等实时语音对话而生，追求“边听边出 + 低延迟 + 高并发”的流式 STT，并内置语义级 VAD 以智能判断用户是否说完。\n\n## 整体流水线\n音频 → Mimi 音频 codec 编码（12.5Hz，每帧 32 个音频 token）→ decoder-only Transformer 消费音频 token → 建模“文本流”基于“语音流”输出文本 token。文本流相对音频流做时间偏移（shift），使模型基于已到达音频预测文本。\n\n## 关键模块\n- 多流（multistream）架构（源自 Moshi）：文本流与语音流分别建模，文本流相对音频流滞后，天然支持流式。\n- 语义 VAD：不仅输出文本，还输出“用户是否已说完”的概率，停顿等待时间随内容与语调自适应（非固定静音阈值），避免长句中误判。\n- delayed-streams modeling：延迟流建模使高批量推理无需额外胶水代码即可流式，单卡 H100 可并发 400 路实时音频。\n\n## 与 SOTA 的本质区别\n不是 encoder-decoder + 外部 VAD 的级联，而是用多流 decoder-only Transformer 把“流式、并发、语义 VAD”内建进同一模型；相对 Whisper-Streaming 那种反复重跑重叠片段的 hack，吞吐与延迟都更优。",
    "training": "## 数据规模\n预训练：2.5M 小时公开音频，用 whisper-timestamped 生成合成转写（伪标签）。\n微调：2.6B 模型用 24k 小时带真值转写数据；长音频微调用 LibriSpeech 拼接 1000h + 合成对话 22k h。1B 模型用 Fisher 2000h 英文 + 专有数据（1000h 英 / 600h 法）。\n算力：预训练 48 × H100，微调 16 × H100。\n\n## known_results 数字解读\nstt-1b-en_fr 延迟约 0.5s（词在说完 500ms 后转出），stt-2.6b-en 延迟约 2.5s。单卡 H100 可 400 路并发实时；精度与“能看到整段音频”的非流式 SOTA 持平。Unmute 用“flush trick”：检测到说完即让 STT 以约 4x 实时猛跑已收音频，把额外等待从 500ms 压到约 125ms。注意 0.5s 是 1B 低延迟版的指标，2.6B 精度版延迟达 2.5s。",
    "ablation": "## 延迟-精度权衡\n1B（0.5s 延迟，en/fr）vs 2.6B（2.5s 延迟，英文更准）：以延迟换精度；2.6B 与非流式 SOTA 持平但延迟高 2.5s，体现流式固有代价。\n\n## 语义 VAD 价值\n自适应停顿预测避免固定等待的误触发；但语义 VAD 目前仅在 Rust 服务实现，其他实现缺失。\n\n## 并发设计\ndelayed-streams modeling 是 400 路并发的关键，无需 Whisper-Streaming 式胶水代码。",
    "limitation": "## 真实边界\n- 1B 仅英/法，2.6B 仅英文；语种覆盖窄。\n- 2.6B 延迟 2.5s，对强实时交互偏长（靠 flush trick 缓解）。\n- 依赖 Mimi codec（12.5Hz/32 token），非原生波形建模；长音频（2 小时）可用但无额外处理。\n\n## 批判\n第一，预训练用 whisper-timestamped 合成标签，标签噪声会随 2.5M 小时被放大，可能限制精度上限；虽经带真值数据微调，但伪标签的系统性偏差未被量化。第二，“与非流式 SOTA 持平”的宣称主要针对英文 LibriSpeech 类集，多语/方言/强噪场景是否仍持平缺乏公开细拆。第三，0.5s 与 2.5s 两档延迟跨度大，中间档缺失，应用选型受限；且语义 VAD 仅 Rust 实现，跨平台一致性存疑。"
  },
  "voxtral_mini": {
    "architecture": "## 设计动机\nMistral 的实时多语 STT，与同族 Voxtral TTS 共享部署/接口，构成实时语音栈的听/说两端。核心是可原生流式、低首包延迟、可在浏览器/CPU 跑的中等规模模型。\n\n## 整体流水线\n16kHz 单声道 → Mel 频谱图 [B,128,T] → 因果音频编码器（32 层 sliding-window RoPE Transformer，窗口 750，因果卷积 stem）→ 4-frame 分组投影器 → 适配器投影到 3072 维 → 加到（additive fusion）Ministral 解码器 token 嵌入上 → 自回归解码器（26 层，GQA 32/8，NEOX RoPE）每 80ms 音频槽出一个文本 token（12.5Hz）。\n\n## 关键模块\n- 因果音频编码器：从零训、因果注意力 + 滑动窗口，左到右处理音频，支持真流式（区别于 Whisper 双向需看完整段）。\n- 投影器：4 帧堆叠 → Linear(5120→3072) → GELU → Linear(3072→3072)。\n- 解码器：约 3.4B 的 Ministral，滑动窗口 8192；音频嵌入以“相加”方式注入（streaming 格式），而非 cross-attention。\n- 延迟条件：delay-token 做延迟/质量 conditioning，默认 480ms（6 token × 80ms），可在 80ms–2.4s 间配置。\n\n## 与 SOTA 的本质区别\n因果编码器 + 加法音频融合 + delay-token 延迟调节，使单一模型在“延迟-精度”上连续可调；与离线 Voxtral 2507 家族架构不同（自有流式前端、因果编码器、additive fusion）。",
    "training": "## 训练配方\n从零训练，编码器与 LLM 主干均用因果/滑动窗口注意力；原生流式。支持 13 语种自动检测（en/fr/es/de/ru/zh/ja/it/pt/nl/ar/hi/ko）。Apache 2.0（可商用）。vLLM 默认配置支持约 3 小时连续录音。\n\n## known_results 数字解读\nLibriSpeech test-clean（离线路径）WER 2.08%（BF16；Q4_K_M 仍 2.08%，量化对 WER 中性）。首 token 延迟约 80ms（12.5Hz 每槽），默认配置延迟 480ms；官方称整体延迟 <500ms、吞吐 >12.5 token/s（最小硬件）。需注意：~70ms 首包延迟指首个 token 的生成节奏，而“可配置延迟”默认 480ms 才是完整可发布转写的等待。",
    "ablation": "## 延迟-精度权衡（核心）\ndelay-token 让延迟在 80ms–2.4s 连续可调：低延迟牺牲上下文、高延迟换精度；推荐 480ms 为甜点。\n\n## 量化鲁棒性\nGGUF 实测 Q4_K_M 下 LibriSpeech WER 2.08%（与 BF16 2.08% 一致），量化阶梯下行到 Q4 仍 WER 中性。\n\n## 流式验证\n因果编码器使“边听边出”为真流式；与 Voxtral TTS 配对验证全栈实时语音。",
    "limitation": "## 真实边界\n- 4B 总参（编码器 ~0.6B + 解码器 ~3.4B），对真·端侧（MCU）仍偏重，主打“笔记本/浏览器/消费 GPU”而非嵌入式。\n- 默认 480ms 延迟下才达到稳定质量，过低延迟会损精度。\n- 仅 13 语种，远低于 Whisper 100+。\n\n## 批判\n第一，2.08% LibriSpeech clean 是干净朗读集极值，且是离线路径指标；流式 + 默认 480ms 延迟下的真实场景（会议、噪声、口音）WER 未充分公开，不宜用 clean 数代表整体。第二，4B 规模虽称“on-device optimized”，但实际需 2.5GB Q4 权重 + 一定算力，严格嵌入式（CPU 实时）不现实，定位更接近“客户端本地推理”而非“端侧超低功耗”。第三，加法音频融合绕开 cross-attention，虽简化流式实现，但可能削弱音频-文本细粒度对齐，长句/同音字场景的鲁棒性有待第三方验证。"
  },
  "parakeet_tdt": {
    "architecture": "## 设计动机\nParakeet-TDT 是 NVIDIA NeMo 在 RNN-T 基础上提出的序列建模范式，核心动机是消除传统 Transducer 在帧级预测中大量空白帧（blank）带来的算力浪费。人类平均每秒说 2-3 个词，而每帧仅覆盖约 40ms 音频，导致绝大多数帧输出 blank，计算被白白消耗。\n\n## 整体流水线\nFastConformer 编码器（8 倍深度可分离卷积早期下采样）先把 16kHz 音频压成高帧率表征，再送入 TDT 解码器。TDT 在每个非 blank 帧同时预测（1）输出 token 的概率；（2）该 token 持续多少帧的 duration。推理时若预测某词跨 15 帧，则直接跳过 15 帧，无需逐帧处理，实现帧同步（frame-synchronous）流式解码。\n\n## 与之前 SOTA 的本质区别\n相对标准 RNN-T/Transducer，TDT 用 duration 预测显式建模 token 跨度，把对齐过程内嵌进模型而非依赖外部对齐。Parakeet-TDT 1.1B 比同规模 Parakeet-RNNT-1.1B 快 64% 且精度更高，是首个在 HF Open ASR 榜把平均 WER 压到 7% 以下的模型。0.6B 与 1.1B 两档均原生输出标点、大小写与词级时间戳，无需后置 LM/ITN 模块。",
    "training": "## 训练配方\n在大规模带标注英语语音上做有监督训练，TDT 目标函数联合优化 token 与 duration 预测，并用偏向最大化可跳过帧数的方式鼓励 duration 分支学习更长跨度以提升吞吐。编码器采用全注意力（full attention）以换取更强的长上下文理解，并利用 FastConformer 的线性可扩展注意力降低计算。\n\n## 数据规模与开源\n模型以 CC-BY-4.0 开源，0.6B 变体可单次处理最长 24 分钟音频。其训练数据小时数未像 Canary 那样公开，但工程目标明确是服务端高吞吐批处理而非极低延迟。\n\n## known_results 数字解读\nbatches.json 给出服务端批处理 RTFx 约 3332（即 1 秒音频约 0.0003 秒处理完）。该数字来自 0.6B v3 在 batch size 128 量级测得的约 2940-3380 RTFx 区间；其本质是 duration 跳帧 + FastConformer 下采样 + 大 batch 三者叠加的极致吞吐，代价是精度位于开源前列但非绝对榜首（部分榜单平均 WER 约 6.3%）。",
    "ablation": "## 关键消融与发现\n## duration 粒度权衡\nTDT 的核心设计变量是 duration 的离散取值集合（如 1/2/4/8 帧等）。粒度太粗会丢失细对齐、损害精度；太细则跳帧收益消失、回到逐帧开销。工程实现选择能让平均跳过帧数最大化的离散集合，在保持与 RNN-T 同等精度的前提下取得 64% 速度提升。\n\n## 速度来源拆解\n公开解读把总加速拆给两块：FastConformer 早期 8 倍下采样贡献约 2.4-2.8 倍；TDT 跳帧再贡献约 2.82 倍，合计相对基线 Conformer-RNNT 约 6-8 倍。这证明浪费计算是旧架构主要瓶颈，而 TDT 把瓶颈从逐帧 joiner 计算转移到 token 级 joiner 计算。",
    "limitation": "## 真实边界\n- 以吞吐而非超低首包延迟为目标，严格流式/端侧低延迟场景弱于专用流式模型。\n- 公开变体以英文为主，多语种覆盖远不及 Qwen3-ASR 等。\n- 精度处于开源第一梯队但非绝对榜首，部分开放榜平均 WER 约 6-8%，对精度敏感任务需权衡。\n\n## 批判\nTDT 的 RTFx 数字高度依赖 batch size 与并发设定，单条流式请求的实时因子远不及批处理数值，宣传中 3332 倍易被误读为单流延迟。此外 duration 预测把长静音/音乐段也纳入跳过逻辑，对含长停顿的会议音频，跳帧可能跨过边界信息，需要配合 VAD 才能稳妥。它本质是服务端批处理怪兽，定位清晰但不可泛化为通用低延迟方案。"
  },
  "canary_qwen": {
    "architecture": "## 设计动机\nCanary-Qwen-2.5B 是 NVIDIA 提出的 Speech-Augmented Language Model（SALM），动机是把转录和语言理解合并进单一模型：传统 ASR 只出文本，后续摘要/问答需再接 LLM；Canary-Qwen 让音频直接驱动一个真实 LLM，从而原生支持转写后处理。\n\n## 整体流水线\nFastConformer 编码器（含 Linearly Scalable Attention）抽取语音表征，经线性投影 + LoRA 适配器注入 Qwen3-1.7B 解码器。总参约 2.5B（FastConformer 编码器 + Qwen3-1.7B）。模型以 80ms 帧率（约 12.5 token/秒）工作，支持 ASR 模式（带标点/大小写转写）与 LLM 模式（对转写文本做摘要、问答）双模式切换。\n\n## 与之前 SOTA 的本质区别\n相对纯 Transducer（Parakeet）或级联后处理，Canary-Qwen 把 LLM 作为解码器本体而非后置模块。适配器设计保持模块化，可拆下编码器单独部署、把 Qwen3 当作独立文本 LLM 用，因此一个部署同时服务口语与书面语下游任务，这是相对 Canary 1B 系列的关键升级。",
    "training": "## 训练配方\n在 234K 小时多样化英语语音、约 4000 万 speech-text 对上训练，沿用 Canary 的多任务目标：识别 + 标点恢复 + 大小写 + 逆文本归一化（ITN）。LoRA 适配器在冻结/部分冻结 Qwen3 的前提下对接音频表征，避免灾难性遗忘文本能力。\n\n## 鲁棒性数据构造\n训练含约 48 小时 MUSAN 噪声数据做抗噪增强，使其在 0dB 信噪比下仍保持约 9.83% WER（远低于行业平均约 18.2%）。许可为 CC-BY-4.0，可商用。\n\n## known_results 数字解读\nbatches.json 把 Canary-Qwen 标为四语基准高精度、标点与 ITN 开箱可用。公开指标：HF Open ASR 榜平均 WER 5.63%（榜首），LibriSpeech-clean 1.60%、SPGISpeech 1.9%、AMI 会议 92.3% 口语识别准确率，418 RTFx。注意其四语（英/法/德/西）能力继承自 Canary 系列，但公开宣传以英语 SOTA 为主，多语种是可用而非主打卖点。",
    "ablation": "## 关键消融与发现\n## 编码器-解码器耦合方式\n核心消融是线性投影 + LoRA 能否在冻结 LLM 的同时对齐语音表征。结果证明轻量适配器即可让 Qwen3 直接消费 FastConformer 输出，且 LLM 模式文本能力基本保留，这是 SALM 成立的前提。\n\n## 精度-速度平衡\n相比 Parakeet-TDT 的极致吞吐（约 2000-3300 RTFx），Canary-Qwen 用更重的解码器换取精度与理解力，418 RTFx 仍属实时 400 倍以上，证明高精度 + 可理解可在 2.5B 规模下共存。",
    "limitation": "## 真实边界\n- 仅四语（英/法/德/西），超多语言需其他模型；以英文为主战场。\n- 相对纯 LLM 系（如 Qwen3-ASR 全量）缺通用语言理解广度，但强于传统 ASR。\n- 2.5B 部署需约 5GB 显存，低于超大模型但高于纯 Conformer。\n\n## 批判\n转录+理解一体化的卖点在实际产品中常受限于上下文长度与延迟：LLM 模式做长音频摘要时仍需先把整段转写塞进上下文，并非真正边听边总结。此外 418 RTFx 与 Parakeet 的 3000+ RTFx 直接对比不公平，后者是轻量 Transducer，前者带 1.7B LLM 解码，二者精度档位不同。其榜首 5.63% 是 HF Open ASR 平均口径，跨榜与 Artificial Analysis 等更硬口径不可直接横比。"
  },
  "vibevoice_asr": {
    "architecture": "## 设计动机\nVibeVoice-ASR（Microsoft Research，arXiv 2601.18184）针对长音频转写痛点：工业级级联管线用 VAD 切 30s 短片段，分别做 ASR、说话人日志（diarization）、时间戳对齐，再靠启发式规则融合，导致上下文碎片化与跨段说话人错乱。VibeVoice 把长语音理解作为首要问题，单次推理端到端产出结构化结果。\n\n## 整体流水线\n基于 Qwen2 Decoder（28 层 Transformer、3584 隐藏维）为骨干，配声学 tokenizer 编码器与语义 tokenizer 编码器双路，加扩散头。关键是用约 7.5Hz 超低帧率连续语音 tokenizer 把 60 分钟音频压进 64K token 上下文窗口，使模型能全局关注整场会话。Flash-Attention 优化超长序列推理。\n\n## 与之前 SOTA 的本质区别\n相对切片段+级联范式，VibeVoice 把 ASR、说话人日志、时间戳预测统一为单一文本生成任务，直接输出谁-何时-说了什么的结构化富转录（Rich Transcription）。无需外部聚类算法即可在单次推理里完成说话人归属，从架构上消除跨段误差传播。支持 50+ 语言与无缝语种切换（如中英夹杂），并提供自定义热词注入。",
    "training": "## 训练配方\n模型约 9B 参数，采用 MIT 开源许可。SFT 阶段侧重中英环境，但预训练底座覆盖 50+ 语言，因此法语/德语/日语等零样本泛化强。训练把联合产出识别+说话人+时间戳作为统一序列目标，并用结构化输出格式监督，使模型学会在生成文本同时给出说话人标签与时间区间。\n\n## known_results 数字解读\nbatches.json 给出单次 60 分钟、含说话人日志。论文在 AISHELL-4、AMI、AliMeeting、MLC 等五项基准上对比闭源多模态大模型：说话人错误率（DER）降至 3.42%（对比基线 16.29%）；带时间约束的 tcpWER 达 14.81%，大幅领先 Gemini-2.5-Pro / Gemini-3-Pro 等。这证明单次长上下文在说话人归属与时序对齐上显著优于级联方案，DER 与 tcpWER 的下降正是取消分段后全局一致性的直接收益。",
    "ablation": "## 关键消融与发现\n## 超低帧率 tokenizer 的必要性\n核心设计选择是约 7.5Hz 高压缩 tokenizer。若不压缩，60 分钟音频帧数远超 LLM 上下文上限，只能回退到分段；7.5Hz 让一小时约 2.7 万帧，配合 64K 窗口留足余量做全局说话人追踪，这是单次推理成立的前提。\n\n## 联合训练 vs 级联\n论文把联合训练（识别+日志+时间戳一次出）与分别训练再融合对比，结论是联合建模让说话人标签与时间戳和文本强一致，消除了级联中 ASR 段边界与 diarization 聚类不对齐的根本缺陷，DER/tcpWER 因此大幅下降。",
    "limitation": "## 真实边界\n- 9B 规模 + 64K 长上下文，显存与算力占用大，单条长音频推理成本高。\n- 中文/英文为主监督，长尾语种靠预训练泛化，弱于专门低资源模型。\n- 单次 60 分钟是上限，超长（如数小时）仍需分段或流式策略。\n\n## 批判\nVibeVoice 把 diarization 内嵌进生成，的确根治了级联错位，但其 DER 3.42% 的惊人数字很可能受益于评测集本身已提供较干净的说话人边界假设或受限说话人数（如 AISHELL-4/AMI）。在真实开放麦克风、重叠语音严重场景下，生成式说话人归属仍可能漂移。另外 64K 上下文对一小时音频够用，但说话人表征隐式编码在 token 序列里，长会议里远端说话人被后续内容稀释的风险未被充分讨论。它更像是会议/播客转录的专用利器，而非通用流式 ASR。"
  },
  "stepaudio25": {
    "architecture": "## 设计动机\nStepAudio 2.5（StepFun，arXiv 2605.23463）的核心理念是：文本与音频共享同一多模态表征空间，任务差异只是 operational regimes（数据构造、优化目标、解码约束）不同。由此一个 audio-language foundation 经后训练塑形出 ASR、TTS、Realtime 三种人格，而非三个独立模型。\n\n## 整体流水线（ASR 分支）\nASR 分支的关键创新是可验证多 token 解码（MTP，Multi-Token Prediction）。在标准自回归识别器之上冻结式对齐出多条 MTP 分支，每步并行提出若干未来 token，再由自回归主干逐位置验证，仅接受被验证路径支持的 token。MTP-5 配置下前 5 个位置的接受率分别约 0.95 / 0.88 / 0.80 / 0.71 / 0.64，平均每步接受约 5 个 token（满分 6）。\n\n## 与之前 SOTA 的本质区别\n相对扩大解码器导致逐 token 延迟线性增加的旧规律，StepAudio 2.5 用 MTP 把解码器规模与推理延迟解耦：多数步骤一次出多个已验证 token，使更大解码器不再等价于更慢。这是把 LLM 中 MTP 加速训练的思路首次系统性用于 ASR 落地。TTS 分支绕过音频编码器，把音频 token 当另一种语言纯自回归生成；Realtime 分支沿用同一主干做低延迟对话。",
    "training": "## 训练配方\nASR 训练含 100K 小时短音频监督数据 + 50K 小时长音频（由多假设验证 + LLM 归一化构建）。长音频 pipeline：VAD 切 30s 片段，3 套 ASR 系统独立转写，ROVER token 级投票融合，分歧率过滤（大于 5% 丢弃），邻段重组为长样本，LLM 恢复标点/ITN 并保证跨段一致性。\n\n## 对齐与损失\nMTP 训练分两阶段：先 frozen-branch alignment（校准新分支不扰动已收敛的自回归识别器），再 joint calibration（主干与 lookahead 提案协同）。最终损失等于标准下一 token 交叉熵 + MTP 损失的指数衰减聚合（越远的预测权重越低）。后训练以 task-tailored RLHF 为主机制：ASR 用可验证奖励做对齐，TTS 用生成式奖励模型（GRM）做偏好 RLHF，Realtime 用生成式奖励模型 + 交互准则。\n\n## known_results 数字解读\nbatches.json 给出 AISHELL-1 CER 0.71%、RTF 0.0053（较 Qwen3-ASR 快 1.8 倍）。论文更全：中文平均 CER 2.97%（FLEURS-zh 2.63%），英文平均 WER 3.68%（LibriSpeech-clean 1.38%），长音频平均 3.70%（32K 上下文窗口）。RTF 0.0053 在 H800 单并发 30s 片段测得，比 Qwen3-ASR-1.7B（0.0094）快 1.8 倍、比 FunASR-Nano 快 11 倍、比 VibeVoice-ASR 快 19.6 倍。关键消融：加 MTP-5 后精度几乎不变（波动小于 0.06 绝对点），即加速几乎是白拿的。",
    "ablation": "## 关键消融与发现\n## MTP 加速几乎零精度代价\n对比 SFT 后未做 MTP 的基线，三语言/长音频平均误差波动在 0.03-0.06 绝对点内。原因是分阶段训练 + 自回归验证保证最终文本总由被验证路径决定，从而把激进加速与精度第一梯队同时拿到。\n\n## lookahead 深度选择\nMTP-3/5/7 对比：前几位接受率几乎不随分支总数变化，说明早期位置确定性高、远端位置才是收益瓶颈；MTP-5 在加速与实现复杂度间最优。\n\n## 长音频上下文收益\n在长 LibriSpeech 变体上，32K 原生上下文避免分段边界错误，长音频错误率 3.70% 显著优于需 VAD 切段的 Qwen3-ASR-1.7B。",
    "limitation": "## 真实边界\n- 统一基座规模大、部署重，离线批处理友好但严格端侧不现实。\n- RLHF/数据工厂成本高，权重开放程度有限（技术报告为主）。\n- 长音频依赖 32K 上下文，超长会议仍需策略。\n\n## 批判\n一个底座三种人格优雅，但工程现实是三分支各自有独立后训练与部署管线，所谓统一更多是表征与主干共享，推理时仍是不同服务。MTP 的加速依赖语音识别具有模态诱导的确定性（同音歧义少、文本可先验验证），在强口音/专业术语密集场景，验证路径可能更保守、接受率下降，加速收益收缩。另外 AISHELL-1 0.71% 已接近该测试集人工标注天花板，作为领先指标边际意义有限，更该看长音频与方言等真实分布。"
  },
  "meta_omni": {
    "architecture": "## 设计动机\nOmnilingual ASR（Meta FAIR，arXiv 2511.09690，2025-11）针对 7000+ 语言中绝大多数无 ASR 支持的问题，主张把多语言 ASR 做成可扩展框架而非固定语言列表。其设计可让社区用极少量自有样本引入新语言。\n\n## 整体流水线\n把 wav2vec 2.0 语音编码器扩展到 7B 参数做大规模跨语言自监督表征，再接两类解码器：（1）CTC ASR，编码器后加线性层 + 字符级 CTC 损失，可实时；（2）LLM ASR，wav2vec 2.0 编码器 + Transformer 解码器（类 LLM），做字符级下一 token 预测，支持语言条件（如 eng_Latn、cmn_Hans）。零样本变体 omniASR_LLM_7B_ZS 用上下文示例（N+1 语音-文本对）做 in-context learning，并用 SONAR 多语编码器检索最相关示例注入上下文，无需更新权重即可转录未见语言。\n\n## 与之前 SOTA 的本质区别\n相对 Whisper（固定 100 语）、USM（1200 万小时预训练）、MMS（1100+ 语），Omnilingual 的本质区别是可扩展 + 零样本上下文学习：监督覆盖 1600+ 语，零样本经上下文示例泛化到 5400+ 语。这把加语言从专家微调降级为提供几条样本。",
    "training": "## 训练配方\n自监督预训练用约 430 万小时无标签语音（1239 语 + 46 万小时未标语言），远少于 USM 的 1200 万小时但数据效率更高。监督数据来自 AllASR 语料：120,710 小时标注语音、1690 语；其中 Omnilingual ASR Corpus 为与非洲/南亚社区合作委托采集的 3350 小时、348 语自然口语。编码器用标准 wav2vec 2.0 对比目标，训练后弃量化器作表征骨干；CTC/LLM 解码器在表征上微调。模型家族 300M-7B 全开源（Apache 2.0 / CC BY 4.0）。\n\n## known_results 数字解读\nbatches.json 给语种覆盖 1600+（长尾可用）。论文更具体：7B LLM ASR 在 1600+ 支持语中有 78% 字符错误率（CER）低于 10%；在 FLEURS-102 等多语基准平均 CER 胜过 Google USM 变体，尽管预训练小时数仅约三分之一。CTC 300M 在 A100 上 30s 音频 RTF 低至 0.001。这些数字说明扩展 wav2vec 2.0 + LLM 风格解码器是覆盖长尾的高效路径，而非单纯堆数据。",
    "ablation": "## 关键消融与发现\n## 低资源上采样\n论文研究对低资源语的上采样比例：适度上采样能显著提升长尾精度且不明显损害高资源语；过度上采样则高资源回退。这证实数据配比是其性能关键旋钮。\n\n## 语言条件的作用\n消融语言 ID 注入：显式语言条件（cmn_Hans 等）在已知语上稳定增益；但训练时随机丢弃语言 token，使推理可在无显式标签下运行，提升易用性。\n\n## 零样本示例检索\n对比随机示例 / 文本相似度 / SONAR 音频-文本近邻三种上下文示例选法，SONAR 检索显著提升零样本 CER，证明语义对齐的示例检索是零样本泛化成立的核心。",
    "limitation": "## 真实边界\n- 单语精度通常不及专门为该语优化的模型；78% 语言 CER 小于 10% 意味着约 22% 语言仍偏高。\n- 7B 全量部署重；300M CTC 虽快但精度有限。\n- 零样本依赖社区提供示例，极低资源语示例稀缺时退化为弱基线。\n\n## 批判\n1600+ 语的覆盖不等于可用：CER 小于 10% 在拼音文字里可能每句几个错字，但在形态复杂/黏着语里 10% CER 已严重影响可读性，且论文以字符错误率为统一口径，对语种间公平性存疑。更关键的是，这种社区自带样本扩展范式把质量责任转移给用户，缺乏中心化评测会放大长尾语的实际误差。它的最大价值是社会学与可扩展性示范，而非单语 SOTA，应与专用模型互补而非替代。"
  },
  "hy_asr30": {
    "architecture": "## 设计动机\n腾讯混元 Hy ASR 3.0 preview（2026-08 发布）定位从逐字转写到理解语境的范式迁移：把最新一代 Hy3 大语言模型的语义理解塞进识别管线，让 ASR 先理解再说字，从而消歧同音词、结合上下文纠错。\n\n## 整体流水线\n基座是 MoE 架构的 Hy3 大语言模型（负责语义推理/上下文建模），语音侧是腾讯自研无监督语音 Encoder（数千万小时级无监督数据训练，提取声学表征）。两者做联合训练（encoder 与 LLM 在训练阶段就耦合），而非传统声学模型出候选、语言模型重排的两段式。架构上可视为无监督语音编码器 + MoE LLM 解码器的端到端对齐。\n\n## 与之前 SOTA 的本质区别\n注：batches.json 简述为 MoE 语音编码器，但公开资料表明 MoE 指的是 Hy3 LLM 主干（稀疏激活控成本），语音 Encoder 是自研无监督模型而非 MoE。其本质区别在于让 Encoder 与 LLM 在训练期耦合、识别即理解一体，并用多阶段强化学习塑形，而非把 LLM 当后置重排器。这使其能处理期中考试 vs 期终考试、致癌 vs 治癌等纯声学无法消歧的案例。",
    "training": "## 训练配方\n语音 Encoder 与 Hy3 大语言模型联合训练，引入数千万小时级、多来源语音数据，覆盖多方言/口音/声学环境。大规模联合预训练后通过多阶段能力注入获得上下文感知、复杂场景适应、方言识别；SFT 数据覆盖 10 大方言片区 + 20 余个二级小片区。后训练引入多阶段强化学习，分别优化通用转写准确性、Any-context 上下文能力、复杂长尾场景。支持热词注入适配品牌名/人名/术语。\n\n## known_results 数字解读\nbatches.json 给中文场景 WER 3.34%、工业第一梯队。官方口径：开源评测集多语种 WER 约 3%，其中中文普通话 3.34%、英语 2.62%、粤语 3.12%；自建集覆盖 10 余方言、专业术语、高噪与耳语场景，官方称同样领先。作为 preview 版本，数字是官方发布口径，闭源不可独立复现，需以腾讯云 API 实测为准。",
    "ablation": "## 关键消融与发现\n## MoE 稀疏度权衡\n据推测，Hy3 的 MoE 专家数/激活度是精度-推理成本的核心旋钮：稀疏激活在保持大模型容量的同时控制单次推理算力，使 LLM 级理解可在云端实时服务。具体专家配置未公开，属推断。\n\n## 上下文纠错贡献\n最有说明力的是同音词消歧案例：无 LLM 时筠州易被判为云州/郓州，接入 Hy3 上下文推理后借讨论苏轼苏辙背景锁定正确地名。这证明理解优先相比纯声学显著提升专名/多音字准确率，但量化消融（如去掉上下文模块后的 WER 增量）未公开。",
    "limitation": "## 真实边界\n- 闭源商业 API（腾讯云），不可微调/自部署；以 preview 发布，指标为官方口径。\n- 语种以中文/粤语/英语为主，广度弱于 Omnilingual/Canary 等。\n- 强依赖 Hy3 LLM 推理，端侧不现实，延迟与成本高于轻量 Conformer。\n\n## 批判\nWER 3.34% 与理解语境存在指标错配：传统 WER 衡量逐字准确率，而 Hy ASR 3.0 的价值在语义消歧，后者用 WER 无法充分捕捉（同音纠错可能不改变 WER 却改变正确性）。更需警惕的是，把 LLM 推理引入 ASR 会引入幻觉式纠错风险，模型可能因上下文偏向把正确声学词改成语义更顺但错误的词，在医疗/法律等不容错场景需谨慎。作为 preview，缺独立第三方基准与消融，真实边界待正式版与社区实测验证。"
  },
  "fun_realtime_asr": {
    "architecture": "## 设计动机\n阿里 Fun-Realtime-ASR（2026-05 发布）定位实时语音识别赛道，目标是在听准基础上支撑毫秒级响应的实时交互。与同族 Fun-Realtime-AudioChat / Fun-Realtime-TTS 共享基座，构成 ASR/Chat/TTS 三赛道大满贯。\n\n## 整体流水线\n公开资料称其采用创新的多模态预训练架构；作为阿里语音大模型家族一员，合理推断其延续 Fun-ASR 系的语音表征 + 大模型解码路线，并在实时推理上做工程优化（流式分块、低首包延迟）。模型支持毫秒级响应、30+ 语言、七大中文方言体系、20+ 地区口音，并提供企业级定制接口（金融/医疗术语库适配）。\n\n## 与之前 SOTA 的本质区别\n相对离线高精度模型，Fun-Realtime-ASR 强调实时 + 高精度双优；其差异化在于与 AudioChat（语音推理 97.6%、对话动态 97.8%）同源，便于把识别直接喂给理解/对话链路，形成低延迟闭环。具体内部结构未公开，属商业闭源。",
    "training": "## 训练配方\n以大规模多语种/多方言语音数据 + 实时推理优化训练；据推测结合强抗噪/口音数据增强以在复杂声学环境保持稳定。与同族 TTS/Chat 共享基座，暗示统一语音表征复用。具体数据规模、损失与目标未公开。\n\n## known_results 数字解读\nbatches.json 给 Artificial Analysis 词错率榜 WER 1.8%、居首。该榜是第三方盲评式基准，口径偏难句/口音/真实场景，1.8% 意味着每 100 词错不到 2 字，超越 GPT-Realtime-2 等国际模型、居全球第一。需注意 AA 榜口径与 HF Open ASR 榜不同（更偏产品级真实分布），横评时不可直接与其他榜 WER 比较。",
    "ablation": "## 关键消融与发现\n## 以第三方盲评为优化目标\n公开资料未给出独立消融，其工程以 Artificial Analysis 实时榜为外部门标。据推测关键实验包括流式分块大小对首包延迟-精度权衡、抗噪数据配比、方言/口音覆盖增益，这些未以论文形式公开。\n\n## 多模态预训练贡献\n宣称多模态预训练架构显著提升复杂声学环境抗干扰；若指与 AudioChat 共享表征，则识别与理解联合优化可能是其听懂能力来源，但缺乏可复现消融。",
    "limitation": "## 真实边界\n- 闭源商业 API，不可微调/自部署，指标依赖 AA 榜且口径特殊。\n- 内部结构、数据、训练细节未公开，学术可复现性低。\n- 实时低延迟与超高精度的兼顾在极长音频/超多方言混合时仍需验证。\n\n## 批判\nAA 榜 1.8% WER 虽亮眼，但该榜单的测试集构成、是否含长音频/强重叠语音、以及实时延迟的具体测量条件均未透明，存在为榜单优化的方法论风险。更关键的是，WER 1.8% 在短句/清晰语音上容易达成，而真实会议、电话、重叠说话的 WER 往往数倍于此；把实时榜第一直接等同于通用最强 ASR 是过度外推。作为闭源系统，社区无法独立验证其边界，建议以 HF Open ASR、AISHELL、方言专项等开放基准做交叉验证后再下结论。"
  },
  "seed_asr20": {
    "architecture": "## 设计动机\n豆包语音识别模型 2.0（Doubao-Seed-ASR-2.0，字节跳动，2025-12 发布）依托 Seed 混合专家（MoE）大语言模型架构，使命是让 ASR 从听清字进化到理解语境 + 看懂图。1.0 论文（arXiv 2407.04675）奠定了 LLM 式端到端架构。\n\n## 整体流水线\n音频侧是 20 亿参数的 LUISE（Large-scale Unsupervised Iterative Speech Encoder），类 BERT 的掩码预测自监督编码器，30 层、最佳语义表征在第 25 层输出、40ms 帧率。LUISE 经可学习转换器（connector）对齐到 Seed MoE LLM 的语义空间，训练策略为可学习编码器 + 可学习连接器 + 冻结 LLM，保留 LLM 推理能力。2.0 在 1.0 基础上强化：（1）PPO 强化学习做上下文推理；（2）多模态视觉消歧，输入单图/多图辅助识别易混淆词（如借画面判定滑鸡而非滑稽）；（3）Function Call 策略支持日/韩/德/法等 13 种外语。\n\n## 与之前 SOTA 的本质区别\n相对标准音频编码到 LLM 转写，Seed-ASR 2.0 的本质区别是上下文推理 + 视觉多模态：不依赖目标词历史出现，借对话/图片背景做逻辑推理锁定多音字地名；并把语言支持从中文/英/方言通过 Function Call 扩展到 13 外语。这是把 ASR 从单模态信号映射升级为多模态理解任务。",
    "training": "## 训练配方\nLUISE 用数千万小时级无监督语音做迭代固定分词器 + 掩码预测自监督；有监督阶段在 20M+ 小时语音上把编码器-连接器对齐到冻结 LLM。2.0 后训练引入 PPO，以深度理解泛化上下文为奖励，使模型无需热词历史即可动态识别；并构造图文对数据训练视觉消歧头。具体数据规模与奖励设计未完全公开（闭源）。\n\n## known_results 数字解读\nbatches.json 把 Seed-ASR 2.0 标为多任务基准综合居前。第三方实测（API）给出：AISHELL-1 CER 1.52%、AISHELL-2 2.77%、WenetSpeech Meeting 4.74%、四基准平均 3.69%；上下文整体关键词召回率较 1.0 提升 20%；提供毫秒级句级时间戳与说话人日志，流式延迟亚秒。需注意官方论文 AISHELL-1 为 0.68%，API 实测降到 1.52%，体现论文-服务差距；方言 19 集平均 15.39%，弱于 FireRedASR2-LLM。",
    "ablation": "## 关键消融与发现\n## 冻结 LLM 对齐策略\n1.0 论文核心选择是可学习编码器 + 可学习连接器 + 冻结 LLM，消融表明此策略在保留 LLM 语义与推理能力的同时高效对齐语音，避免从头训 LLM 的成本与灾难性遗忘。\n\n## 上下文推理 vs 热词\n2.0 用 PPO 替代依赖热词历史的老路：对比实验（如筠州案例）显示，纯上下文推理能在无历史出现时借背景锁定正确多音字，说明泛化上下文理解胜过显式热词表。\n\n## 视觉消歧增益\n图文联合评测（搜拍/图片创作场景）显示，引入图像后易混淆词（滑鸡/码头 vs 马头）识别错误显著下降，证明多模态输入确实修正了纯语音的同音歧义。",
    "limitation": "## 真实边界\n- 仅火山引擎 API，闭源不可自部署；注册需中国大陆手机号实名，国际开发者门槛高。\n- 方言 19 集平均 15.39%，四系统中最弱；无独立英文专项基准，跨语对比受限。\n- 论文-服务差距明显（AISHELL-1 0.68% 到 API 1.52%）；真实多源语音（短视频/直播）据称相对劣势 23.7%。\n\n## 批判\nSeed-ASR 2.0 的多模态视觉消歧虽新颖，但真实语音交互中用户未必总提供图像，看懂图是加分项而非常态能力，不应掩盖其纯语音方言弱的短板。更尖锐的是，上下文推理 + LLM 解码天然带来语义纠错幻觉，为通顺而改动词的风险在医疗/法律不容错；PPO 奖励若以上下文合理性为主，可能鼓励模型偏向语义流畅而非声学忠实。其论文 0.68% 与 API 1.52% 的落差也提示公开数字需以服务实测为锚。整体是强生产系统，但透明度与可复现性低，宜与开放模型交叉验证。"
  },
  "qwen3_asr": {
    "architecture": "## 设计动机与总体范式\n- 定位为音频语言模型(LALM)驱动的工业级 ASR：音频先经独立预训练的 AuT 编码器映射为高层语义表征，再条件化送入 Qwen3 LLM 自回归生成文本，天然复用 LLM 的世界知识与上下文建模，而非传统声学匹配。\n- 与 Qwen3-Omni 共享基座但做“音频特征提取”与“语义生成”解耦：AuT 编码器单独预训练，LLM 用现成 Qwen3 权重，避免重训庞大音频编码器。\n\n## AuT 音频编码器\n- AED（attention-encoder-decoder）结构：输入 100Hz FBank（128 维），含 32 层 Self-Attention + 下采样 Conv2d，做 8 倍下采样得到 12.5Hz token 率；AuT 解码器为 8 层 cross/self-attention。\n- 1.7B 版配 300M 参数、1024 隐层的 AuT；0.6B 版配 180M 参数、896 隐层，主打精度-效率平衡。\n- 关键创新是动态 FlashAttention 窗口（1s–8s）：同一权重既支持短 chunk 流式、也支持长 query 离线，无需模型切换或 chunk 拼接。\n\n## 强制对齐器与多任务\n- Qwen3-ForcedAligner-0.6B：首个基于 LLM 的非自回归(NAR)强制对齐器，可在词/句/段多粒度输出时间戳，摆脱 MFA/NeMo FA 对音素词典与单语的依赖。\n- 家族统一覆盖 52 种语言与方言（含 30 语、22 种汉语方言、全球英语口音），并具备歌声、强噪、复杂文本模式的鲁棒识别。",
    "training": "## 三阶段训练流水线\n- AuT 预训练：在 AED 框架下用约 4000 万小时伪标注 ASR 数据预训练编码器，提供在动态注意力窗口下稳定通用的音频表征。\n- Omni 预训练：以 Qwen3-Omni 为基座做多任务（音频/视觉/文本）训练，1.7B 与 0.6B 两版各训 3 万亿 token，获得多模态理解能力。\n- ASR SFT：用与预训练不相交的小规模多语种数据做格式/风格迁移；除标准中英多语数据外，还引入非语音数据、流式增强数据与 context biasing（上下文偏置/热词）数据。\n\n## 数据配方与目标\n- 损失为 AED 标准交叉熵 + LLM 自回归语言建模；SFT 刻意用小而干净且与预训练 disjoint 的数据，避免灾难性遗忘并提升指令/实体跟随。\n- 与已知结果呼应：batches.json 中 qwen3_asr 的 known_results 标注其在“多语种基准综合居前”。结合公开技术报告，1.7B 在开源 ASR 中达 SOTA、与 Whisper Large-v3 / Azure STT 等商用持平或局部更优，核心价值不在单一数字而在“精度+多语+流式离线统一+低延迟”的组合。",
    "ablation": "## 公开消融与数字解读\n- 规模对照：1.7B（SOTA 精度）vs 0.6B（最佳精度-效率权衡）。0.6B 在 128 并发下 1 秒可转录 2000 秒多语录音，TTFT 仅 92ms、RTF 0.064——证明动态注意力窗口与轻量 AuT 组合确实把长音频吞吐与首包延迟同时压到工业门槛内。\n- 动态窗口消融：1s–8s 窗口范围验证流式短 chunk 与 20 分钟单次离线推理可由同一权重覆盖，是“流式-离线统一推理”的关键证据。\n- 强制对齐消融：ForcedAligner 在词/句/段粒度对齐质量上对比 MFA/NFA 显示统一多语方案优势，弥补了公开 benchmark 饱和导致的区分失效。\n- 已知结果含义：brief 中“综合居前”应理解为多维度（多语、方言、鲁棒、延迟）综合领先，而非某单一 WER 数字；论文同时构建了含 16 种英语口音、22 方言、老人/儿童、极低 SNR 的内部鲁棒评测套件以支撑该结论。",
    "limitation": "## 真实边界\n- 自回归 LLM 解码带来随音频长度增长的推理成本，0.6B 虽高效但 1.7B 在端侧部署仍重。\n- 细粒度指标以官方发布为准，公开 benchmark 已趋饱和，需内部鲁棒集区分。\n- 强制对齐器仅 11 语，覆盖广度不及主 ASR 的 52 语。\n\n## 批判\n- “LALM 范式”叙事亮眼，但 1.7B 与主流 LLM-ASR 相比，增量创新主要在 AuT 编码器的动态窗口与 NAR 对齐器，核心识别仍依赖大规模伪标注 AED 预训练，本质仍是“强编码器 + LLM 解码”而非新范式突破。\n- 公开评测多来自官方，缺第三方盲测；“92ms TTFT / 128 并发”是理想 batch 配置下的峰值，真实长尾口音/方言的退化曲线未充分披露。\n- 对齐器与主模型解耦部署，生产链路需自行拼接 VAD/对齐，端到端工程成本被低估。"
  },
  "glm_asr": {
    "architecture": "## 双模型战略与整体架构\n- “一云一端”布局：云端 GLM-ASR-2512 追求极致精度（长语音/复杂语境），端侧 GLM-ASR-Nano-2512（1.5B）主打本地部署、隐私与低延迟。\n- 架构为端到端 Encoder-Decoder：编码器采用改进版 Conformer（CNN 局部特征 + Transformer 长程建模），并引入深度可分离卷积做轻量化；解码器为 Transformer Decoder，含因果注意力与编码器跨注意力。\n- 特征前端用 Mel 频谱 + SpecAugment（时间/频率掩码）增强泛化；并非 LLM 解码范式，而是“重感知、极致压缩、轻量推理”的非对称设计。\n\n## 多任务与鲁棒头\n- 支持 17 种语言，针对普通话、英语及粤语深度优化；输出含热词/自定义词典接口。\n- 设计理念强调“从真实场景往回推”：专门覆盖多噪声、多口音、低音量（耳语）与方言样本。",
    "training": "## 训练配方\n- 多语言混合训练：普通话/英语/粤语等混合，对方言等低资源数据用加权损失提权。\n- 低音量语音专项：构建 2000+ 小时轻声/不同分贝数据集，训练时用动态音量调整模拟真实音量变化。\n- 对齐手段：SFT + RL 对齐（据官方技术文档）以保输出质量；Nano 版在训练中显式覆盖嘈杂/重叠语音/会议场景。\n- 与已知结果呼应：brief 标注“中文场景综合良好”。公开数据显示云端版 GLM-ASR-2512 中文 CER 低至 0.0717（国际领先），端侧 Nano 平均 CER 4.10，属开源端侧 SOTA 区间。",
    "ablation": "## 数字与发现解读\n- 基准均值：GLM-ASR-Nano 在中文多基准平均 CER 4.10，显著优于 Whisper V3 的 6.93（同参数量级），证明中文特异性优化有效。分项为 Wenet Meeting 6.73、Aishell-1 1.81、Libri Clean 2.00、Libri Other 4.19、Fleurs EN 5.78。\n- 对照表中其平均 4.10 优于 FunAudio-ASR(4.73)、Whisper V3(6.93)，在开源端侧模型中为最低均值之一；云端 2512 版 CER 0.0717 则进入工业第一梯队。\n- 鲁棒性证据：官方展示粤语口语、中英 code-switch（如“我很 cool”）、低音量耳语、街道/咖啡馆噪声均能可靠转写，验证“真实场景回推”训练假设。\n- 已知结果含义：brief 中“综合良好”对应其强项在中文/方言/低音量，而非全语种的广度——它刻意不与 Whisper 在近百语上全面竞争。",
    "limitation": "## 真实边界\n- 语种以中文/英文为主（17 语），多语广度不及 Whisper / GPT-4o-Transcribe。\n- 非 LLM 范式，缺语言理解与指令跟随能力；长音频依赖外部 VAD 切分。\n- 云端版为闭源 API，细化指标以官方为准。\n\n## 批判\n- 命名易与“GLM 大模型”混淆，但本质是 Conformer + Transformer 的经典 AED，并非 GLM 文本 LLM 驱动，语义先验来自 Conformer 而非语言模型——与 Qwen3-ASR / StepAudio 的 LALM 路线有代差。\n- “4.10 平均 CER 优于 Whisper V3”的对照需注意：Whisper V3 参数量更大且为近百语通用模型，该对比对中文场景公平、对多语场景不公平，存在 selection bias。\n- 低音量/方言增益更多来自数据覆盖而非架构创新；端侧 1.5B 在极长会议上的流式与显存表现未充分披露，生产落地仍有工程缺口。"
  },
  "fun_asr": {
    "architecture": "## 多任务非自回归范式\n- SenseVoice 是 FunAudioLLM 的多模态语音基础模型，采用非自回归(NAR)、CTC 式编码器 + 多任务预测头，单次前向同时输出 ASR 文本、语种(LID)、情感(SER)、音频事件(AED)与 ITN。\n- 编码器用 SANM（Streaming Attention plus FSMN）混合块：多头自注意力 + 前馈序列记忆网络(FSMN) 的逐深度 1D 卷积，兼顾长程依赖与流式友好。\n- 据公开实现，SenseVoice-Small 用 4 头、80 维输入、256 隐层、FFN 2048、FSMN 卷积核 11；支持 rich-text 标签输出（如 [zh][happy][bgm]…）。\n\n## 多语言与富标签\n- 训练数据 40 万+ 小时，支持 50+ 语言（Small 主覆盖中/粤/英/日/韩五语，Large 更强）。\n- 本质区别于 Whisper：Whisper 仅 ASR 且自回归慢；SenseVoice 把情感/事件检测内建进同一次 NAR 推理，省去级联多个模型。",
    "training": "## 训练配方\n- 大规模多语 + 富标签联合训练：ASR/LID/SER/AED/ITN 多任务共享编码器表征，各任务头从不同投影分支输出。\n- 数据混合以中英日韩为主、覆盖 50+ 语；非自回归目标使其推理比 Whisper-Large 快约 15 倍。\n- 与已知结果呼应：brief 标注“多语种+富标签 综合可用”。SenseVoice 的卖点正是“一个模型同时给转写+语种+情感+事件”，并在社区被广泛采用（FunASR 工具箱开源、可商用）。",
    "ablation": "## 数字与发现解读\n- 速度消融：非自回归带来约 5×（vs Whisper-Small）、15×（vs Whisper-Large）的推理加速，是其在实时/批量场景落地的核心增益。\n- 多任务权衡：论文/文档强调富标签任务（情感/事件）作为辅助信号与主 ASR 联合训练，未报告显著的主任务精度损失，证明其多任务头可“免费”附带而不拖累识别。\n- 已知结果含义：brief 中“综合可用”应理解为——绝对 CER 不及大模型 LLM-ASR，但“识别+情感+事件+ITN 一体化 + 高速 + 开源可商用”的组合使其在工业落地中性价比突出。",
    "limitation": "## 真实边界\n- 绝对识别精度不及 LLM 系大模型（如 Qwen3-ASR、Seed-ASR）；情感/事件标签质量依赖标注数据。\n- 富标签仅覆盖有限情感类别与少量事件类型，细粒度表现有限。\n- Small 版仅 5 语强覆盖，其余语种为弱覆盖。\n\n## 批判\n- “多任务一体化”叙事有吸引力，但情感/事件标签本质是分类头，对主 ASR 的增益有限，更多是产品卖点而非精度突破。\n- 40 万小时训练量在 2026 年已不占优，对比 Qwen3-ASR 的 4000 万小时伪标注、Luna 的 100 万小时，其数据规模劣势会直接反映在噪声/方言鲁棒性上。\n- 非自回归 CTC 式结构在极低资源语种与强口音上的上限低于强 LLM 解码，定位应是“轻量工业组件”而非“旗舰 ASR”。"
  },
  "elevenlabs_scribe2": {
    "architecture": "## 两模型架构（闭源）\n- Scribe v2 分为 Batch（长音频/字幕/标点，重精度）与 Realtime（对话式 AI/语音代理，重延迟）两个专用模型，均支持 90+ 语言自动检测与 code-switching。\n- Realtime 采用“预测式转写(predictive transcription)”：基于上下文预判后续词与标点并流式推送部分结果，而非等待完整语句，将感知延迟压到 150ms 内（优化配置 30–80ms）。\n- 后处理流水线含说话人分离（最多 48 说话人）、词级时间戳、动态音频事件标签（笑声/掌声/音乐）、实体检测（56 类 PII/健康/支付）、keyterm 提示（最多 1000 领域词）与多通道（5 通道）独立转写。\n\n## 工程化差异点\n- 产品体验取胜：零保留模式、SOC2/ISO27001/PCI DSS/HIPAA/GDPR 合规、EU/印度数据驻留；非公开模型权重，不可微调。\n- 与开源 LLM-ASR 的本质区别：用闭源大模型 + 企业级后处理 + 合规把“可用转写”做成“可编辑、可合规、可部署”的产品。",
    "training": "## 训练配方（公开有限）\n- 大规模多语数据 + 企业场景调优；具体架构/损失/数据规模未公开（闭源商业）。\n- 强化能力来自后处理与提示工程（keyterm、entity detection、diarization）而非公开的对齐训练细节。\n- 与已知结果呼应：brief 标注“企业场景 精度/易用性 领先”。官方宣称 Scribe v2 在行业标准 benchmark 上取得最低 WER，多语 benchmark 达 93.5% 准确率，优于 Whisper / Gemini Flash / Deepgram。",
    "ablation": "## 数字与发现解读\n- 多语精度：官方称 Scribe v2 Realtime 在 FLEURS 30 语上取得低延迟 ASR 中最低 WER，并在数百条含差音质/多口音/填充词的英语对话内部集上意图捕捉更准确。\n- 功能指标：>95% 总准确率、90+ 语、48 说话人分离、56 类实体、最多 1000 keyterm、Realtime <150ms（优化 30–80ms）。\n- 已知结果含义：brief 中“精度/易用性领先”对应其在企业 pipeline（字幕/合规/代理）的一站式能力，而非单一开源榜单数字；其“领先”多由官方 benchmark 支撑，需第三方盲测交叉验证。",
    "limitation": "## 真实边界\n- 闭源付费 API，不可复现、不可微调、不可私有化（除非零保留模式）。\n- 具体模型架构、数据规模、训练目标均未公开，无法做学术复现或公平横评。\n- 长尾语种与极端口音的真实表现依赖官方口径。\n\n## 批判\n- “最低 WER”多为官方自报，缺乏与同代开源 LLM-ASR（如 Qwen3-ASR 1.7B、GLM-ASR-2512）在一致协议下的第三方对比，存在 vendor benchmark 偏差。\n- 48 说话人分离、56 类实体等是后处理/工程能力，不等于核心声学模型突破；其价格与闭源锁定对企业是长期成本与 vendor lock-in 风险。\n- 作为评测者，我更看重其在一致测试集上的可复现 WER，而非营销口径的“领先”。"
  },
  "qwen_audio_tts": {
    "architecture": "## 12.5Hz 低帧率分词器\n- 采用 12.5Hz 有监督语音分词器：因果编码器 + 10 维 Finite Scalar Quantization(FSQ) 瓶颈（每维 3 级，词表 3^10 = 59049），将帧率较上一代减半，大幅降低自回归解码成本。\n- 分词器用多任务监督（ASR/LID/说话人分析 SA 等）训练，使离散 token 同时承载语义与声学信息，缓解量化丢信息。\n\n## 混合生成栈：LM + Flow-Matching\n- 继承 CosyVoice2/3 的“语义规划 + 连续声学渲染”混合范式，但关键改进是 FM 声学渲染器以 LM 的连续隐状态（而非仅离散 token）为条件，打通 token-only 接口的信息瓶颈。\n- 控制通过自由自然语言指令 + 细粒度行内标签实现，支持 16 语、20 个汉语方言区、单次最长 3 分钟长音频、以及噪声/混响/不清参考语音的鲁棒合成。",
    "training": "## 五阶段渐进训练\n- 阶段一：LM 与 FM 独立预训练（LM 学文本到 token，FM 学 token 到音频重建）。\n- 阶段二：联合训练，FM 以 LM 连续隐状态为条件 + 高质量数据退火(data annealing)，从广域混合逐步切到精选高表现力子集。\n- 阶段三：LM 强化学习，用 GRPO，复合奖励 R_total = w_c R_asr + w_d R_dur + w_v R_div + w_p R_pros（内容/时长/多样性/韵律），并含可微纠错分支降低节奏与语调错误。\n- 阶段四：FM 声学鲁棒训练，对参考语音加噪/丢包/麦克风响应增广，让模型内部分离去噪去混响。\n- 阶段五：FM 强化学习 FlowTTS-GRPO，奖励 R_fm = w_s R_ss + w_a R_asr + w_q R_mos（说话人相似度/内容/神经 MOS）。\n- 与已知结果呼应：brief 标注其在 Artificial Analysis TTS Leaderboard 排名 #1，并在 SEED-TTS-Eval/CV3-Eval/指令跟随/长音频/声学鲁棒多维度达 SOTA 或最强综合——这正对应五阶段中 LM-RL（内容/韵律）与 FM-RL（相似度/音质）的双 RL 塑形目标。",
    "ablation": "## 数字与发现解读\n- 分词器权衡：12.5Hz + 59049 大词表在“减半帧率”的同时保住内容与说话人信息，是延迟下降而不崩质量的关键；若直接用更低帧率/小词表，内容 CER 会显著恶化。\n- 五阶段贡献：联合训练中“以 LM 连续隐状态条件化 FM”相对仅用离散 token 的 CosyVoice 系，改善信息瓶颈；LM-RL 的 R_pros/R_dur 直接压低节奏/语调错误，FM-RL 的 R_ss/R_mos 提升克隆保真与听感。\n- 鲁棒训练收益：阶段四增广让不清参考语音仍能产出干净音频，对应 brief 中“声学鲁棒”维度的强表现。\n- 已知结果含义：AA 榜 #1 与多基准 SOTA 是“低帧率分词 + 双 RL 塑形 + 数据退火”协同的结果，而非单点创新。",
    "limitation": "## 真实边界\n- 生产系统，轻量级部署与极端低资源语种仍是工程挑战；细粒度可控边界未完全公开。\n- 仍需外部时长/流式调度；长音频一次性 3 分钟对超长内容需分段。\n\n## 批判\n- 论文头条“多维度 SOTA”中，指令跟随维度的证据最弱：440 例指令跟随基准若以 LLM-as-judge 为主判据，需人工重测确认；Pith 评审也指出其 SOTA 声明比自身表格强一档。\n- 12.5Hz 分词器把量化压力压到 59049 大词表，带来码本利用与采样复杂度上升；“连续隐状态条件化 FM”虽缓解瓶颈，却也模糊了“离散 token 接口”的可解释性，不利调试。\n- 作为 reviewer，我建议把指令跟随与方言真实度交给母语者盲评，而非仅依赖自动指标与 LLM 评审。"
  },
  "luna_tts": {
    "architecture": "## 从文本 LLM 渐进改造的扩散 LM\n- 核心是把现成自回归文本 LLM（Qwen3-0.6B）逐步改造成语音扩散模型：causal 到 bidirectional 再到 block-causal，同一 0.6B 骨架、同一 tokenizer/数据管线，得出全并行(Luna-TTS)与块流式(Luna-TTS Realtime)两变体。\n- 自研 Luna-Codec：因果 RVQ，24kHz 语音编码为 25Hz token 网格，8 层 codebook × 2048 词表，约 200 token/秒、等效码率 2.2 kbps；第一层 codebook 用 WavLM 蒸馏做“语义锚定”，把语言内容塞进前几层。\n- 扩散机制为 absorbing-state 离散掩码扩散（同 LLaDA/MaskGCT）：前向独立随机掩码每个网格位置，训练时一次性并行恢复所有被遮罩位置。\n\n## 两档解码\n- Luna-TTS：固定 S 步（实测 16 步）并行细化整张 RVQ 网格，零样本克隆与语音编辑天然是 in-filling（参考网格摆在序列中、目标区即被遮部分）。\n- Luna-TTS Realtime：32 帧(1.28s)块间自回归、块内并行去噪，KV-cache 块级生成 + 增量音频投递；块因果是训练时学进去的生成行为而非推理才套 mask。",
    "training": "## 数据四阶段与训练流水线\n- 数据：约 100 万小时中英日韩（中 43.4%/英 43.1%/日 6.7%/韩 6.9%），四阶段流水线（切割到标准化/LID 到主 ASR+强制对齐到质量过滤+第二 ASR 交叉验证），用时长预测器（另一 Qwen3-0.6B，双向）独立定帧数 T，顺带获得语速连续调节。\n- 训练：foundation pretrain（约 100B packed token，余弦退火）到 高质量 annealing（约 10 万小时精选再训 1 epoch）到 表达性持续训练（情绪/非语言发声 NVV 标签走文本侧条件通道）到 block adaptation（约 2 万步出 Realtime）。\n- RL：GRPO 轨迹级策略优化，把去噪轨迹中每步实际采样决策当动作算策略比值（rollout/replay 用同一 CFG 采样避免自欺），奖励为组内相对词典序（先比内容准确率，再比说话人相似度）。\n- 与已知结果呼应：brief 标注其在 Seed-TTS-Eval 多项达 SOTA/最强综合，这正是 1M 小时数据 + 渐进改造 + GRPO（把 WER/SIM 直接变梯度）共同作用的产物。",
    "ablation": "## 数字与发现解读\n- Seed-TTS-Eval（2020 中 + 1088 英，CER 用 Paraformer-zh、WER 用 Whisper-large-v3、SIM 用 WavLM-large）：Luna-TTS 四项全第一——中文 CER 0.73（vs MiniMax-Speech 0.83、同协议重评 Qwen3-TTS 0.98）、英文 WER 1.49（vs Qwen-Audio-3.0-TTS 1.54）、中/英 SIM 79.7/76.8 双最高。说明全并行扩散在零样本克隆的内容与音色上都压过 AR 商用系统。\n- CV3-Eval（更难野外）：最低中/英错误率 3.17/3.18，困难子集 6.90/6.18，四语平均 4.32（仅比 Qwen-Audio-3.0-TTS 差 0.15）；短板在韩语 CER 5.93（语料仅 6.9%）。\n- Realtime 代价：Seed-TTS-Eval 上约换掉 0.3 点 CER/WER 与 3 点 SIM（中 1.08 CER/76.9 SIM），但困难子集差距被拉大（hard-zh 12.56 vs 6.90）——因为块一旦提交不可反悔，早期错误持续污染后续块，而全并行版可在全局细化中回头修。\n- 推理性能：Luna-TTS 16 步 RTF 0.0211、整句 216ms；Realtime 8 步双卡 CFG 首包 41.6ms、10.6s 音频 254ms 出完(RTF 0.0240)。",
    "limitation": "## 真实边界\n- NAR 并行生成对极长句的一致性与细粒度可控仍有上限；Realtime 引入块级 AR，严格非完全 NAR，且块提交不可变带来困难子集退化。\n- 韩语等低占比语种质量受限；需外部时长预测器。\n- 0.6B 容量下超复杂韵律/跨语种迁移不及更大模型。\n\n## 批判\n- 四项全第一的协议依赖冻结的 Paraformer/Whisper/WavLM 作为判据，这些代理指标是否等价于人类听感仍有争议；Pith 评审指出假设未单独测量 cross-ASR 过滤对 benchmark 的偏向。\n- “从文本 LLM 改造”路径很优雅，但 bidirectional/block-causal 改造使推理需特殊注意力掩码与 KV 管理，工程化复杂度高于标准 AR；迭代去噪的延迟优势只在并行硬件上成立，纯 CPU 端侧未必快。\n- 作为评审，我认为其真正贡献是“证明 AR 文本 LLM 可零样本改造成生产级扩散 TTS”，而非指标绝对值；建议补充人类 MOS 与困难长音频的一致性强测。"
  },
  "zonos2": {
    "architecture": "## 开源首个 MoE TTS 主干\n- decoder-only Transformer + 稀疏 MoE 主干：总参 8B、激活仅 900M，路由设计沿用 Zyphra ZAYA 系 MoE++，结合 Grouped Query Attention；用高保真 DAC codec 直接预测 44.1kHz 离散 token。\n- 文本用原始 UTF-8 字节 tokenization（非音素化），支持分层语种覆盖与句中 code-switching，降低对语言特定音素化的依赖。\n- 采用 delay pattern（多 codebook 并行生成，重叠不同时间步的 codebook）提升生成效率；并配 voice cloning（stable/expressive 两模式）、speaking-rate 与 Quality Mode 等条件控制。\n\n## 说话人条件化\n- 两阶段退火处理说话人嵌入：含 LDA 投影 + 声学增广；零样本克隆无需说话人标签、无需克隆目标转写、支持不限长 utterance。",
    "training": "## 数据与两阶段退火\n- 训练语料从 Zonos-v0.1 的 20 万小时扩展到 6M+ 小时多语，新数据管线 + 集成 ASR 过滤提升鲁棒与语种多样性；多阶段清洗在预训练/中期/退火逐步抬高文音对齐过滤阈值以减少幻觉/漏读/重复。\n- 与已知结果呼应：brief 标注其在自研 ZTTS1-Eval 上质量/相似度/WER 达“竞争性 SOTA 并保持良好流式延迟”。这对应 8B MoE（容量）+ 6M 小时（数据）+ 两阶段说话人退火（保真）的协同，且 MoE 小前向 footprint 保住实时流式。",
    "ablation": "## 数字与发现解读\n- 规模与数据缩放：1.6B 到 8B 总参(激活 900M) 把自然度/克隆保真推到 SOTA 区间；200K 到 6M 小时（约 707 年音频）是质量跃升的主因之一，配合 ensemble ASR 过滤降低错读。\n- MoE 收益：稀疏激活使 8B 容量在实时流式下仍可接受延迟，是“质量-延迟”帕累托的关键；但音频 token 的专家均衡仍是稳定性挑战（论文自陈）。\n- ZTTS1-Eval（自研，9 语干净 + 17 语野外，更新打分模型并加入韵律 TTSDS2 与多样性 DS-WED 指标）：ZONOS2 在质量(UTMOS)/说话人相似度具竞争性，Quality Mode 改善野外自发语音的可懂度(WER)，并在英文子集上韵律(TTSDS2)与生成多样性(DS-WED)显著更高。\n- 已知结果含义：brief 中“竞争性 SOTA”应理解为——它不追求单点第一，而在质量/相似度/多语/延迟/多样性上全面强，尤其韵律与多样性指标领先；与 Seed-TTS-Eval/CosyVoice3-Eval 同样具竞争性。",
    "limitation": "## 真实边界\n- 8B 总参仍偏大，MoE 路由在边缘设备支持有限；部分指标与顶级商业系统持平而非领先。\n- 自研 ZTTS1-Eval 由厂商发布，与外部基准存在口径差异；一次性最长 1 分钟生成限制长内容需分段。\n- DAC 44.1kHz 高码率 token 带来更大建模难度，需靠规模与数据补偿稳定性。\n\n## 批判\n- “首个开源 MoE TTS”是真实架构贡献，但 8B 总参/900M 激活的 MoE 在端侧价值有限，更像“用规模换质量”而非架构效率革命；专家均衡不稳定的自陈问题暗示训练稳定性仍有代价。\n- ZTTS1-Eval 由同一团队发布，虽有 9/17 语覆盖与更新打分模型，但仍是 vendor benchmark，与外部 CV3/Seed 的横向可比性需第三方复现。\n- 字节级输入虽提升多语鲁棒，却增加序列长度与首包成本；建议补充在一致协议下与 Luna-TTS / Qwen-Audio-3.0-TTS 的盲测 MOS 与延迟对照。"
  },
  "omnivoice": {
    "architecture": "## 单阶段离散 NAR 扩散 LM\n- 核心创新是直接把文本映射到多 codebook 声学 token，跳过传统“文本到语义到声学”两阶段级联，避免语义阶段错误不可恢复与低比特语义丢细节。\n- 骨干为双向 Transformer，用 Qwen3-0.6B 权重初始化（0.8B 量级），推理用双向注意力；C 个 codebook 各有独立 embedding 与预测头，训练损失仅在被遮罩的声学位置计算。\n\n## 全码本随机掩码\n- 训练时对每个 (时间, codebook) 位置独立按 Bernoulli 采样掩码，约 50% 位置贡献损失，比逐层(layer-wise)掩码监督密度高 C 倍，显著加速收敛与提升多样性。\n- 参考音频前缀作为 prompt 段与目标段一起参与掩码重建，天然支持零样本克隆、音色设计(Auto Voice/指令描述)与细粒度副语言控制（[laughter]、拼音声调、CMU 音素）。",
    "training": "## 数据与前训练假设\n- 581k 小时多语数据，完全来自 50+ 开源数据集，覆盖 600+ 语言（含大量低资源/濒危语），是迄今覆盖最广的零样本 TTS。\n- 关键训练假设：从预训练 LLM 初始化以继承语言先验，解决单阶段离散 NAR 历史性的“可懂度瓶颈”——消融表明无 LLM 初始化时，调学习率也无法弥补可懂度缺口。\n- 与已知结果呼应：brief 标注“中/英/多语种基准综合 SOTA、覆盖广度迄今最大”。这正对应 600+ 语覆盖 + 全码本掩码（高效收敛）+ LLM 初始化（保可懂度）的三位一体设计。",
    "ablation": "## 数字与发现解读\n- 覆盖与可懂度：在 102 语基准达 SOTA 可懂度/相似度/自然度；社区实测中文 WER 约 0.84%、英文 WER 1.57%，PyTorch 推理 RTF 低至 0.025（约 40 倍实时）。\n- 全码本掩码消融：对比逐层掩码，独立按位置 Bernoulli 掩码使每 batch 有效预测数约增 C 倍，收敛更快、生成多样性更高（论文消融支持）。\n- LLM 初始化消融：无 LLM 初始化时，无论怎么调学习率都补不回可懂度缺口，证明语言先验必须从 LLM 直接继承而非从 TTS 数据重学。\n- 已知结果含义：brief 中“覆盖广度最大”是核心差异化（646 语 vs CosyVoice 10+、Fish-Speech 10+、VibeVoice 20+ 的数量级优势）；“综合 SOTA”主要指多语/低资源场景，而非单一英/中 clean 集的绝对第一。",
    "limitation": "## 真实边界\n- 600+ 语中大量低资源/濒危语质量有限，覆盖不等于高质量；直接映射对极高保真克隆可能弱于两阶段系统。\n- 双向 Transformer 推理需全序列注意力，超长音频显存/延迟上升；RTF 0.025 依赖 PyTorch 与 GPU。\n- Apache-2.0 开源，但 0.8B 容量下极复杂韵律不及更大模型。\n\n## 批判\n- “600+ 语 SOTA”需冷静看待：低资源语多无可靠参考基准，其“SOTA”常是在自身构建或弱参考下成立；在英/中 clean 集上它未必优于 Luna-TTS / Qwen-Audio-3.0-TTS 等专精系统。\n- 单阶段直接映射虽简洁，但声学细节还原依赖 RVQ 多 codebook 质量，跨语言克隆时音色/口音耦合可能不如两阶段解耦干净；双向注意力也牺牲了天然流式。\n- 作为评审，我肯定其“开源+极广覆盖+LLM 初始化”的工程与普惠价值，但建议补充母语者盲测以验证低资源语的真实自然度，而非仅以 WER 代理。"
  },
  "fun_realtime_tts": {
    "architecture": "## 设计动机\n面对实时语音交互中“高自然度”与“极速响应”难以兼得的矛盾，阿里 Fun-Realtime-TTS 将语音合成做成端到端流式系统，目标是毫秒级首包延迟下输出接近真人语调的语音，服务于智能汽车、数字人直播、实时翻译与客服等强时效场景。\n\n## 整体流水线（双流式架构）\n采用 bi-streaming（双向流式）设计：文本 token 流入与音频波形流出双向流式并行，文本边到达边生成音频，首包延迟可低至约 128–150ms（据官方报道及 Preview 实测），较传统方案合成速度提升约 5 倍。据推测其主干沿用 FunAudioLLM 家族的 LLM 式 codec 生成路线（文本/说话人条件 → 语义 token → flow-matching 声学头/声码器），并通过流式 chunk 解码与动态注意力控制声调韵律。\n\n## 关键能力\n- 支持 30+ 语言、7 大汉语方言族、20+ 地区口音，覆盖中文复杂方言语调。\n- 指令跟随控制韵律、情绪与音色（instruction-following prosody/emotion/timbre）。\n- 与同族 Fun-Realtime-ASR、Chat 共享基座，形成三赛道（ASR/TTS/Chat）综合布局。",
    "training": "## 数据与训练哲学\n闭源商业模型，公开训练配方细节有限。据推测采用大规模多语种/多方言语音数据与指令跟随数据训练，并以 Artificial Analysis Speech Arena 盲测 Elo 为优化目标（即人类偏好对齐），而非单纯追求客观指标。\n\n## 实时化训练目标\n通过动态注意力机制与流式解码约束，训练模型在极低首包延迟下保持声调与韵律正确性；合成速度与延迟被作为显式优化项。\n\n## batches.json 数字解读\n- 已知结果：Artificial Analysis TTS 榜单 Elo = 1190，全球第 5、国产第一（Preview 版本；后续正式版在 962 次 arena 出现中以 Elo 1219 登顶）。Elo 是基于盲测成对人类偏好的排序分，1190 表明在真实听感偏好上显著优于多数商业与开源系统，但需结合榜单口径（覆盖客服、知识分享、数字助手等真实场景，且 Top5 仅差约 24 Elo，竞争高度胶着）谨慎解读，不能直接换算为 WER/SIM 等客观指标。",
    "ablation": "## 公开消融情况\n阿里未公开独立的架构消融论文；其卖点主要来自第三方盲评榜表现，差异来源据推测为双流式延迟工程、动态注意力韵律控制与大规模方言/口音数据，而非单点结构创新。\n\n## 数字解读\n- Elo 1190（全球第 5）：相比同批国产模型 StepAudio 2.5 TTS（约 1187，第 6），差距极小，说明国产实时 TTS 在听感质量上已进入同一梯队；相对 ElevenLabs、Cartesia 等垂直强项系统在情感/克隆上仍有被追赶空间（此为基于榜单位置的推断，非官方结论）。",
    "limitation": "## 真实边界\n- 闭源商业 API，权重不可得、不可微调、不可本地复现，结果依赖阿里云部署与计费。\n- 榜单口径（Artificial Analysis Speech Arena）与 HF 开放榜不同，跨榜横评需谨慎；Top5 仅差约 24 Elo，排名波动敏感。\n- 官方自述“自然度 97%”与真人仍有感知差距；嘈杂环境鲁棒性与成本压缩到大规模商用水平仍是开放问题。\n\n## 批判\n作为评审，我认为 Fun-Realtime-TTS 的核心价值在于“工程化实时流式 + 大模型基座”的工业落地，而非方法学创新。其 Elo 优势部分来自评测场景与样本分布，且闭源使社区无法验证延迟/质量声明；Preview 版本的稳定性与产品化程度仍需真实部署检验。建议读者把 Elo 视作“相对偏好排序”而非绝对质量标尺，结合具体语种/口音子集与自有数据二次验证。"
  },
  "stepaudio25_tts": {
    "architecture": "## 设计动机\nStepAudio 2.5 的核心命题是：一旦文本与音频共享良好塑造的表征空间，任务差异就从“架构”下沉到“运行域”（数据、优化目标、解码约束）。TTS 分支因此不独立设计，而是复用统一 audio-language 骨干。\n\n## 整体流水线\n共享 backbone 为 frozen audio encoder → lightweight adaptor → LLM decoder（从文本 MoE LLM 初始化）。TTS 分支彻底去掉 encoder-adapter，仅依赖 LLM 解码器，把音频 token 当作“新语言”，语音合成被重述为纯 next-token prediction（NTP）。这与 ASR/Realtime 分支共享同一多模态先验。\n\n## 关键模块与解码\n- 文本 + 控制指令（全局/内联）条件化解码器，生成音频 token 序列。\n- 与 ASR 的 MTP-5 验证式多 token 解码不同，TTS 强调表达力而非用词正确，故用 top-k/top-p + temperature 或受约束的指令跟随采样。\n- 本质区别：相较专用 TTS（如 CosyVoice 的 LLM+扩散两阶段），StepAudio 2.5 TTS 不引入独立声学扩散头，而是把 TTS 作为统一 LLM 的一类输出空间。",
    "training": "## 预训练基础\n从文本 MoE LLM 初始化，在 2.2T token（800B 文本 + 800B 语音主训练 + 600B 高质量 cooldown，序列长度 16K→32K）上持续预训练；课程为对齐阶段→主预训练→冷却阶段，cooldown 引入 Audio Caption 与 Instruct TTS 数据。\n\n## TTS SFT（两阶段零样本克隆）\n- 阶段一：大规模零样本 TTS + 全局指令监督，学习说话人特征、风格、整体韵律的粗粒度控制。\n- 阶段二：高质量内部数据（全局+内联指令），用 Emotional-Context-Speech 管线（Whisper-Large-v3 转录 + MFA 对齐，离散化 F0/语速/停顿/频谱质心/RMS/MFCC 方差/HNR 等韵律特征 → 标注 LLM）产出细粒度监督。\n\n## RLHF（生成式奖励模型）\n采用生成式奖励模型（GRM）做偏好对齐：对同一 prompt 的候选 y 与参考 y* 做配对评估，输出偏好得分并 reward-shaping 为 PPO 标量奖励 + KL 正则。这是替代标量 MOS 奖励、缓解 reward hacking 的关键。\n\n## batches.json 数字解读\n- 已知结果：标准 TTS 基准综合 SOTA。论文报告 TTS Arena（774 条 prompt，与 MiniMax-2.8-HD、ElevenLabs-v3、Gemini-3.1-Flash-TTS 配对）整体胜率 67.6%，各子项均正向领先。该数字非 CER/SIM，而是 arena 式人类成对偏好胜率，反映“自然度+可控性”综合听感优于三大强基线。",
    "ablation": "## 消融与关键发现\n- 客观指标偏差论证：论文指出 CER/说话人相似度/MOS 对 LLM 式 TTS 均有偏，故采用 arena 成对偏好评测，这是方法论层面的关键选择。\n- 预训练配比验证：2.2T 三阶段配方中，cooldown 引入长上下文（32K）与 TTS/Audio Caption 数据对各任务均有提升。\n- MTP-5 在 ASR 侧的精度-效率：AISHELL-1 CER 从 0.79% 降至 0.71%（精度反而提升），说明两阶段 MTP 训练消除了分支引入的表示偏差（此项虽属 ASR，但验证了“统一骨干 + 运行域专化”的可行性）。\n\n## 数字解读\n- TTS Arena 67.6% 胜率：在 774 条 prompt 上对三个领先可控生成模型的综合胜率，表明统一 LLM 经偏好 RLHF 后，在表达力与自然度上可匹敌甚至超过专用 TTS；但评测用内部 prompt 与自选评估者，第三方独立复现存在难度。",
    "limitation": "## 真实边界\n- 统一基座规模大、部署重；作为技术报告，细粒度模块消融与开源权重完整性有限（代码未完整开源）。\n- TTS 的 arena 评测为内部 774 条 prompt 与自建评估者，外部独立验证有难度；RTF/延迟未给出明确硬件配置。\n- 单一 LLM 生成音频 token，长音频一致性与极长序列仍有上限。\n\n## 批判\n评审视角：StepAudio 2.5 最大贡献不在单点技术，而在“运营专化”范式的成立验证——同一骨干通过数据/目标/解码三维差异在三条赛道同时达 SOTA，对工业团队极具参考价值。批判点有三：(1) 三赛道评测多为自建体系，跨机构可比性弱；(2) MTP 提速的 RTF 缺乏统一硬件基准；(3) 生成式奖励模型的偏好数据收集成本高、难规模化，且偏好可能过拟合于评审群体。GRM 替代标量奖励的思路值得移植到 TTS/实时，但“统一即最优”的论断在超低延迟端侧场景未必成立。"
  },
  "wavtts": {
    "architecture": "## 设计动机\n主流零样本 TTS 依赖 VAE 潜空间或 mel 频谱等压缩表征，虽提升效率却带来信息损失与非端到端训练。WavTTS 主张直接建模原始波形以消除中间表征损失，但原始波形序列极长（16kHz 下每秒 16000 样本），被视为难以扩展。WavTTS 是首个在波形空间逼近 SOTA 潜空间生成模型的原始波形 TTS。\n\n## 整体流水线\n基于 flow matching + Diffusion Transformer（DiT）。文本由 ConvNeXt V2 编码器编码，token 经 padding 对齐到音频 patch 长度，由 DiT 在隐式对齐下做语音填充（speech-infilling）实现零样本克隆：给定上下文音频与文本，预测被掩掉的波形段。\n\n## 关键模块\n- 波形 patchification：将 1D 波形切分为非重叠 patch，交由 DiT 处理，解决超长序列计算难题。\n- x-prediction 目标：直接预测干净波形 x1（而非速度 v），配合 flow matching 损失 L_FM = E[||x_theta - x1||^2 / (1-t)]，稳定高维空间训练。\n- 多尺度 mel 频谱监督：提供感知引导，加速收敛并提升质量。\n- 信号-噪声方差对齐 + 噪声偏移时间调度：训练与推理均把调度推向高噪声区间，显著提升鲁棒性、自然度与可懂度。\n\n## 本质区别\n相较 Latent Diffusion（VAE 潜空间）与 Mel Diffusion（丢相位），WavTTS 在时域 lossless 波形上做端到端生成，省去预训练 codec/声码器，挑战“高质量 TTS 必须依赖中间声学特征或离散 token”的假设。",
    "training": "## 训练目标\n- 主损失为 flow matching（rectified flow，直线路径 x_t = (1-t)x0 + t x1），采用 x-prediction。\n- 辅助损失为多尺度 mel 频谱重建监督，作为感知正则。\n\n## 数据与缩放\n论文做了缩放分析，指出大规模数据 + 匹配模型容量是释放高维波形建模潜力的关键；并与 STFT/MDCT 等无损表征对比，证明直接时域生成的简洁有效。\n\n## batches.json 数字解读\n- 已知结果：开源基准上质量逼近当前 SOTA 潜空间零样本 TTS，且显著优于此前端到端语音生成模型。该结论为相对排序（无单一精确指标给出），强调“首次让原始波形模型接近潜空间 SOTA”，即缩小了端到端波形生成与两阶段潜空间模型的质量鸿沟，而非在某具体 CER/SIM 上夺冠。",
    "ablation": "## 消融与关键发现\n- 预测目标消融：x-prediction 优于速度/噪声预测，在高维波形空间更稳定。\n- 噪声调度消融：信号-噪声方差对齐 + 偏向高噪声区间的 time schedule 显著提升自然度与可懂度（核心发现之一）。\n- patchification 粒度：非重叠 patch 是可行且必要的序列压缩手段。\n- 多尺度 mel 监督贡献：提供感知引导、加速收敛、改善质量。\n- 表征对比：直接时域生成优于 STFT/MDCT 等无损中间表征的复杂度/效果权衡。\n\n## 数字解读\n- 论文没有给出单一夺冠数字，其贡献指标是“相对此前端到端模型大幅领先、相对 SOTA 潜空间模型接近”。读者应理解为：WavTTS 把波形扩散的质量天花板抬到可与 Latent/Mel 扩散媲美的区间，验证了端到端波形生成的可行性方向。",
    "limitation": "## 真实边界\n- 原始波形序列极长，计算/显存成本高于潜空间模型；长音频生成效率仍是瓶颈。\n- patchification 虽降序列长度，但采样步数与高分辨率仍带来推理开销。\n- 零样本克隆依赖 speech-infilling 上下文，对极短参考或高噪参考的鲁棒性未充分验证。\n\n## 批判\n评审视角：WavTTS 的方法学价值高——它用极简设计（patchify + x-pred + mel 监督 + 噪声调度）证明“端到端波形扩散”可行，对后续免 codec TTS 有启示。批判点：(1) “逼近 SOTA”仍暗示与潜空间模型存在质量差，端到端未必更优，只是范式更简洁；(2) 波形空间的高计算成本使其在实时/端侧短期不具竞争力；(3) 缺乏与 VoxCPM2、LongCat-AudioDiT 等连续潜空间免 token 方案的同等算力对比，结论外推需谨慎。"
  },
  "longcat_audiodit": {
    "architecture": "## 设计动机\n主流 TTS 受困于“预测中间声学特征（mel）+ 独立声码器”的两阶段范式，跨空间传话必然累积误差、丢失高保真个性细节——而这恰是零样本克隆最需保留的。LongCat-AudioDiT 直接在波形潜空间生成，仅用 Wav-VAE + 扩散主干，规避中间表征衰减。\n\n## 整体流水线（单阶段）\n输入文本 token（UMT5-base，支持 107 语，首层+末层 embedding 融合以提升可懂度）+ 可选参考音频 → Wav-VAE 编码器压到波形潜空间 → DiT 做 conditional flow matching → Wav-VAE 解码器重建波形。无独立声码器/codec 级联。\n\n## 关键模块\n- Wav-VAE：全卷积音频自编码器，Oobleck block + 空洞卷积多尺度建模，Snake-Beta 激活，非参数 shortcut 分支稳定训练；24kHz → 11.7Hz（2048 倍压缩），64 维潜空间。\n- DiT 扩散主干：1536 隐维、24 层、24 头，Global AdaLN 注入时间步，QK-Norm + RoPE（Qwen2 式旋转位置），长跳跃连接，REPA（用 mHuBERT 特征做表征对齐）。\n- 推理：Euler ODE 求解器（默认 16 步），APG 替代 CFG。\n\n## 本质区别\n相较 CosyVoice/Qwen3-TTS 的“LLM 语义 token + 扩散声学”或两阶段 vocoder，LongCat-AudioDiT 是单阶段、纯波形潜空间、NAR 扩散，去除所有级联误差点。",
    "training": "## 训练配方\n- 非自回归 conditional flow matching（CFM）目标，无复杂多阶段训练、无高质量人工标注数据。\n- 变体：LongCat-AudioDiT-1.1B（MIT，开源零样本 TTS）与 3.5B（MIT，SOTA 克隆，Seed-ZH SIM 0.818）。\n- 文本编码器 UMT5-base 支撑 107 语言开箱即用。\n\n## 关键推理期改进\n- 纠正长期训练-推理不匹配：每个 ODE 步做 prompt 区域潜变量重置 + 无条件预测净化。\n- 用自适应投影引导（APG）替代标准 CFG 提升质量。\n\n## batches.json 数字解读\n- 已知结果：Seed-ZH SIM 0.818（vs Seed-TTS 0.809）、Seed-Hard SIM 0.797（vs 0.776）。SIM 为说话人相似度（越高越像参考说话人）。3.5B 相对此前 SOTA Seed-TTS，Seed-ZH 提升 +0.009、Seed-Hard 提升 +0.021——绝对值增幅不大但 Seed-Hard（难例集）增益更明显，说明在困难克隆场景下优势更突出。另报告 CER 1.09%（ZH）、WER 1.50%（EN），在 NAR 模型中属第一梯队可懂度。",
    "ablation": "## 消融与关键发现\n- 训练-推理不匹配修正：prompt 区域潜变量重置 + 无条件预测净化，是质量提升的关键推理期技术。\n- APG vs CFG：自适应投影引导在质量上优于标准 classifier-free guidance。\n- 反直觉发现（核心）：Wav-VAE 重建保真度更高 ≠ TTS 整体更好——Wav-VAE 与扩散主干需协同调优，单纯追求 codec 重建质量反而会损害最终合成质量。\n- 模块验证：REPA、Snake-Beta 激活、长跳跃连接等均经系统消融确认贡献。\n\n## 数字解读\n- Seed-ZH SIM 0.818 vs Seed-TTS 0.809：在 Seed 中文零样本克隆基准上，LongCat-AudioDiT-3.5B 将说话人相似度从 0.809 提升至 0.818，超过 Seed-TTS、CosyVoice 3.5、MiniMax-Speech。\n- Seed-Hard SIM 0.797 vs 0.776：在更难样本上相对提升更大（+0.021），印证波形潜空间 + 推理修正对困难克隆更稳健。",
    "limitation": "## 真实边界\n- 波形潜空间扩散计算仍重；3.5B 部署成本不低（虽 MIT 开源可商用）。\n- 对极长音频效率有限；单阶段虽简化管线但扩散步数仍带来延迟。\n- 公开信息集中在 Seed 克隆与可懂度，自然度 MOS/情感可控性等细节披露较少。\n\n## 批判\n评审视角：LongCat-AudioDiT 的“单阶段波形潜空间 + 推理期修正 + APG”是清晰且可复现的工程贡献，MIT 许可利于落地。批判点：(1) “Wav-VAE 高保真 ≠ TTS 更好”的反直觉结论虽有趣，但论文未给出该现象的理论解释，仅作经验观察，可能存在评测集偏向；(2) SIM 绝对值提升仅约 1 个百分点，实际听感差异可能微弱，需主观 MOS 佐证；(3) 与同样单阶段波形潜空间的 WavTTS 缺少同设定对比，难以判断“波形潜空间 vs 时域波形”两条端到端路线的优劣。"
  },
  "voxcpm2": {
    "architecture": "## 设计动机\n传统 TTS 依赖离散 token 化（VQ/EnCodec/DAC），量化带来信息损失、“拼接感”与可控性弱。VoxCPM2 继承 VoxCPM 的“分层扩散-自回归”连续隐空间范式，完全不依赖外部离散语音 tokenizer，直接生成连续语音表征以保留细粒度声学细节。\n\n## 整体流水线（四阶段）\n- LocEnc：将输入文本与参考音频编码为上下文表征。\n- TSLM（文本→语音 LM）：以文本为条件自回归生成粗粒度语音表征。\n- RALM（残差音频 LM）：自回归细化、补充声学细节。\n- LocDiT（局部扩散 Transformer）：用 conditional flow matching（CFM）去噪产出最终高保真音频。\n主干基于 MiniCPM-4（2B 参数，GQA + LongRoPE），LM token 率 6.25Hz，patch size 4。\n\n## 关键模块\n- 非对称 AudioVAE V2：以 16kHz 编码、48kHz 重建，实现隐式超分且编码高效（无需外置上采样器）。\n- 统一序列组织（unified sequence organization）：用同一组输入积木的不同排列表达所有生成模式（30 语、9 中文方言、自然语言声音设计、风格可控克隆、高保真续写克隆），单一参数集 + 单一目标联合训练。\n\n## 本质区别\n相较 codec-LM（离散 token）路线，VoxCPM2 在连续隐空间做分层扩散-自回归，消除量化损失；相较单一扩散，其“粗→细”两阶段 LM + 局部扩散兼顾长程一致与高频细节。",
    "training": "## 训练配方\n- 联合扩展到 2B 参数 + 2M+ 小时多语种语音数据（Apache 2.0 全开源，含权重、微调与推理代码）。\n- 统一序列组织使所有能力在单一目标下联合训练，无需为各模式分别建模。\n\n## batches.json 数字解读\n- 已知结果：内部 30 语言评测集平均 WER 1.68%，零样本/指令跟随 TTS 达 SOTA 或竞争性。WER 1.68% 为 30 语跨语种零样本合成的平均词错率，属极低水平，说明连续隐空间 + 大模型容量在海量多语种数据下能同时保持高可懂度与跨语种泛化；该数字来自内部评测集，需结合公开零样本/指令跟随基准（论文称达 SOTA/竞争性）交叉验证。",
    "ablation": "## 消融与关键发现\n- 非对称 AudioVAE（16k 编码/48k 重建）的隐式超分收益：证明低帧率高效编码 + 高采样率重建可在不增外置上采样器的前提下提升音质。\n- 统一序列组织对各生成模式联合训练的必要性：同一参数集通过输入积木排列复用，是“单模型多能力”成立的核心。\n- 能力消融：30 语言、9 中文方言、Voice Design（自然语言描述生成新音色）、Controllable Cloning（克隆+风格引导）、Ultimate Cloning（带原文的高保真续写）均在同一主干验证。\n\n## 数字解读\n- 30 语平均 WER 1.68%：在内部多语种零样本集上，平均词错率仅 1.68%，配合 48kHz 原生输出，说明 VoxCPM2 在“免 token 化 + 连续隐空间”路线上达到了与离散 codec 模型可比甚至更优的可懂度，且语言自动推断（无需语言标签）降低了多语种部署门槛。",
    "limitation": "## 真实边界\n- 连续隐空间对离散可控编辑（如精确插入/替换某词 token）不如 codec 直观。\n- 2M 小时数据门槛高，复现预训练成本极大（虽权重开源，重训不现实）。\n- 长音频效率与实时性待验证；RTF 约 0.3（RTX 4090）/0.13（优化后端）属近实时而非超低延迟。\n\n## 批判\n评审视角：VoxCPM2 是“免 token 化连续隐空间 TTS”路线的代表，架构统一、开源彻底（Apache 2.0）、能力维度丰富（声音设计/续写克隆尤为亮眼）。批判点：(1) 2B 参数 + 2M 小时虽强，但“无外部 tokenizer”的优势主要体现在保真度与免训练复杂度，并未在客观指标上大幅超越顶尖离散 codec 模型，更多是可及性与统一性的工程胜利；(2) 内部 30 语 WER 1.68% 缺乏统一的公开基准对照，跨模型可比性受限；(3) 连续表征的“可编辑性”弱于离散 token，使其在需要精细内容控制的工业场景落地不如 codec 路线灵活。"
  },
  "chatterbox_flash": {
    "architecture": "## 设计动机\nAR codec-LM 虽质量强且利于流式，但 token 顺序生成导致延迟随长度线性增长，无法靠工程消除。Chatterbox-Flash 把预训练 AR TTS 解码器微调为分块扩散（block-diffusion）解码器，在每块内并行生成 token，同时保留块到块流式传输，兼顾质量与低延迟。\n\n## 整体流水线\n基座 Chatterbox-TTS：Llama 式 Transformer 解码器（T3）在 25Hz 离散语音 token 上做 next-token 预测，条件为全局说话人嵌入（GE2E/ECAPA 式 voice encoder）+ 文本 + 提示语音 token；后接 flow-matching 声码器还原波形。Chatterbox-Flash 仅替换训练目标为 masked denoising，架构不变。\n\n## 关键模块与注意力\n- 块级并行：语音 token 序列分等长块，块内全位置并行去噪，块间因果流式。\n- 混合注意力：条件前缀全注意力、块内双向注意力、块间因果注意力，保持 TTS 单调对齐与流式兼容。\n\n## 本质区别\n相较标准 AR（逐 token）与标准 NAR（全并行）扩散，Chatterbox-Flash 是“块因果扩散语言模型”，属 discrete diffusion / dLLM 在语音上的首次原生流式落地；且不改架构即可从已有 AR 权重微调。",
    "training": "## 训练配方\n- 在预训练 AR 解码器上以 masked denoising（块因果）目标微调，替换 AR 损失，架构与权重复用。\n- 推理期引入两项免架构修改技术：先验校准评分（prior-calibrated scoring）与早解码调度（early-decoding schedule）。\n\n## batches.json 数字解读\n- 已知结果：标准零样本 TTS 基准上高保真合成，与强 AR/NAR 基线相当；流式首包时间（TTFT）与流式 AR 系统相当，RTF 显著降低。论文报告 PMI+ED（α=0.5）把平均去噪步数从 8 降至 6.47（LibriSpeech-PC）/6.10（Seed-TTS），且无 WER 代价（或仅 +0.08 WER），SIM-o 与 UTMOS 不变——即在质量无损下节省约 20% 步数，是延迟-质量权衡的关键量化证据。",
    "ablation": "## 消融与关键发现\n- 朴素块扩散在离散语音 token 上质量下降的根因：codec 长尾分布（尤其静音 token）使并行位置选择偏向少数高频 token。\n- 先验校准评分（PMI）：用上下文对数概率减去块级边缘对数概率（PMI），抑制长尾/静音 token 偏差，重排 unmask 位置；其核心贡献是提供可靠的早解码阈值信号，而非直接提升原始质量（TS 调度与之质量相当）。\n- 早解码调度（ED）：基于校准置信度的自适应终止，平均步数 8→6.47/6.10，质量不变。\n- 质量对标：在 LibriSpeech-PC 与 Seed-TTS 上与强 AR/NAR 基线 SIM-o/UTMOS/WER 相当。\n\n## 数字解读\n- 步数 8→6.10（Seed-TTS）且 WER 仅 +0.08、SIM-o/UTMOS 不变：说明先验校准 + 早解码在不牺牲客观质量的前提下把迭代去噪步数压低约 24%，直接转化为更低 RTF 与更接近流式的首包延迟，是该方法“质量-延迟”帕累托改进的核心证据。",
    "limitation": "## 真实边界\n- 离散 codec token 的固有限制（量化损失、长尾静音偏向）虽被 PMI 缓解但未根除。\n- 块大小/步数仍为需调的超参；极长句跨块一致性与情感连贯性挑战仍在。\n- 开源社区维护，权重规模与显存需求取决于原 Chatterbox-TTS 基座。\n\n## 批判\n评审视角：Chatterbox-Flash 的亮点在于“用推理期轻量技术（PMI+ED）把已有 AR 权重改造成流式块扩散”，工程代价极低、可复现性强，且首次把 dLLM 块因果范式真正落到语音流式。批判点：(1) PMI 的核心价值被论文定位为“阈值信号”而非质量提升，意味着其质量上限仍受原 AR 基座限制，并非结构性超越；(2) 早解码节省约 20% 步数虽好，但扩散步数本就不是 AR 流式延迟的唯一瓶颈，端到端 TTFT 仍受块大小与声码器制约；(3) 评估以 Seed-TTS/LibriSpeech-PC 为主，缺少与 Voxtral、StepAudio 2.5 等混合架构的跨范式延迟-质量对比。"
  },
  "confucius4_tts": {
    "architecture": "## 设计动机\n多数零样本 TTS 在推理时需提供参考音频的转录文本，限制了跨语种克隆（野外参考音频常无转录）。Confucius4-TTS 主打“免参考文本（transcript-free）跨语种”：仅凭参考音频即可跨 14 种语言克隆音色并迁移情感韵律，消除跨语种合成的常见违和口音。\n\n## 整体流水线（两阶段）\n- T2S（文本→语义）：LLM 式主干接收文本与说话人条件，生成目标语言语义 token。说话人由可学习说话人编码器从 SSL 表征提取（Wav2Vec2-BERT 2.0 提取语义/说话人条件，ECAPA-TDNN 编码说话人身份）。语义 token 采用 MaskGCT 式语义编解码器。\n- S2A（语义→声学）：conditional flow matching 将语义 token 转为 mel 频谱；BigVGAN 声码器合成波形。\n全程无需参考文本，参考音频经编码器直接提取身份/语义特征。\n\n## 关键模块\n- 可学习说话人编码器：基于 SSL 预训练特征 + ECAPA-TDNN，从参考音频（无需转录）抽取音色，实现 transcript-free 克隆。\n- 情感韵律迁移：自动提取参考音频情感特征，跨语种无损迁移语调/韵律/情绪（区别于依赖“喜悦/悲伤”文本标签的传统做法）。\n- 1.3B 参数，Apache 2.0 开源，54GB 资源包可本地离线部署。\n\n## 本质区别\n相较 EmotiVoice（仅训练集内音色、无克隆）与多数需参考文本的零样本模型，Confucius4-TTS 的差异化在“3 秒免文本克隆 + 14 语跨语种无口音 + 情感跨语种迁移”三位一体，且架构从声码器方案升级为 GPT 式 LLM + Flow Matching。",
    "training": "## 训练配方\n- 大规模多语种语音数据训练；T2S 与 S2A 分别训练，S2A 训练时 T2S/说话人编码器（Wav2Vec2-BERT）/风格编码器（CAMPPlus）均冻结，仅 flow matching S2A 参与。\n- 支持 continuation cloning（有参考转录时）。\n\n## batches.json 数字解读\n- 已知结果：CV3-Eval 跨语种基准平均 WER 3.73%（六个方向）；内部跨语种集在人类评测中平均总排名优于近期开源与商业系统。3.73% 为跨语种零样本合成的平均词错率（含 en→zh、ja→zh、ko→zh、zh→en、ja→en、ko→en 六方向），属低错率，说明免文本跨语种在可懂度上已具实用水平；官方另自报克隆相似度 >85%、任务准确度 97%（第三方独立验证有限）。",
    "ablation": "## 消融与关键发现\n- 跨语种无口音：输入中文音频可用原声音色输出日/英/法等目标语且发音地道，消除传统跨语种合成的生硬外语腔调（经验结论，论文以 CV3-Eval 与内部集佐证）。\n- 情感跨语种迁移：自动提取参考情感并跨语种无损迁移，优于文本标签式情感控制。\n- 基准对比：CV3-Eval 六方向平均 WER 3.73%；在 Seed-TTS-eval 中英测试、MiniMax-Multilingual-Test 等多基准上与 Qwen3-TTS、CosyVoice、OmniVoice、VoxCPM2、X-Voice 对比，SIM 多居中上（如中文 SIM 0.765、英文 SIM 0.70）。\n\n## 数字解读\n- CV3-Eval 跨语种平均 WER 3.73%：在六个跨语种方向上平均词错率 3.73%，优于多数需参考文本的基线（如 CosyVoice 系列在 ja→zh 高达 48.10、ko→zh 7.70），凸显 transcript-free 设计在跨语种可懂度上的实际收益；但相对同榜 X-Voice（平均更低 WER）在部分方向仍有差距，且 SIM 普遍低于 VoxCPM2/OmniVoice，说明音色相似度并非其最强项。",
    "limitation": "## 真实边界\n- 仅 14 种语言，少于 Fish-Speech（约 50）、Chatterbox（23）等。\n- 54GB 资源包对本地部署硬件门槛高，普通开发者难直接运行。\n- 官方 85% 相似度/97% 准确度为自测，缺第三方独立评测；无法 100% 复刻细微音色。\n- 严格说是 transcript-free（免参考文本）而非完全无文本条件（仍依赖目标语言文本输入）。\n\n## 批判\n评审视角：Confucius4-TTS 的真实价值在“免参考文本跨语种克隆”这一被忽视的痛点——野外参考音频常无转录，此能力显著降低部署摩擦，且 Apache 2.0 全量开源利于国产化落地。批判点：(1) 其“textless”标签在 batches 简述中易误导——它并非 CIF/完全无文本语义建模，而是“免参考音频转录”，目标语言文本仍是必需输入；(2) 跨语种 SIM 多项低于 VoxCPM2/OmniVoice，说明音色保真并非最强，优势在于“免文本+情感迁移”的易用性而非绝对克隆质量；(3) 自报指标缺独立验证，54GB 包与 1.3B 规模使边缘部署不现实，定位更偏服务端。"
  },
  "voxtral_tts": {
    "architecture": "## 设计动机\n现代 TTS 能“读对字”却常在长序列中丢失自然韵律、情感色彩与说话人一致性，Mistral 称之为“表现力鸿沟（Expressivity Gap）”。Voxtral 的核心洞察是把语义（离散、长程）与声学（密集、连续）分开处理：AR 负责长程语义连贯与说话人身份，flow-matching 负责低计算成本的密集声学细节。\n\n## 整体流水线（混合 AR + FM）\n- Voxtral Codec：卷积-Transformer 自编码器，混合 VQ-FSQ 量化。24kHz 单声道 → 12.5Hz（每 80ms 一帧），292 维潜空间拆为 256 维语义（VQ，码本 8192，由冻结 Whisper ASR 蒸馏，无强制对齐）+ 36 维声学（FSQ，21 级）。码率约 2.14 kbps。\n- AR 解码器：由 Ministral 3B 初始化的 decoder-only Transformer，参考音频 token 前置到文本 token，每帧 AR 生成一个语义 token，直至结束 token。\n- Flow-matching 变换器：双向 3 层，每帧 8 次 NFE（Euler 积分）+ CFG（α=1.2）生成 36 个声学浮值，再量化到 21 级 FSQ。\n总参约 4B（约 3.4B 解码器 + 390M FM + 300M codec）。\n\n## 本质区别\n相较纯 AR（VALLE 式，逐 token 预测密集声学，慢且易累积错误）或纯扩散/流（Voicebox 式），Voxtral 用“AR 语义骨架 + FM 声学 flesh”的混合，并以 ASR 蒸馏语义 token 实现 meaning-aware 量化；VQ-FSQ 混合量化在保真与效率间优于纯 RVQ。",
    "training": "## 训练配方\n- Codec 训练：重建损失 + 对抗损失 + 辅助 ASR 蒸馏损失（对齐语义 token 与文本内容）。\n- 生成训练：语义交叉熵 + 单采样时间步的 flow matching 损失（静音段降权）。\n- 后训练 DPO：把 Direct Preference Optimization 适配到“离散语义 + 连续声学”混合设定——语义用标准交叉熵 DPO，声学用 Flow-DPO；胜-负对用 WER、说话人相似度、响度一致性、UTMOS-v2、LM 评委等指标。约 3–30 秒参考音频做零样本克隆，9 语训练。\n\n## batches.json 数字解读\n- 已知结果：母语者人工评测中，多语种零样本克隆对 ElevenLabs Flash v2.5 胜率 68.4%；实测首包延迟约 70ms。68.4% 为成对盲测胜率（人类偏好 Voxtral 的自然度/表现力），显著高于随机基线 50%，表明在跨语种克隆听感上明显优于 ElevenLabs 旗舰；70ms TTFT 印证其低延迟实时友好定位（注：同族 Voxtral Mini Realtime 为 ASR，流式延迟约 480ms、首包更低，二者构成实时语音栈听/说两端，但延迟量级不同）。",
    "ablation": "## 消融与关键发现\n- 声学生成范式对比：flow-matching 在人工评测的表现力上优于 MaskGIT 与 Depth Transformer；且 FM 仅需 8 NFE，而 Depth Transformer 每帧需 36 个 AR 步，计算更优。\n- 语义 token 设计：由 Whisper 蒸馏的 VQ 语义 token 实现 meaning-aware 量化，优于随机/自监督初始化。\n- DPO 收益：Flow-DPO + 语义 DPO 消除音量渐弱（volume tapering）与“幻觉词”等伪影；但在合成 DPO 数据上训练超过一个 epoch 会增加机械感伪影（重要训练警示）。\n- 延迟优化：vLLM-Omni 用 CUDA Graphs（加速 47%）+ AR 与 Codec 解码异步流式，实现首包低延迟与 30+ 并发。\n\n## 数字解读\n- 68.4% 胜率 vs ElevenLabs Flash v2.5：在 9 语多语种零样本克隆人工配对偏好中，人类评审以 68.4% 概率偏好 Voxtral，是“表现力鸿沟”被缩小的直接证据；需注意该评测聚焦克隆自然度/表现力，且 ElevenLabs 为商业强基线，结果有力但场景受限（默认语音场景胜率约 58.3%，相对低一些）。\n- 约 70ms TTFT：TTS 侧低首包延迟，支撑实时对讲；同族 ASR（Voxtral Mini Realtime）流式延迟约 480ms，二者延迟量级不同但共同构成实时语音栈的听/说两端；但完整句子延迟仍取决于 AR 语义逐帧生成，长句端到端延迟高于纯 NAR 模型。",
    "limitation": "## 真实边界\n- CC BY-NC 不可商用；4B 规模推理成本不低。\n- 语种限于 9 语；高噪/野外参考音频需更高 CFG，可能削弱情感细腻度。\n- AR 语义逐帧生成使长句端到端延迟高于纯 NAR；Codec 编码器权重未公开（社区仅持解码器+AR 主干，做声音克隆需从参考嵌入反解 codes）。\n\n## 批判\n评审视角：Voxtral TTS 是“混合 AR+FM + 意义感知量化 + 适配混合设定的 DPO”的范式级示范，68.4% 胜率与 70ms TTFT 是其最硬的两项证据，且 CC BY-NC 开放权重利于研究复现。批判点：(1) 68.4% 胜率依赖其自建母语者评测协议，跨机构可复现性待验证，且默认语音场景 58.3% 胜率显示优势在“克隆/表现力”场景更突出；(2) “表现力鸿沟”的论述偏向产品叙事，缺乏与 GPT-SoVITS、CosyVoice 等开源系统在同等条件下的可控表现力量化对比；(3) AR 语义主干使严格实时长句仍有延迟天花板，Codec 编码器闭源也限制了完全自托管的声音设计自由度。"
  },
  "fishaudio_s2": {
    "architecture": "## 双自回归 Dual-AR 生成范式\n- 沿用 Fish-Speech 的 decoder-only Transformer 主干与 RVQ 音频 codec 路线，核心创新是把生成解耦为 Slow AR 与 Fast AR。\n- Slow AR 用预训练 Qwen3-4B 作为时序语义骨干，以自回归方式建模文本 token 与第一码本语义 token 的交错序列。\n- Fast AR 仅 4 层轻量 Transformer，按深度维度在每个时间步重建剩余 9 个声学 RVQ 码本，条件为 Slow AR 隐状态。\n- 多码本融合 Multi-Codebook Fusion 把 10 个码本 token 与 Slow AR token 聚合为连续向量供下一步使用，兼顾容量与长上下文（大于 16k）。\n\n## 音频分词器与语义蒸馏\n- 基于 Descript Audio Codec（DAC），分层 RVQ 共 10 个码本，44.1kHz 采样，约 21Hz 帧率，446M 参数。\n- 关键修改：因果卷积支持流式、因果滑动窗口 Transformer 处理长程依赖、第一码本通过 w2v-BERT 2.0 激活做语义蒸馏以稳定对齐。\n\n## 与之前 SOTA 的本质区别\n- 传统 codec-LM 一次性预测所有 RVQ 层导致序列爆炸、难以长上下文；S2 用慢语义加快声学解耦把高保真 44.1kHz 建模成本压到可控。\n- 用 DAC 而非完全自研 codec，并在第一码本显式注入语义监督，是其区别于 VALL-E 类系统的关键。",
    "training": "## 数据与多阶段流水线\n- 三阶段数据策展：源分离加 VAD 切分、基于 w2v-BERT 2.0 的语音质量模型做 SNR 与说话人一致性与可懂度过滤、Qwen3-Omni-30B 富转录 ASR 联合产出内容与自然语言声学标签（韵律、情绪、副语言、说话人轮次）。\n- 总数据超过 1000 万小时音频，覆盖约 80 种语言，累计超过 5000 亿 token；上下文长度从 8192 渐进扩展到 16384。\n- 模态交织策略：序列以 70% 概率被切分并与文本交错，强制单调对齐。\n\n## 训练目标与阶段\n- 先对抗训练 446M codec（GAN 加 MPD/MSD/MRSD 判别器）；再交叉模态预训练；SFT 用富控制高质量数据加实时文本/音频增强；最后 RL 后训练。\n- 损失以标准交叉熵预测 token 为主，codec 端为 GAN 重构加频谱加 KL 惩罚。\n\n## 多奖励 RL 对齐 GRPO\n- 采用 Group Relative Policy Optimization，奖励 Rtotal = w1*RSTT + w2*RPref + w3*RSIM：RSTT 来自 ASR 逐 token 置信度（语义正确性），RPref 来自质量模型（声学偏好），RSIM 来自声纹模型余弦相似度（说话人相似）。\n- 优势估计用组级统计、不做标准差归一化，策略损失加入逐 token KL 惩罚；用 rank-stabilized LoRA（r=16，alpha=64）微调 MLP 层。\n- batches.json 中 known_results 仅记社区实测克隆质量好，说明该模型尚未进入标准公开榜（如 Seed-TTS）作横向排名；其 Audio Turing Test 后验均值 0.483 经指令改写提升到 0.515、Fish Audio Instruction Benchmark 标签激活率 93.3% 才是对外可查的核心量化结果。社区实测的好应理解为相对 Fish-Speech v1 在指令跟随与长音频稳定性上的提升，而非单纯音质。",
    "ablation": "## 指令跟随与图灵测试\n- Audio Turing Test 后验均值 0.483，经指令改写提升到 0.515；Emergent TTS Eval 对基线总胜率 81.88%。\n- Fish Audio Instruction Benchmark（自研）整体标签激活率 93.3%，质量分 4.51/5.0，证明内联标签（如 laugh、breath）高可靠。\n- 这些数字对应 known_results 中克隆质量好的定性结论：模型在零样本克隆之外，关键增益是指令可控性与长音频稳定性。\n\n## 数据奖励对齐消融\n- 论文核心消融是预训练与后训练使用同一组质量与 ASR 模型作奖励，消除两阶段分布偏移；对比显示 GRPO 多奖励联合优化在说话人相似与清晰度上优于单奖励。\n\n## 长音频稳定性\n- Long-TTS-Eval 上 S2 在新闻、论文、文学三类保持最低 WER，验证多说话人多轮生成长音频时跳词与音色漂移被显著抑制。",
    "limitation": "## 真实边界\n- 低资源语言（训练数据小于 1000 小时）仍落后于 ElevenLabs 等闭源巨头；8B 级总参（4B Slow 加轻量 Fast 加 codec）推理成本高于小模型。\n- 尽管 RTF 0.195、TTFA 小于 100ms，自回归骨架使超长句首包后仍有逐步生成延迟。\n\n## 批判\n- 论文大量使用自研基准（Fish Audio Instruction Benchmark、Audio Turing Test 后验均值）作为主证据，缺乏与同代开源或闭源系统在统一第三方榜（如 Seed-TTS、CV3-Eval）上的完整对比表，SOTA 表述偏乐观。\n- 多奖励 GRPO 中 RSTT/RPref/RSIM 权重为超参，论文未充分说明权重搜索与外部泛化性；LoRA 仅微调 MLP 层，可能限制音色空间的大规模塑形。\n- 5000 亿 token、80 语的数据宣称缺乏按语种细分的规模披露，社区复现其数据管线门槛极高。"
  },
  "minimax28": {
    "architecture": "## 闭源企业级 TTS：以 Sound Tags 为核心卖点\n- 官方未公开论文或架构细节，以下基于官方博客与 Together AI 模型卡推断。\n- 据推测为 LLM 语义 token 加扩散或流匹配声学、或 codec-LM 类混合范式；关键差异化不是基础架构，而是文本内联的 Sound Tags 系统。\n- Sound Tags 把笑声（laughs/chuckle/snorts）、呼吸（breath/inhale/exhale/pant/sighs/sniffs/gasps）、喉部与口腔动作（clear-throat/coughs/groans/humming/lip-smacking 等）作为文本内标记注入，实现无需后处理的细粒度副语言控制。\n\n## 多语种与克隆\n- 支持 40+ 语言，含中英阿西法日等，官方强调亚洲语言一致性与跨语言口音渗透消除（以普通话-日语对起步）。\n- 高保真声音克隆：仅需 10 秒样本即可捕获音色纹理、气声与语速，跨语种保持说话人身份。\n\n## 实时性\n- 端到端延迟低于 250ms、TTFT 低于 300ms，支持全流式合成，定位为语音 Agent 与陪伴类 NPC。",
    "training": "## 训练配方（据推测）\n- 闭源，无公开数据规模与损失函数；据推测为大规模多语种语音加富标签（情绪、副语言事件）的多任务训练。\n- 表现力提升来自对口语填充词（um/uh/ah）与停顿的显式建模，而非仅韵律预测。\n\n## known_results 解读\n- batches.json 记 known_results 为表现力/多语种综合：强，官方发布，属定性结论，无精确指标。\n- 公开可查的量化数字来自 Together AI 模型卡：相对 Speech-2.6 盲测自然度失败率下降 60%，相对 Speech-2.0 综合听感胜率 54.5%，这些是对内代际对比而非跨厂商基准。",
    "ablation": "## 无公开独立消融\n- 作为闭源商业系统，MiniMax 未发布消融实验；其对外证据为盲测 A/B（母语者，60 组随机音频对）与 TTFT/RTF 实测。\n- 盲测中 59% 的自然度失败被归因到 2.6 版本、在 2.8 中被解决，提示改进主要来自副语言与停顿建模而非基础 codec 升级。",
    "limitation": "## 真实边界\n- 闭源、付费 API，不可微调、不可复现；语种虽标 40+ 但实际低资源语种质量未披露。\n- Sound Tags 列表固定，超出现有标签的情绪或动作无法表达；精确内容可控性依赖标签体系覆盖度。\n\n## 批判\n- 60% 自然度提升、54.5% 胜率均为相对自家旧版本的代际对比，缺乏与 ElevenLabs、Fish-Speech、Qwen3-TTS 等同期竞品的统一基准对比，横向参考需谨慎。\n- 该模型定位为生产部署而非研究，透明度天然低；论文式的技术严谨性不可得，社区难以验证其亚洲语言一致性等主张。\n- 10 秒克隆的声纹安全与授权边界未充分讨论。"
  },
  "indextts2": {
    "architecture": "## 自回归零样本 TTS 加通用时长控制\n- 沿用 IndexTTS 的 Text-to-Semantic（T2S）自回归语义建模加 Semantic-to-Mel（S2M）流匹配声学生成加 BigVGANv2 声码器的三级级联，约 1B 参数。\n- 核心创新是 AR 友好的时长控制：计算时长嵌入 p = Wnum * h(T)，其中 T 为目标语义 token 数、h(T) 为独热向量；关键约束是时长嵌入表等于语义位置嵌入表，使模型能在指定长度处自然终止，精确控制时长而不损质量。\n- 两种模式：显式指定生成 token 数（精确音视频同步）；自由 AR 生成但忠实复现提示韵律（不指定数量）。\n\n## 情感音色解耦\n- 用梯度反转层 GRL 加说话人分类器在训练时把情感特征与说话人身份分离，使情感嵌入只捕获情绪与韵律属性而不干扰音色。\n- 零样本下可分别从音色提示重建目标音色、从风格提示复现指定情绪，甚至跨说话人组合。\n\n## 与 SOTA 的本质区别\n- 传统 AR TTS 逐 token 生成无法精确控时长，导致配音与口型同步困难；IndexTTS2 首次在 AR 架构下实现影视级时长适配，并把情感与音色彻底解耦。",
    "training": "## 三阶段训练\n- 第一阶段：在完整数据集上基础训练。\n- 第二阶段：用基于 GRL 的解耦的精选高质量情感数据做情感细化。\n- 第三阶段：鲁棒性微调提升稳定性。\n\n## 清晰度增强 GPT 隐表征\n- 强情绪下常见清晰度下降与口齿不清；在 S2M 模块用 GPT 隐表征增强，T2S Transformer 最后一层潜特征通过向量加法与语义特征融合，在保持表现力的同时显著提升发音准确性。\n\n## 自然语言情感控制 T2E\n- 为降低情绪控制门槛，设计软指令机制：用 DeepSeek-R1 作教师把文本描述映射为 7 维情绪概率分布，再用 Qwen3-1.7B 通过 LoRA 微调复现（师生蒸馏）。\n- 推理时情感向量 e_input = sum_i (p_i * v_i)，p_i 为情绪概率，v_i 为预定义情感嵌入。\n\n## known_results 解读\n- batches.json 记 known_results：多数据集零样本 TTS，WER/SIM/情绪保真优于 SOTA。论文给出具体量化：情感相似度 ES 0.887、情感 MOS 4.22，远超同类开源；多数据集上 WER、说话人相似 SIM、情绪保真均优于已有零样本 SOTA。这些数字印证其时长控制加情感解耦双优的 claim。",
    "ablation": "## 时长控制两种模式对比\n- 消融显示显式 token 数模式可实现毫米级时长对齐，自由模式保留提示韵律；两者质量均不劣于无控制基线。\n- 约束时长嵌入表等于位置嵌入表是关键，避免另起一套长度表带来的分布偏移。\n\n## 情感音色解耦有效性\n- GRL 加说话人分类器消融表明，无 GRL 时改情绪会连带改音色；加 GRL 后 ES 显著提升且音色相似度保持。\n- GPT 隐表征消融：去掉后强情绪 WER 上升、清晰度下降；加入后强情绪下发音准确性恢复。\n\n## 三阶段与 T2E\n- 三阶段训练对比单阶段显著提升稳定性（减少跳词与重复）；Qwen3-LoRA 软指令相比纯向量输入显著提升普通用户的可控性，且接近 DeepSeek-R1 教师效果。",
    "limitation": "## 真实边界\n- 仍属自回归生成，长句有延迟与错误累积；极端情绪下清晰度仍需 GPT 表征补救。\n- 以中英文为核心输出语种，参考音频可任意语言；长音频一致性有待进一步验证。\n- 情感为 7 维离散空间加文本软指令，极细腻连续情绪表达受限。\n\n## 批判\n- 论文以优于 SOTA 概括，但多数对比基线为开源模型（如 Seed-TTS 系列、CosyVoice2），与同期最强闭源或大规模开源（如 Fish-Speech S2、Qwen3-TTS）的直接对比不充分。\n- 情感 MOS 4.22、ES 0.887 来自其内部评测集，缺乏跨数据集泛化披露；GRL 对抗训练对超参敏感，复现稳定性存疑。\n- 时长精确控制依赖指定 token 数，而 token 数与真实时长映射受语速与韵律影响，实际字幕同步仍需后校准。"
  },
  "mega_tts3": {
    "architecture": "## 稀疏对齐引导的潜在扩散 Transformer（DiT）\n- 动机：zero-shot TTS 的语音-文本对齐有两难，无显式对齐的扩散模型（如 F5-TTS）对难句鲁棒性差、可懂度下降；强制对齐（基于 duration 的）受强制对齐自然度约束、搜索空间受限。\n- 稀疏对齐策略：每个音素仅在对应强制对齐区域保留一个锚点 token（anchor token），下采样后与潜在序列拼接，给 DiT 粗粒度对齐边界，既降低对齐难度又保留细粒度隐式对齐的搜索空间。\n- Sparse Aligner 模块处理音素编码器与波形编码器输出，生成对齐的潜在序列喂入 DiT。\n\n## 潜在扩散主干与波形编解码\n- 波形被波形编码器下采样 d 倍得到潜在 z，由波形解码器 D 重建；用 MPD/MSD/MRD 多判别器保证高频细节。压缩模型损失等于频谱重构 Lrec 加轻微 KL 惩罚加对抗损失 LAdv。\n- DiT 用标准 LLAMA Transformer 块加 RoPE。训练时潜在序列随机划分为 prompt 区 z_prompt 与掩码目标区 z_target，prompt 比例 gamma 服从 U(0.1, 0.9)，仅在掩码区算损失，从 p 学平均发音、从 z_prompt 学说话人特性。\n\n## 与之前 SOTA 的本质区别\n- 主流扩散 TTS 要么无对齐（鲁棒差）要么强制对齐（自然度受限）；MegaTTS3 用稀疏对齐边界折中，首次在 8 步采样下达到 SOTA 零样本质量，且天然支持口音强度控制。",
    "training": "## 训练目标：分段修正流 piecewise rectified flow\n- 给定标准高斯 Z0 与目标语音分布 Z1，学习修正流 T 映射 Z0 到 Z1，由 transformer v_theta 估计 ODE 漂移项 v(Z_t, t)：dZ_t = v(Z_t, t) dt。\n- 训练最小化沿直线方向 (Z1 - Z0) 的最小二乘损失，使流沿最优传输路径。\n- 分段修正流加速：把流轨迹分成多个时间窗，学生在更短 ODE 段上训练，预测每段端点漂移，显著减少推理函数评估次数 NFE。\n\n## 多条件 CFG 与口音控制\n- 多条件无分类器引导（multi-condition CFG）：文本条件与说话人条件分别随机丢弃（指定概率），推理时分别用 alpha_txt、alpha_spk 引导。\n- 关键发现：文本引导尺度 alpha_txt 还可调制个人口音强度，增大文本引导可削弱口音、增强口音可控性，提供新方向。\n\n## known_results 解读\n- batches.json 记零样本 TTS 质量 SOTA，8 步采样生成 1 分钟语音。论文量化：LibriSpeech test-clean 上 CMOS 4.42、WER 4.42，超越 VALL-E 2/VoiceBox/F5-TTS 等 11 个基线（SIM-O、SMOS、WER、CMOS）；且只需 8 步即可生成 1 分钟高质量语音。这些数字直接对应其 8 步加速加 SOTA 质量加口音可控三大 claim。",
    "ablation": "## 稀疏对齐的三角权衡\n- 核心消融：稀疏对齐对比无对齐（鲁棒性差）与强制对齐（自然度受限）。结果显示稀疏对齐在 LibriSpeech 难句上 WER 最低且对 duration 预测误差更鲁棒。\n- 去掉 Sparse Aligner 后，模型退化为无对齐扩散，难句跳词与重复明显增加。\n\n## 多条件 CFG 与口音强度\n- 消融 alpha_txt/alpha_spk：增大文本引导尺度显著降低口音、提升内容一致性（WER 降），证明文本引导尺度是口音强度的有效旋钮。\n- 不同 gamma 的 prompt 比例影响零样本克隆保真，U(0.1, 0.9) 经验最优。\n\n## 采样步数曲线\n- 8 步即可逼近 50 步质量，CMOS/WER 在 8 步后收益递减，验证分段修正流的加速-质量曲线。",
    "limitation": "## 真实边界\n- 稀疏对齐边界本身仍依赖某种对齐先验（强制对齐或外部对齐器）获取，并非完全无监督。\n- 极快采样（8 步）下高频细节可能略损；对口音极强的方言与低资源语种覆盖未充分验证。\n- 相对 AR codec-LM，扩散式在超长自由生成上的可控编辑能力较弱。\n\n## 批判\n- CMOS 4.42、WER 4.42 主基准为 LibriSpeech test-clean（朗读风格、相对简单），对 in-the-wild 噪声与自发语音的鲁棒性证据不足。\n- 口音强度控制依赖文本引导尺度这一意外发现，缺乏系统的口音维度建模，精细口音风格化上限有限。\n- 论文未披露训练数据规模与语种覆盖，工业复现门槛与公平性难以评估；与 CosyVoice3/Seed-TTS 的横向对比缺失。"
  },
  "cosyvoice3": {
    "architecture": "## 监督语义 token 加 LLM 加流匹配的两阶段混合\n- 沿用 CosyVoice 系列监督语义令牌路线：语义编码器从多语言 ASR 模型提取带文本对齐的语义令牌；LLM 生成器以文本为输入预测语音令牌；流匹配 FM 解码器将令牌转为高保真波形；说话人编码器用 3 秒短音频提取音色实现零样本克隆。\n- 与 CosyVoice2（LLM 加 chunk-aware FM、双向流式）相比，v3 强化 tokenizer 与后训练。\n\n## 多任务监督语音分词器 FSQ\n- 用 MinMo 多模态 LLM 作分词器骨干，替代前代 SenseVoice-Large；多任务监督训练含 ASR/LID/SER/AED/SA 五类，训练数据 53 万小时，使离散 token 更准捕捉情感与发音风格等非语言信息。\n- 沿用有限标量量化 FSQ，保持 25Hz（每秒 25 token）、100% 码本利用率，解耦说话人身份与语义。\n\n## 流式与声码器\n- DiT 扩散加自适应掩码支持离线与流式切换；HiFi-GAN 类声码器输出 24kHz。公开资料亦提及其用流匹配加 DiffRO 扩散优化、双向流式首包延迟约 150ms。\n- 版本提供 300M/0.5B，v3 把模型从 0.5B 扩到 1.5B。",
    "training": "## 数据规模 Scaling\n- 训练数据从万小时级扩展到 100 万小时，涵盖 9 种语言（中/英/日/韩/德/法/西/意/俄）与 18 种中国方言，跨多领域与多文本格式。\n\n## 模型规模 Scaling\n- 参数从 0.5B 增至 1.5B，多语种基准因容量提升而增强。\n\n## 通用后训练 DiffRO（可微分奖励优化）\n- 针对离散 token 类 TTS 缺乏通用后训练的问题，提出 DiffRO：直接优化语音 token（而非合成音频），降低计算开销。\n- 训练 ASR 类 Token2Text 模型，以文本后验概率为基础奖励，融合情感识别、MOS 预测等多任务奖励，用 Gumbel-Softmax 采样加 KL 约束。\n- 已知效果：各语言 WER/CER 相对提升 20%-50%，低资源语言提升超 68%。\n\n## known_results 解读\n- batches.json 记多语种零样本克隆/质量领先，社区广泛采用。论文与官方给出：MOS 5.53+，9 语加 18 方言，3 秒克隆，双向流式首包约 150ms，内容一致性、说话人相似、韵律自然度三维度较 v2 显著提升。DiffRO 的 20%-50% WER 相对提升（低资源大于 68%）是对领先的量化支撑，但注意这是相对自身 v2 的内部提升。",
    "ablation": "## 分词器多任务监督\n- 消融：MinMo 多任务监督（ASR/LID/SER/AED/SA）相比单任务 SenseVoice-Large 分词器，在情感与风格捕捉、零样本自然度上更优；FSQ 保证 100% 码本利用率避免码本坍缩。\n\n## DiffRO 后训练\n- DiffRO 对比无后训练基线，各语言 WER/CER 相对降 20%-50%，低资源语种大于 68%；证明直接优化 token 级别奖励比优化音频更省算力且有效。\n- 对比 PPO/DPO，DiffRO 用 Gumbel-Softmax 使离散 token 可微，避免对合成音频的依赖。\n\n## 规模 Scaling\n- 数据万到百万小时、参数 0.5B 到 1.5B 的消融显示多语种与方言增益主要来自数据规模，容量提升带来边际质量增益。",
    "limitation": "## 真实边界\n- 含 AR 语义生成，有延迟与错误累积；相对全 NAR 模型实时性弱（虽双向流式把首包压到约 150ms）。\n- 9 语加 18 方言覆盖仍有限，超低资源语种未覆盖；FSQ 25Hz 的语义 tokenizer 表达力上限低于高码本声学 codec。\n- 虽 Apache-2.0 开源，1.5B 版本部署成本不低。\n\n## 批判\n- 领先主要建立在相对 v2 的内部提升与社区采用度，缺乏与 Fish-Speech S2/Qwen3-TTS/Seed-TTS 同代横向基准的完整对比表。\n- DiffRO 的 20%-50% 是相对百分比且基于其内部 ASR 奖励，外部独立评测（WER/CER 绝对值）缺失，绝对值水平未明。\n- MOS 5.53+ 接近真人，但 MOS 评测易受听感疲劳与标注偏差影响，且常成对对比自家旧版，需谨慎解读。"
  },
  "qwen3_tts": {
    "architecture": "## 双轨 Dual-Track 离散多码本 LM 架构\n- 两个自研 tokenizer：（1）Qwen-TTS-Tokenizer-25Hz 单码本，强调语义内容，用 block-wise DiT 或流匹配做流式波形重建，与 Qwen-Audio 无缝集成；（2）Qwen-TTS-Tokenizer-12Hz 多码本（12.5Hz、16 层 RVQ），极速率、超低延迟。\n- 12Hz 变体采用分层预测：主干 Talker（28 层 transformer、RoPE、GQA）吞入聚合码本特征预测 0 号码本；MTP 多 token 预测模块生成剩余 15 个码本，避免每步跑 16 次全模型。\n- 25Hz 变体用单码本加线性头预测当前 token，再经 chunk-wise DiT 高保真重建。\n\n## 端到端离散建模与流式\n- 论文强调通用端到端架构：离散多码本 LM 完全旁路传统 LM 加 DiT 级联的信息瓶颈与级联误差，提升 versatility、效率与上限。\n- Dual-Track 流式：文本 token 与声学 token 沿通道轴连接，收到一个文本 token 立即预测对应声学 token，由 Code2Wav 转波形；首包延迟低至 97ms（0.6B）/101ms（1.7B）。\n\n## 与 SOTA 的本质区别\n- 区别于语义 token 加扩散声学两阶段，Qwen3-TTS 用统一离散多码本 LM 端到端建模全部信息；轻量非 DiT 解码器加 12Hz 极低帧率实现 97ms 首包，是其相对 Qwen-Audio-3.0-TTS（同族前作，12.5Hz tokenizer 加 LM 加 FM 五阶段）的工程飞跃。",
    "training": "## 数据与三阶段预训练\n- 训练数据超过 500 万小时语音，跨 10 种语言（中/英/日/韩/德/法/俄/葡/西/意）加多方言。\n- 三阶段预训练：S0 提升任务稳定性；S1/S2 用高质量数据持续预训练降低幻觉；S3 长上下文扩展（token 长度至 32768）。\n\n## 对齐与微调\n- DPO 对齐人类偏好；GSPO 群体相对策略优化提升任务稳定性；轻量说话人微调增强自然度与可控性。\n- 说话人编码器与主干联合训练，支持 3 秒克隆与基于描述的声音设计 VoiceDesign/CustomVoice 控制。\n\n## known_results 解读\n- batches.json 记零样本克隆质量好，官方发布，属定性。论文与官方公开量化更丰富：Seed-TTS 基准最低 WER、6/10 语言 WER 最优且全语言 SIM 最高、跨语言 zh 到 ko 错误率降 66%、long-zh WER 1.517 与 long-en WER 1.225、InstructTTSEval 开源模型 SOTA。好应理解为在零样本克隆与长语音稳定性上达到开源 SOTA 级别，而非仅可用。",
    "ablation": "## 双 tokenizer 取舍\n- 论文经验发现：纯语义 tokenizer 表达力不足，纯声学 tokenizer 注入过多低层细节导致 LLM 长程误差累积；25Hz 融合语义与声学（基于 Qwen2-Audio 编码器）在表达力与可建模性间平衡。\n- 12Hz 多码本加轻量因果 ConvNet 实现 97ms 首包，验证极低帧率对延迟的关键作用。\n\n## 分层预测 MTP\n- 消融：用 MTP 模块并行生成剩余 15 码本，相比逐码本串行显著降延迟且质量持平，是 12Hz 变体实时性的核心。\n\n## 对齐策略\n- DPO 加 GSPO 对比无对齐：指令跟随与任务稳定性提升；长上下文扩展（32768）使超 10 分钟长语音 WER 最低。",
    "limitation": "## 真实边界\n- 12Hz 极低帧率虽降延迟，但相对高帧率 codec 在极细腻韵律与高频细节上可能有损。\n- 10 语覆盖以主流语种为主，超低资源语种未覆盖；虽 Apache-2.0 开源，1.7B 部署仍需相当算力。\n- 端到端多码本 LM 把全部信息压入离散 token，对可解释的中间表征（语义与声学分离）控制弱于两阶段方案。\n\n## 批判\n- 大量指标（Seed-TTS 最低 WER、跨语言降 66%）来自其自有评测设置，缺乏与 Fish-Speech S2/MiniMax/ElevenLabs 在统一榜上的逐项绝对值对比，SOTA 需结合上下文看。\n- 25Hz 与 12Hz 双变体定位重叠（均支持流式、克隆、指令），选型指南不足，易让用户困惑。\n- GSPO 作为较新优化器，其相对 PPO/GRPO 的稳定性收益缺乏充分消融披露。"
  },
  "orpheus_tts": {
    "architecture": "## 基于 Llama-3B 的语音 LLM（codec-LM）\n- 用修改版 Meta Llama-3.2-3B 作骨干，输入文本 prompt、输出音频 token，由 SNAC 神经 codec（24kHz 变体）解码为波形。\n- 推理时每帧生成 7 个 token，作为单个展平序列解码（而非 7 个 LM 头），对应当前帧的多分辨率 SNAC 码本。\n- 非流式（基于 CNN）的 SNAC tokenizer；推理端用 CNN detokenizer 加滑动窗口修改实现流式、避免爆音 popping。\n\n## 数据与训练\n- 训练数据超 10 万小时英语语音加数十亿文本 token 的 QA 对混合；文本 token 训练被认为提升语言理解、保留语义推理。\n- 用合法或无版权音频数据训练；提供预训练 base、生产微调 ft（8 个英文声音 tara/leah/jess/leo/dan/mia/zac/zoe）、多语种预览家族。\n\n## 与 SOTA 的本质区别\n- 不是传统 TTS 专用架构，而是把 LLM 当语音生成器，情感、韵律、节奏是模型从大规模语音加文本中学到的涌现能力，而非后处理或显式韵律模型。\n- 内联情绪标签（laugh/chuckle/sigh/cough/sniffle/groan/yawn/gasp）作为副语言事件被演出来而非读出。",
    "training": "## 训练配方（社区开源）\n- 预训练在大规模语音加文本数据上维持语言理解；文本 token 训练 boost TTS 表现同时保留语义推理。\n- 微调生产模型在若干声音上优化对话场景；支持少至 50 例每说话人的自定义微调。\n- 损失为标准下一 token 交叉熵（自回归）；无公开 RLHF 或对齐披露。\n\n## known_results 解读\n- batches.json 记社区实测韵律自然度好。公开可查：流式延迟约 200ms（A100 上快于实时播放），文本流式输入 KV cache 可降至 25-50ms；声称自然度、情感、节奏优于 SOTA 闭源，但据官方自述主要基于内部评测与主观判断，缺乏标准化基准与同行评审。社区实测的好主要指情感真实度（尤其 laugh/sigh 落地自然）。",
    "ablation": "## 无正式论文消融\n- Orpheus 以模型权重与代码开源（Apache-2.0）为主，未发布同行评审论文与系统消融。\n- 社区经验消融：Q8_0 GGUF 在 8GB 显存可跑，情绪标签中 laugh/sigh 可靠，groan/yawn 等稀有标签需重采样；这些是单卡经验而非基准。\n- 架构选择（每帧 7 token 展平序列 vs 多 LM 头）来自其设计说明，称在 A100/H100 加 vLLM 上 token 生成速度快于实时播放，故更长序列仍可实时。",
    "limitation": "## 真实边界\n- 主要英语，多语种仅预览；AR 生成有延迟与错误累积。\n- 3B 参数，Q8_0 GGUF 约 4GB 权重加 SNAC 加 KV cache 约 8GB 显存，小显存需更激进量化（质量降）。\n- 情绪控制依赖固定标签集，超出现有 8 类副语言的细粒度情绪不可表达；零样本克隆需参考音频。\n\n## 批判\n- 优于 ElevenLabs/OpenAI 等所有闭源为官方自述、基于内部主观评测，缺乏 Seed-TTS/CV3-Eval 等统一基准的 WER/SIM 绝对值，研究界对其优越性有合理质疑。\n- 无正式论文意味着方法细节（数据清洗、对齐、训练超参）不可审计；10 万小时无版权音频的来源与质量参差可能影响复现。\n- 3B 全量 speech-LLM 在延迟与显存上高于 Kokoro（82M）与 Chatterbox（0.5B）等小模型，实时部署成本偏高；情绪标签演得出来但可控性弱于 MiniMax 的 Sound Tags 体系。"
  },
  "higgs2": {
    "architecture": "## 统一音频 LLM：文本与音频同 Transformer 建模\n- 基于 Llama-3.2-3B 骨干，预测统一音频 tokenizer 产出的 token（联合语义与声学，25Hz 帧率），是会说话的 LLM 而非窄 TTS。\n- DualFFN 架构：在 LLM 旁加入音频专属 FFN 专家（Audio DualFFN，2.2B），通过交叉注意力与 3.6B LLM 共享信息；总参 3.6B 加 2.2B，但训练与推理 FLOPs 与 Llama-3.2-3B 相当（保留 91% 原速），以近乎零开销增强声学建模。\n\n## 统一音频分词器\n- 从零训练的统一 tokenizer 同时捕捉语义与声学特征，仅 25 帧每秒却匹配或超过两倍码率的分词器；首个在 24kHz 语音加音乐加音事件统一系统上训练，非扩散编解码器利于快速批推理。\n\n## 能力边界（与 SOTA 区别）\n- 单一 checkpoint 支持零样本克隆（3-10s）、多说话人对话（自然重叠、打断、笑）、导演式内联指令（whisper/gasp）、克隆音色哼唱、语音加背景音乐同前向生成，这些是传统 TTS 管线不具备的涌现能力，源自在 Llama 文本能力上大力出奇迹式加入 1000 万小时音频。",
    "training": "## AudioVerse：千万小时自标注语料\n- 自研自动化标注流水线：多个 ASR 加声音事件分类加自研音频理解模型（基于 Higgs Audio v1 Understanding 微调），清洗标注 1000 万+ 小时音频（AudioVerse）。\n- 预训练数据含丰富文本（歌词、音效标签、说话人标签），无后训练或微调即已具强表现力，依赖深度语言加声学理解。\n\n## 训练目标\n- 标准下一 token 交叉熵（自回归音频 LLM）；无公开 RLHF 或对齐阶段披露。\n- DualFFN 消融显示其持续优于无 DualFFN 对照（WER 与说话人相似度）。\n\n## known_results 解读\n- batches.json 记多角色/情感表达良好，论文给出。公开量化：EmergentTTS-Eval 上相对 gpt-4o-mini-tts 的 Emotions 胜率 75.7%、Questions 胜率 55.7%；Seed-TTS-Eval WER 2.44%、SIM 67.7%；ESD SIM 67.7%；双说话人对话自有基准 WER 18.9%（优于 MoonCast 38.8）。这些数字支撑其表达力与多说话人主张，但注意 Seed-TTS WER 2.44% 高于 ElevenLabs V2 的 1.43%，即内容一致性仍逊于顶级闭源，领先宜限定在开源与表达力维度。",
    "ablation": "## DualFFN 消融\n- 论文消融：带 DualFFN 的模型在 WER 与说话人相似度上持续优于无 DualFFN 对照，且训练速度保留 91%，证明近似零开销的音频专家有效。\n\n## 统一 tokenizer 帧率\n- 25Hz 低帧率分词器在语义与声学评测上达到 SOTA，证明低帧率加联合表征可在大幅缩短序列的同时不损质量。\n\n## 多说话人对话\n- 自有 1000 对话评测集显示其把先前最佳开源系统的 WER 减半（18.9% vs MoonCast 38.8%），验证统一音频 LLM 对重叠与打断建模的优势。",
    "limitation": "## 真实边界\n- v2 权重开源（Apache-2.0），但 v3 为研究或非商用许可，生产需单独商业授权。\n- 主要由文本 LLM 加音频数据训练，对超低资源语种与极强口音覆盖未充分验证；AR 生成有逐步延迟。\n- 自研基准（双说话人对话）缺乏与更多商业系统的横向对比。\n\n## 批判\n- 关键基准对比中 Higgs v2 的 Seed-TTS WER 2.44% 高于 ElevenLabs V2 的 1.43%，即内容一致性仍逊于顶级闭源；领先宜限定在开源与表达力维度。\n- EmergentTTS-Eval 胜率是与 gpt-4o-mini-tts（小模型）对比，非与顶级商业 TTS 比，结论外推需谨慎。\n- 1000 万小时依赖自研标注流水线，未披露按语种与领域的数据分布与版权来源细节，复现与公平性难评估；无后训练即发布，意味着可控性与安全性边界未经对齐打磨。"
  },
  "whisper": {
    "architecture": "## 模型结构\nWhisper 采用标准的 Transformer 编码器-解码器（seq2seq）结构。输入音频被切分为固定 30 秒的片段，转换为 80 维 log-Mel 频谱后送入编码器。\n\n## 多任务控制\n解码器通过特殊的控制 token 区分任务：语种识别、转录（同语种）、任意语种到英语的翻译，以及是否输出时间戳。单一模型靠这些 token 在零样本设定下切换行为，无需为每个任务单独微调。\n\n## 词汇与规模\n词表约 51,865 个 token，覆盖约 99 种语言的控制与输出。模型有多个尺寸，从 tiny(39M) 到 large(1550M)。\n\n## 流式限制\n30 秒固定窗口使其天然以片段为单位推理，长音频需分段拼接，不适合低延迟流式场景。",
    "training": "## 弱监督数据\n模型在 680,000 小时弱监督多语种音频上做完全监督训练。数据主要来自互联网，其中约 438,000 小时为英语音频配英语文本，约 126,000 小时为非英语语音翻译为英语，约 117,000 小时为非英语音频配本语种文本。\n\n## 训练目标\n采用标准的序列到序列交叉熵损失，在转录与翻译任务间交替训练，使编码器-解码器同时具备同语种与跨语种预测能力。训练在 16kHz 重采样音频上进行。\n\n## 关键思想\n核心并非复杂算法，而是用海量、多样、弱标注的数据直接获得鲁棒性，从而在无微调的零样本场景下逼近甚至超过许多全监督结果。",
    "ablation": "## 消融重点\n论文本身未做大量结构消融，重点论证的是数据与弱监督规模的作用。\n\n## 任务提示的作用\n实验表明，任务与语种控制 token 让同一个模型在识别、翻译、语种识别之间正确切换；去掉或错误设置这些 token 会显著劣化对应任务。\n\n## 尺寸与鲁棒性\n不同尺寸模型在口音、背景噪声、专业术语上的表现随参数规模提升而改善，large 在英语与多语种基准上均明显强于 tiny/base。",
    "limitation": "## 实时性\nWhisper 以 30 秒片段为单位处理，长音频需分段并拼接，天然不适合低延迟流式场景。\n\n## 语言不均衡\n训练数据约 65% 为英语，其余语言表现与数据量强相关，低资源语言（如威尔士语、部分声调语言）WER 可达 30% 以上。\n\n## 幻觉与标点\n在静音或噪声极强时可能出现幻觉文本；标点与大小写依赖解码策略，不一定可靠。"
  },
  "wav2vec2": {
    "architecture": "## 三阶段结构\nwav2vec 2.0 由三部分组成：卷积特征编码器把 16kHz 原始波形降帧率编码为潜在表示；Transformer 上下文网络生成上下文化表征；量化模块把编码器输出映射为离散单元作为预训练目标。\n\n## 预训练目标\n在潜在空间对语音片段做掩码，再用对比损失从一组干扰项中识别被掩码片段对应的正确量化单元。量化模块在微调时被丢弃，顶部接线性投影以 CTC 解码。\n\n## 掩码策略\n掩码以一定概率作用于潜在表示片段，迫使模型从上下文推断被遮住的语音内容，类似文本中的 masked language modeling。",
    "training": "## 两阶段范式\n先在大规模无标注音频上自监督预训练，再用少量标注数据微调。预训练使用类似掩码语言建模的思路但适配连续高帧率音频。\n\n## 数据规模\n论文在 LibriSpeech 960h(LS-960) 与 Libri-Light 60k 小时(LV-60k) 上预训练。低资源实验中，Large 模型在 53k 小时无标注预训练后，仅用 10 分钟标注即可微调。\n\n## 微调\n预训练后接 CTC 损失做字符级识别，并可配合外部语言模型解码进一步提升精度。",
    "ablation": "## 连续输入 + 量化目标\n消融表明：上下文网络输入保持连续、仅对对比损失目标做量化（Baseline）效果最好；输入与目标都量化最差。\n\n## 掩码与规模\n提高掩码比例、增大模型与无标注数据量均稳定降低 WER，LV-60k 预训练的 Large 显著优于 LS-960。\n\n## 量化位置\n仅量化目标（而非输入）的设定是相对先前工作的关键改进点。",
    "limitation": "## 依赖微调\n预训练后仍需 CTC 微调与（可选）语言模型解码，无法直接端到端零样本使用。\n\n## 表征偏向\n量化目标依赖初始聚类质量；字符级词表与 LM 词表不匹配会拖累解码反馈。\n\n## 长尾语言\n对极低资源语言仍需该语种标注数据微调，纯自监督不保证跨语言迁移。"
  },
  "hubert": {
    "architecture": "## 隐藏单元预测\nHuBERT 不像 wav2vec 2.0 用在线量化对比，而是先用离线聚类（如 k-means，100 簇）为输入音频生成对齐的伪标签，再让模型做 BERT 式掩码预测。\n\n## 掩码区域损失\n关键设计是预测损失只施加在掩码区域，迫使模型在连续输入上同时学习声学与语言模型。\n\n## 迭代聚类\n从一个简单 k-means teacher 出发，做两轮聚类迭代，使伪标签质量随模型提升而改善。支持 Base / Large / X-Large(1B) 规模。",
    "training": "## 自监督预训练\n在 LibriSpeech 960h 与 Libri-Light 60k 小时上自监督预训练，聚类目标提供监督信号。\n\n## 微调\n预训练后接 CTC 在 10 分钟到 960 小时不等的标注子集上微调，覆盖低资源到高资源设定。\n\n## 规模效应\n放大到 1B 参数（X-Large）可进一步在困难测试集上降低 WER。",
    "ablation": "## 聚类一致性 > 标签质量\n论文指出 HuBERT 依赖聚类步骤的一致性而非簇标签本身的内在质量。\n\n## 波形输入的重要性\n与 DiscreteBERT 相比，HuBERT 直接用波形输入避免了量化时的信息损失，是其大幅领先的主要原因。\n\n## 模型规模\n放大到 1B 参数（X-Large）在 dev-other / test-other 上带来最多 19% / 13% 的相对 WER 降低。",
    "limitation": "## 仍需微调\n与 wav2vec 2.0 类似，需下游标注微调，不支持零样本。\n\n## 聚类偏差\n伪标签来自固定聚类，可能引入系统性偏差；两轮迭代仍非端到端最优。\n\n## 长尾\n极低资源语言仍需相应标注，纯聚类不保证覆盖。"
  },
  "google_usm": {
    "architecture": "## Conformer 编码器\nUSM 采用典型编码器-解码器结构，编码器为 32 层 Conformer 块（卷积增强 Transformer），以 log-Mel 频谱为输入并做卷积子采样。\n\n## 多解码头\n同一编码器可接 CTC、LAS 或 RNN-T 等不同解码头，适配 ASR 与语音翻译任务。\n\n## 规模\n旗舰模型约 2B 参数，另有 600M 与 870M 研究变体。",
    "training": "## 三步走\n第一步在 1200 万小时无标注多语种音频上用 BEST-RQ 自监督预训练；第二步用 280 亿句文本做可选的文本预训练提升质量与覆盖；第三步在小规模有标注数据上微调具体任务。\n\n## 数据\n无标注音频覆盖 300+ 语言，配合 280 亿句文本，覆盖远超以往模型。\n\n## 标注效率\n仅用 Whisper 约 1/7 的有标注数据即可在 FLEURS 上大幅降低 WER。",
    "ablation": "## BEST-RQ 的作用\n论文核心是用 BEST-RQ 随机投影量化做自监督，验证其在超大规模多语种上的可扩展性。\n\n## 文本预训练增益\n加入文本预训练可进一步提升低资源与多语种表现，且为可选步骤。\n\n## 微调数据效率\n少标注微调即可达到强结果，证明大规模无标注预训练的有效迁移。",
    "limitation": "## 闭源\n权重不公开，仅通过 Google Cloud Chirp 等服务提供，难以本地复现与修改。\n\n## 计算成本\n1200 万小时预训练与 2B 参数对算力要求极高。\n\n## 长尾覆盖\n虽覆盖 300+ 语言预训练，但直接 ASR 为 100+ 语言，更深长尾仍需更多标注。"
  },
  "meta_mms": {
    "architecture": "## 基于 wav2vec 2.0\nMMS 沿用 wav2vec 2.0 自监督架构，预训练模型覆盖 1406 种语言；ASR 微调采用 CTC，并配合每语种适配器（adapter）支持 1162 种语言切换。\n\n## 多任务\n同一套预训练表征可微调出 ASR、语音合成（TTS）与语种识别三种模型，互不依赖。\n\n## 规模\nASR 主力为 1B 参数 wav2vec 2.0 模型。",
    "training": "## 数据与自监督\n在约 500,000 小时、1406 种语言的语音上自监督预训练。标注数据来自宗教文本（新约）朗读，覆盖 1100+ 语言，平均每语种约 32 小时。\n\n## 强制对齐\n训练对齐模型并对长录音做多轮强制对齐与交叉验证过滤，得到可用标注。\n\n## 适配器\n推理时通过加载对应语种适配器在单一模型内切换千余种语言。",
    "ablation": "## 语种数 vs 误差\n论文核心发现：从 61 增至 1107 种语言，字符错误率仅上升约 0.4%，而语言覆盖扩大 18 倍以上。\n\n## 对比 Whisper\n在 FLEURS-54 上，MMS 平均 WER 约为 Whisper 的一半，且覆盖语种多 10 倍以上。\n\n## 数据量\n增加每语种标注与预训练数据可进一步降低低资源语言误差。",
    "limitation": "## 领域偏差\n训练音频来自宗教文本朗读，内容单一、多为男性说话人，可能引入域偏置。\n\n## 非商业许可\n模型采用 CC-BY-NC 4.0，禁止商业使用。\n\n## TTS 自然度\n基于 32 小时朗读数据的 TTS 在语音自然度与多样性上有限。"
  },
  "qwen2_audio": {
    "architecture": "## 音频编码器 + LLM\nQwen2-Audio 由音频编码器（处理 Mel 频谱）与 Qwen2 大语言模型组成，把音频离散化为 token 后与大语言模型联合建模。\n\n## 多任务统一\n模型通过指令式提示统一处理 ASR、语音翻译、音频问答、音乐/声音理解等任务，无需每任务独立模型。\n\n## 规模\n以 Qwen2-7B 为语言骨干，整体约 7B 参数。",
    "training": "## 两阶段\n先做音频-文本对齐的预训练，再做多任务监督微调。训练数据涵盖大量 ASR、翻译、音频描述与问答样本。\n\n## 多语种\n支持多语种语音识别与翻译，并通过指令适配不同音频理解任务。\n\n## 指令数据\n多任务指令数据让单一模型在识别、翻译与问答间泛化。",
    "ablation": "## 音频编码器贡献\n论文验证音频编码器表征质量直接决定 ASR 与音频理解下限。\n\n## 指令微调\n多任务指令微调显著提升跨任务泛化，使单一模型覆盖识别、翻译与问答。\n\n## 规模效应\n更大语言骨干带来更好的音频推理与少样本能力。",
    "limitation": "## 延迟\n自回归生成带来较高延迟，非流式友好。\n\n## 音频推理上限\n复杂声学场景（重叠说话、强噪）下仍落后于专用 ASR。\n\n## 数据依赖\n多任务表现依赖训练数据的覆盖与质量。"
  },
  "mini_omni": {
    "architecture": "## 端到端语音对话\nMini-Omni 是首个开源的端到端实时语音对话模型，输入端可为语音或文本，输出端同时包含文本与语音，无需外部 ASR 或 TTS。\n\n## 并行生成\n通过文本-语音同时生成方案，让已生成的文本 token 指导语音 token，降低直接推理语音的难度，并消除等待完整文本的时间。\n\n## 组件\n以 Whisper-small 为语音编码器、Qwen2-0.5B 为语言骨干、SNAC 多码本方法做语音解码，仅 0.5B 参数。",
    "training": "## 三阶段训练\n阶段一冻结 LLM、仅训练 ASR/TTS 适配器做模态对齐；阶段二冻结适配器、让模型在音频输入下做文本推理；阶段三整体微调多模态数据。\n\n## 数据集\n引入 VoiceAssistant-400K（GPT-4o 生成、40 万条）用于语音助手微调，并融合 LibriTTS、VCTK、Open-Orca 等数据。\n\n## Any Model Can Talk\n该训练框架可迁移到任意语言模型，少量参数与分阶段训练即可赋予语音交互能力。",
    "ablation": "## 解码策略\n对比基础并行、文本指导并行与批并行解码，批并行解码借文本推理增强语音质量效果最佳。\n\n## 文本指导\n让文本 token 先出、语音层顺序跟随，可明显降低语音推理错误。\n\n## 参数效率\n0.5B 小模型在保留文本能力前提下实现实时语音交互。",
    "limitation": "## 语音精度\n纯语音 ASR 弱于专用模型：LibriSpeech clean/other 为 4.5% / 9.7%，高于 Whisper-small 的 3.4% / 7.6%。\n\n## 语音自然度\n音频输出质量与专业 TTS 仍有差距。\n\n## 规模\n0.5B 参数限制复杂推理与多任务深度。"
  },
  "seamless_m4t": {
    "architecture": "## 统一多模态\nSeamlessM4T 用一个统一模型覆盖语音识别、语音到文本翻译、语音到语音翻译、文本到语音翻译与文本到文本翻译。\n\n## 语音表征\n语音编码器基于 w2v-BERT 自监督表征，文本侧用 NLLB 多语种翻译模型初始化，解码端可生成文本或单位化语音。\n\n## 规模\n支持约 100 种语言的语音/文本翻译，其中约 35 种支持语音到语音。",
    "training": "## 多任务联合\n在大量多语种语音-文本平行数据上联合训练多个翻译任务，使单一检查点同时具备识别、翻译与语音生成能力。\n\n## 后续版本\nSeamlessM4T v2 进一步用更大数据与改进单位化语音合成（如 w2v-BERT 2.0、文本到单位模型）提升质量。\n\n## 鲁棒训练\n针对噪声与口音的鲁棒训练提升真实场景表现。",
    "ablation": "## 统一 vs 级联\n论文比较统一模型与级联方案，统一模型在保持质量的同时减少级联错误累积与延迟。\n\n## 语音单位\n单位化（hierarchical units）语音表示对跨模态翻译一致性与自然度至关重要。\n\n## 鲁棒性\n噪声与口音鲁棒训练显著提升实际部署表现。",
    "limitation": "## 非商业许可\n采用 CC-BY-NC 4.0，限制商业部署。\n\n## 语音到语音覆盖\n仅约 35 种语言支持语音到语音，少于文本/语音识别覆盖。\n\n## 延迟\n虽优于级联，但自回归生成仍非极低延迟。"
  },
  "valle": {
    "architecture": "\n## 整体范式\nVALL-E 把文本到语音建模为神经编解码器语言模型任务，而非传统的声学特征回归。它使用 EnCodec 将语音离散化为多层 codec token，模型在 token 空间进行条件生成。\n\n## 两阶段生成\n第一阶段为自回归（AR）Transformer，根据音素序列与 3 秒注册语音的声学 token，逐层生成最粗粒度的语义音频 token；第二阶段为非自回归（NAR）Transformer，并行补全剩余细粒度 codec token。两层结构分别负责内容与声学细节。\n\n## 零样本克隆\n推理时仅需一段 3 秒的说话人提示，模型通过上下文学习复现其音色、情感、韵律乃至录音声学环境，无需任何说话人微调。\n",
    "training": "\n## 训练数据\n模型在 LibriLight 数据集上训练，包含约 6 万小时英语语音、7000 多名说话人，多来自 LibriVox 公共领域有声书，规模是传统 TTS 语料的数百倍。\n\n## 训练目标\n以离散音频 codec token 的 next-token 预测为目标，AR 阶段用交叉熵建模粗 token 序列，NAR 阶段预测各细粒度层。大规模数据使模型学到丰富的说话人分布，从而支持推理时少样本上下文学习。\n\n## 未开源\n由于潜在的语音伪造与冒用风险，微软未公开模型权重，研究论文仅以研究用途发布。\n",
    "ablation": "\n## 组件作用\n论文通过 AR 与 NAR 两阶段的组合说明其对音质与稳定性的贡献，并展示改变随机种子可在保持内容下生成不同韵律。\n\n## 多样性\nVALL-E 能在相同文本与提示下产出多样语音，体现语言模型采样特性。\n\n## 复现情况\n因权重未公开，社区主要通过 Amphion 等开源项目进行近似复现与扩展（如 VALL-E X、VALL-E 2）。\n",
    "limitation": "\n## 安全与可及性\n模型权重未发布，仅限研究用途，且存在被用于声音克隆与欺骗的风险，论文也呼吁构建检测模型。\n\n## 质量边界\n在部分样本上仍显机械感，长文本与复杂韵律的连贯性、可控性仍有提升空间。\n\n## 数据依赖\n零样本效果依赖提示音色在训练分布中的覆盖度，罕见口音或极端风格可能退化。\n"
  },
  "voicebox": {
    "architecture": "\n## 生成目标\nVoicebox 是一个非自回归的流匹配（flow matching）生成模型，以 80 维 log-mel 谱图（100Hz）为预测目标，骨干为 24 层 Transformer（约 330M 参数）。\n\n## 填充式训练\n不同于从左向右逐帧生成，Voicebox 在给定部分音频上下文与对应文本的条件下，训练模型对掩蔽区域做语音填充（infilling）。这种掩蔽目标让单组权重可覆盖多种任务。\n\n## 前后向上下文\n模型可同时利用片段的前向与后向上下文做条件生成，比纯前向的 AR 模型更灵活，也为跨语言合成提供可能。\n",
    "training": "\n## 数据规模\n在英语约 6 万小时有声书与跨 6 种语言约 5 万小时、未经过滤或增强的语音上训练，采用条件流匹配目标与最优传输路径。\n\n## 上下文学习\n推理时无需任务专用微调，仅通过提示音频与文本即可执行零样本 TTS、跨语言合成、去噪、内容编辑与风格转换等任务。\n\n## 速度优势\n非自回归采样使其比自回归基线快至多 20 倍。\n",
    "ablation": "\n## 任务通用性\n论文系统对比了不同上下文（仅前向 / 前后向）与掩蔽策略对零样本 TTS、跨语言 TTS、去噪、编辑等任务的影响，验证填充式训练带来的通用能力。\n\n## 与 VALL-E 对比\n在 LibriSpeech 上，Voicebox 将零样本 WER 由 5.9% 降至 1.9%，SIM 由 0.580 提升至 0.681。\n",
    "limitation": "\n## 权重未公开\n出于滥用风险，Meta 仅发布论文、音频样本与检测分类器，未公开模型权重。\n\n## 表征选择\nVoicebox 直接预测 log-mel 谱图而非离散 codec token，后续系统（如 E2-TTS、F5-TTS）多在 codec 或潜表示上进一步演进。\n"
  },
  "natural_speech3": {
    "architecture": "\n## FACodec 解耦\nNaturalSpeech 3 的核心是 FACodec：用分解向量量化（FVQ）把波形编码为内容、韵律、音色、声学细节四个解耦子空间，并可由这些表示重构高质量波形。\n\n## 分解扩散模型\n模型针对音素时长、内容、韵律、声学细节分别用对应的提示生成；其中韵律、内容、声学细节共享一个扩散模型，音色直接从提示提取而无需单独建模。\n\n## 分而治之\n将复杂语音分解为属性子空间，显著降低建模难度，并允许用不同提示分别控制不同属性。\n",
    "training": "\n## 数据/模型缩放\n论文将模型扩展到约 1B 参数，训练数据扩展到约 20 万小时，展示明显的 scaling 能力。\n\n## 解耦训练\nFACodec 借助信息瓶颈、多种监督损失与对抗训练增强属性解耦；扩散模型在各子空间以相应提示条件化训练。\n\n## 开源组件\nFACodec 的代码与预训练模型已通过 Amphion 开源，便于下游复用。\n",
    "ablation": "\n## 解耦增益\n论文验证 FACodec 解耦对零样本音质、相似度与稳定性的提升，并展示把 FACodec 接入自回归 VALL-E 也能显著改善。\n\n## 评测结果\n在 LibriSpeech 上，NaturalSpeech 3 的 CMOS 与真值相当或更优，Sim-O 由 0.64 提升至 0.67，WER 由 1.94 降至 1.81，MCD 平均降低 0.16。\n\n## 属性控制\n通过分别更换时长/韵律等提示，可实现语速、情感等细粒度可控生成。\n",
    "limitation": "\n## 资源需求\n1B 参数与 20 万小时训练对算力和数据要求很高。\n\n## 提示依赖\n仍需参考音频，极细粒度情感与口音复刻依赖提示的覆盖度。\n"
  },
  "audiobox": {
    "architecture": "\n## 流匹配统一框架\nAudiobox 继承 Voicebox 的流匹配生成框架，但预测自编码器（稠密 EnCodec 特征，量化前）的潜表示，而非离散 token。\n\n## 双重提示\n支持描述式提示（自然语言文本）与示例式提示（音频/语音样本），并允许转写、声线与其它音频风格在生成语音时独立控制。\n\n## 统一多模态\n单模型同时覆盖语音与音效生成，可做人声风格化、文生音效与音频填充编辑。\n",
    "training": "\n## 分阶段训练\n先在约 18.5 万小时无标签音频上做自监督掩蔽填充预训练；再用约 10 万小时转写语音训练语音生成，约 6 千小时音效数据训练文生音效。\n\n## 语言化标注\n用大模型将结构化标签/转写转化为自然语言描述，并以语音字幕（含人工标注与 LLM 生成）联合训练统一模型。\n\n## Bespoke Solvers\n提出专用求解器，将流匹配 ODE 采样加速 25 倍以上且不损失性能。\n",
    "ablation": "\n## 提示方式对比\n论文对比描述式与示例式提示、SSL 预训练的作用，验证双重提示的增益。\n\n## Joint-CLAP\n因现成 CLAP 难以区分口音/情感等细粒度风格，提出 Joint-CLAP 评测模型。\n\n## 基准\n零样本 TTS 在 LibriSpeech 上相似度 0.745，文生音效在 AudioCaps 上 FAD 0.77。\n",
    "limitation": "\n## 标注成本\n统一多模态需要大量高质量字幕与音效标注，构建成本高。\n\n## 可控性边界\n细粒度风格控制质量依赖描述文本的准确程度；权重以研究用途发布。\n"
  },
  "e2_tts": {
    "architecture": "\n## 极简输入\nE2-TTS 将文本转为带填充 token 的字符序列，与输入语音长度对齐，无需音素、时长模型或文本编码器。\n\n## 流匹配生成器\n基于流匹配的 mel 谱图生成器在音频填充任务上训练，整体为全非自回归结构，避免了单调对齐搜索等复杂技术。\n\n## 全并行推理\n推理时指定目标长度并行生成 mel 谱图，再由声码器合成波形。\n",
    "training": "\n## 填充目标\n以带噪/掩蔽语音与文本为条件，训练模型预测完整 mel 谱图，学习语音的上下文重建。\n\n## 输入灵活性\n因结构简单，文本输入表示可灵活调整；论文提出若干推理期变体以提升可用性。\n",
    "ablation": "\n## 去复杂化\n论文说明在去除时长模型、G2P、单调对齐后，仅用字符+填充 token 仍能取得与或超越 Voicebox、NaturalSpeech 3 的零样本能力。\n\n## 变体研究\n给出多种推理变体，平衡质量与效率。\n",
    "limitation": "\n## 收敛与鲁棒性\n原始设计存在收敛慢、鲁棒性不足的问题，后续 F5-TTS 以此为基础改进。\n\n## 表示敏感\n对输入文本表示与填充策略较敏感，需要调参以保证稳定性。\n"
  },
  "f5_tts": {
    "architecture": "\n## DiT + 流匹配\nF5-TTS 以流匹配与 Diffusion Transformer（DiT）为骨干，无需时长模型、文本编码器或音素对齐。\n\n## ConvNeXt 文本细化\n文本先经 ConvNeXt V2 模块细化表示，再与填充 token 拼接到与语音等长，便于与语音对齐。\n\n## Sway Sampling\n推理期提出 Sway Sampling 调整流步骤采样权重，显著提升自然度与可懂度，且可免重训应用于其它流匹配模型。\n",
    "training": "\n## 数据\n在公开约 10 万小时多语言数据集（如 Emilia）上训练。\n\n## 对齐改进\nConvNeXt 细化让文本表示更易与语音对齐，缓解 E2-TTS 收敛慢的问题；Sway Sampling 作为推理策略进一步提升质量与效率。\n",
    "ablation": "\n## 模块消融\n论文对比有无 ConvNeXt 文本细化、不同填充策略，证明 ConvNeXt 改善对齐、缩短训练。\n\n## 采样策略\n对比 Sway Sampling 开/关，显示其在 WER 与主观自然度上的明显增益。\n\n## 效率\n推理 RTF 达 0.15，较扩散类 SOTA TTS 显著更快。\n",
    "limitation": "\n## 提示依赖\n仍需参考音频做上下文学习，零样本能力受提示质量影响。\n\n## 训练门槛\n虽比 E2-TTS 更易训练，仍需要足量多语言数据与工程调参。\n"
  },
  "maskgct": {
    "architecture": "\n## 两阶段掩码生成\nMaskGCT 为全非自回归模型：T2S 用文本预测自监督语音模型提取的语义 token；S2A 基于语义 token 预测声学 token；最后由声学编解码器重建波形。\n\n## Mask-and-Predict\n训练时学习在条件与提示下预测被掩蔽的语义/声学 token；推理时按指定长度并行生成，无需显式文本-语音对齐。\n\n## 去对齐去时长\n完全去除音素级时长预测与单调对齐，降低非自回归系统的不自然来源。\n",
    "training": "\n## 大规模数据\n在约 10 万小时真实场景（in-the-wild）多语言语音上训练。\n\n## 学习目标\n以掩码预测为训练目标，迭代式并行解码语义 token，再由 S2A 分层生成多层级声学 token 以保留细节。\n",
    "ablation": "\n## 无对齐优势\n论文验证在无显式对齐与时长预测下，mask-and-predict 仍能取得更优自然度与可懂度。\n\n## 模块配置\n对比 T2S/S2A 各配置，说明语义 token 与分层声学 token 的作用。\n",
    "limitation": "\n## 表征依赖\n性能受 SSL 语义 token 与声学编解码器质量制约。\n\n## 长度指定\n并行生成需指定长度，极端韵律与细粒度情感控制仍受限。\n"
  },
  "seed_tts": {
    "architecture": "\n## 混合基础架构\nSeed-TTS 由语音 tokenizer、自回归 token 语言模型、token 扩散（DiT）与声学声码器组成：tokenizer 从参考语音学 token，AR LM 基于文本与语音 token 生成，DiT 由粗到细生成连续语音表征，声码器重建波形。\n\n## Seed-TTSDiT 变体\n另给出全扩散的非自回归变体 Seed-TTSDiT，不依赖预估计音素时长，端到端生成语音，适用于语音编辑。\n\n## 上下文学习\n仅凭短注册语音即可零样本克隆，在自然度与相似度上匹配真人语音。\n",
    "training": "\n## 三阶段\n大规模预训练、说话人与指令微调、以及基于强化学习（RL）的后训练优化。\n\n## 自蒸馏因子分解\n提出自蒸馏式语音因子分解，在不改结构与损失的前提下实现音色解耦。\n\n## RL 后训练\n用 RL 提升鲁棒性、说话人相似度与可控性，并支持情感等属性控制。\n",
    "ablation": "\n## AR vs DiT\n对比自回归主模型与 Seed-TTSDiT，二者在客观/主观评测上相当；DiT 变体在语音编辑上更有效。\n\n## 因子分解与 RL\n验证自蒸馏因子分解与 RL 后训练对相似度、鲁棒性和可控性的提升。\n\n## 评测数字\n零样本 ICL 在英文 LibriSpeech 上 WER 2.249、SIM 0.762，中文 WER 1.115、SIM 0.796；Seed-TTSDiT 英文 WER 1.733、SIM 0.790。\n",
    "limitation": "\n## 透明度\n作为技术报告未公开完整训练细节与权重，仅开放评测配置。\n\n## 提示覆盖\n零样本对约 15 秒提示的覆盖度依赖较强；在困难说话人上仍不及用 5 小时数据微调的传统系统。\n"
  }
};
globalThis.INSIGHTS = {
  "fireredasr2": [
    {
      "q": "In this technical report, we present FireRedASR2S, a state-of-the-art (SOTA), all-in-one ASR system integrating four modules: FireRedASR2 for ASR, FireRedVAD for VAD and multi-label VAD (mVAD), FireRedLID for multilingual and dialect LID, and FireRedPunc for punctuation prediction.",
      "src": "arXiv:2603.10420 摘要/引言",
      "insight": "FireRedASR2S 的核心思路是把 **VAD/LID/ASR/Punc 四个原本常由异构工具拼凑的模块收进一条统一流水线**，既统一接口又保留各模块独立部署。相比简单堆模块，它强调用 **人工标注的声学事件** 训练 VAD（而非 ASR forced-alignment 弱监督），这是工业级鲁棒性的关键。代价是 FireRedVAD 依赖人工标注数据，标注成本较高。"
    },
    {
      "q": "FireRedASR2 achieves strong results, reaching 2.89% average CER on Mandarin (Avg-Mandarin-4), 11.55% on Chinese dialect (Avg-Dialect-19), and 9.67% on Avg-All-24.",
      "src": "arXiv:2603.10420 实验",
      "insight": "这组数字说明 FireRedASR2 在 **中文（含方言）场景已显著领先 Doubao-ASR / Qwen3-ASR / Fun-ASR 等** 公开对手。值得注意 11.55% 的方言平均 CER 仍是两位数，且 19 个方言基准跨度很大，落地到具体小语种仍需看单集表现，不能只盯平均值。"
    },
    {
      "q": "Future work will focus on further improving performance and expanding support for more languages.",
      "src": "arXiv:2603.10420 结论",
      "insight": "作者自承当前最大的 unfinished business 是 **语言覆盖仍不完整**——FireRedLID 虽标称 100+ 语言，但 ASR 主体强项仍在中文与方言。LLM 变体（8B+）精度最高但部署重，AED 变体（1B+）走效率路线，实际使用要在 **精度-算力-语种覆盖** 三者间权衡。"
    }
  ],
  "nim4_asr": [
    {
      "q": "Grounded in a principled delineation of functional roles between the encoder and the LLM, we redesign the multi-stage training paradigm to align each module with its intended capability boundary.",
      "src": "arXiv:2604.18105 摘要",
      "insight": "NIM4 的出发点很务实：不把 encoder 和 LLM 当成黑盒一起训，而是 **先界定两者各自的职能边界**，再分段训练。相比 Seed-ASR/Fun-ASR 那种端到端对齐，它明确针对「模态鸿沟」和「表征漂移」下药——这两点正是轻量化 LLM-ASR 掉点的根因。"
    },
    {
      "q": "Experiments show that NIM4-ASR achieves state-of-the-art performance on multiple public benchmarks with merely 2.3B parameters, while substantially outperforming larger-scale competitors on internal benchmarks—particularly in entity-intensive real-world scenarios.",
      "src": "arXiv:2604.18105 摘要",
      "insight": "**2.3B 参数就能超更大模型**，关键在它用 RAG 热词注入（百万级、亚毫秒检索）补命名实体，所以在实体密集的真实场景优势明显。但这也暗示其公开榜优势可能部分来自内部数据/热词机制，纯开箱对比时要留意评测口径。"
    },
    {
      "q": "First, the current model supports only Mandarin, English, and a limited set of Chinese dialects, leaving broader multilingual and dialectal coverage as an important direction for future work.",
      "src": "arXiv:2604.18105 局限与未来工作",
      "insight": "明确短板是 **多语与方言覆盖窄**（仅中英+少量方言）。此外作者承认 RL 带来的增益还不够稳定、奖励设计仍有优化空间——对生产系统而言，RL 不稳定的风险在于迭代时回归难排查，这是工程落地要重点盯的点。"
    }
  ],
  "on_device": [
    {
      "q": "Rather than exporting a single monolithic ONNX graph, we decompose the model into three independently optimizable ONNX sessions: the encoder, the decoder, and the joiner.",
      "src": "arXiv:2604.14493 方法",
      "insight": "把模型 **拆成 encoder/decoder/joiner 三个独立 ONNX 会话** 是这套边缘方案的关键工程技巧：既能对 encoder 更激进量化、对 decoder 保守量化，又能让 ONNX Runtime 分别做图级优化（如多头注意力融核）。本质是把 Transducer 的天然模块边界利用到了极致。"
    },
    {
      "q": "On the full evaluation sets, the int4 k-quant variant achieves 8.20% average WER compared to the 8.03% ONNX FP32 baseline, a degradation of only 0.17% absolute despite a 73% reduction in model size (from 2.47 GB to 0.67 GB).",
      "src": "arXiv:2604.14493 讨论",
      "insight": "**模型从 2.47GB 压到 0.67GB（缩 73%），WER 只掉 0.17%**，量化收益惊人；int8 几乎无损（8.01% vs 8.03%）。但注意 ConvInteger/MatMulInteger 整型算子会显著退化到 10.14%——说明 **量化算子选型比 bit 数更致命**，整型累加会在 24 层 Conformer 里累积舍入误差。"
    },
    {
      "q": "Our evaluation focuses on core transcription accuracy and does not cover several important system-level capabilities often required in production settings, such as robust inverse text normalization, speaker diarization, code-switching, custom vocabulary adaptation, or broader internal evaluation suites.",
      "src": "arXiv:2604.14493 讨论",
      "insight": "作者很诚实：这套边缘系统 **只验证了核心转写，没覆盖 ITN/说话人分离/码切换/热词自适应** 等生产必需能力。所以「ESB 上接近生产系统」的结论要打折——它更像是隐私/离线/低延迟场景的强选项，而非端到端生产替代品。另一个代价是仅英文。"
    }
  ],
  "voxtral_mini": [
    {
      "q": "Unlike approaches that adapt offline models through chunking or sliding windows, Voxtral Realtime is trained end-to-end for streaming, with explicit alignment between audio and text streams.",
      "src": "arXiv:2602.11298 摘要",
      "insight": "Voxtral Realtime 的关键判断是：**流式 ASR 不该靠把离线模型切块/滑窗凑出来**，而应端到端为流式训练、显式对齐音频流与文本流。这避开 chunking 方案的固有缺陷（块边界截断、延迟-精度权衡僵化），是它能在亚秒延迟下仍逼近离线质量的前提。"
    },
    {
      "q": "Our architecture builds on the Delayed Streams Modeling framework, introducing a new causal audio encoder and Ada RMS-Norm for improved delay conditioning.",
      "src": "arXiv:2602.11298 摘要/方法",
      "insight": "具体手段是在 Delayed Streams Modeling 上引入 **因果音频编码器 + Ada RMS-Norm**：前者保证流式可解码，后者自适应调节延迟条件，让模型在不同延迟预算下稳定输出。这类「延迟感知」归一化是流式 ASR 把延迟和精度解耦的工程要点。"
    },
    {
      "q": "We scale pretraining to a large-scale dataset spanning 13 languages. At a delay of 480ms, Voxtral Realtime achieves performance on par with Whisper... We release the model weights under the Apache 2.0 license.",
      "src": "arXiv:2602.11298 摘要",
      "insight": "落地规模与开放度：预训练覆盖 **13 种语言**，在 **480ms 延迟**下达到与 Whisper 相当的质量——即「流式也能打离线 SOTA」。权重以 **Apache 2.0 开放**，可直接自托管，对需要低延迟又不愿依赖闭源 API 的场景是 Whisper 之外的高性价比流式替代。"
    }
  ],
  "vibevoice_asr": [
    {
      "q": "Unlike traditional pipelined approaches that rely on audio chunking, VIBEVOICE-ASR supports single-pass processing for up to 60 minutes of audio. It unifies Automatic Speech Recognition, Speaker Diarization, and Timestamping into a single end-to-end generation task.",
      "src": "arXiv:2601.18184 摘要",
      "insight": "VIBEVOICE-ASR 主打 **单趟处理 60 分钟、把 ASR/说话人分离/时间戳统一成一个端到端生成任务**，直接解决长音频的「上下文碎片」问题——传统分块流水线会丢失跨块信息。这是与 VIBEVOICE 同源、但把多任务塞进同一生成流的关键升级。"
    },
    {
      "q": "By leveraging an ultra-low frame rate tokenizer (7.5 Hz), VIBEVOICE-ASR compresses an hour-long audio in a single pass by ingesting continuous latents from dual-tokenizers alongside optional user-provided context.",
      "src": "arXiv:2601.18184 方法",
      "insight": "**7.5Hz 超低帧率 tokenizer 是单趟长音频能塞进上下文窗口的前提**：3600s×7.5=27000 tokens，刚好在 LLM 上下文量级内。配合 prompt 上下文注入（领域术语/多音字消歧），让它能在不显式设语言的情况下处理 50+ 语言与码切换。代价是超低帧率可能损失细粒度韵律/音素边界信息——靠双 tokenizer（声学+语义）互补缓解。"
    },
    {
      "q": "The current architecture generates a serialized output stream and does not explicitly handle overlapping speech (the cocktail party problem). In scenarios where multiple speakers talk simultaneously, the model tends to transcribe the dominant speaker, potentially missing secondary information.",
      "src": "arXiv:2601.18184 结论与局限",
      "insight": "两个明确局限：**(1) 多语遗忘**——预训练覆盖 50+ 语言但 SFT 偏英/中/码切换，低资源语言会退化；(2) **重叠语音（鸡尾酒会问题）**——串行输出流只转写主导说话人，漏掉次要信息。前者靠开源微调代码社区补，后者需未来做 separation-aware 建模，是长音频会议场景的硬伤。"
    }
  ],
  "stepaudio25": [
    {
      "q": "Rather than treating these tasks as architecturally distinct, we operate on the premise that once text and audio share a multimodal representational space, task specialization becomes a matter of operational regimes: data construction, optimization targets, and decoding constraints.",
      "src": "arXiv:2605.23463 摘要",
      "insight": "StepAudio 2.5 的理论前提是：**ASR/TTS/实时对话不是三种架构，而是同一多模态表征空间里的不同「操作机制」**（数据构造、优化目标、解码约束）。这比「加几个任务头」更彻底——它用统一 backbone + 分支路训练去逼近专用系统，是统一音频-语言模型路线的一次硬核验证。"
    },
    {
      "q": "the ASR branch advances transcription efficiency via verifiable multi-token decoding; the TTS branch achieves controllable, expressive synthesis through preference-based RLHF and context-rich supervision; and the Realtime branch realizes low-latency, persona-consistent dialogue via generative reward modeling within an RLHF framework.",
      "src": "arXiv:2605.23463 摘要",
      "insight": "落地手段是 **把 RLHF 做成三条专业化分支**：ASR 用可验证多 token 解码（MTP）提速、TTS 用偏好 RLHF 控表达、Realtime 用生成式奖励模型保人格一致。亮点在于「可验证」信号用于 ASR/TTS 这种有 ground-truth 的任务，而开放式对话质量则用生成奖励兜底——任务性质决定奖励来源不同。"
    },
    {
      "q": "Despite this shared direction, simultaneously meeting the deployment requirements of all three capabilities within a single model remains challenging.",
      "src": "arXiv:2605.23463 引言",
      "insight": "作者也承认 **单模型同时满足三套部署需求（长转录/可控合成/低延迟对话）本就困难**，三者目标并不天然对齐。统一模型的隐性代价是：任一分支要做到极致都需专门 RLHF 工程，且极端条件下可能仍略逊于纯专用系统——所以「匹配/超越专用系统」的结论要分场景看，不能当成全面碾压。"
    }
  ],
  "qwen_audio_tts": [
    {
      "q": "Building on CosyVoice2 and CosyVoice3, it retains efficient semantic planning while conditioning the flow-matching acoustic renderer on continuous LM hidden states and jointly optimizing the LM and FM, thereby alleviating the information bottleneck of a token-only interface.",
      "src": "arXiv:2607.23938 引言",
      "insight": "Qwen-Audio-3.0-TTS 的关键改动是 **让 flow-matching 声学渲染器直接条件于连续 LM 隐状态、并联合优化 LM 与 FM**，缓解了 CosyVoice 系列「单 codebook 离散接口」的信息/优化瓶颈。等于在保持 AR 语义规划高效的同时，把声学生成从离散 token 约束里解放出来。"
    },
    {
      "q": "A 12.5 Hz supervised speech tokenizer reduces autoregressive decoding cost while retaining content and speaker information.",
      "src": "arXiv:2607.23938 贡献",
      "insight": "**12.5Hz 低帧率 tokenizer** 是它兼顾效率与质量的支点：相比 25Hz，AR 解码步数减半，长音频延迟和成本明显下降，又靠监督训练保住内容与说话人信息。配合五阶段渐进训练（独立预训练→联合退火→LM RL→FM 鲁棒→FM RL）系统化解耦 LM 与 FM 的优化节奏。"
    },
    {
      "q": "Standard short-form clean-speech benchmarks capture only part of these requirements and can obscure failures in multilingual, dialectal, long-form, and adverse acoustic conditions.",
      "src": "arXiv:2607.23938 引言",
      "insight": "作者自己点破：**短音频干净语音基准只能覆盖部分需求，会掩盖多语/方言/长音频/噪声下的失败**。这既是评测警示，也间接暴露该模型的真实风险区——其主打的 16 语言、20 方言区、3 分钟长音频、抗噪参考等能力，恰恰是最难被标准榜验证、最需要在生产环境实测的部分。"
    }
  ],
  "luna_tts": [
    {
      "q": "Modern text-to-speech (TTS) is dominated by autoregressive (AR) codec language models, whose left-to-right decoding carries structural costs: latency that grows with utterance length, error accumulation along the committed prefix, and an artificial generation order imposed on the Residual Vector Quantization (RVQ) token grid, which possesses none.",
      "src": "arXiv:2608.11593 摘要",
      "insight": "LUNA 的立论很尖锐：**AR codec LM 的左到右解码对 RVQ token 网格是「人为强加顺序」**——RVQ 本是二维网格，没有天然时序，于是带来延迟随长度增长、前缀错误累积两大结构代价。这是它转向扩散语言模型的动机，也点醒了整个 AR-TTS 范式的根本低效。"
    },
    {
      "q": "Luna-TTS is fully non-autoregressive: it generates the entire RVQ token grid of an utterance in a fixed number of parallel refinement steps, with zero-shot voice cloning and speech editing arising natively as infilling.",
      "src": "arXiv:2608.11593 摘要/贡献",
      "insight": "LUNA 直接 **用 masked diffusion 在整个 RVQ 网格上做固定步数并行细化**，零样本克隆与编辑天然就是 infilling，不需专门模块。它把预训练 Qwen3 文本 LLM 经 causal→bidirectional→block-causal 渐进适配，借文本侧任何顺序生成能力补 RVQ 几何——这是「从文本 LLM 改 TTS」比从零训 codec LM 更省力的关键。"
    },
    {
      "q": "Under the warmed local serving protocol, Luna-TTS Realtime achieves an end-to-end RTF of 0.0240 and commits its first 1.28s decoded audio block in 41.6 ms, corresponding to more than 40× real-time generation within the measured engine boundary.",
      "src": "arXiv:2608.11593 摘要",
      "insight": "实时变体用 **块级（32 帧/1.28s）AR + 块内并行去噪**，RTF 0.0240、首块 41.6ms、>40× 实时，延迟不再随句长线性涨。代价/边界是：GRPO 强化只在已实现去噪轨迹上算 policy ratio，且持续训练从 Luna-TTS 继承，流式质量高度依赖 block-causal 适配是否充分——Seed-TTS-Eval 四项最佳说明这条路目前站得住。"
    }
  ],
  "zonos2": [
    {
      "q": "We pioneer the use of MoE models in the open-source TTS space, building upon the ZAYA1 architecture.",
      "src": "arXiv:2606.24320 Section I Contributions",
      "insight": "**核心创新**：ZONOS2 是首个将 **MoE（Mixture-of-Experts）** 骨干引入开源 TTS 的工作，总参 8B、激活仅 900M，在保持低推理开销的同时把模型容量推到 SOTA 级。对比此前的稠密 AR TTS（如 VALL-E、NatureSpeech 系列），MoE 让开源社区第一次在“参数规模 vs. 推理成本”上对齐闭源大模型，是开放语音合成的重要分水岭。"
    },
    {
      "q": "To achieve low latency, we use a delay pattern approach to codebook generation which generates multiple codebook tokens in parallel by overlapping the generation of different codebooks of different timesteps.",
      "src": "arXiv:2606.24320 Section I",
      "insight": "**关键方法**：采用 delay pattern 让多个 RVQ codebook 在时间维上错位并行生成，而非逐 codebook 串行，从而把流式延迟压到可接受范围。代价是 codebook 预测与 delay 模式耦合，带来后续训练不稳定（见局限），但换来了接近实时的零样本克隆体验。"
    },
    {
      "q": "A large portion of the instability in the final ZONOS2 model can be attributed to the inherent difficulty of delayed DAC token prediction.",
      "src": "arXiv:2606.24320 Section VII Discussion",
      "insight": "**主要局限**：延迟 DAC token 预测本身训练难度高，是 ZONOS2 大量不稳定性的根源；论文明确把“探索替代音频 codec 以稳定训练、提升鲁棒性与推理效率”列为未来工作。换言之，其强表达力部分建立在较脆弱的训练动态之上，换 codec 是主要改进方向。"
    }
  ],
  "omnivoice": [
    {
      "q": "We present OmniVoice, a massively multilingual zero-shot text-to-speech (TTS) model that scales to over 600 languages. At its core is a novel diffusion language model-style discrete non-autoregressive (NAR) architecture.",
      "src": "arXiv:2604.00688 Abstract",
      "insight": "**核心创新**：OmniVoice 把零样本 TTS 推向 **600+ 语言**，且用“扩散语言模型”风格的离散 NAR 架构直接从文本映射到多 codebook 声学 token，绕开传统“文本→语义→声学”两段式级联。对比同期的 Seed-TTS / CosyVoice（多聚焦中英），它是目前语言覆盖最广的开源 TTS 之一。"
    },
    {
      "q": "To circumvent this limitation, OmniVoice adopts a fully stochastic masking strategy across all codebook layers.",
      "src": "arXiv:2604.00688 Section 2.1.1",
      "insight": "**关键方法**：全 codebook 随机掩码（每个 token 独立按 Bernoulli 采样）替代以往“单层掩码”，让每次迭代平均优化约 50% 的 token 矩阵，显著提升训练效率；并借助预训练 LLM 初始化保证低资源语言的可懂度。这是其能在 581k 小时开放数据上稳定训出 600 语的关键训练技巧。"
    },
    {
      "q": "Unlike continuous-space NAR TTS models, where inference steps can be drastically reduced via techniques such as flow distillation, no existing approach enables comparable inference acceleration for discrete-space NAR TTS models.",
      "src": "arXiv:2604.00688 Section E Limitations and Future Works",
      "insight": "**主要局限**：离散空间 NAR 缺少像 flow distillation 那样成熟的推理加速手段，步数难以大幅压缩，推理效率是明显短板；此外仅用开源数据、缺乏高质量指令微调数据也限制了可控语音设计上限。相比连续隐空间扩散 TTS（如 LongCat-AudioDiT），其加速路线仍是开放问题。"
    }
  ],
  "stepaudio25_tts": [
    {
      "q": "Crucially, we move beyond basic supervised fine-tuning (SFT) by establishing Reinforcement Learning from Human Feedback (RLHF) as the central mechanism for capturing nuanced human preferences and paralinguistic behaviors.",
      "src": "arXiv:2605.23463 Section 1",
      "insight": "**核心创新**：StepAudio 2.5 把 **RLHF 作为统一音频-语言基础模型的核心对齐机制**，而非仅做 SFT。聚焦 TTS 分支，这意味着“可控且富有表现力的合成”由人类偏好而非固定标签驱动——区别于大多数 TTS 仅用重建/对齐损失训练的做法。"
    },
    {
      "q": "The TTS branch adapts the backbone for controllable generation via semantic-to-audio alignment, integrating context-rich supervision with human-preference-driven RLHF.",
      "src": "arXiv:2605.23463 Section 1",
      "insight": "**关键方法**：TTS 分支通过 “语义→音频对齐” 衔接共享骨干，并把 **context-rich supervision（富上下文监督）** 与偏好 RLHF 结合，使同一套多模态先验可被塑造成可控表达合成。结论显示该方法在三大能力基准上同时超越领先统一模型与专用系统，验证了“后训练即杠杆”的论点。"
    },
    {
      "q": "These objectives are not naturally aligned, and existing unified systems often achieve strong performance on some capabilities while remaining behind specialized systems on others.",
      "src": "arXiv:2605.23463 Section 1",
      "insight": "**主要局限**：统一模型在 ASR / TTS / 实时交互三者目标并不天然一致，往往“某些能力强、某些落后专用系统”。论文据此把“补齐统一与专用系统差距”作为持续研究方向——即当前 StepAudio 2.5 仍是在能力权衡中做工程取舍，而非全面超越各专用 SOTA。"
    }
  ],
  "wavtts": [
    {
      "q": "In this paper, we proposed WavTTS, an end-to-end zero-shot TTS framework that directly models speech in the raw waveform space.",
      "src": "arXiv:2606.03455 Section 6 Conclusion",
      "insight": "**核心创新**：WavTTS 是首个**直接在原始波形空间**端到端生成语音的 TTS 框架，完全不依赖 neural codec、vocoder 或 VAE 中间表示，避开了离散/压缩表示带来的信息损失。对比 F5-TTS、E2 TTS 等基于 codec token 的 NAR 模型，它开辟了一条“原生波形生成”的简洁范式。"
    },
    {
      "q": "By combining flow matching with a Diffusion Transformer backbone and an efficient patchification strategy, WavTTS enables tractable modeling of high-dimensional time-domain signals without relying on neural codecs, vocoders, or autoencoders.",
      "src": "arXiv:2606.03455 Section 6 Conclusion",
      "insight": "**关键方法**：用 flow matching + DiT 骨干 + 非重叠 patchification 把超高维时域信号变可计算，并辅以 x-prediction 目标、多尺度 mel 监督、信号-噪声方差对齐。实验上它逼近基于压缩表示的 SOTA NAR 零样本 TTS，同时大幅超越更早的端到端语音生成系统，证明原生波形路线可行。"
    },
    {
      "q": "Sway Sampling provides only a limited degree of timestep shifting, which we find insufficient for high-dimensional raw waveform generation.",
      "src": "arXiv:2606.03455 Section 3",
      "insight": "**主要局限**：高维原始波形的 ODE 积分对早期高噪声步极敏感，常规 Sway Sampling 的时延偏移不足，需专门提出 **PolyShift** 复合噪声偏移调度来抑制伪影。说明原生波形生成对推理调度更挑剔，调参/算力成本高于基于 mel/codec 的成熟方案，是其落地的主要代价边界。"
    }
  ],
  "longcat_audiodit": [
    {
      "q": "Unlike previous methods that rely on intermediate acoustic representations such as mel-spectrograms, the core innovation of LongCat-AudioDiT lies in operating directly within the waveform latent space.",
      "src": "arXiv:2603.29339 Abstract",
      "insight": "**核心创新**：LongCat-AudioDiT 是非自回归扩散 TTS，**直接在波形 latent 空间**操作，只需 Wav-VAE + 扩散骨干，省去 mel/codec 级联，从根上缓解误差累积。对比依赖 mel 的 DiTTo-TTS、E2/F5，它用更精简的单阶段管线拿到更强零样本克隆相似度。"
    },
    {
      "q": "we investigate the interplay between the Wav-VAE and the TTS backbone, revealing the counterintuitive finding that superior reconstruction fidelity in the Wav-VAE does not necessarily lead to better overall TTS performance.",
      "src": "arXiv:2603.29339 Abstract",
      "insight": "**关键实验结论**：反直觉地发现 Wav-VAE 重建保真度更高**并不**必然带来更好的 TTS（RQ2 消融验证）。这提示“VAE 重建上界=生成上界”的朴素假设不成立，对后续 codec/VAE 设计有直接警示意义；同时其 3.5B 变体在 Seed-ZH/Hard 的 SIM 从 0.809/0.776 提升至 0.818/0.797。"
    },
    {
      "q": "While our error rates slightly trail heavily engineered proprietary systems like Qwen3-TTS and CosyVoice3.5, it is crucial to emphasize that those models rely on complex multi-stage training pipelines and massive amounts of high-quality, human-annotated data.",
      "src": "arXiv:2603.29339 Section 5.2",
      "insight": "**主要局限**：在可懂度（WER/CER）上仍略逊于 Qwen3-TTS、CosyVoice3.5 等重度工程化闭源系统；其优势建立在“极简端到端 + 单阶段训练”之上，意味着若要进一步追平顶尖可懂度，可能不得不引入那些它刻意回避的复杂多阶段/人工标注流程——这是简化架构付出的客观代价。"
    }
  ],
  "voxcpm2": [
    {
      "q": "We present VoxCPM2, a fully open-source multilingual and controllable speech generation foundation model that extends the hierarchical diffusion-autoregressive modeling paradigm of VoxCPM.",
      "src": "arXiv:2606.06928 Abstract",
      "insight": "**核心创新**：VoxCPM2 把 **分层扩散-自回归（hierarchical continuous-latent）** 范式扩展到 2B 参数、30 语言 + 9 中文方言的统一基础模型，并以 Apache 2.0 完全开源。它**不依赖任何外部离散 tokenizer**，仅凭连续隐变量即可支撑多语与可控生成，是开源语音基础模型里覆盖度与可复现性都突出的代表。"
    },
    {
      "q": "VoxCPM2 advances the framework in three key dimensions: (i) capability, by unifying 30 languages, 9 Chinese dialects, natural-language voice design, style-controllable voice cloning, and high-fidelity continuation cloning within a single backbone; (ii) quality, through an asymmetric AudioVAE that encodes at 16 kHz and reconstructs at 48 kHz, enabling implicit super-resolution with high encoding efficiency; and (iii) scale, by jointly scaling the model to 2B parameters and the training data to over 2 million hours of multilingual speech.",
      "src": "arXiv:2606.06928 Abstract",
      "insight": "**关键方法**：三大支柱——(1) 统一序列组织把五种生成配置（基础 TTS / 声音设计 / 参考克隆 / 可控克隆 / 续写克隆）表达为同一组输入块的不同排布，单一目标联合训练；(2) **非对称 AudioVAE**（16kHz 编码→48kHz 重建）实现隐式超分且编码高效；(3) 2M 小时数据 + 2B 参数规模化。内部 30 语评测平均 WER 仅 1.68%。"
    },
    {
      "q": "Note that even with this threshold, the selected reference clips may still differ in fine acoustic details from the target, so reference-based cloning naturally achieves lower similarity than continuation-based cloning.",
      "src": "arXiv:2606.06928 Section 3.6",
      "insight": "**主要局限**：参考克隆的相似度天然低于续写克隆——因为即使按说话人嵌入阈值（>0.7）筛选，参考片段与目标在细粒度声学细节上仍有差异，且参考音频无需对齐文本。换言之，纯“参考音频 + 自然语言风格”可控克隆在相似度上让位于需要参考文本前缀的续写式克隆，是解耦身份与风格设计带来的固有权衡。"
    }
  ],
  "voxtral_tts": [
    {
      "q": "We introduce Voxtral TTS, an expressive multilingual text-to-speech model that generates natural speech from as little as 3 seconds of reference audio. Voxtral TTS adopts a hybrid architecture that combines auto-regressive generation of semantic speech tokens with flow-matching for acoustic tokens.",
      "src": "arXiv:2603.25551 Abstract",
      "insight": "**核心创新**：Voxtral TTS 用 **混合架构**——AR 生成语义 token 保证长程一致，flow-matching 生成声学 token 保证丰富声学细节——仅需 3 秒参考音频即做多语零样本克隆。相比纯 AR（VALL-E 系）或纯 NAR 扩散（E2/F5），它取两者之长，并为后续把 DPO 适配到“离散-连续混合”设定打下基础。"
    },
    {
      "q": "In human evaluations conducted by native speakers, Voxtral TTS is preferred for multilingual voice cloning due to its naturalness and expressivity, achieving a 68.4% win rate over ElevenLabs Flash v2.5.",
      "src": "arXiv:2603.25551 Abstract",
      "insight": "**关键实验结论**：在母语者人工评测中，Voxtral TTS 多语声音克隆以 **68.4% 胜率** 超过 ElevenLabs Flash v2.5（旗舰音也达 58.3%）。这是闭源商业 TTS 被开源/开放权重模型在主观偏好上反超的强信号，且模型仅 4B、支持 9 语言、低延迟流式，性价比突出。"
    },
    {
      "q": "We optimize the model using the combined DPO loss along with the pretraining objective on high-quality speech for 1 epoch, as we found that training longer on synthetic data led to more robotic speech.",
      "src": "arXiv:2603.25551 Section 3.2",
      "insight": "**主要局限**：偏好对齐（flow-DPO）对训练极敏感——在合成数据上多训一个 epoch 就会导致“更机械”的语音，被迫只用 1 epoch 且学习率压到 8e-8；同时权重以 **CC BY-NC** 发布（非商用），且拒绝采样构造偏好对依赖外部 LLM 与多个判分模型，偏好数据工程成本高、可控性受许可与数据质量双重约束。"
    }
  ],
  "indextts2": [
    {
      "q": "IndexTTS2 is the first autoregressive zero-shot TTS model to combine precise duration control with natural duration generation, and the method is scalable for any autoregressive large-scale TTS model.",
      "src": "arXiv:2506.21619 Section Contributions",
      "insight": "**核心创新**：IndexTTS2 是**首个同时支持“精确时长控制”与“自然时长生成”的 AR 零样本 TTS**——既可在音视频同步（配音）场景指定语义 token 数锁定时长，也可自由 AR 生成保留提示韵律。它补上了 AR 模型长期短板（逐 token 生成难控时长），且方法可推广到任意 AR 大规模 TTS。"
    },
    {
      "q": "emotional and speaker-related features are decoupled from the prompts, and a feature fusion strategy is designed to maintain semantic fluency and pronunciation clarity during emotionally rich expressions.",
      "src": "arXiv:2506.21619 Section Contributions",
      "insight": "**关键方法**：用 **GRL（梯度反转层）** 把情感与说话人身份解耦，使情感向量只捕捉情绪/节奏、对音色不变，从而可独立控制“音色”和“情绪”；再辅以 GPT latent 增强稳定高情感下的发音清晰度、以及三阶段训练。实验显示其在情感MOS/相似度上全面超越 MaskGCT、F5-TTS、CosyVoice2 等。"
    },
    {
      "q": "removing the three-stage training strategy severely degrades emotional expressiveness, resulting in substantial performance drops across all metrics except WER.",
      "src": "arXiv:2506.21619 Section Experiment Results",
      "insight": "**主要局限**：情感表现力高度依赖复杂的三阶段训练与 GPT latent 融合——一旦移除，情感维度近乎崩塌（除 WER 外各指标大幅下滑）。这意味着其“高情感保真”是以较重训练管线为代价的；此外训练数据仅 55K 小时、集中在中英（30K 中文 + 25K 英文），多语覆盖远不及 OmniVoice 的 600+ 语言，是明显的语种类边界。"
    }
  ],
  "mega_tts3": [
    {
      "q": "Specifically, we provide sparse alignment boundaries to MegaTTS 3 to reduce the difficulty of alignment without limiting the search space, thereby achieving high naturalness.",
      "src": "arXiv:2502.18924 Abstract",
      "insight": "**核心创新**：主流零样本 TTS 在「是否显式建模语音-文本对齐」上两极分化——无对齐的模型（如 VALL-E 类）鲁棒性差、硬句易崩，**强制对齐**模型则受对齐自然度约束。MegaTTS 3 用**稀疏对齐边界**引导 DiT：只给少量边界约束、不限制生成的搜索空间，从而同时拿到对齐鲁棒性与高自然度。这是把「对齐难」从模型内部隐式学习改为外部稀疏监督的关键范式转变。"
    },
    {
      "q": "Moreover, we employ a multi-condition classifier-free guidance strategy for accent intensity adjustment and adopt the piecewise rectified flow technique to accelerate the generation process.",
      "src": "arXiv:2502.18924 Abstract",
      "insight": "**关键方法**：两个实用设计。其一是**多条件 classifier-free guidance（CFG）**，把口音强度作为独立条件注入，实现「同一说话人、可调口音轻重」的细粒度控制，对比传统需重新训练的说话人/口音解耦更灵活；其二是**分段 rectified flow**，把生成轨迹分段线性化以加速采样。"
    },
    {
      "q": "our system can generate high-quality one-minute speech with only 8 sampling steps.",
      "src": "arXiv:2502.18924 Abstract",
      "insight": "**效率与边界**：仅 8 步采样即可合成一分钟高质量语音，推理成本是传统扩散（常需 50–1000 步）的量级下降，利于落地。但论文重心在零样本音质与口音可控性，说话人相似度、长程韵律一致性、与更大规模模型的公平对比在原文评测中并未充分展开，需结合后续榜单判断上限。"
    }
  ],
  "wav2vec2": [
    {
      "q": "We show for the first time that learning powerful representations from speech audio alone followed by fine-tuning on transcribed speech can outperform the best semi-supervised methods while being conceptually simpler.",
      "src": "arXiv:2006.11477 Abstract",
      "insight": "**为何成为范式**：首次证明「自监督预训练表示 + 少量标注微调」能超过当时最佳半监督 ASR，且概念更简洁。它把 ASR 从「堆标注」转向「堆无标注语音」，直接催生 XLSR、HuBERT、WavLM 等一整条自监督语音表示路线，是后续 Whisper、USM、MMS 的表征基础。"
    },
    {
      "q": "Using just ten minutes of labeled data and pre-training on 53k hours of unlabeled data still achieves 4.8/8.2 WER.",
      "src": "arXiv:2006.11477 Abstract",
      "insight": "**关键实验结论**：仅 10 分钟标注 + 53k 小时无标注，就在 LibriSpeech 上拿到 4.8/8.2 WER，证明极低资源语言也能靠无标注语音做出可用识别。代价是：它产出的是**表示**而非端到端识别器，仍需带 CTC/微调头的任务特定训练，且 10 分钟档仍有明显拼写错误。"
    },
    {
      "q": "We expect performance gains by switching to a seq2seq architecture and a word piece vocabulary.",
      "src": "arXiv:2006.11477 Conclusion",
      "insight": "**时代局限/未来工作**：wav2vec 2.0 仍是「对比学习预训练 + CTC 微调」范式，作者自己指出换 **seq2seq 架构与子词词表**还能再涨点。这也正是其时代局限——非端到端、无流式、无多语言/多任务统一，这些后来由 Whisper、USM 等补齐。"
    }
  ],
  "hubert": [
    {
      "q": "we propose the Hidden-Unit BERT (HuBERT) approach for self-supervised speech representation learning, which utilizes an offline clustering step to provide aligned target labels for a BERT-like prediction loss.",
      "src": "arXiv:2106.07447 Abstract",
      "insight": "**核心创新**：与 wav2vec 2.0 的「在线量化+对比学习」不同，HuBERT 先用**离线聚类**生成对齐伪标签，再用 **BERT 式掩码预测**去预测这些隐藏单元。它把语音自监督从「对比」扭成「预测聚类目标」，思路更接近 NLP 的 MLM。"
    },
    {
      "q": "HuBERT relies primarily on the consistency of the unsupervised clustering step rather than the intrinsic quality of the assigned cluster labels.",
      "src": "arXiv:2106.07447 Abstract",
      "insight": "**关键方法洞察**：HuBERT 的成功不依赖聚类标签本身多「准」，而依赖**聚类结果的一致性**——只要伪标签稳定，模型就能学到好表示。这降低了「伪标签必须语义正确」的门槛，也解释了为何简单 k-means 教师就能匹敌甚至超过 wav2vec 2.0。"
    },
    {
      "q": "Using a 1B parameter model, HuBERT shows up to 19% and 13% relative WER reduction on the more challenging dev-other and test-other evaluation subsets.",
      "src": "arXiv:2106.07447 Abstract",
      "insight": "**实验结论与边界**：1B 参数下在更难集 dev-other/test-other 上相对降 WER 19%/13%，验证「预测式」自监督在大模型上更优。但代价是离线聚类带来额外流程与迭代（需多轮聚类），且同样是非端到端、需任务特定微调，时代局限与 wav2vec 2.0 类似。"
    }
  ],
  "whisper": [
    {
      "q": "When scaled to 680,000 hours of multilingual and multitask supervision, the resulting models generalize well to standard benchmarks and are often competitive with prior fully supervised results but in a zero-shot transfer setting without the need for any fine-tuning.",
      "src": "arXiv:2212.04356 Abstract",
      "insight": "**核心创新/为何成为范式**：用 68 万小时「弱监督」网络转录音频做大规模多任务训练，模型在**零样本迁移**下即可泛化到标准基准、常媲美全监督结果。它把 ASR 从「单语料精调」推向「海量弱标 + 零样本」，成为开源语音识别的事实基线。"
    },
    {
      "q": "Whisper departs noticeably from most recent state-of-the-art speech recognition systems due to the lack of unsupervised pre-training or self-teaching methods.",
      "src": "arXiv:2212.04356 Section 6.3",
      "insight": "**关键设计选择**：Whisper 刻意**不做无监督预训练/自训练**，纯靠弱标数据规模取胜——这与同期 wav2vec 2.0/HuBERT 路线截然相反。代价是数据效率偏低：同样精度需要远比自监督+少量标注更多的标注小时数，且作者也承认加入自监督可能进一步提升。"
    },
    {
      "q": "Whisper models are trained on 30-second audio chunks and cannot consume longer audio inputs at once.",
      "src": "arXiv:2212.04356 Section 3.8",
      "insight": "**主要局限（诚实写出）**：Whisper 以 30 秒分块训练、**无法一次性吃下长音频**，无原生流式、无说话人分离。此外（见 5.3）其预训练数据**高度偏英语**（采集偏英语互联网），多数语言训练不足 1000 小时，长尾语言 WER 仍很差。这是弱监督规模化的典型代价。"
    }
  ],
  "google_usm": [
    {
      "q": "This is achieved by pre-training the encoder of the model on a large unlabeled multilingual dataset of 12 million (M) hours spanning over 300 languages, and fine-tuning on a smaller labeled dataset.",
      "src": "arXiv:2303.01037 Abstract",
      "insight": "**核心创新/规模化**：用 **1200 万小时、覆盖 300+ 语言**的无标注多语料预训练编码器，再小标注微调，首次把「通用语音模型」推到百语以上规模。它直接对标 Whisper 的英语重心，把多语言覆盖作为第一目标。"
    },
    {
      "q": "We also demonstrate that despite using a labeled training set 1/7-th the size of that used for the Whisper model [1], our model exhibits comparable or better performance on both in-domain and out-of-domain speech recognition tasks across many languages.",
      "src": "arXiv:2303.01037 Abstract",
      "insight": "**关键实验结论**：仅用 Whisper **1/7 的标注量**就达到可比或更好性能，说明「海量无标注多语预训练 + 少量标注」比「纯弱标规模」更高效。方法上靠 **随机投影量化（BEST-RQ）** 与**语音-文本模态匹配**实现多语规模化。"
    },
    {
      "q": "We believe diverse unlabeled data is more practical to acquire for building usable ASR for tail languages than weakly labeled data.",
      "src": "arXiv:2303.01037 Section 6 Discussion",
      "insight": "**规模化教训（长尾代价）**：USM 的核心教训是——对**长尾/低资源语言**，多样无标注数据比弱标数据更易获取、更值得投入（需与母语者协作找无标数据）。但论文也显示低资源语言 WER 仍显著高于高资源语言，**数据规模 ≠ 长尾质量**，尾部语言覆盖与精度仍是开放问题。"
    }
  ],
  "meta_mms": [
    {
      "q": "The MMS project increases the number of supported languages by 10-40x, depending on the task.",
      "src": "arXiv:2305.13516 Abstract",
      "insight": "**核心创新/规模化极致**：MMS 把语音技术覆盖**提升 10–40 倍**，建成 1406 语言 wav2vec 2.0、1107 语言 ASR/TTS、4017 语言语言识别，是迄今语言覆盖最广的语音项目，把「多语言规模化」推到千语级。"
    },
    {
      "q": "our multilingual speech recognition model more than halves the word error rate of Whisper on 54 languages of the FLEURS benchmark while being trained on a small fraction of the labeled data.",
      "src": "arXiv:2305.13516 Abstract",
      "insight": "**关键实验结论（对比 Whisper）**：在 FLEURS 54 语上 WER 比 **Whisper 减半**，且只用其一小部分标注数据——靠自监督 wav2vec 2.0 + 语言特定参数的组合，证明「千语 ASR」可行且性能衰减很小。代价：对比基于的是 Whisper 非最优长尾配置，绝对值仍受数据量主导。"
    },
    {
      "q": "Most speakers in MMS-lab dataset appear to be male and this bears the risk of machine learning models trained on this data performing better for male speakers.",
      "src": "arXiv:2305.13516 Section 8.1",
      "insight": "**主要局限（诚实写出）**：MMS-lab 语料多来自**公开宗教文本（如新约）朗读**，且说话人**多为男性**，带来性别与领域偏置风险；数据还偏朗读风格、覆盖不均（非洲语言 CER 达标率仅 76%）。这是「为覆盖而用易得语料」的典型代价，需后续去偏与领域扩展。"
    }
  ],
  "qwen2_audio": [
    {
      "q": "In contrast to complex hierarchical tags, we have simplified the pre-training process by utilizing natural language prompts for different data and tasks, and have further expanded the data volume.",
      "src": "arXiv:2407.10759 Abstract",
      "insight": "**核心创新**：用**自然语言 prompt** 统一描述不同音频数据与任务，取代复杂的层级标签，简化了预训练流程并扩大数据量。这使 Qwen2-Audio 成为「音频-语言」统一模型，能听音频、遵循语音指令直接作答，是音频 LLM 从「多任务头」走向「对话式」的关键一步。"
    },
    {
      "q": "Different from Qwen-Audio, the initialization of the audio encoder of Qwen2-Audio is based on the Whisper-large-v3 model.",
      "src": "arXiv:2407.10759 Section 3.1",
      "insight": "**关键方法**：音频编码器直接**初始化自 Whisper-large-v3**，借力成熟 ASR 表征，再把 LLM（Qwen2）与音频编码器对齐微调。代价/边界：强依赖 Whisper 的表示与英语偏向，非从头学音频表征，跨语种上限受 Whisper 制约。"
    },
    {
      "q": "One point to note is that Qwen2-Audio is not evaluated in a zero-shot manner on the Common Voice 15 dataset, whereas Whisper's results are obtained in a zero-shot fashion.",
      "src": "arXiv:2407.10759 Section 4.2",
      "insight": "**主要局限（诚实写出）**：论文明确指出 Qwen2-Audio 在 Common Voice 15 上**并非零样本评测**，而 Whisper 是零样本，二者对比口径不一致，结论需打折。此外 8.2B 参数规模带来高推理成本，且音频推理深度仍弱于纯文本推理，实时性受限。"
    }
  ],
  "mini_omni": [
    {
      "q": "To our best knowledge, Mini-Omni is the first fully end-to-end, open-source model for real-time speech interaction.",
      "src": "arXiv:2408.16725 Abstract",
      "insight": "**核心创新**：首个**全端到端、开源**的实时语音交互模型，能「听-想-说」流式进行，无需 ASR→LLM→TTS 级联。它把语音对话从级联管线压缩成单一模型，延迟与工程复杂度大幅下降，是实时语音 agent 的重要路线验证。"
    },
    {
      "q": "To achieve this capability, we propose a text-instructed speech generation method, along with batch-parallel strategies during inference to further boost the performance.",
      "src": "arXiv:2408.16725 Abstract",
      "insight": "**关键方法**：用**文本引导的语音生成**（用文本模态监督音频生成）配合**batch-parallel 推理**（文本与音频并行解码）实现实时。仅 0.5B 参数即完成实时对话，证明小模型也能跑通端到端语音，但需文本模态「托底」以保证逻辑一致。"
    },
    {
      "q": "while Mini-Omni's speech recognition performance slightly lags behind Whisper-small's decoder",
      "src": "arXiv:2408.16725 Section 4",
      "insight": "**主要局限（诚实写出）**：Mini-Omni 的语音识别略**落后于 Whisper-small**解码器，且「仅音频模态」推理时逻辑一致性弱于文本推理（需 batch 生成弥补）。它是实时端到端的早期验证，音质/识别精度与纯级联方案仍有差距，适合低延迟场景而非最高精度场景。"
    }
  ],
  "seamless_m4t": [
    {
      "q": "We enable speech-to-speech translation with UnitY, a two-pass modeling framework that first generates text and subsequently predicts discrete acoustic units.",
      "src": "arXiv:2308.11596v3 §4.3 UnitY",
      "insight": "把 S2ST 拆成「先出文本、再出离散声学单元」的两段式解码（X2T 文本翻译 + T2U 文本到单元），用一个统一多任务模型同时覆盖 S2ST/S2TT/T2ST/T2TT/ASR 共 100 种语言。这是「一个模型通吃多模态多语言翻译」的范式起点，直接对标级联 ASR+T2TT 流水线。"
    },
    {
      "q": "Unlike cascaded models, the different components in UnitY can be jointly optimized.",
      "src": "arXiv:2308.11596v3 §4.3",
      "insight": "联合优化消除了级联系统的误差传播与领域不匹配，但代价是依赖**离散声学单元**这一中间语义表示来桥接多模态源-目标映射；语音自然度受限于单独训练的单元声码器（multilingual HiFi-GAN），本质上是「文本保真优先于声学细节」的工程取舍。"
    },
    {
      "q": "Due to the lack of available model-based techniques that could be applied to added toxicity or gender imbalance detection in this multimodal and massively multilingual setting, we used string-matching techniques that present known limitations.",
      "src": "arXiv:2308.11596v3 §6.4 Limitations",
      "insight": "在 100 语言规模下，对有害内容与性别偏差的评测只能退回词表字符串匹配：对黏着语/无分词语言误检严重，且 ASR 前置又引入假阴性。说明「统一多语言大模型」在**安全与公平性评测**上的代价远未解决，是后续多语言生成模型必须正视的边界。"
    }
  ],
  "valle": [
    {
      "q": "Specifically, we train a neural codec language model (called VALL-E) using discrete codes derived from an off-the-shelf neural audio codec model, and regard TTS as a conditional language modeling task rather than continuous signal regression as in previous work.",
      "src": "arXiv:2301.02111v1 Abstract",
      "insight": "VALL-E 把 TTS 重新定义为**条件语言建模**而非连续信号回归，用现成神经 Codec（EnCodec）的离散码作中间表示。这一「拿来主义」让语音合成首次借用 NLP 大语言模型的范式与规模化红利，是零样本 TTS 的奠基性转折。"
    },
    {
      "q": "When we obtain the first quantizer codes by the AR model, we employ a non-autoregressive (NAR) model to generate codes of the other seven quantizers.",
      "src": "arXiv:2301.02111v1 §4.2.2",
      "insight": "第一码本用 AR 建模内容/音色、其余 7 个码本用 NAR 并行生成，是「用 AR 保语义、用 NAR 提速」的经典折中。但两套独立模型也埋下结构冗余——论文自己指出未来方向是用一个统一大模型预测所有码本。"
    },
    {
      "q": "We observe that some words may be unclear, missed, or duplicated in speech synthesis.",
      "src": "arXiv:2301.02111v1 §6 Conclusion, Limitations",
      "insight": "因为音素→声学的 AR 部分存在**乱序注意力对齐**且缺乏约束，VALL-E 会出现漏字、重复、吞音等鲁棒性问题。这暴露了「Codec LM 范式」的根本代价：把语音当 token 序列生成就继承了自回归语言模型的对齐脆弱性，后续 NaturalSpeech/Voicebox 等转向 NAR/扩散正是为补这一刀。"
    }
  ],
  "voicebox": [
    {
      "q": "Voicebox is a non-autoregressive flow-matching model trained to infill speech, given audio context and text, trained on over 50K hours of speech that are neither filtered nor enhanced.",
      "src": "arXiv:2306.15687v2 Abstract",
      "insight": "用 **flow-matching（连续归一化流）** 把语音生成建模为「文本引导的语音补全」任务，并以 GPT 式 in-context learning 获得任务泛化能力。它是首个把大规模生成模型「通用主义者」思路带入语音、且能在 50K 小时未清洗数据上训练的代表作。"
    },
    {
      "q": "Voicebox outperforms the state-of-the-art zero-shot TTS model VALL-E on both intelligibility (5.9% vs 1.9% word error rates) and audio similarity (0.580 vs 0.681) while being up to 20 times faster.",
      "src": "arXiv:2306.15687v2 Abstract",
      "insight": "关键结论：flow-matching 的 CNF 只需极少 NFE（<10 步 ODE）即可生成，效率相较自回归 VALL-E 提升一个数量级，同时 WER/SIM 全面占优。证明**非自回归连续生成**在质量与速度上可同时击败 AR Codec LM。 "
    },
    {
      "q": "Voicebox depends on a phonemizer and a forced aligner to produce frame-level phonetic transcript.",
      "src": "arXiv:2306.15687v2 §7 Conclusion and Discussion",
      "insight": "与后续 E2-TTS/F5-TTS/MaskGCT 不同，Voicebox 仍依赖**音素化器 + 强制对齐器**产出帧级音素标注，且无法对音色/情感/风格等属性做解耦独立控制。这条管线依赖正是后来 fully-NAR 模型刻意要消除的边界。"
    }
  ],
  "natural_speech3": [
    {
      "q": "Motivated by it, we propose NaturalSpeech 3, a TTS system with novel factorized diffusion models to generate natural speech in a zero-shot way.",
      "src": "arXiv:2403.03100 Abstract",
      "insight": "核心创新是把语音**因式分解**为内容/韵律/音色/声学细节等子空间分别生成，而非端到端硬回归。这是从「整体波形建模」转向「属性可分解生成」的范式转折，为可控性与解耦奠定结构基础。"
    },
    {
      "q": "we design a neural codec with factorized vector quantization (FVQ) to disentangle speech waveform into subspaces of content, prosody, timbre, and acoustic details",
      "src": "arXiv:2403.03100 Abstract",
      "insight": "提出 **FACodec（FVQ 神经声码器）** 作为各属性的离散表示来源，再用 factorized diffusion 在每个子空间按对应 prompt 生成。配合 1B 参数 + 200K 小时训练，把「解耦生成」从理念落到可扩展系统，质量追平真人录音。"
    },
    {
      "q": "we need phoneme transcription for content supervision, which limits the scalability",
      "src": "arXiv:2403.03100 Appendix C Limitation",
      "insight": "局限在于 FACodec 的内容监督仍需**音素转写**，且只在英文 LibriVox 有声书（朗读风格）上验证，不支持多语言、也难覆盖背景音等属性。说明「解耦表示」在可扩展性与真实多样性上仍有未填的坑。"
    }
  ],
  "audiobox": [
    {
      "q": "This paper presents Audiobox, a unified model based on flow-matching that is capable of generating various audio modalities.",
      "src": "arXiv:2312.15821v1 Introduction",
      "insight": "用统一的 flow-matching 架构把**语音与声波/音效生成**收进同一个模型，并设计 description-based（自然语言）与 example-based（参考音频）两种提示方式。是把「通用音频生成」从单模态拼凑推向统一范式的关键一步。"
    },
    {
      "q": "To improve model generalization with limited labels, we adapt a self-supervised infilling objective to pre-train on large quantities of unlabeled audio.",
      "src": "arXiv:2312.15821v1 Introduction",
      "insight": "核心方法是用**自监督补全（infilling）目标**在海量无标注音频上预训练，以缓解标注稀缺。配合 Bespoke Solvers 把生成加速 25 倍以上，体现「用无标注数据换可控性」的扩展思路。"
    },
    {
      "q": "Hence, it is harder to generalize description-based control due to the scarcity of labeled data covering various concepts and concepts of different granularity.",
      "src": "arXiv:2312.15821v1 §10.1 Limitations",
      "insight": "局限在于基于文本描述的控制高度依赖稀缺的「音频-描述」配对数据，难以泛化到细粒度概念；而基于参考音频的控制虽易扩展，却无法精细解耦。揭示「自然语言可控生成」受限于标注规模这一普遍瓶颈。"
    }
  ],
  "e2_tts": [
    {
      "q": "We propose E2 TTS, a fully non-autoregressive (NAR), zero-shot text-to-speech system.",
      "src": "arXiv:2406.18009v2 Abstract",
      "insight": "首个彻底抛弃自回归的零样本 TTS：不预测 token 序列，而是直接在连续 mel 空间用 flow-matching 并行生成。相比 VALL-E 的 AR Codec LM，从根上消除了顺序采样的延迟与暴露偏差。"
    },
    {
      "q": "We convert the input text into a character sequence with filler tokens to match the length of the input character sequence and the output mel-filterbank sequence.",
      "src": "arXiv:2406.18009v2 §4 Conclusions",
      "insight": "方法极简：字符序列用特殊 **filler token <F>** 填充到与 mel 等长，既不需要时长模型，也不依赖 G2P/强制对齐器。把「文本-语音对齐」这个 NAR 最大难题，转化为 filler 位置的隐式学习。"
    },
    {
      "q": "While the neural codec language model-based zero-shot TTS achieved promising results, there are still a few limitations based on its auto-regressive (AR) model-based architecture.",
      "src": "arXiv:2406.18009v2 §1 Introduction",
      "insight": "E2 选择 fully-NAR 正是为消除 AR Codec LM 的三大痛点：顺序采样导致推理延迟、需精心调 tokenizer、长序列需 AR+NAR 混合技巧维稳。但 fully-NAR 以 filler 长度猜测 + 训练**收敛慢、鲁棒性低**为代价——这正是 F5-TTS 后续用 ConvNeXt 与 Sway Sampling 要补的。"
    }
  ],
  "f5_tts": [
    {
      "q": "This paper introduces F5-TTS, a fully non-autoregressive text-to-speech system based on flow matching with Diffusion Transformer (DiT).",
      "src": "arXiv:2410.06885v3 Abstract",
      "insight": "在 E2-TTS 的 fully-NAR + flow-matching 骨架上，把主干换成 **Diffusion Transformer (DiT)**，是「轻量填充」范式走向可扩展、强对齐的成熟化标志，证明该路线可兼具质量、零样本与推理速度。"
    },
    {
      "q": "We further propose an inference-time Sway Sampling strategy, which significantly improves our model's performance and efficiency.",
      "src": "arXiv:2410.06885v3 Abstract",
      "insight": "关键改进有两点：用 **ConvNeXt** 细化文本表示以易对齐，并提出推理期 **Sway Sampling** 重排 flow 步——无需重训即可套用到任何 flow-matching 模型。最终 RTF 0.15，较同期扩散 TTS 大幅提速，是对 E2「慢收敛」的直接回应。"
    },
    {
      "q": "There are two limitations to this work. First, although F5-TTS accelerates the training and inference while maintaining the simplicity of the system through better structure design, the mel spectrogram sequence length is still much longer than the text modality.",
      "src": "arXiv:2410.06885v3 §Limitations",
      "insight": "局限在于仍受困于 **mel 序列远长于文本**的表征效率问题，且对情绪等副语言细节缺乏细粒度控制。指向未来更紧凑、通用的连续语音表示，是该范式进一步提效提控的方向。"
    }
  ],
  "maskgct": [
    {
      "q": "In this paper, we introduce Masked Generative Codec Transformer (MaskGCT), a fully non-autoregressive TTS model that eliminates the need for explicit alignment information between text and speech supervision, as well as phone-level duration prediction.",
      "src": "arXiv:2409.00750v3 Abstract",
      "insight": "用**掩码生成（mask-and-predict）**Transformer 实现 fully-NAR 零样本 TTS，同时去掉了显式文本-语音对齐监督与音素级时长预测——补齐了 NaturalSpeech 3 仍依赖对齐的最后一公里，是 NAR 范式对 AR 与扩散两条路线的汇合。"
    },
    {
      "q": "MaskGCT is a two-stage model: in the first stage, the model uses text to predict semantic tokens extracted from a speech self-supervised learning (SSL) model, and in the second stage, the model predicts acoustic tokens conditioned on these semantic tokens.",
      "src": "arXiv:2409.00750v3 Abstract",
      "insight": "两阶段（T2S 文本→语义 token，S2A 语义→RVQ 声学 token）并以 **VQ-VAE** 量化 SSL 表征替代 k-means，单码本即最小化语义信息损失；并行迭代解码天然支持长度控制，在 100K 小时上 CMOS 追平真人。"
    },
    {
      "q": "Achieving more robust cross-lingual translation remains a focus for future work.",
      "src": "arXiv:2409.00750v3 §Discussion",
      "insight": "局限/未来在于跨语言鲁棒性仍不足，且「更适配语音生成的离散表示」本身仍是开放问题。说明掩码生成虽解了对齐束缚，但**语义-声学表示的适用性**与多语言泛化仍是待攻克的边界。"
    }
  ],
  "seed_tts": [
    {
      "q": "We introduce Seed-TTS, a family of large-scale autoregressive text-to-speech (TTS) models capable of generating speech that is virtually indistinguishable from human speech.",
      "src": "arXiv:2406.02430v1 Abstract",
      "insight": "工业级 AR TTS 基础模型：在比以往大几个数量级的数据/模型规模上训练，零样本 ICL 的说话人相似度与自然度**可追平真人录音**，并展示出情绪控制等涌现能力，代表「规模化即质量」路线的顶峰。"
    },
    {
      "q": "We additionally present a non-autoregressive (NAR) variant of the Seed-TTS model, named Seed-TTSDiT, which utilizes a fully diffusion-based architecture. Unlike previous NAR-based TTS systems, Seed-TTSDiT does not depend on pre-estimated phoneme durations and performs speech generation through end-to-end processing.",
      "src": "arXiv:2406.02430v1 Abstract",
      "insight": "同时给出 **Seed-TTSDiT**：完全扩散、端到端、不依赖预估计音素时长的 NAR 变体，性能媲美 AR 版且更擅语音编辑。配合**自蒸馏**（音色解耦）与 **RL 后训练**（鲁棒性/相似度/可控性）两套扩展，是「AR 主干 + 扩散分支 + 强化调优」的完整工业方案。"
    },
    {
      "q": "Despite its capabilities, Seed-TTS has several limitations. Although emergent behavior is observed, the model sometimes has limitations in scenarios requiring nuanced emotion and contextual understanding.",
      "src": "arXiv:2406.02430v1 §5 Model applications, limitations, and safety",
      "insight": "局限在于对细腻情感与上下文理解仍力不从心，且唱歌、带背景音乐/噪声的 prompt 表现不稳。揭示「规模驱动的 AR 基础模型」在**细粒度语义与复杂场景泛化**上的天花板，以及作为闭源工业系统的安全部署代价。"
    }
  ],
  "cohere_transcribe": [
    {
      "q": "据公开信息/架构可知的推导论点：Cohere Transcribe 采用 Conformer 编码器 + 自回归/Transducer 解码器的经典 AED 结构而非 LLM 解码，定位为与 Whisper 同范式的 2B 级工程化弱监督 ASR。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：DEEP 文本明确其为 Conformer+Transducer/AED 且未引入 LLM 解码，规模 2B，属 Whisper 式弱监督范式。与同类对比：相比引入 LLM 解码的 Canary-Qwen、hy_asr30，其推理路径更短、延迟更可控，但语义/上下文纠错能力较弱。边界与不确定性：2B 参数、弱监督数据规模等为公开/行业披露或合理推断，具体数据配比与训练语料未公开，属合理推断。"
    },
    {
      "q": "据公开信息/架构可知的推导论点：沿用 Whisper 式“海量带噪标注→强鲁棒性”弱监督训练，该模型在英语及常见带噪真实场景的泛化能力应优于纯监督小模型。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：DEEP 指出以大规模弱监督音频为主并针对开放榜单调优。与同类对比：相对纯监督的 parakeet_tdt，弱监督带来更广域口音/噪声鲁棒性，但可能在对齐精度上略逊于强监督 TDT。边界与不确定性：具体 WER 未公开，以上为基于范式与“针对榜单调优”的推断。"
    },
    {
      "q": "据公开信息/架构可知的推导论点：未采用 LLM 解码且为闭源黑箱，其在低频语言、专业术语及标点/ITN 后处理的精细度与可控性存在不确定性。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：架构描述明确无 LLM 解码；闭源意味着无权重可审计。与同类对比：对比 canary_qwen 显式联合标点/ITN 多任务，Cohere Transcribe 的后处理策略未披露。边界与不确定性：闭源，无法验证训练数据偏见，跨领域与边缘语言的稳定性为风险点，属推断。"
    }
  ],
  "ibm_granite41": [
    {
      "q": "据公开信息/架构可知的推导论点：IBM Granite 41 采用“编码器+NAR 解码”的非自回归结构以并行输出文本，定位为低延迟、可嵌入 Granite LLM 生态的开放 ASR。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：DEEP 明确其为 NAR（mask-predict/CTC+NAR）且 Apache 2.0 全开源。与同类对比：相比 cohere/meta 的自回归/统一建模，NAR 显著降低首字延迟，且与 Granite LM 打通便于后续摘要/问答。边界与不确定性：是否纯 NAR 或 CTC+NAR 混合为 DEEP 给出的候选，属合理推断。"
    },
    {
      "q": "据公开信息/架构可知的推导论点：NAR 解码与编码器联合优化的目标，使其在流式/实时场景的吞吐与延迟表现应优于同规模自回归模型。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：DEEP 称 NAR 减少自回归等待并联合优化。与同类对比：相对 kyutai_stt 的流式 Conformer/AR chunk，Granite41 的 NAR 并行性利于高并发批处理。边界与不确定性：NAR 常伴随质量-延迟权衡，具体 WER 与延迟未公开，为推断。"
    },
    {
      "q": "据公开信息/架构可知的推导论点：尽管 Apache 2.0 开源可审计，其多语种覆盖广度与低资源语言表现未在 DEEP 中披露，存在能力边界不确定性。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：DEEP 仅提“大规模语音-文本对齐”未列语言范围。与同类对比：对比 meta_omni 的“超多语种统一建模”，Granite41 的语种广度可能更聚焦。边界与不确定性：开源但缺公开基准，实际多语种表现属未证实推断。"
    }
  ],
  "moonshine_v2": [
    {
      "q": "据公开信息/架构可知的推导论点：Moonshine v2 为面向嵌入式/MCU 的轻量流式编码器-解码器，定位极致低算力实时 ASR 而非高精度旗舰。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：DEEP 明确“小参数量换取极低算力、适合 MCU/嵌入式、流式裁剪”。与同类对比：相较 2B 的 cohere_transcribe、2.5B 的 canary_qwen，其规模显著更小，目标场景为端侧而非云端。边界与不确定性：具体参数量与流式策略（是否 chunked）未披露，为合理推断。"
    },
    {
      "q": "据公开信息/架构可知的推导论点：以“延迟/精度权衡”为优化目标的轻量训练，使其在资源受限设备上的实时性占优，但绝对识别精度应为其取舍代价。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：DEEP 称面向实时场景的延迟/精度权衡优化。与同类对比：相对 parakeet_tdt 的 TDT 流式，Moonshine 用更小模型换更低功耗，精度上限更低。边界与不确定性：Apache 2.0 可复现，但缺乏公开 WER 对照，精度损失幅度为推断。"
    },
    {
      "q": "据公开信息/架构可知的推导论点：超小模型容量决定了其在嘈杂环境、多语种与专业词汇上的鲁棒性天然受限，属结构性短板而非可调参数问题。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：架构指向“小参数量”，容量即上界。与同类对比：对比 hy_asr30 的 MoE 稀疏扩容，Moonshine 无法通过稀疏激活扩展容量。边界与不确定性：开源但架构决定了能力天花板，具体场景失效边界需实测，为推断。"
    }
  ],
  "kyutai_stt": [
    {
      "q": "据公开信息/架构可知的推导论点：Kyutai STT 为端到端流式 ASR，去掉独立 VAD 级联、边听边出，定位为对话式低首包延迟场景。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：DEEP 明确“无独立 VAD 级联、流式 Conformer/Transformer+chunk、低延迟”。与同类对比：相对需 VAD+ASR 两级的传统流水线，其一体化更利于自然对话节奏。边界与不确定性：具体 backbone（Conformer 或 Transformer）DEEP 用“通常采用”表述，属推断。"
    },
    {
      "q": "据公开信息/架构可知的推导论点：以 chunk 级流式损失训练并强调首包延迟，其在交互/会议等实时转录的端到端延迟应显著低于非流式模型。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：DEEP 称流式目标训练、强调首包延迟。与同类对比：相对 cohere（非流式 AED）更适合实时，相对 NAR 的 granite41 则在自然对话节奏上更优。边界与不确定性：开源可复现，但具体延迟/WER 未列，为推断。"
    },
    {
      "q": "据公开信息/架构可知的推导论点：端到端流式去掉 VAD 后，对长静音、重叠说话人与远场噪声的边界处理依赖模型本身，鲁棒性边界不透明。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：DEEP 称无独立 VAD 级联。与同类对比：对比带 VAD 的级联系统，少了一道可独立调优的静音/切分模块。边界与不确定性：开源但无公开长音频/重叠语音基准，实际边界为推断。"
    }
  ],
  "parakeet_tdt": [
    {
      "q": "据公开信息/架构可知的推导论点：Parakeet TDT 在 RNN-T 上叠加 duration 预测（Token-and-Duration Transducer），定位为兼顾流式与高吞吐的强监督 ASR。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：DEEP 明确 TDT=token+duration 联合预测、天然流式、减帧重复。与同类对比：相对标准 RNN-T/Transducer（cohere），TDT 通过跳帧减少冗余计算。边界与不确定性：CC-BY-4.0 开源，但“duration”分布假设依赖训练设定，为合理推断。"
    },
    {
      "q": "据公开信息/架构可知的推导论点：duration 预测大幅削减帧级重复计算，使其在批处理/服务端高并发场景的吞吐与成本效率应优于普通 Transducer。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：DEEP 称“大幅减少帧级重复计算，利于批处理”。与同类对比：相对 moonshine 的轻量端侧，Parakeet 走服务端高精度+高吞吐路线。边界与不确定性：强监督训练带来对齐精度，但跨域泛化可能弱于弱监督 cohere，属推断。"
    },
    {
      "q": "据公开信息/架构可知的推导论点：作为强监督 CC-BY 模型，其能力上限受监督数据覆盖约束，对带噪/口音长尾的鲁棒性可能不及弱监督范式。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：DEEP 称“大规模监督语音训练”。与同类对比：对比 cohere 的弱监督海量带噪标注，Parakeet 在分布外噪声上或更易退化。边界与不确定性：开源可审计，但具体鲁棒性基准未列，为推断。"
    }
  ],
  "canary_qwen": [
    {
      "q": "据公开信息/架构可知的推导论点：Canary-Qwen 为多语种（英/法/德/西）编码器-解码器，并将标点恢复与逆文本归一化作为联合任务，定位为“开箱即用”的生产级转写。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：DEEP 明确四语 + 标点/ITN 多任务、2.5B。与同类对比：相对 cohere（无显式后处理）、parakeet（纯 ASR），其内置 ITN/标点更贴合落地。边界与不确定性：CC-BY-4.0 开源；“Qwen”暗示 LLM 解码关联但未证实，为推断。"
    },
    {
      "q": "据公开信息/架构可知的推导论点：2.5B 规模 + 四语多任务联合训练，使其在目标语种内的转写可读性与后处理完整度应高于无 ITN 的同类模型。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：DEEP 称多任务联合训练、兼顾精度与成本。与同类对比：对比 moonshine（轻量无后处理），Canary 输出更贴近最终文本。边界与不确定性：仅四语，非目标语种为短板，具体指标未列，为推断。"
    },
    {
      "q": "据公开信息/架构可知的推导论点：明确仅覆盖英/法/德/西四语，其多语种边界清晰受限，且 ITN 规则的语言/地区适配存在不确定性。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：DEEP 列明四语。与同类对比：对比 meta_omni 的超多语种统一建模，Canary 语种广度远窄。边界与不确定性：ITN 在不同地区格式（如数字/货币）差异大，开源但无覆盖说明，属推断。"
    }
  ],
  "meta_omni": [
    {
      "q": "据公开信息/架构可知的推导论点：Meta Omni 采用超多语种统一建模（类 w2v-BERT/Conformer），定位为单模型通吃高/低资源语言的广覆盖 ASR。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：DEEP 明确“超多语种统一建模、单一模型覆盖高低资源”。与同类对比：相对 canary_qwen 的四语聚焦，其追求语种广度。边界与不确定性：具体骨干与语种数未披露，“类 w2v-BERT”为推断表述。"
    },
    {
      "q": "据公开信息/架构可知的推导论点：以海量含低资源语种数据统一训练，其在长尾语言上的可用性应优于仅覆盖主流语种的模型，但单语精度或被摊薄。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：DEEP 称含大量低资源语种、兼顾主流与长尾。与同类对比：对比 parakeet（强监督主流），Omni 在低频语种更可用但高频语种精度或略低。边界与不确定性：统一模型容量分配是权衡，具体权衡结果未公开，为推断。"
    },
    {
      "q": "据公开信息/架构可知的推导论点：广覆盖统一模型面临低资源语种数据质量与评估稀缺的固有风险，且闭源下偏见与失败模式不可审计。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：低资源语种标注稀疏为行业常识，DEEP 未给评估。与同类对比：对比开源的 canary/parakeet，Omni 闭源无法审计权重。边界与不确定性：长尾语言真实表现缺乏公开基准，属高风险推断。"
    }
  ],
  "hy_asr30": [
    {
      "q": "据公开信息/架构可知的推导论点：HY-ASR30 采用 MoE 稀疏语音编码器 + LLM 解码，将语音表征对齐到语言模型，定位为高精度中文/多方言大模型 ASR。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：DEEP 明确 MoE 编码器 + LLM 解码、对齐到 LM。与同类对比：相对 cohere（无 LLM）、canary（疑似 LLM 关联），其显式用 LLM 解码提升语义理解。边界与不确定性：MoE 专家数与 LLM 基座未披露，为推断。"
    },
    {
      "q": "据公开信息/架构可知的推导论点：稀疏激活在扩容模型容量的同时保持推理成本可控，使其在中文多方言/语义纠错上应强于同成本稠密模型。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：DEEP 称稀疏激活平衡容量与成本、中文/多方言数据。与同类对比：对比 moonshine 的小模型，HY 走高容量路线。边界与不确定性：LLM 解码带来语义纠错增益，但具体 WER/延迟未公开，为推断。"
    },
    {
      "q": "据公开信息/架构可知的推导论点：MoE+LLM 的两级结构带来更高系统复杂度和首包延迟，且闭源下方言覆盖边界与失败模式不可验证。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：架构描述含 MoE+LLM 两级。与同类对比：相对 NAR 的 granite41，其延迟更高；相对开源模型不可审计。边界与不确定性：多方言实际覆盖、长音频稳定性为风险，属推断。"
    }
  ],
  "fun_realtime_asr": [
    {
      "q": "据公开信息/架构可知的推导论点：fun_realtime_asr 属于统一实时 ASR 分支，其架构以\"流式+低延迟\"为第一约束，并在工程上针对 AA 词错率榜（难句/口音口径）做定向优化，说明它并非通用离线大模型路线，而是面向实时交互场景的专用 ASR。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：DEEP 文本明确其为\"统一实时架构的 ASR 分支\"且\"针对 AA 词错率榜优化\"，架构选择天然偏向低首包延迟与流式断句。与同类对比：相比离线大模型转写（如纯 LLM-ASR），它在实时性上更优但牺牲了部分长上下文语义纠错。边界与不确定性：此论点为基于架构目标的推断，实际延迟与流式稳定性需以官方基准/线上实测为准，闭源使其内部实现不可核验。"
    },
    {
      "q": "据公开信息/架构可知的推导论点：因以 AA 榜（偏难句与口音）为优化目标并共享同族基座，可推断 fun_realtime_asr 在中文方言/口音、远场等\"难分布\"上相对通用离线模型有优势，且实时性应达到生产可用水平。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：优化目标是难句/口音口径，意味着训练与评测都偏向高噪声、强口音分布。与同类对比：在中文方言重度场景，它大概率优于以干净朗读为主的轻量模型；但相比同族离线大模型，绝对词错率未必领先。边界与不确定性：AA 榜本身的口径偏难，存在\"为榜单调优\"的可能，干净朗读或特定垂直域表现可能与榜单不符，属推断性质。"
    },
    {
      "q": "据公开信息/架构可知的推导论点：闭源/未开源使训练数据规模、语种覆盖、是否含热词/说话人分离等能力不可核验；AA 榜口径偏难句口音，可能在干净朗读或特定垂直域出现与榜单不符的表现，存在评测分布外风险。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：DEEP 中 Results/Limitations 为空，缺少公开可复现基准。与同类对比：对比开源可审计的 Fun-ASR 系模型，闭源带来可复现性劣势。边界与不确定性：热词增强、说话人分离、并发成本等工程属性均为未知，需以官方文档为准；此为风险层面的诚实推断，非确证结论。"
    }
  ],
  "seed_asr20": [
    {
      "q": "据公开信息/架构可知的推导论点：Seed-ASR 2.0 是字节\"大规模多任务语音\"模型的一部分，ASR 只是其中一项能力，架构上强调统一语音表征复用，说明其底层是一个多任务语音基座而非单任务识别器。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：DEEP 写明\"大规模多任务语音训练，识别为其中一项能力\"且\"强调统一语音表征复用\"。与同类对比：不同于 Qwen3-ASR 的\"对齐到 LLM\"路线，Seed 更偏统一语音表征的多任务范式。边界与不确定性：多任务具体包含哪些能力（翻译/理解/合成）及配比属内部信息，此判断为基于公开架构描述的推断。"
    },
    {
      "q": "据公开信息/架构可知的推导论点：因与豆包生态打通且采用统一语音表征，可推断 Seed-ASR 2.0 在中文真实场景（短视频、直播、对话）的鲁棒性较强，并具备从识别平滑扩展到翻译/理解等任务的能力。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：统一表征+豆包生态意味着训练数据高度贴合国内真实语音分布。与同类对比：在中文短视频/直播等高噪声、强口语分布上，可能优于以通用语料为主的海外模型。边界与不确定性：跨任务泛化能力与中文以外的语种表现需官方基准佐证，属合理推论而非实测结论。"
    },
    {
      "q": "据公开信息/架构可知的推导论点：闭源导致多任务间能力是否均衡、长音频/超低资源语种表现不可复现；统一表征在多任务联合训练下可能带来 ASR 单项被\"稀释\"或推理成本偏高的问题。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：多任务联合训练存在能力分配权衡，单一 ASR 指标未必最优。与同类对比：相比单任务轻量 ASR，其推理成本与部署门槛可能更高。边界与不确定性：是否存在 ASR 质量被稀释、长音频稳定性如何，均不可公开验证；此为风险推断，须以官方发布为准。"
    }
  ],
  "qwen3_asr": [
    {
      "q": "据公开信息/架构可知的推导论点：Qwen3-ASR 将语音编码器对齐到 Qwen LLM，走\"识别即语言理解\"路线，架构上把 ASR 视为 LLM 的一个模态分支，而非独立声学模型。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：DEEP 明确\"语音编码器对齐到 Qwen LLM，识别即语言理解\"。与同类对比：区别于 Seed 的统一语音表征范式，Qwen3-ASR 直接挂在文本 LLM 上，语义纠错能力更强但实时性更受限。边界与不确定性：编码器与 LLM 的具体对齐方式（如是否端到端微调）为内部实现，此论点为基于架构描述的推断。"
    },
    {
      "q": "据公开信息/架构可知的推导论点：因复用 Qwen 文本/agent 生态与多语种对齐训练，可推断 Qwen3-ASR 在多语种、以及\"识别+后续语义处理（摘要/问答/agent 调用）\"一体化链路上有优势，适合中文及跨语种业务。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：复用 Qwen 生态意味着识别结果可直接进入 LLM 流水线。与同类对比：相比纯 ASR 服务，它在\"语音→理解→行动\"端到端场景具有生态协同优势。边界与不确定性：多语种覆盖深度、长音频稳定性需以官方基准为准；一体化优势依赖 LLM 调用成本，属推断性质。"
    },
    {
      "q": "据公开信息/架构可知的推导论点：闭源使对齐所用的语音-文本配对规模、低资源语种覆盖不可核验；LLM 化识别可能引入幻觉/复述风险，且推理资源需求高于轻量 CTC/Transducer 模型，端侧部署受限。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：LLM 解码天然存在生成式幻觉可能。与同类对比：相对 CTC/Transducer 的确定性输出，生成式识别更灵活但更难保证逐字忠实。边界与不确定性：幻觉率、端侧可行性、低资源语种边界均不可公开审计；此为风险层面的诚实推断。"
    }
  ],
  "glm_asr": [
    {
      "q": "据公开信息/架构可知的推导论点：GLM-ASR 在 GLM 表征上接识别头，利用语言模型语义先验提升识别的语言学合理性，架构本质是\"LLM 表征 + 轻量识别解码\"的范式。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：DEEP 写明\"在 GLM 表征上接识别头，利用语言模型语义先验\"。与同类对比：相比纯声学模型，它更依赖语义先验做消歧；相比 Qwen3-ASR 的完整 LLM 化，它更轻量（接识别头而非全生成）。边界与不确定性：识别头的具体形式（CTC/Transformer 解码）为内部实现，此判断为基于架构描述的推断。"
    },
    {
      "q": "据公开信息/架构可知的推导论点：因借助 GLM 语义先验且针对中文数据优化，可推断 GLM-ASR 在同音词消歧、语法合理的长句、专有名词语境理解上优于纯声学模型，中文场景优势明显。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：语义先验对中文同音字（如\"公式/公司\"）消歧天然有利。与同类对比：在中文长句与领域专有名词上，可能优于无语义先验的轻量 ASR。边界与不确定性：中文优势的具体幅度需官方基准佐证；英文/多语种能力未知，属合理推论。"
    },
    {
      "q": "据公开信息/架构可知的推导论点：闭源下训练数据、是否支持多语种及实时流式未知；语义先验过强可能导致\"过度纠正\"（把口误/口语化表达改成规范书面语），在需忠实转写的场景存在偏差风险。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：强语义先验会倾向输出\"更合理\"而非\"更忠实\"的文本。与同类对比：相对逐字转写模型，它在口语、口误、俚语场景可能产生偏差。边界与不确定性：是否支持流式、过度纠正的实际发生率均不可验证；此为风险推断，须以官方为准。"
    }
  ],
  "fun_asr": [
    {
      "q": "据公开信息/架构可知的推导论点：fun_asr 采用多任务训练，在输出识别文本的同时预测情感与事件标签，架构上属\"识别+副任务\"的富标签 ASR，而非纯转写模型。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：DEEP 明确\"在识别文本同时预测情感与事件标签\"。与同类对比：不同于单一转写 ASR，它把结构化标签纳入同一前向过程，省去后处理级联。边界与不确定性：副任务的耦合方式（联合解码/共享编码器）为内部实现，此论点为基于架构描述的推断。"
    },
    {
      "q": "据公开信息/架构可知的推导论点：因多语种+富标签（情感/事件）联合训练且设计轻量高效、社区活跃，可推断 fun_asr 在需结构化输出（客服质检、会议分析）的中文场景落地成本低、可玩性高。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：富标签+轻量使其适合直接嵌入业务分析流水线。与同类对比：对比需额外接情感/事件模型的方案，它一体化输出更省成本。边界与不确定性：中文场景的实际精度与社区生态热度需以实测为准；\"轻量\"与高精度间的平衡属推断。"
    },
    {
      "q": "据公开信息/架构可知的推导论点：闭源/未开源使副任务（情感/事件）标签体系、准确率无公开基准可核；多任务联合训练可能使主识别质量在边缘语种上被副任务拖累，且\"轻量\"与高精度间需权衡验证。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：多任务会竞争表征容量。与同类对比：相比纯识别模型，边缘语种的主任务精度可能略降。边界与不确定性：标签体系定义、副任务准确率、轻量与精度权衡均不可公开审计；此为诚实的风险推断。"
    }
  ],
  "elevenlabs_scribe2": [
    {
      "q": "据公开信息/架构可知的推导论点：Scribe v2 采用\"大模型转写+后处理流水线（说话人分离、标点、章节）\"架构，以 API 体验与工程交付取胜，而非追求单一声学指标。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：DEEP 写明其为\"大模型转写 + 后处理流水线\"，并以 API 体验取胜。与同类对比：区别于国内强调中文/方言的模型，它更偏\"开箱即用\"的企业级转写交付。边界与不确定性：底层大模型规模与后处理具体策略为闭源，此论点为基于架构描述的推断。"
    },
    {
      "q": "据公开信息/架构可知的推导论点：因大规模数据+企业场景调优且提供开箱即用的后处理能力，可推断 Scribe v2 在英文/多语种长音频（会议、访谈）的可用性与工程集成便捷度上领先，适合海外企业内容生产。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：企业场景调优+完整后处理流水线降低集成成本。与同类对比：在英文长音频的\"说话人分离+章节\"一体化上，可能优于需自行拼接组件的方案。边界与不确定性：中文及国内场景的优化深度、语种覆盖为不确定项；多语种长音频实际表现需官方基准，属推断。"
    },
    {
      "q": "据公开信息/架构可知的推导论点：完全闭源使企业无法审计数据合规与幻觉率，且以 API 交付意味着数据离境、成本与可用性受厂商约束；中文及国内场景的优化深度与语种覆盖存在不确定性。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：纯 API 交付使数据流向与计费均受厂商控制。与同类对比：对比可自部署的开源方案（如 Chatterbox 系思路），它在隐私与成本可控性上劣势明显。边界与不确定性：合规边界、幻觉率、国内网络可达性均不可核验；此为风险层面的诚实推断，须以官方 SLA 为准。"
    }
  ],
  "fun_realtime_tts": [
    {
      "q": "据公开信息/架构可知的推导论点：fun_realtime_tts 为实时可控合成架构（非 AR 或混合），与同族 ASR/Chat 共享基座，形成\"识别-合成-对话\"三赛道布局，架构目标是低延迟实时语音交互。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：DEEP 写明\"实时可控合成架构（非 AR 或混合），与同族 ASR/Chat 共享基座形成三赛道大满贯\"。与同类对比：区别自回归 TTS，非 AR/混合路线首包延迟更低，更适合对话。边界与不确定性：非 AR 与混合的具体占比、共享基座的耦合深度为内部实现，此判断为基于架构描述的推断。"
    },
    {
      "q": "据公开信息/架构可知的推导论点：因以 AA 盲评榜为优化目标并做实时推理+可控条件训练，可推断 fun_realtime_tts 在中文自然度、可控性（音色/情感/节奏）与首包延迟上达到交互级水平。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：盲评榜优化+可控条件训练指向主观听感与可控维度双赢。与同类对比：在中文实时交互（如语音助手）上，可能优于纯离线高保真但高延迟的方案。边界与不确定性：盲评口径、可控维度的细粒度（如细粒度情感）需官方说明；\"交互级\"为推断结论。"
    },
    {
      "q": "据公开信息/架构可知的推导论点：闭源/未开源使可控维度定义、最长合成时长、并发与成本不可核；实时可控合成在极端指令（强情感/特定音色克隆）下可能产生音质抖动，且需以官方盲评与实测为准。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：可控条件在分布外指令上易失稳。与同类对比：相对固定音色的离线 TTS，可控性提高但引入了指令鲁棒性风险。边界与不确定性：音色克隆边界、并发成本、极端指令稳定性均不可公开验证；此为风险推断，须以官方为准。"
    }
  ],
  "chatterbox_flash": [
    {
      "q": "据公开信息/架构可知的推导论点：Chatterbox-Flash 把语音分块用扩散生成、块间流式衔接，属\"非自回归块扩散\"架构，在质量与低首包延迟间折中，且为开源路线。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：DEEP 写明\"把语音分块用扩散生成，块间流式衔接；非 AR 块扩散兼顾质量与低首包延迟\"，并标注开源。与同类对比：对比自回归 TTS，块扩散首包延迟更低；对比闭源实时 TTS，它可自部署、可审计。边界与不确定性：块大小与调度策略为开源实现细节，此论点为基于架构描述的推断。"
    },
    {
      "q": "据公开信息/架构可知的推导论点：因扩散+流式块调度优化且开源，可推断 Chatterbox-Flash 在英文自然度与可控生成上有竞争力，并以\"开源可自部署\"在隐私/成本敏感场景形成差异化优势。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：扩散生成通常带来高自然度，开源降低部署门槛。与同类对比：在需数据不出域、成本可控的中文/英文私有化场景，它比 Scribe 类 API 更具合规性优势。边界与不确定性：英文为主的训练使其跨语种泛化存疑；自然度须以听测为准，属推断。"
    },
    {
      "q": "据公开信息/架构可知的推导论点：虽开源，但块扩散的块边界衔接可能带来轻微不连贯；英文为主训练使中文韵律/声调建模不确定，且开源版推理吞吐与商业化支持需自行验证。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：分块生成在块接缝处可能出现韵律/音高跳变。与同类对比：相对端到端自回归模型，块扩散的中文声调连贯性风险更高。边界与不确定性：中文声调建模质量、吞吐与商业支持均为需实测项；此为诚实的风险推断，非确证结论。"
    }
  ],
  "confucius4_tts": [
    {
      "q": "据公开信息/架构可知的推导论点：Confucius4-TTS 走的是 textless（无文本）连续语音表征路线，直接从参考音频提取连续表征并跨语种迁移到目标语言合成，本质上不依赖目标语种的文本或强监督数据，属于与传统「文本→声学」级联 TTS 不同的低资源合成范式。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：DEEP 架构字段明确其为连续表征 + 跨语种对齐训练。与同类对比：CosyVoice3、Fish Audio S2 等仍以文本/语义 token 为条件，Confucius4 的 textless 路线在跨语种零样本克隆上更轻依赖文本，是其差异化定位。边界与不确定性：文本缺失意味着内容可编辑性、发音可控性可能弱于文本驱动模型，此推论基于架构描述，具体可控性未经实测验证，且模型闭源无法本地复现。"
    },
    {
      "q": "据公开信息/架构可知的推导论点：凭借跨语种连续表征迁移，Confucius4-TTS 在零样本声音克隆与低资源/小语种语音合成上具备较强能力，理论上可对未见过的目标语种用少量参考音频完成音色与韵律迁移。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：训练字段强调「降低对目标语种文本/数据的依赖」。与同类对比：相较依赖大量目标语种文本数据的传统多语种 TTS，其对低资源语种更友好。边界与不确定性：能力上限受限于参考音频质量与语种相似度，DEEP 的 Results 为空，无客观指标佐证，零样本克隆音色相似度与跨语种保真度为推断，需以官方 demo 为准。"
    },
    {
      "q": "据公开信息/架构可知的推导论点：作为闭源模型，Confucius4-TTS 在可复现性、本地部署与合规审计上风险较高；同时 textless 路线在合成内容的精确可控与可审查性上存在固有短板。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：架构与训练字段均未提及开源/权重开放，归入闭源。与同类对比：相比 CosyVoice3、Orpheus 等提供开源权重的模型，闭源方案无法做内部消融与合规审查。边界与不确定性：零样本克隆能力本身带来声音身份冒用（voice spoofing）合规风险；本结论为基于闭源属性的推断，具体许可条款需以官方为准。"
    }
  ],
  "fishaudio_s2": [
    {
      "q": "据公开信息/架构可知的推导论点：Fish Audio S2 采用 codec-LM 自回归生成范式，流程为文本/参考音频 → 语音 codec token → 神经解码器还原波形，属于当前主流的神经 codec 语音生成路线。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：DEEP 架构字段明确 codec-LM 自回归与解码器还原波形。与同类对比：与 Qwen3-TTS、Orpheus 同属 codec-LM 家族，差异更多在训练规模、社区生态与克隆优化。边界与不确定性：自回归逐 token 生成意味着推理时延与长序列稳定性是该路线的普遍挑战，此为基于范式的推断而非实测。"
    },
    {
      "q": "据公开信息/架构可知的推导论点：经大规模语音 codec 训练与零样本克隆优化，Fish Audio S2 在声音克隆的自然度与相似度上应有较强表现，且活跃的开源社区生态有助于生态扩展。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：训练字段提及「大规模语音 codec 训练；零样本克隆优化；社区生态活跃」。与同类对比：社区生态是相对 MiniMax、Qwen 等纯闭源商业模型的优势。边界与不确定性：DEEP Results 为空，无 MOS/相似度指标，克隆质量与跨语种泛化为推断；社区版本与官方闭源版本能力可能不一致。"
    },
    {
      "q": "据公开信息/架构可知的推导论点：该模型未开源，可复现性与合规审计受限；自回归 codec 生成在极端参考或长文本下可能出现韵律重复、token 崩坏等不稳定现象。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：DEEP 未标注开源，且架构为自回归 codec。与同类对比：相比扩散/混合范式（如 CosyVoice3）在长序列稳定性上更脆弱。边界与不确定性：闭源导致无法本地复现与做安全过滤审查；零样本克隆同样带来声音冒用合规风险，结论为基于属性与范式的推断。"
    }
  ],
  "minimax28": [
    {
      "q": "据公开信息/架构可知的推导论点：MiniMax Speech 2.8 属表现力增强路线，在合成中原生支持声音/情绪标签控制（如 breath、laugh、情绪），并面向 40+ 语种与 10 秒参考克隆，定位为商业化多语种情感语音合成服务。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：架构字段明确「原生支持声音/情绪标签控制」与表现力增强路线，训练字段给出 40+ 语种与 10 秒克隆。与同类对比：情绪/ breath/laugh 等标签控制比 CosyVoice3、Qwen3 仅靠参考音频更显式、更可控。边界与不确定性：标签体系的覆盖范围与中文支持程度未披露，此为基于官方描述的推断。"
    },
    {
      "q": "据公开信息/架构可知的推导论点：凭借显式情绪标签 + 多语种训练，MiniMax Speech 2.8 在情感表达（喜怒哀乐、笑声、气声）与多语种零样本克隆上应具较强能力，适合有声书、游戏角色配音等高频情感场景。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：训练字段「表现力标签数据 + 多语种(40+) 训练；10 秒参考克隆」。与同类对比：相对 Orpheus（仅靠情绪条件）其标签更系统、语种覆盖更广。边界与不确定性：DEEP Results 为空，情感可控性与跨语种克隆相似度无客观指标，且 40+ 语种中低资源语种质量可能参差，均属推断。"
    },
    {
      "q": "据公开信息/架构可知的推导论点：作为闭源商业模型，MiniMax Speech 2.8 不可本地部署与复现，情绪标签能力高度依赖其平台 API；多语种广度带来语种质量不均与合规审查困难。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：DEEP 未标注开源，且能力绑定平台情绪标签。与同类对比：相比开源 CosyVoice3/Orpheus，闭源在可审计性与合规上风险更高。边界与不确定性：声音克隆涉身份冒用合规风险；语种广度下小语种质量边界、标签细粒度上限为推断，需以官方文档与实测为准。"
    }
  ],
  "cosyvoice3": [
    {
      "q": "据公开信息/架构可知的推导论点：CosyVoice 3 采用「LLM 生成语义 token + 扩散模型生成声学细节」的混合范式，并支持 in-context learning 零样本克隆与多语种，且官方开源权重，属于可复现的社区型 TTS 路线。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：架构字段明确 LLM+扩散混合与 in-context learning，训练字段标注「开源」。与同类对比：相较纯自回归 codec（Fish Audio S2、Qwen3-TTS）用扩散补声学细节，通常声学自然度更优；且开源降低复现门槛。边界与不确定性：混合范式通常推理开销高于纯 codec-LM，此为基于范式的推断。"
    },
    {
      "q": "据公开信息/架构可知的推导论点：借助 LLM 语义建模与扩散声学建模联合训练，CosyVoice 3 在零样本克隆相似度、多语种覆盖与合成自然度上应具较强且可本地验证的能力。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：训练字段「大规模多语种语音 + LLM 语义建模 + 扩散声学建模联合；开源」。与同类对比：开源使其能力可被社区独立评测，比闭源模型更透明。边界与不确定性：DEEP Results 为空，无公开 MOS/相似度佐证；多语种中各语种子集质量可能不一，结论为基于架构与开源属性的推断。"
    },
    {
      "q": "据公开信息/架构可知的推导论点：主要局限在混合范式推理开销较大，且虽开源但蒸馏版/完整权重可用性与商用许可需核实；零样本克隆仍带来声音冒用合规风险。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：架构为 LLM+扩散，训练标注开源但商用许可未细述。与同类对比：相比端到端 codec-LM 延迟更低，但扩散步数带来算力成本。边界与不确定性：开源仅降低技术复现风险，不消除合规风险；权重分发渠道与许可条款边界需以官方仓库为准，属推断性提示。"
    }
  ],
  "qwen3_tts": [
    {
      "q": "据公开信息/架构可知的推导论点：Qwen3-TTS 复用 Qwen 大模型的表征空间，采用 codec-LM 自回归生成并支持零样本克隆，定位为通义大模型家族内与语言模型生态对齐的语音合成组件。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：架构字段「codec-LM 自回归，复用 Qwen 表征；零样本克隆」。与同类对比：复用 Qwen 表征使其在中文/多语种语义理解上与通义生态协同，区别于独立训练的 Fish Audio S2。边界与不确定性：表征复用带来的具体增益（如多音字、语义韵律）未经实测，为推断；模型闭源不可本地验证。"
    },
    {
      "q": "据公开信息/架构可知的推导论点：依托 Qwen 生态对齐与 codec-LM 训练，Qwen3-TTS 在多语种零样本克隆与端到端语音生成上应具备较强能力，并可与通义系对话/agent 流水线低摩擦集成。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：训练字段「codec-LM 训练 + Qwen 生态对齐；多语种」。与同类对比：生态内对齐是其相对独立 TTS 产品的集成优势。边界与不确定性：DEEP Results 为空，克隆相似度与多语种质量无客观指标；零样本克隆在远语种上泛化为推断，需以官方评测为准。"
    },
    {
      "q": "据公开信息/架构可知的推导论点：作为闭源模型，Qwen3-TTS 不可本地复现与部署，codec-LM 自回归路线存在长序列不稳定风险，且零样本克隆带来声音身份冒用合规风险。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：DEEP 未标注开源，且架构为自回归 codec。与同类对比：闭源使其可审计性低于 CosyVoice3/Orpheus。边界与不确定性：自回归 token 崩坏/重复为范式共性推断；商业调用下数据合规、声音授权边界需以官方条款为准，属推断性提示。"
    }
  ],
  "orpheus_tts": [
    {
      "q": "据公开信息/架构可知的推导论点：Orpheus-TTS 采用 codec-LM 生成并引入情绪标签条件以强调韵律自然度，且官方开源，定位为开源、偏情感表达质量的语音合成模型。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：架构字段「codec-LM + 情绪标签条件，强调韵律自然度」，训练字段标注「开源」。与同类对比：相对纯克隆向的 Qwen3-TTS，更突出情感/韵律；相对 MiniMax 商业情绪标签，开源更透明。边界与不确定性：情绪标签的细粒度与中文覆盖未经实测，为基于描述的推断。"
    },
    {
      "q": "据公开信息/架构可知的推导论点：情绪标签数据 + codec-LM 训练使 Orpheus 在情感表达自然度与基础零样本克隆上具备可用能力，且因开源可本地部署与社区优化。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：训练字段「情绪标签数据 + codec-LM 训练；开源」。与同类对比：开源使其可复现性与可定制性优于闭源商业 TTS。边界与不确定性：DEEP Results 为空，无 MOS/情感准确度指标；克隆相似度与跨语种能力为推断，需以社区评测为准。"
    },
    {
      "q": "据公开信息/架构可知的推导论点：局限在情绪标签体系覆盖有限、自回归 codec 长序列稳定性风险，以及开源权重可用性/部署依赖需核实；零样本克隆仍存合规风险。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：架构为自回归 codec，训练标注开源但权重分发未详述。与同类对比：闭源商业模型有平台保障，开源需自行解决依赖与算力。边界与不确定性：开源降低技术复现风险但不消除合规风险；情绪标签边界与权重发布渠道为推断性提示，需以官方仓库为准。"
    }
  ],
  "higgs2": [
    {
      "q": "据公开信息/架构可知的推导论点：Higgs Audio v2 采用连续语音表征 + 多说话者/情感条件，支持角色扮演与情绪表达，定位为面向角色化、情感化语音生成的方向。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：架构字段「连续表征 + 多说话者/情感条件，支持角色扮演与情绪表达」。与同类对比：角色扮演/多说话者条件使其比单一克隆向模型更偏「多角色内容生产」。边界与不确定性：连续表征与情感解耦程度未经实测，为推断；模型未标注开源，归闭源。"
    },
    {
      "q": "据公开信息/架构可知的推导论点：多说话者 + 情感数据训练使 Higgs Audio v2 在角色扮演一致性、情绪表达丰富度上应具较强能力，适合虚拟人、互动剧情等需多角色声音的场景。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：训练字段「多说话者 + 情感数据训练；连续表征建模」。与同类对比：相对仅做单说话者克隆的模型，其多角色切换是差异点。边界与不确定性：DEEP Results 为空，角色一致性与情感准确度无客观指标；长对话中音色漂移为推断风险，需以官方 demo 为准。"
    },
    {
      "q": "据公开信息/架构可知的推导论点：作为闭源模型，Higgs Audio v2 不可本地复现，情感/角色条件可控性依赖标注质量，且多角色克隆叠加带来更高的声音冒用与伦理合规风险。",
      "src": "推导（依据知识库 DEEP 文本 / 官方发布）",
      "insight": "推导根据：DEEP 未标注开源，架构含多说话者/情感条件。与同类对比：闭源使其可审计性低于开源方案，多角色能力放大滥用面。边界与不确定性：情感标签细粒度与可控边界未披露；合规与许可以官方条款为准，属推断性提示。"
    }
  ]
};
globalThis.BENCHMARKS = [
  {
    "id": "asr_aishell1",
    "name": "AISHELL-1",
    "domain": "ASR",
    "metric": "CER",
    "unit": "%",
    "better": "lower",
    "entries": [
      {
        "id": "stepaudio25",
        "v": 0.71,
        "note": "AISHELL-1 CER"
      },
      {
        "id": "fireredasr2",
        "v": 0.57,
        "note": "AED 变体 AISHELL-1 CER（论文，离线）"
      },
      {
        "id": "nim4_asr",
        "v": 0.57,
        "note": "AISHELL-1 CER 离线 0.57%（流式 0.60%）"
      }
    ]
  },
  {
    "id": "asr_zh_cer",
    "name": "中文通用基准 (CER% 均值)",
    "domain": "ASR",
    "metric": "CER",
    "unit": "%",
    "better": "lower",
    "entries": [
      {
        "id": "fireredasr2",
        "v": 2.89,
        "note": "4 个公开中文基准平均"
      }
    ]
  },
  {
    "id": "asr_zh_wer",
    "name": "中文场景 (WER%)",
    "domain": "ASR",
    "metric": "WER",
    "unit": "%",
    "better": "lower",
    "entries": [
      {
        "id": "hy_asr30",
        "v": 3.34,
        "note": "中文场景 WER"
      }
    ]
  },
  {
    "id": "asr_hf",
    "name": "HF Open ASR Leaderboard (WER%)",
    "domain": "ASR",
    "metric": "WER",
    "unit": "%",
    "better": "lower",
    "entries": [
      {
        "id": "cohere_transcribe",
        "v": 5.42,
        "note": "多数据集均值"
      },
      {
        "id": "seed_asr20",
        "q": true,
        "note": "官方：居前（未公开统一数字）"
      },
      {
        "id": "qwen3_asr",
        "q": true,
        "note": "官方：居前（未公开统一数字）"
      }
    ]
  },
  {
    "id": "asr_en_wer",
    "name": "公开英文基准 (WER% 均值)",
    "domain": "ASR",
    "metric": "WER",
    "unit": "%",
    "better": "lower",
    "entries": [
      {
        "id": "ibm_granite41",
        "v": 5.33,
        "note": "公开英文基准均值"
      }
    ]
  },
  {
    "id": "asr_fleurs",
    "name": "FLEURS (82 语, 句级准确率%)",
    "domain": "ASR",
    "metric": "准确率",
    "unit": "%",
    "better": "higher",
    "entries": [
      {
        "id": "fireredasr2",
        "v": 97.18,
        "note": "FLEURS 82 语"
      }
    ]
  },
  {
    "id": "asr_dialect",
    "name": "中文方言/口音 (CER% 均值)",
    "domain": "ASR",
    "metric": "CER",
    "unit": "%",
    "better": "lower",
    "entries": [
      {
        "id": "fireredasr2",
        "v": 11.55,
        "note": "19 个方言/口音基准平均"
      }
    ]
  },
  {
    "id": "asr_punc",
    "name": "多领域标点 (F1%)",
    "domain": "ASR",
    "metric": "F1",
    "unit": "%",
    "better": "higher",
    "entries": [
      {
        "id": "fireredasr2",
        "v": 78.9,
        "note": "多领域标点基准"
      }
    ]
  },
  {
    "id": "asr_vad",
    "name": "VAD · FLEURS-VAD-102 (帧级 F1%)",
    "domain": "ASR",
    "metric": "F1",
    "unit": "%",
    "better": "higher",
    "entries": [
      {
        "id": "fireredasr2",
        "v": 97.57,
        "note": "FLEURS-VAD-102"
      }
    ]
  },
  {
    "id": "asr_aa_wer",
    "name": "Artificial Analysis 词错率榜 (WER%)",
    "domain": "ASR",
    "metric": "WER",
    "unit": "%",
    "better": "lower",
    "entries": [
      {
        "id": "fun_realtime_asr",
        "v": 1.8,
        "note": "AA 词错率榜"
      }
    ]
  },
  {
    "id": "asr_language_coverage",
      "name": "ASR 语种覆盖 (语言数)",
      "domain": "ASR",
      "metric": "语言数",
      "unit": "",
      "better": "higher",
      "entries": [
        {
          "id": "meta_omni",
          "v": 1600,
          "note": "1600+"
        }
      ]
    },
    {
      "id": "tts_language_coverage",
      "name": "TTS 语种覆盖 (语言数)",
      "domain": "TTS",
      "metric": "语言数",
      "unit": "",
      "better": "higher",
      "entries": [
        {
          "id": "omnivoice",
          "v": 600,
          "note": "600+"
        },
        {
          "id": "voxcpm2",
          "v": 30,
          "note": "30 语"
        }
      ]
    },
  {
    "id": "asr_size",
    "name": "端侧模型体积 (GB)",
    "domain": "ASR",
    "metric": "体积",
    "unit": "GB",
    "better": "lower",
    "entries": [
      {
        "id": "on_device",
        "v": 0.67,
        "note": "0.67GB 量化"
      }
    ]
  },
  {
    "id": "asr_latency",
    "name": "端侧/流式延迟 (首包/总)",
    "domain": "ASR",
    "metric": "延迟",
    "unit": "ms",
    "better": "lower",
    "entries": [
      {
        "id": "voxtral_mini",
        "v": 480,
        "note": "流式延迟 ~480ms（论文，≈Whisper）"
      },
      {
        "id": "kyutai_stt",
        "v": 500,
        "approx": true,
        "note": "实测 ~0.5s（约）"
      }
    ]
  },
  {
    "id": "asr_rtfx",
    "name": "服务端吞吐 (RTFx)",
    "domain": "ASR",
    "metric": "RTFx",
    "unit": "",
    "better": "higher",
    "entries": [
      {
        "id": "parakeet_tdt",
        "v": 3332,
        "note": "批处理 RTFx"
      }
    ]
  },
  {
    "id": "asr_claim",
    "name": "综合质量（官方宣称，无统一数字）",
    "domain": "ASR",
    "metric": "综合",
    "unit": "",
    "better": "rank",
    "entries": [
      {
        "id": "seed_asr20",
        "q": true,
        "note": "居前"
      },
      {
        "id": "qwen3_asr",
        "q": true,
        "note": "居前"
      },
      {
        "id": "glm_asr",
        "q": true,
        "note": "良好"
      },
      {
        "id": "fun_asr",
        "q": true,
        "note": "可用"
      },
      {
        "id": "elevenlabs_scribe2",
        "q": true,
        "note": "企业级领先 / SOTA"
      },
      {
        "id": "nim4_asr",
        "q": true,
        "note": "专名/术语 WER 显著降低"
      },
      {
        "id": "canary_qwen",
        "q": true,
        "note": "四语高精度"
      },
      {
        "id": "vibevoice_asr",
        "q": true,
        "note": "长音频单次 60 分钟"
      },
      {
        "id": "moonshine_v2",
        "q": true,
        "note": "相对 Whisper 推理 ~100×"
      }
    ]
  },
  {
    "id": "tts_seedzh_cer",
    "name": "Seed-TTS-Eval test-zh (CER%)",
    "domain": "TTS",
    "metric": "CER",
    "unit": "%",
    "better": "lower",
    "entries": [
      {
        "id": "luna_tts",
        "v": 0.73,
        "note": "CER 0.73 / SIM 79.7"
      }
    ]
  },
  {
    "id": "tts_seedzh_sim",
    "name": "Seed-TTS-Eval test-zh (SIM%)",
    "domain": "TTS",
    "metric": "SIM",
    "unit": "%",
    "better": "higher",
    "entries": [
      {
        "id": "luna_tts",
        "v": 79.7,
        "note": "Luna-TTS"
      },
      {
        "id": "longcat_audiodit",
        "v": 81.8,
        "note": "Seed-ZH SIM 0.818"
      }
    ]
  },
  {
    "id": "tts_seeden_wer",
    "name": "Seed-TTS-Eval test-en (WER%)",
    "domain": "TTS",
    "metric": "WER",
    "unit": "%",
    "better": "lower",
    "entries": [
      {
        "id": "luna_tts",
        "v": 1.49,
        "note": "WER 1.49 / SIM 76.8"
      }
    ]
  },
  {
    "id": "tts_seeden_sim",
    "name": "Seed-TTS-Eval test-en (SIM%)",
    "domain": "TTS",
    "metric": "SIM",
    "unit": "%",
    "better": "higher",
    "entries": [
      {
        "id": "luna_tts",
        "v": 76.8,
        "note": "Luna-TTS"
      }
    ]
  },
  {
    "id": "tts_seedhard_sim",
    "name": "Seed-Hard (SIM%)",
    "domain": "TTS",
    "metric": "SIM",
    "unit": "%",
    "better": "higher",
    "entries": [
      {
        "id": "longcat_audiodit",
        "v": 79.7,
        "note": "Seed-Hard SIM 0.797"
      }
    ]
  },
  {
    "id": "tts_cv3",
    "name": "CV3-Eval (野外, 错率)",
    "domain": "TTS",
    "metric": "错率",
    "unit": "",
    "better": "lower",
    "entries": [
      {
        "id": "luna_tts",
        "q": true,
        "note": "官方：对比中最低（未公开统一数字）"
      }
    ]
  },
  {
    "id": "tts_aa",
    "name": "Artificial Analysis TTS Leaderboard (Elo)",
    "domain": "TTS",
    "metric": "Elo",
    "unit": "",
    "better": "higher",
    "entries": [
      {
        "id": "qwen_audio_tts",
        "q": true,
        "note": "独立榜 #1（排名第一）"
      },
      {
        "id": "fun_realtime_tts",
        "v": 1190,
        "note": "Elo 1190"
      }
    ]
  },
  {
    "id": "tts_zt1",
    "name": "ZTTS1-Eval (质量/相似度/WER)",
    "domain": "TTS",
    "metric": "综合",
    "unit": "",
    "better": "higher",
    "entries": [
      {
        "id": "zonos2",
        "q": true,
        "note": "竞争性 SOTA（自研基准）"
      }
    ]
  },
  {
    "id": "tts_vox30",
    "name": "内部 30 语言评测 (平均 WER%)",
    "domain": "TTS",
    "metric": "WER",
    "unit": "%",
    "better": "lower",
    "entries": [
      {
        "id": "voxcpm2",
        "v": 1.68,
        "note": "内部 30 语评测集"
      }
    ]
  },
  {
    "id": "tts_vs_eleven",
    "name": "对 ElevenLabs Flash v2.5 胜率 (%)",
    "domain": "TTS",
    "metric": "胜率",
    "unit": "%",
    "better": "higher",
    "entries": [
      {
        "id": "voxtral_tts",
        "v": 68.4,
        "note": "母语者人工评测"
      }
    ]
  },
  {
    "id": "tts_latency",
    "name": "首包延迟 (ms)",
    "domain": "TTS",
    "metric": "延迟",
    "unit": "ms",
    "better": "lower",
    "entries": [
      {
        "id": "voxtral_tts",
        "v": 70,
        "note": "首包 ~70ms"
      },
      {
        "id": "chatterbox_flash",
        "q": true,
        "note": "实时场景首包低（未公开数字）"
      }
    ]
  },
  {
    "id": "tts_rtf",
    "name": "实时 RTF (流式)",
    "domain": "TTS",
    "metric": "RTF",
    "unit": "",
    "better": "lower",
    "entries": [
      {
        "id": "luna_tts",
        "v": 0.024,
        "note": "实时变体 RTF 0.0240"
      }
    ]
  },
  {
    "id": "tts_claim",
    "name": "零样本/克隆质量（官方宣称，无统一数字）",
    "domain": "TTS",
    "metric": "综合",
    "unit": "",
    "better": "rank",
    "entries": [
      {
        "id": "stepaudio25_tts",
        "q": true,
        "note": "SOTA"
      },
      {
        "id": "wavtts",
        "q": true,
        "note": "逼近 SOTA 潜空间 TTS"
      },
      {
        "id": "mega_tts3",
        "q": true,
        "note": "零样本 SOTA"
      },
      {
        "id": "cosyvoice3",
        "q": true,
        "note": "多语种零样本领先"
      },
      {
        "id": "qwen3_tts",
        "q": true,
        "note": "零样本克隆质量好"
      },
      {
        "id": "orpheus_tts",
        "q": true,
        "note": "社区实测韵律自然"
      },
      {
        "id": "indextts2",
        "q": true,
        "note": "多数据集零样本优于 SOTA"
      },
      {
        "id": "confucius4_tts",
        "q": true,
        "note": "跨语种克隆显著"
      },
      {
        "id": "minimax28",
        "q": true,
        "note": "表现力/多语种强"
      },
      {
        "id": "fishaudio_s2",
        "q": true,
        "note": "社区实测克隆好"
      },
      {
        "id": "higgs2",
        "q": true,
        "note": "多角色/情感表达良好"
      }
    ]
  }
];
