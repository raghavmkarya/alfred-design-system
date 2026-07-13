# KpiCard

A single metric tile for the KPI Cockpit: label, big value, and a trend delta. `direction` drives the arrow glyph only; `valence` drives the chip colour, so a falling cost metric ("CAC −8%") reads as the good news it is.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `label` | `string` | — |  |
| `value` | `React.ReactNode` | — |  |
| `delta?` | `string` | — | Trend delta text, e.g. "+12.4%". |
| `direction?` | `"up" \| "down" \| "flat"` | `"up"` | Arrow glyph only — which way the number moved. |
| `valence?` | `"good" \| "bad" \| "neutral"` | derived | Whether the move is good news — colours the chip independently of direction. Defaults from direction (up = good, down = bad, flat = neutral). Set explicitly on cost metrics (CAC, CPL, wasted spend, churn). |
| `caption?` | `string` | — |  |
| `icon?` | `string` | — | Optional brand icon name shown as a quiet accent. |
| `iconRoot?` | `string` | — |  |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { KpiCard } = window.AlfredAIDesignSystem_1ce241;

<KpiCard label="Blended ROAS" value="4.8x" delta="+12.4%" direction="up" caption="vs last 30d" icon="trend-up" iconRoot="../../assets/icons" />
<KpiCard label="Blended CAC" value="$184" delta="-8.0%" direction="down" valence="good" caption="improving" />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
