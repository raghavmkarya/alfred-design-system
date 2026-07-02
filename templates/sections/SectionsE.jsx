/* ============================================================
   Alfred — reusable marketing SECTION templates (part E).
   Company & content sections: security grid · team grid · values
   grid · careers band (light-inverted) · story editorial.
   Dark theme. Reuses the helpers exposed on window by SectionsA.
   ============================================================ */
const { Avatar, JobListingRow, EyebrowBadge, Icon } = window.AlfredAIDesignSystem_1ce241;
const ContainerE = window.SecContainer;
const EyebrowE = window.SecEyebrow;
/* Dark-surface H2 — var(--font-display) inherits Satoshi under [data-theme="dark"] (live spec), weight 500. */
const H2E = ({ children, style }) => (
  <h2 style={{ fontFamily: "var(--font-display)", fontWeight: "var(--fw-medium)", fontSize: 40,
    letterSpacing: "-0.02em", color: "var(--text-primary)", margin: "14px 0 0", ...style }}>{children}</h2>
);
const SIR5 = "../../assets/icons";

const GlyphE = ({ name, color = "var(--orange-400)" }) => (
  <div style={{ width: 40, height: 40, borderRadius: "var(--radius-md)", background: "var(--accent-soft)", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
    <Icon name={name} root={SIR5} size={20} color={color} />
  </div>
);

/* ——— E1 · Security commitment grid ——— */
function SecurityGrid({
  title = "Enterprise-grade security",
  items = [
    { icon: "gdpr", title: "SOC 2 in progress", line: "Our SOC 2 Type II audit is underway — the controls behind it already run day to day." },
    { icon: "security-lock", title: "Encrypted everywhere", line: "AES-256 at rest and TLS 1.2+ in transit, for every workspace on every plan." },
    { icon: "read-only", title: "Read-only by default", line: "Alfred connects with the minimum scopes it needs. Write-back is opt-in and approval-gated." },
    { icon: "audit-log", title: "A full audit trail", line: "Every connection, query and recommendation is logged and reviewable by your admins." },
    { icon: "locked-feature", title: "Role-based access control", line: "You decide who sees which module, metric and memory — down to the workspace." },
    { icon: "web-stack-connected", title: "Your data stays yours", line: "It never trains shared models, and you can export or delete it whenever you ask." },
  ],
}) {
  return (
    <section style={{ background: "var(--surface-sunken)", borderTop: "1px solid var(--border-subtle)" }}>
      <ContainerE style={{ padding: "84px 40px" }}>
        <EyebrowE>Security</EyebrowE>
        <H2E style={{ marginBottom: 36 }}>{title}</H2E>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {items.map((it) => (
            <div key={it.title} style={{ background: "var(--surface-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-2xl)", padding: 24 }}>
              <GlyphE name={it.icon} color={it.color} />
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)", margin: "14px 0 6px" }}>{it.title}</div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: "var(--lh-normal)", margin: 0 }}>{it.line}</p>
            </div>
          ))}
        </div>
      </ContainerE>
    </section>
  );
}

/* ——— E2 · Team grid (photo-less, initials) ——— */
function TeamGrid({
  title = "The people behind Alfred",
  /* placeholder — replace with the real E902 AI Labs team/roles before shipping */
  members = [
    { name: "Arjun Mehta", role: "Co-founder & CEO", line: "Spent a decade watching great teams lose their mornings to reporting. Building the layer that gives them back." },
    { name: "Sara Iyer", role: "Co-founder & CTO", line: "Owns Alfred Core — the memory that makes every briefing sharper than the last." },
    { name: "Dev Khanna", role: "Founding engineer", line: "Ships the pipelines that turn a connected stack into one decision-ready brief." },
    { name: "Ananya Rao", role: "Founding designer", line: "Believes an interface should lead with the decision, not the chart." },
  ],
}) {
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <ContainerE style={{ padding: "84px 40px" }}>
        <EyebrowE>The team</EyebrowE>
        <H2E style={{ marginBottom: 36 }}>{title}</H2E>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(members.length, 4)}, 1fr)`, gap: 16 }}>
          {members.map((m) => (
            <div key={m.name} style={{ background: "var(--surface-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-2xl)", padding: 24 }}>
              <Avatar name={m.name} size={56} />
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)", margin: "16px 0 2px" }}>{m.name}</div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-medium)", color: "var(--periwinkle-400)" }}>{m.role}</div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: "var(--lh-normal)", margin: "10px 0 0" }}>{m.line}</p>
            </div>
          ))}
        </div>
      </ContainerE>
    </section>
  );
}

/* ——— E3 · Values grid (3 icon cards) ——— */
function ValuesGrid({
  title = "What we believe",
  values = [
    { icon: "cta-arrow", title: "Decisions over dashboards", line: "We ship answers, not charts. If a screen doesn't move a decision, it doesn't ship." },
    { icon: "web-clarity", title: "Glass box, always", color: "var(--periwinkle-400)", line: "Every recommendation shows its work — the source, the trace, the why. Trust is earned in the open." },
    { icon: "trend-up", title: "Compound everything", line: "Memory over snapshots. Every outcome Alfred remembers makes the next briefing sharper." },
  ],
}) {
  return (
    <section style={{ background: "var(--surface-sunken)", borderTop: "1px solid var(--border-subtle)" }}>
      <ContainerE style={{ padding: "84px 40px" }}>
        <div style={{ textAlign: "center" }}>
          <EyebrowE>Values</EyebrowE>
          <H2E style={{ marginBottom: 36 }}>{title}</H2E>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {values.map((v) => (
            <div key={v.title} style={{ background: "var(--surface-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-2xl)", padding: 28 }}>
              <GlyphE name={v.icon} color={v.color} />
              <div style={{ fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)", fontSize: 22, letterSpacing: "-0.01em", color: "var(--text-primary)", margin: "16px 0 8px" }}>{v.title}</div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: "var(--lh-normal)", margin: 0 }}>{v.line}</p>
            </div>
          ))}
        </div>
      </ContainerE>
    </section>
  );
}

/* ——— E4 · Careers band (light-inverted — the live About pattern) ——— */
function Careers({
  title = "Come build the intelligence layer",
  /* placeholder — replace with the real E902 AI Labs team/roles before shipping */
  jobs = [
    { title: "Founding product engineer", team: "Engineering", location: "Bengaluru", type: "Full-time", href: "#" },
    { title: "Product designer", team: "Design", location: "Remote (India)", type: "Full-time", href: "#" },
  ],
  note = "Don't see your role? Write to hello@seekalfred.ai.",
}) {
  /* Local light inversion: remap the dark tokens to their light values inside
     this band only, so JobListingRow and text render on var(--gray-50) with ink. */
  const noteParts = note.split(/([\w.+-]+@[\w-]+(?:\.[\w-]+)+)/);
  return (
    <section className="sec-careers-light" style={{ background: "var(--gray-50)" }}>
      <style>{`
        .sec-careers-light {
          --bg-page: var(--gray-50);
          --surface-card: var(--white);
          --surface-raised: var(--white);
          --surface-sunken: var(--gray-50);
          --text-primary: var(--ink-900);
          --text-secondary: var(--ink-600);
          --text-muted: var(--ink-500);
          --text-link: var(--orange-500);
          --border-subtle: var(--gray-150);
          --border-default: var(--gray-200);
          --border-strong: var(--ink-400);
          --accent-soft: var(--orange-50);
        }
      `}</style>
      <ContainerE style={{ padding: "84px 40px", display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 56, alignItems: "start" }}>
        <div>
          <EyebrowE style={{ color: "var(--orange-600)" }}>Careers</EyebrowE>
          <H2E style={{ color: "var(--ink-900)", fontSize: 36 }}>{title}</H2E>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", color: "var(--text-secondary)", lineHeight: "var(--lh-relaxed)", margin: "16px 0 0", maxWidth: 400 }}>
            {noteParts.map((part, i) => part.includes("@")
              ? <a key={i} href={`mailto:${part}`} style={{ color: "var(--text-link)", fontWeight: "var(--fw-bold)", textDecoration: "none" }}>{part}</a>
              : part)}
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {jobs.map((j) => (
            <JobListingRow key={j.title} title={j.title} team={j.team} location={j.location} type={j.type} href={j.href} />
          ))}
        </div>
      </ContainerE>
    </section>
  );
}

/* ——— E5 · Story editorial (long-form prose band) ——— */
function StoryEditorial({
  eyebrow = "Our story",
  paragraphs = [
    "Alfred started with a simple observation: leaders don't lack data, they lack decisions. Every team we met had more dashboards than ever — and still spent Monday morning arguing about what any of it meant.",
    "So we built a different kind of platform. Alfred connects the stack, reads everything overnight, and arrives each morning with what changed, why it changed, and what to do about it — every recommendation traced back to its source.",
    "And because Alfred Core remembers every decision and its outcome, nothing starts from zero. The longer Alfred runs, the sharper it gets. That's what we're building at E902 AI Labs: not another dashboard — the intelligence layer underneath.",
  ],
}) {
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <ContainerE style={{ padding: "96px 40px", maxWidth: 880 }}>
        <EyebrowBadge>{eyebrow}</EyebrowBadge>
        <div style={{ display: "flex", flexDirection: "column", gap: 28, marginTop: 32, maxWidth: 720 }}>
          {paragraphs.map((p, i) => (
            <p key={i} style={{ fontFamily: "var(--font-sans)", fontWeight: "var(--fw-medium)", fontSize: 22, lineHeight: 1.6, letterSpacing: "-0.005em", color: i === 0 ? "var(--text-primary)" : "var(--text-secondary)", margin: 0 }}>{p}</p>
          ))}
        </div>
      </ContainerE>
    </section>
  );
}

window.SecSecurityGrid = SecurityGrid;
window.SecTeamGrid = TeamGrid;
window.SecValuesGrid = ValuesGrid;
window.SecCareers = Careers;
window.SecStoryEditorial = StoryEditorial;
