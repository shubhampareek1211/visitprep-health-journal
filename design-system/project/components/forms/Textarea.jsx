import React from "react";

/**
 * Textarea — the central journal-note input. Hairline border, focus ring,
 * optional character counter. Comfortable line-height for reading back notes.
 */
export function Textarea({
  label, hint, value, onChange, placeholder, rows = 4, maxLength,
  id, disabled, style, ...rest
}) {
  const fid = id || (label ? "ta-" + label.replace(/\s+/g, "-").toLowerCase() : undefined);
  const [focus, setFocus] = React.useState(false);
  const count = typeof value === "string" ? value.length : 0;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5, ...style }}>
      {label && (
        <label htmlFor={fid} style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--text-strong)" }}>{label}</label>
      )}
      <textarea
        id={fid} rows={rows} value={value} onChange={onChange}
        placeholder={placeholder} maxLength={maxLength} disabled={disabled}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        style={{
          width: "100%", resize: "vertical", padding: "10px 12px",
          fontFamily: "var(--font-sans)", fontSize: "var(--text-base)",
          lineHeight: "var(--leading-normal)", color: "var(--text-strong)",
          background: disabled ? "var(--surface-sunken)" : "var(--surface)",
          border: `1px solid ${focus ? "var(--accent)" : "var(--border-strong)"}`,
          borderRadius: "var(--radius-md)", outline: "none",
          boxShadow: focus ? "var(--ring-focus)" : "none",
          transition: "border-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard)",
        }}
        {...rest}
      />
      <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
        <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>{hint}</span>
        {maxLength && <span style={{ fontSize: "var(--text-xs)", color: "var(--text-subtle)", fontVariantNumeric: "tabular-nums" }}>{count}/{maxLength}</span>}
      </div>
    </div>
  );
}
