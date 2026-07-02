# NotificationPref

Per-agent notification preference row for the settings surface: agent name and a one-line description on the left, three channel switches (email / Slack / in-app) in a labeled group on the right. Rows stack flush in a settings list — each closes with a subtle bottom border. Each switch carries a visually hidden accessible name ("<agent> via email", "<agent> via Slack", "<agent> in-app") so screen readers announce exactly which agent-channel pair is toggling, while the visible caption above each track stays short.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `agent` | `string` | — | Agent name, e.g. "Budget pacing agent". |
| `description?` | `string` | — | One-line explanation of what the agent notifies about, in Alfred's first person. |
| `channels?` | `NotificationChannels` | `{}` | Which channels are currently on. |
| `onChange?` | `(channel: "email" \| "slack" \| "inApp", value: boolean) => void` | — | Called with the channel key ("email" | "slack" | "inApp") and the next value. |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { NotificationPref } = window.AlfredAIDesignSystem_1ce241;

<NotificationPref agent="Budget pacing agent" description="I flag campaigns pacing more than 8% over or under plan."
  channels={{ email: true, slack: true, inApp: false }} onChange={(channel, value) => savePref(channel, value)} />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
