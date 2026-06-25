/* ============================================================
   Alfred workspace — flagship product screens (part 2).
   Daily Briefing · Seek Alfred · Creative Lifecycle · AI Visibility.
   Light theme. Composed from the design-system primitives, matching
   Screens.jsx (soft cards, gradient accents, first-person voice).
   Each component is self-contained so scripts/verify-render.mjs can
   server-render it prop-less.
   ============================================================ */
const { Card, KpiCard, DecisionAlert, Badge, Button, Icon, Banner, Table,
  SignalCard, AgentStatus, BarChart, LineChart, DonutChart, Chip } =
  window.AlfredAIDesignSystem_1ce241;
const ICN = "../../assets/icons";
const LOGO = "../../assets/logos";

/* ——— shared bits ——— */
const Head = ({ title, sub, right }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
    <div>
      <h3 style={{ fontSize: "var(--text-h4)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-tight)" }}>{title}</h3>
      {sub && <div style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)", marginTop: 2 }}>{sub}</div>}
    </div>
    {right && <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>{right}</div>}
  </div>
);

const SendGlyph = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12 21 4l-7 17-3-7-7-3Z" /></svg>
);

/* A small colored progress bar with a label — used where the bundle ProgressBar's
   gradient/plain tones aren't expressive enough (severity reds/ambers/greens). */
function MeterRow({ label, value, color, suffix = "%" }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: "var(--text-xs)" }}>
        <span style={{ color: "var(--text-muted)" }}>{label}</span>
        <span style={{ fontWeight: "var(--fw-bold)", color, fontVariantNumeric: "tabular-nums" }}>{value}{suffix}</span>
      </div>
      <div style={{ height: 8, background: "var(--gray-100)", borderRadius: "var(--radius-pill)", overflow: "hidden" }}>
        <div style={{ width: `${value}%`, height: "100%", background: color, borderRadius: "var(--radius-pill)" }} />
      </div>
    </div>
  );
}

