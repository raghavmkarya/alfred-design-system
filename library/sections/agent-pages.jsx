/* ============================================================
   Alfred — Inspiration Library · AGENT PAGES.
   The enrichlabs.ai SUBPAGE patterns, translated: the agent detail
   template (first-person profile hero, old-way/new-way), the SEO
   pillar openers (definition block, entity comparison table), and
   the growth surfaces (tools hub grid, directory hub, affiliate
   deal, cross-sell grid). Anatomy and copy formulas borrowed;
   every word and visual re-authored in Alfred's register with
   fictional entities. enrichlabs.ai lives only in usedBy.
   ============================================================ */
const {
  EyebrowBadge, Button, Badge, Chip, Table,
} = window.AlfredAIDesignSystem_1ce241;

const libContainer = (extra) => ({
  maxWidth: 1120, marginInline: "auto", paddingInline: 40, ...extra,
});
const libDisplay = (size) => ({
  fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)",
  fontSize: size, lineHeight: 1.06, letterSpacing: "-0.02em",
  color: "var(--text-display)", margin: 0,
});
const libSub = {
  fontFamily: "var(--font-sans)", fontSize: "var(--text-lg)",
  color: "var(--text-secondary)", lineHeight: "var(--lh-relaxed)", margin: 0,
};
const libBody = {
  fontFamily: "var(--font-sans)", fontSize: "var(--text-base)",
  color: "var(--text-secondary)", lineHeight: "var(--lh-relaxed)", margin: 0,
};
const libMonoCaps = (extra) => ({
  fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: "var(--fw-medium)",
  letterSpacing: "var(--ls-caps)", textTransform: "uppercase",
  color: "var(--text-muted)", ...extra,
});
const libGhostCta = { background: "transparent", color: "var(--text-primary)", borderColor: "var(--border-default)" };
const LibGradientText = ({ children }) => (
  <span style={{ background: "var(--gradient-brand)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>{children}</span>
);
const libAccent = (title, accent) => (accent && title.includes(accent)) ? (
  <>
    {title.slice(0, title.indexOf(accent))}
    <LibGradientText>{accent}</LibGradientText>
    {title.slice(title.indexOf(accent) + accent.length)}
  </>
) : title;
const libCard = {
  background: "var(--surface-card)", border: "1px solid var(--border-subtle)",
  borderRadius: "var(--radius-xl)",
};
const LibHead = ({ eyebrow, title, titleAccent, sub, maxSub = 620 }) => (
  <div style={{ textAlign: "center" }}>
    <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
    <h2 style={{ ...libDisplay(42), maxWidth: 760, marginInline: "auto", marginBlockStart: 18 }}>{libAccent(title, titleAccent)}</h2>
    {sub ? <p style={{ ...libSub, maxWidth: maxSub, marginInline: "auto", marginBlockStart: 16 }}>{sub}</p> : null}
  </div>
);

/* —— agent-profile-hero · "Hi, I'm <Name>, your <role>" ——— */
function LibAgentProfileHero({
  greeting = "Hi, I'm Alfred for Marketing",
  title = "Your marketing, briefed and moved daily",
  titleAccent = null, /* the persona tile carries this section's one gradient element */
  sub = "I read your channels overnight, draft the day's moves with the reasoning attached, and execute the ones you approve. Three functions, one desk: briefing, reallocation, follow-through.",
  cta = "Put me on your marketing",
  secondaryCta = "See a sample brief",
  initial = "M",
  roleChips = ["Daily brief", "Budget moves", "Creative watch", "Pipeline answers"],
  worksWith = ["Google Ads", "Meta Ads", "GA4", "HubSpot", "Slack"],
}) {
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "var(--glow-periwinkle), var(--bg-page)" }}>
      <div style={libContainer({
        paddingBlock: "96px 88px",
        display: "grid", gridTemplateColumns: "minmax(0, 1.15fr) minmax(0, 0.85fr)",
        gap: 56, alignItems: "center",
      })}>
        <div>
          <p style={{ ...libMonoCaps({ color: "var(--text-secondary)" }), margin: 0 }}>{greeting}</p>
          <h1 style={{ ...libDisplay(52), marginBlockStart: 16 }}>{libAccent(title, titleAccent)}</h1>
          <p style={{ ...libSub, maxWidth: 520, marginBlockStart: 20 }}>{sub}</p>
          <div style={{ display: "flex", gap: 12, marginBlockStart: 30, flexWrap: "wrap" }}>
            <Button variant="primary" size="lg">{cta}</Button>
            <Button variant="outline" size="lg" style={libGhostCta}>{secondaryCta}</Button>
          </div>
          <div style={{ display: "flex", gap: 8, marginBlockStart: 28, flexWrap: "wrap" }}>
            {roleChips.map((c) => <Chip key={c}>{c}</Chip>)}
          </div>
        </div>
        {/* persona tile: the module's initial on the one gradient element */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
          <div aria-hidden="true" style={{
            inlineSize: "min(240px, 60%)", aspectRatio: "1", borderRadius: "var(--radius-3xl)",
            background: "var(--gradient-brand)", display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "var(--elevation-floating)",
          }}>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)", fontSize: 96, color: "var(--text-on-brand)" }}>{initial}</span>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={libMonoCaps({})}>Works with</div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-secondary)", margin: 0, marginBlockStart: 6 }}>{worksWith.join(" · ")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* —— old-way-new-way · the agent-detail before/after ——— */
const LIB_OLD_NEW = [
  {
    old: "Monday starts with five dashboards and a hunch about which number matters.",
    now: "Monday starts with my brief: what moved, why, and the one change worth making.",
  },
  {
    old: "The reallocation waits a week for the agency call to confirm what you suspected.",
    now: "I draft the reallocation the morning the signal clears, and you approve it before lunch.",
  },
  {
    old: "Creative fatigue shows up in the quarterly review, after the spend is gone.",
    now: "I flag fatigue the week it starts, with the refresh already queued.",
  },
];
function LibOldWayNewWay({
  eyebrow = "Why this works",
  title = "The old way ran on hunches",
  titleAccent = "hunches",
  sub = "Same team, same budget, different operating loop.",
  rows = LIB_OLD_NEW, /* Array<{old, now}> */
  oldLabel = "The old way",
  nowLabel = "With me on the desk",
}) {
  return (
    <section style={{ background: "var(--surface-sunken)", borderBlock: "1px solid var(--border-subtle)" }}>
      <div style={libContainer({ paddingBlock: "88px 88px" })}>
        <LibHead eyebrow={eyebrow} title={title} titleAccent={titleAccent} sub={sub} />
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBlockStart: 44, maxWidth: 880, marginInline: "auto" }}>
          {rows.map((r, i) => (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))", gap: 16,
            }}>
              <div style={{ ...libCard, borderRadius: "var(--radius-lg)", padding: 20 }}>
                <div style={libMonoCaps({})}>{oldLabel}</div>
                <p style={{ ...libBody, color: "var(--text-muted)", marginBlockStart: 8 }}>{r.old}</p>
              </div>
              <div style={{ ...libCard, borderRadius: "var(--radius-lg)", padding: 20, borderColor: "var(--border-default)" }}>
                <div style={libMonoCaps({ color: "var(--text-on-tint-brand)" })}>{nowLabel}</div>
                <p style={{ ...libBody, color: "var(--text-primary)", marginBlockStart: 8 }}>{r.now}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* —— definition-pillar · the SEO pillar opener ——— */
