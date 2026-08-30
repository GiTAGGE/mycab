import Link from "next/link";
import { brand } from "@/lib/brand";
import { liveCities, routesFromCity, services } from "@/lib/data";
import { routePath, servicePath } from "@/lib/urls";

export function Footer() {
  const city = liveCities()[0];
  const routes = city ? routesFromCity(city.slug).slice(0, 8) : [];

  return (
    <footer className="mt-auto border-t border-line bg-ink text-paper">
      <div className="mx-auto grid max-w-5xl gap-10 px-4 py-12 sm:grid-cols-3">
        <div>
          <p className="text-lg font-semibold">{brand.name}</p>
          <p className="mt-2 max-w-xs text-sm leading-6 text-paper/70">
            A transportation platform that starts as a conversion page — not a
            directory of unused keywords.
          </p>
        </div>
        {city ? (
          <div>
            <p className="text-sm font-medium text-paper/50">From {city.name}</p>
            <ul className="mt-3 space-y-2 text-sm">
              {services.map((service) => (
                <li key={service.id}>
                  <Link className="hover:underline" href={servicePath(city, service)}>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <div>
          <p className="text-sm font-medium text-paper/50">Useful trips</p>
          <ul className="mt-3 space-y-2 text-sm">
            {routes.map((route) => (
              <li key={route.id}>
                <Link className="hover:underline" href={routePath(route)}>
                  {city?.name} → {route.destinationName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-5xl justify-between px-4 py-4 text-xs text-paper/50">
          <span>Phase 1 · {city?.name ?? "One city"} first</span>
          <Link href="/ops" className="hover:text-paper">
            Ops
          </Link>
        </div>
      </div>
    </footer>
  );
}
