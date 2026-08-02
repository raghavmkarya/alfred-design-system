/* ============================================================
   Alfred . Inspiration Library . SOCIAL PROOF.
   Ten proof patterns distilled from the 107-site competitor sweep,
   rebuilt on design-system tokens so they render truthfully in light
   and in data-theme="dark". Every component ships complete default
   copy: a bare <LibLogoCloud /> is a finished section. All company
   and people names in rendered output are fictional.
   Compiled to a committed .js twin by scripts/build-kits.mjs;
   catalogued in library/meta/social-proof.json.
   ============================================================ */
const {
  EyebrowBadge, Button, Avatar, AvatarStack, Badge,
} = window.AlfredAIDesignSystem_1ce241;

const libContainer = (extra) => ({
  maxWidth: 1120, marginInline: "auto", paddingInline: 40, ...extra,
});
const libDisplay = (size) => ({
  fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)",
  fontSize: size, lineHeight: "var(--lh-snug)", letterSpacing: "-0.02em",
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
const libFine = {
  fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)",
  color: "var(--text-muted)", lineHeight: "var(--lh-normal)", margin: 0,
};
const libGradientText = {
  background: "var(--gradient-brand)", WebkitBackgroundClip: "text",
  backgroundClip: "text", color: "transparent",
};
const libVisuallyHidden = {
  position: "absolute", width: 1, height: 1, overflow: "hidden",
  clip: "rect(0 0 0 0)", whiteSpace: "nowrap",
};
const libCard = (extra) => ({
  background: "var(--surface-card)", border: "1px solid var(--border-subtle)",
  borderRadius: "var(--radius-2xl)", padding: 28, boxSizing: "border-box", ...extra,
});

/* section head: eyebrow + headline (+ optional sub), centered or start */
const LibProofHead = ({ eyebrow, headline, sub, center, size = 36, maxW = 720 }) => (
  <div style={{ textAlign: center ? "center" : "start" }}>
    {eyebrow ? <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge> : null}
    <h2 style={{ ...libDisplay(size), maxWidth: maxW, marginBlockStart: eyebrow ? 18 : 0, marginInline: center ? "auto" : undefined }}>{headline}</h2>
    {sub ? <p style={{ ...libSub, maxWidth: 560, marginBlockStart: 14, marginInline: center ? "auto" : undefined }}>{sub}</p> : null}
  </div>
);

const LibAttribution = ({ name, title, company, size = 36 }) => (
  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
    <Avatar name={name} size={size} />
    <div>
      <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)" }}>{name}</div>
      <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--text-muted)", marginBlockStart: 2 }}>{title} · {company}</div>
    </div>
  </div>
);

const LibQuoteCard = ({ quote, name, title, company, big }) => (
  <figure style={{ ...libCard({ padding: big ? 32 : 28 }), margin: 0, display: "flex", flexDirection: "column", gap: 22, height: "100%" }}>
    <blockquote style={{ margin: 0, flex: 1, fontFamily: "var(--font-sans)", fontSize: big ? 19 : "var(--text-base)", lineHeight: "var(--lh-relaxed)", color: "var(--text-primary)" }}>
      {"“" + quote + "”"}
    </blockquote>
    <figcaption>
      <LibAttribution name={name} title={title} company={company} />
    </figcaption>
  </figure>
);

const libWordmark = {
  fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)",
  fontSize: 21, letterSpacing: "-0.01em", color: "var(--text-muted)",
  whiteSpace: "nowrap", lineHeight: 1,
};

