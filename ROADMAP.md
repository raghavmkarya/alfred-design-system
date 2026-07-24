# Alfred Design System: Expansion Plan (v1 draft · 2026-07-22)

> A forward roadmap for the next phase of the design system. Written after the craft layer, the
> 113-component review, and the semantic-token migration shipped. Companion to `HANDOFF.md` (session
> resume + flat backlog) and `CHANGELOG.md` (history). This is the **strategic sequencing**: what to
> build next and in what order, with the rationale. Draft for review; adjust the sequencing to taste.

## Next major initiative: visual launch factory

The next major design-system initiative is the Alfred Design System Expansion Project. It turns the
existing library into a reusable visual launch factory, with a complete flagship company and funding
launch as its first milestone. It covers approved campaign content interfaces, campaign manifests,
website and social storytelling, investor and press materials, product imagery, illustration, motion,
and deterministic visual exports. Campaign operations, media buying, budgets, targeting, and
attribution remain outside this repository.

- [`EXPANSION_PROJECT.md`](EXPANSION_PROJECT.md): program strategy, creative direction, architecture,
  scope, deliverables, quality bar, and release model.
- [`EXPANSION_TASKS.md`](EXPANSION_TASKS.md): task IDs, priorities, dependencies, acceptance criteria,
  and milestone checklists.

The expansion program follows the core hardening work and can proceed alongside the remaining token
and distribution roadmap where dependencies permit. EP-004 and EP-006 have confirmed 115 tracked
component sources and resolved the older 113-component count as stale documentation. The supporting
evidence is in [`EXPANSION_AUDIT.md`](EXPANSION_AUDIT.md).

Implementation status as of 2026-07-24: EP-00 through EP-90 are complete and the full repository
verification suite passes. The public flagship release remains blocked by approved company content,
release timing, public funding state, named approval owners, and five-critic signoff. Current
machine-readable blockers live in
[`campaign/generated/alfred-flagship-launch/release-warnings.json`](campaign/generated/alfred-flagship-launch/release-warnings.json).

## Where the system is (honest state)

**Breadth is done.** 113 components across brand · core · data · charts · trust · app · overlay ·
feedback · marketing · conversation · decision; a full token system (now theme-aware after the
semantic-token migration); ui_kits (app / app-dark / website / onboarding); 27 marketing sections +
13 page templates + a 19-template email system + print collateral + 16 decks + 102 social frames;
guidelines (motion, anti-slop, craft-checklist, voice); CI gating 4 verifiers on every PR; and three
distribution channels (synced folder · GitHub Pages · claude.ai/design).

**Depth is the gap.** The inventory shows where the maturity debt sits:
- **Types:** 92 / 113 components have a `.d.ts`; **21 do not**: and they cluster in the *hardest*
  components: `app/` (CommandPalette, DataTable, DateRangePicker, FilterBar, PageHeader, Sidebar),
  `charts/` (Area, Bullet, Gauge, Heatmap, Legend, Sankey, Scatter, StackedBar, Waterfall),
  `trust/` (CausalChain, ConfidenceMeter, DataFreshness, DecisionLog, RecommendationCard, SourceTrace).
- **Tests:** there is **no automated interaction or visual-regression test**: no `tests/`, no
  Playwright. The 4 verifiers are static (render health, prop/state completeness, ARIA contracts,
  craft rules). The overlay-motion QA and the 3-theme QA that caught the marketing-dark Banner bug
  were both *manual browser passes*: valuable, but not codified, so they can silently regress.
- **Consumption:** no npm package / versioned artifact; the runtime is a hand-loaded global bundle.
  Docs are static preview cards, not an interactive props playground.
- **Interaction primitives:** ~9 components hand-roll press/hover/focus state instead of sharing one.
- **Cross-cutting token systems** the migration didn't cover: no density scale, no documented
  elevation system, no RTL / logical-property support, no `forced-colors` (Windows high-contrast).

**Thesis: depth before further breadth.** The library is wide enough. The highest-leverage expansion
now is to make the existing 113 *bulletproof, systematic, and consumable*: then open it to more people
and tools, then grow the expressive/brand surface. Shipping an under-typed, untested DS to npm/Figma
first would bake the debt into external consumers. Harden, then distribute, then expand.

---

## Phase 1: Harden the core (make the 113 bulletproof)

Goal: every component type-safe, interaction-consistent, a11y-complete, and covered by a test that
would have caught the bugs we've been finding by hand.

