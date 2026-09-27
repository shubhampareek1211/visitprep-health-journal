import { createHash } from "node:crypto";
import { z } from "zod";
import rawDataset from "../../../data/synthetic/glp1_patient_journals.json";

const metric = z.object({
  weightLb: z.number().nullable(), restingHeartRate: z.number().nullable(),
  sleepHours: z.number().nullable(), steps: z.number().nullable(),
  activeMinutes: z.number().nullable(), strengthTrainingMinutes: z.number().nullable()
});

const entry = z.object({
  day: z.number().int(), date: z.iso.date(), rawJournalNote: z.string(),
  injectionDay: z.boolean(), doseChangeDay: z.boolean(),
  selfRatedSeverity: z.number().int(), wearableMetrics: metric
});

const patient = z.object({
  id: z.string(), displayName: z.string(),
  syntheticPatientProfile: z.object({ ageRange: z.string(), context: z.string(), dataType: z.string() }),
  journalEntries: z.array(entry)
});

export const seedDataset = z.object({
  metadata: z.object({ version: z.string(), syntheticDataNotice: z.string() }),
  patients: z.array(patient).length(5)
}).parse(rawDataset);

for (const patient of seedDataset.patients) {
  if (patient.journalEntries.length !== 30) throw new Error(`Seed patient ${patient.id} does not have 30 entries`);
  const dates = new Set(patient.journalEntries.map((item) => item.date));
  if (dates.size !== patient.journalEntries.length) throw new Error(`Duplicate seed date for ${patient.id}`);
}

export const seedChecksum = createHash("sha256").update(JSON.stringify(rawDataset)).digest("hex");
