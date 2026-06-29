#!/usr/bin/env python3
"""Rasterize the Alfred logo lockups to transparent PNGs.
qlmanage only renders on opaque white and scales modified SVGs oddly, so we
rebuild each logo on a SQUARE canvas (logo centred, full-canvas bg rect) and
render it on both white and black, then recover true alpha + colour:
  alpha = 255 - (white_render - black_render);  colour = black_render / alpha"""
import os, subprocess, tempfile, re
from PIL import Image
import numpy as np

SRC = "/Users/aryaraghav/alfredai/designsystem/assets/logos"
OUT = os.path.join(os.path.dirname(__file__), "assets")
LOGOS = {"alfred-logo-color": "alfred-logo-primary.svg",
         "alfred-logo-white": "alfred-logo-white.svg"}
VW, VH = 1817, 438
SIDE = 1817
DY = (SIDE - VH) / 2.0


def square_svg(svg_path, bg_hex):
    text = open(svg_path).read()
    open_end = text.find(">") + 1
    inner = text[open_end:text.rfind("</svg>")]
    head = (f'<svg width="{SIDE}" height="{SIDE}" viewBox="0 0 {SIDE} {SIDE}" '
            f'fill="none" xmlns="http://www.w3.org/2000/svg">')
    rect = f'<rect x="0" y="0" width="{SIDE}" height="{SIDE}" fill="{bg_hex}"/>'
    return f'{head}{rect}<g transform="translate(0,{DY})">{inner}</g></svg>'


def render(svg_text, tmp, tag):
    p = os.path.join(tmp, f"{tag}.svg")
    open(p, "w").write(svg_text)
    subprocess.run(["qlmanage", "-t", "-s", "1800", "-o", tmp, p],
                   check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    return np.array(Image.open(os.path.join(tmp, f"{tag}.svg.png")).convert("RGB")).astype(float)


with tempfile.TemporaryDirectory() as tmp:
    for out_name, svg in LOGOS.items():
        path = os.path.join(SRC, svg)
        W = render(square_svg(path, "#FFFFFF"), tmp, out_name + "_w")
        B = render(square_svg(path, "#000000"), tmp, out_name + "_b")
        alpha = np.clip(255.0 - (W - B).mean(axis=2), 0, 255)
        a3 = np.clip(alpha[:, :, None] / 255.0, 1e-6, 1)
        color = np.clip(B / a3, 0, 255)
        rgba = np.dstack([color, alpha]).astype(np.uint8)
        im = Image.fromarray(rgba).crop(Image.fromarray(alpha.astype(np.uint8)).getbbox())
        im.save(os.path.join(OUT, out_name + ".png"))
        print(out_name, "->", im.size, "aspect", round(im.size[0] / im.size[1], 2))
