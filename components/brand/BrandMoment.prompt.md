# BrandMoment

The signature arrival: the gradient mark settles, a glow blooms behind it and recedes, the wordmark resolves, and an optional line follows. For the moments a brand is allowed to take a beat — a first run, a splash, the open of a film. Built entirely from the motion tokens, because the point of a signature moment is that it is the SAME beat everywhere. `--ease-emphasized` is reserved by guidelines/motion-and-animation.md for "a rare moment that wants a touch of life", which is precisely this and nothing else in the product. Restraint is the brief. Nothing spins, nothing bounces, nothing arrives from off-screen. The mark starts at 0.94 and settles — never `scale(0)`, which the craft rules forbid because things should not appear from nothing. Reduced motion needs no special case here: the global `prefers-reduced-motion` block in tokens/base.css collapses every duration to 0.01ms, so the whole sequence resolves instantly to its final state, which is the correct degradation for a reveal.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `size?` | `number` | `56` | Height of the mark in px; the wordmark and padding scale from it. |
| `caption?` | `React.ReactNode` | — | Optional line that rises in last, e.g. "Decision intelligence for business leaders". |
| `loop?` | `boolean` | `false` | Loop the sequence for ambient use (a splash, a film loop). |
| `root?` | `string` | `"assets/logos"` | Path to the logo assets, relative to the loading page. |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { BrandMoment } = window.AlfredAIDesignSystem_1ce241;

<BrandMoment />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
