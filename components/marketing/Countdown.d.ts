import React from "react";

export type CountdownSize = "sm" | "md" | "lg";

/**
 * Launch countdown for the live waitlist — DD:HH:MM:SS blocks in Clash Display
 * tabular numerals with small tracked unit labels. Server-renders a
 * deterministic "00" state and hydrates to a live once-per-second tick;
 * a missing or past `target` shows all zeros.
 *
 * @startingPoint section="Marketing" subtitle="Launch countdown — waitlist opens in" viewport="700x220"
 */
export interface CountdownProps {
  /** Launch moment as an ISO 8601 string or epoch milliseconds. Missing, invalid or past values render 00:00:00:00. */
  target?: string | number;
  /** Show the tracked unit labels under each block. @default true */
  labels?: boolean;
  /** @default "md" */
  size?: CountdownSize;
  style?: React.CSSProperties;
}

/**
 * Launch countdown for the live waitlist — DD:HH:MM:SS blocks in Clash Display
 * tabular numerals with small tracked unit labels.
 */
export function Countdown(props: CountdownProps): JSX.Element;
