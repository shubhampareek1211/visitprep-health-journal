import { describe, expect, it } from "vitest";
import { extractClinicalSignals } from "./extractClinicalSignals";
import type { JournalEntry } from "@/types/health";

function entry(rawJournalNote: string, date = "2026-05-30"): JournalEntry {
  return {
    day: 30, date, rawJournalNote, injectionDay: false, doseChangeDay: false,
    selfRatedSeverity: 0, annotatedSymptoms: [],
    wearableMetrics: { weightLb: 0, sleepHours: 0, steps: 0, restingHeartRate: 0, activeMinutes: 0, strengthTrainingMinutes: 0 }
  };
}

describe("source-grounded symptom extraction", () => {
  it("prefers explicit severe wording over a vomiting default", () => {
    expect(extractClinicalSignals(entry("Severe vomiting today."))[0].severity).toBe("severe");
  });

  it("retains a later present mention after an earlier negation", () => {
    const source = entry("No nausea this morning, but nausea returned tonight.");
    const signals = extractClinicalSignals(source, { includeInactive: true });
    expect(signals.map((signal) => signal.assertionStatus)).toEqual(["absent", "present"]);
    for (const signal of signals) {
      expect(source.rawJournalNote.slice(signal.matchedStart, signal.matchedEnd)).toBe(signal.matchedText);
      expect(source.rawJournalNote.slice(signal.evidenceStart, signal.evidenceEnd)).toBe(signal.evidenceText);
    }
  });

  it("scopes resolution and uncertainty to clauses", () => {
    expect(extractClinicalSignals(entry("Headache resolved, but nausea persists."), { includeInactive: true })
      .map((signal) => signal.assertionStatus)).toEqual(["resolved", "present"]);
    expect(extractClinicalSignals(entry("Maybe nausea, but definitely dizzy."))
      .map((signal) => signal.assertionStatus)).toEqual(["uncertain", "present"]);
  });
});
