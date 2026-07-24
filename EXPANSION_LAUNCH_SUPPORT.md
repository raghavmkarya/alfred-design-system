# Alfred Press, Email, Founder, and Launch Support

Status: EP-701 through EP-714 complete
Press and media kit: [`campaign/press/index.html`](campaign/press/index.html)
Email system: [`campaign/email/index.html`](campaign/email/index.html)
Visual command center: [`campaign/operations/index.html`](campaign/operations/index.html)

## Press release and media kit

The press surface includes:

- A campaign-driven newsroom hero.
- A print-ready press-release treatment.
- A visible draft and proof-status treatment.
- A media-kit landing section.
- Press-contact fallback behavior.
- Public-information and embargo guards.

Print styles remove navigation and download surfaces, switch to an ink-on-paper palette, and preserve
the release hierarchy for PDF output.

The media-kit source is:

[`data/campaigns/media-kit.json`](data/campaigns/media-kit.json)

The public bundle currently contains approved brand logos and a visibly labeled Northwind product
demonstration. Draft company descriptions and unavailable founder photography are excluded.

## Email audiences

One responsive email system provides four distinct treatments:

1. Company launch announcement.
2. Confidential investor update.
3. Founder personal announcement.
4. Customer and waitlist launch.

Each treatment changes audience framing, headline, body, and CTA while retaining the Alfred
decision-intelligence hierarchy.

The email body requires no images. Alfred identity, headline, support copy, CTA, product proof,
demo-data label, and draft state remain readable when images are disabled. Light and dark client
modes have dedicated surface and text colors.

## Founder, employee, partner, and team assets

The social factory supplies:

- Founder-perspective image families.
- LinkedIn founder banners.
- Employee and partner advocacy variants through the funding, category, and product families.
- Team profile and banner kits.
- Press interview and podcast thumbnails through the press family.
- Event, webinar, demo-day, replay, and reel-cover variants.
- Post-launch milestone and recap variants.

All use the same family, placement, copy, theme, safe-zone, and export interfaces documented in
[`EXPANSION_SOCIAL_FACTORY.md`](EXPANSION_SOCIAL_FACTORY.md).

## Launch visual command center

The command center is a visual-approval surface only. It tracks:

- Campaign content.
- Product accuracy.
- Claims and citations.
- Accessibility and cropping.
- Final visual signoff.
- Public-safe catalog state.
- Restricted funding exclusion.
- Contact-sheet readiness.
- Distribution-export blocking.

It contains no campaign budget, bidding, targeting, publishing, or attribution configuration.

## Verification

Run:

```sh
npm run verify:launch-support
```

The gate checks:

- Public media-kit references and approval states.
- Print-ready press CSS.
- Absence of actual funding amounts and round labels.
- Four email audiences in light and dark.
- Essential email content with no images.
- Responsive overflow.
- Five command-center approval gates.
- Restricted funding exclusion.
- Absence of campaign-operations configuration.
