import z from "zod";
import { baseSchema } from "../../features/services/schemas/schemas";

const datiPersonaliSchema = baseSchema.pick({
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
        <p>Nome e cognome</p>
        <p className="text-heading mt-1.5">{`${firstName} ${lastName}`}</p>
      </div>
      <div className="font-semibold">
        <p>Codice fiscale</p>
        <p className="text-heading mt-1.5">{fiscalCode}</p>
      </div>
      <div className="font-semibold">
        <p>Email</p>
        <p className="text-heading mt-1.5">{email}</p>
      </div>
      <div className="font-semibold">
        <p>Numero di telefono</p>
        <p className="text-heading mt-1.5">{phoneNumber}</p>
      </div>
    </div>
  );
};
