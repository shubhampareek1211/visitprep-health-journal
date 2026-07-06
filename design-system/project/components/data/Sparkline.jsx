import React from "react";

/**
 * Sparkline — a small inline trend line for wearable metrics (weight, sleep,
 * resting HR, steps). SVG, optional soft area fill and end-point marker.
 * Calm clinical line; no axes clutter.
 */
export function Sparkline({
  values = [], width = 220, height = 56, color = "var(--viz-teal)",
  fill = true, showEnd = true, strokeWidth = 1.75, style, ...rest
}) {
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
    return [x, y];
  });
  const line = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
  const area = line + ` L ${pad + w} ${pad + h} L ${pad} ${pad + h} Z`;
  const end = pts[pts.length - 1];
  const gid = "sg" + Math.random().toString(36).slice(2, 8);
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={style} {...rest}>
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
