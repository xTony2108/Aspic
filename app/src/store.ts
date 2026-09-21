import { create } from "zustand";
import type z from "zod";
import type { baseSchema } from "./features/services/schemas/schemas";

type FormSchema = z.infer<typeof baseSchema>;

export type ServizioState = Partial<FormSchema> & {
  setData: (data: Partial<FormSchema>) => void;
  clearItems: (items: (keyof FormSchema)[]) => void;
};

export const useServizioFormStore = create<ServizioState>()((set) => ({
  setData: (data) => set(data),

  clearItems: (items: (keyof FormSchema)[]) => {
    set((state) => {
      const cleared = Object.fromEntries(items.map((k) => [k, undefined]));

      return { ...state, ...cleared };
    });
  },
}));

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
