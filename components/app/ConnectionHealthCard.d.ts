import React from "react";

export type ConnectionHealthStatus = "fresh" | "syncing" | "stale" | "error";

/**
 * Integration health card: an icon tile, the connection name, a status pill
 * (fresh / syncing / stale / error) with a coloured dot, a last-sync meta
 * line, optional granted-scope chips and a one-line detail in Alfred's voice.
 * Stale and error states surface a Reconnect action — subtle for stale,
 * primary for error, where the card also picks up danger accents.
 *
 * @startingPoint section="App" subtitle="Integration health — fresh / syncing / stale / error" viewport="480x360"
 */
export interface ConnectionHealthCardProps {
  /** Connection name, e.g. "Google Ads". */
  name: string;
  /** Logo or line icon rendered inside the 42px tile. Falls back to a plug glyph. */
  icon?: React.ReactNode;
  /** Sync health shown in the dot pill; the syncing dot pulses (reduced-motion aware). @default "fresh" */
  status?: ConnectionHealthStatus;
  /** Relative last-sync time, e.g. "6m ago" — rendered as "Last sync 6m ago". */
  lastSync?: string;
  /** Granted OAuth scopes rendered as a chip list, e.g. ["Ads read", "Reporting"]. */
  scopes?: string[];
  /** One-line context in Alfred's voice; shown as a danger callout on error. */
  detail?: string;
  /** Shows a Reconnect button when status is "stale" (subtle) or "error" (primary). */
  onReconnect?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

/**
 * Integration health card: icon tile, name, status pill with dot, last-sync
 * meta, scope chips and a Reconnect action for stale / error connections.
 */
export function ConnectionHealthCard(props: ConnectionHealthCardProps): JSX.Element;
