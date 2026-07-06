import React from "react";

/**
 * Button — primary action control for the VisitPrep workspace.
 * Calm clinical styling: teal primary, hairline secondary, quiet ghost,
 * red reserved for destructive. Darken-on-hover, darken-more-on-press,
 * no scale, soft focus ring.
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconRight,
  disabled = false,
  block = false,
  type = "button",
  onClick,
  style,
  ...rest
}) {
  const sizes = {
    sm: { h: "var(--control-h-sm)", px: "10px", fs: "13px", gap: "6px", ic: 15 },
    md: { h: "var(--control-h-md)", px: "14px", fs: "14px", gap: "7px", ic: 16 },
    lg: { h: "var(--control-h-lg)", px: "18px", fs: "15px", gap: "8px", ic: 18 },
  };
  const s = sizes[size] || sizes.md;

  const variants = {
    primary: {
      background: "var(--accent)",
      color: "var(--text-on-accent)",
      border: "1px solid var(--accent)",
    },
    secondary: {
      background: "var(--surface)",
      color: "var(--text-strong)",
      border: "1px solid var(--border-strong)",
    },
    ghost: {
      background: "transparent",
      color: "var(--text-body)",
      border: "1px solid transparent",
    },
    danger: {
      background: "var(--danger)",
      color: "#fff",
      border: "1px solid var(--danger)",
    },
  };
  const v = variants[variant] || variants.primary;

  const base = {
    display: block ? "flex" : "inline-flex",
    width: block ? "100%" : undefined,
    alignItems: "center",
    justifyContent: "center",
    gap: s.gap,
    height: s.h,
    padding: `0 ${s.px}`,
    fontFamily: "var(--font-sans)",
    fontSize: s.fs,
    fontWeight: 600,
    lineHeight: 1,
    borderRadius: "var(--radius-md)",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    transition: "background var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard)",
    whiteSpace: "nowrap",
    ...v,
    ...style,
  };

  const hoverBg = {
    primary: "var(--accent-hover)",
    secondary: "var(--surface-sunken)",
    ghost: "var(--surface-sunken)",
    danger: "var(--red-700)",
  }[variant];

  const onEnter = (e) => { if (!disabled) e.currentTarget.style.background = hoverBg; };
  const onLeave = (e) => { if (!disabled) e.currentTarget.style.background = v.background; };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={base}
      {...rest}
    >
      {icon && <i data-lucide={icon} style={{ width: s.ic, height: s.ic }}></i>}
      {children && <span>{children}</span>}
      {iconRight && <i data-lucide={iconRight} style={{ width: s.ic, height: s.ic }}></i>}
    </button>
  );
}
