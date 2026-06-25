/* @ds-bundle: {"format":3,"namespace":"AlfredAIDesignSystem_1ce241","components":[{"name":"Icon","sourcePath":"components/brand/Icon.jsx"},{"name":"Logo","sourcePath":"components/brand/Logo.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Chip","sourcePath":"components/core/Chip.jsx"},{"name":"Tabs","sourcePath":"components/core/Tabs.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Select","sourcePath":"components/core/Select.jsx"},{"name":"Slider","sourcePath":"components/core/Slider.jsx"},{"name":"Switch","sourcePath":"components/core/Switch.jsx"},{"name":"Checkbox","sourcePath":"components/core/Checkbox.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"RadioGroup","sourcePath":"components/core/RadioGroup.jsx"},{"name":"SegmentedControl","sourcePath":"components/core/SegmentedControl.jsx"},{"name":"Table","sourcePath":"components/data/Table.jsx"},{"name":"KpiCard","sourcePath":"components/data/KpiCard.jsx"},{"name":"Stepper","sourcePath":"components/data/Stepper.jsx"},{"name":"Skeleton","sourcePath":"components/data/Skeleton.jsx"},{"name":"Breadcrumb","sourcePath":"components/data/Breadcrumb.jsx"},{"name":"EmptyState","sourcePath":"components/data/EmptyState.jsx"},{"name":"Pagination","sourcePath":"components/data/Pagination.jsx"},{"name":"ProgressBar","sourcePath":"components/data/ProgressBar.jsx"},{"name":"DecisionAlert","sourcePath":"components/data/DecisionAlert.jsx"},{"name":"BarChart","sourcePath":"components/charts/BarChart.jsx"},{"name":"LineChart","sourcePath":"components/charts/LineChart.jsx"},{"name":"Sparkline","sourcePath":"components/charts/Sparkline.jsx"},{"name":"DonutChart","sourcePath":"components/charts/DonutChart.jsx"},{"name":"FunnelChart","sourcePath":"components/charts/FunnelChart.jsx"},{"name":"Menu","sourcePath":"components/overlay/Menu.jsx"},{"name":"Modal","sourcePath":"components/overlay/Modal.jsx"},{"name":"Toast","sourcePath":"components/overlay/Toast.jsx"},{"name":"Drawer","sourcePath":"components/overlay/Drawer.jsx"},{"name":"Popover","sourcePath":"components/overlay/Popover.jsx"},{"name":"Tooltip","sourcePath":"components/overlay/Tooltip.jsx"},{"name":"Banner","sourcePath":"components/feedback/Banner.jsx"},{"name":"FaqItem","sourcePath":"components/marketing/FaqItem.jsx"},{"name":"StatBand","sourcePath":"components/marketing/StatBand.jsx"},{"name":"StepFlow","sourcePath":"components/marketing/StepFlow.jsx"},{"name":"SignalCard","sourcePath":"components/marketing/SignalCard.jsx"},{"name":"AgentStatus","sourcePath":"components/marketing/AgentStatus.jsx"}],"sourceHashes":{"components/brand/Icon.jsx":"dc67b23ac4ae","components/brand/Logo.jsx":"6af8514bc4c8","components/core/Card.jsx":"46e2dbd3e4da","components/core/Chip.jsx":"3aa9f88a2fa5","components/core/Tabs.jsx":"1a6bf17d7b3d","components/core/Badge.jsx":"d9b434a84f8c","components/core/Input.jsx":"a708410a3a1a","components/core/Avatar.jsx":"85b9b49b2b31","components/core/Button.jsx":"9fbb86eb0636","components/core/Select.jsx":"1092bf39890d","components/core/Slider.jsx":"b71a424e374f","components/core/Switch.jsx":"b5c1e4456040","components/core/Checkbox.jsx":"4669a6c7d06e","components/core/IconButton.jsx":"ce9d5fc90c74","components/core/RadioGroup.jsx":"945a11970cc2","components/core/SegmentedControl.jsx":"ac03fcc46c9c","components/data/Table.jsx":"b22cd982753e","components/data/KpiCard.jsx":"c0c0b20c2679","components/data/Stepper.jsx":"6aba5aee2fb8","components/data/Skeleton.jsx":"d9ad20a82864","components/data/Breadcrumb.jsx":"1666a8058352","components/data/EmptyState.jsx":"eee7f1d534c8","components/data/Pagination.jsx":"7a90dfb0d252","components/data/ProgressBar.jsx":"4cab4481abd8","components/data/DecisionAlert.jsx":"4c7dd632925c","components/charts/BarChart.jsx":"6ee50f241430","components/charts/LineChart.jsx":"5b3bf436b421","components/charts/Sparkline.jsx":"86a0ac509008","components/charts/DonutChart.jsx":"14fede54cfdb","components/charts/FunnelChart.jsx":"1ba58409ed7d","components/overlay/Menu.jsx":"63b5ee1c6dee","components/overlay/Modal.jsx":"4c96a4f5278c","components/overlay/Toast.jsx":"949b417a36c5","components/overlay/Drawer.jsx":"717a9b4888d5","components/overlay/Popover.jsx":"1ad9ccc50560","components/overlay/Tooltip.jsx":"bd5c243bed5a","components/feedback/Banner.jsx":"c78ef4666920","components/marketing/FaqItem.jsx":"7f7a9fd9d203","components/marketing/StatBand.jsx":"7286939da0ec","components/marketing/StepFlow.jsx":"b941909f964a","components/marketing/SignalCard.jsx":"6f02dd92fe89","components/marketing/AgentStatus.jsx":"62c48dce4f84"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.AlfredAIDesignSystem_1ce241 = window.AlfredAIDesignSystem_1ce241 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Alfred AI — Icon
 * Renders a brand SVG glyph from /assets/icons as a tintable mask so it can
 * inherit `currentColor` or be set to any brand color. Pass `root` to point at
 * the assets folder relative to the page that loads the bundle.
 */
function Icon({
  name,
  size = 20,
  color = "currentColor",
  root = "assets/icons",
  title,
  style = {},
  ...rest
}) {
  const src = `${root}/${name}.svg`;
  return /*#__PURE__*/React.createElement("span", _extends({
    role: "img",
    "aria-label": title || name,
    style: {
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
      ...style
    }
  }, rest));
}
__ds_scope.Icon = Icon;
})(); } catch (e) { (__ds_ns.__errors).push({ source: "components/brand/Icon.jsx", error: String((e && e.message) || e) }); }

// components/brand/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Alfred AI — Logo
 * The gradient "a" mark plus the "Alfred ai" wordmark. Variants render the
 * full lockup, just the mark, or just the wordmark; tone switches for dark
 * backgrounds. Assets live in /assets/logos (pass `root` to relocate).
 */
function Logo({
  variant = "full",
  tone = "color",
  height = 32,
  root = "assets/logos",
  style = {},
  ...rest
}) {
  const file = variant === "mark" ? tone === "white" ? "alfred-icon-white.svg" : "alfred-icon.svg" : variant === "wordmark" ? tone === "white" ? "alfred-wordmark-white.svg" : "alfred-logo-primary.svg" : tone === "white" ? "alfred-logo-white.svg" : "alfred-logo-primary.svg";
  return /*#__PURE__*/React.createElement("img", _extends({
    src: `${root}/${file}`,
    alt: "Alfred ai",
    style: {
      height,
      width: "auto",
      display: "block",
      ...style
    }
  }, rest));
}
__ds_scope.Logo = Logo;
})(); } catch (e) { (__ds_ns.__errors).push({ source: "components/brand/Logo.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Alfred AI — Card
 * The floating white surface used across the app: generous radius, soft
 * shadow, hairline border. `tone` swaps to the canvas or brand-gradient fill.
 */
function Card({
  children,
  tone = "surface",
  // "surface" | "sunken" | "gradient" | "ink"
  padding = 24,
  radius = "var(--radius-2xl)",
  shadow = "md",
  // "none" | "sm" | "md" | "lg"
  interactive = false,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const tones = {
    surface: {
      background: "var(--surface-card)",
      color: "var(--text-primary)",
      border: "1px solid var(--border-subtle)"
    },
    sunken: {
      background: "var(--surface-sunken)",
      color: "var(--text-primary)",
      border: "1px solid var(--border-subtle)"
    },
    gradient: {
      background: "var(--gradient-brand)",
      color: "#fff",
      border: "none"
    },
    ink: {
      background: "var(--ink-900)",
      color: "#fff",
      border: "none"
    }
  };
  const shadows = {
    none: "none",
    sm: "var(--shadow-sm)",
    md: "var(--shadow-md)",
    lg: "var(--shadow-lg)"
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      borderRadius: radius,
      padding,
      boxShadow: interactive && hover ? "var(--shadow-lg)" : shadows[shadow],
      transform: interactive && hover ? "translateY(-2px)" : "none",
      transition: "box-shadow var(--dur-base) var(--ease-standard), transform var(--dur-base) var(--ease-standard)",
      cursor: interactive ? "pointer" : "default",
      ...tones[tone],
      ...style
    }
  }, rest), children);
}
__ds_scope.Card = Card;
})(); } catch (e) { (__ds_ns.__errors).push({ source: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Chip.jsx
try { (() => {
/**
 * Alfred AI — Chip
 * Compact filter / tag pill. Tonal by default, solid orange when `selected`,
 * optionally removable. Use for filters, applied facets and entity tags.
 */
function Chip({
  children,
  tone = "neutral",
  selected = false,
  onRemove,
  onClick,
  style = {}
}) {
  const tones = {
    neutral: ["var(--gray-100)", "var(--ink-700)"],
    brand: ["var(--orange-50)", "var(--orange-600)"],
    info: ["var(--info-100)", "var(--periwinkle-600)"],
    success: ["var(--success-100)", "var(--success-500)"],
    warning: ["var(--warning-100)", "var(--orange-600)"],
    danger: ["var(--danger-100)", "var(--danger-500)"]
  };
  const [bg, fg] = selected ? ["var(--orange-500)", "#fff"] : tones[tone] || tones.neutral;
  return /*#__PURE__*/React.createElement("span", {
    onClick: onClick,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      height: 28,
      padding: "0 12px",
      borderRadius: "var(--radius-pill)",
      background: bg,
      color: fg,
      width: "auto",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-sm)",
      fontWeight: "var(--fw-medium)",
      cursor: onClick ? "pointer" : "default",
      ...style
    }
  }, children, onRemove && /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onRemove();
    },
    "aria-label": "Remove",
    style: {
      border: "none",
      background: "transparent",
      cursor: "pointer",
      display: "inline-flex",
      padding: 0,
      color: "inherit",
      opacity: 0.7
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.4",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 6l12 12M18 6L6 18"
  }))));
}
__ds_scope.Chip = Chip;
})(); } catch (e) { (__ds_ns.__errors).push({ source: "components/core/Chip.jsx", error: String((e && e.message) || e) }); }

