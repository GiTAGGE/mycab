import { brand } from "@/lib/brand";
import { inr, prettyDate } from "@/lib/format";
import type { Place } from "@/types";

export function buildWhatsAppUrl(options: {
  from: Place;
  to: Place;
  date: string | null;
  returnDate: string | null;
  passengers: number;
  vehicleName?: string | null;
  fare?: number | null;
  leadId?: string | null;
}): string {
  const lines = [
    `Hi ${brand.name}, I want to book this trip:`,
    "",
    `${options.from.label} → ${options.to.label}`,
    options.date ? prettyDate(options.date) : "Date: tell me a slot",
    `${options.passengers} passenger${options.passengers === 1 ? "" : "s"}`,
  ];

  if (options.returnDate) {
    lines.push(`Return: ${prettyDate(options.returnDate)}`);
  }
  if (options.vehicleName) {
    lines.push(`Car: ${options.vehicleName}`);
  }
  if (options.fare) {
    lines.push(`Estimated ${inr(options.fare)}`);
  }
  if (options.leadId) {
    lines.push("", `Ref: ${options.leadId}`);
  }

  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${brand.whatsappNumber}?text=${text}`;
}

export function rawWhatsAppUrl(): string {
  const text = encodeURIComponent(
    `Hi ${brand.name}, I need a cab. I’ll share pickup and drop here.`,
  );
  return `https://wa.me/${brand.whatsappNumber}?text=${text}`;
}
