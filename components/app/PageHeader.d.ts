import React from "react";

export interface PageHeaderCrumb {
  label?: React.ReactNode;
}

export interface PageHeaderTab {
  id: string;
  label?: React.ReactNode;
}

/**
 * The page-title block for the product app: an optional breadcrumb row, a
 * display-scale title with muted subtitle and a right-aligned actions node, and
 * an optional underline tablist. Closes with a hairline border.
 */
export interface PageHeaderProps {
  /** @default "" */
  title?: string;
  /** @default "" */
  subtitle?: string;
  /** Breadcrumb trail; the last crumb reads as current. @default [] */
  breadcrumb?: PageHeaderCrumb[];
  /** Right-aligned actions node. @default null */
  actions?: React.ReactNode;
  /** Underline tabs; when present a tablist renders below the title. @default [] */
  tabs?: PageHeaderTab[];
  /** Active tab id; defaults to the first tab's id when null. @default null */
  activeTab?: string | null;
  /** Fires with the selected tab id. */
  onTabChange?: (id: string) => void;
  style?: React.CSSProperties;
}

/**
 * Product-app page header with breadcrumb, title/subtitle, actions and optional tabs.
 */
export function PageHeader(props: PageHeaderProps): JSX.Element;
