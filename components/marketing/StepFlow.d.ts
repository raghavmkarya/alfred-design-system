import React from "react";
export interface Step { title: string; body: string; }
export interface StepFlowProps {
  /** Ordered steps, e.g. Learn → Nudges → Recommends → Acts. */
  steps: Step[];
  style?: React.CSSProperties;
}
/**
 * Numbered process strip with a connecting rail — the "how it works" pattern.
 * @startingPoint section="Marketing" subtitle="Numbered process / how-it-works strip" viewport="900x180"
 */
export function StepFlow(props: StepFlowProps): JSX.Element;
