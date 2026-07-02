# CapabilityTicker

Horizontal marquee of capability chips for the live product hero: pill chips separated by small orange dots, drifting left in a seamless loop behind edge fade masks. The loop is a rAF-driven transform (no keyframes stylesheets). Under SSR or prefers-reduced-motion it renders a static single row, clipped with the same fade masks; the duplicated run only mounts while animating and is aria-hidden.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `items?` | `string[]` | — |  |
| `speed?` | `number` | `40` | Scroll speed in pixels per second; 0 disables motion. |
| `label?` | `string` | `"Alfred capabilities"` | Accessible name for the capability list. |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { CapabilityTicker } = window.AlfredAIDesignSystem_1ce241;

<CapabilityTicker
  items={["Budget reallocation", "CAC diagnosis", "Pipeline forecasting", "Creative fatigue alerts"]}
  speed={36}
/>
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
