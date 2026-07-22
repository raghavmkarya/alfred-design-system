import React from "react";

/**
 * Alfred AI — PageHeader
 * The page-title block for the product app: an optional muted breadcrumb row,
 * a display-scale title + muted subtitle on the left with an actions node on
 * the right, and an optional underline tablist below. Closes with a hairline
 * border. Theme-aware (light app / dark site) and self-contained.
 */

function HeaderTab({ label = "", active = false, onClick = () => {} }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        appearance: "none",
        background: "transparent",
        border: "none",
        borderBottom: `2px solid ${active ? "var(--border-focus)" : "transparent"}`,
        margin: 0,
        padding: "0 1px 12px",
        cursor: "pointer",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-sm)",
        fontWeight: active ? "var(--fw-bold)" : "var(--fw-medium)",
        color: active
          ? "var(--text-primary)"
          : hover
            ? "var(--text-secondary)"
            : "var(--text-muted)",
        whiteSpace: "nowrap",
        transition:
          "color var(--dur-base) var(--ease-standard), border-color var(--dur-base) var(--ease-standard)",
      }}
    >
      {label}
    </button>
  );
}

export function PageHeader({
  title = "",
  subtitle = "",
  breadcrumb = [],
  actions = null,
  tabs = [],
  activeTab = null,
  onTabChange = () => {},
  style = {},
}) {
  const hasTabs = tabs.length > 0;
  const activeId = activeTab != null ? activeTab : tabs[0] && tabs[0].id;

  return (
    <div
      style={{
        width: "100%",
        fontFamily: "var(--font-sans)",
        borderBottom: "1px solid var(--border-subtle)",
        paddingBottom: hasTabs ? 0 : 20,
        ...style,
      }}
    >
      {breadcrumb.length > 0 && (
        <nav
          aria-label="Breadcrumb"
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 7,
            marginBottom: 12,
          }}
        >
          {breadcrumb.map((c, i) => {
            const last = i === breadcrumb.length - 1;
            return (
              <React.Fragment key={`${i}-${(c && c.label) || ""}`}>
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    style={{ color: "var(--text-muted)", fontSize: "var(--text-xs)", lineHeight: 1 }}
                  >
                    /
                  </span>
                )}
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "var(--text-xs)",
                    fontWeight: last ? "var(--fw-semibold)" : "var(--fw-medium)",
                    color: last ? "var(--text-secondary)" : "var(--text-muted)",
                  }}
                >
                  {c && c.label}
                </span>
              </React.Fragment>
            );
          })}
        </nav>
      )}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <div style={{ minWidth: 0 }}>
          {title && (
            <h2
              style={{
                margin: 0,
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-h2)",
                fontWeight: "var(--fw-semibold)",
                letterSpacing: "var(--ls-tight)",
                lineHeight: "var(--lh-snug)",
                color: "var(--text-primary)",
              }}
            >
              {title}
            </h2>
          )}
          {subtitle && (
            <p
              style={{
                margin: "6px 0 0",
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-sm)",
                fontWeight: "var(--fw-regular)",
                lineHeight: "var(--lh-normal)",
                color: "var(--text-muted)",
              }}
            >
              {subtitle}
            </p>
          )}
        </div>

        {actions && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, flex: "none" }}>
            {actions}
          </div>
        )}
      </div>

      {hasTabs && (
        <div
          role="tablist"
          aria-label={title ? `${title} sections` : "Sections"}
          style={{
            display: "flex",
            gap: 24,
            marginTop: 20,
            marginBottom: -1,
            overflowX: "auto",
          }}
        >
          {tabs.map((t) => (
            <HeaderTab
              key={t.id != null ? t.id : t.label}
              label={t.label}
              active={t.id === activeId}
              onClick={() => onTabChange(t.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
