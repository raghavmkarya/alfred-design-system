/* ============================================================
   Alfred : Inspiration Library · TRUST CENTER.
   Four trust-center patterns for the security-review audience:
   the document entry, the subprocessor register, the data-flow
   diagram, and the commitments grid. Deliberately the quietest
   register in the library: no gradient, no grain, no marquee.
   The instrument layer does the talking, mono stamps and
   hairline tables read as a maintained record, not a pitch.
   Every component ships complete default copy: a bare
   <LibTrustHero /> is a finished section. All documents,
   vendors and figures are fictional and marked illustrative.
   Compiled to a committed .js twin by scripts/build-kits.mjs;
   catalogued in library/meta/trust.json.
   ============================================================ */
const {
  EyebrowBadge, Button, Table,
} = window.AlfredAIDesignSystem_1ce241;

/* file-private helpers (const arrows stay off window) */
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
  color: "var(--text-secondary)", lineHeight: "var(--lh-relaxed)", margin: 0,
};
const libCard = {
  background: "var(--surface-card)", border: "1px solid var(--border-subtle)",
  borderRadius: "var(--radius-2xl)",
};
/* The instrument layer's voice: true mono, 11px, uppercase where it labels.
   Mono never sets headlines or body. */
const libMonoCaps = (extra) => ({
  fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: "var(--fw-medium)",
  letterSpacing: "var(--ls-caps)", textTransform: "uppercase",
  color: "var(--text-muted)", ...extra,
});
const libChip = {
  display: "inline-flex", alignItems: "center",
  fontFamily: "var(--font-mono)", fontSize: 10.5, fontWeight: "var(--fw-medium)",
  letterSpacing: "var(--ls-caps)", textTransform: "uppercase",
  color: "var(--text-secondary)", background: "var(--surface-sunken)",
  border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-pill)",
  paddingInline: 9, paddingBlock: 3, whiteSpace: "nowrap",
};

/* single-color line glyphs, drawn like the design-system icon set */
const LIB_TRUST_GLYPHS = {
  doc: ["M14 3H7.5A1.5 1.5 0 0 0 6 4.5v15A1.5 1.5 0 0 0 7.5 21h9a1.5 1.5 0 0 0 1.5-1.5V7z", "M14 3v4h4", "M9.5 12.5h5", "M9.5 16h5"],
  shield: ["M12 21.5s7.5-3 7.5-9.5V5.5L12 2.8 4.5 5.5V12c0 6.5 7.5 9.5 7.5 9.5z"],
  lock: ["M6.5 10.5h11A1.5 1.5 0 0 1 19 12v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 19v-7a1.5 1.5 0 0 1 1.5-1.5z", "M8.5 10.5V7.5a3.5 3.5 0 0 1 7 0v3"],
  noTraining: ["M12 4l1.9 4 4.4.6-3.2 3.1.8 4.4-3.9-2.1-3.9 2.1.8-4.4-3.2-3.1 4.4-.6z", "M4.5 20.5 19.5 4.5"],
  isolation: ["M4 4h7.2v7.2H4z", "M12.8 12.8H20V20h-7.2z"],
  key: ["M11.5 16a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z", "M11 13.5 19.5 5", "M16.2 8.3l2.6 2.6", "M13.4 11.1l1.8 1.8"],
  audit: ["M7 4h10a1.5 1.5 0 0 1 1.5 1.5v13A1.5 1.5 0 0 1 17 20H7a1.5 1.5 0 0 1-1.5-1.5v-13A1.5 1.5 0 0 1 7 4z", "M9 9h6", "M9 12.5h6", "M9 16h3.5"],
  clock: ["M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18z", "M12 7v5l3.2 1.9"],
  pin: ["M12 21s-6.5-5.4-6.5-10.3A6.5 6.5 0 0 1 12 4a6.5 6.5 0 0 1 6.5 6.7C18.5 15.6 12 21 12 21z", "M12 12.6a2.1 2.1 0 1 0 0-4.2 2.1 2.1 0 0 0 0 4.2z"],
  search: ["M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14z", "M20 20l-3.6-3.6"],
};
const libGlyph = (name, size = 20, strokeWidth = 1.8) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0, display: "block" }}>
    {(LIB_TRUST_GLYPHS[name] || LIB_TRUST_GLYPHS.shield).map((d, i) => <path key={i} d={d} />)}
  </svg>
);

