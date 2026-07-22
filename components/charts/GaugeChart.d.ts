import React from "react";
export interface GaugeSegment {
  /** Upper bound of this threshold zone, in value units. */
  upTo: number;
  color: string;
}
export interface GaugeChartProps {
  /** @default 0 */
  value?: number;
  /** @default 100 */
  max?: number;
  /** Caption above the center readout. @default "" */
  label?: React.ReactNode;
  /** Caption below the center readout. @default "" */
  sub?: React.ReactNode;
  /** Threshold zones tinting the rail (e.g. red/amber/green). @default [] */
  segments?: GaugeSegment[];
  /** Diameter in px. @default 200 */
  size?: number;
  /** Formats the center readout and end labels. @default (v) => `${Math.round(v)}` */
  valueFormat?: (value: number) => React.ReactNode;
  style?: React.CSSProperties;
}
/** A 270° radial gauge for a single score with a brand-gradient value arc. */
export function GaugeChart(props: GaugeChartProps): JSX.Element;
