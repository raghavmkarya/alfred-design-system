import React from "react";
export interface GaugeSegment {
  /** Upper bound of this threshold zone, in value units. */
  upTo: number;
  color: string;
  /** Names the band for the cursor and the data table. @default "Band n" */
  label?: string;
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
  /**
   * Threshold zones tinting the rail (e.g. red/amber/green). Passing these also
   * makes the gauge interactive: it becomes one tab stop whose cursor walks the
   * bands, since a band's name and bounds appear nowhere in the graphic. Without
   * them the gauge stays a static image. @default []
   */
  segments?: GaugeSegment[];
  /** Diameter in px. @default 200 */
  size?: number;
  /** Formats the center readout and end labels. @default (v) => `${Math.round(v)}` */
  valueFormat?: (value: number) => React.ReactNode;
  /** Overrides the auto-derived text alternative (WCAG 1.1.1). */
  ariaLabel?: string;
  style?: React.CSSProperties;
}
/** A 270° radial gauge for a single score with a brand-gradient value arc. */
export function GaugeChart(props: GaugeChartProps): JSX.Element;
