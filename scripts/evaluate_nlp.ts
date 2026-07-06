import { getSyntheticDataset } from "../src/lib/syntheticDataset";
import { extractClinicalSignals } from "../src/lib/nlp";
import type { JournalEntry } from "../src/types/health";

type SymptomScore = {
  truePositive: number;
  falsePositive: number;
  falseNegative: number;
};

type EvaluationResult = {
  entries: number;
  expectedSignals: number;
  extractedSignals: number;
  precision: number;
  recall: number;
  f1: number;
  severityAccuracy: number;
  negationFalsePositiveCount: number;
  injectionContextAccuracy: number;
  evidenceSpanCoverage: number;
  perSymptom: Record<string, SymptomScore>;
};

const negatedFixtures: JournalEntry[] = [
  buildFixture("2026-06-20", "No nausea today. Appetite was normal.", false),
  buildFixture("2026-06-21", "Denied dizziness and no vomiting overnight.", false),
  buildFixture("2026-06-22", "Headache went away by lunch, no longer tracking it.", false)
];

function main() {
  const dataset = getSyntheticDataset();
  const perSymptom: Record<string, SymptomScore> = {};
  let entries = 0;
  let expectedSignals = 0;
  let extractedSignals = 0;
  let truePositive = 0;
  let falsePositive = 0;
  let falseNegative = 0;
  let severityChecks = 0;
  let severityMatches = 0;
  let injectionChecks = 0;
  let injectionMatches = 0;
  let evidenceSpanChecks = 0;
  let evidenceSpanMatches = 0;

  for (const patient of dataset.patients) {
    for (const entry of patient.journalEntries) {
      entries += 1;
      const expected = new Map(
        entry.annotatedSymptoms.map((symptom) => [symptom.name, symptom])
      );
      const extracted = extractClinicalSignals(entry);
      const extractedNames = new Set(extracted.map((signal) => signal.symptom));

      expectedSignals += expected.size;
      extractedSignals += extracted.length;

      for (const expectedName of expected.keys()) {
        ensureScore(perSymptom, expectedName);
        if (extractedNames.has(expectedName)) {
          truePositive += 1;
          perSymptom[expectedName].truePositive += 1;
        } else {
          falseNegative += 1;
          perSymptom[expectedName].falseNegative += 1;
        }
      }

      for (const signal of extracted) {
        ensureScore(perSymptom, signal.symptom);
        if (!expected.has(signal.symptom)) {
          falsePositive += 1;
          perSymptom[signal.symptom].falsePositive += 1;
        }

        const expectedSymptom = expected.get(signal.symptom);
        if (expectedSymptom) {
          severityChecks += 1;
          if (
            signal.severity === expectedSymptom.severity ||
            expectedSymptom.severity === "unknown"
          ) {
            severityMatches += 1;
          }
        }

        injectionChecks += 1;
        const expectedInjectionRelated = entry.injectionDay || entry.doseChangeDay;
        if (signal.relatedToInjection === expectedInjectionRelated) {
          injectionMatches += 1;
        }

        evidenceSpanChecks += 1;
        if (
          signal.evidenceStart >= 0 &&
          signal.evidenceEnd <= entry.rawJournalNote.length &&
          entry.rawJournalNote.slice(signal.evidenceStart, signal.evidenceEnd) ===
            signal.evidenceText
        ) {
          evidenceSpanMatches += 1;
        }
      }
    }
  }

  const negationFalsePositiveCount = negatedFixtures.reduce((count, entry) => {
    return count + extractClinicalSignals(entry).length;
  }, 0);

  const precision = ratio(truePositive, truePositive + falsePositive);
  const recall = ratio(truePositive, truePositive + falseNegative);
  const result: EvaluationResult = {
    entries,
    expectedSignals,
    extractedSignals,
    precision,
    recall,
    f1: ratio(2 * precision * recall, precision + recall),
    severityAccuracy: ratio(severityMatches, severityChecks),
    negationFalsePositiveCount,
    injectionContextAccuracy: ratio(injectionMatches, injectionChecks),
    evidenceSpanCoverage: ratio(evidenceSpanMatches, evidenceSpanChecks),
    perSymptom
  };

  console.log(JSON.stringify(result, null, 2));
}

function ensureScore(scores: Record<string, SymptomScore>, symptom: string) {
  scores[symptom] ??= {
    truePositive: 0,
    falsePositive: 0,
    falseNegative: 0
  };
}

function ratio(numerator: number, denominator: number) {
  if (denominator === 0) {
    return 0;
  }
  return Math.round((numerator / denominator) * 1000) / 1000;
}

function buildFixture(
  date: string,
  rawJournalNote: string,
  injectionDay: boolean
): JournalEntry {
  return {
    day: 999,
    date,
    rawJournalNote,
    injectionDay,
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
}

main();
