import { cities, routes } from "@/lib/data";
import { leadStats } from "@/lib/db/store";

export const dynamic = "force-dynamic";

export default async function OpsHomePage() {
  const stats = await leadStats();
  const liveCityCount = cities.filter((city) => city.status === "live").length;
  const liveRouteCount = routes.filter((route) => route.status === "live").length;
  const cards = [
    { label: "Leads, 7 days", value: String(stats.last7) },
    { label: "Leads, 30 days", value: String(stats.last30) },
    { label: "Failed conversions", value: String(stats.failedConversions) },
    { label: "Live cities", value: String(liveCityCount) },
    { label: "Live routes", value: String(liveRouteCount) },
  ];

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {cards.map((card) => (
          <div key={card.label} className="rounded-2xl border border-line bg-card px-4 py-4">
            <p className="text-sm text-muted">{card.label}</p>
            <p className="mt-1 text-2xl font-semibold">{card.value}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-10 text-lg font-semibold">By status</h2>
      <CountList rows={stats.byStatus} empty="No leads yet." />

      <h2 className="mt-8 text-lg font-semibold">By source</h2>
      <CountList rows={stats.bySource} empty="No source recorded yet." />
    </>
  );
}

function CountList({ rows, empty }: { rows: Array<{ key: string; count: number }>; empty: string }) {
  if (rows.length === 0) return <p className="mt-2 text-sm text-muted">{empty}</p>;
  return (
    <ul className="mt-3 divide-y divide-line rounded-2xl border border-line bg-card text-sm">
      {rows.map((row) => (
        <li key={row.key} className="flex items-center justify-between px-4 py-3">
          <span className="capitalize">{row.key}</span>
          <span className="font-medium">{row.count}</span>
        </li>
      ))}
    </ul>
  );
}
