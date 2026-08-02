/* ============================================================
   Alfred, Inspiration Library · CTA AND CAPTURE.
   Five conversion patterns distilled from the competitor sweep,
   rebuilt on design-system tokens so they render truthfully in
   light and in data-theme="dark". Every component ships complete
   default copy: a bare <LibCtaBand /> is a finished section.
   Compiled to a committed .js twin by scripts/build-kits.mjs;
   catalogued in library/meta/cta-capture.json.
   ============================================================ */
const { EyebrowBadge, Button } = window.AlfredAIDesignSystem_1ce241;

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
const libFine = {
  fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)",
  color: "var(--text-muted)", margin: 0, lineHeight: "var(--lh-normal)",
};
const libEyebrowText = {
  fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)",
  fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-caps)",
  textTransform: "uppercase", margin: 0,
};
const libLabel = {
  fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)",
  fontWeight: "var(--fw-semibold)", color: "var(--text-primary)",
};
const libCard = (extra) => ({
  background: "var(--surface-card)", border: "1px solid var(--border-subtle)",
  borderRadius: "var(--radius-2xl)", boxShadow: "var(--elevation-raised)", ...extra,
});
const libField = {
  boxSizing: "border-box", width: "100%", height: 48, paddingInline: 16,
  borderRadius: "var(--radius-md)", border: "1px solid var(--border-default)",
  background: "var(--surface-input-plain)", color: "var(--text-primary)",
  fontFamily: "var(--font-sans)", fontSize: "var(--text-base)",
};
const libArea = {
  ...libField, height: "auto", minHeight: 96, paddingBlock: 12,
  resize: "vertical", lineHeight: "var(--lh-normal)",
};
const libGhostCta = { background: "transparent", color: "var(--text-primary)", borderColor: "var(--border-default)" };
const LibGradientText = ({ children }) => (
  <span style={{ background: "var(--gradient-brand)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>{children}</span>
);
const libCheckGlyph = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0, marginBlockStart: 4 }}>
    <path d="M4 12.5l5.5 5.5L20 6.5" />
  </svg>
);
/* Post-submit confirmation: check badge + message, replaces the form in place. */
const LibSuccess = ({ message, align = "start", compact = false }) => (
  <div role="status" style={compact
    ? { display: "flex", alignItems: "center", gap: 12 }
    : { display: "flex", flexDirection: "column", alignItems: align === "center" ? "center" : "flex-start", gap: 14, textAlign: align }}>
    <span style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      width: compact ? 32 : 44, height: compact ? 32 : 44, borderRadius: "var(--radius-circle)",
      background: "var(--accent-soft)", color: "var(--text-on-tint-brand)",
    }}>
      <svg width={compact ? 16 : 20} height={compact ? 16 : 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 12.5l5.5 5.5L20 6.5" />
      </svg>
    </span>
    <p style={{ fontFamily: "var(--font-sans)", fontSize: compact ? "var(--text-base)" : "var(--text-lg)", fontWeight: "var(--fw-semibold)", color: "var(--text-primary)", margin: 0, maxWidth: 420 }}>{message}</p>
  </div>
);
/* One labelled form control, rendered from a field definition
   ({ label, type, placeholder, options? }). Multiselect renders as toggle
   chips OUTSIDE a <label>, because a label forwards clicks to its first
   button and would toggle the wrong chip. */
const LibField = ({ field, picked = {}, onToggle = () => {} }) => {
  if (field.type === "multiselect") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={libLabel}>{field.label}</span>
        <div role="group" aria-label={field.label} style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {(field.options || []).map((opt) => {
            const on = !!picked[opt];
            return (
              <button key={opt} type="button" aria-pressed={on} onClick={() => onToggle(opt)} style={{
                paddingInline: 14, height: 36, borderRadius: "var(--radius-pill)",
                border: "1px solid " + (on ? "var(--accent)" : "var(--border-default)"),
                background: on ? "var(--accent-soft)" : "var(--surface-input-plain)",
                color: on ? "var(--text-on-tint-brand)" : "var(--text-secondary)",
                fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-medium)",
                cursor: "pointer",
                transition: "background var(--dur-base) var(--ease-standard), border-color var(--dur-base) var(--ease-standard), color var(--dur-base) var(--ease-standard)",
              }}>{opt}</button>
            );
          })}
        </div>
      </div>
    );
  }
  let control;
  if (field.type === "textarea") {
    control = <textarea rows={3} placeholder={field.placeholder} style={libArea} />;
  } else if (field.type === "select") {
    control = (
      <select defaultValue="" style={{ ...libField, appearance: "auto" }}>
        <option value="" disabled>{field.placeholder || "Select"}</option>
        {(field.options || []).map((opt) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    );
  } else {
    control = <input type={field.type || "text"} placeholder={field.placeholder} style={libField} />;
  }
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <span style={libLabel}>{field.label}</span>
      {control}
    </label>
  );
};

