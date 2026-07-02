# MemoryCard

One item of Alfred Core memory — what Alfred knows about your org. Shows the learned fact, where it came from ("Learned from HubSpot · Mar 12") and a category chip, with small text actions to confirm, edit or remove the memory. Confirming swaps the button for a green check and announces it politely.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `fact` | `string` | — | The learned fact, in plain language. |
| `source` | `string` | — | Where and when the memory was learned, e.g. "Learned from HubSpot · Mar 12". |
| `category?` | `MemoryCategory` | — | Kind of memory; sets the chip dot color ("Compounding" gets the brand gradient). Chip is hidden when omitted. |
| `onConfirm?` | `() => void` | — | Fired once when the memory is confirmed; the card then shows a confirmed state. Button is hidden when omitted. |
| `onEdit?` | `() => void` | — | Fired when the user asks to edit — the host owns the editing surface. Button is hidden when omitted. |
| `onRemove?` | `() => void` | — | Fired when the user removes the memory. Button is hidden when omitted. |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { MemoryCard } = window.AlfredAIDesignSystem_1ce241;

<MemoryCard fact="Paid social CAC runs 18% higher in weeks when promo emails and prospecting flights overlap." source="Learned from HubSpot · Mar 12" category="Root cause" onConfirm={() => {}} onEdit={() => {}} onRemove={() => {}} />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
