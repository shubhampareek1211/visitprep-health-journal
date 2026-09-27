import { NextRequest } from "next/server";
import { createEntrySchema } from "@/lib/server/contracts";
import { handle, inputFrom, response, sessionFrom } from "@/lib/server/http";
import { saveJournalEntry } from "@/lib/server/repository";

export const runtime = "nodejs";

export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  return handle("POST /api/v1/patients/:id/journal-entries", async () => {
    const session = await sessionFrom(req);
    const input = await inputFrom(req, createEntrySchema);
    const result = await saveJournalEntry(session, (await context.params).id, input);
    return response(result, result.repeated ? 200 : 201);
  });
}
