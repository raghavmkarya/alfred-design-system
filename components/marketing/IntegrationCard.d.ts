import React from "react";

export type IntegrationStatus = "live" | "planned";

/**
 * Integration directory tile: an icon in a soft 12px tile, the integration
 * name, a one-line description in Alfred's voice, a live / planned status
 * pill, and a "Learn more" arrow link.
 *
 * @startingPoint section="Marketing" subtitle="Integration directory tile — live / planned" viewport="700x280"
 */
export interface IntegrationCardProps {
  /** Logo or line icon rendered inside the 44px tile. Falls back to a plug glyph. */
  icon?: React.ReactNode;
  /** Integration name, e.g. "Google Ads". */
  name: string;
  /** One-line description of what Alfred does with this connection. */
  body: string;
  /** Connection availability shown in the dot pill. @default "live" */
  status?: IntegrationStatus;
  /** Renders "Learn more" as an anchor when provided; otherwise a button. */
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

/**
 * Integration directory tile: icon tile, name, one-line body, live / planned
 * status pill and a "Learn more" arrow link.
 */
export function IntegrationCard(props: IntegrationCardProps): JSX.Element;
