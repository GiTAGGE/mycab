import { NextResponse } from "next/server";
import { updateLead } from "@/lib/db/store";
import type { LeadStatus } from "@/types";

export const runtime = "nodejs";

const STATUSES: LeadStatus[] = ["new", "qualified", "booked", "completed", "lost"];

function safeReturn(value: FormDataEntryValue | null): string {
  const text = typeof value === "string" ? value : "";
  if (text.startsWith("/ops") && !text.startsWith("//") && !text.includes("://")) return text;
  return "/ops/leads";
}

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const form = await request.formData();
  const status = String(form.get("status") ?? "");
  const notes = String(form.get("notes") ?? "");
  if (!STATUSES.includes(status as LeadStatus)) {
    return NextResponse.json({ error: "Unknown status" }, { status: 400 });
  }
  await updateLead(id, { status: status as LeadStatus, notes });
  const response = NextResponse.redirect(new URL(safeReturn(form.get("return")), request.url), 303);
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}
