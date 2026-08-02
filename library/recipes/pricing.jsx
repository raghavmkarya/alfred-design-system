/* ============================================================
   Alfred - Inspiration Library · RECIPE: PRICING PAGE.
   The pricing page: left-aligned interior header, the tier
   grid, a roster halo, the category comparison as the price
   anchor, the tailored-enterprise band, one money-framed
   spotlight quote, and a price/security/setup FAQ. Composed
   from the library's window.Lib* globals; compiled to a
   committed .js twin by scripts/build-kits.mjs; DOM boot
   lives in pricing.html.
   ============================================================ */
function RecipePricing() {
  return (
    <React.Fragment>
      <window.LibNavbar />
      <window.LibPageHeaderHero
        variant="left"
        eyebrow="Pricing"
        headline="Priced for the person who makes the call"
        sub="Three plans for Alfred for Marketing, one custom Enterprise track, and a launch offer of 50% off your first two months."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Pricing", href: "" },
        ]}
      />
      {/* Header overrides: the tier grid's default headline is the page
          header's headline verbatim, so the grid gets its own; the
          enterprise strip is hidden because the enterprise band below
          carries that pitch in full. */}
      <window.LibPricingTiers2
        eyebrow="Plans"
        headline="Start small, scale when it pays for itself"
        headlineAccent="when it pays for itself"
        sub="Per module, per month. Every plan starts with the daily brief; write-back and custom volume come as you grow."
        enterpriseNote=""
      />
      <window.LibLogoCloud />
      <window.LibComparisonTable
        eyebrow="The math"
        headline="One subscription against the usual stack"
        sub="Before you compare plans, compare what the tools you already pay for actually hand you."
        columns={["", "The usual stack", "Alfred"]}
        items={[
          { label: "Who it serves", cells: ["Analysts and prompt windows", "The leader who owns the number"] },
          { label: "When it speaks", cells: ["When you ask", "Before you ask: flags arrive proactively"] },
          { label: "What it gives you", cells: ["Charts and fluent text", "What changed, why it changed, what to do about it"] },
          { label: "Memory", cells: ["Forgets last quarter's context", "Remembers every signal, decision, and outcome"] },
          { label: "Action", cells: ["Stops at the chart or the draft", "Executes in your tools on command, fully logged"] },
        ]}
        ctaLabel=""
      />
      <window.LibEnterpriseBand2 />
      <window.LibTestimonials
        variant="spotlight-metric"
        headline="What a plan earns back in a quarter"
        items={[
          {
            quote: "We cut the two campaigns that only looked good. The wasted spend we recovered in the first two months covered our Growth plan for the year.",
            name: "Sofia Herrera",
            title: "CMO",
            company: "Bluepeak",
          },
        ]}
        metricValue="12%"
        metricLabel="less wasted spend in the first two months"
      />
      <window.LibFaq2
        headline="Asked before the plan gets picked"
        faqs={[
          { q: "What does each plan cost?", a: "Starter is $199 a month, Growth is $499, and Max is $999, each per module, per month. Enterprise is custom: unlimited users, custom AI volume, SSO, and volume discounts. The launch offer takes 50% off your first two months on every plan." },
          { q: "What counts as an AI chat query?", a: "Every question you ask me in chat counts as one query: 150 a month on Starter, 500 on Growth, 800 on Max. The daily brief, proactive flags, and alerts never consume queries. They arrive whether you ask or not." },
          { q: "Can I switch plans later?", a: "Yes. Upgrades apply immediately and are prorated for the current cycle. Downgrades take effect at the next renewal, and your history and connections carry over both ways. Nothing is re-onboarded." },
          { q: "Is there a free trial?", a: "There is no free tier. Setup is an authorisation step rather than an engineering project, so the fastest evaluation is a discounted first month on your own data under the launch offer." },
          { q: "How long does setup take?", a: "One afternoon in most cases. Connections are secure, read-only APIs, so there is no engineering project and no workflow change. I sync up to a year of history at onboarding, which means the first brief already has context." },
          { q: "How is my data handled?", a: "Read-only connections by default, write-back only on your explicit command, data isolated per customer, no cross-customer training, and no raw data leaving your environment. Enterprise adds SSO, role-based access, audit logs, and data residency options." },
          { q: "Do integrations cost extra?", a: "Standard platform integrations are included on every plan. Growth adds custom integration requests on a two-week SLA, Max shortens that to one week, and Enterprise integrations are scoped to your stack. There is no per-connector fee." },
          { q: "What happens when I hit my query limit?", a: "I warn you before it happens, not after. You can top up queries for the month or move up a plan from inside the product. The brief and every proactive flag keep running regardless: limits apply to chat questions only." },
        ]}
      />
      <window.LibCtaBand
        headline="Start at half price. Decide from your own data."
        sub="Connect your stack in an afternoon; the first morning brief makes the case."
        ctaLabel="Choose a plan"
        secondaryCtaLabel="Talk to sales"
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
window.RecipePricing = RecipePricing;
