#!/usr/bin/env python3
"""Write the site's icons from the logo (map ticket 15; the live site has none).

The mark is the logo's own: the arch and the "G" of GATEWAY, white, cut from
public/images/footer-logo.png (the white logo), on the site's navy
(rgb(0, 33, 68), the mobile banner background in custom.css). Picked over the
arch alone and the G alone at 16, 32 and 64 px (Hugo chose "an icon from the
logo", 2026-10-25).

Writes public/favicon.ico (16, 32, 48), public/favicon.png (96, rounded tile)
and public/apple-touch-icon.png (180, square: iOS rounds it itself).
Run: .venv/bin/python scripts/favicon.py
"""
from pathlib import Path

from PIL import Image, ImageDraw

PUBLIC = Path(__file__).resolve().parent.parent / "public"
NAVY = (0, 33, 68, 255)


def bbox(im):
    return im.getchannel("A").point(lambda v: 255 if v > 30 else 0).getbbox()


def mark():
    logo = Image.open(PUBLIC / "images" / "footer-logo.png").convert("RGBA")  # 900 x 306
    arch = logo.crop((0, 0, 900, 165))  # rows above the wordmark
    arch = arch.crop(bbox(arch))
    word = logo.crop((0, 165, 900, 252))
    alpha = word.getchannel("A")
    cols = [any(alpha.getpixel((x, y)) > 40 for y in range(word.height)) for x in range(word.width)]
    start = cols.index(True)
    end = start
    while end < len(cols) and cols[end]:
        end += 1
    g = word.crop((start, 0, end, word.height))
    g = g.crop(bbox(g))
    width = int(g.width * 2.6)
    arch = arch.resize((width, int(arch.height * width / arch.width)), Image.LANCZOS)
    overlap = int(g.height * 0.15)
    out = Image.new("RGBA", (width, arch.height + g.height - overlap), (0, 0, 0, 0))
    out.paste(arch, (0, 0), arch)
    out.paste(g, ((width - g.width) // 2, arch.height - overlap), g)
    return out


def tile(m, size, radius):
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    ImageDraw.Draw(canvas).rounded_rectangle((0, 0, size - 1, size - 1), radius=int(size * radius), fill=NAVY)
    scale = size * 0.78 / max(m.size)
    m = m.resize((max(1, int(m.width * scale)), max(1, int(m.height * scale))), Image.LANCZOS)
    canvas.paste(m, ((size - m.width) // 2, (size - m.height) // 2), m)
    return canvas


def main():
    m = mark()
    big = tile(m, 512, 0.18)
    big.save(PUBLIC / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    big.resize((96, 96), Image.LANCZOS).save(PUBLIC / "favicon.png", optimize=True)
    tile(m, 180, 0).convert("RGB").save(PUBLIC / "apple-touch-icon.png", optimize=True)
    print("favicon.ico, favicon.png, apple-touch-icon.png written to public/")


if __name__ == "__main__":
    main()
