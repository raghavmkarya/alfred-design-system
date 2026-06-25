import React from "react";
export interface Stat { value: string; label: string; }
export interface StatBandProps {
  /** Headline metrics, e.g. [{value:"90x", label:"Productivity boost"}]. */
  stats: Stat[];
  /** Render numerals in the brand gradient. @default true */
  gradient?: boolean;
  style?: React.CSSProperties;
}
/** Row of big outcome metrics with gradient numerals — the "Leaders trust Alfred" band. */
export function StatBand(props: StatBandProps): JSX.Element;
