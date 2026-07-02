# AvatarStack

Overlapping avatar cluster with a "+N" overflow bubble and a count label. Social proof for waitlists and launch pages ("2,300+ people already joined").

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `names` | `string[]` | — | Full names, rendered as Avatar initials in stack order. |
| `max?` | `number` | `4` | Maximum avatars shown before collapsing the rest into a "+N" bubble. |
| `label?` | `string` | — | Count label shown beside the cluster and used as the group aria-label, e.g. "2,300+ people already joined". |
| `size?` | `number` | `36` | Avatar diameter in px. |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { AvatarStack } = window.AlfredAIDesignSystem_1ce241;

<AvatarStack names={["Priya Menon", "Daniel Okafor", "Mei Lin", "Sofia Alvarez", "James Carter"]} max={4} label="2,300+ people already joined" />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
