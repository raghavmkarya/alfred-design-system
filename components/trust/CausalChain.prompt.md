# CausalChain

The etiological signature of Alfred Core's Causal Reasoning Engine: a horizontal cause → effect → impact chain. Each step is a small node card, tinted by `kind` (cause = periwinkle, effect = orange, impact = danger), connected by chevron glyphs. An optional uppercase title eyebrow sits above, and when `confidence` is given a trailing "<n>% causal confidence" chip closes the chain like a verdict. Wraps responsively; fully self-contained. steps: [{ label, detail, kind }]   kind ∈ "cause" | "effect" | "impact"

## Props

_Props are documented in the `.d.ts`._

## Usage

```jsx
const { CausalChain } = window.AlfredAIDesignSystem_1ce241;

<CausalChain />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
