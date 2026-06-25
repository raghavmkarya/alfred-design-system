# Popover

Floating panel anchored to a trigger. Controlled via `open` / `onOpenChange`. Use it to host a Menu, a small form, or contextual detail. For plain text hints use Tooltip instead.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `open?` | `boolean` | — |  |
| `onOpenChange?` | `(open: boolean) => void` | — |  |
| `trigger?` | `React.ReactNode` | — | The clickable anchor element. |
| `children?` | `React.ReactNode` | — |  |
| `placement?` | `"bottom" \| "bottom-end" \| "top"` | `"bottom"` |  |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { Popover } = window.AlfredAIDesignSystem_1ce241;

<Popover open={open} onOpenChange={setOpen} trigger={<IconButton name="sort" iconRoot="../../assets/icons" />}>
  <Menu items={[{ label: "Newest" }, { label: "Top spend" }]} />
</Popover>
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
