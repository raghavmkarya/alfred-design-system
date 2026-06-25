# Input

Text field with an optional label, peach-tinted or plain fill, and a trailing slot (e.g. password reveal). Focus shows the warm orange ring.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `label?` | `string` | — |  |
| `type?` | `string` | — |  |
| `placeholder?` | `string` | — |  |
| `value?` | `string` | — |  |
| `onChange?` | `(e: React.ChangeEvent<HTMLInputElement>) => void` | — |  |
| `fill?` | `"tint" \| "plain"` | `"tint"` | "tint" = peach fill (auth screens), "plain" = white with border (app). |
| `trailing?` | `React.ReactNode` | — | Element rendered at the right edge (e.g. a reveal toggle). |
| `error?` | `string` | — |  |
| `disabled?` | `boolean` | — |  |
| `id?` | `string` | — |  |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { Input } = window.AlfredAIDesignSystem_1ce241;

<Input label="Work email" value={email} onChange={e => setEmail(e.target.value)} fill="plain" />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
