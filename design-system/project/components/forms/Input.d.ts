import * as React from "react";

/** Single-line text field with optional leading icon, trailing affix, hint/error. */
export interface InputProps {
  label?: string;
  /** Muted helper text below the field. */
  hint?: string;
  /** Lucide icon name, leading. */
  icon?: string;
  /** Trailing affix text, e.g. "mg", "lb". */
  affix?: string;
  /** Error string — overrides hint and turns the field red. */
  error?: string;
  size?: "sm" | "md" | "lg";
  id?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export function Input(props: InputProps): JSX.Element;