// components/core/Tabs.jsx
try { (() => {
/**
 * Alfred AI — Tabs
 * Underline tab bar. The active tab is ink with a warm orange indicator.
 */
function Tabs({
  tabs = [],
  value,
  onChange,
  style = {}
}) {
  const active = value ?? (tabs[0] && tabs[0].id);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 28,
      borderBottom: "1px solid var(--border-subtle)",
      ...style
    }
  }, tabs.map(t => {
    const on = t.id === active;
    return /*#__PURE__*/React.createElement("button", {
      key: t.id,
      onClick: () => onChange && onChange(t.id),
      style: {
        position: "relative",
        border: "none",
        background: "transparent",
        cursor: "pointer",
        padding: "0 0 14px",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-base)",
        fontWeight: on ? "var(--fw-bold)" : "var(--fw-medium)",
        color: on ? "var(--text-primary)" : "var(--text-muted)",
        transition: "color var(--dur-base) var(--ease-standard)"
      }
    }, t.label, /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: -1,
        height: 3,
        borderRadius: "3px 3px 0 0",
        background: on ? "var(--orange-500)" : "transparent",
        transition: "background var(--dur-base) var(--ease-standard)"
      }
    }));
  }));
}
__ds_scope.Tabs = Tabs;
})(); } catch (e) { (__ds_ns.__errors).push({ source: "components/core/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
/**
 * Alfred AI — Badge
 * Compact status pill. Semantic tones map to the brand's success/warning/
 * danger/info palette; `brand` uses orange, `neutral` is a quiet gray.
 */
function Badge({
  children,
  tone = "neutral",
  dot = false,
  style = {}
}) {
  const tones = {
    neutral: {
      bg: "var(--gray-100)",
      fg: "var(--ink-600)",
      dotc: "var(--ink-400)"
    },
    brand: {
      bg: "var(--orange-50)",
      fg: "var(--orange-700)",
      dotc: "var(--orange-500)"
    },
    info: {
      bg: "var(--info-100)",
      fg: "var(--periwinkle-600)",
      dotc: "var(--periwinkle-500)"
    },
    success: {
      bg: "var(--success-100)",
      fg: "#1B7A52",
      dotc: "var(--success-500)"
    },
    warning: {
      bg: "var(--warning-100)",
      fg: "var(--orange-700)",
      dotc: "var(--warning-500)"
    },
    danger: {
      bg: "var(--danger-100)",
      fg: "#B5363A",
      dotc: "var(--danger-500)"
    }
  };
  const t = tones[tone] || tones.neutral;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "4px 10px",
      borderRadius: "var(--radius-pill)",
      background: t.bg,
      color: t.fg,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-xs)",
      fontWeight: "var(--fw-bold)",
      letterSpacing: "0.01em",
      lineHeight: 1.3,
      whiteSpace: "nowrap",
      ...style
    }
  }, dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: t.dotc,
      flex: "none"
    }
  }), children);
}
__ds_scope.Badge = Badge;
})(); } catch (e) { (__ds_ns.__errors).push({ source: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Alfred AI — Input
 * Text field with an optional label, peach-tinted or plain fill, and a
 * trailing slot (e.g. password reveal). Focus shows the warm orange ring.
 */
function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  fill = "tint",
  // "tint" (peach, auth) | "plain" (white, app)
  trailing = null,
  error,
  disabled = false,
  id,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || (label ? `in-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  const wrapBg = fill === "plain" ? "var(--surface-input-plain)" : "var(--surface-input)";
  const borderColor = error ? "var(--danger-500)" : focus ? "var(--orange-500)" : fill === "plain" ? "var(--border-default)" : "transparent";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      width: "100%",
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-base)",
      fontWeight: "var(--fw-medium)",
      color: "var(--text-primary)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      background: disabled ? "var(--gray-100)" : wrapBg,
      border: `1.5px solid ${borderColor}`,
      borderRadius: "var(--radius-md)",
      padding: "0 16px",
      height: 52,
      boxShadow: focus ? "var(--shadow-focus)" : "none",
      transition: "border-color var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard)",
      opacity: disabled ? 0.6 : 1
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    type: type,
    placeholder: placeholder,
    value: value,
    onChange: onChange,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      minWidth: 0,
      border: "none",
      outline: "none",
      background: "transparent",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-base)",
      color: "var(--text-primary)",
      height: "100%"
    }
  }, rest)), trailing), error && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-sm)",
      color: "var(--danger-500)"
    }
  }, error));
}
__ds_scope.Input = Input;
})(); } catch (e) { (__ds_ns.__errors).push({ source: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/Avatar.jsx
try { (() => {
/**
 * Alfred AI — Avatar
 * Round monogram or image. Falls back to brand-gradient initials.
 */
function Avatar({
  name = "",
  src,
  size = 40,
  tone = "gradient",
  style = {}
}) {
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]?.toUpperCase()).join("");
  const bg = tone === "gradient" ? "var(--gradient-brand)" : tone === "ink" ? "var(--ink-900)" : "var(--periwinkle-400)";
  return /*#__PURE__*/React.createElement("span", {
    style: {
      width: size,
      height: size,
      borderRadius: "50%",
      overflow: "hidden",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      background: src ? "transparent" : bg,
      color: "#fff",
      flex: "none",
      fontFamily: "var(--font-sans)",
      fontWeight: "var(--fw-bold)",
      fontSize: Math.round(size * 0.38),
      letterSpacing: "0.01em",
      ...style
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }) : initials);
}
__ds_scope.Avatar = Avatar;
})(); } catch (e) { (__ds_ns.__errors).push({ source: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Alfred AI — Button
 * Primary brand button is solid warm orange with a soft glow on hover.
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  type = "button",
  onClick,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: {
      height: 36,
      padding: "0 16px",
      font: "var(--text-sm)",
      radius: "var(--radius-md)",
      gap: 8
    },
    md: {
      height: 46,
      padding: "0 22px",
      font: "var(--text-base)",
      radius: "var(--radius-md)",
      gap: 10
    },
    lg: {
      height: 56,
      padding: "0 30px",
      font: "var(--text-lg)",
      radius: "var(--radius-lg)",
      gap: 12
    }
  };
  const s = sizes[size] || sizes.md;
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: s.gap,
    height: s.height,
    padding: s.padding,
    width: fullWidth ? "100%" : "auto",
    fontFamily: "var(--font-sans)",
    fontSize: s.font,
    fontWeight: "var(--fw-bold)",
    letterSpacing: "0.01em",
    lineHeight: 1,
    borderRadius: s.radius,
    border: "1px solid transparent",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    transition: "background var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard), transform var(--dur-fast) var(--ease-standard), border-color var(--dur-base) var(--ease-standard)",
    whiteSpace: "nowrap",
    userSelect: "none"
  };
  const variants = {
    primary: {
      background: "var(--orange-500)",
      color: "#fff"
    },
    secondary: {
      background: "var(--periwinkle-400)",
      color: "var(--ink-900)"
    },
    outline: {
      background: "transparent",
      color: "var(--ink-900)",
      borderColor: "var(--border-default)"
    },
    ghost: {
      background: "transparent",
      color: "var(--ink-700)"
    },
    subtle: {
      background: "var(--orange-50)",
      color: "var(--orange-600)"
    },
    danger: {
      background: "var(--danger-500)",
      color: "#fff"
    }
  };
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const hoverStyle = !disabled && hover ? {
    primary: {
      background: "var(--orange-600)",
      boxShadow: "var(--shadow-brand)"
    },
    secondary: {
      background: "var(--periwinkle-500)"
    },
    outline: {
      borderColor: "var(--ink-900)",
      background: "var(--gray-50)"
    },
    ghost: {
      background: "var(--gray-100)"
    },
    subtle: {
      background: "var(--orange-100)"
    },
    danger: {
      background: "#cf3a3f"
    }
  }[variant] : {};
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
      ...base,
      ...variants[variant],
      ...hoverStyle,
      transform: press && !disabled ? "scale(0.98)" : "scale(1)",
      ...style
    }
  }, rest), iconLeft, children, iconRight);
}
__ds_scope.Button = Button;
})(); } catch (e) { (__ds_ns.__errors).push({ source: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Alfred AI — Select
 * Labelled dropdown matching the Input treatments (peach "tint" on auth,
 * white "plain" in the app). Native <select> for accessibility, brand-styled
 * with a custom chevron and the warm orange focus ring.
 */
function Select({
  label,
  value,
  onChange,
  options = [],
  placeholder = "Select…",
  fill = "plain",
  disabled = false,
  error,
  id,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const selId = id || (label ? `sel-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  const bg = fill === "plain" ? "var(--surface-input-plain)" : "var(--surface-input)";
  const border = error ? "var(--danger-500)" : focus ? "var(--orange-500)" : fill === "plain" ? "var(--border-default)" : "transparent";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      width: "100%",
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: selId,
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-base)",
      fontWeight: "var(--fw-medium)",
      color: "var(--text-primary)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      background: disabled ? "var(--gray-100)" : bg,
      border: `1.5px solid ${border}`,
      borderRadius: "var(--radius-md)",
      height: 52,
      opacity: disabled ? 0.6 : 1,
      boxShadow: focus ? "var(--shadow-focus)" : "none",
      transition: "border-color var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard)"
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: selId,
    value: value,
    onChange: onChange,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      appearance: "none",
      WebkitAppearance: "none",
      flex: 1,
      border: "none",
      outline: "none",
      background: "transparent",
      height: "100%",
      padding: "0 40px 0 16px",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-base)",
      color: value ? "var(--text-primary)" : "var(--text-placeholder)",
      cursor: disabled ? "not-allowed" : "pointer"
    }
  }, rest), placeholder && /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, placeholder), options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label))), /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--ink-400)",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      position: "absolute",
      right: 14,
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 9l6 6 6-6"
  }))), error && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-sm)",
      color: "var(--danger-500)"
    }
  }, error));
}
__ds_scope.Select = Select;
})(); } catch (e) { (__ds_ns.__errors).push({ source: "components/core/Select.jsx", error: String((e && e.message) || e) }); }

