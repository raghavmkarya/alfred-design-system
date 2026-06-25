# Stepper

Horizontal numbered progress for multi-step flows (onboarding, setup). Done steps fill orange with a tick, the current step has an orange ring, upcoming steps are muted. `steps`: [{label}], `current` is the active index (0-based).

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `steps` | `Step[]` | — |  |
| `current?` | `number` | `0` | Active index, 0-based. Earlier steps render as done. |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { Stepper } = window.AlfredAIDesignSystem_1ce241;

<Stepper current={1} steps={[{ label: "Connect" }, { label: "Configure" }, { label: "Launch" }]} />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
