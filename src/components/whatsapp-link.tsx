"use client";

import type { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";
import { rawWhatsAppUrl } from "@/lib/whatsapp";

export function WhatsAppLink({
  source,
  className,
  children,
  label = "WhatsApp",
}: {
  source: "header" | "contact";
  className?: string;
  children: ReactNode;
  label?: string;
}) {
  return (
    <a
      href={rawWhatsAppUrl()}
      className={className}
      aria-label={label}
      onClick={() =>
        trackEvent("click_whatsapp", { source, path: window.location.pathname })
      }
    >
      {children}
    </a>
  );
}
