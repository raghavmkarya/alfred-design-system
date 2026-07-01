import React from "react";

/**
 * Alfred AI — Modal
 * Centered dialog over a dimmed, blurred backdrop. Controlled via `open`;
 * renders nothing when closed. Clicking the backdrop, pressing Escape or the ×
 * calls `onClose`. While open, focus is trapped inside the panel (Tab and
 * Shift+Tab cycle) and restored to the previously focused element on close.
 * Pass a `footer` (usually a Button row) for actions.
 */
export function Modal({ open, onClose, title, children, footer, size = "md", style = {} }) {
  const titleId = React.useId();
  const panelRef = React.useRef(null);
  const onCloseRef = React.useRef(onClose);
  onCloseRef.current = onClose;

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

  if (!open) return null;
  const widths = { sm: 400, md: 520, lg: 680 };
  return (
    <div role="dialog" aria-modal="true" aria-labelledby={title ? titleId : undefined} style={{ position: "fixed", inset: 0, zIndex: "var(--z-overlay)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "var(--overlay-scrim)", backdropFilter: "blur(2px)" }} />
      <div ref={panelRef} tabIndex={-1} style={{ position: "relative", width: "100%", maxWidth: widths[size] || 520, background: "var(--surface-card)", borderRadius: "var(--radius-3xl)", boxShadow: "var(--shadow-xl)", border: "1px solid var(--border-subtle)", overflow: "hidden", ...style }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "24px 24px 0" }}>
          {title && <h3 id={titleId} style={{ flex: 1, fontFamily: "var(--font-display)", fontWeight: "var(--fw-semibold)", fontSize: "var(--text-h3)", color: "var(--text-primary)", letterSpacing: "var(--ls-tight)", margin: 0 }}>{title}</h3>}
          <button onClick={onClose} aria-label="Close" style={{ border: "none", background: "transparent", cursor: "pointer", color: "var(--ink-400)", padding: 4, display: "inline-flex" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>
        <div style={{ padding: "12px 24px 24px", fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", color: "var(--text-secondary)", lineHeight: "var(--lh-normal)" }}>{children}</div>
        {footer && <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, padding: "16px 24px", borderTop: "1px solid var(--border-subtle)", background: "var(--surface-sunken)" }}>{footer}</div>}
      </div>
    </div>
  );
}
