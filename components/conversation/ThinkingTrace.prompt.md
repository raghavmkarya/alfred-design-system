# ThinkingTrace

Alfred's agentic reasoning, made visible. A header ("I'm working through this…") with a pulsing gradient mark, then a collapsible list of steps — each marked done (check), active (a pulsing ring) or pending (a quiet dot) — connected by a rail. Shows that the answer is being reasoned to, not guessed. Collapsed once the answer lands. Pass `steps: [{ label, status, detail }]`.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `steps?` | `ThinkingTraceStep[]` | — |  |
| `title?` | `string` | — | Header text. Defaults to a working/worked phrase based on `done`. |
| `done?` | `boolean` | `false` | Marks the run finished — swaps the header and stops the mark pulsing. |
| `defaultOpen?` | `boolean` | `true` | Whether the step list starts expanded. |
| `elapsed?` | `string` | — | Elapsed-time caption, e.g. "4s". |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { ThinkingTrace } = window.AlfredAIDesignSystem_1ce241;

<ThinkingTrace elapsed="4s" steps={[
  { label: "Pulling spend & pacing", status: "done" },
  { label: "Isolating the cause", status: "active" },
  { label: "Drafting the move", status: "pending" }]} />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
