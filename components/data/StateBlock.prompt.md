# StateBlock

Unified empty / error / loading block for any surface — panels, tables, cards, full views. `loading` composes the Spinner inside a polite status region, `error` is an assertive alert with danger accents and a retry action, `empty` stays neutral with a next-step action. Copy defaults speak in Alfred's first person; pass `icon` to override the per-kind glyph.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `kind?` | `StateBlockKind` | `"empty"` | Which state to render. |
| `title?` | `string` | — | Heading; falls back to a first-person default per kind. |
| `body?` | `string` | — | One supporting line; falls back to a first-person default per kind. Pass "" to omit. |
| `action?` | `StateBlockAction` | — | Optional next-step (empty) or retry (error) action, rendered as the primary orange button. |
| `icon?` | `React.ReactNode` | — | Custom glyph node; defaults to a line-style tray (empty) or alert triangle (error). |
| `compact?` | `boolean` | `false` | Tighter paddings and smaller type for cards and table bodies. |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { StateBlock } = window.AlfredAIDesignSystem_1ce241;

<StateBlock kind="empty" title="All clear" body="I haven't found any alerts today — you're all caught up."
  action={{ label: "Review yesterday's decisions", onClick: () => {} }} />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
