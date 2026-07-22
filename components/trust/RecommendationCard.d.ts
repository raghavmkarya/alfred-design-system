import React from "react";

export type RecommendationPriority = "high" | "opportunity" | "medium";

export interface RecommendationAction {
  /** Button label. */
  label: string;
  /** Click handler for the action. */
  onClick?: () => void;
  /** Button variant; defaults to "primary" for the first action and "ghost" for the rest. */
  variant?: "primary" | "secondary" | "outline" | "ghost" | "subtle" | "danger";
}

/**
 * Alfred's recommendation in the draft → approve → act loop. A soft card with a
 * left priority rail (high = danger, opportunity = success, medium = orange),
 * an "I recommend" eyebrow + priority Badge, the title, reasoning, an emphasised
 * projected-impact line, an optional inline ConfidenceMeter, and a footer of
 * actions defaulting to a primary "Approve" and a ghost "Dismiss".
 */
export interface RecommendationCardProps {
  /** Recommendation headline. @default "Scale LinkedIn ABM +30%" */
  title?: string;
  /** Supporting rationale paragraph; hidden when empty. */
  reasoning?: string;
  /** Emphasised projected-impact line, e.g. "+$30K pipeline this month"; hidden when empty. @default "+$30K pipeline this month" */
  impact?: string;
  /** 0–100 confidence rendered as an inline ConfidenceMeter; omit or null to hide. @default 78 */
  confidence?: number | null;
  /** Priority; sets the rail color and badge tone/label. @default "opportunity" */
  priority?: RecommendationPriority;
  /** Custom footer actions; when non-empty, replaces the default Approve/Dismiss pair. @default [] */
  actions?: RecommendationAction[];
  /** Fired by the default primary "Approve" button (ignored when `actions` is provided). */
  onApprove?: () => void;
  /** Fired by the default ghost "Dismiss" button (ignored when `actions` is provided). */
  onDismiss?: () => void;
  style?: React.CSSProperties;
}

/**
 * Recommendation card — priority rail, reasoning, projected impact, confidence
 * meter and Approve / Dismiss actions.
 */
export function RecommendationCard(props: RecommendationCardProps): JSX.Element;
