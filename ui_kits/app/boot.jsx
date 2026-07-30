const LOGOROOT = "../../assets/logos";
const ICONROOT = "../../assets/icons";
const { Avatar, Badge } = window.AlfredAIDesignSystem_1ce241;

const NAV = [
  { id: "home", glyph: "home", label: "Home", section: "Today" },
  { id: "briefing", glyph: "briefing", label: "Daily briefing", section: "Today" },
  { id: "alerts", glyph: "alerts", label: "Decision alerts", badge: "3", section: "Today" },
  { id: "ask", glyph: "ask", label: "Ask Alfred", section: "Today" },
  { id: "cockpit", glyph: "cockpit", label: "KPI cockpit", section: "Intelligence" },
  { id: "spend", glyph: "spend", label: "Spend & ROI", section: "Intelligence" },
  { id: "creative", glyph: "creative", label: "Creative", section: "Intelligence" },
  { id: "visibility", glyph: "visibility", label: "AI visibility", section: "Intelligence" },
  { id: "integrations", glyph: "integrations", label: "Integrations", section: "Data" },
  { id: "connections", glyph: "integrations", label: "Connect data", section: "Data" },
  { id: "health", glyph: "visibility", label: "Connection health", section: "Data" },
  { id: "notifications", glyph: "inbox", label: "Notifications", badge: "2", section: "Workspace" },
  { id: "memory", glyph: "memory", label: "Memory", section: "Workspace" },
  { id: "team", glyph: "settings", label: "Team", section: "Workspace" },
  { id: "billing", glyph: "spend", label: "Billing", section: "Workspace" },
  { id: "audit", glyph: "search", label: "Audit log", section: "Workspace" },
  { id: "settings", glyph: "settings", label: "Settings", section: "Workspace" },
];

function Bell({ onClick }) {
  return (
    <button onClick={onClick} aria-label="Open decision alerts" title="Open decision alerts" style={{
      position: "relative", width: 42, height: 42, borderRadius: "50%", border: "1px solid var(--border-subtle)",
      background: "var(--surface-card)", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)",
    }}>
      <window.NavGlyph d={window.AppGlyphs.alerts} size={19} />
      <span style={{ position: "absolute", top: 8, right: 9, width: 9, height: 9, borderRadius: "50%", background: "var(--orange-500)", border: "2px solid var(--surface-card)" }} />
    </button>
  );
}

/* Every screen is a (navigate) => element factory — `navigate` is the app's
   setActive, so screens can deep-link into routes that aren't in the nav. */
const SCREENS = {
  home: () => <window.Dashboard />,
  briefing: () => <window.DailyBrief />,
  ask: () => <window.SeekAlfred />,
  cockpit: () => <window.KpiCockpit />,
  spend: () => <window.SpendRoi />,
  alerts: () => <window.AlertsInbox />,
  creative: () => <window.CreativeLifecycle />,
  visibility: () => <window.AiVisibility />,
  integrations: () => <window.Integrations />,
  notifications: (navigate) => <window.NotificationsCenter onOpenAlert={() => navigate("alert-detail")} />,
  memory: () => <window.MemoryCore />,
  connections: () => <window.ConnectionFlow />,
  health: () => <window.ConnectionHealth />,
  team: () => <window.TeamPermissions />,
  billing: () => <window.BillingPlans />,
  audit: () => <window.AuditLog />,
  settings: () => <window.SettingsScreen />,
  profile: () => <window.SettingsProfile />, // reached from the header avatar
  "alert-detail": () => <window.AlertDetail />, // reached from Notifications → "Open alert"
  "first-run": () => <window.FirstRunWaiting />, // route-only: reached from onboarding, not the nav
};

function App() {
  const [authed, setAuthed] = React.useState(false);
  const [active, setActive] = React.useState("home");
  if (!authed) return <window.AuthScreen onSignedIn={() => setAuthed(true)} />;

  const titles = {
    home: ["Home", "Tuesday, 11 June · Northwind Labs"],
    briefing: ["Daily briefing", "What changed, why, and what to do"],
    ask: ["Ask Alfred", "Ask anything — answered from your data"],
    cockpit: ["KPI cockpit", "All metrics, one source of truth"],
    spend: ["Spend & ROI", "Where every dollar is working"],
    alerts: ["Decision alerts", "What needs your attention now"],
    creative: ["Creative lifecycle", "Fatigue, caught before the metrics show it"],
    visibility: ["AI visibility", "Whether AI recommends you — and what to fix"],
    integrations: ["Integrations", "Connect your marketing stack"],
    notifications: ["Notifications", "Briefs, alerts and approvals — in one inbox"],
    memory: ["Memory", "Everything I've learned about your org"],
    connections: ["Connect your data", "Read-only by default, first sync in minutes"],
    health: ["Connection health", "Every source, its freshness and status"],
    team: ["Team & permissions", "Seats, roles and invites"],
    billing: ["Billing & plans", "Your plan, usage and invoices"],
    audit: ["Audit log", "Every action — mine and yours — on the record"],
    settings: ["Settings", "Workspace & team"],
    profile: ["Profile", "You and your preferences"],
    "alert-detail": ["Decision alert", "What changed, why, and what I recommend"],
    "first-run": ["Preparing your first brief", "I'm learning your baseline now"],
  };
  const [title, subtitle] = titles[active] || titles.home;

  return (
    <window.AppShell
      nav={NAV} active={active} onNav={setActive}
      title={title} subtitle={subtitle}
      logoRoot={LOGOROOT} iconRoot={ICONROOT}
      headerRight={<><Bell onClick={() => setActive("alerts")} />
        <button aria-label="Your profile" title="Your profile" onClick={() => setActive("profile")} style={{
          padding: 0, border: "none", background: "transparent", borderRadius: "50%",
          cursor: "pointer", display: "inline-flex", lineHeight: 0,
        }}>
          <Avatar name="Priya Menon" size={42} />
        </button></>}
    >
      {(SCREENS[active] || SCREENS.home)(setActive)}
    </window.AppShell>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
