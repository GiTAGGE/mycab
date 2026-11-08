import type { Lead } from "@/types";

function csvField(value: string | number | null | undefined): string {
  const text = value == null ? "" : String(value);
  if (/[",\n]/.test(text)) return `"${text.replaceAll('"', '""')}"`;
  return text;
}

export function adsConversionTime(iso: string): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date(iso));
  const get = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value ?? "00";
  return `${get("year")}-${get("month")}-${get("day")} ${get("hour")}:${get("minute")}:${get("second")}`;
}

export function googleAdsCsv(leads: Lead[]): string {
  const lines = [
    "Parameters:TimeZone=Asia/Kolkata",
    "Google Click ID,Conversion Name,Conversion Time,Conversion Value,Conversion Currency",
  ];
  for (const lead of leads) {
    if (lead.status !== "booked" || !lead.gclid) continue;
    lines.push(
      [
        csvField(lead.gclid),
        csvField("WhatsApp lead"),
        csvField(adsConversionTime(lead.updatedAt || lead.createdAt)),
        csvField(lead.estimatedFare ?? ""),
        csvField("INR"),
      ].join(","),
    );
  }
  return `${lines.join("\n")}\n`;
}
