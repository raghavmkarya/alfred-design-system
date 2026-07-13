const { Logo, Avatar, Badge, IconButton, Kbd, CommandPalette } = window.AlfredAIDesignSystem_1ce241;

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
  inbox: <><path d="M3 13h4l2 3h6l2-3h4"/><path d="M5 6h14l2 7v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-5l2-7Z"/></>,
  memory: <><rect x="7" y="7" width="10" height="10" rx="2"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M17 7l2-2M5 19l2-2"/></>,
};

function NavItem({ glyph, label, active, badge, onClick }) {
  const [h, setH] = React.useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        display: "flex", alignItems: "center", gap: 12, width: "100%", border: "none", cursor: "pointer",
        padding: "11px 14px", borderRadius: "var(--radius-md)", textAlign: "left",
        background: active ? "var(--accent-soft)" : h ? "var(--surface-hover)" : "transparent",
        color: active ? "var(--orange-600)" : "var(--text-secondary)",
        fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", fontWeight: active ? "var(--fw-bold)" : "var(--fw-medium)",
        transition: "background var(--dur-base) var(--ease-standard), color var(--dur-base) var(--ease-standard)",
      }}>
      <NavGlyph d={GLYPHS[glyph]} />
      <span style={{ flex: 1 }}>{label}</span>
      {badge != null && <Badge tone={active ? "brand" : "neutral"}>{badge}</Badge>}
    </button>
  );
}

/* Group consecutive nav items by their optional `section` label. Items without
   a section join the open group, so an unsectioned nav renders exactly as before. */
function groupNav(nav) {
  const groups = [];
  nav.forEach((n) => {
    const last = groups[groups.length - 1];
    if (!last || (n.section && n.section !== last.section)) {
      groups.push({ section: n.section, items: [n] });
    } else {
      last.items.push(n);
    }
  });
  return groups;
}

function AppShell({ nav, active, onNav, title, subtitle, headerRight, children, logoRoot, iconRoot, logoTone }) {
  const [paletteOpen, setPaletteOpen] = React.useState(false);

  // Cmd/Ctrl+K toggles the palette; Escape closes it.
  React.useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      } else if (e.key === "Escape") {
        setPaletteOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Focus the palette's input when the dialog mounts (stable callback → runs once per open).
  const focusPalette = React.useCallback((el) => {
    if (el) { const input = el.querySelector("input"); if (input) input.focus(); }
  }, []);

  // Palette commands come straight from the nav; free-form text becomes an ask.
  const paletteSuggestions = nav.map((n) => ({
    label: `Go to ${n.label}`,
    hint: n.section,
    icon: GLYPHS[n.glyph] ? <NavGlyph d={GLYPHS[n.glyph]} size={15} /> : undefined,
  }));
  const handlePaletteSubmit = (q) => {
    setPaletteOpen(false);
    if (!onNav) return;
    const hit = nav.find((n) => `Go to ${n.label}` === q || n.label === q);
    onNav(hit ? hit.id : "ask");
  };

  const navGroups = groupNav(nav);

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", background: "var(--bg-canvas)", fontFamily: "var(--font-sans)" }}>
      {/* Sidebar */}
      <aside style={{
        width: 248, flex: "none", background: "var(--surface-card)", borderRight: "1px solid var(--border-subtle)",
        display: "flex", flexDirection: "column", padding: "22px 16px",
      }}>
        <div style={{ padding: "4px 8px 22px" }}><Logo height={30} root={logoRoot} tone={logoTone} /></div>
        <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {navGroups.map((g, gi) => (
            <div key={g.section || `group-${gi}`}
              style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: gi > 0 ? 14 : 0 }}>
              {gi > 0 && g.section && (
                <div style={{
                  padding: "0 14px 2px", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase",
                  fontWeight: "var(--fw-semibold)", color: "var(--text-muted)",
                }}>{g.section}</div>
              )}
              {g.items.map((n) => (
                <NavItem key={n.id} glyph={n.glyph} label={n.label} badge={n.badge}
                  active={active === n.id} onClick={() => onNav && onNav(n.id)} />
              ))}
            </div>
          ))}
        </nav>
        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{
            background: "var(--surface-raised)", border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-xl)", padding: 14,
          }}>
            <div style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.4 }}>412 of 500 Ask Alfred queries used</div>
            <div style={{ height: 4, borderRadius: "var(--radius-pill)", background: "var(--gray-150)", margin: "8px 0 10px", overflow: "hidden" }}>
              <div style={{ width: "82%", height: "100%", borderRadius: "var(--radius-pill)", background: "var(--gradient-brand)" }} />
            </div>
            <button onClick={() => onNav && onNav("billing")} style={{
              border: "none", background: "transparent", padding: 0, cursor: "pointer",
              fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: "var(--fw-bold)", color: "var(--text-link)",
            }}>See plans</button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "4px 6px" }}>
            <Avatar name="Priya Menon" size={36} />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: "var(--text-sm)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)" }}>Priya Menon</div>
              <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>CMO · Northwind Labs</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <header style={{
          height: 76, flex: "none", padding: "0 32px", display: "flex", alignItems: "center", gap: 20,
          borderBottom: "1px solid var(--border-subtle)", background: "var(--surface-veil)", backdropFilter: "blur(8px)",
        }}>
          <div style={{ minWidth: 0 }}>
            <h1 style={{ fontSize: "var(--text-h2)", fontWeight: "var(--fw-semibold)", letterSpacing: "var(--ls-tight)" }}>{title}</h1>
            {subtitle && <div style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)", marginTop: 2 }}>{subtitle}</div>}
          </div>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
            <button type="button" aria-label="Ask Alfred or search" onClick={() => setPaletteOpen(true)}
              style={{
                display: "flex", alignItems: "center", gap: 8, height: 42, padding: "0 9px 0 14px", width: 240,
                background: "var(--gray-50)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-pill)",
                color: "var(--text-muted)", cursor: "pointer", fontFamily: "var(--font-sans)", textAlign: "left",
              }}>
              <NavGlyph d={GLYPHS.search} size={18} />
              <span style={{ flex: 1, fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>Ask or search…</span>
              <Kbd>⌘K</Kbd>
            </button>
            {headerRight}
          </div>
        </header>
        <div style={{ flex: 1, overflow: "auto", padding: 32 }}>{children}</div>
      </main>

      {/* Command palette overlay — opened from the header pill or Cmd/Ctrl+K */}
      {paletteOpen && (
        <div role="presentation" onClick={() => setPaletteOpen(false)}
          style={{
            position: "absolute", inset: 0, zIndex: "var(--z-overlay)", background: "var(--overlay-scrim)",
            display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "96px 24px 24px",
          }}>
          <div role="dialog" aria-modal="true" aria-label="Ask Alfred or search"
            ref={focusPalette} onClick={(e) => e.stopPropagation()} style={{ width: "100%", maxWidth: 600 }}>
            <CommandPalette suggestions={paletteSuggestions} onSubmit={handlePaletteSubmit} />
          </div>
        </div>
      )}
    </div>
  );
}
window.AppShell = AppShell;
window.NavGlyph = NavGlyph;
window.AppGlyphs = GLYPHS;
