# EyebrowBadge

Pill eyebrow chip — the live-site signature section opener. A tracked uppercase label inside a pill with a soft tone hairline (~35% alpha via a faded currentColor overlay, no color-mix) and a small tone dot. The `mono` variant renders the ONE SOURCE OF TRUTH style.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `children?` | `React.ReactNode` | — | Label text — written in sentence case; the chip renders it uppercase. |
| `tone?` | `EyebrowBadgeTone` | `"brand"` | Accent color shared by the text, border and dot. |
| `dot?` | `boolean` | `true` | Show the small tone dot before the label. |
| `mono?` | `boolean` | `false` | Font-mono uppercase variant — the ONE SOURCE OF TRUTH style. |
| `size?` | `EyebrowBadgeSize` | `"md"` | Label size: 11 / 12 / 13 px. |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { EyebrowBadge } = window.AlfredAIDesignSystem_1ce241;

<EyebrowBadge tone="brand">Decision intelligence</EyebrowBadge>
<EyebrowBadge tone="periwinkle" mono>One source of truth</EyebrowBadge>
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
