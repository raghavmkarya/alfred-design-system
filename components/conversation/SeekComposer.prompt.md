# SeekComposer

The "Seek Alfred" prompt box — the product's primary conversational surface. An auto-growing textarea inside a card that lights up with the signature periwinkle→orange gradient ring on focus, a toolbar with an add-context affordance and a quiet model pill, and a circular send button that warms to orange (with the brand glow) once there's something to ask. Enter submits, Shift+Enter newlines. Optional starter-prompt chips sit beneath. Works controlled (`value`/`onChange`) or uncontrolled; `onSubmit(text)` fires on send.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `value?` | `string` | — | Controlled text value. Pair with `onChange`; omit for uncontrolled use. |
| `onChange?` | `(e: React.ChangeEvent<HTMLTextAreaElement>) => void` | — | Native textarea change handler (controlled mode). |
| `onSubmit?` | `(text: string) => void` | — | Fires with the trimmed text when the user sends (Enter or the send button). |
| `placeholder?` | `string` | — |  |
| `suggestions?` | `string[]` | — | Starter-prompt strings shown as chips beneath the box. |
| `model?` | `string` | `"Alfred 4.8"` | Quiet model pill label. |
| `disabled?` | `boolean` | `false` |  |
| `busy?` | `boolean` | `false` | Shows a spinner in place of the send glyph. |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { SeekComposer } = window.AlfredAIDesignSystem_1ce241;

<SeekComposer placeholder="Ask Alfred anything…" onSubmit={q => seek(q)}
  suggestions={["Where should I move budget this week?", "Why did CAC rise?"]} />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
