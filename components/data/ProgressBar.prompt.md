# ProgressBar

The signature periwinkle→orange gradient track used for onboarding, goal pacing and load states. `tone="plain"` renders a solid orange fill.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `value?` | `number` | — | 0–100. |
| `height?` | `number` | — |  |
| `tone?` | `"gradient" \| "plain"` | `"gradient"` | gradient (brand) or plain (solid orange). |
| `showTrack?` | `boolean` | — |  |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { ProgressBar } = window.AlfredAIDesignSystem_1ce241;

<ProgressBar value={62} tone="gradient" height={9} />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
