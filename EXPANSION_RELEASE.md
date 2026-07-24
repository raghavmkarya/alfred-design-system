# Alfred Campaign Release and Adaptation Guide

Status: EP-901 through EP-916 complete
Export manifest:
[`campaign/generated/alfred-flagship-launch/export-manifest.json`](campaign/generated/alfred-flagship-launch/export-manifest.json)
Active warnings:
[`campaign/generated/alfred-flagship-launch/release-warnings.json`](campaign/generated/alfred-flagship-launch/release-warnings.json)
Five-critic signoff:
[`campaign/generated/alfred-flagship-launch/review-signoff.json`](campaign/generated/alfred-flagship-launch/review-signoff.json)

## Quality-gate architecture

The campaign module uses the same interface for generation and verification. Content, placement,
family, product, illustration, investor, motion, media-kit, and release records generate browser
masters and machine-readable inventories. Tests observe those outputs through the same seam used by
reviewers and exporters.

The campaign gallery filters by:

- Campaign.
- Family.
- Platform.
- Placement.
- Composition.
- Theme.
- Copy mode.
- Approval state.
- Output type.

The review surface also displays manifest safe zones and platform crop simulations.

## Creating a campaign family

1. Add a family record to
   [`data/campaigns/launch-families.json`](data/campaigns/launch-families.json).
2. Select one primitive from [`campaign/primitives.js`](campaign/primitives.js).
3. State whether the family is sensitive.
4. Reference campaign content IDs. Do not add funding, claims, quotes, dates, or CTAs to the
   template.
5. Confirm the family has editorial-led, product-led, and illustration-led behavior.
6. Generate the catalog with `npm run campaign:generate`.
7. Confirm light and dark parity.
8. Review every placement with safe-zone and crop overlays.
9. Run `npm run verify:campaign`.
10. Add one representative contact-sheet master and request five-critic review.

A new family must add reusable capability. Do not add a family for a color change, one headline, one
event date, or one campaign-specific logo set.

## Adapting a campaign

Preserve these Alfred invariants:

- Product plus editorial composition is the default.
- Product UI is the first proof source.
- Orange marks action.
- Periwinkle marks intelligence and evidence.
- Each asset uses one ambient gradient field.
- Every number has a citation or visible `Northwind Labs demo` label.
- Signal, evidence, decision, and action remain causally connected.
- Light and dark masters share geometry and hierarchy.
- Reduced-motion output preserves the complete message.
- Draft, reviewed, confidential, embargoed, and public states remain visibly distinct.

An adaptation may change approved campaign content, audience emphasis, family selection, placement,
theme, crop, or illustration subject. It may not bypass content approval, hide proof status, imitate
an unsupported product state, or enter targeting and media-buying configuration.

## Generated release evidence

`npm run campaign:release-manifest` records:

- Campaign ID, version, and lifecycle.
- Source fingerprint.
- Catalog asset count.
- Every generated file path.
- File size.
- SHA-256 hash.
- PNG or SVG dimensions where applicable.

`npm run verify:campaign-release` rejects a missing or stale manifest and incomplete file reporting.

Persistent baselines live in:

- [`campaign/generated/alfred-flagship-launch/render-baselines/`](campaign/generated/alfred-flagship-launch/render-baselines/)
- [`campaign/generated/alfred-flagship-launch/motion-posters/`](campaign/generated/alfred-flagship-launch/motion-posters/)
- [`campaign/generated/alfred-flagship-launch/asset-previews/`](campaign/generated/alfred-flagship-launch/asset-previews/)

## Current release warnings

The safe flagship fixture is intentionally not releasable. The warning report currently blocks
distribution because:

- Campaign content is not public.
- Release date is missing.
- Funding remains restricted.
- One or more approval roles lack named assignees.
- Draft placeholders remain unresolved.

These warnings prove the release controls are working. They are not implementation defects.

## Launch-day approval checklist

### Content and authority

- [ ] Replace all bracketed placeholders.
- [ ] Add named approval owners.
- [ ] Approve every headline, CTA, quote, boilerplate, legal line, and contact.
- [ ] Add citations for every company and market fact.
- [ ] Confirm every demo claim says `Northwind Labs demo`.
- [ ] Approve release date, timezone, URLs, and embargo time.
- [ ] Move funding visibility to `public` only after executive, finance, legal, and press approval.

### Product and assets

- [ ] Confirm each product shot matches the current product.
- [ ] Confirm every image has alt text.
- [ ] Confirm founder photography and company description are approved before adding them to the
  public media bundle.
- [ ] Regenerate product crops after any product change.

### Exact-size review

- [ ] Run `npm run campaign:generate`.
- [ ] Run `npm run verify:all`.
- [ ] Review render baselines at native size.
- [ ] Review feed, story, profile-grid, banner, cover, and event crop overlays.
- [ ] Review email in light and dark with images disabled.
- [ ] Review motion at full speed, quarter speed, and reduced motion.
- [ ] Confirm poster frames communicate the complete message.
- [ ] Generate the export manifest after the final source state.

### Five-critic signoff

- [ ] Brand reviewer approves Alfred identity and anti-slop standards.
- [ ] Editorial reviewer approves hierarchy, message, length, and voice.
- [ ] Product reviewer approves product accuracy and demo framing.
- [ ] Accessibility reviewer approves contrast, motion, alt text, and consumption-size legibility.
- [ ] Legal reviewer approves claims, citations, funding, embargo, permissions, and disclaimers.

Record reviewer, timestamp, evidence, and `approved` status in
[`review-signoff.json`](campaign/generated/alfred-flagship-launch/review-signoff.json).

### Distribution

- [ ] Confirm release warnings are empty.
- [ ] Confirm campaign and funding lifecycle are public.
- [ ] Confirm the public gallery contains no restricted family.
- [ ] Export the complete approved pack with `npm run campaign:export -- --complete`.
- [ ] Compare exported filenames and hashes with the signed manifest.
- [ ] Archive the approved contact sheet and release manifest.

## Full verification

Run:

```sh
npm run verify:all
```

The command runs the existing build, type, component, render, accessibility, craft, contrast,
interaction-independent expansion audits, and every campaign-specific browser and manifest gate.

The campaign-specific command is:

```sh
npm run verify:campaign
```

## Quarterly maintenance

Every quarter:

1. Review platform dimensions and safe zones.
2. Compare current assets with real campaign usage.
3. Retire duplicate or low-value families.
4. Refresh product visuals after material changes.
5. Audit investor, press, and marketing claims.
6. Review citation freshness and embargo state.
7. Add illustration or motion only when a reusable pattern emerges.
8. Regenerate catalogs, baselines, inventories, and release documentation.
