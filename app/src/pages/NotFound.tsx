import { Button } from "../components/layout/Button";

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-bg px-5 text-center flex-1">
      <h1 className="text-7xl font-extrabold text-heading mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-heading mb-2">
        Ops! Pagina non trovata
      </h2>
      <p className="text-p-small mb-6">
        La pagina che stai cercando non esiste o è stata rimossa.
      </p>
      <Button type="link" text="Torna alla Home" link="/" />
    </div>
  );
};
