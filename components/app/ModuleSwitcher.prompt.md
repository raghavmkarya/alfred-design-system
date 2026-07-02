# ModuleSwitcher

Workspace module switcher (menu-button pattern). The trigger shows the current module under a small "Module" eyebrow with a status dot and a rotating chevron; the dropdown is a role="menu" of role="menuitemradio" rows, each with a status badge — live modules get a green dot, modules still in development a periwinkle one. Enter, Space or ArrowDown open and focus the checked item, arrows wrap through the list, Home/End jump, Escape closes and returns focus to the trigger. Controlled via `active`; emits onChange(id).

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `modules?` | `ModuleSwitcherModule[]` | `Marketing (live) and Sales (in development)` | Modules to offer. |
| `active?` | `string` | — | Id of the current module (aria-checked in the menu). Defaults to the first module. |
| `onChange?` | `(id: string) => void` | — | Called with the picked module id; the menu closes and focus returns to the trigger. |
| `defaultOpen?` | `boolean` | `false` | Render with the menu already open (static previews). |
| `style?` | `React.CSSProperties` | — |  |

## Usage

```jsx
const { ModuleSwitcher } = window.AlfredAIDesignSystem_1ce241;

<ModuleSwitcher active="marketing" onChange={(id) => setModule(id)}
  modules={[{ id: "marketing", label: "Marketing", status: "live" }, { id: "sales", label: "Sales", status: "in-development" }]} />
```

## Notes
- Styled entirely from design-system tokens (`var(--…)`); it inherits the active theme, so it works on the light app and the dark website without changes.
- Sentence case, first-person "chief of staff" voice in copy. No emoji.
