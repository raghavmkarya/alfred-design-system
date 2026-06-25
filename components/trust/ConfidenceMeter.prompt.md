# ConfidenceMeter

A graded confidence bar for Alfred's Causal Confidence Score / calibration. A pill-shaped track carries the full danger → warning → success spectrum; a surface-coloured veil dims the unreached portion and a slim thumb marks the value. The value reads "<n>% confident" and a tone word (low / moderate / high) is derived from thresholds — both coloured by tone, in both themes.

## Props

_Props are documented in the `.d.ts`._

## Usage

```jsx
const { ConfidenceMeter } = window.AlfredAIDesignSystem_1ce241;

<ConfidenceMeter />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
