# Alfred Design System Expansion Tasks

Status: implementation complete; release checklist blocked by external content approval
Program brief: [`EXPANSION_PROJECT.md`](EXPANSION_PROJECT.md)
Last updated: 2026-07-24

## Current progress

- [x] EP-001: added the program brief.
- [x] EP-002: added the execution backlog.
- [x] EP-003: linked the program from the broader roadmap.
- [x] EP-004: inventoried the headline library counts in
  [`EXPANSION_AUDIT.md`](EXPANSION_AUDIT.md).
- [x] EP-005: assigned all 387 tracked visual sources a disposition in
  [`data/expansion-asset-inventory.csv`](data/expansion-asset-inventory.csv).
- [x] EP-006: reconciled documented counts with tracked source in
  [`EXPANSION_AUDIT.md`](EXPANSION_AUDIT.md).
- [x] EP-007: audited every social master in
  [`EXPANSION_SOCIAL_AUDIT.md`](EXPANSION_SOCIAL_AUDIT.md).
- [x] EP-008: audited website, email, deck, and collateral positioning in
  [`EXPANSION_POSITIONING_AUDIT.md`](EXPANSION_POSITIONING_AUDIT.md).
- [x] EP-009: produced the audience and channel gap matrix in
  [`EXPANSION_GAP_MATRIX.md`](EXPANSION_GAP_MATRIX.md).
- [x] EP-010: defined the flagship content checklist and approval ownership in
  [`EXPANSION_CONTENT_CHECKLIST.md`](EXPANSION_CONTENT_CHECKLIST.md).

## How to use this backlog

- Priorities are P0 for flagship blockers, P1 for flagship quality or completeness, and P2 for
  reusable follow-up capability.
- A task may start only after its listed dependencies are complete or explicitly waived in a recorded
  decision.
- A checked task means its acceptance evidence exists in the repository.
- Every implementation task includes source files, exports where relevant, documentation, and tests.
- Campaign operations, budgets, targeting, publishing, and attribution are out of scope.

## EP-00: Program setup and audit

| ID | Pri | Task | Depends on |
|---|---|---|---|
| EP-001 | P0 | Add `EXPANSION_PROJECT.md`. | None |
| EP-002 | P0 | Add `EXPANSION_TASKS.md`. | EP-001 |
| EP-003 | P0 | Link both expansion documents from `ROADMAP.md` and name the expansion as the next major initiative. | EP-001, EP-002 |
| EP-004 | P0 | Inventory the claimed 115 components, 102 social frames, 19 email templates, 13 pages, 27 website sections, 16 decks, and 12 collateral documents. Reconcile the component claim with existing documentation that reports 113. Evidence: [`EXPANSION_AUDIT.md`](EXPANSION_AUDIT.md). | EP-001 |
| EP-005 | P0 | Mark every existing asset as reusable, needs revision, campaign-specific, redundant, or deprecated. Evidence: [`data/expansion-asset-inventory.csv`](data/expansion-asset-inventory.csv). | EP-004 |
| EP-006 | P0 | Compare documented asset counts with tracked repository files and record every discrepancy. Evidence: [`EXPANSION_AUDIT.md`](EXPANSION_AUDIT.md). | EP-004 |
| EP-007 | P0 | Audit every social frame for slots, safe zones, citations, light variants, and current platform dimensions. Evidence: [`EXPANSION_SOCIAL_AUDIT.md`](EXPANSION_SOCIAL_AUDIT.md). | EP-004 |
| EP-008 | P0 | Audit launch-related website, email, deck, and collateral assets for positioning drift. Evidence: [`EXPANSION_POSITIONING_AUDIT.md`](EXPANSION_POSITIONING_AUDIT.md). | EP-004 |
| EP-009 | P0 | Produce a visual gap matrix by audience and channel. Evidence: [`EXPANSION_GAP_MATRIX.md`](EXPANSION_GAP_MATRIX.md). | EP-005, EP-007, EP-008 |
| EP-010 | P0 | Define the flagship launch content checklist and approval owners. Evidence: [`EXPANSION_CONTENT_CHECKLIST.md`](EXPANSION_CONTENT_CHECKLIST.md). | EP-009 |

