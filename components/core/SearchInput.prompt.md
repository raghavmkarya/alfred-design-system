# SearchInput

A search field with a leading magnifier, a clear button, an optional loading spinner, and a results dropdown that opens on focus. Each result is `{ label, hint }` and calls `onSelect`. Works controlled (`value`/`onChange`) or uncontrolled; `onSubmit` fires on Enter.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `value?` | `string` | — | Controlled value. Pair with `onChange`; omit for uncontrolled use. |
| `onChange?` | `(e: React.ChangeEvent<HTMLInputElement>) => void` | — |  |
| `onSubmit?` | `(query: string) => void` | — | Fires with the query on Enter. |
| `onSelect?` | `(label: string) => void` | — | Fires with a result's label when picked. |
| `placeholder?` | `string` | — |  |
| `results?` | `Array<string \| SearchResult>` | — | Plain strings or `{ label, hint }` items. |
| `loading?` | `boolean` | `false` | Show a spinner instead of the clear button. |
| `open?` | `boolean` | — | Force the dropdown open; otherwise opens on focus. |
| `fill?` | `"plain" \| "tint"` | `"plain"` |  |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { SearchInput } = window.AlfredAIDesignSystem_1ce241;

<SearchInput value={q} onChange={e => setQ(e.target.value)} onSelect={go}
  results={[{ label: "Why did CAC rise last week?", hint: "diagnose" }]} />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
