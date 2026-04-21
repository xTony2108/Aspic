const SERVICES_PRICES = {
  "consulenza-psicologica": 80,
  "valutazione-psicodiagnostica": 250,
};

export const getServicePrice = (
  service: "consulenza-psicologica" | "valutazione-psicodiagnostica",
) => SERVICES_PRICES[service];
