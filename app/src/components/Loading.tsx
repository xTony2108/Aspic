import { useEffect, useState } from "react";
import logo from "../assets/logo_aspic.svg";

export const Loading = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "" : d + "."));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-off-white flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary opacity-10 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-primary opacity-5 blur-[80px] pointer-events-none" />

      <div className="w-full max-w-sm relative z-10 flex flex-col items-center text-center gap-6">
        <img src={logo} alt="Logo ASPIC" className="h-10" />

        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-grey border-t-primary rounded-full animate-spin" />
          <p className="font-garamond text-2xl font-light text-charcoal">
            Caricamento<span className="text-primary">{dots}</span>
          </p>
          <p className="text-sm font-light text-text-muted">
            Un momento per favore
          </p>
        </div>

        <p className="text-xs text-text-muted">
          © {new Date().getFullYear()} ASPIC Psicologia Reggio Calabria
        </p>
      </div>
    </div>
  );
};
