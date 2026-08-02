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
  Button, EyebrowBadge, Badge, Avatar,
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

window.LibNavbar = LibNavbar;
window.LibAnnouncementBanner = LibAnnouncementBanner;
window.LibPageHeaderHero = LibPageHeaderHero;
window.LibFooter = LibFooter;
