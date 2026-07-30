# Alfred — the icon grid

An icon set exists so a glyph is drawn **once**. Alfred's was not holding that: components hand-rolled
their own paths, and the same glyph drifted into several shapes. Before this was written the codebase
contained **four different checkmarks**, **two different close crosses** and **two different
chevron-rights** — all hand-drawn, all slightly different, none of them in the set.

## One family

**All 37 glyphs** are 24×24, **stroked**, `stroke-width="2"`, round caps and joins, `fill="none"`.

For most of this system's life that was not true. The set was two families: these UI glyphs, and 27
**filled** domain icons on fractional viewBoxes (`0 0 15.193 14.021`) exported from a design tool,
grandfathered by name in `scripts/verify-icons.mjs` because pretending they matched would have been
worse than saying so. They were optically heavier at the same size, and they never mixed cleanly.

They were converted in five batches on 2026-07-30. `LEGACY_FILLED` is now empty and must stay empty.

**Converting one was a redraw, not a transform.** An outline-traced *fill* cannot become a *stroke*:
each shape had to be drawn again on the 24 grid, rendered at 88px, and compared to the original by
eye. What that surfaced is the argument for never taking the shortcut again — a name and a filled
blob agree with each other far too easily:

- **`trend-down.svg` was a byte-for-byte copy of `trend-up.svg`**, so every `KpiCard` showing a
  decline drew a rising arrow.
- **`security-lock` was a shield.** **`cta-arrow` pointed backwards** on a "Continue" button.
- **`mql` was the letters "MQL"** drawn as paths, shipping at 17px, where type is texture.

**Everything new goes on the same grid** (that is the whole rule now), and `verify-icons` also fails
if two files render the same set of shapes.

**Everything new goes on the 24×24 stroked grid.** `verify-icons` fails on anything else.

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
     fill="none" stroke="currentColor" stroke-width="2"
     stroke-linecap="round" stroke-linejoin="round">
  <path d="M6 9l6 6 6-6"/>
</svg>
```

`Icon` renders a glyph as a **CSS mask**, so only the alpha channel matters and the colour comes from
the page. That is why a glyph must never carry its own palette: it is tinted by `color`, and both
families work through the same component.

## Do not hand-roll a glyph

If a component draws its own `<path>`, that glyph is invisible to the set and will drift. Reach for
`<Icon name="chevron-down" />` instead.

`verify-icons` enforces this as a **ratchet**: a path duplicated across two or more components is a
glyph that wants to be in the set, and the check fails on any *new* one. The 22 that already exist are
recorded as a baseline — a gate that fails on day one gets deleted, so this one starts where the code
actually is and only tightens.

**Working through that backlog is the remaining task** (20 left). But note there are *two* right
answers, and `<Icon>` is not always the one:

| Situation | Use |
|---|---|
| the **caller** chooses the glyph | `<Icon name="chevron-down" />` |
| the **component** draws its own glyph inline | `d={GLYPH.check}` from `components/hooks/glyphs.jsx` |

`Icon` renders a CSS mask over a file in `assets/icons`, so it needs a correct `root` path for the page
loading it — which means threading an `iconRoot` prop through every component that draws a tick. An
inline `<svg>` has no such dependency and works at any depth. For a glyph a component draws in its own
markup, inline is the better trade; it just has to come from **one definition**.

That is what `GLYPH` is for, and it is what actually fixes drift: `M20 6 L9 17 L4 12` and
`M20 6 9 17l-5-5` were the *same* checkmark written two ways. The problem was the path data, not the
delivery mechanism.

The ratchet is **self-cleaning**: once a glyph is no longer duplicated, its baseline entry must be
deleted or the check fails. A backlog that keeps entries for glyphs nobody draws any more is fiction.

## Adding a glyph

1. Draw on the 24×24 grid, stroked, weight 2, round caps and joins. Optical weight should match the
   existing UI glyphs at 20px — that is the size components use most.
2. Name it for what it **is**, not where it is used: `chevron-down`, not `accordion-arrow`.
3. Run `node scripts/verify-icons.mjs`.
4. Add it to the gallery card in `guidelines/brand-icons.card.html`.

## Don't

- Don't put colour in a glyph — `Icon` tints it, and a masked SVG's own fills are discarded anyway.
- Don't ship a filled glyph, and don't re-add a name to `LEGACY_FILLED`. That list exists only as an
  empty ratchet now.
- Don't draw a word. Type at 17px is texture, not language — that is what `mql` was.
- Don't name a glyph after a component. The next component to need it will not be that one.

Related: [`../assets/illustrations/README.md`](../assets/illustrations/README.md) (the scene art, which
is a different problem — multi-colour and theme-aware, so it lives inline in a component).
