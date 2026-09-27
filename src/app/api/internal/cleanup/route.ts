import { NextRequest } from "next/server";
import { cleanupExpired } from "@/lib/server/repository";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) return new Response(null, { status: 401 });
  const deleted = await cleanupExpired(100);
  console.info(JSON.stringify({ route: "cleanup", deleted }));
  return Response.json({ deleted });
}
