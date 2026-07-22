# Alfred — craft checklist (the pre-ship quality gate)

The final quality bar before any Alfred surface ships. Distilled from the `impeccable` skill and
reconciled to Alfred's tokens, components, and verify scripts. Automated checks are the **floor**,
not proof; this is the human gate. Owns the *technical* pass (contrast, states, hardening,
verification); [`anti-slop.md`](./anti-slop.md) owns *originality* and [`motion-and-animation.md`](./motion-and-animation.md)
owns *motion feel* — run all three before calling a surface done.

> Alfred's palette, type, and gradient are already committed, so impeccable's greenfield
> machinery — the OKLCH palette seed, the four-step color-strategy axis, the scene-sentence
> theme choice, the font-catalog/reflex-reject procedure — is **N/A**. Identity-preservation
> wins. Skip those steps entirely; everything below still applies.

## Contrast is a gate, not a preference

Verify every text/background pair before ship. Body text ≥ **4.5:1**; large text (≥18px, or bold
≥14px) ≥ **3:1**; **placeholder text needs the full 4.5:1**, not the muted-gray default. The
single most common AI failure is muted gray body on a tinted near-white — when it's even close,
bump body toward the ink end of the ramp. **Never put gray text on a colored fill**: use a
darker shade of the fill's own hue, or a transparency of the text color. Focus rings need ≥ 3:1
against adjacent colors.

Alfred has already done most of this: `--text-on-orange` (8.35:1 ink-on-orange) replaced
white-on-orange on solid fills — reach for it on any orange surface, never `#fff`. KpiCard
`valence` makes falling-cost metrics read green; `--text-display` sits at 92% white on app-dark.
`scripts/verify-a11y.mjs` is the automated half of this gate — a passing run is the floor, not
proof the design is strong.

## Typographic measure and display discipline

Cap body line length at **65–75ch** (data tables and dense compact UI may run to 120ch+).
Display/hero heading ceiling: `clamp()` max ≤ **6rem (~96px)** — above that the page is shouting.
Display letter-spacing floor: **≥ -0.04em**; tighter and letters touch. Apply `text-wrap: balance`
to h1–h3 and `text-wrap: pretty` to long prose.

Clash Display carries tight tracking by design, but never let a KPI/headline dip below -0.04em.
Clash (display) + Satoshi (body/UI) is already a deliberate contrast-axis pairing — identity
wins over the reflex-reject font list. On the marketing dark theme Satoshi carries **both**
headlines and body, so contrast comes from weight/size/measure, not family — lean harder on the
scale ratio. The product app uses a fixed rem scale (not fluid clamp); the 6rem clamp ceiling is
a marketing/brand-surface concern.

## Cards are the lazy answer — reach for the real affordance

A card grid is the default AI reflex, not a design decision. **Nested cards are always wrong.**
Use `flex` for 1D layouts and `grid` only for genuine 2D — don't default to Grid when `flex-wrap`
is simpler. Breakpoint-free responsive grids: `repeat(auto-fit, minmax(280px, 1fr))`. Build a
**semantic z-index scale** (dropdown → sticky → modal-backdrop → modal → toast → tooltip) — never
arbitrary `999`/`9999`. Vary spacing for rhythm; even gaps everywhere read as uncommitted.

Alfred cards are a real committed component (24px radius, soft diffuse shadow), so "cards are
lazy" becomes: **don't wrap a table, list, or plain section in a card grid when the table / list /
section is the true affordance.** White space is Alfred's canvas — an unbounded card grid fills
it with boxes and buries the one decision or number the view exists to surface.

## Every interactive element ships all its states

Design the eight states: **default, hover, focus, active, disabled, loading, error, success** —
plus **empty** and **overflow** for containers. The common miss is designing hover without focus
(keyboard users never see hover). Never `outline: none` without a `:focus-visible` replacement —
Alfred already ships a 2px-offset `:focus-visible` outline, so use it, don't reinvent per
component. Placeholders are not labels: always a visible `<label>`, validate on blur, errors
below the field wired with `aria-describedby`. Prefer an undo-toast over a confirm dialog for
reversible destructive actions.

