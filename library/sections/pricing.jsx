/* ============================================================
   Alfred — Inspiration Library · PRICING.
   Two pricing patterns distilled from the competitor sweep,
   rebuilt on design-system tokens so they render truthfully in
   light and in data-theme="dark". Every component ships complete
   default copy: a bare <LibPricingTiers2 /> is a finished section.
   Compiled to a committed .js twin by scripts/build-kits.mjs;
   catalogued in library/meta/pricing.json.
   ============================================================ */
const {
  EyebrowBadge, Button, Chip,
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
const LibGradientText = ({ children }) => (
  <span style={{ background: "var(--gradient-brand)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>{children}</span>
);
const libGhostCta = { background: "transparent", color: "var(--text-primary)", borderColor: "var(--border-default)" };
const libCheckGlyph = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0, marginBlockStart: 3 }}>
    <path d="M4 12.5l5.5 5.5L20 6.5" />
  </svg>
);
const libFinePrint = {
  fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)",
  color: "var(--text-muted)", lineHeight: "var(--lh-normal)", margin: 0,
};

/* Split "$199" / "Custom" into currency prefix + amount so the numeral
   can carry the big Clash Display treatment on its own. */
const libParsePrice = (price) => {
  const m = /^([^0-9]{0,2})\s*([\d][\d,]*(?:\.\d+)?)$/.exec(String(price == null ? "" : price).trim());
  return m ? { currency: m[1], amount: m[2] } : { currency: "", amount: String(price == null ? "" : price) };
};

/* One tier card: name, description, anchor price, checklist, CTA.
   Highlighted = orange border + brand shadow + the section's one
   solid-orange CTA (the PriceCard treatment, plus a description slot). */
