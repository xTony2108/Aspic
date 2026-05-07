import { z } from "zod";

export const baseSchema = z.object({
  service: z
    .enum(["consulenza-psicologica", "valutazione-psicodiagnostica"], {
      error: "Seleziona il servizio",
    })
    .nullable(),
  appointmentDate: z.coerce.date({ error: "Seleziona una data valida" }),
  appointmentTime: z
    .string({ error: "Seleziona un orario" })
    .nonempty({ error: "Seleziona un orario" }),
  appointmentMode: z.enum(["online", "in_person"], {
    error: "Seleziona una modalità",
  }),
  urgent: z.boolean({
    error: "Richiesta urgente è di un formato non valido",
  }),
  clientAge: z
    .enum(["0-3", "4-11", "12-14", "15-18"], {
      error: "Seleziona la fascia d'età",
    })
    .nullable(),
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
    .length(16, "Il codice fiscale deve essere di 16 caratteri")
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

export const changeDateSchema = z.object({
  newDate: z.coerce
    .date({
      error: "Seleziona una data valida",
    })
    .min(new Date(new Date().setHours(0, 0, 0, 0)), {
      error: "Seleziona una data valida",
    }),
  newTime: z
    .string({ error: "Seleziona un orario" })
    .nonempty({ error: "Seleziona un orario" }),
});

export type ChangeDateTypeSchema = z.infer<typeof changeDateSchema>;

export const registerProfessionalSchema = z.object({
  firstName: z.string().min(2, "Campo obbligatorio"),
  lastName: z.string().min(2, "Campo obbligatorio"),
  email: z.email("Email non valida"),
  fiscalCode: z
    .string()
    .length(16, "Il codice fiscale deve essere di 16 caratteri")
    .toUpperCase()
    .regex(
      /^[A-Z]{6}[0-9]{2}[ABCDEHLMPRST][0-9]{2}[A-Z][0-9]{3}[A-Z]$/,
      "Codice fiscale non valido",
    ),
  phoneNumber: z
    .string({ error: "Inserisci un numero di cellulare valido" })
    .regex(/^3\d{9}$/, "Numero di cellulare non valido"),
  createdBy: z.string(),
});

export type RegisterProfessionalTypeSchema = z.infer<
  typeof registerProfessionalSchema
>;

export const stripeSearchSchema = z.object({
  action: z.enum(["return", "refresh"]).optional(),
});
