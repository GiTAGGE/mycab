import type { Faq } from "@/types";

export const faqs: Faq[] = [
  {
    id: "f1",
    citySlug: "bangalore",
    routeId: null,
    service: null,
    question: "Do I need to create an account?",
    answer:
      "No. Tell us the trip, see a fare, and continue on WhatsApp. Phone number only when you actually book.",
  },
  {
    id: "f2",
    citySlug: "bangalore",
    routeId: null,
    service: "airport",
    question: "Will the driver wait if my flight is delayed?",
    answer:
      "Yes — share the flight number when you confirm. We track the landing and adjust pickup. Waiting for delays is included on airport trips.",
  },
  {
    id: "f3",
    citySlug: "bangalore",
    routeId: null,
    service: "outstation",
    question: "Is one-way really one-way?",
    answer:
      "On published routes, yes. You pay the trip you are taking. Tolls that apply on the route are called out before confirmation.",
  },
  {
    id: "f4",
    citySlug: "bangalore",
    routeId: null,
    service: "local",
    question: "What if I go over the hours or kilometres?",
    answer:
      "Extra time and kilometres are billed at a published rate. We tell you that rate when you pick the package — not after the ride.",
  },
  {
    id: "f5",
    citySlug: "bangalore",
    routeId: "blr-mysore",
    service: null,
    question: "How long is Bangalore to Mysore by cab?",
    answer:
      "Usually about 3 hours 15 minutes, depending on the Mysore Road traffic. We quote a door-to-door window, not a highway-only fantasy.",
  },
  {
    id: "f6",
    citySlug: null,
    routeId: null,
    service: null,
    question: "Why are fares shown as a starting price?",
    answer:
      "Pickup point, time of day, and return plans change the final number. The estimate is real; the last rupees are confirmed before you pay.",
  },
  {
    id: "f7",
    citySlug: "bangalore",
    routeId: null,
    service: "airport",
    question: "Can I book Whitefield to the airport?",
    answer:
      "Yes. Choose Whitefield as pickup on the airport page. The fare is higher than a Hebbal pickup because it is a longer run — we show that up front.",
  },
];
