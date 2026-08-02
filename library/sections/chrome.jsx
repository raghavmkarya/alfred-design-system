/* ============================================================
   Alfred - Inspiration Library · SITE CHROME.
   The four framing surfaces every marketing page shares: navbar,
   announcement banner, interior page header and footer. Distilled
   from the 107-site competitor sweep and rebuilt on design-system
   tokens so each renders truthfully in light and data-theme="dark".
   Every component ships complete default copy: a bare <LibNavbar />
   is finished chrome. Compiled to a committed .js twin by
   scripts/build-kits.mjs; catalogued in library/meta/chrome.json.
   ============================================================ */
const {
  Button, EyebrowBadge, Badge, Avatar, Kbd,
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
const libFieldStyle = {
  flex: 1, minWidth: 0, height: 44, paddingInline: 16, borderRadius: "var(--radius-md)",
  border: "1px solid var(--border-default)", background: "var(--surface-input-plain)",
  color: "var(--text-primary)", fontFamily: "var(--font-sans)", fontSize: "var(--text-base)",
};
const libLinkStyle = {
  fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-medium)",
  color: "var(--text-secondary)", textDecoration: "none", lineHeight: "var(--lh-normal)",
};
/* The wordmark's gradient tile is the ONE gradient element of any
   section that renders it. */
const LibWordmark = ({ text }) => (
  <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 9, textDecoration: "none" }}>
    <span aria-hidden="true" style={{ width: 22, height: 22, borderRadius: 7, background: "var(--gradient-brand)", flexShrink: 0 }} />
    <span style={{ fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)", fontSize: 20, letterSpacing: "-0.02em", lineHeight: 1, color: "var(--text-primary)" }}>{text}</span>
  </a>
);
/* Directional glyphs are scaled by var(--flip) so they mirror under RTL. */
const libChevron = (size) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0, transform: "scaleX(var(--flip))" }}>
    <path d="M9 5l7 7-7 7" />
  </svg>
);
const libCloseGlyph = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);
const libMenuGlyph = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);
const libDotSep = (
  <span aria-hidden="true" style={{ width: 3, height: 3, borderRadius: "50%", background: "currentColor", opacity: 0.6, flexShrink: 0 }} />
);
/* Display lives in the stylesheet, not inline, so the media query can
   swap desktop links for the mobile menu button. */
const libNavCss = `
.lib-nav-links { display: flex; }
.lib-nav-actions { display: flex; }
.lib-nav-burger { display: none; }
.lib-nav-panel { display: none; }
@media (max-width: 760px) {
  .lib-nav-links { display: none; }
  .lib-nav-actions { display: none; }
  .lib-nav-burger { display: inline-flex; }
  .lib-nav-panel { display: flex; }
}
`;

