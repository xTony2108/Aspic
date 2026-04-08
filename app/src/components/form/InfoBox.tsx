import type { IconType } from "react-icons";

interface InfoBoxProps {
  Icon: IconType;
  text: React.ReactElement;
}

export const InfoBox = ({ Icon, text }: InfoBoxProps) => {
  return (
    <div className="bg-warnBg border border-warn rounded-xl p-4 flex gap-3 items-start select-none">
      <Icon className="text-warn shrink-0 mt-0.5" />
      <p className="text-sm font-light text-warn">{text}</p>
    </div>
  );
};
