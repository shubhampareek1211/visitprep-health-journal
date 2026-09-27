import { NextRequest } from "next/server";
import { previewSchema } from "@/lib/server/contracts";
import { handle, inputFrom, response, sessionFrom } from "@/lib/server/http";
import { previewExtraction } from "@/lib/server/repository";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  return handle("POST /api/v1/extractions/preview", async () => {
    await sessionFrom(req);
    const input = await inputFrom(req, previewSchema);
    return response({ signals: previewExtraction(input) });
  });
}
