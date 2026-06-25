import React from "react";
export type SignalTone = "truth" | "signal" | "early" | "action";
export interface SignalCardProps {
  /** Uppercase status eyebrow, e.g. "SIGNAL DETECTED". */
  label: string;
  /** Bold plain-language statement, e.g. "Lead quality down 14% this week". */
  statement: string;
  /** Muted trace / who-saw-it line. */
  trace?: string;
  /** Lifecycle tone: truth (periwinkle) · signal (orange) · early (amber) · action (green). @default "signal" */
  tone?: SignalTone;
  style?: React.CSSProperties;
}
/**
 * Decision-lifecycle "signal" tile from the Alfred site — uppercase eyebrow + dot,
 * a plain-language statement, and a trace line.
 * @startingPoint section="Marketing" subtitle="Signal / source-of-truth status tile" viewport="700x180"
 */
export function SignalCard(props: SignalCardProps): JSX.Element;
