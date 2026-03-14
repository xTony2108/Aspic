const CLIENT_TYPE_LABELS: Record<string, string> = {
  bambini: "Età evolutiva",
  adulti: "Adulti",
  anziani: "Anziani",
};

export const getClientTypeLabel = (value: string) =>
  CLIENT_TYPE_LABELS[value] ?? value;
