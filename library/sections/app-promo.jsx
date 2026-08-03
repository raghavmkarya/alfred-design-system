/* ============================================================
   Alfred, Inspiration Library · APP PROMO.
   Mobile and app promotion patterns: a phone-mockup hero, a push
   notification stack, a three-moment phone row, and a desk-to-pocket
   continuity band. Every device frame is built entirely from tokens
   (no images, no real store logos: the store badges are plain text
   outline buttons). Every component ships complete default copy:
   a bare <LibAppHero /> is a finished section.
   Compiled to a committed .js twin by scripts/build-kits.mjs;
   catalogued in library/meta/app-promo.json.
   ============================================================ */
const {
  EyebrowBadge, Button, Sparkline,
} = window.AlfredAIDesignSystem_1ce241;

const libContainer = (extra) => ({
  maxWidth: 1120, marginInline: "auto", paddingInline: 40, ...extra,
});
const libDisplay = (size) => ({
  fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)",
  fontSize: size, lineHeight: 1.06, letterSpacing: "-0.02em",
  color: "var(--text-primary)", margin: 0,
});
const libSub = {
  fontFamily: "var(--font-sans)", fontSize: "var(--text-lg)",
  color: "var(--text-secondary)", lineHeight: "var(--lh-relaxed)", margin: 0,
};
/* The instrument layer's voice: true mono, 10-12px, uppercase where it
   labels. Mono never sets headlines or body. */
const libMonoCaps = (extra) => ({
  fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: "var(--fw-medium)",
  letterSpacing: "var(--ls-caps)", textTransform: "uppercase",
  color: "var(--text-muted)", ...extra,
});
const libGhostCta = { background: "transparent", color: "var(--text-primary)", borderColor: "var(--border-default)" };
/* The one gradient element of any section that renders it. */
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

/* ——— the token-built phone frame, shared by every section here ——— */

/* Status glyphs: signal bars and a battery, drawn once, currentColor. */
const libStatusGlyphs = (
  <svg width="34" height="10" viewBox="0 0 34 10" aria-hidden="true" style={{ color: "var(--text-muted)", flexShrink: 0, display: "block" }}>
    <rect x="0" y="6" width="2" height="4" rx="1" fill="currentColor" />
    <rect x="4" y="4" width="2" height="6" rx="1" fill="currentColor" />
    <rect x="8" y="2" width="2" height="8" rx="1" fill="currentColor" />
    <rect x="14.5" y="1" width="15" height="8" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1" />
    <rect x="16.5" y="3" width="8" height="4" rx="1" fill="currentColor" />
    <rect x="31.5" y="3.5" width="1.6" height="3" rx="0.8" fill="currentColor" />
  </svg>
);

/* Rounded device frame div, notch pill, status row. Children are the screen. */
const LibPhone = ({ width = 300, time = "07:00", screenGap = 10, style, children }) => (
  <div style={{
    width: `min(${width}px, 100%)`, boxSizing: "border-box",
    background: "var(--surface-raised)", border: "1px solid var(--border-default)",
    borderRadius: "var(--radius-3xl)", padding: 8,
    boxShadow: "var(--elevation-floating)", ...style,
  }}>
    <div style={{
      background: "var(--bg-page)", border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-2xl)", overflow: "hidden",
      paddingBlock: "10px 16px", paddingInline: 12,
      display: "flex", flexDirection: "column", gap: screenGap,
    }}>
      {/* status row with the notch pill between time and glyphs */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, paddingInline: 4 }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: "var(--fw-semibold)", color: "var(--text-secondary)" }}>{time}</span>
        <span aria-hidden="true" style={{ width: 52, height: 15, borderRadius: "var(--radius-pill)", background: "var(--surface-sunken)", border: "1px solid var(--border-subtle)", flexShrink: 0 }} />
        {libStatusGlyphs}
      </div>
      {children}
    </div>
  </div>
);