function LibDefinitionPillar({
  eyebrow = "Plain language",
  term = "Decision intelligence",
  definition = "Decision intelligence is software that sits between your data and your decisions: it detects what changed, explains why, and recommends what to do next. Where a dashboard shows numbers and an assistant answers prompts, decision intelligence carries the question through to an approved, executed change.",
  citation = "Ridgeline Research, The Decision Intelligence Landscape, 2026",
  toc = ["What it is", "Versus dashboards", "Versus assistants", "What it runs", "First 30 days", "Questions"],
  tocLabel = "On this page",
}) {
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({ paddingBlock: "88px 72px", maxWidth: 880 })}>
        <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
        <h1 style={{ ...libDisplay(44), marginBlockStart: 18 }}>{"What is " + term.toLowerCase() + "?"}</h1>
        {/* the answer-first definition block, quotable by answer engines */}
        <div style={{
          ...libCard, borderRadius: "var(--radius-lg)", padding: 26, marginBlockStart: 26,
          borderInlineStart: "3px solid var(--accent)",
        }}>
          <p style={{ ...libBody, fontSize: "var(--text-lg)", color: "var(--text-primary)", lineHeight: "var(--lh-relaxed)" }}>{definition}</p>
          <p style={{ ...libMonoCaps({}), marginBlockStart: 14, marginBlockEnd: 0 }}>{citation} · fictional analyst, illustrative</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBlockStart: 24, flexWrap: "wrap" }}>
          <span style={libMonoCaps({})}>{tocLabel}</span>
          {toc.map((t) => <Chip key={t}>{t}</Chip>)}
        </div>
      </div>
    </section>
  );
}

