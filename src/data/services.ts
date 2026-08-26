import { GraduationCap, Briefcase, BadgeCheck, Palmtree } from "lucide-react";
import type { Service } from "../types";

export const services: Service[] = [
  {
    id: "study",
    title: "Study Abroad",
    tagline: "Universities & colleges worldwide",
    description:
      "From course selection and admission to the student visa — we match your profile to the right institution and country, including MOI-friendly routes.",
    points: [
      "University & course shortlisting",
      "Admission & scholarship support",
      "Student visa & documentation",
    ],
    icon: GraduationCap,
    accent: "royal",
  },
  {
    id: "work",
    title: "Work Visa",
    tagline: "Legal jobs & work permits",
    description:
      "Genuine, contract-based work opportunities abroad — including the Malaysia Calling Visa 2026 — with clear terms on salary, overtime and insurance.",
    points: [
      "Verified employers & job categories",
      "Work permit & calling-visa processing",
      "Pre-departure briefing",
    ],
    icon: Briefcase,
    accent: "crimson",
  },
  {
    id: "migration",
    title: "Migration & PR",
    tagline: "Permanent residency pathways",
    description:
      "Skilled, family and investor migration to Canada, Australia and beyond — with an honest eligibility assessment before you commit a single taka.",
    points: [
      "Points-based eligibility check",
      "Skilled & family sponsorship",
      "End-to-end PR application",
    ],
    icon: BadgeCheck,
    accent: "gold",
  },
  {
    id: "tours",
    title: "Tours & Visit Visa",
    tagline: "Holidays & tourist visas",
    description:
      "Tourist, business and family-visit visas plus curated tour packages — with strong, well-prepared applications that stand up at the embassy.",
    points: [
      "Tourist & business visit visas",
      "Itinerary & booking support",
      "Curated group tour packages",
    ],
    icon: Palmtree,
    accent: "navy",
  },
];