/* single-color glyphs, drawn inline so they tint via currentColor */
const libStarGlyph = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.8l2.85 5.9 6.45.88-4.72 4.5 1.17 6.4L12 17.4l-5.75 3.08 1.17-6.4-4.72-4.5 6.45-.88L12 2.8z" />
  </svg>
);
const libPlayGlyph = (size = 22) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ transform: "scaleX(var(--flip))" }}>
    <path d="M8.5 6.2v11.6c0 .8.9 1.3 1.6.9l9-5.8c.6-.4.6-1.4 0-1.8l-9-5.8c-.7-.4-1.6.1-1.6.9z" />
  </svg>
);
const libArrowGlyph = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ transform: "scaleX(var(--flip))", flexShrink: 0 }}>
    <path d="M4.5 12h15" />
    <path d="M13 5.5l6.5 6.5-6.5 6.5" />
  </svg>
);
const libChevronGlyph = (open) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
    style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform var(--dur-base) var(--ease-standard)", flexShrink: 0 }}>
    <path d="M5 9l7 7 7-7" />
  </svg>
);
const libTrustGlyph = (kind) => {
  const svgProps = {
    width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
    strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true,
  };
  if (kind === "cert") return (
    <svg {...svgProps}><circle cx="12" cy="9" r="5.2" /><path d="M9.2 13.6L8 21l4-2.4L16 21l-1.2-7.4" /></svg>
  );
  if (kind === "globe") return (
    <svg {...svgProps}><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3c2.4 2.6 3.7 5.6 3.7 9s-1.3 6.4-3.7 9c-2.4-2.6-3.7-5.6-3.7-9S9.6 5.6 12 3z" /></svg>
  );
  if (kind === "lock") return (
    <svg {...svgProps}><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
  );
  if (kind === "data") return (
    <svg {...svgProps}><ellipse cx="12" cy="5.5" rx="7" ry="2.5" /><path d="M5 5.5V18.5c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V5.5" /><path d="M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5" /></svg>
  );
  /* shield-check, the default */
  return (
    <svg {...svgProps}><path d="M12 3l7 2.8v5.4c0 4.4-2.9 7.4-7 9-4.1-1.6-7-4.6-7-9V5.8L12 3z" /><path d="M9 11.8l2.1 2.1 4-4.4" /></svg>
  );
};

/* ------- logo-cloud . fictional wordmarks, quantified header claim ------- */
function LibLogoCloud({
  eyebrow = "IN GOOD COMPANY",
  headline = "Marketing leaders at growth-stage companies start their day with my brief",
  items = ["Meridian", "Northwind Group", "Bluepeak", "Harborline", "Fernwell Labs", "Solstice", "Quarrystone", "Lanternworks"],
  disclaimer = "Example companies shown are illustrative.",
  variant = "static", /* "static" | "marquee" | "split-quote" */
  quote = "I stopped opening dashboards. Alfred opens the day for me.",
  quoteName = "Maya Trent",
  quoteTitle = "Head of Marketing",
  quoteCompany = "Meridian",
}) {
  const marks = (hidden, pad) => (
    <div aria-hidden={hidden || undefined} style={{ display: "flex", alignItems: "baseline", flexWrap: pad ? "nowrap" : "wrap", justifyContent: pad ? "flex-start" : "center", columnGap: pad ? 0 : 56, rowGap: 22 }}>
      {items.map((m, i) => (
        <span key={i} style={{ ...libWordmark, marginInlineEnd: pad ? 64 : 0 }}>{m}</span>
      ))}
    </div>
  );
  if (variant === "split-quote") {
    return (
      <section style={{ background: "var(--bg-page)" }}>
        <div style={libContainer({
          paddingBlock: "96px 88px",
          display: "grid", gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 1fr)",
          gap: 64, alignItems: "center",
        })}>
          <div>
            <LibProofHead eyebrow={eyebrow} headline={headline} size={30} maxW={480} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", rowGap: 26, columnGap: 40, marginBlockStart: 40 }}>
              {items.map((m, i) => (
                <span key={i} style={{ ...libWordmark, whiteSpace: "normal" }}>{m}</span>
              ))}
            </div>
            {disclaimer ? <p style={{ ...libFine, marginBlockStart: 32 }}>{disclaimer}</p> : null}
          </div>
          <LibQuoteCard quote={quote} name={quoteName} title={quoteTitle} company={quoteCompany} big />
        </div>
      </section>
    );
  }
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({ paddingBlock: "88px 80px", textAlign: "center" })}>
        <LibProofHead eyebrow={eyebrow} headline={headline} center size={26} maxW={640} />
        {variant === "marquee" ? (
          <div style={{ overflow: "hidden", marginBlockStart: 44 }}>
            <style>{"@keyframes lib-logo-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }"}</style>
            <div style={{ display: "flex", width: "max-content", animation: "lib-logo-marquee 32s linear infinite" }}>
              {marks(false, true)}
              {marks(true, true)}
            </div>
          </div>
        ) : (
          <div style={{ marginBlockStart: 44 }}>{marks(false, false)}</div>
        )}
        {disclaimer ? <p style={{ ...libFine, marginBlockStart: 36 }}>{disclaimer}</p> : null}
      </div>
    </section>
  );
}

