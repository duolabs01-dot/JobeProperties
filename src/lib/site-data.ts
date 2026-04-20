export type Unit = {
  id: string;
  name: string;
  phase: string;
  beds: string;
  price: string;
  available: boolean;
  availableFrom: string;
  summary: string;
};

export const navItems = [
  { href: "/apartments", label: "Apartments" },
  { href: "/guesthouse", label: "Guesthouse" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
  { href: "/portal", label: "Tenant portal" },
];

export const units: Unit[] = [
  {
    id: "phase-4-a12",
    name: "Studio A12",
    phase: "Phase 4",
    beds: "1 bed studio",
    price: "R4,200/mo",
    available: true,
    availableFrom: "Available now",
    summary: "Ground floor, bright, and easy to move into.",
  },
  {
    id: "phase-5-b08",
    name: "Studio B08",
    phase: "Phase 5",
    beds: "1 bed studio",
    price: "R4,350/mo",
    available: true,
    availableFrom: "Available now",
    summary: "Quiet side of the block, close to parking and daily essentials.",
  },
  {
    id: "phase-6-c03",
    name: "Studio C03",
    phase: "Phase 6",
    beds: "1 bed studio",
    price: "R4,500/mo",
    available: false,
    availableFrom: "Waiting list open",
    summary: "Top floor, plenty of light, and an easy trip toward the Gautrain.",
  },
];

export const phases = ["Any phase", ...new Set(units.map((unit) => unit.phase))];

export const gallery = [
  {
    src: "https://jobepropco.co.za/wp-content/uploads/2025/05/Home-Page--1024x768.jpg",
    alt: "Exterior view of Jobe Propco apartments",
    caption: "A quiet address in Alexandra, with Sandton nine kilometres up the road.",
  },
  {
    src: "https://jobepropco.co.za/wp-content/uploads/2025/05/Open-Space-2-1-scaled-e1748731289337-1024x644.jpg",
    alt: "Open-plan apartment interior",
    caption: "Built-in cupboards, fibre-ready walls, and natural light that makes the room feel bigger.",
  },
  {
    src: "https://jobepropco.co.za/wp-content/uploads/2025/05/Jobe-Lifestyle.jpg",
    alt: "Lifestyle Corner commercial area",
    caption: "Food, essentials, and everyday stops close by, so late finishes do not mean long detours.",
  },
];

export const socialProofPhrases = [
  "6 phases across Far East Bank",
  "Founded 2016 by Dr Nhlanhla Sithole",
  "3km from Marlboro Gautrain",
  "No lease agreement required",
  "Students welcome",
  "24/7 biometric security",
];

export const ownerSignals = [
  {
    title: "Clear communication",
    body: "Availability, rent, and maintenance each have a clear place, so you are not left guessing who to contact.",
  },
  {
    title: "Repairs get followed up",
    body: "If something breaks, the details are logged properly and easier to act on fast.",
  },
  {
    title: "Your paperwork stays close",
    body: "Lease copies, move dates, and payment records are easy to find when you need them.",
  },
];

export const portalMoments = [
  "Pay rent from your phone and get your receipt straight away.",
  "Report something broken any time, without awkward follow-ups.",
  "Keep your lease and move details where you can find them.",
];

export const adminMetrics = [
  { label: "Maintenance", value: "48 hrs", detail: "Most requests are picked up within two days." },
  { label: "Payments", value: "Tracked", detail: "Rent, receipts, and overdue balances stay up to date." },
  { label: "Move-ins", value: "On file", detail: "Documents, handovers, and vacancies are easy to follow." },
];

export const adPlacements = [
  {
    title: "Laundry, food, and daily essentials",
    detail: "Reach tenants looking for the services they use every week.",
  },
  {
    title: "Resident offers that people will notice",
    detail: "Promote a special, a launch, or a discount close to home.",
  },
  {
    title: "A local audience, right on your doorstep",
    detail: "Speak to people who live, eat, and spend within walking distance.",
  },
];

export const faqs = [
  {
    question: "How do I pay my rent?",
    answer: "Through the tenant portal. Pay by card or EFT and keep your receipt in one place.",
  },
  {
    question: "How do I report something broken?",
    answer: "Log a maintenance request in the tenant portal with the details of the issue. We aim to respond within 48 hours.",
  },
  {
    question: "Is there parking?",
    answer: "Yes. Ask about parking availability for your phase when you enquire.",
  },
  {
    question: "How do I secure a unit?",
    answer: "WhatsApp us on 072 229 3229 or fill in the availability form. Units move quickly, so it helps to act fast.",
  },
  {
    question: "How far is Jobe from Sandton?",
    answer: "About 9km, with the Gautrain close when you need a quicker trip into the city.",
  },
];
