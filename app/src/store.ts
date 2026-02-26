import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createExtendedSchema } from "./features/services/schemas/createExtendedSchema";
import type z from "zod";

const extendedConsulenzaSchema = createExtendedSchema("consulenza");

type ConsulenzaSchema = z.infer<typeof extendedConsulenzaSchema>;

export type ConsulenzaState = Partial<ConsulenzaSchema> & {
  setData: (data: Partial<ConsulenzaSchema>) => void;
  clearData: () => void;
};

const initialConsulenzaState: Partial<ConsulenzaState> = {};

export const useConsulenzaFormStore = create<ConsulenzaState>()(
  persist(
    (set) => ({
      setData: (data) => set(data),
      clearData: () => {
        set(initialConsulenzaState);
        useConsulenzaFormStore.persist.clearStorage();
      },
    }),
    {
      name: "consulenza",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

const extendedValutazioneSchema = createExtendedSchema("consulenza");

type ValutazioneSchema = z.infer<typeof extendedValutazioneSchema>;

export type ValutazioneState = Partial<ValutazioneSchema> & {
  setData: (data: Partial<ValutazioneSchema>) => void;
  clearData: () => void;
};

const initialValutazioneState: Partial<ValutazioneState> = {};

export const useValutazioneFormStore = create<ValutazioneState>()(
  persist(
    (set) => ({
      setData: (data) => set(data),
      clearData: () => {
        set(initialValutazioneState);
        useValutazioneFormStore.persist.clearStorage();
      },
    }),
    {
      name: "valutazione",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