/* ------- stat-band . four outcome numbers, attributed in the footnote ------- */
function LibStatBand({
  eyebrow = "WHAT CHANGES",
  headline = "The numbers a chief of staff moves",
  items = [
    { value: "70%", label: "faster decisions" },
    { value: "12%", label: "less wasted spend" },
    { value: "15+ hrs", label: "reclaimed every week" },
    { value: "85%", label: "of marketing questions answered without an analyst" },
  ],
  footnote = "Product outcome benchmarks for Alfred for Marketing.",
  variant = "simple", /* "simple" | "gradient-panel" */
}) {
  const onPanel = variant === "gradient-panel";
  const stats = (
    <div style={{
      display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: onPanel ? 36 : 40,
      borderBlockStart: onPanel ? undefined : "1px solid var(--border-subtle)",
      paddingBlockStart: onPanel ? 0 : 40,
    }}>
      {items.map((s, i) => (
        <div key={i}>
          <div style={{ ...libNumeral(52), color: onPanel ? "var(--text-on-brand)" : "var(--text-display)" }}>{s.value}</div>
          <div style={{
            fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", lineHeight: "var(--lh-normal)",
            color: onPanel ? "var(--text-on-brand)" : "var(--text-secondary)", opacity: onPanel ? 0.85 : 1,
            marginBlockStart: 10, maxWidth: 230,
          }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({ paddingBlock: "96px 88px" })}>
        <LibProofHead eyebrow={eyebrow} headline={headline} size={34} />
        <div style={{ marginBlockStart: 44 }}>
          {onPanel ? (
            /* the section's one gradient element */
            <div style={{ background: "var(--gradient-brand)", borderRadius: "var(--radius-3xl)", paddingBlock: 48, paddingInline: 48 }}>
              {stats}
            </div>
          ) : stats}
        </div>
        {footnote ? <p style={{ ...libFine, marginBlockStart: 28 }}>{footnote}</p> : null}
      </div>
    </section>
  );
}

/* ------- testimonials . trio / spotlight-metric / grid ------- */
function LibTestimonials({
  eyebrow = "FROM THE CORNER OFFICE",
  headline = "What leaders say after a quarter with me",
  items = [
    { quote: "I used to spend Sunday nights stitching five reports together. Now I read one brief on Monday morning and walk into the exec meeting already decided.", name: "Maya Trent", title: "Head of Marketing", company: "Meridian" },
    { quote: "Alfred flagged creative fatigue nine days before our agency did. That one catch paid for the year.", name: "Daniel Osei", title: "VP Marketing", company: "Northwind Group" },
    { quote: "The board stopped asking me to prove marketing works. Every number I present traces back to a decision, and every decision traces back to data.", name: "Sofia Herrera", title: "CMO", company: "Bluepeak" },
  ],
  disclaimer = "Illustrative scenarios with fictional companies, shown to demonstrate the product experience.",
  variant = "trio", /* "trio" | "spotlight-metric" | "grid" */
  metricValue = "+18%",
  metricLabel = "pipeline efficiency in the first quarter",
}) {
  if (variant === "spotlight-metric") {
    const t = items[0];
    return (
      <section style={{ background: "var(--bg-page)" }}>
        <div style={libContainer({ paddingBlock: "96px 88px" })}>
          <LibProofHead eyebrow={eyebrow} headline={headline} size={34} />
          <div style={{
            display: "grid", gridTemplateColumns: "minmax(0, 0.9fr) minmax(0, 1.1fr)",
            gap: 64, alignItems: "center", marginBlockStart: 56,
          }}>
            <div>
              {/* the section's one gradient element */}
              <div style={{ ...libNumeral(92), display: "inline-block", ...libGradientText }}>{metricValue}</div>
              <p style={{ ...libSub, maxWidth: 280, marginBlockStart: 14 }}>{metricLabel}</p>
            </div>
            <figure style={{ margin: 0 }}>
              <blockquote style={{ margin: 0, fontFamily: "var(--font-sans)", fontWeight: "var(--fw-medium)", fontSize: 23, lineHeight: 1.5, color: "var(--text-primary)" }}>
                {"“" + t.quote + "”"}
              </blockquote>
              <figcaption style={{ marginBlockStart: 26 }}>
                <LibAttribution name={t.name} title={t.title} company={t.company} size={40} />
              </figcaption>
            </figure>
          </div>
          {disclaimer ? <p style={{ ...libFine, marginBlockStart: 40 }}>{disclaimer}</p> : null}
        </div>
      </section>
    );
  }
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({ paddingBlock: "96px 88px" })}>
        <LibProofHead eyebrow={eyebrow} headline={headline} center size={36} />
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 24, marginBlockStart: 48, alignItems: "stretch",
        }}>
          {items.map((t, i) => (
            <LibQuoteCard key={i} quote={t.quote} name={t.name} title={t.title} company={t.company} />
          ))}
        </div>
        {disclaimer ? <p style={{ ...libFine, marginBlockStart: 36, textAlign: "center" }}>{disclaimer}</p> : null}
      </div>
    </section>
  );
}

