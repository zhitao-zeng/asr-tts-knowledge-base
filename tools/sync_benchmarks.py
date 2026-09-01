#!/usr/bin/env python3
"""
sync_benchmarks.py — 用重建表格网格（data/tables/*.json）回填主站榜单（kb.js BENCHMARKS）

只收高置信条目（宁缺勿滥）：
  - 表注显式提到榜单数据集关键词
  - 列名精确匹配榜单指标（WER/CER/SIM/CER↓/WER↓/SIM↑…）
  - 行首模型名能映射到 KB.models 的已知 id
  - 数值是干净的数字
  - 已存在且数值不同的：报冲突，不覆盖手工条目

用法：
  python3 tools/sync_benchmarks.py          # 只打印提案（评审）
  python3 tools/sync_benchmarks.py --apply  # 写入 kb.js
"""
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

KB = json.loads(subprocess.run(
    ["node", "-e", 'require("./data/kb.js");console.log(JSON.stringify({models:globalThis.KB.models,bench:globalThis.BENCHMARKS}))'],
    capture_output=True, text=True, cwd=ROOT).stdout)
MODELS = KB["models"]
BENCH = KB["bench"]

# 模型名 → kb id 的归一化索引
def norm(s):
    return re.sub(r"[^a-z0-9]", "", s.lower())
NAME2ID = {}
for m in MODELS:
    NAME2ID[norm(m["name"])] = m["id"]
    # 常见别名
    for alias in re.findall(r"[A-Za-z][A-Za-z0-9]*(?:[- ][A-Za-z0-9.]+)?", m["name"]):
        NAME2ID.setdefault(norm(alias), m["id"])

def model_of(text):
    """行首单元格 → kb model id（精确/前缀/包含匹配）。"""
    n = norm(re.sub(r"\s*\(.*?\)", "", text))
    if not n:
        return None
    if n in NAME2ID:
        return NAME2ID[n]
    for k, v in NAME2ID.items():
        if k and (n.startswith(k) or k.startswith(n)) and len(k) >= 4:
            return v
    return None

# 榜单 → (caption 关键词, 指标名, 指标合理范围)
BENCH_RULES = {
    "asr_aishell1":  (r"AISHELL[- ]?1|aishell1", ["CER"], (0, 100)),
    "asr_fleurs":    (r"FLEURS", ["准确率", "WER", "CER"], (0, 100)),
    "tts_seedzh_cer": (r"Seed[- ]TTS|test-zh|test-ZH", ["CER", "CER↓", "CER (%) ↓"], (0, 100)),
    "tts_seedzh_sim": (r"Seed[- ]TTS|test-zh|test-ZH", ["SIM", "SIM↑", "SIM-o ↑"], (0, 100)),
    "tts_seeden_wer": (r"Seed[- ]TTS|test-en|test-EN", ["WER", "WER↓", "WER (%) ↓"], (0, 100)),
    "tts_seeden_sim": (r"Seed[- ]TTS|test-en|test-EN", ["SIM", "SIM↑", "SIM-o ↑"], (0, 100)),
    "tts_zt1":       (r"ZTTS1-Eval", ["WER", "SIM"], (0, 100)),
    "tts_cv3":       (r"CV3-Eval|CV3", ["WER", "CER"], (0, 100)),
}
# 只有明确的结果/评测/对比表才回填（消融/推理配置表只提数据集名词，列语义对不上）
RESULT_CAP_RE = re.compile(r"result|evaluation|comparison|benchmark|performance|评测|结果|对比", re.I)
# 消融/配置/影响类表哪怕提了数据集也跳过（VoxCPM2 表 4 是 inference recipe 消融，
# 页面里还和第二张表粘连，列语义不可信）
ABLATION_CAP_RE = re.compile(r"effect of|impact of|ablation|recipe|hyperparameter|configuration|scaling|analysis", re.I)
# 指标合理值域（SIM 类按 % 制约束，过滤超参列误读）
METRIC_RANGE = {"SIM": (40, 100), "SIM-o": (40, 100), "UTMOS": (1, 5), "MOS": (1, 5)}
NUM_OK = re.compile(r"^-?[\d.,]+%?$")

