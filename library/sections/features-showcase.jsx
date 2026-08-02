/* ============================================================
   Alfred Inspiration Library · PRODUCT SHOWCASE.
   Seven feature-presentation patterns distilled from the 107-site
   competitor sweep, rebuilt on design-system tokens so they render
   truthfully in light and in data-theme="dark". Every component
   ships complete default copy: a bare <LibPersonaTiles /> is a
   finished section. Compiled to a committed .js twin by
   scripts/build-kits.mjs; catalogued in
   library/meta/features-showcase.json.
   ============================================================ */
const {
  EyebrowBadge, Button, Tabs, Badge, DashboardMock,
} = window.AlfredAIDesignSystem_1ce241;

/* :: file-private helpers (const arrows: NOT exported by the twin compiler) :: */
const libContainer = (extra) => ({
  maxWidth: 1120, marginInline: "auto", paddingInline: 40, ...extra,
});
const libDisplay = (size) => ({
  fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)",
  fontSize: size, lineHeight: 1.1, letterSpacing: "-0.02em",
  color: "var(--text-primary)", margin: 0,
});
const libSub = {
  fontFamily: "var(--font-sans)", fontSize: "var(--text-lg)",
  color: "var(--text-secondary)", lineHeight: "var(--lh-relaxed)", margin: 0,
};
const libLabel = {
  fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)",
  fontWeight: "var(--fw-bold)", letterSpacing: "0.08em",
  textTransform: "uppercase", color: "var(--text-muted)",
};
const libBody = {
  fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)",
  color: "var(--text-secondary)", lineHeight: "var(--lh-normal)", margin: 0,
};
const libCaption = {
  fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)",
  color: "var(--text-muted)", lineHeight: "var(--lh-normal)", margin: 0,
};
const libGhostCta = { background: "transparent", color: "var(--text-primary)", borderColor: "var(--border-default)" };

/* Section opener: eyebrow chip + display headline + one-sentence sub. */
const LibSectionHead = ({ eyebrow, headline, sub, align = "center", size = 40, maxWidth = 720 }) => (
  <div style={{ textAlign: align === "center" ? "center" : "start" }}>
    <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
    <h2 style={{ ...libDisplay(size), maxWidth, marginBlockStart: 18, marginInline: align === "center" ? "auto" : undefined }}>{headline}</h2>
    {sub ? (
      <p style={{ ...libSub, maxWidth: 620, marginBlockStart: 16, marginInline: align === "center" ? "auto" : undefined }}>{sub}</p>
    ) : null}
  </div>
);

/* Directional glyphs flip with the writing direction via scaleX(var(--flip)). */
const libArrowGlyph = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0, transform: "scaleX(var(--flip, 1))" }}>
    <path d="M4 12h15" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);
const libNodeGlyph = (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
    <circle cx="12" cy="12" r="3.4" />
    <path d="M12 2.6v4" /><path d="M12 17.4v4" /><path d="M2.6 12h4" /><path d="M17.4 12h4" />
  </svg>
);
const libFlowGlyph = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M8 19V6" /><path d="M4.8 9.2L8 6l3.2 3.2" />
    <path d="M16 5v13" /><path d="M12.8 14.8L16 18l3.2-3.2" />
  </svg>
);
const libPlayGlyph = (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ transform: "scaleX(var(--flip, 1))", marginInlineStart: 3 }}>
    <path d="M8 5l11 7-11 7z" />
  </svg>
);

/* Abstract product frame: browser chrome, three fictional-dataset stat tiles,
   skeleton copy bars. A stand-in for a screenshot that stays honest in both
   themes; the caption carries the alt narrative. */
