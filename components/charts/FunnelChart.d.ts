import React from "react";
export interface FunnelStep { label: React.ReactNode; value: number; color?: string; display?: React.ReactNode; }
export interface FunnelChartProps {
  steps: FunnelStep[];
  style?: React.CSSProperties;
}
/** Horizontal descending bars for a conversion funnel. */
export function FunnelChart(props: FunnelChartProps): JSX.Element;
