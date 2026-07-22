# Alfred — motion & animation (craft guideline)

How motion should *feel* in Alfred. Distilled from Emil Kowalski's design-engineering
philosophy ([animations.dev](https://animations.dev/)) and mapped onto Alfred's real motion
tokens — you pick a token, never a raw bezier. Alfred is a professional decision tool, so its
motion is **crisp, fast, and quiet**, never playful. Pairs with [`anti-slop.md`](./anti-slop.md)
(motion must be motivated *and* actually ship) and [`craft-checklist.md`](./craft-checklist.md)
(the ship gate).

## The two questions, before any code

**1. Should this animate at all?** The more often a user sees it, the less it should move.

| Frequency | Decision |
| --- | --- |
| 100+×/day — keyboard shortcuts, command palette, ⌘K toggles | No animation. Ever. |
| Tens×/day — hover states, list/table row navigation | Remove or drastically reduce |
| Occasional — modals, drawers, toasts, dropdowns | Standard token-driven animation |
| Rare / first-run — onboarding, first insight reveal | A little considered delight is allowed |

**Never animate a keyboard-initiated action.** A shortcut fired hundreds of times a day must
feel instant; an entrance transition makes it feel laggy. Alfred is a tool marketing leaders
live in daily, so the bias toward "no animation" is stronger here than on a marketing site —
filters, table sorts, and KpiCard refreshes on a live dashboard should lean instant.

**2. What is the purpose?** If you can't answer "why does this animate?" in one sentence,
delete it. Valid purposes: **spatial consistency** (a toast enters and exits from the same
edge, so swipe-to-dismiss feels obvious) · **state indication** (a control morphs to show it
changed) · **explanation** (a marketing sequence) · **feedback** (a button scales on press) ·
**preventing jarring change** (content appearing with no transition reads as broken). "It looks
cool" is not a purpose. Motion exists to make a state change or a number's movement legible (a
KpiCard's valence flip, a reallocation being flagged), never to decorate.

## Easing — two tokens, one decision

Emil's rule is that the browser's built-in easings are too weak; you need strong custom curves.
Alfred has already made and named them, so **do not hand-roll curves or pull them off
easing.dev** — pick a token.

- **Entering, exiting, moving, or a hover/color change → `--ease-standard`**
  `cubic-bezier(0.22, 0.61, 0.36, 1)`. A strong ease-out: starts fast, decelerates into place,
  feels instantly responsive. Your default for ~90% of UI.
- **Constant motion** (indeterminate progress bar, marquee) → `linear`.
- **A rare moment that wants a touch of life → `--ease-emphasized`**
  `cubic-bezier(0.34, 1.4, 0.5, 1)`, a subtle spring-like overshoot. Most surfaces never touch
  it; keep it rare (Emil: "avoid bounce in most UI").

**Never use `ease-in` for UI.** It starts slow, delaying movement at the exact moment the user
is watching most closely — a dropdown on `ease-in` at 200ms *feels* slower than the same 200ms
on `--ease-standard`.

```css
/* default UI motion */
transition: transform var(--dur-base) var(--ease-standard),
            opacity   var(--dur-base) var(--ease-standard);
```

## Duration — three tokens, bound to a purpose

| Motion | Token | ms |
| --- | --- | --- |
| Button press, tooltip, hover, instant toggles | `--dur-fast` | 120 |
| Dropdown, select, popover, most enter/exit | `--dur-base` | 200 |
| Modal, drawer, sheet | `--dur-slow` | 360 |

**Keep UI motion under 300ms.** `--dur-fast` and `--dur-base` cover almost everything a user
touches repeatedly. `--dur-slow` (360ms) is the ceiling, reserved for large overlays. Never
invent an in-between like 250ms — if `base` feels too quick and `slow` too heavy, the surface
is probably the wrong size for the interaction.

**Perceived performance is a feeling.** A faster-spinning spinner makes a load feel quicker even
at identical latency; a 200ms select feels more responsive than a 400ms one. On live-data
surfaces a snappy `--dur-fast` update makes Alfred feel like it's keeping pace with the numbers —
the whole promise of a decision-intelligence tool. When in doubt, err faster.

## Component patterns

**Pressables: `scale(0.97)` on `:active`, never `scale(0)`.** Every pressable scales down
slightly on press — instant physical feedback. And nothing in the real world appears from
nothing, so entrances start from `scale(0.95)` + `opacity: 0`, never `scale(0)`.

```css
.button { transition: transform var(--dur-fast) var(--ease-standard); }
.button:active { transform: scale(0.97); }        /* label + SVG icon scale together */
.panel  { transform: scale(0.95); opacity: 0; }   /* entering */
```

`scale()` scales children too, so a button's Satoshi label and its `currentColor` SVG icon
scale as one unit. The primary button's warm orange-glow-on-hover pairs with the press; because
the fill uses ink-on-orange (`--text-on-orange`), the label stays legible through it.

**Origin-aware popovers; modals stay centered.** A popover, dropdown, tooltip, or menu scales
*from its trigger*, not screen-center. Modals aren't anchored to a trigger — they keep
`transform-origin: center`.

```css
.popover { transform-origin: var(--transform-origin); }
```

**Tooltips: delay first, then skip the delay.** A tooltip waits before appearing so a passing
cursor doesn't trigger it — but once one in a group is open, hovering a neighbor opens it
instantly (no delay, no animation). Toolbar-dense product surfaces (icon rows over a chart,
table-header controls) are exactly where this pays off.

```css
.tooltip {
  transition: transform var(--dur-fast) var(--ease-standard),
              opacity   var(--dur-fast) var(--ease-standard);
  transform-origin: var(--transform-origin);
}
.tooltip[data-starting-style],
.tooltip[data-ending-style] { opacity: 0; transform: scale(0.97); }
.tooltip[data-instant] { transition-duration: 0ms; }
```

**Transitions over keyframes for dynamic UI.** CSS transitions interrupt and retarget
mid-flight; `@keyframes` restart from zero. Anything that can fire rapidly or reverse — stacking
toasts, a panel dismissed mid-open, an Alfred alert flagging a reallocation — should be a
transition. Reserve keyframes for predetermined one-shot or looping motion (a spinner).

**Springs — concept first, rare in practice.** Springs preserve velocity when interrupted, so a
gesture the user reverses mid-motion continues smoothly. Genuine spring physics belongs to a
narrow set: drag/swipe with momentum, drag-to-dismiss, an element meant to feel alive under the
finger. For everything else, `--ease-emphasized` gives a spring-*like* settle from plain CSS —
enough life for a rare accent without a physics engine.

## Performance

- **Animate only `transform` and `opacity`.** They skip layout and paint and run on the GPU.
  Animating `width`, `height`, `margin`, `padding`, or `top` triggers all three and drops frames.
  Don't animate `box-shadow` per frame — cross-fade a pre-baked shadow via `opacity`.
- Prefer `translateY(100%)` (relative to the element's own size) over hardcoded pixels.
- Don't animate an inherited CSS variable on a parent to move a child — it recalcs styles for
  every child. Set `transform` on the moving element directly.
- **Use the Web Animations API for JS-driven motion** — CSS-grade performance (off main thread,
  hardware-accelerated, interruptible) with JS control and no library:

```js
el.animate(
  [{ transform: 'translateY(100%)' }, { transform: 'translateY(0)' }],
  { duration: 360, fill: 'forwards', easing: 'cubic-bezier(0.22,0.61,0.36,1)' } // --dur-slow / --ease-standard
);
```

If a true gesture spring needs a JS motion library, treat it as optional — and remember Emil's
caveat that framer-motion's `x`/`y`/`scale` shorthands run on the main thread and drop frames
under load; use the full `transform` string for hardware acceleration. Keep any masking blur
under 20px (expensive in Safari).

**Gate hover motion behind a real pointer.** Touch devices fire `:hover` on tap, so a
hover-scale false-triggers on phones. The primary button's orange glow belongs behind this too,
so a leader tapping on an iPad doesn't get a stuck glow.

```css
@media (hover: hover) and (pointer: fine) {
  .card:hover { transform: scale(1.02); }
}
```

## Reduced motion is already handled — add gentleness, don't remove it

Reduced motion means *fewer and gentler* animations, not zero. Alfred's `base.css` already ships
a global `prefers-reduced-motion: reduce` block that neutralises animations and transitions
system-wide, so the default is done for you. Don't re-author neutralisers component by
component — trust `base.css`. Your only job is the opposite: where a state change becomes
*confusing* without any transition, add a gentle opacity or color fade back in (e.g. a KpiCard
valence color that must still register when the count-up is suppressed).

## Stagger, and match the mood

When several elements enter together, stagger them **30–80ms** apart for a natural cascade.
Keep delays short (long staggers feel slow) and never block interaction while a stagger plays —
it's decorative. Fits dashboard cards and table rows loading in.

```css
.item { opacity: 0; transform: translateY(8px);
        animation: fadeIn var(--dur-slow) var(--ease-standard) forwards; }
.item:nth-child(2) { animation-delay: 50ms; }
.item:nth-child(3) { animation-delay: 100ms; }
@keyframes fadeIn { to { opacity: 1; transform: translateY(0); } }
```

**Match motion to Alfred's personality.** This resolves every tradeoff: when unsure between
`--ease-standard` and `--ease-emphasized`, or `--dur-base` and `--dur-slow`, pick the crisper,
faster, quieter option — that is the brand. And **no emoji ever appears in a motion affordance** —
a toast, an empty-state animation, a celebratory "insight found" moment uses the custom
single-color SVG icon set, never an emoji or unicode symbol.

## Review the next day, in slow motion

You miss timing flaws while building that are obvious with fresh eyes. **Review the next day** —
watch every animation cold. **Slow-mo / frame-step** — temporarily run motion at 2–5× duration
or step through Chrome DevTools' Animations panel, watching for two states overlapping during a
crossfade, easing that starts/stops abruptly, a wrong `transform-origin`, or coordinated
properties drifting out of sync. A crossfade between two KpiCard states is exactly where slow-mo
reveals the "two overlapping numbers" artifact — mask it with a sub-20px blur if easing and
duration alone don't resolve it. Fold this pass into the five-critic screenshot review.

## What *not* to import from Emil (Alfred reconciliations)

- **Curves & durations:** ignore Emil's raw curve values and duration ranges; Alfred's two
  `--ease-*` tokens and three `--dur-*` tokens are the whole vocabulary.
- **Bounce:** skip Emil's "a playful component can be bouncier" permission. Alfred is never
  playful; `--ease-emphasized` stays rare and subtle.
- **Stack:** Emil's spring/gesture examples default to framer-motion. Alfred is CSS + WAAPI
  first; a JS motion library is optional, for gestures only.
- **Reduced motion:** don't author it per component (see above) — `base.css` owns it.
- **Emoji / gradient:** Emil never addresses either. Alfred forbids emoji in every affordance
  and caps **one `--gradient-brand` element per view** — never animate a second gradient into
  being, however beautiful.

---

**Source & attribution.** Distilled and adapted from the `emil-design-eng` skill (Emil
Kowalski, [animations.dev](https://animations.dev/)). Reach for that skill directly when you
need the deeper "why", gesture/drag physics, `clip-path` techniques, or its Before/After review
table — but translate every value through Alfred's tokens as above.
