/* Synthetic data for the VisitPrep Health Journal workspace.
   Synthetic data only — no real patients. Ported from the design system's
   ui_kits/visitprep/data.js. */

import { extractClinicalSignals } from "@/lib/nlp";
import type { ClinicalAssertionStatus, JournalEntry, SymptomCategory } from "@/types/health";

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
  name: string;
  initials: string;
  age: number;
  sex: string;
  med: string;
  dose: string;
  reviewWindow: string;
  reviewDays: number;
  injectionDays: number;
  doseChanges: number;
  doseChangeNote: string;
  weightStart: number;
  weightEnd: number;
  moderateDays: number;
  topSymptoms: string[];
  notes: Note[];
  symptomFreq: SymptomFreq[];
  wearables: Wearables;
  timeline: number[];
  injectionMarks: number[];
}

// Deterministic pseudo-series helper
function series(start: number, step: number, n: number, jitterSeed: number): number[] {
  let s = jitterSeed || 1;
  const out: number[] = [];
  let v = start;
  for (let i = 0; i < n; i++) {
    s = (s * 9301 + 49297) % 233280;
    const j = s / 233280 - 0.5;
    v = v + step + j * Math.abs(step) * 1.4;
    out.push(Math.round(v * 10) / 10);
  }
  return out;
}

export const SEV = { none: 0, mild: 1, moderate: 2, severe: 3 } as const;

// ── Patient A: Maria S. ──────────────────────────────────────────────
const maria: Patient = {
  id: "PT-0413",
  name: "Maria S.",
  initials: "MS",
  age: 47,
  sex: "F",
  med: "Semaglutide (GLP-1)",
  dose: "1.0 mg weekly",
  reviewWindow: "May 14 – Jun 12, 2026",
  reviewDays: 30,
  injectionDays: 4,
  doseChanges: 1,
  doseChangeNote: "0.5 → 1.0 mg on May 28",
  weightStart: 214.0,
  weightEnd: 210.6,
  moderateDays: 6,
  topSymptoms: ["nausea", "low appetite", "fatigue"],
  notes: [
    {
      date: "2026-06-12", day: "Fri", injection: false, dose: null,
      text: "Felt nauseous this morning, ate very little. Tired by mid-afternoon but slept a bit better.",
      symptoms: [
        { label: "nausea", level: "moderate", match: "nauseous", inj: false },
        { label: "low appetite", level: "moderate", match: "ate very little", inj: false },
        { label: "fatigue", level: "mild", match: "Tired", inj: false }
      ]
    },
    {
      date: "2026-06-10", day: "Wed", injection: true, dose: null,
      text: "Injection day. Some bloating and mild dizziness an hour after. Appetite low all day.",
      symptoms: [
        { label: "bloating", level: "mild", match: "bloating", inj: true },
        { label: "dizziness", level: "mild", match: "dizziness", inj: true },
        { label: "low appetite", level: "moderate", match: "Appetite low", inj: true }
      ]
    },
    {
      date: "2026-06-08", day: "Mon", injection: false, dose: null,
      text: "Better day. Light nausea after lunch but went on a short walk. Sleep was okay.",
      symptoms: [{ label: "nausea", level: "mild", match: "nausea", inj: false }]
    },
    {
      date: "2026-06-05", day: "Fri", injection: false, dose: null,
      text: "Constipation continues. No appetite for dinner. Felt a little dizzy standing up.",
      symptoms: [
        { label: "constipation", level: "moderate", match: "Constipation", inj: false },
        { label: "low appetite", level: "moderate", match: "No appetite", inj: false },
        { label: "dizziness", level: "mild", match: "dizzy", inj: false }
      ]
    },
    {
      date: "2026-06-03", day: "Wed", injection: true, dose: null,
      text: "Injection day. Strong nausea in the evening, threw up once. Very tired afterward.",
      symptoms: [
        { label: "nausea", level: "severe", match: "Strong nausea", inj: true },
        { label: "vomiting", level: "severe", match: "threw up", inj: true },
        { label: "fatigue", level: "moderate", match: "Very tired", inj: true }
      ]
    }
  ],
  symptomFreq: [
    { label: "nausea", value: 6, color: "var(--viz-amber)" },
    { label: "low appetite", value: 5 },
    { label: "fatigue", value: 4 },
    { label: "constipation", value: 3 },
    { label: "poor sleep", value: 3 },
    { label: "bloating", value: 2 },
    { label: "dizziness", value: 2 },
    { label: "vomiting", value: 1, color: "var(--viz-clay)" }
  ],
  wearables: {
    weight: series(214, -0.55, 30, 7),
    sleep: series(6.4, 0.03, 30, 3).map((v) => Math.max(5, Math.min(8.5, v))),
    rhr: series(67, -0.16, 30, 11).map((v) => Math.round(v)),
    steps: series(4200, 70, 30, 5).map((v) => Math.max(1500, Math.round(v / 100) * 100)),
    activeMin: series(22, 0.7, 30, 9).map((v) => Math.max(5, Math.round(v)))
  },
  timeline: [3, 0, 0, 1, 0, 2, 0, 0, 1, 2, 0, 0, 2, 0, 1, 0, 0, 2, 1, 0, 3, 0, 1, 0, 2, 0, 1, 2, 0, 2],
  injectionMarks: [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1]
};

