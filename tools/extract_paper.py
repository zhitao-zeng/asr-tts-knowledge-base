#!/usr/bin/env python3
"""
extract_paper.py — 把单篇论文 PDF 抽成结构化 JSON（全文双语精读的输入工件）

保留：页码、标题层级、段落、句子、图/表标题、公式块、引用编号；
每个 block / sentence 都有稳定 ID（section 号来自论文自身编号，如 sec-3-8）。

依赖：PyMuPDF（fitz）。本机 python3 已有。
用法：
  python3 tools/extract_paper.py papers/2212.04356.pdf
  python3 tools/extract_paper.py papers/2212.04356.pdf -o .cache/papers/2212.04356.json

输出：
  .cache/papers/<arxiv_id>.json   结构化正文（翻译 agent 的输入）
  .cache/papers/<arxiv_id>.txt    同内容的纯文本视图（便于通读校对）

布局适配（2026-08 校准）：
  Whisper(2212.04356)：行内标题 "1. Introduction"(12pt bold) / "2.1. Data Processing"(10pt bold)
  FireRedASR2S(2603.10420) / FishS2(2603.08823)：编号与标题分两行（"2" + "System Overview"，均 bold）
  页眉页脚：跨页重复短行 / 页边孤立页码行，自动过滤。

⚠ 重跑警告：2026-08-27 起加入「跨块段落续接」（行内数学变量导致的碎块合并）。
  对 2212.04356 / 2603.10420 / 2603.08823 三篇已完成翻译的原型**不要重跑本脚本**：
  重跑会改变 block/sentence 编号，使 data/papers/*.js 结构校验失败。
  确需重跑时，必须同步迁移 .cache/papers/zh/<id>/ 片段的 key（旧句原文是新合并句的子串，可机械对齐）。
"""
import json
import os
import re
import sys
from collections import Counter

try:
    import fitz  # PyMuPDF
except ImportError:
    sys.exit("缺少依赖 PyMuPDF：pip install PyMuPDF")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

BODY_SIZE_MIN = 9.5          # 正文行字号下限（三篇校准均为 ~10pt）
H1_SIZE = 11.5               # 一级标题字号下限（三篇 H1 均 12pt）
SEC_NUM_RE = re.compile(r"^(\d+(?:\.\d+)*)\.?\s+\S")   # "1. Introduction" / "2.1. Data Processing"
SEC_NUM_ONLY_RE = re.compile(r"^(\d+(?:\.\d+)*)\.?$")  # "2" / "2.1"（编号独占一行）
APPX_INLINE_RE = re.compile(r"^([A-Z])(?:\.(\d+(?:\.\d+)*))?\.?\s+\S")  # "C. Text Standardization" / "A.1 xxx"
APPX_NUM_ONLY_RE = re.compile(r"^[A-Z](?:\.\d+(?:\.\d+)*)?\.?$")        # "C" / "A.1"（独占一行）
CAPTION_RE = re.compile(r"^(Figure|Table|Fig\.?|TABLE|FIGURE)\s*(\d+[A-Z]?|[IVXLC]{1,6})\s*[:.;]", re.I)  # 真 caption 编号后必有标点（支持阿拉伯与罗马数字）；"Figure 2 shows…" 是正文引用
CAPTION_VERB_RE = re.compile(r"^(Figure|Table|Fig\.?)\s*\d+[A-Z]?\s+(shows?|presents?|plots?|depicts?|illustrates?|demonstrates?|summarizes?|reports?|compares?|lists?|gives?|provides?|describes?|displays?|visualizes?|plots?)\b", re.I)  # 双保险：编号后紧跟小写动词必为正文引用
EQNUM_RE = re.compile(r"\((\d+)\)\s*$")                # 行尾公式编号 "(1)"
PSEUDO_H1 = {"abstract", "references", "bibliography", "acknowledgements", "acknowledgments", "appendix"}
# IEEEtran 风格：H1 "II. METHOD"（罗马数字+全大写，常规字重）、H2 "A. Learning ..."（斜体）
IEEE_H1_RE = re.compile(r"^([IVXLC]{1,6})\.\s+([A-Z0-9][A-Z0-9\s\-:&',()/]+)$")
IEEE_H1_CAPS_RE = re.compile(r"^([IVXLC]{1,6})\.\s+(\S.{2,50})$")  # 小写 caps 字体变体（"I. Introduction"）
IEEE_H2_RE = re.compile(r"^([A-Z])\.\s+(\S.{2,70})$")
ABSTRACT_RUNIN_RE = re.compile(r"^Abstract[—–-]\s*(.*)$")   # IEEE 摘要段首 "Abstract—..."
INDEXTERMS_RE = re.compile(r"^(Index Terms|Keywords?)[—–-]", re.I)  # IEEE 首页关键词行（非标题）
APPX_SPLIT_RE = re.compile(r"^Appendix\s+([A-Z])\.?$")              # "Appendix A"（标题在下一行）
MATH_FONT_RE = re.compile(r"CMMI|CMR|CMSY|CMEX|MSBM|Math|Cambria", re.I)

