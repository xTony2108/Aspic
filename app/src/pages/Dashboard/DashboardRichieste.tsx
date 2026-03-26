import { createLazyRoute } from "@tanstack/react-router";
import { DashboardTitle } from "../../components/dashboard/DashboardTitle";

export const DashboardRichieste = () => {
  return (
    <div className="flex flex-col px-6 py-3">
      <DashboardTitle title="Richieste" titleEm="in attesa" />
    </div>
  );
};

export const Route = createLazyRoute("/_autenticato/dashboard/richieste")({
  component: DashboardRichieste,
});
