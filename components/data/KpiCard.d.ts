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
  /** Colours the delta and trend glyph. @default "up" */
  direction?: "up" | "down" | "flat";
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
