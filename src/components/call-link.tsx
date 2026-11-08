"use client";

import { PhoneIcon } from "@/components/icons";
import { trackEvent } from "@/lib/analytics";
import { brand } from "@/lib/brand";
import { internationalPhone, nationalPhone, telHref } from "@/lib/format";

export function CallLink({
  variant = "header",
}: {
  variant?: "header" | "form" | "footer";
}) {
  const href = telHref(brand.phoneNumber);
  const international = internationalPhone(brand.phoneNumber);
  const national = nationalPhone(brand.phoneNumber);
  const onClick = () => trackEvent("click_call", { path: window.location.pathname });

  if (variant === "form") {
    return (
      <a href={href} className="call-form" aria-label={`Call ${international}`} onClick={onClick}>
        <span className="call-form-icon" aria-hidden>
          <PhoneIcon className="h-3.5 w-3.5" />
        </span>
        <span className="min-w-0 text-left">
          <span className="call-form-kicker">Call to book</span>
          <span className="call-form-number">{international}</span>
        </span>
        <span className="call-form-hours">Phone</span>
      </a>
    );
  }

  if (variant === "footer") {
    return (
      <a href={href} onClick={onClick} className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-ink">
        <PhoneIcon className="h-4 w-4 text-accent" />
        <span className="tabular-nums">{international}</span>
      </a>
    );
  }

  return (
    <a href={href} className="call-chip" aria-label={`Call ${international}`} onClick={onClick}>
      <PhoneIcon className="h-3.5 w-3.5 shrink-0" />
      <span className="tabular-nums sm:hidden">{national}</span>
      <span className="hidden tabular-nums sm:inline">{international}</span>
    </a>
  );
}
