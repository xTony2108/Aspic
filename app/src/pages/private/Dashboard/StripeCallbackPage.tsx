import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect } from "react";

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
        <div className="text-green-500 text-5xl">✅</div>
        <h2 className="text-xl font-bold text-green-600">
          Configurazione completata!
        </h2>
        <p className="text-gray-500">
          Il tuo account è stato configurato correttamente.
        </p>
      </div>
    </div>
  );
};
