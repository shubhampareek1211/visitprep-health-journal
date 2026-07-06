import React from "react";

/**
 * SafetyNote — the visible-but-concise safety boundary. Tonal callout, not
 * alarmist: amber for general boundary, red only for true safety stops.
 * Carries the canonical disclaimer copy by default.
 */
export function SafetyNote({ tone = "caution", title = "Safety boundary", children, icon, style, ...rest }) {
  const tones = {
    caution: { bg: "var(--caution-tint)", bd: "var(--caution-border)", fg: "var(--caution-text)", ic: icon || "shield-alert" },
    danger: { bg: "var(--danger-tint)", bd: "var(--danger-border)", fg: "var(--danger-text)", ic: icon || "octagon-alert" },
    neutral: { bg: "var(--surface-sunken)", bd: "var(--border-default)", fg: "var(--text-body)", ic: icon || "info" },
  };
  const t = tones[tone] || tones.caution;
  return (
    <div
      style={{
        display: "flex", gap: 10,
        background: t.bg, border: `1px solid ${t.bd}`,
        borderRadius: "var(--radius-md)", padding: "12px 14px", ...style,
      }}
      {...rest}
    >
      <i data-lucide={t.ic} style={{ width: 17, height: 17, color: t.fg, flex: "none", marginTop: 1 }}></i>
      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {title && (
          <span style={{ fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "var(--tracking-eyebrow)", fontWeight: 700, color: t.fg }}>{title}</span>
        )}
        <span style={{ fontSize: "var(--text-sm)", lineHeight: "var(--leading-snug)", color: "var(--text-body)" }}>
          {children || "This report organizes synthetic patient-reported notes and wearable-style metrics for review. It does not diagnose, determine causality, recommend treatment changes, or replace clinician judgment."}
        </span>
      </div>
    </div>
  );
}