Acceptance:

- Every existing visual asset has an explicit disposition.
- No claimed library capability exists only in documentation.
- Obsolete positioning is identified before new creative production begins.
- Count discrepancies, including 113 versus 115 components, have evidence and a resolution.

## EP-10: Campaign foundation

Progress:

- [x] EP-101: campaign content schema, safe draft fixture, and verifier are documented in
  [`EXPANSION_CAMPAIGN_SCHEMA.md`](EXPANSION_CAMPAIGN_SCHEMA.md).
- [x] EP-102 through EP-112: manifest, lifecycle, claim, safe-zone, copy-limit, gallery, embargo,
  export, and approval workflow evidence is documented in
  [`EXPANSION_CAMPAIGN_WORKFLOW.md`](EXPANSION_CAMPAIGN_WORKFLOW.md).

| ID | Pri | Task | Depends on |
|---|---|---|---|
| EP-101 | P0 | Define the campaign content schema. Evidence: [`EXPANSION_CAMPAIGN_SCHEMA.md`](EXPANSION_CAMPAIGN_SCHEMA.md). | EP-010 |
| EP-102 | P0 | Define the visual-template manifest schema. | EP-007, EP-101 |
| EP-103 | P0 | Define filename, export, and campaign-version conventions. | EP-102 |
| EP-104 | P0 | Define draft, reviewed, approved, embargoed, and public states. | EP-101 |
| EP-105 | P0 | Define citation and Northwind demo-data validation rules. | EP-101 |
| EP-106 | P0 | Define platform-safe-zone metadata. | EP-007, EP-102 |
| EP-107 | P0 | Define copy-length and line-clamp limits for every placement. | EP-007, EP-102 |
| EP-108 | P1 | Create the campaign gallery information architecture. | EP-102, EP-104 |
| EP-109 | P1 | Add safe-zone and crop preview overlays. | EP-106, EP-108 |
| EP-110 | P0 | Add unresolved-placeholder detection. | EP-101, EP-102 |
| EP-111 | P0 | Add an embargo guard that blocks sensitive content from default builds. | EP-104 |
| EP-112 | P0 | Document the campaign creation and approval workflow. | EP-103, EP-104, EP-105, EP-111 |

Acceptance:

- One approved content file can drive every launch surface.
- Templates do not duplicate funding facts or unapproved claims.
- Embargoed details cannot be exported accidentally.
- Schema fixtures cover valid, invalid, demo, confidential, and embargoed examples.

## EP-20: Launch visual primitives

Progress:

- [x] EP-201 through EP-215: the reusable primitive registry, composition rules, ratio behavior,
  theme relationships, copy limits, and misuse guidance are documented in
  [`EXPANSION_VISUAL_PRIMITIVES.md`](EXPANSION_VISUAL_PRIMITIVES.md).

| ID | Pri | Task | Depends on |
|---|---|---|---|
| EP-201 | P0 | Design the funding-announcement masthead. | EP-101, EP-102 |
| EP-202 | P0 | Design the decision-intelligence category lockup. | EP-101, EP-102 |
| EP-203 | P0 | Design funding amount treatments for public and embargoed states. | EP-104, EP-111 |
| EP-204 | P0 | Design founder quote and founder-letter systems. | EP-101 |
| EP-205 | P1 | Design investor and partner logo rails. | EP-102 |
| EP-206 | P0 | Design market-stat and citation systems. | EP-105 |
| EP-207 | P0 | Design product screenshot enclosures. | EP-102 |
| EP-208 | P1 | Design product feature labels and annotation rails. | EP-207 |
| EP-209 | P1 | Design comparison and transformation layouts. | EP-102 |
| EP-210 | P1 | Design press quote and publication treatments. | EP-102 |
| EP-211 | P0 | Design campaign CTA and URL footers. | EP-102 |
| EP-212 | P0 | Design legal, disclaimer, and demo-data treatments. | EP-105 |
| EP-213 | P0 | Design editorial headline compositions for square, portrait, landscape, and vertical ratios. | EP-102, EP-107 |
| EP-214 | P1 | Produce dark, light, and transparent variants where appropriate. | EP-201 to EP-213 |
| EP-215 | P1 | Document composition rules, copy limits, and misuse examples. | EP-201 to EP-214 |

