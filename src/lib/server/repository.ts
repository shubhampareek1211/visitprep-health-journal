import { createHash, randomBytes, randomUUID } from "node:crypto";
import { and, eq, inArray, lt, sql } from "drizzle-orm";
import { getDb } from "./database";
import { clinicalSignals, extractionRuns, idempotencyRecords, journalEntries, patients, reportSnapshots, wearableMetrics, workspaces } from "./schema";
import { createEntrySchema, type CreateEntryInput, ServiceError } from "./contracts";
import { seedChecksum, seedDataset } from "./seed";
import { extractClinicalSignals } from "@/lib/nlp";
import type { DoctorReport, ExtractedClinicalSignal, JournalEntry } from "@/types/health";

const EXTRACTOR_VERSION = "rules-v2";
const REPORT_VERSION = "report-v2";
const DAY_MS = 86_400_000;
const sha256 = (value: string) => createHash("sha256").update(value).digest("hex");
const asDay = (value: string) => new Date(`${value}T00:00:00Z`).getTime();
const dateBefore = (value: string, days: number) => new Date(asDay(value) - days * DAY_MS).toISOString().slice(0, 10);

export type Session = { id: string; expiresAt: Date };
export type MetricRecord = typeof wearableMetrics.$inferSelect;
export type EntryRecord = typeof journalEntries.$inferSelect;
export type EntryView = EntryRecord & { signals: ExtractedClinicalSignal[] };

function extract(entry: Pick<JournalEntry, "day" | "date" | "rawJournalNote" | "injectionDay" | "doseChangeDay" | "selfRatedSeverity">, entryId: string) {
  const input: JournalEntry = {
    ...entry,
    annotatedSymptoms: [],
    wearableMetrics: { weightLb: 0, restingHeartRate: 0, sleepHours: 0, steps: 0, activeMinutes: 0, strengthTrainingMinutes: 0 }
  };
  return extractClinicalSignals(input, { includeInactive: true }).map((signal) => ({ ...signal, entryId }));
}

export function previewExtraction(input: { date: string; note: string; injectionDay: boolean }) {
  return extract({ day: 0, date: input.date, rawJournalNote: input.note, injectionDay: input.injectionDay, doseChangeDay: false, selfRatedSeverity: 0 }, "preview");
}

export async function createWorkspace() {
  const token = randomBytes(32).toString("base64url");
  const workspaceId = randomUUID();
  const expiresAt = new Date(Date.now() + DAY_MS);
  const db = getDb();
  await db.transaction(async (tx) => {
    await tx.insert(workspaces).values({ id: workspaceId, tokenHash: sha256(token), seedVersion: seedDataset.metadata.version, seedChecksum, expiresAt });
    const patientRows: Array<typeof patients.$inferInsert> = [];
    const entryRows: Array<typeof journalEntries.$inferInsert> = [];
    const metricRows: Array<typeof wearableMetrics.$inferInsert> = [];
    const runRows: Array<typeof extractionRuns.$inferInsert> = [];
    const signalRows: Array<typeof clinicalSignals.$inferInsert> = [];

    for (const sourcePatient of seedDataset.patients) {
      const patientId = randomUUID();
      patientRows.push({ id: patientId, workspaceId, sourceId: sourcePatient.id, displayName: sourcePatient.displayName, profile: sourcePatient.syntheticPatientProfile });
      for (const sourceEntry of sourcePatient.journalEntries) {
        const entryId = randomUUID();
        entryRows.push({ id: entryId, workspaceId, patientId, sourceId: `${sourcePatient.id}-${sourceEntry.day}`, entryDate: sourceEntry.date, rawNote: sourceEntry.rawJournalNote, injectionDay: Number(sourceEntry.injectionDay), doseChangeDay: Number(sourceEntry.doseChangeDay), selfRatedSeverity: sourceEntry.selfRatedSeverity, sourceType: "seed" });
        const metric = sourceEntry.wearableMetrics;
        metricRows.push({ workspaceId, patientId, metricDate: sourceEntry.date, weightLb: metric.weightLb == null ? null : Math.round(metric.weightLb * 10), restingHeartRate: metric.restingHeartRate, sleepHours: metric.sleepHours == null ? null : Math.round(metric.sleepHours * 10), steps: metric.steps, activeMinutes: metric.activeMinutes, strengthTrainingMinutes: metric.strengthTrainingMinutes });
        runRows.push({ workspaceId, entryId, extractorVersion: EXTRACTOR_VERSION, sourceHash: sha256(sourceEntry.rawJournalNote) });
        for (const signal of extract(sourceEntry, entryId)) {
          signalRows.push({ workspaceId, entryId, normalizedSymptom: signal.normalizedSymptom, assertionStatus: signal.assertionStatus, severity: signal.severity, extractorVersion: EXTRACTOR_VERSION, payload: signal });
        }
      }
    }
    await tx.insert(patients).values(patientRows);
    await tx.insert(journalEntries).values(entryRows);
    await tx.insert(wearableMetrics).values(metricRows);
    await tx.insert(extractionRuns).values(runRows);
    if (signalRows.length) await tx.insert(clinicalSignals).values(signalRows);
  });
  return { token, expiresAt };
}

