import React from "react";

/**
 * Alfred AI — Logo
 * The gradient "a" mark plus the "Alfred ai" wordmark. Variants render the
 * full lockup, just the mark, or just the wordmark; tone switches for dark
 * backgrounds. Assets live in /assets/logos (pass `root` to relocate).
 */
export function Logo({
  variant = "full",
  tone = "color",
  height = 32,
  root = "assets/logos",
  style = {},
  ...rest
}) {
  const file =
    variant === "mark"
      ? (tone === "white" ? "alfred-icon-white.svg" : "alfred-icon.svg")
      : variant === "wordmark"
      ? (tone === "white" ? "alfred-wordmark-white.svg" : "alfred-logo-primary.svg")
      : (tone === "white" ? "alfred-logo-white.svg" : "alfred-logo-primary.svg");

  return (
    <img
      src={`${root}/${file}`}
      alt="Alfred ai"
      style={{ height, width: "auto", display: "block", ...style }}
      {...rest}
    />
  );
}
