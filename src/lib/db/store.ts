import { randomUUID } from "crypto";
import path from "path";
import { emptyAttribution } from "@/lib/attribution";
import type { SqlDatabase } from "@/lib/db/sql";
import type {
  Attribution,
  ConversionEvent,
  ConversionStatus,
  Lead,
  LeadFilters,
  LeadStats,
  LeadStatus,
  TripKind,
} from "@/types";

const HOURLY_LEAD_CAP = 10;
const leadsPath = path.join(process.cwd(), ".data", "leads.json");

type LeadDraft = Omit<Lead, "id" | "createdAt" | "updatedAt" | "status" | "notes" | "fbclid" | "gbraid" | "wbraid"> & {
  notes?: string | null;
  fbclid?: string | null;
  gbraid?: string | null;
  wbraid?: string | null;
};

type FileShape = {
  leads: Lead[];
  conversions: ConversionEvent[];
  rates: Record<string, { count: number; resetAt: string }>;
};

type LeadRow = {
  id: string;
  created_at: string;
  updated_at: string;
  status: LeadStatus;
  origin_label: string;
  destination_label: string;
  date: string | null;
  return_date: string | null;
  passengers: number;
  vehicle_id: string | null;
  estimated_fare: number | null;
  intent: TripKind;
  landing_page: string | null;
  source: string | null;
  campaign: string | null;
  keyword: string | null;
  gclid: string | null;
  fbclid: string | null;
  gbraid: string | null;
  wbraid: string | null;
  notes: string | null;
  attribution_json: string;
  whatsapp_url: string;
};

type ConversionRow = {
  id: string;
  lead_id: string;
  destination: "ga4" | "meta";
  event_name: string;
  event_id: string;
  status: ConversionStatus;
  payload_json: string;
  error: string | null;
  created_at: string;
};

const memory: FileShape = { leads: [], conversions: [], rates: {} };
let memoryLoaded = false;

function blankFile(): FileShape {
  return { leads: [], conversions: [], rates: {} };
}

function parseAttribution(raw: string | Attribution | undefined): Attribution {
  if (!raw) return emptyAttribution();
  if (typeof raw === "object") return { ...emptyAttribution(), ...raw };
  try {
    return { ...emptyAttribution(), ...JSON.parse(raw) };
  } catch {
    return emptyAttribution();
  }
}

function finishLead(input: LeadDraft): Lead {
  const now = new Date().toISOString();
  return {
    ...input,
    id: randomUUID().slice(0, 8).toUpperCase(),
    createdAt: now,
    updatedAt: now,
    status: "new",
    notes: input.notes ?? null,
    fbclid: input.fbclid ?? input.attribution.fbclid,
    gbraid: input.gbraid ?? input.attribution.gbraid,
    wbraid: input.wbraid ?? input.attribution.wbraid,
    gclid: input.gclid ?? input.attribution.gclid,
  };
}

function rowToLead(row: LeadRow): Lead {
  return {
    id: row.id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    status: row.status,
    originLabel: row.origin_label,
    destinationLabel: row.destination_label,
    date: row.date,
    returnDate: row.return_date,
    passengers: row.passengers,
    vehicleId: row.vehicle_id,
    estimatedFare: row.estimated_fare,
    intent: row.intent,
    landingPage: row.landing_page,
    source: row.source,
    campaign: row.campaign,
    keyword: row.keyword,
    gclid: row.gclid,
    fbclid: row.fbclid,
    gbraid: row.gbraid,
    wbraid: row.wbraid,
    notes: row.notes,
    attribution: parseAttribution(row.attribution_json),
    whatsappUrl: row.whatsapp_url,
  };
}

function rowToConversion(row: ConversionRow): ConversionEvent {
  return {
    id: row.id,
    leadId: row.lead_id,
    destination: row.destination,
    eventName: row.event_name,
    eventId: row.event_id,
    status: row.status,
    payloadJson: row.payload_json,
    error: row.error,
    createdAt: row.created_at,
  };
}

async function loadCloudflareDb(): Promise<SqlDatabase | null> {
  const { getCloudflareContext } = await import("@opennextjs/cloudflare");
  const { env } = await getCloudflareContext({ async: true });
  const db = env.DB;
  if (!db || typeof db.prepare !== "function") return null;
  return db;
}

let dbPromise: Promise<SqlDatabase | null> | null = null;

