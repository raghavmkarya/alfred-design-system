/* ============================================================
   Alfred - Inspiration Library · RECIPE: AGENT EMPLOYEE PAGE.
   The complete enrichlabs.ai homepage structure (the "Helena"
   pattern: superlative hire story, capability modules, agent
   roster, proof wall, trial FAQ, minimal buy band) rebuilt from
   the library's section components (window.Lib* globals, loaded
   from ../sections/*.js). Overrides only where adjacent sections
   would repeat themselves or contradict each other; every other
   section renders its complete Alfred default. Only the hero
   carries a glow. Compiled to a committed .js twin by
   scripts/build-kits.mjs; DOM boot lives in agent-employee.html.
   ============================================================ */
function RecipeAgentEmployee() {
  return (
    <React.Fragment>
      <window.LibNavbar />
      <window.LibEmployeeHero />
      <window.LibHighlightsGrid />
      <window.LibVoiceLearned />
      <window.LibAlwaysOnBand />
      {/* Copy override: the default ("Know what changed overnight" /
          "while you are off the clock") re-runs the night claim the
          always-on band just made ("I work while you sleep"). Pivot
          this section to the competitor angle it actually proves. */}
      <window.LibOvernightWatch
        title="Your competitors can't move quietly"
        titleAccent="quietly"
        sub="Rivals reprice, ship pages and enter your auctions while the dashboard stays flat. I rank every change by what it costs you, and the ones that matter are waiting at 9am."
      />
      <window.LibWeekInMotion />
      <window.LibAgencyCompare />
      <window.LibCapabilityModules />
      {/* Surface override: the default "band" surface would open a run
          of three consecutive sunken bands (time-back, numbers-live,
          tuned-by-you). Page surface restores the rhythm. */}
      <window.LibTimeBackCallout surface="page" />
      {/* Counter + progression overrides: the default "11 hrs back every
          week" counter contradicts the "20 hours a week" callout directly
          above, and the default 71-to-94 acceptance curve contradicts the
          "82% to 96% approval by week ten" stat in tuned-by-you directly
          below. One page, one set of numbers. */}
      <window.LibNumbersLive
        counters={[
          { value: 1248, label: "Decisions shipped", sublabel: "this quarter, on the record" },
          { value: 38, label: "Sources connected", sublabel: "synced nightly, zero gaps" },
          { value: 412, label: "Weekly plans drafted", sublabel: "one every Monday morning" },
        ]}
        startPct={82}
        endPct={96}
      />
      <window.LibTunedByYou />
      <window.LibTeamRoster />
      {/* Headline override: the default ("What operators tell me") echoes
          the adjacent roster headline ("Meet your new operating team") and
          the tuned-by-you headline ("Built by operators, tuned by you").
          The AI bench above, the people below. */}
      <window.LibOperatorQuotes headline="What the humans say" />
      {/* LibSpecialistsCallout is deliberately omitted: the roster above
          already sells the waitlist-modules story, and the critic flagged the
          pair as one pitch made twice on a single page. The section remains
          in the library for pages that don't carry the roster. */}
      <window.LibTrialFaq />
      <window.LibWorkWithCta />
      <window.LibFooter variant="minimal" />
    </React.Fragment>
  );
}
window.RecipeAgentEmployee = RecipeAgentEmployee;
