/* @ds-bundle: {"format":3,"namespace":"VisitPrepDesignSystem_2c5c4e","components":[{"name":"EvidenceCard","sourcePath":"components/clinical/EvidenceCard.jsx"},{"name":"SafetyNote","sourcePath":"components/clinical/SafetyNote.jsx"},{"name":"SymptomChip","sourcePath":"components/clinical/SymptomChip.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"KpiCard","sourcePath":"components/core/KpiCard.jsx"},{"name":"StatusDot","sourcePath":"components/core/StatusDot.jsx"},{"name":"MiniBarChart","sourcePath":"components/data/MiniBarChart.jsx"},{"name":"Sparkline","sourcePath":"components/data/Sparkline.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"Toggle","sourcePath":"components/forms/Toggle.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/clinical/EvidenceCard.jsx":"3ed416d6a14d","components/clinical/SafetyNote.jsx":"06491e3f8b0f","components/clinical/SymptomChip.jsx":"eacd4e088566","components/core/Badge.jsx":"1bc397947613","components/core/Button.jsx":"09a4b8f358c8","components/core/Card.jsx":"58cfae1a752f","components/core/KpiCard.jsx":"f385b7eb42dd","components/core/StatusDot.jsx":"2856d797cc03","components/data/MiniBarChart.jsx":"91f4c7c9cbc5","components/data/Sparkline.jsx":"7913a00100ee","components/forms/Input.jsx":"88791b16500c","components/forms/Select.jsx":"bfd306ca45af","components/forms/Textarea.jsx":"de2946451995","components/forms/Toggle.jsx":"2e53a79fdf14","components/navigation/Tabs.jsx":"3887bcdd4219","ui_kits/visitprep/Analytics.jsx":"4b100ec3dbe8","ui_kits/visitprep/App.jsx":"55e1cc63e596","ui_kits/visitprep/Extra.jsx":"1c7adb65ee3b","ui_kits/visitprep/Overview.jsx":"aaa7e867c351","ui_kits/visitprep/Pieces.jsx":"870186babb27","ui_kits/visitprep/Report.jsx":"b8add48c4f5f","ui_kits/visitprep/RightRail.jsx":"df46574bd859","ui_kits/visitprep/Sidebar.jsx":"faa13ca88083","ui_kits/visitprep/Topbar.jsx":"a6d31e8543e0","ui_kits/visitprep/data.js":"bc76246e2410"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.VisitPrepDesignSystem_2c5c4e = window.VisitPrepDesignSystem_2c5c4e || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/clinical/EvidenceCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * EvidenceCard — ties an extracted signal back to its source. Shows the signal,
 * the verbatim journal snippet (with the matched phrase highlighted), the date,
 * and the deterministic match basis. This is the core trust primitive: every
 * signal is traceable to "Selected source evidence".
 */
function EvidenceCard({
  signal,
  level = "mild",
  date,
  snippet,
  match,
  injectionAdjacent,
  style,
  ...rest
}) {
  // Highlight the matched phrase inside the snippet, if provided.
  let body = snippet;
  if (match && typeof snippet === "string") {
    const i = snippet.toLowerCase().indexOf(match.toLowerCase());
    if (i >= 0) {
      body = /*#__PURE__*/React.createElement(React.Fragment, null, snippet.slice(0, i), /*#__PURE__*/React.createElement("mark", {
        style: {
          background: "var(--accent-tint-2)",
          color: "var(--accent-text)",
          padding: "0 2px",
          borderRadius: 2
        }
      }, snippet.slice(i, i + match.length)), snippet.slice(i + match.length));
    }
  }
  const levelColor = {
    none: "var(--gray-400)",
    mild: "var(--teal-500)",
    moderate: "var(--amber-500)",
    severe: "var(--red-500)"
  }[level];
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: "var(--surface)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-md)",
      padding: "12px 14px",
      display: "flex",
      flexDirection: "column",
      gap: 8,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: levelColor,
      flex: "none"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-sm)",
      fontWeight: 600,
      color: "var(--text-strong)",
      textTransform: "capitalize"
    }
  }, signal), injectionAdjacent && /*#__PURE__*/React.createElement("i", {
    "data-lucide": "syringe",
    style: {
      width: 12,
      height: 12,
      color: "var(--accent)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-xs)",
      color: "var(--text-muted)"
    }
  }, date)), /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: 0,
      paddingLeft: 10,
      borderLeft: "2px solid var(--border-strong)",
      fontSize: "var(--text-sm)",
      lineHeight: "var(--leading-snug)",
      color: "var(--text-body)",
      fontStyle: "italic"
    }
  }, "\"", body, "\""), match && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 5,
      fontSize: "var(--text-2xs)",
      color: "var(--text-subtle)"
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "search-check",
    style: {
      width: 12,
      height: 12
    }
  }), /*#__PURE__*/React.createElement("span", null, "Matched on ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)"
    }
  }, "\"", match, "\""), " \xB7 local deterministic extraction")));
}
Object.assign(__ds_scope, { EvidenceCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/clinical/EvidenceCard.jsx", error: String((e && e.message) || e) }); }

// components/clinical/SafetyNote.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * SafetyNote — the visible-but-concise safety boundary. Tonal callout, not
 * alarmist: amber for general boundary, red only for true safety stops.
 * Carries the canonical disclaimer copy by default.
 */
function SafetyNote({
  tone = "caution",
  title = "Safety boundary",
  children,
  icon,
  style,
  ...rest
}) {
  const tones = {
    caution: {
      bg: "var(--caution-tint)",
      bd: "var(--caution-border)",
      fg: "var(--caution-text)",
      ic: icon || "shield-alert"
    },
    danger: {
      bg: "var(--danger-tint)",
      bd: "var(--danger-border)",
      fg: "var(--danger-text)",
      ic: icon || "octagon-alert"
    },
    neutral: {
      bg: "var(--surface-sunken)",
      bd: "var(--border-default)",
      fg: "var(--text-body)",
      ic: icon || "info"
    }
  };
  const t = tones[tone] || tones.caution;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      gap: 10,
      background: t.bg,
      border: `1px solid ${t.bd}`,
      borderRadius: "var(--radius-md)",
      padding: "12px 14px",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("i", {
    "data-lucide": t.ic,
    style: {
      width: 17,
      height: 17,
      color: t.fg,
      flex: "none",
      marginTop: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 3
    }
  }, title && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-2xs)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-eyebrow)",
      fontWeight: 700,
      color: t.fg
    }
  }, title), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-sm)",
      lineHeight: "var(--leading-snug)",
      color: "var(--text-body)"
    }
  }, children || "This report organizes synthetic patient-reported notes and wearable-style metrics for review. It does not diagnose, determine causality, recommend treatment changes, or replace clinician judgment.")));
}
Object.assign(__ds_scope, { SafetyNote });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/clinical/SafetyNote.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Badge — compact status / metadata label. Tonal (soft tint + text) by default.
 * Tones map to the semantic system: accent, neutral, caution, danger, positive.
 */
function Badge({
  children,
  tone = "neutral",
  icon,
  solid = false,
  style,
  ...rest
}) {
  const tones = {
    neutral: {
      bg: "var(--surface-sunken)",
      fg: "var(--text-body)",
      bd: "var(--border-default)"
    },
    accent: {
      bg: "var(--accent-tint)",
      fg: "var(--accent-text)",
      bd: "var(--border-accent)"
    },
    caution: {
      bg: "var(--caution-tint)",
      fg: "var(--caution-text)",
      bd: "var(--caution-border)"
    },
    danger: {
      bg: "var(--danger-tint)",
      fg: "var(--danger-text)",
      bd: "var(--danger-border)"
    },
    positive: {
      bg: "var(--positive-tint)",
      fg: "var(--accent-text)",
      bd: "var(--border-accent)"
    }
  };
  const t = tones[tone] || tones.neutral;
  const solidBg = {
    neutral: "var(--gray-600)",
    accent: "var(--accent)",
    caution: "var(--caution)",
    danger: "var(--danger)",
    positive: "var(--positive)"
  }[tone];
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "4px",
      height: "20px",
      padding: "0 8px",
      fontSize: "var(--text-2xs)",
      fontWeight: 600,
      letterSpacing: "0.01em",
      borderRadius: "var(--radius-sm)",
      background: solid ? solidBg : t.bg,
      color: solid ? "#fff" : t.fg,
      border: solid ? "1px solid transparent" : `1px solid ${t.bd}`,
      whiteSpace: "nowrap",
      ...style
    }
  }, rest), icon && /*#__PURE__*/React.createElement("i", {
    "data-lucide": icon,
    style: {
      width: 12,
      height: 12
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Button — primary action control for the VisitPrep workspace.
 * Calm clinical styling: teal primary, hairline secondary, quiet ghost,
 * red reserved for destructive. Darken-on-hover, darken-more-on-press,
 * no scale, soft focus ring.
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconRight,
  disabled = false,
  block = false,
  type = "button",
  onClick,
  style,
  ...rest
}) {
  const sizes = {
    sm: {
      h: "var(--control-h-sm)",
      px: "10px",
      fs: "13px",
      gap: "6px",
      ic: 15
    },
    md: {
      h: "var(--control-h-md)",
      px: "14px",
      fs: "14px",
      gap: "7px",
      ic: 16
    },
    lg: {
      h: "var(--control-h-lg)",
      px: "18px",
      fs: "15px",
      gap: "8px",
      ic: 18
    }
  };
  const s = sizes[size] || sizes.md;
  const variants = {
    primary: {
      background: "var(--accent)",
      color: "var(--text-on-accent)",
      border: "1px solid var(--accent)"
    },
    secondary: {
      background: "var(--surface)",
      color: "var(--text-strong)",
      border: "1px solid var(--border-strong)"
    },
    ghost: {
      background: "transparent",
      color: "var(--text-body)",
      border: "1px solid transparent"
    },
    danger: {
      background: "var(--danger)",
      color: "#fff",
      border: "1px solid var(--danger)"
    }
  };
  const v = variants[variant] || variants.primary;
  const base = {
    display: block ? "flex" : "inline-flex",
    width: block ? "100%" : undefined,
    alignItems: "center",
    justifyContent: "center",
    gap: s.gap,
    height: s.h,
    padding: `0 ${s.px}`,
    fontFamily: "var(--font-sans)",
    fontSize: s.fs,
    fontWeight: 600,
    lineHeight: 1,
    borderRadius: "var(--radius-md)",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    transition: "background var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard)",
    whiteSpace: "nowrap",
    ...v,
    ...style
  };
  const hoverBg = {
    primary: "var(--accent-hover)",
    secondary: "var(--surface-sunken)",
    ghost: "var(--surface-sunken)",
    danger: "var(--red-700)"
  }[variant];
  const onEnter = e => {
    if (!disabled) e.currentTarget.style.background = hoverBg;
  };
  const onLeave = e => {
    if (!disabled) e.currentTarget.style.background = v.background;
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: onEnter,
    onMouseLeave: onLeave,
    style: base
  }, rest), icon && /*#__PURE__*/React.createElement("i", {
    "data-lucide": icon,
    style: {
      width: s.ic,
      height: s.ic
    }
  }), children && /*#__PURE__*/React.createElement("span", null, children), iconRight && /*#__PURE__*/React.createElement("i", {
    "data-lucide": iconRight,
    style: {
      width: s.ic,
      height: s.ic
    }
  }));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Card — the base surface of the workspace. White, 1px border, 8px radius,
 * barely-there shadow. Optional header (title + eyebrow + action) then body.
 */
