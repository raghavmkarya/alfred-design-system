import React from "react";

export type DataFreshnessStatus = "fresh" | "syncing" | "stale";

/**
 * A compact trust pill that surfaces data freshness: a status dot (fresh =
 * pulsing green, syncing = amber, stale = red), the line "Synced <updatedAgo>"
 * and, when a source count is given, "· <count> sources live".
 */
export interface DataFreshnessProps {
  /** Human-readable time since last sync, e.g. "6m ago". @default "just now" */
  updatedAgo?: string;
  /** Number of live sources; appends "· <count> source(s) live" when provided. */
  count?: number;
  /** Sync state; sets the dot color and default word (fresh pulses). @default "fresh" */
  status?: DataFreshnessStatus;
  /** Overrides the status word (e.g. "Syncing"); pass "" to hide it. Falls back to the word implied by `status`. */
  label?: string;
  style?: React.CSSProperties;
}

/**
 * Compact freshness pill — status dot, "Synced <updatedAgo>" and an optional
 * live source count.
 */
export function DataFreshness(props: DataFreshnessProps): JSX.Element;