async function getDb(): Promise<SqlDatabase | null> {
  if (process.env.LEAD_STORE === "file") return null;
  if (!dbPromise) {
    dbPromise = loadCloudflareDb()
      .then((db) => {
        if (!db) dbPromise = null;
        return db;
      })
      .catch(() => {
        dbPromise = null;
        return null;
      });
  }
  try {
    return await Promise.race([
      dbPromise,
      new Promise<null>((resolve) => setTimeout(() => resolve(null), 8000)),
    ]);
  } catch {
    return null;
  }
}

async function readFileStore(): Promise<FileShape> {
  if (memoryLoaded) return memory;
  try {
    const { readFile } = await import("fs/promises");
    const raw = await readFile(leadsPath, "utf8");
    const parsed = JSON.parse(raw) as FileShape | Lead[];
    const next = Array.isArray(parsed)
      ? { leads: parsed, conversions: [], rates: {} }
      : {
          leads: parsed.leads ?? [],
          conversions: parsed.conversions ?? [],
          rates: parsed.rates ?? {},
        };
    memory.leads = next.leads.map((lead) => ({
      ...lead,
      fbclid: lead.fbclid ?? lead.attribution?.fbclid ?? null,
      gbraid: lead.gbraid ?? lead.attribution?.gbraid ?? null,
      wbraid: lead.wbraid ?? lead.attribution?.wbraid ?? null,
      notes: lead.notes ?? null,
      updatedAt: lead.updatedAt ?? lead.createdAt,
      attribution: parseAttribution(lead.attribution),
    }));
    memory.conversions = next.conversions;
    memory.rates = next.rates;
  } catch {
    const empty = blankFile();
    memory.leads = empty.leads;
    memory.conversions = empty.conversions;
    memory.rates = empty.rates;
  }
  memoryLoaded = true;
  return memory;
}

async function writeFileStore(store: FileShape): Promise<void> {
  memory.leads = store.leads;
  memory.conversions = store.conversions;
  memory.rates = store.rates;
  memoryLoaded = true;
  try {
    const { mkdir, writeFile } = await import("fs/promises");
    await mkdir(path.dirname(leadsPath), { recursive: true });
    await writeFile(leadsPath, JSON.stringify(store, null, 2));
  } catch {
    // The file store is the local fallback. A read-only disk keeps the in-memory copy.
  }
}

export async function clientRateKey(request: Request): Promise<string> {
  const ip =
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "local";
  const hour = new Date().toISOString().slice(0, 13);
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(`seecabs|${hour}|${ip}`),
  );
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function allowLead(request: Request): Promise<boolean> {
  const key = await clientRateKey(request);
  const db = await getDb();
  if (db) return allowLeadD1(db, key);
  return allowLeadFile(key);
}

async function allowLeadD1(db: SqlDatabase, key: string): Promise<boolean> {
  const now = new Date();
  const resetAt = new Date(now.getTime() + 60 * 60 * 1000).toISOString();
  const existing = await db
    .prepare("SELECT count, reset_at FROM rate_limits WHERE key = ?")
    .bind(key)
    .first<{ count: number; reset_at: string }>();
  const expired = !existing || existing.reset_at <= now.toISOString();
  const count = expired ? 1 : Number(existing.count) + 1;
  if (existing) {
    await db
      .prepare("UPDATE rate_limits SET count = ?, reset_at = ? WHERE key = ?")
      .bind(count, expired ? resetAt : existing.reset_at, key)
      .run();
  } else {
    await db
      .prepare("INSERT INTO rate_limits (key, count, reset_at) VALUES (?, ?, ?)")
      .bind(key, count, resetAt)
      .run();
  }
  return count <= HOURLY_LEAD_CAP;
}

async function allowLeadFile(key: string): Promise<boolean> {
  const store = await readFileStore();
  const now = new Date();
  const current = store.rates[key];
  const expired = !current || current.resetAt <= now.toISOString();
  const count = expired ? 1 : current.count + 1;
  store.rates[key] = {
    count,
    resetAt: expired ? new Date(now.getTime() + 60 * 60 * 1000).toISOString() : current.resetAt,
  };
  await writeFileStore(store);
  return count <= HOURLY_LEAD_CAP;
}

