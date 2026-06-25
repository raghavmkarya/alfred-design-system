# Tooltip

Wraps a trigger and reveals a small ink label on hover/focus. Use for terse clarifications (what a KPI means, an icon-button's action). Keep labels to a few words — anything longer belongs in a Popover.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `label` | `React.ReactNode` | — |  |
| `placement?` | `"top" \| "bottom" \| "left" \| "right"` | `"top"` |  |
| `children?` | `React.ReactNode` | — |  |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { Tooltip } = window.AlfredAIDesignSystem_1ce241;

<Tooltip label="Return on ad spend"><span>ROAS</span></Tooltip>
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
