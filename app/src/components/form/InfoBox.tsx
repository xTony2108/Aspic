import type { IconType } from "react-icons";

interface InfoBoxProps {
  Icon: IconType;
  text: React.ReactElement;
  type: "warn" | "info";
}

export const InfoBox = ({ Icon, text, type }: InfoBoxProps) => {
  return (
    <div
      className={`rounded-xl flex items-center gap-3 ${type == "warn" ? "bg-warnBg border border-warnBorder text-warn p-3" : "bg-secondary border border-highlight text-highlight p-4"}`}
    >
      <Icon size={20} className="shrink-0 self-start mt-0.5" />
      <p
        className={`text-sm font-light ${type == "warn" ? "text-warn " : "text-highlight"}`}
      >
        {text}
      </p>
    </div>
  );
};
