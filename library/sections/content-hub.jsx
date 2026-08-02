/* ============================================================
   Alfred - Inspiration Library · CONTENT HUBS.
   Seven content-hub patterns distilled from the competitor sweep
   (card grids, filter rows, hub heroes, webinar promos, pagination,
   contact, video bands), rebuilt on design-system tokens so they
   render truthfully in light and in data-theme="dark". Every
   component ships complete default copy: a bare <LibCardGrid />
   is a finished section.
   Compiled to a committed .js twin by scripts/build-kits.mjs;
   catalogued in library/meta/content-hub.json.
   ============================================================ */
const {
  EyebrowBadge, Button, Badge, Chip, Tabs, Avatar, Pagination,
  SearchInput, Input, Textarea,
} = window.AlfredAIDesignSystem_1ce241;

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
  color: "var(--text-secondary)", lineHeight: "var(--lh-normal)", margin: 0,
};
const libMicro = {
  fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)",
  color: "var(--text-muted)", margin: 0,
};
const libCard = {
  background: "var(--surface-card)", border: "1px solid var(--border-subtle)",
  borderRadius: "var(--radius-2xl)", boxShadow: "var(--elevation-surface)",
};
const libGhostCta = { background: "transparent", color: "var(--text-primary)", borderColor: "var(--border-default)" };
const libFieldStyle = {
  flex: 1, height: 48, paddingInline: 18, borderRadius: "var(--radius-md)",
  border: "1px solid var(--border-default)", background: "var(--surface-input-plain)",
  color: "var(--text-primary)", fontFamily: "var(--font-sans)", fontSize: "var(--text-base)",
};
/* Small single-color glyphs, tinted by currentColor like the icon set. */
const libGlyph = (path, size = 16, sw = 2) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>{path}</svg>
);
const libArrowGlyph = (
  /* trailing "read" arrow; mirrored under RTL by the flip sign */
  <span aria-hidden="true" style={{ display: "inline-flex", transform: "scaleX(var(--flip))" }}>
    {libGlyph(<><path d="M4 12h15" /><path d="M13 6l6 6-6 6" /></>, 15)}
  </span>
);
const libCheckGlyph = libGlyph(<path d="M4 12.5l5.5 5.5L20 6.5" />, 15, 2.2);
const libCalendarGlyph = libGlyph(<><rect x="3.5" y="5" width="17" height="15.5" rx="2.5" /><path d="M3.5 9.5h17M8 2.8v4M16 2.8v4" /></>, 16, 1.8);
const libClockGlyph = libGlyph(<><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2.2" /></>, 16, 1.8);
const libTimerGlyph = libGlyph(<><circle cx="12" cy="13" r="7.5" /><path d="M12 10v3.5M9.5 2.8h5" /></>, 16, 1.8);
const libMailGlyph = libGlyph(<><rect x="3" y="5.5" width="18" height="13" rx="2.5" /><path d="M3.8 7l8.2 6 8.2-6" /></>, 17, 1.8);
const libPlayGlyph = (size) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0, transform: "scaleX(var(--flip))" }}>
    <path d="M8.2 5.6v12.8c0 .8.9 1.3 1.6.9l10-6.4c.6-.4.6-1.4 0-1.8l-10-6.4c-.7-.4-1.6.1-1.6.9z" />
  </svg>
);
const libChevronStart = (
  <span aria-hidden="true" style={{ display: "inline-flex", transform: "scaleX(var(--flip))" }}>
    {libGlyph(<path d="M14.5 6L8.5 12l6 6" />, 15)}
  </span>
);
const libChevronEnd = (
  <span aria-hidden="true" style={{ display: "inline-flex", transform: "scaleX(var(--flip))" }}>
    {libGlyph(<path d="M9.5 6l6 6-6 6" />, 15)}
  </span>
);
const libEyebrowLabel = {
  fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", fontWeight: "var(--fw-bold)",
  color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em",
};
const libReadLink = {
  display: "inline-flex", alignItems: "center", gap: 6,
  fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-semibold)",
  color: "var(--text-link)",
};
const libTemplate = (tpl, vals) => Object.entries(vals).reduce((s, [k, v]) => s.split("{" + k + "}").join(String(v)), tpl);

