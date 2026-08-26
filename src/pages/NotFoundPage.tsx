import { Compass, Home } from "lucide-react";
import { useAppStore } from "../store/useAppStore";
import { Button } from "../components/ui/Button";
import { Container } from "../components/ui/Container";

export function NotFoundPage() {
  const openLeadModal = useAppStore((state) => state.openLeadModal);

  return (
    <section className="relative grid min-h-[100svh] place-items-center overflow-hidden bg-navy py-28 text-center text-white">
      <div className="world-dots absolute inset-0 opacity-50" aria-hidden="true" />
      <div
        className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-crimson/20 blur-[140px]"
        aria-hidden="true"
      />

      <Container size="narrow" className="relative z-10">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-white/15 bg-white/5">
          <Compass className="h-8 w-8 text-gold" strokeWidth={1.5} />
        </span>

        <p className="mt-8 font-display text-7xl font-extrabold leading-none sm:text-8xl">
          <span className="bg-gradient-to-r from-crimson-soft via-gold-soft to-royal-soft bg-clip-text text-transparent">
            404
          </span>
        </p>

        <h1 className="mt-5 font-display text-2xl font-bold sm:text-3xl">
          This page has wandered off the map
        </h1>
        <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-mist">
          The page you're looking for doesn't exist or has moved. Let's get you
          back on route to your destination abroad.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button variant="gold" size="lg" href="/" className="w-full sm:w-auto">
            <Home className="h-5 w-5" /> Back to home
          </Button>
          <Button
            variant="outline-light"
            size="lg"
            onClick={openLeadModal}
            className="w-full sm:w-auto"
          >
            Free eligibility check
          </Button>
        </div>
      </Container>
    </section>
  );
}