Acceptance:

- Every primitive works in at least three aspect-ratio families.
- No primitive depends on one funding amount or headline.
- A reviewer can recognize Alfred creative without seeing the logo.
- Real-size previews meet contrast, crop, and copy-limit requirements.

## EP-30: Meta, Facebook, Instagram, and LinkedIn visual factory

Progress:

- [x] EP-301 through EP-322: all family, placement, composition, copy, theme, crop, carousel, export,
  and contact-sheet evidence is documented in
  [`EXPANSION_SOCIAL_FACTORY.md`](EXPANSION_SOCIAL_FACTORY.md).

| ID | Pri | Task | Depends on |
|---|---|---|---|
| EP-301 | P0 | Create the funding announcement family. | EP-201, EP-203, EP-206, EP-211 |
| EP-302 | P0 | Create the category-definition family. | EP-202, EP-213 |
| EP-303 | P0 | Create the product-proof family. | EP-207, EP-208, EP-801 |
| EP-304 | P0 | Create the founder-POV family. | EP-204, EP-213 |
| EP-305 | P1 | Create the market-problem family. | EP-206, EP-209 |
| EP-306 | P0 | Create the decision-intelligence education family. | EP-202, EP-209 |
| EP-307 | P0 | Create the Alfred Core and moat family. | EP-202, EP-805 |
| EP-308 | P1 | Create the product-feature spotlight family. | EP-207, EP-208, EP-801 |
| EP-309 | P1 | Create the customer or demo scenario family. | EP-105, EP-212, EP-801 |
| EP-310 | P1 | Create the press and media coverage family. | EP-210 |
| EP-311 | P1 | Create the hiring and growth family. | EP-213 |
| EP-312 | P0 | Create the launch countdown and launch-day family. | EP-201, EP-211, EP-213 |
| EP-313 | P1 | Create the post-launch recap family. | EP-206, EP-211 |
| EP-314 | P2 | Create the event and webinar family. | EP-211, EP-213 |
| EP-315 | P2 | Create the retargeting product-proof family as visual assets only. | EP-303 |
| EP-316 | P1 | Create LinkedIn company and founder-profile banner systems. | EP-204, EP-213 |
| EP-317 | P1 | Create Facebook cover and event-cover systems. | EP-213 |
| EP-318 | P0 | Create launch carousel cover, narrative, proof, product, quote, and CTA pages. | EP-201, EP-204, EP-206, EP-207, EP-211 |
| EP-319 | P1 | Create document-carousel exports for LinkedIn. | EP-318 |
| EP-320 | P0 | Add crop simulation for every placement. | EP-106, EP-109 |
| EP-321 | P0 | Add batch export with deterministic filenames. | EP-103, EP-102 |
| EP-322 | P0 | Add a visual contact sheet for launch approvals. | EP-108, EP-321 |

Every family must support:

- LinkedIn portrait and square.
- Meta and Facebook landscape, square, portrait, and story.
- Instagram square, portrait, story, and reel cover.
- Feed-safe and story-safe crops.
- Light and dark treatments.
- Three materially different compositions, not superficial color variants.
- Short, medium, and long approved-copy configurations.
- Product-led, editorial-led, and illustration-led variants where relevant.

Acceptance:

- The flagship can publish for four weeks without repeating a composition family.
- Creatives remain readable at real feed sizes.
- Every numerical claim has a visible citation or demo-data label.
- Exports contain no campaign budget or audience-targeting configuration.

