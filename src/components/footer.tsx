import Link from "next/link";
import { brand } from "@/lib/brand";
import { liveCities, networkRoutes, services } from "@/lib/data";
import { routePath, servicePath } from "@/lib/urls";

export function Footer() {
  const cities = liveCities();
  const routes = networkRoutes(1);

  return (
    <footer className="mt-auto border-t border-line bg-paper">
      <div className="mx-auto grid max-w-5xl gap-10 px-4 py-14 sm:grid-cols-3">
        <div>
          <p className="text-lg font-semibold">{brand.name}</p>
          <p className="mt-2 max-w-xs text-sm leading-6 text-ink-soft">
            Bangalore, Hubli, Dharwad, Belgaum and Mangalore. Local hours and
            intercity trips in each.
          </p>
        </div>
        <div>
          <p className="text-sm text-muted">Cities</p>
          <ul className="mt-3 space-y-2 text-sm">
            {cities.map((city) => (
              <li key={city.slug}>
                <Link className="hover:underline" href={`/${city.slug}`}>
                  {city.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm text-muted">Trip types</p>
          <ul className="mt-3 space-y-2 text-sm">
            {services.map((service) => (
              <li key={service.id}>
                <Link className="hover:underline" href={servicePath("hubli", service)}>
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-6 space-y-2 text-sm text-ink-soft">
            {routes.map((route) => (
              <li key={route.id}>
                <Link className="hover:underline" href={routePath(route)}>
                  {route.originCitySlug} → {route.destinationName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-5xl justify-between px-4 py-4 text-xs text-muted">
          <span>Karnataka</span>
          <Link href="/ops" className="hover:text-ink">
            Ops
          </Link>
        </div>
      </div>
    </footer>
  );
}
