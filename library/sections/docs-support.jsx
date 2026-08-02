/* ============================================================
   Alfred - Inspiration Library · DOCS AND SUPPORT.
   Four docs / support / status patterns distilled from the
   competitor sweep (docs-hub landings, status strips, developer
   proof bands, help-center entries), rebuilt on design-system
   tokens so they render truthfully in light and in
   data-theme="dark". Every component ships complete default
   copy: a bare <LibDocsHub /> is a finished section.
   Compiled to a committed .js twin by scripts/build-kits.mjs;
   catalogued in library/meta/docs-support.json.
   ============================================================ */
const {
  EyebrowBadge, Button, Badge, Kbd, SearchInput,
} = window.AlfredAIDesignSystem_1ce241;

const libContainer = (extra) => ({
  maxWidth: 1120, marginInline: "auto", paddingInline: 40, ...extra,
});
const libDisplay = (size) => ({
  fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)",
  fontSize: size, lineHeight: 1.08, letterSpacing: "-0.02em",
  color: "var(--text-primary)", margin: 0,
});
const libSub = {
  fontFamily: "var(--font-sans)", fontSize: "var(--text-lg)",
  color: "var(--text-secondary)", lineHeight: "var(--lh-relaxed)", margin: 0,
};
const libBody = {
  fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)",
  color: "var(--text-secondary)", lineHeight: "var(--lh-normal)", margin: 0,
};
const libFine = {
  fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)",
  color: "var(--text-muted)", lineHeight: "var(--lh-normal)", margin: 0,
};
const libCard = {
  background: "var(--surface-card)", border: "1px solid var(--border-subtle)",
  borderRadius: "var(--radius-2xl)", boxShadow: "var(--elevation-surface)",
};
const libGhostCta = { background: "transparent", color: "var(--text-primary)", borderColor: "var(--border-default)" };
const libEyebrowLabel = {
  fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", fontWeight: "var(--fw-bold)",
  color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em",
};
const libReadLink = {
  display: "inline-flex", alignItems: "center", gap: 6,
  fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-semibold)",
  color: "var(--text-link)",
};
/* Small single-color glyphs, tinted by currentColor like the icon set. */
const libGlyph = (path, size = 16, sw = 2) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>{path}</svg>
);
const libArrowGlyph = (size = 15) => (
  /* trailing "go" arrow; mirrored under RTL by the flip sign */
  <span aria-hidden="true" style={{ display: "inline-flex", transform: "scaleX(var(--flip))" }}>
    {libGlyph(<><path d="M4 12h15" /><path d="M13 6l6 6-6 6" /></>, size)}
  </span>
);
const libClockGlyph = libGlyph(<><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2.2" /></>, 14, 1.8);
const libCategoryGlyphs = {
  bolt: libGlyph(<path d="M12.8 3L5.5 13.2h5L10.9 21l7.6-10.4h-5.2z" />, 19, 1.8),
  plug: libGlyph(<><path d="M9.2 3.5v3.7M14.8 3.5v3.7" /><path d="M7.2 7.2h9.6v3.4a4.8 4.8 0 0 1-9.6 0z" /><path d="M12 15.4v5.1" /></>, 19, 1.8),
  sliders: libGlyph(<><path d="M4.5 8h15M4.5 16h15" /><circle cx="9.5" cy="8" r="2.3" /><circle cx="14.5" cy="16" r="2.3" /></>, 19, 1.8),
  book: libGlyph(<><path d="M4.5 5.4A2.4 2.4 0 0 1 6.9 3h12.6v15.6H6.9a2.4 2.4 0 0 0-2.4 2.4z" /><path d="M8.5 7.5h7M8.5 11h5" /></>, 19, 1.8),
  spark: libGlyph(<path d="M12 3.5c.7 4.4 3.4 7.1 7.8 7.8-4.4.7-7.1 3.4-7.8 7.8-.7-4.4-3.4-7.1-7.8-7.8 4.4-.7 7.1-3.4 7.8-7.8z" />, 19, 1.8),
  person: libGlyph(<><circle cx="12" cy="8" r="3.5" /><path d="M5 20c.8-3.5 3.6-5.5 7-5.5s6.2 2 7 5.5" /></>, 19, 1.8),
};
const libIconChip = {
  flexShrink: 0, width: 40, height: 40, borderRadius: "var(--radius-lg)",
  background: "var(--accent-soft)", color: "var(--text-on-tint-brand)",
  display: "grid", placeItems: "center",
};
const libPill = {
  display: "inline-flex", alignItems: "center", gap: 7, paddingInline: 14, paddingBlock: 6,
  borderRadius: "var(--radius-pill)", border: "1px solid var(--border-subtle)",
  background: "var(--surface-card)", fontFamily: "var(--font-sans)",
  fontSize: "var(--text-sm)", color: "var(--text-secondary)",
};
/* Fixed status vocabulary: operational / degraded / outage, never per-incident inventions. */
const libStatusColor = { operational: "var(--success-500)", degraded: "var(--warning-500)", outage: "var(--danger-500)" };
const libStatusSoft = { operational: "var(--success-100)", degraded: "var(--warning-100)", outage: "var(--danger-100)" };
const libStatusDot = (status, size = 8) => (
  <span aria-hidden="true" style={{
    flexShrink: 0, width: size, height: size, borderRadius: "var(--radius-circle)",
    background: libStatusColor[status] || libStatusColor.operational,
  }} />
);

/* ==== docs-hub · the front door of the help center ==== */
function LibDocsHub({
  eyebrow = "Docs",
  heading = "Everything I know, written down",
  sub = "Setup guides, playbooks and reference for getting the most out of me.",
  searchPlaceholder = "Search the docs, e.g. connect Meridian data",
  searchHintKey = "/",
  popularLabel = "Start here",
  popular = [
    "Connect your first data source",
    "Read your first briefing",
    "Invite your team",
    "Set approval thresholds",
  ],
  categories = [
    { glyph: "bolt", title: "Get started", sub: "Connect your data and get your first briefing in under 10 minutes.", count: "8 articles" },
    { glyph: "plug", title: "Connect your stack", sub: "Every connector, from ad platforms to CRM, with setup steps and sync limits.", count: "17 articles" },
    { glyph: "sliders", title: "Manage your workspace", sub: "Teams, permissions and how I decide what to surface to whom.", count: "12 articles" },
    { glyph: "book", title: "Reference", sub: "Every metric, model and API endpoint, defined precisely.", count: "24 articles" },
  ],
}) {
  const [query, setQuery] = React.useState("");
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "var(--glow-periwinkle), var(--glow-orange), var(--bg-page)" }}>
      <div style={libContainer({ paddingBlock: "96px 96px", textAlign: "center" })}>
        <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
        <h1 style={{ ...libDisplay(52), maxWidth: 720, marginBlockStart: 22, marginInline: "auto" }}>{heading}</h1>
        <p style={{ ...libSub, maxWidth: 540, marginBlockStart: 18, marginInline: "auto" }}>{sub}</p>
        <div style={{ position: "relative", maxWidth: 620, marginInline: "auto", marginBlockStart: 32, textAlign: "start" }}>
          <SearchInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onSubmit={() => {}}
            placeholder={searchPlaceholder}
            style={{ width: "100%" }}
          />
          {searchHintKey ? (
            <span aria-hidden="true" style={{ position: "absolute", insetInlineEnd: 14, insetBlockStart: "50%", transform: "translateY(-50%)", pointerEvents: "none", display: "inline-flex" }}>
              <Kbd size="sm">{searchHintKey}</Kbd>
            </span>
          ) : null}
        </div>
        {popular && popular.length ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap", marginBlockStart: 20 }}>
            <span style={libEyebrowLabel}>{popularLabel}</span>
            {popular.map((p) => (
              <span key={p} style={libPill}>
                {p}
                <span style={{ color: "var(--text-muted)", display: "inline-flex" }}>{libArrowGlyph(12)}</span>
              </span>
            ))}
          </div>
        ) : null}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(240px, 100%), 1fr))", gap: 20, marginBlockStart: 48, textAlign: "start" }}>
          {categories.map((c, i) => (
            <article key={i} style={{ ...libCard, padding: 26, display: "flex", flexDirection: "column", minWidth: 0 }}>
              <span style={libIconChip}>{libCategoryGlyphs[c.glyph] || libCategoryGlyphs.book}</span>
              <h2 style={{ ...libDisplay(19), letterSpacing: "-0.01em", lineHeight: "var(--lh-snug)", marginBlockStart: 16 }}>{c.title}</h2>
              <p style={{ ...libBody, marginBlockStart: 8, flexGrow: 1 }}>{c.sub}</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBlockStart: 18 }}>
                <span style={libFine}>{c.count}</span>
                <span style={{ color: "var(--text-muted)", display: "inline-flex" }}>{libArrowGlyph(14)}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==== status-band · one dot, one sentence, per-service detail ==== */
function LibStatusBand({
  state = "operational", /* "operational" | "incident" */
  message = null, /* defaults per state */
  note = null, /* defaults per state */
  uptimeLine = "99.98% uptime over the last 90 days",
  linkLabel = "View full status history",
  services = null, /* defaults per state; fixed vocabulary: operational | degraded | outage */
}) {
  const incident = state !== "operational";
  const tone = incident ? "degraded" : "operational";
  const msg = message != null ? message : (incident ? "Briefing delivery is running slow for some workspaces." : "All systems operational.");
  const nte = note != null ? note : (incident ? "Next update in 30 minutes." : "I checked 42 seconds ago.");
  const svc = services != null ? services : [
    { name: "Briefings", status: incident ? "degraded" : "operational" },
    { name: "Data connections", status: "operational" },
    { name: "API", status: "operational" },
    { name: "Dashboard", status: "operational" },
  ];
  return (
    <section style={{ background: "var(--bg-page)", borderBlockStart: "1px solid var(--border-subtle)", borderBlockEnd: "1px solid var(--border-subtle)" }}>
      <div style={libContainer({ paddingBlock: "44px 44px" })}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
          <span aria-hidden="true" style={{
            flexShrink: 0, width: 12, height: 12, borderRadius: "var(--radius-circle)",
            background: libStatusColor[tone], boxShadow: "0 0 0 4px " + libStatusSoft[tone],
          }} />
          <p role="status" style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)", margin: 0 }}>
            {msg}
            <span style={{ fontWeight: "var(--fw-regular)", color: "var(--text-muted)", marginInlineStart: 10 }}>{nte}</span>
          </p>
          <span style={{ flexGrow: 1 }} />
          {uptimeLine ? <span style={{ ...libFine, fontSize: "var(--text-sm)" }}>{uptimeLine}</span> : null}
          {linkLabel ? <span style={libReadLink}>{linkLabel}{libArrowGlyph(14)}</span> : null}
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBlockStart: 18 }}>
          {svc.map((s) => (
            <span key={s.name} style={{ ...libPill, paddingBlock: 5 }}>
              {libStatusDot(s.status, 7)}
              {s.name}
              {s.status !== "operational" ? (
                <span style={{ ...libFine, color: "var(--text-on-tint-brand)" }}>{s.status}</span>
              ) : null}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==== developer-proof-band · hard numbers plus a token-built code pane ==== */
const libCodeTone = {
  kw: "var(--text-on-tint-info)",
  str: "var(--text-on-tint-success)",
  fn: "var(--text-link)",
  env: "var(--text-on-tint-brand)",
  cm: "var(--text-muted)",
  pl: "var(--text-body)",
};
const libLine = (...spans) => spans; /* a code line is a list of [tone, text] pairs */
const libDefaultSnippets = {
  typescript: [
    libLine(["kw", "import"], ["pl", " Alfred "], ["kw", "from"], ["str", " \"@alfred/sdk\""], ["pl", ";"]),
    libLine(),
    libLine(["kw", "const"], ["pl", " alfred = "], ["kw", "new"], ["fn", " Alfred"], ["pl", "({ apiKey: "], ["env", "process.env.ALFRED_KEY"], ["pl", " });"]),
    libLine(["kw", "const"], ["pl", " brief = "], ["kw", "await"], ["pl", " alfred.briefings."], ["fn", "latest"], ["pl", "({ workspace: "], ["str", "\"northwind\""], ["pl", " });"]),
    libLine(),
    libLine(["cm", "// this morning's calls, with the reasoning attached"]),
    libLine(["pl", "brief.recommendations."], ["fn", "map"], ["pl", "((m) => m.title);"]),
    libLine(["cm", "// [\"Shift $18K from Search to Performance Max\", ...]"]),
  ],
  python: [
    libLine(["kw", "from"], ["pl", " alfred "], ["kw", "import"], ["pl", " Alfred"]),
    libLine(),
    libLine(["pl", "alfred = "], ["fn", "Alfred"], ["pl", "(api_key="], ["env", "os.environ[\"ALFRED_KEY\"]"], ["pl", ")"]),
    libLine(["pl", "brief = alfred.briefings."], ["fn", "latest"], ["pl", "(workspace="], ["str", "\"northwind\""], ["pl", ")"]),
    libLine(),
    libLine(["cm", "# pipe my calls into your own tooling"]),
    libLine(["kw", "for"], ["pl", " move "], ["kw", "in"], ["pl", " brief.recommendations:"]),
    libLine(["pl", "    "], ["fn", "notify"], ["pl", "("], ["str", "\"#growth\""], ["pl", ", move.title, move.impact)"]),
  ],
  curl: [
    libLine(["cm", "# the latest briefing, straight from the API"]),
    libLine(["fn", "curl"], ["pl", " https://api.seekalfred.ai/v1/briefings/latest \\"]),
    libLine(["pl", "  -H "], ["str", "\"Authorization: Bearer $ALFRED_KEY\""], ["pl", " \\"]),
    libLine(["pl", "  -G -d "], ["env", "workspace=northwind"]),
    libLine(),
    libLine(["cm", "# every endpoint answers in plain JSON"]),
    libLine(["pl", "{ "], ["str", "\"recommendations\""], ["pl", ": [{ "], ["str", "\"title\""], ["pl", ": "], ["str", "\"Shift $18K to PMax\""], ["pl", " }] }"]),
  ],
};
function LibDeveloperProofBand({
  eyebrow = "API",
  heading = "Everything I surface, you can pull",
  sub = "Every briefing, metric and recommendation is available over a REST API. Northwind's team piped my spend alerts into their own tooling in an afternoon.",
  stats = [
    { value: "40+", label: "REST endpoints" },
    { value: "120ms", label: "p95 response time" },
    { value: "99.98%", label: "uptime, last 90 days" },
  ],
  primaryCta = "Read the API reference",
  secondaryCta = "Get an API key",
  sdkLabel = "Official SDKs",
  sdks = ["TypeScript", "Python", "Go", "Ruby", "MCP server"],
  tabs = [
    { id: "typescript", label: "TypeScript" },
    { id: "python", label: "Python" },
    { id: "curl", label: "cURL" },
  ],
  defaultTab = "typescript",
  snippets = libDefaultSnippets,
  paneCaption = "GET /v1/briefings",
  paneFootnote = "Same JSON in the dashboard, the API and the MCP server.",
}) {
  const [active, setActive] = React.useState(defaultTab);
  const lines = snippets[active] || snippets[tabs[0] && tabs[0].id] || [];
  return (
    <section style={{ background: "var(--surface-sunken)", borderBlockStart: "1px solid var(--border-subtle)", borderBlockEnd: "1px solid var(--border-subtle)" }}>
      <div style={libContainer({
        paddingBlock: "96px 104px",
        display: "grid", gridTemplateColumns: "minmax(0, 0.95fr) minmax(0, 1.05fr)",
        gap: 56, alignItems: "center",
      })}>
        <div>
          <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
          <h2 style={{ ...libDisplay(40), marginBlockStart: 18 }}>{heading}</h2>
          <p style={{ ...libSub, maxWidth: 460, marginBlockStart: 16 }}>{sub}</p>
          <div style={{ display: "flex", gap: 36, flexWrap: "wrap", marginBlockStart: 30 }}>
            {stats.map((s, i) => (
              <div key={i}>
                <div style={{ ...libDisplay(30), lineHeight: 1.1 }}>{s.value}</div>
                <div style={{ ...libFine, marginBlockStart: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBlockStart: 30 }}>
            <Button variant="primary" size="md">{primaryCta}</Button>
            <Button variant="outline" size="md" style={libGhostCta}>{secondaryCta}</Button>
          </div>
          {sdks && sdks.length ? (
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBlockStart: 28 }}>
              <span style={libEyebrowLabel}>{sdkLabel}</span>
              {sdks.map((s) => (
                <span key={s} style={{ ...libPill, paddingBlock: 5, fontSize: "var(--text-xs)" }}>{s}</span>
              ))}
            </div>
          ) : null}
        </div>
        <div style={{ ...libCard, boxShadow: "var(--elevation-raised)", overflow: "hidden", minWidth: 0 }}>
          {/* the section's one gradient element: the pane keyline */}
          <div aria-hidden="true" style={{ height: 3, background: "var(--gradient-brand)" }} />
          <div style={{
            display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap",
            paddingBlock: 12, paddingInline: 18,
            borderBlockEnd: "1px solid var(--border-subtle)", background: "var(--surface-sunken)",
          }}>
            <span aria-hidden="true" style={{ display: "inline-flex", gap: 5 }}>
              {[0, 1, 2].map((i) => (
                <span key={i} style={{ width: 8, height: 8, borderRadius: "var(--radius-circle)", background: "var(--border-default)" }} />
              ))}
            </span>
            <span style={{ display: "inline-flex", gap: 4 }}>
              {tabs.map((t) => (
                <button
                  key={t.id} type="button" aria-pressed={active === t.id} onClick={() => setActive(t.id)}
                  style={{
                    paddingBlock: 4, paddingInline: 12, borderRadius: "var(--radius-pill)",
                    border: "1px solid " + (active === t.id ? "var(--accent)" : "transparent"),
                    background: active === t.id ? "var(--accent-soft)" : "transparent",
                    color: active === t.id ? "var(--text-on-tint-brand)" : "var(--text-muted)",
                    fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", fontWeight: "var(--fw-bold)",
                    cursor: "pointer",
                  }}
                >
                  {t.label}
                </button>
              ))}
            </span>
            {paneCaption ? (
              <span style={{ ...libFine, fontFamily: "var(--font-mono)", marginInlineStart: "auto" }}>{paneCaption}</span>
            ) : null}
          </div>
          {/* code is inherently LTR, so the pane keeps its direction under RTL */}
          <div dir="ltr" style={{ paddingBlock: 18, paddingInline: 20, overflowX: "auto" }}>
            {lines.map((line, i) => (
              <div key={active + "-" + i} style={{ display: "grid", gridTemplateColumns: "26px minmax(0, 1fr)", gap: 14 }}>
                <span aria-hidden="true" style={{ ...libFine, fontFamily: "var(--font-mono)", fontSize: 13, lineHeight: 1.75, textAlign: "end", userSelect: "none" }}>{i + 1}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, lineHeight: 1.75, whiteSpace: "pre", color: "var(--text-body)" }}>
                  {line.length ? line.map(([tone, text], j) => (
                    <span key={j} style={{ color: libCodeTone[tone] || libCodeTone.pl }}>{text}</span>
                  )) : " "}
                </span>
              </div>
            ))}
          </div>
          {paneFootnote ? (
            <div style={{ paddingBlock: 12, paddingInline: 20, borderBlockStart: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", gap: 8 }}>
              {libStatusDot("operational", 7)}
              <span style={libFine}>{paneFootnote}</span>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/* ==== support-entry · triage before conversation, human ranked last ==== */
function LibSupportEntry({
  eyebrow = "Support",
  heading = "Stuck? Start with me.",
  sub = "Search the docs, or ask and I will answer with the exact page. If I cannot resolve it, a human replies within 4 business hours.",
  showSearch = true,
  searchPlaceholder = "Describe the problem, e.g. Bluepeak connector will not sync",
  statusLine = "All systems operational",
  statusLinkLabel = "View status",
  routes = [
    { glyph: "book", title: "Browse the docs", sub: "Guides and reference for every feature, kept current with each release.", meta: "Self-serve, instant", ctaLabel: "Open the docs" },
    { glyph: "spark", title: "Ask me directly", sub: "I resolve 8 in 10 questions on the first answer, with a link to the page it came from.", meta: "Typical reply: seconds", ctaLabel: "Ask Alfred", recommended: true, badge: "Fastest" },
    { glyph: "person", title: "Talk to a person", sub: "Email support, first reply within 4 business hours. Your workspace context comes attached.", meta: "First reply: 4 business hours", ctaLabel: "Email support" },
  ],
}) {
  const [query, setQuery] = React.useState("");
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({ paddingBlock: "96px 104px", textAlign: "center" })}>
        <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
        <h2 style={{ ...libDisplay(44), maxWidth: 640, marginBlockStart: 20, marginInline: "auto" }}>{heading}</h2>
        <p style={{ ...libSub, maxWidth: 560, marginBlockStart: 16, marginInline: "auto" }}>{sub}</p>
        {showSearch ? (
          <div style={{ maxWidth: 560, marginInline: "auto", marginBlockStart: 30, textAlign: "start" }}>
            <SearchInput
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onSubmit={() => {}}
              placeholder={searchPlaceholder}
              style={{ width: "100%" }}
            />
          </div>
        ) : null}
        {statusLine ? (
          <p style={{ ...libFine, display: "flex", alignItems: "center", justifyContent: "center", gap: 7, marginBlockStart: showSearch ? 14 : 24 }}>
            {libStatusDot("operational", 7)}
            {statusLine}
            <span aria-hidden="true">·</span>
            <a href="#status" style={{ color: "var(--text-link)", fontWeight: "var(--fw-semibold)", textDecorationLine: "none" }}>{statusLinkLabel}</a>
          </p>
        ) : null}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))", gap: 20, marginBlockStart: 44, textAlign: "start" }}>
          {routes.map((r, i) => {
            const inner = (
              <article style={{
                background: "var(--surface-card)",
                border: r.recommended ? "none" : "1px solid var(--border-subtle)",
                borderRadius: r.recommended ? "calc(var(--radius-2xl) - 1px)" : "var(--radius-2xl)",
                boxShadow: r.recommended ? "none" : "var(--elevation-surface)",
                padding: 26, width: "100%", minWidth: 0,
                display: "flex", flexDirection: "column",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={libIconChip}>{libCategoryGlyphs[r.glyph] || libCategoryGlyphs.book}</span>
                  {r.recommended && r.badge ? (
                    <span style={{ marginInlineStart: "auto" }}><Badge tone="brand">{r.badge}</Badge></span>
                  ) : null}
                </div>
                <h3 style={{ ...libDisplay(19), letterSpacing: "-0.01em", lineHeight: "var(--lh-snug)", marginBlockStart: 16 }}>{r.title}</h3>
                <p style={{ ...libBody, marginBlockStart: 8, flexGrow: 1 }}>{r.sub}</p>
                <div style={{ ...libFine, display: "flex", alignItems: "center", gap: 6, marginBlockStart: 16 }}>
                  <span style={{ display: "inline-flex", color: "var(--text-muted)" }}>{libClockGlyph}</span>
                  {r.meta}
                </div>
                <span style={{ ...libReadLink, marginBlockStart: 14 }}>{r.ctaLabel}{libArrowGlyph(14)}</span>
              </article>
            );
            return r.recommended ? (
              /* the section's one gradient element: a 1px brand ring on the assistant route */
              <div key={i} style={{ background: "var(--gradient-brand)", borderRadius: "var(--radius-2xl)", padding: 1, boxShadow: "var(--elevation-raised)", display: "flex" }}>
                {inner}
              </div>
            ) : (
              <React.Fragment key={i}>{inner}</React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}

window.LibDocsHub = LibDocsHub;
window.LibStatusBand = LibStatusBand;
window.LibDeveloperProofBand = LibDeveloperProofBand;
window.LibSupportEntry = LibSupportEntry;
