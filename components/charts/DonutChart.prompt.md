# DonutChart

Ring chart for share-of-total (channel mix, budget split). `segments`: [{label, value, color?}] — colors default through the brand ramp. Optional center label/sub. The track reads the theme so it works on light + dark.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `segments` | `DonutSegment[]` | — |  |
| `size?` | `number` | — |  |
| `thickness?` | `number` | — |  |
| `centerLabel?` | `React.ReactNode` | — |  |
| `centerSub?` | `React.ReactNode` | — |  |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { DonutChart } = window.AlfredAIDesignSystem_1ce241;

<DonutChart segments={[{ label: "Paid", value: 38 }, { label: "Search", value: 26 }]} centerLabel="$312K" centerSub="spend" />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
