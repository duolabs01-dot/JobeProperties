import { apartmentLocations } from "@/lib/property-data";

export type Unit = {
  id: string;
  name: string;
  phase: string;
  unitType: "standard" | "balcony" | "sliding-door";
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
];

export const units: Unit[] = [
  {
    id: "phase-4-a12",
    name: "Studio A12",
    phase: "Location 4",
    unitType: "standard",
    beds: "1 bed studio",
    price: "R4,200/mo",
    available: true,
    availableFrom: "Available now",
    summary: "Ground floor, bright, and easy to move into.",
  },
  {
    id: "phase-5-b08",
    name: "Studio B08",
    phase: "Location 5",
    unitType: "balcony",
    beds: "1 bed studio",
    price: "R4,350/mo",
    available: true,
    availableFrom: "Available now",
    summary: "Quiet side of the block, close to parking and daily essentials.",
  },
  {
    id: "phase-6-c03",
    name: "Studio C03",
    phase: "Location 6",
    unitType: "sliding-door",
    beds: "1 bed studio",
    price: "R4,500/mo",
    available: false,
    availableFrom: "Waiting list open",
    summary: "Top floor, plenty of light, and an easy trip toward the Gautrain.",
  },
];

export const phases = ["Any location", ...apartmentLocations.map((phase) => phase.badge)];

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
  {
    src: "https://jobepropco.co.za/wp-content/uploads/2025/05/Open-Space-1-scaled-e1748731339120.jpg",
    alt: "Studio living area at Jobe Propco",
    caption: "Clean lines, warm light, and a layout that works for one person or three.",
  },
  {
    src: "https://jobepropco.co.za/wp-content/uploads/2025/06/QJ2A7347-scaled-e1748771472367.jpg",
    alt: "Private balcony at Jobe Propco",
    caption: "Balcony units open up the studio and let the outside in.",
  },
  {
    src: "https://jobepropco.co.za/wp-content/uploads/2025/05/bathroom-2-scaled-e1748769101963.jpg",
    alt: "Private bathroom at Jobe Propco",
    caption: "Private bathroom in every unit. No sharing.",
  },
  {
    src: "https://jobepropco.co.za/wp-content/uploads/2025/05/DJI_0283-scaled.jpg",
    alt: "Jobe Heights aerial view",
    caption: "Six locations, all within Far East Bank.",
  },
];

export const socialProofPhrases = [
  "6 locations across Far East Bank",
  "Founded 2016 by Dr Nhlanhla Sithole",
  "3km from Marlboro Gautrain",
  "No lease agreement required",
  "Students welcome",
  "24/7 biometric security",
  "Vuma fibre from R99/month",
  "Uncapped internet in every unit",
  "Restaurant, bar & salon on-site",
  "Conference venue for 80 delegates",
];

export const ownerSignals = [
  {
    title: "Biometric access at every door.",
    body: "No keys to lose, no strangers getting in. Your fingerprint is your key — and only yours.",
  },
  {
    title: "Maintenance is logged, not lost.",
    body: "Report something broken through the portal. We track it, follow it up, and close it out. No chasing required.",
  },
  {
    title: "Pay rent from your phone.",
    body: "Card, EFT, or instant payment through the tenant portal. Your receipt arrives the moment it goes through.",
  },
];

export const portalMoments = [
  "Pay rent from your phone and get your receipt straight away.",
  "Report something broken any time, without awkward follow-ups.",
  "Keep your lease and move details where you can find them.",
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
    answer: "Yes. Ask about parking availability for your location when you enquire.",
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
