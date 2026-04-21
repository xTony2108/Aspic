const CLIENT_TYPE_LABELS = {
  bambini: "Età evolutiva",
  adulti: "Adulti",
  anziani: "Età geriatrica",
};

const SERVICE_LABELS = {
  "valutazione-psicodiagnostica": "Valutazione Psicodiagnostica",
  "consulenza-psicologica": "Consulenza Psicologica Individuale",
};

export const getServiceLabel = (
  service: "valutazione-psicodiagnostica" | "consulenza-psicologica",
) => SERVICE_LABELS[service];

export const getClientTypeLabel = (
  clientType: "bambini" | "adulti" | "anziani",
) => CLIENT_TYPE_LABELS[clientType];
