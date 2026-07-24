import React from "react";
export interface FunnelStep { label: React.ReactNode; value: number; color?: string; display?: React.ReactNode; }
export interface FunnelChartProps {
  steps: FunnelStep[];
  /** Overrides the auto-derived text alternative (WCAG 1.1.1). */
  ariaLabel?: string;
  style?: React.CSSProperties;
}
/** Horizontal descending bars for a conversion funnel. */
export function FunnelChart(props: FunnelChartProps): JSX.Element;
