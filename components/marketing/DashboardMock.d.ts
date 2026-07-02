import React from "react";

export type DashboardMockDeltaTone = "good" | "bad" | "neutral";
export type DashboardMockSeverity = "P1" | "P2" | "P3";

export interface DashboardMockKpi {
  /** Small uppercase metric label, e.g. "Blended ROAS". */
  label: string;
  /** Headline stat in the display face, e.g. "3.4x". */
  value: string;
  /** Delta caption under the value, e.g. "-0.2 WoW". */
  delta?: string;
  /** Colors the delta: good = success, bad = urgent, neutral = muted. @default "neutral" */
  tone?: DashboardMockDeltaTone;
}

export interface DashboardMockAction {
  /** Severity chip: P1 = urgent red-orange, P2 = orange, P3 = periwinkle. */
  severity: DashboardMockSeverity;
  /** The insight line, e.g. "Campaign burning $4.8K with zero conversions". */
  insight: string;
  /** Muted source line under the insight, e.g. "Meta — prospecting, US broad". */
  detail?: string;
  /** Recommended-action chip. "KILL"/"pause" tints urgent, "SCALE"/"approve" tints success, anything else is neutral. */
  action?: string;
}

/**
 * Marketing-site product mock — the embedded Daily Brief triage card from the
 * live module page, framed in dark browser chrome (three dots + url pill).
 * KPI row, gradient portfolio-health ring, and a P1/P2/P3 action queue with
 * KILL / SCALE / Continue chips. Purely presentational (role="img",
 * aria-label "Product preview"); intentionally dark in both themes.
 *
 * @startingPoint section="Marketing" subtitle="Product preview — Daily Brief triage mock" viewport="760x560"
 */
export interface DashboardMockProps {
  /** Address-bar text in the chrome pill. @default "app.seekalfred.ai" */
  url?: string;
  /** Small stat tiles across the top (defaults to three canonical demo KPIs). */
  kpis?: DashboardMockKpi[];
  /** Portfolio health score (0–100) shown inside the gradient ring. @default 72 */
  score?: number;
  /** P1/P2/P3 triage queue rows (defaults to the canonical demo queue). */
  actions?: DashboardMockAction[];
  style?: React.CSSProperties;
}

/**
 * Framed dark product mock of the Daily Brief triage card, for marketing
 * pages: browser chrome, KPI tiles, portfolio-health ring, and the
 * KILL / SCALE / Continue action queue.
 */
export function DashboardMock(props: DashboardMockProps): JSX.Element;
