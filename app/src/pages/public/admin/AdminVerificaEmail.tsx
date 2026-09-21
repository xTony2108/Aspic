import { useEffect, useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import logo from "../../../assets/logo_aspic_bianco.svg";
import {
  activateAccountSchema,
  type ActivateAccountTypeSchema,
} from "../../../features/services/schemas/schemas";
import { createEmailVerificationMutationOptions } from "../../../api/verifyEmail/createEmailVerificationMutationOptions";
import { StateView } from "../../../components/verifyEmail/StateView";
import { createResendMutationOptions } from "../../../api/verifyEmail/createResendMutationOptions";
import { LoginInput } from "../../../components/login/LoginInput";
import { LoginErrorSpan } from "../../../components/login/LoginErrorSpan";
import type { ValidationErrorResponse } from "../../../types/api";

export const AdminVerificaEmail = () => {
  const { token } = useSearch({ strict: false }) as { token?: string };
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string>();
  const [statusCode, setStatusCode] = useState<number>();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ActivateAccountTypeSchema>({
    resolver: zodResolver(activateAccountSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate, isPending, isSuccess } = useMutation(
    createEmailVerificationMutationOptions(token || "", {
      onSuccess: () => {
        setServerError(undefined);
        setStatusCode(undefined);
      },
      onError: (error) => {
        setStatusCode(error.response?.status);

        const data = error.response?.data as
          | ValidationErrorResponse
          | undefined;
        const fieldErrors = data?.errors?.fieldErrors;

        if (fieldErrors?.password?.[0]) {
          setError("password", { message: fieldErrors.password[0] });
        }

        if (fieldErrors?.confirmPassword?.[0]) {
          setError("confirmPassword", {
            message: fieldErrors.confirmPassword[0],
          });
        }

        setServerError(data?.message ?? "Errore durante l'attivazione.");
      },
    }),
  );

  const {
    mutate: resendMutate,
    isSuccess: resendSuccess,
    isPending: resendPending,
    isError: isResendError,
    error: resendError,
  } = useMutation(createResendMutationOptions(token || ""));

  const onSubmit = (data: ActivateAccountTypeSchema) => {
    setServerError(undefined);
    setStatusCode(undefined);
    mutate(data);
  };

  const handleResend = () => {
    resendMutate();
  };

  return (
    <main className="min-h-screen bg-sidebar flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary opacity-10 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-blue-mid opacity-8 blur-[80px] pointer-events-none" />

      <div className="w-full max-w-sm relative z-10 flex flex-col items-center">
        <div className="bg-blue-dark border border-login-border rounded-3xl px-8 py-10 w-full text-center">
          <div className="mb-6">
            <img
              src={logo}
              alt="logo aspic reggio calabria"
              fetchPriority="high"
              width={320}
            />
          </div>
          {!token && (
            <StateView
              type="error"
              message="Link non valido"
              sub="Controlla l'email ricevuta o contatta l'amministrazione."
            />
          )}

          {token && resendPending && (
            <StateView type="loading" message="Invio nuovo link in corso..." />
          )}

          {token && isSuccess && (
            <StateView
              type="success"
              message="Account attivato!"
              sub="Ora puoi accedere con la password che hai appena impostato."
              action={{
                label: "Vai al login ->",
                onClick: () => navigate({ to: "/admin" }),
              }}
            />
          )}

          {token && resendSuccess && (
            <StateView
              type="success"
              message="Email inviata!"
              sub="Controlla la tua casella di posta e usa il nuovo link di attivazione."
            />
          )}

          {token && !isSuccess && !resendSuccess && !resendPending && (
            <>
              <div className="mb-6">
                <h2 className="font-garamond text-2xl text-white">
                  Attiva account
                </h2>
                <p className="text-sm text-white/40 leading-relaxed mt-2">
                  Imposta la tua password personale per completare
                  l'attivazione.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="text-left">
                <div className="mb-4.5">
                  <LoginInput
                    id="password"
                    type="password"
                    control={control}
                    inputName="password"
                    placeholder="••••••••"
                    label="Password"
                  />
                  <LoginErrorSpan errors={errors} inputName="password" />
                </div>

                <div className="mb-4.5">
                  <LoginInput
                    id="confirmPassword"
                    type="password"
                    control={control}
                    inputName="confirmPassword"
                    placeholder="••••••••"
                    label="Conferma password"
                  />
                  <LoginErrorSpan errors={errors} inputName="confirmPassword" />
                </div>

                <button
                  className="w-full mt-2 bg-primary p-3.5 rounded-xl text-form cursor-pointer font-medium text-white hover:bg-blue-mid hover:-translate-y-px transition-all duration-200 disabled:opacity-60"
                  type="submit"
                  disabled={isPending}
                >
                  {isPending ? "Attivazione..." : "Attiva account"}
                </button>
              </form>

              {serverError && (
                <div className="mt-4">
                  <StateView
                    type="error"
                    message="Attivazione fallita"
                    sub={
                      isResendError
                        ? resendError.response?.data?.message
                        : serverError
                    }
                    statusCode={statusCode}
                    onResend={handleResend}
                  />
                </div>
              )}
            </>
          )}
        </div>

        <p className="text-center text-xs text-white/25 mt-6">
          © {new Date().getFullYear()} ASPIC Psicologia Reggio Calabria
        </p>
      </div>
    </main>
  );
};
