import Link from "next/link";
import { LogoMark } from "@/components/logo-mark";
import { brand } from "@/lib/brand";

export function Wordmark({
  href = "/",
  size = "md",
}: {
  href?: string;
  size?: "md" | "lg";
}) {
  const letters =
    size === "lg"
      ? "text-[1.85rem] sm:text-[2.15rem]"
      : "text-[1.42rem] sm:text-[1.7rem]";

  const lockup = (
    <span className="flex min-w-0 flex-col">
      <span className={`wordmark flex items-center leading-none tracking-[-0.03em] ${letters}`}>
        <span className="wordmark-see">S</span>
        <LogoMark className="mx-[0.05em] h-[1.08em]" />
        <span className="wordmark-cabs">Cabs</span>
      </span>
      <span
        className={`block truncate font-medium tracking-[0.01em] text-muted ${
          size === "lg" ? "mt-1 text-sm" : "mt-0.5 text-[11px] sm:text-xs"
        }`}
      >
        {brand.tagline}
      </span>
    </span>
  );

  if (!href) {
    return (
      <span aria-label={`${brand.name}. ${brand.tagline}`} className="inline-flex">
        {lockup}
      </span>
    );
  }

  return (
    <Link href={href} aria-label={`${brand.name}. ${brand.tagline}`} className="inline-flex min-w-0">
      {lockup}
    </Link>
  );
}