function Card({
  title,
  eyebrow,
  action,
  padding = 16,
  children,
  style,
  bodyStyle,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("section", _extends({
    style: {
      background: "var(--surface)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-xs)",
      overflow: "hidden",
      ...style
    }
  }, rest), (title || eyebrow || action) && /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "12px",
      padding: `12px ${padding}px`,
      borderBottom: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, eyebrow && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-2xs)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-eyebrow)",
      fontWeight: 600,
      color: "var(--text-muted)",
      marginBottom: title ? 2 : 0
    }
  }, eyebrow), title && /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: "var(--text-h3)",
      fontWeight: 600,
      color: "var(--text-strong)"
    }
  }, title)), action && /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "none"
    }
  }, action)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: `${padding}px`,
      ...bodyStyle
    }
  }, children));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/KpiCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * KpiCard — a single scannable metric. Eyebrow label, large tabular value,
 * optional unit and delta. Deltas are tonal, never colorful: positive/negative
 * read against `goodDirection` so a weight drop can be neutral, not "bad red".
 */
function KpiCard({
  label,
  value,
  unit,
  delta,
  deltaTone = "neutral",
  icon,
  hint,
  style,
  ...rest
}) {
  const tones = {
    neutral: "var(--text-muted)",
    positive: "var(--accent-text)",
    caution: "var(--caution-text)",
    danger: "var(--danger-text)"
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: "var(--surface)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-xs)",
      padding: "14px 16px",
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-2xs)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-eyebrow)",
      fontWeight: 600,
      color: "var(--text-muted)"
    }
  }, label), icon && /*#__PURE__*/React.createElement("i", {
    "data-lucide": icon,
    style: {
      width: 16,
      height: 16,
      color: "var(--text-subtle)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "26px",
      fontWeight: 700,
      color: "var(--text-strong)",
      letterSpacing: "var(--tracking-tight)",
      fontVariantNumeric: "tabular-nums",
      lineHeight: 1
    }
  }, value), unit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "13px",
      color: "var(--text-muted)",
      fontWeight: 500
    }
  }, unit)), (delta || hint) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      fontSize: "12px"
    }
  }, delta && /*#__PURE__*/React.createElement("span", {
    style: {
      color: tones[deltaTone],
      fontWeight: 600,
      fontVariantNumeric: "tabular-nums"
    }
  }, delta), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-subtle)"
    }
  }, hint)));
}
Object.assign(__ds_scope, { KpiCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/KpiCard.jsx", error: String((e && e.message) || e) }); }

// components/core/StatusDot.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * StatusDot — a tiny severity / status indicator. Pairs with a label.
 * Levels map to the clinical severity scale used across signals.
 */
function StatusDot({
  level = "none",
  size = 8,
  pulse = false,
  style,
  ...rest
}) {
  const colors = {
    none: "var(--gray-300)",
    mild: "var(--teal-400)",
    moderate: "var(--amber-500)",
    severe: "var(--red-500)"
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-block",
      width: size,
      height: size,
      borderRadius: "var(--radius-pill)",
      background: colors[level] || colors.none,
      boxShadow: pulse ? `0 0 0 3px color-mix(in srgb, ${colors[level]} 22%, transparent)` : "none",
      flex: "none",
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { StatusDot });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/StatusDot.jsx", error: String((e && e.message) || e) }); }

// components/clinical/SymptomChip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * SymptomChip — a single extracted symptom signal as a structured chip.
 * Shows a severity dot, the symptom label, an optional count, and an optional
 * injection-adjacent marker. Selectable (to reveal evidence) and removable.
 */
function SymptomChip({
  label,
  level = "mild",
  count,
  injectionAdjacent = false,
  selected = false,
  onClick,
  onRemove,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    onClick: onClick,
    role: onClick ? "button" : undefined,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 7,
      height: 28,
      padding: "0 10px",
      background: selected ? "var(--accent-tint)" : "var(--surface)",
      border: `1px solid ${selected ? "var(--border-accent)" : "var(--border-default)"}`,
      borderRadius: "var(--radius-pill)",
      cursor: onClick ? "pointer" : "default",
      transition: "background var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.StatusDot, {
    level: level,
    size: 7
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-sm)",
      fontWeight: 600,
      color: "var(--text-strong)",
      textTransform: "capitalize"
    }
  }, label), typeof count === "number" && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-xs)",
      color: "var(--text-muted)",
      fontVariantNumeric: "tabular-nums"
    }
  }, "\xD7", count), injectionAdjacent && /*#__PURE__*/React.createElement("i", {
    "data-lucide": "syringe",
    title: "Injection-adjacent",
    style: {
      width: 12,
      height: 12,
      color: "var(--accent)"
    }
  }), onRemove && /*#__PURE__*/React.createElement("i", {
    "data-lucide": "x",
    onClick: e => {
      e.stopPropagation();
      onRemove();
    },
    style: {
      width: 13,
      height: 13,
      color: "var(--text-subtle)",
      cursor: "pointer",
      marginLeft: 1
    }
  }));
}
Object.assign(__ds_scope, { SymptomChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/clinical/SymptomChip.jsx", error: String((e && e.message) || e) }); }

// components/data/MiniBarChart.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * MiniBarChart — compact horizontal bar list for ranked frequencies
 * (e.g. symptom frequency). Tabular value labels, muted clinical fills.
 * Integrated size, never oversized.
 */
function MiniBarChart({
  data = [],
  max,
  unit = "",
  barColor = "var(--viz-teal)",
  style,
  ...rest
}) {
  const top = max || Math.max(1, ...data.map(d => d.value));
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 9,
      ...style
    }
  }, rest), data.map(d => {
    const pct = Math.round(d.value / top * 100);
    const fill = d.color || barColor;
    return /*#__PURE__*/React.createElement("div", {
      key: d.label,
      style: {
        display: "grid",
        gridTemplateColumns: "92px 1fr 38px",
        alignItems: "center",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "var(--text-xs)",
        color: "var(--text-body)",
        textTransform: "capitalize",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    }, d.label), /*#__PURE__*/React.createElement("span", {
      style: {
        position: "relative",
        height: 8,
        background: "var(--surface-sunken)",
        borderRadius: "var(--radius-pill)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        inset: 0,
        width: pct + "%",
        background: fill,
        borderRadius: "var(--radius-pill)",
        transition: "width var(--duration-slow) var(--ease-out)"
      }
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "var(--text-xs)",
        color: "var(--text-muted)",
        textAlign: "right",
        fontVariantNumeric: "tabular-nums"
      }
    }, d.value, unit));
  }));
}
Object.assign(__ds_scope, { MiniBarChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/MiniBarChart.jsx", error: String((e && e.message) || e) }); }

// components/data/Sparkline.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Sparkline — a small inline trend line for wearable metrics (weight, sleep,
 * resting HR, steps). SVG, optional soft area fill and end-point marker.
 * Calm clinical line; no axes clutter.
 */
function Sparkline({
  values = [],
  width = 220,
  height = 56,
  color = "var(--viz-teal)",
  fill = true,
  showEnd = true,
  strokeWidth = 1.75,
  style,
  ...rest
}) {
  if (!values.length) return /*#__PURE__*/React.createElement("svg", {
    width: width,
    height: height,
    style: style
  });
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const pad = 4;
  const w = width - pad * 2;
  const h = height - pad * 2;
  const pts = values.map((v, i) => {
    const x = pad + i / (values.length - 1) * w;
    const y = pad + h - (v - min) / span * h;
    return [x, y];
  });
  const line = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
  const area = line + ` L ${pad + w} ${pad + h} L ${pad} ${pad + h} Z`;
  const end = pts[pts.length - 1];
  const gid = "sg" + Math.random().toString(36).slice(2, 8);
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: width,
    height: height,
    viewBox: `0 0 ${width} ${height}`,
    style: style
  }, rest), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: gid,
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: color,
    stopOpacity: "0.16"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: color,
    stopOpacity: "0"
  }))), fill && /*#__PURE__*/React.createElement("path", {
    d: area,
    fill: `url(#${gid})`
  }), /*#__PURE__*/React.createElement("path", {
    d: line,
    fill: "none",
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), showEnd && /*#__PURE__*/React.createElement("circle", {
    cx: end[0],
    cy: end[1],
    r: "2.6",
    fill: color,
    stroke: "var(--surface)",
    strokeWidth: "1.5"
  }));
}
Object.assign(__ds_scope, { Sparkline });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Sparkline.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Input — single-line text field. Hairline border, sunken focus ring, optional
 * leading Lucide icon and trailing affix. Sentence-case labels.
 */
