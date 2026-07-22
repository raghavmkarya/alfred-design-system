import React from "react";
import { Button } from "../core/Button.jsx";

/**
 * Alfred AI — ConnectionHealthCard
 * Integration health card: an icon tile, the connection name, a status pill
 * (fresh / syncing / stale / error) with a coloured dot, a last-sync meta
 * line, optional granted-scope chips and a one-line detail in Alfred's voice.
 * Stale and error states surface a Reconnect action — subtle for stale,
 * primary for error, where the card also picks up --danger-500 accents.
 */
export function ConnectionHealthCard({
  name,
  icon = null,
  status = "fresh",
  lastSync = "",
  scopes = [],
  detail = "",
  onReconnect,
  style = {},
  ...rest
}) {
  const statuses = {
    fresh: { dot: "var(--success-500)", label: "Fresh", bg: "var(--surface-sunken)", fg: "var(--text-secondary)", border: "var(--border-subtle)" },
    syncing: { dot: "var(--periwinkle-600)", label: "Syncing", bg: "var(--surface-sunken)", fg: "var(--text-secondary)", border: "var(--border-subtle)" },
    stale: { dot: "var(--warning-500)", label: "Stale", bg: "var(--warning-100)", fg: "var(--orange-600)", border: "transparent" },
    error: { dot: "var(--danger-500)", label: "Error", bg: "var(--danger-100)", fg: "var(--danger-500)", border: "transparent" },
  };
  const st = statuses[status] || statuses.fresh;
  const isError = status === "error";
  const isStale = status === "stale";
  const showReconnect = typeof onReconnect === "function" && (isError || isStale);
  const hasScopes = Array.isArray(scopes) && scopes.length > 0;

  // Syncing dot pulse — a useId-scoped CSS keyframe, gated on
  // prefers-reduced-motion. SSR / reduced-motion renders the dot at full
  // opacity, which reads complete.
  const isSyncing = status === "syncing";
  const uid = React.useId().replace(/:/g, "");
  const cls = `chc-${uid}`;

  const defaultIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 3v5" />
      <path d="M15 3v5" />
      <path d="M6 8h12v3a6 6 0 0 1-6 6 6 6 0 0 1-6-6V8z" />
      <path d="M12 17v4" />
    </svg>
  );

  const alertIcon = (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "none", marginTop: 1 }}>
      <path d="M10.3 3.9 1.9 18a2 2 0 0 0 1.7 3h16.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );

  return (
    <div
      role="group"
      aria-label={`${name} connection`}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 14,
        boxSizing: "border-box",
        width: "100%",
        maxWidth: 420,
        padding: 20,
        background: "var(--surface-card)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-2xl)",
        boxShadow: "var(--shadow-sm)",
        fontFamily: "var(--font-sans)",
        ...style,
      }}
      {...rest}
    >
      {/* Header — icon tile, name + last sync, status pill */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <span
          aria-hidden="true"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 42,
            height: 42,
            flex: "none",
            borderRadius: "var(--radius-md)",
            background: "var(--surface-sunken)",
            border: "1px solid var(--border-subtle)",
            color: isError ? "var(--danger-500)" : "var(--text-primary)",
          }}
        >
          {icon || defaultIcon}
        </span>

        <span style={{ display: "flex", flexDirection: "column", gap: 3, flex: 1, minWidth: 0, paddingTop: 2 }}>
          <span
            style={{
              fontSize: "var(--text-base)",
              fontWeight: "var(--fw-bold)",
              letterSpacing: "-0.01em",
              lineHeight: 1.25,
              color: "var(--text-primary)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {name}
          </span>
          {lastSync ? (
            <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", lineHeight: 1.4 }}>
              Last sync {lastSync}
            </span>
          ) : null}
        </span>

        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            flex: "none",
            marginTop: 2,
            padding: "4px 10px",
            borderRadius: "var(--radius-pill)",
            border: `1px solid ${st.border}`,
            background: st.bg,
            fontSize: "var(--text-2xs)",
            fontWeight: "var(--fw-bold)",
            letterSpacing: "var(--ls-caps)",
            textTransform: "uppercase",
            lineHeight: 1,
            color: st.fg,
            whiteSpace: "nowrap",
          }}
        >
          {isSyncing && (
            <style>{`
              @keyframes ${cls}-pulse {
                0%, 100% { opacity: 1; }
                50%      { opacity: 0.3; }
              }
              .${cls}-dot { animation: ${cls}-pulse 1.44s var(--ease-standard) infinite; }
              @media (prefers-reduced-motion: reduce) {
                .${cls}-dot { animation: none; opacity: 1; }
              }
            `}</style>
          )}
          <span
            aria-hidden="true"
            className={isSyncing ? `${cls}-dot` : undefined}
            style={{
              width: 7,
              height: 7,
              borderRadius: "var(--radius-pill)",
              background: st.dot,
              flex: "none",
            }}
          />
          {st.label}
        </span>
      </div>

      {/* Detail — danger callout on error, quiet paragraph otherwise */}
      {detail ? (
        isError ? (
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 8,
              padding: "10px 12px",
              borderRadius: "var(--radius-md)",
              background: "var(--danger-100)",
              color: "var(--danger-600)",
              fontSize: "var(--text-sm)",
              lineHeight: 1.5,
            }}
          >
            {alertIcon}
            <span style={{ minWidth: 0 }}>{detail}</span>
          </div>
        ) : (
          <p style={{ margin: 0, fontSize: "var(--text-sm)", lineHeight: 1.55, color: "var(--text-secondary)" }}>
            {detail}
          </p>
        )
      ) : null}

      {/* Granted scopes */}
      {hasScopes ? (
        <div role="list" aria-label="Granted scopes" style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {scopes.map((scope, i) => (
            <span
              key={typeof scope === "string" ? scope : i}
              role="listitem"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "4px 10px",
                borderRadius: "var(--radius-pill)",
                background: "var(--surface-sunken)",
                border: "1px solid var(--border-subtle)",
                fontSize: "var(--text-xs)",
                fontWeight: "var(--fw-medium)",
                lineHeight: 1.3,
                color: "var(--text-secondary)",
                whiteSpace: "nowrap",
              }}
            >
              {scope}
            </span>
          ))}
        </div>
      ) : null}

      {/* Reconnect — primary on error, subtle on stale */}
      {showReconnect ? (
        <div style={{ display: "flex", marginTop: 2 }}>
          <Button size="sm" variant={isError ? "primary" : "subtle"} onClick={onReconnect}>
            Reconnect
          </Button>
        </div>
      ) : null}
    </div>
  );
}
