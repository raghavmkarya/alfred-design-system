# Sparkline

Compact trend line with the signature periwinkle→orange gradient and a soft orange area fill. Pass a `points` array of numbers. Stretches to its container width. Uses a unique gradient id per instance so many can share a page.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `points` | `number[]` | — |  |
| `width?` | `number` | — |  |
| `height?` | `number` | — |  |
| `stroke?` | `number` | — |  |
| `fill?` | `boolean` | `true` | Render the soft area fill under the line. |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { Sparkline } = window.AlfredAIDesignSystem_1ce241;

<Sparkline points={[3.1, 3.8, 3.4, 4.2, 4.0, 4.8]} />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
