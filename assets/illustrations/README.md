# Alfred — Illustration System

Hand-crafted, on-brand illustration for Alfred. Every asset here is **built to spec inside
the design system, then reused** — so the brand's art compounds instead of drifting. Do **not**
drop one-off AI images straight into product/marketing; author (or AI-seed then hand-finish)
them to this house style, add them here, and reuse.

> Sits alongside `assets/logos/` (lockups) and `assets/icons/` (single-color glyphs).
> Gallery: open `index.html`.

## House style

- **Palette = tokens only.** Ink `#02021E`, orange `#FF8431` (action accent), periwinkle
  `#A7A7FC` (cool accent), the periwinkle→orange gradient (`--gradient-brand`), white/cream grounds.
  Semantic colors (success/danger) only when the art depicts data.
- **Gradient is precious.** One gradient element per composition — reserved for Alfred's
  presence / the mark. Everything else is solid.
- **Flat & geometric.** Bold shapes, clean edges, soft brand radii. Premium and restrained —
  never cheesy-cartoon. Depth via a single soft shadow, not heavy rendering.
- **Two skins per asset:**
  - `*.svg` — **flat brand skin** for product, social, decks, web.
  - `*-ink.svg` — **comic-ink skin** (ink outline + halftone) for the graphic-novel / motion-comic.
- **Type** in art follows the brand: Satoshi for captions/labels, Clash Display for display,
  a heavy face for comic SFX. No emoji.

## The cast

### Alfred — the chief of staff  (`characters/alfred-butler*.svg`)
The **Alfred favicon/"a" mark is his head** (periwinkle→orange gradient); the body is a
distinguished butler / chief-of-staff — tailcoat with swallowtails, waistcoat, wing collar,
orange bow tie, periwinkle watch-chain + pocket square, white gloves. Canonically **presenting a
decision card** (a quantified call). The logo *is* the character.

- `alfred-butler.svg` — flat, presenting a decision (canonical hero pose)
- `alfred-butler-ink.svg` — comic-ink skin of the same figure
- **Pose vocabulary** (arm-swaps on one shared body): *at attention · presenting a decision · welcoming.*
  Add poses by swapping only the arm group — the body/head stay identical so he never drifts.

### The Leader — the marketing hero  (`characters/the-leader*.svg`)
The human counterpart. A confident modern CMO in a **hands-on-hips power stance** — long fitted
charcoal blazer, periwinkle top, orange belt + shoes. Where Alfred *presents* the call, the Leader
*makes* it. Built in **both variants** so the hero can be anyone:

- `the-leader.svg` — female variant (bob, heels)
- `the-leader-male.svg` — male variant (short hair, loafers)

Same house style, palette, pose and 640×940 frame as Alfred, so the whole cast reads as one family.

_Planned next: comic-ink twins of the Leaders; motif/scene kits (the noise, the situation room,
up-trend, decision card, energy burst)._

## Naming

`characters/<name>[-<pose>][-ink].svg` — e.g. `alfred-butler.svg`, `alfred-butler-welcoming.svg`,
`alfred-butler-ink.svg`. Motifs → `motifs/<name>.svg`; scenes → `scenes/<name>.svg`.

## Using an asset

```html
<!-- static -->
<img src="assets/illustrations/characters/alfred-butler.svg" alt="Alfred" width="240" />
```
Or inline the SVG to animate/recolor it. The head gradient and accents already resolve to brand
values; place him on white (product) or on ink/gradient (marketing) — both work.

## Adding a new asset (the discipline)

1. Author to the house style above (hand-built vector, or AI-seeded then hand-finished in Figma).
2. Keep a **character sheet** — a recurring character must look identical across poses (reuse the
   shared body; change only what the pose changes).
3. Export both skins (`*.svg` flat + `*-ink.svg`) when the asset will appear in the comic.
4. Add it to `index.html` and this README's cast list.

## Don't

- Don't recolor the gradient mark, or use more than one gradient per composition.
- Don't introduce off-token colors or a second display typeface.
- Don't ship raw AI output — hand-finish to spec first.
