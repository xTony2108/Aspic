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
      <span className="inline-flex justify-center px-2.5 py-0.5 rounded-full text-[0.7rem] font-semibold uppercase tracking-wide bg-warning-xlight text-warning border border-warning-light">
        Urgente
      </span>
    )}
    {status === "pending" && (
      <span className="inline-flex justify-center px-2.5 py-0.5 rounded-full text-[0.7rem] font-semibold uppercase tracking-wide bg-primary-xlight text-primary border border-primary-light">
        In attesa
      </span>
    )}
    {status === "awaiting_payment" && (
      <span className="inline-flex justify-center px-2.5 py-0.5 rounded-full text-[0.7rem] font-semibold uppercase tracking-wide bg-warning-xlight text-warning border border-warning-light">
        Pagamento atteso
      </span>
    )}
    {status === "date_change_pending" && (
      <span className="inline-flex justify-center px-2.5 py-0.5 rounded-full text-[0.7rem] font-semibold uppercase tracking-wide bg-violet-100 text-violet-600 border border-violet-300">
        Cambio data
      </span>
    )}
    {status === "confirmed" && (
      <span className="inline-flex justify-center px-2.5 py-0.5 rounded-full text-[0.7rem] font-semibold uppercase tracking-wide bg-dashboard-success-bg text-dashboard-success-text border border-dashboard-success-border">
        In carico
      </span>
    )}
    {status === "completed" && (
      <span className="inline-flex justify-center px-2.5 py-0.5 rounded-full text-[0.7rem] font-semibold uppercase tracking-wide bg-emerald-100 text-emerald-600 border border-emerald-300">
        Svolta
      </span>
    )}
    {status === "cancelled" && (
      <span className="inline-flex justify-center px-2.5 py-0.5 rounded-full text-[0.7rem] font-semibold uppercase tracking-wide bg-dashboard-error-bg text-dashboard-error-text border border-dashboard-error-border">
        Annullata
      </span>
    )}
  </div>
);
