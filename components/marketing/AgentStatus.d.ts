import React from "react";
export interface AgentStatusProps {
  /** The question posed to Alfred. */
  query?: string;
  /** Uppercase reasoning steps, e.g. "ANALYSING CAMPAIGN SPENDS". */
  steps: string[];
  /** Controlled active step index; omit to auto-advance. */
  activeStep?: number;
  autoplay?: boolean;
  footer?: string;
  style?: React.CSSProperties;
}
/**
 * The "Seek Alfred" reasoning panel — a query plus progressing reasoning steps
 * with a pulsing active indicator.
 * @startingPoint section="Marketing" subtitle="Agent reasoning / Ask Alfred panel" viewport="700x320"
 */
export function AgentStatus(props: AgentStatusProps): JSX.Element;
