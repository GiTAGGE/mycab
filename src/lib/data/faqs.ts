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
  {
    id: "f8",
    citySlug: "dharwad",
    routeId: null,
    service: "airport",
    question: "Does Dharwad have its own airport?",
    answer:
      "No. Flights use Hubballi Airport (HBX). We price Dharwad → HBX as a real transfer, not a Hubli fare with the name swapped.",
  },
  {
    id: "f9",
    citySlug: "hubli",
    routeId: null,
    service: "local",
    question: "Can I keep a car for a few hours in Hubli?",
    answer:
      "Yes. Local is a 4-hour or 8-hour package with the same driver — not a one-drop city taxi. Extra kilometres are published before you confirm.",
  },
  {
    id: "f10",
    citySlug: "belgaum",
    routeId: "bgm-goa",
    service: null,
    question: "How long is Belgaum to Goa?",
    answer:
      "Usually about 3 hours 30 minutes, depending on the ghat stretch. We quote door-to-door, not a highway-only fantasy.",
  },
  {
    id: "f11",
    citySlug: "mangalore",
    routeId: null,
    service: "local",
    question: "Is local rental different from a one-way drop?",
    answer:
      "Yes. Local is hours in Mangalore with multiple stops. A one-way is A to B. Pick the trip type that matches what you are actually doing.",
  },
  {
    id: "f12",
    citySlug: "hubli",
    routeId: "hbl-dandeli",
    service: null,
    question: "Is Hubli to Dandeli better as a return?",
    answer:
      "Usually yes. Most groups raft and come back the same evening. We show both one-way and return — pick the one that matches the stay.",
  },
  {
    id: "f13",
    citySlug: "hubli",
    routeId: "hbl-murudeshwar",
    service: null,
    question: "Do you cover Murudeshwara as well as Murudeshwar?",
    answer:
      "Same place. Temple, beach, and the statue. The page is /hubli-to-murudeshwar-cab — the extra ‘a’ in Murudeshwara still lands here.",
  },
  {
    id: "f14",
    citySlug: "hubli",
    routeId: "hbl-hospet",
    service: null,
    question: "Should I book Hubli to Hospet or Hubli to Hampi?",
    answer:
      "Hospet if you want the town, station or a hotel. Hampi if the drop is the ruins. They are close — tell us the pin on WhatsApp and we keep the same car.",
  },
];
