import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import type { Variants } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Loader2,
  MessageCircle,
  RotateCcw,
  Sparkles,
  X,
} from "lucide-react";
import { useAppStore } from "../../store/useAppStore";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import { usePresence } from "../../hooks/usePresence";
import { EASE_OUT_EXPO } from "../../lib/motion";
import { buildWhatsAppUrl, cn, scrollToSection } from "../../lib/utils";
import { submitLead } from "../../lib/api";
import {
  ageOptions,
  cgpaOptions,
  destinationOptions,
  educationOptions,
  englishOptions,
  experienceOptions,
  goalOptions,
  monthOptions,
  travelWithOptions,
} from "../../data/lead";
import { Button } from "../../components/ui/Button";
import { Logo } from "../../components/ui/Logo";
import type { LeadData, LeadErrors, LeadResult, LeadTier } from "../../types";
import { scoreLead } from "./scoring";
import { LEAD_STEPS, validateLeadStep } from "./validation";
import type { LeadStepId } from "./validation";

const EMPTY_LEAD: LeadData = {
  goal: "",
  destination: "",
  education: "",
  cgpa: "",
  english: "",
  field: "",
  experience: "",
  age: "",
  travelWith: "",
  month: "",
  name: "",
  phone: "",
  email: "",
};

const STEP_META: Record<LeadStepId, { title: string; hint: string }> = {
  goal: {
    title: "What's your goal?",
    hint: "Tell us what you'd like to do abroad.",
  },
  destination: {
    title: "Where do you want to go?",
    hint: "Pick a destination — or choose “Not sure yet”.",
  },
  profile: {
    title: "A quick bit about you",
    hint: "This helps us match the right route.",
  },
  contact: {
    title: "Where should we send it?",
    hint: "Get your result + a free consultation.",
  },
};

const TIER_STYLE: Record<
  LeadTier,
  { badge: string; bar: string; label: string }
> = {
  strong: {
    badge: "border-gold/40 bg-gold/15 text-amber",
    bar: "bg-gold",
    label: "Strong match",
  },
  good: {
    badge: "border-royal/25 bg-royal/10 text-royal",
    bar: "bg-royal",
    label: "Good match",
  },
  explore: {
    badge: "border-line bg-cloud text-slate",
    bar: "bg-mist-dim",
    label: "Worth exploring",
  },
};

const stepVariants: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 44 : -44 }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.36, ease: EASE_OUT_EXPO },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -44 : 44,
    transition: { duration: 0.24, ease: "easeIn" },
  }),
};

/* ── Small building blocks ────────────────────────────────────────── */

interface ChipGroupProps {
  label: string;
  options: string[];
  value: string;
  onSelect: (value: string) => void;
  error?: string;
}

function ChipGroup({ label, options, value, onSelect, error }: ChipGroupProps) {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-ink">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = value === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onSelect(option)}
              aria-pressed={selected}
              className={cn(
                "rounded-full border px-3.5 py-2 text-sm font-medium transition-colors",
                selected
                  ? "border-crimson bg-crimson/5 text-crimson"
                  : "border-line bg-white text-slate hover:border-mist"
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
      {error && (
        <p className="mt-1.5 text-xs font-medium text-crimson">{error}</p>
      )}
    </div>
  );
}

interface LabeledInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  inputMode?: "text" | "tel" | "email" | "numeric";
  list?: string;
  name?: string;
}

function LabeledInput({
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  inputMode,
  list,
  name,
}: LabeledInputProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        list={list}
        name={name}
        className={cn(
          "h-12 w-full rounded-xl border bg-white px-4 text-sm text-ink outline-none transition-colors placeholder:text-mist-dim focus:border-crimson",
          error ? "border-crimson" : "border-line"
        )}
      />
      {error && (
        <span className="mt-1 block text-xs font-medium text-crimson">
          {error}
        </span>
      )}
    </label>
  );
}

/* ── The wizard (mounted only while open, so state resets cleanly) ─── */

