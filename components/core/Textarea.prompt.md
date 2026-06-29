# Textarea

Multi-line text field — the Input's sibling for notes, prompts and longer answers. Peach-tinted or plain fill, the warm orange focus ring, an optional character counter and error text. Works controlled (`value`/`onChange`) or uncontrolled.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `label?` | `string` | — |  |
| `placeholder?` | `string` | — |  |
| `value?` | `string` | — | Controlled value. Pair with `onChange`; omit for uncontrolled use. |
| `onChange?` | `(e: React.ChangeEvent<HTMLTextAreaElement>) => void` | — |  |
| `rows?` | `number` | `4` |  |
| `fill?` | `"plain" \| "tint"` | `"plain"` |  |
| `maxLength?` | `number` | — |  |
| `showCount?` | `boolean` | `false` | Show a "count / maxLength" counter (requires maxLength). |
| `error?` | `string` | — |  |
| `disabled?` | `boolean` | `false` |  |
| `id?` | `string` | — |  |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { Textarea } = window.AlfredAIDesignSystem_1ce241;

<Textarea label="Notes for Alfred" value={notes} onChange={e => setNotes(e.target.value)} maxLength={280} showCount />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
