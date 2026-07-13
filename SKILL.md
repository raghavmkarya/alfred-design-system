---
name: alfred-ai-design
description: Use when designing or building any Alfred AI surface — marketing pages, slides or decks, product UI, mocks, prototypes, emails, or branded assets — or any time you need the brand's colors, type, components, or tokens. Covers both production code and throwaway HTML artifacts. Alfred is a decision intelligence platform for marketing leaders.
user-invocable: true
---

Read `readme.md` within this skill — it is the canonical, full brand + system reference — then
explore the other files (`tokens/`, `components/`, `ui_kits/`, `templates/`) as the task needs.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and
create static HTML files for the user to view. If working on production code, you can copy
assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or
design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_
production code, depending on the need.

## Quick map
- `styles.css` — link this one file; everything is CSS custom properties.
- `tokens/` — colors, typography, spacing/radius/shadow/motion, fonts (@font-face), base defaults.
- `assets/` — `logos/` (color + white lockups), `icons/` (single-color brand glyphs), `fonts/`.
- `components/` — 113 components: brand (Logo, Icon) · core (Button, Input, Textarea, SearchInput,
  FileDropzone, Select, Switch, Chip, Card, Badge, Avatar, Tabs, Accordion, Combobox, TagInput,
  NumberInput, Kbd, Divider, Spinner…) · data (KpiCard, DecisionAlert, ProgressRing, StateBlock,
  Table, Stepper, ActivityTimeline, NotificationItem…) · charts (Area, Stacked, Gauge, Waterfall,
  Bullet, Scatter, Sankey, Heatmap, Legend + spark/line/bar/donut/funnel — all on the --chart-1…8 palette)
  · trust (ConfidenceMeter, SourceTrace, RecommendationCard, DecisionLog, DataFreshness, CausalChain,
  ProvenancePanel, InsightFeedback, MemoryCard — the glass-box set)
  · app (Sidebar, PageHeader, DataTable, FilterBar, DateRangePicker, CommandPalette, StatTile,
  ConnectionHealthCard, SyncStatusBadge, UsageMeter, UpgradeModal, AuditLogRow, ModuleSwitcher,
  TeamMemberRow, BillingPlanCard, NotificationPref) ·
  overlay (Modal, Drawer, Toast, Tooltip, Popover, Menu — focus-trapped, keyboard-complete) ·
  feedback (Banner, Callout) · marketing (EyebrowBadge, PriceCard, OfferSwitch, Countdown,
  AvatarStack, CapabilityTicker, AnimatedCounter, IntegrationCard, CategoryCountBadge, DotMatrix,
  JobListingRow, ModuleStatusCard, DashboardMock + SignalCard, StepFlow, StatBand, FaqItem, AgentStatus) ·
  conversation (SeekComposer, AlfredMessage, ThinkingTrace, ReasoningState, PromptSuggestions) ·
  decision (ScenarioSimulator, GoalPacing, ApprovalGate, AnomalyFlag).
- `data/demo-data.json` — the canonical Northwind Labs demo dataset. Every mock/demo number
  comes from here — never invent proof.
- `ui_kits/app/` — multi-screen Alfred workspace (light): auth → home, daily briefing, Seek Alfred,
  KPI cockpit, spend & ROI, decision alerts, creative lifecycle, AI visibility, integrations,
  settings. Routed from the sidebar; screens in `Screens.jsx` + `Screens2.jsx`.
- `ui_kits/app-dark/` — the same workspace under `[data-theme="app-dark"]`: warm ink surfaces
  (`#0C0C0A / #111110 / #171715`), white-alpha hairlines, Clash Display kept. Reuses the light
  kit's screen files — build a dark app surface by setting the theme attribute, not by forking screens.
- `ui_kits/onboarding/` — standalone first-run flow (light): connect your stack → calibrate →
  first brief, on the four-stage operating model. Single component in `Onboarding.jsx`.
- `ui_kits/website/` — the dark seekalfred.ai marketing site recreation.
- `templates/sections/` — 27 copy-paste marketing section blocks (`window.Sec*`): logo cloud,
  bento, feature split, comparison, pricing, testimonial, integrations, CTA + hero (3 variants),
  statement, closing CTA, FAQ, security grid, team, values, careers, story editorial, contact
  split, industry cards, agent showcase, enterprise band, stack diagram, timeline, sourced stats.
