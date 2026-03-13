import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoMdHome } from "react-icons/io";
import { Button } from "../layout/Button";
import { InfoBox } from "./InfoBox";
import { FormInput } from "./FormInput";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { useEffect } from "react";
import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { isValidAge } from "../../helpers/isValidAge";
import { useStore } from "zustand";
import { baseSchema } from "../../features/services/schemas/schemas";

export const FormDatiPersonali = () => {
  const navigate = useNavigate();
  const { config } = getRouteApi("/servizi/$servizio").useRouteContext();

  const appointmentDate = useStore(config.store, (s) => s.appointmentDate);
  const appointmentTime = useStore(config.store, (s) => s.appointmentTime);

  const urgent = useStore(config.store, (s) => s.urgent);
  const clientAge = useStore(config.store, (s) => s.clientAge);
  const clientType = useStore(config.store, (s) => s.clientType);
  const reason = useStore(config.store, (s) => s.reason);
  const firstName = useStore(config.store, (s) => s.firstName);
  const lastName = useStore(config.store, (s) => s.lastName);
  const address = useStore(config.store, (s) => s.address);
  const birthday = useStore(config.store, (s) => s.birthday);
  const birthPlace = useStore(config.store, (s) => s.birthPlace);
  const fiscalCode = useStore(config.store, (s) => s.fiscalCode);
  const phoneNumber = useStore(config.store, (s) => s.phoneNumber);
  const email = useStore(config.store, (s) => s.email);
  const setData = useStore(config.store, (s) => s.setData);

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
    formState: { errors, isSubmitting },
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
      from: "/servizi/$servizio/richiesta-colloquio/dati-personali",
      to: "/servizi/$servizio/richiesta-colloquio/riepilogo",
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
        from: "/servizi/$servizio/richiesta-colloquio/dati-personali",
        to: "/servizi/$servizio/richiesta-colloquio/informazioni",
        resetScroll: true,
      });
    }
  }, [appointmentDate, appointmentTime, clientAge, clientType]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-3">
          <h2>Informazioni anagrafiche</h2>
          <div className="flex gap-4">
            <div className="text-heading text-sm font-semibold flex-1">
              <FormInput
                inputType="text"
                inputName="firstName"
                register={register}
                label="Nome"
                placeholder="Es. Mario"
              />
              {errors && errors?.firstName?.message && (
                <span className="font-semibold text-warn">
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
                <span className="font-semibold text-warn">
                  {errors.lastName.message}
                </span>
              )}
            </div>
          </div>
          <div className="text-heading text-sm font-semibold flex-1">
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
              <span className="font-semibold text-warn">
                {errors.address.message}
              </span>
            )}
          </div>
          <div className="flex gap-4">
            <div className="text-heading text-sm font-semibold flex-1">
              <FormInput
                inputType="date"
                inputName="birthday"
                register={register}
                label="Data di nascita"
              />
              {errors && errors?.birthday?.message && (
                <span className="font-semibold text-warn">
                  {errors.birthday.message}
                </span>
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
                <span className="font-semibold text-warn">
                  {errors.birthPlace.message}
                </span>
              )}
            </div>
          </div>
          <div className="text-heading text-sm font-semibold flex-1">
            <FormInput
              inputType="text"
              inputName="fiscalCode"
              register={register}
              label="Codice Fiscale"
              placeholder="Codice fiscale"
            />
            {errors && errors?.fiscalCode?.message && (
              <span className="font-semibold text-warn">
                {errors.fiscalCode.message}
              </span>
            )}
          </div>
          <div className="text-heading text-sm font-semibold flex-1">
            <FormInput
              inputType="tel"
              inputName="phoneNumber"
              register={register}
              label="Numero di telefono"
            />
            {errors && errors?.phoneNumber?.message && (
              <span className="font-semibold text-warn">
                {errors.phoneNumber.message}
              </span>
            )}
          </div>
          <div className="text-heading text-sm font-semibold flex-1">
            <FormInput
              inputType="email"
              inputName="email"
              register={register}
              label="Email"
            />
            {errors && errors?.email?.message && (
              <span className="font-semibold text-warn">
                {errors.email.message}
              </span>
            )}
          </div>
        </div>
        <div className="mt-8">
          <InfoBox
            type="info"
            Icon={IoShieldCheckmarkSharp}
            text="I tuoi dati sono trattati nel rispetto della privacy e
            utilizzati esclusivamente per la gestione
            dell'appuntamento."
          />
        </div>
        <div className="sticky bottom-0 bg-bg border-t border-borderDefault py-5">
          <Button
            text="Prossimo Passaggio"
            arrow={true}
            isSubmitting={isSubmitting}
          />
        </div>
      </form>
    </>
  );
};
