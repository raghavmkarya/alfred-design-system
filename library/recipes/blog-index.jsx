/* ============================================================
   Alfred - Inspiration Library · RECIPE: blog index.
   A full editorial hub composed from the library's sections:
   navbar -> page-header -> featured card-grid -> filter row ->
   latest card-grid -> newsletter band -> pagination -> CTA band
   -> minimal footer. Copy overrides keep the page reading as one
   publication ("The brief") whose posts also appear on the
   blog-article recipe. Compiled to a committed .js twin by
   scripts/build-kits.mjs; DOM boot lives in blog-index.html.
   ============================================================ */

function RecipeBlogIndex() {
  return (
    <React.Fragment>
      <window.LibNavbar />
      <window.LibPageHeaderHero
        variant="centered"
        eyebrow="The brief"
        headline="Notes for the person who makes the call"
        sub="Essays, playbooks, and worked teardowns on decision speed, spend, and proof, from the team building Alfred at E902."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "The brief", href: "" },
        ]}
      />
      <window.LibCardGrid
        eyebrow="Featured"
        headline="Start with the report"
        sub="If you only read one thing here this quarter, make it this one."
        ctaLabel=""
        items={[]}
        featured={{
          category: "Report",
          title: "The state of the marketing decision, 2026",
          excerpt: "Why 63% of marketing leaders say opportunities die waiting for a decision, and what the fastest teams do differently.",
          readTime: "14 min read",
          ctaLabel: "Read the report",
        }}
      />
      <window.LibFilterChipRow />
      <window.LibCardGrid
        eyebrow="Latest"
        headline="Sharper calls, in writing"
        sub="Everything recent, newest first. Filter by format above."
        ctaLabel=""
        items={[
          { category: "Playbook", title: "The Monday brief: a 20-minute operating ritual for marketing leaders", excerpt: "How to open the week already decided: the exact reading order, the three questions, and the one number to check first.", readTime: "7 min read", ctaLabel: "Read" },
          { category: "Essay", title: "Why speed of correction beats quality of launch", excerpt: "Everyone's launch is good now. The teams still compounding an edge are the ones that correct in hours, not at the monthly review.", readTime: "6 min read", ctaLabel: "Read" },
          { category: "Teardown", title: "Anatomy of a CPA spike: from flag to fix in one morning", excerpt: "A worked example: detection at 6 AM, cause by 8, approved reallocation by 9, logged and corrected the same day.", readTime: "9 min read", ctaLabel: "Read" },
          { category: "Essay", title: "Dashboards forget. Here's what remembering is worth.", excerpt: "Why organisational memory, not analysis, is the compounding asset in marketing decisions.", readTime: "6 min read", ctaLabel: "Read" },
          { category: "Playbook", title: "The budget defence, in the order a CFO reads it", excerpt: "Every campaign ranked by pipeline contribution, with the cause named and the reallocation already staged.", readTime: "8 min read", ctaLabel: "Read" },
          { category: "Teardown", title: "How Northwind caught creative fatigue nine days early", excerpt: "Frequency crossed the threshold on a Tuesday morning. The refresh shipped before the dip ever showed in revenue.", readTime: "8 min read", ctaLabel: "Read" },
        ]}
      />
      <window.LibNewsletterCapture layout="band" />
      <window.LibPaginationRow page={1} pageCount={8} />
      <window.LibCtaBand
        eyebrow="NEXT STEP"
        headline="Read one brief written from your own data"
        sub="The essays are the theory. A 30-minute walkthrough on your stack is the practice."
        ctaLabel="Talk to sales"
        secondaryCtaLabel="See pricing"
      />
      <window.LibFooter
        variant="minimal"
        tagline="Your chief of staff for every decision."
        columns={[
          { title: "", links: ["How it works", "Pricing", "Resources", "Contact", "Privacy", "Terms"] },
        ]}
        newsletterHeadline=""
        newsletterCtaLabel=""
        newsletterPlaceholder=""
      />
    </React.Fragment>
  );
}

window.RecipeBlogIndex = RecipeBlogIndex;
