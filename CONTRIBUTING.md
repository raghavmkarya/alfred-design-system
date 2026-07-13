# Contributing to the Alfred design system

The system is a hand-authored static design system that compiles to a runtime bundle and
syncs to claude.ai/design. Keep it token-driven, verified, and on-brand.

## Add or change a component

1. **Source** — `components/<group>/<Name>.jsx`. Rules:
   - `import React from "react"` (React is a runtime global); optional sibling imports like
     `import { Icon } from "../brand/Icon.jsx"` (resolved in dependency order by the builder).
   - A single `export function <Name>(props)` (or `export const <Name> = React.forwardRef(…)`
     for form controls that should expose their inner element).
   - Style **only** with design-system tokens (`var(--…)`) — no raw hex. It then inherits the
     active theme and works on the light app, the dark website (`data-theme="dark"`) and the
     dark workspace (`data-theme="app-dark"`) unchanged. Prefer the semantic layer
     (`--text-*`, `--surface-*`, `--border-*`) over raw ink/gray ramps for anything that sits
     on a themed surface.
   - Lead with a JSDoc block: what it is + when to use it (this becomes the `prompt.md` description).
2. **Contract** — `components/<group>/<Name>.d.ts` with a `<Name>Props` interface. This drives the
   generated props table and is the design agent's API contract. Add `@default` in prop doc comments.
3. **Build** — `node scripts/build-bundle.mjs` (regenerates `_ds_bundle.js` + manifest components),
   then `node scripts/gen-index.mjs` to refresh the `index.html` landing page from the manifest.
4. **Verify** — add the component to the `PROPS` map in `scripts/verify-components.mjs`, then run
   `node scripts/verify-components.mjs`. It must be **clean** (no errors, no React warnings).
   Run `node scripts/verify-render.mjs` too if you touched anything the UI kits use.
   Interactive components carry an accessibility contract (roles, aria-* wiring, keyboard
   support) — add a case to `scripts/verify-a11y.mjs` and keep `node scripts/verify-a11y.mjs` green.
5. **Docs** — add a curated example to `EXAMPLES` in `scripts/gen-prompts.mjs`, then
   `node scripts/gen-prompts.mjs` (it leaves existing `prompt.md` files untouched).
6. **Preview** — show it in a card: `components/<group>/<something>.card.html` whose first line is
   `<!-- @dsCard group="Components" name="…" subtitle="…" -->`. Register it in `_ds_manifest.json` `cards`.

Groups: `brand · core · data · charts · trust · app · overlay · feedback · marketing ·
conversation · decision`.

## Tokens

`tokens/*.css` is the **source of truth**. After editing tokens, run `node scripts/gen-tokens.mjs`
to refresh `tokens/tokens.json`, the Tailwind preset, and the Framer style map.

## Voice & form

Sentence case. First-person "chief of staff" voice in copy ("I've flagged…"). No emoji — use the
SVG icon set. Soft corners (12/24/32), soft diffuse shadows, orange = action, periwinkle = cool accent.

## Before syncing

Run all three verifiers (`verify-components`, `verify-render`, `verify-a11y`), rebuild the
bundle, then re-run `/design-sync` — it reads the pin in `.design-sync/config.json` and
updates the same Claude Design project.
