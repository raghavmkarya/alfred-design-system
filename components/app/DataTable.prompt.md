# DataTable

A real product data table: uppercase tracked headers, hairline rows, a prominent first label column and right-aligned numeric columns set in tabular numerals. Headers sort client-side (numbers vs strings, with a caret glyph marking direction), rows can carry selection checkboxes, and when a pageSize is given the body pages with the composed Pagination control below. Theme-aware (light app / dark site), SSR-safe and self-contained. columns: [{ key, header, align, render, sortable }] align   — "left" (default) | "right" | "center"; "right" gets tabular nums render  — (value, row) => node, for custom cells sortable — set false to lock a single column when the table is sortable

## Props

_Props are documented in the `.d.ts`._

## Usage

```jsx
const { DataTable } = window.AlfredAIDesignSystem_1ce241;

<DataTable />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
