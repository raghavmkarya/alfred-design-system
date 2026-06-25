# EmptyState

Centered placeholder for empty lists, zero-result searches and not-yet-connected surfaces. Soft orange glyph chip, a calm title, one line of guidance and an optional action. Pass a custom `icon` node to override the default.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `title` | `string` | — |  |
| `body?` | `string` | — |  |
| `action?` | `React.ReactNode` | — | Optional action node, e.g. a <Button>. |
| `icon?` | `React.ReactNode` | — | Custom glyph node; defaults to a search mark. |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { EmptyState } = window.AlfredAIDesignSystem_1ce241;

<EmptyState title="No alerts" body="You're all caught up — I'll flag anything that needs a decision." action={<Button>Refresh</Button>} />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
