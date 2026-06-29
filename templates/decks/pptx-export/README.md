# Alfred AI — Platform overview · PPTX export

An **editable** PowerPoint export of the platform overview deck
(`../platform-alfred-overview.html`). Every headline, paragraph, table cell and
metric is a native PowerPoint text box — not a flattened image — so you can edit
the deck directly in PowerPoint, Keynote or Google Slides.

Output: **`../Alfred Corporate Deck.pptx`** (14 slides, 16:9) — matches the finalised outline
(Cover → The Problem → The Cost → What Alfred Is → Architecture (Alfred Core + Modules) →
The Modules → The Organisational Brain → The Moat → Proof → Why Alfred Wins → Integrations →
Roadmap → Get Started → Closing).

## Fonts — mapped to Google Fonts (so it's editable anywhere)

The brand fonts (Clash Display + Satoshi) are licensed and not on Google Fonts,
so the export substitutes the closest free Google Fonts. Install these two (or
just open in Google Slides, where they're built in) for the deck to render as
designed:

| Brand font (HTML deck) | PPTX uses (Google Fonts) | Used for |
|---|---|---|
| Clash Display | **Bricolage Grotesque** | headlines, KPI numbers, eyebrows-of-display |
| Satoshi | **Plus Jakarta Sans** | body, UI, tables, captions |

Install on macOS: download both families from
[fonts.google.com](https://fonts.google.com/specimen/Bricolage+Grotesque) and
[Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans), then double-click → *Install*.
Without them, PowerPoint falls back to a default sans (layout still holds).
To switch fonts, edit `DISPLAY` / `SANS` at the top of `build_pptx.js` and re-run.

> Gradients, the ambient glows and the brand logo/icons are embedded as images
> (they aren't editable text anyway); all copy is live text.

## What's here

| File | Purpose |
|---|---|
| `build_pptx.js` | Builds the .pptx with [PptxGenJS](https://gitbrent.github.io/PptxGenJS/) — native shapes + text. |
| `gen_backgrounds.py` | Renders the cover wash, brand gradient and ink-glow backgrounds (Pillow + numpy). |
| `gen_icons.py` | Rasterizes + brand-tints the line icons from `../../../assets/icons` (qlmanage + Pillow). |
| `gen_logos.py` | Rasterizes the Alfred logo lockups to transparent PNGs (two-background alpha recovery). |
| `icon-manifest.json` | Icon aspect ratios, consumed by `build_pptx.js`. |
| `assets/` | Generated backgrounds, tinted icons and logos embedded into the deck. |

## Regenerate

The committed `assets/` already let you rebuild the deck immediately:

```bash
npm install pptxgenjs        # one-time
node build_pptx.js           # -> ../Alfred-AI-Platform-Overview.pptx
```

To regenerate the image assets from source (macOS — uses `qlmanage`; needs
`python3 -m pip install pillow numpy`):

```bash
python3 gen_backgrounds.py
python3 gen_icons.py
python3 gen_logos.py
```

## Editing the content

Edit the slide builders in `build_pptx.js` (one IIFE per slide, mirroring the
slides in `../platform-alfred-overview.html`) and re-run `node build_pptx.js`.
Keep the two deliverables in sync — the HTML deck is the design source of truth;
this script reproduces it as editable PowerPoint.
