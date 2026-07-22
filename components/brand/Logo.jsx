import React from "react";

/**
 * Alfred AI — Logo
 * The gradient "a" mark plus the "Alfred ai" wordmark. Variants render the
 * full lockup, just the mark, or just the wordmark; tone switches for dark
 * backgrounds — the default "auto" follows the active theme (color lockup on
 * light, the all-white lockup under [data-theme="dark"|"app-dark"]).
 * Assets live in /assets/logos (pass `root` to relocate).
 */
export function Logo({
  variant = "full",
  tone = "auto",
  height = 32,
  root = "assets/logos",
  style = {},
  ...rest
}) {
  const fileFor = (t) =>
    variant === "mark"
      ? (t === "white" ? "alfred-icon-white.svg" : "alfred-icon.svg")
      : variant === "wordmark"
      ? (t === "white" ? "alfred-wordmark-white.svg" : "alfred-logo-primary.svg")
      : (t === "white" ? "alfred-logo-white.svg" : "alfred-logo-primary.svg");

  if (tone === "auto") {
    /* Both lockups render; tokens/base.css shows the right one per theme scope.
       loading="lazy" lets the browser skip the fetch for whichever lockup is
       display:none in the active scope, so only the visible one downloads. */
    return (
      <span className="ds-logo-auto" style={{ display: "inline-block", height, ...style }} {...rest}>
        <img className="ds-logo-color" src={`${root}/${fileFor("color")}`} alt="Alfred ai"
          loading="lazy" style={{ height, width: "auto", display: "block" }} />
        <img className="ds-logo-white" src={`${root}/${fileFor("white")}`} alt="Alfred ai"
          loading="lazy" style={{ height, width: "auto", display: "none" }} />
      </span>
    );
  }

  return (
    <img
      src={`${root}/${fileFor(tone)}`}
      alt="Alfred ai"
      style={{ height, width: "auto", display: "block", ...style }}
      {...rest}
    />
  );
}
