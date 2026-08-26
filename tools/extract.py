#!/usr/bin/env python3
"""
extract.py — 从 papers/ 抽取所有 PDF 全文文本到 .cache/full/

依赖：pypdf   (pip install pypdf，建议装在隔离 venv)
用法：python3 tools/extract.py

输出：.cache/full/<pdf_basename>.txt   （一个 PDF 一个文件，按论文编号命名）
说明：抽取是后续"结构化摘要 / 重写"的输入。已抽取的文件会被跳过，可重复运行增量更新。
"""
import os, sys, glob

try:
    from pypdf import PdfReader
except ImportError:
    sys.exit("缺少依赖 pypdf：pip install pypdf")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAPERS = os.path.join(ROOT, "papers")
OUT = os.path.join(ROOT, ".cache", "full")
os.makedirs(OUT, exist_ok=True)

pdfs = sorted(glob.glob(os.path.join(PAPERS, "*.pdf")))
if not pdfs:
    sys.exit(f"在 {PAPERS} 未找到 PDF")

n = 0
for p in pdfs:
    base = os.path.splitext(os.path.basename(p))[0]
    dst = os.path.join(OUT, base + ".txt")
    if os.path.exists(dst) and os.path.getsize(dst) > 0:
        continue
    try:
        r = PdfReader(p)
        txt = "\n".join((pg.extract_text() or "") for pg in r.pages)
        open(dst, "w", encoding="utf-8").write(txt)
        n += 1
    except Exception as e:
        print(f"  ! 失败 {base}: {e}")
print(f"抽取完成：新增 {n} 个，总计 {len(pdfs)} 个 PDF → {OUT}")
