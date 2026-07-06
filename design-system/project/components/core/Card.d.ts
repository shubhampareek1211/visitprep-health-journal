import * as React from "react";

/**
 * The base surface of the workspace: white, hairline border, 8px radius.
 * @startingPoint section="Core" subtitle="Bordered panel with optional header" viewport="700x200"
 */
export interface CardProps {
  /** Header title (h3). Omit for a header-less card. */
  title?: React.ReactNode;
  /** Tracked uppercase label above the title. */
  eyebrow?: string;
  /** Right-aligned header slot (e.g. a Button or link). */
  action?: React.ReactNode;
  /** Body padding in px. Default 16. */
  padding?: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
}

export function Card(props: CardProps): JSX.Element;
