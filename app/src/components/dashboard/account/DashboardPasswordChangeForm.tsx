import { useForm } from "react-hook-form";
import {
  changePasswordSchema,
  type ChangePasswordTypeSchema,
} from "../../../features/services/schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { DashboardAccountInput } from "./DashboardAccountInput";
import { DashboardSubmit } from "../DashboardSubmit";
import { ErrorSpan } from "../../form/ErrorSpan";
import { useMutation } from "@tanstack/react-query";
import { createChangePasswordMutationOptions } from "../../../api/dashboard/profile/createChangePasswordMutationOptions";
import { DasbhoardAccountFormTitle } from "./DasbhoardAccountFormTitle";
import { DashboardAlert } from "./DashboardAlert";

export const DashboardPasswordChangeForm = () => {
  const {
    handleSubmit,
    formState: { isDirty, errors },
    control,
    reset: resetForm,
  } = useForm<ChangePasswordTypeSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate, isSuccess, data, isError, error, isPending, reset } =
    useMutation(
      createChangePasswordMutationOptions({
        onSuccess: () => {
          resetForm();
          setTimeout(() => reset(), 2000);
        },
      }),
    );

  const onSubmit = (data: ChangePasswordTypeSchema) => {
    mutate(data);
  };

  return (
    <>
      <form
        className="bg-white p-6 rounded-2xl border border-border"
        onSubmit={handleSubmit(onSubmit)}
      >
        <DasbhoardAccountFormTitle title="Cambio" titleEm="password" />

        <div className="flex flex-col mb-3.5 gap-3.5">
          <div className="flex flex-col gap-[.4rem] text-form">
            <DashboardAccountInput
              control={control}
              inputName="oldPassword"
              id="oldPassword"
              type="password"
              placeholder="••••••••"
              label="Password attuale"
            />
            <ErrorSpan errors={errors} inputName="oldPassword" />
          </div>
          <div className="flex flex-col gap-[.4rem] text-form">
            <DashboardAccountInput
              control={control}
              inputName="password"
              id="password"
              type="password"
              placeholder="••••••••"
              label="Nuova password"
            />
            <ErrorSpan errors={errors} inputName="password" />
          </div>
          <div className="flex flex-col gap-[.4rem] text-form">
            <DashboardAccountInput
              control={control}
              inputName="confirmPassword"
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              label="Conferma nuova password"
            />
            <ErrorSpan errors={errors} inputName="confirmPassword" />
          </div>
        </div>
        <div className="flex justify-end">
          <DashboardSubmit
            type="submit"
            text="Salva modifiche"
            disabled={!isDirty || isPending || isSuccess}
          />
        </div>
        {isSuccess && (
          <DashboardAlert type="success" text={`✓ ${data?.message}`} />
        )}

        {isError && (
          <DashboardAlert
            type="error"
            text={`✕ ${error?.response?.data.message}`}
          />
        )}
      </form>
    </>
  );
};
