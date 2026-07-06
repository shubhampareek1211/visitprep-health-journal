import React from "react";

/**
 * Input — single-line text field. Hairline border, sunken focus ring, optional
 * leading Lucide icon and trailing affix. Sentence-case labels.
 */
export function Input({
  label, hint, icon, affix, error, size = "md", id,
  value, onChange, placeholder, type = "text", disabled, style, ...rest
}) {
  const heights = { sm: "var(--control-h-sm)", md: "var(--control-h-md)", lg: "var(--control-h-lg)" };
  const fid = id || (label ? "in-" + label.replace(/\s+/g, "-").toLowerCase() : undefined);
  const [focus, setFocus] = React.useState(false);
  const borderColor = error ? "var(--danger)" : focus ? "var(--accent)" : "var(--border-strong)";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5, ...style }}>
      {label && (
        <label htmlFor={fid} style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--text-strong)" }}>{label}</label>
      )}
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        height: heights[size], padding: "0 10px",
        background: disabled ? "var(--surface-sunken)" : "var(--surface)",
        border: `1px solid ${borderColor}`,
        borderRadius: "var(--radius-md)",
        boxShadow: focus ? "var(--ring-focus)" : "none",
        transition: "border-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard)",
      }}>
        {icon && <i data-lucide={icon} style={{ width: 16, height: 16, color: "var(--text-subtle)", flex: "none" }}></i>}
        <input
          id={fid} type={type} value={value} onChange={onChange}
          placeholder={placeholder} disabled={disabled}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{
            flex: 1, minWidth: 0, border: "none", outline: "none", background: "transparent",
            fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", color: "var(--text-strong)",
          }}
          {...rest}
        />
        {affix && <span style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)", flex: "none" }}>{affix}</span>}
      </div>
      {(hint || error) && (
        <span style={{ fontSize: "var(--text-xs)", color: error ? "var(--danger-text)" : "var(--text-muted)" }}>{error || hint}</span>
      )}
    </div>
  );
}
