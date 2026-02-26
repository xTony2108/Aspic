import { Outlet } from "@tanstack/react-router";
import { SectionTitle } from "../components/layout/SectionTitle";
import {
  informazioniRoute,
  datiPersonaliRoute,
  riepilogoRoute,
  servizioRouteLayout,
} from "../routes";
import { useMatchRoute } from "@tanstack/react-router";
import { useMemo } from "react";

export const FormStepLayout = () => {
  const { config } = servizioRouteLayout.useRouteContext();
  const label = config.label;

  const matchRoute = useMatchRoute();

  const steps = useMemo(
    () => [
      { route: informazioniRoute, label: "Richiedi appuntamento" },
      { route: datiPersonaliRoute, label: "Dati personali" },
      { route: riepilogoRoute, label: "Riepilogo" },
    ],
    [],
  );

  const currentIndex = Math.max(
    0,
    steps.findIndex((step) => matchRoute({ to: step.route.to })),
  );

  let backPath;
  const currentStep = steps[currentIndex];
  let text = currentStep.label;

  const matchedStep = steps.find((step) => matchRoute({ to: step.route.to }));

  if (!matchedStep) {
    return <Outlet />;
  }

  if (currentIndex <= 0) {
    backPath = servizioRouteLayout.to;
  } else {
    backPath = steps[currentIndex - 1].route.to;
  }

  const progress = Math.round(((currentIndex + 1) / steps.length) * 100);

  return (
    <>
      <SectionTitle text={text} backArrow={true} backArrowPath={backPath} />
      <section>
        <div className="px-5 my-4">
          <div className="flex justify-between mb-3">
            <span className="text-heading font-semibold">{label}</span>
            <span className="text-p-small transition-all duration-300 ease-in-out">
              Passaggio {currentIndex + 1} di {steps.length}
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
