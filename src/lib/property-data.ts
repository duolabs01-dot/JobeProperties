export type GalleryItem = {
  src: string;
  alt: string;
};

export type GalleryGroup = {
  id: string;
  label: string;
  items: GalleryItem[];
};

export type ApartmentPhase = {
  badge: string;
  name: string;
  address: string;
  image: string;
  mapsUrl: string;
  whatsappUrl: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type UnitType = {
  id: "standard" | "balcony" | "sliding-door";
  name: string;
  tagline: string;
  description: string;
  features: string[];
  image: string;
};

const createMapsLink = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

export const whatsappNumber = "072 229 3229";
export const whatsappUrl = "https://wa.me/27722293229";
export const foundationUrl = "https://drsitholefoundation.org/";

export const apartmentHeroImage =
  "https://jobepropco.co.za/wp-content/uploads/2025/05/Home-Page--1024x768.jpg";

export const apartmentGalleryGroups: GalleryGroup[] = [
  {
    id: "open-plan-living",
    label: "Open plan living",
    items: [
      {
        src: "https://jobepropco.co.za/wp-content/uploads/2025/05/Open-Space-1-scaled-e1748731339120.jpg",
        alt: "Open-plan studio layout at Jobe Propco",
      },
      {
        src: "https://jobepropco.co.za/wp-content/uploads/2025/05/Open-Space-2-1-scaled-e1748731289337.jpg",
        alt: "Studio interior with open-plan living space",
      },
      {
        src: "https://jobepropco.co.za/wp-content/uploads/2025/05/Open-Space-2-scaled-e1748768160576.jpg",
        alt: "Bright studio living area at Jobe Propco",
      },
    ],
  },
  {
    id: "storage-finishes",
    label: "Storage & finishes",
    items: [
      {
        src: "https://jobepropco.co.za/wp-content/uploads/2025/05/Cupboard-1-scaled-e1748731381811.jpg",
        alt: "Built-in cupboard storage in a Jobe studio",
      },
      {
        src: "https://jobepropco.co.za/wp-content/uploads/2025/05/Cupboard-2-scaled-e1748731421790.jpg",
        alt: "Studio storage and interior finishes at Jobe",
      },
      {
        src: "https://jobepropco.co.za/wp-content/uploads/2025/05/Cupboard-3-scaled-e1748731465791.jpg",
        alt: "Studio cupboards and finishes at Jobe Propco",
      },
    ],
  },
  {
    id: "bathroom",
    label: "Bathroom",
    items: [
      {
        src: "https://jobepropco.co.za/wp-content/uploads/2025/05/bathroom-3-scaled-e1748769189640.jpg",
        alt: "Private studio bathroom at Jobe Propco",
      },
      {
        src: "https://jobepropco.co.za/wp-content/uploads/2025/05/bathroom-2-scaled-e1748769101963.jpg",
        alt: "Private bathroom interior in a Jobe studio",
      },
      {
        src: "https://jobepropco.co.za/wp-content/uploads/2025/06/QJ2A7333-scaled-e1748769234113.jpg",
        alt: "Bathroom finishes at Jobe Towers",
      },
      {
        src: "https://jobepropco.co.za/wp-content/uploads/2025/06/QJ2A7331-scaled-e1748769407398-1024x642.jpg",
        alt: "Shower and bathroom details at Jobe Propco",
      },
    ],
  },
  {
    id: "balcony-exterior",
    label: "Balcony & exterior",
    items: [
      {
        src: "https://jobepropco.co.za/wp-content/uploads/2025/06/QJ2A7347-scaled-e1748771472367.jpg",
        alt: "Balcony exterior at Jobe Propco",
      },
      {
        src: "https://jobepropco.co.za/wp-content/uploads/2025/06/QJ2A7348-scaled-e1748771512324.jpg",
        alt: "Jobe Propco exterior walkway and balcony",
      },
      {
        src: "https://jobepropco.co.za/wp-content/uploads/2025/06/QJ2A7349-scaled-e1748771549787.jpg",
        alt: "Exterior view of Jobe Propco apartments",
      },
      {
        src: "https://jobepropco.co.za/wp-content/uploads/2025/06/DJI_0279-2-scaled.jpg",
        alt: "Aerial view of Jobe Propco phase buildings",
      },
      {
        src: "https://jobepropco.co.za/wp-content/uploads/2025/06/DJI_0285-scaled.jpg",
        alt: "Aerial exterior of Jobe Propco in Alexandra",
      },
      {
        src: "https://jobepropco.co.za/wp-content/uploads/2025/05/DJI_0286-scaled.jpg",
        alt: "Drone view of the Jobe Propco precinct",
      },
    ],
  },
];

export const apartmentSpecs = [
  "🛏 Studio (1 room)",
  "📐 15–20 sqm",
  "🍳 Private kitchenette",
  "🚿 Private bathroom",
  "🚪 Built-in cupboards",
  "🔐 Biometric access",
  "👥 Up to 3 occupants",
];

export const unitTypes: UnitType[] = [
  {
    id: "standard",
    name: "Standard Studio",
    tagline: "Clean, private, everything you need.",
    description:
      "A self-contained studio with a private kitchenette, private bathroom, and built-in cupboards. No balcony, no sliding door — just a well-finished, practical space that is easy to move into and easy to live in.",
    features: [
      "Private kitchenette",
      "Private bathroom",
      "Built-in cupboards",
      "Biometric access",
      "15–20 sqm",
    ],
    image:
      "https://jobepropco.co.za/wp-content/uploads/2025/05/Open-Space-1-scaled-e1748731339120.jpg",
  },
  {
    id: "balcony",
    name: "Balcony Studio",
    tagline: "Open air, natural light, room to breathe.",
    description:
      "Same well-finished studio layout, with the addition of a private balcony. Step outside in the morning, let the air in after a long day, or just have a space that feels bigger than it is.",
    features: [
      "Private balcony",
      "Private kitchenette",
      "Private bathroom",
      "Built-in cupboards",
      "Biometric access",
    ],
    image:
      "https://jobepropco.co.za/wp-content/uploads/2025/06/QJ2A7347-scaled-e1748771472367.jpg",
  },
  {
    id: "sliding-door",
    name: "Sliding Door Studio",
    tagline: "Indoor-outdoor feel. More natural light.",
    description:
      "The sliding glass door opens the studio up and floods the space with light. A different feel from a standard unit — airier, more open, with a connection to the outside without the full balcony.",
    features: [
      "Full-height sliding glass door",
      "Private kitchenette",
      "Private bathroom",
      "Built-in cupboards",
      "Biometric access",
    ],
    image:
      "https://jobepropco.co.za/wp-content/uploads/2025/06/QJ2A7348-scaled-e1748771512324.jpg",
  },
];

export const apartmentPhases: ApartmentPhase[] = [
  {
    badge: "Phase 1",
    name: "Jobe Mews",
    address: "858 Mauritius Loop, Far East Bank",
    image: "https://jobepropco.co.za/wp-content/uploads/2025/05/DJI_0321-scaled.jpg",
    mapsUrl: createMapsLink("858 Mauritius Loop, Far East Bank, Alexandra, Johannesburg"),
    whatsappUrl,
  },
  {
    badge: "Phase 2",
    name: "Jobe Precinct",
    address: "Jobe Precinct, Far East Bank",
    image: "https://jobepropco.co.za/wp-content/uploads/2025/05/DJI_0289-scaled.jpg",
    mapsUrl: createMapsLink("Jobe Precinct, Far East Bank, Alexandra, Johannesburg"),
    whatsappUrl,
  },
  {
    badge: "Phase 3",
    name: "Jobe Heights",
    address: "1767 S Africa Blvd, Far East Bank",
    image: "https://jobepropco.co.za/wp-content/uploads/2025/05/DJI_0283-scaled.jpg",
    mapsUrl: createMapsLink("1767 S Africa Blvd, Far East Bank, Alexandra, Johannesburg"),
    whatsappUrl,
  },
  {
    badge: "Phase 4",
    name: "Jobe Bel Air",
    address: "1805 Nigeria St, Far East Bank",
    image: "https://jobepropco.co.za/wp-content/uploads/2025/05/DJI_0294-scaled.jpg",
    mapsUrl: createMapsLink("1805 Nigeria St, Far East Bank, Alexandra, Johannesburg"),
    whatsappUrl,
  },
  {
    badge: "Phase 5",
    name: "Jobe Towers",
    address: "1191 S Africa Loop, Alexandra",
    image:
      "https://jobepropco.co.za/wp-content/uploads/2025/05/WhatsApp-Image-2022-06-04-at-3.07.21-PM-1-1.jpeg",
    mapsUrl: createMapsLink("1191 S Africa Loop, Alexandra, Johannesburg"),
    whatsappUrl,
  },
  {
    badge: "Phase 6",
    name: "Jobe Lifestyle Corner",
    address: "503 S Africa Blvd, Far East Bank",
    image: "https://jobepropco.co.za/wp-content/uploads/2025/05/Jobe-Lifestyle.jpg",
    mapsUrl: createMapsLink("503 S Africa Blvd, Far East Bank, Alexandra, Johannesburg"),
    whatsappUrl,
  },
];

export const guesthouseHeroImage =
  "https://jobepropco.co.za/wp-content/uploads/2025/06/WhatsApp-Image-2025-05-31-at-14.46.07-1-scaled-e1748812096901.jpeg";

export const guesthousePricingImage =
  "https://jobepropco.co.za/wp-content/uploads/2026/04/Towers-Guest-House-724x1024.png";

export const guesthouseGalleryGroups: GalleryGroup[] = [
  {
    id: "all-rooms",
    label: "All rooms",
    items: [
      {
        src: "https://jobepropco.co.za/wp-content/uploads/2025/06/WhatsApp-Image-2025-05-31-at-14.46.07-1-scaled-e1748812096901.jpeg",
        alt: "Guesthouse bedroom at Jobe Towers",
      },
      {
        src: "https://jobepropco.co.za/wp-content/uploads/2025/06/WhatsApp-Image-2025-05-31-at-14.45.04-scaled.jpeg",
        alt: "Guesthouse room interior at Jobe Towers",
      },
      {
        src: "https://jobepropco.co.za/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-06-at-16.37.38-1-1152x1536.jpeg",
        alt: "Guesthouse room with bed and storage at Jobe Towers",
      },
      {
        src: "https://jobepropco.co.za/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-06-at-16.37.38-2-1152x1536.jpeg",
        alt: "Guesthouse room layout at Jobe Towers",
      },
      {
        src: "https://jobepropco.co.za/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-06-at-23.22.08.jpeg",
        alt: "Guesthouse room finish details at Jobe Towers",
      },
      {
        src: "https://jobepropco.co.za/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-06-at-16.37.28-1-1536x1536.jpeg",
        alt: "Guesthouse bathroom at Jobe Towers",
      },
      {
        src: "https://jobepropco.co.za/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-06-at-16.37.28-2-1536x1536.jpeg",
        alt: "Guesthouse bathroom finishes at Jobe Towers",
      },
      {
        src: "https://jobepropco.co.za/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-06-at-16.37.29-1536x1536.jpeg",
        alt: "Guesthouse kitchenette area at Jobe Towers",
      },
      {
        src: "https://jobepropco.co.za/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-06-at-16.37.41-1-1536x1536.jpeg",
        alt: "Guesthouse lounge area at Jobe Towers",
      },
      {
        src: "https://jobepropco.co.za/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-06-at-16.37.37-1536x1536.jpeg",
        alt: "Guesthouse room setup at Jobe Towers",
      },
      {
        src: "https://jobepropco.co.za/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-06-at-16.37.25-1536x1536.jpeg",
        alt: "Guesthouse common area at Jobe Towers",
      },
    ],
  },
];

export const aboutStory = [
  "Jobe Propco was founded in 2016 by Dr Nhlanhla Sithole — a doctor who saw what was missing in the city he served. His patients, his colleagues, his neighbours were spending hours commuting from far-away rentals to work in Sandton. The housing close to the economic centre was either unaffordable or undignified. He decided to change that.",
  "Starting with one phase and a clear idea, Dr Sithole built Jobe Propco to give working people and students a real alternative. A studio that is private, secure, and close to where the jobs are. Not a halfway compromise — a properly finished home at a price that makes sense.",
  "Today Jobe Propco spans six phases in Far East Bank, Alexandra — all within 9km of Sandton City, 3km from the Gautrain, and a short walk from the Jobe Lifestyle Corner. The vision is still the same: dignified, affordable housing that lets people focus on building their lives, not surviving their commute.",
];

export const aboutStats = [
  { value: "2016", label: "Founded" },
  { value: "6", label: "Phases" },
  { value: "R4,300", label: "Monthly from" },
  { value: "9km", label: "To Sandton" },
];

export const moveInFaqs: FaqItem[] = [
  {
    question: "How much is rent?",
    answer:
      "R4,300 per month. That covers your studio, all shared amenities, 24/7 security, and biometric access. No hidden charges.",
  },
  {
    question: "What types of studio are available?",
    answer:
      "All Jobe studios come in one of three layouts: Standard (no balcony or sliding door), Balcony studio (private outdoor space), or Sliding door studio (full-height glass door for more light and an open feel). Same price, same finishes — just different ways the space opens up. WhatsApp us and we'll tell you what's available right now.",
  },
  {
    question: "Can I choose my unit type?",
    answer:
      "Yes, when you enquire tell us which layout you prefer. We'll match you to an available unit in that type across any of the six phases.",
  },
  {
    question: "Do I need to sign a lease?",
    answer: "No lease agreement required. We keep it simple.",
  },
  {
    question: "Do you accept students?",
    answer:
      "Yes. Students are welcome. As long as rent is paid on time, you have a home here.",
  },
  {
    question: "How many people can live in one unit?",
    answer: "Up to 3 people per studio.",
  },
  {
    question: "When can I view a unit?",
    answer:
      "WhatsApp us on 072 229 3229 and we will arrange a viewing. Units move quickly — the sooner the better.",
  },
  {
    question: "What do I need to move in?",
    answer:
      "WhatsApp us to confirm availability and we will walk you through the rest. See the payment options below for the deposit and rental arrangement.",
  },
  {
    question: "How do I pay my rent?",
    answer: "Through the tenant portal — card or EFT. Receipt goes straight to you.",
  },
  {
    question: "Is there parking?",
    answer:
      "Yes. Ask about availability for your specific phase when you enquire.",
  },
  {
    question: "How far is it from Sandton?",
    answer:
      "9km from Sandton City. 3km from Marlboro Gautrain. 25km from the Johannesburg CBD.",
  },
  {
    question: "Is there Wi-Fi or fibre?",
    answer: "Units are fibre-ready. Ask about connectivity when you enquire.",
  },
];

export const faqPricingImage =
  "https://jobepropco.co.za/wp-content/uploads/2025/06/Jobe-Propco-Price-2-724x1024.png";
