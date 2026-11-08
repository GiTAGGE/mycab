import { listConversions } from "@/lib/db/store";
import { runtimeEnv } from "@/lib/runtime-env";

export const dynamic = "force-dynamic";

export default async function OpsMeasurementPage() {
  const env = await runtimeEnv();
  const events = await listConversions(50);
  const rows = [
    ["GTM container", env.gtmId ? env.gtmId : "Not set"],
    ["Meta pixel", env.metaPixelId ? env.metaPixelId : "Not set"],
    ["Google Ads id", env.googleAdsId ? env.googleAdsId : "Not set"],
    ["Google Ads lead label", env.googleAdsLeadLabel ? env.googleAdsLeadLabel : "Not set"],
    ["GA4 measurement id", env.ga4MeasurementId ? "Set" : "Not set"],
    ["GA4 API secret", env.ga4ApiSecret ? "Set" : "Not set"],
    ["Meta CAPI token", env.metaCapiToken ? "Set" : "Not set"],
  ];

  return (
    <>
      <p className="max-w-2xl text-sm text-ink-soft">
        The site loads the Meta Pixel itself when the pixel id is set, and sends the same event id as the server. Do not add a second Pixel tag in GTM. In GTM, fire the Google Ads conversion on the generate_lead event. Use one conversion source for bidding: the browser tag, or the booked-click CSV below, and keep the event id if both fire.
      </p>
      <ul className="mt-4 divide-y divide-line rounded-2xl border border-line bg-card text-sm">
        {rows.map(([label, value]) => (
          <li key={label} className="flex items-center justify-between gap-4 px-4 py-3">
            <span className="text-muted">{label}</span>
            <span className="font-medium">{value}</span>
          </li>
        ))}
      </ul>

      <p className="mt-6">
        {/* CSV download. A client Link would try to render the file as a page. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/api/ops/export" className="text-sm font-medium text-accent">
          Download booked Google Ads CSV
        </a>
      </p>
      <p className="mt-1 max-w-2xl text-xs text-muted">
        Rows are leads marked booked that still have a gclid. Upload them as click conversions named WhatsApp lead. Times are Asia/Kolkata.
      </p>

      <h2 className="mt-10 text-lg font-semibold">Recent events</h2>
      {events.length === 0 ? (
        <p className="mt-3 text-sm text-muted">No conversion attempts yet.</p>
      ) : (
        <ul className="mt-3 space-y-2">
          {events.map((event) => (
            <li key={event.id} className="rounded-2xl border border-line bg-card px-4 py-3 text-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p>
                  <span className="font-medium">{event.destination}</span> {event.eventName} · {event.status}
                  <span className="text-muted"> · {event.leadId}</span>
                </p>
                {event.status === "failed" ? (
                  <form method="post" action={`/api/ops/conversions/${event.id}/retry`}>
                    <button type="submit" className="rounded-full border border-line px-3 py-1 text-xs">
                      Retry
                    </button>
                  </form>
                ) : null}
              </div>
              {event.error ? <p className="mt-1 text-xs text-accent">{event.error}</p> : null}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