/* ===== trust-hero · the trust-center entry: quiet header, search, documents ===== */
const LIB_TRUST_DOCS = [
  { icon: "doc", name: "Security overview", detail: "Architecture, encryption and operational controls, in one narrative document.", updated: "2026-06-12", action: "Download" },
  { icon: "doc", name: "Data processing addendum", detail: "Our standard DPA, with the EU standard contractual clauses included.", updated: "2026-05-30", action: "Download" },
  { icon: "doc", name: "Subprocessor list", detail: "Every vendor that touches customer data, with its purpose and region.", updated: "2026-07-14", action: "Download" },
  { icon: "lock", name: "Pen-test summary", detail: "Executive summary of the most recent third-party penetration test.", updated: "2026-04-08", action: "Request access" },
];

function LibTrustHero({
  eyebrow = "Trust center",
  title = "Security, ready for your review",
  sub = "Everything your security team will ask for, in one place: the documents, the subprocessors, and where your data lives. No sales call required to read any of it.",
  searchPlaceholder = "Search documents, controls, subprocessors…",
  docs = LIB_TRUST_DOCS,
  footnote = "Illustrative documents. The live trust center serves current versions, some under NDA.",
}) {
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({ paddingBlock: "96px 88px" })}>
        <div style={{ textAlign: "center" }}>
          <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
          <h1 style={{ ...libDisplay(48), maxWidth: 700, marginInline: "auto", marginBlockStart: 20 }}>{title}</h1>
          <p style={{ ...libSub, maxWidth: 600, marginInline: "auto", marginBlockStart: 18 }}>{sub}</p>
          {/* the search field: one quiet input, the trust center is a lookup surface */}
          <div style={{ position: "relative", maxWidth: 520, marginInline: "auto", marginBlockStart: 32 }}>
            <span style={{ position: "absolute", insetInlineStart: 16, insetBlockStart: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }}>
              {libGlyph("search", 16, 2)}
            </span>
            <input
              type="search" placeholder={searchPlaceholder} aria-label="Search the trust center"
              style={{
                inlineSize: "100%", boxSizing: "border-box", blockSize: 48,
                paddingInlineStart: 44, paddingInlineEnd: 18,
                borderRadius: "var(--radius-md)", border: "1px solid var(--border-default)",
                background: "var(--surface-input-plain)", color: "var(--text-primary)",
                fontFamily: "var(--font-sans)", fontSize: "var(--text-base)",
              }}
            />
          </div>
        </div>
        {/* the document grid */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(240px, 100%), 1fr))",
          gap: 20, marginBlockStart: 56,
        }}>
          {docs.map((d, i) => (
            <article key={i} style={{ ...libCard, padding: 24, display: "flex", flexDirection: "column", minWidth: 0 }}>
              <div style={{
                inlineSize: 38, blockSize: 38, borderRadius: "var(--radius-md)",
                background: "var(--surface-sunken)", color: "var(--text-secondary)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>{libGlyph(d.icon || "doc", 18)}</div>
              <h2 style={{ ...libDisplay(18), marginBlockStart: 16 }}>{d.name}</h2>
              <p style={{ ...libBody, marginBlockStart: 8, flexGrow: 1 }}>{d.detail}</p>
              <div style={libMonoCaps({ marginBlockStart: 16 })}>Updated {d.updated}</div>
              <div style={{ marginBlockStart: 14 }}>
                <Button variant="outline" size="sm" style={{ background: "transparent", color: "var(--text-primary)", borderColor: "var(--border-default)" }}>{d.action}</Button>
              </div>
            </article>
          ))}
        </div>
        {footnote ? <p style={{ ...libMonoCaps({}), textAlign: "center", marginBlockStart: 36, marginBlockEnd: 0 }}>{footnote}</p> : null}
      </div>
    </section>
  );
}

/* ===== subprocessor-table · the register, on the bundle Table ===== */
const LIB_SUBPROCESSORS = [
  { vendor: "Northcloud Hosting", purpose: "Cloud infrastructure and storage", region: "EU west", updated: "2026-07-14" },
  { vendor: "Relay Mail", purpose: "Transactional email delivery", region: "EU west", updated: "2026-06-02" },
  { vendor: "Quarrystone Data", purpose: "Warehouse compute for briefs", region: "US east", updated: "2026-05-19" },
  { vendor: "Signalpost Desk", purpose: "Customer support tooling", region: "EU west", updated: "2026-04-26" },
  { vendor: "Vaultkeep", purpose: "Encrypted backups and recovery", region: "EU west", updated: "2026-03-11" },
];

