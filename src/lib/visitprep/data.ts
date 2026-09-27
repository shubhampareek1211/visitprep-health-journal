import type { ClinicalAssertionStatus, SymptomCategory } from "@/types/health";

export type Level = "none" | "mild" | "moderate" | "severe";

export interface Symptom {
  label: string;
  level: Level;
  match: string;
  inj: boolean;
  category?: SymptomCategory;
  assertionStatus?: ClinicalAssertionStatus;
  confidence?: number;
  evidenceText?: string;
  severityReason?: string;
  temporalContext?: string[];
  relatedToInjectionReason?: string;
  extractionMethod?: "rule-based" | "semantic-local" | "hybrid";
}

export interface Note {
  date: string;
  day: string;
  injection: boolean;
  dose: string | null;
  text: string;
  symptoms: Symptom[];
}

export interface SymptomFreq {
  label: string;
  value: number;
  color?: string;
}

export interface Wearables {
  weight: number[];
  sleep: number[];
  rhr: number[];
  steps: number[];
  activeMin: number[];
}

export interface Patient {
  id: string;
  sourceId: string;
  name: string;
  initials: string;
  age: number | string;
  sex: string;
  med: string;
  dose: string;
  reviewWindow: string;
  reviewDays: number;
  injectionDays: number;
  doseChanges: number;
  doseChangeNote: string;
  weightStart: number | null;
  weightEnd: number | null;
  moderateDays: number;
  topSymptoms: string[];
  notes: Note[];
  symptomFreq: SymptomFreq[];
  wearables: Wearables;
  timeline: number[];
  injectionMarks: number[];
  reviewEnd?: string;
  revision?: number;
  reportPrompts?: string[];
}

/** Single source of truth for the severity → dot color mapping. */
export function severityDotColor(level: Level): string {
  switch (level) {
    case "severe": return "var(--red-500)";
    case "moderate": return "var(--amber-500)";
    case "mild": return "var(--teal-400)";
    default: return "var(--gray-300)";
  }
}
