#!/usr/bin/env python3
"""
extract_figures.py — 从论文 PDF 中按 figure_caption 块裁出图本体为 PNG

依赖：PyMuPDF（本机 python3 已有）。

输入：
  papers/<arxiv_id>.pdf            本地 PDF
  .cache/papers/<arxiv_id>.json    抽取层（figure_caption 的 id/page 来自这里）

输出：
  papers-read/assets/figures/<arxiv_id>/<figure_block_id>.png
  （可选） .cache/figures/<arxiv_id>.debug/  调试用：每页的色块诊断图

策略：
  对每个 figure_caption：
    1. 定位该 caption 在 PDF 页面上的文字行 bbox（在 caption 文字所在页搜索）。
    2. 图本体通常在 caption 正上方。从 caption y0 向上扫描：
         - 收集所有「图内元素」：vector drawings 的 rect、嵌入图片的 rect
         - 收集所有「文字行」：分成正文（size>=9）和图内标注（size<9）
         - 图底 y_bot = max(y1 of drawings/images < caption_y0 - 5)
         - 图顶 y_top = max(y1 of 正文 size>=9 < y_bot - 2) + padding
    3. 在 [y_top, y_bot] 内聚合所有 drawings/images 的 x 范围得 [x0, x1]
    4. 若 x 范围空或高度 < 20px，视为未找到，跳过。
    5. 否则 clip=(x0-4, y_top-4, x1+4, y_bot+2) 渲染 300dpi PNG。

多栏处理：双栏论文的图如果跨整宽（x0<x_mid && x1>x_mid），就是全宽图；
否则只在 caption 所在栏内聚合 drawings。

用法：
  python3 tools/extract_figures.py <arxiv_id> [--debug]
  python3 tools/extract_figures.py              # 跑全部 32 篇
"""
import json
import os
import re
import shutil
import sys
from pathlib import Path

import fitz  # PyMuPDF

ROOT = Path(__file__).resolve().parent.parent
PAPERS = ROOT / "papers"
CACHE = ROOT / ".cache" / "papers"
OUT = ROOT / "papers-read" / "assets" / "figures"
DEBUG_DIR = ROOT / ".cache" / "figures_debug"

DPI = 200          # 平衡清晰度与文件大小；300 太肥
MIN_H = 24         # 图高度下限（px@PDF 单位），低于视为没识别到
MIN_W = 60         # 图宽度下限
TOP_PAD = 4        # 图顶 padding
BOT_PAD = 2        # 图底 padding（避免压到 caption）
X_PAD = 6          # 图左右 padding
# caption 上方留多少空隙才认为「图就在上面」。
# 2406.02430 的图表底距 caption 仅 3.8pt，阈值 4 会把图本体漏掉。
MIN_GAP_ABOVE_CAPTION = 2


def find_caption_line(pg, caption_text):
    """在页面上找 caption 文字的首行 bbox。caption_text 是 JSON 里的 original，可能跨多行。

    同一页可能有多行以 "Figure N" 开头：真 caption（"Figure 3: Visualization ..."）
    和正文里的引用（"Figure 3 plots P(phoneme|qt) ..."）。引用行通常在 caption 上方，
    按 y0 取最顶会拿错。所以给每个候选打分：
      1. 前缀后紧跟 ':'/'.' 的是 caption 排版，加 1 分；
      2. 与 JSON caption 全文的最长公共前缀长度（同 block 拼后续行，caption 常跨行）；
      3. 平手时取 y 最小。
    """
    m = re.match(r"^(Figure|Fig\.?|FIGURE)\s*(\d+|[A-Z](?:\.\d+)?)", caption_text, re.I)
    if not m:
        return None
    target_prefix = m.group(0)  # e.g. "Figure 1" / "Figure A.1"
    norm_caption = re.sub(r"\s+", " ", caption_text).strip()
    d = pg.get_text("dict")
    candidates = []
    for b in d["blocks"]:
        if b["type"] != 0:
            continue
        lines = b["lines"]
        for i, l in enumerate(lines):
            line_text = "".join(s["text"] for s in l["spans"]).strip()
            if not line_text.lower().startswith(target_prefix.lower()):
                continue
            after = line_text[len(target_prefix):]
            # 防 "Figure 1" 误配 "Figure 11"：前缀后必须紧跟 空白/非字母数字 或结尾
            if after[:1].isalnum():
                continue
            after = after.lstrip()
            rest = " ".join(
                "".join(s["text"] for s in l2["spans"]).strip()
                for l2 in lines[i:i + 4]
            )
            norm_line = re.sub(r"\s+", " ", rest).strip()
            # 最长公共前缀（逐词）：PDF 抽取的断词/断字符不应截断匹配
            # （如 "D i↵erent inference schedules" vs "Different inference schedules"）
            lw, cw = norm_line.split(), norm_caption.split()
            common = 0
            for a, c in zip(lw, cw):
                if a != c:
                    break
                common += 1
            # 排版分值：':'/'.' 是 caption 式；词数对齐 >=3 词也算（兼容无标点 caption）
            typo_score = 1 if (after[:1] in ":." or common >= 3) else 0
            candidates.append((typo_score, common, -l["bbox"][1], l["bbox"]))
    if not candidates:
        return None
    candidates.sort(reverse=True)
    return candidates[0][3]  # bbox


