/* ============================================================
   Alfred - Inspiration Library · RECIPE: comparison page.
   "Alfred vs the usual stack", composed from the library's
   sections: navbar -> page-header -> comparison table ->
   before/after -> feature split -> metric case cards ->
   spotlight testimonial -> switching FAQ -> migration CTA band
   -> minimal footer. The rival is the category (dashboards, a
   generic assistant, an analyst queue), never a named vendor.
   Compiled to a committed .js twin by scripts/build-kits.mjs;
   DOM boot lives in comparison.html.
   ============================================================ */

function RecipeComparison() {
  return (
    <React.Fragment>
      <window.LibNavbar />
      <window.LibPageHeaderHero
        variant="centered"
        eyebrow="Compare"
        headline="Alfred vs the usual stack"
        sub="Dashboards, a generic AI assistant, and an analyst queue can each do a piece of the job. Here is what changes when one system runs the whole loop."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Compare", href: "" },
        ]}
      />
      <window.LibComparisonTable ctaLabel="" />
      <window.LibBeforeAfter
        beforeItems={[
          "Five dashboards, three contradicting numbers",
          "A prompt window with no memory of last quarter",
          "An analyst request queue two days deep",
          "Sunday night spent stitching reports",
        ]}
        afterItems={[
          "One brief, one version of the truth",
          "Flags that arrive before you ask",
          "85% of questions answered without an analyst",
          "15+ hours a week back for strategy",
        ]}
      />
      <window.LibFeatureSplit2
        eyebrow="What replaces it"
        headline="One system for the whole loop"
      />
      <window.LibMetricCaseCards
        eyebrow="THE FIRST QUARTER"
        headline="What changes after the switch"
        sub="Three illustrative runs from teams that moved off the usual stack. Same playbook every time: connect, read the brief, act on the flag."
      />
      <window.LibTestimonials
        variant="spotlight-metric"
        headline="What leaders say after switching"
        items={[
          {
            quote: "We kept the dashboards and the warehouse, we just stopped living in them. Reporting time fell by roughly 15 hours a week, and that time went straight into strategy. It shows in the pipeline.",
            name: "Tomás Rivera",
            title: "VP Marketing",
            company: "Solstice",
          },
        ]}
        metricValue="15 hrs"
        metricLabel="of reporting time back every week, redirected to strategy"
      />
      <window.LibFaq2
        eyebrow="SWITCHING"
        headline="Asked before every switch"
        sub="The short answers to the migration questions. For the long ones, talk to sales."
        faqs={[
          { q: "Do I have to rip out my current stack?", a: "No. I connect to the tools you already run through secure, read-only APIs and make sense of them together. Your ad platforms, CRM, and analytics keep doing their jobs; you stop reconciling them by hand." },
          { q: "What happens to my dashboards?", a: "Keep them. I read the same sources they do, so nothing breaks the day you connect. Most teams find they open the dashboards less each week, because the brief has already answered the question the dashboard was for." },
          { q: "How long does the migration take?", a: "Connecting is an authorisation step, not an engineering project. Each connection is a secure API grant, and I sync up to a year of history at onboarding, so I arrive with context instead of starting cold." },
          { q: "We already pay for BI and an AI assistant. Why add Alfred?", a: "Because they stop where the work starts. BI shows what happened, an assistant drafts fluent text, and the decision still waits on a human to connect them. I close the loop: what changed, why, what to do, and execution in your tools once you approve." },
          { q: "Can I run Alfred in parallel before deciding?", a: "Yes, and I recommend it. Connections are read-only by default, so you can run me alongside the current stack for a few weeks and compare my flags against what your process caught, and when." },
          { q: "What does switching cost?", a: "Starter is $199 a month, Growth $499, Max $999, and Enterprise is custom. The launch offer takes 50% off your first two months, which usually covers the overlap period while you run both." },
          { q: "How is my data handled during and after the move?", a: "Read-only connections by default, write-back only on your explicit command, data isolated per customer, no cross-customer training, and no raw data leaving your environment." },
        ]}
      />
      <window.LibCtaBand
        eyebrow="MAKE THE MOVE"
        headline="Switch in an afternoon, not a quarter"
        sub="Connect the stack you already run, keep everything that works, and read your first brief tomorrow morning. Launch offer: 50% off your first two months."
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

window.RecipeComparison = RecipeComparison;
