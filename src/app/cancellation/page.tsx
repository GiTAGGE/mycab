import type { Metadata } from "next";
import Link from "next/link";
import { ProsePage, ProseSection } from "@/components/prose-page";

export const metadata: Metadata = {
  title: "Cancellation",
  description:
    "SeeCabs has no account and no online payment. Change or cancel a confirmed trip by phone or WhatsApp before the agreed pickup.",
  alternates: { canonical: "/cancellation" },
};

export default function CancellationPage() {
  return (
    <ProsePage
      title="Cancellation"
      lede="This site does not take payment and does not create an account. A trip is confirmed only after you agree it on the phone or WhatsApp."
    >
      <ProseSection title="Before the trip is confirmed">
        <p>Closing the page, or leaving the WhatsApp chat before you agree a pickup, does not create a booking. There is nothing to cancel.</p>
      </ProseSection>
      <ProseSection title="After you have confirmed">
        <p>Call or message the same number you used to book, before the pickup time you agreed. Say you want to change the time, change the drop, or cancel.</p>
        <p>If a driver has already been assigned or has started towards you, any charge for that is told on the same call. This page does not invent a free-cancellation window or a percentage we do not operate here.</p>
      </ProseSection>
      <ProseSection title="How to reach us">
        <p>
          Use the number on the{" "}
          <Link className="text-accent underline decoration-accent/40 underline-offset-4" href="/contact">
            contact page
          </Link>
          . Fare rules are on the{" "}
          <Link className="text-accent underline decoration-accent/40 underline-offset-4" href="/fare-policy">
            fare policy
          </Link>
          .
        </p>
      </ProseSection>
    </ProsePage>
  );
}
