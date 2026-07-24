# Alfred — elevation

Components name the **role** ("this floats above the page"), never the size ("md"). `--elevation-*`
is the semantic layer over the raw `--shadow-*` ramp, in exactly the same relationship as
`--surface-card` to `--gray-50`.

Tokens live in [`tokens/elevation.css`](../tokens/elevation.css), shipped via `styles.css`.

## The scale

Six steps, ordered to mirror the z-index contract in `tokens/spacing.css`:

| Token | Aliases | Use for |
|---|---|---|
| `--elevation-flat` | `none` | flush with its parent; no depth |
| `--elevation-surface` | `--shadow-xs` | resting inline surfaces: table rows, bars, inline cards |
| `--elevation-raised` | `--shadow-sm` | cards that sit above the canvas |
| `--elevation-floating` | `--shadow-md` | hover-lifted cards, tooltips, inline menus |
| `--elevation-overlay` | `--shadow-lg` | popovers, toasts, dropdown results, command palette |
| `--elevation-modal` | `--shadow-xl` | modals and drawers, the top of the stack |

Pick the step by **what the thing is**, not by how heavy you want the shadow. If a card needs to
look heavier, it is probably a different step. Elevation and z-index should agree: something at
`--z-popover` should not be sitting at `--elevation-raised`.

```jsx
// yes
boxShadow: "var(--elevation-raised)"

// no — the size says nothing about the role, and won't survive a ramp change
boxShadow: "var(--shadow-sm)"
```

`verify-craft`'s `raw-shadow-token` rule blocks raw `--shadow-{xs,sm,md,lg,xl}` in component JSX.
A genuinely exceptional line can carry a `raw-shadow-ok` marker.

## Elevation is depth, not state

`--shadow-brand` (the warm primary-button glow) and `--shadow-focus` (the focus ring) are **not**
elevation and are deliberately absent from the scale. They are state, and components should keep
naming them directly.

## Why the steps alias instead of restating values

Each step is `var(--shadow-…)`, never a literal. That matters because `var()` resolves late, in the
element's own theme context, so the per-theme `--shadow-*` overrides in `tokens/colors.css` flow
through for free. **A literal value would freeze the light-theme shadow into every theme** — which
is precisely the bug this system was built to fix. `verify-craft` fails on a restated literal.

## Dark themes need real shadows

The light ramp is ink-tinted (`rgba(2,2,30,0.05–0.12)`). On a dark canvas that is invisible, so both
dark themes override the whole ramp with true-black, high-alpha values. `app-dark` always did;
**marketing-dark did not, and every elevated surface on it read as flat** until this was fixed.
`verify-craft` now requires both themes to override all five steps.

One honest caveat about marketing-dark: its page background is pure `#000000`, and **no drop shadow
can register against pure black.** Depth there is carried by the surface lift plus the hairline
border (the live-site 3%-white card pattern). The shadows do the remaining work where an elevated
element overlaps a lifted surface or the scrim, which is exactly where the boundary would otherwise
disappear. Do not try to solve dark-theme depth with shadow alone.

Related: [`density.md`](./density.md) · [`craft-checklist.md`](./craft-checklist.md).
