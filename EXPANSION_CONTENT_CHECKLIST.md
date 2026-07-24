# Alfred Flagship Launch Content Checklist

Status: EP-010 complete
Checklist owner: Raghav, Head of Marketing
Snapshot date: 2026-07-24

## Purpose

This checklist defines the content required for the first flagship company and funding launch, the
role accountable for each content class, the evidence required for approval, and the conditions that
block release.

It is the planning input for the campaign content schema in EP-101. It does not contain real funding
facts, investor names, founder quotes, or company proof.

## Approval principles

1. Every content item has one accountable owner role.
2. Every factual item records its source, approver, approval time, lifecycle state, and content
   version.
3. The named campaign DRI is Raghav, Head of Marketing.
4. Other organizational approvers remain role-owned until a named person is assigned.
5. A role without a named assignee blocks movement from `draft` to `reviewed`.
6. Embargoed funding details remain restricted until the legal and executive owners authorize a
   public-state transition.
7. A template owner cannot treat layout approval as factual approval.
8. Missing optional content must activate a documented fallback. It must not leave an empty slot.
9. Northwind Labs demo material cannot be approved as company proof.
10. Final public release requires all five critic reviews defined below.

## Owner roster

| Owner code | Accountable role | Named assignment | Authority |
|---|---|---|---|
| MKT | Head of Marketing and campaign DRI | Raghav | Campaign narrative, audience hierarchy, brand, editorial quality, channel coherence, final marketing sign-off. |
| EXEC | Founder or CEO | Assign before review | Company narrative, founder statements, funding announcement, executive approval, public-release authorization. |
| FUND | Fundraising or finance lead | Assign before review | Round amount, currency, round type, investor participation, use of funds, financial and traction facts. |
| LEGAL | Legal counsel | Assign before review | Embargo, confidentiality, disclaimers, naming permissions, quote permissions, legal claims, release authorization. |
| PRODUCT | Product lead | Assign before review | Product availability, feature names, module status, product claims, screenshot accuracy. |
| DESIGN | Design-system or creative lead | Assign before review | Visual language, template composition, image quality, illustration consistency, motion quality. |
| PRESS | Communications or PR lead | Assign before review | Press release, media kit, publication relationships, boilerplate, media contacts. |
| RESEARCH | Research or content-fact-check lead | Assign before review | Citation records, source freshness, market-stat accuracy, claim classification. |
| SECURITY | Security or data-governance lead | Assign before review | Security, privacy, data handling, provenance, and trust statements. |
| PEOPLE | People or recruiting lead | Assign before review | Team biographies, titles, open roles, hiring claims, employee imagery. |
| WEB | Web production lead | Assign before production | Website implementation, metadata, Open Graph, responsive content behavior. |
| CRM | Lifecycle or email lead | Assign before production | Email copy, fallback text, rendering, unsubscribe and sender details. |
| SOCIAL | Social or content lead | Assign before production | Placement copy, account handles, captions, post sequencing, platform handoff. |
| ACCESS | Accessibility reviewer | Assign before approval | Contrast, alt text, semantic descriptions, images-off meaning, reduced motion. |
| RELEASE | Campaign production and release lead | Assign before approval | Asset inventory, filenames, export manifest, approval evidence, public bundle integrity. |

One person may hold multiple roles, but the approval record must preserve which authority they used.
Factual, legal, and public-release approval cannot be inferred from a marketing or design approval.

## Required approval record

Every checklist item that reaches `reviewed`, `approved`, `embargoed`, or `public` records:

- Content ID.
- Content version.
- Lifecycle state.
- Accountable owner code.
- Named owner.
- Source file, source URL, or signed written confirmation.
- Approver name and role.
- Approval timestamp and timezone.
- Expiry or review date where the fact can become stale.
- Public-safe value.
- Restricted value, if different.
- Notes and required disclaimer.

## A. Campaign identity and lifecycle

- [ ] **FC-001:** Campaign ID and machine-safe slug. Owner: MKT. Approvers: MKT, RELEASE.
- [ ] **FC-002:** Public campaign name. Owner: MKT. Approvers: MKT, EXEC.
- [ ] **FC-003:** Internal campaign version and revision policy. Owner: RELEASE. Approvers: MKT.
- [ ] **FC-004:** Release date, time, timezone, and authorized publication window. Owner: MKT.
  Approvers: EXEC, LEGAL.
- [ ] **FC-005:** Embargo date, time, timezone, and permitted recipients. Owner: LEGAL. Approvers:
  EXEC, LEGAL.
