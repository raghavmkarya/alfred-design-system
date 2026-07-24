# Alfred Website Launch System

Status: EP-401 through EP-416 complete
Launch page: [`campaign/web/launch.html`](campaign/web/launch.html)
Surface manifest: [`data/campaigns/web-surfaces.json`](data/campaigns/web-surfaces.json)

## Story architecture

The launch page follows one narrative:

1. Define decision intelligence.
2. Explain what changed, why it changed, and what to do.
3. Show how Alfred Core preserves decision memory.
4. Prove the story with an Alfred product interface.
5. Map intelligence across marketing, sales, finance, operations, and founder views.
6. Add company recognition only when public approvals exist.
7. Present the founder letter.
8. Link press and media materials.
9. Show company milestones.
10. Close with a recruitment and product CTA.

Campaign content enters through the generated public-safe catalog. The page contains no funding
amount, round, investor name, quote, release date, or company metric as hardcoded page copy.

## Funding and launch states

The same source supports a category launch, product launch, and public funding announcement. Investor
and partner recognition remains hidden while funding is restricted or embargoed. Public campaign
generation can reveal the section only after the funding family enters the public-safe catalog.

Draft and reviewed pages display a visible preview banner. Embargo simulation verifies that no
funding round or funding amount enters the document.

## Interactive story

The category section uses an accessible tab sequence:

- What changed.
- Why it changed.
- What to do.

The selected panel updates through a live region while preserving a complete static first state.
The product gallery uses the same tab pattern for Daily Brief, Seek Alfred, Evidence Ledger, and
Decision Fork views.

## Product and moat proof

The launch hero and product gallery render the shared product-window primitive. Each product proof
view includes a visible `Northwind Labs demo` label. Alfred Core uses the shared geometry and
cross-function vocabulary from the illustration system.

The module map covers marketing, sales, finance, operations, and founder views without claiming
unapproved module availability.

## Optional content behavior

Missing founder content, press quotes, publication marks, or partner logos never collapses the
layout. Each optional section has an explicit absent-content state. Restricted recognition is
removed rather than replaced by an implied investor or partner.

## Open Graph variants

The surface manifest maps announcement, press, product, and investor variants to existing campaign
families at the Meta landscape placement. These mappings inherit the same content, citation,
safe-zone, and embargo validation as every other campaign asset.

## Responsive and motion behavior

The page has dedicated compositions for:

- 390-pixel mobile.
- 768-pixel tablet.
- 1440-pixel desktop.
- 1920-pixel wide desktop.

Navigation, hero, story, product, module, press, timeline, and footer layouts reflow at content-led
breakpoints. Reduced-motion mode removes transforms, animation, transition, and smooth scrolling.
Every animated-capable element has a complete static first state.

## Verification

Run:

```sh
npm run verify:campaign-web
```

The browser gate validates:

- Mobile, tablet, desktop, and wide compositions.
- Long headline stress.
- Missing optional content.
- Embargoed funding state.
- Horizontal overflow.
- Headline clipping.
- Unresolved placeholders.
- Restricted recognition.
- Product proof and Alfred Core presence.
- Reduced-motion behavior.
- Browser and console errors.

Visual screenshots are generated for mobile and desktop on every verification run.
