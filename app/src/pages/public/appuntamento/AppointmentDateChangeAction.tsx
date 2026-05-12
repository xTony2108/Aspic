import { useMutation } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import logo from "../../../assets/logo_aspic.svg";
import { createConfirmDateChangeMutationOptions } from "../../../api/appointmentDateChange/createConfirmDateChangeMutationOptions";
import { createRejectDateChangeMutationOptions } from "../../../api/appointmentDateChange/createRejectDateChangeMutationOptions";

interface AppointmentDateChangeActionProps {
  action: "confirm" | "reject";
}

export const AppointmentDateChangeAction = ({
  action,
}: AppointmentDateChangeActionProps) => {
  const { token } = useSearch({ strict: false }) as { token?: string };
  const navigate = useNavigate();

  const mutation = useMutation(
    action === "confirm"
      ? createConfirmDateChangeMutationOptions(token || "")
      : createRejectDateChangeMutationOptions(token || ""),
  );

  const title =
    action === "confirm" ? "Conferma nuova data" : "Rifiuta nuova data";

  const intro =
    action === "confirm"
      ? "Conferma la modifica proposta per registrare il nuovo appuntamento."
      : "Rifiuta la modifica proposta per annullare la richiesta.";

  const actionLabel =
    action === "confirm" ? "Conferma modifica" : "Rifiuta modifica";

  const successTitle =
    action === "confirm" ? "Nuova data confermata" : "Richiesta annullata";

  const successText =
    action === "confirm"
      ? "La modifica dell'appuntamento è stata registrata correttamente."
      : "La richiesta è stata annullata correttamente.";

  const handleAction = () => {
    if (!token || mutation.isPending) return;
    mutation.mutate();
  };

  return (
    <main className="min-h-screen bg-off-white flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary opacity-10 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-primary opacity-5 blur-[80px] pointer-events-none" />

      <div className="w-full max-w-sm relative z-10 flex flex-col items-center text-center">
        <img src={logo} alt="ASPIC Psicologia" className="h-10 mb-10" />

        <div className="bg-white border border-border rounded-3xl px-8 py-10 w-full">
          {!token && (
            <>
              <h1 className="font-garamond font-semibold text-3xl text-text mb-3">
                Link non valido
              </h1>
              <p className="text-sm font-light text-text-muted leading-relaxed mb-8">
                Controlla l'email ricevuta o contatta la segreteria.
              </p>
            </>
          )}

          {token && !mutation.isSuccess && (
            <>
              <span className="uppercase font-medium text-primary text-xs tracking-widest mb-3 block">
                {title}
              </span>
              <h1 className="font-garamond font-semibold text-3xl text-text mb-3">
                {action === "confirm"
                  ? "Vuoi confermare la nuova data?"
                  : "Vuoi rifiutare la nuova data?"}
              </h1>
              <p className="text-sm font-light text-text-muted leading-relaxed mb-8">
                {mutation.isPending
                  ? "Stiamo registrando la tua scelta."
                  : mutation.isError
                    ? mutation.error.response?.data?.message ||
                      "Operazione non disponibile."
                    : intro}
              </p>

              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => navigate({ to: "/" })}
                  className="cursor-pointer px-6 py-2.5 bg-white text-text text-sm font-medium rounded-xl border border-border transition-opacity hover:opacity-90"
                >
                  Annulla
                </button>
                <button
                  onClick={handleAction}
                  disabled={mutation.isPending}
                  className="cursor-pointer px-6 py-2.5 bg-primary text-white text-sm font-medium rounded-xl transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                  {mutation.isPending ? "Invio..." : actionLabel}
                </button>
              </div>
            </>
          )}

          {token && mutation.isSuccess && (
            <>
              <span className="uppercase font-medium text-primary text-xs tracking-widest mb-3 block">
                Operazione completata
              </span>
              <h1 className="font-garamond font-semibold text-3xl text-text mb-3">
                {successTitle}
              </h1>
              <p className="text-sm font-light text-text-muted leading-relaxed mb-3">
                {successText}
              </p>
              <p className="text-sm font-light text-text-muted leading-relaxed mb-8">
                {mutation.data.message}
              </p>
              <button
                onClick={() => navigate({ to: "/" })}
                className="cursor-pointer px-6 py-2.5 bg-primary text-white text-sm font-medium rounded-xl transition-opacity hover:opacity-90"
              >
                Torna al sito
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );
};