function Input({
  label,
  hint,
  icon,
  affix,
  error,
  size = "md",
  id,
  value,
  onChange,
  placeholder,
  type = "text",
  disabled,
  style,
  ...rest
}) {
  const heights = {
    sm: "var(--control-h-sm)",
    md: "var(--control-h-md)",
    lg: "var(--control-h-lg)"
  };
  const fid = id || (label ? "in-" + label.replace(/\s+/g, "-").toLowerCase() : undefined);
  const [focus, setFocus] = React.useState(false);
  const borderColor = error ? "var(--danger)" : focus ? "var(--accent)" : "var(--border-strong)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 5,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: fid,
    style: {
      fontSize: "var(--text-sm)",
      fontWeight: 600,
      color: "var(--text-strong)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      height: heights[size],
      padding: "0 10px",
      background: disabled ? "var(--surface-sunken)" : "var(--surface)",
      border: `1px solid ${borderColor}`,
      borderRadius: "var(--radius-md)",
      boxShadow: focus ? "var(--ring-focus)" : "none",
      transition: "border-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard)"
    }
  }, icon && /*#__PURE__*/React.createElement("i", {
    "data-lucide": icon,
    style: {
      width: 16,
      height: 16,
      color: "var(--text-subtle)",
      flex: "none"
    }
  }), /*#__PURE__*/React.createElement("input", _extends({
    id: fid,
    type: type,
    value: value,
    onChange: onChange,
    placeholder: placeholder,
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
      color: "var(--text-strong)"
    }
  }, rest)), affix && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-sm)",
      color: "var(--text-muted)",
      flex: "none"
    }
  }, affix)), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-xs)",
      color: error ? "var(--danger-text)" : "var(--text-muted)"
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Select — styled wrapper over a native <select>. Hairline border, chevron,
 * focus ring. Used for patient picker, date ranges, metric pickers.
 */
function Select({
  label,
  hint,
  value,
  onChange,
  options = [],
  size = "md",
  id,
  disabled,
  style,
  ...rest
}) {
  const heights = {
    sm: "var(--control-h-sm)",
    md: "var(--control-h-md)",
    lg: "var(--control-h-lg)"
  };
  const fid = id || (label ? "sel-" + label.replace(/\s+/g, "-").toLowerCase() : undefined);
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 5,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: fid,
    style: {
      fontSize: "var(--text-sm)",
      fontWeight: 600,
      color: "var(--text-strong)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: fid,
    value: value,
    onChange: onChange,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      appearance: "none",
      WebkitAppearance: "none",
      width: "100%",
      height: heights[size],
      padding: "0 32px 0 11px",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-base)",
      color: "var(--text-strong)",
      background: disabled ? "var(--surface-sunken)" : "var(--surface)",
      border: `1px solid ${focus ? "var(--accent)" : "var(--border-strong)"}`,
      borderRadius: "var(--radius-md)",
      outline: "none",
      cursor: disabled ? "not-allowed" : "pointer",
      boxShadow: focus ? "var(--ring-focus)" : "none",
      transition: "border-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard)"
    }
  }, rest), options.map(o => {
    const val = typeof o === "string" ? o : o.value;
    const lab = typeof o === "string" ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: val,
      value: val
    }, lab);
  })), /*#__PURE__*/React.createElement("i", {
    "data-lucide": "chevron-down",
    style: {
      position: "absolute",
      right: 10,
      width: 16,
      height: 16,
      color: "var(--text-muted)",
      pointerEvents: "none"
    }
  })), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-xs)",
      color: "var(--text-muted)"
    }
  }, hint));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Textarea — the central journal-note input. Hairline border, focus ring,
 * optional character counter. Comfortable line-height for reading back notes.
 */
function Textarea({
  label,
  hint,
  value,
  onChange,
  placeholder,
  rows = 4,
  maxLength,
  id,
  disabled,
  style,
  ...rest
}) {
  const fid = id || (label ? "ta-" + label.replace(/\s+/g, "-").toLowerCase() : undefined);
  const [focus, setFocus] = React.useState(false);
  const count = typeof value === "string" ? value.length : 0;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 5,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: fid,
    style: {
      fontSize: "var(--text-sm)",
      fontWeight: 600,
      color: "var(--text-strong)"
    }
  }, label), /*#__PURE__*/React.createElement("textarea", _extends({
    id: fid,
    rows: rows,
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    maxLength: maxLength,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: "100%",
      resize: "vertical",
      padding: "10px 12px",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-base)",
      lineHeight: "var(--leading-normal)",
      color: "var(--text-strong)",
      background: disabled ? "var(--surface-sunken)" : "var(--surface)",
      border: `1px solid ${focus ? "var(--accent)" : "var(--border-strong)"}`,
      borderRadius: "var(--radius-md)",
      outline: "none",
      boxShadow: focus ? "var(--ring-focus)" : "none",
      transition: "border-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard)"
    }
  }, rest)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-xs)",
      color: "var(--text-muted)"
    }
  }, hint), maxLength && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-xs)",
      color: "var(--text-subtle)",
      fontVariantNumeric: "tabular-nums"
    }
  }, count, "/", maxLength)));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/forms/Toggle.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Toggle — switch control for binary state (e.g. injection-day on a note).
 * Calm: teal when on, gray track when off, no bounce.
 */
