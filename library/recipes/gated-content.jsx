/* ============================================================
   Alfred - Inspiration Library · RECIPE: Gated content.
   A finished gated-asset landing page composed from the section
   catalog: slim conversion nav, the capture hero for the weekly
   budget reallocation playbook, one proof strip, one logo cloud,
   a three-question objection FAQ with the support strip, and a
   legal-only footer. One proof number (2,300+ readers) runs
   through the page; the avatar cluster appears exactly once
   (the hero's own stack is suppressed so the strip carries it).
   Compiled to a committed .js twin by scripts/build-kits.mjs;
   DOM boot lives in gated-content.html.
   ============================================================ */

function RecipeGatedContent() {
  return (
    <React.Fragment>
      {/* Slim conversion bar: Pricing only, one CTA, no sign-in. */}
      <window.LibNavbar
        variant="slim"
        items={[{ label: "Pricing", href: "/pricing" }]}
        secondaryCtaLabel=""
      />

      {/* Catalog defaults carry the playbook copy. proofNames is
          emptied so the avatar proof lives once, in the strip below,
          instead of twice in two adjacent sections. */}
      <window.LibHeroCapture proofNames={[]} />

      {/* The page's one avatar cluster. Same 2,300+ figure as the
          asset's readership, CTA points back at the form above. */}
      <window.LibAvatarClusterStrip
        text="Read by 2,300+ marketing leaders before their Monday review"
        avatarsAlt="Marketing leaders who read the reallocation playbook"
        ctaLabel="Get the playbook"
      />

      {/* Static logo row, reframed from the product claim to the
          playbook so the page stays one story. */}
      <window.LibLogoCloud
        headline="Teams at these companies run the same five-step review"
      />

      {/* Three objection questions a gated page actually gets:
          does it work without the product, what happens to my email,
          and is it a disguised pitch. Support strip catches the rest. */}
      <window.LibFaq2
        headline="Before you trade your email"
        sub="The three questions everyone asks ahead of the download."
        support={true}
        faqs={[
          {
            q: "Does the playbook work without Alfred?",
            a: "Yes. The five steps are a manual review: the signals to pull, the thresholds that justify a move, and the order to read them in. You can run the whole thing from a spreadsheet on Monday morning. I run the same review automatically every day, which is how the thresholds were tested, but nothing in the playbook requires the product.",
          },
          {
            q: "What happens to my email address?",
            a: "You get one email with the playbook in it. No drip sequence, no handoff to a sales rep, no resale. If you later want the weekly brief, that is a separate opt-in you choose on your own, and your details stay with the Alfred team at E902 either way.",
          },
          {
            q: "Is this a sales deck dressed up as a playbook?",
            a: "No. It is the working checklist I run for marketing leaders, with the thresholds filled in and a worked example that found $24K of wasted spend in one pass. I appear once, on the last page, where I show how the same review runs when it is automated. Everything before that works with whatever stack you already have.",
          },
        ]}
      />

      <window.LibFooter
        variant="legal-only"
        tagline=""
        columns={[
          {
            title: "",
            links: ["Privacy", "Terms", "Cookie preferences"],
          },
        ]}
        newsletterHeadline=""
        newsletterCtaLabel=""
        newsletterPlaceholder=""
        socialLinks={[]}
      />
    </React.Fragment>
  );
}

window.RecipeGatedContent = RecipeGatedContent;
