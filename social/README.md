# Social & OG image system

Every file here is a standalone HTML page at an **exact pixel size** — the page *is* the
asset. Open it, screenshot it at that size, ship the PNG. Everything links `../styles.css`
(tokens + Satoshi/Clash webfonts) and pulls logos from `../assets/logos/`, so keep the
files inside `social/` or fix the relative paths.

**Browse everything at once**: open `index.html` — a live gallery of every frame, scaled
to fit and grouped by platform. **Export everything at once**:
`node scripts/capture-social.mjs` (details under Capture).

## Inventory

### Open Graph & blog

| File | Size | Use |
|---|---|---|
| `og-default.html` | 1200×630 | Site-wide OG fallback — logo, tagline, static dot-matrix band. No slots. |
| `og-page.html` | 1200×630 | Per-page OG — eyebrow (page type) + title (2-line max) + URL footer. |
| `og-blog.html` | 1200×630 | Blog post OG — pillar chip + title + author line. |
| `blog-hero.html` | 1600×900 | Blog hero image system — pillar-colored 16:9 header; also crops cleanly to 1200×630 OG. Set one `.pillar-*` class on `.frame`. |

### LinkedIn (feed cards 1200×1350, carousel 1080×1350)

| File | Size | Use |
|---|---|---|
| `linkedin-stat.html` | 1200×1350 | Sourced-stat card — huge stat + claim + **visible citation**. |
| `linkedin-insight.html` | 1200×1350 | Signal card — mono "SIGNAL DETECTED" eyebrow, Northwind-framed insight + provenance chips. |
| `linkedin-quote.html` | 1200×1350 | Founder-note quote — gradient mark, big quote, name/role. |
| `linkedin-announcement.html` | 1200×1350 | Launch card — eyebrow + headline + one CTA pill. |
| `linkedin-webinar.html` | 1200×1350 | Live-session invite — date/time/length chips, speaker rows (real people — fill the brackets), CTA pill. |
| `linkedin-hiring.html` | 1200×1350 | "We're hiring" card — role rows from the careers canon + CTA. Only list roles that are actually open. |
| `linkedin-product-update.html` | 1200×1350 | "New in Alfred" changelog card — release kicker + three shipped-feature rows. Only list what shipped. |
| `linkedin-tip.html` | 1200×1350 | "Field notes" daily tip — imperative tip + why + Alfred bridge. Principle-level, no numbers. |
| `linkedin-checklist.html` | 1200×1350 | Save-worthy checklist — 4–6 check rows + Alfred bridge. |
| `linkedin-myth-fact.html` | 1200×1350 | Myth (struck through, muted) vs fact (white) — one belief corrected per post. |
| `linkedin-comparison.html` | 1200×1350 | Before/after split — "The old way" vs "With Alfred", three parallel rows a side. |
| `linkedin-question.html` | 1200×1350 | Discussion prompt — big question + comment invite + ghost "?" texture. |
| `linkedin-hot-take.html` | 1200×1350 | POV statement card — a stance, not a stat (numbers belong on the stat card). |
| `linkedin-feature-spotlight.html` | 1200×1350 | One feature, big — sample maps to Alfred Core memory with principle-level memory chips. |
| `linkedin-weekly-recap.html` | 1200×1350 | Friday recap — three editorial themes from the week's briefs. Fill `[WEEK OF]`. |
| `brief-of-the-day.html` | 1200×1350 | "Brief of the day" — recreated mini Daily Brief (Northwind demo data) inside a browser-chrome window. |
| `organisation-brain-01.html` | 1080×1350 | Pre-existing essay-series post ("What is an organisation brain?") + exported PNG; drafts in `_variants/`. |

### LinkedIn carousel (1080×1350 pages — mix and match)

| File | Size | Use |
|---|---|---|
| `carousel-cover.html` | 1080×1350 | Cover (page 1 of N) — series kicker + hook + page dots. |
| `carousel-slide.html` | 1080×1350 | Content slide (pages 2…N) — headline + body; duplicate per page. |
| `carousel-slide-checklist.html` | 1080×1350 | Checklist page — 3–5 check rows, ≤ 6 words each. |
| `carousel-slide-stat.html` | 1080×1350 | Sourced-stat page — stat + claim + **visible citation**. |
| `carousel-end.html` | 1080×1350 | End slide — sign-off, one orange follow pill + neutral save chip, last dot active. |

### Cross-platform daily (work on LinkedIn, Instagram, Facebook and X)