export async function resolveWorkspace(token: string | undefined): Promise<Session> {
  if (!token) throw new ServiceError("SESSION_REQUIRED", 401, "Start a new demo session.");
  const [workspace] = await getDb().select({ id: workspaces.id, expiresAt: workspaces.expiresAt })
    .from(workspaces).where(eq(workspaces.tokenHash, sha256(token))).limit(1);
  if (!workspace || workspace.expiresAt.getTime() <= Date.now()) {
    throw new ServiceError("SESSION_EXPIRED", 401, "This demo session has expired. Start a new one.");
  }
  return workspace;
}

export async function deleteWorkspace(session: Session) {
  await getDb().delete(workspaces).where(eq(workspaces.id, session.id));
}

export async function cleanupExpired(limit = 100) {
  const deleted = await getDb().execute(sql`WITH expired AS (
    SELECT id FROM demo_workspaces WHERE expires_at < now() ORDER BY expires_at LIMIT ${limit} FOR UPDATE SKIP LOCKED
  ) DELETE FROM demo_workspaces WHERE id IN (SELECT id FROM expired) RETURNING id`);
  return deleted.rowCount ?? 0;
}

export async function getWorkspaceOverview(session: Session) {
  const rows = await getDb().select({ id: patients.id, sourceId: patients.sourceId, displayName: patients.displayName, profile: patients.profile, revision: patients.revision })
    .from(patients).where(eq(patients.workspaceId, session.id));
  return { expiresAt: session.expiresAt.toISOString(), seedVersion: seedDataset.metadata.version, syntheticDataNotice: seedDataset.metadata.syntheticDataNotice, patients: rows };
}

export type MetricTrend = { firstValue: number | null; lastValue: number | null; change: number | null; firstWeekAverage: number | null; lastWeekAverage: number | null; averageChange: number | null; observationCount: number };

function metricTrend(rows: MetricRecord[], key: "weightLb" | "restingHeartRate" | "sleepHours" | "steps" | "activeMinutes" | "strengthTrainingMinutes", windowStart: string, windowEnd: string): MetricTrend {
  const value = (row: MetricRecord) => {
    const raw = row[key];
    return raw == null ? null : key === "weightLb" || key === "sleepHours" ? raw / 10 : raw;
  };
  const observations = rows.filter((row) => value(row) != null);
  const average = (items: MetricRecord[]) => {
    const numbers = items.map(value).filter((item): item is number => item != null);
    return numbers.length ? Math.round(numbers.reduce((sum, item) => sum + item, 0) / numbers.length * 10) / 10 : null;
  };
  const first = observations.length ? value(observations[0]) : null;
  const last = observations.length ? value(observations[observations.length - 1]) : null;
  const firstWeekAverage = average(observations.filter((row) => row.metricDate <= dateBefore(windowStart, -6)));
  const lastWeekAverage = average(observations.filter((row) => row.metricDate >= dateBefore(windowEnd, 6)));
  return { firstValue: first, lastValue: last, change: first == null || last == null ? null : Math.round((last - first) * 10) / 10,
    firstWeekAverage, lastWeekAverage, averageChange: firstWeekAverage == null || lastWeekAverage == null ? null : Math.round((lastWeekAverage - firstWeekAverage) * 10) / 10,
    observationCount: observations.length };
}

