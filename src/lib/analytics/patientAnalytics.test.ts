import { expect, it } from "vitest";
import { buildPatientAnalyticsSummary } from "./patientAnalytics";
import type { JournalEntry } from "@/types/health";

function entry(note: string, day: number, date: string): JournalEntry {
  return {
    day, date, rawJournalNote: note, injectionDay: false, doseChangeDay: false,
    selfRatedSeverity: 0, annotatedSymptoms: [],
    wearableMetrics: { weightLb: 200, sleepHours: 7, steps: 5000, restingHeartRate: 70, activeMinutes: 20, strengthTrainingMinutes: 0 }
  };
}

it("counts repeated mentions and notes separately from distinct symptom days", () => {
  const summary = buildPatientAnalyticsSummary("p", [
    entry("Nausea, but nausea returned.", 1, "2026-05-01"),
    entry("No nausea at noon, but nausea returned.", 2, "2026-05-01"),
    entry("Maybe nausea today.", 3, "2026-05-02")
  ]);
  expect(summary.entryCount).toBe(3);
  expect(summary.symptomFrequency.find((item) => item.name === "nausea")?.count).toBe(3);
  expect(summary.symptomDayFrequency.find((item) => item.name === "nausea")?.count).toBe(1);
  expect(summary.uncertainSignalCount).toBe(1);
});