/* ==== card-grid · the workhorse blog / resource index band ==== */
function LibCardGrid({
  eyebrow = "The library",
  headline = "Sharper calls, in writing",
  sub = "Essays, playbooks, and worked teardowns for marketing leaders.",
  items = [
    { category: "Playbook", title: "The Monday brief: a 20-minute operating ritual for marketing leaders", excerpt: "How to open the week already decided: the exact reading order, the three questions, and the one number to check first.", readTime: "7 min read", ctaLabel: "Read" },
    { category: "Essay", title: "Dashboards forget. Here's what remembering is worth.", excerpt: "Why organisational memory, not analysis, is the compounding asset in marketing decisions.", readTime: "6 min read", ctaLabel: "Read" },
    { category: "Teardown", title: "Anatomy of a CPA spike: from flag to fix in one morning", excerpt: "A worked example: detection at 6 AM, cause by 8, approved reallocation by 9, logged and corrected the same day.", readTime: "9 min read", ctaLabel: "Read" },
  ],
  featured = null, /* { category, title, excerpt, readTime, ctaLabel } promotes one lead card above the grid */
  ctaLabel = "Browse everything",
}) {
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({ paddingBlock: "96px 96px" })}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
          <div>
            <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
            <h2 style={{ ...libDisplay(40), marginBlockStart: 18 }}>{headline}</h2>
            <p style={{ ...libSub, maxWidth: 520, marginBlockStart: 14 }}>{sub}</p>
          </div>
          {ctaLabel ? <Button variant="outline" size="md" style={libGhostCta}>{ctaLabel}</Button> : null}
        </div>
        {featured ? (
          <div style={{ ...libCard, position: "relative", overflow: "hidden", padding: 36, marginBlockStart: 40 }}>
            {/* the section's one gradient element: the featured keyline */}
            <div aria-hidden="true" style={{ position: "absolute", insetBlockStart: 0, insetInlineStart: 0, insetInlineEnd: 0, height: 3, background: "var(--gradient-brand)" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Badge tone="brand">{featured.category}</Badge>
              <span style={libMicro}>{featured.readTime}</span>
            </div>
            <h3 style={{ ...libDisplay(30), maxWidth: 720, marginBlockStart: 16 }}>{featured.title}</h3>
            <p style={{ ...libSub, fontSize: "var(--text-base)", maxWidth: 640, marginBlockStart: 12 }}>{featured.excerpt}</p>
            <div style={{ marginBlockStart: 24 }}>
              <Button variant="primary" size="md">{featured.ctaLabel}</Button>
            </div>
          </div>
        ) : null}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))", gap: 20, marginBlockStart: featured ? 20 : 40 }}>
          {items.map((it, i) => (
            <article key={i} style={{ ...libCard, padding: 28, display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                <Badge tone="neutral">{it.category}</Badge>
                <span style={libMicro}>{it.readTime}</span>
              </div>
              <h3 style={{ ...libDisplay(20), letterSpacing: "-0.01em", lineHeight: "var(--lh-snug)", marginBlockStart: 16 }}>{it.title}</h3>
              <p style={{ ...libBody, marginBlockStart: 10, flexGrow: 1 }}>{it.excerpt}</p>
              <span style={{ ...libReadLink, marginBlockStart: 18 }}>{it.ctaLabel}{libArrowGlyph}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==== filter-chip-row · category filter band for a content index ==== */
function LibFilterChipRow({
  label = "Filter by",
  items = ["All", "Playbooks", "Essays", "Teardowns", "Reports", "Product updates"],
  counts = [42, 12, 11, 8, 6, 5],
  activeChip = "All",
  clearLabel = "Clear filters",
  resultsLabel = "{count} pieces",
  variant = "chips", /* "chips" | "tabs" */
}) {
  const [active, setActive] = React.useState(activeChip);
  const idx = Math.max(0, items.indexOf(active));
  const results = libTemplate(resultsLabel, { count: counts[idx] != null ? counts[idx] : counts[0] });
  const resultsEl = <span style={{ ...libMicro, fontSize: "var(--text-sm)", whiteSpace: "nowrap" }}>{results}</span>;
  return (
    <section style={{ background: "var(--bg-page)", borderBlockEnd: "1px solid var(--border-subtle)" }}>
      <div style={libContainer({ paddingBlock: "40px 40px" })}>
        {variant === "tabs" ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
            <Tabs
              tabs={items.map((it) => ({ id: it, label: it }))}
              value={active}
              onChange={setActive}
            />
            {resultsEl}
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <span style={{ ...libEyebrowLabel, marginInlineEnd: 4 }}>{label}</span>
            {items.map((it) => (
              <Chip key={it} selected={it === active} onClick={() => setActive(it)}>{it}</Chip>
            ))}
            <span style={{ flexGrow: 1 }} />
            {active !== items[0] ? (
              <Button variant="ghost" size="sm" onClick={() => setActive(items[0])}>{clearLabel}</Button>
            ) : null}
            {resultsEl}
          </div>
        )}
      </div>
    </section>
  );
}

/* ==== resource-hub-hero · hub opener that doubles as navigation ==== */
function LibResourceHubHero({
  eyebrow = "Resources",
  headline = "Read less, know more",
  sub = "Playbooks, essays, and worked teardowns for the person who makes the call. Five minutes here should save you an hour somewhere else.",
  searchPlaceholder = "Search the library",
  ctaLabel = "Browse everything",
  quickLinks = ["Playbooks", "Essays", "Teardowns", "Reports", "Webinars"],
  statsLine = "40+ pieces, all under 15 minutes",
  featured = {
    tag: "New report",
    title: "The state of the marketing decision, 2026",
    meta: "14 min read",
    ctaLabel: "Read the report",
  },
}) {
  const [query, setQuery] = React.useState("");
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "var(--glow-periwinkle), var(--glow-orange), var(--bg-page)" }}>
      <div style={libContainer({ paddingBlock: "104px 88px", textAlign: "center" })}>
        <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
        <h1 style={{ ...libDisplay(56), maxWidth: 720, marginBlockStart: 22, marginInline: "auto" }}>{headline}</h1>
        <p style={{ ...libSub, maxWidth: 560, marginBlockStart: 20, marginInline: "auto" }}>{sub}</p>
        <div style={{ display: "flex", gap: 10, maxWidth: 620, marginInline: "auto", marginBlockStart: 32, flexWrap: "wrap", justifyContent: "center" }}>
          <SearchInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onSubmit={() => {}}
            placeholder={searchPlaceholder}
            style={{ flexGrow: 1, minWidth: 260, textAlign: "start" }}
          />
          <Button variant="primary" size="lg">{ctaLabel}</Button>
        </div>
        {quickLinks && quickLinks.length ? (
          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBlockStart: 22 }}>
            {quickLinks.map((q) => (
              <span key={q} style={{
                display: "inline-flex", alignItems: "center", paddingInline: 14, paddingBlock: 6,
                borderRadius: "var(--radius-pill)", border: "1px solid var(--border-subtle)",
                background: "var(--surface-card)", fontFamily: "var(--font-sans)",
                fontSize: "var(--text-sm)", color: "var(--text-secondary)",
              }}>{q}</span>
            ))}
          </div>
        ) : null}
        {statsLine ? <p style={{ ...libMicro, marginBlockStart: 14 }}>{statsLine}</p> : null}
        {featured ? (
          <div style={{ ...libCard, boxShadow: "var(--elevation-raised)", maxWidth: 640, marginInline: "auto", marginBlockStart: 40, paddingInline: 24, paddingBlock: 18, display: "flex", alignItems: "center", gap: 16, textAlign: "start", flexWrap: "wrap" }}>
            <Badge tone="info">{featured.tag}</Badge>
            <div style={{ flexGrow: 1, minWidth: 200 }}>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)" }}>{featured.title}</div>
              <div style={{ ...libMicro, marginBlockStart: 2 }}>{featured.meta}</div>
            </div>
            <span style={libReadLink}>{featured.ctaLabel}{libArrowGlyph}</span>
          </div>
        ) : null}
      </div>
    </section>
  );
}

