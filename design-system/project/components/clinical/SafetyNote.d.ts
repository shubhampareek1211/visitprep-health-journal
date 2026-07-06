import * as React from "react";

/**
 * The visible-but-concise safety boundary callout. Defaults to the canonical
 * disclaimer; amber by default, red only for true safety stops.
 * @startingPoint section="Clinical" subtitle="Safety boundary / disclaimer callout" viewport="700x110"
 */
export interface SafetyNoteProps {
  tone?: "caution" | "danger" | "neutral";
  /** Eyebrow title. Default "Safety boundary". */
  title?: string;
  /** Body copy. Omit to use the canonical disclaimer. */
  children?: React.ReactNode;
  /** Override the Lucide icon. */
  icon?: string;
  style?: React.CSSProperties;
}

export function SafetyNote(props: SafetyNoteProps): JSX.Element;
