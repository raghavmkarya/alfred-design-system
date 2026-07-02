# Live-site drift register — seekalfred.ai vs the design system

Verified by a full crawl on 2026-07-01 (Framer build on the "Amani Design / AgentFlow"
template). Two lists: what the design system **adopted** from the live site, and live
**defects we deliberately do NOT adopt** — the DS value is the brand-correct target and
the site should migrate toward it, not the other way around.

## Adopted from live (now in tokens)

- Pure black pages (`--bg-page: #000000` on dark) — the warm ink ramp (`--ink-950/925/875`)
  stays available as raw tokens for decks/print but no longer drives site surfaces.
- Card pattern: 3%-white fill + white-alpha hairline (`--surface-card`, `--border-*`).
- Secondary text `rgba(255,255,255,0.78)` (live tiers 0.70 / 0.82 / #B8B8B8).
- Satoshi carries **both** headlines and body on dark (`--font-sans` no longer swaps to
  Inter; Inter remains the fallback). Display range live: 52–64px, weight 400, lh 1.0–1.1.
- New semantic token `--urgent-500: #FF3D00` (live KILL / anomaly / P1 states).
- Nav/footer reality: Integrations + Alfred Core links, lowercase "get started" CTA,
  footer entity "© 2026 E902 AI Labs Private Limited", live column structure.

## Live defects — do NOT adopt

| Defect | Live evidence | DS position |
|---|---|---|
| Two competing oranges | `#FF7A2B`/`#FF7A2F` hardcoded across /pricing, /integrations, /alfred_core alongside the `#FF8431` token | One orange: `--orange-500 #FF8431` |
| Mint-green fallback | `#9FF690` baked as the inline var() fallback on 120+ elements (AgentFlow residue); renders green pre-hydration | Never ship non-brand fallbacks |
| Framer-blue links | `#0099FF` default on all rich-text/footer links | `--text-link` (orange-400 on dark) |
| Forced Title Case | `text-transform: capitalize` on h1/h2 presets | Sentence case everywhere |
| Unicode ✓ checkmarks | Pricing checklists | Custom line SVG icons only |
| Off-palette accents | `#8B7CF0` violet, `#D4537E` pink on /alfred_core | Periwinkle `--periwinkle-*` |
| Dropped brand gradient | `--gradient-brand` (135deg periwinkle→orange) renders on zero live pages; live uses 180deg periwinkle beams (home) and a 117deg orange→red (marketing) | Keep the signature gradient; beams are an additional motif, not a replacement |
| Font bloat | ~178 unused @font-face rules / 8 families (Google Sans, Merriweather, Cabin, Figtree…) | Ship Satoshi + Clash + Bricolage + Inter only |
| Template residue | "Agent Performance" card, "Get 10x higher throughout and 10% lower fright cost", "© Design & Developed by Amani Design" | Remove on site |
| Placeholder proof | Counters SSR at 0%; "90+ / $90M+ / 90x" stats and "2,300+ joined" are unsourced placeholders | No fabricated proof — sourced stats or none |
| Copy typos / drift | "Catch it at risk, not at lost", mixed UK/US spelling, mid-word "send Message" | Fix on site |
| Radii chaos | Square (about/contact/blog) vs 7px (home) vs pills (integrations/pricing) per page | DS scale: 12px controls / 24px cards / 32px large |

## Voice nuance (both are correct)

- **Marketing site** speaks *about* Alfred in third person ("Alfred recommends…") and as
  corporate "we". This is the live pattern and it is fine for the site.
- **Product, briefs, and lifecycle email** keep the first-person chief-of-staff voice
  ("I've flagged two reallocations…"). Do not flatten one into the other.

## Live-only faces (not adopted as tokens)

- **Geist Mono** — homepage mono eyebrows (ONE SOURCE OF TRUTH, SIGNAL DETECTED). The DS
  eyebrow stays Satoshi-tracked (`--ls-caps`); a mono eyebrow variant may use `--font-mono`.
- **Schibsted Grotesk** — stat counters / countdown digits. DS uses Clash Display for
  KPI values.
