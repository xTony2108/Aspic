import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type z from "zod";
import type { baseSchema } from "./features/services/schemas/schemas";

type FormSchema = z.infer<typeof baseSchema>;

export type ServizioState = Partial<FormSchema> & {
  setData: (data: Partial<FormSchema>) => void;
  clearData: () => void;
};

const initialServizioState: Partial<ServizioState> = {};

export const useServizioFormStore = create<ServizioState>()(
  persist(
    (set) => ({
      setData: (data) => set(data),
      clearData: () => {
        set(initialServizioState);
        useServizioFormStore.persist.clearStorage();
      },
    }),
    {
      name: "servizio",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
