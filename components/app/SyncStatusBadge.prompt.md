# SyncStatusBadge

The small sync-status pill reused across connection surfaces (integration rows, source panels, settings). A colored dot plus one short word: fresh data is "Live" (green), an active sync is "Syncing" (warm orange, gentle pulse), aged data goes quiet ("Stale", gray) and a broken connection asks for action ("Reconnect needed", red). The pulse is a CSS keyframe scoped by a unique useId class and switches off under prefers-reduced-motion, where the static dot + halo still reads complete.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `status?` | `SyncStatus` | `"fresh"` | Connection state the pill reports. |
| `label?` | `string` | — | Override the default word per status ("Live" | "Syncing" | "Stale" | "Reconnect needed"). |
| `size?` | `SyncStatusBadgeSize` | `"md"` |  |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { SyncStatusBadge } = window.AlfredAIDesignSystem_1ce241;

<SyncStatusBadge status="fresh" />
<SyncStatusBadge status="syncing" />
<SyncStatusBadge status="error" label="Reconnect Google Ads" />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