function Toggle({
  checked = false,
  onChange,
  label,
  description,
  disabled,
  id,
  style,
  ...rest
}) {
  const fid = id || (label ? "tg-" + label.replace(/\s+/g, "-").toLowerCase() : undefined);
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: fid,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.55 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("button", _extends({
    id: fid,
    type: "button",
    role: "switch",
    "aria-checked": checked,
    disabled: disabled,
    onClick: () => !disabled && onChange && onChange(!checked),
    style: {
      position: "relative",
      width: 38,
      height: 22,
      flex: "none",
      padding: 0,
      borderRadius: "var(--radius-pill)",
      border: "none",
      cursor: "inherit",
      background: checked ? "var(--accent)" : "var(--gray-300)",
      transition: "background var(--duration-base) var(--ease-standard)"
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 2,
      left: checked ? 18 : 2,
      width: 18,
      height: 18,
      borderRadius: "var(--radius-pill)",
      background: "#fff",
      boxShadow: "var(--shadow-sm)",
      transition: "left var(--duration-base) var(--ease-out)"
    }
  })), (label || description) && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 1
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-sm)",
      fontWeight: 600,
      color: "var(--text-strong)"
    }
  }, label), description && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-xs)",
      color: "var(--text-muted)"
    }
  }, description)));
}
Object.assign(__ds_scope, { Toggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Toggle.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Tabs — underline-style segment navigation for in-page views
 * (e.g. switching dashboard panels). Active tab carries the teal accent.
 */
function Tabs({
  tabs = [],
  value,
  onChange,
  style,
  ...rest
}) {
  const [internal, setInternal] = React.useState(value || tabs[0] && (tabs[0].value || tabs[0]));
  const active = value !== undefined ? value : internal;
  const select = v => {
    setInternal(v);
    onChange && onChange(v);
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "tablist",
    style: {
      display: "flex",
      gap: 2,
      borderBottom: "1px solid var(--border-default)",
      ...style
    }
  }, rest), tabs.map(t => {
    const val = t.value || t;
    const label = t.label || t;
    const isActive = active === val;
    return /*#__PURE__*/React.createElement("button", {
      key: val,
      role: "tab",
      "aria-selected": isActive,
      onClick: () => select(val),
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "8px 12px",
        marginBottom: -1,
        background: "transparent",
        border: "none",
        cursor: "pointer",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-sm)",
        fontWeight: 600,
        color: isActive ? "var(--accent-text)" : "var(--text-muted)",
        borderBottom: `2px solid ${isActive ? "var(--accent)" : "transparent"}`,
        transition: "color var(--duration-fast) var(--ease-standard)"
      }
    }, t.icon && /*#__PURE__*/React.createElement("i", {
      "data-lucide": t.icon,
      style: {
        width: 15,
        height: 15
      }
    }), label, typeof t.count === "number" && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "var(--text-2xs)",
        fontWeight: 600,
        padding: "1px 6px",
        borderRadius: "var(--radius-pill)",
        background: isActive ? "var(--accent-tint)" : "var(--surface-sunken)",
        color: isActive ? "var(--accent-text)" : "var(--text-muted)",
        fontVariantNumeric: "tabular-nums"
      }
    }, t.count));
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/visitprep/Analytics.jsx
try { (() => {
/* Analytics screen — dashboard charts. Integrated, not oversized. */
function TrendChart({
  values,
  color,
  height = 120,
  fmt
}) {
  const w = 100,
    h = 100;
  const min = Math.min(...values),
    max = Math.max(...values),
    span = max - min || 1;
  const pts = values.map((v, i) => [i / (values.length - 1) * w, h - (v - min) / span * h]);
  const line = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(2) + " " + p[1].toFixed(2)).join(" ");
  const area = line + ` L ${w} ${h} L 0 ${h} Z`;
  const gid = "tg" + Math.random().toString(36).slice(2, 7);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${w} ${h}`,
    preserveAspectRatio: "none",
    width: "100%",
    height: height,
    style: {
      display: "block"
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: gid,
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: color,
    stopOpacity: "0.14"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: color,
    stopOpacity: "0"
  }))), [0.25, 0.5, 0.75].map(g => /*#__PURE__*/React.createElement("line", {
    key: g,
    x1: "0",
    x2: w,
    y1: h * g,
    y2: h * g,
    stroke: "var(--viz-grid)",
    strokeWidth: "0.5",
    vectorEffect: "non-scaling-stroke"
  })), /*#__PURE__*/React.createElement("path", {
    d: area,
    fill: `url(#${gid})`
  }), /*#__PURE__*/React.createElement("path", {
    d: line,
    fill: "none",
    stroke: color,
    strokeWidth: "1.75",
    vectorEffect: "non-scaling-stroke",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })));
}
function Columns({
  values,
  color,
  height = 110,
  unit
}) {
  const max = Math.max(...values);
  const slice = values.slice(-14);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: 3,
      height
    }
  }, slice.map((v, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    title: v + (unit || ""),
    style: {
      flex: 1,
      height: Math.max(3, v / max * 100) + "%",
      background: color,
      borderRadius: "2px 2px 0 0",
      opacity: i === slice.length - 1 ? 1 : 0.78
    }
  })));
}
function TimelineGrid({
  p
}) {
  const sevColor = ["var(--surface-sunken)", "var(--teal-300)", "var(--amber-400, #e6b24f)", "var(--red-400, #e59389)"];
  const sevLabel = ["none", "mild", "moderate", "severe"];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(15, 1fr)",
      gap: 5
    }
  }, p.timeline.map((sev, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    title: `Day ${i + 1}: ${sevLabel[sev]}${p.injectionMarks[i] ? " · injection" : ""}`,
    style: {
      position: "relative",
      aspectRatio: "1",
      borderRadius: "var(--radius-xs)",
      background: sevColor[sev],
      border: "1px solid rgba(21,26,29,.04)"
    }
  }, p.injectionMarks[i] === 1 && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 2,
      right: 2,
      width: 4,
      height: 4,
      borderRadius: "50%",
      background: "var(--accent)"
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 16,
      marginTop: 12,
      fontSize: "var(--text-2xs)",
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 2,
      background: sevColor[1]
    }
  }), " mild"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 2,
      background: sevColor[2]
    }
  }), " moderate"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 2,
      background: sevColor[3]
    }
  }), " severe"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      marginLeft: "auto"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 5,
      height: 5,
      borderRadius: "50%",
      background: "var(--accent)"
    }
  }), " injection day")));
}
function Analytics({
  p
}) {
  const {
    Card,
    MiniBarChart
  } = window.VisitPrepDesignSystem_2c5c4e;
  React.useEffect(() => {
    window.lucide && lucide.createIcons();
  });
  const w = p.wearables;
  const sleepAvg = (w.sleep.reduce((a, b) => a + b, 0) / w.sleep.length).toFixed(1);
  const rhrAvg = Math.round(w.rhr.reduce((a, b) => a + b, 0) / w.rhr.length);
  const stepsAvg = Math.round(w.steps.reduce((a, b) => a + b, 0) / w.steps.length / 100) * 100;
  const metric = (label, value, unit) => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-2xs)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-eyebrow)",
      color: "var(--text-muted)",
      fontWeight: 600
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      fontWeight: 700,
      color: "var(--text-strong)",
      fontVariantNumeric: "tabular-nums"
    }
  }, value, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 500,
      color: "var(--text-muted)",
      marginLeft: 3
    }
  }, unit)));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, {
    eyebrow: "Patient-reported",
    title: "Symptom frequency"
  }, /*#__PURE__*/React.createElement(MiniBarChart, {
    unit: " d",
    data: p.symptomFreq
  })), /*#__PURE__*/React.createElement(Card, {
    eyebrow: "Wearable-style metric",
    title: "Weight trend",
    action: /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: "var(--text-xs)",
        color: "var(--text-muted)"
      }
    }, p.weightStart, " \u2192 ", p.weightEnd, " lb")
  }, /*#__PURE__*/React.createElement(TrendChart, {
    values: w.weight,
    color: "var(--viz-teal)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: 6,
      fontSize: "var(--text-2xs)",
      color: "var(--text-subtle)"
    }
  }, /*#__PURE__*/React.createElement("span", null, "May 14"), /*#__PURE__*/React.createElement("span", null, "Jun 12")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, {
    eyebrow: "Wearable-style metric",
    title: "Sleep & resting heart rate"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 24,
      marginBottom: 10
    }
  }, metric("Sleep avg", sleepAvg, "h"), metric("Resting HR", rhrAvg, "bpm")), /*#__PURE__*/React.createElement(TrendChart, {
    values: w.sleep,
    color: "var(--viz-slate)",
    height: 70
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: "var(--border-subtle)",
      margin: "10px 0"
    }
  }), /*#__PURE__*/React.createElement(TrendChart, {
    values: w.rhr,
    color: "var(--viz-clay)",
    height: 70
  })), /*#__PURE__*/React.createElement(Card, {
    eyebrow: "Wearable-style metric",
    title: "Steps & active minutes",
    action: /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: "var(--text-xs)",
        color: "var(--text-muted)"
      }
    }, "last 14 days")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 24,
      marginBottom: 10
    }
  }, metric("Steps avg", stepsAvg.toLocaleString(), "/ day"), metric("Active", Math.round(w.activeMin.reduce((a, b) => a + b, 0) / w.activeMin.length), "min")), /*#__PURE__*/React.createElement(Columns, {
    values: w.steps,
    color: "var(--viz-teal)",
    height: 84,
    unit: " steps"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 10
    }
  }), /*#__PURE__*/React.createElement(Columns, {
    values: w.activeMin,
    color: "var(--viz-sand)",
    height: 48,
    unit: " min"
  }))), /*#__PURE__*/React.createElement(Card, {
    eyebrow: "30-day snapshot",
    title: "Symptom severity timeline"
  }, /*#__PURE__*/React.createElement(TimelineGrid, {
    p: p
  })));
}
window.Analytics = Analytics;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/visitprep/Analytics.jsx", error: String((e && e.message) || e) }); }

// ui_kits/visitprep/App.jsx
try { (() => {
/* App shell — composes sidebar, topbar, active screen, and right rail. */
function App() {
  const data = window.VP_DATA;
  const [nav, setNav] = React.useState("overview");
  const [pid, setPid] = React.useState(data.patients[0].id);
  const p = data.patients.find(x => x.id === pid);
  React.useEffect(() => {
    window.lucide && lucide.createIcons();
  });
  const titles = {
    overview: "Overview",
    patients: "Patients",
    journal: "Journal",
    evidence: "Evidence",
    analytics: "Analytics",
    report: "Doctor Report"
  };
  const showRail = nav === "overview" || nav === "analytics";
  let screen = null;
  if (nav === "overview") screen = /*#__PURE__*/React.createElement(window.Overview, {
    p: p
  });else if (nav === "patients") screen = /*#__PURE__*/React.createElement(window.Patients, {
    patients: data.patients,
    activeId: pid,
    onSelect: id => {
      setPid(id);
      setNav("overview");
    }
  });else if (nav === "journal") screen = /*#__PURE__*/React.createElement(window.Journal, {
    p: p
  });else if (nav === "evidence") screen = /*#__PURE__*/React.createElement(window.Evidence, {
    p: p
  });else if (nav === "analytics") screen = /*#__PURE__*/React.createElement(window.Analytics, {
    p: p
  });else if (nav === "report") screen = /*#__PURE__*/React.createElement(window.Report, {
    p: p
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      height: "100vh",
      overflow: "hidden",
      background: "var(--canvas)"
    }
  }, /*#__PURE__*/React.createElement(window.Sidebar, {
    active: nav,
    onNavigate: setNav
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(window.Topbar, {
    patients: data.patients,
    activeId: pid,
    onSelectPatient: setPid,
    onExport: () => setNav("report")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: showRail ? 1280 : "var(--content-max)",
      margin: "0 auto",
      padding: "20px 24px 40px",
      display: "flex",
      gap: 18,
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--text-h2)",
      fontWeight: 700,
      color: "var(--text-strong)"
    }
  }, titles[nav]), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      fontSize: "var(--text-xs)",
      color: "var(--text-subtle)"
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "shield-check",
    style: {
      width: 14,
      height: 14
    }
  }), /*#__PURE__*/React.createElement("span", null, "No diagnosis or treatment advice"))), screen), showRail && /*#__PURE__*/React.createElement("div", {
    className: "vp-rail"
  }, /*#__PURE__*/React.createElement(window.RightRail, {
    p: p
  }))))));
}
window.VPApp = App;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/visitprep/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/visitprep/Extra.jsx
try { (() => {
/* Secondary screens: Patients list, Journal (full timeline), Evidence index. */
function Patients({
  patients,
  activeId,
  onSelect
}) {
  const {
    Card,
    Badge
  } = window.VisitPrepDesignSystem_2c5c4e;
  React.useEffect(() => {
    window.lucide && lucide.createIcons();
  });
  return /*#__PURE__*/React.createElement(Card, {
    eyebrow: "Synthetic cohort",
    title: "Patients"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column"
    }
  }, patients.map((p, i) => /*#__PURE__*/React.createElement("button", {
    key: p.id,
    onClick: () => onSelect(p.id),
    onMouseEnter: e => e.currentTarget.style.background = "var(--surface-sunken)",
    onMouseLeave: e => e.currentTarget.style.background = "transparent",
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "14px 8px",
      border: "none",
      borderTop: i ? "1px solid var(--border-subtle)" : "none",
      background: "transparent",
      cursor: "pointer",
      textAlign: "left",
      borderRadius: "var(--radius-sm)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 40,
      height: 40,
      borderRadius: "var(--radius-md)",
      background: "var(--accent-tint)",
      color: "var(--accent-text)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 700,
      flex: "none"
    }
  }, p.initials), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-body-lg)",
      fontWeight: 600,
      color: "var(--text-strong)"
    }
  }, p.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-2xs)",
      color: "var(--text-muted)"
    }
  }, p.id)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-sm)",
      color: "var(--text-muted)"
    }
  }, p.med, " \xB7 ", p.dose)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: "auto",
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral"
  }, p.moderateDays, " moderate+ days"), p.id === activeId ? /*#__PURE__*/React.createElement(Badge, {
    tone: "accent",
    icon: "check"
  }, "Active") : /*#__PURE__*/React.createElement("i", {
    "data-lucide": "chevron-right",
    style: {
      width: 18,
      height: 18,
      color: "var(--text-subtle)"
    }
  }))))));
}
window.Patients = Patients;
function Journal({
  p
}) {
  const {
    Card,
    Button,
    Badge
  } = window.VisitPrepDesignSystem_2c5c4e;
  const {
    NoteRow
  } = window;
  React.useEffect(() => {
    window.lucide && lucide.createIcons();
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, {
    eyebrow: "Patient-reported notes",
    title: "Journal timeline",
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "sm",
      icon: "plus"
    }, "Add note")
  }, /*#__PURE__*/React.createElement("div", null, p.notes.map((n, i) => /*#__PURE__*/React.createElement(NoteRow, {
    key: n.date,
    note: n,
    last: i === p.notes.length - 1
  })))));
}
window.Journal = Journal;
function Evidence({
  p
}) {
  const {
    Card,
    EvidenceCard,
    Badge
  } = window.VisitPrepDesignSystem_2c5c4e;
  React.useEffect(() => {
    window.lucide && lucide.createIcons();
  });
  const items = [];
  p.notes.forEach(n => n.symptoms.forEach(s => items.push({
    ...s,
    date: n.date,
    snippet: n.text
  })));
  return /*#__PURE__*/React.createElement(Card, {
    eyebrow: "Selected source evidence",
    title: "Signal \u2192 source index",
    action: /*#__PURE__*/React.createElement(Badge, {
      tone: "neutral",
      icon: "cpu"
    }, "Local deterministic extraction")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 12
    }
  }, items.slice(0, 8).map((it, i) => /*#__PURE__*/React.createElement(EvidenceCard, {
    key: i,
    signal: it.label,
    level: it.level,
    date: it.date,
    snippet: it.snippet,
    match: it.match,
    injectionAdjacent: it.inj
  }))));
}
window.Evidence = Evidence;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/visitprep/Extra.jsx", error: String((e && e.message) || e) }); }