// components/core/Slider.jsx
try { (() => {
/**
 * Alfred AI — Slider
 * Single-value range control with an orange fill and thumb (native input for
 * accessibility). Optional label and live value. Use for budgets, thresholds
 * and any bounded numeric input.
 */
function Slider({
  value = 50,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  showValue = true,
  style = {}
}) {
  const pct = (value - min) / (max - min || 1) * 100;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      ...style
    }
  }, (label || showValue) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 8,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-sm)"
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-secondary)"
    }
  }, label), showValue && /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: "var(--fw-bold)",
      color: "var(--text-primary)",
      fontVariantNumeric: "tabular-nums"
    }
  }, value)), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange && onChange(Number(e.target.value)),
    style: {
      width: "100%",
      height: 6,
      cursor: "pointer",
      accentColor: "var(--orange-500)",
      appearance: "none",
      WebkitAppearance: "none",
      borderRadius: "var(--radius-pill)",
      background: `linear-gradient(to right, var(--orange-500) ${pct}%, var(--border-default) ${pct}%)`
    }
  }));
}
__ds_scope.Slider = Slider;
})(); } catch (e) { (__ds_ns.__errors).push({ source: "components/core/Slider.jsx", error: String((e && e.message) || e) }); }

// components/core/Switch.jsx
try { (() => {
/** Alfred AI — Switch. Pill toggle; track turns orange when on. */
function Switch({
  checked = false,
  onChange,
  disabled = false,
  label,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-base)",
      color: "var(--text-secondary)",
      userSelect: "none",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => !disabled && onChange && onChange(!checked),
    style: {
      width: 44,
      height: 26,
      borderRadius: "var(--radius-pill)",
      padding: 3,
      background: checked ? "var(--orange-500)" : "var(--gray-200)",
      display: "inline-flex",
      alignItems: "center",
      transition: "background var(--dur-base) var(--ease-standard)",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      borderRadius: "50%",
      background: "#fff",
      boxShadow: "var(--shadow-sm)",
      transform: checked ? "translateX(18px)" : "translateX(0)",
      transition: "transform var(--dur-base) var(--ease-emphasized)"
    }
  })), label && /*#__PURE__*/React.createElement("span", null, label));
}
__ds_scope.Switch = Switch;
})(); } catch (e) { (__ds_ns.__errors).push({ source: "components/core/Switch.jsx", error: String((e && e.message) || e) }); }

// components/core/Checkbox.jsx
try { (() => {
/** Alfred AI — Checkbox. Square check with the brand orange when selected. */
function Checkbox({
  checked = false,
  onChange,
  label,
  disabled = false,
  id,
  style = {}
}) {
  const inputId = id || (label ? `cb-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-base)",
      color: "var(--text-secondary)",
      userSelect: "none",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => !disabled && onChange && onChange(!checked),
    style: {
      width: 20,
      height: 20,
      borderRadius: "var(--radius-xs)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      background: checked ? "var(--orange-500)" : "var(--periwinkle-100)",
      border: checked ? "1.5px solid var(--orange-500)" : "1.5px solid var(--periwinkle-200)",
      transition: "all var(--dur-base) var(--ease-standard)",
      flex: "none"
    }
  }, checked && /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2.5 6.2L4.8 8.5L9.5 3.5",
    stroke: "#fff",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), /*#__PURE__*/React.createElement("input", {
    id: inputId,
    type: "checkbox",
    checked: checked,
    disabled: disabled,
    onChange: e => onChange && onChange(e.target.checked),
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  }), label && /*#__PURE__*/React.createElement("span", null, label));
}
__ds_scope.Checkbox = Checkbox;
})(); } catch (e) { (__ds_ns.__errors).push({ source: "components/core/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
const { Icon } = __ds_scope;
/**
 * Alfred AI — IconButton
 * Square/round button wrapping a single brand Icon. For toolbars and headers.
 */
function IconButton({
  name,
  size = 40,
  iconSize = 18,
  variant = "ghost",
  // "ghost" | "subtle" | "solid" | "outline"
  shape = "rounded",
  // "rounded" | "circle"
  iconRoot = "assets/icons",
  title,
  onClick,
  disabled = false,
  style = {}
}) {
  const [hover, setHover] = React.useState(false);
  const variants = {
    ghost: {
      bg: "transparent",
      fg: "var(--ink-600)",
      hbg: "var(--gray-100)"
    },
    subtle: {
      bg: "var(--orange-50)",
      fg: "var(--orange-600)",
      hbg: "var(--orange-100)"
    },
    solid: {
      bg: "var(--orange-500)",
      fg: "#fff",
      hbg: "var(--orange-600)"
    },
    outline: {
      bg: "transparent",
      fg: "var(--ink-700)",
      hbg: "var(--gray-50)",
      border: "1px solid var(--border-default)"
    }
  };
  const v = variants[variant] || variants.ghost;
  return /*#__PURE__*/React.createElement("button", {
    title: title,
    onClick: onClick,
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: size,
      height: size,
      flex: "none",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: shape === "circle" ? "50%" : "var(--radius-md)",
      background: !disabled && hover ? v.hbg : v.bg,
      border: v.border || "1px solid transparent",
      color: v.fg,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      transition: "background var(--dur-base) var(--ease-standard)",
      ...style
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: name,
    size: iconSize,
    color: "currentColor",
    root: iconRoot,
    title: title
  }));
}
__ds_scope.IconButton = IconButton;
})(); } catch (e) { (__ds_ns.__errors).push({ source: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/RadioGroup.jsx
try { (() => {
/**
 * Alfred AI — RadioGroup
 * Vertical set of single-choice options; the selected dot fills brand orange.
 * Controlled via `value` / `onChange`.
 */
function RadioGroup({
  options = [],
  value,
  onChange,
  name,
  label,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    role: "radiogroup",
    "aria-label": label,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-base)",
      fontWeight: "var(--fw-medium)",
      color: "var(--text-primary)"
    }
  }, label), options.map(o => {
    const checked = value === o.value;
    return /*#__PURE__*/React.createElement("label", {
      key: o.value,
      onClick: () => onChange && onChange(o.value),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        cursor: "pointer",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-base)",
        color: "var(--text-primary)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      "aria-checked": checked,
      role: "radio",
      style: {
        width: 20,
        height: 20,
        borderRadius: "50%",
        flex: "none",
        border: `2px solid ${checked ? "var(--orange-500)" : "var(--border-default)"}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "border-color var(--dur-base) var(--ease-standard)"
      }
    }, checked && /*#__PURE__*/React.createElement("span", {
      style: {
        width: 10,
        height: 10,
        borderRadius: "50%",
        background: "var(--orange-500)"
      }
    })), o.label);
  }));
}
__ds_scope.RadioGroup = RadioGroup;
})(); } catch (e) { (__ds_ns.__errors).push({ source: "components/core/RadioGroup.jsx", error: String((e && e.message) || e) }); }

