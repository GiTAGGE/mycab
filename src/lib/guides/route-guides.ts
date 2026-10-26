import type { GuideBlock, GuideStop, PageGuide } from "./types";

function guide(
  title: string,
  lead: string,
  types: GuideBlock[],
  stops: GuideStop[],
  stopsHeading = "Along this road",
): PageGuide {
  return { title, lead, types, stops, stopsHeading };
}

export const routeGuides: Record<string, PageGuide> = {
  "hbl-belgaum": guide(
    "How Hubli to Belgaum actually feels",
    "About 90 km north on the Pune–Bengaluru corridor. Business run: Kittur, sugarcane, then Camp trees.",
    [
      {
        name: "The road",
        body: "NH48, mostly flat, trucks, and a clock of about two hours door to door if you leave Hubli after the Gokul Road jam. This is not a ghat.",
      },
      {
        name: "Who books it",
        body: "Meetings in Camp or Autonagar, a wedding in Tilakwadi, a drop at IXG.",
      },
      {
        name: "Food that belongs here",
        body: "Jolada rotti and a dhaba thali on the highway. Belgaum kunda on the way into town. Save pedha for a Dharwad trip.",
      },
    ],
    [
      {
        title: "Out of Hubli without the lake",
        kind: "Start",
        body: "Vidyanagar to the bypass, then the north road. Keep Unkal for a local-hours loop.",
      },
      {
        title: "Kittur",
        kind: "Fort · history",
        body: "Rani Chennamma’s town sits on this road. People ask for ten minutes at the fort if the meeting is not at 11 sharp. Driver waits at the parking, not on the highway shoulder.",
      },
      {
        title: "Highway tea, not Gokul Road chai",
        kind: "Tea · dhaba",
        body: "A steel glass and a bun before Bailhongal. Trucks parked. This stall is for the Belgaum run. It is not the office-road cutting chai.",
      },
      {
        title: "Sugarcane and Sampgaon",
        kind: "Fields",
        body: "The land flattens into cane. Smell of jaggery in season. Windows down if the AC is a lot. Then the first Belgaum boards.",
      },
      {
        title: "Camp drop",
        kind: "Arrival",
        body: "Trees, slower traffic, the cantonment cool. Meetings live here more than at the bus stand. Say Camp or Tilakwadi on WhatsApp — not just “Belgaum”.",
      },
      {
        title: "Kunda tin for the return",
        kind: "Food",
        body: "If you are going back the same evening, buy kunda in town. The car will smell of it to Hubli. That is this road’s sweet, not Dharwad pedha.",
      },
    ],
  ),
  "hbl-dharwad": guide(
    "How Hubli to Dharwad actually feels",
    "Twenty kilometres and a different town. Twin-city fare. Pedha is the usual errand.",
    [
      {
        name: "The hop",
        body: "Flyover, then Dharwad lanes. Forty minutes if Gokul Road has not already eaten the start. Door to door, not highway-only time.",
      },
      {
        name: "Pins that matter",
        body: "University gate, Saptapur, Malamaddi, CBT. Say the pin. “Dharwad” alone still needs a second message.",
      },
    ],
    [
      {
        title: "Kelgeri lake",
        kind: "Pause",
        body: "Optional two minutes before the town. Water, trees, engine off. Then Malamaddi.",
      },
      {
        title: "University gate",
        kind: "Campus",
        body: "The car waits at the gate. Inner circle is how you lose the hour.",
      },
      {
        title: "Pedha counter",
        kind: "Food",
        body: "Line, box, string, seat. This is why people from Hubli actually come. It is not a Belgaum stop.",
      },
      {
        title: "Malamaddi",
        kind: "Lanes",
        body: "Mirrors in. Scooters. A twin-city driver does not need the horn.",
      },
    ],
  ),
  "hbl-goa": guide(
    "How Hubli to Goa actually feels",
    "Ghats, then salt. About four hours if the forest road is kind.",
    [
      {
        name: "The road",
        body: "Yellapur forest, Anmod ghat, then the Goa side. Phone signal thins. SUV if the bags are more than the people.",
      },
      {
        name: "Timing",
        body: "Leave Hubli early if you want lunch on the coast. Night ghats are slower on purpose.",
      },
    ],
    [
      {
        title: "Yellapur stretch",
        kind: "Forest · tea",
        body: "Trees close in. A tea stall appears before the last forest bit. Drivers who do this run already know it. This stall is not on the Belgaum highway.",
      },
      {
        title: "Anmod ghat",
        kind: "Curves",
        body: "Mist, horn in the bends, no overtaking after rain. Windows up if the cloud is in the cabin.",
      },
      {
        title: "First Goa juice",
        kind: "Coast · food",
        body: "People want a sugarcane or a coconut before the hotel road. The car waits in the shade. Sand stays outside if you ask.",
      },
      {
        title: "North Goa vs South",
        kind: "Drop",
        body: "Calangute is not Palolem. Say the hotel. The fare assumed a Goa drop, not a mystery pin.",
      },
    ],
  ),
  "hbl-bangalore": guide(
    "How Hubli to Bangalore actually feels",
    "The long North–South sit. About seven hours. Chilli fields, then Tumkur, then the flyovers. Not a Belgaum afternoon.",
    [
      {
        name: "The day",
        body: "Early start from Vidyanagar. Davangere breakfast if you want it. Tumkur is the last honest pause before the city.",
      },
      {
        name: "Arrival",
        body: "Hebbal, Yeshwanthpur or Electronic City are different endings. Say the pin. A “Bangalore” drop is not one number of minutes.",
      },
    ],
    [
      {
        title: "Chilli and Davangere",
        kind: "Food · highway",
        body: "Benne dose if you stop. This breakfast belongs on the Bengaluru run, not on the Belgaum dhaba.",
      },
      {
        title: "Chitradurga fort on the skyline",
        kind: "Rock",
        body: "You see it. Most people do not get down. If you do, it is a twenty-minute extra, not a tour.",
      },
      {
        title: "Tumkur tea",
        kind: "Last pause",
        body: "Then the city begins to argue. Fuel, washroom, steel glass. After this, Hebbal.",
      },
      {
        title: "Hebbal circuit",
        kind: "Arrival",
        body: "If your drop is north Bengaluru, this is the funnel. Whitefield is still an hour of honesty after that.",
      },
    ],
  ),
  "hbl-hampi": guide(
    "How Hubli to Hampi actually feels",
    "Stone, heat, a coconut. About three hours. Hospet is the town. The ruins are the point.",
    [
      {
        name: "The run",
        body: "East from Hubli, Koppal side, then Hospet. Same-day return is common. Stay if you want sunset on the river.",
      },
      {
        name: "Heat",
        body: "The boulders hold the sun. Water in the car. An Innova if there are elders and no patience for a sedan’s boot.",
      },
    ],
    [
      {
        title: "Koppal stretch",
        kind: "Highway",
        body: "Dry, bright, a tea stall that is not Yellapur forest. Different road, different glass.",
      },
      {
        title: "Hospet first",
        kind: "Town",
        body: "Hotel, station, or straight to the ruins. Say which. Hospet is not Hampi even if the signboard lies a little.",
      },
      {
        title: "Tender coconut by the stone",
        kind: "Heat · food",
        body: "Not decoration. It is the pause. The same car waits in whatever shade exists.",
      },
      {
        title: "Virupaksha and the bazaar",
        kind: "Ruins",
        body: "Driver does not circle the temple road. You walk back when darshan is done. No horn.",
      },
      {
        title: "Sunset at the river if you stayed",
        kind: "Evening",
        body: "Only if this is not a same-day return. The fare already allowed either. Tell us.",
      },
    ],
  ),
  "hbl-gokarna": guide(
    "How Hubli to Gokarna actually feels",
    "Ghat, then the smell of salt. About four hours. Beach drop, temple town, juice before the sand.",
    [
      {
        name: "The road",
        body: "Yellapur forest then the coast fork that is not Anmod-to-Goa. Narrower, slower, more cattle than trucks.",
      },
      {
        name: "The drop",
        body: "Om beach, Kudle, or the temple street are different last kilometres. Say which. The car waits in the shade, not on the sand.",
      },
    ],
    [
      {
        title: "Forest tea before the fork",
        kind: "Hills · tea",
        body: "Same forest family as Dandeli, different turn. The stall before the last climb is the pause.",
      },
      {
        title: "First salt in the air",
        kind: "Coast",
        body: "Windows down. Laterite. A juice before the beach road. Sand stays mostly outside if you ask.",
      },
      {
        title: "Temple street vs beach",
        kind: "Pin",
        body: "Mahabaleshwar temple is a town drop. Om beach is a further lane. One WhatsApp line saves twenty minutes of reversing.",
      },
      {
        title: "Gokarna, not North Goa",
        kind: "Coast",
        body: "Temple town and Kudle or Om beach. Calangute is a different booking — Hubli to Goa.",
      },
    ],
  ),
  "hbl-dandeli": guide(
    "How Hubli to Dandeli actually feels",
    "Seventy-five kilometres of trees. Resorts and rafting. Most groups come back the same evening. Not a Belgaum business run.",
    [
      {
        name: "The forest",
        body: "Yellapur road, then the river. Signal thins. SUV or Innova if the group has rafting bags.",
      },
      {
        name: "The day",
        body: "Leave Hubli after breakfast, raft, lunch at the resort, back before the forest is fully dark if you want that.",
      },
    ],
    [
      {
        title: "Yellapur tea",
        kind: "Forest · stall",
        body: "Last honest phone signal for some. Steel glass, then the trees close.",
      },
      {
        title: "Kali river",
        kind: "Water",
        body: "The car does not go on the raft. He waits at the resort gate with the dry bags.",
      },
      {
        title: "Resort pin, not “Dandeli”",
        kind: "Drop",
        body: "Kali, Old Magazine, or a homestay up a mud lane. Send the location. Forest pins are not one stand.",
      },
      {
        title: "Back before dark",
        kind: "Return",
        body: "Wildlife on the road is a reason, not a story. Same-day return is the usual booking.",
      },
    ],
  ),
  "hbl-murudeshwar": guide(
    "How Hubli to Murudeshwar actually feels",
    "Temple and sea in one run. About three and a half hours. The gopuram from the parking lot, then the water behind it.",
    [
      {
        name: "The road",
        body: "Malnad, then the coast. Sirsi side or the Yellapur fork depending on the day. Ask the driver — he already has a preference in rain.",
      },
      {
        name: "Darshan",
        body: "He waits. You walk. No circling, no horn. Same published fare if you also want a beach twenty minutes.",
      },
    ],
    [
      {
        title: "Malnad mist",
        kind: "Hills",
        body: "Wipers, spice on the air. This is not NH48 to Belgaum.",
      },
      {
        title: "Gopuram from the lot",
        kind: "Temple · sea",
        body: "The statue and the sea in one frame. Parking is the drop. The car stays.",
      },
      {
        title: "Fish thali after",
        kind: "Food",
        body: "If you want it, say so. The stall near the beach is this road’s plate, not ghee roast from Mangalore.",
      },
      {
        title: "Murudeshwara is the same pin",
        kind: "Name",
        body: "People search both spellings. Same temple, same fare.",
      },
    ],
  ),
  "hbl-hospet": guide(
    "How Hubli to Hospet actually feels",
    "The town drop for Hampi. Station, hotel, or a night before the ruins. Continue to the boulders only if you asked for Hampi.",
    [
      {
        name: "The town",
        body: "Hosapete is practical: rooms, railway, a meal that is not a coconut at the stone.",
      },
      {
        name: "Then Hampi",
        body: "If you want the ruins the same day, say so. It is a short extra, not a surprise.",
      },
    ],
    [
      {
        title: "Highway east",
        kind: "Dry",
        body: "Same corridor as Hampi, stop earlier. Tea is Koppal-side, not forest.",
      },
      {
        title: "Station or hotel",
        kind: "Pin",
        body: "Two different last kilometres. Send the name.",
      },
      {
        title: "Dinner in town",
        kind: "Food",
        body: "A thali before the ruins day. The car waits. Hampi itself is a poor place to hunt a meal at 2pm with elders.",
      },
    ],
  ),
  "hbl-karwar": guide(
    "How Hubli to Karwar actually feels",
    "Coastal run via Yellapur. Quieter than the Goa run, same family of ghats. Naval town, beach, fish.",
    [
      {
        name: "The road",
        body: "Forest, then the Karwar fork instead of Anmod. About four hours. Less party traffic than Goa.",
      },
      {
        name: "The drop",
        body: "Beach, INS, or a homestay. Send the pin — those last kilometres differ.",
      },
    ],
    [
      {
        title: "Forest then a different fork",
        kind: "Ghat",
        body: "Yellapur tea still happens. Then the Karwar fork, not Anmod into Goa.",
      },
      {
        title: "First look at the sea",
        kind: "Coast",
        body: "Kali estuary, then town. Windows down. Fish fry is the plate here.",
      },
      {
        title: "Rabindranath Tagore beach",
        kind: "Beach",
        body: "If that is the pin, say so. The car waits off the sand.",
      },
    ],
  ),
  "hbl-sirsi": guide(
    "How Hubli to Sirsi actually feels",
    "Malnad town. Temple, family, or a stop before Jog. Spice, rain, a different tea.",
    [
      {
        name: "The road",
        body: "About two and a half hours. Green as soon as you leave the plateau. Not NH48.",
      },
      {
        name: "Why people go",
        body: "Marikamba, a wedding, parents. Jog Falls is a different booking if you want the viewpoint.",
      },
    ],
    [
      {
        title: "Spice in the air",
        kind: "Malnad",
        body: "Pepper, rain, slower trucks. A stall with bun and chai that is not Kittur.",
      },
      {
        title: "Marikamba",
        kind: "Temple",
        body: "Town temple. He waits. You walk. Festival days need an earlier start.",
      },
      {
        title: "Town, not the falls",
        kind: "Pin",
        body: "Marikamba and family houses. Jog Falls is a separate day with a viewpoint wait.",
      },
    ],
  ),
  "hbl-badami": guide(
    "How Hubli to Badami actually feels",
    "Cave temples, red sandstone, a tank. Often a same-day return with Pattadakal if you ask.",
    [
      {
        name: "The run",
        body: "About two and a half hours east-north. Heat on the stone. Carry water.",
      },
      {
        name: "The loop",
        body: "Badami caves, then Pattadakal and Aihole if the day is honest. Same car. Say the loop on WhatsApp.",
      },
    ],
    [
      {
        title: "Agastya tank",
        kind: "Caves",
        body: "Climb, then the car at the parking. He does not follow you into the cave.",
      },
      {
        title: "Pattadakal if you asked",
        kind: "Stone",
        body: "A short hop. UNESCO boards, then shade. Only on this circuit — not on a Belgaum day.",
      },
      {
        title: "Coconut and a thali in town",
        kind: "Food",
        body: "Eat before the last cave. Afternoon stone is not a restaurant.",
      },
    ],
  ),
  "hbl-jog-falls": guide(
    "How Hubli to Jog Falls actually feels",
    "A day trip. The car is for the viewpoint, not a dump-and-leave. Mist, steps, a stall at the top.",
    [
      {
        name: "The day",
        body: "Sirsi side, then the falls. We price the wait at the viewpoint. Monsoon is the point and the slow.",
      },
      {
        name: "Not a town drop",
        body: "Sirsi is the town. This booking is the falls and the wait at the viewpoint.",
      },
    ],
    [
      {
        title: "Malnad all the way",
        kind: "Rain · hills",
        body: "Wipers, spice, monkeys at the stalls. Different from every highway north of Hubli.",
      },
      {
        title: "Viewpoint tea",
        kind: "Tea · roar",
        body: "Plastic cup, raincoat if it is the season. The driver waits at the parking, not on the steps.",
      },
      {
        title: "Same-day return",
        kind: "Clock",
        body: "That is how this fare is built. A night in a homestay is a different conversation on WhatsApp.",
      },
    ],
  ),
  "dwd-hubli": guide(
    "How Dharwad to Hubli actually feels",
    "The other direction of the twin city. Same fare logic. Pedha already bought, or Gokul Road still to sit through.",
    [
      {
        name: "The hop",
        body: "University or Saptapur, then the flyover. Forty minutes if the start pin is honest.",
      },
    ],
    [
      {
        title: "Leave the lanes first",
        kind: "Start",
        body: "Malamaddi does not behave like a highway. The clock starts in the lane.",
      },
      {
        title: "Gokul Road at the other end",
        kind: "Arrival",
        body: "If your drop is Vidyanagar after 6, say so. The twin city still has a jam.",
      },
      {
        title: "Pedha already in the boot",
        kind: "Food",
        body: "People buy it before leaving Dharwad. The Hubli side does not need a second box.",
      },
    ],
  ),
  "dwd-belgaum": guide(
    "How Dharwad to Belgaum actually feels",
    "Shorter than Hubli–Belgaum from the university side. Still Kittur. Still not a beach.",
    [
      {
        name: "The road",
        body: "You skip a chunk of Hubli. NH48, Kittur, Camp. About an hour fifty.",
      },
    ],
    [
      {
        title: "Out of the campus",
        kind: "Start",
        body: "University gate, then the highway. You skip Hubli town traffic.",
      },
      {
        title: "Kittur",
        kind: "Fort",
        body: "Same fort as the Hubli run, different start. Ten minutes if the meeting allows.",
      },
      {
        title: "Camp drop",
        kind: "Arrival",
        body: "Say Camp, Tilakwadi or IXG. Belgaum is not one gate.",
      },
    ],
  ),
  "dwd-goa": guide(
    "How Dharwad to Goa actually feels",
    "Direct from Dharwad. Forest, then the Anmod ghat, then salt.",
    [
      {
        name: "The road",
        body: "Forest from the Dharwad side, then Anmod. About four hours. SUV if bags are real.",
      },
    ],
    [
      {
        title: "Kalaghatagi Road first",
        kind: "Start",
        body: "Red earth, then trees. This start does not go via Unkal lake.",
      },
      {
        title: "Ghat tea",
        kind: "Hills",
        body: "A bend, a stall, a valley. Same family as Hubli–Goa, different first hour.",
      },
      {
        title: "Hotel pin in Goa",
        kind: "Drop",
        body: "North or south. Send the name. The fare assumed a Goa drop, not a mystery.",
      },
    ],
  ),
  "dwd-bangalore": guide(
    "How Dharwad to Bangalore actually feels",
    "Early start. You add the twin-city minutes before the long south sit.",
    [
      {
        name: "The day",
        body: "Leave before the campus wakes if you can. Then the same Davangere–Tumkur spine as Hubli–BLR.",
      },
    ],
    [
      {
        title: "University before dawn",
        kind: "Start",
        body: "The honest buffer. Fog is more common than from Vidyanagar.",
      },
      {
        title: "Davangere dose",
        kind: "Food",
        body: "If you stop, this is the breakfast. Not pedha, not kunda.",
      },
      {
        title: "Hebbal or Whitefield",
        kind: "Drop",
        body: "Say which. The last hour is the city, not the highway.",
      },
    ],
  ),
  "dwd-hampi": guide(
    "How Dharwad to Hampi actually feels",
    "Campus to ruins. A little longer than from Hubli. Same stone, same coconut, different first hour.",
    [
      {
        name: "The run",
        body: "Through Hubli or around it depending on the driver. Then Koppal and Hospet. Same-day return is still common.",
      },
    ],
    [
      {
        title: "Leave the university",
        kind: "Start",
        body: "Gate, not inner circle. Then the east road.",
      },
      {
        title: "Coconut at the boulders",
        kind: "Heat",
        body: "The pause. The car waits in shade that is never enough.",
      },
      {
        title: "Back at night if you want",
        kind: "Return",
        body: "Same published fare family. Tell us if elders prefer a Hospet night.",
      },
    ],
  ),
  "bgm-goa": guide(
    "How Belgaum to Goa actually feels",
    "The most booked Belagavi outstation. Ghats, then coast. About three and a half hours. Mist in the trees.",
    [
      {
        name: "The ghat",
        body: "From Camp you are on curves sooner than from Hubli. Rain changes the clock. SUV if bags and monsoon both showed up.",
      },
      {
        name: "The coast",
        body: "Panaji, Calangute, or a quieter south pin. Say the hotel. Karwar is a different drop.",
      },
    ],
    [
      {
        title: "Tea on the Goa ghat",
        kind: "Hills · tea",
        body: "A bend, a stall, a valley. The driver does not rush the curves after that cup. This stall is not Kittur.",
      },
      {
        title: "Mist in the trees",
        kind: "Rain",
        body: "Lights on, no overtaking. This is why people ask for an SUV from Belgaum to Goa.",
      },
      {
        title: "First Goa juice",
        kind: "Coast",
        body: "Sugarcane or coconut. Shade. Then the hotel road.",
      },
      {
        title: "Kunda already in the boot",
        kind: "From town",
        body: "Buy it in Belgaum before you climb. Goa does not sell this tin.",
      },
    ],
  ),
  "bgm-hubli": guide(
    "How Belgaum to Hubli actually feels",
    "North Karnataka connector the other way. NH48, Kittur, then Gokul Road. Not a ghat.",
    [
      {
        name: "The road",
        body: "Flat, trucks, two hours. Station or Vidyanagar are different last kilometres.",
      },
    ],
    [
      {
        title: "Out of Camp",
        kind: "Start",
        body: "Trees, then the highway. You are not going to Goa today.",
      },
      {
        title: "Kittur the other direction",
        kind: "Fort",
        body: "Same fort. Ten minutes if the Hubli meeting is not at noon.",
      },
      {
        title: "Gokul Road arrival",
        kind: "Jam",
        body: "After 6 this is the Hubli tax. Say Vidyanagar or Unkal so he does not guess.",
      },
    ],
  ),
  "bgm-kolhapur": guide(
    "How Belgaum to Kolhapur actually feels",
    "Maharashtra border. Temple, business, jaggery, spicy thali — not a beach run.",
    [
      {
        name: "The road",
        body: "North from Belagavi, about two and a half hours. Border check is a pause, not a problem.",
      },
      {
        name: "The town",
        body: "Mahalaxmi, a paduka, a thali that is not kunda. Say temple or hotel.",
      },
    ],
    [
      {
        title: "Border tea",
        kind: "Tea",
        body: "A stall that is neither Camp nor NH48 south. Different sugar, different language on the radio.",
      },
      {
        title: "Mahalaxmi",
        kind: "Temple",
        body: "He waits at the parking. You walk. Festival days need an earlier start from Belgaum.",
      },
      {
        title: "Kolhapuri thali",
        kind: "Food",
        body: "This plate belongs here. Do not look for ghee roast or pedha.",
      },
    ],
  ),
  "bgm-pune": guide(
    "How Belgaum to Pune actually feels",
    "A full-day intercity drive. Satara, then the ghats into Pune. We do not pretend it is a Bangalore route.",
    [
      {
        name: "The day",
        body: "Leave Camp early. Kolhapur is a possible tea. Then the long Maharashtra sit. About six and a half hours.",
      },
      {
        name: "The drop",
        body: "Hinjewadi, camp, or station are different Pune endings. Send the pin.",
      },
    ],
    [
      {
        title: "Satara pause",
        kind: "Highway",
        body: "Washroom, tea, a vada. This is not Tumkur and not Kittur.",
      },
      {
        title: "Khandala weather if you catch it",
        kind: "Ghat",
        body: "Mist possible. Lights. No hero overtaking. SUV if the group is 5+ with bags.",
      },
      {
        title: "Pune last hour",
        kind: "City",
        body: "The highway was honest. The city will argue. Say Hinjewadi vs Koregaon Park out loud.",
      },
    ],
  ),
  "bgm-bangalore": guide(
    "How Belgaum to Bangalore actually feels",
    "Long overnight or early start. You sit Hubli’s highway and then Hubli’s south run, without making Hubli the story.",
    [
      {
        name: "The sit",
        body: "About nine hours. Chilli fields after the twin cities, then Tumkur, then flyovers.",
      },
    ],
    [
      {
        title: "Leave Camp in the dark",
        kind: "Start",
        body: "The honest version. Night driving on NH48 is a choice people make for a morning meeting in Bengaluru.",
      },
      {
        title: "Davangere breakfast",
        kind: "Food",
        body: "Benne dose if you stopped. Belgaum kunda is already in the boot from last night.",
      },
      {
        title: "Hebbal funnel",
        kind: "Arrival",
        body: "Then the actual pin. Whitefield is still not Hebbal.",
      },
    ],
  ),
  "bgm-gokarna": guide(
    "How Belgaum to Gokarna actually feels",
    "Beach weekend from Belagavi without changing cars at Hubli. Ghats and coast, not NH48.",
    [
      {
        name: "The road",
        body: "South-west, forest, then the temple town. About three and a half hours. Different fork from Goa.",
      },
    ],
    [
      {
        title: "Temple town, not Calangute",
        kind: "Fork",
        body: "Mahabaleshwar temple and Kudle or Om beach. Goa is a different ghat from Belagavi.",
      },
      {
        title: "Juice before sand",
        kind: "Coast",
        body: "Same habit as other coast drops. Shade for the car.",
      },
      {
        title: "Temple street pin",
        kind: "Drop",
        body: "Mahabaleshwar temple vs Om beach. One line on WhatsApp.",
      },
    ],
  ),
  "blr-mysore": guide(
    "How Bangalore to Mysore actually feels",
    "The most booked Bengaluru outstation. Palace, weekend, family drop. Maddur, filter coffee, then the chamundi skyline.",
    [
      {
        name: "The road",
        body: "Mysore Road, then the expressway stretches. About three hours 15 minutes door to door if the city lets you leave. Morning is kinder than Friday evening.",
      },
      {
        name: "Who sits this",
        body: "Palace, a wedding in Nazarbad, a drop at the zoo for parents, a return the same night. Same published fare family.",
      },
    ],
    [
      {
        title: "Filter coffee before the long road",
        kind: "Coffee",
        body: "Steel tumbler at a darshini on the way out. The first hour is still city. Then it opens. This is not Gokul Road chai.",
      },
      {
        title: "Maddur vada",
        kind: "Food · highway",
        body: "The pause this road is famous for. Grease on a paper, then back on the expressway. Drivers who do Mysore already know which stall is worth the five minutes.",
      },
      {
        title: "Mandya cane",
        kind: "Fields",
        body: "Green, flat, the smell of jaggery in season. Windows down. Then the palace town boards.",
      },
      {
        title: "Chamundi on the skyline",
        kind: "Arrival",
        body: "Chamundi hill is an extra loop if you ask. Most drops are palace-side, railway, or a house in Vijayanagar.",
      },
      {
        title: "Palace parking wait",
        kind: "Town",
        body: "He does not circle with the horn. You walk. Same-day return is normal. Night road back is slower after 8.",
      },
    ],
  ),
  "blr-coorg": guide(
    "How Bangalore to Coorg actually feels",
    "Hill roads, extra luggage, often an SUV. Coffee, mist, a hairpin. Not Mysore palace copy.",
    [
      {
        name: "The ghat",
        body: "About five hours. Hassan, then the climb. Rain changes everything. SUV if more than three people and bags.",
      },
      {
        name: "The drop",
        body: "Madikeri, a plantation stay, or Kushalnagar. Those are different last hours. Send the estate pin.",
      },
    ],
    [
      {
        title: "Hassan stretch",
        kind: "Highway",
        body: "Last flat tea. After this the road starts to mean it.",
      },
      {
        title: "Coffee country",
        kind: "Hills · smell",
        body: "Blossom in season, mist otherwise. A stall with bun and chai that is not Maddur.",
      },
      {
        title: "Hairpins after rain",
        kind: "Ghat",
        body: "No overtaking. The fare assumed a careful driver, not a timed rally.",
      },
      {
        title: "Estate road last",
        kind: "Mud · pin",
        body: "The public road ends. The stay’s location is the rest. Share WhatsApp live location before the last twenty minutes.",
      },
    ],
  ),
  "blr-chennai": guide(
    "How Bangalore to Chennai actually feels",
    "A full-day intercity drive. Krishnagiri, then the Tamil Nadu sit. Filter coffee at the start, filter coffee of a different kind at Vellore.",
    [
      {
        name: "The day",
        body: "About six hours. Electronic City or Hosur first if that is your pin. Then NH48 east. Not a Mysore afternoon.",
      },
    ],
    [
      {
        title: "Hosur / Krishnagiri",
        kind: "Border",
        body: "Toll, then a different radio. Biryani stalls start to argue with the darshini behind you.",
      },
      {
        title: "Vellore pause",
        kind: "Food · temple town",
        body: "A possible lunch. Fort in the distance. Most people do not get down unless the bladder insists.",
      },
      {
        title: "Sriperumbudur then the city",
        kind: "Arrival",
        body: "Chennai last hour is the honest slow. T Nagar is not the airport and not ECR. Send the pin.",
      },
    ],
  ),
  "blr-ooty": guide(
    "How Bangalore to Ooty actually feels",
    "Ghat roads, eucalyptus, a toy-train town. We recommend an SUV if you are more than three people. Not Coorg, not Mysore.",
    [
      {
        name: "The climb",
        body: "About seven hours. Mysore road first, then the Nilgiri ghats. Hairpins, monkeys, a stall with tea that tastes of the hill.",
      },
    ],
    [
      {
        title: "Mysore road, then a different fork",
        kind: "Start",
        body: "You may share the first hour with palace traffic. After that this is Ooty’s climb, not Chamundi.",
      },
      {
        title: "Ghat tea",
        kind: "Hills",
        body: "Eucalyptus, cold fingers, plastic cup. Jackets in the boot even in April.",
      },
      {
        title: "Lovedale / town drop",
        kind: "Pin",
        body: "School, hotel, or Botanical Garden are different last kilometres. The car will not love a steep unmarked lane in rain. Send the pin.",
      },
    ],
  ),
  "blr-pondicherry": guide(
    "How Bangalore to Pondicherry actually feels",
    "Weekend drop. Promenade, filter coffee of a French-Tamil kind, then the sea wall. Same published fare to stay or return.",
    [
      {
        name: "The sit",
        body: "About six hours. Krishnagiri, then south-east. Not Chennai’s last-hour traffic unless you chose that pin by mistake.",
      },
    ],
    [
      {
        title: "Highway dosa",
        kind: "Food",
        body: "A Tamil stall, not Maddur vada. Different grease, different chutney.",
      },
      {
        title: "Auroville vs White Town",
        kind: "Pin",
        body: "Two different endings. Say which. The fare assumed Pondicherry, not a mystery.",
      },
      {
        title: "Promenade evening",
        kind: "Sea",
        body: "The car does not belong on the promenade. He waits a street behind. You walk.",
      },
    ],
  ),
  "blr-wayanad": guide(
    "How Bangalore to Wayanad actually feels",
    "Resort transfers and family weekends. Kerala hills, not Coorg’s coffee estates, not Ooty’s toy train.",
    [
      {
        name: "The road",
        body: "About six hours. Mysore side, then the Kerala ghat. Fog. SUV if the stay is up a plantation road.",
      },
    ],
    [
      {
        title: "After Mysore, a different climb",
        kind: "Ghat",
        body: "Bandipur / the ghat. Wildlife on the road is a reason to be slow, not a story to chase.",
      },
      {
        title: "Kalpetta or the estate",
        kind: "Pin",
        body: "Town vs a stay 12 km up. Share the location before the last climb.",
      },
      {
        title: "Sulaimani or tea",
        kind: "Food",
        body: "Kerala glass. Not filter coffee, not Maddur.",
      },
    ],
  ),
  "blr-tirupati": guide(
    "How Bangalore to Tirupati actually feels",
    "Temple trips are often early-morning pickups. Laddu, hair, a queue. We book the return when you want it.",
    [
      {
        name: "The dawn",
        body: "Leave Bengaluru in the dark. About five and a half hours. Darshan time is the constraint, not the highway.",
      },
    ],
    [
      {
        title: "Night start",
        kind: "Clock",
        body: "The honest version for a morning ticket. Hebbal is empty. That is the point.",
      },
      {
        title: "Alipiri or Vaikuntam",
        kind: "Queue",
        body: "Say which gate. The car waits at the authorised parking, not in the queue.",
      },
      {
        title: "Laddu in the boot",
        kind: "Food · prasad",
        body: "The box goes on the seat. This is this road’s sweet. Not kunda, not pedha.",
      },
    ],
  ),
  "blr-hyderabad": guide(
    "How Bangalore to Hyderabad actually feels",
    "A long intercity run. Better than two air tickets when you are a family of four. Biryani at the other end, not on the first hour.",
    [
      {
        name: "The sit",
        body: "About nine hours. Kurnool is the spine. Night start or dawn. SUV or Innova for 5+ with luggage.",
      },
    ],
    [
      {
        title: "Kurnool pause",
        kind: "Highway",
        body: "The honest lunch. Then the last long piece.",
      },
      {
        title: "Shamshabad vs Banjara",
        kind: "Drop",
        body: "Airport-side and old city are different Hyderabads. Send the pin.",
      },
      {
        title: "Biryani is the arrival",
        kind: "Food",
        body: "Eat it there. The highway stalls are not the point of this trip.",
      },
    ],
  ),
  "blr-goa": guide(
    "How Bangalore to Goa actually feels",
    "Overnight or early start. A different Goa than from Belgaum or Hubli — you sit more highway before the ghat.",
    [
      {
        name: "The day",
        body: "About ten hours. Hubli-side spine or the other fork depending on the driver and the rain. SUV if luggage outranks people.",
      },
    ],
    [
      {
        title: "The long first half",
        kind: "Highway",
        body: "A long highway sit before the ghat. Leave overnight or at dawn.",
      },
      {
        title: "Ghat then salt",
        kind: "Coast",
        body: "Anmod or the chosen fork. Juice, shade, hotel pin. North Goa is not Palolem.",
      },
    ],
  ),
  "blr-coimbatore": guide(
    "How Bangalore to Coimbatore actually feels",
    "Business drop or family travel. Hosur, then Tamil Nadu textile towns. Not a hill station.",
    [
      {
        name: "The sit",
        body: "About seven hours. Electronic City start is common. Then NH.",
      },
    ],
    [
      {
        title: "Hosur first",
        kind: "Border",
        body: "If you live south Bengaluru, this is a short city and then a long state.",
      },
      {
        title: "Highway meals",
        kind: "Food",
        body: "Tamil thali, not Maddur, not ghee roast.",
      },
      {
        title: "Peelamedu or RS Puram",
        kind: "Drop",
        body: "Two Coimbatores. Send the office name.",
      },
    ],
  ),
  "blr-kochi": guide(
    "How Bangalore to Kochi actually feels",
    "Long coastal / ghat mix. We quote before you confirm — no surprise night charges. Backwaters at the end if that is the pin.",
    [
      {
        name: "The day",
        body: "About ten hours. Wayanad-side or Palakkad-side depending on the driver. Rain is a character.",
      },
    ],
    [
      {
        title: "Kerala ghat",
        kind: "Hills",
        body: "Fog, horns in the bends, a sulaimani. Not Coorg’s coffee stall.",
      },
      {
        title: "Edappally vs Fort Kochi",
        kind: "Pin",
        body: "Mainland and the island are different last hours. The ferry is not the car’s problem if you said Fort Kochi in time.",
      },
      {
        title: "Karimeen if you arrived",
        kind: "Food",
        body: "Eat it there. The highway does not owe you a backwater plate.",
      },
    ],
  ),
  "blr-nandi-hills": guide(
    "How Bangalore to Nandi Hills actually feels",
    "Sunrise trip. Almost always a same-day return — we price it that way. Jacket, tea, city below the cloud.",
    [
      {
        name: "The dawn",
        body: "Leave at an hour that feels wrong. About ninety minutes. Hebbal, then the climb. The point is the top at first light.",
      },
    ],
    [
      {
        title: "Plastic-cup tea at the top",
        kind: "Hills · tea",
        body: "Jacket on, city below the cloud. This is the short outstation that still feels like a trip.",
      },
      {
        title: "The car waits at the parking",
        kind: "Wait",
        body: "You walk to the viewpoint. He does not idle in the photo line.",
      },
      {
        title: "Back before the office",
        kind: "Return",
        body: "That is the usual booking. Breakfast in town, not a Coorg day.",
      },
    ],
  ),
  "mlr-udupi": guide(
    "How Mangalore to Udupi actually feels",
    "The coastal hop. Temple, weekend, family. About ninety minutes. Laterite, sea when the road allows it.",
    [
      {
        name: "The road",
        body: "NH66 north. Surathkal, then Udupi. Windows down when the road shows the sea.",
      },
    ],
    [
      {
        title: "Surathkal stretch",
        kind: "Coast",
        body: "Campus, sea glimpses, trucks. A coconut if you stop. Not Kadri temple — you already left town.",
      },
      {
        title: "Krishna temple",
        kind: "Temple",
        body: "The drop most people mean. He waits. You walk. Kanakana kindi is a walk, not a car pin.",
      },
      {
        title: "Udupi meal",
        kind: "Food",
        body: "Udupi meal after darshan. Ghee roast is easier in Mangaluru before you start.",
      },
      {
        title: "Malpe if you asked",
        kind: "Beach",
        body: "A further pin. St Mary’s island is a boat, not a sedan. Say Malpe only if you mean it.",
      },
    ],
  ),
  "mlr-manipal": guide(
    "How Mangalore to Manipal actually feels",
    "Campus and hospital run. Early morning pickups are normal here. Endicott, KMC, a hostel gate.",
    [
      {
        name: "The hop",
        body: "Same coast road as Udupi, different last kilometres up the hill. About 95 minutes.",
      },
    ],
    [
      {
        title: "Coast then the climb",
        kind: "Campus",
        body: "Udupi town is not the drop unless you said so. Manipal is up.",
      },
      {
        title: "KMC or the hostel",
        kind: "Pin",
        body: "Hospital vs campus housing. Parents already know this distinction. Send the block name.",
      },
      {
        title: "Student breakfast",
        kind: "Food",
        body: "A canteen or an Udupi meal on the way. Not a temple thali unless you stopped in town.",
      },
    ],
  ),
  "mlr-bangalore": guide(
    "How Mangalore to Bangalore actually feels",
    "Ghat-and-highway mix. Charmadi or the chosen ghat, then the plateau, then flyovers. Published fare, fuel and driver included.",
    [
      {
        name: "The day",
        body: "About seven hours. Rain on the ghat is the character. Early start from Kadri or Pumpwell.",
      },
    ],
    [
      {
        title: "Charmadi / the ghat you get",
        kind: "Hills",
        body: "Mist, horn, slow trucks. This is not NH66 to Udupi.",
      },
      {
        title: "Hassan pause",
        kind: "Plateau",
        body: "Tea after the climb. Then the Bengaluru highway personality takes over.",
      },
      {
        title: "Electronic City or Hebbal",
        kind: "Drop",
        body: "South pin vs north pin. From this road Electronic City is often the kinder ending. Say it.",
      },
    ],
  ),
  "mlr-coorg": guide(
    "How Mangalore to Coorg actually feels",
    "Coast to hills. Shorter than from Bengaluru. SUV if you are more than three people. Coffee after salt.",
    [
      {
        name: "The road",
        body: "About three and a half hours. You leave drizzle and laterite, then climb into coffee.",
      },
    ],
    [
      {
        title: "Leave the coast",
        kind: "Start",
        body: "Ghee roast belongs in town before you climb, not on the ghat.",
      },
      {
        title: "Coffee blossom",
        kind: "Hills",
        body: "A different smell than Kadri incense. Estate pin at the end.",
      },
      {
        title: "Madikeri vs a stay",
        kind: "Drop",
        body: "Town vs a plantation road. Share location.",
      },
    ],
  ),
  "mlr-goa": guide(
    "How Mangalore to Goa actually feels",
    "Coastal highway run. Overnight start if you want dawn in Goa. Udupi, Kundapur, then the long NH66.",
    [
      {
        name: "The sit",
        body: "About seven hours. You pass Udupi; the booking is Goa.",
      },
    ],
    [
      {
        title: "NH66 north for real",
        kind: "Coast highway",
        body: "Towns you could have stopped in — and did not, because Goa is the booking.",
      },
      {
        title: "Karwar glance",
        kind: "Town",
        body: "You may see it. The drop is Goa unless you asked for Karwar.",
      },
      {
        title: "Goa hotel pin",
        kind: "Arrival",
        body: "South Goa is kinder from this direction than Calangute. Still say the name.",
      },
    ],
  ),
  "mlr-kasargod": guide(
    "How Mangalore to Kasargod actually feels",
    "Kerala border drop. Short, frequent, published. Bekal if you asked. Not Udupi north — this is south.",
    [
      {
        name: "The hop",
        body: "About eighty minutes south. Language on the radio changes. Border is the pause.",
      },
    ],
    [
      {
        title: "South, not Udupi",
        kind: "Direction",
        body: "South of Mangaluru, into Kerala. Udupi sits the other way on NH66.",
      },
      {
        title: "Bekal fort if you said so",
        kind: "Fort · sea",
        body: "A possible extra. The car waits. The fare assumed Kasargod; Bekal is a pin you name.",
      },
      {
        title: "Kerala tea",
        kind: "Food",
        body: "Sulaimani, not filter coffee, not ghee roast.",
      },
    ],
  ),
  "mlr-kundapur": guide(
    "How Mangalore to Kundapur actually feels",
    "North coastal run past Udupi. River, town, a further pin than the temple hop.",
    [
      {
        name: "The road",
        body: "About two hours twenty. You pass Udupi. This is not the Manipal climb.",
      },
    ],
    [
      {
        title: "Past the temple town",
        kind: "Coast",
        body: "You pass the temple town. Kundapur is further, quieter, river-side.",
      },
      {
        title: "Kundapur town pin",
        kind: "Drop",
        body: "House, hotel, or a turn towards the agumbe side. Send the location.",
      },
      {
        title: "Coastal meal",
        kind: "Food",
        body: "Fish if you want it. Udupi pride stays in Udupi. This town has its own plate.",
      },
    ],
  ),
};