- `templates/pages/` — 13 full-page templates composing those sections: pricing (working
  currency/module/offer toggles), alfred_core, product module, waitlist (+confirmation state),
  contact, about, blog index + article, docs shell, integrations directory, in-development
  module, 404, legal.
- `templates/email/` — the 600px email system: `shell.html` + `blocks.html` + 19 lifecycle,
  onboarding, marketing and transactional templates (inline styles, hex mirrors of tokens).
- `templates/collateral/` — A4 print theme (`collateral.css`) + 12 sales/CS docs: one-pagers,
  4 battle cards, security pack, pilot plan, case-study template, interactive ROI calculator.
- `social/` — 102 pixel-sized frames (open → screenshot, or `node scripts/capture-social.mjs`):
  OG images · LinkedIn cards (stat/insight/quote/announcement/webinar/hiring/product-update/
  tip/checklist/myth-fact/comparison/question/hot-take/feature-spotlight/weekly-recap) ·
  Facebook (link/square/story/cover/event) · Instagram (squares/insight/stories/poll/countdown)
  · cross-platform daily (definition/integration-spotlight/milestone/blog-promo/x-post) ·
  YouTube (4 thumbnails + banner) · 5-part carousel kit · profile kits · blog heroes —
  every feed/OG frame in a dark AND a white twin (`<name>-light.html`, same size/slots;
  Clash headlines + color lockup on light). `social/index.html` is the gallery; safe zones,
  the citation rule and the **daily cadence map** live in `social/README.md`.
- `templates/deck/` — the 16:9 deck runtime (`deck-stage.js`, `ds-base.js`) + the shared
  `deck.css` slide-layout library and the starter deck.
- `templates/decks/` — 16 ready-to-present decks across marketing, sales & operations
  (pitch, ROI, competitive, demo, security, pricing, onboarding, QBR, all-hands, runbook…);
  `index.html` is the gallery. Build new decks from `deck.css` classes.
- `slides/` — presentation templates (cover, index, section divider, content+stat).
- `guidelines/` — foundation specimen cards.

> Verify any kit edits with `node scripts/verify-render.mjs` — it server-renders every kit
> component against the real bundle and fails on render errors or React warnings. Component
> edits: `node scripts/verify-components.mjs` (render health, all 86) and
> `node scripts/verify-a11y.mjs` (the ARIA/keyboard contracts).

## Brand in one breath
Decision intelligence platform for marketing leaders. Warm + premium. **Orange `#FF8431`** = action; **periwinkle
`#A7A7FC`** = cool accent; **ink `#02021E`** = text; white space is the canvas. Signature
**periwinkle→orange gradient** used sparingly. **Clash Display** for headlines, **Satoshi**
for UI/body. Soft corners (12/24/32px), soft diffuse shadows. First-person, chief-of-staff
voice ("I've flagged…", speak to "you"). Sentence case. No emoji.

**Website / marketing materials** mirror the live seekalfred.ai site instead: **Satoshi for
headlines AND body** (Inter fallback) on **pure-black** pages with 3%-white cards and
white-alpha hairlines. This is auto-applied to anything under `[data-theme="dark"]`
(marketing site, section templates, dark cards) — the light app, slides and deck are
unaffected and keep Clash + Satoshi. See `ui_kits/website/LIVE-DRIFT.md` for live defects
we deliberately do not adopt, and `guidelines/voice-and-naming.md` for the naming canon.

**Product app in the dark** uses `[data-theme="app-dark"]` instead — a separate theme that
keeps the app's identity (Clash Display headlines/KPIs, real card elevation) on the warm ink
ramp rather than marketing pure-black. It also re-maps the soft tint fills (`--*-100`,
`--orange-50`, `--gray-50…200`) to low-alpha equivalents so badges, chips and alert fills read
correctly on ink. Never put the marketing `dark` theme on a product surface — it swaps
headlines to Satoshi.

## Components at runtime
Load the compiled bundle and destructure from the namespace:
`const { Button, Card, KpiCard, Icon, Logo } = window.AlfredAIDesignSystem_1ce241;`
Point `Icon`/`Logo` `root` props and asset `<img src>`s at the correct relative path to
`assets/` for the page you're building.
