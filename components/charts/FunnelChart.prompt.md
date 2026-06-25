# FunnelChart

Horizontal descending bars for a conversion funnel (Visitors → MQL → SQL → Won). `steps`: [{label, value, color?, display?}]. Bars are scaled to the largest step; the track reads the theme so it works on light + dark.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `steps` | `FunnelStep[]` | — |  |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { FunnelChart } = window.AlfredAIDesignSystem_1ce241;

<FunnelChart steps={[{ label: "Visitors", value: 100 }, { label: "MQL", value: 64 }, { label: "Won", value: 8 }]} />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
