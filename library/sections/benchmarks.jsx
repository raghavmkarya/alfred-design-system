/* ============================================================
   Alfred, Inspiration Library · BENCHMARKS.
   Data-and-report patterns for the annual benchmark surface:
   the report hero, the by-stage medians table, the percentile
   band, and the methodology note. The register is the quiet end
   of the instrument layer (guidelines/style-absorption.md):
   mono for sample sizes, stamps and axis labels, never for
   headlines or body. Every figure is a stated median from a
   fictional panel; example companies (Meridian, Northwind,
   Bluepeak) are composites, never real brands. Every component
   ships complete default copy: a bare <LibBenchmarkHero /> is a
   finished section. Compiled to a committed .js twin by
   scripts/build-kits.mjs; catalogued in library/meta/benchmarks.json.
   ============================================================ */
const {
  EyebrowBadge, Button,
} = window.AlfredAIDesignSystem_1ce241;

const libContainer = (extra) => ({
  maxWidth: 1120, marginInline: "auto", paddingInline: 40, ...extra,
});
const libDisplay = (size) => ({
  fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)",
  fontSize: size, lineHeight: 1.06, letterSpacing: "-0.02em",
  color: "var(--text-primary)", margin: 0,
});
const libNumeral = (size) => ({
  fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)",
  fontSize: size, lineHeight: 1, letterSpacing: "-0.02em",
  color: "var(--text-display)", margin: 0,
});
const libSub = {
  fontFamily: "var(--font-sans)", fontSize: "var(--text-lg)",
  color: "var(--text-secondary)", lineHeight: "var(--lh-relaxed)", margin: 0,
};
/* The instrument layer's voice: true mono, 11-12px, uppercase with --ls-caps
   where it labels. Mono never sets headlines or body. */
const libMonoCaps = (extra) => ({
  fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: "var(--fw-medium)",
  letterSpacing: "var(--ls-caps)", textTransform: "uppercase",
  color: "var(--text-muted)", ...extra,
});
const libMonoLine = {
  fontFamily: "var(--font-mono)", fontSize: 13, lineHeight: 1.8,
  color: "var(--text-secondary)",
};
const libGhostCta = { background: "transparent", color: "var(--text-primary)", borderColor: "var(--border-default)" };
/* The one gradient element of any section that renders it. */
const LibGradientText = ({ children }) => (
  <span style={{ background: "var(--gradient-brand)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>{children}</span>
);
/* Headline with a gradient-accented substring, the heroes idiom. */
const libAccent = (title, accent) => (accent && title.includes(accent)) ? (
  <>
    {title.slice(0, title.indexOf(accent))}
    <LibGradientText>{accent}</LibGradientText>
    {title.slice(title.indexOf(accent) + accent.length)}
  </>
) : title;

/* === benchmark-hero · the annual report opener === */

function LibBenchmarkHero({
  eyebrow = "Annual benchmark report",
  title = "The state of the marketing decision, 2026",
  titleAccent = "marketing decision", /* exactly one gradient-filled phrase */
  sub = "I asked 1,204 marketing leaders how their teams actually decide: how fast, on what evidence, and where the budget lands. This report is what the panel said, cleaned and cut by company stage.",
  sampleLine = "n = 1,204 marketing leaders · fielded May to June 2026",
  primaryCta = "Get the report",
  secondaryCta = "Browse the findings",
  reportTag = "Alfred benchmark · 2026 edition",
  statEyebrow = "Finding 01",
  statValue = "11 days",
  statLabel = "Median decision latency",
  statNote = "From a question first asked to a budget or creative change shipped. Teams that open the day with a brief close the same gap in 2.",
  formatLine = "pdf · 38 pages · free with a work email",
  variant = "default",
}) {
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({
        paddingBlock: "96px 88px",
        display: "grid", gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 0.95fr)",
        gap: 64, alignItems: "center",
      })}>
        <div>
          <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
          <h1 style={{ ...libDisplay(50), marginBlockStart: 22 }}>{libAccent(title, titleAccent)}</h1>
          <p style={{ ...libSub, maxWidth: 480, marginBlockStart: 20 }}>{sub}</p>
          <p style={{ ...libMonoCaps({ color: "var(--text-secondary)" }), marginBlockStart: 24, marginBlockEnd: 0 }}>{sampleLine}</p>
          <div style={{ display: "flex", gap: 12, marginBlockStart: 30, flexWrap: "wrap" }}>
            <Button variant="primary" size="lg">{primaryCta}</Button>
            <Button variant="outline" size="lg" style={libGhostCta}>{secondaryCta}</Button>
          </div>
        </div>
        {/* the report cover card: one finding pulled forward, framed like a page */}
        <div style={{
          minWidth: 0, background: "var(--surface-card)", border: "1px solid var(--border-subtle)",
          borderRadius: "var(--radius-2xl)", overflow: "hidden", boxShadow: "var(--elevation-raised)",
        }}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, flexWrap: "wrap",
            paddingBlock: 13, paddingInline: 24, borderBlockEnd: "1px solid var(--border-subtle)",
          }}>
            <span style={libMonoCaps({ color: "var(--text-secondary)" })}>{reportTag}</span>
            <span style={libMonoCaps({})}>{statEyebrow}</span>
          </div>
          <div style={{ paddingBlock: 36, paddingInline: 24 }}>
            <div style={libNumeral(72)}>{statValue}</div>
            <div style={{
              fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", fontWeight: "var(--fw-bold)",
              color: "var(--text-primary)", marginBlockStart: 14,
            }}>{statLabel}</div>
            <p style={{
              fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-secondary)",
              lineHeight: "var(--lh-normal)", maxWidth: 380, marginBlockStart: 8, marginBlockEnd: 0,
            }}>{statNote}</p>
          </div>
          <div style={{
            paddingBlock: 12, paddingInline: 24, borderBlockStart: "1px solid var(--border-subtle)",
            background: "var(--surface-sunken)",
          }}>
            <span style={libMonoCaps({})}>{formatLine}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* === benchmark-table · metric medians by company stage === */

