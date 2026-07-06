"use client";

/* VisitPrep design-system primitives, ported to React/TSX from the
   "VisitPrep Design System" project. Inline styles + CSS variables; Lucide
   icons via lucide-react. Calm clinical SaaS styling. */

import React, { CSSProperties, ReactNode } from "react";
import {
  Activity, AlertTriangle, ArrowRight, ArrowUpRight, Calendar, CalendarRange,
  Check, CheckCircle2, ChevronDown, ChevronRight, ChevronsUpDown, CircleCheck,
  CircleDashed, Cpu, Database, Dot, FileDown, FileText, HeartPulse, Info,
  LayoutDashboard, LineChart, Loader, Lock, MessagesSquare, Moon, NotebookPen,
  OctagonAlert, Plus, Printer, SearchCheck, ShieldAlert, ShieldCheck, Sparkles,
  Syringe, Users, Weight, X, type LucideIcon
} from "lucide-react";
import { severityDotColor } from "@/lib/visitprep/data";

const ICONS: Record<string, LucideIcon> = {
  activity: Activity, "alert-triangle": AlertTriangle, "arrow-right": ArrowRight,
  "arrow-up-right": ArrowUpRight, calendar: Calendar, "calendar-range": CalendarRange,
  check: Check, "check-circle-2": CheckCircle2, "chevron-down": ChevronDown,
  "chevron-right": ChevronRight, "chevrons-up-down": ChevronsUpDown,
  "circle-check": CircleCheck, "circle-dashed": CircleDashed, cpu: Cpu,
  database: Database, dot: Dot, "file-down": FileDown, "file-text": FileText,
  "heart-pulse": HeartPulse, info: Info, "layout-dashboard": LayoutDashboard,
  "line-chart": LineChart, loader: Loader, lock: Lock, "messages-square": MessagesSquare,
  moon: Moon, "notebook-pen": NotebookPen, "octagon-alert": OctagonAlert, plus: Plus,
  printer: Printer, "search-check": SearchCheck, "shield-alert": ShieldAlert,
  "shield-check": ShieldCheck, sparkles: Sparkles, syringe: Syringe, users: Users,
  weight: Weight, x: X
};

export function Icon({
  name, size = 16, style, className, title
}: {
  name: string;
  size?: number;
  style?: CSSProperties;
  className?: string;
  title?: string;
}) {
  const Cmp = ICONS[name];
  if (!Cmp) return null;
  return <Cmp size={size} style={style} className={className} aria-label={title} strokeWidth={1.75} />;
}

/* ── Button ─────────────────────────────────────────────────────────── */
type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ControlSize = "sm" | "md" | "lg";

export function Button({
  children, variant = "primary", size = "md", icon, iconRight, disabled = false,
  block = false, type = "button", onClick, style
}: {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ControlSize;
  icon?: string;
  iconRight?: string;
  disabled?: boolean;
  block?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  style?: CSSProperties;
}) {
  const sizes = {
    sm: { h: "var(--control-h-sm)", px: "10px", fs: "13px", gap: "6px", ic: 15 },
    md: { h: "var(--control-h-md)", px: "14px", fs: "14px", gap: "7px", ic: 16 },
    lg: { h: "var(--control-h-lg)", px: "18px", fs: "15px", gap: "8px", ic: 18 }
  };
  const s = sizes[size] || sizes.md;
  const variants: Record<ButtonVariant, CSSProperties> = {
    primary: { background: "var(--accent)", color: "var(--text-on-accent)", border: "1px solid var(--accent)" },
    secondary: { background: "var(--surface)", color: "var(--text-strong)", border: "1px solid var(--border-strong)" },
    ghost: { background: "transparent", color: "var(--text-body)", border: "1px solid transparent" },
    danger: { background: "var(--danger)", color: "#fff", border: "1px solid var(--danger)" }
  };
  const v = variants[variant] || variants.primary;
  const hoverBg: Record<ButtonVariant, string> = {
    primary: "var(--accent-hover)", secondary: "var(--surface-sunken)",
    ghost: "var(--surface-sunken)", danger: "var(--red-700)"
  };
  const base: CSSProperties = {
    display: block ? "flex" : "inline-flex",
    width: block ? "100%" : undefined,
    alignItems: "center", justifyContent: "center", gap: s.gap,
    height: s.h, padding: `0 ${s.px}`, fontFamily: "var(--font-sans)",
    fontSize: s.fs, fontWeight: 600, lineHeight: 1, borderRadius: "var(--radius-md)",
    cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1,
    transition: "background var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard)",
    whiteSpace: "nowrap", ...v, ...style
  };
  return (
    <button
      type={type} disabled={disabled} onClick={onClick} style={base}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.background = hoverBg[variant]; }}
      onMouseLeave={(e) => { if (!disabled) e.currentTarget.style.background = v.background as string; }}
    >
      {icon && <Icon name={icon} size={s.ic} />}
      {children && <span>{children}</span>}
      {iconRight && <Icon name={iconRight} size={s.ic} />}
    </button>
  );
}

