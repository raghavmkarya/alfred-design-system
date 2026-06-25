# Alfred design-system sync notes

- **Off-script shape.** This repo has no package.json / dist / Storybook. It is a hand-authored
  static design system already in the claude.ai/design upload format: a prebuilt `_ds_bundle.js`
  (`window.AlfredAIDesignSystem_1ce241`, `@ds-bundle` header), `styles.css` that `@import`s the
  full token+font closure (`tokens/*.css`), 27 `@dsCard`/`@template` preview cards, and 19
  component `.d.ts` contracts. The converter (`package-build.mjs`) does NOT apply.
- **Verification.** `node scripts/verify-render.mjs` server-renders every kit component against
  the real bundle and fails on errors/warnings. Run it before any re-sync.
- **Excluded from upload (source/scaffolding, not consumed by the design agent):**
  `uploads/` (font zips + dup logo sources), `scripts/`, `_adherence.oxlintrc.json`,
  `.design-sync/`, `.DS_Store`.
- **Preview model:** group-level cards (e.g. `components/core/core.card.html` shows several
  components) rather than one card per component — valid via `@dsCard` markers.
- **No `_ds_sync.json` anchor** is written (no converter hash recipe); next sync re-verifies all.
