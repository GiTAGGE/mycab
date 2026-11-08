import { listBookedWithGclid } from "@/lib/db/store";
import { googleAdsCsv } from "@/lib/measure/ads-csv";

export const runtime = "nodejs";

export async function GET() {
  const csv = googleAdsCsv(await listBookedWithGclid());
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=\"google-ads-booked-leads.csv\"",
      "Cache-Control": "private, no-store",
    },
  });
}
