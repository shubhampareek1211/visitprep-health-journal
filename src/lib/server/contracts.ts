import { z } from "zod";

const calendarDate = z.iso.date();

export const previewSchema = z.strictObject({
  date: calendarDate,
  note: z.string().trim().min(1).max(4000),
  injectionDay: z.boolean()
});

export const createEntrySchema = previewSchema.extend({
  clientRequestId: z.uuid()
}).strict();

export const createReportSchema = z.strictObject({ expectedRevision: z.number().int().nonnegative() });

export type CreateEntryInput = z.infer<typeof createEntrySchema>;

export class ServiceError extends Error {
  constructor(public code: string, public status: number, message: string) { super(message); }
}