/* ------- metric-case-cards . number first, then the story ------- */
function LibMetricCaseCards({
  eyebrow = "SCENARIOS",
  headline = "What a quarter with me looks like",
  sub = "Three illustrative runs of the same playbook: connect the stack, read the brief, act on the flag.",
  items = [
    { metric: "+18%", metricLabel: "pipeline efficiency in the first quarter", title: "Meridian rebalanced spend across three channels", body: "I flagged that search was outperforming paid social at the margin. Meridian's marketing lead approved the reallocation from the brief, and pipeline efficiency rose 18% in a quarter.", ctaLabel: "See the playbook" },
    { metric: "9 days", metricLabel: "earlier catch on creative fatigue", title: "Northwind refreshed creative before the dip", body: "Frequency crossed the fatigue threshold on a Tuesday. I flagged it that morning, nine days before the monthly agency review would have caught it.", ctaLabel: "See the playbook" },
    { metric: "12%", metricLabel: "less wasted spend in two months", title: "Bluepeak cut the campaigns that only looked good", body: "Two campaigns had strong platform metrics and weak pipeline contribution. I showed the gap, Bluepeak paused them, and wasted spend fell 12%.", ctaLabel: "See the playbook" },
  ],
  disclaimer = "Illustrative scenarios with fictional companies.",
  variant = "three-up", /* "three-up" | "featured" */
}) {
  const ctaLink = (label) => (
    <button type="button" style={{
      display: "inline-flex", alignItems: "center", gap: 8, background: "none", border: "none",
      padding: 0, cursor: "pointer", color: "var(--text-link)", fontFamily: "var(--font-sans)",
      fontSize: "var(--text-sm)", fontWeight: "var(--fw-bold)",
    }}>
      {label}
      {libArrowGlyph}
    </button>
  );
  const card = (c, i, big) => (
    <article key={i} style={{ ...libCard({ padding: big ? 40 : 28 }), display: "flex", flexDirection: "column", gap: 0, height: "100%" }}>
      <div style={libNumeral(big ? 72 : 44)}>{c.metric}</div>
      <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-secondary)", marginBlockStart: 8 }}>{c.metricLabel}</div>
      <h3 style={{ ...libDisplay(big ? 24 : 18), marginBlockStart: big ? 28 : 20 }}>{c.title}</h3>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: big ? "var(--text-base)" : "var(--text-sm)", color: "var(--text-secondary)", lineHeight: "var(--lh-relaxed)", margin: 0, marginBlockStart: 10, flex: 1 }}>{c.body}</p>
      <div style={{ marginBlockStart: 20 }}>{ctaLink(c.ctaLabel)}</div>
    </article>
  );
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({ paddingBlock: "96px 88px" })}>
        <LibProofHead eyebrow={eyebrow} headline={headline} sub={sub} size={36} />
        {variant === "featured" ? (
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.25fr) minmax(0, 1fr)", gap: 24, marginBlockStart: 48, alignItems: "stretch" }}>
            {card(items[0], 0, true)}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {items.slice(1).map((c, i) => card(c, i + 1, false))}
            </div>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24, marginBlockStart: 48, alignItems: "stretch" }}>
            {items.map((c, i) => card(c, i, false))}
          </div>
        )}
        {disclaimer ? <p style={{ ...libFine, marginBlockStart: 32 }}>{disclaimer}</p> : null}
      </div>
    </section>
  );
}

