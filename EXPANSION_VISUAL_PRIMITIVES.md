# Alfred Launch Visual Primitives

Status: EP-201 through EP-215 complete
Registry: [`campaign/primitives.js`](campaign/primitives.js)
Renderer: [`campaign/render.html`](campaign/render.html)

## Visual language

The launch system pairs editorial hierarchy with either real Alfred product proof or a restrained
system illustration. Orange marks action, periwinkle marks intelligence and evidence, and neutral
surfaces carry the narrative. Each master has one ambient gradient field and no decorative mesh,
orb, or generic three-card arrangement.

Light and dark versions share hierarchy, geometry, and proof behavior. They are siblings with
separate surface and contrast decisions, not mechanical inversions.

## Primitive registry

The browser registry exposes 17 reusable treatments:

| Primitive | Purpose |
|---|---|
| `funding-masthead` | Public or restricted funding announcement treatment. |
| `category-lockup` | Signal, evidence, and decision-intelligence category statement. |
| `founder-quote` | Founder quote and founder-letter pull quote. |
| `partner-lockup` | Approved investor, partner, and advisor rail. |
| `market-stat` | Market or demo statistic with source status. |
| `product-window` | Real Alfred interface enclosure. |
| `annotation-rail` | Product feature labels tied to the product window. |
| `comparison` | Before and after transformation. |
| `press-quote` | Publication and press quote treatment. |
| `decision-flow` | Signal to evidence to decision to action sequence. |
| `memory-map` | Alfred Core memory and compounding context visualization. |
| `metric-treatment` | Metric, source, period, unit, and status composition. |
| `countdown` | Launch date and countdown fallback. |
| `event-date` | Event date, time, and replay treatment. |
| `editorial-headline` | Ratio-responsive headline support field. |
| `cta-footer` | Campaign action and URL hierarchy. |
| `legal-block` | Citation, demo-data, confidentiality, and disclaimer hierarchy. |

Every primitive is driven by the generated asset manifest. Funding details only enter the funding
treatment when campaign funding is public. Restricted previews state that details remain restricted.

## Composition rules

### Editorial-led

- Make the headline the largest proof-bearing element.
- Use the decision-flow or editorial-line treatment as structure.
- Keep supporting proof to one approved statement.
- Use this composition for category education, founder perspective, hiring, and launch dates.

### Product-led

- Use a real Alfred component or approved screenshot as the main proof.
- Keep the product title, demo label, and recommendation state visible.
- Use annotations only when they explain a specific interface behavior.
- Do not redraw a product screen to support a claim the product does not make.

### Illustration-led

- Use Alfred Core geometry for memory, provenance, cross-function relationships, and abstract flows.
- Use rounded-square geometry, thin orbital rules, restrained depth, and one orange action node.
- Keep labels semantic. Do not add unexplained network nodes.
- Use product proof instead when an accurate interface can communicate the idea.

## Copy limits

Copy limits are manifest-owned and vary by ratio and copy mode. Short copy targets two to three
lines, medium copy targets four to five lines, and long copy targets five to seven lines on vertical
placements. Compact banners use a single concise statement.

The renderer never scales text down without limit. Content that exceeds its character, word, or line
estimate fails generation or export and must return to editorial review.

## Ratio behavior

- Square and portrait masters use a vertical editorial sequence.
- Vertical story and reel masters preserve top and bottom platform controls through manifest safe
  zones.
- Landscape masters split narrative and proof while anchoring the CTA inside the safe inset.
- Compact banners remove secondary proof and preserve one headline and one action.

All 17 primitives can render in square, portrait, landscape, and vertical placement families through
the shared renderer.

## Misuse

Do not:

- Type a funding amount directly into a template.
- Show a number without a citation or `Northwind Labs demo` label.
- Put a logo or CTA outside the manifest safe zone.
- Replace product proof with generic dashboards.
- use a three-card grid as the default campaign composition.
- Add perpetual decorative motion.
- Remove draft, reviewed, confidential, or embargoed watermarks.
- Treat the light theme as a simple color inversion.
- Use more than one gradient field in an asset.

## Review evidence

`npm run verify:campaign-render` renders every placement shape and every campaign family. It checks
exact dimensions, overflow, font readiness, logo loading, clipping, primitive registry completeness,
and required content containment inside the primary safe zone.
