import z from "zod";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { IoWarningOutline } from "react-icons/io5";
import { FormCheckbox } from "../../../components/form/FormCheckbox";
import { InfoBox } from "../../../components/form/InfoBox";
import { useNavigate } from "@tanstack/react-router";
import { FormInput } from "../../../components/form/FormInput";
import { baseSchema } from "../../../features/services/schemas/schemas";
import { useServizioFormStore } from "../../../store";
import { FormRadio } from "../../../components/form/FormRadio";
import { BackButton } from "../../../components/form/BackButton";
import { NextButton } from "../../../components/form/NextButton";
import { FormTextArea } from "../../../components/form/FormTextArea";
import { ErrorSpan } from "../../../components/form/ErrorSpan";
import { FormDatePicker } from "../../../components/form/FormDatePicker";
import { refineClientType } from "../../../features/services/schemas/refinements/refineClientType";

const refinedSchema = baseSchema
  .pick({
    appointmentDate: true,
    appointmentTime: true,
    urgent: true,
    clientType: true,
    clientAge: true,
    reason: true,
  })
  .superRefine(refineClientType);

type FormInput = z.input<typeof refinedSchema>;

export const Appuntamento = () => {
  const navigate = useNavigate();

  const service = useServizioFormStore((s) => s.service);
  const appointmentDateVal = useServizioFormStore((s) => s.appointmentDate);
  const appointmentTimeVal = useServizioFormStore((s) => s.appointmentTime);
  const urgentVal = useServizioFormStore((s) => s.urgent);
  const clientAgeVal = useServizioFormStore((s) => s.clientAge);
  const clientTypeVal = useServizioFormStore((s) => s.clientType);
  const reasonVal = useServizioFormStore((s) => s.reason);
  const setData = useServizioFormStore((s) => s.setData);

  const methods = useForm<FormInput>({
    resolver: zodResolver(refinedSchema),
    defaultValues: {
      appointmentDate: appointmentDateVal ?? undefined,
      appointmentTime: appointmentTimeVal ?? "",
      urgent: urgentVal ?? false,
      clientAge: clientAgeVal ?? null,
      clientType: clientTypeVal ?? null,
      reason: reasonVal ?? "",
    },
  });
  const clientType = useWatch({
    name: "clientType",
    control: methods.control,
  });

  const onSubmit = (data: FormInput) => {
    const newData = refinedSchema.parse(data);

    setData(newData);

    navigate({
      from: "/prenota/appuntamento",
      to: "/prenota/dati",
      resetScroll: true,
    });
  };

  useEffect(() => {
    if (clientType !== "bambini") {
      methods.setValue("clientAge", null);
    }
  }, [clientType, service]);

  return (
    <>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5 mb-8">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1 relative">
              <FormDatePicker
                control={methods.control}
                inputName="appointmentDate"
                label="Seleziona Data"
              />
            </div>

            <div className="flex-1">
              <FormInput
                inputName="appointmentTime"
                inputType="time"
                label="Seleziona Ora"
                control={methods.control}
                required={true}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="block text-[.8rem] font-medium text-text tracking-wide">
              Tipo di paziente
              <span className="text-primary ml-0.5 text-xs"> *</span>
            </span>
            <div className="flex gap-2">
              <FormRadio
                inputName="clientType"
                control={methods.control}
                value="bambini"
                text="Età evolutiva"
              />
              <FormRadio
                inputName="clientType"
                control={methods.control}
                value="adulti"
                text="Adulti"
              />
              <FormRadio
                inputName="clientType"
                control={methods.control}
                value="anziani"
                text="Anziani"
              />
            </div>
            <ErrorSpan
              errors={methods.formState.errors}
              inputName="clientType"
            />
            {methods.watch("clientType") === "bambini" && (
              <>
                <div
                  className={`mt-3 overflow-hidden transition-all duration-500 ease-in-out ${methods.watch("clientType") === "bambini" ? "max-h-250 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <div className="flex flex-wrap gap-2">
                    <FormRadio
                      inputName="clientAge"
                      control={methods.control}
                      value="0-3"
                      text="0-3 anni"
                    />
                    <FormRadio
                      inputName="clientAge"
                      control={methods.control}
                      value="4-11"
                      text="4-11 anni"
                    />
                    <FormRadio
                      inputName="clientAge"
                      control={methods.control}
                      value="12-14"
                      text="12-14 anni"
                    />
                    <FormRadio
                      inputName="clientAge"
                      control={methods.control}
                      value="15-18"
                      text="15-18 anni"
                    />
                  </div>
                </div>
                <ErrorSpan
                  errors={methods.formState.errors}
                  inputName="clientAge"
                />
                <div className="mt-6">
                  <InfoBox
                    Icon={IoWarningOutline}
                    text={
                      <>
                        <strong className="font-medium">Nota: </strong>Per i
                        minori è necessaria la firma di entrambi i genitori al
                        consenso così come da norma di legge
                      </>
                    }
                  />
                </div>
              </>
            )}
          </div>

          <FormCheckbox
            inputName="urgent"
            control={methods.control}
            label="Richiesta urgente"
            heading="Contrassegna come urgente"
            description="Verrà data priorità nella gestione della tua richiesta"
          />

          <FormTextArea
            inputName="reason"
            control={methods.control}
            label="Motivo della richiesta"
            placeholder="Descrivi brevemente la situazione o le problematiche per cui richiedi supporto…"
            required={false}
          />
        </div>
        <div className="flex justify-between">
          <BackButton
            onClickFn={() =>
              navigate({
                from: "/prenota/appuntamento",
                to: "/prenota/servizio",
              })
            }
          />
          <NextButton />
        </div>
      </form>
    </>
  );
};
