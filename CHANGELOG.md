# Changelog

Notable changes to the Alfred AI design system. Date-stamped (the system ships as a
synced folder, not an npm package, so there's no semver tag).

## 2026-07-23 — Harden verify-craft: JSX outline/z-index forms (Phase 1.5)

Tightened two craft rules that only caught the CSS syntax, missing the JSX inline-style form:
- **`outline-none-no-focus`** now catches `outline: "none"` / `outlineStyle: "none"` (quoted), not just
  bare `outline: none`, and its `suppressIf` also recognises the DS's custom-focus patterns
  (`--shadow-focus` / `--border-focus` rings, `usePress` / `isFocusVisible`) so the 14 components that
  legitimately replace the outline aren't flagged.
- **`arbitrary-z-index`** now also catches the camelCase `zIndex: 9999` form.

The tightened outline rule immediately bit **4 real focus-visibility gaps** — raw `<input>`s in the app
UI-kit screens (Dashboard, Screens2) and two marketing section templates (SectionsB, SectionsD) that set
`outline: "none"` with no replacement. Fixed by removing the inline `outline: none` so the DS's global
`:focus-visible` outline (base.css) applies. All six verifiers green.

## 2026-07-23 — forced-colors (Windows High Contrast) baseline (Phase 1.3, part 3 — completes 1.3)

Adds `tokens/forced-colors.css` (imported by `styles.css`) — a global
`@media (forced-colors: active)` baseline for Windows High Contrast, where the OS
flattens author backgrounds to Canvas and drops box-shadows. It restores the two
things that otherwise vanish, using the semantic hooks components already emit (no
per-component edits):
- **Focus stays visible** — `:focus-visible { outline: 2px solid Highlight !important }`.
  The `!important` beats the inline `outline: none` on the ~12 inner form controls
  that show focus via a box-shadow ring (HCM strips shadows), so the keyboard ring
  survives.
- **Floating surfaces stay delineated** — `[role="dialog"]/[role="menu"]/[role="listbox"]/
  [role="tooltip"]` get a system-coloured border (they separated by shadow before).

A new `verify-craft` **`forced-colors-contract`** check (mirroring `reduced-motion-contract`)
gates that the file ships, is imported, and keeps the focus + surface rules — so a
refactor can't silently drop it. Deep per-component high-contrast tuning (selected-state
visuals, an HCM render test) is deferred to Phase 2.4. **This completes Phase 1 (harden
the core): all 113 components are typed, tested, a11y-gated, contrast-gated, and
high-contrast-safe.**

## 2026-07-23 — verify-a11y expansion + 5 a11y fixes it surfaced (Phase 1.3, part 2)

Grew the accessibility-contract verifier from **53 → 74 cases** (`scripts/verify-a11y.mjs`), covering
core interactive primitives (Button, IconButton, Input/Textarea/Select incl. error states, Slider,
TagInput, FileDropzone), nav (Breadcrumb, Sidebar), progress (ProgressBar, Stepper, ConfidenceMeter),
and conversation (SeekComposer, PromptSuggestions) — each authored from real SSR output.

Authoring the cases surfaced **5 real a11y gaps, all fixed**:
- **ProgressBar** had no semantics at all → now `role="progressbar"` + `aria-valuenow/min/max` +
  optional `label` (its siblings ProgressRing/UsageMeter already did this).
- **Stepper** → list semantics + `aria-current="step"` + a per-step accessible name.
- **IconButton** couldn't carry its own accessible name (title-less usage announced the raw icon slug)
  → new `label` prop sets `aria-label`.
- **Input / Textarea / Select** never associated their error text → the error `<span>` now has an `id`
  + `role="alert"`, and the control gets `aria-describedby` + `aria-invalid` when `error` is set.
- **FaqItem** toggle had no `type` → `type="button"` (was submitting inside a `<form>`).

All ARIA-only (no visual change; the visual gate is unaffected). `Tooltip` was intentionally left to the
Playwright interaction suite — its `role="tooltip"`/`aria-describedby` only exist after hover, so there's
nothing to assert at SSR. Remaining Phase 1.3: `forced-colors` (Windows high-contrast).

## 2026-07-23 — Programmatic WCAG contrast checker + on-tint AA fixes (Phase 1.3, part 1)

Adds the **6th verifier**, `scripts/verify-contrast.mjs` — a dependency-free WCAG-AA contrast gate.
It parses `tokens/colors.css` into per-theme token maps (root → theme override, `var()` resolved),
composites rgba tints to opaque over their real backdrop, and asserts the 66 foreground/background
pairs components actually render — body text on surfaces, Banner/Callout copy, and Badge/Chip on-tint
labels — across light / marketing-dark / app-dark at 4.5:1 (text) / 3:1 (large). Wired into
`verify.yml` and CONTRIBUTING; run `node scripts/verify-contrast.mjs` (or `--audit` for the full table).

It immediately caught 13 real sub-AA pairs, all now fixed:
- **On-tint label ramp:** darkened `--text-on-tint-brand`/`--text-on-tint-info` in light to clear AA on
  their tints (same hue, minimal), and gave marketing-dark its own lifted `--text-on-tint-*` shades
  (mirroring app-dark) so deep light-theme shades no longer sit on the low-alpha dark fills.
- **Chip:** success/danger labels now use `--text-on-tint-success`/`--text-on-tint-danger` (were raw
  `-500`, 2.3–3.3:1); the selected pill is ink-on-orange (was white-on-orange, 2.44:1 → 8.35:1).

Note pixel visual-regression can't catch small-text color shifts (they fall under the 2% tolerance) —
this is exactly the gap the token-level checker closes. Remaining Phase 1.3: expand `verify-a11y` past
its 53 cases and add `forced-colors` handling.

