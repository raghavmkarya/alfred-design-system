# Checkbox



## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `checked?` | `boolean` | — |  |
| `onChange?` | `(checked: boolean) => void` | — |  |
| `label?` | `string` | — |  |
| `disabled?` | `boolean` | — |  |
| `id?` | `string` | — |  |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { Checkbox } = window.AlfredAIDesignSystem_1ce241;

<Checkbox checked={on} onChange={setOn} label="Email me the daily briefing" />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
