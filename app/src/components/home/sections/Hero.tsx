import { Link } from "@tanstack/react-router";
import { StatCard } from "../StatCard";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import logo from "../../../assets/Illustrazione_HeroSection_PNG.png";

export const Hero = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);

    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section className="mt-[77.66px] relative min-h-[calc(100svh-72px)] flex p-0 flex-col">
      <div className="relative flex flex-col xl:grid xl:grid-cols-2 grow">
        <div className="flex flex-col justify-center px-10 pt-16 pb-12 lg:px-10 xl:px-16 xl:py-24 flex-1 row-start-1 fadeUp">
          <span className="before:content-[''] before:w-5 before:h-px before:bg-primary inline-flex items-center gap-2 text-xs font-medium tracking-[.18em] text-primary mb-5 uppercase">
            Psicologia • Benessere • Crescita
          </span>
          <h1 className="font-garamond font-light leading-[1.1] tracking-[-0.01em] text-text mb-5">
            Ogni percorso
            <br />
            inizia con <em className="text-primary">un passo</em>
            <br />
            verso te stesso
          </h1>
          <p className="mb-8 max-w-150">
            Un luogo sicuro dove esplorare, comprendere e trasformare. Insieme
            costruiamo gli strumenti per affrontare la vita con maggiore
            consapevolezza.
          </p>
          <div className="flex flex-col gap-3 lg:flex-row">
            <Link
              to="/prenota/servizio"
              className="bg-primary text-white py-4 px-6 inline-flex items-center justify-center rounded-4xl -tracking-tight font-medium cursor-pointer gap-2 hover:bg-text hover:-translate-y-0.5 hover:drop-shadow-2xl hover:drop-shadow-[rgba(36,57,120,0.25)] transition-all duration-300 ease-in select-none"
            >
              Prenota una consulenza
              <FaArrowRight size={14} />
            </Link>
            <button
              onClick={() => scrollToSection("chi-siamo")}
              className="flex items-center gap-2 text-text-muted text-sm font-normal self-center cursor-pointer"
            >
              Scopri di più
              <FaArrowDown size={14} />
            </button>
          </div>
        </div>
        <div className="hidden xl:flex lg:items-center lg:justify-center flex-1 fadeIn col-span-1 shrink-0">
          <img src={logo} alt="" className="shrink-0" />
        </div>
      </div>
      <div className="flex border-t border-border text-g row-start-2 fadeUp">
        <StatCard heading="18+" desc="anni di esperienza" />
        <StatCard heading="500+" desc="pazienti seguiti" />
        <StatCard heading="98%" desc="soddisfazione" />
      </div>
    </section>
  );
};
