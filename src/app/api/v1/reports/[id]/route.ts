import { NextRequest } from "next/server";
import { handle, response, sessionFrom } from "@/lib/server/http";
import { getReport } from "@/lib/server/repository";

export const runtime = "nodejs";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  return handle("GET /api/v1/reports/:id", async () => response(await getReport(await sessionFrom(req), (await context.params).id)));
}
