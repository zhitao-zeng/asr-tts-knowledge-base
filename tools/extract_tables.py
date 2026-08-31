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
NUM_RE = re.compile(r"^-?[\d.,]+%?$|^[–—-]$|^[±]?[\d.,]+±[\d.,]+$|^[✓✗\x13\x17]$")
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


def find_caption_pos(lines, caption_text):
    """返回 (y0, x0, x1)；匹配 "Table 2"/"TABLE II" 前缀。"""
    m = re.match(r"^(Table|TABLE)\s*([IVXLC]{1,6}|\d+[A-Z]?)(?![A-Z0-9])", caption_text)
    if not m:
        return None
    prefix = m.group(0)
    for y0, x0, x1, t, size, bold in lines:
        if t.startswith(prefix) and not t[len(prefix):len(prefix)+1].isalnum():
            return (y0, x0, x1)
    return None


def column_filter(lines, cap_x0, cap_x1, page_w):
    """若页面在 caption 附近呈双栏（caption 不跨栏且两侧都有内容），
    则只保留 caption 所在栏的行，防止邻栏正文干扰表区扩展（Whisper 表 1 的
    左栏表格 + 右栏正文被行交错，之前向上扩展一上来就被正文句中断）。"""
    mid = page_w / 2
    cap_cx = (cap_x0 + cap_x1) / 2
    if cap_x0 < mid - 40 and cap_x1 > mid + 40:
        return lines  # caption 跨栏：不过滤
    has_left = any((ln[1] + ln[2]) / 2 < mid - 40 for ln in lines)
    has_right = any((ln[1] + ln[2]) / 2 > mid + 40 for ln in lines)
    if not (has_left and has_right):
        return lines
    if cap_cx < mid:
        return [ln for ln in lines if (ln[1] + ln[2]) / 2 < mid + 30]
    return [ln for ln in lines if (ln[1] + ln[2]) / 2 >= mid - 30]


def build_grid(pg, region_lines):
    """region_lines 定 y/x 范围后，改用词级坐标 + x 间隙切分重建网格。
    （行级切分对「整行一行」的 PDF 会塌成 1 列；词级 + gap 切分两种排版通吃。）"""
    if not region_lines:
        return [], []
    y_min = min(l[0] for l in region_lines) - 3
    # line 元组是 (y0, x0, x1, text, size, bold)，没有 y1；用上界 y0+12 近似行高
    y_max = max(l[0] for l in region_lines) + 12
    x_min = min(l[1] for l in region_lines) - 6
    x_max = max(l[2] for l in region_lines) + 6
    words = [w for w in pg.get_text("words")
             if w[1] >= y_min and w[1] <= y_max and w[0] >= x_min and w[2] <= x_max + 20]
    if not words:
        return [], []
    # 行聚类（词 y0 容差 4pt）
    rows_w = []
    for w in sorted(words, key=lambda w: (w[1], w[0])):
        if rows_w and w[1] - rows_w[-1][0] <= 4.0:
            rows_w[-1][1].append(w)
            rows_w[-1][0] = min(rows_w[-1][0], w[1])
        else:
            rows_w.append([w[1], [w]])
    # 行内按 x 间隙切单元格：阈值取词间隙分布的 p10 再留 0.5pt 余量
    # （词内空格 ~2-4pt、列间槽 ≥6pt；VibeVoice 表 2 最小列槽 6.0pt，均值法会被拉到 18 误并）
    gaps = []
    for y, ws in rows_w:
        ws = sorted(ws, key=lambda w: w[0])
        for a, b in zip(ws, ws[1:]):
            gaps.append(b[0] - a[2])
    GAP = max(4.0, sorted(gaps)[len(gaps) // 10] - 0.5) if gaps else 5.5
    row_cells = []  # [[(text, x_center)], ...]
    for y, ws in rows_w:
        ws = sorted(ws, key=lambda w: w[0])
        cells, cur, cur_x0, cur_x1 = [], [], None, None
        for w in ws:
            if cur and w[0] - cur_x1 > GAP:
                cells.append((" ".join(cur), (cur_x0 + cur_x1) / 2))
                cur = []
            if not cur:
                cur_x0 = w[0]
            cur.append(w[4])
            cur_x1 = w[2]
        if cur:
            cells.append((" ".join(cur), (cur_x0 + cur_x1) / 2))
        row_cells.append(cells)
    # 列聚类按单元格 x 中心（对右对齐数字列稳健），容差 10pt
    xs = sorted(cx for cells in row_cells for (t, cx) in cells)
    col_centers = []
    for x in xs:
        if not (col_centers and x - col_centers[-1] <= 10.0):
            col_centers.append(x)
        else:
            col_centers[-1] = (col_centers[-1] + x) / 2  # 滑动均值，防长链漂移
    grid = []
    for cells in row_cells:
        row = [""] * len(col_centers)
        for (t, cx) in cells:
            ci = min(range(len(col_centers)), key=lambda k: abs(col_centers[k] - cx))
            row[ci] = (row[ci] + " " + t).strip() if row[ci] else t
        grid.append(row)
    # 去掉全空行；列只保留 ≥20% 行有内容的（双栏表的列间空隙会产生幽灵列）
    grid = [r for r in grid if any(c for c in r)]
    if not grid:
        return [], []
    n_rows = len(grid)
    keep_cols = [k for k in range(len(col_centers))
                 if sum(1 for r in grid if r[k]) >= max(1, int(n_rows * 0.2))]
    rows_out = [[r[k] for k in keep_cols] for r in grid]
    # 表头：开头连续的非数字行（跳过 caption 下脚注等长行，它们以缓冲行混进来）；
    # 至少留 2 行数据（全文字表格如 VALL-E 对比表没有数字行，防全被当表头弹空）
    headers = []
    while len(rows_out) > 2 and sum(1 for c in rows_out[0] if is_num(c)) == 0:
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
        cpos = find_caption_pos(lines, text)
        if cpos is None:
            continue
        cap_y, cap_x0, cap_x1 = cpos
        col_lines = column_filter(lines, cap_x0, cap_x1, pg.rect.width)
        up = expand_region(col_lines, cap_y, "up", pg.rect.height)
        down = expand_region(col_lines, cap_y, "down", pg.rect.height)
        # 两个方向都建网格，选产出更好的。单列网格视为无效（正文行误聚），
        # 两列及以上按 行×列 计分
        h_up, r_up = build_grid(pg, up)
        h_down, r_down = build_grid(pg, down)
        def grid_score(rows):
            cols = max((len(x) for x in rows), default=0)
            return len(rows) * cols if cols >= 2 else 0
        score_up, score_down = grid_score(r_up), grid_score(r_down)
        if score_up >= score_down and r_up:
            headers, rows, region = h_up, r_up, up
        else:
            headers, rows, region = h_down, r_down, down
        if rows and len(rows) >= 2 and max(len(r) for r in rows) >= 2:
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
        # 许可下架的 PDF（如 2604.18105 NIM4）可在 .cache/papers/ 放一份仅作抽取用，
        # 不入库不再分发；网格数字与已托管的全文译文同等暴露级别
        if not pdf.exists() and (ROOT / ".cache" / "papers" / f"{pid}.pdf").exists():
            pdf = ROOT / ".cache" / "papers" / f"{pid}.pdf"
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
