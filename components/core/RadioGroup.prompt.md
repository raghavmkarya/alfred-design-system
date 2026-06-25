# RadioGroup

Vertical set of single-choice options; the selected dot fills brand orange. Controlled via `value` / `onChange`.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `options` | `RadioOption[]` | — |  |
| `value?` | `string` | — |  |
| `onChange?` | `(value: string) => void` | — |  |
| `name?` | `string` | — |  |
| `label?` | `string` | — |  |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { RadioGroup } = window.AlfredAIDesignSystem_1ce241;

<RadioGroup label="Plan" value={plan} onChange={setPlan}
  options={[{ value: "starter", label: "Starter" }, { value: "growth", label: "Growth" }]} />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
