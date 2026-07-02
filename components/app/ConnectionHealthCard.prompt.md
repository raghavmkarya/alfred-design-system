# ConnectionHealthCard

Integration health card: an icon tile, the connection name, a status pill (fresh / syncing / stale / error) with a coloured dot, a last-sync meta line, optional granted-scope chips and a one-line detail in Alfred's voice. Stale and error states surface a Reconnect action — subtle for stale, primary for error, where the card also picks up --danger-500 accents.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `name` | `string` | — | Connection name, e.g. "Google Ads". |
| `icon?` | `React.ReactNode` | — | Logo or line icon rendered inside the 42px tile. Falls back to a plug glyph. |
| `status?` | `ConnectionHealthStatus` | `"fresh"` | Sync health shown in the dot pill; the syncing dot pulses (reduced-motion aware). |
| `lastSync?` | `string` | — | Relative last-sync time, e.g. "6m ago" — rendered as "Last sync 6m ago". |
| `scopes?` | `string[]` | — | Granted OAuth scopes rendered as a chip list, e.g. ["Ads read", "Reporting"]. |
| `detail?` | `string` | — | One-line context in Alfred's voice; shown as a danger callout on error. |
| `onReconnect?` | `(e: React.MouseEvent) => void` | — | Shows a Reconnect button when status is "stale" (subtle) or "error" (primary). |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { ConnectionHealthCard } = window.AlfredAIDesignSystem_1ce241;

<ConnectionHealthCard name="Google Ads" status="error" lastSync="42m ago" scopes={["Ads read", "Reporting"]}
  detail="I can't refresh spend — the OAuth token expired, so today's pacing may be off." onReconnect={() => {}} />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
