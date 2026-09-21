import { Link } from "@tanstack/react-router";
import { StatCard } from "../StatCard";
import { FaArrowRight, FaArrowDown } from "react-icons/fa";
import logo from "../../../assets/Illustrazione_HeroSection_PNG.png";

export const Hero = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);

    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative mt-[77.66px] flex min-h-[calc(100svh-72px)] flex-col overflow-hidden bg-bg p-0">
      <div className="absolute inset-x-0 bottom-0 h-px bg-border" />
      <div className="landing-shell relative grid flex-1 items-center gap-10 py-14 lg:grid-cols-[1fr_0.82fr] lg:py-20 xl:gap-16">
        <div className="fadeUp max-w-3xl">
          <span className="landing-kicker mb-5 inline-flex items-center gap-3 before:h-px before:w-10 before:bg-primary">
            Psicologia - Benessere - Crescita
          </span>
          <h1 className="font-garamond text-[clamp(2.8rem,7vw,6rem)] font-medium leading-tight text-text">
            Ogni percorso
            <br />
            inizia con <em className="text-primary">un passo</em>
            <br />
            verso te stesso
          </h1>
          <p className="mt-6 max-w-2xl text-[clamp(1rem,1.8vw,1.15rem)] leading-relaxed text-text-muted">
            Un luogo sicuro dove esplorare, comprendere e trasformare. Insieme
            costruiamo gli strumenti per affrontare la vita con maggiore
            consapevolezza.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              to="/prenota/servizio"
              className="soft-button inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-[0.9rem] font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-dark"
            >
              Prenota una consulenza
              <FaArrowRight size={14} />
            </Link>
            <button
              onClick={() => scrollToSection("chi-siamo")}
              className="inline-flex cursor-pointer items-center justify-center gap-2 px-5 py-4 text-[0.9rem] font-medium text-text-muted hover:text-primary"
            >
              Scopri di più
              <FaArrowDown size={14} />
            </button>
          </div>
        </div>

        <div className="fadeIn relative hidden min-h-[560px] items-center justify-center lg:flex">
          <div className="absolute inset-y-8 left-8 right-0 rounded-3xl border border-border bg-white" />
          <div className="absolute right-0 top-10 h-24 w-24 rounded-full bg-primary-xlight" />
          <img
            src={logo}
            alt=""
            className="relative z-10 max-h-[560px] w-full object-contain"
          />
        </div>
      </div>

      <div className="border-t border-border bg-white/80">
        <div className="landing-shell grid grid-cols-1 sm:grid-cols-3">
          <StatCard heading="18+" desc="anni di esperienza" />
          <StatCard heading="500+" desc="pazienti seguiti" />
          <StatCard heading="98%" desc="soddisfazione" />
        </div>
      </div>
    </section>
  );
};
