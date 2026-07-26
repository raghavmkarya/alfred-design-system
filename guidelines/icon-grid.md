# Alfred — the icon grid

An icon set exists so a glyph is drawn **once**. Alfred's was not holding that: components hand-rolled
their own paths, and the same glyph drifted into several shapes. Before this was written the codebase
contained **four different checkmarks**, **two different close crosses** and **two different
chevron-rights** — all hand-drawn, all slightly different, none of them in the set.

## Two families, honestly

The set is not uniform, and pretending otherwise would be worse than saying so.

| | Construction | Count | Use for |
|---|---|---|---|
| **UI glyphs** | 24×24, **stroked**, `stroke-width="2"`, round caps + joins, `fill="none"` | 10 | chevrons, check, close, plus, minus, search, spark — the furniture |
| **Domain icons** (legacy) | **filled** paths, arbitrary viewBoxes, exported from a design tool | 27 | `mql`, `gdpr`, `budget`, `audit-log`, `trend-*` — the ones that mean something specific to Alfred |

They read differently at the same size: the filled family is optically heavier. That is a real
inconsistency and it is on the backlog, not resolved. Grandfathering is recorded by **name** in
`scripts/verify-icons.mjs`, so the legacy list can only shrink.

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

**Working through that backlog of 22 is the remaining task.** Each one is a small migration: add the
glyph here, swap the inline `<svg>` for `<Icon>`, remove its entry from `KNOWN_INLINE_DUPES`.

## Adding a glyph

1. Draw on the 24×24 grid, stroked, weight 2, round caps and joins. Optical weight should match the
   existing UI glyphs at 20px — that is the size components use most.
2. Name it for what it **is**, not where it is used: `chevron-down`, not `accordion-arrow`.
3. Run `node scripts/verify-icons.mjs`.
4. Add it to the gallery card in `guidelines/brand-icons.card.html`.

## Don't

- Don't put colour in a glyph — `Icon` tints it, and a masked SVG's own fills are discarded anyway.
- Don't add to the legacy filled family; it is closed.
- Don't name a glyph after a component. The next component to need it will not be that one.

Related: [`../assets/illustrations/README.md`](../assets/illustrations/README.md) (the scene art, which
is a different problem — multi-colour and theme-aware, so it lives inline in a component).
