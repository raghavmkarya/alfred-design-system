# ActivityTimeline

A vertical feed of what's happened — Alfred's actions, alerts and milestones — on a connecting rail. Each item's node is coloured by kind (action → orange, alert → danger, success → green, info → periwinkle, default → muted), with a time, title, optional detail and an optional actor line. Broader than DecisionLog: any chronological event stream.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `items?` | `ActivityItem[]` | — |  |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { ActivityTimeline } = window.AlfredAIDesignSystem_1ce241;

<ActivityTimeline items={[
  { time: "Today, 8:02 AM", title: "Reallocated $18K to Performance Max", kind: "action", actor: "Priya approved" },
  { time: "Yesterday", title: "Flagged a lead-quality drop", kind: "alert" }]} />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