export async function createLead(input: LeadDraft): Promise<Lead> {
  const lead = finishLead(input);
  const db = await getDb();
  if (db) {
    await db
      .prepare(
        `INSERT INTO leads (
          id, created_at, updated_at, status, origin_label, destination_label, date, return_date,
          passengers, vehicle_id, estimated_fare, intent, landing_page, source, campaign, keyword,
          gclid, fbclid, gbraid, wbraid, notes, attribution_json, whatsapp_url
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .bind(
        lead.id,
        lead.createdAt,
        lead.updatedAt,
        lead.status,
        lead.originLabel,
        lead.destinationLabel,
        lead.date,
        lead.returnDate,
        lead.passengers,
        lead.vehicleId,
        lead.estimatedFare,
        lead.intent,
        lead.landingPage,
        lead.source,
        lead.campaign,
        lead.keyword,
        lead.gclid,
        lead.fbclid,
        lead.gbraid,
        lead.wbraid,
        lead.notes,
        JSON.stringify(lead.attribution),
        lead.whatsappUrl,
      )
      .run();
    return lead;
  }
  const store = await readFileStore();
  store.leads = [lead, ...store.leads];
  await writeFileStore(store);
  return lead;
}

function matches(lead: Lead, filters: LeadFilters): boolean {
  if (filters.status && lead.status !== filters.status) return false;
  if (filters.source && (lead.source || "direct") !== filters.source) return false;
  const query = filters.query?.trim().toLowerCase();
  if (!query) return true;
  const haystack = [
    lead.id,
    lead.originLabel,
    lead.destinationLabel,
    lead.landingPage,
    lead.campaign,
    lead.gclid,
    lead.keyword,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return haystack.includes(query);
}

export async function listLeads(filters: LeadFilters = {}): Promise<Lead[]> {
  const db = await getDb();
  if (db) {
    const status = filters.status ?? "";
    const source = filters.source ?? "";
    const query = filters.query?.trim().toLowerCase() ?? "";
    const like = `%${query}%`;
    const { results } = await db
      .prepare(
        `SELECT * FROM leads
         WHERE (? = '' OR status = ?)
           AND (? = '' OR COALESCE(source, 'direct') = ?)
           AND (
             ? = ''
             OR lower(origin_label) LIKE ?
             OR lower(destination_label) LIKE ?
             OR lower(id) LIKE ?
             OR lower(COALESCE(landing_page, '')) LIKE ?
             OR lower(COALESCE(campaign, '')) LIKE ?
             OR lower(COALESCE(gclid, '')) LIKE ?
             OR lower(COALESCE(keyword, '')) LIKE ?
           )
         ORDER BY created_at DESC
         LIMIT 200`,
      )
      .bind(status, status, source, source, query, like, like, like, like, like, like, like)
      .all<LeadRow>();
    return results.map(rowToLead);
  }
  const store = await readFileStore();
  return store.leads.filter((lead) => matches(lead, filters));
}

export async function setLeadWhatsApp(id: string, whatsappUrl: string): Promise<void> {
  const db = await getDb();
  if (db) {
    await db.prepare("UPDATE leads SET whatsapp_url = ? WHERE id = ?").bind(whatsappUrl, id).run();
    return;
  }
  const store = await readFileStore();
  const lead = store.leads.find((item) => item.id === id);
  if (!lead) return;
  lead.whatsappUrl = whatsappUrl;
  await writeFileStore(store);
}

export async function getLead(id: string): Promise<Lead | null> {
  const db = await getDb();
  if (db) {
    const row = await db.prepare("SELECT * FROM leads WHERE id = ?").bind(id).first<LeadRow>();
    return row ? rowToLead(row) : null;
  }
  const store = await readFileStore();
  return store.leads.find((lead) => lead.id === id) ?? null;
}

export async function updateLead(
  id: string,
  patch: { status: LeadStatus; notes: string },
): Promise<Lead | null> {
  const updatedAt = new Date().toISOString();
  const db = await getDb();
  if (db) {
    await db
      .prepare("UPDATE leads SET status = ?, notes = ?, updated_at = ? WHERE id = ?")
      .bind(patch.status, patch.notes, updatedAt, id)
      .run();
    return getLead(id);
  }
  const store = await readFileStore();
  const lead = store.leads.find((item) => item.id === id);
  if (!lead) return null;
  lead.status = patch.status;
  lead.notes = patch.notes;
  lead.updatedAt = updatedAt;
  await writeFileStore(store);
  return lead;
}

export async function leadStats(): Promise<LeadStats> {
  const db = await getDb();
  if (db) {
    const week = new Date(Date.now() - 7 * 86400000).toISOString();
    const month = new Date(Date.now() - 30 * 86400000).toISOString();
    const last7 = await db
      .prepare("SELECT COUNT(*) AS n FROM leads WHERE created_at >= ?")
      .bind(week)
      .first<{ n: number }>();
    const last30 = await db
      .prepare("SELECT COUNT(*) AS n FROM leads WHERE created_at >= ?")
      .bind(month)
      .first<{ n: number }>();
    const byStatus = await db
      .prepare("SELECT status AS key, COUNT(*) AS count FROM leads GROUP BY status")
      .all<{ key: string; count: number }>();
    const bySource = await db
      .prepare(
        "SELECT COALESCE(source, 'direct') AS key, COUNT(*) AS count FROM leads GROUP BY COALESCE(source, 'direct')",
      )
      .all<{ key: string; count: number }>();
    const failed = await db
      .prepare("SELECT COUNT(*) AS n FROM conversion_events WHERE status = 'failed'")
      .first<{ n: number }>();
    return {
      last7: Number(last7?.n ?? 0),
      last30: Number(last30?.n ?? 0),
      byStatus: byStatus.results.map((row) => ({ key: row.key, count: Number(row.count) })),
      bySource: bySource.results.map((row) => ({ key: row.key, count: Number(row.count) })),
      failedConversions: Number(failed?.n ?? 0),
    };
  }
  const store = await readFileStore();
  const week = Date.now() - 7 * 86400000;
  const month = Date.now() - 30 * 86400000;
  const countBy = (pick: (lead: Lead) => string) => {
    const map = new Map<string, number>();
    for (const lead of store.leads) {
      const key = pick(lead);
      map.set(key, (map.get(key) ?? 0) + 1);
    }
    return [...map.entries()].map(([key, count]) => ({ key, count }));
  };
  return {
    last7: store.leads.filter((lead) => Date.parse(lead.createdAt) >= week).length,
    last30: store.leads.filter((lead) => Date.parse(lead.createdAt) >= month).length,
    byStatus: countBy((lead) => lead.status),
    bySource: countBy((lead) => lead.source || "direct"),
    failedConversions: store.conversions.filter((event) => event.status === "failed").length,
  };
}

export async function listBookedWithGclid(): Promise<Lead[]> {
  const db = await getDb();
  if (db) {
    const { results } = await db
      .prepare(
        "SELECT * FROM leads WHERE status = 'booked' AND gclid IS NOT NULL AND gclid != '' ORDER BY updated_at DESC",
      )
      .all<LeadRow>();
    return results.map(rowToLead);
  }
  const store = await readFileStore();
  return store.leads.filter((lead) => lead.status === "booked" && lead.gclid);
}

export async function insertConversion(
  input: Omit<ConversionEvent, "id" | "createdAt">,
): Promise<ConversionEvent> {
  const event: ConversionEvent = {
    ...input,
    id: randomUUID().slice(0, 8).toUpperCase(),
    createdAt: new Date().toISOString(),
  };
  const db = await getDb();
  if (db) {
    await db
      .prepare(
        `INSERT INTO conversion_events (
          id, lead_id, destination, event_name, event_id, status, payload_json, error, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .bind(
        event.id,
        event.leadId,
        event.destination,
        event.eventName,
        event.eventId,
        event.status,
        event.payloadJson,
        event.error,
        event.createdAt,
      )
      .run();
    return event;
  }
  const store = await readFileStore();
  store.conversions = [event, ...store.conversions];
  await writeFileStore(store);
  return event;
}

export async function updateConversion(
  id: string,
  patch: { status: ConversionStatus; error: string | null; payloadJson?: string },
): Promise<void> {
  const db = await getDb();
  if (db) {
    await db
      .prepare("UPDATE conversion_events SET status = ?, error = ?, payload_json = COALESCE(?, payload_json) WHERE id = ?")
      .bind(patch.status, patch.error, patch.payloadJson ?? null, id)
      .run();
    return;
  }
  const store = await readFileStore();
  const event = store.conversions.find((item) => item.id === id);
  if (!event) return;
  event.status = patch.status;
  event.error = patch.error;
  if (patch.payloadJson != null) event.payloadJson = patch.payloadJson;
  await writeFileStore(store);
}

export async function listConversions(limit = 50): Promise<ConversionEvent[]> {
  const db = await getDb();
  if (db) {
    const { results } = await db
      .prepare("SELECT * FROM conversion_events ORDER BY created_at DESC LIMIT ?")
      .bind(limit)
      .all<ConversionRow>();
    return results.map(rowToConversion);
  }
  const store = await readFileStore();
  return [...store.conversions].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)).slice(0, limit);
}

export async function getConversion(id: string): Promise<ConversionEvent | null> {
  const db = await getDb();
  if (db) {
    const row = await db
      .prepare("SELECT * FROM conversion_events WHERE id = ?")
      .bind(id)
      .first<ConversionRow>();
    return row ? rowToConversion(row) : null;
  }
  const store = await readFileStore();
  return store.conversions.find((event) => event.id === id) ?? null;
}