// ── Patient B: James T. ──────────────────────────────────────────────
const james: Patient = {
  id: "PT-0728",
  name: "James T.",
  initials: "JT",
  age: 53,
  sex: "M",
  med: "Tirzepatide (GLP-1)",
  dose: "5.0 mg weekly",
  reviewWindow: "May 14 – Jun 12, 2026",
  reviewDays: 30,
  injectionDays: 4,
  doseChanges: 0,
  doseChangeNote: "No change this window",
  weightStart: 248.2,
  weightEnd: 243.1,
  moderateDays: 3,
  topSymptoms: ["fatigue", "constipation", "poor sleep"],
  notes: [
    {
      date: "2026-06-11", day: "Thu", injection: false, dose: null,
      text: "Tired in the afternoon again. Constipation still there. Appetite normal otherwise.",
      symptoms: [
        { label: "fatigue", level: "moderate", match: "Tired", inj: false },
        { label: "constipation", level: "moderate", match: "Constipation", inj: false }
      ]
    },
    {
      date: "2026-06-09", day: "Tue", injection: true, dose: null,
      text: "Injection day. Mild nausea for an hour, nothing major. Slept poorly though.",
      symptoms: [
        { label: "nausea", level: "mild", match: "Mild nausea", inj: true },
        { label: "poor sleep", level: "moderate", match: "Slept poorly", inj: true }
      ]
    },
    {
      date: "2026-06-06", day: "Sat", injection: false, dose: null,
      text: "Good energy today, long walk. Slight bloating after dinner.",
      symptoms: [{ label: "bloating", level: "mild", match: "bloating", inj: false }]
    }
  ],
  symptomFreq: [
    { label: "fatigue", value: 5 },
    { label: "constipation", value: 4 },
    { label: "poor sleep", value: 3 },
    { label: "nausea", value: 2 },
    { label: "bloating", value: 2 },
    { label: "low appetite", value: 1 }
  ],
  wearables: {
    weight: series(248, -0.7, 30, 4),
    sleep: series(6.0, 0.02, 30, 6).map((v) => Math.max(4.8, Math.min(8, v))),
    rhr: series(71, -0.12, 30, 8).map((v) => Math.round(v)),
    steps: series(5600, 90, 30, 2).map((v) => Math.max(2000, Math.round(v / 100) * 100)),
    activeMin: series(28, 0.9, 30, 3).map((v) => Math.max(8, Math.round(v)))
  },
  timeline: [0, 1, 0, 0, 2, 0, 1, 0, 2, 1, 0, 0, 1, 0, 2, 0, 1, 0, 0, 1, 0, 2, 0, 1, 0, 1, 0, 2, 0, 1],
  injectionMarks: [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0]
};

export const VP_DATA = { patients: [maria, james] };

/* Build a Note from raw input — runs local extraction and derives the weekday
   from the date. Used by the Overview "Save note" and Journal "Add note" flows. */
export function createNote(text: string, injection: boolean, date: string): Note {
  const parsed = new Date(date + "T00:00:00");
  const valid = !Number.isNaN(parsed.getTime());
  const safeDate = valid ? date : DEFAULT_NOTE_DATE;
  const day = new Date(safeDate + "T00:00:00").toLocaleDateString("en-US", { weekday: "short" });
  return { date: safeDate, day, injection, dose: null, text: text.trim(), symptoms: vpExtract(text, injection) };
}

/** Fallback date used when a note is saved without a valid date. */
export const DEFAULT_NOTE_DATE = "2026-06-13";

const LEVEL_RANK: Record<Level, number> = { none: 0, mild: 1, moderate: 2, severe: 3 };

