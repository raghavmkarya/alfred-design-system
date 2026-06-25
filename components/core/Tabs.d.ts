import React from "react";
export interface TabItem { id: string; label: React.ReactNode; }
export interface TabsProps {
  tabs: TabItem[];
  value?: string;
  onChange?: (id: string) => void;
  style?: React.CSSProperties;
}
/** Underline tab bar; active tab is ink with an orange indicator. Controlled via `value`/`onChange`. */
export function Tabs(props: TabsProps): JSX.Element;
