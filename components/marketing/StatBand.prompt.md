# StatBand

Row of headline outcome metrics (e.g. 90+, $90M+, 90x) with gradient numerals and a caption. Used in the "Leaders trust Alfred" band.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `stats` | `Stat[]` | — | Headline metrics, e.g. [{value:"90x", label:"Productivity boost"}]. |
| `gradient?` | `boolean` | `true` | Render numerals in the brand gradient. |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { StatBand } = window.AlfredAIDesignSystem_1ce241;

<StatBand stats={[{ value: "90x", label: "Productivity boost" }, { value: "$90M+", label: "Cost savings" }]} />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
