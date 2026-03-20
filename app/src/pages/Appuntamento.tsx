import z from "zod";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { IoWarningOutline } from "react-icons/io5";
import { FormCheckbox } from "../components/form/FormCheckbox";
import { InfoBox } from "../components/form/InfoBox";
import { useNavigate } from "@tanstack/react-router";
import { FormInput } from "../components/form/FormInput";
import { baseSchema } from "../features/services/schemas/schemas";
import { useServizioFormStore } from "../store";
import { FormRadio } from "../components/form/FormRadio";
import { BackButton } from "../components/form/BackButton";
import { NextButton } from "../components/form/NextButton";
import { FormTextArea } from "../components/form/FormTextArea";
import { ErrorSpan } from "../components/form/ErrorSpan";

export const Appuntamento = () => {
  const [showAge, setShowAge] = useState(false);

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
          message: "Seleziona una data valida",
        });
      }
      if (!data.clientType) {
        ctx.addIssue({
          code: "custom",
          path: ["clientType"],
          message: "Seleziona il tipo di paziente",
        });
      }
      if (data.clientType == "bambini" && !data.clientAge) {
        ctx.addIssue({
          code: "custom",
          path: ["clientAge"],
          message: "Seleziona la fascia d'età",
        });
      }
    });

  type FormSchema = z.infer<typeof refinedSchema>;

  const navigate = useNavigate();

  const service = useServizioFormStore((s) => s.service);
  const appointmentDateVal = useServizioFormStore((s) => s.appointmentDate);
  const appointmentTimeVal = useServizioFormStore((s) => s.appointmentTime);
  const urgentVal = useServizioFormStore((s) => s.urgent);
  const clientAgeVal = useServizioFormStore((s) => s.clientAge);
  const clientTypeVal = useServizioFormStore((s) => s.clientType);
  const reasonVal = useServizioFormStore((s) => s.reason);
  const setData = useServizioFormStore((s) => s.setData);

  const methods = useForm<FormSchema>({
    resolver: zodResolver(refinedSchema),
    defaultValues: {
      appointmentDate: appointmentDateVal ?? "",
      appointmentTime: appointmentTimeVal ?? "",
      urgent: urgentVal ?? false,
      clientAge: clientAgeVal ?? "",
      clientType: clientTypeVal ?? null,
      reason: reasonVal ?? "",
    },
  });
  const clientType = useWatch({
    name: "clientType",
    control: methods.control,
  });

  const onSubmit = (data: FormSchema) => {
    setData(data);

    navigate({
      from: "/prenota/appuntamento",
      to: "/prenota/dati",
      resetScroll: true,
    });
  };

  useEffect(() => {
    if (!service) {
      navigate({
        from: "/prenota/appuntamento",
        to: "/prenota/servizio",
        resetScroll: false,
      });
    }

    if (clientType === "bambini") {
      setShowAge(true);
    } else {
      setShowAge(false);
      methods.setValue("clientAge", "");
    }
  }, [clientType, service]);

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5 mb-8">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex-1">
                <FormInput
                  inputName="appointmentDate"
                  inputType="date"
                  label="Seleziona Data"
                  register={methods.register}
                  required={true}
                />
                <ErrorSpan
                  errors={methods.formState.errors}
                  inputName="appointmentDate"
                />
              </div>

              <div className="flex-1">
                <FormInput
                  inputName="appointmentTime"
                  inputType="time"
                  label="Seleziona Ora"
                  register={methods.register}
                  required={true}
                />
                <ErrorSpan
                  errors={methods.formState.errors}
                  inputName="appointmentTime"
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
                  register={methods.register}
                  value="bambini"
                  text="Età evolutiva"
                />
                <FormRadio
                  inputName="clientType"
                  register={methods.register}
                  value="adulti"
                  text="Adulti"
                />
                <FormRadio
                  inputName="clientType"
                  register={methods.register}
                  value="anziani"
                  text="Anziani"
                />
              </div>
              <ErrorSpan
                errors={methods.formState.errors}
                inputName="clientType"
              />
              {showAge && (
                <>
                  <div
                    className={`mt-3 overflow-hidden transition-all duration-500 ease-in-out ${showAge ? "max-h-250 opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    <div className="flex flex-wrap gap-2">
                      <FormRadio
                        inputName="clientAge"
                        register={methods.register}
                        value="0-3"
                        text="0-3 anni"
                      />
                      <FormRadio
                        inputName="clientAge"
                        register={methods.register}
                        value="4-11"
                        text="4-11 anni"
                      />
                      <FormRadio
                        inputName="clientAge"
                        register={methods.register}
                        value="12-14"
                        text="12-14 anni"
                      />
                      <FormRadio
                        inputName="clientAge"
                        register={methods.register}
                        value="15-18"
                        text="15-18 anni"
                      />
                    </div>
                  </div>
                  <ErrorSpan
                    errors={methods.formState.errors}
                    inputName="clientAge"
                  />
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
                </>
              )}
            </div>

            <FormCheckbox
              inputName="urgent"
              register={methods.register}
              label="Richiesta urgente"
              heading="Contrassegna come urgente"
              description="Verrà data priorità nella gestione della tua richiesta"
            />

            <FormTextArea
              inputName="reason"
              register={methods.register}
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
      </FormProvider>
    </>
  );
};