- [ ] **FC-006:** Lifecycle state for every content record. Owner: RELEASE. Approvers: MKT, LEGAL.
- [ ] **FC-007:** Public site URL, announcement URL, press URL, and media-kit URL. Owner: WEB.
  Approvers: MKT, PRESS.
- [ ] **FC-008:** Public contact, press contact, investor contact, and support contact. Owner: PRESS.
  Approvers: MKT, EXEC.

Release blocker: any date without timezone, any missing named owner, or any restricted record without
an embargo state.

## B. Narrative and editorial canon

- [ ] **FC-010:** One-sentence category definition using “decision intelligence platform.” Owner:
  MKT. Approvers: MKT, EXEC.
- [ ] **FC-011:** Flagship headline and approved short, medium, and long variants. Owner: MKT.
  Approvers: MKT, DESIGN.
- [ ] **FC-012:** Supporting narrative from signal to evidence to decision to approved action. Owner:
  MKT. Approvers: MKT, PRODUCT.
- [ ] **FC-013:** Alfred Core moat statement and approved pillar descriptions. Owner: PRODUCT.
  Approvers: PRODUCT, MKT.
- [ ] **FC-014:** Cross-function intelligence story covering marketing, sales, finance, operations,
  and founders without overstating module availability. Owner: PRODUCT. Approvers: PRODUCT, MKT.
- [ ] **FC-015:** Approved anti-positioning language. Owner: MKT. Approvers: MKT.
- [ ] **FC-016:** Audience-specific narrative variants for market, prospects, customers, founders,
  investors, press, employees, partners, and candidates. Owner: MKT. Approvers: MKT, relevant owner.
- [ ] **FC-017:** Approved CTA set and destination URLs. Owner: MKT. Approvers: MKT, WEB.
- [ ] **FC-018:** Company boilerplate in short, standard, and extended forms. Owner: PRESS.
  Approvers: PRESS, MKT, EXEC, LEGAL.
- [ ] **FC-019:** Frequently asked questions and approved answers. Owner: MKT. Approvers: PRODUCT,
  LEGAL, SECURITY as relevant.

Release blocker: retired category language, conflicting module status, or a CTA without an approved
destination.

## C. Funding and investor facts

All items in this section default to restricted and embargoed.

- [ ] **FC-020:** Round type. Owner: FUND. Approvers: FUND, EXEC, LEGAL.
- [ ] **FC-021:** Funding amount, currency, and display format. Owner: FUND. Approvers: FUND, EXEC,
  LEGAL.
- [ ] **FC-022:** Close date and announcement date. Owner: FUND. Approvers: FUND, EXEC, LEGAL.
- [ ] **FC-023:** Lead investor name and approved logo asset. Owner: FUND. Approvers: FUND, LEGAL.
- [ ] **FC-024:** Participating investor names, ordering, and approved logos. Owner: FUND. Approvers:
  FUND, LEGAL.
- [ ] **FC-025:** Existing investor and partner recognition list. Owner: FUND. Approvers: FUND, LEGAL.
- [ ] **FC-026:** Approved use-of-funds statement. Owner: FUND. Approvers: FUND, EXEC, LEGAL.
- [ ] **FC-027:** Investor quote, attribution, title, and written permission. Owner: FUND. Approvers:
  quoted investor, LEGAL.
- [ ] **FC-028:** Public and confidential funding-amount treatments. Owner: DESIGN. Approvers: FUND,
  LEGAL, MKT.
- [ ] **FC-029:** Investor-deck financial, market, traction, and use-of-funds data package. Owner:
  FUND. Approvers: FUND, EXEC, LEGAL.

Release blocker: a funding fact without signed source evidence, a logo without permission, or a
restricted value appearing in a public-safe field.

## D. Founder, company, and people content

- [ ] **FC-030:** Founder names, current titles, preferred ordering, and pronunciation notes. Owner:
  EXEC. Approvers: each founder, PEOPLE.
- [ ] **FC-031:** Founder biographies in short and long forms. Owner: PRESS. Approvers: each founder,
  MKT.
- [ ] **FC-032:** Founder announcement quote and written approval. Owner: EXEC. Approvers: quoted
  founder, MKT, LEGAL.
- [ ] **FC-033:** Founder letter. Owner: EXEC. Approvers: EXEC, MKT, LEGAL.
- [ ] **FC-034:** Approved founder photos, crops, credits, usage rights, and alt text. Owner: PRESS.
  Approvers: each founder, LEGAL, ACCESS.
