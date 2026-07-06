import React from "react";

/**
 * Tabs — underline-style segment navigation for in-page views
 * (e.g. switching dashboard panels). Active tab carries the teal accent.
 */
export function Tabs({ tabs = [], value, onChange, style, ...rest }) {
  const [internal, setInternal] = React.useState(value || (tabs[0] && (tabs[0].value || tabs[0])));
  const active = value !== undefined ? value : internal;
  const select = (v) => { setInternal(v); onChange && onChange(v); };

  return (
    <div role="tablist" style={{ display: "flex", gap: 2, borderBottom: "1px solid var(--border-default)", ...style }} {...rest}>
      {tabs.map((t) => {
        const val = t.value || t;
        const label = t.label || t;
        const isActive = active === val;
        return (
          <button
            key={val} role="tab" aria-selected={isActive} onClick={() => select(val)}
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "8px 12px", marginBottom: -1,
              background: "transparent", border: "none", cursor: "pointer",
              fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: 600,
              color: isActive ? "var(--accent-text)" : "var(--text-muted)",
              borderBottom: `2px solid ${isActive ? "var(--accent)" : "transparent"}`,
              transition: "color var(--duration-fast) var(--ease-standard)",
            }}
          >
            {t.icon && <i data-lucide={t.icon} style={{ width: 15, height: 15 }}></i>}
            {label}
            {typeof t.count === "number" && (
              <span style={{ fontSize: "var(--text-2xs)", fontWeight: 600, padding: "1px 6px", borderRadius: "var(--radius-pill)", background: isActive ? "var(--accent-tint)" : "var(--surface-sunken)", color: isActive ? "var(--accent-text)" : "var(--text-muted)", fontVariantNumeric: "tabular-nums" }}>{t.count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
