import React from "react";

/**
 * Alfred AI — Accordion
 * Disclosure list of expandable rows — each header is a real button with a
 * rotating chevron, and panels ease open via the grid-rows trick. Single-open
 * by default; `multiple` allows several. Works controlled (`open`/`onChange`)
 * or uncontrolled (`defaultOpen`).
 */
export function Accordion({
  items = [],
  multiple = false,
  defaultOpen = [],
  open,
  onChange,
  bordered = true,
  style = {},
}) {
  const uid = React.useId().replace(/:/g, "");
  const isControlled = open !== undefined;
  const [internal, setInternal] = React.useState(() => (Array.isArray(defaultOpen) ? defaultOpen : []));
  const openIds = isControlled ? (Array.isArray(open) ? open : []) : internal;
  const [hoverId, setHoverId] = React.useState(null);

  const toggle = (id) => {
    const isOpen = openIds.includes(id);
    const next = multiple
      ? (isOpen ? openIds.filter((x) => x !== id) : [...openIds, id])
      : (isOpen ? [] : [id]);
    if (!isControlled) setInternal(next);
    onChange && onChange(next);
  };

  const padX = bordered ? 20 : 2;

  return (
    <div style={{
      fontFamily: "var(--font-sans)", width: "100%",
      border: bordered ? "1px solid var(--border-subtle)" : "none",
      borderRadius: bordered ? "var(--radius-2xl)" : 0,
      overflow: bordered ? "hidden" : "visible",
      background: bordered ? "var(--surface-raised)" : "transparent",
      ...style,
    }}>
      {items.map((item, i) => {
        const isOpen = openIds.includes(item.id);
        const headId = `acc-${uid}-head-${item.id}`;
        const panelId = `acc-${uid}-panel-${item.id}`;
        return (
          <div key={item.id} style={{ borderTop: i > 0 ? "1px solid var(--border-subtle)" : "none" }}>
            <button
              type="button"
              id={headId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              disabled={item.disabled}
              onClick={() => toggle(item.id)}
              onMouseEnter={() => setHoverId(item.id)}
              onMouseLeave={() => setHoverId(null)}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
                width: "100%", padding: `16px ${padX}px`, border: "none", textAlign: "left",
                background: !item.disabled && hoverId === item.id ? "var(--surface-sunken)" : "transparent",
                fontFamily: "var(--font-sans)", fontSize: "var(--text-base)",
                fontWeight: "var(--fw-semibold)", color: "var(--text-primary)",
                cursor: item.disabled ? "not-allowed" : "pointer",
                opacity: item.disabled ? "var(--opacity-disabled)" : 1,
                transition: "background var(--dur-fast) var(--ease-standard)",
              }}
            >
              <span style={{ flex: 1, minWidth: 0 }}>{item.title}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                style={{
                  flex: "none", color: "var(--text-muted)",
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform var(--dur-base) var(--ease-standard)",
                }}>
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <div style={{
              display: "grid", gridTemplateRows: isOpen ? "1fr" : "0fr",
              transition: "grid-template-rows var(--dur-base) var(--ease-standard)",
            }}>
              <div role="region" id={panelId} aria-labelledby={headId} style={{ overflow: "hidden", minHeight: 0 }}>
                <div style={{
                  padding: `0 ${padX}px 18px`, fontSize: "var(--text-sm)",
                  color: "var(--text-secondary)", lineHeight: 1.6,
                  opacity: isOpen ? 1 : 0,
                  transition: "opacity var(--dur-base) var(--ease-standard)",
                }}>
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
