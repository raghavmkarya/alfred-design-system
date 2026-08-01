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

## `transform` has no logical form — use `--flip`

The table above covers every property CSS gave a logical twin. **`transform` is not one of them.**
`translateX(18px)` is eighteen physical pixels to the right in every writing direction, so a switch
knob, a hover nudge or a trailing arrow all travel **backwards** under `dir="rtl"` while every
logical property around them mirrors correctly.

`--flip` is the direction sign: `1` in LTR, `-1` under `[dir="rtl"]`, and `[dir="ltr"]` resets it so
an LTR island inside an RTL page stays upright. It lives in `tokens/base.css` and inherits.

```jsx
// a knob that travels toward the trailing end in both directions
transform: checked ? "translateX(calc(18px * var(--flip)))" : "translateX(0)"

// a directional glyph AND its hover nudge, flipped together: the translate rides
// in the scaled space, so +3px is always toward the reading end
transform: hover ? "scaleX(var(--flip)) translateX(3px)" : "scaleX(var(--flip))"
```

`verify-craft`'s `physical-translate` rule blocks any other horizontal translate distance. Zero and
±50% pass (both are direction-neutral); a deliberately physical line carries an `rtl-ok` marker on
**the line itself** — `Drawer`'s `side` prop, `ConfidenceMeter`'s thumb and the chart cursor's
readout are the three that do.

**This is the class of bug no static check can find.** `physical-inline-prop` works by spotting a
wrong property *name*; here the property name is right and only the value has a handedness. A
checked `Switch` mirrored its track correctly and drove its knob 15px **past** the leading edge, and
the only thing that ever showed it was measuring both directions in a browser.

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

## The four-value shorthand is physical too

`physical-inline-prop` works by finding a wrong property *name*. A box shorthand never spells one:

```jsx
padding: `0 16px 14px ${INDENT}px`   // top RIGHT bottom LEFT — handed, and the name says nothing
```

Two values (`block inline`) and three (`top inline bottom`) are symmetric across the reading
direction and are fine. **Four is handed** whenever right and left differ, and `AuditLogRow` shipped
exactly that: its expanded detail was indented 54px to line up under the row's actor mark, and under
RTL the mark moved to the other edge while the indent stayed put.

`verify-craft`'s `handed-shorthand` rule blocks it. Mind the order when splitting one:

```jsx
paddingBlock: "0 14px", paddingInline: `${INDENT}px 16px`   // START then end
```

The shorthand reads right-then-left and `padding-inline` reads start-then-end, so a mechanical
transcription puts them **backwards** — and, per the section below, LTR looks perfect either way.

## Sweeping for what the static rules cannot see

Both rules above exist because something was found by *looking*, and the method is worth repeating
when a new layout primitive lands. Render every component in both directions and compare each
element's distance from the **leading** edge (`rect.left - box.left` in LTR,
`box.right - rect.right` in RTL); a correct mirror gives the same number twice. The playground has a
Direction toggle already, so a throwaway Playwright spec can drive all 117 in a couple of minutes.
Write it to the scratchpad, not the repo.

**Read the output knowing two thirds of it is noise**, or it will bury the real finding:

- **Anything inside `<svg>`.** The `<svg>` box mirrors; the glyph inside it does not, and should not.
  A magnifier is not a mirrored magnifier. Stop the walk at the `<svg>` element.
- **Inline content inside text.** Bidi reordering moves a citation pill or a price fragment for
  reasons that have nothing to do with layout handedness. Positioned and block-level elements are
  where a real bug shows.
- **Charts.** Deliberately physical, per the section above.

Of 32 components that differed on the first sweep, **six** were real, and they were two bugs wearing
six faces.

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

The same file measures the `Switch` and `OfferSwitch` knobs the same way. Reverting either to a bare
`translateX(18px)` fails it at **-15px from the leading edge**, i.e. the knob is outside its own
track.

Related: [`density.md`](./density.md) · [`elevation.md`](./elevation.md) ·
[`craft-checklist.md`](./craft-checklist.md).
