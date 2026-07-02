import React from "react";
import { Avatar } from "../core/Avatar.jsx";

/**
 * Alfred AI — AvatarStack
 * Overlapping avatar cluster with a "+N" overflow bubble and a count label.
 * Social proof for waitlists and launch pages ("2,300+ people already joined").
 */
export function AvatarStack({ names = [], max = 4, label, size = 36, style = {} }) {
  const shown = names.slice(0, Math.max(0, max));
  const extra = Math.max(0, names.length - shown.length);
  const overlap = -Math.round(size * 0.3);
  const toneFor = (i) => (i === 0 ? "gradient" : i % 2 ? "periwinkle" : "ink");
  const ring = "0 0 0 2px var(--surface-card)";

  return (
    <div
      role="group"
      aria-label={label || `${names.length} people`}
      style={{ display: "inline-flex", alignItems: "center", gap: 12, ...style }}
    >
      <span aria-hidden="true" style={{ display: "inline-flex", alignItems: "center", flex: "none" }}>
        {shown.map((name, i) => (
          <Avatar
            key={i}
            name={name}
            size={size}
            tone={toneFor(i)}
            style={{
              marginLeft: i === 0 ? 0 : overlap,
              position: "relative",
              zIndex: shown.length - i + 1,
              boxShadow: ring,
            }}
          />
        ))}
        {extra > 0 && (
          <span
            style={{
              width: size,
              height: size,
              borderRadius: "50%",
              marginLeft: shown.length > 0 ? overlap : 0,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              flex: "none",
              position: "relative",
              zIndex: 1,
              background: "var(--surface-sunken)",
              border: "1px solid var(--border-subtle)",
              boxShadow: ring,
              color: "var(--text-secondary)",
              fontFamily: "var(--font-sans)",
              fontWeight: "var(--fw-bold)",
              fontSize: Math.max(10, Math.round(size * 0.34)),
              letterSpacing: "0.01em",
              lineHeight: 1,
            }}
          >
            +{extra}
          </span>
        )}
      </span>
      {label && (
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-sm)",
            fontWeight: "var(--fw-medium)",
            color: "var(--text-secondary)",
            lineHeight: "var(--lh-normal)",
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
