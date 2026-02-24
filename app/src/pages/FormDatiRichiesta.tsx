import { useRouterState } from "@tanstack/react-router";
import { DatiRichiestaConsulenzaForm } from "../components/form/consulenza/DatiRichiestaConsulenzaForm";
import { DatiRichiestaValutazioneForm } from "../components/form/valutazione/DatiRichiestaValutazioneForm";

export const FormDatiRichiesta = () => {
  const { pathname } = useRouterState({ select: (s) => s.location });
  const isValutazione = pathname.includes("valutazione");

  return isValutazione ? (
    <DatiRichiestaValutazioneForm />
  ) : (
    <DatiRichiestaConsulenzaForm />
  );
};
