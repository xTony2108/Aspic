import type { UseFormRegister } from "react-hook-form";
import type z from "zod";
import { consulenzaSchema } from "./consulenzaSchema";

const formDatiPersonaliSchema = consulenzaSchema.pick({
  firstName: true,
  lastName: true,
  address: true,
  birthday: true,
  birthPlace: true,
  fiscalCode: true,
  phoneNumber: true,
  email: true,
});

type ConsulenzaDatiPersonaliSchema = z.infer<typeof formDatiPersonaliSchema>;

interface FormInputProps {
  register: UseFormRegister<ConsulenzaDatiPersonaliSchema>;
  inputName: keyof ConsulenzaDatiPersonaliSchema;
  inputType: string;
  label: string;
  placeholder?: string;
}

export const FormInput = ({
  register,
  inputName,
  inputType,
  label,
  placeholder,
}: FormInputProps) => {
  return (
    <label className="block">
      {label}
      <input
        {...register(inputName)}
        type={inputType}
        placeholder={placeholder}
        className="bg-white border border-borderDefault py-3.5 px-4 rounded-xl mt-1.5 w-full appearance-none"
      />
    </label>
  );
};
