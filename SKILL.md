---
name: alfred-ai-design
description: Use this skill to generate well-branded interfaces and assets for Alfred AI (an AI chief of staff for marketing leaders), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files.

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
- `components/` — 64 components: brand (Logo, Icon) · core (Button, Input, Select, Switch, Chip,
  Card, Badge, Avatar, Tabs…) · data (KpiCard, DecisionAlert, Table, Stepper…) · charts (Area,
  Stacked, Gauge, Waterfall, Bullet, Scatter, Sankey, Heatmap, Legend + spark/line/bar/donut/funnel)
  · trust (ConfidenceMeter, SourceTrace, RecommendationCard, DecisionLog, DataFreshness, CausalChain)
  · app (Sidebar, PageHeader, DataTable, FilterBar, DateRangePicker, CommandPalette, StatTile) ·
  overlay (Modal, Drawer, Toast, Tooltip, Popover, Menu) · feedback (Banner) · marketing.
- `ui_kits/app/` — multi-screen Alfred workspace (light): auth → home, daily briefing, Seek Alfred,
  KPI cockpit, spend & ROI, decision alerts, creative lifecycle, AI visibility, integrations,
  settings. Routed from the sidebar; screens in `Screens.jsx` + `Screens2.jsx`.
- `ui_kits/onboarding/` — standalone first-run flow (light): connect your stack → calibrate →
  first brief, on the four-stage operating model. Single component in `Onboarding.jsx`.
- `ui_kits/website/` — the dark seekalfred.ai marketing site recreation.
- `templates/sections/` — copy-paste marketing section blocks (logo cloud, bento, feature split,
  comparison, pricing, testimonial, integrations, CTA) — each a `window.Sec*` component.
- `templates/deck/` — the 16:9 deck runtime (`deck-stage.js`, `ds-base.js`) + the shared
  `deck.css` slide-layout library and the starter deck.
- `templates/decks/` — 16 ready-to-present decks across marketing, sales & operations
  (pitch, ROI, competitive, demo, security, pricing, onboarding, QBR, all-hands, runbook…);
  `index.html` is the gallery. Build new decks from `deck.css` classes.
- `slides/` — presentation templates (cover, index, section divider, content+stat).
- `guidelines/` — foundation specimen cards.

> Verify any kit edits with `node scripts/verify-render.mjs` — it server-renders every kit
> component against the real bundle and fails on render errors or React warnings.

## Brand in one breath
AI chief of staff for CMOs. Warm + premium. **Orange `#FF8431`** = action; **periwinkle
`#A7A7FC`** = cool accent; **ink `#02021E`** = text; white space is the canvas. Signature
**periwinkle→orange gradient** used sparingly. **Clash Display** for headlines, **Satoshi**
for UI/body. Soft corners (12/24/32px), soft diffuse shadows. First-person, chief-of-staff
voice ("I've flagged…", speak to "you"). Sentence case. No emoji.

**Website / marketing materials** mirror the live seekalfred.ai site instead: **Satoshi
headlines + Inter body** on **warm near-black** surfaces (`#0C0C0A`/`#171715`). This is auto-applied
to anything under `[data-theme="dark"]` (marketing site, section templates, dark cards) — the
light app, slides and deck are unaffected and keep Clash + Satoshi.

## Components at runtime
Load the compiled bundle and destructure from the namespace:
`const { Button, Card, KpiCard, Icon, Logo } = window.AlfredAIDesignSystem_1ce241;`
Point `Icon`/`Logo` `root` props and asset `<img src>`s at the correct relative path to
`assets/` for the page you're building.
