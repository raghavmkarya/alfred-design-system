import React from "react";
import { Badge } from "../core/Badge.jsx";

/**
 * Alfred AI — DecisionLog
 * The "every change logged" audit trail. A vertical timeline where each entry
 * is a decision Alfred took (or didn't), pinned to a connecting rail with a
 * status node: acted (solid green check), pending (orange ring, gently
 * pulsing) or dismissed (muted x). Each row reads time -> title -> optional
 * detail, an optional outcome pill (e.g. "+6% coverage") and who signed off.
 * Newest first. Self-contained — inline SVG glyphs, no asset deps, theme-aware.
 *
 * entries: [{ time, title, detail, outcome, status, actor }]
 *   status ∈ "acted" | "pending" | "dismissed"
 */
export function DecisionLog({ entries = [], title = "", style = {} }) {
  const uid = React.useId().replace(/:/g, "");
  const pulse = `dl-pulse-${uid}`;
  const GAP = 22; // vertical space between rows; the rail bridges it

  const resolve = (s) =>
    s === "acted" || s === "dismissed" ? s : "pending";

  // Outcome pill reuses the house Badge palette (tints read in light + dark).
  const outcomeTone = (s) =>
    s === "acted" ? "success" : s === "dismissed" ? "neutral" : "warning";

  return (
    <section
      aria-label={title || "Decision log"}
      style={{
        fontFamily: "var(--font-sans)",
        background: "var(--surface-card)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-2xl)",
        padding: 22,
        boxShadow: "var(--shadow-xs)",
        ...style,
      }}
    >
      <style>{`@keyframes ${pulse}{0%,100%{opacity:.12;transform:scale(1)}50%{opacity:.42;transform:scale(1.55)}}`}</style>

      {title && (
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
          <span style={{
            width: 30, height: 30, borderRadius: "var(--radius-md)", flex: "none",
            background: "var(--accent-soft)", display: "inline-flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)"
              strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="8.5" />
              <path d="M12 7.5V12l3 1.7" />
            </svg>
          </span>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)" }}>{title}</span>
          {entries.length > 0 && (
            <span style={{ marginLeft: "auto", fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", fontWeight: "var(--fw-semibold)", color: "var(--text-muted)" }}>
              {entries.length} {entries.length === 1 ? "change" : "changes"}
            </span>
          )}
        </div>
      )}

      {entries.length === 0 ? (
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "4px 2px" }}>
          <span style={{
            width: 30, height: 30, borderRadius: "var(--radius-circle)", flex: "none",
            background: "var(--surface-sunken)", border: "1.5px solid var(--border-default)", color: "var(--text-muted)",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="8.5" />
              <path d="M12 7.5V12l3 1.7" />
            </svg>
          </span>
          <p style={{ margin: 0, maxWidth: 360, fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-muted)", lineHeight: "var(--lh-normal)" }}>
            I haven't logged any decisions yet. Once I act, every change shows up here with its outcome and who approved it.
          </p>
        </div>
      ) : (
        <div>
          {entries.map((entry, i) => {
            const st = resolve(entry.status);
            const isLast = i === entries.length - 1;
            return (
              <div
                key={`${entry.time || "t"}-${entry.title || "e"}-${i}`}
                style={{ display: "flex", gap: 14, paddingBottom: isLast ? 0 : GAP }}
              >
                {/* Rail + status node */}
                <div style={{ position: "relative", width: 30, flex: "none", display: "flex", justifyContent: "center" }}>
                  {!isLast && (
                    <span aria-hidden="true" style={{
                      position: "absolute", top: 32, bottom: -GAP, left: "50%", transform: "translateX(-50%)",
                      width: 2, borderRadius: "var(--radius-pill)", background: "var(--border-default)",
                    }} />
                  )}
                  <StatusNode status={st} pulse={pulse} />
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0, paddingTop: 1 }}>
                  {entry.time && (
                    <div style={{
                      fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", fontWeight: "var(--fw-medium)",
                      color: "var(--text-muted)", letterSpacing: "0.01em", marginBottom: 3,
                    }}>{entry.time}</div>
                  )}

                  <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                    {entry.title && (
                      <span style={{
                        fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", fontWeight: "var(--fw-bold)",
                        color: "var(--text-primary)", lineHeight: "var(--lh-snug)",
                      }}>{entry.title}</span>
                    )}
                    {entry.outcome && (
                      <Badge tone={outcomeTone(st)} dot={st !== "acted"} style={{ flex: "none" }}>
                        {st === "acted" && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                            style={{ flex: "none" }}>
                            <path d="M3.5 15.5l5-5 3.5 3.5 7.5-7.5" />
                            <path d="M16 6h4.5v4.5" />
                          </svg>
                        )}
                        {entry.outcome}
                      </Badge>
                    )}
                  </div>

                  {entry.detail && (
                    <p style={{
                      margin: "4px 0 0", fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)",
                      color: "var(--text-secondary)", lineHeight: "var(--lh-normal)",
                    }}>{entry.detail}</p>
                  )}

                  {entry.actor && (
                    <span style={{
                      display: "inline-flex", alignItems: "center", gap: 6, marginTop: 8,
                      fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--text-muted)",
                    }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "none" }}>
                        <circle cx="12" cy="8.5" r="3.3" />
                        <path d="M5.5 19c.6-3.2 3.2-5 6.5-5s5.9 1.8 6.5 5" />
                      </svg>
                      {entry.actor}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

/* Internal — the rail node. Acted = solid green check, pending = pulsing orange
   ring with a clock glyph, dismissed = quiet muted x. */
function StatusNode({ status = "pending", pulse = "" }) {
  const size = 30;

  if (status === "acted") {
    return (
      <span style={{
        position: "relative", width: size, height: size, flex: "none", borderRadius: "var(--radius-circle)",
        background: "var(--success-500)", boxShadow: "var(--shadow-xs)",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-on-brand)"
          strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12.5l4 4 9.5-10" />
        </svg>
      </span>
    );
  }

  if (status === "dismissed") {
    return (
      <span style={{
        position: "relative", width: size, height: size, flex: "none", borderRadius: "var(--radius-circle)",
        background: "var(--surface-sunken)", border: "1.5px solid var(--border-default)", color: "var(--text-muted)",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M7.5 7.5l9 9M16.5 7.5l-9 9" />
        </svg>
      </span>
    );
  }

  // pending — orange ring with a soft pulsing halo
  return (
    <span style={{
      position: "relative", width: size, height: size, flex: "none", color: "var(--warning-500)",
      display: "inline-flex", alignItems: "center", justifyContent: "center",
    }}>
      <span aria-hidden="true" style={{
        position: "absolute", inset: -3, borderRadius: "var(--radius-circle)", background: "var(--warning-500)",
        opacity: 0.16, ...(pulse ? { animation: `${pulse} 1.8s var(--ease-standard) infinite` } : {}),
      }} />
      <span style={{
        position: "relative", width: size, height: size, borderRadius: "var(--radius-circle)",
        background: "var(--surface-card)", border: "2px solid var(--warning-500)",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 7.5V12l3 1.6" />
        </svg>
      </span>
    </span>
  );
}