## 2026-07-23 — Visual regression gated in CI (Phase 1.4a)

Completes the #30 follow-up: the tri-theme visual suite is now a standing CI gate, not local-only.
- **`visual` job** in `.github/workflows/verify.yml` runs `tests/visual.spec.js` in the version-pinned
  Playwright container (`mcr.microsoft.com/playwright:v1.61.1-jammy`, matched to the lockfile so the
  preinstalled browsers + font stack are deterministic) against committed `*-linux.png` baselines. The
  diff report is uploaded as an artifact on failure. A re-introduced marketing-dark Banner regression is
  now a red check, not a manual browser pass.
- **`.github/workflows/update-visual-baselines.yml`** (`workflow_dispatch`) regenerates the Linux
  baselines in the *same* container and commits them back to the branch — the "accept a new look" button
  for when a visual change is intentional.
- Seeded `gallery-{light,app-dark,dark}-visual-linux.png` (in that container; no Docker locally, so a
  temporary branch-scoped push trigger bootstrapped them, since `workflow_dispatch` requires the file on
  the default branch first). `*-darwin.png` retained for local `npm run test:visual`.

## 2026-07-23 — Playwright harness — interaction tests (CI) + tri-theme visual regression

Phase 1.4. Stands up `tests/` on Playwright, with a permanent tri-theme harness (`tests/harness.html`) —
the gallery that caught the marketing-dark Banner bug, made permanent — and two suites:
- **interaction** (`tests/interaction.spec.js`) — OS-independent behaviour: SegmentedControl roving-radiogroup
  arrow nav, Switch (native input) + OfferSwitch toggles, and Button hover-state (which guards the
  `usePress` refactor). A new CI job runs these on every PR (`npm ci` → install Chromium → run).
- **visual** (`tests/visual.spec.js`) — light / app-dark / marketing-dark screenshot regression, with
  committed baselines (platform-suffixed). Run locally with `npm run test:visual`.

Adds `@playwright/test`, `playwright.config.js`, and a tiny static server (`scripts/serve-tests.mjs`).
**Follow-up (Phase 1.4a):** ✅ shipped in #31 — the visual snapshots now gate CI (Linux baselines seeded
in the CI Playwright container). See the Phase 1.4a entry above.

## 2026-07-22 — Type-check completeness — `tsc --noEmit` now gates the `.d.ts`

Finishes Phase 1.2. Adds a minimal `package.json` + `tsconfig.json` (typescript + `@types/react@18`,
with `node_modules` git-ignored) and folds a real `tsc --noEmit` over all 113 `.d.ts` into
`scripts/verify-types.mjs` — it runs the type-check when the toolchain is installed and skips (not
fails) otherwise, so a bare `node scripts/verify-types.mjs` still gives the presence/consistency
guarantee without an install. CI now runs `npm ci` (npm-cached) before the verifiers, so every PR
type-checks the declarations. All 113 `.d.ts` type-check clean; `@types/react@18` keeps the global
`JSX.Element` the declarations use.

## 2026-07-22 — Type completeness — 113/113 components typed + a `verify-types` gate

Phase 1.2 of `ROADMAP.md`. Authored the **21 missing `.d.ts`** (app / charts / trust — the complex
components: DataTable, CommandPalette, FilterBar, the 9 charts, DecisionLog, RecommendationCard, …), so
**all 113 components now ship a TypeScript declaration**. Types match the real props — precise unions,
callback signatures, named sub-shape interfaces, index signatures for dynamic-key data — cross-checked
against each component's `.jsx` and its `verify-components` sample props. Adds a **5th verifier**,
`scripts/verify-types.mjs`: fails if any component lacks a sibling `.d.ts`, or if a `.d.ts` doesn't
declare the component it types. Dependency-free and wired into CI. (Full `tsc --noEmit` type-resolution
needs `@types/react` in CI — noted as a follow-up.) Authored via a fan-out workflow (one agent per group).

## 2026-07-22 — Shared interaction primitive — `usePress` / `isFocusVisible`

Phase 1.1 of the expansion plan (`ROADMAP.md`). Extracted the hand-rolled press/hover/focus state
that ~7 components duplicated — and the `:focus-visible` detection block that was copy-pasted verbatim
in four — into one internal hook, `components/hooks/usePress.jsx`. Each interaction is opt-in
(`{ hover, press, focus }`), so every component keeps exactly the listeners it had before
(behaviour-preserving). Adopted by Button, IconButton, Sidebar, OfferSwitch, JobListingRow and
PriceCard (full `usePress`); SegmentedControl shares just `isFocusVisible` (its focus is per-segment).

Also introduces the design system's first **internal-module** pattern: `build-bundle.mjs` now bundles
`components/hooks/*` into the shared scope for sibling imports but excludes them from the component
list, the namespace, the manifest and the gallery (recorded under `unexposedExports`). The bundle is
"114 source files, 113 components". All four verifiers green.

## 2026-07-22 — Marketing-dark theme — re-map the soft / status tint ramps

Follow-up to the semantic-token migration, caught in a three-theme visual QA. The marketing `dark`
theme re-mapped the semantic tokens but not the raw soft / status tint ramps (`--info-100`,
`--warning-100`, `--success-100`, `--danger-100`, `--orange-50/100`, `--periwinkle-*`, `--gray-*`),
so a component that fills its whole surface with one — e.g. `Banner` — rendered a *light* pastel fill
on the pure-black page, and its white primary text failed contrast. Added the same tint re-map block
`app-dark` already ships to the `[data-theme="dark"]` block, so status/soft fills read as dark
low-alpha bars (matching the Callouts, which use `rgba()` literals). Fixes `Banner` (all four tones)
and makes status chips / badges / alerts consistent on marketing-dark. Token-only change; no
component code touched; all four verifiers green; visually confirmed.

