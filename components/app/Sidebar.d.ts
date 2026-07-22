import React from "react";

export interface SidebarItem {
  id: string;
  label?: React.ReactNode;
  /** Leading glyph; falls back to a small dot. */
  icon?: React.ReactNode;
  /** Trailing count pill; hidden when null or "". */
  badge?: React.ReactNode;
}

/**
 * The product navigation rail: a card surface with a hairline right border,
 * full-width item buttons (active item lifts to a warm orange fill), and an
 * optional header and pinned footer.
 */
export interface SidebarProps {
  /** @default [] */
  items?: SidebarItem[];
  /** Active item id. @default null */
  active?: string | null;
  /** Fires with the selected item id. */
  onSelect?: (id: string) => void;
  /** Node at the top of the rail, e.g. a logo. @default null */
  header?: React.ReactNode;
  /** Node pinned to the bottom of the rail. @default null */
  footer?: React.ReactNode;
  /** Rail width. @default 248 */
  width?: number | string;
  style?: React.CSSProperties;
}

/**
 * Product navigation rail with active-item highlight, header and footer.
 */
export function Sidebar(props: SidebarProps): JSX.Element;
