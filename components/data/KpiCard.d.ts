import React from "react";
/**
 * Metric tile for the Unified KPI Cockpit — label, large value, trend delta.
 * @startingPoint section="Data" subtitle="KPI metric tile with trend delta" viewport="700x200"
 */
export interface KpiCardProps {
  label: string;
  value: React.ReactNode;
  /** Trend delta text, e.g. "+12.4%". */
  delta?: string;
  /** Arrow glyph only — which way the number moved. @default "up" */
  direction?: "up" | "down" | "flat";
  /** Whether the move is good news — colours the chip independently of direction, so a falling cost metric can be green. Defaults from direction (up = good, down = bad, flat = neutral). */
  valence?: "good" | "bad" | "neutral";
  caption?: string;
  /** Optional brand icon name shown as an accent. */
  icon?: string;
  iconRoot?: string;
  style?: React.CSSProperties;
}
/**
 * Metric tile for the Unified KPI Cockpit — label, large value, trend delta.
 */
export function KpiCard(props: KpiCardProps): JSX.Element;
