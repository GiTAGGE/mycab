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
    question: "Is the published fare the fare?",
    answer:
      "Yes. The number you see is the fare for that trip — we do not split it into one-way and return. Tolls on the route are called out before confirmation.",
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
      "Pickup point and time of day can change the last rupees. The published fare is the fare; we confirm tolls before you pay.",
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
    question: "Is local rental different from a drop?",
    answer:
      "Yes. Local is hours in Mangalore with multiple stops. Outstation is A to B between cities. Pick the trip type that matches what you are actually doing.",
  },
  {
    id: "f12",
    citySlug: "hubli",
    routeId: "hbl-dandeli",
    service: null,
    question: "Is Hubli to Dandeli usually a same-day trip?",
    answer:
      "Usually yes. Most groups raft and come back the same evening. The published fare is the fare either way — tell us the stay on WhatsApp.",
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
  {
    id: "f15",
    citySlug: "hubli",
    routeId: null,
    service: "car-rental",
    question: "Is Hubli car rental self-drive?",
    answer:
      "No. The car comes with a driver. If you searched “Hubli car rental”, this is the page — not a self-drive counter.",
  },
  {
    id: "f16",
    citySlug: "hubli",
    routeId: null,
    service: "tours",
    question: "Do you sell fixed Hubli tour packages?",
    answer:
      "We run the days you name — Dandeli, Gokarna, Murudeshwar, Hampi — with the same car. We do not lock you into a brochure itinerary.",
  },
  {
    id: "f17",
    citySlug: "hubli",
    routeId: null,
    service: "tempo",
    question: "When should I book a tempo traveller in Hubli?",
    answer:
      "When you are more than six or seven with bags. Airport lots, family functions, and multi-day coast runs. A sedan will not pretend to be a 12-seater.",
  },
  {
    id: "f18",
    citySlug: "dharwad",
    routeId: null,
    service: "car-rental",
    question: "Can I book a Dharwad taxi from a Hubli search?",
    answer:
      "Yes, but start on the Dharwad page if pickup is Dharwad. Twin-city fare to Hubli is published. Airport is still Hubballi.",
  },
  {
    id: "f19",
    citySlug: "belgaum",
    routeId: null,
    service: "airport",
    question: "Is Belgaum airport the same as Hubballi?",
    answer:
      "No. Belgaum uses IXG. Hubli and Dharwad use HBX. We do not mix those fares.",
  },
  {
    id: "f20",
    citySlug: "mangalore",
    routeId: null,
    service: "tours",
    question: "Do you do coastal days from Mangalore?",
    answer:
      "Yes — Udupi, Manipal, and longer coast runs. Tell us the days. Same driver throughout.",
  },
];
