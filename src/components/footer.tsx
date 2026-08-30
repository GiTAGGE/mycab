import Link from "next/link";
import { brand } from "@/lib/brand";
import { liveCities, networkRoutes, services } from "@/lib/data";
import { routePath, servicePath } from "@/lib/urls";

export function Footer() {
  const cities = liveCities();
  const routes = networkRoutes(1);

  return (
    <footer className="mt-auto border-t border-navy-mid bg-navy text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-3">
        <div>
          <p className="text-lg font-semibold">{brand.name}</p>
          <p className="mt-2 max-w-xs text-sm leading-6 text-white/65">
            Karnataka first: Bangalore, Hubli, Dharwad, Belgaum and Mangalore.
            Local hours and trip types in every live city.
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-white/45">Cities</p>
          <ul className="mt-3 space-y-2 text-sm">
            {cities.map((city) => (
              <li key={city.slug}>
                <Link className="hover:underline" href={`/${city.slug}`}>
                  {city.name}
                  {city.officialName ? ` · ${city.officialName}` : ""}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-medium text-white/45">Trip types</p>
          <ul className="mt-3 space-y-2 text-sm">
            {services.map((service) => (
              <li key={service.id}>
                <Link className="hover:underline" href={servicePath("bangalore", service)}>
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm font-medium text-white/45">Across the network</p>
          <ul className="mt-3 space-y-2 text-sm">
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
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl justify-between px-4 py-4 text-xs text-white/45">
          <span>Karnataka network · live cities</span>
          <Link href="/ops" className="hover:text-white">
            Ops
          </Link>
        </div>
      </div>
    </footer>
  );
}
