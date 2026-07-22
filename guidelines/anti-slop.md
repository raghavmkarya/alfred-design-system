# Alfred — anti-slop (staying off the AI-generated tell list)

Distilled from the `taste-skill` plugin (all 13 skills) and reconciled to Alfred's committed
brand. **Alfred's aesthetic is already decided** — orange/periwinkle/ink, the periwinkle→orange
gradient, Clash Display + Satoshi, soft corners, white-space-as-canvas. So this is **not** a
"pick a design language" doc. It is: *avoid the AI-slop tells while staying 100% on Alfred
brand.* Every "choose X" rule from the source is reframed as "within Alfred's commitment, avoid
tell Y by doing Z." Pairs with [`motion-and-animation.md`](./motion-and-animation.md),
[`craft-checklist.md`](./craft-checklist.md) (the ship gate), and [`voice-and-naming.md`](./voice-and-naming.md).

## Read the surface first — but the look is fixed

Before touching anything, state a one-line design read: page kind (marketing landing · product
app · slide · email), audience (a leader evaluating vs an operator inside the product), density
target, and any quiet constraint (a11y-critical, trust-first).

> Reading this as: product-app decision panel for an operator, mid density, warm-premium, app-light theme.

The source's read ends in "…leaning toward which design system / font / palette." For Alfred
that half is **already answered and never re-opened.** The read still does real work — it sets
the dials below and picks the theme (light `app` · marketing `dark` · `app-dark`) — it just
never selects a new palette or typeface.

## Three dials: VARIANCE, MOTION, DENSITY

The aesthetic is fixed; the *intensity* is a choice, and defaulting all three to the same middle
setting is itself a slop tell. Carry three dials:

- **VARIANCE** (1 symmetric → 10 asymmetric): how far layouts depart from a centered grid.
- **MOTION** (1 static → 10 cinematic): how much the surface animates.
- **DENSITY** (1 airy → 10 packed): whitespace vs data-per-screen.

| Surface | VARIANCE | MOTION | DENSITY |
|---|---|---|---|
| Marketing landing (dark) | 7 | 6 | 3 |
| Product app view (light) | 5 | 4 | 5–6 |
| KPI / decision panel | 4 | 3 | 6 |
| Slide / deck | 6 | 4 | 3 |

The product app runs quieter than a marketing page on all three — start quieter than instinct.
Marketing can push VARIANCE and MOTION higher because whitespace is the canvas and the single
gradient element carries the drama.

## The specific AI reaches to refuse

When the model tries to "look designed," it produces the same handful of tells. Refuse outright:
**AI-purple/blue mesh-gradient hero** · **centered H1 over a dark blob** · **three identical
feature cards in a row** · **glassmorphism on everything** · **infinite micro-animations on
every card** · **Inter + slate-900** · **generic startup names** (Acme, Nexus, SmartFlow) ·
**Jane-Doe placeholder people and egg avatars** · **fake-perfect numbers** (99.99%, 50%,
1,234,567) · **filler verbs** (Elevate, Seamless, Unleash, Next-Gen, Revolutionize).

Most import wholesale. Two need an Alfred carve-out:

- **The "AI-purple glow" ban is NOT a ban on periwinkle.** `--periwinkle-400 #A7A7FC` is a
  committed brand color used with intent. The tell is *unmotivated* purple washes and mesh
  gradients; Alfred's answer is the *one* deliberate `--gradient-brand` element per view, never a
  purple wash behind everything.
- **The three-equal-cards ban stands** — reach for a 2-col zigzag, an asymmetric grid, or a
  KpiCard row with real valence instead.

## Layout diversification (imports unchanged)

Pure anti-templating; applies to Alfred as-is.

- **Anti-center bias when VARIANCE > 4:** prefer split / left-content-right-asset / asymmetric
  whitespace over a centered hero (centered is fine only for a manifesto or launch moment).
- **Zigzag cap:** max 2 consecutive image+text split sections; the 3rd is a fail. Break with a
  full-width band, a vertical stack, or a bento.
- **No repeated layout family:** a layout family appears at most once. 8 sections → at least 4
  different families.
- **Bento cell count:** N items → exactly N cells. No empty tile pasted to fill the grid; cells
  need real visual variation — real card elevation (light app), 3%-white cards (marketing dark),
  or a single gradient cell — not all white-on-white text cards.
- **Hero fits the viewport:** nav on one line ≤80px tall; headline ≤2 lines; subtext ≤20 words;
  CTA visible without scroll; top padding ≤`pt-24`.

