# Style absorption — what Alfred takes from other visual languages

The Style lab (`library/styles/`) renders eight foreign styles on identical
Alfred content. Two were chosen for absorption: **terminal dev-retro** and
**vivid maximalist**. Absorption means token-level borrowing under a budget,
never a costume: Alfred stays a soft-cornered, ink-dark, orange-action brand.
This file is the contract for what came in, what stayed out, and how much of
it any one surface may use. New absorptions get a new section here, with the
same three parts: tokens, budgets, refusals.

## From terminal dev-retro: the instrument layer

The style's real asset is not the green phosphor — it is the sense that the
page is an *instrument*: precise, labeled, live. Adopted:

- **`--font-mono`** (tokens/typography.css) is now a TRUE mono stack
  (`ui-monospace, "SF Mono", "JetBrains Mono", …`). It used to alias Satoshi,
  which made the token a no-op. Use it for metadata, timestamps, evidence
  trails, keyboard hints, API/code surfaces, bracketed counts (`ALERTS [2]`),
  version strings. 11-12px, uppercase with `--ls-caps` where it labels.
- **`--shadow-phosphor`** (tokens/elevation.css): warm orange text-glow for
  ONE live element on a dark surface — a status dot, a cursor, a live number.
- **Console evidence panes**: a dark card with hairline borders where Alfred
  shows work as prompt-prefixed mono lines. See `LibConsoleHero` in
  `library/sections/fusion.jsx` for the reference execution.
- **Keyboard-first affordances**: `Kbd`-built hint lines ("press / to ask
  Alfred"), command-palette motifs.

Budgets: mono never sets headlines (Clash owns them) or body (Satoshi owns
it). Phosphor is orange only, dark marketing only, one element per view.

Refused: 0px corners and hard offset shadows (floor any console pane at
12px), ASCII ornament, traffic-light window chrome, scanlines/CRT flicker,
green/amber terminal hex (`#33FF66`, `#FFB000` never become tokens).

## From vivid maximalist: scale and spring

The style's real asset is conviction — poster scale and confident motion —
not its rainbow. Adopted:

- **`--text-poster`** (tokens/typography.css): `clamp(56px, 9vw, 140px)` for
  ONE marketing-hero statement per page. Clash Display, line-height 1.0,
  tracking -0.02em.
- **`--ease-spring`** (tokens/spacing.css): overshoot curve for marketing
  CTAs and reveals. Hover scale stays inside 1.03-1.04. The product app keeps
  `--ease-emphasized`.
- **`--dur-marquee`** + the marquee ticker strip as a section divider
  (`LibMarqueeDivider`): one per page, monochrome ink or periwinkle, never
  orange, static under `prefers-reduced-motion`.
- **`--texture-grain`** (tokens/base.css): tiling noise for one ambient layer
  per dark marketing page at 0.03-0.05 opacity.
- **The one-highlighted-word move**: a single gradient-filled or
  Bricolage-accented word inside a Clash headline — this WAS already the
  brand's gradient-text device; the absorption is the discipline of exactly
  one word at poster scale.

Budgets: one poster statement, one marquee, one grain layer per page; spring
motion is marketing-only; the color system is untouched (one-primary orange,
periwinkle cool, white space as canvas).

Refused: multi-hue palettes and color-as-wallpaper, neo-brutalist hard
borders/shadows, sticker/doodle/collage energy (that routes through the
planned hand-crafted illustration library, in brand colors, or not at all),
per-section background color flips.

## Where to see it

`library/index.html` → the **Fusion** category: the absorbed moves executed
on-brand. Those sections are the copy-paste references; the Style lab pages
remain off-system and are never lifted directly.
