import React from "react";
export interface TabItem { id: string; label: React.ReactNode; }
export interface TabsProps {
  tabs: TabItem[];
  value?: string;
  onChange?: (id: string) => void;
  style?: React.CSSProperties;
}
/**
 * Underline tab bar; active tab is ink with an orange indicator. Controlled via `value`/`onChange`.
 * WAI-ARIA tabs pattern: roving tabindex; ArrowLeft/ArrowRight move focus and selection
 * (wrapping), Home/End jump to the first/last tab.
 */
export function Tabs(props: TabsProps): JSX.Element;
