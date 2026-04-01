import { z } from "zod";

export const baseSchema = z.object({
  service: z
    .enum(["consulenza-psicologica", "valutazione-psicodiagnostica"], {
      error: "Seleziona il servizio",
    })
    .nullable(),
  appointmentDate: z.string({ error: "Seleziona una data valida" }),
  appointmentTime: z.string({ error: "Seleziona un orario" }),
  urgent: z.boolean({
    error: "Richiesta urgente è di un formato non valido",
  }),
  clientAge: z.string({
    error: "La fascia d'età del cliente è di un formato non valido",
  }),
  clientType: z
    .enum(["bambini", "adulti", "anziani"], {
      error: "Seleziona un tipo di paziente",
    })
    .nullable(),
  reason: z.string({
    error: "Motivo della richiesta è di un formato non valido",
  }),
  firstName: z
    .string({ error: "Inserisci un nome valido" })
    .min(2, { error: "Inserisci un nome valido" }),
  lastName: z
    .string({ error: "Inserisci un cognome valido" })
    .min(2, { error: "Inserisci un cognome valido" }),
  address: z
    .string({ error: "Inserisci un indirizzo valido" })
    .min(5, { error: "Inserisci un indirizzo valido" }),
  birthday: z.string({ error: "Inserisci la data di nascita" }),
  birthPlace: z
    .string({ error: "Inserisci un città valida" })
    .min(2, { error: "Inserisci una città valida" }),
  fiscalCode: z
    .string({
      error: "Inserisci un codice fiscale",
    })
    .min(16, {
      error: "Il codice fiscale inserito contiene meno di 16 caratteri",
    })
    .max(16, {
      error: "Il codice fiscale inserito contiene più di 16 caratteri",
    })
    .toUpperCase()
    .regex(
      /^[A-Z]{6}[0-9]{2}[ABCDEHLMPRST][0-9]{2}[A-Z][0-9]{3}[A-Z]$/,
      "Codice fiscale non valido",
    ),
  email: z.email({ error: "Inserisci un indirizzo email valido" }),
  phoneNumber: z
    .string({ error: "Inserisci un numero di cellulare valido" })
    .regex(/^3\d{9}$/, "Numero di cellulare non valido"),
  privacyAccepted: z.literal(true, {
    error: "Devi accettare il trattamento dei dati per procedere",
  }),
});

export type BaseTypeSchema = z.infer<typeof baseSchema>;

export const loginSchema = z.object({
  email: z.email({ error: "Inserisci un indirizzo email valido" }),
  password: z
    .string({ error: "Inserisci la password" })
    .min(8, "La password deve contenere almeno 8 caratteri")
    .regex(/[A-Z]/, "Deve contenere almeno una lettera maiuscola")
    .regex(/[a-z]/, "Deve contenere almeno una lettera minuscola")
    .regex(/[0-9]/, "Deve contenere almeno un numero")
    .regex(/[^A-Za-z0-9]/, "Deve contenere almeno un carattere speciale"),
});

export type LoginTypeSchema = z.infer<typeof loginSchema>;

export const changePersonalDataDataSchema = z.object({
  firstName: z
    .string({ error: "Inserisci un nome valido" })
    .min(2, { error: "Inserisci un nome valido" }),
  lastName: z
    .string({ error: "Inserisci un cognome valido" })
    .min(2, { error: "Inserisci un cognome valido" }),
  email: z.email({ error: "Inserisci un indirizzo email valido" }),
  phoneNumber: z
    .string({ error: "Inserisci un numero di cellulare valido" })
    .regex(/^3\d{9}$/, "Numero di cellulare non valido"),
});

export type ChangePersonalDataTypeSchema = z.infer<
  typeof changePersonalDataDataSchema
>;

export const changePasswordSchema = z
  .object({
    oldPassword: z.string({ error: "Inserisci la password" }),
    password: z
      .string({ error: "Inserisci la password" })
      .min(8, "La password deve contenere almeno 8 caratteri")
      .regex(/[A-Z]/, "Deve contenere almeno una lettera maiuscola")
      .regex(/[a-z]/, "Deve contenere almeno una lettera minuscola")
      .regex(/[0-9]/, "Deve contenere almeno un numero")
      .regex(/[^A-Za-z0-9]/, "Deve contenere almeno un carattere speciale"),
    confirmPassword: z.string({ error: "Conferma la password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Le password non corrispondono",
    path: ["confirmPassword"],
  });
export type ChangePasswordTypeSchema = z.infer<typeof changePasswordSchema>;
