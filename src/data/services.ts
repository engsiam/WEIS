import {
  GraduationCap,
  Briefcase,
  Languages,
  Palmtree,
} from "lucide-react";
import type { Service } from "../types";

export const services: Service[] = [
  {
    id: "study",
    title: "Study Abroad",
    tagline: "Worldwide universities",
    description:
      "From course selection to visa stamping — matched to the right institution and country, including MOI-friendly routes.",
    points: [
      "University & course shortlisting",
      "Admission & scholarship support",
      "Student visa & documentation",
    ],
    icon: GraduationCap,
    accent: "royal",
    image: "/images/study-abroad.jpg",
  },
  {
    id: "work",
    title: "Work Visa",
    tagline: "Legal jobs & permits",
    description:
      "Genuine contract-based jobs abroad — including the Malaysia Calling Visa 2026 — with clear salary and insurance terms.",
    points: [
      "Verified employers & job categories",
      "Work permit & calling-visa processing",
      "Pre-departure briefing",
    ],
    icon: Briefcase,
    accent: "crimson",
    image: "/images/work-visa-portugal.jpg",
  },
  {
    id: "ielts",
    title: "IELTS",
    tagline: "Band 7+ preparation",
    description:
      "Expert training with mock tests, band-score assessment and one-to-one coaching for all four modules.",
    points: [
      "Mock tests with band assessment",
      "Speaking & writing coaching",
      "BC & IDP registration support",
    ],
    icon: Languages,
    accent: "gold",
    image: "/images/ielts.jpg",
  },
  {
    id: "tours",
    title: "Tours & Visit Visa",
    tagline: "Holidays & visit visas",
    description:
      "Tourist, business and family-visit visas plus curated tour packages — applications that stand up at the embassy.",
    points: [
      "Tourist & business visit visas",
      "Itinerary & booking support",
      "Curated group tour packages",
    ],
    icon: Palmtree,
    accent: "navy",
    image: "/images/tours.jpg",
  },
];
