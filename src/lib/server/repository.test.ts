import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { randomUUID } from "node:crypto";
import { eq } from "drizzle-orm";
import { getDb } from "./database";
import { workspaces } from "./schema";
import { cleanupExpired, createReport, createWorkspace, deleteWorkspace, getPatientView, getReport, getWorkspaceOverview, resolveWorkspace, saveJournalEntry } from "./repository";

const integration = process.env.TEST_DATABASE_URL ? describe : describe.skip;

integration("PostgreSQL workspace transactions", () => {
  let first: Awaited<ReturnType<typeof resolveWorkspace>>;
  let second: Awaited<ReturnType<typeof resolveWorkspace>>;
  let firstPatientId: string;

  beforeAll(async () => {
    process.env.DATABASE_URL = process.env.TEST_DATABASE_URL;
    const a = await createWorkspace();
    const b = await createWorkspace();
    first = await resolveWorkspace(a.token);
    second = await resolveWorkspace(b.token);
    firstPatientId = (await getWorkspaceOverview(first)).patients[0].id;
  }, 60_000);

  afterAll(async () => {
    if (first) await deleteWorkspace(first);
    if (second) await deleteWorkspace(second);
  });

  it("seeds five isolated patients with 30 notes and measurements", async () => {
    expect((await getWorkspaceOverview(first)).patients).toHaveLength(5);
    const view = await getPatientView(first, firstPatientId);
    expect(view.entries).toHaveLength(30);
    expect(view.metrics).toHaveLength(30);
    await expect(getPatientView(second, firstPatientId)).rejects.toMatchObject({ status: 404 });
  });

  it("commits a note once for concurrent identical retries", async () => {
    const input = { clientRequestId: randomUUID(), date: "2026-05-30", note: "Severe vomiting today.", injectionDay: false };
    const outcomes = await Promise.all([saveJournalEntry(first, firstPatientId, input), saveJournalEntry(first, firstPatientId, input)]);
    expect(outcomes[0].id).toBe(outcomes[1].id);
    expect(outcomes.filter((item) => item.repeated)).toHaveLength(1);
    const view = await getPatientView(first, firstPatientId);
    expect(view.entries.filter((entry) => entry.sourceType === "custom")).toHaveLength(1);
    expect(view.entries.find((entry) => entry.id === outcomes[0].id)?.signals[0].severity).toBe("severe");
    await expect(saveJournalEntry(first, firstPatientId, { ...input, note: "Different note" })).rejects.toMatchObject({ status: 409 });
  });

  it("keeps a generated report immutable after later notes", async () => {
    const before = await getPatientView(first, firstPatientId);
    const report = await createReport(first, firstPatientId, before.patient.revision);
    await saveJournalEntry(first, firstPatientId, { clientRequestId: randomUUID(), date: "2026-05-31", note: "Nausea returned.", injectionDay: false });
    expect((await getReport(first, report.id)).report).toEqual(report.report);
    await expect(createReport(first, firstPatientId, before.patient.revision)).rejects.toMatchObject({ status: 409 });
    await expect(getReport(second, report.id)).rejects.toMatchObject({ status: 404 });
  });

  it("rejects expired sessions before cleanup", async () => {
    const temporary = await createWorkspace();
    const session = await resolveWorkspace(temporary.token);
    await getDb().update(workspaces).set({ expiresAt: new Date(Date.now() - 1000) }).where(eq(workspaces.id, session.id));
    await expect(resolveWorkspace(temporary.token)).rejects.toMatchObject({ status: 401 });
    expect(await cleanupExpired(1)).toBe(1);
    expect(await getDb().select().from(workspaces).where(eq(workspaces.id, session.id))).toHaveLength(0);
    expect((await getWorkspaceOverview(first)).patients).toHaveLength(5);
  });

  it("does not include historical notes outside the rolling review window", async () => {
    const before = await getPatientView(first, firstPatientId);
    await saveJournalEntry(first, firstPatientId, { clientRequestId: randomUUID(), date: "2026-04-01", note: "Severe nausea was recorded earlier.", injectionDay: false });
    const after = await getPatientView(first, firstPatientId);
    expect(after.entries).toHaveLength(before.entries.length);
    expect(after.analytics.moderateOrSevereDays).toBe(before.analytics.moderateOrSevereDays);
  });
});
