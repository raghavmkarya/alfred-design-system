import React from "react";

/**
 * Launch-offer toggle for live pricing: a pill with the offer copy and a real
 * switch. The whole pill is the switch (role="switch" aria-checked) — click or
 * Space toggles it — and the border and tag warm to orange while the offer is
 * applied.
 *
 * @startingPoint section="Marketing" subtitle="Launch-offer pricing toggle" viewport="700x160"
 */
export interface OfferSwitchProps {
  /** Whether the launch offer is applied. @default false */
  checked?: boolean;
  /** Called with the next checked state when the pill is clicked or toggled with Space. */
  onChange?: (checked: boolean) => void;
  /** Offer copy shown in the pill. @default "50% launch offer applied" */
  label?: string;
  /** Muted qualifier under the label, e.g. "for your first 2 months". */
  detail?: string;
  /** @default false */
  disabled?: boolean;
  style?: React.CSSProperties;
}

/**
 * Launch-offer toggle for live pricing: a pill with the offer copy and a real
 * switch; orange accent while the offer is applied.
 */
export function OfferSwitch(props: OfferSwitchProps): JSX.Element;
