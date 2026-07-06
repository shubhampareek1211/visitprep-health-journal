import React from "react";

/**
 * Select — styled wrapper over a native <select>. Hairline border, chevron,
 * focus ring. Used for patient picker, date ranges, metric pickers.
 */
export function Select({ label, hint, value, onChange, options = [], size = "md", id, disabled, style, ...rest }) {
  const heights = { sm: "var(--control-h-sm)", md: "var(--control-h-md)", lg: "var(--control-h-lg)" };
  const fid = id || (label ? "sel-" + label.replace(/\s+/g, "-").toLowerCase() : undefined);
  const [focus, setFocus] = React.useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5, ...style }}>
      {label && <label htmlFor={fid} style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--text-strong)" }}>{label}</label>}
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        <select
          id={fid} value={value} onChange={onChange} disabled={disabled}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{
            appearance: "none", WebkitAppearance: "none", width: "100%",
            height: heights[size], padding: "0 32px 0 11px",
            fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", color: "var(--text-strong)",
            background: disabled ? "var(--surface-sunken)" : "var(--surface)",
            border: `1px solid ${focus ? "var(--accent)" : "var(--border-strong)"}`,
            borderRadius: "var(--radius-md)", outline: "none", cursor: disabled ? "not-allowed" : "pointer",
            boxShadow: focus ? "var(--ring-focus)" : "none",
            transition: "border-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard)",
          }}
          {...rest}
        >
          {options.map((o) => {
            const val = typeof o === "string" ? o : o.value;
            const lab = typeof o === "string" ? o : o.label;
            return <option key={val} value={val}>{lab}</option>;
          })}
        </select>
        <i data-lucide="chevron-down" style={{ position: "absolute", right: 10, width: 16, height: 16, color: "var(--text-muted)", pointerEvents: "none" }}></i>
      </div>
      {hint && <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>{hint}</span>}
    </div>
  );
}
