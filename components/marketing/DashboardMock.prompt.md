# DashboardMock

Marketing-site product mock: the embedded Daily Brief triage card from the live module page, framed in dark browser chrome (three dots + url pill). KPI row, gradient portfolio-health ring, and a P1/P2/P3 action queue with KILL / SCALE / Continue chips. Purely presentational (role="img") — every value is prop-driven with canonical demo defaults. The panel is intentionally dark in both themes, like the live embed.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `url?` | `string` | `"app.seekalfred.ai"` | Address-bar text in the chrome pill. |
| `kpis?` | `DashboardMockKpi[]` | — | Small stat tiles across the top (defaults to three canonical demo KPIs). |
| `score?` | `number` | `72` | Portfolio health score (0–100) shown inside the gradient ring. |
| `actions?` | `DashboardMockAction[]` | — | P1/P2/P3 triage queue rows (defaults to the canonical demo queue). |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { DashboardMock } = window.AlfredAIDesignSystem_1ce241;

<DashboardMock />  {/* canonical demo data built in; override url/kpis/score/actions per page */}
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
