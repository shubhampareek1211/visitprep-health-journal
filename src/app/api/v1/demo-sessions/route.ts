import { NextRequest, NextResponse } from "next/server";
import { cookieName, handle, inputFrom, response, sessionFrom } from "@/lib/server/http";
import { createWorkspace, deleteWorkspace, getWorkspaceOverview } from "@/lib/server/repository";
import { z } from "zod";
import { ServiceError } from "@/lib/server/contracts";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  return handle("POST /api/v1/demo-sessions", async () => {
    await inputFrom(req, z.strictObject({}));
    try {
      const current = await sessionFrom(req);
      return response(await getWorkspaceOverview(current));
    } catch (error) {
      if (!(error instanceof ServiceError) || (error.code !== "SESSION_REQUIRED" && error.code !== "SESSION_EXPIRED")) throw error;
      const created = await createWorkspace();
      const output = NextResponse.json({ expiresAt: created.expiresAt.toISOString() }, { status: 201 });
      output.cookies.set(cookieName, created.token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", expires: created.expiresAt });
      return output;
    }
  });
}

export async function DELETE(req: NextRequest) {
  return handle("DELETE /api/v1/demo-sessions", async () => {
    if (req.headers.get("origin") !== new URL(req.url).origin) return response({ error: { code: "INVALID_ORIGIN", message: "Invalid origin." } }, 403);
    await deleteWorkspace(await sessionFrom(req));
    const output = NextResponse.json({ deleted: true });
    output.cookies.delete(cookieName);
    return output;
  });
}
