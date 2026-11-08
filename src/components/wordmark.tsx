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
  const mark = size === "lg" ? "h-11 w-11" : "h-8 w-8 sm:h-9 sm:w-9";
  const letters =
    size === "lg"
      ? "text-[1.7rem] sm:text-[1.9rem]"
      : "text-[1.2rem] sm:text-[1.4rem]";
  const tagline =
    size === "lg" ? "mt-1 text-sm" : "mt-0.5 text-[10px] sm:text-[11px]";

  const lockup = (
    <span className={`flex min-w-0 items-center ${size === "lg" ? "gap-3" : "gap-2 sm:gap-2.5"}`}>
      <LogoMark className={`${mark} shrink-0`} />
      <span className="min-w-0">
        <span className={`wordmark block leading-none tracking-[-0.03em] ${letters}`}>
          <span className="wordmark-see">See</span>
          <span className="wordmark-cabs">Cabs</span>
        </span>
        <span className={`block truncate font-medium tracking-[0.04em] text-muted ${tagline}`}>
          {brand.tagline}
        </span>
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
