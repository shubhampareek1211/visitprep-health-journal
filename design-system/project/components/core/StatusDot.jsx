import React from "react";

/**
 * StatusDot — a tiny severity / status indicator. Pairs with a label.
 * Levels map to the clinical severity scale used across signals.
 */
export function StatusDot({ level = "none", size = 8, pulse = false, style, ...rest }) {
  const colors = {
    none: "var(--gray-300)",
    mild: "var(--teal-400)",
    moderate: "var(--amber-500)",
    severe: "var(--red-500)",
  };
  return (
    <span
      style={{
        display: "inline-block",
        width: size,
        height: size,
        borderRadius: "var(--radius-pill)",
        background: colors[level] || colors.none,
        boxShadow: pulse ? `0 0 0 3px color-mix(in srgb, ${colors[level]} 22%, transparent)` : "none",
        flex: "none",
        ...style,
      }}
      {...rest}
    />
  );
}
