#!/usr/bin/env python3
"""Rasterize the Alfred brand icons (single-path SVGs) via macOS qlmanage,
then recolor them to the brand tints by keeping the rendered alpha and
swapping RGB. Autocrop to the glyph bbox so sizing is predictable in PPTX."""
import os, subprocess, tempfile, json
from PIL import Image
import numpy as np

SRC = "/Users/aryaraghav/alfredai/designsystem/assets/icons"
OUT = os.path.join(os.path.dirname(__file__), "assets", "icons")
os.makedirs(OUT, exist_ok=True)

ICONS = ["alert-warning", "web-clarity", "integration-success", "audit-log",
         "demo-play", "web-stack-connected", "trend-up", "channel-mix",
         "mql", "budget", "refresh"]
TINTS = {"orange": (255, 132, 49), "peri": (123, 123, 245), "white": (255, 255, 255)}

manifest = {}
with tempfile.TemporaryDirectory() as tmp:
    for name in ICONS:
        subprocess.run(["qlmanage", "-t", "-s", "512", "-o", tmp,
                        os.path.join(SRC, name + ".svg")],
                       check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        im = Image.open(os.path.join(tmp, name + ".svg.png")).convert("RGBA")
        arr = np.array(im).astype(float)
        alpha = arr[:, :, 3]
        if alpha.min() < 250:
            # renderer gave real transparency: glyph = opaque region
            mask = alpha
        else:
            # opaque white bg, dark glyph: mask = darkness, weighted by opacity
            lum = 0.299 * arr[:, :, 0] + 0.587 * arr[:, :, 1] + 0.114 * arr[:, :, 2]
            mask = (255.0 - lum)
        mask = np.clip(mask, 0, 255).astype(np.uint8)
        bbox = Image.fromarray(mask).getbbox()
        if not bbox:
            print("WARN empty:", name); continue
        mask = mask[bbox[1]:bbox[3], bbox[0]:bbox[2]]
        h, w = mask.shape
        manifest[name] = {"w": w, "h": h}
        for tname, (r, g, b) in TINTS.items():
            out = np.zeros((h, w, 4), dtype=np.uint8)
            out[:, :, 0] = r; out[:, :, 1] = g; out[:, :, 2] = b
            out[:, :, 3] = mask
            Image.fromarray(out).save(os.path.join(OUT, f"{name}-{tname}.png"))

with open(os.path.join(os.path.dirname(__file__), "icon-manifest.json"), "w") as f:
    json.dump(manifest, f, indent=2)
print("rendered", len(manifest), "icons x", len(TINTS), "tints")
print("aspect samples:", {k: round(v["w"]/v["h"], 2) for k, v in list(manifest.items())[:4]})
