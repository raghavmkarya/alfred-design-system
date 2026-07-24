# Alfred Design System Expansion Project

Status: implementation complete; flagship release awaiting approved content and signoff
First major milestone: flagship company and funding launch
Program owner: Alfred design system
Last updated: 2026-07-24

## Purpose

This program turns the Alfred design system into a reusable visual launch factory. It extends the
existing component, template, and quality systems into a coordinated production system for launches,
funding announcements, investor communication, website storytelling, social creative, email, press,
product imagery, illustration, and motion.

The strategic anchor is Alfred's decision-intelligence positioning. Every launch surface should make
the same argument: Alfred turns signals into evidence, evidence into decisions, and decisions into
approved action while preserving provenance and organizational memory.

The first milestone is a complete flagship launch. The program continues after that launch through
quarterly maintenance, new reusable campaign families, refreshed product imagery, and stricter
production automation.

Execution status, task dependencies, acceptance criteria, and milestone checklists live in
[`EXPANSION_TASKS.md`](EXPANSION_TASKS.md).

## Repository ownership

This repository owns the complete visual production system:

- Approved campaign content interfaces and validation rules.
- Visual-template manifests and placement metadata.
- Website, social, email, press, investor, product, illustration, and motion masters.
- Static and motion export tooling.
- Exact-size previews, contact sheets, inventories, and approval states.
- Brand, editorial, accessibility, citation, embargo, and platform-crop quality gates.
- Documentation for creating, adapting, reviewing, and releasing campaign families.

This repository does not own:

- Campaign operations or publishing calendars.
- Media buying, budgets, bidding, or spend allocation.
- Audience targeting or retargeting logic.
- Marketing attribution or performance reporting.
- Final legal approval, investor approval, or factual approval outside the visual workflow.

The system may produce paid-media visual assets. It must never encode budget or targeting decisions.

## Program outcomes

The expansion is successful when:

1. One approved campaign content source can drive every launch surface without copying sensitive
   facts into individual templates.
2. A complete launch pack can be regenerated deterministically by campaign, family, or platform.
3. Embargoed information cannot enter default galleries, previews, or exports.
4. Numerical claims always display a citation or an explicit Northwind demo-data label.
5. Every master remains legible at its real consumption size and through common platform crops.
6. Product UI is the primary proof, with illustration used only when the product cannot explain the
   idea clearly.
7. Alfred creative remains recognizable without relying on the logo.
8. Static fallbacks preserve the full meaning of motion assets.
9. Public, draft, confidential, embargoed, and approved materials remain operationally distinct.
10. New campaign families add reusable capability instead of accumulating one-off artwork.

## Creative direction

### Core composition

Product plus editorial composition is the default. Real Alfred interfaces, decision flows, evidence,
and data storytelling provide proof. Custom illustration supports abstract ideas such as memory,
provenance, compounding knowledge, and cross-function intelligence.

Every asset should use:

- A strong editorial hierarchy.
- One deliberate gradient moment at most.
- Alfred's existing typography, color, voice, accessibility, and motion systems.
- A clear relationship among signal, evidence, decision, and action.
- Layouts that survive cropping and compression without losing identity.
- Dark and light families designed as siblings, not mechanical color inversions.

Every asset should avoid:

- Generic three-card enterprise layouts.
- Decorative AI mesh art, glowing orbs, and unexplained neural-network motifs.
- Unsupported company metrics or ambiguous demo data.
- Product mockups that misrepresent the current interface.
- Perpetual decorative motion.
- Copy embedded in templates when it belongs in approved campaign data.

### Proof hierarchy

Use evidence in this order:

1. Real Alfred UI and approved product screenshots.
2. Approved company facts, citations, and founder statements.
3. Northwind demo scenarios with a visible demo-data label.
4. Custom illustration for concepts the product cannot show directly.

## System architecture

### Campaign content source

Each campaign has one content source that separates approved messaging from layout. Its top-level
interface includes:

- `campaignId`
- `campaignName`
- `narrative`
- `audiences`
- `releaseDate`
- Approved headlines, supporting copy, calls to action, proof points, and citations.
- Founder quotes, funding details, partner and investor data, and legal copy.
- Embargo state and content lifecycle state.

Allowed lifecycle states are `draft`, `reviewed`, `approved`, `embargoed`, and `public`.

Every numerical claim must reference a citation record or carry an explicit Northwind demo-data
classification. Funding details require an embargo state. Embargoed data is excluded from default
galleries and all exports unless a reviewer intentionally requests the matching restricted build.

### Visual-template manifest

Every visual template has a machine-readable manifest that defines:

