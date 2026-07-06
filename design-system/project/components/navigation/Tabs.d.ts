import * as React from "react";

/** Underline tab navigation for in-page views. */
export interface TabItem {
  value: string;
  label: string;
  /** Lucide icon name. */
  icon?: string;
  /** Optional count pill. */
  count?: number;
}
export interface TabsProps {
  /** Tab items, or plain strings. */
  tabs: Array<TabItem | string>;
  /** Controlled active value. Omit for uncontrolled. */
  value?: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
}

export function Tabs(props: TabsProps): JSX.Element;
