import { z } from "zod";
import { baseSchema } from "./schemas";

export const createExtendedSchema = (service: string) => {
  const clientTypeEnum =
    service === "consulenza"
      ? z.enum(["bambini", "adulti", "anziani"])
      : z.enum(["bambini", "adulti"]);

  return baseSchema.extend({
    clientType: clientTypeEnum.nullable(),
  });
};
