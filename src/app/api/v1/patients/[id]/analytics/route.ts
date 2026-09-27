import { NextRequest } from "next/server";
import { handle, response, sessionFrom } from "@/lib/server/http";
import { getPatientView } from "@/lib/server/repository";

export const runtime = "nodejs";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  return handle("GET /api/v1/patients/:id/analytics", async () => {
    const view = await getPatientView(await sessionFrom(req), (await context.params).id);
    return response({ patientId: view.patient.id, revision: view.patient.revision, window: view.window, analytics: view.analytics });
  });
}
