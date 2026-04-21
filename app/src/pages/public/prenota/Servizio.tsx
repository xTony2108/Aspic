import { useForm, useWatch } from "react-hook-form";
import { ServiceRadio } from "../../../components/form/ServiceRadio";
import { zodResolver } from "@hookform/resolvers/zod";
import { baseSchema } from "../../../features/services/schemas/schemas";
import type z from "zod";
import { useServizioFormStore } from "../../../store";
import { SERVIZI_CONFIG } from "../../../features/services/services.config";
import { useNavigate } from "@tanstack/react-router";
import { NextButton } from "../../../components/form/NextButton";

export const Servizio = () => {
  const navigate = useNavigate();

  const servizioSchema = baseSchema
    .pick({
      service: true,
    })
    .refine((data) => data.service, {
      message: "Seleziona un servizio",
      path: ["service"],
    });

  type ServizioSchema = z.infer<typeof servizioSchema>;

  const serviceVal = useServizioFormStore((s) => s.service);
  const setData = useServizioFormStore((s) => s.setData);

  const methods = useForm<ServizioSchema>({
    resolver: zodResolver(servizioSchema),
    defaultValues: {
      service: serviceVal ?? null,
    },
  });

  const service = useWatch({ name: "service", control: methods.control });

  const onSubmit = (data: ServizioSchema) => {
    setData(data);
    navigate({
      from: "/prenota/servizio",
      to: "/prenota/appuntamento",
      resetScroll: true,
    });
  };
  return (
    <>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 mb-8">
          {SERVIZI_CONFIG.map((item, i) => (
            <ServiceRadio
              key={item.value}
              control={methods.control}
              inputName="service"
              value={item.value}
              number={"0" + (i + 1)}
              heading={item.heading}
              price={item.price}
              list={item.list}
            >
              {item.children}
            </ServiceRadio>
          ))}
        </div>
        <NextButton disabled={!service} />
      </form>
    </>
  );
};
