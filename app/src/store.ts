import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type z from "zod";
import type { baseSchema } from "./features/services/schemas/schemas";

type FormSchema = z.infer<typeof baseSchema>;

export type ServizioState = Partial<FormSchema> & {
  setData: (data: Partial<FormSchema>) => void;
  clearData: () => void;
  clearItems: (items: (keyof FormSchema)[]) => void;
  _hydrated: boolean;
};

const initialServizioState: Partial<ServizioState> = {
  service: null,
  appointmentDate: undefined,
  appointmentTime: undefined,
  urgent: undefined,
  clientAge: undefined,
  clientType: undefined,
  reason: undefined,
  firstName: undefined,
  lastName: undefined,
  address: undefined,
  birthday: undefined,
  birthPlace: undefined,
  fiscalCode: undefined,
  email: undefined,
  phoneNumber: undefined,
  privacyAccepted: undefined,
};

export const useServizioFormStore = create<ServizioState>()(
  persist(
    (set) => ({
      setData: (data) => set(data),
      clearData: () => {
        set(initialServizioState);

        useServizioFormStore.persist.clearStorage();
      },
      clearItems: (items: (keyof FormSchema)[]) => {
        set((state) => {
          const cleared = Object.fromEntries(items.map((k) => [k, undefined]));

          return { ...state, ...cleared };
        });
      },
      _hydrated: false,
    }),
    {
      name: "servizio",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) state._hydrated = true;
      },
    },
  ),
);

type AuthData = {
  accessToken?: string;
};

export type AuthState = AuthData & {
  setData: (data: AuthData) => void;
  clearData: () => void;
};

export const useAuthStore = create<AuthState>()((set) => ({
  accessToken: undefined,
  setData: (data) => set(data),
  clearData: () => {
    set({ accessToken: undefined });
  },
}));