# 每个榜单已有的 (model_id -> v)；无 v 的「宣称」条目视为占位，可被实测值替换
existing = {b["id"]: {e["id"]: e["v"] for e in b["entries"] if "v" in e} for b in BENCH}
claim_only = {b["id"]: {e["id"] for e in b["entries"] if "v" not in e} for b in BENCH}
existing_names = {b["id"]: b["name"] for b in BENCH}

proposals = []   # (bench_id, model_id, value, source)
conflicts = []

for jf in sorted((ROOT / "data" / "tables").glob("*.json")):
    pid = jf.stem
    grids = json.load(open(jf, encoding="utf-8"))
    # 该论文对应模型（自己的行）
    paper_models = [m for m in MODELS if m.get("reader_paper") == pid]
    own_ids = {m["id"] for m in paper_models}
    ext = json.load(open(ROOT / ".cache" / "papers" / f"{pid}.json", encoding="utf-8"))
    caps = {b["id"]: b["text"] for s in ext["sections"] for b in s["blocks"] if b["type"] == "table_caption"}
    for bid, t in grids.items():
        cap = caps.get(bid, "")
        if not RESULT_CAP_RE.search(cap) or ABLATION_CAP_RE.search(cap):
            continue  # 消融/配置表不回填榜单
        for bench_id, (ds_re, metrics, vr) in BENCH_RULES.items():
            if not re.search(ds_re, cap, re.I):
                continue
            cols = t["headers"][-1] if t["headers"] else []
            for ci, cn in enumerate(cols):
                cn_clean = cn.strip()
                if cn_clean not in metrics and not any(cn_clean.startswith(m) for m in metrics):
                    continue
                for r in t["rows"]:
                    rowname = next((c for c in r if c.strip()), "")
                    mid = model_of(rowname)
                    if not mid:
                        continue
                    if ci >= len(r):
                        continue
                    v = (r[ci] or "").strip()
                    if not NUM_OK.match(v):
                        continue
                    vnum = float(v.replace(",", "").replace("%", ""))
                    if "SIM" in cn_clean.upper() and vnum < 1.5:
                        vnum = round(vnum * 100, 1)  # 0-1 制归一化到 %
                    mrange = METRIC_RANGE.get(cn_clean) or METRIC_RANGE.get(cn_clean.rstrip("↓↑")) or vr
                    if not (mrange[0] <= vnum <= mrange[1]):
                        continue
                    # 该论文自家模型优先，但别家模型在其论文表里也可信
                    if mid in existing.get(bench_id, {}):
                        if abs(existing[bench_id][mid] - vnum) > 1e-6:
                            conflicts.append((bench_id, mid, existing[bench_id][mid], vnum, f"{pid}/{bid}"))
                        continue
                    proposals.append((bench_id, mid, vnum, f"{pid}/{tid if False else bid}", rowname))

# 去重（同榜单同模型取首次出现）
seen = set()
uniq = []
for p in proposals:
    k = (p[0], p[1])
    if k in seen:
        continue
    seen.add(k)
    uniq.append(p)

print(f"提案 {len(uniq)} 条，冲突 {len(conflicts)} 条\n")
cur = None
for bench_id, mid, v, src, rowname in sorted(uniq):
    if bench_id != cur:
        print(f"\n== {existing_names.get(bench_id, bench_id)} ==")
        cur = bench_id
    print(f"  + {mid:20s} {v:>8}   ({rowname[:24]} @ {src})")
if conflicts:
    print("\n== 冲突（不覆盖） ==")
    for bench_id, mid, old, new, src in conflicts:
        print(f"  {bench_id} {mid}: 现有 {old} vs 网格 {new} ({src})")

if "--apply" in sys.argv and uniq:
    src = open(ROOT / "data" / "kb.js", encoding="utf-8").read()
    for bench_id, mid, v, _src, rowname in uniq:
        m = re.search(r'("id": "%s",[\s\S]*?"entries": \[)([\s\S]*?)(\]\s*\})' % bench_id, src)
        if not m:
            continue
        note = f"{rowname.strip()}（{('论文重建表')}）"
        entry = f'     {{"id": "{mid}", "v": {v}, "note": "{note}"}}\n  '
        src = src[:m.start(2)] + m.group(2).rstrip() + ",\n" + entry + src[m.end(2):]
    open(ROOT / "data" / "kb.js", "w", encoding="utf-8").write(src)
    print(f"\n已写入 {len(uniq)} 条到 kb.js")
