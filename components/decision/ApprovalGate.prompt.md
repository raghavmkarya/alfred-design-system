# ApprovalGate

The human-in-the-loop pause. Alfred has prepared an action and is holding for your sign-off: an "Awaiting your approval" header with a pause mark and priority badge, the action title and reasoning, a "what I'll do" checklist, and the approver. Footer offers approve / modify / decline. Lighter than RecommendationCard — this is the gate, not the pitch.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `title?` | `string` | — |  |
| `summary?` | `string` | — |  |
| `steps?` | `string[]` | — | Bulleted "if you approve, I'll…" actions. |
| `priority?` | `"high" \| "medium" \| "low"` | `"medium"` |  |
| `approver?` | `string` | — | Name of the person the approval is routed to. |
| `requestedAt?` | `string` | `"Alfred · just now"` | Provenance caption. |
| `onApprove?` | `() => void` | — |  |
| `onModify?` | `() => void` | — |  |
| `onDecline?` | `() => void` | — |  |
| `approveLabel?` | `string` | — |  |
| `modifyLabel?` | `string` | — |  |
| `declineLabel?` | `string` | — |  |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { ApprovalGate } = window.AlfredAIDesignSystem_1ce241;

<ApprovalGate
  title="Reallocate $18K from Search to Performance Max"
  steps={["Move $18K of daily budget", "Cap Search at $12K/day"]}
  approver="Priya Menon" onApprove={apply} onDecline={skip} />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
