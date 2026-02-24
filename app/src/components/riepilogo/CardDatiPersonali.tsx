import z from "zod";
import { consulenzaSchema } from "../form/consulenzaSchema";

const datiPersonaliSchema = consulenzaSchema.pick({
  firstName: true,
  lastName: true,
  fiscalCode: true,
  email: true,
  phoneNumber: true,
});

type DatiPersonaliSchema = z.infer<typeof datiPersonaliSchema>;

export const CardDatiPersonali = ({
  firstName,
  lastName,
  fiscalCode,
  email,
  phoneNumber,
}: DatiPersonaliSchema) => {
  return (
    <div className="rounded-2xl flex flex-col space-y-5 bg-white p-5 drop-shadow-lg">
      <div className="font-semibold">
        <p>NOME E COGNOME</p>
        <p className="text-heading mt-1.5">{`${firstName} ${lastName}`}</p>
      </div>
      <div className="font-semibold">
        <p>CODICE FISCALE</p>
        <p className="text-heading mt-1.5">{fiscalCode}</p>
      </div>
      <div className="font-semibold">
        <p>EMAIL</p>
        <p className="text-heading mt-1.5">{email}</p>
      </div>
      <div className="font-semibold">
        <p>NUMERO DI TELEFONO</p>
        <p className="text-heading mt-1.5">{phoneNumber}</p>
      </div>
    </div>
  );
};
