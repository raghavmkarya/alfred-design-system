# CommandPalette

The flagship "Seek Alfred" surface: an elevated, rounded panel with a controlled ask/search field (gradient sparkle mark — the single gradient element of the view), a primary Ask affordance, and selectable suggestion rows grouped under a quiet eyebrow. Supports an optional recent section and a footer hint. Keyboard-aware (Enter asks, ↑/↓ moves selection) and fully theme-aware so it reads cleanly on the light app and the dark site. onChange(nextValue, event) — mirrors value, like a search box. onSubmit(query)            — fires on Enter, the Ask button, or a row click.

## Props

_Props are documented in the `.d.ts`._

## Usage

```jsx
const { CommandPalette } = window.AlfredAIDesignSystem_1ce241;

<CommandPalette />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
