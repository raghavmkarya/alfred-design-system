import React from "react";

/**
 * Plan-limit meter for billing and settings surfaces — label, "used / limit
 * unit" readout and the brand progress track. Fill shifts from the brand
 * gradient to solid orange at 80% of the allowance and danger red at the
 * limit; an optional muted footnote sits under the bar.
 *
 * @startingPoint section="App" subtitle="Plan-limit meter with threshold coloring" viewport="480x220"
 */
export interface UsageMeterProps {
  /** What the meter counts, e.g. "Decision runs". */
  label: string;
  /** Amount consumed this billing cycle. */
  used: number;
  /** Plan allowance for the cycle. */
  limit: number;
  /** Unit noun appended to the readout, e.g. "runs". @default "" */
  unit?: string;
  /** Muted helper line under the bar — reset date or upgrade hint. @default "" */
  footnote?: string;
  style?: React.CSSProperties;
}

/**
 * Plan-limit meter — used/limit readout over the brand ProgressBar with
 * threshold coloring (gradient → orange at 80% → danger at the limit).
 */
export function UsageMeter(props: UsageMeterProps): JSX.Element;