// components/core/SegmentedControl.jsx
try { (() => {
/**
 * Alfred AI — SegmentedControl
 * Pill-track segmented switch; the active segment fills orange. Use for small,
 * mutually-exclusive view toggles (e.g. Day / Week / Month). Controlled.
 */
function SegmentedControl({
  options = [],
  value,
  onChange,
  size = "md",
  style = {}
}) {
  const pad = size === "sm" ? "6px 12px" : "9px 16px";
  const fs = size === "sm" ? "var(--text-sm)" : "var(--text-base)";
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      display: "inline-flex",
      background: "var(--surface-sunken)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-pill)",
      padding: 4,
      gap: 2,
      ...style
    }
  }, options.map(o => {
    const active = value === o.value;
    return /*#__PURE__*/React.createElement("button", {
      key: o.value,
      role: "tab",
      "aria-selected": active,
      onClick: () => onChange && onChange(o.value),
      style: {
        border: "none",
        cursor: "pointer",
        padding: pad,
        borderRadius: "var(--radius-pill)",
        fontFamily: "var(--font-sans)",
        fontSize: fs,
        fontWeight: active ? "var(--fw-bold)" : "var(--fw-medium)",
        color: active ? "#fff" : "var(--text-secondary)",
        background: active ? "var(--orange-500)" : "transparent",
        boxShadow: active ? "var(--shadow-sm)" : "none",
        transition: "background var(--dur-base) var(--ease-standard), color var(--dur-base) var(--ease-standard)"
      }
    }, o.label);
  }));
}
__ds_scope.SegmentedControl = SegmentedControl;
})(); } catch (e) { (__ds_ns.__errors).push({ source: "components/core/SegmentedControl.jsx", error: String((e && e.message) || e) }); }

// components/data/Table.jsx
try { (() => {
/**
 * Alfred AI — Table
 * Lightweight data table with an uppercase tracked header, hairline row
 * dividers and tabular numerals on right-aligned columns. Columns may supply a
 * `render(value, row)` for custom cells (badges, deltas). Wrap-scrolls on x.
 */
function Table({
  columns = [],
  rows = [],
  dense = false,
  style = {}
}) {
  const py = dense ? "10px" : "15px";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      overflowX: "auto",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontFamily: "var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, columns.map((c, i) => /*#__PURE__*/React.createElement("th", {
    key: c.key || i,
    style: {
      padding: "12px 20px",
      fontSize: "var(--text-xs)",
      fontWeight: "var(--fw-bold)",
      textTransform: "uppercase",
      letterSpacing: "var(--ls-caps)",
      color: "var(--text-muted)",
      textAlign: c.align || "left",
      background: "var(--surface-sunken)",
      borderBottom: "1px solid var(--border-subtle)"
    }
  }, c.header)))), /*#__PURE__*/React.createElement("tbody", null, rows.map((r, ri) => /*#__PURE__*/React.createElement("tr", {
    key: ri
  }, columns.map((c, ci) => /*#__PURE__*/React.createElement("td", {
    key: c.key || ci,
    style: {
      padding: `${py} 20px`,
      fontSize: "var(--text-sm)",
      color: "var(--text-secondary)",
      textAlign: c.align || "left",
      borderTop: ri > 0 ? "1px solid var(--border-subtle)" : "none",
      fontVariantNumeric: c.align === "right" ? "tabular-nums" : "normal"
    }
  }, c.render ? c.render(r[c.key], r) : r[c.key])))))));
}
__ds_scope.Table = Table;
})(); } catch (e) { (__ds_ns.__errors).push({ source: "components/data/Table.jsx", error: String((e && e.message) || e) }); }

// components/data/KpiCard.jsx
try { (() => {
const { Icon } = __ds_scope;
/**
 * Alfred AI — KpiCard
 * A single metric tile for the KPI Cockpit: label, big value, and a trend
 * delta coloured by direction (up = success, down = danger, flat = muted).
 */
function KpiCard({
  label,
  value,
  delta,
  // e.g. "+12.4%"
  direction = "up",
  // "up" | "down" | "flat"
  caption,
  // e.g. "vs last 30 days"
  icon,
  // brand icon name (optional accent)
  iconRoot = "assets/icons",
  style = {}
}) {
  const dir = {
    up: {
      icon: "trend-up",
      color: "var(--success-500)",
      bg: "var(--success-100)"
    },
    down: {
      icon: "trend-down",
      color: "var(--danger-500)",
      bg: "var(--danger-100)"
    },
    flat: {
      icon: "trend-flat",
      color: "var(--ink-500)",
      bg: "var(--gray-100)"
    }
  }[direction];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-2xl)",
      padding: 22,
      boxShadow: "var(--shadow-sm)",
      display: "flex",
      flexDirection: "column",
      gap: 14,
      minWidth: 200,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-sm)",
      fontWeight: "var(--fw-medium)",
      color: "var(--text-muted)"
    }
  }, label), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 32,
      height: 32,
      borderRadius: "var(--radius-md)",
      background: "var(--orange-50)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 16,
    color: "var(--orange-500)",
    root: iconRoot
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 34,
      fontWeight: "var(--fw-semibold)",
      letterSpacing: "var(--ls-tight)",
      color: "var(--text-primary)",
      lineHeight: 1
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, delta != null && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      padding: "3px 8px",
      borderRadius: "var(--radius-pill)",
      background: dir.bg,
      color: dir.color,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-xs)",
      fontWeight: "var(--fw-bold)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: dir.icon,
    size: 12,
    color: dir.color,
    root: iconRoot
  }), delta), caption && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-xs)",
      color: "var(--text-muted)"
    }
  }, caption)));
}
__ds_scope.KpiCard = KpiCard;
})(); } catch (e) { (__ds_ns.__errors).push({ source: "components/data/KpiCard.jsx", error: String((e && e.message) || e) }); }

// components/data/Stepper.jsx
try { (() => {
/**
 * Alfred AI — Stepper
 * Horizontal numbered progress for multi-step flows (onboarding, setup). Done
 * steps fill orange with a tick, the current step has an orange ring, upcoming
 * steps are muted. `steps`: [{label}], `current` is the active index (0-based).
 */
function Stepper({
  steps = [],
  current = 0,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      width: "100%",
      ...style
    }
  }, steps.map((s, i) => {
    const done = i < current,
      active = i === current;
    const ring = done || active ? "var(--orange-500)" : "var(--border-default)";
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: i
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        flex: "none",
        width: 120
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 32,
        height: 32,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: done ? "var(--orange-500)" : active ? "var(--orange-50)" : "transparent",
        border: `2px solid ${ring}`,
        color: done ? "#fff" : active ? "var(--orange-600)" : "var(--ink-400)",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-sm)",
        fontWeight: "var(--fw-bold)"
      }
    }, done ? /*#__PURE__*/React.createElement("svg", {
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2.6",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M5 12.5l4.5 4.5L19 6.5"
    })) : i + 1), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-sm)",
        fontWeight: active ? "var(--fw-bold)" : "var(--fw-medium)",
        color: active || done ? "var(--text-primary)" : "var(--text-muted)",
        textAlign: "center"
      }
    }, s.label)), i < steps.length - 1 && /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        height: 2,
        background: i < current ? "var(--orange-500)" : "var(--border-subtle)",
        marginTop: 15
      }
    }));
  }));
}
__ds_scope.Stepper = Stepper;
})(); } catch (e) { (__ds_ns.__errors).push({ source: "components/data/Stepper.jsx", error: String((e && e.message) || e) }); }

// components/data/Skeleton.jsx
try { (() => {
/**
 * Alfred AI — Skeleton
 * Theme-aware shimmer placeholder for loading states. Renders `lines` bars
 * (last one shortened when multi-line). Compose several to mock a card or row
 * while data loads. Surfaces read the theme tokens, so it works on light + dark.
 */
function Skeleton({
  width = "100%",
  height = 16,
  radius = "var(--radius-sm)",
  lines = 1,
  style = {}
}) {
  const bar = (w, key) => /*#__PURE__*/React.createElement("span", {
    key: key,
    style: {
      display: "block",
      width: w,
      height,
      borderRadius: radius,
      background: "linear-gradient(90deg, var(--surface-sunken) 25%, var(--border-subtle) 37%, var(--surface-sunken) 63%)",
      backgroundSize: "400% 100%",
      animation: "ds-shimmer 1.4s ease infinite"
    }
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      width,
      ...style
    }
  }, /*#__PURE__*/React.createElement("style", null, "@keyframes ds-shimmer{0%{background-position:100% 50%}100%{background-position:0 50%}}"), Array.from({
    length: lines
  }).map((_, i) => bar(i === lines - 1 && lines > 1 ? "70%" : "100%", i)));
}
__ds_scope.Skeleton = Skeleton;
})(); } catch (e) { (__ds_ns.__errors).push({ source: "components/data/Skeleton.jsx", error: String((e && e.message) || e) }); }

// components/data/Breadcrumb.jsx
try { (() => {
/**
 * Alfred AI — Breadcrumb
 * Path trail with chevron separators; the final crumb is the bold current page.
 * `items`: [{label, href?}].
 */
function Breadcrumb({
  items = [],
  style = {}
}) {
  return /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Breadcrumb",
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      flexWrap: "wrap",
      ...style
    }
  }, items.map((it, i) => {
    const last = i === items.length - 1;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: i
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-sm)",
        fontWeight: last ? "var(--fw-bold)" : "var(--fw-medium)",
        color: last ? "var(--text-primary)" : "var(--text-muted)",
        cursor: last ? "default" : "pointer"
      }
    }, it.label), !last && /*#__PURE__*/React.createElement("svg", {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "var(--ink-400)",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M9 6l6 6-6 6"
    })));
  }));
}
__ds_scope.Breadcrumb = Breadcrumb;
})(); } catch (e) { (__ds_ns.__errors).push({ source: "components/data/Breadcrumb.jsx", error: String((e && e.message) || e) }); }

