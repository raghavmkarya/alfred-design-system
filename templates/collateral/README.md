# Collateral — A4 print/PDF theme for sales & CS documents

`collateral.css` is the shared print theme for one-pagers, battle cards, proposals,
security packs, QBR docs and every other leave-behind. Print-first (A4 portrait via
`@page`), screen-previewable, and brand-locked to the design-system tokens (Clash
Display headlines, Satoshi body, orange = action).

## Build a document

1. Link `../../styles.css` then `collateral.css`.
2. One `<section class="col-page">` per A4 page (add `col-dark` for black cover pages).
3. Compose from the classes — see `_specimen.html` for every class rendered:
   - `col-header` (logo + `col-doc-type` eyebrow) · `col-footer` (`col-entity` + `col-page-no`)
   - `col-cover-title`, `col-eyebrow`, `col-lead`, `col-muted`, `col-accent`
   - `col-two-col` layout · `col-divider` / `col-rule`
   - `col-stat-band` > `col-stat` (`col-stat-n` number, `col-stat-l` label, `col-stat-src` source line)
   - `col-table` · `col-checklist` (SVG check bullets) · `col-callout` (+ `col-callout-t` title)
   - `col-battle-grid` (`col-battle-us` / `col-battle-them` columns) for competitive docs
   - `col-quote` (`col-quote-text`, `col-quote-nm`, `col-quote-rl`) · `col-cta-band` (`col-cta-t`, `col-cta-s`, `col-cta-chip`)
4. Export: open in a browser → print → save as PDF (A4, default margins off — `@page` handles them).

## Rules

- **No fabricated proof.** Stats use `col-stat-src` with a real citation, or demo numbers
  clearly framed as the Northwind Labs scenario (`data/demo-data.json`).
- Sentence case, no emoji, SVG checks only (the checklist class provides them).
- Voice: third-person about Alfred in collateral; quoted product copy may be first-person.