/* —— entity-compare-table · agent vs assistant vs automation ——— */
const LIB_ENTITY_COLS = ["Dashboards", "Chat assistants", "Alfred"];
const LIB_ENTITY_ROWS = [
  { dim: "What it does with a question", cells: ["Shows the chart", "Answers when asked", "Raises it before you ask"] },
  { dim: "Where the work ends", cells: ["At the number", "At the answer", "At the approved change"] },
  { dim: "Memory between sessions", cells: ["None", "Thin", "Every signal, decision, outcome"] },
  { dim: "Who does the follow-through", cells: ["You", "You", "Me, after your sign-off"] },
  { dim: "Audit trail", cells: ["Screenshots", "Chat scrollback", "Logged, attributable, replayable"] },
];
function LibEntityCompareTable({
  eyebrow = "The category, compared",
  title = "Not a dashboard. Not a chatbot.",
  sub = "Three tools that sound alike and end in different places.",
  columns = LIB_ENTITY_COLS,
  rows = LIB_ENTITY_ROWS, /* Array<{dim, cells}> — last column is highlighted */
}) {
  const last = columns.length - 1;
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({ paddingBlock: "88px 88px", maxWidth: 980 })}>
        <LibHead eyebrow={eyebrow} title={title} sub={sub} />
        <div dir="ltr" style={{ ...libCard, overflow: "hidden", marginBlockStart: 44 }}>
          <div style={{ display: "grid", gridTemplateColumns: `1.2fr repeat(${columns.length}, minmax(0, 1fr))` }}>
            <div style={{ padding: "14px 18px", borderBlockEnd: "1px solid var(--border-subtle)" }} />
            {columns.map((c, i) => (
              <div key={c} style={{
                padding: "14px 18px", borderBlockEnd: "1px solid var(--border-subtle)",
                background: i === last ? "var(--accent-soft)" : "transparent",
                fontFamily: "var(--font-sans)", fontWeight: "var(--fw-bold)", fontSize: "var(--text-sm)",
                color: i === last ? "var(--text-on-tint-brand)" : "var(--text-primary)",
              }}>{c}</div>
            ))}
            {rows.map((r, ri) => (
              <React.Fragment key={ri}>
                <div style={{
                  padding: "13px 18px", borderBlockEnd: ri === rows.length - 1 ? "none" : "1px solid var(--border-subtle)",
                  fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "var(--ls-caps)", textTransform: "uppercase", color: "var(--text-muted)",
                }}>{r.dim}</div>
                {r.cells.map((cell, ci) => (
                  <div key={ci} style={{
                    padding: "13px 18px", borderBlockEnd: ri === rows.length - 1 ? "none" : "1px solid var(--border-subtle)",
                    background: ci === last ? "var(--accent-soft)" : "transparent",
                    fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)",
                    color: ci === last ? "var(--text-on-tint-brand)" : "var(--text-secondary)",
                    fontWeight: ci === last ? "var(--fw-medium)" : "var(--fw-regular)",
                  }}>{cell}</div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* —— tool-card-grid · the free-tools hub ——— */
const LIB_TOOLS = [
  { name: "Budget reallocation checker", cat: "Spend", line: "Paste four weekly numbers and see whether a move is due." },
  { name: "CAC drift explainer", cat: "Diagnosis", line: "Answer five questions and get the three likeliest causes, ranked." },
  { name: "Brief-worthiness scorer", cat: "Reporting", line: "Score a metric on whether it deserves a leader's morning." },
  { name: "Creative fatigue estimator", cat: "Creative", line: "Estimate weeks of life left in an ad set from its frequency curve." },
  { name: "Channel mix sanity check", cat: "Spend", line: "See how your split compares with the panel's stage medians." },
  { name: "Decision latency audit", cat: "Process", line: "Time your loop from question to shipped change in one worksheet." },
];
function LibToolCardGrid({
  eyebrow = "Free tools",
  title = "Useful before you ever talk to me",
  sub = "Small, sharp calculators from the playbooks I run. No signup for any of them.",
  filters = ["All", "Spend", "Diagnosis", "Creative", "Reporting", "Process"],
  tools = LIB_TOOLS, /* Array<{name, cat, line}> */
  countLabel = "6 tools · all free",
}) {
  const [active, setActive] = React.useState("All");
  const shown = tools.filter((t) => active === "All" || t.cat === active);
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({ paddingBlock: "88px 88px" })}>
        <LibHead eyebrow={eyebrow} title={title} sub={sub} />
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, marginBlockStart: 32, flexWrap: "wrap" }}>
          {filters.map((f) => (
            <Chip key={f} selected={f === active} onClick={() => setActive(f)}>{f}</Chip>
          ))}
          <span style={libMonoCaps({ marginInlineStart: 8 })}>{countLabel}</span>
        </div>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))",
          gap: 18, marginBlockStart: 36,
        }}>
          {shown.map((t) => (
            <a key={t.name} href="#" onClick={(e) => e.preventDefault()} style={{
              ...libCard, borderRadius: "var(--radius-lg)", padding: 20, textDecoration: "none", display: "block", minWidth: 0,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "flex-start" }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", fontWeight: "var(--fw-bold)", color: "var(--text-link)", minWidth: 0 }}>{t.name}</span>
                <Badge tone="neutral">{t.cat}</Badge>
              </div>
              <p style={{ ...libBody, fontSize: "var(--text-sm)", marginBlockStart: 8 }}>{t.line}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* —— directory-hub · the programmatic browse hub ——— */
const LIB_DIR_GROUPS = [
  { label: "By function", cards: [
    { name: "Budget and spend", count: 34 }, { name: "Lifecycle and email", count: 27 },
    { name: "Creative operations", count: 22 }, { name: "Pipeline and CRM", count: 31 },
  ] },
  { label: "By stage", cards: [
    { name: "Seed", count: 18 }, { name: "Growth", count: 41 }, { name: "Scale", count: 26 },
  ] },
];
function LibDirectoryHub({
  eyebrow = "The playbook directory",
  title = "114 playbooks, browsable two ways",
  titleAccent = "114",
  sub = "Every playbook I run, indexed by the function it serves and the stage it fits. Each one opens with the trigger, the thresholds and the worked example.",
  groups = LIB_DIR_GROUPS, /* Array<{label, cards: {name, count}[]}> */
  counterQuote = "“We stopped paying a retainer for exactly this list. Alfred runs it instead.”",
  counterAttrib = "Operator at the fictional Meridian",
}) {
  return (
    <section style={{ background: "var(--surface-sunken)", borderBlock: "1px solid var(--border-subtle)" }}>
      <div style={libContainer({ paddingBlock: "88px 88px" })}>
        <LibHead eyebrow={eyebrow} title={title} titleAccent={titleAccent} sub={sub} />
        <div style={{ display: "flex", flexDirection: "column", gap: 34, marginBlockStart: 44 }}>
          {groups.map((g) => (
            <div key={g.label}>
              <div style={libMonoCaps({ marginBlockEnd: 12 })}>{g.label}</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(240px, 100%), 1fr))", gap: 14 }}>
                {g.cards.map((c) => (
                  <a key={c.name} href="#" onClick={(e) => e.preventDefault()} style={{
                    ...libCard, borderRadius: "var(--radius-lg)", padding: 18, textDecoration: "none",
                    display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, minWidth: 0,
                  }}>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", fontWeight: "var(--fw-medium)", color: "var(--text-primary)", minWidth: 0 }}>{c.name}</span>
                    <Badge tone="neutral">{c.count}</Badge>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ maxWidth: 640, marginInline: "auto", marginBlockStart: 44, textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-lg)", color: "var(--text-primary)", lineHeight: "var(--lh-relaxed)", margin: 0 }}>{counterQuote}</p>
          <p style={{ ...libMonoCaps({}), marginBlockStart: 10, marginBlockEnd: 0 }}>{counterAttrib}</p>
        </div>
      </div>
    </section>
  );
}

/* —— affiliate-deal · the partner-referral economics band ——— */
function LibAffiliateDeal({
  eyebrow = "Refer and earn",
  title = "25% recurring, for the life of the account",
  titleAccent = "25%",
  sub = "Send an operator my way. If they stay, you earn a quarter of their subscription every month they do, with a 90-day window and no cap.",
  audiences = ["Operator newsletters", "Marketing communities", "Fractional CMOs", "Course creators"],
  mathLabel = "The worked example",
  mathRows = [
    { label: "Referrals that convert", value: "5 accounts" },
    { label: "Their plan", value: "$499 / month" },
    { label: "Your share", value: "25% recurring" },
    { label: "Your year", value: "$7,485" },
  ],
  cta = "Become a partner",
  secondaryCta = "Read the terms",
  footnote = "Illustrative economics on the fictional Growth plan.",
}) {
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({
        paddingBlock: "88px 88px",
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(360px, 100%), 1fr))",
        gap: 56, alignItems: "center",
      })}>
        <div>
          <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
          <h2 style={{ ...libDisplay(44), marginBlockStart: 18 }}>{libAccent(title, titleAccent)}</h2>
          <p style={{ ...libSub, maxWidth: 480, marginBlockStart: 16 }}>{sub}</p>
          <div style={{ display: "flex", gap: 8, marginBlockStart: 24, flexWrap: "wrap" }}>
            {audiences.map((a) => <Chip key={a}>{a}</Chip>)}
          </div>
          <div style={{ display: "flex", gap: 12, marginBlockStart: 30, flexWrap: "wrap" }}>
            <Button variant="primary" size="lg">{cta}</Button>
            <Button variant="outline" size="lg" style={libGhostCta}>{secondaryCta}</Button>
          </div>
        </div>
        <div dir="ltr" style={{ ...libCard, padding: 26 }}>
          <div style={libMonoCaps({})}>{mathLabel}</div>
          <div style={{ display: "flex", flexDirection: "column", marginBlockStart: 14 }}>
            {mathRows.map((r, i) => (
              <div key={r.label} style={{
                display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 14,
                paddingBlock: 12, borderBlockStart: i === 0 ? "none" : "1px solid var(--border-subtle)",
              }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}>{r.label}</span>
                <span style={{
                  fontFamily: i === mathRows.length - 1 ? "var(--font-display)" : "var(--font-mono)",
                  fontSize: i === mathRows.length - 1 ? 28 : 13,
                  fontWeight: "var(--fw-semibold)", color: "var(--text-primary)", flexShrink: 0,
                }}>{r.value}</span>
              </div>
            ))}
          </div>
          <p style={{ ...libMonoCaps({}), marginBlockStart: 14, marginBlockEnd: 0 }}>{footnote}</p>
        </div>
      </div>
    </section>
  );
}

/* —— cross-sell-grid · the compact end-of-page module grid ——— */
const LIB_CROSS = [
  { initial: "M", name: "Alfred for Marketing", line: "Live today", live: true },
  { initial: "S", name: "Alfred for Sales", line: "Waitlist open" },
  { initial: "R", name: "Alfred for Receivables", line: "Waitlist open" },
  { initial: "C", name: "Alfred Core", line: "The shared memory" },
];
function LibCrossSellGrid({
  title = "One memory, more desks",
  sub = "Every module briefs from the same organisational memory. Start where the pain is loudest.",
  modules = LIB_CROSS, /* Array<{initial, name, line, live?}> */
  linkLabel = "Learn more",
}) {
  return (
    <section style={{ background: "var(--surface-sunken)", borderBlock: "1px solid var(--border-subtle)" }}>
      <div style={libContainer({ paddingBlock: "64px 64px" })}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 20, flexWrap: "wrap" }}>
          <h2 style={{ ...libDisplay(28), margin: 0 }}>{title}</h2>
          <p style={{ ...libBody, fontSize: "var(--text-sm)", maxWidth: 380 }}>{sub}</p>
        </div>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(220px, 100%), 1fr))",
          gap: 14, marginBlockStart: 26,
        }}>
          {modules.map((m) => (
            <div key={m.name} style={{
              ...libCard, borderRadius: "var(--radius-lg)", padding: 16,
              display: "flex", alignItems: "center", gap: 12, minWidth: 0,
              borderColor: m.live ? "var(--border-default)" : "var(--border-subtle)",
            }}>
              <span aria-hidden="true" style={{
                inlineSize: 38, blockSize: 38, borderRadius: "var(--radius-md)", flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: m.live ? "var(--gradient-brand)" : "var(--surface-sunken)",
                color: m.live ? "var(--text-on-brand)" : "var(--text-secondary)",
                fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)", fontSize: 18,
              }}>{m.initial}</span>
              <span style={{ minWidth: 0 }}>
                <span style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)" }}>{m.name}</span>
                <span style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: m.live ? "var(--text-on-tint-brand)" : "var(--text-muted)", marginBlockStart: 2 }}>{m.line}</span>
              </span>
              <a href="#" onClick={(e) => e.preventDefault()} style={{
                marginInlineStart: "auto", flexShrink: 0,
                fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", fontWeight: "var(--fw-bold)",
                color: "var(--text-link)", textDecoration: "none",
              }}>{linkLabel}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

window.LibAgentProfileHero = LibAgentProfileHero;
window.LibOldWayNewWay = LibOldWayNewWay;
window.LibDefinitionPillar = LibDefinitionPillar;
window.LibEntityCompareTable = LibEntityCompareTable;
window.LibToolCardGrid = LibToolCardGrid;
window.LibDirectoryHub = LibDirectoryHub;
window.LibAffiliateDeal = LibAffiliateDeal;
window.LibCrossSellGrid = LibCrossSellGrid;
