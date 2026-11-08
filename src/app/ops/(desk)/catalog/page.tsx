import { cities, routes, services } from "@/lib/data";
import { catalogHealth } from "@/lib/catalog-health";
import { OpsTable } from "@/components/ops/frame";

export const dynamic = "force-dynamic";

export default function OpsCatalogPage() {
  const issues = catalogHealth();
  return (
    <>
      <h2 className="text-lg font-semibold">Health</h2>
      <p className="mt-1 max-w-2xl text-sm text-ink-soft">
        Titles, fares in the description, and FAQs. Draft cities stay out of the sitemap. Fares are still edited in git.
      </p>
      {issues.length === 0 ? (
        <p className="mt-3 text-sm text-muted">No catalog issues.</p>
      ) : (
        <OpsTable
          columns={["Page", "Issue"]}
          rows={issues.map((issue) => [issue.path, issue.issue])}
        />
      )}

      <h2 className="mt-10 text-lg font-semibold">Cities</h2>
      <OpsTable
        columns={["City", "Status", "Routes", "Services"]}
        rows={cities.map((city) => [
          city.name,
          city.status,
          String(routes.filter((route) => route.originCitySlug === city.slug).length),
          String(city.availableServiceIds.length),
        ])}
      />

      <h2 className="mt-10 text-lg font-semibold">Routes</h2>
      <OpsTable
        columns={["Origin", "Destination", "Status", "Fare", "Page"]}
        rows={routes.map((route) => [
          route.originCitySlug,
          route.destinationName,
          route.status,
          `₹${route.sedanFare}`,
          `/${route.pageSlug}`,
        ])}
      />

      <h2 className="mt-10 text-lg font-semibold">Services</h2>
      <ul className="mt-3 space-y-2 text-sm">
        {services.map((service) => (
          <li key={service.id}>
            /{service.slug} · {service.name}
          </li>
        ))}
      </ul>
    </>
  );
}
