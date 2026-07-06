import * as React from "react";

/**
 * Multi-line text input — the central journal-note composer.
 * @startingPoint section="Forms" subtitle="Journal note composer with counter" viewport="700x180"
 */
export interface TextareaProps {
  label?: string;
  hint?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  /** Show an X/max counter. */
  maxLength?: number;
  id?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export function Textarea(props: TextareaProps): JSX.Element;
