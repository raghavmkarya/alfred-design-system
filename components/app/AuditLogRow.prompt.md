# AuditLogRow

One entry in the audit trail: who did what to which target, and when. Human actors get an initials disc; Alfred gets the logo-dot treatment — a small orange dot inside a soft halo, no robot iconography. An optional detail expands below via an aria-expanded chevron button (grid-rows trick keeps the detail in the DOM for SSR).

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `actor` | `string` | — | Actor name, e.g. "Priya Menon" or "Alfred". |
| `isAlfred?` | `boolean` | `false` | Render the actor with the Alfred logo-dot treatment. |
| `action` | `string` | — | What happened, in sentence case, e.g. "reallocated budget to". |
| `target?` | `string` | — | Entity acted on, shown as a chip, e.g. "Performance Max — Q3". |
| `time` | `string` | — | Timestamp label, e.g. "Today, 09:42". |
| `detail?` | `string` | — | Expandable explanation revealed by the chevron button. |
| `defaultOpen?` | `boolean` | `false` | Render expanded on first mount. |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { AuditLogRow } = window.AlfredAIDesignSystem_1ce241;

<AuditLogRow actor="Alfred" isAlfred action="reallocated budget to" target="Performance Max — Q3" time="Today, 09:42"
  detail="I moved $18K from brand search into Performance Max after CAC rose 22% week over week." />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