/* ==== webinar-split · live-session promo with explicit dates ==== */
function LibWebinarSplit({
  eyebrow = "Live session",
  headline = "Watch a marketing leader run Monday morning with Alfred",
  sub = "45 minutes, live on your questions: the daily brief, one anomaly traced to cause, and a spend reallocation approved on air.",
  date = "Thursday, August 20, 2026",
  time = "9:00 AM PT / 9:30 PM IST",
  duration = "45 minutes",
  speakers = [
    { name: "Priya Menon", role: "Product lead, Alfred by E902" },
    { name: "Daniel Okafor", role: "Solutions lead, Alfred by E902" },
  ],
  ctaLabel = "Save my seat",
  secondaryCtaLabel = "Get the recording instead",
  placeholder = "you@company.com",
  privacyNote = "One reminder before the session, the recording after. Nothing else.",
  successMessage = "Seat saved. The calendar invite is on its way to your inbox.",
}) {
  const [email, setEmail] = React.useState("");
  const [sent, setSent] = React.useState(false);
  const metaRow = (glyph, text) => (
    <div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}>
      <span style={{ color: "var(--accent)", display: "inline-flex" }}>{glyph}</span>
      <span>{text}</span>
    </div>
  );
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({
        paddingBlock: "96px 96px",
        display: "grid", gridTemplateColumns: "minmax(0, 1.15fr) minmax(0, 1fr)",
        gap: 56, alignItems: "start",
      })}>
        <div>
          <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
          <h2 style={{ ...libDisplay(40), maxWidth: 560, marginBlockStart: 20 }}>{headline}</h2>
          <p style={{ ...libSub, maxWidth: 500, marginBlockStart: 16 }}>{sub}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBlockStart: 28 }}>
            {metaRow(libCalendarGlyph, date)}
            {metaRow(libClockGlyph, time)}
            {metaRow(libTimerGlyph, duration)}
          </div>
          {speakers && speakers.length ? (
            <div style={{ marginBlockStart: 32 }}>
              <div style={libEyebrowLabel}>Your hosts</div>
              <div style={{ display: "flex", gap: 28, flexWrap: "wrap", marginBlockStart: 14 }}>
                {speakers.map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Avatar name={s.name} size={40} />
                    <div>
                      <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)" }}>{s.name}</div>
                      <div style={libMicro}>{s.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
        <div style={{ ...libCard, boxShadow: "var(--elevation-raised)", padding: 32, position: "sticky", insetBlockStart: 32 }}>
          {sent ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 12, paddingBlock: 12 }}>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: "var(--radius-circle)", background: "var(--accent-soft)", color: "var(--text-on-tint-brand)" }}>{libCheckGlyph}</span>
              <p style={{ ...libSub, fontSize: "var(--text-base)", color: "var(--text-primary)" }}>{successMessage}</p>
            </div>
          ) : (
            <>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-lg)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)", marginBlockEnd: 6 }}>Register free</div>
              <p style={{ ...libBody, marginBlockEnd: 20 }}>Can't make the time? Register anyway and I'll send the recording.</p>
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <input
                  value={email} onChange={(e) => setEmail(e.target.value)} type="email" required
                  placeholder={placeholder} aria-label="Work email" style={libFieldStyle}
                />
                <Button variant="primary" size="lg" type="submit" fullWidth>{ctaLabel}</Button>
                <Button variant="outline" size="lg" fullWidth style={libGhostCta}>{secondaryCtaLabel}</Button>
              </form>
              {privacyNote ? <p style={{ ...libMicro, marginBlockStart: 12 }}>{privacyNote}</p> : null}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

