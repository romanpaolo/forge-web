#!/usr/bin/env python3
"""Generate src/app/favicon.ico from the canonical Forge hex mark.

The geometry below is lifted verbatim from public/favicon.svg so the .ico and
the .svg can never drift into being two different marks. If the brand mark
changes, change it in favicon.svg and re-run this.

    python3 scripts/generate-favicon.py

Requires Pillow (pip install Pillow). Writes src/app/favicon.ico.

Why this exists: Pillow's own ICO writer collapses a multi-size save down to a
single entry, and it downsamples one master image rather than letting each size
carry its own stroke weight. A 1.2/32 stroke scaled to 16px lands at 0.6px and
silts up into an unreadable blob, so each size is rendered independently with
the stroke floored, and the ICO container is assembled by hand.
"""

import io
import struct
from pathlib import Path

from PIL import Image, ImageDraw

# From public/favicon.svg, viewBox "0 0 32 32":
#   <circle cx="16" cy="16" r="16" fill="#050507"/>
#   <path d="M16 6L24.66 11.12V21.88L16 27L7.34 21.88V11.12L16 6Z"
#         stroke="#F8FAFC" stroke-width="1.2" stroke-linejoin="round"/>
HEX = [(16, 6), (24.66, 11.12), (24.66, 21.88), (16, 27), (7.34, 21.88), (7.34, 11.12)]
GROUND = (5, 5, 7, 255)       # #050507
STROKE = (248, 250, 252, 255)  # #F8FAFC
STROKE_W = 1.2                 # in viewBox units
MIN_STROKE_PX = 1.5            # floor, so the mark still reads at 16px
SUPERSAMPLE = 8
SIZES = [16, 32, 48, 64, 128, 256]


def render(size: int) -> Image.Image:
    """Render the mark at `size` px, supersampled then downsampled."""
    s = size * SUPERSAMPLE
    img = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    draw.ellipse([0, 0, s - 1, s - 1], fill=GROUND)

    scale = s / 32.0
    pts = [(x * scale, y * scale) for x, y in HEX]
    width = max(MIN_STROKE_PX, size * STROKE_W / 32) * SUPERSAMPLE
    draw.line(pts + [pts[0]], fill=STROKE, width=int(round(width)), joint="curve")

    # Emulate stroke-linejoin="round". PIL's joint="curve" leaves the corners
    # of a closed polyline slightly clipped.
    r = width / 2.0
    for x, y in pts:
        draw.ellipse([x - r, y - r, x + r, y + r], fill=STROKE)

    return img.resize((size, size), Image.LANCZOS)


def build_ico(sizes: list[int]) -> bytes:
    """Assemble a PNG-compressed ICO. Pillow cannot emit one per-size."""
    blobs = []
    for size in sizes:
        buf = io.BytesIO()
        render(size).save(buf, format="PNG", optimize=True)
        blobs.append(buf.getvalue())

    out = struct.pack("<HHH", 0, 1, len(sizes))  # ICONDIR
    offset = 6 + 16 * len(sizes)
    for size, blob in zip(sizes, blobs):  # ICONDIRENTRY, 0 means 256
        dim = size if size < 256 else 0
        out += struct.pack("<BBBBHHII", dim, dim, 0, 0, 1, 32, len(blob), offset)
        offset += len(blob)
    return out + b"".join(blobs)


if __name__ == "__main__":
    target = Path(__file__).resolve().parent.parent / "src" / "app" / "favicon.ico"
    target.write_bytes(build_ico(SIZES))
    print(f"wrote {target} ({', '.join(f'{s}x{s}' for s in SIZES)})")