// components/data/EmptyState.jsx
try { (() => {
/**
 * Alfred AI — EmptyState
 * Centered placeholder for empty lists, zero-result searches and not-yet-connected
 * surfaces. Soft orange glyph chip, a calm title, one line of guidance and an
 * optional action. Pass a custom `icon` node to override the default.
 */
function EmptyState({
  title,
  body,
  action,
  icon,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "48px 24px",
      gap: 6,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 56,
      borderRadius: "var(--radius-xl)",
      background: "var(--accent-soft)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 8,
      color: "var(--orange-500)"
    }
  }, icon || /*#__PURE__*/React.createElement("svg", {
    width: "26",
    height: "26",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m20 20-3.5-3.5"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: "var(--fw-semibold)",
      fontSize: "var(--text-h4)",
      color: "var(--text-primary)",
      letterSpacing: "var(--ls-tight)"
    }
  }, title), body && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-base)",
      color: "var(--text-muted)",
      maxWidth: 340,
      margin: "2px 0 0",
      lineHeight: "var(--lh-normal)"
    }
  }, body), action && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14
    }
  }, action));
}
__ds_scope.EmptyState = EmptyState;
})(); } catch (e) { (__ds_ns.__errors).push({ source: "components/data/EmptyState.jsx", error: String((e && e.message) || e) }); }

// components/data/Pagination.jsx
try { (() => {
/**
 * Alfred AI — Pagination
 * Page navigator with prev/next chevrons and a windowed page list (first, last,
 * and a window around the current page, with … gaps). Controlled via `page` /
 * `onChange`. The active page reads orange.
 */
function Pagination({
  page = 1,
  pageCount = 1,
  onChange,
  style = {}
}) {
  const go = p => p >= 1 && p <= pageCount && onChange && onChange(p);
  const nums = [];
  for (let p = 1; p <= pageCount; p++) {
    if (p === 1 || p === pageCount || Math.abs(p - page) <= 1) nums.push(p);else if (nums[nums.length - 1] !== "…") nums.push("…");
  }
  const chev = d => /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: d
  }));
  const cell = (content, {
    key,
    active,
    disabled,
    onClick
  } = {}) => /*#__PURE__*/React.createElement("button", {
    key: key,
    disabled: disabled,
    onClick: onClick,
    "aria-current": active ? "page" : undefined,
    style: {
      minWidth: 34,
      height: 34,
      padding: "0 8px",
      borderRadius: "var(--radius-sm)",
      border: `1px solid ${active ? "var(--orange-500)" : "var(--border-subtle)"}`,
      background: active ? "var(--orange-50)" : "var(--surface-card)",
      color: active ? "var(--orange-600)" : "var(--text-secondary)",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-sm)",
      fontWeight: active ? "var(--fw-bold)" : "var(--fw-medium)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.45 : 1,
      fontVariantNumeric: "tabular-nums",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, content);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      ...style
    }
  }, cell(chev("M15 6l-6 6 6 6"), {
    key: "prev",
    disabled: page <= 1,
    onClick: () => go(page - 1)
  }), nums.map((n, i) => n === "…" ? /*#__PURE__*/React.createElement("span", {
    key: "e" + i,
    style: {
      padding: "0 4px",
      color: "var(--text-muted)"
    }
  }, "\u2026") : cell(n, {
    key: n,
    active: n === page,
    onClick: () => go(n)
  })), cell(chev("M9 6l6 6-6 6"), {
    key: "next",
    disabled: page >= pageCount,
    onClick: () => go(page + 1)
  }));
}
__ds_scope.Pagination = Pagination;
})(); } catch (e) { (__ds_ns.__errors).push({ source: "components/data/Pagination.jsx", error: String((e && e.message) || e) }); }

// components/data/ProgressBar.jsx
try { (() => {
/**
 * Alfred AI — ProgressBar
 * The signature periwinkle→orange gradient track used for onboarding,
 * goal pacing and load states. `tone="plain"` renders a solid orange fill.
 */
function ProgressBar({
  value = 0,
  height = 8,
  tone = "gradient",
  showTrack = true,
  style = {}
}) {
  const pct = Math.max(0, Math.min(100, value));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      height,
      borderRadius: "var(--radius-pill)",
      background: showTrack ? "var(--gray-200)" : "transparent",
      overflow: "hidden",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${pct}%`,
      height: "100%",
      borderRadius: "var(--radius-pill)",
      background: tone === "gradient" ? "var(--gradient-brand-reverse)" : "var(--orange-500)",
      transition: "width var(--dur-slow) var(--ease-standard)"
    }
  }));
}
__ds_scope.ProgressBar = ProgressBar;
})(); } catch (e) { (__ds_ns.__errors).push({ source: "components/data/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/data/DecisionAlert.jsx
try { (() => {
const { Icon, Badge } = __ds_scope;
/**
 * Alfred AI — DecisionAlert
 * A row in the Real-Time Decision Alerts hub: a priority-coloured rail, the
 * alert title + insight, a priority badge and an optional primary action.
 */
function DecisionAlert({
  title,
  insight,
  priority = "medium",
  // "high" | "medium" | "low" | "opportunity"
  time,
  action,
  // string label for the CTA (optional)
  onAction,
  iconRoot = "assets/icons",
  style = {}
}) {
  const map = {
    high: {
      rail: "var(--danger-500)",
      icon: "alert-warning",
      badge: "danger",
      label: "High"
    },
    medium: {
      rail: "var(--orange-500)",
      icon: "alert-warning",
      badge: "warning",
      label: "Medium"
    },
    low: {
      rail: "var(--periwinkle-400)",
      icon: "bookmark",
      badge: "info",
      label: "Low"
    },
    opportunity: {
      rail: "var(--success-500)",
      icon: "trend-up",
      badge: "success",
      label: "Opportunity"
    }
  };
  const p = map[priority] || map.medium;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      alignItems: "flex-start",
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-xl)",
      padding: "16px 18px 16px 14px",
      boxShadow: "var(--shadow-xs)",
      position: "relative",
      overflow: "hidden",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      width: 4,
      background: p.rail
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 38,
      height: 38,
      borderRadius: "var(--radius-md)",
      flex: "none",
      marginLeft: 6,
      background: "var(--orange-50)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: p.icon,
    size: 18,
    color: p.rail,
    root: iconRoot
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-base)",
      fontWeight: "var(--fw-bold)",
      color: "var(--text-primary)"
    }
  }, title), /*#__PURE__*/React.createElement(Badge, {
    tone: p.badge,
    dot: true
  }, p.label), time && /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-xs)",
      color: "var(--text-muted)"
    }
  }, time)), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-sm)",
      color: "var(--text-secondary)",
      lineHeight: "var(--lh-normal)"
    }
  }, insight), action && /*#__PURE__*/React.createElement("button", {
    onClick: onAction,
    style: {
      marginTop: 12,
      border: "none",
      cursor: "pointer",
      background: "var(--orange-500)",
      color: "#fff",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-sm)",
      fontWeight: "var(--fw-bold)",
      padding: "8px 16px",
      borderRadius: "var(--radius-md)"
    }
  }, action)));
}
__ds_scope.DecisionAlert = DecisionAlert;
})(); } catch (e) { (__ds_ns.__errors).push({ source: "components/data/DecisionAlert.jsx", error: String((e && e.message) || e) }); }

// components/charts/BarChart.jsx
try { (() => {
/**
 * Alfred AI — BarChart
 * Vertical bars for categorical comparisons. Bars use the brand gradient by
 * default; pass a per-datum `color` to override. `data`: [{label, value, color?,
 * display?}] — `display` overrides the printed value (e.g. "$84K").
 */
function BarChart({
  data = [],
  height = 200,
  max,
  showValues = true,
  style = {}
}) {
  const top = max || Math.max(...data.map(d => d.value), 1);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: 14,
      height
    }
  }, data.map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-end",
      height: "100%",
      gap: 6
    }
  }, showValues && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-xs)",
      fontWeight: "var(--fw-bold)",
      color: "var(--text-primary)",
      fontVariantNumeric: "tabular-nums"
    }
  }, d.display ?? d.value), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: 52,
      height: `${Math.max(d.value / top * 100, 2)}%`,
      borderRadius: "var(--radius-sm)",
      background: d.color || "var(--gradient-brand-reverse)"
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      marginTop: 8
    }
  }, data.map((d, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      flex: 1,
      textAlign: "center",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-xs)",
      color: "var(--text-muted)"
    }
  }, d.label))));
}
__ds_scope.BarChart = BarChart;
})(); } catch (e) { (__ds_ns.__errors).push({ source: "components/charts/BarChart.jsx", error: String((e && e.message) || e) }); }

// components/charts/LineChart.jsx
try { (() => {
/**
 * Alfred AI — LineChart
 * Labelled trend line (a sparkline with x-axis labels) for performance over
 * time. Gradient stroke + soft area fill. Pass `points` and matching `labels`.
 */
function LineChart({
  points = [],
  labels = [],
  height = 200,
  style = {}
}) {
  const uid = React.useId().replace(/[:]/g, "");
  const w = 640;
  const max = Math.max(...points),
    min = Math.min(...points);
  const nx = i => i / (points.length - 1 || 1) * w;
  const ny = v => height - (v - min) / (max - min || 1) * (height - 30) - 15;
  const line = points.map((v, i) => `${i === 0 ? "M" : "L"} ${nx(i).toFixed(1)} ${ny(v).toFixed(1)}`).join(" ");
  const area = `${line} L ${w} ${height} L 0 ${height} Z`;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      ...style
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${w} ${height}`,
    width: "100%",
    height: height,
    preserveAspectRatio: "none",
    style: {
      display: "block"
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: `${uid}l`,
    x1: "0",
    y1: "0",
    x2: "1",
    y2: "0"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#A7A7FC"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#FF8431"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: `${uid}f`,
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "rgba(255,132,49,0.20)"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "rgba(255,132,49,0)"
  }))), /*#__PURE__*/React.createElement("path", {
    d: area,
    fill: `url(#${uid}f)`
  }), /*#__PURE__*/React.createElement("path", {
    d: line,
    fill: "none",
    stroke: `url(#${uid}l)`,
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })), labels.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: 6
    }
  }, labels.map((l, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-xs)",
      color: "var(--text-muted)"
    }
  }, l))));
}
__ds_scope.LineChart = LineChart;
})(); } catch (e) { (__ds_ns.__errors).push({ source: "components/charts/LineChart.jsx", error: String((e && e.message) || e) }); }