/* ==== pagination-row · numbered index navigation, newest first ==== */
function LibPaginationRow({
  page = 3,
  pageCount = 8,
  prevLabel = "Newer",
  nextLabel = "Older",
  pageLabel = "Page {current} of {total}",
  firstLabel = "Latest",
  lastLabel = "Oldest",
}) {
  const [current, setCurrent] = React.useState(page);
  const jump = {
    background: "none", border: "none", padding: 0, cursor: "pointer",
    fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", fontWeight: "var(--fw-semibold)",
    color: "var(--text-link)",
  };
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({ paddingBlock: "48px 48px" })}>
        <nav aria-label="Library pages" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
            <Button variant="outline" size="sm" style={libGhostCta} iconLeft={libChevronStart} disabled={current <= 1} onClick={() => setCurrent(Math.max(1, current - 1))}>{prevLabel}</Button>
            <Pagination page={current} pageCount={pageCount} onChange={setCurrent} />
            <Button variant="outline" size="sm" style={libGhostCta} iconRight={libChevronEnd} disabled={current >= pageCount} onClick={() => setCurrent(Math.min(pageCount, current + 1))}>{nextLabel}</Button>
          </div>
          <p style={{ ...libMicro, display: "flex", alignItems: "center", gap: 10 }}>
            <button type="button" style={jump} onClick={() => setCurrent(1)}>{firstLabel}</button>
            <span>{libTemplate(pageLabel, { current, total: pageCount })}</span>
            <button type="button" style={jump} onClick={() => setCurrent(pageCount)}>{lastLabel}</button>
          </p>
        </nav>
      </div>
    </section>
  );
}

