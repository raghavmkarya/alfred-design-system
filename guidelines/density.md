# Alfred — density (compact / comfortable / spacious)

One attribute resizes controls, fields, table rows and app chrome across a whole subtree. The
point is that a dense operator table and a roomy onboarding form use the **same components** with
**no per-component overrides** and no size props threaded through the tree.

Tokens live in [`tokens/density.css`](../tokens/density.css), shipped via `styles.css`.

## Using it

Set `data-density` on any element. Custom properties inherit, so it scopes the whole subtree:

```html
<html data-density="compact">            <!-- whole app -->
<section data-density="spacious">        <!-- one region -->
<div data-density="comfortable">         <!-- an island inside a compact app -->
```

`comfortable` is the default and its values are exactly what the components shipped before the
scale existed, so **adopting the tokens changed nothing visually**. The tri-theme visual baselines
passed unchanged across the migration; that is the evidence, not a claim.

| | compact | comfortable | spacious |
|---|---|---|---|
| Button (md) | 38px | **46px** | 54px |
| Input / Select | 44px | **52px** | 60px |
| Table row padding | 7px 14px | **13px 18px** | 18px 24px |
| Nav item | 6px 10px | **9px 12px** | 12px 16px |

## Choosing a density

- **compact** — operator surfaces: dense tables, admin consoles, anything where more rows on
  screen is the job. Type size does **not** shrink; only the space around it does. Targets bottom
  out around 30px, so keep compact to pointer-first views.
- **comfortable** — the default. Use it unless you have a reason.
- **spacious** — marketing forms, onboarding, touch. Bigger targets, more air.

Density changes **space, never type**. If a surface needs smaller text, that is a type-scale
decision, not a density one.

## Authoring components against it

Reach for the density token instead of a literal whenever the value is control geometry:

```jsx
// yes
height: "var(--density-field-h)", padding: "0 var(--density-field-pad-x)"

// no — this control won't respond to the scale
height: 52, padding: "0 16px"
```

The token groups: `--density-control-h-{sm,md,lg}` / `--density-control-pad-{sm,md,lg}` (buttons
and button-shaped things) · `--density-field-h`, `--density-field-h-sm`, `--density-field-pad-x`,
`--density-field-pad-y`, `--density-field-gap` (form fields) · `--density-row-pad-{y,x}` (table and
list rows) · `--density-bar-pad-{y,x}`, `--density-nav-pad-y`, `--density-nav-item-pad-{y,x}` (app
chrome) · `--density-gap`, `--density-surface-pad` (generic). `--density-scale` (0.85 / 1 / 1.15) is
there for consumer spacing math: `padding: calc(var(--space-4) * var(--density-scale))`.

## The one rule that matters

**Every scope must define the same token set.** A scope that omits a token silently inherits its
parent's value, so a comfortable island inside a compact page would render half-compact. This is
not a style preference: it is the thing that breaks. `verify-craft`'s `density-contract` rule
compares the four scopes' token names and fails on any drift, and an interaction test asserts a
`comfortable` island inside a `compact` region measures the full 46px.

Related: [`craft-checklist.md`](./craft-checklist.md) (the pre-ship gate) ·
[`spacing-scale.card.html`](./spacing-scale.card.html) (the underlying 4px spacing ramp).
