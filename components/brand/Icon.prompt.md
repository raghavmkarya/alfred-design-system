# Icon

Renders a brand SVG glyph from /assets/icons as a tintable mask so it can inherit `currentColor` or be set to any brand color. Pass `root` to point at the assets folder relative to the page that loads the bundle.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `name` | `string` | — | Glyph file stem in /assets/icons (e.g. "trend-up", "refresh", "close"). |
| `size?` | `number` | `20` | Pixel box. |
| `color?` | `string` | `"currentColor"` | Any CSS color; the glyph is a tintable mask. |
| `root?` | `string` | `"assets/icons"` | Path to the icons folder relative to the host page. |
| `title?` | `string` | — |  |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { Icon } = window.AlfredAIDesignSystem_1ce241;

<Icon name="trend-up" size={20} color="var(--orange-500)" root="../../assets/icons" />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
