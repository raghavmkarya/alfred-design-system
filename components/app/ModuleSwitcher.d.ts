import React from "react";

export type ModuleStatus = "live" | "in-development";

export interface ModuleSwitcherModule {
  /** Stable id emitted by onChange, e.g. "marketing". */
  id: string;
  /** Module name shown in the trigger and menu, e.g. "Marketing". */
  label: string;
  /** Ship state shown as a dot badge: "live" (green) or "in-development" (periwinkle). */
  status?: ModuleStatus;
}

/**
 * Workspace module switcher (menu-button pattern). The trigger shows the
 * current module under a "Module" eyebrow with a status dot and rotating
 * chevron; the dropdown is a role="menu" of role="menuitemradio" rows with
 * live / in-development badges. Enter, Space or ArrowDown open and focus the
 * checked item, arrows wrap, Home/End jump, Escape closes and restores focus.
 *
 * @startingPoint section="App" subtitle="Workspace module switcher — Marketing live, Sales in development" viewport="380x300"
 */
export interface ModuleSwitcherProps {
  /** Modules to offer. @default Marketing (live) and Sales (in development) */
  modules?: ModuleSwitcherModule[];
  /** Id of the current module (aria-checked in the menu). Defaults to the first module. */
  active?: string;
  /** Called with the picked module id; the menu closes and focus returns to the trigger. */
  onChange?: (id: string) => void;
  /** Render with the menu already open (static previews). @default false */
  defaultOpen?: boolean;
  style?: React.CSSProperties;
}

/**
 * Workspace module switcher: menu button showing the current module, with a
 * menuitemradio dropdown carrying live / in-development status badges.
 */
export function ModuleSwitcher(props: ModuleSwitcherProps): JSX.Element;