const LibPlanCard = ({ plan, highlighted }) => {
  const { currency, amount } = libParsePrice(plan.price);
  const numeric = /\d/.test(amount);
  return (
    <div style={{
      position: "relative", display: "flex", flexDirection: "column", minWidth: 0,
      background: "var(--surface-card)",
      border: highlighted ? "1px solid var(--border-focus)" : "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-2xl)",
      boxShadow: highlighted ? "var(--shadow-brand)" : "var(--elevation-raised)",
      paddingBlock: "32px 26px", paddingInline: 26,
    }}>
      {plan.badge ? (
        <div style={{ position: "absolute", insetBlockStart: -13, insetInline: 0, display: "flex", justifyContent: "center" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", height: 26, paddingInline: 14,
            borderRadius: "var(--radius-pill)", background: "var(--accent)", color: "var(--text-on-orange)",
            fontFamily: "var(--font-sans)", fontSize: "var(--text-2xs)", fontWeight: "var(--fw-bold)",
            letterSpacing: "var(--ls-caps)", textTransform: "uppercase", whiteSpace: "nowrap",
          }}>{plan.badge}</span>
        </div>
      ) : null}
      <h3 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "var(--text-h4)", fontWeight: "var(--fw-semibold)", letterSpacing: "var(--ls-tight)", lineHeight: "var(--lh-snug)", color: "var(--text-primary)" }}>{plan.name}</h3>
      {plan.description ? (
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: "var(--lh-normal)", margin: 0, marginBlockStart: 8 }}>{plan.description}</p>
      ) : null}
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBlockStart: 18, flexWrap: "wrap" }}>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)", letterSpacing: "-0.02em", lineHeight: "var(--lh-tight)", color: "var(--text-primary)" }}>
          {currency ? <span style={{ fontSize: "var(--text-h3)" }}>{currency}</span> : null}
          <span style={{ fontSize: numeric ? "var(--text-display-md)" : "var(--text-h2)" }}>{amount}</span>
        </span>
        {plan.period ? <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>{plan.period}</span> : null}
      </div>
      <ul style={{
        listStyle: "none", margin: 0, padding: 0, marginBlockStart: 20, paddingBlockStart: 20,
        borderBlockStart: "1px solid var(--border-subtle)",
        display: "flex", flexDirection: "column", gap: 11, flex: 1,
      }}>
        {(plan.features || []).map((f, i) => (
          <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", lineHeight: "var(--lh-normal)", color: "var(--text-secondary)" }}>
            <span style={{ color: "var(--accent)", display: "inline-flex", flexShrink: 0 }}>{libCheckGlyph}</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <div style={{ marginBlockStart: 24 }}>
        <Button variant={highlighted ? "primary" : "outline"} fullWidth style={highlighted ? undefined : libGhostCta}>{plan.ctaLabel}</Button>
      </div>
    </div>
  );
};

/* ——— pricing-tiers · the tier grid: header, plan cards, enterprise strip, footnote ——— */
function LibPricingTiers2({
  eyebrow = "Pricing",
  headline = "Priced for the person who makes the call",
  headlineAccent = "makes the call",
  sub = "Three plans for Alfred for Marketing, per module, per month. Launch offer: 50% off your first two months.",
  plans = [
    {
      name: "Starter", price: "$199", period: "/month",
      description: "For the leader making the first move away from dashboard mornings.",
      features: [
        "3 users",
        "150 AI chat queries a month",
        "Daily brief, campaign health, and key actions",
        "Spend mix analysis with up to 5 simulations a month",
        "Anomaly detection",
        "Standard platform integrations",
        "Email support, 3-day SLA",
      ],
      ctaLabel: "Start with Starter",
    },
    {
      name: "Growth", price: "$499", period: "/month", badge: "Most popular",
      description: "For teams that want recommendations and the hands to act on them.",
      features: [
        "8 users",
        "500 AI chat queries a month",
        "Full chat access with write-back",
        "Full spend mix simulation",
        "CMO overview and campaign health KPIs",
        "Custom integration requests, 2-week SLA",
        "Priority support plus onboarding",
      ],
      ctaLabel: "Choose Growth",
    },
    {
      name: "Max", price: "$999", period: "/month",
      description: "For leaders running the whole function through Alfred.",
      features: [
        "25 users",
        "800 AI chat queries a month",
        "Scheduled reports",
        "Custom metric tracking",
        "Audit logs and role-based access",
        "Enterprise integrations plus custom, 1-week SLA",
        "Dedicated support and implementation assistance",
      ],
      ctaLabel: "Go Max",
    },
  ],
  enterpriseNote = "Enterprise: unlimited users, custom AI volume, SSO and advanced security, volume discounts available.",
  enterpriseCta = "Talk to sales",
  footnote = "Prices in USD, per module, per month. Launch offer: 50% off your first two months.",
}) {
  const single = plans.length === 1;
  const accented = headlineAccent && headline.includes(headlineAccent) ? (
    <>
      {headline.slice(0, headline.indexOf(headlineAccent))}
      <LibGradientText>{headlineAccent}</LibGradientText>
      {headline.slice(headline.indexOf(headlineAccent) + headlineAccent.length)}
    </>
  ) : headline;
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({ paddingBlock: "96px 96px" })}>
        <div style={{ textAlign: "center", maxWidth: 660, marginInline: "auto" }}>
          <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
          <h2 style={{ ...libDisplay(44), marginBlockStart: 20 }}>{accented}</h2>
          <p style={{ ...libSub, marginBlockStart: 16 }}>{sub}</p>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: single ? "minmax(0, 1fr)" : `repeat(${plans.length}, minmax(0, 1fr))`,
          gap: 24, alignItems: "stretch", marginBlockStart: 56,
          maxWidth: single ? 460 : undefined, marginInline: single ? "auto" : undefined,
        }}>
          {plans.map((p, i) => (
            <LibPlanCard key={i} plan={p} highlighted={!!p.badge || single} />
          ))}
        </div>
        {enterpriseNote ? (
          <div style={{
            marginBlockStart: 28, display: "flex", alignItems: "center", justifyContent: "space-between",
            gap: 20, flexWrap: "wrap", paddingBlock: 18, paddingInline: 24,
            borderRadius: "var(--radius-lg)", border: "1px solid var(--border-subtle)", background: "var(--surface-sunken)",
            maxWidth: single ? 640 : undefined, marginInline: single ? "auto" : undefined,
          }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: "var(--lh-normal)", margin: 0, flex: "1 1 360px" }}>{enterpriseNote}</p>
            <Button variant="outline" size="sm" style={libGhostCta}>{enterpriseCta}</Button>
          </div>
        ) : null}
        {footnote ? (
          <p style={{ ...libFinePrint, textAlign: "center", marginBlockStart: 24 }}>{footnote}</p>
        ) : null}
      </div>
    </section>
  );
}

/* Small single-color line glyphs for the enterprise band, keyed by name
   so the items prop stays plain data. */
