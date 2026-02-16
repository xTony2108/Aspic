import { SectionTitle } from "../components/layout/SectionTitle";
import { Button } from "../components/layout/Button";
import { ServiceCard } from "../components/home/ServiceCard";
import { LuMessagesSquare } from "react-icons/lu";
import { FaRegLightbulb } from "react-icons/fa";
import { MdChecklistRtl } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { SessionDuration } from "../components/layout/SessionDuration";

export const ValutazionePsicodiagnostica = () => {
  return (
    <>
      <SectionTitle
        text="Dettaglio Consulenza"
        backArrow={true}
        backArrowPath="../"
      />
      <div className="px-5 my-4">
        <h2 className="text-3xl mb-4">Valutazione Psicodiagnostica</h2>
        <p className="text-base">
          Un percorso strutturato volto a definire il funzionamento cognitivo
          attraverso la valutazione clinica e l'utilizzo di strumenti
          standardizzati:
        </p>
        <ul className="text-p-small list-disc pl-5 mt-2">
          <li>Colloqui clinico</li>
          <li>Valutazione del funzionamento cognitivo</li>
          <li>Valutazione delle capacità adattive</li>
          <li>Relazione/Certificazione</li>
        </ul>
      </div>
      <div className="px-5 mb-6">
        <h3 className="text-p-small my-4">Cosa comprende il percorso</h3>
        <div className="flex flex-col gap-4">
          <ServiceCard
            title="Colloquio clinico"
            description="Inquadramento iniziale e raccolta anamnestica"
            fullCard={false}
            Icon={LuMessagesSquare}
          />
          <ServiceCard
            title="Scale Wechsler"
            description="Valutazione del quoziente intellettivo (QI)"
            fullCard={false}
            Icon={FaRegLightbulb}
          />
          <ServiceCard
            title="Capacità adattive"
            description="Analisi del funzionamento nel contesto quotidiano"
            fullCard={false}
            Icon={MdChecklistRtl}
          />
          <ServiceCard
            title="Relazione certificativa"
            description="Documentazione clinica e sintesi dei risultati"
            fullCard={false}
            Icon={IoDocumentTextOutline}
          />
        </div>
      </div>
      <SessionDuration time="60-90 minuti" />
      <div className="sticky bottom-0 bg-bg border-t border-borderDefault p-5">
        <Button
          text="Prossimo Passaggio"
          link="/consulenza-psicologica/step-1"
          arrow={true}
        />
      </div>
    </>
  );
};
