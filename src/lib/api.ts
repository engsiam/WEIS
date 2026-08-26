import type { EnquiryFormData, LeadData, LeadResult } from "../types";

/**
 * Qualified-lead payload sent to the leads endpoint. Combines the visitor's
 * answers with the computed eligibility result so the CRM receives a
 * ready-to-act, pre-scored lead.
 */
export interface LeadPayload extends LeadData {
  result: LeadResult;
  submittedAt: string;
  source: string;
}

export async function submitLead(payload: LeadPayload): Promise<void> {
  const endpoint = import.meta.env.VITE_LEAD_ENDPOINT;

  if (endpoint) {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Lead submission failed with status ${response.status}`);
    }
  }
}

export async function submitEnquiry(payload: EnquiryFormData): Promise<void> {
  const endpoint = import.meta.env.VITE_ENQUIRY_ENDPOINT;

  if (endpoint) {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(
        `Enquiry submission failed with status ${response.status}`
      );
    }
  }
}