# 句子切分保护：这些缩写里的 "." 不是句尾
_ABBREV = ["e.g", "i.e", "et al", "cf", "vs", "approx", "Fig", "Eq", "Sec", "Dr", "Mr", "Ms", "St", "al", "Inc", "Ltd", "No", "pp", "Vol", "ed", "eds", "Ph.D", "etc", "w.r.t", "a.k.a", "i.i.d"]


def split_sentences(text):
    """保守的英文句子切分：保护缩写/小数/引用编号后按 [.!?] + 空白 + 大写/括号 切。"""
    t = text
    protected = []
    def _prot(m):
        protected.append(m.group(0))
        return f"\x00{len(protected)-1}\x07"
    # 小数 2.89%、版本 v1.2、arXiv 编号 2212.04356
    t = re.sub(r"\d\.\d+", _prot, t)
    for ab in _ABBREV:
        t = re.sub(r"\b" + re.escape(ab) + r"\.", _prot, t, flags=re.I)
    # 省略号 ...
    t = re.sub(r"\.\.\.+", _prot, t)
    parts = re.split(r"(?<=[.!?])\s+(?=[A-Z(\[\"“])", t)
    def _restore(s):
        return re.sub(r"\x00(\d+)\x07", lambda m: protected[int(m.group(1))], s)
    return [_restore(p).strip() for p in parts if p.strip()]


def clean_text(s):
    """剥离 PDF 映射产生的 NUL/控制字符（保留 \\n\\t），避免下游 grep/JSON 工具误判二进制。"""
    return re.sub(r"[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]", "", s)


def dehyphenate_join(lines):
    """段落内行合并：行尾连字符去 '-' 直拼，否则空格连接。"""
    out = ""
    for ln in lines:
        ln = ln.strip()
        if not ln:
            continue
        if out.endswith("-") and re.search(r"[a-z]-$", out):
            out = out[:-1] + ln
        else:
            out = (out + " " + ln).strip() if out else ln
    return out


def order_blocks(blocks, page_width):
    """双栏重排：把整页文本块按（全宽 / 左栏 / 右栏）重排为阅读顺序。单栏页原样返回。
    LaTeX 双栏：先排 y 在该全宽块之前的左右栏内容，再排全宽块，最后剩余左栏→右栏。"""
    mid = page_width / 2
    text_blocks = [b for b in blocks if b["type"] == 0]
    fw, left, right = [], [], []
    for b in text_blocks:
        x0, _, x1, _ = b["bbox"]
        if x0 < mid - 20 and x1 > mid + 20:
            fw.append(b)
        elif (x0 + x1) / 2 < mid:
            left.append(b)
        else:
            right.append(b)
    if not left or not right:
        return blocks  # 单栏：保持 PDF 原有顺序
    left.sort(key=lambda b: b["bbox"][1])
    right.sort(key=lambda b: b["bbox"][1])
    fw.sort(key=lambda b: b["bbox"][1])
    out, li, ri = [], 0, 0
    for b in fw:
        while li < len(left) and left[li]["bbox"][3] <= b["bbox"][1] + 2:
            out.append(left[li]); li += 1
        while ri < len(right) and right[ri]["bbox"][3] <= b["bbox"][1] + 2:
            out.append(right[ri]); ri += 1
        out.append(b)
    out.extend(left[li:])
    out.extend(right[ri:])
    # 保持与非文本块（图片）的相对顺序已无意义，文本流正确即可；直接返回重排后的文本块
    return out


