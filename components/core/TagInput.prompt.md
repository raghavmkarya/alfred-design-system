# TagInput

Multi-value tag field — type, press enter (or comma) and each entry becomes a removable Chip. For audiences, channels and keyword lists; optional suggestion dropdown filtered by the current text, max count and duplicate guard. Backspace on an empty field removes the last tag.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `label?` | `string` | — |  |
| `value?` | `string[]` | — | Committed tags (controlled). |
| `onChange?` | `(next: string[]) => void` | — | Called with the next tag array on add / remove. |
| `placeholder?` | `string` | `"Add and press enter"` |  |
| `suggestions?` | `string[]` | — | Optional pool shown as a dropdown under the field, filtered by the current text. |
| `maxTags?` | `number` | — | Refuse new tags beyond this count. |
| `disabled?` | `boolean` | `false` |  |
| `allowDuplicates?` | `boolean` | `false` | Allow the same tag twice (otherwise a case-insensitive guard applies). |
| `id?` | `string` | — |  |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { TagInput } = window.AlfredAIDesignSystem_1ce241;

<TagInput label="Audiences" value={audiences} onChange={setAudiences}
  suggestions={["CMOs", "Growth leads", "RevOps leaders"]} maxTags={6} />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
