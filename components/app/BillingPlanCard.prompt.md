# BillingPlanCard

Current-plan card for billing settings: a "Current plan" eyebrow, the plan name in Clash Display with the price + period on the right, a renewal + payment-method meta line ("Renews Aug 2 · Visa ·· 4242"), simple used/limit usage rows (no meters — the used figure tints orange at 80% of the allowance and danger at the limit), and a Manage billing / Upgrade plan action pair.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `plan` | `string` | — | Plan name, set in Clash Display, e.g. "Growth". |
| `price` | `string` | — | Formatted price including the currency symbol, e.g. "$299". |
| `period?` | `string` | `"per month"` | Billing period rendered after the price. |
| `renewal?` | `string` | `""` | Renewal + payment-method meta line, e.g. "Renews Aug 2 · Visa ·· 4242". |
| `usage?` | `BillingPlanUsageRow[]` | `[]` | Simple used/limit rows — no meters, just tabular figures. |
| `onManage?` | `(e: React.MouseEvent) => void` | — | Handler for the outline "Manage billing" action. |
| `onUpgrade?` | `(e: React.MouseEvent) => void` | — | Handler for the primary "Upgrade plan" action. |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { BillingPlanCard } = window.AlfredAIDesignSystem_1ce241;

<BillingPlanCard plan="Growth" price="$299" period="per month" renewal="Renews Aug 2 · Visa ·· 4242"
  usage={[{ label: "Decision runs", used: 1840, limit: 2500 }, { label: "Seats", used: 8, limit: 10 }]}
  onManage={() => openPortal()} onUpgrade={() => openUpgrade()} />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