function countNames(items: string[]) {
  const counts = new Map<string, number>();
  for (const item of items) counts.set(item, (counts.get(item) ?? 0) + 1);
  return [...counts].map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function deriveAnalytics(entries: EntryView[], metrics: MetricRecord[], windowStart: string, windowEnd: string) {
  const present = entries.flatMap((entry) => entry.signals.filter((signal) => signal.assertionStatus === "present").map((signal) => ({ ...signal, date: entry.entryDate })));
  const uncertain = entries.flatMap((entry) => entry.signals.filter((signal) => signal.assertionStatus === "uncertain"));
  const symptomDays = new Map<string, Set<string>>();
  for (const signal of present) {
    const set = symptomDays.get(signal.normalizedSymptom) ?? new Set<string>();
    set.add(signal.date);
    symptomDays.set(signal.normalizedSymptom, set);
  }
  const symptomDayFrequency = [...symptomDays].map(([name, days]) => ({ name, count: days.size })).sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  const keys = ["weightLb", "restingHeartRate", "sleepHours", "steps", "activeMinutes", "strengthTrainingMinutes"] as const;
  const wearableTrends = Object.fromEntries(keys.map((key) => [key, metricTrend(metrics, key, windowStart, windowEnd)])) as Record<(typeof keys)[number], MetricTrend>;
  return { noteCount: entries.length, mentionCount: present.length, uncertainMentionCount: uncertain.length, symptomFrequency: countNames(present.map((signal) => signal.normalizedSymptom)), symptomDayFrequency,
    moderateOrSevereDays: new Set(present.filter((signal) => signal.severity === "moderate" || signal.severity === "severe").map((signal) => signal.date)).size,
    injectionAdjacentMentionCount: present.filter((signal) => signal.relatedToInjection).length, wearableTrends };
}

export async function getPatientView(session: Session, patientId: string) {
  const db = getDb();
  return db.transaction(async (tx) => {
    await tx.execute(sql`SET TRANSACTION ISOLATION LEVEL REPEATABLE READ READ ONLY`);
    const [patient] = await tx.select().from(patients).where(and(eq(patients.workspaceId, session.id), eq(patients.id, patientId))).limit(1);
    if (!patient) throw new ServiceError("NOT_FOUND", 404, "Patient not found.");
    const allEntries = await tx.select().from(journalEntries).where(and(eq(journalEntries.workspaceId, session.id), eq(journalEntries.patientId, patientId)));
    const allMetrics = await tx.select().from(wearableMetrics).where(and(eq(wearableMetrics.workspaceId, session.id), eq(wearableMetrics.patientId, patientId)));
    const patientEntryIds = tx.select({ id: journalEntries.id }).from(journalEntries)
      .where(and(eq(journalEntries.workspaceId, session.id), eq(journalEntries.patientId, patientId)));
    const allSignals = await tx.select().from(clinicalSignals)
      .where(and(eq(clinicalSignals.workspaceId, session.id), inArray(clinicalSignals.entryId, patientEntryIds)));
    const latest = [...allEntries.map((row) => row.entryDate), ...allMetrics.map((row) => row.metricDate)].sort().at(-1) ?? "2026-05-30";
    const start = dateBefore(latest, 29);
    const signalsByEntry = new Map<string, ExtractedClinicalSignal[]>();
    for (const row of allSignals) signalsByEntry.set(row.entryId, [...(signalsByEntry.get(row.entryId) ?? []), row.payload]);
    const entries = allEntries.filter((row) => row.entryDate >= start && row.entryDate <= latest)
      .sort((a, b) => b.entryDate.localeCompare(a.entryDate) || b.createdAt.getTime() - a.createdAt.getTime())
      .map((row) => ({ ...row, signals: signalsByEntry.get(row.id) ?? [] }));
    const metrics = allMetrics.filter((row) => row.metricDate >= start && row.metricDate <= latest)
      .sort((a, b) => a.metricDate.localeCompare(b.metricDate));
    return { patient, entries, metrics, window: { start, end: latest, days: 30 }, analytics: deriveAnalytics(entries, metrics, start, latest), expiresAt: session.expiresAt.toISOString() };
  });
}

export async function saveJournalEntry(session: Session, patientId: string, input: CreateEntryInput) {
  const parsed = createEntrySchema.parse(input);
  const payloadHash = sha256(JSON.stringify({ patientId, date: parsed.date, note: parsed.note, injectionDay: parsed.injectionDay }));
  const id = randomUUID();
  const signals = extract({ day: 0, date: parsed.date, rawJournalNote: parsed.note, injectionDay: parsed.injectionDay, doseChangeDay: false, selfRatedSeverity: 0 }, id);
  return getDb().transaction(async (tx) => {
    const locked = await tx.execute(sql`SELECT id FROM demo_workspaces WHERE id = ${session.id} AND expires_at > now() FOR UPDATE`);
    if (!locked.rowCount) throw new ServiceError("SESSION_EXPIRED", 401, "This demo session has expired. Start a new one.");
    const [existing] = await tx.select().from(idempotencyRecords).where(and(eq(idempotencyRecords.workspaceId, session.id), eq(idempotencyRecords.clientRequestId, parsed.clientRequestId))).limit(1);
    if (existing) {
      if (existing.payloadHash !== payloadHash) throw new ServiceError("IDEMPOTENCY_CONFLICT", 409, "Request ID was already used with different content.");
      return { id: existing.entryId, repeated: true };
    }
    const [patient] = await tx.select().from(patients).where(and(eq(patients.workspaceId, session.id), eq(patients.id, patientId))).limit(1);
    if (!patient) throw new ServiceError("NOT_FOUND", 404, "Patient not found.");
    const [usage] = await tx.select({ count: sql<number>`count(*)::int` }).from(journalEntries).where(and(eq(journalEntries.workspaceId, session.id), eq(journalEntries.sourceType, "custom")));
    if (usage.count >= 100) throw new ServiceError("NOTE_LIMIT", 429, "This demo has reached its note limit.");
    await tx.insert(journalEntries).values({ id, workspaceId: session.id, patientId, entryDate: parsed.date, rawNote: parsed.note, injectionDay: Number(parsed.injectionDay), sourceType: "custom" });
    await tx.insert(extractionRuns).values({ workspaceId: session.id, entryId: id, extractorVersion: EXTRACTOR_VERSION, sourceHash: sha256(parsed.note) });
    if (signals.length) await tx.insert(clinicalSignals).values(signals.map((signal) => ({ workspaceId: session.id, entryId: id, normalizedSymptom: signal.normalizedSymptom, assertionStatus: signal.assertionStatus, severity: signal.severity, extractorVersion: EXTRACTOR_VERSION, payload: signal })));
    await tx.insert(idempotencyRecords).values({ workspaceId: session.id, clientRequestId: parsed.clientRequestId, payloadHash, entryId: id });
    await tx.update(patients).set({ revision: sql`${patients.revision} + 1` }).where(eq(patients.id, patientId));
    return { id, repeated: false };
  });
}

function reportForView(view: Awaited<ReturnType<typeof getPatientView>>): DoctorReport {
  const { patient, entries, window, analytics, metrics } = view;
  const top = analytics.symptomDayFrequency.slice(0, 3);
  const selected = entries.filter((entry) => entry.signals.some((signal) => signal.assertionStatus === "present"))
    .sort((a, b) => b.signals.filter((signal) => signal.severity === "severe" || signal.severity === "moderate").length - a.signals.filter((signal) => signal.severity === "severe" || signal.severity === "moderate").length)
    .slice(0, 5);
  const formatChange = (value: number | null, unit: string) => value == null ? "Unavailable (no comparable measurements)" : `${value > 0 ? "+" : ""}${value} ${unit}`;
  return {
    patientId: patient.id, patientLabel: patient.displayName, dateRange: `${window.start} to ${window.end}`,
    syntheticDataNotice: seedDataset.metadata.syntheticDataNotice,
    snapshot: [
      `${analytics.noteCount} patient-reported notes were recorded in this 30-day review window.`,
      top.length ? `Most frequent reported symptoms by distinct day: ${top.map((item) => `${item.name} (${item.count} days)`).join(", ")}.` : "No present tracked symptom mentions were found.",
      `${analytics.moderateOrSevereDays} days included a moderate or severe reported symptom.`,
      `${analytics.uncertainMentionCount} uncertain mentions were recorded separately.`
    ],
    snapshotMetrics: {
      reviewDays: window.days,
      injectionDays: new Set(entries.filter((entry) => entry.injectionDay).map((entry) => entry.entryDate)).size,
      moderateOrSevereDays: analytics.moderateOrSevereDays,
      weightChangeLb: analytics.wearableTrends.weightLb.change
    },
    medicationContext: [`Injection days documented: ${new Set(entries.filter((entry) => entry.injectionDay).map((entry) => entry.entryDate)).size}.`,
      `Dose-change days documented: ${new Set(entries.filter((entry) => entry.doseChangeDay).map((entry) => entry.entryDate)).size}.`,
      `${analytics.injectionAdjacentMentionCount} present symptom mentions overlapped with documented injection context.`],
    symptomHighlights: top,
    wearableHighlights: [
      `Weight change: ${formatChange(analytics.wearableTrends.weightLb.change, "lb")}.`,
      `Sleep average change: ${formatChange(analytics.wearableTrends.sleepHours.averageChange, "hours")}.`,
      `Steps average change: ${formatChange(analytics.wearableTrends.steps.averageChange, "steps")}.`,
      `Resting heart rate average change: ${formatChange(analytics.wearableTrends.restingHeartRate.averageChange, "bpm")}.`,
      `${metrics.length} days have wearable-style records in this window.`
    ],
    evidenceNotes: selected.map((entry) => ({ day: Math.round((asDay(entry.entryDate) - asDay(window.start)) / DAY_MS) + 1, date: entry.entryDate, note: entry.rawNote,
      symptoms: [...new Set(entry.signals.filter((signal) => signal.assertionStatus === "present").map((signal) => signal.normalizedSymptom))],
      signals: entry.signals.filter((signal) => signal.assertionStatus === "present").map((signal) => ({ symptom: signal.normalizedSymptom, severity: signal.severity, matchedText: signal.matchedText })),
      injectionDay: Boolean(entry.injectionDay), doseChangeDay: Boolean(entry.doseChangeDay) })),
    discussionPrompts: top.length ? [`May be useful to discuss the timing and impact of reported ${top[0].name} with a clinician.`] : ["May be useful to discuss any untracked symptoms or concerns with a clinician."],
    safetyDisclaimer: "This report organizes synthetic patient-reported notes and wearable-style metrics for review. It does not diagnose, determine causality, recommend treatment changes, or replace clinician judgment."
  };
}

export async function createReport(session: Session, patientId: string, expectedRevision: number) {
  const view = await getPatientView(session, patientId);
  if (view.patient.revision !== expectedRevision) throw new ServiceError("STALE_REVISION", 409, "Patient data changed. Refresh before generating the report.");
  return getDb().transaction(async (tx) => {
    const locked = await tx.execute(sql`SELECT revision FROM patients WHERE workspace_id = ${session.id} AND id = ${patientId} FOR UPDATE`);
    const revision = locked.rows[0]?.revision;
    if (revision !== expectedRevision) throw new ServiceError("STALE_REVISION", 409, "Patient data changed. Refresh before generating the report.");
    const [existing] = await tx.select().from(reportSnapshots).where(and(eq(reportSnapshots.workspaceId, session.id), eq(reportSnapshots.patientId, patientId), eq(reportSnapshots.revision, expectedRevision), eq(reportSnapshots.windowEnd, view.window.end), eq(reportSnapshots.generatorVersion, REPORT_VERSION))).limit(1);
    if (existing) return existing;
    const [usage] = await tx.select({ count: sql<number>`count(*)::int` }).from(reportSnapshots).where(eq(reportSnapshots.workspaceId, session.id));
    if (usage.count >= 20) throw new ServiceError("REPORT_LIMIT", 429, "This demo has reached its report limit.");
    const [created] = await tx.insert(reportSnapshots).values({ workspaceId: session.id, patientId, revision: expectedRevision, windowEnd: view.window.end, generatorVersion: REPORT_VERSION,
      sourceIds: view.entries.map((entry) => entry.id), report: reportForView(view) }).returning();
    return created;
  });
}

export async function getReport(session: Session, reportId: string) {
  const [report] = await getDb().select().from(reportSnapshots).where(and(eq(reportSnapshots.workspaceId, session.id), eq(reportSnapshots.id, reportId))).limit(1);
  if (!report) throw new ServiceError("NOT_FOUND", 404, "Report not found.");
  return report;
}
