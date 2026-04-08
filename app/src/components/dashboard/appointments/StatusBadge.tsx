import type { Status } from "../../../pages/private/Dashboard/DashboardRichieste";

export const StatusBadge = ({
  status,
  urgent,
}: {
  status: Status;
  urgent: boolean;
}) => (
  <div className="flex flex-col gap-1.5 md:flex-row shrink-0">
    {urgent && (
      <span className="inline-flex justify-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-50 text-amber-600 border border-amber-200">
        ⚡ Urgente
      </span>
    )}
    {status === "pending" && (
      <span className="inline-flex justify-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-pale text-primary border border-blue-light">
        In attesa
      </span>
    )}
    {status === "confirmed" && (
      <span className="inline-flex justify-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-dashboard-successBg text-dashboard-successText border border-dashboard-successBorder">
        ✓ In carico
      </span>
    )}
    {status === "cancelled" && (
      <span className="inline-flex justify-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-dashboard-errorBg text-dashboard-errorText border border-dashboard-errorBorder">
        ✕ Annullata
      </span>
    )}
  </div>
);
