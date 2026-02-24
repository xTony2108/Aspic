import { IoMdTime } from "react-icons/io";
import type { IconType } from "react-icons";
import { consulenzaSchema } from "../form/consulenzaSchema";
import type z from "zod";

const formDatiRiepilogoSchema = consulenzaSchema.pick({
  clientType: true,
  clientAge: true,
  appointmentDate: true,
  appointmentTime: true,
  urgent: true,
});

type ConsulenzaDatiRiepilogoSchema = z.infer<typeof formDatiRiepilogoSchema>;

type CardRiepilogoProps = {
  title: string;
  price: string;
  Icon: IconType;
} & ConsulenzaDatiRiepilogoSchema;

export const CardDettaglioRiepilogo = ({
  title,
  clientType,
  clientAge,
  appointmentDate,
  appointmentTime,
  price,
  urgent,
  Icon,
}: CardRiepilogoProps) => {
  const localeData = new Date(appointmentDate).toLocaleDateString();

  return (
    <div className="rounded-2xl flex flex-col bg-white p-5 drop-shadow-lg space-y-4">
      <div className="flex gap-4">
        <div className="bg-secondary rounded-full w-14 h-14 flex items-center justify-center shrink-0 self-center">
          <Icon color="#263780" size={28} />
        </div>
        <div>
          <h3 className="mb-0.5">{title}</h3>
          <p className="font-semibold text-primary text-base">
            TIPO CLIENTE:{" "}
            {clientType == "bambini"
              ? "ETÀ EVOLUTIVA"
              : clientType?.toUpperCase()}
          </p>
          {clientAge && <p>Fascia d'età: {clientAge} anni</p>}
        </div>
      </div>
      {urgent && (
        <div className="bg-warnBg w-fit h-fit border border-warnBorder rounded-full py-2 px-4">
          <p className="text-warn text-xs text-center font-bold leading-3 ">
            RICHIESTA URGENTE
          </p>
        </div>
      )}
      <div className="flex items-center gap-1">
        <div className="font-semibold text-p-small flex items-center gap-1">
          <IoMdTime />
          <span>Data e ora:</span>
        </div>
        <span className="text-heading font-semibold">
          {localeData} {appointmentTime}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-semibold text-p-small">Prezzo della seduta</span>
        <span className="font-semibold">€ {price}</span>
      </div>
    </div>
  );
};
