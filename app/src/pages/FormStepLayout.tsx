import { Outlet, useRouterState } from "@tanstack/react-router";
import { SectionTitle } from "../components/layout/SectionTitle";

export const FormStepLayout = () => {
  const { pathname } = useRouterState({ select: (s) => s.location });

  const progress = pathname.includes("dati-personali") ? 100 : 0;
  const step = pathname.includes("dati-personali") ? 2 : 1;

  const redirect = pathname.includes("dati-personali")
    ? "../dati-richiesta"
    : "../";
  return (
    <>
      <SectionTitle
        text="Richiedi appuntamento"
        backArrow={true}
        backArrowPath={redirect}
      />
      <section>
        <div className="px-5 my-4">
          <div className="flex justify-between mb-3">
            <span className="text-heading font-semibold">
              Consulenza Psicologica
            </span>
            <span className="text-p-small transition-all duration-300 ease-in-out">
              Passaggio {step} di 2
            </span>
          </div>
          <div className="relative w-full h-2 bg-progressBar rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        <Outlet />
      </section>
    </>
  );
};
