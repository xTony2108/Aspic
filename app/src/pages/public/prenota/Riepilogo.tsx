import { useServizioFormStore } from "../../../store";
import { useEffect } from "react";
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

export const Riepilogo = () => {
  const navigate = useNavigate();

  type FormSchema = z.infer<typeof baseSchema>;

  const service = useServizioFormStore((s) => s.service);

  const clientType = useServizioFormStore((s) => s.clientType);
  const clientAge = useServizioFormStore((s) => s.clientAge);
  const appointmentDate = useServizioFormStore((s) => s.appointmentDate);
  const appointmentTime = useServizioFormStore((s) => s.appointmentTime);
  const firstName = useServizioFormStore((s) => s.firstName);
  const lastName = useServizioFormStore((s) => s.lastName);
  const address = useServizioFormStore((s) => s.address);
  const birthday = useServizioFormStore((s) => s.birthday);
  const birthPlace = useServizioFormStore((s) => s.birthPlace);
  const fiscalCode = useServizioFormStore((s) => s.fiscalCode);
  const phoneNumber = useServizioFormStore((s) => s.phoneNumber);
  const email = useServizioFormStore((s) => s.email);
  const urgent = useServizioFormStore((s) => s.urgent);
  const reason = useServizioFormStore((s) => s.reason);
  const privacyAccepted = useServizioFormStore((s) => s.privacyAccepted);

  const clearData = useServizioFormStore((s) => s.clearData);
  const {
    handleSubmit,
    register,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(baseSchema),
    defaultValues: {
      service,
      reason,
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
      privacyAccepted,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["appointments"],
    mutationFn: (data: FormSchema) => axios.post("/api/bookings", data),
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const fieldErrors = error.response?.data?.errors?.fieldErrors;
        const message = error.response?.data?.message;

        if (fieldErrors) {
          Object.entries(fieldErrors).forEach(([field, messages]) => {
            setError(field as keyof FormSchema, {
              message: (messages as string[])[0],
            });
          });

          const step1Fields = ["service"];

          const step2Fields = [
            "appointmentDate",
            "appointmentTime",
            "clientType",
            "clientAge",
            "urgent",
            "reason",
          ];
          const step3Fields = [
            "firstName",
            "lastName",
            "birthday",
            "birthPlace",
            "fiscalCode",
            "email",
            "phoneNumber",
            "address",
          ];

          if (step1Fields.some((f) => fieldErrors[f])) {
            navigate({ from: "/prenota/riepilogo", to: "/prenota/servizio" });
          } else if (step2Fields.some((f) => fieldErrors[f])) {
            navigate({
              from: "/prenota/riepilogo",
              to: "/prenota/appuntamento",
            });
          } else if (step3Fields.some((f) => fieldErrors[f])) {
            navigate({ from: "/prenota/riepilogo", to: "/prenota/dati" });
          }
        }

        if (message) {
          setError("root.serverError", { message });
        }
      }
    },
    onSuccess: () => {
      navigate({
        from: "/prenota/riepilogo",
        to: "/prenota/successo",
        resetScroll: true,
      });

      clearData();
    },
  });

  const onSubmit = (data: FormSchema) => {
    mutate(data);
  };

  const hasHydrated = useServizioFormStore.persist.hasHydrated();

  const appuntamentoValid =
    appointmentDate &&
    appointmentTime &&
    clientType &&
    (clientType !== "bambini" || clientAge);

  const datiValid =
    firstName &&
    lastName &&
    address &&
    birthday &&
    birthPlace &&
    fiscalCode &&
    phoneNumber &&
    email;

  useEffect(() => {
    if (!hasHydrated) return;

    if (!service) navigate({ to: "/prenota/servizio" });

    if (!appuntamentoValid) {
      navigate({ to: "/prenota/appuntamento" });
    }

    if (!datiValid) {
      navigate({ to: "/prenota/dati" });
    }
  }, [hasHydrated, service, appuntamentoValid, datiValid]);

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
          <InfoBox
            Icon={IoWarningOutline}
            text={<>{errors.root.serverError.message}</>}
          />
        )}
        <div className="bg-white border border-border rounded-2xl mb-6">
          <div className="px-5 py-6 border-b border-border">
            <span className="uppercase font-medium text-primary mb-3.5 text-xs tracking-widest block">
              Servizio richiesto
            </span>
            <span className="font-garamond font-semibold text-lg text-text block">
              {getServiceLabel(service!)}
            </span>
          </div>
          <div className="px-5 py-6 border-b border-border">
            <span className="uppercase font-medium text-primary mb-3.5 text-xs tracking-widest block">
              Appuntamento
            </span>
            <dl>
              <RiepilogoRow
                label="Data"
                value={new Date(appointmentDate!).toLocaleDateString()}
              />
              <RiepilogoRow label="Ora" value={appointmentTime!} />
              <RiepilogoRow
                label="Tipo paziente"
                value={getClientTypeLabel(clientType!)}
              />
              {clientAge && (
                <RiepilogoRow label="Fascia d'età" value={clientAge!} />
              )}

              {reason && <RiepilogoRow label="Note" value={reason!} />}
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
                value={new Date(birthday!).toLocaleDateString()}
              />
              <RiepilogoRow label="Luogo di nascita" value={birthPlace!} />
              <RiepilogoRow label="Codice fiscale" value={fiscalCode!} />
              <RiepilogoRow label="Email" value={email!} />
              <RiepilogoRow label="Telefono" value={phoneNumber!} />
              <RiepilogoRow label="Indirizzo" value={address!} />
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
