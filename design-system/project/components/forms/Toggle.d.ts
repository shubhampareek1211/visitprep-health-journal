import * as React from "react";

/** Switch control for binary state, e.g. marking a note as an injection day. */
export interface ToggleProps {
  checked?: boolean;
  onChange?: (next: boolean) => void;
  label?: string;
  /** Muted line under the label. */
  description?: string;
  disabled?: boolean;
  id?: string;
  style?: React.CSSProperties;
}

export function Toggle(props: ToggleProps): JSX.Element;
