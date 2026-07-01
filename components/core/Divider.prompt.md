# Divider

Quiet 1px separator. Horizontal by default with an optional centred eyebrow label (line — label — line); vertical stretches inside flex rows. `spacing` controls the margin either side.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `orientation?` | `DividerOrientation` | `"horizontal"` |  |
| `label?` | `React.ReactNode` | — | Centred uppercase eyebrow label (horizontal only). |
| `spacing?` | `number` | `16` | Margin above/below (horizontal) or left/right (vertical), in px. |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { Divider } = window.AlfredAIDesignSystem_1ce241;

<Divider label="Earlier today" />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
