import type { IconType } from "react-icons";

interface InfoBoxProps {
  Icon: IconType;
  text: string;
  type: "warn" | "info";
}

export const InfoBox = ({ Icon, text, type }: InfoBoxProps) => {
  return (
    <div
      className={`mb-4 rounded-xl flex items-center gap-3 ${type == "warn" ? "bg-warnBg border border-warnBorder text-warn p-3" : "bg-secondary border border-highlight text-highlight p-4"}`}
    >
      <Icon size={20} className="shrink-0 self-start" />
      <p
        className={`font-semibold leading-6 ${type == "warn" ? "text-warn " : "text-highlight"}`}
      >
        {text}
      </p>
    </div>
  );
};
