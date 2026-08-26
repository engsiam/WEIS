import type { LeadData, LeadErrors, LeadGoal } from "../../types";

export type LeadStepId = "goal" | "destination" | "profile" | "contact";

export const LEAD_STEPS: LeadStepId[] = [
  "goal",
  "destination",
  "profile",
  "contact",
];

/** Which profile fields are required, per goal (kept minimal to reduce friction). */
function requiredProfileFields(goal: LeadGoal): (keyof LeadData)[] {
  switch (goal) {
    case "study":
      return ["education", "english"];
    case "work":
      return ["experience"];
    case "migrate":
      return ["age", "experience"];
    case "tour":
      return ["month"];
    default:
      return [];
  }
}

export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/[^\d]/g, "");
  return /^\+?[\d\s-]{7,}$/.test(phone.trim()) && digits.length >= 7 && digits.length <= 15;
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/** Validate only the fields owned by the current wizard step. */
export function validateLeadStep(step: LeadStepId, data: LeadData): LeadErrors {
  const errors: LeadErrors = {};

  if (step === "goal" && !data.goal) {
    errors.goal = "Please choose what you'd like to do.";
  }

  if (step === "destination" && !data.destination) {
    errors.destination = "Please pick a destination (or “Not sure yet”).";
  }

  if (step === "profile" && data.goal) {
    for (const field of requiredProfileFields(data.goal)) {
      if (!data[field]) {
        errors[field] = "Please select an option.";
      }
    }
  }

  if (step === "contact") {
    if (!data.name.trim()) {
      errors.name = "Please enter your name.";
    }
    if (!data.phone.trim()) {
      errors.phone = "A phone / WhatsApp number is required.";
    } else if (!isValidPhone(data.phone)) {
      errors.phone = "Please enter a valid phone number.";
    }
    if (data.email.trim() && !isValidEmail(data.email)) {
      errors.email = "Please enter a valid email (or leave it blank).";
    }
  }

  return errors;
}
