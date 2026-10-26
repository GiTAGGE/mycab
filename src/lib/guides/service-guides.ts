import type { PageGuide } from "./types";

export const serviceGuides: Record<string, PageGuide> = {
  "hubli:local": {
    title: "A few hours inside Hubballi",
    lead: "Not a drop to Dandeli. Same sedan for Unkal, Gokul Road, Keshwapur and a house you will name on WhatsApp.",
    types: [
      {
        name: "4 hours",
        body: "Two or three pins and a wait. Clinic, bank, a relative. Extra km is published before you start.",
      },
      {
        name: "8 hours",
        body: "The full town loop. Vidyanagar morning, Unkal afternoon, Gokul Road when it jams. Same driver the whole time.",
      },
      {
        name: "What we do not do",
        body: "This is not an A-to-B taxi and not an outstation. Belgaum, Hampi and Gokarna have their own pages.",
      },
    ],
    stopsHeading: "Useful Hubli pins",
    stops: [
      {
        title: "Unkal lake",
        kind: "Pause",
        body: "Five minutes, windows down, then the next house. Ask. He already knows the gate.",
      },
      {
        title: "Gokul Road chai",
        kind: "Tea",
        body: "After office this road is one moving jam. A steel glass is the only pause that still makes the next pin.",
      },
      {
        title: "Keshwapur labs",
        kind: "Errand",
        body: "Reports, pharmacy, a second opinion. The car stays. That is the package.",
      },
      {
        title: "Vidyanagar gates",
        kind: "Campus",
        body: "Pickup at the gate, not a hunt inside. Say the college name on WhatsApp.",
      },
    ],
  },
  "hubli:airport": {
    title: "HBX, door to door",
    lead: "Hubballi Airport is close. The fare changes with the neighbourhood, not with a surge slider.",
    types: [
      {
        name: "To HBX",
        body: "Navanagar and Unkal are short. Vidyanagar needs the morning buffer. Share the flight number.",
      },
      {
        name: "From HBX",
        body: "Nameboard at arrivals. He tracks delay if you sent the PNR. No terminal guessing.",
      },
      {
        name: "Not BLR",
        body: "If you landed in Bengaluru, that is a different city page. HBX is this airport.",
      },
    ],
    stopsHeading: "Airport notes",
    stops: [
      {
        title: "Navanagar hop",
        kind: "Short",
        body: "Often the fastest pin to HBX. Still a published fare, not a meter argument.",
      },
      {
        title: "Vidyanagar morning",
        kind: "School rush",
        body: "Leave earlier than the map says. The airport is close; the gates are not.",
      },
      {
        title: "Dharwad to HBX",
        kind: "Twin city",
        body: "Priced as a real transfer. Fog on that road is common before 8am.",
      },
    ],
  },
  "hubli:outstation": {
    title: "Out of Hubballi, on a published fare",
    lead: "Belgaum, Dharwad, Dandeli, Gokarna, Hampi, Murudeshwar — each road is different. Open the route. Do not read a generic Hubli poem.",
    types: [
      {
        name: "Business runs",
        body: "Belgaum is the straight north road. Dharwad is the twin-city hop. Both have their own fare cards.",
      },
      {
        name: "Forest and coast",
        body: "Dandeli is trees and a river. Gokarna and Karwar are ghats then salt. Murudeshwar is temple plus sea.",
      },
      {
        name: "Ruins",
        body: "Hampi and Hospet share a corridor, not a page. Jog and Sirsi are Malnad days.",
      },
    ],
    stopsHeading: "Pick the actual road",
    stops: [
      {
        title: "Open the route page",
        kind: "How to use this",
        body: "Each destination below has tea stalls, ghats and drops that only belong there. The Belgaum page will not talk about Unkal lake.",
      },
      {
        title: "Fuel and driver",
        kind: "Fare",
        body: "Included on the published number. Tolls are called out before you pay.",
      },
    ],
  },
  "hubli:tours": {
    title: "A few days from Hubballi, one car",
    lead: "Dandeli then Gokarna, or Hampi with a night in Hospet. You name the days. We do not invent a brochure you did not ask for.",
    types: [
      {
        name: "Forest + coast",
        body: "Dandeli water, then the ghat to Gokarna or Murudeshwar. Same driver. Bags stay in the boot.",
      },
      {
        name: "Ruins",
        body: "Hampi heat, Hospet sleep, Badami if you want caves on the way back.",
      },
      {
        name: "Tempo",
        body: "If the group is 7–12, say so. A sedan is the wrong stubbornness.",
      },
    ],
    stopsHeading: "Tour notes from Hubli",
    stops: [
      {
        title: "Do not re-book each morning",
        kind: "Same car",
        body: "That is the point of a tour. Night halt is yours. The driver starts when you do.",
      },
      {
        title: "Yellapur tea on forest days",
        kind: "Ghat",
        body: "Signal thins. A stall appears before the last forest bit. Drivers who do Dandeli already know it.",
      },
    ],
  },
  "dharwad:local": {
    title: "Hours inside Dharwad",
    lead: "University, Saptapur, Malamaddi, CBT. Narrow lanes. Same driver. Not a Hubli local with the name swapped.",
    types: [
      {
        name: "Campus day",
        body: "Gate pickup, a viva, a hostel, a pedha stop. 4 hours usually holds. 8 hours if parents are in town.",
      },
      {
        name: "Town loop",
        body: "Malamaddi mirrors in. Saptapur clinics. CBT if someone is on a bus. He does not horn his way through.",
      },
    ],
    stopsHeading: "Dharwad pins",
    stops: [
      {
        title: "University gate",
        kind: "Campus",
        body: "Wait at the gate. Inner circle is a waste of the package.",
      },
      {
        title: "Pedha shop",
        kind: "Food",
        body: "Box on the seat. This is a Dharwad errand, not decoration.",
      },
      {
        title: "Kelgeri pause",
        kind: "Lake",
        body: "Only if you ask. Two minutes, engine off.",
      },
    ],
  },
  "dharwad:airport": {
    title: "Dharwad to Hubballi Airport",
    lead: "HBX is not in Dharwad. The fare says the distance. Morning fog is real.",
    types: [
      {
        name: "To HBX",
        body: "Saptapur and University need more clock than CBT. Share the flight.",
      },
      {
        name: "From HBX",
        body: "Nameboard. Then the twin-city road, not a Hubli drop pretending to be Dharwad.",
      },
    ],
    stopsHeading: "Airport from Dharwad",
    stops: [
      {
        title: "Fog before 8",
        kind: "Weather",
        body: "Leave earlier than the map. This is the honest buffer.",
      },
      {
        title: "University pin",
        kind: "Longer city run",
        body: "Priced above a CBT pickup because it is longer. The card shows it.",
      },
    ],
  },
  "dharwad:outstation": {
    title: "Leaving Dharwad",
    lead: "Hubli next door, Belgaum shorter than from Hubli, Hampi and Goa as full sits. Start pin is here.",
    types: [
      {
        name: "Short",
        body: "Hubli is the twin-city fare. Belgaum is the north road from the university side.",
      },
      {
        name: "Long",
        body: "Bangalore wants an early start. Hampi is ruins. Goa is coast without a Hubli detour you did not ask for.",
      },
    ],
    stopsHeading: "Open the route",
    stops: [
      {
        title: "Each road has its own tea",
        kind: "Guidance",
        body: "The Belgaum page talks Kittur. The Hampi page talks coconuts and stone. This page will not mix them.",
      },
    ],
  },
  "belgaum:local": {
    title: "Hours inside Belagavi",
    lead: "Camp, Tilakwadi, Shahapur, Vadgaon. Cantonment shade. Not a Goa ghat article.",
    types: [
      {
        name: "Town",
        body: "Fort, thali, a wedding house, a clinic. 8 hours for function week. 4 hours for two pins.",
      },
      {
        name: "Camp",
        body: "Trees, slower traffic, windows down. A local driver already prefers this stretch.",
      },
    ],
    stopsHeading: "Belagavi pins",
    stops: [
      {
        title: "Fort walk",
        kind: "Town",
        body: "He waits. You walk. Same local hours.",
      },
      {
        title: "Kunda tin",
        kind: "Sweet",
        body: "Buy it in town. It is a Belgaum thing.",
      },
      {
        title: "Shahapur market",
        kind: "Busy",
        body: "Baskets, narrow, patience. Not an outstation.",
      },
    ],
  },
  "belgaum:airport": {
    title: "IXG, not HBX",
    lead: "Belagavi Airport is close. If you flew into Hubballi, say so — different city, different fare.",
    types: [
      {
        name: "To IXG",
        body: "Camp and Tilakwadi are city runs. Autonagar is closer. Share the flight.",
      },
      {
        name: "From IXG",
        body: "Nameboard, door, no surge after you confirm.",
      },
    ],
    stopsHeading: "IXG notes",
    stops: [
      {
        title: "Small airport",
        kind: "Belt",
        body: "You are at the door before the belt more often than in BLR. Still send the flight number.",
      },
    ],
  },
  "belgaum:outstation": {
    title: "Out of Belagavi",
    lead: "Goa is the ghat. Hubli is the straight road. Kolhapur and Pune go north. Gokarna is a beach without changing cars in Hubli.",
    types: [
      {
        name: "West",
        body: "Goa: mist, curves, tea at a bend. SUV if the bags are real.",
      },
      {
        name: "East and south",
        body: "Hubli business. Bangalore is the long overnight. Gokarna is coast from this side.",
      },
      {
        name: "Maharashtra",
        body: "Kolhapur temple and town. Pune is a full-day sit. We do not pretend these are Karnataka-only pages.",
      },
    ],
    stopsHeading: "Pick the road",
    stops: [
      {
        title: "Ghat vs highway",
        kind: "Feel",
        body: "Goa and Gokarna need the ghat paragraph. Hubli does not. Open the right link.",
      },
    ],
  },
  "bangalore:local": {
    title: "Hours inside Bengaluru",
    lead: "Koramangala, Indiranagar, HSR, Whitefield, MG Road — one driver, published 4 or 8 hours. Not Hubballi copy.",
    types: [
      {
        name: "Inner city",
        body: "Koramangala to Indiranagar to a house behind 100 Feet Road. Filter coffee is a legal pause. Traffic is the rest of the package.",
      },
      {
        name: "ORR and IT",
        body: "Whitefield, Marathahalli, Electronic City. An 8-hour from Whitefield is not the same day as one from Hebbal. We still price the package, not a fantasy.",
      },
      {
        name: "Errands that stick",
        body: "Clinic, school, Lalbagh, a second office. Same sedan. Extra km published up front.",
      },
    ],
    stopsHeading: "Bengaluru local notes",
    stops: [
      {
        title: "Darshini breakfast",
        kind: "Coffee · food",
        body: "Filter coffee, idli, five minutes. Then the first meeting. Ask for a pin that does not eat the hour.",
      },
      {
        title: "Lalbagh detour",
        kind: "Garden",
        body: "Glasshouse, then the next office. Local hours, not a tour bus.",
      },
      {
        title: "Indiranagar evening",
        kind: "Wait",
        body: "Dinner, shop, a lane behind. The car stays. That is why people stop stacking app rides.",
      },
      {
        title: "HSR / Koramangala loop",
        kind: "South-east",
        body: "Two offices and a house. Inner ring will decide if 4 hours is honest. 8 hours usually is.",
      },
      {
        title: "Whitefield as a base",
        kind: "ITPL",
        body: "If the day lives here, say Whitefield as from. Do not start the clock in Hebbal for a Whitefield day.",
      },
    ],
  },
  "bangalore:airport": {
    title: "BLR from the actual neighbourhood",
    lead: "Hebbal is not Whitefield. Electronic City is not Yelahanka. The fare on the card is the neighbourhood talking.",
    types: [
      {
        name: "North pins",
        body: "Hebbal and Yelahanka are the short BLR runs. Still share the flight. He tracks delay.",
      },
      {
        name: "East and south",
        body: "Whitefield, Marathahalli, HSR, Electronic City — longer, priced longer. No surprise at 4am.",
      },
      {
        name: "Meet and greet",
        body: "Nameboard at arrivals. Terminal as per the airline. You do not wander.",
      },
    ],
    stopsHeading: "BLR notes",
    stops: [
      {
        title: "Hebbal flyover",
        kind: "Approach",
        body: "Most north-city airport runs compress here. Dusk is slower than the map.",
      },
      {
        title: "Whitefield dawn",
        kind: "Long city",
        body: "Leave earlier than you think. The fare already assumed this distance.",
      },
      {
        title: "Electronic City",
        kind: "Hosur Road",
        body: "The longest usual city run to BLR. Priced that way on purpose.",
      },
    ],
  },
  "bangalore:outstation": {
    title: "Out of Bengaluru",
    lead: "Mysore is the usual. Coorg and Ooty ask for hills. Tirupati is a temple dawn. Goa and Hyderabad are overnight sits. Each route page is the real article.",
    types: [
      {
        name: "Short and frequent",
        body: "Mysore palace weekends. Nandi Hills sunrise and back. Chennai is a full day.",
      },
      {
        name: "Hills",
        body: "Coorg, Ooty, Wayanad. SUV if bags and ghats are both real.",
      },
      {
        name: "Long",
        body: "Hyderabad, Kochi, Goa, Pondicherry. Published fare, fuel and driver included. Tolls before you pay.",
      },
    ],
    stopsHeading: "Do not mix the roads",
    stops: [
      {
        title: "Open Mysore for Mysore",
        kind: "Guidance",
        body: "Maddur, filter coffee, palace road. That copy does not belong on Coorg or Hubli.",
      },
      {
        title: "Hills get their own tea",
        kind: "Ghat",
        body: "Coorg, Ooty and Wayanad each have a different stall and a different fog. Use the route link.",
      },
    ],
  },
  "bangalore:tours": {
    title: "A few days from Bengaluru",
    lead: "Mysore–Coorg, or Ooty with a night, or a temple circuit. Same car. You name the days.",
    types: [
      {
        name: "Palace and hills",
        body: "Mysore night, Coorg morning. One driver. Bags stay put.",
      },
      {
        name: "Temple",
        body: "Tirupati dawn, or a two-day mix you actually asked for. We do not pad with a brochure.",
      },
    ],
    stopsHeading: "Tour notes",
    stops: [
      {
        title: "SUV when the ghats start",
        kind: "Vehicle",
        body: "Coorg and Ooty with 4+ and luggage. Say it on WhatsApp. A sedan can still do a light pair.",
      },
    ],
  },
  "mangalore:local": {
    title: "Hours inside Mangaluru",
    lead: "Kadri, Hampankatta, Bejai, Kankanady, Pumpwell. Drizzle, temple, ghee roast. Same driver.",
    types: [
      {
        name: "Temple + market",
        body: "Kadri darshan, Hampankatta, a house in Bejai. 4 hours if you are honest. 8 hours if relatives appear.",
      },
      {
        name: "Rain",
        body: "Laterite, slow, wipers. The package already assumed this weather.",
      },
    ],
    stopsHeading: "Mangaluru pins",
    stops: [
      {
        title: "Kadri steps",
        kind: "Temple",
        body: "He waits under the tree. You walk back when the bells pause.",
      },
      {
        title: "Ghee roast",
        kind: "Food",
        body: "After darshan. The car will smell of it till Bejai.",
      },
      {
        title: "Panambur only if you go",
        kind: "Beach",
        body: "Juice, sand, shake off at the door. Not automatic on every local.",
      },
    ],
  },
  "mangalore:airport": {
    title: "IXE in drizzle",
    lead: "Kadri and Bejai are close. Surathkal is the longer city run. Red mud on the tyres is normal.",
    types: [
      {
        name: "To IXE",
        body: "Share the flight. Rain adds minutes, not a new fare after you confirm.",
      },
      {
        name: "From IXE",
        body: "Nameboard. Then the actual neighbourhood — Hampankatta is not Surathkal.",
      },
    ],
    stopsHeading: "IXE notes",
    stops: [
      {
        title: "Surathkal",
        kind: "Longer",
        body: "Coastal north of town. Priced above Kadri because it is.",
      },
      {
        title: "Pumpwell traffic",
        kind: "Junction",
        body: "Leave a buffer. The airport is close; this junction is not.",
      },
    ],
  },
  "mangalore:outstation": {
    title: "Out of Mangaluru",
    lead: "Udupi and Manipal are the short coast. Kasargod is Kerala. Coorg is hills. Bangalore and Goa are long sits.",
    types: [
      {
        name: "Coast north",
        body: "Udupi temple, Manipal campus, Kundapur further on. Windows down when the road allows the sea.",
      },
      {
        name: "Hills and long",
        body: "Coorg west from the coast. Bangalore is ghat then highway. Goa is a long NH66 day.",
      },
    ],
    stopsHeading: "Open the coast or the ghat",
    stops: [
      {
        title: "Udupi is not Goa",
        kind: "Guidance",
        body: "Temple town, 90 minutes. The Goa page is a different highway and a different night.",
      },
    ],
  },
  "mangalore:tours": {
    title: "Coast days from Mangaluru",
    lead: "Temple, beach, Udupi, maybe Coorg. Same car. You pick the nights.",
    types: [
      {
        name: "Temple circuit",
        body: "Kadri, Udupi, a beach if you want it. One driver.",
      },
      {
        name: "Hills add-on",
        body: "Coorg after the coast. SUV if the group and bags both grew.",
      },
    ],
    stopsHeading: "Tour notes",
    stops: [
      {
        title: "Ghee roast is not a stop on the Coorg ghat",
        kind: "Food",
        body: "Eat it in town. The hill road has its own tea. Different pages, different plates.",
      },
    ],
  },
};

