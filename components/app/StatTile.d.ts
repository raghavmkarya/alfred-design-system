import React from "react";
/**
 * KPI tile with an inline trend — a richer KpiCard with a full-bleed sparkline footer.
 * @startingPoint section="App" subtitle="KPI tile with delta pill and sparkline" viewport="700x260"
 */
export interface StatTileProps {
  label?: string;
  value?: React.ReactNode;
  /** Trend delta text, e.g. "+12.4%". */
  delta?: string | null;
  /** Arrow glyph only — which way the number moved. @default "up" */
  direction?: "up" | "down" | "flat";
  /** Whether the move is good news — colours the pill independently of direction, so a rising bad KPI can read red. When omitted, the pill colour falls back to direction (up = green, down = red, flat = muted). */
  valence?: "good" | "bad" | "neutral";
  caption?: string;
  /** Sparkline data; a full-bleed trend footer renders when non-empty. */
  points?: number[];
  /** Accent-dot colour override. @default "var(--orange-500)" */
  color?: string;
  style?: React.CSSProperties;
}
/**
 * KPI tile with an inline trend — a richer KpiCard with a full-bleed sparkline footer.
 */
export function StatTile(props: StatTileProps): JSX.Element;
