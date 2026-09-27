import { NextRequest } from "next/server";
import { handle, response, sessionFrom } from "@/lib/server/http";
import { getPatientView } from "@/lib/server/repository";

export const runtime = "nodejs";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  return handle("GET /api/v1/patients/:id", async () => response(await getPatientView(await sessionFrom(req), (await context.params).id)));
}
