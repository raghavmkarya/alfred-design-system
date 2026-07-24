# Alfred Campaign Creation and Approval Workflow

Status: EP-102 through EP-112 complete
Content schema: [`schemas/campaign-content.schema.json`](schemas/campaign-content.schema.json)
Template manifest schema:
[`schemas/visual-template-manifest.schema.json`](schemas/visual-template-manifest.schema.json)
Gallery: [`campaign/gallery.html`](campaign/gallery.html)

## Module seam

The campaign factory exposes one generation seam. A campaign content record and the repository-owned
placement and family definitions enter the module. The module returns a deterministic catalog,
inventory, review gallery, exact-size masters, and export filenames.

Templates never own funding facts, dates, claims, quotes, people, or destinations. They reference
campaign content IDs. This keeps approval and embargo logic local to the campaign module instead of
spreading it across individual visual files.

## Lifecycle

| State | Meaning | Gallery | Distribution export |
|---|---|---|---|
| `draft` | Work is incomplete or contains visible placeholders. | Preview with watermark. | Blocked. |
| `reviewed` | Editorial review is complete but final evidence or authority may be pending. | Preview with watermark. | Blocked. |
| `approved` | Named owners and evidence have approved the content for its declared channels. | Included when not restricted. | Allowed for approved scope. |
| `embargoed` | Content is approved but cannot enter public surfaces before release. | Restricted build only. | Explicit restricted export only. |
| `public` | Content is approved and released for public distribution. | Default gallery. | Allowed. |

Transitions move forward one state at a time. Rejected or stale approval returns the affected record
to `draft`. A public campaign cannot reference restricted or embargoed funding.

## Approval workflow

1. Duplicate the safe campaign fixture and assign a unique campaign ID and semantic version.
2. Add named owners for marketing, executive, finance, legal, product, design, press, accessibility,
   and operations review.
3. Enter headlines, support copy, CTAs, quotes, proof, citations, dates, and legal copy.
4. Classify every proof point. Company and market facts need citations. Northwind demo claims need the
   exact visible label `Northwind Labs demo`.
5. Keep funding visibility `restricted` until finance, executive, legal, and press approvals exist.
6. Run `npm run verify:campaign-content`.
7. Generate the public-safe review catalog with `npm run campaign:generate`.
8. Review exact masters and crop overlays in `campaign/gallery.html`.
9. Record approval evidence and move approved content to `approved`.
10. Export a selected family or platform. Use `--complete` only for the full approved pack.
11. At release, move campaign and funding content to `public`, regenerate, and compare the inventory
    with the signed contact sheet.

## Restricted workflow

Restricted material never enters the default catalog. A restricted reviewer must run:

```sh
npm run campaign:generate-restricted
```

The command requires explicit embargo acknowledgement and writes separate
`catalog.restricted.json`, `catalog.restricted.js`, and `catalog.restricted.csv` files. The public
gallery does not load these files. Restricted rendering uses `campaign/render-restricted.html`.

An export containing restricted content also requires both `--include-restricted` and
`--acknowledge-embargo`.

## Manifest interface

Every generated visual manifest includes:

- Campaign, family, platform, placement, composition, copy mode, and theme.
- Exact width, height, aspect ratio, and supported export scales.
- One or more safe zones with pixel insets and authoring purpose.
- Static or motion output type and poster-frame behavior.
- Required and optional slots.
- Character, word, and line limits for every slot.
- Asset requirements and explicit fallbacks.
- Crop behavior.
- Approval state and sensitivity.
- Deterministic filename and destination.

The current factory produces 3,528 public-safe static variants from 14 families. An acknowledged
restricted build produces 3,780 variants from all 15 families.

## Filename and version convention

Campaign versions use semantic versioning in content and underscore-separated semantic versions in
filenames:

```text
{campaignId}__{family}__{platform}-{placement}__{composition}__{copyMode}__{theme}__v{campaignVersion}__{scale}x.{format}
```

Example:

```text
alfred-flagship-launch__product-proof__linkedin-portrait__product-led__short__dark__v0_1_0__1x.png
```

Changing approved wording, proof, dates, or asset dependencies requires a campaign version change.
Re-exporting identical content at another scale does not.

## Gallery information architecture

The default gallery filters by:

- Campaign.
- Family.
- Platform.
- Placement.
- Composition.
- Theme.
- Copy mode.
- Approval state.

The review surface paginates variants, links to exact-size masters, and can display manifest-driven
safe zones. The generated contact sheet provides one representative master per family and
composition for approval review.

## Copy and crop rules

Short, medium, and long copy limits are calculated from placement geometry. Compact banners receive
the strictest limits. Vertical placements allow more lines but preserve story-safe top and bottom
areas. The generator rejects character, word, and line-estimate overflow before export.

Browser verification checks every placement shape for:

- Exact dimensions.
- Horizontal and vertical overflow.
- Font readiness.
- Logo loading.
- Headline and footer clipping.
- Required content containment inside the primary safe zone.

## Commands

```sh
npm run verify:campaign-content
npm run verify:campaign-factory
npm run campaign:generate
npm run verify:campaign-render
npm run campaign:export -- --family product-proof --platform linkedin --preview
npm run campaign:export -- --complete
```

Draft preview exports carry a visible state watermark. Distribution exports reject draft or reviewed
content, placeholders, missing citations, missing demo labels, incorrect dimensions, and restricted
funding in default mode.

## Validation fixtures

[`data/campaigns/campaign-validation-cases.json`](data/campaigns/campaign-validation-cases.json)
declares valid draft, invalid, Northwind demo, confidential, and embargoed cases. The campaign
content verifier requires all five categories and proves each negative guard produces its expected
failure rather than an unrelated error.
