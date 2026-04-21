import { useServizioFormStore } from "../../../store";
import { useNavigate } from "@tanstack/react-router";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { baseSchema } from "../../../features/services/schemas/schemas";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BackButton } from "../../../components/form/BackButton";
import { NextButton } from "../../../components/form/NextButton";
import { RiepilogoRow } from "../../../components/form/RiepilogoRow";
import { motion } from "motion/react";
import { getServiceLabel } from "../../../features/services/services.config";
import { getClientTypeLabel } from "../../../helpers/getClientTypeLabel";
import { IoIosCheckmark } from "react-icons/io";
import { ErrorSpan } from "../../../components/form/ErrorSpan";
import { IoWarningOutline } from "react-icons/io5";
import { InfoBox } from "../../../components/form/InfoBox";
import { useShallow } from "zustand/react/shallow";
type FormSchema = z.input<typeof baseSchema>;

export const Riepilogo = () => {
  const navigate = useNavigate();

  const {
    service,
    clientType,
    clientAge,
    appointmentDate,
    appointmentTime,
    firstName,
    lastName,
    address,
    birthday,
    birthPlace,
    fiscalCode,
    phoneNumber,
    email,
    urgent,
    reason,
    appointmentMode,
  } = useServizioFormStore(
    useShallow((s) => ({
      service: s.service,
      appointmentDate: s.appointmentDate,
      appointmentTime: s.appointmentTime,
      clientType: s.clientType,
      clientAge: s.clientAge,
      urgent: s.urgent,
      reason: s.reason,
      firstName: s.firstName,
      lastName: s.lastName,
      address: s.address,
      birthday: s.birthday,
      birthPlace: s.birthPlace,
      fiscalCode: s.fiscalCode,
      phoneNumber: s.phoneNumber,
      email: s.email,
      appointmentMode: s.appointmentMode,
    })),
  );

  const privacyAccepted = useServizioFormStore((s) => s.privacyAccepted);
  const clearData = useServizioFormStore((s) => s.clearData);
  const {
    handleSubmit,
    register,
    setError,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<FormSchema>({
    resolver: zodResolver(baseSchema),
    defaultValues: {
      service: service ?? null,
      reason: reason ?? "",
      clientType: clientType ?? null,
      clientAge: clientAge ?? null,
      appointmentDate: appointmentDate ?? null,
      appointmentTime: appointmentTime ?? "",
      firstName: firstName ?? "",
      lastName: lastName ?? "",
      address: address ?? "",
      birthday: birthday ?? "",
      birthPlace: birthPlace ?? "",
      fiscalCode: fiscalCode ?? "",
      phoneNumber: phoneNumber ?? "",
      email: email ?? "",
      urgent: urgent ?? false,
      privacyAccepted,
      appointmentMode: appointmentMode ?? undefined,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["appointments"],
    mutationFn: (data: FormSchema) => axios.post("/api/appointments", data),
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;

        if (message) {
          setError("root.serverError", { message });
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    },
    onSuccess: () => {
      reset();
      clearData();

      navigate({
        from: "/prenota/riepilogo",
        to: "/prenota/successo",
        resetScroll: true,
        state: { success: true },
      });
    },
  });

  const onSubmit = (data: FormSchema) => {
    mutate(data);
  };

  return (
    <>
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "backOut" }}
        viewport={{ once: true }}
      >
        {errors.root?.serverError && (
          <div className="mb-6">
            <InfoBox
              Icon={IoWarningOutline}
              text={<>{errors.root.serverError.message}</>}
            />
          </div>
        )}
        <div className="bg-white border border-border rounded-2xl mb-6">
          <div className="px-5 py-6 border-b border-border">
            <span className="uppercase font-medium text-primary mb-3.5 text-xs tracking-widest block">
              Servizio richiesto
            </span>
            <span className="font-garamond font-semibold text-lg text-text block">
              {service && getServiceLabel(service)}
            </span>
          </div>
          <div className="px-5 py-6 border-b border-border">
            <span className="uppercase font-medium text-primary mb-3.5 text-xs tracking-widest block">
              Appuntamento
            </span>
            <dl>
              <RiepilogoRow
                label="Data"
                value={
                  appointmentDate
                    ? new Date(appointmentDate).toLocaleDateString()
                    : ""
                }
              />
              <RiepilogoRow
                label="Ora"
                value={appointmentTime ? appointmentTime : ""}
              />
              <RiepilogoRow
                label="Tipo paziente"
                value={clientType ? getClientTypeLabel(clientType) : ""}
              />
              {clientAge && (
                <RiepilogoRow label="Fascia d'età" value={clientAge} />
              )}

              {reason && <RiepilogoRow label="Note" value={reason} />}
              {urgent && (
                <div className="bg-warnBg border border-warnBorder text-warn rounded-full text-xs font-medium mt-2 px-3 py-1 w-fit">
                  ⚡ Richiesta urgente
                </div>
              )}
            </dl>
          </div>
          <div className="px-5 py-6">
            <span className="uppercase font-light text-primary mb-3.5 text-xs tracking-widest block">
              Dati Personali
            </span>
            <dl>
              <RiepilogoRow
                label="Nome e cognome"
                value={`${firstName} ${lastName}`}
              />
              <RiepilogoRow
                label="Data di nascita"
                value={birthday ? new Date(birthday).toLocaleDateString() : ""}
              />
              <RiepilogoRow
                label="Luogo di nascita"
                value={birthPlace ? birthPlace : ""}
              />
              <RiepilogoRow
                label="Codice fiscale"
                value={fiscalCode ? fiscalCode : ""}
              />
              <RiepilogoRow label="Email" value={email ? email : ""} />
              <RiepilogoRow
                label="Telefono"
                value={phoneNumber ? phoneNumber : ""}
              />
              <RiepilogoRow label="Indirizzo" value={address ? address : ""} />
            </dl>
          </div>
        </div>
        <div className="py-4 px-5 bg-cream rounded-xl flex flex-col gap-3.5 mb-6">
          <label className="flex gap-3.5 cursor-pointer items-start">
            <div className="relative shrink-0 mt-0.5">
              <input
                {...register("privacyAccepted")}
                type="checkbox"
                className="peer appearance-none w-5 h-5 rounded-md border-2 border-border bg-white cursor-pointer transition-colors duration-200 checked:bg-primary checked:border-primary"
              />
              <IoIosCheckmark className="absolute inset-0 w-5 h-5 pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity duration-200 text-white" />
            </div>
            <p className="text-sm font-light">
              Ho letto e accetto il{" "}
              <a className="text-primary underline" href="/privacy">
                trattamento dei dati personali
              </a>{" "}
              ai sensi del GDPR (Regolamento UE 2016/679). I dati forniti
              saranno utilizzati esclusivamente per la gestione della
              prenotazione.
            </p>
          </label>
          <ErrorSpan errors={errors} inputName="privacyAccepted" />
        </div>
        <div className="flex justify-between">
          <BackButton
            onClickFn={() =>
              navigate({
                from: "/prenota/riepilogo",
                to: "/prenota/dati",
              })
            }
          />
          <NextButton
            text={
              isPending || isSubmitting ? "Caricamento..." : "Invia richiesta"
            }
            disabled={isPending || isSubmitting}
          />
        </div>
      </motion.form>
    </>
  );
};