const LibScreenFrame = ({ url = "app.seekalfred.ai", stats = [], seed = 0, caption }) => {
  const widths = [[62, 84, 46], [78, 52, 66], [56, 88, 40], [70, 44, 82]][seed % 4];
  return (
    <figure style={{ margin: 0, minWidth: 0 }}>
      <div style={{ border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-xl)", overflow: "hidden", background: "var(--surface-card)", boxShadow: "var(--elevation-raised)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBlock: 10, paddingInline: 14, borderBlockEnd: "1px solid var(--border-subtle)" }}>
          <span aria-hidden="true" style={{ display: "flex", gap: 5 }}>
            {[0, 1, 2].map((d) => (
              <span key={d} style={{ width: 8, height: 8, borderRadius: "var(--radius-circle)", background: "var(--border-default)" }} />
            ))}
          </span>
          <span style={{ ...libCaption, paddingBlock: 3, paddingInline: 12, borderRadius: "var(--radius-pill)", background: "var(--surface-sunken)" }}>{url}</span>
          <span style={{ marginInlineStart: "auto" }}><Badge tone="success" dot>Live</Badge></span>
        </div>
        <div style={{ paddingBlock: 20, paddingInline: 20, display: "flex", flexDirection: "column", gap: 16 }}>
          {stats.length ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 10 }}>
              {stats.map((s, i) => (
                <div key={i} style={{ border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", paddingBlock: 12, paddingInline: 14, minWidth: 0 }}>
                  <div style={{ ...libCaption, marginBlockEnd: 6 }}>{s.label}</div>
                  <div style={{ ...libDisplay(20), lineHeight: 1 }}>{s.value}</div>
                </div>
              ))}
            </div>
          ) : null}
          <div aria-hidden="true" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {widths.map((w, i) => (
              <span key={i} style={{ display: "block", height: 10, width: w + "%", borderRadius: "var(--radius-pill)", background: "var(--surface-sunken)" }} />
            ))}
          </div>
        </div>
      </div>
      {caption ? <figcaption style={{ ...libCaption, textAlign: "center", marginBlockStart: 10 }}>{caption}</figcaption> : null}
    </figure>
  );
};

/* :: persona-tiles · self-segmentation tiles phrased as leader questions :: */
function LibPersonaTiles({
  eyebrow = "Ask me",
  headline = "The questions leaders actually ask",
  sub = "Every tile is a question shape I answer from your data, in seconds.",
  tiles = [
    { persona: "Head of Marketing", question: "Where is spend leaking this month?" },
    { persona: "VP Marketing", question: "Which campaigns look good but add nothing to pipeline?" },
    { persona: "CMO", question: "What should I cut first if the budget drops 10%?" },
    { persona: "Founder", question: "What changed since the last board meeting, and why?" },
    { persona: "Head of Growth", question: "Which channel earns the next dollar best?" },
    { persona: "Marketing Director", question: "What's at risk this week that nobody has noticed yet?" },
  ],
  ctaLabel = "Seek Alfred",
}) {
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({ paddingBlock: "96px 104px" })}>
        <LibSectionHead eyebrow={eyebrow} headline={headline} sub={sub} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 16, marginBlockStart: 48 }}>
          {tiles.map((t, i) => (
            <div key={i} style={{
              display: "flex", flexDirection: "column", gap: 14, minWidth: 0,
              background: "var(--surface-card)", border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-2xl)", paddingBlock: 24, paddingInline: 24,
              boxShadow: "var(--elevation-surface)",
            }}>
              <div style={libLabel}>{t.persona}</div>
              <p style={{ ...libDisplay(21), lineHeight: 1.3, flexGrow: 1 }}>{t.question}</p>
              <a href="#" style={{
                display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none",
                fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)",
                fontWeight: "var(--fw-bold)", color: "var(--text-link)",
              }}>
                {ctaLabel}
                {libArrowGlyph}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* :: tabbed-use-cases · one platform, four moments of the week :: */
function LibTabbedUseCases({
  eyebrow = "Use cases",
  headline = "One platform, your whole marketing week",
  sub = "Pick a moment. This is how it runs with a chief of staff for decisions behind it.",
  items = [
    {
      label: "Monday brief",
      title: "Start decided, not buried",
      body: "Before your first meeting, the brief has already ranked what changed, named the causes, and staged the day's decisions. Your standup gets 20 minutes shorter.",
      screenshotAlt: "The Monday morning brief with ranked actions",
      stats: [
        { label: "Flags ranked", value: "3" },
        { label: "Causes named", value: "3 of 3" },
        { label: "Standup", value: "20 min shorter" },
      ],
    },
    {
      label: "Budget review",
      title: "Defend every dollar with a straight line to revenue",
      body: "Every campaign ranked by pipeline contribution, every reallocation simulated before you commit. A glass box, not a black box.",
      screenshotAlt: "Spend mix analysis with a simulated reallocation",
      stats: [
        { label: "Campaigns ranked", value: "24" },
        { label: "Move simulated", value: "$18K" },
        { label: "Pipeline lift", value: "+6.2%" },
      ],
    },
    {
      label: "Board prep",
      title: "Walk in already knowing every number",
      body: "What moved this quarter, why it moved, and what you did about it, with the audit trail to back every claim. No scrambling the night before.",
      screenshotAlt: "A quarter summary with traceable decisions",
      stats: [
        { label: "Decisions traced", value: "31" },
        { label: "Prep time", value: "45 min" },
        { label: "Open questions", value: "0" },
      ],
    },
    {
      label: "Anomaly response",
      title: "Catch it the morning it happens",
      body: "The first sign something broke is my flag, not a board question. Cause attached, fix recommended, correction staged for your approval.",
      screenshotAlt: "An anomaly flag with cause analysis and a staged fix",
      stats: [
        { label: "Detected", value: "7:41 AM" },
        { label: "Cause", value: "Named" },
        { label: "Fix", value: "Staged" },
      ],
    },
  ],
}) {
  const [active, setActive] = React.useState("0");
  const item = items[Number(active)] || items[0];
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({ paddingBlock: "96px 104px" })}>
        <LibSectionHead eyebrow={eyebrow} headline={headline} sub={sub} />
        <div style={{ display: "flex", justifyContent: "center", marginBlockStart: 36 }}>
          <Tabs
            tabs={items.map((t, i) => ({ id: String(i), label: t.label }))}
            value={active}
            onChange={setActive}
          />
        </div>
        <div style={{
          marginBlockStart: 28, background: "var(--surface-card)",
          border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-2xl)",
          paddingBlock: 36, paddingInline: 40, boxShadow: "var(--elevation-raised)",
          display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.1fr)",
          gap: 44, alignItems: "center",
        }}>
          <div>
            <div style={libLabel}>{item.label}</div>
            <h3 style={{ ...libDisplay(28), marginBlockStart: 12 }}>{item.title}</h3>
            <p style={{ ...libSub, fontSize: "var(--text-base)", marginBlockStart: 14 }}>{item.body}</p>
          </div>
          <LibScreenFrame stats={item.stats || []} seed={Number(active)} caption={item.screenshotAlt} />
        </div>
      </div>
    </section>
  );
}

