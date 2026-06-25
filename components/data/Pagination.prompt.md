# Pagination

Page navigator with prev/next chevrons and a windowed page list (first, last, and a window around the current page, with … gaps). Controlled via `page` / `onChange`. The active page reads orange.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `page` | `number` | — |  |
| `pageCount` | `number` | — |  |
| `onChange?` | `(page: number) => void` | — |  |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { Pagination } = window.AlfredAIDesignSystem_1ce241;

<Pagination page={page} pageCount={12} onChange={setPage} />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
