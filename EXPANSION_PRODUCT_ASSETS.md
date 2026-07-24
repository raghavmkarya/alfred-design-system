# Alfred Product Imagery and Illustration System

Status: EP-801 through EP-811 complete
Asset gallery: [`campaign/assets/index.html`](campaign/assets/index.html)
Asset registry: [`data/campaigns/product-assets.json`](data/campaigns/product-assets.json)
Illustration source: [`campaign/assets/illustrations.svg`](campaign/assets/illustrations.svg)

## Product-shot system

The system contains 12 product-shot masters:

1. Daily Brief.
2. Seek Alfred.
3. KPI Cockpit.
4. Spend Mix.
5. AI Visibility.
6. Creative Fatigue.
7. Anomaly Investigation.
8. Evidence Ledger.
9. Decision Fork.
10. Scenario Simulation.
11. Approval and Action.
12. Decision Audit Trail.

Each product has:

- Desktop crop at 1440 by 900.
- Portrait crop at 1080 by 1350.
- Square crop at 1080 by 1080.
- Motion-ready crop at 1920 by 1080.
- Transparent-background capability.
- Product-specific focus copy.
- Accessibility description.
- Visible `Northwind Labs demo` labeling.
- Source, period, unit, and status footer.

The crop renderer reflows the interface for portrait and square geometry instead of cropping a
desktop screenshot.

## Product accuracy

The masters use Alfred’s real design-system language: sidebar, product header, insight hierarchy,
evidence status, chart patterns, approval action, and provenance footer. They do not claim that demo
values are company proof.

Product content and accessibility metadata live in the registry. A material product change requires
updating that record and refreshing the corresponding visual baseline.

## Illustration family

The source sprite defines 24 vector illustrations:

- Connected business stack.
- Fragmented signals becoming one decision.
- Alfred Core memory.
- Signal detection.
- Root-cause tracing.
- Cross-function intelligence.
- Compounding knowledge.
- Human approval.
- Reversible action.
- Continuous learning.
- Security and trust.
- Data provenance.
- Marketing, sales, finance, operations, and founder modules.
- Empty, waiting, success, and error states.
- Launch celebration.
- Background texture.
- Transition plate.

Generation converts every symbol into a standalone SVG export at:

[`campaign/generated/alfred-flagship-launch/illustrations/`](campaign/generated/alfred-flagship-launch/illustrations/)

## Authored visual rules

All illustrations use:

- Rounded rectangles on an 8-pixel grid.
- A 1.5-pixel neutral or periwinkle rule.
- One surface shadow and one focal elevation.
- Soft upper-left surface lighting.
- Neutral surfaces, periwinkle evidence, and orange action.
- Sparse dot or rule textures.

The family avoids neural brains, glowing orbs, mesh gradients, arbitrary node clouds, and other
generic AI-art conventions.

## Accessibility and exports

Every product shot and illustration has an accessibility description in the asset registry. Gallery
images use alt text, and generated SVG exports carry an accessible label.

Representative raster previews are stored in:

[`campaign/generated/alfred-flagship-launch/asset-previews/`](campaign/generated/alfred-flagship-launch/asset-previews/)

The folder includes a desktop product shot, transparent product cutout, and illustration thumbnail.

## Verification

Run:

```sh
npm run verify:product-assets
```

The gate checks:

- Exactly 12 product-shot records.
- All four crop families.
- All 48 exact-size product renders.
- No document overflow.
- Product-specific titles and alt text.
- Visible demo labels.
- Transparent canvas behavior.
- Between 20 and 24 illustrations.
- One source symbol and standalone SVG export for every illustration.
- Loaded gallery imagery.
- Accessible gallery descriptions.
- Absence of generic AI-art cliché markers.
