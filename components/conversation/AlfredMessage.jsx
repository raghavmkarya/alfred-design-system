import React from "react";
import { Avatar } from "../core/Avatar.jsx";
import { SourceTrace } from "../trust/SourceTrace.jsx";

/**
 * Alfred AI — AlfredMessage
 * One turn in a Seek Alfred conversation. Alfred's turns lead with the gradient
 * spark mark and his name, render the answer with inline [n] citations as small
 * superscript pills, and can attach a SourceTrace ("grounded in") plus a timestamp.
 * The user's turns render right-aligned in a soft bubble with an Avatar. Pass the
 * message as `children` (string children get citation parsing; nodes render as-is).
 */
export function AlfredMessage({
  role = "alfred",          // "alfred" | "user"
  children,
  name,
  sources = [],
  time,
  avatarName = "You",
  style = {},
}) {
  const isUser = role === "user";

  const body = typeof children === "string" ? renderWithCitations(children) : children;

  if (isUser) {
    return (
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, fontFamily: "var(--font-sans)", ...style }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, maxWidth: 520, minWidth: 0 }}>
          <div style={{
            padding: "11px 15px", borderRadius: "var(--radius-2xl)", borderTopRightRadius: "var(--radius-xs)",
            background: "var(--accent-soft)", color: "var(--text-primary)",
            fontSize: "var(--text-base)", lineHeight: "var(--lh-normal)",
          }}>
            {body}
          </div>
          {time && <span style={{ fontSize: "var(--text-2xs)", color: "var(--text-muted)", padding: "0 4px" }}>{time}</span>}
        </div>
        <Avatar name={avatarName} size={32} tone="periwinkle" />
      </div>
    );
  }

  return (
    <div style={{ display: "flex", gap: 12, fontFamily: "var(--font-sans)", ...style }}>
      {/* Alfred spark mark */}
      <span aria-hidden="true" style={{
        width: 32, height: 32, flex: "none", borderRadius: "var(--radius-md)",
        background: "var(--gradient-brand)", color: "var(--text-on-brand)", boxShadow: "var(--shadow-xs)",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
      }}>
        <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2.5 L14.1 9.9 L21.5 12 L14.1 14.1 L12 21.5 L9.9 14.1 L2.5 12 L9.9 9.9 Z" fill="currentColor" />
        </svg>
      </span>

      <div style={{ minWidth: 0, flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontSize: "var(--text-sm)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)" }}>
            {name || "Alfred"}
          </span>
          {time && <span style={{ fontSize: "var(--text-2xs)", color: "var(--text-muted)" }}>{time}</span>}
        </div>

        <div style={{ fontSize: "var(--text-base)", lineHeight: "var(--lh-relaxed)", color: "var(--text-secondary)" }}>
          {body}
        </div>

        {Array.isArray(sources) && sources.length > 0 && (
          <div style={{ marginTop: 2 }}>
            <SourceTrace sources={sources} layout="row" />
          </div>
        )}
      </div>
    </div>
  );
}

/* Internal — split a string on [n] tokens and render them as superscript citation pills. */
function renderWithCitations(text) {
  const parts = String(text).split(/(\[\d+\])/g);
  return parts.map((p, i) => {
    const m = /^\[(\d+)\]$/.exec(p);
    if (!m) return <React.Fragment key={i}>{p}</React.Fragment>;
    return (
      <sup key={i} style={{ lineHeight: 0 }}>
        <span style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          minWidth: 16, height: 16, padding: "0 4px", marginLeft: 2, borderRadius: "var(--radius-xs)",
          background: "var(--accent-soft)", color: "var(--text-on-tint-brand)",
          fontSize: "var(--text-2xs)", fontWeight: "var(--fw-bold)", verticalAlign: "middle",
        }}>
          {m[1]}
        </span>
      </sup>
    );
  });
}
