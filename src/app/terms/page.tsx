import type { Metadata } from "next";
import Link from "next/link";
import { ProsePage, ProseSection } from "@/components/prose-page";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "How SeeCabs bookings work: a starting fare on the site, confirmation by phone or WhatsApp, and a driver assigned for that trip.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <ProsePage
      title="Terms"
      lede={`${brand.name} is the name of this website. These terms describe the booking you can actually make here.`}
    >
      <ProseSection title="A fare on the page is a starting fare">
        <p>
          Prices are in Indian rupees and begin with the sedan unless you choose
          another vehicle. They are not a tax invoice and they are not
          all-inclusive. Tolls, parking, waiting, and the exact pickup, drop and
          date are confirmed before you pay. Read the{" "}
          <Link className="text-accent underline decoration-accent/40 underline-offset-4" href="/fare-policy">
            fare policy
          </Link>{" "}
          for the detail.
        </p>
      </ProseSection>
      <ProseSection title="Confirmation">
        <p>The site does not take a card payment and does not create an account. The trip is confirmed when you agree it on the phone or WhatsApp. A driver is assigned for that booking. We do not promise a named person, a specific number plate, or that a car is already at the kerb while you are still choosing cities.</p>
        <p>Travel time on a route page is a typical duration. Traffic, the pickup point and the drop can make the journey longer.</p>
      </ProseSection>
      <ProseSection title="Your details">
        <p>
          Trip details you submit are used to price and confirm the booking.
          How that information is stored is on the{" "}
          <Link className="text-accent underline decoration-accent/40 underline-offset-4" href="/privacy">
            privacy page
          </Link>
          . Changes and cancellations after you confirm are on the{" "}
          <Link className="text-accent underline decoration-accent/40 underline-offset-4" href="/cancellation">
            cancellation page
          </Link>
          .
        </p>
      </ProseSection>
      <ProseSection title="What we do not claim">
        <p>We do not publish star ratings, review counts, or a street address. We do not describe the vehicles as a fleet owned by a named company. If a page and a WhatsApp confirmation disagree, the confirmation is the fare you pay.</p>
      </ProseSection>
    </ProsePage>
  );
}
