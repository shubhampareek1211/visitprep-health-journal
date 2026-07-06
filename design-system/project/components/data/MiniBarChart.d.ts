import * as React from "react";

/** Compact horizontal bar list for ranked frequencies (e.g. symptom frequency). */
export interface BarDatum { label: string; value: number; color?: string; }
export interface MiniBarChartProps {
  data: BarDatum[];
  /** Max value for the scale; defaults to the data max. */
  max?: number;
  /** Unit suffix on value labels, e.g. " days". */
  unit?: string;
  /** Default bar fill (use a --viz-* token). */
  barColor?: string;
  style?: React.CSSProperties;
}

export function MiniBarChart(props: MiniBarChartProps): JSX.Element;
