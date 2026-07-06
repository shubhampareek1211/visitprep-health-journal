import React from "react";

/**
 * MiniBarChart — compact horizontal bar list for ranked frequencies
 * (e.g. symptom frequency). Tabular value labels, muted clinical fills.
 * Integrated size, never oversized.
 */
export function MiniBarChart({ data = [], max, unit = "", barColor = "var(--viz-teal)", style, ...rest }) {
  const top = max || Math.max(1, ...data.map((d) => d.value));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 9, ...style }} {...rest}>
      {data.map((d) => {
        const pct = Math.round((d.value / top) * 100);
        const fill = d.color || barColor;
        return (
          <div key={d.label} style={{ display: "grid", gridTemplateColumns: "92px 1fr 38px", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: "var(--text-xs)", color: "var(--text-body)", textTransform: "capitalize", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{d.label}</span>
            <span style={{ position: "relative", height: 8, background: "var(--surface-sunken)", borderRadius: "var(--radius-pill)" }}>
              <span style={{ position: "absolute", inset: 0, width: pct + "%", background: fill, borderRadius: "var(--radius-pill)", transition: "width var(--duration-slow) var(--ease-out)" }} />
            </span>
            <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{d.value}{unit}</span>
          </div>
        );
      })}
    </div>
  );
}
