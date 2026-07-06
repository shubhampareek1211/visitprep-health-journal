import React from "react";
import { StatusDot } from "../core/StatusDot.jsx";

/**
 * SymptomChip — a single extracted symptom signal as a structured chip.
 * Shows a severity dot, the symptom label, an optional count, and an optional
 * injection-adjacent marker. Selectable (to reveal evidence) and removable.
 */
export function SymptomChip({
  label, level = "mild", count, injectionAdjacent = false,
  selected = false, onClick, onRemove, style, ...rest
}) {
  return (
    <span
      onClick={onClick}
      role={onClick ? "button" : undefined}
      style={{
        display: "inline-flex", alignItems: "center", gap: 7,
        height: 28, padding: "0 10px",
        background: selected ? "var(--accent-tint)" : "var(--surface)",
        border: `1px solid ${selected ? "var(--border-accent)" : "var(--border-default)"}`,
        borderRadius: "var(--radius-pill)",
        cursor: onClick ? "pointer" : "default",
        transition: "background var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard)",
        ...style,
      }}
      {...rest}
    >
      <StatusDot level={level} size={7} />
      <span style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--text-strong)", textTransform: "capitalize" }}>{label}</span>
      {typeof count === "number" && (
        <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", fontVariantNumeric: "tabular-nums" }}>×{count}</span>
      )}
      {injectionAdjacent && (
        <i data-lucide="syringe" title="Injection-adjacent" style={{ width: 12, height: 12, color: "var(--accent)" }}></i>
      )}
      {onRemove && (
        <i data-lucide="x" onClick={(e) => { e.stopPropagation(); onRemove(); }}
           style={{ width: 13, height: 13, color: "var(--text-subtle)", cursor: "pointer", marginLeft: 1 }}></i>
      )}
    </span>
  );
}