**Dropdown clipping fix:** an absolutely-positioned menu inside an `overflow: hidden/auto`
ancestor gets clipped — escape the stacking context with the native popover API, `position:
fixed`, `<dialog>`, or a portal. `scripts/verify-components.mjs` checks component completeness;
a component missing loading/error/empty states fails the bar even if the happy path is
pixel-perfect. Error and empty-state copy stays in Alfred's first-person chief-of-staff voice
("I couldn't load that — try again"), sentence case, no emoji.

## The absolute bans — match and refuse

If you're about to write any of these, rewrite the element with different structure:

- **Side-stripe borders** — `border-left/right` > 1px as a colored accent on cards/alerts/callouts.
  Use full borders, background tints, or leading icons/numbers.
- **Gradient text on body copy** — `background-clip: text` over a gradient on running prose, or
  as the default emphasis on *every* heading. That is the tell. *Not banned outright on Alfred:*
  gradient-filling the signature `--gradient-brand` on a **short display/emphasis word or
  headline** is a committed brand device (used deliberately across social cards, decks, and
  heroes). Keep it to short display text and one gradient moment per view; never long body copy,
  never the only emphasis mechanism everywhere. `scripts/verify-craft.mjs` allows
  `--gradient-brand` text and does not flag it.
- **Glassmorphism as default** — rare and purposeful, or nothing.
- **The hero-metric template** — big number + small label + supporting stats + gradient accent.
  SaaS cliché. *(Alfred does lead with the number — but through the `KpiCard` (with valence)
  inside real hierarchy, not the big-number + gradient-accent template.)*
- **Identical card grids** — same-size icon+heading+text repeated endlessly.
- **Tiny uppercase tracked eyebrow above every section** — one named kicker is voice; an eyebrow
  on every section is AI grammar. UPPERCASE is allowed only as Alfred's small tracked eyebrow, and
  only where a deliberate cadence calls for it.
- **Numbered section markers (01/02/03) as default scaffolding** — numbers earn their place only
  when the section genuinely IS an ordered sequence.
- **Text that overflows its container** — test heading copy at every breakpoint; reduce the clamp
  max or rewrite. The viewport is part of the design.

## The two-altitude AI-slop test

If someone could look at the interface and say "AI made that" without doubt, it failed. Because
Alfred's palette/type/gradient are committed, the greenfield color-strategy machinery is N/A —
what still applies with full force is the **composition** reflex:

- **First-order:** could someone guess the theme + layout from the *category alone*? First
  training-data reflex.
- **Second-order:** could someone guess the aesthetic family from *category-plus-anti-reference*?
  The trap one tier deeper. Rework until neither is obvious.

The slop lives in layout sameness and generic hierarchy, not the colors. Full tell list and
reworks: [`anti-slop.md`](./anti-slop.md).

## Harden against real data before you call it done

Designs that only work with perfect data aren't production-ready. Test extreme inputs (100+ char
names, empty, single char, RTL, CJK, millions, 1000+ list items) and every error path
(offline/slow/timeout, 400/401/403/404/429/500, validation, permission). Budget **30–40% text
expansion** for translation — no fixed widths on text containers; use logical properties
(`margin-inline`, `padding-inline`). Guard flex/grid overflow with `min-width: 0` on shrinkable
children; truncate with ellipsis or `-webkit-line-clamp`. Prevent double-submit (disable while
loading). Skeleton screens over mid-content spinners; empty states that teach.

Satoshi data tables especially need `min-width: 0` guards so long cell content doesn't force
horizontal overflow — wrap wide tables in an `overflow-x: auto` container. Use the DS asset/icon
set and the hand-crafted branded illustration library, never generic stock (impeccable's
Unsplash default does not apply to Alfred).

## Automated checks are evidence, never a passing grade