## EP-40: Website launch and funding announcement

Progress:

- [x] EP-401 through EP-416: the responsive, campaign-driven launch page, interactive category
  story, product proof, Alfred Core, cross-function map, optional-content states, Open Graph
  mappings, reduced-motion behavior, and browser stress tests are documented in
  [`EXPANSION_WEBSITE_LAUNCH.md`](EXPANSION_WEBSITE_LAUNCH.md).

| ID | Pri | Task | Depends on |
|---|---|---|---|
| EP-401 | P0 | Design the flagship funding-announcement landing page. | EP-201 to EP-213 |
| EP-402 | P0 | Design a homepage launch-state hero. | EP-201, EP-202, EP-207 |
| EP-403 | P0 | Design the decision-intelligence category section. | EP-202, EP-209 |
| EP-404 | P0 | Design the what changed, why, and what to do interactive story. | EP-209, EP-801 |
| EP-405 | P0 | Design the Alfred Core moat visualization. | EP-805 |
| EP-406 | P0 | Design a product-proof gallery using real Alfred interfaces. | EP-801, EP-802 |
| EP-407 | P1 | Design the cross-function module map. | EP-805, EP-806 |
| EP-408 | P1 | Design investor and partner recognition sections. | EP-205 |
| EP-409 | P0 | Design the founder-letter editorial layout. | EP-204 |
| EP-410 | P1 | Design the press and media section. | EP-210 |
| EP-411 | P1 | Design the launch timeline and company-milestone section. | EP-213 |
| EP-412 | P1 | Design the recruitment and hiring CTA. | EP-211 |
| EP-413 | P0 | Create announcement, press, product, and investor Open Graph variants. | EP-301, EP-303, EP-310 |
| EP-414 | P0 | Create mobile, tablet, desktop, and wide-screen compositions. | EP-401 to EP-413 |
| EP-415 | P0 | Add reduced-motion behavior and static fallbacks. | EP-601, EP-614, EP-615 |
| EP-416 | P0 | Test long headlines, missing logos, absent quotes, and embargoed funding details. | EP-401 to EP-415, EP-904, EP-913 |

Acceptance:

- The page tells one story from category to product to moat to company momentum.
- Product visuals are real components or approved screenshots.
- Mobile retains the narrative hierarchy.
- No launch fact exists only as hardcoded page copy.

## EP-50: Investor and funding materials

Progress:

- [x] EP-501 through EP-516: the 22-slide investor system, proof metadata, reusable diagrams,
  placeholder guards, teaser, executive summary, data-room system, confidentiality modes, and public
  adaptations are documented in
  [`EXPANSION_INVESTOR_SYSTEM.md`](EXPANSION_INVESTOR_SYSTEM.md).

| ID | Pri | Task | Depends on |
|---|---|---|---|
| EP-501 | P0 | Create a reusable 20 to 24 slide investor-deck system. | EP-101, EP-102, EP-201 to EP-213 |
| EP-502 | P0 | Cover problem, category, solution, product, market, business model, go-to-market, competition, moat, traction, team, financial model, use of funds, and vision. | EP-501 |
| EP-503 | P0 | Create reusable market-sizing diagrams. | EP-105, EP-206 |
| EP-504 | P0 | Create competition and positioning maps. | EP-202, EP-209 |
| EP-505 | P0 | Create product architecture and Alfred Core diagrams. | EP-405, EP-801 |
| EP-506 | P1 | Create go-to-market and expansion diagrams. | EP-501 |
| EP-507 | P0 | Create traction and growth chart patterns. | EP-105, EP-206 |
| EP-508 | P0 | Create revenue, pipeline, retention, and unit-economics slide patterns. | EP-105, EP-206 |
| EP-509 | P1 | Create team, hiring, and use-of-funds layouts. | EP-501 |
| EP-510 | P1 | Create appendix and diligence slide patterns. | EP-501 |
| EP-511 | P0 | Create a one-page investor teaser. | EP-501, EP-502 |
| EP-512 | P0 | Create a visual executive summary. | EP-501, EP-502 |
| EP-513 | P0 | Create a data-room cover and section-divider system. | EP-501 |
| EP-514 | P0 | Create confidential, draft, and public watermarks. | EP-104 |
| EP-515 | P1 | Create public funding-announcement deck adaptations. | EP-301, EP-501 |
| EP-516 | P0 | Verify that placeholder traction is visibly labeled and cannot be mistaken for company proof. | EP-105, EP-212, EP-905, EP-906 |

