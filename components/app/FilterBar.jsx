import React from "react";
import { SegmentedControl } from "../core/SegmentedControl.jsx";
import { Select } from "../core/Select.jsx";
import { Chip } from "../core/Chip.jsx";

/**
 * Alfred AI — FilterBar
 * A horizontal analytics filter bar that sits above a table or chart. Each
 * entry in `filters` renders a house control by `type`:
 *   - "segmented" → SegmentedControl (mutually-exclusive view toggle)
 *   - "select"    → Select (compact dropdown)
 *   - "chip"      → a togglable Chip, or a single-select Chip group when the
 *                   filter supplies `options`
 * An optional eyebrow label sits before each control; `right` is pinned to the
 * far right (e.g. an export button). onChange(id, value) fires on any change.
 */
export function FilterBar({ filters = [], onChange, right, style = {} }) {
  const emit = typeof onChange === "function" ? onChange : () => {};

  const labelStyle = {
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-2xs)",
    fontWeight: "var(--fw-bold)",
    letterSpacing: "var(--ls-caps)",
    textTransform: "uppercase",
    color: "var(--text-muted)",
    whiteSpace: "nowrap",
    flex: "none",
  };

  const renderControl = (f) => {
    const opts = Array.isArray(f.options) ? f.options : [];
    if (f.type === "segmented") {
      return (
        <SegmentedControl
          size="sm"
          options={opts}
          value={f.value}
          onChange={(v) => emit(f.id, v)}
        />
      );
    }
    if (f.type === "select") {
      return (
        <Select
          options={opts}
          value={f.value || ""}
          onChange={(e) => emit(f.id, e.target.value)}
          placeholder={f.placeholder || "All"}
          style={{ width: f.width || 180 }}
        />
      );
    }
    if (f.type === "chip") {
      // A group of single-select chips when options are provided…
      if (opts.length) {
        return (
          <span style={{ display: "inline-flex", flexWrap: "wrap", gap: 6 }}>
            {opts.map((o, oi) => (
              <Chip
                key={o.value ?? oi}
                selected={f.value === o.value}
                onClick={() => emit(f.id, f.value === o.value ? null : o.value)}
              >
                {o.label}
              </Chip>
            ))}
          </span>
        );
      }
      // …otherwise a single on/off toggle chip.
      return (
        <Chip selected={!!f.value} onClick={() => emit(f.id, !f.value)}>
          {f.label || "Filter"}
        </Chip>
      );
    }
    return null;
  };

  const isSingleToggleChip = (f) =>
    f.type === "chip" && !(Array.isArray(f.options) && f.options.length);

  return (
    <div
      role="group"
      aria-label="Filters"
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 14,
        background: "var(--surface-card)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-xl)",
        padding: "12px 16px",
        boxShadow: "var(--shadow-xs)",
        ...style,
      }}
    >
      {filters.length > 0 && (
        <span
          aria-hidden="true"
          style={{ display: "inline-flex", alignItems: "center", color: "var(--text-muted)", flex: "none" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 5h16l-6 7.2V19l-4 2v-8.8z" />
          </svg>
        </span>
      )}

      {filters.map((f, i) => {
        const showLabel = !!f.label && !isSingleToggleChip(f);
        return (
          <div key={f.id || i} style={{ display: "inline-flex", alignItems: "center", gap: 8, flex: "none" }}>
            {showLabel && <span style={labelStyle}>{f.label}</span>}
            {renderControl(f)}
          </div>
        );
      })}

      {right != null && (
        <div style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", flex: "none" }}>
          {right}
        </div>
      )}
    </div>
  );
}
