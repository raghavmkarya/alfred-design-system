# Countdown

Launch countdown for the live waitlist: DD:HH:MM:SS blocks in Clash Display tabular numerals with small tracked labels. Server-renders a deterministic "00" state, then hydrates to a live once-per-second tick.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `target?` | `string \| number` | — | Launch moment as an ISO 8601 string or epoch milliseconds. Missing, invalid or past values render 00:00:00:00. |
| `labels?` | `boolean` | `true` | Show the tracked unit labels under each block. |
| `size?` | `CountdownSize` | `"md"` |  |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { Countdown } = window.AlfredAIDesignSystem_1ce241;

<Countdown target="2026-09-15T09:00:00Z" size="lg" />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
