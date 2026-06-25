# FilterBar

A horizontal analytics filter bar that sits above a table or chart. Each entry in `filters` renders a house control by `type`: - "segmented" → SegmentedControl (mutually-exclusive view toggle) - "select"    → Select (compact dropdown) - "chip"      → a togglable Chip, or a single-select Chip group when the filter supplies `options` An optional eyebrow label sits before each control; `right` is pinned to the far right (e.g. an export button). onChange(id, value) fires on any change.

## Props

_Props are documented in the `.d.ts`._

## Usage

```jsx
const { FilterBar } = window.AlfredAIDesignSystem_1ce241;

<FilterBar />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
