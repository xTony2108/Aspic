import { SectionTitle } from "../components/layout/SectionTitle";
import { RiMentalHealthFill } from "react-icons/ri";
import { Button } from "../components/layout/Button";
import { SessionDuration } from "../components/layout/SessionDuration";

export const ConsulenzaPsicologica = () => {
  return (
    <>
      <SectionTitle
        text="Dettaglio Consulenza"
        backArrow={true}
        backArrowPath="../"
      />
      <div className="px-5 py-4">
        <div className="bg-linear-150 from-0% to-100% from-tertiary to-white h-52 rounded-3xl border border-secondary drop-shadow-sm flex items-center justify-center">
          <div className="drop-shadow-xs rounded-3xl bg-white w-20 h-20 text-primary p-4">
            <RiMentalHealthFill size="100%" />
          </div>
        </div>
      </div>
      <div className="px-5 py-4 mb-10">
        <h2 className="text-3xl mb-4">
          Prima Consulenza Psicologica Individuale
        </h2>
        <p className="text-base">
          La consulenza sarà esguita da psicologi psicoterapeuti con comprovata
          esperienza clinico/diagnostica
        </p>
      </div>
      <SessionDuration time="50 minuti" />
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
