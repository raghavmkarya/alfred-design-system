# PriceCard

Pricing tier card from the live site: tier name in Clash Display, a big price with an optional struck-through anchor price, a badge pill over the top edge, a checklist of features with line-style SVG checks, and a full-width CTA. `highlighted` adds the featured-tier orange treatment (1px orange border + soft orange glow + solid orange CTA).

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `name` | `string` | — | Tier name rendered in Clash Display, e.g. "Growth". |
| `price` | `string \| number` | — | Current price without the currency symbol, e.g. "249" or 249. |
| `anchorPrice?` | `string \| number` | — | Original price rendered struck-through before the price, e.g. "499". |
| `currency?` | `string` | `"$"` | Currency prefix applied to both price and anchorPrice. |
| `period?` | `string` | `"/month"` | Billing period shown after the price. |
| `badge?` | `string` | — | Uppercase pill centered on the top edge, e.g. "MOST POPULAR" or "50% OFF". |
| `features` | `string[]` | — | Feature checklist rendered with inline line-style SVG checks. |
| `cta?` | `PriceCardCta` | — | Full-width call to action at the bottom of the card. |
| `highlighted?` | `boolean` | `false` | Featured-tier treatment: 1px orange border, soft orange glow, solid orange CTA. |
| `footnote?` | `string` | — | Small muted line under the CTA, e.g. the launch-offer terms. |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { PriceCard } = window.AlfredAIDesignSystem_1ce241;

<PriceCard name="Growth" price="249" anchorPrice="499" badge="MOST POPULAR" highlighted
  features={["8 team seats", "500 AI chat queries a month", "Priority support, 1-day SLA"]}
  cta={{ label: "Start with Growth", onClick: () => {} }} footnote="Launch offer — 50% off your first two months." />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
