interface ProgressDotProps {
  progress: string;
  progressLabel: string;
  active: boolean;
  done: boolean;
}

export const ProgressDot = ({
  progress,
  progressLabel,
  active,
  done,
}: ProgressDotProps) => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center gap-2">
        <div
          className={`flex items-center justify-center border-2 rounded-full w-7 h-7 text-xs font-medium md:w-8 md:h-8 text-black transition-all duration-300 ease-in-out ${active ? "border-primary bg-primary text-white shadow-[0_0_0_4px_hsl(229,40%,90%)]" : done ? "border-primary bg-primary text-white" : "border-border bg-white text-text-muted"}`}
        >
          {progress}
        </div>
        <span
          className={`text-xs hidden md:block ${active ? "text-text" : "text-text-muted "}`}
        >
          {progressLabel}
        </span>
      </div>
    </div>
  );
};
