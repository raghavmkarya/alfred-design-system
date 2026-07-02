import React from "react";

/**
 * Zero-padded category count chip from the integrations index — mono tracked
 * digits ("05", "02") in a 1px-border pill, optionally paired with the
 * category label ("05 · Ad platforms").
 *
 * @startingPoint section="Marketing" subtitle="Integration category count chip" viewport="480x120"
 */
export interface CategoryCountBadgeProps {
  /** Category count; zero-padded to two digits ("5" → "05"). @default 0 */
  count?: number | string;
  /** Optional category label rendered after a middle dot, e.g. "Ad platforms". */
  label?: string;
  style?: React.CSSProperties;
}

/**
 * Zero-padded category count chip from the integrations index — mono tracked
 * digits in a 1px-border pill, optionally paired with the category label.
 */
export function CategoryCountBadge(props: CategoryCountBadgeProps): JSX.Element;
