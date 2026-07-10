export type ActivityCategory = "Culture" | "Nature" | "Food" | "Sightseeing";

export type TripActivity = {
  id: string;
  title: string;
  category: ActivityCategory;
  description: string;
  imageUrl?: string;
  estCostNzd: number;
  duration: string;
  link?: string;
};

export type TripDay = {
  date: string;
  title: string;
  activityIds: string[];
  notes?: string;
};

export type PackingItem = {
  id: string;
  label: string;
};

export const tripMeta = {
  destination: "Wellington, New Zealand",
  startDate: "2026-08-26",
  endDate: "2026-09-02",
  season:
    "Late winter / early spring — expect 8-14°C, changeable weather, and Wellington's famous wind.",
};

export const activities: TripActivity[] = [
  {
    id: "te-papa",
    title: "Te Papa Tongarewa",
    category: "Culture",
    description:
      "New Zealand's national museum on the waterfront — six floors covering Māori taonga, natural history (including a colossal squid), and the acclaimed Gallipoli exhibition with Wētā Workshop's giant sculptures. Free entry, allow at least half a day.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/5/56/Museum_of_New_Zealand_Te_Papa_Tongarewa_unsaturated.jpg",
    estCostNzd: 0,
    duration: "3-5 hrs",
    link: "https://www.tepapa.govt.nz/",
  },
  {
    id: "zealandia",
    title: "Zealandia Ecosanctuary",
    category: "Nature",
    description:
      "The world's first fully-fenced urban ecosanctuary — 225 hectares of protected valley 10 minutes from the CBD. Spot tūī, kākā, takahē and tuatara in the wild. The twilight tour is the best chance to see kiwi.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/b/b9/Karori_Wildlife_Sanctuary_location.jpg",
    estCostNzd: 26,
    duration: "2-4 hrs",
    link: "https://www.visitzealandia.com/",
  },
  {
    id: "cable-car",
    title: "Wellington Cable Car & Lookout",
    category: "Sightseeing",
    description:
      "The iconic red funicular from Lambton Quay up to Kelburn. At the top: the best postcard view of the city and harbour, the Cable Car Museum (free), and the entrance to the Botanic Garden — ride up, wander down.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/1/10/Wellington_Cable_Car_%2820240206a%29_%2853532605708%29.jpg",
    estCostNzd: 6,
    duration: "1-2 hrs",
    link: "https://www.wellingtoncablecar.co.nz/",
  },
  {
    id: "botanic-garden",
    title: "Wellington Botanic Garden",
    category: "Nature",
    description:
      "25 hectares of native forest, exotic trees and seasonal gardens on the hillside between Kelburn and Thorndon. Late winter means early magnolias and camellias. Downhill walk connects the Cable Car top station back to the city.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/7/79/Wellington_Botanical_Garden_10.jpg",
    estCostNzd: 0,
    duration: "1-2 hrs",
  },
  {
    id: "cuba-street",
    title: "Cuba Street",
    category: "Food",
    description:
      "Wellington's bohemian heart — the Bucket Fountain, vintage shops, record stores, street art and the city's densest run of cafés and restaurants. Fidel's for coffee, Loretta for brunch, night dumplings at 1154 Pastaria or Mr Go's nearby.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/a/a2/Bucket_Fountain%2C_2020.png",
    estCostNzd: 40,
    duration: "2-3 hrs",
  },
  {
    id: "weta-workshop",
    title: "Wētā Workshop Tour",
    category: "Culture",
    description:
      "Behind the scenes at the five-time Academy Award-winning effects studio in Miramar — props, prosthetics and miniatures from Lord of the Rings, Avatar and more. Book the workshop tour ahead; combos include the Thunderbirds-style miniatures stage.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/b/b6/Weta_Workshop_Buildings.jpg",
    estCostNzd: 55,
    duration: "1.5-2 hrs",
    link: "https://tours.wetaworkshop.com/",
  },
  {
    id: "mount-victoria",
    title: "Mount Victoria Lookout",
    category: "Sightseeing",
    description:
      "196m hill immediately east of the CBD with a 360° panorama over the city, harbour and airport approach. Walk up through the town belt from Oriental Bay (~40 min) or drive/bus to the top. Best at golden hour — bring a windproof layer.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/8/81/Oriental_Bay_from_Wellington_Harbour_Ferry.jpg",
    estCostNzd: 0,
    duration: "1-2 hrs",
  },
  {
    id: "oriental-bay",
    title: "Oriental Bay & Waterfront Walk",
    category: "Sightseeing",
    description:
      "Wellington's golden-sand city beach and promenade. The waterfront walk from Queens Wharf past Te Papa to the bay is the classic first-evening orientation loop — sculpture, wharf jumping platforms (summer), and harbour views the whole way.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/a/ae/Quartier_Oriental_Bay.jpg",
    estCostNzd: 0,
    duration: "1-2 hrs",
  },
  {
    id: "matiu-somes",
    title: "Matiu / Somes Island",
    category: "Nature",
    description:
      "Predator-free island reserve in the middle of the harbour, reached by the East by West ferry. Former quarantine station, now home to kākāriki, tuatara and little blue penguins. Check winter ferry timetable — a good calm-day pick.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/1/12/MatiuSomes_Island.JPG",
    estCostNzd: 30,
    duration: "3-4 hrs",
    link: "https://www.eastbywest.co.nz/",
  },
  {
    id: "makara-beach",
    title: "Mākara Beach Walkway",
    category: "Nature",
    description:
      "Wild, rugged south-west coast 30 minutes from the city. The loop walkway climbs to WWII gun emplacements with views to the South Island on a clear day, then returns along a remote boulder beach. Weather-dependent — save for the best-looking day.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/8/8d/Makara_beach%2C_New_Zealand.jpg",
    estCostNzd: 0,
    duration: "3-4 hrs",
  },
];