// ui_kits/visitprep/Overview.jsx
try { (() => {
/* Overview screen — patient summary, KPIs, journal input, extracted signals,
   recent notes. The default, narratable demo screen. */
function Overview({
  p
}) {
  const {
    Card,
    KpiCard,
    Button,
    Textarea,
    Toggle,
    SymptomChip,
    EvidenceCard,
    Badge
  } = window.VisitPrepDesignSystem_2c5c4e;
  const {
    PatientHeader,
    SectionLabel,
    NoteRow,
    vpExtract
  } = window;
  const [draft, setDraft] = React.useState("Felt nauseous after the injection and very tired by the afternoon. Couldn't sleep well.");
  const [isInjection, setIsInjection] = React.useState(true);
  const [extracted, setExtracted] = React.useState(null);
  const [selected, setSelected] = React.useState(null);
  const [busy, setBusy] = React.useState(false);
  React.useEffect(() => {
    window.lucide && lucide.createIcons();
  });
  const wDelta = (p.weightEnd - p.weightStart).toFixed(1);
  function runExtract() {
    setBusy(true);
    setExtracted(null);
    setTimeout(() => {
      const sig = vpExtract(draft, isInjection);
      setExtracted(sig);
      setSelected(sig[0] ? sig[0].label : null);
      setBusy(false);
    }, 420);
  }
  const selSig = extracted && extracted.find(s => s.label === selected);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(PatientHeader, {
    p: p
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(5, 1fr)",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(KpiCard, {
    label: "Review window",
    value: p.reviewDays,
    unit: "days",
    icon: "calendar-range",
    hint: p.reviewWindow.split(",")[0]
  }), /*#__PURE__*/React.createElement(KpiCard, {
    label: "Injection days",
    value: p.injectionDays,
    icon: "syringe",
    hint: "this window"
  }), /*#__PURE__*/React.createElement(KpiCard, {
    label: "Top symptom",
    value: /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 18,
        textTransform: "capitalize"
      }
    }, p.topSymptoms[0]),
    icon: "activity",
    hint: p.symptomFreq[0].value + " of 30 days"
  }), /*#__PURE__*/React.createElement(KpiCard, {
    label: "Weight change",
    value: wDelta,
    unit: "lb",
    icon: "weight",
    delta: ((p.weightEnd - p.weightStart) / p.weightStart * 100).toFixed(1) + "%",
    hint: "30 days"
  }), /*#__PURE__*/React.createElement(KpiCard, {
    label: "Moderate+ days",
    value: p.moderateDays,
    unit: "/ 30",
    icon: "alert-triangle",
    deltaTone: "caution"
  })), /*#__PURE__*/React.createElement(Card, {
    eyebrow: "Patient-reported notes",
    title: "Add a journal note",
    action: /*#__PURE__*/React.createElement(Badge, {
      tone: "neutral",
      icon: "cpu"
    }, "Local deterministic extraction")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 300px",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7,
      fontSize: "var(--text-sm)",
      color: "var(--text-body)"
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "calendar",
    style: {
      width: 15,
      height: 15,
      color: "var(--text-muted)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)"
    }
  }, "2026-06-13"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-subtle)"
    }
  }, "\xB7 Sat")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: "auto"
    }
  }, /*#__PURE__*/React.createElement(Toggle, {
    label: "Injection day",
    checked: isInjection,
    onChange: setIsInjection
  }))), /*#__PURE__*/React.createElement(Textarea, {
    rows: 4,
    value: draft,
    onChange: e => setDraft(e.target.value),
    placeholder: "How did you feel today? Note symptoms, appetite, sleep, injection context\u2026",
    hint: "Notes are the source. Signals are extracted locally and traced back to your words."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    icon: busy ? "loader" : "sparkles",
    onClick: runExtract,
    disabled: busy || !draft.trim()
  }, busy ? "Extracting…" : "Extract signals"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    icon: "plus"
  }, "Save note"))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderLeft: "1px solid var(--border-subtle)",
      paddingLeft: 18,
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    icon: "activity"
  }, "Extracted symptom signals"), !extracted && !busy && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-sm)",
      color: "var(--text-subtle)",
      lineHeight: 1.5
    }
  }, "Signals appear here after extraction \u2014 each one traceable to a phrase in the note."), busy && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-sm)",
      color: "var(--text-muted)"
    }
  }, "Scanning note\u2026"), extracted && extracted.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap"
    }
  }, extracted.map((s, i) => /*#__PURE__*/React.createElement(SymptomChip, {
    key: i,
    label: s.label,
    level: s.level,
    injectionAdjacent: s.inj,
    selected: selected === s.label,
    onClick: () => setSelected(s.label)
  }))), selSig && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(EvidenceCard, {
    signal: selSig.label,
    level: selSig.level,
    date: "2026-06-13",
    snippet: draft,
    match: selSig.match,
    injectionAdjacent: selSig.inj
  }))), extracted && extracted.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-sm)",
      color: "var(--text-muted)"
    }
  }, "No known symptom terms matched in this note.")))), /*#__PURE__*/React.createElement(Card, {
    eyebrow: "Timeline",
    title: "Recent journal notes",
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm",
      iconRight: "arrow-right"
    }, "View all")
  }, /*#__PURE__*/React.createElement("div", null, p.notes.map((n, i) => /*#__PURE__*/React.createElement(NoteRow, {
    key: n.date,
    note: n,
    last: i === p.notes.length - 1
  })))));
}
window.Overview = Overview;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/visitprep/Overview.jsx", error: String((e && e.message) || e) }); }

// ui_kits/visitprep/Pieces.jsx
try { (() => {
/* Shared pieces: PatientHeader, SectionLabel, NoteRow, and the local
   deterministic symptom extractor used by the journal input. */

function SectionLabel({
  children,
  icon
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7,
      marginBottom: 10
    }
  }, icon && /*#__PURE__*/React.createElement("i", {
    "data-lucide": icon,
    style: {
      width: 15,
      height: 15,
      color: "var(--text-muted)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-2xs)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-eyebrow)",
      color: "var(--text-muted)",
      fontWeight: 600
    }
  }, children));
}
window.SectionLabel = SectionLabel;
function PatientHeader({
  p
}) {
  const {
    Badge
  } = window.VisitPrepDesignSystem_2c5c4e;
  const wDelta = (p.weightEnd - p.weightStart).toFixed(1);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 16,
      padding: "18px 20px",
      background: "var(--surface)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-xs)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 52,
      height: 52,
      borderRadius: "var(--radius-lg)",
      flex: "none",
      background: "var(--accent-tint)",
      color: "var(--accent-text)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 19,
      fontWeight: 700
    }
  }, p.initials), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "var(--text-h1)",
      fontWeight: 700,
      color: "var(--text-strong)"
    }
  }, p.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-xs)",
      color: "var(--text-muted)",
      background: "var(--surface-sunken)",
      padding: "2px 7px",
      borderRadius: "var(--radius-sm)"
    }
  }, p.id)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4,
      fontSize: "var(--text-sm)",
      color: "var(--text-muted)"
    }
  }, p.age, " \xB7 ", p.sex, " \xB7 ", p.med, " \xB7 ", p.dose)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: "auto",
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "accent",
    icon: "syringe"
  }, p.injectionDays, " injection days"), p.doseChanges > 0 ? /*#__PURE__*/React.createElement(Badge, {
    tone: "caution",
    icon: "arrow-up-right"
  }, p.doseChangeNote) : /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral"
  }, "No dose change")));
}
window.PatientHeader = PatientHeader;
function NoteRow({
  note,
  last
}) {
  const {
    SymptomChip,
    Badge
  } = window.VisitPrepDesignSystem_2c5c4e;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      padding: "14px 0",
      borderBottom: last ? "none" : "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 52,
      flex: "none",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-2xs)",
      color: "var(--text-muted)",
      textTransform: "uppercase",
      letterSpacing: "0.04em"
    }
  }, note.day), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-sm)",
      fontWeight: 600,
      color: "var(--text-strong)"
    }
  }, note.date.slice(5))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 6
    }
  }, note.injection && /*#__PURE__*/React.createElement(Badge, {
    tone: "accent",
    icon: "syringe"
  }, "Injection day"), note.symptoms.some(s => s.level === "severe") && /*#__PURE__*/React.createElement(Badge, {
    tone: "danger"
  }, "Severe reported")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-sm)",
      color: "var(--text-body)",
      lineHeight: "var(--leading-snug)",
      marginBottom: 9
    }
  }, note.text), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap"
    }
  }, note.symptoms.map((s, i) => /*#__PURE__*/React.createElement(SymptomChip, {
    key: i,
    label: s.label,
    level: s.level,
    injectionAdjacent: s.inj
  })))));
}
window.NoteRow = NoteRow;