Acceptance:

- The deck can be updated without redesigning slides.
- Confidential and public versions are visually and operationally distinct.
- Every chart exposes source, period, unit, and status.
- No fabricated company metric appears as proof.

## EP-60: Motion and video toolkit

Progress:

- [x] EP-601 through EP-617: the interruptible sequence registry, four timeline durations, four
  ratio masters, exact poster frames, reduced-motion behavior, photosensitivity guards, and reuse
  guidance are documented in
  [`EXPANSION_MOTION_TOOLKIT.md`](EXPANSION_MOTION_TOOLKIT.md).

| ID | Pri | Task | Depends on |
|---|---|---|---|
| EP-601 | P0 | Define campaign motion personality, timing, easing, and transition rules. | EP-202, EP-215 |
| EP-602 | P1 | Create logo reveal and logo close sequences. | EP-601 |
| EP-603 | P0 | Create the decision-intelligence category reveal. | EP-202, EP-601 |
| EP-604 | P0 | Create a kinetic headline system. | EP-213, EP-601 |
| EP-605 | P0 | Create the signal to evidence to recommendation to action sequence. | EP-601, EP-805 |
| EP-606 | P0 | Create the Alfred Core memory and compounding-intelligence sequence. | EP-601, EP-805 |
| EP-607 | P0 | Create product-window entrance and annotation motion. | EP-207, EP-208, EP-601, EP-801 |
| EP-608 | P1 | Create metric-count and chart-reveal patterns. | EP-206, EP-601 |
| EP-609 | P1 | Create founder quote and lower-third systems. | EP-204, EP-601 |
| EP-610 | P1 | Create press quote and publication reveals. | EP-210, EP-601 |
| EP-611 | P0 | Create a funding-announcement end card. | EP-201, EP-203, EP-211, EP-601 |
| EP-612 | P1 | Create story and reel title cards. | EP-213, EP-601 |
| EP-613 | P0 | Create 6, 10, 15, and 30 second composition timelines. | EP-602 to EP-612 |
| EP-614 | P0 | Create horizontal, square, portrait, and vertical motion masters. | EP-613 |
| EP-615 | P0 | Add poster-frame exports for environments without motion. | EP-614 |
| EP-616 | P0 | Add reduced-motion and photosensitivity checks. | EP-614, EP-615 |
| EP-617 | P1 | Document reusable and launch-specific sequences. | EP-602 to EP-616 |

Acceptance:

- Every sequence communicates hierarchy, explanation, feedback, or state change.
- No decorative perpetual motion ships.
- Static poster frames remain complete and understandable.
- Masters can be adapted without reconstructing timelines.

## EP-70: Press, email, founder, and launch support visuals

Progress:

- [x] EP-701 through EP-714: the press and PDF treatment, public media kit, four image-independent
  email audiences, founder and advocacy mappings, profile and event systems, visual command center,
  and recap reuse are documented in
  [`EXPANSION_LAUNCH_SUPPORT.md`](EXPANSION_LAUNCH_SUPPORT.md).

