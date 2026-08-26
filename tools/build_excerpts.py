#!/usr/bin/env python3
"""
build_excerpts.py — 构建排除参考文献的结构化正文摘要，供重写 agent 阅读

依赖：无（纯标准库）
用法：python3 tools/build_excerpts.py

输入：.cache/full/<pdf_basename>.txt （由 extract.py 产出）
输出：.cache/full_ex/<model_id>.txt   （每个模型一份，含共享 PDF 的模型）

关键修复（历史上 voxtral_mini 退化的根因）：
  论文的 References / Bibliography 章节若被误当正文截取，重写 agent 会把
  参考文献条目当成 insight 的 q。本脚本做**大小写不敏感**的章节边界检测，
  在 References/Bibliography 之前截断，保证摘要只含正文。
"""
import os, re, glob, json

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FULL = os.path.join(ROOT, ".cache", "full")
OUT = os.path.join(ROOT, ".cache", "full_ex")
os.makedirs(OUT, exist_ok=True)


def strip_references(full: str) -> str:
    low = full.lower()
    ref_idx = len(full)
    # 章节级标记：出现在行首（前面是换行或文件开头）的 References/Bibliography
    for m in re.finditer(r"(?im)^[\s]*?(references|bibliography|references cited|works cited)[\s]*$", full):
        ref_idx = min(ref_idx, m.start())
    body = full[:ref_idx].strip()
    # 兜底：若截断后过短（论文无显式章节标题），保留全文
    if len(body) < 800:
        body = full
    return body


def parse_models():
    """从 index.html 解析 KB.models，返回 [(id, pdf_basename_or_None)]"""
    html = open(os.path.join(ROOT, "index.html"), encoding="utf-8").read()
    kb_start = html.find("const KB =")
    mpos = html.find("models:", kb_start)
    if mpos < 0:
        raise SystemExit("未在 index.html 找到 models:")
    br = html.find("[", mpos)
    if br < 0:
        raise SystemExit("未在 index.html 找到 models 数组")
    arr = html[br + 1:]
    depth, j = 1, 0
    while j < len(arr):
        c = arr[j]
        if c == "[":
            depth += 1
        elif c == "]":
            depth -= 1
            if depth == 0:
                break
        j += 1
    arr = arr[:j]

    def split_objs(s):
        objs, depth, cur, started = [], 0, "", False
        for c in s:
            if c == "{":
                depth += 1; started = True; cur += c
            elif c == "}":
                depth -= 1; cur += c
                if depth == 0 and started:
                    objs.append(cur); cur = ""; started = False
            elif started:
                cur += c
        return objs

    res = []
    for o in split_objs(arr):
        mid = re.search(r'id:\s*"([^"]*)"', o)
        if not mid:
            continue
        mp = re.search(r'pdf_local:\s*"([^"]*)"', o)
        base = os.path.splitext(os.path.basename(mp.group(1)))[0] if mp else None
        res.append((mid.group(1), base))
    return res


def main():
    models = parse_models()
    if not models:
        raise SystemExit("未能从 index.html 解析出 models")
    done = 0
    for mid, base in models:
        if not base:
            continue  # 闭源模型无本地 PDF，走 build_derived.py
        src = os.path.join(FULL, base + ".txt")
        if not os.path.exists(src):
            print(f"  ! 缺全文 {base}.txt（先跑 extract.py）: {mid}")
            continue
        full = open(src, encoding="utf-8", errors="ignore").read()
        open(os.path.join(OUT, mid + ".txt"), "w", encoding="utf-8").write(strip_references(full))
        done += 1
    print(f"结构化摘要完成：{done} 个模型 → {OUT}")


if __name__ == "__main__":
    main()
