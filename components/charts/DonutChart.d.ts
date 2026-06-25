import React from "react";
export interface DonutSegment { label?: React.ReactNode; value: number; color?: string; }
export interface DonutChartProps {
  segments: DonutSegment[];
  size?: number;
  thickness?: number;
  centerLabel?: React.ReactNode;
  centerSub?: React.ReactNode;
  style?: React.CSSProperties;
}
/** Ring chart for share-of-total (channel mix, budget split). */
export function DonutChart(props: DonutChartProps): JSX.Element;
