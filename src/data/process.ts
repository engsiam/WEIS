import {
  ClipboardCheck,
  Compass,
  FileText,
  ShieldCheck,
  PlaneTakeoff,
} from "lucide-react";
import type { ProcessStep } from "../types";

export const processSteps: ProcessStep[] = [
  {
    id: "assessment",
    title: "Free eligibility check",
    description:
      "We assess your goal, profile and budget in minutes — then tell you honestly which countries and routes actually fit.",
    icon: ClipboardCheck,
  },
  {
    id: "counselling",
    title: "Counselling & country match",
    description:
      "A dedicated advisor maps your best-value options — university, employer or PR pathway — and agrees a clear plan with you.",
    icon: Compass,
  },
  {
    id: "documentation",
    title: "Documentation & application",
    description:
      "We prepare a strong, embassy-ready file — admission, sponsorship, financials and forms — and submit every application correctly.",
    icon: FileText,
  },
  {
    id: "visa",
    title: "Visa processing & interview prep",
    description:
      "We track your case, prepare you for biometrics and interviews, and keep you updated at every stage until decision.",
    icon: ShieldCheck,
  },
  {
    id: "landing",
    title: "Pre-departure & landing",
    description:
      "Tickets, accommodation, forex and a pre-departure briefing — so you arrive ready and land with confidence.",
    icon: PlaneTakeoff,
  },
];
