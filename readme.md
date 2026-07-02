# Alfred AI Design System

A self-contained design system — design tokens, a prebuilt React component bundle, two UI
kits, slide/section templates, and brand assets — packaged to plug directly into **Claude
Code** and **Claude design (claude.ai/design)**. Nothing to build: the bundle, token CSS, and
preview cards are committed ready-to-use.

- One stylesheet entry point: `styles.css` (imports the full token + `@font-face` closure).
- One component bundle: `_ds_bundle.js`, exposed on `window.AlfredAIDesignSystem_1ce241`.
- A component manifest (`_ds_manifest.json`) and `@dsCard` preview cards for claude.ai/design.

---

## Use it with Claude Code

This repo ships as an **Agent Skill** (`SKILL.md`, name `alfred-ai-design`). Once Claude Code
can see it, ask Claude to design anything on-brand and it will load the tokens, components, and
rules automatically.

**Install as a skill** — make the directory discoverable by Claude Code, either by:

- placing/cloning it under a skills path, e.g.
  ```bash
  git clone https://github.com/raghavmkarya/alfred-design-system \
    ~/.claude/skills/alfred-ai-design
  ```
- or keeping it inside a project and pointing your project/CLAUDE.md at it (this repo is
  already referenced that way in the parent workspace).

**Invoke it** — in a Claude Code session:

```
/alfred-ai-design
```

…or just describe what you want ("build a pricing section", "mock a dashboard") in a project
where the skill is loaded. Claude will:

- read `readme.md` + `SKILL.md` for the rules,
- pull values from `tokens/` and components from `_ds_bundle.js`,
- for throwaway artifacts (slides, mocks, prototypes): copy assets out and emit standalone HTML
  that links `styles.css` (and the bundle if it uses components),
- for production code: reuse the tokens/components and match the patterns in `ui_kits/`.

> After editing any UI-kit component, verify with `node scripts/verify-render.mjs` — it
> server-renders every kit component against the real bundle and fails on render errors or
> React warnings.

---

## Install it into your own Claude design (claude.ai/design) project

Everyone uses their **own** claude.ai/design account — this repo is the shared source. The
whole thing is already in the **claude.ai/design upload format**, so there's no build step.

**Easiest — connect this repo when creating a design system.** In claude.ai/design, create a
new design system and point it at this repository's URL:

```
https://github.com/raghavmkarya/alfred-design-system
```

The repo is public and already in upload format, so it imports directly — the prebuilt bundle
(`_ds_bundle.js` → `window.AlfredAIDesignSystem_1ce241`), token CSS (`styles.css` + `tokens/`),
manifest (`_ds_manifest.json`), and `@dsCard` preview cards all come across. No local clone
needed.

**Alternative — sync from a local clone via Claude Code.** If you'd rather push from your
machine (e.g. to make edits first), clone the repo and run `/design-sync` in a Claude Code
session inside it — it creates/updates your project and uploads the same files.

```bash
git clone https://github.com/raghavmkarya/alfred-design-system
```

> The bundled `.design-sync/` folder is the *original author's* project link — not yours. Ignore
> it; your own project gets its own link. (`uploads/` and `scripts/` are source/tooling, not part
> of the design system.)

---

## Use it directly (HTML / React)

If you're not going through a Claude surface, consume it like any static design system:

1. **Tokens / CSS** — link the one entry point and use the custom properties:
   ```html
   <link rel="stylesheet" href="styles.css">
   ```
   ```css
   color: var(--orange-500);
   font-family: var(--font-display);
   border-radius: var(--radius-2xl);
   ```
2. **Components** — load the bundle and destructure from the namespace:
   ```html
   <script src="_ds_bundle.js"></script>
   <script>
     const { Button, Card, KpiCard, Icon, Logo } = window.AlfredAIDesignSystem_1ce241;
   </script>
   ```
   Point `Icon`/`Logo` `root` props and asset `<img src>`s at the correct relative path to
   `assets/` for the page you're building.
3. **Light vs dark** — set `<html data-theme="dark">` to switch surfaces/text to the dark theme
   (pure-black pages, 3%-white cards, Satoshi for headlines and body — matching the live site);
   accent colors and the gradient are identical in both. `ui_kits/website/LIVE-DRIFT.md` records
   what was adopted from the live site vs the live defects deliberately not adopted.

---

## What's in here

