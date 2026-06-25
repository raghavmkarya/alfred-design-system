# DecisionAlert

A row in the Real-Time Decision Alerts hub: a priority-coloured rail, the alert title + insight, a priority badge and an optional primary action.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `title` | `string` | — |  |
| `insight` | `string` | — |  |
| `priority?` | `"high" \| "medium" \| "low" \| "opportunity"` | `"medium"` | Priority sets the rail colour and badge. |
| `time?` | `string` | — |  |
| `action?` | `string` | — | CTA label; omit for a passive alert. |
| `onAction?` | `() => void` | — |  |
| `iconRoot?` | `string` | — |  |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { DecisionAlert } = window.AlfredAIDesignSystem_1ce241;

<DecisionAlert priority="high" time="12m ago" title="Google Ads over budget"
  insight="Brand campaign exhausts its cap in 4 days. Shift $18K to Performance Max."
  action="Reallocate budget" iconRoot="../../assets/icons" />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