/* Local deterministic extractor — keyword/phrase match, no model inference. */
const VP_LEXICON = [{
  label: "nausea",
  level: "moderate",
  terms: ["nauseous", "nausea", "queasy"]
}, {
  label: "vomiting",
  level: "severe",
  terms: ["threw up", "vomit", "vomited", "throwing up"]
}, {
  label: "fatigue",
  level: "mild",
  terms: ["tired", "fatigue", "exhausted", "no energy"]
}, {
  label: "low appetite",
  level: "moderate",
  terms: ["no appetite", "ate very little", "appetite low", "low appetite", "not hungry"]
}, {
  label: "constipation",
  level: "moderate",
  terms: ["constipation", "constipated"]
}, {
  label: "diarrhea",
  level: "moderate",
  terms: ["diarrhea", "loose stool"]
}, {
  label: "bloating",
  level: "mild",
  terms: ["bloating", "bloated"]
}, {
  label: "dizziness",
  level: "mild",
  terms: ["dizzy", "dizziness", "lightheaded"]
}, {
  label: "poor sleep",
  level: "mild",
  terms: ["slept poorly", "poor sleep", "couldn't sleep", "trouble sleeping"]
}];
function vpExtract(text, isInjection) {
  const low = (text || "").toLowerCase();
  const found = [];
  for (const entry of VP_LEXICON) {
    for (const term of entry.terms) {
      const i = low.indexOf(term);
      if (i >= 0) {
        found.push({
          label: entry.label,
          level: entry.level,
          match: text.slice(i, i + term.length),
          inj: isInjection
        });
        break;
      }
    }
  }
  return found;
}
window.vpExtract = vpExtract;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/visitprep/Pieces.jsx", error: String((e && e.message) || e) }); }

// ui_kits/visitprep/Report.jsx
try { (() => {
/* Doctor Report screen — the doctor-ready visit summary. */
function Report({
  p
}) {
  const {
    Card,
    Badge,
    EvidenceCard,
    SafetyNote,
    Button
  } = window.VisitPrepDesignSystem_2c5c4e;
  const {
    SectionLabel
  } = window;
  React.useEffect(() => {
    window.lucide && lucide.createIcons();
  });
  const wDelta = (p.weightEnd - p.weightStart).toFixed(1);
  const prompts = ["Nausea clustered within 48 h of injection on " + p.symptomFreq[0].value + " of 30 days — is the titration pace appropriate?", "Low appetite persisted across the window; review nutrition and hydration.", p.doseChanges > 0 ? "Symptom intensity rose after the 0.5 → 1.0 mg increase on May 28." : "Symptoms stable; no dose change this window.", "Resting heart rate trended down " + (p.wearables.rhr[0] - p.wearables.rhr[p.wearables.rhr.length - 1]) + " bpm — confirm expected."];
  const highlights = [{
    icon: "weight",
    label: "Weight",
    value: wDelta + " lb",
    note: p.weightStart + " → " + p.weightEnd + " lb over 30 days"
  }, {
    icon: "moon",
    label: "Sleep",
    value: "≈ " + (p.wearables.sleep.reduce((a, b) => a + b, 0) / p.wearables.sleep.length).toFixed(1) + " h",
    note: "avg nightly, slightly improving"
  }, {
    icon: "heart-pulse",
    label: "Resting HR",
    value: p.wearables.rhr[p.wearables.rhr.length - 1] + " bpm",
    note: "down from " + p.wearables.rhr[0] + " bpm"
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "18px 20px",
      background: "var(--surface)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-lg)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 44,
      borderRadius: "var(--radius-md)",
      background: "var(--accent-tint)",
      color: "var(--accent-text)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "file-text",
    style: {
      width: 22,
      height: 22
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "var(--text-h2)",
      fontWeight: 700,
      color: "var(--text-strong)"
    }
  }, "Doctor-ready visit summary"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-sm)",
      color: "var(--text-muted)",
      marginTop: 2
    }
  }, p.name, " \xB7 ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)"
    }
  }, p.id), " \xB7 ", p.reviewWindow)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: "auto",
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "md",
    icon: "printer"
  }, "Print"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "md",
    icon: "file-down"
  }, "Export PDF"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, {
    eyebrow: "30-day snapshot",
    title: "At a glance"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 12
    }
  }, [["Top symptom", p.topSymptoms[0], p.symptomFreq[0].value + " of 30 days"], ["Injection days", p.injectionDays, "in window"], ["Weight change", wDelta + " lb", "30 days"], ["Moderate+ days", p.moderateDays + " / 30", "patient-reported"]].map((row, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: "10px 12px",
      background: "var(--surface-sunken)",
      borderRadius: "var(--radius-md)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-2xs)",
      textTransform: "uppercase",
      letterSpacing: "0.04em",
      color: "var(--text-muted)",
      fontWeight: 600
    }
  }, row[0]), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 700,
      color: "var(--text-strong)",
      textTransform: "capitalize",
      marginTop: 2,
      fontVariantNumeric: "tabular-nums"
    }
  }, row[1]), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-2xs)",
      color: "var(--text-subtle)"
    }
  }, row[2]))))), /*#__PURE__*/React.createElement(Card, {
    eyebrow: "Medication context",
    title: "GLP-1 treatment"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: "var(--text-sm)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-muted)"
    }
  }, "Medication"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-strong)",
      fontWeight: 600
    }
  }, p.med)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: "var(--text-sm)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-muted)"
    }
  }, "Current dose"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-strong)",
      fontWeight: 600
    }
  }, p.dose)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: "var(--text-sm)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-muted)"
    }
  }, "Dose changes"), p.doseChanges > 0 ? /*#__PURE__*/React.createElement(Badge, {
    tone: "caution",
    icon: "arrow-up-right"
  }, p.doseChangeNote) : /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral"
  }, "None this window")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: "var(--border-subtle)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-xs)",
      color: "var(--text-muted)",
      lineHeight: 1.5
    }
  }, "Symptom signals marked ", /*#__PURE__*/React.createElement(Badge, {
    tone: "accent",
    icon: "syringe"
  }, "injection-adjacent"), " occurred within 48 h of a recorded injection.")))), /*#__PURE__*/React.createElement(Card, {
    eyebrow: "Wearable trend highlights",
    title: "Telemetry summary"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 12
    }
  }, highlights.map((h, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      gap: 11,
      padding: "12px 14px",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-md)"
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": h.icon,
    style: {
      width: 18,
      height: 18,
      color: "var(--accent)",
      flex: "none",
      marginTop: 2
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-2xs)",
      textTransform: "uppercase",
      letterSpacing: "0.04em",
      color: "var(--text-muted)",
      fontWeight: 600
    }
  }, h.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 700,
      color: "var(--text-strong)",
      fontVariantNumeric: "tabular-nums"
    }
  }, h.value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-2xs)",
      color: "var(--text-subtle)"
    }
  }, h.note)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, {
    eyebrow: "For discussion",
    title: "Key discussion prompts"
  }, /*#__PURE__*/React.createElement("ol", {
    style: {
      margin: 0,
      padding: 0,
      listStyle: "none",
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, prompts.map((t, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      display: "flex",
      gap: 10,
      fontSize: "var(--text-sm)",
      color: "var(--text-body)",
      lineHeight: 1.45
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      flex: "none",
      borderRadius: "var(--radius-sm)",
      background: "var(--accent-tint)",
      color: "var(--accent-text)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 11,
      fontWeight: 700
    }
  }, i + 1), t)))), /*#__PURE__*/React.createElement(Card, {
    eyebrow: "Selected source evidence",
    title: "Traceable to notes"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(EvidenceCard, {
    signal: "nausea",
    level: "severe",
    date: "2026-06-03",
    snippet: "Injection day. Strong nausea in the evening, threw up once. Very tired afterward.",
    match: "Strong nausea",
    injectionAdjacent: true
  }), /*#__PURE__*/React.createElement(EvidenceCard, {
    signal: "low appetite",
    level: "moderate",
    date: "2026-06-05",
    snippet: "Constipation continues. No appetite for dinner. Felt a little dizzy standing up.",
    match: "No appetite"
  })))), /*#__PURE__*/React.createElement(SafetyNote, null));
}
window.Report = Report;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/visitprep/Report.jsx", error: String((e && e.message) || e) }); }

