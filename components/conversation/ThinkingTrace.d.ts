import React from "react";
/**
 * Alfred's agentic reasoning made visible — a collapsible list of done/active/pending
 * steps on a rail, headed by a pulsing gradient mark.
 * @startingPoint section="Conversation" subtitle="Streaming reasoning steps" viewport="700x300"
 */
export interface ThinkingTraceStep {
  label: string;
  /** @default "pending" */
  status?: "done" | "active" | "pending";
  detail?: string;
}
export interface ThinkingTraceProps {
  steps?: ThinkingTraceStep[];
  /** Header text. Defaults to a working/worked phrase based on `done`. */
  title?: string;
  /** Marks the run finished — swaps the header and stops the mark pulsing. @default false */
  done?: boolean;
  /** Whether the step list starts expanded. @default true */
  defaultOpen?: boolean;
  /** Elapsed-time caption, e.g. "4s". */
  elapsed?: string;
  style?: React.CSSProperties;
}
/**
 * Alfred's agentic reasoning, made visible — streaming, collapsible reasoning steps.
 */
export function ThinkingTrace(props: ThinkingTraceProps): JSX.Element;
