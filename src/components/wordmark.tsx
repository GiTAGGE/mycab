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
  const lockup = (
    <span className={`flex min-w-0 items-center ${size === "lg" ? "gap-2.5" : "gap-2"}`}>
      <LogoMark className={size === "lg" ? "h-10 w-10 shrink-0" : "h-8 w-8 shrink-0 sm:h-9 sm:w-9"} />
      <span className="min-w-0 text-left">
        <span
          className={`wordmark block tracking-tight ${
            size === "lg" ? "text-[1.45rem] leading-none" : "text-[1.05rem] leading-none sm:text-[1.2rem]"
          }`}
        >
          <span className="wordmark-see">See</span>
          <span className="wordmark-cabs">Cabs</span>
        </span>
        <span
          className={`mt-0.5 block truncate font-medium tracking-wide text-muted ${
            size === "lg" ? "text-xs" : "text-[10px] sm:text-[11px]"
          }`}
        >
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
