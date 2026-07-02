import React from "react";

export type DotMatrixTone = "brand" | "periwinkle" | "urgent";

/**
 * The signature dot-matrix band — a grid of ~6px squares on the page
 * background with a shifting subset pulsing in brand orange. Used behind the
 * About hero and CTA bands. Renders a static pre-baked SVG pattern on the
 * server and under prefers-reduced-motion; upgrades to a canvas shimmer on
 * the client. Purely decorative (aria-hidden).
 *
 * @startingPoint section="Marketing" subtitle="Signature dot-matrix band — pulsing orange grid" viewport="900x260"
 */
export interface DotMatrixProps {
  /** Band height in px. @default 220 */
  height?: number;
  /** Fraction of dots lit at any moment, 0–1. @default 0.14 */
  density?: number;
  /** Approximate dot pulses per second across the band. @default 90 */
  speed?: number;
  /** Lit-dot color. `brand` = orange, `periwinkle` = cool accent, `urgent` = red-orange. @default "brand" */
  tone?: DotMatrixTone;
  style?: React.CSSProperties;
}

/**
 * The signature dot-matrix band — pulsing orange squares on the page
 * background. Decorative; SSR- and reduced-motion-safe.
 */
export function DotMatrix(props: DotMatrixProps): JSX.Element;