/* ── Badge ──────────────────────────────────────────────────────────── */
type Tone = "neutral" | "accent" | "caution" | "danger" | "positive";

export function Badge({
  children, tone = "neutral", icon, solid = false, style
}: {
  children?: ReactNode;
  tone?: Tone;
  icon?: string;
  solid?: boolean;
  style?: CSSProperties;
}) {
  const tones: Record<Tone, { bg: string; fg: string; bd: string }> = {
    neutral: { bg: "var(--surface-sunken)", fg: "var(--text-body)", bd: "var(--border-default)" },
    accent: { bg: "var(--accent-tint)", fg: "var(--accent-text)", bd: "var(--border-accent)" },
    caution: { bg: "var(--caution-tint)", fg: "var(--caution-text)", bd: "var(--caution-border)" },
    danger: { bg: "var(--danger-tint)", fg: "var(--danger-text)", bd: "var(--danger-border)" },
    positive: { bg: "var(--positive-tint)", fg: "var(--accent-text)", bd: "var(--border-accent)" }
  };
  const t = tones[tone] || tones.neutral;
  const solidBg: Record<Tone, string> = {
    neutral: "var(--gray-600)", accent: "var(--accent)", caution: "var(--caution)",
    danger: "var(--danger)", positive: "var(--positive)"
  };
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "4px", height: "20px",
      padding: "0 8px", fontSize: "var(--text-2xs)", fontWeight: 600, letterSpacing: "0.01em",
      borderRadius: "var(--radius-sm)", background: solid ? solidBg[tone] : t.bg,
      color: solid ? "#fff" : t.fg, border: solid ? "1px solid transparent" : `1px solid ${t.bd}`,
      whiteSpace: "nowrap", ...style
    }}>
      {icon && <Icon name={icon} size={12} />}
      {children}
    </span>
  );
}

/* ── Card ───────────────────────────────────────────────────────────── */
export function Card({
  title, eyebrow, action, padding = 16, children, style, bodyStyle
}: {
  title?: ReactNode;
  eyebrow?: ReactNode;
  action?: ReactNode;
  padding?: number;
  children?: ReactNode;
  style?: CSSProperties;
  bodyStyle?: CSSProperties;
}) {
  return (
    <section style={{
      background: "var(--surface)", border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-xs)", overflow: "hidden", ...style
    }}>
      {(title || eyebrow || action) && (
        <header style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: "12px", padding: `12px ${padding}px`, borderBottom: "1px solid var(--border-subtle)"
        }}>
          <div style={{ minWidth: 0 }}>
            {eyebrow && (
              <div style={{
                fontSize: "var(--text-2xs)", textTransform: "uppercase",
                letterSpacing: "var(--tracking-eyebrow)", fontWeight: 600,
                color: "var(--text-muted)", marginBottom: title ? 2 : 0
              }}>{eyebrow}</div>
            )}
            {title && <h3 style={{ fontSize: "var(--text-h3)", fontWeight: 600, color: "var(--text-strong)" }}>{title}</h3>}
          </div>
          {action && <div style={{ flex: "none" }}>{action}</div>}
        </header>
      )}
      <div style={{ padding: `${padding}px`, ...bodyStyle }}>{children}</div>
    </section>
  );
}

