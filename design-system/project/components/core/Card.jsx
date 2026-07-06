import React from "react";

/**
 * Card — the base surface of the workspace. White, 1px border, 8px radius,
 * barely-there shadow. Optional header (title + eyebrow + action) then body.
 */
export function Card({ title, eyebrow, action, padding = 16, children, style, bodyStyle, ...rest }) {
  return (
    <section
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border-default)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-xs)",
        overflow: "hidden",
        ...style,
      }}
      {...rest}
    >
      {(title || eyebrow || action) && (
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            padding: `12px ${padding}px`,
            borderBottom: "1px solid var(--border-subtle)",
          }}
        >
          <div style={{ minWidth: 0 }}>
            {eyebrow && (
              <div style={{
                fontSize: "var(--text-2xs)", textTransform: "uppercase",
                letterSpacing: "var(--tracking-eyebrow)", fontWeight: 600,
                color: "var(--text-muted)", marginBottom: title ? 2 : 0,
              }}>{eyebrow}</div>
            )}
            {title && (
              <h3 style={{ fontSize: "var(--text-h3)", fontWeight: 600, color: "var(--text-strong)" }}>{title}</h3>
            )}
          </div>
          {action && <div style={{ flex: "none" }}>{action}</div>}
        </header>
      )}
      <div style={{ padding: `${padding}px`, ...bodyStyle }}>{children}</div>
    </section>
  );
}
