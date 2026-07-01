# Callout

Inline structured aside for Alfred's observations and contextual notes — a quieter, non-dismissible cousin of the Banner. A 3px accent bar, a tonal translucent fill that reads on both themes, an optional icon and a single text action. `insight` (periwinkle) is Alfred's own voice.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `tone?` | `"insight" \| "success" \| "warning" \| "danger" \| "neutral"` | `"insight"` | `insight` = Alfred's own observation (periwinkle). |
| `title?` | `string` | — |  |
| `children?` | `React.ReactNode` | — |  |
| `icon?` | `React.ReactNode` | — | Custom leading glyph; defaults to a small per-tone line icon (currentColor). |
| `action?` | `{ label: string; onClick?: (e: React.MouseEvent) => void }` | — | Single text action in the tone's strong color. |
| `compact?` | `boolean` | `false` | Tighter padding for dense layouts. |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { Callout } = window.AlfredAIDesignSystem_1ce241;

<Callout title="I'd watch Search pacing" action={{ label: "Review pacing", onClick: openPacing }}>
  Google Ads is pacing 6% over plan — I'd cap daily spend at $12K until Thursday.
</Callout>
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
