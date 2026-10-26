import type { PageGuide } from "./types";

export const cityGuides: Record<string, PageGuide> = {
  hubli: {
    title: "How Hubballi actually moves",
    lead: "Vidyanagar, Gokul Road, Unkal, HBX — the pins people in Hubballi actually use.",
    types: [
      {
        name: "Local hours",
        body: "The sedan stays with you. Clinic in Keshwapur, house in Unkal, shop on Gokul Road. After 6pm that road is a single slow lane. That is the 8-hour package.",
      },
      {
        name: "Airport",
        body: "HBX is a short city hop, not a Bengaluru-style airport run. Navanagar and Unkal are close. Vidyanagar in the morning school rush is the one that needs extra minutes.",
      },
      {
        name: "Twin city",
        body: "Dharwad is 20 km and a different pin. Pedha on the way back is a real stop if you ask. Twin-city fares are published separately from Hubli local hours.",
      },
    ],
    stopsHeading: "Around Hubballi",
    stops: [
      {
        title: "Unkal lake pause",
        kind: "Lake · 10 minutes",
        body: "People ask to stop with the windows down. Garden path, still water, then back to the pin. This is a local-hours detour, not an outstation.",
      },
      {
        title: "Cutting chai, Gokul Road",
        kind: "Tea · office rush",
        body: "Steel glass, steam on the windshield, left lane again. Drivers who work Hubli already know which stall does not make you miss the next meeting.",
      },
      {
        title: "Vidyanagar college gates",
        kind: "Campus · wait",
        body: "One call, bags in, no inner-circle hunt. The car waits at the gate. Horns do not help here.",
      },
      {
        title: "Keshwapur clinic loop",
        kind: "Errands",
        body: "Scan, pharmacy, a relative’s house. Same driver. This is why people book 4 hours instead of three app drops.",
      },
      {
        title: "Navanagar to HBX",
        kind: "Airport · short",
        body: "The airport is actually near. Share the flight number. He is at arrivals before the belt, not circling the city.",
      },
      {
        title: "Dharwad pedha on the way home",
        kind: "Food · twin city",
        body: "Box on the seat, smell till Vidyanagar. A twin-city errand on the way home.",
      },
    ],
  },
  dharwad: {
    title: "How Dharwad actually moves",
    lead: "University lanes, Malamaddi, Saptapur — and an airport that is in Hubballi, priced as Hubballi.",
    types: [
      {
        name: "Local hours",
        body: "Saptapur, Malamaddi, University, a clinic. Lanes are narrow. Mirrors in. The same driver for the afternoon is the whole point.",
      },
      {
        name: "Airport",
        body: "There is no Dharwad airport. HBX is a real transfer with morning fog on that road more often than people from out of town expect.",
      },
      {
        name: "Twin city",
        body: "Hubli is next door. CBT, then the flyover. Pickup starts from your Dharwad pin.",
      },
    ],
    stopsHeading: "Around Dharwad",
    stops: [
      {
        title: "Kelgeri lake",
        kind: "Lake · quiet",
        body: "Two minutes with the engine off before the Hubli hop. Water, trees, then the flyover.",
      },
      {
        title: "University gate",
        kind: "Campus",
        body: "Viva over, bags out. The car is at the gate, not the inner circle. One call from the driver.",
      },
      {
        title: "Pedha counter",
        kind: "Food",
        body: "Line, box, string. Not a tourist stop. People from here do this on the way out of town.",
      },
      {
        title: "Malamaddi lanes",
        kind: "Tight streets",
        body: "A scooter every two metres. A driver who knows the town does not need the horn.",
      },
      {
        title: "Kalaghatagi Road in rain",
        kind: "Red earth",
        body: "Wipers, hill line when the cloud lifts. Outstation from Dharwad often starts like this.",
      },
    ],
  },
  belgaum: {
    title: "How Belagavi actually moves",
    lead: "Camp trees, Tilakwadi, Shahapur, IXG — and the ghat that becomes Goa only if that is the trip you booked.",
    types: [
      {
        name: "Local hours",
        body: "Camp, Tilakwadi, Shahapur, a wedding house. The 8-hour package is the one that survives a function week.",
      },
      {
        name: "Airport",
        body: "IXG is close. You are at the door before the belt. If your flight is actually HBX, say so — that is a different run.",
      },
      {
        name: "Food in town",
        body: "Kunda, thali, a tea on the cantonment stretch. Local hours cover the fort and lunch. The Goa ghat is a separate outstation booking.",
      },
    ],
    stopsHeading: "Around Belagavi",
    stops: [
      {
        title: "Camp shade",
        kind: "Cantonment",
        body: "The tree stretch is cooler. People keep the windows down here even when the AC works.",
      },
      {
        title: "Fort and thali",
        kind: "Town · food",
        body: "Walk the fort, sit for a meal. He waits in the shade or eats at the next table. Same local hours.",
      },
      {
        title: "Kunda for the road",
        kind: "Sweet · takeaway",
        body: "A tin on the seat if you are leaving town. Buy it in Camp or Tilakwadi before the highway.",
      },
      {
        title: "Tilakwadi to IXG",
        kind: "Airport",
        body: "Short city run. Nameboard at arrivals. No terminal guessing.",
      },
      {
        title: "Shahapur morning",
        kind: "Markets",
        body: "Narrow, busy, vegetable baskets. A local driver already knows which lane is blocked today.",
      },
    ],
  },
  bangalore: {
    title: "How Bengaluru actually moves",
    lead: "Flyovers, filter coffee, and a fare that already knows Whitefield is not Hebbal.",
    types: [
      {
        name: "Local hours",
        body: "Koramangala, Indiranagar, a client in HSR, a house in Jayanagar. The 8-hour package is for a day that will not stay on one pin. ORR and inner ring do not behave the same.",
      },
      {
        name: "Airport",
        body: "Hebbal and Yelahanka are the short BLR runs. Whitefield and Electronic City are not. The card should show that before you pack.",
      },
      {
        name: "City food",
        body: "Filter coffee before a meeting, a darshini breakfast, chaat after the last pin. Local hours include the wait.",
      },
    ],
    stopsHeading: "Around Bengaluru",
    stops: [
      {
        title: "Filter coffee, then the next pin",
        kind: "Coffee",
        body: "Steel tumbler, five minutes, then Koramangala or MG Road. Drivers who work this city already know which darshini does not eat the hour.",
      },
      {
        title: "Hebbal at dusk",
        kind: "Airport approach",
        body: "The flyover looks like a circuit. Most BLR pickups that are not Whitefield start the clock here.",
      },
      {
        title: "Lalbagh in a local package",
        kind: "Garden",
        body: "Glasshouse, one extra stop, then the next meeting. Same driver. Not an outstation.",
      },
      {
        title: "Whitefield evening",
        kind: "IT corridor",
        body: "ORR crawl, then ITPL. A local 8-hour from here is a different day than one from Hebbal. The fare should already say so.",
      },
      {
        title: "Indiranagar 100 Feet",
        kind: "Errands · dinner",
        body: "Shop, cafe, a house lane behind. The car waits. App-hopping this street at night is how people lose an hour.",
      },
      {
        title: "Electronic City toll stretch",
        kind: "South pin",
        body: "Hosur Road, then the gates. Airport from here is the long city run — priced that way, not as a Hebbal hop.",
      },
    ],
  },
  mangalore: {
    title: "How Mangaluru actually moves",
    lead: "Laterite, drizzle, Kadri bells, then ghee roast.",
    types: [
      {
        name: "Local hours",
        body: "Kadri, Hampankatta, Bejai, Kankanady. Temple, market, a house. The car waits in drizzle. That is local here.",
      },
      {
        name: "Airport",
        body: "IXE sits in rain more often than not. Kadri and Bejai are close. Surathkal is the longer city run.",
      },
      {
        name: "Food in town",
        body: "Ghee roast after darshan, neer dosa, a juice at Panambur if you actually go to the beach. The car will smell of it. Nobody complains.",
      },
    ],
    stopsHeading: "Around Mangaluru",
    stops: [
      {
        title: "Kadri temple",
        kind: "Temple",
        body: "Steps, bells, back to the car. Driver waits under the tree. No circling the tank.",
      },
      {
        title: "Ghee roast after darshan",
        kind: "Food",
        body: "That is the order. The car smells of it till Bejai.",
      },
      {
        title: "Hampankatta market",
        kind: "Town",
        body: "Gold, cloth, horn. A local driver already knows which side to wait on.",
      },
      {
        title: "Panambur evening",
        kind: "Beach · juice",
        body: "Kids sandy, juice stall, shake off at the door. A local-hours detour, not an Udupi drop.",
      },
      {
        title: "IXE drizzle",
        kind: "Airport · rain",
        body: "Red mud on the tyres. Nameboard at arrivals. The fare already knew this airport.",
      },
    ],
  },
};
