import type { ServiceKind } from "@/types";
import type { Review } from "@/lib/data/reviews";

const TARGETS: Record<string, number> = {
  hubli: 520,
  dharwad: 310,
  bangalore: 220,
  belgaum: 210,
  mangalore: 210,
};

const FIRST = [
  "Aishwarya", "Akshay", "Amruta", "Ananya", "Anil", "Ankita", "Arjun", "Ashok",
  "Bhavana", "Chetan", "Deepa", "Deepak", "Divya", "Farhan", "Ganesh", "Geeta",
  "Harish", "Harshita", "Imran", "Jyoti", "Kiran", "Krishna", "Lakshmi", "Lata",
  "Madhuri", "Mahesh", "Manjunath", "Meena", "Nandini", "Naveen", "Neha", "Nikhil",
  "Pooja", "Pradeep", "Pramod", "Preeti", "Rahul", "Ramesh", "Rashmi", "Ravi",
  "Rekha", "Rohit", "Sana", "Sandhya", "Sanjay", "Savita", "Shankar", "Shreya",
  "Sneha", "Somashekar", "Suma", "Sunil", "Suresh", "Swati", "Tanvi", "Umesh",
  "Vaishnavi", "Varun", "Vijay", "Vinod", "Yash", "Zoya", "Abhinav", "Chaitra",
  "Devika", "Gopal", "Irfan", "Jeevan", "Keerthi", "Lalita", "Manoj", "Nithin",
  "Padma", "Raghav", "Sameera", "Tejas", "Usha", "Vikas", "Yogesh", "Zainab",
  "Aditi", "Bharat", "Chandan", "Disha", "Esha", "Faisal", "Gayatri", "Hemant",
  "Ishaan", "Jaya", "Kavya", "Leela", "Mohan", "Namrata", "Omar", "Priya",
  "Qadir", "Rajesh", "Shruti", "Trisha", "Uma", "Vivek", "Wasim", "Yamini",
  "Anushree", "Basavaraj", "Channabasappa", "Deepti", "Girish", "Hanumanth",
  "Jayashree", "Kaveri", "Lingraj", "Mallikarjun", "Nagaraj", "Parveen",
  "Renuka", "Shivakumar", "Tanuja", "Veeranna", "Yogita", "Ayesha",
];

const INITIALS = "ABCDEFGHJKLMNOPQRSTUVWXYZ".split("");

const PHOTOS = [
  "/reviews/w1.jpg",
  "/reviews/w2.jpg",
  "/reviews/w3.jpg",
  "/reviews/w4.jpg",
  "/reviews/w5.jpg",
  "/reviews/w6.jpg",
  "/reviews/w7.jpg",
  "/reviews/m1.jpg",
  "/reviews/m2.jpg",
  "/reviews/m3.jpg",
  "/reviews/m4.jpg",
  "/reviews/m5.jpg",
  "/reviews/m6.jpg",
  "/reviews/m7.jpg",
  "/reviews/m8.jpg",
];

const MONTHS = [
  "Jan 2025",
  "Mar 2025",
  "May 2025",
  "Jul 2025",
  "Sep 2025",
  "Nov 2025",
  "Jan 2026",
  "Mar 2026",
  "May 2026",
  "Jul 2026",
  "Aug 2026",
  "Sep 2026",
];

type TripSeed = {
  trip: string;
  place: string;
  service: ServiceKind;
  routeId?: string;
};

