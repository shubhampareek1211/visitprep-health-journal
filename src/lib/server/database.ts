import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

const globalForDb = globalThis as unknown as { visitprepPool?: Pool };

export function getPool() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required for VisitPrep server routes");
  globalForDb.visitprepPool ??= new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 5,
    connectionTimeoutMillis: 5_000,
    idleTimeoutMillis: 10_000,
    statement_timeout: 10_000,
    query_timeout: 12_000
  });
  return globalForDb.visitprepPool;
}

export function getDb() {
  return drizzle(getPool(), { schema });
}
