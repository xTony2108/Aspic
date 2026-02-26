import { ConsulenzaPsicologica } from "../../pages/ConsulenzaPsicologica";
import { ValutazionePsicodiagnostica } from "../../pages/ValutazionePsicodiagnostica";

export type ServiceId =
  | "consulenza-psicologica"
  | "valutazione-psicodiagnostica";

interface ServiceConfig {
  component: React.ComponentType<any>;
  label: string;
  serviceType: string;
}

export const SERVIZI_CONFIG: Record<ServiceId, ServiceConfig> = {
  "consulenza-psicologica": {
    label: "Consulenza Psicologica",
    component: ConsulenzaPsicologica,
    serviceType: "consulenza",
  },
  "valutazione-psicodiagnostica": {
    label: "Valutazione Psicodiagnostica",
    component: ValutazionePsicodiagnostica,
    serviceType: "valutazione",
  },
};

export const validServiceIds = Object.keys(SERVIZI_CONFIG) as ServiceId[];
