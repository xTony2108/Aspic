import { z } from "zod";

export const consulenzaSchema = z.object({
  appointmentDate: z.coerce
    .string<string>()
    .nonempty({ error: "Inserisci una data" }),
  appointmentTime: z.string().nonempty({ error: "Inserisci un orario" }),
  urgent: z.boolean(),
  clientType: z.enum(["bambini", "adulti", "anziani"]).nullable(),
  clientAge: z.string(),
  reason: z.string(),
  firstName: z.string().min(2, { error: "Inserisci un nome valido" }),
  lastName: z.string().min(2, { error: "Inserisci un cognome valido" }),
  address: z.string().min(5, { error: "Inserisci un indirizzo valido" }),
  birthday: z.coerce
    .string<string>()
    .nonempty({ error: "Inserisci la data di nascita" }),
  birthPlace: z.string().min(2, { error: "Inserisci una città valida" }),
  fiscalCode: z
    .string()
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
  phoneNumber: z.string().regex(/^3\d{9}$/, "Numero di cellulare non valido"),
});

export type ConsulenzaTypeSchema = z.infer<typeof consulenzaSchema>;