- Platform and placement.
- Pixel dimensions, aspect ratio, export scale, and safe zones.
- Theme and light, dark, or transparent-background capability.
- Required and optional content slots.
- Character, word, and line limits for every slot.
- Asset dependencies and fallback behavior.
- Static or motion output type.
- Crop behavior and preview sizes.
- Export filename convention and destination.
- Approval state and campaign-version compatibility.

The manifest is the contract between campaign content, rendering, validation, and export tooling.

### Reusable commands

The program should expose commands that:

- Generate a launch campaign from approved content.
- Export one placement, one platform, one campaign family, or the complete launch pack.
- Verify dimensions, overflow, line clamps, missing slots, citations, contrast, safe zones, and
  unresolved placeholders.
- Block sensitive or stale content based on lifecycle and embargo state.
- Produce an asset inventory with thumbnails, filenames, dimensions, campaign version, and approval
  state.

Command names and implementation details will be selected during EP-10 after the repository audit.

### Campaign gallery

The campaign gallery is the review surface for visual production. It supports filters for campaign,
platform, placement, family, theme, output type, and approval state. Authoring overlays show safe
zones, crop regions, content bounds, and exact feed-size previews. Restricted and embargoed assets do
not appear in the default gallery.

## Reusable launch primitives

The expansion adds:

- Funding announcement masthead.
- Decision-intelligence statement lockup.
- Founder quote and founder-letter treatments.
- Product proof window and screenshot enclosure.
- Source and citation footer.
- Funding amount treatment with embargo control.
- Partner and investor lockup rail.
- Press quote and publication treatment.
- Metric and market-stat treatment.
- Before and after comparison.
- Signal to evidence to decision story.
- Alfred Core memory visualization.
- Cross-function intelligence map.
- Data provenance treatment.
- CTA and URL footer systems.
- Campaign date, event, and countdown treatments.
- Legal, disclaimer, and Northwind demo-data blocks.
- Safe-zone overlays for authoring and review.

Each primitive must work across at least three aspect-ratio families and must not depend on a single
headline, funding amount, quote, or logo set.

## Product imagery system

The flagship product-shot set covers:

1. Daily Brief.
2. Seek Alfred.
3. KPI Cockpit.
4. Spend Mix.
5. AI Visibility.
6. Creative Fatigue.
7. Anomaly investigation.
8. Evidence Ledger.
9. Decision Fork.
10. Scenario simulation.
11. Approval and action.
12. Decision audit trail.

Every shot has desktop, portrait, square, and motion-ready crops. Each raster asset records its source,
export dimensions, campaign compatibility, and accessibility description. Product shots must remain
accurate to the current product and be refreshed after material product changes.

## Illustration system

The initial illustration family covers:

- Connected business stack.
- Fragmented data becoming one decision.
- Alfred Core memory.
- Signal detection and root-cause tracing.
- Cross-function intelligence.
- Compounding knowledge and continuous learning.
- Human approval and reversible action.
- Security, trust, and data provenance.
- Marketing, sales, finance, operations, and founder modules.
- Empty, waiting, success, error, and launch celebration states.
- Background textures, transition plates, and transparent cutouts.

All illustrations share geometry, stroke, depth, lighting, texture, color restraint, and export
conventions. The family should look authored as one system and should not resemble generic generated
AI artwork.

## Channel systems

### Social and paid-media visuals

Meta, Facebook, Instagram, and LinkedIn use campaign families rather than isolated frames. Each
relevant family supports:

- LinkedIn portrait and square.
- Meta and Facebook landscape, square, portrait, and story.
- Instagram square, portrait, story, and reel cover.
- Feed-safe and story-safe crops.
- Light and dark treatments.
- Three materially different compositions.
- Short, medium, and long approved-copy configurations.
- Product-led, editorial-led, and illustration-led variants where appropriate.

### Website

The flagship website story moves from category to product to moat to company momentum. It includes a
funding page, homepage launch state, decision-intelligence story, Alfred Core visualization, real
product proof, cross-function map, founder letter, investor and press recognition, company timeline,
and recruitment call to action. Mobile must retain the narrative hierarchy.

### Investor and funding materials

The investor system includes a reusable 20 to 24 slide deck, market and competition diagrams, product
and Alfred Core architecture, go-to-market diagrams, traction and financial chart patterns, team and
use-of-funds layouts, appendix patterns, a one-page teaser, an executive summary, data-room covers,
and public announcement adaptations.

Every chart exposes source, period, unit, and status. Draft, confidential, and public materials use
distinct watermarks and export paths. Placeholder traction must never look like company proof.

### Motion

Motion explains hierarchy, causality, feedback, or state change. The toolkit includes logo sequences,
category and headline reveals, decision flows, Alfred Core memory, product-window motion, chart
reveals, quote treatments, lower thirds, end cards, and reusable timelines for 6, 10, 15, and 30
seconds. Horizontal, square, portrait, and vertical masters include complete poster frames and
reduced-motion behavior.

