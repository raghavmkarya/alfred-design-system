# Alfred Campaign Content Schema

Status: EP-101 complete
Schema: [`schemas/campaign-content.schema.json`](schemas/campaign-content.schema.json)
Safe draft fixture:
[`data/campaigns/flagship-launch.example.json`](data/campaigns/flagship-launch.example.json)

## Purpose

The campaign content schema separates approved facts and messaging from visual layout. Templates
consume content IDs and never become the source of truth for funding, claims, quotes, dates, prices,
people, or calls to action.

The schema is deliberately broader than a single funding announcement. It can drive website, social,
email, deck, PDF, press, motion, and internal launch packs from one campaign record.

## Top-level contract

Every campaign defines:

- Campaign ID, name, semantic version, and lifecycle.
- Decision-intelligence narrative and ordered story beats.
- Declared audiences.
- Release time, timezone, embargo time, and public URLs.
- Owner roles and named assignees.
- Category definition, headline variants, supporting copy, CTAs, and company boilerplate.
- Proof points and citation records.
- People and quotes with permission evidence.
- Restricted, embargoed, or public funding content.
- Legal identity, contacts, and disclaimers.
- Channel packs that reference approved content IDs.

## Content and approval records

Every reusable copy value has:

- A stable `contentId`.
- The current value.
- A lifecycle state.
- An accountable owner code.
- An approval record.

Approval records distinguish pending, approved, and rejected states. Approved records require a
named assignee, evidence, approver, and timestamp.

## Claim classifications

Every proof point uses one classification:

- `market-fact`
- `company-fact`
- `northwind-demo`
- `operational-date`
- `price`
- `placeholder`

Market and company facts require citation references. Northwind claims require a path into
`data/demo-data.json` and the exact visible label `Northwind Labs demo`. Placeholders are draft-only
and must remain visibly bracketed.

## Funding defaults

Funding visibility is one of `restricted`, `embargoed`, or `public`.

Restricted and embargoed funding must set both default-gallery and default-export inclusion to
`false`. A campaign cannot become public while its funding record remains restricted or embargoed.

The draft fixture contains no real funding amount, investor, round, close date, or quote.

## Channel packs

A channel pack declares its channel, audiences, referenced content IDs, lifecycle, owner, and
approval. It cannot reference an audience absent from the campaign or a content ID absent from the
campaign record.

## Verification

Run:

```sh
npm run verify:campaign-content
```

The dependency-free verifier checks:

- Schema and fixture JSON syntax.
- Campaign, content, claim, citation, person, quote, and pack ID uniqueness.
- Lifecycle and approval states.
- Owner references and named-owner requirements after draft.
- Claim citations and Northwind demo labeling.
- Placeholder restrictions.
- Quote and channel-pack references.
- Restricted-funding gallery and export defaults.
- Public campaign and funding visibility consistency.

It also executes negative guard cases proving that an uncited company fact, restricted funding in a
default export, a public campaign with restricted funding, and approved placeholder copy all fail.

## Next work

- EP-102 defines the visual-template manifest that consumes these content IDs.
- EP-103 defines campaign version and export filename conventions.
- EP-104 formalizes lifecycle transitions.
- EP-105 expands citation and Northwind validation.
- EP-110 adds output-level unresolved-placeholder detection.
- EP-111 enforces restricted content in galleries and generated exports.