def extract(pdf_path):
    doc = fitz.open(pdf_path)
    page_h = doc[0].rect.height

    # ---------- 1) 收集所有文本行（双栏页先按栏重排） ----------
    raw_lines = []
    for pno in range(doc.page_count):
        pg = doc[pno]
        blocks = order_blocks(pg.get_text("dict")["blocks"], pg.rect.width)
        for bno, b in enumerate(blocks):
            if b["type"] != 0:
                continue
            blines = [l for l in b["lines"] if "".join(s["text"] for s in l["spans"]).strip()]
            for li, l in enumerate(blines):
                spans = l["spans"]
                text = clean_text("".join(s["text"] for s in spans)).strip()
                if not text:
                    continue
                size = max(s["size"] for s in spans)
                bold = any(s["flags"] & 16 for s in spans)
                bold_all = all(s["flags"] & 16 for s in spans)
                ital_all = all(s["flags"] & 2 for s in spans)
                caps_font = any("Caps" in s["font"] for s in spans)
                mono = any("Mon" in s["font"] or "Consol" in s["font"] for s in spans)
                math = sum(len(s["text"]) for s in spans if MATH_FONT_RE.search(s["font"])) >= max(1, int(0.6 * len(text)))
                raw_lines.append({
                    "page": pno + 1, "x0": round(l["bbox"][0], 1), "y0": round(l["bbox"][1], 1),
                    "y1": round(l["bbox"][3], 1),
                    "size": round(size, 1), "bold": bold, "bold_all": bold_all, "ital_all": ital_all,
                    "caps_font": caps_font, "mono": mono, "math": math, "text": text,
                    "block_first": li == 0, "block_lines": len(blines),
                })

    # ---------- 2) 过滤页眉/页脚（先算自适应正文字号：双栏/会议模板正文可能是 9pt） ----------
    sizes = Counter(l["size"] for l in raw_lines if len(l["text"]) > 40)
    body_size = sizes.most_common(1)[0][0] if sizes else 10.0
    HEAD_MIN = body_size - 0.5      # 标题候选字号下限（加粗行）
    TITLE_MIN = body_size + 2.0     # 首页文档标题最小字号

    # a) 跨页重复短行（running head）——只滤页边区域（页眉页脚住在页边；
    #    全局滤会误杀正文/图表里恰好重复的短标签，如 VibeVoice 附录语言分布图）
    cnt = Counter(re.sub(r"\d+", "#", l["text"].strip())[:60] for l in raw_lines
                  if len(l["text"]) < 70 and (l["y0"] < 90 or l["y1"] > page_h - 60))
    repeated = {k for k, v in cnt.items() if v >= max(3, int(doc.page_count * 0.25))}
    # b) 页边孤立数字行（页码）；但 "2"/"2.1" 若是 bold 则是分体式标题编号，不能滤
    lines = []
    for l in raw_lines:
        t = l["text"]
        norm = re.sub(r"\d+", "#", t.strip())[:60]
        # 纯数字/节号行不参与“跨页重复”过滤（页码规范化后都是 "#"，会误杀分体式标题编号；
        # 页码由下面的位置规则处理）
        # 首页大字号行也不过滤：论文标题常与页眉 running head 同文（如 Whisper），
        # 重复的是页眉（小字），首页大字号的是真标题
        if len(t) < 70 and norm in repeated and not SEC_NUM_ONLY_RE.match(t):
            if not (l["page"] == 1 and l["size"] >= TITLE_MIN) and (l["y0"] < 90 or l["y1"] > page_h - 60):
                continue
        if SEC_NUM_ONLY_RE.match(t) and not (l["bold"] and l["size"] >= HEAD_MIN):
            if l["y0"] < 70 or l["y1"] > page_h - 55:
                continue  # 页边页码
        if re.match(r"^\d{1,3}$", t) and (l["y0"] < 70 or l["y1"] > page_h - 55) and not l["bold"]:
            continue
        if l["size"] >= 18 and l["page"] == 1 and "arXiv" in t:
            continue  # arXiv 侧栏水印（竖排大字）
        lines.append(l)

    # ---------- 3) 文档标题 + 逐行归类 ----------
    blocks = []  # {type, page, ...}
    doc_title_lines = []
    first_page_max = max((l["size"] for l in lines if l["page"] == 1 and "arxiv" not in l["text"].lower()), default=0)

    i = 0
    cur_para = None  # 累积中的段落 {"page","lines":[...]}
    in_appendix = False  # 见过 References/Appendix 标题后，接受字母式附录标题
    in_toc = False       # 见过 "Contents" 标题后处于目录区

    NUM_TOK = re.compile(r"^-?\d+(?:\.\d+)?%?$")
    ALPHA_TOK = re.compile(r"[a-zA-Z一-鿿]")
    def line_is_table(ln):
        """行级表格判定：整行纯数字/符号 token（单元格行）/ 数字主导 /
        ≥4 数字且无句末标点 / 符号主导（点线、刻度）。"""
        toks = ln.split()
        if not toks:
            return False
        nums = sum(1 for t in toks if NUM_TOK.match(t))
        sym = sum(1 for t in toks if not ALPHA_TOK.search(t))
        if sym == len(toks):
            return True  # 整行都是数字/符号 token（表格单元格行，如 "16.93"、"3.67±0.09"）
        if len(toks) > 3 and nums / len(toks) > 0.4:
            return True
        if nums >= 4 and not re.search(r"[.!?…][\"'”’)\]]*$", ln.rstrip()):
            return True
        if len(toks) > 3 and sym / len(toks) > 0.6:
            return True
        return False

    def flush_para():
        nonlocal cur_para
        if not cur_para:
            return
        # 行级 prose/table 分段：恢复回来的表格行、坐标轴 junk 与正文 prose 分离
        segs = []  # [is_table, [lines]]
        for ln in cur_para["lines"]:
            t = line_is_table(ln)
            if segs and segs[-1][0] == t:
                segs[-1][1].append(ln)
            else:
                segs.append([t, [ln]])
        # 短 prose 孤岛（≤8 词，如 "Model #langs ..." 表头行）两侧都是 table 时并入 table；
        # 仅一侧相邻不并（防止吞掉表格前后的真实正文句子）
        for k in range(len(segs)):
            if segs[k][0] or len(" ".join(segs[k][1]).split()) > 8:
                continue
            prev_t = k > 0 and segs[k - 1][0]
            next_t = k < len(segs) - 1 and segs[k + 1][0]
            if prev_t and next_t:
                segs[k][0] = True
        for is_table, seg_lines in segs:
            blocks.append({"type": "table_body" if is_table else "paragraph",
                           "page": cur_para["page"], "text": dehyphenate_join(seg_lines)})
        cur_para = None

    while i < len(lines):
        l = lines[i]
        t = l["text"]
        low = t.lower().strip()

        # 3.0 目录页：独立加粗行 "Contents" 之后的条目（带页码引用，如 "106 B Data Statistics"）
        #     全部跳过，直到遇上真正的正文（以句号结尾的长行）。目前只有 SeamlessM4T 命中。
        if in_toc:
            words = t.split()
            if len(words) >= 8 and t.rstrip().endswith((".", "。")):
                in_toc = False
            else:
                i += 1
                continue
        if l["bold_all"] and t.strip().lower() in ("contents", "table of contents"):
            in_toc = True
            i += 1
            continue

        # 3.1 文档标题：首页最大字号行（可能是多行）
        if l["page"] == 1 and l["size"] >= first_page_max - 0.5 and first_page_max >= TITLE_MIN and not doc_title_lines and not PSEUDO_H1.__contains__(low):
            flush_para()
            doc_title_lines.append(t)
            # 吸收紧随的同字号行（标题折行）
            j = i + 1
            while j < len(lines) and lines[j]["page"] == 1 and abs(lines[j]["size"] - l["size"]) < 0.6 and lines[j]["y0"] - l["y1"] < l["size"] * 1.8:
                doc_title_lines.append(lines[j]["text"])
                j += 1
            i = j
            continue

        # 3.2 伪标题：Abstract / References / Acknowledgements / Appendix（全粗体独立行；
        #     或 small-caps 字体行，如 ZONOS2 的 Acknowledgements）+ IEEE 全大写 REFERENCES
        if (low in PSEUDO_H1 and (l["bold_all"] or l["caps_font"])) \
                or (t.strip().upper() in ("REFERENCES", "BIBLIOGRAPHY") and len(t.strip()) < 14):
            flush_para()
            blocks.append({"type": "heading", "level": 1, "num": None, "page": l["page"], "text": t})
            if low in ("references", "bibliography", "appendix") or t.strip().upper() in ("REFERENCES", "BIBLIOGRAPHY"):
                in_appendix = True
            i += 1
            continue

        # 3.2e "Appendix A" 分体式（small-caps，标题在下一行，如 ZONOS2）
        m_apx = APPX_SPLIT_RE.match(t)
        if m_apx and l["caps_font"]:
            flush_para()
            title_parts = []
            j = i + 1
            while j < len(lines) and lines[j]["caps_font"] and len(lines[j]["text"]) < 70 \
                    and not APPX_SPLIT_RE.match(lines[j]["text"]):
                title_parts.append(lines[j]["text"])
                j += 1
            blocks.append({"type": "heading", "level": 1, "num": m_apx.group(1), "page": l["page"],
                           "text": " ".join(title_parts) if title_parts else f"Appendix {m_apx.group(1)}"})
            in_appendix = True
            i = j
            continue

        # 3.2b IEEE 摘要段首："Abstract—Self-supervised ..."（run-in，非独立标题行）
        m_abs = ABSTRACT_RUNIN_RE.match(t)
        if m_abs and not any(b["type"] == "heading" and b["text"].lower() == "abstract" for b in blocks):
            flush_para()
            blocks.append({"type": "heading", "level": 1, "num": None, "page": l["page"], "text": "Abstract"})
            if m_abs.group(1).strip():
                blocks.append({"type": "paragraph", "page": l["page"], "text": m_abs.group(1).strip()})
            i += 1
            continue

        # 3.2c IEEE H1："II. METHOD"（罗马数字 + 全大写，常规字重，字号≈正文）；
        #     或小写 caps 字体的 "I. Introduction"（ZONOS2）
        mi = IEEE_H1_RE.match(t)
        if mi and len(t) < 60 and l["size"] >= HEAD_MIN - 1.0:
            flush_para()
            blocks.append({"type": "heading", "level": 1, "num": mi.group(1), "page": l["page"],
                           "text": mi.group(2).strip()})
            i += 1
            continue
        mic = IEEE_H1_CAPS_RE.match(t)
        if mic and l["caps_font"] and len(t) < 60 and l["size"] >= HEAD_MIN - 1.0:
            flush_para()
            blocks.append({"type": "heading", "level": 1, "num": mic.group(1), "page": l["page"],
                           "text": mic.group(2).strip()})
            i += 1
            continue

        # 3.2d IEEE H2："A. Learning the Hidden Units"（全斜体，字母 + 标题）
        if l["ital_all"] and l["size"] >= HEAD_MIN - 1.0:
            mi2 = IEEE_H2_RE.match(t)
            if mi2 and not mi2.group(2)[0].islower():
                flush_para()
                blocks.append({"type": "heading", "level": 2, "num": mi2.group(1), "page": l["page"],
                               "text": mi2.group(2).strip()})
                i += 1
                continue

        # 3.3 行内式标题："1. Introduction" / "2.1. Data Processing"（全粗体）；
        #     参考文献之后追加接受字母式附录标题 "C. Text Standardization"
        m = SEC_NUM_RE.match(t)
        am = APPX_INLINE_RE.match(t) if in_appendix else None
        if l["bold_all"] and (m or am) and l["size"] >= HEAD_MIN and len(t) < 90:
            if m:
                num = m.group(1)
                level = 1 if num.count(".") == 0 else 2
                title_txt = re.sub(r"^\d+(?:\.\d+)*\.?\s+", "", t)
            else:
                num = am.group(1) + (("." + am.group(2)) if am.group(2) else "")
                level = 1 if not am.group(2) else 2
                title_txt = re.sub(r"^[A-Z](?:\.\d+(?:\.\d+)*)?\.?\s+", "", t)
            flush_para()
            blocks.append({"type": "heading", "level": level, "num": num, "page": l["page"],
                           "text": title_txt})
            i += 1
            continue

        # 3.4 分体式标题：编号独占一行（全粗体），标题在后续全粗体行
        m2 = SEC_NUM_ONLY_RE.match(t)
        am2 = APPX_NUM_ONLY_RE.match(t) if (in_appendix and not m2) else None
        if l["bold_all"] and (m2 or am2) and l["size"] >= HEAD_MIN:
            num = m2.group(1) if m2 else am2.group(0).rstrip(".")
            level = 1 if num.count(".") == 0 else 2
            title_parts = []
            j = i + 1
            while j < len(lines) and lines[j]["bold_all"] \
                    and not SEC_NUM_ONLY_RE.match(lines[j]["text"]) \
                    and not (in_appendix and APPX_NUM_ONLY_RE.match(lines[j]["text"])) \
                    and not SEC_NUM_RE.match(lines[j]["text"]) \
                    and not CAPTION_RE.match(lines[j]["text"]) \
                    and len(lines[j]["text"]) < 90 \
                    and lines[j]["y0"] - l["y1"] < 40:
                title_parts.append(lines[j]["text"])
                l = lines[j]
                j += 1
            if title_parts:
                flush_para()
                blocks.append({"type": "heading", "level": level, "num": num, "page": lines[i]["page"],
                               "text": " ".join(title_parts)})
                i = j
                continue
            # 编号后没有标题行 → 当普通行处理（防御）
        # 3.4b 无编号加粗标题（部分模板章节无编号，如 IndexTTS2）：
        #     全粗体块首短行；≥body+1.5pt 记 H1，≈body 记 H2。排除项目符号/句首小写/关键词行。
        #     标题可能是多行块的首行（AAAI 模板标题与正文同块）：只消费首行，其余行落入新段落。
        if l["bold_all"] and l["block_first"] and len(t) < 70 \
                and not t[0].islower() and not t.startswith(("•", "-", "–", "*", "(")) \
                and not INDEXTERMS_RE.match(t) \
                and not (l["page"] == 1 and l["size"] >= first_page_max - 0.5) \
                and not CAPTION_RE.match(t) and not EQNUM_RE.search(t):
            if l["size"] >= body_size + 1.5:
                flush_para()
                blocks.append({"type": "heading", "level": 1, "num": None, "page": l["page"], "text": t})
                i += 1
                continue
            if HEAD_MIN - 0.5 <= l["size"] < body_size + 1.5 and not SEC_NUM_RE.match(t):
                flush_para()
                blocks.append({"type": "heading", "level": 2, "num": None, "page": l["page"], "text": t})
                i += 1
                continue
        # 3.5 图表标题：块首行匹配 Figure/Table N:（编号后必须有标点；动词开头是正文引用）
        if l["block_first"] and CAPTION_RE.match(t) and not CAPTION_VERB_RE.match(t):
            flush_para()
            cap_lines = [x["text"] for x in lines[i:i + l["block_lines"]]]
            kind = "figure_caption" if re.match(r"^(Figure|Fig\.?|FIGURE)", t, re.I) else "table_caption"
            blocks.append({"type": kind, "page": l["page"], "text": dehyphenate_join(cap_lines)})
            i += l["block_lines"]
            continue

        # 3.6 公式块：短块且行尾带 (n) 编号，或整块等宽/数学字体
        if l["block_first"] and l["block_lines"] <= 4:
            blk = lines[i:i + l["block_lines"]]
            joined = dehyphenate_join([x["text"] for x in blk])
            if EQNUM_RE.search(blk[-1]["text"]) \
                    or (all(x["mono"] for x in blk) and len(joined) < 300 and "\n" not in joined) \
                    or (all(x["math"] for x in blk) and len(joined) < 300):
                flush_para()
                blocks.append({"type": "equation", "page": l["page"], "text": joined})
                i += l["block_lines"]
                continue

        # 3.7 普通段落：同块合并；新块且上行不是行尾连字/句中，则换段。
        #     跨块续接：LaTeX 行内斜体数学变量（t、q(0)）会把一句切成多个 PyMuPDF 块，
        #     上一段未以句末标点收尾、或下一块以小写字母/括号开头时，视为同一段落续写。
        if l["block_first"]:
            prev_text = " ".join(cur_para["lines"]).rstrip() if cur_para else ""
            continued = bool(cur_para) and (
                not re.search(r"[.!?…:;][\"'”’)\]]*$", prev_text)
                or re.match(r"^[a-z(]", t)
            )
            if not continued:
                flush_para()
        elif cur_para is not None and l["x0"] >= cur_para.get("min_x0", 1e9) + 8:
            # 段内缩进分段（双栏论文 PyMuPDF 把整栏并成一块：首行缩进 + 上行句末标点 → 新段）
            prev_text = " ".join(cur_para["lines"]).rstrip()
            if re.search(r"[.!?…][\"'”’)\]]*$", prev_text):
                flush_para()
        if cur_para is None:
            cur_para = {"page": l["page"], "lines": [], "min_x0": l["x0"]}
        cur_para["min_x0"] = min(cur_para["min_x0"], l["x0"])
        cur_para["lines"].append(t)
        i += 1
    flush_para()

    # ---------- 4) 组装 sections + 稳定 ID + 句子切分 ----------
    def sec_slug(num, text):
        if num:
            return "sec-" + num.replace(".", "-")
        return "sec-" + re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")[:32]

    paper = {"paper_id": os.path.splitext(os.path.basename(pdf_path))[0],
             "title_original": dehyphenate_join(doc_title_lines),
             "page_count": doc.page_count, "sections": []}
    sec = None
    counters = {}
    used_ids = set()
    last_h1 = None
    for b in blocks:
        if b["type"] == "heading":
            if b["level"] == 1:
                last_h1 = b["num"]
                sid = sec_slug(b["num"], b["text"])
            elif b["num"] and re.fullmatch(r"[A-Z]", b["num"]) and last_h1:
                sid = f"sec-{last_h1}-{b['num']}"   # IEEE 子节字母随父节重启，带父节前缀防冲突
            else:
                sid = sec_slug(b["num"], b["text"])
            if sid in used_ids:
                k = 2
                while f"{sid}-{k}" in used_ids:
                    k += 1
                sid = f"{sid}-{k}"
            used_ids.add(sid)
            sec = {"id": sid, "num": b["num"], "level": b["level"],
                   "title": b["text"], "page": b["page"], "blocks": []}
            paper["sections"].append(sec)
            continue
        if sec is None:
            # 标题前内容（作者、单位、arXiv 编号等）归入 front-matter
            sec = {"id": "sec-front", "num": None, "level": 1, "title": "Front Matter",
                   "page": 1, "blocks": []}
            paper["sections"].append(sec)
        c = counters.setdefault(sec["id"], {"p": 0, "fig": 0, "tab": 0, "eq": 0})
        base = sec["id"].replace("sec-", "")
        if b["type"] == "paragraph":
            c["p"] += 1
            bid = f"p-{base}-{c['p']}"
            sents = [{"id": f"s-{base}-{c['p']}-{k+1}", "text": s}
                     for k, s in enumerate(split_sentences(b["text"]))]
            sec["blocks"].append({"id": bid, "type": "paragraph", "page": b["page"],
                                  "text": b["text"], "sentences": sents})
        elif b["type"] in ("figure_caption", "table_caption"):
            key = "fig" if b["type"] == "figure_caption" else "tab"
            c[key] += 1
            sec["blocks"].append({"id": f"{key}-{base}-{c[key]}", "type": b["type"],
                                  "page": b["page"], "text": b["text"], "sentences": []})
        else:
            c["eq"] += 1
            sec["blocks"].append({"id": f"eq-{base}-{c['eq']}", "type": "equation",
                                  "page": b["page"], "text": b["text"], "sentences": []})

    # ---------- 5) 数值/符号糊块 → table_body ----------
    # 恢复回来的表格行、坐标轴刻度、点线等数字/符号主导块不该当正文段落；
    # 转成 table_body（阅读页折叠呈现、翻译豁免）。在 run 合并之前先做块级判定。
    # 三档命中：纯数字主导 / 符号主导（点线、刻度）/ 带名字的表格行（≥4 个数字且不以句末标点结尾）
    NUM_TOK = re.compile(r"^-?\d+(?:\.\d+)?%?$")
    ALPHA_TOK = re.compile(r"[a-zA-Z一-鿿]")
    for sec in paper["sections"]:
        for b in sec["blocks"]:
            if b["type"] != "paragraph":
                continue
            toks = b["text"].split()
            if len(toks) <= 15:
                continue
            nums = [t for t in toks if NUM_TOK.match(t)]
            num_ratio = len(nums) / len(toks)
            sym_ratio = sum(1 for t in toks if not ALPHA_TOK.search(t)) / len(toks)
            row_like = len(nums) >= 4 and num_ratio > 0.15 \
                and not re.search(r"[.!?…][\"'”’)\]]*$", b["text"].rstrip())
            if num_ratio > 0.35 or sym_ratio > 0.6 or row_like:
                b["type"] = "table_body"
                b["cells"] = len(toks)
                b["sentences"] = []
    # ---------- 5b) 表格主体合并：连续 ≥4 个超短段落（≤50 字符）视为 PDF 表格碎块 ----------
    # 大附录数值表在文本层是一列列碎 cell，不是可读正文；合并成 table_body，
    # 阅读页以折叠预格式块呈现，翻译层只需表注/说明，不逐格翻译数字。
    for sec in paper["sections"]:
        merged = []
        run = []
        def flush_run():
            nonlocal run
            if len(run) >= 4:
                first = run[0]
                text = "\n".join(x["text"] for x in run)
                merged.append({"id": first["id"].replace("p-", "tb-", 1), "type": "table_body",
                               "page": first["page"], "text": text, "sentences": [],
                               "cells": len(run)})
            else:
                merged.extend(run)
            run = []
        for b in sec["blocks"]:
            if b["type"] == "paragraph" and len(b["text"]) <= 50:
                run.append(b)
            else:
                flush_run()
                merged.append(b)
        flush_run()
        sec["blocks"] = merged
    return paper


