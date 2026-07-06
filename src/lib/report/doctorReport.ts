import type {
  DoctorReport,
  JournalEntry,
  PatientAnalyticsSummary,
  ReportEvidenceNote,
  SyntheticPatient
} from "@/types/health";
import { buildPatientAnalyticsSummary } from "@/lib/analytics";
import { extractClinicalSignals } from "@/lib/nlp";

const safetyDisclaimer =
  "This report organizes synthetic patient-reported notes and wearable-style metrics for review. It does not diagnose, determine causality, recommend treatment changes, or replace clinician judgment.";

export function buildDoctorReport(
  patient: SyntheticPatient,
  syntheticDataNotice: string
): DoctorReport {
  const analytics = buildPatientAnalyticsSummary(patient.id, patient.journalEntries);
  const sortedEntries = patient.journalEntries
    .slice()
    .sort((left, right) => left.day - right.day);

  return {
    patientId: patient.id,
    patientLabel: patient.displayName,
    dateRange: formatDateRange(sortedEntries),
    syntheticDataNotice,
    snapshot: buildSnapshot(patient, analytics),
    medicationContext: buildMedicationContext(patient, analytics),
    symptomHighlights: analytics.topSymptoms,
    wearableHighlights: buildWearableHighlights(analytics),
    evidenceNotes: selectEvidenceNotes(sortedEntries),
    discussionPrompts: patient.thirtyDaySummary.doctorDiscussionPrompts,
    safetyDisclaimer
  };
}

function buildSnapshot(
  patient: SyntheticPatient,
  analytics: PatientAnalyticsSummary
) {
  const topSymptoms = analytics.topSymptoms
    .slice(0, 3)
    .map((item) => `${item.name} (${item.count} days)`)
    .join(", ");

  return [
    `${patient.displayName} has ${analytics.entryCount} synthetic daily journal entries in this review window.`,
    topSymptoms
      ? `Most frequent reported symptom signals were ${topSymptoms}.`
      : "No tracked symptom signals were identified in this review window.",
    `${analytics.injectionAdjacentSignalCount} symptom signals were documented in injection- or dose-change-adjacent context.`,
    `${analytics.severityDistribution.moderate} moderate symptom signals were identified; severe symptom signals were ${analytics.severityDistribution.severe}.`
  ];
}

function buildMedicationContext(
  patient: SyntheticPatient,
  analytics: PatientAnalyticsSummary
) {
  const injectionDays = patient.thirtyDaySummary.injectionDays
    .map((day) => `day ${day}`)
    .join(", ");
  const doseChangeDays =
    patient.thirtyDaySummary.doseChangeDays.length > 0
      ? patient.thirtyDaySummary.doseChangeDays
          .map((day) => `day ${day}`)
          .join(", ")
      : "none noted";

  const adjacentSymptoms = analytics.injectionAdjacentSymptomFrequency
    .slice(0, 4)
    .map((item) => `${item.name} (${item.count})`)
    .join(", ");

  return [
    `Injection days documented in the synthetic journal: ${injectionDays}.`,
    `Dose-change days documented in the synthetic journal: ${doseChangeDays}.`,
    adjacentSymptoms
      ? `Symptoms reported in injection-adjacent context included ${adjacentSymptoms}.`
      : "No symptom signals were identified in injection-adjacent context."
  ];
}

function buildWearableHighlights(analytics: PatientAnalyticsSummary) {
  const trends = analytics.wearableTrends;

  return [
    `Weight changed ${formatSigned(trends.weightLb.change, "lb")} from first to last recorded day.`,
    `Average sleep changed ${formatSigned(trends.sleepHours.averageChange, "hours")} from week 1 to week 4.`,
    `Average steps changed ${formatSigned(trends.steps.averageChange, "steps")} from week 1 to week 4.`,
    `Average resting heart rate changed ${formatSigned(trends.restingHeartRate.averageChange, "bpm")} from week 1 to week 4.`,
    `Average strength-training minutes changed ${formatSigned(trends.strengthTrainingMinutes.averageChange, "minutes")} from week 1 to week 4.`
  ];
}

function selectEvidenceNotes(entries: JournalEntry[]): ReportEvidenceNote[] {
  const scored = entries
    .map((entry) => {
      const signals = extractClinicalSignals(entry);
      const score =
        signals.length * 2 +
        signals.filter((signal) => signal.severity === "moderate").length * 3 +
        (entry.injectionDay ? 2 : 0) +
        (entry.doseChangeDay ? 3 : 0);

      return {
        entry,
        signals,
        score
      };
    })
    .filter((item) => item.signals.length > 0)
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }
      return left.entry.day - right.entry.day;
    });

  const selected: ReportEvidenceNote[] = [];
  const seenSymptoms = new Set<string>();

  for (const item of scored) {
    const symptoms = item.signals.map((signal) => signal.symptom);
    const addsNewSymptom = symptoms.some((symptom) => !seenSymptoms.has(symptom));
    if (!addsNewSymptom && selected.length >= 3) {
      continue;
    }

    selected.push({
      day: item.entry.day,
      date: item.entry.date,
      note: item.entry.rawJournalNote,
      symptoms,
      injectionDay: item.entry.injectionDay,
      doseChangeDay: item.entry.doseChangeDay
    });
    symptoms.forEach((symptom) => seenSymptoms.add(symptom));

    if (selected.length >= 5) {
      break;
    }
  }

  return selected;
}

function formatDateRange(entries: JournalEntry[]) {
  if (entries.length === 0) {
    return "No dates available";
  }

  return `${entries[0].date} to ${entries[entries.length - 1].date}`;
}

function formatSigned(value: number, unit: string) {
  const rounded = Number.isInteger(value) ? value.toLocaleString() : value.toFixed(1);
  if (value > 0) {
    return `+${rounded} ${unit}`;
  }
  if (value < 0) {
    return `${rounded} ${unit}`;
  }
  return `0 ${unit}`;
}