## Earn every card and every gradient

Card-overuse and the 3-equal-columns feature row are two of the loudest tells.

- **Use a card only when elevation communicates hierarchy** — otherwise group with a `border-top`,
  a divider, or plain negative space. In dense/data contexts, drop the boxes entirely; don't box
  a KPI cluster just because it's grouped — let the white canvas do the separating.
- **One intentional gradient per view.** `--gradient-brand` (135deg periwinkle→orange) is the
  owned one-per-view element. Gradient-filling it on a **short display/emphasis word or headline**
  (`background-clip: text`) is on-brand — it's used deliberately across social cards, decks, and
  heroes. The tell is gradient on **body copy**, as a wallpapered surface, or as the only emphasis
  on every heading; never recolor it. Alfred's orange and periwinkle are fixed and full-strength
  by design — keep the *count* discipline, drop the source's "desaturate every accent" advice.

## Depth is machined, not stacked

Premium surfaces read as physical hardware, not flat divs. Two moves do most of the work:

1. **Nested enclosure (double-bezel).** A container sits in a subtler outer shell (a hairline
   ring + a little padding), not floating directly on the canvas. Outer shell: faint tint + 1px
   hairline + small pad; inner core: its own fill + a 1px inset top highlight.
2. **Concentric radii.** The inner radius equals the outer radius minus the padding, or the
   corners look wrong. An element inside a 24px card with 6px pad is `calc(24px - 6px)` = 18px,
   never another 24px.

```css
.shell { border-radius: var(--radius-2xl); padding: 6px; box-shadow: inset 0 1px 0 rgba(255,255,255,.6); }
.core  { border-radius: calc(var(--radius-2xl) - 6px); }
```

Don't box everything — a nested enclosure is for a hero surface or a KPI cluster, not every
element. The inset top-highlight is white on the light app, a warm-white sliver on app-dark
(`#171715`), never neutral gray.

**Shadows carry the surface's hue.** The fastest cheap-looking tell is
`box-shadow: 0 4px 12px rgba(0,0,0,.3)`. Tint Alfred's soft vertical shadows toward ink:
`rgba(2,2,30,0.08)` (from `--ink-900`), wide and vertical. On app-dark (warm inks) the shadow is
a deeper warm-black so it disappears into the surface rather than reading as a gray halo.

## Eyebrows are on-brand but rationed — never numbered

The source treats every uppercase-tracked eyebrow as a tell. Alfred **explicitly sanctions** the
small tracked UPPERCASE eyebrow — it's the one place uppercase is allowed. So the rule isn't "no
eyebrows," it's **rationing**:

- **Max 1 eyebrow per 3 sections** (hero counts as 1). Check: count `uppercase tracking` labels
  above headlines; fail if count > `ceil(sections / 3)`.
- **Never section-number them** — `00 / INDEX`, `001 · Capabilities`, `06 · how it works`,
  `Brand · No. 01` are banned. The eyebrow names the topic in plain words, not an enumeration.
- **No micro-meta sentence under the eyebrow.** Eyebrow + headline + body is the whole stack.

Because everywhere else Alfred is sentence case, the eyebrow is the *only* uppercase — which
makes over-using it especially loud.

## Emphasis stays inside the family

To stress a word in a headline, use **italic or bold of the same font**, never a random serif
word dropped into a sans headline (the amateur tell). Emphasize within **Clash Display** or
**Satoshi**. **Bricolage Grotesque** is the sanctioned editorial accent — marketing only, as a
deliberate voice, not sprinkled word-by-word. Any italic display word containing `y g j p q`
needs `line-height ≥ 1.1` plus a `padding-bottom` reserve, or the descender clips.

## Consistency locks (the tokens already enforce these)

- **One accent, locked across the whole surface.** Don't let a section-7 CTA drift to a
  different hue. Color is an accent, never wallpaper.
- **One gradient element per view** (see above).
- **Shape lock.** Follow the radius scale everywhere: inputs/buttons 12px, cards 24px, large
  surfaces 32px, pills round. A square card on a pill-button page is broken.
- **Theme lock.** One theme per surface, no section flips. The three themes don't intermix
  mid-page; accent + gradient are identical across all three, only surfaces/text invert.

## Real assets over hand-rolled fakes

- **No div-based fake screenshots.** A product preview built from styled `<div>` rectangles
  (fake task lists, fake dashboards, fake terminals) is the #1 tell. Use a real screenshot, a
  real mini-component from the bundle, a generated image, or skip the preview.
