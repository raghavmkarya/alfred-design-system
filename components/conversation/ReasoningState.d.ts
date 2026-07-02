import React from "react";

/**
 * Branded "Alfred is reasoning" loading treatment. The gradient spark mark
 * leads a status line that rotates through what Alfred is doing right now,
 * with a spinner and an optional elapsed tag at the trailing edge. Announces
 * politely via `role="status"`; rotation pauses for reduced motion.
 *
 * @startingPoint section="Conversation" subtitle="Alfred is reasoning — rotating status line" viewport="700x200"
 */
export interface ReasoningStateProps {
  /**
   * Status lines rotated every ~1.8s; the first line renders statically on
   * the server. @default ["Reading your spend data…", "Isolating what changed…", "Drafting the move…"]
   */
  lines?: string[];
  /** Elapsed-time tag at the trailing edge, e.g. "8s". */
  elapsed?: string;
  /** Drop the strip chrome and spark mark for inline use. @default false */
  compact?: boolean;
  style?: React.CSSProperties;
}

/**
 * Branded "Alfred is reasoning" loading treatment — rotating status line,
 * spinner and optional elapsed tag.
 */
export function ReasoningState(props: ReasoningStateProps): JSX.Element;
