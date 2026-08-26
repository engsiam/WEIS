import type { EnquiryFormData, EnquiryFormErrors } from "../../types";

function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/[^\d]/g, "");
  return (
    /^\+?[\d\s-]{7,}$/.test(phone.trim()) &&
    digits.length >= 7 &&
    digits.length <= 15
  );
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function validateEnquiry(data: EnquiryFormData): EnquiryFormErrors {
  const errors: EnquiryFormErrors = {};

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

  if (!data.service) {
    errors.service = "Please choose a service.";
  }

  if (!data.message.trim()) {
    errors.message = "Tell us briefly how we can help.";
  } else if (data.message.trim().length < 10) {
    errors.message = "A little more detail helps us help you.";
  }

  return errors;
}
