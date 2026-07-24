# Alfred — RTL and logical properties

Components describe space in terms of the **reading direction** (start / end), not the screen
(left / right), so a surface mirrors correctly under `dir="rtl"` without a single per-component
override.

```html
<html dir="rtl">          <!-- whole app -->
<section dir="rtl">       <!-- one region -->
```

## The substitutions

| Physical | Logical |
|---|---|
| `marginLeft` / `marginRight` | `marginInlineStart` / `marginInlineEnd` |
| `paddingLeft` / `paddingRight` | `paddingInlineStart` / `paddingInlineEnd` |
| `borderLeft` / `borderRight` | `borderInlineStart` / `borderInlineEnd` |
| `left` / `right` (offsets) | `insetInlineStart` / `insetInlineEnd` |
| `textAlign: "left"` / `"right"` | `textAlign: "start"` / `"end"` |
| `padding: "T R B L"` (asymmetric) | `paddingBlock: "T B"`, `paddingInline: "L R"` |

Note the shorthand order: `padding-inline` takes **start then end**, so `padding: "0 40px 0 16px"`
(top, right, bottom, left) becomes `paddingBlock: 0, paddingInline: "16px 40px"`. Getting that
backwards is the easiest mistake to make here, and it is invisible in LTR.

`verify-craft`'s `physical-inline-prop` rule blocks the physical forms in component JSX.

## When physical is correct

Not everything should mirror, and forcing it makes things worse. Three cases are deliberately
physical and carry an inline `rtl-ok` marker explaining why:

1. **Centring on 50%.** `left: "50%"` with `transform: translateX(-50%)` is direction-neutral:
   50% from the left is 50% from the right. Converting the offset alone while the transform stays
   physical actively breaks it. **If one half of a centring pair is physical, both must be.**
2. **Chart coordinate space.** A chart's value axis is its own geometry, not text flow.
   BulletChart, GaugeChart, ConfidenceMeter and GoalPacing position marks along a measured scale.
   Whether that scale should flip in RTL is a data-visualisation decision, not a layout one, and it
   belongs to roadmap 4.4 with the rest of the chart interaction contract.
3. **Physical placement APIs.** `Tooltip`'s `placement="left"` means *left*. Mirroring its offsets
   would put the tip on the opposite side from the one the caller asked for. When a prop value is
   physical, everything derived from it stays physical.

## Logical properties are invisible in LTR

This is the trap. In LTR, `marginInlineStart` resolves to exactly the `marginLeft` it replaced, so
**every static check and every LTR screenshot passes whether or not the migration is correct.**
The tri-theme visual baselines passed unchanged through this entire migration, which proves the
change was safe but proves nothing about whether it worked.

The only real evidence is rendering the same component in both directions and watching it mirror.
`tests/interaction.spec.js` does exactly that: it measures `DecisionAlert`'s leading accent rail in
an LTR and an RTL container and asserts it sits the same distance from the *leading* edge in both.
Reverting that one property to `left: 0` fails the test (the rail measures 315px from the start
instead of 1px), which is the check being meaningful rather than decorative.

Related: [`density.md`](./density.md) · [`elevation.md`](./elevation.md) ·
[`craft-checklist.md`](./craft-checklist.md).
