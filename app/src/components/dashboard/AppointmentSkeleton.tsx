export const AppointmentSkeleton = () => {
  return (
    <div
      className={`bg-white border rounded-2xl p-5 transition-all hover:shadow-sm hover:border-blue-light border-border`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="bg-blue-dark animate-pulse w-30 h-3"></div>
          <div className="bg-blue-dark animate-pulse w-50 h-3 mt-1"></div>
        </div>
        <span className="inline-flex justify-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-dark animate-pulse w-16 h-4"></span>
      </div>

      <div className="flex flex-col md:flex-row flex-wrap gap-x-5 gap-y-1 text-[13px] text-text-muted font-light mb-4">
        <span className="bg-blue-dark animate-pulse w-30 h-3"></span>
        <span className="bg-blue-dark animate-pulse w-43 h-3"></span>
        <span className="bg-blue-dark animate-pulse w-43 h-3"></span>
        <span className="bg-blue-dark animate-pulse w-43 h-3"></span>
      </div>

      <div className="flex flex-wrap gap-2">
        <button className="cursor-pointer inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors bg-blue-dark animate-pulse w-23 h-8"></button>
        <button className="cursor-pointer inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors bg-blue-dark animate-pulse w-23 h-8"></button>
        <button className="cursor-pointer inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors bg-blue-dark animate-pulse w-23 h-8"></button>
      </div>
    </div>
  );
};
