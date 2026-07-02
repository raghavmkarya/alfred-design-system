import React from "react";

export interface UpgradeModalPlan {
  name: string;
  /** Display price, e.g. "$299/mo" — the "/…" suffix is rendered small and muted. */
  price?: string;
  /** Marks the recommended tier: orange border, warm tint and a "Recommended" pill. */
  highlight?: boolean;
  features?: string[];
}

export interface UpgradeModalCta {
  label: string;
  onClick?: () => void;
}

/**
 * The in-app paywall moment. Composes Modal (focus trap, Escape, backdrop) with
 * structured upgrade content: Alfred's first-person framing of the limit, a
 * compact 2–3 column plan mini-compare, and a primary upgrade CTA with a quiet
 * escape in the footer.
 *
 * @startingPoint section="App" subtitle="Paywall dialog — seat limit with plan mini-compare" viewport="900x640"
 */
export interface UpgradeModalProps {
  /** Controls visibility; renders nothing (beyond `trigger`) when false. */
  open: boolean;
  /** Called by Escape, the backdrop, the × and the default secondary action. */
  onClose?: () => void;
  /** Optional node (e.g. the locked control) rendered inline before the dialog. @default null */
  trigger?: React.ReactNode;
  /** @default "You've used all 3 seats" */
  title?: React.ReactNode;
  /** First-person Alfred explanation of the limit and what upgrading unlocks. */
  body?: React.ReactNode;
  /** Tiers for the mini-compare grid (capped at 3 columns; 3+ opens the wide dialog). */
  plans?: UpgradeModalPlan[];
  /** Primary upgrade action. @default { label: "Upgrade to Growth" } */
  cta?: UpgradeModalCta;
  /** Quiet escape; its onClick falls back to `onClose`. Pass null to hide. @default { label: "Not now" } */
  secondaryCta?: UpgradeModalCta | null;
  /** Merged onto the dialog panel. */
  style?: React.CSSProperties;
}

/**
 * In-app paywall dialog — Alfred explains the limit, compares plans, and
 * offers the upgrade.
 */
export function UpgradeModal(props: UpgradeModalProps): JSX.Element;
