import { z } from "zod";
import { ageValidation } from "../helpers/ageValidation";

export const baseSchema = z
  .object({
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
    clientType: z.enum(["bambini", "adulti", "anziani"], {
      error: "Seleziona un tipo di paziente",
    }),
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
  })
  .superRefine(ageValidation);

export type BaseTypeSchema = z.infer<typeof baseSchema>;
