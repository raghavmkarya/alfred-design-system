# AlfredMessage

One turn in a Seek Alfred conversation. Alfred's turns lead with the gradient spark mark and his name, render the answer with inline [n] citations as small superscript pills, and can attach a SourceTrace ("grounded in") plus a timestamp. The user's turns render right-aligned in a soft bubble with an Avatar. Pass the message as `children` (string children get citation parsing; nodes render as-is).

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `role?` | `"alfred" \| "user"` | `"alfred"` | Whose turn this is. |
| `children?` | `React.ReactNode` | — | Message body. String children get inline [n] citation parsing; nodes render as-is. |
| `name?` | `string` | `"Alfred"` | Speaker name for Alfred turns. |
| `sources?` | `Array<{ name: string; detail?: string; status?: "live" \| "syncing" \| "stale" }>` | — | Connected sources rendered as a SourceTrace under an Alfred turn. |
| `time?` | `string` | — | Timestamp caption. |
| `avatarName?` | `string` | `"You"` | Avatar name/initials for user turns. |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { AlfredMessage } = window.AlfredAIDesignSystem_1ce241;

<AlfredMessage role="alfred" time="8:02 AM"
  sources={[{ name: "Google Ads", detail: "spend", status: "live" }, { name: "GA4", status: "live" }]}>
  I'd shift $18K from Search to Performance Max [1]. Cost-per-lead is holding [2].
</AlfredMessage>
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
