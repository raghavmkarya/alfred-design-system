# TeamMemberRow

One member in the Team & permissions list: avatar + name/email, a compact role dropdown (native <select>, brand-styled with the warm focus ring), a status chip (active = success, invited = periwinkle info) and a labelled remove action. Designed to stack inside a settings Card — rows separate with a subtle bottom hairline.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `name` | `string` | — | Member's full name, e.g. "Priya Menon". |
| `email` | `string` | — | Member's email, truncates with an ellipsis when tight. |
| `role` | `string` | — | Currently assigned role — must be one of `roles`. |
| `roles?` | `string[]` | `["Admin","Member","Viewer"]` | Assignable roles offered by the dropdown. |
| `status?` | `TeamMemberStatus` | `"active"` | Membership state shown as a chip — `active` (success) or `invited` (periwinkle). |
| `onRoleChange?` | `(role: string) => void` | — | Called with the newly selected role name. |
| `onRemove?` | `() => void` | — | Remove action — the trash button is labelled "Remove {name}". |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { TeamMemberRow } = window.AlfredAIDesignSystem_1ce241;

<TeamMemberRow name="Priya Menon" email="priya@acmecorp.com" role="Admin" status="active"
  onRoleChange={(role) => updateRole("priya@acmecorp.com", role)} onRemove={() => removeMember("priya@acmecorp.com")} />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
