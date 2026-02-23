import type { UseFormRegister } from "react-hook-form";
import type z from "zod";
import { consulenzaSchema } from "./consulenzaSchema";
import type { IconType } from "react-icons";

const formDatiRichiestaSchema = consulenzaSchema.pick({
  appointmentDate: true,
  appointmentTime: true,
  urgent: true,
  clientType: true,
  clientAge: true,
  reason: true,
});

type ConsulenzaDatiRichiestaSchema = z.infer<typeof formDatiRichiestaSchema>;

interface FormCheckboxProps {
  register: UseFormRegister<ConsulenzaDatiRichiestaSchema>;
  inputName: keyof ConsulenzaDatiRichiestaSchema;
  text: string;
  Icon?: IconType;
}

export const FormCheckbox = ({
  register,
  inputName,
  text,
  Icon,
}: FormCheckboxProps) => {
  return (
    <div className="p-3 mt-4 bg-white rounded-xl border border-borderDefault flex items-center font-semibold">
      <label className="flex items-center gap-3 cursor-pointer">
        <span className="relative w-5 h-5 border border-borderDefault rounded-md bg-white transition has-checked:bg-primary has-checked:border-primary">
          <input
            {...register(inputName)}
            type="checkbox"
            className="absolute inset-0 opacity-0 cursor-pointer"
          />

          <svg
            className="absolute inset-0 m-auto w-4 h-4 text-white transitionpointer-events-none has-checked:opacity-100"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        </span>
        {Icon && <Icon className="text-warn" />}
        {text}
      </label>
    </div>
  );
};