/* === cta-band · the closing ask: gradient panel bookend, or a slim justified band === */
function LibCtaBand({
  eyebrow = "NEXT STEP",
  headline = "Stop reading reports. Start making decisions.",
  sub = "Bring your stack to a 30-minute walkthrough and watch your own data brief you back.",
  ctaLabel = "Talk to sales",
  secondaryCtaLabel = "See pricing",
  layout = "gradient-panel", /* "gradient-panel" | "justified" */
}) {
  if (layout === "justified") {
    return (
      <section style={{ background: "var(--surface-sunken)", borderBlock: "1px solid var(--border-subtle)" }}>
        <div style={libContainer({ paddingBlock: 64, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32, flexWrap: "wrap" })}>
          <div style={{ minWidth: 0, flex: "1 1 420px" }}>
            {eyebrow ? <p style={{ ...libEyebrowText, color: "var(--text-muted)" }}>{eyebrow}</p> : null}
            <h2 style={{ ...libDisplay(32), maxWidth: 640, marginBlockStart: eyebrow ? 12 : 0 }}>{headline}</h2>
            {sub ? <p style={{ ...libSub, maxWidth: 560, marginBlockStart: 10 }}>{sub}</p> : null}
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Button variant="primary" size="lg">{ctaLabel}</Button>
            {secondaryCtaLabel ? <Button variant="outline" size="lg" style={libGhostCta}>{secondaryCtaLabel}</Button> : null}
          </div>
        </div>
      </section>
    );
  }
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({ paddingBlock: 96 })}>
        <div style={{ position: "relative", overflow: "hidden", borderRadius: "var(--radius-3xl)", background: "var(--gradient-brand)", paddingBlock: 72, paddingInline: 56, textAlign: "center" }}>
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(60% 130% at 50% 0%, color-mix(in srgb, var(--text-on-brand) 22%, transparent) 0%, transparent 60%)" }} />
          <div style={{ position: "relative" }}>
            {eyebrow ? <p style={{ ...libEyebrowText, color: "var(--text-on-brand)", opacity: 0.85 }}>{eyebrow}</p> : null}
            <h2 style={{ ...libDisplay(44), color: "var(--text-on-brand)", maxWidth: 680, marginInline: "auto", marginBlockStart: eyebrow ? 16 : 0 }}>{headline}</h2>
            {sub ? <p style={{ ...libSub, color: "var(--text-on-brand)", opacity: 0.92, maxWidth: 540, marginInline: "auto", marginBlockStart: 16 }}>{sub}</p> : null}
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBlockStart: 32 }}>
              <Button size="lg" style={{ background: "var(--surface-ink)", color: "var(--text-on-brand)", borderColor: "transparent" }}>{ctaLabel}</Button>
              {secondaryCtaLabel ? (
                <Button variant="outline" size="lg" style={{ background: "transparent", color: "var(--text-on-brand)", borderColor: "color-mix(in srgb, var(--text-on-brand) 55%, transparent)" }}>{secondaryCtaLabel}</Button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* === newsletter-capture · single-field weekly-brief signup, three placements === */
function LibNewsletterCapture({
  eyebrow = "THE BRIEF, WEEKLY",
  headline = "One email a week. Read less, know more.",
  sub = "Every Tuesday: one decision worth studying, one number worth stealing, five minutes tops.",
  placeholder = "you@company.com",
  ctaLabel = "Subscribe",
  privacyNote = "No spam. Unsubscribe any time.",
  successMessage = "Done. Your first brief lands next Tuesday.",
  layout = "centered", /* "centered" | "band" | "footer-embed" */
}) {
  const [submitted, setSubmitted] = React.useState(false);
  const submit = (e) => { e.preventDefault(); setSubmitted(true); };
  const form = (size) => (
    <form onSubmit={submit} style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
      <input type="email" required placeholder={placeholder} aria-label="Work email" style={{ ...libField, flex: "1 1 220px", width: "auto" }} />
      <Button variant="primary" size={size} type="submit">{ctaLabel}</Button>
    </form>
  );
  if (layout === "footer-embed") {
    return (
      <section style={{ background: "var(--surface-sunken)", borderBlockStart: "1px solid var(--border-subtle)" }}>
        <div style={libContainer({ paddingBlock: 44, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" })}>
          <div style={{ minWidth: 0, flex: "1 1 320px" }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)", margin: 0 }}>{headline}</p>
            <p style={{ ...libFine, marginBlockStart: 6 }}>{privacyNote}</p>
          </div>
          <div style={{ flex: "0 1 420px", minWidth: 0 }}>
            {submitted ? <LibSuccess compact message={successMessage} /> : form("md")}
          </div>
        </div>
      </section>
    );
  }
  if (layout === "band") {
    return (
      <section style={{ background: "var(--bg-page)" }}>
        <div style={libContainer({ paddingBlock: 88 })}>
          <div style={libCard({ paddingBlock: 48, paddingInline: 48, display: "grid", gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 1fr)", gap: 48, alignItems: "center" })}>
            <div>
              <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
              <h2 style={{ ...libDisplay(34), marginBlockStart: 16 }}>{headline}</h2>
              <p style={{ ...libSub, fontSize: "var(--text-base)", marginBlockStart: 12, maxWidth: 440 }}>{sub}</p>
            </div>
            <div>
              {submitted ? <LibSuccess message={successMessage} /> : (
                <>
                  {form("lg")}
                  <p style={{ ...libFine, marginBlockStart: 12 }}>{privacyNote}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({ paddingBlock: 96, textAlign: "center", maxWidth: 720 })}>
        <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
        <h2 style={{ ...libDisplay(44), marginBlockStart: 18 }}>{headline}</h2>
        <p style={{ ...libSub, maxWidth: 520, marginInline: "auto", marginBlockStart: 16 }}>{sub}</p>
        <div style={{ maxWidth: 480, marginInline: "auto", marginBlockStart: 32 }}>
          {submitted ? (
            <div style={{ display: "flex", justifyContent: "center" }}><LibSuccess align="center" message={successMessage} /></div>
          ) : (
            <>
              {form("lg")}
              <p style={{ ...libFine, marginBlockStart: 12 }}>{privacyNote}</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

/* === lead-capture-split · benefit copy beside a card form, for gated asks === */
function LibLeadCaptureSplit({
  eyebrow = "TALK TO SALES",
  headline = "30 minutes, your data, one decision",
  sub = "Tell me where to reach you. A human from the Alfred team sets up the walkthrough, I do the briefing.",
  bullets = [
    "A walkthrough on your stack, not a canned demo",
    "The four-stage model live: learn, nudge, recommend, act",
    "Pricing and rollout answered in the same call",
  ],
  bulletsTitle = "What's inside",
  items = [
    { label: "Full name", placeholder: "Your name", type: "text" },
    { label: "Work email", placeholder: "you@company.com", type: "email" },
    { label: "Company", placeholder: "Company name", type: "text" },
    { label: "Team size", placeholder: "Select", type: "select", options: ["1 to 10", "11 to 50", "51 to 200", "201 to 1,000", "1,000+"] },
    { label: "What should we look at first?", placeholder: "Spend efficiency, pipeline, board prep...", type: "textarea" },
  ],
  ctaLabel = "Book the walkthrough",
  privacyNote = "Your details stay with the Alfred team at E902. No lists, no resale.",
  successMessage = "Booked. You'll hear from us within one business day.",
  layout = "standard", /* "standard" | "whats-inside" */
}) {
  const [submitted, setSubmitted] = React.useState(false);
  const [picked, setPicked] = React.useState({});
  const onToggle = (opt) => setPicked((p) => ({ ...p, [opt]: !p[opt] }));
  const bulletList = (
    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
      {bullets.map((b, i) => (
        <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", color: "var(--text-secondary)", lineHeight: "var(--lh-normal)" }}>
          <span style={{ color: "var(--accent)" }}>{libCheckGlyph}</span>
          <span>{b}</span>
        </li>
      ))}
    </ul>
  );
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({
        paddingBlock: "92px 88px",
        display: "grid", gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 1fr)",
        gap: 64, alignItems: "start",
      })}>
        <div>
          <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
          <h2 style={{ ...libDisplay(44), marginBlockStart: 18, maxWidth: 480 }}>{headline}</h2>
          <p style={{ ...libSub, maxWidth: 480, marginBlockStart: 16 }}>{sub}</p>
          {bullets && bullets.length ? (
            layout === "whats-inside" ? (
              <div style={{ marginBlockStart: 32, background: "var(--surface-sunken)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-xl)", paddingBlock: 24, paddingInline: 24 }}>
                <div style={{ ...libEyebrowText, color: "var(--text-primary)", marginBlockEnd: 14 }}>{bulletsTitle}</div>
                {bulletList}
              </div>
            ) : (
              <div style={{ marginBlockStart: 28 }}>{bulletList}</div>
            )
          ) : null}
        </div>
        <div style={libCard({ paddingBlock: 32, paddingInline: 32, position: "sticky", insetBlockStart: 32 })}>
          {submitted ? <LibSuccess message={successMessage} /> : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {items.map((f, i) => <LibField key={i} field={f} picked={picked} onToggle={onToggle} />)}
              <Button variant="primary" size="lg" type="submit" fullWidth>{ctaLabel}</Button>
              <p style={libFine}>{privacyNote}</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* === multi-step-form · one card, three graded steps, segmented progress === */
function LibMultiStepForm({
  eyebrow = "GET STARTED",
  headline = "Three steps to your first brief",
  sub = "Two minutes now, and your walkthrough runs on your stack, not a demo account.",
  steps = [
    {
      title: "About you",
      fields: [
        { label: "Full name", type: "text", placeholder: "Your name" },
        { label: "Work email", type: "email", placeholder: "you@company.com" },
        { label: "Role", type: "text", placeholder: "Head of Marketing" },
      ],
    },
    {
      title: "Your stack",
      fields: [
        { label: "Company", type: "text", placeholder: "Company name" },
        { label: "Tools you run", type: "multiselect", options: ["Google Ads", "Meta Ads", "LinkedIn Ads", "Amazon Ads", "Google Analytics 4", "HubSpot", "Salesforce", "Google Search Console", "Other"] },
      ],
    },
    {
      title: "Your first question",
      fields: [
        { label: "What should I look at first?", type: "textarea", placeholder: "Where is spend leaking? Which campaigns move pipeline? You choose." },
      ],
    },
  ],
  nextLabel = "Next",
  backLabel = "Back",
  submitLabel = "Send it to Alfred",
  progressLabel = "Step {current} of {total}",
  successMessage = "Done. A human from the Alfred team will confirm your walkthrough within one business day.",
}) {
  const [step, setStep] = React.useState(0);
  const [submitted, setSubmitted] = React.useState(false);
  const [picked, setPicked] = React.useState({});
  const onToggle = (opt) => setPicked((p) => ({ ...p, [opt]: !p[opt] }));
  const total = steps.length;
  const current = steps[Math.min(step, total - 1)];
  const last = step === total - 1;
  const label = progressLabel.replace("{current}", String(step + 1)).replace("{total}", String(total));
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({ paddingBlock: 96 })}>
        <div style={{ textAlign: "center", maxWidth: 640, marginInline: "auto" }}>
          <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
          <h2 style={{ ...libDisplay(40), marginBlockStart: 18 }}>{headline}</h2>
          <p style={{ ...libSub, marginBlockStart: 14 }}>{sub}</p>
        </div>
        <div style={libCard({ maxWidth: 720, marginInline: "auto", marginBlockStart: 48, paddingBlock: 36, paddingInline: 36 })}>
          {submitted ? (
            <div style={{ display: "flex", justifyContent: "center", paddingBlock: 24 }}>
              <LibSuccess align="center" message={successMessage} />
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
                <span style={{ ...libEyebrowText, color: "var(--text-muted)" }}>{label}</span>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>{current.title}</span>
              </div>
              <div aria-hidden="true" style={{ display: "flex", gap: 6, marginBlockStart: 12 }}>
                {steps.map((s, i) => (
                  <span key={i} style={{ height: 4, flex: 1, borderRadius: "var(--radius-pill)", background: i <= step ? "var(--accent)" : "var(--border-subtle)" }} />
                ))}
              </div>
              <h3 style={{ ...libDisplay(24), marginBlockStart: 28 }}>{current.title}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 18, marginBlockStart: 20 }}>
                {current.fields.map((f, i) => <LibField key={current.title + i} field={f} picked={picked} onToggle={onToggle} />)}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBlockStart: 32 }}>
                <Button variant="ghost" size="md" type="button" onClick={() => setStep(Math.max(0, step - 1))} style={{ visibility: step === 0 ? "hidden" : "visible" }}>{backLabel}</Button>
                {last
                  ? <Button variant="primary" size="md" type="submit">{submitLabel}</Button>
                  : <Button variant="primary" size="md" type="button" onClick={() => setStep(Math.min(total - 1, step + 1))}>{nextLabel}</Button>}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* === roi-calculator · three sliders, live savings math, payback in days === */
function LibRoiCalculator({
  eyebrow = "The math",
  headline = "Put a number on the busywork",
  sub = "Move the sliders to your team. I'll price the reporting grind month by month, and tell you how fast I pay for myself.",
  teamLabel = "People who touch reporting",
  hoursLabel = "Hours per person, per week",
  rateLabel = "Loaded hourly cost",
  defaultTeam = 6,
  defaultHours = 5,
  defaultRate = 85,
  automationShare = 0.6,
  planPrice = 1500,
  planNote = "on the Growth plan at $1,500 a month",
  assumption = "I take on about 60% of report assembly, pacing checks and channel summaries. The judgment calls stay with you.",
  ctaLabel = "See it on your data",
}) {
  const [team, setTeam] = React.useState(defaultTeam);
  const [hours, setHours] = React.useState(defaultHours);
  const [rate, setRate] = React.useState(defaultRate);
  const fmtMoney = (n) => "$" + Math.round(n).toLocaleString("en-US");
  const hoursSaved = Math.round(team * hours * 4.33 * automationShare);
  const monthly = team * hours * 4.33 * automationShare * rate;
  const paybackDays = monthly > 0 ? Math.max(1, Math.round(planPrice / (monthly / 30))) : 0;
  const statLabel = { ...libEyebrowText, color: "var(--text-muted)" };
  const slider = (label, value, readout, min, max, step, onChange) => (
    <label style={{ display: "block" }}>
      <span style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
        <span style={libLabel}>{label}</span>
        <span style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: "var(--fw-semibold)", letterSpacing: "-0.01em", color: "var(--text-primary)" }}>{readout}</span>
      </span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} style={{ display: "block", width: "100%", accentColor: "var(--info-500)", marginBlockStart: 10 }} />
    </label>
  );
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({
        paddingBlock: "92px 88px",
        display: "grid", gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 1fr)",
        gap: 64, alignItems: "center",
      })}>
        <div>
          <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
          <h2 style={{ ...libDisplay(44), marginBlockStart: 18, maxWidth: 460 }}>{headline}</h2>
          <p style={{ ...libSub, maxWidth: 460, marginBlockStart: 16 }}>{sub}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 28, marginBlockStart: 40, maxWidth: 460 }}>
            {slider(teamLabel, team, team + (team === 1 ? " person" : " people"), 1, 50, 1, setTeam)}
            {slider(hoursLabel, hours, hours + (hours === 1 ? " hour" : " hours"), 1, 20, 1, setHours)}
            {slider(rateLabel, rate, fmtMoney(rate) + "/hr", 30, 250, 5, setRate)}
          </div>
        </div>
        <div style={libCard({ paddingBlock: 36, paddingInline: 36, display: "flex", flexDirection: "column", gap: 24 })}>
          <div>
            <span style={statLabel}>What that time is worth</span>
            <div style={{ ...libDisplay(52), marginBlockStart: 8 }}>
              <LibGradientText>{fmtMoney(monthly)}</LibGradientText>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-lg)", fontWeight: "var(--fw-medium)", color: "var(--text-muted)", marginInlineStart: 8 }}>a month</span>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: 24, borderBlockStart: "1px solid var(--border-subtle)", paddingBlockStart: 24 }}>
            <div>
              <span style={statLabel}>Hours reclaimed</span>
              <div style={{ ...libDisplay(28), marginBlockStart: 6 }}>{hoursSaved.toLocaleString("en-US")} hours</div>
              <p style={{ ...libFine, marginBlockStart: 4 }}>every month, across the team</p>
            </div>
            <div>
              <span style={statLabel}>I pay for myself in</span>
              <div style={{ ...libDisplay(28), marginBlockStart: 6 }}>{paybackDays} {paybackDays === 1 ? "day" : "days"}</div>
              <p style={{ ...libFine, marginBlockStart: 4 }}>{planNote}</p>
            </div>
          </div>
          <p style={libFine}>{assumption}</p>
          <Button variant="primary" size="lg" fullWidth>{ctaLabel}</Button>
        </div>
      </div>
    </section>
  );
}

window.LibCtaBand = LibCtaBand;
window.LibNewsletterCapture = LibNewsletterCapture;
window.LibLeadCaptureSplit = LibLeadCaptureSplit;
window.LibMultiStepForm = LibMultiStepForm;
window.LibRoiCalculator = LibRoiCalculator;
