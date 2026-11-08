import type { Metadata } from "next";
import { CallLink } from "@/components/call-link";
import { ProsePage, ProseSection } from "@/components/prose-page";
import { brand } from "@/lib/brand";
import { internationalPhone } from "@/lib/format";
import { WhatsAppLink } from "@/components/whatsapp-link";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Call or WhatsApp SeeCabs to confirm a cab. Share pickup, drop, date, passengers and the vehicle you want.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const phone = internationalPhone(brand.phoneNumber);

  return (
    <ProsePage
      title="Contact"
      lede="There is no account and no payment on this website. Call or WhatsApp to confirm the trip."
    >
      <ProseSection title="Phone and WhatsApp">
        <p>
          The booking number is {phone}. Phone and WhatsApp use the same number.
        </p>
        <p>
          <CallLink variant="footer" />
        </p>
        <p>
          <WhatsAppLink
            source="contact"
            label="Open WhatsApp"
            className="text-accent underline decoration-accent/40 underline-offset-4"
          >
            Open WhatsApp
          </WhatsAppLink>
        </p>
      </ProseSection>
      <ProseSection title="What to send">
        <p>Pickup, drop, travel date, passengers, and the vehicle category. If it is an airport trip, add the flight number. If you need a return or extra stops, say so in the same message.</p>
        <p>We reply with the amount to pay, including tolls or parking when they apply, before the trip is confirmed.</p>
      </ProseSection>
    </ProsePage>
  );
}
