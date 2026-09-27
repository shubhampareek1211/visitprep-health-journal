import { NextRequest } from "next/server";
import { createReportSchema } from "@/lib/server/contracts";
import { handle, inputFrom, response, sessionFrom } from "@/lib/server/http";
import { createReport } from "@/lib/server/repository";

export const runtime = "nodejs";

export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  return handle("POST /api/v1/patients/:id/reports", async () => {
    const session = await sessionFrom(req);
    const input = await inputFrom(req, createReportSchema);
    return response(await createReport(session, (await context.params).id, input.expectedRevision));
  });
}