/* KpiCard-like row for the mini daily-brief screens. */
const LibMiniKpi = ({ label, value, delta, good = true }) => (
  <div style={{
    background: "var(--surface-card)", border: "1px solid var(--border-subtle)",
    borderRadius: "var(--radius-md)", paddingBlock: 9, paddingInline: 12,
    display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10,
  }}>
    <div style={{ minWidth: 0 }}>
      <div style={libMonoCaps({ fontSize: 9.5 })}>{label}</div>
      <div style={{ fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)", fontSize: 17, letterSpacing: "-0.01em", color: "var(--text-primary)", marginBlockStart: 3 }}>{value}</div>
    </div>
    {delta ? (
      <span style={{
        fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: "var(--fw-semibold)",
        paddingBlock: 3, paddingInline: 7, borderRadius: "var(--radius-pill)", flexShrink: 0,
        background: good ? "var(--success-100)" : "var(--warning-100)",
        color: good ? "var(--text-on-tint-success)" : "var(--text-on-tint-brand)",
      }}>{delta}</span>
    ) : null}
  </div>
);

/* Small screen-header line: title + mono meta. */
const LibScreenHead = ({ title, meta }) => (
  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8, paddingInline: 2 }}>
    <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)" }}>{title}</span>
    {meta ? <span style={libMonoCaps({ fontSize: 9.5 })}>{meta}</span> : null}
  </div>
);

/* Download glyph for the text store badges. */
const libDownloadGlyph = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 4v11" /><path d="M6.5 10.5L12 16l5.5-5.5" /><path d="M5 20h14" />
  </svg>
);

/* === app-hero · split hero with the token-built phone mockup === */
function LibAppHero({
  eyebrow = "Alfred, in your pocket",
  title = "Your morning brief, wherever the morning finds you",
  titleAccent = "wherever",
  sub = "The same chief of staff you have at your desk, on your phone. I brief you at 07:00, flag what moved overnight, and take your approval from anywhere.",
  storeBadges = ["App Store", "Google Play"],
  proofLine = "Free with every Alfred plan. Set up in under a minute.",
  briefTitle = "Morning brief",
  briefMeta = "3 items",
  briefRows = [
    { label: "Spend pacing", value: "$48.2K", delta: "+4%", good: true },
    { label: "Blended ROAS", value: "3.4x", delta: "holding", good: true },
    { label: "Cost per lead", value: "$61", delta: "-9%", good: true },
  ],
  alfredLine = "I'd move $18K to Performance Max. Evidence attached.",
  approveLabel = "Approve",
  laterLabel = "Later",
  phoneTime = "07:00",
}) {
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "var(--bg-page)" }}>
      {/* The glows live on an oversized layer so the orange radial fades to
          transparent INSIDE the section instead of being cut mid-alpha at the
          bottom edge (critic: hard horizontal seam). */}
      <div aria-hidden="true" style={{
        position: "absolute", insetInline: 0, insetBlockStart: 0, height: "130%",
        background: "var(--glow-periwinkle), var(--glow-orange)", pointerEvents: "none",
      }} />
      <div style={libContainer({
        position: "relative", paddingBlock: "96px 88px",
        display: "grid", gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 0.95fr)",
        gap: 56, alignItems: "center",
      })}>
        <div>
          <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
          <h1 style={{ ...libDisplay(50), maxWidth: 560, marginBlockStart: 22 }}>{libAccent(title, titleAccent)}</h1>
          <p style={{ ...libSub, maxWidth: 480, marginBlockStart: 20 }}>{sub}</p>
          {/* text store badges: plain outline buttons, deliberately no store logos */}
          <div style={{ display: "flex", gap: 12, marginBlockStart: 32, flexWrap: "wrap" }}>
            {storeBadges.map((label) => (
              <Button key={label} variant="outline" size="lg" style={libGhostCta} iconLeft={libDownloadGlyph}>{label}</Button>
            ))}
          </div>
          {proofLine ? (
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)", marginBlockStart: 18, marginBlockEnd: 0 }}>{proofLine}</p>
          ) : null}
        </div>
        {/* the phone, built entirely from tokens */}
        <div style={{ display: "flex", justifyContent: "center", minWidth: 0 }}>
          <LibPhone width={310} time={phoneTime}>
            <LibScreenHead title={briefTitle} meta={briefMeta} />
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {briefRows.map((r, i) => <LibMiniKpi key={i} {...r} />)}
            </div>
            <div style={{
              background: "var(--surface-card)", border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-md)", paddingBlock: 12, paddingInline: 12,
            }}>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-primary)", lineHeight: "var(--lh-normal)", margin: 0 }}>{alfredLine}</p>
              <div style={{ display: "flex", gap: 8, marginBlockStart: 12 }}>
                <Button variant="primary" size="sm">{approveLabel}</Button>
                <Button variant="ghost" size="sm">{laterLabel}</Button>
              </div>
            </div>
          </LibPhone>
        </div>
      </div>
    </section>
  );
}

