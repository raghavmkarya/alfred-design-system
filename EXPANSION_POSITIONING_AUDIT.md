# Alfred Expansion Positioning Audit

Status: EP-008 complete
Snapshot date: 2026-07-24
Detailed register: [`data/expansion-positioning-audit.csv`](data/expansion-positioning-audit.csv)

## Scope

This audit evaluates 61 tracked launch-related masters:

- 13 website pages.
- 19 email templates.
- 17 deck masters.
- 12 collateral HTML files.

Each file is checked for category alignment, retired naming, canonical demo identity, unsupported
outcome claims, unresolved rendered placeholders, hardcoded launch-offer state, time-sensitive copy,
and funding or embargo vocabulary.

## Canon used

The audit treats [`guidelines/voice-and-naming.md`](guidelines/voice-and-naming.md) and
[`data/demo-data.json`](data/demo-data.json) as authoritative:

- Alfred is a decision-intelligence platform.
- “AI chief of staff” is a retired category label.
- Northwind Labs is the only canonical demo company.
- Alfred has no approved public customer-outcome metrics.
- Market statistics require visible citations.
- Demo metrics must use Northwind Labs and remain visibly fictional.
- Current prices and the 50% introductory offer are product facts, but launch assets must eventually
  receive them through approved campaign content instead of duplicating them.

## Results

### Overall

| Status | Masters |
|---|---:|
| aligned or neutral | 34 |
| review required | 27 |

A neutral category status is acceptable for transactional emails, legal templates, operational
documents, and other assets that do not need to restate the category.

### Category naming

| Status | Masters |
|---|---:|
| aligned with decision intelligence | 24 |
| category-neutral | 35 |
| retired term documented as a guardrail | 1 |
| retired term context review | 1 |

No master actively positions Alfred as an AI chief of staff. The brand messaging deck includes the
term only to prohibit it. The blog article uses “chief of staff” as a synthesis metaphor rather than
a category label, but it remains flagged because the expansion should avoid reviving retired
language through analogy.

Category drift is therefore limited. Proof and content-state drift are materially larger.

### Unsupported proof

| Status | Masters |
|---|---:|
| source or demo framing present | 19 |
| no high-risk outcome pattern | 28 |
| unsupported outcome review | 14 |

The 14 review files repeat one or more outcome patterns that are absent from the approved public
proof canon:

- 70% faster or less time to decision.
- 12% less wasted spend or spend reclaimed by Alfred.
- 85% of marketing questions answered without an analyst.
- 15 or more hours reclaimed per leader each week.
- Resolution reduced from 3 to 5 days to under two hours.
- Claims attributed broadly to Alfred design-partner teams.

Affected collateral:

- `templates/collateral/battle-card-agencies.html`
- `templates/collateral/battle-card-bi-tools.html`

Affected decks:

- `marketing-alfred-for-marketing.html`
- `marketing-brand-messaging-guide.html`
- `marketing-webinar-dashboard-era.html`
- `ops-customer-success-playbook.html`
- `ops-internal-all-hands.html`
- `ops-quarterly-business-review.html`
- `platform-alfred-overview.html`
- `sales-business-case-roi.html`
- `sales-competitive-why-alfred.html`
- `sales-pitch.html`
- `sales-pricing-packaging.html`
- `sales-product-demo.html`

These patterns must not enter flagship launch materials unless approved source records are supplied.
Until then they should be removed, replaced with cited market context, or explicitly rebuilt as
Northwind demo scenarios using canonical data.

### Demo identity drift

| Status | Masters |
|---|---:|
| canonical Northwind Labs | 15 |
| no demo company | 41 |
| noncanonical Northwind Co. | 5 |

Five decks use “Northwind Co.” even though the only canonical demo company is Northwind Labs:

- `marketing-platform-vision.html`
- `ops-customer-success-playbook.html`
- `ops-quarterly-business-review.html`
- `sales-pricing-packaging.html`
- `sales-security-trust.html`

Several of those decks also invent figures that do not exist in `data/demo-data.json`. Renaming the
company is necessary but insufficient. Every number must also reconcile to the canonical dataset.

### Rendered placeholders

Four files render unresolved placeholder values:

- `case-study-template.html`: 13 distinct placeholder values.
- `pilot-plan.html`: one customer placeholder.
- `security-pack.html`: six provider, region, and signature placeholders.
- `legal.html`: one repeated section placeholder.

These files are valid authoring templates but unsafe public outputs. EP-110 and EP-905 must block
them from approved and public export states.

### Hardcoded launch state

Six masters hardcode the 50% introductory offer or launch-pricing state:

- `templates/collateral/pricing-one-pager.html`
- `templates/email/launch-offer.email.html`
- `templates/pages/contact.html`
- `templates/pages/pricing.html`
- `templates/pages/product-marketing.html`
- `templates/pages/waitlist.html`

The values match the present naming canon, so this is not a factual correction. It is an architecture
issue: a future offer change would require six manual edits. EP-101 and EP-104 must move this state
into approved campaign content.

### Funding and embargo leakage

No audited master contains funding, fundraising, investor, round, raised-capital, or embargo
vocabulary. Existing default surfaces therefore contain no detected funding-announcement leakage.
This clean baseline should become a failing guard when EP-111 introduces restricted campaign data.

### Time-sensitive copy

Sixteen files contain terms such as `now live`, `live today`, `waitlist`, or `launch offer`. Not every
occurrence is incorrect, but every one needs campaign lifecycle ownership so stale launch state can
be detected after release.

## Required follow-up

1. EP-101 must centralize pricing, offer, release, and module-state facts.
2. EP-105 and EP-906 must reject the 14 unsupported outcome patterns unless citations or Northwind
   demo classification are supplied.
3. EP-110 and EP-905 must block rendered placeholders from approved exports.
4. EP-111 must preserve the current zero-leak baseline for embargoed funding details.
5. EP-513 through EP-516 must keep investor and public claims operationally separate.
6. All five Northwind Co. decks must migrate to canonical Northwind Labs data before reuse.
7. The chief-of-staff metaphor in `blog-article.html` should receive editorial review before it enters
   flagship category storytelling.

## Regeneration

Run:

```sh
npm run expansion:audit-positioning
npm run verify:expansion-positioning
```

The verifier requires exactly 61 tracked masters and fails when the generated register becomes stale.
