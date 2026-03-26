import { useLoaderData } from "@tanstack/react-router";
import { DashboardAvatar } from "../DashboardAvatar";
import { useForm } from "react-hook-form";
import {
  accountPersonal,
  type AccountPersonalTypeSchema,
} from "../../../features/services/schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { DashboardAccountInput } from "./DashboardAccountInput";
import { DashboardSubmit } from "../DashboardSubmit";
import { ErrorSpan } from "../../form/ErrorSpan";

export const DashboardAccountDataForm = () => {
  const { userData } = useLoaderData({ from: "/_autenticato" });

  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<AccountPersonalTypeSchema>({
    resolver: zodResolver(accountPersonal),
    defaultValues: {
      email: userData.email ?? "",
      firstName: userData.firstName ?? "",
      lastName: userData.lastName ?? "",
      phoneNumber: userData.phoneNumber ?? "",
    },
  });

  const onSubmit = (data: AccountPersonalTypeSchema) => {};

  return (
    <form
      className="bg-white p-6 rounded-2xl border border-border"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="bg-white font-garamond text-lg font-semibold border-b border-border pb-3 mb-5">
        Dati <em className="text-primary italic">personali</em>
      </div>
      <div className="flex flex-col mb-5">
        <div className="flex gap-5 leading-none">
          <DashboardAvatar
            nameLetter={userData.firstName.charAt(0)}
            size="lg"
          />
          <div className="flex items-center">
            <div className="flex flex-col">
              <div className="font-medium text-form">
                {userData.firstName} {userData.lastName}
              </div>
              <div className="text-xs text-text-muted">Amministratore</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col mb-3.5 gap-3.5">
        <div className="flex flex-col gap-[.4rem] text-form">
          <DashboardAccountInput
            register={register}
            inputName="firstName"
            id="firstName"
            type="text"
            placeholder="Mario"
            label="Nome"
          />
          <ErrorSpan errors={errors} inputName="firstName" />
        </div>
        <div className="flex flex-col gap-[.4rem] text-form">
          <DashboardAccountInput
            register={register}
            inputName="lastName"
            id="lastName"
            type="text"
            placeholder="Rossi"
            label="Cognome"
          />
          <ErrorSpan errors={errors} inputName="lastName" />
        </div>
        <div className="flex flex-col gap-[.4rem] text-form">
          <DashboardAccountInput
            register={register}
            inputName="email"
            id="email"
            type="text"
            placeholder="Mario"
            label="Email"
          />
          <ErrorSpan errors={errors} inputName="email" />
        </div>
        <div className="flex flex-col gap-[.4rem] text-form">
          <DashboardAccountInput
            register={register}
            inputName="phoneNumber"
            id="phoneNumber"
            type="text"
            placeholder="Mario"
            label="Telefono"
          />
          <ErrorSpan errors={errors} inputName="phoneNumber" />
        </div>
      </div>
      <div className="flex justify-end">
        <DashboardSubmit text="Salva modifiche" disabled={!isDirty} />
      </div>
    </form>
  );
};
