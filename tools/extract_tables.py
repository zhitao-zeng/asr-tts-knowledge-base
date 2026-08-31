#!/usr/bin/env python3
"""
extract_tables.py — 从论文 PDF 重建结果表格的行列结构，输出 data/tables/<arxiv_id>.json

动机：抽取层把表格文本切成了散块（正文段落/伪公式块），阅读页只能折叠堆字。
本脚本按 caption 锚定表区，用行 y 聚类 + 列 x 聚类重建真实网格，
build_paper.js 把网格渲染成 HTML <table>。

策略：
  1. 对每个 table_caption 块：在 caption 所在页搜索 "Table N" 行得 y 位置。
  2. 方向探测：caption 上方/下方各取 40 行算 table 得分（数字单元格比例），
     往得分高的方向扩展表区，遇正文长句/标题/页码停止。
  3. 表区内：行 = y0 聚类（容差 5pt，同行单元格 y 抖动容忍）；
     列 = 单元格 x0 聚类（容差 9pt）得列左缘序列；
     单元格按 x 重叠分配到列；多行首行全为非数字 → 表头。
  4. 跨页续表：下一页顶部若仍是表格行且列数一致（±1），并入同一网格。

输出：data/tables/<arxiv_id>.json
  { "<table_caption_block_id>": { "page": n, "headers": [[...]], "rows": [[...]] } }
（只含成功重建且 ≥2 行 × ≥3 列的表；无 caption 的表不处理）

用法：python3 tools/extract_tables.py [arxiv_id ...]（无参数跑全部）
"""
import json
import re
import sys
from pathlib import Path

import fitz

ROOT = Path(__file__).resolve().parent.parent
NUM_RE = re.compile(r"^-?[\d.,]+%?$|^[–—-]$|^[±]?[\d.,]+±[\d.,]+$|^✓$|^✗$")
ROW_TOL = 5.0      # 行 y 聚类容差
COL_TOL = 9.0      # 列 x0 聚类容差
MAX_ROWS_PER_CAPTION = 3000  # 安全闸：单元格逐行拆分的大表轻松破 200 行（VibeVoice 表 2 ≈230）


def line_cells(pg):
    """页面上所有文本行，按阅读顺序：(y0, x0, x1, text, size, bold_all)。"""
    out = []
    for b in pg.get_text("dict")["blocks"]:
        if b["type"] != 0:
            continue
        for l in b["lines"]:
            t = "".join(s["text"] for s in l["spans"]).strip()
            if not t:
                continue
            size = max(s["size"] for s in l["spans"])
            bold = all(s["flags"] & 16 for s in l["spans"])
            out.append((l["bbox"][1], l["bbox"][0], l["bbox"][2], t, size, bold))
    out.sort()
    return out


def is_num(tok):
    return bool(NUM_RE.match(tok))


def row_table_score(cells):
    """一行（x 排序的词序列）是表格行的程度：≥2 个数字/短 token 且词数 ≥3。"""
    toks = [c[3] for c in cells]
    if len(toks) < 3:
        return 0
    nums = sum(1 for t in toks if is_num(t))
    if nums >= 2:
        return 2
    # 纯文字但 ≥4 个短词（表头行 "DER cpWER tcpWER WER"）
    if len(toks) >= 4 and all(len(t) <= 24 for t in toks):
        return 1
    return 0


def looks_prose(cells):
    """长正文句：首个词起 x 靠左、总词数多、句子以标点结尾且数字少；
    或字母主导（≥70% 字母词）且 ≥6 词（表格行的文字格不会有这么多连续词）。"""
    text = " ".join(c[3] for c in cells)
    words = text.split()
    alpha = sum(1 for w in words if re.search(r"[a-zA-Z]", w))
    if len(words) >= 6 and alpha / len(words) >= 0.7:
        return True
    if len(text) > 60 and text.rstrip().endswith((".", ",", ";", ":")):
        nums = sum(1 for t in words if is_num(t))
        if nums <= 2:
            return True
    if len(text) > 110:
        return True
    return False


def find_caption_y(lines, caption_text):
    m = re.match(r"^(Table|TABLE)\s*([IVXLC]{1,6}|\d+[A-Z]?)(?![A-Z0-9])", caption_text)
    if not m:
        return None
    prefix = m.group(0)
    for y0, x0, x1, t, size, bold in lines:
        if t.startswith(prefix) and not t[len(prefix):len(prefix)+1].isalnum():
            return y0
    return None


