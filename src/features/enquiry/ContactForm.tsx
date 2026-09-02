import { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle2, Loader2, MessageCircle, Send } from "lucide-react";
import { cn, buildWhatsAppUrl } from "../../lib/utils";
import { submitEnquiry } from "../../lib/api";
import { EASE_OUT_EXPO } from "../../lib/motion";
import { Button } from "../../components/ui/Button";
import type { EnquiryFormData, EnquiryFormErrors } from "../../types";
import { validateEnquiry } from "./validation";

const EMPTY: EnquiryFormData = {
  name: "",
  email: "",
  phone: "",
  service: "",
  destination: "",
  message: "",
};

const SERVICE_OPTIONS = [
  "Study Abroad",
  "Work Visa",
  "IELTS",
  "Tours & Visit Visa",
  "Not sure yet",
];

const DESTINATION_OPTIONS = [
  "Canada",
  "Australia",
  "United Kingdom",
  "United States",
  "Malaysia",
  "Europe",
  "UAE / Dubai",
  "Other / Undecided",
];

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass = (hasError: boolean) =>
  cn(
    "h-12 w-full rounded-xl border bg-white px-4 text-sm text-ink outline-none transition-colors placeholder:text-mist-dim focus:border-crimson",
    hasError ? "border-crimson" : "border-line"
  );

export function ContactForm() {
  const [data, setData] = useState<EnquiryFormData>(EMPTY);
  const [errors, setErrors] = useState<EnquiryFormErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  const update = (patch: Partial<EnquiryFormData>) =>
    setData((current) => ({ ...current, ...patch }));

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const validationErrors = validateEnquiry(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setStatus("submitting");
    try {
      await submitEnquiry(data);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    const summary = buildWhatsAppUrl(
      `Hello WEIS! I just sent an enquiry from your website.\n\n• Name: ${data.name}\n• Service: ${data.service}${
        data.destination ? `\n• Destination: ${data.destination}` : ""
      }\n\n${data.message}`
    );
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
        className="flex flex-col items-center rounded-2xl bg-cloud/60 p-6 text-center sm:p-8"
      >
        <span className="grid h-14 w-14 place-items-center rounded-full bg-crimson/10 text-crimson">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <h3 className="mt-4 font-display text-xl font-bold text-ink">
          Thank you, {data.name.split(" ")[0] || "there"}!
        </h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate">
          Your enquiry has reached the WEIS team. An advisor will get back to you
          shortly. For a faster reply, message us on WhatsApp.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Button
            href={summary}
            target="_blank"
            rel="noopener noreferrer"
            variant="crimson"
          >
            <MessageCircle className="h-4 w-4" /> Continue on WhatsApp
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setData(EMPTY);
              setStatus("idle");
            }}
          >
            Send another enquiry
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-ink">
            Full name
          </span>
          <input
            className={fieldClass(Boolean(errors.name))}
            value={data.name}
            onChange={(event) => update({ name: event.target.value })}
            placeholder="Your name"
            name="name"
          />
          {errors.name && (
            <span className="mt-1 block text-xs font-medium text-crimson">
              {errors.name}
            </span>
          )}
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-ink">
            Phone / WhatsApp
          </span>
          <input
            className={fieldClass(Boolean(errors.phone))}
            value={data.phone}
            onChange={(event) => update({ phone: event.target.value })}
            placeholder="01XXXXXXXXX"
            type="tel"
            inputMode="tel"
            name="phone"
          />
          {errors.phone && (
            <span className="mt-1 block text-xs font-medium text-crimson">
              {errors.phone}
            </span>
          )}
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-ink">
            Email (optional)
          </span>
          <input
            className={fieldClass(Boolean(errors.email))}
            value={data.email}
            onChange={(event) => update({ email: event.target.value })}
            placeholder="you@example.com"
            type="email"
            inputMode="email"
            name="email"
          />
          {errors.email && (
            <span className="mt-1 block text-xs font-medium text-crimson">
              {errors.email}
            </span>
          )}
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-ink">
            Service
          </span>
          <select
            className={cn(fieldClass(Boolean(errors.service)), "appearance-none")}
            value={data.service}
            onChange={(event) => update({ service: event.target.value })}
            name="service"
          >
            <option value="">Select a service…</option>
            {SERVICE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.service && (
            <span className="mt-1 block text-xs font-medium text-crimson">
              {errors.service}
            </span>
          )}
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-semibold text-ink">
            Preferred destination (optional)
          </span>
          <select
            className={cn(fieldClass(false), "appearance-none")}
            value={data.destination}
            onChange={(event) => update({ destination: event.target.value })}
            name="destination"
          >
            <option value="">No preference yet</option>
            {DESTINATION_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-semibold text-ink">
            How can we help?
          </span>
          <textarea
            className={cn(
              "min-h-[120px] w-full rounded-xl border bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-mist-dim focus:border-crimson",
              errors.message ? "border-crimson" : "border-line"
            )}
            value={data.message}
            onChange={(event) => update({ message: event.target.value })}
            placeholder="Tell us your goal, background and any deadlines…"
            name="message"
          />
          {errors.message && (
            <span className="mt-1 block text-xs font-medium text-crimson">
              {errors.message}
            </span>
          )}
        </label>
      </div>

      {status === "error" && (
        <p className="mt-4 rounded-xl border border-crimson/30 bg-crimson/5 px-4 py-3 text-sm text-crimson-deep">
          Something went wrong sending your enquiry. Please try again, or reach
          us directly on WhatsApp.
        </p>
      )}

      <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row-reverse sm:justify-start sm:gap-4">
        <Button
          type="submit"
          variant="crimson"
          size="lg"
          disabled={status === "submitting"}
          className="w-full shrink-0 whitespace-nowrap sm:w-auto"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Sending…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" /> Send enquiry
            </>
          )}
        </Button>
        <p className="text-center text-xs text-slate sm:text-left">
          We reply within one business day · your details stay private.
        </p>
      </div>
    </form>
  );
}