/* ── KpiCard ────────────────────────────────────────────────────────── */
type DeltaTone = "neutral" | "positive" | "caution" | "danger";

export function KpiCard({
  label, value, unit, delta, deltaTone = "neutral", icon, hint, style
}: {
  label: ReactNode;
  value: ReactNode;
  unit?: ReactNode;
  delta?: ReactNode;
  deltaTone?: DeltaTone;
  icon?: string;
  hint?: ReactNode;
  style?: CSSProperties;
}) {
  const tones: Record<DeltaTone, string> = {
    neutral: "var(--text-muted)", positive: "var(--accent-text)",
    caution: "var(--caution-text)", danger: "var(--danger-text)"
  };
  return (
    <div style={{
      background: "var(--surface)", border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-xs)", padding: "14px 16px",
      display: "flex", flexDirection: "column", gap: "8px", ...style
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
        <span style={{
          fontSize: "var(--text-2xs)", textTransform: "uppercase",
          letterSpacing: "var(--tracking-eyebrow)", fontWeight: 600, color: "var(--text-muted)"
        }}>{label}</span>
        {icon && <Icon name={icon} size={16} style={{ color: "var(--text-subtle)" }} />}
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
        <span style={{
          fontSize: "26px", fontWeight: 700, color: "var(--text-strong)",
          letterSpacing: "var(--tracking-tight)", fontVariantNumeric: "tabular-nums", lineHeight: 1
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

/* ── StatusDot ──────────────────────────────────────────────────────── */
export function StatusDot({
  level = "none", size = 8, pulse = false, style
}: {
  level?: "none" | "mild" | "moderate" | "severe";
  size?: number;
  pulse?: boolean;
  style?: CSSProperties;
}) {
  const c = severityDotColor(level);
  return (
    <span style={{
      display: "inline-block", width: size, height: size, borderRadius: "var(--radius-pill)",
      background: c,
      boxShadow: pulse ? `0 0 0 3px color-mix(in srgb, ${c} 22%, transparent)` : "none",
      flex: "none", ...style
    }} />
  );
}

/* ── SymptomChip ────────────────────────────────────────────────────── */
export function SymptomChip({
  label, level = "mild", count, injectionAdjacent = false,
  selected = false, onClick, onRemove, style
}: {
  label: string;
  level?: "none" | "mild" | "moderate" | "severe";
  count?: number;
  injectionAdjacent?: boolean;
  selected?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
  style?: CSSProperties;
}) {
  return (
    <span
      onClick={onClick}
      role={onClick ? "button" : undefined}
      style={{
        display: "inline-flex", alignItems: "center", gap: 7, height: 28, padding: "0 10px",
        background: selected ? "var(--accent-tint)" : "var(--surface)",
        border: `1px solid ${selected ? "var(--border-accent)" : "var(--border-default)"}`,
        borderRadius: "var(--radius-pill)", cursor: onClick ? "pointer" : "default",
        transition: "background var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard)",
        ...style
      }}
    >
      <StatusDot level={level} size={7} />
      <span style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--text-strong)", textTransform: "capitalize" }}>{label}</span>
      {typeof count === "number" && (
        <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", fontVariantNumeric: "tabular-nums" }}>×{count}</span>
      )}
      {injectionAdjacent && <Icon name="syringe" size={12} title="Injection-adjacent" style={{ color: "var(--accent)" }} />}
      {onRemove && (
        <span onClick={(e) => { e.stopPropagation(); onRemove(); }} style={{ display: "inline-flex", cursor: "pointer", marginLeft: 1 }}>
          <Icon name="x" size={13} style={{ color: "var(--text-subtle)" }} />
        </span>
      )}
    </span>
  );
}

/* ── EvidenceCard ───────────────────────────────────────────────────── */
export function EvidenceCard({
  signal, level = "mild", date, snippet, match, injectionAdjacent, confidence,
  assertionStatus, severityReason, temporalContext, injectionReason, style
}: {
  signal: string;
  level?: "none" | "mild" | "moderate" | "severe";
  date: string;
  snippet: string;
  match?: string;
  injectionAdjacent?: boolean;
  confidence?: number;
  assertionStatus?: string;
  severityReason?: string;
  temporalContext?: string[];
  injectionReason?: string;
  style?: CSSProperties;
}) {
  let body: ReactNode = snippet;
  if (match && typeof snippet === "string") {
    const i = snippet.toLowerCase().indexOf(match.toLowerCase());
    if (i >= 0) {
      body = (
        <>
          {snippet.slice(0, i)}
          <mark style={{ background: "var(--accent-tint-2)", color: "var(--accent-text)", padding: "0 2px", borderRadius: 2 }}>
            {snippet.slice(i, i + match.length)}
          </mark>
          {snippet.slice(i + match.length)}
        </>
      );
    }
  }
  const levelColor = severityDotColor(level);
  return (
    <div style={{
      background: "var(--surface)", border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-md)", padding: "12px 14px",
      display: "flex", flexDirection: "column", gap: 8, ...style
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: levelColor, flex: "none" }} />
        <span style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--text-strong)", textTransform: "capitalize" }}>{signal}</span>
        {injectionAdjacent && <Icon name="syringe" size={12} style={{ color: "var(--accent)" }} />}
        <span style={{ marginLeft: "auto", fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>{date}</span>
      </div>
      <blockquote style={{
        margin: 0, paddingLeft: 10, borderLeft: "2px solid var(--border-strong)",
        fontSize: "var(--text-sm)", lineHeight: "var(--leading-snug)", color: "var(--text-body)", fontStyle: "italic"
      }}>
        &ldquo;{body}&rdquo;
      </blockquote>
      {match && (
        <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "var(--text-2xs)", color: "var(--text-subtle)" }}>
          <Icon name="search-check" size={12} />
          <span>Matched on <span style={{ fontFamily: "var(--font-mono)" }}>&ldquo;{match}&rdquo;</span> · local deterministic extraction</span>
        </div>
      )}
      {(confidence !== undefined || assertionStatus || severityReason || temporalContext?.length || injectionReason) && (
        <div style={{ display: "flex", flexDirection: "column", gap: 5, fontSize: "var(--text-2xs)", color: "var(--text-subtle)" }}>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {confidence !== undefined && (
              <span>Confidence <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-body)" }}>{Math.round(confidence * 100)}%</span></span>
            )}
            {assertionStatus && (
              <span>Assertion <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-body)" }}>{assertionStatus}</span></span>
            )}
            {temporalContext && temporalContext.length > 0 && (
              <span>Timing <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-body)" }}>{temporalContext.join(", ")}</span></span>
            )}
          </div>
          {severityReason && <span>Severity: {severityReason}</span>}
          {injectionReason && <span>Injection context: {injectionReason}</span>}
        </div>
      )}
    </div>
  );
}

