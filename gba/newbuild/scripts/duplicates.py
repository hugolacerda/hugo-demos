#!/usr/bin/env python3
"""Write src/data/duplicates.json: for each near-duplicate article group, which
copy is canonical (map ticket 15).

Groups: the 43 near-duplicate pairs of ticket 07 (body text at least 90 % alike,
harvest/2026-10-24/review-lists.json), plus articles that share a title and
whose body text is at least 90 % alike (two pairs 07's slug matching missed,
found at 15: /buyer-may-really-looking, /price-terms-the-structure-deal), joined
where they share an article: 43 groups, one of three. Both copies stay live until Gary decides at ticket 17;
meanwhile every copy but one names that one as its canonical and is left out of
the sitemap (Hugo, 2026-10-25: "canonical now, older slug wins"). Older means
first captured by the Wayback Machine (GBA-site-audits/2026-10-06/evidence/
wayback_cdx_all.json, the Oct 6 audit's CDX pull, to the second; no ties).
Both inputs are local working files, so the output is committed.

Run: .venv/bin/python -I scripts/duplicates.py
"""
import difflib
import html
import json
import re
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PAIRS = ROOT / "harvest" / "2026-10-24" / "review-lists.json"
CDX = ROOT.parent / "GBA-site-audits" / "2026-10-06" / "evidence" / "wayback_cdx_all.json"
OUT = ROOT / "src" / "data" / "duplicates.json"


def main():
    pairs = json.loads(PAIRS.read_text())["pairs"]
    first = {}
    for original, _status, _mime, ts in json.loads(CDX.read_text())[1:]:
        path = re.sub(r"^https?://(www\.)?gatewaybusinessadvisors\.com", "", original.split("?")[0]).rstrip("/") or "/"
        path = re.sub(r"^/news-and-events/(?!\d+$)", "/", path)  # the live 301s
        first[path] = min(first.get(path, ts), ts)
    parent = {}

    def find(x):
        parent.setdefault(x, x)
        while parent[x] != x:
            x = parent[x]
        return x

    edges = [(p["a"], p["b"]) for p in pairs]
    by_title = defaultdict(list)
    for v in json.loads((ROOT / "src" / "content" / "index.json").read_text()).values():
        if v["kind"] == "article":
            by_title[v["title"]].append(v["path"])

    def body(path):
        raw = (ROOT / "src" / "content" / "articles" / f"{path.strip('/')}.html").read_text().split("\n---\n", 1)[1]
        return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", raw))).strip()

    known = {frozenset(e) for e in edges}
    for paths in by_title.values():
        for i, a in enumerate(paths):
            for b in paths[i + 1:]:
                if frozenset((a, b)) not in known and difflib.SequenceMatcher(None, body(a), body(b)).quick_ratio() >= 0.9:
                    edges.append((a, b))
                    print(f"added: {a} ~ {b}")
    for a, b in edges:
        parent[find(a)] = find(b)
    groups = defaultdict(list)
    for x in list(parent):
        groups[find(x)].append(x)
    out = {}
    for members in groups.values():
        ranked = sorted(members, key=lambda s: first[s])
        if first[ranked[0]] == first[ranked[1]]:
            raise SystemExit(f"tie: {ranked}")
        for dup in ranked[1:]:
            out[dup] = {"canonical": ranked[0], "first_seen": first[dup][:8], "canonical_first_seen": first[ranked[0]][:8]}
    OUT.write_text(json.dumps(dict(sorted(out.items())), indent=1) + "\n")
    print(f"{len(groups)} groups, {len(out)} duplicates written to {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
