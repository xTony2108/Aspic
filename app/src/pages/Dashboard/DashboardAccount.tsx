import { createLazyRoute } from "@tanstack/react-router";
import { DashboardTitle } from "../../components/dashboard/DashboardTitle";

import { DashboardAccountDataForm } from "../../components/dashboard/account/DashboardAccountDataForm";
import { DashboardPasswordChangeForm } from "../../components/dashboard/account/DashboardPasswordChangeForm";

export const DashboardAccount = () => {
  return (
    <div className="flex flex-col">
      <DashboardTitle title="Impostazioni" titleEm="account" />
      <div className="grid lg:grid-cols-2 gap-5 p-6 bg-bg">
        <DashboardAccountDataForm />
        <DashboardPasswordChangeForm />
      </div>
    </div>
  );
};

export const Route = createLazyRoute("/_autenticato/dashboard/impostazioni")({
  component: DashboardAccount,
});