function LeadModalInner({
  show,
  onClose,
  onExited,
}: {
  show: boolean;
  onClose: () => void;
  onExited: () => void;
}) {
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<LeadData>(EMPTY_LEAD);
  const [errors, setErrors] = useState<LeadErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<LeadResult | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const step = LEAD_STEPS[stepIndex];
  const isLastStep = stepIndex === LEAD_STEPS.length - 1;

  useLockBodyScroll(true);

  useEffect(() => {
    const timer = window.setTimeout(() => panelRef.current?.focus(), 50);
    return () => window.clearTimeout(timer);
  }, []);

  // Esc to close + focus trap
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const root = panelRef.current;
      if (!root) return;
      const focusables = root.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const update = (patch: Partial<LeadData>) =>
    setData((current) => ({ ...current, ...patch }));

  /** Select + auto-advance (used for the single-choice goal & destination steps). */
  const pick = (patch: Partial<LeadData>) => {
    update(patch);
    setErrors({});
    setDirection(1);
    window.setTimeout(
      () => setStepIndex((index) => Math.min(LEAD_STEPS.length - 1, index + 1)),
      200
    );
  };

  const handleSubmit = async () => {
    const stepErrors = validateLeadStep("contact", data);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setSubmitting(true);
    const computed = scoreLead(data);
    try {
      await submitLead({
        ...data,
        result: computed,
        submittedAt: new Date().toISOString(),
        source: "eligibility-wizard",
      });
    } catch {
      // The leads endpoint is optional — always show the visitor their result.
    }
    setSubmitting(false);
    setResult(computed);
  };

  const goNext = () => {
    const stepErrors = validateLeadStep(step, data);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    if (isLastStep) {
      void handleSubmit();
      return;
    }
    setDirection(1);
    setStepIndex((index) => index + 1);
  };

  const goBack = () => {
    setErrors({});
    setDirection(-1);
    setStepIndex((index) => Math.max(0, index - 1));
  };

  const restart = () => {
    setResult(null);
    setData(EMPTY_LEAD);
    setErrors({});
    setDirection(-1);
    setStepIndex(0);
  };

  const progress = result
    ? 100
    : Math.round(((stepIndex + 1) / LEAD_STEPS.length) * 100);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: show ? 1 : 0 }}
      transition={{ duration: 0.25 }}
    >
      <div
        className="absolute inset-0 bg-navy/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <motion.div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-modal-title"
        className="relative z-10 flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl bg-paper shadow-panel outline-none"
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={
          show
            ? { opacity: 1, scale: 1, y: 0 }
            : { opacity: 0, scale: 0.97, y: 8 }
        }
        transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
        onAnimationComplete={() => {
          if (!show) onExited();
        }}
      >
        <div className="h-1.5 w-full bg-gradient-to-r from-crimson via-gold to-royal" />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-6 pt-5">
          <div className="flex items-center gap-3">
            <Logo tone="light" showText={false} />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-crimson">
                {result ? "Your result" : "Free eligibility check"}
              </p>
              <p className="text-[0.7rem] text-slate">
                {result ? "Personalised for you" : "Takes under a minute"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid h-9 w-9 place-items-center rounded-full border border-line text-slate transition-colors hover:border-crimson hover:text-crimson"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Progress */}
        <div className="px-6 pt-4">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-cloud">
            <div
              className="h-full rounded-full bg-crimson transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          {!result && (
            <p className="mt-2 text-xs font-medium text-slate">
              Step {stepIndex + 1} of {LEAD_STEPS.length}
            </p>
          )}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 pb-6 pt-5">
          {result ? (
            <LeadResultView
              result={result}
              onClose={onClose}
              onRestart={restart}
            />
          ) : (
              <motion.div
                key={step}
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
              >
                <h3
                  id="lead-modal-title"
                  className="font-display text-xl font-bold text-ink sm:text-2xl"
                >
                  {STEP_META[step].title}
                </h3>
                <p className="mt-1 text-sm text-slate">{STEP_META[step].hint}</p>

                <div className="mt-5">
                  {step === "goal" && (
                    <>
                      <div className="grid grid-cols-2 gap-3">
                        {goalOptions.map((option) => {
                          const Icon = option.icon;
                          const selected = data.goal === option.value;
                          return (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => pick({ goal: option.value })}
                              aria-pressed={selected}
                              className={cn(
                                "flex flex-col items-start gap-2 rounded-2xl border p-4 text-left transition-all",
                                selected
                                  ? "border-crimson bg-crimson/5 shadow-card"
                                  : "border-line bg-white hover:-translate-y-0.5 hover:border-mist"
                              )}
                            >
                              <span
                                className={cn(
                                  "flex h-10 w-10 items-center justify-center rounded-xl",
                                  selected
                                    ? "bg-crimson text-white"
                                    : "bg-cloud text-navy"
                                )}
                              >
                                {Icon && <Icon className="h-5 w-5" />}
                              </span>
                              <span className="font-display text-base font-bold text-ink">
                                {option.label}
                              </span>
                              <span className="text-xs text-slate">
                                {option.description}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      {errors.goal && (
                        <p className="mt-2 text-xs font-medium text-crimson">
                          {errors.goal}
                        </p>
                      )}
                    </>
                  )}

                  {step === "destination" && (
                    <>
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {destinationOptions.map((option) => {
                          const selected = data.destination === option.value;
                          return (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() =>
                                pick({ destination: option.value })
                              }
                              aria-pressed={selected}
                              className={cn(
                                "flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition-all",
                                selected
                                  ? "border-crimson bg-crimson/5 shadow-card"
                                  : "border-line bg-white hover:-translate-y-0.5 hover:border-mist"
                              )}
                            >
                              <span className="text-2xl" aria-hidden="true">
                                {option.flag}
                              </span>
                              <span className="text-sm font-semibold text-ink">
                                {option.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      {errors.destination && (
                        <p className="mt-2 text-xs font-medium text-crimson">
                          {errors.destination}
                        </p>
                      )}
                    </>
                  )}

                  {step === "profile" && (
                    <div className="flex flex-col gap-5">
                      {data.goal === "study" && (
                        <>
                          <ChipGroup
                            label="Highest education"
                            options={educationOptions}
                            value={data.education}
                            onSelect={(value) => update({ education: value })}
                            error={errors.education}
                          />
                          <ChipGroup
                            label="Last CGPA / result"
                            options={cgpaOptions}
                            value={data.cgpa}
                            onSelect={(value) => update({ cgpa: value })}
                            error={errors.cgpa}
                          />
                          <ChipGroup
                            label="English test?"
                            options={englishOptions}
                            value={data.english}
                            onSelect={(value) => update({ english: value })}
                            error={errors.english}
                          />
                        </>
                      )}

                      {data.goal === "work" && (
                        <>
                          <LabeledInput
                            label="Your field / trade (optional)"
                            value={data.field}
                            onChange={(value) => update({ field: value })}
                            placeholder="e.g. Electrician, Chef, Driver"
                            list="weis-fields"
                          />
                          <datalist id="weis-fields">
                            {[
                              "Restaurant",
                              "Electrician",
                              "Construction",
                              "Cleaner",
                              "Factory worker",
                              "Driver",
                              "Gardening",
                            ].map((field) => (
                              <option key={field} value={field} />
                            ))}
                          </datalist>
                          <ChipGroup
                            label="Years of experience"
                            options={experienceOptions}
                            value={data.experience}
                            onSelect={(value) => update({ experience: value })}
                            error={errors.experience}
                          />
                        </>
                      )}

                      {data.goal === "migrate" && (
                        <>
                          <ChipGroup
                            label="Your age group"
                            options={ageOptions}
                            value={data.age}
                            onSelect={(value) => update({ age: value })}
                            error={errors.age}
                          />
                          <ChipGroup
                            label="Highest education"
                            options={educationOptions}
                            value={data.education}
                            onSelect={(value) => update({ education: value })}
                            error={errors.education}
                          />
                          <ChipGroup
                            label="Work experience"
                            options={experienceOptions}
                            value={data.experience}
                            onSelect={(value) => update({ experience: value })}
                            error={errors.experience}
                          />
                        </>
                      )}

                      {data.goal === "tour" && (
                        <>
                          <ChipGroup
                            label="Who's travelling?"
                            options={travelWithOptions}
                            value={data.travelWith}
                            onSelect={(value) => update({ travelWith: value })}
                            error={errors.travelWith}
                          />
                          <ChipGroup
                            label="When do you want to travel?"
                            options={monthOptions}
                            value={data.month}
                            onSelect={(value) => update({ month: value })}
                            error={errors.month}
                          />
                        </>
                      )}
                    </div>
                  )}

                  {step === "contact" && (
                    <div className="flex flex-col gap-4">
                      <LabeledInput
                        label="Full name"
                        value={data.name}
                        onChange={(value) => update({ name: value })}
                        error={errors.name}
                        placeholder="Your name"
                        name="name"
                      />
                      <LabeledInput
                        label="Phone / WhatsApp"
                        value={data.phone}
                        onChange={(value) => update({ phone: value })}
                        error={errors.phone}
                        placeholder="01XXXXXXXXX"
                        type="tel"
                        inputMode="tel"
                        name="phone"
                      />
                      <LabeledInput
                        label="Email (optional)"
                        value={data.email}
                        onChange={(value) => update({ email: value })}
                        error={errors.email}
                        placeholder="you@example.com"
                        type="email"
                        inputMode="email"
                        name="email"
                      />
                      <p className="text-xs leading-relaxed text-slate">
                        By continuing you agree to be contacted by WEIS about
                        your enquiry. We never share your details.
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
          )}
        </div>

        {/* Footer (wizard only) */}
        {!result && (
          <div className="flex items-center justify-between gap-3 border-t border-line px-6 py-4">
            {stepIndex > 0 ? (
              <button
                type="button"
                onClick={goBack}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate transition-colors hover:text-ink"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
            ) : (
              <span className="text-xs text-mist-dim">100% free · no spam</span>
            )}

            <Button
              variant="crimson"
              onClick={goNext}
              disabled={submitting}
              className="min-w-[140px]"
            >
              {isLastStep ? (
                submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Checking…
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" /> See my result
                  </>
                )
              ) : (
                <>
                  Continue <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ── Result view ──────────────────────────────────────────────────── */

function LeadResultView({
  result,
  onClose,
  onRestart,
}: {
  result: LeadResult;
  onClose: () => void;
  onRestart: () => void;
}) {
  const tier = TIER_STYLE[result.tier];
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide",
            tier.badge
          )}
        >
          <Sparkles className="h-3.5 w-3.5" /> {tier.label}
        </span>
        <span className="text-sm font-semibold text-slate">
          Match score{" "}
          <span className="font-display text-ink">{result.score}</span>/100
        </span>
      </div>

      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-cloud">
        <motion.div
          className={cn("h-full rounded-full", tier.bar)}
          initial={{ width: 0 }}
          animate={{ width: `${result.score}%` }}
          transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.15 }}
        />
      </div>

      <h3
        id="lead-modal-title"
        className="mt-5 font-display text-2xl font-bold text-ink"
      >
        {result.headline}
      </h3>

      <div className="mt-4 rounded-2xl border border-line bg-cloud/60 p-4">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-crimson">
          Recommended for you
        </p>
        <p className="mt-1 font-display text-lg font-bold text-navy">
          {result.matchedProgram}
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-slate">
          {result.recommendation}
        </p>
      </div>

      <ul className="mt-4 flex flex-col gap-2.5">
        {result.nextSteps.map((next) => (
          <li key={next} className="flex items-start gap-2.5 text-sm text-ink">
            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-crimson/10 text-crimson">
              <Check className="h-3 w-3" />
            </span>
            {next}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-col gap-3">
        <Button
          href={buildWhatsAppUrl(result.whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          variant="crimson"
          size="lg"
          fullWidth
        >
          <MessageCircle className="h-5 w-5" /> Chat with an advisor on WhatsApp
        </Button>
        <button
          type="button"
          onClick={() => {
            onClose();
            scrollToSection("contact");
          }}
          className="text-sm font-semibold text-navy underline-offset-4 hover:underline"
        >
          Or book a free consultation
        </button>
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex items-center justify-center gap-1.5 text-xs font-medium text-mist-dim transition-colors hover:text-slate"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Start over
        </button>
      </div>
    </motion.div>
  );
}

/* ── Public component ─────────────────────────────────────────────── */

export function LeadModal() {
  const leadModalOpen = useAppStore((state) => state.leadModalOpen);
  const closeLeadModal = useAppStore((state) => state.closeLeadModal);
  const { mounted, show, onExited } = usePresence(leadModalOpen);

  if (!mounted) return null;
  return (
    <LeadModalInner show={show} onClose={closeLeadModal} onExited={onExited} />
  );
}