| ID | Pri | Task | Depends on |
|---|---|---|---|
| EP-701 | P0 | Create a press-release page and PDF treatment. | EP-201, EP-210, EP-212 |
| EP-702 | P0 | Create a media-kit landing page. | EP-701 |
| EP-703 | P0 | Create downloadable logo, founder-photo, product-shot, and company-description bundles. | EP-104, EP-702, EP-801 |
| EP-704 | P0 | Create the launch-announcement email. | EP-201, EP-204, EP-207, EP-211 |
| EP-705 | P0 | Create the investor-update email. | EP-204, EP-206, EP-514 |
| EP-706 | P1 | Create the founder personal-announcement email. | EP-204 |
| EP-707 | P1 | Create the customer and waitlist launch email. | EP-207, EP-211 |
| EP-708 | P1 | Create employee and partner advocacy cards. | EP-205, EP-301 |
| EP-709 | P0 | Create founder LinkedIn post image families. | EP-204, EP-304 |
| EP-710 | P1 | Create team launch profile and banner kits. | EP-316 |
| EP-711 | P1 | Create press interview and podcast thumbnail systems. | EP-210, EP-213 |
| EP-712 | P2 | Create event, webinar, demo-day, and replay visuals. | EP-314, EP-612 |
| EP-713 | P1 | Create launch-day internal command-centre visuals. | EP-108, EP-322 |
| EP-714 | P1 | Create post-launch milestone and recap systems. | EP-313 |

Acceptance:

- Press, investor, founder, employee, and customer audiences have distinct treatments.
- Email assets remain understandable with images disabled.
- Media-kit exports contain only approved public information.

## EP-80: Product imagery and illustration

Progress:

- [x] EP-801 through EP-811: the 12 product-shot masters, 48 responsive crops, transparent cutouts,
  24-symbol vector illustration family, alt text, standalone exports, previews, visual rules, and
  cliché guards are documented in
  [`EXPANSION_PRODUCT_ASSETS.md`](EXPANSION_PRODUCT_ASSETS.md).

| ID | Pri | Task | Depends on |
|---|---|---|---|
| EP-801 | P0 | Art-direct the 12 flagship product shots listed in the program brief. | EP-005, EP-010 |
| EP-802 | P0 | Create responsive screenshot crops and annotation systems. | EP-207, EP-208, EP-801 |
| EP-803 | P1 | Create transparent-background product cutouts. | EP-801 |
| EP-804 | P0 | Define illustration geometry, depth, texture, stroke, and lighting. | EP-202, EP-215 |
| EP-805 | P0 | Produce the initial 20 to 24 illustration set. | EP-804 |
| EP-806 | P1 | Produce module-specific illustration variants. | EP-805 |
| EP-807 | P1 | Produce background textures and transition plates. | EP-804 |
| EP-808 | P1 | Produce launch-celebration and milestone visuals. | EP-804 |
| EP-809 | P0 | Add alt text and semantic descriptions. | EP-801 to EP-808 |
| EP-810 | P0 | Add source files, export files, and thumbnail previews. | EP-801 to EP-809 |
| EP-811 | P0 | Review the full set for AI-art clichés and visual inconsistency. | EP-805 to EP-810 |

Acceptance:

- Illustrations feel like one authored family.
- Product screenshots match the current product.
- Every raster asset records source, export, dimensions, and accessibility description.
- Every product shot has desktop, portrait, square, and motion-ready crops.

## EP-90: Tooling, documentation, and quality gates

Progress:

- [x] EP-901 through EP-916: gallery filters, exact exports, font and overflow checks, proof guards,
  dimension and size reporting, crop and visual baselines, parity checks, motion regression, export
  manifests, stale and embargo warnings, adaptation guidance, and release approval are documented in
  [`EXPANSION_RELEASE.md`](EXPANSION_RELEASE.md).

