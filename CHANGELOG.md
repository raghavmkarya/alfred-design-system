# Changelog

Notable changes to the Alfred AI design system. Date-stamped (the system ships as a
synced folder, not an npm package, so there's no semver tag).

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
