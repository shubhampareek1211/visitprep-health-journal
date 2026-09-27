import { NextRequest } from "next/server";
import { handle, response, sessionFrom } from "@/lib/server/http";
import { getWorkspaceOverview } from "@/lib/server/repository";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  return handle("GET /api/v1/workspace", async () => response(await getWorkspaceOverview(await sessionFrom(req))));
}