const libBandGlyph = (name) => {
  const shapes = {
    support: (
      <>
        <path d="M4.5 13.5v-2a7.5 7.5 0 0115 0v2" />
        <rect x="3.5" y="12.5" width="4.2" height="6.2" rx="1.8" />
        <rect x="16.3" y="12.5" width="4.2" height="6.2" rx="1.8" />
      </>
    ),
    rollout: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M8.3 12.4l2.6 2.6 4.8-5.3" />
      </>
    ),
    volume: (
      <>
        <path d="M4.5 15.5a7.5 7.5 0 0115 0" />
        <path d="M12 15.5l3.6-3.6" />
        <path d="M4.5 19h15" />
      </>
    ),
    discount: (
      <>
        <path d="M4 4h7l9 9-7 7-9-9V4z" />
        <circle cx="8.5" cy="8.5" r="1.6" />
      </>
    ),
    shield: (
      <path d="M12 3.5l7 2.8v5.2c0 4.2-2.9 7.2-7 8.9-4.1-1.7-7-4.7-7-8.9V6.3l7-2.8z" />
    ),
  };
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {shapes[name] || shapes.shield}
    </svg>
  );
};

/* ——— enterprise-band · the tailored-enterprise panel under the tier grid ——— */
function LibEnterpriseBand2({
  eyebrow = "Enterprise",
  headline = "Run the whole function through me",
  sub = "Enterprise is fully tailored: unlimited users, custom AI volume, and volume discounts as you scale. I sit inside your security perimeter, with SSO, role-based access, and an audit log of every action I take.",
  chips = ["SSO and SAML", "Role-based access", "Audit logs", "Data residency"],
  items = [
    { icon: "support", title: "Dedicated support", detail: "A named team, with answers inside one business day." },
    { icon: "rollout", title: "Implementation assistance", detail: "I am live on your stack in under three weeks, with your team trained." },
    { icon: "volume", title: "Custom AI volume", detail: "Query capacity sized to your organisation, not a preset tier." },
    { icon: "discount", title: "Volume discounts", detail: "Per-seat pricing steps down as seats and modules grow." },
  ],
  primaryCta = "Talk to sales",
  secondaryCta = "See the security overview",
  finePrint = "Fully tailored: pricing, features, users, and integrations.",
}) {
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({ paddingBlock: "88px 96px" })}>
        <div style={{
          position: "relative", overflow: "hidden",
          background: "var(--glow-periwinkle), var(--surface-card)",
          border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-3xl)",
          boxShadow: "var(--elevation-raised)",
          paddingBlock: 48, paddingInline: 48,
          display: "grid", gridTemplateColumns: "minmax(0, 1.08fr) minmax(0, 1fr)",
          gap: 48, alignItems: "center",
        }}>
          <div>
            <EyebrowBadge tone="periwinkle">{eyebrow}</EyebrowBadge>
            <h2 style={{ ...libDisplay(38), marginBlockStart: 18, maxWidth: 440 }}>{headline}</h2>
            <p style={{ ...libSub, fontSize: "var(--text-base)", marginBlockStart: 14, maxWidth: 480 }}>{sub}</p>
            {chips && chips.length ? (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBlockStart: 22 }}>
                {chips.map((c, i) => <Chip key={i} tone="neutral">{c}</Chip>)}
              </div>
            ) : null}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBlockStart: 28 }}>
              <Button variant="primary" size="lg">{primaryCta}</Button>
              {secondaryCta ? <Button variant="outline" size="lg" style={libGhostCta}>{secondaryCta}</Button> : null}
            </div>
            {finePrint ? <p style={{ ...libFinePrint, marginBlockStart: 14 }}>{finePrint}</p> : null}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: 14 }}>
            {items.map((it, i) => (
              <div key={i} style={{
                display: "flex", gap: 14, alignItems: "flex-start",
                paddingBlock: 16, paddingInline: 18,
                borderRadius: "var(--radius-lg)", border: "1px solid var(--border-subtle)",
                background: "var(--surface-sunken)",
              }}>
                <span style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  width: 36, height: 36, flexShrink: 0, borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-subtle)", background: "var(--surface-card)",
                  color: "var(--text-secondary)",
                }}>{libBandGlyph(it.icon)}</span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)", lineHeight: "var(--lh-snug)" }}>{it.title}</div>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: "var(--lh-normal)", margin: 0, marginBlockStart: 4 }}>{it.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

window.LibPricingTiers2 = LibPricingTiers2;
window.LibEnterpriseBand2 = LibEnterpriseBand2;
