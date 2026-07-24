# Alfred Social Visual Factory

Status: EP-301 through EP-322 complete
Gallery: [`campaign/gallery.html`](campaign/gallery.html)
Family definitions:
[`data/campaigns/launch-families.json`](data/campaigns/launch-families.json)
Placement definitions: [`data/campaigns/placements.json`](data/campaigns/placements.json)

## Campaign families

The factory defines 15 reusable families:

1. Funding announcement.
2. Category definition.
3. Product proof.
4. Founder perspective.
5. Market problem.
6. Decision-intelligence education.
7. Alfred Core and moat.
8. Product feature.
9. Northwind demo scenario.
10. Press coverage.
11. Hiring and growth.
12. Launch countdown.
13. Post-launch recap.
14. Event and webinar.
15. Retargeting product proof as visual assets only.

The default catalog excludes the funding family while funding remains restricted. An explicitly
acknowledged restricted catalog contains all 15 families.

## Placement coverage

Each family supports:

- LinkedIn portrait and square.
- Meta landscape.
- Facebook square, portrait, story, cover, and event cover.
- Instagram square, portrait, story, and reel cover.
- LinkedIn company and founder banners.

The placement registry contains 14 platform and placement pairs. Every family receives:

- Three compositions: editorial-led, product-led, and illustration-led.
- Three copy modes: short, medium, and long.
- Dark and light treatments.
- Manifest-driven feed, story, profile-grid, banner, cover, and event safe zones where applicable.

This produces 3,528 public-safe variants from 14 families and 3,780 restricted variants from all 15
families. The 42 composition and family combinations provide more than four weeks of unique daily
creative before placement, theme, or copy-mode variations are counted.

## Carousel system

Generation writes
[`campaign/generated/alfred-flagship-launch/linkedin-document-carousel.json`](campaign/generated/alfred-flagship-launch/linkedin-document-carousel.json)
with six deterministic pages:

1. Cover.
2. Narrative.
3. Proof.
4. Product.
5. Quote.
6. CTA.

Each page references a generated campaign asset ID and has a deterministic document-carousel
filename. Content remains linked to the campaign source instead of being duplicated into a carousel
template.

## Crop review

The campaign gallery can show:

- Safe-zone outlines.
- Feed-safe crop previews.
- Story-safe crop previews.
- Reel profile-grid previews.
- Banner, cover, and event-safe previews.

Crop overlays darken excluded regions while keeping the selected safe region at full contrast.
Browser verification checks the logo, headline, and footer against the primary manifest safe zone.

## Batch export

Generate review data:

```sh
npm run campaign:generate
```

Export one family:

```sh
npm run campaign:export -- --family product-proof --preview
```

Export one platform:

```sh
npm run campaign:export -- --platform linkedin --preview
```

Export the complete approved pack:

```sh
npm run campaign:export -- --complete
```

Draft preview exports carry a visible watermark. Distribution exports reject draft, reviewed,
restricted, placeholder, uncited, incorrectly sized, or otherwise unresolved content.

The checked preview export is:

[`campaign/generated/alfred-flagship-launch/previews/alfred-flagship-launch__product-proof__linkedin-portrait__product-led__short__dark__v0_1_0__1x.png`](campaign/generated/alfred-flagship-launch/previews/alfred-flagship-launch__product-proof__linkedin-portrait__product-led__short__dark__v0_1_0__1x.png)

It is exactly 1200 by 1350 pixels and is visibly marked as a draft preview.

## Contact sheet

Generation writes a representative approval sheet at:

[`campaign/generated/alfred-flagship-launch/contact-sheet.html`](campaign/generated/alfred-flagship-launch/contact-sheet.html)

The contact sheet includes every public-safe family and composition. Restricted funding masters
remain outside the default sheet.

## Scope guard

The factory stores visual platform and placement metadata only. It does not contain budgets, bids,
audience targeting, retargeting rules, publishing schedules, or attribution configuration.
