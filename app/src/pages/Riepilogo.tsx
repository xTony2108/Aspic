import { CardDettaglioRiepilogo } from "../components/riepilogo/CardDettaglioRiepilogo";
import { RiMentalHealthFill } from "react-icons/ri";
import { useConsulenzaFormStore, useValutazioneFormStore } from "../store";
import { useEffect } from "react";
import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { CardDatiPersonali } from "../components/riepilogo/CardDatiPersonali";
import { InfoBox } from "../components/form/InfoBox";
import { BsInfoCircle } from "react-icons/bs";
import { CheckPrivacy } from "../components/form/CheckPrivacy";
import { Button } from "../components/layout/Button";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaClipboardUser } from "react-icons/fa6";
import { createExtendedSchema } from "../features/services/schemas/createExtendedSchema";
import { useStore } from "zustand";

export const Riepilogo = () => {
  const navigate = useNavigate();
  const { config } = getRouteApi("/servizi/$servizio").useRouteContext();
  const service = config.serviceType;
  const label = config.label;
  const store = useStore(config.store);

  const isValutazione = service === "valutazione";

  const extendedSchema = createExtendedSchema(service);

  type FormSchema = z.infer<typeof extendedSchema>;

  const {
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
  } = store;

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormSchema>({
    resolver: zodResolver(extendedSchema),
    defaultValues: store,
  });

  const onSubmit = async (data: FormSchema) => {
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  const hasHydrated = isValutazione
    ? useValutazioneFormStore.persist.hasHydrated()
    : useConsulenzaFormStore.persist.hasHydrated();

  const dataValid =
    appointmentDate &&
    appointmentTime &&
    clientType &&
    (clientType !== "bambini" || clientAge) &&
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

    if (!dataValid) {
      navigate({ to: ".." });
    }
  }, [hasHydrated, dataValid]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="pt-2">
        <div className="px-5 mb-4">
          <p className="text-base font-semibold">
            Verifica i dati della tua richiesta prima di inviarla
          </p>
        </div>
        <div className="px-5 py-4">
          <CardDettaglioRiepilogo
            title={label}
            Icon={isValutazione ? FaClipboardUser : RiMentalHealthFill}
            clientType={clientType ?? ""}
            clientAge={clientAge ?? ""}
            appointmentDate={appointmentDate ?? ""}
            appointmentTime={appointmentTime ?? ""}
            urgent={urgent ?? false}
            price={isValutazione ? "120,00" : "80,00"}
          />
        </div>

        <div className="px-5 py-4">
          <p className="font-semibold text-base py-4">I tuoi dati</p>
          <CardDatiPersonali
            firstName={firstName ?? ""}
            lastName={lastName ?? ""}
            fiscalCode={fiscalCode ?? ""}
            email={email ?? ""}
            phoneNumber={phoneNumber ?? ""}
          />
        </div>

        <div className="px-5 py-4">
          <InfoBox
            Icon={BsInfoCircle}
            text="La richiesta non prevede il
            pagamento immediato. Una volta
            confermato l'appuntamento,
            riceverai via mail tutti i dettagli e un
            link sicuro per procedere con il
            pagamento."
            type="info"
          />
        </div>
        <div className="px-4 mb-4">
          <Button
            type="submit"
            isSubmitting={isSubmitting}
            text="Invia Richiesta"
          />
        </div>
        <div className="text-center pb-4 px-4">
          <CheckPrivacy />
        </div>
      </form>
    </>
  );
};