- [ ] **FC-035:** Team facts and company milestones. Owner: PEOPLE. Approvers: PEOPLE, EXEC.
- [ ] **FC-036:** Hiring priorities and currently open roles. Owner: PEOPLE. Approvers: PEOPLE, EXEC.
- [ ] **FC-037:** Employee and partner advocacy copy. Owner: MKT. Approvers: PEOPLE or FUND as
  relevant, LEGAL.

Release blocker: a person, title, role, quote, opening, or photograph without current approval.

## E. Product facts and proof

- [ ] **FC-040:** Current product one-liner. Owner: PRODUCT. Approvers: PRODUCT, MKT.
- [ ] **FC-041:** Current module availability and release status. Owner: PRODUCT. Approvers: PRODUCT,
  MKT.
- [ ] **FC-042:** Approved feature names and descriptions. Owner: PRODUCT. Approvers: PRODUCT.
- [ ] **FC-043:** Twelve flagship product-shot scenarios. Owner: PRODUCT. Approvers: PRODUCT, DESIGN.
- [ ] **FC-044:** Source build, capture date, account state, and data classification for every
  screenshot. Owner: PRODUCT. Approvers: PRODUCT, SECURITY.
- [ ] **FC-045:** Desktop, portrait, square, transparent, and motion-ready crop approvals. Owner:
  DESIGN. Approvers: DESIGN, PRODUCT, ACCESS.
- [ ] **FC-046:** Product annotation copy and source references. Owner: PRODUCT. Approvers: PRODUCT,
  MKT.
- [ ] **FC-047:** Security, privacy, data isolation, provenance, and human-approval statements.
  Owner: SECURITY. Approvers: SECURITY, LEGAL, PRODUCT.
- [ ] **FC-048:** Pricing, plan limits, introductory offer, and expiry state. Owner: MKT. Approvers:
  FUND or finance owner, PRODUCT, LEGAL.

Release blocker: stale screenshots, unavailable features presented as live, or product proof without
a capture source and date.

## F. Claims, citations, and demo data

- [ ] **FC-050:** Market-stat claims with exact source title, publisher, date, URL, page, and approved
  display citation. Owner: RESEARCH. Approvers: RESEARCH, LEGAL, MKT.
- [ ] **FC-051:** Company traction and outcome claims with signed internal evidence. Owner: FUND.
  Approvers: FUND, EXEC, LEGAL.
- [ ] **FC-052:** Northwind Labs demo claims mapped to `data/demo-data.json`. Owner: PRODUCT.
  Approvers: PRODUCT, MKT.
- [ ] **FC-053:** Claim classification for every number: cited market fact, approved company fact,
  Northwind demo, operational date, price, or prohibited placeholder. Owner: RESEARCH. Approvers:
  RESEARCH, LEGAL.
- [ ] **FC-054:** Visible demo label and disclaimer variants. Owner: MKT. Approvers: MKT, LEGAL.
- [ ] **FC-055:** Citation-shortening rules for social, motion, website, deck, email, and PDF
  placements. Owner: RESEARCH. Approvers: RESEARCH, DESIGN, ACCESS.
- [ ] **FC-056:** Resolution plan for the 14 unsupported outcome patterns found in
  `EXPANSION_POSITIONING_AUDIT.md`. Owner: MKT. Approvers: MKT, RESEARCH, LEGAL.

Release blocker: any numerical claim without a classification and approved evidence.

## G. Channel content packs

- [ ] **FC-060:** Funding landing page and homepage launch-state copy. Owner: MKT. Approvers: MKT,
  EXEC, FUND, LEGAL, PRODUCT.
- [ ] **FC-061:** Website category, Alfred Core, product proof, founder letter, investor recognition,
  press, timeline, and hiring copy. Owner: MKT. Approvers: relevant domain owners.
- [ ] **FC-062:** Social copy packs for all P0 campaign families, with short, medium, and long
  configurations. Owner: SOCIAL. Approvers: MKT, LEGAL, RESEARCH.
- [ ] **FC-063:** LinkedIn company Page and founder-profile banner copy as separate placements.
  Owner: SOCIAL. Approvers: MKT, EXEC.
- [ ] **FC-064:** Investor deck, teaser, executive summary, and public announcement adaptation.
  Owner: FUND. Approvers: FUND, EXEC, LEGAL, MKT.
- [ ] **FC-065:** Press release, media kit, approved company descriptions, and media contact details.
  Owner: PRESS. Approvers: PRESS, EXEC, LEGAL, MKT.
