import React from "react";

/**
 * Alfred AI — DotMatrix
 * The signature dot-matrix band: a grid of ~6px squares on the page
 * background with a shifting subset pulsing in brand orange (About hero and
 * CTA bands on the live site). Server-side and under prefers-reduced-motion
 * it renders a static SVG grid with a pre-baked clustered pattern; on the
 * client (motion allowed) it upgrades to a canvas + requestAnimationFrame
 * shimmer. Purely decorative — hidden from assistive tech.
 */
export function DotMatrix({
  height = 220,
  density = 0.14,
  speed = 90,
  tone = "brand",
  style = {},
  ...rest
}) {
  const CELL = 6;   // square size, px
  const GAP = 3;    // gap between squares, px
  const PITCH = CELL + GAP;
  const VW = 900;   // static SVG viewBox width

  // Fallback hex values are used only for canvas fillStyle (canvas cannot
  // resolve var(--…)); they mirror the token values and are read from the
  // cascade first via getComputedStyle.
  const TONES = {
    brand: { cssVar: "--orange-500", fallback: "#FF8431" },
    periwinkle: { cssVar: "--periwinkle-400", fallback: "#A7A7FC" },
    urgent: { cssVar: "--urgent-500", fallback: "#FF3D00" },
  };
  const t = TONES[tone] || TONES.brand;
  const den = Math.max(0, Math.min(1, density));
  const hNum = typeof height === "number" && isFinite(height) ? height : 220;

  // Deterministic pseudo-random — identical on server and client.
  const hash = (x, y) => {
    const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
    return s - Math.floor(s);
  };
  // Gentle clustering so lit dots gather in drifts instead of pure noise.
  // Averages ~1.0 so the overall lit fraction stays ≈ density.
  const weight = (c, r) =>
    0.3 + 1.4 * (0.5 + 0.5 * Math.sin(c * 0.42 + Math.sin(r * 0.73) * 1.9 + r * 0.21));

  const uid = React.useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const pid = "dm-grid-" + uid;

  const wrapRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const [animated, setAnimated] = React.useState(false);

  // Motion gate — canvas only when the user allows motion.
  React.useEffect(() => {
    try {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      const update = () => setAnimated(!mq.matches);
      update();
      if (mq.addEventListener) mq.addEventListener("change", update);
      else if (mq.addListener) mq.addListener(update);
      return () => {
        if (mq.removeEventListener) mq.removeEventListener("change", update);
        else if (mq.removeListener) mq.removeListener(update);
      };
    } catch (e) {
      setAnimated(true); // no matchMedia — assume motion is fine
    }
  }, []);

  // Canvas shimmer — rAF loop lives entirely inside the effect.
  React.useEffect(() => {
    if (!animated) return;
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cs = getComputedStyle(canvas);
    const readVar = (name, fallback) => ((cs.getPropertyValue(name) || "").trim() || fallback);
    const litColor = readVar(t.cssVar, t.fallback);
    const dimColor = readVar("--text-primary", "#02021E");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let raf = 0;
    let running = true;
    let start = null;
    let cols = 1, rows = 1, ox = 0, oy = 0, period = 30;
    let phase = null, win = null, peak = null, dimLayer = null;

    const build = () => {
      const w = wrap.clientWidth || 1;
      const hpx = wrap.clientHeight || 1;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(hpx * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.max(1, Math.floor((w + GAP) / PITCH));
      rows = Math.max(1, Math.floor((hpx + GAP) / PITCH));
      ox = (w - (cols * PITCH - GAP)) / 2;
      oy = (hpx - (rows * PITCH - GAP)) / 2;
      const count = cols * rows;
      // speed ≈ dot pulses per second across the whole band
      period = Math.min(80, Math.max(8, count / Math.max(1, speed)));
      phase = new Float32Array(count);
      win = new Float32Array(count);
      peak = new Float32Array(count);
      let i = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++, i++) {
          phase[i] = hash(c * 1.7 + 13.31, r * 2.3 + 7.17);
          win[i] = Math.min(0.9, den * weight(c, r));
          peak[i] = 0.4 + 0.6 * hash(c + 91.7, r + 45.2);
        }
      }
      // Pre-render the faint resting grid once per resize.
      dimLayer = document.createElement("canvas");
      dimLayer.width = canvas.width;
      dimLayer.height = canvas.height;
      const dctx = dimLayer.getContext("2d");
      if (dctx) {
        dctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        dctx.fillStyle = dimColor;
        dctx.globalAlpha = 0.09;
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            dctx.fillRect(ox + c * PITCH, oy + r * PITCH, CELL, CELL);
          }
        }
      }
    };

    const frame = (ts) => {
      if (!running) return;
      if (start === null) start = ts;
      const time = (ts - start) / 1000;
      const w = canvas.width / dpr;
      const hpx = canvas.height / dpr;
      ctx.clearRect(0, 0, w, hpx);
      if (dimLayer) ctx.drawImage(dimLayer, 0, 0, w, hpx);
      ctx.fillStyle = litColor;
      let i = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++, i++) {
          const x = (time / period + phase[i]) % 1;
          if (x < win[i]) {
            ctx.globalAlpha = Math.sin(Math.PI * (x / win[i])) * peak[i];
            ctx.fillRect(ox + c * PITCH, oy + r * PITCH, CELL, CELL);
          }
        }
      }
      ctx.globalAlpha = 1;
      raf = window.requestAnimationFrame(frame);
    };

    build();
    raf = window.requestAnimationFrame(frame);

    let ro = null;
    const onResize = () => build();
    try {
      ro = new ResizeObserver(onResize);
      ro.observe(wrap);
    } catch (e) {
      window.addEventListener("resize", onResize);
    }

    return () => {
      running = false;
      window.cancelAnimationFrame(raf);
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", onResize);
    };
  }, [animated, den, speed, tone, hNum]);

  // Pre-baked static pattern for SSR and reduced motion.
  const staticDots = React.useMemo(() => {
    const cols = Math.floor((VW + GAP) / PITCH);
    const rows = Math.max(1, Math.floor((hNum + GAP) / PITCH));
    const oy = (hNum - (rows * PITCH - GAP)) / 2;
    const dots = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (hash(c, r) < den * weight(c, r)) {
          dots.push({
            x: c * PITCH,
            y: oy + r * PITCH,
            o: (0.4 + 0.6 * hash(c + 91.7, r + 45.2)).toFixed(2),
          });
        }
      }
    }
    return dots;
  }, [den, hNum]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      style={{
        position: "relative",
        width: "100%",
        height,
        overflow: "hidden",
        pointerEvents: "none",
        userSelect: "none",
        ...style,
      }}
      {...rest}
    >
      {animated ? (
        <canvas
          ref={canvasRef}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
        />
      ) : (
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${VW} ${hNum}`}
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, display: "block" }}
        >
          <defs>
            <pattern id={pid} width={PITCH} height={PITCH} patternUnits="userSpaceOnUse">
              <rect width={CELL} height={CELL} fill="var(--text-primary)" fillOpacity="0.08" />
            </pattern>
          </defs>
          <rect width={VW} height={hNum} fill={`url(#${pid})`} />
          {staticDots.map((d, i) => (
            <rect key={i} x={d.x} y={d.y} width={CELL} height={CELL} fill={`var(${t.cssVar})`} fillOpacity={d.o} />
          ))}
        </svg>
      )}
    </div>
  );
}
