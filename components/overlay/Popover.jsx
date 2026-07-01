import React from "react";

/**
 * Alfred AI — Popover
 * Floating panel anchored to a trigger. Controlled via `open` / `onOpenChange`.
 * Non-modal: pressing Escape or clicking outside closes it. Use it to host a
 * Menu, a small form, or contextual detail. For plain text hints use Tooltip
 * instead.
 */
export function Popover({ open, onOpenChange, trigger, children, placement = "bottom", style = {} }) {
  const panelId = React.useId();
  const rootRef = React.useRef(null);
  const onOpenChangeRef = React.useRef(onOpenChange);
  onOpenChangeRef.current = onOpenChange;

  React.useEffect(() => {
    if (!open) return undefined;
    const close = () => { if (onOpenChangeRef.current) onOpenChangeRef.current(false); };
    const onKeyDown = (e) => { if (e.key === "Escape") close(); };
    const onPointerDown = (e) => {
      const root = rootRef.current;
      if (root && !root.contains(e.target)) close();
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [open]);

  const pos = {
    bottom: { top: "100%", left: 0, marginTop: 8 },
    "bottom-end": { top: "100%", right: 0, marginTop: 8 },
    top: { bottom: "100%", left: 0, marginBottom: 8 },
  };
  const a11y = { "aria-haspopup": "dialog", "aria-expanded": !!open, "aria-controls": open ? panelId : undefined };
  const canClone = React.isValidElement(trigger);
  return (
    <span ref={rootRef} style={{ position: "relative", display: "inline-flex" }}>
      <span onClick={() => onOpenChange && onOpenChange(!open)} {...(canClone ? null : a11y)}>
        {canClone ? React.cloneElement(trigger, a11y) : trigger}
      </span>
      {open && (
        <div role="dialog" id={panelId} style={{
          position: "absolute", zIndex: "var(--z-popover)", minWidth: 200, background: "var(--surface-card)",
          border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-lg)", padding: 8, ...(pos[placement] || pos.bottom), ...style,
        }}>{children}</div>
      )}
    </span>
  );
}
