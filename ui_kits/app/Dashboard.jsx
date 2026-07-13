const { Card, KpiCard, DecisionAlert, Badge, Button, IconButton, Avatar } = window.AlfredAIDesignSystem_1ce241;
const IR = "../../assets/icons";

function Briefing() {
  return (
    <Card tone="ink" radius="var(--radius-2xl)" padding={28} style={{ position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "var(--glow-orange)", opacity: 0.6 }} />
      <div style={{ position: "relative", display: "flex", gap: 24, alignItems: "flex-start" }}>
        <div style={{
          width: 52, height: 52, borderRadius: "var(--radius-lg)", flex: "none",
          background: "var(--gradient-brand)", display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <img src="../../assets/logos/alfred-icon-white.svg" alt="" style={{ height: 28 }} />
        </div>
        <div style={{ flex: 1 }}>
          <Badge tone="brand" dot>Daily Briefing · 8:00 AM</Badge>
          <h2 style={{ color: "#fff", fontSize: "var(--text-h3)", fontWeight: "var(--fw-semibold)", margin: "12px 0 8px", letterSpacing: "var(--ls-tight)" }}>
            Good morning, Priya. Spend is pacing 6% hot — but ROAS is up.
          </h2>
          <p style={{ color: "var(--periwinkle-200)", fontSize: "var(--text-base)", lineHeight: "var(--lh-normal)", maxWidth: 720 }}>
            Paid social drove 38% of pipeline this week. I've flagged two budget reallocations worth an estimated
            <strong style={{ color: "#fff" }}> +$48K in revenue</strong>. Three creatives are entering fatigue.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
            <Button variant="primary" size="sm">Review reallocations</Button>
            <Button variant="ghost" size="sm" style={{ color: "#fff" }}>See full briefing</Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

function AskAlfred() {
  const [q, setQ] = React.useState("");
  const chips = ["Why did CAC rise last week?", "Forecast Q3 pipeline", "Which channel is underspending?"];
  return (
    <Card padding={20} shadow="sm" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <img src="../../assets/logos/alfred-icon.svg" alt="" style={{ height: 26 }} />
        <span style={{ fontWeight: "var(--fw-bold)", fontSize: "var(--text-base)" }}>Ask Alfred</span>
        <Badge tone="info">on-demand</Badge>
      </div>
      <div style={{
        display: "flex", alignItems: "center", gap: 10, padding: "6px 6px 6px 18px",
        background: "var(--gray-50)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-pill)",
      }}>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ask anything about your marketing performance…"
          style={{ flex: 1, border: "none", background: "transparent", outline: "none", fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", color: "var(--text-primary)" }} />
        <Button variant="primary" size="sm" iconRight={<window.NavGlyph d={window.AppGlyphs.send} size={15} />}>Ask</Button>
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {chips.map((c) => (
          <button key={c} onClick={() => setQ(c)} style={{
            border: "1px solid var(--border-default)", background: "var(--surface-card)", cursor: "pointer",
            padding: "7px 14px", borderRadius: "var(--radius-pill)", color: "var(--text-secondary)",
            fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-medium)",
          }}>{c}</button>
        ))}
      </div>
    </Card>
  );
}

function Dashboard() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 1180 }}>
      <Briefing />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        <KpiCard label="Blended ROAS" value="4.8x" delta="+12.4%" direction="up" caption="vs last 30d" icon="trend-up" iconRoot={IR} />
        <KpiCard label="Marketing Spend" value="$312K" delta="+6.1%" direction="up" caption="pacing hot" icon="budget" iconRoot={IR} />
        <KpiCard label="Blended CAC" value="$184" delta="-8.0%" direction="down" caption="improving" icon="channel-mix" iconRoot={IR} />
        <KpiCard label="MQL → SQL" value="34%" delta="0.0%" direction="flat" caption="flat WoW" icon="mql" iconRoot={IR} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.55fr 1fr", gap: 22, alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <h3 style={{ fontSize: "var(--text-h4)", fontWeight: "var(--fw-bold)" }}>Real-time decision alerts</h3>
            <Badge tone="danger" dot>3 need action</Badge>
            <a href="#" onClick={(e) => e.preventDefault()} style={{ marginLeft: "auto", fontSize: "var(--text-sm)", fontWeight: "var(--fw-bold)" }}>View all</a>
          </div>
          <DecisionAlert priority="high" time="12m ago" iconRoot={IR}
            title="Google Ads over budget"
            insight="Brand campaign will exhaust its monthly cap in 4 days at current pacing. Shift $18K to Performance Max to protect non-brand coverage."
            action="Reallocate budget" />
          <DecisionAlert priority="opportunity" time="1h ago" iconRoot={IR}
            title="LinkedIn CPL down 22%"
            insight="Cost-per-lead dropped sharply on the new ABM audience. Alfred recommends scaling spend +30% while efficiency holds."
            action="Scale campaign" />
          <DecisionAlert priority="medium" time="3h ago" iconRoot={IR}
            title="Creative fatigue detected"
            insight="Three Meta creatives crossed the frequency-3.0 threshold; CTR is down 14% over 7 days. Queue refreshes from the creative library." />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <Card padding={22} shadow="sm">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <h3 style={{ fontSize: "var(--text-h4)", fontWeight: "var(--fw-bold)" }}>Channel mix</h3>
              <IconButton name="refresh" iconRoot={IR} variant="ghost" title="Refresh" />
            </div>
            {[["Paid social", 38, "var(--orange-500)"], ["Search", 26, "var(--periwinkle-400)"], ["Email", 18, "var(--orange-300)"], ["Organic", 12, "var(--periwinkle-600)"], ["Other", 6, "var(--gray-200)"]].map(([n, p, c]) => (
              <div key={n} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <span style={{ width: 78, fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}>{n}</span>
                <div style={{ flex: 1, height: 8, background: "var(--gray-100)", borderRadius: "var(--radius-pill)", overflow: "hidden" }}>
                  <div style={{ width: `${p}%`, height: "100%", background: c, borderRadius: "var(--radius-pill)" }} />
                </div>
                <span style={{ width: 34, textAlign: "right", fontSize: "var(--text-sm)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)", fontVariantNumeric: "tabular-nums" }}>{p}%</span>
              </div>
            ))}
          </Card>
          <AskAlfred />
        </div>
      </div>
    </div>
  );
}
window.Dashboard = Dashboard;
