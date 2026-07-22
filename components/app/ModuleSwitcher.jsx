import React from "react";

/**
 * Alfred AI — ModuleSwitcher
 * Workspace module switcher (menu-button pattern). The trigger shows the
 * current module under a small "Module" eyebrow with a status dot and a
 * rotating chevron; the dropdown is a role="menu" of role="menuitemradio"
 * rows, each with a status badge — live modules get a green dot, modules
 * still in development a periwinkle one. Enter, Space or ArrowDown open and
 * focus the checked item, arrows wrap through the list, Home/End jump,
 * Escape closes and returns focus to the trigger. Controlled via `active`;
 * emits onChange(id).
 */
const DEFAULT_MODULES = [
  { id: "marketing", label: "Marketing", status: "live" },
  { id: "sales", label: "Sales", status: "in-development" },
];

const STATUS = {
  live: { word: "Live", dot: "var(--success-500)", fg: "var(--success-500)" },
  "in-development": { word: "In development", dot: "var(--info-500)", fg: "var(--text-secondary)" },
};

export function ModuleSwitcher({
  modules = DEFAULT_MODULES,
  active,
  onChange,
  defaultOpen = false,
  style = {},
  ...rest
}) {
  const items = Array.isArray(modules) && modules.length ? modules : DEFAULT_MODULES;
  const activeId = active != null ? active : items[0].id;
  const checkedIdx = Math.max(0, items.findIndex((m) => m.id === activeId));
  const current = items[checkedIdx];

  const uid = React.useId().replace(/:/g, "");
  const triggerId = `mods-btn-${uid}`;
  const menuId = `mods-menu-${uid}`;

  const [open, setOpen] = React.useState(!!defaultOpen);
  const [activeIdx, setActiveIdx] = React.useState(checkedIdx);
  const [focusVisible, setFocusVisible] = React.useState(false);
  const [hover, setHover] = React.useState(false);

  const triggerRef = React.useRef(null);
  const itemRefs = React.useRef([]);
  const focusPending = React.useRef(false);

  // Move focus into the menu once it has rendered (opened by interaction only,
  // so a defaultOpen preview never steals focus on mount).
  React.useEffect(() => {
    if (open && focusPending.current) {
      focusPending.current = false;
      const el = itemRefs.current[activeIdx];
      if (el) el.focus();
    }
  }, [open, activeIdx]);

  const statusOf = (m) =>
    STATUS[String(m.status || "").trim().toLowerCase().replace(/\s+/g, "-")] || null;

  const openMenu = (idx) => {
    setActiveIdx(idx);
    focusPending.current = true;
    setOpen(true);
  };
  const closeMenu = (refocus) => {
    setOpen(false);
    if (refocus && triggerRef.current) triggerRef.current.focus();
  };
  const pick = (m) => {
    if (typeof onChange === "function") onChange(m.id);
    closeMenu(true);
  };
  const moveTo = (idx) => {
    const next = (idx + items.length) % items.length;
    setActiveIdx(next);
    const el = itemRefs.current[next];
    if (el) el.focus();
  };

  const onTriggerKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      open ? moveTo(activeIdx) : openMenu(checkedIdx);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      open ? moveTo(activeIdx) : openMenu(items.length - 1);
    } else if (e.key === "Escape" && open) {
      e.preventDefault();
      closeMenu(true);
    }
  };

  const onMenuKeyDown = (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); moveTo(activeIdx + 1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); moveTo(activeIdx - 1); }
    else if (e.key === "Home") { e.preventDefault(); moveTo(0); }
    else if (e.key === "End") { e.preventDefault(); moveTo(items.length - 1); }
    else if (e.key === "Escape") { e.preventDefault(); closeMenu(true); }
    else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (items[activeIdx]) pick(items[activeIdx]);
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  };

  const currentStatus = statusOf(current);

  return (
    <div
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false); }}
      style={{
        position: "relative", display: "inline-block", minWidth: 248,
        fontFamily: "var(--font-sans)", ...style,
      }}
      {...rest}
    >
      <button
        ref={triggerRef}
        id={triggerId}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => (open ? closeMenu(false) : openMenu(checkedIdx))}
        onKeyDown={onTriggerKeyDown}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={(e) => {
          let v = false;
          try { v = e.target.matches(":focus-visible"); } catch (err) { v = true; }
          setFocusVisible(v);
        }}
        onBlur={() => setFocusVisible(false)}
        style={{
          display: "flex", alignItems: "center", gap: 12, width: "100%",
          padding: "9px 12px", textAlign: "left", cursor: "pointer",
          background: hover || open ? "var(--surface-sunken)" : "var(--surface-card)",
          border: `1px solid ${open ? "var(--border-focus)" : "var(--border-default)"}`,
          borderRadius: "var(--radius-md)",
          boxShadow: focusVisible ? "var(--shadow-focus)" : "var(--shadow-xs)",
          transition: "background var(--dur-base) var(--ease-standard), border-color var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard)",
        }}
      >
        <span aria-hidden="true" style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          width: 34, height: 34, flex: "none", borderRadius: 10,
          background: "var(--accent-soft)", color: "var(--text-on-tint-brand)",
        }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
            <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
            <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
            <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
          </svg>
        </span>

        <span style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 2 }}>
          <span style={{
            fontSize: "var(--text-2xs)", fontWeight: "var(--fw-semibold)",
            letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)",
          }}>Module</span>
          <span style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
            <span style={{
              fontSize: "var(--text-base)", fontWeight: "var(--fw-semibold)", lineHeight: 1.2,
              color: "var(--text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            }}>{current.label}</span>
            {currentStatus && (
              <span aria-hidden="true" style={{
                width: 6, height: 6, flex: "none",
                borderRadius: "var(--radius-circle)", background: currentStatus.dot,
              }} />
            )}
          </span>
        </span>

        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)"
          strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
          style={{
            flex: "none",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform var(--dur-base) var(--ease-standard)",
          }}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          id={menuId}
          aria-labelledby={triggerId}
          onKeyDown={onMenuKeyDown}
          style={{
            position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0,
            zIndex: "var(--z-dropdown)",
            background: "var(--surface-raised)", border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-md)", padding: 6,
          }}
        >
          {items.map((m, i) => {
            const checked = m.id === activeId;
            const s = statusOf(m);
            return (
              <button
                key={m.id != null ? m.id : i}
                ref={(el) => { itemRefs.current[i] = el; }}
                type="button"
                role="menuitemradio"
                aria-checked={checked}
                tabIndex={-1}
                onClick={() => pick(m)}
                onMouseEnter={() => setActiveIdx(i)}
                onFocus={() => setActiveIdx(i)}
                style={{
                  display: "flex", alignItems: "center", gap: 10, width: "100%",
                  padding: "10px 10px", border: "none", textAlign: "left", cursor: "pointer",
                  borderRadius: "var(--radius-sm)",
                  background: i === activeIdx ? "var(--accent-soft)" : "transparent",
                  fontFamily: "var(--font-sans)",
                  transition: "background var(--dur-fast) var(--ease-standard)",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)"
                  strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                  style={{ flex: "none", opacity: checked ? 1 : 0 }}>
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
                <span style={{
                  flex: 1, minWidth: 0, fontSize: "var(--text-sm)", lineHeight: 1.3,
                  fontWeight: checked ? "var(--fw-bold)" : "var(--fw-medium)",
                  color: "var(--text-primary)",
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                }}>{m.label}</span>
                {s && (
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: 6, flex: "none",
                    padding: "3px 9px", borderRadius: "var(--radius-pill)",
                    border: "1px solid var(--border-subtle)", background: "var(--surface-card)",
                    fontSize: "var(--text-2xs)", fontWeight: "var(--fw-semibold)",
                    color: s.fg, lineHeight: 1.4, whiteSpace: "nowrap",
                  }}>
                    <span aria-hidden="true" style={{
                      width: 6, height: 6, flex: "none",
                      borderRadius: "var(--radius-circle)", background: s.dot,
                    }} />
                    {s.word}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
