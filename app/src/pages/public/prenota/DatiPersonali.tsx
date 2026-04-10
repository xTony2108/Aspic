import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "../../../components/form/FormInput";
import { useNavigate } from "@tanstack/react-router";
import { baseSchema } from "../../../features/services/schemas/schemas";
import { useServizioFormStore } from "../../../store";
import { BackButton } from "../../../components/form/BackButton";
import { NextButton } from "../../../components/form/NextButton";
import { ageValidation } from "../../../features/services/schemas/refinements/ageValidation";

const formDatiPersonaliSchema = baseSchema
  .pick({
    firstName: true,
    lastName: true,
    address: true,
    birthday: true,
    birthPlace: true,
    fiscalCode: true,
    phoneNumber: true,
    email: true,
    clientType: true,
    clientAge: true,
  })
  .superRefine(ageValidation);

type FormSchema = z.infer<typeof formDatiPersonaliSchema>;

export const DatiPersonali = () => {
  const navigate = useNavigate();

  const appointmentDate = useServizioFormStore((s) => s.appointmentDate);
  const appointmentTime = useServizioFormStore((s) => s.appointmentTime);

  const urgent = useServizioFormStore((s) => s.urgent);
  const clientAge = useServizioFormStore((s) => s.clientAge);
  const clientType = useServizioFormStore((s) => s.clientType);
  const reason = useServizioFormStore((s) => s.reason);
  const firstName = useServizioFormStore((s) => s.firstName);
  const lastName = useServizioFormStore((s) => s.lastName);
  const address = useServizioFormStore((s) => s.address);
  const birthday = useServizioFormStore((s) => s.birthday);
  const birthPlace = useServizioFormStore((s) => s.birthPlace);
  const fiscalCode = useServizioFormStore((s) => s.fiscalCode);
  const phoneNumber = useServizioFormStore((s) => s.phoneNumber);
  const email = useServizioFormStore((s) => s.email);
  const setData = useServizioFormStore((s) => s.setData);

  const { control, handleSubmit } = useForm<FormSchema>({
    resolver: zodResolver(formDatiPersonaliSchema),
    defaultValues: {
      firstName: firstName || "",
      lastName: lastName || "",
      address: address || "",
      birthday: birthday || "",
      birthPlace: birthPlace || "",
      fiscalCode: fiscalCode || "",
      phoneNumber: phoneNumber || "",
      email: email || "",
      clientAge,
      clientType,
    },
    mode: "onSubmit",
  });

  const onSubmit = async (data: FormSchema) => {
    setData({
      appointmentDate,
      appointmentTime,
      urgent,
      reason,
      ...data,
    });

    navigate({
      from: "/prenota/dati",
      to: "/prenota/riepilogo",
      resetScroll: true,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5 mb-8">
          <div className="flex flex-col gap-5 md:flex-row">
            <div className="flex-1">
              <FormInput
                inputType="text"
                inputName="firstName"
                control={control}
                label="Nome"
                placeholder="Es. Mario"
                required={true}
              />
            </div>
            <div className="flex-1">
              <FormInput
                inputType="text"
                inputName="lastName"
                control={control}
                label="Cognome"
                placeholder="Es. Rossi"
                required={true}
              />
            </div>
          </div>

          <div className="flex flex-col gap-5 md:flex-row">
            <div className="flex-1">
              <FormInput
                inputType="date"
                inputName="birthday"
                control={control}
                label="Data di nascita"
                required={true}
              />
            </div>

            <div className="flex-1">
              <FormInput
                inputType="text"
                inputName="birthPlace"
                control={control}
                label="Luogo di nascita"
                placeholder="Città (Prov)"
                required={true}
              />
            </div>
          </div>

          <div className="flex-1">
            <FormInput
              inputType="tel"
              inputName="phoneNumber"
              control={control}
              label="Numero di telefono"
              required={true}
            />
          </div>

          <div className="flex-1">
            <FormInput
              inputType="text"
              inputName="fiscalCode"
              control={control}
              label="Codice Fiscale"
              placeholder="Codice fiscale"
              required={true}
            />
          </div>

          <div className="flex-1">
            <FormInput
              inputType="email"
              inputName="email"
              control={control}
              label="Email"
              required={true}
            />
          </div>
          <div className="flex-1">
            <FormInput
              inputType="text"
              inputName="address"
              control={control}
              label="Indirizzo di residenza"
              placeholder="Via, Piazza, Civico"
              required={true}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <BackButton
            onClickFn={() =>
              navigate({
                from: "/prenota/dati",
                to: "/prenota/appuntamento",
              })
            }
          />
          <NextButton />
        </div>
      </form>
    </>
  );
};
