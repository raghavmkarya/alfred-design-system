# Switch



## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `checked?` | `boolean` | — |  |
| `onChange?` | `(checked: boolean) => void` | — |  |
| `disabled?` | `boolean` | — |  |
| `label?` | `string` | — |  |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { Switch } = window.AlfredAIDesignSystem_1ce241;

<Switch checked={alerts} onChange={setAlerts} label="Real-time alerts" />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
