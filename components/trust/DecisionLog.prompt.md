# DecisionLog

The "every change logged" audit trail. A vertical timeline where each entry is a decision Alfred took (or didn't), pinned to a connecting rail with a status node: acted (solid green check), pending (orange ring, gently pulsing) or dismissed (muted x). Each row reads time -> title -> optional detail, an optional outcome pill (e.g. "+6% coverage") and who signed off. Newest first. Self-contained — inline SVG glyphs, no asset deps, theme-aware. entries: [{ time, title, detail, outcome, status, actor }] status ∈ "acted" | "pending" | "dismissed"

## Props

_Props are documented in the `.d.ts`._

## Usage

```jsx
const { DecisionLog } = window.AlfredAIDesignSystem_1ce241;

<DecisionLog />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
