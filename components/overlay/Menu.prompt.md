# Menu

Vertical action list, typically rendered inside a Popover. `items`: [{label, onClick, icon?, danger?}] or {divider:true}. Rows tint on hover and danger items read in red.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `items` | `MenuItem[]` | — |  |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { Menu } = window.AlfredAIDesignSystem_1ce241;

<Menu items={[{ label: "Edit" }, { label: "Duplicate" }, { divider: true }, { label: "Delete", danger: true }]} />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