## 2026-07-22 — Semantic-token migration — the component library off the raw ramps

Every component now styles itself with **theme-aware semantic tokens** instead of raw ramp steps
(`--gray-*`, `--orange-*`, `--periwinkle-*`, `--ink-*`), so surfaces re-theme correctly across
`light` / marketing `dark` / `app-dark`. Raw ramps only re-map under `app-dark` (and not at all under
marketing `dark`), so a raw `--gray-100` fill or `--orange-50` tint rendered wrong on a dark page; the
semantic aliases carry the correct per-theme value.

- **159 token swaps across 67 component `.jsx` files** (the whole library minus the already-clean ones).
  Mapped by role: solid accent → `--accent`, hover → `--accent-hover`, focus/active border →
  `--border-focus`, link → `--text-link`, soft fill → `--accent-soft`, grays → `--surface-*` / `--border-*`,
  periwinkle info → `--info-500`, and foreground-on-tint → `--text-on-tint-brand` / `--text-on-tint-info`
  (the last two also lift under `app-dark`, fixing chip/badge/pill text legibility on ink).
- **Priority families made symmetric** — DecisionAlert / RecommendationCard / DecisionLog now use the
  status tokens (`--danger` / `--warning` / `--info` / `--success`) end-to-end instead of a raw orange rail.
- **Legit raw uses preserved** (reviewed): brand-gradient SVG `<stop>`s (Gauge / ProgressRing), the Heatmap
  sequential scale, the DashboardMock fake-dark device frame, DotMatrix's var-name lookup, Button's
  ink-on-periwinkle secondary, the Avatar identity palette, and UsageMeter's `--orange-500` re-scope — each
  carries an inline `raw-ramp-ok` marker or sits in an allow-listed file.
- **New guard** — `verify-craft` gains a `raw-ramp-token` rule that fails if any component `.jsx`
  reintroduces a raw ramp step outside the reviewed allow-list, so this can't silently regress.

All four verifiers green. The migration + an independent adversarial review ran as a fan-out workflow
(one agent per component group, one reviewer per group).

## 2026-07-22 — CI — the four verifiers now gate every PR

Added `.github/workflows/verify.yml` (the repo's first CI). On every pull request and push to
`main` it rebuilds the bundle, fails if the committed `_ds_bundle.js`/`_ds_manifest.json` are stale
(`build-bundle.mjs` is deterministic), then runs `verify-render`, `verify-components`, `verify-a11y`,
and `verify-craft`. A red check blocks the merge — so the render health, ARIA/keyboard contracts, and
craft rules the verifiers guarantee can no longer regress un-noticed. `CONTRIBUTING.md` updated to note it.

## 2026-07-22 — Overlay motion pass — the 4 held interactive items

The behavior-restructuring items held from the component review, done as a careful individual pass.
All four verifiers green (render + the Menu/Drawer/Popover/Tooltip ARIA contracts preserved). Verified
at the render + a11y-contract + code level; a live browser QA of animation feel is still recommended.

- **Drawer** now slides in/out (enter `var(--dur-base)`, exit `var(--dur-fast)`) via a mounted/`exiting`
  lifecycle; the focus trap, Escape, scrim, and `role="dialog"`/`aria-modal`/`aria-labelledby` are unchanged.
- **Popover** grows from its trigger (opacity + `scale(0.98)→1`, placement-aware `transform-origin`) via a
  mount-then-rAF entrance; close stays instant to protect focus handling.
- **Tooltip** gains a ~300ms open-delay plus a shared delay group — once one tooltip is open, siblings open
  instantly (a sweep across an icon row feels connected); `aria-describedby` unchanged.
- **Menu** row highlight now has a single source of truth (`activeIndex`), so keyboard arrow nav paints the
  highlight and a stale mouse tint no longer lingers; roving tabindex + keyboard handlers unchanged.

## 2026-07-22 — Component craft polish + rail reconciliation

The contained half of the emil + impeccable component review, plus the side-stripe rail decision.
13 component fixes, all backward-compatible; bundle rebuilt; all four verifiers green.

### Component fixes
- **StatTile** gains an optional `valence` prop (good/bad/neutral) like KpiCard — decouples the
  delta-pill colour from the arrow direction, so a rising *bad* KPI can read red. Falls back to the
  direction colour when omitted. Adds `StatTile.d.ts`.
- **ConnectionHealthCard** syncing-dot pulse moved off a `setInterval`/`setState` timer (which
  re-rendered the whole card) to a `useId`-scoped CSS `@keyframes` gated on `prefers-reduced-motion`
  (mirrors `SyncStatusBadge`; now also honours a live reduced-motion change).
- **Card** hover-lift is gated to hover-capable pointers — no sticky hover on touch.
- **SeekComposer** focus ring cross-fades a persistent `--gradient-brand` layer's opacity (no
  solid→gradient snap); the send button gains the house `scale(0.98)` press.
- **PromptSuggestions · TagInput · InsightFeedback** gain hover/active/press feedback on their
  hand-rolled pressables, via semantic tokens.
- **DecisionAlert** icon-chip background now tone-matches the priority (glyph + chip read as one family).
- **Callout** action underline cross-fades `text-decoration-color` (the old `color` transition was a no-op).
- **AgentStatus · SankeyChart** motion now uses the `--ease-standard` / `--dur-*` tokens instead of
  the default easing / a raw `160ms`.
- **LineChart** keeps a uniform 3px stroke under non-uniform scaling (`vector-effect: non-scaling-stroke`).
- **Logo** `tone="auto"` adds `loading="lazy"` so the browser can skip fetching the hidden lockup
  (partial, browser-dependent mitigation).

