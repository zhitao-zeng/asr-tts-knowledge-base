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
CAPTION_RE = re.compile(r"^(Figure|Table|Fig\.?|TABLE|FIGURE)\s*\d+\s*[:.]?", re.I)
EQNUM_RE = re.compile(r"\((\d+)\)\s*$")                # 行尾公式编号 "(1)"
PSEUDO_H1 = {"abstract", "references", "bibliography", "acknowledgements", "acknowledgments", "appendix"}

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


def extract(pdf_path):
    doc = fitz.open(pdf_path)
    page_h = doc[0].rect.height

    # ---------- 1) 收集所有文本行 ----------
    raw_lines = []  # (page, x0, y0, size, bold, mono, text, block_no, line_is_block_first, block_line_count)
    for pno in range(doc.page_count):
        for bno, b in enumerate(doc[pno].get_text("dict")["blocks"]):
            if b["type"] != 0:
                continue
            blines = [l for l in b["lines"] if "".join(s["text"] for s in l["spans"]).strip()]
            for li, l in enumerate(blines):
                spans = l["spans"]
                text = "".join(s["text"] for s in spans).strip()
                size = max(s["size"] for s in spans)
                bold = any(s["flags"] & 16 for s in spans)
                bold_all = all(s["flags"] & 16 for s in spans)
                mono = any("Mon" in s["font"] or "Consol" in s["font"] for s in spans)
                raw_lines.append({
                    "page": pno + 1, "x0": round(b["bbox"][0], 1), "y0": round(l["bbox"][1], 1),
                    "y1": round(l["bbox"][3], 1),
                    "size": round(size, 1), "bold": bold, "bold_all": bold_all, "mono": mono, "text": text,
                    "block_first": li == 0, "block_lines": len(blines),
                })

    # ---------- 2) 过滤页眉/页脚 ----------
    # a) 跨页重复短行（running head）
    cnt = Counter(re.sub(r"\d+", "#", l["text"].strip())[:60] for l in raw_lines if len(l["text"]) < 70)
    repeated = {k for k, v in cnt.items() if v >= max(3, int(doc.page_count * 0.25))}
    # b) 页边孤立数字行（页码）；但 "2"/"2.1" 若是 12pt bold 则是分体式标题编号，不能滤
    lines = []
    for l in raw_lines:
        t = l["text"]
        norm = re.sub(r"\d+", "#", t.strip())[:60]
        # 纯数字/节号行不参与“跨页重复”过滤（页码规范化后都是 "#"，会误杀分体式标题编号；
        # 页码由下面的位置规则处理）
        # 首页大字号行也不过滤：论文标题常与页眉 running head 同文（如 Whisper），
        # 重复的是页眉（小字），首页 14pt+ 的是真标题
        if len(t) < 70 and norm in repeated and not SEC_NUM_ONLY_RE.match(t):
            if not (l["page"] == 1 and l["size"] >= 13):
                continue
        if SEC_NUM_ONLY_RE.match(t) and not (l["bold"] and l["size"] >= BODY_SIZE_MIN):
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
    first_page_max = max((l["size"] for l in lines if l["page"] == 1), default=0)

    i = 0
    cur_para = None  # 累积中的段落 {"page","lines":[...]}
    in_appendix = False  # 见过 References/Appendix 标题后，接受字母式附录标题
    def flush_para():
        nonlocal cur_para
        if cur_para:
            blocks.append({"type": "paragraph", "page": cur_para["page"], "text": dehyphenate_join(cur_para["lines"])})
            cur_para = None

    while i < len(lines):
        l = lines[i]
        t = l["text"]
        low = t.lower().strip()

        # 3.1 文档标题：首页最大字号行（可能是多行）
        if l["page"] == 1 and l["size"] >= first_page_max - 0.5 and first_page_max >= 13 and not doc_title_lines and not PSEUDO_H1.__contains__(low):
            flush_para()
            doc_title_lines.append(t)
            # 吸收紧随的同字号行（标题折行）
            j = i + 1
            while j < len(lines) and lines[j]["page"] == 1 and abs(lines[j]["size"] - l["size"]) < 0.6 and lines[j]["y0"] - l["y1"] < l["size"] * 1.8:
                doc_title_lines.append(lines[j]["text"])
                j += 1
            i = j
            continue

        # 3.2 伪标题：Abstract / References / Acknowledgements / Appendix（全粗体独立行）
        if low in PSEUDO_H1 and l["bold_all"]:
            flush_para()
            blocks.append({"type": "heading", "level": 1, "num": None, "page": l["page"], "text": t})
            if low in ("references", "bibliography", "appendix"):
                in_appendix = True
            i += 1
            continue

        # 3.3 行内式标题："1. Introduction" / "2.1. Data Processing"（全粗体）；
        #     参考文献之后追加接受字母式附录标题 "C. Text Standardization"
        m = SEC_NUM_RE.match(t)
        am = APPX_INLINE_RE.match(t) if in_appendix else None
        if l["bold_all"] and (m or am) and l["size"] >= BODY_SIZE_MIN - 0.3 and len(t) < 90:
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
        if l["bold_all"] and (m2 or am2) and l["size"] >= BODY_SIZE_MIN - 0.3:
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
        # 3.5 图表标题：块首行匹配 Figure/Table N:
        if l["block_first"] and CAPTION_RE.match(t):
            flush_para()
            cap_lines = [x["text"] for x in lines[i:i + l["block_lines"]]]
            kind = "figure_caption" if re.match(r"^(Figure|Fig\.?|FIGURE)", t, re.I) else "table_caption"
            blocks.append({"type": kind, "page": l["page"], "text": dehyphenate_join(cap_lines)})
            i += l["block_lines"]
            continue

        # 3.6 公式块：短块且行尾带 (n) 编号，或整块等宽字体
        if l["block_first"] and l["block_lines"] <= 4:
            blk = lines[i:i + l["block_lines"]]
            joined = dehyphenate_join([x["text"] for x in blk])
            if EQNUM_RE.search(blk[-1]["text"]) or (all(x["mono"] for x in blk) and len(joined) < 300 and "\n" not in joined):
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
        if cur_para is None:
            cur_para = {"page": l["page"], "lines": []}
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
    for b in blocks:
        if b["type"] == "heading":
            sec = {"id": sec_slug(b["num"], b["text"]), "num": b["num"], "level": b["level"],
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

    # ---------- 5) 表格主体合并：连续 ≥4 个超短段落（≤50 字符）视为 PDF 表格碎块 ----------
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
