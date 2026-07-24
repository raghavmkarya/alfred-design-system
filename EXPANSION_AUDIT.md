# Alfred Design System Expansion Audit

Status: EP-00 complete
Snapshot date: 2026-07-24
Scope: tracked repository source files, with generated and untracked exports reported separately

## Purpose

This audit establishes the source-of-truth counts for the expansion program before creative
production begins. It compares the headline library claims in `README.md`, `SKILL.md`, `ROADMAP.md`,
and the expansion brief with files tracked by Git.

This is a count, capability-presence, and initial disposition audit. Placement-level social review,
positioning review, visual gap analysis, and approval ownership remain in EP-007 through EP-010.

## Counting rules

- Components are `components/<category>/*.jsx` files, excluding `components/hooks/`.
- Component declarations are matching `components/<category>/*.d.ts` files, excluding hooks.
- Social frames are root-level `social/*.html` masters, excluding only `social/index.html`.
- Email templates end in `.email.html`. Shared `shell.html` and `blocks.html` are support files.
- Pages are all `templates/pages/*.html` files.
- Website sections are public `window.Sec*` registrations, excluding four shared helpers.
- Deck masters are `templates/decks/*.html`, excluding `templates/decks/index.html`.
- Collateral HTML includes all `templates/collateral/*.html` files. `_specimen.html` is identified
  separately because it is a system specimen, not a customer-facing document template.
- Generated files under `social/_exports/` are not counted as tracked source capability.

## Count reconciliation

| Asset family | Claimed | Tracked source | Result |
|---|---:|---:|---|
| Components | 115 in expansion brief, 113 in older repository docs | 115 JSX and 115 declarations | Expansion brief confirmed. Older docs are stale. |
| Social frames | 102 | 102 HTML masters | Confirmed. |
| Email templates | 19 | 19 `.email.html` templates | Confirmed. |
| Page templates | 13 | 13 HTML pages | Confirmed. |
| Website sections | 27 | 27 public section registrations | Confirmed. |
| Decks | 16 | 17 HTML deck masters | Documentation understates the tracked library by one. |
| Collateral documents | 12 | 11 document templates plus one specimen | The raw HTML count is 12, but only 11 are content templates. |

## Component inventory

| Category | JSX sources | Declarations | Status |
|---|---:|---:|---|
| app | 16 | 16 | Paired |
| brand | 2 | 2 | Paired |
| charts | 14 | 14 | Paired |
| conversation | 5 | 5 | Paired |
| core | 24 | 24 | Paired |
| data | 13 | 13 | Paired |
| decision | 5 | 5 | Paired |
| feedback | 2 | 2 | Paired |
| marketing | 18 | 18 | Paired |
| overlay | 6 | 6 | Paired |
| trust | 10 | 10 | Paired |
| **Total** | **115** | **115** | **Complete pairing** |

The 113 to 115 change is explained by the later addition of `EvidenceLedger` and `DecisionFork` in
commit `a1a3aa5`. Older roadmap and skill text captured the library before those additions.

## Social inventory

The tracked source has 102 root-level visual masters after excluding `social/index.html`:

- 101 campaign and channel frame masters.
- 1 profile-avatar master.
- 101 locally generated PNG files currently exist in `social/_exports/`, but that directory is not
  tracked and has no profile-avatar export.
- Variant experiments under `social/_variants/` are not part of the 102-master claim.

EP-007 must still evaluate every master for content slots, safe zones, citation handling, light
variants, and current platform dimensions.

## Email inventory

The email system contains 19 tracked `.email.html` templates:

- Transactional and account messages.
- Product briefings and alerts.
- Onboarding and nurture sequences.
- Newsletter, launch, waitlist, and weekly digest messages.

`shell.html` and `blocks.html` are shared infrastructure and are not counted as templates.

## Website inventory

- 13 tracked page templates under `templates/pages/`.
- 27 public section registrations across `SectionsA.jsx` through `SectionsF.jsx`.
- Four additional public registrations are shared section helpers and are excluded from the section
  count.