| ID | Pri | Task | Depends on |
|---|---|---|---|
| EP-901 | P0 | Add gallery filters for campaign, platform, placement, theme, and approval state. | EP-108 |
| EP-902 | P0 | Add exact-size and scale-aware exports. | EP-102, EP-103 |
| EP-903 | P0 | Add font-loaded verification before capture. | EP-902 |
| EP-904 | P0 | Add overflow and clipping detection. | EP-102, EP-107 |
| EP-905 | P0 | Add unresolved-slot and bracketed-placeholder detection. | EP-110 |
| EP-906 | P0 | Add citation and demo-label validation. | EP-105 |
| EP-907 | P1 | Add image-dimension and file-size reporting. | EP-902 |
| EP-908 | P0 | Add safe-zone crop snapshots. | EP-106, EP-109 |
| EP-909 | P1 | Add light and dark parity checks. | EP-214 |
| EP-910 | P0 | Add visual-regression baselines for campaign masters. | EP-901, EP-902 |
| EP-911 | P1 | Add motion poster-frame regression tests. | EP-615 |
| EP-912 | P0 | Add export-manifest generation. | EP-102, EP-103, EP-902 |
| EP-913 | P0 | Add stale-content and embargo-state warnings. | EP-104, EP-111 |
| EP-914 | P1 | Document how to create a campaign family. | EP-112, first approved family |
| EP-915 | P1 | Document how to adapt a campaign without breaking Alfred's visual language. | EP-215, first approved family |
| EP-916 | P0 | Add a launch-day asset approval checklist. | EP-112, EP-322, EP-912 |

Acceptance:

- A complete flagship launch pack can be regenerated from approved content.
- No export contains placeholders, overflow, missing citations, or incorrect dimensions.
- Every master survives human review at its actual consumption size.
- Restricted campaign content stays absent from default builds and inventories.

## Milestone checklists

### Milestone 1: Foundation ready

- [x] EP-00 complete.
- [x] EP-10 complete.
- [x] EP-20 complete.
- [x] Campaign content and manifest schemas have fixtures and validation.
- [x] Safe zones, copy limits, citation rules, and export conventions are implemented and verified.
- [x] Embargo guard has a failing test that proves restricted content is blocked.

### Milestone 2: Static launch factory ready

- [x] All P0 tasks in EP-30 complete.
- [x] EP-40 substantially complete.
- [x] EP-80 substantially complete.
- [x] Website masters pass responsive review.
- [x] Social masters pass crop and real-feed-size review.
- [x] Product and illustration sources, exports, thumbnails, and alt text exist.

### Milestone 3: Funding system ready

- [x] EP-50 complete.
- [x] EP-701 to EP-705 complete.
- [x] Confidential, draft, embargoed, approved, and public states are visibly distinct.
- [x] Data-room, press, investor, and announcement masters use the correct content state.
- [x] Placeholder traction cannot be mistaken for real proof.

### Milestone 4: Motion launch ready

- [x] EP-60 complete.
- [x] All four aspect-ratio masters exist.
- [x] All four timeline lengths exist.
- [x] Poster frames and reduced-motion fallbacks are implemented and verified.
- [x] Photosensitivity and quarter-speed reviews pass.

### Milestone 5: Flagship launch complete

- [x] All P0 and P1 implementation tasks are complete.
- [ ] All launch content is approved.
- [x] Exact-size, overflow, citation, contrast, crop, and embargo gates pass.
- [ ] Brand, editorial, product, accessibility, legal, citation, and platform reviews pass.
- [ ] Five critics approve the final contact sheet at real consumption sizes.
- [ ] The public launch pack regenerates from approved content with deterministic filenames.
- [x] No restricted asset appears in the public gallery, inventory, or export bundle.

## Ongoing quarterly checklist

- [ ] Review platform dimensions and safe zones.
- [ ] Audit current campaign families for usage, duplication, and retirement.
- [ ] Refresh product screenshots after material product changes.
- [ ] Audit investor, press, and marketing claims.
- [ ] Review citation freshness and embargo state.
- [ ] Add illustration or motion only when a reusable pattern has emerged.
- [ ] Synchronize campaign tooling, documentation, manifests, and visual baselines.
- [ ] Record asset-count and capability changes in the repository documentation.