def find_figure_bbox(pg, caption_bbox):
    """从 caption 向上找图本体。返回 (x0,y0,x1,y1) 或 None。"""
    cap_y0 = caption_bbox[1]
    page_w = pg.rect.width
    mid = page_w / 2
    cap_x0, cap_x1 = caption_bbox[0], caption_bbox[2]
    cap_full_width = (cap_x0 < mid - 20) and (cap_x1 > mid + 20)

    # 收集 drawing 矩形和 image 矩形；
    # 小字行（size<9：轴刻度、图例、图内标注）也作为图元参与 y-聚类，
    # 否则 caption 上方的文字带（图例/轴标签）会把 gfx 簇与图主体断开
    # （2603.25551 p1：图例 "Voxtral TTS" 在 y1=574，caption 在 y1=587，
    #   没有小字行时 gfx 簇只含勾选框，图主体（y1≤543）因 24pt 空隙够不着）。
    # 页眉装饰线（页顶窄而宽的横线，如 Whisper 附录页 running head 下的 rule）
    # 会把图顶错误地拉到页眉：宽>60% 页宽且完全在页顶 44pt 内的 drawing 剔除。
    pg_w = pg.rect.width
    draw_rects = [d["rect"] for d in pg.get_drawings()
                  if not ((d["rect"].y1 - d["rect"].y0) <= 2
                          and (d["rect"].x1 - d["rect"].x0) > 0.6 * pg_w
                          and d["rect"].y1 < 70)]
    img_rects = []
    d = pg.get_text("dict")
    for b in d["blocks"]:
        if b["type"] == 1:
            img_rects.append(fitz.Rect(b["bbox"]))
    gfx = draw_rects + img_rects

    # 文字行：分正文 (size>=9) 和 小字 (size<9)
    body_lines = []   # (y0, y1)
    small_lines = []  # (y0, y1)
    small_rects = []  # fitz.Rect，作为 gfx 簇的组成部分
    all_text = []     # (fitz.Rect, text, size, bold_all)，供图区扩展用（轴标签/图例常是正文级字号）
    for b in d["blocks"]:
        if b["type"] != 0:
            continue
        for l in b["lines"]:
            text = "".join(s["text"] for s in l["spans"]).strip()
            if not text:
                continue
            size = max(s["size"] for s in l["spans"])
            bold_all = all(s["flags"] & 16 for s in l["spans"])
            y0, y1 = l["bbox"][1], l["bbox"][3]
            (body_lines if size >= 9 else small_lines).append((y0, y1))
            if size < 9:
                small_rects.append(fitz.Rect(l["bbox"]))
            all_text.append((fitz.Rect(l["bbox"]), text, size, bold_all))
    gfx_cluster = gfx + small_rects

    # 候选 gfx：必须在 caption 上方
    gfx_above = [r for r in gfx if r.y1 < cap_y0 - MIN_GAP_ABOVE_CAPTION]
    if not gfx_above:
        return None
    if not cap_full_width:
        cap_cx = (cap_x0 + cap_x1) / 2
        col_mid = mid
        # 图本体跨栏（全宽图）时不做同栏过滤，否则会把 gfx_above 缩成图例小方块、
        # y_bot 错误地停在图例上（2308.11596 p58 的直方图）
        wide_above = [r for r in gfx_above if r.x0 < mid - 20 and r.x1 > mid + 20]
        if not wide_above:
            same_col = [r for r in gfx_above if (r.x0 + r.x1) / 2 < col_mid] if cap_cx < mid \
                       else [r for r in gfx_above if (r.x0 + r.x1) / 2 >= col_mid]
            if same_col:
                gfx_above = same_col

    # 图底 y_bot = 最贴近 caption 的 gfx 底
    y_bot = max(r.y1 for r in gfx_above)
    # 图顶 y_top：从 y_bot 向上找，遇到「正文行 y1 < y_bot - 2」就停
    # 注意：图内部可能有 size>=9 的标注（例如 Whisper fig1 里的 '⋯'），所以应该找
    # 『最贴近 y_bot 的 body_line』，而不是『最大 body_line.y1』。
    # 但 body_line 可能恰好穿过图区（若图上方紧邻正文段最后一行，y1 接近 y_bot 但是正文）。
    # 启发：找 body_lines 中 y1 < y_bot 的，按 y1 降序；取第一个『和 y_bot 之间存在
    # 一段足够大的空隙（>8px）』的行 —— 那就是正文末尾。
    # 页眉/页脚行（贴近页边 40px 内）是装饰，不是正文：剔除。
    # 反例：Voxtral p1 页脚 "arXiv:... 6 Apr 2026"（y1=562）紧贴图底（y_bot=572），
    # 若不剔除，空隙启发会把图顶压到 567，只裁出两个勾选框。
    page_h = pg.rect.height
    top_m, bot_m = page_h * 0.05, page_h - 40
    body_core = [(y0, y1) for (y0, y1) in body_lines if not (y1 < top_m or y0 > bot_m)] \
                or body_lines
    best = None
    for y1 in sorted([y1 for (y0, y1) in body_core if y1 < y_bot - 2], reverse=True):
        if y_bot - y1 > 8:
            best = y1
            break
    # 空隙启发在所有（含页眉脚）body_lines 上也跑一遍，取更靠上的图顶，避免裁进正文行
    for y1 in sorted([y1 for (y0, y1) in body_lines if y1 < y_bot - 2], reverse=True):
        if y_bot - y1 > 8:
            best = min(best, y1) if best is not None else y1
            break
    def _bbox_from_ytop(y_top_seed):
        """给定图顶种子，聚合 y 窗内的 gfx 得 x 窗，校验后返回 bbox 或 None。"""
        in_y = [r for r in gfx if r.y0 < y_bot and r.y1 > y_top_seed]
        # 图内正文尺寸文字行也会撑宽 x 范围（如 Whisper fig5 左栏正文底下的右栏图），
        # 但它们不属于图；按「正文行不参与」原则画 x 窗时仍可能把左栏长行算进来，
        # 所以在同栏过滤前先按 y 窗+gfx 判。这里加一层保险：若有 gfx 行参与，
        # 它们自身就是图的一部分；正文行不画，不影响。
        if not cap_full_width:
            cap_cx = (cap_x0 + cap_x1) / 2
            # 全宽图（跨栏）不做同栏过滤：caption 可能在左栏而图跨整宽
            # （2308.11596 p58：Figure 12 caption 在左栏 x90-139，图本体 x161-500 跨栏，
            #   同栏过滤会把图滤成图例小方块导致宽度不足）
            wide = [r for r in in_y if r.x0 < mid - 20 and r.x1 > mid + 20]
            if wide:
                in_y = wide
            else:
                same_col = [r for r in in_y if (r.x0 + r.x1) / 2 < mid] if cap_cx < mid \
                           else [r for r in in_y if (r.x0 + r.x1) / 2 >= mid]
                if same_col:
                    in_y = same_col

        # 第一次算出 x 窗后，可能有散点 outlier（跨栏装饰线等）撑爆宽度。
        # 用 1.5×IQR 之外的点剔除，更稳。
        if len(in_y) >= 4:
            xs = sorted([(r.x0 + r.x1) / 2 for r in in_y])
            q1, q3 = xs[len(xs)//4], xs[(3*len(xs))//4]
            iqr = q3 - q1
            lo, hi = q1 - 3*iqr, q3 + 3*iqr
            in_y = [r for r in in_y if lo <= (r.x0 + r.x1) / 2 <= hi] or in_y

        # 重新计算 y_top：图顶应是 in_y 里 y0 最小的（而不是凭空隙猜的）。
        # 这能纠正比如右栏图的图顶被左栏正文 y1 压得过高的情况：
        # 上面 body-line 启发法对跨栏布局过于保守，直接用 gfx 的 y0 更准。
        if not in_y:
            return None
        y_top = min(r.y0 for r in in_y)
        if y_top_seed > 0:
            y_top = min(y_top, y_top_seed)
        y_top -= TOP_PAD

        if y_bot - y_top < MIN_H:
            return None
        x0 = min(r.x0 for r in in_y)
        x1 = max(r.x1 for r in in_y)
        if x1 - x0 < MIN_W:
            return None
        # 图内/图周文字行（图例、轴刻度、轴标题）与 drawing 分离，向四周扩展纳入。
        # 轴标签字号常是正文级（10.7pt 的刻度数字也在此列），所以用全部文字行；
        # 吸收规则：短行（≤55 字符，防吸进正文长句）且非加粗（防吸进章节标题/页眉，
        # 如 Whisper 附录 E 的 "E. Training Dataset Statistics"）且与图区 x 重叠。
        yt, yb, xx0, xx1 = y_top, y_bot, x0, x1
        for tr, tx, _sz, tb in all_text:
            if len(tx) > 55 or tb:
                continue
            if tr.x1 < xx0 - 10 or tr.x0 > xx1 + 10:
                continue
            if tr.y1 <= yt and tr.y1 > yt - 45 and tr.y1 >= 65:
                yt = min(yt, tr.y0)                # 图顶上方：图例（不吸 65pt 以上的页眉区文字）
            if tr.y0 >= yb and tr.y0 < yb + 45 and tr.y1 < cap_y0 - 1:
                yb = max(yb, tr.y1)                # 图底下方：x 轴刻度/轴标题（不越过 caption）
        for tr, tx, _sz, tb in all_text:
            if len(tx) > 55 or tb:
                continue
            if tr.y0 < yb and tr.y1 > yt and tr.x1 >= xx0 - 45 and tr.x0 <= xx1 + 45:
                xx0 = min(xx0, tr.x0)
                xx1 = max(xx1, tr.x1)              # 纵轴标签（旋转文字）等
        return (xx0 - X_PAD, yt, xx1 + X_PAD, yb + BOT_PAD)

    # 策略 1：正文行空隙启发定图顶
    res = _bbox_from_ytop((best + TOP_PAD) if best is not None else 0)
    if res:
        return res

    # 策略 2：gfx y-聚类（gap-closing，沿 y 自底向上扫描）。
    # 空隙启发会被「紧贴图底的页脚/图内大字」骗出压塌的图顶
    # （如 2603.25551 p1 arXiv 页脚 y1=562 紧贴图底 572，图顶被压到 566 只剩勾选框）；
    # 此时改用图元连通性：从贴 caption 的图元出发，凡「顶部不高于当前簇顶+容差、
    # 底部不低于簇顶-容差」的图元都并入，即允许图元间 <=24pt 的小空隙被跳过。
    # 小字行也作为图元参与聚类（见上方注释）。
    SLACK = 24
    cluster_top = max(gfx_cluster, key=lambda r: r.y1 if r.y1 < cap_y0 - MIN_GAP_ABOVE_CAPTION else -1).y0
    progressed = True
    while progressed:
        progressed = False
        for r in sorted(gfx_cluster, key=lambda r: -r.y1):
            if r.y1 >= cap_y0 - MIN_GAP_ABOVE_CAPTION:
                continue  # caption 及以下的不参与
            if r.y0 >= cluster_top:
                continue
            if r.y1 >= cluster_top - SLACK:
                cluster_top = min(cluster_top, r.y0)
                progressed = True
    return _bbox_from_ytop(cluster_top - 12)


def render_png(pg, bbox, out_path, dpi=DPI):
    clip = fitz.Rect(*bbox)
    # 夹到页内
    clip = clip & pg.rect
    zoom = dpi / 72.0
    mat = fitz.Matrix(zoom, zoom)
    pix = pg.get_pixmap(matrix=mat, clip=clip, alpha=False)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    pix.save(str(out_path))
    return clip


def figure_text_tokens(pg, clip):
    """图区内的文字 token 集合（供阅读页抑制图内文字的文本层碎块回声）。"""
    toks = set()
    for w in pg.get_text("words"):
        r = fitz.Rect(w[:4])
        if r.intersects(clip):
            for t in w[4].split():
                toks.add(t)
    return toks


def process(arxiv_id, debug=False):
    pdf_path = PAPERS / f"{arxiv_id}.pdf"
    json_path = CACHE / f"{arxiv_id}.json"
    if not pdf_path.exists():
        return (arxiv_id, 0, 0, f"缺 PDF: {pdf_path}")
    if not json_path.exists():
        return (arxiv_id, 0, 0, f"缺 JSON: {json_path}")

    paper = json.load(open(json_path, encoding="utf-8"))
    figs = []
    for sec in paper["sections"]:
        for b in sec["blocks"]:
            if b["type"] == "figure_caption":
                figs.append(b)
    out_dir = OUT / arxiv_id
    if not figs:
        # 无图 caption：清掉可能残留的旧产物，保持输出与输入一致
        shutil.rmtree(out_dir, ignore_errors=True)
        return (arxiv_id, 0, 0, "无 figure_caption")

    doc = fitz.open(str(pdf_path))
    out_dir = OUT / arxiv_id
    # 先清掉旧产物：上一轮成功、本轮失败的 block 留下的陈旧 PNG 会被 build 误嵌
    shutil.rmtree(out_dir, ignore_errors=True)
    out_dir.mkdir(parents=True, exist_ok=True)

    ok, miss = 0, 0
    misses = []
    manifest = {}
    for fig in figs:
        fid = fig["id"]
        page = fig["page"] - 1
        text = fig["text"]
        if page >= doc.page_count:
            misses.append((fid, "page out of range"))
            miss += 1
            continue
        pg = doc[page]
        cap_bbox = find_caption_line(pg, text)
        if cap_bbox is None:
            misses.append((fid, "caption 行未找到"))
            miss += 1
            continue
        fig_bbox = find_figure_bbox(pg, cap_bbox)
        if fig_bbox is None:
            misses.append((fid, "未识别到图区域"))
            miss += 1
            continue
        out_png = out_dir / f"{fid}.png"
        try:
            clip = render_png(pg, fig_bbox, out_png)
            manifest[fid] = {"page": page + 1, "tokens": sorted(figure_text_tokens(pg, clip))}
            ok += 1
            if debug:
                dbg_dir = DEBUG_DIR / arxiv_id
                dbg_dir.mkdir(parents=True, exist_ok=True)
                # 整页诊断图：红框=识别到的图区，蓝框=caption
                pix = pg.get_pixmap(matrix=fitz.Matrix(1.5, 1.5), alpha=False)
                pix.save(str(dbg_dir / f"p{page+1:02d}_{fid}.page.png"))
        except Exception as e:
            misses.append((fid, f"渲染失败: {e}"))
            miss += 1
    # 图内文字清单（阅读页据此抑制图内文字的文本层碎块回声）
    mf_dir = ROOT / "data" / "figures"
    mf_dir.mkdir(exist_ok=True)
    if manifest:
        json.dump(manifest, open(mf_dir / f"{arxiv_id}.json", "w", encoding="utf-8"),
                  ensure_ascii=False, indent=0)
    return (arxiv_id, ok, miss, "; ".join(f"{f}:{m}" for f, m in misses))


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    debug = "--debug" in sys.argv
    if args:
        ids = args
    else:
        # 全部：.cache/papers/*.json 且对应 PDF 存在
        ids = sorted(p.stem for p in CACHE.glob("*.json")
                     if (PAPERS / (p.stem + ".pdf")).exists())
    total_ok = total_miss = 0
    for aid in ids:
        aid, ok, miss, msg = process(aid, debug=debug)
        total_ok += ok
        total_miss += miss
        status = "✔" if miss == 0 else "⚠"
        print(f"{status} {aid}: {ok} 张图 ok, {miss} 失败" + (f"  ({msg})" if msg else ""))
    print(f"\n汇总：{total_ok} 张成功，{total_miss} 张未识别/失败")
    print(f"输出目录: {OUT}")


if __name__ == "__main__":
    main()
