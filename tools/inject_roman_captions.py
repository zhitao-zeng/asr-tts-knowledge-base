#!/usr/bin/env python3
"""
inject_roman_captions.py — 给 IEEE 风格罗马数字表格（TABLE I/II/III…）注入 caption 锚点

背景：CAPTION_RE 只认 "Table 1:" 阿拉伯编号，HuBERT/ZONOS2 这类 "TABLE I:" 罗马数字
caption 在抽取层里成了正文句子，表格重建（extract_tables.py）没有锚点可用。
本脚本：
  1. 在 PDF 里定位 "TABLE <roman>[：.]…" caption（页码 + 全文）
  2. 注入 .cache/papers/<id>.json：新增 table_caption 块（id=tab-<roman>，按页序插入）
  3. 从正文段落里删掉同文重复句（未被讲解锚定的才删）
  4. 写入中文表注（CAPTION_ZH 表）
用法：python3 tools/inject_roman_captions.py
"""
import json
import re
from pathlib import Path

import fitz

ROOT = Path(__file__).resolve().parent.parent

ROMAN_CAP_RE = re.compile(r"^TABLE\s+([IVXLC]+)\s*[:.]\s*(.+)")

# 手工中文表注（key: <arxiv>|<TABLE 编号>）
CAPTION_ZH = {
    "2106.07447|I": "表 I：BASE、LARGE 与 X-LARGE HuBERT 模型的架构汇总。",
    "2106.07447|II": "表 II：低资源设置（10 分钟、1 小时、10 小时、100 小时标注数据）下的结果与文献对比。",
    "2106.07447|III": "表 III：使用全部 960 小时 LibriSpeech 标注数据的高资源设置下与文献的对比。",
    "2106.07447|IV": "表 IV：k-means 作为无监督单元发现算法在不同特征、聚类数与训练规模下的稳定性。",
    "2106.07447|V": "表 V：训练目标与聚类质量对性能的影响。",
    "2106.07447|VI": "表 VI：k-means 与 product k-means 的聚类集成。",
    "2106.07447|VII": "表 VII：改变 HuBERT 预训练步数的影响。p 取 6.5%。",
    "2606.24320|I": "表 I：G2P 预处理流水线的代表性静默失败案例。",
    "2606.24320|II": "表 II：Seed-TTS-Eval、CV3-Eval、MiniMax 多语测试集（MiniMax-ML）与本文 ZTTS1-Eval 的对比。",
    "2606.24320|III": "表 III：ZTTS1-Eval Clean 零样本结果，按开源/闭源模型分段的 WER、MSR-UTMOS 与说话人相似度。",
    "2606.24320|IV": "表 IV：ZTTS1-Eval 实景（in-the-wild）零样本结果，按开源/闭源模型分段的 WER、MSR-UTMOS 与说话人相似度。",
    "2606.24320|V": "表 V：ZONOS2 8B 配置。",
    "2606.24320|VI": "表 VI：ZTTS1-Eval ITW 语种覆盖统计。",
    "2606.24320|VII": "表 VII：ZONOS2 在 CosyVoice 3 Eval 与 Seed-TTS-Eval 基准上按任务分组的说话人相似度、DNSMOS、WER 与情绪准确率评测结果。",
}

PAPERS = ["2106.07447", "2606.24320"]


def find_roman_captions(doc):
    """返回 [(page_no_1based, roman, full_text)]"""
    out = []
    for pno in range(doc.page_count):
        for b in doc[pno].get_text("dict")["blocks"]:
            if b["type"] != 0:
                continue
            lines = b["lines"]
            for i, l in enumerate(lines):
                t = "".join(s["text"] for s in l["spans"]).strip()
                m = ROMAN_CAP_RE.match(t)
                if not m:
                    continue
                # 拼后续行直到句号结尾（caption 常跨行）
                parts = [t]
                for l2 in lines[i + 1:i + 4]:
                    t2 = "".join(s["text"] for s in l2["spans"]).strip()
                    parts.append(t2)
                    if t2.endswith("."):
                        break
                full = " ".join(parts)
                full = re.sub(r"\s+", " ", full).strip()
                out.append((pno + 1, m.group(1), full))
    return out


def main():
    for pid in PAPERS:
        jf = ROOT / ".cache" / "papers" / f"{pid}.json"
        d = json.load(open(jf, encoding="utf-8"))
        doc = fitz.open(str(ROOT / "papers" / f"{pid}.pdf"))
        caps = find_roman_captions(doc)
        if not caps:
            print(f"{pid}: 未发现罗马数字表 caption")
            continue
        # 已有 caption 锚点（防重跑重复注入）
        existing = {b["id"] for s in d["sections"] for b in s["blocks"]}
        # 全部句子 id → （讲解锚点保护：不删被锚定的重复句）
        ann_sids = set()
        ann_path = ROOT / ".cache" / "papers" / "zh" / pid / "annotations.json"
        if ann_path.exists():
            for a in json.load(open(ann_path, encoding="utf-8")):
                if a.get("anchor", {}).get("sentence_id"):
                    ann_sids.add(a["anchor"]["sentence_id"])
        added = removed = 0
        for page_no, roman, full in caps:
            bid = f"tab-{roman}"
            if bid in existing:
                continue
            block = {"id": bid, "type": "table_caption", "page": page_no,
                     "text": full, "sentences": []}
            # 目标 section：最后一个 page <= 该页的 section
            target = None
            for s in d["sections"]:
                if s["page"] <= page_no:
                    target = s
            if target is None:
                target = d["sections"][0]
            # 按页插入：第一个 page > cap 页的块之前
            pos = len(target["blocks"])
            for i, b in enumerate(target["blocks"]):
                if b["page"] > page_no:
                    pos = i
                    break
            target["blocks"].insert(pos, block)
            existing.add(bid)
            added += 1
            # 删同文重复句（正文里被当句子的 caption 文本；被讲解锚定的不删）
            head = full[:45]
            for s in d["sections"]:
                for b in s["blocks"]:
                    if b["type"] != "paragraph":
                        continue
                    keep = []
                    for x in b.get("sentences", []):
                        if (x["text"].startswith(f"TABLE {roman}") or head in x["text"]) \
                                and x["id"] not in ann_sids and x["id"] != bid:
                            removed += 1
                            continue
                        keep.append(x)
                    b["sentences"] = keep
        json.dump(d, open(jf, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
        # zh 片段：caption 中文写入对应 section 的 blocks
        for page_no, roman, full in caps:
            zh = CAPTION_ZH.get(f"{pid}|{roman}")
            if not zh:
                continue
            # caption 注入的 section
            target = None
            for s in d["sections"]:
                if s["page"] <= page_no:
                    target = s
            fp = ROOT / ".cache" / "papers" / "zh" / pid / f"{target['id']}.json"
            if fp.exists():
                frag = json.load(open(fp, encoding="utf-8"))
                frag.setdefault("blocks", {})[f"tab-{roman}"] = zh
                json.dump(frag, open(fp, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
        print(f"{pid}: 注入 {added} 个表 caption，删除重复句 {removed} 条")


if __name__ == "__main__":
    main()
