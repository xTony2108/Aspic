import type z from "zod";
import { consulenzaSchema } from "../consulenzaSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { IoWarningOutline } from "react-icons/io5";
import { FaExclamation } from "react-icons/fa6";
import { FormRadioWithDot } from "../FormRadioWithDot";
import { FormRadioNoDot } from "../FormRadioNoDot";
import { FormCheckbox } from "../FormCheckbox";
import { Button } from "../../layout/Button";
import { InfoBox } from "../InfoBox";
import { BsInfoCircle } from "react-icons/bs";
import { useNavigate } from "@tanstack/react-router";
import { useConsulenzaFormStore } from "../../../store";

const today = new Date().toISOString().split("T")[0];

const formDatiRichiestaConsulenzaSchema = consulenzaSchema
  .pick({
    appointmentDate: true,
    appointmentTime: true,
    urgent: true,
    clientType: true,
    clientAge: true,
    reason: true,
  })
  .superRefine((data, ctx) => {
    if (!data.clientType) {
      ctx.addIssue({
        code: "custom",
        path: ["clientType"],
        message: "Devi selezionare una tipologia di cliente",
      });
    }
    if (data.clientType == "bambini" && !data.clientAge) {
      ctx.addIssue({
        code: "custom",
        path: ["clientAge"],
        message: "Seleziona l'età del cliente",
      });
    }
  });

type FormSchema = z.infer<typeof formDatiRichiestaConsulenzaSchema>;

export const DatiRichiestaConsulenzaForm = () => {
  const [showAge, setShowAge] = useState(false);

  const navigate = useNavigate();

  const appointmentDateVal = useConsulenzaFormStore((s) => s.appointmentDate);
  const appointmentTimeVal = useConsulenzaFormStore((s) => s.appointmentTime);
  const urgentVal = useConsulenzaFormStore((s) => s.urgent);
  const clientAgeVal = useConsulenzaFormStore((s) => s.clientAge);
  const clientTypeVal = useConsulenzaFormStore((s) => s.clientType);
  const reasonVal = useConsulenzaFormStore((s) => s.reason);
  const setData = useConsulenzaFormStore((s) => s.setData);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<FormSchema>({
    resolver: zodResolver(formDatiRichiestaConsulenzaSchema),
    defaultValues: {
      appointmentDate: appointmentDateVal || "",
      appointmentTime: appointmentTimeVal || "",
      urgent: urgentVal || false,
      clientAge: clientAgeVal || "",
      clientType: clientTypeVal || null,
      reason: reasonVal || "",
    },
  });
  const clientType = watch("clientType");

  const onSubmit = async (data: FormSchema) => {
    setData(data);

    navigate({
      from: "/servizi/$servizio/form/dati-richiesta",
      to: "/servizi/$servizio/form/dati-personali",
      resetScroll: false,
    });
  };

  useEffect(() => {
    if (clientType === "bambini") {
      setShowAge(true);
    } else {
      setShowAge(false);
      setValue("clientAge", "");
    }
  }, [clientType]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="pt-2">
        <div className="px-4">
          <p className="text-p-small font-semibold">Data e ora preferite</p>
          <div className="flex mt-3 gap-4">
            <div className="text-heading text-sm font-semibold flex-1">
              <label className="block">
                Seleziona Data
                <input
                  {...register("appointmentDate")}
                  min={today}
                  type="date"
                  className="bg-white border border-borderDefault py-3.5 px-4 rounded-xl mt-1.5 w-full appearance-none"
                />
              </label>
              {errors && errors?.appointmentDate?.message && (
                <span className="text-warn mt-40">
                  {errors.appointmentDate.message}
                </span>
              )}
            </div>

            <div className="text-heading text-sm font-semibold flex-1">
              <label className="block">
                Seleziona Ora
                <input
                  {...register("appointmentTime")}
                  type="time"
                  className="bg-white border border-borderDefault py-3.5 px-4 rounded-xl mt-1.5 w-full appearance-none"
                />
              </label>
              {errors && errors?.appointmentTime?.message && (
                <span className="text-warn">
                  {errors.appointmentTime.message}
                </span>
              )}
            </div>
          </div>
          <FormCheckbox
            inputName="urgent"
            register={register}
            Icon={FaExclamation}
            text="Richiesta urgente"
          />
        </div>

        <div className="flex flex-col gap-3 mt-6 px-4">
          <p className="text-p-small font-semibold pt-3 ">
            Seleziona il tipo di cliente:
          </p>
          <FormRadioWithDot
            inputName="clientType"
            register={register}
            value="bambini"
            text1="Età evolutiva"
            text2="Bambini e adolescenti"
          />
          {showAge && (
            <div
              className={`
                mt-3 mb-4
                overflow-hidden
                transition-all duration-500 ease-in-out
                ${showAge ? "max-h-250 opacity-100" : "max-h-0 opacity-0"}
              `}
            >
              <div className="ml-2">
                <InfoBox
                  type="warn"
                  Icon={IoWarningOutline}
                  text="Nota: Per i minori è necessaria la firma di entrambi i genitori al
                consenso così come da norma di legge"
                />
              </div>
              <div className="pl-7">
                <p className="text-heading font-semibold mb-3">Fascia d'età</p>
                <div className="flex flex-wrap gap-2">
                  <FormRadioNoDot
                    inputName="clientAge"
                    register={register}
                    value="0-3"
                    text="0 - 3 anni"
                  />
                  <FormRadioNoDot
                    inputName="clientAge"
                    register={register}
                    value="4-11"
                    text="4 - 11 anni"
                  />
                  <FormRadioNoDot
                    inputName="clientAge"
                    register={register}
                    value="12-14"
                    text="12 - 14 anni"
                  />
                  <FormRadioNoDot
                    inputName="clientAge"
                    register={register}
                    value="15-18"
                    text="15 - 18 anni"
                  />
                  {errors && errors?.clientAge?.message && (
                    <span className="text-warn font-semibold text-sm">
                      {errors.clientAge.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
          <FormRadioWithDot
            inputName="clientType"
            register={register}
            value="adulti"
            text1="Adulti"
            text2="Dai 18 anni in su"
          />
          <FormRadioWithDot
            inputName="clientType"
            register={register}
            value="anziani"
            text1="Anziani"
            text2="Psicologia geriatrica"
          />
          {errors && errors?.clientType?.message && (
            <span className="text-warn font-semibold text-sm">
              {errors.clientType.message}
            </span>
          )}
        </div>

        <div className="mt-6 px-4">
          <p className="text-p-small font-semibold mb-3">
            Motivi della richiesta (facoltativo)
          </p>
          <textarea
            {...register("reason")}
            className="h-28 bg-white w-full rounded-xl p-4 border border-borderDefault"
            placeholder="Descrivi brevemente il motivo del contatto..."
          />
        </div>
        <div className="px-4 mt-8">
          <InfoBox
            type="info"
            Icon={BsInfoCircle}
            text="Le informazioni fornite ci aiutano ad
            assegnare lo specialista più adatto alle tue
            necessità."
          />
        </div>
        <div className="sticky bottom-0 bg-bg border-t border-borderDefault p-5">
          <Button
            text="Prossimo Passaggio"
            arrow={true}
            type="submit"
            isSubmitting={isSubmitting}
          />
        </div>
      </form>
    </>
  );
};
