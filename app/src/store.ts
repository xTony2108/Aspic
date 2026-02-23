import { create } from "zustand";
import type { ConsulenzaTypeSchema } from "./components/form/consulenzaSchema";
import { createJSONStorage, persist } from "zustand/middleware";

type FormState = Partial<ConsulenzaTypeSchema> & {
  setData: (data: Partial<ConsulenzaTypeSchema>) => void;
  clearData: () => void;
};

const initialState: Partial<ConsulenzaTypeSchema> = {};

export const useConsulenzaFormStore = create<FormState>()(
  persist(
    (set) => ({
      setData: (data) => set(data),
      clearData: () => {
        set(initialState);
        useConsulenzaFormStore.persist.clearStorage();
      },
    }),
    {
      name: "consulenza",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
