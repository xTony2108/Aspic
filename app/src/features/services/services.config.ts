import type { StoreApi, UseBoundStore } from "zustand";
import { ConsulenzaPsicologica } from "../../pages/ConsulenzaPsicologica";
import { ValutazionePsicodiagnostica } from "../../pages/ValutazionePsicodiagnostica";
import {
  useConsulenzaFormStore,
  useValutazioneFormStore,
  type ConsulenzaState,
  type ValutazioneState,
} from "../../store";

export type ServiceId =
  | "consulenza-psicologica"
  | "valutazione-psicodiagnostica";

interface ServiceConfig<T extends Object> {
  component: React.ComponentType<any>;
  label: string;
  serviceType: string;
  store: UseBoundStore<StoreApi<T>>;
}

type ServiceConfigMap = {
  "consulenza-psicologica": ServiceConfig<ConsulenzaState>;
  "valutazione-psicodiagnostica": ServiceConfig<ValutazioneState>;
};

export const SERVIZI_CONFIG: ServiceConfigMap = {
  "consulenza-psicologica": {
    label: "Consulenza Psicologica",
    component: ConsulenzaPsicologica,
    serviceType: "consulenza",
    store: useConsulenzaFormStore,
  },
  "valutazione-psicodiagnostica": {
    label: "Valutazione Psicodiagnostica",
    component: ValutazionePsicodiagnostica,
    serviceType: "valutazione",
    store: useValutazioneFormStore,
  },
};

export const validServiceIds = Object.keys(SERVIZI_CONFIG) as ServiceId[];
