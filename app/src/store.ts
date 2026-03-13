import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type z from "zod";
import type { baseSchema } from "./features/services/schemas/schemas";

type FormSchema = z.infer<typeof baseSchema>;

export type ConsulenzaState = Partial<FormSchema> & {
  setData: (data: Partial<FormSchema>) => void;
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

export type ValutazioneState = Partial<FormSchema> & {
  setData: (data: Partial<FormSchema>) => void;
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
