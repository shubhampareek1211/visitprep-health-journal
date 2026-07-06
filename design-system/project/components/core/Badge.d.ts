import * as React from "react";

/** Compact status / metadata label, tonal by default. */
export interface BadgeProps {
  children?: React.ReactNode;
  /** Semantic tone. `danger` for severe/safety only. */
  tone?: "neutral" | "accent" | "caution" | "danger" | "positive";
  /** Lucide icon name shown before the label. */
  icon?: string;
  /** Filled instead of tinted. Use sparingly. */
  solid?: boolean;
  style?: React.CSSProperties;
}

export function Badge(props: BadgeProps): JSX.Element;
