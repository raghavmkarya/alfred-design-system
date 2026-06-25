# AgentStatus

The "Seek Alfred" reasoning panel: a query, a stack of reasoning steps that progress (done → active → pending) with a pulsing active dot, and a footer. Pass `activeStep` to control progress, or let it auto-advance.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `query?` | `string` | — | The question posed to Alfred. |
| `steps` | `string[]` | — | Uppercase reasoning steps, e.g. "ANALYSING CAMPAIGN SPENDS". |
| `activeStep?` | `number` | — | Controlled active step index; omit to auto-advance. |
| `autoplay?` | `boolean` | — |  |
| `footer?` | `string` | — |  |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { AgentStatus } = window.AlfredAIDesignSystem_1ce241;

<AgentStatus query="What's the biggest risk right now?" steps={["Analysing campaign spends", "Synthesising root cause"]} />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