export const itinerary: TripDay[] = [
  {
    date: "2026-08-26",
    title: "Arrive & get oriented",
    activityIds: ["oriental-bay"],
    notes: "Easy first evening — waterfront walk and dinner near the harbour.",
  },
  {
    date: "2026-08-27",
    title: "National museum day",
    activityIds: ["te-papa", "cuba-street"],
    notes: "Te Papa until mid-afternoon, then Cuba Street for the evening.",
  },
  {
    date: "2026-08-28",
    title: "Cable car, gardens & views",
    activityIds: ["cable-car", "botanic-garden"],
    notes: "Ride up, museum at the top, wander down through the gardens.",
  },
  {
    date: "2026-08-29",
    title: "Wildlife day",
    activityIds: ["zealandia"],
    notes: "Consider the twilight tour for kiwi spotting.",
  },
  {
    date: "2026-08-30",
    title: "Movie magic & lookout",
    activityIds: ["weta-workshop", "mount-victoria"],
    notes: "Miramar in the morning, Mt Vic for golden hour.",
  },
  {
    date: "2026-08-31",
    title: "Harbour island",
    activityIds: ["matiu-somes"],
    notes: "Ferry from Queens Wharf — swap with Sep 1 if the weather's rough.",
  },
  {
    date: "2026-09-01",
    title: "Wild coast (weather day)",
    activityIds: ["makara-beach"],
    notes: "Flexible day — Mākara if clear, otherwise galleries and cafés.",
  },
  {
    date: "2026-09-02",
    title: "Depart",
    activityIds: [],
    notes: "Last coffee on Cuba Street before heading out.",
  },
];

export const packingList: PackingItem[] = [
  { id: "windproof", label: "Windproof rain jacket (non-negotiable in Wellington)" },
  { id: "layers", label: "Warm layers — merino base, jumper, beanie" },
  { id: "shoes", label: "Comfortable walking shoes (waterproof ideal)" },
  { id: "daypack", label: "Small daypack for day trips" },
  { id: "binoculars", label: "Binoculars for Zealandia / Matiu Somes" },
  { id: "powerbank", label: "Power bank + NZ uses the same plugs as AU" },
  { id: "cash", label: "NZD card set up (Wise/Revolut) — mostly cashless" },
  { id: "bookings", label: "Book Wētā tour + Zealandia twilight in advance" },
];

export function getActivity(id: string) {
  return activities.find((a) => a.id === id);
}

export function tripBudgetNzd() {
  return activities.reduce((sum, a) => sum + a.estCostNzd, 0);
}
