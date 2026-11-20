import { describe, it, expect, beforeEach, afterAll } from "vitest";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import { DatabaseSync } from "node:sqlite";
import { POST } from "@/app/api/enquiries/route";
import { puppies } from "@/lib/catalogue";
const dir = mkdtempSync(join(tmpdir(), "teddy-tests-"));
let sequence = 0;
beforeEach(() => {
  process.env.ENQUIRY_STORAGE = "sqlite";
  process.env.RATE_LIMIT_SECRET = "test-only";
  process.env.LOCAL_DATABASE_PATH = join(dir, `${sequence++}.sqlite`);
});
afterAll(() => rmSync(dir, { recursive: true, force: true }));
const valid = {
  name: "Demo Tester",
  phone: "+971501234567",
  puppyId: puppies[0].id,
  idempotencyKey: randomUUID(),
};
function post(data: unknown, headers: Record<string, string> = {}) {
  return POST(
    new Request("http://localhost/api/enquiries", {
      method: "POST",
      headers: { "content-type": "application/json", ...headers },
      body: JSON.stringify(data),
    }),
  );
}
describe("independent enquiry API", () => {
  it("persists validated details before reporting success", async () => {
    const res = await post(valid);
    expect(res.status).toBe(201);
    const result = await res.json();
    expect(result.success).toBe(true);
    const db = new DatabaseSync(process.env.LOCAL_DATABASE_PATH!);
    const row = db
      .prepare("SELECT payload FROM enquiries WHERE id=?")
      .get(result.id) as { payload: string };
    expect(JSON.parse(row.payload).puppyId).toBe(puppies[0].id);
    db.close();
  });
  it("does not duplicate retries", async () => {
    await post(valid);
    const retry = await post(valid);
    expect(retry.status).toBe(200);
    expect((await retry.json()).duplicate).toBe(true);
  });
  it("deduplicates equal content with a new request key", async () => {
    await post(valid);
    const retry = await post({ ...valid, idempotencyKey: randomUUID() });
    expect((await retry.json()).duplicate).toBe(true);
  });
  it("rejects invalid details", async () =>
    expect((await post({ name: "x", phone: "bad" })).status).toBe(422));
  it("rejects unknown puppy IDs", async () =>
    expect((await post({ ...valid, puppyId: randomUUID() })).status).toBe(422));
  it("rejects honeypot without storage", async () => {
    const r = await post({ ...valid, website: "spam" });
    expect(r.status).toBe(400);
  });
  it("limits distinct submissions persistently", async () => {
    for (let i = 0; i < 5; i++)
      expect(
        (
          await post({
            ...valid,
            message: "Test " + i,
            idempotencyKey: randomUUID(),
          })
        ).status,
      ).toBe(201);
    expect(
      (await post({ ...valid, message: "sixth", idempotencyKey: randomUUID() }))
        .status,
    ).toBe(429);
  });
  it("reports unavailable storage without false success", async () => {
    process.env.LOCAL_DATABASE_PATH = dir;
    const r = await post(valid);
    expect(r.status).toBe(503);
    expect((await r.json()).success).toBe(false);
  });
  it("rejects cross-origin submissions", async () =>
    expect(
      (await post(valid, { origin: "https://example.invalid" })).status,
    ).toBe(403));
  it("rejects a malformed origin", async () =>
    expect((await post(valid, { origin: "invalid-origin" })).status).toBe(403));
  it("accepts same-host requests behind Next's local proxy", async () =>
    expect(
      (await post(valid, { origin: "http://127.0.0.1", host: "127.0.0.1" }))
        .status,
    ).toBe(201));
  it("rejects oversized requests", async () =>
    expect((await post({ ...valid, message: "x".repeat(17000) })).status).toBe(
      413,
    ));
  it("rejects invalid JSON", async () =>
    expect(
      (
        await POST(
          new Request("http://localhost/api/enquiries", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: "{",
          }),
        )
      ).status,
    ).toBe(400));
  it("rejects unsupported content type", async () =>
    expect((await post(valid, { "content-type": "text/plain" })).status).toBe(
      415,
    ));
});
