# KpiCard

A single metric tile for the KPI Cockpit: label, big value, and a trend delta coloured by direction (up = success, down = danger, flat = muted).

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `label` | `string` | — |  |
| `value` | `React.ReactNode` | — |  |
| `delta?` | `string` | — | Trend delta text, e.g. "+12.4%". |
| `direction?` | `"up" \| "down" \| "flat"` | `"up"` | Colours the delta and trend glyph. |
| `caption?` | `string` | — |  |
| `icon?` | `string` | — | Optional brand icon name shown as an accent. |
| `iconRoot?` | `string` | — |  |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { KpiCard } = window.AlfredAIDesignSystem_1ce241;

<KpiCard label="Blended ROAS" value="4.8x" delta="+12.4%" direction="up" caption="vs last 30d" icon="trend-up" iconRoot="../../assets/icons" />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
