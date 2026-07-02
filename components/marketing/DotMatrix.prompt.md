# DotMatrix

The signature dot-matrix band: a grid of ~6px squares on the page background with a shifting subset pulsing in brand orange (About hero and CTA bands on the live site). Server-side and under prefers-reduced-motion it renders a static SVG grid with a pre-baked clustered pattern; on the client (motion allowed) it upgrades to a canvas + requestAnimationFrame shimmer. Purely decorative — hidden from assistive tech.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `height?` | `number` | `220` | Band height in px. |
| `density?` | `number` | `0.14` | Fraction of dots lit at any moment, 0–1. |
| `speed?` | `number` | `90` | Approximate dot pulses per second across the band. |
| `tone?` | `DotMatrixTone` | `"brand"` | Lit-dot color. `brand` = orange, `periwinkle` = cool accent, `urgent` = red-orange. |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { DotMatrix } = window.AlfredAIDesignSystem_1ce241;

<DotMatrix height={220} density={0.14} tone="brand" />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
