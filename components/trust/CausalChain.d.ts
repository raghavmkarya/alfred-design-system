import React from "react";

export type CausalStepKind = "cause" | "effect" | "impact";

export interface CausalStep {
  /** Short node label, e.g. "Ops resourcing cut". */
  label: string;
  /** Optional supporting detail shown beneath the label. */
  detail?: string;
  /** Causal role; tints the node (cause = info/periwinkle, effect = orange, impact = danger). @default "effect" */
  kind?: CausalStepKind;
}

/**
 * The etiological signature of Alfred Core's Causal Reasoning Engine: a
 * horizontal cause → effect → impact chain. Each step is a tinted node card
 * connected by chevrons; an optional uppercase title eyebrow sits above and,
 * when `confidence` is given, a trailing "<n>% causal confidence" chip closes
 * the chain like a verdict.
 */
export interface CausalChainProps {
  /** Ordered chain of cause/effect/impact nodes. @default [] */
  steps?: CausalStep[];
  /** 0–100 causal-confidence score rendered as the closing chip; omit or null to hide. @default null */
  confidence?: number | null;
  /** Uppercase eyebrow label above the chain; hidden when empty. @default "" */
  title?: string;
  style?: React.CSSProperties;
}

/**
 * Horizontal cause → effect → impact chain with tinted nodes and a trailing
 * causal-confidence chip.
 */
export function CausalChain(props: CausalChainProps): JSX.Element;
