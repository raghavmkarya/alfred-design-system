import React from "react";

/**
 * The signature brand arrival: the mark settles, a glow blooms and recedes, the
 * wordmark resolves, an optional line follows. Built from the motion tokens so
 * the beat is identical everywhere it appears.
 *
 * Reduced motion needs no handling here — the global `prefers-reduced-motion`
 * block collapses every duration, so the sequence resolves instantly to its
 * final state.
 *
 * @startingPoint section="Brand" subtitle="Signature arrival — mark, glow, wordmark" viewport="560x320"
 */
export interface BrandMomentProps {
  /** Height of the mark in px; the wordmark and padding scale from it. @default 56 */
  size?: number;
  /** Optional line that rises in last, e.g. "Decision intelligence for business leaders". */
  caption?: React.ReactNode;
  /** Loop the sequence for ambient use (a splash, a film loop). @default false */
  loop?: boolean;
  /** Path to the logo assets, relative to the loading page. @default "assets/logos" */
  root?: string;
  style?: React.CSSProperties;
}
/** Signature brand arrival, tokenised to the motion system. */
export function BrandMoment(props: BrandMomentProps): JSX.Element;