- [ ] **FC-066:** Launch, investor, founder, customer, waitlist, employee, and partner email copy.
  Owner: CRM. Approvers: MKT and relevant domain owners.
- [ ] **FC-067:** Founder and company social captions. Owner: SOCIAL. Approvers: MKT, EXEC, LEGAL.
- [ ] **FC-068:** Motion scripts, on-screen copy, lower thirds, end cards, and poster frames. Owner:
  DESIGN. Approvers: MKT, PRODUCT, ACCESS.
- [ ] **FC-069:** Internal launch-day labels, status language, escalation copy, and handoff contacts.
  Owner: RELEASE. Approvers: MKT, PRESS, LEGAL.

Release blocker: a channel pack that introduces a fact, quote, CTA, date, or claim absent from the
approved content records.

## H. Legal, accessibility, and release content

- [ ] **FC-070:** Legal entity, registered address, press contact, privacy link, terms link, and
  unsubscribe data. Owner: LEGAL. Approvers: LEGAL.
- [ ] **FC-071:** Confidential, draft, embargoed, demo-data, and public disclaimers. Owner: LEGAL.
  Approvers: LEGAL, FUND.
- [ ] **FC-072:** Alt text and semantic descriptions for every raster, illustration, chart, logo
  rail, and product shot. Owner: ACCESS. Approvers: ACCESS, relevant content owner.
- [ ] **FC-073:** Email preheaders, images-off copy, hosted image URLs, sender identity, and
  unsubscribe behavior. Owner: CRM. Approvers: CRM, LEGAL, ACCESS.
- [ ] **FC-074:** Open Graph titles, descriptions, image alt text, and canonical URLs. Owner: WEB.
  Approvers: WEB, MKT, ACCESS.
- [ ] **FC-075:** Captions, transcripts, reduced-motion copy, and static poster-frame meaning. Owner:
  ACCESS. Approvers: ACCESS, DESIGN, MKT.
- [ ] **FC-076:** Export filenames, destinations, content version, campaign version, and approval
  state. Owner: RELEASE. Approvers: RELEASE.
- [ ] **FC-077:** Public asset inventory and restricted asset inventory. Owner: RELEASE. Approvers:
  RELEASE, LEGAL.
- [ ] **FC-078:** Launch rollback copy and corrected-asset replacement instructions. Owner: RELEASE.
  Approvers: MKT, PRESS, LEGAL.

Release blocker: missing alt text, incomplete images-off meaning, missing legal identity, or an asset
whose approval state is absent from its export record.

## Five-critic final review

No campaign family becomes approved until these five independent review lenses sign off at actual
consumption size:

| Critic | Accountable owner | Review evidence |
|---|---|---|
| Brand and editorial | MKT | Approved narrative version, copy-limit review, and visual contact-sheet comments. |
| Product and factual accuracy | PRODUCT plus RESEARCH or FUND | Screenshot source, feature-state confirmation, claim sources, and demo classification. |
| Accessibility | ACCESS | Contrast, alt text, semantic description, images-off, crop, and reduced-motion results. |
| Legal and confidentiality | LEGAL | Claim, permission, disclaimer, embargo, and public-safe review. |
| Production and platform | RELEASE | Exact dimensions, filenames, safe zones, export manifest, placeholder scan, and bundle integrity. |

The executive owner authorizes the final transition from approved or embargoed to public after all
five critic records exist.

## Flagship readiness checklist

- [ ] Every owner role has a named assignee.
- [ ] Every required FC item is approved or carries an accepted written waiver.
- [ ] Every funding item remains embargoed until the authorized public transition.
- [ ] Every number has an approved classification and source.
- [ ] Every founder, investor, partner, and publication name has permission.
- [ ] Every product screenshot has a source build and capture date.
- [ ] Every public asset has alt text or a semantic description.
- [ ] Every channel pack uses the same approved campaign version.
- [ ] Every unresolved placeholder check passes.
- [ ] Every public URL and CTA resolves to the approved destination.
- [ ] The public inventory contains no restricted record.
- [ ] All five critic reviews pass.
- [ ] EXEC, MKT, LEGAL, and RELEASE authorize publication.

## Handoff to EP-10

EP-101 should translate the FC records into the campaign content schema. EP-104 should encode their
lifecycle transitions. EP-105 should encode claim classifications. EP-111 should enforce restricted
and embargoed visibility. EP-112 should turn this checklist into the documented creation and approval
workflow.
