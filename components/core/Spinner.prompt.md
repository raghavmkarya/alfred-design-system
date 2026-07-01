# Spinner

Loading indicator — a warm orange arc sweeping over a quiet track, rotated with SMIL so it keeps spinning in inline-style-only surfaces. Respects prefers-reduced-motion by rendering the arc static. Optional label sits beside it; the accessible name is always set.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `size?` | `SpinnerSize` | `"md"` | 16 / 24 / 36 px. |
| `label?` | `string` | — | Shown beside the spinner and used as the accessible name. |
| `tone?` | `SpinnerTone` | `"brand"` | `brand` = orange arc, `muted` = quiet gray. |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { Spinner } = window.AlfredAIDesignSystem_1ce241;

<Spinner size="md" label="Pulling spend data…" />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
