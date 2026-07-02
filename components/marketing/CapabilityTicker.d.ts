import React from "react";

/**
 * Horizontal marquee of capability chips for the live product hero — pill
 * chips separated by orange dots, drifting left in a seamless rAF-driven loop
 * behind edge fade masks. Renders a static single row (same fade masks) under
 * SSR or prefers-reduced-motion; the duplicated run is aria-hidden.
 *
 * @startingPoint section="Marketing" subtitle="Capability marquee — live product hero" viewport="900x160"
 */
export interface CapabilityTickerProps {
  /**
   * Capability labels, sentence case.
   * @default ["Budget reallocation", "CAC diagnosis", "Pipeline forecasting", "Creative fatigue alerts", "Spend pacing guardrails", "Channel mix planning"]
   */
  items?: string[];
  /** Scroll speed in pixels per second; 0 disables motion. @default 40 */
  speed?: number;
  /** Accessible name for the capability list. @default "Alfred capabilities" */
  label?: string;
  style?: React.CSSProperties;
}

/**
 * Horizontal marquee of capability chips for the live product hero. Static
 * single row under SSR or prefers-reduced-motion.
 */
export function CapabilityTicker(props: CapabilityTickerProps): JSX.Element;
