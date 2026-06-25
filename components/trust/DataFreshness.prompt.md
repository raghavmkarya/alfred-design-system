# DataFreshness

A compact trust indicator. Silent stale data is a trust failure, so I surface it: a status dot (fresh = live green pulse, syncing = amber, stale = red), the line "Synced <updatedAgo>" and, when a source count is given, "· <count> sources live". Self-contained — the pulse is a CSS keyframe scoped by a unique useId class, no external timers.

## Props

_Props are documented in the `.d.ts`._

## Usage

```jsx
const { DataFreshness } = window.AlfredAIDesignSystem_1ce241;

<DataFreshness />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
