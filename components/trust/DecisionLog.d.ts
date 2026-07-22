import React from "react";

export type DecisionStatus = "acted" | "pending" | "dismissed";

export interface DecisionEntry {
  /** When the decision happened, e.g. "Today, 8:02 AM". */
  time?: string;
  /** What Alfred decided, e.g. "Reallocated $18K to Performance Max". */
  title?: string;
  /** Optional supporting reasoning shown beneath the title. */
  detail?: string;
  /** Optional outcome pill, e.g. "+6% coverage". */
  outcome?: string;
  /** Status node style; any value other than "acted"/"dismissed" is treated as "pending". @default "pending" */
  status?: DecisionStatus;
  /** Who signed off, shown with a person glyph. */
  actor?: string;
}

/**
 * The "every change logged" audit trail. A vertical timeline pinned to a
 * connecting rail; each entry has a status node (acted = green check, pending =
 * pulsing orange ring, dismissed = muted x) and reads time → title → detail,
 * an optional outcome pill and the actor. Newest first.
 */
export interface DecisionLogProps {
  /** Decision entries, newest first. @default [] */
  entries?: DecisionEntry[];
  /** Optional header title; also renders the entry count. @default "" */
  title?: string;
  style?: React.CSSProperties;
}

/**
 * Vertical decision audit trail with a per-entry status node, outcome pill and
 * actor.
 */
export function DecisionLog(props: DecisionLogProps): JSX.Element;
