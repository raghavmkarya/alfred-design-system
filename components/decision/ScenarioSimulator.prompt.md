# ScenarioSimulator

The what-if card at the heart of decision intelligence. Drag the lever(s) and Alfred re-projects the outcome live — a big projected value, a direction-coloured delta versus baseline, and a ConfidenceMeter that decays as you push further from what he's seen. Supply your own `project(values)` model or use the built-in budget-shift default. `onApply(values)` commits the scenario.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `title?` | `string` | — |  |
| `levers?` | `ScenarioLever[]` | — |  |
| `project?` | `(values: Record<string, number>) => ScenarioOutcome` | — | Model mapping lever values → outcome. Defaults to a budget-shift model. |
| `outcomeLabel?` | `string` | — |  |
| `baselineLabel?` | `string` | — |  |
| `baselineValue?` | `React.ReactNode` | — |  |
| `applyLabel?` | `string` | — |  |
| `onApply?` | `(values: Record<string, number>) => void` | — | Commits the scenario with the current lever values. |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { ScenarioSimulator } = window.AlfredAIDesignSystem_1ce241;

<ScenarioSimulator onApply={vals => commit(vals)} />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
