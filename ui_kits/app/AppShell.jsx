const { Logo, Avatar, Badge, IconButton } = window.AlfredAIDesignSystem_1ce241;

/* Minimal, consistent stroke glyphs for app chrome (24px, 1.75 stroke, rounded). */
const NavGlyph = ({ d, size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {d}
  </svg>
);
const GLYPHS = {
  home: <><path d="M4 10.5 12 4l8 6.5"/><path d="M6 9.5V20h12V9.5"/><path d="M10 20v-5h4v5"/></>,
  cockpit: <><rect x="3.5" y="3.5" width="7" height="7" rx="1.6"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.6"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.6"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.6"/></>,
  spend: <><path d="M3 17l5-5 3.5 3.5L20 8"/><path d="M15 8h5v5"/></>,
  alerts: <><path d="M18 8a6 6 0 1 0-12 0c0 6-2.5 7-2.5 7h17S18 14 18 8Z"/><path d="M10.5 20a2 2 0 0 0 3 0"/></>,
  integrations: <><circle cx="6.5" cy="6.5" r="3"/><circle cx="17.5" cy="17.5" r="3"/><path d="M14.5 6.5h2a2 2 0 0 1 2 2v2"/><path d="M9.5 17.5h-2a2 2 0 0 1-2-2v-2"/></>,
  settings: <><circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M21.5 12h-3M5.5 12h-3M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1M18.7 18.7l-2.1-2.1M7.4 7.4 5.3 5.3"/></>,
  search: <><circle cx="11" cy="11" r="6.5"/><path d="m20 20-3.5-3.5"/></>,
  send: <><path d="M4 12 21 4l-7 17-3-7-7-3Z"/></>,
  briefing: <><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/></>,
  ask: <><path d="M20 4H4a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h4v3l4-3h8a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1Z"/></>,
  creative: <><rect x="3.5" y="4.5" width="17" height="13" rx="2"/><circle cx="9" cy="9.5" r="1.4"/><path d="m6 17 4.5-4.5 3 3L17 11l3.5 3.5"/></>,
  visibility: <><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="2.8"/></>,
};

function NavItem({ glyph, label, active, badge, onClick }) {
  const [h, setH] = React.useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        display: "flex", alignItems: "center", gap: 12, width: "100%", border: "none", cursor: "pointer",
        padding: "11px 14px", borderRadius: "var(--radius-md)", textAlign: "left",
        background: active ? "var(--orange-50)" : h ? "var(--gray-50)" : "transparent",
        color: active ? "var(--orange-600)" : "var(--ink-600)",
        fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", fontWeight: active ? "var(--fw-bold)" : "var(--fw-medium)",
        transition: "background var(--dur-base) var(--ease-standard), color var(--dur-base) var(--ease-standard)",
      }}>
      <NavGlyph d={GLYPHS[glyph]} />
      <span style={{ flex: 1 }}>{label}</span>
      {badge != null && <Badge tone={active ? "brand" : "neutral"}>{badge}</Badge>}
    </button>
  );
}

function AppShell({ nav, active, onNav, title, subtitle, headerRight, children, logoRoot, iconRoot }) {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", background: "var(--bg-canvas)", fontFamily: "var(--font-sans)" }}>
      {/* Sidebar */}
      <aside style={{
        width: 248, flex: "none", background: "#fff", borderRight: "1px solid var(--border-subtle)",
        display: "flex", flexDirection: "column", padding: "22px 16px",
      }}>
        <div style={{ padding: "4px 8px 22px" }}><Logo height={30} root={logoRoot} /></div>
        <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {nav.map((n) => (
            <NavItem key={n.id} glyph={n.glyph} label={n.label} badge={n.badge}
              active={active === n.id} onClick={() => onNav && onNav(n.id)} />
          ))}
        </nav>
        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{
            background: "var(--gradient-brand)", borderRadius: "var(--radius-xl)", padding: 16, color: "#fff",
          }}>
            <div style={{ fontWeight: "var(--fw-bold)", fontSize: "var(--text-sm)", marginBottom: 4 }}>Alfred Pro</div>
            <div style={{ fontSize: "var(--text-xs)", opacity: 0.92, lineHeight: 1.4 }}>Unlimited briefings &amp; channel reconciliation.</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "4px 6px" }}>
            <Avatar name="Priya Menon" size={36} />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: "var(--text-sm)", fontWeight: "var(--fw-bold)", color: "var(--ink-900)" }}>Priya Menon</div>
              <div style={{ fontSize: "var(--text-xs)", color: "var(--ink-500)" }}>CMO · Northwind</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <header style={{
          height: 76, flex: "none", padding: "0 32px", display: "flex", alignItems: "center", gap: 20,
          borderBottom: "1px solid var(--border-subtle)", background: "rgba(255,255,255,0.7)", backdropFilter: "blur(8px)",
        }}>
          <div style={{ minWidth: 0 }}>
            <h1 style={{ fontSize: "var(--text-h2)", fontWeight: "var(--fw-semibold)", letterSpacing: "var(--ls-tight)" }}>{title}</h1>
            {subtitle && <div style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)", marginTop: 2 }}>{subtitle}</div>}
          </div>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 8, height: 42, padding: "0 14px", width: 240,
              background: "var(--gray-50)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-pill)",
              color: "var(--ink-400)",
            }}>
              <NavGlyph d={GLYPHS.search} size={18} />
              <span style={{ fontSize: "var(--text-sm)" }}>Ask or search…</span>
            </div>
            {headerRight}
          </div>
        </header>
        <div style={{ flex: 1, overflow: "auto", padding: 32 }}>{children}</div>
      </main>
    </div>
  );
}
window.AppShell = AppShell;
window.NavGlyph = NavGlyph;
window.AppGlyphs = GLYPHS;
