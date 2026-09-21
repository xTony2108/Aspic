import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect } from "react";
import { FiCheckCircle } from "react-icons/fi";

export const StripeCallbackPage = () => {
  const navigate = useNavigate();
  const search = useSearch({ from: "/_autenticato/dashboard/stripe-callback" });
  const queryClient = useQueryClient();

  useEffect(() => {
    if (search.action !== "return") {
      navigate({ to: "/dashboard", replace: true });
      return;
    }

    sessionStorage.setItem("stripe_onboarding_returned", "true");
    queryClient.invalidateQueries({ queryKey: ["stripeOnboardingData"] });

    navigate({ to: "/dashboard/impostazioni", replace: true });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
      <div className="space-y-4">
        <FiCheckCircle size={48} className="text-success" />
        <h2 className="text-xl font-semibold text-success">
          Configurazione completata!
        </h2>
        <p className="text-text-muted">
          Il tuo account è stato configurato correttamente.
        </p>
      </div>
    </div>
  );
};
