import React from "react";
/**
 * Circular progress for confidence, goal attainment and visibility scores.
 * The brand tone draws the arc with the signature periwinkle→orange gradient;
 * the value sits at the centre in Clash Display with an optional caps label
 * (inside for md/lg, below the ring for sm).
 * @startingPoint section="Data" subtitle="Circular progress with gradient arc" viewport="700x240"
 */
export interface ProgressRingProps {
  /** 0–100. @default 0 */
  value?: number;
  /** Ring diameter — 56 / 84 / 120px. @default "md" */
  size?: "sm" | "md" | "lg";
  /** Small caps label (inside for md/lg, below the ring for sm). */
  label?: string;
  /** Muted line under the ring. */
  sublabel?: string;
  /** Show the centred value. @default true */
  showValue?: boolean;
  /** `brand` = periwinkle→orange gradient arc. @default "brand" */
  tone?: "brand" | "positive" | "warning" | "danger";
  style?: React.CSSProperties;
}
/**
 * Circular progress ring — gradient or semantic arc, Clash Display value at the centre.
 */
export function ProgressRing(props: ProgressRingProps): JSX.Element;
