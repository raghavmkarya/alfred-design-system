import React from "react";

/**
 * Alfred AI — usePress / isFocusVisible (internal, not a component)
 * Shared interaction-state plumbing for pressable surfaces. Lives in
 * components/hooks/ so the bundler resolves it as a sibling import but does NOT
 * expose it on the namespace or the gallery (see build-bundle.mjs internal handling).
 *
 * isFocusVisible(e) — true when focus should paint a ring (keyboard focus),
 * defaulting to true on engines without :focus-visible.
 *
 * usePress(opts) — returns { hover, press, focusVisible, bind }; spread `bind`
 * onto the interactive element. Each interaction is opt-in so a component gets
 * exactly the listeners it had before (behaviour-preserving): hover defaults on,
 * press and focus default off.
 */
export function isFocusVisible(e) {
  try { return e.target.matches(":focus-visible"); } catch { return true; }
}

export function usePress({ hover = true, press = false, focus = false } = {}) {
  const [hovered, setHovered] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);
  const [focusVisible, setFocusVisible] = React.useState(false);
  const bind = {};
  if (hover) bind.onMouseEnter = () => setHovered(true);
  if (hover || press) bind.onMouseLeave = () => { if (hover) setHovered(false); if (press) setPressed(false); };
  if (press) {
    bind.onMouseDown = () => setPressed(true);
    bind.onMouseUp = () => setPressed(false);
  }
  if (focus) {
    bind.onFocus = (e) => setFocusVisible(isFocusVisible(e));
    bind.onBlur = () => setFocusVisible(false);
  }
  return { hover: hovered, press: pressed, focusVisible, bind };
}
