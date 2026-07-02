import React from "react";

export type SyncStatus = "fresh" | "syncing" | "stale" | "error";
export type SyncStatusBadgeSize = "sm" | "md";

/**
 * The small sync-status pill reused across connection surfaces — a colored
 * dot plus one short word. Fresh is "Live", an active sync is "Syncing"
 * (gentle pulse, static under prefers-reduced-motion), aged data is "Stale"
 * and a broken connection reads "Reconnect needed".
 *
 * @startingPoint section="App" subtitle="Connection sync pill — live / syncing / stale / reconnect" viewport="700x160"
 */
export interface SyncStatusBadgeProps {
  /** Connection state the pill reports. @default "fresh" */
  status?: SyncStatus;
  /** Override the default word per status ("Live" | "Syncing" | "Stale" | "Reconnect needed"). */
  label?: string;
  /** @default "md" */
  size?: SyncStatusBadgeSize;
  style?: React.CSSProperties;
}

/**
 * The small sync-status pill reused across connection surfaces — a colored
 * dot plus one short word, pulsing gently while a sync is in flight.
 */
export function SyncStatusBadge(props: SyncStatusBadgeProps): JSX.Element;