// ui_kits/visitprep/RightRail.jsx
try { (() => {
/* RightRail — desktop-only context rail: readiness, prompts, safety, evidence. */
function RightRail({
  p
}) {
  const {
    Badge,
    SafetyNote
  } = window.VisitPrepDesignSystem_2c5c4e;
  React.useEffect(() => {
    window.lucide && lucide.createIcons();
  });
  const checks = [{
    label: "Review window set",
    done: true
  }, {
    label: "Journal notes recorded",
    done: true,
    meta: p.notes.length + " notes"
  }, {
    label: "Signals extracted",
    done: true
  }, {
    label: "Wearable metrics synced",
    done: true
  }, {
    label: "Clinician review",
    done: false,
    meta: "pending"
  }];
  const done = checks.filter(c => c.done).length;
  const pct = Math.round(done / checks.length * 100);
  const Panel = ({
    eyebrow,
    icon,
    children
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-lg)",
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": icon,
    style: {
      width: 15,
      height: 15,
      color: "var(--text-muted)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-2xs)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-eyebrow)",
      color: "var(--text-muted)",
      fontWeight: 600
    }
  }, eyebrow)), children);
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: "var(--rail-width)",
      flex: "none",
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Panel, {
    eyebrow: "Report readiness",
    icon: "circle-check"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 8,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 26,
      fontWeight: 700,
      color: "var(--text-strong)",
      fontVariantNumeric: "tabular-nums"
    }
  }, pct, "%"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-xs)",
      color: "var(--text-muted)"
    }
  }, done, " of ", checks.length, " steps")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 6,
      background: "var(--surface-sunken)",
      borderRadius: "var(--radius-pill)",
      overflow: "hidden",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: pct + "%",
      height: "100%",
      background: "var(--accent)",
      borderRadius: "var(--radius-pill)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, checks.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      fontSize: "var(--text-sm)"
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": c.done ? "check-circle-2" : "circle-dashed",
    style: {
      width: 15,
      height: 15,
      color: c.done ? "var(--accent)" : "var(--text-subtle)",
      flex: "none"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: c.done ? "var(--text-body)" : "var(--text-muted)"
    }
  }, c.label), c.meta && /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto",
      fontSize: "var(--text-2xs)",
      color: "var(--text-subtle)"
    }
  }, c.meta))))), /*#__PURE__*/React.createElement(Panel, {
    eyebrow: "Key discussion prompts",
    icon: "messages-square"
  }, /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      padding: 0,
      listStyle: "none",
      display: "flex",
      flexDirection: "column",
      gap: 9
    }
  }, ["Nausea clustered within 48 h of injection.", "Low appetite persisted across the window.", p.doseChanges > 0 ? "Symptoms rose after the dose increase." : "Symptoms stable; no dose change."].map((t, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      display: "flex",
      gap: 8,
      fontSize: "var(--text-sm)",
      color: "var(--text-body)",
      lineHeight: 1.4
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "dot",
    style: {
      width: 16,
      height: 16,
      color: "var(--accent)",
      flex: "none"
    }
  }), t)))), /*#__PURE__*/React.createElement(Panel, {
    eyebrow: "Source evidence summary",
    icon: "search-check"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, p.symptomFreq.slice(0, 4).map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      fontSize: "var(--text-sm)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      textTransform: "capitalize",
      color: "var(--text-body)",
      fontWeight: 500
    }
  }, s.label), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-xs)",
      color: "var(--text-muted)"
    }
  }, s.value, " note", s.value > 1 ? "s" : ""))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4,
      paddingTop: 10,
      borderTop: "1px solid var(--border-subtle)",
      fontSize: "var(--text-2xs)",
      color: "var(--text-subtle)"
    }
  }, "Every signal links to a verbatim note. Local deterministic extraction."))), /*#__PURE__*/React.createElement(SafetyNote, {
    title: "Safety boundary"
  }, "No diagnosis or treatment advice. This summary organizes synthetic, patient-reported notes for clinician discussion."));
}
window.RightRail = RightRail;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/visitprep/RightRail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/visitprep/Sidebar.jsx
try { (() => {
/* Sidebar — persistent left navigation. */
function Sidebar({
  active,
  onNavigate
}) {
  const items = [{
    id: "overview",
    label: "Overview",
    icon: "layout-dashboard"
  }, {
    id: "patients",
    label: "Patients",
    icon: "users"
  }, {
    id: "journal",
    label: "Journal",
    icon: "notebook-pen"
  }, {
    id: "evidence",
    label: "Evidence",
    icon: "search-check"
  }, {
    id: "analytics",
    label: "Analytics",
    icon: "line-chart"
  }, {
    id: "report",
    label: "Doctor Report",
    icon: "file-text"
  }];
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: "var(--sidebar-width)",
      flex: "none",
      background: "var(--surface)",
      borderRight: "1px solid var(--border-default)",
      display: "flex",
      flexDirection: "column",
      height: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      height: "var(--topbar-height)",
      padding: "0 16px",
      borderBottom: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/logo.svg",
    alt: "VisitPrep Health Journal",
    height: "26"
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      padding: "12px 10px",
      display: "flex",
      flexDirection: "column",
      gap: 2,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-2xs)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-eyebrow)",
      color: "var(--text-subtle)",
      fontWeight: 600,
      padding: "6px 10px 4px"
    }
  }, "Workspace"), items.map(it => {
    const isActive = active === it.id;
    return /*#__PURE__*/React.createElement("button", {
      key: it.id,
      onClick: () => onNavigate(it.id),
      onMouseEnter: e => {
        if (!isActive) e.currentTarget.style.background = "var(--surface-sunken)";
      },
      onMouseLeave: e => {
        if (!isActive) e.currentTarget.style.background = "transparent";
      },
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        width: "100%",
        padding: "8px 10px",
        border: "none",
        cursor: "pointer",
        textAlign: "left",
        borderRadius: "var(--radius-md)",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-sm)",
        fontWeight: isActive ? 600 : 500,
        color: isActive ? "var(--accent-text)" : "var(--text-body)",
        background: isActive ? "var(--accent-tint)" : "transparent",
        transition: "background var(--duration-fast) var(--ease-standard)"
      }
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": it.icon,
      style: {
        width: 18,
        height: 18,
        color: isActive ? "var(--accent)" : "var(--text-muted)"
      }
    }), it.label);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px",
      borderTop: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 8,
      padding: "9px 10px",
      background: "var(--surface-sunken)",
      borderRadius: "var(--radius-md)"
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "database",
    style: {
      width: 15,
      height: 15,
      color: "var(--text-muted)",
      flex: "none",
      marginTop: 1
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-xs)",
      fontWeight: 600,
      color: "var(--text-strong)"
    }
  }, "Synthetic data only"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-2xs)",
      color: "var(--text-muted)",
      lineHeight: 1.4,
      marginTop: 1
    }
  }, "Local deterministic extraction \xB7 no network calls")))));
}
window.Sidebar = Sidebar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/visitprep/Sidebar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/visitprep/Topbar.jsx
try { (() => {
/* Topbar — patient selector, review window, and global actions. */
function Topbar({
  patients,
  activeId,
  onSelectPatient,
  onExport
}) {
  const {
    Badge
  } = window.VisitPrepDesignSystem_2c5c4e;
  const [open, setOpen] = React.useState(false);
  const active = patients.find(p => p.id === activeId);
  return /*#__PURE__*/React.createElement("header", {
    style: {
      height: "var(--topbar-height)",
      flex: "none",
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "0 20px",
      background: "var(--surface)",
      borderBottom: "1px solid var(--border-default)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(!open),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "5px 10px 5px 6px",
      background: "var(--surface)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-md)",
      cursor: "pointer",
      fontFamily: "var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 30,
      height: 30,
      borderRadius: "var(--radius-md)",
      background: "var(--accent-tint)",
      color: "var(--accent-text)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 12,
      fontWeight: 700,
      flex: "none"
    }
  }, active.initials), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: "var(--text-sm)",
      fontWeight: 600,
      color: "var(--text-strong)",
      lineHeight: 1.2
    }
  }, active.name), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-2xs)",
      color: "var(--text-muted)"
    }
  }, active.id)), /*#__PURE__*/React.createElement("i", {
    "data-lucide": "chevrons-up-down",
    style: {
      width: 15,
      height: 15,
      color: "var(--text-muted)"
    }
  })), open && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "calc(100% + 6px)",
      left: 0,
      width: 280,
      zIndex: 20,
      background: "var(--surface)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-lg)",
      padding: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-2xs)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-eyebrow)",
      color: "var(--text-subtle)",
      fontWeight: 600,
      padding: "6px 8px 4px"
    }
  }, "Synthetic patients"), patients.map(p => /*#__PURE__*/React.createElement("button", {
    key: p.id,
    onClick: () => {
      onSelectPatient(p.id);
      setOpen(false);
    },
    onMouseEnter: e => e.currentTarget.style.background = "var(--surface-sunken)",
    onMouseLeave: e => e.currentTarget.style.background = p.id === activeId ? "var(--accent-tint)" : "transparent",
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      width: "100%",
      padding: "8px",
      border: "none",
      borderRadius: "var(--radius-md)",
      cursor: "pointer",
      textAlign: "left",
      background: p.id === activeId ? "var(--accent-tint)" : "transparent"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: 28,
      borderRadius: "var(--radius-md)",
      background: "var(--surface-sunken)",
      color: "var(--text-body)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 11,
      fontWeight: 700,
      flex: "none"
    }
  }, p.initials), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: "var(--text-sm)",
      fontWeight: 600,
      color: "var(--text-strong)"
    }
  }, p.name), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: "var(--text-2xs)",
      color: "var(--text-muted)"
    }
  }, p.med, " \xB7 ", p.dose)), p.id === activeId && /*#__PURE__*/React.createElement("i", {
    "data-lucide": "check",
    style: {
      width: 16,
      height: 16,
      color: "var(--accent)"
    }
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7,
      color: "var(--text-muted)",
      fontSize: "var(--text-xs)"
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "calendar-range",
    style: {
      width: 15,
      height: 15
    }
  }), /*#__PURE__*/React.createElement("span", null, "Review window"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      color: "var(--text-body)"
    }
  }, active.reviewWindow)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: "auto",
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral",
    icon: "lock"
  }, "Synthetic \xB7 demo"), /*#__PURE__*/React.createElement("button", {
    onClick: onExport,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 7,
      height: "var(--control-h-md)",
      padding: "0 14px",
      background: "var(--accent)",
      color: "#fff",
      border: "1px solid var(--accent)",
      borderRadius: "var(--radius-md)",
      cursor: "pointer",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-sm)",
      fontWeight: 600
    },
    onMouseEnter: e => e.currentTarget.style.background = "var(--accent-hover)",
    onMouseLeave: e => e.currentTarget.style.background = "var(--accent)"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "file-down",
    style: {
      width: 16,
      height: 16
    }
  }), "Doctor report")));
}
window.Topbar = Topbar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/visitprep/Topbar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/visitprep/data.js
try { (() => {
/* Synthetic data for the VisitPrep Health Journal workspace UI kit.
   Synthetic data only — no real patients. Exposed as window.VP_DATA. */
(function () {
  // Deterministic pseudo-series helper
  function series(start, step, n, jitterSeed) {
    let s = jitterSeed || 1;
    const out = [];
    let v = start;
    for (let i = 0; i < n; i++) {
      s = (s * 9301 + 49297) % 233280;
      const j = s / 233280 - 0.5;
      v = v + step + j * Math.abs(step) * 1.4;
      out.push(Math.round(v * 10) / 10);
    }
    return out;
  }
  const SEV = {
    none: 0,
    mild: 1,
    moderate: 2,
    severe: 3
  };

  // ── Patient A: Maria S. ──────────────────────────────────────────────
  const maria = {
    id: "PT-0413",
    name: "Maria S.",
    initials: "MS",
    age: 47,
    sex: "F",
    med: "Semaglutide (GLP-1)",
    dose: "1.0 mg weekly",
    reviewWindow: "May 14 – Jun 12, 2026",
    reviewDays: 30,
    injectionDays: 4,
    doseChanges: 1,
    doseChangeNote: "0.5 → 1.0 mg on May 28",
    weightStart: 214.0,
    weightEnd: 210.6,
    moderateDays: 6,
    topSymptoms: ["nausea", "low appetite", "fatigue"],
    notes: [{
      date: "2026-06-12",
      day: "Fri",
      injection: false,
      dose: null,
      text: "Felt nauseous this morning, ate very little. Tired by mid-afternoon but slept a bit better.",
      symptoms: [{
        label: "nausea",
        level: "moderate",
        match: "nauseous",
        inj: false
      }, {
        label: "low appetite",
        level: "moderate",
        match: "ate very little",
        inj: false
      }, {
        label: "fatigue",
        level: "mild",
        match: "Tired",
        inj: false
      }]
    }, {
      date: "2026-06-10",
      day: "Wed",
      injection: true,
      dose: null,
      text: "Injection day. Some bloating and mild dizziness an hour after. Appetite low all day.",
      symptoms: [{
        label: "bloating",
        level: "mild",
        match: "bloating",
        inj: true
      }, {
        label: "dizziness",
        level: "mild",
        match: "dizziness",
        inj: true
      }, {
        label: "low appetite",
        level: "moderate",
        match: "Appetite low",
        inj: true
      }]
    }, {
      date: "2026-06-08",
      day: "Mon",
      injection: false,
      dose: null,
      text: "Better day. Light nausea after lunch but went on a short walk. Sleep was okay.",
      symptoms: [{
        label: "nausea",
        level: "mild",
        match: "nausea",
        inj: false
      }]
    }, {
      date: "2026-06-05",
      day: "Fri",
      injection: false,
      dose: null,
      text: "Constipation continues. No appetite for dinner. Felt a little dizzy standing up.",
      symptoms: [{
        label: "constipation",
        level: "moderate",
        match: "Constipation",
        inj: false
      }, {
        label: "low appetite",
        level: "moderate",
        match: "No appetite",
        inj: false
      }, {
        label: "dizziness",
        level: "mild",
        match: "dizzy",
        inj: false
      }]
    }, {
      date: "2026-06-03",
      day: "Wed",
      injection: true,
      dose: null,
      text: "Injection day. Strong nausea in the evening, threw up once. Very tired afterward.",
      symptoms: [{
        label: "nausea",
        level: "severe",
        match: "Strong nausea",
        inj: true
      }, {
        label: "vomiting",
        level: "severe",
        match: "threw up",
        inj: true
      }, {
        label: "fatigue",
        level: "moderate",
        match: "Very tired",
        inj: true
      }]
    }],
    symptomFreq: [{
      label: "nausea",
      value: 6,
      color: "var(--viz-amber)"
    }, {
      label: "low appetite",
      value: 5
    }, {
      label: "fatigue",
      value: 4
    }, {
      label: "constipation",
      value: 3
    }, {
      label: "poor sleep",
      value: 3
    }, {
      label: "bloating",
      value: 2
    }, {
      label: "dizziness",
      value: 2
    }, {
      label: "vomiting",
      value: 1,
      color: "var(--viz-clay)"
    }],
    wearables: {
      weight: series(214, -0.55, 30, 7),
      sleep: series(6.4, 0.03, 30, 3).map(v => Math.max(5, Math.min(8.5, v))),
      rhr: series(67, -0.16, 30, 11).map(v => Math.round(v)),
      steps: series(4200, 70, 30, 5).map(v => Math.max(1500, Math.round(v / 100) * 100)),
      activeMin: series(22, 0.7, 30, 9).map(v => Math.max(5, Math.round(v)))
    }
  };

  // 30-day symptom-severity grid (max symptom severity that day)
  maria.timeline = [3, 0, 0, 1, 0, 2, 0, 0, 1, 2, 0, 0, 2, 0, 1, 0, 0, 2, 1, 0, 3, 0, 1, 0, 2, 0, 1, 2, 0, 2];
  maria.injectionMarks = [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1];

  // ── Patient B: James T. ──────────────────────────────────────────────
  const james = {
    id: "PT-0728",
    name: "James T.",
    initials: "JT",
    age: 53,
    sex: "M",
    med: "Tirzepatide (GLP-1)",
    dose: "5.0 mg weekly",
    reviewWindow: "May 14 – Jun 12, 2026",
    reviewDays: 30,
    injectionDays: 4,
    doseChanges: 0,
    doseChangeNote: "No change this window",
    weightStart: 248.2,
    weightEnd: 243.1,
    moderateDays: 3,
    topSymptoms: ["fatigue", "constipation", "poor sleep"],
    notes: [{
      date: "2026-06-11",
      day: "Thu",
      injection: false,
      dose: null,
      text: "Tired in the afternoon again. Constipation still there. Appetite normal otherwise.",
      symptoms: [{
        label: "fatigue",
        level: "moderate",
        match: "Tired",
        inj: false
      }, {
        label: "constipation",
        level: "moderate",
        match: "Constipation",
        inj: false
      }]
    }, {
      date: "2026-06-09",
      day: "Tue",
      injection: true,
      dose: null,
      text: "Injection day. Mild nausea for an hour, nothing major. Slept poorly though.",
      symptoms: [{
        label: "nausea",
        level: "mild",
        match: "Mild nausea",
        inj: true
      }, {
        label: "poor sleep",
        level: "moderate",
        match: "Slept poorly",
        inj: true
      }]
    }, {
      date: "2026-06-06",
      day: "Sat",
      injection: false,
      dose: null,
      text: "Good energy today, long walk. Slight bloating after dinner.",
      symptoms: [{
        label: "bloating",
        level: "mild",
        match: "bloating",
        inj: false
      }]
    }],
    symptomFreq: [{
      label: "fatigue",
      value: 5
    }, {
      label: "constipation",
      value: 4
    }, {
      label: "poor sleep",
      value: 3
    }, {
      label: "nausea",
      value: 2
    }, {
      label: "bloating",
      value: 2
    }, {
      label: "low appetite",
      value: 1
    }],
    wearables: {
      weight: series(248, -0.7, 30, 4),
      sleep: series(6.0, 0.02, 30, 6).map(v => Math.max(4.8, Math.min(8, v))),
      rhr: series(71, -0.12, 30, 8).map(v => Math.round(v)),
      steps: series(5600, 90, 30, 2).map(v => Math.max(2000, Math.round(v / 100) * 100)),
      activeMin: series(28, 0.9, 30, 3).map(v => Math.max(8, Math.round(v)))
    }
  };
  james.timeline = [0, 1, 0, 0, 2, 0, 1, 0, 2, 1, 0, 0, 1, 0, 2, 0, 1, 0, 0, 1, 0, 2, 0, 1, 0, 1, 0, 2, 0, 1];
  james.injectionMarks = [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0];
  window.VP_DATA = {
    patients: [maria, james],
    SEV
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/visitprep/data.js", error: String((e && e.message) || e) }); }

__ds_ns.EvidenceCard = __ds_scope.EvidenceCard;

__ds_ns.SafetyNote = __ds_scope.SafetyNote;

__ds_ns.SymptomChip = __ds_scope.SymptomChip;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.KpiCard = __ds_scope.KpiCard;

__ds_ns.StatusDot = __ds_scope.StatusDot;

__ds_ns.MiniBarChart = __ds_scope.MiniBarChart;

__ds_ns.Sparkline = __ds_scope.Sparkline;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.Toggle = __ds_scope.Toggle;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
