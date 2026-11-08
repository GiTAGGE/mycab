"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/ops", label: "Overview" },
  { href: "/ops/leads", label: "Leads" },
  { href: "/ops/campaigns", label: "Campaigns" },
  { href: "/ops/catalog", label: "Catalog" },
  { href: "/ops/measurement", label: "Measurement" },
];

export function OpsNav() {
  const path = usePathname();
  return (
    <nav className="mt-4 flex gap-2 overflow-x-auto pb-1 text-sm">
      {links.map((link) => {
        const active = link.href === "/ops" ? path === "/ops" : path.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`shrink-0 rounded-full px-3 py-1.5 ${
              active ? "bg-ink text-paper" : "border border-line bg-card text-ink-soft"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
