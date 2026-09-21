import { useNavigate } from "@tanstack/react-router";
import { useServizioFormStore } from "../store";
import { useShallow } from "zustand/react/shallow";
import { useEffect } from "react";
import { baseSchema } from "../features/services/schemas/schemas";
import { STEPS } from "../features/services/services.config";
import { refineClientType } from "../features/services/schemas/refinements/refineClientType";
import { ageValidation } from "../features/services/schemas/refinements/ageValidation";

const STEP_SCHEMAS = [
  null,
  baseSchema.pick({ service: true }).refine((data) => data.service, {
    message: "Seleziona un servizio",
    path: ["service"],
  }),
  baseSchema
    .pick({
      service: true,
      appointmentDate: true,
      appointmentTime: true,
      appointmentMode: true,
      clientType: true,
      clientAge: true,
      urgent: true,
      reason: true,
    })
    .superRefine(refineClientType),
  baseSchema
    .pick({
      service: true,
      appointmentDate: true,
      appointmentTime: true,
      appointmentMode: true,
      clientType: true,
      clientAge: true,
      urgent: true,
      reason: true,
      firstName: true,
      lastName: true,
      address: true,
      birthday: true,
      birthPlace: true,
      fiscalCode: true,
      phoneNumber: true,
      email: true,
    })
    .superRefine(ageValidation),
];

export const useStepGuard = (currentIndex: number) => {
  const navigate = useNavigate();

  const storeData = useServizioFormStore(
    useShallow((s) => ({
      service: s.service,
      appointmentDate: s.appointmentDate,
      appointmentTime: s.appointmentTime,
      appointmentMode: s.appointmentMode,
      clientType: s.clientType,
      clientAge: s.clientAge,
      urgent: s.urgent,
      reason: s.reason,
      firstName: s.firstName,
      lastName: s.lastName,
      address: s.address,
      birthday: s.birthday,
      birthPlace: s.birthPlace,
      fiscalCode: s.fiscalCode,
      phoneNumber: s.phoneNumber,
      email: s.email,
    })),
  );

  const clearItems = useServizioFormStore((s) => s.clearItems);

  useEffect(() => {
    for (let i = 1; i <= currentIndex; i++) {
      const schema = STEP_SCHEMAS[i];

      if (!schema) continue;

      const parsed = schema.safeParse(storeData);

      if (!parsed.success) {
        const fields = parsed.error.issues.map(
          (i) => i.path[0] as keyof typeof storeData,
        );

        clearItems(fields);

        navigate({ to: STEPS[i - 1].path });
        return;
      }
    }
  }, [currentIndex]);
};
