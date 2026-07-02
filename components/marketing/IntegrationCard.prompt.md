# IntegrationCard

Integration directory tile: an icon in a soft 12px tile, the integration name, a one-line description in Alfred's voice, a self-contained live / planned status pill, and a "Learn more" arrow link.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `icon?` | `React.ReactNode` | — | Logo or line icon rendered inside the 44px tile. Falls back to a plug glyph. |
| `name` | `string` | — | Integration name, e.g. "Google Ads". |
| `body` | `string` | — | One-line description of what Alfred does with this connection. |
| `status?` | `IntegrationStatus` | `"live"` | Connection availability shown in the dot pill. |
| `href?` | `string` | — | Renders "Learn more" as an anchor when provided; otherwise a button. |
| `onClick?` | `(e: React.MouseEvent) => void` | — |  |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { IntegrationCard } = window.AlfredAIDesignSystem_1ce241;

<IntegrationCard name="Google Ads" body="I pull spend, conversions and quality scores every hour to catch budget drift early." status="live" href="/integrations/google-ads" />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
