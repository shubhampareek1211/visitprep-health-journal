import type {
  CountByName,
  ExtractedClinicalSignal,
  JournalEntry,
  MetricTrend,
  PatientAnalyticsSummary,
  SeverityDistribution,
  WearableMetrics
} from "@/types/health";
import { extractClinicalSignalsForEntries } from "@/lib/nlp";

type MetricKey = keyof WearableMetrics;

const metricKeys: MetricKey[] = [
  "weightLb",
  "sleepHours",
  "steps",
  "restingHeartRate",
  "activeMinutes",
  "strengthTrainingMinutes"
];

export function buildPatientAnalyticsSummary(
  patientId: string,
  entries: JournalEntry[]
): PatientAnalyticsSummary {
  const signals = extractClinicalSignalsForEntries(entries);

  return {
    patientId,
    entryCount: entries.length,
    signalCount: signals.length,
    symptomFrequency: countBy(signals, (signal) => signal.symptom),
    categoryFrequency: countBy(signals, (signal) => signal.category),
    topSymptoms: countBy(signals, (signal) => signal.symptom).slice(0, 5),
    injectionAdjacentSymptomFrequency: countBy(
      signals.filter((signal) => signal.relatedToInjection),
      (signal) => signal.symptom
    ),
    injectionAdjacentSignalCount: signals.filter(
      (signal) => signal.relatedToInjection
    ).length,
    severityDistribution: buildSeverityDistribution(signals),
    wearableTrends: buildWearableTrendSummary(entries)
  };
}

export function countBy<T>(items: T[], getName: (item: T) => string): CountByName[] {
  const counts = new Map<string, number>();

  for (const item of items) {
    const name = getName(item);
    counts.set(name, (counts.get(name) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((left, right) => {
      if (right.count !== left.count) {
        return right.count - left.count;
      }
      return left.name.localeCompare(right.name);
    });
}

function buildSeverityDistribution(
  signals: ExtractedClinicalSignal[]
): SeverityDistribution {
  return signals.reduce<SeverityDistribution>(
    (distribution, signal) => {
      distribution[signal.severity] += 1;
      return distribution;
    },
    {
      none: 0,
      mild: 0,
      moderate: 0,
      severe: 0,
      unknown: 0
    }
  );
}

function buildWearableTrendSummary(entries: JournalEntry[]) {
  const sortedEntries = [...entries].sort((left, right) => left.day - right.day);

  return metricKeys.reduce(
    (summary, metricKey) => ({
      ...summary,
      [metricKey]: buildMetricTrend(
        sortedEntries.map((entry) => entry.wearableMetrics[metricKey])
      )
    }),
    {} as Record<MetricKey, MetricTrend>
  );
}

function buildMetricTrend(values: number[]): MetricTrend {
  if (values.length === 0) {
    return {
      firstValue: 0,
      lastValue: 0,
      change: 0,
      firstWeekAverage: 0,
      lastWeekAverage: 0,
      averageChange: 0
    };
  }

  const firstValue = values[0];
  const lastValue = values[values.length - 1];
  const firstWeekAverage = average(values.slice(0, 7));
  const lastWeekAverage = average(values.slice(-7));

  return {
    firstValue,
    lastValue,
    change: roundToOne(lastValue - firstValue),
    firstWeekAverage,
    lastWeekAverage,
    averageChange: roundToOne(lastWeekAverage - firstWeekAverage)
  };
}

function average(values: number[]) {
  if (values.length === 0) {
    return 0;
  }

  return roundToOne(
    values.reduce((total, value) => total + value, 0) / values.length
  );
}

function roundToOne(value: number) {
  return Math.round(value * 10) / 10;
}
