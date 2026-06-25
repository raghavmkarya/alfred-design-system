# SourceTrace

The "no black box" trust pattern: shows exactly which connected tools an insight was grounded in, each with a live sync status. Renders a small uppercase eyebrow, then either a wrapping row of chips (layout="row") or a stacked list of rows (layout="list"). Self-contained — no asset deps. sources: [{ name, detail, status }]  status ∈ "live" | "syncing" | "stale"

## Props

_Props are documented in the `.d.ts`._

## Usage

```jsx
const { SourceTrace } = window.AlfredAIDesignSystem_1ce241;

<SourceTrace />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
