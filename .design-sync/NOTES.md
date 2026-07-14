# Alfred design-system sync notes

- **Claude account scoping (2026-07-14).** claude.ai/design projects are scoped per Claude
  account. The prior pin (`ffaac5ec-88c5-411c-b366-f81b55b70a22`) was created under the
  `raghav@e902.ai` account and 404s from other accounts/sessions (e.g. `hello@e902.ai`) — it's
  not deleted, just invisible cross-account. `list_projects` under a different account may also
  surface same-named projects owned by teammates (e.g. Damini's "Alfred AI Design System") —
  never re-adopt those without explicit confirmation. When a pinned project 404s, check which
  Claude account is active before assuming the project is gone. Current pin
  (`4682509f-3a38-43e7-9817-20198e0e643c`, "Alfred AI design system(MK Synced)") was created
  fresh under the account active in this session; re-verify account/pin match at the next sync.
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
