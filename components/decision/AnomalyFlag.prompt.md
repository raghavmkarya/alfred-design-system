# AnomalyFlag

A small "Alfred flagged this" marker to pin on any metric, row or chart. A pulsing dot draws the eye; the tone grades the severity (watch → periwinkle, anomaly → orange, critical → danger). Use `inline` for a compact pill beside a value, or the default block row with an optional detail line and trailing value.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `label?` | `string` | — |  |
| `tone?` | `"watch" \| "anomaly" \| "critical"` | `"anomaly"` | Severity. |
| `detail?` | `string` | — |  |
| `value?` | `React.ReactNode` | — | Trailing value, e.g. "−14%" (block layout). |
| `inline?` | `boolean` | `false` | Render as a compact pill instead of a block row. |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { AnomalyFlag } = window.AlfredAIDesignSystem_1ce241;

<AnomalyFlag tone="anomaly" label="Lead quality down 14%" detail="New paid-social audience" value="−14%" />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
