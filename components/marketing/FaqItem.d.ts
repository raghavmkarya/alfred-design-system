import React from "react";
export interface FaqItemProps {
  question: string;
  children?: React.ReactNode;
  /** Controlled open state; omit for uncontrolled. */
  open?: boolean;
  defaultOpen?: boolean;
  onToggle?: (open: boolean) => void;
  style?: React.CSSProperties;
}
/** Accordion FAQ row with a +/− toggle and animated reveal. Controlled or uncontrolled. */
export function FaqItem(props: FaqItemProps): JSX.Element;
