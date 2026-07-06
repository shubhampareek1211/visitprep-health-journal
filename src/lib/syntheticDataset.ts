import rawDataset from "../../data/synthetic/glp1_patient_journals.json";
import type { SyntheticDataset } from "@/types/health";

const syntheticDataset = rawDataset as SyntheticDataset;

export function getSyntheticDataset(): SyntheticDataset {
  assertDatasetShape(syntheticDataset);
  return syntheticDataset;
}

export function getSyntheticDatasetStats() {
  const dataset = getSyntheticDataset();
  const patientCount = dataset.patients.length;
  const journalEntryCount = dataset.patients.reduce(
    (total, patient) => total + patient.journalEntries.length,
    0
  );

  return {
    patientCount,
    journalEntryCount,
    generatedOn: dataset.metadata.generatedOn,
    version: dataset.metadata.version
  };
}

function assertDatasetShape(dataset: SyntheticDataset) {
  if (dataset.patients.length !== 5) {
    throw new Error(`Expected 5 synthetic patients, found ${dataset.patients.length}.`);
  }

  const invalidPatient = dataset.patients.find(
    (patient) => patient.journalEntries.length !== 30
  );

  if (invalidPatient) {
    throw new Error(
      `Expected 30 journal entries for ${invalidPatient.id}, found ${invalidPatient.journalEntries.length}.`
    );
  }
}