// components/charts/Sparkline.jsx
try { (() => {
/**
 * Alfred AI — Sparkline
 * Compact trend line with the signature periwinkle→orange gradient and a soft
 * orange area fill. Pass a `points` array of numbers. Stretches to its container
 * width. Uses a unique gradient id per instance so many can share a page.
 */
function Sparkline({
  points = [],
  width = 640,
  height = 160,
  stroke = 3,
  fill = true,
  style = {}
}) {
  const uid = React.useId().replace(/[:]/g, "");
  const max = Math.max(...points),
    min = Math.min(...points);
  const nx = i => i / (points.length - 1 || 1) * width;
  const ny = v => height - (v - min) / (max - min || 1) * (height - 20) - 10;
  const line = points.map((v, i) => `${i === 0 ? "M" : "L"} ${nx(i).toFixed(1)} ${ny(v).toFixed(1)}`).join(" ");
  const area = `${line} L ${width} ${height} L 0 ${height} Z`;
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${width} ${height}`,
    width: "100%",
    height: height,
    preserveAspectRatio: "none",
    style: {
      display: "block",
      ...style
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: `${uid}l`,
    x1: "0",
    y1: "0",
    x2: "1",
    y2: "0"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#A7A7FC"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#FF8431"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: `${uid}f`,
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "rgba(255,132,49,0.20)"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "rgba(255,132,49,0)"
  }))), fill && /*#__PURE__*/React.createElement("path", {
    d: area,
    fill: `url(#${uid}f)`
  }), /*#__PURE__*/React.createElement("path", {
    d: line,
    fill: "none",
    stroke: `url(#${uid}l)`,
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
}
__ds_scope.Sparkline = Sparkline;
})(); } catch (e) { (__ds_ns.__errors).push({ source: "components/charts/Sparkline.jsx", error: String((e && e.message) || e) }); }

// components/charts/DonutChart.jsx
try { (() => {
/**
 * Alfred AI — DonutChart
 * Ring chart for share-of-total (channel mix, budget split). `segments`:
 * [{label, value, color?}] — colors default through the brand ramp. Optional
 * center label/sub. The track reads the theme so it works on light + dark.
 */
const RAMP = ["var(--orange-500)", "var(--periwinkle-400)", "var(--orange-300)", "var(--periwinkle-600)", "var(--gray-200)"];
function DonutChart({
  segments = [],
  size = 180,
  thickness = 22,
  centerLabel,
  centerSub,
  style = {}
}) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: size,
      height: size,
      ...style
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: `0 0 ${size} ${size}`,
    style: {
      transform: "rotate(-90deg)"
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: "var(--surface-sunken)",
    strokeWidth: thickness
  }), segments.map((s, i) => {
    const len = s.value / total * c;
    const el = /*#__PURE__*/React.createElement("circle", {
      key: i,
      cx: size / 2,
      cy: size / 2,
      r: r,
      fill: "none",
      stroke: s.color || RAMP[i % RAMP.length],
      strokeWidth: thickness,
      strokeDasharray: `${len} ${c - len}`,
      strokeDashoffset: -offset
    });
    offset += len;
    return el;
  })), (centerLabel || centerSub) && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }
  }, centerLabel && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: "var(--fw-bold)",
      fontSize: "var(--text-h3)",
      color: "var(--text-primary)",
      letterSpacing: "var(--ls-tight)"
    }
  }, centerLabel), centerSub && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-xs)",
      color: "var(--text-muted)"
    }
  }, centerSub)));
}
__ds_scope.DonutChart = DonutChart;
})(); } catch (e) { (__ds_ns.__errors).push({ source: "components/charts/DonutChart.jsx", error: String((e && e.message) || e) }); }

// components/charts/FunnelChart.jsx
try { (() => {
/**
 * Alfred AI — FunnelChart
 * Horizontal descending bars for a conversion funnel (Visitors → MQL → SQL →
 * Won). `steps`: [{label, value, color?, display?}]. Bars are scaled to the
 * largest step; the track reads the theme so it works on light + dark.
 */
function FunnelChart({
  steps = [],
  style = {}
}) {
  const top = Math.max(...steps.map(s => s.value), 1);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12,
      width: "100%",
      ...style
    }
  }, steps.map((s, i) => {
    const pct = Math.round(s.value / top * 100);
    return /*#__PURE__*/React.createElement("div", {
      key: i
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 6,
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-sm)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--text-secondary)"
      }
    }, s.label), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: "var(--fw-bold)",
        color: "var(--text-primary)",
        fontVariantNumeric: "tabular-nums"
      }
    }, s.display ?? s.value)), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 10,
        background: "var(--surface-sunken)",
        borderRadius: "var(--radius-pill)",
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: `${pct}%`,
        height: "100%",
        background: s.color || "var(--gradient-brand-reverse)",
        borderRadius: "var(--radius-pill)"
      }
    })));
  }));
}
__ds_scope.FunnelChart = FunnelChart;
})(); } catch (e) { (__ds_ns.__errors).push({ source: "components/charts/FunnelChart.jsx", error: String((e && e.message) || e) }); }

// components/overlay/Menu.jsx
try { (() => {
/**
 * Alfred AI — Menu
 * Vertical action list, typically rendered inside a Popover. `items`:
 * [{label, onClick, icon?, danger?}] or {divider:true}. Rows tint on hover and
 * danger items read in red.
 */
function Menu({
  items = [],
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    role: "menu",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 2,
      minWidth: 180,
      ...style
    }
  }, items.map((it, i) => it.divider ? /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      height: 1,
      background: "var(--border-subtle)",
      margin: "4px 0"
    }
  }) : /*#__PURE__*/React.createElement("button", {
    key: i,
    role: "menuitem",
    onClick: it.onClick,
    onMouseEnter: e => {
      e.currentTarget.style.background = "var(--surface-sunken)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.background = "transparent";
    },
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      width: "100%",
      textAlign: "left",
      border: "none",
      background: "transparent",
      cursor: "pointer",
      padding: "9px 12px",
      borderRadius: "var(--radius-sm)",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-sm)",
      fontWeight: "var(--fw-medium)",
      color: it.danger ? "var(--danger-500)" : "var(--text-primary)"
    }
  }, it.icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      color: it.danger ? "var(--danger-500)" : "var(--ink-500)"
    }
  }, it.icon), it.label)));
}
__ds_scope.Menu = Menu;
})(); } catch (e) { (__ds_ns.__errors).push({ source: "components/overlay/Menu.jsx", error: String((e && e.message) || e) }); }

// components/overlay/Modal.jsx
try { (() => {
/**
 * Alfred AI — Modal
 * Centered dialog over a dimmed, blurred backdrop. Controlled via `open`;
 * renders nothing when closed. Clicking the backdrop or the × calls `onClose`.
 * Pass a `footer` (usually a Button row) for actions.
 */
function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  size = "md",
  style = {}
}) {
  if (!open) return null;
  const widths = {
    sm: 400,
    md: 520,
    lg: 680
  };
  return /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(2,2,30,0.42)",
      backdropFilter: "blur(2px)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: "100%",
      maxWidth: widths[size] || 520,
      background: "var(--surface-card)",
      borderRadius: "var(--radius-3xl)",
      boxShadow: "var(--shadow-xl)",
      border: "1px solid var(--border-subtle)",
      overflow: "hidden",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 12,
      padding: "24px 24px 0"
    }
  }, title && /*#__PURE__*/React.createElement("h3", {
    style: {
      flex: 1,
      fontFamily: "var(--font-display)",
      fontWeight: "var(--fw-semibold)",
      fontSize: "var(--text-h3)",
      color: "var(--text-primary)",
      letterSpacing: "var(--ls-tight)",
      margin: 0
    }
  }, title), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Close",
    style: {
      border: "none",
      background: "transparent",
      cursor: "pointer",
      color: "var(--ink-400)",
      padding: 4,
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 6l12 12M18 6L6 18"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px 24px 24px",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-base)",
      color: "var(--text-secondary)",
      lineHeight: "var(--lh-normal)"
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      gap: 10,
      padding: "16px 24px",
      borderTop: "1px solid var(--border-subtle)",
      background: "var(--surface-sunken)"
    }
  }, footer)));
}
__ds_scope.Modal = Modal;
})(); } catch (e) { (__ds_ns.__errors).push({ source: "components/overlay/Modal.jsx", error: String((e && e.message) || e) }); }

