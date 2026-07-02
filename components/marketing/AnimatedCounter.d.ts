import React from "react";

/**
 * Count-up outcome stat for marketing bands — Clash Display numerals with a
 * tracked-caps label. Server-renders the final value (never 0), then counts
 * up from zero once visible; prefers-reduced-motion keeps the static value.
 *
 * @startingPoint section="Marketing" subtitle="Count-up stat — SSRs at the final value" viewport="460x220"
 */
export interface AnimatedCounterProps {
  /** Final numeric value to count up to, e.g. 128 or 4.8. Decimals in the target are preserved during the count. */
  value: number;
  /** Rendered before the number, e.g. "$". @default "" */
  prefix?: string;
  /** Rendered after the number, e.g. "M", "%", "x". @default "" */
  suffix?: string;
  /** Count-up length in milliseconds; 0 disables the animation. @default 1200 */
  duration?: number;
  /** Tracked-caps label under the value, e.g. "Budget under management". */
  label?: string;
  /** Secondary supporting line under the label. */
  sublabel?: string;
  style?: React.CSSProperties;
}

/**
 * Count-up outcome stat for marketing bands — Clash Display numerals with a
 * tracked-caps label. Server-renders the final value, never 0.
 */
export function AnimatedCounter(props: AnimatedCounterProps): JSX.Element;
