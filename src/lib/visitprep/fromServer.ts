import type { getPatientView } from "@/lib/server/repository";
import type { Patient, Symptom, Note } from "./data";

type PatientView = Awaited<ReturnType<typeof getPatientView>>;

export function fromServer(view: PatientView): Patient {
  const { patient, entries, metrics, window, analytics } = view;
  const severityRank: Record<string, number> = { severe: 3, moderate: 2, mild: 1 };
  const notes: Note[] = entries.map((entry) => ({
    date: entry.entryDate,
    day: new Date(`${entry.entryDate}T00:00:00Z`).toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" }),
    injection: Boolean(entry.injectionDay),
    dose: null,
    text: entry.rawNote,
    symptoms: entry.signals.filter((signal, index, all) => (signal.assertionStatus === "present" || signal.assertionStatus === "uncertain") &&
      all.findIndex((candidate) => candidate.normalizedSymptom === signal.normalizedSymptom && (candidate.assertionStatus === "present" || candidate.assertionStatus === "uncertain")) === index).map((signal): Symptom => ({
      label: signal.normalizedSymptom,
      level: signal.severity === "none" || signal.severity === "unknown" ? "none" : signal.severity,
      match: signal.matchedText,
      inj: signal.relatedToInjection,
      assertionStatus: signal.assertionStatus,
      evidenceText: signal.evidenceText,
      confidence: signal.confidence,
      severityReason: signal.severityReason,
      temporalContext: signal.temporalContext,
      relatedToInjectionReason: signal.relatedToInjectionReason,
      extractionMethod: signal.extractionMethod
    }))
  }));
  const dayTime = new Date(`${window.start}T00:00:00Z`).getTime();
  const dates = Array.from({ length: 30 }, (_, index) => new Date(dayTime + index * 86_400_000).toISOString().slice(0, 10));
  const byDate = new Map<string, Note[]>();
  for (const note of notes) byDate.set(note.date, [...(byDate.get(note.date) ?? []), note]);
  const series = (key: "weightLb" | "sleepHours" | "restingHeartRate" | "steps" | "activeMinutes") =>
    metrics.map((metric) => metric[key]).filter((value): value is number => value != null).map((value) => key === "weightLb" || key === "sleepHours" ? value / 10 : value);
  const weight = analytics.wearableTrends.weightLb;

  return {
    id: patient.id,
    sourceId: patient.sourceId,
    name: patient.displayName,
    initials: patient.displayName.split(" ").map((part) => part[0]).join("").slice(0, 2),
    age: patient.profile.ageRange,
    sex: "",
    med: "GLP-1 journal",
    dose: "Not recorded",
    reviewWindow: `${window.start} – ${window.end}`,
    reviewEnd: window.end,
    revision: patient.revision,
    reviewDays: window.days,
    injectionDays: new Set(entries.filter((entry) => entry.injectionDay).map((entry) => entry.entryDate)).size,
    doseChanges: new Set(entries.filter((entry) => entry.doseChangeDay).map((entry) => entry.entryDate)).size,
    doseChangeNote: "Dose change documented",
    weightStart: weight.firstValue,
    weightEnd: weight.lastValue,
    moderateDays: analytics.moderateOrSevereDays,
    topSymptoms: analytics.symptomDayFrequency.slice(0, 3).map((item) => item.name),
    notes,
    symptomFreq: analytics.symptomDayFrequency.map((item) => ({ label: item.name, value: item.count })),
    wearables: { weight: series("weightLb"), sleep: series("sleepHours"), rhr: series("restingHeartRate"), steps: series("steps"), activeMin: series("activeMinutes") },
    timeline: dates.map((date) => {
      const dailyNotes = byDate.get(date);
      return dailyNotes ? Math.max(0, ...dailyNotes.flatMap((note) => note.symptoms.filter((symptom) => symptom.assertionStatus === "present").map((symptom) => severityRank[symptom.level] ?? 0))) : -1;
    }),
    injectionMarks: dates.map((date) => byDate.get(date)?.some((note) => note.injection) ? 1 : 0),
    reportPrompts: analytics.symptomDayFrequency.length
      ? [`May be useful to discuss the timing and impact of reported ${analytics.symptomDayFrequency[0].name} with a clinician.`]
      : ["May be useful to discuss any untracked symptoms or concerns with a clinician."]
  };
}
