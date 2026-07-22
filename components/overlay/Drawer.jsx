import React from "react";

/**
 * Alfred AI — Drawer
 * Side panel that slides in from the right (default) or left over a dimmed
 * backdrop. Controlled via `open`. Clicking the backdrop, pressing Escape or
 * the × calls `onClose`. While open, focus is trapped inside the panel (Tab
 * and Shift+Tab cycle) and restored to the previously focused element on
 * close. Use for filters, detail views and settings that shouldn't take the
 * user off the page.
 */
export function Drawer({ open, onClose, side = "right", title, children, width = 380, style = {} }) {
  const titleId = React.useId();
  const panelRef = React.useRef(null);
  const onCloseRef = React.useRef(onClose);
  onCloseRef.current = onClose;

  // Slide lifecycle. `exiting` keeps the panel mounted through the close
  // animation, so `mounted = open || exiting`. `atRest` toggles the panel
  // between its off-screen offset and translateX(0).
  const [exiting, setExiting] = React.useState(false);
  const [atRest, setAtRest] = React.useState(false);
  const EXIT_MS = 140; // upper bound for the exit (var(--dur-fast) 120ms) before unmount

  // Begin (or cancel) the exit *synchronously* the render `open` flips — never
  // in an effect — so the panel never unmounts on the same render it starts
  // closing (no flash) and, while open is true, it is mounted on that commit
  // for the focus-trap effect below (still keyed on `open`) to find.
  const prevOpen = React.useRef(open);
  if (prevOpen.current !== open) {
    prevOpen.current = open;
    if (open) { if (exiting) setExiting(false); }
    else if (!exiting) setExiting(true);
  }

  React.useEffect(() => {
    if (open) {
      // Enter: paint at the offset, then transition to rest on the next frame
      // so the browser sees the start state first and the transition runs.
      setAtRest(false);
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => setAtRest(true));
      });
      return () => cancelAnimationFrame(raf);
    }
    if (exiting) {
      // Exit: slide back to the offset, then unmount after the duration. The
      // timeout — not the transition event — guarantees unmount, so this does
      // not depend on the animation firing (reduced motion stays correct).
      setAtRest(false);
      const t = setTimeout(() => setExiting(false), EXIT_MS);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [open]);

  React.useEffect(() => {
    if (!open) return undefined;
    const panel = panelRef.current;
    if (!panel) return undefined;
    const previous = document.activeElement;
    const focusables = () => Array.from(panel.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    ));
    const first = focusables()[0];
    if (first) first.focus(); else panel.focus();
    const onKeyDown = (e) => {
      if (e.key === "Escape") { if (onCloseRef.current) onCloseRef.current(); return; }
      if (e.key !== "Tab") return;
      const els = focusables();
      if (!els.length) { e.preventDefault(); panel.focus(); return; }
      const firstEl = els[0];
      const lastEl = els[els.length - 1];
      const active = document.activeElement;
      if (!panel.contains(active)) { e.preventDefault(); (e.shiftKey ? lastEl : firstEl).focus(); return; }
      if (e.shiftKey && (active === firstEl || active === panel)) { e.preventDefault(); lastEl.focus(); }
      else if (!e.shiftKey && active === lastEl) { e.preventDefault(); firstEl.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      if (previous && typeof previous.focus === "function") previous.focus();
    };
  }, [open]);

  if (!open && !exiting) return null;
  const offset = side === "right" ? "100%" : "-100%";
  return (
    <div role="dialog" aria-modal="true" aria-labelledby={title ? titleId : undefined} style={{ position: "fixed", inset: 0, zIndex: "var(--z-overlay)" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "var(--overlay-scrim)", opacity: atRest ? 1 : 0, transition: `opacity var(${exiting ? "--dur-fast" : "--dur-base"}) var(--ease-standard)` }} />
      <div ref={panelRef} tabIndex={-1} onTransitionEnd={(e) => { if (exiting && e.target === panelRef.current && e.propertyName === "transform") setExiting(false); }} style={{
        position: "absolute", top: 0, bottom: 0, [side]: 0, width, maxWidth: "90vw",
        background: "var(--surface-card)", boxShadow: "var(--shadow-xl)", display: "flex", flexDirection: "column",
        borderLeft: side === "right" ? "1px solid var(--border-subtle)" : "none",
        borderRight: side === "left" ? "1px solid var(--border-subtle)" : "none",
        transform: atRest ? "translateX(0)" : `translateX(${offset})`,
        transition: `transform var(${exiting ? "--dur-fast" : "--dur-base"}) var(--ease-standard)`,
        willChange: "transform", ...style,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "20px 22px", borderBottom: "1px solid var(--border-subtle)" }}>
          {title && <h3 id={titleId} style={{ flex: 1, fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)", fontSize: "var(--text-h4)", color: "var(--text-primary)", margin: 0 }}>{title}</h3>}
          <button onClick={onClose} aria-label="Close" style={{ border: "none", background: "transparent", cursor: "pointer", color: "var(--text-placeholder)", display: "inline-flex" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>
        <div style={{ flex: 1, overflow: "auto", padding: 22, fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", color: "var(--text-secondary)" }}>{children}</div>
      </div>
    </div>
  );
}
