import { randomUUID } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import type { Lead } from "@/types";

const leadsPath = path.join(process.cwd(), ".data", "leads.json");
const memory: Lead[] = [];

async function readDisk(): Promise<Lead[]> {
  try {
    const raw = await readFile(leadsPath, "utf8");
    return JSON.parse(raw) as Lead[];
  } catch {
    return [];
  }
}

async function writeDisk(leads: Lead[]): Promise<void> {
  try {
    await mkdir(path.dirname(leadsPath), { recursive: true });
    await writeFile(leadsPath, JSON.stringify(leads, null, 2));
  } catch {
    // Netlify functions are ephemeral. Memory still works for the current instance.
  }
}

export async function createLead(input: Omit<Lead, "id" | "createdAt" | "status">): Promise<Lead> {
  const lead: Lead = {
    ...input,
    id: randomUUID().slice(0, 8).toUpperCase(),
    createdAt: new Date().toISOString(),
    status: "new",
  };
  const existing = memory.length ? memory : await readDisk();
  const next = [lead, ...existing];
  memory.length = 0;
  memory.push(...next);
  await writeDisk(next);
  return lead;
}

export async function listLeads(): Promise<Lead[]> {
  if (memory.length) return memory;
  const disk = await readDisk();
  memory.push(...disk);
  return memory;
}