A clean detector/QA result is **never** proof the design is strong — it only rules out specific
defects. Gather browser evidence and walk the real interaction path yourself: zoom in, squint,
use it with a keyboard, test at mobile/tablet/desktop, exercise empty/error/loading. The exit
bar is "defensible in a high-end studio review," which no script can certify.

Alfred's automated half of the gate is three scripts, run before ship:

- **`node scripts/verify-a11y.mjs`** — contrast, focus, ARIA/keyboard contracts (the machine
  version of the contrast principle).
- **`node scripts/verify-components.mjs`** — component/state render health across all components.
- **`node scripts/verify-render.mjs`** — server-renders every UI-kit component against the real
  bundle; fails on render errors or React warnings.

Run all three, fix their defects, **then do the human pass anyway** — the five-critic screenshot
panel is the review harness that certifies the studio bar.

## The modes-of-work lens menu

`impeccable` is really a taxonomy of named lenses to think through — invoke the one that matches
the intent rather than "improving" vaguely:

- **Build** — `shape` (plan UX/UI into a brief before code) · `craft` (build a feature end-to-end)
  · `init` (capture context) · `document` (design doc from existing code) · `extract` (pull
  reusable tokens/components into the system).
- **Evaluate** — `audit` (technical QA scan: a11y, perf, theming, responsive; scored 0–4,
  documents don't fix) · `critique` (design review scoring Nielsen's 10 heuristics + cognitive
  load + emotional journey).
- **Refine** — `polish` (final detail pass by root cause) · `bolder` (amplify bland work) ·
  `quieter` (calm overstimulating work) · `distill` (strip to essence) · `harden` (production
  edge cases) · `onboard` (first-run flows, empty states).
- **Enhance** — `animate` · `colorize` · `typeset` · `layout` · `delight` · `overdrive`.
- **Fix** — `clarify` (UX copy, errors) · `adapt` (devices/sizes) · `optimize` (UI performance).
- **Iterate** — `live` (browser variant mode: pick an element, generate alternatives).

For Alfred the durable daily lenses are **`critique` / `audit`** before a surface ships,
**`polish` / `harden`** before merge, and **`quieter`** when a view over-uses color against the
white-space-canvas principle (start quieter than instinct). `colorize` / `typeset` / `bolder`
operate *within* Alfred's fixed palette and Clash/Satoshi type — they re-balance emphasis, they
never introduce new colors or fonts. The greenfield `init` / palette-seed steps are mostly N/A.

## What's N/A for Alfred (reconciliations)

- The **new-project color machinery** — `palette.mjs` OKLCH seed, the Restrained/Committed/Full/
  Drenched commitment axis, the scene-sentence dark-vs-light choice, tinted-neutral chroma math.
  Alfred's palette is committed; do not propose new palettes. (And `Committed`/`Drenched` — one
  saturated color across a whole hero — is out of brand: color is an accent, never wallpaper.)
- The **font-selection procedure and reflex-reject font list** — greenfield only; Alfred is
  committed to Clash + Satoshi (+ Bricolage for marketing accent).
- The **`bounce/elastic` motion ban** partially conflicts with `--ease-emphasized`
  (`cubic-bezier(0.34,1.4,0.5,1)`, a slight overshoot). Treat `--ease-emphasized` as a subtle
  spring *settle* for rare emphasis moments, not the elastic bounce the ban targets.
- The **"cream/beige body bg is the AI default"** warning is greenfield guidance and does **not**
  indict Alfred's app-dark warm inks (`#0C0C0A`/`#111110`/`#171715`) — those are deliberate dark
  surfaces, not a warm-near-white reflex.

---

**Source & attribution.** Distilled and adapted from the `impeccable` skill (v3.9.1, Apache 2.0)
— its `General rules`, `Absolute bans`, `AI slop test`, and command taxonomy. Reach for the skill
directly (its `critique` / `audit` / `polish` / `harden` / `live` commands) whenever a surface
needs a rigorous review pass; skip its greenfield palette/font machinery per the reconciliations
above.
