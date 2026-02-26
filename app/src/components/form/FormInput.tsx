import type { Path, UseFormRegister } from "react-hook-form";

interface FormInputProps<T extends Object> {
  register: UseFormRegister<T>;
  inputName: Path<T>;
  inputType: string;
  label: string;
  placeholder?: string;
}

export const FormInput = <T extends Object>({
  register,
  inputName,
  inputType,
  label,
  placeholder,
}: FormInputProps<T>) => {
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
