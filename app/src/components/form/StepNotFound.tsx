import { Link } from "@tanstack/react-router";
import { FiArrowRight } from "react-icons/fi";

export const StepNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
      <p className="text-xs text-primary font-medium uppercase tracking-widest">
        Pagina non trovata
      </p>
      <h2 className="font-garamond text-3xl text-heading">
        Questo step <em className="italic text-primary">non esiste</em>
      </h2>
      <p className="text-sm text-text-muted">
        Torna al primo step per ricominciare.
      </p>
      <Link to="/prenota/servizio" className="... flex items-center gap-1.5">
        <span>Ricomincia</span>
        <FiArrowRight size={16} />
      </Link>
    </div>
  );
};
