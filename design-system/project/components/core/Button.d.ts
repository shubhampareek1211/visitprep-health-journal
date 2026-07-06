import * as React from "react";

/**
 * Primary action control for the VisitPrep workspace.
 * @startingPoint section="Core" subtitle="Teal primary, secondary, ghost, danger" viewport="700x150"
 */
export interface ButtonProps {
  children?: React.ReactNode;
  /** Visual emphasis. `danger` is reserved for destructive actions. */
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  /** Lucide icon name shown before the label (e.g. "plus"). */
  icon?: string;
  /** Lucide icon name shown after the label. */
  iconRight?: string;
  disabled?: boolean;
  /** Stretch to fill the container width. */
  block?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
}

export function Button(props: ButtonProps): JSX.Element;
