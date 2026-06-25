# Banner

Inline, tonal message bar with a leading icon and a colored rail. Use for page-level info / success / warning / danger notices (a passive cousin of the DecisionAlert). Optional action and dismiss.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `tone?` | `"info" \| "success" \| "warning" \| "danger"` | `"info"` |  |
| `title?` | `string` | — |  |
| `children?` | `React.ReactNode` | — |  |
| `action?` | `React.ReactNode` | — |  |
| `onDismiss?` | `() => void` | — | Show a trailing × that calls this. |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { Banner } = window.AlfredAIDesignSystem_1ce241;

<Banner tone="warning" title="Spend pacing hot" onDismiss={dismiss}>Spend is 6% over plan this cycle.</Banner>
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
