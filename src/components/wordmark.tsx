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
  const mark = size === "lg" ? "h-12 w-12" : "h-9 w-9 sm:h-10 sm:w-10";
  const letters = size === "lg" ? "text-[1.85rem] sm:text-[2rem]" : "text-[1.2rem] sm:text-[1.45rem]";
  const tagline = size === "lg" ? "mt-1.5 text-xs" : "mt-1 text-[9px] sm:text-[10px]";

  const lockup = (
    <span className={`logo-lockup flex min-w-0 items-center ${size === "lg" ? "gap-3.5" : "gap-2.5"}`}>
      <LogoMark className={`${mark} shrink-0`} />
      <span className="min-w-0">
        <span className={`wordmark flex items-baseline leading-none ${letters}`}>
          <span className="wordmark-see">See</span>
          <span className="wordmark-cabs">Cabs</span>
        </span>
        <span className={`wordmark-tag block truncate ${tagline}`}>{brand.tagline}</span>
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
