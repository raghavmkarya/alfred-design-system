import React from "react";

/**
 * Alfred AI — Menu
 * Vertical action list, typically rendered inside a Popover. `items`:
 * [{label, onClick, icon?, danger?, disabled?}] or {divider:true}. Rows tint
 * on hover and danger items read in red. Keyboard operable: ArrowUp/ArrowDown
 * move through enabled items (roving tabindex), Home/End jump, typing a label
 * prefix focuses the next match, Enter/Space activate.
 */
export function Menu({ items = [], style = {} }) {
  const itemRefs = React.useRef([]);
  const typeRef = React.useRef({ text: "", at: 0 });
  const [activeIndex, setActiveIndex] = React.useState(() => items.findIndex((it) => !it.divider && !it.disabled));

  const enabledIndexes = items.map((it, i) => (!it.divider && !it.disabled ? i : -1)).filter((i) => i !== -1);

  const focusAt = (idx) => {
    setActiveIndex(idx);
    const node = itemRefs.current[idx];
    if (node) node.focus();
  };

  const onKeyDown = (e) => {
    const count = enabledIndexes.length;
    if (!count) return;
    const pos = enabledIndexes.indexOf(activeIndex);
    if (e.key === "ArrowDown") { e.preventDefault(); focusAt(enabledIndexes[pos < 0 ? 0 : (pos + 1) % count]); }
    else if (e.key === "ArrowUp") { e.preventDefault(); focusAt(enabledIndexes[pos < 0 ? count - 1 : (pos - 1 + count) % count]); }
    else if (e.key === "Home") { e.preventDefault(); focusAt(enabledIndexes[0]); }
    else if (e.key === "End") { e.preventDefault(); focusAt(enabledIndexes[count - 1]); }
    else if (e.key.length === 1 && /[a-z0-9]/i.test(e.key) && !e.ctrlKey && !e.metaKey && !e.altKey) {
      const now = Date.now();
      const t = typeRef.current;
      t.text = now - t.at < 500 ? t.text + e.key.toLowerCase() : e.key.toLowerCase();
      t.at = now;
      const from = t.text.length > 1 ? Math.max(pos, 0) : pos + 1;
      for (let k = 0; k < count; k++) {
        const idx = enabledIndexes[(from + k) % count];
        const label = typeof items[idx].label === "string" ? items[idx].label.toLowerCase() : "";
        if (label.startsWith(t.text)) { focusAt(idx); break; }
      }
    }
  };

  return (
    <div role="menu" onKeyDown={onKeyDown} style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 180, ...style }}>
      {items.map((it, i) => it.divider ? (
        <div key={i} role="separator" style={{ height: 1, background: "var(--border-subtle)", margin: "4px 0" }} />
      ) : (
        <button
          key={i} role="menuitem" onClick={it.onClick} disabled={!!it.disabled}
          ref={(el) => { itemRefs.current[i] = el; }}
          tabIndex={i === activeIndex ? 0 : -1}
          onFocus={() => setActiveIndex(i)}
          onMouseEnter={() => { if (!it.disabled) setActiveIndex(i); }}
          style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", textAlign: "left", border: "none", background: i === activeIndex ? "var(--surface-hover)" : "transparent", transition: "background var(--dur-fast) var(--ease-standard)", cursor: it.disabled ? "not-allowed" : "pointer", opacity: it.disabled ? "var(--opacity-disabled)" : 1, padding: "9px 12px", borderRadius: "var(--radius-sm)", fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-medium)", color: it.danger ? "var(--danger-500)" : "var(--text-primary)" }}
        >
          {it.icon && <span style={{ display: "inline-flex", color: it.danger ? "var(--danger-500)" : "var(--text-muted)" }}>{it.icon}</span>}
          {it.label}
        </button>
      ))}
    </div>
  );
}
