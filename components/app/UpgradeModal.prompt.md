# UpgradeModal

The in-app paywall moment. A Modal (which owns the focus trap, Escape and backdrop) filled with structured upgrade content: Alfred explains the limit in first person, a compact 2–3 column plan mini-compare shows the jump, and the footer offers a primary upgrade CTA with a quiet escape. Controlled via `open`/`onClose`; an optional `trigger` node (e.g. the locked control) renders inline before the dialog.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `open` | `boolean` | — | Controls visibility; renders nothing (beyond `trigger`) when false. |
| `onClose?` | `() => void` | — | Called by Escape, the backdrop, the × and the default secondary action. |
| `trigger?` | `React.ReactNode` | `null` | Optional node (e.g. the locked control) rendered inline before the dialog. |
| `title?` | `React.ReactNode` | `"You've used all 3 seats"` |  |
| `body?` | `React.ReactNode` | — | First-person Alfred explanation of the limit and what upgrading unlocks. |
| `plans?` | `UpgradeModalPlan[]` | — | Tiers for the mini-compare grid (capped at 3 columns; 3+ opens the wide dialog). |
| `cta?` | `UpgradeModalCta` | `{ label: "Upgrade to Growth" }` | Primary upgrade action. |
| `secondaryCta?` | `UpgradeModalCta \| null` | `{ label: "Not now" }` | Quiet escape; its onClick falls back to `onClose`. Pass null to hide. |
| `style?` | `React.CSSProperties` | — | Merged onto the dialog panel. |

## Usage

```jsx
const { UpgradeModal } = window.AlfredAIDesignSystem_1ce241;

<UpgradeModal open={open} onClose={() => setOpen(false)}
  cta={{ label: "Upgrade to Growth", onClick: startCheckout }} />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
