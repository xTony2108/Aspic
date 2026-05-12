import z from "zod";
import { isValidAge } from "./isValidAge.js";

export const baseSchemaRefinements = (
  data: {
    birthday: string;
    clientType?: "bambini" | "adulti" | "anziani";
    clientAge?: "0-3" | "4-11" | "12-14" | "15-18" | null;
  },
  ctx: z.RefinementCtx,
) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!data.birthday) {
    ctx.addIssue({
      code: "custom",
      path: ["birthday"],
      message: "Seleziona una data di nascita",
    });
    return;
  }

  const birth = new Date(data.birthday);

  if (birth >= today) {
    ctx.addIssue({
      code: "custom",
      path: ["birthday"],
      message: "La data selezionata non è valida",
    });
    return;
  }

  let calcAge = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    calcAge--;
  }

  if (!data.clientType) {
    ctx.addIssue({
      code: "custom",
      path: ["clientType"],
      message: "Seleziona una tipologia di cliente",
    });
  }

  if (data.clientType === "bambini" && !data.clientAge) {
    ctx.addIssue({
      code: "custom",
      path: ["clientAge"],
      message: "Seleziona l'età del cliente",
    });
  }

  if (
    data.clientType &&
    !isValidAge(calcAge, data.clientType, data.clientAge)
  ) {
    ctx.addIssue({
      code: "custom",
      path: ["birthday"],
      message: `La data selezionata non è coerente con la fascia d'età selezionata${data.clientAge ? " (" + data.clientAge + " anni)" : ""}`,
    });
  }
};
