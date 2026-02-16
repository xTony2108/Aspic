import { FaMoneyBill } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import type { IconType } from "react-icons";
import { Button } from "../layout/Button";

interface ServiceCardProps {
  title: string;
  description: string;
  timeText?: string;
  cost?: string;
  Icon: IconType;
  link?: string;
  fullCard?: boolean;
}

export const ServiceCard = ({
  title,
  description,
  timeText,
  cost,
  Icon,
  link,
  fullCard,
}: ServiceCardProps) => {
  return (
    <div className="rounded-2xl flex flex-col gap-5 bg-white p-5 drop-shadow-lg">
      <div className="flex gap-4">
        <div
          className={`bg-secondary rounded-full w-14 h-14 flex items-center justify-center shrink-0 ${!fullCard && "self-center"}`}
        >
          <Icon color="#307de8" size={"50%"} />
        </div>
        <div>
          <h3 className="mb-0.5">{title}</h3>
          <p>{description}</p>
          {fullCard && (
            <div className="flex gap-4 mt-4">
              <div className="text-p-small flex items-center gap-1">
                <IoMdTime />
                <span className="font-semibold">{timeText}</span>
              </div>
              <div className="text-primary flex items-center gap-1">
                <FaMoneyBill />
                <span className="font-semibold">€ {cost}</span>
              </div>
            </div>
          )}
        </div>
      </div>
      {fullCard && link && <Button text="Seleziona" link={link} />}
    </div>
  );
};
