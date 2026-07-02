import React from "react";

export type InsightVerdict = "useful" | "not-useful";

/**
 * Rate-an-insight control — "Was this useful?" with thumbs up / down. A negative
 * verdict offers optional reason chips (or skip) before Alfred thanks you in
 * first person; the thanks is announced via a polite live region.
 *
 * @startingPoint section="Trust" subtitle="Was this useful? — insight rating with reason chips" viewport="560x200"
 */
export interface InsightFeedbackProps {
  /** Fired once per rating; `reason` is present only when a chip is picked after "not-useful". */
  onFeedback?: (verdict: InsightVerdict, reason?: string) => void;
  /** Prompt shown next to the thumbs. @default "Was this useful?" */
  question?: string;
  /** Reason chips offered after a negative verdict; pass `[]` to record the verdict immediately. @default ["Wrong data", "Not relevant", "Already knew"] */
  reasons?: string[];
  /** Icon-only thumbs on a tighter row. @default false */
  compact?: boolean;
  style?: React.CSSProperties;
}

/**
 * Rate-an-insight control — thumbs up / down with optional reason chips on a
 * negative verdict and a first-person thanks from Alfred.
 */
export function InsightFeedback(props: InsightFeedbackProps): JSX.Element;
