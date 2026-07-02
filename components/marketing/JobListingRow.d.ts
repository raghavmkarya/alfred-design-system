import React from "react";

/**
 * Careers job row for the About careers band: role title, a meta line
 * (team · location · type) and a circular arrow affordance. The whole row is
 * the target — it lifts on hover while the arrow fills orange. Renders as an
 * anchor when `href` is given, otherwise as a keyboard-focusable button row.
 *
 * @startingPoint section="Marketing" subtitle="Careers job row — title, meta, arrow link" viewport="700x180"
 */
export interface JobListingRowProps {
  /** Role title, e.g. "Senior product designer". */
  title: string;
  /** Team the role sits in, e.g. "Design". */
  team: string;
  /** Location shown in the meta line, e.g. "London or remote". */
  location: string;
  /** Employment type appended to the meta line, e.g. "Full-time". */
  type?: string;
  /** Renders the row as an anchor when provided; otherwise a button row. */
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

/**
 * Careers job row: role title, team · location · type meta and an arrow
 * affordance; the row lifts on hover. Anchor when `href`, else a button row.
 */
export function JobListingRow(props: JobListingRowProps): JSX.Element;
