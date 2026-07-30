# Illustration

The scene art for Alfred's state moments: nothing here yet, nothing found, something broke, done, connecting, first run. Why the art is inline rather than files in assets/illustrations/: an SVG loaded through `<img src>` is an isolated document and cannot see the page's custom properties, so it can never follow the theme. Icon gets away with a CSS mask because its glyphs are single-colour; these are not. Inlining is what lets one composition read correctly on light, app-dark and marketing-dark instead of needing three exports each. House style (assets/illustrations/README.md): flat and geometric, bold shapes, soft brand radii, restrained. Structure is drawn in semantic tokens so it re-themes; colour is an accent, never wallpaper; **one gradient element per composition**, reserved for the moment the scene is actually about. The character art (Alfred, the Leader) stays in assets/illustrations/ — it is fixed brand art with its own grounds, not theme-adaptive UI furniture.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `name?` | `IllustrationName` | `"empty"` | Which scene to draw. |
| `size?` | `number` | `200` | Width in px; height follows the 3:2 frame. |
| `title?` | `string` | — | Accessible name. Defaults to the scene name. |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { Illustration } = window.AlfredAIDesignSystem_1ce241;

<Illustration />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