/* === notif-stack · overlapping Alfred push notifications === */

const LIB_NOTIFS = [
  { name: "Alfred", time: "Mon 07:00", message: "Morning brief ready. Three decisions, ranked by impact." },
  { name: "Alfred", time: "Tue 11:42", message: "CPL drift on two search campaigns. I've traced the cause." },
  { name: "Alfred", time: "now", message: "Reallocation ready: $18K from Search to Performance Max. Evidence attached." },
];

/* The 16px app mark: a periwinkle-tinted square with the Alfred initial. */
const LibNotifMark = () => (
  <span aria-hidden="true" style={{
    width: 22, height: 22, borderRadius: "var(--radius-xs)", flexShrink: 0,
    background: "var(--info-100)", color: "var(--text-on-tint-info)",
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)", fontSize: 12,
  }}>A</span>
);

function LibNotifStack({
  eyebrow = "Push, with judgement",
  title = "The decision finds you",
  titleAccent = "finds you",
  sub = "I don't ping you about everything. I ping you when a number crosses a threshold you set, with the recommendation and the evidence in the notification itself.",
  bullets = [
    "One push per decision, never a feed to clear",
    "Thresholds you set, in plain language",
    "Approve or defer without opening the app",
  ],
  deliveryLine = "Quiet hours respected · everything logged to the record",
  notifications = LIB_NOTIFS,
  approveLabel = "Approve",
  deferLabel = "Defer to Monday",
}) {
  const back = notifications.slice(0, -1);
  const front = notifications[notifications.length - 1];
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({
        paddingBlock: "88px 88px",
        display: "grid", gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 0.95fr)",
        gap: 64, alignItems: "center",
      })}>
        <div>
          <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
          <h2 style={{ ...libDisplay(44), marginBlockStart: 20 }}>{libAccent(title, titleAccent)}</h2>
          <p style={{ ...libSub, fontSize: "var(--text-base)", maxWidth: 460, marginBlockStart: 18 }}>{sub}</p>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, marginBlockStart: 24, display: "flex", flexDirection: "column", gap: 10 }}>
            {bullets.map((b, i) => (
              <li key={i} style={{ display: "flex", gap: 10, alignItems: "center", fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", color: "var(--text-secondary)" }}>
                <span aria-hidden="true" style={{ width: 5, height: 5, borderRadius: "var(--radius-circle)", background: "var(--text-muted)", flexShrink: 0 }} />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <p style={{ ...libMonoCaps({}), marginBlockStart: 28, marginBlockEnd: 0 }}>{deliveryLine}</p>
        </div>
        {/* the stack: two collapsed notifications peeking above the live one */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "stretch", maxWidth: 420, marginInline: "auto", width: "100%", minWidth: 0 }}>
          {back.map((n, i) => (
            <div key={i} style={{
              background: "var(--surface-card)", border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-lg)", paddingBlock: 11, paddingInline: 16,
              marginInline: (back.length - i) * 14, marginBlockEnd: -16,
              boxShadow: "var(--elevation-raised)", opacity: 0.85 + i * 0.07,
              position: "relative", zIndex: i + 1,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <LibNotifMark />
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)" }}>{n.name}</span>
                <span style={{ ...libMonoCaps({ fontSize: 9.5 }), marginInlineStart: "auto", flexShrink: 0 }}>{n.time}</span>
              </div>
              <p style={{
                fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-secondary)",
                margin: 0, marginBlockStart: 7, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
              }}>{n.message}</p>
            </div>
          ))}
          <div style={{
            background: "var(--surface-card)", border: "1px solid var(--border-default)",
            borderRadius: "var(--radius-lg)", paddingBlock: 16, paddingInline: 18,
            boxShadow: "var(--elevation-floating)", position: "relative", zIndex: back.length + 1,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <LibNotifMark />
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)" }}>{front.name}</span>
              <span style={{ ...libMonoCaps({ fontSize: 9.5 }), marginInlineStart: "auto", flexShrink: 0 }}>{front.time}</span>
            </div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-primary)", lineHeight: "var(--lh-normal)", margin: 0, marginBlockStart: 10 }}>{front.message}</p>
            <div style={{ display: "flex", gap: 8, marginBlockStart: 14 }}>
              <Button variant="primary" size="sm">{approveLabel}</Button>
              <Button variant="ghost" size="sm">{deferLabel}</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* === phone-row · three small phones, three moments === */

const LIB_MOMENTS = [
  {
    kind: "brief", time: "07:00", caption: "The brief",
    detail: "Three ranked decisions on your lock screen before your first coffee.",
  },
  {
    kind: "flag", time: "11:42", caption: "The flag",
    detail: "A number crosses your threshold. I trace the cause before I ping you.",
  },
  {
    kind: "approval", time: "16:05", caption: "The approval",
    detail: "One tap ships the change, logged to the decision record.",
  },
];

const LibMomentScreen = ({ kind }) => {
  if (kind === "flag") {
    return (
      <>
        <LibScreenHead title="Flag" meta="traced" />
        <div style={{
          background: "var(--warning-100)", borderRadius: "var(--radius-md)",
          paddingBlock: 10, paddingInline: 12,
        }}>
          <div style={libMonoCaps({ fontSize: 9.5, color: "var(--text-on-tint-brand)" })}>CPL drift</div>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--text-primary)", lineHeight: "var(--lh-normal)", margin: 0, marginBlockStart: 5 }}>Search CPL up for the third straight week.</p>
        </div>
        <div style={{ paddingInline: 2 }}>
          <Sparkline points={[52, 53, 55, 54, 58, 61]} width={158} height={36} ariaLabel="Cost per lead, rising over six weeks" />
          <div style={{ ...libMonoCaps({ fontSize: 9 }), marginBlockStart: 4 }}>6 weeks · cost per lead</div>
        </div>
      </>
    );
  }
  if (kind === "approval") {
    return (
      <>
        <LibScreenHead title="Approval" meta="1 waiting" />
        <div style={{
          background: "var(--surface-card)", border: "1px solid var(--border-subtle)",
          borderRadius: "var(--radius-md)", paddingBlock: 11, paddingInline: 12,
        }}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: "var(--fw-semibold)", color: "var(--text-primary)", lineHeight: "var(--lh-normal)", margin: 0 }}>Move $18K to Performance Max?</p>
          <div style={{ ...libMonoCaps({ fontSize: 9 }), marginBlockStart: 6 }}>evidence · 3 sources</div>
          <div style={{ display: "flex", gap: 7, marginBlockStart: 11 }}>
            <Button variant="primary" size="sm">Approve</Button>
            <Button variant="ghost" size="sm">Details</Button>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <LibScreenHead title="Morning brief" meta="3 items" />
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        <LibMiniKpi label="Spend pacing" value="$48.2K" delta="+4%" good />
        <LibMiniKpi label="Cost per lead" value="$61" delta="-9%" good />
      </div>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--text-secondary)", lineHeight: "var(--lh-normal)", margin: 0, paddingInline: 2 }}>Nothing else needs you before nine.</p>
    </>
  );
};

