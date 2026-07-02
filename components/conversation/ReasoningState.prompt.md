# ReasoningState

Branded "Alfred is reasoning" loading treatment for Seek Alfred surfaces. The gradient spark mark leads, a status line narrates what Alfred is doing right now ("Reading your spend data…"), and a small spinner plus an optional elapsed tag sit at the trailing edge. Server render shows the first line and the spinner statically; an effect rotates through the lines every ~1.8s (paused when the user prefers reduced motion). `compact` drops the strip chrome for inline use next to a message.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `lines?` | `string[]` | — |  |
| `elapsed?` | `string` | — | Elapsed-time tag at the trailing edge, e.g. "8s". |
| `compact?` | `boolean` | `false` | Drop the strip chrome and spark mark for inline use. |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { ReasoningState } = window.AlfredAIDesignSystem_1ce241;

<ReasoningState lines={["Reading your spend data…", "Isolating what changed…", "Drafting the move…"]} elapsed="8s" />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
