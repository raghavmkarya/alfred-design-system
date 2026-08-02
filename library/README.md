# Inspiration Library

A browsable catalog of marketing section patterns, distilled from a sweep of
100+ B2B SaaS sites and rebuilt on the Alfred design system. It exists as a
reference: humans and agents lift finished, on-brand sections from here into
Framer (or anywhere else) instead of designing from a blank page.

Open `library/index.html` (serve the repo root, e.g.
`node scripts/serve-tests.mjs 8799`, then `http://127.0.0.1:8799/library/`).

## What's here

- `index.html` + `app.js` + `library.css`: the catalog app. Browse by
  category, tier and page type; search; live previews in light and marketing
  dark; per-variant preview; viewport widths; copy-HTML and standalone
  download. Plain `React.createElement`, vendored React, no build step.
- `preview.html?section=<id>&variant=<v>&theme=dark`: renders one section by
  itself. This URL is shareable and is what the app's iframes load.
- `sections/<category>.jsx`: the section components, `window.Lib*` globals,
  compiled to committed `.js` twins by `node scripts/build-kits.mjs`.
- `meta/<category>.json`: hand-authored catalog metadata (tier, page types,
  variants, real-site `usedBy` evidence). One file per category, so parallel
  authors never collide.
- `sections.json`: GENERATED from `meta/` by `node scripts/gen-library.mjs`.
- `export/<id>.html`: GENERATED static render of each section's default
  variant (marketing dark) — liftable without running a browser app.

## Authoring a section

1. Add a top-level `function LibYourThing(props)` to the category's
   `sections/<category>.jsx` (top-level `function` declarations are what the
   twin compiler re-exports to `window`). Every prop gets a complete Alfred
   default: a bare `<LibYourThing />` must render finished, on-voice copy.
2. Tokens only — the section must render truthfully in light and in
   `data-theme="dark"`. One gradient element per section at most. No emoji,
   custom icons only, logical properties for RTL.
3. Describe it in `meta/<category>.json`: id, global, tier, description,
   pageTypes, variants (props overrides on the defaults), usedBy evidence.
4. Regenerate and verify:
   ```
   node scripts/build-kits.mjs
   node scripts/gen-library.mjs
   node scripts/verify-library.mjs
   node scripts/verify-craft.mjs
   ```
   Render coverage is data-driven from `sections.json` — there is no
   registration list to edit.

## Page recipes

`recipes/` holds full composed pages (landing, pricing, blog, resource hub,
gated content, comparison…) built from these sections, registered as cards in
the main gallery under the "Inspiration" group.
