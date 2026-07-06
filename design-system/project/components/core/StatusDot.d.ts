import * as React from "react";

/** Tiny severity / status indicator dot; pair with a text label. */
export interface StatusDotProps {
  /** Clinical severity level. */
  level?: "none" | "mild" | "moderate" | "severe";
  /** Diameter in px. Default 8. */
  size?: number;
  /** Soft halo ring (e.g. for "live"/active). */
  pulse?: boolean;
  style?: React.CSSProperties;
}

export function StatusDot(props: StatusDotProps): JSX.Element;
