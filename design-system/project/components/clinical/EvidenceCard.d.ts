import * as React from "react";

/**
 * Ties an extracted signal back to its verbatim source snippet — the core
 * trust primitive. Highlights the matched phrase and names the match basis.
 * @startingPoint section="Clinical" subtitle="Signal + source snippet + deterministic match" viewport="700x150"
 */
export interface EvidenceCardProps {
  /** Signal / symptom name. */
  signal: string;
  level?: "none" | "mild" | "moderate" | "severe";
  /** Date of the source note (display string). */
  date?: string;
  /** Verbatim journal snippet. */
  snippet: string;
  /** The matched phrase to highlight inside the snippet + name as the basis. */
  match?: string;
  injectionAdjacent?: boolean;
  style?: React.CSSProperties;
}

export function EvidenceCard(props: EvidenceCardProps): JSX.Element;
