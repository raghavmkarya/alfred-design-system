# PageHeader

The page-title block for the product app: an optional muted breadcrumb row, a display-scale title + muted subtitle on the left with an actions node on the right, and an optional underline tablist below. Closes with a hairline border. Theme-aware (light app / dark site) and self-contained.

## Props

_Props are documented in the `.d.ts`._

## Usage

```jsx
const { PageHeader } = window.AlfredAIDesignSystem_1ce241;

<PageHeader />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