def to_text_view(paper):
    out = [f"# {paper['paper_id']}  {paper['title_original']}  ({paper['page_count']} pages)", ""]
    for sec in paper["sections"]:
        label = f"{sec['num']} {sec['title']}" if sec["num"] else sec["title"]
        out.append(f"\n{'#' if sec['level']==1 else '##'} [{sec['id']}] {label}  (p.{sec['page']})")
        for b in sec["blocks"]:
            if b["type"] == "paragraph":
                out.append(f"\n  <{b['id']} p.{b['page']}>")
                for s in b["sentences"]:
                    out.append(f"    <{s['id']}> {s['text']}")
            else:
                out.append(f"\n  <{b['id']} {b['type']} p.{b['page']}> {b['text']}")
    return "\n".join(out)


def main():
    if len(sys.argv) < 2:
        sys.exit("用法: python3 tools/extract_paper.py <pdf> [-o out.json]")
    pdf = sys.argv[1]
    out = None
    if "-o" in sys.argv:
        out = sys.argv[sys.argv.index("-o") + 1]
    pid = os.path.splitext(os.path.basename(pdf))[0]
    outdir = os.path.join(ROOT, ".cache", "papers")
    os.makedirs(outdir, exist_ok=True)
    out = out or os.path.join(outdir, pid + ".json")

    paper = extract(pdf)
    nsec = len(paper["sections"])
    nblk = sum(len(s["blocks"]) for s in paper["sections"])
    nsent = sum(len(b["sentences"]) for s in paper["sections"] for b in s["blocks"])
    with open(out, "w", encoding="utf-8") as f:
        json.dump(paper, f, ensure_ascii=False, indent=1)
    with open(out.replace(".json", ".txt"), "w", encoding="utf-8") as f:
        f.write(to_text_view(paper))
    print(f"✔ {pid}: {paper['page_count']} 页 → {nsec} sections / {nblk} blocks / {nsent} sentences")
    print(f"  JSON: {out}")
    print(f"  文本视图: {out.replace('.json', '.txt')}")


if __name__ == "__main__":
    main()
