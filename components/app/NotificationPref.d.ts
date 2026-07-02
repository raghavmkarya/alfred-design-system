import React from "react";

export interface NotificationChannels {
  /** Email digests and alerts. @default false */
  email?: boolean;
  /** Slack messages from Alfred. @default false */
  slack?: boolean;
  /** In-app notification center. @default false */
  inApp?: boolean;
}

/**
 * Per-agent notification preference row: agent name and one-line description
 * on the left, a labeled group of three switches (email / Slack / in-app) on
 * the right. Each switch is announced as "<agent> via email" etc.; rows stack
 * flush in a settings list with a subtle bottom border.
 *
 * @startingPoint section="App" subtitle="Per-agent notification channels — email / Slack / in-app" viewport="700x180"
 */
export interface NotificationPrefProps {
  /** Agent name, e.g. "Budget pacing agent". */
  agent: string;
  /** One-line explanation of what the agent notifies about, in Alfred's first person. */
  description?: string;
  /** Which channels are currently on. @default {} */
  channels?: NotificationChannels;
  /** Called with the channel key ("email" | "slack" | "inApp") and the next value. */
  onChange?: (channel: "email" | "slack" | "inApp", value: boolean) => void;
  style?: React.CSSProperties;
}

/**
 * Per-agent notification preference row — agent identity plus a labeled
 * group of email / Slack / in-app switches.
 */
export function NotificationPref(props: NotificationPrefProps): JSX.Element;