// components/overlay/Toast.jsx
try { (() => {
/**
 * Alfred AI — Toast
 * A single transient notification card with a tonal status dot. Render one (or
 * stack several, newest on top, fixed bottom-right) to confirm actions or relay
 * a decision alert. Pass `onClose` for a dismiss ×.
 */
function Toast({
  tone = "info",
  title,
  children,
  onClose,
  style = {}
}) {
  const tones = {
    info: "var(--periwinkle-500)",
    success: "var(--success-500)",
    warning: "var(--orange-500)",
    danger: "var(--danger-500)"
  };
  const fg = tones[tone] || tones.info;
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 12,
      width: 360,
      maxWidth: "90vw",
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-lg)",
      padding: "14px 16px",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: fg,
      marginTop: 6,
      flex: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-sm)",
      fontWeight: "var(--fw-bold)",
      color: "var(--text-primary)"
    }
  }, title), children && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-sm)",
      color: "var(--text-muted)",
      marginTop: title ? 2 : 0
    }
  }, children)), onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Dismiss",
    style: {
      border: "none",
      background: "transparent",
      cursor: "pointer",
      color: "var(--ink-400)",
      display: "inline-flex",
      padding: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.4",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 6l12 12M18 6L6 18"
  }))));
}
__ds_scope.Toast = Toast;
})(); } catch (e) { (__ds_ns.__errors).push({ source: "components/overlay/Toast.jsx", error: String((e && e.message) || e) }); }

// components/overlay/Drawer.jsx
try { (() => {
/**
 * Alfred AI — Drawer
 * Side panel that slides in from the right (default) or left over a dimmed
 * backdrop. Controlled via `open`. Use for filters, detail views and settings
 * that shouldn't take the user off the page.
 */
function Drawer({
  open,
  onClose,
  side = "right",
  title,
  children,
  width = 380,
  style = {}
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 50
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(2,2,30,0.42)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      bottom: 0,
      [side]: 0,
      width,
      maxWidth: "90vw",
      background: "var(--surface-card)",
      boxShadow: "var(--shadow-xl)",
      display: "flex",
      flexDirection: "column",
      borderLeft: side === "right" ? "1px solid var(--border-subtle)" : "none",
      borderRight: side === "left" ? "1px solid var(--border-subtle)" : "none",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "20px 22px",
      borderBottom: "1px solid var(--border-subtle)"
    }
  }, title && /*#__PURE__*/React.createElement("h3", {
    style: {
      flex: 1,
      fontFamily: "var(--font-display)",
      fontWeight: "var(--fw-semibold)",
      fontSize: "var(--text-h4)",
      color: "var(--text-primary)",
      margin: 0
    }
  }, title), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Close",
    style: {
      border: "none",
      background: "transparent",
      cursor: "pointer",
      color: "var(--ink-400)",
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 6l12 12M18 6L6 18"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: "auto",
      padding: 22,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-base)",
      color: "var(--text-secondary)"
    }
  }, children)));
}
__ds_scope.Drawer = Drawer;
})(); } catch (e) { (__ds_ns.__errors).push({ source: "components/overlay/Drawer.jsx", error: String((e && e.message) || e) }); }

// components/overlay/Popover.jsx
try { (() => {
/**
 * Alfred AI — Popover
 * Floating panel anchored to a trigger. Controlled via `open` / `onOpenChange`.
 * Use it to host a Menu, a small form, or contextual detail. For plain text
 * hints use Tooltip instead.
 */
function Popover({
  open,
  onOpenChange,
  trigger,
  children,
  placement = "bottom",
  style = {}
}) {
  const pos = {
    bottom: {
      top: "100%",
      left: 0,
      marginTop: 8
    },
    "bottom-end": {
      top: "100%",
      right: 0,
      marginTop: 8
    },
    top: {
      bottom: "100%",
      left: 0,
      marginBottom: 8
    }
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => onOpenChange && onOpenChange(!open)
  }, trigger), open && /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    style: {
      position: "absolute",
      zIndex: 60,
      minWidth: 200,
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-lg)",
      padding: 8,
      ...(pos[placement] || pos.bottom),
      ...style
    }
  }, children));
}
__ds_scope.Popover = Popover;
})(); } catch (e) { (__ds_ns.__errors).push({ source: "components/overlay/Popover.jsx", error: String((e && e.message) || e) }); }

// components/overlay/Tooltip.jsx
try { (() => {
/**
 * Alfred AI — Tooltip
 * Wraps a trigger and reveals a small ink label on hover/focus. Use for terse
 * clarifications (what a KPI means, an icon-button's action). Keep labels to a
 * few words — anything longer belongs in a Popover.
 */
function Tooltip({
  label,
  placement = "top",
  children,
  style = {}
}) {
  const [show, setShow] = React.useState(false);
  const pos = {
    top: {
      bottom: "100%",
      left: "50%",
      transform: "translateX(-50%)",
      marginBottom: 8
    },
    bottom: {
      top: "100%",
      left: "50%",
      transform: "translateX(-50%)",
      marginTop: 8
    },
    left: {
      right: "100%",
      top: "50%",
      transform: "translateY(-50%)",
      marginRight: 8
    },
    right: {
      left: "100%",
      top: "50%",
      transform: "translateY(-50%)",
      marginLeft: 8
    }
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-flex",
      ...style
    },
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false),
    onFocus: () => setShow(true),
    onBlur: () => setShow(false)
  }, children, show && /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    style: {
      position: "absolute",
      zIndex: 60,
      whiteSpace: "nowrap",
      background: "var(--ink-900)",
      color: "#fff",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-xs)",
      fontWeight: "var(--fw-medium)",
      padding: "6px 10px",
      borderRadius: "var(--radius-sm)",
      boxShadow: "var(--shadow-md)",
      pointerEvents: "none",
      ...pos[placement]
    }
  }, label));
}
__ds_scope.Tooltip = Tooltip;
})(); } catch (e) { (__ds_ns.__errors).push({ source: "components/overlay/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Banner.jsx
try { (() => {
/**
 * Alfred AI — Banner
 * Inline, tonal message bar with a leading icon and a colored rail. Use for
 * page-level info / success / warning / danger notices (a passive cousin of the
 * DecisionAlert). Optional action and dismiss.
 */
function Banner({
  tone = "info",
  title,
  children,
  action,
  onDismiss,
  style = {}
}) {
  const tones = {
    info: ["var(--info-100)", "var(--periwinkle-600)"],
    success: ["var(--success-100)", "var(--success-500)"],
    warning: ["var(--warning-100)", "var(--orange-600)"],
    danger: ["var(--danger-100)", "var(--danger-500)"]
  };
  const [bg, fg] = tones[tone] || tones.info;
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 12,
      background: bg,
      borderRadius: "var(--radius-lg)",
      padding: "14px 16px",
      borderLeft: `3px solid ${fg}`,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      marginTop: 1,
      color: fg,
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 8v4M12 16h.01"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-sm)",
      fontWeight: "var(--fw-bold)",
      color: "var(--ink-900)"
    }
  }, title), children && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-sm)",
      color: "var(--ink-700)",
      marginTop: title ? 2 : 0,
      lineHeight: "var(--lh-normal)"
    }
  }, children), action && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10
    }
  }, action)), onDismiss && /*#__PURE__*/React.createElement("button", {
    onClick: onDismiss,
    "aria-label": "Dismiss",
    style: {
      border: "none",
      background: "transparent",
      cursor: "pointer",
      color: fg,
      opacity: 0.7,
      padding: 0,
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 6l12 12M18 6L6 18"
  }))));
}
__ds_scope.Banner = Banner;
})(); } catch (e) { (__ds_ns.__errors).push({ source: "components/feedback/Banner.jsx", error: String((e && e.message) || e) }); }

// components/marketing/FaqItem.jsx
try { (() => {
/**
 * Alfred AI — FaqItem
 * Accordion row with a plus/minus toggle. Uncontrolled by default;
 * pass `open` + `onToggle` to control it.
 */
function FaqItem({
  question,
  children,
  open,
  defaultOpen = false,
  onToggle,
  style = {}
}) {
  const [internal, setInternal] = React.useState(defaultOpen);
  const isOpen = open != null ? open : internal;
  const toggle = () => {
    onToggle ? onToggle(!isOpen) : setInternal(!isOpen);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderBottom: "1px solid var(--border-subtle)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: toggle,
    style: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      gap: 16,
      padding: "22px 4px",
      background: "transparent",
      border: "none",
      cursor: "pointer",
      textAlign: "left",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-lg)",
      fontWeight: "var(--fw-bold)",
      color: "var(--text-primary)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, question), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: 28,
      flex: "none",
      borderRadius: "var(--radius-sm)",
      background: isOpen ? "var(--orange-500)" : "var(--accent-soft)",
      color: isOpen ? "#fff" : "var(--orange-500)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 18,
      fontWeight: "var(--fw-medium)",
      transition: "background var(--dur-base) var(--ease-standard)"
    }
  }, isOpen ? "–" : "+")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateRows: isOpen ? "1fr" : "0fr",
      transition: "grid-template-rows var(--dur-slow) var(--ease-standard)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-base)",
      color: "var(--text-secondary)",
      lineHeight: "var(--lh-relaxed)",
      padding: "0 4px 22px",
      margin: 0,
      maxWidth: 760
    }
  }, children))));
}
__ds_scope.FaqItem = FaqItem;
})(); } catch (e) { (__ds_ns.__errors).push({ source: "components/marketing/FaqItem.jsx", error: String((e && e.message) || e) }); }

