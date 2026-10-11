import type { LucideIcon } from "lucide-react";

export interface NavLink {
  id: string;
  label: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: LucideIcon;
}

/* ── Services ─────────────────────────────────────────── */

export type ServiceId = "study" | "work" | "ielts" | "tours";
export type Accent = "crimson" | "gold" | "royal" | "navy";

export interface Service {
  id: ServiceId;
  title: string;
  tagline: string;
  description: string;
  points: string[];
  icon: LucideIcon;
  accent: Accent;
  image: string;
}

/* ── Destinations ─────────────────────────────────────── */

export interface Destination {
  id: string;
  country: string;
  flag: string;
  headline: string;
  note: string;
  tags: string[];
  featured?: boolean;
  image: string;
}

/* ── Featured programs (campaigns) ────────────────────── */

export interface JobCategory {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface Program {
  id: string;
  kicker: string;
  title: string;
  summary: string;
  flag: string;
  highlights: string[];
  accent: Accent;
}

/* ── Process / trust / content ────────────────────────── */

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface WhyPoint {
  id: string;
  index: string;
  title: string;
  description: string;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  name: string;
  route: string;
  location: string;
  initials: string;
  quote: string;
}

export interface Stat {
  id: string;
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

/* ── Lead / eligibility wizard ────────────────────────── */

export type LeadGoal = "study" | "work" | "migrate" | "tour";
export type LeadDestination =
  | "canada"
  | "australia"
  | "uk"
  | "usa"
  | "malaysia"
  | "europe"
  | "other";

export interface LeadData {
  goal: LeadGoal | "";
  destination: LeadDestination | "";
  education: string;
  cgpa: string;
  english: string;
  field: string;
  experience: string;
  age: string;
  travelWith: string;
  month: string;
  name: string;
  phone: string;
  email: string;
}

export type LeadField = keyof LeadData;
export type LeadErrors = Partial<Record<LeadField, string>>;

export type LeadTier = "strong" | "good" | "explore";

export interface LeadResult {
  tier: LeadTier;
  score: number;
  headline: string;
  recommendation: string;
  matchedProgram: string;
  nextSteps: string[];
  whatsappMessage: string;
}

export interface SelectableOption<T extends string = string> {
  value: T;
  label: string;
  description?: string;
  icon?: LucideIcon;
  flag?: string;
}

/* ── Contact enquiry form ─────────────────────────────── */

export interface EnquiryFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  destination: string;
  message: string;
}

export type EnquiryFormErrors = Partial<Record<keyof EnquiryFormData, string>>;
