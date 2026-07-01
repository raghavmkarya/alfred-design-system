# Combobox

Type-ahead input with a filtered listbox (ARIA 1.2 combobox). Typing filters options by label; arrows move the active option, Enter picks it, Escape closes. Each option is `{ value, label, hint }` — the hint sits right-aligned and muted. Forwards its ref to the input.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `label?` | `string` | — |  |
| `placeholder?` | `string` | `"Search…"` |  |
| `options` | `ComboboxOption[]` | — |  |
| `value?` | `string` | — | Selected option value. |
| `onChange?` | `(value: string) => void` | — | Fires with the picked option's value. |
| `onInputChange?` | `(text: string) => void` | — | Fires with the raw input text as the user types. |
| `disabled?` | `boolean` | — |  |
| `emptyText?` | `string` | `"No matches"` | Shown when nothing matches the query. |
| `maxVisible?` | `number` | `7` | Rows visible before the list scrolls. |
| `id?` | `string` | — |  |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { Combobox } = window.AlfredAIDesignSystem_1ce241;

<Combobox label="Campaign" value={campaign} onChange={setCampaign} placeholder="Search campaigns…"
  options={[{ value: "pmax", label: "Performance Max", hint: "google" }, { value: "abm", label: "LinkedIn ABM", hint: "paid social" }]} />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
