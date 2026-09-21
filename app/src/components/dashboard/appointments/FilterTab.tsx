import type { Status } from "../../../pages/private/Dashboard/DashboardRichieste";

const FILTERS: { key: Status; label: string }[] = [
  { key: "pending", label: "In attesa" },
  { key: "awaiting_payment", label: "Pagamento" },
  { key: "date_change_pending", label: "Cambio data" },
  { key: "confirmed", label: "In carico" },
  { key: "completed", label: "Svolte" },
  { key: "cancelled", label: "Annullate" },
];

interface FilterTabProps {
  active: Status;
  onChange: (status: Status) => void;
  totals: {
    pending: number;
    awaiting_payment: number;
    date_change_pending: number;
    confirmed: number;
    cancelled: number;
    completed: number;
  };
}
export const FilterTab = ({ active, onChange, totals }: FilterTabProps) => {
  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-1.5 bg-cream rounded-xl p-1.5 mb-5 justify-around">
      {FILTERS.map((f) => (
        <button
          key={f.key}
          onClick={() => onChange(f.key)}
          className={`px-3.5 py-2 rounded-lg text-xs transition-all whitespace-nowrap cursor-pointer ${
            active === f.key
              ? "bg-white text-text shadow-sm"
              : "text-text-muted hover:text-text"
          }`}
        >
          {f.label} {totals && `(${totals[f.key]})`}
        </button>
      ))}
    </div>
  );
};
