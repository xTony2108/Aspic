type StateType = "loading" | "success" | "error";

const STATE_CONFIG: Record<StateType, { iconBg: string; icon?: string }> = {
  loading: { iconBg: "bg-white/10" },
  success: { iconBg: "bg-green-500/20 text-white", icon: "✓" },
  error: { iconBg: "bg-warn/10", icon: "⚠" },
};

export const StateView = ({
  type,
  message,
  sub,
  action,
  statusCode,
  onResend,
}: {
  type: StateType;
  message: string;
  sub?: string;
  action?: { label: string; onClick: () => void };
  statusCode?: number;
  onResend?: () => void;
}) => {
  const cfg = STATE_CONFIG[type];

  return (
    <div className="flex flex-col items-center gap-5">
      <div
        className={`w-16 h-16 rounded-full ${cfg.iconBg} flex items-center justify-center`}
      >
        {type === "loading" ? (
          <div className="w-7 h-7 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
        ) : (
          <span className="text-2xl">{cfg.icon}</span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="font-garamond text-2xl font-light text-white">
          {message}
        </h2>
        {sub && (
          <p className="text-sm font-light text-white/40 leading-relaxed">
            {sub}
          </p>
        )}
      </div>

      {statusCode === 410 && onResend && (
        <button
          onClick={onResend}
          className="bg-white/10 border border-white/20 text-white/70 text-sm font-light px-6 py-3 rounded-xl cursor-pointer transition-all duration-200 hover:bg-white/20 hover:text-white"
        >
          Richiedi nuovo link
        </button>
      )}

      {action && (
        <button
          onClick={action.onClick}
          className="bg-primary text-white text-sm font-medium px-6 py-3 rounded-xl cursor-pointer transition-all duration-200 hover:bg-blue-mid hover:-translate-y-px"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};
