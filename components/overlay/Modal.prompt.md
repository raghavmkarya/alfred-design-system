# Modal

Centered dialog over a dimmed, blurred backdrop. Controlled via `open`; renders nothing when closed. Clicking the backdrop or the × calls `onClose`. Pass a `footer` (usually a Button row) for actions.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `open` | `boolean` | — |  |
| `onClose?` | `() => void` | — |  |
| `title?` | `React.ReactNode` | — |  |
| `children?` | `React.ReactNode` | — |  |
| `footer?` | `React.ReactNode` | — | Action row, usually Buttons. |
| `size?` | `"sm" \| "md" \| "lg"` | `"md"` |  |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { Modal } = window.AlfredAIDesignSystem_1ce241;

<Modal open={open} onClose={close} title="Reallocate budget"
  footer={<><Button variant="ghost" onClick={close}>Cancel</Button><Button onClick={confirm}>Reallocate</Button></>}>
  Shift $18K from Brand to Performance Max?
</Modal>
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
