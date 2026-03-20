import { useEffect } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import logo from "../assets/logo_aspic_bianco.svg";
import { createEmailVerificationMutationOptions } from "../api/verifyEmail/createEmailVerificationMutationOptions";
import { StateView } from "../components/verifyEmail/StateView";
import { createResendMutationOptions } from "../api/verifyEmail/createResendMutationOptions";

export const AdminVerifica = () => {
  const { token } = useSearch({ strict: false }) as { token?: string };
  const navigate = useNavigate();

  const { isPending, isSuccess, isError, error, mutate } = useMutation(
    createEmailVerificationMutationOptions(token || ""),
  );

  const {
    mutate: resendMutate,
    isSuccess: resendSuccess,
    isPending: resendPending,
    isError: isResendError,
    error: resendError,
  } = useMutation(createResendMutationOptions(token || ""));

  const handleResend = () => {
    resendMutate();
  };

  useEffect(() => {
    mutate();
  }, [token]);

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(
        () => navigate({ from: "/admin/verifica", to: "/admin" }),
        5000,
      );
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  return (
    <div className="min-h-screen bg-sidebar flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary opacity-10 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-blue-mid opacity-8 blur-[80px] pointer-events-none" />

      <div className="w-full max-w-sm relative z-10 flex flex-col items-center">
        <img src={logo} alt="ASPIC Psicologia" className="mb-10" />

        <div className="bg-blue-dark border border-login-border rounded-3xl px-8 py-10 w-full text-center">
          {!token && (
            <StateView
              type="error"
              message={error?.response?.data.message ?? "Link non valido"}
              sub="Controlla l'email ricevuta o contatta l'amministrazione."
            />
          )}

          {token && (isPending || resendPending) && (
            <StateView type="loading" message="Verifica in corso..." />
          )}

          {token && isSuccess && (
            <StateView
              type="success"
              message="Email verificata!"
              sub="Verrai reindirizzato alla pagina di accesso tra pochi secondi."
              action={{
                label: "Vai al login →",
                onClick: () => navigate({ to: "/admin" }),
              }}
            />
          )}

          {token && isError && !resendPending && !resendSuccess && (
            <StateView
              type="error"
              message="Verifica fallita"
              sub={
                isResendError
                  ? resendError.response?.data?.message
                  : (error.response?.data?.message ??
                    "Errore durante la verifica.")
              }
              statusCode={
                isResendError
                  ? resendError.response?.status
                  : error.response?.status
              }
              onResend={handleResend}
            />
          )}

          {token && resendSuccess && (
            <StateView
              type="success"
              message="Email inviata!"
              sub="Controlla la tua casella di posta e clicca sul nuovo link."
            />
          )}
        </div>

        <p className="text-center text-xs text-white/25 mt-6">
          © {new Date().getFullYear()} ASPIC Psicologia Reggio Calabria
        </p>
      </div>
    </div>
  );
};
