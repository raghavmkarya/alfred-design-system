# PromptSuggestions

Tappable starter prompts in Alfred's first-person voice — the empty-state nudge for Seek Alfred and a fast way to re-ask. Renders an optional eyebrow, then a set of spark-marked pills (wrapping) or full-width rows (list) that call `onSelect(prompt)` when tapped. Accepts plain strings or `{ label, hint }` items.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `suggestions?` | `Array<string \| { label: string; hint?: string }>` | — | Plain strings or `{ label, hint }` items. |
| `onSelect?` | `(prompt: string) => void` | — | Called with the chosen prompt's label. |
| `title?` | `string` | `"Try asking"` | Uppercase eyebrow above the prompts. |
| `layout?` | `"wrap" \| "list"` | `"wrap"` |  |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { PromptSuggestions } = window.AlfredAIDesignSystem_1ce241;

<PromptSuggestions onSelect={seek} suggestions={[
  "Where should I move budget this week?", { label: "Forecast Q3 pipeline", hint: "forecast" }]} />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
