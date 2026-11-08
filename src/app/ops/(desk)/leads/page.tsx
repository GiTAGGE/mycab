import { listLeads } from "@/lib/db/store";
import { fareLabel } from "@/components/ops/frame";
import type { LeadStatus } from "@/types";

export const dynamic = "force-dynamic";

const statuses: Array<LeadStatus | ""> = ["", "new", "qualified", "booked", "completed", "lost"];

export default async function OpsLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; source?: string; q?: string }>;
}) {
  const params = await searchParams;
  const status = params.status ?? "";
  const source = params.source ?? "";
  const query = params.q ?? "";
  const leads = await listLeads({ status, source, query });
  const returnTo = `/ops/leads?status=${encodeURIComponent(status)}&source=${encodeURIComponent(source)}&q=${encodeURIComponent(query)}`;

  return (
    <>
      <form className="grid gap-2 sm:grid-cols-[1fr_1fr_1.4fr_auto]" method="get">
        <select name="status" defaultValue={status} className="rounded-xl border border-line bg-card px-3 py-2 text-sm">
          {statuses.map((item) => (
            <option key={item || "any"} value={item}>
              {item ? item : "Any status"}
            </option>
          ))}
        </select>
        <input
          name="source"
          defaultValue={source}
          placeholder="Source"
          className="rounded-xl border border-line bg-card px-3 py-2 text-sm"
        />
        <input
          name="q"
          defaultValue={query}
          placeholder="Trip, ref, campaign, gclid"
          className="rounded-xl border border-line bg-card px-3 py-2 text-sm"
        />
        <button type="submit" className="rounded-full bg-ink px-4 py-2 text-sm text-paper">
          Filter
        </button>
      </form>

      {leads.length === 0 ? (
        <p className="mt-6 text-sm text-muted">No leads match.</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {leads.map((lead) => (
            <li key={lead.id} className="rounded-2xl border border-line bg-card p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-medium">
                    {lead.id} · {lead.originLabel} → {lead.destinationLabel}
                  </p>
                  <p className="mt-1 text-sm text-ink-soft">
                    {fareLabel(lead.estimatedFare)} · {lead.source || "direct"} · {lead.landingPage || "—"}
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    {lead.campaign || "No campaign"}
                    {lead.keyword ? ` · ${lead.keyword}` : ""}
                    {lead.gclid ? ` · gclid ${lead.gclid}` : ""}
                    {lead.fbclid ? ` · fbclid ${lead.fbclid}` : ""}
                  </p>
                </div>
                {lead.whatsappUrl ? (
                  <a href={lead.whatsappUrl} className="text-sm font-medium text-accent">
                    WhatsApp
                  </a>
                ) : null}
              </div>
              <form method="post" action={`/api/ops/leads/${lead.id}`} className="mt-3 grid gap-2">
                <input type="hidden" name="return" value={returnTo} />
                <div className="grid gap-2 sm:grid-cols-[180px_1fr_auto]">
                  <select
                    name="status"
                    defaultValue={lead.status}
                    className="rounded-xl border border-line bg-paper px-3 py-2 text-sm"
                  >
                    {statuses.filter(Boolean).map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <textarea
                    name="notes"
                    defaultValue={lead.notes ?? ""}
                    rows={2}
                    placeholder="Note"
                    className="rounded-xl border border-line bg-paper px-3 py-2 text-sm"
                  />
                  <button type="submit" className="rounded-full border border-line px-4 py-2 text-sm sm:self-start">
                    Save
                  </button>
                </div>
              </form>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
