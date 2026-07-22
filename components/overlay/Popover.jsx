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

  // Entrance: mount hidden, then flip to the visible state on the next frame so
  // the transition fires. `entered` is JS-driven state, not animation state, so
  // the panel still reaches its final visible values even when motion is
  // neutralised (prefers-reduced-motion) and the transition is instant.
  const [entered, setEntered] = React.useState(false);
  React.useEffect(() => {
    if (!open) { setEntered(false); return undefined; }
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setEntered(true));
    });
    return () => { cancelAnimationFrame(raf1); cancelAnimationFrame(raf2); };
  }, [open]);

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
  // Grow out of the anchored edge, not the panel's centre.
  const origin = {
    bottom: "top left",
    "bottom-end": "top right",
    top: "bottom left",
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
          boxShadow: "var(--shadow-lg)", padding: 8, ...(pos[placement] || pos.bottom),
          transformOrigin: origin[placement] || origin.bottom,
          opacity: entered ? 1 : 0,
          transform: entered ? "scale(1)" : "scale(0.98)",
          transition: "opacity var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-standard)",
          ...style,
        }}>{children}</div>
      )}
    </span>
  );
}