/* ======================= DAILY BRIEFING ======================= */
function DailyBrief() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 1180 }}>
      {/* hero — the full morning narrative */}
      <Card tone="ink" radius="var(--radius-2xl)" padding={30} style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "var(--glow-orange)", opacity: 0.6 }} />
        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <Badge tone="brand" dot>Daily Briefing · 8:00 AM</Badge>
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "var(--text-xs)" }}>Tuesday, 11 June · 90-second read</span>
          </div>
          <h2 style={{ color: "#fff", fontSize: "var(--text-h2)", fontWeight: "var(--fw-semibold)", margin: "14px 0 10px", letterSpacing: "var(--ls-tight)", maxWidth: 840, lineHeight: 1.15 }}>
            Good morning, Priya. Spend is pacing 6% hot — but ROAS climbed to 4.8x and pipeline is up 19%.
          </h2>
          <p style={{ color: "var(--periwinkle-200)", fontSize: "var(--text-lg)", lineHeight: "var(--lh-relaxed)", maxWidth: 840, margin: 0 }}>
            Paid social carried 38% of pipeline this week. Two reallocations are worth an estimated
            <strong style={{ color: "#fff" }}> +$48K in revenue</strong>, and three creatives are entering fatigue before
            the numbers show it. I've drafted every action below — you'll spend more time deciding than reading.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 20, flexWrap: "wrap" }}>
            <Button variant="primary" size="md">Review 2 decisions</Button>
            <Button variant="ghost" size="md" style={{ color: "#fff" }}>Listen to the brief</Button>
          </div>
        </div>
      </Card>

      {/* overnight movement */}
      <div>
        <Head title="While you were away" sub="What moved overnight, ranked by impact" right={<Badge tone="neutral">Synced 6:02 AM</Badge>} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          <KpiCard label="Blended ROAS" value="4.8x" delta="+12.4%" direction="up" caption="vs last 30d" icon="trend-up" iconRoot={ICN} />
          <KpiCard label="Pipeline created" value="$2.68M" delta="+19.5%" direction="up" caption="this quarter" icon="trend-up" iconRoot={ICN} />
          <KpiCard label="Wasted spend" value="$11.4K" delta="-31%" direction="down" caption="I reclaimed" icon="trend-down" iconRoot={ICN} />
          <KpiCard label="Spend pacing" value="106%" delta="+6.0%" direction="flat" caption="of monthly plan" icon="budget" iconRoot={ICN} />
        </div>
      </div>

      {/* decisions + agenda */}
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 22, alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Head title="Needs a decision today" sub="I've drafted each — approve and I'll execute" />
          <DecisionAlert priority="high" time="overnight" iconRoot={ICN}
            title="Google Ads brand campaign will cap out in 4 days"
            insight="At current pacing the brand campaign exhausts its monthly budget by Saturday, leaving non-brand uncovered into the weekend. I'd move $18K to Performance Max to hold coverage."
            action="Reallocate $18K" />
          <DecisionAlert priority="opportunity" time="overnight" iconRoot={ICN}
            title="LinkedIn CPL fell 22% on the new ABM audience"
            insight="Cost-per-lead dropped sharply and is holding. Scaling spend +30% while efficiency lasts is worth an estimated +$30K in pipeline this month."
            action="Scale +30%" />
          <DecisionAlert priority="medium" time="overnight" iconRoot={ICN}
            title="Three Meta creatives are entering fatigue"
            insight="Frequency crossed 3.0 and CTR is down 14% over seven days in the 25–34 segment. I've queued refreshes from your creative library for approval."
            action="Approve refreshes" />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <Card padding={22} shadow="sm">
            <Head title="Steady — no action needed" />
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <SignalCard tone="action" label="Holding" statement="Email open rate held at 41%" trace="Subject-line test concluded; I'll keep watching the next send." />
              <SignalCard tone="truth" label="Reconciled" statement="GA4 and HubSpot agree on attribution" trace="No discrepancy this cycle — your board numbers will match." />
            </div>
          </Card>
          <Card tone="gradient" padding={22} style={{ position: "relative", overflow: "hidden" }}>
            <div style={{ color: "#fff" }}>
              <div style={{ fontWeight: "var(--fw-bold)", fontSize: "var(--text-base)", marginBottom: 6 }}>Delivered the way you read</div>
              <div style={{ fontSize: "var(--text-sm)", opacity: 0.92, lineHeight: "var(--lh-normal)", marginBottom: 14 }}>
                This brief reaches you at 8:00 AM on email, Slack, and in-app — every weekday.
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["Email", "Slack", "In-app"].map((c) => (
                  <span key={c} style={{ padding: "5px 12px", borderRadius: "var(--radius-pill)", background: "rgba(255,255,255,0.18)", color: "#fff", fontSize: "var(--text-xs)", fontWeight: "var(--fw-bold)" }}>{c}</span>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ======================= SEEK ALFRED ======================= */
function SeekAlfred() {
  const [q, setQ] = React.useState("Why did CAC rise last week?");
  const chips = ["Forecast Q3 pipeline", "Which channel is underspending?", "What's my most efficient campaign?", "How is AI visibility trending?"];
  const follow = ["Break this down by week", "What would fixing it cost?", "Draft the reallocation"];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 1180 }}>
      {/* ask bar */}
      <Card padding={20} shadow="sm" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src={`${LOGO}/alfred-icon.svg`} alt="" style={{ height: 26 }} />
          <span style={{ fontWeight: "var(--fw-bold)", fontSize: "var(--text-base)" }}>Seek Alfred</span>
          <Badge tone="info">on-demand · grounded in your data</Badge>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 6px 6px 18px", background: "var(--gray-50)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-pill)" }}>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ask anything about your marketing performance…"
            style={{ flex: 1, border: "none", background: "transparent", outline: "none", fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", color: "var(--ink-900)" }} />
          <Button variant="primary" size="sm" iconRight={<SendGlyph />}>Ask</Button>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {chips.map((c) => <Chip key={c} onClick={() => setQ(c)}>{c}</Chip>)}
        </div>
      </Card>

      {/* answer + reasoning rail */}
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 22, alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div style={{ background: "var(--orange-50)", color: "var(--ink-800)", padding: "10px 16px", borderRadius: "var(--radius-xl)", fontSize: "var(--text-base)", fontWeight: "var(--fw-medium)", maxWidth: 460 }}>
              Why did CAC rise last week?
            </div>
          </div>

          <Card padding={24} shadow="sm">
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <span style={{ width: 30, height: 30, borderRadius: "var(--radius-md)", background: "var(--gradient-brand)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                <img src={`${LOGO}/alfred-icon-white.svg`} alt="" style={{ height: 17 }} />
              </span>
              <span style={{ fontWeight: "var(--fw-bold)", fontSize: "var(--text-base)" }}>Alfred</span>
              <Badge tone="success" dot>answered in 4s</Badge>
            </div>
            <p style={{ fontSize: "var(--text-lg)", lineHeight: "var(--lh-relaxed)", color: "var(--ink-900)", margin: "0 0 16px" }}>
              Blended CAC rose <strong>8% to $184</strong> last week, and it's almost entirely one channel: <strong>Meta</strong>.
              Creative fatigue in the 25–34 segment pushed frequency past 3.0, so CTR fell 14% and you paid more for the same
              conversions. Search and LinkedIn CAC actually improved.
            </p>

            <Card tone="sunken" shadow="none" padding={18} style={{ marginBottom: 16 }}>
              <Head title="CAC by channel · last 7 days" />
              <BarChart height={150} data={[
                { label: "Meta", value: 248, display: "$248", color: "var(--orange-500)" },
                { label: "Search", value: 142, display: "$142", color: "var(--periwinkle-400)" },
                { label: "LinkedIn", value: 196, display: "$196", color: "var(--periwinkle-500)" },
                { label: "YouTube", value: 320, display: "$320", color: "var(--orange-300)" },
                { label: "Blended", value: 184, display: "$184" },
              ]} />
            </Card>

            <p style={{ fontSize: "var(--text-base)", lineHeight: "var(--lh-relaxed)", color: "var(--ink-700)", margin: "0 0 18px" }}>
              Refreshing the three fatigued Meta creatives should pull Meta CAC back toward $205 within a week, recovering an
              estimated <strong>$9K</strong> in efficiency this month.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Button variant="primary" size="sm">Queue creative refreshes</Button>
              <Button variant="outline" size="sm">Open Creative Lifecycle</Button>
            </div>
          </Card>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {follow.map((c) => <Chip key={c}>{c}</Chip>)}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <AgentStatus query="Why did CAC rise last week?" activeStep={4} autoplay={false}
            footer="Reasoned across 4 sources · 14 months of history"
            steps={["Pulled CAC by channel", "Correlated with creative frequency", "Isolated the 25–34 segment", "Modelled the recovery"]} />
          <Card padding={20} shadow="sm">
            <Head title="Sources" sub="What grounded this answer" />
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[["Meta Ads", "creative · frequency · CTR"], ["GA4", "sessions · conversions"], ["HubSpot", "CAC · pipeline"], ["Google Ads", "search CAC"]].map(([n, d]) => (
                <div key={n} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--success-500)", flex: "none" }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "var(--text-sm)", fontWeight: "var(--fw-bold)", color: "var(--ink-900)" }}>{n}</div>
                    <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>{d}</div>
                  </div>
                  <Badge tone="success" dot>live</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ======================= CREATIVE LIFECYCLE ======================= */
function CreativeLifecycle() {
  const creatives = [
    { name: "Spring Launch — Hero A", ch: "Meta", freq: "3.4", fatigue: 86, ctr: "-18%", rec: "Refresh", tone: "danger", color: "var(--orange-400)" },
    { name: "ABM Carousel — Tier 1", ch: "LinkedIn", freq: "2.1", fatigue: 38, ctr: "+4%", rec: "Keep live", tone: "success", color: "var(--periwinkle-500)" },
    { name: "Retargeting — Testimonial", ch: "Meta", freq: "3.1", fatigue: 72, ctr: "-12%", rec: "Rotate", tone: "warning", color: "var(--orange-500)" },
    { name: "PMax — Asset Group 2", ch: "Google", freq: "2.6", fatigue: 54, ctr: "-6%", rec: "Rotate", tone: "warning", color: "var(--periwinkle-400)" },
    { name: "Brand Film — 15s", ch: "YouTube", freq: "1.4", fatigue: 22, ctr: "+1%", rec: "Keep live", tone: "success", color: "var(--orange-300)" },
    { name: "Promo — Static B", ch: "Meta", freq: "3.6", fatigue: 91, ctr: "-21%", rec: "Pause", tone: "danger", color: "var(--periwinkle-600)" },
  ];
  const sev = (f) => (f >= 75 ? "var(--danger-500)" : f >= 50 ? "var(--orange-500)" : "var(--success-500)");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 1180 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        <KpiCard label="Creatives live" value="24" delta="+3" direction="flat" caption="across 4 channels" icon="channel-mix" iconRoot={ICN} />
        <KpiCard label="Entering fatigue" value="3" delta="+2" direction="down" caption="frequency > 3.0" icon="alert-warning" iconRoot={ICN} />
        <KpiCard label="Avg. frequency" value="2.8" delta="+0.4" direction="flat" caption="last 7 days" icon="trend-up" iconRoot={ICN} />
        <KpiCard label="CTR (7-day)" value="1.9%" delta="-9.0%" direction="down" caption="blended" icon="trend-down" iconRoot={ICN} />
      </div>

      <Banner tone="warning" title="Three creatives crossed the frequency-3.0 threshold in the 25–34 segment"
        action={<Button variant="primary" size="sm">Queue all refreshes</Button>}>
        I caught this before it showed in aggregate CTR. Refreshing now recovers an estimated $9K in efficiency this month —
        your spend hasn't noticed the fatigue yet, but I have.
      </Banner>

      <div>
        <Head title="Creative library" sub="Asset-level fatigue, scored continuously" right={<Badge tone="neutral">Updated 11m ago</Badge>} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {creatives.map((c) => (
            <Card key={c.name} interactive padding={0} shadow="sm" style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ height: 92, background: c.color, position: "relative", display: "flex", alignItems: "flex-start", justifyContent: "flex-end", padding: 12 }}>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(255,255,255,0.18), rgba(2,2,30,0.12))" }} />
                <span style={{ position: "relative", padding: "4px 10px", borderRadius: "var(--radius-pill)", background: "rgba(255,255,255,0.92)", color: "var(--ink-800)", fontSize: "var(--text-2xs)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-caps)", textTransform: "uppercase" }}>{c.ch}</span>
              </div>
              <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ fontWeight: "var(--fw-bold)", color: "var(--ink-900)", fontSize: "var(--text-base)" }}>{c.name}</div>
                <MeterRow label="Fatigue" value={c.fatigue} color={sev(c.fatigue)} />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--text-sm)", color: "var(--ink-600)" }}>
                  <span>Frequency <strong style={{ color: "var(--ink-900)" }}>{c.freq}</strong></span>
                  <span>CTR <strong style={{ color: c.ctr.startsWith("-") ? "var(--danger-500)" : "var(--success-500)" }}>{c.ctr}</strong></span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, borderTop: "1px solid var(--border-subtle)", paddingTop: 12 }}>
                  <Badge tone={c.tone} dot>{c.rec}</Badge>
                  <Button variant="subtle" size="sm" style={{ marginLeft: "auto" }}>Review</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 22, alignItems: "start" }}>
        <Card padding={24} shadow="sm">
          <Head title="Engagement decay — Spring Launch Hero A" sub="CTR index, last 7 weeks" />
          <LineChart height={170} points={[100, 98, 94, 88, 79, 71, 64]} labels={["W1", "W2", "W3", "W4", "W5", "W6", "W7"]} />
        </Card>
        <Card tone="ink" padding={24} radius="var(--radius-2xl)" style={{ position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "var(--glow-orange)", opacity: 0.5 }} />
          <div style={{ position: "relative" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <img src={`${LOGO}/alfred-icon-white.svg`} alt="" style={{ height: 22 }} />
              <span style={{ color: "#fff", fontWeight: "var(--fw-bold)", fontSize: "var(--text-base)" }}>My recommendation</span>
            </div>
            <p style={{ color: "var(--periwinkle-200)", fontSize: "var(--text-base)", lineHeight: "var(--lh-relaxed)", margin: "0 0 16px" }}>
              Pause <strong style={{ color: "#fff" }}>Promo — Static B</strong> now and refresh the two Spring Launch assets within
              48 hours. The audience has seen them 3.6 times on average; another week at this frequency costs roughly
              <strong style={{ color: "#fff" }}> $9K</strong> in lost efficiency.
            </p>
            <Button variant="primary" size="sm" fullWidth>Approve plan</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ======================= AI VISIBILITY ======================= */
function AiVisibility() {
  const engines = [
    { name: "ChatGPT", score: 82, note: "Cited in 82% of category prompts", tone: "var(--success-500)" },
    { name: "Perplexity", score: 74, note: "Cited, usually as a secondary source", tone: "var(--success-500)" },
    { name: "Google AI Overviews", score: 61, note: "Appears for branded queries", tone: "var(--orange-500)" },
    { name: "Claude", score: 57, note: "Mentioned, not always linked", tone: "var(--orange-500)" },
    { name: "Gemini", score: 38, note: "Rarely surfaced in answers", tone: "var(--danger-500)" },
  ];
  const fixCols = [
    { key: "fix", header: "Recommended fix" },
    { key: "impact", header: "Impact", align: "right", render: (v) => <Badge tone={v === "High" ? "brand" : "info"}>{v}</Badge> },
    { key: "effort", header: "Effort", align: "right", render: (v) => <Badge tone={v === "Low" ? "success" : v === "Med" ? "warning" : "danger"}>{v}</Badge> },
  ];
  const fixRows = [
    { fix: "Add Product & FAQ schema to /platform", impact: "High", effort: "Low" },
    { fix: "Earn 3 citations on AI-ranked comparison sites", impact: "High", effort: "Med" },
    { fix: "Fix 4 factual inconsistencies in llms.txt", impact: "Med", effort: "Low" },
    { fix: "Strengthen authority for ‘decision intelligence’", impact: "Med", effort: "High" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 1180 }}>
      {/* score + read */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 22, alignItems: "stretch" }}>
        <Card padding={24} shadow="sm" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, justifyContent: "center" }}>
          <DonutChart size={184} thickness={20} centerLabel="72" centerSub="out of 100"
            segments={[{ label: "Score", value: 72, color: "var(--orange-500)" }, { label: "Gap", value: 28, color: "transparent" }]} />
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Badge tone="success" dot>+9 vs last month</Badge>
            <Badge tone="neutral">Top 3 in category</Badge>
          </div>
        </Card>

        <Card tone="gradient" padding={28} style={{ position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ color: "#fff" }}>
            <div style={{ fontSize: "var(--text-2xs)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-caps)", textTransform: "uppercase", opacity: 0.9, marginBottom: 10 }}>AI Visibility Score · unique to Alfred</div>
            <p style={{ fontSize: "var(--text-h4)", fontWeight: "var(--fw-semibold)", lineHeight: 1.3, margin: "0 0 14px", letterSpacing: "var(--ls-tight)" }}>
              Your buyers are asking AI which marketing platform to use. Right now you're the answer 72% of the time.
            </p>
            <p style={{ fontSize: "var(--text-base)", lineHeight: "var(--lh-relaxed)", opacity: 0.95, margin: 0 }}>
              You're strong on ChatGPT and Perplexity but barely surface on Gemini. The three fixes I've prioritised would lift
              you to an estimated <strong>81</strong> within a quarter.
            </p>
          </div>
        </Card>
      </div>

      {/* component scores */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        <KpiCard label="Citation rate" value="68%" delta="+11%" direction="up" caption="in AI answers" icon="trend-up" iconRoot={ICN} />
        <KpiCard label="Structured-data" value="74%" delta="+6%" direction="up" caption="schema completeness" icon="web-clarity" iconRoot={ICN} />
        <KpiCard label="Share of voice" value="22%" delta="+3%" direction="up" caption="vs 6 competitors" icon="channel-mix" iconRoot={ICN} />
        <KpiCard label="Factual accuracy" value="91%" delta="-2%" direction="flat" caption="of AI claims correct" icon="audit-log" iconRoot={ICN} />
      </div>

      {/* engines + fixes */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, alignItems: "start" }}>
        <Card padding={24} shadow="sm">
          <Head title="Where you're cited" sub="Presence across AI answer engines" />
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {engines.map((e) => (
              <div key={e.name}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
                  <span style={{ fontSize: "var(--text-sm)", fontWeight: "var(--fw-bold)", color: "var(--ink-900)" }}>{e.name}</span>
                  <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>{e.note}</span>
                </div>
                <div style={{ height: 8, background: "var(--gray-100)", borderRadius: "var(--radius-pill)", overflow: "hidden" }}>
                  <div style={{ width: `${e.score}%`, height: "100%", background: e.tone, borderRadius: "var(--radius-pill)" }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card padding={24} shadow="sm">
          <Head title="Prioritised fixes" sub="Ranked by impact, then effort" right={<Button variant="subtle" size="sm">Export</Button>} />
          <Table columns={fixCols} rows={fixRows} />
        </Card>
      </div>
    </div>
  );
}

window.DailyBrief = DailyBrief;
window.SeekAlfred = SeekAlfred;
window.CreativeLifecycle = CreativeLifecycle;
window.AiVisibility = AiVisibility;
