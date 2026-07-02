import React from "react";

export type MemoryCategory = "Root cause" | "Institutional" | "Cross-function" | "Compounding";

/**
 * One item of Alfred Core memory — a fact Alfred has learned about your org,
 * with its source line ("Learned from HubSpot · Mar 12"), a category chip and
 * small confirm / edit / remove text actions. Confirming swaps the button for
 * a green check and announces it via a polite live region.
 *
 * @startingPoint section="Trust" subtitle="Org memory item — fact, source, confirm / edit / remove" viewport="560x280"
 */
export interface MemoryCardProps {
  /** The learned fact, in plain language. */
  fact: string;
  /** Where and when the memory was learned, e.g. "Learned from HubSpot · Mar 12". */
  source: string;
  /** Kind of memory; sets the chip dot color ("Compounding" gets the brand gradient). Chip is hidden when omitted. */
  category?: MemoryCategory;
  /** Fired once when the memory is confirmed; the card then shows a confirmed state. Button is hidden when omitted. */
  onConfirm?: () => void;
  /** Fired when the user asks to edit — the host owns the editing surface. Button is hidden when omitted. */
  onEdit?: () => void;
  /** Fired when the user removes the memory. Button is hidden when omitted. */
  onRemove?: () => void;
  style?: React.CSSProperties;
}

/**
 * Alfred Core memory item — learned fact with source, category chip and
 * confirm / edit / remove text actions.
 */
export function MemoryCard(props: MemoryCardProps): JSX.Element;
