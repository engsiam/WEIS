import type {
  LeadData,
  LeadDestination,
  LeadGoal,
  LeadResult,
  LeadTier,
} from "../../types";
import { company } from "../../data/company";

/* ── Human labels (used in the result + WhatsApp message) ─────────── */

const GOAL_LABEL: Record<LeadGoal, string> = {
  study: "Study",
  work: "Work",
  migrate: "Migrate (PR)",
  tour: "Tour / Visit",
};

const DEST_LABEL: Record<LeadDestination, string> = {
  canada: "Canada",
  australia: "Australia",
  uk: "United Kingdom",
  usa: "United States",
  malaysia: "Malaysia",
  europe: "Europe",
  other: "an undecided destination",
};

/* ── Points helpers (transparent, explainable scoring) ────────────── */

function educationPoints(education: string): number {
  if (education.startsWith("PhD")) return 18;
  if (education.startsWith("Master")) return 17;
  if (education.startsWith("Bachelor")) return 15;
  if (education.startsWith("Diploma")) return 11;
  if (education.startsWith("HSC")) return 9;
  if (education.startsWith("SSC")) return 5;
  return 0;
}

function cgpaPoints(cgpa: string): number {
  if (cgpa.startsWith("3.70")) return 18;
  if (cgpa.startsWith("3.30")) return 14;
  if (cgpa.startsWith("2.80")) return 11;
  if (cgpa.startsWith("2.50")) return 6;
  if (cgpa.startsWith("Below")) return 2;
  return 0;
}

function englishPoints(english: string): number {
  if (english.startsWith("Yes")) return 24;
  if (english.startsWith("Planning")) return 13;
  if (english.startsWith("No")) return 7; // still viable via MOI
  return 0;
}

function experiencePoints(experience: string): number {
  if (experience.startsWith("10+")) return 18;
  if (experience.startsWith("5")) return 15;
  if (experience.startsWith("3")) return 12;
  if (experience.startsWith("1")) return 8;
  if (experience.startsWith("Fresher")) return 3;
  return 0;
}

function agePoints(age: string): number {
  if (age.startsWith("26")) return 14;
  if (age.startsWith("18")) return 12;
  if (age.startsWith("31")) return 8;
  if (age.startsWith("41")) return 4;
  if (age.startsWith("Under")) return 2;
  return 0;
}

/** Strong / plausible goal↔destination pairings earn a realism bonus. */
function pairingPoints(goal: LeadGoal, destination: LeadDestination): number {
  const strong: Record<LeadGoal, LeadDestination[]> = {
    study: ["canada", "uk", "australia", "usa", "europe"],
    work: ["malaysia", "europe"],
    migrate: ["canada", "australia"],
    tour: ["uk", "usa", "europe", "malaysia", "canada", "australia"],
  };
  if (strong[goal].includes(destination)) return 12;
  if (destination === "other") return 4;
  return 7;
}

/* ── Program matching (reflects the real WEIS campaigns) ──────────── */

interface ProgramMatch {
  matchedProgram: string;
  recommendation: string;
}

function resolveProgram(
  goal: LeadGoal,
  destination: LeadDestination
): ProgramMatch {
  if (goal === "work" && destination === "malaysia") {
    return {
      matchedProgram: "Malaysia Calling Visa 2026",
      recommendation:
        "You're a fit for the Malaysia Calling Visa 2026 — legal, contract-based work with salary, overtime and insurance. We'll match you to a job category and handle the permit end-to-end.",
    };
  }
  if (goal === "study" && destination === "canada") {
    return {
      matchedProgram: "Canada Master's via MOI · Lakehead University",
      recommendation:
        "Canada's MOI route suits you — study a Master's or research programme at Lakehead University with no PAL, family-friendly options and IELTS-flexible admission.",
    };
  }
  if (goal === "study") {
    return {
      matchedProgram: `Study in ${DEST_LABEL[destination]}`,
      recommendation: `We'll shortlist admission-ready, MOI-friendly universities in ${DEST_LABEL[destination]} and build your student-visa file, with scholarship guidance where you qualify.`,
    };
  }
  if (goal === "migrate") {
    return {
      matchedProgram: `PR pathway · ${DEST_LABEL[destination]}`,
      recommendation: `Based on your profile we'll assess points-based and family PR routes for ${DEST_LABEL[destination]}, and tell you honestly how to strengthen your case.`,
    };
  }
  if (goal === "work") {
    return {
      matchedProgram: `Overseas work permit · ${DEST_LABEL[destination]}`,
      recommendation: `We'll check verified, legal work routes for ${DEST_LABEL[destination]} that match your experience and confirm the documents you'll need.`,
    };
  }
  return {
    matchedProgram: `Visit / tourist visa · ${DEST_LABEL[destination]}`,
    recommendation: `We'll prepare a strong, embassy-ready visit-visa application for ${DEST_LABEL[destination]}, with itinerary and booking support.`,
  };
}

