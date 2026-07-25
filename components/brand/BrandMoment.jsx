import React from "react";
import { Logo } from "./Logo.jsx";

/**
 * Alfred AI — BrandMoment
 *
 * The signature arrival: the gradient mark settles, a glow blooms behind it and
 * recedes, the wordmark resolves, and an optional line follows. For the moments
 * a brand is allowed to take a beat — a first run, a splash, the open of a film.
 *
 * Built entirely from the motion tokens, because the point of a signature moment
 * is that it is the SAME beat everywhere. `--ease-emphasized` is reserved by
 * guidelines/motion-and-animation.md for "a rare moment that wants a touch of
 * life", which is precisely this and nothing else in the product.
 *
 * Restraint is the brief. Nothing spins, nothing bounces, nothing arrives from
 * off-screen. The mark starts at 0.94 and settles — never `scale(0)`, which the
 * craft rules forbid because things should not appear from nothing.
 *
 * Reduced motion needs no special case here: the global
 * `prefers-reduced-motion` block in tokens/base.css collapses every duration to
 * 0.01ms, so the whole sequence resolves instantly to its final state, which is
 * the correct degradation for a reveal.
 */
export function BrandMoment({
  size = 56,
  caption,
  loop = false,
  root = "assets/logos",
  style = {},
  ...rest
}) {
  const id = React.useId().replace(/:/g, "");
  const rep = loop ? "infinite" : "1";

  /* Scoped keyframes, the house pattern (see Skeleton, ThinkingTrace). Two
     names only: a settle for the marks, a bloom for the light behind them. */
  const css = `
@keyframes ${id}-settle {
  from { opacity: 0; transform: scale(0.94) translateY(6px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
@keyframes ${id}-bloom {
  0%   { opacity: 0; transform: scale(0.7); }
  55%  { opacity: 1; transform: scale(1.05); }
  100% { opacity: 0.55; transform: scale(1); }
}
@keyframes ${id}-rise {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}`;

  const settle = (delay) => ({
    animation: `${id}-settle var(--dur-slow) var(--ease-emphasized) ${delay} both`,
    animationIterationCount: rep,
  });

  return (
    <div
      style={{
        position: "relative",
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 14,
        padding: size * 0.6,
        ...style,
      }}
      {...rest}
    >
      <style>{css}</style>

      {/* The light Alfred arrives in — behind everything, and never the subject.

          NOT --glow-periwinkle / --glow-orange: those are page-hero glows, anchored
          at 22%/18% and 88%/92% of their box. On an element this size they land as a
          lopsided smudge off one corner rather than a bloom behind the mark. A token
          built for one scale does not transfer to another.

          rgba mirrors --periwinkle-400 / --orange-500; an alpha ramp cannot be
          composed from a CSS variable, the same reason LineChart inlines its fill. */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          insetInlineStart: "50%",
          top: size * 0.15,
          width: size * 3.4,
          height: size * 3.4,
          marginInlineStart: size * -1.7,
          pointerEvents: "none",
          background: [
            "radial-gradient(closest-side, rgba(167,167,252,0.40), rgba(167,167,252,0) 72%) 42% 38% / 78% 78% no-repeat",
            "radial-gradient(closest-side, rgba(255,132,49,0.34), rgba(255,132,49,0) 72%) 60% 62% / 78% 78% no-repeat",
          ].join(", "),
          animation: `${id}-bloom var(--dur-slow) var(--ease-standard) 0ms both`,
          animationIterationCount: rep,
        }}
      />

      <span style={{ position: "relative", ...settle("60ms") }}>
        <Logo variant="mark" height={size} root={root} />
      </span>

      <span style={{ position: "relative", ...settle("200ms") }}>
        <Logo variant="wordmark" height={size * 0.42} root={root} />
      </span>

      {caption && (
        <span
          style={{
            position: "relative",
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-sm)",
            color: "var(--text-muted)",
            letterSpacing: "0.01em",
            animation: `${id}-rise var(--dur-base) var(--ease-standard) 380ms both`,
            animationIterationCount: rep,
          }}
        >
          {caption}
        </span>
      )}
    </div>
  );
}
