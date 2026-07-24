import React from "react";

export type EvidenceStance = "supports" | "contradicts" | "context";

export interface EvidenceLedgerItem {
  id?: string;
  source: string;
  stance: EvidenceStance;
  finding: React.ReactNode;
  freshness?: string;
}

export interface EvidenceLedgerProps {
  claim?: React.ReactNode;
  evidence?: EvidenceLedgerItem[];
  confidence?: number;
  updated?: string;
  onSourceOpen?: (item: EvidenceLedgerItem) => void;
  style?: React.CSSProperties;
}

/**
 * A compact claim audit that separates supporting, contradicting, and
 * contextual evidence.
 * @startingPoint section="Trust" subtitle="Evidence that supports and challenges a claim" viewport="700x620"
 */
export function EvidenceLedger(props: EvidenceLedgerProps): JSX.Element;
