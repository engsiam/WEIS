import { GraduationCap, Briefcase, BadgeCheck, Palmtree } from "lucide-react";
import type {
  LeadDestination,
  LeadGoal,
  SelectableOption,
} from "../types";

export const goalOptions: SelectableOption<LeadGoal>[] = [
  {
    value: "study",
    label: "Study",
    description: "University or college abroad",
    icon: GraduationCap,
  },
  {
    value: "work",
    label: "Work",
    description: "Jobs & work permits",
    icon: Briefcase,
  },
  {
    value: "migrate",
    label: "Migrate (PR)",
    description: "Permanent residency",
    icon: BadgeCheck,
  },
  {
    value: "tour",
    label: "Tour / Visit",
    description: "Tourist or visit visa",
    icon: Palmtree,
  },
];

export const destinationOptions: SelectableOption<LeadDestination>[] = [
  { value: "canada", label: "Canada", flag: "🇨🇦" },
  { value: "australia", label: "Australia", flag: "🇦🇺" },
  { value: "uk", label: "United Kingdom", flag: "🇬🇧" },
  { value: "usa", label: "United States", flag: "🇺🇸" },
  { value: "malaysia", label: "Malaysia", flag: "🇲🇾" },
  { value: "europe", label: "Europe", flag: "🇪🇺" },
  { value: "other", label: "Not sure yet", flag: "🌍" },
];

export const educationOptions = [
  "SSC / O-Level",
  "HSC / A-Level",
  "Diploma",
  "Bachelor's",
  "Master's",
  "PhD",
];

export const cgpaOptions = [
  "Below 2.50",
  "2.50 – 2.79",
  "2.80 – 3.29",
  "3.30 – 3.69",
  "3.70 & above",
];

export const englishOptions = [
  "Yes — IELTS / PTE / TOEFL",
  "Planning to take a test",
  "No — need an MOI route",
];

export const experienceOptions = [
  "Fresher / student",
  "1 – 3 years",
  "3 – 5 years",
  "5 – 10 years",
  "10+ years",
];

export const ageOptions = [
  "Under 18",
  "18 – 25",
  "26 – 30",
  "31 – 40",
  "41 & above",
];

export const travelWithOptions = ["Just me", "With spouse", "With family", "As a group"];

export const monthOptions = [
  "As soon as possible",
  "Within 1–3 months",
  "3–6 months",
  "6–12 months",
  "Just exploring",
];
