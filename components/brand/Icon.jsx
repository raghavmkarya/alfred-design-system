import React from "react";

/**
 * Alfred AI — Icon
 * Renders a brand SVG glyph from /assets/icons as a tintable mask so it can
 * inherit `currentColor` or be set to any brand color. Pass `root` to point at
 * the assets folder relative to the page that loads the bundle.
 */
export function Icon({
  name,
  size = 20,
  color = "currentColor",
  root = "assets/icons",
  title,
  style = {},
  ...rest
}) {
  const src = `${root}/${name}.svg`;
  return (
    <span
      role="img"
      aria-label={title || name}
      style={{
        display: "inline-block",
        width: size,
        height: size,
        flex: "none",
        backgroundColor: color,
        WebkitMaskImage: `url("${src}")`,
        maskImage: `url("${src}")`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        ...style,
      }}
      {...rest}
    />
  );
}
