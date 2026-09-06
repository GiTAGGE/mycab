export type JourneyStop = {
  title: string;
  kind: string;
  body: string;
};

export type JourneyGuide = {
  citySlug: string;
  title: string;
  lead: string;
  types: Array<{ name: string; body: string }>;
  stops: JourneyStop[];
};

export const journeyGuides: JourneyGuide[] = [
  {
    citySlug: "hubli",
    title: "How a trip from Hubli actually feels",
    lead: "Not a brochure. The road, the tea, the temple, the ghat — what people sit through when they book from Hubballi.",
    types: [
      {
        name: "Local hours",
        body: "Vidyanagar to Unkal to Keshwapur in the same sedan. The driver stays. You get down for a shop, a clinic, a house. Gokul Road after 6 is slow. That is the trip.",
      },
      {
        name: "Airport",
        body: "HBX is close. Navanagar and Unkal are a short hop. Vidyanagar takes longer in the morning. He tracks the flight if you share the number.",
      },
      {
        name: "Outstation",
        body: "Dharwad is a twin-city hop. Belgaum is a straight run. Gokarna and Dandeli are the ones people actually sit for — forest, then coast, or forest and back.",
      },
      {
        name: "Tours",
        body: "Same car for two or three days. Hampi heat, Murudeshwar temple, a night on the coast. One driver. You do not re-book each morning.",
      },
    ],
    stops: [
      {
        title: "Unkal lake",
        kind: "Lake · breeze",
        body: "The water sits still in the afternoon. People ask for five minutes with the windows down. The garden path is a short walk. Then back to the pin.",
      },
      {
        title: "Cutting chai on Gokul Road",
        kind: "Tea · busy road",
        body: "After office the road is a single moving jam. A steel glass of chai at a stall, steam on the windshield, then the left lane again.",
      },
      {
        title: "Yellapur stretch",
        kind: "Hills · forest",
        body: "Towards Dandeli the trees close in. Phone signal thins. A tea stall appears before the last forest bit. Drivers who do this run already know it.",
      },
      {
        title: "Gokarna beach drop",
        kind: "Coast · food",
        body: "Ghat, then the smell of salt. People want a juice before the beach road. The car waits in the shade. Sand stays mostly outside if you ask.",
      },
      {
        title: "Murudeshwar temple",
        kind: "Temple · sea",
        body: "The gopuram from the parking lot, then the sea behind it. Driver waits. No circling, no horn. You walk back when the darshan is done.",
      },
      {
        title: "Hampi boulders",
        kind: "Ruins · heat · coconut",
        body: "The stone holds the sun. Tender coconut by the road is not decoration — it is the pause. Same Innova back to Hospet or Hubli.",
      },
      {
        title: "Dharwad pedha on the way home",
        kind: "Food · twin city",
        body: "The box goes on the seat. The car smells of it till Vidyanagar. Twin-city fare, not a renamed Hubli price.",
      },
    ],
  },
  {
    citySlug: "dharwad",
    title: "How a trip from Dharwad actually feels",
    lead: "University town, tight lanes, and an airport that is in Hubballi. The fare should say that out loud.",
    types: [
      {
        name: "Local hours",
        body: "Saptapur, Malamaddi, University, a clinic, a house. Lanes are narrow. The same driver for the afternoon is the point.",
      },
      {
        name: "Airport",
        body: "HBX is not in Dharwad. The run is priced as Hubballi Airport. Morning fog sits on that road more often than people expect.",
      },
      {
        name: "Outstation",
        body: "Hubli is next door. Hampi, Belgaum and Goa are the longer sits. You start from Dharwad — the pin is here, not a Hubli stand.",
      },
    ],
    stops: [
      {
        title: "Kelgeri lake",
        kind: "Lake · quiet",
        body: "A pause before the Hubli hop. Water, trees, two minutes with the engine off. Then the flyover.",
      },
      {
        title: "University gate",
        kind: "Campus · wait",
        body: "Viva over, bags out. One call from the driver, not a stream. The car is at the gate, not the inner circle.",
      },
      {
        title: "Pedha shop",
        kind: "Food",
        body: "Line, box, string. It goes on the seat. This is not a tourist stop. It is what people from here do on the way out.",
      },
      {
        title: "Malamaddi lanes",
        kind: "Busy streets",
        body: "Mirrors in. Slow. A scooter every two metres. A driver who knows the town does not need the horn.",
      },
      {
        title: "Kalaghatagi Road in rain",
        kind: "Scenery · rain",
        body: "Wipers, red earth, the hill line when the cloud lifts. Outstation starts like this more often than the photos show.",
      },
    ],
  },
  {
    citySlug: "belgaum",
    title: "How a trip from Belgaum actually feels",
    lead: "Cantonment trees, a small airport, and the ghat that becomes Goa. Belagavi weather changes on that road.",
    types: [
      {
        name: "Local hours",
        body: "Camp, Tilakwadi, Shahapur. Meetings and family stops. The 8-hour package is the one that fits a wedding week.",
      },
      {
        name: "Airport",
        body: "IXG is close. You are at the door before the belt. HBX is a longer run if that is the flight you actually took.",
      },
      {
        name: "Outstation",
        body: "Goa is the ghat. Hubli is the straight road. Kolhapur is the north run. Same published fare either way.",
      },
    ],
    stops: [
      {
        title: "Camp trees",
        kind: "Town · shade",
        body: "The cantonment stretch is cooler. People ask to keep the windows down here even when the AC works.",
      },
      {
        title: "Tea on the Goa ghat",
        kind: "Hills · tea",
        body: "A bend, a stall, a valley. The driver does not rush the curves after that cup.",
      },
      {
        title: "Fort and thali",
        kind: "Temple · food",
        body: "Walk the fort, sit for a thali. He eats at the next table or waits in the shade. Same local hours.",
      },
      {
        title: "Rain on the ghats",
        kind: "Scenery · rain",
        body: "Mist in the trees, lights on, no overtaking. This is why people ask for an SUV for Goa.",
      },
    ],
  },
  {
    citySlug: "bangalore",
    title: "How a trip from Bangalore actually feels",
    lead: "Flyovers, filter coffee, and a fare that already knows Whitefield is not Hebbal.",
    types: [
      {
        name: "Local hours",
        body: "Koramangala, Indiranagar, a client, a house. The 8-hour package is for a day that will not stay on one pin.",
      },
      {
        name: "Airport",
        body: "Hebbal is short. Whitefield and Electronic City are not. The card should show that before you pack.",
      },
      {
        name: "Outstation",
        body: "Mysore is the usual. Coorg and Ooty ask for an SUV if the bags are real. Same published fare either way.",
      },
    ],
    stops: [
      {
        title: "Filter coffee before Mysore road",
        kind: "Coffee · highway",
        body: "Steel tumbler, then the long road. The first hour is still city. Then it opens.",
      },
      {
        title: "Hebbal at dusk",
        kind: "Busy roads",
        body: "The flyover looks like a circuit. Airport runs start here more than any other pin.",
      },
      {
        title: "Nandi Hills mist",
        kind: "Hills · tea",
        body: "Plastic-cup tea, jacket on, city below the cloud. A short outstation that still feels like a trip.",
      },
      {
        title: "Lalbagh detour",
        kind: "Garden",
        body: "One extra stop in a local package. Glasshouse, then the next meeting. Same driver.",
      },
    ],
  },
  {
    citySlug: "mangalore",
    title: "How a trip from Mangalore actually feels",
    lead: "Laterite, drizzle, temple, then ghee roast. The coast does not hide.",
    types: [
      {
        name: "Local hours",
        body: "Kadri, Hampankatta, Bejai. Temple, market, a house. The car waits. That is local here.",
      },
      {
        name: "Airport",
        body: "IXE sits in drizzle more often than not. Kadri and Bejai are close. Surathkal is the longer city run.",
      },
      {
        name: "Outstation",
        body: "Udupi is the short coast hop. Bangalore is the overnight. Manipal is the campus run.",
      },
    ],
    stops: [
      {
        title: "Kadri temple",
        kind: "Temple",
        body: "Steps, bells, then back to the car. Driver waits under the tree. No circling the tank.",
      },
      {
        title: "Ghee roast after darshan",
        kind: "Food",
        body: "That is the order. The car smells of it till Bejai. Nobody complains.",
      },
      {
        title: "Coast road to Udupi",
        kind: "Scenery · salt",
        body: "Windows down, laterite walls, the sea when the road allows it. Tender coconut is the pause.",
      },
      {
        title: "Panambur evening",
        kind: "Beach · juice",
        body: "Kids sandy, juice stall, the car still clean enough if you shake off at the door.",
      },
      {
        title: "IXE drizzle",
        kind: "Airport · rain",
        body: "Red mud on the tyres. He is at arrivals with the name. The fare already knew this airport.",
      },
    ],
  },
];

export function journeyForCity(citySlug: string): JourneyGuide | undefined {
  return journeyGuides.find((guide) => guide.citySlug === citySlug);
}