/* :: integrations-grid · the stack Alfred reads, grouped or radial :: */
function LibIntegrationsGrid2({
  eyebrow = "Connections",
  headline = "I read the stack you already run",
  sub = "Secure, read-only API connections across ads, analytics, CRM, and search. Write-back happens only when you explicitly approve an action.",
  integrations = [
    { name: "Google Ads", category: "Paid advertising" },
    { name: "Meta Ads", category: "Paid advertising" },
    { name: "LinkedIn Ads", category: "Paid advertising" },
    { name: "Amazon Ads", category: "Paid advertising" },
    { name: "Google Analytics 4", category: "Analytics" },
    { name: "HubSpot", category: "CRM and pipeline" },
    { name: "Salesforce", category: "CRM and pipeline" },
    { name: "Google Search Console", category: "SEO and organic" },
    { name: "Slack", category: "Brief delivery" },
    { name: "Email", category: "Brief delivery" },
  ],
  footnote = "Don't see a tool? Growth and Max plans include custom integration requests on a committed SLA.",
  ctaLabel = "See how connections work",
  layout = "grid", /* "grid" | "hub-spoke" */
}) {
  const chip = (it, small) => (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 9,
      paddingBlock: small ? 8 : 10, paddingInline: small ? 12 : 14,
      border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)",
      background: "var(--surface-card)", boxShadow: "var(--elevation-surface)",
      fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)",
      fontWeight: "var(--fw-medium)", color: "var(--text-primary)", whiteSpace: "nowrap",
    }}>
      <span style={{ display: "inline-flex", color: "var(--text-muted)" }}>{libNodeGlyph}</span>
      {it.name}
    </span>
  );
  const footer = (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, marginBlockStart: 44 }}>
      <p style={{ ...libCaption, maxWidth: 520, textAlign: "center" }}>{footnote}</p>
      <Button variant="outline" size="md" style={libGhostCta}>{ctaLabel}</Button>
    </div>
  );
  if (layout === "hub-spoke") {
    const n = integrations.length;
    const pts = integrations.map((it, i) => {
      const a = (i / n) * Math.PI * 2 - Math.PI / 2;
      return { it, x: 50 + 39 * Math.cos(a), y: 50 + 40 * Math.sin(a) };
    });
    return (
      <section style={{ background: "var(--bg-page)" }}>
        <div style={libContainer({ paddingBlock: "96px 104px" })}>
          <LibSectionHead eyebrow={eyebrow} headline={headline} sub={sub} />
          <div style={{ position: "relative", height: 440, marginBlockStart: 40, marginInline: "auto", maxWidth: 880 }}>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", transform: "scaleX(var(--flip, 1))" }}>
              {pts.map((p, i) => (
                <line key={i} x1="50" y1="50" x2={p.x} y2={p.y} stroke="var(--border-default)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              ))}
            </svg>
            {pts.map((p, i) => (
              <span key={i} style={{ position: "absolute", insetInlineStart: p.x + "%", insetBlockStart: p.y + "%", transform: "translate(-50%, -50%)" }}>
                {chip(p.it, true)}
              </span>
            ))}
            <div style={{
              position: "absolute", insetInlineStart: "50%", insetBlockStart: "50%",
              transform: "translate(-50%, -50%)",
              background: "var(--gradient-brand)", color: "var(--text-on-brand)",
              borderRadius: "var(--radius-xl)", paddingBlock: 16, paddingInline: 30,
              fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)",
              fontSize: 24, letterSpacing: "-0.02em", boxShadow: "var(--elevation-floating)",
            }}>
              Alfred
            </div>
          </div>
          {footer}
        </div>
      </section>
    );
  }
  const groups = [];
  for (const it of integrations) {
    let g = groups.find((x) => x.category === it.category);
    if (!g) { g = { category: it.category, items: [] }; groups.push(g); }
    g.items.push(it);
  }
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({ paddingBlock: "96px 104px", maxWidth: 980 })}>
        <LibSectionHead eyebrow={eyebrow} headline={headline} sub={sub} />
        <div style={{ marginBlockStart: 44, borderBlockStart: "1px solid var(--border-subtle)" }}>
          {groups.map((g, gi) => (
            <div key={gi} style={{
              display: "grid", gridTemplateColumns: "200px minmax(0, 1fr)", gap: 24,
              alignItems: "start", paddingBlock: 22,
              borderBlockEnd: "1px solid var(--border-subtle)",
            }}>
              <div style={{ ...libLabel, paddingBlockStart: 12 }}>{g.category}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {g.items.map((it, i) => <span key={i}>{chip(it, false)}</span>)}
              </div>
            </div>
          ))}
        </div>
        {footer}
      </div>
    </section>
  );
}

