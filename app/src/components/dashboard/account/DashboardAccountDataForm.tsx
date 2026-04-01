import { DashboardAvatar } from "../DashboardAvatar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DashboardAccountInput } from "./DashboardAccountInput";
import { DashboardSubmit } from "../DashboardSubmit";
import { ErrorSpan } from "../../form/ErrorSpan";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { createGetUserDataQueryOptions } from "../../../api/admin/getUserData";
import {
  changePersonalDataDataSchema,
  type ChangePersonalDataTypeSchema,
} from "../../../features/services/schemas/schemas";
import { createChangePersonalDataMutationOptions } from "../../../api/dashboard/createChangePersonalDataMutationOptions";
import { queryClient } from "../../../queryClient";
import { DasbhoardAccountFormTitle } from "./DasbhoardAccountFormTitle";
import { DashboardAlert } from "./DashboardAlert";

export const DashboardAccountDataForm = () => {
  const {
    data: { userData },
  } = useSuspenseQuery(createGetUserDataQueryOptions());

  const {
    control,
    handleSubmit,
    formState: { isDirty, errors, isValid },
  } = useForm<ChangePersonalDataTypeSchema>({
    resolver: zodResolver(changePersonalDataDataSchema),
    values: {
      email: userData.email ?? "",
      firstName: userData.firstName ?? "",
      lastName: userData.lastName ?? "",
      phoneNumber: userData.phoneNumber ?? "",
    },
    mode: "onChange",
  });

  const { mutate, isSuccess, isPending, reset } = useMutation(
    createChangePersonalDataMutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: createGetUserDataQueryOptions().queryKey,
        });
        setTimeout(() => reset(), 2000);
      },
    }),
  );

  const onSubmit = (data: ChangePersonalDataTypeSchema) => {
    mutate(data);
  };

  return (
    <form
      className="bg-white p-6 rounded-2xl border border-border"
      onSubmit={handleSubmit(onSubmit)}
    >
      <DasbhoardAccountFormTitle title="Dati" titleEm="personali" />

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
            control={control}
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
            control={control}
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
            control={control}
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
            control={control}
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
        <DashboardSubmit
          text="Salva modifiche"
          disabled={!isDirty || isPending || isSuccess || !isValid}
        />
      </div>
      {isSuccess && (
        <DashboardAlert type="success" text="✓ Dati aggiornati con successo." />
      )}
    </form>
  );
};
