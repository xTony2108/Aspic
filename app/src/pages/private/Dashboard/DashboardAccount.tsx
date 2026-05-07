import { DashboardTitle } from "../../../components/dashboard/DashboardTitle";
import { DashboardAccountDataForm } from "../../../components/dashboard/account/DashboardAccountDataForm";
import { DashboardPasswordChangeForm } from "../../../components/dashboard/account/DashboardPasswordChangeForm";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createGetUserDataQueryOptions } from "../../../api/admin/createGetUserDataQueryOptions";
import { DashboardAccountSessions } from "../../../components/dashboard/account/DashboardAccountSessions";
import { StripeConnectCard } from "../../../components/stripe/StripeConnectCard";

export const DashboardAccount = () => {
  const {
    data: { userData },
  } = useSuspenseQuery(createGetUserDataQueryOptions());

  return (
    <>
      <DashboardTitle title="Impostazioni" titleEm="account" />

      <div className="flex flex-col p-6">
        {!userData.passwordChanged && (
          <div
            className="flex items-start gap-3.5 border border-dashboard-warnBorder bg-dashboard-warnBg rounded-xl py-4 px-4.5 mb-5"
            role="alert"
          >
            <div className="text-lg shrink-0">⚠️</div>
            <div>
              <div className="text-form font-medium text-dashboard-warnText mb-0.5">
                Stai usando la password temporanea
              </div>
              <div className="text-xs text-dashboard-warnTextLight font-light">
                Per sicurezza, aggiorna la tua password. La password temporanea
                è facilmente individuabile.
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-5 bg-bg">
          <DashboardAccountDataForm />
          <DashboardPasswordChangeForm />
          <DashboardAccountSessions />
          <StripeConnectCard />
        </div>
      </div>
    </>
  );
};
