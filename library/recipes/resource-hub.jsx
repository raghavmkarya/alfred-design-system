/* ============================================================
   Alfred - Inspiration Library · RECIPE: Resource hub.
   A finished library / resource-center page composed from the
   section catalog: hub hero with search, format filters, a
   resource grid, one live session, the weekly-brief capture,
   pagination, and the closing ask. One coherent format taxonomy
   runs through the whole page (Templates, Checklists, Calculators,
   Reports, Webinars) so the hero quick links, the filter chips and
   the grid badges all agree, and the counts add up (41 total).
   Compiled to a committed .js twin by scripts/build-kits.mjs;
   DOM boot lives in resource-hub.html.
   ============================================================ */

function RecipeResourceHub() {
  return (
    <React.Fragment>
      <window.LibNavbar />

      {/* The one glow-heavy section in the first viewport. Quick links
          are overridden to the page's format taxonomy so they mirror
          the filter row below. */}
      <window.LibResourceHubHero
        sub="Take a template, run the numbers, and walk into Monday already decided. Five minutes here should save you an hour somewhere else."
        quickLinks={["Templates", "Checklists", "Calculators", "Reports", "Webinars"]}
        statsLine="41 resources, all free, all usable the week you take them"
      />

      {/* Filter categories match the hero quick links; non-All counts
          sum to the All count (12 + 9 + 5 + 6 + 9 = 41). */}
      <window.LibFilterChipRow
        items={["All", "Templates", "Checklists", "Calculators", "Reports", "Webinars"]}
        counts={[41, 12, 9, 5, 6, 9]}
        resultsLabel="{count} resources"
      />

      {/* Resource grid: the three catalog-variant cards plus three more
          in the same register, so the index reads like a real page one.
          Header CTA hidden: the hero already carries Browse everything. */}
      <window.LibCardGrid
        eyebrow="Most used"
        headline="Take one, use it this week"
        sub="Templates, checklists, and calculators built for the person who makes the call."
        ctaLabel=""
        items={[
          {
            category: "Template",
            title: "The board-ready budget defence, as a fill-in template",
            excerpt: "Every campaign ranked by pipeline contribution, in the order a CFO wants to read it.",
            readTime: "30 min to fill",
            ctaLabel: "Get the template",
          },
          {
            category: "Checklist",
            title: "The 12-point stack audit before you connect anything",
            excerpt: "Which tools matter, which metrics contradict, and where your one version of the truth will come from.",
            readTime: "12 checks",
            ctaLabel: "Get the checklist",
          },
          {
            category: "Calculator",
            title: "What a two-day decision delay costs you",
            excerpt: "Put in your monthly spend and correction cadence. Read the number. Sit with it.",
            readTime: "2 min to run",
            ctaLabel: "Run the numbers",
          },
          {
            category: "Template",
            title: "The Monday reallocation memo, ready for a CFO signature",
            excerpt: "The move, the cause, and the projected impact on one page. Approval gets faster when the reasoning is attached.",
            readTime: "One page",
            ctaLabel: "Get the template",
          },
          {
            category: "Checklist",
            title: "Board pre-read: the nine numbers to check the night before",
            excerpt: "The order to read them in, what counts as normal, and the one comparison every director makes.",
            readTime: "9 checks",
            ctaLabel: "Get the checklist",
          },
          {
            category: "Report",
            title: "Benchmarks: how fast the fastest teams correct course",
            excerpt: "Median time from anomaly to approved fix across 120 growth-stage marketing teams, split by stack size.",
            readTime: "11 min read",
            ctaLabel: "Read the report",
          },
        ]}
      />

      {/* Catalog defaults: one live session with explicit date, hosts,
          and the registration card. */}
      <window.LibWebinarSplit />

      {/* Band placement. Headline overridden: the hero already owns
          "Read less, know more", so the newsletter sells the library
          digest instead of repeating the hub promise. */}
      <window.LibNewsletterCapture
        layout="band"
        headline="The best of the library, every Tuesday"
        sub="One decision worth studying, one number worth stealing, and the newest template. Five minutes tops."
      />

      {/* Page one of the index, newest first. */}
      <window.LibPaginationRow page={1} pageCount={7} />

      {/* Catalog default closer: "Stop reading reports. Start making
          decisions." reads as written for this page, so it stays. */}
      <window.LibCtaBand />

      <window.LibFooter
        variant="minimal"
        tagline="Your chief of staff for every decision."
        columns={[
          {
            title: "",
            links: ["How it works", "Pricing", "Resources", "Contact", "Privacy", "Terms"],
          },
        ]}
        newsletterHeadline=""
        newsletterCtaLabel=""
        newsletterPlaceholder=""
      />
    </React.Fragment>
  );
}

window.RecipeResourceHub = RecipeResourceHub;
