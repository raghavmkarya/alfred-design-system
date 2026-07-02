# ProvenancePanel

The glass-box primitive: a "How I know this" disclosure that ships with any insight. The header is a real button carrying an eye icon, the confidence % chip and freshness; the panel eases open (grid-rows trick) to reveal the one-line method, a ConfidenceMeter and a SourceTrace of connected sources.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `sources?` | `ProvenanceSource[]` | — | Connected sources the insight is grounded in (SourceTrace shape). |
| `confidence?` | `number` | `0` | Causal confidence, 0–100. Drives the header chip and the meter. |
| `method?` | `string` | — | One-line reasoning summary shown inside the panel. |
| `updated?` | `string` | — | Freshness stamp, e.g. "6m ago" — renders as "Updated 6m ago". |
| `defaultOpen?` | `boolean` | `false` | Render expanded on first mount. |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { ProvenancePanel } = window.AlfredAIDesignSystem_1ce241;

<ProvenancePanel sources={[{ name: "GA4", detail: "sessions", status: "live" }, { name: "HubSpot", detail: "pipeline", status: "live" }]}
  confidence={82} method="I compared 90 days of spend pacing against lead quality and isolated the paid-social audience change." updated="6m ago" defaultOpen />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
