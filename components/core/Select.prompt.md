# Select

Labelled dropdown matching the Input treatments (peach "tint" on auth, white "plain" in the app). Native <select> for accessibility, brand-styled with a custom chevron and the warm orange focus ring.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `label?` | `string` | — |  |
| `value?` | `string` | — |  |
| `onChange?` | `(e: React.ChangeEvent<HTMLSelectElement>) => void` | — |  |
| `options` | `SelectOption[]` | — |  |
| `placeholder?` | `string` | — |  |
| `fill?` | `"tint" \| "plain"` | `"plain"` | "tint" = peach (auth) · "plain" = white/bordered (app). |
| `disabled?` | `boolean` | — |  |
| `error?` | `string` | — |  |
| `id?` | `string` | — |  |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { Select } = window.AlfredAIDesignSystem_1ce241;

<Select label="Module" value={mod} onChange={e => setMod(e.target.value)}
  options={[{ value: "mkt", label: "Marketing" }, { value: "sales", label: "Sales" }]} />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
