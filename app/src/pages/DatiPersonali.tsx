import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "../components/form/FormInput";
import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { isValidAge } from "../helpers/isValidAge";
import { baseSchema } from "../features/services/schemas/schemas";
import { useServizioFormStore } from "../store";
import { BackButton } from "../components/form/BackButton";
import { NextButton } from "../components/form/NextButton";
import { ErrorSpan } from "../components/form/ErrorSpan";
import { createLazyRoute } from "@tanstack/react-router";

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

  const formDatiPersonaliValutazioneSchema = baseSchema
    .pick({
      firstName: true,
      lastName: true,
      address: true,
      birthday: true,
      birthPlace: true,
      fiscalCode: true,
      phoneNumber: true,
      email: true,
    })
    .superRefine((data, ctx) => {
      const today = new Date();
      const birth = new Date(data.birthday);

      let calcAge = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birth.getDate())
      ) {
        calcAge--;
      }

      if (!data.birthday) {
        ctx.addIssue({
          code: "custom",
          path: ["birthday"],
          message: "Seleziona una data di nascita",
        });
      }

      if (birth >= today) {
        ctx.addIssue({
          code: "custom",
          path: ["birthday"],
          message: "La data selezionata non è valida",
        });
      }

      if (!isValidAge(calcAge, clientType, clientAge)) {
        ctx.addIssue({
          code: "custom",
          path: ["birthday"],
          message: `La data selezionata non è coerente con la fascia d'età selezionata${clientAge && " (" + clientAge + " anni)"}`,
        });
      }
    });

  type FormSchema = z.infer<typeof formDatiPersonaliValutazioneSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formDatiPersonaliValutazioneSchema),
    defaultValues: {
      firstName: firstName || "",
      lastName: lastName || "",
      address: address || "",
      birthday: birthday || "",
      birthPlace: birthPlace || "",
      fiscalCode: fiscalCode || "",
      phoneNumber: phoneNumber || "",
      email: email || "",
    },
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

  useEffect(() => {
    if (
      !appointmentDate ||
      !appointmentTime ||
      !clientType ||
      (clientType == "bambini" && !clientAge)
    ) {
      navigate({
        from: "/prenota/dati",
        to: "/prenota/appuntamento",
        resetScroll: true,
      });
    }
  }, [appointmentDate, appointmentTime, clientAge, clientType]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5 mb-8">
          <div className="flex flex-col gap-5 md:flex-row">
            <div className="flex-1">
              <FormInput
                inputType="text"
                inputName="firstName"
                register={register}
                label="Nome"
                placeholder="Es. Mario"
                required={true}
              />
              <ErrorSpan errors={errors} inputName="firstName" />
            </div>
            <div className="flex-1">
              <FormInput
                inputType="text"
                inputName="lastName"
                register={register}
                label="Cognome"
                placeholder="Es. Rossi"
                required={true}
              />
              <ErrorSpan errors={errors} inputName="lastName" />
            </div>
          </div>

          <div className="flex flex-col gap-5 md:flex-row">
            <div className="flex-1">
              <FormInput
                inputType="date"
                inputName="birthday"
                register={register}
                label="Data di nascita"
                required={true}
              />
              <ErrorSpan errors={errors} inputName="birthday" />
            </div>

            <div className="flex-1">
              <FormInput
                inputType="text"
                inputName="birthPlace"
                register={register}
                label="Luogo di nascita"
                placeholder="Città (Prov)"
                required={true}
              />
              <ErrorSpan errors={errors} inputName="birthPlace" />
            </div>
          </div>

          <div className="flex-1">
            <FormInput
              inputType="tel"
              inputName="phoneNumber"
              register={register}
              label="Numero di telefono"
              required={true}
            />
            <ErrorSpan errors={errors} inputName="phoneNumber" />
          </div>

          <div className="flex-1">
            <FormInput
              inputType="text"
              inputName="fiscalCode"
              register={register}
              label="Codice Fiscale"
              placeholder="Codice fiscale"
              required={true}
            />
            <ErrorSpan errors={errors} inputName="fiscalCode" />
          </div>

          <div className="flex-1">
            <FormInput
              inputType="email"
              inputName="email"
              register={register}
              label="Email"
              required={true}
            />
            <ErrorSpan errors={errors} inputName="email" />
          </div>
          <div className="flex-1">
            <FormInput
              inputType="text"
              inputName="address"
              register={register}
              label="Indirizzo di residenza"
              placeholder="Via, Piazza, Civico"
              required={true}
            />
            <ErrorSpan errors={errors} inputName="address" />
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

export const Route = createLazyRoute("/prenota/dati")({
  component: DatiPersonali,
});