/* :: architecture-diagram · the operating layer, drawn as a stack :: */
function LibArchitectureDiagram({
  eyebrow = "Under the hood",
  headline = "The missing operating layer between your data and your leadership decisions",
  sub = "I sit above the stack, not instead of it.",
  layers = [
    { label: "Your stack", body: "Ad platforms, analytics, CRM, search: connected read-only over secure APIs, with up to a year of history synced at onboarding." },
    { label: "Alfred Core", body: "The shared memory layer: every signal, decision, and outcome, and what caused what. Isolated per customer, never trained across customers.", emphasis: true },
    { label: "Reasoning", body: "Continuous correlation across channels, spend, and funnel stages, 24 hours a day." },
    { label: "You", body: "A daily brief, on-demand answers, proactive flags, and one-step execution on your command." },
  ],
  caption = "Data flows up, decisions flow down, and everything I do is logged.",
}) {
  /* layers arrive bottom-up; the diagram reads top-down, "You" first */
  const ordered = [...layers].reverse();
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({
        paddingBlock: "96px 104px",
        display: "grid", gridTemplateColumns: "minmax(0, 0.95fr) minmax(0, 1.05fr)",
        gap: 64, alignItems: "center",
      })}>
        <div>
          <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
          <h2 style={{ ...libDisplay(38), marginBlockStart: 18 }}>{headline}</h2>
          <p style={{ ...libSub, maxWidth: 440, marginBlockStart: 16 }}>{sub}</p>
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "stretch", gap: 0 }}>
            {ordered.map((l, i) => {
              const inner = (
                <div style={{
                  background: "var(--surface-card)",
                  borderRadius: l.emphasis ? "calc(var(--radius-lg) - 1px)" : "var(--radius-lg)",
                  paddingBlock: 16, paddingInline: 20,
                }}>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)", marginBlockEnd: 4 }}>{l.label}</div>
                  <p style={libBody}>{l.body}</p>
                </div>
              );
              return (
                <React.Fragment key={i}>
                  {i > 0 ? (
                    <div style={{ display: "flex", justifyContent: "center", paddingBlock: 6, color: "var(--text-muted)" }}>{libFlowGlyph}</div>
                  ) : null}
                  {l.emphasis ? (
                    /* the section's one gradient element: a 1px brand ring on the memory layer */
                    <div style={{ background: "var(--gradient-brand)", borderRadius: "var(--radius-lg)", padding: 1, boxShadow: "var(--elevation-raised)" }}>{inner}</div>
                  ) : (
                    <div style={{ border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", boxShadow: "var(--elevation-surface)" }}>{inner}</div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
          {caption ? <p style={{ ...libCaption, textAlign: "center", marginBlockStart: 16 }}>{caption}</p> : null}
        </div>
      </div>
    </section>
  );
}

/* :: dashboard-demo · the live brief as the section centerpiece :: */
function LibDashboardDemo({
  eyebrow = "See it",
  headline = "This is what your Monday looks like",
  sub = "A live look at the brief: what changed, why it changed, what to do about it.",
  statusLabel = "All clear",
  statusNote = "Refreshed Monday, 8:02 AM",
  screenshotAlt = "The Alfred for Marketing brief with three flagged actions",
  callouts = [
    { label: "Ranked by impact", body: "The top card is the one that moves the P&L most." },
    { label: "Cause, not just symptom", body: "Every flag names what drove the change." },
    { label: "One-step action", body: "Approve and I stage the change in the connected tool." },
  ],
  ctaLabel = "Explore the product",
}) {
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "var(--glow-periwinkle), var(--bg-page)" }}>
      <div style={libContainer({ paddingBlock: "96px 104px" })}>
        <LibSectionHead eyebrow={eyebrow} headline={headline} sub={sub} />
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10, marginBlockStart: 32 }}>
          <Badge tone="success" dot>{statusLabel}</Badge>
          <span style={libCaption}>{statusNote}</span>
        </div>
        <figure style={{ margin: 0, marginBlockStart: 16, marginInline: "auto", maxWidth: 900 }}>
          <DashboardMock />
          {screenshotAlt ? <figcaption style={{ ...libCaption, textAlign: "center", marginBlockStart: 12 }}>{screenshotAlt}</figcaption> : null}
        </figure>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 16, marginBlockStart: 44, marginInline: "auto", maxWidth: 900 }}>
          {callouts.map((c, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", minWidth: 0 }}>
              <span aria-hidden="true" style={{
                flexShrink: 0, width: 26, height: 26, borderRadius: "var(--radius-circle)",
                background: "var(--accent-soft)", color: "var(--text-on-tint-brand)",
                display: "grid", placeItems: "center",
                fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", fontWeight: "var(--fw-bold)",
              }}>{i + 1}</span>
              <div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)", marginBlockEnd: 4 }}>{c.label}</div>
                <p style={libBody}>{c.body}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginBlockStart: 40 }}>
          <Button variant="primary" size="lg">{ctaLabel}</Button>
        </div>
      </div>
    </section>
  );
}

