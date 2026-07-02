# OfferSwitch

Launch-offer toggle for live pricing. The whole pill is one real switch (role="switch" aria-checked): click or Space toggles it, the border and tag warm to orange while the offer is applied, and keyboard focus shows the warm focus ring on the pill.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `checked?` | `boolean` | `false` | Whether the launch offer is applied. |
| `onChange?` | `(checked: boolean) => void` | — | Called with the next checked state when the pill is clicked or toggled with Space. |
| `label?` | `string` | `"50% launch offer applied"` | Offer copy shown in the pill. |
| `detail?` | `string` | — | Muted qualifier under the label, e.g. "for your first 2 months". |
| `disabled?` | `boolean` | `false` |  |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { OfferSwitch } = window.AlfredAIDesignSystem_1ce241;

<OfferSwitch checked={offerApplied} onChange={setOfferApplied} detail="for your first 2 months" />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
