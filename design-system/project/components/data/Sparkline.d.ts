import * as React from "react";

/** Small inline trend line for wearable metrics; optional area fill + end marker. */
export interface SparklineProps {
  values: number[];
  width?: number;
  height?: number;
  /** Stroke color — use a --viz-* token. */
  color?: string;
  /** Soft area fill under the line. */
  fill?: boolean;
  /** Marker dot on the last point. */
  showEnd?: boolean;
  strokeWidth?: number;
  style?: React.CSSProperties;
}

export function Sparkline(props: SparklineProps): JSX.Element;
