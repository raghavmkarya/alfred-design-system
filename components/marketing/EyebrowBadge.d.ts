import React from "react";

export type EyebrowBadgeTone = "brand" | "periwinkle" | "neutral" | "urgent";
export type EyebrowBadgeSize = "sm" | "md" | "lg";

/**
 * Pill eyebrow chip — the live-site signature section opener. A tracked
 * uppercase label inside a soft tone-bordered pill with a small tone dot;
 * the `mono` variant renders the ONE SOURCE OF TRUTH style.
 *
 * @startingPoint section="Marketing" subtitle="Section-opener eyebrow chips — brand / periwinkle / neutral / urgent" viewport="700x200"
 */
export interface EyebrowBadgeProps {
  /** Label text — written in sentence case; the chip renders it uppercase. */
  children?: React.ReactNode;
  /** Accent color shared by the text, border and dot. @default "brand" */
  tone?: EyebrowBadgeTone;
  /** Show the small tone dot before the label. @default true */
  dot?: boolean;
  /** Font-mono uppercase variant — the ONE SOURCE OF TRUTH style. @default false */
  mono?: boolean;
  /** Label size: 11 / 12 / 13 px. @default "md" */
  size?: EyebrowBadgeSize;
  style?: React.CSSProperties;
}

/**
 * Pill eyebrow chip — tracked uppercase section opener with a tone dot and
 * a soft tone border.
 */
export function EyebrowBadge(props: EyebrowBadgeProps): JSX.Element;
