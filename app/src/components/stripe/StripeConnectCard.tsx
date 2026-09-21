import { useState } from "react";
import { StripeStatusBadge } from "./StripeStatusBadge";
import { StripeLoadingCard } from "./StripeLoadingCard";
import { useQuery } from "@tanstack/react-query";
import { createGetStripeOnboardingDataQueryOptions } from "../../api/admin/createGetStripeOnboardingDataQueryOptions";

const statusDescription: Record<string, string> = {
  active: "Account attivo e pronto a ricevere pagamenti",
  pending: "Configurazione in attesa di completamento",
  restricted: "Account con limitazioni — azione richiesta",
};

export const StripeConnectCard = () => {
  const [redirecting, setRedirecting] = useState(false);

  const { data, isLoading, isError, refetch } = useQuery(
    createGetStripeOnboardingDataQueryOptions({
      retry: 1,
      refetchInterval: 10000,
      staleTime: 5000,
    }),
  );

  const stripeData = data?.stripeData;

  const handleOnboarding = async () => {
    try {
      setRedirecting(true);
      const response = await refetch();
      const url = response.data?.stripeData?.url;
      if (url) window.location.href = url;
    } catch (error) {
      setRedirecting(false);
    }
  };

  if (isLoading) return <StripeLoadingCard />;

  if (isError || !stripeData) {
    return (
      <div className="p-6 border rounded-2xl bg-white">
        <p className="text-danger text-sm">
          Impossibile caricare le informazioni dell'account Stripe. Riprova più
          tardi.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-border rounded-2xl p-6 space-y-5 lg:col-span-2">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="font-garamond text-lg font-semibold">
            Gestione
            <em className="text-primary italic"> pagamenti</em>
          </h2>
          <p className="text-sm text-text-muted mt-1">
            {statusDescription[stripeData.status] ?? "Stato sconosciuto"}
          </p>
        </div>
        <StripeStatusBadge status={stripeData.status} />
      </div>

      {stripeData.status === "active" && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="text-green-700 text-sm">
            Il tuo account è configurato correttamente. Puoi ricevere pagamenti
            dai tuoi clienti.
          </p>
        </div>
      )}

      {stripeData.status === "pending" && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <p className="text-yellow-700 text-sm">
            Hai ancora dei passaggi da completare su Stripe. Clicca il pulsante
            qui sotto per continuare la configurazione.
          </p>
        </div>
      )}

      {stripeData.status === "restricted" && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-700 text-sm font-medium mb-1">
            Il tuo account è stato limitato da Stripe.
          </p>
          <p className="text-red-600 text-sm">
            Completa la configurazione per rimuovere le limitazioni e continuare
            a ricevere pagamenti.
          </p>
        </div>
      )}

      {!stripeData.onboardingCompleted && (
        <div className="flex justify-end">
          <button
            onClick={handleOnboarding}
            disabled={redirecting}
            className="px-5 py-3 rounded-xl bg-primary text-white hover:opacity-90 transition disabled:opacity-50 cursor-pointer"
          >
            {redirecting ? "Caricamento..." : "Completa la configurazione"}
          </button>
        </div>
      )}
    </div>
  );
};
