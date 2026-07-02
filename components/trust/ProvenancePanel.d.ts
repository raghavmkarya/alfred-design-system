import React from "react";

export type ProvenanceSourceStatus = "live" | "syncing" | "stale";

export interface ProvenanceSource {
  name: string;
  /** Short qualifier shown beside the name, e.g. "sessions". */
  detail?: string;
  /** Sync status of the connection. @default "live" */
  status?: ProvenanceSourceStatus;
}

/**
 * The glass-box primitive: a "How I know this" disclosure that ships with any
 * insight. The header button carries an eye icon, a tone-coloured confidence %
 * chip and freshness; the panel expands to the one-line method, a
 * ConfidenceMeter and a SourceTrace of connected sources.
 *
 * @startingPoint section="Trust" subtitle="How I know this — glass-box provenance" viewport="700x420"
 */
export interface ProvenancePanelProps {
  /** Connected sources the insight is grounded in (SourceTrace shape). */
  sources?: ProvenanceSource[];
  /** Causal confidence, 0–100. Drives the header chip and the meter. @default 0 */
  confidence?: number;
  /** One-line reasoning summary shown inside the panel. */
  method?: string;
  /** Freshness stamp, e.g. "6m ago" — renders as "Updated 6m ago". */
  updated?: string;
  /** Render expanded on first mount. @default false */
  defaultOpen?: boolean;
  style?: React.CSSProperties;
}

/**
 * "How I know this" disclosure panel — confidence chip in the header; method,
 * ConfidenceMeter and SourceTrace inside.
 */
export function ProvenancePanel(props: ProvenancePanelProps): JSX.Element;
