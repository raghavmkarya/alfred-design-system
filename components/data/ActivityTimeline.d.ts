import React from "react";
/**
 * A vertical feed of events on a connecting rail — Alfred's actions, alerts and milestones,
 * each node coloured by kind, with time, title, detail and an optional actor.
 * @startingPoint section="Data" subtitle="Vertical activity feed" viewport="700x360"
 */
export interface ActivityItem {
  /** Uppercase time eyebrow, e.g. "Today, 8:02 AM". */
  time?: string;
  title: React.ReactNode;
  detail?: React.ReactNode;
  /** Colours the node. @default "neutral" */
  kind?: "action" | "alert" | "success" | "info" | "neutral";
  /** Optional "by …" line under the item. */
  actor?: string;
}
export interface ActivityTimelineProps {
  items?: ActivityItem[];
  style?: React.CSSProperties;
}
/**
 * A vertical, chronological feed of activity on a connecting rail.
 */
export function ActivityTimeline(props: ActivityTimelineProps): JSX.Element;
