import type { Stat } from "../types";

/**
 * Headline figures. "100+ countries" comes from WEIS's own positioning; the
 * others are placeholders — replace with the client's audited numbers before
 * launch (see README).
 */
export const stats: Stat[] = [
  { id: "countries", value: 100, suffix: "+", label: "Countries covered" },
  {
    id: "programs",
    value: 500,
    suffix: "+",
    label: "Programmes & partner institutions",
  },
  {
    id: "malaysia",
    value: 25,
    suffix: "+",
    label: "Malaysia approvals · 2026 intake",
  },
  { id: "services", value: 4, suffix: "", label: "Core service pillars" },
];
