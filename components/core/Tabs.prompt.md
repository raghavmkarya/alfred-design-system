# Tabs

Underline tab bar. The active tab is ink with a warm orange indicator.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `tabs` | `TabItem[]` | — |  |
| `value?` | `string` | — |  |
| `onChange?` | `(id: string) => void` | — |  |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { Tabs } = window.AlfredAIDesignSystem_1ce241;

<Tabs value={tab} onChange={setTab} tabs={[{ id: "mkt", label: "Marketing" }, { id: "sales", label: "Sales" }]} />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
