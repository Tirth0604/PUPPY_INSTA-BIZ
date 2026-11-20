import { createHash, randomUUID } from "node:crypto";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import type { EnquiryInput } from "./validation";
export class RateLimitError extends Error {}
export class StorageUnavailable extends Error {}
type Result = { id: string; duplicate: boolean };
const keyFor = (s: string) => createHash("sha256").update(s).digest("hex");
export async function saveEnquiry(
  input: EnquiryInput,
  client: string,
): Promise<Result> {
  const { website: _, idempotencyKey: __, ...record } = input;
  void _;
  void __;
  const now = Date.now(),
    bucket = Math.floor(now / 600000),
    date = Math.floor(now / 86400000);
  const secret =
    process.env.RATE_LIMIT_SECRET ||
    (process.env.NODE_ENV === "production" ? "" : "local-demo-only");
  if (!secret) throw new StorageUnavailable("Rate limiter is not configured");
  const clientKey = keyFor(secret + client + bucket),
    fingerprint = keyFor(JSON.stringify(record) + date),
    id = randomUUID(),
    requestKey = input.idempotencyKey || randomUUID();
  if (
    process.env.ENQUIRY_STORAGE === "sqlite" ||
    (!process.env.DATABASE_URL && process.env.NODE_ENV === "development")
  ) {
    const { DatabaseSync } = await import("node:sqlite");
    const path = process.env.LOCAL_DATABASE_PATH || ".local/enquiries.sqlite";
    mkdirSync(dirname(path), { recursive: true, mode: 0o700 });
    const db = new DatabaseSync(path);
    try {
      db.exec(
        "PRAGMA busy_timeout=5000; CREATE TABLE IF NOT EXISTS enquiries(id TEXT PRIMARY KEY, request_key TEXT UNIQUE NOT NULL, fingerprint TEXT UNIQUE NOT NULL, payload TEXT NOT NULL, created_at TEXT NOT NULL); CREATE TABLE IF NOT EXISTS rate_limits(key TEXT PRIMARY KEY, count INTEGER NOT NULL, expires_at INTEGER NOT NULL);",
      );
      db.exec("BEGIN IMMEDIATE");
      const existing = db
        .prepare(
          "SELECT id FROM enquiries WHERE request_key=? OR fingerprint=?",
        )
        .get(requestKey, fingerprint) as { id: string } | undefined;
      if (existing) {
        db.exec("COMMIT");
        return { id: existing.id, duplicate: true };
      }
      db.prepare("DELETE FROM rate_limits WHERE expires_at < ?").run(now);
      const limit = db
        .prepare(
          "INSERT INTO rate_limits(key,count,expires_at) VALUES(?,1,?) ON CONFLICT(key) DO UPDATE SET count=count+1 RETURNING count",
        )
        .get(clientKey, now + 600000) as { count: number };
      if (limit.count > 5) {
        db.exec("COMMIT");
        throw new RateLimitError(
          "Too many enquiries. Try again in ten minutes.",
        );
      }
      db.prepare("INSERT INTO enquiries VALUES(?,?,?,?,?)").run(
        id,
        requestKey,
        fingerprint,
        JSON.stringify(record),
        new Date(now).toISOString(),
      );
      db.exec("COMMIT");
      return { id, duplicate: false };
    } catch (e) {
      try {
        db.exec("ROLLBACK");
      } catch {}
      throw e;
    } finally {
      db.close();
    }
  }
  if (!process.env.DATABASE_URL)
    throw new StorageUnavailable("Database is not configured");
  const { default: postgres } = await import("postgres");
  const sql = postgres(process.env.DATABASE_URL, {
    max: 1,
    prepare: false,
    connect_timeout: 10,
  });
  try {
    return await sql.begin(async (tx) => {
      // Lock by fingerprint so simultaneous retries cannot race the deduplication check.
      await tx`SELECT pg_advisory_xact_lock(hashtextextended(${fingerprint},0))`;
      const old =
        await tx`SELECT id FROM enquiries WHERE request_key=${requestKey} OR fingerprint=${fingerprint}`;
      if (old.length) return { id: old[0].id as string, duplicate: true };
      await tx`DELETE FROM enquiry_rate_limits WHERE expires_at < now()`;
      const count =
        await tx`INSERT INTO enquiry_rate_limits(key,count,expires_at) VALUES(${clientKey},1,now()+interval '10 minutes') ON CONFLICT(key) DO UPDATE SET count=enquiry_rate_limits.count+1 RETURNING count`;
      if (count[0].count > 5)
        throw new RateLimitError(
          "Too many enquiries. Try again in ten minutes.",
        );
      await tx`INSERT INTO enquiries(id,name,phone,email,area,puppy_id,message,source_page,request_key,fingerprint) VALUES(${id},${input.name},${input.phone},${input.email},${input.area},${input.puppyId || null},${input.message},${input.sourcePage},${requestKey},${fingerprint})`;
      return { id, duplicate: false };
    });
  } finally {
    await sql.end({ timeout: 2 });
  }
}
