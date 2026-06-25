# Drawer

Side panel that slides in from the right (default) or left over a dimmed backdrop. Controlled via `open`. Use for filters, detail views and settings that shouldn't take the user off the page.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `open` | `boolean` | — |  |
| `onClose?` | `() => void` | — |  |
| `side?` | `"right" \| "left"` | `"right"` |  |
| `title?` | `React.ReactNode` | — |  |
| `children?` | `React.ReactNode` | — |  |
| `width?` | `number` | — |  |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { Drawer } = window.AlfredAIDesignSystem_1ce241;

<Drawer open={open} onClose={close} title="Filters">…filter controls…</Drawer>
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