/* ==== contact-split · routed channels + a short form with a reply promise ==== */
function LibContactSplit2({
  eyebrow = "Contact",
  headline = "Talk to a person, get briefed by me",
  sub = "Sales, support, and partnerships all land with a human on the Alfred team at E902. Typical reply: one business day.",
  channels = [
    { label: "Sales", value: "sales@seekalfred.ai", note: "Walkthroughs, pricing, rollout" },
    { label: "Support", value: "support@seekalfred.ai", note: "Existing customers" },
    { label: "Everything else", value: "hello@seekalfred.ai", note: "Press, partnerships, and E902" },
  ],
  formFields = [
    { label: "Full name", placeholder: "Your name", type: "text" },
    { label: "Work email", placeholder: "you@company.com", type: "email" },
    { label: "Message", placeholder: "What decision are you trying to speed up?", type: "textarea" },
  ],
  ctaLabel = "Send",
  successMessage = "Received. A human replies within one business day.",
}) {
  const [sent, setSent] = React.useState(false);
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({
        paddingBlock: "96px 96px",
        display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.1fr)",
        gap: 64, alignItems: "start",
      })}>
        <div>
          <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
          <h2 style={{ ...libDisplay(40), maxWidth: 460, marginBlockStart: 20 }}>{headline}</h2>
          <p style={{ ...libSub, maxWidth: 440, marginBlockStart: 16 }}>{sub}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBlockStart: 36 }}>
            {channels.map((c, i) => (
              <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 38, height: 38, borderRadius: "var(--radius-md)", background: "var(--surface-sunken)", border: "1px solid var(--border-subtle)", color: "var(--accent)", flexShrink: 0 }}>{libMailGlyph}</span>
                <div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)" }}>{c.label}</div>
                  <a href={"mailto:" + c.value} style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", fontWeight: "var(--fw-semibold)", color: "var(--text-link)", textDecoration: "none" }}>{c.value}</a>
                  <div style={{ ...libMicro, marginBlockStart: 2 }}>{c.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ ...libCard, boxShadow: "var(--elevation-raised)", padding: 32 }}>
          {sent ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 12, paddingBlock: 24 }}>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: "var(--radius-circle)", background: "var(--accent-soft)", color: "var(--text-on-tint-brand)" }}>{libCheckGlyph}</span>
              <p style={{ ...libSub, fontSize: "var(--text-base)", color: "var(--text-primary)" }}>{successMessage}</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {formFields.map((f, i) => f.type === "textarea" ? (
                <Textarea key={i} label={f.label} placeholder={f.placeholder} rows={4} fill="plain" />
              ) : (
                <Input key={i} label={f.label} type={f.type} placeholder={f.placeholder} fill="plain" />
              ))}
              <Button variant="primary" size="lg" type="submit">{ctaLabel}</Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ==== video-showcase · a watch band: one featured session plus a rail ==== */
