# Changelog

Notable changes to the Alfred AI design system. Date-stamped (the system ships as a
synced folder, not an npm package, so there's no semver tag).

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