// components/marketing/StatBand.jsx
try { (() => {
/**
 * Alfred AI — StatBand
 * Row of headline outcome metrics (e.g. 90+, $90M+, 90x) with gradient
 * numerals and a caption. Used in the "Leaders trust Alfred" band.
 */
function StatBand({
  stats = [],
  gradient = true,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: `repeat(${stats.length}, 1fr)`,
      gap: 24,
      ...style
    }
  }, stats.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: "var(--fw-bold)",
      fontSize: 64,
      lineHeight: 1,
      letterSpacing: "-0.03em",
      ...(gradient ? {
        background: "var(--gradient-brand-reverse)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent"
      } : {
        color: "var(--text-primary)"
      })
    }
  }, s.value), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-base)",
      color: "var(--text-secondary)",
      lineHeight: "var(--lh-normal)"
    }
  }, s.label))));
}
__ds_scope.StatBand = StatBand;
})(); } catch (e) { (__ds_ns.__errors).push({ source: "components/marketing/StatBand.jsx", error: String((e && e.message) || e) }); }

// components/marketing/StepFlow.jsx
try { (() => {
/**
 * Alfred AI — StepFlow
 * The "Alfred works for you" process strip: numbered steps
 * (Learn → Nudges → Recommends → Acts) with a connecting rail.
 * Lays out horizontally; wraps responsively.
 */
function StepFlow({
  steps = [],
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
      gap: 0,
      ...style
    }
  }, steps.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      position: "relative",
      padding: "0 22px",
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, i < steps.length - 1 && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 19,
      left: "calc(50% + 24px)",
      right: "calc(-50% + 24px)",
      height: 2,
      background: "var(--border-default)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 40,
      height: 40,
      borderRadius: "var(--radius-md)",
      flex: "none",
      position: "relative",
      zIndex: 1,
      background: "var(--gradient-brand)",
      color: "#fff",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-display)",
      fontWeight: "var(--fw-semibold)",
      fontSize: "var(--text-lg)",
      boxShadow: "var(--shadow-brand)"
    }
  }, i + 1), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "var(--text-h4)",
      fontWeight: "var(--fw-semibold)",
      color: "var(--text-primary)",
      marginBottom: 6,
      letterSpacing: "var(--ls-tight)"
    }
  }, s.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-sm)",
      color: "var(--text-secondary)",
      lineHeight: "var(--lh-normal)"
    }
  }, s.body)))));
}
__ds_scope.StepFlow = StepFlow;
})(); } catch (e) { (__ds_ns.__errors).push({ source: "components/marketing/StepFlow.jsx", error: String((e && e.message) || e) }); }

// components/marketing/SignalCard.jsx
try { (() => {
/**
 * Alfred AI — SignalCard
 * The site's recurring "signal" tile: an uppercase status eyebrow with a
 * colored dot, a bold plain-language statement, and a muted trace/footnote.
 * Tones map to the decision lifecycle (signal · truth · early · action).
 */
function SignalCard({
  label,
  statement,
  trace,
  tone = "signal",
  style = {}
}) {
  const tones = {
    truth: "var(--periwinkle-400)",
    // ONE SOURCE OF TRUTH
    signal: "var(--orange-500)",
    // SIGNAL DETECTED
    early: "var(--warning-500)",
    // CAUGHT EARLY
    action: "var(--success-500)" // ALIGNED ACTION
  };
  const c = tones[tone] || tones.signal;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-xl)",
      padding: "18px 20px",
      boxShadow: "var(--shadow-sm)",
      display: "flex",
      flexDirection: "column",
      gap: 10,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: c,
      flex: "none"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-2xs)",
      fontWeight: "var(--fw-bold)",
      letterSpacing: "var(--ls-caps)",
      textTransform: "uppercase",
      color: c
    }
  }, label)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-lg)",
      fontWeight: "var(--fw-bold)",
      color: "var(--text-primary)",
      lineHeight: 1.3
    }
  }, statement), trace && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-sm)",
      color: "var(--text-muted)"
    }
  }, trace));
}
__ds_scope.SignalCard = SignalCard;
})(); } catch (e) { (__ds_ns.__errors).push({ source: "components/marketing/SignalCard.jsx", error: String((e && e.message) || e) }); }

// components/marketing/AgentStatus.jsx
try { (() => {
/**
 * Alfred AI — AgentStatus
 * The "Seek Alfred" reasoning panel: a query, a stack of reasoning steps that
 * progress (done → active → pending) with a pulsing active dot, and a footer.
 * Pass `activeStep` to control progress, or let it auto-advance.
 */
function AgentStatus({
  query,
  steps = [],
  activeStep,
  autoplay = true,
  footer = "Thought for 1 minute…",
  style = {}
}) {
  const [idx, setIdx] = React.useState(0);
  const active = activeStep != null ? activeStep : idx;
  React.useEffect(() => {
    if (activeStep != null || !autoplay) return;
    const t = setInterval(() => setIdx(i => (i + 1) % (steps.length + 1)), 1100);
    return () => clearInterval(t);
  }, [autoplay, activeStep, steps.length]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-2xl)",
      padding: 20,
      boxShadow: "var(--shadow-md)",
      display: "flex",
      flexDirection: "column",
      gap: 16,
      ...style
    }
  }, query && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "12px 16px",
      background: "var(--surface-sunken)",
      borderRadius: "var(--radius-md)",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-base)",
      fontWeight: "var(--fw-medium)",
      color: "var(--text-primary)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: "var(--orange-500)",
      flex: "none"
    }
  }), query), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, steps.map((s, i) => {
    const done = i < active,
      on = i === active;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        opacity: done || on ? 1 : 0.4,
        transition: "opacity var(--dur-base)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 18,
        height: 18,
        flex: "none",
        borderRadius: "50%",
        background: done ? "var(--success-500)" : on ? "transparent" : "var(--border-default)",
        border: on ? "2px solid var(--orange-500)" : "none",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        animation: on ? "alfredPulse 1.1s var(--ease-standard) infinite" : "none"
      }
    }, done && /*#__PURE__*/React.createElement("svg", {
      width: "10",
      height: "10",
      viewBox: "0 0 12 12",
      fill: "none"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M2.5 6.2L4.8 8.5L9.5 3.5",
      stroke: "#fff",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }))), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-sm)",
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        fontWeight: "var(--fw-bold)",
        color: done ? "var(--text-secondary)" : on ? "var(--orange-600)" : "var(--text-muted)"
      }
    }, s));
  })), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-xs)",
      color: "var(--text-muted)",
      borderTop: "1px solid var(--border-subtle)",
      paddingTop: 14
    }
  }, footer), /*#__PURE__*/React.createElement("style", null, `@keyframes alfredPulse{0%,100%{box-shadow:0 0 0 0 rgba(255,132,49,0.35)}50%{box-shadow:0 0 0 6px rgba(255,132,49,0)}}`));
}
__ds_scope.AgentStatus = AgentStatus;
})(); } catch (e) { (__ds_ns.__errors).push({ source: "components/marketing/AgentStatus.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Slider = __ds_scope.Slider;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.RadioGroup = __ds_scope.RadioGroup;

__ds_ns.SegmentedControl = __ds_scope.SegmentedControl;

__ds_ns.Table = __ds_scope.Table;

__ds_ns.KpiCard = __ds_scope.KpiCard;

__ds_ns.Stepper = __ds_scope.Stepper;

__ds_ns.Skeleton = __ds_scope.Skeleton;

__ds_ns.Breadcrumb = __ds_scope.Breadcrumb;

__ds_ns.EmptyState = __ds_scope.EmptyState;

__ds_ns.Pagination = __ds_scope.Pagination;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.DecisionAlert = __ds_scope.DecisionAlert;

__ds_ns.BarChart = __ds_scope.BarChart;

__ds_ns.LineChart = __ds_scope.LineChart;

__ds_ns.Sparkline = __ds_scope.Sparkline;

__ds_ns.DonutChart = __ds_scope.DonutChart;

__ds_ns.FunnelChart = __ds_scope.FunnelChart;

__ds_ns.Menu = __ds_scope.Menu;

__ds_ns.Modal = __ds_scope.Modal;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Drawer = __ds_scope.Drawer;

__ds_ns.Popover = __ds_scope.Popover;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Banner = __ds_scope.Banner;

__ds_ns.FaqItem = __ds_scope.FaqItem;

__ds_ns.StatBand = __ds_scope.StatBand;

__ds_ns.StepFlow = __ds_scope.StepFlow;

__ds_ns.SignalCard = __ds_scope.SignalCard;

__ds_ns.AgentStatus = __ds_scope.AgentStatus;

})();
