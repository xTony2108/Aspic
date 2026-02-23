import { SectionTitle } from "../components/layout/SectionTitle";
import { CardDettaglioRiepilogo } from "../components/riepilogo/CardDettaglioRiepilogo";
import { RiMentalHealthFill } from "react-icons/ri";
import { useConsulenzaFormStore } from "../store";
import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { CardDatiPersonali } from "../components/riepilogo/CardDatiPersonali";
import { InfoBox } from "../components/form/InfoBox";
import { BsInfoCircle } from "react-icons/bs";
import { CheckPrivacy } from "../components/form/CheckPrivacy";
import { Button } from "../components/layout/Button";
import { consulenzaSchema } from "../components/form/consulenzaSchema";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type ConsulenzaDatiRichiestaFormSchema = z.infer<typeof consulenzaSchema>;

export const Riepilogo = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ConsulenzaDatiRichiestaFormSchema>({
    resolver: zodResolver(consulenzaSchema),
  });

  const clientType = useConsulenzaFormStore((state) => state.clientType);
  const clientAge = useConsulenzaFormStore((state) => state.clientAge);
  const appointmentDate = useConsulenzaFormStore(
    (state) => state.appointmentDate,
  );
  const appointmentTime = useConsulenzaFormStore(
    (state) => state.appointmentTime,
  );

  const firstName = useConsulenzaFormStore((state) => state.firstName);
  const lastName = useConsulenzaFormStore((state) => state.lastName);
  const address = useConsulenzaFormStore((state) => state.address);
  const birthday = useConsulenzaFormStore((state) => state.birthday);
  const birthPlace = useConsulenzaFormStore((state) => state.birthPlace);
  const fiscalCode = useConsulenzaFormStore((state) => state.fiscalCode);
  const phoneNumber = useConsulenzaFormStore((state) => state.phoneNumber);
  const email = useConsulenzaFormStore((state) => state.email);

  const urgent = useConsulenzaFormStore((state) => state.urgent);

  const hasHydrated = useConsulenzaFormStore.persist.hasHydrated();

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
      <section>
        <div className="px-5 mb-4">
          <h2>Dettagli Prenotazione</h2>
          <p>Verifica i dati della tua richiesta prima di inviarla</p>
        </div>
        <div className="px-5 py-4">
          <CardDettaglioRiepilogo
            title="Consulenza Psicologica"
            Icon={RiMentalHealthFill}
            clientType={clientType ?? null}
            clientAge={clientAge ?? ""}
            appointmentDate={appointmentDate ?? ""}
            appointmentTime={appointmentTime ?? ""}
            urgent={urgent ?? false}
            price="80,00"
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
    </>
  );
};
