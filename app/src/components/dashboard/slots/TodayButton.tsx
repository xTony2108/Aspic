export const TodayButton = ({ goToToday }: { goToToday: () => void }) => {
  return (
    <div className="flex items-center justify-between">
      <h3 className="font-garamond text-xl font-semibold">Calendario</h3>
      <button
        onClick={goToToday}
        className="px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-primary border border-primary/20 rounded-lg hover:bg-primary-xlight transition-colors cursor-pointer"
      >
        Torna a oggi
      </button>
    </div>
  );
};
