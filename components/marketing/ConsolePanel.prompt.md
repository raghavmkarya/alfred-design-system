# ConsolePanel

The console evidence pane from the terminal-dev style absorption: Alfred showing its work as prompt-prefixed mono lines inside an ordinary soft-cornered card — a connected-sources header, a transcript of verb-led lines, and a ready line with a blinking phosphor cursor. No window chrome, no scanlines, no green: the instrument layer, not a costume. See `guidelines/style-absorption.md` for the budgets.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `connectedLabel?` | `string` | `"connected"` | Uppercase prefix of the sources header. |
| `connected?` | `string[]` | `[]` | Connected source names; empty hides the header line. |
| `transcript?` | `ConsolePanelLine[]` | `[]` | `{ verb, text, tone? }` — tone: `neutral` (default) · `info` (periwinkle) · `brand` (orange) · `success`. |
| `readyLine?` | `string` | — | Closing status line. |
| `cursor?` | `boolean` | `true` | Blinking phosphor cursor after the ready line. |
| `label?` | `string` | `"Alfred's evidence trail"` | Accessible name (`role="group"`). |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { ConsolePanel } = window.AlfredAIDesignSystem_1ce241;

<ConsolePanel
  connected={["Google Ads", "GA4", "CRM"]}
  transcript={[
    { verb: "checked", text: "spend pacing across 14 live campaigns" },
    { verb: "traced", text: "CPL drift to two search campaigns", tone: "info" },
    { verb: "flagged", text: "$18K of monthly spend below target return", tone: "brand" },
  ]}
  readyLine="brief ready :: 3 decisions, ranked by impact"
/>
```

## Notes
- Budgets from `guidelines/style-absorption.md`: mono is for this panel's lines only, orange appears as the `brand` tone and the cursor, and the phosphor cursor is the ONE phosphor element of the view it sits in — disable `cursor` if something else on the page already glows.
- Styled entirely from design-system tokens; renders on light and both dark themes without changes.
- The cursor blink is a `steps()` opacity loop and freezes under `prefers-reduced-motion` via the global contract.
