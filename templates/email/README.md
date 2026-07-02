# Alfred email foundation

The master shell + block library for every Alfred email — product briefs, alerts,
lifecycle, newsletters, announcements. Built for email clients, not browsers:
table layout, everything inline, web-safe fallbacks.

```
shell.html            ← the 600px master frame (header / body slot / footer)
blocks.html           ← labeled copy-paste block library
briefing.email.html   ← reference: a finished daily-briefing email built on these patterns
```

## Hard rules

1. **600px.** Fixed-width 600px card, centered on a full-width canvas table.
   Nothing inside exceeds 600px.
2. **Inline styles only.** Email clients strip `<link>`, most `<style>`, and all
   `var()`. Never reference `styles.css` or any token as a variable. The only
   permitted `<style>` block is the shell's reset + dark-mode override block.
3. **Literal hex, mirrored to tokens.** Every color is a literal hex value that
   mirrors a design-system token, and the token is named in an adjacent HTML
   comment. Never invent a color — if it isn't in `tokens/colors.css`, it
   doesn't ship. Core map:

   | Hex | Token | Use |
   |---|---|---|
   | `#FF8431` | `--orange-500` | CTA fill, links, action accent |
   | `#FFA040` | `--orange-400` | links on dark |
   | `#A7A7FC` | `--periwinkle-400` | cool accent (quote bar) |
   | `#F3F3FF` | `--periwinkle-50` | quote fill |
   | `#02021E` | `--ink-900` | headlines, primary text |
   | `#505050` | `--ink-600` | body / secondary text |
   | `#6B6B78` | `--ink-500` | muted / footer text |
   | `#9CA3AF` | `--ink-400` | captions, source lines |
   | `#F9F9F9` | `--gray-50` | canvas, sunken tiles, footer band |
   | `#F1F1F1` | `--gray-100` | hairlines |
   | `#E6E6E6` | `--gray-150` | card border |
   | `#2FB67C` | `--success-500` | positive deltas |
   | `#E5484D` | `--danger-500` | needs-action accents |
   | `#000000` | dark `--bg-page` | dark-mode canvas |
   | `#171715` | `--ink-875` | dark-mode card |

4. **Fonts degrade gracefully.** Web fonts rarely load in email. Stacks:
   - Body / UI / buttons: `'Satoshi', 'Helvetica Neue', Arial, sans-serif`
   - Headlines / KPI values: `'Clash Display', 'Satoshi', 'Helvetica Neue', Arial, sans-serif`
     (weight 600, `letter-spacing:-0.02em`)
5. **Alt text everywhere.** Every `<img>` carries meaningful `alt`. Images-off
   must still read as a complete email.
6. **Voice.**
   - Product / lifecycle emails (briefs, alerts, digests): **Alfred speaks
     first person** — "I've flagged two reallocations…" — to "you". Lead with
     the decision or the number.
   - Marketing emails (newsletters, announcements, nurture): **third person**
     about Alfred ("Alfred recommends…") or corporate "we".
   - Sentence case everywhere; UPPERCASE only for small tracked eyebrows.
7. **No emoji. Ever.** Also no unicode glyphs standing in for icons — write
   deltas as text (`+12.4%`, `-8.0%`), not arrows.
8. **Sourced stats only.** Any number ships with a visible source line
   ("Source: Alfred KPI Cockpit · Meta Ads + Google Ads · last 7 days, pulled
   {date}") or it doesn't ship. Never reuse the live site's 90+/$90M/90x
   placeholder band as real proof.
9. **Bulletproof buttons.** Padded table cell + `bgcolor="#FF8431"` +
   `border-radius:12px` + bold Satoshi-stack link. No image buttons. Outlook
   drops the radius — acceptable degrade. One primary CTA per email.
10. **One accent moment per email.** Orange leads; periwinkle supports (quote
    block). No gradient fills in email — clients render them inconsistently.

## Dark mode

- Shell `<head>` carries `color-scheme` / `supported-color-schemes` metas and a
  `prefers-color-scheme: dark` override block.
- Light is the default (all inline); dark is applied via the utility classes
  the shell and every block already carry:
  `em-canvas` `em-card` `em-hair` `em-h` `em-t` `em-mut` `em-link` `em-sunken`.
  Keep those classes on any new element you add — they are inert until the
  shell's `<style>` targets them.
- The header swaps `alfred-logo-primary.svg` (`.logo-light`) for
  `alfred-logo-color-white.svg` (`.logo-dark`) in dark mode. White lockups only
  on dark — never recolor the gradient mark.
- Gmail may auto-invert regardless; the palette above survives inversion
  legibly. Test light and dark in Apple Mail + Gmail before sending.

## How to compose an email

1. Copy `shell.html` to your working file.
2. Write the preheader (one decision-first sentence) in the hidden div.
3. Replace everything between `<!-- @slot body -->` and `<!-- @endslot body -->`
   with blocks copied from `blocks.html` (copy from `BLOCK START` to
   `BLOCK END`). Typical brief: hero → stat-row → brief-item ×2–3 → cta.
4. Pick a footer: the shell's default, or swap in `footer-product` /
   `footer-marketing` from `blocks.html` (they replace the shell footer row's
   content — product emails get variant A, marketing gets variant B).
5. Replace every `{{placeholder}}` — especially `{{registered_address}}` and
   `{{unsubscribe_url}}` (both legally required).
6. Production sends: swap the relative `../../assets/logos/…` `src` for a
   hosted https URL.
7. Sanity-check against the hard rules above, then test in real clients.

## Block library (`blocks.html`)

| Block | Use |
|---|---|
| `hero` | Eyebrow + headline + sub + bulletproof CTA |
| `stat-row` | Three KPI tiles + required source citation line |
| `brief-item` | What changed / why / do this + deep link into Alfred |
| `cta` | Single centered bulletproof button |
| `quote` | Customer quote on periwinkle accent |
| `divider` | Hairline section separator |
| `footer-product` | Lifecycle footer — first-person context + entity/address/unsubscribe/socials |
| `footer-marketing` | Marketing footer — verbatim boilerplate + entity/address/unsubscribe/socials |
