import { SectionTitle } from "../components/layout/SectionTitle";
import { IoArrowForward } from "react-icons/io5";
import { Link, useParams } from "@tanstack/react-router";

export const ConsulenzaPsicologica = () => {
  const { servizio } = useParams({ from: "/servizi/$servizio" });
  return (
    <>
      <SectionTitle
        text="Dettagli Servizio"
        backArrow={true}
        backArrowPath="../"
      />
      <section
        className="px-5 lg:px-0 mb-24"
        aria-labelledby="consulenza-heading"
      >
        <div className="mb-6">
          <h2 className="mb-4">Prima Consulenza Psicologica Individuale</h2>
          <p>
            La consulenza sarà eseguita da psicologi psicoterapeuti con
            comprovata esperienza clinico/diagnostica
          </p>
        </div>
        <div className="mb-6">
          <h3 className="text-heading my-6 lg:my-10">Informazioni</h3>
        </div>
      </section>
      <div className="fixed right-0 left-0 bottom-0 bg-bg border-t border-borderDefault py-5">
        <div className="max-w-7xl mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl px-5 lg:px-0">
          <Link
            className="leading-tight bg-primary text-white font-bold py-4 text-center rounded-xl active:translate-y-0.5 transition-all flex items-center justify-center gap-2 w-full"
            to="/servizi/$servizio/richiesta-colloquio/informazioni"
            params={{ servizio: servizio }}
          >
            Prossimo Passaggio
            <IoArrowForward size={19} />
          </Link>
        </div>
      </div>
    </>
  );
};
