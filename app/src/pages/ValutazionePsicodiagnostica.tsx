import { SectionTitle } from "../components/layout/SectionTitle";
import { LuMessagesSquare } from "react-icons/lu";
import { FaRegLightbulb } from "react-icons/fa";
import { MdChecklistRtl } from "react-icons/md";
import { IoArrowForward, IoDocumentTextOutline } from "react-icons/io5";
import { MdOutlineAccessTime } from "react-icons/md";
import { Link, useParams } from "@tanstack/react-router";

export const ValutazionePsicodiagnostica = () => {
  const { servizio } = useParams({ from: "/servizi/$servizio" });

  return (
    <>
      <SectionTitle
        text="Dettagli Servizio"
        backArrow={true}
        backArrowPath="../"
      />
      <section className="px-5 lg:px-0 mb-24">
        <div className="mb-4">
          <h2 className="mb-4">Valutazione Psicodiagnostica</h2>
          <p>
            La valutazione sarà eseguita secondo le linee guida internazionali
            con utilizzo di strumenti di ultima generazione evidence-based "Le
            prestazioni di consulenza sono affidate esclusivamente a figure
            professionali in possesso del titolo di Psicologo Psicoterapeuta con
            comprovata competenza nell'ambito della psicodiagnostica clinica e
            del management terapeutico. L'iter valutativo si avvale di
            metodologie evidence-based per garantire l'accuratezza del profilo
            diagnostico e la coerenza del progetto d'intervento grazie anche
            all'utilizzo anche di batterie di test standardizzate. La competenza
            clinica certificata assicura una diagnosi differenziale rigorosa e
            la formulazione di un piano di trattamento orientato all'efficacia.
            Un percorso strutturato volto a definire il funzionamento cognitivo
            attraverso la valutazione clinica e l'utilizzo di strumenti
            standardizzati.
          </p>
        </div>
        <div className="mb-6">
          <h3 className="text-heading my-6 lg:my-10">
            Cosa comprende il percorso
          </h3>
          <div className="flex flex-col space-y-6 lg:space-y-10"></div>
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
