/* ============================================================
   Alfred - Inspiration Library · RECIPE: FEATURE DEEP-DIVE.
   A product/feature deep-dive page: the argument first
   (numbered chapters), then the capabilities with proof
   artifacts (feature split), a live Alfred exchange as the
   mid-page demo, the breadth grid, one spotlight metric, and
   the close. Composed from the library's window.Lib* globals;
   compiled to a committed .js twin by scripts/build-kits.mjs;
   DOM boot lives in feature.html.
   ============================================================ */
function RecipeFeature() {
  return (
    <React.Fragment>
      <window.LibNavbar />
      <window.LibPageHeaderHero
        eyebrow="Alfred for Marketing"
        headline="Inside the working loop"
        sub="Why the morning brief exists, what happens at each step, and what a live answer looks like."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Product", href: "" },
        ]}
      />
      <window.LibNumberedChapters />
      {/* Headline override: answers the chapter argument above it, and the
          default headline leans on "decisions" right after a chapter
          headline that does too. */}
      <window.LibFeatureSplit2 eyebrow="The work" headline="What I hand you instead" />
      {/* The agent-conversation hero reused mid-page as the live demo:
          the briefing variant shows the thinking trace, and this is the
          page's one glow-background moment. */}
      <window.LibHeroConversation
        variant="briefing"
        eyebrow="Live demo"
        title="Ask it yourself"
        sub="This is the shape of every answer: sourced from your stack, reasoned in the open, ready to execute."
        primaryCta="See it on your data"
        secondaryCta="Book a walkthrough"
      />
      <window.LibIconFeatureGrid />
      <window.LibTestimonials
        variant="spotlight-metric"
        items={[
          {
            quote: "We rebalanced spend across three channels straight from the brief. Pipeline efficiency rose 18% in the first quarter, and I could show the board exactly why.",
            name: "Maya Trent",
            title: "Head of Marketing",
            company: "Meridian",
          },
        ]}
        metricValue="+18%"
        metricLabel="pipeline efficiency in the first quarter"
      />
      <window.LibFaq2 />
      <window.LibCtaBand
        headline="See the brief on your own data"
        sub="Bring your stack to a 30-minute walkthrough. Read-only by default, and nothing changes without your approval."
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
window.RecipeFeature = RecipeFeature;