/* :: numbered-chapters · a feature page as a linear argument :: */
function LibNumberedChapters({
  eyebrow = "The argument",
  headline = "Why decisions, not data, are the bottleneck",
  sub = "Four chapters, one claim: the team that corrects fastest wins the quarter.",
  chapters = [
    { number: "01", title: "The stack grew, the clarity didn't", body: "Growth-stage teams run 5 to 15 tools that don't talk to each other in plain language. More data, same decisions." },
    { number: "02", title: "Dashboards show symptoms, not causes", body: "A chart can show the drop. It cannot tell you whether the cause is creative fatigue, a tracking error, or a competitor." },
    { number: "03", title: "Speed of correction wins", body: "The decisive variable is no longer launch quality, it's how fast you correct. Days versus minutes compounds every quarter." },
    { number: "04", title: "Memory is the moat", body: "Every decision and outcome I record makes the next recommendation sharper. That compounding belongs to your organisation." },
  ],
  ctaLabel = "Read the full argument",
}) {
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({
        paddingBlock: "96px 104px",
        display: "grid", gridTemplateColumns: "minmax(0, 0.9fr) minmax(0, 1.1fr)",
        gap: 72, alignItems: "start",
      })}>
        <div style={{ position: "sticky", insetBlockStart: 32 }}>
          <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
          <h2 style={{ ...libDisplay(40), marginBlockStart: 18 }}>{headline}</h2>
          {sub ? <p style={{ ...libSub, maxWidth: 400, marginBlockStart: 16 }}>{sub}</p> : null}
          <div style={{ marginBlockStart: 28 }}>
            <Button variant="outline" size="md" style={libGhostCta}>{ctaLabel}</Button>
          </div>
        </div>
        <div>
          {chapters.map((c, i) => (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "76px minmax(0, 1fr)", gap: 24,
              paddingBlockStart: i === 0 ? 0 : 28, paddingBlockEnd: 28,
              borderBlockEnd: i === chapters.length - 1 ? "none" : "1px solid var(--border-subtle)",
            }}>
              <div aria-hidden="true" style={{ ...libDisplay(42), lineHeight: 1, color: "var(--text-muted)" }}>{c.number}</div>
              <div>
                <h3 style={{ ...libDisplay(22), lineHeight: 1.25 }}>{c.title}</h3>
                <p style={{ ...libSub, fontSize: "var(--text-base)", marginBlockStart: 10 }}>{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* :: inline-video · the product film as its own full-width moment :: */
function LibInlineVideo({
  eyebrow = "The film",
  headline = "A full week with me, in under four minutes",
  sub = "The Monday brief, a mid-week correction, and the Friday review at Meridian, exactly as they run. No storyboard, just the product.",
  posterTitle = "Alfred for Marketing: the week at Meridian",
  posterNote = "Recorded in the product, uncut",
  duration = "3:47",
  finePrint = "No form in front of it. Press play.",
}) {
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({ paddingBlock: "96px 104px" })}>
        <LibSectionHead eyebrow={eyebrow} headline={headline} sub={sub} />
        <div style={{
          position: "relative", aspectRatio: "16 / 9", maxWidth: 960,
          marginBlockStart: 44, marginInline: "auto",
          background: "var(--surface-sunken)", border: "1px solid var(--border-subtle)",
          borderRadius: "var(--radius-3xl)", overflow: "hidden",
          boxShadow: "var(--elevation-raised)",
        }}>
          <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
            {/* the section's one gradient element: the play control */}
            <button type="button" aria-label={"Play the film, " + duration} style={{
              width: 76, height: 76, borderRadius: "var(--radius-circle)", border: "none",
              background: "var(--gradient-brand)", color: "var(--text-on-brand)",
              display: "grid", placeItems: "center", cursor: "pointer",
              boxShadow: "var(--elevation-floating)",
            }}>
              {libPlayGlyph}
            </button>
          </div>
          <div style={{
            position: "absolute", insetBlockEnd: 0, insetInlineStart: 0, insetInlineEnd: 0,
            display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 16,
            paddingBlock: 20, paddingInline: 24,
          }}>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)", marginBlockEnd: 3 }}>{posterTitle}</div>
              <div style={libCaption}>{posterNote}</div>
            </div>
            <span style={{
              ...libCaption, color: "var(--text-secondary)", flexShrink: 0,
              paddingBlock: 4, paddingInline: 12, borderRadius: "var(--radius-pill)",
              border: "1px solid var(--border-subtle)", background: "var(--surface-card)",
            }}>{duration}</span>
          </div>
        </div>
        {finePrint ? <p style={{ ...libCaption, textAlign: "center", marginBlockStart: 16 }}>{finePrint}</p> : null}
      </div>
    </section>
  );
}

window.LibPersonaTiles = LibPersonaTiles;
window.LibTabbedUseCases = LibTabbedUseCases;
window.LibIntegrationsGrid2 = LibIntegrationsGrid2;
window.LibArchitectureDiagram = LibArchitectureDiagram;
window.LibDashboardDemo = LibDashboardDemo;
window.LibNumberedChapters = LibNumberedChapters;
window.LibInlineVideo = LibInlineVideo;