const CITY_TRIPS: Record<string, TripSeed[]> = {
  hubli: [
    { trip: "Hubli → Gokarna", place: "Vidyanagar", service: "outstation", routeId: "hbl-gokarna" },
    { trip: "Hubli → Dandeli", place: "Gokul Road", service: "outstation", routeId: "hbl-dandeli" },
    { trip: "Hubli → Murudeshwar", place: "Unkal", service: "tours", routeId: "hbl-murudeshwar" },
    { trip: "Hubli → Hampi", place: "Navanagar", service: "tours", routeId: "hbl-hampi" },
    { trip: "Hubli → Belgaum", place: "Keshwapur", service: "outstation", routeId: "hbl-belgaum" },
    { trip: "Hubli → Dharwad", place: "Hubli", service: "outstation", routeId: "hbl-dharwad" },
    { trip: "Hubli → Goa", place: "Deshpande Nagar", service: "outstation", routeId: "hbl-goa" },
    { trip: "Hubli → Bangalore", place: "Vidyanagar", service: "outstation", routeId: "hbl-bangalore" },
    { trip: "Hubli → Sirsi", place: "Unkal", service: "outstation", routeId: "hbl-sirsi" },
    { trip: "Hubli → Badami", place: "Gokul Road", service: "outstation", routeId: "hbl-badami" },
    { trip: "Hubli → Jog Falls", place: "Navanagar", service: "tours", routeId: "hbl-jog-falls" },
    { trip: "HBX → city", place: "Hubballi Airport", service: "airport" },
    { trip: "City → HBX", place: "Vidyanagar", service: "airport" },
    { trip: "Local hours", place: "Keshwapur", service: "local" },
    { trip: "Car rental with driver", place: "Hubli", service: "car-rental" },
    { trip: "Tempo for a group", place: "Gokul Road", service: "tempo" },
  ],
  dharwad: [
    { trip: "Dharwad → Hubli", place: "Saptapur", service: "outstation", routeId: "dwd-hubli" },
    { trip: "Dharwad → HBX", place: "University", service: "airport" },
    { trip: "HBX → Dharwad", place: "Hubballi Airport", service: "airport" },
    { trip: "Dharwad taxi", place: "Malamaddi", service: "local" },
    { trip: "Dharwad → Hampi", place: "CBT", service: "outstation", routeId: "dwd-hampi" },
    { trip: "Dharwad → Belgaum", place: "Kalaghatagi Road", service: "outstation", routeId: "dwd-belgaum" },
    { trip: "Dharwad → Goa", place: "Dharwad", service: "outstation", routeId: "dwd-goa" },
    { trip: "Local hours", place: "University", service: "local" },
    { trip: "Car rental with driver", place: "Saptapur", service: "car-rental" },
    { trip: "Dandeli covering Dharwad", place: "Narayanpur", service: "tours" },
  ],
  bangalore: [
    { trip: "Whitefield → BLR", place: "Whitefield", service: "airport" },
    { trip: "Hebbal → BLR", place: "Hebbal", service: "airport" },
    { trip: "Bangalore → Mysore", place: "Jayanagar", service: "outstation", routeId: "blr-mysore" },
    { trip: "Bangalore → Coorg", place: "Koramangala", service: "outstation", routeId: "blr-coorg" },
    { trip: "Local 8 hours", place: "Indiranagar", service: "local" },
    { trip: "Electronic City → BLR", place: "Electronic City", service: "airport" },
    { trip: "Bangalore → Ooty", place: "HSR Layout", service: "outstation", routeId: "blr-ooty" },
    { trip: "Car rental with driver", place: "MG Road", service: "car-rental" },
    { trip: "Tempo for a group", place: "Marathahalli", service: "tempo" },
  ],
  belgaum: [
    { trip: "IXG → city", place: "Belagavi Airport", service: "airport" },
    { trip: "Belgaum → Goa", place: "Camp", service: "outstation", routeId: "bgm-goa" },
    { trip: "Belgaum → Hubli", place: "Tilakwadi", service: "outstation", routeId: "bgm-hubli" },
    { trip: "Local Belagavi hours", place: "Shahapur", service: "local" },
    { trip: "Belgaum → Kolhapur", place: "Vadgaon", service: "outstation", routeId: "bgm-kolhapur" },
    { trip: "Car rental with driver", place: "Autonagar", service: "car-rental" },
    { trip: "Hubli Airport → Belgaum", place: "Camp", service: "airport" },
  ],
  mangalore: [
    { trip: "IXE → city", place: "Kadri", service: "airport" },
    { trip: "Mangalore → Udupi", place: "Hampankatta", service: "outstation", routeId: "mlr-udupi" },
    { trip: "Local Mangaluru hours", place: "Bejai", service: "local" },
    { trip: "Mangalore → Bangalore", place: "Pumpwell", service: "outstation", routeId: "mlr-bangalore" },
    { trip: "Car rental with driver", place: "Kankanady", service: "car-rental" },
    { trip: "Mangalore → Manipal", place: "Surathkal", service: "outstation", routeId: "mlr-manipal" },
    { trip: "Airport → city", place: "IXE", service: "airport" },
  ],
};

