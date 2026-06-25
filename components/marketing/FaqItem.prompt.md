# FaqItem

Accordion row with a plus/minus toggle. Uncontrolled by default; pass `open` + `onToggle` to control it.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `question` | `string` | — |  |
| `children?` | `React.ReactNode` | — |  |
| `open?` | `boolean` | — | Controlled open state; omit for uncontrolled. |
| `defaultOpen?` | `boolean` | — |  |
| `onToggle?` | `(open: boolean) => void` | — |  |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { FaqItem } = window.AlfredAIDesignSystem_1ce241;

<FaqItem question="What is decision intelligence?">Turning data into decision-ready answers.</FaqItem>
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
