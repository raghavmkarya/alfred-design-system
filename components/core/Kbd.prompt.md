# Kbd

Keyboard key cap for shortcut hints — a sunken chip with a 2px bottom edge for key depth. Pairs with CommandPalette footers and menu shortcuts. Theme-aware via the surface and border tokens.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `children?` | `React.ReactNode` | — |  |
| `size?` | `KbdSize` | `"sm"` |  |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { Kbd } = window.AlfredAIDesignSystem_1ce241;

<span>Press <Kbd>⌘K</Kbd> to ask Alfred</span>
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