- **No plain-text wordmarks for a logo wall**, and no category label under each logo. Logos only.
- **Even minimalist surfaces need real imagery** — pure text is incomplete, not minimal.
- **Icons are Alfred's own set.** The source bans hand-rolled SVG and prescribes a third-party
  pack (Phosphor/Tabler). Alfred is the opposite by design: use the **custom single-color line
  set** (`assets/icons/`, ~16–24px, `currentColor`), the logo lockups (`assets/logos/`), and the
  intended hand-crafted illustration library. Never emoji, never unicode symbols, never a random
  icon library, never a fake screenshot.

## Realistic, quantified content

Placeholder-grade content reads as a template instantly. Ban generic names ("John Doe"),
placeholder brands ("Acme"), suspiciously round data (`99.99%`, `50%`, `$100.00`), identical
blog dates, and one avatar reused for many people. Use organic, uneven, credible figures —
`+18.3%`, `$41,280`, `CAC down 6.4%`, never `+20%` / `$40,000`. This amplifies Alfred's voice:
lead with the number, concrete and quantified — a real figure Alfred would stand behind, paired
with KpiCard `valence` so an uneven falling-cost metric still reads green. **No invented
precision** (`5.8mm`) the product doesn't claim; the live 90+/$90M/90× band is a documented
placeholder — never reuse it as real proof.

## Optical alignment beats mathematical alignment

Math-centered is not eye-centered. Nudge icons-next-to-text, play-triangles-in-circles, and
text-in-buttons 1–2px until they *look* centered. Across side-by-side cards, align shared
elements to a common baseline — titles, values, and CTAs start/end at the same Y. Pin CTAs to
the bottom of cards so a row of buttons forms one clean line regardless of body length. This is
load-bearing for KPI rows and pricing/comparison surfaces, where mismatched value baselines make
a data-dense product look broken. Clash Display's tight tracking makes optical (not metric)
heading centering matter more, not less.

## Ship complete — no placeholder code, no lazy truncation

A partial deliverable is a broken deliverable. Hard-ban in shipped output: `// ...`,
`// rest of code`, `// TODO`, bare `...` for logic, a skeleton where a full build was asked, and
prose escapes ("the rest follows the same pattern", "for brevity"). Method: lock the deliverable
count up front, build every item completely, then diff your output against the count before
finishing. If you genuinely hit a length limit, stop at a clean breakpoint (end of a
component/section) and resume exactly there — never compress the remainder. A shipped Alfred
component includes its loading, empty, and error states in full, not a happy-path stub.

## Ship full interactive state cycles

LLMs default to the happy path. Always implement: **loading** (skeletons shaped like the final
layout, not a generic spinner) · **empty** (a composed "here's how to populate this" view that
speaks in Alfred's chief-of-staff voice — "I haven't flagged anything yet; connect a channel and
I'll start watching spend") · **error** (inline for forms, contextual toasts for transient;
never `alert()` or "Oops!") · **tactile feedback** (`:active` → `scale(0.98)`). Alfred's a11y
answers are already wired — **ink-on-orange** (`--text-on-orange`, 8.35:1) on solid fills, the
2px-offset `:focus-visible` outline, KpiCard **valence**, `--text-display` at 92% white on
app-dark. Reach for them; don't regress them or re-derive contrast by hand. (Full technical
gate: [`craft-checklist.md`](./craft-checklist.md).)

## Motion must be motivated, and claimed motion must ship

Name what an animation communicates in one sentence — hierarchy, sequenced reveal, feedback, or
state transition — before adding it. If the MOTION dial is >4, the surface must actually move
(hero entry, scroll-reveal on key sections, hover feedback on CTAs); a static page claiming
MOTION 7 is broken. If you can't ship working motion in scope, **drop the dial to 3 and ship a
clean static surface** rather than half-built motion. Wire every duration/easing to Alfred's
tokens — `--ease-standard` / `--ease-emphasized`, `--dur-fast/base/slow` — never the source's
literal `cubic-bezier(0.16,1,0.3,1)`. Full motion craft: [`motion-and-animation.md`](./motion-and-animation.md).

## Cut ruthlessly, and audit every visible string

