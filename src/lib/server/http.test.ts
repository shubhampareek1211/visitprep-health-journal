import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { z } from "zod";
import { handle, inputFrom } from "./http";

const schema = z.strictObject({ note: z.string() });
const request = (body: string, origin = "http://localhost:3000") => new NextRequest("http://localhost:3000/api/v1/extractions/preview", {
  method: "POST", headers: { "Content-Type": "application/json", Origin: origin }, body
});

describe("HTTP request boundaries", () => {
  it("rejects cross-origin writes", async () => {
    await expect(inputFrom(request('{"note":"safe"}', "https://other.example"), schema))
      .rejects.toMatchObject({ code: "INVALID_ORIGIN", status: 403 });
  });

  it("rejects oversized streamed bodies", async () => {
    await expect(inputFrom(request(JSON.stringify({ note: "x".repeat(33_000) })), schema))
      .rejects.toMatchObject({ code: "REQUEST_TOO_LARGE", status: 413 });
  });

  it("reports unexpected faults as 500 with an opaque request ID", async () => {
    const result = await handle("test", async () => { throw new Error("private detail"); });
    expect(result.status).toBe(500);
    const payload = await result.json();
    expect(payload.error.code).toBe("INTERNAL_ERROR");
    expect(payload.error.message).not.toContain("private detail");
    expect(result.headers.get("X-Request-ID")).toBe(payload.error.requestId);
  });
});
