#!/usr/bin/env python3
"""Build a local replica of the live pages the fidelity check covers (map tickets 10 and 11).

The live host serves a captcha after about one page load (Oct 24), so the
reference side of tests/fidelity.py is the harvested pages served from
localhost instead (the homepage since ticket 10, every page in fidelity.PAGES since 11): host URLs made root-relative, the gtag, chat and reCAPTCHA
tags removed (third parties the check blocks anyway), the live site's own
assets from public/ and the five jQuery plugins plus fancybox's CSS restored
from commit 9721484, where they were last in the tree. Owl, jQuery and Bootstrap
5.0.2 still load from cdnjs and jsdelivr, as live. Ticket 09 matched the build
against this replica (390 px pixel-identical).

Usage (from gba/newbuild):
  .venv/bin/python tests/build_replica.py        # writes tests/.replica/ (git-ignored)
  .venv/bin/python tests/serve.py 8401 tests/.replica
"""
import re
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "tests" / ".replica"
HARVEST = ROOT / "harvest" / "2026-10-24" / "pages"
# The staging host served the 564 article banners live; public/ holds the file at the same path (ticket 06).
HOSTS = ["https://gatewaybusinessadvisors.com/", "https://www.gatewaybusinessadvisors.com/", "https://gba.consultprdevsites-18.com/"]
RESTORE_COMMIT = "9721484"
RESTORE = [
    "public/js/jquery.fancybox.min.js",
    "public/js/jquery.flexslider-2.7.2.js",
    "public/js/jquery.metadata.js",
    "public/js/jquery.validate.js",
    "public/js/mobimenu.js",
    "public/css/jquery.fancybox.min.css",
]
# Tags removed whole: analytics, the chat widget, reCAPTCHA.
DROP = [
    r'<script async src="https://www\.googletagmanager\.com/gtag/js[^"]*"></script>',
    r"<script>\s*window\.dataLayer.*?</script>",
    r'<script async src="https://meclabsai\.com/embed/chat\.js[^"]*"></script>',
    r"<script src=['\"]https://www\.google\.com/recaptcha/api\.js[^'\"]*['\"][^>]*></script>",
]
# The live inline scripts call grecaptcha.ready(); with the API gone, a stub keeps them from throwing.
STUB = "<script>window.grecaptcha={ready(){},execute(){return Promise.resolve('')},render(){}};</script>"


def main():
    if OUT.exists():
        shutil.rmtree(OUT)
    shutil.copytree(ROOT / "public", OUT, ignore=shutil.ignore_patterns("vendor"))
    for rel in RESTORE:
        blob = subprocess.run(["git", "show", f"{RESTORE_COMMIT}:gba/newbuild/{rel}"],
                              cwd=ROOT, check=True, capture_output=True).stdout
        dest = OUT / rel.removeprefix("public/")
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_bytes(blob)

    sys.path.insert(0, str(ROOT / "tests"))
    from fidelity import PAGES
    for key, path in PAGES.items():
        slug = "home" if path == "/" else path.strip("/")
        html = (HARVEST / f"{slug}.html").read_text(encoding="utf-8")
        for pattern in DROP:
            html, n = re.subn(pattern, "", html, flags=re.S)
            if not n and slug == "home":
                raise SystemExit(f"pattern matched nothing on the homepage: {pattern}")
        for host in HOSTS:
            html = html.replace(host, "/")
        html = html.replace("<head>", "<head>\n" + STUB, 1)
        (OUT / ("index.html" if path == "/" else f"{slug}.html")).write_text(html, encoding="utf-8")
    print(f"replica of {len(PAGES)} pages written to {OUT}")


if __name__ == "__main__":
    main()
