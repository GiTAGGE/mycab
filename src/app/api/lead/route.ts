import { NextResponse } from "next/server";
import { emptyAttribution, sourceLabel } from "@/lib/attribution";
import { createLead } from "@/lib/db/store";
import { quoteTrip, startingFare } from "@/lib/fare";
import { getPlace } from "@/lib/places";
import { getVehicle } from "@/lib/data";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import type { Attribution } from "@/types";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    fromId?: string;
    toId?: string;
    date?: string | null;
    returnDate?: string | null;
    passengers?: number;
    vehicleId?: string | null;
    landingPage?: string | null;
    localUnit?: "4hr" | "8hr";
    attribution?: Attribution;
  };

  const from = getPlace(body.fromId);
  const to = getPlace(body.toId);
  if (!from || !to) {
    return NextResponse.json({ error: "Choose from and to" }, { status: 400 });
  }

  const passengers = body.passengers ?? 2;
  const quote = quoteTrip(from, to, body.returnDate ?? null, passengers, {
    localUnit: body.localUnit,
  });
  const selected =
    quote.vehicles.find((item) => item.vehicleId === body.vehicleId) ??
    quote.vehicles[0];
  const attribution = { ...emptyAttribution(), ...body.attribution };
  const vehicle = selected ? getVehicle(selected.vehicleId) : undefined;

  const draftLead = {
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
  };

  const lead = await createLead(draftLead);
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

  return NextResponse.json({ leadId: lead.id, whatsappUrl, intent: quote.intent });
}