```
map.html              ← visual tour of the system + your notes (the live component gallery is index.html)
styles.css            ← global entry point (import this one file)
_ds_bundle.js         ← compiled React components → window.AlfredAIDesignSystem_1ce241
_ds_manifest.json     ← component manifest for claude.ai/design
tokens/               ← colors, typography, spacing/radius/shadow/motion, fonts, base defaults
assets/               ← fonts/, logos/ (color + white), icons/ (single-color brand glyphs)
components/           ← 113 components (brand · core · data · charts · trust · app · overlay · feedback · marketing · conversation · decision) + @dsCard previews
data/                 ← demo-data.json — the canonical Northwind Labs demo dataset (no fabricated proof)
guidelines/           ← foundation specimen cards (color / type / spacing / brand)
ui_kits/app/          ← 22-screen product workspace (light): briefing, Seek Alfred, cockpit, spend, alerts, creative, AI visibility, connections, notifications, Alfred Core memory, team, billing, audit log…
ui_kits/onboarding/   ← standalone first-run flow (light): connect → calibrate → first brief
ui_kits/website/      ← marketing site recreation (dark) + LIVE-DRIFT.md register
templates/sections/   ← 27 copy-paste marketing section blocks (window.Sec* — hero, statement, FAQ, agent showcase, stack diagram, careers, contact…)
templates/pages/      ← 13 full-page templates (pricing, alfred_core, product module, waitlist, contact, about, blog ×2, docs, integrations, in-development, 404, legal)
templates/email/      ← 600px email system: shell + block library + 19 lifecycle/transactional templates
templates/collateral/ ← A4 print theme + 12 sales/CS docs (one-pagers, battle cards, security pack, pilot plan, ROI calculator)
templates/deck/       ← 16:9 deck runtime + shared deck.css slide-layout library + starter deck
templates/decks/      ← 16 ready-to-present decks (marketing · sales · operations) + index gallery
social/               ← OG image system, LinkedIn/X card + profile kits, carousel & blog-hero frames
slides/               ← presentation templates (cover, index, section, content)
scripts/              ← tooling, incl. verify-render.mjs · verify-components.mjs · verify-a11y.mjs
SKILL.md              ← Agent-Skill manifest (name: alfred-ai-design)
.design-sync/         ← claude.ai/design project link + sync notes
```

**Components** (113, on `window.AlfredAIDesignSystem_1ce241`) — **brand** `Logo`, `Icon`; **core**
`Button`, `IconButton`, `Input`, `Textarea`, `SearchInput`, `FileDropzone`, `Select`, `Checkbox`,
`Switch`, `Slider`, `RadioGroup`, `SegmentedControl`, `Chip`, `Card`, `Badge`, `Avatar`, `Tabs`,
`Accordion`, `Combobox`, `TagInput`, `NumberInput`, `Kbd`, `Divider`, `Spinner`;
**data** `KpiCard`, `DecisionAlert`, `ProgressBar`, `ProgressRing`, `Table`, `Stepper`, `Skeleton`,
`Breadcrumb`, `EmptyState`, `StateBlock`, `Pagination`, `ActivityTimeline`, `NotificationItem`;
**charts** `Sparkline`, `LineChart`, `AreaChart`, `BarChart`, `StackedBarChart`, `DonutChart`,
`FunnelChart`, `GaugeChart`, `WaterfallChart`, `BulletChart`, `ScatterChart`, `Heatmap`,
`SankeyChart`, `Legend`; **trust** `ConfidenceMeter`, `SourceTrace`, `RecommendationCard`,
`DecisionLog`, `DataFreshness`, `CausalChain`, `ProvenancePanel`, `InsightFeedback`, `MemoryCard`;
**app** `Sidebar`, `PageHeader`, `DataTable`, `FilterBar`, `DateRangePicker`, `CommandPalette`,
`StatTile`, `ConnectionHealthCard`, `SyncStatusBadge`, `UsageMeter`, `UpgradeModal`, `AuditLogRow`,
`ModuleSwitcher`, `TeamMemberRow`, `BillingPlanCard`, `NotificationPref`; **overlay** `Menu`,
`Modal`, `Toast`, `Drawer`, `Popover`, `Tooltip`; **feedback** `Banner`, `Callout`; **marketing**
`SignalCard`, `StepFlow`, `StatBand`, `FaqItem`, `AgentStatus`, `EyebrowBadge`, `DotMatrix`,
`OfferSwitch`, `PriceCard`, `IntegrationCard`, `CategoryCountBadge`, `Countdown`, `AvatarStack`,
`CapabilityTicker`, `AnimatedCounter`, `JobListingRow`, `ModuleStatusCard`, `DashboardMock`;
**conversation** `SeekComposer`, `AlfredMessage`, `ThinkingTrace`, `PromptSuggestions`,
`ReasoningState`; **decision** `ScenarioSimulator`, `GoalPacing`, `ApprovalGate`, `AnomalyFlag`.

Interactive components ship with their accessibility contracts built in — focus traps and focus
restore in `Modal`/`Drawer`, roving-tabindex keyboard navigation (arrows, Home/End, typeahead)
across `Menu`/`Tabs`/`RadioGroup`/`SegmentedControl`, the ARIA combobox pattern on
`SearchInput`/`Combobox`/`CommandPalette`, live regions on `Toast`/`Banner`, and a shared z-index
ladder (`--z-*`) + theme-aware scrim (`--overlay-scrim`). `node scripts/verify-a11y.mjs` guards
those contracts in CI fashion; charts draw from the tokenized categorical palette
(`--chart-1…8`).

---

## License

Proprietary — all rights reserved. See [`LICENSE`](./LICENSE). Bundled fonts (Satoshi, Clash
Display, Bricolage Grotesque, Inter) are governed by their own licenses; obtain Satoshi and
Clash Display from [Fontshare](https://www.fontshare.com) rather than reusing the copies here.
