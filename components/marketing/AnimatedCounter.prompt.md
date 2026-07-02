# AnimatedCounter

Count-up outcome stat for marketing bands. Server-renders the FINAL value (never 0 — fixes the classic SSR-at-zero counter defect), then counts up from zero on mount once the element scrolls into view. Respects prefers-reduced-motion by keeping the static final value.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `value` | `number` | — | Final numeric value to count up to, e.g. 128 or 4.8. Decimals in the target are preserved during the count. |
| `prefix?` | `string` | `""` | Rendered before the number, e.g. "$". |
| `suffix?` | `string` | `""` | Rendered after the number, e.g. "M", "%", "x". |
| `duration?` | `number` | `1200` | Count-up length in milliseconds; 0 disables the animation. |
| `label?` | `string` | — | Tracked-caps label under the value, e.g. "Budget under management". |
| `sublabel?` | `string` | — | Secondary supporting line under the label. |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { AnimatedCounter } = window.AlfredAIDesignSystem_1ce241;

<AnimatedCounter value={4.8} suffix="x" label="Average ROAS" sublabel="Across $128M of managed spend" />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