/* Token-built rather than the bundle Table: the pattern needs a highlighted
   row and per-cell mono/sans mixing that Table's columns/rows props don't
   carry. Hairline rules, values in mono, one accent-soft row. */
const LIB_BENCH_ROWS = [
  { metric: "Blended CAC", values: ["$96", "$142", "$187"] },
  { metric: "Blended ROAS", values: ["2.1x", "3.4x", "3.9x"] },
  { metric: "Paid share of new pipeline", values: ["64%", "48%", "37%"] },
  { metric: "Decision latency", values: ["6 days", "11 days", "16 days"], highlight: true },
  { metric: "Reporting hours per week", values: ["9", "15", "21"] },
];
function LibBenchmarkTable({
  eyebrow = "Benchmarks by stage",
  title = "What the middle of the pack looks like",
  sub = "Panel medians for the metrics marketing leaders say they steer by, cut by company stage. Find your column, then find the row where you are losing the most time.",
  metricHeader = "Median, 2026 panel",
  stages = ["Seed", "Growth", "Scale"],
  rows = LIB_BENCH_ROWS,
  highlightTag = "The row I move",
  stamp = "medians · n = 1,204 · self-reported, cleaned beyond p99 · benchmark panel 2026",
  variant = "default",
}) {
  const cellPad = { paddingBlock: 14, paddingInline: 20 };
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({ paddingBlock: "88px 80px" })}>
        <div style={{ maxWidth: 640 }}>
          <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
          <h2 style={{ ...libDisplay(40), marginBlockStart: 20 }}>{title}</h2>
          <p style={{ ...libSub, fontSize: "var(--text-base)", marginBlockStart: 16 }}>{sub}</p>
        </div>
        <div style={{
          marginBlockStart: 40, border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)",
          background: "var(--surface-card)", overflowX: "auto",
        }}>
          <table style={{ width: "100%", minWidth: 560, borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th scope="col" style={{ ...libMonoCaps({}), ...cellPad, textAlign: "start", borderBlockEnd: "1px solid var(--border-subtle)" }}>{metricHeader}</th>
                {stages.map((s) => (
                  <th key={s} scope="col" style={{ ...libMonoCaps({}), ...cellPad, textAlign: "end", borderBlockEnd: "1px solid var(--border-subtle)" }}>{s}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.metric} style={{ background: r.highlight ? "var(--accent-soft)" : "transparent" }}>
                  <th scope="row" style={{
                    ...cellPad, textAlign: "start",
                    fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-semibold)",
                    color: r.highlight ? "var(--text-on-tint-brand)" : "var(--text-primary)",
                    borderBlockEnd: i === rows.length - 1 ? "none" : "1px solid var(--border-subtle)",
                  }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                      <span>{r.metric}</span>
                      {r.highlight && highlightTag ? (
                        <span style={libMonoCaps({ color: "var(--text-on-tint-brand)" })}>[{highlightTag}]</span>
                      ) : null}
                    </span>
                  </th>
                  {r.values.map((v, j) => (
                    <td key={j} style={{
                      ...cellPad, textAlign: "end",
                      fontFamily: "var(--font-mono)", fontSize: 13,
                      color: r.highlight ? "var(--text-on-tint-brand)" : "var(--text-secondary)",
                      fontWeight: r.highlight ? "var(--fw-semibold)" : "var(--fw-regular)",
                      borderBlockEnd: i === rows.length - 1 ? "none" : "1px solid var(--border-subtle)",
                    }}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* the methodology stamp, printed under the data like a plate mark */}
        <p style={{ ...libMonoCaps({}), marginBlockStart: 16, marginBlockEnd: 0 }}>{stamp}</p>
      </div>
    </section>
  );
}

/* === percentile-band · where you rank on the distribution === */

function LibPercentileBand({
  eyebrow = "Where you land",
  title = "Most teams decide in eleven days",
  sub = "The 2026 distribution of decision latency, from question asked to change shipped. The shaded band is the middle half of the panel. The marker is where teams sit after 90 days with me.",
  axisStart = "0 days",
  axisEnd = "30+ days",
  ticks = [
    { pos: 25, label: "p25 · 6d" },
    { pos: 50, label: "p50 · 11d" },
    { pos: 75, label: "p75 · 19d" },
  ],
  marker = { pos: 9, label: "you, after 90 days · 2d" },
  bandLabel = "middle half of the panel",
  captionStart = "decision latency, days · lower is better",
  captionEnd = "n = 1,204 · 2026 panel",
  variant = "default",
}) {
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({ paddingBlock: "88px 80px" })}>
        <div style={{ maxWidth: 640 }}>
          <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
          <h2 style={{ ...libDisplay(40), marginBlockStart: 20 }}>{title}</h2>
          <p style={{ ...libSub, fontSize: "var(--text-base)", marginBlockStart: 16 }}>{sub}</p>
        </div>
        <div style={{
          marginBlockStart: 44, border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)",
          background: "var(--surface-card)", paddingBlock: 28, paddingInline: 28,
        }}>
          {/* axis endpoints */}
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
            <span style={libMonoCaps({})}>{axisStart}</span>
            <span style={libMonoCaps({})}>{axisEnd}</span>
          </div>
          {/* marker flag row: sits above the track, anchored at the marker position */}
          <div style={{ position: "relative", height: 30, marginBlockStart: 14 }}>
            <span style={{
              position: "absolute", insetBlockEnd: 0, insetInlineStart: `${marker.pos}%`,
              display: "inline-flex", whiteSpace: "nowrap",
              fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", fontWeight: "var(--fw-bold)",
              background: "var(--accent)", color: "var(--text-on-brand)",
              paddingBlock: 4, paddingInline: 10,
              borderRadius: "var(--radius-sm)", borderEndStartRadius: 0,
            }}>{marker.label}</span>
          </div>
          {/* the distribution track */}
          <div style={{ position: "relative", height: 44 }}>
            {/* base track */}
            <div style={{
              position: "absolute", insetInline: 0, insetBlockStart: 0, height: 18,
              background: "var(--surface-sunken)", border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-pill)",
            }} />
            {/* interquartile band, the cool accent. --info-100 alone is a
                light-theme tint that all but vanishes on dark, so the band
                mixes a visible floor of the semantic periwinkle in and takes
                hairline edges at P25/P75. */}
            <div style={{
              position: "absolute", insetBlockStart: 1, height: 16,
              insetInlineStart: `${ticks[0] ? ticks[0].pos : 25}%`,
              width: `${(ticks[2] ? ticks[2].pos : 75) - (ticks[0] ? ticks[0].pos : 25)}%`,
              background: "color-mix(in srgb, var(--info-500) 16%, transparent)",
              borderInline: "1px solid color-mix(in srgb, var(--info-500) 45%, transparent)",
            }} />
            {/* quartile ticks + labels */}
            {ticks.map((t) => (
              <React.Fragment key={t.pos}>
                <span aria-hidden="true" style={{
                  position: "absolute", insetBlockStart: -5, height: 28, width: 1,
                  insetInlineStart: `${t.pos}%`, background: "var(--border-default)",
                }} />
                <span style={{
                  ...libMonoCaps({}), position: "absolute", insetBlockStart: 30,
                  insetInlineStart: `${t.pos}%`, transform: "translateX(-50%)", whiteSpace: "nowrap",
                }}>{t.label}</span>
              </React.Fragment>
            ))}
            {/* the accent marker: the one phosphor element of this view */}
            <span aria-hidden="true" style={{
              position: "absolute", insetBlockStart: -8, height: 34, width: 3,
              insetInlineStart: `${marker.pos}%`, background: "var(--accent)",
              borderRadius: "var(--radius-pill)", boxShadow: "var(--shadow-phosphor)",
            }} />
          </div>
          {/* caption row */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap",
            marginBlockStart: 22, paddingBlockStart: 16, borderBlockStart: "1px solid var(--border-subtle)",
          }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
              <span style={libMonoCaps({})}>{captionStart}</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <span aria-hidden="true" style={{ width: 10, height: 10, borderRadius: 3, background: "var(--info-100)", border: "1px solid var(--border-subtle)", flexShrink: 0 }} />
                <span style={libMonoCaps({})}>{bandLabel}</span>
              </span>
            </span>
            <span style={libMonoCaps({})}>{captionEnd}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* === methodology-note · the fine print as a first-class block === */

const LIB_METHOD_ITEMS = [
  {
    sidenote: "01 · Sample",
    title: "Who answered",
    body: "1,204 marketing leaders at B2B software companies from seed to scale, across North America and Europe. The panel was recruited independently; Alfred customers were not oversampled.",
  },
  {
    sidenote: "02 · Period",
    title: "When it was fielded",
    body: "May 12 to June 20, 2026. Spend figures cover the trailing twelve months; latency figures cover the most recent completed quarter.",
  },
  {
    sidenote: "03 · Definitions",
    title: "What the words mean",
    body: "Decision latency is the time from a question first asked to a budget or creative change shipped. CAC is blended: all sales and marketing cost over new customers won.",
  },
  {
    sidenote: "04 · Limits",
    title: "What to keep in mind",
    body: "Figures are self-reported and cleaned beyond p99; medians throughout. Any company named in an example (Meridian, Northwind, Bluepeak) is a composite, not a customer.",
  },
];
function LibMethodologyNote({
  heading = "Methodology",
  intro = "Numbers you can take to a board meeting. Here is exactly how this report was built, so you can judge it before you quote it.",
  items = LIB_METHOD_ITEMS,
  footnote = "full survey instrument and cleaned dataset available on request",
  variant = "default",
}) {
  return (
    <section style={{ background: "var(--surface-sunken)", borderBlock: "1px solid var(--border-subtle)" }}>
      <div style={libContainer({ paddingBlock: "72px 64px" })}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 24, flexWrap: "wrap",
          paddingBlockEnd: 20, borderBlockEnd: "1px solid var(--border-subtle)",
        }}>
          <h2 style={{ ...libDisplay(26), letterSpacing: "-0.01em" }}>{heading}</h2>
          <p style={{
            fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-secondary)",
            lineHeight: "var(--lh-normal)", maxWidth: 480, margin: 0,
          }}>{intro}</p>
        </div>
        {/* the quiet two-column note: mono sidenote above each entry */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))",
          columnGap: 56, rowGap: 36, paddingBlock: 36,
        }}>
          {items.map((it) => (
            <div key={it.sidenote} style={{ minWidth: 0 }}>
              <div style={libMonoCaps({})}>{it.sidenote}</div>
              <div style={{
                fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", fontWeight: "var(--fw-bold)",
                color: "var(--text-primary)", marginBlockStart: 10,
              }}>{it.title}</div>
              <p style={{
                fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-secondary)",
                lineHeight: "var(--lh-relaxed)", marginBlockStart: 8, marginBlockEnd: 0,
              }}>{it.body}</p>
            </div>
          ))}
        </div>
        <div style={{ paddingBlockStart: 16, borderBlockStart: "1px solid var(--border-subtle)" }}>
          <span style={libMonoCaps({})}>{footnote}</span>
        </div>
      </div>
    </section>
  );
}

window.LibBenchmarkHero = LibBenchmarkHero;
window.LibBenchmarkTable = LibBenchmarkTable;
window.LibPercentileBand = LibPercentileBand;
window.LibMethodologyNote = LibMethodologyNote;
