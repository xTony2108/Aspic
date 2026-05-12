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
        Urgente
      </span>
    )}
    {status === "pending" && (
      <span className="inline-flex justify-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-pale text-primary border border-blue-light">
        In attesa
      </span>
    )}
    {status === "awaiting_payment" && (
      <span className="inline-flex justify-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
        Pagamento atteso
      </span>
    )}
    {status === "date_change_pending" && (
      <span className="inline-flex justify-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-violet-50 text-violet-700 border border-violet-200">
        Cambio data
      </span>
    )}
    {status === "confirmed" && (
      <span className="inline-flex justify-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-dashboard-successBg text-dashboard-successText border border-dashboard-successBorder">
        In carico
      </span>
    )}
    {status === "completed" && (
      <span className="inline-flex justify-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
        Svolta
      </span>
    )}
    {status === "cancelled" && (
      <span className="inline-flex justify-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-dashboard-errorBg text-dashboard-errorText border border-dashboard-errorBorder">
        Annullata
      </span>
    )}
  </div>
);