/* ------- review-badge-strip . quantified ratings, fictional platforms ------- */
function LibReviewBadgeStrip({
  headline = "Rated by the people who make the call",
  items = [
    { platform: "SoftwareScout", rating: "4.8", label: "Decision intelligence" },
    { platform: "StackReview", rating: "4.7", label: "Marketing leaders" },
    { platform: "B2B Radar", rating: "4.9", label: "Momentum leader, 2026" },
  ],
  footnote = "Illustrative placement. Swap in live review sources at publish.",
}) {
  return (
    <section style={{ background: "var(--bg-page)", borderBlockStart: "1px solid var(--border-subtle)", borderBlockEnd: "1px solid var(--border-subtle)" }}>
      <div style={libContainer({ paddingBlock: "80px 72px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: 44 })}>
        <div style={{ flex: "1 1 220px", minWidth: 200 }}>
          <h2 style={libDisplay(24)}>{headline}</h2>
          {footnote ? <p style={{ ...libFine, marginBlockStart: 12 }}>{footnote}</p> : null}
        </div>
        {items.map((r, i) => (
          <div key={i} style={{
            paddingInlineStart: i === 0 ? 0 : 36,
            borderInlineStart: i === 0 ? "none" : "1px solid var(--border-subtle)",
          }}>
            <div style={{ display: "flex", gap: 3, color: "var(--accent)" }} role="img" aria-label={r.rating + " out of 5 stars"}>
              {[0, 1, 2, 3, 4].map((s) => <span key={s} aria-hidden="true" style={{ display: "inline-flex" }}>{libStarGlyph}</span>)}
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBlockStart: 10 }}>
              <span style={libNumeral(30)}>{r.rating}</span>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>/ 5</span>
            </div>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)", marginBlockStart: 8 }}>{r.platform}</div>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--text-muted)", marginBlockStart: 3 }}>{r.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------- avatar-cluster-strip . named-people proof + one CTA ------- */
function LibAvatarClusterStrip({
  text = "Join 400+ marketing leaders who start their day with my brief",
  names = ["Maya Trent", "Daniel Osei", "Sofia Herrera", "Ravi Kulkarni", "Elena Marsh", "Tomás Rivera", "Amara Diallo"],
  avatarsAlt = "Marketing leaders who run their mornings on Alfred",
  ctaLabel = "Talk to sales",
  footnote = "Illustrative figure.",
}) {
  return (
    <section style={{ background: "var(--bg-page)", borderBlockStart: "1px solid var(--border-subtle)", borderBlockEnd: "1px solid var(--border-subtle)" }}>
      <div style={libContainer({ paddingBlock: "80px 80px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 28 })}>
        <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap", flex: "1 1 480px" }}>
          <span aria-hidden="true">
            <AvatarStack names={names} max={5} size={44} />
          </span>
          <span style={libVisuallyHidden}>{avatarsAlt}</span>
          <div style={{ flex: "1 1 300px", minWidth: 240 }}>
            <p style={{ ...libDisplay(21), maxWidth: 520 }}>{text}</p>
            {footnote ? <p style={{ ...libFine, marginBlockStart: 8 }}>{footnote}</p> : null}
          </div>
        </div>
        <Button variant="primary" size="lg">{ctaLabel}</Button>
      </div>
    </section>
  );
}

/* ------- case-study-accordions . case density without page length ------- */
function LibCaseStudyAccordions({
  eyebrow = "DEEP DIVES",
  headline = "Three decisions, end to end",
  sub = "Each one follows the same four stages: learn, nudge, recommend, act.",
  items = [
    { title: "The CPA spike that never reached the board", summary: "Meridian, paid social", metric: "Same-day correction", body: "CPA rose 34% overnight. I traced it to creative fatigue in one segment, recommended a refresh plus a 15% budget reallocation, and staged the change. Approved at 8:40 AM, corrected the same day, logged in the audit trail. The board never saw the spike, only the save." },
    { title: "The tracking break caught before the report went out", summary: "Northwind Group, analytics", metric: "2 reports protected", body: "A site deploy silently broke the checkout event at 11 PM. I flagged it in the morning brief, named the two reports it would distort, and drafted the fix ticket. The weekly numbers went out clean instead of wrong." },
    { title: "The budget defence that took one afternoon, not one week", summary: "Bluepeak, board prep", metric: "12% wasted spend recovered", body: "Finance asked for a 10% cut. I ranked every campaign by pipeline contribution, showed which spend was decorative, and Bluepeak's CMO walked into the board meeting with a cut plan that protected pipeline and recovered 12% of wasted spend." },
  ],
  disclaimer = "Illustrative scenarios with fictional companies.",
  expandLabel = "Read the full run",
  collapseLabel = "Collapse",
}) {
  const [open, setOpen] = React.useState(0);
  const uid = React.useId();
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({ paddingBlock: "96px 88px" })}>
        <LibProofHead eyebrow={eyebrow} headline={headline} sub={sub} size={36} />
        <div style={{ border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-2xl)", background: "var(--surface-card)", marginBlockStart: 44, overflow: "hidden" }}>
          {items.map((c, i) => {
            const isOpen = open === i;
            const panelId = uid + "-panel-" + i;
            return (
              <div key={i} style={{ borderBlockStart: i === 0 ? "none" : "1px solid var(--border-subtle)" }}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  style={{
                    display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", gap: 20, alignItems: "center",
                    width: "100%", background: "none", border: "none", cursor: "pointer", textAlign: "start",
                    paddingBlock: 24, paddingInline: 28,
                  }}
                >
                  <span>
                    <span style={{ ...libDisplay(19), display: "block" }}>{c.title}</span>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-muted)", display: "block", marginBlockStart: 6 }}>{c.summary}</span>
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: 14, color: "var(--text-secondary)" }}>
                    <Badge tone="brand">{c.metric}</Badge>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-bold)", color: "var(--text-link)", whiteSpace: "nowrap" }}>
                      {isOpen ? collapseLabel : expandLabel}
                    </span>
                    {libChevronGlyph(isOpen)}
                  </span>
                </button>
                {isOpen ? (
                  <div id={panelId} role="region" aria-label={c.title} style={{ paddingInline: 28, paddingBlock: "0px 28px" }}>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", color: "var(--text-secondary)", lineHeight: "var(--lh-relaxed)", margin: 0, maxWidth: 740 }}>{c.body}</p>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
        {disclaimer ? <p style={{ ...libFine, marginBlockStart: 24 }}>{disclaimer}</p> : null}
      </div>
    </section>
  );
}

/* ------- trust-compliance-band . the enterprise objection handler ------- */
function LibTrustComplianceBand({
  eyebrow = "SECURITY AND TRUST",
  headline = "Built to pass the strictest review in the room",
  claim = "I read revenue data for a living, so I hold myself to the controls your security team already demands. Your data stays yours, stays in your region, and never trains anyone else's model.",
  items = [
    { name: "SOC 2 Type II", detail: "Audited annually", icon: "shield" },
    { name: "ISO 27001", detail: "Certified information security", icon: "cert" },
    { name: "GDPR", detail: "EU data residency available", icon: "globe" },
    { name: "SSO and SCIM", detail: "Enforced on every seat", icon: "lock" },
    { name: "No model training", detail: "Your data never trains shared models", icon: "data" },
  ],
  ctaLabel = "Visit the trust center",
  footnote = "Certification status shown is illustrative. Reflect your live compliance posture at publish.",
}) {
  return (
    <section style={{ background: "var(--surface-sunken)" }}>
      <div style={libContainer({ paddingBlock: "88px 80px" })}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 24 }}>
          <LibProofHead eyebrow={eyebrow} headline={headline} size={32} maxW={520} />
          <Button variant="outline" size="md" style={{ background: "transparent", color: "var(--text-primary)", borderColor: "var(--border-default)" }}>{ctaLabel}</Button>
        </div>
        <p style={{ ...libSub, fontSize: "var(--text-base)", maxWidth: 640, marginBlockStart: 18 }}>{claim}</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 16, marginBlockStart: 40 }}>
          {items.map((c, i) => (
            <div key={i} style={libCard({ padding: 20, borderRadius: "var(--radius-lg)", display: "flex", flexDirection: "column", gap: 12 })}>
              <span style={{ color: "var(--text-secondary)", display: "inline-flex" }}>{libTrustGlyph(c.icon)}</span>
              <div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)" }}>{c.name}</div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--text-muted)", marginBlockStart: 4, lineHeight: "var(--lh-normal)" }}>{c.detail}</div>
              </div>
            </div>
          ))}
        </div>
        {footnote ? <p style={{ ...libFine, marginBlockStart: 24 }}>{footnote}</p> : null}
      </div>
    </section>
  );
}

/* ------- analyst-callout . authority interstitial with lead capture ------- */
function LibAnalystCallout({
  eyebrow = "ANALYST BRIEFING",
  quote = "The strongest expression of decision intelligence we evaluated: Alfred closes the gap between seeing a number and acting on it.",
  firm = "Ridgeline Research",
  report = "The Decision Intelligence Landscape",
  year = "2026",
  statValue = "327%",
  statLabel = "projected three-year ROI for the composite organisation in Ridgeline's model",
  ctaLabel = "Get the full report",
  disclaimer = "Illustrative quote and figures from a fictional research firm.",
}) {
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({ paddingBlock: "104px 96px", textAlign: "center", maxWidth: 880 })}>
        <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
        <blockquote style={{ ...libDisplay(36), margin: 0, marginBlockStart: 26 }}>
          {"“" + quote + "”"}
        </blockquote>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-muted)", marginBlockStart: 22, marginBlockEnd: 0 }}>
          {firm} · {report}, {year}
        </p>
        <div style={{ borderBlockStart: "1px solid var(--border-subtle)", maxWidth: 560, marginInline: "auto", marginBlockStart: 44, paddingBlockStart: 40 }}>
          {/* the section's one gradient element */}
          <div style={{ ...libNumeral(64), display: "inline-block", ...libGradientText }}>{statValue}</div>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: "var(--lh-normal)", maxWidth: 380, marginInline: "auto", marginBlockStart: 12, marginBlockEnd: 0 }}>{statLabel}</p>
          <div style={{ marginBlockStart: 28 }}>
            <Button variant="primary" size="lg">{ctaLabel}</Button>
          </div>
        </div>
        {disclaimer ? <p style={{ ...libFine, marginBlockStart: 36 }}>{disclaimer}</p> : null}
      </div>
    </section>
  );
}

