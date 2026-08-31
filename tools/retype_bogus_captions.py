#!/usr/bin/env python3
"""
retype_bogus_captions.py — 把误判为 figure/table caption 的正文引用块改回段落

背景：旧版 CAPTION_RE 把 "Figure 2 shows/presents…"（正文引用）误判为图注。
本脚本对已抽取的 .cache/papers/<id>.json 做原位修正（避免整篇重抽导致 id 漂移）：
  - 块 type: figure_caption/table_caption → paragraph
  - 块 id 不变；生成单句 sentences=[{id: <bid>-s1, text: <原文>}]
  - zh 片段：blocks[bid] → sentences[<bid>-s1]（同 section 的片段文件内移动）
用法：python3 tools/retype_bogus_captions.py
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CAPTION_OK = re.compile(r"^(Figure|Table|Fig\.?|TABLE|FIGURE)\s*\d+[A-Z]?\s*[:.;]", re.I)
CAPTION_VERB = re.compile(r"^(Figure|Table|Fig\.?)\s*\d+[A-Z]?\s+(shows?|presents?|plots?|depicts?|illustrates?|demonstrates?|summarizes?|reports?|compares?|lists?|gives?|provides?|describes?|displays?|visualizes?)\b", re.I)


def is_bogus(text):
    """是正文引用而非真 caption：编号后无标点，或紧跟动词。"""
    if CAPTION_OK.match(text) and not CAPTION_VERB.match(text):
        return False
    return True


def main():
    total = 0
    for jf in sorted((ROOT / ".cache" / "papers").glob("*.json")):
        pid = jf.stem
        d = json.load(open(jf, encoding="utf-8"))
        changed = []
        for s in d["sections"]:
            for b in s["blocks"]:
                if b["type"] in ("figure_caption", "table_caption") and is_bogus(b["text"]):
                    b["type"] = "paragraph"
                    b["sentences"] = [{"id": b["id"] + "-s1", "text": b["text"]}]
                    changed.append((s["id"], b))
        if not changed:
            continue
        json.dump(d, open(jf, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
        # 迁移 zh 片段：blocks[bid] → sentences[bid-s1]
        moved = 0
        for sec_id, b in changed:
            fp = ROOT / ".cache" / "papers" / "zh" / pid / f"{sec_id}.json"
            if not fp.exists():
                continue
            frag = json.load(open(fp, encoding="utf-8"))
            zh = frag.get("blocks", {}).pop(b["id"], None)
            if zh:
                frag.setdefault("sentences", {})[b["id"] + "-s1"] = zh
                moved += 1
            json.dump(frag, open(fp, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
        total += len(changed)
        print(f"{pid}: 改回段落 {len(changed)} 块（zh 迁移 {moved}）")
    print(f"\n共修正 {total} 个伪 caption 块")


if __name__ == "__main__":
    main()