const CITY_MOMENTS: Record<string, string[]> = {
  hubli: [
    "Stopped for cutting chai near Unkal lake — steam on the glass, lake wind in the door.",
    "Gokul Road was packed after office. Driver just stayed in the left lane, no horn show.",
    "Tea at a small stall after Yellapur, then the forest stretch went quiet.",
    "Kids wanted sugarcane juice before the ghat. Driver knew a clean stall.",
    "Morning pedha box from Dharwad on the way back. Car still smelled of it.",
    "Unkal garden walk, then back to Vidyanagar before the rain.",
    "Temple stop at Murudeshwar, driver waited in the shade without calling every ten minutes.",
    "Hampi heat, then tender coconut by the boulders. Same Innova the whole day.",
    "HBX fog in the morning. Flight board was late; he was still at arrivals.",
    "Busy CBT traffic, then the twin-city flyover opened up.",
  ],
  dharwad: [
    "Kelgeri lake was still. We sat five minutes with the AC off.",
    "University gate pickup after a viva. Driver had already called once, not ten times.",
    "Dharwad pedha stop is not optional in this family. He knew the shop.",
    "Malamaddi lanes are tight. He folded the mirror and did not scrape.",
    "Filter coffee at a Udupi hotel, then the Hubli hop.",
    "Rain on Kalaghatagi Road. Wipers on, slow, no drama.",
    "Temple visit first, hospital next. Same local hours, same driver.",
    "Evening light on the hill road out of town. Windows down for ten minutes.",
  ],
  bangalore: [
    "Outer Ring Road crawl, then a sudden gap. He did not jump lanes for sport.",
    "Filter coffee in a steel tumbler before the Mysore road.",
    "Hebbal flyover at dusk. City looking like a circuit board.",
    "Nandi Hills mist, then hot tea from a plastic cup.",
    "Koramangala lunch stop — he parked and waited, no meter argument.",
    "Whitefield to BLR with bags. He had the flight time already.",
    "Lalbagh was a detour. Worth it. Same 8-hour package.",
  ],
  belgaum: [
    "Camp cantonment trees, then the ghat towards Goa.",
    "Tea at a bend, valley opening below the road.",
    "IXG is small. He was at the door before the belt sign went off.",
    "Fort visit, then a thali. Driver ate at the next table, no rush.",
    "Rain on the Ghats. Slow, lights on, no overtaking circus.",
    "Shahapur market was jammed. He cut behind the bus stand.",
  ],
  mangalore: [
    "Kadri temple first, ghee roast after. That is the order here.",
    "IXE drizzle, laterite red on the tyres.",
    "Coast road to Udupi, windows down, salt in the air.",
    "Tender coconut after the temple. Driver waited under the peepal.",
    "Pumpwell signal, then the bypass finally moved.",
    "Evening at Panambur, kids sandy, car still clean enough.",
    "Filter coffee and neer dosa before the Bangalore overnight start.",
  ],
};

type Lang = "en" | "hi" | "kn";

function pick<T>(list: T[], n: number): T {
  return list[Math.abs(n) % list.length] as T;
}

function body(lang: Lang, seed: TripSeed, city: string, moment: string, salt: number): string {
  if (lang === "hi") {
    const lines = [
      `${seed.trip} ke liye cab liya. Jo fare page pe tha, wahi mila. Extra nahi maanga.`,
      `Driver time pe aaya. ${seed.place} se pickup smooth tha.`,
      `${city} se booking kiya — WhatsApp pe confirm, koi confusion nahi.`,
      `Gaadi saaf thi, AC theek tha. Wapas bhi same driver.`,
    ];
    return `${pick(lines, salt)} ${moment}`;
  }
  if (lang === "kn") {
    const lines = [
      `Driver time-ge bandru. ${seed.trip} chennagittu. Fare card-alli iddu, extra illa.`,
      `${seed.place} inda pickup. Waiting madoke beku aagilla.`,
      `${city} alli book madide. WhatsApp-alli confirm, same amount.`,
      `Car clean, driver quiet. Same fare, same car return-ge.`,
    ];
    return `${pick(lines, salt)} ${moment}`;
  }
  const lines = [
    `Booked ${seed.trip}. Fare was on the card before WhatsApp.`,
    `Pickup at ${seed.place}. Driver was at the pin, not a street away.`,
    `Needed this from ${city}. Published fare, then a clean car.`,
    `Same driver there and back. No one-way argument.`,
  ];
  return `${pick(lines, salt)} ${moment}`;
}

export function generateCityReviews(featured: Review[]): Review[] {
  const usedNames = new Set(featured.map((review) => review.name));
  const extra: Review[] = [];

  for (const [citySlug, target] of Object.entries(TARGETS)) {
    const have = featured.filter((review) => review.citySlug === citySlug).length;
    const trips = CITY_TRIPS[citySlug] ?? [];
    const moments = CITY_MOMENTS[citySlug] ?? CITY_MOMENTS.hubli;
    const langs: Lang[] = ["en", "hi", "kn"];
    let i = 0;
    let guard = 0;
    while (have + extra.filter((review) => review.citySlug === citySlug).length < target) {
      guard += 1;
      if (guard > target * 8) break;
      const trip = pick(trips, i * 3 + 1);
      const first = pick(FIRST, i * 5 + citySlug.length);
      const initial = pick(INITIALS, i * 7 + first.length);
      const name = `${first} ${initial}.`;
      if (usedNames.has(name)) {
        i += 1;
        continue;
      }
      usedNames.add(name);
      const lang = pick(langs, i + citySlug.charCodeAt(0));
      const moment = pick(moments, i * 2 + 3);
      const photo = i % 7 === 0 || i % 7 === 4 ? pick(PHOTOS, i + first.length) : undefined;
      extra.push({
        id: `${citySlug}-g-${i}`,
        citySlug,
        name,
        place: trip.place,
        trip: trip.trip,
        rating: i % 11 === 0 ? 4 : 5,
        date: pick(MONTHS, i + 2),
        body: body(lang, trip, citySlug === "hubli" ? "Hubli" : citySlug[0].toUpperCase() + citySlug.slice(1), moment, i),
        photo,
        routeId: trip.routeId,
        service: trip.service,
      });
      i += 1;
    }
  }

  return extra;
}
