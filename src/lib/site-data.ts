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
  { href: "/#living", label: "Residences" },
  { href: "/#availability", label: "Availability" },
  { href: "/portal", label: "Tenant portal" },
  { href: "/admin", label: "Owner dashboard" },
  { href: "/advertise", label: "Advertise" },
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
    summary: "Ground-floor access, built-in cupboards, and a bright open-plan layout.",
  },
  {
    id: "phase-5-b08",
    name: "Studio B08",
    phase: "Phase 5",
    beds: "1 bed studio",
    price: "R4,350/mo",
    available: true,
    availableFrom: "Available now",
    summary: "Quiet courtyard-facing unit close to parking and the Lifestyle Corner.",
  },
  {
    id: "phase-6-c03",
    name: "Studio C03",
    phase: "Phase 6",
    beds: "1 bed studio",
    price: "R4,500/mo",
    available: false,
    availableFrom: "Join the waiting list",
    summary: "Top-floor outlook with strong natural light and easy Gautrain access.",
  },
];

export const phases = ["Any phase", ...new Set(units.map((unit) => unit.phase))];

export const gallery = [
  {
    src: "https://jobepropco.co.za/wp-content/uploads/2025/05/Home-Page--1024x768.jpg",
    alt: "Exterior view of Jobe Propco apartments",
    caption: "A branded address that already looks more premium than the listing portals.",
  },
  {
    src: "https://jobepropco.co.za/wp-content/uploads/2025/05/Open-Space-2-1-scaled-e1748731289337-1024x644.jpg",
    alt: "Open-plan apartment interior",
    caption: "Studios designed for clean move-ins, modern finishes, and easy self-service upkeep.",
  },
  {
    src: "https://jobepropco.co.za/wp-content/uploads/2025/05/Jobe-Lifestyle.jpg",
    alt: "Lifestyle Corner commercial area",
    caption: "Lifestyle Corner creates a natural next revenue layer for site advertising and promotion.",
  },
];

export const ownerSignals = [
  {
    title: "Structured waiting list",
    body: "Capture every prospect with a proper pipeline instead of chasing voice notes and missed WhatsApps.",
  },
  {
    title: "Tenant self-service",
    body: "Maintenance, documents, move dates, and payment nudges move into one portal that tenants can use from their phones.",
  },
  {
    title: "Operational visibility",
    body: "The owner dashboard shows occupancy, maintenance load, and payment status without spreadsheet hunting.",
  },
];

export const portalMoments = [
  "Maintenance request submission with photo upload",
  "Lease documents and move-in / move-out tracking",
  "Payment reminders and proof-of-payment history",
];

export const adminMetrics = [
  { label: "Occupancy", value: "94%", detail: "Live view across all phases." },
  { label: "Collected this month", value: "R187k", detail: "Receipts, statuses, and overdue flags." },
  { label: "Open maintenance", value: "07", detail: "Photo-backed issues sorted by urgency." },
];

export const adPlacements = [
  {
    title: "Lifestyle Corner feature",
    detail: "A premium homepage placement for the on-site restaurant, laundromat, or local shops.",
  },
  {
    title: "Resident offer spotlight",
    detail: "Monthly offers pushed to tenants and waiting-list prospects with owner approval.",
  },
  {
    title: "Future self-serve slots",
    detail: "The foundation is ready for paid ad inventory when the owner wants to productize it.",
  },
];

export const faqs = [
  {
    question: "Can tenants pay through the website?",
    answer: "Yes. The product structure is ready for a tenant portal with rent collection, reminders, and owner-side payment visibility.",
  },
  {
    question: "How does the waiting list work?",
    answer: "Prospects submit their name, phone number, and preferred phase. The owner receives a structured alert by email and can add SMS / WhatsApp notifications next.",
  },
  {
    question: "What makes this better than the current website?",
    answer: "The redesign leads with the brand, uses stronger imagery, and turns the site into a working business tool instead of just a brochure.",
  },
];
