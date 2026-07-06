import * as React from "react";

/** Styled native select for patient picker, ranges, metric choices. */
export interface SelectOption { value: string; label: string; }
export interface SelectProps {
  label?: string;
  hint?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  /** Strings or {value,label} objects. */
  options?: Array<string | SelectOption>;
  size?: "sm" | "md" | "lg";
  id?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export function Select(props: SelectProps): JSX.Element;
