import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { IoWarningOutline } from "react-icons/io5";
import { FaExclamation } from "react-icons/fa6";
import { FormRadioWithDot } from "./FormRadioWithDot";
import { FormRadioNoDot } from "./FormRadioNoDot";
import { FormCheckbox } from "./FormCheckbox";
import { Button } from "../layout/Button";
import { InfoBox } from "./InfoBox";
import { BsInfoCircle } from "react-icons/bs";
import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { FormInput } from "./FormInput";
import { useStore } from "zustand";
import { baseSchema } from "../../features/services/schemas/schemas";

export const FormInformazioni = () => {
  const [showAge, setShowAge] = useState(false);
  const { config } = getRouteApi("/servizi/$servizio").useRouteContext();

  const refinedSchema = baseSchema
    .pick({
      appointmentDate: true,
      appointmentTime: true,
      urgent: true,
      clientType: true,
      clientAge: true,
      reason: true,
    })
    .superRefine((data, ctx) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (!data.appointmentDate) {
        ctx.addIssue({
          code: "custom",
          path: ["appointmentDate"],
          message: "Seleziona la data dell'appuntamento",
        });
      }
      if (!data.clientType) {
        ctx.addIssue({
          code: "custom",
          path: ["clientType"],
          message: "Seleziona una tipologia di cliente",
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

  type FormSchema = z.infer<typeof refinedSchema>;

  const navigate = useNavigate();

  const appointmentDateVal = useStore(config.store, (s) => s.appointmentDate);
  const appointmentTimeVal = useStore(config.store, (s) => s.appointmentTime);
  const urgentVal = useStore(config.store, (s) => s.urgent);
  const clientAgeVal = useStore(config.store, (s) => s.clientAge);
  const clientTypeVal = useStore(config.store, (s) => s.clientType);
  const reasonVal = useStore(config.store, (s) => s.reason);
  const setData = useStore(config.store, (s) => s.setData);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<FormSchema>({
    resolver: zodResolver(refinedSchema),
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
      from: "/servizi/$servizio/richiesta-colloquio/informazioni",
      to: "/servizi/$servizio/richiesta-colloquio/dati-personali",
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-3">
          <h2>Informazioni richiesta</h2>
          <div className="flex gap-4">
            <div className="text-heading text-sm font-semibold flex-1">
              <FormInput
                inputName="appointmentDate"
                inputType="date"
                label="Seleziona Data"
                register={register}
              />
              {errors && errors?.appointmentDate?.message && (
                <span className="text-warn text-base font-semibold">
                  {errors.appointmentDate.message}
                </span>
              )}
            </div>

            <div className="text-heading text-sm font-semibold flex-1">
              <FormInput
                inputName="appointmentTime"
                inputType="time"
                label="Seleziona Ora"
                register={register}
              />
              {errors && errors?.appointmentTime?.message && (
                <span className="text-warn text-base font-semibold">
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

        <div className="flex flex-col gap-3 mt-6">
          <p>Seleziona il tipo di cliente:</p>
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
                    <span className="text-warn font-semibold text-base">
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
            <span className="text-warn font-semibold text-base">
              {errors.clientType.message}
            </span>
          )}
        </div>

        <div className="mt-6 space-y-3">
          <p>Motivi della richiesta (facoltativo)</p>
          <textarea
            {...register("reason")}
            className="h-28 bg-white w-full rounded-xl p-4 border border-borderDefault"
            placeholder="Descrivi brevemente il motivo del contatto..."
          />
        </div>
        <div className="mt-8">
          <InfoBox
            type="info"
            Icon={BsInfoCircle}
            text="Le informazioni fornite ci aiutano ad
            assegnare lo specialista più adatto alle tue
            necessità."
          />
        </div>
        <div className="sticky bottom-0 bg-bg border-t border-borderDefault py-5">
          <Button
            text="Prossimo Passaggio"
            arrow={true}
            isSubmitting={isSubmitting}
          />
        </div>
      </form>
    </>
  );
};
