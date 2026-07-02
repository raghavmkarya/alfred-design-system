# Social & OG image system

Every file here is a standalone HTML page at an **exact pixel size** — the page *is* the
asset. Open it, screenshot it at that size, ship the PNG. Everything links `../styles.css`
(tokens + Satoshi/Clash webfonts) and pulls logos from `../assets/logos/`, so keep the
files inside `social/` or fix the relative paths.

## Inventory

| File | Size | Use |
|---|---|---|
| `og-default.html` | 1200×630 | Site-wide OG fallback — logo, tagline, static dot-matrix band. No slots. |
| `og-page.html` | 1200×630 | Per-page OG — eyebrow (page type) + title (2-line max) + URL footer. |
| `og-blog.html` | 1200×630 | Blog post OG — pillar chip + title + author line. |
| `linkedin-stat.html` | 1200×1350 | Sourced-stat card — huge stat + claim + **visible citation**. |
| `linkedin-insight.html` | 1200×1350 | Signal card — mono "SIGNAL DETECTED" eyebrow, Northwind-framed insight + provenance chips. |
| `linkedin-quote.html` | 1200×1350 | Founder-note quote — gradient mark, big quote, name/role. |
| `linkedin-announcement.html` | 1200×1350 | Launch card — eyebrow + headline + one CTA pill. |
| `blog-hero.html` | 1600×900 | Blog hero image system — pillar-colored 16:9 header; also crops cleanly to 1200×630 OG. Set one `.pillar-*` class on `.frame`. |
| `brief-of-the-day.html` | 1200×1350 | "Brief of the day" — recreated mini Daily Brief (Northwind demo data) inside a browser-chrome window. |
| `carousel-cover.html` | 1080×1350 | LinkedIn carousel cover (page 1 of N) — series kicker + title; pairs with `carousel-slide.html`. |
| `carousel-slide.html` | 1080×1350 | LinkedIn carousel content slide (pages 2…N) — duplicate per page and fill the slots. |
| `profile-avatar.html` | 400×400 | Avatar mark, dark + light variants on one page — screenshot each `.frame`; sized for the circular crop. |
| `profile-banner-linkedin.html` | 1584×396 | LinkedIn company-page banner — centered lockup; bottom-left avatar safe zone kept clear. |
| `profile-banner-x.html` | 1500×500 | X (Twitter) profile header — same banner system re-set for the 3:1 canvas. |
| `organisation-brain-01.html` | 1080×1350 | Pre-existing essay-series post ("What is an organisation brain?") + exported PNG; drafts in `_variants/`. |

## Capture

Headless Chrome, 1× (exact OG/LinkedIn pixels):

```bash
cd designsystem/social
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --hide-scrollbars \
  --window-size=1200,630 \
  --screenshot=og-default.png \
  "file://$PWD/og-default.html"
```

- LinkedIn cards: `--window-size=1200,1350`.
- Crisp 2× export (recommended for LinkedIn): add `--force-device-scale-factor=2`
  (output is 2400×2700; LinkedIn downsamples cleanly).
- Give fonts a beat if text renders in fallback: add `--virtual-time-budget=5000`.
- Or open the file in a normal browser and use any exact-region screenshot tool at the
  frame size — the frame sits at the origin with zero margin.

## Slot conventions

Parameterized cards carry sample copy that renders as-is. Each replaceable value is:

1. wrapped in an element with `data-slot="<name>"`, and
2. preceded by a `<!-- SLOT: ... -->` comment,
3. with the full slot table in the header comment of each file.

To produce a variant: copy the file, find-and-replace the inner text of each `data-slot`
element (or target `[data-slot="title"]` etc. with a script), screenshot, delete the copy.
Layout is defensive — OG titles hard-clip at two lines (`-webkit-line-clamp: 2`), so keep
titles ≤ ~60–70 characters and re-check the render after any copy change.

Working drafts/alternates go in `_variants/` (see the organisation-brain series), keeping
the top level one-file-per-asset.

## The citation rule (non-negotiable)

Alfred has **no public customer metrics**. Two legal shapes for a number on a public card:

- **Real market-level stat → visible citation.** `linkedin-stat.html` renders the
  `Source:` chip next to the claim; swap the number and the citation together or the card
  doesn't ship. Reuse already-vetted pairs from the system (e.g. "63% of leaders miss
  opportunities — decisions take too long — Source: PwC CMO Survey, 2025" in
  `templates/collateral/`), or bring a new stat *with* its source.
- **Demo numbers → framed as demo.** `linkedin-insight.html` draws every number from
  `data/demo-data.json` (Northwind Labs) and carries the visible line "Illustrative
  scenario from Northwind Labs, our fictional demo company — not customer results."
  Never trim that line; never invent numbers the JSON doesn't have (add them there first).

The live site's 90+/$90M/90x band is a documented placeholder — never reuse those numbers
as proof (see `ui_kits/website/LIVE-DRIFT.md`).

## Brand guardrails baked into these frames

- `data-theme="dark"`: pure black pages (`--bg-page`), 3%-white chips/cards
  (`--surface-card`), white-alpha hairlines (`--border-subtle/default`), Satoshi for
  everything (the dark theme maps `--font-display` to Satoshi).
- Orange `#FF8431` = action/accent only; periwinkle for eyebrows and cool accents;
  **one gradient element per view** (hairline, stat clip, quote mark, or ambient glow —
  never several).
- Sentence case everywhere; UPPERCASE only on small tracked eyebrows. No emoji, no
  unicode-symbol icons — inline line SVGs, `stroke="currentColor"`, `stroke-width="1.7"`.
- Voice: these are marketing surfaces — third person about Alfred ("Alfred catches it…").
  First person belongs to human speakers on the quote card, and to Alfred only on
  product/email surfaces.
- Logos: white lockups only, from `../assets/logos/` — never recolor.
