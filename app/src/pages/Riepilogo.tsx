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
import { useStore } from "zustand";
import { baseSchema } from "../features/services/schemas/schemas";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const Riepilogo = () => {
  const navigate = useNavigate();
  const { config } = getRouteApi("/servizi/$servizio").useRouteContext();
  const service = config.serviceType;
  const label = config.label;
  const store = useStore(config.store);

  const isValutazione = service === "valutazione";

  type FormSchema = z.infer<typeof baseSchema>;

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
    resolver: zodResolver(baseSchema),
    defaultValues: store,
  });

  // const { mutate, error, failureReason } = useMutation({
  //   mutationKey: ["appointments"],
  //   mutationFn: (data) => axios.post("/api/appointments/consulenza", data),
  // });

  const onSubmit = (data: FormSchema) => {
    console.log(data);

    // mutate(data);
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <h2>Verifica i dati della tua richiesta prima di inviarla</h2>
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

          <h3>I tuoi dati</h3>
          <CardDatiPersonali
            firstName={firstName ?? ""}
            lastName={lastName ?? ""}
            fiscalCode={fiscalCode ?? ""}
            email={email ?? ""}
            phoneNumber={phoneNumber ?? ""}
          />

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
          <Button isSubmitting={isSubmitting} text="Invia Richiesta" />
          <div className="text-center pb-4">
            <CheckPrivacy />
          </div>
        </div>
      </form>
    </>
  );
};
