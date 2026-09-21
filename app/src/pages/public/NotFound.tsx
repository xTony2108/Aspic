import { Link } from "@tanstack/react-router";
import logo from "../../assets/logo_aspic.svg";

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-off-white flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary opacity-10 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-primary opacity-5 blur-[80px] pointer-events-none" />

      <div className="w-full max-w-sm relative z-10 flex flex-col items-center text-center gap-6">
        <img src={logo} alt="Logo ASPIC" className="h-10" />

        <div>
          <p className="text-primary text-xs font-medium tracking-widest uppercase mb-3">
            Errore 404
          </p>
          <h1 className="font-garamond text-5xl text-charcoal mb-3">
            Pagina <em className="italic text-primary">non trovata</em>
          </h1>
          <p className="text-sm text-text-muted leading-relaxed">
            La pagina che stai cercando non esiste o è stata spostata.
          </p>
        </div>

        <Link
          to="/dashboard/richieste"
          className="bg-primary text-white text-sm font-medium px-6 py-3 rounded-xl transition-all duration-200 hover:bg-text hover:-translate-y-px"
        >
          Indietro
        </Link>

        <p className="text-xs text-text-muted">
          © {new Date().getFullYear()} ASPIC Psicologia Reggio Calabria
        </p>
      </div>
    </div>
  );
};
