import { ConsulenzaPsicologica } from "../pages/ConsulenzaPsicologica";
import { ValutazionePsicodiagnostica } from "../pages/ValutazionePsicodiagnostica";

export const validServices = [
  "consulenza-psicologica",
  "valutazione-psicodiagnostica",
];

export const serviziMap = {
  "consulenza-psicologica": ConsulenzaPsicologica,
  "valutazione-psicodiagnostica": ValutazionePsicodiagnostica,
} as const;
