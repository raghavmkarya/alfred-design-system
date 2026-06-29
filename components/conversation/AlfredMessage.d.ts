import React from "react";
/**
 * One turn in a Seek Alfred conversation — Alfred's reply (spark mark, inline [n]
 * citations, an attached SourceTrace) or the user's right-aligned bubble.
 * @startingPoint section="Conversation" subtitle="A conversation turn with citations" viewport="700x240"
 */
export interface AlfredMessageProps {
  /** Whose turn this is. @default "alfred" */
  role?: "alfred" | "user";
  /** Message body. String children get inline [n] citation parsing; nodes render as-is. */
  children?: React.ReactNode;
  /** Speaker name for Alfred turns. @default "Alfred" */
  name?: string;
  /** Connected sources rendered as a SourceTrace under an Alfred turn. */
  sources?: Array<{ name: string; detail?: string; status?: "live" | "syncing" | "stale" }>;
  /** Timestamp caption. */
  time?: string;
  /** Avatar name/initials for user turns. @default "You" */
  avatarName?: string;
  style?: React.CSSProperties;
}
/**
 * One turn in a Seek Alfred conversation, with inline citations and source tracing.
 */
export function AlfredMessage(props: AlfredMessageProps): JSX.Element;
