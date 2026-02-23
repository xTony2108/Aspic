import type z from "zod";
import { consulenzaSchema } from "./consulenzaSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoMdHome } from "react-icons/io";
import { Button } from "../layout/Button";
import { InfoBox } from "./InfoBox";
import { useConsulenzaFormStore } from "../../store";
import { FormInput } from "./FormInput";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";

const formDatiPersonaliSchema = consulenzaSchema.pick({
  firstName: true,
  lastName: true,
  address: true,
  birthday: true,
  birthPlace: true,
  fiscalCode: true,
  phoneNumber: true,
  email: true,
});

type ConsulenzaDatiPersonaliSchema = z.infer<typeof formDatiPersonaliSchema>;

export const DatiPersonaliForm = () => {
  const appointmentDate = useConsulenzaFormStore(
    (state) => state.appointmentDate,
  );
  const appointmentTime = useConsulenzaFormStore(
    (state) => state.appointmentTime,
  );
  const urgent = useConsulenzaFormStore((state) => state.urgent);
  const clientAge = useConsulenzaFormStore((state) => state.clientAge);
  const clientType = useConsulenzaFormStore((state) => state.clientType);
  const reason = useConsulenzaFormStore((state) => state.reason);

  const firstName = useConsulenzaFormStore((state) => state.firstName);
  const lastName = useConsulenzaFormStore((state) => state.lastName);
  const address = useConsulenzaFormStore((state) => state.address);
  const birthday = useConsulenzaFormStore((state) => state.birthday);
  const birthPlace = useConsulenzaFormStore((state) => state.birthPlace);
  const fiscalCode = useConsulenzaFormStore((state) => state.fiscalCode);
  const phoneNumber = useConsulenzaFormStore((state) => state.phoneNumber);
  const email = useConsulenzaFormStore((state) => state.email);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ConsulenzaDatiPersonaliSchema>({
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
    },
  });

  const setData = useConsulenzaFormStore((state) => state.setData);

  const onSubmit = async (data: ConsulenzaDatiPersonaliSchema) => {
    console.log(data);

    setData({
      appointmentDate,
      appointmentTime,
      urgent,
      clientAge,
      clientType,
      reason,
      ...data,
    });

    navigate({
      from: "/servizi/$servizio/form/dati-personali",
      to: "/servizi/$servizio/form/riepilogo",
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
        from: "/servizi/$servizio/form/dati-personali",
        to: "/servizi/$servizio/form/dati-richiesta",
        resetScroll: true,
      });
    }
  }, [appointmentDate, appointmentTime, clientAge, clientType]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="pt-2">
        <div className="px-4">
          <p className="text-p-small font-semibold text-base">
            Completa il profilo con le tue informazioni anagrafiche
          </p>
          <div className="flex mt-3 gap-4">
            <div className="text-heading text-sm font-semibold flex-1">
              <FormInput
                inputType="text"
                inputName="firstName"
                register={register}
                label="Nome"
                placeholder="Es. Mario"
              />
              {errors && errors?.firstName?.message && (
                <span className="text-warn mt-40">
                  {errors.firstName.message}
                </span>
              )}
            </div>
            <div className="text-heading text-sm font-semibold flex-1">
              <FormInput
                inputType="text"
                inputName="lastName"
                register={register}
                label="Cognome"
                placeholder="Es. Rossi"
              />
              {errors && errors?.lastName?.message && (
                <span className="text-warn">{errors.lastName.message}</span>
              )}
            </div>
          </div>
          <div className="text-heading text-sm font-semibold flex-1 mt-3">
            <label className="block">
              Indirizzo di residenza
              <div className="flex items-center bg-white border border-borderDefault rounded-xl mt-1.5 w-full appearance-none focus-within:outline-1 outline-primary">
                <div className="px-3 shrink-0">
                  <IoMdHome size={24} />
                </div>
                <input
                  {...register("address")}
                  type="text"
                  placeholder="Via, Piazza, Civico"
                  className="bg-white py-3.5 px-1 w-full rounded-xl appearance-none outline-none"
                />
              </div>
            </label>
            {errors && errors?.address?.message && (
              <span className="text-warn">{errors.address.message}</span>
            )}
          </div>
        </div>
        <div className="flex mt-3 gap-4 px-4">
          <div className="text-heading text-sm font-semibold flex-1">
            <FormInput
              inputType="date"
              inputName="birthday"
              register={register}
              label="Data di nascita"
            />
            {errors && errors?.birthday?.message && (
              <span className="text-warn mt-40">{errors.birthday.message}</span>
            )}
          </div>

          <div className="text-heading text-sm font-semibold flex-1">
            <FormInput
              inputType="text"
              inputName="birthPlace"
              register={register}
              label="Luogo di nascita"
              placeholder="Città (Prov)"
            />
            {errors && errors?.birthPlace?.message && (
              <span className="text-warn">{errors.birthPlace.message}</span>
            )}
          </div>
        </div>
        <div className="mt-3 px-4 text-heading text-sm font-semibold flex-1">
          <FormInput
            inputType="text"
            inputName="fiscalCode"
            register={register}
            label="Codice Fiscale"
            placeholder="Codice fiscale"
          />
          {errors && errors?.fiscalCode?.message && (
            <span className="text-warn mt-40">{errors.fiscalCode.message}</span>
          )}
        </div>
        <div className="mt-3 px-4 text-heading text-sm font-semibold flex-1">
          <FormInput
            inputType="tel"
            inputName="phoneNumber"
            register={register}
            label="Numero di telefono"
          />
          {errors && errors?.phoneNumber?.message && (
            <span className="text-warn mt-40">
              {errors.phoneNumber.message}
            </span>
          )}
        </div>
        <div className="mt-3 px-4 text-heading text-sm font-semibold flex-1">
          <FormInput
            inputType="email"
            inputName="email"
            register={register}
            label="Email"
          />
          {errors && errors?.email?.message && (
            <span className="text-warn mt-40">{errors.email.message}</span>
          )}
        </div>
        <div className="px-4 mt-8">
          <InfoBox
            type="info"
            Icon={IoShieldCheckmarkSharp}
            text="I tuoi dati sono trattati nel rispetto della privacy e
            utilizzati esclusivamente per la gestione
            dell'appuntamento."
          />
        </div>
        <div className="sticky bottom-0 bg-bg border-t border-borderDefault p-5">
          <Button
            text="Prossimo Passaggio"
            arrow={true}
            type="submit"
            isSubmitting={isSubmitting}
          />
        </div>
      </form>
    </>
  );
};
