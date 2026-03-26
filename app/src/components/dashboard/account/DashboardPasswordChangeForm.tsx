import { useForm } from "react-hook-form";
import {
  passwordChange,
  type PasswordChangeTypeSchema,
} from "../../../features/services/schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { DashboardAccountInput } from "./DashboardAccountInput";
import { DashboardSubmit } from "../DashboardSubmit";
import { ErrorSpan } from "../../form/ErrorSpan";

export const DashboardPasswordChangeForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<PasswordChangeTypeSchema>({
    resolver: zodResolver(passwordChange),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: PasswordChangeTypeSchema) => {};

  return (
    <form
      className="bg-white p-6 rounded-2xl border border-border"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="bg-white font-garamond text-lg font-semibold border-b border-border pb-3 mb-5">
        Cambio <em className="text-primary italic">password</em>
      </div>
      <div className="flex flex-col mb-3.5 gap-3.5">
        <div className="flex flex-col gap-[.4rem] text-form">
          <DashboardAccountInput
            register={register}
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
            register={register}
            inputName="newPassword"
            id="newPassword"
            type="password"
            placeholder="••••••••"
            label="Nuova password"
          />
          <ErrorSpan errors={errors} inputName="newPassword" />
        </div>
        <div className="flex flex-col gap-[.4rem] text-form">
          <DashboardAccountInput
            register={register}
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
        <DashboardSubmit text="Salva modifiche" disabled={!isDirty} />
      </div>
    </form>
  );
};