### Press, email, founder, and launch support

The system includes press-release and media-kit surfaces, approved public download bundles, launch
and investor emails, founder and customer messages, advocacy cards, founder social families, team
profile kits, interview thumbnails, event visuals, internal command-centre visuals, and recap assets.
Email meaning must survive when images are disabled.

## Release and approval model

### Approval dimensions

Campaign families receive separate reviews for:

- Brand and editorial quality.
- Product accuracy.
- Accessibility and contrast.
- Legal and factual claims.
- Citations and demo-data labeling.
- Embargo and confidentiality state.
- Platform dimensions and cropping.
- Motion safety and reduced-motion behavior.

No family is approved until five critics complete the final visual review at real consumption sizes.

### Release classes

- Draft build: unresolved content is allowed but visibly marked and never distributed.
- Review build: complete enough for internal critique, with restricted access where required.
- Approved build: content and visual treatment are approved, but embargo rules still apply.
- Embargoed build: restricted export requiring an explicit campaign and state selection.
- Public build: contains only approved public content and can enter default galleries and bundles.

### Deterministic exports

Export filenames include campaign ID, family, platform, placement, theme, dimensions, content version,
and asset revision. Re-running the same approved inputs should produce the same inventory and
filenames.

## Quality bar

The expansion inherits every existing component, render, accessibility, craft, type, contrast,
interaction, and visual-regression gate. Campaign-specific gates add:

- Exact dimensions and scale.
- Font-loaded verification.
- Overflow, clipping, and line-clamp checks.
- Required-slot and placeholder checks.
- Citation and Northwind demo-data checks.
- Safe-zone and crop snapshots.
- Light and dark parity.
- File-size and image-dimension reports.
- Stale-content and embargo warnings.
- Motion poster-frame regressions.

Testing includes long copy, missing optional content, missing logos, absent quotes, confidential
states, and unresolved placeholders. Website surfaces are reviewed on mobile, tablet, desktop, and
wide desktop. Email assets are reviewed in light and dark clients with images enabled and disabled.
Motion is reviewed at full speed, quarter speed, and reduced-motion settings.

## Milestones

### Milestone 1: Foundation ready

EP-00, EP-10, and EP-20 are complete. Approved content interfaces, manifests, campaign primitives,
safe zones, and export rules exist.

### Milestone 2: Static launch factory ready

EP-30, EP-40, and EP-80 are substantially complete. Website, social, paid-media visual masters,
product shots, and illustration assets are ready.

### Milestone 3: Funding system ready

EP-50 and funding-specific EP-70 work are complete. Investor materials, data-room visuals,
announcement assets, press kit, and confidential controls are ready.

### Milestone 4: Motion launch ready

EP-60 is complete. Short-form motion, launch sequences, end cards, product motion, and static
fallbacks are ready.

### Milestone 5: Flagship launch complete

All P0 and P1 work is complete, launch content is approved, every export passes verification, and the
full contact sheet has final sign-off.

## Quarterly operating model

After the flagship launch:

- Review platform dimensions and safe zones quarterly.
- Add campaign families only when real launch needs reveal a reusable pattern.
- Retire redundant or low-value templates.
- Refresh product shots after material product changes.
- Audit investor, press, and marketing claims.
- Expand illustration and motion when a repeatable pattern emerges.
- Keep campaign tooling, documentation, manifests, and visual baselines synchronized.

## Assumptions

- The category narrative is decision intelligence.
- The first flagship includes both fundraising materials and a public funding announcement.
- Paid-media scope covers visual systems for Meta, Facebook, Instagram, and LinkedIn.
- Existing Alfred colors, fonts, themes, voice, accessibility rules, and anti-slop guidance remain
  authoritative.
- Real company proof will be supplied separately.
- Until approval, templates use explicit placeholders or visible Northwind demo framing.
- EP-004 and EP-006 resolved the component discrepancy: the current tracked tree has 115 component
  sources and 115 matching declarations. Older repository text reporting 113 predates the addition
  of `EvidenceLedger` and `DecisionFork`. See [`EXPANSION_AUDIT.md`](EXPANSION_AUDIT.md).
- Existing `HANDOFF.md`, `ROADMAP.md`, and `mocks/` content remains preserved.

## Related documents

- [`EXPANSION_TASKS.md`](EXPANSION_TASKS.md): backlog, dependencies, acceptance criteria, and milestones.
- [`EXPANSION_AUDIT.md`](EXPANSION_AUDIT.md): tracked asset inventory and count reconciliation.
- [`ROADMAP.md`](ROADMAP.md): broader design-system sequencing.
- [`HANDOFF.md`](HANDOFF.md): current operational handoff.
- [`CHANGELOG.md`](CHANGELOG.md): shipped history.