function LibVideoShowcase({
  eyebrow = "Watch",
  headline = "Watch the call get made",
  sub = "Real sessions, lightly edited: I flag, a leader decides, and you see the whole trail. Most run under ten minutes.",
  ctaLabel = "Browse all recordings",
  featured = {
    tag: "Teardown",
    title: "From 6 AM flag to approved fix: a CPA spike, end to end",
    byline: "Recorded with the growth team at Meridian",
    duration: "9:24",
    views: "4.2K views",
  },
  items = [
    { tag: "Walkthrough", title: "The Monday brief, read cover to cover", duration: "4:12", views: "6.8K views" },
    { tag: "Q&A", title: "What I do when two sources disagree", duration: "6:40", views: "3.1K views" },
    { tag: "Session", title: "Northwind reallocates $30K on air", duration: "11:05", views: "2.4K views" },
  ],
}) {
  const thumb = (playSize, minHeight) => (
    <div style={{ position: "relative", background: "var(--surface-sunken)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", minHeight, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0 }}>
      <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: playSize, height: playSize, borderRadius: "var(--radius-circle)", background: "var(--surface-card)", border: "1px solid var(--border-default)", boxShadow: "var(--elevation-raised)", color: "var(--accent)" }}>
        {libPlayGlyph(Math.round(playSize * 0.44))}
      </span>
    </div>
  );
  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({ paddingBlock: "96px 96px" })}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
          <div>
            <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge>
            <h2 style={{ ...libDisplay(40), marginBlockStart: 18 }}>{headline}</h2>
            <p style={{ ...libSub, maxWidth: 540, marginBlockStart: 14 }}>{sub}</p>
          </div>
          {ctaLabel ? <Button variant="outline" size="md" style={libGhostCta}>{ctaLabel}</Button> : null}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.35fr) minmax(0, 1fr)", gap: 28, marginBlockStart: 40, alignItems: "start" }}>
          <div>
            <div style={{ position: "relative" }}>
              {thumb(64, 340)}
              <span style={{ position: "absolute", insetBlockEnd: 12, insetInlineEnd: 12 }}>
                <Badge tone="neutral">{featured.duration}</Badge>
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBlockStart: 18 }}>
              <Badge tone="neutral">{featured.tag}</Badge>
              <span style={libMicro}>{featured.views}</span>
            </div>
            <h3 style={{ ...libDisplay(24), letterSpacing: "-0.01em", lineHeight: "var(--lh-snug)", maxWidth: 560, marginBlockStart: 10 }}>{featured.title}</h3>
            {featured.byline ? <p style={{ ...libBody, marginBlockStart: 6 }}>{featured.byline}</p> : null}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {items.map((v, i) => (
              <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ position: "relative", width: 148, flexShrink: 0 }}>
                  {thumb(34, 84)}
                  <span style={{ position: "absolute", insetBlockEnd: 6, insetInlineEnd: 6 }}>
                    <Badge tone="neutral">{v.duration}</Badge>
                  </span>
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ ...libMicro, textTransform: "uppercase", letterSpacing: "0.07em", fontWeight: "var(--fw-bold)" }}>{v.tag}</div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)", lineHeight: "var(--lh-snug)", marginBlockStart: 4 }}>{v.title}</div>
                  <div style={{ ...libMicro, marginBlockStart: 4 }}>{v.views}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

window.LibCardGrid = LibCardGrid;
window.LibFilterChipRow = LibFilterChipRow;
window.LibResourceHubHero = LibResourceHubHero;
window.LibWebinarSplit = LibWebinarSplit;
window.LibPaginationRow = LibPaginationRow;
window.LibContactSplit2 = LibContactSplit2;
window.LibVideoShowcase = LibVideoShowcase;
