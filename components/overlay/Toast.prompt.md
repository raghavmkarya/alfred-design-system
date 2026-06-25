# Toast

A single transient notification card with a tonal status dot. Render one (or stack several, newest on top, fixed bottom-right) to confirm actions or relay a decision alert. Pass `onClose` for a dismiss ×.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `tone?` | `"info" \| "success" \| "warning" \| "danger"` | `"info"` |  |
| `title?` | `React.ReactNode` | — |  |
| `children?` | `React.ReactNode` | — |  |
| `onClose?` | `() => void` | — |  |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { Toast } = window.AlfredAIDesignSystem_1ce241;

<Toast tone="success" title="Reallocation queued" onClose={dismiss}>+$48K projected this quarter.</Toast>
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