/* ------- video-testimonial . poster + play, no real footage needed ------- */
function LibVideoTestimonial({
  eyebrow = "IN THEIR WORDS",
  headline = "A quarter with Alfred, told by the person who made the calls",
  quote = "I walk into the board room already knowing every number that will come up.",
  name = "Maya Trent",
  title = "Head of Marketing",
  company = "Meridian",
  ctaLabel = "Watch the story",
  duration = "3 min",
  posterAlt = "A marketing leader describing her first quarter with Alfred",
  disclaimer = "Illustrative scenario with a fictional company.",
}) {
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({
        paddingBlock: "96px 88px",
        display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.1fr)",
        gap: 64, alignItems: "center",
      })}>
        <div>
          <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
          <h2 style={{ ...libDisplay(38), marginBlockStart: 18 }}>{headline}</h2>
          <p style={{ ...libSub, maxWidth: 440, marginBlockStart: 18 }}>{"“" + quote + "”"}</p>
          <div style={{ marginBlockStart: 24 }}>
            <LibAttribution name={name} title={title} company={company} size={40} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBlockStart: 30, flexWrap: "wrap" }}>
            <Button variant="outline" size="lg" iconLeft={libPlayGlyph(16)} style={{ background: "transparent", color: "var(--text-primary)", borderColor: "var(--border-default)" }}>{ctaLabel}</Button>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>{duration}</span>
          </div>
          {disclaimer ? <p style={{ ...libFine, marginBlockStart: 24 }}>{disclaimer}</p> : null}
        </div>
        <div
          role="img"
          aria-label={posterAlt}
          style={{
            position: "relative", aspectRatio: "16 / 10", borderRadius: "var(--radius-2xl)",
            background: "var(--surface-sunken)", border: "1px solid var(--border-subtle)",
            boxShadow: "var(--elevation-raised)", overflow: "hidden", minWidth: 0,
          }}
        >
          <button
            type="button"
            aria-label={ctaLabel}
            style={{
              position: "absolute", insetInlineStart: "50%", insetBlockStart: "50%",
              transform: "translate(-50%, -50%)", /* centring, direction-neutral */
              width: 68, height: 68, borderRadius: "var(--radius-circle)", border: "none",
              background: "var(--accent)", color: "var(--text-on-brand)", cursor: "pointer",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              boxShadow: "var(--elevation-floating)",
            }}
          >
            {libPlayGlyph(26)}
          </button>
          <span style={{
            position: "absolute", insetBlockStart: 16, insetInlineEnd: 16,
            fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", fontWeight: "var(--fw-bold)",
            color: "var(--text-primary)", background: "var(--surface-card)",
            border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-pill)",
            paddingBlock: 5, paddingInline: 11,
          }}>{duration}</span>
          <div style={{ position: "absolute", insetBlockEnd: 0, insetInlineStart: 0, insetInlineEnd: 0, paddingBlock: 16, paddingInline: 20, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--text-muted)", whiteSpace: "nowrap" }}>{name} · {company}</span>
            <span aria-hidden="true" style={{ flex: 1, height: 3, borderRadius: "var(--radius-pill)", background: "var(--border-default)" }} />
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>0:00</span>
          </div>
        </div>
      </div>
    </section>
  );
}

window.LibLogoCloud = LibLogoCloud;
window.LibStatBand = LibStatBand;
window.LibTestimonials = LibTestimonials;
window.LibMetricCaseCards = LibMetricCaseCards;
window.LibReviewBadgeStrip = LibReviewBadgeStrip;
window.LibAvatarClusterStrip = LibAvatarClusterStrip;
window.LibCaseStudyAccordions = LibCaseStudyAccordions;
window.LibTrustComplianceBand = LibTrustComplianceBand;
window.LibAnalystCallout = LibAnalystCallout;
window.LibVideoTestimonial = LibVideoTestimonial;
