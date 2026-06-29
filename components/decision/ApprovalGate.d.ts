import React from "react";
/**
 * The human-in-the-loop pause — Alfred has prepared an action and holds for sign-off,
 * with a "what I'll do" checklist, the approver, and approve / modify / decline.
 * @startingPoint section="Decision" subtitle="Human-in-the-loop approval gate" viewport="700x380"
 */
export interface ApprovalGateProps {
  title?: string;
  summary?: string;
  /** Bulleted "if you approve, I'll…" actions. */
  steps?: string[];
  /** @default "medium" */
  priority?: "high" | "medium" | "low";
  /** Name of the person the approval is routed to. */
  approver?: string;
  /** Provenance caption. @default "Alfred · just now" */
  requestedAt?: string;
  onApprove?: () => void;
  onModify?: () => void;
  onDecline?: () => void;
  approveLabel?: string;
  modifyLabel?: string;
  declineLabel?: string;
  style?: React.CSSProperties;
}
/**
 * The human-in-the-loop pause — approve, modify or decline a prepared action.
 */
export function ApprovalGate(props: ApprovalGateProps): JSX.Element;
