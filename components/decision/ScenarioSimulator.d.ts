import React from "react";
/**
 * The what-if card — drag lever(s) and Alfred re-projects the outcome live, with a
 * direction-coloured delta and a confidence that decays away from the tested range.
 * @startingPoint section="Decision" subtitle="What-if scenario simulator" viewport="700x420"
 */
export interface ScenarioLever {
  id: string;
  label: string;
  min?: number;
  max?: number;
  step?: number;
  /** Initial value. @default min */
  value?: number;
  /** Unit suffix shown in the lever label, e.g. "%". */
  unit?: string;
}
export interface ScenarioOutcome {
  value: React.ReactNode;
  /** Delta vs baseline, e.g. "+$54K". */
  delta?: string;
  /** @default "up" */
  direction?: "up" | "down" | "flat";
  /** 0–100, drives the ConfidenceMeter. */
  confidence?: number;
  caption?: string;
}
export interface ScenarioSimulatorProps {
  title?: string;
  levers?: ScenarioLever[];
  /** Model mapping lever values → outcome. Defaults to a budget-shift model. */
  project?: (values: Record<string, number>) => ScenarioOutcome;
  outcomeLabel?: string;
  baselineLabel?: string;
  baselineValue?: React.ReactNode;
  applyLabel?: string;
  /** Commits the scenario with the current lever values. */
  onApply?: (values: Record<string, number>) => void;
  style?: React.CSSProperties;
}
/**
 * The what-if card at the heart of decision intelligence.
 */
export function ScenarioSimulator(props: ScenarioSimulatorProps): JSX.Element;
