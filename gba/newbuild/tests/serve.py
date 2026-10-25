#!/usr/bin/env python3
"""Serve a folder the way Netlify serves dist/ with Pretty URLs on (ticket 12):
/start-here answers from start-here.html, /news-and-events/12 from
news-and-events/12.html, and anything else that matches no file gets 404.html
with status 404. For the fidelity check (tests/fidelity.py) on the build and on
the replica (tests/build_replica.py); python3 -m http.server cannot map the bare
slugs. Map tickets 11 and 16.

Usage (from gba/newbuild):  .venv/bin/python tests/serve.py 8400 dist
"""
import sys
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlsplit


class PrettyHandler(SimpleHTTPRequestHandler):
    def send_head(self):
        root = Path(self.directory)
        path = unquote(urlsplit(self.path).path)
        target = root / path.lstrip("/")
        if path != "/" and not target.is_file() and (root / (path.strip("/") + ".html")).is_file():
            self.path = path.rstrip("/") + ".html"
        elif not target.exists() and (root / "404.html").is_file():
            body = (root / "404.html").read_bytes()
            self.send_response(404)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return None
        return super().send_head()

    def log_message(self, *args):
        pass


def main():
    port, folder = int(sys.argv[1]), sys.argv[2]
    server = ThreadingHTTPServer(("127.0.0.1", port), partial(PrettyHandler, directory=folder))
    print(f"serving {folder} on http://127.0.0.1:{port}")
    server.serve_forever()


if __name__ == "__main__":
    main()
