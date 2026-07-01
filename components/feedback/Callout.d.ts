import React from "react";
/**
 * Inline structured aside for Alfred's observations and contextual notes — a
 * quieter, non-dismissible cousin of the Banner. A 3px accent bar, a tonal
 * translucent fill that reads on both themes, an optional icon and a single
 * text action. `insight` (periwinkle) is Alfred's own voice.
 * @startingPoint section="Feedback" subtitle="Inline tonal aside with accent bar" viewport="700x200"
 */
export interface CalloutProps {
  /** `insight` = Alfred's own observation (periwinkle). @default "insight" */
  tone?: "insight" | "success" | "warning" | "danger" | "neutral";
  title?: string;
  children?: React.ReactNode;
  /** Custom leading glyph; defaults to a small per-tone line icon (currentColor). */
  icon?: React.ReactNode;
  /** Single text action in the tone's strong color. */
  action?: { label: string; onClick?: (e: React.MouseEvent) => void };
  /** Tighter padding for dense layouts. @default false */
  compact?: boolean;
  style?: React.CSSProperties;
}
/**
 * Inline structured aside — accent bar, tonal fill, optional icon and text action.
 */
export function Callout(props: CalloutProps): JSX.Element;
