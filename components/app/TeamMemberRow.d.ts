import React from "react";

export type TeamMemberStatus = "active" | "invited";

/**
 * One member in the Team & permissions list: avatar with name and email, a
 * compact role dropdown, a status chip (active = success, invited =
 * periwinkle) and a labelled remove action. Rows stack inside a settings
 * card, separated by a subtle bottom hairline.
 *
 * @startingPoint section="App" subtitle="Team & permissions row — role, status, remove" viewport="700x200"
 */
export interface TeamMemberRowProps {
  /** Member's full name, e.g. "Priya Menon". */
  name: string;
  /** Member's email, truncates with an ellipsis when tight. */
  email: string;
  /** Currently assigned role — must be one of `roles`. */
  role: string;
  /** Assignable roles offered by the dropdown. @default ["Admin","Member","Viewer"] */
  roles?: string[];
  /** Membership state shown as a chip — `active` (success) or `invited` (periwinkle). @default "active" */
  status?: TeamMemberStatus;
  /** Called with the newly selected role name. */
  onRoleChange?: (role: string) => void;
  /** Remove action — the trash button is labelled "Remove {name}". */
  onRemove?: () => void;
  style?: React.CSSProperties;
}

/**
 * Team & permissions row — avatar and identity, compact role select, status
 * chip and an aria-labelled remove button.
 */
export function TeamMemberRow(props: TeamMemberRowProps): JSX.Element;
