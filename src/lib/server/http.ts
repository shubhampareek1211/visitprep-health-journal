import { randomUUID } from "node:crypto";
import { ZodError, type ZodType } from "zod";
import type { NextRequest } from "next/server";
import { resolveWorkspace } from "./repository";
import { ServiceError } from "./contracts";

export const cookieName = process.env.NODE_ENV === "production" ? "__Host-visitprep" : "visitprep-demo";

export function response(data: unknown, status = 200, requestId?: string) {
  return Response.json(data, { status, headers: {
    "Cache-Control": "private, no-store",
    ...(requestId ? { "X-Request-ID": requestId } : {})
  } });
}

export async function sessionFrom(req: NextRequest) {
  return resolveWorkspace(req.cookies.get(cookieName)?.value);
}

export async function inputFrom<T>(req: NextRequest, schema: ZodType<T>): Promise<T> {
  if (req.headers.get("content-type")?.split(";")[0].trim() !== "application/json") {
    throw new ServiceError("INVALID_CONTENT_TYPE", 400, "Send a JSON request body.");
  }
  if (req.headers.get("origin") !== new URL(req.url).origin) {
    throw new ServiceError("INVALID_ORIGIN", 403, "This request must come from the VisitPrep application.");
  }
  if (Number(req.headers.get("content-length") ?? 0) > 32_768) {
    throw new ServiceError("REQUEST_TOO_LARGE", 413, "Request body is too large.");
  }
  const reader = req.body?.getReader();
  if (!reader) throw new ServiceError("INVALID_JSON", 400, "Request body must be valid JSON.");
  const decoder = new TextDecoder("utf-8", { fatal: true });
  let size = 0;
  let text = "";
  try {
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      size += chunk.value.byteLength;
      if (size > 32_768) {
        await reader.cancel();
        throw new ServiceError("REQUEST_TOO_LARGE", 413, "Request body is too large.");
      }
      text += decoder.decode(chunk.value, { stream: true });
    }
    text += decoder.decode();
  } catch (error) {
    if (error instanceof ServiceError) throw error;
    throw new ServiceError("INVALID_JSON", 400, "Request body must be valid JSON.");
  }
  let body: unknown;
  try { body = JSON.parse(text); }
  catch { throw new ServiceError("INVALID_JSON", 400, "Request body must be valid JSON."); }
  return schema.parse(body);
}

function isDatabaseUnavailable(error: unknown) {
  const code = typeof error === "object" && error !== null && "code" in error ? String(error.code) : "";
  return code.startsWith("08") || ["ECONNREFUSED", "ETIMEDOUT", "57P01", "57P02", "57P03", "53300"].includes(code) ||
    (error instanceof Error && error.message === "DATABASE_URL is required for VisitPrep server routes");
}

export async function handle(route: string, operation: (requestId: string) => Promise<Response>) {
  const requestId = randomUUID();
  const start = Date.now();
  let status = 500;
  try {
    const result = await operation(requestId);
    status = result.status;
    result.headers.set("X-Request-ID", requestId);
    result.headers.set("Cache-Control", "private, no-store");
    return result;
  } catch (error) {
    const known = error instanceof ServiceError;
    const validation = error instanceof ZodError;
    const unavailable = isDatabaseUnavailable(error);
    status = known ? error.status : validation ? 400 : unavailable ? 503 : 500;
    const code = known ? error.code : validation ? "VALIDATION_ERROR" : unavailable ? "SERVICE_UNAVAILABLE" : "INTERNAL_ERROR";
    const message = known ? error.message : validation ? "Check the submitted fields." : unavailable ? "The service is temporarily unavailable. Try again." : "The request could not be completed.";
    return response({ error: { code, message, requestId, ...(validation ? { fieldErrors: error.flatten().fieldErrors } : {}) } }, status, requestId);
  } finally {
    console.info(JSON.stringify({ requestId, route, status, durationMs: Date.now() - start, deployment: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 12) ?? "local" }));
  }
}
