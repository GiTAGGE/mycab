import type { SqlDatabase } from "@/lib/db/sql";

export const LEAD_RETENTION_MONTHS = 24;

export function retentionCutoff(now = new Date()): string {
  const cutoff = new Date(now.getTime());
  cutoff.setUTCMonth(cutoff.getUTCMonth() - LEAD_RETENTION_MONTHS);
  return cutoff.toISOString();
}

export async function purgeExpired(db: SqlDatabase, now = new Date()): Promise<void> {
  const cutoff = retentionCutoff(now);
  const instant = now.toISOString();
  await db.prepare("DELETE FROM leads WHERE created_at < ?").bind(cutoff).run();
  await db.prepare("DELETE FROM conversion_events WHERE created_at < ?").bind(cutoff).run();
  await db.prepare("DELETE FROM rate_limits WHERE reset_at < ?").bind(instant).run();
}
