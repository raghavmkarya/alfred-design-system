import React from "react";

/**
 * Overlapping avatar cluster with a "+N" overflow bubble and a count label —
 * live social proof for waitlists and launch pages
 * ("2,300+ people already joined").
 *
 * @startingPoint section="Marketing" subtitle="Waitlist social proof — overlapping avatars + count" viewport="700x160"
 */
export interface AvatarStackProps {
  /** Full names, rendered as Avatar initials in stack order. */
  names: string[];
  /** Maximum avatars shown before collapsing the rest into a "+N" bubble. @default 4 */
  max?: number;
  /** Count label shown beside the cluster and used as the group aria-label, e.g. "2,300+ people already joined". */
  label?: string;
  /** Avatar diameter in px. @default 36 */
  size?: number;
  style?: React.CSSProperties;
}

/** Overlapping avatar cluster + count label — waitlist social proof. */
export function AvatarStack(props: AvatarStackProps): JSX.Element;