function LibSubprocessorTable({
  eyebrow = "Subprocessors",
  title = "Who touches your data, and why",
  sub = "The current register of vendors that process customer data on Alfred's behalf. Additions are announced 30 days before they take effect, and you can object to any of them.",
  registerStamp = "Register updated 2026-07-14",
  rows = LIB_SUBPROCESSORS,
  footnote = "Illustrative register. Every vendor named here is fictional.",
}) {
  const columns = [
    {
      key: "vendor", header: "Vendor",
      render: (v) => <span style={{ fontFamily: "var(--font-sans)", fontWeight: "var(--fw-semibold)", color: "var(--text-primary)" }}>{v}</span>,
    },
    { key: "purpose", header: "Purpose" },
    { key: "region", header: "Region", render: (v) => <span style={libChip}>{v}</span> },
    {
      key: "updated", header: "Reviewed", align: "right",
      render: (v) => <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)" }}>{v}</span>,
    },
  ];
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({ paddingBlock: "88px 88px" })}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          gap: 24, flexWrap: "wrap", marginBlockEnd: 36,
        }}>
          <div style={{ maxWidth: 620 }}>
            <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
            <h2 style={{ ...libDisplay(38), marginBlockStart: 18 }}>{title}</h2>
            <p style={{ ...libSub, fontSize: "var(--text-base)", marginBlockStart: 14 }}>{sub}</p>
          </div>
          <span style={libMonoCaps({ paddingBlockEnd: 4 })}>{registerStamp}</span>
        </div>
        <Table columns={columns} rows={rows} />
        {footnote ? <p style={{ ...libMonoCaps({}), marginBlockStart: 20, marginBlockEnd: 0 }}>{footnote}</p> : null}
      </div>
    </section>
  );
}

/* ===== data-flow · where your data lives, as a three-node diagram ===== */
const LIB_FLOW_NODES = [
  {
    icon: "shield", title: "Your stack",
    detail: "Ad platforms, analytics, CRM. Your data stays where it already lives.",
    chips: ["Stays in place"],
  },
  {
    icon: "lock", title: "Alfred runtime",
    detail: "An isolated workspace with its own encryption keys, pinned to one region.",
    chips: ["EU west", "US east"],
    chipsNote: "you choose at setup",
  },
  {
    icon: "doc", title: "Your workspace",
    detail: "Briefs, decisions and the audit trail, visible only to your team.",
    chips: ["Region-pinned"],
  },
];
const LIB_FLOW_CONNECTORS = [
  { label: "Read-only", note: "encrypted in transit" },
  { label: "Write-back", note: "only on your approval" },
];

/* Connector: mono label over a hairline with an arrowhead. The arrow points
   with the reading direction, so the whole line flips with --flip in RTL. */
const LibFlowConnector = ({ label, note }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 7, minInlineSize: 104, paddingInline: 6, alignSelf: "center" }}>
    <span style={libMonoCaps({ color: "var(--text-secondary)", whiteSpace: "nowrap" })}>{label}</span>
    <div style={{ display: "flex", alignItems: "center", inlineSize: "100%", transform: "scaleX(var(--flip))" }}>
      <span aria-hidden="true" style={{ flexGrow: 1, blockSize: 1, background: "var(--border-default)" }} />
      <svg width="8" height="10" viewBox="0 0 8 10" aria-hidden="true" style={{ flexShrink: 0, display: "block" }}>
        <path d="M0 0L8 5L0 10Z" fill="var(--border-default)" />
      </svg>
    </div>
    <span style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--text-muted)", whiteSpace: "nowrap" }}>{note}</span>
  </div>
);

