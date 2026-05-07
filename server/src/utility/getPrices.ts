const SERVICES_PRICES = {
  "consulenza-psicologica": 8000,
  "valutazione-psicodiagnostica": 25000,
};

export const getServicePrice = (
  service: "consulenza-psicologica" | "valutazione-psicodiagnostica",
) => SERVICES_PRICES[service];