Default section shape: short headline (≤8 words) + sub-paragraph (≤25 words) + one asset or one
CTA. No 20-row spec tables or award dumps on a marketing surface — group into 3–5 highlights or
move to a dedicated view. **Copy self-audit (mandatory before ship):** re-read every headline,
eyebrow, button, caption, and alt text. Kill anything grammatically broken, with unclear
referents, or that reads as an LLM trying to sound thoughtful (mock-poetic labels: "From the
field", "Field notes", "Quietly trusted by"). Replace with a plain functional sentence in
Alfred's first-person chief-of-staff register.

## The em-dash is a voice decision, not a blind ban

The source declares a total ban on em-dashes (`—`) as the #1 AI tell. **This collides head-on
with Alfred's established voice** — Alfred's own CLAUDE.md, readme, and design-system docs use
em-dashes heavily and deliberately, as house voice. So the durable principle is *not* "delete
all em-dashes." It is: **em-dash usage is a voice choice, owned by
[`voice-and-naming.md`](./voice-and-naming.md), applied consistently — not a decorative crutch.**
The only sliver worth keeping from the ban: don't drop an em-dash in as a purely decorative
kinetic-pause flourish inside a label, eyebrow, or pill. Everything else defers to the voice doc.

## Redesigns are audit-first

Never rewrite an existing surface from scratch. **Scan** (framework, styling method, current
patterns) → **Diagnose** (list every generic pattern, weak state, missing state) → **Fix**
(targeted upgrades within the existing stack, tested after each change). For Alfred this is a
token-compliance audit: scan the surface, diagnose every hardcoded value that should be a token,
fix against `tokens/` and the `_ds_bundle.js` components — verify the token/component export
exists before referencing it. Work the priority ladder: type & scale → color cleanup →
hover/active/focus states → layout & spacing → swap cliché components → add loading/empty/error →
final typographic polish. The five-critic screenshot panel is Alfred's diagnose step made visual.

## The two-altitude slop test

If someone could look at the interface and say "AI made that" without doubt, it failed. Because
Alfred's palette, type, and gradient are committed, the color reflex is moot — what still applies
with full force is the **composition** reflex:

- **First-order:** could someone guess the *layout* from the category alone (a KPI-card wall, a
  generic sidebar, an eyebrow per section)? That's the first training-data reflex, even in-brand.
- **Second-order:** could someone guess the aesthetic family from category-plus-anti-reference?
  Rework until neither is obvious.

The slop lives in layout sameness and generic hierarchy, not the colors — that's where to spend
the skepticism.

## Pre-flight check (fail one box → not done)

- Design read + dial values stated and reasoned?
- One accent locked, one gradient element, theme not flipped mid-surface?
- Radius scale consistent (12 / 24 / 32 / pill)?
- Eyebrow count ≤ `ceil(sections/3)`, none section-numbered?
- No zigzag ≥3, no repeated layout family, bento cell count exact?
- Hero fits viewport, nav one line ≤80px?
- No div fake-screenshots; real images/logos; **Alfred icon set only, zero emoji**?
- Copy self-audit done; no invented-precision numbers; sentence case; leads with the decision/number?
- Motion motivated, claimed-motion actually shipped, `--ease-*`/`--dur-*` tokens used, reduced-motion respected?
- State cycles (loading / empty / error) present; ink-on-orange, focus-visible, KpiCard valence intact?
- Em-dash usage matches `voice-and-naming.md` (consistent, not a decorative crutch)?

## Not shipping paths for Alfred (reference vocabulary only)

Several taste-skill members describe *alternate aesthetics* that would override Alfred's
committed brand. Read them for vocabulary, never as a build target: **minimalist-skill**
(warm-monochrome + serif hero), **brutalist-skill** (zero radius, hazard red, CRT scanlines),
**stitch-skill** (targets Google Stitch; mandates perpetual motion). Alfred also **rejects** two
of their recurring rules: the pure-`#000000` ban (Alfred's marketing dark theme is deliberately
pure-black with 3%-white cards) and perpetual/infinite micro-motion (Alfred motion is
purposeful and restrained, and `base.css` neutralises motion under `prefers-reduced-motion`).

---

**Source & attribution.** Distilled and adapted from the `taste-skill` plugin (all 13 skills:
`taste-skill`, `soft-skill`, `gpt-tasteskill`, `redesign-skill`, `output-skill`,
`minimalist-skill`, `brutalist-skill`, `stitch-skill`, `image-to-code-skill`,
`imagegen-frontend-web`, `imagegen-frontend-mobile`, `brandkit`, `taste-skill-v1`). See
`SKILL.md` → *Companion skills* for when to reach for each directly.
