import React from "react";

/**
 * Alfred AI — Sidebar
 * The product navigation rail: a light card surface with a hairline right
 * border. Each item is a full-width button; the active item lifts to a warm
 * orange-50 fill with orange-600 bold text. Optional header (e.g. a logo) sits
 * at the top and an optional footer is pinned to the bottom.
 */
export function Sidebar({
  items = [],
  active = null,
  onSelect = () => {},
  header = null,
  footer = null,
  width = 248,
  style = {},
}) {
  return (
    <nav
      aria-label="Primary"
      style={{
        boxSizing: "border-box",
        width,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "var(--surface-card)",
        borderRight: "1px solid var(--border-subtle)",
        padding: "16px 12px",
        fontFamily: "var(--font-sans)",
        ...style,
      }}
    >
      {header && (
        <div style={{ padding: "4px 8px 14px", marginBottom: 6, borderBottom: "1px solid var(--border-subtle)" }}>
          {header}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 2, paddingTop: header ? 8 : 0 }}>
        {items.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            active={item.id === active}
            onSelect={onSelect}
          />
        ))}
      </div>

      {footer && (
        <div style={{ marginTop: "auto", paddingTop: 14, borderTop: "1px solid var(--border-subtle)" }}>
          {footer}
        </div>
      )}
    </nav>
  );
}

function SidebarItem({ item = {}, active = false, onSelect = () => {} }) {
  const [hover, setHover] = React.useState(false);

  const labelColor = active
    ? "var(--orange-600)"
    : hover
    ? "var(--text-primary)"
    : "var(--text-secondary)";
  const iconColor = active
    ? "var(--orange-500)"
    : hover
    ? "var(--text-secondary)"
    : "var(--text-muted)";

  return (
    <button
      type="button"
      onClick={() => onSelect(item.id)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-current={active ? "page" : undefined}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        width: "100%",
        textAlign: "left",
        border: "1px solid transparent",
        cursor: "pointer",
        padding: "9px 12px",
        borderRadius: "var(--radius-md)",
        background: active ? "var(--orange-50)" : hover ? "var(--surface-sunken)" : "transparent",
        color: labelColor,
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-sm)",
        fontWeight: active ? "var(--fw-bold)" : "var(--fw-medium)",
        lineHeight: 1.2,
        transition:
          "background var(--dur-base) var(--ease-standard), color var(--dur-base) var(--ease-standard)",
      }}
    >
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 20,
          height: 20,
          flex: "none",
          color: iconColor,
        }}
      >
        {item.icon || (
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "var(--radius-pill)",
              background: "currentColor",
              opacity: active ? 1 : 0.55,
            }}
          />
        )}
      </span>

      <span
        style={{
          flex: 1,
          minWidth: 0,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {item.label}
      </span>

      {item.badge != null && item.badge !== "" && (
        <span
          style={{
            flex: "none",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 20,
            height: 20,
            padding: "0 7px",
            borderRadius: "var(--radius-pill)",
            background: active ? "var(--orange-500)" : "var(--orange-100)",
            color: active ? "var(--text-on-orange)" : "var(--orange-700)",
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-2xs)",
            fontWeight: "var(--fw-bold)",
            lineHeight: 1,
          }}
        >
          {item.badge}
        </span>
      )}
    </button>
  );
}
