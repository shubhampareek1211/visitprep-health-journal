import * as React from "react";

/**
 * A single extracted symptom signal as a structured, selectable chip.
 * @startingPoint section="Clinical" subtitle="Severity dot + label + count + injection marker" viewport="700x120"
 */
export interface SymptomChipProps {
  /** Symptom name, e.g. "nausea". */
  label: string;
  /** Severity level → dot color. */
  level?: "none" | "mild" | "moderate" | "severe";
  /** Occurrence count over the window. */
  count?: number;
  /** Show a syringe marker for injection-adjacent signals. */
  injectionAdjacent?: boolean;
  /** Selected state (e.g. evidence shown). */
  selected?: boolean;
  onClick?: () => void;
  /** Show an X; called when removed. */
  onRemove?: () => void;
  style?: React.CSSProperties;
}

export function SymptomChip(props: SymptomChipProps): JSX.Element;
