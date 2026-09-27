import { date, foreignKey, integer, jsonb, pgTable, text, timestamp, unique, uuid } from "drizzle-orm/pg-core";
import type { DoctorReport, ExtractedClinicalSignal, SyntheticPatientProfile } from "@/types/health";

export const workspaces = pgTable("demo_workspaces", {
  id: uuid("id").primaryKey().defaultRandom(),
  tokenHash: text("token_hash").notNull().unique(),
  seedVersion: text("seed_version").notNull(),
  seedChecksum: text("seed_checksum").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull()
});

export const patients = pgTable("patients", {
  id: uuid("id").primaryKey().defaultRandom(),
  workspaceId: uuid("workspace_id").notNull().references(() => workspaces.id, { onDelete: "cascade" }),
  sourceId: text("source_id").notNull(),
  displayName: text("display_name").notNull(),
  profile: jsonb("profile").$type<SyntheticPatientProfile>().notNull(),
  revision: integer("revision").notNull().default(0)
}, (table) => [
  unique("patients_workspace_source_unique").on(table.workspaceId, table.sourceId),
  unique("patients_workspace_id_unique").on(table.workspaceId, table.id)
]);

export const journalEntries = pgTable("journal_entries", {
  id: uuid("id").primaryKey().defaultRandom(),
  workspaceId: uuid("workspace_id").notNull().references(() => workspaces.id, { onDelete: "cascade" }),
  patientId: uuid("patient_id").notNull(),
  sourceId: text("source_id"),
  entryDate: date("entry_date").notNull(),
  rawNote: text("raw_note").notNull(),
  injectionDay: integer("injection_day").notNull().default(0),
  doseChangeDay: integer("dose_change_day").notNull().default(0),
  selfRatedSeverity: integer("self_rated_severity").notNull().default(0),
  sourceType: text("source_type").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
}, (table) => [
  unique("entries_workspace_id_unique").on(table.workspaceId, table.id),
  foreignKey({ columns: [table.workspaceId, table.patientId], foreignColumns: [patients.workspaceId, patients.id] }).onDelete("cascade")
]);

export const wearableMetrics = pgTable("wearable_metrics", {
  id: uuid("id").primaryKey().defaultRandom(),
  workspaceId: uuid("workspace_id").notNull().references(() => workspaces.id, { onDelete: "cascade" }),
  patientId: uuid("patient_id").notNull(),
  metricDate: date("metric_date").notNull(),
  weightLb: integer("weight_lb_tenths"),
  restingHeartRate: integer("resting_heart_rate"),
  sleepHours: integer("sleep_hours_tenths"),
  steps: integer("steps"),
  activeMinutes: integer("active_minutes"),
  strengthTrainingMinutes: integer("strength_training_minutes")
}, (table) => [
  unique("wearables_patient_date_unique").on(table.patientId, table.metricDate),
  foreignKey({ columns: [table.workspaceId, table.patientId], foreignColumns: [patients.workspaceId, patients.id] }).onDelete("cascade")
]);

export const extractionRuns = pgTable("extraction_runs", {
  id: uuid("id").primaryKey().defaultRandom(),
  workspaceId: uuid("workspace_id").notNull().references(() => workspaces.id, { onDelete: "cascade" }),
  entryId: uuid("entry_id").notNull(),
  extractorVersion: text("extractor_version").notNull(),
  sourceHash: text("source_hash").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
}, (table) => [
  unique("extraction_run_entry_unique").on(table.entryId),
  foreignKey({ columns: [table.workspaceId, table.entryId], foreignColumns: [journalEntries.workspaceId, journalEntries.id] }).onDelete("cascade")
]);

export const clinicalSignals = pgTable("clinical_signals", {
  id: uuid("id").primaryKey().defaultRandom(),
  workspaceId: uuid("workspace_id").notNull().references(() => workspaces.id, { onDelete: "cascade" }),
  entryId: uuid("entry_id").notNull(),
  normalizedSymptom: text("normalized_symptom").notNull(),
  assertionStatus: text("assertion_status").notNull(),
  severity: text("severity").notNull(),
  extractorVersion: text("extractor_version").notNull(),
  payload: jsonb("payload").$type<ExtractedClinicalSignal>().notNull()
}, (table) => [
  foreignKey({ columns: [table.workspaceId, table.entryId], foreignColumns: [journalEntries.workspaceId, journalEntries.id] }).onDelete("cascade")
]);

export const reportSnapshots = pgTable("report_snapshots", {
  id: uuid("id").primaryKey().defaultRandom(),
  workspaceId: uuid("workspace_id").notNull().references(() => workspaces.id, { onDelete: "cascade" }),
  patientId: uuid("patient_id").notNull(),
  revision: integer("revision").notNull(),
  windowEnd: date("window_end").notNull(),
  generatorVersion: text("generator_version").notNull(),
  sourceIds: jsonb("source_ids").$type<string[]>().notNull(),
  report: jsonb("report").$type<DoctorReport>().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
}, (table) => [
  unique("report_revision_unique").on(table.patientId, table.revision, table.windowEnd, table.generatorVersion),
  foreignKey({ columns: [table.workspaceId, table.patientId], foreignColumns: [patients.workspaceId, patients.id] }).onDelete("cascade")
]);

export const idempotencyRecords = pgTable("idempotency_records", {
  workspaceId: uuid("workspace_id").notNull().references(() => workspaces.id, { onDelete: "cascade" }),
  clientRequestId: uuid("client_request_id").notNull(),
  payloadHash: text("payload_hash").notNull(),
  entryId: uuid("entry_id").notNull()
}, (table) => [
  unique("idempotency_workspace_key_unique").on(table.workspaceId, table.clientRequestId),
  foreignKey({ columns: [table.workspaceId, table.entryId], foreignColumns: [journalEntries.workspaceId, journalEntries.id] }).onDelete("cascade")
]);
