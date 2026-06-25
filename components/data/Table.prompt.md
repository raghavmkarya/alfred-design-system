# Table

Lightweight data table with an uppercase tracked header, hairline row dividers and tabular numerals on right-aligned columns. Columns may supply a `render(value, row)` for custom cells (badges, deltas). Wrap-scrolls on x.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `columns` | `TableColumn[]` | — |  |
| `rows` | `Record<string, any>[]` | — |  |
| `dense?` | `boolean` | `false` | Tighter row padding. |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { Table } = window.AlfredAIDesignSystem_1ce241;

<Table columns={[{ key: "name", header: "Campaign" }, { key: "roas", header: "ROAS", align: "right" }]}
  rows={[{ name: "Performance Max", roas: "5.1x" }]} />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