/* ── SafetyNote ─────────────────────────────────────────────────────── */
export function SafetyNote({
  tone = "caution", title = "Safety boundary", children, icon, style
}: {
  tone?: "caution" | "danger" | "neutral";
  title?: string;
  children?: ReactNode;
  icon?: string;
  style?: CSSProperties;
}) {
  const tones = {
    caution: { bg: "var(--caution-tint)", bd: "var(--caution-border)", fg: "var(--caution-text)", ic: icon || "shield-alert" },
    danger: { bg: "var(--danger-tint)", bd: "var(--danger-border)", fg: "var(--danger-text)", ic: icon || "octagon-alert" },
    neutral: { bg: "var(--surface-sunken)", bd: "var(--border-default)", fg: "var(--text-body)", ic: icon || "info" }
  };
  const t = tones[tone] || tones.caution;
  return (
    <div style={{
      display: "flex", gap: 10, background: t.bg, border: `1px solid ${t.bd}`,
      borderRadius: "var(--radius-md)", padding: "12px 14px", ...style
    }}>
      <Icon name={t.ic} size={17} style={{ color: t.fg, flex: "none", marginTop: 1 }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {title && (
          <span style={{ fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "var(--tracking-eyebrow)", fontWeight: 700, color: t.fg }}>{title}</span>
        )}
        <span style={{ fontSize: "var(--text-sm)", lineHeight: "var(--leading-snug)", color: "var(--text-body)" }}>
          {children || "This report organizes synthetic patient-reported notes and wearable-style metrics for review. It does not diagnose, determine causality, recommend treatment changes, or replace clinician judgment."}
        </span>
      </div>
    </div>
  );
}

/* ── MiniBarChart ───────────────────────────────────────────────────── */
export function MiniBarChart({
  data = [], max, unit = "", barColor = "var(--viz-teal)", style
}: {
  data?: { label: string; value: number; color?: string }[];
  max?: number;
  unit?: string;
  barColor?: string;
  style?: CSSProperties;
}) {
  const top = max || Math.max(1, ...data.map((d) => d.value));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 9, ...style }}>
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

