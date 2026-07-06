import React from "react";

/**
 * Badge — compact status / metadata label. Tonal (soft tint + text) by default.
 * Tones map to the semantic system: accent, neutral, caution, danger, positive.
 */
export function Badge({ children, tone = "neutral", icon, solid = false, style, ...rest }) {
  const tones = {
    neutral: { bg: "var(--surface-sunken)", fg: "var(--text-body)", bd: "var(--border-default)" },
    accent: { bg: "var(--accent-tint)", fg: "var(--accent-text)", bd: "var(--border-accent)" },
    caution: { bg: "var(--caution-tint)", fg: "var(--caution-text)", bd: "var(--caution-border)" },
    danger: { bg: "var(--danger-tint)", fg: "var(--danger-text)", bd: "var(--danger-border)" },
    positive: { bg: "var(--positive-tint)", fg: "var(--accent-text)", bd: "var(--border-accent)" },
  };
  const t = tones[tone] || tones.neutral;
  const solidBg = {
    neutral: "var(--gray-600)", accent: "var(--accent)", caution: "var(--caution)",
    danger: "var(--danger)", positive: "var(--positive)",
  }[tone];

  return (
    <span
      style={{
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
        ...style,
      }}
      {...rest}
    >
      {icon && <i data-lucide={icon} style={{ width: 12, height: 12 }}></i>}
      {children}
    </span>
  );
}