| # | Workstream | Scope | Verification | Size |
|---|---|---|---|---|
| 1.1 | **`Pressable` / `usePress` primitive** | Extract the hand-rolled press/hover/focus state (~9 components: Button, IconButton, Chip, Sidebar item, Pagination, OfferSwitch, JobListingRow, PriceCard, SegmentedControl) into one hook/wrapper. Keep each component's visuals + the `--dur-*`/`--ease-*` tokens; share only the state plumbing. | 4 verifiers green; press/hover/focus identical before/after (visual QA of the 9). | M |
| 1.2 | **Type completeness** | Author the **21 missing `.d.ts`** (app/charts/trust). Add a 5th check `verify-types.mjs` that fails on any component without a matching `.d.ts` *and* type-checks the whole set (`tsc --noEmit`). Wire into CI. | New verifier green in CI; 113/113 typed. | M |
| 1.3 | **a11y depth + programmatic contrast** | Expand `verify-a11y` beyond today's 53 cases (it missed several bugs the manual review caught); add an automated **contrast checker** (token pairs + on-tint text) and **`forced-colors`** handling. | verify-a11y case count ↑; contrast check fails on sub-AA pairs. | M to L |
| 1.4 | **Test harness (Playwright)** | Stand up `tests/` + Playwright. Codify the two manual passes: **interaction** tests (overlay focus-trap/keyboard, the 4 motion items) and **visual-regression** snapshots **across light / app-dark / marketing-dark** (exactly the harness that caught the Banner bug: make it permanent). | CI runs Playwright; snapshots baselined; a re-introduced Banner-style regression fails. | L |
| 1.5 | **Harden `verify-craft`** | Close the remaining JSX gaps noted in the backlog (inline `outline:"none"` without a focus replacement, camelCase `zIndex:9999`), plus anything Phase-1 work surfaces. | New craft rules bite (prove with an injected violation). | S |

Rationale: 1.1 and 1.2 are already queued and low-risk. 1.4 is the biggest lever: it converts our
expensive manual QA into a cheap standing gate (the marketing-dark Banner bug would have been a red
CI check, not a manual browser session).

---

## Phase 2: Systematize the tokens

Goal: finish the cross-cutting token systems the semantic migration set up but didn't cover, so every
component inherits them consistently: *before* external consumers depend on the token surface.

- **2.1 Density scale**: a `--density-*` / spacing multiplier so tables, app chrome, and forms can go
  compact/comfortable/spacious without per-component overrides.
- **2.2 Elevation system**: document + tokenize the shadow ramp already in use (`--shadow-*`) into a
  named elevation scale (surface → raised → overlay → popover), with the app-dark real-shadow values
  reconciled.
- **2.3 RTL / logical properties**: migrate physical props (`margin-left`, `padding-right`, `left`) to
  logical (`margin-inline-start`, …) and verify a mirrored render. Adds a craft rule to prevent regress.
- **2.4 forced-colors / high-contrast**: pairs with 1.3; ensure components degrade correctly under
  Windows high-contrast.

Rationale: these are consumed by *every* component, so they belong before distribution (Phase 3).
2.1/2.2 are additive and low-risk; 2.3 is a mechanical sweep with a guard rule (same shape as the
raw-ramp migration we just did).

---

## Phase 3: Open the doors (DX + distribution)

Goal: make a hardened, systematic library consumable by more people and tools.

- **3.1 Interactive docs / playground**: replace static preview cards with a props playground
  (Storybook, or a lightweight custom harness reusing the bundle + the `@dsCard` manifest). Live prop
  controls, all states, all three themes, copy-paste usage. This is the single biggest adoption unlock.
- **3.2 npm package + versioning**: publish a real versioned artifact (the deterministic bundle +
  `styles.css` + tokens + `.d.ts`). CHANGELOG already exists; add semver + a release script. Turns
  "copy the synced folder" into `npm i`.
- **3.3 Figma library parity**: use the connected Figma MCP to build/refresh a Figma library that
  mirrors the tokens + components (design-tool parity for designers). Code Connect mapping so the two
  stay linked.
- **3.4 Scheduled sync-drift check**: a cron that diffs `main` against the claude.ai/design project and
  the GitHub Pages build, and flags drift. Removes the manual "remember to sync" step.

Rationale: docs (3.1) unlock adoption regardless of channel and should come first. 3.2/3.3 are the
external channels: worth doing only once the core is typed + tested (Phase 1) so consumers inherit
quality. 3.4 is a small automation that de-risks all channels.

---

## Phase 4: Grow the brand & content surface

Goal: expressive expansion: the parts that make Alfred surfaces feel crafted, not just correct. Less
coupled to the engineering core, so this can run **partly in parallel** with Phases 2 to 3.

- **4.1 Illustration library**: a hand-crafted, branded illustration set in the DS (empty states,
  onboarding, error/success moments), built as a coherent system: *not* one-off AI art. (Long-standing
  intent.)
