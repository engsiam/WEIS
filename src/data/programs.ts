import {
  UtensilsCrossed,
  Zap,
  Hand,
  Drumstick,
  HardHat,
  Hotel,
  SprayCan,
  Flag,
  Sprout,
  Truck,
} from "lucide-react";
import type { JobCategory, Program } from "../types";

/**
 * Malaysia "Calling Visa" job categories, taken from the WEIS 2026 campaign
 * flyers (Restaurant, Electrician, Hand Gloves, Chicken Factory, Construction,
 * Resort, Cleaner, Golf Resort — plus Gardening & Courier).
 */
export const malaysiaJobCategories: JobCategory[] = [
  { id: "restaurant", label: "Restaurant", icon: UtensilsCrossed },
  { id: "electrician", label: "Electrician", icon: Zap },
  { id: "gloves", label: "Hand Gloves Factory", icon: Hand },
  { id: "chicken", label: "Chicken Factory", icon: Drumstick },
  { id: "construction", label: "Construction", icon: HardHat },
  { id: "resort", label: "Resort", icon: Hotel },
  { id: "cleaner", label: "Cleaner", icon: SprayCan },
  { id: "golf", label: "Golf Resort", icon: Flag },
  { id: "gardening", label: "Gardening", icon: Sprout },
  { id: "courier", label: "Courier Service", icon: Truck },
];

export const featuredPrograms: Program[] = [
  {
    id: "malaysia-calling-visa",
    kicker: "Work · 2026 Intake",
    title: "Malaysia Calling Visa",
    flag: "🇲🇾",
    summary:
      "Legal, contract-based work across 10+ categories for candidates ready to work in Malaysia — medical, permit and visa processing handled end-to-end.",
    highlights: [
      "Legal calling visa & work permit",
      "Monthly salary + overtime",
      "Medical insurance & accommodation support",
      "Company-contract based employment",
    ],
    accent: "crimson",
  },
  {
    id: "canada-lakehead",
    kicker: "Study · Lakehead University",
    title: "Canada Master's via MOI",
    flag: "🇨🇦",
    summary:
      "Study a Master's or research programme at Lakehead University — one of Canada's public research universities — with an MOI-friendly, family-friendly route.",
    highlights: [
      "Apply with MOI — IELTS-flexible",
      "CGPA 2.80+ eligible to apply",
      "Tuition from CAD 23,000 / year",
      "No PAL required · apply with family",
    ],
    accent: "royal",
  },
  {
    id: "study-abroad",
    kicker: "Study · 4 continents",
    title: "Study in UK, Australia & USA",
    flag: "🌍",
    summary:
      "Admission and student-visa support for the UK, Australia, USA and Europe — with scholarship guidance and post-study work routes.",
    highlights: [
      "Admission & scholarship support",
      "Post-study work visas",
      "Dependant / family options",
      "MOI-friendly universities",
    ],
    accent: "gold",
  },
];
