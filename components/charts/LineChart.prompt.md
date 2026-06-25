# LineChart

Labelled trend line (a sparkline with x-axis labels) for performance over time. Gradient stroke + soft area fill. Pass `points` and matching `labels`.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `points` | `number[]` | — |  |
| `labels?` | `React.ReactNode[]` | — | X-axis labels, spread start→end. |
| `height?` | `number` | — |  |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { LineChart } = window.AlfredAIDesignSystem_1ce241;

<LineChart points={[120, 168, 180, 230, 268]} labels={["W1", "W2", "W3", "W4", "W5"]} />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
