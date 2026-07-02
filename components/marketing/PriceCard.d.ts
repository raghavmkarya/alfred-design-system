import React from "react";

export interface PriceCardCta {
  /** Button label, e.g. "Start with Growth". */
  label: string;
  onClick?: (e: React.MouseEvent) => void;
}

/**
 * Pricing tier card from the live site — Clash Display tier name, big price
 * with an optional struck-through anchor price, badge pill over the top edge,
 * feature checklist with line-style SVG checks, full-width CTA and footnote.
 * `highlighted` adds the featured-tier orange border + soft orange glow.
 *
 * @startingPoint section="Marketing" subtitle="Pricing tier card — badge, anchor price, checklist, CTA" viewport="420x680"
 */
export interface PriceCardProps {
  /** Tier name rendered in Clash Display, e.g. "Growth". */
  name: string;
  /** Current price without the currency symbol, e.g. "249" or 249. */
  price: string | number;
  /** Original price rendered struck-through before the price, e.g. "499". */
  anchorPrice?: string | number;
  /** Currency prefix applied to both price and anchorPrice. @default "$" */
  currency?: string;
  /** Billing period shown after the price. @default "/month" */
  period?: string;
  /** Uppercase pill centered on the top edge, e.g. "MOST POPULAR" or "50% OFF". */
  badge?: string;
  /** Feature checklist rendered with inline line-style SVG checks. */
  features: string[];
  /** Full-width call to action at the bottom of the card. */
  cta?: PriceCardCta;
  /** Featured-tier treatment: 1px orange border, soft orange glow, solid orange CTA. @default false */
  highlighted?: boolean;
  /** Small muted line under the CTA, e.g. the launch-offer terms. */
  footnote?: string;
  style?: React.CSSProperties;
}

/**
 * Pricing tier card matching the live site — name, price with anchor
 * strikethrough, badge, SVG checklist, CTA, and orange-glow highlight variant.
 */
export function PriceCard(props: PriceCardProps): JSX.Element;
