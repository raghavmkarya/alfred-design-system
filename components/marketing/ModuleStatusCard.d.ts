import React from "react";

export type ModuleStatus = "live" | "in-development" | "planned";

/**
 * Roadmap tile for an Alfred module — status pill (live = success,
 * in development = orange, planned = neutral), module name, optional
 * slogan, agent chips, and an arrow CTA.
 *
 * @startingPoint section="Marketing" subtitle="Module roadmap — live / in development / planned" viewport="440x340"
 */
export interface ModuleStatusCardProps {
  /** Module name shown in the display face. @default "Alfred for Marketing" */
  module?: string;
  /** One-line module slogan, e.g. "Read less, know more". */
  slogan?: string;
  /** Rollout status — drives the pill tone and label. @default "live" */
  status?: ModuleStatus;
  /** Agent names rendered as neutral chips, e.g. ["Spend anomaly agent"]. */
  agents?: string[];
  /** CTA label; the arrow link renders only when provided. */
  cta?: string;
  /** CTA destination — renders the CTA as an anchor. */
  href?: string;
  /** CTA click handler — renders a button when no `href` is given. */
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

/**
 * Roadmap tile for an Alfred module — status pill, module name, optional
 * slogan, agent chips, and an arrow CTA.
 */
export function ModuleStatusCard(props: ModuleStatusCardProps): JSX.Element;