function toWorkspaceLevel(level: string): Level {
  return level === "none" || level === "mild" || level === "moderate" || level === "severe"
    ? level
    : "mild";
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

/** Apply a new note to a patient, keeping the derived aggregates consistent so
    the timeline and the metrics describing it never disagree. */
export function applyNote(patient: Patient, note: Note): Patient {
  const freq = patient.symptomFreq.map((f) => ({ ...f }));
  for (const s of note.symptoms) {
    const existing = freq.find((f) => f.label === s.label);
    if (existing) existing.value += 1;
    else freq.push({ label: s.label, value: 1 });
  }
  freq.sort((a, b) => b.value - a.value);
  const topSymptoms = freq.slice(0, 3).map((f) => f.label);
  const isModeratePlus = note.symptoms.some((s) => LEVEL_RANK[s.level] >= 2);

  return {
    ...patient,
    notes: [note, ...patient.notes],
    symptomFreq: freq,
    topSymptoms: topSymptoms.length ? topSymptoms : patient.topSymptoms,
    moderateDays: patient.moderateDays + (isModeratePlus ? 1 : 0),
    injectionDays: patient.injectionDays + (note.injection ? 1 : 0)
  };
}

export interface ReportEvidence {
  signal: string;
  level: Level;
  date: string;
  snippet: string;
  match?: string;
  injectionAdjacent?: boolean;
}

export interface ReportModel {
  prompts: string[];
  highlights: { icon: string; label: string; value: string; note: string }[];
  evidence: ReportEvidence[];
}

function capitalize(s: string): string {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

/** Derive the doctor-report content from the patient's own data so the report
    is a faithful view of THIS patient (and reflects notes added in-session)
    rather than hardcoded copy. */
export function buildReport(p: Patient): ReportModel {
  const wDelta = p.weightEnd - p.weightStart;
  const top = p.topSymptoms[0] ?? p.symptomFreq[0]?.label ?? "symptoms";
  const topFreq = p.symptomFreq.find((s) => s.label === top)?.value ?? p.symptomFreq[0]?.value ?? 0;

  const rhr = p.wearables.rhr;
  const rhrFirst = rhr[0];
  const rhrLast = rhr[rhr.length - 1];
  const rhrDelta = rhrFirst - rhrLast; // > 0 means resting HR decreased
  const rhrDir = rhrDelta > 0 ? "down" : rhrDelta < 0 ? "up" : "flat";

  const prompts: string[] = [
    `${capitalize(top)} reported on ${topFreq} of ${p.reviewDays} days — is the titration pace appropriate?`
  ];
  const appetite = p.symptomFreq.find((s) => s.label === "low appetite");
  if (appetite) {
    prompts.push(`Low appetite reported on ${appetite.value} of ${p.reviewDays} days; review nutrition and hydration.`);
  }
  prompts.push(
    p.doseChanges > 0
      ? `Symptom intensity after the dose change (${p.doseChangeNote}) — review titration pace.`
      : "Symptoms stable; no dose change this window."
  );
  prompts.push(
    rhrDir === "flat"
      ? "Resting heart rate was stable across the window — confirm expected."
      : `Resting heart rate trended ${rhrDir} ${Math.abs(rhrDelta)} bpm — confirm expected.`
  );

  const sleepAvg = p.wearables.sleep.reduce((a, b) => a + b, 0) / p.wearables.sleep.length;
  const highlights = [
    { icon: "weight", label: "Weight", value: `${wDelta.toFixed(1)} lb`, note: `${p.weightStart} → ${p.weightEnd} lb over ${p.reviewDays} days` },
    { icon: "moon", label: "Sleep", value: `≈ ${sleepAvg.toFixed(1)} h`, note: "avg nightly" },
    { icon: "heart-pulse", label: "Resting HR", value: `${rhrLast} bpm`, note: rhrDir === "flat" ? `≈ ${rhrFirst} bpm at start` : `${rhrDir} from ${rhrFirst} bpm` }
  ];

  const flat: ReportEvidence[] = p.notes.flatMap((n) =>
    n.symptoms.map((s) => ({ signal: s.label, level: s.level, date: n.date, snippet: n.text, match: s.match, injectionAdjacent: s.inj }))
  );
  flat.sort((a, b) => LEVEL_RANK[b.level] - LEVEL_RANK[a.level]);

  return { prompts, highlights, evidence: flat.slice(0, 2) };
}

export function vpExtract(text: string, isInjection: boolean): Symptom[] {
  const entry: JournalEntry = {
    day: 0,
    date: DEFAULT_NOTE_DATE,
    rawJournalNote: text,
    injectionDay: isInjection,
    doseChangeDay: false,
    selfRatedSeverity: 0,
    annotatedSymptoms: [],
    wearableMetrics: {
      weightLb: 0,
      restingHeartRate: 0,
      sleepHours: 0,
      steps: 0,
      activeMinutes: 0,
      strengthTrainingMinutes: 0
    }
  };

  return extractClinicalSignals(entry).map((signal) => {
    return {
      label: signal.normalizedSymptom,
      level: toWorkspaceLevel(signal.severity),
      match: signal.matchedText,
      inj: signal.relatedToInjection,
      category: signal.category,
      assertionStatus: signal.assertionStatus,
      confidence: signal.confidence,
      evidenceText: signal.evidenceText,
      severityReason: signal.severityReason,
      temporalContext: signal.temporalContext,
      relatedToInjectionReason: signal.relatedToInjectionReason,
      extractionMethod: signal.extractionMethod
    };
  });
}
