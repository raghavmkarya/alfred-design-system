import React from "react";
export interface Crumb { label: React.ReactNode; href?: string; }
export interface BreadcrumbProps {
  items: Crumb[];
  style?: React.CSSProperties;
}
/** Path trail with chevron separators; the last crumb is the current page. */
export function Breadcrumb(props: BreadcrumbProps): JSX.Element;
