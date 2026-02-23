import type { UseFormRegister } from "react-hook-form";
import type z from "zod";
import { consulenzaSchema } from "./consulenzaSchema";

const formStep1Schema = consulenzaSchema.pick({
  appointmentDate: true,
  appointmentTime: true,
  urgent: true,
  clientType: true,
  clientAge: true,
  reason: true,
});

type ConsulenzaStep1FormSchema = z.infer<typeof formStep1Schema>;

interface FormRadioWithDotProps {
  register: UseFormRegister<ConsulenzaStep1FormSchema>;
  inputName: keyof ConsulenzaStep1FormSchema;
  value: string;
  text: string;
}

export const FormRadioNoDot = ({
  register,
  inputName,
  text,
  value,
}: FormRadioWithDotProps) => {
  return (
    <label className="transition-all duration-300 ease-in-out text-center gap-4 p-4 bg-white rounded-xl border border-borderDefault drop-shadow-xs font-medium text-heading flex-1 basis-[calc(50%-8px)] has-checked:bg-secondary has-checked:border-highlight cursor-pointer">
      <input
        {...register(inputName)}
        type="radio"
        className="hidden appearance-none text-sm text-heading"
        value={value}
      />
      {text}
    </label>
  );
};
