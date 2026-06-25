# DateRangePicker

A preset date-range control: a connected segmented pill group (active preset fills orange) with an optional date readout. When "custom" is selected — or a `rangeLabel` is supplied — it reveals the resolved range (e.g. "1 Apr – 30 Jun") beside a small calendar glyph. Controlled via `value`; emits onChange(value).

## Props

_Props are documented in the `.d.ts`._

## Usage

```jsx
const { DateRangePicker } = window.AlfredAIDesignSystem_1ce241;

<DateRangePicker />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
