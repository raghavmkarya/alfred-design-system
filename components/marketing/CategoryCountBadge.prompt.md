# CategoryCountBadge

Zero-padded category count chip from the integrations index ("05", "02"). Mono tracked digits inside a 1px-border pill; optionally pairs the count with its category label ("05 · Ad platforms").

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `count?` | `number \| string` | `0` | Category count; zero-padded to two digits ("5" → "05"). |
| `label?` | `string` | — | Optional category label rendered after a middle dot, e.g. "Ad platforms". |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { CategoryCountBadge } = window.AlfredAIDesignSystem_1ce241;

<CategoryCountBadge count={5} label="Ad platforms" />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