def build_grid(region_lines):
    """region_lines: [(y0,x0,x1,text,size,bold)] → (headers, rows)。"""
    # 行聚类
    rows = []
    for ln in sorted(region_lines):
        y0 = ln[0]
        if rows and y0 - rows[-1][0] <= ROW_TOL:
            rows[-1][1].append(ln)
            rows[-1][0] = min(rows[-1][0], y0)
        else:
            rows.append([y0, [ln]])
    # 列左缘聚类
    xs = sorted(x0 for _, (y, cells) in enumerate(rows) for (y0, x0, x1, t, s, b) in cells)
    col_edges = []
    for x in xs:
        if col_edges and x - col_edges[-1] <= COL_TOL:
            pass
        else:
            col_edges.append(x)
    # 分配单元格到列
    grid = []
    for y, cells in rows:
        cells = sorted(cells, key=lambda c: c[1])
        row = [""] * len(col_edges)
        for (y0, x0, x1, t, s, b) in cells:
            ci = 0
            for k in range(len(col_edges) - 1, -1, -1):
                if x0 >= col_edges[k] - COL_TOL:
                    ci = k
                    break
            row[ci] = (row[ci] + " " + t).strip() if row[ci] else t
        grid.append((row, cells))
    # 去掉全空行；列只保留 ≥20% 行有内容的（双栏表的列间空隙会产生幽灵列）
    grid = [g for g in grid if any(c for c in g[0])]
    if not grid:
        return [], []
    n_rows = len(grid)
    keep_cols = [k for k in range(len(col_edges))
                 if sum(1 for g in grid if g[0][k]) >= max(1, int(n_rows * 0.2))]
    rows_out = [[g[0][k] for k in keep_cols] for g in grid]
    # 表头：开头连续的非数字行（跳过 caption 下脚注等长行，它们以缓冲行混进来）
    headers = []
    while rows_out and sum(1 for c in rows_out[0] if is_num(c)) == 0:
        row0 = rows_out.pop(0)
        if len(" ".join(row0).split()) <= 12:
            headers.append(row0)
        if len(headers) > 4:
            break
    return headers, rows_out


def expand_region(lines, cap_y, direction, page_h):
    """从 caption 向 direction('up'/'down') 扩展表区行。
    首行数字出现前的连续短行（"DER cpWER…"、"Dataset Language"）是表头候选，
    不能丢；遇到数字才算表区开始，之后的正文长句/下一个加粗字母标题/页码停止。"""
    if direction == "up":
        cand = [ln for ln in lines if ln[0] < cap_y - 1][::-1]
    else:
        cand = [ln for ln in lines if ln[0] > cap_y + 1]
    region = []
    header_buf = []
    started = False
    for idx, ln in enumerate(cand):
        y0, x0, x1, t, size, bold = ln
        sc = row_table_score([(0, 0, 0, t, 0, 0)])
        if not started:
            if sc > 0 or is_num(t):
                started = True
            else:
                # caption 与表体之间可能有脚注（"obtain VALL-E … through communication"），
                # 缓冲短行继续扫；只有长正文句才判方向错误
                if looks_prose([(0, 0, 0, t, 0, 0)]) and len(t) > 110:
                    break
                if len(t) <= 75:
                    header_buf.append(ln)
                    if len(header_buf) > 30:
                        header_buf.pop(0)  # 缓冲够用即可，超长丢最旧（不错过 16+ 行的多层表头）
                continue
        if started:
            if looks_prose([(0, 0, 0, t, 0, 0)]) and not is_num(t):
                break
            if re.match(r"^\d{1,3}$", t) and y0 > page_h - 55:
                break  # 页码
            # 加粗的字母开头短行是下一个标题；加粗数字单元格（表格常加粗数字）不是
            if bold and len(t) < 60 and re.match(r"^[A-Z]", t) and not is_num(t) and sc == 0:
                break
            # 加粗的独立小节号行（"2.3.2"）+ 下一行是加粗字母标题 → 表结束
            if bold and re.match(r"^\d+(\.\d+)+$", t) and idx + 1 < len(cand):
                nt = cand[idx + 1][3]
                if cand[idx + 1][5] and re.match(r"^[A-Z]", nt):
                    break
            region.append(ln)
            if len(region) > MAX_ROWS_PER_CAPTION:
                break
    region = header_buf + region
    if direction == "up":
        region.reverse()
    return region


def process(pdf_path, captions):
    doc = fitz.open(str(pdf_path))
    results = {}
    for cap in captions:
        bid, page_no, text = cap["id"], cap["page"], cap["text"]
        if page_no > doc.page_count:
            continue
        pg = doc[page_no - 1]
        lines = line_cells(pg)
        cap_y = find_caption_y(lines, text)
        if cap_y is None:
            continue
        up = expand_region(lines, cap_y, "up", pg.rect.height)
        down = expand_region(lines, cap_y, "down", pg.rect.height)
        region = up if len(up) >= len(down) else down
        # 行内多单元格：PyMuPDF 可能把一格一词拆成多行——按 y 近似先并一次
        headers, rows = build_grid(region)
        if len(rows) >= 2 and rows[0] and max(len(r) for r in rows) >= 3:
            results[bid] = {"page": page_no, "headers": headers, "rows": rows}
    return results


def main():
    ids = sys.argv[1:]
    if not ids:
        ids = sorted(p.stem for p in (ROOT / ".cache" / "papers").glob("*.json"))
    total = 0
    for pid in ids:
        jf = ROOT / ".cache" / "papers" / f"{pid}.json"
        pdf = ROOT / "papers" / f"{pid}.pdf"
        if not jf.exists() or not pdf.exists():
            continue
        d = json.load(open(jf, encoding="utf-8"))
        caps = [b for s in d["sections"] for b in s["blocks"] if b["type"] == "table_caption"]
        if not caps:
            continue
        res = process(pdf, caps)
        if res:
            out = ROOT / "data" / "tables"
            out.mkdir(exist_ok=True)
            json.dump(res, open(out / f"{pid}.json", "w", encoding="utf-8"),
                    ensure_ascii=False, indent=1)
        total += len(res)
        print(f"{pid}: {len(res)}/{len(caps)} 个表重建")
    print(f"\n共重建 {total} 个表")


if __name__ == "__main__":
    main()
