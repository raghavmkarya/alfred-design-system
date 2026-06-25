import React from "react";
export interface BarDatum { label: React.ReactNode; value: number; color?: string; display?: React.ReactNode; }
export interface BarChartProps {
  data: BarDatum[];
  height?: number;
  /** Force the scale max; defaults to the largest value. */
  max?: number;
  showValues?: boolean;
  style?: React.CSSProperties;
}
/** Vertical bars (brand gradient) for categorical comparisons. */
export function BarChart(props: BarChartProps): JSX.Element;
