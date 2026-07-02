# UsageMeter

Plan-limit meter for billing and settings surfaces. Label on the left, a "used / limit unit" readout on the right, and the brand ProgressBar below. The fill communicates headroom: brand gradient while healthy, solid orange from 80% of the allowance, and danger red once the limit is reached. An optional muted footnote (reset date, upgrade hint) sits under the bar.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `label` | `string` | — | What the meter counts, e.g. "Decision runs". |
| `used` | `number` | — | Amount consumed this billing cycle. |
| `limit` | `number` | — | Plan allowance for the cycle. |
| `unit?` | `string` | `""` | Unit noun appended to the readout, e.g. "runs". |
| `footnote?` | `string` | `""` | Muted helper line under the bar — reset date or upgrade hint. |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { UsageMeter } = window.AlfredAIDesignSystem_1ce241;

<UsageMeter label="Decision runs" used={8400} limit={10000} unit="runs" footnote="Resets 1 Aug — I'll flag you before you hit the cap." />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
