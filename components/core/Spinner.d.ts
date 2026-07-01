import React from "react";

export type SpinnerSize = "sm" | "md" | "lg";
export type SpinnerTone = "brand" | "muted";

/**
 * Loading indicator — a warm orange arc sweeping over a quiet track, rotated
 * with SMIL. Respects prefers-reduced-motion; the accessible name is always
 * set via `role="status"`.
 *
 * @startingPoint section="Core" subtitle="Loading arc — sm / md / lg" viewport="700x200"
 */
export interface SpinnerProps {
  /** 16 / 24 / 36 px. @default "md" */
  size?: SpinnerSize;
  /** Shown beside the spinner and used as the accessible name. */
  label?: string;
  /** `brand` = orange arc, `muted` = quiet gray. @default "brand" */
  tone?: SpinnerTone;
  style?: React.CSSProperties;
}

/**
 * Loading indicator — a warm orange arc sweeping over a quiet track, rotated
 * with SMIL.
 */
export function Spinner(props: SpinnerProps): JSX.Element;