The documented page and section claims match tracked source.

## Deck inventory

There are 17 tracked HTML deck masters:

- 5 marketing decks.
- 5 operations decks.
- 6 sales decks.
- 1 platform overview deck.

There are also two tracked PPTX artifacts. They are distribution outputs and do not change the HTML
master count. Existing documentation that claims 16 decks needs revision or a recorded exclusion
rule. Until such a rule exists, 17 is the source-backed count.

## Collateral inventory

There are 12 tracked HTML files under `templates/collateral/`:

- 11 customer-facing or reusable content templates.
- 1 `_specimen.html` system specimen.

The documentation's phrase "12 sales and customer-success documents" is not supported by the tracked
roles of these files. It should either say "11 document templates plus one specimen" or add a twelfth
content template.

## Evidence commands

The counts can be regenerated with:

```sh
find components -mindepth 2 -type f -name '*.jsx' ! -path 'components/hooks/*'
find components -mindepth 2 -type f -name '*.d.ts' ! -path 'components/hooks/*'
git ls-files | awk -F/ '$1=="social" && NF==2 && $2 ~ /\.html$/ && $2!="index.html"'
find templates/email -maxdepth 1 -type f -name '*.email.html'
find templates/pages -maxdepth 1 -type f -name '*.html'
rg '^window\.Sec[A-Za-z0-9]+\s*=' templates/sections/Sections*.jsx
find templates/decks -maxdepth 1 -type f -name '*.html' ! -name 'index.html'
find templates/collateral -maxdepth 1 -type f -name '*.html'
```

For the website section count, exclude `SecContainer`, `SecEyebrow`, `SecH2`, and `SecCheck`.

## Audit conclusions

1. The expansion brief's 115-component count is correct for the current tracked tree.
2. Every component source has a matching declaration.
3. Social, email, page, and website-section claims exist in tracked source.
4. The deck claim is stale by one unless the platform overview is intentionally excluded.
5. The collateral claim conflates 11 templates with one specimen.
6. Generated social exports exist locally but are not tracked capability and should not be used as
   evidence that deterministic exports are implemented.

## Asset disposition register

EP-005 is recorded in
[`data/expansion-asset-inventory.csv`](data/expansion-asset-inventory.csv). The deterministic register
covers 387 tracked visual sources:

| Disposition | Count | Meaning in this audit |
|---|---:|---|
| reusable | 158 | Can support expansion compositions without asset-level redesign. |
| needs revision | 203 | Requires campaign binding, positioning, crop, claim, or product-accuracy review. |
| campaign-specific | 11 | A working variant or delivery artifact tied to one existing output. |
| redundant | 15 | Superseded by a canonical source elsewhere in the repository. |
| deprecated | 0 | No tracked source is currently approved for removal from use. |

The register includes component sources, social masters and tracked variants, emails, pages, public
website sections, deck masters and tracked exports, collateral HTML, illustrations, icons, logos,
uploaded visual sources, slide primitives, UI kit sources, and the legacy Open Graph template.
Galleries, shared infrastructure, font archives, untracked mocks, and untracked generated exports are
excluded because they are not visual masters.

The default disposition is conservative. Existing campaign surfaces remain `needs revision` until
the channel-specific audits prove they meet the expansion requirements. A reusable disposition does
not mean campaign-approved. It means the underlying primitive or canonical brand asset can be used
without redesign.

Regenerate and verify the register with:

```sh
npm run expansion:inventory
npm run verify:expansion-inventory
```

The generator accepts only `reusable`, `needs revision`, `campaign-specific`, `redundant`, and
`deprecated`. It rejects duplicate asset IDs and produces stable sorted output.

## EP-00 completion

The program setup and audit phase is complete. The flagship content checklist and owner model live in
[`EXPANSION_CONTENT_CHECKLIST.md`](EXPANSION_CONTENT_CHECKLIST.md). The next program work is EP-10:
campaign foundation.