function LibDataFlow({
  eyebrow = "Data flow",
  title = "Where your data lives",
  sub = "Three places, two connections, no surprises. I read from your stack, reason in an isolated runtime, and write back only what you approve.",
  nodes = LIB_FLOW_NODES,
  connectors = LIB_FLOW_CONNECTORS,
  footnote = "Illustrative diagram. Regions shown are the two available at launch.",
}) {
  return (
    <section style={{ background: "var(--surface-sunken)", borderBlock: "1px solid var(--border-subtle)" }}>
      <div style={libContainer({ paddingBlock: "88px 88px" })}>
        <div style={{ textAlign: "center", marginBlockEnd: 52 }}>
          <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
          <h2 style={{ ...libDisplay(38), maxWidth: 640, marginInline: "auto", marginBlockStart: 18 }}>{title}</h2>
          <p style={{ ...libSub, fontSize: "var(--text-base)", maxWidth: 560, marginInline: "auto", marginBlockStart: 14 }}>{sub}</p>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) auto minmax(0, 1fr) auto minmax(0, 1fr)",
          gap: 8, alignItems: "stretch",
        }}>
          {nodes.map((n, i) => (
            <React.Fragment key={i}>
              <article style={{
                ...libCard, borderRadius: "var(--radius-lg)", padding: 24, minWidth: 0,
                display: "flex", flexDirection: "column",
                boxShadow: i === 1 ? "var(--elevation-raised)" : undefined,
                borderColor: i === 1 ? "var(--border-default)" : "var(--border-subtle)",
              }}>
                <div style={{
                  inlineSize: 36, blockSize: 36, borderRadius: "var(--radius-md)",
                  background: i === 1 ? "var(--accent-soft)" : "var(--surface-sunken)",
                  color: i === 1 ? "var(--text-on-tint-brand)" : "var(--text-secondary)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>{libGlyph(n.icon || "doc", 17)}</div>
                <h3 style={{ ...libDisplay(17), marginBlockStart: 14 }}>{n.title}</h3>
                <p style={{ ...libBody, fontSize: "var(--text-xs)", marginBlockStart: 8, flexGrow: 1 }}>{n.detail}</p>
                <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 6, marginBlockStart: 14 }}>
                  {(n.chips || []).map((c, ci) => <span key={ci} style={libChip}>{c}</span>)}
                  {n.chipsNote ? <span style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--text-muted)" }}>{n.chipsNote}</span> : null}
                </div>
              </article>
              {i < nodes.length - 1 && connectors[i] ? (
                <LibFlowConnector label={connectors[i].label} note={connectors[i].note} />
              ) : null}
            </React.Fragment>
          ))}
        </div>
        {footnote ? <p style={{ ...libMonoCaps({}), textAlign: "center", marginBlockStart: 40, marginBlockEnd: 0 }}>{footnote}</p> : null}
      </div>
    </section>
  );
}

/* ===== commitments-grid · the promises, each one a contract term ===== */
const LIB_COMMITMENTS = [
  { icon: "noTraining", title: "No training on your data", body: "Models never learn from your workspace, and your prompts are never retained for training." },
  { icon: "isolation", title: "Logical isolation", body: "Every workspace runs in its own isolated context, with encryption keys that belong to it alone." },
  { icon: "key", title: "SSO and SCIM", body: "SAML single sign-on and SCIM provisioning ship on every enterprise plan, with no add-on pricing." },
  { icon: "audit", title: "Full audit trail", body: "Every question, answer and approval is logged, exportable, and reviewable by your admins." },
  { icon: "clock", title: "Retention controls", body: "You set how long anything is kept. Delete a workspace and it is gone within 30 days, backups included." },
  { icon: "pin", title: "Region pinning", body: "Choose EU or US at setup and your data is processed and stored in that region only." },
];

function LibCommitmentsGrid({
  eyebrow = "Commitments",
  title = "Promises we make in writing",
  sub = "Each of these is a contract term, not a marketing line. Your security team can hold us to every one.",
  items = LIB_COMMITMENTS,
  footnote = "The full commitments live in the security overview and the DPA.",
}) {
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({ paddingBlock: "88px 96px" })}>
        <div style={{ textAlign: "center", marginBlockEnd: 52 }}>
          <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
          <h2 style={{ ...libDisplay(38), maxWidth: 640, marginInline: "auto", marginBlockStart: 18 }}>{title}</h2>
          <p style={{ ...libSub, fontSize: "var(--text-base)", maxWidth: 560, marginInline: "auto", marginBlockStart: 14 }}>{sub}</p>
        </div>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
          gap: 20,
        }}>
          {items.map((it, i) => (
            <article key={i} style={{ ...libCard, borderRadius: "var(--radius-lg)", padding: 24, display: "flex", gap: 16, alignItems: "flex-start", minWidth: 0 }}>
              <div style={{
                inlineSize: 36, blockSize: 36, borderRadius: "var(--radius-md)", flexShrink: 0,
                background: "var(--surface-sunken)", color: "var(--text-secondary)",
                border: "1px solid var(--border-subtle)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>{libGlyph(it.icon || "shield", 17)}</div>
              <div style={{ minWidth: 0 }}>
                <h3 style={{ ...libDisplay(17) }}>{it.title}</h3>
                <p style={{ ...libBody, marginBlockStart: 7 }}>{it.body}</p>
              </div>
            </article>
          ))}
        </div>
        {footnote ? <p style={{ ...libMonoCaps({}), textAlign: "center", marginBlockStart: 40, marginBlockEnd: 0 }}>{footnote}</p> : null}
      </div>
    </section>
  );
}

window.LibTrustHero = LibTrustHero;
window.LibSubprocessorTable = LibSubprocessorTable;
window.LibDataFlow = LibDataFlow;
window.LibCommitmentsGrid = LibCommitmentsGrid;
