import type { Metadata } from "next";
import { ProsePage, ProseSection } from "@/components/prose-page";
import { ATTR_STORAGE_KEY, brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "What SeeCabs stores when you check a fare: the trip, the page you opened, and optional ad click data in your browser. No account.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <ProsePage
      title="Privacy"
      lede={`${brand.name} does not ask you to create an account. The site stores the trip you request so it can be confirmed on the phone or WhatsApp.`}
    >
      <ProseSection title="What a fare check sends">
        <p>When you continue to WhatsApp, the site sends the pickup, drop, travel date, return date if you set one, passenger count, vehicle category, the starting fare shown, and the page you were on.</p>
        <p>Your phone number is not typed into this site. You use it when you call, or when WhatsApp opens on your phone.</p>
      </ProseSection>
      <ProseSection title="Pages and ad clicks">
        <p>
          The browser stores a small note of how you arrived, under the key{" "}
          <span className="text-ink">{ATTR_STORAGE_KEY}</span>. That can include
          the landing path, a referrer, and advertising parameters if they were
          in the link (utm source, campaign, content, gclid, gbraid, wbraid, fbclid, msclkid).
          The same note is stored in a cookie named sc_attr for 90 days, and a random client id
          in sc_cid, so the booking can still be matched if site storage is limited. It is used
          to know which page the booking started on. You can clear it by
          clearing site data for this domain in your browser.
        </p>
      </ProseSection>
      <ProseSection title="What we do not collect here">
        <p>No account password, no payment card, and no review profile. We do not sell a review widget or publish ratings from this data.</p>
      </ProseSection>
      <ProseSection title="Google and Meta">
        <p>
          If measurement tags are configured, a bar asks before Google or Meta scripts run.
          Accept allows those services to receive the page, the fare on screen, and the ad click id.
          Reject keeps the scripts off. When the accounts are configured, the server can still send
          the lead event itself, with the same event id, so a blocked browser does not drop the booking signal.
          The site does not send a phone number or email to those services, because it does not collect them.
        </p>
      </ProseSection>
      <ProseSection title="How long it is kept">
        <p>
          Lead records, including the page and the click id, are deleted after 24 months.
          A reference id is still sent in the WhatsApp message so a booking can be matched.
          To ask about a request you started, use the number on the contact page and that reference.
        </p>
      </ProseSection>
    </ProsePage>
  );
}