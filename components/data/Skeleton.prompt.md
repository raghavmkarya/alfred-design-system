# Skeleton

Theme-aware shimmer placeholder for loading states. Renders `lines` bars (last one shortened when multi-line). Compose several to mock a card or row while data loads. Surfaces read the theme tokens, so it works on light + dark.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `width?` | `number \| string` | — |  |
| `height?` | `number \| string` | — |  |
| `radius?` | `string` | — |  |
| `lines?` | `number` | `1` | Number of bars; the last is shortened when > 1. |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { Skeleton } = window.AlfredAIDesignSystem_1ce241;

<Skeleton lines={3} />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
