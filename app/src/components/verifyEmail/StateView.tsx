import type { ReactNode } from "react";
import { FiCheckCircle, FiAlertTriangle } from "react-icons/fi";

type StateType = "loading" | "success" | "error";

const STATE_CONFIG: Record<StateType, { iconBg: string; icon?: ReactNode }> = {
  loading: { iconBg: "bg-white/10" },
  success: { iconBg: "bg-success/20 text-white", icon: <FiCheckCircle size={28} /> },
  error: { iconBg: "bg-warn/10", icon: <FiAlertTriangle size={28} /> },
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
          cfg.icon
        )}
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="font-garamond text-2xl text-white">
          {message}
        </h2>
        {sub && (
          <p className="text-sm text-white/40 leading-relaxed">
            {sub}
          </p>
        )}
      </div>

      {statusCode === 410 && onResend && (
        <button
          onClick={onResend}
          className="px-6 py-2.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
        >
          {action?.label ?? "Reinvia email"}
        </button>
      )}

      {statusCode && (
        <div className="text-xs font-mono text-white/30">
          Status: {statusCode}
        </div>
      )}
    </div>
  );
};
