import { Link } from "@tanstack/react-router";
import { FaArrowRight } from "react-icons/fa";

export const FooterCTA = () => {
  return (
    <section
      className="border-b border-border bg-primary text-center text-white"
      id="contact-us"
    >
      <div className="landing-shell">
        <span className="mb-5 block text-xs font-medium uppercase tracking-widest text-blue-light">
          Contattaci
        </span>
        <h2 className="mx-auto max-w-3xl font-garamond leading-snug text-white">
          Il cambiamento inizia oggi
        </h2>
        <p className="mx-auto mt-5 mb-8 max-w-xl text-base leading-relaxed text-white-rgba">
          La prima consulenza è gratuita. Parlaci senza impegno.
        </p>
        <Link
          to="/prenota/servizio"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-9 py-4 text-sm font-medium text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-bg"
        >
          Scrivici ora
          <FaArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
};
