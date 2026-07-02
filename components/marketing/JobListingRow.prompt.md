# JobListingRow

Careers job row for the About careers band: role title, a meta line (team · location · type) and a circular arrow affordance. The whole row is the target — it lifts on hover while the arrow fills orange. Renders as an anchor when `href` is given, otherwise as a button row.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `title` | `string` | — | Role title, e.g. "Senior product designer". |
| `team` | `string` | — | Team the role sits in, e.g. "Design". |
| `location` | `string` | — | Location shown in the meta line, e.g. "London or remote". |
| `type?` | `string` | — | Employment type appended to the meta line, e.g. "Full-time". |
| `href?` | `string` | — | Renders the row as an anchor when provided; otherwise a button row. |
| `onClick?` | `(e: React.MouseEvent) => void` | — |  |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { JobListingRow } = window.AlfredAIDesignSystem_1ce241;

<JobListingRow title="Senior product designer" team="Design" location="London or remote" type="Full-time" href="/careers/senior-product-designer" />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
