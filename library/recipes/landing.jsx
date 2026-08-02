/* ============================================================
   Alfred - Inspiration Library · RECIPE: LANDING PAGE.
   A homepage-grade landing page composed from the library's
   section components (window.Lib* globals, loaded from
   ../sections/*.js). Overrides only where the page needs
   page-specific copy; every other section renders its complete
   Alfred default. Compiled to a committed .js twin by
   scripts/build-kits.mjs; DOM boot lives in landing.html.
   ============================================================ */
function RecipeLanding() {
  return (
    <React.Fragment>
      <window.LibNavbar variant="transparent" />
      <window.LibHeroGlow />
      <window.LibLogoCloud />
      <window.LibHowItWorks />
      <window.LibBentoGrid2 />
      {/* Headline override: the default ("The layer between your data and
          your decisions") echoes the bento headline ("One memory, every
          decision") sitting directly above it. */}
      <window.LibFeatureSplit2 headline="Briefed, answered, executed" />
      <window.LibStatBand />
      <window.LibTestimonials />
      {/* Headline override: the default ("What a quarter with me looks
          like") near-duplicates the adjacent testimonials headline
          ("What leaders say after a quarter with me"). */}
      <window.LibMetricCaseCards
        headline="The same playbook, run three ways"
        sub="Connect the stack, read the brief, act on the flag. Here is how that plays out."
      />
      <window.LibIntegrationsGrid2 />
      <window.LibFaq2 />
      <window.LibCtaBand />
      <window.LibFooter />
    </React.Fragment>
  );
}
window.RecipeLanding = RecipeLanding;