for (const city of ["hubli", "dharwad", "belgaum", "bangalore", "mangalore"] as const) {
  const local = serviceGuides[`${city}:local`];
  if (local && !serviceGuides[`${city}:car-rental`]) {
    serviceGuides[`${city}:car-rental`] = {
      ...local,
      title: `A car with a driver in ${cityLabel(city)}`,
      lead: `Not self-drive. Sedan to tempo. Local hours, airport and outstation from ${cityLabel(city)} on published fares.`,
    };
  }
  const outstation = serviceGuides[`${city}:outstation`];
  if (outstation && !serviceGuides[`${city}:tempo`]) {
    serviceGuides[`${city}:tempo`] = {
      title: `12 seats from ${cityLabel(city)}`,
      lead: `Airport lots, family functions, multi-day roads out of ${cityLabel(city)}. Driver included.`,
      types: [
        {
          name: "When a sedan is wrong",
          body: "7–12 people, airport bags, a wedding. Tempo is the honest vehicle, not a convoy of surprise fares.",
        },
        ...(outstation.types.slice(0, 2) ?? []),
      ],
      stops: outstation.stops,
      stopsHeading: outstation.stopsHeading,
    };
  }
}

function cityLabel(slug: string) {
  const names: Record<string, string> = {
    hubli: "Hubballi",
    dharwad: "Dharwad",
    belgaum: "Belagavi",
    bangalore: "Bengaluru",
    mangalore: "Mangaluru",
  };
  return names[slug] ?? slug;
}
