type Stat = { label: string; value: number; sub: string; accent: boolean };

export const StatsGrid = ({ stats }: { stats: Stat[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {stats.map((s) => (
        <div
          key={s.label}
          className={`rounded-2xl px-5 py-4 border ${s.accent ? "bg-primary border-primary" : "bg-white border-border"}`}
        >
          <div
            className={`text-[11px] font-medium uppercase tracking-widest mb-2 ${s.accent ? "text-white/60" : "text-text-muted"}`}
          >
            {s.label}
          </div>
          <div
            className={`font-garamond text-4xl font-semibold leading-none ${s.accent ? "text-white" : "text-text"}`}
          >
            {s.value}
          </div>
          <div
            className={`text-[12px] mt-1 ${s.accent ? "text-white/50" : "text-text-muted"}`}
          >
            {s.sub}
          </div>
        </div>
      ))}
    </div>
  );
};
