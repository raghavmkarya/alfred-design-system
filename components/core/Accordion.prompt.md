# Accordion

Disclosure list of expandable rows — each header is a real button with a rotating chevron, and panels ease open via the grid-rows trick. Single-open by default; `multiple` allows several. Works controlled (`open`/`onChange`) or uncontrolled (`defaultOpen`).

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `items` | `AccordionItem[]` | — |  |
| `multiple?` | `boolean` | `false` | Allow more than one panel open at once. |
| `defaultOpen?` | `string[]` | — | Ids open on first render (uncontrolled). |
| `open?` | `string[]` | — | Controlled open ids. Pair with `onChange`. |
| `onChange?` | `(open: string[]) => void` | — | Fires with the next array of open ids. |
| `bordered?` | `boolean` | `true` | Wrap the list in a 1px rounded border. |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { Accordion } = window.AlfredAIDesignSystem_1ce241;

<Accordion defaultOpen={["why"]} items={[
  { id: "why", title: "Why did CAC rise last week?", content: "I traced it to a new paid-social audience — lead quality fell 14%." },
  { id: "fix", title: "What should we do about it?", content: "I'd shift $18K from Search to Performance Max." }]} />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
