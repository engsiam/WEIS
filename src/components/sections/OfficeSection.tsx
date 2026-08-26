import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { contact } from "../../data/company";
import { fadeUp, staggerParent } from "../../lib/motion";
import { motion } from "motion/react";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { SectionLabel } from "../ui/SectionLabel";

const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  "House 54/A, Road-133, Gulshan-1, Dhaka 1212, Bangladesh"
)}`;

/**
 * "Visit our office" — a trust anchor for the business (§ final journey).
 * Real address, hours, one-tap call and turn-by-turn directions.
 */
export function OfficeSection() {
  return (
    <section
      id="office"
      className="relative overflow-hidden bg-navy py-20 text-white sm:py-24"
    >
      <div className="grid-lines absolute inset-0 opacity-50" aria-hidden="true" />
      <div
        className="animate-drift-slow absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-royal/25 blur-[130px]"
        aria-hidden="true"
      />

      <Container size="default" className="relative z-10">
        <motion.div
          variants={staggerParent(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid items-center gap-12 lg:grid-cols-[1fr_0.9fr]"
        >
          {/* Copy */}
          <div>
            <motion.span variants={fadeUp}>
              <SectionLabel tone="dark">Visit us · Gulshan-1</SectionLabel>
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="mt-5 font-display text-3xl font-extrabold leading-[1.08] tracking-tight sm:text-4xl"
            >
              Walk in for a{" "}
              <span className="bg-gradient-to-r from-gold-soft to-gold bg-clip-text text-transparent">
                free consultation
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-lg text-base leading-relaxed text-mist"
            >
              Sit down with a senior advisor, review your profile face-to-face and
              leave with a clear written plan — no pressure, no obligation.
            </motion.p>

            <motion.ul
              variants={fadeUp}
              className="mt-8 flex flex-col gap-5"
            >
              <li className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/15 bg-white/5">
                  <MapPin className="h-5 w-5 text-crimson-soft" />
                </span>
                <span>
                  <span className="block text-xs font-bold uppercase tracking-[0.14em] text-mist-dim">
                    Office
                  </span>
                  <span className="mt-0.5 block font-medium">
                    {contact.address}
                  </span>
                </span>
              </li>
              <li className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/15 bg-white/5">
                  <Clock className="h-5 w-5 text-gold-soft" />
                </span>
                <span>
                  <span className="block text-xs font-bold uppercase tracking-[0.14em] text-mist-dim">
                    Hours
                  </span>
                  <span className="mt-0.5 block font-medium">{contact.hours}</span>
                </span>
              </li>
              <li className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/15 bg-white/5">
                  <Phone className="h-5 w-5 text-royal-soft" />
                </span>
                <span>
                  <span className="block text-xs font-bold uppercase tracking-[0.14em] text-mist-dim">
                    Call ahead
                  </span>
                  <a
                    href={`tel:${contact.phoneIntl}`}
                    className="mt-0.5 block font-medium transition-colors hover:text-gold-soft"
                  >
                    {contact.phone}
                  </a>
                </span>
              </li>
            </motion.ul>

            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button
                variant="crimson"
                size="lg"
                href={DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full justify-center px-7 sm:w-auto"
              >
                <Navigation className="h-5 w-5" /> Get directions
              </Button>
              <Button
                variant="outline-light"
                size="lg"
                onClick={() => {
                  window.location.href = `tel:${contact.phoneIntl}`;
                }}
                className="w-full justify-center px-7 sm:w-auto"
              >
                <Phone className="h-5 w-5" /> Call the office
              </Button>
            </motion.div>
          </div>

          {/* Map card */}
          <motion.div variants={fadeUp} className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-crimson/25 via-transparent to-gold/25 opacity-60 blur-xl"
            />
            <div className="relative overflow-hidden rounded-3xl border border-white/15 shadow-panel">
              <iframe
                title="WEIS office location — Gulshan-1, Dhaka"
                src="https://www.google.com/maps?q=House%2054%2FA%2C%20Road-133%2C%20Gulshan-1%2C%20Dhaka%201212%2C%20Bangladesh&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[22rem] w-full grayscale-[35%] transition-all duration-700 hover:grayscale-0 sm:h-[26rem] lg:h-[30rem]"
                allowFullScreen
              />
              <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-navy/80 to-transparent px-5 py-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-navy/70 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-gold-soft backdrop-blur">
                  <MapPin className="h-3.5 w-3.5 text-crimson-soft" /> WEIS HQ
                </span>
                <span className="text-xs font-semibold text-mist">
                  Gulshan-1 · Dhaka
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