| File | Size | Use |
|---|---|---|
| `definition.html` | 1080×1080 | "The decision dictionary" — term + part of speech + plain-language definition. Series-able. |
| `integration-spotlight.html` | 1080×1080 | "Alfred × Partner" — typographic lockups only (we don't ship third-party logos). |
| `milestone.html` | 1080×1080 | Community milestone — the number ships `[BRACKETED]` and stays so until it's a true figure. |
| `blog-promo.html` | 1080×1350 | Feed-native "new on the blog" — pillar-colored like `blog-hero`; fill `[AUTHOR]`. |
| `x-post.html` | 1200×675 | 16:9 statement card for the X feed — take/announcement/one-liner. |

### Facebook

| File | Size | Use |
|---|---|---|
| `facebook-link.html` | 1200×630 | Feed link / ad creative — eyebrow + 2-line-clamped headline + sub + CTA pill in the footer row. |
| `facebook-square.html` | 1080×1080 | Brief-teaser square — "Three things need you today" + ranked items from `dailyBrief` + the demo-framing line. |
| `facebook-story.html` | 1080×1920 | 9:16 story — content held inside the central band, clear of ~250px story chrome top and bottom. |
| `facebook-cover.html` | 820×312 | Page cover — lockup + tagline held inside the mobile-safe central ~640px column. |
| `facebook-event-cover.html` | 1920×1005 | Event header — session eyebrow + event title + date/time chips, 140px inset all round. |

### Instagram

| File | Size | Use |
|---|---|---|
| `instagram-announcement.html` | 1080×1080 | Launch square — eyebrow + headline + CTA pill. Also valid as a Facebook square. |
| `instagram-stat.html` | 1080×1080 | Sourced-stat square — stat + claim + **visible citation**. |
| `instagram-quote.html` | 1080×1080 | Founder-note quote square — gradient quote mark + attribution. |
| `instagram-insight.html` | 1080×1350 | Signal card at IG portrait (4:5) — the upside twin of `linkedin-insight` (a P2 SCALE signal), demo-framed. |
| `instagram-story.html` | 1080×1920 | 9:16 story / reel cover — safe-zone padded; headline also survives the 1080×1350 reel grid crop. |
| `instagram-story-stat.html` | 1080×1920 | 9:16 sourced-stat story — vertical stat + claim + **visible citation**, safe-zone padded. |
| `instagram-story-poll.html` | 1080×1920 | 9:16 poll background — question + a designed landing pad; place the IG poll sticker on the pad. |
| `instagram-story-countdown.html` | 1080×1920 | 9:16 event countdown — day count ships `[BRACKETED]`, must be true on the day it posts. |

### YouTube

| File | Size | Use |
|---|---|---|
| `youtube-thumb-episode.html` | 1280×720 | Series episode thumbnail — kicker + ≤ 5-word title + ghost episode number. |
| `youtube-thumb-demo.html` | 1280×720 | Product-demo thumbnail — hook left, mini Daily Brief window right (Northwind demo data, tagged). |
| `youtube-thumb-stat.html` | 1280×720 | Sourced-stat thumbnail — giant gradient stat + claim + **visible citation**. |
| `youtube-thumb-webinar.html` | 1280×720 | Live session / replay thumbnail — LIVE chip, speaker avatars (real initials), date line. |
| `youtube-banner.html` | 2560×1440 | Channel banner — everything readable inside the central 1546×423 device-safe area. |

**Thumbnail rule:** YouTube thumbnails render at ~168px wide in suggested videos. Titles
stay ≤ 5 words at ≥ 120px, one accent color, no decoration that dies in the shrink.
Check every copy change at 25% zoom before shipping.

### Profile kit

| File | Size | Use |
|---|---|---|
| `profile-avatar.html` | 400×400 | Avatar mark, dark + light variants on one page — screenshot each `.frame`; sized for the circular crop. |
| `profile-banner-linkedin.html` | 1584×396 | LinkedIn company-page banner — centered lockup; bottom-left avatar safe zone kept clear. |
| `profile-banner-x.html` | 1500×500 | X (Twitter) profile header — same banner system re-set for the 3:1 canvas. |

## Daily cadence map (a starting rotation, not a law)

One primary post a day, rotating archetypes so the feed never repeats itself two days
running. Squares and the definition/integration/milestone cards cross-post everywhere;
X gets the 16:9 `x-post` render of the same idea.

| Day | LinkedIn (primary) | Instagram | Notes |
|---|---|---|---|
| Mon | `linkedin-tip` or `brief-of-the-day` | `instagram-story` | Start the week useful. |
| Tue | `linkedin-stat` / `linkedin-insight` | `instagram-stat` / `instagram-insight` | Proof day — citation or Northwind framing, no exceptions. |
| Wed | carousel (cover → slides → end) | `instagram-story-poll` | The deep-dive + the engagement beat. |
| Thu | `linkedin-myth-fact` / `linkedin-comparison` / `linkedin-hot-take` | `definition` | Opinion day — pick ONE archetype, don't stack takes. |
| Fri | `linkedin-weekly-recap` | `instagram-quote` | Close the loop on the week. |
| As it happens | `linkedin-product-update` · `linkedin-feature-spotlight` · `integration-spotlight` · `blog-promo` · `linkedin-webinar` + `instagram-story-countdown` · `milestone` · `linkedin-hiring` | same, resized | Event-driven — post when true, never on schedule for its own sake. |

## Safe zones (baked into the frames — keep them when editing)

- **Stories (FB + IG, 1080×1920)** — platform chrome overlays the top ~250px (profile row)
  and bottom ~250px (reply/CTA). The frames pad 280px top/bottom; only the background
  texture bleeds.
- **Reel covers** — the profile grid crops to the central 1080×1350; `instagram-story.html`
  keeps its headline inside that crop.
- **Facebook cover (820×312)** — mobile shows only the central ~640px column.
- **YouTube banner (2560×1440)** — TV gets everything, desktop a 2560×423 band, small
  devices the central **1546×423**. All content sits inside that smallest area.
- **Facebook link (1200×630)** — some placements crop toward 1:1; keep critical content
  off the outer 40px.

## Capture

All frames at once (skips `index.html` and multi-frame `profile-avatar.html`):

```bash
node scripts/capture-social.mjs              # → social/_exports/*.png (gitignored)
node scripts/capture-social.mjs --scale 2    # @2x — recommended for LinkedIn/Instagram
node scripts/capture-social.mjs youtube-     # just one platform (filename filter)
```

Or a single frame by hand — headless Chrome, 1× (exact pixels):

```bash
cd designsystem/social
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --hide-scrollbars \
  --window-size=1200,630 \
  --screenshot=og-default.png \
  "file://$PWD/og-default.html"
```

- Use each frame's exact size for `--window-size` (see the inventory tables).
- Crisp 2× export: add `--force-device-scale-factor=2` (platforms downsample cleanly).
- Give fonts a beat if text renders in fallback: add `--virtual-time-budget=5000`.
- Or open the file in a normal browser and use any exact-region screenshot tool at the
  frame size — the frame sits at the origin with zero margin.

## Slot conventions

Parameterized cards carry sample copy that renders as-is. Each replaceable value is:

1. wrapped in an element with `data-slot="<name>"`, and
2. preceded by a `<!-- SLOT: ... -->` comment,
3. with the full slot table in the header comment of each file.

To produce a variant: copy the file, find-and-replace the inner text of each `data-slot`
element (or target `[data-slot="title"]` etc. with a script), screenshot, delete the copy.
Layout is defensive — OG titles hard-clip at two lines (`-webkit-line-clamp: 2`), so keep
titles ≤ ~60–70 characters and re-check the render after any copy change.

**Real people are bracketed.** Speaker/quote slots ship as `[FOUNDER NAME]`, `[HOST NAME]`,
`[ROLE]`, `[LOCATION]` — fill them with real values before shipping; never invent people,
roles or openings.

Working drafts/alternates go in `_variants/` (see the organisation-brain series), keeping
the top level one-file-per-asset.

## The citation rule (non-negotiable)

Alfred has **no public customer metrics**. Two legal shapes for a number on a public card:

- **Real market-level stat → visible citation.** The stat cards (`linkedin-stat`,
  `instagram-stat`, `instagram-story-stat`, `youtube-thumb-stat`) render the `Source:`
  chip next to the claim; swap the number and the citation together or the card doesn't
  ship. Already-vetted pairs in the system:
  - *63% of leaders miss opportunities — decisions take too long* — PwC CMO Survey, 2025
  - *54% of leaders call connecting data sources a major barrier to insight* — NIQ CMO Outlook, 2026
  - *37% of leaders have a centralised data repository* — NIQ CMO Outlook, 2026
- **Demo numbers → framed as demo.** The insight/brief cards (`linkedin-insight`,
  `instagram-insight`, `facebook-square`, `brief-of-the-day`) draw every number from
  `data/demo-data.json` (Northwind Labs) and carry the visible line "Illustrative
  scenario from Northwind Labs, our fictional demo company — not customer results."
  Never trim that line; never invent numbers the JSON doesn't have (add them there first).
  `youtube-thumb-demo` carries the short "Northwind Labs · demo data" tag — put the full
  framing sentence in the video description.

The live site's 90+/$90M/90x band is a documented placeholder — never reuse those numbers
as proof (see `ui_kits/website/LIVE-DRIFT.md`).

## Brand guardrails baked into these frames

- `data-theme="dark"`: pure black pages (`--bg-page`), 3%-white chips/cards
  (`--surface-card`), white-alpha hairlines (`--border-subtle/default`), Satoshi for
  everything (the dark theme maps `--font-display` to Satoshi).
- Orange `#FF8431` = action/accent only; periwinkle for eyebrows and cool accents;
  **one gradient element per view** (hairline, stat clip, quote mark, ambient glow, or
  the color lockup's mark — never several).
- `--urgent-500` carries KILL/anomaly/P1 severity semantics — plus one sanctioned
  extension on these frames: the red **LIVE broadcast badge** on
  `youtube-thumb-webinar.html` (swap it for a date line on replays). `--success-500`
  is SCALE/positive severity only.
- Sentence case everywhere; UPPERCASE only on small tracked eyebrows. No emoji, no
  unicode-symbol icons — inline line SVGs, `stroke="currentColor"`, `stroke-width="1.7"`.
- Voice: these are marketing surfaces — third person about Alfred ("Alfred catches it…").
  First person belongs to human speakers on the quote cards, and to Alfred only on
  product/email surfaces.
- Logos: white lockups only, from `../assets/logos/` — never recolor.
