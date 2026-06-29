import React from "react";
/**
 * A single row in Alfred's notification inbox — a tone-coloured icon, title and body in his
 * voice, timestamp, unread tint and optional inline actions. Compose a list for an inbox.
 * @startingPoint section="Data" subtitle="Notification inbox row" viewport="700x160"
 */
export interface NotificationAction {
  label: string;
  onClick?: () => void;
}
export interface NotificationItemProps {
  title?: React.ReactNode;
  body?: React.ReactNode;
  /** @default "2m ago" */
  time?: string;
  /** Colours the leading icon. @default "brand" */
  tone?: "brand" | "info" | "success" | "warning" | "danger";
  /** Custom SVG node; defaults to a tone-coloured bell. */
  icon?: React.ReactNode;
  /** Tints the row and shows the unread dot. @default false */
  unread?: boolean;
  /** Inline actions; the first renders as the primary orange button. */
  actions?: NotificationAction[];
  onClick?: () => void;
  style?: React.CSSProperties;
}
/**
 * A single notification row for Alfred's inbox.
 */
export function NotificationItem(props: NotificationItemProps): JSX.Element;
