# GaugeChart

A 270° radial gauge for a single score (AI Visibility Score, account health). A sunken background rail carries a brand-gradient value arc that sweeps clockwise from the 7-o'clock start, proportional to value/max. Optional `segments` ([{ upTo, color }]) tint threshold zones (red/amber/green) along the rail so you can read where the score sits. `valueFormat` formats the big center readout; `label` sits above it and `sub` below. Theme-aware: surfaces and text invert on dark, while the brand gradient stays identical.

## Props

_Props are documented in the `.d.ts`._

## Usage

```jsx
const { GaugeChart } = window.AlfredAIDesignSystem_1ce241;

<GaugeChart />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
