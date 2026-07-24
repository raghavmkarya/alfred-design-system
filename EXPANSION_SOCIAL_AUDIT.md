# Alfred Expansion Social Audit

Status: EP-007 complete
Snapshot date: 2026-07-24
Detailed register: [`data/expansion-social-audit.csv`](data/expansion-social-audit.csv)

## Scope

This audit evaluates all 102 tracked root-level social HTML masters for:

- Declared pixel dimensions and current placement compatibility.
- Reusable content slots.
- Explicit safe-zone or crop metadata.
- Visible citations, Northwind demo framing, and unresolved placeholder guards.
- Dark and light parity.

The audit records current gaps. It does not treat a documented gap as an approved exception, and it
does not rewrite masters before the campaign manifest and safe-zone contracts exist.

## Current first-party references

The dimension assessment uses first-party platform documentation checked on 2026-07-24:

- [LinkedIn single-image advertising specifications](https://www.linkedin.com/help/linkedin/answer/a426534/single-image-ads-advertising-specifications):
  1200 by 628 for horizontal, 1200 by 1200 for square, and 720 by 900 for the recommended
  4:5 vertical shape. LinkedIn recommends 1080 by 1080 for paid carousel cards.
- [LinkedIn Page image specifications](https://www.linkedin.com/help/linkedin/answer/a563309/image-specifications-for-your-linkedin-pages-and-career-pages):
  4200 by 700 for a company Page cover, with key details away from crop-prone edges.
- [LinkedIn personal profile cover guidance](https://www.linkedin.com/help/linkedin/answer/a549049/photo-won-t-upload-to-your-profile):
  1584 by 396 for a personal profile background.
- [Instagram photo resolution guidance](https://www.facebook.com/help/1631821640426723/):
  up to 1080 pixels wide and supported feed ratios from 1.91:1 through 3:4.
- [Facebook Page image guidance](https://www.facebook.com/help/125379114252045):
  a cover minimum of 400 by 150, a current full-bleed 16:9 treatment, and an 851 by 315 sRGB JPG
  recommendation for fast loading. Facebook warns that the image can crop across screens.
- [YouTube custom thumbnail guidance](https://support.google.com/youtube/answer/72431):
  3840 by 2160 is currently recommended, with 16:9 preferred and a 640-pixel minimum width.
- [YouTube channel banner guidance](https://support.google.com/youtube/answer/10456525):
  2560 by 1440 is recommended. At the 2048 by 1152 minimum, the text and logo safe area is
  1235 by 338.
- [X profile customization guidance](https://help.x.com/articles/166743):
  1500 by 500 is recommended for profile headers.

No current first-party pixel recommendation was located for a Facebook event cover or a general X
feed-image master. Those placements remain `review required` instead of inheriting an unsupported
number from a third-party guide.

## Results

### Dimensions

| Status | Masters | Meaning |
|---|---:|---|
| current | 44 | Matches a current supported or recommended placement family. |
| compatible, not recommended | 40 | Upload-compatible, but not the platform's current preferred dimensions. |
| review required | 16 | Placement intent or a current first-party pixel reference remains unresolved. |
| revision required | 2 | Conflicts with the currently documented placement. |

The two revision-required masters are:

- `social/profile-banner-linkedin.html`
- `social/profile-banner-linkedin-light.html`

They are described in the repository as company-page banners but use 1584 by 396, which LinkedIn
documents for personal profile covers. LinkedIn currently recommends 4200 by 700 for company Page
covers. EP-316 should split company Page and founder-profile banner contracts instead of using one
ambiguous asset.

The 1200 by 1350 LinkedIn feed family remains upload-compatible, but it is 8:9 rather than LinkedIn's
current recommended 4:5 paid vertical shape. The 1280 by 720 YouTube thumbnails preserve 16:9 but are
below YouTube's current 3840 by 2160 recommendation.

The 16 review-required masters comprise portrait carousel pages, the Daily Brief pair, the Facebook
event-cover pair, and the X feed-card pair. The intended organic, document, paid, or event placement
must be made explicit in their future manifests.

### Slots

| Status | Masters |
|---|---:|
| declared with `data-slot` | 82 |
| static or campaign-specific | 3 |
| missing explicit slot metadata | 17 |

The 17 missing-metadata files are the blog-hero pair, Daily Brief pair, carousel cover pair, generic
carousel slide pair, Facebook cover pair, the shipped organisation-brain post, both LinkedIn banner
masters, both X banner masters, and both YouTube banner masters.

Static art may legitimately have no replaceable slots, but it still needs a manifest that explicitly
declares an empty slot contract. Missing metadata must not be interpreted as an empty contract.

### Safe zones and crops

| Status | Masters |
|---|---:|
| explicit evidence in source | 27 |
| missing explicit metadata | 75 |

The source audit recognizes explicit safe-zone, crop, and circular-crop notes. The remaining masters
often use substantial padding, but padding alone is not machine-readable placement metadata.
EP-106 must define safe-zone structures, and EP-109 and EP-320 must turn those structures into
overlays and crop simulations.

### Claims and placeholders

| Status | Masters |
|---|---:|
| visible citation | 10 |
| visible Northwind demo framing | 10 |
| unresolved placeholder guard | 14 |
| claim review required | 2 |
| not applicable | 66 |

The citation-bearing stat families keep the value, claim, and source together. Demo-bearing product
and insight families visibly reference Northwind. Seven dark and light pairs still render
placeholders for authors, founders, speakers, or dates:

- Blog promotion.
- Instagram founder quote.
- LinkedIn founder quote.
- LinkedIn webinar.
- LinkedIn weekly recap.
- Open Graph blog.
- YouTube webinar thumbnail.

The milestone pair exposes numerical slots without a visible source or demo label and is marked
`claim review required`. A future content schema must decide whether each milestone is a cited company
fact, an approved public count, or Northwind demo data.

### Light and dark parity

| Status | Masters |
|---|---:|
| paired | 100 |
| embedded dark and light variants | 1 |
| campaign-specific exception | 1 |

All reusable masters have parity. `profile-avatar.html` contains both variants on one page.
`organisation-brain-01.html` is a shipped campaign-specific post and remains the only single-theme
exception.

## Required follow-up

1. EP-102 and EP-106 must make dimensions, placement intent, slots, and safe zones manifest fields.
2. EP-107 must convert prose copy limits into machine-readable slot limits.
3. EP-110 must block the seven unresolved placeholder families.
4. EP-206 and EP-906 must resolve the milestone claim policy.
5. EP-316 must separate LinkedIn company Page and founder-profile banner systems.
6. EP-319 must distinguish organic document pages from paid carousel cards.
7. EP-320 must generate crop simulations for every placement.
8. YouTube thumbnail masters should move to 3840 by 2160 or document a deliberate lower-resolution
   export strategy.

## Regeneration

Run:

```sh
npm run expansion:audit-social
npm run verify:expansion-social
```

The verifier requires exactly 102 tracked social masters and fails when the generated audit becomes
stale.
