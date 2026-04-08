import type z from "zod";

export const refineClientType = (
  data: {
    clientType?: "bambini" | "adulti" | "anziani" | null;
    clientAge?: "0-3" | "4-11" | "12-14" | "15-18" | null;
  },
  ctx: z.RefinementCtx,
) => {
  if (!data.clientType) {
    ctx.addIssue({
      code: "custom",
      path: ["clientType"],
      message: "Seleziona il tipo di paziente",
    });
  }
  if (data.clientType == "bambini" && !data.clientAge) {
    ctx.addIssue({
      code: "custom",
      path: ["clientAge"],
      message: "Seleziona la fascia d'età",
    });
  }
};
