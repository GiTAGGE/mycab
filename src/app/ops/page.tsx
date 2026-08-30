import { cities, routes, services } from "@/lib/data";
import { listLeads } from "@/lib/db/store";

export const dynamic = "force-dynamic";

export default async function OpsPage() {
  const leads = await listLeads();

  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <p className="text-sm font-medium text-accent-dark">Internal</p>
      <h1 className="display mt-2 text-4xl">Operating system</h1>
      <p className="mt-3 max-w-2xl text-ink-soft">
        Protect this route before production. It exists so cities, routes and
        leads are data — not a pile of WordPress pages.
      </p>

      <h2 className="mt-10 text-lg font-semibold">Cities</h2>
      <div className="mt-3 overflow-x-auto rounded-2xl border border-line bg-card">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead className="border-b border-line text-muted">
            <tr>
              <th className="px-4 py-3">City</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Routes</th>
              <th className="px-4 py-3">Services</th>
            </tr>
          </thead>
          <tbody>
            {cities.map((city) => (
              <tr key={city.id} className="border-b border-line/70 last:border-0">
                <td className="px-4 py-3 font-medium">{city.name}</td>
                <td className="px-4 py-3 capitalize">{city.status}</td>
                <td className="px-4 py-3">
                  {routes.filter((route) => route.originCitySlug === city.slug).length}
                </td>
                <td className="px-4 py-3">{city.availableServiceIds.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-10 text-lg font-semibold">Routes</h2>
      <div className="mt-3 overflow-x-auto rounded-2xl border border-line bg-card">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-line text-muted">
            <tr>
              <th className="px-4 py-3">Origin</th>
              <th className="px-4 py-3">Destination</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Fare</th>
              <th className="px-4 py-3">Page</th>
            </tr>
          </thead>
          <tbody>
            {routes.map((route) => (
              <tr key={route.id} className="border-b border-line/70 last:border-0">
                <td className="px-4 py-3">{route.originCitySlug}</td>
                <td className="px-4 py-3">{route.destinationName}</td>
                <td className="px-4 py-3">{route.status}</td>
                <td className="px-4 py-3">₹{route.sedanFare}</td>
                <td className="px-4 py-3">/{route.pageSlug}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-10 text-lg font-semibold">Landing pages</h2>
      <ul className="mt-3 space-y-2 text-sm">
        {cities
          .filter((city) => city.status === "live")
          .flatMap((city) =>
            services
              .filter((service) => city.availableServiceIds.includes(service.id))
              .map((service) => (
                <li key={`${city.slug}-${service.slug}`}>
                  /{city.slug}/{service.slug} · {city.name} {service.name}
                </li>
              )),
          )}
      </ul>

      <h2 className="mt-10 text-lg font-semibold">Leads</h2>
      {leads.length === 0 ? (
        <p className="mt-3 text-sm text-muted">
          No leads on this instance yet. Confirm a trip on WhatsApp to write one
          here (file store locally, memory on Netlify Free).
        </p>
      ) : (
        <div className="mt-3 overflow-x-auto rounded-2xl border border-line bg-card">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-line text-muted">
              <tr>
                <th className="px-4 py-3">Ref</th>
                <th className="px-4 py-3">Trip</th>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">Page</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-line/70 last:border-0">
                  <td className="px-4 py-3 font-medium">{lead.id}</td>
                  <td className="px-4 py-3">
                    {lead.originLabel} → {lead.destinationLabel}
                  </td>
                  <td className="px-4 py-3">{lead.source ?? "direct"}</td>
                  <td className="px-4 py-3">{lead.landingPage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