### Rail reconciliation
- `craft-checklist.md`'s side-stripe ban is softened: the tone-matched priority/kind **rail** on
  decision surfaces (`DecisionAlert`, `RecommendationCard`, `ApprovalGate`, `CausalChain`, `Callout`,
  `Banner`) is an accepted Alfred device — the ban is only for a stripe with no systematic meaning.

### Held for a careful pass
- 4 motion-restructure items — `Tooltip` delay-group, `Drawer` slide-in, `Popover` entrance,
  `Menu` highlight source-of-truth — need individual review with browser verification.
- `Logo` colour wordmark — no colour wordmark asset exists yet.

## 2026-07-22 — verify-craft — mechanical craft checks + gradient-text reconciliation

A fourth verifier that turns the checkable half of the new craft guidelines into an enforced gate.

- **`scripts/verify-craft.mjs`** — scans the design system's own source (`.html`/`.css`/`.jsx`)
  for the mechanically-detectable craft violations and fails on any hit: `transition: all`,
  `ease-in` on UI, `scale(0)` entries, hardcoded `cubic-bezier` outside `tokens/`, arbitrary
  `z-index` (999/9999), `outline: none` with no focus replacement, and emoji in source — plus a
  positive check that `tokens/base.css` still ships the global `prefers-reduced-motion` block.
  Green today (359 files, 8 rules), so it acts as a forward regression guard. The subjective
  rules (eyebrow-per-section, layout sameness, copy) stay with the human/five-critic pass.
- **Gradient-text reconciliation.** `background-clip: text` with `--gradient-brand` on short
  display/emphasis text is a committed Alfred brand device (~30 deliberate uses across social,
  decks, heroes), not a slop tell — the checker allows it. `craft-checklist.md` and `anti-slop.md`
  updated from a flat "gradient-text ban" to the nuanced rule (gradient on body copy / as the only
  emphasis everywhere is the tell; gradient on a short display word is on-brand).
- Wired into `CONTRIBUTING.md` (Verify step + pre-sync checklist), `readme.md`, and `SKILL.md` as
  the fourth verifier. Documentation/tooling only — no token, component, or bundle changes.

## 2026-07-22 — Craft & taste — three craft guidelines distilled from external skills

