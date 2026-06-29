#!/usr/bin/env python3
"""Render Alfred brand gradient backgrounds for the PPTX export.
These are decorative (no text), so rasterizing them keeps the slides editable
while preserving the signature periwinkle->orange gradient and ambient glows.
16:9 at 2x: 2560 x 1440."""
import numpy as np
from PIL import Image
import os

W, H = 2560, 1440
OUT = os.path.join(os.path.dirname(__file__), "assets")
os.makedirs(OUT, exist_ok=True)

# pixel coordinate grids (normalized 0..1)
xs = np.linspace(0, 1, W)[None, :].repeat(H, axis=0)
ys = np.linspace(0, 1, H)[:, None].repeat(W, axis=1)


def hex_rgb(h):
    h = h.lstrip("#")
    return np.array([int(h[i:i+2], 16) for i in (0, 2, 4)], dtype=float)


def radial_alpha(cx, cy, rx, ry, fade_stop):
    """CSS radial-gradient alpha multiplier: 1 at center -> 0 at fade_stop*edge."""
    nx = (xs - cx) / rx
    ny = (ys - cy) / ry
    d = np.sqrt(nx * nx + ny * ny)
    t = np.clip(d / fade_stop, 0.0, 1.0)
    return (1.0 - t)


def over(base, color, alpha):
    """Composite a flat color over base with per-pixel alpha (HxWx3 base)."""
    a = alpha[:, :, None]
    return base * (1 - a) + color[None, None, :] * a


# ---------- 1. cover wash (white + soft orange + soft periwinkle) ----------
base = np.ones((H, W, 3)) * 255.0
base = over(base, hex_rgb("#FFB07B"), 0.30 * radial_alpha(0.92, 0.96, 0.70, 0.80, 0.60))
base = over(base, hex_rgb("#A7A7FC"), 0.18 * radial_alpha(0.04, 0.04, 0.60, 0.70, 0.60))
Image.fromarray(base.clip(0, 255).astype("uint8")).save(os.path.join(OUT, "bg-cover.png"))

# ---------- 2. brand gradient (linear 108deg, 4 stops) ----------
# CSS angle 108deg -> direction (sin, -cos); project pixel onto gradient line.
theta = np.deg2rad(108)
dx, dy = np.sin(theta), -np.cos(theta)
px = xs * W
py = ys * H
cx, cy = W / 2.0, H / 2.0
length = abs(W * np.sin(theta)) + abs(H * np.cos(theta))
t = 0.5 + ((px - cx) * dx + (py - cy) * dy) / length
t = np.clip(t, 0.0, 1.0)
stops = [0.0, 0.34, 0.72, 1.0]
cols = [hex_rgb("#FF8431"), hex_rgb("#FB7C4A"), hex_rgb("#C99BD2"), hex_rgb("#A7A7FC")]
grad = np.zeros((H, W, 3))
for ch in range(3):
    grad[:, :, ch] = np.interp(t, stops, [c[ch] for c in cols])
Image.fromarray(grad.clip(0, 255).astype("uint8")).save(os.path.join(OUT, "bg-grad.png"))

# ---------- 3. ink + orange glow (dark slides) ----------
base = np.ones((H, W, 3)) * hex_rgb("#02021E")[None, None, :]
base = over(base, hex_rgb("#FF8431"), 0.30 * radial_alpha(1.00, 1.00, 0.60, 0.70, 0.60))
# faint periwinkle lift top-left for depth
base = over(base, hex_rgb("#A7A7FC"), 0.07 * radial_alpha(0.02, 0.04, 0.55, 0.60, 0.60))
Image.fromarray(base.clip(0, 255).astype("uint8")).save(os.path.join(OUT, "bg-ink.png"))

# ---------- 4. canvas (subtle warm off-white, flat) ----------
Image.new("RGB", (W, H), (249, 249, 249)).save(os.path.join(OUT, "bg-canvas.png"))

print("wrote:", ", ".join(sorted(os.listdir(OUT))))
