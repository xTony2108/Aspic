import type z from "zod";
import { isValidAge } from "../../../../helpers/isValidAge";

export const ageValidation = (
  data: {
    birthday: string;
    clientType?: "bambini" | "adulti" | "anziani" | null;
    clientAge?: "0-3" | "4-11" | "12-14" | "15-18" | null;
  },
  ctx: z.RefinementCtx,
) => {
  const today = new Date();
  const birth = new Date(data.birthday);

  let calcAge = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    calcAge--;
  }

  if (!data.birthday) {
    ctx.addIssue({
      code: "custom",
      path: ["birthday"],
      message: "Seleziona una data di nascita",
    });
  }

  if (birth >= today) {
    ctx.addIssue({
      code: "custom",
      path: ["birthday"],
      message: "La data selezionata non è valida",
    });
  }

  if (!isValidAge(calcAge, data.clientType, data.clientAge)) {
    ctx.addIssue({
      code: "custom",
      path: ["birthday"],
      message: `La data selezionata non è coerente con la fascia d'età selezionata${data.clientAge ? " (" + data.clientAge + " anni)" : ""}`,
    });
  }
};