/* ── Sparkline ──────────────────────────────────────────────────────── */
export function Sparkline({
  values = [], width = 220, height = 56, color = "var(--viz-teal)",
  fill = true, showEnd = true, strokeWidth = 1.75, style
}: {
  values?: number[];
  width?: number;
  height?: number;
  color?: string;
  fill?: boolean;
  showEnd?: boolean;
  strokeWidth?: number;
  style?: CSSProperties;
}) {
  const gid = "sg" + React.useId().replace(/:/g, "");
  if (!values.length) return <svg width={width} height={height} style={style} />;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const pad = 4;
  const w = width - pad * 2;
  const h = height - pad * 2;
  const pts = values.map((v, i) => {
    const x = pad + (i / (values.length - 1)) * w;
    const y = pad + h - ((v - min) / span) * h;
    return [x, y] as const;
  });
  const line = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
  const area = line + ` L ${pad + w} ${pad + h} L ${pad} ${pad + h} Z`;
  const end = pts[pts.length - 1];
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={style}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.16" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {fill && <path d={area} fill={`url(#${gid})`} />}
      <path d={line} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      {showEnd && <circle cx={end[0]} cy={end[1]} r="2.6" fill={color} stroke="var(--surface)" strokeWidth="1.5" />}
    </svg>
  );
}

/* ── Textarea ───────────────────────────────────────────────────────── */
export function Textarea({
  label, hint, value, onChange, placeholder, rows = 4, maxLength, id, disabled, style
}: {
  label?: string;
  hint?: ReactNode;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
  id?: string;
  disabled?: boolean;
  style?: CSSProperties;
}) {
  const fid = id || (label ? "ta-" + label.replace(/\s+/g, "-").toLowerCase() : undefined);
  const [focus, setFocus] = React.useState(false);
  const count = typeof value === "string" ? value.length : 0;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5, ...style }}>
      {label && <label htmlFor={fid} style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--text-strong)" }}>{label}</label>}
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
          transition: "border-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard)"
        }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
        <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>{hint}</span>
        {maxLength && <span style={{ fontSize: "var(--text-xs)", color: "var(--text-subtle)", fontVariantNumeric: "tabular-nums" }}>{count}/{maxLength}</span>}
      </div>
    </div>
  );
}

/* ── Toggle ─────────────────────────────────────────────────────────── */
export function Toggle({
  checked = false, onChange, label, description, disabled, id, style
}: {
  checked?: boolean;
  onChange?: (v: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  id?: string;
  style?: CSSProperties;
}) {
  const fid = id || (label ? "tg-" + label.replace(/\s+/g, "-").toLowerCase() : undefined);
  return (
    <label htmlFor={fid} style={{
      display: "inline-flex", alignItems: "center", gap: 10,
      cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.55 : 1, ...style
    }}>
      <button
        id={fid} type="button" role="switch" aria-checked={checked} disabled={disabled}
        onClick={() => !disabled && onChange && onChange(!checked)}
        style={{
          position: "relative", width: 38, height: 22, flex: "none", padding: 0,
          borderRadius: "var(--radius-pill)", border: "none", cursor: "inherit",
          background: checked ? "var(--accent)" : "var(--gray-300)",
          transition: "background var(--duration-base) var(--ease-standard)"
        }}
      >
        <span style={{
          position: "absolute", top: 2, left: checked ? 18 : 2, width: 18, height: 18,
          borderRadius: "var(--radius-pill)", background: "#fff", boxShadow: "var(--shadow-sm)",
          transition: "left var(--duration-base) var(--ease-out)"
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
