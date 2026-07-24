# Alfred Investor and Funding Materials

Status: EP-501 through EP-516 complete
Investor system: [`campaign/deck/investor.html`](campaign/deck/investor.html)
Deck source: [`data/campaigns/investor-deck.json`](data/campaigns/investor-deck.json)

## Deck system

The reusable investor system contains 22 slides:

1. Cover.
2. Thesis.
3. Problem.
4. Category.
5. Solution.
6. Product.
7. Workflow.
8. Architecture.
9. Market.
10. Business model.
11. Go to market.
12. Expansion.
13. Competition.
14. Moat.
15. Traction.
16. Pipeline.
17. Retention and unit economics.
18. Financial model.
19. Team.
20. Use of funds.
21. Vision.
22. Appendix and diligence.

Slide content lives in JSON. Updating approved content does not require changing slide layouts.

## Reusable visual patterns

The system includes:

- Market-sizing and financial chart patterns.
- Competitive-positioning maps.
- Alfred Core and product-architecture diagrams.
- Go-to-market and functional-expansion flows.
- Traction, pipeline, retention, and unit-economics chart patterns.
- Team and advisor slots.
- Use-of-funds allocation patterns.
- Appendix and diligence dividers.

Product slides reuse the campaign product-window primitive. Architectural and moat slides reuse the
Alfred Core memory geometry.

## Proof controls

Every market, business-model, competition, traction, pipeline, retention, financial, and
use-of-funds pattern exposes:

- Source.
- Period.
- Unit.
- Proof status.

The draft source contains no company revenue, growth, pipeline, retention, margin, acquisition,
market-size, funding, or allocation metric. Placeholder charts carry the visible label
`Placeholder, not company proof`.

Northwind product demonstrations are visibly marked as demo data and cannot be presented as company
traction.

## Confidential and public modes

Default slides carry a `Confidential · draft` watermark. Public adaptation mode replaces it with
`Public adaptation` and contains no confidential watermark.

Funding amount, round, investor names, financial model, traction, and use-of-funds values remain
absent until the corresponding campaign content is approved for that mode.

## Supporting materials

The same source renders:

- A one-page investor teaser.
- A visual executive summary.
- A confidential data-room cover.
- Data-room section dividers for company, product, market, commercial, finance, security, and legal.
- Public funding-announcement adaptations.

View modes are selected through the investor-system navigation or the `view` and `mode` query
parameters.

## Verification

Run:

```sh
npm run verify:investor-deck
```

The gate checks:

- A slide count between 20 and 24.
- Coverage of every required slide type.
- Source, period, unit, and status on every evidence-bearing pattern.
- Absence of numerical company proof on placeholder slides.
- All 22 confidential watermarks.
- All 22 public-adaptation watermarks.
- No confidential watermark in public mode.
- Teaser, executive-summary, and data-room views.
- Horizontal overflow and browser errors.

Visual snapshots cover the presentation cover and a placeholder traction slide.
