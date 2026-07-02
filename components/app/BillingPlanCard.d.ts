import React from "react";

export interface BillingPlanUsageRow {
  /** What the row counts, e.g. "Decision runs". */
  label: string;
  /** Amount consumed this billing cycle. */
  used: number;
  /** Plan allowance for the cycle. */
  limit: number;
}

/**
 * Current-plan card for billing settings: "Current plan" eyebrow, the plan
 * name in Clash Display with price + period on the right, a renewal +
 * payment-method line, simple used/limit usage rows (the used figure tints
 * orange at 80% of the allowance and danger at the limit) and a Manage
 * billing / Upgrade plan action pair.
 *
 * @startingPoint section="App" subtitle="Current plan — price, renewal, usage rows" viewport="500x420"
 */
export interface BillingPlanCardProps {
  /** Plan name, set in Clash Display, e.g. "Growth". */
  plan: string;
  /** Formatted price including the currency symbol, e.g. "$299". */
  price: string;
  /** Billing period rendered after the price. @default "per month" */
  period?: string;
  /** Renewal + payment-method meta line, e.g. "Renews Aug 2 · Visa ·· 4242". @default "" */
  renewal?: string;
  /** Simple used/limit rows — no meters, just tabular figures. @default [] */
  usage?: BillingPlanUsageRow[];
  /** Handler for the outline "Manage billing" action. */
  onManage?: (e: React.MouseEvent) => void;
  /** Handler for the primary "Upgrade plan" action. */
  onUpgrade?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

/**
 * Current-plan billing card — plan name, price + period, renewal line,
 * used/limit usage rows and Manage billing / Upgrade plan actions.
 */
export function BillingPlanCard(props: BillingPlanCardProps): JSX.Element;
