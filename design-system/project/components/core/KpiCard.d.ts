import * as React from "react";

/**
 * A single scannable metric tile for the workspace KPI row.
 * @startingPoint section="Core" subtitle="Eyebrow label, large tabular value, tonal delta" viewport="700x150"
 */
export interface KpiCardProps {
  /** Uppercase metric label, e.g. "Weight change". */
  label: string;
  /** The big tabular value. */
  value: React.ReactNode;
  /** Trailing unit, e.g. "lb", "bpm", "days". */
  unit?: string;
  /** Delta string, e.g. "−3.4" or "+2 days". */
  delta?: string;
  /** Tone of the delta — neutral by default to avoid implying good/bad. */
  deltaTone?: "neutral" | "positive" | "caution" | "danger";
  /** Lucide icon name, top-right. */
  icon?: string;
  /** Muted hint after the delta, e.g. "vs. prior 30 days". */
  hint?: string;
  style?: React.CSSProperties;
}

export function KpiCard(props: KpiCardProps): JSX.Element;
