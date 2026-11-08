import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import {
  attributionFromCookie,
  CLIENT_ID_COOKIE,
  emptyAttribution,
  mergeAttribution,
  readRequestCookie,
  sourceLabel,
} from "@/lib/attribution";
import { allowLead, createLead, setLeadWhatsApp } from "@/lib/db/store";
import { getVehicle } from "@/lib/data";
import { quoteTrip, startingFare } from "@/lib/fare";
import { leadPageUrl, recordLeadConversions } from "@/lib/measure/deliver";
import { getPlace } from "@/lib/places";
import { runtimeEnv } from "@/lib/runtime-env";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import type { Attribution } from "@/types";

export const runtime = "nodejs";

function noStore(body: unknown, status = 200, extraHeaders?: HeadersInit) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "private, no-store", ...Object.fromEntries(new Headers(extraHeaders)) },
  });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    fromId?: string;
    toId?: string;
    date?: string | null;
    returnDate?: string | null;
    passengers?: number;
    vehicleId?: string | null;
    landingPage?: string | null;
    localUnit?: "4hr" | "8hr";
    company?: string | null;
    attribution?: Attribution;
  } | null;

  if (!body) return noStore({ error: "Choose from and to" }, 400);
  if (typeof body.company === "string" && body.company.trim()) {
    return noStore({ error: "Could not start WhatsApp" }, 400);
  }

  if (!(await allowLead(request))) {
    return noStore({ error: "Too many fare checks from this network. Try again in an hour." }, 429);
  }

  const from = getPlace(body.fromId);
  const to = getPlace(body.toId);
  if (!from || !to) {
    return noStore({ error: "Choose from and to" }, 400);
  }

  const passengers = body.passengers ?? 2;
  const quote = quoteTrip(from, to, body.returnDate ?? null, passengers, {
    localUnit: body.localUnit,
  });
  const selected =
    quote.vehicles.find((item) => item.vehicleId === body.vehicleId) ?? quote.vehicles[0];
  const cookieHeader = request.headers.get("cookie");
  const attribution = mergeAttribution(
    mergeAttribution(emptyAttribution(), attributionFromCookie(cookieHeader)),
    body.attribution,
  );
  const vehicle = selected ? getVehicle(selected.vehicleId) : undefined;
  const eventId = randomUUID();
  const clientId = readRequestCookie(cookieHeader, CLIENT_ID_COOKIE) || randomUUID();

  const lead = await createLead({
    originLabel: from.label,
    destinationLabel: to.label,
    date: body.date ?? null,
    returnDate: body.returnDate ?? null,
    passengers,
    vehicleId: selected?.vehicleId ?? null,
    estimatedFare: selected?.amount ?? startingFare(quote),
    intent: quote.intent,
    landingPage: body.landingPage ?? attribution.landingPage,
    source: sourceLabel(attribution),
    campaign: attribution.lastTouchCampaign ?? attribution.firstTouchCampaign,
    keyword: attribution.firstTouchKeyword,
    gclid: attribution.gclid,
    attribution,
    whatsappUrl: "",
  });
  const whatsappUrl = buildWhatsAppUrl({
    from,
    to,
    date: body.date ?? null,
    returnDate: body.returnDate ?? null,
    passengers,
    vehicleName: vehicle?.name,
    fare: selected?.amount ?? null,
    leadId: lead.id,
  });
  lead.whatsappUrl = whatsappUrl;
  await setLeadWhatsApp(lead.id, whatsappUrl);

  const env = await runtimeEnv();
  await recordLeadConversions({
    lead,
    eventId,
    env,
    clientId,
    pageUrl: leadPageUrl(lead.landingPage, env),
    ip: request.headers.get("cf-connecting-ip"),
    userAgent: request.headers.get("user-agent"),
  });

  return noStore({ leadId: lead.id, whatsappUrl, eventId, intent: quote.intent });
}
