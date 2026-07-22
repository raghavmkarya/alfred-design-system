import React from "react";

export type SourceStatus = "live" | "syncing" | "stale";

export interface TraceSource {
  /** Connected tool name, e.g. "GA4". */
  name: string;
  /** Optional detail shown next to the name, e.g. "sessions". */
  detail?: string;
  /** Live sync status; sets the dot color and label (syncing pulses). @default "live" */
  status?: SourceStatus;
}

export type SourceTraceLayout = "row" | "list";

/**
 * The "no black box" trust pattern: shows exactly which connected tools an
 * insight was grounded in, each with a live sync status. Renders an uppercase
 * eyebrow, then either a wrapping row of chips (layout="row") or a stacked list
 * of rows (layout="list").
 */
export interface SourceTraceProps {
  /** Connected sources the insight is grounded in. @default [] */
  sources?: TraceSource[];
  /** Uppercase eyebrow label. @default "Grounded in" */
  title?: string;
  /** Wrapping chip row or stacked list. @default "row" */
  layout?: SourceTraceLayout;
  style?: React.CSSProperties;
}

/**
 * Source-provenance display — connected tools with live sync status, as chips
 * or a list.
 */
export function SourceTrace(props: SourceTraceProps): JSX.Element;
