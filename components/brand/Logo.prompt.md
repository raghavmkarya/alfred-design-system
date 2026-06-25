# Logo

The gradient "a" mark plus the "Alfred ai" wordmark. Variants render the full lockup, just the mark, or just the wordmark; tone switches for dark backgrounds. Assets live in /assets/logos (pass `root` to relocate).

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `variant?` | `LogoVariant` | `"full"` | full lockup, the gradient mark only, or the wordmark only. |
| `tone?` | `LogoTone` | `"color"` | "white" for dark/photographic backgrounds. |
| `height?` | `number` | `32` | Rendered height in px. |
| `root?` | `string` | `"assets/logos"` | Path to the logos folder relative to the host page. |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { Logo } = window.AlfredAIDesignSystem_1ce241;

<Logo height={28} tone="color" root="../../assets/logos" />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
