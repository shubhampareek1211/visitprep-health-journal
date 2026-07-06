import React from "react";

/**
 * KpiCard — a single scannable metric. Eyebrow label, large tabular value,
 * optional unit and delta. Deltas are tonal, never colorful: positive/negative
 * read against `goodDirection` so a weight drop can be neutral, not "bad red".
 */
export function KpiCard({ label, value, unit, delta, deltaTone = "neutral", icon, hint, style, ...rest }) {
  const tones = {
    neutral: "var(--text-muted)",
    positive: "var(--accent-text)",
    caution: "var(--caution-text)",
    danger: "var(--danger-text)",
  };
  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border-default)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-xs)",
        padding: "14px 16px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        ...style,
      }}
      {...rest}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
        <span style={{
          fontSize: "var(--text-2xs)", textTransform: "uppercase",
          letterSpacing: "var(--tracking-eyebrow)", fontWeight: 600, color: "var(--text-muted)",
        }}>{label}</span>
        {icon && <i data-lucide={icon} style={{ width: 16, height: 16, color: "var(--text-subtle)" }}></i>}
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
        <span style={{
          fontSize: "26px", fontWeight: 700, color: "var(--text-strong)",
          letterSpacing: "var(--tracking-tight)", fontVariantNumeric: "tabular-nums", lineHeight: 1,
        }}>{value}</span>
        {unit && <span style={{ fontSize: "13px", color: "var(--text-muted)", fontWeight: 500 }}>{unit}</span>}
      </div>
      {(delta || hint) && (
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "12px" }}>
          {delta && <span style={{ color: tones[deltaTone], fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{delta}</span>}
          {hint && <span style={{ color: "var(--text-subtle)" }}>{hint}</span>}
        </div>
      )}
    </div>
  );
}
