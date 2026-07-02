# ModuleStatusCard

Roadmap tile for an Alfred module: a status pill (live = success, in development = orange, planned = neutral), the module name in the display face, an optional slogan, agent chips, and an arrow CTA.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `module?` | `string` | `"Alfred for Marketing"` | Module name shown in the display face. |
| `slogan?` | `string` | — | One-line module slogan, e.g. "Read less, know more". |
| `status?` | `ModuleStatus` | `"live"` | Rollout status — drives the pill tone and label. |
| `agents?` | `string[]` | — | Agent names rendered as neutral chips, e.g. ["Spend anomaly agent"]. |
| `cta?` | `string` | — | CTA label; the arrow link renders only when provided. |
| `href?` | `string` | — | CTA destination — renders the CTA as an anchor. |
| `onClick?` | `(e: React.MouseEvent) => void` | — | CTA click handler — renders a button when no `href` is given. |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { ModuleStatusCard } = window.AlfredAIDesignSystem_1ce241;

<ModuleStatusCard module="Alfred for Sales" slogan="Know which deals will actually close" status="in-development"
  agents={["Pipeline risk agent", "Forecast agent"]} cta="Join the waitlist" href="/products/sales" />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
