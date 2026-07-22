import React from "react";
import { Avatar } from "../core/Avatar.jsx";
import { Badge } from "../core/Badge.jsx";

/**
 * Alfred AI — TeamMemberRow
 * One member in the Team & permissions list: avatar + name/email, a compact
 * role dropdown (native <select>, brand-styled with the warm focus ring),
 * a status chip (active = success, invited = periwinkle info) and a
 * labelled remove action. Designed to stack inside a settings Card —
 * rows separate with a subtle bottom hairline.
 */
export function TeamMemberRow({
  name,
  email,
  role,
  roles = ["Admin", "Member", "Viewer"],
  status = "active",
  onRoleChange,
  onRemove,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const [hoverRemove, setHoverRemove] = React.useState(false);

  const invited = status === "invited";

  return (
    <div
      style={{
        fontFamily: "var(--font-sans)",
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "12px 16px",
        background: "var(--surface-card)",
        borderBottom: "1px solid var(--border-subtle)",
        ...style,
      }}
      {...rest}
    >
      <Avatar name={name} size={38} tone={invited ? "periwinkle" : "gradient"} />

      {/* Identity — name over email, both truncate */}
      <span style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 2 }}>
        <span
          style={{
            fontSize: "var(--text-sm)",
            fontWeight: "var(--fw-bold)",
            color: "var(--text-primary)",
            lineHeight: "var(--lh-tight)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {name}
        </span>
        {email && (
          <span
            style={{
              fontSize: "var(--text-xs)",
              color: "var(--text-muted)",
              lineHeight: "var(--lh-tight)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {email}
          </span>
        )}
      </span>

      <Badge tone={invited ? "info" : "success"} dot>
        {invited ? "Invited" : "Active"}
      </Badge>

      {/* Compact role select — mirrors the core Select treatment at row scale */}
      <span
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          flex: "none",
          height: 36,
          background: "var(--surface-input-plain)",
          border: `1.5px solid ${focus ? "var(--border-focus)" : "var(--border-default)"}`,
          borderRadius: "var(--radius-md)",
          boxShadow: focus ? "var(--shadow-focus)" : "none",
          transition: "border-color var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard)",
        }}
      >
        <select
          value={role}
          aria-label={`Role for ${name}`}
          onChange={(e) => onRoleChange && onRoleChange(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            appearance: "none",
            WebkitAppearance: "none",
            border: "none",
            outline: "none",
            background: "transparent",
            height: "100%",
            padding: "0 32px 0 12px",
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-sm)",
            fontWeight: "var(--fw-medium)",
            color: "var(--text-primary)",
            cursor: "pointer",
          }}
        >
          {roles.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
        <svg
          width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
          style={{ position: "absolute", right: 10, pointerEvents: "none", color: "var(--text-muted)" }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </span>

      {/* Remove action — trash line icon, turns danger on hover */}
      <button
        type="button"
        aria-label={`Remove ${name}`}
        onClick={onRemove}
        onMouseEnter={() => setHoverRemove(true)}
        onMouseLeave={() => setHoverRemove(false)}
        style={{
          flex: "none",
          width: 32,
          height: 32,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
          border: "none",
          borderRadius: "var(--radius-sm)",
          background: hoverRemove ? "var(--surface-sunken)" : "transparent",
          color: hoverRemove ? "var(--danger-500)" : "var(--text-muted)",
          cursor: "pointer",
          transition: "background var(--dur-fast) var(--ease-standard), color var(--dur-fast) var(--ease-standard)",
        }}
      >
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
        >
          <path d="M3 6h18" />
          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
          <path d="M10 11v6M14 11v6" />
        </svg>
      </button>
    </div>
  );
}
