# NotificationItem

A single row in Alfred's notification inbox: a tone-coloured icon, a title and body in his voice, a timestamp, an unread dot, and optional inline actions. Set `unread` to tint the row. Compose a list of these for a notification center or drawer.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `title?` | `React.ReactNode` | — |  |
| `body?` | `React.ReactNode` | — |  |
| `time?` | `string` | `"2m ago"` |  |
| `tone?` | `"brand" \| "info" \| "success" \| "warning" \| "danger"` | `"brand"` | Colours the leading icon. |
| `icon?` | `React.ReactNode` | — | Custom SVG node; defaults to a tone-coloured bell. |
| `unread?` | `boolean` | `false` | Tints the row and shows the unread dot. |
| `actions?` | `NotificationAction[]` | — | Inline actions; the first renders as the primary orange button. |
| `onClick?` | `() => void` | — |  |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { NotificationItem } = window.AlfredAIDesignSystem_1ce241;

<NotificationItem tone="warning" unread title="I've flagged a budget risk"
  body="Google Ads is pacing 6% over plan." time="2m ago"
  actions={[{ label: "Review" }, { label: "Dismiss" }]} />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