- **4.2 Brand motion asset(s)**: a signature motion piece (logo/gradient animation, an "Introducing
  Alfred" style moment) tokenized to the motion system.
- **4.3 Icon library expansion**: grow the custom single-color icon set to cover the gaps components
  currently work around; document the drawing grid/stroke conventions.
- **4.4 Data-viz consistency pass**: the 14 charts share the `--chart-*` palette but not interaction,
  legend, tooltip, or a11y conventions. Define one chart interaction/a11y contract and apply it across
  all 14 (this also closes 9 of the 21 missing chart `.d.ts` from 1.2).

Rationale: highest *delight* leverage, lowest *risk*, most parallelizable. 4.4 pairs naturally with the
Phase-1 type/test work on charts.

---

## Progress (as of 2026-07-23)

- ✅ **1.1 `usePress`/`isFocusVisible`** (PR #27): + the DS's first internal-module pattern.
- ✅ **1.2 type completeness** (PRs #28 + #29): all 113 typed; `verify-types` w/ real `tsc --noEmit`; CI `npm ci`.
- ✅ **1.4 Playwright harness** (PR #30): permanent tri-theme harness; **interaction** tests gated in a CI
  job; **visual** regression run locally with committed baselines.
- ✅ **1.4a visual snapshots in CI** (PR #31): `visual` gate runs `tests/visual.spec.js` in the
  version-pinned Playwright container (`mcr.microsoft.com/playwright:v1.61.1-jammy`) against committed
  `*-linux.png` baselines; `update-visual-baselines.yml` (workflow_dispatch) regenerates/re-blesses them
  in the same container. Linux baselines seeded + eyeballed (all 3 themes render with real fonts;
  marketing-dark banners are legible dark bars). All three CI jobs green.
- ✅ **1.3 part 1: programmatic contrast** (PR #33): 6th verifier `scripts/verify-contrast.mjs` (WCAG-AA
  over 66 token pairs × 3 themes, rgba composited to opaque). Caught + fixed 13 real sub-AA pairs (on-tint
  label ramp darkened in light; marketing-dark given lifted `--text-on-tint-*`; Chip success/danger →
  on-tint tokens; Chip-selected → ink-on-orange). Wired into CI. *Pixel visual-regression can't catch
  small-text color shifts (< 2% tolerance): the token checker closes that gap.*
- ✅ **1.3 part 2: verify-a11y expansion** (PR #34): 53 → **74 SSR ARIA-contract cases**; authoring them
  surfaced + fixed 5 real gaps (ProgressBar had no semantics; Stepper no `aria-current`; IconButton no
  settable name; Input/Textarea/Select unassociated error text; FaqItem toggle missing `type`). ARIA-only.
- ✅ **1.3 part 3: forced-colors (HCM) baseline** (PR #35): `tokens/forced-colors.css`: global
  `@media (forced-colors: active)` restoring `:focus-visible` outline (`!important`, beats inline
  `outline:none`) + floating-surface (role) borders, via the semantic hooks components already emit.
  `verify-craft` `forced-colors-contract` gates it. **→ Phase 1 (harden the core) COMPLETE.**
- ✅ **1.5 harden `verify-craft`** (PR #36): `outline-none-no-focus` now catches the JSX `outline:"none"`/
  `outlineStyle` form (its `suppressIf` accepts the DS custom-focus patterns so the 14 legit components
  pass); `arbitrary-z-index` now catches camelCase `zIndex:9999`. Bit 4 real focus gaps (raw `<input>`s in
  ui_kits/templates demos) → fixed by removing the inline `outline:none`.

### Immediate next PRs (in order): **Phase 2: systematize the tokens**
1. **2.1 density scale** (`--density-*` / spacing multiplier: compact / comfortable / spacious).
2. **2.2 elevation system** (name + tokenize the `--shadow-*` ramp: surface → raised → overlay → popover).
3. **2.3 RTL / logical properties** (physical → logical props + a guard rule; same shape as the raw-ramp sweep).
4. **2.4 deep forced-colors** (per-component HCM tuning + selected-state visuals + an HCM render test).
Then **Phase 3** (docs playground, npm, Figma parity, sync-drift cron) and **Phase 4** (illustration,
motion, icon expansion, data-viz consistency).

## The strategic fork (your call)

The plan above is **maturity-first** (Phase 1 → 2 → 3 → 4). Two alternatives if priorities differ:

- **Distribution-first**: jump to Phase 3 (npm + docs) to get the DS into more hands sooner. *Risk:*
  external consumers inherit the 21 untyped components + zero test coverage; harder to change later.
- **Brand-surface-first**: jump to Phase 4 (illustration + motion) for visible polish. *Risk:* grows
  surface area on an under-hardened base; more to keep consistent.

**Recommendation: maturity-first**, but pull **4.1 illustration** forward to run in parallel (it's
asset work, independent of the engineering core) if you want visible progress alongside the hardening.

---

## How each phase ships (unchanged mechanics)

Per `HANDOFF.md`: edit → rebuild `_ds_bundle.js` → 4 (soon 5 to 6) verifiers → branch → PR (push as
`raghavmkarya`) → Claude squash-merges → DesignSync the delta to project `ffaac5ec`. New verifiers get
wired into `.github/workflows/verify.yml`. Large/judgment-heavy phases (types, a11y, RTL) are good
fan-out-workflow candidates (one agent per component group + an adversarial review pass), like the
semantic-token migration.