function LibPhoneRow({
  eyebrow = "One day with the app",
  title = "Three moments, one thread",
  titleAccent = "one thread",
  sub = "The app is not a smaller dashboard. It is the three moments of a decision, delivered to your pocket in order.",
  moments = LIB_MOMENTS,
}) {
  return (
    <section style={{ background: "var(--surface-sunken)", borderBlock: "1px solid var(--border-subtle)" }}>
      <div style={libContainer({ paddingBlock: "88px 88px", textAlign: "center" })}>
        <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
        <h2 style={{ ...libDisplay(44), maxWidth: 640, marginInline: "auto", marginBlockStart: 20 }}>{libAccent(title, titleAccent)}</h2>
        <p style={{ ...libSub, fontSize: "var(--text-base)", maxWidth: 520, marginBlockStart: 18, marginInline: "auto" }}>{sub}</p>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(220px, 100%), 1fr))",
          gap: 32, marginBlockStart: 52, alignItems: "start", justifyItems: "center",
        }}>
          {moments.map((m, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 0, width: "100%" }}>
              <LibPhone width={216} time={m.time} screenGap={9}>
                <LibMomentScreen kind={m.kind} />
              </LibPhone>
              <div style={{ marginBlockStart: 20, maxWidth: 240 }}>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)" }}>{m.caption}</div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: "var(--lh-normal)", margin: 0, marginBlockStart: 6 }}>{m.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* === handoff-band · desk-to-pocket continuity === */

