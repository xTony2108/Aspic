import { SectionTitle } from "../components/layout/SectionTitle";
import { CardDettaglioRiepilogo } from "../components/riepilogo/CardDettaglioRiepilogo";
import { RiMentalHealthFill } from "react-icons/ri";
import { useConsulenzaFormStore, useValutazioneFormStore } from "../store";
import { useEffect } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { CardDatiPersonali } from "../components/riepilogo/CardDatiPersonali";
import { InfoBox } from "../components/form/InfoBox";
import { BsInfoCircle } from "react-icons/bs";
import { CheckPrivacy } from "../components/form/CheckPrivacy";
import { Button } from "../components/layout/Button";
import { consulenzaSchema } from "../components/form/consulenzaSchema";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { valutazioneSchema } from "../components/form/valutazioneSchema";
import { FaClipboardUser } from "react-icons/fa6";

type FormSchema =
  | z.infer<typeof consulenzaSchema>
  | z.infer<typeof valutazioneSchema>;

export const Riepilogo = () => {
  const { pathname } = useRouterState({ select: (s) => s.location });
  const navigate = useNavigate();

  const isValutazione = pathname.includes("valutazione");

  const schema = isValutazione ? consulenzaSchema : valutazioneSchema;

  const consulenzaStore = useConsulenzaFormStore();
  const valutazioneStore = useValutazioneFormStore();

  const store = isValutazione ? valutazioneStore : consulenzaStore;

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
    resolver: zodResolver(schema),
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
      <SectionTitle
        text="Riepilogo"
        backArrow={true}
        backArrowPath="../dati-personali"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <section>
          <div className="px-5 mb-4">
            <h2>Dettagli Prenotazione</h2>
            <p>Verifica i dati della tua richiesta prima di inviarla</p>
          </div>
          <div className="px-5 py-4">
            <CardDettaglioRiepilogo
              title={
                isValutazione
                  ? "Valutazione Psicodiagnostica"
                  : "Consulenza Psicologica"
              }
              Icon={isValutazione ? FaClipboardUser : RiMentalHealthFill}
              clientType={clientType ?? null}
              clientAge={clientAge ?? ""}
              appointmentDate={appointmentDate ?? ""}
              appointmentTime={appointmentTime ?? ""}
              urgent={urgent ?? false}
              price={isValutazione ? "120,00" : "80,00"}
            />
          </div>

          <div className="px-5 py-4">
            <p className="font-bold text-base py-4">I TUOI DATI</p>
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
        </section>
      </form>
    </>
  );
};
