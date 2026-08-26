#!/usr/bin/env python3
"""
build_derived.py — 为闭源/未开源模型构建"派生锚点"文本

依赖：无（纯标准库）
用法：python3 tools/build_derived.py

输入：index.html 中 KB.models 的 architecture/training/results/limitations 字段
      （闭源模型无本地 PDF，其"推导注"的论据来自知识库已有 DEEP 文本与官方发布）
输出：.cache/src_derived/<model_id>.txt

说明：重写 agent 对闭源模型撰写"推导注"（q 以"据公开信息/架构可知的推导论点："
开头）时，以这些锚点作为唯一论据来源，避免凭空编造。
"""
import os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, ".cache", "src_derived")
os.makedirs(OUT, exist_ok=True)


def parse_models_with_deep():
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

    def g(o, name):
        m = re.search(name + r':\s*("(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`|true|false|null)', o)
        if not m:
            return ""
        v = m.group(1)
        if v in ("true", "false", "null"):
            return ""
        return v.strip('"`')

    res = []
    for o in split_objs(arr):
        mid = re.search(r'id:\s*"([^"]*)"', o)
        if not mid:
            continue
        res.append((mid.group(1), g(o, "architecture"), g(o, "training"),
                    g(o, "results"), g(o, "limitations")))
    return res


def main():
    recs = parse_models_with_deep()
    n = 0
    for mid, arch, train, res, lim in recs:
        # 仅闭源（无 architecture 正文或 architecture 字段为空）→ 仍输出以便 agent 判断
        text = f"# {mid}\n\n## Architecture\n{arch or '（知识库未收录架构细节，以官方发布为准）'}\n\n" \
               f"## Training\n{train or '（知识库未收录训练细节）'}\n\n" \
               f"## Results\n{res or '（知识库未收录结果细节）'}\n\n" \
               f"## Limitations\n{lim or '（知识库未收录局限细节）'}\n"
        open(os.path.join(OUT, mid + ".txt"), "w", encoding="utf-8").write(text)
        n += 1
    print(f"派生锚点完成：{n} 个模型 → {OUT}")


if __name__ == "__main__":
    main()