function LibHandoffBand({
  eyebrow = "Continuity",
  title = "Start at your desk. Approve from the lift.",
  titleAccent = "lift",
  sub = "A flag raised on the big screen is the same record on the small one. Pick the decision up wherever you are; the trail stays whole.",
  deskLabel = "Meridian :: weekly review",
  deskMeta = "08:12 · desk",
  deskFlag = "Flagged: $18K below target return",
  deskDetail = "Evidence attached · waiting on you",
  phoneTime = "08:31",
  phoneTitle = "Reallocation",
  phoneStatus = "Approved from the lift",
  phoneMeta = "08:31 · logged to the record",
  footLine = "One decision record · every screen",
}) {
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({ paddingBlock: "88px 84px" })}>
        <div style={{ textAlign: "center" }}>
          <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
          <h2 style={{ ...libDisplay(44), maxWidth: 680, marginInline: "auto", marginBlockStart: 20 }}>{libAccent(title, titleAccent)}</h2>
          <p style={{ ...libSub, fontSize: "var(--text-base)", maxWidth: 520, marginBlockStart: 18, marginInline: "auto" }}>{sub}</p>
        </div>
        <div style={{
          display: "grid", gridTemplateColumns: "minmax(0, 1.25fr) minmax(72px, 0.45fr) minmax(0, 0.85fr)",
          alignItems: "center", gap: 0, marginBlockStart: 56,
        }}>
          {/* the desk */}
          <div style={{
            background: "var(--surface-card)", border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-lg)", overflow: "hidden", boxShadow: "var(--elevation-raised)", minWidth: 0,
          }}>
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10,
              paddingBlock: 10, paddingInline: 18, borderBlockEnd: "1px solid var(--border-subtle)", flexWrap: "wrap",
            }}>
              <span style={libMonoCaps({ color: "var(--text-secondary)" })}>{deskLabel}</span>
              <span style={libMonoCaps({})}>{deskMeta}</span>
            </div>
            <div style={{ paddingBlock: 22, paddingInline: 18, display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(120px, 100%), 1fr))", gap: 8 }}>
                <LibMiniKpi label="Spend pacing" value="$48.2K" delta="+4%" good />
                <LibMiniKpi label="Blended ROAS" value="3.4x" delta="holding" good />
              </div>
              <div style={{
                background: "var(--warning-100)", borderRadius: "var(--radius-md)",
                paddingBlock: 11, paddingInline: 13, display: "flex", alignItems: "flex-start", gap: 10,
              }}>
                <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: "var(--radius-circle)", background: "var(--accent)", flexShrink: 0, marginBlockStart: 5 }} />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-semibold)", color: "var(--text-primary)" }}>{deskFlag}</div>
                  <div style={{ ...libMonoCaps({ fontSize: 9.5 }), marginBlockStart: 4 }}>{deskDetail}</div>
                </div>
              </div>
            </div>
          </div>
          {/* the dotted path, with its one accent dot mid-journey */}
          <div aria-hidden="true" style={{ position: "relative", alignSelf: "center", borderBlockStart: "2px dashed var(--border-default)", marginInline: 10 }}>
            <span style={{
              position: "absolute", insetBlockStart: "50%", insetInlineStart: "50%",
              transform: "translate(-50%, -50%)", width: 10, height: 10,
              borderRadius: "var(--radius-circle)", background: "var(--accent)",
              boxShadow: "var(--shadow-phosphor)",
            }} />
          </div>
          {/* the pocket */}
          <div style={{ display: "flex", justifyContent: "center", minWidth: 0 }}>
            <LibPhone width={212} time={phoneTime} screenGap={9}>
              <LibScreenHead title={phoneTitle} meta="synced" />
              <div style={{
                background: "var(--success-100)", borderRadius: "var(--radius-md)",
                paddingBlock: 11, paddingInline: 12,
              }}>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: "var(--fw-semibold)", color: "var(--text-on-tint-success)" }}>{phoneStatus}</div>
                <div style={{ ...libMonoCaps({ fontSize: 9 }), marginBlockStart: 5 }}>{phoneMeta}</div>
              </div>
            </LibPhone>
          </div>
        </div>
        <p style={{ ...libMonoCaps({}), textAlign: "center", marginBlockStart: 44, marginBlockEnd: 0 }}>{footLine}</p>
      </div>
    </section>
  );
}

window.LibAppHero = LibAppHero;
window.LibNotifStack = LibNotifStack;
window.LibPhoneRow = LibPhoneRow;
window.LibHandoffBand = LibHandoffBand;
