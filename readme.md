# Alfred AI — Design System

> **Alfred** is a **decision intelligence platform** — the AI memory powering every
> decision across an organisation. It connects the entire business stack and tells
> leaders what to act on next, as **one intelligence layer across marketing, sales,
> finance and operations**. Beneath every product sits **Alfred Core**, the
> organisational memory that captures every signal, decision and outcome — and the
> context behind them — so no briefing, answer or recommendation ever starts from zero.
>
> In product, Alfred delivers a **daily briefing**, a **unified KPI cockpit**, and
> **real-time decision alerts**, and you can **ask Alfred** anything on demand. The
> first shipping module is **Alfred for Marketing** (six agents); **Alfred for Sales**
> follows, with Finance, Operations and Founders on the roadmap.

This repository is the brand's design system: the typographic and color foundations
(light **and** dark), brand assets (logos + a custom intelligence icon set), reusable
React UI primitives + marketing components, two product UI kits (the workspace app and
the marketing website), and a set of presentation slide templates.

> **Live reference:** [seekalfred.ai](https://seekalfred.ai) — the dark, decision-
> intelligence marketing site whose structure, voice and motifs the `ui_kits/website`
> kit and the marketing components recreate.

---

## Sources

Everything here was reconstructed from materials supplied by the brand owner. Keep
these references in case you have access:

- **Figma — "Alfred Sharing file.fig"** (mounted as a read-only VFS during authoring).
  Key frames used:
  - `Page-1 › Brand-Guideline` (node `1501:3255`) — color, type, logo construction, patterns.
  - `Page-1 › Logo-and-Assets`, `Page-1 › Slide-16-9-*` — logo directions.
  - `Page-1 › PPT-Email-Template` — the slide & email templates recreated in `slides/`.
  - `Login-Screen › Login-screen*` (node `384:5368`) — the auth + onboarding flow.
  - `Icons-and-illustrations` — the custom product icon library (≈250 glyphs) and feature illustrations.
- **Uploaded fonts:** `ClashDisplay_Complete.zip`, `Satoshi_Complete.zip`, `Bricolage_Grotesque.zip`.
- **Uploaded logos:** the `Alfred AI *` / `Alfred_ai_*` SVG + PNG lockups (now in `assets/logos/`).
- **Live site:** [seekalfred.ai](https://seekalfred.ai) (Framer) — source for the expanded
  decision-intelligence positioning, the dark marketing aesthetic, and the signal / step /
  stat / FAQ / agent-reasoning motifs recreated in `components/marketing` + `ui_kits/website`.

> Layer names, copy and imagery inside the Figma are the brand author's content,
> recreated here as faithfully as the source allowed.

---

## Content fundamentals — how Alfred talks

Alfred's voice is that of a **sharp, trusted operator** — a chief of staff, not a chatbot.
It is calm, specific and outcome-led. It does the synthesis so the reader doesn't have to.

- **Person & address.** Speak **to** the user as "you"; Alfred refers to itself as **"I"**
  ("I've flagged two reallocations…", "I reconciled your channels"). This first-person
  framing is core to the "chief of staff" positioning — use it in product copy.
- **Tone.** Confident, concise, quietly expert. Lead with the decision or the number,
  then the reasoning. Never hype, never hedge.
- **Casing.** Sentence case everywhere — headlines, buttons, nav. The wordmark itself is
  lowercase ("alfred ai"). Reserve UPPERCASE for small eyebrows / section labels
  (e.g. `SECTION 02`, `WHY ALFRED`) with wide tracking. The marketing site uses uppercase
  **status eyebrows** as a recurring motif: `ONE SOURCE OF TRUTH`, `SIGNAL DETECTED`,
  `CAUGHT EARLY`, `ALIGNED ACTION`, and live agent states like `ANALYSING CAMPAIGN SPENDS`,
  `SYNTHESISING ROOT CAUSE` (see the `SignalCard` and `AgentStatus` components).
- **Decision-lifecycle framing.** Marketing copy narrates the loop Alfred runs: a **signal**
  is detected → traced to a **root cause** → caught **early** → resolved with **aligned
  action** ("Owners notified, no meeting needed"). Reuse this signal → cause → action arc.
- **Specificity.** Always prefer the concrete: *"Spend is pacing 6% hot — but ROAS is up"*
  beats *"Performance is changing."* Quantify impact (`+$48K in revenue`, `15h saved/week`).
- **Brevity.** Briefings and alerts are scannable: one bold claim, one line of reasoning,
  one action. Buttons are verbs ("Reallocate budget", "Scale campaign", "Talk to sales").
- **No emoji.** The brand does not use emoji in product or marketing UI. Warmth comes from
  the palette and type, not decoration.
- **Examples in the system voice:**
  - Hero: *"The AI memory powering every decision across your organisation."*
  - Briefing: *"Good morning, Priya. Spend is pacing 6% hot — but ROAS is up."*
  - Alert: *"Google Ads over budget — brand campaign exhausts its cap in 4 days. Shift $18K to Performance Max."*
  - Marketing taglines: *"Built for the leaders who decide things."* · *"Read less, know more."*
    · *"Catch it at risk, not at lost."* · *"Seek Alfred."* · *"Decisions, on demand."*

---

## Visual foundations

A **warm, optimistic, premium** system. The signature is a single diagonal gradient from
**periwinkle → orange**, used sparingly as the hero accent against generous white space.

- **Color.** Brand orange `#FF8431` is the primary action / accent. Periwinkle `#A7A7FC`
  is the cool counterpoint (secondary, info, illustration). Ink `#02021E` carries text and
  the dark "spotlight" surfaces. Backgrounds are predominantly **white / near-white**; color
  is an accent, never wallpaper. See `tokens/colors.css`.
- **The gradient.** `--gradient-brand` = `linear-gradient(135deg, #A7A7FC → #FF8431)`. It
  appears in the logo mark, progress bars, avatars, the "Pro" upsell, and full-bleed section
  dividers. Keep it to one gradient element per view; pair with white, not other gradients.
- **Type.** **Clash Display** (display/headings, semibold, tight −0.02/−0.03em tracking) for
  anything expressive — covers, H1–H3, big KPI values. **Satoshi** (text/UI) for everything
  functional — body, labels, tables, captions. **Bricolage Grotesque** is an optional
  editorial accent for marketing surfaces only. See `tokens/typography.css`.
  - **Website / marketing materials are different — they mirror the live seekalfred.ai site:**
    **Satoshi headlines + Inter body.** This swap is scoped to `[data-theme="dark"]` (which only
    website materials use), so it re-skins the marketing site, section templates and dark
    guideline cards while the light product app, slides and deck keep Clash + Satoshi untouched.
- **Backgrounds.** Mostly flat white in product. Auth/hero screens add a soft **ambient glow**
  — a low opacity periwinkle radial top-left + orange radial bottom-right (`--glow-periwinkle`,
  `--glow-orange`) — never a hard gradient. Section dividers go full-bleed gradient with a
  thin white **concave-diamond** line motif (see `slides/section.slide.html`).
- **Light & dark.** The product app is **light**; the marketing site is **dark**. Switch with
  `<html data-theme="dark">` — surfaces, text and (for website materials) the font pairing
  change; orange, periwinkle and the gradient are identical in both. On dark, the page is a
  **warm near-black** (`--ink-950` `#0C0C0A`), cards are `--surface-card` `#171715`, the
  alternating section band is `--surface-sunken` `#111110`, hairlines are warm (`#222220`),
  secondary text is `#CCCCCC`, and the ambient glow is tuned richer — all matching the live
  seekalfred.ai site. Compose dark sections from the same components — they read the aliases.
- **Corners.** Soft and friendly. Inputs/buttons `12px`, cards `24px`, large surfaces &
  the auth card `32px`, pills fully round. Nothing sharp.
- **Cards.** White fill, `1px` hairline border (`--border-subtle`), generous padding (20–28px),
  and a **soft, diffuse, low-contrast shadow** (`--shadow-sm`/`md`). Cards float; they don't
  clutter. A dark `ink` card or a `gradient` card is used to spotlight one hero moment per view.
- **Shadows.** Always soft and vertical (`0 8px 24px rgba(2,2,30,0.08)` family). The primary
  button gets a **warm glow** on hover (`--shadow-brand`). No harsh or neutral-black shadows.
- **Inputs.** Two treatments: peach-tinted fill (`--surface-input`, used on auth) and plain
  white-with-border (used inside the app). Focus draws a warm orange ring (`--shadow-focus`).
- **Motion.** Gentle and quick. Ease-out `cubic-bezier(0.22,0.61,0.36,1)` for most things;
  a slight overshoot (`--ease-emphasized`) for toggles. Durations 120–360ms. Progress bars
  animate their fill. No bounce-heavy or infinite decorative animation.
- **Interaction states.** Hover = subtle fill tint (or darker orange on the primary button +
  glow). Press = `scale(0.98)`. Selected = orange fill / orange-50 background with orange text.
  Disabled = `opacity: 0.5`.
- **Imagery.** Warm and light. Brand illustrations are clean line + flat fills with the orange
  ↔ periwinkle gradient as the highlight (e.g. the onboarding magnifier, the email padlock).
- **Layout.** Roomy. 1920-wide canvases use a `96px` gutter; the app shell is a fixed `248px`
  sidebar + sticky translucent topbar. Let white space breathe.

---

## Iconography

- **Custom glyph set.** Alfred ships its **own** icon library (~250 glyphs in the Figma
  "Icons-and-illustrations" page) purpose-built for marketing intelligence: trends, KPIs
  (ROAS/CAC/CTR/MQL…), alert priorities, integrations (Slack, Salesforce, Looker, Meta…),
  security/governance, and onboarding states. A curated, clean subset lives in `assets/icons/`
  as single-color SVGs. They are **line-style, ~16–24px, single color** — render them through
  the `Icon` component, which uses a CSS mask so any glyph tints to `currentColor` or a brand color.
- **App chrome.** A small, consistent stroke set (home, grid, spend, bell, integrations,
  settings, search, send — 24px / 1.8 stroke / rounded) is defined inline in `ui_kits/app/AppShell.jsx`
  for navigation glyphs the asset library didn't cover. Match that weight if you add more.
- **Integration logos.** Real partner logos (Google Ads, Meta, HubSpot, Salesforce, Slack,
  Looker, etc.) exist in the Figma; pull them in as-needed for an integrations surface — do not
  redraw them.
- **No emoji, no unicode-symbol icons.** Use the SVG set. If a needed glyph is missing, add it
  in the same line style rather than substituting an emoji.
- **Logos.** Full lockup, mark-only, and wordmark — in color and all-white — live in
  `assets/logos/`. Use the white tone only on ink or the brand gradient. The mark alone works
  for avatars / favicons / tight spaces. Never recolor the gradient mark.

---

## What's in here (index)

```
styles.css                 ← global entry point (import this one file)
tokens/
  fonts.css                ← @font-face: Clash Display, Satoshi, Bricolage Grotesque
  colors.css               ← brand + neutral + semantic colors, gradient, glow, dark theme
  typography.css           ← families, weights, scale, line-height, tracking + helpers
  spacing.css              ← spacing / radius / shadow / motion / layout
  base.css                 ← element defaults (body, headings, links, focus)
assets/
  fonts/                   ← woff2 (Clash, Satoshi) + ttf (Bricolage)
  logos/                   ← Alfred lockups (color + white)
  icons/                   ← curated single-color brand glyphs (tint via Icon)
components/
  brand/      Logo, Icon
  core/       Button, IconButton, Input, Checkbox, Switch, Card, Badge, Avatar, Tabs
  data/       KpiCard, DecisionAlert, ProgressBar
  marketing/  SignalCard, StepFlow, StatBand, FaqItem, AgentStatus
guidelines/                ← foundation specimen cards (Colors / Type / Spacing / Brand)
ui_kits/
  app/                     ← Alfred workspace (light), multi-screen: login → briefing, KPI cockpit,
                              spend & ROI, decision alerts, integrations, settings
  website/                 ← seekalfred.ai marketing site recreation (dark)
slides/                    ← presentation templates (cover, index, section, content)
templates/deck/            ← reusable on-brand deck template (Templates picker)
templates/sections/        ← catalog of reusable marketing section blocks (logo cloud, bento,
                              feature split, comparison, pricing, testimonial, integrations, CTA)
SKILL.md                   ← Agent-Skill manifest for reuse in Claude Code
```

**Components** (reusable React primitives, bundled to `window.AlfredAIDesignSystem_1ce241`):
`Logo`, `Icon`, `Button`, `IconButton`, `Input`, `Checkbox`, `Switch`, `Card`, `Badge`,
`Avatar`, `Tabs`, `KpiCard`, `DecisionAlert`, `ProgressBar`, and the marketing set
`SignalCard`, `StepFlow`, `StatBand`, `FaqItem`, `AgentStatus`.

**UI kits:**
- `ui_kits/app/` — interactive Alfred **workspace** (light), now a full multi-screen app routed
  from the sidebar: sign in → **Home** (daily briefing, KPI tiles, decision alerts, Ask Alfred),
  **KPI Cockpit** (8-tile cockpit + performance-trend sparkline + funnel), **Spend & ROI**
  (budget pacing, channel mix, campaign table), **Decision Alerts** (filterable inbox + Alfred's
  ink summary rail), **Integrations** (connected / available source tiles), and **Settings**
  (profile / workspace / notifications / security). Screens live in `Screens.jsx`.
- `ui_kits/website/` — the Alfred **marketing site** (dark): hero, Alfred Core, products
  (Marketing / Sales / Upcoming), how-it-works, outcome stats, security, FAQ, CTA, footer —
  recreating [seekalfred.ai](https://seekalfred.ai) in the brand system.

**Section templates:** `templates/sections/` — a catalog of eight self-contained, copy-paste
marketing **section blocks** (dark) you lift straight into a page: logo cloud, bento capability
grid, alternating feature split, "dashboards vs Alfred" comparison, 3-tier pricing, testimonial,
integrations grid, and a waitlist / CTA band. Each is a registered window component
(`window.Sec*`) composed only from the design-system primitives.

**Slides:** `slides/` — Cover, Index, Section divider (gradient + diamond motif), Content+stat.

---

## Using the system

1. Link the single global stylesheet: `<link rel="stylesheet" href="styles.css">` and use the
   CSS custom properties (`var(--orange-500)`, `var(--font-display)`, `var(--radius-2xl)`, …).
2. For components, load the compiled bundle and read off the namespace:
   `const { Button, Card, KpiCard } = window.AlfredAIDesignSystem_1ce241;`
   (the bundle is generated as `_ds_bundle.js`; load it with a relative `<script src>`).
3. Stay on-brand: orange for action, periwinkle as the cool accent, white space as the canvas,
   Clash for expression + Satoshi for everything else, soft corners and soft shadows, and the
   first-person "chief of staff" voice.