/* ── Profile summary (for the result + WhatsApp handoff) ──────────── */

function profileLines(data: LeadData): string[] {
  const lines: string[] = [];
  const add = (label: string, value: string) => {
    if (value) lines.push(`${label}: ${value}`);
  };
  if (data.goal === "study") {
    add("Education", data.education);
    add("CGPA", data.cgpa);
    add("English", data.english);
  } else if (data.goal === "work") {
    add("Field", data.field);
    add("Experience", data.experience);
  } else if (data.goal === "migrate") {
    add("Age", data.age);
    add("Education", data.education);
    add("Experience", data.experience);
  } else if (data.goal === "tour") {
    add("Travelling", data.travelWith);
    add("Timeline", data.month);
  }
  return lines;
}

function nextSteps(tier: LeadTier, goal: LeadGoal): string[] {
  const closing =
    tier === "strong"
      ? "Book your free consultation with a senior advisor"
      : tier === "good"
        ? "Talk to an advisor to lock in your best-value route"
        : "Get a free counselling call to map your options";

  const middle: Record<LeadGoal, string> = {
    study: "Gather academic transcripts, passport and (if any) English scores",
    work: "Keep your passport and experience/skill documents ready",
    migrate: "Prepare education, experience and IELTS/PTE evidence",
    tour: "Have your passport, bookings and financials ready",
  };

  return [
    closing,
    middle[goal],
    "We'll share a written plan with clear costs — no commitment",
  ];
}

/* ── Main engine ──────────────────────────────────────────────────── */

export function scoreLead(data: LeadData): LeadResult {
  const goal = (data.goal || "study") as LeadGoal;
  const destination = (data.destination || "other") as LeadDestination;

  let score = 28; // baseline for taking the assessment

  score += pairingPoints(goal, destination);

  if (goal === "study") {
    score += educationPoints(data.education);
    score += cgpaPoints(data.cgpa);
    score += englishPoints(data.english);
  } else if (goal === "work") {
    score += experiencePoints(data.experience);
    score += data.field ? 8 : 0;
  } else if (goal === "migrate") {
    score += agePoints(data.age);
    score += educationPoints(data.education);
    score += experiencePoints(data.experience);
  } else {
    // tour — lighter profile, so the baseline carries more weight
    score += data.month ? 10 : 0;
    score += data.travelWith ? 6 : 0;
  }

  if (data.phone) score += 8;
  if (data.email) score += 4;
  if (data.name) score += 3;

  score = Math.max(20, Math.min(99, Math.round(score)));

  const tier: LeadTier =
    score >= 70 ? "strong" : score >= 48 ? "good" : "explore";

  const headline =
    tier === "strong"
      ? "You're a strong candidate 🎉"
      : tier === "good"
        ? "You've got real, workable options 👍"
        : "Let's find your best route 🌍";

  const { matchedProgram, recommendation } = resolveProgram(goal, destination);
  const lines = profileLines(data);

  const whatsappMessage = [
    `Hello ${company.shortName}! I just completed the free eligibility check on your website.`,
    "",
    `• Name: ${data.name || "—"}`,
    `• Goal: ${GOAL_LABEL[goal]}`,
    `• Destination: ${DEST_LABEL[destination]}`,
    ...lines.map((line) => `• ${line}`),
    "",
    `Suggested route: ${matchedProgram}`,
    "I'd like to talk to an advisor about the next steps.",
  ].join("\n");

  return {
    tier,
    score,
    headline,
    recommendation,
    matchedProgram,
    nextSteps: nextSteps(tier, goal),
    whatsappMessage,
  };
}
