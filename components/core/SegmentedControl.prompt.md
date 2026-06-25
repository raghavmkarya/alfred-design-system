# SegmentedControl

Pill-track segmented switch; the active segment fills orange. Use for small, mutually-exclusive view toggles (e.g. Day / Week / Month). Controlled.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `options` | `SegmentOption[]` | — |  |
| `value?` | `string` | — |  |
| `onChange?` | `(value: string) => void` | — |  |
| `size?` | `"sm" \| "md"` | `"md"` |  |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { SegmentedControl } = window.AlfredAIDesignSystem_1ce241;

<SegmentedControl value={range} onChange={setRange}
  options={[{ value: "d", label: "Day" }, { value: "w", label: "Week" }, { value: "m", label: "Month" }]} />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
