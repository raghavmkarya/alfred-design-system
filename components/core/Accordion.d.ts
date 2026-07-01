import React from "react";

export interface AccordionItem {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

/**
 * Disclosure list of expandable rows — button headers with a rotating chevron
 * and smoothly animated panels. Single-open by default; `multiple` allows
 * several. Controlled (`open`/`onChange`) or uncontrolled (`defaultOpen`).
 *
 * @startingPoint section="Core" subtitle="Disclosure list — expandable rows" viewport="700x360"
 */
export interface AccordionProps {
  items: AccordionItem[];
  /** Allow more than one panel open at once. @default false */
  multiple?: boolean;
  /** Ids open on first render (uncontrolled). */
  defaultOpen?: string[];
  /** Controlled open ids. Pair with `onChange`. */
  open?: string[];
  /** Fires with the next array of open ids. */
  onChange?: (open: string[]) => void;
  /** Wrap the list in a 1px rounded border. @default true */
  bordered?: boolean;
  style?: React.CSSProperties;
}

/**
 * Disclosure list of expandable rows — button headers with a rotating chevron
 * and smoothly animated panels.
 */
export function Accordion(props: AccordionProps): JSX.Element;
