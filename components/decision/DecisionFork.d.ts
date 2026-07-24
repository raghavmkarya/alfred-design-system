import React from "react";

export interface DecisionForkOption {
  id: string;
  eyebrow?: string;
  label: React.ReactNode;
  outcome: React.ReactNode;
  description?: React.ReactNode;
  confidence: number;
  reversibility: React.ReactNode;
  recommended?: boolean;
  tradeoffs?: React.ReactNode[];
}

export interface DecisionForkProps {
  title?: React.ReactNode;
  context?: React.ReactNode;
  options?: DecisionForkOption[];
  selected?: string;
  defaultSelected?: string;
  onSelect?: (id: string) => void;
  actionLabel?: string;
  style?: React.CSSProperties;
}

/**
 * A strategic option comparison with visible tradeoffs, confidence, and
 * reversibility.
 * @startingPoint section="Decision" subtitle="Compare strategic paths and their tradeoffs" viewport="900x620"
 */
export function DecisionFork(props: DecisionForkProps): JSX.Element;
