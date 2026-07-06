import React from "react";

/**
 * Toggle — switch control for binary state (e.g. injection-day on a note).
 * Calm: teal when on, gray track when off, no bounce.
 */
export function Toggle({ checked = false, onChange, label, description, disabled, id, style, ...rest }) {
  const fid = id || (label ? "tg-" + label.replace(/\s+/g, "-").toLowerCase() : undefined);
  return (
    <label
      htmlFor={fid}
      style={{
        display: "inline-flex", alignItems: "center", gap: 10,
        cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.55 : 1, ...style,
      }}
    >
      <button
        id={fid} type="button" role="switch" aria-checked={checked} disabled={disabled}
        onClick={() => !disabled && onChange && onChange(!checked)}
        style={{
          position: "relative", width: 38, height: 22, flex: "none", padding: 0,
          borderRadius: "var(--radius-pill)", border: "none", cursor: "inherit",
          background: checked ? "var(--accent)" : "var(--gray-300)",
          transition: "background var(--duration-base) var(--ease-standard)",
        }}
        {...rest}
      >
        <span style={{
          position: "absolute", top: 2, left: checked ? 18 : 2,
          width: 18, height: 18, borderRadius: "var(--radius-pill)", background: "#fff",
          boxShadow: "var(--shadow-sm)",
          transition: "left var(--duration-base) var(--ease-out)",
        }} />
      </button>
      {(label || description) && (
        <span style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {label && <span style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--text-strong)" }}>{label}</span>}
          {description && <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>{description}</span>}
        </span>
      )}
    </label>
  );
}
