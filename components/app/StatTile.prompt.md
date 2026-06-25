# StatTile

A KPI tile with an inline trend — a richer KpiCard. Card surface with a top row (accent-dotted label + a delta pill coloured by direction), a big display value, an optional caption, and a full-bleed sparkline footer when `points` is a non-empty number array. `color` overrides the accent dot.

## Props

_Props are documented in the `.d.ts`._

## Usage

```jsx
const { StatTile } = window.AlfredAIDesignSystem_1ce241;

<StatTile />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
