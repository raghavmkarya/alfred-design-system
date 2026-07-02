# InsightFeedback

Rate-an-insight control: "Was this useful?" with thumbs up / down. A negative verdict offers optional reason chips ("Wrong data", "Not relevant", "Already knew") or skip. Once chosen, Alfred thanks you in first person and the message is announced politely to assistive tech.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `onFeedback?` | `(verdict: InsightVerdict, reason?: string) => void` | — | Fired once per rating; `reason` is present only when a chip is picked after "not-useful". |
| `question?` | `string` | `"Was this useful?"` | Prompt shown next to the thumbs. |
| `reasons?` | `string[]` | `["Wrong data", "Not relevant", "Already knew"]` | Reason chips offered after a negative verdict; pass `[]` to record the verdict immediately. |
| `compact?` | `boolean` | `false` | Icon-only thumbs on a tighter row. |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { InsightFeedback } = window.AlfredAIDesignSystem_1ce241;

<InsightFeedback onFeedback={(verdict, reason) => save(verdict, reason)} />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
