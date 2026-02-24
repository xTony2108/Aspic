import { useRouterState } from "@tanstack/react-router";
import { DatiPersonaliConsulenzaForm } from "../components/form/consulenza/DatiPersonaliConsulenzaForm";
import { DatiPersonaliValutazioneForm } from "../components/form/valutazione/DatiPersonaliValutazioneForm";

export const FormDatiPersonali = () => {
  const { pathname } = useRouterState({ select: (s) => s.location });
  const isValutazione = pathname.includes("valutazione");

  return isValutazione ? (
    <DatiPersonaliValutazioneForm />
  ) : (
    <DatiPersonaliConsulenzaForm />
  );
};
