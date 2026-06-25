import React from "react";
/**
 * A row in the Real-Time Decision Alerts hub — priority rail, insight copy and an action.
 * @startingPoint section="Data" subtitle="Decision alert row with priority rail" viewport="700x150"
 */
export interface DecisionAlertProps {
  title: string;
  insight: string;
  /** Priority sets the rail colour and badge. @default "medium" */
  priority?: "high" | "medium" | "low" | "opportunity";
  time?: string;
  /** CTA label; omit for a passive alert. */
  action?: string;
  onAction?: () => void;
  iconRoot?: string;
  style?: React.CSSProperties;
}
/**
 * A row in the Real-Time Decision Alerts hub — priority rail, insight copy and an action.
 */
export function DecisionAlert(props: DecisionAlertProps): JSX.Element;