/* ......... navbar · sticky marketing nav, dual CTA ......... */
function LibNavbar({
  logoText = "alfred ai",
  items = [
    { label: "Product", href: "/product" },
    { label: "How it works", href: "/how-it-works" },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", href: "/resources" },
    { label: "Company", href: "/about" },
  ],
  ctaLabel = "Talk to sales",
  secondaryCtaLabel = "Sign in",
  mobileMenuLabel = "Menu",
  variant = "standard", /* "standard" | "slim" | "transparent" */
}) {
  const [open, setOpen] = React.useState(false);
  const slim = variant === "slim";
  const transparent = variant === "transparent";
  const ctaSize = slim ? "sm" : "md";
  return (
    <header style={{
      position: transparent ? "relative" : "sticky",
      insetBlockStart: transparent ? undefined : 0,
      zIndex: "var(--z-nav)",
      background: transparent ? "transparent" : "var(--surface-veil)",
      backdropFilter: transparent ? undefined : "blur(14px)",
      WebkitBackdropFilter: transparent ? undefined : "blur(14px)",
      borderBlockEnd: transparent ? "1px solid transparent" : "1px solid var(--border-subtle)",
    }}>
      <style>{libNavCss}</style>
      <div style={libContainer({ height: slim ? 56 : 68, display: "flex", alignItems: "center", gap: 28 })}>
        <LibWordmark text={logoText} />
        {items && items.length ? (
          <nav aria-label="Main" className="lib-nav-links" style={{ alignItems: "center", gap: 26 }}>
            {items.map((it, i) => (
              <a key={i} href={it.href || "#"} style={libLinkStyle}>{it.label}</a>
            ))}
          </nav>
        ) : null}
        <div className="lib-nav-actions" style={{ alignItems: "center", gap: 10, marginInlineStart: "auto" }}>
          {secondaryCtaLabel ? <Button variant="ghost" size={ctaSize}>{secondaryCtaLabel}</Button> : null}
          <Button variant="primary" size={ctaSize}>{ctaLabel}</Button>
        </div>
        <button
          type="button" className="lib-nav-burger" aria-label={mobileMenuLabel} aria-expanded={open}
          onClick={() => setOpen(!open)}
          style={{
            marginInlineStart: "auto", alignItems: "center", justifyContent: "center",
            width: 40, height: 40, background: "transparent", border: "none", padding: 0,
            color: "var(--text-primary)", borderRadius: "var(--radius-sm)", cursor: "pointer",
          }}
        >{open ? libCloseGlyph : libMenuGlyph}</button>
      </div>
      {open ? (
        <div className="lib-nav-panel" style={{
          flexDirection: "column", gap: 2, paddingInline: 40, paddingBlock: 12,
          borderBlockStart: "1px solid var(--border-subtle)",
          background: transparent ? "var(--bg-page)" : undefined,
        }}>
          {items.map((it, i) => (
            <a key={i} href={it.href || "#"} style={{ ...libLinkStyle, fontSize: "var(--text-base)", paddingBlock: 10 }}>{it.label}</a>
          ))}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBlockStart: 10 }}>
            {secondaryCtaLabel ? <Button variant="ghost" size="md">{secondaryCtaLabel}</Button> : null}
            <Button variant="primary" size="md">{ctaLabel}</Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}

/* ......... announcement-banner · one line above the nav ......... */
function LibAnnouncementBanner({
  text = "Launch offer: 50% off your first two months, on every plan.",
  ctaLabel = "See pricing",
  dismissLabel = "Dismiss",
  badge = "",
  variant = "gradient", /* "gradient" | "subtle" */
}) {
  const [dismissed, setDismissed] = React.useState(false);
  if (dismissed) return null;
  const gradient = variant === "gradient";
  return (
    <div role="region" aria-label="Announcement" style={{
      position: "relative",
      background: gradient ? "var(--gradient-brand)" : "var(--surface-sunken)",
      color: gradient ? "var(--text-on-brand)" : "var(--text-secondary)",
      borderBlockEnd: gradient ? undefined : "1px solid var(--border-subtle)",
    }}>
      <div style={{
        maxWidth: 1120, marginInline: "auto", paddingInline: 56, paddingBlock: 11,
        display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap",
        fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", lineHeight: "var(--lh-snug)",
      }}>
        {badge ? <Badge tone="brand">{badge}</Badge> : null}
        <span style={{ fontWeight: "var(--fw-medium)", textAlign: "center" }}>{text}</span>
        {ctaLabel ? (
          <a href="#" style={{
            display: "inline-flex", alignItems: "center", gap: 4,
            color: gradient ? "inherit" : "var(--text-link)", fontWeight: "var(--fw-semibold)",
            textDecoration: "underline", textUnderlineOffset: 3,
          }}>
            {ctaLabel}
            {libChevron(13)}
          </a>
        ) : null}
      </div>
      <button
        type="button" aria-label={dismissLabel} onClick={() => setDismissed(true)}
        style={{
          position: "absolute", insetInlineEnd: 10, insetBlockStart: "50%", transform: "translateY(-50%)",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          width: 30, height: 30, padding: 0, background: "transparent", border: "none",
          color: "inherit", borderRadius: "var(--radius-sm)", cursor: "pointer",
        }}
      >{libCloseGlyph}</button>
    </div>
  );
}

/* ......... page-header · interior page opener ......... */
function LibPageHeaderHero({
  variant = "centered", /* "centered" | "left" | "blog-post" */
  eyebrow = "How it works",
  headline = "From signal to decision in four steps",
  sub = "I connect to your stack, learn how your business behaves, and brief you on what to act on. Here is the full path, end to end.",
  breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "How it works", href: "" },
  ],
  authorName = "The Alfred team",
  publishDate = "July 28, 2026",
  readTime = "6 min read",
  category = "Essay",
}) {
  const blog = variant === "blog-post";
  const centered = variant !== "left";
  return (
    <section style={{ background: "var(--bg-page)", borderBlockEnd: "1px solid var(--border-subtle)" }}>
      <div style={libContainer({
        paddingBlock: blog ? "88px 56px" : "88px 64px",
        textAlign: centered ? "center" : "start",
        maxWidth: blog ? 860 : 1120,
      })}>
        {breadcrumbs && breadcrumbs.length ? (
          <nav aria-label="Breadcrumb" style={{ marginBlockEnd: 22 }}>
            <ol style={{
              listStyle: "none", margin: 0, padding: 0, display: "flex", flexWrap: "wrap",
              justifyContent: centered ? "center" : "flex-start", alignItems: "center", gap: 8,
              fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--text-muted)",
            }}>
              {breadcrumbs.map((b, i) => (
                <li key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {i > 0 ? <span aria-hidden="true" style={{ display: "inline-flex" }}>{libChevron(11)}</span> : null}
                  {b.href
                    ? <a href={b.href} style={{ color: "inherit", textDecoration: "none" }}>{b.label}</a>
                    : <span aria-current="page" style={{ color: "var(--text-secondary)" }}>{b.label}</span>}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
        {eyebrow ? <EyebrowBadge tone="brand">{eyebrow}</EyebrowBadge> : null}
        <h1 style={{
          ...libDisplay(blog ? 42 : centered ? 48 : 46),
          maxWidth: centered ? 760 : 680, marginBlockStart: 18,
          marginInline: centered ? "auto" : undefined,
        }}>{headline}</h1>
        {sub ? (
          <p style={{
            ...libSub, maxWidth: centered ? 620 : 560, marginBlockStart: 18,
            marginInline: centered ? "auto" : undefined,
          }}>{sub}</p>
        ) : null}
        {blog ? (
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap",
            marginBlockStart: 28, fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-secondary)",
          }}>
            <Avatar name={authorName} size={28} />
            <span style={{ fontWeight: "var(--fw-medium)", color: "var(--text-primary)" }}>{authorName}</span>
            {libDotSep}
            <span>{publishDate}</span>
            {libDotSep}
            <span>{readTime}</span>
            {category ? <Badge tone="brand" style={{ marginInlineStart: 6 }}>{category}</Badge> : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}

/* ......... footer · the footer as sitemap ......... */
function LibFooter({
  logoText = "alfred ai",
  tagline = "The AI memory powering every decision across your organisation. Not your files. Not your meetings. Your decisions, their outcomes, and what caused what.",
  columns = [
    { title: "Product", links: ["Alfred for Marketing", "How it works", "Integrations", "Pricing", "Product updates"] },
    { title: "Coming next", links: ["Alfred for Sales (waitlist)", "Alfred for Receivables (waitlist)"] },
    { title: "Resources", links: ["The library", "Playbooks", "FAQ", "Contact"] },
    { title: "Company", links: ["About E902", "Careers", "Privacy", "Terms"] },
  ],
  newsletterHeadline = "One email a week. Read less, know more.",
  newsletterPlaceholder = "you@company.com",
  newsletterCtaLabel = "Subscribe",
  socialLinks = [
    { label: "LinkedIn", href: "#" },
    { label: "X", href: "#" },
    { label: "YouTube", href: "#" },
  ],
  legalText = "© 2026 E902. Alfred is a product of E902 (e902.ai).",
  variant = "fat", /* "fat" | "minimal" | "legal-only" */
}) {
  const [email, setEmail] = React.useState("");
  const flatLinks = (columns || []).flatMap((c) => c.links || []);
  const legalStyle = { fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--text-muted)", lineHeight: "var(--lh-normal)" };
  const socialRow = socialLinks && socialLinks.length ? (
    <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
      {socialLinks.map((s, i) => (
        <a key={i} href={s.href || "#"} style={{ ...libLinkStyle, fontSize: "var(--text-xs)" }}>{s.label}</a>
      ))}
    </div>
  ) : null;

  if (variant === "legal-only") {
    return (
      <footer style={{ background: "var(--bg-page)", borderBlockStart: "1px solid var(--border-subtle)" }}>
        <div style={libContainer({
          paddingBlock: 28, display: "flex", flexWrap: "wrap", alignItems: "center",
          justifyContent: "center", gap: "10px 28px", textAlign: "center",
        })}>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)", fontSize: 15, letterSpacing: "-0.01em", color: "var(--text-primary)" }}>{logoText}</span>
          <nav aria-label="Legal" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px 22px" }}>
            {flatLinks.map((l, i) => (
              <a key={i} href="#" style={{ ...libLinkStyle, fontSize: "var(--text-xs)" }}>{l}</a>
            ))}
          </nav>
          <span style={legalStyle}>{legalText}</span>
        </div>
      </footer>
    );
  }

  if (variant === "minimal") {
    return (
      <footer style={{ background: "var(--bg-page)", borderBlockStart: "1px solid var(--border-subtle)" }}>
        <div style={libContainer({ paddingBlock: "48px 28px" })}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: "24px 48px" }}>
            <div style={{ maxWidth: 320 }}>
              <LibWordmark text={logoText} />
              {tagline ? <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: "var(--lh-normal)", margin: 0, marginBlockStart: 12 }}>{tagline}</p> : null}
            </div>
            <nav aria-label="Footer" style={{ display: "flex", flexWrap: "wrap", gap: "10px 24px" }}>
              {flatLinks.map((l, i) => (
                <a key={i} href="#" style={libLinkStyle}>{l}</a>
              ))}
            </nav>
          </div>
          <div style={{
            marginBlockStart: 32, paddingBlockStart: 20, borderBlockStart: "1px solid var(--border-subtle)",
            display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16,
          }}>
            <span style={legalStyle}>{legalText}</span>
            {socialRow}
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer style={{ background: "var(--surface-sunken)", borderBlockStart: "1px solid var(--border-subtle)" }}>
      <div style={libContainer({ paddingBlock: "72px 32px" })}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "48px 64px" }}>
          <div style={{ flex: "1 1 280px", maxWidth: 380, minWidth: 240 }}>
            <LibWordmark text={logoText} />
            {tagline ? (
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: "var(--lh-relaxed)", margin: 0, marginBlockStart: 16 }}>{tagline}</p>
            ) : null}
            {newsletterCtaLabel ? (
              <div style={{ marginBlockStart: 28 }}>
                {newsletterHeadline ? (
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)", marginBlockEnd: 10 }}>{newsletterHeadline}</div>
                ) : null}
                <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <input
                    value={email} onChange={(e) => setEmail(e.target.value)} type="email" required
                    placeholder={newsletterPlaceholder} aria-label="Work email" style={libFieldStyle}
                  />
                  <Button variant="secondary" type="submit">{newsletterCtaLabel}</Button>
                </form>
              </div>
            ) : null}
          </div>
          <div style={{
            flex: "2 1 460px", display: "grid", alignContent: "start",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "36px 24px",
          }}>
            {columns.map((col, i) => (
              <div key={i}>
                {col.title ? (
                  <div style={{
                    fontFamily: "var(--font-sans)", fontSize: "var(--text-2xs)", fontWeight: "var(--fw-bold)",
                    color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "var(--ls-caps)",
                    marginBlockEnd: 14,
                  }}>{col.title}</div>
                ) : null}
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {(col.links || []).map((l, j) => (
                    <li key={j}><a href="#" style={libLinkStyle}>{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div style={{
          marginBlockStart: 52, paddingBlockStart: 20, borderBlockStart: "1px solid var(--border-subtle)",
          display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16,
        }}>
          <span style={legalStyle}>{legalText}</span>
          {socialRow}
        </div>
      </div>
    </footer>
  );
}

/* ---- shared glyphs and styles for the two open-specimen surfaces ---- */
const libChevronDown = (size) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);
const libSearchGlyph = (size) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" style={{ flexShrink: 0 }}>
    <circle cx="11" cy="11" r="7" />
    <path d="M16.6 16.6L21 21" />
  </svg>
);
const libDocGlyph = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M7 3h7l5 5v13H7z" />
    <path d="M14 3v5h5" />
  </svg>
);
const libClockGlyph = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);
const libColEyebrow = {
  fontFamily: "var(--font-sans)", fontSize: "var(--text-2xs)", fontWeight: "var(--fw-bold)",
  color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "var(--ls-caps)",
};
/* First case-insensitive hit of the query, wrapped in an accent-soft mark. */
const libHighlight = (text, query) => {
  const q = (query || "").trim();
  if (!q) return text;
  const at = text.toLowerCase().indexOf(q.toLowerCase());
  if (at === -1) return text;
  return (
    <>
      {text.slice(0, at)}
      <mark style={{ background: "var(--accent-soft)", color: "var(--text-primary)", borderRadius: 3, paddingInline: 1 }}>{text.slice(at, at + q.length)}</mark>
      {text.slice(at + q.length)}
    </>
  );
};

/* The desktop grid keeps role columns side by side with the promo card
   trailing; under 860px the header collapses to the wordmark and the panel
   stacks like the mobile drawer, promo last, CTA pair pinned at the end. */
const libMegaCss = `
.lib-mm-links { display: flex; }
.lib-mm-actions { display: flex; }
.lib-mm-cols { display: grid; grid-template-columns: var(--mm-cols, minmax(0, 1fr)); gap: 36px 48px; }
.lib-mm-mobile-cta { display: none; }
@media (max-width: 860px) {
  .lib-mm-links { display: none; }
  .lib-mm-actions { display: none; }
  .lib-mm-cols { grid-template-columns: minmax(0, 1fr); gap: 28px; }
  .lib-mm-mobile-cta { display: flex; }
}
`;

/* ......... mega-menu · expanded role-grouped panel, shown open ......... */
function LibMegaMenu({
  logoText = "alfred ai",
  items = [
    { label: "Product", href: "/product" },
    { label: "Solutions", href: "/solutions" },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", href: "/resources" },
    { label: "Company", href: "/about" },
  ],
  openItem = "Product",
  columns = [
    { eyebrow: "For marketing", links: [
      { label: "The Monday brief", description: "Your week's decisions, drafted before you sit down." },
      { label: "Channel spend", description: "I watch every channel and flag reallocations before they cost you." },
      { label: "Creative fatigue", description: "I catch tired creative days before it shows in your CPA." },
      { label: "Attribution", description: "One causal answer per question, sources attached." },
    ] },
    { eyebrow: "For finance", links: [
      { label: "Budget pacing" },
      { label: "Forecast vs actuals" },
      { label: "Spend audit trail" },
      { label: "Approvals" },
      { label: "Board pack" },
    ] },
  ],
  promo = {
    eyebrow: "Customer story",
    title: "Northwind cut wasted spend 23%",
    body: "See the decisions I surfaced in their first 30 days.",
    ctaLabel: "Read the story",
  },
  ctaLabel = "Ask Alfred",
  secondaryCtaLabel = "See pricing",
}) {
  const track = `repeat(${Math.max((columns || []).length, 1)}, minmax(0, 1fr))${promo ? " minmax(0, 0.95fr)" : ""}`;
  return (
    <section style={{ background: "var(--bg-page)", paddingBlockEnd: 88 }}>
      <style>{libMegaCss}</style>
      <header style={{
        background: "var(--surface-veil)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
        borderBlockEnd: "1px solid var(--border-subtle)",
      }}>
        <div style={libContainer({ height: 68, display: "flex", alignItems: "center", gap: 28 })}>
          <LibWordmark text={logoText} />
          <nav aria-label="Main" className="lib-mm-links" style={{ alignItems: "center", gap: 26 }}>
            {items.map((it, i) => it.label === openItem ? (
              <button key={i} type="button" aria-expanded="true" style={{
                display: "inline-flex", alignItems: "center", gap: 5, padding: 0, background: "transparent",
                border: "none", cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)",
                fontWeight: "var(--fw-semibold)", color: "var(--text-primary)", lineHeight: "var(--lh-normal)",
              }}>
                {it.label}
                {libChevronDown(13)}
              </button>
            ) : (
              <a key={i} href={it.href || "#"} style={libLinkStyle}>{it.label}</a>
            ))}
          </nav>
          <div className="lib-mm-actions" style={{ alignItems: "center", gap: 10, marginInlineStart: "auto" }}>
            {secondaryCtaLabel ? <Button variant="ghost" size="md">{secondaryCtaLabel}</Button> : null}
            <Button variant="primary" size="md">{ctaLabel}</Button>
          </div>
        </div>
      </header>
      <div role="region" aria-label={`${openItem} menu`} style={{
        background: "var(--surface-card)", borderBlockEnd: "1px solid var(--border-subtle)",
        boxShadow: "var(--elevation-overlay)",
      }}>
        <div className="lib-mm-cols" style={{ ...libContainer({ paddingBlock: "34px 38px" }), "--mm-cols": track }}>
          {(columns || []).map((col, i) => (
            <div key={i}>
              {col.eyebrow ? <div style={{ ...libColEyebrow, marginBlockEnd: 16 }}>{col.eyebrow}</div> : null}
              <ul style={{
                listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column",
                gap: (col.links || []).some((l) => l.description) ? 16 : 12,
              }}>
                {(col.links || []).map((l, j) => (
                  <li key={j}>
                    <a href={l.href || "#"} style={{ textDecoration: "none", display: "block" }}>
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-medium)", color: "var(--text-primary)", lineHeight: "var(--lh-normal)" }}>{l.label}</span>
                      {l.description ? (
                        <span style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--text-muted)", lineHeight: "var(--lh-normal)", marginBlockStart: 3 }}>{l.description}</span>
                      ) : null}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {promo ? (
            <div style={{
              background: "var(--surface-sunken)", border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-lg)", padding: 20, alignSelf: "start",
            }}>
              {promo.eyebrow ? <Badge tone="brand">{promo.eyebrow}</Badge> : null}
              <div style={{
                fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)", fontSize: 19,
                letterSpacing: "-0.01em", lineHeight: 1.25, color: "var(--text-primary)", marginBlockStart: 12,
              }}>{promo.title}</div>
              {promo.body ? (
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--text-secondary)", lineHeight: "var(--lh-normal)", margin: 0, marginBlockStart: 6 }}>{promo.body}</p>
              ) : null}
              {promo.ctaLabel ? (
                <a href="#" style={{
                  display: "inline-flex", alignItems: "center", gap: 4, marginBlockStart: 12,
                  fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-semibold)",
                  color: "var(--text-link)", textDecoration: "none",
                }}>
                  {promo.ctaLabel}
                  {libChevron(13)}
                </a>
              ) : null}
            </div>
          ) : null}
          <div className="lib-mm-mobile-cta" style={{ gap: 10, flexWrap: "wrap" }}>
            {secondaryCtaLabel ? <Button variant="ghost" size="md">{secondaryCtaLabel}</Button> : null}
            <Button variant="primary" size="md">{ctaLabel}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ......... search-overlay · command-K search, shown open ......... */
function LibSearchOverlay({
  placeholder = "Ask me where anything lives",
  query = "spend",
  groups = [
    { label: "How it works", items: [
      { title: "How I score channel spend", path: "How it works · Scoring" },
      { title: "Where the spend data comes from", path: "How it works · Sources" },
    ] },
    { label: "Playbooks", items: [
      { title: "The wasted-spend sweep", path: "Playbooks · Budget" },
      { title: "Reallocating mid-quarter without a fight", path: "Playbooks · Budget" },
    ] },
    { label: "Pricing", items: [
      { title: "What counts as managed spend", path: "Pricing · FAQ" },
    ] },
  ],
  recentHeading = "Recent",
  recent = ["Creative fatigue threshold", "Connect GA4 in an afternoon"],
  emptyHeading = "Try one of these",
  suggestions = ["How I score channel spend", "What teams like Meridian pay per seat", "What happens in the first 30 days"],
  noResultsText = "I found nothing for that. Try a shorter phrase or ask me directly.",
  askLabel = "Ask me instead",
  footerHints = [
    { keys: ["↑", "↓"], label: "to move" },
    { keys: ["↵"], label: "to open" },
    { keys: ["esc"], label: "to close" },
  ],
  footerNote = "Searching all 140 pages of this site",
  variant = "results", /* "results" | "empty" | "no-results" */
}) {
  const [q, setQ] = React.useState(variant === "empty" ? "" : query);
  const rowStyle = (selected) => ({
    display: "flex", alignItems: "center", gap: 12, paddingBlock: 9, paddingInline: "18px 20px",
    cursor: "pointer",
    background: selected ? "var(--accent-soft)" : "transparent",
    borderInlineStart: selected ? "2px solid var(--accent)" : "2px solid transparent",
  });
  const rowTitleStyle = {
    display: "block", fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)",
    fontWeight: "var(--fw-medium)", color: "var(--text-primary)", lineHeight: "var(--lh-normal)",
    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
  };
  const groupEyebrow = (label) => (
    <div style={{ ...libColEyebrow, paddingInline: 20, marginBlockStart: 16, marginBlockEnd: 6 }}>{label}</div>
  );
  const plainRow = (glyph, label, i) => (
    <li key={i} role="option" aria-selected={false} style={rowStyle(false)}>
      <span style={{ display: "inline-flex", color: "var(--text-muted)", flexShrink: 0 }}>{glyph}</span>
      <span style={{ ...rowTitleStyle, flex: 1, minWidth: 0 }}>{label}</span>
    </li>
  );

  let body = null;
  if (variant === "no-results") {
    body = (
      <div style={{ paddingBlock: "30px 22px", paddingInline: 24, textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: "var(--lh-normal)", margin: 0 }}>{noResultsText}</p>
        {askLabel ? (
          <a href="#" style={{
            display: "inline-flex", alignItems: "center", gap: 4, marginBlockStart: 12,
            fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-semibold)",
            color: "var(--text-link)", textDecoration: "none",
          }}>
            {askLabel}
            {libChevron(13)}
          </a>
        ) : null}
      </div>
    );
  } else if (variant === "empty") {
    body = (
      <>
        {recent && recent.length ? (
          <div>
            {groupEyebrow(recentHeading)}
            <ul role="listbox" aria-label={recentHeading} style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {recent.map((r, i) => plainRow(libClockGlyph, r, i))}
            </ul>
          </div>
        ) : null}
        <div>
          {groupEyebrow(emptyHeading)}
          <ul role="listbox" aria-label={emptyHeading} style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {(suggestions || []).map((s, i) => plainRow(libSearchGlyph(16), s, i))}
          </ul>
        </div>
      </>
    );
  } else {
    body = (groups || []).map((g, gi) => (
      <div key={gi}>
        {groupEyebrow(g.label)}
        <ul role="listbox" aria-label={g.label} style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {(g.items || []).map((it, ii) => {
            const selected = gi === 0 && ii === 0;
            return (
              <li key={ii} role="option" aria-selected={selected} style={rowStyle(selected)}>
                <span style={{ display: "inline-flex", color: selected ? "var(--accent)" : "var(--text-muted)", flexShrink: 0 }}>{libDocGlyph}</span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={rowTitleStyle}>{libHighlight(it.title, q)}</span>
                  {it.path ? (
                    <span style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: "var(--text-2xs)", color: "var(--text-muted)", marginBlockStart: 1 }}>{it.path}</span>
                  ) : null}
                </span>
                {selected ? <Kbd>↵</Kbd> : null}
              </li>
            );
          })}
        </ul>
      </div>
    ));
  }

  return (
    <section style={{ background: "var(--bg-page)" }}>
      <div style={libContainer({ paddingBlock: 72 })}>
        <div style={{ background: "var(--overlay-scrim)", borderRadius: "var(--radius-2xl)", paddingBlock: 56, paddingInline: 24 }}>
          <div role="dialog" aria-label="Site search" style={{
            maxWidth: 620, marginInline: "auto", overflow: "hidden",
            background: "var(--surface-card)", border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-xl)", boxShadow: "var(--elevation-modal)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, paddingInline: 20, height: 58, borderBlockEnd: "1px solid var(--border-subtle)" }}>
              <span style={{ display: "inline-flex", color: "var(--text-muted)", flexShrink: 0 }}>{libSearchGlyph(17)}</span>
              <input
                value={q} onChange={(e) => setQ(e.target.value)} placeholder={placeholder} aria-label="Search this site"
                style={{
                  flex: 1, minWidth: 0, height: "100%", border: "none", background: "transparent",
                  color: "var(--text-primary)", fontFamily: "var(--font-sans)", fontSize: "var(--text-base)",
                }}
              />
              <Kbd>esc</Kbd>
            </div>
            <div style={{ paddingBlockEnd: 12 }}>{body}</div>
            <div style={{
              borderBlockStart: "1px solid var(--border-subtle)", display: "flex", alignItems: "center",
              justifyContent: "space-between", flexWrap: "wrap", gap: "8px 18px", paddingInline: 20, paddingBlock: 10,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                {(footerHints || []).map((h, i) => (
                  <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <span style={{ display: "inline-flex", gap: 3 }}>{(h.keys || []).map((k, j) => <Kbd key={j}>{k}</Kbd>)}</span>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-2xs)", color: "var(--text-muted)" }}>{h.label}</span>
                  </span>
                ))}
              </div>
              {footerNote ? <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-2xs)", color: "var(--text-muted)" }}>{footerNote}</span> : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

window.LibNavbar = LibNavbar;
window.LibAnnouncementBanner = LibAnnouncementBanner;
window.LibPageHeaderHero = LibPageHeaderHero;
window.LibFooter = LibFooter;
window.LibMegaMenu = LibMegaMenu;
window.LibSearchOverlay = LibSearchOverlay;
