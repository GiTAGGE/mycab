import { NextResponse } from "next/server";
import { quoteTrip, startingFare } from "@/lib/fare";
import { getPlace } from "@/lib/places";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    fromId?: string;
    toId?: string;
    returnDate?: string | null;
    passengers?: number;
  };
  const from = getPlace(body.fromId);
  const to = getPlace(body.toId);
  if (!from || !to) {
    return NextResponse.json({ error: "Choose from and to" }, { status: 400 });
  }
  const quote = quoteTrip(from, to, body.returnDate ?? null, body.passengers ?? 2);
  return NextResponse.json({ quote, fromPrice: startingFare(quote) });
}