A **craft & taste layer** so on-brand work also clears a real craft bar. The durable principles
of three external design skills — distilled, reconciled to Alfred's committed tokens and voice,
and made self-contained so they survive the claude.ai/design sync (where the source plugins
aren't installed). Documentation only — no token, component, or bundle changes.

### New guidelines (`guidelines/`)
- **`motion-and-animation.md`** — how motion should feel, mapped onto Alfred's real tokens: the
  two `--ease-*` curves (standard ease-out / rare emphasized overshoot) and three `--dur-*`
  durations bound to press/dropdown/modal, the "should this animate at all?" frequency test,
  component patterns (scale-on-press, origin-aware popovers, tooltip skip-delay, transitions over
  keyframes), transform/opacity + WAAPI performance, and the note that `base.css` already owns
  `prefers-reduced-motion`. Distilled from Emil Kowalski (animations.dev).
- **`anti-slop.md`** — how to stay off the AI-generated tell list while staying 100% on brand:
  the VARIANCE/MOTION/DENSITY dials with Alfred presets, layout-diversity rules, eyebrow
  rationing, machined depth (nested enclosures + concentric radii + ink-tinted shadows), real
  assets over div-fakes (Alfred's own icon set, never emoji), quantified content, and a
  pre-flight check. Periwinkle + the brand gradient are carved out of the source's "no purple
  glow" rule; the em-dash ban is routed to `voice-and-naming.md` as a voice decision, not
  imported wholesale. Distilled from the taste-skill plugin (13 skills).
- **`craft-checklist.md`** — the pre-ship quality gate: contrast thresholds (reusing
  `--text-on-orange`, `:focus-visible`, KpiCard valence), typographic measure, "cards are the
  lazy answer," all eight interactive states, the absolute bans, hardening against real data, the
  three `verify-*.mjs` scripts as the automated floor, and the impeccable "modes of work" lenses.
  Distilled from the impeccable skill.

### Wiring
- **`SKILL.md`** gains a **Craft & taste** section (pointing to the three docs) and a **Companion
  skills (if installed)** section listing emil-design-eng, impeccable, and all 13 taste skills
  with one-liners + Alfred-fit notes, grouped into useful lenses / alternate-aesthetic
  reference-only / image-gen-only. Framed so claude.ai/design needs nothing extra — the
  principles already live in `guidelines/`.
- **`readme.md`** references the craft guidelines in the Claude Code flow and the file tree.

## 2026-07-13 — The critique pass — five-critic review, everything fixed

A five-lens design review (visual craft · color/a11y · UX/IA · interaction states ·
dark craft) of the workspace, then the full fix list. Both themes.

### Accessibility & color
- **Ink on orange.** New theme-constant token `--text-on-orange` (`ink #02021E`, 8.35:1) —
  every solid-orange fill (Button primary, SegmentedControl, pills, glyphs across 15
  components) drops white-on-orange (2.44:1, AA fail). White stays for gradient + danger
  (`--text-on-brand`); recorded in `LIVE-DRIFT.md` as a deliberate divergence.
- **Valence ≠ direction.** `KpiCard` gains `valence` ("good"/"bad"/"neutral") so falling
  cost metrics (CAC −8%, CPL −14%, wasted spend −31%) finally read green; the arrow alone
  shows direction. Delta chips now use the `--text-on-tint-*` ramp (6.7–8.2:1).
- **Focus you can see.** Global `:focus-visible` is a 2px offset `--border-focus` outline —
  no more radius mutation, no shadow displacement, visible on dark (the old alpha ring
  composited to 1.4:1).
- New `--text-display` tier: display/KPI type at 92% white on app-dark (halation fix), ink
  in light. Real dark shadow ramp (true black, ~5x alpha) so overlays actually float.

### Orange budget & hierarchy
- One solid-orange primary per view; every other CTA is the quiet `subtle` recipe
  (incl. `DecisionAlert`/`NotificationItem` internal actions). Switch tracks on dark:
  visible off state (20% white), ember on state.
- The hero ink panel gets `--surface-ink` + a periwinkle→orange hairline on app-dark —
  the view's one gradient — so the briefing wins the squint test again. Sidebar upsell is
  now a quiet usage card ("412 of 500 Ask Alfred queries" + See plans → Billing); no more
  permanent gradient card, no more nonexistent "Pro" plan.
- `Avatar` default `tone="auto"` hashes names onto a muted tint palette — people lists
  stop being rows of identical orange discs.

### IA, UX & content
- Sidebar grouped: Today / Intelligence / Data / Workspace with eyebrows; distinct inbox +
  memory glyphs; "Alfred Core" → **Memory**, "Seek Alfred" → **Ask Alfred** everywhere.
- Header chrome is real: the search pill is a button with a ⌘K chip that opens
  CommandPalette (wired to nav + ask); the bell opens Decision alerts.
- **Review-before-approve**: alert CTAs open a Modal with the from→to diff, projected
  impact and rollback promise; approving shows Executing + Undo ("I'll confirm in Slack
  when it's live"). "Approve all drafts" is gone.
- Double page headers removed (Notifications, Billing, Team, Memory); unread rows are
  dot + bold, not tinted bands; the delivery matrix has one EMAIL/SLACK/IN-APP header row;
  Settings locked fields are labeled rows ("Managed by your admin") with real dirty-state
  Save/Cancel; content columns center at wide viewports; sentence case + first-person
  voice throughout; one demo fixture (Northwind Labs, priya@northwindlabs.com).

## 2026-07-13 — App dark, quiet pass — color whispers at night

- Retuned `[data-theme="app-dark"]` after first review ("too much"): tint washes
  dropped to ~10% alpha (from 18%), tint text went dusty instead of vivid
  (`--text-on-tint-*`: `#EDA26A / #A9B2E9 / #82CBA4 / #E09193`), the ambient
  glows became embers (~0.10–0.12 alpha, half strength), the warm input cast and
  `--accent-soft` softened, and the primary-button hover glow dimmed
  (`--shadow-brand` override). Solid orange actions keep full strength.
- New semantic token `--surface-ink` for the dramatic ink hero panels (briefing
  bands, first-run): still the deep navy `ink-900` in light, but a quiet raised
  `#1D1D1B` panel on app-dark — the navy splash was the loudest element on the
  dark canvas. `Card tone="ink"` now uses it.

## 2026-07-13 — App dark theme — the product workspace at night

### New theme: `[data-theme="app-dark"]`
- A third theme scope in `tokens/colors.css`, distinct from the marketing `dark` theme:
  the app keeps **Clash Display** headlines/KPIs (no Satoshi swap) and real card elevation
  on the **warm ink ramp** — page/canvas `#0C0C0A`, sunken `#111110`, card `#171715`,
  raised `#1D1D1B` — with white-alpha hairlines and white text tiers.
- Unlike the marketing theme, `app-dark` also re-maps the soft tint ramps
  (`--orange-50/100`, `--periwinkle-50/100`, `--success/warning/danger/info/urgent-100`,
  `--gray-50…200`) to low-alpha ink equivalents so badge, chip, callout and alert fills
  read correctly on dark. Brand primaries, the gradient and `--chart-1…8` never change.
- New semantic tokens in every theme: `--surface-hover` (nav/ghost hover fill),
  `--surface-veil` (translucent blur veil for sticky chrome), `--text-body`
  (`ink-700`-tier long-form copy). Dark-theme `::selection` is now readable (white on
  warm orange alpha).

### New kit: `ui_kits/app-dark/`
- The full 22-screen CMO workspace under `app-dark`, reusing the light kit's screen files —
  the dark twin is a theme attribute, not a fork. White logo lockup via the new optional
  `logoTone` prop on the kit `AppShell`.

### Component & kit hygiene (light rendering unchanged)
- Swept raw ink/white refs to the semantic layer (`--text-primary/-body/-secondary/-muted/
  -placeholder`, `--surface-card`, `--surface-veil`, `--accent-soft`, `--surface-hover`)
  across core, data, overlay, feedback, decision, conversation and marketing components and
  all eight app-kit files, so every component renders on light, marketing-dark and app-dark
  from one source. Intentional ink surfaces (Card `ink` variant, Avatar `ink` tone,
  DashboardMock) and white-on-brand pairs are untouched.

### Docs & registration
- `guidelines/color-dark-app.card.html` specimen; app-dark kit + guideline cards and the
  `App dark` theme registered in `_ds_manifest.json`; readme, SKILL.md and CONTRIBUTING.md
  updated with the two-dark-themes rule (never put marketing `dark` on a product surface).

## 2026-07-04 — Daily-content system — 18 archetype frames for the everyday calendar (34 → 52 frames)

### New frames (all in `social/`)
- **Education set**: `linkedin-tip` (field-notes series), `linkedin-checklist`,
  `linkedin-myth-fact` (struck-through myth vs white fact), `linkedin-comparison`
  (old-way/with-Alfred split), `definition` (1080×1080 "decision dictionary", cross-platform).
- **Engagement set**: `linkedin-question` (ghost-"?" discussion prompt), `linkedin-hot-take`,
  `instagram-story-poll` (designed landing pad for the IG poll sticker), `x-post`
  (1200×675 16:9 statement card for the X feed).
- **Product & promo set**: `linkedin-feature-spotlight` (principle-level memory chips),
  `integration-spotlight` (typographic "Alfred × Partner" lockups — no third-party logos),
  `blog-promo` (pillar-colored, 1080×1350), `linkedin-weekly-recap` (Friday themes).
- **Moments set**: `milestone` (number ships `[BRACKETED]` — real figures only),
  `instagram-story-countdown` (bracketed day count, true on the day it posts).
- **Carousel expansion**: `carousel-slide-checklist`, `carousel-slide-stat` (visible
  citation), `carousel-end` (follow pill + save chip, last dot active) — all pairing with
  the existing cover/slide skeleton.

### Docs
- `social/README.md` — new inventory sections (LinkedIn carousel, cross-platform daily)
  plus a **daily cadence map**: a Mon–Fri archetype rotation with an event-driven row.
- Gallery groups for the carousel system and cross-platform daily set.

## 2026-07-04 — Social platform expansion — Facebook, Instagram, YouTube + LinkedIn depth (15 → 34 frames)

### New frames (19, all in `social/`)
- **LinkedIn +3**: `linkedin-webinar` (live-session invite: date/time/length chips, speaker
  rows, CTA), `linkedin-hiring` (role rows from the careers canon), `linkedin-product-update`
  ("New in Alfred" changelog card; the gradient hairline is its one gradient element).
- **Facebook +5**: `facebook-link` (1200×630 feed/ad link card), `facebook-square` (1080×1080
  brief-teaser with ranked `dailyBrief` items + demo framing), `facebook-story` (1080×1920,
  280px chrome-safe padding), `facebook-cover` (820×312, mobile-safe 640px column),
  `facebook-event-cover` (1920×1005).
- **Instagram +6**: `instagram-announcement`, `instagram-stat`, `instagram-quote` (1080×1080),
  `instagram-insight` (1080×1350 — the P2 SCALE twin of linkedin-insight), `instagram-story`
  + `instagram-story-stat` (1080×1920, safe-zone padded; story survives the reel grid crop).
- **YouTube +5**: `youtube-thumb-episode` / `-demo` / `-stat` / `-webinar` (1280×720, built to
  the ≤ 5-words-at-≥ 120px thumbnail rule) and `youtube-banner` (2560×1440, content inside the
  1546×423 device-safe area).

### Tooling & docs
- `social/index.html` — live gallery of every frame, scaled tiles grouped by platform.
- `scripts/capture-social.mjs` — batch PNG export: reads each frame's exact size out of the
  file, screenshots via headless Chrome (`--scale 2` for @2x); output to gitignored
  `social/_exports/`.
- `social/README.md` — platform-grouped inventory, safe-zone table (stories, reel crop,
  FB cover, YouTube banner), the YouTube thumbnail legibility rule, and the citation rule
  extended with the three vetted stat/source pairs (63% PwC 2025 · 54% + 37% NIQ 2026).
- Guardrails carried into every new frame: one gradient element per view, visible citations
  or Northwind demo framing on all numbers, third-person marketing voice, bracketed
  `[PLACEHOLDER]`s for real people/roles/locations, white logo lockups only.

## 2026-07-02 — Live-site reconciliation + 20x expansion — 86 → 113 components, full GTM surface coverage

### Reconciled to the live site (full crawl of seekalfred.ai)
- **Dark theme now truthfully models live**: pure-black pages, 3%-white cards, white-alpha
  borders, Satoshi as headline AND body on dark (Inter fallback only). New `--urgent-500`
  (#FF3D00). Website kit nav/footer/FAQ/security matched to live (E902 AI Labs entity,
  Integrations link, 7 FAQ items, live column structure).
- `ui_kits/website/LIVE-DRIFT.md` — the adopted-vs-defect register (two-orange drift, mint
  fallbacks, Framer-blue links, forced Title Case, unicode checkmarks: documented, NOT adopted).
- `guidelines/voice-and-naming.md` — verified canon: Alfred Core, module names + slogans, the
  6+6 agents, tier pricing (₹19,900/₹49,900/₹99,900 · $239/$599/$1,199), verbatim boilerplate,
  marketing-third-person vs product-first-person voice rule.

### Expansion — 27 new components
- **Marketing conversion set**: EyebrowBadge, DotMatrix, OfferSwitch, PriceCard,
  IntegrationCard, CategoryCountBadge, Countdown, AvatarStack, CapabilityTicker,
  AnimatedCounter (SSRs at final value — fixes the live 0% counter defect), JobListingRow,
  ModuleStatusCard, DashboardMock.
- **Glass-box & admin set**: ProvenancePanel, InsightFeedback, ReasoningState,
  ConnectionHealthCard, SyncStatusBadge, UsageMeter, UpgradeModal, AuditLogRow, MemoryCard,
  ModuleSwitcher, TeamMemberRow, BillingPlanCard, NotificationPref, StateBlock.

### Expansion — surfaces
- **Sections 11 → 27** (`SectionsD–F.jsx`): SecHero (default/waitlist/product), SecStatement,
  SecClosingCTA, SecFaq, SecSecurityGrid, SecTeamGrid, SecValuesGrid, SecCareers,
  SecStoryEditorial, SecContactSplit, SecIndustryCards, SecAgentShowcase, SecEnterpriseBand,
  SecStackDiagram, SecTimeline, SecSourcedStats (citations built in).
- **Pages (new)** — 13 full-page templates in `templates/pages/`.
- **App kit 12 → 22 screens** (`Screens3–4.jsx`, routed): ConnectionFlow, ConnectionHealth,
  FirstRunWaiting, NotificationsCenter, AlertDetail (provenance + approval), SettingsProfile,
  TeamPermissions, BillingPlans, MemoryCore, AuditLog.
- **Email system (new)** — `templates/email/`: shell + block library + 19 templates
  (product alerts/digest/reconnect/approval, onboarding 0–3, waitlist/nurture/launch/
  newsletter, verify/magic-link/invite/reset/dunning/NPS).
- **Collateral (new)** — `templates/collateral/`: A4 print theme + one-pagers, 4 battle
  cards, security pack, pilot plan, case-study template, interactive ROI calculator.
- **Social (new)** — OG system, LinkedIn card set, profile kits, brief-of-the-day frame,
  carousel + blog-hero systems.
- **Canonical demo data (new)** — `data/demo-data.json` (Northwind Labs): the single
  fake-data source; the no-fabricated-proof rule enforced across every surface.

### Verification
- All 113 components render clean; 53 a11y contracts hold; all 57 kit/section/screen
  surfaces render clean (verify-render now covers the website kit + new files);
  adversarial 5-lens review pass (pages/emails/collateral/product/functional).

## 2026-07-02 — Accessibility hardening, token scales & 9 new primitives — 77 → 86

### Added
- **9 primitives.** `Accordion`, `Combobox` (full ARIA 1.2 combobox, forwarded input ref),
  `TagInput`, `NumberInput` (spinbutton), `Kbd`, `Divider`, `Spinner` in `core`; `Callout`
  (Alfred's inline insight aside, distinct from Banner) in `feedback`; `ProgressRing` (gradient
  arc, Clash center value) in `data`. All token-driven, both themes, keyboard-complete.
- **Token scales.** Z-index ladder `--z-base…--z-tooltip` (the stacking contract — no more magic
  numbers), categorical data-viz palette `--chart-1…8` (+ a Colors specimen card), theme-aware
  `--overlay-scrim`, `--surface-tooltip`/`--text-on-tooltip`, and `--opacity-disabled`. Exported
  to tokens.json (new `zIndex`/`opacity` groups), the Tailwind preset (`z-*`, `chart-*`) and
  Framer styles.
- **Accessibility verifier.** `scripts/verify-a11y.mjs` server-renders the interactive set and
  asserts 26 ARIA/semantics contracts (focus-trap wiring, live regions, combobox pattern,
  aria-sort, roving roles) so refactors can't silently drop them.
- 2 preview cards (core primitives, feedback status) + the data-viz palette specimen.

### Changed
- **Focus management.** `Modal`/`Drawer` now trap focus, close on Escape, restore focus on close,
  and wire `aria-labelledby`; backdrops use `--overlay-scrim`.
- **Keyboard navigation.** `Menu` (arrows, Home/End, 500ms typeahead, additive `disabled` item
  prop), `Tabs` (real tablist + roving tabindex), `RadioGroup`/`SegmentedControl` (radiogroup
  semantics + arrow movement), `SearchInput`/`CommandPalette` (ARIA combobox with
  `aria-activedescendant`, Home/End), `DataTable` (correct `aria-sort`, labelled row selection),
  `Pagination` (nav landmark, `aria-current`).
- **State semantics.** `Switch`/`Checkbox` ride hidden native inputs (Space toggles, state
  announced); `Toast`/`Banner` are real live regions (danger → `role="alert"`); `Tooltip` wires
  `aria-describedby` and uses the tooltip surface tokens.
- **API.** `Input`, `Textarea`, `Select`, `SearchInput` (+ new `Combobox`, `NumberInput`,
  `TagInput`) forward refs to their inner elements. Disabled opacity unified on
  `--opacity-disabled`. All changes additive — no breaking API changes.
- **Charts.** All categorical palettes consume `--chart-*`; fixed the `Legend` order bug so
  auto-colored legends match their charts (both cycle the same 6 tokens).
- **Tooling.** `gen-tokens.mjs` now parses `tokens/*.css` as the source of truth and syncs the
  manifest token list (183 tokens); `verify-components.mjs` no longer skips forwardRef
  components — all 86 render clean, plus the kits via `verify-render.mjs`.

## 2026-06-26 — Conversation, decision-intelligence & input components — 64 → 77

### Added
- **AI conversation kit (4, new `conversation` group).** The flagship "Seek Alfred" surface as real
  components: `SeekComposer` (the prompt box — gradient focus ring, send glow, starter chips),
  `AlfredMessage` (a turn with inline `[n]` citations + an attached `SourceTrace`), `ThinkingTrace`
  (agentic reasoning steps, made visible), and `PromptSuggestions` (the empty-state nudge).
- **Decision-intelligence primitives (4, new `decision` group).** `ScenarioSimulator` (drag a lever,
  re-project the outcome live with confidence), `GoalPacing` (attainment + on-pace marker + projected
  landing), `ApprovalGate` (the human-in-the-loop pause: approve / modify / decline), and
  `AnomalyFlag` (a pulsing "Alfred flagged this" marker for any metric).
- **Input & feed primitives (5).** `Textarea`, `SearchInput` (with a results dropdown) and
  `FileDropzone` in `core`; `ActivityTimeline` and `NotificationItem` in `data`.
- 4 preview cards, 13 new `*.prompt.md` docs, and `.d.ts` contracts for all 13.

### Notes
- All 77 components render clean via `scripts/verify-components.mjs` (sample props added); the UI kits
  still pass `scripts/verify-render.mjs`. New components reuse existing ones (Slider, ConfidenceMeter,
  Button, Badge, Avatar, SourceTrace) and stay fully token-driven, so they theme on the light app and
  the dark site unchanged.

## 2026-06-25 — Tier 1 component expansion (charts, trust, app) — 42 → 64

### Added
- **Data-viz depth (9 charts).** A real plot foundation — `AreaChart` (multi-series, y-axis
  ticks, gridlines, legend) + `Legend`, plus `StackedBarChart`, `Heatmap`, `GaugeChart`,
  `WaterfallChart`, `BulletChart`, `SankeyChart`, `ScatterChart`. Charts now ship a categorical
  palette and axes/gridlines/legends — the decision-intelligence kit the product needs.
- **Trust primitives (6).** The "no black box" set: `ConfidenceMeter` (causal confidence),
  `SourceTrace` (where an insight came from), `RecommendationCard` (the draft → approve → act
  loop), `DecisionLog` (audit trail), `DataFreshness` (stale-data guardrail), and `CausalChain`
  (the cause → effect → impact signature of the Causal Reasoning Engine).
- **App connective tissue (7).** `Sidebar`, `PageHeader`, `DataTable` (sortable), `FilterBar`,
  `DateRangePicker`, `StatTile` (KPI + inline sparkline), and `CommandPalette` — the flagship
  "Seek Alfred" surface as a real component.
- Preview cards for each group; 22 new `*.prompt.md` docs; new `trust`/`app` source groups.

### Notes
- All 64 components render clean via `scripts/verify-components.mjs` (sample props added) and were
  render-checked at the pixel level. Built with a hand-authored chart foundation + exemplar, then a
  multi-agent workflow for the fleet, then an SSR render/fix pass.

## 2026-06-25 — Presentation deck library (16 decks)

### Added
- **`deck.css`** — a shared on-brand 16:9 slide-layout library (`templates/deck/deck.css`):
  cover, section divider, statement, agenda, content+stat, metric grid, process steps,
  comparison, table, quote, timeline, big-stat band, CTA, integration wall, tinted icons.
  Pairs with the existing `deck-stage.js` runtime + `ds-base.js`.
- **16 ready-to-present decks** (`templates/decks/`), grounded in the product-marketing source
  and verified on-brand (sentence case, no emoji, sourced stats):
  - **Marketing (5):** platform vision · product overview · webinar (the end of the dashboard
    era) · category POV (decision vs business intelligence) · brand & messaging guide.
  - **Sales (6):** pitch · business case & ROI · competitive (why Alfred) · product demo ·
    security & trust · pricing & packaging.
  - **Operations (5):** onboarding & implementation · QBR template · internal all-hands ·
    integrations runbook · customer success playbook.
- **`templates/decks/index.html`** — a gallery linking all 16 decks by function.

### Changed
- Gallery `index.html` regenerated (50 preview cards); new **Decks** group in `gen-index.mjs`;
  17 deck cards registered in `_ds_manifest.json`. Docs updated (SKILL/readme/map).

## 2026-06-25 — App kit completes the product + onboarding kit

### Added
- **Four flagship app screens** (`ui_kits/app/Screens2.jsx`), so the workspace now covers all six
  product capabilities: **Daily Briefing** (the full "Read less, know more" morning narrative),
  **Seek Alfred** (on-demand answers grounded in sources, with the reasoning trace), **Creative
  Lifecycle** (asset-level fatigue scoring) and **AI Visibility Score** (the unique-to-Alfred AI
  citation tracker). Wired into the sidebar nav + routing in `ui_kits/app/index.html`.
- **Onboarding kit** (`ui_kits/onboarding/`) — a standalone first-run flow on the four-stage
  operating model: connect your stack → calibrate → first brief. Its own `@dsCard`.
- New app nav glyphs (briefing, ask, creative, visibility) in `AppShell.jsx`.

### Changed
- `scripts/verify-render.mjs` now also renders the new screens + onboarding flow (10 kit
  components, all clean).
- Regenerated `index.html` (33 preview cards) and refreshed the `Alfred App` card subtitles.

## 2026-06-25 — Component library expansion + tooling

### Added
- **Build pipeline** — `scripts/build-bundle.mjs` compiles `components/**` → `_ds_bundle.js`
  and syncs the manifest, with topological ordering for sibling imports. Components are now
  drop-in source files; the bundle is no longer hand-maintained.
- **Verification** — `scripts/verify-components.mjs` server-renders every component with
  representative props (alongside `scripts/verify-render.mjs` for the kits). Both fail on any
  React error or warning.
- **18 new primitives** — Select, SegmentedControl, RadioGroup, Chip, Slider (`core`);
  Table, EmptyState, Skeleton, Breadcrumb, Pagination, Stepper (`data`); Modal, Drawer, Toast,
  Tooltip, Popover, Menu (`overlay`); Banner (`feedback`).
- **Chart kit** — Sparkline, LineChart, BarChart, DonutChart, FunnelChart (`charts`).
- **Docs** — a `prompt.md` for every component (39 generated via `scripts/gen-prompts.mjs` with
  parsed props tables + curated examples; 3 hand-authored ones preserved).
- **Token exports** — `tokens/tokens.json` (structured), `tokens/tailwind.preset.cjs` (utilities
  that track the live CSS vars), `tokens/framer-styles.json` (for the Framer sync), via
  `scripts/gen-tokens.mjs`.
- **Accessibility & responsive** — global `prefers-reduced-motion` guard, breakpoint tokens
  (`--bp-sm/md/lg/xl`), ARIA roles on the new components.
- **Preview cards** — Controls, Charts, and Data & feedback.

**Component count: 19 → 42.**

## 2026-06-24 — Live-site alignment + app expansion + first sync

### Changed
- Website/marketing materials retuned to match the live seekalfred.ai site: **Satoshi headlines
  + Inter body** on **warm near-black inks**, scoped to `[data-theme="dark"]`. The light app,
  slides and deck are unchanged (Clash Display + Satoshi).

### Added
- Expanded the app UI kit into a multi-screen workspace (KPI Cockpit, Spend & ROI, Decision
  Alerts, Integrations, Settings).
- Section-templates library (`templates/sections/`).
- First sync to **claude.ai/design**.
