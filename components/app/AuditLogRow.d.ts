import React from "react";

/**
 * One entry in the audit trail: actor, action, target chip and timestamp on a
 * single line, with an optional detail that expands below via an
 * aria-expanded chevron button. Human actors get an initials disc; Alfred
 * gets the logo-dot treatment — a small orange dot, no robot iconography.
 *
 * @startingPoint section="App" subtitle="Audit trail row — who changed what, when" viewport="700x220"
 */
export interface AuditLogRowProps {
  /** Actor name, e.g. "Priya Menon" or "Alfred". */
  actor: string;
  /** Render the actor with the Alfred logo-dot treatment. @default false */
  isAlfred?: boolean;
  /** What happened, in sentence case, e.g. "reallocated budget to". */
  action: string;
  /** Entity acted on, shown as a chip, e.g. "Performance Max — Q3". */
  target?: string;
  /** Timestamp label, e.g. "Today, 09:42". */
  time: string;
  /** Expandable explanation revealed by the chevron button. */
  detail?: string;
  /** Render expanded on first mount. @default false */
  defaultOpen?: boolean;
  style?: React.CSSProperties;
}

/**
 * Audit trail row — actor, action, target and time, with an expandable
 * detail behind an aria-expanded chevron.
 */
export function AuditLogRow(props: AuditLogRowProps): JSX.Element;
